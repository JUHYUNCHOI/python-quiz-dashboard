import { LessonData } from '../types';

export const lessonCpp13: LessonData = {
    id: "cpp-13",
    title: "포인터 기초",
    description: "포인터의 기초를 복습해요!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 포인터란? ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "포인터란?",
          desc: "주소와 포인터의 개념을 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'int x = 42;\nint* ptr = &x;  // ptr에 x의 주소 저장\n\ncout << ptr << endl;   // 주소 출력\ncout << *ptr << endl;  // 주소에 있는 값 출력!',
          result: "0x7fff5fbff8ac\n42",
          note: "int* ptr → 포인터 선언 | *ptr → 그 주소에 있는 값 (역참조)"
        }
      },

      // 역참조 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'int a = 10;\nint* p = &a;\n*p = 99;\ncout << a << endl;',
          predict: {
            question: "a의 값은?",
            options: ["10", "99", "에러"],
            answer: 1,
            feedback: "*p = 99는 'p가 가리키는 곳에 99를 넣어'라는 뜻! 즉 a = 99!"
          },
          en: {
            predict: {
              question: "What is the value of a?",
              options: ["10", "99", "Error"],
              feedback: "*p = 99 means 'put 99 at the location p points to' — so a becomes 99!"
            }
          }
        }
      },

      // ===== Lv.1: 포인터 선언 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "x를 가리키는 포인터 ptr을 만들어요!",
          guide: "타입* 이름 = &변수; 형태!",
          template: "int___ ptr = ___x;",
          answer: "*",
          blanksAnswer: ["*", "&"],
          expect: "int* ptr = &x;",
          en: {
            task: "Create a pointer ptr that points to x!",
            guide: "Use the form: type* name = &variable;"
          }
        }
      },

      // ===== Lv.1: 역참조 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "포인터 ptr이 가리키는 값을 출력해요!",
          guide: "*ptr 로 값을 읽어와요!",
          template: "cout << ___ptr << endl;",
          answer: "*",
          expect: "cout << *ptr << endl;",
          en: {
            task: "Print the value that pointer ptr points to!",
            guide: "Use *ptr to dereference and read the value!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: 'int x = 10;\nint* ptr;\n*ptr = 20;  // danger!',
          options: [
            "ptr을 선언하지 않아서",
            "ptr이 아무것도 가리키지 않는데 값을 넣어서",
            "*를 빼야 해서"
          ],
          answer: 1,
          explanation: "ptr이 초기화 안 된 상태에서 *ptr에 값을 넣으면 위험해요! 반드시 주소를 먼저 넣어야 해요.",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "ptr is not declared",
              "ptr points to nothing, yet we are writing a value through it",
              "Should remove the *"
            ],
            explanation: "Writing *ptr without initializing ptr is dangerous! You must assign a valid address first."
          }
        }
      },

      // ===== Lv.2: 포인터로 값 변경 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "포인터를 통해 x의 값을 50으로 바꿔요!",
          guide: "*ptr = 값; 으로 원본을 바꿀 수 있어요!",
          template: "int x = 10;\nint* ptr = &x;\n___ptr = 50;",
          answer: "*",
          expect: "int x = 10;\nint* ptr = &x;\n*ptr = 50;",
          en: {
            task: "Change the value of x to 50 through the pointer!",
            guide: "Use *ptr = value; to modify the original!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "포인터 개념 완벽!",
          emoji: "📬"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "포인터란?",
          learned: [
            "&x → x의 메모리 주소",
            "int* ptr = &x; → 포인터 선언",
            "*ptr → 포인터가 가리키는 값 (역참조)",
            "*ptr = 값; → 원본 값 변경 가능",
            "초기화 안 된 포인터 사용은 위험!"
          ],
          canDo: "포인터를 선언하고 역참조로 값을 읽고 바꿀 수 있어요!",
          emoji: "📬"
        }
      },

      // ==================== CHAPTER 2: 포인터 활용 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "포인터 활용",
          desc: "nullptr, 배열과 포인터, 참조와 비교를 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 포인터 선언 기억나요?",
          task: "x를 가리키는 포인터 p를 선언해요!",
          template: "int___ p = ___x;",
          answer: "*",
          blanksAnswer: ["*", "&"],
          expect: "int* p = &x;",
          en: {
            message: "Quick! Remember how to declare a pointer?",
            task: "Declare a pointer p that points to x!"
          }
        }
      },

      // nullptr 설명
      {
        type: "explain",
        content: {
          lines: [],
          code: 'int arr[] = {10, 20, 30};\nint* p = arr;  // arr = &arr[0]\n\ncout << *p << endl;       // 10 (첫 번째)\ncout << *(p + 1) << endl; // 20 (두 번째)\ncout << *(p + 2) << endl; // 30 (세 번째)',
          result: "10\n20\n30",
          note: "p + 1 → 다음 원소 주소! 이걸 포인터 산술이라고 해요."
        }
      },

      // 포인터 산술 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'int arr[] = {5, 15, 25, 35};\nint* p = arr;\ncout << *(p + 2) << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["5", "15", "25", "35"],
            answer: 2,
            feedback: "p + 2는 arr[2]를 가리키니까 25가 출력돼요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["5", "15", "25", "35"],
              feedback: "p + 2 points to arr[2], so 25 is printed!"
            }
          }
        }
      },

      // ===== Lv.1: 배열 포인터 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "배열의 두 번째 원소를 포인터로 출력해요!",
          guide: "p + 1 은 두 번째 원소의 주소!",
          template: "cout << *(p + ___) << endl;",
          answer: "1",
          expect: "cout << *(p + 1) << endl;",
          en: {
            task: "Print the second element of the array using a pointer!",
            guide: "p + 1 is the address of the second element!"
          }
        }
      },

      // 포인터 vs 참조 비교
      {
        type: "explain",
        content: {
          lines: [],
          code: 'void ptrSwap(int* a, int* b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 3, y = 7;\n    ptrSwap(&x, &y);  // 주소를 넘겨요!\n    cout << x << " " << y << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["3 7", "7 3", "에러"],
            answer: 1,
            feedback: "포인터로 원본 주소를 받아서 *a, *b를 교환하니까 7 3이 돼요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["3 7", "7 3", "Error"],
              feedback: "The function receives the original addresses and swaps *a and *b, so the result is 7 3!"
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
          task: "포인터 swap 함수의 선언부를 써봐요!",
          target: "void ptrSwap(int* a, int* b) {",
          hint: "매개변수 타입이 int* 예요!",
          done: [],
          answer: "void ptrSwap(int* a, int* b) {"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "temp를 써서 *a와 *b를 교환하는 코드를 써봐요!",
          target: "    int temp = *a;\n    *a = *b;\n    *b = temp;",
          hint: "*a로 값에 접근! temp에 *a 저장 → *a에 *b → *b에 temp",
          done: ["void ptrSwap(int* a, int* b) {"],
          answer: "    int temp = *a;\n    *a = *b;\n    *b = temp;"
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "main에서 ptrSwap을 호출해요! (주소를 넘겨야 해요)",
          target: 'int x = 10, y = 20;\nptrSwap(&x, &y);\ncout << x << " " << y << endl;',
          hint: "함수에 &x, &y로 주소를 넘겨요!",
          done: ["void ptrSwap(int* a, int* b) {", "    int temp = *a;\n    *a = *b;\n    *b = temp;\n}"],
          answer: 'int x = 10, y = 20;\nptrSwap(&x, &y);\ncout << x << " " << y << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "포인터 마스터!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 3: 포인터 더 익히기 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "포인터 개념 다지기",
          desc: "&, *, nullptr, 포인터 vs 참조를 완전히 정복해요!"
        }
      },

      // quiz: & vs * 의미
      {
        type: "quiz",
        content: {
          question: "int x = 5; 에서 &x 의 의미는?",
          options: [
            "x의 값 5를 가져온다",
            "x의 메모리 주소를 가져온다",
            "x의 참조를 선언한다",
            "x에 값을 넣는 AND 연산"
          ],
          answer: 1,
          explanation: "변수 앞의 &는 주소 연산자! &x는 x가 저장된 메모리 주소를 반환해요.",
          en: {
            question: "In int x = 5;, what does &x mean?",
            options: [
              "Gets the value 5 from x",
              "Gets the memory address of x",
              "Declares a reference to x",
              "Bitwise AND operation on x"
            ],
            explanation: "& in front of a variable is the address-of operator! &x returns the memory address where x is stored."
          }
        }
      },

      // quiz: * 의 두 가지 의미
      {
        type: "quiz",
        content: {
          question: "포인터에서 * 가 쓰이는 경우 두 가지는?",
          options: [
            "포인터 선언(int* ptr)과 곱셈 연산자",
            "포인터 선언(int* ptr)과 역참조 연산자(*ptr)",
            "주소 연산자와 역참조 연산자",
            "포인터 선언과 주소 연산자"
          ],
          answer: 1,
          explanation: "* 는 ① int* ptr 처럼 포인터 타입 선언, ② *ptr 처럼 역참조(그 주소의 값 읽기/쓰기)에 사용해요!",
          en: {
            question: "In what two ways is * used with pointers?",
            options: [
              "Pointer declaration (int* ptr) and multiplication operator",
              "Pointer declaration (int* ptr) and dereference operator (*ptr)",
              "Address-of operator and dereference operator",
              "Pointer declaration and address-of operator"
            ],
            explanation: "* is used for ① declaring pointer types like int* ptr, and ② dereferencing like *ptr to read/write the value at that address!"
          }
        }
      },

      // practice: nullptr 초기화
      {
        type: "practice",
        content: {
          level: 1,
          task: "포인터를 안전하게 nullptr로 초기화해요!",
          guide: "초기화 안 된 포인터는 위험! 빈 포인터는 nullptr로 설정해요.",
          template: "int* ptr = ___;",
          answer: "nullptr",
          expect: "int* ptr = nullptr;",
          en: {
            task: "Safely initialize a pointer with nullptr!",
            guide: "Uninitialized pointers are dangerous! Set an empty pointer to nullptr."
          }
        }
      },

      // errorQuiz: nullptr 역참조
      {
        type: "errorQuiz",
        content: {
          question: "이 코드가 런타임 에러인 이유는?",
          code: 'int* ptr = nullptr;\ncout << *ptr << endl;',
          options: [
            "nullptr을 역참조하면 안 됨 (아무것도 가리키지 않음)",
            "포인터 선언에 * 가 없어서",
            "cout으로 포인터를 출력할 수 없어서"
          ],
          answer: 0,
          explanation: "nullptr은 아무것도 가리키지 않아요! *ptr로 역참조하면 잘못된 메모리 접근 → 런타임 에러!",
          en: {
            question: "Why does this code cause a runtime error?",
            options: [
              "Cannot dereference nullptr (it points to nothing)",
              "Missing * in the pointer declaration",
              "Cannot print a pointer with cout"
            ],
            explanation: "nullptr points to nothing! Dereferencing *ptr accesses invalid memory → runtime error!"
          }
        }
      },

      // predict: 포인터로 값 수정
      {
        type: "explain",
        content: {
          lines: [],
          code: 'int arr[] = {10, 20, 30};\nint* p = arr;\n*(p + 1) = 99;\ncout << arr[0] << " " << arr[1] << " " << arr[2] << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["10 20 30", "10 99 30", "99 20 30", "10 20 99"],
            answer: 1,
            feedback: "*(p + 1)은 arr[1]을 가리켜요! arr[1]을 99로 바꿔서 10 99 30!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["10 20 30", "10 99 30", "99 20 30", "10 20 99"],
              feedback: "*(p + 1) points to arr[1]! Setting it to 99 gives 10 99 30!"
            }
          }
        }
      },

      // practice: 포인터로 배열 순회
      {
        type: "practice",
        content: {
          level: 2,
          task: "포인터로 배열의 세 번째 원소에 접근해요!",
          guide: "*(p + 2) 는 arr[2]와 같아요!",
          template: "int arr[] = {5, 10, 15};\nint* p = arr;\ncout << ___(p + 2) << endl;",
          answer: "*",
          expect: "int arr[] = {5, 10, 15};\nint* p = arr;\ncout << *(p + 2) << endl;",
          en: {
            task: "Access the third element of an array using a pointer!",
            guide: "*(p + 2) is the same as arr[2]!"
          }
        }
      },

      // interleaving: cpp-12 참조 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 참조(reference) 기억나요?",
          task: "x의 참조를 만들어 ref로 x를 100으로 바꾸는 코드를 완성해요!",
          template: "int x = 5;\nint___ ref = x;\nref = 100;",
          answer: "&",
          expect: "int x = 5;\nint& ref = x;\nref = 100;",
          en: {
            message: "Quick! Remember references?",
            task: "Complete the code to create a reference ref to x and change x to 100 through ref!"
          }
        }
      },

      // quiz: 포인터 vs 참조 차이
      {
        type: "quiz",
        content: {
          question: "포인터와 참조의 차이로 올바른 것은?",
          options: [
            "포인터는 nullptr이 될 수 있고 참조는 될 수 없다",
            "참조는 선언 후 다른 것을 가리킬 수 있고 포인터는 못 한다",
            "포인터는 &로 선언하고 참조는 *로 선언한다",
            "포인터와 참조는 완전히 동일하다"
          ],
          answer: 0,
          explanation: "포인터는 nullptr 가능, 다른 변수로 재지정 가능! 참조는 반드시 초기화, 재지정 불가, nullptr 불가!",
          en: {
            question: "Which statement about the difference between pointers and references is correct?",
            options: [
              "A pointer can be nullptr, but a reference cannot",
              "A reference can be redirected after declaration, but a pointer cannot",
              "Pointers are declared with & and references with *",
              "Pointers and references are completely identical"
            ],
            explanation: "Pointers can be nullptr and can be reassigned! References must be initialized, cannot be redirected, and cannot be nullptr!"
          }
        }
      },

      // practice: 처음부터 작성 — 포인터 swap
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 포인터를 사용하는 ptrSwap 함수를 작성하고\na=10, b=20에 적용 후 결과를 출력해요",
          guide: "void ptrSwap(int* a, int* b) — *a로 값 접근, &a로 주소 전달!",
          template: null,
          answer: "void ptrSwap(int* a, int* b) {\n    int tmp = *a;\n    *a = *b;\n    *b = tmp;\n}\nint a = 10, b = 20;\nptrSwap(&a, &b);\ncout << a << \" \" << b << endl;",
          expect: "20 10",
          en: {
            task: "Write from scratch! Create ptrSwap using pointers and apply to a=10, b=20 then print the result",
            guide: "void ptrSwap(int* a, int* b) — use *a to access the value, &a to pass the address!"
          }
        }
      },

      // interleaving: cpp-9 배열 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 배열과 포인터의 관계 기억나요?",
          task: "배열 arr의 첫 번째 원소를 포인터로 접근해요!",
          template: "int arr[] = {1, 2, 3};\nint* p = ___;\ncout << *p << endl;",
          answer: "arr",
          expect: "int arr[] = {1, 2, 3};\nint* p = arr;\ncout << *p << endl;",
          en: {
            message: "Quick! Remember the relationship between arrays and pointers?",
            task: "Access the first element of array arr using a pointer!"
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
