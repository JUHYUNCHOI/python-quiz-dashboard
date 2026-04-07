import type { PracticeCluster } from "./types"

export const pyBasicsCluster: PracticeCluster = {
  id: "py-basics",
  title: "연산자",
  emoji: "🔢",
  description: "사칙연산, //, %, **, 우선순위, 타입 특성 — 출력 결과 맞추기",
  unlockAfter: "4",
  problems: [
    {
      id: "pybasics-001",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "쉬움",
      title: "문자열 + 문자열",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print("10" + "20")`,
      options: ["30", '"1020"', "1020", "오류"],
      correctOption: 2,
      explanation: "문자열끼리 +는 이어붙이기(concatenation)입니다. '10'+'20' = '1020'. 숫자로 더하려면 int()로 변환해야 합니다.",
    },
    {
      id: "pybasics-002",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "쉬움",
      title: "정수 나눗셈",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(10 / 3)`,
      options: ["3", "3.0", "3.3333333333333335", "3.33"],
      correctOption: 2,
      explanation: "Python 3에서 /는 항상 float 나눗셈입니다. 10/3 = 3.3333... (소수점 계속). 정수 나눗셈은 // 연산자를 사용합니다.",
    },
    {
      id: "pybasics-003",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "쉬움",
      title: "몫(floor division)",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(10 // 3)`,
      options: ["3", "3.0", "3.3333...", "3.33"],
      correctOption: 0,
      explanation: "// 연산자는 floor division(정수 나눗셈)으로 소수점 이하를 버립니다. 10 // 3 = 3",
    },
    {
      id: "pybasics-004",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "쉬움",
      title: "나머지 연산",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(17 % 5)`,
      options: ["0", "2", "3", "5"],
      correctOption: 1,
      explanation: "% 는 나머지(모듈로) 연산입니다. 17 = 5×3 + 2이므로 17 % 5 = 2",
    },
    {
      id: "pybasics-005",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "쉬움",
      title: "거듭제곱",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(2 ** 8)`,
      options: ["16", "64", "256", "512"],
      correctOption: 2,
      explanation: "** 는 거듭제곱 연산자입니다. 2⁸ = 256",
    },
    {
      id: "pybasics-006",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "쉬움",
      title: "연산자 우선순위",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(10 + 3 * 2)`,
      options: ["26", "16", "11", "32"],
      correctOption: 1,
      explanation: "곱셈(*)이 덧셈(+)보다 먼저 계산됩니다. 3*2=6, 10+6=16",
    },
    {
      id: "pybasics-007",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "쉬움",
      title: "문자열 반복",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print("ab" * 3)`,
      options: ["ab3", "ababab", "ab ab ab", "오류"],
      correctOption: 1,
      explanation: "문자열 * 정수는 문자열을 반복합니다. 'ab' * 3 = 'ababab'",
    },
    {
      id: "pybasics-008",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "쉬움",
      title: "bool(0)",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(bool(0))`,
      options: ["True", "False", "0", "오류"],
      correctOption: 1,
      explanation: "Python에서 0, 0.0, '', [], {} 등은 거짓(False)입니다. bool(0) = False",
    },
    {
      id: "pybasics-009",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "보통",
      title: "bool(\"False\")",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(bool("False"))`,
      options: ["True", "False", "오류", "None"],
      correctOption: 0,
      explanation: "비어있지 않은 문자열은 모두 True입니다! 'False'는 'False'라는 내용의 문자열이지, Python의 False가 아닙니다.",
    },
    {
      id: "pybasics-010",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "보통",
      title: "1 == True",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(1 == True)`,
      options: ["True", "False", "오류", "1"],
      correctOption: 0,
      explanation: "Python에서 True는 내부적으로 1, False는 0과 같습니다. 1 == True는 True입니다.",
    },
    {
      id: "pybasics-013",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "쉬움",
      title: "변수 재할당",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `x = 10
x = x + 5
x = x * 2
print(x)`,
      options: ["10", "15", "30", "25"],
      correctOption: 2,
      explanation: "x = 10 → x = 10+5 = 15 → x = 15*2 = 30",
    },
    {
      id: "pybasics-015",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "mcq",
      difficulty: "쉬움",
      title: "비교 연산자",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(10 == 10.0)`,
      options: ["True", "False", "오류", "None"],
      correctOption: 0,
      explanation: "Python은 int와 float를 비교할 때 값을 기준으로 비교합니다. 10과 10.0은 같은 값이므로 True입니다.",
    },

    // ── 코딩 직접 해보기 ──────────────────────────────────────
    {
      id: "pybasics-c01",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "code",
      difficulty: "쉬움",
      title: "변수로 계산하기",
      description: "변수 `a = 15`, `b = 4`를 선언하고, 다음 5가지를 각각 한 줄씩 출력하세요.\n\n- a + b\n- a - b\n- a * b\n- a // b  (정수 나눗셈)\n- a % b   (나머지)",
      constraints: "입력 없음. print() 5번 사용.",
      language: "python",
      initialCode: `a = 15
b = 4

# 합, 차, 곱, 정수 나눗셈, 나머지를 순서대로 출력하세요
`,
      testCases: [
        { stdin: "", expectedOutput: "19\n11\n60\n3\n3" },
      ],
      hints: [
        "//는 소수점을 버리는 나눗셈입니다. 15 // 4 = 3",
        "%는 나머지 연산입니다. 15 % 4 = 3",
      ],
      solutionCode: `a = 15
b = 4

print(a + b)
print(a - b)
print(a * b)
print(a // b)
print(a % b)`,
      solutionExplanation: "각 연산 결과를 print()로 출력합니다. //는 정수 나눗셈(몫), %는 나머지입니다.",
    },
    {
      id: "pybasics-c02",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "code",
      difficulty: "쉬움",
      title: "2의 거듭제곱",
      description: "2⁰부터 2⁷까지 8개의 값을 한 줄씩 출력하세요.\n\n예:\n```\n1\n2\n4\n8\n...\n128\n```",
      constraints: "입력 없음. ** 연산자 사용.",
      language: "python",
      initialCode: `# 2**0, 2**1, ... 2**7 을 순서대로 출력하세요
`,
      testCases: [
        { stdin: "", expectedOutput: "1\n2\n4\n8\n16\n32\n64\n128" },
      ],
      hints: [
        "2 ** 0 = 1, 2 ** 1 = 2, 2 ** 2 = 4 ...",
        "print(2**0), print(2**1) 처럼 8번 반복하면 됩니다.",
      ],
      solutionCode: `print(2**0)
print(2**1)
print(2**2)
print(2**3)
print(2**4)
print(2**5)
print(2**6)
print(2**7)`,
      solutionExplanation: "** 연산자로 거듭제곱을 계산합니다. 2**7 = 128",
    },
    {
      id: "pybasics-c03",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "code",
      difficulty: "보통",
      title: "연산자 우선순위 확인",
      description: "아래 두 식의 결과를 각각 출력하세요.\n\n1. `2 + 3 * 4 - 1`\n2. `(2 + 3) * (4 - 1)`\n\n두 식의 결과가 다름을 확인하세요.",
      constraints: "입력 없음.",
      language: "python",
      initialCode: `# 두 식을 계산해서 각각 출력하세요
`,
      testCases: [
        { stdin: "", expectedOutput: "13\n15" },
      ],
      hints: [
        "첫 번째 식: 곱셈 먼저! 3*4=12, 그 다음 2+12-1",
        "두 번째 식: 괄호 먼저! (2+3)=5, (4-1)=3, 5*3=15",
      ],
      solutionCode: `print(2 + 3 * 4 - 1)
print((2 + 3) * (4 - 1))`,
      solutionExplanation: "괄호 없이는 곱셈이 먼저: 2+12-1=13. 괄호로 묶으면 (5)*(3)=15",
    },
    {
      id: "pybasics-c04",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "code",
      difficulty: "보통",
      title: "원의 넓이",
      description: "반지름 `r = 5`인 원의 넓이를 계산해서 출력하세요.\n\n공식: `넓이 = 3.14 * r * r`\n\n예상 출력:\n```\n78.5\n```",
      constraints: "입력 없음. pi = 3.14 사용.",
      language: "python",
      initialCode: `r = 5
pi = 3.14

# 원의 넓이를 계산해서 출력하세요
`,
      testCases: [
        { stdin: "", expectedOutput: "78.5" },
      ],
      hints: [
        "넓이 = pi * r * r",
        "3.14 * 5 * 5 = ?",
      ],
      solutionCode: `r = 5
pi = 3.14
print(pi * r * r)`,
      solutionExplanation: "3.14 * 5 * 5 = 78.5",
    },
    {
      id: "pybasics-c05",
      cluster: "py-basics",
      unlockAfter: "4",
      type: "code",
      difficulty: "보통",
      title: "짝수 홀수 판별",
      description: "n = 17을 선언하고, 다음 두 줄을 출력하세요.\n\n- 첫째 줄: n이 짝수인지 여부 → n % 2 == 0\n- 둘째 줄: n이 홀수인지 여부 → n % 2 != 0",
      constraints: "입력 없음. 출력: False / True",
      language: "python",
      initialCode: `n = 17

# n이 짝수인지, 홀수인지 판별해서 출력하세요
`,
      testCases: [
        { stdin: "", expectedOutput: "False\nTrue" },
      ],
      hints: [
        "짝수: n % 2 == 0",
        "홀수: n % 2 != 0  또는  n % 2 == 1",
      ],
      solutionCode: `n = 17
print(n % 2 == 0)
print(n % 2 != 0)`,
      solutionExplanation: "17 % 2 = 1 (나머지가 1). 17은 홀수이므로 짝수 판별은 False, 홀수 판별은 True.",
    },
  ],
}
