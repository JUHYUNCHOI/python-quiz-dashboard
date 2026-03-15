"use client"

import { Check, Clock, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { pythonParts, cppParts, pseudoParts, getLessonName, type PartMeta } from "@/lib/curriculum-data"

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

// 진행 중 Set
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

// 레슨별 최근 업데이트 날짜
function getUpdatedMap(progress: LessonProgressRow[]): Map<string, string> {
  const map = new Map<string, string>()
  for (const lp of progress) {
    const existing = map.get(lp.lesson_id)
    if (!existing || lp.updated_at > existing) {
      map.set(lp.lesson_id, lp.updated_at)
    }
  }
  return map
}

function formatShortDate(dateStr: string): string {
  if (!dateStr) return ""
  try {
    const d = new Date(dateStr)
    const today = new Date()
    if (d.toDateString() === today.toDateString()) return "오늘"
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return "어제"
    return `${d.getMonth() + 1}/${d.getDate()}`
  } catch {
    return ""
  }
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

function LessonList({ part, completedSet, inProgressSet, updatedMap }: {
  part: PartMeta
  completedSet: Set<string>
  inProgressSet: Set<string>
  updatedMap: Map<string, string>
}) {
  return (
    <div className="space-y-0.5">
      {part.lessonIds.map(id => {
        const idStr = String(id)
        const done = completedSet.has(idStr)
        const inProgress = inProgressSet.has(idStr)
        const name = getLessonName(idStr)
        const date = updatedMap.get(idStr)

        return (
          <div
            key={idStr}
            className={cn(
              "flex items-center gap-2 px-2 py-1 rounded-lg text-xs",
              done ? "bg-green-50" :
              inProgress ? "bg-amber-50" :
              "opacity-40"
            )}
          >
            {/* 상태 아이콘 */}
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
              done ? "bg-green-500 text-white" :
              inProgress ? "bg-amber-400 text-white" :
              "bg-gray-200 text-gray-400"
            )}>
              {done ? <Check className="w-3 h-3" /> :
               inProgress ? <Clock className="w-3 h-3" /> :
               <Minus className="w-2.5 h-2.5" />}
            </div>

            {/* 레슨 이름 */}
            <span className={cn(
              "flex-1 font-medium truncate",
              done ? "text-green-700" :
              inProgress ? "text-amber-700" :
              "text-gray-400"
            )}>
              {name}
            </span>

            {/* 날짜 */}
            {date && (
              <span className="text-[10px] text-gray-400 flex-shrink-0">
                {formatShortDate(date)}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

function LanguageSection({ title, emoji, parts, completedSet, inProgressSet, updatedMap }: {
  title: string
  emoji: string
  parts: PartMeta[]
  completedSet: Set<string>
  inProgressSet: Set<string>
  updatedMap: Map<string, string>
}) {
  const totalLessons = parts.reduce((sum, p) => sum + p.lessonIds.length, 0)
  const completedLessons = parts.reduce((sum, p) =>
    sum + p.lessonIds.filter(id => completedSet.has(String(id))).length, 0
  )

  if (completedLessons === 0 && !parts.some(p => p.lessonIds.some(id => inProgressSet.has(String(id))))) {
    return null
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
          <div key={part.id} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">{part.title}</span>
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                partCompleted === part.lessonIds.length
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              )}>
                {partCompleted}/{part.lessonIds.length}
              </span>
            </div>
            <LessonList
              part={part}
              completedSet={completedSet}
              inProgressSet={inProgressSet}
              updatedMap={updatedMap}
            />
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
  const updatedMap = getUpdatedMap(lessonProgress)

  const totalCompleted = completedSet.size
  const totalInProgress = inProgressSet.size

  // 가장 최근 활동 레슨
  const sorted = [...lessonProgress].sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""))
  const lastLesson = sorted[0]
  const lastLessonName = lastLesson ? getLessonName(lastLesson.lesson_id) : null

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

      {/* 최근 활동 레슨 */}
      {lastLesson && lastLessonName && (
        <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg border border-indigo-200">
          <span className="text-xs">📖</span>
          <span className="text-xs font-bold text-indigo-700">최근:</span>
          <span className="text-xs text-indigo-600 truncate flex-1">{lastLessonName}</span>
          <span className="text-[10px] text-indigo-400">{formatShortDate(lastLesson.updated_at)}</span>
          {lastLesson.completed && <Check className="w-3 h-3 text-green-500" />}
        </div>
      )}

      {/* 언어별 섹션 */}
      <LanguageSection
        title="Python" emoji="🐍"
        parts={pythonParts}
        completedSet={completedSet}
        inProgressSet={inProgressSet}
        updatedMap={updatedMap}
      />
      <LanguageSection
        title="C++" emoji="⚡"
        parts={cppParts}
        completedSet={completedSet}
        inProgressSet={inProgressSet}
        updatedMap={updatedMap}
      />
      <LanguageSection
        title="Pseudocode" emoji="📋"
        parts={pseudoParts}
        completedSet={completedSet}
        inProgressSet={inProgressSet}
        updatedMap={updatedMap}
      />
    </div>
  )
}
