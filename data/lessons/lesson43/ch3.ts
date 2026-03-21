import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "턴제 전투 시스템",
  emoji: "⚔️",
  steps: [
    {
      id: "ch3-intro",
      type: "explain",
      title: "💭 용사와 몬스터가 번갈아 싸우려면?",
      content: `💭 공격 메서드는 만들었는데... 서로 **번갈아가며** 싸우는 건 어떻게 구현하지?

### 흐름
\`\`\`
1턴: 용사 행동 → 몬스터 행동
2턴: 용사 행동 → 몬스터 행동
3턴: ...  (누군가 쓰러질 때까지!)
\`\`\`

### input() 대신 리스트!
\`\`\`python
# 이 웹에서는 input()을 쓸 수 없으니...
actions = ['attack', 'heal', 'attack']

for action in actions:
    if action == 'attack':
        hero.attack(monster)
    elif action == 'heal':
        hero.heal(20)
\`\`\`

@핵심: **리스트 + for문**으로 행동을 미리 정해두면 자동 턴제 전투 완성!`
    },
    {
      id: "ch3-0",
      type: "tryit",
      title: "⚔️ 3단계: 턴제 전투!",
      task: "actions 리스트로 자동 전투하는 시스템을 실행해보세요!",
      initialCode: `class Character:
    def __init__(self, name, hp, atk, defense):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.atk = atk
        self.defense = defense
        self.alive = True

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1:
            actual = 1
        self.hp = self.hp - actual
        if self.hp <= 0:
            self.hp = 0
            self.alive = False
        return actual

    def attack(self, target):
        if not self.alive:
            return
        actual = target.take_damage(self.atk)
        print(f'  {self.name} -> {target.name} ({actual} 데미지)')
        if not target.alive:
            print(f'  {target.name} 쓰러짐!')

    def heal(self, amount):
        if not self.alive:
            return
        self.hp = min(self.hp + amount, self.max_hp)
        print(f'  {self.name} 회복! HP: {self.hp}/{self.max_hp}')

    def status(self):
        state = 'O' if self.alive else 'X'
        print(f'  [{state}] {self.name}: HP {self.hp}/{self.max_hp}')

# 캐릭터 생성
hero = Character('용사', 100, 25, 8)
goblin = Character('고블린', 60, 18, 5)

# 행동 리스트 (input() 대신!)
actions = ['attack', 'attack', 'heal', 'attack', 'attack']

print('=== RPG 전투 시작! ===')
hero.status()
goblin.status()

turn = 1
for action in actions:
    if not hero.alive or not goblin.alive:
        break

    print(f'\\n--- {turn}턴 ---')

    if action == 'attack':
        hero.attack(goblin)
    elif action == 'heal':
        hero.heal(20)

    if goblin.alive:
        goblin.attack(hero)

    turn = turn + 1

print('\\n=== 전투 종료! ===')
hero.status()
goblin.status()
if hero.alive:
    print('승리!')
else:
    print('패배...')`,
      expectedOutput: `=== RPG 전투 시작! ===\n  [O] 용사: HP 100/100\n  [O] 고블린: HP 60/60\n\n--- 1턴 ---\n  용사 -> 고블린 (20 데미지)\n  고블린 -> 용사 (10 데미지)\n\n--- 2턴 ---\n  용사 -> 고블린 (20 데미지)\n  고블린 -> 용사 (10 데미지)\n\n--- 3턴 ---\n  용사 회복! HP: 100/100\n  고블린 -> 용사 (10 데미지)\n\n--- 4턴 ---\n  용사 -> 고블린 (20 데미지)\n  고블린 쓰러짐!\n\n=== 전투 종료! ===\n  [O] 용사: HP 90/100\n  [X] 고블린: HP 0/60\n승리!`,
      hint: "actions 리스트로 input() 없이 행동을 정해요!",
      hint2: "for action in actions로 한 턴씩 진행해요!"
    },
    {
      id: "ch3-1",
      type: "mission",
      title: "🎯 미션: 전투 행동 추가!",
      task: "빈칸 3개를 채워서 'defend' 행동을 추가하세요!",
      initialCode: `class Character:
    def __init__(self, name, hp, atk, defense):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.atk = atk
        self.defense = defense
        self.alive = True
        self.defending = False

    def take_damage(self, damage):
        actual = damage - self.defense
        if self.defending:
            actual = actual // 2
            self.defending = False
        if actual < 1:
            actual = 1
        self.hp = self.hp - actual
        if self.hp <= 0:
            self.hp = 0
            self.alive = False
        return actual

    def attack(self, target):
        actual = target.take_damage(self.atk)
        print(f'  {self.name} -> {target.name} ({actual} 데미지)')

    def defend(self):
        self.___ = True
        print(f'  {self.name} 방어 자세! (다음 데미지 절반)')

    def heal(self, amount):
        self.hp = min(self.hp + amount, self.max_hp)
        print(f'  {self.name} 회복! HP: {self.hp}/{self.max_hp}')

    def status(self):
        state = 'O' if self.alive else 'X'
        print(f'  [{state}] {self.name}: HP {self.hp}/{self.max_hp}')

hero = Character('용사', 80, 22, 5)
orc = Character('오크', 50, 20, 3)

# defend를 사용해보자!
actions = ['defend', 'attack', '___', 'attack']

print('=== 전투 시작! ===')
turn = 1
for action in actions:
    if not hero.alive or not orc.alive:
        break
    print(f'\\n--- {turn}턴 ---')
    if action == 'attack':
        hero.attack(orc)
    elif action == 'defend':
        hero.defend()
    elif action == 'heal':
        hero.___(15)
    if orc.alive:
        orc.attack(hero)
    turn = turn + 1

print('\\n=== 결과 ===')
hero.status()
orc.status()`,
      expectedOutput: `=== 전투 시작! ===\n\n--- 1턴 ---\n  용사 방어 자세! (다음 데미지 절반)\n  오크 -> 용사 (7 데미지)\n\n--- 2턴 ---\n  용사 -> 오크 (19 데미지)\n  오크 -> 용사 (15 데미지)\n\n--- 3턴 ---\n  용사 회복! HP: 73/80\n  오크 -> 용사 (15 데미지)\n\n--- 4턴 ---\n  용사 -> 오크 (19 데미지)\n  오크 -> 용사 (15 데미지)\n\n=== 결과 ===\n  [O] 용사: HP 43/80\n  [O] 오크: HP 12/50`,
      hint: "defending 속성을 True로, heal 행동을 리스트에, heal 메서드 호출!",
      hint2: "defending / heal / heal"
    },
    {
      id: "ch3-2",
      type: "quiz",
      title: "퀴즈: 턴제 전투!",
      content: "defend() 후 데미지를 받으면 어떻게 되나요?\n\n```python\ndef take_damage(self, damage):\n    actual = damage - self.defense\n    if self.defending:\n        actual = actual // 2\n```",
      options: [
        "데미지 0",
        "데미지 변화 없음",
        "데미지가 절반으로 줄어듦",
        "에러 발생"
      ],
      answer: 2,
      explanation: "defending이 True면 actual // 2로 데미지가 절반! 방어의 힘!"
    }
  ]
}
