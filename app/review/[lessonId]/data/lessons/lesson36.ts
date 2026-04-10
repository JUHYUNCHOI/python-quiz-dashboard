import type { LessonData } from '../types'

export const lesson36: LessonData = {
  id: "36",
  title: "함수 문제 30",
  description: "함수 마스터 종합 복습!",
  steps: [
    // ============================================
    // Chapter 1: 함수 기초 복습
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "함수 기초",
        desc: "함수 핵심을 빠르게!"
      }
    },
    
    // 빠른 복습: 함수란?
    {
      type: "explain",
      content: {
        lines: [],
        code: `# 함수 없이 3번 인사하면...
print('안녕, 철수!')
print('안녕, 영희!')
print('안녕, 민수!')

# 함수 쓰면 한 번에!
def 인사(이름):
    print(f'안녕, {이름}!')

인사('철수')
인사('영희')
인사('민수')`,
        result: "안녕, 철수!\n안녕, 영희!\n안녕, 민수!",
        note: "def로 만들고, 함수이름()으로 호출!"
      }
    },
    
    // 예측 퀴즈 1
    {
      type: "explain",
      content: {
        lines: [],
        code: `def 인사():
    print('안녕!')

인사()
인사()`,
        predict: {
          question: "출력 결과는?",
          options: ["안녕!", "안녕!\n안녕!", "아무것도 없음", "에러"],
          answer: 1,
          feedback: "2번 호출 → 2번 출력!"
        },
        result: "안녕!\n안녕!"
      }
    },
    
    // 예측 퀴즈 2: return
    {
      type: "explain",
      content: {
        lines: [],
        code: `def test():
    print('A')
    return 'B'
    print('C')

결과 = test()
print(결과)`,
        predict: {
          question: "C가 출력될까요?",
          options: ["A, B, C 모두 출력", "A, B만 출력", "B만 출력", "에러"],
          answer: 1,
          feedback: "return 이후는 실행 안 돼요!"
        },
        result: "A\nB"
      }
    },
    
    // ⭐ 연습 1: 제곱
    {
      type: "practice",
      content: {
        level: 1,
        task: "숫자를 제곱해서 반환하는 square(n) 함수를 만드세요",
        guide: "return n ** 2",
        hint: "** 연산자가 제곱!",
        template: null,
        answer: "def square(n):\n    return n ** 2\n\nprint(square(5))\nprint(square(3))",
        en: {
          task: "Create a square(n) function that returns the square of a number",
          guide: "return n ** 2",
          hint: "The ** operator is for exponentiation!"
        },
        alternateAnswers: [
          "def square(n):\n    return n ** 2\nprint(square(5))\nprint(square(3))",
          "def square(n):\n    return n * n\n\nprint(square(5))\nprint(square(3))"
        ],
        expect: "25\n9"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "⭐",
        message: "기초 완벽!"
      }
    },
    
    // ============================================
    // Chapter 2: 기본값 & 다중 반환
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "기본값 & 다중 반환",
        desc: "응용 실력 체크!"
      }
    },
    
    // 빠른 복습: 기본값
    {
      type: "explain",
      content: {
        lines: [],
        code: `def 주문(음료, 사이즈='중'):
    print(f'{사이즈} {음료} 주문!')

주문('아메리카노')      # 사이즈 안 줌 → 기본값!
주문('라떼', '대')     # 사이즈 줌 → 그 값!`,
        result: "중 아메리카노 주문!\n대 라떼 주문!",
        note: "기본값 있는 건 뒤에! def f(a, b=10)"
      }
    },
    
    // 예측 퀴즈: 기본값
    {
      type: "explain",
      content: {
        lines: [],
        code: `def 거듭제곱(n, 지수=2):
    return n ** 지수

print(거듭제곱(5, 3))`,
        predict: {
          question: "출력 결과는?",
          options: ["10", "25", "125", "에러"],
          answer: 2,
          feedback: "지수=3을 줬으니 5³ = 125"
        },
        result: "125"
      }
    },
    
    // 예측 퀴즈: 여러 값
    {
      type: "explain",
      content: {
        lines: [],
        code: `def calc(a, b):
    return a + b, a - b

x, y = calc(10, 3)
print(x, y)`,
        predict: {
          question: "출력 결과는?",
          options: ["13, 7", "13 7", "(13, 7)", "에러"],
          answer: 1,
          feedback: "10+3=13, 10-3=7 각각 저장!"
        },
        result: "13 7"
      }
    },
    
    // ⭐ 연습 2: 짝수 판별
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "짝수면 True, 홀수면 False를 반환하는 is_even(n) 함수를 만드세요",
        guide: "n % 2 == 0",
        hint: "2로 나눈 나머지가 0이면 짝수!",
        template: null,
        answer: "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(4))\nprint(is_even(7))",
        en: {
          task: "Create an is_even(n) function that returns True for even numbers and False for odd",
          guide: "n % 2 == 0",
          hint: "If the remainder when divided by 2 is 0, it's even!"
        },
        alternateAnswers: [
          "def is_even(n):\n    return n % 2 == 0\nprint(is_even(4))\nprint(is_even(7))"
        ],
        expect: "True\nFalse"
      }
    },
    
    // 인터리빙 1: 기초 복습
    {
      type: "interleaving",
      content: {
        message: "🔄 잠깐! 함수 기초 복습!",
        task: "두 수의 합을 반환하는 add(a, b) 함수를 만드세요",
        hint: "return a + b",
        template: null,
        answer: "def add(a, b):\n    return a + b\n\nprint(add(3, 5))",
        en: {
          message: "🔄 Quick review! Function basics!",
          task: "Create an add(a, b) function that returns the sum of two numbers",
          hint: "return a + b"
        },
        alternateAnswers: [
          "def add(a, b):\n    return a + b\nprint(add(3, 5))"
        ],
        expect: "8"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "⭐⭐",
        message: "응용 OK!"
      }
    },
    
    // ============================================
    // Chapter 3: 변수 범위
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "변수 범위",
        desc: "지역 vs 전역!"
      }
    },
    
    // 빠른 복습: 지역 vs 전역
    {
      type: "explain",
      content: {
        lines: [],
        code: `# 전역변수 = 거실 물건 (모두 사용)
# 지역변수 = 내 방 물건 (나만 사용)

x = 5        # 거실의 과자 🍪

def 내방():
    x = 10   # 내 방의 과자 🍫
    print(f'내 방: {x}')

내방()
print(f'거실: {x}')`,
        result: "내 방: 10\n거실: 5",
        note: "함수 안의 x(10)와 밖의 x(5)는 다른 물건!"
      }
    },
    
    // 예측 퀴즈
    {
      type: "explain",
      content: {
        lines: [],
        code: `x = 5

def 함수():
    x = 10
    print(x)

함수()
print(x)`,
        predict: {
          question: "출력 결과는?",
          options: ["10\n10", "5\n5", "10\n5", "5\n10"],
          answer: 2,
          feedback: "함수 안(10)과 밖(5)은 다른 변수!"
        },
        result: "10\n5"
      }
    },
    
    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "global 키워드의 용도는?",
        options: [
          "함수를 전역으로 만든다",
          "함수 안에서 전역변수를 수정할 때",
          "변수를 삭제할 때",
          "새 변수를 만들 때"
        ],
        answer: 1,
        explanation: "global x 하면 함수 안에서 밖의 x를 수정 가능! (하지만 return 권장)",
        en: {
          question: "What is the purpose of the global keyword?",
          options: [
            "Makes a function global",
            "Used to modify global variables inside a function",
            "Used to delete variables",
            "Used to create new variables"
          ],
          explanation: "global x allows modifying x from outside the function! (but using return is preferred)"
        }
      }
    },
    
    // ⭐ 연습 3: 변수 범위
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "return을 사용해서 카운터를 증가시키세요 (global 없이!)",
        guide: "함수가 n+1을 return하고, 결과를 다시 저장!",
        hint: "count = increase(count) 패턴!",
        template: null,
        answer: "count = 0\n\ndef increase(n):\n    return n + 1\n\ncount = increase(count)\ncount = increase(count)\nprint(count)",
        en: {
          task: "Increment a counter using return (without using global)!",
          guide: "Function returns n+1, and the result gets stored back!",
          hint: "Use the pattern count = increase(count)!"
        },
        alternateAnswers: [
          "count = 0\ndef increase(n):\n    return n + 1\ncount = increase(count)\ncount = increase(count)\nprint(count)"
        ],
        expect: "2"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "🏠",
        message: "변수 범위 이해!"
      }
    },
    
    // ============================================
    // Chapter 4: 람다 & sorted
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "람다 & sorted",
        desc: "Level 2 핵심!"
      }
    },
    
    // 빠른 복습: 람다
    {
      type: "explain",
      content: {
        lines: [],
        code: `# 일반 함수 (편지)
def 제곱(x):
    return x ** 2

# 람다 함수 (문자)
제곱2 = lambda x: x ** 2

# 둘 다 같은 결과!
print(제곱(5))
print(제곱2(5))`,
        result: "25\n25",
        note: "람다 = def + return 없이 한 줄로!"
      }
    },
    
    // 예측 퀴즈: 람다
    {
      type: "explain",
      content: {
        lines: [],
        code: `제곱 = lambda x: x ** 2
print(제곱(5))`,
        predict: {
          question: "출력 결과는?",
          options: ["5", "10", "25", "에러"],
          answer: 2,
          feedback: "5² = 25"
        },
        result: "25"
      }
    },
    
    // 예측 퀴즈: sorted + lambda
    {
      type: "explain",
      content: {
        lines: [],
        code: `학생 = [('철수', 85), ('영희', 92), ('민수', 78)]
결과 = sorted(학생, key=lambda x: x[1], reverse=True)
print(결과[0][0])`,
        predict: {
          question: "1등은?",
          options: ["철수", "영희", "민수", "92"],
          answer: 1,
          feedback: "점수 내림차순 → 92점 영희가 1등!"
        },
        result: "영희"
      }
    },
    
    // ⭐ 연습 4: sorted + lambda
    {
      type: "practice",
      content: {
        level: 2,
        task: "단어들을 길이 기준으로 정렬하세요",
        guide: "key=lambda x: len(x)",
        hint: "len()으로 길이!",
        template: null,
        answer: "단어 = ['apple', 'hi', 'banana', 'cat']\n\n결과 = sorted(단어, key=lambda x: len(x))\nprint(결과)",
        en: {
          task: "Sort the words by their length",
          guide: "key=lambda x: len(x)",
          hint: "Use len() for length!"
        },
        alternateAnswers: [
          "단어 = ['apple', 'hi', 'banana', 'cat']\n결과 = sorted(단어, key=lambda x: len(x))\nprint(결과)",
          "단어 = ['apple', 'hi', 'banana', 'cat']\n결과 = sorted(단어, key=len)\nprint(결과)"
        ],
        expect: "['hi', 'cat', 'apple', 'banana']"
      }
    },
    
    // 인터리빙 2: 기본값 복습
    {
      type: "interleaving",
      content: {
        message: "🔄 잠깐! 기본값 복습!",
        task: "인사말(기본='안녕')과 이름을 받아 출력하는 greet 함수를 만드세요",
        hint: "기본값 있는 건 뒤에! def greet(name, msg='안녕'):",
        template: null,
        answer: "def greet(name, msg='안녕'):\n    print(f'{msg}, {name}!')\n\ngreet('철수')\ngreet('영희', '반가워')",
        en: {
          message: "🔄 Quick review! Default values!",
          task: "Create a greet function that takes a name and greeting (default='안녕') and prints them",
          hint: "Default value parameter goes last! def greet(name, msg='안녕'):"
        },
        alternateAnswers: [
          "def greet(name, msg='안녕'):\n    print(f'{msg}, {name}!')\ngreet('철수')\ngreet('영희', '반가워')"
        ],
        expect: "안녕, 철수!\n반가워, 영희!"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "⚡",
        message: "람다 마스터!"
      }
    },
    
    // ============================================
    // Chapter 5: 내장함수
    // ============================================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "내장함수",
        desc: "총정리!"
      }
    },
    
    // 빠른 복습: 내장함수
    {
      type: "explain",
      content: {
        lines: [],
        code: `숫자 = [3, 1, 4, 1, 5]

print(len(숫자))      # 개수: 5
print(sum(숫자))      # 합계: 14
print(max(숫자))      # 최대: 5
print(min(숫자))      # 최소: 1
print(sorted(숫자))   # 정렬`,
        result: "5\n14\n5\n1\n[1, 1, 3, 4, 5]",
        note: "len, sum, max, min, sorted = Level 2 필수!"
      }
    },
    
    // 예측 퀴즈: sum
    {
      type: "explain",
      content: {
        lines: [],
        code: `print(sum([1, 2, 3, 4, 5]))`,
        predict: {
          question: "출력 결과는?",
          options: ["15", "12345", "[1,2,3,4,5]", "에러"],
          answer: 0,
          feedback: "1+2+3+4+5 = 15"
        },
        result: "15"
      }
    },
    
    // 예측 퀴즈: map
    {
      type: "explain",
      content: {
        lines: [],
        code: `숫자 = ['3', '1', '4']
결과 = list(map(int, 숫자))
print(sum(결과))`,
        predict: {
          question: "출력 결과는?",
          options: ["'314'", "8", "[3,1,4]", "에러"],
          answer: 1,
          feedback: "문자→정수 변환 후 3+1+4=8"
        },
        result: "8"
      }
    },
    
    // ⭐ 연습 5: filter
    {
      type: "practice",
      content: {
        level: 2,
        task: "점수에서 60점 이상만 필터링하고 평균을 구하세요",
        guide: "filter() + sum() / len()",
        hint: "filter(lambda x: x >= 60, 리스트)",
        template: null,
        answer: "점수 = [85, 45, 92, 55, 78]\n\n합격 = list(filter(lambda x: x >= 60, 점수))\nprint(sum(합격) / len(합격))",
        en: {
          task: "Filter scores of 60 or above and find the average",
          guide: "filter() + sum() / len()",
          hint: "filter(lambda x: x >= 60, list)"
        },
        alternateAnswers: [
          "점수 = [85, 45, 92, 55, 78]\n합격 = list(filter(lambda x: x >= 60, 점수))\nprint(sum(합격) / len(합격))"
        ],
        expect: "85.0"
      }
    },
    
    // ⭐ 연습 6: 내장함수 조합
    {
      type: "practice",
      content: {
        level: 2,
        task: "문자열 숫자를 정수로 변환 후 최대값과 최소값의 차이를 구하세요",
        guide: "map() + max() - min()",
        hint: "list(map(int, ...))로 변환 후 max - min!",
        template: null,
        answer: "문자 = ['5', '12', '3', '8']\n\n숫자 = list(map(int, 문자))\nprint(max(숫자) - min(숫자))",
        en: {
          task: "Convert string numbers to integers then find the difference between max and min values",
          guide: "map() + max() - min()",
          hint: "Convert with list(map(int, ...)) then max - min!"
        },
        alternateAnswers: [
          "문자 = ['5', '12', '3', '8']\n숫자 = list(map(int, 문자))\nprint(max(숫자) - min(숫자))"
        ],
        expect: "9"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "📚",
        message: "내장함수 완벽!"
      }
    },
    
    // ============================================
    // Chapter 6: 에러 탐정
    // ============================================
    {
      type: "chapter",
      content: {
        num: 6,
        title: "에러 탐정",
        desc: "실수 찾기!"
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
          "함수 이름 오류",
          "기본값이 있는 매개변수가 앞에 있음",
          "print 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "기본값 있는 건 뒤에! def greet(name, msg='안녕'):이 맞아요!"
      }
    },
    
    // 에러 퀴즈 2: 람다 return
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `f = lambda x: return x * 2`,
        options: [
          "변수명 오류",
          "람다에서 return 사용",
          "곱하기 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "람다에선 return 안 써요! lambda x: x * 2"
      }
    },
    
    // 에러 퀴즈 3: map 인덱싱
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `결과 = map(int, ['1', '2', '3'])
print(결과[0])`,
        options: [
          "map 오류",
          "map 객체는 인덱싱 불가",
          "정수 변환 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "list()로 감싸야 인덱싱 가능! list(map(...))[0]"
      }
    },
    
    // 에러 퀴즈 4: print vs return
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `def add(a, b):
    print(a + b)

결과 = add(3, 5)
print(결과 * 2)`,
        options: [
          "add 함수 문법 오류",
          "print만 하고 return이 없어서 None 반환",
          "곱하기 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "print()만 하면 None 반환! return a + b 해야 해요!"
      }
    },
    
    // ============================================
    // Chapter 7: 마무리
    // ============================================
    {
      type: "chapter",
      content: {
        num: 7,
        title: "마무리",
        desc: "함수 총정리!"
      }
    },
    
    // 요약
    {
      type: "summary",
      content: {
        num: 1,
        title: "함수 마스터",
        emoji: "🏆",
        learned: [
          "def + return으로 함수 만들기",
          "기본값: def f(a, b=10)",
          "다중 반환: return a, b",
          "지역 vs 전역 변수",
          "람다: lambda x: 값",
          "sorted + lambda: 정렬 기준 지정",
          "map, filter: 일괄 처리"
        ],
        canDo: "함수의 모든 것을 마스터했어요!"
      }
    },
    
    // 완료
    {
      type: "done",
      content: {}
    }
  ]
}
