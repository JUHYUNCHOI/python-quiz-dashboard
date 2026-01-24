// ============================================
// 레슨 데이터 타입
// ============================================
export interface LessonStep {
  id: string
  type: "explain" | "tryit" | "mission" | "quiz" | "interactive"
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
  // interactive 타입용
  component?: "dataStructures"
  description?: string
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
