import { LessonData } from '../types';

export const lesson7: LessonData = {
    id: "7",
    title: "반복문 (for)",
    description: "같은 작업을 여러 번!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "반복의 힘",
          desc: "100번도 한 줄로!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "Hello를 5번 출력하고 싶어"
          ],
          code: "print('Hello')\nprint('Hello')\nprint('Hello')\nprint('Hello')\nprint('Hello')",
          isError: true,
          note: "100번이면? 😱"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "반복문으로 단 2줄!"
          ],
          code: "for i in range(5):\n    print('Hello')",
          result: "Hello (5번 출력!)",
          note: "이게 반복문의 힘! 💪"
        }
      },

      {
        type: "reward",
        content: {
          message: "for 반복문을 배워보자!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 2: for 기본 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "for 기본",
          desc: "range()로 반복!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! print 복습",
          task: "Hello 출력해봐",
          template: null,
          answer: "print('Hello')",
          expect: "Hello"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "for 기본 구조"
          ],
          code: "for 변수 in range(횟수):\n    반복할 코드",
          note: "range(5) = 5번 반복!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "변수 i는 뭘까?"
          ],
          code: "for i in range(5):\n    print(i)",
          result: "0\n1\n2\n3\n4",
          note: "i는 0부터 4까지 변해!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "range(5)가 만드는 숫자는?",
          options: [
            "1, 2, 3, 4, 5",
            "0, 1, 2, 3, 4",
            "0, 1, 2, 3, 4, 5"
          ],
          answer: 1,
          explanation: "range(5)는 0부터 4까지! 5는 포함 안 됨!"
        }
      },

      // ===== Lv.1: range(n) 연습 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "Hello를 3번 출력해봐",
          guide: "range(3) 사용!",
          template: { before: "for i in range(", after: "):\n    print('Hello')" },
          answer: "3",
          expect: "Hello\nHello\nHello"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "i를 5번 출력해봐 (0~4)",
          template: { before: "for i in range(", after: "):\n    print(i)" },
          answer: "5",
          expect: "0\n1\n2\n3\n4"
        }
      },

      // ===== Lv.2: for 전체 작성 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "0부터 3까지 출력해봐",
          guide: "for i in range(4): 형태!",
          template: null,
          answer: "for i in range(4):\n    print(i)",
          expect: "0\n1\n2\n3"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "'안녕'을 4번 출력해봐",
          template: null,
          answer: "for i in range(4):\n    print('안녕')",
          expect: "안녕\n안녕\n안녕\n안녕"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "for 기본",
          learned: [
            "for i in range(n): 형태",
            "range(5)는 0~4",
            "콜론과 들여쓰기!"
          ],
          canDo: "코드를 여러 번 반복할 수 있어!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 3: range() 더 알아보기 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "range() 활용",
          desc: "시작, 끝, 간격!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "range(시작, 끝)"
          ],
          code: "for i in range(1, 6):\n    print(i)",
          result: "1\n2\n3\n4\n5",
          note: "1부터 5까지! (6은 안 됨)"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "range(시작, 끝, 간격)"
          ],
          code: "for i in range(0, 10, 2):\n    print(i)",
          result: "0\n2\n4\n6\n8",
          note: "2씩 건너뛰기!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "카운트다운!"
          ],
          code: "for i in range(5, 0, -1):\n    print(i)",
          result: "5\n4\n3\n2\n1",
          note: "-1로 거꾸로!"
        }
      },

      // ===== Lv.1: range(시작, 끝) 연습 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "1부터 5까지 출력해봐",
          guide: "range(시작, 끝+1) 형태!",
          template: { before: "for i in range(", after: "):\n    print(i)" },
          answer: "1, 6",
          alternateAnswers: ["1,6"],
          expect: "1\n2\n3\n4\n5"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "10부터 15까지 출력해봐",
          template: { before: "for i in range(", after: "):\n    print(i)" },
          answer: "10, 16",
          alternateAnswers: ["10,16"],
          expect: "10\n11\n12\n13\n14\n15"
        }
      },

      // ===== Lv.2: range(시작, 끝, 간격) 연습 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "0부터 10까지 2씩 건너뛰며 출력해봐",
          guide: "range(시작, 끝, 간격) 형태!",
          template: { before: "for i in range(", after: "):\n    print(i)" },
          answer: "0, 11, 2",
          alternateAnswers: ["0,11,2", "0, 10, 2", "0,10,2"],
          expect: "0\n2\n4\n6\n8\n10"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "5부터 1까지 거꾸로 출력해봐 (카운트다운)",
          guide: "range(시작, 끝, -1) 형태!",
          template: { before: "for i in range(", after: "):\n    print(i)" },
          answer: "5, 0, -1",
          alternateAnswers: ["5,0,-1"],
          expect: "5\n4\n3\n2\n1"
        }
      },

      // ===== Lv.3: for 전체 작성 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "2부터 10까지 짝수만 출력해봐",
          hint: "for i in range(2, 11, 2):",
          template: null,
          answer: "for i in range(2, 11, 2):\n    print(i)",
          alternateAnswers: ["for i in range(2, 10, 2):\n    print(i)"],
          expect: "2\n4\n6\n8\n10"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "range(2, 10, 3)이 만드는 숫자는?",
          options: [
            "2, 5, 8",
            "2, 5, 8, 11",
            "3, 6, 9"
          ],
          answer: 0,
          explanation: "2부터 시작, 3씩 증가, 10 전까지! → 2, 5, 8"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "range() 활용",
          learned: [
            "range(n): 0부터 n-1",
            "range(a, b): a부터 b-1",
            "range(a, b, c): c간격"
          ],
          canDo: "원하는 범위로 반복할 수 있어!",
          emoji: "🔢"
        }
      },

      // ==================== CHAPTER 4: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "구구단 출력기",
          desc: "배운 걸 활용해서 만들기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "변수 출력 기억나?",
          task: "i 변수를 출력해봐",
          template: null,
          answer: "print(i)",
          expect: "1"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "✖️ 구구단 출력기!"
          ],
          code: "=== 7단 ===\n7 x 1 = 7\n7 x 2 = 14\n...\n7 x 9 = 63",
          isPreview: true,
          note: "한 줄씩 만들어보자!"
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "제목 출력 (dan = 7)",
          target: "=== 7단 ===",
          hint: "print('===', dan, '단 ===')",
          done: [],
          answer: "print('===', dan, '단 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "for문 시작 (1부터 9까지)",
          target: "for i in range(1, 10):",
          hint: "for i in range(1, 10):",
          done: ["=== 7단 ==="],
          answer: "for i in range(1, 10):"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "구구단 한 줄 출력",
          target: "7 x 1 = 7",
          hint: "print(dan, 'x', i, '=', dan * i)",
          done: ["=== 7단 ===", "for i in range(1, 10):"],
          answer: "    print(dan, 'x', i, '=', dan * i)"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "for 마스터",
          learned: [
            "for i in range(n): 반복",
            "range(시작, 끝, 간격)",
            "i 변수 활용"
          ],
          canDo: "반복 작업을 자동화할 수 있어!",
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
