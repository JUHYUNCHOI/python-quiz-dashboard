import { LessonData } from '../types';

export const lessonCpp10: LessonData = {
    id: "cpp-10",
    title: "Range-for & auto",
    description: "범위 기반 for와 auto 키워드 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: Range-based for ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "Range-based for",
          desc: "파이썬처럼 깔끔한 for 루프를 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "C++에도 파이썬의 for x in list 같은 문법이 있어요! 🎯",
            "for (타입 변수 : 컨테이너) 형태예요."
          ],
          code: '// Python:  for x in [1, 2, 3]:\n//              print(x)\n// C++:\nvector<int> v = {1, 2, 3};\nfor (int x : v) {\n    cout << x << endl;\n}',
          result: "1\n2\n3",
          note: "for (int x : v) = \"v의 각 원소를 x에 넣어서 반복!\""
        }
      },

      // 기존 for vs range-for 비교
      {
        type: "explain",
        content: {
          lines: [
            "기존 for 루프와 range-for를 비교해봐요!",
            "range-for가 훨씬 깔끔하죠?"
          ],
          code: 'vector<int> v = {10, 20, 30};\n\n// classic for:\nfor (int i = 0; i < v.size(); i++) {\n    cout << v[i] << " ";\n}\n\n// range-for (same result!):\nfor (int x : v) {\n    cout << x << " ";\n}',
          result: "10 20 30",
          note: "인덱스가 필요 없으면 range-for가 더 좋아요!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[4] = {5, 10, 15, 20};\n    int sum = 0;\n    for (int x : arr) {\n        sum += x;\n    }\n    cout << sum << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["50", "20", "15", "4"],
            answer: 0,
            feedback: "5 + 10 + 15 + 20 = 50! range-for로 모든 원소를 더했어요."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["50", "20", "15", "4"],
              feedback: "5 + 10 + 15 + 20 = 50! The range-for added all elements."
            }
          }
        }
      },

      // Lv.1: range-for 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "range-for 의 변수와 컨테이너를 가르는 기호를 채워요!",
          guide: "변수 뒤, 컨테이너 앞에 들어가는 한 글자 — '에서' 라는 의미!",
          template: "for (int x ___ v) {",
          answer: ":",
          expect: "for (int x : v) {",
          en: {
            task: "Fill in the symbol that separates the variable from the container in range-for!",
            guide: "One character that goes between the variable and the container — means 'from'!"
          }
        }
      },

      // Lv.1: range-for 변수 타입
      {
        type: "practice",
        content: {
          level: 1,
          task: "이 벡터를 순회하는 range-for 의 변수 타입을 채워요!",
          guide: "nums 의 원소 타입이 뭔지 보고 그대로 — 또는 컴파일러에게 맡기는 키워드도 OK",
          template: "vector<int> nums = {1, 2, 3};\n\nfor (___ x : nums) {",
          answer: "int",
          alternateAnswers: ["auto", "int&", "auto&", "const int&", "const auto&"],
          expect: "for (int x : nums) {",
          en: {
            task: "Fill in the type for this range-for!",
            guide: "Look at what nums holds and match it — or use the keyword that lets the compiler decide"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "range-for는 파이썬의 어떤 문법과 비슷할까요?",
          options: [
            "while True:",
            "for i in range(10):",
            "for x in list:",
            "if x in list:"
          ],
          answer: 2,
          explanation: "for (int x : v)는 파이썬의 for x in list:와 같아요! 각 원소를 하나씩 꺼내서 반복해요.",
          en: {
            question: "Which Python syntax is range-for similar to?",
            options: [
              "while True:",
              "for i in range(10):",
              "for x in list:",
              "if x in list:"
            ],
            explanation: "for (int x : v) is equivalent to Python's for x in list: — it iterates over each element one by one!"
          }
        }
      },

      // 에러 퀴즈 — 타입 불일치
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'vector<int> v = {1, 2, 3};\nfor (string x : v) {\n    cout << x << endl;\n}',
          options: [
            "v는 int인데 x를 string으로 받아서 타입 불일치",
            "range-for에서는 string을 못 써요",
            "콜론(:) 대신 세미콜론(;)을 써야 해요"
          ],
          answer: 0,
          explanation: "vector<int>의 원소는 int인데 string으로 받으면 타입이 안 맞아요! int x로 써야 해요.",
          en: {
            question: "What is wrong with this code?",
            options: [
              "v holds int but x is declared as string — type mismatch",
              "string cannot be used in range-for",
              "Should use semicolon (;) instead of colon (:)"
            ],
            explanation: "The elements of vector<int> are int, but receiving them as string causes a type mismatch! Use int x instead."
          }
        }
      },

      // 에러 퀴즈 — Python 'in' 오타 (Python 출신 학생 흔한 실수)
      {
        type: "errorQuiz",
        content: {
          question: "Python 으로 코딩하다가 C++ 로 옮겼더니 컴파일이 안 돼요. 어디가 문제일까요?",
          code: 'vector<int> v = {1, 2, 3};\nfor (int x in v) {\n    cout << x;\n}',
          options: [
            "Python 의 'in' 대신 C++ 은 콜론(:) 을 써요 — for (int x : v)",
            "int 는 range-for 에 못 써요",
            "x 를 미리 선언해야 해요"
          ],
          answer: 0,
          explanation: "Python 은 `for x in v:`, C++ 은 `for (int x : v) { ... }`. 두 언어 모두 'x 를 v 의 각 원소로' 라는 같은 의미지만 기호가 달라요. C++ 은 콜론!",
          en: {
            question: "Coming from Python, this code won't compile in C++. What's wrong?",
            code: 'vector<int> v = {1, 2, 3};\nfor (int x in v) {\n    cout << x;\n}',
            options: [
              "C++ uses colon (:) instead of Python's 'in' — for (int x : v)",
              "int can't be used in range-for",
              "x needs to be declared first"
            ],
            explanation: "Python: `for x in v:`. C++: `for (int x : v) { ... }`. Same meaning ('x as each element of v'), different separator. C++ uses a colon!"
          }
        }
      },

      // predict — int 나눗셈 함정 (auto a = 10 / 4)
      {
        type: "explain",
        content: {
          lines: [],
          code: 'auto a = 10 / 4;\nauto b = 10.0 / 4;\ncout << a << " " << b;',
          predict: {
            question: "출력 결과는?",
            options: ["2 2.5", "2.5 2.5", "2 2", "에러"],
            answer: 0,
            feedback: "`a = 10 / 4` 는 **int / int = int** → 2 (소수점 버림). `b = 10.0 / 4` 는 double 이 섞여 있어서 → 2.5. auto 는 표현식 결과의 타입을 그대로 받아요. 함정 조심!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["2 2.5", "2.5 2.5", "2 2", "Error"],
              feedback: "`a = 10 / 4` is **int / int = int** → 2 (decimal truncated). `b = 10.0 / 4` has a double, so → 2.5. auto inherits the expression's type. Watch for this trap!"
            }
          }
        }
      },

      // Lv.2: range-for로 출력
      {
        type: "practice",
        content: {
          level: 2,
          task: "정수 벡터 v 의 모든 값을 출력하는 range-for 의 두 빈칸을 채우세요!",
          guide: "왼쪽: 원소 타입 (또는 컴파일러에 맡기는 키워드). 오른쪽: '에서' 라는 의미의 한 글자.",
          template: 'vector<int> v = {1, 2, 3};\n\nfor (___ x ___ v) {\n    cout << x << " ";\n}',
          answer: "for (int x : v)",
          blanksAnswer: ["int", ":"],
          alternateAnswers: ["auto, :", "int&, :", "auto&, :", "const int&, :", "const auto&, :"],
          expect: 'for (int x : v) {\n    cout << x << " ";\n}',
          en: {
            task: "Fill in the two blanks of the range-for that prints all values in the int vector v!",
            guide: "Left: element type (or the keyword that lets the compiler decide). Right: a one-character symbol meaning 'from'."
          }
        }
      },

      // range-for 문자열 벡터
      {
        type: "quiz",
        content: {
          question: 'vector<string> names = {"A", "B"}; 를 range-for로 순회하려면?',
          options: [
            "for (int x : names)",
            "for (string x : names)",
            "for (char x : names)",
            "for (names : string x)"
          ],
          answer: 1,
          explanation: "벡터의 타입이 string이면 변수도 string으로 받아야 해요!",
          en: {
            question: 'To iterate over vector<string> names = {"A", "B"}; with range-for, you should write:',
            options: [
              "for (int x : names)",
              "for (string x : names)",
              "for (char x : names)",
              "for (names : string x)"
            ],
            explanation: "Since the vector holds strings, the loop variable must also be string!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "range-for 완벽!",
          emoji: "🔄"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "Range-based for",
          learned: [
            "for (int x : v) — v의 각 원소를 x에 넣어 반복",
            "파이썬 for x in list: 와 같은 개념!",
            "배열, vector 모두 사용 가능",
            "변수 타입 = 컨테이너 원소 타입",
            "인덱스 필요 없으면 기존 for보다 깔끔!"
          ],
          canDo: "range-for로 배열과 벡터를 깔끔하게 순회할 수 있어요!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 2: auto 키워드 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "auto 키워드",
          desc: "타입을 자동으로 추론하는 auto를 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습 (string 벡터 — Ch1 콜론과 다른 각도)
      {
        type: "interleaving",
        content: {
          message: "잠깐! range-for 의 변수 타입 기억나요?",
          task: "string 벡터 names 를 순회하는 range-for 의 변수 타입을 채워요!",
          template: 'vector<string> names = {"Emma", "Jake"};\n\nfor (___ name : names) {\n    cout << name;\n}',
          answer: "string",
          alternateAnswers: ["auto", "string&", "auto&", "const string&", "const auto&"],
          expect: 'for (string name : names) {\n    cout << name;\n}',
          en: {
            message: "Quick! Remember the variable type for range-for?",
            task: "Fill in the type for the range-for iterating over the string vector names!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "auto를 쓰면 컴파일러가 타입을 알아서 추론해요! 🤖",
            "파이썬처럼 타입을 직접 안 써도 돼요."
          ],
          code: 'auto x = 42;                  // inferred as int\nauto pi = 3.14;               // inferred as double\nstring s = "hello";\nauto name = s;                // inferred as string\n\n// also works in range-for!\nvector<int> v = {1, 2, 3};\nfor (auto x : v) {\n    cout << x << endl;\n}',
          note: "auto = \"타입은 컴파일러한테 맡길게!\"  (파이썬의 기본 동작과 비슷!)"
        }
      },

      // auto vs auto& — 복사인지 참조인지 구분
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {1, 2, 3};\n\nauto  a = v[0];   // & 없음\nauto& b = v[1];   // & 있음\n\na = 99;\nb = 99;\n\ncout << v[0] << " " << v[1];',
          predict: {
            question: "출력 결과는?",
            options: ["99 99", "1 2", "1 99", "99 2"],
            answer: 2,
            feedback: "a 는 v[0] 의 **복사본** 이라 a=99 해도 v[0] 은 그대로 1. b 는 v[1] 의 **참조** 라 b=99 하면 v[1] 도 99 가 돼요. 핵심은 \\& 가 있냐 없냐!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["99 99", "1 2", "1 99", "99 2"],
              feedback: "a is a **copy** of v[0], so a=99 leaves v[0] as 1. b is a **reference** to v[1], so b=99 also changes v[1] to 99. Key: with or without \\&!"
            }
          }
        }
      },

      // auto& 참조 설명
      {
        type: "explain",
        content: {
          lines: [
            "auto&를 쓰면 원본을 직접 수정할 수 있어요! ✏️",
            "& 없이 auto만 쓰면 복사본이라 원본이 안 바뀌어요."
          ],
          code: 'vector<int> v = {1, 2, 3};\n\n// auto (copy) — original unchanged\nfor (auto x : v) {\n    x = x * 2;  // only copy changes!\n}\n// v = {1, 2, 3} unchanged\n\n// auto& (reference) — original changes!\nfor (auto& x : v) {\n    x = x * 2;  // original changes!\n}\n// v = {2, 4, 6}',
          note: "auto = 복사 (읽기용) / auto& = 참조 (수정용)"
        }
      },

      // Lv.1: auto 빈칸 — 컨텍스트 추가
      {
        type: "practice",
        content: {
          level: 1,
          task: "타입을 직접 안 쓰고 컴파일러가 추론하게 하는 키워드로 빈칸을 채우세요!",
          guide: "int / double / string 대신 쓸 수 있는 한 단어 — 'C++ 이 알아서 정해줘' 라는 의미",
          template: "vector<double> data = {1.5, 2.7, 3.14};\n\nfor (___ x : data) {\n    cout << x << \" \";\n}",
          answer: "auto",
          expect: "for (auto x : data) {",
          en: {
            task: "Fill in the keyword that lets the compiler infer the type instead of writing it directly!",
            guide: "One word that can replace int / double / string — meaning 'let C++ figure it out'"
          }
        }
      },

      // auto& 퀴즈
      {
        type: "quiz",
        content: {
          question: "for (auto& x : v) 에서 &의 역할은?",
          options: [
            "주소를 출력한다",
            "원본을 직접 수정할 수 있게 해준다",
            "타입을 문자열로 바꾼다",
            "벡터를 정렬한다"
          ],
          answer: 1,
          explanation: "&는 참조! 원본 벡터의 값을 직접 수정할 수 있어요. & 없으면 복사본이라 원본이 안 바뀌어요.",
          en: {
            question: "What does & do in for (auto& x : v)?",
            options: [
              "Prints the address",
              "Allows directly modifying the original value",
              "Converts the type to string",
              "Sorts the vector"
            ],
            explanation: "& means reference! You can directly modify the original vector values. Without &, x is a copy and the original stays unchanged."
          }
        }
      },

      // auto& 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    for (auto& x : v) {\n        x = x * 2;\n    }\n    for (auto x : v) {\n        cout << x << " ";\n    }\n    cout << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["1 2 3", "2 4 6", "1 4 9", "에러"],
            answer: 1,
            feedback: "auto&로 원본을 수정해서 모든 값이 2배! {1,2,3} → {2,4,6}"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["1 2 3", "2 4 6", "1 4 9", "Error"],
              feedback: "auto& modifies the originals, doubling all values! {1,2,3} → {2,4,6}"
            }
          }
        }
      },

      // Lv.2: auto& 수정 — 컨텍스트 + int 도 정답
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터 v 의 모든 값에 10 을 더하는 코드를 완성하세요! (& 는 이미 적혀있음)",
          guide: "왼쪽에 들어갈 건 타입. 정수 벡터니까 직접 쓸 수도 있고, 컴파일러에 맡길 수도 있어요.",
          template: "vector<int> v = {1, 2, 3};\n\nfor (___& x : v) {\n    x = x + 10;\n}",
          answer: "int",
          alternateAnswers: ["auto"],
          expect: "for (int& x : v) {\n    x = x + 10;\n}",
          en: {
            task: "Complete the code to add 10 to every element of v! (& is already provided)",
            guide: "Left blank is the type. Either spell it out (it's an int vector) or let the compiler decide."
          }
        }
      },

      // 에러 퀴즈 — auto 복사 silent bug
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'vector<int> v = {1, 2, 3};\nfor (auto x : v) {\n    x = x * 10;\n}\ncout << v[0] << endl;  // expected: 10',
          options: [
            "auto는 복사라서 원본 v가 안 바뀌어요 (v[0]은 여전히 1)",
            "auto 대신 int를 써야 해요",
            "x = x * 10 문법이 틀렸어요"
          ],
          answer: 0,
          explanation: "auto는 복사본이에요! 원본을 바꾸려면 auto& x 로 써야 해요. 지금은 v[0]이 여전히 1이에요.",
          en: {
            question: "What is wrong with this code?",
            options: [
              "auto is a copy, so the original v is not changed (v[0] is still 1)",
              "Should use int instead of auto",
              "x = x * 10 syntax is wrong"
            ],
            explanation: "auto is a copy! To modify the original, use auto& x instead. Currently v[0] is still 1."
          }
        }
      },

      // 에러 퀴즈 — const ref 에 수정 시도 (반대 방향 흔한 실수)
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 컴파일 에러일까요?",
          code: 'vector<int> v = {1, 2, 3};\nfor (const auto& x : v) {\n    x = x * 2;   // ?\n}',
          options: [
            "const 는 '바꾸지 않는다' 약속 — x = ... 로 수정하면 컴파일 에러",
            "& 와 const 를 같이 쓸 수 없어서",
            "auto 는 const 를 못 받아서"
          ],
          answer: 0,
          explanation: "`const auto&` 는 '읽기만 한다' 는 약속이에요. 그 안에서 x 를 바꾸려고 하면 컴파일러가 막아요. 수정하려면 `const` 를 빼고 `auto&` 만 써야 해요.",
          en: {
            question: "Why does this code fail to compile?",
            options: [
              "const means 'won't modify' — assigning to x is a compile error",
              "& and const can't be used together",
              "auto can't accept const"
            ],
            explanation: "`const auto&` is a promise to read only. Modifying x inside is blocked by the compiler. Drop the `const` to allow modification."
          }
        }
      },

      // 에러 퀴즈 — 큰 데이터를 복사로 받는 비효율 (const auto& 권장)
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 동작은 하는데, **효율** 측면에서 무슨 문제가 있을까요?",
          code: 'vector<string> names = {"Alice", "Bob", "Charlie"};\n\nfor (auto name : names) {       // 읽기만 함\n    cout << name << endl;\n}',
          options: [
            "string 을 매번 통째로 복사해서 큰 데이터에선 느려요 — const auto& 로 해야 효율적",
            "auto 가 string 을 추론 못 해서",
            "for 루프 횟수가 잘못돼서"
          ],
          answer: 0,
          explanation: "`auto name` 은 string 을 **복사** 해요. 짧은 단어면 괜찮지만 긴 string 이 많으면 느려져요. 읽기만 할 땐 `const auto& name` — 복사 없이 원본 가리키기만 해서 빠르고 안전해요.",
          en: {
            question: "This code works, but what's the **efficiency** problem?",
            options: [
              "Each string is copied — slow for large data. Use const auto& for efficiency",
              "auto can't infer string",
              "The loop count is wrong"
            ],
            explanation: "`auto name` **copies** each string. Fine for short ones but slow with many large strings. For read-only access use `const auto& name` — no copy, just refers to the original."
          }
        }
      },

      // Lv.3: 처음부터 — 모든 원소 2배 만들기 (auto& 필수)
      {
        type: "practice",
        content: {
          level: 3,
          task: "🔥 nums 의 모든 원소를 2배로 바꾸고 출력하세요!",
          guide: "수정하려면 for-loop 변수에 & 가 있어야 원본이 바뀌어요. 출력 시 값 사이는 공백.",
          template: null,
          starterCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {3, 7, 2, 9, 5};\n\n    // 👇 1. range-for 로 모든 원소를 2배로\n\n\n    // 👇 2. range-for 로 출력 (값 뒤에 " ")\n\n\n    return 0;\n}',
          answer: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {3, 7, 2, 9, 5};\n\n    for (auto& x : nums) x = x * 2;\n\n    for (auto x : nums) cout << x << " ";\n\n    return 0;\n}',
          alternateAnswers: [
            '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {3, 7, 2, 9, 5};\n    for (int& x : nums) x *= 2;\n    for (int x : nums) cout << x << " ";\n    return 0;\n}'
          ],
          expect: "6 14 4 18 10 ",
          en: {
            task: "🔥 Double every element of nums and print the result!",
            guide: "To modify, the loop variable needs &. Print values separated by spaces."
          }
        }
      },

      // Lv.3: 처음부터 — 평균 이상만 출력 (sum + filter)
      {
        type: "practice",
        content: {
          level: 3,
          task: "🔥 scores 에서 평균 이상인 점수만 출력하세요!",
          guide: "1) 합계 → 평균 계산. 2) 평균 이상인 값만 range-for 로 출력. 정수 평균은 sum / size.",
          template: null,
          starterCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {72, 85, 60, 90, 78};\n    int sum = 0;\n\n    // 👇 1. range-for 로 합계 구하기\n\n\n    int avg = sum / scores.size();\n\n    // 👇 2. range-for 로 avg 이상인 점수만 출력 (값 뒤에 " ")\n\n\n    return 0;\n}',
          answer: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {72, 85, 60, 90, 78};\n    int sum = 0;\n\n    for (auto x : scores) sum += x;\n\n    int avg = sum / scores.size();\n\n    for (auto x : scores) if (x >= avg) cout << x << " ";\n\n    return 0;\n}',
          alternateAnswers: [
            '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {72, 85, 60, 90, 78};\n    int sum = 0;\n    for (const auto& x : scores) sum += x;\n    int avg = sum / scores.size();\n    for (const auto& x : scores) if (x >= avg) cout << x << " ";\n    return 0;\n}'
          ],
          expect: "85 90 78 ",
          en: {
            task: "🔥 Print only scores at or above the average!",
            guide: "1) Sum → average. 2) Print only values >= avg via range-for. Integer avg = sum / size."
          }
        }
      },

      // Lv.3: 처음부터 — 음수만 0 으로 (auto& 필수)
      {
        type: "practice",
        content: {
          level: 3,
          task: "🔥 temps 의 음수 값을 모두 0 으로 바꾸고 출력하세요!",
          guide: "if 안에서 원본 값을 바꿔야 하니 & 가 꼭 필요해요. 안 그러면 복사본만 0 이 되고 원본은 그대로.",
          template: null,
          starterCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> temps = {15, -3, 22, -8, 0, 5};\n\n    // 👇 1. range-for 로 음수 값을 0 으로 바꾸기\n\n\n    // 👇 2. range-for 로 출력 (값 뒤에 " ")\n\n\n    return 0;\n}',
          answer: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> temps = {15, -3, 22, -8, 0, 5};\n\n    for (auto& x : temps) if (x < 0) x = 0;\n\n    for (auto x : temps) cout << x << " ";\n\n    return 0;\n}',
          alternateAnswers: [
            '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> temps = {15, -3, 22, -8, 0, 5};\n    for (int& x : temps) { if (x < 0) x = 0; }\n    for (int x : temps) cout << x << " ";\n    return 0;\n}'
          ],
          expect: "15 0 22 0 0 5 ",
          en: {
            task: "🔥 Set all negative values in temps to 0, then print!",
            guide: "Modifying values inside if requires & on the loop variable. Without it, only the copy becomes 0."
          }
        }
      },

      // Lv.3: 처음부터 — string 벡터 인사 (타입 처리)
      {
        type: "practice",
        content: {
          level: 3,
          task: "🔥 names 의 각 이름 앞에 \"Hi, \" 를 붙여 한 줄씩 출력하세요!",
          guide: "string 벡터를 range-for 로 순회 — 타입은 string 또는 auto. 출력 끝마다 줄바꿈.",
          template: null,
          starterCode: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> names = {"Emma", "Jake", "Mia"};\n\n    // 👇 range-for 로 각 이름 앞에 "Hi, " 붙여 한 줄씩 출력\n    //    예: Hi, Emma  /  Hi, Jake  /  Hi, Mia\n\n\n    return 0;\n}',
          answer: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> names = {"Emma", "Jake", "Mia"};\n\n    for (const auto& name : names) cout << "Hi, " << name << "\\n";\n\n    return 0;\n}',
          alternateAnswers: [
            '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> names = {"Emma", "Jake", "Mia"};\n    for (string name : names) cout << "Hi, " << name << "\\n";\n    return 0;\n}',
            '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<string> names = {"Emma", "Jake", "Mia"};\n    for (auto name : names) cout << "Hi, " << name << "\\n";\n    return 0;\n}'
          ],
          expect: "Hi, Emma\nHi, Jake\nHi, Mia",
          en: {
            task: "🔥 Print each name in names prefixed with \"Hi, \", one per line!",
            guide: "Iterate the string vector with range-for — type is string or auto. Newline after each."
          }
        }
      },

      // Lv.3: 처음부터 — 정확한 평균 (int 나눗셈 함정 적용)
      {
        type: "practice",
        content: {
          level: 3,
          task: "🔥 scores 의 정확한 평균을 소수점까지 출력하세요! (예시: 81.6)",
          guide: "함정 — int / int = int 라 86.4 가 아니라 86 만 나와요. 합계나 개수 중 하나를 double 로 만들어야 해요. (double)sum / scores.size() 같은 식)",
          template: null,
          starterCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {85, 90, 70, 95, 68};\n\n    // 👇 1. range-for 로 합계 구하기\n\n\n    // 👇 2. 정확한 평균 출력 (정수 나눗셈 주의!)\n\n\n    return 0;\n}',
          answer: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {85, 90, 70, 95, 68};\n    int sum = 0;\n\n    for (auto x : scores) sum += x;\n\n    cout << (double)sum / scores.size();\n\n    return 0;\n}',
          alternateAnswers: [
            '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {85, 90, 70, 95, 68};\n    double sum = 0;\n    for (auto x : scores) sum += x;\n    cout << sum / scores.size();\n    return 0;\n}',
            '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {85, 90, 70, 95, 68};\n    int sum = 0;\n    for (const auto& x : scores) sum += x;\n    cout << sum / (double)scores.size();\n    return 0;\n}'
          ],
          expect: "81.6",
          en: {
            task: "🔥 Print the exact average of scores, including decimal! (example: 81.6)",
            guide: "Trap — int / int = int gives 81 instead of 81.6. Cast either sum or count to double, e.g. (double)sum / scores.size()"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "auto 키워드 마스터!",
          emoji: "🤖"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "auto 키워드",
          learned: [
            "auto = 컴파일러가 타입을 알아서 추론",
            "for (auto x : v) — 읽기용 (복사)",
            "for (auto& x : v) — 수정용 (참조)",
            "& 없으면 원본 안 바뀌고, & 있으면 원본 바뀜!",
            "파이썬은 기본이 참조, C++은 기본이 복사!"
          ],
          canDo: "auto와 auto&로 깔끔하게 벡터를 순회하고 수정할 수 있어요!",
          emoji: "🤖"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 벡터 통계",
          desc: "range-for와 auto로 합계, 평균, 최댓값을 구해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! auto&로 원본 수정하는 법 기억나요?",
          task: "벡터의 모든 값을 2배로 만드는 for 문의 빈칸을 채워요!",
          template: "for (auto___ x : v) {\n    x = x * 2;\n}",
          answer: "&",
          expect: "for (auto& x : v) {\n    x = x * 2;\n}",
          en: {
            message: "Quick! Remember how to modify originals with auto&?",
            task: "Fill in the blank to double every value in the vector!"
          }
        }
      },

      // 최댓값 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {30, 10, 50, 20};\n    int maxVal = v[0];\n    for (auto x : v) {\n        if (x > maxVal) {\n            maxVal = x;\n        }\n    }\n    cout << maxVal << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["30", "10", "50", "20"],
            answer: 2,
            feedback: "30→30, 10<30 패스, 50>30 갱신, 20<50 패스 → 최댓값은 50!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["30", "10", "50", "20"],
              feedback: "30→30, 10<30 skip, 50>30 update, 20<50 skip → max is 50!"
            }
          }
        }
      },

      // 프로젝트 Step 1: 합계
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "range-for로 벡터의 합계를 구해요!",
          target: "int total = 0;\nfor (auto x : scores) {\n    total += x;\n}\ncout << \"합계: \" << total << endl;",
          hint: "int total = 0; 후 for (auto x : scores) { total += x; }",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {90, 85, 70, 95, 80};"],
          answer: "int total = 0;\nfor (auto x : scores) {\n    total += x;\n}\ncout << \"합계: \" << total << endl;"
        }
      },

      // 프로젝트 Step 2: 평균
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "합계를 이용해서 평균을 출력해요!",
          target: 'cout << "평균: " << total / scores.size() << endl;',
          hint: "합계 / 개수 = 평균!",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {90, 85, 70, 95, 80};", "int total = 0;\nfor (auto x : scores) {\n    total += x;\n}"],
          answer: 'cout << "평균: " << total / scores.size() << endl;'
        }
      },

      // 프로젝트 Step 3: 최댓값
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "range-for로 최댓값을 구해서 출력해요!",
          target: "int maxVal = scores[0];\nfor (auto x : scores) {\n    if (x > maxVal) maxVal = x;\n}\ncout << \"최댓값: \" << maxVal << endl;",
          hint: "int maxVal = scores[0]; 후 for로 비교!",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {90, 85, 70, 95, 80};", "int total = 0;\nfor (auto x : scores) {\n    total += x;\n}\ncout << \"합계: \" << total << endl;\ncout << \"평균: \" << total / scores.size() << endl;"],
          answer: "int maxVal = scores[0];\nfor (auto x : scores) {\n    if (x > maxVal) maxVal = x;\n}\ncout << \"최댓값: \" << maxVal << endl;"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "벡터 통계 프로그램 완성!",
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
