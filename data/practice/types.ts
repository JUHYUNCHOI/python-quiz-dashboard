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
  initialCode?: string  // English version of starter code (use when Korean comments are in initialCode)
  scaffoldCode?: string // English version of scaffold (more structured code, shown after failures)
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
  scaffoldCode?: string                   // 실패 반복 시 공개되는 더 구조화된 스켈레톤
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
 * Auto-translate common Korean code comments into English.
 * Applied to initialCode / scaffoldCode when no explicit en.initialCode exists.
 */
function translateCodeComments(code: string | undefined): string | undefined {
  if (!code) return code
  return code
    // ── struct declarations ──────────────────────────────────────────
    .replace(/\/\/ struct (\S+)를 선언하세요 \(([^)]+)\)/g, "// TODO: Declare struct $1 ($2)")
    .replace(/\/\/ struct (\S+)를 선언하세요/g, "// TODO: Declare struct $1")
    .replace(/\/\/ struct를 선언하세요/g, "// TODO: Declare the struct")

    // ── function declarations ────────────────────────────────────────
    .replace(/\/\/ (.+?) 함수를 여기에 작성하세요/g, "// TODO: Write the $1 function here")
    .replace(/\/\/ (.+?) 함수를 작성하세요/g, "// TODO: Write the $1 function")
    .replace(/\/\/ 오버로딩: (.+?)를 두 가지 버전으로 작성하세요/g, "// TODO (overloading): Write two versions of the $1 function")

    // ── cin input ────────────────────────────────────────────────────
    .replace(/\/\/ cin으로 (.+?)를 입력받으세요/g, "// TODO: Read $1 with cin")
    .replace(/\/\/ cin으로 (.+?)을 입력받으세요/g, "// TODO: Read $1 with cin")

    // ── Array & vector numbered setup (N, vector<T> v(N), read N elements) ────
    .replace(/\/\/ 1\) int n 을 cin 으로 입력받기/g, "// 1) Read int n with cin")
    .replace(/\/\/ 2\) 크기 n 의 벡터 v 선언/g, "// 2) Declare vector v of size n")
    .replace(/\/\/ 3\) n 개의 원소를 cin 으로 v 에 읽기/g, "// 3) Read n elements into v with cin")
    .replace(/\/\/ 4\) 아래에 문제 해결 코드 작성/g, "// 4) Write your solution below")
    // ── Variants of the numbered setup ──────────────────────────────────
    .replace(/\/\/ 1\) int n, k 를 cin 으로 입력받기/g, "// 1) Read int n, k with cin")
    .replace(/\/\/ 1\) int n, t 를 cin 으로 입력받기/g, "// 1) Read int n, t with cin")
    .replace(/\/\/ 1\) n \(필요시 m\) 을 cin 으로 입력받기/g, "// 1) Read n (and m if needed) with cin")
    .replace(/\/\/ 2\) 크기가 맞는 벡터 선언 후 원소를 cin 으로 읽기/g, "// 2) Declare vectors of the right size and read elements with cin")
    .replace(/\/\/ 2\) 크기 n 의 벡터 v 선언하고 n 개의 원소 읽기/g, "// 2) Declare vector v of size n and read n elements")
    .replace(/\/\/ 2\) 크기 n 의 벡터 a, b 선언하고 각각 n 개의 원소 읽기 \(a 먼저, b 다음\)/g, "// 2) Declare vectors a, b of size n and read n elements each (a first, then b)")
    .replace(/\/\/ 2\) vector<int> v 선언 \(빈 벡터\)/g, "// 2) Declare vector<int> v (empty)")
    .replace(/\/\/ 3\) 아래에 문제 해결 코드 작성/g, "// 3) Write your solution below")
    .replace(/\/\/ 3\) n 번 반복하며 x 입력: 양수면 push_back, 음수면 pop_back \(비어있지 않을 때만\)/g, "// 3) Repeat n times reading x: positive → push_back, negative → pop_back (only if not empty)")
    .replace(/\/\/ 4\) v 의 원소를 공백으로 구분해 출력/g, "// 4) Print v's elements separated by spaces")

    // ── return values (specific Korean math terms first) ────────────
    .replace(/\/\/ 합을 반환하세요/g, "// TODO: Return the sum")
    .replace(/\/\/ 곱을 반환하세요/g, "// TODO: Return the product")
    .replace(/\/\/ 차를 반환하세요/g, "// TODO: Return the difference")
    .replace(/\/\/ 몫을 반환하세요/g, "// TODO: Return the quotient")
    .replace(/\/\/ 나머지를 반환하세요/g, "// TODO: Return the remainder")
    .replace(/\/\/ 최솟값을 반환하세요/g, "// TODO: Return the minimum")
    .replace(/\/\/ 최댓값을 반환하세요/g, "// TODO: Return the maximum")
    .replace(/\/\/ 결과를 반환하세요/g, "// TODO: Return the result")
    // ── return values (generic — code expressions stay as-is) ────────
    .replace(/\/\/ (.+?) 를 반환하세요/g, "// TODO: Return $1")
    .replace(/\/\/ (.+?)를 반환하세요/g, "// TODO: Return $1")
    .replace(/\/\/ (.+?)을 반환하세요/g, "// TODO: Return $1")

    // ── "write your code here" variants ─────────────────────────────
    .replace(/\/\/ 여기에 코드를 작성하세요 \(struct를 사용하면 편리합니다\)/g, "// TODO: Write your code here (using a struct is convenient)")
    .replace(/\/\/ 여기에 코드를 작성하세요/g, "// TODO: Write your code here")
    .replace(/\/\/ 여기에 출력 코드를 작성하세요/g, "// TODO: Write your output code here")
    .replace(/# 여기에 코드를 작성하세요 \(버블 정렬 직접 구현\)/g, "# TODO: Write your code here (implement bubble sort manually)")
    .replace(/# 여기에 코드를 작성하세요/g, "# TODO: Write your code here")
    .replace(/# 여기에 전투 루프를 작성하세요/g, "# TODO: Write the battle loop here")

    // ── switch/case placeholders ─────────────────────────────────────
    .replace(/\/\/ 각 연산자 case를 작성하세요/g, "// TODO: Write each operator case here")
    .replace(/\/\/ 각 case를 채우세요/g, "// TODO: Fill in each case")
    .replace(/\/\/ 나머지 계절을 채우세요/g, "// TODO: Fill in the remaining seasons")
    .replace(/\/\/ 나머지 (출력|를 채우세요|를 작성하세요)/g, "// TODO: Fill in the rest")

    // ── Python __setattr__ / count patterns ─────────────────────────
    .replace(/# __init__에서는 object\.__setattr__을 사용하세요/g, "# TODO: Use object.__setattr__ in __init__")
    .replace(/# count를 (\S+) 증가시키고 반환하세요/g, "# TODO: Increment count by $1 and return")
}

/**
 * Returns a localized copy of a problem.
 * English fields (en.*) override Korean fields when lang === "en".
 * Falls back gracefully to Korean if English is not available.
 * Korean comments in initialCode/scaffoldCode are auto-translated even without en.initialCode.
 */
export function localizeProblem(p: PracticeProblem, lang: string): PracticeProblem {
  if (lang !== "en") return p
  const en = p.en ?? {}
  return {
    ...p,
    title: en.title ?? p.title,
    description: en.description ?? p.description,
    constraints: en.constraints ?? p.constraints,
    hints: en.hints ?? p.hints,
    solutionExplanation: en.solutionExplanation ?? p.solutionExplanation,
    explanation: en.explanation ?? p.explanation,
    options: en.options ?? p.options,
    codeSnippet: en.codeSnippet ?? p.codeSnippet,
    // Auto-translate Korean comments if no explicit English version provided
    initialCode: en.initialCode ?? translateCodeComments(p.initialCode),
    scaffoldCode: en.scaffoldCode ?? translateCodeComments(p.scaffoldCode),
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
