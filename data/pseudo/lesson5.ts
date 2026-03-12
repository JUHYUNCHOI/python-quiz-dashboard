// ============================================
// 수도코드 레슨 5: 조건문
// IF...THEN...ELSE...ENDIF
// ============================================

import { LessonData } from '../types'

export const pseudoLesson5Data: LessonData = {
  id: "pseudo-5",
  title: "조건문",
  emoji: "🔀",
  description: "IF...THEN...ELSE...ENDIF!",
  chapters: [
    {
      id: "ch1",
      title: "IF...THEN...ENDIF",
      emoji: "✅",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔀 조건문이란?",
          content: `프로그램은 항상 같은 일만 하지 않아요!

**조건**에 따라 다른 행동을 할 수 있어요.

예를 들어:
- 점수가 60점 이상이면 → "합격!" 출력
- 비가 오면 → "우산을 챙기세요!" 출력

이렇게 **조건에 따라 다르게 실행**하는 것을 **조건문**이라고 해요.

수도코드에서는 **IF**를 사용해요!`
        },
        {
          id: "ch1-syntax",
          type: "explain",
          title: "📝 IF...THEN...ENDIF 문법",
          content: `가장 기본적인 조건문을 배워볼까요?

\`\`\`
IF 조건 THEN
    실행할 코드
ENDIF
\`\`\`

조건이 **참(TRUE)**이면 안의 코드가 실행돼요.

예를 들어:

\`\`\`
score ← 85
IF score >= 60 THEN
    OUTPUT "합격!"
ENDIF
\`\`\`

score가 85이니까 \`85 >= 60\`은 **참**! → **"합격!"**이 출력돼요.

만약 score가 50이면? 조건이 **거짓**이니까 아무것도 출력되지 않아요.`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '다음 중 IF 조건문의 올바른 형태는?',
          options: [
            'IF score >= 60 THEN\n    OUTPUT "합격!"\nENDIF',
            'IF score >= 60\n    OUTPUT "합격!"\nEND',
            'IF score >= 60 DO\n    OUTPUT "합격!"\nENDIF',
            'WHEN score >= 60 THEN\n    OUTPUT "합격!"\nENDWHEN'
          ],
          answer: 0,
          explanation: 'CIE 수도코드에서는 **IF 조건 THEN ... ENDIF** 형태를 사용해요! THEN을 꼭 써야 하고, ENDIF로 끝내야 해요.'
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
age ← 15
IF age >= 18 THEN
    OUTPUT "성인입니다"
ENDIF
OUTPUT "프로그램 끝"
\`\`\``,
          options: [
            '성인입니다\n프로그램 끝',
            '프로그램 끝',
            '성인입니다',
            '아무것도 출력되지 않음'
          ],
          answer: 1,
          explanation: 'age가 15이므로 `15 >= 18`은 **거짓**이에요. IF 안의 코드는 건너뛰고, ENDIF 다음의 `OUTPUT "프로그램 끝"`만 실행돼요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '온도가 30도 이상이면 "더워요!"를 출력하는 조건문을 완성하세요.',
          codeTemplate: 'temp ← 35\n___ temp >= 30 ___ \n    OUTPUT "더워요!"\nENDIF',
          fillBlanks: [
            { id: 1, answer: "IF", options: ["IF", "WHEN", "CHECK", "WHILE"] },
            { id: 2, answer: "THEN", options: ["THEN", "DO", "RUN", "START"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "IF...THEN...ELSE",
      emoji: "🔀",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔀 두 갈래 길! IF...ELSE",
          content: `조건이 거짓일 때도 뭔가를 하고 싶다면?

**ELSE**를 추가하면 돼요!

\`\`\`
IF 조건 THEN
    조건이 참일 때 실행
ELSE
    조건이 거짓일 때 실행
ENDIF
\`\`\`

예시:

\`\`\`
age ← 15
IF age >= 18 THEN
    OUTPUT "성인"
ELSE
    OUTPUT "미성년자"
ENDIF
\`\`\`

age가 15이니까 조건이 거짓! → **"미성년자"**가 출력돼요.

**IF...ELSE**는 둘 중 하나는 **반드시** 실행돼요!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
number ← 7
IF number MOD 2 = 0 THEN
    OUTPUT "짝수"
ELSE
    OUTPUT "홀수"
ENDIF
\`\`\``,
          options: [
            '짝수',
            '홀수',
            '짝수\n홀수',
            '에러'
          ],
          answer: 1,
          explanation: '`7 MOD 2`는 7을 2로 나눈 나머지인 **1**이에요. `1 = 0`은 **거짓**이므로 ELSE 부분이 실행되어 **"홀수"**가 출력돼요!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '점수에 따라 합격/불합격을 출력하는 코드를 완성하세요.',
          codeTemplate: 'score ← 45\nIF score >= 60 THEN\n    OUTPUT "합격"\n___\n    OUTPUT "불합격"\n___',
          fillBlanks: [
            { id: 1, answer: "ELSE", options: ["ELSE", "OTHERWISE", "OR", "ELIF"] },
            { id: 2, answer: "ENDIF", options: ["ENDIF", "END", "END IF", "DONE"] }
          ]
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: 'IF...THEN...ELSE...ENDIF 문에서 반드시 참인 것은?',
          options: [
            'IF 부분과 ELSE 부분이 둘 다 실행된다',
            'IF 부분과 ELSE 부분 중 하나만 실행된다',
            'ELSE 부분은 항상 실행된다',
            'IF 부분은 항상 실행된다'
          ],
          answer: 1,
          explanation: '조건이 **참**이면 IF 부분만, **거짓**이면 ELSE 부분만 실행돼요. 둘 중 **하나만** 반드시 실행됩니다!'
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 또 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
x ← 10
y ← 20
IF x > y THEN
    OUTPUT x
ELSE
    OUTPUT y
ENDIF
\`\`\``,
          options: [
            '10',
            '20',
            '10\n20',
            '에러'
          ],
          answer: 1,
          explanation: '`10 > 20`은 **거짓**이므로 ELSE 부분이 실행돼요. y의 값인 **20**이 출력됩니다! 이 코드는 두 수 중 큰 수를 출력하는 코드예요.'
        },
      ]
    },
    {
      id: "ch3",
      title: "비교 연산자와 논리 연산자",
      emoji: "🔣",
      steps: [
        {
          id: "ch3-compare",
          type: "explain",
          title: "🔣 비교 연산자",
          content: `조건문에서 사용하는 **비교 연산자**를 알아봐요!

| 연산자 | 의미 | 예시 |
|---|---|---|
| **=** | 같다 | \`x = 5\` |
| **<>** | 같지 않다 | \`x <> 5\` |
| **<** | 작다 | \`x < 10\` |
| **>** | 크다 | \`x > 10\` |
| **<=** | 작거나 같다 | \`x <= 10\` |
| **>=** | 크거나 같다 | \`x >= 10\` |

주의! 수도코드에서 "같다"는 **=** 하나예요!
"같지 않다"는 **<>** 를 써요. (!=가 아니에요!)

\`\`\`
IF name <> "관리자" THEN
    OUTPUT "접근 거부!"
ENDIF
\`\`\``
        },
        {
          id: "ch3-logic",
          type: "explain",
          title: "🧩 논리 연산자: AND, OR, NOT",
          content: `조건을 **여러 개** 합치고 싶을 때 논리 연산자를 써요!

**AND** - 둘 다 참이어야 참:
\`\`\`
IF age >= 13 AND age <= 19 THEN
    OUTPUT "청소년"
ENDIF
\`\`\`

**OR** - 하나만 참이면 참:
\`\`\`
IF day = "토요일" OR day = "일요일" THEN
    OUTPUT "주말!"
ENDIF
\`\`\`

**NOT** - 참과 거짓을 뒤집기:
\`\`\`
IF NOT (score < 60) THEN
    OUTPUT "합격!"
ENDIF
\`\`\`

\`NOT (score < 60)\`은 \`score >= 60\`과 같아요!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: 'x ← 15 일 때, 다음 중 참(TRUE)인 조건은?',
          options: [
            'x > 10 AND x > 20',
            'x < 10 OR x > 20',
            'x >= 15 AND x <= 20',
            'NOT (x = 15)'
          ],
          answer: 2,
          explanation: '`x >= 15`는 참, `x <= 20`도 참이에요. **AND**는 둘 다 참이어야 하므로 참! 나머지는 하나 이상의 조건이 거짓이에요.'
        },
        {
          id: "ch3-nested",
          type: "explain",
          title: "🪆 중첩 IF (IF 안의 IF)",
          content: `IF 안에 또 IF를 넣을 수 있어요! 이것을 **중첩 IF**라고 해요.

\`\`\`
IF score >= 60 THEN
    IF score >= 90 THEN
        OUTPUT "수석 합격!"
    ELSE
        OUTPUT "합격!"
    ENDIF
ELSE
    OUTPUT "불합격..."
ENDIF
\`\`\`

score가 **95**이면:
1. \`95 >= 60\`? → 참! 안으로 들어가요
2. \`95 >= 90\`? → 참! → **"수석 합격!"**

score가 **75**이면:
1. \`75 >= 60\`? → 참! 안으로 들어가요
2. \`75 >= 90\`? → 거짓! → **"합격!"**

score가 **40**이면:
1. \`40 >= 60\`? → 거짓! → **"불합격..."**`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 최종 예측!",
          content: `다음 수도코드의 결과는?

\`\`\`
temp ← 25
IF temp > 30 THEN
    OUTPUT "더움"
ELSE
    IF temp >= 20 THEN
        OUTPUT "적당함"
    ELSE
        OUTPUT "추움"
    ENDIF
ENDIF
\`\`\``,
          options: [
            '더움',
            '적당함',
            '추움',
            '적당함\n추움'
          ],
          answer: 1,
          explanation: 'temp가 25이므로 `25 > 30`은 거짓 → ELSE로 가요. `25 >= 20`은 참 → **"적당함"**이 출력돼요!'
        },
      ]
    },
  ]
}
