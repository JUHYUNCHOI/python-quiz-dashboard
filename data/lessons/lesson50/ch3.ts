import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "Item + 인벤토리",
  emoji: "🎒",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 아이템 종류를 어떻게 구분할까?",
      content: `💭 물약은 HP 회복, 힘의 물약은 공격력 증가... 아이템마다 **효과가 다른데 어떻게 구분**하지?

| 종류 | 효과 | 예시 |
|------|------|------|
| **heal** | HP 회복 | 물약 (+30 HP) |
| **atk** | 공격력 증가 | 힘의 물약 (+5 ATK) |
| **def** | 방어력 증가 | 방어 물약 (+5 DEF) |

\`\`\`python
class Item:
    def __init__(self, name, item_type, value, price):
        self.name = name        # 물약
        self.item_type = item_type  # 'heal'
        self.value = value      # 30
        self.price = price      # 50
\`\`\`

@핵심: **item_type** 속성으로 'heal', 'atk', 'def'를 구분해서 효과를 다르게 적용!`
    },
    {
      id: "ch3-1",
      type: "tryit",
      title: "💻 Item 클래스 + 사용!",
      task: "아이템을 만들고 캐릭터에게 사용해보세요!",
      initialCode: `class Item:
    def __init__(self, name, item_type, value, price):
        self.name = name
        self.item_type = item_type
        self.value = value
        self.price = price

    def show(self):
        types = {'heal': '회복', 'atk': '공격력', 'def': '방어력'}
        print(f'  {self.name} [{types[self.item_type]} +{self.value}] ({self.price}골드)')

class Character:
    def __init__(self, name):
        self.name = name
        self.hp, self.max_hp = 100, 100
        self.atk = 15
        self.defense = 10
        self.inventory = []

    def use_item(self, item):
        if item.item_type == 'heal':
            self.hp = min(self.hp + item.value, self.max_hp)
            print(f'{self.name}: {item.name} 사용! HP {self.hp}/{self.max_hp}')
        elif item.item_type == 'atk':
            self.atk += item.value
            print(f'{self.name}: {item.name} 사용! ATK {self.atk}')
        elif item.item_type == 'def':
            self.defense += item.value
            print(f'{self.name}: {item.name} 사용! DEF {self.defense}')

# 아이템 생성
potion = Item('물약', 'heal', 30, 50)
power = Item('힘의 물약', 'atk', 5, 80)
shield = Item('방어 물약', 'def', 3, 60)

print('=== 아이템 목록 ===')
potion.show()
power.show()
shield.show()

# 사용!
hero = Character('철수')
hero.hp = 60  # 데미지를 입은 상태
print(f'\\n=== 아이템 사용 전 ===')
print(f'HP: {hero.hp}/{hero.max_hp} | ATK: {hero.atk} | DEF: {hero.defense}')

print(f'\\n=== 아이템 사용! ===')
hero.use_item(potion)
hero.use_item(power)
hero.use_item(shield)

print(f'\\n=== 최종 스탯 ===')
print(f'HP: {hero.hp}/{hero.max_hp} | ATK: {hero.atk} | DEF: {hero.defense}')`,
      expectedOutput: `=== 아이템 목록 ===\n  물약 [회복 +30] (50골드)\n  힘의 물약 [공격력 +5] (80골드)\n  방어 물약 [방어력 +3] (60골드)\n\n=== 아이템 사용 전 ===\nHP: 60/100 | ATK: 15 | DEF: 10\n\n=== 아이템 사용! ===\n철수: 물약 사용! HP 90/100\n철수: 힘의 물약 사용! ATK 20\n철수: 방어 물약 사용! DEF 13\n\n=== 최종 스탯 ===\nHP: 90/100 | ATK: 20 | DEF: 13`,
      hint: "item_type으로 if/elif 분기해서 효과 적용!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch3-2",
      type: "tryit",
      title: "💻 인벤토리 관리!",
      task: "인벤토리에 아이템을 넣고, 사용하고, 확인해보세요!",
      initialCode: `class Item:
    def __init__(self, name, item_type, value, price):
        self.name = name
        self.item_type = item_type
        self.value = value
        self.price = price

class Character:
    def __init__(self, name):
        self.name = name
        self.hp, self.max_hp = 100, 100
        self.atk = 15
        self.defense = 10
        self.inventory = []

    def add_item(self, item):
        self.inventory.append(item)
        print(f'  + {item.name} 획득!')

    def show_inventory(self):
        if len(self.inventory) == 0:
            print('  (비어있음)')
            return
        for i, item in enumerate(self.inventory):
            types = {'heal': '회복', 'atk': '공격', 'def': '방어'}
            print(f'  {i+1}. {item.name} [{types[item.item_type]} +{item.value}]')

    def use_item(self, index):
        if index < 0 or index >= len(self.inventory):
            print('  잘못된 번호!')
            return
        item = self.inventory.pop(index)  # 사용 후 제거!
        if item.item_type == 'heal':
            self.hp = min(self.hp + item.value, self.max_hp)
            print(f'  {item.name} 사용! HP {self.hp}/{self.max_hp}')
        elif item.item_type == 'atk':
            self.atk += item.value
            print(f'  {item.name} 사용! ATK {self.atk}')

# 테스트!
hero = Character('영희')
hero.hp = 50

print('=== 인벤토리 ===')
hero.show_inventory()

print('\\n--- 아이템 획득! ---')
hero.add_item(Item('물약', 'heal', 30, 50))
hero.add_item(Item('물약', 'heal', 30, 50))
hero.add_item(Item('힘의 물약', 'atk', 5, 80))

print('\\n=== 인벤토리 ===')
hero.show_inventory()

print('\\n--- 물약 사용! ---')
hero.use_item(0)

print('\\n=== 인벤토리 ===')
hero.show_inventory()
print(f'\\nHP: {hero.hp}/{hero.max_hp}')`,
      expectedOutput: `=== 인벤토리 ===\n  (비어있음)\n\n--- 아이템 획득! ---\n  + 물약 획득!\n  + 물약 획득!\n  + 힘의 물약 획득!\n\n=== 인벤토리 ===\n  1. 물약 [회복 +30]\n  2. 물약 [회복 +30]\n  3. 힘의 물약 [공격 +5]\n\n--- 물약 사용! ---\n  물약 사용! HP 80/100\n\n=== 인벤토리 ===\n  1. 물약 [회복 +30]\n  2. 힘의 물약 [공격 +5]\n\nHP: 80/100`,
      hint: "append로 추가, pop으로 사용 후 제거!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch3-3",
      type: "mission",
      title: "🎯 미션: 인벤토리 완성!",
      task: "빈칸 3개를 채워서 인벤토리 시스템을 완성하세요!",
      initialCode: `class Item:
    def __init__(self, name, item_type, value):
        self.name = name
        self.item_type = item_type
        self.value = value

class Character:
    def __init__(self, name):
        self.name = name
        self.hp, self.max_hp = 80, 100
        self.inventory = []

    def add_item(self, item):
        self.inventory.___(item)
        print(f'+ {item.name}')

    def use_item(self, index):
        item = self.inventory.___(index)
        if item.item_type == 'heal':
            self.hp = ___(self.hp + item.value, self.max_hp)
            print(f'{item.name} 사용! HP {self.hp}/{self.max_hp}')

hero = Character('철수')
hero.add_item(Item('물약', 'heal', 30))
hero.add_item(Item('큰 물약', 'heal', 50))

print(f'아이템 {len(hero.inventory)}개')
hero.use_item(0)
print(f'아이템 {len(hero.inventory)}개')`,
      expectedOutput: `+ 물약\n+ 큰 물약\n아이템 2개\n물약 사용! HP 100/100\n아이템 1개`,
      hint: "리스트에 추가, 꺼내기, 최대HP 제한!",
      hint2: "append / pop / min"
    },
    {
      id: "ch3-4",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "인벤토리에서 아이템을 사용하고 제거하는 메서드는?",
      options: ["inventory.remove(0)", "inventory.pop(index)", "inventory.delete(0)", "del inventory[0]"],
      answer: 1,
      explanation: "pop(index)는 해당 위치의 아이템을 꺼내고 반환해요! 사용+제거를 한 번에!"
    }
  ]
}
