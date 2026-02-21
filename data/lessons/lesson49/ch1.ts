import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "클래스 설계",
  emoji: "📋",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "🎮 텍스트 RPG를 만들자!",
      content: `## 우리가 만들 게임!

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

**Part 7-8에서 배운 클래스, 모듈, JSON을 총동원!**`
    },
    {
      id: "ch1-1",
      type: "explain",
      title: "📋 필요한 클래스 3개!",
      content: `## 게임에 필요한 것들

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

→ L38-39에서 배운 클래스를 **실전에 활용**!`
    },
    {
      id: "ch1-2",
      type: "explain",
      title: "🦸 Character 속성 설계",
      content: `## Character 클래스에 필요한 것

\`\`\`python
class Character:
    def __init__(s, name, job):
        # 기본 정보
        s.name = name      # 이름
        s.job = job        # 직업

        # 스탯 (직업마다 다름!)
        s.hp = 100         # 체력
        s.max_hp = 100
        s.atk = 15         # 공격력
        s.defense = 10     # 방어력

        # 성장
        s.level = 1        # 레벨
        s.exp = 0          # 경험치
        s.gold = 0         # 골드

        # 장비
        s.inventory = []   # 인벤토리
\`\`\`

→ **직업에 따라 스탯이 달라지게** 만들 거예요!`
    },
    {
      id: "ch1-3",
      type: "tryit",
      title: "💻 Character 기본 만들기!",
      task: "Character 클래스를 만들고 캐릭터 정보를 출력해보세요!",
      initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.hp = 100
        s.max_hp = 100
        s.atk = 15
        s.defense = 10
        s.level = 1
        s.exp = 0
        s.gold = 0
        s.inventory = []

    def status(s):
        print(f'=== {s.name} ===')
        print(f'직업: {s.job}')
        print(f'HP: {s.hp}/{s.max_hp}')
        print(f'ATK: {s.atk} | DEF: {s.defense}')
        print(f'Lv.{s.level} | EXP: {s.exp}')
        print(f'골드: {s.gold}')

# 캐릭터 만들기!
hero = Character('철수', '용사')
hero.status()`,
      expectedOutput: `=== 철수 ===\n직업: 용사\nHP: 100/100\nATK: 15 | DEF: 10\nLv.1 | EXP: 0\n골드: 0`,
      hint: "클래스로 캐릭터의 모든 정보를 관리해요!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-4",
      type: "explain",
      title: "👹 Monster & Item 설계",
      content: `## Monster 클래스

\`\`\`python
class Monster:
    def __init__(s, name, hp, atk, defense, exp, gold):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp    # 처치 시 경험치
        s.gold_reward = gold  # 처치 시 골드
\`\`\`

## Item 클래스

\`\`\`python
class Item:
    def __init__(s, name, item_type, value, price):
        s.name = name
        s.item_type = item_type  # 'heal', 'atk', 'def'
        s.value = value          # 효과 수치
        s.price = price          # 가격
\`\`\`

→ Monster는 **처치 보상**이, Item은 **종류와 효과**가 핵심!`
    },
    {
      id: "ch1-5",
      type: "tryit",
      title: "💻 3개 클래스 모두 만들기!",
      task: "Character, Monster, Item 클래스를 모두 만들어보세요!",
      initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.hp = 100
        s.max_hp = 100
        s.atk = 15
        s.defense = 10
        s.level = 1

    def show(s):
        print(f'[{s.job}] {s.name}: HP {s.hp}/{s.max_hp}, ATK {s.atk}, DEF {s.defense}')

class Monster:
    def __init__(s, name, hp, atk, defense, exp, gold):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp
        s.gold_reward = gold

    def show(s):
        print(f'[몬스터] {s.name}: HP {s.hp}, ATK {s.atk}, DEF {s.defense}')

class Item:
    def __init__(s, name, item_type, value, price):
        s.name = name
        s.item_type = item_type
        s.value = value
        s.price = price

    def show(s):
        types = {'heal': '회복', 'atk': '공격력', 'def': '방어력'}
        print(f'[{types[s.item_type]}] {s.name}: +{s.value}, {s.price}골드')

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
      id: "ch1-6",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "RPG 게임에서 Monster 클래스에 꼭 필요하지 않은 속성은?",
      options: ["hp (체력)", "atk (공격력)", "inventory (인벤토리)", "exp_reward (경험치 보상)"],
      answer: 2,
      explanation: "인벤토리는 플레이어(Character)의 속성! 몬스터는 HP, 공격력, 보상이 핵심이에요."
    },
    {
      id: "ch1-7",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "`s.max_hp = hp`에서 max_hp를 따로 저장하는 이유는?",
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
