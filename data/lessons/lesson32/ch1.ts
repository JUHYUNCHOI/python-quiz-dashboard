import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "함수가 뭐예요?",
  emoji: "🤔",
  steps: [
    {
      id: "ch1-1",
      type: "explain",
      title: "🎂 같은 말을 10번 반복?",
      content: `💭 친구 10명에게 **생일 축하 메시지**를 보내야 해. 같은 말을 10번 복붙...? 더 좋은 방법 없을까?

> "생일 축하해! 행복한 하루 보내!"

이 메시지를 **10명**에게 보내려면... 🤯

@핵심: 반복되는 코드를 **상자에 담아** 이름만 바꿔 쓸 수 있으면 좋겠다!`
    },
    {
      id: "ch1-2",
      type: "interactive",
      title: "직접 코드로 써보면...",
      description: "타이핑을 지켜보세요...",
      component: "repetitiveTyping"
    },
    {
      id: "ch1-3",
      type: "interactive",
      title: "방법이 있어요!",
      description: "반복되는 부분을 찾아봐요!",
      component: "patternDiscovery"
    },
    {
      id: "ch1-4",
      type: "explain",
      title: "💭 반복 코드를 상자에 담으면?",
      content: `💭 반복되는 부분을 **상자에 넣고 이름**을 붙이면 어떨까? 달라지는 부분만 **구멍**을 뚫어서!

\`\`\`python
def 축하(이름):
    print(f"생일 축하해! 행복한 하루 보내, {이름}!")
\`\`\`

- **def** = "상자를 만들 거야!"
- **축하** = 상자의 이름
- **이름** = 상자에 넣을 재료 (달라지는 부분!)

@핵심: 이렇게 만든 상자를 **함수**라고 해! \`def 이름(재료):\`로 만들어!`
    },
    {
      id: "ch1-5",
      type: "interactive",
      title: "함수 구조 배우기",
      description: "클릭하면서 함수가 어떻게 생겼는지 배워봐요!",
      component: "functionBuilder"
    },
    {
      id: "ch1-6",
      type: "quiz",
      title: "개념 확인!",
      content: "함수를 만들 때 맨 앞에 쓰는 키워드는?",
      options: ["print", "def", "return", "function"],
      answer: 1,
      explanation: "def는 'define(정의하다)'의 줄임말이에요! 함수를 정의할 때 씁니다."
    }
  ]
}
