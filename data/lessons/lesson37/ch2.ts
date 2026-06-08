import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "try-except 구조",
  emoji: "🔧",
  steps: [
    {
      id: "ch2-1",
      type: "explain",
      title: "💭 try-except는 어떤 구조일까?",
      component: "pyTryExceptBuilder",
      content: `💭 에러를 잡으려면 코드를 **어떤 구조**로 감싸야 할까? "시도해보고, 에러나면 이거 해!"를 코드로 쓰면?

\`\`\`python
try:
    # 에러가 날 수도 있는 코드
    숫자 = int(input('숫자: '))
    print(숫자 * 2)
except:
    # 에러가 나면 실행할 코드
    print('에러 발생!')
\`\`\`

🛟 앞에서 본 **안전 그물** 비유로 보면 딱 떨어져요. \`try:\` 안에는 곡예사가 묘기를 부리는 **위험한 코드** — 잘 되면 좋지만 떨어질(에러날) 수도 있는 부분을 넣어요. \`except:\` 안에는 떨어졌을 때 받아주는 **그물** — 실패했을 때 대신 해줄 일을 넣고요.

그래서 코드를 넣을 때 스스로 이렇게 물어보면 돼요:
- *"이 줄이 실패할 수 있나?"* → 그렇다면 **try 안**에 (예: \`int(입력값)\`, \`10 / 숫자\`, 파일 열기)
- *"실패했을 때 뭘 보여줄까?"* → 그 대처를 **except 안**에 (예: \`'숫자를 입력해주세요!'\`)

여기서 중요한 점 하나 — \`try:\` 안의 코드가 **에러 없이 잘 돌아가면 except 는 아예 실행 안 돼요.** 그물은 곡예사가 떨어졌을 때만 쓰이지, 평소엔 가만히 있잖아요? 똑같아요. 그물(except)은 *떨어질 때만* 작동하는 비상 대기조예요.

@핵심: **try** = "시도해봐(위험한 코드)", **except** = "에러나면 이거 해!(실패 시 대처)"`
    },
    {
      id: "ch2-2",
      type: "interactive",
      title: "🔄 try-except 흐름 따라가기",
      description: "에러가 있을 때와 없을 때 어떻게 다른지 확인해보세요!",
      component: "tryExceptFlow"
    },
    {
      id: "ch2-3",
      type: "interactive",
      title: "✏️ try-except 직접 써보기!",
      description: "코드를 보고 그대로 따라 써보세요! 손으로 직접 쳐야 기억에 남아요!",
      component: "typeAlong",
      targetTitle: "try-except 기본 따라치기",
      targetDescription: "가이드를 보고 똑같이 써보세요",
      targetCode: "try:\n    print(10 / 2)\nexcept:\n    print('에러!')",
      expectedOutput: "5.0"
    },
    {
      id: "ch2-4",
      type: "interactive",
      title: "빈칸 채우기: try-except",
      description: "try-except 구조를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "___1___:\n    print(10 / 0)\n___2___:\n    print('에러 발생!')",
      blanks: [
        { id: "1", answer: "try", hint: "시도해본다는 뜻이에요" },
        { id: "2", answer: "except", hint: "에러를 잡는 키워드" }
      ],
      choices: ["try", "except", "if", "else", "catch", "def"],
      expectedOutput: "에러 발생!"
    },
    {
      id: "ch2-5",
      type: "quiz",
      title: "예측해보세요!",
      content: `출력 결과는?

\`\`\`python
try:
    print(10 / 0)
except:
    print('에러!')
\`\`\``,
      options: ["10", "0", "에러!", "프로그램 멈춤"],
      answer: 2,
      explanation: "0으로 나누면 에러! except가 잡아서 '에러!' 출력"
    },
    {
      id: "ch2-6",
      type: "quiz",
      title: "예측해보세요!",
      content: `출력 결과는?

\`\`\`python
try:
    print(10 / 2)
except:
    print('에러!')
\`\`\``,
      options: ["5.0", "에러!", "10 / 2", "프로그램 멈춤"],
      answer: 0,
      explanation: "에러가 안 나면 try 안의 코드만 실행! 5.0 출력"
    }
  ]
}
