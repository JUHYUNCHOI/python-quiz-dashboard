import { LessonData } from '../types';

export const lesson6: LessonData = {
    id: "6",
    title: "조건문 (if)",
    description: "상황에 따라 다르게!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "자판기를 생각해봐",
          desc: "상황에 따라 다르게 동작!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "🧋 음료 자판기는 어떻게 동작할까?"
          ],
          code: "돈이 충분하면 → 음료가 나와요! 🍺\n돈이 부족하면 → \"돈이 부족합니다\" 🙅",
          isPreview: true,
          note: "상황에 따라 다르게 동작해!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "🎮 오늘 만들 것!"
          ],
          code: "=== RPG 직업 선택기 ===\n힘: 15 → 전사 ⚔️\n힘: 7 → 궁수 🏹",
          isPreview: true,
          note: "스탯에 따라 직업이 바뀌어!"
        }
      },

      {
        type: "reward",
        content: {
          message: "조건문을 배워보자!",
          emoji: "🔀"
        }
      },

      // ==================== CHAPTER 2: 비교 연산자 복습 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "비교 연산자 복습",
          desc: "조건을 만드는 방법!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "비교 연산자 기억나?",
          task: "10 > 5 출력해봐",
          template: null,
          answer: "print(10 > 5)",
          expect: "True"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "비교 결과는 True/False!"
          ],
          code: "10 > 5   → True\n10 < 5   → False\n10 == 10 → True\n10 != 5  → True",
          note: "이 결과로 조건을 판단해!"
        }
      },

      // ===== Lv.1: 비교 연습 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "100 >= 100 비교해봐",
          template: { before: "print(", after: ")" },
          answer: "100 >= 100",
          alternateAnswers: ["100>=100"],
          expect: "True"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "50 == 60 비교해봐",
          template: { before: "print(", after: ")" },
          answer: "50 == 60",
          alternateAnswers: ["50==60"],
          expect: "False"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "비교 연산자",
          learned: [
            "> < >= <= 크기 비교",
            "== 같다, != 다르다",
            "결과는 True/False"
          ],
          canDo: "조건을 만들 수 있어!",
          emoji: "⚖️"
        }
      },

      // ==================== CHAPTER 3: if 기본 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "if 기본",
          desc: "조건이 맞으면 실행!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "if = 만약 ~라면"
          ],
          code: "if 조건:\n    실행할 코드",
          note: "조건이 True면 실행!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "예시: 자판기"
          ],
          code: "money = 1500\nif money >= 1000:\n    print('음료 구매 가능!')",
          result: "음료 구매 가능!",
          note: "1500은 1000 이상이니까 실행!"
        }
      },

      // ⚠️ 들여쓰기
      {
        type: "explain",
        content: {
          lines: [
            "⚠️ 들여쓰기 필수!"
          ],
          code: "if money >= 1000:\n    print('OK')  # ✅ 들여쓰기 있음\nprint('끝')      # 들여쓰기 없음 = if 밖",
          note: "들여쓰기 = 'if 안에 있다'는 표시!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "에러 나는 코드는?",
          code: "a. if score >= 60:\n       print('합격')\n\nb. if score >= 60\n       print('합격')",
          options: [
            "a만 에러",
            "b만 에러 (콜론 없음)",
            "둘 다 에러"
          ],
          answer: 1,
          explanation: "if 뒤에 콜론(:) 필수! b는 콜론이 없어서 에러야!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "if 조건: 에서 꼭 필요한 것 2가지는?",
          options: [
            "콜론(:)과 괄호",
            "콜론(:)과 들여쓰기",
            "괄호와 세미콜론"
          ],
          answer: 1,
          explanation: "if 뒤에 콜론(:), 다음 줄에 들여쓰기!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "if 기본",
          learned: [
            "if 조건: 형태",
            "콜론(:) 필수",
            "들여쓰기 필수"
          ],
          canDo: "조건에 따라 코드를 실행할 수 있어!",
          emoji: "✅"
        }
      },

      // ==================== CHAPTER 4: if-else ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "if-else",
          desc: "맞으면/아니면!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "else = 그렇지 않으면"
          ],
          code: "if 조건:\n    맞으면 실행\nelse:\n    아니면 실행",
          note: "두 가지 중 하나는 무조건 실행!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "예시: 자판기"
          ],
          code: "money = 500\nif money >= 1000:\n    print('구매 가능!')\nelse:\n    print('돈 부족!')",
          result: "돈 부족!",
          note: "500은 1000 미만이니까 else 실행!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "hp = 0일 때 출력 결과는?",
          options: [
            "살아있음",
            "Game Over",
            "아무것도 안 나옴"
          ],
          answer: 1,
          explanation: "hp > 0이 False니까 else가 실행돼!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "if-else",
          learned: [
            "else = 조건이 아닐 때",
            "둘 중 하나는 무조건 실행",
            "else 뒤에도 콜론(:)"
          ],
          canDo: "두 가지 경우를 처리할 수 있어!",
          emoji: "🔀"
        }
      },

      // ==================== CHAPTER 5: if-elif-else ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "if-elif-else",
          desc: "여러 조건 비교!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "elif = else if (또 다른 조건)"
          ],
          code: "if 조건1:\n    조건1 맞으면\nelif 조건2:\n    조건2 맞으면\nelse:\n    다 아니면",
          note: "조건을 여러 개 확인!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "예시: 게임 등급"
          ],
          code: "points = 750\nif points >= 1000:\n    print('다이아 💎')\nelif points >= 500:\n    print('골드 🥇')\nelse:\n    print('실버 🥈')",
          result: "골드 🥇",
          note: "750은 500 이상이니까 골드!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "score = 85일 때 결과는?",
          code: "if score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelse:\n    print('F')",
          options: [
            "A",
            "B",
            "C"
          ],
          answer: 1,
          explanation: "85는 90 미만이지만 80 이상! 첫 번째 True인 elif에서 멈춰!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "if-elif-else",
          learned: [
            "elif = 또 다른 조건",
            "위에서부터 순서대로 확인",
            "첫 번째 True에서 멈춤"
          ],
          canDo: "여러 조건을 처리할 수 있어!",
          emoji: "📊"
        }
      },

      // ==================== CHAPTER 6: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 6,
          title: "RPG 직업 선택기",
          desc: "배운 걸 활용해서 만들기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "if 기억나?",
          task: "level >= 10이면 '입장!' 출력",
          hint: "if level >= 10:\n    print('입장!')",
          template: null,
          answer: "if level >= 10:\n    print('입장!')",
          expect: "입장!"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "⚔️ RPG 직업 선택기!"
          ],
          code: "=== RPG 직업 선택기 ===\n힘 15이상 → 전사\n힘 10이상 → 기사\n힘 5이상 → 궁수\n그 외 → 마법사",
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
          target: "=== RPG 직업 선택기 ===",
          hint: "print('=== RPG 직업 선택기 ===')",
          done: [],
          answer: "print('=== RPG 직업 선택기 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "힘 15 이상이면 '전사 ⚔️' 출력 (if)",
          target: "전사 ⚔️",
          hint: "if strength >= 15:\n    print('전사 ⚔️')",
          done: ["=== RPG 직업 선택기 ==="],
          answer: "if strength >= 15:\n    print('전사 ⚔️')"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "힘 10 이상이면 '기사 🛡️' 출력 (elif)",
          target: "기사 🛡️",
          hint: "elif strength >= 10:\n    print('기사 🛡️')",
          done: ["=== RPG 직업 선택기 ===", "if strength >= 15: 전사"],
          answer: "elif strength >= 10:\n    print('기사 🛡️')"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "그 외는 '마법사 🧙' 출력 (else)",
          target: "마법사 🧙",
          hint: "else:\n    print('마법사 🧙')",
          done: ["=== RPG 직업 선택기 ===", "if: 전사", "elif: 기사"],
          answer: "else:\n    print('마법사 🧙')"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 6,
          title: "조건문 마스터",
          learned: [
            "if: 조건이 맞으면",
            "elif: 또 다른 조건",
            "else: 다 아니면",
            "콜론과 들여쓰기 필수!"
          ],
          canDo: "상황에 따라 다르게 동작하는 프로그램을 만들 수 있어!",
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
