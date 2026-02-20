import { LessonData } from '../types';

export const lesson14: LessonData = {
  id: "14",
  title: "반복문 (while)",
  description: "조건이 참인 동안 반복!",
  steps: [
    // ==================== CHAPTER 1: 동기 부여 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "while 반복문",
        desc: "조건이 참인 동안 계속!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["while = ~하는 동안 반복!"],
        code: "i = 0\nwhile i < 3:\n    print(i)\n    i += 1",
        isPreview: true,
        note: "조건이 거짓이 될 때까지 반복!"
      }
    },
    {
      type: "reward",
      content: {
        message: "while문을 배워보자!",
        emoji: "🔄"
      }
    },

    // ==================== CHAPTER 2: while 기본 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "while 기본",
        desc: "조건 + 반복!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 for문 복습!",
        task: "0부터 2까지 출력 (for문)",
        template: "for i in ___(___):\n    print(i)",
        blanksAnswer: ["range", "3"],
        answer: "for i in range(3):\n    print(i)",
        expect: "0\n1\n2"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["while문 구조!"],
        code: "count = 1\nwhile count <= 3:\n    print(f'{count}번째')\n    count += 1",
        predict: {
          question: "몇 번 출력될까?",
          options: ["1번", "2번", "3번", "무한"],
          answer: 2,
          feedback: "count가 1→2→3, 3번 반복 후 4가 되면 종료!"
        },
        result: "1번째\n2번째\n3번째"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "5부터 1까지 카운트다운",
        guide: "숫자를 1씩 줄여야 해!",
        hint: "n -= 1 사용!",
        template: "n = 5\nwhile n >= ___:\n    print(n)\n    n ___ 1",
        blanksAnswer: ["1", "-="],
        answer: "n = 5\nwhile n >= 1:\n    print(n)\n    n -= 1",
        expect: "5\n4\n3\n2\n1"
      }
    },
    {
      type: "quiz",
      content: {
        question: "while True:는 어떻게 될까?",
        options: ["1번 실행", "에러", "무한 반복", "실행 안 됨"],
        answer: 2,
        explanation: "True는 항상 참이므로 무한 반복! break로 탈출해야 해요."
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "while 기본",
        learned: [
          "while 조건: = 조건이 참인 동안 반복",
          "변수 업데이트 필수! (안 하면 무한루프)",
          "while True = 무한 반복"
        ],
        canDo: "조건 기반 반복문을 만들 수 있어!",
        emoji: "🔁"
      }
    },

    // ==================== CHAPTER 3: break & continue ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "break & continue",
        desc: "반복 멈추기와 건너뛰기!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["break = 반복 즉시 탈출!"],
        code: "i = 0\nwhile True:\n    if i >= 3:\n        break\n    print(i)\n    i += 1",
        predict: {
          question: "출력 결과는?",
          options: ["0 1 2", "0 1 2 3", "무한 출력", "에러"],
          answer: 0,
          feedback: "i가 3이 되면 break로 탈출!"
        },
        result: "0\n1\n2"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["continue = 이번만 건너뛰기!"],
        code: "for i in range(5):\n    if i == 2:\n        continue\n    print(i)",
        predict: {
          question: "출력 결과는?",
          options: ["0 1 2 3 4", "0 1 3 4", "2", "0 1"],
          answer: 1,
          feedback: "i가 2일 때만 건너뛰고 나머지는 출력!"
        },
        result: "0\n1\n3\n4"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "1~10 중 짝수만 출력 (continue 사용)",
        guide: "홀수일 때 continue!",
        hint: "i % 2 != 0이면 건너뛰기!",
        template: "for i in range(1, 11):\n    if i % 2 ___ 0:\n        ___\n    print(i)",
        blanksAnswer: ["!=", "continue"],
        answer: "for i in range(1, 11):\n    if i % 2 != 0:\n        continue\n    print(i)",
        expect: "2\n4\n6\n8\n10"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "break & continue",
        learned: [
          "break = 반복 완전 종료",
          "continue = 이번 회차만 건너뛰기",
          "while True + break = 유용한 패턴"
        ],
        canDo: "반복을 자유롭게 제어할 수 있어!",
        emoji: "🎮"
      }
    },

    // ==================== CHAPTER 4: 프로젝트 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "숫자 맞추기",
        desc: "while문으로 게임 만들기!"
      }
    },
    {
      type: "project",
      content: {
        step: 1,
        total: 3,
        task: "정답 변수 설정",
        target: "",
        hint: "answer = 7",
        done: [],
        answer: "answer = 7"
      }
    },
    {
      type: "project",
      content: {
        step: 2,
        total: 3,
        task: "반복문으로 입력받기",
        target: "",
        hint: "while True: + input()",
        done: ["answer = 7"],
        answer: "answer = 7\nwhile True:\n    guess = int(input('숫자를 맞춰보세요: '))"
      }
    },
    {
      type: "project",
      content: {
        step: 3,
        total: 3,
        task: "정답 확인 후 break",
        target: "정답!",
        hint: "if guess == answer: break",
        done: ["answer = 7", "while True:", "    guess = int(input('숫자를 맞춰보세요: '))"],
        answer: "answer = 7\nwhile True:\n    guess = int(input('숫자를 맞춰보세요: '))\n    if guess == answer:\n        print('정답!')\n        break\n    elif guess < answer:\n        print('더 크게!')\n    else:\n        print('더 작게!')"
      }
    },
    {
      type: "summary",
      content: {
        num: 4,
        title: "숫자 맞추기 게임",
        learned: [
          "while True + break = 게임 루프",
          "input()으로 사용자 입력",
          "if/elif/else로 힌트 제공"
        ],
        canDo: "while문으로 간단한 게임을 만들 수 있어!",
        emoji: "🎯"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
