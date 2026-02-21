import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "왜 에러 처리가 필요할까?",
  emoji: "💥",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 게임 중에 이상한 걸 입력하면?",
      content: `💭 숫자를 입력하라고 했는데... 사용자가 **"abc"**를 입력하면 어떻게 될까? 프로그램이 **알아서 처리**해줄까?

\`\`\`python
숫자 = int(input('숫자를 입력하세요: '))
print(숫자 * 2)
\`\`\`

**"abc" 입력하면?**

\`\`\`
ValueError: invalid literal for int()
\`\`\`

프로그램이 멈춰버려요! 게임이 꺼져요! 💥

@핵심: 에러가 나면 프로그램이 **멈춰버린다!** 그래서 에러 처리가 필요해!`
    },
    {
      id: "ch1-2",
      type: "explain",
      title: "💭 에러가 나도 안 꺼지게 하려면?",
      content: `💭 에러가 나면 프로그램이 멈춘다고 했잖아... 에러가 나도 **안 꺼지게** 하는 방법은 없을까?

\`\`\`python
try:
    숫자 = int(input('숫자를 입력하세요: '))
    print(숫자 * 2)
except:
    print('숫자를 입력해주세요!')
\`\`\`

**"abc" 입력해도:**
- \`숫자를 입력해주세요!\` 출력
- 프로그램이 안 꺼져요! ✅

@핵심: **try-except**로 감싸면 에러가 나도 프로그램이 안 멈춰!`
    },
    {
      id: "ch1-3",
      type: "quiz",
      title: "퀴즈!",
      content: "에러가 나면 프로그램이 어떻게 될까요?",
      options: ["계속 실행", "멈춤", "다시 시작", "아무 일 없음"],
      answer: 1,
      explanation: "에러가 나면 프로그램이 멈춰요! 그래서 에러 처리가 필요해요!"
    }
  ]
}
