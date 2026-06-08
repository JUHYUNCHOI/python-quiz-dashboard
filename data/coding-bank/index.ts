import { codingBankProblems as baseProblems, type CodingBankProblem } from './problems'
import { BANK_CLUSTERS } from '@/data/practice'
import type { PracticeProblem } from '@/data/practice/types'

export type { CodingBankProblem } from './problems'

// ─────────────────────────────────────────────────────────────────────
//  도전 문제 통합 (2026-06): /practice 의 bank 클러스터(B)를 /coding-bank(A)로 합침.
//  - A(curated 30) 우선 유지 + B(100) 변환해서 추가
//  - 두 곳에 겹치던 문제 13개는 A 버전 유지, B 쪽 버림
//  → "도전" 한 곳(/coding-bank)에 ~117문제. /practice 는 연습만.
// ─────────────────────────────────────────────────────────────────────

// bank 클러스터 id → coding-bank 카테고리
const CLUSTER_CATEGORY: Record<string, CodingBankProblem["category"]> = {
  "bank-bf": "brute-force",
  "bank-ds": "sort",
  "bank-sim": "simulation",
  "bank-str": "string",
  "bank-grid": "grid",
}

// A 에 이미 있는 것과 겹치는 B 문제 제목 — B 쪽 버림 (A 버전 유지)
const DROP_B_TITLES = new Set<string>([
  "두 수의 합", "가장 가까운 두 점", "회의실 배정", "성적 통계",
  "애너그램 그룹", "배낭 채우기", "괄호 유효성", "자판기",
  "주차장 관리", "단어 뒤집기", "문자열 압축", "소수 목록", "시저 암호",
])

// 진짜 알고리즘(DP/BFS/투포인터)이 필요한 문제 — "알고리즘 전 단계, STL/완전탐색으로 푼다"는
// 도전뱅크 의도에 안 맞음. 메모리 '콘텐츠 경계'(알고리즘 이론=Algorithm Lab) 결정에 따라 도전뱅크에서 제외.
// (데이터(bank-*.ts)는 그대로 유지 — 나중에 Algorithm Lab 으로 재배치 가능. 여기선 노출만 제외.)
const ALGO_GRADE_TITLES = new Set<string>([
  "최장 증가 부분수열",      // LIS — DP
  "최소 동전 개수",          // coin change — DP/greedy
  "구간 합이 K인 부분배열",  // prefix-sum + hashmap
  "격자 섬 탐색",            // count islands — flood fill (BFS/DFS)
  "격자 경로 수",            // grid path DP
  "격자 경로 최댓값",        // grid path DP
  "격자 곱 경로",            // grid path DP
  "빗물 담기",               // rainwater — two-pointer / stack
])

function fromPractice(p: PracticeProblem, category: CodingBankProblem["category"]): CodingBankProblem {
  return {
    id: p.id,
    category,
    difficulty: p.difficulty,
    title: p.title,
    description: p.description,
    constraints: p.constraints ?? "",
    inputFormat: "",
    outputFormat: "",
    initialCode: p.initialCode,
    testCases: (p.testCases ?? []).map(tc => ({ input: tc.stdin, output: tc.expectedOutput, label: tc.label })),
    hints: p.hints ?? [],
    solutionCode: p.solutionCode ?? "",
    pyInitialCode: p.pyInitialCode,
    pySolutionCode: p.pySolutionCode,
    solutionExplanation: p.solutionExplanation ?? "",
    en: {
      title: p.en?.title ?? p.title,
      description: p.en?.description ?? p.description,
      constraints: p.en?.constraints ?? p.constraints ?? "",
      inputFormat: "",
      outputFormat: "",
      hints: p.en?.hints ?? p.hints ?? [],
      solutionExplanation: p.en?.solutionExplanation ?? p.solutionExplanation ?? "",
    },
  }
}

const bankConverted: CodingBankProblem[] = BANK_CLUSTERS.flatMap(cluster =>
  cluster.problems
    .filter(p => !DROP_B_TITLES.has(p.title) && !ALGO_GRADE_TITLES.has(p.title))
    .map(p => fromPractice(p, CLUSTER_CATEGORY[cluster.id] ?? "brute-force")),
)

/** 통합된 도전 문제 = A(30) + B(중복 제외 변환). A 우선. */
const merged: CodingBankProblem[] = [...baseProblems, ...bankConverted]

export const codingBankProblems = merged
export const CODING_BANK_PROBLEMS = merged

/**
 * 🌟 첫 추천 문제 — cpp-16 직후 학생용 큐레이션 (A 의 cb-* 참조, 그대로 유효).
 */
export const STARTER_PICKS: string[] = [
  "cb-001",  // sort
  "cb-006",  // simulation
  "cb-007",  // simulation
  "cb-014",  // brute-force
  "cb-021",  // map-set
  "cb-026",  // string
  "cb-002",  // sort
  "cb-008",  // simulation
  "cb-015",  // brute-force
  "cb-022",  // map-set
]
