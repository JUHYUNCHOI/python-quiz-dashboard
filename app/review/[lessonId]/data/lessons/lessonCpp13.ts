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
          lines: [
            "변수는 메모리에 저장돼요! 📫",
            "모든 변수에는 '주소'가 있어요 — 우편함 번호 같은 거예요!",
            "&변수 로 주소를 볼 수 있어요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 42;\n    cout << "값: " << x << endl;\n    cout << "주소: " << &x << endl;\n    return 0;\n}',
          result: "값: 42\n주소: 0x7fff5fbff8ac",
          note: "&x = x의 메모리 주소! (실행할 때마다 달라져요)"
        }
      },

      // 주소 퀴즈
      {
        type: "quiz",
        content: {
          question: "&x 에서 &의 의미는?",
          options: [
            "x를 참조로 만든다",
            "x의 메모리 주소를 가져온다",
            "x를 복사한다",
            "x를 삭제한다"
          ],
          answer: 1,
          explanation: "변수 앞에 &를 붙이면 그 변수의 메모리 주소를 가져와요! (참조 선언의 &와는 다른 용도!)",
          en: {
            question: "What does & mean in &x?",
            options: [
              "Makes x a reference",
              "Gets the memory address of x",
              "Copies x",
              "Deletes x"
            ],
            explanation: "Putting & before a variable gets its memory address! (Different usage from the & in reference declarations!)"
          }
        }
      },

      // 포인터 선언 설명
      {
        type: "explain",
        content: {
          lines: [
            "포인터는 주소를 저장하는 변수예요! 📬",
            "타입* 이름 = &변수; 형태로 만들어요.",
            "우편함 번호를 적어둔 메모지라고 생각하면 돼요!"
          ],
          code: 'int x = 42;\nint* ptr = &x;  // ptr에 x의 주소 저장\n\ncout << ptr << endl;   // 주소 출력\ncout << *ptr << endl;  // 주소에 있는 값 출력!',
          result: "0x7fff5fbff8ac\n42",
          note: "int* ptr → 포인터 선언 | *ptr → 그 주소에 있는 값 (역참조)"
        }
      },

      // 역참조 예측
      {
        type: "explain",
        content: {
          lines: [
            "*ptr 은 '그 주소에 가서 값을 읽어와'라는 뜻이에요! 🔍",
            "이걸 역참조(dereference)라고 해요."
          ],
          code: 'int a = 10;\nint* p = &a;\n*p = 99;\ncout << a << endl;',
          predict: {
            question: "a의 값은?",
            options: ["10", "99", "에러"],
            answer: 1,
            feedback: "*p = 99는 'p가 가리키는 곳에 99를 넣어'라는 뜻! 즉 a = 99!"
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
          code: 'int x = 10;\nint* ptr;\n*ptr = 20;  // 위험!',
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
          lines: [
            "아무것도 가리키지 않는 포인터 = nullptr! 🚫",
            "파이썬의 None과 비슷해요.",
            "초기화를 안 하는 것보다 nullptr을 쓰는 게 안전해요!"
          ],
          code: 'int* ptr = nullptr;  // 아무것도 안 가리킴\n\nif (ptr == nullptr) {\n    cout << "포인터가 비어있어요!" << endl;\n}\n\n// *ptr = 10;  // 에러! nullptr에 값을 넣을 수 없음',
          result: "포인터가 비어있어요!",
          note: "nullptr = 아무것도 안 가리키는 포인터 (파이썬의 None)"
        }
      },

      // nullptr 퀴즈
      {
        type: "quiz",
        content: {
          question: "nullptr의 역할은?",
          options: [
            "포인터를 0번 주소로 보낸다",
            "포인터가 아무것도 가리키지 않음을 표시한다",
            "포인터를 삭제한다",
            "메모리를 해제한다"
          ],
          answer: 1,
          explanation: "nullptr은 '이 포인터는 아무것도 가리키지 않아요'라는 표시예요! 파이썬의 None과 비슷해요.",
          en: {
            question: "What is the role of nullptr?",
            options: [
              "Sends the pointer to address 0",
              "Indicates that the pointer points to nothing",
              "Deletes the pointer",
              "Frees memory"
            ],
            explanation: "nullptr means 'this pointer points to nothing'! It's similar to Python's None."
          }
        }
      },

      // 배열과 포인터
      {
        type: "explain",
        content: {
          lines: [
            "배열 이름은 사실 첫 번째 원소의 주소예요! 📋",
            "포인터로 배열을 탐색할 수 있어요."
          ],
          code: 'int arr[] = {10, 20, 30};\nint* p = arr;  // arr = &arr[0]\n\ncout << *p << endl;       // 10 (첫 번째)\ncout << *(p + 1) << endl; // 20 (두 번째)\ncout << *(p + 2) << endl; // 30 (세 번째)',
          result: "10\n20\n30",
          note: "p + 1 → 다음 원소 주소! 이걸 포인터 산술이라고 해요."
        }
      },

      // 포인터 산술 예측
      {
        type: "explain",
        content: {
          lines: [
            "p + n 은 n번째 뒤의 원소를 가리켜요!"
          ],
          code: 'int arr[] = {5, 15, 25, 35};\nint* p = arr;\ncout << *(p + 2) << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["5", "15", "25", "35"],
            answer: 2,
            feedback: "p + 2는 arr[2]를 가리키니까 25가 출력돼요!"
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
          lines: [
            "포인터 vs 참조를 비교해볼까요? ⚖️",
            "둘 다 원본을 수정할 수 있지만, 사용법이 달라요!"
          ],
          code: '// 참조: 별명 (자동으로 원본 접근)\nint& ref = x;\nref = 20;     // 그냥 쓰면 됨\n\n// 포인터: 주소 저장 (역참조 필요)\nint* ptr = &x;\n*ptr = 20;    // * 붙여야 함',
          note: "참조 = 간편하지만 바꿀 수 없음 | 포인터 = 유연하지만 좀 더 복잡"
        }
      },

      // 비교 퀴즈
      {
        type: "quiz",
        content: {
          question: "참조(reference)와 포인터(pointer)의 차이는?",
          options: [
            "참조는 나중에 다른 변수를 가리킬 수 있다",
            "포인터는 nullptr이 될 수 있지만 참조는 안 된다",
            "참조가 포인터보다 항상 느리다"
          ],
          answer: 1,
          explanation: "포인터는 nullptr도 되고 나중에 다른 주소를 넣을 수도 있어요. 참조는 한 번 정하면 못 바꿔요!",
          en: {
            question: "What is the difference between a reference and a pointer?",
            options: [
              "A reference can be rebound to another variable later",
              "A pointer can be nullptr, but a reference cannot",
              "A reference is always slower than a pointer"
            ],
            explanation: "A pointer can be nullptr and reassigned to a different address. A reference is fixed once set!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는?",
          code: 'int* ptr = nullptr;\ncout << *ptr << endl;',
          options: [
            "ptr 선언이 잘못돼서",
            "nullptr을 역참조해서 (존재하지 않는 값 읽기)",
            "cout이 포인터를 출력 못 해서"
          ],
          answer: 1,
          explanation: "nullptr을 역참조하면 프로그램이 죽어요! 반드시 nullptr 체크 후에 *를 써야 해요.",
          en: {
            question: "What is wrong with this code?",
            options: [
              "The ptr declaration is wrong",
              "Dereferencing nullptr reads a non-existent value",
              "cout cannot print a pointer"
            ],
            explanation: "Dereferencing nullptr crashes the program! Always check for nullptr before using *."
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "포인터 활용 마스터!",
          emoji: "🎯"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "포인터 활용",
          learned: [
            "nullptr = 아무것도 안 가리키는 포인터 (None)",
            "배열 이름 = 첫 원소의 주소",
            "p + n = n번째 뒤 원소의 주소 (포인터 산술)",
            "참조: 간편, 못 바꿈 | 포인터: 유연, *필요"
          ],
          canDo: "nullptr, 배열 포인터, 참조와 포인터 차이를 설명할 수 있어요!",
          emoji: "🎯"
        }
      },

      // ==================== CHAPTER 3: 종합 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "종합 프로젝트",
          desc: "포인터로 두 변수의 값을 교환해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! nullptr 기억나요?",
          task: "포인터를 안전하게 초기화해요!",
          template: "int* ptr = ___;",
          answer: "nullptr",
          expect: "int* ptr = nullptr;",
          en: {
            message: "Quick! Remember nullptr?",
            task: "Initialize the pointer safely!"
          }
        }
      },

      // 프로젝트 도입 예측
      {
        type: "explain",
        content: {
          lines: [
            "포인터 버전 swap을 만들어 볼 거예요! 🔄",
            "참조 대신 포인터를 매개변수로 받아요."
          ],
          code: 'void ptrSwap(int* a, int* b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 3, y = 7;\n    ptrSwap(&x, &y);  // 주소를 넘겨요!\n    cout << x << " " << y << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["3 7", "7 3", "에러"],
            answer: 1,
            feedback: "포인터로 원본 주소를 받아서 *a, *b를 교환하니까 7 3이 돼요!"
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

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
