import type { LessonData } from '../types'

export const lesson34: LessonData = {
  id: "34",
  title: "에러 처리하기",
  description: "try-except로 에러를 잡아요!",
  steps: [
    // ============================================
    // Chapter 1: 에러 처리 기초
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "에러 처리 기초",
        desc: "왜 에러 처리가 필요할까?"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["숫자를 입력받는 프로그램인데...", "사용자가 'abc'를 입력하면? 💥"],
        code: `숫자 = int(input('숫자: '))
# 'abc' 입력하면?
print(숫자 * 2)`,
        isError: true,
        result: "ValueError! 프로그램 끝!",
        note: "문자를 숫자로 바꾸려니까 에러가 나요"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["이걸 막으려면 try-except를 써요!", "아래 코드를 봐봐 👇"],
        code: `try:
    숫자 = int(input('숫자: '))
    print(숫자 * 2)
except:
    print('숫자를 입력하세요!')`,
        result: "숫자를 입력하세요!",
        note: "try = 시도해봐, except = 에러나면 이거 해!"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["그럼 이 코드는 어떻게 될까?", "0으로 나누면... 🤔"],
        code: `try:
    print(10 / 0)
except:
    print('에러!')`,
        predict: {
          question: "출력 결과는?",
          options: ["10", "0", "에러!", "프로그램 멈춤"],
          answer: 2,
          feedback: "0으로 나누면 에러! except가 잡아요!"
        },
        result: "에러!"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["그럼 에러가 안 나는 경우는?", "10 나누기 2는 문제없잖아!"],
        code: `try:
    print(10 / 2)
except:
    print('에러!')`,
        predict: {
          question: "출력 결과는?",
          options: ["5.0", "에러!", "10 / 2", "아무것도 없음"],
          answer: 0,
          feedback: "에러가 안 나면 try만 실행돼요!"
        },
        result: "5.0"
      }
    },
    
    // ⭐ 연습 1 — 빈칸 1개
    {
      type: "practice",
      content: {
        level: 1,
        task: "___ 자리에 알맞은 단어를 넣어보세요!",
        guide: "에러가 날 수 있는 코드 앞에 뭘 써야 할까?",
        hint: "'시도하다'를 영어로! t로 시작해요",
        template: "___:\n    x = int('abc')\n    print(x)\nexcept:\n    print('변환 실패!')",
        blanksAnswer: ["try"],
        answer: "try:\n    x = int('abc')\n    print(x)\nexcept:\n    print('변환 실패!')",
        alternateAnswers: [
          "try:\n    x = int('abc')\n    print(x)\nexcept ValueError:\n    print('변환 실패!')"
        ],
        expect: "변환 실패!"
      }
    },
    
    {
      type: "reward",
      content: {
        emoji: "🛡️",
        message: "에러 처리 기초 완료!"
      }
    },
    
    // ============================================
    // Chapter 2: 에러 종류
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "에러 종류",
        desc: "어떤 에러가 있을까?"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["에러에도 이름이 있어요!", "'abc'를 숫자로 바꾸려고 하면..."],
        code: `int('abc')    # ValueError`,
        isError: true,
        result: "ValueError — 값이 이상해!",
        note: "문자를 숫자로 바꿀 수 없으니까 ValueError"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["그럼 0으로 나누면 뭘까?"],
        code: `10 / 0        # ZeroDivisionError`,
        isError: true,
        result: "ZeroDivisionError — 0으로 못 나눠!",
        note: "수학에서도 0으로 나누기는 안 되잖아!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["없는 파일을 열려고 하면?"],
        code: `open('없는파일.txt')  # FileNotFoundError`,
        isError: true,
        result: "FileNotFoundError — 파일이 없어!",
        note: "이렇게 에러마다 이름이 달라요"
      }
    },
    
    {
      type: "quiz",
      content: {
        question: "int('hello')는 어떤 에러?",
        options: ["ZeroDivisionError", "ValueError", "FileNotFoundError", "에러 없음"],
        answer: 1,
        explanation: "'hello'는 숫자가 아니라서 ValueError!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "10 / 0은 어떤 에러?",
        options: ["ValueError", "ZeroDivisionError", "FileNotFoundError", "에러 없음"],
        answer: 1,
        explanation: "0으로 나누면 ZeroDivisionError!"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["에러 이름을 알면 좋은 점이 있어요", "except 뒤에 이름을 쓰면 그것만 잡아요!"],
        code: `try:
    숫자 = int('abc')
except ValueError:
    print('숫자가 아니에요!')`,
        result: "숫자가 아니에요!",
        note: "except ValueError: → ValueError만 잡아요"
      }
    },
    
    // ⭐ 연습 2 — 빈칸 2개
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "___ 자리를 채워서 ValueError만 잡으세요!",
        guide: "except 뒤에 에러 이름을 써요!",
        hint: "값(Value)이 잘못됐을 때 나는 에러 이름은?",
        template: "try:\n    숫자 = int('abc')\n___ ___:\n    print('숫자가 아니에요!')",
        blanksAnswer: ["except", "ValueError"],
        answer: "try:\n    숫자 = int('abc')\nexcept ValueError:\n    print('숫자가 아니에요!')",
        alternateAnswers: [],
        expect: "숫자가 아니에요!"
      }
    },
    
    {
      type: "reward",
      content: {
        emoji: "📋",
        message: "에러 종류 이해!"
      }
    },
    
    // ============================================
    // Chapter 3: 여러 에러 처리
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "여러 에러 처리",
        desc: "에러별로 다르게!"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["에러가 여러 종류일 수도 있잖아?", "except를 여러 개 쓰면 각각 잡을 수 있어요!"],
        code: `try:
    a = int(input())
    b = int(input())
    print(a / b)
except ValueError:
    print('숫자를 입력!')
except ZeroDivisionError:
    print('0으로 못 나눠!')`,
        result: "에러 종류별로 다른 메시지!",
        note: "'abc' → ValueError / 0 → ZeroDivisionError"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["여기서 'abc'를 입력하면?", "어떤 except가 실행될까?"],
        code: `try:
    x = int(input())  # 'abc' 입력
    print(10 / x)
except ValueError:
    print('A')
except ZeroDivisionError:
    print('B')`,
        predict: {
          question: "출력 결과는?",
          options: ["A", "B", "A와 B 둘 다", "에러"],
          answer: 0,
          feedback: "'abc'는 숫자 변환 실패 → ValueError → 'A'"
        },
        result: "A"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["이번엔 '0'을 입력하면?", "int('0')은 성공하는데... 그 다음은?"],
        code: `try:
    x = int(input())  # '0' 입력
    print(10 / x)
except ValueError:
    print('A')
except ZeroDivisionError:
    print('B')`,
        predict: {
          question: "출력 결과는?",
          options: ["A", "B", "10", "에러"],
          answer: 1,
          feedback: "int('0')은 성공! 10/0은 ZeroDivisionError → 'B'"
        },
        result: "B"
      }
    },
    
    // ⭐ 연습 3 — 빈칸 3개 (함수 없이, 여러 except)
    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워서 두 가지 에러를 잡으세요!",
        guide: "ValueError와 ZeroDivisionError를 각각 잡아요",
        hint: "try로 감싸고, except 뒤에 에러 이름!",
        template: "___:\n    x = int(input('숫자: '))\n    print(10 / x)\nexcept ___:\n    print('숫자가 아니에요!')\nexcept ___:\n    print('0으로 못 나눠!')",
        blanksAnswer: ["try", "ValueError", "ZeroDivisionError"],
        answer: "try:\n    x = int(input('숫자: '))\n    print(10 / x)\nexcept ValueError:\n    print('숫자가 아니에요!')\nexcept ZeroDivisionError:\n    print('0으로 못 나눠!')",
        alternateAnswers: [],
        expect: ""
      }
    },
    
    // 인터리빙 1 — 빈칸 2개 (기초 복습)
    {
      type: "interleaving",
      content: {
        message: "🔄 잠깐! 기초 복습!",
        task: "___ 자리를 채워서 에러가 나도 '완료'가 나오게 하세요!",
        hint: "try-except로 에러 잡고, 마지막 print는 try 바깥!",
        template: "___:\n    x = int('abc')\n___:\n    print('에러!')\n\nprint('완료')",
        blanksAnswer: ["try", "except"],
        answer: "try:\n    x = int('abc')\nexcept:\n    print('에러!')\n\nprint('완료')",
        alternateAnswers: [
          "try:\n    x = int('abc')\nexcept ValueError:\n    print('에러!')\n\nprint('완료')"
        ],
        expect: "에러!\n완료"
      }
    },
    
    {
      type: "reward",
      content: {
        emoji: "🎯",
        message: "여러 에러 처리 완료!"
      }
    },
    
    // ============================================
    // Chapter 4: 게임 메뉴 만들기
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "실전: 게임 메뉴",
        desc: "안전한 메뉴 만들기!"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["게임 메뉴를 만든다고 생각해봐!", "사용자가 이상한 걸 입력해도 멈추면 안 되잖아?", "while + try-except를 같이 쓰면 돼요 👇"],
        code: `while True:
    try:
        선택 = int(input('선택: '))
        if 선택 == 1:
            print('시작!')
        elif 선택 == 2:
            break
    except ValueError:
        print('숫자만!')`,
        result: "에러가 나도 게임이 계속돼요!",
        note: "사용자 입력은 항상 try-except로 감싸자!"
      }
    },
    
    // ⭐ 연습 4 — 빈칸 3개 (try + break + ValueError)
    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워서 게임 메뉴를 완성하세요!",
        guide: "while + try-except + if-elif로 메뉴 처리!",
        hint: "try로 감싸고, 3번이면 break, 숫자 아니면 except ValueError!",
        template: "while True:\n    print('1.새게임 2.저장 3.종료')\n    ___:\n        선택 = int(input('선택: '))\n        if 선택 == 1:\n            print('새 게임!')\n        elif 선택 == 2:\n            print('저장!')\n        elif 선택 == 3:\n            ___\n        else:\n            print('1-3 사이로!')\n    except ___:\n        print('숫자만!')",
        blanksAnswer: ["try", "break", "ValueError"],
        answer: "while True:\n    print('1.새게임 2.저장 3.종료')\n    try:\n        선택 = int(input('선택: '))\n        if 선택 == 1:\n            print('새 게임!')\n        elif 선택 == 2:\n            print('저장!')\n        elif 선택 == 3:\n            break\n        else:\n            print('1-3 사이로!')\n    except ValueError:\n        print('숫자만!')",
        alternateAnswers: [
          "while True:\n    print('1.새게임 2.저장 3.종료')\n    try:\n        선택 = int(input('선택: '))\n        if 선택 == 1:\n            print('새 게임!')\n        elif 선택 == 2:\n            print('저장!')\n        elif 선택 == 3:\n            break\n        else:\n            print('1-3 사이로!')\n    except:\n        print('숫자만!')"
        ],
        expect: "새 게임!"
      }
    },

    // 예측 퀴즈 — 연습 사이에 숨쉬기
    {
      type: "explain",
      content: {
        lines: ["잘하고 있어요! 하나만 더 확인 👀", "이 코드에서 'abc' 입력하면?"],
        code: `while True:
    try:
        x = int(input())
        break
    except ValueError:
        print('다시!')`,
        predict: {
          question: "'abc' 입력 → '5' 입력하면?",
          options: ["다시!", "다시! → (종료)", "에러", "다시! → 다시!"],
          answer: 1,
          feedback: "'abc' → except → '다시!' 출력 → '5' → break로 종료!"
        },
        result: "다시!"
      }
    },
    
    // ⭐ 연습 5 — 빈칸 4개 (while + 두 가지 에러)
    {
      type: "practice",
      content: {
        level: 2.5,
        task: "___ 자리를 채워서 안전한 계산기를 만드세요!",
        guide: "while로 반복하면서 두 가지 에러를 잡아요!",
        hint: "try 안에서 성공하면 break, 문자 입력은 ValueError, 0 입력은 ZeroDivisionError!",
        template: "while True:\n    try:\n        숫자 = int(input('숫자: '))\n        print(100 / 숫자)\n        ___\n    except ___:\n        print('숫자를 입력!')\n    except ___:\n        print('0은 안돼!')",
        blanksAnswer: ["break", "ValueError", "ZeroDivisionError"],
        answer: "while True:\n    try:\n        숫자 = int(input('숫자: '))\n        print(100 / 숫자)\n        break\n    except ValueError:\n        print('숫자를 입력!')\n    except ZeroDivisionError:\n        print('0은 안돼!')",
        alternateAnswers: [],
        expect: ""
      }
    },

    // ⭐ 연습 6 — 빈칸 4개 (while+try 핵심만)
    {
      type: "practice",
      content: {
        level: 3,
        task: "___ 자리를 채워서 숫자 입력 반복 코드를 완성하세요!",
        guide: "while True + try-except + break 조합!",
        hint: "try 안에서 성공하면 break, 실패하면 except ValueError",
        template: "while True:\n    ___:\n        x = int(input('숫자: '))\n        print(f'입력: {x}')\n        ___\n    ___ ___:\n        print('숫자를 입력하세요!')",
        blanksAnswer: ["try", "break", "except", "ValueError"],
        answer: "while True:\n    try:\n        x = int(input('숫자: '))\n        print(f'입력: {x}')\n        break\n    except ValueError:\n        print('숫자를 입력하세요!')",
        alternateAnswers: [
          "while True:\n    try:\n        x = int(input('숫자: '))\n        print(f'입력: {x}')\n        break\n    except:\n        print('숫자를 입력하세요!')"
        ],
        expect: "입력: 5"
      }
    },
    
    // 인터리빙 2 — 빈칸 2개 (에러 종류 복습)
    {
      type: "interleaving",
      content: {
        message: "🔄 에러 종류 복습!",
        task: "___ 자리를 채워서 0으로 나누는 에러를 잡으세요!",
        hint: "0으로 나누는 에러 이름은 ZeroDivision...Error",
        template: "___:\n    print(10 / 0)\nexcept ___:\n    print('0으로 못 나눠!')",
        blanksAnswer: ["try", "ZeroDivisionError"],
        answer: "try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print('0으로 못 나눠!')",
        alternateAnswers: [],
        expect: "0으로 못 나눠!"
      }
    },
    
    // 인터리빙 3 — 빈칸 3개 (리스트 + try-except 조합)
    {
      type: "interleaving",
      content: {
        message: "🔄 심화 복습!",
        task: "___ 자리를 채워서 리스트의 문자를 안전하게 숫자로 바꿔보세요!",
        hint: "for로 리스트를 돌면서, int() 변환을 try-except로 감싸요!",
        template: "데이터 = ['10', 'abc', '30']\n결과 = []\nfor x in 데이터:\n    ___:\n        결과.append(___(x))\n    except ___:\n        print(f'{x}는 숫자가 아님!')\nprint(결과)",
        blanksAnswer: ["try", "int", "ValueError"],
        answer: "데이터 = ['10', 'abc', '30']\n결과 = []\nfor x in 데이터:\n    try:\n        결과.append(int(x))\n    except ValueError:\n        print(f'{x}는 숫자가 아님!')\nprint(결과)",
        alternateAnswers: [],
        expect: "abc는 숫자가 아님!\n[10, 30]"
      }
    },

    {
      type: "reward",
      content: {
        emoji: "🎮",
        message: "게임 메뉴 완성!"
      }
    },
    
    // ============================================
    // Chapter 5: 에러 탐정
    // ============================================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "에러 탐정",
        desc: "실수 찾기!"
      }
    },
    
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `try
    x = int('abc')
except:
    print('에러!')`,
        options: [
          "try 뒤에 : 빠짐",
          "except 오류",
          "print 오류",
          "문제 없음"
        ],
        answer: 0,
        explanation: "try: 처럼 콜론(:)이 필요해요!"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `try:
    x = int('abc')
except ValueError
    print('에러!')`,
        options: [
          "try 오류",
          "except 뒤에 : 빠짐",
          "print 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "except ValueError: 처럼 콜론(:)이 필요해요!"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `try:
x = int('abc')
except:
    print('에러!')`,
        options: [
          "들여쓰기 없음",
          "except 오류",
          "print 오류",
          "문제 없음"
        ],
        answer: 0,
        explanation: "try: 안의 코드는 들여쓰기 필요!"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 출력은?",
        code: `try:
    print('A')
    x = int('abc')
    print('B')
except:
    print('C')`,
        options: [
          "A B C",
          "A C",
          "C",
          "A B"
        ],
        answer: 1,
        explanation: "'A' 출력 → 에러 발생 → 'B' 건너뜀 → 'C' 출력"
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
        desc: "에러 처리 총정리!"
      }
    },
    
    {
      type: "summary",
      content: {
        num: 1,
        title: "에러 처리",
        emoji: "🛡️",
        learned: [
          "try: 에러가 날 수 있는 코드",
          "except: 에러나면 실행할 코드",
          "except 에러이름: 특정 에러만 잡기",
          "ValueError: 값 변환 실패",
          "ZeroDivisionError: 0으로 나누기",
          "사용자 입력은 항상 try-except!"
        ],
        canDo: "에러가 나도 프로그램이 안 꺼지게 할 수 있어요!"
      }
    },
    
    {
      type: "done",
      content: {}
    }
  ]
}
