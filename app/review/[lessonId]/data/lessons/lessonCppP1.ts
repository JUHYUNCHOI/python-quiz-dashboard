import { LessonData } from '../types';

export const lessonCppP1: LessonData = {
    id: "cpp-p1",
    title: "숫자 맞추기 게임 프로젝트 복습",
    description: "숫자 맞추기 게임의 핵심 개념 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 게임 구조 복습 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "게임 구조 복습",
          desc: "rand(), while loop, if/else를 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "숫자 맞추기 게임의 핵심은 랜덤 숫자 생성이에요!",
            "rand()와 srand()를 써서 매번 다른 숫자를 만들어요."
          ],
          code: '#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\n\nint main() {\n    srand(time(0));           // set seed\n    int answer = rand() % 100 + 1;  // 1~100\n    cout << "Guess a number from 1 to 100!" << "\\n";\n    return 0;\n}',
          result: "Guess a number from 1 to 100!",
          note: "srand(time(0))으로 매번 다른 시드! rand() % 100 + 1 = 1~100 범위"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'int a = rand() % 10;       // 0 ~ 9\nint b = rand() % 10 + 1;   // 1 ~ 10\nint c = rand() % 6 + 1;    // 1 ~ 6 (dice!)',
          predict: {
            question: "rand() % 50 + 1 의 범위는?",
            options: ["0 ~ 50", "1 ~ 50", "1 ~ 51"],
            answer: 1,
            feedback: "rand() % 50은 0~49, 거기에 +1 하면 1~50이 돼요!"
          },
          en: {
            predict: {
              question: "What is the range of rand() % 50 + 1?",
              options: ["0 ~ 50", "1 ~ 50", "1 ~ 51"],
              feedback: "rand() % 50 gives 0~49, then +1 shifts it to 1~50!"
            }
          }
        }
      },

      // Lv.1: srand 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "랜덤 시드를 설정해요!",
          guide: "srand에 time(0)을 넣어요!",
          template: "srand(___);",
          answer: "time(0)",
          alternateAnswers: ["time(NULL)", "time(nullptr)"],
          expect: "srand(time(0));",
          en: {
            task: "Set the random seed!",
            guide: "Pass time(0) to srand!"
          }
        }
      },

      // 퀴즈: rand 범위
      {
        type: "quiz",
        content: {
          question: "1부터 20까지 랜덤 숫자를 만드는 코드는?",
          options: [
            "rand() % 20",
            "rand() % 20 + 1",
            "rand() % 21",
            "rand() % 21 + 1"
          ],
          answer: 1,
          explanation: "rand() % 20 = 0~19, +1 하면 1~20이 돼요!",
          en: {
            question: "Which code generates a random number from 1 to 20?",
            options: [
              "rand() % 20",
              "rand() % 20 + 1",
              "rand() % 21",
              "rand() % 21 + 1"
            ],
            explanation: "rand() % 20 = 0~19, add 1 and you get 1~20!"
          }
        }
      },

      // while 루프 설명
      {
        type: "explain",
        content: {
          lines: [
            "사용자가 맞출 때까지 반복해야 해요!",
            "while 루프로 계속 추측을 받아요."
          ],
          code: 'int guess;\nwhile (true) {\n    cout << "guess: ";\n    cin >> guess;\n    if (guess == answer) {\n        cout << "correct!" << "\\n";\n        break;\n    } else if (guess < answer) {\n        cout << "go higher!" << "\\n";\n    } else {\n        cout << "go lower!" << "\\n";\n    }\n}',
          note: "while(true) + break 패턴! 맞추면 break로 탈출!"
        }
      },

      // Lv.1: if/else 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "추측이 정답보다 작을 때의 조건을 써요!",
          guide: "guess가 answer보다 작으면 '더 크게!'",
          template: "if (guess ___ answer) {\n    cout << \"더 크게!\" << \"\\n\";\n}",
          answer: "<",
          expect: "if (guess < answer) {\n    cout << \"더 크게!\" << \"\\n\";\n}",
          en: {
            task: "Write the condition for when the guess is smaller than the answer!",
            guide: "If guess is less than answer, print 'Go higher!'"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'int answer = rand() % 100 + 1;\n// srand() not called!',
          options: [
            "srand()가 없어서 매번 같은 숫자가 나와요",
            "rand()는 C++에서 못 써요",
            "% 100 대신 % 101을 써야 해요"
          ],
          answer: 0,
          explanation: "srand()로 시드를 설정하지 않으면 매번 같은 순서의 랜덤 숫자가 나와요!",
          en: {
            question: "What is wrong with this code?",
            options: [
              "Without srand(), the same sequence of random numbers appears every time",
              "rand() cannot be used in C++",
              "Should use % 101 instead of % 100"
            ],
            explanation: "Without setting a seed with srand(), the same sequence of random numbers is generated every run!"
          }
        }
      },

      // Lv.2: break 조건 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "정답을 맞추면 루프를 탈출해요!",
          guide: "guess와 answer가 같으면 break!",
          template: "if (guess == answer) {\n    cout << \"정답!\" << \"\\n\";\n    ___;\n}",
          answer: "break",
          expect: "if (guess == answer) {\n    cout << \"정답!\" << \"\\n\";\n    break;\n}",
          en: {
            task: "Exit the loop when the correct answer is guessed!",
            guide: "If guess equals answer, break!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "게임 구조 복습 완료!",
          emoji: "🎮"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "게임 구조 복습",
          learned: [
            "srand(time(0)) — 랜덤 시드 설정",
            "rand() % N + 1 — 1~N 범위 랜덤",
            "while(true) + break — 맞출 때까지 반복",
            "if/else if/else — 크다/작다/정답 판별"
          ],
          canDo: "랜덤 숫자 생성과 반복 루프를 쓸 수 있어요!",
          emoji: "🎮"
        }
      },

      // ==================== CHAPTER 2: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "게임 핵심 코드 작성",
          desc: "숫자 맞추기 게임의 핵심 코드를 직접 써봐요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 랜덤 숫자 만드는 법 기억나요?",
          task: "1~100 랜덤 숫자를 만드는 코드를 써봐요!",
          template: "int answer = rand() % ___ + ___;",
          answer: "100",
          blanksAnswer: ["100", "1"],
          expect: "int answer = rand() % 100 + 1;",
          en: {
            message: "Quick check! Do you remember how to generate a random number?",
            task: "Write the code to generate a random number from 1 to 100!"
          }
        }
      },

      // 종합 설명
      {
        type: "explain",
        content: {
          lines: [],
          code: 'int answer = rand() % 100 + 1;\nint guess, tries = 0;\n\nwhile (true) {\n    cin >> guess;\n    tries++;\n    if (guess == answer) {\n        cout << tries << " tries to get it right!" << "\\n";\n        break;\n    }\n    cout << (guess < answer ? "UP!" : "DOWN!") << "\\n";\n}',
          predict: {
            question: "삼항 연산자 (guess < answer ? \"UP!\" : \"DOWN!\")은 뭘 하나요?",
            options: [
              "항상 UP!을 출력해요",
              "guess가 작으면 UP!, 크면 DOWN!을 출력해요",
              "에러가 나요"
            ],
            answer: 1,
            feedback: "삼항 연산자! 조건 ? 참 : 거짓 — guess가 작으면 더 키우라고 UP!"
          },
          en: {
            predict: {
              question: "What does the ternary operator (guess < answer ? \"UP!\" : \"DOWN!\") do?",
              options: [
                "Always prints UP!",
                "Prints UP! if guess is smaller, DOWN! if larger",
                "Causes an error"
              ],
              feedback: "Ternary operator: condition ? true : false — if guess is too small, print UP! to go higher!"
            }
          }
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "헤더와 랜덤 시드를 설정해요!",
          target: "#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\n\nint main() {\n    srand(time(0));",
          hint: "iostream + cstdlib + ctime, srand(time(0))",
          done: [],
          answer: "#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\n\nint main() {\n    srand(time(0));"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "랜덤 정답과 변수를 만들어요!",
          target: "    int answer = rand() % 100 + 1;\n    int guess, tries = 0;",
          hint: "rand() % 100 + 1 = 1~100 범위",
          done: ["#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\nint main() {\n    srand(time(0));"],
          answer: "    int answer = rand() % 100 + 1;\n    int guess, tries = 0;"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "while 루프로 게임 로직을 완성해요!",
          target: "    while (true) {\n        cin >> guess;\n        tries++;\n        if (guess == answer) {\n            cout << \"정답! \" << tries << \"번\" << \"\\n\";\n            break;\n        }\n        cout << (guess < answer ? \"UP!\" : \"DOWN!\") << \"\\n\";\n    }\n    return 0;\n}",
          hint: "while(true) + cin >> guess + if/else + break",
          done: ["... srand(time(0));", "    int answer = rand() % 100 + 1;\n    int guess, tries = 0;"],
          answer: "    while (true) {\n        cin >> guess;\n        tries++;\n        if (guess == answer) {\n            cout << \"정답! \" << tries << \"번\" << \"\\n\";\n            break;\n        }\n        cout << (guess < answer ? \"UP!\" : \"DOWN!\") << \"\\n\";\n    }\n    return 0;\n}"
        }
      },

      // ==================== CHAPTER 3: 함수와 타입 심화 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "함수와 타입 심화 복습",
          desc: "함수 선언, 매개변수, 반환값을 복습해요!"
        }
      },

      // 인터리빙: cpp-7 while/break 패턴 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! while + break 패턴 기억나요?",
          task: "사용자 입력이 0이면 루프를 탈출하는 코드를 완성해요!",
          template: "while (___) {\n    cin >> n;\n    if (n == 0) ___;\n    cout << n << \"\\n\";\n}",
          answer: "true",
          blanksAnswer: ["true", "break"],
          expect: "while (true) {\n    cin >> n;\n    if (n == 0) break;\n    cout << n << \"\\n\";\n}",
          en: {
            message: "Quick check! Remember the while + break pattern?",
            task: "Complete the code that exits the loop when the user inputs 0!"
          }
        }
      },

      // predict 1: 함수 반환값
      {
        type: "explain",
        content: {
          lines: ["이 C++ 코드의 출력은?"],
          code: 'int square(int n) {\n    return n * n;\n}\n\nint main() {\n    cout << square(4) << "\\n";\n    cout << square(3) << "\\n";\n    return 0;\n}',
          predict: {
            options: ["16\n9", "4\n3", "8\n6", "에러"],
            answer: 0,
            feedback: "square(4) = 4*4 = 16, square(3) = 3*3 = 9. 함수는 n*n을 반환해요!"
          },
          en: {
            lines: ["What does this C++ code output?"],
            predict: {
              options: ["16\n9", "4\n3", "8\n6", "Error"],
              feedback: "square(4) = 4*4 = 16, square(3) = 3*3 = 9. The function returns n*n!"
            }
          }
        }
      },

      // predict 2: 변수 타입과 정수 나눗셈
      {
        type: "explain",
        content: {
          lines: ["이 C++ 코드의 출력은?"],
          code: 'int a = 7;\nint b = 2;\ncout << a / b << "\\n";\ncout << (double)a / b << "\\n";',
          predict: {
            options: ["3\n3.5", "3.5\n3.5", "3\n3", "에러"],
            answer: 0,
            feedback: "int / int = 정수 나눗셈! 7/2 = 3. (double) 캐스팅 후엔 3.5가 돼요."
          },
          en: {
            lines: ["What does this C++ code output?"],
            predict: {
              options: ["3\n3.5", "3.5\n3.5", "3\n3", "Error"],
              feedback: "int / int = integer division! 7/2 = 3. After (double) cast it becomes 3.5."
            }
          }
        }
      },

      // predict 3: else if 체인
      {
        type: "explain",
        content: {
          lines: ["이 C++ 코드의 출력은?"],
          code: 'int score = 75;\nif (score >= 90) {\n    cout << "A" << "\\n";\n} else if (score >= 80) {\n    cout << "B" << "\\n";\n} else if (score >= 70) {\n    cout << "C" << "\\n";\n} else {\n    cout << "F" << "\\n";\n}',
          predict: {
            options: ["A", "B", "C", "F"],
            answer: 2,
            feedback: "75 >= 90 → false, 75 >= 80 → false, 75 >= 70 → true! 세 번째 블록이 실행돼요."
          },
          en: {
            lines: ["What does this C++ code output?"],
            predict: {
              options: ["A", "B", "C", "F"],
              feedback: "75 >= 90 → false, 75 >= 80 → false, 75 >= 70 → true! The third block runs."
            }
          }
        }
      },

      // predict 4: for 루프 누적
      {
        type: "explain",
        content: {
          lines: ["이 C++ 코드의 출력은?"],
          code: 'int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n    sum += i;\n}\ncout << sum << "\\n";',
          predict: {
            options: ["10", "15", "5", "25"],
            answer: 1,
            feedback: "1+2+3+4+5 = 15! for 루프가 i=1부터 5까지 sum에 더해요."
          },
          en: {
            lines: ["What does this C++ code output?"],
            predict: {
              options: ["10", "15", "5", "25"],
              feedback: "1+2+3+4+5 = 15! The for loop adds i to sum from i=1 to 5."
            }
          }
        }
      },

      // quiz 1: 함수 선언
      {
        type: "quiz",
        content: {
          question: "C++에서 정수를 받아 정수를 반환하는 함수 선언의 올바른 형태는?",
          options: [
            "function int add(int a, int b)",
            "int add(int a, int b)",
            "def add(a, b):",
            "add(int a, int b) -> int"
          ],
          answer: 1,
          explanation: "C++ 함수 선언: 반환타입 함수명(매개변수목록) — 파이썬의 def와 다르게 반환 타입을 앞에 써요!",
          en: {
            question: "What is the correct form of a function declaration that takes and returns an integer in C++?",
            options: [
              "function int add(int a, int b)",
              "int add(int a, int b)",
              "def add(a, b):",
              "add(int a, int b) -> int"
            ],
            explanation: "C++ function declaration: returnType functionName(params) — unlike Python's def, the return type goes first!"
          }
        }
      },

      // quiz 2: cout 출력
      {
        type: "quiz",
        content: {
          question: "C++에서 줄바꿈 없이 'Hello World'를 출력하는 코드는?",
          options: [
            'cout << "Hello" << " " << "World" << endl;',
            'cout << "Hello" << " " << "World";',
            'print("Hello World")',
            'cout("Hello World")'
          ],
          answer: 1,
          explanation: "endl을 빼면 줄바꿈이 없어요! endl 또는 \"\\n\"을 쓰면 줄이 바뀌어요.",
          en: {
            question: "Which code outputs 'Hello World' in C++ without a newline?",
            options: [
              'cout << "Hello" << " " << "World" << endl;',
              'cout << "Hello" << " " << "World";',
              'print("Hello World")',
              'cout("Hello World")'
            ],
            explanation: "Without endl there is no newline! Use endl or \"\\n\" to break the line."
          }
        }
      },

      // quiz 3: 증감 연산자
      {
        type: "quiz",
        content: {
          question: "int x = 5; x++; 실행 후 x의 값은?",
          options: ["4", "5", "6", "10"],
          answer: 2,
          explanation: "x++는 x에 1을 더해요! 후위 증가 연산자. x = 5 + 1 = 6이 돼요.",
          en: {
            question: "After int x = 5; x++;, what is the value of x?",
            options: ["4", "5", "6", "10"],
            explanation: "x++ adds 1 to x! Post-increment operator. x = 5 + 1 = 6."
          }
        }
      },

      // practice 1: 함수 작성
      {
        type: "practice",
        content: {
          level: 2,
          task: "두 정수를 더해 반환하는 함수를 완성해요!",
          guide: "반환 타입 int, 함수명 add, 매개변수 int a, int b!",
          template: "___ add(___ a, ___ b) {\n    return a + b;\n}",
          answer: "int",
          blanksAnswer: ["int", "int", "int"],
          expect: "int add(int a, int b) {\n    return a + b;\n}",
          en: {
            task: "Complete the function that adds two integers and returns the result!",
            guide: "Return type int, function name add, parameters int a and int b!"
          }
        }
      },

      // practice 2: for 루프 카운터
      {
        type: "practice",
        content: {
          level: 2,
          task: "1부터 N까지 합을 구하는 for 루프를 완성해요!",
          guide: "i는 1부터 시작, i <= n 조건, i++ 증가!",
          template: "int sum = 0;\nfor (int i = ___; i ___ n; i++) {\n    sum += i;\n}",
          answer: "1",
          blanksAnswer: ["1", "<="],
          expect: "int sum = 0;\nfor (int i = 1; i <= n; i++) {\n    sum += i;\n}",
          en: {
            task: "Complete the for loop that sums from 1 to N!",
            guide: "i starts at 1, condition i <= n, increment i++!"
          }
        }
      },

      // practice 3: 조건 분기 완성
      {
        type: "practice",
        content: {
          level: 2,
          task: "tries가 10 이하면 '계속', 초과면 '실패'를 출력하는 코드를 완성해요!",
          guide: "if/else 구조로 tries <= 10 조건!",
          template: "if (tries ___ 10) {\n    cout << \"계속\" << \"\\n\";\n} ___ {\n    cout << \"실패\" << \"\\n\";\n}",
          answer: "<=",
          blanksAnswer: ["<=", "else"],
          expect: "if (tries <= 10) {\n    cout << \"계속\" << \"\\n\";\n} else {\n    cout << \"실패\" << \"\\n\";\n}",
          en: {
            task: "Complete the code that prints '계속' if tries is 10 or less, '실패' otherwise!",
            guide: "Use if/else structure with the condition tries <= 10!"
          }
        }
      },

      // errorQuiz 2: 함수 반환 타입 누락
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'add(int a, int b) {\n    return a + b;\n}',
          options: [
            "반환 타입 int가 빠졌어요",
            "매개변수 이름이 잘못됐어요",
            "return 문을 쓰면 안 돼요",
            "문제없어요"
          ],
          answer: 0,
          explanation: "C++에서 함수 앞에 반환 타입을 반드시 써야 해요! int add(int a, int b)처럼 int를 앞에!",
          en: {
            question: "What is wrong with this code?",
            options: [
              "The return type int is missing",
              "The parameter names are wrong",
              "You shouldn't use a return statement",
              "Nothing is wrong"
            ],
            explanation: "In C++ you must always specify the return type before the function name! Like int add(int a, int b)."
          }
        }
      },

      // errorQuiz 3: cin 타입 불일치
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'string name;\ncin >> name;\nif (name > 10) {\n    cout << "big number!" << "\\n";\n}',
          options: [
            "string을 숫자 10과 비교하면 타입 오류예요",
            "cin으로 string을 받을 수 없어요",
            "if 조건식에 문자열을 쓰면 안 돼요",
            "문제없어요"
          ],
          answer: 0,
          explanation: "string을 정수 10과 > 비교하면 의도한 대로 동작하지 않아요. 숫자를 비교하려면 int로 받아야 해요!",
          en: {
            question: "What is wrong with this code?",
            options: [
              "Comparing a string to the integer 10 with > causes a type mismatch",
              "You cannot read a string with cin",
              "You cannot use a string in an if condition",
              "Nothing is wrong"
            ],
            explanation: "Comparing a string with integer 10 using > doesn't work as intended. Use int to compare numbers!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "숫자 맞추기 게임 완성!",
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
