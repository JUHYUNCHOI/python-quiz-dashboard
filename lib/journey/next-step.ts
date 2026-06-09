// ============================================
// "길" 다음-1개 엔진 — 기존 진도 위에 얹는 순수 계산 (진도 저장은 안 건드림)
// 설계: docs/superpowers/specs/2026-06-09-journey-path-restructure-design.md
// ============================================

import { CPP_SPINE, type SpineItem } from "./spine-cpp"

export interface JourneyItem extends SpineItem {
  done: boolean
  current: boolean // "지금 할 것" 딱 1개
  locked: boolean // current 이후 = 아직 도달 안 함
}

export interface JourneyView {
  items: JourneyItem[]
  current: JourneyItem | null // 다음 1개 (없으면 = 다 끝)
  doneCount: number
  total: number
  pct: number
}

/**
 * @param completedLessons  레슨/프로젝트 완료 id 집합 (completedLessons localStorage)
 * @param stageDone         단계(코딩뱅크/알고리즘/대회) 완료 키 집합 (현재는 미추적 → 빈 집합)
 */
export function buildCppJourney(
  completedLessons: Set<string | number>,
  stageDone: Set<string> = new Set(),
): JourneyView {
  const isDone = (it: SpineItem): boolean => {
    if (it.kind === "lesson" || it.kind === "project" || it.kind === "prereq") {
      return completedLessons.has(it.key)
    }
    return stageDone.has(it.key) // bank / algo / contest
  }

  // 첫 미완료 = 지금 할 것
  const currentIdx = CPP_SPINE.findIndex((it) => !isDone(it))

  const items: JourneyItem[] = CPP_SPINE.map((it, i) => ({
    ...it,
    done: isDone(it),
    current: i === currentIdx,
    locked: currentIdx !== -1 && i > currentIdx,
  }))

  const doneCount = items.filter((it) => it.done).length
  const total = items.length

  return {
    items,
    current: currentIdx === -1 ? null : items[currentIdx],
    doneCount,
    total,
    pct: total ? Math.round((doneCount / total) * 100) : 0,
  }
}
