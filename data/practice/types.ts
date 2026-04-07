export interface PracticeTestCase {
  stdin: string
  expectedOutput: string
  label?: string  // 예: "기본 케이스", "경계값"
}

export interface PracticeProblem {
  id: string                              // "loop-001"
  cluster: string                         // 클러스터 ID
  unlockAfter: string                     // "cpp-7" | "10" (Python lessonId)
  difficulty: "쉬움" | "보통" | "어려움"
  title: string
  description: string
  constraints: string                     // "1 ≤ N ≤ 1000"
  language?: "cpp" | "python"             // default: "cpp"

  // 문제 타입: "code" (기본) 또는 "mcq" (객관식)
  type?: "code" | "mcq"

  // code 전용 필드
  initialCode?: string
  testCases?: PracticeTestCase[]
  hints?: string[]                        // 순서대로 공개
  solutionCode?: string
  solutionExplanation?: string

  // mcq 전용 필드
  codeSnippet?: string                    // 읽기 전용으로 표시할 코드
  options?: string[]                      // 선택지
  correctOption?: number                  // 정답 인덱스 (0-based)
  explanation?: string                    // 정답/오답 후 설명
}

export interface PracticeCluster {
  id: string                              // "loops"
  title: string                           // "반복문 패턴"
  emoji: string
  description: string
  unlockAfter: string                     // 클러스터 전체 잠금 기준 레슨
  problems: PracticeProblem[]
}
