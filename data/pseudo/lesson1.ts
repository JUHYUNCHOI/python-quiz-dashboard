// ============================================
// 수도코드 레슨 1: OUTPUT 출력
// CIE 스타일 수도코드 입문
// ============================================

import { LessonData } from '../types'

export const pseudoLesson1Data: LessonData = {
  id: "pseudo-1",
  title: "OUTPUT 출력",
  emoji: "📢",
  description: "화면에 글자를 출력해요!",
  chapters: [
    {
      id: "ch1",
      title: "수도코드란?",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 수도코드가 뭐예요?",
          content: `**수도코드(Pseudocode)**는 프로그래밍 언어가 아니에요!

알고리즘(문제 해결 순서)을 **사람이 읽기 쉬운 말**로 적는 방법이에요.

왜 배울까요?
- 🧠 **논리적 사고력**을 키워요
- 📝 어떤 프로그래밍 언어든 **설계도**를 먼저 그릴 수 있어요
- 🏫 시험(CIE, AP 등)에서도 수도코드를 사용해요

수도코드는 영어 단어로 쓰지만, 아주 쉬운 단어만 써요!`
        },
        {
          id: "ch1-output",
          type: "explain",
          title: "📢 OUTPUT으로 출력하기!",
          content: `화면에 글자를 보여주고 싶으면 **OUTPUT**을 써요!

\`\`\`
OUTPUT "Hello, World!"
\`\`\`

이렇게 하면 화면에 **Hello, World!** 가 나와요.

다른 프로그래밍 언어와 비교해 볼까요?

| 수도코드 📋 | Python 🐍 | C++ ⚡ |
|---|---|---|
| OUTPUT "Hello" | print("Hello") | cout << "Hello" |

수도코드가 제일 읽기 쉽죠? 😊`
        },
      ]
    },
    {
      id: "ch2",
      title: "여러 가지 출력",
      emoji: "🔤",
      steps: [
        {
          id: "ch2-strings",
          type: "explain",
          title: '🔤 글자와 숫자 출력',
          content: `글자(문자열)는 큰따옴표 **" "** 로 감싸요:

\`\`\`
OUTPUT "이름: 코드린"
\`\`\`

숫자는 따옴표 없이 그냥 써요:

\`\`\`
OUTPUT 42
OUTPUT 3 + 7
\`\`\`

숫자 계산도 가능해요! \`3 + 7\`은 **10**을 출력해요.`
        },
        {
          id: "ch2-multi",
          type: "explain",
          title: "📝 여러 줄 출력",
          content: `OUTPUT을 여러 번 쓰면 여러 줄이 출력돼요:

\`\`\`
OUTPUT "첫 번째 줄"
OUTPUT "두 번째 줄"
OUTPUT "세 번째 줄"
\`\`\`

결과:
\`\`\`
첫 번째 줄
두 번째 줄
세 번째 줄
\`\`\`

각 OUTPUT은 새로운 줄에 출력돼요! 📄`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 수도코드의 결과는?

\`\`\`
OUTPUT 10 + 5
OUTPUT "10 + 5"
\`\`\``,
          options: [
            '15\n10 + 5',
            '10 + 5\n10 + 5',
            '15\n15',
            '에러'
          ],
          answer: 0,
          explanation: '따옴표 없는 `10 + 5`는 계산되어 **15**가 나오고, 따옴표 안의 `"10 + 5"`는 글자 그대로 **10 + 5**가 출력돼요!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '화면에 "수도코드는 재미있어!" 를 출력하는 코드를 완성하세요.',
          codeTemplate: '___ "수도코드는 재미있어!"',
          fillBlanks: [
            { id: 1, answer: "OUTPUT", options: ["OUTPUT", "PRINT", "INPUT", "DISPLAY"] }
          ]
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🏆 마무리 퀴즈!",
          content: '다음 중 수도코드에 대한 설명으로 **틀린** 것은?',
          options: [
            '수도코드는 특정 프로그래밍 언어가 아니다',
            'OUTPUT으로 화면에 출력한다',
            '수도코드는 컴퓨터에서 바로 실행할 수 있다',
            '알고리즘을 사람이 읽기 쉽게 표현하는 방법이다'
          ],
          answer: 2,
          explanation: '수도코드는 **컴퓨터에서 직접 실행할 수 없어요!** 알고리즘을 설계하고 설명하기 위한 도구예요. 실행하려면 Python, C++ 같은 실제 프로그래밍 언어로 바꿔야 해요.'
        },
      ]
    },
  ]
}
