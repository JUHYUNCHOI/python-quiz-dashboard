import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "⭐ 쉬움 (1~8)",
  emoji: "⭐",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💭 클래스 실력, 어디까지 왔을까?",
      content: `💭 클래스, 메서드, 속성, 클래스 변수까지 배웠는데... **진짜 이해한 건지** 20문제로 확인해볼까?

| 난이도 | 문제 수 |
|--------|---------|
| ⭐ 쉬움 | 8문제 |
| ⭐⭐ 보통 | 6문제 |
| ⭐⭐⭐ 도전 | 6문제 |

@핵심: 목표는 **20문제 중 16문제 이상** 맞추기! 도전해보자!`
    },
    {
      id: "ch1-1",
      type: "quiz",
      title: "문제 1",
      content: "출력 결과는?\n\n```python\nclass Dog:\n    def bark(s):\n        print('멍멍!')\ndog = Dog()\ndog.bark()\n```",
      options: ["멍멍!", "에러", "Dog.bark()", "None"],
      answer: 0,
      explanation: "dog.bark() 호출 → s에 dog이 들어가고 → '멍멍!' 출력!"
    },
    {
      id: "ch1-2",
      type: "quiz",
      title: "문제 2",
      content: "출력 결과는?\n\n```python\nclass Cat:\n    def __init__(s, name):\n        s.name = name\n    def meow(s):\n        print(f'{s.name}: 야옹!')\ncat = Cat('나비')\ncat.meow()\n```",
      options: ["야옹!", "나비: 야옹!", "Cat: 야옹!", "에러"],
      answer: 1,
      explanation: "s.name은 '나비'이므로 '나비: 야옹!' 출력!"
    },
    {
      id: "ch1-3",
      type: "quiz",
      title: "문제 3",
      content: "출력 결과는?\n\n```python\nclass Box:\n    def __init__(s, item):\n        s.item = item\nbox1 = Box('사과')\nbox2 = Box('바나나')\nprint(box1.item)\nprint(box2.item)\n```",
      options: ["사과\\n사과", "바나나\\n바나나", "사과\\n바나나", "에러"],
      answer: 2,
      explanation: "box1과 box2는 서로 다른 객체! 각각의 item이 달라요!"
    },
    {
      id: "ch1-4",
      type: "quiz",
      title: "문제 4",
      content: "출력 결과는?\n\n```python\nclass Counter:\n    count = 0\n    def __init__(s):\n        Counter.count += 1\na = Counter()\nb = Counter()\nc = Counter()\nprint(Counter.count)\n```",
      options: ["1", "2", "3", "0"],
      answer: 2,
      explanation: "Counter()를 3번 호출 → count가 3번 증가 → 3!"
    },
    {
      id: "ch1-4b",
      type: "tryit",
      title: "💻 문제 4.5: 클래스 직접 만들기!",
      task: "간단한 클래스를 만들고 실행해보세요!",
      initialCode: `class Student:
    def __init__(s, name, grade):
        s.name = name
        s.grade = grade

    def introduce(s):
        print(f'이름: {s.name}, 학년: {s.grade}학년')

    def is_senior(s):
        if s.grade >= 3:
            return True
        return False

# 학생 만들기
s1 = Student('철수', 2)
s2 = Student('영희', 3)

s1.introduce()
s2.introduce()

print(f'\\n{s1.name} 고학년? {s1.is_senior()}')
print(f'{s2.name} 고학년? {s2.is_senior()}')`,
      expectedOutput: `이름: 철수, 학년: 2학년\n이름: 영희, 학년: 3학년\n\n철수 고학년? False\n영희 고학년? True`,
      hint: "__init__으로 속성 설정, 메서드로 행동 정의!",
      hint2: "코드를 그대로 실행하세요!"
    },
    {
      id: "ch1-5",
      type: "quiz",
      title: "문제 5",
      content: "출력 결과는?\n\n```python\nclass Player:\n    def __init__(s, name, score):\n        s.name = name\n        s.score = score\np = Player('철수', 85)\np.score = p.score + 10\nprint(f'{p.name}: {p.score}점')\n```",
      options: ["철수: 85점", "철수: 95점", "철수: 10점", "에러"],
      answer: 1,
      explanation: "85 + 10 = 95! 속성은 언제든 바꿀 수 있어요!"
    },
    {
      id: "ch1-6",
      type: "quiz",
      title: "문제 6",
      content: "출력 결과는?\n\n```python\nclass Greeting:\n    def hello(s, name):\n        return f'안녕, {name}!'\ng = Greeting()\nresult = g.hello('영희')\nprint(result)\n```",
      options: ["안녕, 영희!", "None", "에러", "안녕, name!"],
      answer: 0,
      explanation: "return으로 문자열을 돌려주고, print로 출력!"
    },
    {
      id: "ch1-7",
      type: "quiz",
      title: "문제 7",
      content: "출력 결과는?\n\n```python\nclass Number:\n    def __init__(s, value):\n        s.value = value\n    def double(s):\n        return s.value * 2\nn = Number(7)\nprint(n.double())\n```",
      options: ["7", "14", "77", "에러"],
      answer: 1,
      explanation: "7 * 2 = 14! double() 메서드가 값을 2배로!"
    },
    {
      id: "ch1-7b",
      type: "mission",
      title: "🎯 문제 7.5: 계산기 클래스!",
      task: "빈칸 3개를 채워서 계산기 클래스를 완성하세요!",
      initialCode: `class Calculator:
    def __init__(s, name):
        s.name = name
        s.result = 0

    def add(s, n):
        s.___ = s.result + n
        return s

    def subtract(s, n):
        s.result = s.result - n
        return ___

    def show(s):
        print(f'{s.name}: {s.result}')

calc = Calculator('내 계산기')
calc.add(10)
calc.add(5)
calc.subtract(3)
calc.___()`,
      expectedOutput: `내 계산기: 12`,
      hint: "result에 값 저장, s를 반환, show로 출력!",
      hint2: "result / s / show"
    },
    {
      id: "ch1-8",
      type: "quiz",
      title: "문제 8",
      content: "출력 결과는?\n\n```python\nclass Stack:\n    def __init__(s):\n        s.items = []\n    def push(s, item):\n        s.items.append(item)\n    def size(s):\n        return len(s.items)\nstack = Stack()\nstack.push('a')\nstack.push('b')\nstack.push('c')\nprint(stack.size())\n```",
      options: ["0", "1", "2", "3"],
      answer: 3,
      explanation: "'a', 'b', 'c' 세 개를 push → size() = 3!"
    }
  ]
}
