import type { LessonData } from '../types'

export const lesson32: LessonData = {
  id: "32",
  title: "함수란?",
  description: "코드를 재사용하는 마법, 함수를 배워요!",
  steps: [
    // ============================================
    // Chapter 1: 함수 개념 복습
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "함수가 뭐였지?",
        desc: "함수의 핵심 개념을 복습해요!"
      }
    },
    
    // 빠른 복습: 왜 함수를 쓸까?
    {
      type: "explain",
      content: {
        lines: ["🤔 함수 없이 3명에게 인사하면..."],
        code: `print('안녕, 철수!')
print('안녕, 영희!')
print('안녕, 민수!')`,
        note: "같은 코드 반복! 메시지 바꾸려면 3줄 다 수정해야 해요 😵"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["✨ 함수를 쓰면!"],
        code: `def 인사(이름):
    print(f'안녕, {이름}!')

인사('철수')
인사('영희')
인사('민수')`,
        result: "안녕, 철수!\n안녕, 영희!\n안녕, 민수!",
        note: "한 번 만들면 계속 재사용! 수정도 한 곳만!"
      }
    },
    
    // 퀴즈: def 키워드
    {
      type: "quiz",
      content: {
        question: "함수를 만들 때 맨 앞에 쓰는 키워드는?",
        options: ["function", "def", "func", "make"],
        answer: 1,
        explanation: "def는 'define(정의하다)'의 줄임말! 파이썬에서 함수를 만들 때 써요.",
        en: {
          question: "What keyword do you write at the start when creating a function?",
          options: ["function", "def", "func", "make"],
          explanation: "def is short for 'define'! It's used to create functions in Python."
        }
      }
    },
    
    // ============================================
    // Chapter 2: 함수 호출 복습
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "함수 호출하기",
        desc: "만든 함수를 불러봐요!"
      }
    },
    
    // 예측 퀴즈: 함수 호출
    {
      type: "explain",
      content: {
        lines: [],
        code: `def 안녕():
    print('Hi!')

안녕()
안녕()`,
        predict: {
          question: "출력 결과는?",
          options: ["Hi!", "Hi!\nHi!", "아무것도 출력 안 됨"],
          answer: 1,
          feedback: "안녕()을 2번 호출했으니 2번 출력!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["Hi!", "Hi!\nHi!", "Nothing is printed"],
            feedback: "안녕() is called twice, so it prints twice!"
          }
        },
        result: "Hi!\nHi!"
      }
    },
    
    // ⭐ 연습 1: 간단한 함수 만들고 호출
    {
      type: "practice",
      content: {
        level: 1,
        task: "'파이썬 재밌다!'를 출력하는 fun() 함수를 만들고 호출하세요",
        guide: "def fun(): 만들고, fun()으로 호출!",
        hint: "def 함수이름(): 으로 시작하고, 안에 print()를 써요!",
        template: null,
        answer: "def fun():\n    print('파이썬 재밌다!')\n\nfun()",
        en: {
          task: "Create a fun() function that prints '파이썬 재밌다!' and call it",
          guide: "Define with def fun():, then call with fun()!",
          hint: "Start with def function_name(): and use print() inside!"
        },
        alternateAnswers: [
          "def fun():\n    print('파이썬 재밌다!')\nfun()",
          "def fun():\n    print(\"파이썬 재밌다!\")\n\nfun()"
        ],
        expect: "파이썬 재밌다!"
      }
    },
    
    // 인터리빙: Ch1 개념 확인
    {
      type: "interleaving",
      content: {
        message: "🔄 잠깐! 함수의 장점 기억나요?",
        task: "'안녕하세요!'를 출력하는 greet() 함수를 만들고 3번 호출하세요",
        hint: "함수 정의 후, greet()를 3줄 써보세요!",
        template: null,
        answer: "def greet():\n    print('안녕하세요!')\n\ngreet()\ngreet()\ngreet()",
        en: {
          message: "🔄 Quick check! Remember the advantages of functions?",
          task: "Create a greet() function that prints '안녕하세요!' and call it 3 times",
          hint: "After defining the function, write greet() 3 times!"
        },
        alternateAnswers: [
          "def greet():\n    print('안녕하세요!')\ngreet()\ngreet()\ngreet()",
          "def greet():\n    print(\"안녕하세요!\")\n\ngreet()\ngreet()\ngreet()"
        ],
        expect: "안녕하세요!\n안녕하세요!\n안녕하세요!"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "📞",
        message: "함수 호출 완벽!"
      }
    },
    
    // ============================================
    // Chapter 3: 매개변수 복습
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "매개변수",
        desc: "함수에 값을 전달해요!"
      }
    },
    
    // 예측 퀴즈: 매개변수 1개
    {
      type: "explain",
      content: {
        lines: [],
        code: `def 인사(이름):
    print(f'안녕, {이름}!')

인사('민수')`,
        predict: {
          question: "결과는?",
          options: ["안녕, 이름!", "안녕, 민수!", "안녕, {이름}!"],
          answer: 1,
          feedback: "'민수'가 이름 자리에 들어가요!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["안녕, 이름!", "안녕, 민수!", "안녕, {이름}!"],
            feedback: "'민수' goes into the name slot!"
          }
        },
        result: "안녕, 민수!"
      }
    },
    
    // ⭐ 연습 2: 매개변수 1개 함수
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "음식을 받아 '[음식] 주문이요!'를 출력하는 order(food) 함수를 만드세요",
        guide: "f-string으로 {food}를 출력!",
        hint: "f-string 안에 {food}를 넣어보세요!",
        template: null,
        answer: "def order(food):\n    print(f'{food} 주문이요!')\n\norder('피자')",
        en: {
          task: "Create an order(food) function that prints '[food] 주문이요!'",
          guide: "Print {food} using an f-string!",
          hint: "Put {food} inside the f-string!"
        },
        alternateAnswers: [
          "def order(food):\n    print(f'{food} 주문이요!')\norder('피자')",
          "def order(food):\n    print(f\"{food} 주문이요!\")\n\norder('피자')",
          "def order(food):\n    print(f'{food} 주문이요!')\n\norder(\"피자\")"
        ],
        expect: "피자 주문이요!"
      }
    },
    
    // 예측 퀴즈: 매개변수 2개
    {
      type: "explain",
      content: {
        lines: [],
        code: `def 소개(이름, 나이):
    print(f'저는 {이름}, {나이}살!')

소개('영희', 14)`,
        predict: {
          question: "결과는?",
          options: ["저는 영희, 14살!", "저는 이름, 나이살!", "에러"],
          answer: 0,
          feedback: "이름에 '영희', 나이에 14가 들어가요!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["저는 영희, 14살!", "저는 이름, 나이살!", "Error"],
            feedback: "'영희' goes into the name slot, 14 goes into the age slot!"
          }
        },
        result: "저는 영희, 14살!"
      }
    },
    
    // ⭐ 연습 3: 매개변수 2개 함수
    {
      type: "practice",
      content: {
        level: 2,
        task: "이름과 나이를 받아 '[이름], [나이]살!'을 출력하는 intro(name, age) 함수를 만드세요",
        guide: "f-string으로 {name}과 {age}를 출력!",
        hint: "def intro(name, age): 먼저 만들고, print(f'...')로 출력!",
        template: null,
        answer: "def intro(name, age):\n    print(f'{name}, {age}살!')\n\nintro('철수', 15)",
        en: {
          task: "Create an intro(name, age) function that prints '[name], [age]살!'",
          guide: "Print {name} and {age} using an f-string!",
          hint: "First define def intro(name, age): then use print(f'...')!"
        },
        alternateAnswers: [
          "def intro(name, age):\n    print(f'{name}, {age}살!')\nintro('철수', 15)",
          "def intro(name, age):\n    print(f\"{name}, {age}살!\")\n\nintro('철수', 15)"
        ],
        expect: "철수, 15살!"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "📦",
        message: "매개변수 마스터!"
      }
    },
    
    // ============================================
    // Chapter 4: return 복습
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "반환값 (return)",
        desc: "함수가 결과를 돌려줘요!"
      }
    },
    
    // 예측 퀴즈: return
    {
      type: "explain",
      content: {
        lines: [],
        code: `def 더하기(a, b):
    return a + b

결과 = 더하기(3, 5)
print(결과)`,
        predict: {
          question: "결과는?",
          options: ["3 + 5", "8", "a + b"],
          answer: 1,
          feedback: "3 + 5 = 8이 return되어 결과에 저장!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["3 + 5", "8", "a + b"],
            feedback: "3 + 5 = 8 is returned and stored in the variable!"
          }
        },
        result: "8"
      }
    },
    
    // 퀴즈: print vs return
    {
      type: "quiz",
      content: {
        question: "print와 return의 차이는?",
        options: [
          "둘 다 똑같다",
          "print는 출력만, return은 값을 돌려줌",
          "return은 출력만, print는 값을 돌려줌",
          "둘 다 값을 돌려준다"
        ],
        answer: 1,
        explanation: "print는 화면에 보여주기만! return은 값을 돌려줘서 저장하거나 계산에 쓸 수 있어요.",
        en: {
          question: "What is the difference between print and return?",
          options: [
            "They are exactly the same",
            "print only displays, return gives back a value",
            "return only displays, print gives back a value",
            "Both give back values"
          ],
          explanation: "print just shows on screen! return gives back a value that can be stored or used in calculations."
        }
      }
    },
    
    // ⭐ 연습 4: 빼기 함수
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 수의 차이를 반환하는 subtract(a, b) 함수를 만드세요",
        guide: "return a - b를 사용!",
        hint: "return 키워드로 a에서 b를 뺀 결과를 돌려줘요!",
        template: null,
        answer: "def subtract(a, b):\n    return a - b\n\nprint(subtract(10, 3))",
        en: {
          task: "Create a subtract(a, b) function that returns the difference of two numbers",
          guide: "Use return a - b!",
          hint: "Use the return keyword to give back the result of a minus b!"
        },
        alternateAnswers: [
          "def subtract(a, b):\n    return a - b\nprint(subtract(10, 3))",
          "def subtract(a,b):\n    return a-b\n\nprint(subtract(10,3))"
        ],
        expect: "7"
      }
    },
    
    // 인터리빙: 매개변수 + return 복합
    {
      type: "interleaving",
      content: {
        message: "🔄 매개변수와 return 합치기!",
        task: "숫자의 제곱을 반환하는 square(n) 함수를 만드세요 (3의 제곱 = 9)",
        hint: "n을 두 번 곱하면 제곱이에요!",
        template: null,
        answer: "def square(n):\n    return n * n\n\nprint(square(3))",
        en: {
          message: "🔄 Combining parameters and return!",
          task: "Create a square(n) function that returns the square of a number (square of 3 = 9)",
          hint: "Multiply n by itself to get the square!"
        },
        alternateAnswers: [
          "def square(n):\n    return n * n\nprint(square(3))",
          "def square(n):\n    return n*n\n\nprint(square(3))"
        ],
        expect: "9"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "🎁",
        message: "return 완벽 이해!"
      }
    },
    
    // ============================================
    // Chapter 5: 계산기 프로젝트 복습
    // ============================================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "계산기 만들기",
        desc: "배운 걸 모두 활용해요!"
      }
    },
    
    // 프로젝트 설명
    {
      type: "explain",
      content: {
        lines: ["🧮 계산기 함수들을 완성해요!"],
        code: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

print(add(3, 5))      # 8
print(subtract(10, 4)) # 6`,
        result: "8\n6",
        note: "더하기, 빼기 완성! 이제 곱하기, 나누기를 만들어요!"
      }
    },
    
    // ⭐ 연습 5: 곱하기 함수
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 수를 곱해서 반환하는 multiply(a, b) 함수를 만드세요",
        guide: "return a * b",
        hint: "두 수를 곱하는 연산자는 *예요!",
        template: null,
        answer: "def multiply(a, b):\n    return a * b\n\nprint(multiply(3, 4))",
        en: {
          task: "Create a multiply(a, b) function that returns the product of two numbers",
          guide: "return a * b",
          hint: "The operator for multiplying two numbers is *!"
        },
        alternateAnswers: [
          "def multiply(a, b):\n    return a * b\nprint(multiply(3, 4))",
          "def multiply(a,b):\n    return a*b\n\nprint(multiply(3,4))"
        ],
        expect: "12"
      }
    },
    
    // ⭐ 연습 6: 나누기 함수
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 수를 나눠서 반환하는 divide(a, b) 함수를 만드세요",
        guide: "return a / b",
        hint: "두 수를 나누는 연산자는 /예요!",
        template: null,
        answer: "def divide(a, b):\n    return a / b\n\nprint(divide(10, 2))",
        en: {
          task: "Create a divide(a, b) function that returns the division of two numbers",
          guide: "return a / b",
          hint: "The operator for dividing two numbers is /!"
        },
        alternateAnswers: [
          "def divide(a, b):\n    return a / b\nprint(divide(10, 2))",
          "def divide(a,b):\n    return a/b\n\nprint(divide(10,2))"
        ],
        expect: "5.0"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "🧮",
        message: "계산기 완성!"
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
        desc: "자주 하는 실수를 찾아요!"
      }
    },
    
    // 에러 퀴즈 1: 콜론 빠짐
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `def 인사()
    print('안녕!')`,
        options: [
          "print 오타",
          ": (콜론) 빠짐",
          "들여쓰기 오류",
          "문제없음"
        ],
        answer: 1,
        explanation: "def 인사(): 처럼 콜론(:)을 꼭 붙여야 해요!"
      }
    },
    
    // 에러 퀴즈 2: 들여쓰기 안 함
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `def 인사():
print('안녕!')`,
        options: [
          "콜론 빠짐",
          "괄호 오류",
          "들여쓰기 안 함",
          "문제없음"
        ],
        answer: 2,
        explanation: "함수 안의 코드는 들여쓰기(스페이스 4칸)가 필수!"
      }
    },
    
    // 에러 퀴즈 3: 괄호 빠짐
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `def 인사:
    print('안녕!')`,
        options: [
          "() 괄호 빠짐",
          "콜론 빠짐",
          "들여쓰기 오류",
          "문제없음"
        ],
        answer: 0,
        explanation: "함수 이름 뒤에 ()가 필수! def 인사():로 써야 해요!"
      }
    },
    
    // 에러 퀴즈 4: 호출 안 함
    {
      type: "errorQuiz",
      content: {
        question: "이 코드를 실행하면?",
        code: `def 인사():
    print('안녕!')

# 호출 안 함`,
        options: [
          "안녕! 출력",
          "아무것도 안 됨",
          "에러 발생",
          "안녕! 2번 출력"
        ],
        answer: 1,
        explanation: "함수를 만들기만 하고 호출 안 하면 아무것도 안 돼요! 인사()를 써야 해요!"
      }
    },
    
    // ============================================
    // 요약
    // ============================================
    {
      type: "summary",
      content: {
        num: 1,
        title: "함수",
        emoji: "🎉",
        learned: [
          "def로 함수를 만들어요",
          "함수이름()으로 호출해요",
          "매개변수로 값을 전달해요",
          "return으로 결과를 돌려줘요",
          "콜론(:), 들여쓰기, 괄호() 필수!"
        ],
        canDo: "이제 코드를 재사용하는 함수를 만들 수 있어요!"
      }
    },
    
    // ============================================
    // Chapter 7: 함수 손에 익히기
    // ============================================
    {
      type: "chapter",
      content: {
        num: 7,
        title: "함수 손에 익히기",
        desc: "def, 매개변수, return — 눈 감고도 쓸 수 있게!"
      }
    },

    // Drill 1: 함수 선언 구조
    {
      type: "practice",
      content: {
        level: 1,
        task: "이름을 받아 '안녕, [이름]!'을 출력하는 greet(name) 함수를 완성해요",
        guide: "def 함수이름(매개변수): + 들여쓰기 + print",
        template: "___ greet(name):\n    print(f'안녕, {___}!')\n\ngreet('민수')",
        blanksAnswer: ["def", "name"],
        answer: "def greet(name):\n    print(f'안녕, {name}!')\n\ngreet('민수')",
        expect: "안녕, 민수!",
        en: {
          task: "Complete a greet(name) function that prints '안녕, [name]!'",
          guide: "def funcname(param): + indent + print"
        }
      }
    },

    // Drill 2: return 값
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 수를 받아 더 큰 수를 반환하는 bigger(a, b) 함수를 완성해요",
        guide: "if a > b: return a else: return b",
        template: "def bigger(a, b):\n    if a > b:\n        ___ a\n    ___:\n        return b\n\nprint(bigger(7, 3))",
        blanksAnswer: ["return", "else"],
        answer: "def bigger(a, b):\n    if a > b:\n        return a\n    else:\n        return b\n\nprint(bigger(7, 3))",
        expect: "7",
        en: {
          task: "Complete the bigger(a, b) function that returns the larger of two numbers",
          guide: "if a > b: return a else: return b"
        }
      }
    },

    // Drill 3: 함수 + 반복문 조합
    {
      type: "practice",
      content: {
        level: 2,
        task: "리스트의 합계를 반환하는 my_sum(nums) 함수를 완성해요",
        guide: "total = 0; for x in nums: total += x; return total",
        template: "def my_sum(nums):\n    total = ___\n    for x in nums:\n        total ___ x\n    return ___\n\nprint(my_sum([1, 2, 3, 4, 5]))",
        blanksAnswer: ["0", "+=", "total"],
        answer: "def my_sum(nums):\n    total = 0\n    for x in nums:\n        total += x\n    return total\n\nprint(my_sum([1, 2, 3, 4, 5]))",
        expect: "15",
        en: {
          task: "Complete the my_sum(nums) function that returns the sum of a list",
          guide: "total = 0; for x in nums: total += x; return total"
        }
      }
    },

    // Drill 4: 처음부터 — is_even 함수
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! 정수를 받아 짝수면 True, 홀수면 False를 반환하는 is_even(n) 함수를 만들고\nis_even(4)와 is_even(7) 결과를 출력해요",
        guide: "def is_even(n): return n % 2 == 0",
        hint: "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(4))\nprint(is_even(7))",
        template: null,
        answer: "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(4))\nprint(is_even(7))",
        alternateAnswers: [
          "def is_even(n):\n    if n%2==0:\n        return True\n    return False\n\nprint(is_even(4))\nprint(is_even(7))"
        ],
        expect: "True\nFalse",
        en: {
          task: "Write from scratch! Create is_even(n) that returns True for even, False for odd\nPrint results for is_even(4) and is_even(7)",
          guide: "def is_even(n): return n % 2 == 0",
          hint: "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(4))\nprint(is_even(7))"
        }
      }
    },

    // Drill 5: 처음부터 — 계산기
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! add(a,b), multiply(a,b) 함수를 만들고\nadd(3, 5)와 multiply(4, 6) 결과를 출력해요",
        guide: "def add(a,b): return a+b; def multiply(a,b): return a*b",
        hint: "def add(a, b):\n    return a + b\n\ndef multiply(a, b):\n    return a * b\n\nprint(add(3, 5))\nprint(multiply(4, 6))",
        template: null,
        answer: "def add(a, b):\n    return a + b\n\ndef multiply(a, b):\n    return a * b\n\nprint(add(3, 5))\nprint(multiply(4, 6))",
        alternateAnswers: [
          "def add(a,b):return a+b\ndef multiply(a,b):return a*b\nprint(add(3,5))\nprint(multiply(4,6))"
        ],
        expect: "8\n24",
        en: {
          task: "Write from scratch! Create add(a,b) and multiply(a,b) functions\nPrint results of add(3, 5) and multiply(4, 6)",
          guide: "def add(a,b): return a+b; def multiply(a,b): return a*b",
          hint: "def add(a, b):\n    return a + b\n\ndef multiply(a, b):\n    return a * b\n\nprint(add(3, 5))\nprint(multiply(4, 6))"
        }
      }
    },

    // 완료
    {
      type: "done",
      content: {}
    }
  ]
}
