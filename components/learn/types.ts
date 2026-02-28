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
  hint?: string
  hint2?: string
  task?: string
  options?: string[]
  answer?: number
  explanation?: string
  component?: string
  description?: string
  question?: string
  instruction?: string
  animationType?: string
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
