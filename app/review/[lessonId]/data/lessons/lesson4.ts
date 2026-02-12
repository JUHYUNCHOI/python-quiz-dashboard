import { LessonData } from '../types';

export const lesson4: LessonData = {
    id: "4",
    title: "연산자",
    description: "계산부터 비교까지!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "RPG 데미지 계산",
          desc: "게임 만들기의 핵심!"
        }
      },

      // 프리뷰
      {
        type: "explain",
        content: {
          lines: [
            "🎮 오늘 만들 것!"
          ],
          code: "=== RPG 데미지 계산기 ===\n기본 공격력: 25\n치명타 (x2): 50\n보스 방어력: 15\n최종 데미지: 35",
          isPreview: true,
          note: "게임에서 데미지 어떻게 계산할까?"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "연산자로 다 할 수 있어!"
          ],
          code: "+ - * / 계산\n> < == 비교\nand or 조건",
          isPreview: true,
          note: "하나씩 배워보자! 🚀"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "연산자 마스터 시작!",
          emoji: "🧮"
        }
      },

      // ==================== CHAPTER 2: 산술 연산자 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "산술 연산자",
          desc: "+ - * / 계산하기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 계산 출력 기억나?",
          task: "10 + 5 계산해서 출력해봐",
          template: null,
          answer: "print(10 + 5)",
          expect: "15"
        }
      },

      // 기본 연산자
      {
        type: "explain",
        content: {
          lines: [
            "기본 사칙연산"
          ],
          code: "10 + 3  → 13 (더하기)\n10 - 3  → 7  (빼기)\n10 * 3  → 30 (곱하기)\n10 / 3  → 3.33 (나누기)",
          note: "* 는 곱하기, / 는 나누기!"
        }
      },

      // ===== Lv.1: 기본 연산 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "19000 + 2000 계산해서 출력해봐",
          guide: "치킨 + 콜라!",
          template: { before: "print(", after: ")" },
          answer: "19000 + 2000",
          alternateAnswers: ["19000+2000"],
          expect: "21000"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "50000 - 21000 계산해서 출력해봐",
          guide: "용돈 - 지출!",
          template: { before: "print(", after: ")" },
          answer: "50000 - 21000",
          alternateAnswers: ["50000-21000"],
          expect: "29000"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "25 * 2 계산해서 출력해봐",
          guide: "공격력 x 치명타!",
          template: { before: "print(", after: ")" },
          answer: "25 * 2",
          alternateAnswers: ["25*2"],
          expect: "50"
        }
      },

      // 특수 연산자
      {
        type: "explain",
        content: {
          lines: [
            "특수 연산자 3가지!"
          ],
          code: "10 // 3 → 3   (몫)\n10 % 3  → 1   (나머지)\n2 ** 3  → 8   (거듭제곱)",
          note: "// 몫, % 나머지, ** 거듭제곱"
        }
      },

      // ===== Lv.1: 특수 연산 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "17 // 5 계산해서 출력해봐 (몫)",
          guide: "// 는 몫!",
          template: { before: "print(", after: ")" },
          answer: "17 // 5",
          alternateAnswers: ["17//5"],
          expect: "3"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "17 % 5 계산해서 출력해봐 (나머지)",
          guide: "% 는 나머지!",
          template: { before: "print(", after: ")" },
          answer: "17 % 5",
          alternateAnswers: ["17%5"],
          expect: "2"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "2 ** 4 계산해서 출력해봐 (2의 4승)",
          guide: "** 는 거듭제곱!",
          template: { before: "print(", after: ")" },
          answer: "2 ** 4",
          alternateAnswers: ["2**4"],
          expect: "16"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "12조각을 5명이 나눌 때, 한 명당 몇 조각?",
          options: [
            "12 / 5 = 2.4조각",
            "12 // 5 = 2조각",
            "12 % 5 = 2조각"
          ],
          answer: 1,
          explanation: "// 는 몫이니까 12 // 5 = 2조각! % 는 나머지야 (남는 조각)."
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "산술 연산자",
          learned: [
            "+ - * / 기본 연산",
            "// 몫, % 나머지",
            "** 거듭제곱"
          ],
          canDo: "다양한 계산을 할 수 있어!",
          emoji: "➕"
        }
      },

      // ==================== CHAPTER 3: 비교 연산자 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "비교 연산자",
          desc: "크다 작다 같다!"
        }
      },

      // 비교 연산자
      {
        type: "explain",
        content: {
          lines: [
            "비교하면 True/False가 나와!"
          ],
          code: "10 > 5   → True  (크다)\n10 < 5   → False (작다)\n10 == 10 → True  (같다)\n10 != 5  → True  (다르다)",
          note: "> < 크기 비교, == 같다, != 다르다"
        }
      },

      // ===== Lv.1: 비교 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "100 > 50 비교해서 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "100 > 50",
          alternateAnswers: ["100>50"],
          expect: "True"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "3 < 7 비교해서 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "3 < 7",
          alternateAnswers: ["3<7"],
          expect: "True"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "10 == 10 비교해서 출력해봐",
          guide: "== 는 같다!",
          template: { before: "print(", after: ")" },
          answer: "10 == 10",
          alternateAnswers: ["10==10"],
          expect: "True"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "5 != 3 비교해서 출력해봐",
          guide: "!= 는 다르다!",
          template: { before: "print(", after: ")" },
          answer: "5 != 3",
          alternateAnswers: ["5!=3"],
          expect: "True"
        }
      },

      // >= <=
      {
        type: "explain",
        content: {
          lines: [
            ">= 와 <= 도 있어!"
          ],
          code: "10 >= 10 → True (크거나 같다)\n10 <= 9  → False (작거나 같다)",
          note: ">= 이상, <= 이하"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "10 >= 10 의 결과는?",
          options: [
            "True (10은 10 이상)",
            "False (같으면 안 됨)",
            "에러"
          ],
          answer: 0,
          explanation: ">= 는 '크거나 같다'니까 10 >= 10은 True야!"
        }
      },

      // ⚠️ = vs ==
      {
        type: "explain",
        content: {
          lines: [
            "⚠️ 중요! = vs =="
          ],
          code: "price = 19000   # 넣어라 (대입)\nprice == 19000  # 같니? (비교)",
          note: "= 대입, == 비교! 헷갈리지 말자!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이건 뭘 하는 코드일까?",
          code: "score = 100\nscore == 100",
          options: [
            "score에 100 넣고, 100인지 확인",
            "score에 100 두 번 넣기",
            "에러!"
          ],
          answer: 0,
          explanation: "= 는 넣기, == 는 비교! 첫 줄은 저장, 둘째 줄은 True 반환!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "비교 연산자",
          learned: [
            "> < >= <= 크기 비교",
            "== 같다, != 다르다",
            "= 대입 vs == 비교"
          ],
          canDo: "두 값을 비교할 수 있어!",
          emoji: "⚖️"
        }
      },

      // ==================== CHAPTER 4: 논리 연산자 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "논리 연산자",
          desc: "and, or, not!"
        }
      },

      // and
      {
        type: "explain",
        content: {
          lines: [
            "and = 둘 다 True여야 True"
          ],
          code: "True and True   → True\nTrue and False  → False",
          note: "and는 '그리고'! 둘 다 맞아야 해!"
        }
      },

      // or
      {
        type: "explain",
        content: {
          lines: [
            "or = 하나만 True여도 True"
          ],
          code: "True or False  → True\nFalse or False → False",
          note: "or는 '또는'! 하나만 맞아도 OK!"
        }
      },

      // not
      {
        type: "explain",
        content: {
          lines: [
            "not = 뒤집기"
          ],
          code: "not True  → False\nnot False → True",
          note: "not은 반대로!"
        }
      },

      // 게임 예시
      {
        type: "explain",
        content: {
          lines: [
            "🎮 게임 상점 입장 조건"
          ],
          code: "level = 10\ngold = 500\n(level >= 10) and (gold >= 1000)",
          result: "False",
          note: "레벨 OK, 골드 부족! 입장 불가!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "(True and False) or True 의 결과는?",
          options: [
            "True",
            "False",
            "에러"
          ],
          answer: 0,
          explanation: "True and False = False, False or True = True!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "논리 연산자",
          learned: [
            "and: 둘 다 True",
            "or: 하나만 True",
            "not: 뒤집기"
          ],
          canDo: "여러 조건을 조합할 수 있어!",
          emoji: "🔗"
        }
      },

      // ==================== CHAPTER 5: 연산자 우선순위 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "연산자 우선순위",
          desc: "어떤 것부터 계산?"
        }
      },

      // 우선순위
      {
        type: "explain",
        content: {
          lines: [
            "수학처럼 곱/나눗셈이 먼저!"
          ],
          code: "10 + 3 * 2  → 16\n(10 + 3) * 2 → 26",
          note: "헷갈리면 괄호 쓰자!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "2 + 3 * 4 의 결과는?",
          options: [
            "20 (왼쪽부터)",
            "14 (곱셈 먼저)",
            "에러"
          ],
          answer: 1,
          explanation: "곱셈 먼저! 3 * 4 = 12, 2 + 12 = 14!"
        }
      },

      // ===== Lv.3: 복합 계산 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "(25 * 2) - 15 계산해서 출력해봐",
          hint: "치명타 데미지 - 방어력!",
          template: null,
          answer: "print((25 * 2) - 15)",
          expect: "35"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "우선순위",
          learned: [
            "* / 가 + - 보다 먼저",
            "괄호가 가장 먼저",
            "헷갈리면 괄호!"
          ],
          canDo: "복잡한 계산도 정확하게!",
          emoji: "📊"
        }
      },

      // ==================== CHAPTER 6: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 6,
          title: "RPG 데미지 계산기",
          desc: "배운 걸 모두 활용!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "비교 연산 기억나?",
          task: "100 > 50 출력해봐",
          template: null,
          answer: "print(100 > 50)",
          expect: "True"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "🎮 RPG 데미지 계산기!"
          ],
          code: "=== RPG 데미지 계산기 ===\n기본 공격력: 25\n치명타 (x2): 50\n최종 데미지: 35\n보스 잡았나? False",
          isPreview: true,
          note: "한 줄씩 만들어보자!"
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 5,
          task: "제목 출력",
          target: "=== RPG 데미지 계산기 ===",
          hint: "print('=== RPG 데미지 계산기 ===')",
          done: [],
          answer: "print('=== RPG 데미지 계산기 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 5,
          task: "기본 공격력 출력 (attack = 25)",
          target: "기본 공격력: 25",
          hint: "print('기본 공격력:', attack)",
          done: ["=== RPG 데미지 계산기 ==="],
          answer: "print('기본 공격력:', attack)"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 5,
          task: "치명타 데미지 계산 (x2)",
          target: "치명타 (x2): 50",
          hint: "print('치명타 (x2):', attack * 2)",
          done: ["=== RPG 데미지 계산기 ===", "기본 공격력: 25"],
          answer: "print('치명타 (x2):', attack * 2)"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 5,
          task: "최종 데미지 (치명타 - 방어력15)",
          target: "최종 데미지: 35",
          hint: "attack * 2 - 15",
          done: ["=== RPG 데미지 계산기 ===", "기본 공격력: 25", "치명타 (x2): 50"],
          answer: "print('최종 데미지:', attack * 2 - 15)"
        }
      },
      {
        type: "project",
        content: {
          step: 5,
          total: 5,
          task: "보스(HP 100) 잡았나? (데미지 >= HP)",
          target: "보스 잡았나? False",
          hint: "(attack * 2 - 15) >= 100",
          done: ["=== RPG 데미지 계산기 ===", "기본 공격력: 25", "치명타 (x2): 50", "최종 데미지: 35"],
          answer: "print('보스 잡았나?', (attack * 2 - 15) >= 100)"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 6,
          title: "연산자 마스터",
          learned: [
            "산술: + - * / // % **",
            "비교: > < >= <= == !=",
            "논리: and or not",
            "우선순위: 괄호 먼저!"
          ],
          canDo: "연산자로 다양한 계산과 비교를 할 수 있어!",
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
