// ============================================
// 수도코드 레슨 2: 변수
// CIE 스타일 수도코드 - 데이터를 저장하는 상자!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson2Data: LessonData = {
  id: "pseudo-2",
  title: "변수",
  emoji: "📦",
  description: "데이터를 저장하는 상자!",
  chapters: [
    {
      id: "ch1",
      title: "변수란?",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 변수가 뭐예요?",
          content: `**변수(Variable)**는 데이터를 저장하는 **이름이 붙은 상자**예요!

예를 들어 볼까요?
- 📦 \`age\`라는 상자에 숫자 **13**을 넣을 수 있어요
- 📦 \`name\`이라는 상자에 글자 **"코드린"**을 넣을 수 있어요

변수를 쓰면 데이터를 **저장**하고, 나중에 **다시 꺼내서 사용**할 수 있어요!

프로그래밍에서 변수는 정말 중요해요. 거의 모든 프로그램이 변수를 사용한답니다! 🎯`
        },
        {
          id: "ch1-declare",
          type: "explain",
          title: "📝 DECLARE로 변수 만들기",
          content: `CIE 수도코드에서는 **DECLARE**로 변수를 만들어요.

\`\`\`
DECLARE age : INTEGER
DECLARE name : STRING
\`\`\`

형식: **DECLARE 이름 : 자료형**

| 부분 | 의미 |
|---|---|
| DECLARE | "변수를 만들겠다!" 라는 뜻 |
| age, name | 변수의 **이름** |
| INTEGER | **정수**(1, 2, 3 같은 숫자) |
| STRING | **문자열**("Hello" 같은 글자) |

변수를 사용하기 전에 먼저 **DECLARE**로 선언해야 해요! 📋`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '문자열(글자)을 저장할 변수 `city`를 선언하세요.',
          codeTemplate: '___ city : ___',
          fillBlanks: [
            { id: 1, answer: "DECLARE", options: ["DECLARE", "CREATE", "SET", "OUTPUT"] },
            { id: 2, answer: "STRING", options: ["STRING", "INTEGER", "TEXT", "CHAR"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "변수 사용하기",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-assign",
          type: "explain",
          title: "⬅️ 값 넣기: ← 연산자",
          content: `변수에 값을 넣을 때는 **← (화살표)** 를 사용해요!

\`\`\`
DECLARE age : INTEGER
age ← 13
\`\`\`

이렇게 하면 \`age\` 상자에 **13**이 들어가요.

문자열도 넣을 수 있어요:
\`\`\`
DECLARE name : STRING
name ← "Alice"
\`\`\`

⚠️ 주의! 수도코드에서는 \`=\`가 아니라 **←** 를 써요!

| 수도코드 📋 | Python 🐍 |
|---|---|
| age ← 13 | age = 13 |
| name ← "Alice" | name = "Alice" |

**←** 는 "오른쪽 값을 왼쪽 변수에 넣어라!" 라는 뜻이에요. 📥`
        },
        {
          id: "ch2-output",
          type: "explain",
          title: "📢 변수 값 출력하기",
          content: `변수에 저장한 값을 **OUTPUT**으로 출력할 수 있어요!

\`\`\`
DECLARE name : STRING
name ← "코드린"
OUTPUT name
\`\`\`

결과:
\`\`\`
코드린
\`\`\`

주의! \`OUTPUT name\`과 \`OUTPUT "name"\`은 달라요!

| 코드 | 결과 |
|---|---|
| OUTPUT name | 코드린 (변수 값) |
| OUTPUT "name" | name (글자 그대로) |

따옴표가 없으면 **변수의 값**을 출력하고, 따옴표가 있으면 **글자 그대로** 출력해요! 🔍`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE x : INTEGER
x ← 10
x ← 20
OUTPUT x
\`\`\``,
          options: [
            '10',
            '20',
            '10\n20',
            '에러'
          ],
          answer: 1,
          explanation: '변수에 새 값을 넣으면 **이전 값은 사라져요!** `x`에 10을 넣었다가 20을 넣으면, 마지막 값인 **20**이 출력돼요. 상자에 새 물건을 넣으면 이전 물건은 빠지는 것과 같아요!'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '변수 `score`에 100을 넣고 출력하는 코드를 완성하세요.',
          codeTemplate: 'DECLARE score : INTEGER\nscore ___ 100\n___ score',
          fillBlanks: [
            { id: 1, answer: "←", options: ["←", "=", "->", ":"] },
            { id: 2, answer: "OUTPUT", options: ["OUTPUT", "PRINT", "DISPLAY", "SHOW"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "변수 이름 규칙",
      emoji: "📏",
      steps: [
        {
          id: "ch3-rules",
          type: "explain",
          title: "📏 변수 이름 짓기 규칙",
          content: `변수 이름을 지을 때는 규칙이 있어요!

✅ **좋은 이름:**
- \`score\` — 점수
- \`playerName\` — 플레이어 이름
- \`totalCount\` — 총 개수

❌ **안 되는 이름:**
- \`1score\` — 숫자로 시작하면 안 돼요!
- \`my name\` — 공백(띄어쓰기)이 있으면 안 돼요!
- \`OUTPUT\` — 이미 명령어로 쓰이는 단어는 안 돼요!

💡 **꿀팁:**
- 의미가 잘 드러나는 이름을 써요
- \`x\`보다 \`score\`가 알아보기 쉽죠!
- 여러 단어는 **camelCase**로: \`myScore\`, \`userName\``
        },
        {
          id: "ch3-predict2",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE a : INTEGER
DECLARE b : INTEGER
a ← 5
b ← a
a ← 10
OUTPUT b
\`\`\``,
          options: [
            '5',
            '10',
            '15',
            '에러'
          ],
          answer: 0,
          explanation: '`b ← a`를 실행할 때 `a`의 값이 5이므로 `b`에 **5**가 복사돼요. 그 후에 `a`를 10으로 바꿔도 `b`는 여전히 **5**예요! 값이 복사된 거지 연결된 게 아니에요.'
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🏆 마무리 퀴즈!",
          content: '다음 코드의 출력 결과는?\n\n```\nDECLARE msg : STRING\nmsg ← "Hello"\nOUTPUT "msg"\n```',
          options: [
            'Hello',
            'msg',
            '"Hello"',
            '에러'
          ],
          answer: 1,
          explanation: '`OUTPUT "msg"`는 따옴표 안에 있으므로 **글자 그대로** "msg"를 출력해요. 변수의 값을 출력하려면 따옴표 없이 `OUTPUT msg`라고 써야 해요!'
        },
      ]
    },
  ]
}
