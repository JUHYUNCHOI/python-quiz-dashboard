// ============================================
// 수도코드 레슨 4: 자료형
// CIE 스타일 수도코드 - INTEGER, REAL, STRING, BOOLEAN!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson4Data: LessonData = {
  id: "pseudo-4",
  title: "자료형",
  emoji: "🏷️",
  description: "INTEGER, REAL, STRING, BOOLEAN!",
  chapters: [
    {
      id: "ch1",
      title: "자료형이란?",
      emoji: "🏷️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🏷️ 자료형이 뭐예요?",
          content: `**자료형(Data Type)**은 변수에 저장할 **데이터의 종류**를 말해요!

왜 자료형이 필요할까요?
- 📦 상자에 **어떤 종류**의 물건을 넣을지 미리 정하는 거예요
- 컴퓨터가 데이터를 **올바르게 처리**하려면 종류를 알아야 해요

예를 들어:
- 숫자 **13**과 글자 **"13"**은 다르게 취급해요!
- 숫자 13은 **계산**할 수 있지만
- 글자 "13"은 **이어 붙이기**가 가능해요

\`\`\`
DECLARE age : INTEGER
DECLARE name : STRING
\`\`\`

\`: INTEGER\`, \`: STRING\` 이 부분이 바로 **자료형**이에요! 🎯`
        },
        {
          id: "ch1-overview",
          type: "explain",
          title: "📋 CIE 자료형 한눈에 보기",
          content: `CIE 수도코드에서 사용하는 **5가지 자료형**이에요!

| 자료형 | 뜻 | 예시 |
|---|---|---|
| **INTEGER** | 정수 (소수점 없는 숫자) | 1, 42, -7, 0 |
| **REAL** | 실수 (소수점 있는 숫자) | 3.14, -0.5, 2.0 |
| **STRING** | 문자열 (글자 여러 개) | "Hello", "코드린" |
| **CHAR** | 문자 (글자 한 개) | 'A', 'z', '!' |
| **BOOLEAN** | 참/거짓 (둘 중 하나) | TRUE, FALSE |

💡 **기억하기:**
- INTEGER는 **정수** = **소수점이 없는** 숫자
- REAL은 **실수** = **소수점이 있을 수 있는** 숫자
- STRING은 큰따옴표 **" "**, CHAR는 작은따옴표 **' '**
- BOOLEAN은 **TRUE** 아니면 **FALSE** 딱 두 가지만!`
        },
      ]
    },
    {
      id: "ch2",
      title: "각 자료형 알아보기",
      emoji: "🔍",
      steps: [
        {
          id: "ch2-numbers",
          type: "explain",
          title: "🔢 INTEGER와 REAL",
          content: `**INTEGER(정수)**와 **REAL(실수)**는 숫자를 저장해요!

**INTEGER** — 소수점이 없는 숫자:
\`\`\`
DECLARE count : INTEGER
DECLARE temperature : INTEGER
count ← 10
temperature ← -3
\`\`\`

**REAL** — 소수점이 있을 수 있는 숫자:
\`\`\`
DECLARE pi : REAL
DECLARE height : REAL
pi ← 3.14
height ← 170.5
\`\`\`

🤔 **INTEGER vs REAL 언제 뭘 쓸까?**

| 상황 | 자료형 |
|---|---|
| 사람 수, 점수, 나이 | INTEGER |
| 키, 몸무게, 평균 | REAL |
| 돈(원) | INTEGER |
| 돈(달러, 센트) | REAL |

정수로 충분하면 **INTEGER**, 소수점이 필요하면 **REAL**! 💡`
        },
        {
          id: "ch2-text",
          type: "explain",
          title: '🔤 STRING과 CHAR',
          content: `**STRING(문자열)**과 **CHAR(문자)**는 글자를 저장해요!

**STRING** — 글자 여러 개 (큰따옴표 " "):
\`\`\`
DECLARE greeting : STRING
DECLARE city : STRING
greeting ← "Hello, World!"
city ← "서울"
\`\`\`

**CHAR** — 글자 딱 한 개 (작은따옴표 ' '):
\`\`\`
DECLARE grade : CHAR
DECLARE initial : CHAR
grade ← 'A'
initial ← 'K'
\`\`\`

⚠️ **주의할 점:**
- STRING은 **큰따옴표 " "** → \`"Hello"\`
- CHAR는 **작은따옴표 ' '** → \`'H'\`
- CHAR는 **반드시 한 글자**만! \`'AB'\`는 안 돼요!
- 빈 문자열 \`""\`은 STRING이에요`
        },
        {
          id: "ch2-boolean",
          type: "explain",
          title: "✅ BOOLEAN",
          content: `**BOOLEAN(불리언)**은 **참(TRUE)** 또는 **거짓(FALSE)** 딱 두 가지 값만 가져요!

\`\`\`
DECLARE isStudent : BOOLEAN
DECLARE gameOver : BOOLEAN
isStudent ← TRUE
gameOver ← FALSE
\`\`\`

🤔 **언제 BOOLEAN을 쓸까?**

| 상황 | 변수 이름 | 값 |
|---|---|---|
| 로그인 했는지 | isLoggedIn | TRUE / FALSE |
| 게임이 끝났는지 | gameOver | TRUE / FALSE |
| 불이 켜져 있는지 | lightOn | TRUE / FALSE |

**"예/아니오"**로 답할 수 있는 것은 모두 BOOLEAN이에요!

💡 TRUE와 FALSE는 따옴표 없이 **대문자**로 써요!
- ✅ \`TRUE\` — 올바른 표기
- ❌ \`"TRUE"\` — 이것은 문자열이에요!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 코드에서 올바르게 선언된 변수는 몇 개일까요?

\`\`\`
DECLARE age : INTEGER
DECLARE name : STRING
DECLARE grade : CHAR
DECLARE height : REAL
DECLARE pass : BOOLEAN
\`\`\``,
          options: [
            '3개',
            '4개',
            '5개',
            '에러가 있다'
          ],
          answer: 2,
          explanation: '5개 모두 올바르게 선언되었어요! INTEGER(정수), STRING(문자열), CHAR(문자), REAL(실수), BOOLEAN(참/거짓) 모두 유효한 CIE 자료형이에요.'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '각 변수에 알맞은 자료형을 선택하세요.',
          code: 'DECLARE score : ___\nDECLARE average : ___\nDECLARE isWinner : ___',
          fillBlanks: [
            { id: 1, answer: "INTEGER", options: ["INTEGER", "REAL", "STRING", "BOOLEAN"] },
            { id: 2, answer: "REAL", options: ["INTEGER", "REAL", "STRING", "BOOLEAN"] },
            { id: 3, answer: "BOOLEAN", options: ["INTEGER", "REAL", "STRING", "BOOLEAN"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "자료형 마무리 퀴즈",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '다음 중 CHAR 자료형에 저장할 수 있는 값은?',
          options: [
            '"Hello"',
            "'AB'",
            "'K'",
            '42'
          ],
          answer: 2,
          explanation: "CHAR는 **글자 딱 한 개**만 저장해요! 작은따옴표로 감싼 한 글자 **'K'**가 올바른 CHAR 값이에요. \"Hello\"는 STRING, 42는 INTEGER예요."
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🧠 자료형 맞추기!",
          content: '변수 `temperature`에 **36.5**를 저장하려면 어떻게 선언해야 할까요?',
          options: [
            'DECLARE temperature : INTEGER',
            'DECLARE temperature : REAL',
            'DECLARE temperature : STRING',
            'DECLARE temperature : BOOLEAN'
          ],
          answer: 1,
          explanation: '36.5는 소수점이 있는 숫자이므로 **REAL** 자료형을 사용해야 해요! INTEGER는 소수점 없는 정수만 저장할 수 있어요.'
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '이름을 저장하는 변수를 선언하고 값을 넣으세요.',
          code: '___ userName : ___\nuserName ← ___',
          fillBlanks: [
            { id: 1, answer: "DECLARE", options: ["DECLARE", "SET", "CREATE", "INPUT"] },
            { id: 2, answer: "STRING", options: ["STRING", "CHAR", "INTEGER", "BOOLEAN"] },
            { id: 3, answer: '"코드린"', options: ['"코드린"', "'코드린'", "코드린", "TRUE"] }
          ]
        },
      ]
    },
  ]
}
