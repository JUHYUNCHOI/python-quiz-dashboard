import { LessonData } from '../types';

export const lesson5: LessonData = {
    id: "5",
    title: "input() 입력",
    description: "사용자에게 입력받기!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "진짜 프로그램 만들기",
          desc: "사용자와 대화하는 프로그램!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "지금까지는 우리가 정한 값만 출력했어",
            "이제 사용자가 직접 입력할 수 있어! 🎮"
          ],
          code: "=== 프로필 카드 ===\n이름: 홍길동\n나이: 15\n좋아하는 음식: 피자",
          isPreview: true,
          note: "사용자가 입력한 값으로 결과가 바뀌어!"
        }
      },

      {
        type: "reward",
        content: {
          message: "input()을 배워보자!",
          emoji: "⌨️"
        }
      },

      // ==================== CHAPTER 2: input() 기본 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "input() 기본",
          desc: "사용자 입력 받기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 지난 시간 복습",
          task: "Hello 출력해봐",
          template: null,
          answer: "print('Hello')",
          expect: "Hello"
        }
      },

      // input() 설명
      {
        type: "explain",
        content: {
          lines: [
            "input() = 사용자에게 물어봐!"
          ],
          code: "name = input('이름: ')",
          result: "이름: (여기에 입력)",
          note: "입력한 값이 name에 저장돼!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "입력받은 값 사용하기"
          ],
          code: "name = input('이름: ')\nprint('안녕', name)",
          result: "안녕 홍길동",
          note: "홍길동을 입력했다면!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "input('나이: ')에서 '나이: '는 뭘까?",
          options: [
            "사용자에게 보여주는 메시지",
            "변수 이름",
            "입력 값"
          ],
          answer: 0,
          explanation: "input() 안의 문자열은 사용자에게 보여주는 안내 메시지야!"
        }
      },

      // ===== Lv.1: input() 기본 연습 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "이름을 입력받아 name에 저장해봐",
          guide: "input('메시지') 형태!",
          template: { before: "name = input('", after: "')" },
          answer: "이름: ",
          alternateAnswers: ["이름:", "이름을 입력하세요: ", "이름 입력: "],
          expect: ""
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "좋아하는 음식을 입력받아 food에 저장해봐",
          template: { before: "food = input('", after: "')" },
          answer: "좋아하는 음식: ",
          alternateAnswers: ["음식: ", "좋아하는 음식:", "음식 입력: "],
          expect: ""
        }
      },

      // ===== Lv.2: input() 전체 작성 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "취미를 입력받아 hobby에 저장해봐",
          guide: "hobby = input('메시지')",
          template: null,
          answer: "hobby = input('취미: ')",
          alternateAnswers: ["hobby = input('취미:')", "hobby=input('취미: ')"],
          expect: ""
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "input() 기본",
          learned: [
            "input('메시지')로 입력 받기",
            "입력값은 변수에 저장",
            "print()로 출력"
          ],
          canDo: "사용자에게 입력을 받을 수 있어!",
          emoji: "⌨️"
        }
      },

      // ==================== CHAPTER 3: input()은 문자열! ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "input()은 문자열!",
          desc: "숫자 입력 받을 때 주의!"
        }
      },

      // 문제 상황
      {
        type: "explain",
        content: {
          lines: [
            "⚠️ input()은 항상 문자열을 반환해!"
          ],
          code: "age = input('나이: ')\nprint(age + 10)",
          result: "❌ Error!",
          isError: true,
          note: "'15' + 10 = 에러! (문자 + 숫자)"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "해결책: int()로 변환!"
          ],
          code: "age = int(input('나이: '))\nprint(age + 10)",
          result: "25",
          note: "int()가 '15'를 15로 바꿔줘!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "5를 입력했을 때, 결과는?",
          code: "num = input('숫자: ')\nprint(num * 2)",
          options: [
            "10",
            "'55'",
            "에러"
          ],
          answer: 1,
          explanation: "input()은 문자열! '5' * 2 = '55' (문자열 반복)"
        }
      },

      // ===== Lv.1: int(input()) 연습 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "나이를 숫자로 입력받아 age에 저장해봐",
          guide: "int(input('메시지'))로 숫자 입력!",
          template: { before: "age = int(input('", after: "'))" },
          answer: "나이: ",
          alternateAnswers: ["나이:", "나이 입력: "],
          expect: ""
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "점수를 숫자로 입력받아 score에 저장해봐",
          template: { before: "score = int(input('", after: "'))" },
          answer: "점수: ",
          alternateAnswers: ["점수:", "점수 입력: "],
          expect: ""
        }
      },

      // ===== Lv.2: int(input()) 전체 작성 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "가격을 숫자로 입력받아 price에 저장해봐",
          guide: "price = int(input('메시지'))",
          template: null,
          answer: "price = int(input('가격: '))",
          alternateAnswers: ["price = int(input('가격:'))", "price=int(input('가격: '))"],
          expect: ""
        }
      },

      // ===== Lv.3: int(input()) + 계산 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "숫자를 입력받아 2배해서 출력해봐",
          hint: "num = int(input('숫자: '))\nprint(num * 2)",
          template: null,
          answer: "num = int(input('숫자: '))\nprint(num * 2)",
          expect: ""
        }
      },
      {
        type: "practice",
        content: {
          level: 3,
          task: "두 숫자를 입력받아 더해서 출력해봐",
          hint: "a = int(input('첫번째: '))\nb = int(input('두번째: '))\nprint(a + b)",
          template: null,
          answer: "a = int(input('첫번째: '))\nb = int(input('두번째: '))\nprint(a + b)",
          expect: ""
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "숫자로 계산하려면?",
          options: [
            "input('숫자: ')",
            "int(input('숫자: '))",
            "str(input('숫자: '))"
          ],
          answer: 1,
          explanation: "int()로 문자열을 정수로 변환해야 계산할 수 있어!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "숫자 입력",
          learned: [
            "input()은 항상 문자열!",
            "숫자 계산 = int(input())",
            "소수점 = float(input())"
          ],
          canDo: "숫자를 입력받아 계산할 수 있어!",
          emoji: "🔢"
        }
      },

      // ==================== CHAPTER 4: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "프로필 카드 만들기",
          desc: "배운 걸 활용해서 만들기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "변수 출력 기억나?",
          task: "name 변수를 출력해봐",
          template: null,
          answer: "print(name)",
          expect: "홍길동"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "📇 프로필 카드 만들기!"
          ],
          code: "=== 프로필 카드 ===\n이름: 홍길동\n나이: 15\n내년 나이: 16",
          isPreview: true,
          note: "한 줄씩 만들어보자!"
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 4,
          task: "제목 출력",
          target: "=== 프로필 카드 ===",
          hint: "print('=== 프로필 카드 ===')",
          done: [],
          answer: "print('=== 프로필 카드 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "이름 출력 (name 변수 사용)",
          target: "이름: 홍길동",
          hint: "print('이름:', name)",
          done: ["=== 프로필 카드 ==="],
          answer: "print('이름:', name)"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "나이 출력 (age 변수 사용)",
          target: "나이: 15",
          hint: "print('나이:', age)",
          done: ["=== 프로필 카드 ===", "이름: 홍길동"],
          answer: "print('나이:', age)"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "내년 나이 계산해서 출력",
          target: "내년 나이: 16",
          hint: "age + 1",
          done: ["=== 프로필 카드 ===", "이름: 홍길동", "나이: 15"],
          answer: "print('내년 나이:', age + 1)"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "input() 마스터",
          learned: [
            "input()으로 사용자 입력",
            "int(input())으로 숫자 입력",
            "입력값으로 계산하기"
          ],
          canDo: "사용자와 대화하는 프로그램을 만들 수 있어!",
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
