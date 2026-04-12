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

      // predict: sep 기본값
      {
        type: "explain",
        content: {
          lines: ["코드 결과를 예측해봐!"],
          code: "print('월', '화', '목', sep='|')",
          predict: {
            options: ["월 화 목", "월|화|목", "월화목"],
            answer: 1,
            feedback: "sep='|'이라서 각 값 사이에 '|'가 들어가! 월|화|목"
          },
          en: {
            lines: ["Predict the output!"],
            predict: {
              options: ["월 화 목", "월|화|목", "월화목"],
              feedback: "sep='|' puts '|' between each value! 월|화|목"
            }
          }
        }
      },

      // predict: sep='' 결과
      {
        type: "explain",
        content: {
          lines: ["이건 어떤 결과가 나올까?"],
          code: "print('P', 'y', 't', 'h', 'o', 'n', sep='')",
          predict: {
            options: ["P y t h o n", "Python", "P-y-t-h-o-n"],
            answer: 1,
            feedback: "sep=''이면 구분자가 없어서 다 붙어버려! Python"
          },
          en: {
            lines: ["What's the output here?"],
            predict: {
              options: ["P y t h o n", "Python", "P-y-t-h-o-n"],
              feedback: "sep='' means no separator, so everything is joined! Python"
            }
          }
        }
      },

      // errorQuiz: sep 관련 오류
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는?",
          code: "print('사과', '바나나', '딸기', Sep=', ')",
          options: [
            "Sep가 아니라 sep (소문자여야 해)",
            "문자열이 잘못됐어",
            "인자를 3개까지밖에 못 써"
          ],
          answer: 0,
          explanation: "파이썬 키워드 인자는 대소문자를 구분해! Sep가 아니라 sep(소문자)를 써야 해.",
          en: {
            question: "What's wrong with this code?",
            options: [
              "It should be sep (lowercase), not Sep",
              "The strings are wrong",
              "Can't use more than 3 arguments"
            ],
            explanation: "Python keyword arguments are case-sensitive! Use sep (lowercase), not Sep."
          }
        }
      },

      // practice: sep 응용
      {
        type: "practice",
        content: {
          level: 2,
          task: "10, 20, 30, 40 을 '+' 로 구분해서 출력해봐",
          guide: "sep='+' 사용!",
          template: { before: "print(", after: ")" },
          answer: "10, 20, 30, 40, sep='+'",
          alternateAnswers: ["10,20,30,40,sep='+'"],
          expect: "10+20+30+40",
          en: {
            task: "Print 10, 20, 30, 40 separated by '+'",
            guide: "Use sep='+'!"
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

      // predict: end 옵션 결과
      {
        type: "explain",
        content: {
          lines: ["코드 결과를 예측해봐!"],
          code: "print('안녕', end='~')\nprint('반가워')",
          predict: {
            options: ["안녕\n반가워", "안녕~반가워", "안녕 반가워"],
            answer: 1,
            feedback: "end='~'라서 줄바꿈 대신 '~'가 붙고 바로 다음 print가 이어져! 안녕~반가워"
          },
          en: {
            lines: ["Predict the output!"],
            predict: {
              options: ["안녕\n반가워", "안녕~반가워", "안녕 반가워"],
              feedback: "end='~' replaces the newline with '~', then the next print continues! 안녕~반가워"
            }
          }
        }
      },

      // predict: end='' 결과
      {
        type: "explain",
        content: {
          lines: ["이건 어떤 결과가 나올까?"],
          code: "print('Hello', end='')\nprint('World')",
          predict: {
            options: ["Hello\nWorld", "Hello World", "HelloWorld"],
            answer: 2,
            feedback: "end=''이면 아무것도 없이 바로 붙어! HelloWorld"
          },
          en: {
            lines: ["What's the output here?"],
            predict: {
              options: ["Hello\nWorld", "Hello World", "HelloWorld"],
              feedback: "end='' means nothing is added, they join immediately! HelloWorld"
            }
          }
        }
      },

      // errorQuiz: end 관련 오류
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는?",
          code: "print('로딩중', End='...')\nprint('완료!')",
          options: [
            "End가 아니라 end (소문자여야 해)",
            "문자열에 '...'을 쓸 수 없어",
            "print()는 두 번 쓸 수 없어"
          ],
          answer: 0,
          explanation: "파이썬 키워드 인자는 소문자야! End 대신 end를 써야 해.",
          en: {
            question: "What's wrong with this code?",
            options: [
              "It should be end (lowercase), not End",
              "Can't use '...' in a string",
              "Can't use print() twice"
            ],
            explanation: "Python keyword arguments are lowercase! Use end, not End."
          }
        }
      },

      // practice: end 응용
      {
        type: "practice",
        content: {
          level: 2,
          task: "print() 두 번을 써서 '로딩...' 다음 '완료!' 가 한 줄에 나오게 해봐",
          guide: "첫 번째 print에 end='...' 사용",
          template: null,
          answer: "print('로딩', end='...')\nprint('완료!')",
          expect: "로딩...완료!",
          en: {
            task: "Use print() twice so '로딩' and '완료!' appear on one line joined by '...'",
            guide: "Use end='...' in the first print"
          }
        }
      },

      // 퀴즈: end 추가
      {
        type: "quiz",
        content: {
          question: "다음 중 두 print()가 결과를 같은 줄에 출력하게 하는 코드는?",
          options: [
            "print('A')\nprint('B')",
            "print('A', end='')\nprint('B')",
            "print('A', sep='')\nprint('B')"
          ],
          answer: 1,
          explanation: "end=''를 쓰면 줄바꿈 없이 다음 print가 바로 이어져! sep는 같은 print() 내의 값들 사이 구분자야.",
          en: {
            question: "Which code makes two print() calls output on the same line?",
            options: [
              "print('A')\\nprint('B')",
              "print('A', end='')\\nprint('B')",
              "print('A', sep='')\\nprint('B')"
            ],
            explanation: "end='' removes the newline so the next print continues on the same line! sep is for separating values within the same print()."
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

      // predict: sep + end 조합 결과
      {
        type: "explain",
        content: {
          lines: ["sep 와 end 를 같이 쓰면 어떻게 될까?"],
          code: "print('A', 'B', 'C', sep='-', end='!')",
          predict: {
            options: ["A B C!", "A-B-C!", "A-B-C\n"],
            answer: 1,
            feedback: "sep='-'로 값들이 '-'로 구분되고, end='!'로 줄바꿈 대신 '!'가 붙어! A-B-C!"
          },
          en: {
            lines: ["What happens when sep and end are used together?"],
            predict: {
              options: ["A B C!", "A-B-C!", "A-B-C\n"],
              feedback: "sep='-' separates values with '-', and end='!' replaces the newline with '!'! A-B-C!"
            }
          }
        }
      },

      // predict: sep + end 심화
      {
        type: "explain",
        content: {
          lines: ["이 결과를 예측해봐!"],
          code: "print(1, 2, 3, sep='+', end='=?')",
          predict: {
            options: ["1 2 3=?", "1+2+3=?", "123=?"],
            answer: 1,
            feedback: "sep='+'로 '+' 구분, end='=?'로 끝에 '=?'가 붙어! 1+2+3=?"
          },
          en: {
            lines: ["Predict this result!"],
            predict: {
              options: ["1 2 3=?", "1+2+3=?", "123=?"],
              feedback: "sep='+' puts '+' between values, end='=?' appends '=?' at the end! 1+2+3=?"
            }
          }
        }
      },

      // practice: sep + end 새 조합
      {
        type: "practice",
        content: {
          level: 2,
          task: "'이름', '나이', '학년' 을 ':' 로 구분하고 줄바꿈 없이 '|' 로 끝내서 출력해봐",
          guide: "sep=':' 와 end='|' 같이 사용!",
          template: { before: "print(", after: ")" },
          answer: "'이름', '나이', '학년', sep=':', end='|'",
          alternateAnswers: ["'이름','나이','학년',sep=':',end='|'"],
          expect: "이름:나이:학년|",
          en: {
            task: "Print '이름', '나이', '학년' separated by ':' and ending with '|'",
            guide: "Use both sep=':' and end='|'!"
          }
        }
      },

      // practice: sep + end 자유 작성
      {
        type: "practice",
        content: {
          level: 3,
          task: "3줄의 print()를 써서 'A-B-C D-E-F G-H-I' 를 한 줄에 출력해봐",
          guide: "첫 두 print엔 sep='-', end=' ' 을 쓰고, 마지막엔 sep='-'만!",
          template: null,
          answer: "print('A', 'B', 'C', sep='-', end=' ')\nprint('D', 'E', 'F', sep='-', end=' ')\nprint('G', 'H', 'I', sep='-')",
          expect: "A-B-C D-E-F G-H-I",
          en: {
            task: "Write 3 print() calls to output 'A-B-C D-E-F G-H-I' on one line",
            guide: "First two prints use sep='-', end=' ', last one uses only sep='-'!"
          }
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
