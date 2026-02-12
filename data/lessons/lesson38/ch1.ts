import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "왜 클래스가 필요할까?",
  emoji: "🤔",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "🎮 RPG 캐릭터 10명 만들기!",
      content: `## 문제 상황: 캐릭터가 10명 필요해요!

\`\`\`python
# 캐릭터 1
char1_name = '용사'
char1_hp = 100
char1_atk = 20

# 캐릭터 2
char2_name = '마법사'
char2_hp = 80
char2_atk = 30

# 캐릭터 3
char3_name = '궁수'
char3_hp = 90
char3_atk = 25

# ... 아직 7명 더 필요해요!
\`\`\`

😩 변수가 너무 많아요! (10명 × 3개 = 30개)`
    },
    {
      id: "ch1-1",
      type: "explain",
      title: "💡 클래스를 쓰면?",
      content: `## 한 줄로 캐릭터 하나!

\`\`\`python
hero = Character('용사', 100, 20)
mage = Character('마법사', 80, 30)
archer = Character('궁수', 90, 25)
\`\`\`

✨ 변수 30개 → 3줄로 끝!

## 클래스 = 붕어빵 틀!

🍩 **붕어빵 가게의 비밀**
- **붕어빵 틀** = 설계도 (모양이 정해져 있음)
- **붕어빵** = 틀로 찍어낸 실제 붕어빵

틀 하나로 붕어빵 100개, 1000개도 만들 수 있어요!`
    },
    {
      id: "ch1-2",
      type: "interactive",
      title: "🍩 클래스 = 붕어빵 틀 체험!",
      description: "붕어빵 틀(클래스)로 붕어빵(객체)을 찍어내는 과정을 체험해보세요!",
      component: "classBoonguh"
    },
    {
      id: "ch1-3",
      type: "quiz",
      title: "퀴즈!",
      content: "클래스와 객체의 관계를 붕어빵에 비유하면?",
      options: [
        "클래스 = 붕어빵, 객체 = 틀",
        "클래스 = 붕어빵 틀, 객체 = 붕어빵",
        "클래스 = 가게, 객체 = 손님",
        "클래스 = 속재료, 객체 = 붕어빵"
      ],
      answer: 1,
      explanation: "클래스(틀)로 객체(붕어빵)를 찍어내요! 틀 하나로 여러 개를 만들 수 있어요!"
    }
  ]
}
