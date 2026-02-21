import { Chapter } from '../types'

export const ch7: Chapter = {
  id: "ch7",
  title: "정리",
  emoji: "🎯",
  steps: [
    {
      id: "ch7-1",
      type: "explain",
      title: "🎯 오늘 배운 3가지 총정리!",
      content: `💭 오늘 배운 기본값, 여러 값 반환, 키워드 인자... 각각 **어떻게 쓰는지** 기억나?

1️⃣ 기본값
\`\`\`python
def 함수(a, b=10):   # b 안 주면 10
    return a + b
\`\`\`
기본값 있는 건 **뒤에**!

2️⃣ 여러 값 반환
\`\`\`python
def 계산(a, b):
    return a + b, a - b   # 2개 반환

합, 차 = 계산(10, 3)       # 각각 받기
\`\`\`

3️⃣ 키워드 인자
\`\`\`python
함수(이름='철수', 나이=15)   # 순서 상관없이!
\`\`\`

@핵심: **기본값=편리함**, **여러 반환=쉼표**, **키워드 인자=이름표** 이 세 가지면 함수 마스터!`
    }
  ]
}
