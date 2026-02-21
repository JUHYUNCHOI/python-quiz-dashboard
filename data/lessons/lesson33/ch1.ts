import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "오늘의 목표!",
  emoji: "🎯",
  steps: [
    {
      id: "ch1-1",
      type: "explain",
      title: "💭 함수, 더 똑똑하게 만들 수 없을까?",
      content: `💭 저번 시간에 더하기, 빼기 함수를 만들었잖아? 근데 매번 같은 값을 넣어야 하고, 결과도 하나만 받을 수 있고... **더 편한 방법** 없을까?

\`\`\`
=== 계산기 ===
3 + 5 = 8
10 - 4 = 6
6 * 7 = 42
20 / 4 = 5.0
\`\`\`

오늘은 함수를 더 **똑똑하게** 업그레이드해요!

- 기본값으로 **편하게** 사용하기
- 여러 값을 **한 번에** 돌려받기
- 이름표로 **명확하게** 전달하기

@핵심: 함수에 **기본값, 여러 반환, 키워드 인자**를 추가해서 더 편리하게 쓸 수 있다!`
    },
    {
      id: "ch1-2",
      type: "quiz",
      title: "빠른 복습!",
      content: `지난 시간에 배운 것! 빈칸에 들어갈 말은?

\`\`\`python
def 더하기(a, b):
    _____ a + b

결과 = 더하기(3, 5)
\`\`\``,
      options: ["print", "return", "def", "result"],
      answer: 1,
      explanation: "return은 결과를 돌려줘요! 결과 변수에 8이 저장됩니다."
    },
    {
      id: "ch1-3",
      type: "interactive",
      title: "따라 써보기: 복습",
      description: "매개변수와 return을 복습해봐요!",
      component: "typeAlong",
      targetCode: `def 제곱(n):
    return n * n

print(제곱(5))`,
      expectedOutput: "25"
    }
  ]
}
