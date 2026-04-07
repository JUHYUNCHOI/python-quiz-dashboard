import type { PracticeCluster } from "./types"

export const pyOutputCluster: PracticeCluster = {
  id: "py-output",
  title: "출력 형식",
  emoji: "🖨️",
  description: "print() 옵션, f-string, 포맷팅 — 출력 결과 맞추기",
  unlockAfter: "8",
  problems: [
    {
      id: "pyout-001",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "쉬움",
      title: "print 기본 구분자",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print("Hello", "World")`,
      options: ["HelloWorld", "Hello World", "Hello,World", "오류"],
      correctOption: 1,
      explanation: "print()의 기본 구분자(sep)는 공백 ' '입니다. 여러 값을 쓰면 자동으로 공백으로 구분됩니다.",
    },
    {
      id: "pyout-002",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "쉬움",
      title: "sep 옵션",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print("Hello", "World", sep="")`,
      options: ["Hello World", "HelloWorld", "Hello,World", "오류"],
      correctOption: 1,
      explanation: "sep=\"\"로 구분자를 빈 문자열로 설정하면 붙여서 출력됩니다.",
    },
    {
      id: "pyout-003",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "쉬움",
      title: "sep 대시",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(1, 2, 3, sep="-")`,
      options: ["1 2 3", "1-2-3", "123", "1,2,3"],
      correctOption: 1,
      explanation: "sep=\"-\"로 구분자를 '-'로 설정하면 1-2-3이 출력됩니다.",
    },
    {
      id: "pyout-004",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "쉬움",
      title: "end 옵션",
      description: "다음 코드의 출력 결과는? (줄바꿈 포함)",
      constraints: "",
      language: "python",
      codeSnippet: `print("안녕", end="!")
print("반가워")`,
      options: ["안녕\n반가워", "안녕!\n반가워", "안녕!반가워", "안녕반가워!"],
      correctOption: 1,
      explanation: "end='!'로 첫 print는 줄바꿈 대신 '!'로 끝납니다. 두 번째 print는 기본 end='\\n'이므로 새 줄에 출력됩니다.",
    },
    {
      id: "pyout-005",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "보통",
      title: "end 공백으로 이어쓰기",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print("A", end=" ")
print("B", end=" ")
print("C")`,
      options: ["A\nB\nC", "A B C ", "A B C", "ABC"],
      correctOption: 1,
      explanation: "A 뒤에 공백, B 뒤에 공백, C 뒤에는 기본 \\n. 결과: 'A B C \\n' → 'A B C ' 출력",
    },
    {
      id: "pyout-006",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "쉬움",
      title: "f-string 기본",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `name = "철수"
age = 15
print(f"{name}는 {age}살입니다.")`,
      options: ["{name}는 {age}살입니다.", "철수는 15살입니다.", "철수는 age살입니다.", "오류"],
      correctOption: 1,
      explanation: "f-string에서 {}안의 변수는 실제 값으로 교체됩니다.",
    },
    {
      id: "pyout-007",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "보통",
      title: "f-string 소수점",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `x = 3.14159
print(f"{x:.2f}")`,
      options: ["3.14159", "3.14", "3.1", "3.142"],
      correctOption: 1,
      explanation: ":.2f는 소수점 이하 2자리로 반올림해서 출력합니다.",
    },
    {
      id: "pyout-008",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "보통",
      title: "f-string 0 채우기",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `n = 7
print(f"{n:03d}")`,
      options: ["7", "007", "   7", "70"],
      correctOption: 1,
      explanation: ":03d는 3자리로 맞추고 빈 자리를 0으로 채웁니다. 7 → '007'",
    },
    {
      id: "pyout-009",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "쉬움",
      title: "f-string 연산",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `a = 3
b = 4
print(f"{a} + {b} = {a + b}")`,
      options: ["a + b = a + b", "3 + 4 = a + b", "3 + 4 = 7", "오류"],
      correctOption: 2,
      explanation: "f-string {} 안에서 연산도 가능합니다. {a+b}는 7로 평가됩니다.",
    },
    {
      id: "pyout-010",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "보통",
      title: "print 줄 수",
      description: "다음 코드를 실행하면 몇 줄이 출력되나요?",
      constraints: "",
      language: "python",
      codeSnippet: `for i in range(3):
    print(i)`,
      options: ["1줄", "2줄", "3줄", "4줄"],
      correctOption: 2,
      explanation: "range(3)은 0, 1, 2 세 값을 생성합니다. 각 값마다 한 줄씩 출력되어 총 3줄입니다.",
    },
    {
      id: "pyout-011",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "보통",
      title: "sep 콤마",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `nums = [1, 2, 3, 4, 5]
print(*nums, sep=", ")`,
      options: ["1 2 3 4 5", "[1, 2, 3, 4, 5]", "1, 2, 3, 4, 5", "12345"],
      correctOption: 2,
      explanation: "*nums는 리스트를 펼쳐서 print에 전달합니다. sep=', '로 구분하면 1, 2, 3, 4, 5가 출력됩니다.",
    },
    {
      id: "pyout-012",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "쉬움",
      title: "f-string 나눗셈 포맷",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `a, b = 10, 3
print(f"{a} / {b} = {a/b:.1f}")`,
      options: ["10 / 3 = 3.333333...", "10 / 3 = 3.3", "10 / 3 = 3.0", "10 / 3 = 3"],
      correctOption: 1,
      explanation: ":.1f는 소수점 이하 1자리로 출력합니다. 10/3 ≈ 3.333... → 3.3",
    },
    {
      id: "pyout-013",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "쉬움",
      title: "print 결과값",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print(len("Python"))`,
      options: ["4", "5", "6", "7"],
      correctOption: 2,
      explanation: "Python은 P-y-t-h-o-n 6글자입니다. len()은 문자열 길이를 반환합니다.",
    },
    {
      id: "pyout-014",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "보통",
      title: "f-string 불리언",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `x = 5
print(f"{x}는 짝수: {x % 2 == 0}")`,
      options: ["5는 짝수: 0", "5는 짝수: False", "5는 짝수: True", "오류"],
      correctOption: 1,
      explanation: "5 % 2 = 1 ≠ 0이므로 x % 2 == 0은 False. f-string은 False를 그대로 출력합니다.",
    },
    {
      id: "pyout-015",
      cluster: "py-output",
      unlockAfter: "8",
      type: "mcq",
      difficulty: "쉬움",
      title: "print 여러 타입",
      description: "다음 코드의 출력 결과는?",
      constraints: "",
      language: "python",
      codeSnippet: `print("합계:", 1 + 2 + 3)`,
      options: ["합계:6", "합계: 6", "합계: 1+2+3", "오류"],
      correctOption: 1,
      explanation: "print()는 여러 인자를 기본 sep=' '로 구분합니다. '합계:'와 6 사이에 공백이 자동으로 들어갑니다.",
    },

    // ── 코딩 직접 해보기 ──────────────────────────────────────
    {
      id: "pyout-c01",
      cluster: "py-output",
      unlockAfter: "8",
      type: "code",
      difficulty: "쉬움",
      title: "이름표 만들기",
      description: "변수 `name = \"김코린\"`, `score = 98`을 선언하고, f-string으로 다음 형식으로 출력하세요.\n\n```\n이름: 김코린\n점수: 98점\n```",
      constraints: "입력 없음. f-string 사용.",
      language: "python",
      initialCode: `name = "김코린"
score = 98

# f-string으로 이름과 점수를 출력하세요
`,
      testCases: [
        { stdin: "", expectedOutput: "이름: 김코린\n점수: 98점" },
      ],
      hints: [
        'f"이름: {name}" 으로 변수를 삽입할 수 있어요',
        '점수 뒤에 "점" 문자를 붙여주세요: f"점수: {score}점"',
      ],
      solutionCode: `name = "김코린"
score = 98
print(f"이름: {name}")
print(f"점수: {score}점")`,
      solutionExplanation: "f-string의 {} 안에 변수를 넣으면 실제 값으로 대체됩니다.",
    },
    {
      id: "pyout-c02",
      cluster: "py-output",
      unlockAfter: "8",
      type: "code",
      difficulty: "쉬움",
      title: "날짜 출력하기",
      description: "변수 `year=2025`, `month=3`, `day=8`을 선언하고, sep를 활용해 다음 두 가지 형식으로 출력하세요.\n\n```\n2025-3-8\n2025/3/8\n```",
      constraints: "입력 없음. sep 사용.",
      language: "python",
      initialCode: `year = 2025
month = 3
day = 8

# sep를 사용해 두 가지 형식으로 출력하세요
`,
      testCases: [
        { stdin: "", expectedOutput: "2025-3-8\n2025/3/8" },
      ],
      hints: [
        'print(year, month, day, sep="-")  →  2025-3-8',
        'sep="/"로 바꾸면 슬래시로 구분됩니다',
      ],
      solutionCode: `year = 2025
month = 3
day = 8
print(year, month, day, sep="-")
print(year, month, day, sep="/")`,
      solutionExplanation: "sep 옵션으로 구분자를 바꾸면 같은 값도 다른 형식으로 출력할 수 있습니다.",
    },
    {
      id: "pyout-c03",
      cluster: "py-output",
      unlockAfter: "8",
      type: "code",
      difficulty: "보통",
      title: "성적 리포트",
      description: "`kor=85`, `eng=92`, `math=78`을 선언하고, 아래 형식으로 출력하세요.\n\n```\n국어: 85점\n영어: 92점\n수학: 78점\n평균: 85.00점\n```\n\n평균은 소수점 2자리로 포맷하세요.",
      constraints: "입력 없음. f-string과 :.2f 사용.",
      language: "python",
      initialCode: `kor = 85
eng = 92
math = 78

# 세 과목 점수와 평균을 출력하세요 (평균은 소수점 2자리)
`,
      testCases: [
        { stdin: "", expectedOutput: "국어: 85점\n영어: 92점\n수학: 78점\n평균: 85.00점" },
      ],
      hints: [
        "평균 = (kor + eng + math) / 3",
        "f\"{avg:.2f}\"로 소수점 2자리를 맞춥니다",
      ],
      solutionCode: `kor = 85
eng = 92
math = 78
avg = (kor + eng + math) / 3
print(f"국어: {kor}점")
print(f"영어: {eng}점")
print(f"수학: {math}점")
print(f"평균: {avg:.2f}점")`,
      solutionExplanation: "f-string의 :.2f 포맷으로 소수점 이하 2자리를 맞춥니다. (85+92+78)/3 = 85.0",
    },
    {
      id: "pyout-c04",
      cluster: "py-output",
      unlockAfter: "8",
      type: "code",
      difficulty: "보통",
      title: "카운트다운",
      description: "end 옵션을 이용해 5부터 1까지 한 줄에 공백으로 구분하여 출력하고, 마지막에 \"발사!\"를 출력하세요.\n\n```\n5 4 3 2 1 발사!\n```",
      constraints: "입력 없음. print의 end 옵션 사용.",
      language: "python",
      initialCode: `# end=" "를 활용해 한 줄에 카운트다운을 출력하세요
`,
      testCases: [
        { stdin: "", expectedOutput: "5 4 3 2 1 발사!" },
      ],
      hints: [
        'print(5, end=" "), print(4, end=" "), ...',
        '마지막 "발사!"는 end 없이 기본값(\\n) 사용',
      ],
      solutionCode: `print(5, end=" ")
print(4, end=" ")
print(3, end=" ")
print(2, end=" ")
print(1, end=" ")
print("발사!")`,
      solutionExplanation: "end=\" \"로 줄바꿈 대신 공백을 출력해 같은 줄에 이어 씁니다. 마지막에는 end 없이 자동으로 줄바꿈됩니다.",
    },
  ],
}
