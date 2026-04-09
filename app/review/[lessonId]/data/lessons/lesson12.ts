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
        code: "age = 16\nhas_ticket = True\n\nif age >= 13 and has_ticket:\n    print('입장 가능!')\nelse:\n    print('입장 불가')",
        result: "입장 가능!",
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
        guide: "if temp >= 15 and temp <= 28 and not rain:",
        template: null,
        answer: "temp = 22\nrain = False\nif temp >= 15 and temp <= 28 and not rain:\n    print('소풍 가자!')\nelse:\n    print('집에 있자')",
        expect: "소풍 가자!",
        en: {
          task: "Create variables temp = 22, rain = False,\nif temperature is 15~28 and it's not raining print '소풍 가자!'",
          guide: "if temp >= 15 and temp <= 28 and not rain:"
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
        guide: "if day == '토요일' or day == '일요일':",
        template: null,
        answer: "day = '토요일'\nif day == '토요일' or day == '일요일':\n    print('주말이다!')\nelse:\n    print('평일이다')",
        expect: "주말이다!",
        en: {
          task: "Create variable day = '토요일',\nif '토요일' or '일요일' print '주말이다!'",
          guide: "if day == '토요일' or day == '일요일':"
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
        guide: "if not logged_in:",
        template: null,
        answer: "logged_in = False\nif not logged_in:\n    print('로그인이 필요합니다')",
        expect: "로그인이 필요합니다",
        en: {
          task: "Create variable logged_in = False,\nif not logged in print '로그인이 필요합니다'",
          guide: "if not logged_in:"
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
        code: "age = 16\nscore = 85\n\n# 나이가 13~19이고 점수가 80 이상이면 장학금!\nif age >= 13 and age < 19 and score >= 80:\n    print('장학금 대상!')",
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
        guide: "if 1 <= n < 10:",
        template: null,
        answer: "n = 7\nif 1 <= n < 10:\n    print('범위 안')",
        expect: "범위 안",
        en: {
          task: "Create variable n = 7,\nif 1 or above and less than 10 print '범위 안'\n(Using Python chained comparison!)",
          guide: "if 1 <= n < 10:"
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
        code: "=== 놀이공원 입장 시스템 ===\n나이: 14살\n키: 150cm\n보호자 동반: 없음\n롤러코스터: 입장 가능\n어린이존: 입장 불가",
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
