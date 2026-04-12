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
        lines: [],
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
        lines: [],
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
        en: {
          predict: {
            question: "What's the output?",
            options: ["용사\\n100", "Character\\n100", "Error", "name\\nhp"],
            feedback: "hero.name is '용사', hero.hp is 100!"
          }
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
        lines: [],
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
        lines: [],
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
        en: {
          predict: {
            question: "What's the output?",
            options: ["100", "70", "30", "Error"],
            feedback: "100 - 30 = 70! Attribute values can be changed directly!"
          }
        },
        result: "70"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
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
        en: {
          predict: {
            question: "What's the output?",
            options: ["80 80", "100 80", "80 60", "80 80"],
            feedback: "a and b are separate objects! Only a.hp decreases!"
          }
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
        answer: "Item",
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
        answer: "name",
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
        lines: [],
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
        en: {
          predict: {
            question: "What's the output?",
            options: ["사과", "바나나", "Fruit", "Error"],
            feedback: "The name of the apple object is '사과'!"
          }
        },
        result: "사과"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
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
        en: {
          predict: {
            question: "What's the output?",
            options: ["영희: 2학년", "2: 영희학년", "Student: 2학년", "Error"],
            feedback: "name='영희', grade=2 stored in order!"
          }
        },
        result: "영희: 2학년"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
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
        en: {
          predict: {
            question: "What's the output?",
            options: ["용사", "name", "None", "Error (AttributeError)"],
            feedback: "s.name was never set, so hero has no name attribute!"
          }
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

    // ============================================
    // Chapter 5: 클래스 손에 익히기
    // ============================================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "클래스 손에 익히기",
        desc: "class, __init__, self, 객체 생성 — 눈 감고도 쓸 수 있게!"
      }
    },

    // Drill 1: __init__ 빈칸
    {
      type: "practice",
      content: {
        level: 1,
        task: "Dog 클래스의 __init__을 완성하고 강아지 객체를 만들어요",
        guide: "class ClassName: def __init__(s, ...): s.속성 = 값",
        template: "class Dog:\n    def ___(s, name, age):\n        s.___ = name\n        s.age = age\n\ndog = Dog('뽀삐', 3)\nprint(dog.name)",
        blanksAnswer: ["__init__", "name"],
        answer: "class Dog:\n    def __init__(s, name, age):\n        s.name = name\n        s.age = age\n\ndog = Dog('뽀삐', 3)\nprint(dog.name)",
        expect: "뽀삐",
        en: {
          task: "Complete the Dog class __init__ and create a dog object",
          guide: "class ClassName: def __init__(s, ...): s.attr = value"
        }
      }
    },

    // Drill 2: 여러 속성 접근
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 개의 Car 객체를 만들고 각각의 이름과 연료를 출력해요",
        guide: "Car(브랜드, 연료); obj.속성으로 접근",
        template: "class Car:\n    def __init__(s, brand, fuel):\n        s.brand = brand\n        s.fuel = fuel\n\nc1 = Car('현대', '휘발유')\nc2 = Car('현대', '전기')\nprint(f'{c1.___}: {c1.___}')\nprint(f'{c2.___}: {c2.___}')",
        blanksAnswer: ["brand", "fuel", "brand", "fuel"],
        answer: "class Car:\n    def __init__(s, brand, fuel):\n        s.brand = brand\n        s.fuel = fuel\n\nc1 = Car('현대', '휘발유')\nc2 = Car('현대', '전기')\nprint(f'{c1.brand}: {c1.fuel}')\nprint(f'{c2.brand}: {c2.fuel}')",
        expect: "현대: 휘발유\n현대: 전기",
        en: {
          task: "Create two Car objects and print each one's brand and fuel",
          guide: "Car(brand, fuel); access with obj.attribute"
        }
      }
    },

    // Drill 3: 속성 수정
    {
      type: "practice",
      content: {
        level: 2,
        task: "Player 객체를 만들고 hp를 30 줄인 뒤 현재 hp를 출력해요",
        guide: "obj.속성 = 새 값으로 수정 가능",
        template: "class Player:\n    def __init__(s, name, hp):\n        s.name = name\n        s.hp = hp\n\np = Player('영웅', 100)\np.___ = p.___ - ___\nprint(p.hp)",
        blanksAnswer: ["hp", "hp", "30"],
        answer: "class Player:\n    def __init__(s, name, hp):\n        s.name = name\n        s.hp = hp\n\np = Player('영웅', 100)\np.hp = p.hp - 30\nprint(p.hp)",
        expect: "70",
        en: {
          task: "Create a Player object, reduce hp by 30, and print current hp",
          guide: "obj.attribute = new value to modify"
        }
      }
    },

    // Drill 4: 처음부터 — Circle 클래스
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! 반지름(radius)을 속성으로 가지는 Circle 클래스를 만들고\n반지름 5인 원의 넓이(π×r²)를 출력해요 (π = 3.14)",
        guide: "class Circle: __init__(s, r): s.r = r; c = Circle(5); print(3.14 * c.r ** 2)",
        hint: "class Circle:\n    def __init__(s, radius):\n        s.radius = radius\n\nc = Circle(5)\nprint(3.14 * c.radius ** 2)",
        template: null,
        answer: "class Circle:\n    def __init__(s, radius):\n        s.radius = radius\n\nc = Circle(5)\nprint(3.14 * c.radius ** 2)",
        alternateAnswers: [
          "class Circle:\n    def __init__(s,r):\n        s.radius=r\nc=Circle(5)\nprint(3.14*c.radius**2)"
        ],
        expect: "78.5",
        en: {
          task: "Write from scratch! Create a Circle class with radius attribute\nPrint the area (π×r²) for a circle with radius 5 (π = 3.14)",
          guide: "class Circle: __init__(s, r): s.r = r; c = Circle(5); print(3.14 * c.r ** 2)",
          hint: "class Circle:\n    def __init__(s, radius):\n        s.radius = radius\n\nc = Circle(5)\nprint(3.14 * c.radius ** 2)"
        }
      }
    },

    // Drill 5: 처음부터 — 여러 객체 비교
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! Student 클래스(name, score)를 만들고\ns1(민수, 85), s2(영희, 92)를 생성해 더 높은 점수를 가진 학생 이름을 출력해요",
        guide: "class Student; s1 = Student(...); if s1.score > s2.score: print(s1.name)",
        hint: "class Student:\n    def __init__(s, name, score):\n        s.name = name\n        s.score = score\n\ns1 = Student('민수', 85)\ns2 = Student('영희', 92)\nif s1.score > s2.score:\n    print(s1.name)\nelse:\n    print(s2.name)",
        template: null,
        answer: "class Student:\n    def __init__(s, name, score):\n        s.name = name\n        s.score = score\n\ns1 = Student('민수', 85)\ns2 = Student('영희', 92)\nif s1.score > s2.score:\n    print(s1.name)\nelse:\n    print(s2.name)",
        alternateAnswers: [
          "class Student:\n    def __init__(s,n,sc):\n        s.name=n\n        s.score=sc\ns1=Student('민수',85)\ns2=Student('영희',92)\nprint(s1.name if s1.score>s2.score else s2.name)"
        ],
        expect: "영희",
        en: {
          task: "Write from scratch! Create Student class (name, score)\nCreate s1(Minsu, 85) and s2(Younghee, 92), print the name of the higher scorer",
          guide: "class Student; s1 = Student(...); if s1.score > s2.score: print(s1.name)",
          hint: "class Student:\n    def __init__(s, name, score):\n        s.name = name\n        s.score = score\n\ns1 = Student('민수', 85)\ns2 = Student('영희', 92)\nif s1.score > s2.score:\n    print(s1.name)\nelse:\n    print(s2.name)"
        }
      }
    },

    { type: "done", content: {} }
  ]
}
