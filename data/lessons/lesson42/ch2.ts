import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "공격/회복 메서드",
  emoji: "⚔️",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "💭 용사가 슬라임을 공격하려면 뭘 알아야 할까?",
      content: `💭 인사 메서드는 혼자 했는데... 공격은 **상대방**이 필요하잖아? 메서드에 상대를 어떻게 전달하지?

\`\`\`python
def attack(self, target):  # target = 공격 대상!
    print(f'{self.char_name}이(가) {target.char_name}을(를) 공격!')
    target.hp = target.hp - self.atk  # 상대 HP 감소!
\`\`\`

💡 **target**도 객체라서 \`target.char_name\`, \`target.hp\` 사용 가능!

@핵심: 메서드에 **다른 객체를 매개변수**로 넘기면 상대방의 속성도 바꿀 수 있다!`
    },
    {
      id: "ch2-1",
      type: "tryit",
      title: "💻 공격 시스템 실행!",
      task: "용사가 슬라임을 공격하는 코드를 실행해보세요!",
      initialCode: `class Character:
    def __init__(self, char_name, hp, atk):
        self.char_name = char_name
        self.hp = hp
        self.atk = atk

    def attack(self, target):
        print(f'{self.char_name}이(가) {target.char_name}을(를) 공격!')
        print(f'{self.atk} 데미지!')
        target.hp = target.hp - self.atk
        print(f'{target.char_name}의 남은 HP: {target.hp}')

hero = Character('용사', 100, 25)
slime = Character('슬라임', 30, 5)
hero.attack(slime)`,
      expectedOutput: `용사이(가) 슬라임을(를) 공격!\n25 데미지!\n슬라임의 남은 HP: 5`,
      hint: "hero.attack(slime)에서 s=hero, target=slime이 돼요!",
      hint2: "attack 메서드 안에서 s는 용사, target은 슬라임!"
    },
    {
      id: "ch2-2",
      type: "tryit",
      title: "💚 회복 시스템 만들기!",
      task: "heal 메서드로 HP를 회복하되, max_hp를 넘지 않게 하는 코드를 실행해보세요!",
      initialCode: `class Character:
    def __init__(self, char_name, hp, atk):
        self.char_name = char_name
        self.hp = hp
        self.max_hp = hp
        self.atk = atk

    def heal(self, amount):
        self.hp = self.hp + amount
        if self.hp > self.max_hp:
            self.hp = self.max_hp
        print(f'{self.char_name} 회복! (+{amount}) HP: {self.hp}/{self.max_hp}')

    def status(self):
        print(f'{self.char_name}: HP {self.hp}/{self.max_hp}, ATK {self.atk}')

hero = Character('용사', 100, 25)
hero.status()
hero.hp = hero.hp - 40
hero.status()
hero.heal(30)
hero.heal(50)`,
      expectedOutput: `용사: HP 100/100, ATK 25\n용사: HP 60/100, ATK 25\n용사 회복! (+30) HP: 90/100\n용사 회복! (+50) HP: 100/100`,
      hint: "max_hp는 최대 체력! 회복해도 이걸 넘을 수 없어요!",
      hint2: "heal(50)을 해도 90+50=140이 아니라 max_hp인 100이 돼요!"
    }
  ]
}
