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
  initialCode: string
  testCases: PracticeTestCase[]
  hints: string[]                         // 순서대로 공개
  solutionCode: string
  solutionExplanation: string
  language?: "cpp" | "python"             // default: "cpp"
}

export interface PracticeCluster {
  id: string                              // "loops"
  title: string                           // "반복문 패턴"
  emoji: string
  description: string
  unlockAfter: string                     // 클러스터 전체 잠금 기준 레슨
  problems: PracticeProblem[]
}
