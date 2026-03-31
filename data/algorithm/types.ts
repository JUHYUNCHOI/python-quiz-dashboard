// ============================================================
// Algorithm Lab — TypeScript 타입 정의
// ============================================================

export type Difficulty = 'bronze' | 'silver' | 'gold' | 'platinum' | 'easy' | 'medium' | 'hard'
export type Language = 'python' | 'cpp'
export type Track = 'python' | 'cpp' | 'both'

// ─── 코드 스텝 ────────────────────────────────────────────────
export interface CodeStep {
  title: string
  desc: string
  code: string
  explanation?: string
}

// ─── 풀이 ────────────────────────────────────────────────────
export interface Solution {
  approach: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  templates: { python: string; cpp: string }
  codeSteps?: { python: CodeStep[]; cpp: CodeStep[] }
  hints?: Hint[]           // 일부 풀이에 추가 힌트 존재
}

// ─── 힌트 ────────────────────────────────────────────────────
export interface Hint {
  title: string
  content: string
  viz?: (container: Element) => void   // 인터랙티브 시각화 함수 (선택적)
}

// ─── 시뮬레이션 설정 ─────────────────────────────────────────
export interface SimConfig {
  type: string       // 시뮬레이션 컴포넌트 키
  defaultInput?: string
}

// ─── 문제 ────────────────────────────────────────────────────
export interface AlgoProblem {
  id: string                    // 'boj-10809'
  title: string
  difficulty: Difficulty
  link: string
  track?: Track                 // 없으면 'both'
  simIntro?: string             // 시뮬레이션 소개 텍스트
  sim?: SimConfig               // 시뮬레이션 설정
  descriptionHTML: string       // 원본 문제 HTML
  hints: Hint[]
  solutions: Solution[]
  templates?: { python: string; cpp: string }  // 문제 수준 템플릿 (solutions에서 참조)
  inputLabel?: string           // 입력 라벨 (시뮬레이션용)
}

// ─── 스테이지 (학습 순서) ─────────────────────────────────────
export interface Stage {
  num: number
  title: string
  problemIds: string[]
  desc?: string   // 스테이지 설명 (선택적)
}

// ─── 토픽 ────────────────────────────────────────────────────
export interface AlgoTopic {
  id: string
  title: string
  icon: string
  category: string
  order: number
  description: string
  track: Track      // 'python' | 'cpp' | 'both'
  stages: Stage[]
  problems: AlgoProblem[]
  conceptHTML?: string    // 개념 설명 HTML
}

// ─── 카테고리 ─────────────────────────────────────────────────
export type Category =
  | '기초 (Bronze~Silver)'
  | '자료구조 (Silver~Gold)'
  | '문제 해결 기법 (Silver~Gold)'
  | '고급 알고리즘 (Gold~Platinum)'
