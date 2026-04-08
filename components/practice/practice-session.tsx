"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowLeft } from "lucide-react"
import { McqRunner } from "./mcq-runner"
import { PracticeRunner } from "./practice-runner"
import { cn } from "@/lib/utils"
import type { PracticeProblem, PracticeCluster } from "@/data/practice/types"

// ── 고정 세트 크기 ────────────────────────────────────────────────
const SET1_SIZE = 7
const SET_N_SIZE = 3

// 세트 번호로 문제 범위 반환 (1-based, 고정 슬라이스)
function getSetProblems(problems: PracticeProblem[], setNum: number): PracticeProblem[] {
  if (setNum === 1) return problems.slice(0, SET1_SIZE)
  const start = SET1_SIZE + (setNum - 2) * SET_N_SIZE
  return problems.slice(start, start + SET_N_SIZE)
}

// 세트 내 문제 번호 (1-based, 클러스터 전체 기준)
function problemIndexInCluster(problems: PracticeProblem[], problemId: string): number {
  return problems.findIndex(p => p.id === problemId) + 1
}

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
  setNum,
  passed,
  total,
  wrongNums,       // 클러스터 전체 기준 번호 (1-based)
  teacherAssigned,
  onRetryWrong,
  onDone,
}: {
  setNum: number
  passed: number
  total: number
  wrongNums: number[]
  teacherAssigned: boolean
  onRetryWrong: () => void
  onDone: () => void
}) {
  const pct = Math.round((passed / total) * 100)
  const isGood = pct >= 70

  return (
    <div className="flex flex-col items-center gap-6 py-10 max-w-sm mx-auto text-center">
      <div className="text-6xl">{isGood ? (passed === total ? "🎉" : "👍") : "💪"}</div>

      <div>
        <p className="text-xs text-gray-400 mb-1">세트 {setNum}</p>
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

      {/* 틀린 문제 번호 표시 */}
      {!isGood && wrongNums.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 w-full text-left">
          <p className="text-amber-700 text-xs font-semibold mb-2">
            {teacherAssigned ? "📩 선생님이 추가로 준비한 연습이에요" : "틀린 문제를 다시 풀어봐요"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {wrongNums.map(n => (
              <span key={n} className="text-xs font-bold bg-white border border-amber-300 text-amber-700 rounded-lg px-2 py-0.5">
                {n}번
              </span>
            ))}
          </div>
        </div>
      )}

      {isGood && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 w-full">
          <p className="text-emerald-700 text-sm font-medium">
            {setNum === 1 ? "🌟 세트 1 완료!" : `세트 ${setNum} 완료! 계속 잘 하고 있어요.`}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full">
        {!isGood && wrongNums.length > 0 && (
          <button
            onClick={onRetryWrong}
            className="w-full py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors"
          >
            틀린 {wrongNums.length}문제 다시 풀기 →
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
  const [currentSet, setCurrentSet] = useState(1)
  const [roundProblems, setRoundProblems] = useState<PracticeProblem[]>([])
  const [index, setIndex] = useState(0)
  const [passedInRound, setPassedInRound] = useState<Set<string>>(new Set())
  const [canAdvance, setCanAdvance] = useState(false)
  const [teacherAssignedId, setTeacherAssignedId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isRetryMode, setIsRetryMode] = useState(false) // 틀린 문제 재시도 중

  // ── 세션 불러오기 ────────────────────────────────────────────────
  const loadSessions = useCallback(async () => {
    if (!userId) {
      setCurrentSet(1)
      setPhase("intro")
      return
    }
    try {
      const res = await fetch(`/api/practice/sessions?clusterId=${cluster.id}`)
      const json = await res.json()
      const sessions: DbSession[] = json.sessions ?? []
      setDbSessions(sessions)

      const completed = sessions.filter(s => s.completed_at && !s.teacher_assigned)
      const pendingTeacher = sessions.find(s => s.teacher_assigned && !s.completed_at)

      if (pendingTeacher) {
        setTeacherAssignedId(pendingTeacher.id)
        setCurrentSet(pendingTeacher.round)
      } else {
        // 완료된 세션 중 마지막 세트 번호 + 1
        const lastSet = completed.length > 0 ? Math.max(...completed.map(s => s.round)) : 0
        setCurrentSet(lastSet + 1)
      }
    } catch {
      setCurrentSet(1)
    }
    setPhase("intro")
  }, [cluster.id, userId])

  useEffect(() => { loadSessions() }, [loadSessions])

  // ── 세션 저장 ─────────────────────────────────────────────────────
  const saveSession = useCallback(async (
    setNum: number,
    problems: PracticeProblem[],
    passed: Set<string>,
    optedOut = false,
  ) => {
    if (!userId) return
    try {
      const body = {
        clusterId: cluster.id,
        round: setNum,
        problemsAttempted: problems.length,
        problemsPassed: passed.size,
        optedOut,
        problemIds: problems.map(p => p.id),
        passedProblemIds: [...passed],
        ...(teacherAssignedId ? { teacherAssignedId } : {}),
      }
      const res = await fetch("/api/practice/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (json.session) {
        setDbSessions(prev =>
          teacherAssignedId
            ? prev.map(s => s.id === teacherAssignedId ? { ...s, ...json.session } : s)
            : [...prev, json.session]
        )
      }
    } catch {}
  }, [userId, cluster.id, teacherAssignedId])

  // ── 라운드 시작 ───────────────────────────────────────────────────
  const startSet = useCallback((setNum: number, problems?: PracticeProblem[]) => {
    const p = problems ?? getSetProblems(cluster.problems, setNum)
    setRoundProblems(p)
    setIndex(0)
    setPassedInRound(new Set())
    setCanAdvance(false)
    setPhase("solving")
  }, [cluster.problems])

  // ── 문제 통과 ─────────────────────────────────────────────────────
  const handleSuccess = useCallback(async (starred: boolean) => {
    const p = roundProblems[index]
    if (!p) return
    await onMarkSolved(p.id)
    if (starred) await onMarkStarred(p.id)
    setPassedInRound(prev => new Set([...prev, p.id]))
    setCanAdvance(true)
  }, [roundProblems, index, onMarkSolved, onMarkStarred])

  // ── 다음 문제 / 세트 종료 ─────────────────────────────────────────
  const handleNext = useCallback(async () => {
    if (index + 1 < roundProblems.length) {
      setIndex(i => i + 1)
      setCanAdvance(false)
      return
    }
    // 세트 끝: 저장
    setIsSaving(true)
    await saveSession(currentSet, roundProblems, passedInRound)
    setIsSaving(false)
    setPhase("round_complete")
  }, [index, roundProblems, currentSet, passedInRound, saveSession])

  // ── 틀린 문제 재시도 ──────────────────────────────────────────────
  const handleRetryWrong = useCallback(() => {
    const wrongProblems = roundProblems.filter(p => !passedInRound.has(p.id))
    setIsRetryMode(true)
    setTeacherAssignedId(null)
    startSet(currentSet, wrongProblems)
  }, [roundProblems, passedInRound, currentSet, startSet])

  // ── 포기 ─────────────────────────────────────────────────────────
  const handleOptOut = useCallback(async () => {
    if (phase === "round_complete") {
      await saveSession(currentSet, roundProblems, passedInRound, true)
    }
    onExit()
  }, [phase, currentSet, roundProblems, passedInRound, saveSession, onExit])

  // ── 틀린 문제 번호 계산 (클러스터 전체 1-based) ────────────────────
  const wrongNums = roundProblems
    .filter(p => !passedInRound.has(p.id))
    .map(p => problemIndexInCluster(cluster.problems, p.id))

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
    const completedSets = dbSessions.filter(s => s.completed_at && !s.teacher_assigned)
    const isTeacherRound = !!teacherAssignedId
    const setProblems = getSetProblems(cluster.problems, currentSet)
    const hasMoreSets = setProblems.length > 0

    if (!hasMoreSets) {
      return (
        <div className="max-w-sm mx-auto px-4 pt-8 flex flex-col items-center gap-6 text-center">
          <div className="text-5xl">🏆</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">모든 세트 완료!</h2>
            <p className="text-gray-400 text-sm mt-1">클러스터의 모든 문제를 풀었어요.</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => { setCurrentSet(1); setPhase("intro") }}
              className="w-full py-3.5 rounded-2xl border-2 border-indigo-200 text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-colors"
            >
              🔄 처음부터 다시 하기
            </button>
            <button onClick={onExit} className="w-full py-3.5 rounded-2xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-600 transition-colors">
              목록으로
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-sm mx-auto px-4 pt-8 flex flex-col items-center gap-6 text-center">
        <div className="text-5xl">{cluster.emoji}</div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{cluster.title}</h2>
          {completedSets.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">세트 {completedSets.map(s => s.round).join(", ")} 완료</p>
          )}
        </div>

        {isTeacherRound && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl px-5 py-3 w-full">
            <p className="text-orange-700 text-sm font-medium">
              📩 선생님이 추가 연습을 준비했어요!
            </p>
          </div>
        )}

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 w-full text-left space-y-1">
          <p className="text-sm font-bold text-indigo-800">
            세트 {currentSet} — {setProblems.length}문제
          </p>
          <p className="text-xs text-indigo-400">
            {currentSet === 1
              ? `문제 1~${SET1_SIZE}번`
              : `문제 ${SET1_SIZE + (currentSet - 2) * SET_N_SIZE + 1}~${SET1_SIZE + (currentSet - 1) * SET_N_SIZE}번`}
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button onClick={() => startSet(currentSet)} className="w-full py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors">
            시작하기 →
          </button>
          <button onClick={onExit} className="w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-500 font-medium text-sm transition-colors">
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
          setNum={currentSet}
          passed={passedInRound.size}
          total={roundProblems.length}
          wrongNums={wrongNums}
          teacherAssigned={!!teacherAssignedId}
          onRetryWrong={handleRetryWrong}
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
        <button onClick={onExit} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shrink-0">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              {cluster.emoji} {cluster.title}
              <span className="ml-1.5 text-xs text-gray-400">
                세트 {currentSet}{isRetryMode ? " 재시도" : ""}
              </span>
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
        <span className="text-xs font-bold text-gray-400">
          #{problemIndexInCluster(cluster.problems, current.id)}번
        </span>
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
