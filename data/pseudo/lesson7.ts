// ============================================
// 수도코드 레슨 7: 반복문 2
// REPEAT...UNTIL, 중첩 반복문
// ============================================

import { LessonData } from '../types'

export const pseudoLesson7Data: LessonData = {
  id: "pseudo-7",
  title: "반복문 2",
  emoji: "🔄",
  description: "REPEAT...UNTIL, 중첩 반복!",
  chapters: [
    {
      id: "ch1",
      title: "REPEAT...UNTIL",
      emoji: "🔁",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔁 REPEAT...UNTIL이란?",
          content: `WHILE 반복문은 **먼저 조건을 확인**하고 반복해요.

하지만 **일단 한 번은 실행**하고 나서 조건을 확인하고 싶다면?

**REPEAT...UNTIL**을 써요!

\`\`\`
REPEAT
    반복할 코드
UNTIL 조건
\`\`\`

중요한 차이:
- **WHILE**: 조건이 **참**인 동안 반복 (먼저 확인)
- **REPEAT**: 조건이 **참**이 될 때까지 반복 (나중에 확인)

REPEAT는 **최소 1번은 반드시 실행**돼요!`
        },
        {
          id: "ch1-example",
          type: "explain",
          title: "📝 REPEAT...UNTIL 예시",
          content: `비밀번호 입력 프로그램을 만들어 볼까요?

\`\`\`
REPEAT
    OUTPUT "비밀번호를 입력하세요:"
    INPUT password
UNTIL password = "1234"
OUTPUT "로그인 성공!"
\`\`\`

실행 과정:
1. "비밀번호를 입력하세요:" 출력
2. 사용자가 "abcd" 입력
3. \`"abcd" = "1234"\`? → 거짓! → 다시 반복
4. "비밀번호를 입력하세요:" 출력
5. 사용자가 "1234" 입력
6. \`"1234" = "1234"\`? → 참! → 반복 종료
7. "로그인 성공!" 출력

**UNTIL 조건이 참이 되면** 멈춰요!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
num ← 1
REPEAT
    OUTPUT num
    num ← num * 2
UNTIL num > 10
\`\`\``,
          options: [
            '1\n2\n4\n8',
            '1\n2\n4\n8\n16',
            '2\n4\n8',
            '1\n2\n4\n8\n10'
          ],
          answer: 0,
          explanation: 'num이 1→2→4→8→16으로 2배씩 늘어요. 16이 되면 `16 > 10`이 참! 반복이 끝나요. 16은 출력 후 조건을 확인하기 전에 값이 바뀌므로 출력되지 않아요. 결과: **1, 2, 4, 8**!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '사용자가 "종료"를 입력할 때까지 반복하는 코드를 완성하세요.',
          codeTemplate: '___\n    OUTPUT "명령어를 입력하세요:"\n    INPUT command\n___ command = "종료"',
          fillBlanks: [
            { id: 1, answer: "REPEAT", options: ["REPEAT", "WHILE", "FOR", "DO"] },
            { id: 2, answer: "UNTIL", options: ["UNTIL", "ENDWHILE", "WHILE", "ENDREPEAT"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "중첩 반복문",
      emoji: "🪆",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🪆 중첩 반복문이란?",
          content: `반복문 안에 또 반복문을 넣을 수 있어요!

이것을 **중첩 반복문(Nested Loop)**이라고 해요.

\`\`\`
FOR i ← 1 TO 3
    FOR j ← 1 TO 3
        OUTPUT i * j
    NEXT j
NEXT i
\`\`\`

바깥 반복(i)이 한 번 돌 때, 안쪽 반복(j)은 **전부** 돌아요!

| i | j | i * j |
|---|---|---|
| 1 | 1, 2, 3 | 1, 2, 3 |
| 2 | 1, 2, 3 | 2, 4, 6 |
| 3 | 1, 2, 3 | 3, 6, 9 |

총 실행 횟수: 3 x 3 = **9번**!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드에서 OUTPUT은 총 몇 번 실행될까요?

\`\`\`
FOR i ← 1 TO 4
    FOR j ← 1 TO 2
        OUTPUT "반복!"
    NEXT j
NEXT i
\`\`\``,
          options: [
            '4번',
            '6번',
            '8번',
            '2번'
          ],
          answer: 2,
          explanation: '바깥 반복은 4번(i: 1~4), 안쪽 반복은 2번(j: 1~2)이에요. 총 실행 횟수는 4 x 2 = **8번**!'
        },
        {
          id: "ch2-example",
          type: "explain",
          title: "📝 구구단 출력 예시",
          content: `중첩 반복문으로 구구단을 만들어 볼까요?

\`\`\`
FOR dan ← 2 TO 4
    OUTPUT dan, "단:"
    FOR num ← 1 TO 3
        OUTPUT dan, " x ", num, " = ", dan * num
    NEXT num
NEXT dan
\`\`\`

결과:
\`\`\`
2단:
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3단:
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
4단:
4 x 1 = 4
4 x 2 = 8
4 x 3 = 12
\`\`\`

바깥 반복(dan)이 **단**을 정하고, 안쪽 반복(num)이 **곱하는 수**를 바꿔요!`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '중첩 FOR 반복문의 빈칸을 채워 구구단 5단을 완성하세요.',
          codeTemplate: 'FOR num ← 1 ___ 9\n    OUTPUT 5, " x ", num, " = ", 5 * ___\nNEXT ___',
          fillBlanks: [
            { id: 1, answer: "TO", options: ["TO", "UNTIL", "UPTO", "BY"] },
            { id: 2, answer: "num", options: ["num", "5", "i", "9"] },
            { id: 3, answer: "num", options: ["num", "5", "i", "dan"] }
          ]
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 최종 도전!",
          content: `다음 수도코드의 마지막 출력값은?

\`\`\`
total ← 0
FOR i ← 1 TO 5
    total ← total + i
NEXT i
OUTPUT total
\`\`\``,
          options: [
            '5',
            '10',
            '15',
            '20'
          ],
          answer: 2,
          explanation: 'total에 1+2+3+4+5를 차례로 더해요! 0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=**15**. 1부터 5까지의 합인 **15**가 출력돼요!'
        },
      ]
    },
  ]
}
