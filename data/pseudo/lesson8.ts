// ============================================
// 수도코드 레슨 8: 배열
// CIE 스타일 수도코드 - DECLARE 배열, 인덱싱
// ============================================

import { LessonData } from '../types'

export const pseudoLesson8Data: LessonData = {
  id: "pseudo-8",
  title: "배열",
  emoji: "📊",
  description: "DECLARE 배열, 인덱싱!",
  chapters: [
    {
      id: "ch1",
      title: "배열이란?",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 배열이 뭐예요?",
          content: `변수는 값을 **하나만** 저장할 수 있어요.

그런데 학생 30명의 점수를 저장하려면 어떻게 할까요?

\`\`\`
DECLARE score1 : INTEGER
DECLARE score2 : INTEGER
DECLARE score3 : INTEGER
... 30개나 만들어야 해요! 😱
\`\`\`

**배열(Array)**은 같은 종류의 데이터를 **여러 개** 한꺼번에 저장하는 방법이에요!

\`\`\`
DECLARE scores : ARRAY[1:30] OF INTEGER
\`\`\`

이 한 줄이면 30개의 점수를 모두 저장할 수 있어요! 🎉`
        },
        {
          id: "ch1-declare",
          type: "explain",
          title: "📝 배열 선언하기 (DECLARE)",
          content: `CIE 수도코드에서 배열을 만드는 문법이에요:

\`\`\`
DECLARE 이름 : ARRAY[시작:끝] OF 자료형
\`\`\`

예시를 볼까요?

\`\`\`
DECLARE numbers : ARRAY[1:5] OF INTEGER
DECLARE names : ARRAY[1:3] OF STRING
DECLARE grades : ARRAY[1:10] OF REAL
\`\`\`

중요한 점!
- 📌 CIE 배열은 **1부터 시작**해요 (0이 아니에요!)
- 📌 \`[1:5]\`는 1번부터 5번까지, 총 **5칸**이에요
- 📌 \`OF\` 뒤에 자료형(INTEGER, STRING 등)을 써요`
        },
        {
          id: "ch1-index",
          type: "explain",
          title: "🔢 인덱스란?",
          content: `배열의 각 칸에는 **번호(인덱스)**가 있어요.

\`\`\`
DECLARE fruits : ARRAY[1:4] OF STRING
\`\`\`

| 인덱스 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 값 | ? | ? | ? | ? |

아직 값을 넣지 않았으니 비어 있어요.

값을 넣으려면 **인덱스**를 사용해요:

\`\`\`
fruits[1] ← "사과"
fruits[2] ← "바나나"
fruits[3] ← "포도"
fruits[4] ← "딸기"
\`\`\`

| 인덱스 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 값 | 사과 | 바나나 | 포도 | 딸기 |

\`fruits[2]\`는 **"바나나"**예요! 🍌`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '5개의 정수를 저장하는 배열을 선언하세요.',
          codeTemplate: 'DECLARE scores : ___[1:5] OF INTEGER',
          fillBlanks: [
            { id: 1, answer: "ARRAY", options: ["ARRAY", "LIST", "SET", "TABLE"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "배열 사용하기",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-access",
          type: "explain",
          title: "📖 배열 값 읽기와 바꾸기",
          content: `배열에서 값을 **읽으려면** 인덱스를 사용해요:

\`\`\`
DECLARE numbers : ARRAY[1:5] OF INTEGER
numbers[1] ← 10
numbers[2] ← 20
numbers[3] ← 30

OUTPUT numbers[1]
OUTPUT numbers[3]
\`\`\`

결과:
\`\`\`
10
30
\`\`\`

값을 **바꿀 수도** 있어요:

\`\`\`
numbers[2] ← 99
OUTPUT numbers[2]
\`\`\`

결과: **99** (원래 20이었지만 99로 바뀌었어요!)`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE items : ARRAY[1:3] OF STRING
items[1] ← "연필"
items[2] ← "지우개"
items[3] ← "자"
items[2] ← "볼펜"
OUTPUT items[2]
\`\`\``,
          options: [
            '볼펜',
            '지우개',
            '연필',
            '에러'
          ],
          answer: 0,
          explanation: '처음에 items[2]에 "지우개"를 넣었지만, 그 다음에 "볼펜"으로 **덮어썼어요**. 그래서 items[2]는 **"볼펜"**이에요!'
        },
        {
          id: "ch2-loop",
          type: "explain",
          title: "🔄 반복문으로 배열 순회하기",
          content: `배열의 모든 값을 하나씩 보려면 **FOR 반복문**을 써요!

\`\`\`
DECLARE numbers : ARRAY[1:5] OF INTEGER
numbers[1] ← 10
numbers[2] ← 20
numbers[3] ← 30
numbers[4] ← 40
numbers[5] ← 50

FOR i ← 1 TO 5
    OUTPUT numbers[i]
NEXT i
\`\`\`

결과:
\`\`\`
10
20
30
40
50
\`\`\`

\`i\`가 1, 2, 3, 4, 5로 바뀌면서 배열의 각 값을 출력해요!

이것을 **배열 순회(traversal)**라고 해요. 🚶‍♂️`
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '배열의 모든 값을 출력하는 코드를 완성하세요.',
          codeTemplate: 'DECLARE ages : ARRAY[1:4] OF INTEGER\nages[1] ← 12\nages[2] ← 15\nages[3] ← 11\nages[4] ← 14\n\nFOR i ← 1 ___ 4\n    OUTPUT ages[i]\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "TO", options: ["TO", "UNTIL", "WHILE", "IN"] }
          ]
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE nums : ARRAY[1:4] OF INTEGER
nums[1] ← 5
nums[2] ← 10
nums[3] ← 15
nums[4] ← 20

total ← 0
FOR i ← 1 TO 4
    total ← total + nums[i]
NEXT i
OUTPUT total
\`\`\``,
          options: [
            '50',
            '20',
            '15',
            '10'
          ],
          answer: 0,
          explanation: '반복문이 배열의 모든 값을 더해요: 5 + 10 + 15 + 20 = **50**. 이렇게 배열과 반복문을 함께 쓰면 합계를 쉽게 구할 수 있어요!'
        }
      ]
    }
  ]
}
