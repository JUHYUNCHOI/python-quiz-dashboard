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
          lines: [
            "파이썬에서 for i in range(5): 를 썼죠? 🔄",
            "C++의 for문은 3가지를 괄호 안에 써요!",
            "초기값; 조건; 증가 — 세미콜론(;)으로 구분!"
          ],
          code: '// 파이썬\n// for i in range(5):\n//     print(i)\n\n// C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 0; i < 5; i++) {\n        cout << i << endl;\n    }\n    return 0;\n}',
          result: "0\n1\n2\n3\n4",
          note: "for (초기값; 조건; 증가) { 반복할 코드 }"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "i++은 i = i + 1과 같아요!",
            "i--는 i = i - 1! 줄어드는 반복도 가능해요."
          ],
          code: 'for (int i = 3; i >= 1; i--) {\n    cout << i << " ";\n}\ncout << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["1 2 3", "3 2 1", "3 2 1 0", "0 1 2 3"],
            answer: 1,
            feedback: "i가 3에서 시작해서 1씩 줄어들어요! 3, 2, 1 출력 후 i가 0이 되면 조건 i >= 1이 거짓이라 멈춰요!"
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
          lines: [
            "while은 조건이 참인 동안 계속 반복해요! 🔁",
            "파이썬의 while과 거의 같아요!",
            "단, 조건을 괄호 ()로 감싸야 해요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int count = 0;\n    while (count < 3) {\n        cout << count << endl;\n        count++;\n    }\n    return 0;\n}',
          result: "0\n1\n2",
          note: "while (조건) { 코드 } — 조건이 거짓이 될 때까지 반복!"
        }
      },

      // do-while 설명
      {
        type: "explain",
        content: {
          lines: [
            "do-while은 일단 한 번 실행하고 조건을 검사해요! 🎲",
            "파이썬에는 없는 C++ 전용 문법!",
            "주의: while 뒤에 세미콜론(;)이 필요해요!"
          ],
          code: 'int num = 10;\ndo {\n    cout << num << endl;\n    num++;\n} while (num < 10);',
          predict: {
            question: "num이 10일 때, 이 코드의 출력은?",
            options: ["아무것도 안 나옴", "10", "10 11 12 ...(무한)"],
            answer: 1,
            feedback: "do-while은 먼저 한 번 실행해요! 10을 출력한 뒤 num=11이 되고, 11 < 10이 거짓이라 멈춰요."
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

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
