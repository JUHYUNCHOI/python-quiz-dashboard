export { codingBankProblems, codingBankProblems as CODING_BANK_PROBLEMS } from './problems'
export type { CodingBankProblem } from './problems'

/**
 * 🌟 첫 추천 문제 — cpp-16 직후 학생용 큐레이션
 *
 * 선정 기준:
 * - cpp-1 ~ cpp-16 + cpp-23 (sort) 까지 배운 도구만으로 풀 수 있음
 *   (stack/queue/priority_queue, 파일 I/O 등 cpp-17 이후 도구 X)
 * - 5 가지 카테고리 (sort / simulation / brute-force / map-set / string) 골고루
 * - 쉬움 6 + 보통 4 — 너무 어렵지 않게 시작하면서 점진적 도전
 *
 * 학생 진입 흐름: cpp-16 끝나자마자 "🌟 처음 풀어볼 만한 문제" 섹션에서 시작.
 * 다 풀면 일반 그리드로 자연스럽게 확장.
 */
export const STARTER_PICKS: string[] = [
  // 쉬움 — 카테고리 1 개씩 맛보기
  "cb-001",  // sort
  "cb-006",  // simulation
  "cb-007",  // simulation
  "cb-014",  // brute-force
  "cb-021",  // map-set
  "cb-026",  // string
  // 보통 — 한 단계 도전
  "cb-002",  // sort
  "cb-008",  // simulation
  "cb-015",  // brute-force
  "cb-022",  // map-set
]
