import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "첫 번째 메서드 만들기",
  emoji: "🗣️",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "📢 메서드 = 클래스 안의 함수!",
      content: `## 메서드란?

지난 시간에 클래스로 캐릭터를 만들었어요.
하지만 캐릭터가 **아무것도 못 해요!** 😅

\`\`\`python
hero = Character('용사', 100)
# 용사야, 인사해봐! → ???
# 용사야, 상태 보여줘! → ???
\`\`\`

💡 **메서드**를 추가하면 캐릭터가 행동할 수 있어요!

## 메서드 = 클래스 안에 있는 함수

\`\`\`python
class Character:
    def __init__(s, char_name, hp):
        s.char_name = char_name  # 속성
        s.hp = hp                # 속성

    def say_hello(s):            # 메서드!
        print(f'안녕! 나는 {s.char_name}이야!')
\`\`\`

⚠️ 메서드의 첫 번째 매개변수는 항상 **s(self)**!
→ "나 자신"을 뜻해요!`
    },
    {
      id: "ch1-1",
      type: "tryit",
      title: "💻 인사 & 상태 메서드 만들기!",
      task: "say_hello와 show_status 메서드를 가진 Character 클래스를 실행해보세요!",
      initialCode: `class Character:
    def __init__(s, char_name, hp):
        s.char_name = char_name
        s.hp = hp

    def say_hello(s):
        print(f'안녕! 나는 {s.char_name}이야!')

    def show_status(s):
        print(f'{s.char_name}: HP {s.hp}')

hero = Character('용사', 100)
hero.say_hello()
hero.show_status()`,
      expectedOutput: `안녕! 나는 용사이야!\n용사: HP 100`,
      hint: "메서드는 객체.메서드이름() 으로 호출해요!",
      hint2: "hero.say_hello()처럼 점(.)을 찍고 메서드 이름을 쓰세요!"
    },
    {
      id: "ch1-1b",
      type: "tryit",
      title: "💻 메서드에 매개변수 추가!",
      task: "매개변수가 있는 메서드를 만들어 실행해보세요!",
      initialCode: `class Character:
    def __init__(s, char_name, hp):
        s.char_name = char_name
        s.hp = hp

    def say_hello(s):
        print(f'안녕! 나는 {s.char_name}이야!')

    def introduce(s, age, job):
        print(f'이름: {s.char_name}')
        print(f'나이: {age}살')
        print(f'직업: {job}')
        print(f'HP: {s.hp}')

hero = Character('용사', 100)
hero.say_hello()
print()

# 매개변수를 넣어서 호출!
hero.introduce(18, '전사')
print()

mage = Character('마법사', 80)
mage.introduce(20, '마법사')`,
      expectedOutput: `안녕! 나는 용사이야!\n\n이름: 용사\n나이: 18살\n직업: 전사\nHP: 100\n\n이름: 마법사\n나이: 20살\n직업: 마법사\nHP: 80`,
      hint: "메서드도 일반 함수처럼 매개변수를 추가할 수 있어요!",
      hint2: "s 다음에 원하는 매개변수를 쉼표로 추가하세요!"
    },
    {
      id: "ch1-1c",
      type: "mission",
      title: "🎯 미션: 메서드 만들기!",
      task: "빈칸 3개를 채워서 레벨업 메서드를 완성하세요!",
      initialCode: `class Character:
    def __init__(s, char_name, hp):
        s.char_name = char_name
        s.hp = hp
        s.level = 1

    def show_status(s):
        print(f'{s.char_name} Lv.{s.level} (HP:{s.hp})')

    def level_up(___):
        s.level = s.level + 1
        s.___ = s.hp + 20
        print(f'{s.char_name} 레벨 업! Lv.{s.level} (HP:{s.hp})')

hero = Character('용사', 100)
hero.show_status()
hero.___()
hero.level_up()
hero.show_status()`,
      expectedOutput: `용사 Lv.1 (HP:100)\n용사 레벨 업! Lv.2 (HP:120)\n용사 레벨 업! Lv.3 (HP:140)\n용사 Lv.3 (HP:140)`,
      hint: "메서드의 첫 매개변수는 s, HP를 올리고, 메서드 이름으로 호출!",
      hint2: "s / hp / level_up"
    },
    {
      id: "ch1-2",
      type: "quiz",
      title: "퀴즈!",
      content: "메서드를 만들 때 꼭 지켜야 하는 규칙은?",
      options: [
        "메서드 이름은 대문자로 시작해야 한다",
        "메서드의 첫 번째 매개변수는 s(self)여야 한다",
        "메서드는 반드시 return이 있어야 한다",
        "메서드는 클래스 밖에 써야 한다"
      ],
      answer: 1,
      explanation: "메서드의 첫 번째 매개변수는 항상 s(self)! '나 자신'을 가리켜요."
    }
  ]
}
