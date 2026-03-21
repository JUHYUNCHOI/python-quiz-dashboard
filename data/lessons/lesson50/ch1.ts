import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "Character 클래스",
  emoji: "🦸",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 직업마다 스탯을 다르게 하려면?",
      content: `💭 용사는 튼튼하고, 마법사는 공격력이 높고... **직업에 따라 다른 값을 설정**하려면 어떻게 해야 할까?

| 직업 | HP | ATK | DEF | 특징 |
|------|----|-----|-----|------|
| **용사** | 120 | 15 | 12 | 체력, 방어 최고! |
| **마법사** | 80 | 25 | 5 | 공격력 최고! |
| **궁수** | 100 | 20 | 8 | 균형잡힌 스탯! |

\`\`\`python
if job == 'warrior':
    self.hp, self.atk, self.defense = 120, 15, 12
elif job == 'mage':
    self.hp, self.atk, self.defense = 80, 25, 5
elif job == 'archer':
    self.hp, self.atk, self.defense = 100, 20, 8
\`\`\`

@핵심: **if/elif**로 직업별 분기해서 서로 다른 스탯을 설정!`
    },
    {
      id: "ch1-1",
      type: "tryit",
      title: "💻 Character 클래스 전체!",
      task: "직업별 스탯 + 전투 메서드가 있는 Character 클래스를 실행하세요!",
      initialCode: `class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        self.level = 1
        self.exp = 0
        self.gold = 0
        self.inventory = []
        self.alive = True

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

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1:
            actual = 1
        self.hp -= actual
        if self.hp <= 0:
            self.hp = 0
            self.alive = False
        return actual

    def attack(self, target):
        actual = target.take_damage(self.atk)
        print(f'  {self.name} -> {target.name} ({actual} 데미지)')
        return actual

    def heal(self, amount):
        self.hp = min(self.hp + amount, self.max_hp)
        print(f'  {self.name} 회복! HP: {self.hp}/{self.max_hp}')

    def status(self):
        jobs = {'warrior': '용사', 'mage': '마법사', 'archer': '궁수'}
        print(f'[{jobs[self.job]}] {self.name} Lv.{self.level}')
        print(f'  HP: {self.hp}/{self.max_hp} | ATK: {self.atk} | DEF: {self.defense}')
        print(f'  EXP: {self.exp} | 골드: {self.gold}')

# 3직업 비교!
print('=== 직업별 스탯 ===')
for job in ['warrior', 'mage', 'archer']:
    hero = Character('테스트', job)
    hero.status()
    print()`,
      expectedOutput: `=== 직업별 스탯 ===\n[용사] 테스트 Lv.1\n  HP: 120/120 | ATK: 15 | DEF: 12\n  EXP: 0 | 골드: 0\n\n[마법사] 테스트 Lv.1\n  HP: 80/80 | ATK: 25 | DEF: 5\n  EXP: 0 | 골드: 0\n\n[궁수] 테스트 Lv.1\n  HP: 100/100 | ATK: 20 | DEF: 8\n  EXP: 0 | 골드: 0\n`,
      hint: "if/elif로 직업별 스탯을 다르게 설정!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-2",
      type: "tryit",
      title: "💻 레벨업 시스템!",
      task: "경험치를 모아 레벨업하는 시스템을 실행하세요!",
      initialCode: `class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        self.level = 1
        self.exp = 0
        self.gold = 0
        self.alive = True

        if job == 'warrior':
            self.hp, self.max_hp = 120, 120
            self.atk, self.defense = 15, 12
        elif job == 'mage':
            self.hp, self.max_hp = 80, 80
            self.atk, self.defense = 25, 5
        else:
            self.hp, self.max_hp = 100, 100
            self.atk, self.defense = 20, 8

    def gain_exp(self, amount):
        self.exp += amount
        print(f'  +{amount} EXP (총 {self.exp})')
        # 100 경험치마다 레벨업!
        while self.exp >= 100:
            self.exp -= 100
            self.level_up()

    def level_up(self):
        self.level += 1
        # 레벨업 보너스!
        self.max_hp += 10
        self.hp = self.max_hp  # 풀회복!
        self.atk += 3
        self.defense += 2
        print(f'  ★ 레벨 업! Lv.{self.level}!')
        print(f'    HP: {self.max_hp} | ATK: {self.atk} | DEF: {self.defense}')

    def gain_gold(self, amount):
        self.gold += amount
        print(f'  +{amount} 골드 (총 {self.gold})')

# 테스트!
hero = Character('용사', 'warrior')
print(f'=== {hero.name} Lv.{hero.level} ===')
print(f'HP: {hero.max_hp} | ATK: {hero.atk} | DEF: {hero.defense}')

print('\\n--- 슬라임 처치! ---')
hero.gain_exp(50)
hero.gain_gold(30)

print('\\n--- 고블린 처치! ---')
hero.gain_exp(70)
hero.gain_gold(50)

print(f'\\n=== 현재 상태 ===')
print(f'Lv.{hero.level} | HP: {hero.hp}/{hero.max_hp}')
print(f'ATK: {hero.atk} | DEF: {hero.defense}')
print(f'EXP: {hero.exp} | 골드: {hero.gold}')`,
      expectedOutput: `=== 용사 Lv.1 ===\nHP: 120 | ATK: 15 | DEF: 12\n\n--- 슬라임 처치! ---\n  +50 EXP (총 50)\n  +30 골드 (총 30)\n\n--- 고블린 처치! ---\n  +70 EXP (총 120)\n  ★ 레벨 업! Lv.2!\n    HP: 130 | ATK: 18 | DEF: 14\n  +50 골드 (총 80)\n\n=== 현재 상태 ===\nLv.2 | HP: 130/130\nATK: 18 | DEF: 14\nEXP: 20 | 골드: 80`,
      hint: "100 경험치마다 레벨업! while로 연속 레벨업도 가능!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-3",
      type: "mission",
      title: "🎯 미션: Character 완성!",
      task: "빈칸 3개를 채워서 Character 클래스를 완성하세요!",
      initialCode: `class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        self.level = 1
        self.exp = 0

        if job == 'warrior':
            self.hp, self.max_hp = 120, 120
            self.atk, self.defense = 15, 12
        elif job == 'mage':
            self.hp, self.max_hp = 80, 80
            self.atk, self.defense = 25, 5

    def gain_exp(self, amount):
        self.___ += amount
        if self.exp >= 100:
            self.exp -= 100
            self.level_up()

    def level_up(self):
        self.___ += 1
        self.max_hp += 10
        self.hp = self.max_hp
        self.atk += 3
        print(f'레벨 업! Lv.{self.level}')
        print(f'  HP: {self.max_hp}, ATK: {self.atk}')

hero = Character('철수', 'warrior')
print(f'Lv.{hero.level} | HP: {hero.hp} | ATK: {hero.atk}')

hero.gain_exp(100)

hero2 = Character('영희', '___')
print(f'\\n마법사 HP: {hero2.hp}, ATK: {hero2.atk}')`,
      expectedOutput: `Lv.1 | HP: 120 | ATK: 15\n레벨 업! Lv.2\n  HP: 130, ATK: 18\n\n마법사 HP: 80, ATK: 25`,
      hint: "exp에 더하기, level 올리기, 마법사 직업명!",
      hint2: "exp / level / mage"
    },
    {
      id: "ch1-4",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "마법사(mage)의 특징으로 올바른 것은?",
      options: ["HP 최고, 공격력 낮음", "HP 낮음, 공격력 최고", "모든 스탯이 균형", "방어력 최고"],
      answer: 1,
      explanation: "마법사는 HP 80(최저), ATK 25(최고)! 유리대포 스타일이에요!"
    },
    {
      id: "ch1-5",
      type: "tryit",
      title: "💻 3직업 전투 비교!",
      task: "같은 몬스터와 싸울 때 직업별 차이를 확인하세요!",
      initialCode: `class Character:
    def __init__(self, name, job):
        self.name = name
        self.job = job
        if job == 'warrior':
            self.hp, self.max_hp = 120, 120
            self.atk, self.defense = 15, 12
        elif job == 'mage':
            self.hp, self.max_hp = 80, 80
            self.atk, self.defense = 25, 5
        else:
            self.hp, self.max_hp = 100, 100
            self.atk, self.defense = 20, 8

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1:
            actual = 1
        self.hp -= actual
        return actual

# 몬스터 공격력 15로 테스트
monster_atk = 15

print('=== 몬스터(ATK 15) 공격 1회 비교 ===')
for job in ['warrior', 'mage', 'archer']:
    hero = Character('테스트', job)
    dmg = hero.take_damage(monster_atk)
    jobs = {'warrior': '용사', 'mage': '마법사', 'archer': '궁수'}
    print(f'{jobs[job]}: {dmg} 데미지 -> HP {hero.hp}/{hero.max_hp}')

print('\\n=== 각 직업이 몬스터(DEF 5)에게 주는 데미지 ===')
for job in ['warrior', 'mage', 'archer']:
    hero = Character('테스트', job)
    dmg = hero.atk - 5  # 몬스터 방어력 5
    jobs = {'warrior': '용사', 'mage': '마법사', 'archer': '궁수'}
    print(f'{jobs[job]}: ATK {hero.atk} - DEF 5 = {dmg} 데미지')`,
      expectedOutput: `=== 몬스터(ATK 15) 공격 1회 비교 ===\n용사: 3 데미지 -> HP 117/120\n마법사: 10 데미지 -> HP 70/80\n궁수: 7 데미지 -> HP 93/100\n\n=== 각 직업이 몬스터(DEF 5)에게 주는 데미지 ===\n용사: ATK 15 - DEF 5 = 10 데미지\n마법사: ATK 25 - DEF 5 = 20 데미지\n궁수: ATK 20 - DEF 5 = 15 데미지`,
      hint: "방어력이 높으면 받는 데미지가 줄어요!",
      hint2: "코드를 그대로 실행하세요!"
    }
  ]
}
