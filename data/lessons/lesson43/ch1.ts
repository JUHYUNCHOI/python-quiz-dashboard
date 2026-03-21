import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "캐릭터 클래스 만들기",
  emoji: "🦸",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 클래스로 진짜 RPG 게임을 만들 수 있을까?",
      content: `💭 지금까지 배운 클래스, 메서드, 속성을 조합하면... **진짜 RPG 전투 게임**을 만들 수 있을까?

### 4단계로 완성:
1. 🦸 **캐릭터 클래스** — 기본 속성
2. 👹 **몬스터 클래스** — 적 만들기
3. ⚔️ **전투 시스템** — 턴제 배틀
4. 🏆 **레벨업 시스템** — 성장

\`\`\`python
# 최종 목표!
hero = Hero('용사', 100, 20)
monster = Monster('드래곤', 80, 15)
battle(hero, monster)  # 자동 전투!
\`\`\`

@핵심: 클래스 + 메서드 + 속성 = **RPG 게임**까지 만들 수 있다!`
    },
    {
      id: "ch1-1",
      type: "tryit",
      title: "💻 1단계: 캐릭터 기본 클래스",
      task: "Character 클래스의 기본 구조를 실행해보세요!",
      initialCode: `class Character:
    def __init__(self, name, hp, atk):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.atk = atk
        self.alive = True

    def status(self):
        bar_len = 10
        filled = int(self.hp / self.max_hp * bar_len)
        bar = '#' * filled + '-' * (bar_len - filled)
        state = 'O' if self.alive else 'X'
        print(f'[{state}] {self.name}: [{bar}] HP {self.hp}/{self.max_hp} ATK {self.atk}')

hero = Character('용사', 100, 20)
mage = Character('마법사', 80, 30)
hero.status()
mage.status()`,
      expectedOutput: `[O] 용사: [##########] HP 100/100 ATK 20\n[O] 마법사: [##########] HP 80/80 ATK 30`,
      hint: "HP 바는 현재 체력 비율로 만들어요!",
      hint2: "filled = int(self.hp / self.max_hp * bar_len)으로 비율 계산!"
    },
    {
      id: "ch1-2",
      type: "mission",
      title: "🎯 미션: 캐릭터에 방어력 추가!",
      task: "Character 클래스에 defense(방어력) 속성을 추가하세요! 빈칸 2개를 채우세요!",
      initialCode: `class Character:
    def __init__(self, name, hp, atk, defense):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.atk = atk
        self.___ = defense
        self.alive = True

    def status(self):
        state = 'O' if self.alive else 'X'
        print(f'[{state}] {self.name}: HP {self.hp}/{self.max_hp} ATK {self.atk} DEF {self.___}')

hero = Character('용사', 100, 20, 10)
hero.status()`,
      expectedOutput: `[O] 용사: HP 100/100 ATK 20 DEF 10`,
      hint: "방어력도 다른 속성처럼 self.xxx로 저장해요!",
      hint2: "defense / defense"
    }
  ]
}
