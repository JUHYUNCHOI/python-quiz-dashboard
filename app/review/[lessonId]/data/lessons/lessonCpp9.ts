import { LessonData } from '../types';

export const lessonCpp9: LessonData = {
    id: "cpp-9",
    title: "배열 & 벡터",
    description: "배열과 vector 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: C-style 배열 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "C-style 배열",
          desc: "고정 크기 배열을 익혀요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "C++에서 같은 타입 여러 개를 묶으려면 배열을 써요! 📦",
            "파이썬의 리스트와 비슷하지만, 크기가 고정돼요!"
          ],
          code: '// 파이썬:  scores = [90, 85, 100]\n// C++:\nint scores[3] = {90, 85, 100};',
          result: "// scores[0]=90, scores[1]=85, scores[2]=100",
          note: "[] 안에 크기, {} 안에 값! 인덱스는 0부터 시작해요."
        }
      },

      // 배열 선언 예측
      {
        type: "explain",
        content: {
          lines: [
            "배열은 선언할 때 크기가 정해져요!",
            "인덱스로 각 값에 접근할 수 있어요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[3] = {10, 20, 30};\n    cout << arr[0] << endl;\n    cout << arr[2] << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["10\n30", "10\n20", "20\n30", "1\n3"],
            answer: 0,
            feedback: "arr[0]은 첫 번째 값 10, arr[2]는 세 번째 값 30이에요!"
          }
        }
      },

      // Lv.1: 배열 선언 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "정수 5개짜리 배열을 선언해요!",
          guide: "int 이름[크기]; 형태예요!",
          template: "int nums[___];",
          answer: "5",
          expect: "int nums[5];",
          en: {
            task: "Declare an array of 5 integers!",
            guide: "Use the form: int name[size];"
          }
        }
      },

      // Lv.1: 배열 초기화
      {
        type: "practice",
        content: {
          level: 1,
          task: "배열에 1, 2, 3을 넣어요!",
          guide: "중괄호 {} 안에 값을 넣어요!",
          template: "int arr[3] = {___};",
          answer: "1, 2, 3",
          alternateAnswers: ["1,2,3"],
          expect: "int arr[3] = {1, 2, 3};",
          en: {
            task: "Initialize the array with 1, 2, 3!",
            guide: "Put the values inside curly braces {}!"
          }
        }
      },

      // 배열 퀴즈
      {
        type: "quiz",
        content: {
          question: "int arr[5]; 에서 사용할 수 있는 인덱스 범위는?",
          options: [
            "1 ~ 5",
            "0 ~ 5",
            "0 ~ 4",
            "1 ~ 4"
          ],
          answer: 2,
          explanation: "배열 인덱스는 0부터 시작해요! 크기가 5면 0, 1, 2, 3, 4 — 총 5개!",
          en: {
            question: "What is the valid index range for int arr[5];?",
            options: [
              "1 ~ 5",
              "0 ~ 5",
              "0 ~ 4",
              "1 ~ 4"
            ],
            explanation: "Array indices start at 0! With size 5, valid indices are 0, 1, 2, 3, 4 — 5 total!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'int arr[3] = {10, 20, 30};\ncout << arr[3] << endl;',
          options: [
            "arr[3]은 범위 밖이라 위험해요 (0~2만 가능)",
            "배열 선언이 잘못됐어요",
            "cout 사용법이 틀렸어요"
          ],
          answer: 0,
          explanation: "크기가 3인 배열은 인덱스 0, 1, 2만 가능! arr[3]은 범위 밖이라 엉뚱한 값이 나와요.",
          en: {
            question: "What is wrong with this code?",
            options: [
              "arr[3] is out of bounds — only 0~2 are valid",
              "The array declaration is wrong",
              "cout usage is incorrect"
            ],
            explanation: "An array of size 3 only has indices 0, 1, 2! arr[3] is out of bounds and may produce garbage values."
          }
        }
      },

      // Lv.2: 배열 값 접근
      {
        type: "practice",
        content: {
          level: 2,
          task: "배열의 두 번째 값을 출력해요!",
          guide: "두 번째는 인덱스 1이에요!",
          template: 'int arr[3] = {10, 20, 30};\ncout << arr[___] << endl;',
          answer: "1",
          expect: 'int arr[3] = {10, 20, 30};\ncout << arr[1] << endl;',
          en: {
            task: "Print the second value of the array!",
            guide: "The second element is at index 1!"
          }
        }
      },

      // 파이썬 비교 퀴즈
      {
        type: "quiz",
        content: {
          question: "C++ 배열이 파이썬 리스트와 다른 점은?",
          options: [
            "인덱스가 1부터 시작한다",
            "크기가 고정되어 나중에 추가/삭제 불가",
            "문자열을 저장할 수 없다",
            "중괄호 대신 대괄호를 쓴다"
          ],
          answer: 1,
          explanation: "C 배열은 선언할 때 크기가 정해지고, 나중에 늘리거나 줄일 수 없어요! 파이썬 리스트는 append로 자유롭게 추가 가능하죠.",
          en: {
            question: "How is a C++ array different from a Python list?",
            options: [
              "Indices start at 1",
              "Size is fixed — cannot add or remove elements later",
              "Cannot store strings",
              "Uses curly braces instead of square brackets"
            ],
            explanation: "A C array has a fixed size set at declaration and cannot be resized! Python lists can freely grow with append()."
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "C 배열 기초 완료!",
          emoji: "📦"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "C-style 배열",
          learned: [
            "int arr[5]; — 크기 5짜리 정수 배열",
            "int arr[3] = {1, 2, 3}; — 초기화",
            "arr[0] — 첫 번째 값 (인덱스 0부터!)",
            "크기 고정 — 나중에 추가/삭제 불가",
            "범위 밖 접근 주의! (arr[크기] = 위험)"
          ],
          canDo: "C-style 배열을 선언하고 값에 접근할 수 있어요!",
          emoji: "📦"
        }
      },

      // ==================== CHAPTER 2: vector ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "vector",
          desc: "크기가 자유로운 vector를 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "정수 3개짜리 배열을 선언해요!",
          template: "int arr[___];",
          answer: "3",
          expect: "int arr[3];",
          en: {
            message: "Quick! Remember what we learned earlier?",
            task: "Declare an array of 3 integers!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "vector는 크기가 자동으로 늘어나는 배열이에요! 🚀",
            "파이썬 리스트처럼 push_back으로 값을 추가할 수 있어요!",
            "#include <vector> 가 필요해요."
          ],
          code: '#include <vector>\nusing namespace std;\n\nvector<int> scores;       // 빈 벡터\nscores.push_back(90);     // 90 추가\nscores.push_back(85);     // 85 추가\n// scores = {90, 85}',
          note: "파이썬 list.append() = C++ vector.push_back()"
        }
      },

      // vector 크기 예측
      {
        type: "explain",
        content: {
          lines: [
            "vector의 크기는 .size()로 알 수 있어요!",
            "파이썬의 len()과 같아요."
          ],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {10, 20, 30};\n    v.push_back(40);\n    cout << v.size() << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["3", "4", "40", "에러"],
            answer: 1,
            feedback: "처음 3개 + push_back 1개 = 총 4개! size()는 원소 개수를 돌려줘요."
          }
        }
      },

      // Lv.1: vector 선언
      {
        type: "practice",
        content: {
          level: 1,
          task: "정수형 벡터를 선언해요!",
          guide: "vector<타입> 이름; 형태예요!",
          template: "vector<___> nums;",
          answer: "int",
          expect: "vector<int> nums;",
          en: {
            task: "Declare an integer vector!",
            guide: "Use the form: vector<type> name;"
          }
        }
      },

      // Lv.1: push_back
      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터에 100을 추가해요!",
          guide: "파이썬 append = C++ push_back!",
          template: "nums.___(100);",
          answer: "push_back",
          expect: "nums.push_back(100);",
          en: {
            task: "Add 100 to the vector!",
            guide: "Python's append = C++ push_back!"
          }
        }
      },

      // vector 퀴즈
      {
        type: "quiz",
        content: {
          question: "vector가 C 배열보다 좋은 점은?",
          options: [
            "더 빠르다",
            "크기를 미리 정하지 않아도 된다",
            "인덱스가 1부터 시작한다",
            "메모리를 더 적게 쓴다"
          ],
          answer: 1,
          explanation: "vector는 push_back으로 자유롭게 추가할 수 있어요! C 배열처럼 크기를 미리 정할 필요가 없어요.",
          en: {
            question: "What is the advantage of vector over a C-style array?",
            options: [
              "It is faster",
              "You don't need to specify the size in advance",
              "Indices start at 1",
              "It uses less memory"
            ],
            explanation: "With vector, you can freely add elements using push_back! No need to fix the size upfront like C arrays."
          }
        }
      },

      // Lv.2: size 사용
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터의 크기를 출력해요!",
          guide: "파이썬 len() = C++ .size()!",
          template: 'vector<int> v = {1, 2, 3};\ncout << v.___() << endl;',
          answer: "size",
          expect: 'vector<int> v = {1, 2, 3};\ncout << v.size() << endl;',
          en: {
            task: "Print the size of the vector!",
            guide: "Python's len() = C++ .size()!"
          }
        }
      },

      // at() vs [] 설명
      {
        type: "explain",
        content: {
          lines: [
            "vector는 [] 말고 .at()으로도 접근할 수 있어요!",
            ".at()은 범위 밖이면 에러를 알려줘서 더 안전해요."
          ],
          code: 'vector<int> v = {10, 20, 30};\ncout << v[0] << endl;      // 10 — [] 사용\ncout << v.at(1) << endl;   // 20 — at() 사용\n// v.at(5); → 에러! 범위 밖!',
          note: "[] = 빠르지만 위험 / .at() = 안전하지만 약간 느림"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'vector<int> v;\ncout << v[0] << endl;',
          options: [
            "빈 벡터에서 v[0]을 읽으려 해서 위험해요",
            "vector 선언이 잘못됐어요",
            "cout 사용법이 틀렸어요"
          ],
          answer: 0,
          explanation: "빈 벡터에는 아무 값도 없어요! v[0]은 범위 밖이라 엉뚱한 값이 나오거나 크래시할 수 있어요.",
          en: {
            question: "What is wrong with this code?",
            options: [
              "Trying to read v[0] from an empty vector is dangerous",
              "The vector declaration is wrong",
              "cout usage is incorrect"
            ],
            explanation: "An empty vector has no elements! v[0] is out of bounds and may return garbage or cause a crash."
          }
        }
      },

      // pop_back 설명 + 예측
      {
        type: "explain",
        content: {
          lines: [
            "pop_back()은 맨 뒤 값을 제거해요!",
            "파이썬 list.pop()과 비슷해요."
          ],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {10, 20, 30};\n    v.pop_back();\n    cout << v.size() << endl;\n    cout << v[1] << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["3\n30", "2\n20", "2\n30", "에러"],
            answer: 1,
            feedback: "pop_back()으로 30이 제거! 남은 건 {10, 20} → size=2, v[1]=20!"
          }
        }
      },

      // Lv.2: pop_back
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터의 마지막 값을 제거해요!",
          guide: "파이썬 pop() = C++ pop_back()!",
          template: "v.___;",
          answer: "pop_back()",
          alternateAnswers: ["pop_back ()"],
          expect: "v.pop_back();",
          en: {
            task: "Remove the last element from the vector!",
            guide: "Python's pop() = C++ pop_back()!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "vector 마스터!",
          emoji: "🚀"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "vector",
          learned: [
            "vector<int> v; — 정수형 벡터 선언",
            "v.push_back(값); — 뒤에 추가 (= append)",
            "v.size(); — 크기 확인 (= len())",
            "v[i] 또는 v.at(i); — i번째 값 접근",
            "v.pop_back(); — 맨 뒤 값 제거 (= pop())"
          ],
          canDo: "vector로 크기가 자유로운 배열을 쓸 수 있어요!",
          emoji: "🚀"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 점수 관리",
          desc: "vector로 점수를 관리하는 프로그램을 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! vector에 값 추가하는 법 기억나요?",
          task: "벡터 v에 50을 추가하는 코드를 써봐요!",
          template: null,
          answer: "v.push_back(50);",
          alternateAnswers: [
            "v.push_back(50)"
          ],
          expect: "v.push_back(50);",
          en: {
            message: "Quick! Remember how to add a value to a vector?",
            task: "Write the code to add 50 to vector v!"
          }
        }
      },

      // 프로젝트 예측: 합계
      {
        type: "explain",
        content: {
          lines: [
            "for 루프로 vector의 모든 값을 더할 수 있어요!",
            "파이썬 sum(list)와 비슷한 역할이에요."
          ],
          code: 'vector<int> scores = {90, 85, 100};\nint total = 0;\nfor (int i = 0; i < scores.size(); i++) {\n    total += scores[i];\n}\ncout << total << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["275", "90", "100", "3"],
            answer: 0,
            feedback: "90 + 85 + 100 = 275! for 루프로 모든 값을 더했어요."
          }
        }
      },

      // 프로젝트 Step 1
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "점수를 저장할 벡터를 선언하고 3개의 점수를 추가해요!",
          target: "vector<int> scores;\nscores.push_back(90);\nscores.push_back(85);\nscores.push_back(100);",
          hint: "vector<int> scores; 선언 후 push_back으로 추가!",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {"],
          answer: "vector<int> scores;\nscores.push_back(90);\nscores.push_back(85);\nscores.push_back(100);"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "for 루프로 모든 점수의 합계를 구해요!",
          target: "int total = 0;\nfor (int i = 0; i < scores.size(); i++) {\n    total += scores[i];\n}",
          hint: "int total = 0; 후 for 루프로 total += scores[i];",
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {", "vector<int> scores;\nscores.push_back(90);\nscores.push_back(85);\nscores.push_back(100);"],
          answer: "int total = 0;\nfor (int i = 0; i < scores.size(); i++) {\n    total += scores[i];\n}"
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "평균을 계산해서 출력해요!",
          target: 'cout << "평균: " << total / scores.size() << endl;',
          hint: '합계 / 개수 = 평균! total / scores.size()',
          done: ["#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {", "vector<int> scores = {90, 85, 100};\nint total = 0;\nfor (int i = 0; i < scores.size(); i++) {\n    total += scores[i];\n}"],
          answer: 'cout << "평균: " << total / scores.size() << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "점수 관리 프로그램 완성!",
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
