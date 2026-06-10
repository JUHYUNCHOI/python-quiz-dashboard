// 적응형 학습 엔진 — 공용 타입 (Phase 1)
export type Concept = string // = cluster id
export type Difficulty = "쉬움" | "보통" | "어려움"
export type Level = "struggling" | "learning" | "proficient" | "mastered"

export interface ProgressEvent {
  problemId: string
  concept: Concept
  difficulty: Difficulty
  solved: boolean
  starred: boolean // 힌트 없이 깔끔히
}

export interface ConceptMastery {
  score: number
  level: Level
  recent: boolean[] // 그 개념 마지막 3 이벤트의 solved 여부
}

export interface AdaptiveNext {
  problemId: string
  concept: Concept
  reason: string // "왜 이 문제" 한 줄 (KR)
  reasonEn: string
}
