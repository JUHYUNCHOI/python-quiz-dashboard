// ============================================
// 레슨 데이터 타입
// ============================================
export interface LessonStep {
  id: string
  type: "explain" | "tryit" | "mission" | "quiz" | "interactive" | "animation" | "coding" | "fillblank" | "predict" | "practice"
  title: string
  content?: string
  code?: string
  initialCode?: string
  expectedOutput?: string
  stdin?: string
  hint?: string
  hint2?: string
  reviewHint?: string
  task?: string
  options?: string[]
  answer?: number
  explanation?: string
  component?: string
  component2?: string
  description?: string
  question?: string
  instruction?: string
  animationType?: string
  // explain 스텝 전용: 좌우 2단 레이아웃 (데스크탑에서만, 모바일은 세로 스택)
  // 있으면 content 대신 우선 렌더. 왼쪽은 설명, 오른쪽은 주로 코드블록.
  layout?: {
    left: string
    right: string
  }
  [key: string]: any
}

export interface Chapter {
  id: string
  title: string
  emoji: string
  steps: LessonStep[]
}

export interface LessonData {
  id: string
  title: string
  emoji: string
  description: string
  chapters: Chapter[]
}
