"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ArrowLeft } from "lucide-react"
import { McqRunner } from "./mcq-runner"
import { PracticeRunner } from "./practice-runner"
import { cn } from "@/lib/utils"
import type { PracticeProblem, PracticeCluster } from "@/data/practice/types"
import { localizeProblem, localizeCluster } from "@/data/practice/types"
import { useLanguage } from "@/contexts/language-context"

// ── 고정 세트 크기 ────────────────────────────────────────────────
const SET1_SIZE = 7
const SET_N_SIZE = 3

function getSetProblems(problems: PracticeProblem[], setNum: number): PracticeProblem[] {
  if (setNum === 1) return problems.slice(0, SET1_SIZE)
  const start = SET1_SIZE + (setNum - 2) * SET_N_SIZE
  return problems.slice(start, start + SET_N_SIZE)
}

function problemIndexInCluster(problems: PracticeProblem[], problemId: string): number {
  return problems.findIndex(p => p.id === problemId) + 1
}

// ── 진행 상황 localStorage 키 ─────────────────────────────────────
const progressKey = (clusterId: string) => `pp-${clusterId}`

interface SavedProgress {
  setNum: number
  index: number
  passedIds: string[]
  isRetry: boolean
  problemIds: string[]
}

function tryLoadProgress(clusterId: string, allProblems: PracticeProblem[]): { setNum: number; index: number; passedIds: string[]; isRetry: boolean; problems: PracticeProblem[] } | null {
  try {
    const raw = localStorage.getItem(progressKey(clusterId))
    if (!raw) return null
    const saved: SavedProgress = JSON.parse(raw)
    const problems = saved.problemIds
      .map(id => allProblems.find(p => p.id === id))
      .filter(Boolean) as PracticeProblem[]
    if (problems.length === 0) return null
    const safeIndex = Math.min(saved.index ?? 0, problems.length - 1)
    return { setNum: saved.setNum, index: safeIndex, passedIds: saved.passedIds ?? [], isRetry: saved.isRetry ?? false, problems }
  } catch {
    return null
  }
}

// ── 문제 설명 렌더러 ──────────────────────────────────────────────
// 인라인 마크다운: **bold**, `code` 파싱
function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`)/g).map((seg, j) => {
    if (seg.startsWith("**") && seg.endsWith("**"))
      return <strong key={j} className="font-semibold text-gray-900">{seg.slice(2, -2)}</strong>
    if (seg.startsWith("`") && seg.endsWith("`"))
      return <code key={j} className="bg-gray-100 text-indigo-600 rounded px-1 py-0.5 font-mono text-[13px]">{seg.slice(1, -1)}</code>
    return <span key={j}>{seg}</span>
  })
}

function DescriptionBlock({ text }: { text: string }) {
  const parts = text.split(/(```[\s\S]*?```)/g)
  return (
    <div className="flex flex-col gap-2">
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const code = part.replace(/^```[^\n]*\n?/, "").replace(/```$/, "").trim()
          return (
            <pre key={i} className="rounded-lg bg-gray-900 px-4 py-3 font-mono text-sm text-[#cdd6f4] overflow-x-auto whitespace-pre">
              {code}
            </pre>
          )
        }
        return (
          <p key={i} className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {renderInline(part)}
          </p>
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
  wrongNums,
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
  const { t } = useLanguage()
  const pct = Math.round((passed / total) * 100)
  const isGood = pct >= 70

  return (
    <div className="flex flex-col items-center gap-6 py-10 max-w-sm mx-auto text-center">
      <div className="text-6xl">{isGood ? (passed === total ? "🎉" : "👍") : "💪"}</div>

      <div>
        <p className="text-xs text-gray-400 mb-1">{t("세트", "Set")} {setNum}</p>
        <p className="text-3xl font-bold text-gray-900">{passed} / {total}</p>
        <p className="text-gray-400 text-sm mt-1">
          {isGood ? t("잘 했어요!", "Great job!") : t("조금 더 연습이 필요해요", "Keep practicing!")}
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

      {!isGood && wrongNums.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 w-full text-left">
          <p className="text-amber-700 text-xs font-semibold mb-2">
            {teacherAssigned
              ? t("📩 선생님이 추가로 준비한 연습이에요", "📩 Extra practice from your teacher")
              : t("틀린 문제를 다시 풀어봐요", "Review the problems you missed")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {wrongNums.map(n => (
              <span key={n} className="text-xs font-bold bg-white border border-amber-300 text-amber-700 rounded-lg px-2 py-0.5">
                #{n}
              </span>
            ))}
          </div>
        </div>
      )}

      {isGood && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 w-full">
          <p className="text-emerald-700 text-sm font-medium">
            {setNum === 1
              ? t("🌟 세트 1 완료!", "🌟 Set 1 complete!")
              : t(`세트 ${setNum} 완료! 계속 잘 하고 있어요.`, `Set ${setNum} complete! Keep it up.`)}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full">
        {!isGood && wrongNums.length > 0 && (
          <button
            onClick={onRetryWrong}
            className="w-full py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors"
          >
            {t(`틀린 ${wrongNums.length}문제 다시 풀기 →`, `Retry ${wrongNums.length} wrong →`)}
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
          {isGood ? t("완료!", "Done!") : t("오늘은 여기까지", "That's enough for now")}
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
  const { t, lang } = useLanguage()
  const [phase, setPhase] = useState<Phase>("loading")
  const [dbSessions, setDbSessions] = useState<DbSession[]>([])
  const [currentSet, setCurrentSet] = useState(1)
  const [roundProblems, setRoundProblems] = useState<PracticeProblem[]>([])
  const [index, setIndex] = useState(0)
  const [passedInRound, setPassedInRound] = useState<Set<string>>(new Set())
  const [canAdvance, setCanAdvance] = useState(false)
  const [teacherAssignedId, setTeacherAssignedId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isRetryMode, setIsRetryMode] = useState(false)

  const loadSessions = useCallback(async () => {
    if (!userId) {
      // 로그인 없어도 localStorage 진행 상황 복원 가능
      const saved = tryLoadProgress(cluster.id, cluster.problems)
      if (saved) {
        setCurrentSet(saved.setNum)
        setRoundProblems(saved.problems)
        setIndex(saved.index)
        setPassedInRound(new Set(saved.passedIds))
        setIsRetryMode(saved.isRetry)
        setCanAdvance(saved.passedIds.includes(saved.problems[saved.index]?.id ?? ""))
        setPhase("solving")
      } else {
        setCurrentSet(1)
        setPhase("intro")
      }
      return
    }
    try {
      const res = await fetch(`/api/practice/sessions?clusterId=${cluster.id}`)
      const json = await res.json()
      const sessions: DbSession[] = json.sessions ?? []
      setDbSessions(sessions)

      const completed = sessions.filter(s => s.completed_at && !s.teacher_assigned)
      const pendingTeacher = sessions.find(s => s.teacher_assigned && !s.completed_at)

      let expectedSet: number
      if (pendingTeacher) {
        setTeacherAssignedId(pendingTeacher.id)
        expectedSet = pendingTeacher.round
        setCurrentSet(expectedSet)
      } else {
        const lastSet = completed.length > 0 ? Math.max(...completed.map(s => s.round)) : 0
        expectedSet = lastSet + 1
        setCurrentSet(expectedSet)
      }

      // localStorage에 해당 세트의 진행 상황이 있으면 복원
      const saved = tryLoadProgress(cluster.id, cluster.problems)
      if (saved && saved.setNum === expectedSet) {
        setRoundProblems(saved.problems)
        setIndex(saved.index)
        setPassedInRound(new Set(saved.passedIds))
        setIsRetryMode(saved.isRetry)
        setCanAdvance(saved.passedIds.includes(saved.problems[saved.index]?.id ?? ""))
        setPhase("solving")
        return
      }
    } catch {
      setCurrentSet(1)
    }
    setPhase("intro")
  }, [cluster.id, cluster.problems, userId])

  useEffect(() => { loadSessions() }, [loadSessions])

  // ── 풀이 진행 상황 자동 저장 ──────────────────────────────────────
  const prevPhase = useRef<string>("")
  useEffect(() => {
    if (phase === "solving" && roundProblems.length > 0) {
      try {
        localStorage.setItem(progressKey(cluster.id), JSON.stringify({
          setNum: currentSet,
          index,
          passedIds: [...passedInRound],
          isRetry: isRetryMode,
          problemIds: roundProblems.map(p => p.id),
        }))
      } catch {}
    }
    prevPhase.current = phase
  }, [phase, currentSet, index, passedInRound, isRetryMode, roundProblems, cluster.id])

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

  const startSet = useCallback((setNum: number, problems?: PracticeProblem[]) => {
    const p = problems ?? getSetProblems(cluster.problems, setNum)
    setRoundProblems(p)
    setIndex(0)
    setPassedInRound(new Set())
    setCanAdvance(false)
    setPhase("solving")
  }, [cluster.problems])

  const handleSuccess = useCallback(async (starred: boolean) => {
    const p = roundProblems[index]
    if (!p) return
    await onMarkSolved(p.id)
    if (starred) await onMarkStarred(p.id)
    setPassedInRound(prev => new Set([...prev, p.id]))
    setCanAdvance(true)
  }, [roundProblems, index, onMarkSolved, onMarkStarred])

  const handleNext = useCallback(async () => {
    if (index + 1 < roundProblems.length) {
      setIndex(i => i + 1)
      setCanAdvance(passedInRound.has(roundProblems[index + 1]?.id ?? ""))
      return
    }
    // 세트 완료 — 저장 후 progress 삭제
    setIsSaving(true)
    await saveSession(currentSet, roundProblems, passedInRound)
    setIsSaving(false)
    try { localStorage.removeItem(progressKey(cluster.id)) } catch {}
    setPhase("round_complete")
  }, [index, roundProblems, currentSet, passedInRound, saveSession, cluster.id])

  // ── 이전 문제로 ────────────────────────────────────────────────────
  const handlePrev = useCallback(() => {
    if (index === 0) return
    const prevIdx = index - 1
    setIndex(prevIdx)
    setCanAdvance(passedInRound.has(roundProblems[prevIdx]?.id ?? ""))
  }, [index, roundProblems, passedInRound])

  const handleRetryWrong = useCallback(() => {
    const wrongProblems = roundProblems.filter(p => !passedInRound.has(p.id))
    setIsRetryMode(true)
    setTeacherAssignedId(null)
    startSet(currentSet, wrongProblems)
  }, [roundProblems, passedInRound, currentSet, startSet])

  const handleOptOut = useCallback(async () => {
    try { localStorage.removeItem(progressKey(cluster.id)) } catch {}
    if (phase === "round_complete") {
      await saveSession(currentSet, roundProblems, passedInRound, true)
    }
    onExit()
  }, [phase, currentSet, roundProblems, passedInRound, saveSession, onExit, cluster.id])

  const wrongNums = roundProblems
    .filter(p => !passedInRound.has(p.id))
    .map(p => problemIndexInCluster(cluster.problems, p.id))

  const current = roundProblems[index] ? localizeProblem(roundProblems[index], lang) : undefined
  const localCluster = localizeCluster(cluster, lang)
  const isMcq = current?.type === "mcq"
  const progressPct = roundProblems.length > 0 ? (index / roundProblems.length) * 100 : 0

  const diffLabel = (d: string) =>
    d === "쉬움" ? t("쉬움", "Easy") :
    d === "보통" ? t("보통", "Medium") :
    t("어려움", "Hard")

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
            <h2 className="text-xl font-bold text-gray-900">{t("모든 세트 완료!", "All sets complete!")}</h2>
            <p className="text-gray-400 text-sm mt-1">{t("클러스터의 모든 문제를 풀었어요.", "You've completed all problems in this cluster.")}</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => { setCurrentSet(1); setPhase("intro") }}
              className="w-full py-3.5 rounded-2xl border-2 border-indigo-200 text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-colors"
            >
              {t("🔄 처음부터 다시 하기", "🔄 Start over")}
            </button>
            <button onClick={onExit} className="w-full py-3.5 rounded-2xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-600 transition-colors">
              {t("목록으로", "Back to list")}
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-sm mx-auto px-4 pt-8 flex flex-col items-center gap-6 text-center">
        <div className="text-5xl">{cluster.emoji}</div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{localCluster.title}</h2>
          {completedSets.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              {t("세트", "Set")} {completedSets.map(s => s.round).join(", ")} {t("완료", "done")}
            </p>
          )}
        </div>

        {isTeacherRound && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl px-5 py-3 w-full">
            <p className="text-orange-700 text-sm font-medium">
              {t("📩 선생님이 추가 연습을 준비했어요!", "📩 Your teacher has prepared extra practice!")}
            </p>
          </div>
        )}

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 w-full text-left space-y-1">
          <p className="text-sm font-bold text-indigo-800">
            {t("세트", "Set")} {currentSet} — {setProblems.length} {t("문제", "problems")}
          </p>
          <p className="text-xs text-indigo-400">
            {currentSet === 1
              ? `#1 – #${SET1_SIZE}`
              : `#${SET1_SIZE + (currentSet - 2) * SET_N_SIZE + 1} – #${SET1_SIZE + (currentSet - 1) * SET_N_SIZE}`}
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button onClick={() => startSet(currentSet)} className="w-full py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors">
            {t("시작하기 →", "Start →")}
          </button>
          <button onClick={onExit} className="w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-500 font-medium text-sm transition-colors">
            {t("나중에 하기", "Later")}
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
              {cluster.emoji} {localCluster.title}
              <span className="ml-1.5 text-xs text-gray-400">
                {t("세트", "Set")} {currentSet}{isRetryMode ? ` (${t("재시도", "retry")})` : ""}
              </span>
            </span>
            <div className="flex items-center gap-2">
              {index > 0 && (
                <button
                  onClick={handlePrev}
                  className="text-xs text-gray-400 hover:text-gray-600 px-2 py-0.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  ← {t("이전", "Prev")}
                </button>
              )}
              <span className="text-xs text-gray-400 font-medium tabular-nums">
                {index + 1} / {roundProblems.length}
              </span>
            </div>
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
          #{problemIndexInCluster(cluster.problems, current.id)}
        </span>
        <span className={cn(
          "text-xs px-2 py-0.5 rounded-full font-medium",
          current.difficulty === "쉬움" ? "text-emerald-700 bg-emerald-100" :
          current.difficulty === "보통" ? "text-amber-700 bg-amber-100" :
          "text-red-700 bg-red-100"
        )}>
          {diffLabel(current.difficulty)}
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
                {/* 예시 입출력 */}
                {current.testCases && current.testCases.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wide">
                      {t("예시 입출력", "Sample I/O")}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {current.testCases.slice(0, 2).map((tc, i) => (
                        <div key={i} className="flex gap-3 font-mono text-xs bg-gray-50 rounded-lg px-3 py-2">
                          <div className="flex-1 min-w-0">
                            <span className="text-gray-400">{t("입력", "Input")}: </span>
                            <span className="text-gray-700 break-all">{tc.stdin || t("(없음)", "(none)")}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-gray-400">{t("출력", "Output")}: </span>
                            <span className="text-emerald-600 font-semibold break-all">{tc.expectedOutput}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
              ? (isSaving ? t("저장 중...", "Saving...") : t("🏁 결과 보기", "🏁 See results"))
              : t("다음 문제 →", "Next →")}
          </button>
        )}
      </div>
    </div>
  )
}
