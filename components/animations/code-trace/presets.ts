import { CodeTracePreset } from "./code-trace-simulator"

// ============================================================
// Python: if/else 기본
// ============================================================
export const PY_IF_ELSE_BASIC: CodeTracePreset = {
  title: { ko: "if/else 실행 흐름", en: "if/else Execution Flow" },
  description: { ko: "변수 값에 따라 어떤 코드가 실행되는지 한 줄씩 따라가 보세요", en: "Follow line by line to see which code runs based on variable values" },
  language: "python",
  code: [
    "score = 85",
    "if score >= 90:",
    '    print("A학점")',
    "elif score >= 80:",
    '    print("B학점")',
    "else:",
    '    print("C학점")',
    'print("끝")',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "score", value: 85, type: "int", changed: true }],
      explanation: { ko: "score 변수에 85를 저장합니다", en: "Store 85 in variable score" },
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "score", value: 85, type: "int" }],
      condition: { expression: "score >= 90", substituted: "85 >= 90", result: false },
      explanation: { ko: "score가 90 이상인지 확인합니다. 85는 90보다 작으니까 거짓!", en: "Check if score >= 90. 85 is less than 90, so False!" },
      arrow: "skip",
    },
    {
      line: 4, phase: "condition",
      variables: [{ name: "score", value: 85, type: "int" }],
      condition: { expression: "score >= 80", substituted: "85 >= 80", result: true },
      explanation: { ko: "다음 조건! score가 80 이상인지 확인합니다. 85 >= 80은 참!", en: "Next condition! Check if score >= 80. 85 >= 80 is True!" },
      arrow: "enter-elif",
    },
    {
      line: 5, phase: "output",
      variables: [{ name: "score", value: 85, type: "int" }],
      output: "B학점",
      explanation: { ko: "elif 조건이 참이니까 이 줄을 실행! 'B학점'을 출력합니다", en: "elif condition is True, so this line runs! Print 'B학점'" },
    },
    {
      line: 8, phase: "output",
      variables: [{ name: "score", value: 85, type: "int" }],
      output: "끝",
      explanation: { ko: "if-elif-else 블록을 빠져나와 다음 코드를 실행합니다", en: "Exit the if-elif-else block and run the next code" },
    },
  ],
}

// ============================================================
// Python: if/else 기본 — score=65 (else 경로)
// ============================================================
export const PY_IF_ELSE_LOW: CodeTracePreset = {
  title: { ko: "if/else 실행 흐름 (score=65)", en: "if/else Flow (score=65)" },
  description: { ko: "이번엔 score=65! 어떤 조건도 안 맞으면 else로 가는 과정을 봐요", en: "Now score=65! Watch what happens when no condition matches" },
  language: "python",
  code: [
    "score = 65",
    "if score >= 90:",
    '    print("A학점")',
    "elif score >= 80:",
    '    print("B학점")',
    "else:",
    '    print("C학점")',
    'print("끝")',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "score", value: 65, type: "int", changed: true }],
      explanation: { ko: "score 변수에 65를 저장합니다", en: "Store 65 in variable score" },
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "score", value: 65, type: "int" }],
      condition: { expression: "score >= 90", substituted: "65 >= 90", result: false },
      explanation: { ko: "score가 90 이상? 65는 90보다 작으니까 거짓! → 건너뜀", en: "score >= 90? 65 < 90, False! → Skip" },
      arrow: "skip",
    },
    {
      line: 4, phase: "condition",
      variables: [{ name: "score", value: 65, type: "int" }],
      condition: { expression: "score >= 80", substituted: "65 >= 80", result: false },
      explanation: { ko: "다음 조건! score가 80 이상? 65는 80보다도 작아서 거짓! → 이것도 건너뜀", en: "Next condition! score >= 80? 65 < 80, also False! → Skip this too" },
      arrow: "skip",
    },
    {
      line: 6, phase: "execute",
      variables: [{ name: "score", value: 65, type: "int" }],
      explanation: { ko: "모든 조건이 거짓이었으니까 else로! 남은 건 else뿐이에요", en: "All conditions were False, so we go to else!" },
      arrow: "enter-else",
    },
    {
      line: 7, phase: "output",
      variables: [{ name: "score", value: 65, type: "int" }],
      output: "C학점",
      explanation: { ko: "else 블록 실행! 'C학점'을 출력합니다. 어떤 if/elif도 참이 아니었으니까요", en: "Execute else block! Print 'C학점' since no if/elif was True" },
    },
    {
      line: 8, phase: "output",
      variables: [{ name: "score", value: 65, type: "int" }],
      output: "끝",
      explanation: { ko: "if-elif-else 블록을 빠져나와 다음 코드 실행", en: "Exit if-elif-else block and continue" },
    },
  ],
}

// ============================================================
// Python: if/else 중첩
// ============================================================
export const PY_NESTED_IF: CodeTracePreset = {
  title: { ko: "중첩 if문 실행 흐름", en: "Nested if Statement Flow" },
  description: { ko: "if 안에 if가 있을 때 어떻게 실행되는지 추적해 보세요", en: "Trace how nested if statements execute" },
  language: "python",
  code: [
    "age = 15",
    "has_id = True",
    "if age >= 13:",
    "    if has_id:",
    '        print("입장 가능")',
    "    else:",
    '        print("신분증 필요")',
    "else:",
    '    print("미성년자 입장불가")',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "age", value: 15, type: "int", changed: true }],
      explanation: { ko: "age 변수에 15를 저장합니다", en: "Store 15 in variable age" },
    },
    {
      line: 2, phase: "assign",
      variables: [
        { name: "age", value: 15, type: "int" },
        { name: "has_id", value: true, type: "bool", changed: true },
      ],
      explanation: { ko: "has_id 변수에 True를 저장합니다", en: "Store True in variable has_id" },
    },
    {
      line: 3, phase: "condition",
      variables: [
        { name: "age", value: 15, type: "int" },
        { name: "has_id", value: true, type: "bool" },
      ],
      condition: { expression: "age >= 13", substituted: "15 >= 13", result: true },
      explanation: { ko: "바깥 if: age가 13 이상인지? 15 >= 13은 참!", en: "Outer if: is age >= 13? 15 >= 13 is True!" },
      arrow: "enter-if",
    },
    {
      line: 4, phase: "condition",
      variables: [
        { name: "age", value: 15, type: "int" },
        { name: "has_id", value: true, type: "bool" },
      ],
      condition: { expression: "has_id", substituted: "True", result: true },
      explanation: { ko: "안쪽 if: has_id가 참인지? True니까 참!", en: "Inner if: is has_id True? Yes!" },
      arrow: "enter-if",
    },
    {
      line: 5, phase: "output",
      variables: [
        { name: "age", value: 15, type: "int" },
        { name: "has_id", value: true, type: "bool" },
      ],
      output: "입장 가능",
      explanation: { ko: "두 조건 모두 참이니까 '입장 가능'을 출력합니다!", en: "Both conditions are True, so print '입장 가능'!" },
    },
  ],
}

// ============================================================
// Python: if/else 중첩 — has_id=False (inner else 경로)
// ============================================================
export const PY_NESTED_IF_FALSE: CodeTracePreset = {
  title: { ko: "중첩 if문 (has_id=False)", en: "Nested if (has_id=False)" },
  description: { ko: "이번엔 has_id가 False! 안쪽 if가 거짓이면 어디로 가는지 봐요", en: "Now has_id is False! See where the inner if goes when False" },
  language: "python",
  code: [
    "age = 15",
    "has_id = False",
    "if age >= 13:",
    "    if has_id:",
    '        print("입장 가능")',
    "    else:",
    '        print("신분증 필요")',
    "else:",
    '    print("미성년자 입장불가")',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "age", value: 15, type: "int", changed: true }],
      explanation: { ko: "age 변수에 15를 저장합니다", en: "Store 15 in variable age" },
    },
    {
      line: 2, phase: "assign",
      variables: [
        { name: "age", value: 15, type: "int" },
        { name: "has_id", value: false, type: "bool", changed: true },
      ],
      explanation: { ko: "has_id 변수에 False를 저장합니다 (이번엔 신분증 없음!)", en: "Store False in has_id (no ID this time!)" },
    },
    {
      line: 3, phase: "condition",
      variables: [
        { name: "age", value: 15, type: "int" },
        { name: "has_id", value: false, type: "bool" },
      ],
      condition: { expression: "age >= 13", substituted: "15 >= 13", result: true },
      explanation: { ko: "바깥 if: age(15)가 13 이상? 참! → 안쪽으로 진입", en: "Outer if: age(15) >= 13? True! → Enter inner block" },
      arrow: "enter-if",
    },
    {
      line: 4, phase: "condition",
      variables: [
        { name: "age", value: 15, type: "int" },
        { name: "has_id", value: false, type: "bool" },
      ],
      condition: { expression: "has_id", substituted: "False", result: false },
      explanation: { ko: "안쪽 if: has_id가 참인가? False니까 거짓! → else로!", en: "Inner if: is has_id True? It's False! → Go to else!" },
      arrow: "enter-else",
    },
    {
      line: 7, phase: "output",
      variables: [
        { name: "age", value: 15, type: "int" },
        { name: "has_id", value: false, type: "bool" },
      ],
      output: "신분증 필요",
      explanation: { ko: "안쪽 else 실행! 나이는 충분하지만 신분증이 없어서 '신분증 필요' 출력!", en: "Inner else runs! Age is OK but no ID, so print '신분증 필요'!" },
    },
  ],
}

// ============================================================
// Python: for 반복문 (합계)
// ============================================================
export const PY_FOR_SUM: CodeTracePreset = {
  title: { ko: "for 반복문: 합계 구하기", en: "for Loop: Calculating Sum" },
  description: { ko: "반복할 때마다 변수가 어떻게 변하는지 한 단계씩 봐요", en: "Watch how variables change with each iteration" },
  language: "python",
  code: [
    "total = 0",
    "for i in range(1, 4):",
    "    total = total + i",
    '    print(f"i={i}, total={total}")',
    'print(f"합계: {total}")',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "total", value: 0, type: "int", changed: true }],
      explanation: { ko: "total을 0으로 초기화합니다", en: "Initialize total to 0" },
    },
    // --- 반복 1: i=1 ---
    {
      line: 2, phase: "condition",
      variables: [
        { name: "total", value: 0, type: "int" },
        { name: "i", value: 1, type: "int", changed: true },
      ],
      condition: { expression: "i in range(1, 4)", substituted: "1 → [1, 2, 3] 중 첫 번째", result: true },
      explanation: { ko: "반복 시작! i에 1을 넣고 루프 진입", en: "Loop starts! Set i = 1 and enter loop" },
      arrow: "enter-loop",
    },
    {
      line: 3, phase: "assign",
      variables: [
        { name: "total", value: 1, type: "int", changed: true },
        { name: "i", value: 1, type: "int" },
      ],
      explanation: { ko: "total = 0 + 1 = 1. total이 1로 바뀝니다!", en: "total = 0 + 1 = 1. total becomes 1!" },
    },
    {
      line: 4, phase: "output",
      variables: [
        { name: "total", value: 1, type: "int" },
        { name: "i", value: 1, type: "int" },
      ],
      output: "i=1, total=1",
      explanation: { ko: "현재 i와 total 값을 출력합니다", en: "Print current i and total values" },
    },
    // --- 반복 2: i=2 ---
    {
      line: 2, phase: "condition",
      variables: [
        { name: "total", value: 1, type: "int" },
        { name: "i", value: 2, type: "int", changed: true },
      ],
      condition: { expression: "i in range(1, 4)", substituted: "2 → [1, 2, 3] 중 두 번째", result: true },
      explanation: { ko: "다시 위로! i에 2를 넣고 루프 계속", en: "Back to top! Set i = 2 and continue loop" },
      arrow: "enter-loop",
    },
    {
      line: 3, phase: "assign",
      variables: [
        { name: "total", value: 3, type: "int", changed: true },
        { name: "i", value: 2, type: "int" },
      ],
      explanation: { ko: "total = 1 + 2 = 3. total이 3으로 바뀝니다!", en: "total = 1 + 2 = 3. total becomes 3!" },
    },
    {
      line: 4, phase: "output",
      variables: [
        { name: "total", value: 3, type: "int" },
        { name: "i", value: 2, type: "int" },
      ],
      output: "i=2, total=3",
      explanation: { ko: "현재 i와 total 값을 출력합니다", en: "Print current i and total values" },
    },
    // --- 반복 3: i=3 ---
    {
      line: 2, phase: "condition",
      variables: [
        { name: "total", value: 3, type: "int" },
        { name: "i", value: 3, type: "int", changed: true },
      ],
      condition: { expression: "i in range(1, 4)", substituted: "3 → [1, 2, 3] 중 세 번째", result: true },
      explanation: { ko: "다시 위로! i에 3을 넣고 루프 계속", en: "Back to top! Set i = 3 and continue loop" },
      arrow: "enter-loop",
    },
    {
      line: 3, phase: "assign",
      variables: [
        { name: "total", value: 6, type: "int", changed: true },
        { name: "i", value: 3, type: "int" },
      ],
      explanation: { ko: "total = 3 + 3 = 6. total이 6으로 바뀝니다!", en: "total = 3 + 3 = 6. total becomes 6!" },
    },
    {
      line: 4, phase: "output",
      variables: [
        { name: "total", value: 6, type: "int" },
        { name: "i", value: 3, type: "int" },
      ],
      output: "i=3, total=6",
      explanation: { ko: "현재 i와 total 값을 출력합니다", en: "Print current i and total values" },
    },
    // --- 반복 종료 ---
    {
      line: 2, phase: "condition",
      variables: [
        { name: "total", value: 6, type: "int" },
        { name: "i", value: 3, type: "int" },
      ],
      condition: { expression: "range(1, 4) 끝", substituted: "더 이상 값 없음", result: false },
      explanation: { ko: "range(1, 4)의 모든 값을 다 썼어요. 반복 종료!", en: "All values in range(1, 4) used. Loop ends!" },
      arrow: "exit-loop",
    },
    {
      line: 5, phase: "output",
      variables: [
        { name: "total", value: 6, type: "int" },
        { name: "i", value: 3, type: "int" },
      ],
      output: "합계: 6",
      explanation: { ko: "반복이 끝나고 최종 합계 6을 출력합니다. 1+2+3 = 6!", en: "Loop ended, print final sum 6. 1+2+3 = 6!" },
    },
  ],
}

// ============================================================
// Python: while 반복문 (카운트다운)
// ============================================================
export const PY_WHILE_COUNTDOWN: CodeTracePreset = {
  title: { ko: "while 반복문: 카운트다운", en: "while Loop: Countdown" },
  description: { ko: "조건이 거짓이 될 때까지 반복하는 과정을 추적해요", en: "Trace the loop until the condition becomes False" },
  language: "python",
  code: [
    "count = 3",
    "while count > 0:",
    '    print(f"🚀 {count}!")',
    "    count = count - 1",
    'print("발사! 🎆")',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "count", value: 3, type: "int", changed: true }],
      explanation: { ko: "count를 3으로 시작합니다", en: "Start count at 3" },
    },
    // --- 반복 1 ---
    {
      line: 2, phase: "condition",
      variables: [{ name: "count", value: 3, type: "int" }],
      condition: { expression: "count > 0", substituted: "3 > 0", result: true },
      explanation: { ko: "count(3)가 0보다 큰가? 참! 루프 진입", en: "Is count(3) > 0? True! Enter loop" },
      arrow: "enter-loop",
    },
    {
      line: 3, phase: "output",
      variables: [{ name: "count", value: 3, type: "int" }],
      output: "🚀 3!",
      explanation: { ko: "count 값(3)을 출력합니다", en: "Print count value (3)" },
    },
    {
      line: 4, phase: "assign",
      variables: [{ name: "count", value: 2, type: "int", changed: true }],
      explanation: { ko: "count = 3 - 1 = 2. count가 줄었어요!", en: "count = 3 - 1 = 2. count decreased!" },
    },
    // --- 반복 2 ---
    {
      line: 2, phase: "condition",
      variables: [{ name: "count", value: 2, type: "int" }],
      condition: { expression: "count > 0", substituted: "2 > 0", result: true },
      explanation: { ko: "다시 조건 확인! count(2)가 0보다 큰가? 참! 계속", en: "Check again! Is count(2) > 0? True! Continue" },
      arrow: "enter-loop",
    },
    {
      line: 3, phase: "output",
      variables: [{ name: "count", value: 2, type: "int" }],
      output: "🚀 2!",
      explanation: { ko: "count 값(2)을 출력합니다", en: "Print count value (2)" },
    },
    {
      line: 4, phase: "assign",
      variables: [{ name: "count", value: 1, type: "int", changed: true }],
      explanation: { ko: "count = 2 - 1 = 1", en: "count = 2 - 1 = 1" },
    },
    // --- 반복 3 ---
    {
      line: 2, phase: "condition",
      variables: [{ name: "count", value: 1, type: "int" }],
      condition: { expression: "count > 0", substituted: "1 > 0", result: true },
      explanation: { ko: "count(1)가 0보다 큰가? 아직 참! 한 번 더", en: "Is count(1) > 0? Still True! One more" },
      arrow: "enter-loop",
    },
    {
      line: 3, phase: "output",
      variables: [{ name: "count", value: 1, type: "int" }],
      output: "🚀 1!",
      explanation: { ko: "count 값(1)을 출력합니다", en: "Print count value (1)" },
    },
    {
      line: 4, phase: "assign",
      variables: [{ name: "count", value: 0, type: "int", changed: true }],
      explanation: { ko: "count = 1 - 1 = 0. 드디어 0이 되었어요!", en: "count = 1 - 1 = 0. Finally reached 0!" },
    },
    // --- 종료 ---
    {
      line: 2, phase: "condition",
      variables: [{ name: "count", value: 0, type: "int" }],
      condition: { expression: "count > 0", substituted: "0 > 0", result: false },
      explanation: { ko: "count(0)가 0보다 큰가? 거짓! 반복 종료!", en: "Is count(0) > 0? False! Loop ends!" },
      arrow: "exit-loop",
    },
    {
      line: 5, phase: "output",
      variables: [{ name: "count", value: 0, type: "int" }],
      output: "발사! 🎆",
      explanation: { ko: "while 반복이 끝나고 '발사!'를 출력합니다", en: "While loop ended, print 'Launch!'" },
    },
  ],
}

// ============================================================
// Python: for + if 조합 (짝수 필터)
// ============================================================
export const PY_FOR_IF_FILTER: CodeTracePreset = {
  title: { ko: "for + if: 짝수만 출력", en: "for + if: Print Even Numbers" },
  description: { ko: "반복 안에서 조건으로 걸러내는 과정을 추적해요", en: "Trace filtering with conditions inside a loop" },
  language: "python",
  code: [
    "for num in range(1, 6):",
    "    if num % 2 == 0:",
    '        print(f"{num}은 짝수!")',
    "    else:",
    '        print(f"{num}은 홀수")',
  ],
  steps: [
    // num=1
    {
      line: 1, phase: "condition",
      variables: [{ name: "num", value: 1, type: "int", changed: true }],
      condition: { expression: "num in range(1, 6)", substituted: "1 → [1,2,3,4,5] 첫 번째", result: true },
      explanation: { ko: "반복 시작! num = 1", en: "Loop starts! num = 1" },
      arrow: "enter-loop",
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "num", value: 1, type: "int" }],
      condition: { expression: "num % 2 == 0", substituted: "1 % 2 = 1 ≠ 0", result: false },
      explanation: { ko: "1을 2로 나눈 나머지는 1. 0이 아니니까 짝수 아님!", en: "1 mod 2 = 1. Not 0, so not even!" },
      arrow: "enter-else",
    },
    {
      line: 5, phase: "output",
      variables: [{ name: "num", value: 1, type: "int" }],
      output: "1은 홀수",
      explanation: { ko: "else 블록 실행: '1은 홀수' 출력", en: "Execute else block: print '1 is odd'" },
    },
    // num=2
    {
      line: 1, phase: "condition",
      variables: [{ name: "num", value: 2, type: "int", changed: true }],
      condition: { expression: "num in range(1, 6)", substituted: "2 → [1,2,3,4,5] 두 번째", result: true },
      explanation: { ko: "다음 반복! num = 2", en: "Next iteration! num = 2" },
      arrow: "enter-loop",
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "num", value: 2, type: "int" }],
      condition: { expression: "num % 2 == 0", substituted: "2 % 2 = 0 == 0", result: true },
      explanation: { ko: "2를 2로 나눈 나머지는 0! 짝수!", en: "2 mod 2 = 0! Even number!" },
      arrow: "enter-if",
    },
    {
      line: 3, phase: "output",
      variables: [{ name: "num", value: 2, type: "int" }],
      output: "2은 짝수!",
      explanation: { ko: "if 조건이 참! '2은 짝수!' 출력", en: "if condition True! Print '2 is even!'" },
    },
    // num=3
    {
      line: 1, phase: "condition",
      variables: [{ name: "num", value: 3, type: "int", changed: true }],
      condition: { expression: "num in range(1, 6)", substituted: "3 → [1,2,3,4,5] 세 번째", result: true },
      explanation: { ko: "다음 반복! num = 3", en: "Next iteration! num = 3" },
      arrow: "enter-loop",
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "num", value: 3, type: "int" }],
      condition: { expression: "num % 2 == 0", substituted: "3 % 2 = 1 ≠ 0", result: false },
      explanation: { ko: "3 나누기 2의 나머지는 1. 홀수!", en: "3 mod 2 = 1. Odd!" },
      arrow: "enter-else",
    },
    {
      line: 5, phase: "output",
      variables: [{ name: "num", value: 3, type: "int" }],
      output: "3은 홀수",
      explanation: { ko: "else 블록: '3은 홀수' 출력", en: "else block: print '3 is odd'" },
    },
    // num=4
    {
      line: 1, phase: "condition",
      variables: [{ name: "num", value: 4, type: "int", changed: true }],
      condition: { expression: "num in range(1, 6)", substituted: "4 → [1,2,3,4,5] 네 번째", result: true },
      explanation: { ko: "다음 반복! num = 4", en: "Next iteration! num = 4" },
      arrow: "enter-loop",
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "num", value: 4, type: "int" }],
      condition: { expression: "num % 2 == 0", substituted: "4 % 2 = 0 == 0", result: true },
      explanation: { ko: "4 나누기 2의 나머지는 0! 짝수!", en: "4 mod 2 = 0! Even!" },
      arrow: "enter-if",
    },
    {
      line: 3, phase: "output",
      variables: [{ name: "num", value: 4, type: "int" }],
      output: "4은 짝수!",
      explanation: { ko: "if 조건이 참! '4은 짝수!' 출력", en: "if True! Print '4 is even!'" },
    },
    // num=5
    {
      line: 1, phase: "condition",
      variables: [{ name: "num", value: 5, type: "int", changed: true }],
      condition: { expression: "num in range(1, 6)", substituted: "5 → [1,2,3,4,5] 다섯 번째", result: true },
      explanation: { ko: "마지막 반복! num = 5", en: "Last iteration! num = 5" },
      arrow: "enter-loop",
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "num", value: 5, type: "int" }],
      condition: { expression: "num % 2 == 0", substituted: "5 % 2 = 1 ≠ 0", result: false },
      explanation: { ko: "5 나누기 2의 나머지는 1. 홀수!", en: "5 mod 2 = 1. Odd!" },
      arrow: "enter-else",
    },
    {
      line: 5, phase: "output",
      variables: [{ name: "num", value: 5, type: "int" }],
      output: "5은 홀수",
      explanation: { ko: "else 블록: '5은 홀수' 출력", en: "else block: print '5 is odd'" },
    },
    // 종료
    {
      line: 1, phase: "condition",
      variables: [{ name: "num", value: 5, type: "int" }],
      condition: { expression: "range(1, 6) 끝", substituted: "더 이상 값 없음", result: false },
      explanation: { ko: "range의 모든 값을 다 사용했어요. 반복 종료!", en: "All values used. Loop ends!" },
      arrow: "exit-loop",
    },
  ],
}

// ============================================================
// C++: if/else
// ============================================================
export const CPP_IF_ELSE_BASIC: CodeTracePreset = {
  title: { ko: "C++ if/else 실행 흐름", en: "C++ if/else Execution Flow" },
  description: { ko: "C++에서 조건문이 어떻게 실행되는지 따라가 보세요", en: "Follow how conditionals execute in C++" },
  language: "cpp",
  code: [
    "int temp = 35;",
    "if (temp >= 30) {",
    '    cout << "더워요! 🥵" << endl;',
    "    if (temp >= 40) {",
    '        cout << "폭염 경보!" << endl;',
    "    } else {",
    '        cout << "선풍기 틀자" << endl;',
    "    }",
    "} else {",
    '    cout << "시원해요 😊" << endl;',
    "}",
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "temp", value: 35, type: "int", changed: true }],
      explanation: { ko: "temp 변수에 35를 저장합니다", en: "Store 35 in variable temp" },
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "temp", value: 35, type: "int" }],
      condition: { expression: "temp >= 30", substituted: "35 >= 30", result: true },
      explanation: { ko: "temp(35)가 30 이상인가? 참! 중괄호 안으로 들어갑니다", en: "Is temp(35) >= 30? True! Enter the braces" },
      arrow: "enter-if",
    },
    {
      line: 3, phase: "output",
      variables: [{ name: "temp", value: 35, type: "int" }],
      output: "더워요! 🥵",
      explanation: { ko: "조건이 참이니까 이 줄 실행! '더워요!' 출력", en: "Condition is True, execute this line!" },
    },
    {
      line: 4, phase: "condition",
      variables: [{ name: "temp", value: 35, type: "int" }],
      condition: { expression: "temp >= 40", substituted: "35 >= 40", result: false },
      explanation: { ko: "안쪽 if: temp(35)가 40 이상인가? 35는 40보다 작으니까 거짓!", en: "Inner if: is temp(35) >= 40? 35 < 40, so False!" },
      arrow: "enter-else",
    },
    {
      line: 7, phase: "output",
      variables: [{ name: "temp", value: 35, type: "int" }],
      output: "선풍기 틀자",
      explanation: { ko: "안쪽 else로 와서 '선풍기 틀자' 출력", en: "Jump to inner else, print 'Turn on fan'" },
    },
  ],
}

// ============================================================
// C++: for 반복문
// ============================================================
export const CPP_FOR_BASIC: CodeTracePreset = {
  title: { ko: "C++ for 반복문 실행 흐름", en: "C++ for Loop Execution Flow" },
  description: { ko: "for(초기화; 조건; 증감)이 어떤 순서로 실행되는지 추적해요", en: "Trace the order of init; condition; increment in for loops" },
  language: "cpp",
  code: [
    "int sum = 0;",
    "for (int i = 1; i <= 3; i++) {",
    "    sum = sum + i;",
    '    cout << "i=" << i << " sum=" << sum << endl;',
    "}",
    'cout << "결과: " << sum << endl;',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "sum", value: 0, type: "int", changed: true }],
      explanation: { ko: "sum을 0으로 초기화합니다", en: "Initialize sum to 0" },
    },
    // ① 초기화 (딱 한 번만!) — "int i = 1" 강조 [5,13]
    {
      line: 2, phase: "assign",
      highlightRange: [5, 13],
      variables: [
        { name: "sum", value: 0, type: "int" },
        { name: "i", value: 1, type: "int", changed: true },
      ],
      explanation: { ko: "① 초기화: int i = 1 (딱 한 번만 실행! 다시는 안 옴)", en: "① Init: int i = 1 (runs only once! never again)" },
    },
    // ② 조건 확인 — "i <= 3" 강조 [16,21]
    {
      line: 2, phase: "condition",
      highlightRange: [16, 21],
      variables: [
        { name: "sum", value: 0, type: "int" },
        { name: "i", value: 1, type: "int" },
      ],
      condition: { expression: "i <= 3", substituted: "1 <= 3", result: true },
      explanation: { ko: "② 조건 확인: 1 ≤ 3? 참! → 본문 실행으로", en: "② Check: 1 ≤ 3? True! → execute body" },
      arrow: "enter-loop",
    },
    // ③ 본문 실행
    {
      line: 3, phase: "assign",
      variables: [
        { name: "sum", value: 1, type: "int", changed: true },
        { name: "i", value: 1, type: "int" },
      ],
      explanation: { ko: "③ 본문 실행: sum = 0 + 1 = 1", en: "③ Body: sum = 0 + 1 = 1" },
    },
    {
      line: 4, phase: "output",
      variables: [
        { name: "sum", value: 1, type: "int" },
        { name: "i", value: 1, type: "int" },
      ],
      output: "i=1 sum=1",
      explanation: { ko: "③ 본문 실행: 현재 값 출력", en: "③ Body: print current values" },
    },
    // ④ 증감 — "i++" 강조 [24,26]
    {
      line: 2, phase: "assign",
      highlightRange: [24, 26],
      variables: [
        { name: "sum", value: 1, type: "int" },
        { name: "i", value: 2, type: "int", changed: true },
      ],
      explanation: { ko: "④ 증감: i++ → i가 2로! 다시 ②번(조건)으로", en: "④ Increment: i++ → 2! Back to ② (condition)" },
    },
    // ② 조건 확인 — "i <= 3" 강조
    {
      line: 2, phase: "condition",
      highlightRange: [16, 21],
      variables: [
        { name: "sum", value: 1, type: "int" },
        { name: "i", value: 2, type: "int" },
      ],
      condition: { expression: "i <= 3", substituted: "2 <= 3", result: true },
      explanation: { ko: "② 조건 확인: 2 ≤ 3? 참! → 본문 실행", en: "② Check: 2 ≤ 3? True! → execute body" },
      arrow: "enter-loop",
    },
    {
      line: 3, phase: "assign",
      variables: [
        { name: "sum", value: 3, type: "int", changed: true },
        { name: "i", value: 2, type: "int" },
      ],
      explanation: { ko: "③ 본문 실행: sum = 1 + 2 = 3", en: "③ Body: sum = 1 + 2 = 3" },
    },
    {
      line: 4, phase: "output",
      variables: [
        { name: "sum", value: 3, type: "int" },
        { name: "i", value: 2, type: "int" },
      ],
      output: "i=2 sum=3",
      explanation: { ko: "③ 본문 실행: 현재 값 출력", en: "③ Body: print current values" },
    },
    // ④ 증감 — "i++" 강조
    {
      line: 2, phase: "assign",
      highlightRange: [24, 26],
      variables: [
        { name: "sum", value: 3, type: "int" },
        { name: "i", value: 3, type: "int", changed: true },
      ],
      explanation: { ko: "④ 증감: i++ → i가 3으로! 다시 ②번으로", en: "④ Increment: i++ → 3! Back to ②" },
    },
    // ② 조건 확인
    {
      line: 2, phase: "condition",
      highlightRange: [16, 21],
      variables: [
        { name: "sum", value: 3, type: "int" },
        { name: "i", value: 3, type: "int" },
      ],
      condition: { expression: "i <= 3", substituted: "3 <= 3", result: true },
      explanation: { ko: "② 조건 확인: 3 ≤ 3? 참! 마지막 반복 → 본문 실행", en: "② Check: 3 ≤ 3? True! Last iteration → body" },
      arrow: "enter-loop",
    },
    {
      line: 3, phase: "assign",
      variables: [
        { name: "sum", value: 6, type: "int", changed: true },
        { name: "i", value: 3, type: "int" },
      ],
      explanation: { ko: "③ 본문 실행: sum = 3 + 3 = 6", en: "③ Body: sum = 3 + 3 = 6" },
    },
    {
      line: 4, phase: "output",
      variables: [
        { name: "sum", value: 6, type: "int" },
        { name: "i", value: 3, type: "int" },
      ],
      output: "i=3 sum=6",
      explanation: { ko: "③ 본문 실행: 현재 값 출력", en: "③ Body: print current values" },
    },
    // ④ 증감 — "i++" 강조
    {
      line: 2, phase: "assign",
      highlightRange: [24, 26],
      variables: [
        { name: "sum", value: 6, type: "int" },
        { name: "i", value: 4, type: "int", changed: true },
      ],
      explanation: { ko: "④ 증감: i++ → i가 4로! 다시 ②번으로", en: "④ Increment: i++ → 4! Back to ②" },
    },
    // ② 조건 확인 → 거짓!
    {
      line: 2, phase: "condition",
      highlightRange: [16, 21],
      variables: [
        { name: "sum", value: 6, type: "int" },
        { name: "i", value: 4, type: "int" },
      ],
      condition: { expression: "i <= 3", substituted: "4 <= 3", result: false },
      explanation: { ko: "② 조건 확인: 4 ≤ 3? 거짓! 본문 건너뛰고 반복 종료!", en: "② Check: 4 ≤ 3? False! Skip body, loop ends!" },
      arrow: "exit-loop",
    },
    {
      line: 6, phase: "output",
      variables: [
        { name: "sum", value: 6, type: "int" },
        { name: "i", value: 4, type: "int" },
      ],
      output: "결과: 6",
      explanation: { ko: "for 루프 끝! 다음 코드로 진행. 최종 결과: 1+2+3 = 6", en: "Loop done! Move to next code. Final result: 1+2+3 = 6" },
    },
  ],
}

// ============================================================
// C++: for 루프로 배열 순회
// ============================================================
export const CPP_ARRAY_LOOP: CodeTracePreset = {
  title: { ko: "for 루프로 배열 순회", en: "Array Traversal with for Loop" },
  description: { ko: "배열의 모든 원소를 하나씩 방문하며 합계를 구해요", en: "Visit each array element and calculate the sum" },
  language: "cpp",
  code: [
    "int arr[3] = {10, 20, 30};",
    "int sum = 0;",
    "for (int i = 0; i < 3; i++) {",
    "    sum += arr[i];",
    "}",
    'cout << "합계: " << sum;',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [
        { name: "arr[0]", value: 10, type: "int", changed: true },
        { name: "arr[1]", value: 20, type: "int", changed: true },
        { name: "arr[2]", value: 30, type: "int", changed: true },
      ],
      explanation: { ko: "배열 선언! arr[0]=10, arr[1]=20, arr[2]=30", en: "Array declared! arr[0]=10, arr[1]=20, arr[2]=30" },
    },
    {
      line: 2, phase: "assign",
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 0, type: "int", changed: true },
      ],
      explanation: { ko: "합계를 저장할 sum = 0", en: "sum = 0 to store total" },
    },
    // ① 초기화 — "int i = 0" [5,13]
    {
      line: 3, phase: "assign",
      highlightRange: [5, 13],
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 0, type: "int" },
        { name: "i", value: 0, type: "int", changed: true },
      ],
      explanation: { ko: "① 초기화: i = 0 (첫 번째 칸부터!)", en: "① Init: i = 0 (start from first slot!)" },
    },
    // ② 조건 확인 — "i < 3" [16,20]
    {
      line: 3, phase: "condition",
      highlightRange: [16, 20],
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 0, type: "int" },
        { name: "i", value: 0, type: "int" },
      ],
      condition: { expression: "i < 3", substituted: "0 < 3", result: true },
      explanation: { ko: "② 조건: 0 < 3? 참! → arr[0] 접근", en: "② Check: 0 < 3? True! → access arr[0]" },
      arrow: "enter-loop",
    },
    // ③ 본문: sum += arr[0]
    {
      line: 4, phase: "assign",
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 10, type: "int", changed: true },
        { name: "i", value: 0, type: "int" },
      ],
      explanation: { ko: "③ sum += arr[0] → 0 + 10 = 10", en: "③ sum += arr[0] → 0 + 10 = 10" },
    },
    // ④ 증감 — "i++" [23,25]
    {
      line: 3, phase: "assign",
      highlightRange: [23, 25],
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 10, type: "int" },
        { name: "i", value: 1, type: "int", changed: true },
      ],
      explanation: { ko: "④ i++ → 1로! 다음 칸(arr[1])으로", en: "④ i++ → 1! Next slot (arr[1])" },
    },
    // ② i=1
    {
      line: 3, phase: "condition",
      highlightRange: [16, 20],
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 10, type: "int" },
        { name: "i", value: 1, type: "int" },
      ],
      condition: { expression: "i < 3", substituted: "1 < 3", result: true },
      explanation: { ko: "② 조건: 1 < 3? 참! → arr[1] 접근", en: "② Check: 1 < 3? True! → access arr[1]" },
      arrow: "enter-loop",
    },
    // ③ sum += arr[1]
    {
      line: 4, phase: "assign",
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 30, type: "int", changed: true },
        { name: "i", value: 1, type: "int" },
      ],
      explanation: { ko: "③ sum += arr[1] → 10 + 20 = 30", en: "③ sum += arr[1] → 10 + 20 = 30" },
    },
    // ④ i++
    {
      line: 3, phase: "assign",
      highlightRange: [23, 25],
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 30, type: "int" },
        { name: "i", value: 2, type: "int", changed: true },
      ],
      explanation: { ko: "④ i++ → 2로! 마지막 칸(arr[2])으로", en: "④ i++ → 2! Last slot (arr[2])" },
    },
    // ② i=2
    {
      line: 3, phase: "condition",
      highlightRange: [16, 20],
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 30, type: "int" },
        { name: "i", value: 2, type: "int" },
      ],
      condition: { expression: "i < 3", substituted: "2 < 3", result: true },
      explanation: { ko: "② 조건: 2 < 3? 참! → arr[2] 접근", en: "② Check: 2 < 3? True! → access arr[2]" },
      arrow: "enter-loop",
    },
    // ③ sum += arr[2]
    {
      line: 4, phase: "assign",
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 60, type: "int", changed: true },
        { name: "i", value: 2, type: "int" },
      ],
      explanation: { ko: "③ sum += arr[2] → 30 + 30 = 60", en: "③ sum += arr[2] → 30 + 30 = 60" },
    },
    // ④ i++ → 3
    {
      line: 3, phase: "assign",
      highlightRange: [23, 25],
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 60, type: "int" },
        { name: "i", value: 3, type: "int", changed: true },
      ],
      explanation: { ko: "④ i++ → 3! 더 볼 칸이 있을까?", en: "④ i++ → 3! Any more slots?" },
    },
    // ② i=3 → false
    {
      line: 3, phase: "condition",
      highlightRange: [16, 20],
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 60, type: "int" },
        { name: "i", value: 3, type: "int" },
      ],
      condition: { expression: "i < 3", substituted: "3 < 3", result: false },
      explanation: { ko: "② 조건: 3 < 3? 거짓! 배열 끝! 반복 종료", en: "② Check: 3 < 3? False! End of array! Loop done" },
      arrow: "exit-loop",
    },
    // 결과 출력
    {
      line: 6, phase: "output",
      variables: [
        { name: "arr[0]", value: 10, type: "int" },
        { name: "arr[1]", value: 20, type: "int" },
        { name: "arr[2]", value: 30, type: "int" },
        { name: "sum", value: 60, type: "int" },
        { name: "i", value: 3, type: "int" },
      ],
      output: "합계: 60",
      explanation: { ko: "10 + 20 + 30 = 60! 배열의 모든 원소를 더했어요!", en: "10 + 20 + 30 = 60! Added all array elements!" },
    },
  ],
}

// ============================================================
// C++: while 반복문
// ============================================================
export const CPP_WHILE_BASIC: CodeTracePreset = {
  title: { ko: "C++ while 반복문 실행 흐름", en: "C++ while Loop Execution Flow" },
  description: { ko: "while 조건이 참인 동안 반복하는 과정을 추적해요", en: "Trace while loop repeating as long as condition is true" },
  language: "cpp",
  code: [
    "int n = 1;",
    "int result = 1;",
    "while (n <= 4) {",
    "    result = result * n;",
    '    cout << n << "! = " << result << endl;',
    "    n++;",
    "}",
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "n", value: 1, type: "int", changed: true }],
      explanation: { ko: "n을 1로 초기화", en: "Initialize n to 1" },
    },
    {
      line: 2, phase: "assign",
      variables: [
        { name: "n", value: 1, type: "int" },
        { name: "result", value: 1, type: "int", changed: true },
      ],
      explanation: { ko: "result를 1로 초기화 (팩토리얼 계산 준비)", en: "Initialize result to 1 (prepare for factorial)" },
    },
    // 반복 1: n=1
    {
      line: 3, phase: "condition",
      variables: [
        { name: "n", value: 1, type: "int" },
        { name: "result", value: 1, type: "int" },
      ],
      condition: { expression: "n <= 4", substituted: "1 <= 4", result: true },
      explanation: { ko: "n(1)이 4 이하? 참! 루프 진입", en: "n(1) <= 4? True! Enter loop" },
      arrow: "enter-loop",
    },
    {
      line: 4, phase: "assign",
      variables: [
        { name: "n", value: 1, type: "int" },
        { name: "result", value: 1, type: "int" },
      ],
      explanation: { ko: "result = 1 × 1 = 1", en: "result = 1 × 1 = 1" },
    },
    {
      line: 5, phase: "output",
      variables: [
        { name: "n", value: 1, type: "int" },
        { name: "result", value: 1, type: "int" },
      ],
      output: "1! = 1",
      explanation: { ko: "1! = 1 출력", en: "Print 1! = 1" },
    },
    {
      line: 6, phase: "assign",
      variables: [
        { name: "n", value: 2, type: "int", changed: true },
        { name: "result", value: 1, type: "int" },
      ],
      explanation: { ko: "n++ → n이 1에서 2로", en: "n++ → n from 1 to 2" },
    },
    // 반복 2: n=2
    {
      line: 3, phase: "condition",
      variables: [
        { name: "n", value: 2, type: "int" },
        { name: "result", value: 1, type: "int" },
      ],
      condition: { expression: "n <= 4", substituted: "2 <= 4", result: true },
      explanation: { ko: "n(2)이 4 이하? 참! 계속", en: "n(2) <= 4? True! Continue" },
      arrow: "enter-loop",
    },
    {
      line: 4, phase: "assign",
      variables: [
        { name: "n", value: 2, type: "int" },
        { name: "result", value: 2, type: "int", changed: true },
      ],
      explanation: { ko: "result = 1 × 2 = 2", en: "result = 1 × 2 = 2" },
    },
    {
      line: 5, phase: "output",
      variables: [
        { name: "n", value: 2, type: "int" },
        { name: "result", value: 2, type: "int" },
      ],
      output: "2! = 2",
      explanation: { ko: "2! = 2 출력", en: "Print 2! = 2" },
    },
    {
      line: 6, phase: "assign",
      variables: [
        { name: "n", value: 3, type: "int", changed: true },
        { name: "result", value: 2, type: "int" },
      ],
      explanation: { ko: "n++ → n이 2에서 3으로", en: "n++ → n from 2 to 3" },
    },
    // 반복 3: n=3
    {
      line: 3, phase: "condition",
      variables: [
        { name: "n", value: 3, type: "int" },
        { name: "result", value: 2, type: "int" },
      ],
      condition: { expression: "n <= 4", substituted: "3 <= 4", result: true },
      explanation: { ko: "n(3)이 4 이하? 참!", en: "n(3) <= 4? True!" },
      arrow: "enter-loop",
    },
    {
      line: 4, phase: "assign",
      variables: [
        { name: "n", value: 3, type: "int" },
        { name: "result", value: 6, type: "int", changed: true },
      ],
      explanation: { ko: "result = 2 × 3 = 6", en: "result = 2 × 3 = 6" },
    },
    {
      line: 5, phase: "output",
      variables: [
        { name: "n", value: 3, type: "int" },
        { name: "result", value: 6, type: "int" },
      ],
      output: "3! = 6",
      explanation: { ko: "3! = 6 출력", en: "Print 3! = 6" },
    },
    {
      line: 6, phase: "assign",
      variables: [
        { name: "n", value: 4, type: "int", changed: true },
        { name: "result", value: 6, type: "int" },
      ],
      explanation: { ko: "n++ → n이 3에서 4로", en: "n++ → n from 3 to 4" },
    },
    // 반복 4: n=4
    {
      line: 3, phase: "condition",
      variables: [
        { name: "n", value: 4, type: "int" },
        { name: "result", value: 6, type: "int" },
      ],
      condition: { expression: "n <= 4", substituted: "4 <= 4", result: true },
      explanation: { ko: "n(4)이 4 이하? 4 <= 4는 참! (같아도 이하니까!)", en: "n(4) <= 4? True! (equal counts as <=)" },
      arrow: "enter-loop",
    },
    {
      line: 4, phase: "assign",
      variables: [
        { name: "n", value: 4, type: "int" },
        { name: "result", value: 24, type: "int", changed: true },
      ],
      explanation: { ko: "result = 6 × 4 = 24", en: "result = 6 × 4 = 24" },
    },
    {
      line: 5, phase: "output",
      variables: [
        { name: "n", value: 4, type: "int" },
        { name: "result", value: 24, type: "int" },
      ],
      output: "4! = 24",
      explanation: { ko: "4! = 24 출력", en: "Print 4! = 24" },
    },
    {
      line: 6, phase: "assign",
      variables: [
        { name: "n", value: 5, type: "int", changed: true },
        { name: "result", value: 24, type: "int" },
      ],
      explanation: { ko: "n++ → n이 4에서 5로", en: "n++ → n from 4 to 5" },
    },
    // 종료
    {
      line: 3, phase: "condition",
      variables: [
        { name: "n", value: 5, type: "int" },
        { name: "result", value: 24, type: "int" },
      ],
      condition: { expression: "n <= 4", substituted: "5 <= 4", result: false },
      explanation: { ko: "n(5)이 4 이하? 거짓! 반복 종료! 4! = 24 계산 완료", en: "n(5) <= 4? False! Loop ends! 4! = 24 calculated" },
      arrow: "exit-loop",
    },
  ],
}

// ============================================================
// C++: 중괄호 함정 (없을 때) — score=80
// ============================================================
export const CPP_BRACE_TRAP_NO: CodeTracePreset = {
  title: { ko: "❌ 중괄호 없을 때 — 함정!", en: "❌ Without Braces — Trap!" },
  description: { ko: "중괄호가 없으면 if에 속하는 건 딱 한 줄뿐! score=80일 때 무슨 일이 벌어지는지 봐요", en: "Without braces, only ONE line belongs to if! See what happens when score=80" },
  language: "cpp",
  code: [
    "int score = 80;",
    "if (score >= 90)",
    '    cout << "A등급!";',
    '    cout << "축하!";',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "score", value: 80, type: "int", changed: true }],
      explanation: { ko: "score에 80을 저장합니다", en: "Store 80 in score" },
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "score", value: 80, type: "int" }],
      condition: { expression: "score >= 90", substituted: "80 >= 90", result: false },
      explanation: { ko: "score(80)가 90 이상인가? 거짓! → 3번 줄(다음 한 줄)을 건너뜁니다", en: "score(80) >= 90? False! → Skip line 3 (the next ONE line)" },
      arrow: "skip",
    },
    {
      line: 4, phase: "output",
      variables: [{ name: "score", value: 80, type: "int" }],
      output: "축하!",
      explanation: { ko: "😱 3번 줄은 건너뛰었는데 4번 줄은 실행돼요! 중괄호가 없으면 if는 딱 한 줄만 제어하니까, 이 줄은 항상 실행!", en: "😱 Line 3 was skipped, but line 4 RUNS! Without braces, if only controls ONE line — this line always executes!" },
    },
  ],
}

// ============================================================
// C++: 중괄호 있을 때 — 안전! — score=80
// ============================================================
export const CPP_BRACE_TRAP_YES: CodeTracePreset = {
  title: { ko: "✅ 중괄호 있을 때 — 안전!", en: "✅ With Braces — Safe!" },
  description: { ko: "중괄호로 감싸면 if 블록 전체가 조건에 따라 실행/건너뜀! score=80", en: "With braces, the entire if block is controlled! score=80" },
  language: "cpp",
  code: [
    "int score = 80;",
    "if (score >= 90) {",
    '    cout << "A등급!";',
    '    cout << "축하!";',
    "}",
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "score", value: 80, type: "int", changed: true }],
      explanation: { ko: "score에 80을 저장합니다", en: "Store 80 in score" },
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "score", value: 80, type: "int" }],
      condition: { expression: "score >= 90", substituted: "80 >= 90", result: false },
      explanation: { ko: "score(80)가 90 이상인가? 거짓! → 중괄호 {} 안의 3번, 4번 줄을 전부 건너뜁니다. 아무것도 출력 안 돼요! ✅", en: "score(80) >= 90? False! → Skip ALL lines inside braces {} (lines 3 & 4). Nothing is printed! ✅" },
      arrow: "skip",
    },
  ],
}

// ============================================================
// C++: 중괄호 함정 (없을 때) — score=96 (조건 참!)
// ============================================================
export const CPP_BRACE_TRAP_NO_TRUE: CodeTracePreset = {
  title: { ko: "❌ 중괄호 없을 때 (score=96)", en: "❌ Without Braces (score=96)" },
  description: { ko: "score=96이면 조건이 참! 중괄호 없이도 잘 동작할까?", en: "score=96 makes condition True! Does it work without braces?" },
  language: "cpp",
  code: [
    "int score = 96;",
    "if (score >= 90)",
    '    cout << "A등급!";',
    '    cout << "축하!";',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "score", value: 96, type: "int", changed: true }],
      explanation: { ko: "score에 96을 저장합니다", en: "Store 96 in score" },
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "score", value: 96, type: "int" }],
      condition: { expression: "score >= 90", substituted: "96 >= 90", result: true },
      explanation: { ko: "score(96)가 90 이상인가? 참! → 다음 한 줄만 실행합니다", en: "score(96) >= 90? True! → Execute only the next ONE line" },
      arrow: "enter-if",
    },
    {
      line: 3, phase: "output",
      variables: [{ name: "score", value: 96, type: "int" }],
      output: "A등급!",
      explanation: { ko: "✅ if에 속한 한 줄! 'A등급!' 출력", en: "✅ The ONE line that belongs to if! Print 'A등급!'" },
    },
    {
      line: 4, phase: "output",
      variables: [{ name: "score", value: 96, type: "int" }],
      output: "축하!",
      explanation: { ko: "😱 이 줄도 실행! 하지만 이건 if 때문이 아니라 항상 실행되는 코드예요! 참이든 거짓이든 항상 나와요", en: "😱 This also runs! But NOT because of if — it ALWAYS runs regardless of the condition!" },
    },
  ],
}

// ============================================================
// C++: 중괄호 있을 때 — score=96 (조건 참!)
// ============================================================
export const CPP_BRACE_TRAP_YES_TRUE: CodeTracePreset = {
  title: { ko: "✅ 중괄호 있을 때 (score=96)", en: "✅ With Braces (score=96)" },
  description: { ko: "score=96이면 조건이 참! 중괄호 안의 코드가 전부 실행돼요", en: "score=96 makes condition True! All code inside braces runs" },
  language: "cpp",
  code: [
    "int score = 96;",
    "if (score >= 90) {",
    '    cout << "A등급!";',
    '    cout << "축하!";',
    "}",
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "score", value: 96, type: "int", changed: true }],
      explanation: { ko: "score에 96을 저장합니다", en: "Store 96 in score" },
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "score", value: 96, type: "int" }],
      condition: { expression: "score >= 90", substituted: "96 >= 90", result: true },
      explanation: { ko: "score(96)가 90 이상인가? 참! → 중괄호 {} 안의 코드를 전부 실행합니다", en: "score(96) >= 90? True! → Execute everything inside the braces {}" },
      arrow: "enter-if",
    },
    {
      line: 3, phase: "output",
      variables: [{ name: "score", value: 96, type: "int" }],
      output: "A등급!",
      explanation: { ko: "✅ 중괄호 안! 'A등급!' 출력", en: "✅ Inside braces! Print 'A등급!'" },
    },
    {
      line: 4, phase: "output",
      variables: [{ name: "score", value: 96, type: "int" }],
      output: "축하!",
      explanation: { ko: "✅ 이것도 중괄호 안! '축하!' 출력. 중괄호 덕분에 둘 다 if에 속해요!", en: "✅ Also inside braces! Print '축하!'. Both lines belong to if thanks to braces!" },
    },
  ],
}

// ============================================================
// C++: score에 따른 등급 출력 (if/else if/else)
// ============================================================
export const CPP_SCORE_GRADE: CodeTracePreset = {
  title: { ko: "점수별 등급 출력", en: "Grade by Score" },
  description: { ko: "score=85일 때, if → else if → else 중 어디로 가는지 단계별로 봐요", en: "Watch which branch runs when score=85" },
  language: "cpp",
  code: [
    "int score = 85;",
    "if (score >= 90) {",
    '    cout << "A등급!" << endl;',
    "} else if (score >= 80) {",
    '    cout << "B등급!" << endl;',
    "} else if (score >= 70) {",
    '    cout << "C등급!" << endl;',
    "} else {",
    '    cout << "F등급..." << endl;',
    "}",
    'cout << "끝!" << endl;',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "score", value: 85, type: "int", changed: true }],
      explanation: { ko: "score에 85를 저장합니다", en: "Store 85 in score" },
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "score", value: 85, type: "int" }],
      condition: { expression: "score >= 90", substituted: "85 >= 90", result: false },
      explanation: { ko: "첫 번째 조건: score(85)가 90 이상? 거짓! → 건너뛰고 다음 조건으로", en: "First condition: score(85) >= 90? False! → Skip to next condition" },
      arrow: "skip",
    },
    {
      line: 4, phase: "condition",
      variables: [{ name: "score", value: 85, type: "int" }],
      condition: { expression: "score >= 80", substituted: "85 >= 80", result: true },
      explanation: { ko: "두 번째 조건: score(85)가 80 이상? 참! → 이 블록을 실행합니다", en: "Second condition: score(85) >= 80? True! → Execute this block" },
      arrow: "enter-elif",
    },
    {
      line: 5, phase: "output",
      variables: [{ name: "score", value: 85, type: "int" }],
      output: "B등급!",
      explanation: { ko: "else if 조건이 참이니까 'B등급!'을 출력합니다", en: "else if condition is True, print 'B등급!'" },
    },
    {
      line: 11, phase: "output",
      variables: [{ name: "score", value: 85, type: "int" }],
      output: "끝!",
      explanation: { ko: "if-else if-else 블록을 빠져나와 '끝!' 출력. 나머지 조건은 확인도 안 해요!", en: "Exit the if-else block and print '끝!'. Remaining conditions are NOT checked!" },
    },
  ],
}

// ============================================================
// C++: score=95 → A등급 (첫 조건 true!)
// ============================================================
export const CPP_SCORE_GRADE_HIGH: CodeTracePreset = {
  title: { ko: "점수별 등급 (score=95)", en: "Grade by Score (score=95)" },
  description: { ko: "이번엔 score=95! 첫 번째 조건이 바로 참이면 나머지는 어떻게 될까?", en: "Now score=95! What happens when the first condition is True?" },
  language: "cpp",
  code: [
    "int score = 95;",
    "if (score >= 90) {",
    '    cout << "A등급!" << endl;',
    "} else if (score >= 80) {",
    '    cout << "B등급!" << endl;',
    "} else if (score >= 70) {",
    '    cout << "C등급!" << endl;',
    "} else {",
    '    cout << "F등급..." << endl;',
    "}",
    'cout << "끝!" << endl;',
  ],
  steps: [
    {
      line: 1, phase: "assign",
      variables: [{ name: "score", value: 95, type: "int", changed: true }],
      explanation: { ko: "score에 95를 저장합니다", en: "Store 95 in score" },
    },
    {
      line: 2, phase: "condition",
      variables: [{ name: "score", value: 95, type: "int" }],
      condition: { expression: "score >= 90", substituted: "95 >= 90", result: true },
      explanation: { ko: "첫 번째 조건: score(95)가 90 이상? 참! → 바로 이 블록을 실행!", en: "First condition: score(95) >= 90? True! → Execute this block right away!" },
      arrow: "enter-if",
    },
    {
      line: 3, phase: "output",
      variables: [{ name: "score", value: 95, type: "int" }],
      output: "A등급!",
      explanation: { ko: "if 조건이 참이니까 'A등급!'을 출력합니다!", en: "if condition is True, print 'A등급!'!" },
    },
    {
      line: 4, phase: "condition",
      variables: [{ name: "score", value: 95, type: "int" }],
      condition: { expression: "score >= 80", substituted: "확인 안 함!", result: false },
      explanation: { ko: "⏭️ 이미 위에서 참인 블록을 찾았으니까 else if는 확인도 안 해요! 통째로 건너뜀!", en: "⏭️ Already found a True block above, so else if is NOT even checked! Skip entirely!" },
      arrow: "skip",
    },
    {
      line: 11, phase: "output",
      variables: [{ name: "score", value: 95, type: "int" }],
      output: "끝!",
      explanation: { ko: "if-else if-else 블록을 빠져나와 '끝!' 출력. 하나만 참이면 나머지는 전부 무시!", en: "Exit the if-else block. Once one is True, ALL others are ignored!" },
    },
  ],
}

// ============================================================
// 전체 프리셋 모음
// ============================================================
export const CODE_TRACE_PRESETS = {
  // Python
  pyIfElse: PY_IF_ELSE_BASIC,
  pyIfElseLow: PY_IF_ELSE_LOW,
  pyNestedIf: PY_NESTED_IF,
  pyNestedIfFalse: PY_NESTED_IF_FALSE,
  pyForSum: PY_FOR_SUM,
  pyWhileCountdown: PY_WHILE_COUNTDOWN,
  pyForIfFilter: PY_FOR_IF_FILTER,
  // C++
  cppIfElse: CPP_IF_ELSE_BASIC,
  cppForBasic: CPP_FOR_BASIC,
  cppWhileBasic: CPP_WHILE_BASIC,
  cppBraceTrapNo: CPP_BRACE_TRAP_NO,
  cppBraceTrapNoTrue: CPP_BRACE_TRAP_NO_TRUE,
  cppBraceTrapYes: CPP_BRACE_TRAP_YES,
  cppBraceTrapYesTrue: CPP_BRACE_TRAP_YES_TRUE,
  cppScoreGrade: CPP_SCORE_GRADE,
  cppScoreGradeHigh: CPP_SCORE_GRADE_HIGH,
} as const

export type CodeTracePresetKey = keyof typeof CODE_TRACE_PRESETS
