import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "클래스 만들기",
  emoji: "🔨",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "📦 가장 간단한 클래스",
      content: `## 빈 클래스부터!

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
- 클래스: \`Character()\`, \`Monster()\` (대문자)`
    },
    {
      id: "ch2-1",
      type: "explain",
      title: "🍩 __init__: 속을 채우자!",
      content: `## 빈 붕어빵은 재미없죠? 속을 채워봅시다!

\`\`\`python
class Character:
    def __init__(s, char_name, char_hp):
        s.char_name = char_name
        s.char_hp = char_hp
        print(f'{char_name} 캐릭터가 생성되었습니다!')

# 객체 생성
hero = Character('용사', 100)
print(f'이름: {hero.char_name}')
print(f'HP: {hero.char_hp}')
\`\`\`

**결과:**
\`\`\`
용사 캐릭터가 생성되었습니다!
이름: 용사
HP: 100
\`\`\`

💡 \`__init__\` = initialize(초기화)의 줄임말!
→ 객체를 만들 때 **자동으로** 실행돼요!`
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
      title: "🤔 s(self)가 뭘까?",
      content: `## 가장 헷갈리는 부분!

\`\`\`python
class Character:
    def __init__(s, char_name):
        print(f's는 누구? {s}')
        s.char_name = char_name

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

⚠️ 보통 \`self\`라고 쓰지만, 이 교재에서는 \`s\`를 써요!`
    },
    {
      id: "ch2-4",
      type: "interactive",
      title: "✏️ 클래스 따라치기!",
      description: "Character 클래스를 직접 만들어보세요!",
      component: "typeAlong",
      targetTitle: "캐릭터 클래스 만들기",
      targetDescription: "class와 __init__으로 캐릭터 생성",
      targetCode: "class Character:\n    def __init__(s, name, hp):\n        s.name = name\n        s.hp = hp\n\nhero = Character('용사', 100)\nprint(f'{hero.name}: HP {hero.hp}')",
      expectedOutput: "용사: HP 100"
    },
    {
      id: "ch2-5",
      type: "interactive",
      title: "빈칸 채우기: 클래스 기본",
      description: "클래스를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "___1___ Dog:\n    def ___2___(s, name):\n        ___3___.name = name\n\ndog = Dog('멍멍이')\nprint(dog.name)",
      blanks: [
        { id: "1", answer: "class", hint: "클래스 정의!" },
        { id: "2", answer: "__init__", hint: "초기화 함수!" },
        { id: "3", answer: "s", hint: "자기 자신!" }
      ],
      choices: ["class", "def", "__init__", "__main__", "s", "self", "dog"],
      expectedOutput: "멍멍이"
    }
  ]
}
