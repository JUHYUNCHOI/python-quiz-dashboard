import { LessonData } from '../types';

export const lesson8: LessonData = {
    id: "8",
    title: "반복문 (while)",
    description: "조건이 맞는 동안 반복!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "for vs while",
          desc: "언제 뭘 쓸까?"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "for = 횟수가 정해져 있을 때"
          ],
          code: "for i in range(5):\n    print('Hello')",
          result: "정확히 5번!",
          note: "5번 반복하고 끝!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "while = 언제 끝날지 모를 때"
          ],
          code: "while 조건:\n    반복할 코드",
          result: "조건이 True인 동안 계속!",
          note: "숫자 맞추기 게임처럼!"
        }
      },

      {
        type: "reward",
        content: {
          message: "while 반복문을 배워보자!",
          emoji: "🔁"
        }
      },

      // ==================== CHAPTER 2: while 기본 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "while 기본",
          desc: "조건이 True면 계속!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "for 복습!",
          task: "range(3)으로 i 출력하기",
          hint: "for i in range(3):\n    print(i)",
          template: null,
          answer: "for i in range(3):\n    print(i)",
          expect: "0\n1\n2"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "while 기본 구조"
          ],
          code: "count = 0\nwhile count < 5:\n    print(count)\n    count = count + 1",
          result: "0\n1\n2\n3\n4",
          note: "count가 5가 되면 멈춤!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "⚠️ 이 코드의 문제점은?",
          code: "count = 0\nwhile count < 5:\n    print(count)",
          options: [
            "문제 없음",
            "count가 안 변해서 무한 반복!",
            "print가 잘못됨"
          ],
          answer: 1,
          explanation: "count += 1이 없어서 영원히 0만 출력해! Ctrl+C로 멈춰야 해!"
        }
      },

      // ===== Lv.1: while 조건 채우기 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "count가 3보다 작을 때 반복해봐",
          guide: "while count < 3: 형태!",
          template: { before: "count = 0\nwhile count < ", after: ":\n    print(count)\n    count += 1" },
          answer: "3",
          expect: "0\n1\n2"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "count가 5보다 작거나 같을 때 반복해봐",
          guide: "<= 사용!",
          template: { before: "count = 0\nwhile count ", after: " 5:\n    print(count)\n    count += 1" },
          answer: "<=",
          expect: "0\n1\n2\n3\n4\n5"
        }
      },

      // ===== Lv.2: while 전체 작성 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "1부터 5까지 출력해봐 (while 사용)",
          guide: "num = 1부터 시작!",
          template: null,
          answer: "num = 1\nwhile num <= 5:\n    print(num)\n    num += 1",
          expect: "1\n2\n3\n4\n5"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "5부터 1까지 거꾸로 출력해봐 (while 사용)",
          guide: "num = 5부터, num -= 1 사용!",
          template: null,
          answer: "num = 5\nwhile num >= 1:\n    print(num)\n    num -= 1",
          expect: "5\n4\n3\n2\n1"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "while 기본",
          learned: [
            "while 조건: 형태",
            "조건이 True면 계속",
            "변수 업데이트 필수!"
          ],
          canDo: "조건에 따라 반복할 수 있어!",
          emoji: "🔁"
        }
      },

      // ==================== CHAPTER 3: break와 continue ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "break와 continue",
          desc: "반복 제어하기!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "break = 반복 탈출!"
          ],
          code: "while True:\n    answer = input('종료? ')\n    if answer == 'y':\n        break\nprint('끝!')",
          result: "y 입력하면 탈출!",
          note: "while True는 무한 반복, break로 탈출!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "continue = 건너뛰기!"
          ],
          code: "for i in range(5):\n    if i == 2:\n        continue\n    print(i)",
          result: "0\n1\n3\n4",
          note: "2는 건너뛰고 다음으로!"
        }
      },

      // ===== Lv.2: break 연습 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "i가 3이면 반복을 멈춰봐",
          guide: "if i == 3: break 패턴!",
          template: null,
          answer: "for i in range(10):\n    if i == 3:\n        break\n    print(i)",
          expect: "0\n1\n2"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "while True로 무한 반복하다가 count가 5면 탈출해봐",
          guide: "while True: + if count == 5: break",
          template: null,
          answer: "count = 0\nwhile True:\n    print(count)\n    count += 1\n    if count == 5:\n        break",
          expect: "0\n1\n2\n3\n4"
        }
      },

      // ===== Lv.2: continue 연습 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "i가 2면 건너뛰고 나머지 출력해봐",
          guide: "if i == 2: continue 패턴!",
          template: null,
          answer: "for i in range(5):\n    if i == 2:\n        continue\n    print(i)",
          expect: "0\n1\n3\n4"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "break vs continue 차이는?",
          options: [
            "break=탈출, continue=다음으로",
            "break=다음으로, continue=탈출",
            "둘 다 같음"
          ],
          answer: 0,
          explanation: "break는 반복문 완전 탈출! continue는 이번만 건너뛰고 계속!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "break와 continue",
          learned: [
            "break: 완전 탈출",
            "continue: 건너뛰기",
            "while True + break 패턴"
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
          title: "숫자 맞추기 게임",
          desc: "배운 걸 활용해서 만들기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "조건문 복습!",
          task: "guess == answer면 '정답!' 출력",
          hint: "if guess == answer:\n    print('정답!')",
          template: null,
          answer: "if guess == answer:\n    print('정답!')",
          expect: "정답!"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "🎲 숫자 맞추기 게임!"
          ],
          code: "숫자 입력: 50\n⬆️ 더 큽니다!\n숫자 입력: 75\n⬇️ 더 작습니다!\n숫자 입력: 63\n🎉 정답!",
          isPreview: true,
          note: "맞출 때까지 반복!"
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 4,
          task: "무한 반복 시작",
          target: "while True:",
          hint: "while True:",
          done: [],
          answer: "while True:"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "정답이면 '🎉 정답!' 출력하고 탈출",
          target: "🎉 정답!",
          hint: "if guess == answer:\n        print('🎉 정답!')\n        break",
          done: ["while True:", "    guess = int(input('숫자: '))"],
          answer: "    if guess == answer:\n        print('🎉 정답!')\n        break"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "작으면 '⬆️ 더 큽니다!' 출력",
          target: "⬆️ 더 큽니다!",
          hint: "elif guess < answer:\n        print('⬆️ 더 큽니다!')",
          done: ["while True:", "    guess = int(input())", "    if: 정답!"],
          answer: "    elif guess < answer:\n        print('⬆️ 더 큽니다!')"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "크면 '⬇️ 더 작습니다!' 출력",
          target: "⬇️ 더 작습니다!",
          hint: "else:\n        print('⬇️ 더 작습니다!')",
          done: ["while True:", "if: 정답!", "elif: 더 큽니다!"],
          answer: "    else:\n        print('⬇️ 더 작습니다!')"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "while 마스터",
          learned: [
            "while 조건: 반복",
            "while True + break",
            "continue로 건너뛰기"
          ],
          canDo: "조건에 따른 반복 프로그램을 만들 수 있어!",
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
