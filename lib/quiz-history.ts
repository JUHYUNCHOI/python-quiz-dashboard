/**
 * 퀴즈 이력 localStorage 관리
 * — 최대 100건 저장, 진도 페이지에서 통계 계산에 사용
 */

export interface QuizHistoryEntry {
  id: string
  date: string          // "2025-03-01"
  timestamp: number
  totalQuestions: number
  correctAnswers: number
  accuracy: number      // 0–100
  maxCombo: number
  timeElapsedMs: number
  difficulty: string
  endReason: "completed" | "hearts"
  xpEarned: number
  topicResults: { topic: string; correct: number; total: number }[]
  // 복습 세션 추적 (선택적)
  isReview?: boolean
  lessonFilter?: number | string
}

/** 특정 레슨 복습을 완료한 적 있는지 확인 */
export function hasReviewedLesson(lessonId: number | string): boolean {
  return load().some(
    e => e.isReview && String(e.lessonFilter) === String(lessonId) && e.endReason === "completed"
  )
}

const STORAGE_KEY = "quiz-history"
const MAX_ENTRIES = 100
// 100건 한도로 오래된 기록이 삭제돼도 정확한 총 문제 수를 보존하는 별도 카운터
const TOTAL_QUESTIONS_KEY = "quiz-questions-total"

function loadTotalQuestions(): number {
  try {
    const raw = localStorage.getItem(TOTAL_QUESTIONS_KEY)
    return raw ? (parseInt(raw, 10) || 0) : 0
  } catch { return 0 }
}

function saveTotalQuestions(count: number): void {
  try { localStorage.setItem(TOTAL_QUESTIONS_KEY, String(count)) } catch {}
}

function load(): QuizHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function save(entries: QuizHistoryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {}
}

/** 전체 퀴즈 이력 반환 (최신순) */
export function getQuizHistory(): QuizHistoryEntry[] {
  return load()
}

/** 새 퀴즈 이력 추가 (100건 초과 시 오래된 것 제거) */
export function addQuizHistoryEntry(entry: Omit<QuizHistoryEntry, "id">): void {
  const entries = load()
  const newEntry: QuizHistoryEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  }
  entries.unshift(newEntry)
  if (entries.length > MAX_ENTRIES) {
    entries.length = MAX_ENTRIES
  }
  save(entries)
  // 별도 누적 카운터 — 기록 삭제 후에도 정확한 총 문제 수 보존
  saveTotalQuestions(loadTotalQuestions() + entry.totalQuestions)
}

/** 토픽별 통계 집계 (정답률 + 총 문제 수) */
export function getTopicStats(): { topic: string; correct: number; total: number; accuracy: number }[] {
  const entries = load()
  const map = new Map<string, { correct: number; total: number }>()

  for (const entry of entries) {
    for (const tr of (entry.topicResults || [])) {
      const prev = map.get(tr.topic) || { correct: 0, total: 0 }
      map.set(tr.topic, {
        correct: prev.correct + tr.correct,
        total: prev.total + tr.total,
      })
    }
  }

  return Array.from(map.entries())
    .map(([topic, { correct, total }]) => ({
      topic,
      correct,
      total,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
}

/** 일별 정답률 추이 (최근 N일, 날짜별 집계) */
export function getAccuracyTrend(days: number = 30): { date: string; accuracy: number; count: number }[] {
  const entries = load()
  const map = new Map<string, { correct: number; total: number; count: number }>()

  for (const entry of entries) {
    const prev = map.get(entry.date) || { correct: 0, total: 0, count: 0 }
    map.set(entry.date, {
      correct: prev.correct + entry.correctAnswers,
      total: prev.total + entry.totalQuestions,
      count: prev.count + 1,
    })
  }

  // 최근 N일만 필터
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  const cutoffStr = cutoff.toISOString().slice(0, 10)

  return Array.from(map.entries())
    .filter(([date]) => date >= cutoffStr)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, { correct, total, count }]) => ({
      date,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      count,
    }))
}

/** 총 퀴즈 수 */
export function getTotalQuizCount(): number {
  return load().length
}

/** 총 풀은 문제 수 (별도 카운터 우선 — 기록 삭제 후에도 정확) */
export function getTotalQuestionsAnswered(): number {
  const stored = loadTotalQuestions()
  // 누적 카운터가 있으면 사용, 없으면 히스토리에서 계산 (기존 사용자 마이그레이션)
  if (stored > 0) return stored
  return load().reduce((sum, e) => sum + e.totalQuestions, 0)
}
