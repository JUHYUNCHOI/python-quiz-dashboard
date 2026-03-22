import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "상점 시스템",
  emoji: "🏪",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 상점 아이템을 어떻게 관리할까?",
      content: `💭 물약, 큰 물약, 힘의 물약... 상점에 파는 아이템 목록을 **깔끔하게 저장**하려면?

\`\`\`python
shop_items = {
    '물약':     Item('물약', 'heal', 30, 50),
    '큰 물약':  Item('큰 물약', 'heal', 60, 100),
    '힘의 물약': Item('힘의 물약', 'atk', 5, 80),
}
\`\`\`

### 상점 기능:
1. **목록 보기** — 이름, 효과, 가격
2. **구매** — 골드 확인 → 차감 → 인벤토리에 추가
3. **잔액 부족** — "골드가 부족합니다!"

@핵심: **딕셔너리**로 상점 상품을 관리하면 이름으로 바로 꺼낼 수 있어!`
    },
    {
      id: "ch1-1",
      type: "tryit",
      title: "💻 상점 만들기!",
      task: "상점에서 아이템을 구매하는 시스템을 실행하세요!",
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
        self.gold = 200
        self.inventory = []

    def add_item(self, item):
        self.inventory.append(item)

# 상점!
shop_items = {
    'potion':     Item('물약', 'heal', 30, 50),
    'big_potion': Item('큰 물약', 'heal', 60, 100),
    'power':      Item('힘의 물약', 'atk', 5, 80),
}

def show_shop():
    print('=== 상점 ===')
    for key, item in shop_items.items():
        types = {'heal': '회복', 'atk': '공격력'}
        print(f'  {item.name}: {types[item.item_type]} +{item.value} ({item.price}골드)')

def buy_item(hero, item_key):
    if item_key not in shop_items:
        print('  없는 상품!')
        return
    item = shop_items[item_key]
    if hero.gold < item.price:
        print(f'  골드 부족! (보유: {hero.gold}, 필요: {item.price})')
        return
    hero.gold -= item.price
    # 새 아이템 객체 생성!
    new_item = Item(item.name, item.item_type, item.value, item.price)
    hero.add_item(new_item)
    print(f'  {item.name} 구매! (-{item.price}골드, 잔액: {hero.gold})')

# 테스트!
hero = Character('용사')
print(f'보유 골드: {hero.gold}')

show_shop()

# actions 패턴으로 구매!
buy_actions = ['potion', 'potion', 'power', 'big_potion']

print('\\n--- 쇼핑! ---')
for action in buy_actions:
    buy_item(hero, action)

print(f'\\n잔액: {hero.gold}골드')
print(f'인벤토리: {len(hero.inventory)}개')
for item in hero.inventory:
    print(f'  - {item.name}')`,
      expectedOutput: `보유 골드: 200\n=== 상점 ===\n  물약: 회복 +30 (50골드)\n  큰 물약: 회복 +60 (100골드)\n  힘의 물약: 공격력 +5 (80골드)\n\n--- 쇼핑! ---\n  물약 구매! (-50골드, 잔액: 150)\n  물약 구매! (-50골드, 잔액: 100)\n  힘의 물약 구매! (-80골드, 잔액: 20)\n  골드 부족! (보유: 20, 필요: 100)\n\n잔액: 20골드\n인벤토리: 3개\n  - 물약\n  - 물약\n  - 힘의 물약`,
      hint: "골드 확인 → 차감 → 인벤토리에 추가!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-2",
      type: "mission",
      title: "🎯 미션: 상점 완성!",
      task: "빈칸 3개를 채워서 상점 시스템을 완성하세요!",
      initialCode: `class Item:
    def __init__(self, name, price):
        self.name = name
        self.price = price

shop = {
    'sword': Item('검', 150),
    'shield': Item('방패', 120),
}

gold = 200

def buy(item_key):
    global gold
    item = shop[item_key]
    if gold ___ item.price:
        print(f'골드 부족!')
        return False
    gold -= item.___
    print(f'{item.name} 구매! (잔액: {gold})')
    return True

print(f'골드: {gold}')
buy('sword')
buy('___')
print(f'남은 골드: {gold}')`,
      expectedOutput: `골드: 200\n검 구매! (잔액: 50)\n골드 부족!\n남은 골드: 50`,
      hint: "골드 비교, 가격 차감, 방패 구매!",
      hint2: "< / price / shield"
    },
    {
      id: "ch1-3",
      type: "tryit",
      title: "💻 전투 → 보상 → 상점!",
      task: "전투 승리 후 골드를 얻고 상점에서 쇼핑하세요!",
      initialCode: `class Character:
    def __init__(self, name, hp, atk, defense):
        self.name = name
        self.hp, self.max_hp = hp, hp
        self.atk = atk
        self.defense = defense
        self.gold = 0
        self.inventory = []
        self.alive = True

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1:
            actual = 1
        self.hp -= actual
        if self.hp <= 0:
            self.hp = 0
            self.alive = False
        return actual

class Monster:
    def __init__(self, name, hp, atk, defense, gold):
        self.name = name
        self.hp = hp
        self.atk = atk
        self.defense = defense
        self.gold_reward = gold
        self.alive = True

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1:
            actual = 1
        self.hp -= actual
        if self.hp <= 0:
            self.hp = 0
            self.alive = False
        return actual

# 간단한 전투!
hero = Character('용사', 120, 20, 10)
goblin = Monster('고블린', 40, 12, 3, 50)

print('=== 전투! ===')
while hero.alive and goblin.alive:
    dmg = goblin.take_damage(hero.atk)
    print(f'  용사 -> 고블린 ({dmg})')
    if goblin.alive:
        dmg = hero.take_damage(goblin.atk)
        print(f'  고블린 -> 용사 ({dmg})')

print(f'\\n고블린 처치! +{goblin.gold_reward}골드')
hero.gold += goblin.gold_reward

# 상점!
print(f'\\n=== 상점 (보유: {hero.gold}골드) ===')
print(f'  물약: 30골드')
# 물약 구매
hero.gold -= 30
hero.inventory.append('물약')
print(f'  물약 구매! (잔액: {hero.gold})')

# 물약 사용
hero.hp = min(hero.hp + 30, hero.max_hp)
hero.inventory.pop(0)
print(f'\\n물약 사용! HP: {hero.hp}/{hero.max_hp}')
print(f'남은 골드: {hero.gold}')`,
      expectedOutput: `=== 전투! ===\n  용사 -> 고블린 (17)\n  고블린 -> 용사 (2)\n  용사 -> 고블린 (17)\n  고블린 -> 용사 (2)\n  용사 -> 고블린 (17)\n\n고블린 처치! +50골드\n\n=== 상점 (보유: 50골드) ===\n  물약: 30골드\n  물약 구매! (잔액: 20)\n\n물약 사용! HP: 120/120\n남은 골드: 20`,
      hint: "전투 → 보상 → 상점 → 아이템 사용, 자연스러운 흐름!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-4",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "보유 골드가 80이고 물약이 100골드일 때 올바른 처리는?",
      options: [
        "그냥 구매 (마이너스 골드)",
        "에러 발생",
        "'골드 부족!' 메시지 출력",
        "자동으로 할인"
      ],
      answer: 2,
      explanation: "if gold < price: 로 체크해서 부족하면 구매를 막아요!"
    }
  ]
}
