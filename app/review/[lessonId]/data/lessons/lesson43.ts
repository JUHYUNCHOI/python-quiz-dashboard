import type { LessonData } from '../types'

export const lesson43: LessonData = {
  id: "43",
  title: "Part 7 프로젝트 — 클래스 활용",
  description: "캐릭터, 은행, 도형, 책 클래스를 직접 만들어요!",
  steps: [
    // ============================================
    // Chapter 1: 캐릭터 클래스 (HP/공격)
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "캐릭터 클래스 복습",
        desc: "HP, 공격력, take_damage 메서드!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Character:
    def __init__(s, name, hp, atk):
        s.name = name
        s.hp = hp
        s.atk = atk

    def attack(s, target):
        target.hp = target.hp - s.atk

hero = Character('용사', 100, 20)
slime = Character('슬라임', 50, 5)
hero.attack(slime)
print(slime.hp)`,
        predict: {
          question: "출력 결과는?",
          options: ["50", "30", "20", "5"],
          answer: 1,
          feedback: "slime.hp(50) - hero.atk(20) = 30!"
        },
        result: "30"
      }
    },

    {
      type: "practice",
      content: {
        level: 1,
        task: "___ 자리를 채워 캐릭터를 만들어요!",
        guide: "__init__에서 속성 저장!",
        hint: "s.속성 = 매개변수 형태!",
        template: "class Character:\n    def __init__(s, name, hp):\n        s.name = name\n        ___ = hp\n\nhero = Character('용사', 100)\nprint(hero.hp)",
        answer: "s.hp",
        expect: "100"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채워 take_damage 메서드를 완성해요!",
        guide: "데미지만큼 hp를 줄여요!",
        hint: "s.hp = s.hp - damage",
        template: "class Character:\n    def __init__(s, name, hp):\n        s.name = name\n        s.hp = hp\n\n    def take_damage(s, damage):\n        s.___ = s.hp - ___\n\nhero = Character('용사', 100)\nhero.take_damage(30)\nprint(hero.hp)",
        blanksAnswer: ["hp", "damage"],
        answer: "class Character:\n    def __init__(s, name, hp):\n        s.name = name\n        s.hp = hp\n\n    def take_damage(s, damage):\n        s.hp = s.hp - damage\n\nhero = Character('용사', 100)\nhero.take_damage(30)\nprint(hero.hp)",
        expect: "70"
      }
    },

    {
      type: "quiz",
      content: {
        question: "hero.attack(slime)을 호출하면 attack 메서드의 s와 target은 각각 무엇?",
        options: [
          "s=slime, target=hero",
          "s=hero, target=slime",
          "s와 target 모두 hero",
          "에러"
        ],
        answer: 1,
        explanation: "점(.) 앞의 객체가 s에 들어가고, 괄호의 인자가 target!"
      }
    },

    { type: "reward", content: { emoji: "⚔️", message: "캐릭터 클래스 완성!" } },

    // ============================================
    // Chapter 2: 은행 계좌 클래스
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "은행 계좌 클래스",
        desc: "deposit, withdraw 메서드!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Account:
    def __init__(s, owner, balance):
        s.owner = owner
        s.balance = balance

    def deposit(s, amount):
        s.balance = s.balance + amount

    def withdraw(s, amount):
        s.balance = s.balance - amount

a = Account('철수', 1000)
a.deposit(500)
a.withdraw(300)
print(a.balance)`,
        predict: {
          question: "출력 결과는?",
          options: ["1000", "1200", "1500", "800"],
          answer: 1,
          feedback: "1000 + 500 - 300 = 1200!"
        },
        result: "1200"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채워 deposit/withdraw를 완성해요!",
        guide: "입금은 +, 출금은 -",
        hint: "s.balance = s.balance + amount",
        template: "class Account:\n    def __init__(s, balance):\n        s.balance = balance\n\n    def deposit(s, amount):\n        s.balance = s.balance ___ amount\n\n    def withdraw(s, amount):\n        s.balance = s.balance ___ amount\n\na = Account(100)\na.deposit(50)\na.withdraw(30)\nprint(a.balance)",
        blanksAnswer: ["+", "-"],
        answer: "class Account:\n    def __init__(s, balance):\n        s.balance = balance\n\n    def deposit(s, amount):\n        s.balance = s.balance + amount\n\n    def withdraw(s, amount):\n        s.balance = s.balance - amount\n\na = Account(100)\na.deposit(50)\na.withdraw(30)\nprint(a.balance)",
        expect: "120"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Account:
    def __init__(s, balance):
        s.balance = balance

    def withdraw(s, amount):
        if amount > s.balance:
            print('잔액 부족!')
            return
        s.balance = s.balance - amount

a = Account(100)
a.withdraw(200)
print(a.balance)`,
        predict: {
          question: "출력 결과는?",
          options: ["100", "-100", "잔액 부족!\\n-100", "잔액 부족!\\n100"],
          answer: 3,
          feedback: "200 > 100이라 return으로 빠져나옴! balance 그대로 100!"
        },
        result: "잔액 부족!\n100"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Account 클래스(owner, balance)를 만들고\n계좌를 만들어 200원 입금 후 잔액을 출력해요",
        guide: "class Account; __init__(s, owner, balance); deposit 메서드",
        hint: "class Account:\n    def __init__(s, owner, balance):\n        s.owner = owner\n        s.balance = balance\n\n    def deposit(s, amount):\n        s.balance = s.balance + amount\n\na = Account('철수', 500)\na.deposit(200)\nprint(a.balance)",
        template: null,
        answer: "class Account:\n    def __init__(s, owner, balance):\n        s.owner = owner\n        s.balance = balance\n\n    def deposit(s, amount):\n        s.balance = s.balance + amount\n\na = Account('철수', 500)\na.deposit(200)\nprint(a.balance)",
        alternateAnswers: [
          "class Account:\n    def __init__(s,o,b):\n        s.owner=o\n        s.balance=b\n    def deposit(s,a):\n        s.balance+=a\na=Account('철수',500)\na.deposit(200)\nprint(a.balance)"
        ],
        expect: "700"
      }
    },

    { type: "reward", content: { emoji: "💰", message: "은행 계좌 완성!" } },

    // ============================================
    // Chapter 3: 도형 클래스
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "도형 클래스",
        desc: "넓이/둘레를 메서드로!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Rectangle:
    def __init__(s, w, h):
        s.w = w
        s.h = h

    def area(s):
        return s.w * s.h

r = Rectangle(5, 3)
print(r.area())`,
        result: "15",
        note: "return으로 값을 돌려주고 print로 출력!"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워 둘레(perimeter) 메서드를 완성해요!",
        guide: "사각형 둘레 = (가로 + 세로) × 2",
        hint: "return (s.w + s.h) * 2",
        template: "class Rectangle:\n    def __init__(s, w, h):\n        s.w = w\n        s.h = h\n\n    def perimeter(s):\n        return (s.w + s.h) * ___\n\nr = Rectangle(4, 6)\nprint(r.perimeter())",
        answer: "2",
        expect: "20"
      }
    },

    {
      type: "errorQuiz",
      content: {
        question: "다음 코드의 문제점은?",
        code: `class Rectangle:
    def __init__(s, w, h):
        s.w = w
        s.h = h

    def area(s):
        return w * h

r = Rectangle(5, 3)
print(r.area())`,
        options: [
          "area 메서드 안에서 w, h 대신 s.w, s.h를 써야 해요",
          "__init__이 잘못됐어요",
          "return 대신 print를 써야 해요",
          "r = Rectangle(5, 3)이 잘못됐어요"
        ],
        answer: 0,
        explanation: "메서드 안에서 속성을 쓸 땐 항상 s.속성으로 접근해야 해요! 그냥 w, h를 쓰면 NameError!"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Circle 클래스(radius)를 만들고\nradius=10인 원의 넓이를 출력해요 (π = 3.14)",
        guide: "class Circle; __init__(s, radius); area 메서드는 3.14 * s.radius ** 2 반환",
        hint: "class Circle:\n    def __init__(s, radius):\n        s.radius = radius\n\n    def area(s):\n        return 3.14 * s.radius ** 2\n\nc = Circle(10)\nprint(c.area())",
        template: null,
        answer: "class Circle:\n    def __init__(s, radius):\n        s.radius = radius\n\n    def area(s):\n        return 3.14 * s.radius ** 2\n\nc = Circle(10)\nprint(c.area())",
        alternateAnswers: [
          "class Circle:\n    def __init__(s,r):\n        s.r=r\n    def area(s):\n        return 3.14*s.r**2\nc=Circle(10)\nprint(c.area())"
        ],
        expect: "314.0"
      }
    },

    { type: "reward", content: { emoji: "📐", message: "도형 클래스 완성!" } },

    // ============================================
    // Chapter 4: 책 클래스 — 종합
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "책 클래스 — 종합 프로젝트",
        desc: "여러 속성과 메서드를 한 번에!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `class Book:
    def __init__(s, title, author, pages):
        s.title = title
        s.author = author
        s.pages = pages
        s.read = 0

    def read_pages(s, n):
        s.read = s.read + n

    def progress(s):
        return s.read / s.pages * 100

b = Book('해리포터', 'JK롤링', 200)
b.read_pages(50)
print(b.progress())`,
        predict: {
          question: "출력 결과는?",
          options: ["50.0", "25.0", "200", "50"],
          answer: 1,
          feedback: "50 / 200 * 100 = 25.0%!"
        },
        result: "25.0"
      }
    },

    {
      type: "interleaving",
      content: {
        message: "잠깐! 클래스 안에 f-string도 쓸 수 있어요. (lesson 8 복습)",
        task: "___ 자리를 채워 책 정보를 출력해요!",
        guide: "f-string과 객체 속성 조합!",
        hint: "f'{b.title} ({b.author})'",
        template: "class Book:\n    def __init__(s, title, author):\n        s.title = title\n        s.author = author\n\nb = Book('파이썬', '김작가')\nprint(f'{b.title} ({b.___})')",
        answer: "author",
        expect: "파이썬 (김작가)"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "___ 자리 3개를 채워 Book 클래스를 완성해요!",
        guide: "title, pages 속성 + summary 메서드",
        hint: "s.title, s.pages, f-string으로 한 줄 요약!",
        template: "class Book:\n    def ___(s, title, pages):\n        s.title = title\n        s.___ = pages\n\n    def summary(s):\n        return f'{s.title} - {s.pages}쪽'\n\nb = Book('파이썬 입문', 300)\nprint(b.___())",
        blanksAnswer: ["__init__", "pages", "summary"],
        answer: "class Book:\n    def __init__(s, title, pages):\n        s.title = title\n        s.pages = pages\n\n    def summary(s):\n        return f'{s.title} - {s.pages}쪽'\n\nb = Book('파이썬 입문', 300)\nprint(b.summary())",
        expect: "파이썬 입문 - 300쪽"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Student 클래스(name, scores 리스트)를 만들고\nadd_score(점수 추가), average(평균 반환) 메서드를 만들어요.\n학생 '민수'에 80, 90, 100을 추가하고 평균을 출력해요.",
        guide: "scores는 빈 리스트로 시작! append로 추가, sum/len으로 평균!",
        hint: "class Student:\n    def __init__(s, name):\n        s.name = name\n        s.scores = []\n    def add_score(s, score):\n        s.scores.append(score)\n    def average(s):\n        return sum(s.scores) / len(s.scores)\n\ns = Student('민수')\ns.add_score(80)\ns.add_score(90)\ns.add_score(100)\nprint(s.average())",
        template: null,
        answer: "class Student:\n    def __init__(s, name):\n        s.name = name\n        s.scores = []\n\n    def add_score(s, score):\n        s.scores.append(score)\n\n    def average(s):\n        return sum(s.scores) / len(s.scores)\n\ns = Student('민수')\ns.add_score(80)\ns.add_score(90)\ns.add_score(100)\nprint(s.average())",
        expect: "90.0"
      }
    },

    {
      type: "quiz",
      content: {
        question: "여러 객체를 만들 때 각 객체의 속성은?",
        options: [
          "모든 객체가 같은 값을 공유해요",
          "각 객체가 독립적인 값을 가져요",
          "클래스에서 정한 값만 쓸 수 있어요",
          "한 객체만 만들 수 있어요"
        ],
        answer: 1,
        explanation: "Student('민수')와 Student('영희')는 각각 다른 name, scores를 가져요!"
      }
    },

    { type: "reward", content: { emoji: "🎉", message: "Part 7 프로젝트 완성!" } },

    // 요약
    {
      type: "summary",
      content: {
        num: 43,
        title: "Part 7 프로젝트",
        learned: [
          "클래스로 게임 캐릭터, 은행 계좌, 도형, 책 등을 모델링",
          "__init__에서 속성 초기화, 메서드로 행동 정의",
          "메서드 안에서는 항상 s.속성으로 접근",
          "return으로 계산 결과를 돌려주고, 메서드끼리 협력",
          "여러 객체가 독립적으로 동작"
        ],
        canDo: "현실 세계의 사물을 클래스로 표현하고 메서드로 행동을 추가할 수 있어요!",
        emoji: "🏗️"
      }
    },

    { type: "done", content: {} }
  ]
}
