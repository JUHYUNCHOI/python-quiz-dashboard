import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "게임 완성!",
  emoji: "🎮",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 전투, 상점, 세이브를 어떻게 하나로 묶을까?",
      content: `💭 전투도 하고 상점도 가고 세이브도 하고... 이 **모든 기능을 while 루프 하나**로 돌릴 수 있을까?

\`\`\`python
actions = ['warrior', 'battle', 'battle', 'shop',
           'buy_potion', 'use_potion', 'save', 'battle',
           'quit']

idx = 0
while True:
    action = actions[idx]
    idx += 1

    if action == 'quit':
        break
    elif action == 'battle':
        # 전투!
    elif action == 'shop':
        # 상점!
    elif action == 'save':
        # 세이브!
    ...
\`\`\`

@핵심: **actions 리스트가 곧 게임 시나리오!** while + if/elif로 행동별 분기!`
    },
    {
      id: "ch3-1",
      type: "tryit",
      title: "💻 전체 게임 실행!",
      task: "완성된 텍스트 RPG를 실행해보세요!",
      initialCode: `import json
import random
random.seed(42)

class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        self.level = 1
        self.exp = 0
        self.gold = 0
        self.inventory = []
        self.alive = True
        if job == 'warrior':
            self.hp, self.max_hp, self.atk, self.defense = 120, 120, 15, 12
        elif job == 'mage':
            self.hp, self.max_hp, self.atk, self.defense = 80, 80, 25, 5
        else:
            self.hp, self.max_hp, self.atk, self.defense = 100, 100, 20, 8

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1: actual = 1
        self.hp -= actual
        if self.hp <= 0:
            self.hp = 0
            self.alive = False
        return actual

    def gain_exp(self, amount):
        self.exp += amount
        if self.exp >= 100:
            self.exp -= 100
            self.level += 1
            self.max_hp += 10
            self.hp = self.max_hp
            self.atk += 3
            self.defense += 2
            print(f'  ★ 레벨 업! Lv.{self.level}!')

    def status(self):
        jobs = {'warrior': '용사', 'mage': '마법사', 'archer': '궁수'}
        print(f'  [{jobs[self.job]}] {self.name} Lv.{self.level}')
        print(f'  HP: {self.hp}/{self.max_hp} | ATK: {self.atk} | DEF: {self.defense}')
        print(f'  EXP: {self.exp}/100 | 골드: {self.gold}')

    def to_dict(self):
        return {'name': self.name, 'job': self.job, 'level': self.level,
                'hp': self.hp, 'max_hp': self.max_hp, 'atk': self.atk,
                'defense': self.defense, 'exp': self.exp, 'gold': self.gold}

class Monster:
    def __init__(self, name, hp, atk, defense, exp, gold):
        self.name = name
        self.hp = hp
        self.atk = atk
        self.defense = defense
        self.exp_reward = exp
        self.gold_reward = gold
        self.alive = True

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1: actual = 1
        self.hp -= actual
        if self.hp <= 0:
            self.hp = 0
            self.alive = False
        return actual

def create_monster():
    monsters = [
        ('슬라임', 30, 8, 2, 30, 20),
        ('고블린', 50, 15, 5, 60, 40),
        ('오크', 70, 18, 8, 80, 60),
    ]
    m = random.choice(monsters)
    return Monster(m[0], m[1], m[2], m[3], m[4], m[5])

# === 게임 시작! ===
actions = [
    'warrior',       # 직업 선택
    'battle',        # 1차 전투
    'attack', 'attack', 'attack',
    'battle',        # 2차 전투
    'attack', 'attack', 'heal', 'attack', 'attack',
    'status',        # 상태 확인
    'shop',          # 상점
    'buy_potion',
    'save',          # 세이브
    'quit'
]

idx = 0
def next_action():
    global idx
    if idx < len(actions):
        a = actions[idx]
        idx += 1
        return a
    return 'quit'

# 직업 선택
job = next_action()
hero = Character('플레이어', job)
jobs_kr = {'warrior': '용사', 'mage': '마법사', 'archer': '궁수'}
print(f'=== {jobs_kr[job]} 탄생! ===')
hero.status()

save_data = None

# 게임 루프!
while True:
    action = next_action()
    if action == 'quit':
        print('\\n게임 종료!')
        break

    if action == 'battle':
        monster = create_monster()
        print(f'\\n--- {monster.name} 등장! (HP:{monster.hp}) ---')

        while hero.alive and monster.alive:
            battle_action = next_action()
            if battle_action == 'attack':
                dmg = monster.take_damage(hero.atk)
                print(f'  {hero.name} -> {monster.name} ({dmg})')
            elif battle_action == 'heal':
                hero.hp = min(hero.hp + 30, hero.max_hp)
                print(f'  {hero.name} 회복! HP: {hero.hp}/{hero.max_hp}')

            if monster.alive:
                dmg = hero.take_damage(monster.atk)
                print(f'  {monster.name} -> {hero.name} ({dmg})')

        if not monster.alive:
            hero.gold += monster.gold_reward
            hero.gain_exp(monster.exp_reward)
            print(f'  승리! +{monster.exp_reward}EXP, +{monster.gold_reward}골드')

    elif action == 'status':
        print('\\n--- 상태 ---')
        hero.status()

    elif action == 'shop':
        print(f'\\n--- 상점 (보유: {hero.gold}골드) ---')
        print('  물약: 30골드')

    elif action == 'buy_potion':
        if hero.gold >= 30:
            hero.gold -= 30
            hero.inventory.append('물약')
            print(f'  물약 구매! (잔액: {hero.gold})')
        else:
            print('  골드 부족!')

    elif action == 'save':
        save_data = json.dumps(hero.to_dict(), ensure_ascii=False)
        print(f'\\n--- 세이브 완료! ---')

print('\\n=== 최종 결과 ===')
hero.status()
if save_data:
    print(f'\\n세이브: {save_data}')`,
      expectedOutput: `=== 용사 탄생! ===\n  [용사] 플레이어 Lv.1\n  HP: 120/120 | ATK: 15 | DEF: 12\n  EXP: 0/100 | 골드: 0\n\n--- 고블린 등장! (HP:50) ---\n  플레이어 -> 고블린 (10)\n  고블린 -> 플레이어 (3)\n  플레이어 -> 고블린 (10)\n  고블린 -> 플레이어 (3)\n  플레이어 -> 고블린 (10)\n  고블린 -> 플레이어 (3)\n  승리! +60EXP, +40골드\n\n--- 슬라임 등장! (HP:30) ---\n  플레이어 -> 슬라임 (13)\n  슬라임 -> 플레이어 (1)\n  플레이어 -> 슬라임 (13)\n  슬라임 -> 플레이어 (1)\n  플레이어 회복! HP: 120/120\n  슬라임 -> 플레이어 (1)\n  플레이어 -> 슬라임 (13)\n  승리! +30EXP, +20골드\n\n--- 상태 ---\n  [용사] 플레이어 Lv.1\n  HP: 119/120 | ATK: 15 | DEF: 12\n  EXP: 90/100 | 골드: 60\n\n--- 상점 (보유: 60골드) ---\n  물약: 30골드\n  물약 구매! (잔액: 30)\n\n--- 세이브 완료! ---\n\n게임 종료!\n\n=== 최종 결과 ===\n  [용사] 플레이어 Lv.1\n  HP: 119/120 | ATK: 15 | DEF: 12\n  EXP: 90/100 | 골드: 30\n\n세이브: {"name": "플레이어", "job": "warrior", "level": 1, "hp": 119, "max_hp": 120, "atk": 15, "defense": 12, "exp": 90, "gold": 30}`,
      hint: "actions 리스트가 게임 시나리오! while로 반복!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch3-2",
      type: "mission",
      title: "🎯 미션: 게임 루프!",
      task: "빈칸 3개를 채워서 게임 루프를 완성하세요!",
      initialCode: `actions = ['battle', 'shop', 'save', 'quit']
idx = 0

hp = 100
gold = 0
saved = False

while True:
    action = actions[idx]
    ___ += 1

    if action == 'quit':
        print('종료!')
        ___

    if action == 'battle':
        print(f'전투 승리! +50골드')
        gold += 50
    elif action == '___':
        print(f'상점! (보유: {gold}골드)')
    elif action == 'save':
        saved = True
        print('저장 완료!')

print(f'골드: {gold}, 저장: {saved}')`,
      expectedOutput: `전투 승리! +50골드\n상점! (보유: 50골드)\n저장 완료!\n종료!\n골드: 50, 저장: True`,
      hint: "인덱스 증가, 루프 탈출, 상점 문자열!",
      hint2: "idx / break / shop"
    },
    {
      id: "ch3-3",
      type: "tryit",
      title: "💻 마법사로 플레이!",
      task: "마법사를 선택하면 전투가 어떻게 달라지는지 확인하세요!",
      initialCode: `import random
random.seed(42)

class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        self.alive = True
        if job == 'warrior':
            self.hp, self.max_hp, self.atk, self.defense = 120, 120, 15, 12
        elif job == 'mage':
            self.hp, self.max_hp, self.atk, self.defense = 80, 80, 25, 5
        else:
            self.hp, self.max_hp, self.atk, self.defense = 100, 100, 20, 8

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1: actual = 1
        self.hp -= actual
        if self.hp <= 0:
            self.hp = 0
            self.alive = False
        return actual

class Monster:
    def __init__(self, name, hp, atk, defense):
        self.name = name
        self.hp = hp
        self.atk = atk
        self.defense = defense
        self.alive = True

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1: actual = 1
        self.hp -= actual
        if self.hp <= 0:
            self.hp = 0
            self.alive = False
        return actual

# 같은 몬스터, 다른 직업!
print('=== 직업별 전투 비교 (vs 고블린 HP:50 ATK:15 DEF:5) ===')

for job in ['warrior', 'mage', 'archer']:
    hero = Character('테스트', job)
    goblin = Monster('고블린', 50, 15, 5)
    jobs = {'warrior': '용사', 'mage': '마법사', 'archer': '궁수'}

    turns = 0
    while hero.alive and goblin.alive:
        turns += 1
        goblin.take_damage(hero.atk)
        if goblin.alive:
            hero.take_damage(goblin.atk)

    print(f'{jobs[job]}: {turns}턴 만에 승리! (남은 HP: {hero.hp}/{hero.max_hp})')`,
      expectedOutput: `=== 직업별 전투 비교 (vs 고블린 HP:50 ATK:15 DEF:5) ===\n용사: 5턴 만에 승리! (남은 HP: 108/120)\n마법사: 3턴 만에 승리! (남은 HP: 60/80)\n궁수: 4턴 만에 승리! (남은 HP: 72/100)`,
      hint: "마법사는 빨리 이기지만 HP가 적게 남아요!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch3-4",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "게임 루프에서 `while True` + `break`를 쓰는 이유는?",
      options: [
        "for문보다 빨라서",
        "'quit'이 올 때까지 계속 반복하려고",
        "파이썬 규칙이라서",
        "에러를 방지하려고"
      ],
      answer: 1,
      explanation: "게임은 언제 끝날지 모르니까 while True로 무한 반복! 'quit'이 오면 break로 탈출해요!"
    },
    {
      id: "ch3-5",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "직업별 전투 결과가 다른 이유는?",
      options: [
        "random이 다르게 작동해서",
        "ATK, DEF, HP가 직업마다 달라서",
        "몬스터가 다른 공격을 해서",
        "버그 때문에"
      ],
      answer: 1,
      explanation: "마법사(ATK 25)는 빨리 이기지만 HP(80)가 적고, 용사(DEF 12)는 느리지만 안전해요!"
    },
    {
      id: "ch3-6",
      type: "explain",
      title: "💭 지금까지 어떤 개념을 총동원했을까?",
      content: `💭 클래스, 딕셔너리, 리스트, JSON, 반복문... 텍스트 RPG에 **몇 가지 개념**이 들어갔을까?

### 만든 것들:
- **Character** — 3직업, 레벨업, 전투, 인벤토리
- **Monster** — 여러 종류, 보상 시스템
- **Item** — 회복/공격/방어 아이템
- **상점** — 구매, 골드 관리
- **세이브/로드** — JSON 직렬화
- **게임 루프** — actions 리스트로 자동 플레이

### 사용한 개념 총정리:
| 개념 | 어디서 | 활용 |
|------|--------|------|
| **클래스** | Part 7 | Character, Monster, Item |
| **딕셔너리** | Part 3 | 상점, 세이브 데이터 |
| **리스트** | Part 3 | 인벤토리, actions |
| **JSON** | Part 8 | 세이브/로드 |
| **반복문** | Part 2 | 게임 루프, 전투 |
| **조건문** | Part 2 | 행동 분기, 데미지 계산 |

@핵심: **6가지 핵심 개념**을 총동원해서 텍스트 RPG 하나를 완성했어!`
    }
  ]
}
