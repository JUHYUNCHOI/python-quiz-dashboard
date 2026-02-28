import { LessonData } from '../types';

export const lessonCpp8: LessonData = {
    id: "cpp-8",
    title: "함수 (Functions)",
    description: "함수 선언, 매개변수, 오버로딩 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 함수 선언 & 호출 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "함수 선언 & 호출",
          desc: "C++ 함수를 만들고 사용하는 법을 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "파이썬에서 def로 함수를 만들었죠? 🛠️",
            "C++에서는 def 대신 반환 타입을 써요!",
            "int, double, string 같은 타입을 함수 앞에 적어요."
          ],
          code: '// 파이썬\n// def add(a, b):\n//     return a + b\n\n// C++\n#include <iostream>\nusing namespace std;\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    cout << add(3, 5) << endl;\n    return 0;\n}',
          result: "8",
          note: "파이썬: def 함수명(매개변수): → C++: 반환타입 함수명(타입 매개변수) {}"
        }
      },

      // void 설명
      {
        type: "explain",
        content: {
          lines: [
            "값을 돌려주지 않는 함수는 void를 써요! 🕳️",
            "파이썬에서 return이 없는 함수와 같아요.",
            "void = '아무것도 반환 안 함'이라는 뜻!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nvoid sayHello() {\n    cout << "안녕하세요!" << endl;\n}\n\nint main() {\n    sayHello();\n    return 0;\n}',
          result: "안녕하세요!",
          note: "void = 반환값 없음! return 생략 가능!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "함수는 main() 위에 정의해야 해요!",
            "아래에 정의하면 컴파일러가 못 찾아요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint square(int x) {\n    return x * x;\n}\n\nint main() {\n    cout << square(4) << endl;\n    return 0;\n}',
          predict: {
            question: "square(4)의 결과는?",
            options: ["4", "8", "16", "에러"],
            answer: 2,
            feedback: "4 * 4 = 16! square 함수는 x의 제곱을 반환해요!"
          }
        }
      },

      // Lv.1: 반환 타입 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "정수를 반환하는 함수의 반환 타입을 써봐요!",
          guide: "정수 = int!",
          template: "___ multiply(int a, int b) {\n    return a * b;\n}",
          answer: "int",
          expect: "int multiply(int a, int b) {\n    return a * b;\n}"
        }
      },

      // Lv.1: void 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "반환값이 없는 함수의 타입을 써봐요!",
          guide: "반환값 없음 = void!",
          template: '___ greet() {\n    cout << "Hi!" << endl;\n}',
          answer: "void",
          expect: 'void greet() {\n    cout << "Hi!" << endl;\n}'
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "C++ 함수에서 파이썬의 def에 해당하는 것은?",
          options: [
            "func 키워드",
            "def 키워드",
            "반환 타입 (int, void 등)",
            "return 키워드"
          ],
          answer: 2,
          explanation: "C++에서는 def 대신 반환 타입을 써요! int add(...)는 정수를 반환하는 함수, void hello(...)는 반환값 없는 함수!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << double(3) << endl;\n    return 0;\n}\n\nint double(int x) {\n    return x * 2;\n}',
          options: [
            "double이라는 이름을 쓸 수 없어서",
            "함수가 main() 아래에 정의되어 있어서",
            "return x * 2가 잘못돼서"
          ],
          answer: 1,
          explanation: "C++에서 함수는 호출하기 전에 (main 위에) 정의하거나, 프로토타입을 선언해야 해요!"
        }
      },

      // Lv.2: 매개변수 타입 채우기
      {
        type: "practice",
        content: {
          level: 2,
          task: "매개변수에 타입을 넣어 함수를 완성해요!",
          guide: "C++은 매개변수에 타입을 꼭 써야 해요!",
          template: "int add(___ a, ___ b) {\n    return a + b;\n}",
          answer: "int",
          blanksAnswer: ["int", "int"],
          expect: "int add(int a, int b) {\n    return a + b;\n}"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "함수 기초 완벽!",
          emoji: "🛠️"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "함수 선언 & 호출",
          learned: [
            "반환타입 함수명(타입 매개변수) { 코드 }",
            "int → 정수 반환, double → 실수 반환",
            "void → 반환값 없음 (return 생략 가능)",
            "함수는 main() 위에 정의!",
            "파이썬 def → C++ 반환타입으로 대체"
          ],
          canDo: "C++ 함수를 정의하고 호출할 수 있어요!",
          emoji: "🛠️"
        }
      },

      // ==================== CHAPTER 2: 오버로딩 & 기본값 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "오버로딩 & 기본값",
          desc: "같은 이름의 함수를 여러 개 만드는 법을 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 함수 기초 기억나요?",
          task: "반환값이 없는 함수의 반환 타입은?",
          template: '___ sayHi() {\n    cout << "Hi!" << endl;\n}',
          answer: "void",
          expect: 'void sayHi() {\n    cout << "Hi!" << endl;\n}'
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "C++에서는 같은 이름의 함수를 여러 개 만들 수 있어요! 🎭",
            "매개변수의 타입이나 개수가 다르면 OK!",
            "이걸 함수 오버로딩이라고 해요. 파이썬에는 없는 기능!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint add(int a, int b) {\n    return a + b;\n}\n\ndouble add(double a, double b) {\n    return a + b;\n}\n\nint main() {\n    cout << add(3, 5) << endl;\n    cout << add(1.5, 2.3) << endl;\n    return 0;\n}',
          result: "8\n3.8",
          note: "같은 이름 add인데 매개변수 타입이 다르면 OK!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "매개변수 개수가 달라도 오버로딩이 돼요!",
            "컴파일러가 알아서 맞는 함수를 골라줘요."
          ],
          code: 'void greet() {\n    cout << "Hello!" << endl;\n}\n\nvoid greet(string name) {\n    cout << "Hello, " << name << "!" << endl;\n}\n\n// main에서:\ngreet();\ngreet("주현");',
          predict: {
            question: "출력 결과는?",
            options: ["Hello!\\nHello!", "Hello!\\nHello, 주현!", "에러 (같은 이름이라)"],
            answer: 1,
            feedback: "매개변수 개수가 다르니 오버로딩 OK! greet()는 첫 번째, greet(\"주현\")은 두 번째 함수가 호출돼요!"
          }
        }
      },

      // 기본값 매개변수
      {
        type: "explain",
        content: {
          lines: [
            "매개변수에 기본값을 줄 수 있어요! 📌",
            "파이썬의 def func(x=10): 과 같은 개념!",
            "호출할 때 값을 안 넣으면 기본값이 사용돼요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nvoid printLine(int count = 10) {\n    for (int i = 0; i < count; i++) {\n        cout << "-";\n    }\n    cout << endl;\n}\n\nint main() {\n    printLine();     // 기본값 10 사용\n    printLine(5);    // 5 사용\n    return 0;\n}',
          result: "----------\n-----",
          note: "기본값은 오른쪽 매개변수부터 넣어야 해요!"
        }
      },

      // 오버로딩 퀴즈
      {
        type: "quiz",
        content: {
          question: "함수 오버로딩이 가능한 경우는?",
          options: [
            "함수 이름이 다를 때",
            "매개변수의 타입이나 개수가 다를 때",
            "반환 타입만 다를 때",
            "함수 안의 코드가 다를 때"
          ],
          answer: 1,
          explanation: "오버로딩은 매개변수의 타입이나 개수가 달라야 해요! 반환 타입만 다른 건 안 돼요!"
        }
      },

      // Lv.1: 기본값 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "매개변수에 기본값 5를 넣어봐요!",
          guide: "타입 이름 = 기본값 형태!",
          template: "void repeat(int times ___) {",
          answer: "= 5",
          alternateAnswers: ["=5"],
          expect: "void repeat(int times = 5) {"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 오버로딩이 에러인 이유는?",
          code: 'int calc(int x) {\n    return x * 2;\n}\n\ndouble calc(int x) {\n    return x * 2.0;\n}',
          options: [
            "함수 이름이 같아서",
            "매개변수가 같고 반환 타입만 달라서",
            "double을 쓸 수 없어서"
          ],
          answer: 1,
          explanation: "오버로딩은 매개변수가 달라야 해요! 반환 타입만 다른 건 컴파일러가 구분할 수 없어서 에러!"
        }
      },

      // Lv.2: 오버로딩 함수 작성
      {
        type: "practice",
        content: {
          level: 2,
          task: "double 타입 매개변수를 받는 오버로딩 함수를 완성해요!",
          guide: "int add(int, int)가 있으니 double 버전을 만들어요!",
          template: "___ add(___ a, ___ b) {\n    return a + b;\n}",
          answer: "double",
          blanksAnswer: ["double", "double", "double"],
          expect: "double add(double a, double b) {\n    return a + b;\n}"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "오버로딩 & 기본값 마스터!",
          emoji: "🎭"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "오버로딩 & 기본값",
          learned: [
            "함수 오버로딩: 같은 이름, 다른 매개변수!",
            "매개변수의 타입 또는 개수가 달라야 OK",
            "반환 타입만 다른 건 오버로딩 불가!",
            "기본값: void func(int x = 10)",
            "기본값은 오른쪽 매개변수부터 넣어야 함"
          ],
          canDo: "함수 오버로딩과 기본값 매개변수를 활용할 수 있어요!",
          emoji: "🎭"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 — 미니 수학 라이브러리 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 미니 수학 라이브러리",
          desc: "add, multiply, power 함수를 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 함수 오버로딩 기억나요?",
          task: "오버로딩이 가능하려면 뭐가 달라야 하나요? (타입이나 ___)",
          template: "// 오버로딩: 매개변수의 타입이나 ___가 달라야 함",
          answer: "개수",
          alternateAnswers: ["갯수", "수"],
          expect: "// 오버로딩: 매개변수의 타입이나 개수가 달라야 함"
        }
      },

      // 프로젝트 설명
      {
        type: "explain",
        content: {
          lines: [
            "미니 수학 라이브러리를 만들어봐요! 📐",
            "add(덧셈), multiply(곱셈), power(거듭제곱) 함수!",
            "오버로딩으로 int와 double 버전을 모두 만들어요."
          ],
          code: '// 완성된 모습\n// add(3, 5)      → 8\n// multiply(4, 3) → 12\n// power(2, 3)    → 8  (2의 3승)',
          note: "3개의 수학 함수를 만들어요!"
        }
      },

      // 프로젝트 Step 1
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "add 함수를 만들어봐요! (정수 2개를 더해서 반환)",
          target: "int add(int a, int b) {\n    return a + b;\n}",
          hint: "int add(int a, int b) { return a + b; }",
          done: [],
          answer: "int add(int a, int b) {\n    return a + b;\n}"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "multiply 함수를 만들어봐요! (정수 2개를 곱해서 반환)",
          target: "int multiply(int a, int b) {\n    return a * b;\n}",
          hint: "int multiply(int a, int b) { return a * b; }",
          done: ["int add(int a, int b) {\n    return a + b;\n}"],
          answer: "int multiply(int a, int b) {\n    return a * b;\n}"
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "power 함수를 만들어봐요! (base의 exp승, for문 사용)",
          target: "int power(int base, int exp) {\n    int result = 1;\n    for (int i = 0; i < exp; i++) {\n        result *= base;\n    }\n    return result;\n}",
          hint: "result를 1로 시작하고, for문에서 result *= base를 exp번 반복!",
          done: [
            "int add(int a, int b) {\n    return a + b;\n}",
            "int multiply(int a, int b) {\n    return a * b;\n}"
          ],
          answer: "int power(int base, int exp) {\n    int result = 1;\n    for (int i = 0; i < exp; i++) {\n        result *= base;\n    }\n    return result;\n}"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "미니 수학 라이브러리 완성! 함수 마스터!",
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
