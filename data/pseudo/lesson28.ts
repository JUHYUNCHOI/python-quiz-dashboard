// ============================================
// 수도코드 레슨 28: 연산자 & 시험 필수 표현
// CIE 스타일 수도코드 - 시험에 자주 나오는 패턴 총정리!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson28Data: LessonData = {
  id: "pseudo-28",
  title: "연산자 & 필수 표현",
  emoji: "🧮",
  description: "시험에 자주 나오는 연산자와 표현 총정리!",
  chapters: [
    {
      id: "ch1",
      title: "산술 연산자",
      emoji: "➕",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "➕ 산술 연산자란?",
          content: `수도코드에서 계산할 때 사용하는 **산술 연산자**를 알아봐요!

| 연산자 | 뜻 | 예시 | 결과 |
|---|---|---|---|
| \`+\` | 더하기 | \`3 + 5\` | 8 |
| \`-\` | 빼기 | \`10 - 3\` | 7 |
| \`*\` | 곱하기 | \`4 * 6\` | 24 |
| \`/\` | 나누기 (실수) | \`7 / 2\` | 3.5 |
| \`DIV\` | 나누기 (정수, 몫만) | \`7 DIV 2\` | 3 |
| \`MOD\` | 나머지 | \`7 MOD 2\` | 1 |

💡 **핵심 포인트:**
- \`/\`는 **소수점까지** 나눠요 → \`7 / 2 = 3.5\`
- \`DIV\`는 **몫만** 남겨요 → \`7 DIV 2 = 3\`
- \`MOD\`는 **나머지만** 남겨요 → \`7 MOD 2 = 1\`

⚠️ 시험에서 \`DIV\`와 \`MOD\`는 **정말 자주** 나와요!`
        },
        {
          id: "ch1-divmod",
          type: "explain",
          title: "🔢 DIV와 MOD 완전 정복",
          content: `**DIV**와 **MOD**는 시험에서 가장 많이 물어봐요!

**DIV = 정수 나눗셈 (몫)**
\`\`\`
17 DIV 5 = 3     // 17 ÷ 5 = 3 나머지 2 → 몫은 3
20 DIV 3 = 6     // 20 ÷ 3 = 6 나머지 2 → 몫은 6
10 DIV 10 = 1    // 10 ÷ 10 = 1 나머지 0 → 몫은 1
7 DIV 10 = 0     // 7 ÷ 10 = 0 나머지 7 → 몫은 0
\`\`\`

**MOD = 나머지**
\`\`\`
17 MOD 5 = 2     // 17 ÷ 5 = 3 나머지 2 → 나머지는 2
20 MOD 3 = 2     // 20 ÷ 3 = 6 나머지 2 → 나머지는 2
10 MOD 10 = 0    // 10 ÷ 10 = 1 나머지 0 → 나머지는 0
7 MOD 10 = 7     // 7 ÷ 10 = 0 나머지 7 → 나머지는 7
\`\`\`

💡 **쉽게 기억하기:**
- DIV × 나누는 수 + MOD = 원래 수
- 예: 17 DIV 5 = **3**, 17 MOD 5 = **2** → 3 × 5 + 2 = **17** ✓`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 코드의 출력은?

\`\`\`
DECLARE a : INTEGER
DECLARE b : INTEGER
a ← 23 DIV 5
b ← 23 MOD 5
OUTPUT a
OUTPUT b
\`\`\``,
          options: [
            '4\n3',
            '4.6\n3',
            '5\n3',
            '4\n23'
          ],
          answer: 0,
          explanation: '23 ÷ 5 = 4 나머지 3이에요. `23 DIV 5 = 4` (몫), `23 MOD 5 = 3` (나머지). 검산: 4 × 5 + 3 = 23 ✓'
        },
        {
          id: "ch1-priority",
          type: "explain",
          title: "📐 연산자 우선순위",
          content: `수학처럼 수도코드에도 **연산 순서**가 있어요!

**우선순위 (높은 것부터):**
1. \`( )\` — 괄호 (무조건 먼저!)
2. \`*\`, \`/\`, \`DIV\`, \`MOD\` — 곱셈/나눗셈
3. \`+\`, \`-\` — 덧셈/뺄셈

\`\`\`
// 예시 1: 곱하기가 먼저!
OUTPUT 2 + 3 * 4      // = 2 + 12 = 14

// 예시 2: 괄호가 먼저!
OUTPUT (2 + 3) * 4     // = 5 * 4 = 20

// 예시 3: MOD도 곱셈/나눗셈과 같은 레벨
OUTPUT 10 + 7 MOD 3    // = 10 + 1 = 11
\`\`\`

💡 **헷갈리면 괄호를 쓰세요!** 시험에서도 괄호를 쓰면 감점 없어요.`
        },
        {
          id: "ch1-predict2",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 코드의 출력은?

\`\`\`
DECLARE x : INTEGER
x ← (10 + 2) * 3 - 4 DIV 2
OUTPUT x
\`\`\``,
          options: [
            '34',
            '36',
            '32',
            '18'
          ],
          answer: 0,
          explanation: '1단계: 괄호 → (10 + 2) = 12\n2단계: 곱셈 → 12 * 3 = 36\n3단계: DIV → 4 DIV 2 = 2\n4단계: 빼기 → 36 - 2 = **34**'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '25를 7로 나눈 몫과 나머지를 구하세요.',
          code: 'DECLARE quotient : INTEGER\nDECLARE remainder : INTEGER\nquotient ← 25 ___ 7\nremainder ← 25 ___ 7\nOUTPUT quotient\nOUTPUT remainder',
          fillBlanks: [
            { id: 1, answer: "DIV", options: ["DIV", "MOD", "/", "*"] },
            { id: 2, answer: "MOD", options: ["MOD", "DIV", "/", "-"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "비교 & 논리 연산자",
      emoji: "⚖️",
      steps: [
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚖️ 비교 연산자",
          content: `두 값을 **비교**할 때 쓰는 연산자예요. 결과는 항상 **TRUE** 또는 **FALSE**!

| 연산자 | 뜻 | 예시 | 결과 |
|---|---|---|---|
| \`=\` | 같다 | \`5 = 5\` | TRUE |
| \`<>\` | 같지 않다 | \`5 <> 3\` | TRUE |
| \`>\` | 크다 | \`7 > 3\` | TRUE |
| \`<\` | 작다 | \`2 < 8\` | TRUE |
| \`>=\` | 크거나 같다 | \`5 >= 5\` | TRUE |
| \`<=\` | 작거나 같다 | \`3 <= 7\` | TRUE |

⚠️ **주의!**
- "같다"는 \`=\` (하나!) — Python의 \`==\`와 달라요!
- "같지 않다"는 \`<>\` — Python의 \`!=\`와 달라요!
- 할당은 \`←\`, 비교는 \`=\` — 헷갈리지 마세요!`
        },
        {
          id: "ch2-logical",
          type: "explain",
          title: "🧩 논리 연산자: AND, OR, NOT",
          content: `여러 조건을 **합칠 때** 논리 연산자를 써요!

**AND — 둘 다 TRUE여야 TRUE**
\`\`\`
IF age >= 13 AND age <= 19 THEN
    OUTPUT "십대입니다"
ENDIF
\`\`\`

**OR — 하나만 TRUE여도 TRUE**
\`\`\`
IF day = "Saturday" OR day = "Sunday" THEN
    OUTPUT "주말입니다"
ENDIF
\`\`\`

**NOT — TRUE ↔ FALSE 뒤집기**
\`\`\`
IF NOT(gameOver) THEN
    OUTPUT "계속 플레이!"
ENDIF
\`\`\`

| A | B | A AND B | A OR B | NOT A |
|---|---|---|---|---|
| TRUE | TRUE | TRUE | TRUE | FALSE |
| TRUE | FALSE | FALSE | TRUE | FALSE |
| FALSE | TRUE | FALSE | TRUE | TRUE |
| FALSE | FALSE | FALSE | FALSE | TRUE |`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '`x ← 15`일 때, `x > 10 AND x < 20`의 결과는?',
          options: [
            'TRUE',
            'FALSE',
            '15',
            '에러'
          ],
          answer: 0,
          explanation: 'x = 15일 때: `15 > 10`은 TRUE, `15 < 20`도 TRUE. AND는 둘 다 TRUE일 때 TRUE → **TRUE**!'
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 코드의 출력은?

\`\`\`
DECLARE mark : INTEGER
mark ← 75

IF mark >= 90 THEN
    OUTPUT "A"
ELSE
    IF mark >= 70 AND mark < 90 THEN
        OUTPUT "B"
    ELSE
        OUTPUT "C"
    ENDIF
ENDIF
\`\`\``,
          options: [
            'B',
            'A',
            'C',
            'TRUE'
          ],
          answer: 0,
          explanation: 'mark = 75. 먼저 `75 >= 90`은 FALSE → ELSE로 감. `75 >= 70 AND 75 < 90` → TRUE AND TRUE = TRUE → **"B"** 출력!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '점수가 0 이상 100 이하인지 확인하는 조건을 완성하세요.',
          code: 'IF score ___ 0 ___ score ___ 100 THEN\n    OUTPUT "유효한 점수"\nENDIF',
          fillBlanks: [
            { id: 1, answer: ">=", options: [">=", ">", "<=", "="] },
            { id: 2, answer: "AND", options: ["AND", "OR", "NOT", "THEN"] },
            { id: 3, answer: "<=", options: ["<=", "<", ">=", "<>"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "시험 필수 패턴",
      emoji: "🎯",
      steps: [
        {
          id: "ch3-evenodd",
          type: "explain",
          title: "🔢 짝수/홀수 판별",
          content: `**시험 단골 문제!** 숫자가 짝수인지 홀수인지 어떻게 알까요?

**핵심: MOD 2를 사용!**

\`\`\`
// 짝수 확인: 2로 나눈 나머지가 0
IF n MOD 2 = 0 THEN
    OUTPUT "짝수"
ELSE
    OUTPUT "홀수"
ENDIF
\`\`\`

**예시:**
- \`10 MOD 2 = 0\` → 짝수 ✓
- \`7 MOD 2 = 1\` → 홀수 ✓
- \`0 MOD 2 = 0\` → 짝수 ✓

💡 **3의 배수?** → \`n MOD 3 = 0\`
💡 **5의 배수?** → \`n MOD 5 = 0\`
💡 **N의 배수?** → \`n MOD N = 0\``
        },
        {
          id: "ch3-evenodd-predict",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 코드의 출력은?

\`\`\`
FOR i ← 1 TO 6
    IF i MOD 2 = 0 THEN
        OUTPUT i
    ENDIF
NEXT i
\`\`\``,
          options: [
            '2\n4\n6',
            '1\n3\n5',
            '1\n2\n3\n4\n5\n6',
            '0\n2\n4\n6'
          ],
          answer: 0,
          explanation: 'i가 1~6 중 `i MOD 2 = 0`인 것만 출력해요. 2 MOD 2=0✓, 4 MOD 2=0✓, 6 MOD 2=0✓ → **2, 4, 6**'
        },
        {
          id: "ch3-digits",
          type: "explain",
          title: "🔢 자릿수 추출하기",
          content: `숫자에서 **각 자릿수**를 뽑아내는 것도 시험에 잘 나와요!

**일의 자리:** \`MOD 10\`
**십의 자리:** \`DIV 10 MOD 10\`
**백의 자리:** \`DIV 100 MOD 10\`

\`\`\`
DECLARE num : INTEGER
num ← 435

// 일의 자리: 5
OUTPUT num MOD 10

// 십의 자리: 3
OUTPUT (num DIV 10) MOD 10

// 백의 자리: 4
OUTPUT (num DIV 100) MOD 10
\`\`\`

💡 **패턴:**
- 일의 자리 = \`num MOD 10\`
- 나머지 자릿수 = **먼저 DIV로 밀고**, 다시 \`MOD 10\``
        },
        {
          id: "ch3-digits-predict",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 코드의 출력은?

\`\`\`
DECLARE n : INTEGER
n ← 1234
OUTPUT n MOD 10
OUTPUT n DIV 10 MOD 10
OUTPUT n DIV 100 MOD 10
\`\`\``,
          options: [
            '4\n3\n2',
            '1\n2\n3',
            '4\n34\n12',
            '1234\n123\n12'
          ],
          answer: 0,
          explanation: '`1234 MOD 10 = 4` (일의 자리)\n`1234 DIV 10 = 123`, `123 MOD 10 = 3` (십의 자리)\n`1234 DIV 100 = 12`, `12 MOD 10 = 2` (백의 자리)'
        },
        {
          id: "ch3-builtin",
          type: "explain",
          title: "🛠️ 내장 함수 모음",
          content: `CIE 수도코드에서 쓸 수 있는 **내장 함수**들이에요!

**숫자 관련:**
| 함수 | 설명 | 예시 | 결과 |
|---|---|---|---|
| \`INT(x)\` | 소수점 버림 (정수부분만) | \`INT(3.7)\` | 3 |
| \`ROUND(x, n)\` | 소수점 n자리까지 반올림 | \`ROUND(3.456, 2)\` | 3.46 |
| \`RANDOM()\` | 0 이상 1 미만 랜덤 실수 | \`RANDOM()\` | 0.7... |

**문자열 관련:**
| 함수 | 설명 | 예시 | 결과 |
|---|---|---|---|
| \`LENGTH(s)\` | 문자열 길이 | \`LENGTH("Hi")\` | 2 |
| \`UCASE(s)\` | 대문자로 | \`UCASE("hello")\` | "HELLO" |
| \`LCASE(s)\` | 소문자로 | \`LCASE("HELLO")\` | "hello" |
| \`SUBSTRING(s, i, n)\` | i번째부터 n글자 추출 | \`SUBSTRING("Hello", 1, 3)\` | "Hel" |

**형변환:**
| 함수 | 설명 | 예시 | 결과 |
|---|---|---|---|
| \`INT(x)\` | 실수 → 정수 (버림) | \`INT(9.8)\` | 9 |
| \`STRING_TO_NUM(s)\` | 문자열 → 숫자 | \`STRING_TO_NUM("42")\` | 42 |
| \`NUM_TO_STRING(n)\` | 숫자 → 문자열 | \`NUM_TO_STRING(42)\` | "42" |
| \`CHR(n)\` | ASCII 코드 → 문자 | \`CHR(65)\` | 'A' |
| \`ASC(c)\` | 문자 → ASCII 코드 | \`ASC('A')\` | 65 |

💡 **& 연산자**는 **문자열 이어붙이기**! → \`"Hello" & " " & "World" = "Hello World"\``
        },
        {
          id: "ch3-integer-check",
          type: "explain",
          title: "🔍 정수인지 확인하기",
          content: `입력받은 숫자가 **정수인지** 확인하고 싶을 때!

**방법: INT(x) = x 이면 정수**

\`\`\`
DECLARE x : REAL
INPUT x

IF INT(x) = x THEN
    OUTPUT "정수입니다"
ELSE
    OUTPUT "정수가 아닙니다"
ENDIF
\`\`\`

**예시:**
- x = 5.0 → INT(5.0) = 5, 5 = 5.0 ✓ → 정수
- x = 3.7 → INT(3.7) = 3, 3 ≠ 3.7 → 정수 아님

💡 **랜덤 정수 만들기** (1 ~ 6 주사위)
\`\`\`
DECLARE dice : INTEGER
dice ← INT(RANDOM() * 6) + 1
\`\`\`
- RANDOM()은 0~0.999...
- × 6 하면 0~5.999...
- INT() 하면 0~5
- +1 하면 **1~6** 🎲`
        },
        {
          id: "ch3-predict-random",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 코드에서 \`num\`의 가능한 범위는?

\`\`\`
DECLARE num : INTEGER
num ← INT(RANDOM() * 10) + 5
\`\`\``,
          options: [
            '5부터 14까지',
            '0부터 9까지',
            '5부터 15까지',
            '1부터 10까지'
          ],
          answer: 0,
          explanation: 'RANDOM()은 0~0.999... → ×10 하면 0~9.999... → INT() 하면 0~9 → +5 하면 **5~14**!'
        },
        {
          id: "ch3-string-ops",
          type: "explain",
          title: "🔤 문자열 연산 패턴",
          content: `시험에 자주 나오는 **문자열 처리** 패턴이에요!

**1) 문자열 이어 붙이기 (&)**
\`\`\`
DECLARE first : STRING
DECLARE last : STRING
first ← "Kim"
last ← "Minjun"
OUTPUT first & " " & last
// 출력: Kim Minjun
\`\`\`

**2) 숫자를 문자열에 넣기**
\`\`\`
DECLARE score : INTEGER
score ← 95
OUTPUT "점수: " & NUM_TO_STRING(score) & "점"
// 출력: 점수: 95점
\`\`\`

**3) 첫 글자 추출**
\`\`\`
DECLARE name : STRING
name ← "Alice"
OUTPUT SUBSTRING(name, 1, 1)
// 출력: A
\`\`\`

**4) 대문자로 비교 (대소문자 무시)**
\`\`\`
DECLARE answer : STRING
INPUT answer
IF UCASE(answer) = "YES" THEN
    OUTPUT "승인!"
ENDIF
\`\`\`

⚠️ SUBSTRING의 인덱스는 **1부터 시작**해요! (0이 아님!)`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '짝수만 출력하고, 정수인지 확인하는 코드를 완성하세요.',
          code: '// 짝수 확인\nIF num ___ 2 = 0 THEN\n    OUTPUT "짝수"\nENDIF\n\n// 정수 확인\nIF ___(x) = x THEN\n    OUTPUT "정수"\nENDIF',
          fillBlanks: [
            { id: 1, answer: "MOD", options: ["MOD", "DIV", "/", "*"] },
            { id: 2, answer: "INT", options: ["INT", "ROUND", "REAL", "NUM_TO_STRING"] }
          ]
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '1~100 사이의 랜덤 정수를 만드는 올바른 코드는?',
          options: [
            'INT(RANDOM() * 100) + 1',
            'RANDOM() * 100',
            'INT(RANDOM() * 100)',
            'RANDOM(100)'
          ],
          answer: 0,
          explanation: 'RANDOM()은 0~0.999... → ×100 하면 0~99.999... → INT() 하면 0~99 → +1 하면 **1~100**! RANDOM(100)은 CIE 수도코드 문법이 아니에요.'
        },
      ]
    },
    {
      id: "ch4",
      title: "시험 종합 연습",
      emoji: "📝",
      steps: [
        {
          id: "ch4-combo1",
          type: "predict",
          title: "🔮 종합 문제 1",
          content: `다음 코드의 출력은?

\`\`\`
DECLARE total : INTEGER
total ← 0
FOR i ← 1 TO 10
    IF i MOD 3 = 0 THEN
        total ← total + i
    ENDIF
NEXT i
OUTPUT total
\`\`\``,
          options: [
            '18',
            '30',
            '15',
            '9'
          ],
          answer: 0,
          explanation: '3의 배수만 더해요: 3 + 6 + 9 = **18**. i MOD 3 = 0인 수: 3, 6, 9'
        },
        {
          id: "ch4-combo2",
          type: "predict",
          title: "🔮 종합 문제 2",
          content: `다음 코드의 출력은?

\`\`\`
DECLARE text : STRING
DECLARE count : INTEGER
text ← "Hello World"
count ← 0
FOR i ← 1 TO LENGTH(text)
    IF SUBSTRING(text, i, 1) = "l" THEN
        count ← count + 1
    ENDIF
NEXT i
OUTPUT count
\`\`\``,
          options: [
            '3',
            '2',
            '1',
            '11'
          ],
          answer: 0,
          explanation: '"Hello World"에서 "l"을 찾아요. H-e-**l**-**l**-o- -W-o-r-**l**-d → "l"이 3개! SUBSTRING으로 한 글자씩 비교해요.'
        },
        {
          id: "ch4-combo3",
          type: "predict",
          title: "🔮 종합 문제 3",
          content: `다음 코드의 출력은?

\`\`\`
DECLARE n : INTEGER
n ← 4567
OUTPUT n MOD 10
OUTPUT (n DIV 10) MOD 10
OUTPUT n MOD 100
\`\`\``,
          options: [
            '7\n6\n67',
            '4\n5\n45',
            '7\n6\n7',
            '7\n67\n567'
          ],
          answer: 0,
          explanation: '`4567 MOD 10 = 7` (일의 자리)\n`4567 DIV 10 = 456`, `456 MOD 10 = 6` (십의 자리)\n`4567 MOD 100 = 67` (마지막 두 자리!)'
        },
        {
          id: "ch4-fill-final",
          type: "fillblank",
          title: "✏️ 최종 빈칸 채우기!",
          content: '1~6 주사위를 굴리고, 짝수인지 확인하는 코드를 완성하세요.',
          code: 'DECLARE dice : INTEGER\ndice ← ___(RANDOM() * 6) + 1\n\nIF dice ___ 2 = 0 THEN\n    OUTPUT ___ & "는 짝수!"\nENDIF',
          fillBlanks: [
            { id: 1, answer: "INT", options: ["INT", "ROUND", "REAL", "RANDOM"] },
            { id: 2, answer: "MOD", options: ["MOD", "DIV", "/", "AND"] },
            { id: 3, answer: "NUM_TO_STRING(dice)", options: ["NUM_TO_STRING(dice)", "dice", "STRING(dice)", "OUTPUT dice"] }
          ]
        },
        {
          id: "ch4-quiz-final",
          type: "quiz",
          title: "🧠 최종 퀴즈!",
          content: '다음 중 "같지 않다"를 나타내는 CIE 수도코드 연산자는?',
          options: [
            '<>',
            '!=',
            '=/=',
            'NOT='
          ],
          answer: 0,
          explanation: 'CIE 수도코드에서 "같지 않다"는 **<>**를 사용해요! `!=`는 Python/Java, `=/=`와 `NOT=`는 수도코드 문법이 아니에요.'
        },
      ]
    }
  ]
}
