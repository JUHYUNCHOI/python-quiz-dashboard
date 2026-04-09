export interface PracticeTestCase {
  stdin: string
  expectedOutput: string
  label?: string  // 예: "기본 케이스", "경계값"
}

/** Optional English translation fields for a problem */
export interface ProblemI18n {
  title?: string
  description?: string
  hints?: string[]
  constraints?: string
  solutionExplanation?: string
  explanation?: string  // MCQ problems use explanation instead of solutionExplanation
  options?: string[]    // MCQ option texts in English
  codeSnippet?: string  // English version of code snippet (replaces Korean string literals)
}

/** Optional English translation fields for a cluster */
export interface ClusterI18n {
  title?: string
  description?: string
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

  /** English translation — falls back to Korean fields if absent */
  en?: ProblemI18n

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

  /** English translation — falls back to Korean fields if absent */
  en?: ClusterI18n
}

// ── Localization helpers ──────────────────────────────────────────────────────

/**
 * Returns a localized copy of a problem.
 * English fields (en.*) override Korean fields when lang === "en".
 * Falls back gracefully to Korean if English is not available.
 */
export function localizeProblem(p: PracticeProblem, lang: string): PracticeProblem {
  if (lang !== "en" || !p.en) return p
  return {
    ...p,
    title: p.en.title ?? p.title,
    description: p.en.description ?? p.description,
    constraints: p.en.constraints ?? p.constraints,
    hints: p.en.hints ?? p.hints,
    solutionExplanation: p.en.solutionExplanation ?? p.solutionExplanation,
    explanation: p.en.explanation ?? p.explanation,
    options: p.en.options ?? p.options,
    codeSnippet: p.en.codeSnippet ?? p.codeSnippet,
  }
}

/**
 * Returns localized title/description for a cluster.
 */
export function localizeCluster(c: PracticeCluster, lang: string): { title: string; description: string } {
  if (lang === "en" && c.en) {
    return {
      title: c.en.title ?? c.title,
      description: c.en.description ?? c.description,
    }
  }
  return { title: c.title, description: c.description }
}
