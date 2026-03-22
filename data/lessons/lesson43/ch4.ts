import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "레벨업 시스템",
  emoji: "🏆",
  steps: [
    {
      id: "ch4-0",
      type: "tryit",
      title: "🏆 4단계: 레벨업!",
      task: "경험치를 얻고 레벨업하는 시스템을 실행해보세요!",
      initialCode: `class Hero:
    def __init__(self, name, hp, atk, defense):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.atk = atk
        self.defense = defense
        self.level = 1
        self.exp = 0
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

    def gain_exp(self, amount):
        self.exp = self.exp + amount
        print(f'  +{amount} EXP (총 {self.exp})')
        if self.exp >= 100:
            self.level_up()

    def level_up(self):
        self.level = self.level + 1
        self.exp = self.exp - 100
        self.max_hp = self.max_hp + 20
        self.hp = self.max_hp
        self.atk = self.atk + 5
        self.defense = self.defense + 2
        print(f'  ★ LEVEL UP! Lv.{self.level}!')
        print(f'  HP {self.max_hp} ATK {self.atk} DEF {self.defense}')

    def status(self):
        print(f'  Lv.{self.level} {self.name}: HP {self.hp}/{self.max_hp} ATK {self.atk} DEF {self.defense} EXP {self.exp}/100')

class Monster:
    def __init__(self, name, hp, atk, defense, exp_reward):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.atk = atk
        self.defense = defense
        self.exp_reward = exp_reward
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

# 게임 시작!
hero = Hero('용사', 100, 20, 5)
hero.status()

monsters = [
    Monster('슬라임', 30, 10, 2, 40),
    Monster('고블린', 50, 15, 4, 60),
    Monster('오크', 70, 20, 6, 80),
]

for monster in monsters:
    if not hero.alive:
        break

    print(f'\\n=== {monster.name} 등장! ===')

    while hero.alive and monster.alive:
        hero.attack(monster)
        if monster.alive:
            monster.attack(hero)

    if hero.alive:
        hero.gain_exp(monster.exp_reward)
        hero.status()

print('\\n=== 최종 결과 ===')
hero.status()`,
      expectedOutput: `  Lv.1 용사: HP 100/100 ATK 20 DEF 5 EXP 0/100\n\n=== 슬라임 등장! ===\n  용사 -> 슬라임 (18 데미지)\n  슬라임 -> 용사 (5 데미지)\n  용사 -> 슬라임 (18 데미지)\n  슬라임 쓰러짐!\n  +40 EXP (총 40)\n  Lv.1 용사: HP 90/100 ATK 20 DEF 5 EXP 40/100\n\n=== 고블린 등장! ===\n  용사 -> 고블린 (16 데미지)\n  고블린 -> 용사 (10 데미지)\n  용사 -> 고블린 (16 데미지)\n  고블린 -> 용사 (10 데미지)\n  용사 -> 고블린 (16 데미지)\n  고블린 -> 용사 (10 데미지)\n  용사 -> 고블린 (16 데미지)\n  고블린 쓰러짐!\n  +60 EXP (총 100)\n  ★ LEVEL UP! Lv.2!\n  HP 120 ATK 25 DEF 7\n  Lv.2 용사: HP 120/120 ATK 25 DEF 7 EXP 0/100\n\n=== 오크 등장! ===\n  용사 -> 오크 (19 데미지)\n  오크 -> 용사 (13 데미지)\n  용사 -> 오크 (19 데미지)\n  오크 -> 용사 (13 데미지)\n  용사 -> 오크 (19 데미지)\n  오크 -> 용사 (13 데미지)\n  용사 -> 오크 (19 데미지)\n  오크 쓰러짐!\n  +80 EXP (총 80)\n  Lv.2 용사: HP 81/120 ATK 25 DEF 7 EXP 80/100\n\n=== 최종 결과 ===\n  Lv.2 용사: HP 81/120 ATK 25 DEF 7 EXP 80/100`,
      hint: "레벨업하면 능력치가 올라가고 HP가 완전 회복돼요!",
      hint2: "exp >= 100이면 레벨업! 레벨업 시 max_hp+20, atk+5, def+2!"
    },
    {
      id: "ch4-1",
      type: "mission",
      title: "🎯 미션: 스킬 시스템 추가!",
      task: "Hero 클래스에 special_attack 메서드를 완성하세요! 빈칸 3개를 채우세요!",
      initialCode: `class Hero:
    def __init__(self, name, hp, atk):
        self.name = name
        self.hp = hp
        self.atk = atk
        self.mp = 50
        self.alive = True

    def take_damage(self, damage):
        self.hp = self.hp - damage
        if self.hp <= 0:
            self.hp = 0
            self.alive = False

    def attack(self, target):
        target.take_damage(self.atk)
        print(f'{self.name} 공격! (-{self.atk}) {target.name} HP: {target.hp}')

    def special_attack(self, target, mp_cost):
        if self.mp < ___:
            print('MP 부족!')
            return
        self.___ = self.mp - mp_cost
        damage = self.atk * 2
        target.take_damage(___)
        print(f'{self.name} 필살기! (-{damage}) {target.name} HP: {target.hp}')
        print(f'남은 MP: {self.mp}')

class Monster:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp
        self.alive = True

    def take_damage(self, damage):
        self.hp = self.hp - damage
        if self.hp <= 0:
            self.hp = 0
            self.alive = False

hero = Hero('용사', 100, 20)
boss = Monster('보스', 120)

hero.attack(boss)
hero.special_attack(boss, 20)
hero.special_attack(boss, 20)
hero.special_attack(boss, 20)`,
      expectedOutput: `용사 공격! (-20) 보스 HP: 100\n용사 필살기! (-40) 보스 HP: 60\n남은 MP: 30\n용사 필살기! (-40) 보스 HP: 20\n남은 MP: 10\nMP 부족!`,
      hint: "MP가 충분한지 확인하고, MP를 소모한 후 2배 데미지!",
      hint2: "mp_cost / mp / damage"
    }
  ]
}
