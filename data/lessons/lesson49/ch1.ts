import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "클래스 설계",
  emoji: "📋",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 클래스로 뭘 만들 수 있을까?",
      content: `💭 클래스, 딕셔너리, JSON... 이걸 다 합치면 **진짜 게임**을 만들 수 있지 않을까?

\`\`\`
=== 텍스트 RPG ===
직업을 선택하세요: 용사
용사 탄생! HP:120 ATK:15 DEF:10

--- 1턴 ---
슬라임 등장! HP:30
> 공격!
용사 -> 슬라임 (12 데미지)
슬라임 -> 용사 (3 데미지)
...
슬라임 처치! +50 골드, +30 경험치
레벨 업! Lv.1 -> Lv.2

> 상점
물약 50골드 -> 구매!

> 세이브
저장 완료!
\`\`\`

@핵심: Part 7-8에서 배운 **클래스, 모듈, JSON**을 총동원해서 텍스트 RPG를 만들 거예요!`
    },
    {
      id: "ch1-1",
      type: "explain",
      title: "💭 게임에 필요한 설계도는 몇 개?",
      content: `💭 RPG에는 플레이어, 몬스터, 아이템이 있어. 이걸 **클래스 몇 개**로 표현할 수 있을까?

| 클래스 | 역할 | 속성 |
|--------|------|------|
| **Character** | 플레이어 | 이름, HP, 공격력, 방어력, 직업, 레벨, 골드 |
| **Monster** | 적 | 이름, HP, 공격력, 방어력, 경험치, 골드 |
| **Item** | 아이템 | 이름, 종류, 효과, 가격 |

\`\`\`python
# 클래스 3개로 게임 전체를 만들어요!
class Character:  # 플레이어
    ...
class Monster:    # 적
    ...
class Item:       # 아이템
    ...
\`\`\`

@핵심: **클래스 3개**(Character, Monster, Item)로 게임의 모든 요소를 설계할 수 있어!`
    },
    {
      id: "ch1-2",
      type: "explain",
      title: "💭 캐릭터의 기본 정보부터! 이름과 직업은?",
      content: `💭 RPG 캐릭터를 만들려면 **이름**과 **직업**은 당연히 필요하지? 여기서부터 시작해보자!

\`\`\`python
class Character:
    def __init__(self, name, job):
        self.name = name   # 이름
        self.job = job     # 직업
\`\`\`

@핵심: 클래스의 __init__에 **이름과 직업**을 먼저 넣어요! 가장 기본적인 정보부터!`
    },
    {
      id: "ch1-3",
      type: "explain",
      title: "💭 전투를 하려면 체력과 공격력이 필요해!",
      content: `💭 이름과 직업만으로는 싸울 수가 없어! **체력(HP)**이 있어야 맞을 수 있고, **공격력**이 있어야 때릴 수 있지?

\`\`\`python
        # 스탯 (직업마다 다르게 설정 가능!)
        self.hp = 100         # 현재 체력
        self.max_hp = 100     # 최대 체력 (회복 한도!)
        self.atk = 15         # 공격력
        self.defense = 10     # 방어력
\`\`\`

💡 **max_hp를 따로 저장하는 이유**: 체력이 줄었다 회복할 때, 최대치를 넘지 않게 제한해야 해요!

@핵심: **hp, max_hp, atk, defense** 4가지로 전투 능력치 완성!`
    },
    {
      id: "ch1-4",
      type: "explain",
      title: "💭 성장하려면 레벨, 경험치, 아이템 가방도!",
      content: `💭 몬스터를 잡으면 경험치를 얻고 **레벨업**! 골드로 **아이템 구매**! 이것도 속성으로 넣어야겠지?

\`\`\`python
        # 성장
        self.level = 1        # 레벨
        self.exp = 0          # 경험치
        self.gold = 0         # 골드

        # 장비
        self.inventory = []   # 인벤토리 (리스트!)
\`\`\`

**전체 합치면:**
\`\`\`python
class Character:
    def __init__(self, name, job):
        self.name = name      # 기본 정보
        self.job = job
        self.hp = 100         # 스탯
        self.max_hp = 100
        self.atk = 15
        self.defense = 10
        self.level = 1        # 성장
        self.exp = 0
        self.gold = 0
        self.inventory = []   # 장비
\`\`\`

@핵심: 기본정보 + 스탯 + 성장 + 장비 = **__init__ 완성!** 차근차근 쌓으면 복잡하지 않아요!`
    },
    {
      id: "ch1-5",
      type: "tryit",
      title: "💻 Character 기본 만들기!",
      task: "Character 클래스를 만들고 캐릭터 정보를 출력해보세요!",
      initialCode: `class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        self.hp = 100
        self.max_hp = 100
        self.atk = 15
        self.defense = 10
        self.level = 1
        self.exp = 0
        self.gold = 0
        self.inventory = []

    def status(self):
        print(f'=== {self.name} ===')
        print(f'직업: {self.job}')
        print(f'HP: {self.hp}/{self.max_hp}')
        print(f'ATK: {self.atk} | DEF: {self.defense}')
        print(f'Lv.{self.level} | EXP: {self.exp}')
        print(f'골드: {self.gold}')

# 캐릭터 만들기!
hero = Character('철수', '용사')
hero.status()`,
      expectedOutput: `=== 철수 ===\n직업: 용사\nHP: 100/100\nATK: 15 | DEF: 10\nLv.1 | EXP: 0\n골드: 0`,
      hint: "클래스로 캐릭터의 모든 정보를 관리해요!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-6",
      type: "explain",
      title: "💭 몬스터는 어떤 속성이 필요할까?",
      content: `💭 몬스터도 HP와 공격력이 필요해! 그리고 잡았을 때 **보상**도 줘야 하지?

\`\`\`python
class Monster:
    def __init__(self, name, hp, atk, defense, exp, gold):
        self.name = name
        self.hp = hp
        self.atk = atk
        self.defense = defense
        self.exp_reward = exp    # 처치 시 경험치
        self.gold_reward = gold  # 처치 시 골드
\`\`\`

@핵심: 몬스터는 전투 스탯 + **처치 보상(exp, gold)**이 핵심!`
    },
    {
      id: "ch1-7",
      type: "explain",
      title: "💭 아이템은 종류별로 효과가 다르잖아!",
      content: `💭 물약은 **회복**, 검은 **공격력 증가**, 방패는 **방어력 증가**... 종류별로 효과가 달라야 해!

\`\`\`python
class Item:
    def __init__(self, name, item_type, value, price):
        self.name = name
        self.item_type = item_type  # 'heal', 'atk', 'def'
        self.value = value          # 효과 수치
        self.price = price          # 가격
\`\`\`

@핵심: Item은 **종류(item_type)**로 구분하고, **효과(value)**와 **가격(price)**을 저장!`
    },
    {
      id: "ch1-8",
      type: "tryit",
      title: "💻 3개 클래스 모두 만들기!",
      task: "Character, Monster, Item 클래스를 모두 만들어보세요!",
      initialCode: `class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        self.hp = 100
        self.max_hp = 100
        self.atk = 15
        self.defense = 10
        self.level = 1

    def show(self):
        print(f'[{self.job}] {self.name}: HP {self.hp}/{self.max_hp}, ATK {self.atk}, DEF {self.defense}')

class Monster:
    def __init__(self, name, hp, atk, defense, exp, gold):
        self.name = name
        self.hp = hp
        self.atk = atk
        self.defense = defense
        self.exp_reward = exp
        self.gold_reward = gold

    def show(self):
        print(f'[몬스터] {self.name}: HP {self.hp}, ATK {self.atk}, DEF {self.defense}')

class Item:
    def __init__(self, name, item_type, value, price):
        self.name = name
        self.item_type = item_type
        self.value = value
        self.price = price

    def show(self):
        types = {'heal': '회복', 'atk': '공격력', 'def': '방어력'}
        print(f'[{types[self.item_type]}] {self.name}: +{self.value}, {self.price}골드')

# 생성!
hero = Character('영희', '마법사')
slime = Monster('슬라임', 30, 8, 2, 20, 30)
potion = Item('물약', 'heal', 30, 50)

hero.show()
slime.show()
potion.show()`,
      expectedOutput: `[마법사] 영희: HP 100/100, ATK 15, DEF 10\n[몬스터] 슬라임: HP 30, ATK 8, DEF 2\n[회복] 물약: +30, 50골드`,
      hint: "3개 클래스로 게임의 모든 요소를 표현!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-9",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "RPG 게임에서 Monster 클래스에 꼭 필요하지 않은 속성은?",
      options: ["hp (체력)", "atk (공격력)", "inventory (인벤토리)", "exp_reward (경험치 보상)"],
      answer: 2,
      explanation: "인벤토리는 플레이어(Character)의 속성! 몬스터는 HP, 공격력, 보상이 핵심이에요."
    },
    {
      id: "ch1-10",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "`self.max_hp = hp`에서 max_hp를 따로 저장하는 이유는?",
      options: [
        "메모리를 아끼려고",
        "회복할 때 최대치를 알기 위해",
        "파이썬 문법이 그래서",
        "몬스터도 사용하려고"
      ],
      answer: 1,
      explanation: "HP가 줄었다가 회복할 때, max_hp보다 넘지 않게 제한해야 해요! `min(hp + heal, max_hp)` 패턴!"
    }
  ]
}
