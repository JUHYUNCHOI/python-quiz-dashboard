import type { LessonData } from '../types'

export const lesson44: LessonData = {
  id: "44",
  title: "Part 7 문제 — 클래스 종합 & 상속",
  description: "상속, super(), 오버라이딩, 클래스 변수까지!",
  steps: [
    // ============================================
    // Chapter 1: 상속이란?
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "상속 — 부모 클래스 물려받기",
        desc: "Animal → Dog 처럼 클래스를 확장!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Animal:
    def __init__(s, name):
        s.name = name

    def speak(s):
        print(f'{s.name}이(가) 소리내요')

class Dog(Animal):
    pass

d = Dog('뽀삐')
d.speak()`,
        result: "뽀삐이(가) 소리내요",
        note: "Dog는 Animal의 __init__과 speak를 자동으로 물려받아요!"
      }
    },

    {
      type: "quiz",
      content: {
        question: "class Dog(Animal): 에서 괄호 안의 Animal은 무엇을 의미?",
        options: [
          "Dog의 매개변수",
          "Dog가 상속받는 부모 클래스",
          "Animal 타입의 변수",
          "Dog의 메서드 이름"
        ],
        answer: 1,
        explanation: "괄호 안에 부모 클래스를 적으면 그 클래스의 속성과 메서드를 물려받아요!"
      }
    },

    {
      type: "practice",
      content: {
        level: 1,
        task: "___ 자리를 채워 Cat 클래스가 Animal을 상속받게 해요!",
        guide: "class 자식(부모): 형태",
        hint: "괄호 안에 부모 클래스 이름!",
        template: "class Animal:\n    def __init__(s, name):\n        s.name = name\n\nclass Cat(___):\n    pass\n\nc = Cat('나비')\nprint(c.name)",
        answer: "Animal",
        expect: "나비"
      }
    },

    { type: "reward", content: { emoji: "🐕", message: "상속 기초 완성!" } },

    // ============================================
    // Chapter 2: 오버라이딩 & super()
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "오버라이딩 & super()",
        desc: "부모 메서드를 덮어쓰거나 확장!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Animal:
    def speak(s):
        print('동물 소리')

class Dog(Animal):
    def speak(s):
        print('멍멍!')

d = Dog()
d.speak()`,
        predict: {
          question: "출력 결과는?",
          options: ["동물 소리", "멍멍!", "동물 소리\\n멍멍!", "에러"],
          answer: 1,
          feedback: "Dog가 speak를 다시 정의했으니 자식의 메서드가 실행돼요! 이게 오버라이딩!"
        },
        result: "멍멍!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Animal:
    def __init__(s, name):
        s.name = name

class Dog(Animal):
    def __init__(s, name, breed):
        super().__init__(name)
        s.breed = breed

d = Dog('뽀삐', '푸들')
print(d.name)
print(d.breed)`,
        result: "뽀삐\n푸들",
        note: "super().__init__(name)으로 부모의 __init__을 호출! name 저장은 부모에게 맡기고, 새 속성만 추가!"
      }
    },

    {
      type: "quiz",
      content: {
        question: "super()는 무엇을 가리키나요?",
        options: [
          "자기 자신",
          "부모 클래스",
          "최상위 클래스",
          "다음 객체"
        ],
        answer: 1,
        explanation: "super()는 부모 클래스를 가리켜요! super().__init__()으로 부모의 __init__을 호출할 수 있어요!"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채워 super()로 부모 __init__을 호출해요!",
        guide: "super().__init__(부모가 받는 인자)",
        hint: "super().__init__(name)",
        template: "class Animal:\n    def __init__(s, name):\n        s.name = name\n\nclass Cat(Animal):\n    def __init__(s, name, color):\n        ___().__init__(___)\n        s.color = color\n\nc = Cat('나비', '검정')\nprint(c.name, c.color)",
        blanksAnswer: ["super", "name"],
        answer: "class Animal:\n    def __init__(s, name):\n        s.name = name\n\nclass Cat(Animal):\n    def __init__(s, name, color):\n        super().__init__(name)\n        s.color = color\n\nc = Cat('나비', '검정')\nprint(c.name, c.color)",
        expect: "나비 검정"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워 speak 메서드를 오버라이딩해요!",
        guide: "자식 클래스에 같은 이름의 메서드를 정의하면 덮어써져요",
        hint: "def speak(s):",
        template: "class Animal:\n    def speak(s):\n        print('동물')\n\nclass Cow(Animal):\n    def ___(s):\n        print('음매!')\n\nc = Cow()\nc.speak()",
        answer: "speak",
        expect: "음매!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Animal:
    def __init__(s, name):
        s.name = name

class Dog(Animal):
    def __init__(s, name, breed):
        s.breed = breed  # super 호출 안 함!

d = Dog('뽀삐', '푸들')
print(d.breed)
print(d.name)`,
        predict: {
          question: "출력 결과는?",
          options: ["푸들\\n뽀삐", "푸들\\nNone", "푸들 후 AttributeError", "에러"],
          answer: 2,
          feedback: "super().__init__(name)을 안 했으니 s.name이 저장 안 됨! d.name 접근 시 에러!"
        },
        isError: true,
        result: "푸들\nAttributeError: 'Dog' object has no attribute 'name'"
      }
    },

    { type: "reward", content: { emoji: "🎭", message: "오버라이딩 완성!" } },

    // ============================================
    // Chapter 3: 클래스 변수 vs 인스턴스 변수
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "클래스 변수 vs 인스턴스 변수",
        desc: "모두가 공유 vs 객체마다 따로!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Counter:
    count = 0  # 클래스 변수 (모두 공유)

    def __init__(s):
        Counter.count = Counter.count + 1

a = Counter()
b = Counter()
c = Counter()
print(Counter.count)`,
        predict: {
          question: "출력 결과는?",
          options: ["1", "2", "3", "0"],
          answer: 2,
          feedback: "Counter()를 3번 호출 → count가 3번 증가 → 3!"
        },
        result: "3"
      }
    },

    {
      type: "quiz",
      content: {
        question: "클래스 변수와 인스턴스 변수의 차이는?",
        options: [
          "클래스 변수는 모든 객체가 공유, 인스턴스 변수는 객체마다 따로",
          "클래스 변수는 빠르고 인스턴스 변수는 느려요",
          "차이 없음",
          "인스턴스 변수만 사용 가능"
        ],
        answer: 0,
        explanation: "클래스 변수(class 바로 아래 정의)는 모든 인스턴스가 공유! s.속성은 각 객체별!"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워 총 학생 수를 세요!",
        guide: "Student.total = Student.total + 1",
        hint: "__init__에서 클래스 변수 증가!",
        template: "class Student:\n    total = 0\n\n    def __init__(s, name):\n        s.name = name\n        Student.___ = Student.total + 1\n\na = Student('철수')\nb = Student('영희')\nprint(Student.total)",
        answer: "total",
        expect: "2"
      }
    },

    { type: "reward", content: { emoji: "📊", message: "클래스 변수 완성!" } },

    // ============================================
    // Chapter 4: 종합 — 처음부터 작성
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "종합 — 처음부터 작성",
        desc: "Animal → Dog 전체 구조를 처음부터!"
      }
    },

    {
      type: "interleaving",
      content: {
        message: "잠깐! 리스트와 클래스를 같이 써볼까요. (lesson 16 복습)",
        task: "___ 자리를 채워 학생들을 리스트에 담아요!",
        guide: "리스트에 객체도 담을 수 있어요!",
        hint: "students.append(Student(...))",
        template: "class Student:\n    def __init__(s, name):\n        s.name = name\n\nstudents = []\nstudents.append(Student('철수'))\nstudents.append(Student('영희'))\nprint(students[0].___)\nprint(students[1].name)",
        answer: "name",
        expect: "철수\n영희"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Animal 클래스(name, speak 메서드) 와\nDog(Animal) 자식 클래스를 만들어요.\nDog는 speak를 '멍멍!'으로 오버라이딩.\nd = Dog('뽀삐') 후 d.speak() 실행.",
        guide: "class Dog(Animal): def speak(s): print('멍멍!')",
        hint: "class Animal:\n    def __init__(s, name):\n        s.name = name\n    def speak(s):\n        print('동물 소리')\n\nclass Dog(Animal):\n    def speak(s):\n        print('멍멍!')\n\nd = Dog('뽀삐')\nd.speak()",
        template: null,
        answer: "class Animal:\n    def __init__(s, name):\n        s.name = name\n\n    def speak(s):\n        print('동물 소리')\n\nclass Dog(Animal):\n    def speak(s):\n        print('멍멍!')\n\nd = Dog('뽀삐')\nd.speak()",
        alternateAnswers: [
          "class Animal:\n    def __init__(s,n):\n        s.name=n\n    def speak(s):\n        print('동물')\nclass Dog(Animal):\n    def speak(s):\n        print('멍멍!')\nd=Dog('뽀삐')\nd.speak()"
        ],
        expect: "멍멍!"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Vehicle(name, speed) 부모 클래스와\nCar(Vehicle) 자식 클래스(추가 속성: wheels=4)를 만들어요.\nsuper().__init__()을 사용해서 부모 속성 저장.\nCar('소나타', 200)을 만들어 name, speed, wheels를 출력.",
        guide: "super().__init__(name, speed)로 부모에게 위임!",
        hint: "class Vehicle:\n    def __init__(s, name, speed):\n        s.name = name\n        s.speed = speed\n\nclass Car(Vehicle):\n    def __init__(s, name, speed):\n        super().__init__(name, speed)\n        s.wheels = 4\n\nc = Car('소나타', 200)\nprint(c.name)\nprint(c.speed)\nprint(c.wheels)",
        template: null,
        answer: "class Vehicle:\n    def __init__(s, name, speed):\n        s.name = name\n        s.speed = speed\n\nclass Car(Vehicle):\n    def __init__(s, name, speed):\n        super().__init__(name, speed)\n        s.wheels = 4\n\nc = Car('소나타', 200)\nprint(c.name)\nprint(c.speed)\nprint(c.wheels)",
        alternateAnswers: [
          "class Vehicle:\n    def __init__(s,n,sp):\n        s.name=n\n        s.speed=sp\nclass Car(Vehicle):\n    def __init__(s,n,sp):\n        super().__init__(n,sp)\n        s.wheels=4\nc=Car('소나타',200)\nprint(c.name)\nprint(c.speed)\nprint(c.wheels)"
        ],
        expect: "소나타\n200\n4"
      }
    },

    {
      type: "errorQuiz",
      content: {
        question: "다음 코드의 문제점은?",
        code: `class Animal:
    def __init__(s, name):
        s.name = name

class Dog(Animal):
    def __init__(s, name, breed):
        s.breed = breed

d = Dog('뽀삐', '푸들')
print(d.name)`,
        options: [
          "super().__init__(name)을 호출하지 않아 s.name이 저장 안 됨",
          "class Dog(Animal) 문법이 틀림",
          "d = Dog('뽀삐', '푸들')이 잘못됨",
          "print(d.name) 대신 print(d.breed)를 써야 함"
        ],
        answer: 0,
        explanation: "자식 __init__에서 super().__init__(name)을 호출 안 하면 부모가 정의한 name 속성이 만들어지지 않아요!"
      }
    },

    { type: "reward", content: { emoji: "🏆", message: "Part 7 완전 정복!" } },

    // 요약
    {
      type: "summary",
      content: {
        num: 44,
        title: "Part 7 종합",
        learned: [
          "class 자식(부모): 으로 상속 — 부모 메서드를 자동으로 물려받음",
          "자식이 같은 이름 메서드를 정의하면 오버라이딩 (덮어쓰기)",
          "super().__init__(...)으로 부모 __init__ 호출 — 중복 코드 방지",
          "클래스 변수는 모든 객체가 공유, 인스턴스 변수는 객체마다 따로",
          "Counter.count 처럼 클래스명.변수로 클래스 변수 접근"
        ],
        canDo: "상속과 오버라이딩으로 클래스를 재사용하고 확장할 수 있어요!",
        emoji: "🧬"
      }
    },

    { type: "done", content: {} }
  ]
}
