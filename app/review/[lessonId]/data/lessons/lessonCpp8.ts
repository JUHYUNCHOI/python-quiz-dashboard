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
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nvoid sayHello() {\n    cout << "안녕하세요!" << endl;\n}\n\nint main() {\n    sayHello();\n    return 0;\n}',
          result: "안녕하세요!",
          note: "void = 반환값 없음! return 생략 가능!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint square(int x) {\n    return x * x;\n}\n\nint main() {\n    cout << square(4) << endl;\n    return 0;\n}',
          predict: {
            question: "square(4)의 결과는?",
            options: ["4", "8", "16", "에러"],
            answer: 2,
            feedback: "4 * 4 = 16! square 함수는 x의 제곱을 반환해요!"
          },
          en: {
            predict: {
              question: "What is the result of square(4)?",
              options: ["4", "8", "16", "Error"],
              feedback: "4 * 4 = 16! The square function returns x squared!"
            }
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
          expect: "int multiply(int a, int b) {\n    return a * b;\n}",
          en: {
            task: "Write the return type of a function that returns an integer!",
            guide: "integer = int!"
          }
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
          expect: 'void greet() {\n    cout << "Hi!" << endl;\n}',
          en: {
            task: "Write the type for a function with no return value!",
            guide: "no return value = void!"
          }
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
          explanation: "C++에서는 def 대신 반환 타입을 써요! int add(...)는 정수를 반환하는 함수, void hello(...)는 반환값 없는 함수!",
          en: {
            question: "What is the C++ equivalent of Python's def in functions?",
            options: [
              "func keyword",
              "def keyword",
              "Return type (int, void, etc.)",
              "return keyword"
            ],
            explanation: "In C++, you write the return type instead of def! int add(...) returns an integer, void hello(...) returns nothing!"
          }
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
          explanation: "C++에서 함수는 호출하기 전에 (main 위에) 정의하거나, 프로토타입을 선언해야 해요!",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "Cannot use the name 'double'",
              "Function is defined below main()",
              "return x * 2 is wrong"
            ],
            explanation: "In C++, functions must be defined before they are called (above main), or a prototype must be declared!"
          }
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
          answer: "int, int",
          blanksAnswer: ["int", "int"],
          expect: "int add(int a, int b) {\n    return a + b;\n}",
          en: {
            task: "Complete the function by adding types to the parameters!",
            guide: "In C++, parameters must always have a type!"
          }
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
          expect: 'void sayHi() {\n    cout << "Hi!" << endl;\n}',
          en: {
            message: "Wait! Do you remember function basics?",
            task: "What is the return type of a function with no return value?"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint add(int a, int b) {\n    return a + b;\n}\n\ndouble add(double a, double b) {\n    return a + b;\n}\n\nint main() {\n    cout << add(3, 5) << endl;\n    cout << add(1.5, 2.3) << endl;\n    return 0;\n}',
          result: "8\n3.8",
          note: "같은 이름 add인데 매개변수 타입이 다르면 OK!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'void greet() {\n    cout << "Hello!" << endl;\n}\n\nvoid greet(string name) {\n    cout << "Hello, " << name << "!" << endl;\n}\n\n// main에서:\ngreet();\ngreet("주현");',
          predict: {
            question: "출력 결과는?",
            options: ["Hello!\\nHello!", "Hello!\\nHello, 주현!", "에러 (같은 이름이라)"],
            answer: 1,
            feedback: "매개변수 개수가 다르니 오버로딩 OK! greet()는 첫 번째, greet(\"주현\")은 두 번째 함수가 호출돼요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["Hello!\\nHello!", "Hello!\\nHello, Juhyun!", "Error (same name)"],
              feedback: "Different number of parameters means overloading is OK! greet() calls the first, greet(\"Juhyun\") calls the second function!"
            }
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
          explanation: "오버로딩은 매개변수의 타입이나 개수가 달라야 해요! 반환 타입만 다른 건 안 돼요!",
          en: {
            question: "When is function overloading allowed?",
            options: [
              "When function names are different",
              "When parameter types or count differ",
              "When only return types differ",
              "When the code inside differs"
            ],
            explanation: "Overloading requires different parameter types or count! Differing only in return type is not allowed!"
          }
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
          expect: "void repeat(int times = 5) {",
          en: {
            task: "Add a default value of 5 to the parameter!",
            guide: "Use the form: type name = defaultValue"
          }
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
          explanation: "오버로딩은 매개변수가 달라야 해요! 반환 타입만 다른 건 컴파일러가 구분할 수 없어서 에러!",
          en: {
            question: "Why is this overloading an error?",
            options: [
              "Because function names are the same",
              "Parameters are the same and only return type differs",
              "Cannot use double"
            ],
            explanation: "Overloading requires different parameters! The compiler cannot distinguish functions that differ only in return type, causing an error!"
          }
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
          expect: "double add(double a, double b) {\n    return a + b;\n}",
          en: {
            task: "Complete the overloaded function that takes double parameters!",
            guide: "int add(int, int) exists — now make the double version!"
          }
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
        type: "quiz",
        content: {
          question: "오버로딩된 함수를 컴파일러가 구분하는 기준은?",
          options: [
            "반환 타입이 다를 때",
            "매개변수 이름이 다를 때",
            "매개변수의 타입 또는 개수가 다를 때",
            "함수 내부 코드가 다를 때"
          ],
          answer: 2,
          explanation: "컴파일러는 매개변수의 타입 또는 개수로만 오버로딩된 함수를 구분해요! 반환 타입이나 매개변수 이름만 다른 건 오버로딩으로 인정 안 됩니다.",
          en: {
            question: "How does the compiler distinguish overloaded functions?",
            options: [
              "Different return types",
              "Different parameter names",
              "Different parameter types or count",
              "Different code inside the function"
            ],
            explanation: "The compiler distinguishes overloaded functions only by parameter type or count! Differing only in return type or parameter names is not valid overloading."
          }
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

      // ==================== CHAPTER 4: 함수 손에 익히기 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "함수 손에 익히기",
          desc: "선언 → 구현 → 호출 패턴을 손이 기억할 때까지!"
        }
      },

      // Drill 1: 반환값 없는 함수 (void)
      {
        type: "practice",
        content: {
          level: 1,
          task: "이름을 받아서 \"Hello, 이름!\"을 출력하는 void 함수를 완성해요",
          guide: "void greet(string name) { cout << ... }",
          template: "___ greet(string name) {\n    cout << \"Hello, \" << name << \"!\" << endl;\n}",
          answer: "void",
          expect: "void greet(string name) {\n    cout << \"Hello, \" << name << \"!\" << endl;\n}",
          en: {
            task: "Complete the void function that takes a name and prints \"Hello, name!\"",
            guide: "void greet(string name) { cout << ... }"
          }
        }
      },

      // Drill 2: 반환값 있는 함수 + 호출
      {
        type: "practice",
        content: {
          level: 2,
          task: "두 정수의 곱을 반환하는 함수를 만들고, 3 × 4 결과를 출력해요",
          guide: "int multiply(int a, int b) { return a * b; }",
          template: "___ multiply(int a, int b) {\n    return a ___ b;\n}\n// 호출:\ncout << multiply(3, 4) << endl;",
          blanksAnswer: ["int", "*"],
          answer: "int multiply(int a, int b) {\n    return a * b;\n}\ncout << multiply(3, 4) << endl;",
          expect: "12",
          en: {
            task: "Create a function that returns the product of two integers, then print 3 × 4",
            guide: "int multiply(int a, int b) { return a * b; }"
          }
        }
      },

      // Drill 3: 함수 선언 → 구현 → 호출 전체 흐름
      {
        type: "practice",
        content: {
          level: 2,
          task: "정수 n을 받아 1부터 n까지 합을 반환하는 함수를 완성하고 sumTo(10) 출력",
          guide: "int sumTo(int n) { int s=0; for(...) s+=i; return s; }",
          template: "int sumTo(int n) {\n    int s = 0;\n    for (int i = 1; i <= n; ___) {\n        s ___ i;\n    }\n    return ___;\n}\ncout << sumTo(10) << endl;",
          blanksAnswer: ["i++", "+=", "s"],
          answer: "int sumTo(int n) {\n    int s = 0;\n    for (int i = 1; i <= n; i++) {\n        s += i;\n    }\n    return s;\n}\ncout << sumTo(10) << endl;",
          expect: "55",
          en: {
            task: "Complete the function that returns the sum from 1 to n, then print sumTo(10)",
            guide: "int sumTo(int n) { int s=0; for(...) s+=i; return s; }"
          }
        }
      },

      // Drill 4: 처음부터 — isEven 함수
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 정수가 짝수면 true, 홀수면 false를 반환하는 isEven 함수를 만들고\nisEven(4), isEven(7)의 결과를 출력해요",
          guide: "bool isEven(int n) { return n % 2 == 0; }",
          hint: "bool isEven(int n) {\n    return n % 2 == 0;\n}\ncout << isEven(4) << endl;\ncout << isEven(7) << endl;",
          template: null,
          answer: "bool isEven(int n) {\n    return n % 2 == 0;\n}\ncout << isEven(4) << endl;\ncout << isEven(7) << endl;",
          alternateAnswers: [
            "bool isEven(int n){return n%2==0;}\ncout<<isEven(4)<<endl;\ncout<<isEven(7)<<endl;"
          ],
          expect: "1\n0",
          en: {
            task: "Write from scratch! Create an isEven function that returns true for even, false for odd\nThen print results for isEven(4) and isEven(7)",
            guide: "bool isEven(int n) { return n % 2 == 0; }",
            hint: "bool isEven(int n) {\n    return n % 2 == 0;\n}\ncout << isEven(4) << endl;\ncout << isEven(7) << endl;"
          }
        }
      },

      // Drill 5: 처음부터 — max 함수
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 두 정수 중 큰 값을 반환하는 myMax 함수를 만들고\nmyMax(5, 9)와 myMax(12, 3) 결과를 출력해요",
          guide: "int myMax(int a, int b) { if (a > b) return a; return b; }",
          hint: "a와 b를 비교해서 더 큰 쪽을 return하면 돼요",
          template: null,
          answer: "int myMax(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\ncout << myMax(5, 9) << endl;\ncout << myMax(12, 3) << endl;",
          alternateAnswers: [
            "int myMax(int a,int b){return a>b?a:b;}\ncout<<myMax(5,9)<<endl;\ncout<<myMax(12,3)<<endl;"
          ],
          expect: "9\n12",
          en: {
            task: "Write from scratch! Create a myMax function that returns the larger of two integers\nThen print myMax(5, 9) and myMax(12, 3)",
            guide: "int myMax(int a, int b) { if (a > b) return a; return b; }",
            hint: "Compare a and b, then return whichever is larger"
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
