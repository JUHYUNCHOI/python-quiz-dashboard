import { LessonData } from '../types';

export const lessonCpp2: LessonData = {
    id: "cpp-2",
    title: "cout 마스터 & namespace",
    description: "cout 출력과 namespace를 복습해요!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: cout 출력 마스터 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "cout 출력 마스터",
          desc: "숫자, 수식, 이스케이프 문자를 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "cout은 문자열뿐만 아니라 숫자도 출력할 수 있어요! 🔢",
            "따옴표가 없으면 숫자, 있으면 문자열!"
          ],
          code: 'std::cout << 42 << std::endl;       // 숫자 → 42\nstd::cout << "42" << std::endl;     // 문자열 → 42\nstd::cout << 10 + 20 << std::endl;  // 수식 → 30',
          result: "42\n42\n30",
          note: "따옴표 없는 수식은 계산돼요!"
        }
      },

      // 숫자 vs 문자열 예측
      {
        type: "explain",
        content: {
          lines: [
            "따옴표가 있으면 문자열 → 그대로 출력!",
            "따옴표가 없으면 숫자/수식 → 계산 결과 출력!"
          ],
          code: 'std::cout << 5 * 3 << std::endl;\nstd::cout << "5 * 3" << std::endl;',
          predict: {
            question: "출력 결과는?",
            options: ['15\n15', '5 * 3\n5 * 3', '15\n5 * 3'],
            answer: 2,
            feedback: "따옴표 없는 5*3은 계산되어 15, 따옴표 있는 건 문자열이라 그대로!"
          }
        }
      },

      // ===== Lv.1: 숫자 출력 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "숫자 100을 출력해요!",
          guide: "따옴표 없이 숫자만 넣으면 돼요!",
          template: { before: 'std::cout << ', after: ' << std::endl;' },
          answer: "100",
          expect: 'std::cout << 100 << std::endl;'
        }
      },

      // 수식 출력 퀴즈
      {
        type: "quiz",
        content: {
          question: 'cout << 10 + 20 << endl; 의 출력은?',
          options: [
            "10 + 20",
            "30",
            "1020",
            "에러"
          ],
          answer: 1,
          explanation: "따옴표 없는 10 + 20은 수식이라 계산돼요! 10 + 20 = 30이 출력!"
        }
      },

      // 문자열+숫자 섞기 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: '"점수: 100"을 출력해요!',
          guide: '<< 로 문자열과 숫자를 이어붙여요!',
          template: 'std::cout << "점수: " ___ 100 << std::endl;',
          answer: "<<",
          expect: 'std::cout << "점수: " << 100 << std::endl;'
        }
      },

      // 이스케이프 퀴즈
      {
        type: "quiz",
        content: {
          question: "문자열 안에서 줄바꿈을 넣으려면?",
          options: [
            "\\s",
            "\\n",
            "\\t",
            "\\r"
          ],
          answer: 1,
          explanation: "\\n은 줄바꿈이에요! endl 대신 쓸 수도 있어요. \\t는 탭(넓은 공백)!"
        }
      },

      // 이스케이프 퀴즈 2
      {
        type: "quiz",
        content: {
          question: '문자열 안에 따옴표(")를 넣으려면?',
          options: [
            '그냥 " 를 쓴다',
            '\\" 를 쓴다',
            "' 를 대신 쓴다",
            "불가능하다"
          ],
          answer: 1,
          explanation: '문자열 안에서 \\"를 쓰면 따옴표 자체가 출력돼요! 그냥 "를 쓰면 문자열이 끝나버려요.'
        }
      },

      // ===== Lv.2: 이스케이프 빈칸 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "탭으로 이름과 나이를 구분해요!",
          guide: "탭 문자는 \\t 예요!",
          template: { before: 'std::cout << "이름', after: '나이" << std::endl;' },
          answer: "\\t",
          expect: 'std::cout << "이름\\t나이" << std::endl;'
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 출력이 이상해요. 왜일까요?",
          code: 'std::cout << "Hello";\nstd::cout << "World";',
          options: [
            "HelloWorld가 한 줄에 나온다",
            "에러가 난다",
            "Hello만 출력된다"
          ],
          answer: 0,
          explanation: "endl이나 \\n이 없으면 줄바꿈 없이 한 줄에 이어서 출력돼요!"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "cout 출력 마스터!",
          emoji: "🖨️"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "cout 출력 마스터",
          learned: [
            "따옴표 없으면 숫자/수식 — 계산 결과 출력!",
            "따옴표 있으면 문자열 — 그대로 출력!",
            "<< 체이닝으로 문자열 + 숫자 섞어쓰기",
            "\\n = 줄바꿈, \\t = 탭, \\\\ = 백슬래시, \\\" = 따옴표",
            "endl이 없으면 줄바꿈 안 됨!"
          ],
          canDo: "cout으로 숫자, 수식, 이스케이프 문자를 자유롭게 출력할 수 있어요!",
          emoji: "🖨️"
        }
      },

      // ==================== CHAPTER 2: namespace ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "namespace & using",
          desc: "std의 정체와 using namespace std를 복습해요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "수식 10 + 20의 출력 결과를 적어요!",
          template: { before: '// std::cout << 10 + 20;\n// 출력: ', after: '' },
          answer: "30",
          expect: "30"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "std = standard (표준) 📦",
            "C++이 기본 제공하는 도구들의 그룹 이름!",
            "namespace = 이름이 겹치지 않게 하는 공간 (폴더 같은 것)"
          ],
          code: 'std::cout   → std 그룹의 cout\nstd::endl   → std 그룹의 endl\nstd::string → std 그룹의 string',
          note: "std:: = \"표준 그룹의\" 라는 뜻!"
        }
      },

      // std 퀴즈
      {
        type: "quiz",
        content: {
          question: "std::cout 에서 std는 무엇의 약자?",
          options: [
            "student",
            "standard",
            "studio",
            "start"
          ],
          answer: 1,
          explanation: "std = standard (표준)! C++의 표준 라이브러리 namespace예요."
        }
      },

      // namespace 퀴즈
      {
        type: "quiz",
        content: {
          question: "namespace의 역할은?",
          options: [
            "프로그램을 빠르게 만든다",
            "이름이 겹치지 않게 구분해준다",
            "코드를 자동으로 완성한다",
            "헤더 파일을 불러온다"
          ],
          answer: 1,
          explanation: "namespace는 이름이 겹칠 때 구분하기 위한 '공간'이에요! 폴더처럼 같은 이름도 다른 namespace면 OK!"
        }
      },

      // 에러 퀴즈: std:: 없이
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: '#include <iostream>\n\nint main() {\n    cout << "Hi!" << endl;\n    return 0;\n}',
          options: [
            "iostream이 잘못됐어서",
            "std:: 가 빠져서 cout을 못 찾음",
            "endl 대신 \\n을 써야 해서"
          ],
          answer: 1,
          explanation: "std:: 없이 cout만 쓰면 컴파일러가 cout을 못 찾아요! std::cout이라고 써야 해요."
        }
      },

      // using namespace std 설명
      {
        type: "explain",
        content: {
          lines: [
            "using namespace std; 를 쓰면 std:: 를 생략할 수 있어요! ⚡",
            "#include <iostream> 바로 밑에 써줘요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello!" << endl;\n    return 0;\n}',
          result: "Hello!",
          note: "using namespace std; = std:: 전부 생략 가능!"
        }
      },

      // using namespace std 퀴즈
      {
        type: "quiz",
        content: {
          question: "using namespace std; 의 역할은?",
          options: [
            "iostream을 불러온다",
            "std:: 를 생략할 수 있게 해준다",
            "프로그램을 더 빠르게 만든다",
            "main() 함수를 자동으로 만든다"
          ],
          answer: 1,
          explanation: "using namespace std; 를 쓰면 std:: 없이 cout, endl 등을 바로 쓸 수 있어요!"
        }
      },

      // ===== Lv.1: using namespace std 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "std:: 를 생략하는 마법 주문을 써봐요!",
          guide: "using namespace ___; 형태!",
          template: "using namespace ___;",
          answer: "std",
          expect: "using namespace std;"
        }
      },

      // ===== Lv.2: cout 빈칸 (using namespace std 후) =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "using namespace std; 를 쓴 후, Hello를 출력해요!",
          guide: "std:: 없이 cout만 쓰면 돼요!",
          template: '___ << "Hello!" << ___;',
          answer: "cout",
          blanksAnswer: ["cout", "endl"],
          expect: 'cout << "Hello!" << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "namespace 완벽 이해!",
          emoji: "📦"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "namespace & using",
          learned: [
            "std = standard (표준 라이브러리)",
            "namespace = 이름 충돌 방지 공간 (폴더)",
            "std:: 없이 cout 쓰면 에러!",
            "using namespace std; → std:: 생략 가능!",
            "#include 바로 밑에 써주면 OK"
          ],
          canDo: "using namespace std; 로 깔끔한 코드를 쓸 수 있어요!",
          emoji: "📦"
        }
      },

      // ==================== CHAPTER 3: 종합 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "종합 프로젝트",
          desc: "배운 것을 모아 프로그램을 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! using namespace std; 기억나요?",
          task: "std:: 를 생략하게 해주는 줄을 써봐요!",
          template: null,
          answer: "using namespace std;",
          alternateAnswers: [
            "using namespace std"
          ],
          expect: "using namespace std;"
        }
      },

      // 종합 예측
      {
        type: "explain",
        content: {
          lines: [
            "지금까지 배운 것을 모아서 코드를 읽어봐요!",
            "using namespace std; 덕분에 cout, endl 바로 사용!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "점수: " << 95 << endl;\n    cout << "등급\\tA" << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ['점수: 95\n등급\\tA', '점수: 95\n등급\tA (탭으로 벌어짐)', '점수: 95\n등급    A'],
            answer: 1,
            feedback: "\\t는 탭 문자! 등급과 A 사이에 넓은 공백이 들어가요."
          }
        }
      },

      // 프로젝트: 자기소개 카드
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "#include와 using namespace std를 써봐요!",
          target: "#include <iostream>\nusing namespace std;",
          hint: "#include <iostream> + using namespace std;",
          done: [],
          answer: "#include <iostream>\nusing namespace std;"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "main 함수 틀을 써봐요!",
          target: "int main() {\n\n    return 0;\n}",
          hint: "int main() { return 0; }",
          done: ["#include <iostream>\nusing namespace std;"],
          answer: "int main() {\n\n    return 0;\n}"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "이름과 나이를 탭으로 구분해서 출력해요!",
          target: 'cout << "이름\\t나이" << endl;\ncout << "주현\\t14" << endl;',
          hint: 'cout << "이름\\t나이" << endl;',
          done: ["#include <iostream>\nusing namespace std;\n\nint main() {"],
          answer: 'cout << "이름\\t나이" << endl;\ncout << "주현\\t14" << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "cout & namespace 마스터!",
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
