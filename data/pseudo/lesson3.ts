// ============================================
// 수도코드 레슨 3: INPUT 입력
// CIE 스타일 수도코드 - 사용자에게 입력받기!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson3Data: LessonData = {
  id: "pseudo-3",
  title: "INPUT 입력",
  emoji: "⌨️",
  description: "사용자에게 입력받기!",
  chapters: [
    {
      id: "ch1",
      title: "INPUT이란?",
      emoji: "⌨️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "⌨️ INPUT이 뭐예요?",
          content: `**INPUT**은 사용자에게 **값을 입력받는** 명령어예요!

지금까지는 OUTPUT으로 화면에 보여주기만 했죠?
이제는 사용자가 **직접 값을 넣을 수 있어요!**

\`\`\`
DECLARE name : STRING
INPUT name
\`\`\`

이 코드가 실행되면 프로그램이 **멈추고** 사용자가 키보드로 입력할 때까지 **기다려요**.

사용자가 "코드린"이라고 입력하면:
📦 \`name\` 상자에 **"코드린"**이 들어가요! ✨`
        },
        {
          id: "ch1-how",
          type: "explain",
          title: "📝 INPUT 사용법",
          content: `INPUT은 아주 간단해요!

\`\`\`
INPUT 변수이름
\`\`\`

예를 들어:
\`\`\`
DECLARE age : INTEGER
INPUT age
\`\`\`

사용자가 **13**을 입력하면 → \`age\`에 13이 저장돼요.

💡 **중요한 점:**
- INPUT 뒤에는 반드시 **변수 이름**이 와야 해요
- 변수를 먼저 **DECLARE**로 선언해야 해요
- 입력받은 값은 변수에 **자동으로 저장**돼요

| OUTPUT | INPUT |
|---|---|
| 프로그램 → 사용자 | 사용자 → 프로그램 |
| 화면에 보여주기 | 키보드로 입력받기 |`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '사용자에게 나이를 입력받는 코드를 완성하세요.',
          codeTemplate: 'DECLARE age : INTEGER\n___ age',
          fillBlanks: [
            { id: 1, answer: "INPUT", options: ["INPUT", "OUTPUT", "GET", "READ"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "입력과 출력 함께 쓰기",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-combine",
          type: "explain",
          title: "🔄 INPUT과 OUTPUT 함께 쓰기",
          content: `INPUT과 OUTPUT을 함께 쓰면 **대화형 프로그램**을 만들 수 있어요!

\`\`\`
DECLARE name : STRING
OUTPUT "이름을 입력하세요: "
INPUT name
OUTPUT "안녕하세요, " & name & "!"
\`\`\`

실행 과정:
1. 화면에 "이름을 입력하세요: " 출력
2. 사용자가 **코드린** 입력
3. 화면에 **안녕하세요, 코드린!** 출력

💡 **& 기호**는 글자를 **이어 붙이는** 연산자예요!
- \`"안녕, " & "세상!"\` → **안녕, 세상!**
- \`"나이: " & age\` → **나이: 13** (age가 13일 때)`
        },
        {
          id: "ch2-ampersand",
          type: "explain",
          title: "🔗 & 연산자로 이어 붙이기",
          content: `**&** 는 CIE 수도코드에서 문자열을 **연결(이어 붙이기)**하는 연산자예요!

\`\`\`
DECLARE firstName : STRING
DECLARE lastName : STRING
firstName ← "김"
lastName ← "코드린"
OUTPUT firstName & lastName
\`\`\`

결과:
\`\`\`
김코드린
\`\`\`

글자와 변수를 섞어서 쓸 수도 있어요:
\`\`\`
DECLARE score : INTEGER
score ← 100
OUTPUT "당신의 점수는 " & score & "점입니다!"
\`\`\`

결과:
\`\`\`
당신의 점수는 100점입니다!
\`\`\`

**&** 덕분에 멋진 문장을 만들 수 있어요! ✨`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `사용자가 **"피자"**를 입력했을 때 결과는?

\`\`\`
DECLARE food : STRING
OUTPUT "좋아하는 음식: "
INPUT food
OUTPUT "나는 " & food & "를 좋아해요!"
\`\`\``,
          options: [
            '나는 피자를 좋아해요!',
            '나는 food를 좋아해요!',
            '나는 "피자"를 좋아해요!',
            '에러'
          ],
          answer: 0,
          explanation: '사용자가 "피자"를 입력하면 `food`에 "피자"가 저장돼요. `OUTPUT "나는 " & food & "를 좋아해요!"`에서 `food` 자리에 값이 들어가서 **나는 피자를 좋아해요!**가 출력돼요!'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '사용자에게 색깔을 입력받고, "좋아하는 색: ○○"를 출력하는 코드를 완성하세요.',
          codeTemplate: 'DECLARE color : STRING\n___ color\nOUTPUT "좋아하는 색: " ___ color',
          fillBlanks: [
            { id: 1, answer: "INPUT", options: ["INPUT", "OUTPUT", "GET", "DECLARE"] },
            { id: 2, answer: "&", options: ["&", "+", ",", "."] }
          ]
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🏆 마무리 퀴즈!",
          content: '다음 코드에서 사용자가 **25**를 입력하면 출력 결과는?\n\n```\nDECLARE age : INTEGER\nINPUT age\nOUTPUT "나이: " & age & "살"\n```',
          options: [
            '나이: 25살',
            '나이: age살',
            '나이: 25',
            '에러'
          ],
          answer: 0,
          explanation: '사용자가 25를 입력하면 `age`에 25가 저장돼요. **&** 로 문자열을 이어 붙여서 **나이: 25살**이 출력돼요!'
        },
      ]
    },
  ]
}
