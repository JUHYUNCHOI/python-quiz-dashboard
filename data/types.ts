// ============================================
// 레슨 데이터 타입
// ============================================

export interface TestCase {
  input?: string
  expectedOutput?: string
  expectedVariable?: { name: string; value: any }
  description?: string
}

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
  // interactive 타입용
  component?: string
  component2?: string
  componentProps?: Record<string, any>
  description?: string
  // typeAlong 컴포넌트용
  targetCode?: string
  targetTitle?: string
  targetDescription?: string
  // fillInBlank 컴포넌트용
  codeTemplate?: string
  blanks?: { id: string; answer: string; hint?: string }[]
  choices?: string[]
  // fillblank 타입용
  fillBlanks?: { id: number; answer: string; options: string[] }[]
  // coding 타입용
  starterCode?: string
  testCases?: TestCase[]
  hints?: string[]
  // explain 좌우 2단 레이아웃 (데스크탑만, 모바일은 세로 스택)
  layout?: { left: string; right: string }
  // 컴포넌트 이후에 이어지는 설명 (선택적)
  contentAfter?: string
  layoutAfter?: { left: string; right: string }
  // practice: "틀 채워서 풀기" 버튼 숨기기 (starter 코드가 이미 노출되어 있을 때)
  hideStarterButton?: boolean
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
