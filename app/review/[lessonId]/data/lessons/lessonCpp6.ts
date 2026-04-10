import { LessonData } from '../types';

export const lessonCpp6: LessonData = {
    id: "cpp-6",
    title: "조건문 if/else",
    description: "if, else, switch 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: if / else 기초 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "if / else 기초",
          desc: "조건에 따라 다르게 실행하는 법을 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '// 파이썬\n// if score >= 90:\n//     print("A")\n\n// C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 95;\n    if (score >= 90) {\n        cout << "A" << endl;\n    }\n    return 0;\n}',
          result: "A",
          note: "파이썬: 콜론 + 들여쓰기 → C++: 괄호() + 중괄호{}"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 15;\n    if (age >= 18) {\n        cout << "성인" << endl;\n    } else {\n        cout << "미성년" << endl;\n    }\n    return 0;\n}',
          predict: {
            question: "age가 15일 때 출력은?",
            options: ["성인", "미성년", "에러"],
            answer: 1,
            feedback: "15 >= 18은 거짓이라서 else 블록이 실행돼요!"
          },
          en: {
            predict: {
              question: "What is printed when age is 15?",
              options: ["Adult", "Minor", "Error"],
              feedback: "15 >= 18 is false, so the else block runs!"
            }
          }
        }
      },

      // Lv.1: 조건문 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "x가 0보다 크면 '양수'를 출력하는 조건문을 완성해요!",
          guide: "if (조건) { ... } 형태!",
          template: '___(x > 0) {\n    cout << "양수" << endl;\n}',
          answer: "if",
          expect: 'if (x > 0) {\n    cout << "양수" << endl;\n}',
          en: {
            task: "Complete the if statement that prints 'positive' when x > 0!",
            guide: "Use the form: if (condition) { ... }"
          }
        }
      },

      // Lv.1: 조건 직접 쓰기
      {
        type: "practice",
        content: {
          level: 1,
          task: "age가 19 미만이면 '미성년'을 출력하는 조건을 채워요!",
          guide: "if (조건) { ... } — 조건 자리에 뭘 써야 할까요?",
          template: 'if (___) {\n    cout << "미성년" << endl;\n}',
          answer: "age < 19",
          alternateAnswers: ["age<19"],
          expect: 'if (age < 19) {\n    cout << "미성년" << endl;\n}',
          en: {
            task: "Fill in the condition to print 'minor' when age is under 19!",
            guide: "if (condition) { ... } — what goes in the condition?"
          }
        }
      },

      // 퀴즈: 파이썬 vs C++
      {
        type: "quiz",
        content: {
          question: "파이썬 if문과 C++ if문의 가장 큰 차이는?",
          options: [
            "C++은 if를 못 쓴다",
            "C++은 괄호()와 중괄호{}를 쓰고, 파이썬은 콜론(:)과 들여쓰기를 쓴다",
            "파이썬은 else가 없다",
            "C++은 조건에 숫자를 못 쓴다"
          ],
          answer: 1,
          explanation: "파이썬: if 조건: 들여쓰기 → C++: if (조건) { 코드 } — 괄호와 중괄호가 핵심!",
          en: {
            question: "What is the biggest difference between Python and C++ if statements?",
            options: [
              "C++ cannot use if",
              "C++ uses parentheses () and braces {}, Python uses colon (:) and indentation",
              "Python has no else",
              "C++ cannot use numbers in conditions"
            ],
            explanation: "Python: if condition: indentation → C++: if (condition) { code } — parentheses and braces are key!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: 'if score >= 90 {\n    cout << "A" << endl;\n}',
          options: [
            "score 변수가 없어서",
            "조건을 괄호 ()로 감싸지 않아서",
            "중괄호가 잘못돼서"
          ],
          answer: 1,
          explanation: "C++에서는 if 조건을 반드시 괄호 ()로 감싸야 해요! if (score >= 90) 이렇게!",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "Because score variable is missing",
              "Because the condition is not wrapped in parentheses ()",
              "Because the braces are wrong"
            ],
            explanation: "In C++, the if condition must always be wrapped in parentheses ()! Like: if (score >= 90)"
          }
        }
      },

      // Lv.2: if-else 완성
      {
        type: "practice",
        content: {
          level: 2,
          task: "else를 써서 '불합격'도 출력해봐요!",
          guide: "if 블록 뒤에 else { ... }!",
          template: 'if (score >= 60) {\n    cout << "합격" << endl;\n} ___ {\n    cout << "불합격" << endl;\n}',
          answer: "else",
          expect: 'if (score >= 60) {\n    cout << "합격" << endl;\n} else {\n    cout << "불합격" << endl;\n}',
          en: {
            task: "Use else to also print 'fail'!",
            guide: "Add else { ... } after the if block!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "if/else 기초 완벽!",
          emoji: "🎯"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "if / else 기초",
          learned: [
            "if (조건) { 실행; } — 조건이 참이면 실행",
            "else { 실행; } — 조건이 거짓이면 실행",
            "조건은 반드시 괄호 () 안에!",
            "코드 블록은 중괄호 {} 안에!",
            "파이썬: 콜론 + 들여쓰기 → C++: 괄호 + 중괄호"
          ],
          canDo: "if/else로 조건에 따라 다른 코드를 실행할 수 있어요!",
          emoji: "🎯"
        }
      },

      // ==================== CHAPTER 2: else if & switch ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "else if & switch",
          desc: "여러 조건을 처리하는 법을 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "x가 0보다 크다는 조건을 if문에 써봐요!",
          template: 'if (___) {',
          answer: "x > 0",
          alternateAnswers: ["x>0"],
          expect: "if (x > 0) {",
          en: {
            message: "Wait! Do you remember what we learned earlier?",
            task: "Write the condition 'x is greater than 0' in an if statement!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'int x = 85;\nif (x >= 90) {\n    cout << "A" << endl;\n} else if (x >= 80) {\n    cout << "B" << endl;\n} else if (x >= 70) {\n    cout << "C" << endl;\n} else {\n    cout << "F" << endl;\n}',
          predict: {
            question: "x가 85일 때 출력은?",
            options: ["A", "B", "C", "F"],
            answer: 1,
            feedback: "85 >= 90은 거짓, 85 >= 80은 참! 그래서 B가 출력돼요!"
          },
          en: {
            predict: {
              question: "What is printed when x is 85?",
              options: ["A", "B", "C", "F"],
              feedback: "85 >= 90 is false, 85 >= 80 is true! So B is printed!"
            }
          }
        }
      },

      // Lv.1: else if 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "두 번째 조건을 추가해요! (파이썬의 elif 역할)",
          guide: "C++에서는 else if 두 단어!",
          template: 'if (x >= 90) {\n    cout << "A" << endl;\n} ___ ___(x >= 80) {\n    cout << "B" << endl;\n}',
          answer: "else if",
          blanksAnswer: ["else", "if"],
          expect: 'if (x >= 90) {\n    cout << "A" << endl;\n} else if (x >= 80) {\n    cout << "B" << endl;\n}',
          en: {
            task: "Add a second condition! (equivalent to Python's elif)",
            guide: "In C++, it's two words: else if!"
          }
        }
      },

      // switch 설명
      {
        type: "explain",
        content: {
          lines: [
            "값 하나를 여러 경우와 비교할 때는 switch가 편해요! 🔄",
            "case 값: 으로 각 경우를 적고, break;로 멈춰요!",
            "파이썬에는 switch가 없었죠? C++의 특별한 문법이에요!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int day = 3;\n    switch (day) {\n        case 1:\n            cout << "월요일" << endl;\n            break;\n        case 2:\n            cout << "화요일" << endl;\n            break;\n        case 3:\n            cout << "수요일" << endl;\n            break;\n        default:\n            cout << "기타" << endl;\n    }\n    return 0;\n}',
          result: "수요일",
          note: "switch + case + break! break를 빼먹으면 아래 case도 실행돼요!"
        }
      },

      // switch 퀴즈
      {
        type: "quiz",
        content: {
          question: "switch문에서 break;를 빼먹으면 어떻게 되나요?",
          options: [
            "에러가 난다",
            "해당 case만 실행된다",
            "해당 case 아래의 모든 case가 연속 실행된다",
            "switch문이 무시된다"
          ],
          answer: 2,
          explanation: "break;가 없으면 아래 case들이 연속 실행돼요! 이걸 fall-through라고 해요. 꼭 break;를 넣어주세요!",
          en: {
            question: "What happens if you forget break; in a switch statement?",
            options: [
              "An error occurs",
              "Only that case executes",
              "All cases below also execute consecutively",
              "The switch is ignored"
            ],
            explanation: "Without break;, all the cases below execute consecutively! This is called fall-through. Always include break;!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'int choice = 1;\nswitch (choice) {\n    case 1:\n        cout << "하나" << endl;\n    case 2:\n        cout << "둘" << endl;\n        break;\n}',
          options: [
            "case 1에 break;가 없어서 '하나'와 '둘' 모두 출력됨",
            "switch에 default가 없어서 에러",
            "case 뒤에 중괄호가 없어서 에러"
          ],
          answer: 0,
          explanation: "case 1에 break;가 없어서 '하나' 출력 후 case 2로 넘어가 '둘'도 출력돼요! break;를 꼭 넣어야 해요!",
          en: {
            question: "What is the problem with this code?",
            options: [
              "case 1 has no break; so both 'one' and 'two' are printed",
              "Error because switch has no default",
              "Error because case has no braces"
            ],
            explanation: "case 1 has no break; so after printing 'one', it falls through to case 2 and prints 'two'! Always include break;!"
          }
        }
      },

      // Lv.2: switch 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "switch문에서 빠진 키워드를 넣어요!",
          guide: "각 case 끝에는 꼭 이걸 넣어야 해요!",
          template: 'case 1:\n    cout << "하나" << endl;\n    ___;',
          answer: "break",
          expect: 'case 1:\n    cout << "하나" << endl;\n    break;',
          en: {
            task: "Fill in the missing keyword in the switch statement!",
            guide: "This keyword must be added at the end of each case!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "else if & switch 마스터!",
          emoji: "🔀"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "else if & switch",
          learned: [
            "else if (조건) — 여러 조건 검사 (파이썬 elif)",
            "위에서부터 순서대로 검사, 참이면 실행 후 탈출",
            "switch (값) { case 값: ... break; }",
            "break; 빠지면 fall-through 발생!",
            "default: — 아무 case에도 안 맞을 때"
          ],
          canDo: "여러 조건을 else if와 switch로 깔끔하게 처리할 수 있어요!",
          emoji: "🔀"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 — 성적 등급 판별기 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 성적 등급 판별기",
          desc: "점수를 입력받아 A/B/C/D/F 등급을 출력해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! switch에서 중요한 키워드 기억나요?",
          task: "case 끝에 써야 하는 키워드는?",
          template: 'case 1:\n    cout << "하나" << endl;\n    ___;',
          answer: "break",
          expect: 'case 1:\n    cout << "하나" << endl;\n    break;',
          en: {
            message: "Wait! Do you remember the important keyword in switch?",
            task: "What keyword must be written at the end of a case?"
          }
        }
      },

      // 프로젝트 설명
      {
        type: "explain",
        content: {
          lines: [
            "성적 등급 판별기를 만들어봐요! 🏆",
            "90점 이상 → A, 80점 이상 → B, 70점 이상 → C,",
            "60점 이상 → D, 나머지 → F"
          ],
          code: '// 완성된 모습\n// 입력: 85\n// 출력: 등급: B',
          note: "else if를 사용해서 만들어요!"
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
          task: "점수 변수를 만들고, 90점 이상이면 A를 출력해요!",
          target: 'int score = 85;\nif (score >= 90) {\n    cout << "등급: A" << endl;\n}',
          hint: "int score = 85; 그리고 if (score >= 90) { cout << ... }",
          done: ["#include <iostream>\nusing namespace std;\n\nint main() {"],
          answer: 'int score = 85;\nif (score >= 90) {\n    cout << "등급: A" << endl;\n}'
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "else if로 B, C, D를 추가하고, else로 F도 넣어요!",
          target: '} else if (score >= 80) {\n    cout << "등급: B" << endl;\n} else if (score >= 70) {\n    cout << "등급: C" << endl;\n} else if (score >= 60) {\n    cout << "등급: D" << endl;\n} else {\n    cout << "등급: F" << endl;\n}',
          hint: "else if (score >= 80) { ... } else if (score >= 70) { ... } ...",
          done: [
            "#include <iostream>\nusing namespace std;\n\nint main() {",
            'int score = 85;\nif (score >= 90) {\n    cout << "등급: A" << endl;'
          ],
          answer: '} else if (score >= 80) {\n    cout << "등급: B" << endl;\n} else if (score >= 70) {\n    cout << "등급: C" << endl;\n} else if (score >= 60) {\n    cout << "등급: D" << endl;\n} else {\n    cout << "등급: F" << endl;\n}'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "성적 등급 판별기 완성! 조건문 마스터!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 4: 조건문 손에 익히기 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "조건문 손에 익히기",
          desc: "if / else if / else 패턴을 손이 기억할 때까지!"
        }
      },

      // Drill 1: 양수/음수/0 판별
      {
        type: "practice",
        content: {
          level: 1,
          task: "정수 n이 양수면 \"positive\", 음수면 \"negative\", 0이면 \"zero\" 출력",
          guide: "if / else if / else 3단계",
          template: "int n = -5;\nif (n ___ 0) {\n    cout << \"positive\" << endl;\n} else if (n ___ 0) {\n    cout << \"negative\" << endl;\n} else {\n    cout << \"zero\" << endl;\n}",
          blanksAnswer: ["> ", "< "],
          alternateAnswers: [],
          answer: "int n = -5;\nif (n > 0) {\n    cout << \"positive\" << endl;\n} else if (n < 0) {\n    cout << \"negative\" << endl;\n} else {\n    cout << \"zero\" << endl;\n}",
          expect: "negative",
          en: {
            task: "Print \"positive\", \"negative\", or \"zero\" based on integer n",
            guide: "Use if / else if / else with 3 branches"
          }
        }
      },

      // Drill 2: 범위 조건 (and 연산자)
      {
        type: "practice",
        content: {
          level: 2,
          task: "score가 90 이상이면 A, 80 이상이면 B, 70 이상이면 C, 그 외 F 출력",
          guide: "if (score >= 90) ... else if (score >= 80) ...",
          template: "int score = 85;\nif (score >= 90) cout << \"A\";\nelse if (score ___ 80) cout << \"B\";\nelse if (score ___ 70) cout << \"C\";\nelse cout << \"F\";",
          blanksAnswer: [">= ", ">= "],
          alternateAnswers: [],
          answer: "int score = 85;\nif (score >= 90) cout << \"A\";\nelse if (score >= 80) cout << \"B\";\nelse if (score >= 70) cout << \"C\";\nelse cout << \"F\";",
          expect: "B",
          en: {
            task: "Print A (90+), B (80+), C (70+), or F for the given score",
            guide: "if (score >= 90) ... else if (score >= 80) ..."
          }
        }
      },

      // Drill 3: 처음부터 — 홀짝 + 범위
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! n을 입력받아 짝수면 \"even\", 홀수면 \"odd\" 출력하고\n추가로 n이 10보다 크면 \"big\", 아니면 \"small\"도 출력해요",
          guide: "cin → if (n%2==0) → if (n>10)",
          hint: "cin >> n;\nif (n % 2 == 0) cout << \"even\";\nelse cout << \"odd\";\nif (n > 10) cout << \" big\";\nelse cout << \" small\";",
          template: null,
          answer: "int n;\ncin >> n;\nif (n % 2 == 0) cout << \"even\";\nelse cout << \"odd\";\ncout << endl;\nif (n > 10) cout << \"big\";\nelse cout << \"small\";\ncout << endl;",
          alternateAnswers: [
            "int n;\ncin>>n;\nif(n%2==0)cout<<\"even\";else cout<<\"odd\";\ncout<<endl;\nif(n>10)cout<<\"big\";else cout<<\"small\";\ncout<<endl;"
          ],
          expect: "even\nbig",
          en: {
            task: "Write from scratch! Read n → print \"even\" or \"odd\", then print \"big\" or \"small\" based on whether n > 10",
            guide: "cin → if (n%2==0) → if (n>10)"
          }
        }
      },

      // Drill 4: 처음부터 — 삼항연산자
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! a, b 두 수를 입력받아 큰 수를 출력해요 (삼항연산자 사용!)",
          guide: "result = (a > b) ? a : b;",
          hint: "int a, b;\ncin >> a >> b;\ncout << (a > b ? a : b) << endl;",
          template: null,
          answer: "int a, b;\ncin >> a >> b;\nint result = (a > b) ? a : b;\ncout << result << endl;",
          alternateAnswers: [
            "int a,b;\ncin>>a>>b;\ncout<<(a>b?a:b)<<endl;"
          ],
          expect: "7",
          en: {
            task: "Write from scratch! Read two numbers a, b and print the larger one (use ternary operator!)",
            guide: "result = (a > b) ? a : b;"
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
