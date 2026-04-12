import { LessonData } from '../types';

export const lessonCpp14: LessonData = {
    id: "cpp-14",
    title: "구조체 (struct)",
    description: "struct로 관련 변수를 묶는 법을 복습해요!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: struct ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "구조체 (struct)",
          desc: "여러 변수를 하나로 묶는 struct를 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "변수가 여러 개 필요할 때, 하나로 묶으면 편해요! 📦",
            "파이썬에서는 딕셔너리나 클래스를 쓰지만,",
            "C++에서는 struct로 묶을 수 있어요!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int age;\n    int score;\n};\n\nint main() {\n    Student s;\n    s.name = "Alice";\n    s.age = 14;\n    s.score = 95;\n\n    cout << s.name << " " << s.age << "세" << endl;\n    return 0;\n}',
          result: 'Alice 14세',
          note: "struct = 변수 묶음! 점(.)으로 멤버에 접근해요."
        }
      },

      // struct 퀴즈
      {
        type: "quiz",
        content: {
          question: "struct의 역할은?",
          options: [
            "함수를 묶어놓는 것",
            "관련된 변수들을 하나로 묶는 것",
            "배열을 만드는 것",
            "포인터를 저장하는 것"
          ],
          answer: 1,
          explanation: "struct는 관련된 변수(멤버)를 하나의 타입으로 묶어주는 거예요! 파이썬 딕셔너리와 비슷해요.",
          en: {
            question: "What is the role of struct?",
            options: [
              "Groups functions together",
              "Groups related variables into one type",
              "Creates an array",
              "Stores pointers"
            ],
            explanation: "struct groups related variables (members) into one type! Similar to a Python dictionary."
          }
        }
      },

      // 멤버 접근 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'struct Point {\n    int x;\n    int y;\n};\n\nPoint p;\np.x = 3;\np.y = 7;\ncout << p.x + p.y << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["3", "7", "10", "에러"],
            answer: 2,
            feedback: "p.x = 3, p.y = 7이니까 3 + 7 = 10이에요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["3", "7", "10", "Error"],
              feedback: "p.x = 3 and p.y = 7, so 3 + 7 = 10!"
            }
          }
        }
      },

      // ===== Lv.1: struct 선언 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "학생 구조체를 선언해요!",
          guide: "struct 이름 { 멤버들 }; 형태!",
          template: "___ Student {\n    string name;\n    int age;\n};",
          answer: "struct",
          expect: "struct Student {\n    string name;\n    int age;\n};",
          en: {
            task: "Declare a Student struct!",
            guide: "Use the form: struct Name { members };"
          }
        }
      },

      // ===== Lv.1: 멤버 접근 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "학생의 이름에 접근해요!",
          guide: "점(.)으로 멤버에 접근해요!",
          template: 'Student s;\ns___name = "Alice";',
          answer: ".",
          expect: 'Student s;\ns.name = "Alice";',
          en: {
            task: "Access the student's name!",
            guide: "Use dot notation (.) to access members!"
          }
        }
      },

      // 초기화 설명
      {
        type: "explain",
        content: {
          lines: [
            "중괄호 {}로 한 번에 초기화할 수도 있어요! ⚡",
            "선언 순서대로 값을 넣어줘요."
          ],
          code: 'struct Point {\n    int x;\n    int y;\n};\n\nPoint p = {10, 20};  // x=10, y=20\ncout << p.x << ", " << p.y << endl;',
          result: "10, 20",
          note: "Point p = {10, 20}; → 멤버 순서대로 초기화!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: 'struct Student {\n    string name;\n    int age;\n}\n\nStudent s;',
          options: [
            "Student를 만들 수 없어서",
            "struct 뒤에 세미콜론(;)이 빠져서",
            "멤버 변수가 너무 적어서"
          ],
          answer: 1,
          explanation: "struct 선언 끝에는 반드시 세미콜론(;)이 있어야 해요! struct Student { ... }; 이렇게요.",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "Cannot create a Student",
              "Missing semicolon (;) after the struct declaration",
              "Too few member variables"
            ],
            explanation: "A struct declaration must end with a semicolon (;)! Write it as: struct Student { ... };"
          }
        }
      },

      // ===== Lv.2: 중괄호 초기화 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "Point를 x=5, y=3으로 초기화해요!",
          guide: "struct Point { int x; int y; }; — 중괄호 {}에 x, y 순서대로 값을 넣어요!",
          template: "Point p = {___, ___};",
          answer: "5",
          blanksAnswer: ["5", "3"],
          expect: "Point p = {5, 3};",
          en: {
            task: "Initialize Point with x=5, y=3!",
            guide: "struct Point { int x; int y; }; — put x first, then y inside curly braces {}!"
          }
        }
      },

      // 예측: Rect 넓이
      {
        type: "explain",
        content: {
          lines: [],
          code: 'struct Rect {\n    int w;\n    int h;\n};\n\nRect r = {3, 4};\ncout << r.w * r.h << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["3", "4", "7", "12"],
            answer: 3,
            feedback: "r.w=3, r.h=4 → 3 * 4 = 12!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["3", "4", "7", "12"],
              feedback: "r.w=3, r.h=4 → 3 * 4 = 12!"
            }
          }
        }
      },

      // 멤버 접근 연습 (다른 struct)
      {
        type: "practice",
        content: {
          level: 1,
          task: "Rect의 너비에 접근해요!",
          guide: "점(.)으로 멤버에 접근해요!",
          template: "Rect r;\ncout << r___w << endl;",
          answer: ".",
          expect: "Rect r;\ncout << r.w << endl;",
          en: {
            task: "Access the width of Rect!",
            guide: "Use dot notation (.) to access members!"
          }
        }
      },

      // 3개 멤버 초기화
      {
        type: "practice",
        content: {
          level: 2,
          task: "Student를 이름 Alice, 나이 15, 점수 90으로 초기화해요!",
          guide: "struct Student { string name; int age; int score; }; — 선언 순서대로!",
          template: 'Student s = {___, ___, ___};',
          answer: '"Alice"',
          blanksAnswer: ['"Alice"', "15", "90"],
          expect: 'Student s = {"Alice", 15, 90};',
          en: {
            task: 'Initialize Student with name "Alice", age 15, score 90!',
            guide: "struct Student { string name; int age; int score; }; — in order!"
          }
        }
      },

      // errorQuiz: 멤버 구분자
      {
        type: "errorQuiz",
        content: {
          question: "이 struct 선언에서 문제는?",
          code: 'struct Student {\n    string name,\n    int age;\n};',
          options: [
            "name과 age가 같은 타입이 아니라서",
            "멤버 사이에 쉼표(,) 대신 세미콜론(;)을 써야 해서",
            "struct 이름이 대문자로 시작해야 해서"
          ],
          answer: 1,
          explanation: "멤버 변수는 각각 세미콜론(;)으로 끝내야 해요! 쉼표(,)는 안 돼요.",
          en: {
            question: "What's wrong with this struct declaration?",
            options: [
              "name and age are not the same type",
              "Members must be separated by semicolons (;), not commas (,)",
              "Struct name must start with uppercase"
            ],
            explanation: "Each member variable must end with a semicolon (;)! Commas don't work here."
          }
        }
      },

      // 멤버 하나씩 대입
      {
        type: "practice",
        content: {
          level: 2,
          task: "Point 구조체를 만들고 x에 7을 대입해요!",
          guide: "점(.)으로 멤버에 접근해서 대입해요!",
          template: "Point p;\np.___ = 7;",
          answer: "x",
          expect: "Point p;\np.x = 7;",
          en: {
            task: "Create a Point and assign 7 to x!",
            guide: "Use dot notation (.) to assign to a member!"
          }
        }
      },

      // 예측: struct 복사
      {
        type: "explain",
        content: {
          lines: [],
          code: 'struct Point {\n    int x;\n    int y;\n};\n\nPoint a = {5, 10};\nPoint b = a;   // 복사!\ncout << b.x << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["0", "5", "10", "에러"],
            answer: 1,
            feedback: "b = a로 복사하면 b.x도 5가 돼요! struct는 통째로 복사돼요."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["0", "5", "10", "Error"],
              feedback: "b = a copies all members, so b.x is also 5! Structs are copied as a whole."
            }
          }
        }
      },

      // errorQuiz: 존재하지 않는 멤버
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 에러는?",
          code: 'struct Point {\n    int x;\n    int y;\n};\n\nPoint p = {3, 4};\ncout << p.z << endl;',
          options: [
            "Point를 초기화할 수 없어서",
            "z라는 멤버가 없어서",
            "cout으로 struct를 출력할 수 없어서"
          ],
          answer: 1,
          explanation: "Point에는 x와 y만 있어요! p.z는 존재하지 않는 멤버라 에러가 나요.",
          en: {
            question: "What's the error in this code?",
            options: [
              "Point cannot be initialized",
              "There is no member named z",
              "Cannot print struct with cout"
            ],
            explanation: "Point only has x and y! p.z doesn't exist, so it's an error."
          }
        }
      },

      // Lv.3: struct 전체 작성
      {
        type: "practice",
        content: {
          level: 3,
          task: "int x와 int y를 가진 Point 구조체를 선언해요!",
          guide: "struct 이름 { 멤버들; }; 형태로 처음부터!",
          context: "// 아래에 Point struct를 선언하세요\n// 그러면 main()에서 Point p = {3, 7}; 처럼 쓸 수 있어요",
          template: null,
          answer: "struct Point {\n    int x;\n    int y;\n};",
          expect: "struct Point {\n    int x;\n    int y;\n};",
          en: {
            task: "Declare a Point struct with int x and int y!",
            guide: "Write it from scratch: struct Name { members; };",
            context: "// Declare the Point struct below\n// Then in main() you can write: Point p = {3, 7};"
          }
        }
      },

      // 인터리빙: Rect 구조체로 다른 상황
      {
        type: "interleaving",
        content: {
          message: "잠깐! 다른 struct도 똑같이 작동해요!",
          task: "Rect의 넓이(w × h)를 출력하는 코드를 채워요!",
          template: "Rect r = {4, 6};\ncout << r.___ * r.___ << endl;",
          answer: "w",
          blanksAnswer: ["w", "h"],
          expect: "Rect r = {4, 6};\ncout << r.w * r.h << endl;",
          en: {
            message: "Quick! Same dot notation works for any struct!",
            task: "Fill in the code to print area (w × h) of Rect!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "struct 완벽 이해!",
          emoji: "📦"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "구조체 (struct)",
          learned: [
            "struct = 관련 변수를 하나로 묶는 타입",
            "struct 이름 { 멤버들; }; (세미콜론 필수!)",
            "점(.)으로 멤버 접근: s.name, s.age",
            "중괄호 초기화: Point p = {10, 20};",
            "struct는 통째로 복사 가능: Point b = a;"
          ],
          canDo: "struct를 선언하고 멤버에 접근할 수 있어요!",
          emoji: "📦"
        }
      },

      // ==================== CHAPTER 2: 전체 코드 작성 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "#include & 전체 코드 작성",
          desc: "struct를 사용하는 완전한 C++ 프로그램을 써봐요!"
        }
      },

      // include 설명
      {
        type: "explain",
        content: {
          lines: [
            "C++ 프로그램엔 항상 헤더 파일이 필요해요! 📋",
            "#include <iostream> → cout, cin 사용",
            "#include <string>  → string 타입 사용",
            "#include <vector>  → vector 사용",
            "using namespace std; → std:: 생략 가능"
          ],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    Student s = {"Alice", 95};\n    cout << s.name << ": " << s.score << endl;\n    return 0;\n}',
          result: "Alice: 95",
          note: "string 멤버가 있으면 #include <string>도 필요해요!"
        }
      },

      // 빈칸: include 채우기
      {
        type: "practice",
        content: {
          level: 1,
          task: "cout을 쓰려면 어떤 헤더가 필요할까요?",
          guide: "#include <___> 형태!",
          template: "#include <___>\nusing namespace std;",
          answer: "iostream",
          expect: "#include <iostream>\nusing namespace std;",
          en: {
            task: "Which header do you need to use cout?",
            guide: "Use the form: #include <___>"
          }
        }
      },

      // 빈칸: string 헤더
      {
        type: "practice",
        content: {
          level: 1,
          task: "string 타입을 쓰려면 어떤 헤더가 필요할까요?",
          guide: "string 전용 헤더가 따로 있어요!",
          template: "#include <iostream>\n#include <___>\nusing namespace std;",
          answer: "string",
          expect: "#include <iostream>\n#include <string>\nusing namespace std;",
          en: {
            task: "Which header do you need to use the string type?",
            guide: "There's a dedicated header for string!"
          }
        }
      },

      // 빈칸: namespace
      {
        type: "practice",
        content: {
          level: 1,
          task: "std:: 없이 cout을 쓰려면?",
          guide: "using ___ std; 한 줄이면 돼요!",
          template: "#include <iostream>\nusing ___ std;",
          answer: "namespace",
          expect: "#include <iostream>\nusing namespace std;",
          en: {
            task: "How do you use cout without typing std:: every time?",
            guide: "One line: using ___ std;"
          }
        }
      },

      // quiz: 어떤 헤더?
      {
        type: "quiz",
        content: {
          question: "vector<int>를 쓰려면 어떤 헤더가 필요한가요?",
          options: [
            "#include <iostream>",
            "#include <string>",
            "#include <vector>",
            "#include <array>"
          ],
          answer: 2,
          explanation: "vector는 #include <vector> 헤더가 필요해요! iostream은 입출력, string은 문자열 전용이에요.",
          en: {
            question: "Which header do you need to use vector<int>?",
            options: [
              "#include <iostream>",
              "#include <string>",
              "#include <vector>",
              "#include <array>"
            ],
            explanation: "vector needs #include <vector>! iostream is for I/O, string is for strings."
          }
        }
      },

      // 프로젝트: 전체 코드 작성
      {
        type: "project",
        content: {
          step: 1,
          total: 2,
          task: "헤더와 struct Point 선언을 써봐요!",
          target: "#include <iostream>\nusing namespace std;\n\nstruct Point {\n    int x;\n    int y;\n};",
          hint: "#include <iostream> → using namespace std; → struct Point { int x; int y; };",
          done: [],
          answer: "#include <iostream>\nusing namespace std;\n\nstruct Point {\n    int x;\n    int y;\n};"
        }
      },

      {
        type: "project",
        content: {
          step: 2,
          total: 2,
          task: "main() 안에서 Point를 만들고 x+y를 출력해봐요!",
          target: "int main() {\n    Point p = {3, 7};\n    cout << p.x + p.y << endl;\n    return 0;\n}",
          hint: "Point p = {3, 7}; 로 초기화 → cout << p.x + p.y",
          done: ["#include <iostream>\nusing namespace std;\n\nstruct Point {\n    int x;\n    int y;\n};"],
          answer: "int main() {\n    Point p = {3, 7};\n    cout << p.x + p.y << endl;\n    return 0;\n}"
        }
      },

      // 인터리빙: string 헤더 복습 (다른 상황)
      {
        type: "interleaving",
        content: {
          message: "잠깐! struct에 string 멤버가 있으면?",
          task: "string 타입 멤버가 있을 때 필요한 헤더 두 개를 채워요!",
          template: "#include <___>\n#include <___>\nusing namespace std;",
          answer: "iostream",
          blanksAnswer: ["iostream", "string"],
          expect: "#include <iostream>\n#include <string>\nusing namespace std;",
          en: {
            message: "Quick! What if a struct has a string member?",
            task: "Fill in the two headers needed when using string type!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "완전한 C++ 프로그램 작성 완료!",
          emoji: "🏆"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "#include & 전체 코드 작성",
          learned: [
            "#include <iostream> → cout, cin",
            "#include <string>  → string 타입",
            "#include <vector>  → vector<T>",
            "using namespace std; → std:: 생략",
            "struct 프로그램 = 헤더 + struct선언 + main()"
          ],
          canDo: "헤더부터 main()까지 완전한 struct 프로그램을 쓸 수 있어요!",
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
