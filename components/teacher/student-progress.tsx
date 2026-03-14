"use client"

import { Check, Clock, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { pythonParts, cppParts, pseudoParts, type PartMeta } from "@/lib/curriculum-data"

interface LessonProgressRow {
  lesson_id: string
  progress_type: "learn" | "review"
  completed: boolean
  score: number
  updated_at: string
}

interface Props {
  lessonProgress: LessonProgressRow[]
}

// 학생이 완료한 lesson_id Set 구축
function getCompletedSet(progress: LessonProgressRow[]): Set<string> {
  const set = new Set<string>()
  for (const lp of progress) {
    if (lp.completed) set.add(lp.lesson_id)
  }
  return set
}

// 진행 중 (started but not completed) Set
function getInProgressSet(progress: LessonProgressRow[]): Set<string> {
  const completed = getCompletedSet(progress)
  const set = new Set<string>()
  for (const lp of progress) {
    if (!lp.completed && !completed.has(lp.lesson_id)) {
      set.add(lp.lesson_id)
    }
  }
  return set
}

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            pct === 100 ? "bg-green-500" : pct > 0 ? "bg-blue-500" : "bg-gray-200"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold text-gray-500 w-12 text-right">{completed}/{total}</span>
    </div>
  )
}

function LessonGrid({ part, completedSet, inProgressSet }: {
  part: PartMeta
  completedSet: Set<string>
  inProgressSet: Set<string>
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {part.lessonIds.map(id => {
        const idStr = String(id)
        const done = completedSet.has(idStr)
        const inProgress = inProgressSet.has(idStr)
        // Extract short label from lesson ID
        const label = idStr.replace("cpp-", "C").replace("pseudo-", "P").replace("igcse-", "IG-")
        return (
          <div
            key={idStr}
            title={`${idStr} ${done ? "완료" : inProgress ? "진행중" : "미시작"}`}
            className={cn(
              "w-7 h-7 rounded text-[10px] font-bold flex items-center justify-center",
              done ? "bg-green-500 text-white" :
              inProgress ? "bg-amber-100 text-amber-700 border border-amber-300" :
              "bg-gray-100 text-gray-400"
            )}
          >
            {done ? <Check className="w-3.5 h-3.5" /> :
             inProgress ? <Clock className="w-3 h-3" /> :
             <Minus className="w-3 h-3" />}
          </div>
        )
      })}
    </div>
  )
}

function LanguageSection({ title, emoji, parts, completedSet, inProgressSet }: {
  title: string
  emoji: string
  parts: PartMeta[]
  completedSet: Set<string>
  inProgressSet: Set<string>
}) {
  const totalLessons = parts.reduce((sum, p) => sum + p.lessonIds.length, 0)
  const completedLessons = parts.reduce((sum, p) =>
    sum + p.lessonIds.filter(id => completedSet.has(String(id))).length, 0
  )

  if (completedLessons === 0 && !parts.some(p => p.lessonIds.some(id => inProgressSet.has(String(id))))) {
    return null // 이 언어에 활동이 없으면 숨김
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-base">{emoji}</span>
        <span className="font-bold text-sm text-gray-700">{title}</span>
        <span className="text-xs text-gray-400">{completedLessons}/{totalLessons}</span>
      </div>
      <ProgressBar completed={completedLessons} total={totalLessons} />
      {parts.map(part => {
        const partCompleted = part.lessonIds.filter(id => completedSet.has(String(id))).length
        const partInProgress = part.lessonIds.some(id => inProgressSet.has(String(id)))
        if (partCompleted === 0 && !partInProgress) return null
        return (
          <div key={part.id} className="ml-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{part.title}</span>
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                partCompleted === part.lessonIds.length
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              )}>
                {partCompleted}/{part.lessonIds.length}
              </span>
            </div>
            <LessonGrid part={part} completedSet={completedSet} inProgressSet={inProgressSet} />
          </div>
        )
      })}
    </div>
  )
}

export function StudentProgress({ lessonProgress }: Props) {
  if (lessonProgress.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-3 text-center">아직 학습 기록이 없어요</p>
    )
  }

  const completedSet = getCompletedSet(lessonProgress)
  const inProgressSet = getInProgressSet(lessonProgress)

  // 전체 통계
  const totalCompleted = completedSet.size
  const totalInProgress = inProgressSet.size

  return (
    <div className="mt-3 space-y-4">
      {/* 전체 요약 */}
      <div className="flex gap-3">
        <div className="flex-1 text-center py-2 px-3 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-600">{totalCompleted}</div>
          <div className="text-[10px] text-gray-400">완료</div>
        </div>
        <div className="flex-1 text-center py-2 px-3 bg-amber-50 rounded-lg">
          <div className="text-lg font-bold text-amber-600">{totalInProgress}</div>
          <div className="text-[10px] text-gray-400">진행 중</div>
        </div>
      </div>

      {/* 언어별 섹션 */}
      <LanguageSection
        title="Python" emoji="🐍"
        parts={pythonParts}
        completedSet={completedSet}
        inProgressSet={inProgressSet}
      />
      <LanguageSection
        title="C++" emoji="⚡"
        parts={cppParts}
        completedSet={completedSet}
        inProgressSet={inProgressSet}
      />
      <LanguageSection
        title="Pseudocode" emoji="📋"
        parts={pseudoParts}
        completedSet={completedSet}
        inProgressSet={inProgressSet}
      />
    </div>
  )
}
