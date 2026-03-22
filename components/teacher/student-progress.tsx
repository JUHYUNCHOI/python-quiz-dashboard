"use client"

import { cn } from "@/lib/utils"
import { pythonParts, cppParts, pseudoParts, getLessonName, type PartMeta } from "@/lib/curriculum-data"
import { useLanguage } from "@/contexts/language-context"

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

function formatDate(dateStr: string): string {
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

// 레슨별로 learn/review 행 묶기
interface LessonSummary {
  lesson_id: string
  learn: { completed: boolean; score: number; updated_at: string } | null
  review: { completed: boolean; score: number; updated_at: string } | null
}

function buildLessonMap(progress: LessonProgressRow[]): Map<string, LessonSummary> {
  const map = new Map<string, LessonSummary>()
  for (const row of progress) {
    if (!map.has(row.lesson_id)) {
      map.set(row.lesson_id, { lesson_id: row.lesson_id, learn: null, review: null })
    }
    const entry = map.get(row.lesson_id)!
    const data = { completed: row.completed, score: row.score, updated_at: row.updated_at }

    const shouldReplace = (existing: typeof data | null, incoming: typeof data) => {
      if (!existing) return true
      // completed: true는 항상 우선 (variant null/'' 불일치로 생긴 중복 행 대응)
      if (incoming.completed && !existing.completed) return true
      if (!incoming.completed && existing.completed) return false
      // 같은 completed 상태면 최신 것
      return incoming.updated_at > existing.updated_at
    }

    if (row.progress_type === "learn") {
      if (shouldReplace(entry.learn, data)) entry.learn = data
    } else {
      if (shouldReplace(entry.review, data)) entry.review = data
    }
  }
  return map
}

function LessonRow({ summary, name }: { summary: LessonSummary | undefined; name: string }) {
  const learn = summary?.learn ?? null
  const review = summary?.review ?? null

  const learnDone = learn?.completed ?? false
  const inProgress = !learnDone && learn !== null
  const notStarted = !learnDone && learn === null

  return (
    <div className={cn(
      "grid grid-cols-[1fr_auto_auto] gap-x-2 items-center px-2 py-1.5 rounded-lg",
      learnDone ? "bg-green-50" : inProgress ? "bg-amber-50" : "opacity-35"
    )}>
      {/* 레슨 이름 + 상태 */}
      <div className="flex items-center gap-1.5 min-w-0">
        <span className={cn(
          "w-1.5 h-1.5 rounded-full flex-shrink-0",
          learnDone ? "bg-green-500" : inProgress ? "bg-amber-400" : "bg-gray-300"
        )} />
        <span className={cn(
          "text-xs font-medium truncate",
          learnDone ? "text-green-800" : inProgress ? "text-amber-800" : "text-gray-400"
        )}>
          {name}
        </span>
      </div>

      {/* 학습 칸 */}
      <div className="flex flex-col items-end gap-0.5 w-20 flex-shrink-0">
        {learnDone ? (
          <>
            <span className="text-[10px] font-bold text-green-600">학습 완료</span>
            <span className="text-[9px] text-gray-400">{formatDate(learn!.updated_at)}</span>
          </>
        ) : inProgress ? (
          <>
            <div className="flex items-center gap-1">
              <div className="w-12 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${Math.min(learn!.score || 5, 100)}%` }}
                />
              </div>
              <span className="text-[9px] text-amber-600 font-bold">
                {learn!.score > 0 ? `${learn!.score}%` : "시작"}
              </span>
            </div>
            <span className="text-[9px] text-gray-400">{formatDate(learn!.updated_at)}</span>
          </>
        ) : (
          <span className="text-[10px] text-gray-300">미시작</span>
        )}
      </div>

      {/* 복습 칸 */}
      <div className="flex flex-col items-end gap-0.5 w-16 flex-shrink-0">
        {!learnDone ? (
          <span className="text-[10px] text-gray-300">—</span>
        ) : review?.completed ? (
          <>
            <span className="text-[10px] font-bold text-blue-600">복습 ✓</span>
            <span className="text-[9px] text-gray-400">{formatDate(review.updated_at)}</span>
          </>
        ) : review ? (
          <>
            <span className="text-[10px] text-amber-500 font-medium">복습 중</span>
            <span className="text-[9px] text-gray-400">{formatDate(review.updated_at)}</span>
          </>
        ) : (
          <span className="text-[10px] text-gray-400">복습 전</span>
        )}
      </div>
    </div>
  )
}

function PartSection({ part, lessonMap, lang }: { part: PartMeta; lessonMap: Map<string, LessonSummary>; lang: "ko" | "en" }) {
  const ids = part.lessonIds.map(String)
  const learnDoneCount = ids.filter(id => lessonMap.get(id)?.learn?.completed).length
  const inProgressCount = ids.filter(id => {
    const s = lessonMap.get(id)
    return s?.learn && !s.learn.completed
  }).length
  const reviewDoneCount = ids.filter(id => lessonMap.get(id)?.review?.completed).length

  // 아무 활동도 없는 파트는 숨김
  if (learnDoneCount === 0 && inProgressCount === 0) return null

  const pct = Math.round((learnDoneCount / ids.length) * 100)

  return (
    <div className="space-y-1">
      {/* 파트 헤더 */}
      <div className="flex items-center gap-2 mt-3 mb-1">
        <span className="text-[11px] font-bold text-gray-600">{part.title}</span>
        <span className={cn(
          "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
          learnDoneCount === ids.length ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
        )}>
          {learnDoneCount}/{ids.length}
        </span>
        {inProgressCount > 0 && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-600 font-bold">
            진행 중 {inProgressCount}
          </span>
        )}
        {/* 진도 바 */}
        <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full", pct === 100 ? "bg-green-500" : "bg-blue-400")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* 컬럼 헤더 */}
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-2 px-2 mb-0.5">
        <div />
        <div className="text-[9px] text-gray-400 w-20 text-right">학습</div>
        <div className="text-[9px] text-gray-400 w-16 text-right">복습</div>
      </div>

      {/* 레슨 목록 */}
      <div className="space-y-0.5">
        {ids.map(id => (
          <LessonRow key={id} summary={lessonMap.get(id)} name={getLessonName(id, lang)} />
        ))}
      </div>

      {/* 파트 복습 요약 */}
      {learnDoneCount > 0 && (
        <div className="flex items-center gap-1 px-2 pt-0.5">
          <span className="text-[9px] text-gray-400">
            복습 완료 {reviewDoneCount}/{learnDoneCount}
          </span>
          <div className="flex-1 h-0.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-300 rounded-full"
              style={{ width: learnDoneCount > 0 ? `${Math.round((reviewDoneCount / learnDoneCount) * 100)}%` : "0%" }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function LanguageSection({ title, emoji, parts, lessonMap, lang }: {
  title: string
  emoji: string
  parts: PartMeta[]
  lessonMap: Map<string, LessonSummary>
  lang: "ko" | "en"
}) {
  const allIds = parts.flatMap(p => p.lessonIds.map(String))
  const learnDone = allIds.filter(id => lessonMap.get(id)?.learn?.completed).length
  const reviewDone = allIds.filter(id => lessonMap.get(id)?.review?.completed).length
  const hasAny = allIds.some(id => lessonMap.has(id))
  if (!hasAny) return null

  return (
    <div className="space-y-0">
      <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
        <span className="text-sm">{emoji}</span>
        <span className="font-bold text-sm text-gray-700">{title}</span>
        <span className="text-xs text-gray-400">{learnDone}/{allIds.length} 학습</span>
        <span className="text-xs text-blue-400">{reviewDone}/{learnDone || 0} 복습</span>
      </div>
      {parts.map(part => (
        <PartSection key={part.id} part={part} lessonMap={lessonMap} lang={lang} />
      ))}
    </div>
  )
}

export function StudentProgress({ lessonProgress }: Props) {
  const { lang } = useLanguage()

  if (lessonProgress.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-3 text-center">아직 학습 기록이 없어요</p>
    )
  }

  const lessonMap = buildLessonMap(lessonProgress)

  // 전체 요약
  const allIds = [
    ...pythonParts.flatMap(p => p.lessonIds.map(String)),
    ...cppParts.flatMap(p => p.lessonIds.map(String)),
    ...pseudoParts.flatMap(p => p.lessonIds.map(String)),
  ]
  const totalLearnDone = allIds.filter(id => lessonMap.get(id)?.learn?.completed).length
  const totalReviewDone = allIds.filter(id => lessonMap.get(id)?.review?.completed).length
  const totalInProgress = [...lessonMap.values()].filter(s => s.learn && !s.learn.completed).length

  // 가장 최근 활동
  const sorted = [...lessonProgress].sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""))
  const lastRow = sorted[0]

  return (
    <div className="mt-3 space-y-4">
      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center py-2 px-1 bg-green-50 rounded-lg">
          <div className="text-lg font-black text-green-600">{totalLearnDone}</div>
          <div className="text-[10px] text-gray-500">학습 완료</div>
        </div>
        <div className="text-center py-2 px-1 bg-amber-50 rounded-lg">
          <div className="text-lg font-black text-amber-500">{totalInProgress}</div>
          <div className="text-[10px] text-gray-500">진행 중</div>
        </div>
        <div className="text-center py-2 px-1 bg-blue-50 rounded-lg">
          <div className="text-lg font-black text-blue-500">{totalReviewDone}</div>
          <div className="text-[10px] text-gray-500">복습 완료</div>
        </div>
      </div>

      {/* 최근 활동 */}
      {lastRow && (
        <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg border border-indigo-200">
          <span className="text-xs">📖</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-indigo-700">최근 활동:</span>
              <span className="text-xs text-indigo-600 truncate">{getLessonName(lastRow.lesson_id, lang)}</span>
            </div>
            <div className="text-[10px] text-indigo-400">
              {lastRow.progress_type === "learn" ? "학습" : "복습"} · {formatDate(lastRow.updated_at)}
              {lastRow.completed ? " · 완료" : lastRow.score ? ` · ${lastRow.score}% 진행` : " · 진행 중"}
            </div>
          </div>
        </div>
      )}

      {/* 언어별 섹션 */}
      <LanguageSection title="Python" emoji="🐍" parts={pythonParts} lessonMap={lessonMap} lang={lang} />
      <LanguageSection title="C++" emoji="⚡" parts={cppParts} lessonMap={lessonMap} lang={lang} />
      <LanguageSection title="Pseudocode" emoji="📋" parts={pseudoParts} lessonMap={lessonMap} lang={lang} />
    </div>
  )
}
