import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "에러 종류 알아보기",
  emoji: "📋",
  steps: [
    {
      id: "ch3-0",
      type: "interactive",
      title: "📋 에러 종류 카드!",
      description: "카드를 클릭해서 각 에러가 언제 발생하는지 알아보세요!",
      component: "errorTypesCards"
    },
    {
      id: "ch3-1",
      type: "explain",
      title: "💭 특정 에러만 골라서 잡으려면?",
      content: `💭 에러가 여러 종류인데... **내가 원하는 에러만** 잡을 수는 없을까?

\`\`\`python
try:
    숫자 = int('abc')
except ValueError:       # 👈 에러 이름 지정!
    print('숫자로 바꿀 수 없어요!')
\`\`\`

→ except 뒤에 **에러 이름**을 쓰면 그 에러만 잡아요!

@핵심: \`except ValueError:\` 처럼 **에러 이름을 지정**하면 특정 에러만 잡을 수 있어!`
    },
    {
      id: "ch3-1a",
      type: "explain",
      title: "💭 다른 에러도 같은 방법으로?",
      content: `💭 ValueError를 잡는 법을 알았어! 그러면 **0으로 나누기** 에러도 같은 방식으로 잡을 수 있을까?

\`\`\`python
try:
    결과 = 10 / 0
except ZeroDivisionError:  # 👈 0나누기 에러!
    print('0으로 나눌 수 없어요!')
\`\`\`

→ 에러 이름만 바꾸면 **다른 에러도 같은 패턴**으로 잡아!

@핵심: 에러 종류마다 이름이 달라! **ValueError**, **ZeroDivisionError** 등!`
    },
    {
      id: "ch3-2",
      type: "interactive",
      title: "✏️ 특정 에러 잡기 따라치기!",
      description: "ValueError를 잡는 코드를 직접 써보세요!",
      component: "typeAlong",
      targetTitle: "ValueError 잡기",
      targetDescription: "except 뒤에 에러 이름을 써요",
      targetCode: "try:\n    숫자 = int('abc')\nexcept ValueError:\n    print('숫자가 아니에요!')",
      expectedOutput: "숫자가 아니에요!"
    },
    {
      id: "ch3-3",
      type: "interactive",
      title: "빈칸 채우기: 특정 에러",
      description: "0으로 나누는 에러를 잡아보세요!",
      component: "fillInBlank",
      codeTemplate: "try:\n    print(10 / 0)\nexcept ___1___:\n    print('0으로 못 나눠요!')",
      blanks: [
        { id: "1", answer: "ZeroDivisionError", hint: "0으로 나눌 때 나는 에러!" }
      ],
      choices: ["ZeroDivisionError", "ValueError", "FileNotFoundError", "Error"],
      expectedOutput: "0으로 못 나눠요!"
    },
    {
      id: "ch3-4",
      type: "quiz",
      title: "퀴즈!",
      content: "int('hello')는 어떤 에러?",
      options: ["ZeroDivisionError", "ValueError", "FileNotFoundError", "에러 없음"],
      answer: 1,
      explanation: "'hello'는 숫자가 아니라서 ValueError!"
    },
    {
      id: "ch3-5",
      type: "quiz",
      title: "퀴즈!",
      content: "10 / 0은 어떤 에러?",
      options: ["ValueError", "ZeroDivisionError", "FileNotFoundError", "에러 없음"],
      answer: 1,
      explanation: "0으로 나누면 ZeroDivisionError!"
    }
  ]
}
