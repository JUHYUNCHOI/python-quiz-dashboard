/**
 * ✅ 선생님 검토 완료 (2026-04-21)
 *
 * 복습 흐름, 난이도 progression, context, starterCode, sampleInput,
 * 한영 en 블록까지 한 번 전체 검토했어요.
 *
 * ⚠️ 구조 변경 시 주의:
 *  - 스텝 순서가 난이도 계단식으로 이미 정렬돼 있음 (Lv.1 → Lv.2 → Lv.3)
 *  - interleaving 위치는 spaced repetition 목적으로 챕터 중간에 배치됨
 *  - 모든 practice에 context (struct + 배열/벡터 선언) 포함
 *  - Lv.3 3개는 starterCode로 int main() 스켈레톤 제공
 *  - 한영 content/en 필드 세트로 같이 유지 (한쪽만 수정 금지)
 *
 * 수정할 때는 Edit만 사용. Write로 전체 덮어쓰기 금지.
 */

import { LessonData } from '../types';

export const lessonCpp14: LessonData = {
    id: "cpp-14",
    title: "구조체 (struct)",
    titleEn: "Struct",
    description: "struct로 관련 변수를 묶는 법을 복습해요!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: struct ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "구조체 (struct)",
          desc: "여러 변수를 하나로 묶는 struct를 배워요!",
          en: { title: "Struct Basics", desc: "Learn how to bundle variables together with struct!" }
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
          code: '#include <iostream>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int age;\n    int score;\n};\n\nint main() {\n    Student s;\n    s.name = "Alice";\n    s.age = 14;\n    s.score = 95;\n\n    cout << s.name << " " << s.age << " years" << endl;\n    return 0;\n}',
          result: 'Alice 14 years',
          note: "struct = 변수 묶음! 점(.)으로 멤버에 접근해요.",
          en: {
            lines: [
              "When you need many variables, bundling them together is so much easier! 📦",
              "In Python you'd use a dictionary or class,",
              "but in C++ you can bundle them with struct!"
            ],
            note: "struct = variable bundle! Use dot (.) to access members."
          }
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

      // 객관식: struct vs 다른 개념 비교
      {
        type: "quiz",
        content: {
          question: "다음 중 struct와 가장 비슷한 것은?",
          options: [
            "파이썬의 list — 순서대로 값을 담는 것",
            "파이썬의 dict — 이름으로 값에 접근하는 것",
            "C++의 배열 — 같은 타입만 담는 것",
            "C++의 함수 — 동작을 묶는 것"
          ],
          answer: 1,
          explanation: "struct는 파이썬의 dict와 비슷해요! 이름(멤버)으로 값에 접근해요: s.name, s.score ↔ d['name'], d['score']. 배열은 같은 타입만, struct는 서로 다른 타입도 묶을 수 있어요.",
          en: {
            question: "Which is most similar to struct?",
            options: [
              "Python list — stores values in order",
              "Python dict — access values by name",
              "C++ array — only stores same type",
              "C++ function — groups behavior"
            ],
            explanation: "struct is similar to a Python dict! Access values by name (member): s.name, s.score ↔ d['name'], d['score']. Arrays hold one type only; structs can group different types."
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
          template: 'struct Student {\n    string name;\n    int age;\n    int score;\n};\n\nStudent s;\ns___name = "Alice";',
          answer: ".",
          expect: 'Student s;\ns.name = "Alice";',
          en: {
            task: "Access the student's name!",
            guide: "struct Student { string name; int age; int score; }; — use dot notation (.) to access members!"
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
          template: "struct Rect {\n    int w;\n    int h;\n};\n\nRect r;\ncout << r___w << endl;",
          answer: ".",
          expect: "Rect r;\ncout << r.w << endl;",
          en: {
            task: "Access the width of Rect!",
            guide: "struct Rect { int w; int h; }; — use dot notation (.) to access members!"
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
          note: "Point p = {10, 20}; → 멤버 순서대로 초기화!",
          en: {
            lines: [
              "You can also initialize all at once with curly braces {}! ⚡",
              "Fill in values in the same order as the member declarations."
            ],
            note: "Point p = {10, 20}; → initializes members in declaration order!"
          }
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
          guide: "중괄호 {}에 x, y 순서대로 값을 넣어요!",
          template: "struct Point {\n    int x;\n    int y;\n};\n\nPoint p = {___, ___};",
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

      // 3개 멤버 초기화
      {
        type: "practice",
        content: {
          level: 2,
          task: "Student를 이름 Alice, 나이 15, 점수 90으로 초기화해요!",
          guide: "선언 순서대로 값을 넣어요!",
          template: 'struct Student {\n    string name;\n    int age;\n    int score;\n};\n\nStudent s = {___, ___, ___};',
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
          template: "struct Point {\n    int x;\n    int y;\n};\n\nPoint p;\np.___ = 7;",
          answer: "x",
          expect: "Point p;\np.x = 7;",
          en: {
            task: "Create a Point and assign 7 to x!",
            guide: "struct Point { int x; int y; }; — use dot notation (.) to assign to a member!"
          }
        }
      },

      // cin으로 struct 멤버에 입력받기
      {
        type: "explain",
        content: {
          lines: [
            "cin으로 struct 멤버에 직접 입력받을 수 있어요! 📥",
            "점(.)으로 멤버에 접근하면 cin과 cout 모두 쓸 수 있어요."
          ],
          code: 'struct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    Point p;\n    cin >> p.x >> p.y;\n    cout << p.x + p.y << endl;\n    return 0;\n}',
          result: "// 입력: 3 7  →  출력: 10",
          note: "cin >> p.x >> p.y; 로 struct 멤버에 값을 입력받아요!",
          en: {
            lines: [
              "You can read input directly into struct members with cin! 📥",
              "Use dot notation (.) — it works with both cin and cout."
            ],
            note: "cin >> p.x >> p.y; reads values directly into struct members!"
          }
        }
      },

      // ===== Lv.2: cin으로 struct 입력 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "Point의 x와 y를 cin으로 입력받아요!",
          guide: "cin >> 으로 각 멤버에 입력받아요!",
          template: "struct Point {\n    int x;\n    int y;\n};\n\nPoint p;\ncin >> p.___ >> p.___;",
          answer: "x",
          blanksAnswer: ["x", "y"],
          expect: "Point p;\ncin >> p.x >> p.y;",
          en: {
            task: "Read x and y into a Point using cin!",
            guide: "struct Point { int x; int y; }; — use cin >> to read into each member!"
          }
        }
      },

      // ===== Lv.2: Student cin 입력 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "Student의 age와 score를 cin으로 입력받아요!",
          guide: "cin >> 으로 멤버에 입력받아요!",
          template: "struct Student {\n    string name;\n    int age;\n    int score;\n};\n\nStudent s;\ncin >> s.___ >> s.___;",
          answer: "age",
          blanksAnswer: ["age", "score"],
          expect: "Student s;\ncin >> s.age >> s.score;",
          en: {
            task: "Read age and score into a Student using cin!",
            guide: "struct Student { string name; int age; int score; }; — use cin >> to read into each member!"
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

      // Lv.2: struct 전체 빈칸 채우기
      {
        type: "practice",
        content: {
          level: 2,
          task: "int x와 int y를 가진 Point 구조체를 선언해요!",
          guide: "struct 이름 { 타입 멤버명; }; 형태로 빈칸을 채워요!",
          template: "___ Point {\n    ___ x;\n    ___ y;\n};",
          answer: "struct",
          blanksAnswer: ["struct", "int", "int"],
          expect: "struct Point {\n    int x;\n    int y;\n};",
          en: {
            task: "Declare a Point struct with int x and int y!",
            guide: "Fill in the blanks: struct Name { type member; };"
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
            "cin >> p.x >> p.y; 로 멤버에 입력받기"
          ],
          canDo: "struct를 선언하고 멤버에 접근할 수 있어요!",
          emoji: "📦"
        }
      },

      // ==================== CHAPTER 2: struct 배열 & 패턴 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "struct 배열 & 패턴",
          desc: "struct 여러 개를 배열에 담고 for문으로 처리해요!",
          en: { title: "Struct Arrays & Patterns", desc: "Store multiple structs in an array and process them with a for loop!" }
        }
      },

      // 배열 선언 설명
      {
        type: "explain",
        content: {
          lines: [
            "학생 여러 명을 배열에 담으면 for문 하나로 전부 처리할 수 있어요! 🎒",
            "students[0], students[1], students[2]... 인덱스로 접근해요."
          ],
          code: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};\n\ncout << students[0].name;  // 김철수\ncout << students[1].score; // 87',
          result: "김철수\n87",
          note: "students[인덱스].멤버 — 배열 접근 + 점(.) 연산자를 같이 써요!",
          en: {
            lines: [
              "Storing multiple students in an array lets you process them all with one for loop! 🎒",
              "Access with students[0], students[1], students[2]... using the index."
            ],
            code: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};\n\ncout << students[0].name;  // Emma\ncout << students[1].score; // 87',
            result: "Emma\n87",
            note: "students[index].member — array access + dot (.) operator together!"
          }
        }
      },

      // 인터리빙: struct 기초 복습 (Ch1 초기화 문법 환기)
      {
        type: "interleaving",
        content: {
          message: "잠깐! struct 기초 복습해요 ⚡",
          task: '두 번째 원소를 이름 "이영희", 점수 87로 초기화해요!',
          guide: 'struct Student { string name; int score; }; — 선언 순서(name, score)대로!',
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3];',
          template: 'students[1] = {___, ___};',
          answer: '"이영희"',
          blanksAnswer: ['"이영희"', "87"],
          expect: 'students[1] = {"이영희", 87};',
          en: {
            message: "Quick review! ⚡",
            task: 'Initialize the second element with name "Jake" and score 87!',
            guide: 'struct Student { string name; int score; }; — in declaration order (name, score)!',
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3];',
            answer: '"Jake"',
            blanksAnswer: ['"Jake"', "87"],
            expect: 'students[1] = {"Jake", 87};',
          }
        }
      },

      // 예측: 인덱스 접근
      {
        type: "explain",
        content: {
          lines: [],
          code: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};\ncout << students[2].name << " " << students[0].score;',
          predict: {
            question: "출력 결과는?",
            options: ["김철수 95", "이영희 87", "박민준 95", "에러"],
            answer: 2,
            feedback: "students[2]는 세 번째인 박민준, students[0].score는 95! '박민준 95'"
          },
          en: {
            code: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};\ncout << students[2].name << " " << students[0].score;',
            predict: {
              question: "What's the output?",
              options: ["Emma 95", "Jake 87", "Mia 95", "Error"],
              feedback: "students[2] is the third student (Mia), students[0].score is 95!"
            }
          }
        }
      },

      // Lv.1: 점(.) 접근
      {
        type: "practice",
        content: {
          level: 1,
          task: "두 번째 학생의 점수에 접근해요!",
          guide: "배열 인덱스는 0부터 시작해요. students[1]이 두 번째!",
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};',
          template: "cout << students[1]___score << endl;",
          answer: ".",
          expect: "cout << students[1].score << endl;",
          en: {
            task: "Access the score of the second student!",
            guide: "Array index starts at 0. students[1] is the second student!",
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};'
          }
        }
      },

      // Lv.1: 인덱스 채우기
      {
        type: "practice",
        content: {
          level: 1,
          task: "세 번째 학생의 이름을 출력해요!",
          guide: "인덱스 0=첫째, 1=둘째, 2=셋째!",
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};',
          template: "cout << students[___].name;",
          answer: "2",
          expect: "cout << students[2].name;",
          en: {
            task: "Print the name of the third student!",
            guide: "Index 0=first, 1=second, 2=third!",
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};'
          }
        }
      },

      // for문 설명
      {
        type: "explain",
        content: {
          lines: [
            "for문으로 전체 배열을 한 번에 처리해요! 🔄",
            "i가 0→1→2로 바뀌면서 students[i]가 각 학생을 가리켜요."
          ],
          code: 'for (int i = 0; i < 3; i++) {\n    cout << students[i].name << ": "\n         << students[i].score << endl;\n}',
          result: "김철수: 95\n이영희: 87\n박민준: 72",
          note: "students[i].name = i번째 학생의 이름!",
          en: {
            lines: [
              "Process the entire array at once with a for loop! 🔄",
              "As i changes 0→1→2, students[i] points to each student in turn."
            ],
            note: "students[i].name = the name of the i-th student!"
          }
        }
      },

      // Lv.2: for문 빈칸 2개 (인덱스 + 멤버)
      {
        type: "practice",
        content: {
          level: 2,
          task: "for문으로 모든 학생의 이름을 출력해요!",
          guide: "배열 인덱스로 students[i].name에 접근해요!",
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};',
          template: "for (int i = 0; i < 3; i++) {\n    cout << students[___].___ << endl;\n}",
          answer: "i",
          blanksAnswer: ["i", "name"],
          expect: "for (int i = 0; i < 3; i++) {\n    cout << students[i].name << endl;\n}",
          en: {
            task: "Print all student names using a for loop!",
            guide: "Access students[i].name using the loop index!",
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};'
          }
        }
      },

      // Lv.2: for문 이름+점수 빈칸 2개
      {
        type: "practice",
        content: {
          level: 2,
          task: "이름과 점수를 같이 출력해요!",
          guide: "students[i].___ 로 각 멤버에 접근해요!",
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};',
          template: 'for (int i = 0; i < 3; i++) {\n    cout << students[i].___ << " " << students[i].___ << endl;\n}',
          answer: "name",
          blanksAnswer: ["name", "score"],
          expect: 'for (int i = 0; i < 3; i++) {\n    cout << students[i].name << " " << students[i].score << endl;\n}',
          en: {
            task: "Print both name and score together!",
            guide: "Access each member with students[i].___!",
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};'
          }
        }
      },

      // 예측: for문 결과
      {
        type: "explain",
        content: {
          lines: [],
          code: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};\nfor (int i = 0; i < 3; i++) {\n    cout << students[i].score << endl;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["95\n87\n72", "72\n87\n95", "김철수\n이영희\n박민준", "에러"],
            answer: 0,
            feedback: "i=0→95, i=1→87, i=2→72 순서대로 출력돼요!"
          },
          en: {
            code: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};\nfor (int i = 0; i < 3; i++) {\n    cout << students[i].score << endl;\n}',
            predict: {
              question: "What's the output?",
              options: ["95\n87\n72", "72\n87\n95", "Emma\nJake\nMia", "Error"],
              feedback: "i=0→95, i=1→87, i=2→72 in order!"
            }
          }
        }
      },

      // 합계 패턴 설명
      {
        type: "explain",
        content: {
          lines: [
            "패턴 1 — 합계 구하기! 📊",
            "total을 0으로 시작해서 각 학생의 score를 더해요."
          ],
          code: 'int total = 0;\nfor (int i = 0; i < 3; i++) {\n    total += students[i].score;\n}\ncout << total;   // 254',
          result: "254",
          note: "total += students[i].score — 핵심 패턴!",
          en: {
            lines: [
              "Pattern 1 — Calculate the sum! 📊",
              "Start total at 0 and add each student's score."
            ],
            note: "total += students[i].score — the key pattern!"
          }
        }
      },

      // Lv.2: 합계 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "점수 합계를 구해요!",
          guide: "total에 students[i].score를 누적해요!",
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};',
          template: "int total = 0;\nfor (int i = 0; i < 3; i++) {\n    total ___ students[i].score;\n}\ncout << total;",
          answer: "+=",
          expect: "int total = 0;\nfor (int i = 0; i < 3; i++) {\n    total += students[i].score;\n}\ncout << total;",
          en: {
            task: "Calculate the total score!",
            guide: "Accumulate students[i].score into total!",
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};'
          }
        }
      },

      // Lv.2: 합계 + 평균 빈칸 2개
      {
        type: "practice",
        content: {
          level: 2,
          task: "합계를 구하고 평균(소수점)도 계산해요!",
          guide: "int끼리 나누면 소수점이 잘려요! (double) 캐스팅으로 실수 나눗셈!",
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};',
          template: "int total = 0;\nfor (int i = 0; i < 3; i++) {\n    total += students[i].___;\n}\ncout << (___)total / 3;",
          answer: "score",
          blanksAnswer: ["score", "double"],
          expect: "int total = 0;\nfor (int i = 0; i < 3; i++) {\n    total += students[i].score;\n}\ncout << (double)total / 3;",
          en: {
            task: "Calculate total and then the (decimal) average!",
            guide: "Dividing int by int truncates the decimal! Use (double) cast for real division!",
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};'
          }
        }
      },

      // 최댓값 패턴 설명
      {
        type: "explain",
        content: {
          lines: [
            "패턴 2 — 최댓값 찾기! 🏆",
            "초기값을 students[0].score로 설정하고, i=1부터 비교해요."
          ],
          code: 'int maxScore = students[0].score;  // ← 첫 번째 값으로 시작!\nfor (int i = 1; i < 3; i++) {     // ← i=1부터!\n    if (students[i].score > maxScore)\n        maxScore = students[i].score;\n}\ncout << maxScore;  // 95',
          result: "95",
          note: "초기값을 0으로 하면? 모든 점수가 크니까 갱신이 안 돼요! students[0]으로 시작!",
          en: {
            lines: [
              "Pattern 2 — Find the maximum! 🏆",
              "Set the initial value to students[0].score and compare starting from i=1."
            ],
            note: "Starting with 0? All scores are larger so max never gets updated! Use students[0]!"
          }
        }
      },

      // Lv.2: 최댓값 빈칸 3개
      {
        type: "practice",
        content: {
          level: 2,
          task: "최댓값을 찾아요!",
          guide: "초기값은 students[0].score, i는 1부터, >로 비교해요!",
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};',
          template: "int maxScore = students[___].score;\nfor (int i = 1; i < 3; i++) {\n    if (students[i].score ___ maxScore)\n        maxScore = students[___].score;\n}\ncout << maxScore;",
          answer: "0",
          blanksAnswer: ["0", ">", "i"],
          expect: "int maxScore = students[0].score;\nfor (int i = 1; i < 3; i++) {\n    if (students[i].score > maxScore)\n        maxScore = students[i].score;\n}\ncout << maxScore;",
          en: {
            task: "Find the maximum score!",
            guide: "Start with students[0].score, loop from i=1, compare with >!",
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};'
          }
        }
      },

      // Lv.2: maxIdx 패턴 빈칸 2개
      {
        type: "practice",
        content: {
          level: 2,
          task: "1등 학생의 이름을 찾아요!",
          guide: "인덱스를 저장하면 score뿐 아니라 name도 알 수 있어요!",
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};',
          template: "int maxIdx = 0;\nfor (int i = 1; i < 3; i++) {\n    if (students[i].score > students[maxIdx].score)\n        maxIdx = ___;\n}\ncout << students[___].name;",
          answer: "i",
          blanksAnswer: ["i", "maxIdx"],
          expect: "int maxIdx = 0;\nfor (int i = 1; i < 3; i++) {\n    if (students[i].score > students[maxIdx].score)\n        maxIdx = i;\n}\ncout << students[maxIdx].name;",
          en: {
            task: "Find the name of the top student!",
            guide: "Store the index to access both score and name!",
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};'
          }
        }
      },

      // Lv.2: 조건 카운트 빈칸 2개
      {
        type: "practice",
        content: {
          level: 2,
          task: "80점 이상인 학생 수를 세요!",
          guide: "count를 0으로 시작해서 조건에 맞으면 count++ (또는 count+=1) 해요!",
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};',
          template: "int count = 0;\nfor (int i = 0; i < 3; i++) {\n    if (students[i].score ___ 80) ___;\n}\ncout << count;",
          answer: ">=",
          blanksAnswer: [">=", "count++"],
          alternateAnswers: [">=, count+=1", ">=, ++count"],
          expect: "int count = 0;\nfor (int i = 0; i < 3; i++) {\n    if (students[i].score >= 80) count++;\n}\ncout << count;",
          en: {
            task: "Count students scoring 80 or above!",
            guide: "Start count at 0, increment with count++ (or count+=1) when condition is met!",
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};'
          }
        }
      },

      // errorQuiz: 최솟값 초기값 실수
      {
        type: "errorQuiz",
        content: {
          question: "최솟값을 구하는 코드의 문제점은?",
          code: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};\n\nint minScore = 0;\nfor (int i = 0; i < 3; i++) {\n    if (students[i].score < minScore)\n        minScore = students[i].score;\n}',
          options: [
            "for문의 범위가 잘못됨",
            "초기값 0은 모든 점수보다 작아서 minScore가 절대 갱신 안 됨",
            "< 대신 > 을 써야 함"
          ],
          answer: 1,
          explanation: "초기값 0은 모든 점수(양수)보다 작아서 if 조건이 절대 참이 안 돼요! minScore = students[0].score로 실제 값으로 시작해야 해요.",
          en: {
            question: "What's wrong with this minimum-finding code?",
            code: 'struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};\n\nint minScore = 0;\nfor (int i = 0; i < 3; i++) {\n    if (students[i].score < minScore)\n        minScore = students[i].score;\n}',
            options: [
              "The loop range is wrong",
              "Initial value 0 is less than all scores, so minScore is never updated",
              "Should use > instead of <"
            ],
            explanation: "0 is smaller than all scores, so the if condition is never true! Start with students[0].score instead."
          }
        }
      },

      // Lv.3 전체 코드: 패턴 스스로 선택 — 60점 이상 학생 수
      {
        type: "practice",
        content: {
          level: 3,
          task: "60점 이상인 학생의 수를 세서 출력해요.",
          guide: "어떤 패턴을 써야 할까? count = 0으로 시작해서 조건 맞으면 count++. for문으로 students[i].score를 돌면서 비교.",
          hint: "int count = 0; for문 돌면서 students[i].score >= 60이면 count++; cout으로 출력",
          starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    Student students[3] = {\n        {"김철수", 95},\n        {"이영희", 87},\n        {"박민준", 72}\n    };\n    \n    // 여기에 코드 작성\n    \n    return 0;\n}',
          template: null,
          answer: '#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    Student students[3] = {\n        {"김철수", 95},\n        {"이영희", 87},\n        {"박민준", 72}\n    };\n    int count = 0;\n    for (int i = 0; i < 3; i++) {\n        if (students[i].score >= 60) count++;\n    }\n    cout << count;\n    return 0;\n}',
          alternateAnswers: [
            '#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    Student students[3] = {\n        {"김철수", 95},\n        {"이영희", 87},\n        {"박민준", 72}\n    };\n    int count = 0;\n    for (auto& s : students) {\n        if (s.score >= 60) count++;\n    }\n    cout << count;\n    return 0;\n}'
          ],
          expect: "3",
          en: {
            task: "Count and print how many students scored 60 or above.",
            guide: "Which pattern should you pick? Start count = 0, then count++ when condition matches. Loop with for over students[i].score.",
            hint: "int count = 0; loop students, if students[i].score >= 60 then count++; print with cout",
            starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    Student students[3] = {\n        {"Emma", 95},\n        {"Jake", 87},\n        {"Mia", 72}\n    };\n    \n    // Write your code here\n    \n    return 0;\n}'
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "struct 배열 패턴 마스터!",
          emoji: "🏆"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "struct 배열 & 패턴",
          learned: [
            "Student students[3] = { {...}, {...}, {...} }",
            "students[i].name — 인덱스 + 점(.) 연산자",
            "for문으로 전체 순회: students[i].score",
            "패턴 1: total += students[i].score (합계)",
            "패턴 2: maxScore = students[0].score → i=1부터 비교",
            "패턴 3: maxIdx 저장 → 1등 이름 찾기",
            "패턴 4: 조건 count++ (조건 카운트)"
          ],
          canDo: "struct 배열을 선언하고 for문으로 합계/최댓값/카운트를 구할 수 있어요!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 3: vector<Student> & cin ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "vector<Student> & cin",
          desc: "N명을 입력받아 vector<Student>에 저장해요!",
          en: { title: "vector<Student> & cin", desc: "Read N students with cin and store them in vector<Student>!" }
        }
      },

      // vector vs 배열 설명
      {
        type: "explain",
        content: {
          lines: [
            "배열은 크기를 미리 정해야 해요. N명을 입력받을 때는 vector!",
            "vector<Student>는 배열과 똑같이 students[i].name으로 접근해요."
          ],
          code: '// 배열 — 크기 고정\nStudent students[100];          // 최대 100명\n\n// vector — 크기 동적!\nvector<Student> students(n);    // n명에 딱 맞게\n\n// 접근 방법은 완전히 동일!\ncout << students[0].name;',
          result: "// 배열과 vector, 접근 방법이 같아요!",
          note: "USACO에서는 N을 입력받으니까 vector<Student>가 훨씬 자주 나와요!",
          en: {
            lines: [
              "Arrays require a fixed size upfront. For reading N students, use vector!",
              "vector<Student> accesses members exactly like an array: students[i].name."
            ],
            note: "In USACO, N is given as input, so vector<Student> appears far more often!"
          }
        }
      },

      // Lv.1: vector 선언 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "n명짜리 Student 벡터를 선언해요!",
          guide: "vector<타입> 이름(크기) 형태예요!",
          context: "struct Student {\n    string name;\n    int score;\n};\n\nint n;\ncin >> n;",
          template: "vector<___> students(n);",
          answer: "Student",
          expect: "vector<Student> students(n);",
          en: {
            task: "Declare a vector of n Students!",
            guide: "Use the form: vector<type> name(size)!",
            context: "struct Student {\n    string name;\n    int score;\n};\n\nint n;\ncin >> n;"
          }
        }
      },

      // Lv.2: cin으로 채우기 빈칸 2개
      {
        type: "practice",
        content: {
          level: 2,
          task: "cin으로 vector를 채워요!",
          guide: "배열과 똑같이 students[i].name, students[i].score로 접근해요!",
          context: "struct Student {\n    string name;\n    int score;\n};\n\nint n;\ncin >> n;\nvector<Student> students(n);",
          template: "for (int i = 0; i < n; i++) {\n    cin >> students[___].name >> students[___].score;\n}",
          answer: "i",
          blanksAnswer: ["i", "i"],
          expect: "for (int i = 0; i < n; i++) {\n    cin >> students[i].name >> students[i].score;\n}",
          en: {
            task: "Fill the vector using cin!",
            guide: "Access just like an array: students[i].name, students[i].score!",
            context: "struct Student {\n    string name;\n    int score;\n};\n\nint n;\ncin >> n;\nvector<Student> students(n);"
          }
        }
      },

      // Lv.2: 전체 선언 + cin 패턴 빈칸 3개
      {
        type: "practice",
        content: {
          level: 2,
          task: "n명의 Student를 입력받는 전체 흐름을 완성해요!",
          guide: "① vector<___> — Student 타입을 담는 벡터\n② students(___) — 크기는 입력받은 n\n③ students[i].___ — 이름(name)부터 입력",
          context: "struct Student {\n    string name;\n    int score;\n};",
          template: "int n;\ncin >> n;\nvector<___> students(___);\nfor (int i = 0; i < n; i++) {\n    cin >> students[i].___ >> students[i].score;\n}",
          answer: "Student",
          blanksAnswer: ["Student", "n", "name"],
          expect: "int n;\ncin >> n;\nvector<Student> students(n);\nfor (int i = 0; i < n; i++) {\n    cin >> students[i].name >> students[i].score;\n}",
          en: {
            task: "Complete the full flow that reads n Students via cin!",
            guide: "① vector<___> — vector type: Student\n② students(___) — size = n (the count we just read)\n③ students[i].___ — read name first",
            context: "struct Student {\n    string name;\n    int score;\n};"
          }
        }
      },

      // auto& 순회 설명
      {
        type: "explain",
        content: {
          lines: [
            "vector는 auto& 로 순회하면 더 편해요! 🚀",
            "auto& s는 각 Student를 s라는 이름으로 받아요."
          ],
          code: 'for (auto& s : students) {\n    cout << s.name << " " << s.score << "\\n";\n}',
          result: "// 모든 학생을 순서대로 출력!",
          note: "auto& = 자동 타입 추론 + 참조 — 복사 없이 빠르게!",
          en: {
            lines: [
              "Iterating over a vector is even easier with auto&! 🚀",
              "auto& s receives each Student under the alias s."
            ],
            note: "auto& = auto type deduction + reference — fast, no copying!"
          }
        }
      },

      // 예측: auto& 순회 결과
      {
        type: "explain",
        content: {
          lines: [],
          code: 'struct Student {\n    string name;\n    int score;\n};\n\nvector<Student> students = {\n    {"Alice", 90},\n    {"Bob", 80}\n};\nfor (auto& s : students) {\n    cout << s.name << " " << s.score << "\\n";\n}',
          predict: {
            question: "출력 결과는?",
            options: ["Alice 90\nBob 80", "Alice\nBob", "90\n80", "에러"],
            answer: 0,
            feedback: "auto& s로 각 Student를 받아서 s.name과 s.score를 출력해요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["Alice 90\nBob 80", "Alice\nBob", "90\n80", "Error"],
              feedback: "auto& s receives each Student, then prints s.name and s.score!"
            }
          }
        }
      },

      // Lv.2: auto& 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "auto& 로 모든 학생을 출력해요!",
          guide: "for (auto& s : students) — s가 각 Student를 가리켜요!",
          context: 'struct Student {\n    string name;\n    int score;\n};\n\nvector<Student> students = {\n    {"김철수", 95},\n    {"이영희", 87},\n    {"박민준", 72}\n};',
          template: 'for (___ s : students) {\n    cout << s.name << " " << s.score << "\\n";\n}',
          answer: "auto&",
          expect: 'for (auto& s : students) {\n    cout << s.name << " " << s.score << "\\n";\n}',
          en: {
            task: "Print all students using auto&!",
            guide: "for (auto& s : students) — s points to each Student!",
            context: 'struct Student {\n    string name;\n    int score;\n};\n\nvector<Student> students = {\n    {"Emma", 95},\n    {"Jake", 87},\n    {"Mia", 72}\n};'
          }
        }
      },

      // Lv.2: auto& 합계 빈칸 2개
      {
        type: "practice",
        content: {
          level: 2,
          task: "auto&로 순회해서 합계와 평균(소수점)을 구해요!",
          guide: "int끼리 나누면 소수점이 잘려요! (double) 캐스팅으로 실수 나눗셈!",
          context: "struct Student {\n    string name;\n    int score;\n};\n\nint n = students.size();",
          template: "int total = 0;\nfor (auto& s : students) {\n    total += s.___;\n}\ncout << (___)total / n;",
          answer: "score",
          blanksAnswer: ["score", "double"],
          expect: "int total = 0;\nfor (auto& s : students) {\n    total += s.score;\n}\ncout << (double)total / n;",
          en: {
            task: "Use auto& to calculate sum and (decimal) average!",
            guide: "Dividing int by int truncates the decimal! Use (double) cast for real division!",
            context: "struct Student {\n    string name;\n    int score;\n};\n\nint n = students.size();"
          }
        }
      },

      // 인터리빙: 배열 패턴 복습 (Ch2 maxIdx를 vector로)
      {
        type: "interleaving",
        content: {
          message: "앞에서 배운 maxIdx 패턴, 이번엔 vector로! ⚡",
          task: "vector<Student>에서 1등 학생 인덱스를 찾아요!",
          context: "struct Student {\n    string name;\n    int score;\n};\n\nvector<Student> students(n);  // n명의 학생이 이미 채워져 있음",
          template: "int maxIdx = 0;\nfor (int i = 1; i < n; i++) {\n    if (students[i].score > students[___].score)\n        maxIdx = ___;\n}\ncout << students[maxIdx].name;",
          answer: "maxIdx",
          blanksAnswer: ["maxIdx", "i"],
          expect: "int maxIdx = 0;\nfor (int i = 1; i < n; i++) {\n    if (students[i].score > students[maxIdx].score)\n        maxIdx = i;\n}\ncout << students[maxIdx].name;",
          en: {
            message: "The same maxIdx pattern, now with vector! ⚡",
            task: "Find the index of the top student in vector<Student>!",
            context: "struct Student {\n    string name;\n    int score;\n};\n\nvector<Student> students(n);  // assume n students are already filled"
          }
        }
      },

      // errorQuiz: vector 타입 실수 (Lv.3 전에 개념 확인)
      {
        type: "errorQuiz",
        content: {
          question: "이 선언의 문제점은?",
          code: 'struct Student {\n    string name;\n    int score;\n};\n\nvector<int> students(n);\ncin >> students[0].name >> students[0].score;',
          options: [
            "vector 크기를 n으로 할 수 없어서",
            "vector<int>라서 .name, .score 같은 멤버가 없어서",
            "cin으로 vector에 입력받을 수 없어서"
          ],
          answer: 1,
          explanation: "vector<int>는 정수 벡터라 .name이나 .score 멤버가 없어요! Student 구조체를 담으려면 vector<Student>로 선언해야 해요.",
          en: {
            question: "What's wrong with this declaration?",
            options: [
              "Can't use n as vector size",
              "vector<int> has no .name or .score members",
              "Can't use cin to fill a vector"
            ],
            explanation: "vector<int> is a vector of integers — no .name or .score! To store Student structs, use vector<Student>."
          }
        }
      },

      // Lv.3: 전체 패턴 조립 빈칸 5개
      {
        type: "practice",
        content: {
          level: 3,
          task: "전체 패턴: n명 입력받아 평균 이상인 학생 수 출력!",
          guide: "① vector 선언 ② cin으로 채우기 ③ 합계 구하기 ④ 조건 카운트",
          context: "struct Student {\n    string name;\n    int score;\n};",
          template: "int n;\ncin >> n;\nvector<___> students(___);\nint total = 0;\nfor (int i = 0; i < n; i++) {\n    cin >> students[i].___ >> students[i].score;\n    total += students[___].score;\n}\nint avg = total / n;\nint count = 0;\nfor (auto& s : students) {\n    if (s.___ >= avg) count++;\n}\ncout << count;",
          answer: "Student",
          blanksAnswer: ["Student", "n", "name", "i", "score"],
          expect: "int n;\ncin >> n;\nvector<Student> students(n);\nint total = 0;\nfor (int i = 0; i < n; i++) {\n    cin >> students[i].name >> students[i].score;\n    total += students[i].score;\n}\nint avg = total / n;\nint count = 0;\nfor (auto& s : students) {\n    if (s.score >= avg) count++;\n}\ncout << count;",
          en: {
            task: "Complete the full pattern: read n students, output count above average!",
            guide: "① Declare vector ② Fill with cin ③ Calculate sum ④ Count condition",
            context: "struct Student {\n    string name;\n    int score;\n};"
          }
        }
      },

      // Lv.3 전체 코드: 리팩토링 — 일반 for → auto& range-for
      {
        type: "practice",
        content: {
          level: 3,
          task: "아래 스켈레톤 코드에 있는 원본 for문을 auto& range-for로 바꿔주세요. 출력 결과는 똑같이 170이 나와야 해요.",
          guide: "인덱스 i가 필요 없을 때는 auto&가 더 깔끔해요. s가 각 Student를 참조하니까 s.score로 바로 접근!",
          hint: "for (auto& s : students) { total += s.score; }",
          starterCode: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    vector<Student> students = {\n        {"Alice", 90},\n        {"Bob", 80}\n    };\n    \n    // 🔧 아래 for문을 auto& range-for로 바꿔주세요\n    int total = 0;\n    for (int i = 0; i < students.size(); i++) {\n        total += students[i].score;\n    }\n    cout << total;\n    \n    return 0;\n}',
          template: null,
          answer: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    vector<Student> students = {\n        {"Alice", 90},\n        {"Bob", 80}\n    };\n    int total = 0;\n    for (auto& s : students) {\n        total += s.score;\n    }\n    cout << total;\n    return 0;\n}',
          alternateAnswers: [
            '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    vector<Student> students = {\n        {"Alice", 90},\n        {"Bob", 80}\n    };\n    int total = 0;\n    for (const auto& s : students) {\n        total += s.score;\n    }\n    cout << total;\n    return 0;\n}'
          ],
          expect: "170",
          en: {
            task: "In the skeleton code below, rewrite the original for-loop using auto& range-for. The output should still be 170.",
            guide: "When you don't need index i, auto& is cleaner. s refers to each Student, so use s.score directly!",
            hint: "for (auto& s : students) { total += s.score; }",
            starterCode: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    vector<Student> students = {\n        {"Alice", 90},\n        {"Bob", 80}\n    };\n    \n    // 🔧 Rewrite the for-loop below using auto& range-for\n    int total = 0;\n    for (int i = 0; i < students.size(); i++) {\n        total += students[i].score;\n    }\n    cout << total;\n    \n    return 0;\n}'
          }
        }
      },

      // Lv.3 전체 코드: 실전 종합 — 평균 이상 학생 이름 출력
      {
        type: "practice",
        content: {
          level: 3,
          task: "N명 입력받아 평균 이상인 학생들의 이름을 한 줄씩 출력해요.",
          guide: "① vector<Student>(n) 선언  ② cin으로 채우기  ③ 평균 계산 (double 캐스팅 주의)  ④ 조건에 맞는 이름 출력",
          hint: "평균은 double로 계산: (double)total / n. 그 다음 auto& s로 순회하면서 s.score >= avg이면 s.name 출력",
          sampleInput: "3\nAlice 90\nBob 70\nMia 80",
          starterCode: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    // 여기에 코드 작성\n    \n    return 0;\n}",
          template: null,
          answer: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Student> students(n);\n    int total = 0;\n    for (int i = 0; i < n; i++) {\n        cin >> students[i].name >> students[i].score;\n        total += students[i].score;\n    }\n    double avg = (double)total / n;\n    for (auto& s : students) {\n        if (s.score >= avg) cout << s.name << \"\\n\";\n    }\n    return 0;\n}",
          alternateAnswers: [
            "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Student> students(n);\n    int total = 0;\n    for (int i = 0; i < n; i++) {\n        cin >> students[i].name >> students[i].score;\n        total += students[i].score;\n    }\n    double avg = total / (double)n;\n    for (int i = 0; i < n; i++) {\n        if (students[i].score >= avg) cout << students[i].name << endl;\n    }\n    return 0;\n}"
          ],
          expect: "Alice\nMia",
          en: {
            task: "Read N students and print the names of those who scored at or above the average, one per line.",
            guide: "① Declare vector<Student>(n)  ② Fill with cin  ③ Calculate average (watch the double cast)  ④ Print names above average",
            hint: "Use double for average: (double)total / n. Then loop with auto& s, if s.score >= avg print s.name",
            sampleInput: "3\nAlice 90\nBob 70\nMia 80",
            starterCode: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n};\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "vector<Student> 완전 정복!",
          emoji: "🚀"
        }
      },

      // 챕터 3 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "vector<Student> & cin",
          learned: [
            "vector<Student> students(n) — n명에 딱 맞는 크기",
            "cin >> students[i].name >> students[i].score — 입력 채우기",
            "for (auto& s : students) — 간편한 순회",
            "s.score, s.name — auto& 순회에서 멤버 접근",
            "배열 패턴(합계/최댓값/카운트)이 vector에도 그대로 적용!"
          ],
          canDo: "N명을 cin으로 입력받아 vector<Student>에 저장하고 다양한 패턴을 적용할 수 있어요!",
          emoji: "🚀"
        }
      },

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
