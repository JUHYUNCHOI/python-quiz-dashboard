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

      // 인터리빙: struct 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! struct 초기화 기억나요?",
          task: "Point 구조체를 x=1, y=2로 초기화해요!",
          template: "Point p = {___, ___};",
          answer: "1",
          blanksAnswer: ["1", "2"],
          expect: "Point p = {1, 2};",
          en: {
            message: "Quick! Remember struct initialization?",
            task: "Initialize a Point struct with x=1, y=2!"
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
            "struct 이름 { 멤버들 }; (세미콜론 필수!)",
            "점(.)으로 멤버 접근: s.name, s.age",
            "중괄호 초기화: Point p = {10, 20};",
            "파이썬 딕셔너리/클래스와 비슷!"
          ],
          canDo: "struct를 선언하고 멤버에 접근할 수 있어요!",
          emoji: "📦"
        }
      },

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
