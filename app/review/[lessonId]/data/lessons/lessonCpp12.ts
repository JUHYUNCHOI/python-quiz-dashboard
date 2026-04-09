import { LessonData } from '../types';

export const lessonCpp12: LessonData = {
    id: "cpp-12",
    title: "참조와 함수",
    description: "참조와 함수 매개변수 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 참조 (Reference) ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "참조 (Reference)",
          desc: "변수의 별명, 참조를 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "참조(reference)는 변수의 별명이에요! 🏷️",
            "파이썬에서는 변수가 원래 별명처럼 동작하지만,",
            "C++에서는 & 기호로 명시적으로 만들어요!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 10;\n    int& ref = x;  // ref는 x의 별명!\n\n    cout << x << endl;    // 10\n    cout << ref << endl;  // 10\n\n    ref = 20;  // ref를 바꾸면 x도 바뀜!\n    cout << x << endl;    // 20\n    return 0;\n}',
          result: "10\n10\n20",
          note: "int& ref = x; → ref는 x의 또 다른 이름! 같은 메모리를 가리켜요."
        }
      },

      // 참조 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "참조를 바꾸면 원본도 바뀌어요!",
            "별명을 불러도 본인이 대답하는 것과 같아요 🗣️"
          ],
          code: 'int a = 5;\nint& b = a;\nb = 100;\ncout << a << endl;',
          predict: {
            question: "a의 값은?",
            options: ["5", "100", "에러"],
            answer: 1,
            feedback: "b는 a의 별명이니까, b = 100은 곧 a = 100이에요!"
          }
        }
      },

      // ===== Lv.1: 참조 선언 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "x의 참조(별명) ref를 만들어요!",
          guide: "타입& 이름 = 원본; 형태예요!",
          template: "int___ ref = x;",
          answer: "&",
          expect: "int& ref = x;",
          en: {
            task: "Create a reference (alias) named ref for x!",
            guide: "Use the form: type& name = original;"
          }
        }
      },

      // 참조 퀴즈
      {
        type: "quiz",
        content: {
          question: "int& ref = x; 에서 &의 의미는?",
          options: [
            "x의 주소를 가져온다",
            "ref를 x의 참조(별명)로 만든다",
            "x와 ref를 비교한다",
            "x를 복사한다"
          ],
          answer: 1,
          explanation: "타입 뒤에 붙는 &는 참조 선언이에요! ref는 x의 별명이 돼요.",
          en: {
            question: "What does & mean in int& ref = x;?",
            options: [
              "Gets the address of x",
              "Makes ref a reference (alias) to x",
              "Compares x and ref",
              "Copies x"
            ],
            explanation: "& after a type declares a reference! ref becomes an alias for x."
          }
        }
      },

      // const 참조 설명
      {
        type: "explain",
        content: {
          lines: [
            "const 참조는 읽기만 가능한 별명이에요! 🔒",
            "값을 바꾸면 안 될 때 쓰면 안전해요."
          ],
          code: 'int x = 10;\nconst int& ref = x;\n\ncout << ref << endl;  // OK! 읽기 가능\n// ref = 20;  // 에러! const라 수정 불가',
          result: "10",
          note: "const int& → 읽기 전용 별명! 실수로 값을 바꾸는 걸 막아줘요."
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: 'int x = 10;\nconst int& ref = x;\nref = 20;',
          options: [
            "참조는 한 번만 쓸 수 있어서",
            "const 참조는 값을 바꿀 수 없어서",
            "int& 대신 int*를 써야 해서"
          ],
          answer: 1,
          explanation: "const 참조는 읽기 전용이에요! 값을 바꾸려면 const를 빼야 해요.",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "A reference can only be used once",
              "A const reference cannot modify the value",
              "Should use int* instead of int&"
            ],
            explanation: "A const reference is read-only! To modify the value, remove const."
          }
        }
      },

      // ===== Lv.2: const 참조 빈칸 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "읽기 전용 참조를 만들어요!",
          guide: "값을 못 바꾸게 하려면 뭘 붙여야 할까요?",
          template: "___ int& ref = x;",
          answer: "const",
          expect: "const int& ref = x;",
          en: {
            task: "Create a read-only reference!",
            guide: "What keyword prevents the value from being changed?"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "참조 개념 완벽!",
          emoji: "🏷️"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "참조 (Reference)",
          learned: [
            "int& ref = x; → 변수의 별명(참조) 만들기",
            "참조를 바꾸면 원본도 바뀜!",
            "const int& → 읽기 전용 참조",
            "참조는 선언할 때 반드시 초기화해야 함"
          ],
          canDo: "참조를 만들고 const로 보호할 수 있어요!",
          emoji: "🏷️"
        }
      },

      // ==================== CHAPTER 2: Call by Value vs Reference ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "Call by Value vs Reference",
          desc: "함수에 값 전달 방식을 비교해요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "x의 참조 ref를 선언해요!",
          template: "int___ ref = x;",
          answer: "&",
          expect: "int& ref = x;",
          en: {
            message: "Quick! Remember what we learned earlier?",
            task: "Declare a reference ref for x!"
          }
        }
      },

      // Call by Value 설명
      {
        type: "explain",
        content: {
          lines: [
            "함수에 변수를 넘길 때 두 가지 방법이 있어요!",
            "Call by Value: 값을 복사해서 넘김 (원본 안 바뀜)",
            "파이썬 숫자도 이렇게 동작해요!"
          ],
          code: 'void addTen(int n) {\n    n = n + 10;  // 복사본만 바뀜!\n}\n\nint main() {\n    int x = 5;\n    addTen(x);\n    cout << x << endl;  // 여전히 5!\n    return 0;\n}',
          result: "5",
          note: "Call by Value = 복사본 전달! 원본은 안전해요."
        }
      },

      // Call by Value 예측
      {
        type: "explain",
        content: {
          lines: [
            "Call by Value에서는 함수 안의 변경이 밖에 영향을 안 줘요!"
          ],
          code: 'void doubleIt(int n) {\n    n = n * 2;\n}\n\nint main() {\n    int x = 7;\n    doubleIt(x);\n    cout << x << endl;\n    return 0;\n}',
          predict: {
            question: "x의 출력은?",
            options: ["14", "7", "0"],
            answer: 1,
            feedback: "Call by Value라서 복사본만 바뀌고, 원본 x는 그대로 7이에요!"
          }
        }
      },

      // Call by Reference 설명
      {
        type: "explain",
        content: {
          lines: [
            "매개변수에 &를 붙이면 원본이 전달돼요! 📌",
            "이게 Call by Reference — 원본을 직접 수정할 수 있어요!"
          ],
          code: 'void addTen(int& n) {  // & 추가!\n    n = n + 10;  // 원본이 바뀜!\n}\n\nint main() {\n    int x = 5;\n    addTen(x);\n    cout << x << endl;  // 15!\n    return 0;\n}',
          result: "15",
          note: "int& n → 원본을 직접 받음! 함수 안에서 바꾸면 밖에서도 바뀜!"
        }
      },

      // ===== Lv.1: 참조 매개변수 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "원본을 바꾸는 함수를 만들어요!",
          guide: "매개변수에 &를 붙여야 원본이 바뀌어요!",
          template: "void addTen(int___ n) {",
          answer: "&",
          expect: "void addTen(int& n) {",
          en: {
            task: "Create a function that modifies the original value!",
            guide: "Add & to the parameter to allow modifying the original!"
          }
        }
      },

      // swap 설명
      {
        type: "explain",
        content: {
          lines: [
            "참조의 대표적인 활용: swap 함수! 🔄",
            "두 변수의 값을 서로 바꿔요."
          ],
          code: 'void mySwap(int& a, int& b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 1, y = 2;\n    mySwap(x, y);\n    cout << x << " " << y << endl;\n    return 0;\n}',
          result: "2 1",
          note: "참조로 받았으니 원본 x, y가 직접 바뀌어요!"
        }
      },

      // swap 퀴즈
      {
        type: "quiz",
        content: {
          question: "swap 함수에서 &를 빼면 어떻게 될까요?",
          options: [
            "값이 정상적으로 바뀐다",
            "복사본만 바뀌고 원본은 그대로다",
            "컴파일 에러가 난다"
          ],
          answer: 1,
          explanation: "&가 없으면 Call by Value라서 복사본끼리만 swap되고, 원본 x, y는 안 바뀌어요!",
          en: {
            question: "What happens if you remove & from the swap function?",
            options: [
              "Values swap correctly",
              "Only the copies are swapped; the originals stay the same",
              "Compile error"
            ],
            explanation: "Without &, it's Call by Value — only the copies get swapped, and the original x, y stay unchanged!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 swap 함수는 왜 안 될까요?",
          code: 'void mySwap(int a, int b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint x = 1, y = 2;\nmySwap(x, y);\ncout << x << " " << y;  // 1 2 ← 안 바뀜!',
          options: [
            "temp 변수가 잘못돼서",
            "매개변수에 &가 없어서 (Call by Value)",
            "return이 없어서"
          ],
          answer: 1,
          explanation: "int a, int b는 복사본! &를 붙여서 int& a, int& b로 해야 원본이 바뀌어요.",
          en: {
            question: "Why doesn't this swap function work?",
            options: [
              "The temp variable is wrong",
              "Parameters are missing & (Call by Value)",
              "There is no return statement"
            ],
            explanation: "int a, int b are copies! Use int& a, int& b to modify the originals."
          }
        }
      },

      // ===== Lv.2: swap 빈칸 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "swap 함수의 매개변수를 참조로 만들어요!",
          guide: "두 매개변수 모두 &가 필요해요!",
          template: "void mySwap(int___ a, int___ b) {",
          answer: "&",
          blanksAnswer: ["&", "&"],
          expect: "void mySwap(int& a, int& b) {",
          en: {
            task: "Make both parameters of the swap function references!",
            guide: "Both parameters need &!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "Value vs Reference 정복!",
          emoji: "🔄"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "Call by Value vs Reference",
          learned: [
            "Call by Value: 복사본 전달 → 원본 안 바뀜",
            "Call by Reference: int& → 원본 전달 → 원본 바뀜",
            "swap 함수는 반드시 참조로!",
            "파이썬 리스트는 자동으로 참조처럼 동작"
          ],
          canDo: "함수에서 참조로 원본 값을 수정할 수 있어요!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 3: 종합 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "종합 프로젝트",
          desc: "swap 함수와 배열 원소 교환을 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! Call by Reference 기억나요?",
          task: "원본을 바꾸는 매개변수를 써봐요!",
          template: "void addOne(int___ n) {\n    n = n + 1;\n}",
          answer: "&",
          expect: "void addOne(int& n) {\n    n = n + 1;\n}",
          en: {
            message: "Quick! Remember Call by Reference?",
            task: "Write a parameter that allows modifying the original value!"
          }
        }
      },

      // 프로젝트 도입 예측
      {
        type: "explain",
        content: {
          lines: [
            "swap 함수를 직접 만들어 볼 거예요!",
            "임시 변수 temp를 써서 두 값을 교환해요."
          ],
          code: 'void mySwap(int& a, int& b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int arr[] = {3, 1};\n    mySwap(arr[0], arr[1]);\n    cout << arr[0] << " " << arr[1] << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["3 1", "1 3", "에러"],
            answer: 1,
            feedback: "mySwap이 참조로 받아서 배열 원소가 직접 바뀌어요! 3과 1이 교환!"
          }
        }
      },

      // 프로젝트 Step 1
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "swap 함수의 선언부를 써봐요!",
          target: "void mySwap(int& a, int& b) {",
          hint: "void mySwap(int& a, int& b) {",
          done: [],
          answer: "void mySwap(int& a, int& b) {"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "temp를 써서 a와 b를 교환하는 코드를 써봐요!",
          target: "    int temp = a;\n    a = b;\n    b = temp;",
          hint: "임시 변수에 a를 저장 → a에 b를 넣기 → b에 temp를 넣기",
          done: ["void mySwap(int& a, int& b) {"],
          answer: "    int temp = a;\n    a = b;\n    b = temp;"
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "main에서 swap을 호출하고 결과를 출력해요!",
          target: 'int x = 10, y = 20;\nmySwap(x, y);\ncout << x << " " << y << endl;',
          hint: "mySwap(x, y); 로 호출!",
          done: ["void mySwap(int& a, int& b) {", "    int temp = a;\n    a = b;\n    b = temp;\n}"],
          answer: 'int x = 10, y = 20;\nmySwap(x, y);\ncout << x << " " << y << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "참조와 함수 완전 정복!",
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
