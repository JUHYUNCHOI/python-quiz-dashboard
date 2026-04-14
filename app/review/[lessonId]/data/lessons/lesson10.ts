import { LessonData } from '../types';

export const lesson10: LessonData = {
  id: "10",
  title: "input()",
  description: "사용자 입력 받기!",
  steps: [
    // ==================== CHAPTER 1: 동기 부여 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "input() 소개",
        desc: "사용자가 입력하는 프로그램!"
      }
    },

    // 프리뷰
    {
      type: "explain",
      content: {
        lines: [
          "🎯 오늘 만들 것!"
        ],
        code: "name = input('Enter your name: ')\nage = int(input('Enter your age: '))\nprint(f'Hello, {name}! You are {age} years old!')",
        result: "Enter your name: Alice\nEnter your age: 15\nHello, Alice! You are 15 years old!",
        isPreview: true,
        note: "사용자가 직접 입력하는 프로그램!"
      }
    },

    {
      type: "reward",
      content: {
        message: "input() 마스터 시작!",
        emoji: "⌨️"
      }
    },

    // ==================== CHAPTER 2: input() 기본 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "input() 기본",
        desc: "항상 str로 반환!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "잠깐! 타입 변환 기억나?",
        task: "int('42') + 8 을 출력해봐",
        template: { before: "print(", after: ")" },
        answer: "int('42') + 8",
        expect: "50",
        en: {
          message: "Wait! Remember type conversion?",
          task: "Print int('42') + 8"
        }
      }
    },

    // input() 기본
    {
      type: "explain",
      content: {
        lines: [
          "input() 은 항상 문자열(str)을 반환해!"
        ],
        code: "name = input('Name: ')   # get user input\nprint(f'Hello, {name}!')",
        note: "input()의 반환값은 무조건 str!"
      }
    },

    // input() 사용법
    {
      type: "explain",
      content: {
        lines: [
          "input() 안에 안내 메시지를 넣어!"
        ],
        code: "# with prompt\ncity = input('City: ')        # enter 'Seoul'\nprint(city)                   # Seoul\n\n# without prompt\nfood = input()                # just waits",
        note: "안내 메시지를 넣으면 사용자가 뭘 입력할지 알아!"
      }
    },

    // ===== Lv.1: input 기본 =====
    {
      type: "practice",
      content: {
        level: 1,
        task: "input()으로 좋아하는 음식을 입력받아\n'좋아하는 음식: 피자' 형식으로 출력해봐\n(입력: 피자)",
        guide: "input()으로 입력받고, f-string으로 출력해요",
        hint: "input()으로 변수에 저장하고, f-string으로 출력해봐요",
        template: null,
        answer: "food = input('좋아하는 음식: ')\nprint(f'좋아하는 음식: {food}')",
        expect: "좋아하는 음식: 피자",
        en: {
          task: "Use input() to get a favorite food\nPrint it in '좋아하는 음식: 피자' format\n(input: 피자)",
          guide: "Receive input with input(), then print using f-string",
          hint: "Store input in a variable, then print with f-string"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "input()의 반환 타입은?",
        options: [
          "int (정수)",
          "float (소수)",
          "str (문자열)"
        ],
        answer: 2,
        explanation: "input()은 항상 문자열(str)로 반환해! 숫자를 입력해도 '123' 같은 문자열이야.",
        en: {
          question: "What type does input() return?",
          options: [
            "int (integer)",
            "float (decimal)",
            "str (string)"
          ],
          explanation: "input() always returns a string (str)! Even if you type numbers, it returns '123' as a string."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 2,
        title: "input() 기본",
        learned: [
          "input() 으로 사용자 입력 받기",
          "안내 메시지를 괄호 안에 넣기",
          "반환값은 항상 str!"
        ],
        canDo: "사용자 입력을 받을 수 있어!",
        emoji: "💬"
      }
    },

    // ==================== CHAPTER 3: 숫자 입력 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "숫자 입력",
        desc: "int() 로 변환해야 해!"
      }
    },

    // 숫자 입력 문제
    {
      type: "explain",
      content: {
        lines: [
          "⚠️ 숫자 입력은 반드시 변환해야 해!"
        ],
        code: "# wrong way (string + number = error!)\nnum = input('number: ')   # enter '10'\nresult = num + 5          # TypeError!\n\n# correct way\nnum = int(input('number: '))  # '10' → 10\nresult = num + 5              # 15 ✓",
        isError: true,
        note: "input()은 항상 str → 계산하려면 int() 변환 필수!"
      }
    },

    // 에러 퀴즈
    {
      type: "errorQuiz",
      content: {
        question: "아래 코드의 문제점은?",
        code: "score = input('score: ')  # enter '90'\nprint(score + 10)",
        options: [
          "입력을 받을 수 없어",
          "TypeError: str + int 불가",
          "출력이 100이 나와"
        ],
        answer: 1,
        explanation: "input()은 str을 반환해! '90' + 10은 문자열 + 정수라 TypeError가 발생해. int(input('점수: '))로 변환해야 해!",
        en: {
          question: "What is the problem with this code?",
          options: [
            "Can't receive input",
            "TypeError: str + int not allowed",
            "Output is 100"
          ],
          explanation: "input() returns str! '90' + 10 is string + integer so TypeError occurs. Must convert with int(input('점수: '))!"
        }
      }
    },

    // ===== Lv.2: 숫자 입력 =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "나이를 int로 입력받아\n10년 후 나이를 출력해봐\n(입력: 15 → 출력: 25)",
        guide: "input()은 항상 str을 반환하니까 숫자 계산 전에 int()로 변환해야 해요",
        hint: "int(input(...))로 감싸서 정수로 입력받아요",
        template: null,
        answer: "age = int(input('나이: '))\nprint(age + 10)",
        expect: "25",
        en: {
          task: "Get age as int input\nPrint the age 10 years later\n(input: 15 → output: 25)",
          guide: "input() always returns str, so wrap with int() before calculating",
          hint: "Wrap with int(input(...)) to receive as integer"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 수를 각각 입력받아 합을 출력해봐\n(입력: 30, 70 → 출력: 100)",
        guide: "각각 int()로 변환해서 입력받아야 더할 수 있어요",
        hint: "두 번 입력받을 때 각각 int()로 감싸봐요",
        template: null,
        answer: "a = int(input('첫 번째 수: '))\nb = int(input('두 번째 수: '))\nprint(a + b)",
        expect: "100",
        en: {
          task: "Get two numbers as input and print their sum\n(input: 30, 70 → output: 100)",
          guide: "Wrap each input with int() so you can add them",
          hint: "Wrap each of the two inputs separately with int()"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "input()으로 숫자를 받아서 계산하려면?",
        options: [
          "그냥 계산해도 돼",
          "int(input()) 으로 변환해야 해",
          "float 만 가능해"
        ],
        answer: 1,
        explanation: "input()은 항상 str! 계산하려면 int(input()) 또는 float(input())으로 변환해야 해.",
        en: {
          question: "To receive a number with input() and calculate with it?",
          options: [
            "You can calculate directly",
            "Must convert with int(input())",
            "Only float is possible"
          ],
          explanation: "input() always returns str! To calculate, you must convert with int(input()) or float(input())."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 3,
        title: "숫자 입력",
        learned: [
          "age = int(input('나이: ')) → 정수 입력",
          "price = float(input('가격: ')) → 소수 입력",
          "변환 안 하면 TypeError!"
        ],
        canDo: "숫자 입력도 안전하게 받을 수 있어!",
        emoji: "🔢"
      }
    },

    // ==================== CHAPTER 4: 프로젝트 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "자기소개 프로그램",
        desc: "input() 총 활용!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "f-string 기억나?",
        task: "name = '코린이', age = 13 으로\n'코린이는 13살이야' 출력해봐",
        template: null,
        answer: "name = '코린이'\nage = 13\nprint(f'{name}는 {age}살이야')",
        expect: "코린이는 13살이야",
        en: {
          message: "Remember f-strings?",
          task: "With name = '코린이', age = 13\nPrint '코린이는 13살이야'"
        }
      }
    },

    // 프로젝트 소개
    {
      type: "explain",
      content: {
        lines: [
          "🙋 자기소개 프로그램!"
        ],
        code: "=== Introduction ===\nEnter your name: Alice\nEnter your age: 16\nHello! My name is Alice and I am 16 years old.",
        isPreview: true,
        note: "input() 으로 하나씩 만들어보자!"
      }
    },

    // 프로젝트
    {
      type: "project",
      content: {
        step: 1,
        total: 3,
        task: "제목 출력",
        target: "=== 자기소개 ===",
        hint: "print('=== 자기소개 ===')",
        done: [],
        answer: "print('=== 자기소개 ===')"
      }
    },
    {
      type: "project",
      content: {
        step: 2,
        total: 3,
        task: "이름(str)과 나이(int)를 input()으로 받기",
        target: "이름을 입력하세요: 지수\n나이를 입력하세요: 16",
        hint: "name = input('이름을 입력하세요: ')\nage = int(input('나이를 입력하세요: '))",
        done: ["=== 자기소개 ==="],
        answer: "name = input('이름을 입력하세요: ')\nage = int(input('나이를 입력하세요: '))"
      }
    },
    {
      type: "project",
      content: {
        step: 3,
        total: 3,
        task: "f-string으로 자기소개 출력",
        target: "안녕하세요! 저는 지수이고, 16살입니다.",
        hint: "f'안녕하세요! 저는 {name}이고, {age}살입니다.'",
        done: ["=== 자기소개 ===", "이름을 입력하세요: 지수", "나이를 입력하세요: 16"],
        answer: "print(f'안녕하세요! 저는 {name}이고, {age}살입니다.')"
      }
    },

    // ==================== CHAPTER 5: 예측 훈련 ====================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "결과 예측",
        desc: "input()의 타입을 정확히 알자!"
      }
    },

    // predict 1: type(input()) — str 반환
    {
      type: "explain",
      content: {
        lines: ["이 코드의 출력을 예측해봐! (사용자가 '10' 입력)"],
        code: "x = input('number: ')  # user enters '10'\nprint(type(x))",
        predict: {
          options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "Error"],
          answer: 1,
          feedback: "input()은 항상 str을 반환해! 숫자를 입력해도 '10' 같은 문자열이 돼."
        },
        en: {
          lines: ["Predict the output! (user inputs '10')"],
          predict: {
            options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "Error"],
            feedback: "input() always returns str! Even numbers become '10' as a string."
          }
        }
      }
    },

    // predict 2: input() + number → TypeError
    {
      type: "explain",
      content: {
        lines: ["이 코드의 결과를 예측해봐! (사용자가 '5' 입력)"],
        code: "n = input('number: ')  # enter '5'\nresult = n + 3\nprint(result)",
        predict: {
          options: ["8", "53", "TypeError 발생", "'5'3"],
          answer: 2,
          feedback: "input()은 str! str + int는 TypeError야. 계산하려면 int(input())으로 변환해야 해."
        },
        en: {
          lines: ["Predict the result! (user inputs '5')"],
          predict: {
            options: ["8", "53", "TypeError occurs", "'5'3"],
            feedback: "input() is str! str + int raises TypeError. You need int(input()) to calculate."
          }
        }
      }
    },

    // predict 3: int(input()) + number → correct
    {
      type: "explain",
      content: {
        lines: ["이번엔 int()로 변환했어. (사용자가 '7' 입력)"],
        code: "n = int(input('number: '))  # enter '7' → int 7\nresult = n + 3\nprint(result)",
        predict: {
          options: ["73", "10", "TypeError 발생", "'7'3"],
          answer: 1,
          feedback: "int(input())로 변환하면 진짜 정수가 돼서 7 + 3 = 10이야!"
        },
        en: {
          lines: ["This time converted with int(). (user inputs '7')"],
          predict: {
            options: ["73", "10", "TypeError occurs", "'7'3"],
            feedback: "int(input()) converts to real integer, so 7 + 3 = 10!"
          }
        }
      }
    },

    // predict 4: str * 2 — repetition not multiplication
    {
      type: "explain",
      content: {
        lines: ["이 코드의 출력을 예측해봐! (사용자가 '5' 입력)"],
        code: "n = input('number: ')  # enter '5' (str!)\nprint(n * 2)",
        predict: {
          options: ["10", "55", "TypeError 발생", "5"],
          answer: 1,
          feedback: "str * 2는 문자열 반복이야! '5' * 2 = '55'. 10을 얻으려면 int(input()) * 2 해야 해."
        },
        en: {
          lines: ["Predict the output! (user inputs '5')"],
          predict: {
            options: ["10", "55", "TypeError occurs", "5"],
            feedback: "str * 2 is repetition! '5' * 2 = '55'. To get 10, you need int(input()) * 2."
          }
        }
      }
    },

    // predict 5: two inputs concatenated vs added
    {
      type: "explain",
      content: {
        lines: ["두 입력의 출력을 예측해봐! (각각 '3', '4' 입력)"],
        code: "a = input('first: ')  # '3'\nb = input('second: ')  # '4'\nprint(a + b)",
        predict: {
          options: ["7", "34", "TypeError 발생", "3 4"],
          answer: 1,
          feedback: "input()은 str! '3' + '4' = '34' (문자열 이어붙이기). 7을 얻으려면 int()로 변환해야 해."
        },
        en: {
          lines: ["Predict the output of two inputs! (inputs: '3', '4')"],
          predict: {
            options: ["7", "34", "TypeError occurs", "3 4"],
            feedback: "input() is str! '3' + '4' = '34' (string concatenation). Need int() to get 7."
          }
        }
      }
    },

    // predict 6: float(input()) for decimal
    {
      type: "explain",
      content: {
        lines: ["소수 입력! (사용자가 '3.14' 입력)"],
        code: "pi = float(input('pi: '))  # enter '3.14'\nprint(pi * 2)",
        predict: {
          options: ["6.28", "3.143.14", "TypeError 발생", "6"],
          answer: 0,
          feedback: "float(input())으로 변환하면 소수 계산이 가능해! 3.14 * 2 = 6.28이야."
        },
        en: {
          lines: ["Decimal input! (user inputs '3.14')"],
          predict: {
            options: ["6.28", "3.143.14", "TypeError occurs", "6"],
            feedback: "float(input()) converts to decimal for calculations! 3.14 * 2 = 6.28."
          }
        }
      }
    },

    // ==================== CHAPTER 6: 오류 찾기 + 실전 연습 ====================
    {
      type: "chapter",
      content: {
        num: 6,
        title: "오류 찾기 & 실전 연습",
        desc: "흔한 실수와 다양한 활용!"
      }
    },

    // errorQuiz 2: str * 2 (반복, 곱이 아님)
    {
      type: "errorQuiz",
      content: {
        question: "아래 코드의 문제는?",
        code: "n = input('number: ')  # user enters 5\nprint(n * 2)",
        options: [
          "n이 str이라 '55'가 출력돼 (곱이 아니라 반복!)",
          "n이 int가 아니라 에러 발생",
          "괄호 문법 오류"
        ],
        answer: 0,
        explanation: "input()은 str! str * 2 = 반복이라 '55'가 나와. 숫자 10을 얻으려면 int(input('숫자: '))로 변환해야 해.",
        en: {
          question: "What's wrong with this code?",
          options: [
            "n is str so '55' prints (repetition not multiplication!)",
            "n is not int so error",
            "Parenthesis syntax error"
          ],
          explanation: "input() is str! str * 2 = repetition so '55' appears. Need int(input('숫자: ')) to get number 10."
        }
      }
    },

    // errorQuiz 3: 두 입력을 합산하려는데 이어붙기
    {
      type: "errorQuiz",
      content: {
        question: "두 수의 합을 구하려는 코드야. 문제는?",
        code: "a = input('first number: ')  # enter '20'\nb = input('second number: ')  # enter '30'\nprint('total:', a + b)",
        options: [
          "input() 사용법이 잘못됨",
          "a + b 가 '2030'이 출력됨 (str 이어붙이기!)",
          "f-string을 써야 해"
        ],
        answer: 1,
        explanation: "input()은 항상 str을 반환해서 '20' + '30' = '2030'이 돼! int(input()) 으로 변환해야 50이 나와.",
        en: {
          question: "This code wants to sum two numbers. What's wrong?",
          options: [
            "input() usage is wrong",
            "a + b prints '2030' (string concatenation!)",
            "Should use f-string"
          ],
          explanation: "input() always returns str so '20' + '30' = '2030'! Must use int(input()) to get 50."
        }
      }
    },

    // practice: float 입력 (가격)
    {
      type: "practice",
      content: {
        level: 2,
        task: "상품 가격을 소수로 입력받아\n10% 할인된 가격을 출력해봐\n(입력: 50.0 → 출력: 45.0)",
        guide: "소수로 입력받을 땐 float()로 변환해요",
        hint: "float(input(...))으로 입력받고, 0.9를 곱하면 10% 할인이에요",
        template: null,
        answer: "price = float(input('가격: '))\nprint(price * 0.9)",
        expect: "45.0",
        en: {
          task: "Get a product price as float\nPrint the price after 10% discount\n(input: 50.0 → output: 45.0)",
          guide: "Use float() to receive decimal input",
          hint: "Receive with float(input(...)) and multiply by 0.9 for 10% discount"
        }
      }
    },

    // practice: 두 이름 이어붙이기
    {
      type: "practice",
      content: {
        level: 2,
        task: "성(last name)과 이름(first name)을 각각 입력받아\n이어붙여서 출력해봐\n(입력: '김', '민준' → 출력: 김민준)",
        guide: "input()은 str을 반환하니까 문자열 이어붙이기가 바로 돼요",
        hint: "각각 input()으로 받아서 + 로 이어붙여봐요",
        template: null,
        answer: "last = input('성: ')\nfirst = input('이름: ')\nprint(last + first)",
        expect: "김민준",
        en: {
          task: "Get last name and first name separately\nPrint them concatenated\n(input: '김', '민준' → output: 김민준)",
          guide: "input() returns str, so string concatenation works directly",
          hint: "Receive each with input() then join them with +"
        }
      }
    },

    // practice: 키 입력 → cm to m 변환
    {
      type: "practice",
      content: {
        level: 3,
        task: "키를 cm 단위로 정수로 입력받아\nm 단위 소수로 변환해서 출력해봐\n(입력: 170 → 출력: 1.7)",
        guide: "int()로 입력받고, 100으로 나누면 m 단위로 변환돼요",
        hint: "int(input(...))으로 정수로 받고, 100으로 나눠봐요",
        template: null,
        answer: "height_cm = int(input('키(cm): '))\nprint(height_cm / 100)",
        expect: "1.7",
        en: {
          task: "Get height in cm as integer\nConvert and print in meters\n(input: 170 → output: 1.7)",
          guide: "Receive with int(), then divide by 100 to convert to meters",
          hint: "Receive as int(input(...)) then divide by 100"
        }
      }
    },

    // practice: 세 과목 점수 평균
    {
      type: "practice",
      content: {
        level: 3,
        task: "세 과목 점수를 각각 int로 입력받아\n평균을 출력해봐\n(입력: 80, 90, 100 → 출력: 90.0)",
        guide: "세 번 int()로 입력받고, 합을 3으로 나눠요",
        hint: "세 변수를 각각 int(input(...))으로 받고 합 ÷ 3을 계산해봐요",
        template: null,
        answer: "a = int(input('국어: '))\nb = int(input('영어: '))\nc = int(input('수학: '))\nprint((a + b + c) / 3)",
        expect: "90.0",
        en: {
          task: "Get three subject scores as int input\nPrint the average\n(input: 80, 90, 100 → output: 90.0)",
          guide: "Receive three times with int(), then divide the sum by 3",
          hint: "Receive three variables with int(input(...)) each and calculate sum ÷ 3"
        }
      }
    },

    // quiz: 추가 퀴즈 — str * number 결과
    {
      type: "quiz",
      content: {
        question: "x = input()으로 '3'을 입력받은 후 x * 3의 결과는?",
        options: [
          "9",
          "'333'",
          "TypeError 발생",
          "'9'"
        ],
        answer: 1,
        explanation: "input()은 str을 반환해서 x는 '3'이야. str * 3은 문자열 반복이라 '333'이 돼!",
        en: {
          question: "After getting '3' via input() and storing in x, what is x * 3?",
          options: [
            "9",
            "'333'",
            "TypeError occurs",
            "'9'"
          ],
          explanation: "input() returns str so x is '3'. str * 3 is repetition so the result is '333'!"
        }
      }
    },

    // 최종 요약
    {
      type: "summary",
      content: {
        num: 4,
        title: "input() 마스터",
        learned: [
          "name = input('이름: ') → 문자열 입력",
          "age = int(input('나이: ')) → 정수 입력",
          "input()은 항상 str 반환",
          "계산하려면 int() 또는 float() 변환 필수"
        ],
        canDo: "사용자 입력으로 동작하는 프로그램을 만들 수 있어!",
        emoji: "🏆"
      }
    },

    // 완료
    {
      type: "done",
      content: {}
    }
  ]
};
