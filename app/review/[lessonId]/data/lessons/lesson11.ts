import { LessonData } from '../types';

export const lesson11: LessonData = {
  id: "11",
  title: "조건문",
  description: "상황에 따라 다르게 실행!",
  steps: [
    // ==================== CHAPTER 1: 동기 부여 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "조건문 소개",
        desc: "상황에 따라 다르게!"
      }
    },

    // 프리뷰
    {
      type: "explain",
      content: {
        lines: [
          "🎯 오늘 만들 것!"
        ],
        code: "temp = 22\nif temp >= 30:\n    print('🔥 더워요')\nelif temp >= 20:\n    print('😊 좋아요')\nelse:\n    print('🧥 추워요')",
        result: "😊 좋아요",
        isPreview: true,
        note: "온도에 따라 다른 결과를 출력해!"
      }
    },

    {
      type: "reward",
      content: {
        message: "조건문 마스터 시작!",
        emoji: "🔀"
      }
    },

    // ==================== CHAPTER 2: if 문 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "if 문",
        desc: "콜론과 들여쓰기 필수!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "잠깐! 비교 연산자 기억나?",
        task: "100 > 50 출력해봐",
        template: { before: "print(", after: ")" },
        answer: "100 > 50",
        expect: "True"
      }
    },

    // if 기본 구조
    {
      type: "explain",
      content: {
        lines: [
          "if 뒤에 조건, 콜론(:) 필수!"
        ],
        code: "score = 90\nif score >= 90:\n    print('합격!')   # 들여쓰기 필수!",
        result: "합격!",
        note: "if 조건: 뒤에 콜론(:), 실행할 코드는 들여쓰기 4칸!"
      }
    },

    // ===== Lv.1: if 기본 =====
    {
      type: "practice",
      content: {
        level: 1,
        task: "age = 18 로 변수 만들고,\nage >= 18 이면 '성인입니다' 출력해봐",
        guide: "if age >= 18:\n    print(...)",
        template: null,
        answer: "age = 18\nif age >= 18:\n    print('성인입니다')",
        expect: "성인입니다"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "temp = 35 로 변수 만들고,\ntemp > 30 이면 '더워요!' 출력해봐",
        template: null,
        answer: "temp = 35\nif temp > 30:\n    print('더워요!')",
        expect: "더워요!"
      }
    },

    // 들여쓰기 에러
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: "score = 100\nif score == 100:\nprint('만점!')",
        options: [
          "score 변수가 없어",
          "들여쓰기가 없어서 IndentationError!",
          "== 대신 = 를 써야 해"
        ],
        answer: 1,
        explanation: "if 아래의 코드는 반드시 들여쓰기(4칸 또는 Tab)가 있어야 해! 없으면 IndentationError가 발생해."
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "if 문에서 반드시 필요한 것 2가지는?",
        options: [
          "콜론(:)과 들여쓰기",
          "세미콜론(;)과 중괄호({})",
          "따옴표와 괄호"
        ],
        answer: 0,
        explanation: "Python if 문은 조건 뒤에 콜론(:), 실행 코드는 들여쓰기! C/Java의 {} 와 달라."
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 2,
        title: "if 문",
        learned: [
          "if 조건: (콜론 필수!)",
          "실행할 코드는 들여쓰기 4칸",
          "들여쓰기 없으면 IndentationError"
        ],
        canDo: "조건이 참일 때 코드를 실행할 수 있어!",
        emoji: "✅"
      }
    },

    // ==================== CHAPTER 3: if-else ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "if-else",
        desc: "참이면 이거, 아니면 저거!"
      }
    },

    // if-else 기본
    {
      type: "explain",
      content: {
        lines: [
          "else: 조건이 False일 때 실행!"
        ],
        code: "age = 15\nif age >= 18:\n    print('성인')\nelse:\n    print('미성년자')",
        result: "미성년자",
        note: "if 조건이 False면 else 블록 실행!"
      }
    },

    // ===== Lv.1: if-else =====
    {
      type: "practice",
      content: {
        level: 1,
        task: "score = 75 로 변수 만들고,\n60 이상이면 '합격', 아니면 '불합격' 출력해봐",
        guide: "if score >= 60:\n    print('합격')\nelse:\n    print('불합격')",
        template: null,
        answer: "score = 75\nif score >= 60:\n    print('합격')\nelse:\n    print('불합격')",
        expect: "합격"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "num = 7 로 변수 만들고,\n짝수면 '짝수', 홀수면 '홀수' 출력해봐",
        guide: "if num % 2 == 0:",
        template: null,
        answer: "num = 7\nif num % 2 == 0:\n    print('짝수')\nelse:\n    print('홀수')",
        expect: "홀수"
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "n = 10 일 때, 다음 코드의 출력은?\nif n > 10:\n    print('크다')\nelse:\n    print('작거나 같다')",
        options: [
          "크다",
          "작거나 같다",
          "아무것도 안 나와"
        ],
        answer: 1,
        explanation: "10 > 10은 False! 그래서 else 블록의 '작거나 같다'가 출력돼."
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 3,
        title: "if-else",
        learned: [
          "if 조건이 True → if 블록 실행",
          "if 조건이 False → else 블록 실행",
          "둘 중 하나만 실행돼"
        ],
        canDo: "조건에 따라 두 가지 중 하나를 실행할 수 있어!",
        emoji: "↔️"
      }
    },

    // ==================== CHAPTER 4: elif ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "elif",
        desc: "세 가지 이상 조건!"
      }
    },

    // elif 기본
    {
      type: "explain",
      content: {
        lines: [
          "elif 로 조건을 여러 개 추가해!"
        ],
        code: "speed = 75\nif speed >= 100:\n    print('🚨 과속')\nelif speed >= 80:\n    print('⚠️ 주의')\nelif speed >= 60:\n    print('✅ 정상')\nelse:\n    print('🐢 너무 느림')",
        result: "✅ 정상",
        note: "elif = else if! 위에서부터 순서대로 확인해"
      }
    },

    // ===== Lv.2: elif =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "temp = 10 으로 변수 만들고,\n30 이상이면 '더워', 20 이상이면 '따뜻해',\n10 이상이면 '선선해', 아니면 '추워' 출력해봐",
        guide: "if temp >= 30:\nelif temp >= 20:\nelif temp >= 10:\nelse:",
        template: null,
        answer: "temp = 10\nif temp >= 30:\n    print('더워')\nelif temp >= 20:\n    print('따뜻해')\nelif temp >= 10:\n    print('선선해')\nelse:\n    print('추워')",
        expect: "선선해"
      }
    },

    // elif 주의점
    {
      type: "explain",
      content: {
        lines: [
          "⚠️ 위에서부터 순서대로 확인해!"
        ],
        code: "# 첫 번째 True인 블록만 실행돼!\nscore = 95\nif score >= 60:     # True → 여기서 끝!\n    print('C이상')\nelif score >= 90:   # 확인 안 해!\n    print('A이상')",
        result: "C이상",
        note: "순서가 중요해! 넓은 조건을 먼저 쓰면 안 돼."
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "if-elif-else 에서 몇 개의 블록이 실행될까?",
        options: [
          "모든 True인 블록 전부",
          "오직 하나만",
          "상황에 따라 다름"
        ],
        answer: 1,
        explanation: "if-elif-else 는 위에서 아래로 확인하다가 처음 True인 블록 하나만 실행해! 나머지는 건너뜀."
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 4,
        title: "elif",
        learned: [
          "elif 로 조건을 여러 개 추가",
          "위에서부터 순서대로 확인",
          "첫 번째 True인 블록만 실행"
        ],
        canDo: "세 가지 이상의 경우를 처리할 수 있어!",
        emoji: "🔢"
      }
    },

    // ==================== CHAPTER 5: 프로젝트 ====================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "등급 판정기",
        desc: "조건문 총 활용!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "홀짝 판단 기억나?",
        task: "num = 8 로 변수 만들고\n짝수면 '짝수', 홀수면 '홀수' 출력해봐",
        template: null,
        answer: "num = 8\nif num % 2 == 0:\n    print('짝수')\nelse:\n    print('홀수')",
        expect: "짝수"
      }
    },

    // 프로젝트 소개
    {
      type: "explain",
      content: {
        lines: [
          "🏆 성적 등급 판정기!"
        ],
        code: "=== 성적 등급 판정기 ===\n점수: 85\n등급: B\n결과: 합격",
        isPreview: true,
        note: "조건문으로 하나씩 만들어보자!"
      }
    },

    // 프로젝트
    {
      type: "project",
      content: {
        step: 1,
        total: 4,
        task: "제목 출력",
        target: "=== 성적 등급 판정기 ===",
        hint: "print('=== 성적 등급 판정기 ===')",
        done: [],
        answer: "print('=== 성적 등급 판정기 ===')"
      }
    },
    {
      type: "project",
      content: {
        step: 2,
        total: 4,
        task: "score = 85 로 변수 만들고\n점수 출력",
        target: "점수: 85",
        hint: "print('점수:', score)",
        done: ["=== 성적 등급 판정기 ==="],
        answer: "score = 85\nprint('점수:', score)"
      }
    },
    {
      type: "project",
      content: {
        step: 3,
        total: 4,
        task: "90 이상 A, 80 이상 B, 70 이상 C, 나머지 D\n등급 출력",
        target: "등급: B",
        hint: "if score >= 90: 'A'\nelif score >= 80: 'B'...",
        done: ["=== 성적 등급 판정기 ===", "점수: 85"],
        answer: "if score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelif score >= 70:\n    grade = 'C'\nelse:\n    grade = 'D'\nprint('등급:', grade)"
      }
    },
    {
      type: "project",
      content: {
        step: 4,
        total: 4,
        task: "60 이상이면 '합격', 아니면 '불합격' 출력",
        target: "결과: 합격",
        hint: "if score >= 60: '합격'",
        done: ["=== 성적 등급 판정기 ===", "점수: 85", "등급: B"],
        answer: "if score >= 60:\n    print('결과: 합격')\nelse:\n    print('결과: 불합격')"
      }
    },

    // 최종 요약
    {
      type: "summary",
      content: {
        num: 5,
        title: "조건문 마스터",
        learned: [
          "if 조건: (콜론 + 들여쓰기 필수)",
          "if ... else ... (둘 중 하나)",
          "if ... elif ... elif ... else (여러 조건)",
          "들여쓰기 없으면 IndentationError"
        ],
        canDo: "다양한 조건에 따라 다른 코드를 실행할 수 있어!",
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
