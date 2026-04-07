import { LessonData } from '../types';

export const lesson8: LessonData = {
  id: "8",
  title: "f-string",
  description: "변수를 문자열 안에 쏙!",
  steps: [
    // ==================== CHAPTER 1: 동기 부여 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "f-string 소개",
        desc: "변수를 문자열 안에 넣기!"
      }
    },

    // 프리뷰
    {
      type: "explain",
      content: {
        lines: [
          "🎯 오늘 만들 것!"
        ],
        code: "name = '지민'\nscore = 95\nprint(f'{name}의 점수: {score}점')",
        result: "지민의 점수: 95점",
        isPreview: true,
        note: "변수를 문자열 안에 바로 넣을 수 있어!"
      }
    },

    {
      type: "reward",
      content: {
        message: "f-string 마스터 시작!",
        emoji: "✨"
      }
    },

    // ==================== CHAPTER 2: 기본 f-string ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "기본 f-string",
        desc: "f'' 안에 {변수} 넣기!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "잠깐! 변수 기억나?",
        task: "name = '코린이' 로 변수 만들고 출력해봐",
        template: null,
        answer: "name = '코린이'\nprint(name)",
        expect: "코린이"
      }
    },

    // f-string 기본
    {
      type: "explain",
      content: {
        lines: [
          "f-string: 문자열 앞에 f를 붙여!"
        ],
        code: "name = '지민'\nprint(f'안녕, {name}!')   # 안녕, 지민!\nprint(f'이름: {name}')   # 이름: 지민",
        note: "f'' 안에서 {변수} 로 값을 넣어!"
      }
    },

    // ===== Lv.1: 기본 변수 삽입 =====
    {
      type: "practice",
      content: {
        level: 1,
        task: "city = '서울' 로 변수 만들고,\nf-string으로 '나는 서울에 살아' 출력해봐",
        guide: "f'나는 {city}에 살아'",
        template: null,
        answer: "city = '서울'\nprint(f'나는 {city}에 살아')",
        expect: "나는 서울에 살아"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "age = 15 로 변수 만들고,\nf-string으로 '내 나이는 15살이야' 출력해봐",
        guide: "f'내 나이는 {age}살이야'",
        template: null,
        answer: "age = 15\nprint(f'내 나이는 {age}살이야')",
        expect: "내 나이는 15살이야"
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "name = '민준' 일 때, f'안녕 {name}' 의 출력은?",
        options: [
          "안녕 {name}",
          "안녕 민준",
          "에러"
        ],
        answer: 1,
        explanation: "f-string에서 {name}은 변수의 값으로 바뀌어! 그래서 '안녕 민준'이 출력돼."
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 2,
        title: "기본 f-string",
        learned: [
          "f'' 앞에 f를 붙인다",
          "{변수} 로 값을 삽입",
          "숫자 변수도 바로 삽입 가능"
        ],
        canDo: "변수를 문자열 안에 넣을 수 있어!",
        emoji: "🔤"
      }
    },

    // ==================== CHAPTER 3: 식 계산 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "식 계산",
        desc: "{ } 안에서 계산도 돼!"
      }
    },

    // 식 삽입
    {
      type: "explain",
      content: {
        lines: [
          "{ } 안에 계산식도 넣을 수 있어!"
        ],
        code: "a = 10\nb = 5\nprint(f'{a} + {b} = {a + b}')",
        result: "10 + 5 = 15",
        note: "{ } 안에 변수뿐만 아니라 계산식도 OK!"
      }
    },

    // ===== Lv.2: 식 계산 =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "price = 1000, count = 3 으로 변수 만들고,\nf-string으로 '총 가격: 3000원' 출력해봐",
        guide: "f'총 가격: {price * count}원'",
        template: null,
        answer: "price = 1000\ncount = 3\nprint(f'총 가격: {price * count}원')",
        expect: "총 가격: 3000원"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "x = 7, y = 3 으로 변수 만들고,\nf'{x} - {y} = {x - y}' 출력해봐",
        template: null,
        answer: "x = 7\ny = 3\nprint(f'{x} - {y} = {x - y}')",
        expect: "7 - 3 = 4"
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "a = 6, b = 2 일 때, f'{a * b}' 의 출력은?",
        options: [
          "{a * b}",
          "6 * 2",
          "12"
        ],
        answer: 2,
        explanation: "{ } 안의 식이 계산돼서 6 * 2 = 12가 출력돼!"
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 3,
        title: "식 계산",
        learned: [
          "{ } 안에 계산식도 OK",
          "f'{a + b}' 처럼 계산 결과 삽입",
          "변수와 계산을 함께 출력"
        ],
        canDo: "f-string 안에서 계산도 할 수 있어!",
        emoji: "🧮"
      }
    },

    // ==================== CHAPTER 4: 소수점 포맷 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "소수점 포맷",
        desc: ":.2f 로 소수점 자리 지정!"
      }
    },

    // 소수점 포맷
    {
      type: "explain",
      content: {
        lines: [
          ":.2f 로 소수점 자리 수를 정해!"
        ],
        code: "pi = 3.14159\nprint(f'{pi:.2f}')   # 3.14\nprint(f'{pi:.4f}')   # 3.1416",
        note: ":.2f = 소수점 2자리, :.4f = 소수점 4자리"
      }
    },

    // ===== Lv.2: 소수점 포맷 =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "avg = 87.6789 로 변수 만들고,\nf-string으로 소수점 2자리만 출력해봐 (87.68)",
        guide: "f'{avg:.2f}'",
        template: null,
        answer: "avg = 87.6789\nprint(f'{avg:.2f}')",
        expect: "87.68"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "price = 1234.5 로 변수 만들고,\n'가격: 1234.50원' 형식으로 출력해봐",
        guide: "f'가격: {price:.2f}원'",
        template: null,
        answer: "price = 1234.5\nprint(f'가격: {price:.2f}원')",
        expect: "가격: 1234.50원"
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "n = 3.14159 일 때, f'{n:.1f}' 의 출력은?",
        options: [
          "3.14",
          "3.1",
          "3.14159"
        ],
        answer: 1,
        explanation: ":.1f는 소수점 1자리! 그래서 3.1이 출력돼 (반올림)."
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 4,
        title: "소수점 포맷",
        learned: [
          ":.2f → 소수점 2자리",
          ":.4f → 소수점 4자리",
          "자동으로 반올림해줘"
        ],
        canDo: "소수점 자리를 원하는 만큼 표시할 수 있어!",
        emoji: "🔢"
      }
    },

    // ==================== CHAPTER 5: 0 채우기와 메서드 ====================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "0 채우기와 메서드",
        desc: ":03d 와 메서드 호출!"
      }
    },

    // 0 채우기
    {
      type: "explain",
      content: {
        lines: [
          ":03d 로 앞을 0으로 채워!"
        ],
        code: "n = 7\nprint(f'{n:03d}')   # 007\nprint(f'{n:05d}')   # 00007",
        note: ":03d = 3자리, 빈 자리는 0으로 채움"
      }
    },

    // ===== Lv.2: 0 채우기 =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "num = 42 로 변수 만들고,\n'042' 처럼 3자리로 0 채워서 출력해봐",
        guide: "f'{num:03d}'",
        template: null,
        answer: "num = 42\nprint(f'{num:03d}')",
        expect: "042"
      }
    },

    // 메서드 호출
    {
      type: "explain",
      content: {
        lines: [
          "{ } 안에서 메서드도 호출돼!"
        ],
        code: "name = 'python'\nprint(f'{name.upper()}')   # PYTHON\nprint(f'{name.title()}')   # Python",
        note: "{ } 안에서 .upper(), .lower() 등 메서드 사용 OK!"
      }
    },

    // ===== Lv.2: 메서드 호출 =====
    {
      type: "practice",
      content: {
        level: 2,
        task: "lang = 'python' 으로 변수 만들고,\nf-string으로 'PYTHON' (대문자) 출력해봐",
        guide: "f'{lang.upper()}'",
        template: null,
        answer: "lang = 'python'\nprint(f'{lang.upper()}')",
        expect: "PYTHON"
      }
    },

    // 퀴즈
    {
      type: "quiz",
      content: {
        question: "n = 5 일 때, f'{n:04d}' 의 출력은?",
        options: [
          "5",
          "0005",
          "5000"
        ],
        answer: 1,
        explanation: ":04d는 4자리! 빈 자리를 0으로 채우니까 0005가 출력돼."
      }
    },

    // 요약
    {
      type: "summary",
      content: {
        num: 5,
        title: "포맷 옵션",
        learned: [
          ":03d → 0 채우기 (3자리)",
          "{ } 안에서 메서드 호출 가능",
          "f'{name.upper()}' 처럼 사용"
        ],
        canDo: "f-string으로 다양한 형태로 출력할 수 있어!",
        emoji: "🎨"
      }
    },

    // ==================== CHAPTER 6: 프로젝트 ====================
    {
      type: "chapter",
      content: {
        num: 6,
        title: "성적표 만들기",
        desc: "f-string으로 깔끔하게!"
      }
    },

    // 복습
    {
      type: "interleaving",
      content: {
        message: "소수점 포맷 기억나?",
        task: "pi = 3.14159 를 소수점 2자리로 출력해봐",
        template: null,
        answer: "pi = 3.14159\nprint(f'{pi:.2f}')",
        expect: "3.14"
      }
    },

    // 프로젝트 소개
    {
      type: "explain",
      content: {
        lines: [
          "📋 성적표 만들기!"
        ],
        code: "=== 성적표 ===\n이름: 김민준\n점수: 92.67점\n등급: A",
        isPreview: true,
        note: "f-string으로 하나씩 만들어보자!"
      }
    },

    // 프로젝트
    {
      type: "project",
      content: {
        step: 1,
        total: 4,
        task: "제목 출력",
        target: "=== 성적표 ===",
        hint: "print('=== 성적표 ===')",
        done: [],
        answer: "print('=== 성적표 ===')"
      }
    },
    {
      type: "project",
      content: {
        step: 2,
        total: 4,
        task: "name = '김민준' 으로 변수 만들고\nf-string으로 이름 출력",
        target: "이름: 김민준",
        hint: "f'이름: {name}'",
        done: ["=== 성적표 ==="],
        answer: "name = '김민준'\nprint(f'이름: {name}')"
      }
    },
    {
      type: "project",
      content: {
        step: 3,
        total: 4,
        task: "score = 92.6666 으로 변수 만들고\n소수점 2자리로 출력",
        target: "점수: 92.67점",
        hint: "f'점수: {score:.2f}점'",
        done: ["=== 성적표 ===", "이름: 김민준"],
        answer: "score = 92.6666\nprint(f'점수: {score:.2f}점')"
      }
    },
    {
      type: "project",
      content: {
        step: 4,
        total: 4,
        task: "grade = 'a' 로 변수 만들고\n대문자로 등급 출력",
        target: "등급: A",
        hint: "f'등급: {grade.upper()}'",
        done: ["=== 성적표 ===", "이름: 김민준", "점수: 92.67점"],
        answer: "grade = 'a'\nprint(f'등급: {grade.upper()}')"
      }
    },

    // 최종 요약
    {
      type: "summary",
      content: {
        num: 6,
        title: "f-string 마스터",
        learned: [
          "f'{변수}' → 변수 값 삽입",
          "f'{식}' → 계산 결과 삽입",
          "f'{n:.2f}' → 소수점 2자리",
          "f'{n:03d}' → 0 채우기",
          "f'{s.upper()}' → 메서드 호출"
        ],
        canDo: "f-string으로 원하는 형태의 문자열을 만들 수 있어!",
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
