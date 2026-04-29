import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "클래스 만들기",
  emoji: "🔨",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "💭 클래스를 만드는 코드, 어떻게 생겼을까?",
      component: "pyClassBuilder",
      content: `💭 붕어빵 틀을 코드로 만들려면? **class**라는 키워드를 써요!

\`\`\`python
# 클래스 정의 (틀 만들기)
class Character:
    pass  # 아무 기능 없음

# 객체 생성 (붕어빵 찍기)
hero = Character()
villain = Character()

print(type(hero))
\`\`\`

**결과:**
\`<class '__main__.Character'>\`

⚠️ 클래스 이름은 **대문자**로 시작!
- 함수: \`print()\`, \`input()\` (소문자)
- 클래스: \`Character()\`, \`Monster()\` (대문자)

@핵심: \`class 이름:\`으로 틀을 만들고, \`이름()\`으로 객체를 찍어낸다!`
    },
    {
      id: "ch2-1",
      type: "explain",
      title: "💭 빈 붕어빵에 이름을 넣으려면?",
      content: `💭 빈 클래스는 아무 정보가 없어요. 이름이라도 넣으려면 **어떤 함수**가 필요할까?

\`\`\`python
class Character:
    def __init__(self, char_name):
        self.char_name = char_name
        print(f'{char_name} 생성!')
\`\`\`

💡 \`__init__\`은 객체를 만들 때 **자동 실행**되는 초기화 함수예요!

@핵심: \`__init__\`에 이름을 넣으면 빈 붕어빵에 속이 들어간다!`
    },
    {
      id: "ch2-1a",
      type: "explain",
      title: "💭 이름 말고 HP도 넣으면?",
      content: `💭 이름만으로는 부족해! **HP**도 넣어서 캐릭터를 완성하면?

\`\`\`python
class Character:
    def __init__(self, char_name, char_hp):
        self.char_name = char_name
        self.char_hp = char_hp

hero = Character('용사', 100)
print(f'이름: {hero.char_name}')
print(f'HP: {hero.char_hp}')
\`\`\`

**결과:** \`이름: 용사\` / \`HP: 100\`

@핵심: 매개변수를 늘려서 **원하는 정보를 얼마든지** __init__에 넣을 수 있다!`
    },
    {
      id: "ch2-2",
      type: "quiz",
      title: "퀴즈!",
      content: "`__init__`은 언제 실행되나요?",
      options: [
        "프로그램 시작할 때",
        "클래스를 정의할 때",
        "객체를 만들 때 (Character() 호출 시)",
        "print() 할 때"
      ],
      answer: 2,
      explanation: "`Character('용사', 100)` 이렇게 객체를 만들 때 자동으로 실행돼요!"
    },
    {
      id: "ch2-3",
      type: "explain",
      title: "💭 __init__의 s는 대체 누구일까?",
      content: `💭 \`def __init__(self, char_name)\`에서 **s**는 뭘까? 어디서 온 거지?

\`\`\`python
class Character:
    def __init__(self, char_name):
        print(f's는 누구? {s}')
        self.char_name = char_name

hero = Character('용사')
print(f'hero는 누구? {hero}')
\`\`\`

**결과:**
\`\`\`
s는 누구? <__main__.Character object at 0x123abc>
hero는 누구? <__main__.Character object at 0x123abc>
\`\`\`

→ **주소가 같아요!** s와 hero는 같은 객체!

🍩 붕어빵 틀에서 붕어빵이 찍힐 때:
- \`s\` = "지금 만들어지고 있는 이 붕어빵"
- \`hero\` = "완성된 붕어빵의 이름표"

⚠️ 보통 \`self\`라고 쓰지만, 이 교재에서는 \`s\`를 써요!

@핵심: **s(self)는 "나 자신"** — 만들어지고 있는 그 객체를 가리킨다!`
    },
    {
      id: "ch2-4",
      type: "interactive",
      title: "✏️ 클래스 따라치기!",
      description: "Character 클래스를 직접 만들어보세요!",
      component: "typeAlong",
      targetTitle: "캐릭터 클래스 만들기",
      targetDescription: "class와 __init__으로 캐릭터 생성",
      targetCode: "class Character:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n\nhero = Character('용사', 100)\nprint(f'{hero.name}: HP {hero.hp}')",
      expectedOutput: "용사: HP 100"
    },
    {
      id: "ch2-5",
      type: "interactive",
      title: "빈칸 채우기: 클래스 기본",
      description: "클래스를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "___1___ Dog:\n    def ___2___(self, name):\n        ___3___.name = name\n\ndog = Dog('멍멍이')\nprint(dog.name)",
      blanks: [
        { id: "1", answer: "class", hint: "클래스 정의!" },
        { id: "2", answer: "__init__", hint: "초기화 함수!" },
        { id: "3", answer: "s", hint: "자기 자신!" }
      ],
      choices: ["class", "def", "__init__", "__main__", "s", "self", "dog"],
      expectedOutput: "멍멍이"
    },
    {
      id: "ch2-6",
      type: "tryit",
      title: "✋ 직접 — Pet 클래스 만들기",
      task: "이름과 나이를 가진 Pet 클래스를 완성해서 강아지 객체를 만들어 보세요!",
      initialCode: `class Pet:
    def __init__(s, name, age):
        s.___ = name
        s.age = ___

dog = Pet('멍멍이', 3)
print(f'{dog.name}: {dog.age}살')`,
      expectedOutput: "멍멍이: 3살",
      hint: "s.속성 = 매개변수 형태로 매개변수 값을 객체에 저장해요.",
      hint2: "name / age"
    },
    {
      id: "ch2-7",
      type: "mission",
      title: "🏆 미션 — Dog 클래스 처음부터",
      task: "빈칸 없이 처음부터! Dog 클래스를 만들고 (이름 name, 견종 breed), snoopy = Dog('snoopy', 'Beagle') 객체로 'snoopy: Beagle' 출력하세요.",
      initialCode: `# 1) Dog 클래스 정의 (name, breed 두 속성)
# 2) snoopy = Dog('snoopy', 'Beagle')
# 3) 'snoopy: Beagle' 형태로 출력

`,
      expectedOutput: "snoopy: Beagle",
      hint: "class 다음에 __init__(s, name, breed). 안에서 s.name = name, s.breed = breed.",
      hint2: `class Dog:
    def __init__(s, name, breed):
        s.name = name
        s.breed = breed

snoopy = Dog('snoopy', 'Beagle')
print(f'{snoopy.name}: {snoopy.breed}')`
    }
  ]
}
