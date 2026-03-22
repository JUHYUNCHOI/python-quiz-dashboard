import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "쉬운 도전",
  emoji: "⭐",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 완성된 게임에 뭘 더 추가할 수 있을까?",
      content: `💭 텍스트 RPG가 완성됐는데... **휴식, 치명타, 장비, 스킬** 같은 기능을 더 넣으면 어떨까?

| 난이도 | 도전 |
|--------|------|
| ⭐ 쉬움 | 휴식 기능, 치명타, 장비 |
| ⭐⭐ 보통 | 퀘스트, 스킬 |
| ⭐⭐⭐ 어려움 | 업적, 몬스터 드롭 |

@핵심: 난이도별 도전을 **하나씩 추가**하면서 게임을 점점 발전시켜보자!`
    },
    {
      id: "ch1-1",
      type: "tryit",
      title: "💻 ① 휴식 기능!",
      task: "전투 사이에 HP를 회복하는 휴식 기능을 실행해보세요!",
      initialCode: `class Character:
    def __init__(self, name, hp, atk, defense):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.atk = atk
        self.defense = defense

    def rest(self):
        # 최대 HP의 30% 회복!
        heal_amount = int(self.max_hp * 0.3)
        self.hp = min(self.hp + heal_amount, self.max_hp)
        print(f'{self.name} 휴식! +{heal_amount} HP -> {self.hp}/{self.max_hp}')

    def take_damage(self, damage):
        actual = damage - self.defense
        if actual < 1:
            actual = 1
        self.hp -= actual
        return actual

# 테스트!
hero = Character('용사', 120, 15, 10)

# 전투로 데미지를 입음
hero.take_damage(20)
hero.take_damage(25)
print(f'전투 후: HP {hero.hp}/{hero.max_hp}')

# 휴식!
print()
hero.rest()
hero.rest()
hero.rest()  # 최대HP 넘어가면?

print(f'\\n최종: HP {hero.hp}/{hero.max_hp}')`,
      expectedOutput: `전투 후: HP 95/120\n\n용사 휴식! +36 HP -> 120/120\n용사 휴식! +36 HP -> 120/120\n용사 휴식! +36 HP -> 120/120\n\n최종: HP 120/120`,
      hint: "max_hp의 30%를 회복, min으로 최대 제한!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-2",
      type: "mission",
      title: "🎯 미션: 휴식 추가!",
      task: "빈칸 3개를 채워서 휴식 기능을 완성하세요!",
      initialCode: `class Character:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp
        self.___ = hp

    def rest(self):
        heal = int(self.max_hp * 0.3)
        self.hp = ___(self.hp + heal, self.max_hp)
        print(f'휴식! HP: {self.hp}/{self.max_hp}')

hero = Character('용사', 100)
hero.hp = 50
print(f'현재 HP: {hero.hp}')
hero.___()
print(f'회복 후: {hero.hp}')`,
      expectedOutput: `현재 HP: 50\n휴식! HP: 80/100\n회복 후: 80`,
      hint: "max_hp 저장, min으로 최대 제한, rest 호출!",
      hint2: "max_hp / min / rest"
    },
    {
      id: "ch1-3",
      type: "tryit",
      title: "💻 ② 치명타 시스템!",
      task: "20% 확률로 1.5배 데미지를 주는 치명타를 실행해보세요!",
      initialCode: `import random
random.seed(42)

class Character:
    def __init__(self, name, hp, atk, defense):
        self.name = name
        self.hp = hp
        self.atk = atk
        self.defense = defense
        self.crit_rate = 0.2   # 20% 확률
        self.crit_damage = 1.5  # 1.5배

    def attack_target(self, target):
        damage = self.atk

        # 치명타 판정!
        is_crit = random.random() < self.crit_rate
        if is_crit:
            damage = int(damage * self.crit_damage)

        actual = damage - target.defense
        if actual < 1:
            actual = 1
        target.hp -= actual

        if is_crit:
            print(f'  ★ 크리티컬! {self.name} -> {target.name} ({actual} 데미지!)')
        else:
            print(f'  {self.name} -> {target.name} ({actual} 데미지)')

class Monster:
    def __init__(self, name, hp, atk, defense):
        self.name = name
        self.hp = hp
        self.atk = atk
        self.defense = defense

# 테스트! (seed 고정으로 결과 동일)
hero = Character('용사', 120, 20, 10)
goblin = Monster('고블린', 100, 12, 5)

print('=== 치명타 테스트 (5번 공격) ===')
for i in range(5):
    hero.attack_target(goblin)
    print(f'    고블린 HP: {goblin.hp}')`,
      expectedOutput: `=== 치명타 테스트 (5번 공격) ===\n  용사 -> 고블린 (15 데미지)\n    고블린 HP: 85\n  ★ 크리티컬! 용사 -> 고블린 (25 데미지!)\n    고블린 HP: 60\n  용사 -> 고블린 (15 데미지)\n    고블린 HP: 45\n  용사 -> 고블린 (15 데미지)\n    고블린 HP: 30\n  ★ 크리티컬! 용사 -> 고블린 (25 데미지!)\n    고블린 HP: 5`,
      hint: "random.random() < 0.2 면 치명타! 데미지 1.5배!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-4",
      type: "mission",
      title: "🎯 미션: 치명타 추가!",
      task: "빈칸 3개를 채워서 치명타를 구현하세요!",
      initialCode: `import random
random.seed(10)

class Fighter:
    def __init__(self, name, atk):
        self.name = name
        self.atk = atk
        self.crit_rate = 0.3  # 30%

    def attack(self):
        damage = self.atk
        is_crit = random.___() < self.crit_rate
        if ___:
            damage = int(damage * 2)
            print(f'★ 크리티컬! {self.name}: {damage} 데미지!')
        else:
            print(f'{self.name}: {___} 데미지')

hero = Fighter('용사', 10)
for i in range(4):
    hero.attack()`,
      expectedOutput: `용사: 10 데미지\n★ 크리티컬! 용사: 20 데미지!\n용사: 10 데미지\n★ 크리티컬! 용사: 20 데미지!`,
      hint: "random.random()으로 확률, is_crit 조건, damage 출력!",
      hint2: "random / is_crit / damage"
    },
    {
      id: "ch1-5",
      type: "tryit",
      title: "💻 ③ 장비 시스템!",
      task: "무기와 방어구를 장착하면 스탯이 변하는 시스템을 실행해보세요!",
      initialCode: `class Equipment:
    def __init__(self, name, slot, atk_bonus, def_bonus):
        self.name = name
        self.slot = slot  # 'weapon' or 'armor'
        self.atk_bonus = atk_bonus
        self.def_bonus = def_bonus

class Character:
    def __init__(self, name, hp, atk, defense):
        self.name = name
        self.hp, self.max_hp = hp, hp
        self.base_atk = atk
        self.base_def = defense
        self.weapon = None
        self.armor = None

    def equip(self, equipment):
        if equipment.slot == 'weapon':
            if self.weapon:
                print(f'  {self.weapon.name} 해제')
            self.weapon = equipment
            print(f'  {equipment.name} 장착!')
        elif equipment.slot == 'armor':
            if self.armor:
                print(f'  {self.armor.name} 해제')
            self.armor = equipment
            print(f'  {equipment.name} 장착!')

    def get_atk(self):
        bonus = self.weapon.atk_bonus if self.weapon else 0
        return self.base_atk + bonus

    def get_def(self):
        bonus = self.armor.def_bonus if self.armor else 0
        return self.base_def + bonus

    def status(self):
        w = self.weapon.name if self.weapon else '없음'
        a = self.armor.name if self.armor else '없음'
        print(f'{self.name}: ATK {self.get_atk()} (기본 {self.base_atk}), DEF {self.get_def()} (기본 {self.base_def})')
        print(f'  무기: {w}, 방어구: {a}')

# 장비!
wooden_sword = Equipment('나무검', 'weapon', 3, 0)
iron_sword = Equipment('철검', 'weapon', 8, 0)
leather = Equipment('가죽갑옷', 'armor', 0, 5)
iron_armor = Equipment('철갑옷', 'armor', 0, 10)

# 테스트!
hero = Character('용사', 120, 15, 10)
print('=== 장비 전 ===')
hero.status()

print('\\n--- 나무검 + 가죽갑옷 ---')
hero.equip(wooden_sword)
hero.equip(leather)
hero.status()

print('\\n--- 철검으로 업그레이드! ---')
hero.equip(iron_sword)
hero.status()`,
      expectedOutput: `=== 장비 전 ===\n용사: ATK 15 (기본 15), DEF 10 (기본 10)\n  무기: 없음, 방어구: 없음\n\n--- 나무검 + 가죽갑옷 ---\n  나무검 장착!\n  가죽갑옷 장착!\n용사: ATK 18 (기본 15), DEF 15 (기본 10)\n  무기: 나무검, 방어구: 가죽갑옷\n\n--- 철검으로 업그레이드! ---\n  나무검 해제\n  철검 장착!\n용사: ATK 23 (기본 15), DEF 15 (기본 10)\n  무기: 철검, 방어구: 가죽갑옷`,
      hint: "base_atk + weapon.atk_bonus = 실제 공격력!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-6",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "`random.random() < 0.2`가 True일 확률은?",
      options: ["2%", "20%", "80%", "항상 True"],
      answer: 1,
      explanation: "random.random()은 0~1 사이 실수! 그 값이 0.2보다 작을 확률 = 20%! 치명타 확률로 딱이에요."
    },
    {
      id: "ch1-7",
      type: "quiz",
      title: "❓ 퀴즈!",
      content: "장비 시스템에서 `base_atk`와 `get_atk()`를 분리하는 이유는?",
      options: [
        "파이썬 규칙이라서",
        "장비를 바꿔도 기본 스탯은 유지하려고",
        "메모리를 아끼려고",
        "코드를 길게 만들려고"
      ],
      answer: 1,
      explanation: "기본 공격력(base_atk)은 고정! 장비 보너스는 장착/해제 시 자동 계산! 분리해야 깔끔해요."
    }
  ]
}
