// ============================================
// 수도코드 레슨 19: Trace Table
// CIE 스타일 수도코드 - 변수 값 변화를 표로 추적
// ============================================

import { LessonData } from '../types'

export const pseudoLesson19Data: LessonData = {
  id: "pseudo-19",
  title: "Trace Table",
  emoji: "📋",
  description: "변수 값을 표로 추적하자!",
  chapters: [
    {
      id: "ch1",
      title: "Trace Table이란?",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📝 Trace Table이 뭐예요?",
          content: `프로그램이 실행될 때 **변수의 값이 어떻게 변하는지** 궁금한 적 있나요?

**Trace Table(추적 표)**은 프로그램을 한 줄씩 실행하면서 **변수의 값 변화를 표로 기록**하는 방법이에요!

예를 들어, 이 코드를 봐요:
\`\`\`
x ← 5
x ← x + 3
x ← x * 2
OUTPUT x
\`\`\`

Trace Table로 추적하면:

| 단계 | x | OUTPUT |
|------|---|--------|
| x ← 5 | 5 | |
| x ← x + 3 | 8 | |
| x ← x * 2 | 16 | |
| OUTPUT x | 16 | 16 |

**최종 답: 16**

이렇게 표를 그리면 프로그램의 동작을 정확하게 파악할 수 있어요!`
        },
        {
          id: "ch1-why",
          type: "explain",
          title: "🎯 왜 Trace Table이 중요한가요?",
          content: `Trace Table은 **IGCSE/O-Level 시험의 핵심 주제**예요!

Trace Table이 중요한 이유:

**1) 시험에서 자주 출제돼요**
- "이 코드의 Trace Table을 완성하세요" 같은 문제가 나와요
- 보통 5~8점짜리 문제예요!

**2) 프로그램을 디버깅할 수 있어요**
- 코드에 버그가 있을 때 Trace Table로 어디서 잘못되었는지 찾을 수 있어요

**3) 알고리즘을 이해할 수 있어요**
- 복잡한 알고리즘도 한 줄씩 따라가면 이해할 수 있어요

Trace Table을 그리는 규칙:
- 열(column)은 각 **변수**와 **OUTPUT** 하나씩
- 행(row)은 변수 값이 **변할 때마다** 한 줄 추가
- 값이 변하지 않은 변수는 **빈칸으로 두거나 이전 값**을 그대로 써요`
        },
        {
          id: "ch1-practice",
          type: "predict",
          title: "🔮 Trace Table을 따라가 봐요!",
          content: `다음 코드의 최종 OUTPUT은?

\`\`\`
a ← 10
b ← 3
a ← a - b
b ← b + 1
a ← a + b
OUTPUT a
\`\`\`

| 단계 | a | b | OUTPUT |
|------|---|---|--------|
| a ← 10 | 10 | | |
| b ← 3 | | 3 | |
| a ← a - b | 7 | | |
| b ← b + 1 | | 4 | |
| a ← a + b | ? | | |`,
          options: [
            '11',
            '7',
            '10',
            '14'
          ],
          answer: 0,
          explanation: 'a ← a - b → a = 10 - 3 = 7. b ← b + 1 → b = 3 + 1 = 4. a ← a + b → a = 7 + 4 = **11**. Trace Table을 한 줄씩 따라가면 정확한 답을 구할 수 있어요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Trace Table 빈칸 채우기!",
          content: 'x ← 4, y ← 6, x ← x + y를 실행하면 x의 값은?',
          codeTemplate: 'x ← 4\ny ← 6\nx ← x + y\n\n// x의 최종 값: ___',
          fillBlanks: [
            { id: 1, answer: "10", options: ["10", "6", "4", "24"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "반복문 Trace Table",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔄 FOR 반복문 Trace Table",
          content: `반복문이 있는 코드는 Trace Table이 더 길어져요!

\`\`\`
total ← 0
FOR i ← 1 TO 3
    total ← total + i
NEXT i
OUTPUT total
\`\`\`

| i | total | OUTPUT |
|---|-------|--------|
| | 0 | |
| 1 | 1 | |
| 2 | 3 | |
| 3 | 6 | |
| | | 6 |

추적 과정:
- 처음: total = 0
- i = 1: total = 0 + 1 = **1**
- i = 2: total = 1 + 2 = **3**
- i = 3: total = 3 + 3 = **6**
- OUTPUT: **6**

반복문의 각 반복(iteration)마다 한 행씩 추가해요!`
        },
        {
          id: "ch2-while",
          type: "explain",
          title: "🔁 WHILE 반복문 Trace Table",
          content: `WHILE 반복문도 같은 방식으로 추적해요!

\`\`\`
count ← 1
total ← 0
WHILE count <= 4
    total ← total + count
    count ← count + 1
ENDWHILE
OUTPUT total
\`\`\`

| count | total | count <= 4? | OUTPUT |
|-------|-------|-------------|--------|
| 1 | 0 | | |
| | 1 | Yes | |
| 2 | | | |
| | 3 | Yes | |
| 3 | | | |
| | 6 | Yes | |
| 4 | | | |
| | 10 | Yes | |
| 5 | | No → 종료 | |
| | | | 10 |

WHILE은 **조건을 매번 확인**해요! count가 5가 되면 조건이 거짓이 되어 반복이 끝나요.

시험 팁: WHILE의 조건 검사 결과도 표에 적으면 더 정확해요!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 FOR 반복문 추적하기!",
          content: `다음 코드의 OUTPUT은?

\`\`\`
result ← 1
FOR i ← 1 TO 4
    result ← result * 2
NEXT i
OUTPUT result
\`\`\`

Trace Table을 그려보세요:

| i | result |
|---|--------|
| | 1 |
| 1 | ? |
| 2 | ? |
| 3 | ? |
| 4 | ? |`,
          options: [
            '16',
            '8',
            '32',
            '4'
          ],
          answer: 0,
          explanation: 'result = 1 → 1*2=2 → 2*2=4 → 4*2=8 → 8*2=**16**. 매 반복마다 2를 곱하니까 2의 4승(2^4) = 16이에요!'
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 WHILE 반복문 추적하기!",
          content: `다음 코드에서 "Hello"는 몇 번 출력될까요?

\`\`\`
n ← 10
WHILE n > 1
    OUTPUT "Hello"
    n ← n DIV 2
ENDWHILE
\`\`\`

| n | n > 1? | OUTPUT |
|---|--------|--------|
| 10 | Yes | Hello |
| 5 | Yes | Hello |
| 2 | Yes | Hello |
| 1 | No | |`,
          options: [
            '3번',
            '4번',
            '2번',
            '10번'
          ],
          answer: 0,
          explanation: 'n = 10 → 10 DIV 2 = 5 (Hello), n = 5 → 5 DIV 2 = 2 (Hello), n = 2 → 2 DIV 2 = 1 (Hello), n = 1 → 조건 거짓 → 종료. 총 **3번** 출력돼요!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Trace Table 완성하기!",
          content: 'FOR i ← 1 TO 3, sum ← sum + i*i를 실행할 때, i = 3일 때 sum의 값은? (초기값 sum ← 0)',
          codeTemplate: 'sum ← 0\nFOR i ← 1 TO 3\n    sum ← sum + i * i\nNEXT i\n\n// i=1: sum = 0+1 = 1\n// i=2: sum = 1+4 = 5\n// i=3: sum = 5+9 = ___',
          fillBlanks: [
            { id: 1, answer: "14", options: ["14", "9", "6", "15"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "알고리즘 Trace Table",
      emoji: "🔍",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "🔍 검색 알고리즘 Trace Table",
          content: `시험에서는 검색이나 정렬 알고리즘의 Trace Table을 그리는 문제가 자주 나와요!

**선형 검색에서 7을 찾아보기:**
\`\`\`
DECLARE arr : ARRAY[1:5] OF INTEGER
arr ← [3, 7, 1, 9, 5]
search ← 7
found ← FALSE
i ← 1

WHILE i <= 5 AND found = FALSE
    IF arr[i] = search THEN
        found ← TRUE
        OUTPUT "위치: ", i
    ENDIF
    i ← i + 1
ENDWHILE
\`\`\`

| i | arr[i] | arr[i] = 7? | found | OUTPUT |
|---|--------|-------------|-------|--------|
| 1 | 3 | No | FALSE | |
| 2 | 7 | Yes | TRUE | 위치: 2 |

2번 비교만에 찾았어요!

시험 팁: 검색 알고리즘의 Trace Table에서는 **비교 횟수**도 중요한 포인트예요!`
        },
        {
          id: "ch3-sort",
          type: "explain",
          title: "📊 버블 정렬 Trace Table",
          content: `버블 정렬의 한 패스(pass)를 Trace Table로 추적해 볼게요!

배열: [5, 3, 8, 1]의 첫 번째 패스:

\`\`\`
FOR j ← 1 TO 3
    IF arr[j] > arr[j + 1] THEN
        temp ← arr[j]
        arr[j] ← arr[j + 1]
        arr[j + 1] ← temp
    ENDIF
NEXT j
\`\`\`

| j | arr[j] | arr[j+1] | 비교 | Swap? | 배열 상태 |
|---|--------|----------|------|-------|-----------|
| 1 | 5 | 3 | 5 > 3? | Yes | [3, 5, 8, 1] |
| 2 | 5 | 8 | 5 > 8? | No | [3, 5, 8, 1] |
| 3 | 8 | 1 | 8 > 1? | Yes | [3, 5, 1, 8] |

첫 번째 패스 후: [3, 5, 1, 8]
- 가장 큰 값 **8**이 맨 뒤로 갔어요!

시험에서는 이런 표를 완성하라는 문제가 많이 나와요!`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 검색 Trace Table 완성하기!",
          content: `배열 [4, 9, 2, 6, 8]에서 선형 검색으로 6을 찾을 때, 몇 번째 비교에서 찾을까요?

\`\`\`
arr ← [4, 9, 2, 6, 8]
search ← 6

FOR i ← 1 TO 5
    IF arr[i] = search THEN
        OUTPUT "찾았다! 위치: ", i
    ENDIF
NEXT i
\`\`\`

| i | arr[i] | arr[i] = 6? |
|---|--------|-------------|
| 1 | 4 | No |
| 2 | 9 | No |
| 3 | 2 | No |
| 4 | ? | ? |`,
          options: [
            '4번째 비교에서 찾음',
            '3번째 비교에서 찾음',
            '5번째 비교에서 찾음',
            '찾지 못함'
          ],
          answer: 0,
          explanation: 'i = 1: 4 != 6, i = 2: 9 != 6, i = 3: 2 != 6, i = 4: 6 = 6! **4번째 비교**에서 찾아요. 선형 검색은 처음부터 하나씩 확인하기 때문에, 값이 뒤에 있을수록 비교 횟수가 늘어나요!'
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 시험 스타일 퀴즈!",
          content: '다음 중 Trace Table을 그릴 때 올바른 방법은?',
          options: [
            '변수 값이 변할 때마다 새로운 행을 추가하고, 변하지 않는 변수는 빈칸으로 둔다',
            '코드의 모든 줄에 대해 모든 변수를 다시 쓴다',
            '최종 값만 기록한다',
            'OUTPUT만 기록한다'
          ],
          answer: 0,
          explanation: 'Trace Table은 **변수 값이 변할 때마다 새로운 행**을 추가해요. 변하지 않은 변수는 빈칸으로 두거나 이전 값을 반복해도 돼요. 이것이 시험에서 점수를 받는 핵심이에요!'
        },
        {
          id: "ch3-predict2",
          type: "predict",
          title: "🔮 삽입 정렬 Trace Table!",
          content: `배열 [6, 3, 5]에 삽입 정렬을 적용할 때, i = 2 단계에서 일어나는 일은?

\`\`\`
i = 2, key = arr[2] = 3, j = 1

WHILE j >= 1 AND arr[j] > key
    arr[j + 1] ← arr[j]
    j ← j - 1
ENDWHILE
arr[j + 1] ← key
\`\`\`

| j | arr[j] | arr[j] > 3? | 동작 |
|---|--------|-------------|------|
| 1 | 6 | Yes | arr[2] ← 6, j ← 0 |

i = 2 단계 후 배열은?`,
          options: [
            '[3, 6, 5]',
            '[6, 3, 5]',
            '[3, 5, 6]',
            '[5, 3, 6]'
          ],
          answer: 0,
          explanation: 'key = 3, j = 1에서 arr[1] = 6 > 3이므로 6을 오른쪽으로 밀어요. j = 0이 되어 WHILE 종료. arr[0 + 1] = arr[1] <- 3. 결과: **[3, 6, 5]**'
        }
      ]
    }
  ]
}
