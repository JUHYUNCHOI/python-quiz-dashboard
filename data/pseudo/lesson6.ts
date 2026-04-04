// ============================================
// 수도코드 레슨 6: 반복문 1
// FOR...TO...NEXT, WHILE...ENDWHILE
// ============================================

import { LessonData } from '../types'

export const pseudoLesson6Data: LessonData = {
  id: "pseudo-6",
  title: "반복문 1",
  emoji: "🔁",
  description: "FOR와 WHILE 반복!",
  chapters: [
    {
      id: "ch1",
      title: "FOR 반복문",
      emoji: "🔢",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔁 반복문이란?",
          content: `같은 코드를 여러 번 쓰는 건 너무 힘들어요!

"안녕!" 을 5번 출력하고 싶다면?

\`\`\`
OUTPUT "안녕!"
OUTPUT "안녕!"
OUTPUT "안녕!"
OUTPUT "안녕!"
OUTPUT "안녕!"
\`\`\`

이렇게 5번 쓰면... 100번이면 어떡해요? 😱

**반복문**을 사용하면 한 번만 쓸 수 있어요!

\`\`\`
FOR i ← 1 TO 5
    OUTPUT "안녕!"
NEXT i
\`\`\`

이 코드 3줄이 위의 5줄과 같은 일을 해요!`
        },
        {
          id: "ch1-detail",
          type: "explain",
          title: "📋 FOR 반복문의 동작 방식",
          content: `단계별로 살펴봐요:

\`\`\`
FOR counter ← 1 TO 3
    OUTPUT "안녕!"
NEXT counter
\`\`\`

| 단계 | counter | 동작 |
|---|---|---|
| 1번째 | 1 | OUTPUT "안녕!" |
| 2번째 | 2 | OUTPUT "안녕!" |
| 3번째 | 3 | OUTPUT "안녕!" |

결과:
\`\`\`
안녕!
안녕!
안녕!
\`\`\`

핵심 규칙:
- counter는 첫 번째 숫자(1)에서 **시작**해요
- 매번 **1씩 증가**해요
- 마지막 숫자(3)에 도달하면 **멈춰요**
- 항상 **NEXT 변수이름**으로 닫아야 해요!`
        },
        {
          id: "ch1-step",
          type: "explain",
          title: "⏩ STEP 사용하기",
          content: `**STEP**을 사용하면 counter가 증가하는 양을 바꿀 수 있어요:

\`\`\`
FOR i ← 0 TO 10 STEP 2
    OUTPUT i
NEXT i
\`\`\`

결과:
\`\`\`
0
2
4
6
8
10
\`\`\`

매번 2씩 증가해요!

역방향 카운트도 가능해요:
\`\`\`
FOR i ← 5 TO 1 STEP -1
    OUTPUT i
NEXT i
\`\`\`

결과: 5, 4, 3, 2, 1 — 카운트다운!`
        },
        {
          id: "ch1-syntax",
          type: "explain",
          title: "📝 FOR...TO...NEXT 문법",
          content: `FOR 반복문의 구조를 알아봐요!

\`\`\`
FOR 변수 ← 시작값 TO 끝값
    반복할 코드
NEXT 변수
\`\`\`

- **변수**: 반복 횟수를 세는 카운터 (보통 i 사용)
- **시작값**: 카운터의 시작
- **끝값**: 카운터의 끝 (이 값까지 포함!)
- **NEXT 변수**: 카운터를 1 증가시키고 다시 반복

예시:

\`\`\`
FOR i ← 1 TO 5
    OUTPUT i
NEXT i
\`\`\`

결과:
\`\`\`
1
2
3
4
5
\`\`\`

i가 1부터 5까지 하나씩 증가하면서 출력돼요!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
FOR i ← 1 TO 3
    OUTPUT i * 10
NEXT i
\`\`\``,
          options: [
            '10\n20\n30',
            '1\n2\n3',
            '10\n10\n10',
            '30'
          ],
          answer: 0,
          explanation: 'i가 1일 때 `1*10=10`, i가 2일 때 `2*10=20`, i가 3일 때 `3*10=30`이 각각 출력돼요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '1부터 10까지 숫자를 출력하는 반복문을 완성하세요.',
          code: '___ i ← 1 ___ 10\n    OUTPUT i\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "FOR", options: ["FOR", "WHILE", "REPEAT", "LOOP"] },
            { id: 2, answer: "TO", options: ["TO", "UNTIL", "UPTO", "THROUGH"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "WHILE 반복문",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔄 WHILE 반복문이란?",
          content: `FOR 반복문은 **몇 번 반복할지 정해져** 있어요.

하지만 "**조건이 참인 동안** 계속 반복"하고 싶다면?

**WHILE** 반복문을 써요!

\`\`\`
WHILE 조건
    반복할 코드
ENDWHILE
\`\`\`

조건이 **참(TRUE)**인 동안 계속 반복하고,
조건이 **거짓(FALSE)**이 되면 멈춰요!

\`\`\`
count ← 1
WHILE count <= 5
    OUTPUT count
    count ← count + 1
ENDWHILE
\`\`\`

결과:
\`\`\`
1
2
3
4
5
\`\`\`

count가 6이 되면 \`6 <= 5\`가 거짓이라 멈춰요!

{!red} ⚠️ **주의! 무한루프 위험!** — \`count ← count + 1\`을 빼먹으면 count가 영원히 1이라 조건이 항상 참 → **프로그램이 멈추지 않아요!**

WHILE문에서는 반드시 **조건이 언젠가 거짓이 되도록** 값을 바꿔줘야 해요!`
        },
        {
          id: "ch2-example",
          type: "explain",
          title: "📋 실용적인 WHILE 반복문",
          content: `WHILE 반복문은 사용자 입력 검증에 유용해요:

\`\`\`
OUTPUT "양수를 입력하세요:"
INPUT num
WHILE num <= 0
    OUTPUT "잘못된 값! 다시 입력하세요:"
    INPUT num
ENDWHILE
OUTPUT "입력한 값: ", num
\`\`\`

사용자가 양수를 입력할 때까지 계속 물어봐요!

**중요:** 조건은 반복문 본문이 실행되기 **전에** 확인해요.
\`num\`이 처음부터 양수라면 반복문은 아예 실행되지 않아요.`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
x ← 10
WHILE x > 0
    OUTPUT x
    x ← x - 3
ENDWHILE
\`\`\``,
          options: [
            '10\n7\n4\n1',
            '10\n7\n4',
            '10\n7\n4\n1\n-2',
            '10\n9\n8\n7\n6\n5\n4\n3\n2\n1'
          ],
          answer: 0,
          explanation: 'x가 3씩 줄어요! 10→7→4→1→(-2). x가 -2가 되면 `x > 0`이 거짓이라 멈춰요. 출력은 **10, 7, 4, 1**!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: 'count가 10보다 작은 동안 반복하는 코드를 완성하세요.',
          code: 'count ← 0\n___ count < 10\n    OUTPUT count\n    count ← count + 1\n___',
          fillBlanks: [
            { id: 1, answer: "WHILE", options: ["WHILE", "FOR", "IF", "REPEAT"] },
            { id: 2, answer: "ENDWHILE", options: ["ENDWHILE", "ENDIF", "END", "NEXT"] }
          ]
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "❓ FOR vs WHILE!",
          content: '다음 중 **WHILE** 반복문을 쓰기에 적합한 상황은?',
          options: [
            '1부터 100까지 숫자 출력',
            '배열의 모든 원소 출력',
            '사용자가 "exit"을 입력할 때까지 반복',
            '구구단 2단 출력'
          ],
          answer: 2,
          explanation: '"exit" 입력 시까지 반복은 **횟수를 모르는** 반복이라 WHILE이 적합해요! 나머지는 횟수가 정해져 있어서 FOR이 더 좋아요.'
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "❓ WHILE문 동작!",
          content: `다음 코드에서 OUTPUT은 몇 번 실행될까요?

\`\`\`
x ← 5
WHILE x > 10
    OUTPUT x
    x ← x + 1
ENDWHILE
\`\`\``,
          options: ['0번', '1번', '5번', '무한 반복'],
          answer: 0,
          explanation: 'x=5이고 조건 x > 10이 처음부터 **거짓**이에요! WHILE은 조건을 먼저 확인하니까 한 번도 실행 안 돼요. 0번!'
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚖️ FOR vs WHILE 비교",
          content: `언제 FOR를 쓰고, 언제 WHILE을 쓸까요?

**FOR 반복문** - 반복 횟수를 **미리 알 때**:
\`\`\`
FOR i ← 1 TO 10
    OUTPUT "반복 중..."
NEXT i
\`\`\`
→ 정확히 10번 반복해요!

**WHILE 반복문** - 반복 횟수를 **모를 때**:
\`\`\`
INPUT answer
WHILE answer <> "그만"
    OUTPUT "계속합니다"
    INPUT answer
ENDWHILE
\`\`\`
→ 사용자가 "그만"을 입력할 때까지 반복해요!

| | FOR | WHILE |
|---|---|---|
| 반복 횟수 | 미리 정해짐 | 조건에 따라 다름 |
| 카운터 변수 | 자동 관리 | 직접 관리 |
| 사용 시기 | 횟수를 알 때 | 조건만 알 때 |`
        },
      ]
    },
  ]
}
