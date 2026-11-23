/**
 * 배치고사 — 코드 작성 문항.
 *
 * ── 왜 출력 예측 12문항만으로는 부족한가 ──────────────────────────────────
 * 출력 예측은 빠르지만 **읽기 능력**만 잰다. "읽을 줄 아는데 못 짜는" 학생이
 * 실재하고, 그런 학생이 골드로 배치되면 승급 문제를 한 개도 못 푼다.
 * 그래서 이분 탐색으로 단계를 좁힌 뒤, **마지막 한 문항은 직접 짜게 한다.**
 *
 * ── 왜 2문항인가 ──────────────────────────────────────────────────────────
 * 코드 작성은 한 문항에 5~10분이다. 전부 코드로 채우면 배치고사가 한 시간짜리
 * 시험이 돼서 아무도 안 본다. 2문항이면 10분대 시험에 7~12분이 붙는다.
 *
 * 두 문항은 역할이 다르다 (`lib/placement-engine.ts`):
 *   ① 확정된 단계의 문항 — **올라간 티어를 확인한다.** 떨어지면 한 칸 내린다.
 *   ② 한 단계 위의 문항 — **읽기로 못 넘은 천장을 뚫게 한다.** 통과하면 한 칸 올린다.
 *
 * 1문항이던 때는 ②가 없어서, 짤 줄 아는 학생이 출력 예측에서 한 번 실수하면
 * 되찾을 길이 없었다.
 *
 * ── 채점 ──────────────────────────────────────────────────────────────────
 * 실제 테스트케이스로 Piston 에서 돌린다. 연습 문제와 **같은 채점기**다:
 * stdin 을 넣고 stdout 을 바이트 비교한다. 그래서 Python 과 C++ 중
 * 아무거나 써도 된다 — 채점기는 언어를 모른다.
 *
 * ── 정답 키의 출처 ────────────────────────────────────────────────────────
 * 각 문항의 기대 출력은 문제문에서 기계적으로 유도되는 값만 썼다
 * (합·최댓값·개수 등). 손으로 "이쯤 나오겠지" 한 값은 없다.
 */

export interface PlacementCodeTask {
  id: string
  /** 1..10 — PlacementItem.step 과 같은 계단 */
  step: number
  title: string
  titleEn: string
  /** 문제문. 입력 형식과 출력 형식을 반드시 명시한다 (바이트 비교 채점이므로) */
  prompt: string
  promptEn: string
  /** stdin → 기대 stdout. 전부 통과해야 합격. */
  tests: { stdin: string; expected: string }[]
}

export const PLACEMENT_CODE_TASKS: PlacementCodeTask[] = [
  {
    id: "pc01", step: 1,
    title: "두 수 더하기", titleEn: "Add two numbers",
    prompt:
      "정수 두 개가 공백으로 한 줄에 주어집니다. 두 수의 합을 한 줄로 출력하세요.",
    promptEn:
      "Two integers are given on one line, separated by a space. Print their sum on one line.",
    tests: [
      { stdin: "3 4\n", expected: "7" },
      { stdin: "-10 25\n", expected: "15" },
      { stdin: "0 0\n", expected: "0" },
    ],
  },
  {
    id: "pc02", step: 2,
    title: "짝수 홀수", titleEn: "Even or odd",
    prompt:
      "정수 하나가 주어집니다. 짝수면 even, 홀수면 odd 를 한 줄로 출력하세요. (소문자)",
    promptEn:
      "One integer is given. Print even if it is even, odd if it is odd. (lowercase)",
    tests: [
      { stdin: "4\n", expected: "even" },
      { stdin: "7\n", expected: "odd" },
      { stdin: "0\n", expected: "even" },
      { stdin: "-3\n", expected: "odd" },
    ],
  },
  {
    id: "pc03", step: 3,
    title: "1부터 N까지의 합", titleEn: "Sum from 1 to N",
    prompt:
      "정수 N 이 주어집니다. 1부터 N까지 모두 더한 값을 한 줄로 출력하세요.",
    promptEn:
      "An integer N is given. Print the sum of all integers from 1 to N on one line.",
    tests: [
      { stdin: "5\n", expected: "15" },
      { stdin: "1\n", expected: "1" },
      { stdin: "100\n", expected: "5050" },
    ],
  },
  {
    id: "pc04", step: 4,
    title: "최댓값 찾기", titleEn: "Find the maximum",
    prompt:
      "첫 줄에 개수 N, 둘째 줄에 정수 N개가 공백으로 주어집니다. 가장 큰 수를 한 줄로 출력하세요.",
    promptEn:
      "The first line has a count N. The second line has N integers separated by spaces. Print the largest one on a single line.",
    tests: [
      { stdin: "5\n3 9 1 7 2\n", expected: "9" },
      { stdin: "1\n-4\n", expected: "-4" },
      { stdin: "4\n-5 -2 -9 -7\n", expected: "-2" },
    ],
  },
  {
    id: "pc05", step: 5,
    title: "문자 세기", titleEn: "Count a character",
    prompt:
      "첫 줄에 문자열 S(공백 없음), 둘째 줄에 문자 하나 C 가 주어집니다. S 안에 C 가 몇 번 나오는지 한 줄로 출력하세요.",
    promptEn:
      "The first line has a string S (no spaces). The second line has a single character C. Print how many times C appears in S, on one line.",
    tests: [
      { stdin: "banana\na\n", expected: "3" },
      { stdin: "hello\nz\n", expected: "0" },
      { stdin: "aaaa\na\n", expected: "4" },
    ],
  },
  {
    id: "pc06", step: 6,
    title: "거꾸로 출력", titleEn: "Reverse the words",
    prompt:
      "한 줄에 단어들이 공백으로 주어집니다. 단어 순서를 뒤집어 공백으로 이어 한 줄로 출력하세요.",
    promptEn:
      "A line of words separated by spaces is given. Print the words in reverse order, joined by single spaces, on one line.",
    tests: [
      { stdin: "a b c\n", expected: "c b a" },
      { stdin: "hello world\n", expected: "world hello" },
      { stdin: "one\n", expected: "one" },
    ],
  },
  {
    id: "pc07", step: 7,
    title: "소수 판정", titleEn: "Prime check",
    prompt:
      "정수 N (2 이상) 이 주어집니다. N 이 소수면 YES, 아니면 NO 를 한 줄로 출력하세요. (대문자)",
    promptEn:
      "An integer N (2 or greater) is given. Print YES if N is prime, otherwise NO, on one line. (uppercase)",
    tests: [
      { stdin: "7\n", expected: "YES" },
      { stdin: "9\n", expected: "NO" },
      { stdin: "2\n", expected: "YES" },
      { stdin: "97\n", expected: "YES" },
      { stdin: "100\n", expected: "NO" },
    ],
  },
  {
    id: "pc08", step: 8,
    title: "가장 많이 나온 수", titleEn: "Most frequent number",
    prompt:
      "첫 줄에 개수 N, 둘째 줄에 정수 N개가 공백으로 주어집니다. 가장 많이 나온 수를 출력하세요. 횟수가 같으면 그중 가장 작은 수를 출력합니다.",
    promptEn:
      "The first line has a count N. The second line has N integers separated by spaces. Print the most frequent value. On a tie, print the smallest such value.",
    tests: [
      { stdin: "6\n1 2 2 3 3 3\n", expected: "3" },
      { stdin: "4\n5 5 2 2\n", expected: "2" },
      { stdin: "3\n-1 -1 4\n", expected: "-1" },
    ],
  },
  {
    id: "pc09", step: 9,
    title: "구간 합", titleEn: "Range sum",
    prompt:
      "첫 줄에 N 과 질의 수 Q, 둘째 줄에 정수 N개. 이어서 Q개 줄에 각각 L R (1-based, 양끝 포함) 이 주어집니다. 각 질의마다 L번째부터 R번째까지의 합을 한 줄씩 출력하세요.",
    promptEn:
      "The first line has N and the number of queries Q. The second line has N integers. Then Q lines each have L R (1-based, inclusive). For each query, print the sum of elements L through R on its own line.",
    tests: [
      { stdin: "5 2\n1 2 3 4 5\n1 3\n2 5\n", expected: "6\n14" },
      { stdin: "3 1\n10 -10 5\n1 3\n", expected: "5" },
      { stdin: "4 2\n1 1 1 1\n2 2\n1 4\n", expected: "1\n4" },
    ],
  },
  {
    id: "pc10", step: 10,
    title: "가장 긴 증가 구간", titleEn: "Longest increasing run",
    prompt:
      // ⚠️ 문제문은 `whitespace-pre-wrap` 으로 생짜 렌더된다 — 마크다운이 아니다.
      //    `**강조**` 를 쓰면 학생 화면에 별표가 그대로 보인다.
      "첫 줄에 개수 N, 둘째 줄에 정수 N개가 공백으로 주어집니다. 연속해서 엄격히 증가하는 가장 긴 구간의 길이를 한 줄로 출력하세요.",
    promptEn:
      "The first line has a count N. The second line has N integers separated by spaces. Print the length of the longest strictly increasing contiguous run, on one line.",
    tests: [
      { stdin: "6\n1 2 1 2 3 4\n", expected: "4" },
      { stdin: "5\n5 4 3 2 1\n", expected: "1" },
      { stdin: "1\n7\n", expected: "1" },
      { stdin: "7\n1 2 3 3 4 5 6\n", expected: "4" },
    ],
  },
]

const BY_STEP = new Map<number, PlacementCodeTask>(
  PLACEMENT_CODE_TASKS.map(t => [t.step, t]),
)

/**
 * 그 단계의 코드 문항. 단계가 비어 있으면 **바로 아래 단계**로 내려간다 —
 * 문항이 없다고 확인을 건너뛰면 "읽기만 잘하는" 학생이 그대로 통과한다.
 */
export function codeTaskForStep(step: number): PlacementCodeTask | null {
  for (let s = step; s >= 1; s--) {
    const t = BY_STEP.get(s)
    if (t) return t
  }
  return null
}

/**
 * **정확히** 그 단계의 문항. 없으면 null — 아래로 내려가지 않는다.
 *
 * 도전 문항(한 단계 위)에 쓴다. 여기서 `codeTaskForStep` 처럼 아래로 떨어지면
 * 학생이 **이미 통과한 단계의 문항을 다시 받고** 그걸 통과해 한 칸 올라간다.
 */
export function codeTaskAtStep(step: number): PlacementCodeTask | null {
  return BY_STEP.get(step) ?? null
}

export function findCodeTask(id: string): PlacementCodeTask | undefined {
  return PLACEMENT_CODE_TASKS.find(t => t.id === id)
}

export function codeTaskTitle(t: PlacementCodeTask, lang: string): string {
  return lang === "ko" ? t.title : t.titleEn
}

export function codeTaskPrompt(t: PlacementCodeTask, lang: string): string {
  return lang === "ko" ? t.prompt : t.promptEn
}
