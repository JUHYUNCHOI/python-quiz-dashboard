import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "몬스터 & 전투 메서드",
  emoji: "👹",
  steps: [
    {
      id: "ch2-0",
      type: "tryit",
      title: "👹 2단계: 몬스터 만들기!",
      task: "Character 클래스에 attack, take_damage, heal 메서드를 추가한 전투 시스템을 실행하세요!",
      initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.max_hp = hp
        s.atk = atk
        s.defense = defense
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
        print(f'{s.name} -> {target.name} ({actual} 데미지)')
        if not target.alive:
            print(f'{target.name} 쓰러짐!')

    def heal(s, amount):
        if not s.alive:
            return
        s.hp = min(s.hp + amount, s.max_hp)
        print(f'{s.name} 회복! HP: {s.hp}/{s.max_hp}')

    def status(s):
        state = 'O' if s.alive else 'X'
        print(f'[{state}] {s.name}: HP {s.hp}/{s.max_hp}')

# 캐릭터 생성
hero = Character('용사', 100, 25, 8)
slime = Character('슬라임', 40, 12, 3)

print('=== 캐릭터 생성 ===')
hero.status()
slime.status()

print('\\n=== 전투! ===')
hero.attack(slime)
slime.attack(hero)
hero.attack(slime)

print('\\n=== 결과 ===')
hero.status()
slime.status()`,
      expectedOutput: `=== 캐릭터 생성 ===\n[O] 용사: HP 100/100\n[O] 슬라임: HP 40/40\n\n=== 전투! ===\n용사 -> 슬라임 (22 데미지)\n슬라임 -> 용사 (4 데미지)\n용사 -> 슬라임 (22 데미지)\n슬라임 쓰러짐!\n\n=== 결과 ===\n[O] 용사: HP 96/100\n[X] 슬라임: HP 0/40`,
      hint: "take_damage에서 방어력만큼 데미지를 줄여요!",
      hint2: "actual = damage - defense, 최소 1 데미지는 들어가요!"
    },
    {
      id: "ch2-0b",
      type: "mission",
      title: "🎯 미션: 전투 메서드 완성!",
      task: "빈칸 3개를 채워서 전투 시스템을 완성하세요!",
      initialCode: `class Character:
    def __init__(s, name, hp, atk, defense):
        s.name = name
        s.hp = hp
        s.atk = atk
        s.defense = defense

    def take_damage(s, damage):
        actual = damage - s.___
        if actual < 1:
            actual = 1
        s.hp = s.hp - actual
        return actual

    def attack(s, target):
        actual = target.___(s.atk)
        print(f'{s.name} -> {target.name} ({actual} 데미지)')

    def status(s):
        print(f'{s.name}: HP {s.hp}')

hero = Character('용사', 100, 25, 8)
slime = Character('슬라임', 30, 10, 2)

hero.status()
slime.status()

print('\\n--- 전투! ---')
hero.___(slime)
slime.attack(hero)

print('\\n--- 결과 ---')
hero.status()
slime.status()`,
      expectedOutput: `용사: HP 100\n슬라임: HP 30\n\n--- 전투! ---\n용사 -> 슬라임 (23 데미지)\n슬라임 -> 용사 (2 데미지)\n\n--- 결과 ---\n용사: HP 98\n슬라임: HP 7`,
      hint: "방어력으로 데미지 감소, take_damage로 피해 적용, attack으로 공격!",
      hint2: "defense / take_damage / attack"
    },
    {
      id: "ch2-1",
      type: "quiz",
      title: "퀴즈!",
      content: "방어력이 10이고 공격력 8인 공격을 받으면?\n\n```python\ndef take_damage(s, damage):\n    actual = damage - s.defense\n    if actual < 1:\n        actual = 1\n```",
      options: [
        "0 데미지 (무시)",
        "1 데미지 (최소)",
        "8 데미지 (그대로)",
        "에러"
      ],
      answer: 1,
      explanation: "8 - 10 = -2지만, 최소 1 데미지는 들어가요!"
    }
  ]
}
