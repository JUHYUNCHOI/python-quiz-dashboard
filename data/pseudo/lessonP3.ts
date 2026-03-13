// ============================================
// 수도코드 기출문제 연습: Part 3
// Trace Table, 정렬, 확장 프로그래밍
// IGCSE 0478 Paper 2 스타일
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP3Data: LessonData = {
  id: "pseudo-p3",
  title: "기출문제 연습 3",
  emoji: "📝",
  description: "Part 3 기출문제 스타일 연습!",
  chapters: [
    {
      id: "ch1",
      title: "Trace Table",
      emoji: "📊",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📊 Trace Table이란?",
          content: `IGCSE Paper 2에서 **Q6a / Q7a**에 자주 나오는 문제 유형이에요!

**Trace Table**은 프로그램이 실행될 때 변수의 값이 **어떻게 변하는지** 한 줄씩 추적하는 표예요.

간단한 예시를 볼게요:

\`\`\`
Count ← 0
FOR i ← 1 TO 3
    Count ← Count + 2
NEXT i
OUTPUT Count
\`\`\`

| i | Count |
|---|-------|
|   | 0     |
| 1 | 2     |
| 2 | 4     |
| 3 | 6     |

➡️ OUTPUT: **6**

Trace Table 작성 팁:
- 📌 **모든 변수**를 열(column)으로 만들기
- 📌 값이 **바뀔 때마다** 새 행(row)에 기록
- 📌 반복문은 **매 반복마다** 새 행 추가
- 📌 조건문 결과도 추적하면 좋아요!`
        },
        {
          id: "ch1-code",
          type: "explain",
          title: "📋 Trace Table 문제",
          content: `다음 수도코드를 분석해 봐요. 시험에서 이런 코드를 주고 Trace Table을 작성하라고 해요!

\`\`\`
DECLARE X : INTEGER
DECLARE Y : INTEGER
DECLARE Z : INTEGER
X ← 5
Y ← 3
Z ← 0
WHILE X > 0
    Z ← Z + Y
    X ← X - 1
ENDWHILE
OUTPUT Z
\`\`\`

Trace Table:

| 반복 | X | Y | Z | X > 0? |
|------|---|---|---|--------|
| 초기 | 5 | 3 | 0 |        |
| 1회  | 4 | 3 | 3 | TRUE   |
| 2회  | 3 | 3 | 6 | TRUE   |
| 3회  | 2 | 3 | 9 | TRUE   |
| 4회  | 1 | 3 | 12| TRUE   |
| 5회  | 0 | 3 | 15| TRUE   |
| 종료 |   |   |   | FALSE  |

한 줄씩 천천히 따라가 봐요! 🔍`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "🧠 1회 반복 후 Z의 값",
          content: `위의 수도코드에서 **1번째 반복이 끝난 후** Z의 값은?

\`\`\`
X ← 5, Y ← 3, Z ← 0

WHILE X > 0
    Z ← Z + Y    ← Z = 0 + 3 = ?
    X ← X - 1
ENDWHILE
\`\`\``,
          options: [
            '3',
            '0',
            '5',
            '8'
          ],
          answer: 0,
          explanation: `1번째 반복:
- Z ← Z + Y = 0 + 3 = **3**
- X ← X - 1 = 5 - 1 = 4

Z는 매 반복마다 Y(= 3)씩 증가해요!`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "🧠 3회 반복 후 X의 값",
          content: `**3번째 반복이 끝난 후** X의 값은?

힌트: X는 매 반복마다 1씩 감소해요.

\`\`\`
초기: X = 5
1회 후: X = 4
2회 후: X = 3
3회 후: X = ?
\`\`\``,
          options: [
            '2',
            '3',
            '1',
            '0'
          ],
          answer: 0,
          explanation: `X는 매 반복마다 1씩 감소해요:
- 초기: X = 5
- 1회 후: X = 4
- 2회 후: X = 3
- 3회 후: X = **2**

X가 0이 되면 WHILE X > 0 조건이 FALSE가 되어 멈춰요!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 최종 출력 예측",
          content: `다음 코드의 **최종 OUTPUT**은?

\`\`\`
X ← 5
Y ← 3
Z ← 0
WHILE X > 0
    Z ← Z + Y
    X ← X - 1
ENDWHILE
OUTPUT Z
\`\`\`

Trace Table을 완성해 보세요:

| 반복 | X | Z |
|------|---|---|
| 초기 | 5 | 0 |
| 1회  | 4 | 3 |
| 2회  | 3 | 6 |
| 3회  | 2 | 9 |
| 4회  | 1 | 12 |
| 5회  | 0 | ? |`,
          options: [
            '15',
            '12',
            '18',
            '5'
          ],
          answer: 0,
          explanation: `5회 반복 후:
- Z = 0 + 3 + 3 + 3 + 3 + 3 = **15**

Z는 Y(= 3)를 X(= 5)번 더한 거예요.
즉, 3 × 5 = **15**!`
        },
        {
          id: "ch1-q3",
          type: "quiz",
          title: "🧠 알고리즘의 기능",
          content: `이 알고리즘은 결과적으로 **어떤 연산**을 수행하는 건가요?

\`\`\`
X ← 5, Y ← 3, Z ← 0
WHILE X > 0
    Z ← Z + Y
    X ← X - 1
ENDWHILE
OUTPUT Z    // 결과: 15
\`\`\`

💡 Y를 X번 반복해서 더하면...?`,
          options: [
            'X * Y (반복 덧셈으로 곱셈 계산)',
            'X + Y (두 수의 합)',
            'X ^ Y (거듭제곱)',
            'X MOD Y (나머지)'
          ],
          answer: 0,
          explanation: `Y를 X번 반복해서 더하는 것은 **곱셈(Multiplication)**이에요!

Z = Y + Y + Y + ... (X번)
Z = Y × X = 3 × 5 = **15**

이것을 **반복 덧셈에 의한 곱셈(multiplication by repeated addition)**이라고 해요.

⚠️ 시험에서 "이 알고리즘의 목적(purpose)을 설명하세요"라는 문제가 자주 나와요!`
        }
      ]
    },
    {
      id: "ch2",
      title: "정렬 알고리즘",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔄 정렬 알고리즘 분석 (IGCSE Q6 스타일)",
          content: `IGCSE 시험에서는 **의미 없는 변수명(non-meaningful identifiers)**으로 된 코드를 주고 분석하라고 해요!

다음 수도코드를 분석해 보세요:

\`\`\`
01 DECLARE A[1:10] : STRING
02 DECLARE T : STRING
03 DECLARE C, L : INTEGER
04 L ← 10
05 FOR C ← 1 TO L
06     FOR J ← 1 TO L - 1
07         IF A[J] > A[J + 1]
08             THEN
09                 T ← A[J]
10                 A[J] ← A[J + 1]
11                 A[J + 1] ← T
12             ENDIF
13     NEXT J
14 NEXT C
15 FOR C ← 1 TO L
16     OUTPUT A[C]
17 NEXT C
\`\`\`

이 코드가 무엇을 하는지 단계별로 분석해 봐요! 🔍

핵심 포인트:
- 📌 \`A[J] > A[J + 1]\` → **인접한 원소를 비교**
- 📌 09~11줄 → **교환(swap)** 작업
- 📌 이중 FOR 반복문 → 여러 번 반복`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "🧠 알고리즘의 목적",
          content: `위의 수도코드(01~17줄)의 **목적(purpose)**은 무엇인가요?

힌트:
- \`A[J] > A[J + 1]\`로 인접한 원소를 비교해요
- 조건이 맞으면 **교환(swap)**해요
- 이것을 여러 번 반복해요`,
          options: [
            '문자열을 오름차순(알파벳순)으로 정렬',
            '문자열에서 특정 값을 검색',
            '배열의 합계를 계산',
            '배열에서 중복 값을 제거'
          ],
          answer: 0,
          explanation: `이것은 **버블 정렬(Bubble Sort)** 알고리즘이에요!

A는 STRING 배열이고, \`A[J] > A[J + 1]\`에서 ">"는 **알파벳순 비교**를 해요.

큰 값을 뒤로 보내면서 **오름차순(ascending / alphabetical order)**으로 정렬해요.

15~17줄은 정렬된 결과를 **출력**하는 부분이에요.`
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "🧠 4가지 프로세스",
          content: `이 알고리즘은 4가지 주요 프로세스를 수행해요.

\`\`\`
01 DECLARE A[1:10] : STRING    ← 데이터 저장
05-14 이중 FOR 반복문           ← 정렬 과정
07 IF A[J] > A[J + 1]          ← ???
09-11 T ← A[J] ...             ← ???
15-17 FOR ... OUTPUT A[C]      ← 출력
\`\`\`

07줄의 프로세스는?`,
          options: [
            '인접한 두 원소를 비교 (compare adjacent elements)',
            '배열의 길이를 확인',
            '변수 T에 값을 저장',
            '반복문을 종료'
          ],
          answer: 0,
          explanation: `07줄 \`IF A[J] > A[J + 1]\`은 **인접한 두 원소를 비교**하는 과정이에요!

4가지 프로세스:
1. 📥 **입력/저장** - 이름을 배열에 저장
2. 🔍 **비교** - 인접한 원소를 비교 (07줄)
3. 🔄 **교환** - 순서가 잘못되면 swap (09~11줄)
4. 📤 **출력** - 정렬된 결과를 출력 (15~17줄)`
        },
        {
          id: "ch2-q3",
          type: "quiz",
          title: "🏷️ 의미 있는 식별자 - 배열 A",
          content: `배열 \`A\`는 10개의 **STRING** 값을 저장하고 정렬하는 배열이에요.

\`A\`에 적합한 **의미 있는 식별자(meaningful identifier)**는?`,
          options: [
            'Names',
            'Data',
            'Array1',
            'X'
          ],
          answer: 0,
          explanation: `**Names**가 가장 적합해요!

STRING 배열이고 정렬하는 대상이니까, "Names"(이름들)이 가장 명확해요.

💡 시험에서 meaningful identifier를 제안할 때:
- ❌ 한 글자 (A, T, C) → 의미 없음
- ❌ 너무 일반적 (Data, Array1) → 구체적이지 않음
- ✅ 구체적이고 설명적 (Names, StudentNames) → 좋음!`
        },
        {
          id: "ch2-q4",
          type: "quiz",
          title: "🏷️ 의미 있는 식별자 - 변수 T",
          content: `변수 \`T\`는 교환(swap) 과정에서 값을 **임시로 저장**하는 역할이에요.

\`\`\`
09  T ← A[J]           // A[J]를 임시 저장
10  A[J] ← A[J + 1]    // A[J+1]을 A[J]로
11  A[J + 1] ← T       // 임시 저장한 값을 A[J+1]로
\`\`\`

\`T\`에 적합한 **의미 있는 식별자**는?`,
          options: [
            'Temp',
            'Store',
            'Hold',
            'Buffer'
          ],
          answer: 0,
          explanation: `**Temp** (또는 TempName)이 가장 적합해요!

교환할 때 값을 **임시(temporary)**로 보관하는 변수니까요.

전체 변수 이름 개선:
- A → **Names**
- T → **Temp** (또는 TempName)
- C → **Counter** (또는 Pass)
- L → **ListLength** (또는 NumberOfNames)
- J → **Index** (또는 Position)`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 교환(Swap) 코드 완성",
          content: `버블 정렬에서 **교환(swap)** 작업을 완성하세요!

A[J]와 A[J+1]을 교환하려면 임시 변수 T가 필요해요.`,
          code: 'T ← A[J]\nA[J] ← A[___]\nA[J + 1] ← ___',
          fillBlanks: [
            { id: 1, answer: "J + 1", options: ["J + 1", "J - 1", "J", "L"] },
            { id: 2, answer: "T", options: ["T", "A[J]", "A[J + 1]", "C"] }
          ]
        },
        {
          id: "ch2-q5",
          type: "quiz",
          title: "🧠 코드 이해도 향상 방법",
          content: `이 알고리즘을 **더 쉽게 이해**할 수 있게 만드는 방법 **두 가지**는?

\`\`\`
DECLARE A[1:10] : STRING
DECLARE T : STRING
DECLARE C, L : INTEGER
\`\`\``,
          options: [
            '의미 있는 식별자 사용 + 주석(comments) 추가',
            '변수를 더 많이 선언 + 줄 번호 추가',
            '모든 변수를 대문자로 + 공백 제거',
            'FOR문을 WHILE문으로 변경 + 들여쓰기 제거'
          ],
          answer: 0,
          explanation: `두 가지 방법:

1. ✅ **의미 있는 식별자(Meaningful Identifiers)** 사용
   - A → Names, T → Temp, C → Counter

2. ✅ **주석(Comments)** 추가
   - \`// 인접한 이름을 비교하여 교환\`
   - \`// 정렬된 이름 목록 출력\`

⚠️ 시험에서 "State two ways to make this algorithm easier to understand"라는 문제가 자주 나와요!`
        }
      ]
    },
    {
      id: "ch3",
      title: "확장 프로그래밍",
      emoji: "🚀",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "🚀 확장 프로그래밍 문제 (Q10/Q11 스타일)",
          content: `IGCSE Paper 2의 **Q10/Q11**에서는 시나리오를 주고 수도코드를 **작성하거나 완성**하라고 해요!

📋 **시나리오:**
학교에서 학생 5명의 시험 점수를 관리하려고 해요.
1D 배열 \`Scores[1:5]\`에 점수를 저장해요.

프로그램은 다음을 수행해야 해요:
1. 📥 점수를 **입력**받고 **검증** (0~100 범위)
2. 📊 **평균(Average)** 계산
3. 🏆 **최고 점수(Max)** 찾기
4. 📤 결과 **출력**

각 단계를 하나씩 구현해 볼게요!

💡 시험 팁: 이런 문제에서는 **입력 검증**, **합계/평균 계산**, **최대값 찾기**가 자주 출제돼요!`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ 입력 검증 코드 완성",
          content: `학생 5명의 점수를 입력받되, **0 이상 100 이하**인 값만 받아들이는 코드를 완성하세요.

REPEAT...UNTIL 구조를 사용해요!`,
          code: 'FOR i ← 1 TO 5\n    REPEAT\n        OUTPUT "Enter score for student ", i\n        INPUT Scores[i]\n    ___ Scores[i] >= 0 ___ Scores[i] <= 100\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "UNTIL", options: ["UNTIL", "WHILE", "IF", "ENDWHILE"] },
            { id: 2, answer: "AND", options: ["AND", "OR", "NOT", "THEN"] }
          ]
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "✏️ 평균 & 최고 점수 코드 완성",
          content: `합계(Total), 최고 점수(Max), 평균(Average)을 구하는 코드를 완성하세요.

💡 포인트:
- Max는 Scores[1]로 초기화해요
- 각 점수를 Max와 비교해요
- 평균 = 합계 / 개수`,
          code: 'Total ← 0\nMax ← Scores[1]\nFOR i ← 1 TO 5\n    Total ← Total + Scores[i]\n    IF Scores[i] ___ Max THEN\n        Max ← ___\n    ENDIF\nNEXT i\nAverage ← Total ___ 5',
          fillBlanks: [
            { id: 1, answer: ">", options: [">", "<", ">=", "="] },
            { id: 2, answer: "Scores[i]", options: ["Scores[i]", "Total", "Max", "i"] },
            { id: 3, answer: "/", options: ["/", "*", "DIV", "MOD"] }
          ]
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 평균 계산 결과 예측",
          content: `점수가 다음과 같을 때 **Average**의 값은?

\`\`\`
Scores[1] = 80
Scores[2] = 65
Scores[3] = 92
Scores[4] = 45
Scores[5] = 78
\`\`\`

계산:
\`\`\`
Total = 0
Total = 0 + 80 = 80
Total = 80 + 65 = 145
Total = 145 + 92 = 237
Total = 237 + 45 = 282
Total = 282 + 78 = 360
Average = 360 / 5 = ?
\`\`\``,
          options: [
            '72',
            '360',
            '92',
            '65'
          ],
          answer: 0,
          explanation: `Total = 80 + 65 + 92 + 45 + 78 = **360**
Average = 360 / 5 = **72**

💡 시험에서는 계산 과정을 보여달라고 할 수도 있어요.
반드시 **Total을 먼저 구하고** 나눗셈하는 순서를 지켜야 해요!`
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "🧠 Max 초기값의 이유",
          content: `왜 \`Max ← Scores[1]\`로 초기화하나요?

\`Max ← 0\`으로 해도 될까요?

\`\`\`
Max ← Scores[1]    // 왜 이렇게?
FOR i ← 1 TO 5
    IF Scores[i] > Max THEN
        Max ← Scores[i]
    ENDIF
NEXT i
\`\`\``,
          options: [
            'Max가 항상 배열의 실제 값으로 시작해야 하므로 (더 안정적)',
            'Scores[1]이 항상 가장 큰 값이므로',
            '0으로 초기화하면 오류가 발생하므로',
            '특별한 이유 없이 관례적으로'
          ],
          answer: 0,
          explanation: `\`Max ← Scores[1]\`로 초기화하면 Max는 **항상 배열에 있는 실제 값**으로 시작해요.

\`Max ← 0\`으로 하면 문제가 생길 수 있어요:
- 만약 모든 점수가 **음수**라면? (이론적으로)
- Max = 0이 실제 점수보다 클 수 있어요!

배열의 첫 번째 값으로 초기화하면:
- ✅ 항상 **실제 데이터**에서 시작
- ✅ 어떤 값이 들어와도 올바르게 동작
- ✅ 더 **안정적(robust)**인 방법!

💡 시험에서 "Why is Max set to the first element?"라고 물어볼 수 있어요!`
        }
      ]
    }
  ]
}
