/**
 * 게임형 학습 로드맵 — 스테이지 정의 + 진도 계산.
 *
 * 메인 라인 (스토리 진행):
 *   1. 🐍 Python 기초    (Part 1-4)
 *   2. 🐍 Python 심화    (Part 5-9 + p4)
 *   3. ⚡ C++ 기초        (cpp-1~8, p1, ck1, ck7)
 *   4. ⚡ C++ STL         (cpp-9~14, 21, 22, p2 + ck2/3/6/9)
 *   5. ⚡ C++ USACO 메인  (cpp-15, 23, 16 — Bronze 80% 달성)
 *   6. 🌟 코딩 뱅크 다리  (5문제)
 *   7. 🧠 알고리즘 Lab    (21 토픽)
 *   8. 🏆 USACO 실전     (USACO Bronze / MCC)
 *
 * 가지 (사이드 퀘스트, 메인에서 분기):
 *   - 📌 C++ 심화 참고 (cpp-17~20) — Stage 5 에서 분기
 *   - 🏆 cpp-p3 USACO 모의전     — Stage 5 에서 분기
 *
 * 규칙:
 *   - C++ 진도 있는 학생 → Python 스테이지 자동 ✅ 완료 표시
 *     (C++ 까지 왔으면 Python 은 안다고 가정)
 */

import { ALGO_TOPICS } from "@/data/algo/topics"

export type StageType = "main" | "branch"
export type StageStatus = "locked" | "available" | "in-progress" | "completed"
export type StageRank = "bronze" | "silver" | "gold" | "master" | "bridge"

export interface JourneyStage {
  id: string
  type: StageType
  emoji: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  href: string
  rank: StageRank
  /** 메인 스테이지 ID (가지일 때만) */
  branchOf?: string
  /** 진도 계산용 lesson IDs */
  lessonIds?: (string | number)[]
  /** 특수 진도 계산 (algo/bank 등) */
  computeProgress?: (completedIds: Set<string | number>) => { done: number; total: number }
}

const range = (s: number, e: number): number[] => Array.from({ length: e - s + 1 }, (_, i) => s + i)

/** Python 기초 — Part 1-4 (1~31 + p1~p3) */
const PY_BASIC_IDS: (string | number)[] = [...range(1, 31), "p1", "p2", "p3"]
/** Python 심화 — Part 5-9 (32~52 + p4) */
const PY_ADVANCED_IDS: (string | number)[] = [...range(32, 52), "p4"]

/** C++ 기초 — Part 1 */
const CPP_BASIC_IDS = ["cpp-1", "cpp-2", "cpp-3", "cpp-4", "cpp-5", "cpp-6", "cpp-7", "cpp-ck1", "cpp-8", "cpp-ck7", "cpp-p1"]
/** C++ STL — Part 2 */
const CPP_STL_IDS = ["cpp-9", "cpp-ck2", "cpp-21", "cpp-ck6", "cpp-10", "cpp-11", "cpp-12", "cpp-13", "cpp-ck9", "cpp-14", "cpp-ck3", "cpp-22", "cpp-p2"]
/** C++ USACO 메인 (cpp-15, 23, 16) — Bronze 80% ready */
const CPP_MAIN_IDS = ["cpp-15", "cpp-23", "cpp-ck4", "cpp-16", "cpp-ck5"]
/** C++ 심화 참고 (cpp-17~20) — 가지 */
const CPP_ADVANCED_IDS = ["cpp-17", "cpp-ck10", "cpp-18", "cpp-ck8", "cpp-19", "cpp-20"]

const CODING_BANK_THRESHOLD = 5

export const JOURNEY_STAGES: JourneyStage[] = [
  // ── 메인 라인 ─────────────────────────────────────────────
  {
    id: "py-basic",
    type: "main",
    emoji: "🐍",
    title: "Python 기초",
    titleEn: "Python Basics",
    description: "변수 · 조건 · 반복 · 자료구조 — 코딩 첫 발걸음",
    descriptionEn: "Variables · conditionals · loops · data structures",
    href: "/curriculum?course=python",
    rank: "bronze",
    lessonIds: PY_BASIC_IDS,
  },
  {
    id: "py-advanced",
    type: "main",
    emoji: "🐍",
    title: "Python 심화",
    titleEn: "Python Advanced",
    description: "함수 · 클래스 · 모듈 · RPG 프로젝트",
    descriptionEn: "Functions · classes · modules · RPG project",
    href: "/curriculum?course=python",
    rank: "silver",
    lessonIds: PY_ADVANCED_IDS,
  },
  {
    id: "cpp-basic",
    type: "main",
    emoji: "⚡",
    title: "C++ 기초",
    titleEn: "C++ Basics",
    description: "파이썬 → C++ 전환 — 컴파일러 · cin/cout · 함수",
    descriptionEn: "Python → C++ — compiler · cin/cout · functions",
    href: "/curriculum?course=cpp",
    rank: "bronze",
    lessonIds: CPP_BASIC_IDS,
  },
  {
    id: "cpp-stl",
    type: "main",
    emoji: "⚡",
    title: "C++ STL",
    titleEn: "C++ STL",
    description: "벡터 · 포인터 · 구조체 · 클래스",
    descriptionEn: "Vectors · pointers · structs · classes",
    href: "/curriculum?course=cpp",
    rank: "silver",
    lessonIds: CPP_STL_IDS,
  },
  {
    id: "cpp-usaco-main",
    type: "main",
    emoji: "⚡",
    title: "C++ USACO 메인",
    titleEn: "C++ USACO Core",
    description: "pair · sort · map/set — USACO Bronze 80% 클리어",
    descriptionEn: "pair · sort · map/set — USACO Bronze 80% ready",
    href: "/curriculum?course=cpp",
    rank: "gold",
    lessonIds: CPP_MAIN_IDS,
  },
  {
    id: "coding-bank",
    type: "main",
    emoji: "🌟",
    title: "코딩 뱅크",
    titleEn: "Coding Bank",
    description: "문법 → 실전 다리 — 알고리즘 가기 전 워밍업",
    descriptionEn: "Bridge from syntax to real problems",
    href: "/coding-bank",
    rank: "bridge",
    computeProgress: () => {
      // localStorage 에서 풀어본 문제 수 확인
      if (typeof window === "undefined") return { done: 0, total: CODING_BANK_THRESHOLD }
      try {
        const raw = localStorage.getItem("coding-bank-solved")
        if (!raw) return { done: 0, total: CODING_BANK_THRESHOLD }
        const arr = JSON.parse(raw)
        const done = Array.isArray(arr) ? Math.min(arr.length, CODING_BANK_THRESHOLD) : 0
        return { done, total: CODING_BANK_THRESHOLD }
      } catch {
        return { done: 0, total: CODING_BANK_THRESHOLD }
      }
    },
  },
  {
    id: "algo",
    type: "main",
    emoji: "🧠",
    title: "알고리즘 Lab",
    titleEn: "Algorithm Lab",
    description: `BFS/DFS · DP · 그리디 — ${ALGO_TOPICS.length}개 토픽`,
    descriptionEn: `BFS/DFS · DP · Greedy — ${ALGO_TOPICS.length} topics`,
    href: "/algo",
    rank: "silver",
    computeProgress: (completedIds) => {
      const done = ALGO_TOPICS.filter(tp => completedIds.has(tp.lessonId)).length
      return { done, total: ALGO_TOPICS.length }
    },
  },
  {
    id: "usaco",
    type: "main",
    emoji: "🏆",
    title: "USACO / MCC 실전",
    titleEn: "USACO / MCC Contest",
    description: "실전 대회 문제 — Bronze / Silver / MCC",
    descriptionEn: "Real contest problems",
    href: "/quest",
    rank: "master",
    computeProgress: (completedIds) => {
      // cq-* 진도 카운트
      const done = [...completedIds].filter(id => String(id).startsWith("cq-")).length
      // 임의 목표: 5문제 시작점
      return { done: Math.min(done, 5), total: 5 }
    },
  },

  // ── 가지 (사이드 퀘스트) ──────────────────────────────────
  {
    id: "cpp-advanced-ref",
    type: "branch",
    branchOf: "cpp-usaco-main",
    emoji: "📌",
    title: "C++ 심화 참고",
    titleEn: "C++ Advanced (Ref)",
    description: "cpp-17~20 — 알고리즘 진행 중 필요할 때",
    descriptionEn: "cpp-17~20 — reference when needed",
    href: "/learn/cpp-17",
    rank: "silver",
    lessonIds: CPP_ADVANCED_IDS,
  },
  {
    id: "cpp-p3-mock",
    type: "branch",
    branchOf: "cpp-usaco-main",
    emoji: "🏆",
    title: "USACO 모의전",
    titleEn: "USACO Mock",
    description: "cpp-p3 — 메인 트랙 졸업 후 실전 감각",
    descriptionEn: "cpp-p3 — real USACO experience after main track",
    href: "/learn/cpp-p3",
    rank: "gold",
    lessonIds: ["cpp-p3"],
  },
]

/**
 * 스테이지 진도 + 상태 계산.
 *
 * @param completedIds 완료한 lesson IDs
 * @param hasCppProgress C++ 진도 있는지 (Python 자동 완료 처리용)
 */
export function getStageProgress(
  stage: JourneyStage,
  completedIds: Set<string | number>,
  hasCppProgress: boolean,
): { done: number; total: number; pct: number; status: StageStatus } {
  // C++ 학생은 Python 스테이지 자동 완료 (이미 안다고 가정)
  const isPythonStage = stage.id === "py-basic" || stage.id === "py-advanced"
  if (isPythonStage && hasCppProgress) {
    const total = stage.lessonIds?.length ?? 1
    return { done: total, total, pct: 100, status: "completed" }
  }

  let done = 0
  let total = 0
  if (stage.computeProgress) {
    const r = stage.computeProgress(completedIds)
    done = r.done
    total = r.total
  } else if (stage.lessonIds) {
    total = stage.lessonIds.length
    done = stage.lessonIds.filter(id => completedIds.has(id) || completedIds.has(String(id))).length
  }
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  let status: StageStatus
  if (pct >= 100) status = "completed"
  else if (pct > 0) status = "in-progress"
  else status = "available"  // 소프트 진행: 잠금 없음
  return { done, total, pct, status }
}

/**
 * C++ 진도 있는 학생인지 — Python 자동 완료 처리에 사용.
 */
export function hasCppTrackProgress(completedIds: Set<string | number>): boolean {
  return [...completedIds].some(id => String(id).startsWith("cpp-"))
}
