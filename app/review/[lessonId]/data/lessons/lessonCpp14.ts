import { LessonData } from '../types';

export const lessonCpp14: LessonData = {
    id: "cpp-14",
    title: "구조체 & 클래스",
    description: "구조체와 클래스를 복습해요!",
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
          code: '#include <iostream>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int age;\n    int score;\n};\n\nint main() {\n    Student s;\n    s.name = "주현";\n    s.age = 14;\n    s.score = 95;\n\n    cout << s.name << " " << s.age << "세" << endl;\n    return 0;\n}',
          result: '주현 14세',
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
          explanation: "struct는 관련된 변수(멤버)를 하나의 타입으로 묶어주는 거예요! 파이썬 딕셔너리와 비슷해요."
        }
      },

      // 멤버 접근 예측
      {
        type: "explain",
        content: {
          lines: [
            "점(.)으로 멤버에 접근해요!",
            "파이썬의 object.attribute와 같은 방식이에요."
          ],
          code: 'struct Point {\n    int x;\n    int y;\n};\n\nPoint p;\np.x = 3;\np.y = 7;\ncout << p.x + p.y << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["3", "7", "10", "에러"],
            answer: 2,
            feedback: "p.x = 3, p.y = 7이니까 3 + 7 = 10이에요!"
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
          expect: "struct Student {\n    string name;\n    int age;\n};"
        }
      },

      // ===== Lv.1: 멤버 접근 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "학생의 이름에 접근해요!",
          guide: "점(.)으로 멤버에 접근해요!",
          template: 'Student s;\ns___name = "주현";',
          answer: ".",
          expect: 'Student s;\ns.name = "주현";'
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
          explanation: "struct 선언 끝에는 반드시 세미콜론(;)이 있어야 해요! struct Student { ... }; 이렇게요."
        }
      },

      // ===== Lv.2: 중괄호 초기화 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "Point를 x=5, y=3으로 초기화해요!",
          guide: "중괄호 {}에 순서대로 값을 넣어요!",
          template: "Point p = {___, ___};",
          answer: "5",
          blanksAnswer: ["5", "3"],
          expect: "Point p = {5, 3};"
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

      // ==================== CHAPTER 2: class ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "클래스 (class)",
          desc: "public/private, 메서드, 생성자를 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! struct 기억나요?",
          task: "Point 구조체를 x=1, y=2로 초기화해요!",
          template: "Point p = {___, ___};",
          answer: "1",
          blanksAnswer: ["1", "2"],
          expect: "Point p = {1, 2};"
        }
      },

      // class 설명
      {
        type: "explain",
        content: {
          lines: [
            "class는 struct와 비슷하지만, 기본이 private이에요! 🔐",
            "private = 외부에서 접근 못함, public = 외부에서 접근 가능",
            "파이썬 클래스와 아주 비슷해요!"
          ],
          code: 'class Dog {\npublic:           // 외부에서 접근 가능\n    string name;\n\n    void bark() {\n        cout << name << ": 멍멍!" << endl;\n    }\n\nprivate:          // 외부에서 접근 불가\n    int secretAge;\n};',
          note: "public: 누구나 접근 | private: 클래스 안에서만 접근"
        }
      },

      // public/private 퀴즈
      {
        type: "quiz",
        content: {
          question: "class에서 private 멤버는?",
          options: [
            "어디서든 접근 가능하다",
            "클래스 내부에서만 접근 가능하다",
            "상속받은 클래스만 접근 가능하다",
            "main 함수에서만 접근 가능하다"
          ],
          answer: 1,
          explanation: "private 멤버는 클래스 내부(메서드)에서만 접근할 수 있어요! 외부에서 직접 접근하면 에러!"
        }
      },

      // 메서드 예측
      {
        type: "explain",
        content: {
          lines: [
            "클래스 안의 함수를 메서드라고 해요! 🛠️",
            "파이썬의 def와 같아요."
          ],
          code: 'class Counter {\npublic:\n    int count = 0;\n\n    void increment() {\n        count++;\n    }\n};\n\nCounter c;\nc.increment();\nc.increment();\nc.increment();\ncout << c.count << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["0", "1", "3", "에러"],
            answer: 2,
            feedback: "increment()를 3번 호출했으니 count는 0 → 1 → 2 → 3이에요!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: 'class Dog {\n    string name;  // 기본 private!\n};\n\nDog d;\nd.name = "코코";',
          options: [
            "Dog 클래스 선언이 잘못돼서",
            "name이 private이라 외부에서 접근 못 해서",
            "string 타입을 못 써서"
          ],
          answer: 1,
          explanation: "class는 기본이 private이에요! name을 쓰려면 public: 아래에 넣어야 해요."
        }
      },

      // 생성자 설명
      {
        type: "explain",
        content: {
          lines: [
            "생성자(constructor)는 객체를 만들 때 자동 실행되는 함수예요! 🏗️",
            "파이썬의 __init__과 같아요!",
            "클래스 이름과 같은 이름으로 만들어요."
          ],
          code: 'class Dog {\npublic:\n    string name;\n    int age;\n\n    // 생성자: 클래스 이름과 같음!\n    Dog(string n, int a) {\n        name = n;\n        age = a;\n    }\n\n    void introduce() {\n        cout << name << " " << age << "살" << endl;\n    }\n};\n\nDog d("코코", 3);  // 생성자 호출!\nd.introduce();',
          result: "코코 3살",
          note: "Dog(string n, int a) = 생성자 (파이썬의 __init__)"
        }
      },

      // ===== Lv.1: public 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "외부에서 접근 가능하게 만들어요!",
          guide: "외부 접근을 허용하는 키워드는?",
          template: "class Cat {\n___:\n    string name;\n};",
          answer: "public",
          expect: "class Cat {\npublic:\n    string name;\n};"
        }
      },

      // ===== Lv.2: 생성자 빈칸 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "Dog 클래스의 생성자를 만들어요!",
          guide: "생성자 이름은 클래스 이름과 같아요!",
          template: "class Dog {\npublic:\n    string name;\n    ___(string n) {\n        name = n;\n    }\n};",
          answer: "Dog",
          expect: "class Dog {\npublic:\n    string name;\n    Dog(string n) {\n        name = n;\n    }\n};"
        }
      },

      // struct vs class 퀴즈
      {
        type: "quiz",
        content: {
          question: "struct와 class의 가장 큰 차이는?",
          options: [
            "struct는 멤버를 가질 수 없다",
            "struct는 기본 public, class는 기본 private",
            "class는 함수를 가질 수 없다",
            "struct는 C++에서 사용 불가"
          ],
          answer: 1,
          explanation: "struct는 기본 접근 제한이 public, class는 private이에요! 그 외에는 거의 같아요."
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "클래스 개념 마스터!",
          emoji: "🔐"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "클래스 (class)",
          learned: [
            "class = struct + 접근 제한 (기본 private)",
            "public: 외부 접근 가능 | private: 내부만",
            "메서드 = 클래스 안의 함수",
            "생성자 = 클래스 이름과 같은 함수 (__init__)",
            "struct: 기본 public | class: 기본 private"
          ],
          canDo: "class를 만들고 public/private, 생성자를 쓸 수 있어요!",
          emoji: "🔐"
        }
      },

      // ==================== CHAPTER 3: 종합 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "종합 프로젝트",
          desc: "Rectangle 클래스를 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 생성자 기억나요?",
          task: "Cat 클래스의 생성자 이름을 써봐요!",
          template: "class Cat {\npublic:\n    ___(string n) {\n        name = n;\n    }\n};",
          answer: "Cat",
          expect: "class Cat {\npublic:\n    Cat(string n) {\n        name = n;\n    }\n};"
        }
      },

      // 프로젝트 도입 예측
      {
        type: "explain",
        content: {
          lines: [
            "Rectangle 클래스를 만들 거예요! 📐",
            "가로(width), 세로(height), 넓이 계산 메서드!"
          ],
          code: 'class Rectangle {\npublic:\n    int width;\n    int height;\n\n    Rectangle(int w, int h) {\n        width = w;\n        height = h;\n    }\n\n    int area() {\n        return width * height;\n    }\n};\n\nRectangle r(4, 5);\ncout << r.area() << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["9", "20", "45", "에러"],
            answer: 1,
            feedback: "width=4, height=5이니까 area() = 4 * 5 = 20이에요!"
          }
        }
      },

      // 프로젝트 Step 1
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "Rectangle 클래스의 시작과 멤버 변수를 써봐요!",
          target: "class Rectangle {\npublic:\n    int width;\n    int height;",
          hint: "class 이름 { public: 멤버변수들 }",
          done: [],
          answer: "class Rectangle {\npublic:\n    int width;\n    int height;"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "생성자를 만들어요! (width, height 초기화)",
          target: "    Rectangle(int w, int h) {\n        width = w;\n        height = h;\n    }",
          hint: "Rectangle(int w, int h) { width = w; height = h; }",
          done: ["class Rectangle {\npublic:\n    int width;\n    int height;"],
          answer: "    Rectangle(int w, int h) {\n        width = w;\n        height = h;\n    }"
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "넓이를 계산하는 area() 메서드를 만들어요!",
          target: "    int area() {\n        return width * height;\n    }",
          hint: "int area() { return width * height; }",
          done: ["class Rectangle {\npublic:\n    int width;\n    int height;", "    Rectangle(int w, int h) {\n        width = w;\n        height = h;\n    }"],
          answer: "    int area() {\n        return width * height;\n    }"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "구조체 & 클래스 완전 정복!",
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
