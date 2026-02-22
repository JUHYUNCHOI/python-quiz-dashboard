import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "여러 객체 만들기",
  emoji: "👥",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 같은 틀로 다른 캐릭터를 만들 수 있을까?",
      content: `💭 Character 틀 하나로 **용사도, 마법사도** 만들 수 있을까?

\`\`\`python
class Character:
    def __init__(s, char_name, hp, atk):
        s.char_name = char_name
        s.hp = hp
        s.atk = atk

hero = Character('용사', 100, 20)
mage = Character('마법사', 80, 35)
\`\`\`

@핵심: 같은 클래스로 **다른 값**을 넣어서 여러 객체를 만들 수 있어!`
    },
    {
      id: "ch3-0a",
      type: "explain",
      title: "💭 각각 다른 값이 들어있는지 확인해볼까?",
      content: `💭 용사와 마법사에 **진짜 다른 값**이 들어있을까? 값이 섞이지는 않을까?

\`\`\`python
print(f'{hero.char_name}: HP {hero.hp}, ATK {hero.atk}')
print(f'{mage.char_name}: HP {mage.hp}, ATK {mage.atk}')
\`\`\`

**결과:**
\`\`\`
용사: HP 100, ATK 20
마법사: HP 80, ATK 35
\`\`\`

→ 값이 안 섞여요! 각 객체는 **독립적인 자기만의 값**을 가져요!

@핵심: 클래스 1개로 여러 객체를 만들어도 각자 **자기만의 값**을 가진다!`
    },
    {
      id: "ch3-1",
      type: "quiz",
      title: "예측해보세요!",
      content: "다음 코드의 결과는?\n\n```python\nclass Pet:\n    def __init__(s, pet_name):\n        s.pet_name = pet_name\n\ndog = Pet('멍멍이')\ncat = Pet('냘냘이')\nprint(dog.pet_name, cat.pet_name)\n```",
      options: ["멍멍이 멍멍이", "냘냘이 냘냘이", "멍멍이 냘냘이", "에러"],
      answer: 2,
      explanation: "dog과 cat은 서로 다른 객체! 각각 고유한 pet_name을 가져요!"
    },
    {
      id: "ch3-2",
      type: "explain",
      title: "💭 만든 후에 HP를 바꿀 수 있을까?",
      content: `💭 용사의 HP가 100인데 **데미지를 받으면?** 새로 만들어야 할까, 값만 바꿀 수 있을까?

\`\`\`python
hero = Character('용사', 100)
print(f'초기 HP: {hero.hp}')

hero.hp = hero.hp - 30
print(f'데미지 후 HP: {hero.hp}')
\`\`\`

**결과:** \`초기 HP: 100\` → \`데미지 후 HP: 70\`

@핵심: \`객체.속성 = 새값\`으로 언제든 속성을 바꿀 수 있다!`
    },
    {
      id: "ch3-2a",
      type: "explain",
      title: "💭 한 캐릭터를 바꾸면 다른 캐릭터도 바뀔까?",
      content: `💭 용사의 HP를 깎았는데... 혹시 마법사의 HP도 같이 줄어들까?

\`\`\`python
hero = Character('용사', 100)
mage = Character('마법사', 80)

hero.hp = hero.hp - 30  # 용사만 데미지!

print(f'용사 HP: {hero.hp}')   # 70
print(f'마법사 HP: {mage.hp}') # 80 (안 바뀜!)
\`\`\`

→ 다른 객체에는 영향 없어요! 각 객체는 **완전히 독립적**이에요!

@핵심: 한 객체의 속성을 바꿔도 **다른 객체에는 영향 없다!**`
    },
    {
      id: "ch3-3",
      type: "interactive",
      title: "빈칸 채우기: 여러 객체",
      description: "Item 클래스를 완성하고 아이템 2개를 만드세요!",
      component: "fillInBlank",
      codeTemplate: "class Item:\n    def __init__(___1___, item_name, price):\n        s.item_name = ___2___\n        s.price = price\n\nsword = ___3___('검', 500)\nshield = Item('방패', 300)\nprint(f'{sword.item_name}: {sword.___4___}원')",
      blanks: [
        { id: "1", answer: "s, item_name, price", hint: "s + 매개변수 2개!" },
        { id: "2", answer: "item_name", hint: "받은 이름을 저장!" },
        { id: "3", answer: "Item", hint: "클래스로 객체 만들기!" },
        { id: "4", answer: "price", hint: "가격 속성!" }
      ],
      choices: ["s, item_name, price", "item_name, price", "item_name", "price", "Item", "item", "name"],
      expectedOutput: "검: 500원"
    }
  ]
}
