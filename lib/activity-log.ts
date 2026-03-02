/**
 * 학습 활동 날짜별 기록 (히트맵용)
 * — 퀴즈 완료 + 수업 완료 시 호출
 */

const STORAGE_KEY = "activity-log"

/** 활동 맵: { "2025-03-01": 3, "2025-03-02": 1, ... } */
type ActivityMap = Record<string, number>

function load(): ActivityMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function save(map: ActivityMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {}
}

/** 오늘 날짜에 활동 1건 추가 */
export function logActivity(type: "quiz" | "lesson"): void {
  const map = load()
  const today = new Date().toISOString().slice(0, 10)
  map[today] = (map[today] || 0) + 1
  save(map)
}

/** 활동 맵 반환 (히트맵 렌더링용) */
export function getActivityMap(): ActivityMap {
  return load()
}

/** 최근 N일간 총 활동 수 */
export function getRecentActivityCount(days: number = 7): number {
  const map = load()
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  const cutoffStr = cutoff.toISOString().slice(0, 10)

  return Object.entries(map)
    .filter(([date]) => date >= cutoffStr)
    .reduce((sum, [, count]) => sum + count, 0)
}
