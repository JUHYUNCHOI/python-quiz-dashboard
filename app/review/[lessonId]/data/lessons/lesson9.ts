import { LessonData } from '../types';

export const lesson9: LessonData = {
  id: "9",
  title: "타입 변환",
  description: "int, float, str 자유자재로!",
  steps: [
    // ==================== CHAPTER 1: 동기 부여 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "타입 변환 소개",
        desc: "타입을 바꿔야 할 때!"
      }
    },

    // 프리뷰
    {
      type: "explain",
      content: {
        lines: [
          "🎯 오늘 만들 것!"
        ],
        code: "text = '100'\nnum = int(text)        # '100' → 100\nresult = num + 50\nprint(f'result: {result}')",
        result: "result: 150",
        isPreview: true,
        note: "문자열 숫자를 진짜 숫자로 바꿀 수 있어!"
      }
    },

    {
      type: "reward",
      content: {
        message: "타입 변환 마스터 시작!",
        emoji: "🔄"
      }
    },

    // ==================== CHAPTER 2: int() 변환 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "int() 변환",
        desc: "정수로 바꾸기!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "잠깐! 데이터 타입 기억나?",
        task: "type(42) 출력해봐",
        template: null,
        answer: "print(type(42))",
        expect: "<class 'int'>",
        en: {
          message: "Wait! Remember data types?",
          task: "Print type(42)"
        }
      }
    },

    // int() 기본
    {
      type: "explain",
      content: {
        lines: [
          "int() 로 정수로 변환해!"
        ],
        code: "int('123')   # → 123  (string → int)\nint(3.7)     # → 3   (truncates decimal!)\nint(3.2)     # → 3   (not rounded!)",
        note: "int(3.7) = 3 (반올림이 아니라 소수점 버림!)"
      }
    },

    // ===== Lv.1: int 변환 =====
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\n200",
        guide: "int()로 변환해서 출력!",
        hint: "문자열 '200'을 int()로 감싸서 출력해봐요",
        template: null,
        answer: "print(int('200'))",
        expect: "200",
        en: {
          task: "Make it print like this ↓\n200",
          guide: "Convert with int() and print!",
          hint: "Wrap the string '200' with int() and print it"
        }
      }
    },
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\n9",
        guide: "소수점 버림! 반올림 아님!",
        template: null,
        answer: "print(int(9.9))",
        expect: "9",
        en: {
          task: "Make it print like this ↓\n9",
          guide: "Truncates decimal! Not rounding!"
        }
      }
    },

    // 에러 퀴즈
    {
      type: "errorQuiz",
      content: {
        question: "이 코드는 어떻게 될까?",
        code: "print(int('hello'))",
        options: [
          "hello 출력",
          "0 출력",
          "ValueError 에러!"
        ],
        answer: 2,
        explanation: "숫자가 아닌 문자열은 int()로 변환할 수 없어! ValueError가 발생해.",
        en: {
          question: "What happens with this code?",
          options: [
            "Prints hello",
            "Prints 0",
            "ValueError error!"
          ],
          explanation: "Non-numeric strings can't be converted with int()! A ValueError occurs."
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "int(4.99) 의 결과는?",
        options: [
          "5 (반올림)",
          "4 (소수점 버림)",
          "에러"
        ],
        answer: 1,
        explanation: "int()는 반올림이 아니라 소수점을 버려! 4.99도 그냥 4가 돼.",
        en: {
          question: "What is the result of int(4.99)?",
          options: [
            "5 (rounded)",
            "4 (decimal truncated)",
            "Error"
          ],
          explanation: "int() truncates the decimal, not rounds! 4.99 becomes just 4."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 2,
        title: "int() 변환",
        learned: [
          "int('123') → 123 (문자열 → 정수)",
          "int(3.7) → 3 (소수점 버림!)",
          "int('hello') → ValueError"
        ],
        canDo: "문자열과 소수를 정수로 바꿀 수 있어!",
        emoji: "🔢"
      }
    },

    // ==================== CHAPTER 3: float(), str() 변환 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "float()와 str()",
        desc: "소수와 문자열로 바꾸기!"
      }
    },

    // float()
    {
      type: "explain",
      content: {
        lines: [
          "float() 로 소수로 변환해!"
        ],
        code: "float('3.14')  # → 3.14 (string → float)\nfloat(5)       # → 5.0  (int → float)",
        note: "float()는 소수점이 있는 숫자로 바꿔줘!"
      }
    },

    // ===== Lv.1: float 변환 =====
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\n3.14",
        guide: "float()로 변환해서 출력!",
        hint: "문자열 '3.14'를 float()로 감싸서 출력해봐요",
        template: null,
        answer: "print(float('3.14'))",
        expect: "3.14",
        en: {
          task: "Make it print like this ↓\n3.14",
          guide: "Convert with float() and print!",
          hint: "Wrap the string '3.14' with float() and print it"
        }
      }
    },
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\n10.0",
        guide: "정수 → 소수로 변환!",
        template: null,
        answer: "print(float(10))",
        expect: "10.0",
        en: {
          task: "Make it print like this ↓\n10.0",
          guide: "Convert integer → float!"
        }
      }
    },

    // str()
    {
      type: "explain",
      content: {
        lines: [
          "str() 로 문자열로 변환해!"
        ],
        code: "str(123)    # → '123' (int → string)\nstr(3.14)   # → '3.14' (float → string)\nstr(True)   # → 'True'",
        note: "str()은 무엇이든 문자열로 바꿔줘!"
      }
    },

    // ===== Lv.1: str 변환 =====
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\n2025",
        guide: "str()로 숫자를 문자열로!",
        hint: "숫자 2025를 str()로 감싸서 출력해봐요",
        template: null,
        answer: "print(str(2025))",
        expect: "2025",
        en: {
          task: "Make it print like this ↓\n2025",
          guide: "Convert number to string with str()!",
          hint: "Wrap the number 2025 with str() and print it"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "float('3.14') 의 결과 타입은?",
        options: [
          "str (문자열)",
          "int (정수)",
          "float (소수)"
        ],
        answer: 2,
        explanation: "float()은 소수로 변환하는 함수! 결과는 float 타입이야.",
        en: {
          question: "What is the result type of float('3.14')?",
          options: [
            "str (string)",
            "int (integer)",
            "float (decimal)"
          ],
          explanation: "float() converts to decimal! The result type is float."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 3,
        title: "float()와 str()",
        learned: [
          "float('3.14') → 3.14",
          "float(5) → 5.0",
          "str(123) → '123'"
        ],
        canDo: "소수와 문자열로도 변환할 수 있어!",
        emoji: "🔀"
      }
    },

    // ==================== CHAPTER 4: bool() 변환 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "bool() 변환",
        desc: "True vs False 판단!"
      }
    },

    // bool() - False인 것들
    {
      type: "explain",
      content: {
        lines: [
          "이것들은 False야!"
        ],
        code: "bool(0)     # → False (0 is False)\nbool('')    # → False (empty string)\nbool(None)  # → False",
        note: "0, 빈 문자열, None → False!"
      }
    },

    // bool() - True인 것들
    {
      type: "explain",
      content: {
        lines: [
          "이것들은 True야!"
        ],
        code: "bool(1)       # → True\nbool(-5)      # → True  (non-zero number)\nbool('hello') # → True  (non-empty string)",
        note: "0이 아닌 숫자, 내용 있는 문자열 → True!"
      }
    },

    // ===== Lv.2: bool 변환 =====
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\nFalse",
        guide: "0은 False야!",
        hint: "0을 bool()로 감싸서 출력해봐요",
        template: null,
        answer: "print(bool(0))",
        expect: "False",
        en: {
          task: "Make it print like this ↓\nFalse",
          guide: "0 is False!",
          hint: "Wrap 0 with bool() and print it"
        }
      }
    },
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\nTrue",
        guide: "내용 있는 문자열은 True!",
        template: null,
        answer: "print(bool('hello'))",
        expect: "True",
        en: {
          task: "Make it print like this ↓\nTrue",
          guide: "Non-empty strings are True!"
        }
      }
    },
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\nFalse",
        guide: "'' 빈 문자열은 False야!",
        template: null,
        answer: "print(bool(''))",
        expect: "False",
        en: {
          task: "Make it print like this ↓\nFalse",
          guide: "'' empty string is False!"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "bool(-100) 의 결과는?",
        options: [
          "False (음수니까)",
          "True (0이 아니니까)",
          "에러"
        ],
        answer: 1,
        explanation: "0이 아닌 숫자는 모두 True야! 음수도 포함이야.",
        en: {
          question: "What is the result of bool(-100)?",
          options: [
            "False (because it's negative)",
            "True (because it's not 0)",
            "Error"
          ],
          explanation: "Any non-zero number is True! Negative numbers included."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 4,
        title: "bool() 변환",
        learned: [
          "bool(0) → False",
          "bool('') → False (빈 문자열)",
          "bool('hello') → True",
          "0이 아닌 숫자 → True"
        ],
        canDo: "어떤 값이 True/False인지 판단할 수 있어!",
        emoji: "⚡"
      }
    },

    // ==================== CHAPTER 5: 프로젝트 ====================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "점수 계산기",
        desc: "타입 변환 총 활용!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "int 변환 기억나?",
        task: "int('500') + 200 을 출력해봐",
        template: null,
        answer: "print(int('500') + 200)",
        expect: "700",
        en: {
          message: "Remember int conversion?",
          task: "Print int('500') + 200"
        }
      }
    },

    // 프로젝트 소개
    {
      type: "explain",
      content: {
        lines: [
          "🧮 점수 계산기!"
        ],
        code: "=== Score Calculator ===\nKorean: 85\nMath: 92\nAverage: 88.5 points\nPassed: True",
        isPreview: true,
        note: "타입 변환으로 하나씩 만들어보자!"
      }
    },

    // 프로젝트
    {
      type: "project",
      content: {
        step: 1,
        total: 4,
        task: "제목 출력",
        target: "=== 점수 계산기 ===",
        hint: "print('=== 점수 계산기 ===')",
        done: [],
        answer: "print('=== 점수 계산기 ===')"
      }
    },
    {
      type: "project",
      content: {
        step: 2,
        total: 4,
        task: "korean = '85', math = '92' 로 변수 만들고\n각 점수 출력 (int 변환해서 출력)",
        target: "국어: 85\n수학: 92",
        hint: "print('국어:', int(korean))\nprint('수학:', int(math))",
        done: ["=== 점수 계산기 ==="],
        answer: "korean = '85'\nmath = '92'\nprint('국어:', int(korean))\nprint('수학:', int(math))"
      }
    },
    {
      type: "project",
      content: {
        step: 3,
        total: 4,
        task: "두 점수의 평균을 소수점 1자리로 출력",
        target: "평균: 88.5점",
        hint: "avg = (int(korean) + int(math)) / 2\nf'평균: {avg:.1f}점'",
        done: ["=== 점수 계산기 ===", "국어: 85", "수학: 92"],
        answer: "avg = (int(korean) + int(math)) / 2\nprint(f'평균: {avg:.1f}점')"
      }
    },
    {
      type: "project",
      content: {
        step: 4,
        total: 4,
        task: "평균이 60 이상이면 합격 여부 출력\n(bool 결과 그대로 출력)",
        target: "합격 여부: True",
        hint: "print('합격 여부:', avg >= 60)",
        done: ["=== 점수 계산기 ===", "국어: 85", "수학: 92", "평균: 88.5점"],
        answer: "print('합격 여부:', avg >= 60)"
      }
    },

    // ==================== 추가 예측 & 심화 ====================

    // predict 1: int() 소수점 버림
    {
      type: "explain",
      content: {
        lines: ["코드 결과를 예측해봐!"],
        code: "print(int(9.99))",
        predict: {
          options: ["10 (반올림)", "9 (소수점 버림)", "9.99 (변화 없음)", "에러"],
          answer: 1,
          feedback: "int()는 반올림이 아니라 소수점을 버려! 9.99 → 9"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["10 (rounded)", "9 (decimal truncated)", "9.99 (no change)", "Error"],
            feedback: "int() truncates, not rounds! 9.99 → 9"
          }
        }
      }
    },

    // predict 2: bool() 음수
    {
      type: "explain",
      content: {
        lines: ["코드 결과를 예측해봐!"],
        code: "print(bool(-99))",
        predict: {
          options: ["True", "False", "-99", "에러"],
          answer: 0,
          feedback: "0이 아닌 모든 숫자는 True야! 음수도 마찬가지. bool(-99) → True"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["True", "False", "-99", "Error"],
            feedback: "Any non-zero number is True! Negative numbers too. bool(-99) → True"
          }
        }
      }
    },

    // predict 3: str() + 이어붙이기
    {
      type: "explain",
      content: {
        lines: ["코드 결과를 예측해봐!"],
        code: "year = 2025\nprint('This year is ' + str(year))",
        predict: {
          options: ["올해는 year년", "올해는 2025년", "에러", "올해는 '2025'년"],
          answer: 1,
          feedback: "str(2025)는 '2025'(문자열)로 바꿔줘! 그래서 이어붙이기가 가능하고 '올해는 2025년'이 출력돼."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["올해는 year년", "올해는 2025년", "Error", "올해는 '2025'년"],
            feedback: "str(2025) converts to '2025' (string)! So concatenation works and '올해는 2025년' is printed."
          }
        }
      }
    },

    // predict 4: 타입 연산 오류 예측
    {
      type: "explain",
      content: {
        lines: ["코드 결과를 예측해봐!"],
        code: "a = '10'\nb = 5\nprint(int(a) + b)",
        predict: {
          options: ["105 (문자열 이어붙기)", "15 (정수 덧셈)", "에러", "'10'5"],
          answer: 1,
          feedback: "int(a)로 '10' → 10으로 변환한 뒤 b(5)와 더해! 10 + 5 = 15"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["105 (string concat)", "15 (integer addition)", "Error", "'10'5"],
            feedback: "int(a) converts '10' → 10, then adds b(5)! 10 + 5 = 15"
          }
        }
      }
    },

    // errorQuiz 1: str + int 직접 이어붙이기
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제는?",
        code: "score = 95\nprint('score: ' + score)",
        options: [
          "문자열과 정수는 +로 이어붙일 수 없어 — str(score)로 변환해야 해",
          "변수 score가 선언되지 않음",
          "print()에 +를 쓸 수 없음"
        ],
        answer: 0,
        explanation: "Python에서 문자열 + 정수는 TypeError! str(score)로 변환하거나 f-string을 써야 해: '점수: ' + str(score) 또는 f'점수: {score}'",
        en: {
          question: "What's wrong with this code?",
          options: [
            "Can't concatenate string and int with + — must convert with str(score)",
            "Variable score is not declared",
            "Can't use + inside print()"
          ],
          explanation: "String + integer causes TypeError in Python! Use str(score) or f-string: '점수: ' + str(score) or f'점수: {score}'"
        }
      }
    },

    // errorQuiz 2: float() 숫자형 문자열 착각
    {
      type: "errorQuiz",
      content: {
        question: "이 코드는 어떻게 될까?",
        code: "text = '3.14abc'\nprint(float(text))",
        options: [
          "3.14가 출력돼 (숫자 부분만 변환)",
          "ValueError 에러! 숫자가 아닌 문자가 섞여 있어",
          "0.0이 출력돼"
        ],
        answer: 1,
        explanation: "float()은 순수한 숫자 문자열만 변환할 수 있어! '3.14abc'처럼 문자가 섞이면 ValueError 발생.",
        en: {
          question: "What happens with this code?",
          options: [
            "Prints 3.14 (converts number part only)",
            "ValueError! Mixed with non-numeric characters",
            "Prints 0.0"
          ],
          explanation: "float() can only convert pure numeric strings! '3.14abc' has letters mixed in → ValueError."
        }
      }
    },

    // practice 1: int() + float() 혼합 계산
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\n합계: 108.5",
        guide: "a = '100', b = '8.5' 변수 만들고\nint(a) + float(b) 결과를 f-string으로 출력해봐",
        template: "a = '100'\nb = '8.5'\nprint(___)",
        answer: "f'합계: {int(a) + float(b)}'",
        expect: "합계: 108.5",
        en: {
          task: "Make it print like this ↓\n합계: 108.5",
          guide: "Create a = '100', b = '8.5' and print int(a) + float(b) with f-string"
        }
      }
    },

    // practice 2: bool() 여러 값 비교
    {
      type: "practice",
      content: {
        task: "이렇게 나오게 해봐 ↓\nFalse\nTrue\nFalse",
        guide: "bool(0), bool(42), bool('') 를 차례로 출력해봐",
        template: "print(___)\nprint(___)\nprint(___)",
        answer: "print(bool(0))\nprint(bool(42))\nprint(bool(''))",
        expect: "False\nTrue\nFalse",
        en: {
          task: "Make it print like this ↓\nFalse\nTrue\nFalse",
          guide: "Print bool(0), bool(42), bool('') in order"
        }
      }
    },

    // 최종 요약
    {
      type: "summary",
      content: {
        num: 5,
        title: "타입 변환 마스터",
        learned: [
          "int('123') → 123",
          "int(3.7) → 3 (소수점 버림!)",
          "float('3.14') → 3.14",
          "str(123) → '123'",
          "bool(0) → False, bool('') → False"
        ],
        canDo: "필요에 따라 타입을 자유롭게 변환할 수 있어!",
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
