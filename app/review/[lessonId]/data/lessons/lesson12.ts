import { LessonData } from '../types';

export const lesson12: LessonData = {
  id: "12",
  title: "조건문 심화",
  description: "and, or, not 으로 복합 조건!",
  steps: [
    // ==================== CHAPTER 1: 동기 부여 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "논리 연산자 소개",
        desc: "and, or, not 으로 조건 조합!"
      }
    },

    // 프리뷰
    {
      type: "explain",
      content: {
        lines: [
          "🎯 오늘 만들 것!"
        ],
        code: "age = 16\nhas_ticket = True\n\nif age >= 13 and has_ticket:\n    print('entry allowed!')\nelse:\n    print('entry denied')",
        result: "entry allowed!",
        isPreview: true,
        note: "여러 조건을 and, or, not 으로 조합해!"
      }
    },

    {
      type: "reward",
      content: {
        message: "조건문 심화 시작!",
        emoji: "🔗"
      }
    },

    // ==================== CHAPTER 2: and ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "and",
        desc: "둘 다 True여야 True!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "잠깐! 조건문 기억나?",
        task: "score = 80 으로 변수 만들고\n80 이상이면 '합격' 출력해봐",
        template: null,
        answer: "score = 80\nif score >= 80:\n    print('합격')",
        expect: "합격",
        en: {
          message: "Wait! Remember conditionals?",
          task: "Create variable score = 80\nif 80 or above print '합격'"
        }
      }
    },

    // and 기본
    {
      type: "explain",
      content: {
        lines: [
          "and: 둘 다 True여야 True!"
        ],
        code: "True and True   # → True\nTrue and False  # → False\nFalse and True  # → False\nFalse and False # → False",
        note: "하나라도 False면 전체가 False!"
      }
    },

    // and 실전
    {
      type: "explain",
      content: {
        lines: [
          "and 실전 예시!"
        ],
        code: "age = 16\nmoney = 10000\n\nif age >= 13 and money >= 8000:\n    print('영화 관람 가능!')\nelse:\n    print('조건 미충족')",
        result: "영화 관람 가능!",
        note: "나이도 맞고, 돈도 있어야 관람 가능!"
      }
    },

    // ===== Lv.2: and =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "temp = 22, rain = False 로 변수 만들고,\n온도가 15~28이고 비가 안 오면 '소풍 가자!' 출력해봐",
        guide: "and로 두 조건을 연결하고, 비가 안 오는 조건은 not으로 반전해!",
        template: null,
        answer: "temp = 22\nrain = False\nif temp >= 15 and temp <= 28 and not rain:\n    print('소풍 가자!')\nelse:\n    print('집에 있자')",
        expect: "소풍 가자!",
        en: {
          task: "Create variables temp = 22, rain = False,\nif temperature is 15~28 and it's not raining print '소풍 가자!'",
          guide: "Connect two conditions with and, and use not to reverse the rain condition!"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "True and False and True 의 결과는?",
        options: [
          "True (True가 더 많으니까)",
          "False (하나라도 False면)",
          "에러"
        ],
        answer: 1,
        explanation: "and는 모두 True여야 True! 하나라도 False면 전체 False. True and False = False!",
        en: {
          question: "What is the result of True and False and True?",
          options: [
            "True (because more Trues)",
            "False (even one False makes it False)",
            "Error"
          ],
          explanation: "and requires ALL to be True! Even one False makes the whole thing False. True and False = False!"
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 2,
        title: "and",
        learned: [
          "and: 둘 다 True여야 True",
          "하나라도 False면 전체 False",
          "여러 조건을 동시에 확인할 때 사용"
        ],
        canDo: "여러 조건이 모두 충족될 때를 처리할 수 있어!",
        emoji: "✅"
      }
    },

    // ==================== CHAPTER 3: or ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "or",
        desc: "하나만 True여도 True!"
      }
    },

    // or 기본
    {
      type: "explain",
      content: {
        lines: [
          "or: 하나만 True여도 True!"
        ],
        code: "True or False   # → True\nFalse or True   # → True\nFalse or False  # → False\nTrue or True    # → True",
        note: "둘 다 False일 때만 False!"
      }
    },

    // or 실전
    {
      type: "explain",
      content: {
        lines: [
          "or 실전 예시!"
        ],
        code: "has_card = False\nhas_cash = True\n\nif has_card or has_cash:\n    print('결제 가능!')\nelse:\n    print('결제 수단 없음')",
        result: "결제 가능!",
        note: "카드 OR 현금, 하나만 있어도 결제 가능!"
      }
    },

    // ===== Lv.2: or =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "day = '토요일' 로 변수 만들고,\n'토요일' 또는 '일요일' 이면 '주말이다!' 출력해봐",
        guide: "or로 두 가지 값 중 하나인지 확인해!",
        template: null,
        answer: "day = '토요일'\nif day == '토요일' or day == '일요일':\n    print('주말이다!')\nelse:\n    print('평일이다')",
        expect: "주말이다!",
        en: {
          task: "Create variable day = '토요일',\nif '토요일' or '일요일' print '주말이다!'",
          guide: "Use or to check if the value matches one of two options!"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "False or False or True 의 결과는?",
        options: [
          "False (False가 더 많으니까)",
          "True (하나라도 True면)",
          "에러"
        ],
        answer: 1,
        explanation: "or는 하나라도 True면 True! 마지막 True 덕분에 전체가 True야.",
        en: {
          question: "What is the result of False or False or True?",
          options: [
            "False (because more Falses)",
            "True (even one True makes it True)",
            "Error"
          ],
          explanation: "or is True if even one is True! Thanks to the last True, the whole thing is True."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 3,
        title: "or",
        learned: [
          "or: 하나만 True여도 True",
          "둘 다 False일 때만 False",
          "선택지 중 하나라도 맞을 때 사용"
        ],
        canDo: "둘 중 하나라도 맞는 조건을 처리할 수 있어!",
        emoji: "🔀"
      }
    },

    // ==================== CHAPTER 4: not ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "not",
        desc: "True ↔ False 반전!"
      }
    },

    // not 기본
    {
      type: "explain",
      content: {
        lines: [
          "not: True와 False를 뒤집어!"
        ],
        code: "not True   # → False\nnot False  # → True",
        note: "not은 반대로 뒤집어!"
      }
    },

    // not 실전
    {
      type: "explain",
      content: {
        lines: [
          "not 실전 예시!"
        ],
        code: "is_raining = False\n\nif not is_raining:\n    print('산책 가자!')\nelse:\n    print('집에 있자')",
        result: "산책 가자!",
        note: "비가 안 오면(not is_raining) 산책!"
      }
    },

    // ===== Lv.2: not =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "logged_in = False 로 변수 만들고,\n로그인이 안 됐으면 '로그인이 필요합니다' 출력해봐",
        guide: "not으로 True/False를 반전해서 '안 됐으면' 이라는 조건을 표현해!",
        template: null,
        answer: "logged_in = False\nif not logged_in:\n    print('로그인이 필요합니다')",
        expect: "로그인이 필요합니다",
        en: {
          task: "Create variable logged_in = False,\nif not logged in print '로그인이 필요합니다'",
          guide: "Use not to flip True/False and express the 'is not' condition!"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "not (3 > 5) 의 결과는?",
        options: [
          "True",
          "False",
          "에러"
        ],
        answer: 0,
        explanation: "3 > 5는 False! not False = True. 괄호 안이 먼저 계산돼.",
        en: {
          question: "What is the result of not (3 > 5)?",
          options: [
            "True",
            "False",
            "Error"
          ],
          explanation: "3 > 5 is False! not False = True. The inside of the parentheses is calculated first."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 4,
        title: "not",
        learned: [
          "not True → False",
          "not False → True",
          "조건을 반전시킬 때 사용"
        ],
        canDo: "조건을 반전시킬 수 있어!",
        emoji: "🔄"
      }
    },

    // ==================== CHAPTER 5: 복합 조건과 연결 비교 ====================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "복합 조건",
        desc: "Python의 특별한 연결 비교!"
      }
    },

    // 복합 조건
    {
      type: "explain",
      content: {
        lines: [
          "and, or, not 을 함께 써!"
        ],
        code: "age = 16\nscore = 85\n\n# 나이 13~19이고 점수 >= 80이면 장학금!\nif age >= 13 and age < 19 and score >= 80:\n    print('장학금 대상!')",
        result: "장학금 대상!",
        note: "조건을 and로 여러 개 연결해!"
      }
    },

    // Python 연결 비교
    {
      type: "explain",
      content: {
        lines: [
          "Python 특성: 연결 비교가 가능해!"
        ],
        code: "x = 5\n\n# Python 방식 (간결!)\nif 1 < x < 10:\n    print('범위 안')\n\n# 다른 언어 방식\nif x > 1 and x < 10:\n    print('범위 안')",
        result: "범위 안\n범위 안",
        note: "1 < x < 10 처럼 수학처럼 쓸 수 있어! Python만의 특성!"
      }
    },

    // ===== Lv.3: 복합 조건 =====
    {
      type: "practice",
      content: {
        level: 3,
        task: "n = 7 로 변수 만들고,\n1 이상 10 미만이면 '범위 안' 출력해봐\n(Python 연결 비교 방식으로!)",
        guide: "Python에서는 수학처럼 범위를 한 번에 표현할 수 있어!",
        template: null,
        answer: "n = 7\nif 1 <= n < 10:\n    print('범위 안')",
        expect: "범위 안",
        en: {
          task: "Create variable n = 7,\nif 1 or above and less than 10 print '범위 안'\n(Using Python chained comparison!)",
          guide: "In Python you can express a range in one go, just like in math!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "score = 72, attend = True 로 변수 만들고,\n점수 60 이상이고 출석이 True면 '최종 합격'\n아니면 '불합격' 출력해봐",
        template: null,
        answer: "score = 72\nattend = True\nif score >= 60 and attend:\n    print('최종 합격')\nelse:\n    print('불합격')",
        expect: "최종 합격",
        en: {
          task: "Create variables score = 72, attend = True,\nif score 60+ and attendance is True print '최종 합격'\notherwise print '불합격'"
        }
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "x = 5 일 때, 1 < x < 10 의 결과는?",
        options: [
          "True",
          "False",
          "Python에서는 에러"
        ],
        answer: 0,
        explanation: "Python에서 1 < x < 10 처럼 수학처럼 연결 비교가 가능해! 5는 1초과 10미만이므로 True.",
        en: {
          question: "When x = 5, what is the result of 1 < x < 10?",
          options: [
            "True",
            "False",
            "Error in Python"
          ],
          explanation: "In Python, you can chain comparisons like 1 < x < 10 just like in math! 5 is greater than 1 and less than 10, so True."
        }
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 5,
        title: "복합 조건",
        learned: [
          "age >= 13 and age < 19 → 복합 조건",
          "1 < x < 10 → Python 연결 비교",
          "and / or / not 조합 가능"
        ],
        canDo: "복잡한 조건도 정확하게 표현할 수 있어!",
        emoji: "🎯"
      }
    },

    // ==================== CHAPTER 6: 프로젝트 ====================
    {
      type: "chapter",
      content: {
        num: 6,
        title: "놀이공원 입장 시스템",
        desc: "논리 연산자 총 활용!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "연결 비교 기억나?",
        task: "x = 15 로 변수 만들고\n10 이상 20 미만이면 '통과' 출력해봐",
        template: null,
        answer: "x = 15\nif 10 <= x < 20:\n    print('통과')",
        expect: "통과",
        en: {
          message: "Remember chained comparison?",
          task: "Create variable x = 15\nif 10 or above and less than 20 print '통과'"
        }
      }
    },

    // 프로젝트 소개
    {
      type: "explain",
      content: {
        lines: [
          "🎡 놀이공원 입장 시스템!"
        ],
        code: "=== Amusement Park Entry ===\nAge: 14\nHeight: 150cm\nGuardian: no\nRollercoaster: entry allowed\nKids Zone: entry denied",
        isPreview: true,
        note: "and, or, not 으로 하나씩 만들어보자!"
      }
    },

    // 프로젝트
    {
      type: "project",
      content: {
        step: 1,
        total: 4,
        task: "제목 출력",
        target: "=== 놀이공원 입장 시스템 ===",
        hint: "print('=== 놀이공원 입장 시스템 ===')",
        done: [],
        answer: "print('=== 놀이공원 입장 시스템 ===')"
      }
    },
    {
      type: "project",
      content: {
        step: 2,
        total: 4,
        task: "age = 14, height = 150, guardian = False 로 변수 만들고\n현재 상태 출력",
        target: "나이: 14살\n키: 150cm\n보호자 동반: 없음",
        hint: "print(f'나이: {age}살')\nprint(f'키: {height}cm')\nprint('보호자 동반:', '있음' if guardian else '없음')",
        done: ["=== 놀이공원 입장 시스템 ==="],
        answer: "age = 14\nheight = 150\nguardian = False\nprint(f'나이: {age}살')\nprint(f'키: {height}cm')\nprint('보호자 동반:', '있음' if guardian else '없음')"
      }
    },
    {
      type: "project",
      content: {
        step: 3,
        total: 4,
        task: "롤러코스터: 키 140 이상이고 나이 12 이상이면 입장 가능",
        target: "롤러코스터: 입장 가능",
        hint: "if height >= 140 and age >= 12:",
        done: ["=== 놀이공원 입장 시스템 ===", "나이: 14살", "키: 150cm", "보호자 동반: 없음"],
        answer: "if height >= 140 and age >= 12:\n    print('롤러코스터: 입장 가능')\nelse:\n    print('롤러코스터: 입장 불가')"
      }
    },
    {
      type: "project",
      content: {
        step: 4,
        total: 4,
        task: "어린이존: 나이 12 미만이거나 보호자 동반이면 입장 가능",
        target: "어린이존: 입장 불가",
        hint: "if age < 12 or guardian:",
        done: ["=== 놀이공원 입장 시스템 ===", "나이: 14살", "키: 150cm", "보호자 동반: 없음", "롤러코스터: 입장 가능"],
        answer: "if age < 12 or guardian:\n    print('어린이존: 입장 가능')\nelse:\n    print('어린이존: 입장 불가')"
      }
    },

    // ==================== CHAPTER 7: 결과 예측 ====================
    {
      type: "chapter",
      content: {
        num: 7,
        title: "결과 예측 훈련",
        desc: "코드를 보고 출력값을 맞혀봐!"
      }
    },

    // predict 1: and — 둘 다 True
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "age = 20\nif age >= 18 and age < 65:\n    print('성인')\nelse:\n    print('아님')",
        predict: {
          options: ["성인", "아님", "에러"],
          answer: 0,
          feedback: "20 >= 18 (True) and 20 < 65 (True) → 둘 다 True이면 and 결과도 True! '성인' 출력"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["성인", "아님", "Error"],
            feedback: "20 >= 18 (True) and 20 < 65 (True) → both True means and is True! prints '성인'"
          }
        }
      }
    },

    // predict 2: and — 하나가 False
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "score = 55\npassed = True\n\nif score >= 60 and passed:\n    print('합격')\nelse:\n    print('불합격')",
        predict: {
          options: ["합격", "불합격", "에러"],
          answer: 1,
          feedback: "score >= 60은 55 >= 60이므로 False! and는 하나라도 False면 전체 False → '불합격' 출력"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["합격", "불합격", "Error"],
            feedback: "score >= 60 is 55 >= 60 which is False! and is False if even one is False → prints '불합격'"
          }
        }
      }
    },

    // predict 3: or — 하나만 True
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "is_member = False\nhas_coupon = True\n\nif is_member or has_coupon:\n    print('할인 적용!')\nelse:\n    print('정가 결제')",
        predict: {
          options: ["할인 적용!", "정가 결제", "에러"],
          answer: 0,
          feedback: "is_member는 False지만 has_coupon이 True! or는 하나만 True여도 True → '할인 적용!' 출력"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["할인 적용!", "정가 결제", "Error"],
            feedback: "is_member is False but has_coupon is True! or is True if even one is True → prints '할인 적용!'"
          }
        }
      }
    },

    // predict 4: or — 둘 다 False
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "sunny = False\nwarm = False\n\nif sunny or warm:\n    print('밖에 나가자')\nelse:\n    print('집에 있자')",
        predict: {
          options: ["밖에 나가자", "집에 있자", "에러"],
          answer: 1,
          feedback: "sunny도 False, warm도 False! or는 둘 다 False일 때만 False → '집에 있자' 출력"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["밖에 나가자", "집에 있자", "Error"],
            feedback: "sunny is False and warm is False! or is False only when both are False → prints '집에 있자'"
          }
        }
      }
    },

    // predict 5: not — 불리언 반전
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "game_over = True\n\nif not game_over:\n    print('게임 계속!')\nelse:\n    print('게임 종료')",
        predict: {
          options: ["게임 계속!", "게임 종료", "에러"],
          answer: 1,
          feedback: "game_over가 True이므로 not True = False! if 조건이 False → else 블록 실행 → '게임 종료' 출력"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["게임 계속!", "게임 종료", "Error"],
            feedback: "game_over is True so not True = False! if condition is False → else block runs → prints '게임 종료'"
          }
        }
      }
    },

    // predict 6: and + or 복합
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐! (조금 어려워 😎)"],
        code: "vip = False\npoints = 500\n\nif vip or points >= 300:\n    print('특별 혜택!')\nelse:\n    print('일반 회원')",
        predict: {
          options: ["특별 혜택!", "일반 회원", "에러"],
          answer: 0,
          feedback: "vip는 False지만 points >= 300은 500 >= 300이므로 True! False or True = True → '특별 혜택!' 출력"
        },
        en: {
          lines: ["Predict the output! (a bit tricky 😎)"],
          predict: {
            options: ["특별 혜택!", "일반 회원", "Error"],
            feedback: "vip is False but points >= 300 is 500 >= 300 which is True! False or True = True → prints '특별 혜택!'"
          }
        }
      }
    },

    // ==================== CHAPTER 8: 오류 찾기 ====================
    {
      type: "chapter",
      content: {
        num: 8,
        title: "오류 찾기",
        desc: "and/or/not 흔한 실수를 잡아봐!"
      }
    },

    // errorQuiz 1: and에서 변수 생략
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: "x = 5\nif x > 0 and < 10:\n    print('in range')",
        options: [
          "x > 0 and x < 10 으로 써야 해",
          "and 대신 or를 써야 해",
          "print 들여쓰기 문제"
        ],
        answer: 0,
        explanation: "Python에서는 각 조건에 변수를 명시해야 해! and 뒤에도 x를 써서 x > 0 and x < 10 처럼 작성해야 돼.",
        en: {
          question: "What's wrong with this code?",
          options: [
            "Must write x > 0 and x < 10",
            "Should use or instead of and",
            "Print indentation problem"
          ],
          explanation: "In Python, each condition must include the variable! After and, you must also write x: x > 0 and x < 10."
        }
      }
    },

    // errorQuiz 2: not의 위치 실수
    {
      type: "errorQuiz",
      content: {
        question: "의도: 로그인 안 했거나 관리자가 아니면 '접근 거부'. 코드의 문제점은?",
        code: "logged_in = True\nis_admin = False\n\nif not logged_in or is_admin:\n    print('access denied')",
        options: [
          "not (logged_in or is_admin) 으로 묶어야 의도대로 돼",
          "or 대신 and를 써야 해",
          "변수 이름이 너무 길어서 에러"
        ],
        answer: 0,
        explanation: "not logged_in or is_admin 은 (not logged_in) or is_admin 로 계산돼. 의도대로 하려면 not (logged_in or is_admin) 으로 괄호로 묶어야 해!",
        en: {
          question: "Intent: deny access if not logged in OR not admin. What's wrong?",
          options: [
            "Should wrap as not (logged_in or is_admin) to match intent",
            "Should use and instead of or",
            "Variable names are too long"
          ],
          explanation: "not logged_in or is_admin evaluates as (not logged_in) or is_admin. To match intent, wrap: not (logged_in or is_admin)!"
        }
      }
    },

    // ==================== CHAPTER 9: 추가 연습 ====================
    {
      type: "chapter",
      content: {
        num: 9,
        title: "추가 연습",
        desc: "논리 연산자 완전 정복!"
      }
    },

    // practice 6: 범위 확인 (1~100)
    {
      type: "practice",
      content: {
        level: 2,
        task: "n = 75 로 변수 만들고,\n1 이상 100 이하면 '유효한 점수' 출력해봐\n(and로 두 조건 연결!)",
        guide: "and로 최솟값 이상인지, 최댓값 이하인지 두 조건을 연결해!",
        template: null,
        answer: "n = 75\nif n >= 1 and n <= 100:\n    print('유효한 점수')\nelse:\n    print('범위 초과')",
        expect: "유효한 점수",
        en: {
          task: "Create variable n = 75,\nif 1 or above and 100 or below print '유효한 점수'\n(connect two conditions with and!)",
          guide: "Use and to connect: must be at least the minimum AND at most the maximum!"
        }
      }
    },

    // practice 7: not equal + or 조합
    {
      type: "practice",
      content: {
        level: 2,
        task: "answer = 'yes' 로 변수 만들고,\n'yes' 또는 'y' 이면 '확인됐어요!' 출력해봐",
        guide: "or로 두 문자열 중 하나와 일치하는지 확인해!",
        template: null,
        answer: "answer = 'yes'\nif answer == 'yes' or answer == 'y':\n    print('확인됐어요!')\nelse:\n    print('취소됐어요')",
        expect: "확인됐어요!",
        en: {
          task: "Create variable answer = 'yes',\nif 'yes' or 'y' print '확인됐어요!'",
          guide: "Use or to check if a string matches one of two possible values!"
        }
      }
    },

    // practice 8: not 활용
    {
      type: "practice",
      content: {
        level: 3,
        task: "name = '' 로 빈 문자열 변수 만들고,\nname이 비어있지 않으면 (not으로 확인) '안녕, {name}!' 출력해봐\n비어있으면 '이름을 입력해주세요' 출력",
        guide: "if not name: 는 이름이 비어있을 때 True야!",
        template: null,
        answer: "name = ''\nif not name:\n    print('이름을 입력해주세요')\nelse:\n    print(f'안녕, {name}!')",
        expect: "이름을 입력해주세요",
        en: {
          task: "Create variable name = '' (empty string),\nif name is NOT empty (check with not) print '안녕, {name}!'\nif empty print '이름을 입력해주세요'",
          guide: "if not name: is True when name is empty!"
        }
      }
    },

    // 최종 요약
    {
      type: "summary",
      content: {
        num: 6,
        title: "조건문 심화 마스터",
        learned: [
          "and: 둘 다 True여야 True",
          "or: 하나만 True여도 True",
          "not: True ↔ False 반전",
          "복합 조건: age >= 13 and age < 19",
          "연결 비교: 1 < x < 10 (Python 특성)"
        ],
        canDo: "논리 연산자로 복잡한 조건도 정확하게 처리할 수 있어!",
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
