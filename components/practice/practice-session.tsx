"use client"

import { useState, useMemo } from "react"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { McqRunner } from "./mcq-runner"
import { PracticeRunner } from "./practice-runner"
import { cn } from "@/lib/utils"
import type { PracticeProblem, PracticeCluster } from "@/data/practice/types"

// 문제 설명 렌더러 — ```코드블록```, `인라인코드` 처리
function DescriptionBlock({ text }: { text: string }) {
  // ``` ... ``` 코드 블록을 분리
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
        // 인라인 ` ` 처리
        const inline = part.split(/(`[^`]+`)/g).map((seg, j) =>
          seg.startsWith("`")
            ? <code key={j} className="bg-gray-100 text-indigo-600 rounded px-1 py-0.5 font-mono text-[13px]">{seg.slice(1, -1)}</code>
            : <span key={j}>{seg}</span>
        )
        return (
          <p key={i} className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {inline}
          </p>
        )
      })}
    </div>
  )
}

interface PracticeSessionProps {
  cluster: PracticeCluster
  onExit: () => void
  onMarkSolved: (id: string) => Promise<void>
  onMarkStarred: (id: string) => Promise<void>
  solvedSet: Set<string>
}

function Summary({
  correct, total, onExit, onRetry
}: { correct: number; total: number; onExit: () => void; onRetry: () => void }) {
  const pct = Math.round((correct / total) * 100)
  const perfect = correct === total
  const good = pct >= 70

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <div className="text-6xl">{perfect ? "🎉" : good ? "👍" : "💪"}</div>
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-900">
          {correct} / {total}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          {perfect ? "모두 맞혔어요!" : good ? "잘 했어요!" : "계속 연습해봐요!"}
        </p>
      </div>

      {/* 원형 진행 표시 */}
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8" />
          <circle
            cx="48" cy="48" r="40" fill="none"
            stroke={perfect ? "#10b981" : good ? "#6366f1" : "#f59e0b"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - pct / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-800">{pct}%</span>
        </div>
      </div>

      <div className="flex gap-3 w-full max-w-xs">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          다음 세트
        </button>
        <button
          onClick={onExit}
          className="flex-1 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition-colors"
        >
          목록으로
        </button>
      </div>
    </div>
  )
}

export function PracticeSession({ cluster, onExit, onMarkSolved, onMarkStarred, solvedSet }: PracticeSessionProps) {
  // 항상 고정 순서: 미완료 → 완료 (클러스터 원래 순서 유지, 랜덤 없음)
  const buildProblems = () => {
    const unsolved = cluster.problems.filter(p => !solvedSet.has(p.id))
    const solved = cluster.problems.filter(p => solvedSet.has(p.id))
    return [...unsolved, ...solved]
  }

  const [problems] = useState<PracticeProblem[]>(() => buildProblems())
  const [index, setIndex] = useState(0)
  const [setNum, setSetNum] = useState(1)
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set())
  const [canAdvance, setCanAdvance] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const current = problems[index]
  const isMcq = current?.type === "mcq"
  const progressPct = (index / problems.length) * 100

  const handleSuccess = async (starred: boolean) => {
    if (answeredIds.has(current.id)) return
    await onMarkSolved(current.id)
    if (starred) await onMarkStarred(current.id)
    setAnsweredIds(prev => new Set([...prev, current.id]))
    setCorrectCount(c => c + 1)
    setCanAdvance(true)
  }

  const handleNext = () => {
    if (index + 1 >= problems.length) {
      setShowSummary(true)
    } else {
      setIndex(i => i + 1)
      setCanAdvance(false)
    }
  }

  const handlePrev = () => {
    if (index > 0) {
      setIndex(i => i - 1)
      setCanAdvance(true) // 이전 문제는 이미 볼 수 있게
    }
  }

  // 다음 세트: 같은 순서로 처음부터
  const handleNextSet = () => {
    setIndex(0)
    setCorrectCount(0)
    setAnsweredIds(new Set())
    setCanAdvance(false)
    setShowSummary(false)
    setSetNum(n => n + 1)
  }

  if (showSummary) {
    return (
      <div className="max-w-lg mx-auto px-4 pt-4">
        <Summary
          correct={correctCount}
          total={problems.length}
          onExit={onExit}
          onRetry={handleNextSet}
        />
        <p className="text-center text-xs text-gray-400 mt-2">세트 {setNum} 완료</p>
      </div>
    )
  }

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
            </span>
            <span className="text-xs text-gray-400 font-medium tabular-nums">
              {index + 1} / {problems.length}
            </span>
          </div>
          {/* 진행 바 */}
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
            {/* 코드 문제: 설명 + 제약조건 카드 */}
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

      {/* 이전 / 다음 버튼 */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className={cn(
            "px-5 py-3.5 rounded-xl font-bold text-sm transition-colors",
            index > 0
              ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
              : "invisible"
          )}
        >
          ← 이전
        </button>
        {(canAdvance || !isMcq) && (
          <button
            onClick={handleNext}
            className="flex-1 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors"
          >
            {index + 1 >= problems.length ? "🏁 결과 보기" : "다음 문제 →"}
          </button>
        )}
      </div>
    </div>
  )
}
