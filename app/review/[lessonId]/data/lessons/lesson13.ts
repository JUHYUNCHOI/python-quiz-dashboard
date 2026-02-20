import { LessonData } from '../types';

export const lesson13: LessonData = {
  id: "13",
  title: "반복문 (for)",
  description: "for문으로 반복하기!",
  steps: [
    // ==================== CHAPTER 1: 동기 부여 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "for 반복문",
        desc: "같은 일을 여러 번 반복!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["같은 걸 5번 쓰면 힘들지?"],
        code: 'print("안녕")\nprint("안녕")\nprint("안녕")\nprint("안녕")\nprint("안녕")',
        isPreview: true,
        note: "for문이면 한 줄이면 돼!"
      }
    },
    {
      type: "reward",
      content: {
        message: "반복문을 마스터하자!",
        emoji: "🔁"
      }
    },

    // ==================== CHAPTER 2: range()와 for ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "range()와 for",
        desc: "정해진 횟수만큼 반복!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 조건문 복습!",
        task: "x가 10보다 크면 '크다' 출력",
        template: "x = 15\n___ x > 10:\n    print('크다')",
        blanksAnswer: ["if"],
        answer: "x = 15\nif x > 10:\n    print('크다')",
        expect: "크다"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["for + range() = 정해진 횟수 반복!"],
        code: 'for i in range(3):\n    print("안녕!")',
        predict: {
          question: "몇 번 출력될까?",
          options: ["1번", "2번", "3번", "4번"],
          answer: 2,
          feedback: "range(3)은 0, 1, 2 → 3번 반복!"
        },
        result: "안녕!\n안녕!\n안녕!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["range(시작, 끝)도 가능!"],
        code: "for i in range(1, 4):\n    print(i)",
        predict: {
          question: "출력 결과는?",
          options: ["1 2 3", "1 2 3 4", "0 1 2 3", "0 1 2"],
          answer: 0,
          feedback: "range(1, 4)는 1부터 3까지!"
        },
        result: "1\n2\n3"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "1부터 5까지 출력하기",
        guide: "range(시작, 끝+1) 기억!",
        hint: "range(1, 6)을 사용해봐!",
        template: "for i in range(___,___):\n    print(i)",
        blanksAnswer: ["1", "6"],
        answer: "for i in range(1, 6):\n    print(i)",
        expect: "1\n2\n3\n4\n5"
      }
    },
    {
      type: "quiz",
      content: {
        question: "range(5)는 어떤 숫자를 만들까?",
        options: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "0, 1, 2, 3, 4, 5", "1, 2, 3, 4"],
        answer: 1,
        explanation: "range(5)는 0부터 시작해서 4까지!"
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "range와 for",
        learned: [
          "for i in range(N) = N번 반복",
          "range(시작, 끝) = 시작부터 끝-1까지",
          "i는 반복할 때마다 바뀌는 변수"
        ],
        canDo: "정해진 횟수만큼 반복할 수 있어!",
        emoji: "🔢"
      }
    },

    // ==================== CHAPTER 3: 리스트와 for ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "리스트와 for",
        desc: "리스트 항목을 하나씩 꺼내기!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["리스트를 for문으로 순회!"],
        code: "fruits = ['사과', '바나나', '포도']\nfor fruit in fruits:\n    print(fruit)",
        result: "사과\n바나나\n포도",
        note: "하나씩 꺼내서 fruit에 담아!"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트의 각 이름에 '님' 붙여서 출력",
        guide: "f-string으로 합쳐보자!",
        hint: "f'{name}님' 형태로!",
        template: "names = ['지민', '유진', '민수']\nfor ___ in names:\n    print(f'{___}님')",
        blanksAnswer: ["name", "name"],
        answer: "names = ['지민', '유진', '민수']\nfor name in names:\n    print(f'{name}님')",
        expect: "지민님\n유진님\n민수님"
      }
    },
    {
      type: "quiz",
      content: {
        question: "for x in [10, 20, 30]: print(x) 의 결과는?",
        options: ["10 20 30 (한 줄)", "10\\n20\\n30 (각 줄)", "[10, 20, 30]", "에러"],
        answer: 1,
        explanation: "for문은 각 요소를 하나씩 꺼내서 print하므로 줄바꿈됩니다!"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "리스트와 for",
        learned: [
          "for x in 리스트: = 하나씩 꺼내기",
          "변수 이름은 자유롭게!",
          "문자열도 순회 가능"
        ],
        canDo: "리스트 항목을 하나씩 처리할 수 있어!",
        emoji: "📋"
      }
    },

    // ==================== CHAPTER 4: 합계와 응용 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "for문 응용",
        desc: "합계, 구구단까지!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 range 복습!",
        task: "1부터 3까지 출력",
        template: "for i in range(___, ___):\n    print(i)",
        blanksAnswer: ["1", "4"],
        answer: "for i in range(1, 4):\n    print(i)",
        expect: "1\n2\n3"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["1부터 100까지 합 구하기!"],
        code: "total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)",
        predict: {
          question: "결과는?",
          options: ["100", "5050", "5000", "10000"],
          answer: 1,
          feedback: "1+2+3+...+100 = 5050!"
        },
        result: "5050"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "구구단 3단 출력하기",
        guide: "f-string으로 3 * i = 결과 형태!",
        hint: "range(1, 10)과 3*i를 사용!",
        template: "for i in range(1, 10):\n    print(f'3 * {i} = {___}')",
        blanksAnswer: ["3*i"],
        answer: "for i in range(1, 10):\n    print(f'3 * {i} = {3*i}')",
        expect: "3 * 1 = 3\n3 * 2 = 6\n3 * 3 = 9\n3 * 4 = 12\n3 * 5 = 15\n3 * 6 = 18\n3 * 7 = 21\n3 * 8 = 24\n3 * 9 = 27"
      }
    },
    {
      type: "summary",
      content: {
        num: 4,
        title: "for문 응용",
        learned: [
          "누적 합계: total += i",
          "구구단: f-string + for",
          "range(시작, 끝, 간격) 가능"
        ],
        canDo: "for문으로 다양한 계산을 할 수 있어!",
        emoji: "🧮"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
