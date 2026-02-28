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
          lines: [
            "파이썬에서 if문을 썼던 거 기억나요? 🤔",
            "C++도 비슷하지만, 콜론(:) 대신 중괄호 {}를 써요!",
            "그리고 조건은 반드시 괄호 () 안에 넣어요!"
          ],
          code: '// 파이썬\n// if score >= 90:\n//     print("A")\n\n// C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 95;\n    if (score >= 90) {\n        cout << "A" << endl;\n    }\n    return 0;\n}',
          result: "A",
          note: "파이썬: 콜론 + 들여쓰기 → C++: 괄호() + 중괄호{}"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "if 조건이 거짓이면 else가 실행돼요!",
            "파이썬과 똑같은 개념이에요 😊"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 15;\n    if (age >= 18) {\n        cout << "성인" << endl;\n    } else {\n        cout << "미성년" << endl;\n    }\n    return 0;\n}',
          predict: {
            question: "age가 15일 때 출력은?",
            options: ["성인", "미성년", "에러"],
            answer: 1,
            feedback: "15 >= 18은 거짓이라서 else 블록이 실행돼요!"
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
          expect: 'if (x > 0) {\n    cout << "양수" << endl;\n}'
        }
      },

      // Lv.1: 괄호 넣기
      {
        type: "practice",
        content: {
          level: 1,
          task: "조건을 감싸는 괄호를 넣어요!",
          guide: "C++에서 if 조건은 반드시 ()안에!",
          template: 'if ___score >= 90___ {\n    cout << "합격" << endl;\n}',
          answer: "(",
          blanksAnswer: ["(", ")"],
          expect: 'if (score >= 90) {\n    cout << "합격" << endl;\n}'
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
          explanation: "파이썬: if 조건: 들여쓰기 → C++: if (조건) { 코드 } — 괄호와 중괄호가 핵심!"
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
          explanation: "C++에서는 if 조건을 반드시 괄호 ()로 감싸야 해요! if (score >= 90) 이렇게!"
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
          expect: 'if (score >= 60) {\n    cout << "합격" << endl;\n} else {\n    cout << "불합격" << endl;\n}'
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
          task: "if 조건을 감싸는 괄호를 완성해요!",
          template: 'if ___x > 0___ {',
          answer: "(",
          blanksAnswer: ["(", ")"],
          expect: "if (x > 0) {"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "조건이 3개 이상이면 else if를 써요! 🔀",
            "파이썬의 elif와 같은 역할이에요!",
            "C++에서는 else if 두 단어로 써요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 75;\n    if (score >= 90) {\n        cout << "A" << endl;\n    } else if (score >= 80) {\n        cout << "B" << endl;\n    } else if (score >= 70) {\n        cout << "C" << endl;\n    } else {\n        cout << "F" << endl;\n    }\n    return 0;\n}',
          result: "C",
          note: "파이썬 elif → C++ else if (두 단어!)"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "else if는 위에서부터 순서대로 검사해요!",
            "처음 참인 곳에서 멈추고, 나머지는 건너뛰어요."
          ],
          code: 'int x = 85;\nif (x >= 90) {\n    cout << "A" << endl;\n} else if (x >= 80) {\n    cout << "B" << endl;\n} else if (x >= 70) {\n    cout << "C" << endl;\n} else {\n    cout << "F" << endl;\n}',
          predict: {
            question: "x가 85일 때 출력은?",
            options: ["A", "B", "C", "F"],
            answer: 1,
            feedback: "85 >= 90은 거짓, 85 >= 80은 참! 그래서 B가 출력돼요!"
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
          expect: 'if (x >= 90) {\n    cout << "A" << endl;\n} else if (x >= 80) {\n    cout << "B" << endl;\n}'
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
          explanation: "break;가 없으면 아래 case들이 연속 실행돼요! 이걸 fall-through라고 해요. 꼭 break;를 넣어주세요!"
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
          explanation: "case 1에 break;가 없어서 '하나' 출력 후 case 2로 넘어가 '둘'도 출력돼요! break;를 꼭 넣어야 해요!"
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
          expect: 'case 1:\n    cout << "하나" << endl;\n    break;'
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
          expect: 'case 1:\n    cout << "하나" << endl;\n    break;'
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

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
