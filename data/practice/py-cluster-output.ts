import type { PracticeCluster } from "./types"

export const pyOutputCluster: PracticeCluster = {
  id: "py-output",
  title: "출력 형식",
  emoji: "🖨️",
  description: "print() 옵션, f-string, 포맷팅 — 출력 결과 맞추기",
  unlockAfter: "8",
  en: {
    title: "Output Formatting",
    description: "print() options, f-string, formatting — predict output",
  },
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
      en: {
        title: "Default print Separator",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        options: ["HelloWorld", "Hello World", "Hello,World", "Error"],
        explanation: "The default separator (sep) in print() is a space ' '. Multiple values are automatically separated by a space.",
        solutionExplanation: "The default separator (sep) in print() is a space ' '. Multiple values are automatically separated by a space.",
      },
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
      en: {
        title: "sep Option",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        options: ["Hello World", "HelloWorld", "Hello,World", "Error"],
        explanation: "Setting sep=\"\" (empty string) removes the separator, printing values joined together.",
        solutionExplanation: "Setting sep=\"\" (empty string) removes the separator, printing values joined together.",
      },
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
      en: {
        title: "sep with Dash",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        options: ["1 2 3", "1-2-3", "123", "1,2,3"],
        explanation: "Setting sep=\"-\" uses '-' as the separator, producing 1-2-3.",
        solutionExplanation: "Setting sep=\"-\" uses '-' as the separator, producing 1-2-3.",
      },
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
      en: {
        title: "end Option",
        description: "What is the output of the following code? (including newlines)",
        constraints: "",
        hints: [],
        codeSnippet: `print("Hello", end="!")
print("Hi")`,
        options: ["Hello\nHi", "Hello!\nHi", "Hello!Hi", "HelloHi!"],
        explanation: "end='!' makes the first print end with '!' instead of a newline. The second print uses the default end='\\n', so it appears on a new line.",
        solutionExplanation: "end='!' makes the first print end with '!' instead of a newline. The second print uses the default end='\\n', so it appears on a new line.",
      },
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
      options: ["A\nB\nC", "A B C ", "A  B  C", "ABC"],
      correctOption: 1,
      explanation: "A 뒤에 공백, B 뒤에 공백, C 뒤에는 기본 \\n. 결과: 'A B C \\n' → 'A B C ' 출력 (B 뒤 공백 포함)",
      en: {
        title: "Chaining with end Space",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        options: ["A\nB\nC", "A B C ", "A  B  C", "ABC"],
        explanation: "A ends with space, B ends with space, C uses default \\n. Result: 'A B C \\n' → prints 'A B C ' (with trailing space after C).",
        solutionExplanation: "A ends with space, B ends with space, C uses default \\n. Result: 'A B C \\n' → prints 'A B C ' (with trailing space after C).",
      },
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
      en: {
        title: "f-string Basics",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        codeSnippet: `name = "Alice"
age = 15
print(f"{name} is {age} years old.")`,
        options: ["{name} is {age} years old.", "Alice is 15 years old.", "Alice is age years old.", "Error"],
        explanation: "In an f-string, variables inside {} are replaced with their actual values.",
        solutionExplanation: "In an f-string, variables inside {} are replaced with their actual values.",
      },
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
      en: {
        title: "f-string Decimal Places",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        options: ["3.14159", "3.14", "3.1", "3.142"],
        explanation: ":.2f rounds and prints to 2 decimal places.",
        solutionExplanation: ":.2f rounds and prints to 2 decimal places.",
      },
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
      en: {
        title: "f-string Zero Padding",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        options: ["7", "007", "   7", "70"],
        explanation: ":03d pads to 3 digits, filling empty positions with 0. 7 → '007'.",
        solutionExplanation: ":03d pads to 3 digits, filling empty positions with 0. 7 → '007'.",
      },
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
      en: {
        title: "f-string with Expression",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        options: ["a + b = a + b", "3 + 4 = a + b", "3 + 4 = 7", "Error"],
        explanation: "You can use expressions inside {} in an f-string. {a+b} evaluates to 7.",
        solutionExplanation: "You can use expressions inside {} in an f-string. {a+b} evaluates to 7.",
      },
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
      en: {
        title: "Line Count",
        description: "How many lines does the following code print?",
        constraints: "",
        hints: [],
        options: ["1 line", "2 lines", "3 lines", "4 lines"],
        explanation: "range(3) generates three values: 0, 1, 2. Each value is printed on its own line, for a total of 3 lines.",
        solutionExplanation: "range(3) generates three values: 0, 1, 2. Each value is printed on its own line, for a total of 3 lines.",
      },
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
      en: {
        title: "sep with Comma",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        options: ["1 2 3 4 5", "[1, 2, 3, 4, 5]", "1, 2, 3, 4, 5", "12345"],
        explanation: "*nums unpacks the list and passes each element to print. With sep=', ', they are separated by commas: 1, 2, 3, 4, 5.",
        solutionExplanation: "*nums unpacks the list and passes each element to print. With sep=', ', they are separated by commas: 1, 2, 3, 4, 5.",
      },
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
      en: {
        title: "f-string Division Format",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        options: ["10 / 3 = 3.333333...", "10 / 3 = 3.3", "10 / 3 = 3.0", "10 / 3 = 3"],
        explanation: ":.1f formats to 1 decimal place. 10/3 ≈ 3.333... → 3.3.",
        solutionExplanation: ":.1f formats to 1 decimal place. 10/3 ≈ 3.333... → 3.3.",
      },
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
      en: {
        title: "print Return Value",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        options: ["4", "5", "6", "7"],
        explanation: "\"Python\" has 6 characters: P-y-t-h-o-n. len() returns the length of a string.",
        solutionExplanation: "\"Python\" has 6 characters: P-y-t-h-o-n. len() returns the length of a string.",
      },
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
      en: {
        title: "f-string Boolean",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        codeSnippet: `x = 5
print(f"{x} is even: {x % 2 == 0}")`,
        options: ["5 is even: 0", "5 is even: False", "5 is even: True", "Error"],
        explanation: "5 % 2 = 1 ≠ 0, so x % 2 == 0 is False. f-string prints the boolean value as-is.",
        solutionExplanation: "5 % 2 = 1 ≠ 0, so x % 2 == 0 is False. f-string prints the boolean value as-is.",
      },
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
      en: {
        title: "print with Multiple Types",
        description: "What is the output of the following code?",
        constraints: "",
        hints: [],
        codeSnippet: `print("Total:", 1 + 2 + 3)`,
        options: ["Total:6", "Total: 6", "Total: 1+2+3", "Error"],
        explanation: "print() separates multiple arguments with the default sep=' '. A space is automatically inserted between 'Total:' and 6.",
        solutionExplanation: "print() separates multiple arguments with the default sep=' '. A space is automatically inserted between 'Total:' and 6.",
      },
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
      en: {
        title: "Name Tag",
        description: "Declare variables `name = \"김코린\"`, `score = 98`, then use f-string to print:\n\n```\n이름: 김코린\n점수: 98점\n```",
        constraints: "No input. Use f-string.",
        hints: [
          'Use f"이름: {name}" to insert the variable',
          'Append "점" after the score: f"점수: {score}점"',
        ],
        solutionExplanation: "Variables placed inside {} in an f-string are replaced with their actual values.",
      },
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
      en: {
        title: "Print a Date",
        description: "Declare `year=2025`, `month=3`, `day=8`, then use sep to print the date in two formats:\n\n```\n2025-3-8\n2025/3/8\n```",
        constraints: "No input. Use sep.",
        hints: [
          'print(year, month, day, sep="-")  →  2025-3-8',
          'Change to sep="/" for the slash-separated format',
        ],
        solutionExplanation: "By changing the sep option, the same values can be printed in different formats.",
      },
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
      en: {
        title: "Grade Report",
        description: "Declare `kor=85`, `eng=92`, `math=78` and print in the format below:\n\n```\n국어: 85점\n영어: 92점\n수학: 78점\n평균: 85.00점\n```\n\nFormat the average to 2 decimal places.",
        constraints: "No input. Use f-string and :.2f.",
        hints: [
          "Average = (kor + eng + math) / 3",
          'Use f"{avg:.2f}" to format to 2 decimal places',
        ],
        solutionExplanation: "Use the :.2f format in f-string to align to 2 decimal places. (85+92+78)/3 = 85.0.",
      },
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
      en: {
        title: "Countdown",
        description: "Use the end option to print a countdown from 5 to 1 on a single line separated by spaces, then print \"발사!\" at the end.\n\n```\n5 4 3 2 1 발사!\n```",
        constraints: "No input. Use print's end option.",
        hints: [
          'print(5, end=" "), print(4, end=" "), ...',
          'Print \"발사!\" last without end (uses default \\n)',
        ],
        solutionExplanation: "end=\" \" replaces the newline with a space, letting subsequent prints continue on the same line. The last print uses the default newline.",
      },
    },
    {
      id: "pyout-c05",
      cluster: "py-output",
      unlockAfter: "8",
      type: "code",
      difficulty: "보통",
      title: "리스트 한 줄 출력",
      description: "리스트 `nums = [10, 20, 30, 40, 50]`의 모든 원소를 `→` 로 연결해 한 줄에 출력하세요.\n\n```\n10→20→30→40→50\n```\n\n힌트: `*nums`로 리스트를 펼칠 수 있어요.",
      constraints: "입력 없음.",
      language: "python",
      initialCode: `nums = [10, 20, 30, 40, 50]

# sep를 활용해 한 줄에 출력하세요
`,
      testCases: [
        { stdin: "", expectedOutput: "10→20→30→40→50" },
      ],
      hints: [
        "print(*nums) 는 리스트를 풀어서 출력합니다",
        'sep="→" 로 구분자를 설정하세요',
      ],
      solutionCode: `nums = [10, 20, 30, 40, 50]
print(*nums, sep="→")`,
      solutionExplanation: "*nums는 리스트를 각 원소로 펼쳐서 print에 전달합니다. sep='→'로 구분자를 설정합니다.",
      en: {
        title: "Print List in One Line",
        description: "Print all elements of `nums = [10, 20, 30, 40, 50]` joined by `→` on a single line.\n\n```\n10→20→30→40→50\n```\n\nHint: Use `*nums` to unpack the list.",
        constraints: "No input.",
        hints: [
          "print(*nums) unpacks the list for printing",
          'Set sep="→" as the separator',
        ],
        solutionExplanation: "*nums unpacks the list into individual arguments for print. sep='→' sets the separator.",
      },
    },
    {
      id: "pyout-c06",
      cluster: "py-output",
      unlockAfter: "8",
      type: "code",
      difficulty: "어려움",
      title: "구구단 한 줄씩",
      description: "정수 `n`을 입력받아 n단 구구단을 아래 형식으로 출력하세요.\n\n입력: `3`\n```\n3x1=3  3x2=6  3x3=9  3x4=12  3x5=15  3x6=18  3x7=21  3x8=24  3x9=27\n```\n\n각 식은 두 칸 공백(`  `)으로 구분하고, 마지막에는 공백 없이 줄바꿈합니다.",
      constraints: "2 ≤ n ≤ 9",
      language: "python",
      initialCode: `n = int(input())

# end와 sep를 활용해 한 줄에 구구단을 출력하세요
`,
      testCases: [
        { stdin: "3", expectedOutput: "3x1=3  3x2=6  3x3=9  3x4=12  3x5=15  3x6=18  3x7=21  3x8=24  3x9=27" },
        { stdin: "5", expectedOutput: "5x1=5  5x2=10  5x3=15  5x4=20  5x5=25  5x6=30  5x7=35  5x8=40  5x9=45" },
      ],
      hints: [
        "for i in range(1, 10): 로 1~9를 반복합니다",
        'i가 9가 아니면 end="  "(두 칸), 9이면 기본 end 사용',
        'f"{n}x{i}={n*i}" 로 각 식을 만들어요',
      ],
      solutionCode: `n = int(input())
for i in range(1, 10):
    if i < 9:
        print(f"{n}x{i}={n*i}", end="  ")
    else:
        print(f"{n}x{i}={n*i}")`,
      solutionExplanation: "i가 1~8일 때는 end='  '(두 칸 공백)으로 같은 줄에 이어 씁니다. 마지막 i=9일 때는 기본 end='\\n'으로 줄바꿈합니다.",
      en: {
        title: "Times Table on One Line",
        description: "Read an integer `n` and print its multiplication table in this format:\n\nInput: `3`\n```\n3x1=3  3x2=6  3x3=9  3x4=12  3x5=15  3x6=18  3x7=21  3x8=24  3x9=27\n```\n\nSeparate each expression with two spaces. No trailing spaces.",
        constraints: "2 ≤ n ≤ 9",
        hints: [
          "Loop with for i in range(1, 10)",
          'Use end="  " (two spaces) for i < 9, default end for i == 9',
          'Build each expression with f"{n}x{i}={n*i}"',
        ],
        solutionExplanation: "For i = 1~8, use end='  ' to continue on the same line. For the last i = 9, use the default end='\\n' to add a newline.",
      },
    },
    {
      id: "pyout-c07",
      cluster: "py-output",
      unlockAfter: "8",
      type: "code",
      difficulty: "어려움",
      title: "영수증 출력",
      description: "상품 3개의 이름, 가격을 받아 영수증 형식으로 출력하세요. f-string의 정렬 기능을 사용합니다.\n\n```\n상품명          가격\n--------------------\n사과             800\n바나나           1200\n우유             950\n--------------------\n합계            2950\n```\n\n- 상품명 칸: 왼쪽 정렬, 15자 (`{name:<15}`)\n- 가격 칸: 오른쪽 정렬, 5자 (`{price:>5}`)",
      constraints: "입력 없음. 변수 직접 사용.",
      language: "python",
      initialCode: `items = [("사과", 800), ("바나나", 1200), ("우유", 950)]

# f-string 정렬로 영수증을 출력하세요
`,
      testCases: [
        { stdin: "", expectedOutput: "상품명               가격\n--------------------\n사과               800\n바나나             1200\n우유               950\n--------------------\n합계              2950" },
      ],
      hints: [
        '제목 행: f"{"상품명":<15}{"가격":>5}"',
        "구분선: print(\"-\" * 20)",
        "합계: sum(price for _, price in items)",
      ],
      solutionCode: `items = [("사과", 800), ("바나나", 1200), ("우유", 950)]
print(f"{'상품명':<15}{'가격':>5}")
print("-" * 20)
for name, price in items:
    print(f"{name:<15}{price:>5}")
print("-" * 20)
total = sum(p for _, p in items)
print(f"{'합계':<15}{total:>5}")`,
      solutionExplanation: "f-string의 :<15는 왼쪽 정렬 15자, :>5는 오른쪽 정렬 5자입니다. 한글은 2바이트라 정렬이 조금 다를 수 있지만 개념을 익히는 게 목표입니다.",
      en: {
        title: "Receipt Printer",
        description: "Print a receipt for 3 items using f-string alignment.\n\n```\n상품명          가격\n--------------------\n사과             800\n바나나           1200\n우유             950\n--------------------\n합계            2950\n```\n\n- Item name: left-aligned, 15 chars (`{name:<15}`)\n- Price: right-aligned, 5 chars (`{price:>5}`)",
        constraints: "No input. Use variables directly.",
        hints: [
          'Header: f"{\"상품명\":<15}{\"가격\":>5}"',
          'Divider: print("-" * 20)',
          "Total: sum(price for _, price in items)",
        ],
        solutionExplanation: ":<15 is left-aligned to 15 characters, :>5 is right-aligned to 5 characters. This is the key f-string alignment syntax.",
      },
    },
  ],
}
