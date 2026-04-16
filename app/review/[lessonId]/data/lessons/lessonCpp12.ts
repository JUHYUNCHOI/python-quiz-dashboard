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
          },
          en: {
            predict: {
              question: "What is the value of a?",
              options: ["5", "100", "Error"],
              feedback: "b is an alias for a, so b = 100 is the same as a = 100!"
            }
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
          },
          en: {
            predict: {
              question: "What is the output of x?",
              options: ["14", "7", "0"],
              feedback: "Call by Value means only the copy changes; the original x stays at 7!"
            }
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
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["3 1", "1 3", "Error"],
              feedback: "mySwap takes references, so the array elements are directly swapped! 3 and 1 exchange places!"
            }
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
          answer: "&",
          alternateAnswers: ["&"],
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
            guide: "void doubleAll(vector<int>& v) → v[i] *= 2",
            hint: "void doubleAll(vector<int>& v) {\n    for (auto& x : v) x *= 2;\n}\nvector<int> v = {1,2,3,4,5};\ndoubleAll(v);\nfor (auto x : v) cout << x << \" \";"
          }
        }
      },

      // ==================== CHAPTER 3: 참조 퀴즈 강화 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "참조 개념 다지기",
          desc: "참조와 Call by Reference를 확실히 이해해요!"
        }
      },

      // quiz: 참조 특징
      {
        type: "quiz",
        content: {
          question: "C++ 참조(reference)에 대한 올바른 설명은?",
          options: [
            "참조는 선언 후 다른 변수로 재지정할 수 있다",
            "참조는 반드시 선언 시 초기화해야 한다",
            "참조는 nullptr이 될 수 있다",
            "참조는 메모리를 새로 할당한다"
          ],
          answer: 1,
          explanation: "참조는 선언 시 반드시 초기화해야 해요! 포인터와 달리 나중에 다른 변수를 가리킬 수 없어요.",
          en: {
            question: "Which statement about C++ references is correct?",
            options: [
              "A reference can be reassigned to another variable after declaration",
              "A reference must be initialized when declared",
              "A reference can be nullptr",
              "A reference allocates new memory"
            ],
            explanation: "A reference must be initialized at declaration! Unlike pointers, it cannot be redirected to another variable."
          }
        }
      },

      // quiz: call by value vs reference
      {
        type: "quiz",
        content: {
          question: "함수에서 원본 값을 직접 변경하려면 어떻게 해야 할까요?",
          options: [
            "매개변수를 int n으로 선언한다",
            "매개변수를 int& n으로 선언한다",
            "함수 앞에 & 를 붙인다",
            "return으로 값을 돌려준다"
          ],
          answer: 1,
          explanation: "int& n으로 참조 매개변수를 선언하면 원본 변수가 직접 바뀌어요! (Call by Reference)",
          en: {
            question: "How do you directly modify the original value inside a function?",
            options: [
              "Declare the parameter as int n",
              "Declare the parameter as int& n",
              "Add & before the function name",
              "Return the value"
            ],
            explanation: "Declaring int& n as a reference parameter directly changes the original variable! (Call by Reference)"
          }
        }
      },

      // predict: call by reference 출력 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'void increment(int& n) {\n    n++;\n}\n\nint main() {\n    int x = 5;\n    increment(x);\n    increment(x);\n    cout << x << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["5", "6", "7", "에러"],
            answer: 2,
            feedback: "increment가 참조로 x를 받아 두 번 1씩 증가! 5 + 1 + 1 = 7"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["5", "6", "7", "Error"],
              feedback: "increment takes x by reference and increments it twice! 5 + 1 + 1 = 7"
            }
          }
        }
      },

      // errorQuiz: & 빠뜨린 함수
      {
        type: "errorQuiz",
        content: {
          question: "x를 2배로 만들려는 코드인데 출력이 5예요. 문제는?",
          code: 'void doubleVal(int n) {\n    n = n * 2;\n}\n\nint main() {\n    int x = 5;\n    doubleVal(x);\n    cout << x << endl;\n}',
          options: [
            "매개변수에 & 가 없어서 원본이 바뀌지 않음",
            "n * 2 대신 n *= 2 를 써야 함",
            "return n * 2 를 해야 함"
          ],
          answer: 0,
          explanation: "void doubleVal(int n)은 복사본을 받아요! 원본 x를 바꾸려면 int& n으로 선언해야 해요.",
          en: {
            question: "This code is supposed to double x but prints 5. What's wrong?",
            options: [
              "Missing & in the parameter, so the original is not changed",
              "Should use n *= 2 instead of n = n * 2",
              "Should return n * 2"
            ],
            explanation: "void doubleVal(int n) receives a copy! To modify the original x, declare it as int& n."
          }
        }
      },

      // practice: 참조로 최솟값 갱신
      {
        type: "practice",
        content: {
          level: 2,
          task: "참조 매개변수를 사용해 minVal을 갱신하는 함수를 완성해요!",
          guide: "void updateMin(int& minVal, int newVal) — 참조로 받아야 원본이 바뀌어요!",
          template: "void updateMin(int___ minVal, int newVal) {\n    if (newVal < minVal) {\n        minVal = newVal;\n    }\n}",
          answer: "&",
          expect: "void updateMin(int& minVal, int newVal) {\n    if (newVal < minVal) {\n        minVal = newVal;\n    }\n}",
          en: {
            task: "Complete the function that updates minVal using a reference parameter!",
            guide: "void updateMin(int& minVal, int newVal) — must use reference to change the original!"
          }
        }
      },

      // interleaving: cpp-10 range-for with auto&
      {
        type: "interleaving",
        content: {
          message: "잠깐! range-for에서 원소를 직접 바꾸려면?",
          task: "auto& 를 써서 벡터 원소를 직접 2배로 만드는 루프를 완성해요!",
          template: "for (auto___ x : v) {\n    x *= 2;\n}",
          answer: "&",
          expect: "for (auto& x : v) {\n    x *= 2;\n}",
          en: {
            message: "Quick! How do you modify elements directly in a range-for?",
            task: "Complete the loop that doubles each element in-place using auto&!"
          }
        }
      },

      // practice: const 참조 읽기
      {
        type: "practice",
        content: {
          level: 2,
          task: "읽기만 하는 경우 const 참조를 써요! string 출력 함수를 완성해요",
          guide: "const string& 로 받으면 복사 없이 안전하게 읽기만 해요!",
          template: "void printStr(const string___ s) {\n    cout << s << endl;\n}",
          answer: "&",
          expect: "void printStr(const string& s) {\n    cout << s << endl;\n}",
          en: {
            task: "Use a const reference when you only need to read! Complete the string print function",
            guide: "const string& reads safely without copying!"
          }
        }
      },

      // interleaving: cpp-9 vector 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 벡터 크기 구하는 방법 기억나요?",
          task: "벡터 v의 크기를 출력하는 코드를 완성해요!",
          template: "cout << v.___() << endl;",
          answer: "size",
          expect: "cout << v.size() << endl;",
          en: {
            message: "Quick! Remember how to get the size of a vector?",
            task: "Complete the code to print the size of vector v!"
          }
        }
      },

      // errorQuiz: 참조는 반드시 초기화
      {
        type: "errorQuiz",
        content: {
          question: "이 코드가 컴파일 에러인 이유는?",
          code: 'int& ref;\nint x = 10;\nref = x;',
          options: [
            "참조는 선언할 때 바로 초기화해야 해요",
            "int 앞에 & 를 붙이면 안 돼요",
            "int x = 10 이 먼저 와야 해요"
          ],
          answer: 0,
          explanation: "참조는 선언 즉시 초기화 필수! int& ref = x; 처럼 한 줄에 써야 해요.",
          en: {
            question: "Why does this code cause a compile error?",
            options: [
              "A reference must be initialized when declared",
              "Cannot add & before int",
              "int x = 10 must come first"
            ],
            explanation: "A reference must be initialized immediately! Write it as int& ref = x; on one line."
          }
        }
      },

      // practice: 처음부터 작성 — 두 수 교환
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 두 int를 참조로 받아 교환하는 mySwap 함수를 작성하고\na=3, b=7에 적용 후 \"3 7\" → \"7 3\" 을 출력해요",
          guide: "void mySwap(int& a, int& b) { int tmp=a; a=b; b=tmp; }",
          template: null,
          answer: "void mySwap(int& a, int& b) {\n    int tmp = a;\n    a = b;\n    b = tmp;\n}\nint a = 3, b = 7;\nmySwap(a, b);\ncout << a << \" \" << b << endl;",
          expect: "7 3",
          en: {
            task: "Write from scratch! Create mySwap that takes two ints by reference and swaps them\nApply to a=3, b=7 and print \"3 7\" → \"7 3\"",
            guide: "void mySwap(int& a, int& b) { int tmp=a; a=b; b=tmp; }"
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
