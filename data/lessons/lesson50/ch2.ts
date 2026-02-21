import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "Monster + 전투",
  emoji: "👹",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "👹 몬스터 종류!",
      content: `## 3가지 몬스터

| 몬스터 | HP | ATK | DEF | EXP | 골드 |
|--------|----|-----|-----|-----|------|
| **슬라임** | 30 | 8 | 2 | 30 | 20 |
| **고블린** | 50 | 15 | 5 | 60 | 40 |
| **드래곤** | 100 | 25 | 10 | 150 | 100 |

\`\`\`python
def create_monster(name):
    monsters = {
        'slime':  Monster('슬라임', 30, 8, 2, 30, 20),
        'goblin': Monster('고블린', 50, 15, 5, 60, 40),
        'dragon': Monster('드래곤', 100, 25, 10, 150, 100),
    }
    return monsters[name]
\`\`\`

→ **딕셔너리**로 몬스터 팩토리 패턴!`
    },
    {
      id: "ch2-1",
      type: "tryit",
      title: "💻 Monster 클래스!",
      task: "Monster 클래스와 팩토리 함수를 실행해보세요!",
      initialCode: `class Monster:
    def __init__(s, name, hp, atk, defense, exp, gold):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp
        s.gold_reward = gold
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def show(s):
        state = 'O' if s.alive else 'X'
        print(f'[{state}] {s.name}: HP {s.hp}/{s.max_hp}')

def create_monster(name):
    data = {
        'slime':  ('슬라임', 30, 8, 2, 30, 20),
        'goblin': ('고블린', 50, 15, 5, 60, 40),
        'dragon': ('드래곤', 100, 25, 10, 150, 100),
    }
    d = data[name]
    return Monster(d[0], d[1], d[2], d[3], d[4], d[5])

# 몬스터 생성!
print('=== 몬스터 도감 ===')
for key in ['slime', 'goblin', 'dragon']:
    m = create_monster(key)
    m.show()
    print(f'  보상: EXP {m.exp_reward}, 골드 {m.gold_reward}')`,
      expectedOutput: `=== 몬스터 도감 ===\n[O] 슬라임: HP 30/30\n  보상: EXP 30, 골드 20\n[O] 고블린: HP 50/50\n  보상: EXP 60, 골드 40\n[O] 드래곤: HP 100/100\n  보상: EXP 150, 골드 100`,
      hint: "딕셔너리로 몬스터 데이터를 관리해요!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-2",
      type: "explain",
      title: "⚔️ 전투 흐름!",
      content: `## 전투 = 턴제!

\`\`\`
[전투 시작]
  │
  ├→ 플레이어 턴
  │    ├→ attack (공격)
  │    ├→ heal (회복)
  │    └→ run (도망)
  │
  ├→ 몬스터 턴
  │    └→ 자동 공격
  │
  ├→ 승리? → 보상!
  └→ 패배? → 게임 오버
\`\`\`

**데미지 공식:**
\`\`\`python
actual = attacker.atk - target.defense
if actual < 1:
    actual = 1  # 최소 1 데미지!
\`\`\``
    },
    {
      id: "ch2-3",
      type: "tryit",
      title: "💻 자동 전투!",
      task: "actions 리스트로 자동 전투를 실행하세요!",
      initialCode: `class Character:
    def __init__(s, name, job):
        s.name = name
        s.job = job
        s.alive = True
        s.exp = 0
        s.gold = 0
        if job == 'warrior':
            s.hp, s.max_hp = 120, 120
            s.atk, s.defense = 15, 12
        elif job == 'mage':
            s.hp, s.max_hp = 80, 80
            s.atk, s.defense = 25, 5
        else:
            s.hp, s.max_hp = 100, 100
            s.atk, s.defense = 20, 8

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack_target(s, target):
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} 데미지)')

    def heal_self(s, amount):
        s.hp = min(s.hp + amount, s.max_hp)
        print(f'  {s.name} 회복! HP: {s.hp}/{s.max_hp}')

class Monster:
    def __init__(s, name, hp, atk, defense, exp, gold):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp
        s.gold_reward = gold
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack_target(s, target):
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} 데미지)')

# 전투!
hero = Character('용사', 'warrior')
goblin = Monster('고블린', 50, 15, 5, 60, 40)

actions = ['attack', 'attack', 'heal', 'attack', 'attack', 'attack']

print('=== 전투 시작! ===')
print(f'{hero.name}: HP {hero.hp}/{hero.max_hp}')
print(f'{goblin.name}: HP {goblin.hp}/50')

turn = 1
for action in actions:
    if not hero.alive or not goblin.alive:
        break

    print(f'\\n--- {turn}턴 ---')

    if action == 'attack':
        hero.attack_target(goblin)
    elif action == 'heal':
        hero.heal_self(30)

    if goblin.alive:
        goblin.attack_target(hero)

    print(f'  [{hero.name} HP:{hero.hp}] [{goblin.name} HP:{goblin.hp}]')
    turn += 1

print('\\n=== 전투 종료! ===')
if not goblin.alive:
    hero.exp += goblin.exp_reward
    hero.gold += goblin.gold_reward
    print(f'{goblin.name} 처치!')
    print(f'+{goblin.exp_reward} EXP, +{goblin.gold_reward} 골드')
    print(f'{hero.name}: EXP {hero.exp}, 골드 {hero.gold}')
elif not hero.alive:
    print('패배...')`,
      expectedOutput: `=== 전투 시작! ===\n용사: HP 120/120\n고블린: HP 50/50\n\n--- 1턴 ---\n  용사 -> 고블린 (10 데미지)\n  고블린 -> 용사 (3 데미지)\n  [용사 HP:117] [고블린 HP:40]\n\n--- 2턴 ---\n  용사 -> 고블린 (10 데미지)\n  고블린 -> 용사 (3 데미지)\n  [용사 HP:114] [고블린 HP:30]\n\n--- 3턴 ---\n  용사 회복! HP: 120/120\n  고블린 -> 용사 (3 데미지)\n  [용사 HP:117] [고블린 HP:30]\n\n--- 4턴 ---\n  용사 -> 고블린 (10 데미지)\n  고블린 -> 용사 (3 데미지)\n  [용사 HP:114] [고블린 HP:20]\n\n--- 5턴 ---\n  용사 -> 고블린 (10 데미지)\n  고블린 -> 용사 (3 데미지)\n  [용사 HP:111] [고블린 HP:10]\n\n--- 6턴 ---\n  용사 -> 고블린 (10 데미지)\n  [용사 HP:111] [고블린 HP:0]\n\n=== 전투 종료! ===\n고블린 처치!\n+60 EXP, +40 골드\n용사: EXP 60, 골드 40`,
      hint: "actions 리스트로 턴마다 행동을 정해요!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch2-4",
      type: "mission",
      title: "🎯 미션: 전투 함수!",
      task: "빈칸 3개를 채워서 전투 함수를 완성하세요!",
      initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

class Monster:
    def __init__(s, name, hp, atk, defense, exp, gold):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp
        s.gold_reward = gold
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp -= actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

def battle(hero, monster, actions):
    print(f'{monster.name} 등장!')
    for action in actions:
        if not hero.alive or not monster.___:
            break
        if action == 'attack':
            dmg = monster.take_damage(hero.___)
            print(f'  {hero.name} -> {monster.name} ({dmg})')
        if monster.alive:
            dmg = hero.___(monster.atk)
            print(f'  {monster.name} -> {hero.name} ({dmg})')

hero = Character('영희', 100, 20, 8)
slime = Monster('슬라임', 30, 8, 2, 30, 20)

battle(hero, slime, ['attack', 'attack', 'attack'])
print(f'\\n결과: {hero.name} HP {hero.hp}')`,
      expectedOutput: `슬라임 등장!\n  영희 -> 슬라임 (18)\n  슬라임 -> 영희 (1)\n  영희 -> 슬라임 (18)\n\n결과: 영희 HP 99`,
      hint: "alive 체크, atk로 공격, take_damage로 피해!",
      hint2: "alive / atk / take_damage"
    },
    {
      id: "ch2-5",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "용사(ATK 15)가 고블린(DEF 5)을 공격하면 데미지는?",
      options: ["5", "10", "15", "20"],
      answer: 1,
      explanation: "15 - 5 = 10 데미지! 방어력만큼 깎여요!"
    }
  ]
}
