import { LessonData } from '../types';

export const lessonCpp5: LessonData = {
    id: "cpp-5",
    title: "연산자",
    description: "산술, 비교, 논리 연산자 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 산술 연산자 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "산술 연산자",
          desc: "+, -, *, /, %를 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << 10 + 3 << endl;   // 13\n    cout << 10 - 3 << endl;   // 7\n    cout << 10 * 3 << endl;   // 30\n    cout << 10 / 3 << endl;   // ?\n    return 0;\n}',
          predict: {
            question: "10 / 3 의 결과는?",
            options: ["3.333...", "3", "3.0"],
            answer: 1,
            feedback: "정수 / 정수 = 정수! 소수점이 잘려서 3이 나와요. 파이썬은 3.333이지만 C++은 달라요!"
          },
          en: {
            predict: {
              question: "What is the result of 10 / 3?",
              options: ["3.333...", "3", "3.0"],
              feedback: "integer / integer = integer! The decimal is truncated so the result is 3. Python gives 3.333 but C++ is different!"
            }
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "정수끼리 나누면 정수! (소수점 버림) ✂️",
            "소수점 결과를 원하면 double을 써야 해요!",
            "파이썬: 10/3 = 3.333, C++: 10/3 = 3"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << 10 / 3 << endl;      // 정수/정수 = 3\n    cout << 10.0 / 3 << endl;    // 실수/정수 = 3.33333\n    cout << 10 / 3.0 << endl;    // 정수/실수 = 3.33333\n    cout << 10.0 / 3.0 << endl;  // 실수/실수 = 3.33333\n    return 0;\n}',
          result: "3\n3.33333\n3.33333\n3.33333",
          note: "둘 중 하나라도 double이면 결과도 double!"
        }
      },

      // ===== Lv.1: 덧셈 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "a + b의 결과를 출력해요!",
          guide: "cout << a + b;",
          template: "int a = 15, b = 7;\ncout << a ___ b << endl;",
          answer: "+",
          expect: "int a = 15, b = 7;\ncout << a + b << endl;",
          en: {
            task: "Print the result of a + b!",
            guide: "cout << a + b;"
          }
        }
      },

      // 정수 나눗셈 퀴즈
      {
        type: "quiz",
        content: {
          question: "C++에서 7 / 2 의 결과는?",
          options: ["3.5", "3", "4", "에러"],
          answer: 1,
          explanation: "정수 / 정수 = 정수! 7 / 2 = 3 (소수점 버림). 3.5를 원하면 7.0 / 2 로 써야 해요!",
          en: {
            question: "What is the result of 7 / 2 in C++?",
            options: ["3.5", "3", "4", "Error"],
            explanation: "integer / integer = integer! 7 / 2 = 3 (decimal truncated). Write 7.0 / 2 for 3.5!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << 10 % 3 << endl;  // 10 / 3 = 3 나머지 1\n    cout << 15 % 4 << endl;  // 15 / 4 = 3 나머지 3\n    cout << 8 % 2 << endl;   // 8 / 2 = 4 나머지 0\n    return 0;\n}',
          result: "1\n3\n0",
          predict: {
            question: "7 % 3 의 결과는?",
            options: ["2", "1", "3"],
            answer: 1,
            feedback: "7 / 3 = 2 나머지 1! 나머지만 구하니까 1이에요."
          },
          en: {
            predict: {
              question: "What is the result of 7 % 3?",
              options: ["2", "1", "3"],
              feedback: "7 / 3 = 2 remainder 1! We only want the remainder, so the answer is 1."
            }
          }
        }
      },

      // ===== Lv.1: 나머지 연산 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "num을 2로 나눈 나머지를 구해요!",
          guide: "나머지 연산자는 %!",
          template: "int num = 17;\ncout << num ___ 2 << endl;",
          answer: "%",
          expect: "int num = 17;\ncout << num % 2 << endl;",
          en: {
            task: "Find the remainder of num divided by 2!",
            guide: "The remainder operator is %!"
          }
        }
      },

      // 나머지 활용 퀴즈
      {
        type: "quiz",
        content: {
          question: "n % 2 == 0 이면 n은?",
          options: ["홀수", "짝수", "소수", "음수"],
          answer: 1,
          explanation: "2로 나눈 나머지가 0이면 짝수! 1이면 홀수예요.",
          en: {
            question: "If n % 2 == 0, then n is?",
            options: ["Odd", "Even", "Prime", "Negative"],
            explanation: "If the remainder when divided by 2 is 0, it's even! If 1, it's odd."
          }
        }
      },

      // 에러 퀴즈: 정수 나눗셈
      {
        type: "errorQuiz",
        content: {
          question: "평균을 구하려는데 결과가 이상해요. 왜일까요?",
          code: 'int sum = 95;\nint count = 3;\ncout << sum / count << endl;  // 31이 출력됨',
          options: [
            "정수/정수라 소수점이 잘려서",
            "cout이 잘못돼서",
            "변수 이름이 틀려서"
          ],
          answer: 0,
          explanation: "95 / 3 = 31.666... 인데 int끼리 나누면 31만 남아요! (double)sum / count로 바꿔야 해요.",
          en: {
            question: "The average calculation gives a wrong result. Why?",
            options: [
              "integer/integer truncates the decimal",
              "cout is wrong",
              "Variable name is wrong"
            ],
            explanation: "95 / 3 = 31.666... but int divided by int only keeps 31! Change to (double)sum / count."
          }
        }
      },

      // ===== Lv.2: 소수점 나눗셈 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "소수점까지 나오게 나눗셈을 써봐요!",
          guide: "하나를 double로 바꿔요!",
          template: "int a = 10, b = 3;\ncout << ___ / b << endl;",
          answer: "(double)a",
          alternateAnswers: ["(double) a", "10.0"],
          expect: "int a = 10, b = 3;\ncout << (double)a / b << endl;",
          en: {
            task: "Write the division to get a decimal result!",
            guide: "Cast one of them to double!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "산술 연산자 완벽!",
          emoji: "🧮"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "산술 연산자",
          learned: [
            "+, -, *, / — 기본 사칙연산",
            "정수 / 정수 = 정수 (소수점 버림!)",
            "double끼리 또는 섞으면 소수점 유지",
            "% = 나머지 연산자",
            "n % 2 == 0 → 짝수 판별!"
          ],
          canDo: "산술 연산자로 계산하고 정수 나눗셈의 함정을 피할 수 있어요!",
          emoji: "🧮"
        }
      },

      // ==================== CHAPTER 2: 비교 & 논리 연산자 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "비교 & 논리 연산자",
          desc: "==, !=, <, >, &&, ||, !를 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 나머지 연산자 기억나요?",
          task: "15를 4로 나눈 나머지를 구해요!",
          template: "cout << 15 ___ 4 << endl;",
          answer: "%",
          expect: "cout << 15 % 4 << endl;",
          en: {
            message: "Wait! Do you remember the remainder operator?",
            task: "Find the remainder of 15 divided by 4!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "비교 연산자는 두 값을 비교해서 true/false를 돌려줘요! ⚖️",
            "파이썬과 거의 같아요!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << (10 == 10) << endl;  // equal → 1\n    cout << (10 != 5) << endl;   // not equal → 1\n    cout << (10 > 5) << endl;    // greater → 1\n    cout << (10 < 5) << endl;    // less → 0\n    cout << (10 >= 10) << endl;  // greater or equal → 1\n    cout << (10 <= 9) << endl;   // less or equal → 0\n    return 0;\n}',
          result: "1\n1\n1\n0\n1\n0",
          note: "C++은 true=1, false=0으로 출력돼요!"
        }
      },

      // 비교 연산 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'int x = 10;       // 대입: x에 10을 넣어요\ncout << (x == 10); // 비교: x가 10인지 확인',
          predict: {
            question: "if (x = 5) 는 어떤 의미?",
            options: ["x가 5인지 비교", "x에 5를 대입 (버그!)", "에러"],
            answer: 1,
            feedback: "= 는 대입! if (x = 5)는 x에 5를 넣는 거예요. 비교하려면 == 를 써야 해요!"
          },
          en: {
            predict: {
              question: "What does if (x = 5) mean?",
              options: ["Compares x to 5", "Assigns 5 to x (bug!)", "Error"],
              feedback: "= is assignment! if (x = 5) puts 5 into x. Use == for comparison!"
            }
          }
        }
      },

      // ===== Lv.1: 비교 연산자 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "score가 90 이상인지 확인해요!",
          guide: "크거나 같다 = >=",
          template: "int score = 95;\ncout << (score ___ 90) << endl;",
          answer: ">=",
          expect: "int score = 95;\ncout << (score >= 90) << endl;",
          en: {
            task: "Check if score is 90 or more!",
            guide: "greater than or equal to = >="
          }
        }
      },

      // == vs = 퀴즈
      {
        type: "quiz",
        content: {
          question: "C++에서 '같은지 비교'하는 연산자는?",
          options: ["=", "==", "===", "equals()"],
          answer: 1,
          explanation: "== 가 비교! = 는 대입(값 넣기)이에요. 이걸 헷갈리면 찾기 어려운 버그가 생겨요!",
          en: {
            question: "Which operator checks equality in C++?",
            options: ["=", "==", "===", "equals()"],
            explanation: "== is for comparison! = is for assignment. Confusing these creates hard-to-find bugs!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "논리 연산자는 여러 조건을 합칠 때 써요! 🔗",
            "&& = 그리고 (AND) — 둘 다 true여야 true",
            "|| = 또는 (OR) — 하나만 true여도 true",
            "! = 아니다 (NOT) — true↔false 뒤집기"
          ],
          code: '// Python: and, or, not\n// C++:    &&,  ||,  !\n\ncout << (true && true) << endl;   // 1 (both true)\ncout << (true && false) << endl;  // 0 (one is false)\ncout << (true || false) << endl;  // 1 (one is true)\ncout << (!true) << endl;          // 0 (opposite of true)',
          result: "1\n0\n1\n0",
          note: "파이썬: and/or/not → C++: &&/||/!"
        }
      },

      // 논리 연산 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 85;\n    bool valid = (score >= 80) && (score <= 100);\n    cout << valid << endl;\n    return 0;\n}',
          predict: {
            question: "score가 85일 때 결과는?",
            options: ["1 (true)", "0 (false)", "에러"],
            answer: 0,
            feedback: "85 >= 80 (true) && 85 <= 100 (true) → true && true = true (1)!"
          },
          en: {
            predict: {
              question: "What is the result when score is 85?",
              options: ["1 (true)", "0 (false)", "Error"],
              feedback: "85 >= 80 (true) && 85 <= 100 (true) → true && true = true (1)!"
            }
          }
        }
      },

      // ===== Lv.1: && 연산자 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "나이가 13 이상이고 19 이하인지 확인해요!",
          guide: "두 조건을 &&로 연결!",
          template: "int age = 15;\nbool teen = (age >= 13) ___ (age <= 19);",
          answer: "&&",
          expect: "int age = 15;\nbool teen = (age >= 13) && (age <= 19);",
          en: {
            task: "Check if age is between 13 and 19 (inclusive)!",
            guide: "Connect two conditions with &&!"
          }
        }
      },

      // ===== Lv.2: || 연산자 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "등급이 'A' 또는 'B'인지 확인해요!",
          guide: "'또는'은 ||!",
          template: "char grade = 'A';\nbool pass = (grade == 'A') ___ (grade == 'B');",
          answer: "||",
          expect: "char grade = 'A';\nbool pass = (grade == 'A') || (grade == 'B');",
          en: {
            task: "Check if grade is 'A' or 'B'!",
            guide: "'or' is ||!"
          }
        }
      },

      // 에러 퀴즈: = vs ==
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 버그는?",
          code: 'int x = 10;\nif (x = 5) {\n    cout << "x는 5!" << endl;\n}',
          options: [
            "= 를 == 로 바꿔야 해요 (비교가 아니라 대입)",
            "if 문법이 틀렸어요",
            "cout이 잘못됐어요"
          ],
          answer: 0,
          explanation: "x = 5 는 x에 5를 넣는 대입! 비교하려면 x == 5 로 써야 해요. 매우 흔한 버그예요!",
          en: {
            question: "What is the bug in this code?",
            options: [
              "Should change = to == (assignment, not comparison)",
              "if syntax is wrong",
              "cout is wrong"
            ],
            explanation: "x = 5 is assignment, putting 5 into x! Use x == 5 for comparison. A very common bug!"
          }
        }
      },

      // 논리 퀴즈
      {
        type: "quiz",
        content: {
          question: "파이썬의 and, or, not을 C++로 바꾸면?",
          options: [
            "AND, OR, NOT",
            "&&, ||, !",
            "&, |, ~",
            "and, or, not (같음)"
          ],
          answer: 1,
          explanation: "C++에서는 && (and), || (or), ! (not)을 써요! 기호로 쓰는 게 차이점!",
          en: {
            question: "What is the C++ equivalent of Python's and, or, not?",
            options: [
              "AND, OR, NOT",
              "&&, ||, !",
              "&, |, ~",
              "and, or, not (same)"
            ],
            explanation: "In C++, use && (and), || (or), ! (not)! Using symbols is the difference!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "비교 & 논리 연산자 완벽!",
          emoji: "⚖️"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "비교 & 논리 연산자",
          learned: [
            "== 같다, != 다르다, >, <, >=, <=",
            "= 는 대입, == 는 비교 (헷갈리지 말기!)",
            "&& = AND (둘 다 참), || = OR (하나만 참), ! = NOT (뒤집기)",
            "비교 결과는 true(1) 또는 false(0)",
            "파이썬: and/or/not → C++: &&/||/!"
          ],
          canDo: "비교와 논리 연산자로 복잡한 조건을 만들 수 있어요!",
          emoji: "⚖️"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 — 짝수/홀수 판별기 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 짝수/홀수 판별기",
          desc: "연산자를 활용해서 판별기를 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 논리 연산자 기억나요?",
          task: "파이썬의 and를 C++로 쓰면?",
          template: "bool result = (a > 0) ___ (b > 0);",
          answer: "&&",
          expect: "bool result = (a > 0) && (b > 0);",
          en: {
            message: "Wait! Do you remember the logical operators?",
            task: "What is the C++ equivalent of Python's and?"
          }
        }
      },

      // 종합 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int num = 7;\n    cout << num << " % 2 = " << num % 2 << endl;\n    cout << "짝수? " << (num % 2 == 0) << endl;\n    cout << "홀수? " << (num % 2 != 0) << endl;\n    return 0;\n}',
          result: "7 % 2 = 1\n짝수? 0\n홀수? 1",
          predict: {
            question: "num이 12일 때 '짝수?'의 출력은?",
            options: ["0 (false)", "1 (true)", "12"],
            answer: 1,
            feedback: "12 % 2 = 0, 그리고 0 == 0 은 true! 그래서 1이 출력돼요."
          },
          en: {
            predict: {
              question: "When num is 12, what does 'Even?' print?",
              options: ["0 (false)", "1 (true)", "12"],
              feedback: "12 % 2 = 0, and 0 == 0 is true! So 1 is printed."
            }
          }
        }
      },

      // 프로젝트: 짝수/홀수 판별기
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "숫자를 입력받아요! (int num + cin)",
          target: 'int num;\ncout << "숫자를 입력하세요: ";\ncin >> num;',
          hint: "int num; + cout + cin >> num;",
          done: ["#include <iostream>\nusing namespace std;\n\nint main() {"],
          answer: 'int num;\ncout << "숫자를 입력하세요: ";\ncin >> num;'
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "나머지 연산으로 짝수인지 확인해요!",
          target: "bool isEven = (num % 2 == 0);",
          hint: "num % 2 == 0 이면 짝수!",
          done: ["#include <iostream>\nusing namespace std;\n\nint main() {", 'int num;\ncout << "숫자를 입력하세요: ";\ncin >> num;'],
          answer: "bool isEven = (num % 2 == 0);"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "결과를 출력해요! (짝수: 1, 홀수: 0)",
          target: 'cout << num << "은(는) 짝수? " << isEven << endl;',
          hint: 'cout << num << "은(는) 짝수? " << isEven << endl;',
          done: ["#include <iostream>\nusing namespace std;\n\nint main() {", 'int num;\ncout << "숫자를 입력하세요: ";\ncin >> num;', "bool isEven = (num % 2 == 0);"],
          answer: 'cout << num << "은(는) 짝수? " << isEven << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "짝수/홀수 판별기 완성! 연산자 마스터!",
          emoji: "🏆"
        }
      },

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
