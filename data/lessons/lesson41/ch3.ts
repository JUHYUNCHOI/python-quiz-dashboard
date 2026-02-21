import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "여러 객체 만들기",
  emoji: "👥",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 같은 클래스로 다른 캐릭터를 만들 수 있을까?",
      content: `💭 Character 클래스 하나로 **용사, 마법사, 궁수**를 각각 만들 수 있을까? 값이 섞이지 않을까?

\`\`\`python
class Character:
    def __init__(s, char_name, hp, atk):
        s.char_name = char_name
        s.hp = hp
        s.atk = atk

# 캐릭터 3명 생성!
hero = Character('용사', 100, 20)
mage = Character('마법사', 80, 35)
archer = Character('궁수', 90, 25)

print(f'{hero.char_name}: HP {hero.hp}, 공격력 {hero.atk}')
print(f'{mage.char_name}: HP {mage.hp}, 공격력 {mage.atk}')
print(f'{archer.char_name}: HP {archer.hp}, 공격력 {archer.atk}')
\`\`\`

**결과:**
\`\`\`
용사: HP 100, 공격력 20
마법사: HP 80, 공격력 35
궁수: HP 90, 공격력 25
\`\`\`

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
      title: "💭 한번 정한 HP를 나중에 바꿀 수 있을까?",
      content: `💭 용사의 HP가 100인데, 데미지를 받으면? 객체를 새로 만들어야 할까, 아니면 **값만 바꿀 수** 있을까?

\`\`\`python
class Character:
    def __init__(s, char_name, hp):
        s.char_name = char_name
        s.hp = hp

hero = Character('용사', 100)
print(f'초기 HP: {hero.hp}')

# 데미지를 받았다!
hero.hp = hero.hp - 30
print(f'데미지 후 HP: {hero.hp}')

# 회복 포션을 먹었다!
hero.hp = hero.hp + 50
print(f'회복 후 HP: {hero.hp}')
\`\`\`

**결과:**
\`\`\`
초기 HP: 100
데미지 후 HP: 70
회복 후 HP: 120
\`\`\`

@핵심: \`객체.속성 = 새값\`으로 언제든 속성을 바꿀 수 있다!`
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
