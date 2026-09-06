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
      /* 2026-09-06: 학생 에이전트가 여기서 막혔다. lambda 문법 때문이 아니다 —
         lambda 는 레슨34 에서 제대로 가르친다(`data/lesson34.ts:152`).
         학생: "**함수를 self.condition_fn 이라는 자리에 넣어두고, 나중에 다른
         함수 안에서 괄호 붙여 부르는 것** — 이게 안 풀려. 레슨32(함수) 에도
         34(함수 활용) 에도 없었어. 까먹은 게 아니라 처음 보는 거야."
         `scripts/check-concept-order.py` 로 확인: 52개 레슨 어디에도 안 가르친다. */
      id: "ch3-0a",
      type: "explain",
      title: "📦 함수를 담아두고 나중에 부르기",
      content: `아래 업적 시스템에 **처음 보는 것**이 하나 나와요. 먼저 짚고 갈게요.

지금까지 함수는 **만들자마자 불렀어요.**

\`\`\`python
def 두배(x):
    return x * 2

print(두배(5))   # 10
\`\`\`

그런데 함수도 **값처럼 변수에 담을 수 있어요.** 이때 **괄호를 안 붙여요.**

\`\`\`python
연산 = 두배      # 괄호 없이! 함수 자체를 담는다
print(연산(5))   # 10  ← 담아둔 걸 나중에 괄호 붙여 부른다
\`\`\`

담아두면 **다른 함수에 넘길 수도** 있어요.

\`\`\`python
def 실행(함수, 값):
    return 함수(값)      # 넘겨받은 걸 여기서 부른다

print(실행(두배, 7))            # 14
print(실행(lambda x: x + 100, 7))  # 107
\`\`\`

| 쓰는 법 | 뜻 |
|---|---|
| \`두배\` (괄호 없음) | 함수 **자체**. 담거나 넘길 때 |
| \`두배(5)\` (괄호 있음) | 지금 **실행**해서 결과를 받기 |

> 💡 레슨35 의 \`map(int, 문자들)\` 도 같은 것이었어요 — \`int\` 를 괄호 없이
> 넘겨서 map 이 대신 불러줬죠.

@핵심: **괄호 없이** 담아두고, 나중에 **괄호 붙여** 부른다!`
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
      /* 2026-09-06: 형제 챕터 ch1·ch2 는 "tryit(전체 데모) → mission(빈칸, 축소판)"
         쌍이 각각 두 번씩 있는데, **ch3 만 mission 이 하나도 없었다.**
         난이도는 올라가는데 스캐폴딩은 사라지는 거꾸로 된 구조였다.
         새 모양을 발명한 게 아니라 같은 레슨 안에서 빠뜨린 패턴을 채운다. */
      id: "ch3-1a",
      type: "mission",
      title: "🎯 미션: 업적 시스템 완성!",
      task: "빈칸 세 개를 채워 업적 시스템을 완성하세요!",
      initialCode: `class Achievement:
    def __init__(self, name, condition_fn):
        self.name = name
        self.condition_fn = condition_fn
        self.___ = False

    def check(self, data):
        if self.condition_fn(data):
            self.___ = True
            print(f'★ 업적 해금: {self.name}!')

ach = Achievement('레벨업 달성', lambda d: d['level'] >= 3)

player = {'level': 1}
ach.check(player)
player['level'] = 3
ach.___(player)`,
      expectedOutput: "★ 업적 해금: 레벨업 달성!",
      hint: "해금됐는지 기억할 속성이 하나 필요해요. 마지막 줄은 위에 만든 메서드를 부르는 자리예요.",
      hint2: "unlocked / unlocked / check"
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
      expectedOutput: `=== 슬라임 5마리 처치! ===\n  1번째: 슬라임 코어 [공격 +2] 드롭!\n  2번째: 끈적한 젤리 [회복 +10] 드롭!\n  3번째: (드롭 없음)\n  4번째: 슬라임 코어 [공격 +2] 드롭!\n  5번째: 끈적한 젤리 [회복 +10] 드롭!\n  5번째: 슬라임 코어 [공격 +2] 드롭!\n\n=== 고블린 5마리 처치! ===\n  1번째: 물약 [회복 +30] 드롭!\n  1번째: 고블린 왕관 [방어 +8] 드롭!\n  2번째: 물약 [회복 +30] 드롭!\n  3번째: 물약 [회복 +30] 드롭!\n  4번째: 물약 [회복 +30] 드롭!\n  5번째: 물약 [회복 +30] 드롭!\n  5번째: 녹슨 검 [공격 +5] 드롭!`,
      hint: "random.random() < 확률 로 드롭 판정!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      /* 2026-09-06: 원본 ch3-2 데모는 random.seed 로 확률을 보여준다.
         미션에서는 굳이 난수를 쓰지 않는다 — 채점이 흔들리면 안 되고,
         배울 것은 `roll < chance` 비교 자체이지 난수 생성이 아니기 때문이다. */
      id: "ch3-2a",
      type: "mission",
      title: "🎯 미션: 드롭 확률 완성!",
      task: "빈칸 세 개를 채워 아이템 드롭을 완성하세요!",
      initialCode: `class Item:
    def __init__(self, name, chance):
        self.name = name
        self.___ = chance

    def try_drop(self, roll):
        return roll < self.___   # roll 이 확률보다 작으면 드롭 성공!

sword = Item('전설의 검', 0.3)

rolls = [0.1, 0.5, 0.2]
for roll in rolls:
    if sword.___(roll):
        print(f'{sword.name} 드롭! (roll={roll})')
    else:
        print(f'드롭 없음 (roll={roll})')`,
      expectedOutput: "전설의 검 드롭! (roll=0.1)\n드롭 없음 (roll=0.5)\n전설의 검 드롭! (roll=0.2)",
      hint: "확률을 담아둘 속성 이름과, 위에서 만든 메서드 이름을 그대로 쓰면 돼요.",
      hint2: "chance / chance / try_drop"
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
