import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "게임 흐름 설계",
  emoji: "🔄",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "💭 게임은 어떤 순서로 흘러갈까?",
      content: `💭 직업을 고르고, 싸우고, 아이템 사고... 이 흐름을 **코드로 어떻게 반복**시킬까?

\`\`\`
[시작]
  │
  ├→ 직업 선택 (용사/마법사/궁수)
  │
  ├→ [메인 루프] ──────────────┐
  │    ├→ 전투 (몬스터와 싸움)  │
  │    ├→ 상점 (아이템 구매)    │
  │    ├→ 인벤토리 (아이템 사용) │
  │    ├→ 세이브 (저장)         │
  │    └→ 종료                  │
  │         ↑                   │
  │         └───────────────────┘
  │
  └→ [게임 오버 or 클리어!]
\`\`\`

@핵심: **while 반복문** 안에서 행동을 선택하는 구조 = 게임 루프!`
    },
    {
      id: "ch2-1",
      type: "explain",
      title: "💭 input() 대신 리스트에 미리 넣어두면?",
      content: `💭 웹에서는 input()을 쓸 수 없어! 그러면 플레이어의 행동을 **미리 리스트에** 넣어두면 어떨까?

\`\`\`python
# 원래 게임 (input 사용 - 웹에선 불가!)
action = input('행동? ')

# 우리 방식 (리스트에 미리 넣기!)
actions = ['attack', 'attack', 'heal', 'shop']
\`\`\`

@핵심: 행동을 **리스트에 미리** 넣어두면 input() 없이도 게임 시나리오를 만들 수 있어!`
    },
    {
      id: "ch2-1a",
      type: "explain",
      title: "💭 리스트에서 하나씩 순서대로 꺼내려면?",
      content: `💭 리스트에 행동을 넣었는데... **순서대로 하나씩** 꺼내는 함수가 필요하지 않을까?

\`\`\`python
idx = 0
def next_action():
    global idx
    if idx < len(actions):
        a = actions[idx]
        idx += 1
        return a
    return 'quit'  # 다 쓰면 종료!
\`\`\`

💡 idx가 0부터 시작해서 호출할 때마다 +1 → 리스트의 다음 행동을 꺼내!

@핵심: **next_action()** 함수로 리스트에서 행동을 하나씩 꺼내면 자동 시나리오 완성!`
    },
    {
      id: "ch2-2",
      type: "tryit",
      title: "💻 actions 리스트로 메뉴!",
      task: "actions 리스트로 메뉴 시스템을 실행해보세요!",
      initialCode: `# actions 리스트 = 미리 정한 행동!
actions = ['battle', 'battle', 'shop', 'inventory', 'save', 'quit']

idx = 0
def next_action():
    global idx
    if idx < len(actions):
        a = actions[idx]
        idx += 1
        return a
    return 'quit'

# 게임 루프!
print('=== 텍스트 RPG ===')
turn = 1
while True:
    action = next_action()
    if action == 'quit':
        print('\\n게임 종료!')
        break

    print(f'\\n[{turn}턴] 행동: {action}')

    if action == 'battle':
        print('  -> 전투 시작!')
    elif action == 'shop':
        print('  -> 상점 입장!')
    elif action == 'inventory':
        print('  -> 인벤토리 확인!')
    elif action == 'save':
        print('  -> 게임 저장!')

    turn += 1`,
      expectedOutput: `=== 텍스트 RPG ===\n\n[1턴] 행동: battle\n  -> 전투 시작!\n\n[2턴] 행동: battle\n  -> 전투 시작!\n\n[3턴] 행동: shop\n  -> 상점 입장!\n\n[4턴] 행동: inventory\n  -> 인벤토리 확인!\n\n[5턴] 행동: save\n  -> 게임 저장!\n\n게임 종료!`,
      hint: "while + next_action()으로 게임 루프를 만들어요!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-3",
      type: "tryit",
      title: "💻 직업 선택 시스템!",
      task: "직업에 따라 다른 스탯을 가진 캐릭터를 만들어보세요!",
      initialCode: `class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        self.level = 1
        self.exp = 0
        self.gold = 0
        self.inventory = []

        # 직업별 스탯!
        if job == 'warrior':
            self.hp, self.max_hp = 120, 120
            self.atk = 15
            self.defense = 12
        elif job == 'mage':
            self.hp, self.max_hp = 80, 80
            self.atk = 25
            self.defense = 5
        elif job == 'archer':
            self.hp, self.max_hp = 100, 100
            self.atk = 20
            self.defense = 8

    def status(self):
        jobs = {'warrior': '용사', 'mage': '마법사', 'archer': '궁수'}
        print(f'[{jobs[self.job]}] {self.name}')
        print(f'  HP: {self.hp}/{self.max_hp}')
        print(f'  ATK: {self.atk} | DEF: {self.defense}')

# 직업 선택! (actions 패턴)
job_choice = 'warrior'

print('=== 직업 선택 ===')
print(f'선택: {job_choice}')

hero = Character('플레이어', job_choice)
print()
hero.status()

# 다른 직업도 비교!
print('\\n=== 모든 직업 비교 ===')
for job in ['warrior', 'mage', 'archer']:
    c = Character('테스트', job)
    c.status()
    print()`,
      expectedOutput: `=== 직업 선택 ===\n선택: warrior\n\n[용사] 플레이어\n  HP: 120/120\n  ATK: 15 | DEF: 12\n\n=== 모든 직업 비교 ===\n[용사] 테스트\n  HP: 120/120\n  ATK: 15 | DEF: 12\n\n[마법사] 테스트\n  HP: 80/80\n  ATK: 25 | DEF: 5\n\n[궁수] 테스트\n  HP: 100/100\n  ATK: 20 | DEF: 8\n`,
      hint: "if/elif로 직업마다 다른 스탯을 설정!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-4",
      type: "mission",
      title: "🎯 미션: 메뉴 시스템 완성!",
      task: "빈칸 3개를 채워서 게임 메뉴를 완성하세요!",
      initialCode: `actions = ['battle', 'shop', 'status', 'quit']

idx = 0
def next_action():
    global ___
    if idx < len(actions):
        a = actions[idx]
        idx += 1
        return a
    return 'quit'

gold = 100
hp = 80

print('=== 메뉴 ===')
while True:
    action = ___()
    if action == 'quit':
        print('게임 종료!')
        break

    if action == 'battle':
        print(f'전투! 골드 +50')
        gold += 50
    elif action == '___':
        print(f'상점! (보유: {gold}골드)')
    elif action == 'status':
        print(f'HP: {hp}, 골드: {gold}')`,
      expectedOutput: `=== 메뉴 ===\n전투! 골드 +50\n상점! (보유: 150골드)\nHP: 80, 골드: 150\n게임 종료!`,
      hint: "global로 idx 접근, next_action() 호출, 'shop' 문자열!",
      hint2: "idx / next_action / shop"
    },
    {
      id: "ch2-5",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "웹 환경(Pyodide)에서 `input()` 대신 사용하는 방법은?",
      options: [
        "prompt() 함수 사용",
        "actions 리스트에 미리 행동을 넣어두기",
        "sys.stdin으로 읽기",
        "웹에서는 파이썬을 쓸 수 없다"
      ],
      answer: 1,
      explanation: "actions = ['attack', 'heal', 'shop'] 처럼 미리 행동을 정해두고, next_action()으로 하나씩 꺼내요!"
    },
    {
      id: "ch2-6",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "직업 선택 시 if/elif를 쓰는 이유는?",
      options: [
        "파이썬에 switch문이 없어서",
        "직업마다 다른 스탯을 설정하려고",
        "코드를 길게 만들려고",
        "에러를 방지하려고"
      ],
      answer: 1,
      explanation: "용사는 HP 높게, 마법사는 ATK 높게! 직업마다 다른 값을 설정하려면 if/elif 분기가 필요해요!"
    },
    {
      id: "ch2-7",
      type: "explain",
      title: "💭 지금까지 설계한 것을 정리하면?",
      content: `💭 클래스 3개, 게임 흐름, actions 패턴... 이걸 한눈에 정리하면 어떤 모습일까?

### 만들 클래스 3개:
- **Character** — 직업별 스탯, 레벨업, 인벤토리
- **Monster** — HP, 공격력, 보상
- **Item** — 종류, 효과, 가격

### 게임 흐름:
\`\`\`
직업선택 → [전투/상점/인벤토리/세이브] 반복 → 종료
\`\`\`

### Pyodide 대응:
\`\`\`python
actions = ['warrior', 'attack', 'shop', 'save']
\`\`\`

@핵심: **클래스 3개 + while 루프 + actions 리스트** = 텍스트 RPG 설계 완료!`
    }
  ]
}
