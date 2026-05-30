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
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense
        s.level = 1
        s.exp = 0
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp = s.hp - actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack(s, target):
        if not s.alive:
            return
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} 데미지)')
        if not target.alive:
            print(f'  {target.name} 쓰러짐!')

    def gain_exp(s, amount):
        s.exp = s.exp + amount
        print(f'  +{amount} EXP (총 {s.exp})')
        if s.exp >= 100:
            s.level_up()

    def level_up(s):
        s.level = s.level + 1
        s.exp = s.exp - 100
        s.max_hp = s.max_hp + 20
        s.hp = s.max_hp
        s.atk = s.atk + 5
        s.defense = s.defense + 2
        print(f'  ★ LEVEL UP! Lv.{s.level}!')
        print(f'  HP {s.max_hp} ATK {s.atk} DEF {s.defense}')

    def status(s):
        print(f'  Lv.{s.level} {s.name}: HP {s.hp}/{s.max_hp} ATK {s.atk} DEF {s.defense} EXP {s.exp}/100')

class Monster:
    def __init__(s, name, hp, atk, defense, exp_reward):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense
        s.exp_reward = exp_reward
        s.alive = True

    def take_damage(s, damage):
        actual = damage - s.defense
        if actual < 1:
            actual = 1
        s.hp = s.hp - actual
        if s.hp <= 0:
            s.hp = 0
            s.alive = False
        return actual

    def attack(s, target):
        if not s.alive:
            return
        actual = target.take_damage(s.atk)
        print(f'  {s.name} -> {target.name} ({actual} 데미지)')

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
    def __init__(s, name, hp, atk):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.mp = 50
        s.alive = True

    def take_damage(s, damage):
        s.hp = s.hp - damage
        if s.hp <= 0:
            s.hp = 0
            s.alive = False

    def attack(s, target):
        target.take_damage(s.atk)
        print(f'{s.name} 공격! (-{s.atk}) {target.name} HP: {target.hp}')

    def special_attack(s, target, mp_cost):
        if s.mp < ___:
            print('MP 부족!')
            return
        s.___ = s.mp - mp_cost
        damage = s.atk * 2
        target.take_damage(___)
        print(f'{s.name} 필살기! (-{damage}) {target.name} HP: {target.hp}')
        print(f'남은 MP: {s.mp}')

class Monster:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp
        s.alive = True

    def take_damage(s, damage):
        s.hp = s.hp - damage
        if s.hp <= 0:
            s.hp = 0
            s.alive = False

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
