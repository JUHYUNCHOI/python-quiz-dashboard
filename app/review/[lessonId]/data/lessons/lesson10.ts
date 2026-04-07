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
        code: "name = input('이름을 입력하세요: ')\nage = int(input('나이를 입력하세요: '))\nprint(f'안녕하세요, {name}! {age}살이군요!')",
        result: "이름을 입력하세요: 민준\n나이를 입력하세요: 15\n안녕하세요, 민준! 15살이군요!",
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
        expect: "50"
      }
    },

    // input() 기본
    {
      type: "explain",
      content: {
        lines: [
          "input() 은 항상 문자열(str)을 반환해!"
        ],
        code: "name = input('이름: ')   # 사용자 입력 받기\nprint(f'안녕, {name}!')",
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
        code: "# 안내 메시지 O\ncity = input('사는 곳: ')     # '서울' 입력 시\nprint(city)                  # 서울\n\n# 안내 메시지 X\nfood = input()               # 그냥 기다림",
        note: "안내 메시지를 넣으면 사용자가 뭘 입력할지 알아!"
      }
    },

    // ===== Lv.1: input 기본 =====
    {
      type: "practice",
      content: {
        level: 1,
        task: "input()으로 좋아하는 음식을 입력받아\n'좋아하는 음식: 피자' 형식으로 출력해봐\n(입력: 피자)",
        guide: "food = input('좋아하는 음식: ')\nprint(f'좋아하는 음식: {food}')",
        template: null,
        answer: "food = input('좋아하는 음식: ')\nprint(f'좋아하는 음식: {food}')",
        expect: "좋아하는 음식: 피자"
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
        explanation: "input()은 항상 문자열(str)로 반환해! 숫자를 입력해도 '123' 같은 문자열이야."
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
        code: "# 잘못된 방법 (문자열 + 숫자 = 에러!)\nnum = input('숫자: ')   # '10' 입력\nresult = num + 5        # TypeError!\n\n# 올바른 방법\nnum = int(input('숫자: '))  # '10' → 10\nresult = num + 5            # 15 ✓",
        isError: true,
        note: "input()은 항상 str → 계산하려면 int() 변환 필수!"
      }
    },

    // 에러 퀴즈
    {
      type: "errorQuiz",
      content: {
        question: "아래 코드의 문제점은?",
        code: "score = input('점수: ')  # '90' 입력\nprint(score + 10)",
        options: [
          "입력을 받을 수 없어",
          "TypeError: str + int 불가",
          "출력이 100이 나와"
        ],
        answer: 1,
        explanation: "input()은 str을 반환해! '90' + 10은 문자열 + 정수라 TypeError가 발생해. int(input('점수: '))로 변환해야 해!"
      }
    },

    // ===== Lv.2: 숫자 입력 =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "나이를 int로 입력받아\n10년 후 나이를 출력해봐\n(입력: 15 → 출력: 25)",
        guide: "age = int(input('나이: '))",
        template: null,
        answer: "age = int(input('나이: '))\nprint(age + 10)",
        expect: "25"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 수를 각각 입력받아 합을 출력해봐\n(입력: 30, 70 → 출력: 100)",
        guide: "a = int(input(...))\nb = int(input(...))",
        template: null,
        answer: "a = int(input('첫 번째 수: '))\nb = int(input('두 번째 수: '))\nprint(a + b)",
        expect: "100"
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
        explanation: "input()은 항상 str! 계산하려면 int(input()) 또는 float(input())으로 변환해야 해."
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
        expect: "코린이는 13살이야"
      }
    },

    // 프로젝트 소개
    {
      type: "explain",
      content: {
        lines: [
          "🙋 자기소개 프로그램!"
        ],
        code: "=== 자기소개 ===\n이름을 입력하세요: 지수\n나이를 입력하세요: 16\n안녕하세요! 저는 지수이고, 16살입니다.",
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
