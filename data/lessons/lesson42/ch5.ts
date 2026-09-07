import { Chapter } from '../types'

export const ch5: Chapter = {
  id: "ch5",
  title: "상속 — 코드 물려받기!",
  emoji: "👪",
  steps: [
    {
      id: "ch5-0",
      type: "explain",
      title: "👪 상속이란? 부모의 능력을 물려받기!",
      content: `RPG에서 "전사", "마법사", "궁수" 모두 **캐릭터**잖아요?
공통점(이름, HP, 공격)은 같고, 특수 능력만 달라요!

\`\`\`python
# ❌ 이렇게 하면 같은 코드를 3번 반복...
class Warrior:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp
    def attack(s): ...

class Mage:
    def __init__(s, name, hp):  # 또 같은 코드!
        s.name = name
        s.hp = hp
    def attack(s): ...
\`\`\`

\`\`\`python
# ✅ 상속으로 해결!
class Character:          # 부모 클래스
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp

class Warrior(Character):  # 자식: Character를 상속!
    pass                   # 부모의 __init__을 그대로 사용

class Mage(Character):     # 자식: Character를 상속!
    pass
\`\`\`

**class 자식(부모):** 이렇게 괄호 안에 부모를 넣으면 끝!

| 용어 | 뜻 | 예시 |
|------|-----|------|
| 부모 클래스 | 공통 기능 | Character |
| 자식 클래스 | 부모 + 특수 기능 | Warrior, Mage |`
    },
    {
      id: "ch5-pred1",
      type: "predict",
      title: "이 코드의 출력은?",
      content: "자식이 부모의 메서드를 쓸 수 있을까요?",
      code: "class Animal:\n    def __init__(s, name):\n        s.name = name\n    def speak(s):\n        print(f'{s.name}: ...')\n\nclass Dog(Animal):\n    pass\n\nd = Dog('멍멍이')\nd.speak()",
      options: ["멍멍이: ...", "에러: Dog has no speak", "None", "Animal: ..."],
      answer: 0,
      explanation: "Dog는 Animal을 상속받아서 speak() 메서드를 그대로 쓸 수 있어요! 코드 한 줄도 안 썼는데!"
    },
    {
      id: "ch5-1",
      type: "explain",
      title: "🔧 메서드 오버라이딩 — 내 스타일로 바꾸기!",
      content: `부모의 메서드를 자식이 **덮어쓸 수** 있어요!

\`\`\`python
class Animal:
    def speak(s):
        print("...")

class Dog(Animal):
    def speak(s):        # 같은 이름으로 덮어쓰기!
        print("멍멍!")

class Cat(Animal):
    def speak(s):        # 고양이는 다르게!
        print("야옹!")
\`\`\`

\`\`\`python
animals = [Dog(), Cat(), Animal()]
for a in animals:
    a.speak()
# 멍멍!
# 야옹!
# ...
\`\`\`

같은 speak()인데 **객체에 따라 다르게 동작** — 이걸 **다형성**이라고 해요!`
    },
    {
      id: "ch5-pred2",
      type: "predict",
      title: "어떤 메서드가 호출될까?",
      content: "부모와 자식 둘 다 같은 메서드가 있으면?",
      code: "class Parent:\n    def greet(s):\n        print('안녕 부모')\n\nclass Child(Parent):\n    def greet(s):\n        print('안녕 자식')\n\nc = Child()\nc.greet()",
      options: ["안녕 자식", "안녕 부모", "안녕 부모\n안녕 자식", "에러"],
      answer: 0,
      explanation: "자식이 같은 이름의 메서드를 가지면 자식 것이 우선! 이걸 오버라이딩이라고 해요."
    },
    {
      id: "ch5-2",
      type: "explain",
      title: "📞 super() — 부모 메서드 호출!",
      content: `자식에서 부모의 메서드를 **호출하고 싶으면** super()!

\`\`\`python
class Character:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp

class Warrior(Character):
    def __init__(s, name, hp, weapon):
        super().__init__(name, hp)  # 부모의 __init__ 호출!
        s.weapon = weapon           # 전사만의 추가 속성

w = Warrior("용사", 100, "검")
print(f"{w.name} HP:{w.hp} 무기:{w.weapon}")
# 용사 HP:100 무기:검
\`\`\`

**super()** = 부모 클래스를 가리켜요!
- \`super().__init__()\` → 부모의 생성자 호출
- 부모가 하는 일 + 내가 추가할 일을 합칠 수 있어요!`
    },
    {
      id: "ch5-fb1",
      type: "fillblank" as const,
      title: "빈칸을 채워주세요",
      content: "Mage 클래스가 Character를 상속받아 마법 속성을 추가해요!",
      code: "class Character:\n    def __init__(s, name, hp):\n        s.name = name\n        s.hp = hp\n\nclass Mage(___):\n    def __init__(s, name, hp, magic):\n        ___.__init__(name, hp)\n        s.magic = ___",
      fillBlanks: [
        { id: 0, answer: "Character", options: ["Character", "Object", "Base", "Parent"] },
        { id: 1, answer: "super()", options: ["super()", "self", "Character", "parent()"] },
        { id: 2, answer: "magic", options: ["magic", "mp", "spell", "power"] }
      ],
      explanation: "class Mage(Character)로 상속! super().__init__()으로 부모 생성자 호출! s.magic = magic으로 추가 속성!"
    },
    {
      /* 2026-09-07: 학생(student-python)이 ch5 를 따라가고 이렇게 말했다 —
         "상속·오버라이딩·다형성·super() 가 한 챕터에 몰렸는데 내가 직접
          타이핑하는 문제가 하나도 없었다. 정답은 다 맞혔는데 바로 위 explain 에
          코드가 거의 그대로 있어서, 이해했다기보다 방금 본 걸 그대로 고른 느낌."
         실제로 ch5 는 explain3·predict2·quiz2·fillblank1 뿐이었다 —
         ch1~ch4 는 매 챕터에 mission 이 있었는데 마지막 챕터에서만 사라졌다.
         ch5-fb1 은 보기 중 클릭이라 손으로 치는 게 아니다.
         → 타이핑하는 칸 둘을 넣는다: 빈칸(ch5-try1) → 처음부터(ch5-mission). */
      id: "ch5-try1",
      type: "tryit",
      title: "💻 물려받아서 내 것으로 바꾸기",
      task: "Archer 가 Character 를 물려받게 하고, 부모의 __init__ 을 불러주세요.",
      initialCode: `class Character:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp

    def hello(s):
        print(f'{s.name} 등장!')

# Archer 는 Character 를 물려받아요
class Archer(___):
    def __init__(s, name, hp, arrows):
        ___.__init__(name, hp)   # 부모의 __init__ 부르기
        s.arrows = arrows

    # 부모의 hello 를 내 것으로 바꿔요
    def hello(s):
        print(f'{s.name} 등장! 화살 {s.arrows}개')

a = Archer('궁수', 90, 20)
a.hello()`,
      expectedOutput: "궁수 등장! 화살 20개",
      hint: "괄호 안에는 물려줄 쪽 이름이 들어가요. 부모를 부를 때 쓰는 말은 따로 있었죠.",
      hint2: "Character / super()"
    },
    {
      id: "ch5-mission",
      type: "mission",
      title: "🎯 처음부터 만들어보기",
      description: "빈칸 없이, 처음부터 직접 써봐요!",
      task: "Character 를 물려받는 Healer 를 만드세요. 재료는 이름·HP·힐량 셋이고, 이름과 HP 는 super() 로 부모에게 넘겨요. hello 는 \"치유사 등장! 힐 30\" 이 나오게 바꾸세요.",
      initialCode: `class Character:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp

    def hello(s):
        print(f'{s.name} 등장!')

# 여기에 Healer 를 처음부터 써보세요


h = Healer('치유사', 70, 30)
h.hello()`,
      expectedOutput: "치유사 등장! 힐 30",
      hint: "class 이름(부모): 로 시작해요. __init__ 은 재료를 셋 받고, 그중 둘만 부모에게 넘겨요.",
      hint2: `class Character:\n    def __init__(s, name, hp):\n        s.name = name\n        s.hp = hp\n\n    def hello(s):\n        print(f'{s.name} 등장!')\n\nclass Healer(Character):\n    def __init__(s, name, hp, heal):\n        super().__init__(name, hp)\n        s.heal = heal\n\n    def hello(s):\n        print(f'{s.name} 등장! 힐 {s.heal}')\n\nh = Healer('치유사', 70, 30)\nh.hello()`
    },
    {
      id: "ch5-quiz1",
      type: "quiz",
      title: "상속 이해하기!",
      content: "다음 중 상속에 대한 설명으로 **틀린** 것은?",
      options: [
        "자식 클래스는 부모의 메서드를 사용할 수 있다",
        "자식 클래스는 부모의 메서드를 덮어쓸 수 있다",
        "자식 클래스는 부모보다 속성이 적어야 한다",
        "super()로 부모의 메서드를 호출할 수 있다"
      ],
      answer: 2,
      explanation: "자식은 부모의 속성을 물려받고 더 추가할 수 있어요! 적어야 할 이유가 없어요."
    },
    {
      id: "ch5-quiz2",
      type: "quiz",
      title: "코드 예측!",
      content: "다음 코드의 결과는?\n\n```python\nclass A:\n    def say(s):\n        print('A')\n\nclass B(A):\n    pass\n\nclass C(B):\n    def say(s):\n        print('C')\n\nC().say()\n```",
      options: [
        "C",
        "A",
        "B",
        "에러"
      ],
      answer: 0,
      explanation: "C에 say()가 있으니 C의 것을 사용! B에는 없지만 A에 있어요. 하지만 C가 직접 가지고 있으니 C가 우선!"
    }
  ]
}
