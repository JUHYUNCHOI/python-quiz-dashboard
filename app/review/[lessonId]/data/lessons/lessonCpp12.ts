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
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 10;\n    int& ref = x;  // ref는 x의 별명!\n\n    cout << x << endl;    // 10\n    cout << ref << endl;  // 10\n\n    ref = 20;  // ref를 바꾸면 x도 바뀜!\n    cout << x << endl;    // 20\n    return 0;\n}',
          result: "10\n10\n20",
          note: "int& ref = x; → ref는 x의 또 다른 이름! 같은 메모리를 가리켜요."
        }
      },

      // 참조 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
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
          lines: [],
          code: 'void addTen(int n) {\n    n = n + 10;  // 복사본만 바뀜!\n}\n\nint main() {\n    int x = 5;\n    addTen(x);\n    cout << x << endl;  // 여전히 5!\n    return 0;\n}',
          result: "5",
          note: "Call by Value = 복사본 전달! 원본은 안전해요."
        }
      },

      // Call by Value 예측
      {
        type: "explain",
        content: {
          lines: [],
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
          lines: [],
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

      // ==================== CHAPTER 손에 익히기: 참조 & 함수 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "참조 손에 익히기",
          desc: "& 붙이는 위치, pass by reference 패턴을 손이 기억할 때까지!"
        }
      },

      // Drill 1: & 위치 연습
      {
        type: "practice",
        content: {
          level: 1,
          task: "참조 변수 ref를 x에 연결하고, ref를 통해 x를 20으로 바꿔서 x를 출력해요",
          guide: "int& ref = x; ref = 20;",
          template: "int x = 10;\nint___ ref = x;\nref = 20;\ncout << x << endl;",
          blanksAnswer: ["&"],
          answer: "int x = 10;\nint& ref = x;\nref = 20;\ncout << x << endl;",
          expect: "20",
          en: {
            task: "Bind reference ref to x, change x to 20 through ref, then print x",
            guide: "int& ref = x; ref = 20;"
          }
        }
      },

      // Drill 2: swap 함수 직접 작성
      {
        type: "practice",
        content: {
          level: 2,
          task: "두 정수를 참조로 받아서 서로 교환하는 swap 함수를 완성해요",
          guide: "void swap(int& a, int& b) { int tmp = a; a = b; b = tmp; }",
          template: "void swap(int___ a, int___ b) {\n    int tmp = a;\n    a = b;\n    b = ___;\n}",
          blanksAnswer: ["&", "&", "tmp"],
          answer: "void swap(int& a, int& b) {\n    int tmp = a;\n    a = b;\n    b = tmp;\n}",
          expect: "void swap(int& a, int& b) {\n    int tmp = a;\n    a = b;\n    b = tmp;\n}",
          en: {
            task: "Complete the swap function that takes two integers by reference and swaps them",
            guide: "void swap(int& a, int& b) { int tmp = a; a = b; b = tmp; }"
          }
        }
      },

      // Drill 3: 참조로 배열 통계
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터를 참조로 받아서 모든 원소에 n을 더하는 함수 addAll을 완성해요",
          guide: "void addAll(vector<int>& v, int n)",
          template: "void addAll(vector<int>___ v, int n) {\n    for (int i = 0; i < v.size(); i++) {\n        v[i] ___ n;\n    }\n}",
          blanksAnswer: ["&", "+="],
          answer: "void addAll(vector<int>& v, int n) {\n    for (int i = 0; i < v.size(); i++) {\n        v[i] += n;\n    }\n}",
          expect: "void addAll(vector<int>& v, int n) {\n    for (int i = 0; i < v.size(); i++) {\n        v[i] += n;\n    }\n}",
          en: {
            task: "Complete the addAll function that takes a vector by reference and adds n to every element",
            guide: "void addAll(vector<int>& v, int n)"
          }
        }
      },

      // Drill 4: 처음부터 — doubleAll 함수
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 벡터를 참조로 받아 모든 값을 2배로 만드는 doubleAll 함수를 작성하고\nvector {1,2,3,4,5}에 적용 후 결과를 공백으로 출력해요",
          guide: "void doubleAll(vector<int>& v) → v[i] *= 2",
          hint: "void doubleAll(vector<int>& v) {\n    for (auto& x : v) x *= 2;\n}\nvector<int> v = {1,2,3,4,5};\ndoubleAll(v);\nfor (auto x : v) cout << x << \" \";",
          template: null,
          answer: "void doubleAll(vector<int>& v) {\n    for (int i = 0; i < v.size(); i++) {\n        v[i] *= 2;\n    }\n}\nvector<int> v = {1, 2, 3, 4, 5};\ndoubleAll(v);\nfor (auto x : v) {\n    cout << x << \" \";\n}",
          alternateAnswers: [
            "void doubleAll(vector<int>& v){for(auto& x:v)x*=2;}\nvector<int> v={1,2,3,4,5};\ndoubleAll(v);\nfor(auto x:v)cout<<x<<\" \";"
          ],
          expect: "2 4 6 8 10 ",
          en: {
            task: "Write from scratch! Create doubleAll that takes a vector by reference and doubles every value\nApply to {1,2,3,4,5} and print results separated by spaces",
            guide: "void doubleAll(vector<int>& v) → v[i] *= 2"
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
