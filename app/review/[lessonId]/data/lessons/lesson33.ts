import type { LessonData } from '../types'

export const lesson33: LessonData = {
  id: "33",
  title: "매개변수와 반환값",
  description: "함수에 값을 주고, 결과를 받아요!",
  steps: [
    // ============================================
    // Chapter 1: 기본값 복습
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "기본값이 뭐였지?",
        desc: "매개변수의 기본값을 복습해요!"
      }
    },
    
    // 비유로 설명 (수업과 일치)
    {
      type: "explain",
      content: {
        lines: ["☕ 카페 주문을 생각해봐요!"],
        code: `# 사이즈 안 말하면? → 기본 '중' 사이즈!
# 사이즈 말하면? → 말한 사이즈!

def 주문(음료, 사이즈='중'):
    print(f'{사이즈} {음료} 주문!')

주문('아메리카노')        # 사이즈 안 줌 → 기본값!
주문('라떼', '대')        # 사이즈 줌 → 그 값!`,
        result: "중 아메리카노 주문!\n대 라떼 주문!",
        note: "안 주면 기본값, 주면 그 값!"
      }
    },
    
    // 예측 퀴즈: 기본값
    {
      type: "explain",
      content: {
        lines: ["🧠 기본값 예측해보기!"],
        code: `def 인사(이름, 메시지='안녕'):
    print(f'{메시지}, {이름}!')

인사('철수')`,
        predict: {
          question: "출력 결과는?",
          options: ["철수, 안녕!", "안녕, 철수!", "에러 발생", "메시지, 이름!"],
          answer: 1,
          feedback: "메시지 안 줬으니 기본값 '안녕' 사용!"
        },
        result: "안녕, 철수!"
      }
    },
    
    // 퀴즈: 기본값 순서
    {
      type: "quiz",
      content: {
        question: "다음 중 올바른 함수 정의는?",
        options: [
          "def f(a=1, b): ...",
          "def f(a, b=1): ...",
          "def f(=1, b): ...",
          "def f(a, =1): ..."
        ],
        answer: 1,
        explanation: "기본값이 있는 매개변수는 뒤에! 앞에 오면 에러나요 🚨",
        en: {
          question: "Which of the following is a valid function definition?",
          options: [
            "def f(a=1, b): ...",
            "def f(a, b=1): ...",
            "def f(=1, b): ...",
            "def f(a, =1): ..."
          ],
          explanation: "Parameters with default values must come last! Putting them first causes an error 🚨"
        }
      }
    },
    
    // ⭐ 연습 1: 기본값 활용
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "기본 할인율 10%를 적용하는 discount 함수를 완성하세요!",
        guide: "def discount(price, rate=10): 으로 시작!",
        hint: "할인된 가격 = price * (100 - rate) / 100",
        template: null,
        answer: "def discount(price, rate=10):\n    return price * (100 - rate) / 100\n\nprint(discount(10000))\nprint(discount(10000, 20))",
        en: {
          task: "Complete the discount function with a default discount rate of 10%!",
          guide: "Start with def discount(price, rate=10):!",
          hint: "Discounted price = price * (100 - rate) / 100"
        },
        alternateAnswers: [
          "def discount(price, rate=10):\n    return price * (100 - rate) / 100\nprint(discount(10000))\nprint(discount(10000, 20))"
        ],
        expect: "9000.0\n8000.0"
      }
    },
    
    // 추가 연습: 기본값
    {
      type: "practice",
      content: {
        level: 2,
        task: "거듭제곱(기본 지수=2)을 반환하는 power 함수를 만드세요!",
        guide: "def power(n, exp=2): 으로 시작! ** 연산자 사용",
        hint: "n ** exp 가 n의 exp 거듭제곱이에요!",
        template: null,
        answer: "def power(n, exp=2):\n    return n ** exp\n\nprint(power(3))\nprint(power(2, 10))",
        en: {
          task: "Create a power function that returns exponentiation (default exponent=2)!",
          guide: "Start with def power(n, exp=2):! Use the ** operator",
          hint: "n ** exp is n to the power of exp!"
        },
        alternateAnswers: [
          "def power(n, exp=2):\n    return n ** exp\nprint(power(3))\nprint(power(2, 10))"
        ],
        expect: "9\n1024"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "⚙️",
        message: "기본값 마스터!"
      }
    },
    
    // ============================================
    // Chapter 2: 여러 값 반환
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "여러 값 반환하기",
        desc: "함수가 여러 값을 돌려줘요!"
      }
    },
    
    // 비유로 설명 (수업과 일치)
    {
      type: "explain",
      content: {
        lines: ["📦 택배 상자에서 물건 2개 꺼내기!"],
        code: `def 나누기(숫자, 나누는수):
    몫 = 숫자 // 나누는수
    나머지 = 숫자 % 나누는수
    return 몫, 나머지   # 2개 반환!

몫, 나머지 = 나누기(17, 5)   # 2개 받기!
print(f'몫: {몫}, 나머지: {나머지}')`,
        result: "몫: 3, 나머지: 2",
        note: "return 값1, 값2 → 변수1, 변수2 = 함수()"
      }
    },
    
    // 예측 퀴즈: 여러 값 반환
    {
      type: "explain",
      content: {
        lines: ["🧠 합과 차 예측!"],
        code: `def 계산(a, b):
    return a + b, a - b

합, 차 = 계산(10, 3)
print(합, 차)`,
        predict: {
          question: "출력 결과는?",
          options: ["13, 7", "13 7", "(13, 7)", "7 13"],
          answer: 1,
          feedback: "10+3=13, 10-3=7! 공백으로 출력됨"
        },
        result: "13 7"
      }
    },
    
    // ⭐ 연습 2: 여러 값 반환
    {
      type: "practice",
      content: {
        level: 2,
        task: "리스트의 최대값과 최소값을 반환하는 최대최소 함수를 만드세요!",
        guide: "max()는 최대값, min()은 최소값!",
        hint: "return max(숫자들), min(숫자들)",
        template: null,
        answer: "def 최대최소(숫자들):\n    return max(숫자들), min(숫자들)\n\n최대, 최소 = 최대최소([3, 7, 1, 9, 4])\nprint(f'최대: {최대}, 최소: {최소}')",
        en: {
          task: "Create a function that returns both the maximum and minimum values of a list!",
          guide: "max() for maximum, min() for minimum!",
          hint: "return max(numbers), min(numbers)"
        },
        alternateAnswers: [
          "def 최대최소(숫자들):\n    return max(숫자들), min(숫자들)\n최대, 최소 = 최대최소([3, 7, 1, 9, 4])\nprint(f'최대: {최대}, 최소: {최소}')"
        ],
        expect: "최대: 9, 최소: 1"
      }
    },
    
    // 추가 연습: 통계 함수
    {
      type: "practice",
      content: {
        level: 2.5,
        task: "합계와 평균을 한 번에 반환하는 통계 함수를 만드세요!",
        guide: "sum()으로 합계, len()으로 개수!",
        hint: "평균 = 합계 / len(숫자들)",
        template: null,
        answer: "def 통계(숫자들):\n    합계 = sum(숫자들)\n    평균 = 합계 / len(숫자들)\n    return 합계, 평균\n\n합계, 평균 = 통계([10, 20, 30])\nprint(f'합계: {합계}, 평균: {평균}')",
        en: {
          task: "Create a statistics function that returns both total and average at once!",
          guide: "Use sum() for total, len() for count!",
          hint: "average = total / len(numbers)"
        },
        alternateAnswers: [
          "def 통계(숫자들):\n    합계 = sum(숫자들)\n    평균 = 합계 / len(숫자들)\n    return 합계, 평균\n합계, 평균 = 통계([10, 20, 30])\nprint(f'합계: {합계}, 평균: {평균}')"
        ],
        expect: "합계: 60, 평균: 20.0"
      }
    },
    
    // 인터리빙: 기본값 복습
    {
      type: "interleaving",
      content: {
        message: "🔄 잠깐! 기본값 기억나요?",
        task: "인사말(기본='Hello')과 이름을 받아 출력하는 greet 함수를 만드세요!",
        hint: "기본값이 있는 건 뒤에! name 먼저, msg='Hello' 나중에",
        template: null,
        answer: "def greet(name, msg='Hello'):\n    print(f'{msg}, {name}!')\n\ngreet('철수')\ngreet('영희', 'Hi')",
        en: {
          message: "🔄 Quick check! Remember default values?",
          task: "Create a greet function that takes a name and greeting message (default='Hello')!",
          hint: "Parameter with default value goes last! name first, msg='Hello' second"
        },
        alternateAnswers: [
          "def greet(name, msg='Hello'):\n    print(f'{msg}, {name}!')\ngreet('철수')\ngreet('영희', 'Hi')"
        ],
        expect: "Hello, 철수!\nHi, 영희!"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "📤",
        message: "다중 반환 성공!"
      }
    },
    
    // ============================================
    // Chapter 3: 키워드 인자
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "키워드 인자",
        desc: "이름표 붙여서 전달해요!"
      }
    },
    
    // 비유로 설명 (수업과 일치)
    {
      type: "explain",
      content: {
        lines: ["🏷️ 이름표 붙이면 순서 상관없어요!"],
        code: `def 소개(이름, 나이, 학교):
    print(f'{이름}, {나이}살, {학교}')

# 순서대로 (위치 인자)
소개('철수', 15, '파이썬중')

# 이름표 붙여서 (키워드 인자) - 순서 달라도 OK!
소개(학교='코딩고', 이름='영희', 나이=17)`,
        result: "철수, 15살, 파이썬중\n영희, 17살, 코딩고",
        note: "이름표(=) 붙이면 순서 상관없이 전달!"
      }
    },
    
    // 예측 퀴즈
    {
      type: "explain",
      content: {
        lines: ["🧠 키워드 인자 예측!"],
        code: `def greet(name, msg='안녕'):
    print(f'{msg}, {name}!')

greet(msg='반가워', name='민수')`,
        predict: {
          question: "출력 결과는?",
          options: ["안녕, 민수!", "반가워, 민수!", "민수, 반가워!", "에러"],
          answer: 1,
          feedback: "이름표 붙였으니 순서 달라도 OK!"
        },
        result: "반가워, 민수!"
      }
    },
    
    // ⭐ 연습: 키워드 인자
    {
      type: "practice",
      content: {
        level: 2,
        task: "배달(메뉴, 수량, 주소) 함수를 키워드 인자로 호출하세요!",
        guide: "순서를 바꿔서 호출해보세요!",
        hint: "배달(주소='학교', 메뉴='치킨', 수량=1) 처럼!",
        template: null,
        answer: "def 배달(메뉴, 수량, 주소):\n    print(f'{메뉴} {수량}개를 {주소}로!')\n\n배달(주소='학교', 메뉴='치킨', 수량=1)",
        en: {
          task: "Call the 배달(메뉴, 수량, 주소) function using keyword arguments!",
          guide: "Try calling with a different order!",
          hint: "Like 배달(주소='학교', 메뉴='치킨', 수량=1)!"
        },
        alternateAnswers: [
          "def 배달(메뉴, 수량, 주소):\n    print(f'{메뉴} {수량}개를 {주소}로!')\n배달(주소='학교', 메뉴='치킨', 수량=1)",
          "def 배달(메뉴, 수량, 주소):\n    print(f'{메뉴} {수량}개를 {주소}로!')\n\n배달(수량=1, 주소='학교', 메뉴='치킨')",
          "def 배달(메뉴, 수량, 주소):\n    print(f'{메뉴} {수량}개를 {주소}로!')\n\n배달(메뉴='치킨', 주소='학교', 수량=1)"
        ],
        expect: "치킨 1개를 학교로!"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "🏷️",
        message: "키워드 인자 이해 완료!"
      }
    },
    
    // ============================================
    // Chapter 4: 에러 탐정
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "에러 탐정",
        desc: "자주 하는 실수를 찾아요!"
      }
    },
    
    // 에러 퀴즈 1: 기본값 순서
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `def greet(msg='안녕', name):
    print(f'{msg}, {name}!')`,
        options: [
          "함수 이름이 잘못됨",
          "기본값이 있는 매개변수가 앞에 있음",
          "print 문법 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "기본값 있는 건 뒤로! def greet(name, msg='안녕'):이 맞아요!"
      }
    },
    
    // 에러 퀴즈 2: return 값 저장 안 함
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `def add(a, b):
    return a + b

add(3, 5)
print(결과)`,
        options: [
          "함수 정의 오류",
          "return 오류",
          "반환값을 변수에 저장 안 함",
          "print 오류"
        ],
        answer: 2,
        explanation: "결과 = add(3, 5) 처럼 저장해야 써요!"
      }
    },
    
    // 에러 퀴즈 3: 여러 값 받기 실수
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `def calc(a, b):
    return a + b, a - b

result = calc(10, 3)
print(합, 차)`,
        options: [
          "return 오류",
          "하나로 받았는데 두 변수 사용",
          "함수 정의 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "합, 차 = calc(10, 3) 으로 각각 받아야 해요!"
      }
    },
    
    // 에러 퀴즈 4: 기본값 문법 오류
    {
      type: "errorQuiz",
      content: {
        question: "기본값을 설정하는 올바른 문법은?",
        code: `def 주문(음료, 사이즈___):
    print(f'{사이즈} {음료} 주문!')`,
        options: [
          ":'중'",
          "=='중'",
          "='중'",
          "->중"
        ],
        answer: 2,
        explanation: "기본값은 = 뒤에 써요! 사이즈='중'"
      }
    },
    
    // ============================================
    // Chapter 5: 종합 문제
    // ============================================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "종합 문제",
        desc: "오늘 배운 걸 모두 활용해요!"
      }
    },
    
    // 종합 문제 1
    {
      type: "practice",
      content: {
        level: 3,
        task: "사칙연산 결과 4개를 한 번에 반환하는 calc 함수를 만드세요!",
        guide: "return 합, 차, 곱, 몫",
        hint: "a+b, a-b, a*b, a//b 를 쉼표로!",
        template: null,
        answer: "def calc(a, b):\n    return a + b, a - b, a * b, a // b\n\n합, 차, 곱, 몫 = calc(10, 3)\nprint(f'합:{합} 차:{차} 곱:{곱} 몫:{몫}')",
        en: {
          task: "Create a calc function that returns all 4 arithmetic results at once!",
          guide: "return sum, difference, product, quotient",
          hint: "a+b, a-b, a*b, a//b separated by commas!"
        },
        alternateAnswers: [
          "def calc(a, b):\n    return a + b, a - b, a * b, a // b\n합, 차, 곱, 몫 = calc(10, 3)\nprint(f'합:{합} 차:{차} 곱:{곱} 몫:{몫}')"
        ],
        expect: "합:13 차:7 곱:30 몫:3"
      }
    },
    
    // 종합 문제 2
    {
      type: "practice",
      content: {
        level: 3,
        task: "안전한 나누기 함수: 0으로 나누면 '나눌 수 없어요!' 반환!",
        guide: "if b == 0: 으로 체크!",
        hint: "if b == 0:\n    return '나눌 수 없어요!'\nreturn a / b",
        template: null,
        answer: "def safe_divide(a, b):\n    if b == 0:\n        return '나눌 수 없어요!'\n    return a / b\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))",
        alternateAnswers: [
          "def safe_divide(a, b):\n    if b == 0:\n        return '나눌 수 없어요!'\n    return a / b\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))"
        ],
        expect: "5.0\n나눌 수 없어요!"
      }
    },
    
    // ============================================
    // Chapter 6: 마무리
    // ============================================
    {
      type: "chapter",
      content: {
        num: 6,
        title: "마무리",
        desc: "오늘 배운 걸 정리해요!"
      }
    },
    
    // 요약
    {
      type: "summary",
      content: {
        num: 1,
        title: "매개변수와 반환값",
        emoji: "📦",
        learned: [
          "기본값: def f(a, b=10) → b 생략하면 10!",
          "기본값 순서: 없는 게 앞, 있는 게 뒤!",
          "여러 반환: return a, b → x, y = f()",
          "키워드 인자: f(name='철수') 순서 무관!"
        ],
        canDo: "함수에 값을 주고, 여러 결과를 받을 수 있어요!"
      }
    },
    
    // 완료
    {
      type: "done",
      content: {}
    }
  ]
}
