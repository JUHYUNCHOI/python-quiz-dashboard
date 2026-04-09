import { LessonData } from '../types';

export const lesson7: LessonData = {
    id: "7",
    title: "print() 옵션",
    description: "sep와 end로 출력 형식 바꾸기!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "출력 형식을 바꿔보자",
          desc: "sep와 end로 자유자재로!"
        }
      },

      // 프리뷰
      {
        type: "explain",
        content: {
          lines: [
            "🖨️ 오늘 만들 것!"
          ],
          code: "2024-03-15\nA B C D E\n로딩중... 완료!",
          isPreview: true,
          note: "sep와 end를 배우면 이렇게 만들 수 있어!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "print()에는 옵션이 있어!"
          ],
          code: "print('A', 'B', 'C')           → A B C\nprint('A', 'B', sep='-')      → A-B-C\nprint('Hello', end=' ')        → Hello (줄바꿈 없음)",
          isPreview: true,
          note: "sep = 구분자, end = 끝 문자!"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "print() 옵션 마스터!",
          emoji: "🖨️"
        }
      },

      // ==================== CHAPTER 2: sep 옵션 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "sep 옵션",
          desc: "값 사이 구분 문자 바꾸기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! print() 기본 복습",
          task: "'Hello' 와 'World' 를 한 번에 출력해봐",
          template: null,
          answer: "print('Hello', 'World')",
          expect: "Hello World",
          en: {
            message: "Wait! Quick review of print() basics",
            task: "Print 'Hello' and 'World' at once"
          }
        }
      },

      // sep 기본값
      {
        type: "explain",
        content: {
          lines: [
            "print()의 기본 구분자는 공백!"
          ],
          code: "print('A', 'B', 'C')       → A B C\nprint(1, 2, 3)             → 1 2 3",
          note: "값들 사이에 자동으로 공백이 들어가!"
        }
      },

      // sep 사용
      {
        type: "explain",
        content: {
          lines: [
            "sep= 로 구분자를 바꿀 수 있어!"
          ],
          code: "print('A', 'B', 'C', sep='-')   → A-B-C\nprint('A', 'B', 'C', sep=', ')  → A, B, C\nprint('A', 'B', 'C', sep='')    → ABC",
          note: "sep= 에 원하는 구분자를 넣어!"
        }
      },

      // ===== Lv.1: sep 연습 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "'사과', '바나나', '딸기' 를 '-' 로 구분해서 출력해봐",
          guide: "sep='-' 사용!",
          template: { before: "print(", after: ")" },
          answer: "'사과', '바나나', '딸기', sep='-'",
          alternateAnswers: ["'사과','바나나','딸기',sep='-'"],
          expect: "사과-바나나-딸기",
          en: {
            task: "Print '사과', '바나나', '딸기' separated by '-'",
            guide: "Use sep='-'!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "2024, 3, 15 를 '-' 로 구분해서 출력해봐 (날짜 형식)",
          guide: "sep='-' 사용!",
          template: { before: "print(", after: ")" },
          answer: "2024, 3, 15, sep='-'",
          alternateAnswers: ["2024,3,15,sep='-'"],
          expect: "2024-3-15",
          en: {
            task: "Print 2024, 3, 15 separated by '-' (date format)",
            guide: "Use sep='-'!"
          }
        }
      },

      // sep='' 활용
      {
        type: "explain",
        content: {
          lines: [
            "sep='' 이면 구분자 없음!"
          ],
          code: "print('H', 'e', 'l', 'l', 'o', sep='')\n→ Hello\n\nprint(1, 2, 3, sep='+')\n→ 1+2+3",
          note: "sep='' 는 구분자 없이 붙여서 출력!"
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "'H', 'i', '!' 를 구분자 없이 붙여서 출력해봐",
          guide: "sep='' 사용!",
          template: { before: "print(", after: ")" },
          answer: "'H', 'i', '!', sep=''",
          alternateAnswers: ["'H','i','!',sep=''"],
          expect: "Hi!",
          en: {
            task: "Print 'H', 'i', '!' joined without any separator",
            guide: "Use sep=''!"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "print('1', '2', '3', sep='/') 의 결과는?",
          options: [
            "1 2 3",
            "1/2/3",
            "123"
          ],
          answer: 1,
          explanation: "sep='/'로 '/'가 구분자가 돼! 1/2/3",
          en: {
            question: "What is the result of print('1', '2', '3', sep='/')?",
            options: [
              "1 2 3",
              "1/2/3",
              "123"
            ],
            explanation: "sep='/' makes '/' the separator! 1/2/3"
          }
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "sep 옵션",
          learned: [
            "기본값: sep=' ' (공백)",
            "sep='-' → 대시로 구분",
            "sep='' → 구분자 없이 붙이기"
          ],
          canDo: "print()의 구분자를 원하는 대로 바꿀 수 있어!",
          emoji: "↔️"
        }
      },

      // ==================== CHAPTER 3: end 옵션 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "end 옵션",
          desc: "줄바꿈 대신 다른 문자!"
        }
      },

      // end 기본값
      {
        type: "explain",
        content: {
          lines: [
            "print()는 기본으로 줄바꿈해!"
          ],
          code: "print('Hello')\nprint('World')",
          result: "Hello\nWorld",
          note: "기본값: end='\\n' (줄바꿈)"
        }
      },

      // end 사용
      {
        type: "explain",
        content: {
          lines: [
            "end= 로 줄바꿈 대신 다른 걸!"
          ],
          code: "print('Hello', end=' ')\nprint('World')\n→ Hello World (한 줄!)\n\nprint('로딩', end='...')\nprint('완료!')\n→ 로딩...완료!",
          note: "end=' ' 는 공백으로 끝냄. 줄바꿈 없음!"
        }
      },

      // ===== Lv.1: end 연습 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "'Hello' 출력 후 줄바꿈 없이 공백, 그 다음 'World' 출력해봐",
          guide: "end=' ' 사용!",
          template: null,
          answer: "print('Hello', end=' ')\nprint('World')",
          expect: "Hello World",
          en: {
            task: "Print 'Hello' then without newline add a space, then print 'World'",
            guide: "Use end=' '!"
          }
        }
      },

      // end='' 활용
      {
        type: "explain",
        content: {
          lines: [
            "end='' 이면 줄바꿈도 없고 아무것도 없음!"
          ],
          code: "print('A', end='')\nprint('B', end='')\nprint('C')\n→ ABC",
          note: "end='' 는 줄바꿈 없이 바로 붙여!"
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "1, 2, 3 을 줄바꿈 없이 한 줄에 출력해봐 (각각 print 3번)",
          guide: "end='' 사용!",
          template: null,
          answer: "print(1, end='')\nprint(2, end='')\nprint(3)",
          alternateAnswers: ["print(1, end='')\nprint(2, end='')\nprint(3, end='')"],
          expect: "123",
          en: {
            task: "Print 1, 2, 3 on one line without newlines (3 separate print calls)",
            guide: "Use end=''!"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "print('안녕', end='!') 의 결과는?",
          options: [
            "안녕\n (줄바꿈 있음)",
            "안녕! (줄바꿈 없이 ! 추가)",
            "안녕 ! (공백 + !)"
          ],
          answer: 1,
          explanation: "end='!'로 줄바꿈 대신 '!'가 붙어! '안녕!'",
          en: {
            question: "What is the result of print('안녕', end='!')?",
            options: [
              "안녕\\n (with newline)",
              "안녕! (no newline, ! appended)",
              "안녕 ! (space + !)"
            ],
            explanation: "end='!' replaces the newline with '!'! '안녕!'"
          }
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "end 옵션",
          learned: [
            "기본값: end='\\n' (줄바꿈)",
            "end=' ' → 공백으로 끝남",
            "end='' → 아무것도 없이 바로 이어짐"
          ],
          canDo: "줄바꿈 없이 원하는 방식으로 출력을 이어갈 수 있어!",
          emoji: "↩️"
        }
      },

      // ==================== CHAPTER 4: sep + end 조합 & 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "sep + end 동시 활용",
          desc: "두 옵션을 같이 써보자!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "sep 기억나?",
          task: "1, 2, 3 을 ':' 로 구분해서 출력해봐",
          template: null,
          answer: "print(1, 2, 3, sep=':')",
          expect: "1:2:3",
          en: {
            message: "Remember sep?",
            task: "Print 1, 2, 3 separated by ':'"
          }
        }
      },

      // sep + end 조합
      {
        type: "explain",
        content: {
          lines: [
            "sep 와 end 를 같이 쓸 수 있어!"
          ],
          code: "print('A', 'B', 'C', sep='-', end='!')\n→ A-B-C!\n\nprint(1, 2, 3, sep='+', end='=?')\n→ 1+2+3=?",
          note: "sep= 와 end= 를 쉼표로 구분해서 함께 사용!"
        }
      },

      // ===== Lv.2: sep + end 조합 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "'월', '화', '수' 를 '/' 로 구분하고 '~' 로 끝내서 출력해봐",
          guide: "sep='/' 와 end='~' 같이!",
          template: { before: "print(", after: ")" },
          answer: "'월', '화', '수', sep='/', end='~'",
          alternateAnswers: ["'월','화','수',sep='/',end='~'"],
          expect: "월/화/수~",
          en: {
            task: "Print '월', '화', '수' separated by '/' and ending with '~'",
            guide: "Use both sep='/' and end='~'!"
          }
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "🖨️ 출력 형식 도구 만들기!"
          ],
          code: "2024-03-15\nA B C D E\n로딩중... 완료!",
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
          task: "2024, 3, 15 를 '-' 구분으로 출력해봐",
          target: "2024-3-15",
          hint: "print(2024, 3, 15, sep='-')",
          done: [],
          answer: "print(2024, 3, 15, sep='-')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "'A', 'B', 'C', 'D', 'E' 를 공백으로 구분해서 출력해봐 (기본 sep)",
          target: "A B C D E",
          hint: "print('A', 'B', 'C', 'D', 'E')",
          done: ["2024-3-15"],
          answer: "print('A', 'B', 'C', 'D', 'E')"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "'로딩중' 끝에 '...' 붙이고, 다음 줄에 '완료!' 출력해봐",
          target: "로딩중... 완료!",
          hint: "print('로딩중', end='... ')\nprint('완료!')",
          done: ["2024-3-15", "A B C D E"],
          answer: "print('로딩중', end='... ')\nprint('완료!')"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "print() 옵션 마스터",
          learned: [
            "sep=' ' → 값 사이 구분자 (기본: 공백)",
            "end='\\n' → 끝 문자 (기본: 줄바꿈)",
            "sep 와 end 동시 사용 가능"
          ],
          canDo: "print()의 출력 형식을 자유롭게 조절할 수 있어!",
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
