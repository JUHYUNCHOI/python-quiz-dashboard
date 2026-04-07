"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowLeft } from "lucide-react"
import { McqRunner } from "./mcq-runner"
import { PracticeRunner } from "./practice-runner"
import { cn } from "@/lib/utils"
import type { PracticeProblem, PracticeCluster } from "@/data/practice/types"

const ROUND1_SIZE = 7
const ROUND_N_SIZE = 3

// ── 문제 설명 렌더러 ──────────────────────────────────────────────
function DescriptionBlock({ text }: { text: string }) {
  const parts = text.split(/(```[\s\S]*?```)/g)
  return (
    <div className="flex flex-col gap-2">
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const code = part.replace(/^```[^\n]*\n?/, "").replace(/```$/, "").trim()
          return (
            <pre key={i} className="rounded-lg bg-gray-900 px-4 py-3 font-mono text-sm text-[#cdd6f4] overflow-x-auto">
              {code}
            </pre>
          )
        }
        const inline = part.split(/(`[^`]+`)/g).map((seg, j) =>
          seg.startsWith("`")
            ? <code key={j} className="bg-gray-100 text-indigo-600 rounded px-1 py-0.5 font-mono text-[13px]">{seg.slice(1, -1)}</code>
            : <span key={j}>{seg}</span>
        )
        return (
          <p key={i} className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{inline}</p>
        )
      })}
    </div>
  )
}

// ── DB 세션 타입 ──────────────────────────────────────────────────
interface DbSession {
  id: string
  round: number
  problems_attempted: number
  problems_passed: number
  opted_out: boolean
  teacher_assigned: boolean
  completed_at: string | null
  problem_ids: string[]
  passed_problem_ids: string[]
}

// ── 라운드 결과 화면 ──────────────────────────────────────────────
function RoundResult({
  round,
  passed,
  total,
  teacherAssigned,
  onMore,
  onDone,
}: {
  round: number
  passed: number
  total: number
  teacherAssigned: boolean
  onMore: () => void
  onDone: () => void
}) {
  const pct = Math.round((passed / total) * 100)
  const isGood = pct >= 70
  const isFirst = round === 1

  return (
    <div className="flex flex-col items-center gap-6 py-10 max-w-sm mx-auto text-center">
      <div className="text-6xl">{isGood ? (passed === total ? "🎉" : "👍") : "💪"}</div>

      {/* 점수 */}
      <div>
        <p className="text-3xl font-bold text-gray-900">{passed} / {total}</p>
        <p className="text-gray-400 text-sm mt-1">
          {isGood ? "잘 했어요!" : "조금 더 연습이 필요해요"}
        </p>
      </div>

      {/* 원형 게이지 */}
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="32" fill="none" stroke="#f3f4f6" strokeWidth="7" />
          <circle
            cx="40" cy="40" r="32" fill="none"
            stroke={isGood ? "#10b981" : "#f59e0b"}
            strokeWidth="7" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 32}`}
            strokeDashoffset={`${2 * Math.PI * 32 * (1 - pct / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold text-gray-800">{pct}%</span>
        </div>
      </div>

      {/* 메시지 */}
      {isGood ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 w-full">
          <p className="text-emerald-700 text-sm font-medium">
            {isFirst
              ? "🌟 처음 7문제 모두 잘 풀었어요!"
              : "연습 효과가 보여요. 계속 이렇게 해봐요!"}
          </p>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 w-full">
          <p className="text-amber-700 text-sm font-medium">
            {teacherAssigned
              ? "선생님이 준비한 추가 연습이에요. 조금만 더 해봐요!"
              : "틀린 문제 위주로 3문제를 더 풀어보면 훨씬 좋아질 거예요."}
          </p>
        </div>
      )}

      {/* 버튼 */}
      <div className="flex flex-col gap-3 w-full">
        {!isGood && (
          <button
            onClick={onMore}
            className="w-full py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors"
          >
            3문제 더 풀기 →
          </button>
        )}
        <button
          onClick={onDone}
          className={cn(
            "w-full py-3.5 rounded-2xl font-bold text-sm transition-colors",
            isGood
              ? "bg-indigo-500 hover:bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          )}
        >
          {isGood ? "완료!" : "오늘은 여기까지"}
        </button>
      </div>
    </div>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────
interface PracticeSessionProps {
  cluster: PracticeCluster
  onExit: () => void
  onMarkSolved: (id: string) => Promise<void>
  onMarkStarred: (id: string) => Promise<void>
  solvedSet: Set<string>
  userId?: string
}

type Phase = "loading" | "intro" | "solving" | "round_complete" | "done"

export function PracticeSession({
  cluster,
  onExit,
  onMarkSolved,
  onMarkStarred,
  solvedSet,
  userId,
}: PracticeSessionProps) {
  const [phase, setPhase] = useState<Phase>("loading")
  const [dbSessions, setDbSessions] = useState<DbSession[]>([])
  const [currentRound, setCurrentRound] = useState(1)
  const [roundProblems, setRoundProblems] = useState<PracticeProblem[]>([])
  const [index, setIndex] = useState(0)
  const [passedInRound, setPassedInRound] = useState<Set<string>>(new Set())
  const [canAdvance, setCanAdvance] = useState(false)
  const [teacherAssignedId, setTeacherAssignedId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // ── 세션 불러오기 ────────────────────────────────────────────────
  const loadSessions = useCallback(async () => {
    if (!userId) {
      // 비로그인: 로컬로만 진행
      setCurrentRound(1)
      setPhase("intro")
      return
    }
    try {
      const res = await fetch(`/api/practice/sessions?clusterId=${cluster.id}`)
      const json = await res.json()
      const sessions: DbSession[] = json.sessions ?? []
      setDbSessions(sessions)

      const completedSessions = sessions.filter(s => s.completed_at)
      const pendingTeacher = sessions.find(s => s.teacher_assigned && !s.completed_at)

      if (pendingTeacher) {
        setTeacherAssignedId(pendingTeacher.id)
        setCurrentRound(pendingTeacher.round)
      } else {
        setCurrentRound(completedSessions.length + 1)
      }
    } catch {
      setCurrentRound(1)
    }
    setPhase("intro")
  }, [cluster.id, userId])

  useEffect(() => { loadSessions() }, [loadSessions])

  // ── 라운드별 문제 선택 ────────────────────────────────────────────
  const buildRoundProblems = useCallback((round: number, sessions: DbSession[]): PracticeProblem[] => {
    const allProblems = cluster.problems

    if (round === 1) {
      // 라운드 1: 미완료 우선, 클러스터 순서대로 7문제
      const unsolved = allProblems.filter(p => !solvedSet.has(p.id))
      const solved = allProblems.filter(p => solvedSet.has(p.id))
      return [...unsolved, ...solved].slice(0, ROUND1_SIZE)
    }

    // 라운드 2+: 이전 라운드에서 틀린 문제 우선, 3문제
    const passedEver = new Set<string>()
    const appearedEver = new Set<string>()
    for (const s of sessions.filter(s => s.completed_at)) {
      for (const id of s.passed_problem_ids ?? []) passedEver.add(id)
      for (const id of s.problem_ids ?? []) appearedEver.add(id)
    }
    const wrongProblems = allProblems.filter(p => appearedEver.has(p.id) && !passedEver.has(p.id))
    const newProblems = allProblems.filter(p => !appearedEver.has(p.id))
    const pool = [...wrongProblems, ...newProblems]
    return pool.slice(0, ROUND_N_SIZE)
  }, [cluster.problems, solvedSet])

  // ── 라운드 시작 ───────────────────────────────────────────────────
  const startRound = useCallback(() => {
    const problems = buildRoundProblems(currentRound, dbSessions)
    setRoundProblems(problems)
    setIndex(0)
    setPassedInRound(new Set())
    setCanAdvance(false)
    setPhase("solving")
  }, [currentRound, dbSessions, buildRoundProblems])

  // ── 문제 통과 ─────────────────────────────────────────────────────
  const handleSuccess = useCallback(async (starred: boolean) => {
    const p = roundProblems[index]
    if (!p) return
    await onMarkSolved(p.id)
    if (starred) await onMarkStarred(p.id)
    setPassedInRound(prev => new Set([...prev, p.id]))
    setCanAdvance(true)
  }, [roundProblems, index, onMarkSolved, onMarkStarred])

  // ── 다음 문제 / 라운드 종료 ───────────────────────────────────────
  const handleNext = useCallback(async () => {
    if (index + 1 < roundProblems.length) {
      setIndex(i => i + 1)
      setCanAdvance(false)
      return
    }
    // 라운드 끝: DB 저장
    if (userId && !isSaving) {
      setIsSaving(true)
      try {
        const body = {
          clusterId: cluster.id,
          round: currentRound,
          problemsAttempted: roundProblems.length,
          problemsPassed: passedInRound.size,
          optedOut: false,
          problemIds: roundProblems.map(p => p.id),
          passedProblemIds: [...passedInRound],
          ...(teacherAssignedId ? { teacherAssignedId } : {}),
        }
        const res = await fetch("/api/practice/sessions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        const json = await res.json()
        if (json.session) {
          setDbSessions(prev => {
            if (teacherAssignedId) {
              return prev.map(s => s.id === teacherAssignedId ? { ...s, ...json.session } : s)
            }
            return [...prev, json.session]
          })
        }
      } catch {}
      setIsSaving(false)
    }
    setPhase("round_complete")
  }, [index, roundProblems, userId, isSaving, cluster.id, currentRound, passedInRound, teacherAssignedId])

  // ── 더 풀기 ───────────────────────────────────────────────────────
  const handleMore = useCallback(() => {
    const nextRound = currentRound + 1
    setCurrentRound(nextRound)
    setTeacherAssignedId(null)
    const updatedSessions = dbSessions.filter(s => s.completed_at)
    const problems = buildRoundProblems(nextRound, updatedSessions)
    setRoundProblems(problems)
    setIndex(0)
    setPassedInRound(new Set())
    setCanAdvance(false)
    setPhase("solving")
  }, [currentRound, dbSessions, buildRoundProblems])

  // ── 포기 (오늘은 여기까지) ────────────────────────────────────────
  const handleOptOut = useCallback(async () => {
    if (userId && phase === "round_complete") {
      try {
        await fetch("/api/practice/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clusterId: cluster.id,
            round: currentRound,
            problemsAttempted: roundProblems.length,
            problemsPassed: passedInRound.size,
            optedOut: true,
            problemIds: roundProblems.map(p => p.id),
            passedProblemIds: [...passedInRound],
          }),
        })
      } catch {}
    }
    onExit()
  }, [userId, phase, cluster.id, currentRound, roundProblems, passedInRound, onExit])

  const current = roundProblems[index]
  const isMcq = current?.type === "mcq"
  const progressPct = roundProblems.length > 0 ? (index / roundProblems.length) * 100 : 0

  // ── 로딩 ─────────────────────────────────────────────────────────
  if (phase === "loading") {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // ── 인트로 ────────────────────────────────────────────────────────
  if (phase === "intro") {
    const completedCount = dbSessions.filter(s => s.completed_at).length
    const isTeacherRound = !!teacherAssignedId

    return (
      <div className="max-w-sm mx-auto px-4 pt-8 flex flex-col items-center gap-6 text-center">
        <div className="text-5xl">{cluster.emoji}</div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{cluster.title}</h2>
          {completedCount > 0 && (
            <p className="text-sm text-gray-400 mt-1">{completedCount}라운드 완료</p>
          )}
        </div>

        {isTeacherRound && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl px-5 py-3 w-full">
            <p className="text-orange-700 text-sm font-medium">
              📩 선생님이 추가 연습을 준비했어요!
            </p>
          </div>
        )}

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 w-full text-left space-y-2">
          <p className="text-sm font-semibold text-indigo-800">
            {currentRound === 1 ? `${ROUND1_SIZE}문제` : `${ROUND_N_SIZE}문제`} 풀기
          </p>
          <p className="text-xs text-indigo-500">
            {currentRound === 1
              ? "처음 도전이에요. 잘 할 수 있어요!"
              : "이전에 틀린 문제 위주로 나와요."}
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={startRound}
            className="w-full py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors"
          >
            시작하기 →
          </button>
          <button
            onClick={onExit}
            className="w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-500 font-medium text-sm transition-colors"
          >
            나중에 하기
          </button>
        </div>
      </div>
    )
  }

  // ── 라운드 결과 ───────────────────────────────────────────────────
  if (phase === "round_complete") {
    return (
      <div className="max-w-lg mx-auto px-4 pt-4">
        <RoundResult
          round={currentRound}
          passed={passedInRound.size}
          total={roundProblems.length}
          teacherAssigned={!!teacherAssignedId}
          onMore={handleMore}
          onDone={handleOptOut}
        />
      </div>
    )
  }

  // ── 풀기 ─────────────────────────────────────────────────────────
  if (!current) return null

  return (
    <div className="max-w-xl mx-auto px-4 pt-4 pb-24">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onExit}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {cluster.emoji} {cluster.title}
              {currentRound > 1 && <span className="ml-1.5 text-xs text-gray-400">+{currentRound - 1}</span>}
            </span>
            <span className="text-xs text-gray-400 font-medium tabular-nums">
              {index + 1} / {roundProblems.length}
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 문제 번호 + 난이도 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold text-gray-300">#{index + 1}</span>
        <span className={cn(
          "text-xs px-2 py-0.5 rounded-full font-medium",
          current.difficulty === "쉬움" ? "text-emerald-700 bg-emerald-100" :
          current.difficulty === "보통" ? "text-amber-700 bg-amber-100" :
          "text-red-700 bg-red-100"
        )}>
          {current.difficulty}
        </span>
        <span className="text-sm font-semibold text-gray-800">{current.title}</span>
      </div>

      {/* 문제 러너 */}
      {isMcq
        ? <McqRunner key={current.id} problem={current} onSuccess={handleSuccess} />
        : (
          <>
            {current.description && (
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-5 py-4 mb-3">
                <DescriptionBlock text={current.description} />
                {current.constraints && (
                  <p className="text-gray-400 text-xs mt-3 pt-3 border-t border-gray-100">
                    {current.constraints}
                  </p>
                )}
              </div>
            )}
            <PracticeRunner key={current.id} problem={current} onSuccess={handleSuccess} />
          </>
        )
      }

      {/* 다음 버튼 */}
      <div className="mt-5">
        {(canAdvance || !isMcq) && (
          <button
            onClick={handleNext}
            disabled={isSaving}
            className="w-full py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors disabled:opacity-50"
          >
            {index + 1 >= roundProblems.length
              ? (isSaving ? "저장 중..." : "🏁 결과 보기")
              : "다음 문제 →"}
          </button>
        )}
      </div>
    </div>
  )
}
