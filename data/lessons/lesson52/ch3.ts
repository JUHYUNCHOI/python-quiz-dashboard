import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "어려운 도전",
  emoji: "⭐⭐⭐",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 업적과 드롭을 어떻게 만들까?",
      content: `💭 "몬스터 5마리 처치!" 업적, 확률적으로 아이템이 떨어지는 드롭... **lambda와 random**으로 만들 수 있을까?

| 번호 | 기능 | 난이도 |
|------|------|--------|
| ⑥ | 업적 시스템 | ⭐⭐⭐ |
| ⑦ | 몬스터 드롭 | ⭐⭐⭐ |

@핵심: **lambda로 조건 체크**(업적) + **random으로 확률 판정**(드롭) = 고급 기능 완성!`
    },
    {
      id: "ch3-1",
      type: "tryit",
      title: "💻 ⑥ 업적 시스템!",
      task: "조건을 달성하면 업적이 해금되는 시스템을 실행해보세요!",
      initialCode: `class Achievement:
    def __init__(self, name, description, condition_fn):
        self.name = name
        self.description = description
        self.condition_fn = condition_fn  # 함수!
        self.unlocked = False

    def check(self, player_data):
        if self.unlocked:
            return
        if self.condition_fn(player_data):
            self.unlocked = True
            print(f'  ★ 업적 해금: {self.name}!')
            print(f'    {self.description}')

# 업적 목록!
achievements = [
    Achievement('첫 전투', '첫 전투에서 승리!',
                lambda d: d['kills'] >= 1),
    Achievement('슬레이어', '몬스터 5마리 처치!',
                lambda d: d['kills'] >= 5),
    Achievement('부자', '골드 200 달성!',
                lambda d: d['gold'] >= 200),
    Achievement('고수', '레벨 3 달성!',
                lambda d: d['level'] >= 3),
]

def check_all(player_data):
    for ach in achievements:
        ach.check(player_data)

def show_achievements():
    print('=== 업적 ===')
    for ach in achievements:
        status = '★' if ach.unlocked else '  '
        print(f'  [{status}] {ach.name}: {ach.description}')

# 게임 진행 시뮬레이션!
player = {'kills': 0, 'gold': 0, 'level': 1}

show_achievements()

print('\\n--- 전투! ---')
player['kills'] += 1
player['gold'] += 40
check_all(player)

print('\\n--- 전투 4번 더! ---')
player['kills'] += 4
player['gold'] += 180
check_all(player)

print('\\n--- 레벨 업! ---')
player['level'] = 3
check_all(player)

print()
show_achievements()`,
      expectedOutput: `=== 업적 ===\n  [  ] 첫 전투: 첫 전투에서 승리!\n  [  ] 슬레이어: 몬스터 5마리 처치!\n  [  ] 부자: 골드 200 달성!\n  [  ] 고수: 레벨 3 달성!\n\n--- 전투! ---\n  ★ 업적 해금: 첫 전투!\n    첫 전투에서 승리!\n\n--- 전투 4번 더! ---\n  ★ 업적 해금: 슬레이어!\n    몬스터 5마리 처치!\n  ★ 업적 해금: 부자!\n    골드 200 달성!\n\n--- 레벨 업! ---\n  ★ 업적 해금: 고수!\n    레벨 3 달성!\n\n=== 업적 ===\n  [★] 첫 전투: 첫 전투에서 승리!\n  [★] 슬레이어: 몬스터 5마리 처치!\n  [★] 부자: 골드 200 달성!\n  [★] 고수: 레벨 3 달성!`,
      hint: "lambda로 조건 함수, condition_fn(data)로 체크!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch3-2",
      type: "tryit",
      title: "💻 ⑦ 몬스터 드롭!",
      task: "몬스터를 처치하면 확률적으로 아이템을 드롭하는 시스템을 실행해보세요!",
      initialCode: `import random
random.seed(42)

class Item:
    def __init__(self, name, item_type, value):
        self.name = name
        self.item_type = item_type
        self.value = value

class Monster:
    def __init__(self, name, hp, drops):
        self.name = name
        self.hp = hp
        # drops = [(아이템, 확률), ...]
        self.drops = drops

    def get_drops(self):
        result = []
        for item, chance in self.drops:
            if random.random() < chance:
                result.append(item)
        return result

# 드롭 테이블!
slime_drops = [
    (Item('끈적한 젤리', 'heal', 10), 0.5),  # 50%
    (Item('슬라임 코어', 'atk', 2), 0.2),     # 20%
]

goblin_drops = [
    (Item('물약', 'heal', 30), 0.6),           # 60%
    (Item('녹슨 검', 'atk', 5), 0.3),          # 30%
    (Item('고블린 왕관', 'def', 8), 0.1),       # 10%
]

# 전투 시뮬레이션!
print('=== 슬라임 5마리 처치! ===')
for i in range(5):
    slime = Monster('슬라임', 30, slime_drops)
    drops = slime.get_drops()
    if drops:
        for item in drops:
            types = {'heal': '회복', 'atk': '공격', 'def': '방어'}
            print(f'  {i+1}번째: {item.name} [{types[item.item_type]} +{item.value}] 드롭!')
    else:
        print(f'  {i+1}번째: (드롭 없음)')

print('\\n=== 고블린 5마리 처치! ===')
for i in range(5):
    goblin = Monster('고블린', 50, goblin_drops)
    drops = goblin.get_drops()
    if drops:
        for item in drops:
            types = {'heal': '회복', 'atk': '공격', 'def': '방어'}
            print(f'  {i+1}번째: {item.name} [{types[item.item_type]} +{item.value}] 드롭!')
    else:
        print(f'  {i+1}번째: (드롭 없음)')`,
      expectedOutput: `=== 슬라임 5마리 처치! ===\n  1번째: (드롭 없음)\n  2번째: 끈적한 젤리 [회복 +10] 드롭!\n  3번째: (드롭 없음)\n  4번째: 끈적한 젤리 [회복 +10] 드롭!\n  5번째: 끈적한 젤리 [회복 +10] 드롭!\n\n=== 고블린 5마리 처치! ===\n  1번째: 물약 [회복 +30] 드롭!\n  2번째: 물약 [회복 +30] 드롭!\n  3번째: 물약 [회복 +30] 드롭!\n녹슨 검 [공격 +5] 드롭!\n  4번째: 물약 [회복 +30] 드롭!\n녹슨 검 [공격 +5] 드롭!\n  5번째: (드롭 없음)`,
      hint: "random.random() < 확률 로 드롭 판정!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch3-3",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "`lambda d: d['kills'] >= 5`는 무엇을 의미하나요?",
      options: [
        "kills를 5로 설정하는 함수",
        "kills가 5 이상인지 확인하는 함수",
        "kills에서 5를 빼는 함수",
        "kills를 5번 반복하는 함수"
      ],
      answer: 1,
      explanation: "lambda는 간단한 함수! d라는 딕셔너리를 받아서 d['kills'] >= 5인지 True/False를 반환해요!"
    },
    {
      id: "ch3-4",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "몬스터 드롭에서 확률 0.1은 몇 %?",
      options: ["1%", "10%", "0.1%", "100%"],
      answer: 1,
      explanation: "0.1 = 10%! random.random()이 0.1보다 작을 확률이 10%이므로, 10번 중 약 1번 드롭!"
    },
    {
      id: "ch3-5",
      type: "explain",
      title: "💭 7가지 기능을 모두 만들었다면?",
      content: `💭 휴식, 치명타, 장비, 퀘스트, 스킬, 업적, 드롭... 이 **7가지 기능에 어떤 개념**이 쓰였을까?

### 추가한 기능들:
| 번호 | 기능 | 핵심 개념 |
|------|------|----------|
| ① | 휴식 | max_hp 비율 계산 |
| ② | 치명타 | random 확률 |
| ③ | 장비 | 클래스 조합 |
| ④ | 퀘스트 | 딕셔너리 + 진행도 |
| ⑤ | 스킬 | MP + 직업별 분기 |
| ⑥ | 업적 | lambda + 조건 체크 |
| ⑦ | 드롭 | 확률 + 리스트 |

### 더 해볼 수 있는 것:
- **파일 분리** — character.py, monster.py, game.py
- **colorama** — 터미널에 색깔 출력
- **GUI** — tkinter로 그래픽 추가
- **멀티플레이** — 2인 대전 모드

@핵심: 파이썬 기초만으로 **7가지 고급 기능**을 추가해서 진짜 게임을 만들었어!`
    }
  ]
}
