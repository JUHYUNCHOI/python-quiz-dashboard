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
