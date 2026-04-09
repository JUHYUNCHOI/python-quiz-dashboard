import type { LessonData } from '../types'

export const lesson41: LessonData = {
  id: "41",
  title: "클래스 기초",
  description: "붕어빵 틀처럼 객체를 찍어내자!",
  steps: [
    // ============================================
    // Chapter 1: 왜 클래스가 필요할까?
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "왜 클래스가 필요할까?",
        desc: "변수 30개 vs 클래스 1개!"
      }
    },

    {
      type: "explain",
      content: {
        lines: ["캐릭터 3명을 변수로 만들면...", "변수가 너무 많아! 😩"],
        code: `# 변수로 캐릭터 만들기
char1_name = '용사'
char1_hp = 100
char1_atk = 20

char2_name = '마법사'
char2_hp = 80
char2_atk = 30

# 10명이면 변수가 30개!`,
        isPreview: true,
        note: "클래스를 쓰면 한 줄로 캐릭터 하나!"
      }
    },

    {
      type: "explain",
      content: {
        lines: ["클래스를 쓰면 이렇게 간단해요!"],
        code: `hero = Character('용사', 100, 20)
mage = Character('마법사', 80, 30)
archer = Character('궁수', 90, 25)`,
        note: "클래스 = 붕어빵 틀, 객체 = 붕어빵!"
      }
    },

    {
      type: "quiz",
      content: {
        question: "클래스와 객체의 관계를 붕어빵에 비유하면?",
        options: [
          "클래스 = 붕어빵, 객체 = 틀",
          "클래스 = 붕어빵 틀, 객체 = 붕어빵",
          "클래스 = 가게, 객체 = 손님",
          "클래스 = 속재료, 객체 = 붕어빵"
        ],
        answer: 1,
        explanation: "클래스(틀)로 객체(붕어빵)를 찍어내요! 틀 하나로 여러 개를 만들 수 있어요!",
        en: {
          question: "Using a fish-shaped bread analogy, how is the class-object relationship?",
          options: [
            "class = bread, object = mold",
            "class = bread mold, object = bread",
            "class = shop, object = customer",
            "class = filling, object = bread"
          ],
          explanation: "You use the class (mold) to create objects (bread)! One mold can make many!"
        }
      }
    },

    { type: "reward", content: { emoji: "🍩", message: "붕어빵 틀 개념 이해 완료!" } },

    // ============================================
    // Chapter 2: 클래스 만들기
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "클래스 만들기",
        desc: "class, __init__, s(self)!"
      }
    },

    {
      type: "explain",
      content: {
        lines: ["가장 간단한 클래스부터!"],
        code: `class Character:
    pass  # 아무 기능 없음

hero = Character()
print(type(hero))`,
        result: "<class '__main__.Character'>",
        note: "⚠️ 클래스 이름은 대문자로 시작!"
      }
    },

    {
      type: "explain",
      content: {
        lines: ["빈 붕어빵은 재미없지?", "__init__으로 속을 채우자!"],
        code: `class Character:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp

hero = Character('용사', 100)
print(hero.name)
print(hero.hp)`,
        predict: {
          question: "출력 결과는?",
          options: ["용사\\n100", "Character\\n100", "에러", "name\\nhp"],
          answer: 0,
          feedback: "hero.name은 '용사', hero.hp는 100!"
        },
        result: "용사\n100"
      }
    },

    {
      type: "quiz",
      content: {
        question: "__init__은 언제 실행되나요?",
        options: [
          "프로그램 시작할 때",
          "클래스를 정의할 때",
          "객체를 만들 때 (Character() 호출 시)",
          "print() 할 때"
        ],
        answer: 2,
        explanation: "Character('용사', 100) 이렇게 객체를 만들 때 자동으로 실행돼요!",
        en: {
          question: "When does __init__ run?",
          options: [
            "When the program starts",
            "When the class is defined",
            "When an object is created (when Character() is called)",
            "When print() is called"
          ],
          explanation: "It runs automatically when you create an object like Character('용사', 100)!"
        }
      }
    },

    {
      type: "explain",
      content: {
        lines: ["s(self)가 뭘까? 🤔", "s = 지금 만들어지고 있는 이 객체!"],
        code: `class Character:
    def __init__(s, name):
        s.name = name  # s = 자기 자신

hero = Character('용사')
# hero.name == '용사'
# s와 hero는 같은 객체!`,
        note: "보통 self라고 쓰지만 여기서는 s를 써요!"
      }
    },

    // 빈칸 연습: 클래스 기본 구조
    {
      type: "practice",
      content: {
        level: 1,
        task: "___ 자리를 채우세요!",
        guide: "클래스 정의 기본 구조",
        hint: "클래스를 정의하는 키워드!",
        template: "___ Dog:\n    def __init__(s, name):\n        s.name = name\n\ndog = Dog('멍멍이')\nprint(dog.name)",
        blanksAnswer: ["class"],
        answer: "class Dog:\n    def __init__(s, name):\n        s.name = name\n\ndog = Dog('멍멍이')\nprint(dog.name)",
        en: {
          task: "Fill in the blank!",
          guide: "Basic class definition structure",
          hint: "The keyword used to define a class!"
        },
        alternateAnswers: [],
        expect: "멍멍이"
      }
    },

    {
      type: "practice",
      content: {
        level: 1,
        task: "___ 자리를 채우세요!",
        guide: "초기화 함수 이름은?",
        hint: "두 개의 밑줄로 감싸는 특별한 함수!",
        template: "class Cat:\n    def ___(s, name):\n        s.name = name\n\ncat = Cat('냥이')\nprint(cat.name)",
        blanksAnswer: ["__init__"],
        answer: "class Cat:\n    def __init__(s, name):\n        s.name = name\n\ncat = Cat('냥이')\nprint(cat.name)",
        en: {
          task: "Fill in the blank!",
          guide: "What is the name of the initialization function?",
          hint: "A special function wrapped with two underscores on each side!"
        },
        alternateAnswers: [],
        expect: "냥이"
      }
    },

    { type: "reward", content: { emoji: "🔨", message: "클래스 기본 구조 마스터!" } },

    // ============================================
    // Chapter 3: 여러 객체 만들기
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "여러 객체 만들기",
        desc: "클래스의 진짜 힘!"
      }
    },

    {
      type: "explain",
      content: {
        lines: ["같은 클래스로 여러 객체를 만들어요!"],
        code: `class Character:
    def __init__(s, name, hp, atk):
        s.name = name
        s.hp = hp
        s.atk = atk

hero = Character('용사', 100, 20)
mage = Character('마법사', 80, 35)
print(f'{hero.name}: HP {hero.hp}')
print(f'{mage.name}: HP {mage.hp}')`,
        result: "용사: HP 100\n마법사: HP 80",
        note: "각 객체는 독립적! 서로 영향 없음!"
      }
    },

    {
      type: "explain",
      content: {
        lines: ["객체의 속성은 바꿀 수 있어요!"],
        code: `class Character:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp

hero = Character('용사', 100)
hero.hp = hero.hp - 30
print(hero.hp)`,
        predict: {
          question: "출력 결과는?",
          options: ["100", "70", "30", "에러"],
          answer: 1,
          feedback: "100 - 30 = 70! 속성 값을 직접 바꿀 수 있어요!"
        },
        result: "70"
      }
    },

    {
      type: "explain",
      content: {
        lines: ["그럼 이건 어떨까?", "a의 hp를 바꾸면 b도 바뀔까?"],
        code: `class Character:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp

a = Character('용사', 100)
b = Character('마법사', 80)
a.hp = a.hp - 20
print(a.hp, b.hp)`,
        predict: {
          question: "출력 결과는?",
          options: ["80 80", "100 80", "80 60", "80 80"],
          answer: 0,
          feedback: "a와 b는 서로 다른 객체! a.hp만 줄어들어요!"
        },
        result: "80 80"
      }
    },

    // 빈칸 연습: 여러 객체 만들기
    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채우세요!",
        guide: "Item 클래스로 아이템 만들기",
        hint: "클래스 이름으로 객체를 만들어요!",
        template: "class Item:\n    def __init__(s, name, price):\n        s.name = name\n        s.price = price\n\nsword = ___('검', 500)\nprint(sword.name)",
        blanksAnswer: ["Item"],
        answer: "class Item:\n    def __init__(s, name, price):\n        s.name = name\n        s.price = price\n\nsword = Item('검', 500)\nprint(sword.name)",
        en: {
          task: "Fill in the blank!",
          guide: "Create an item using the Item class",
          hint: "Create an object using the class name!"
        },
        alternateAnswers: [],
        expect: "검"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채우세요!",
        guide: "객체의 속성에 접근하려면?",
        hint: "점(.)으로 속성에 접근!",
        template: "class Pet:\n    def __init__(s, name, age):\n        s.name = name\n        s.age = age\n\ndog = Pet('멍멍이', 3)\nprint(dog.___)",
        blanksAnswer: ["name"],
        answer: "class Pet:\n    def __init__(s, name, age):\n        s.name = name\n        s.age = age\n\ndog = Pet('멍멍이', 3)\nprint(dog.name)",
        en: {
          task: "Fill in the blank!",
          guide: "How do you access an object's attribute?",
          hint: "Access attributes using a dot (.)!"
        },
        alternateAnswers: [],
        expect: "멍멍이"
      }
    },

    { type: "reward", content: { emoji: "👥", message: "여러 객체 만들기 클리어!" } },

    // ============================================
    // Chapter 4: 종합 복습
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "종합 복습",
        desc: "클래스 기초 총정리!"
      }
    },

    // 예측 퀴즈들
    {
      type: "explain",
      content: {
        lines: ["📝 문제 1: 결과를 맞춰보세요!"],
        code: `class Fruit:
    def __init__(s, name):
        s.name = name

apple = Fruit('사과')
banana = Fruit('바나나')
print(apple.name)`,
        predict: {
          question: "출력 결과는?",
          options: ["사과", "바나나", "Fruit", "에러"],
          answer: 0,
          feedback: "apple 객체의 name은 '사과'!"
        },
        result: "사과"
      }
    },

    {
      type: "explain",
      content: {
        lines: ["📝 문제 2: __init__의 매개변수 순서!"],
        code: `class Student:
    def __init__(s, name, grade):
        s.name = name
        s.grade = grade

s1 = Student('영희', 2)
print(f'{s1.name}: {s1.grade}학년')`,
        predict: {
          question: "출력 결과는?",
          options: ["영희: 2학년", "2: 영희학년", "Student: 2학년", "에러"],
          answer: 0,
          feedback: "name='영희', grade=2 순서대로 저장!"
        },
        result: "영희: 2학년"
      }
    },

    {
      type: "explain",
      content: {
        lines: ["📝 문제 3: s를 빼먹으면?"],
        code: `class Character:
    def __init__(s, name):
        name = name  # s.name이 아님!

hero = Character('용사')
print(hero.name)`,
        predict: {
          question: "출력 결과는?",
          options: ["용사", "name", "None", "에러 (AttributeError)"],
          answer: 3,
          feedback: "s.name을 안 했으니 hero에 name 속성이 없어요!"
        },
        isError: true,
        result: "AttributeError: 'Character' object has no attribute 'name'"
      }
    },

    {
      type: "quiz",
      content: {
        question: "다음 중 올바른 클래스 정의는?",
        options: [
          "class character:\n    def __init__(name):",
          "class Character:\n    def __init__(s, name):\n        s.name = name",
          "def Character:\n    def __init__(s, name):",
          "class Character:\n    __init__(s, name):"
        ],
        answer: 1,
        explanation: "class로 시작, __init__에 s(self)가 첫 번째 매개변수, s.으로 속성 저장!",
        en: {
          question: "Which of the following is a correct class definition?",
          options: [
            "class character:\n    def __init__(name):",
            "class Character:\n    def __init__(s, name):\n        s.name = name",
            "def Character:\n    def __init__(s, name):",
            "class Character:\n    __init__(s, name):"
          ],
          explanation: "Start with class, s(self) as first parameter in __init__, store attributes with s.!"
        }
      }
    },

    // 빈칸 연습: 종합
    {
      type: "practice",
      content: {
        level: 3,
        task: "___ 자리 2개를 채우세요!",
        guide: "Monster 클래스 완성하기",
        hint: "s.속성 = 매개변수 형태!",
        template: "class Monster:\n    def __init__(s, name, hp):\n        ___ = name\n        ___ = hp\n\nslime = Monster('슬라임', 30)\nprint(f'{slime.name}: HP {slime.hp}')",
        blanksAnswer: ["s.name", "s.hp"],
        answer: "class Monster:\n    def __init__(s, name, hp):\n        s.name = name\n        s.hp = hp\n\nslime = Monster('슬라임', 30)\nprint(f'{slime.name}: HP {slime.hp}')",
        en: {
          task: "Fill in the 2 blanks!",
          guide: "Complete the Monster class",
          hint: "Use the pattern s.attribute = parameter!"
        },
        alternateAnswers: [],
        expect: "슬라임: HP 30"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "___ 자리 3개를 채우세요!",
        guide: "처음부터 클래스 만들기!",
        hint: "class, __init__, s!",
        template: "___ Book:\n    def ___(s, title, author):\n        ___.title = title\n        s.author = author\n\nb = Book('해리포터', 'J.K.롤링')\nprint(f'{b.title} - {b.author}')",
        blanksAnswer: ["class", "__init__", "s"],
        answer: "class Book:\n    def __init__(s, title, author):\n        s.title = title\n        s.author = author\n\nb = Book('해리포터', 'J.K.롤링')\nprint(f'{b.title} - {b.author}')",
        en: {
          task: "Fill in the 3 blanks!",
          guide: "Build a class from scratch!",
          hint: "class, __init__, s!"
        },
        alternateAnswers: [],
        expect: "해리포터 - J.K.롤링"
      }
    },

    { type: "reward", content: { emoji: "🎉", message: "클래스 기초 완전 정복!" } },

    // 요약
    {
      type: "summary",
      content: {
        num: 38,
        title: "클래스 기초",
        learned: [
          "클래스 = 붕어빵 틀, 객체 = 붕어빵",
          "class 키워드로 클래스를 정의",
          "__init__으로 객체 초기화 (자동 실행)",
          "s(self)는 자기 자신을 가리킴",
          "같은 클래스로 여러 독립적 객체 생성 가능",
          "객체.속성으로 값에 접근"
        ],
        canDo: "클래스를 정의하고 여러 객체를 만들 수 있어요!",
        emoji: "🍩"
      }
    },

    { type: "done", content: {} }
  ]
}
