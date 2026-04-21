import { LessonData } from '../types';

export const lessonCpp9: LessonData = {
    id: "cpp-9",
    title: "배열 & 벡터",
    titleEn: "Array & Vector",
    description: "배열과 vector 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: C-style 배열 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "C-style 배열",
          desc: "고정 크기 배열을 익혀요!",
          en: { title: "C-style Array", desc: "Practice fixed-size arrays!" }
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
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[3] = {10, 20, 30};\n    cout << arr[0] << endl;\n    cout << arr[2] << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["10\n30", "10\n20", "20\n30", "1\n3"],
            answer: 0,
            feedback: "arr[0]은 첫 번째 값 10, arr[2]는 세 번째 값 30이에요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["10\n30", "10\n20", "20\n30", "1\n3"],
              feedback: "arr[0] is the first value 10, arr[2] is the third value 30!"
            }
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

      // Lv.1: 배열 초기화 — 중괄호까지 직접 작성
      {
        type: "practice",
        content: {
          level: 1,
          task: "배열에 1, 2, 3을 넣어요!",
          guide: "{값, 값, 값} 형태로 써요!",
          template: "int arr[3] = ___;",
          answer: "{1, 2, 3}",
          alternateAnswers: ["{1,2,3}"],
          expect: "int arr[3] = {1, 2, 3};",
          en: {
            task: "Initialize the array with 1, 2, 3!",
            guide: "Use the form: {val, val, val}"
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

      // 부분 초기화 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[3] = {1};\n    cout << arr[0] << " " << arr[1] << " " << arr[2] << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["1 1 1", "1 0 0", "1 쓰레기값 쓰레기값", "에러"],
            answer: 1,
            feedback: "일부만 초기화하면 나머지는 자동으로 0! {1} → {1, 0, 0}"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["1 1 1", "1 0 0", "1 garbage garbage", "Error"],
              feedback: "Partial initialization fills the rest with 0! {1} → {1, 0, 0}"
            }
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
          desc: "크기가 자유로운 vector를 배워요!",
          en: { title: "vector", desc: "Learn the resizable vector!" }
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
          lines: [],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {10, 20, 30};\n    v.push_back(40);\n    cout << v.size() << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["3", "4", "40", "에러"],
            answer: 1,
            feedback: "처음 3개 + push_back 1개 = 총 4개! size()는 원소 개수를 돌려줘요."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["3", "4", "40", "Error"],
              feedback: "Initial 3 elements + 1 push_back = 4 total! size() returns the number of elements."
            }
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
          lines: [],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {10, 20, 30};\n    v.pop_back();\n    cout << v.size() << endl;\n    cout << v[1] << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["3\n30", "2\n20", "2\n30", "에러"],
            answer: 1,
            feedback: "pop_back()으로 30이 제거! 남은 건 {10, 20} → size=2, v[1]=20!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["3\n30", "2\n20", "2\n30", "Error"],
              feedback: "pop_back() removes 30! Remaining is {10, 20} → size=2, v[1]=20!"
            }
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
          desc: "vector로 점수를 관리하는 프로그램을 만들어요!",
          en: { title: "Project: Score Manager", desc: "Build a score manager with vector!" }
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! vector에 값 추가하는 법 기억나요?",
          task: "벡터 v에 50을 추가하는 코드를 써봐요!",
          template: null,
          context: "vector<int> v = {10, 20, 30};",
          answer: "v.push_back(50);",
          alternateAnswers: [
            "v.push_back(50)"
          ],
          expect: "v.push_back(50);",
          en: {
            message: "Quick! Remember how to add a value to a vector?",
            task: "Write the code to add 50 to vector v!",
            context: "vector<int> v = {10, 20, 30};"
          }
        }
      },

      // 프로젝트 예측: 합계
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> scores = {90, 85, 100};\nint total = 0;\nfor (int i = 0; i < scores.size(); i++) {\n    total += scores[i];\n}\ncout << total << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["275", "90", "100", "3"],
            answer: 0,
            feedback: "90 + 85 + 100 = 275! for 루프로 모든 값을 더했어요."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["275", "90", "100", "3"],
              feedback: "90 + 85 + 100 = 275! The for loop added all values."
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

      // ==================== CHAPTER 4: 벡터 손에 익히기 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "벡터 손에 익히기",
          desc: "같은 패턴을 반복해서 손이 기억하게 만들어요!",
          en: { title: "Vector Drills", desc: "Repeat patterns until they stick!" }
        }
      },

      // --- 초기화 3가지 방식 ---

      // Drill 1: 빈 벡터 선언 → push_back 3번
      {
        type: "practice",
        content: {
          level: 1,
          task: "빈 정수형 벡터를 선언하고, 10, 20, 30을 차례로 추가해요",
          guide: "vector<int> v; 선언 후 push_back 3번",
          template: "vector<int> v;\nv.___(10);\nv.___(20);\nv.___(30);",
          blanksAnswer: ["push_back", "push_back", "push_back"],
          answer: "vector<int> v;\nv.push_back(10);\nv.push_back(20);\nv.push_back(30);",
          expect: "vector<int> v;\nv.push_back(10);\nv.push_back(20);\nv.push_back(30);",
          en: {
            task: "Declare an empty integer vector, then add 10, 20, 30 one by one",
            guide: "Declare vector<int> v; then push_back 3 times"
          }
        }
      },

      // Drill 2: 초기값 목록으로 선언 (= {})
      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터를 선언하면서 5, 10, 15를 바로 초기화해요",
          hint: "중괄호 {} 안에 값을 쉼표로 구분해요",
          template: "vector<int> v = ___;",
          answer: "{5, 10, 15}",
          expect: "vector<int> v = {5, 10, 15};",
          en: {
            task: "Declare a vector and initialize it with 5, 10, 15",
            hint: "Put values inside curly braces {}, separated by commas"
          }
        }
      },

      // vector(n, val) 초기화 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v(3, 0);\n    cout << v[1] << endl;\n    return 0;\n}',
          predict: {
            question: "v[1]의 값은?",
            options: ["3", "1", "0", "에러"],
            answer: 2,
            feedback: "vector<int> v(3, 0)은 크기 3, 모든 값 0! v = {0, 0, 0}이니까 v[1] = 0"
          },
          en: {
            predict: {
              question: "What's the value of v[1]?",
              options: ["3", "1", "0", "Error"],
              feedback: "vector<int> v(3, 0) = size 3, all values 0! v = {0, 0, 0}, so v[1] = 0"
            }
          }
        }
      },

      // Drill 3: 크기 + 초기값으로 선언 (n, value) — 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "크기 5, 초기값 0인 정수 벡터를 선언해요",
          hint: "소괄호 안에 (크기, 초기값) 순서로 넣어요",
          template: "vector<int> v(___, ___);",
          blanksAnswer: ["5", "0"],
          answer: "vector<int> v(5, 0);",
          expect: "vector<int> v(5, 0);",
          en: {
            task: "Declare a vector of 5 integers, all initialized to 0",
            hint: "Put (size, initial_value) inside parentheses"
          }
        }
      },

      // Drill 3b: 크기 + 초기값 — 괄호까지 전부 직접 작성
      {
        type: "practice",
        content: {
          level: 2,
          task: "정수 4개를 모두 7로 초기화한 벡터 v를 선언해요.",
          hint: "vector<타입> 이름(크기, 초기값);",
          template: null,
          context: "// 이미 준비됨: #include <vector>, int main()\n// 아래에 선언 한 줄만 작성하세요",
          answer: "vector<int> v(4, 7);",
          alternateAnswers: ["vector<int> v(4,7);"],
          expect: "vector<int> v(4, 7);",
          en: {
            task: "Declare a vector v of 4 integers, all set to 7.",
            hint: "vector<type> name(size, value);",
            context: "// Already set up: #include <vector>, int main()\n// Write just the declaration line below"
          }
        }
      },

      // --- push_back / pop_back / size ---

      // Drill 5: push/pop/size 조합
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터에 1, 2, 3을 추가하고 → 마지막 원소 제거 → 크기 출력",
          hint: "마지막 원소 제거 메서드 + 원소 개수 반환 메서드",
          template: "vector<int> v;\nv.push_back(1);\nv.push_back(2);\nv.push_back(3);\nv.___();\ncout << v.___() << endl;",
          blanksAnswer: ["pop_back", "size"],
          answer: "vector<int> v;\nv.push_back(1);\nv.push_back(2);\nv.push_back(3);\nv.pop_back();\ncout << v.size() << endl;",
          expect: "2",
          en: {
            task: "Add 1, 2, 3 to vector → remove last element → print size",
            hint: "Method to remove last element + method to return element count",
            guide: "push_back 3 times → pop_back → size()"
          }
        }
      },

      // --- 반복문 패턴 ---

      // Drill 6: index for문으로 출력
      {
        type: "practice",
        content: {
          level: 2,
          task: "인덱스 for문으로 벡터의 모든 값을 공백으로 구분해 출력해요",
          guide: "반복 횟수는 v.___(), 원소 접근은 v[인덱스 변수]",
          template: "vector<int> v = {3, 1, 4, 1, 5};\nfor (int i = 0; i < v.___(); i++) {\n    cout << v[___] << \" \";\n}",
          blanksAnswer: ["size", "i"],
          answer: "vector<int> v = {3, 1, 4, 1, 5};\nfor (int i = 0; i < v.size(); i++) {\n    cout << v[i] << \" \";\n}",
          expect: "3 1 4 1 5 ",
          en: {
            task: "Use an index for loop to print all vector values separated by spaces",
            guide: "Loop count comes from v.___(), elements accessed with v[index]"
          }
        }
      },

      // Drill 7: range-for로 합계
      {
        type: "practice",
        content: {
          level: 2,
          task: "range-for로 벡터 원소 합계를 구해요 (auto 키워드 사용!)",
          guide: "타입 자동 추론 키워드는? 누적 더하기 연산자는?",
          template: "vector<int> v = {10, 20, 30, 40};\nint sum = 0;\nfor (___ x : v) {\n    sum ___ x;\n}\ncout << sum << endl;",
          blanksAnswer: ["auto", "+= "],
          alternateAnswers: [],
          answer: "vector<int> v = {10, 20, 30, 40};\nint sum = 0;\nfor (auto x : v) {\n    sum += x;\n}\ncout << sum << endl;",
          expect: "100",
          en: {
            task: "Use a range-for loop to sum the vector elements (use auto keyword!)",
            guide: "What keyword auto-deduces types? What operator accumulates values?"
          }
        }
      },

      // Drill 8: 처음부터 직접 쓰기 — push_back + range-for
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 빈 벡터 선언 → 2, 4, 6, 8 추가 → range-for로 전부 출력",
          guide: "vector 선언 → push_back 4번 → for (auto x : v) cout",
          template: null,
          answer: "vector<int> v;\nv.push_back(2);\nv.push_back(4);\nv.push_back(6);\nv.push_back(8);\nfor (auto x : v) {\n    cout << x << \" \";\n}",
          alternateAnswers: [
            "vector<int> v;\nv.push_back(2);\nv.push_back(4);\nv.push_back(6);\nv.push_back(8);\nfor (auto x : v) cout << x << \" \";",
            "vector<int> v = {2, 4, 6, 8};\nfor (auto x : v) {\n    cout << x << \" \";\n}",
            "vector<int> v = {2, 4, 6, 8};\nfor (auto x : v) cout << x << \" \";"
          ],
          expect: "2 4 6 8 ",
          en: {
            task: "Write from scratch! Declare empty vector → add 2, 4, 6, 8 → print all with range-for",
            guide: "declare vector → push_back 4 times → for (auto x : v) cout"
          }
        }
      },

      // cin 입력 → 배열 저장 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[3];\n    for (int i = 0; i < 3; i++) {\n        cin >> arr[i];\n    }\n    cout << arr[1] << endl;\n    return 0;\n}',
          predict: {
            question: "입력이 10 20 30이면 출력은?",
            options: ["10", "20", "30", "에러"],
            answer: 1,
            feedback: "arr[0]=10, arr[1]=20, arr[2]=30 → arr[1]은 20!"
          },
          en: {
            predict: {
              question: "If input is 10 20 30, what's the output?",
              options: ["10", "20", "30", "Error"],
              feedback: "arr[0]=10, arr[1]=20, arr[2]=30 → arr[1] is 20!"
            }
          }
        }
      },

      // Drill 9a: cin → 배열에 저장 (빈칸)
      {
        type: "practice",
        content: {
          level: 2,
          task: "for 루프로 배열에 5개의 정수를 입력받아요!",
          guide: "cin >> arr[인덱스 변수]",
          template: "int arr[5];\nfor (int i = 0; i < 5; i++) {\n    cin >> arr[___];\n}",
          answer: "i",
          expect: "int arr[5];\nfor (int i = 0; i < 5; i++) {\n    cin >> arr[i];\n}",
          en: {
            task: "Use a for loop to read 5 integers into the array!",
            guide: "cin >> arr[index variable]"
          }
        }
      },

      // Drill 9b: cin → 벡터에 push_back (빈칸)
      {
        type: "practice",
        content: {
          level: 2,
          task: "3개의 정수를 입력받아 벡터에 추가해요!",
          guide: "임시 변수에 cin → push_back으로 벡터에 추가",
          template: "vector<int> v;\nfor (int i = 0; i < 3; i++) {\n    int x;\n    cin >> ___;\n    v.___(x);\n}",
          blanksAnswer: ["x", "push_back"],
          answer: "vector<int> v;\nfor (int i = 0; i < 3; i++) {\n    int x;\n    cin >> x;\n    v.push_back(x);\n}",
          expect: "vector<int> v;\nfor (int i = 0; i < 3; i++) {\n    int x;\n    cin >> x;\n    v.push_back(x);\n}",
          en: {
            task: "Read 3 integers and add them to the vector!",
            guide: "cin into temp variable → push_back to vector"
          }
        }
      },

      // Drill 9c: 미리 크기 정한 vector에 cin — v[i] 직접 접근 (빈칸)
      {
        type: "practice",
        content: {
          level: 2,
          task: "크기가 이미 정해진 vector에 3개의 정수를 입력받아 채워요!",
          hint: "미리 크기를 정한 vector는 push_back이 아니라 v[i]로 자리에 직접 덮어써요",
          template: "vector<int> v(3, 0);  // 크기 3, 이미 값 있음\nfor (int i = 0; i < 3; i++) {\n    cin >> v[___];\n}",
          answer: "i",
          expect: "vector<int> v(3, 0);\nfor (int i = 0; i < 3; i++) {\n    cin >> v[i];\n}",
          en: {
            task: "Fill an already-sized vector with 3 integers from cin!",
            hint: "Pre-sized vectors use v[i] (not push_back) to overwrite in place"
          }
        }
      },

      // Drill 9: cin 입력 → 벡터 저장 → 최댓값
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 정수 4개를 cin으로 입력받아 벡터에 저장 → 최댓값 출력\n\n예시) 입력: 3 7 2 9 → 출력: 9",
          guide: "push_back으로 저장 → maxVal = v[0] → for auto 비교",
          hint: "vector<int> v;\nfor(int i=0;i<4;i++){int x;cin>>x;v.push_back(x);}\nint m=v[0];\nfor(auto x:v)if(x>m)m=x;\ncout<<m;",
          template: null,
          answer: "vector<int> v;\nfor (int i = 0; i < 4; i++) {\n    int x;\n    cin >> x;\n    v.push_back(x);\n}\nint maxVal = v[0];\nfor (auto x : v) {\n    if (x > maxVal) maxVal = x;\n}\ncout << maxVal << endl;",
          alternateAnswers: [
            "vector<int> v;\nfor(int i=0;i<4;i++){int x;cin>>x;v.push_back(x);}\nint m=v[0];\nfor(auto x:v)if(x>m)m=x;\ncout<<m<<endl;"
          ],
          expect: "9",
          en: {
            task: "Write from scratch! Read 4 integers via cin → store in vector → print max value\n\nExample) Input: 3 7 2 9 → Output: 9",
            guide: "push_back to store → maxVal = v[0] → for auto compare",
            hint: "vector<int> v;\nfor(int i=0;i<4;i++){int x;cin>>x;v.push_back(x);}\nint m=v[0];\nfor(auto x:v)if(x>m)m=x;\ncout<<m;"
          }
        }
      },

      // ===== sort 드릴 =====

      // Drill 10: sort 결과 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {4, 1, 3, 2};\n    sort(v.begin(), v.end());\n    for (auto x : v) cout << x << " ";\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["4 1 3 2 ", "1 2 3 4 ", "4 3 2 1 ", "에러"],
            answer: 1,
            feedback: "sort(v.begin(), v.end())은 오름차순 정렬! {4,1,3,2} → {1,2,3,4}"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["4 1 3 2 ", "1 2 3 4 ", "4 3 2 1 ", "Error"],
              feedback: "sort(v.begin(), v.end()) sorts ascending! {4,1,3,2} → {1,2,3,4}"
            }
          }
        }
      },

      // Drill 11: sort 빈칸 (begin/end)
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터 전체를 오름차순으로 정렬해요!",
          guide: "sort는 (시작 위치, 끝 표지판) 쌍을 받아요. 벡터는 v.begin()과 v.end()",
          template: "vector<int> v = {5, 2, 8, 1, 9};\nsort(v.___(), v.___());",
          blanksAnswer: ["begin", "end"],
          answer: "vector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end());",
          expect: "vector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end());",
          en: {
            task: "Sort the entire vector in ascending order!",
            guide: "sort takes (start, end) pair. For vector: v.begin() and v.end()"
          }
        }
      },

      // Drill 12: 선언 → sort → 출력 통합
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 벡터 {7, 3, 5, 1, 9}를 오름차순 정렬 후 공백으로 구분해 출력해요",
          guide: "#include <algorithm>이 필요해요! vector 선언 → sort → range-for로 출력",
          template: null,
          answer: "vector<int> v = {7, 3, 5, 1, 9};\nsort(v.begin(), v.end());\nfor (auto x : v) cout << x << \" \";",
          alternateAnswers: [
            "vector<int> v = {7, 3, 5, 1, 9};\nsort(v.begin(), v.end());\nfor (auto x : v) {\n    cout << x << \" \";\n}",
            "vector<int> v={7,3,5,1,9};\nsort(v.begin(),v.end());\nfor(auto x:v)cout<<x<<\" \";"
          ],
          expect: "1 3 5 7 9 ",
          en: {
            task: "Write from scratch! Sort {7, 3, 5, 1, 9} ascending and print space-separated",
            guide: "Need #include <algorithm>! Declare vector → sort → range-for"
          }
        }
      },

      // ===== insert / erase 드릴 =====

      // Drill 13: insert 빈칸 (위치 + 값)
      {
        type: "practice",
        content: {
          level: 2,
          task: "v = {10, 20, 30} 에서 1번 자리에 99를 삽입해 {10, 99, 20, 30}으로 만들어요!",
          guide: "v.insert(위치, 값) — 위치는 v.begin() + 인덱스 (iterator)",
          template: "vector<int> v = {10, 20, 30};\nv.insert(v.begin() + ___, ___);",
          blanksAnswer: ["1", "99"],
          answer: "vector<int> v = {10, 20, 30};\nv.insert(v.begin() + 1, 99);",
          expect: "vector<int> v = {10, 20, 30};\nv.insert(v.begin() + 1, 99);",
          en: {
            task: "From v = {10, 20, 30}, insert 99 at position 1 → {10, 99, 20, 30}",
            guide: "v.insert(position, value) — position is v.begin() + index (iterator)"
          }
        }
      },

      // Drill 14: erase 빈칸 (위치)
      {
        type: "practice",
        content: {
          level: 2,
          task: "v = {10, 20, 30, 40} 에서 2번 자리(값 30)를 삭제해 {10, 20, 40}으로 만들어요!",
          guide: "v.erase(위치) — 위치는 v.begin() + 인덱스",
          template: "vector<int> v = {10, 20, 30, 40};\nv.erase(v.begin() + ___);",
          answer: "2",
          expect: "vector<int> v = {10, 20, 30, 40};\nv.erase(v.begin() + 2);",
          en: {
            task: "From v = {10, 20, 30, 40}, erase position 2 (value 30) → {10, 20, 40}",
            guide: "v.erase(position) — position is v.begin() + index"
          }
        }
      },

      // Drill 15: insert 결과 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    v.insert(v.begin(), 0);\n    for (auto x : v) cout << x << " ";\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["1 2 3 ", "0 1 2 3 ", "1 0 2 3 ", "에러"],
            answer: 1,
            feedback: "v.begin()은 첫 자리(0번). 여기에 0을 삽입하면 원래 원소들이 한 칸씩 밀려 {0, 1, 2, 3}"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["1 2 3 ", "0 1 2 3 ", "1 0 2 3 ", "Error"],
              feedback: "v.begin() is position 0. Inserting 0 there shifts others → {0, 1, 2, 3}"
            }
          }
        }
      },

      // ===== front / back 드릴 =====

      // Drill 16: front + back fillblank
      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터의 첫 원소와 마지막 원소를 줄바꿈으로 출력해요!",
          guide: "첫 원소: front(), 마지막 원소: back()",
          template: "vector<int> v = {10, 20, 30, 40};\ncout << v.___() << endl;\ncout << v.___() << endl;",
          blanksAnswer: ["front", "back"],
          answer: "vector<int> v = {10, 20, 30, 40};\ncout << v.front() << endl;\ncout << v.back() << endl;",
          expect: "10\n40\n",
          en: {
            task: "Print first and last element of the vector (one per line)",
            guide: "First: front(), Last: back()"
          }
        }
      },

      // Drill 17: front + back 통합 (template:null)
      {
        type: "practice",
        content: {
          level: 2,
          task: "처음부터 작성! 벡터 {5, 10, 15, 20, 25}를 선언하고 (첫 원소 + 마지막 원소) 합을 출력해요",
          guide: "v.front() + v.back() 을 그대로 더해서 출력",
          template: null,
          answer: "vector<int> v = {5, 10, 15, 20, 25};\ncout << v.front() + v.back() << endl;",
          alternateAnswers: [
            "vector<int> v={5,10,15,20,25};\ncout<<v.front()+v.back()<<endl;",
            "vector<int> v = {5, 10, 15, 20, 25};\ncout << v.front() + v.back();"
          ],
          expect: "30",
          en: {
            task: "Write from scratch! Declare {5, 10, 15, 20, 25} and print (first + last)",
            guide: "v.front() + v.back()"
          }
        }
      },

      // ===== empty / clear 드릴 =====

      // Drill 18: empty 빈칸 (if 분기)
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터가 비었으면 \"빈 벡터\"를 출력해요!",
          guide: "벡터가 비어있는지 확인하는 메서드는? → empty()",
          template: "vector<int> v;\nif (v.___()) {\n    cout << \"빈 벡터\" << endl;\n}",
          answer: "empty",
          expect: "빈 벡터\n",
          en: {
            task: "If the vector is empty, print \"empty vector\"!",
            guide: "Method to check emptiness? → empty()"
          }
        }
      },

      // Drill 19: clear 후 size 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    v.clear();\n    cout << v.size() << endl;\n    cout << (v.empty() ? "YES" : "NO") << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["5\nNO", "0\nYES", "5\nYES", "0\nNO"],
            answer: 1,
            feedback: "clear()는 모든 원소를 제거해요. size()=0, empty()=true → \"0\" 과 \"YES\""
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["5\nNO", "0\nYES", "5\nYES", "0\nNO"],
              feedback: "clear() removes all elements. size()=0, empty()=true → \"0\" and \"YES\""
            }
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
