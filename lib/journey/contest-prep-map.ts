// ============================================
// 대회 문제를 "길"에 녹이기 — 레슨 → 그 개념으로 풀 수 있는 대회 문제
// 설계: docs/superpowers/specs/2026-06-09-journey-path-restructure-design.md
// TOPIC_PREREQ(토픽→선수 레슨) 을 뒤집어, 각 레슨 직후 나올 대회 문제를 모음.
// ============================================

import { EXTERNAL_PROBLEMS, TOPIC_PREREQ, type ExtProblem } from "@/data/practice/contest-prep-external"

export type JourneyTrack = "python" | "cpp"

const DIFF_ORDER: Record<string, number> = { "쉬움": 0, "보통": 1, "어려움": 2 }

// 레슨 직후 "딱 이거부터" — 토픽별 on-ramp 3개 (큐레이션 에이전트 5개 검증, 함수형·단일개념·선수지식 내).
export const ONRAMP_IDS: Record<string, string[]> = {
  "시뮬레이션": ["lc-412", "lc-1672", "lc-1342"],
  "수학": ["hr-solve-me-first", "lc-9", "lc-202"],
  "배열": ["hr-simple-array-sum", "lc-1431", "lc-1480"],
  "완전탐색": ["hr-electronics-shop", "abc335b", "lc-1854"],
  "투포인터": ["lc-26", "lc-977", "lc-167"],
  "그리드": ["lc-867", "lc-1572", "hr-diagonal-difference"],
  "문자열": ["lc-709", "lc-771", "lc-1108"],
  "map/빈도": ["lc-242", "lc-383", "lc-1"],
  "정렬": ["lc-561", "cc-TSORT", "abc329b"],
  "그리디": ["lc-455", "lc-1710", "hr-marcs-cakewalk"],
}

/** 이 레슨 직후 추천 on-ramp 문제 (해당 트랙 기준) */
export function onRampForLesson(lessonId: string | number, track: JourneyTrack): ExtProblem[] {
  const topics = topicsUnlockedByLesson(lessonId, track)
  const ids = topics.flatMap((t) => ONRAMP_IDS[t] ?? [])
  const byId = new Map(EXTERNAL_PROBLEMS.map((p) => [p.id, p]))
  return ids.map((id) => byId.get(id)).filter((p): p is ExtProblem => !!p)
}

/** 특정 레슨을 끝낸 직후 풀 수 있는 대회 문제 (해당 트랙 기준), 쉬움→어려움 순 */
export function contestProblemsForLesson(lessonId: string | number, track: JourneyTrack): ExtProblem[] {
  const lid = String(lessonId)
  const topics = Object.entries(TOPIC_PREREQ)
    .filter(([, pre]) => (track === "python" ? pre.pyId : pre.cppId) === lid)
    .map(([topic]) => topic)
  if (topics.length === 0) return []
  return EXTERNAL_PROBLEMS
    .filter((p) => topics.includes(p.topic))
    .sort((a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1))
}

/** 이 레슨이 어떤 토픽의 "선수 레슨" 인가 (배지/안내용) */
export function topicsUnlockedByLesson(lessonId: string | number, track: JourneyTrack): string[] {
  const lid = String(lessonId)
  return Object.entries(TOPIC_PREREQ)
    .filter(([, pre]) => (track === "python" ? pre.pyId : pre.cppId) === lid)
    .map(([topic]) => topic)
}

/** 대회 문제가 붙는 레슨 id 집합 (트랙별) — 커리큘럼에서 어디에 배지 달지 */
export function lessonsWithContestProblems(track: JourneyTrack): Set<string> {
  const s = new Set<string>()
  for (const pre of Object.values(TOPIC_PREREQ)) {
    s.add(track === "python" ? pre.pyId : pre.cppId)
  }
  return s
}
