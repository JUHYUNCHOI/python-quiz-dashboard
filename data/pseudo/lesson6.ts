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
          codeTemplate: '___ i ← 1 ___ 10\n    OUTPUT i\nNEXT i',
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

count가 6이 되면 \`6 <= 5\`가 거짓이라 멈춰요!`
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
          codeTemplate: 'count ← 0\n___ count < 10\n    OUTPUT count\n    count ← count + 1\n___',
          fillBlanks: [
            { id: 1, answer: "WHILE", options: ["WHILE", "FOR", "IF", "REPEAT"] },
            { id: 2, answer: "ENDWHILE", options: ["ENDWHILE", "ENDIF", "END", "NEXT"] }
          ]
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
