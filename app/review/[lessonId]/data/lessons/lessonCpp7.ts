import { LessonData } from '../types';

export const lessonCpp7: LessonData = {
    id: "cpp-7",
    title: "반복문 for/while",
    description: "for, while, do-while 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: for 루프 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "for 루프",
          desc: "C++의 for문으로 반복하는 법을 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '// 파이썬\n// for i in range(5):\n//     print(i)\n\n// C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 0; i < 5; i++) {\n        cout << i << endl;\n    }\n    return 0;\n}',
          result: "0\n1\n2\n3\n4",
          note: "for (초기값; 조건; 증가) { 반복할 코드 }"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'for (int i = 3; i >= 1; i--) {\n    cout << i << " ";\n}\ncout << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["1 2 3", "3 2 1", "3 2 1 0", "0 1 2 3"],
            answer: 1,
            feedback: "i가 3에서 시작해서 1씩 줄어들어요! 3, 2, 1 출력 후 i가 0이 되면 조건 i >= 1이 거짓이라 멈춰요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["1 2 3", "3 2 1", "3 2 1 0", "0 1 2 3"],
              feedback: "i starts at 3 and decrements by 1! After printing 3, 2, 1, i becomes 0 and i >= 1 is false, so it stops!"
            }
          }
        }
      },

      // Lv.1: for문 빈칸 — 초기값
      {
        type: "practice",
        content: {
          level: 1,
          task: "i를 0부터 시작하게 해봐요!",
          guide: "int i = 0 으로 초기화!",
          template: "for (___; i < 5; i++) {",
          answer: "int i = 0",
          alternateAnswers: ["int i=0"],
          expect: "for (int i = 0; i < 5; i++) {",
          en: {
            task: "Make i start from 0!",
            guide: "Initialize with int i = 0!"
          }
        }
      },

      // Lv.1: for문 빈칸 — 증가
      {
        type: "practice",
        content: {
          level: 1,
          task: "i를 1씩 증가시키는 부분을 완성해요!",
          guide: "i++ 은 i = i + 1과 같아요!",
          template: "for (int i = 0; i < 10; ___) {",
          answer: "i++",
          alternateAnswers: ["i ++", "i+=1", "i = i + 1", "i=i+1"],
          expect: "for (int i = 0; i < 10; i++) {",
          en: {
            task: "Complete the part that increments i by 1!",
            guide: "i++ is the same as i = i + 1!"
          }
        }
      },

      // 퀴즈: range 비교
      {
        type: "quiz",
        content: {
          question: "파이썬 for i in range(3): 과 같은 C++ 코드는?",
          options: [
            "for (int i = 0; i < 3; i++)",
            "for (int i = 1; i <= 3; i++)",
            "for (int i = 0; i <= 3; i++)",
            "for (int i = 3; i > 0; i--)"
          ],
          answer: 0,
          explanation: "range(3)은 0, 1, 2를 만들어요! C++에서 i=0부터 시작해서 i<3까지 (0,1,2) 반복하는 것과 같아요!",
          en: {
            question: "Which C++ code is equivalent to Python's for i in range(3):?",
            options: [
              "for (int i = 0; i < 3; i++)",
              "for (int i = 1; i <= 3; i++)",
              "for (int i = 0; i <= 3; i++)",
              "for (int i = 3; i > 0; i--)"
            ],
            explanation: "range(3) generates 0, 1, 2! C++ repeats from i=0 up to i<3 (0,1,2), same thing!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'for (int i = 0, i < 5, i++) {\n    cout << i << endl;\n}',
          options: [
            "i를 int로 선언해서",
            "쉼표(,) 대신 세미콜론(;)을 써야 해서",
            "i++ 대신 ++i를 써야 해서"
          ],
          answer: 1,
          explanation: "for문의 3가지 요소는 세미콜론(;)으로 구분해요! 쉼표가 아니에요! for (int i = 0; i < 5; i++)",
          en: {
            question: "What is the problem with this code?",
            options: [
              "Declaring i as int",
              "Should use semicolons (;) instead of commas (,)",
              "Should use ++i instead of i++"
            ],
            explanation: "The 3 parts of a for loop are separated by semicolons (;)! Not commas! for (int i = 0; i < 5; i++)"
          }
        }
      },

      // Lv.2: 전체 for문 쓰기
      {
        type: "practice",
        content: {
          level: 2,
          task: "1부터 5까지 출력하는 for문을 완성해요!",
          guide: "for (int i = 1; i <= 5; i++)",
          template: "for (int i = ___; i ___ 5; i++) {",
          answer: "1",
          blanksAnswer: ["1", "<="],
          expect: "for (int i = 1; i <= 5; i++) {",
          en: {
            task: "Complete the for loop that prints 1 through 5!",
            guide: "for (int i = 1; i <= 5; i++)"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "for 루프 완벽!",
          emoji: "🔄"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "for 루프",
          learned: [
            "for (초기값; 조건; 증가) { 코드 }",
            "i++ = i를 1 증가, i-- = i를 1 감소",
            "파이썬 range(n) = C++ i=0; i<n; i++",
            "세미콜론(;)으로 3가지 구분! 쉼표 아님!",
            "중괄호 {} 안에 반복할 코드를 넣어요"
          ],
          canDo: "for문으로 원하는 횟수만큼 반복할 수 있어요!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 2: while & do-while ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "while & do-while",
          desc: "while, do-while, break, continue를 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! for문의 구조 기억나요?",
          task: "for문의 3가지 요소를 구분하는 문자는?",
          hint: "쉼표가 아니라...!",
          template: "for (int i = 0___ i < 5___ i++)",
          answer: ";",
          blanksAnswer: [";", ";"],
          expect: "for (int i = 0; i < 5; i++)",
          en: {
            message: "Wait! Do you remember the structure of a for loop?",
            task: "What character separates the 3 parts of a for loop?",
            hint: "Not a comma...!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int count = 0;\n    while (count < 3) {\n        cout << count << endl;\n        count++;\n    }\n    return 0;\n}',
          result: "0\n1\n2",
          note: "while (조건) { 코드 } — 조건이 거짓이 될 때까지 반복!"
        }
      },

      // do-while 설명
      {
        type: "explain",
        content: {
          lines: [],
          code: 'int num = 10;\ndo {\n    cout << num << endl;\n    num++;\n} while (num < 10);',
          predict: {
            question: "num이 10일 때, 이 코드의 출력은?",
            options: ["아무것도 안 나옴", "10", "10 11 12 ...(무한)"],
            answer: 1,
            feedback: "do-while은 먼저 한 번 실행해요! 10을 출력한 뒤 num=11이 되고, 11 < 10이 거짓이라 멈춰요."
          },
          en: {
            predict: {
              question: "When num is 10, what does this code output?",
              options: ["No output", "10", "10 11 12 ...(infinite loop)"],
              feedback: "do-while executes once first! It prints 10, then num becomes 11, and 11 < 10 is false so it stops."
            }
          }
        }
      },

      // break & continue
      {
        type: "explain",
        content: {
          lines: [
            "break; → 반복문을 즉시 탈출! 🚪",
            "continue; → 이번 반복만 건너뛰기! ⏭️",
            "파이썬과 똑같은 역할이에요!"
          ],
          code: 'for (int i = 0; i < 5; i++) {\n    if (i == 2) continue;  // 2는 건너뜀\n    if (i == 4) break;     // 4에서 멈춤\n    cout << i << " ";\n}\ncout << endl;',
          result: "0 1 3",
          note: "continue → 건너뛰기, break → 탈출!"
        }
      },

      // Lv.1: while 조건 쓰기
      {
        type: "practice",
        content: {
          level: 1,
          task: "count가 5 미만인 동안 반복하는 while 조건을 써봐요!",
          guide: "while (___) 안에 조건을 넣어요!",
          template: "while (___) {\n    cout << count << endl;\n    count++;\n}",
          answer: "count < 5",
          alternateAnswers: ["count<5"],
          expect: "while (count < 5) {\n    cout << count << endl;\n    count++;\n}",
          en: {
            task: "Write the while condition to repeat while count is less than 5!",
            guide: "Put the condition inside while (___)"
          }
        }
      },

      // 퀴즈: while vs do-while
      {
        type: "quiz",
        content: {
          question: "while과 do-while의 차이는?",
          options: [
            "do-while이 더 빠르다",
            "while은 조건을 먼저 검사, do-while은 먼저 실행 후 검사",
            "do-while은 무한 반복만 된다",
            "차이가 없다"
          ],
          answer: 1,
          explanation: "while은 조건이 거짓이면 아예 실행 안 해요. do-while은 일단 한 번은 꼭 실행한 후 조건을 검사해요!",
          en: {
            question: "What is the difference between while and do-while?",
            options: [
              "do-while is faster",
              "while checks condition first; do-while executes first then checks",
              "do-while only loops infinitely",
              "No difference"
            ],
            explanation: "while doesn't execute at all if the condition is false. do-while always executes at least once before checking the condition!"
          }
        }
      },

      // Lv.2: break 넣기
      {
        type: "practice",
        content: {
          level: 2,
          task: "i가 5가 되면 반복문을 탈출해요!",
          guide: "break;로 탈출!",
          template: 'for (int i = 0; i < 10; i++) {\n    if (i == 5) ___;\n    cout << i << " ";\n}',
          answer: "break",
          expect: 'for (int i = 0; i < 10; i++) {\n    if (i == 5) break;\n    cout << i << " ";\n}',
          en: {
            task: "Exit the loop when i becomes 5!",
            guide: "Use break; to exit!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'int x = 0;\ndo {\n    cout << x << endl;\n    x++;\n} while (x < 5)',
          options: [
            "do 뒤에 중괄호가 없어서",
            "while 뒤에 세미콜론(;)이 빠져서",
            "x++ 대신 ++x를 써야 해서"
          ],
          answer: 1,
          explanation: "do-while문에서 while(조건) 뒤에는 반드시 세미콜론(;)이 필요해요! while (x < 5); 이렇게!",
          en: {
            question: "What is the problem with this code?",
            options: [
              "No braces after do",
              "Missing semicolon (;) after while condition",
              "Should use ++x instead of x++"
            ],
            explanation: "In a do-while loop, a semicolon (;) is required after while(condition)! Like: while (x < 5);"
          }
        }
      },

      // Lv.2: continue 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "짝수(i%2==0)일 때 건너뛰게 해봐요!",
          guide: "continue;로 건너뛰기!",
          template: 'for (int i = 0; i < 6; i++) {\n    if (i % 2 == 0) ___;\n    cout << i << " ";\n}',
          answer: "continue",
          expect: 'for (int i = 0; i < 6; i++) {\n    if (i % 2 == 0) continue;\n    cout << i << " ";\n}',
          en: {
            task: "Skip when i is even (i%2==0)!",
            guide: "Use continue; to skip!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "while & break 마스터!",
          emoji: "🔁"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "while & do-while",
          learned: [
            "while (조건) { 코드 } — 조건이 참인 동안 반복",
            "do { 코드 } while (조건); — 먼저 실행 후 조건 검사",
            "do-while의 while 뒤에 세미콜론(;) 필수!",
            "break; — 반복문 즉시 탈출",
            "continue; — 이번 반복만 건너뛰기"
          ],
          canDo: "while, do-while, break, continue를 자유롭게 쓸 수 있어요!",
          emoji: "🔁"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 — 구구단 출력기 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 구구단 출력기",
          desc: "for문으로 구구단을 출력해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! do-while 문법 기억나요?",
          task: "do-while에서 while 뒤에 꼭 넣어야 하는 건?",
          hint: "문장 끝에 붙이는 거예요!",
          template: "do {\n    // 코드\n} while (조건)___",
          answer: ";",
          expect: "do {\n    // 코드\n} while (조건);",
          en: {
            message: "Wait! Do you remember do-while syntax?",
            task: "What must be placed after the while condition in do-while?",
            hint: "It goes at the end of a statement!"
          }
        }
      },

      // 프로젝트 설명
      {
        type: "explain",
        content: {
          lines: [
            "구구단 출력기를 만들어요! 🔢",
            "단 번호를 정하고, for문으로 1~9까지 곱해요!",
            "예: 3단 → 3 x 1 = 3, 3 x 2 = 6, ..."
          ],
          code: '// 완성된 모습 (3단)\n// 출력:\n// 3 x 1 = 3\n// 3 x 2 = 6\n// ...\n// 3 x 9 = 27',
          note: "for문 안에서 dan * i를 계산해요!"
        }
      },

      // 프로젝트 Step 1
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "헤더, namespace, main 틀을 써봐요!",
          target: "#include <iostream>\nusing namespace std;\n\nint main() {\n\n    return 0;\n}",
          hint: "#include <iostream> + using namespace std; + int main()",
          done: [],
          answer: "#include <iostream>\nusing namespace std;\n\nint main() {\n\n    return 0;\n}"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "단 번호 변수를 만들고, for문 틀을 써봐요! (i는 1부터 9까지)",
          target: "int dan = 3;\nfor (int i = 1; i <= 9; i++) {\n\n}",
          hint: "int dan = 3; 그리고 for (int i = 1; i <= 9; i++)",
          done: ["#include <iostream>\nusing namespace std;\n\nint main() {"],
          answer: "int dan = 3;\nfor (int i = 1; i <= 9; i++) {\n\n}"
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "for문 안에 구구단 출력 코드를 넣어요! (dan x i = 결과)",
          target: 'cout << dan << " x " << i << " = " << dan * i << endl;',
          hint: 'cout << dan << " x " << i << " = " << dan * i << endl;',
          done: [
            "#include <iostream>\nusing namespace std;\n\nint main() {",
            "int dan = 3;\nfor (int i = 1; i <= 9; i++) {"
          ],
          answer: 'cout << dan << " x " << i << " = " << dan * i << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "구구단 출력기 완성! 반복문 마스터!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 4: 반복문 손에 익히기 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "반복문 손에 익히기",
          desc: "for / while 패턴을 손이 기억할 때까지 반복해요!"
        }
      },

      // Drill 1: 기본 for 구조 (1~5 출력)
      {
        type: "practice",
        content: {
          level: 1,
          task: "1부터 5까지 한 줄씩 출력하는 for문을 작성해요",
          guide: "for (int i = 1; i <= 5; i++)",
          template: "for (int i = ___; i <= ___; i++) {\n    cout << i << endl;\n}",
          blanksAnswer: ["1", "5"],
          answer: "for (int i = 1; i <= 5; i++) {\n    cout << i << endl;\n}",
          expect: "1\n2\n3\n4\n5",
          en: {
            task: "Write a for loop that prints 1 to 5, one per line",
            guide: "for (int i = 1; i <= 5; i++)"
          }
        }
      },

      // Drill 2: 짝수만 출력 (조건 + 반복)
      {
        type: "practice",
        content: {
          level: 2,
          task: "1~10에서 짝수만 출력하는 for문을 작성해요",
          guide: "i % 2 == 0 조건 사용",
          template: "for (int i = 1; i <= 10; i++) {\n    if (i ___ 2 == ___) {\n        cout << i << \" \";\n    }\n}",
          blanksAnswer: ["%", "0"],
          answer: "for (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0) {\n        cout << i << \" \";\n    }\n}",
          expect: "2 4 6 8 10 ",
          en: {
            task: "Write a for loop that prints only even numbers from 1 to 10",
            guide: "Use the i % 2 == 0 condition"
          }
        }
      },

      // Drill 3: while로 카운트다운
      {
        type: "practice",
        content: {
          level: 2,
          task: "while문으로 5부터 1까지 카운트다운해요",
          guide: "int i = 5; while (i >= 1) { ... i--; }",
          template: "int i = 5;\nwhile (i ___ 1) {\n    cout << i << \" \";\n    ___;\n}",
          blanksAnswer: [">=", "i--"],
          answer: "int i = 5;\nwhile (i >= 1) {\n    cout << i << \" \";\n    i--;\n}",
          expect: "5 4 3 2 1 ",
          en: {
            task: "Use a while loop to count down from 5 to 1",
            guide: "int i = 5; while (i >= 1) { ... i--; }"
          }
        }
      },

      // Drill 4: 누적합 (중요 패턴!)
      {
        type: "practice",
        content: {
          level: 2,
          task: "1부터 10까지의 합을 구해서 출력해요 (sum 변수 사용)",
          guide: "int sum = 0; for(...) sum += i;",
          template: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum ___ i;\n}\ncout << sum << endl;",
          answer: "+=",
          alternateAnswers: ["+="],
          expect: "55",
          en: {
            task: "Calculate and print the sum from 1 to 10 (use a sum variable)",
            guide: "int sum = 0; for(...) sum += i;"
          }
        }
      },

      // Drill 5: 중첩 for (직접 작성)
      {
        type: "practice",
        content: {
          level: 3,
          task: "중첩 for문으로 2단과 3단 구구단을 출력해요\n(출력 형식: \"2 x 1 = 2\" 등)",
          guide: "for i(2~3) 바깥, for j(1~9) 안쪽",
          hint: "바깥 for는 단 번호(2~3), 안쪽 for는 곱할 수(1~9)로 돌아가요",
          template: null,
          answer: "for (int i = 2; i <= 3; i++) {\n    for (int j = 1; j <= 9; j++) {\n        cout << i << \" x \" << j << \" = \" << i * j << endl;\n    }\n}",
          alternateAnswers: [
            "for(int i=2;i<=3;i++){for(int j=1;j<=9;j++){cout<<i<<\" x \"<<j<<\" = \"<<i*j<<endl;}}"
          ],
          expect: "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27",
          en: {
            task: "Use nested for loops to print multiplication tables for 2 and 3\n(format: \"2 x 1 = 2\" etc.)",
            guide: "outer for i(2~3), inner for j(1~9)",
            hint: "The outer for loop iterates over the table number (2~3), and the inner for loop iterates over the multiplier (1~9)"
          }
        }
      },

      // Drill 6: 처음부터 — n개 입력받아 합산
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! n을 입력받고 → n개의 정수를 입력받아 → 총합을 출력",
          guide: "cin >> n → for i(0~n) cin >> x; sum += x → cout",
          hint: "반복문 안에서 매번 x를 입력받아 sum에 더해요. sum은 0으로 시작!",
          template: null,
          answer: "int n, sum = 0;\ncin >> n;\nfor (int i = 0; i < n; i++) {\n    int x;\n    cin >> x;\n    sum += x;\n}\ncout << sum << endl;",
          alternateAnswers: [
            "int n;\ncin>>n;\nint sum=0;\nfor(int i=0;i<n;i++){int x;cin>>x;sum+=x;}\ncout<<sum<<endl;"
          ],
          expect: "15",
          en: {
            task: "Write from scratch! Read n → read n integers → print the total sum",
            guide: "cin >> n → for i(0~n) cin >> x; sum += x → cout",
            hint: "Inside the loop, read x each time and add it to sum. Start sum at 0!"
          }
        }
      },

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
