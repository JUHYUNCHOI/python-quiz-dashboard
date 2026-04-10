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
        expect: "0\n1\n2",
        en: {
          message: "🔄 for loop review!",
          task: "Print 0 to 2 (using for loop)"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "count = 1\nwhile count <= 3:\n    print(f'{count}번째')\n    count += 1",
        predict: {
          question: "몇 번 출력될까?",
          options: ["1번", "2번", "3번", "무한"],
          answer: 2,
          feedback: "count가 1→2→3, 3번 반복 후 4가 되면 종료!"
        },
        result: "1번째\n2번째\n3번째",
        en: {
          predict: {
            question: "How many times will it print?",
            options: ["1 time", "2 times", "3 times", "Infinite"],
            feedback: "count goes 1→2→3, then becomes 4 and the loop ends after 3 repetitions!"
          }
        }
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
        expect: "5\n4\n3\n2\n1",
        en: {
          task: "Countdown from 5 to 1",
          guide: "Decrease the number by 1 each time!",
          hint: "Use n -= 1!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "while True:는 어떻게 될까?",
        options: ["1번 실행", "에러", "무한 반복", "실행 안 됨"],
        answer: 2,
        explanation: "True는 항상 참이므로 무한 반복! break로 탈출해야 해요.",
        en: {
          question: "What happens with while True:?",
          options: ["Runs once", "Error", "Infinite loop", "Doesn't run"],
          explanation: "True is always truthy, so it loops forever! Use break to exit."
        }
      }
    },
    // ===== 직접 써보기: while 기본 =====
    {
      type: "practice",
      content: {
        level: 3,
        task: "이렇게 나오게 해봐 ↓\n0\n1\n2",
        guide: "while문 전체를 직접 써봐! (i = 0부터 시작)",
        hint: "i = 0\nwhile i < 3:\n    print(i)\n    i += 1",
        template: null,
        answer: "i = 0\nwhile i < 3:\n    print(i)\n    i += 1",
        expect: "0\n1\n2",
        en: {
          task: "Make it print like this ↓\n0\n1\n2",
          guide: "Write the entire while loop yourself! (start with i = 0)",
          hint: "i = 0\nwhile i < 3:\n    print(i)\n    i += 1"
        }
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
        lines: [],
        code: "i = 0\nwhile True:\n    if i >= 3:\n        break\n    print(i)\n    i += 1",
        predict: {
          question: "출력 결과는?",
          options: ["0 1 2", "0 1 2 3", "무한 출력", "에러"],
          answer: 0,
          feedback: "i가 3이 되면 break로 탈출!"
        },
        result: "0\n1\n2",
        en: {
          predict: {
            question: "What's the output?",
            options: ["0 1 2", "0 1 2 3", "Infinite output", "Error"],
            feedback: "When i becomes 3, break exits the loop!"
          }
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "for i in range(5):\n    if i == 2:\n        continue\n    print(i)",
        predict: {
          question: "출력 결과는?",
          options: ["0 1 2 3 4", "0 1 3 4", "2", "0 1"],
          answer: 1,
          feedback: "i가 2일 때만 건너뛰고 나머지는 출력!"
        },
        result: "0\n1\n3\n4",
        en: {
          predict: {
            question: "What's the output?",
            options: ["0 1 2 3 4", "0 1 3 4", "2", "0 1"],
            feedback: "Only skips when i is 2, prints everything else!"
          }
        }
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
        expect: "2\n4\n6\n8\n10",
        en: {
          task: "Print only even numbers from 1 to 10 (using continue)",
          guide: "Use continue when odd!",
          hint: "Skip if i % 2 != 0!"
        }
      }
    },
    // ===== 직접 써보기: while 카운트다운 =====
    {
      type: "practice",
      content: {
        level: 3,
        task: "이렇게 나오게 해봐 ↓\n5\n4\n3\n2\n1",
        guide: "while 카운트다운 전체를 직접 써봐!",
        template: null,
        answer: "n = 5\nwhile n >= 1:\n    print(n)\n    n -= 1",
        expect: "5\n4\n3\n2\n1",
        en: {
          task: "Make it print like this ↓\n5\n4\n3\n2\n1",
          guide: "Write the entire while countdown yourself!"
        }
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

    // ==================== CHAPTER 5: while 손에 익히기 ====================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "while 손에 익히기",
        desc: "while 조건, break, 카운트다운 — 손이 기억할 때까지!"
      }
    },

    // Drill 1: while 기본 조건
    {
      type: "practice",
      content: {
        level: 1,
        task: "n이 5 미만인 동안 출력하는 while문을 완성해요",
        guide: "while 조건: + 변수 증가",
        template: "n = 0\nwhile n ___ 5:\n    print(n)\n    n ___ 1",
        blanksAnswer: ["<", "+="],
        answer: "n = 0\nwhile n < 5:\n    print(n)\n    n += 1",
        expect: "0\n1\n2\n3\n4",
        en: {
          task: "Complete the while loop that prints while n is less than 5",
          guide: "while condition: + increment variable"
        }
      }
    },

    // Drill 2: while + break
    {
      type: "practice",
      content: {
        level: 2,
        task: "0부터 시작해서 i가 3이 되면 break로 탈출하는 while True 루프를 완성해요",
        guide: "while True: + if 조건: break",
        template: "i = 0\nwhile ___:\n    if i == 3:\n        ___\n    print(i)\n    i += 1",
        blanksAnswer: ["True", "break"],
        answer: "i = 0\nwhile True:\n    if i == 3:\n        break\n    print(i)\n    i += 1",
        expect: "0\n1\n2",
        en: {
          task: "Complete a while True loop that breaks when i equals 3",
          guide: "while True: + if condition: break"
        }
      }
    },

    // Drill 3: 홀수만 출력
    {
      type: "practice",
      content: {
        level: 2,
        task: "1~10 중 홀수만 while문으로 출력해요 (continue 사용)",
        guide: "짝수면 continue, 홀수면 print",
        template: "i = 1\nwhile i <= 10:\n    if i % 2 == ___:\n        i += 1\n        ___\n    print(i)\n    i += 1",
        blanksAnswer: ["0", "continue"],
        answer: "i = 1\nwhile i <= 10:\n    if i % 2 == 0:\n        i += 1\n        continue\n    print(i)\n    i += 1",
        expect: "1\n3\n5\n7\n9",
        en: {
          task: "Print only odd numbers from 1 to 10 using while and continue",
          guide: "continue for even, print for odd"
        }
      }
    },

    // Drill 4: 처음부터 — 합계가 100 넘을 때까지
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! 1부터 더해나가다가 합계가 100을 초과하는 순간 멈추고\n그때의 합계와 마지막으로 더한 숫자를 출력해요",
        guide: "while total <= 100: total += i; i += 1",
        hint: "total = 0\ni = 1\nwhile total <= 100:\n    total += i\n    i += 1\nprint(total)\nprint(i - 1)",
        template: null,
        answer: "total = 0\ni = 1\nwhile total <= 100:\n    total += i\n    i += 1\nprint(total)\nprint(i - 1)",
        alternateAnswers: [
          "total=0\ni=1\nwhile total<=100:\n    total+=i\n    i+=1\nprint(total)\nprint(i-1)"
        ],
        expect: "105\n14",
        en: {
          task: "Write from scratch! Keep adding numbers starting from 1 until the total exceeds 100\nPrint the total and the last number added",
          guide: "while total <= 100: total += i; i += 1",
          hint: "total = 0\ni = 1\nwhile total <= 100:\n    total += i\n    i += 1\nprint(total)\nprint(i - 1)"
        }
      }
    },

    // Drill 5: 처음부터 — 카운트다운 + 발사
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! 10에서 1까지 카운트다운하고 마지막에 '발사!'를 출력해요",
        guide: "n = 10; while n >= 1: print(n); n -= 1; print('발사!')",
        hint: "n = 10\nwhile n >= 1:\n    print(n)\n    n -= 1\nprint('발사!')",
        template: null,
        answer: "n = 10\nwhile n >= 1:\n    print(n)\n    n -= 1\nprint('발사!')",
        alternateAnswers: [
          "n=10\nwhile n>=1:\n    print(n)\n    n-=1\nprint('발사!')"
        ],
        expect: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1\n발사!",
        en: {
          task: "Write from scratch! Count down from 10 to 1, then print '발사!'",
          guide: "n = 10; while n >= 1: print(n); n -= 1; print('발사!')",
          hint: "n = 10\nwhile n >= 1:\n    print(n)\n    n -= 1\nprint('발사!')"
        }
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
