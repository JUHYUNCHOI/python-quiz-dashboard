// ============================================================
// 시뮬레이션 프레임워크 타입 정의
// ============================================================

export type BarColor = 'default' | 'comparing' | 'sorted' | 'selected' | 'pivot' | 'min' | 'found'

export interface BarElement {
  type: 'bar'
  value: number
  label?: string
  color: BarColor
}

export type BlockColor = 'default' | 'active' | 'found' | 'done' | 'mismatch' | 'highlight'

export interface BlockElement {
  type: 'block'
  text: string
  subText?: string
  color: BlockColor
  index?: number
}

export interface PointerElement {
  type: 'pointer'
  index: number
  label: string
  color: string
}

export interface CellElement {
  type: 'cell'
  row: number
  col: number
  value: string | number
  highlight?: boolean
  done?: boolean
}

export interface TableFrame {
  rows: string[][]
  highlights: [number, number][]
  done: [number, number][]
}

export interface NodeElement {
  type: 'node'
  id: string
  x: number
  y: number
  label: string
  color: 'default' | 'visiting' | 'visited' | 'found' | 'path'
}

export interface EdgeElement {
  type: 'edge'
  from: string
  to: string
  directed?: boolean
  weight?: number
  highlight?: boolean
}

// 단일 프레임 = 시뮬레이션의 한 단계
export interface SimFrame {
  description: string        // 이 단계 설명
  bars?: BarElement[]        // 막대 차트 (정렬, 배열)
  blocks?: BlockElement[]    // 블록 (문자열, 상태)
  pointers?: PointerElement[] // 포인터 화살표
  table?: TableFrame         // DP 테이블
  nodes?: NodeElement[]      // 그래프 노드
  edges?: EdgeElement[]      // 그래프 엣지
  extra?: Record<string, unknown> // 추가 데이터
}

// 시뮬레이션 정의
export interface SimDefinition {
  id: string
  title: string
  defaultInput?: string
  inputLabel?: string
  generate: (input: string) => SimFrame[]
}
