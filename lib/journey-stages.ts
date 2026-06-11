/**
 * 게임형 학습 로드맵 — 6 스테이지 모델.
 *
 * 학생 멘탈 모델 (정확히):
 *   Path 1 (Python 만):  🐍 → 💪Py연습 → 🧠 → 🏆
 *   Path 2 (풀 코스):    🐍 → 💪Py연습 → ⚡ → 💪Cpp연습 → 🧠 → 🏆
 *   Path 3 (C++ 부터):   ⚡ → 💪Cpp연습 → 🧠 → 🏆
 *                        (Python + Py연습 자동 ✅ — 이미 안다고 가정)
 *
 * 스테이지 6 개:
 *   1. 🐍 Python         (52 레슨 + 4 프로젝트)
 *   2. 💪 Python 연습    (12 PY 클러스터)
 *   3. ⚡ C++            (23 레슨 + 3 프로젝트)  ← 가지 (선택)
 *   4. 💪 C++ 연습       (CPP 클러스터 + 코딩 뱅크)  ← 가지
 *   5. 🧠 알고리즘       (21 토픽)
 *   6. 🏆 USACO          (USACO/MCC 실전)
 *
 * C++ 진도 있는 학생 → Python + Python 연습 자동 ✅ (Path 3)
 */

import { ALGO_TOPICS } from "@/data/algo/topics"
import { ALL_CLUSTERS } from "@/data/practice"

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
  branchOf?: string
  lessonIds?: (string | number)[]
  computeProgress?: (completedIds: Set<string | number>) => { done: number; total: number }
}

const range = (s: number, e: number): number[] => Array.from({ length: e - s + 1 }, (_, i) => s + i)

/** Python 전 레슨 (1-52) + 프로젝트 (p1-p4) */
const PYTHON_IDS: (string | number)[] = [...range(1, 52), "p1", "p2", "p3", "p4"]

/** C++ 전 레슨 + 프로젝트 */
const CPP_IDS = [
  "cpp-1", "cpp-2", "cpp-3", "cpp-4", "cpp-5", "cpp-6", "cpp-7", "cpp-8", "cpp-p1",
  "cpp-9", "cpp-10", "cpp-11", "cpp-12", "cpp-13", "cpp-14", "cpp-21", "cpp-22", "cpp-p2",
  "cpp-15", "cpp-16", "cpp-17", "cpp-18", "cpp-19", "cpp-20", "cpp-23", "cpp-p3",
]

/** Python 연습 — 5 클러스터 완료 = 충분 (전체 12 중) */
const PY_PRACTICE_GOAL_CLUSTERS = 5
/** C++ 연습 — 5 클러스터 (CPP practice + 코딩 뱅크) = 충분 */
const CPP_PRACTICE_GOAL = 5

function getPyClusters() {
  return ALL_CLUSTERS.filter(c => c.id.startsWith("py-"))
}

function getCppPracticeClusters() {
  // cpp-ck* 만 (cpp-* 레슨 ID 와 구분)
  return ALL_CLUSTERS.filter(c => c.id.startsWith("cpp-ck"))
}

const SET1_SIZE = 7
function clusterDoneCount(completedIds: Set<string | number>, cluster: any): boolean {
  // /practice 의 SET 1 (7문제) 풀었으면 cluster done — solvedSet 정보 없으면 false
  // 여기선 localStorage 의 practice-solved 로 추정
  if (typeof window === "undefined") return false
  try {
    const solved = JSON.parse(localStorage.getItem("practice-solved") || "[]") as string[]
    const solvedSet = new Set(solved)
    const count = cluster.problems.filter((p: any) => solvedSet.has(p.id)).length
    return count >= Math.min(SET1_SIZE, cluster.problems.length)
  } catch {
    return false
  }
}

function getCodingBankSolvedCount(): number {
  if (typeof window === "undefined") return 0
  try {
    const raw = localStorage.getItem("coding-bank-solved")
    if (!raw) return 0
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.length : 0
  } catch {
    return 0
  }
}

/** 코딩 뱅크 "충분히 함" 기준 — smart-next 의 CODING_BANK_THRESHOLD 와 동일 */
const CODING_BANK_GOAL = 5

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "python",
    type: "main",
    emoji: "🐍",
    title: "Python",
    titleEn: "Python",
    description: "52 레슨 — 기초 → 자료구조 → 함수 → 클래스 → 프로젝트",
    descriptionEn: "52 lessons — basics → data structures → functions → classes → projects",
    href: "/curriculum?course=python",
    rank: "bronze",
    lessonIds: PYTHON_IDS,
  },
  {
    id: "python-practice",
    type: "main",
    emoji: "💪",
    title: "Python 연습",
    titleEn: "Python Practice",
    description: "개념 클러스터 + 🧰 종합 도전(코딩뱅크) — 직접 짜기",
    descriptionEn: "Concept clusters + 🧰 Coding Bank challenge",
    href: "/practice?lang=python",
    rank: "silver",
    computeProgress: () => {
      // 연습 = 개념 클러스터 + 종합 도전(코딩뱅크). 종합 도전이 마지막 한 칸.
      const clusters = getPyClusters()
      const clusterDone = clusters.filter(c => clusterDoneCount(new Set(), c)).length
      const bankCredit = getCodingBankSolvedCount() >= CODING_BANK_GOAL ? 1 : 0
      return { done: Math.min(clusterDone, PY_PRACTICE_GOAL_CLUSTERS - 1) + bankCredit, total: PY_PRACTICE_GOAL_CLUSTERS }
    },
  },
  {
    id: "cpp",
    type: "branch",
    branchOf: "python-practice",
    emoji: "⚡",
    title: "C++",
    titleEn: "C++",
    description: "23 레슨 — Python → C++ 전환, STL, USACO 준비",
    descriptionEn: "23 lessons — Python → C++, STL, USACO prep",
    href: "/curriculum?course=cpp",
    rank: "bronze",
    lessonIds: CPP_IDS,
  },
  {
    id: "cpp-practice",
    type: "branch",
    branchOf: "cpp",
    emoji: "💪",
    title: "C++ 연습",
    titleEn: "C++ Practice",
    description: "CPP 클러스터 + 🧰 종합 도전(코딩뱅크) — 알고리즘 가기 전",
    descriptionEn: "C++ clusters + 🧰 Coding Bank — before algorithms",
    href: "/practice?lang=cpp",
    rank: "silver",
    computeProgress: () => {
      // 연습 = 개념 클러스터 + 종합 도전(코딩뱅크). 종합 도전이 마지막 한 칸.
      const clusters = getCppPracticeClusters()
      const clusterDone = clusters.filter(c => clusterDoneCount(new Set(), c)).length
      const bankCredit = getCodingBankSolvedCount() >= CODING_BANK_GOAL ? 1 : 0
      return { done: Math.min(clusterDone, CPP_PRACTICE_GOAL - 1) + bankCredit, total: CPP_PRACTICE_GOAL }
    },
  },
  {
    id: "algo",
    type: "main",
    emoji: "🧠",
    title: "알고리즘",
    titleEn: "Algorithm",
    description: "Bronze 핵심 (정렬·배열·스택큐 등) · Silver/Gold는 선택 심화",
    descriptionEn: "Bronze core (sort·array·stack/queue) · Silver/Gold optional",
    href: "/algo",
    rank: "gold",
    // 완료 기준 = Bronze(Wave 1) 핵심. Silver/Gold 는 '필요할 때' 심화 (smart-next 모델과 일치).
    computeProgress: (completedIds) => {
      const bronze = ALGO_TOPICS.filter(tp => tp.wave === 1)
      const done = bronze.filter(tp => completedIds.has(tp.lessonId)).length
      return { done, total: bronze.length }
    },
  },
  {
    id: "usaco",
    type: "main",
    emoji: "🏆",
    title: "USACO 실전",
    titleEn: "USACO Contest",
    description: "USACO Bronze / MCC — 실전 대회 문제",
    descriptionEn: "USACO Bronze / MCC contest problems",
    href: "/quest",
    rank: "master",
    computeProgress: (completedIds) => {
      const done = [...completedIds].filter(id => String(id).startsWith("cq-")).length
      return { done: Math.min(done, 5), total: 5 }
    },
  },
]

/**
 * 스테이지 진도 + 상태.
 * C++ 진도 있는 학생 → Python + Python 연습 자동 ✅
 */
export function getStageProgress(
  stage: JourneyStage,
  completedIds: Set<string | number>,
  hasCppProgress: boolean,
): { done: number; total: number; pct: number; status: StageStatus } {
  // C++ 학생 → Python 관련 스테이지 자동 완료
  const isPythonStage = stage.id === "python" || stage.id === "python-practice"
  if (isPythonStage && hasCppProgress) {
    const total = stage.lessonIds?.length ?? 5
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
  else status = "available"
  return { done, total, pct, status }
}

/**
 * C++ 진도 있는 학생인지 — Python 자동 완료 처리에 사용.
 */
export function hasCppTrackProgress(completedIds: Set<string | number>): boolean {
  return [...completedIds].some(id => String(id).startsWith("cpp-"))
}
