import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "공격/회복 메서드",
  emoji: "⚔️",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "💭 용사가 슬라임을 공격하려면 뭘 알아야 할까?",
      content: `💭 인사 메서드는 혼자 했는데... 공격은 **상대방**이 필요하잖아? 메서드에 상대를 어떻게 전달하지?

\`\`\`python
def attack(s, target):  # target = 공격 대상!
    print(f'{s.char_name}이(가) {target.char_name}을(를) 공격!')
    target.hp = target.hp - s.atk  # 상대 HP 감소!
\`\`\`

💡 **target**도 객체라서 \`target.char_name\`, \`target.hp\` 사용 가능!

@핵심: 메서드에 **다른 객체를 매개변수**로 넘기면 상대방의 속성도 바꿀 수 있다!`
    },
    {
      id: "ch2-1",
      type: "tryit",
      title: "💻 공격 시스템 실행!",
      task: "용사가 슬라임을 공격하는 코드를 실행해보세요!",
      initialCode: `class Character:
    def __init__(s, char_name, hp, atk):
        s.char_name = char_name
        s.hp = hp
        s.atk = atk

    def attack(s, target):
        print(f'{s.char_name}이(가) {target.char_name}을(를) 공격!')
        print(f'{s.atk} 데미지!')
        target.hp = target.hp - ___
        print(f'{target.char_name}의 남은 HP: {target.hp}')

hero = Character('용사', 100, 25)
slime = Character('슬라임', 30, 5)
hero.attack(slime)`,
      expectedOutput: `용사이(가) 슬라임을(를) 공격!\n25 데미지!\n슬라임의 남은 HP: 5`,
      hint: "hero.attack(slime)에서 s=hero, target=slime이 돼요!",
      hint2: "s.atk"
    },
    {
      /* 2026-09-06: 이 챕터는 explain 1 + 채점 안 되는 tryit 2 뿐이고 퀴즈조차 없었다.
         pedagogy-reviewer·lesson-content-reviewer 둘 다 12개 중 **최우선**으로 꼽았다.
         이 챕터가 가르치는 `target.hp = target.hp - s.atk` (다른 객체를 매개변수로
         받아 그 객체의 속성을 바꾸는 패턴)는 레슨 43·44·50 이 계속 재사용하는데,
         **레슨42 안 어디에서도 학생이 한 글자도 안 쳐봤다.**
         (pedagogy 확인: 이 패턴이 빈칸으로 처음 나오는 건 lesson50/ch2 — 8레슨 뒤다) */
      id: "ch2-1a",
      type: "tryit",
      title: "✋ 빈칸 채우기 — 누가 누굴 공격하지?",
      task: "이번엔 고블린이 용사를 공격하도록 빈칸을 채워보세요!",
      initialCode: `class Character:
    def __init__(s, char_name, hp, atk):
        s.char_name = char_name
        s.hp = hp
        s.atk = atk

    def attack(s, target):
        target.hp = target.hp - s.atk
        print(f'{target.char_name}의 남은 HP: {target.hp}')

hero = Character('용사', 100, 30)
goblin = Character('고블린', 50, 8)

# 고블린이 용사를 공격!
___.attack(___)`,
      expectedOutput: "용사의 남은 HP: 92",
      hint: "attack(s, target) 에서 공격하는 쪽이 s, 맞는 쪽이 target 이에요.",
      hint2: "goblin / hero"
    },
    {
      id: "ch2-2",
      type: "tryit",
      title: "💚 회복 시스템 만들기!",
      task: "heal 메서드로 HP를 회복하되, max_hp를 넘지 않게 하는 코드를 실행해보세요!",
      initialCode: `class Character:
    def __init__(s, char_name, hp, atk):
        s.char_name = char_name
        s.hp = hp
        s.max_hp = ___
        s.atk = atk

    def heal(s, amount):
        s.hp = s.hp ___ amount
        if s.hp > s.max_hp:
            s.hp = s.max_hp
        print(f'{s.char_name} 회복! (+{amount}) HP: {s.hp}/{s.max_hp}')

    def status(s):
        print(f'{s.char_name}: HP {s.hp}/{s.max_hp}, ATK {s.atk}')

hero = Character('용사', 100, 25)
hero.status()
hero.hp = hero.hp - 40
hero.status()
hero.heal(30)
hero.heal(50)`,
      expectedOutput: `용사: HP 100/100, ATK 25\n용사: HP 60/100, ATK 25\n용사 회복! (+30) HP: 90/100\n용사 회복! (+50) HP: 100/100`,
      hint: "처음 만들 때 최대 체력은 시작 체력과 같아요. 그리고 회복은 어느 쪽 연산일까요?",
      hint2: "hp / +"
    },
    {
      id: "ch2-2a",
      type: "quiz",
      title: "퀴즈!",
      content: "HP 90/100 인 캐릭터가 heal(30) 을 하면 회복 후 HP 는?",
      options: ["120", "100", "90", "30"],
      answer: 1,
      explanation: "90+30=120 이지만 max_hp(100) 를 넘을 수 없어서 100 에서 멈춰요."
    },
    {
      id: "ch2-2b",
      type: "tryit",
      title: "✋ 빈칸 채우기 — max_hp 를 넘지 않게!",
      task: "회복해도 최대 체력을 넘지 않도록 빈칸을 채워보세요!",
      initialCode: `class Character:
    def __init__(s, char_name, hp, max_hp):
        s.char_name = char_name
        s.hp = hp
        s.max_hp = max_hp

    def heal(s, amount):
        s.hp = s.hp + amount
        if s.hp > s.max_hp:
            s.hp = s.___
        print(f'{s.char_name} HP: {s.hp}/{s.max_hp}')

hero = Character('용사', 70, 100)
hero.heal(20)
hero.heal(50)`,
      expectedOutput: "용사 HP: 90/100\n용사 HP: 100/100",
      hint: "회복해도 최대 체력보다 커지면 안 돼요. 그럼 얼마로 맞춰야 할까요?",
      hint2: "max_hp"
    },
    {
      // 사다리 마지막 칸 — 빈칸 없이 처음부터. heal 과 같은 패턴이라 바로 앞에서 익혔다.
      id: "ch2-3",
      type: "mission",
      title: "🏆 미션 — 포션 사용 메서드 만들기",
      task: "use_potion 메서드를 처음부터 만들어보세요! HP 를 30 회복하되 최대 체력을 넘지 않게 해요.",
      initialCode: `class Character:
    def __init__(s, char_name, hp, max_hp):
        s.char_name = char_name
        s.hp = hp
        s.max_hp = max_hp

    # use_potion 메서드를 여기 만드세요!
    # 1) HP 를 30 늘리기
    # 2) 최대 체력을 넘으면 최대 체력으로 맞추기
    # 3) '{이름} 포션 사용! HP: {현재}/{최대}' 출력


hero = Character('용사', 50, 100)
hero.use_potion()
hero.use_potion()`,
      expectedOutput: "용사 포션 사용! HP: 80/100\n용사 포션 사용! HP: 100/100",
      hint: "바로 위 heal 과 같은 모양이에요 — 더하고, 넘치면 자르고, 출력해요.",
      hint2: `    def use_potion(s):
        s.hp = s.hp + 30
        if s.hp > s.max_hp:
            s.hp = s.max_hp
        print(f'{s.char_name} 포션 사용! HP: {s.hp}/{s.max_hp}')`
    }
  ]
}
