// ============================================
// 수도코드 레슨 14: 2D 배열
// CIE 스타일 수도코드 - 2D 배열 선언, 접근, 중첩 FOR
// ============================================

import { LessonData } from '../types'

export const pseudoLesson14Data: LessonData = {
  id: "pseudo-14",
  title: "2D 배열",
  emoji: "📊",
  description: "2차원 배열을 배워보자!",
  chapters: [
    {
      id: "ch1",
      title: "2D 배열 선언과 접근",
      emoji: "🗃️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🗃️ 2D 배열이 뭐예요?",
          content: `지금까지 배운 배열은 **1차원(1D)**이었어요:

\`\`\`
DECLARE scores : ARRAY[1:5] OF INTEGER
\`\`\`

| 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|
| 85 | 92 | 78 | 90 | 88 |

이건 **한 줄짜리** 데이터예요.

그런데 **3명의 학생**이 **4과목**의 점수를 가지고 있다면?
이럴 때 **2D 배열(2차원 배열)**을 써요!

| | 과목1 | 과목2 | 과목3 | 과목4 |
|---|---|---|---|---|
| 학생1 | 85 | 92 | 78 | 90 |
| 학생2 | 70 | 88 | 95 | 82 |
| 학생3 | 90 | 75 | 80 | 96 |

2D 배열은 **행(row)**과 **열(column)**로 이루어진 **표(table)** 같아요!`
        },
        {
          id: "ch1-declare",
          type: "explain",
          title: "📝 2D 배열 선언하기",
          content: `CIE 수도코드에서 2D 배열을 선언하는 문법:

\`\`\`
DECLARE 이름 : ARRAY[행시작:행끝, 열시작:열끝] OF 자료형
\`\`\`

예시 - 3행 4열의 정수 배열:
\`\`\`
DECLARE grid : ARRAY[1:3, 1:4] OF INTEGER
\`\`\`

이렇게 하면 3 x 4 = **12칸**의 배열이 만들어져요!

| | 열1 | 열2 | 열3 | 열4 |
|---|---|---|---|---|
| 행1 | ? | ? | ? | ? |
| 행2 | ? | ? | ? | ? |
| 행3 | ? | ? | ? | ? |

더 많은 예시:
\`\`\`
DECLARE board : ARRAY[1:8, 1:8] OF STRING    // 체스판
DECLARE seats : ARRAY[1:5, 1:10] OF BOOLEAN  // 좌석 배치
DECLARE map : ARRAY[1:10, 1:10] OF CHAR      // 게임 맵
\`\`\``
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '5명의 학생이 3번의 시험 점수를 저장하는 2D 배열의 올바른 선언은?',
          options: [
            'DECLARE scores : ARRAY[1:5, 1:3] OF INTEGER',
            'DECLARE scores : ARRAY[1:5][1:3] OF INTEGER',
            'DECLARE scores : ARRAY[5, 3] OF INTEGER',
            'DECLARE scores : ARRAY[1:5] OF ARRAY[1:3] OF INTEGER'
          ],
          answer: 0,
          explanation: 'CIE 2D 배열은 **ARRAY[행시작:행끝, 열시작:열끝]** 형식이에요. 학생 5명(행) x 시험 3번(열)이므로 **ARRAY[1:5, 1:3]**이 맞아요!'
        },
        {
          id: "ch1-access",
          type: "explain",
          title: "🔢 2D 배열 값 넣기와 읽기",
          content: `2D 배열의 특정 칸에 접근하려면 **[행, 열]**을 써요:

\`\`\`
DECLARE grid : ARRAY[1:3, 1:4] OF INTEGER

// 값 넣기
grid[1, 1] ← 85
grid[1, 2] ← 92
grid[2, 1] ← 70
grid[2, 3] ← 95
grid[3, 4] ← 96

// 값 읽기
OUTPUT grid[1, 1]    // 85
OUTPUT grid[2, 3]    // 95
\`\`\`

| | 열1 | 열2 | 열3 | 열4 |
|---|---|---|---|---|
| 행1 | **85** | **92** | ? | ? |
| 행2 | **70** | ? | **95** | ? |
| 행3 | ? | ? | ? | **96** |

\`grid[행번호, 열번호]\` 이 순서를 꼭 기억하세요!
- 첫 번째 숫자 = **행** (위에서 아래)
- 두 번째 숫자 = **열** (왼쪽에서 오른쪽)`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE table : ARRAY[1:2, 1:3] OF INTEGER
table[1, 1] ← 10
table[1, 2] ← 20
table[1, 3] ← 30
table[2, 1] ← 40
table[2, 2] ← 50
table[2, 3] ← 60

OUTPUT table[2, 1] + table[1, 3]
\`\`\``,
          options: [
            '70',
            '50',
            '60',
            '90'
          ],
          answer: 0,
          explanation: 'table[2, 1]은 **40**, table[1, 3]은 **30**이에요. 40 + 30 = **70**!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '2D 배열에서 2행 3열의 값을 5로 설정하는 코드를 완성하세요.',
          codeTemplate: 'DECLARE grid : ARRAY[1:3, 1:4] OF INTEGER\ngrid[___, ___] ← 5',
          fillBlanks: [
            { id: 1, answer: "2", options: ["2", "3", "1", "4"] },
            { id: 2, answer: "3", options: ["3", "2", "4", "1"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "2D 배열과 반복문",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-nested",
          type: "explain",
          title: "🔄 중첩 FOR 반복문",
          content: `2D 배열의 **모든 값**을 처리하려면 **중첩 FOR 반복문**이 필요해요.

바깥쪽 FOR = **행** 순회
안쪽 FOR = **열** 순회

\`\`\`
DECLARE grid : ARRAY[1:2, 1:3] OF INTEGER

// 값 채우기
FOR row ← 1 TO 2
    FOR col ← 1 TO 3
        grid[row, col] ← row * 10 + col
    NEXT col
NEXT row
\`\`\`

실행 과정:
- row=1, col=1 → grid[1,1] ← 11
- row=1, col=2 → grid[1,2] ← 12
- row=1, col=3 → grid[1,3] ← 13
- row=2, col=1 → grid[2,1] ← 21
- row=2, col=2 → grid[2,2] ← 22
- row=2, col=3 → grid[2,3] ← 23

| | 열1 | 열2 | 열3 |
|---|---|---|---|
| 행1 | 11 | 12 | 13 |
| 행2 | 21 | 22 | 23 |`
        },
        {
          id: "ch2-output",
          type: "explain",
          title: "📤 2D 배열 출력하기",
          content: `2D 배열의 모든 값을 출력하는 코드:

\`\`\`
DECLARE grid : ARRAY[1:3, 1:3] OF INTEGER

// 값 채우기 (생략)

// 모든 값 출력
FOR row ← 1 TO 3
    FOR col ← 1 TO 3
        OUTPUT grid[row, col]
    NEXT col
NEXT row
\`\`\`

실전 예제 - 학생별 평균 구하기:

\`\`\`
DECLARE scores : ARRAY[1:3, 1:4] OF INTEGER
DECLARE avg : REAL
DECLARE total : INTEGER

FOR student ← 1 TO 3
    total ← 0
    FOR subject ← 1 TO 4
        total ← total + scores[student, subject]
    NEXT subject
    avg ← total / 4
    OUTPUT "학생 " & student & "의 평균: " & avg
NEXT student
\`\`\`

바깥쪽 FOR는 **학생 번호**, 안쪽 FOR는 **과목 번호**를 순회해요!`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '3행 5열의 2D 배열을 모두 순회하면 중첩 FOR 반복문의 안쪽 코드는 총 몇 번 실행될까요?',
          options: [
            '15번',
            '8번',
            '3번',
            '5번'
          ],
          answer: 0,
          explanation: '바깥쪽 FOR가 3번 반복하고, 각각에 대해 안쪽 FOR가 5번 반복하므로 3 x 5 = **15번** 실행돼요!'
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE grid : ARRAY[1:2, 1:2] OF INTEGER
grid[1, 1] ← 1
grid[1, 2] ← 2
grid[2, 1] ← 3
grid[2, 2] ← 4

DECLARE total : INTEGER
total ← 0

FOR row ← 1 TO 2
    FOR col ← 1 TO 2
        total ← total + grid[row, col]
    NEXT col
NEXT row

OUTPUT total
\`\`\``,
          options: [
            '10',
            '4',
            '6',
            '7'
          ],
          answer: 0,
          explanation: '모든 칸을 더해요: 1 + 2 + 3 + 4 = **10**. 중첩 FOR 반복문이 2x2 배열의 모든 값을 순회해요!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '3행 4열의 2D 배열을 모두 0으로 초기화하는 코드를 완성하세요.',
          codeTemplate: 'DECLARE grid : ARRAY[1:3, 1:4] OF INTEGER\n\nFOR row ← 1 TO 3\n    FOR col ← 1 ___ 4\n        grid[row, ___] ← 0\n    NEXT col\nNEXT row',
          fillBlanks: [
            { id: 1, answer: "TO", options: ["TO", "UNTIL", "WHILE", "IN"] },
            { id: 2, answer: "col", options: ["col", "row", "i", "grid"] }
          ]
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 종합 예측!",
          content: `다음 수도코드의 결과는?

\`\`\`
DECLARE matrix : ARRAY[1:3, 1:3] OF INTEGER

FOR i ← 1 TO 3
    FOR j ← 1 TO 3
        IF i = j THEN
            matrix[i, j] ← 1
        ELSE
            matrix[i, j] ← 0
        ENDIF
    NEXT j
NEXT i

OUTPUT matrix[1, 1]
OUTPUT matrix[1, 2]
OUTPUT matrix[2, 2]
OUTPUT matrix[3, 1]
\`\`\``,
          options: [
            '1\n0\n1\n0',
            '1\n1\n1\n1',
            '0\n0\n0\n0',
            '1\n0\n0\n1'
          ],
          answer: 0,
          explanation: 'i = j인 칸(대각선)만 1이고 나머지는 0이에요. [1,1]=1, [1,2]=0(1!=2), [2,2]=1, [3,1]=0(3!=1). 이것은 **단위행렬(identity matrix)**이라고 해요!'
        }
      ]
    }
  ]
}
