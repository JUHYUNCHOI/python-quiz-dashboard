import { LessonData } from '../types';

export const lesson42: LessonData = {
  id: "42",
  title: "메서드와 속성 복습",
  description: "클래스에 행동을 추가해봐!",
  steps: [
    // ==================== CHAPTER 1: 메서드 기초 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "메서드 = 클래스 안의 함수",
        desc: "객체에 행동을 추가하는 방법!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["메서드는 클래스 안에 def 로 만들어!"],
        code: `class Character:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp

    def say_hello(s):
        print(f'안녕! 나는 {s.name}!')

hero = Character('용사', 100)
hero.say_hello()`,
        result: "안녕! 나는 용사!",
        note: "메서드의 첫 매개변수는 항상 s(self) — '나 자신'을 가리켜!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "메서드를 만들 때 꼭 지켜야 하는 규칙은?",
        options: [
          "메서드 이름은 대문자로 시작",
          "첫 매개변수는 항상 s(self)",
          "반드시 return 이 있어야 함",
          "클래스 밖에 써야 함"
        ],
        answer: 1,
        explanation: "메서드의 첫 매개변수는 항상 s(self)! 인스턴스 자신을 가리켜요."
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `class Dog:
    def __init__(s, name):
        s.name = name

    def bark(s):
        print(f'{s.name}: 멍멍!')

d = Dog('초코')
d.bark()`,
        predict: {
          options: ["멍멍!", "초코: 멍멍!", "Dog: 멍멍!", "에러"],
          answer: 1,
          feedback: "s 는 d 자신! s.name 은 '초코'. → '초코: 멍멍!'"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "Character 의 say_hello 메서드를 호출하세요",
        guide: "객체.메서드() 로 호출!",
        hint: "hero.say_hello()",
        template: `class Character:
    def __init__(s, name):
        s.name = name

    def say_hello(s):
        print(f'안녕! 나는 {s.name}!')

hero = Character('용사')
hero.___()`,
        answer: "say_hello",
        expect: "안녕! 나는 용사!"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "introduce 메서드를 호출해서 이름과 직업을 출력하세요",
        guide: "매개변수로 직업을 넘겨주기!",
        hint: "hero.introduce('전사')",
        template: `class Character:
    def __init__(s, name):
        s.name = name

    def introduce(s, job):
        print(f'{s.name}, 직업: {job}')

hero = Character('용사')
hero.introduce(___)`,
        answer: "'전사'",
        alternateAnswers: ['"전사"'],
        expect: "용사, 직업: 전사"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "메서드 기초",
        learned: [
          "메서드 = 클래스 안의 함수",
          "첫 매개변수는 항상 s(self)",
          "객체.메서드() 로 호출",
          "매개변수도 함수처럼 추가 가능"
        ],
        canDo: "클래스에 행동을 추가할 수 있어!",
        emoji: "🗣️"
      }
    },

    // ==================== CHAPTER 2: 속성 변경하는 메서드 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "속성을 바꾸는 메서드",
        desc: "공격, 회복 — s.속성 = 새 값!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 __init__ 복습!",
        task: "__init__ 의 첫 매개변수는?",
        template: `class Cat:
    def __init__(___, name):
        s.name = name

c = Cat('나비')
print(c.name)`,
        answer: "s",
        expect: "나비"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["메서드 안에서 s.속성 = 값 으로 객체 상태를 바꾼다!"],
        code: `class Character:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp

    def heal(s, amount):
        s.hp = s.hp + amount
        print(f'{s.name} 회복! HP {s.hp}')

hero = Character('용사', 80)
hero.heal(20)`,
        result: "용사 회복! HP 100",
        note: "s.hp = s.hp + amount → 객체 자신의 hp를 직접 수정!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `class Counter:
    def __init__(s):
        s.value = 0

    def bump(s):
        s.value = s.value + 1

c = Counter()
c.bump()
c.bump()
c.bump()
print(c.value)`,
        predict: {
          options: ["0", "1", "3", "에러"],
          answer: 2,
          feedback: "bump 를 3번 호출 → value 가 0 → 1 → 2 → 3!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "level_up 메서드를 만들어 레벨을 1씩 올리세요",
        guide: "s.level = s.level + 1 패턴!",
        hint: "메서드 안에서 s.level = s.level + 1",
        template: `class Character:
    def __init__(s, name):
        s.name = name
        s.level = 1

    def level_up(s):
        s.___ = s.level + 1

hero = Character('용사')
hero.level_up()
hero.level_up()
print(hero.level)`,
        answer: "level",
        expect: "3"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["다른 객체를 매개변수로 받아 그 객체를 수정할 수도 있어!"],
        code: `class Character:
    def __init__(s, name, hp, atk):
        s.name = name
        s.hp = hp
        s.atk = atk

    def attack(s, target):
        target.hp = target.hp - s.atk
        print(f'{target.name} HP: {target.hp}')

hero = Character('용사', 100, 25)
slime = Character('슬라임', 50, 5)
hero.attack(slime)`,
        result: "슬라임 HP: 25",
        note: "target 도 객체라서 target.속성 으로 접근 가능!"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "attack 메서드 안에서 target 의 hp를 s.atk 만큼 깎으세요",
        guide: "target.hp = target.hp - s.atk!",
        hint: "target.hp 에서 s.atk 를 빼서 다시 target.hp 에 저장",
        template: `class Character:
    def __init__(s, name, hp, atk):
        s.name = name
        s.hp = hp
        s.atk = atk

    def attack(s, target):
        target.hp = target.hp - s.___
        print(f'{target.name} HP: {target.hp}')

hero = Character('용사', 100, 30)
slime = Character('슬라임', 50, 5)
hero.attack(slime)`,
        answer: "atk",
        expect: "슬라임 HP: 20"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제는?",
        code: `class Cat:
    def __init__(name):
        s.name = name

c = Cat('나비')`,
        options: [
          "__init__ 의 첫 매개변수에 s(self)가 빠짐",
          "Cat 클래스 이름이 틀림",
          "name 변수가 정의되지 않음",
          "문제 없음"
        ],
        answer: 0,
        explanation: "메서드의 첫 매개변수는 항상 s(self)! def __init__(s, name): 처럼 작성해야 해요."
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "속성 변경 메서드",
        learned: [
          "s.속성 = 새 값 으로 객체 상태 변경",
          "여러 번 호출하면 상태가 누적",
          "target 같은 다른 객체도 매개변수로 받아 수정"
        ],
        canDo: "메서드로 객체의 상태를 자유롭게 바꿀 수 있어!",
        emoji: "⚔️"
      }
    },

    // ==================== CHAPTER 3: 인스턴스 vs 클래스 변수 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "인스턴스 변수 vs 클래스 변수",
        desc: "각자 vs 공유 — 어디에 둘까?"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["인스턴스 변수는 각자 다른 값, 클래스 변수는 모두 공유!"],
        code: `class Character:
    game_title = 'RPG'  # 클래스 변수 (공유!)

    def __init__(s, name, hp):
        s.name = name   # 인스턴스 변수 (각자!)
        s.hp = hp

hero = Character('용사', 100)
mage = Character('마법사', 80)
print(hero.name, mage.name)
print(Character.game_title)`,
        result: "용사 마법사\nRPG",
        note: "클래스 변수는 클래스 안 + 메서드 밖! 인스턴스 변수는 __init__ 안의 s.xxx!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 중 클래스 변수에 대한 설명으로 옳은 것은?",
        options: [
          "각 객체마다 다른 값을 가진다",
          "s.xxx 형태로 선언한다",
          "모든 객체가 같은 값을 공유한다",
          "__init__ 안에서만 만들 수 있다"
        ],
        answer: 2,
        explanation: "클래스 변수는 모든 객체가 공유! 클래스 안, 메서드 밖에 선언."
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `class Pet:
    count = 0

    def __init__(s, name):
        s.name = name
        Pet.count = Pet.count + 1

a = Pet('멍멍이')
b = Pet('냥냥이')
c = Pet('짹짹이')
print(Pet.count)`,
        predict: {
          options: ["1", "2", "3", "0"],
          answer: 2,
          feedback: "Pet.count 는 클래스 변수 (공유). 3마리 만들면 3!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "클래스 변수 member_count 를 1씩 증가시키세요",
        guide: "TeamMember.member_count = TeamMember.member_count + 1",
        hint: "클래스 변수는 클래스이름.변수명 으로 접근!",
        template: `class TeamMember:
    member_count = 0

    def __init__(s, name):
        s.name = name
        TeamMember.member_count = TeamMember.___ + 1

m1 = TeamMember('A')
m2 = TeamMember('B')
m3 = TeamMember('C')
print(TeamMember.member_count)`,
        answer: "member_count",
        expect: "3"
      }
    },
    {
      type: "quiz",
      content: {
        question: "각 캐릭터마다 다른 hp 값을 저장하려면 어떤 변수?",
        options: [
          "클래스 변수 (메서드 밖)",
          "인스턴스 변수 (s.hp)",
          "전역 변수",
          "지역 변수"
        ],
        answer: 1,
        explanation: "각자 다른 값 = 인스턴스 변수! __init__ 안에서 s.hp 로 만들어요."
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "변수 종류 구분",
        learned: [
          "인스턴스 변수(s.xxx): 각자 다른 값",
          "클래스 변수(Class.xxx): 모두 공유",
          "공유 카운터/제목은 클래스 변수로!"
        ],
        canDo: "어디에 어떤 변수를 둘지 판단할 수 있어!",
        emoji: "🔀"
      }
    },

    // ==================== CHAPTER 4: 종합 도전 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "종합 도전",
        desc: "클래스 + 메서드 + 속성 한 번에!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 메서드 호출 복습!",
        task: "hero 의 show 메서드를 호출하세요",
        template: `class Character:
    def __init__(s, name):
        s.name = name

    def show(s):
        print(s.name)

hero = Character('용사')
hero.___()`,
        answer: "show",
        expect: "용사"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `class Character:
    def __init__(s, name, hp):
        s.name = name
        s.hp = hp

    def heal(s, amount):
        s.hp = s.hp + amount

hero = Character('용사', 50)
hero.heal(20)
hero.heal(15)
print(hero.hp)`,
        predict: {
          options: ["50", "70", "85", "35"],
          answer: 2,
          feedback: "50 + 20 = 70, 70 + 15 = 85!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "BankAccount 클래스의 deposit/withdraw 메서드 빈칸을 채우세요",
        guide: "deposit 은 +, withdraw 는 -. 잔액 부족이면 출력!",
        hint: "balance += amount / if balance >= amount: balance -= amount",
        template: `class BankAccount:
    def __init__(s, owner, balance):
        s.owner = owner
        s.balance = balance

    def deposit(s, amount):
        s.balance = s.balance ___ amount

    def withdraw(s, amount):
        if s.balance ___ amount:
            s.balance = s.balance - amount

a = BankAccount('철수', 10000)
a.deposit(5000)
a.withdraw(3000)
print(a.balance)`,
        blanksAnswer: ["+", ">="],
        answer: `class BankAccount:
    def __init__(s, owner, balance):
        s.owner = owner
        s.balance = balance

    def deposit(s, amount):
        s.balance = s.balance + amount

    def withdraw(s, amount):
        if s.balance >= amount:
            s.balance = s.balance - amount

a = BankAccount('철수', 10000)
a.deposit(5000)
a.withdraw(3000)
print(a.balance)`,
        expect: "12000"
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "Counter 클래스를 만들어 bump() 3번 후 값을 출력하세요",
        guide: "__init__ 에서 value=0, bump 에서 +1!",
        hint: "class Counter: def __init__(s): s.value = 0 ...",
        template: null,
        answer: `class Counter:
    def __init__(s):
        s.value = 0

    def bump(s):
        s.value = s.value + 1

c = Counter()
c.bump()
c.bump()
c.bump()
print(c.value)`,
        alternateAnswers: [
          `class Counter:
    def __init__(s):
        s.value = 0
    def bump(s):
        s.value += 1

c = Counter()
c.bump()
c.bump()
c.bump()
print(c.value)`
        ],
        expect: "3"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제는?",
        code: `class Dog:
    def bark():
        print('멍멍')

d = Dog()
d.bark()`,
        options: [
          "bark 메서드에 s(self) 매개변수가 빠짐",
          "class Dog 이 잘못됨",
          "d = Dog() 에서 인자가 없음",
          "문제 없음"
        ],
        answer: 0,
        explanation: "메서드의 첫 매개변수는 항상 s! def bark(s): 처럼 작성해야 d.bark() 호출 시 에러가 안 나요."
      }
    },
    {
      type: "reward",
      content: {
        emoji: "🏆",
        message: "메서드와 속성 마스터!"
      }
    },
    {
      type: "summary",
      content: {
        num: 4,
        title: "종합 정리",
        learned: [
          "메서드 = 클래스 안의 함수",
          "첫 매개변수는 항상 s(self)",
          "s.속성 = 값 으로 상태 변경",
          "다른 객체를 매개변수로 받아 수정 가능",
          "인스턴스 변수(각자) vs 클래스 변수(공유)"
        ],
        canDo: "클래스에 행동과 상태를 자유롭게 추가할 수 있어!",
        emoji: "🎓"
      }
    },

    { type: "done", content: {} }
  ]
};
