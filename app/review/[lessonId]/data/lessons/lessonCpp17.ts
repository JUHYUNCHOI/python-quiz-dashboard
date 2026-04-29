import { LessonData } from '../types';

export const lessonCpp17: LessonData = {
    id: "cpp-17",
    title: "STL 알고리즘",
    description: "STL 알고리즘 함수 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 탐색 & 카운팅 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "탐색 & 카운팅",
          desc: "find, count, binary_search를 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {1, 2, 3, 2, 4, 2, 5};\nint cnt = count(v.begin(), v.end(), 2);\ncout << "2의 개수: " << cnt << endl;',
          result: "2의 개수: 3",
          note: "count(시작, 끝, 값) — 해당 값의 개수 리턴!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {1, 2, 3};\nauto it = find(v.begin(), v.end(), 99);\nif (it == v.end()) {\n    cout << "못 찾음!" << endl;\n} else {\n    cout << "찾음!" << endl;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["찾음!", "못 찾음!", "에러"],
            answer: 1,
            feedback: "99는 벡터에 없으니까 find()는 end()를 리턴해요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["Found!", "Not found!", "Error"],
              feedback: "99 is not in the vector, so find() returns end()!"
            }
          }
        }
      },

      // Lv.1: find 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터에서 값 30을 찾아요!",
          guide: "find(시작, 끝, 찾을 값) 형태!",
          template: "auto it = ___(v.begin(), v.end(), 30);",
          answer: "find",
          expect: "auto it = find(v.begin(), v.end(), 30);",
          en: {
            task: "Find the value 30 in a vector!",
            guide: "Use the form find(begin, end, value)!"
          }
        }
      },

      // Lv.1: count 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터에서 값 2가 몇 개인지 세요!",
          guide: "count(시작, 끝, 값) 형태!",
          template: "int cnt = ___(v.begin(), v.end(), 2);",
          answer: "count",
          expect: "int cnt = count(v.begin(), v.end(), 2);",
          en: {
            task: "Count how many times the value 2 appears in the vector!",
            guide: "Use the form count(begin, end, value)!"
          }
        }
      },

      // binary_search 설명
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <numeric>\nusing namespace std;\n\nvector<int> v = {1, 2, 3, 4, 5};\nint total = accumulate(v.begin(), v.end(), 0);\ncout << "합계: " << total << endl;',
          result: "합계: 15",
          note: "accumulate(시작, 끝, 초기값) — <numeric> 헤더!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {1, 2, 3};\nint result = accumulate(v.begin(), v.end(), 100);\ncout << result << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["6", "100", "106"],
            answer: 2,
            feedback: "초기값 100에서 시작! 100 + 1 + 2 + 3 = 106!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["6", "100", "106"],
              feedback: "Starting from the initial value 100: 100 + 1 + 2 + 3 = 106!"
            }
          }
        }
      },

      // min/max_element 설명
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {3, 7, 1, 9, 4, 7, 2};\nint total = accumulate(v.begin(), v.end(), 0);\nint cnt7 = count(v.begin(), v.end(), 7);\ncout << "합계: " << total << ", 7의 개수: " << cnt7 << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["합계: 33, 7의 개수: 2", "합계: 33, 7의 개수: 1", "합계: 26, 7의 개수: 2"],
            answer: 0,
            feedback: "3+7+1+9+4+7+2 = 33, 7은 2번 나와요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["sum: 33, count of 7: 2", "sum: 33, count of 7: 1", "sum: 26, count of 7: 2"],
              feedback: "3+7+1+9+4+7+2 = 33, and 7 appears 2 times!"
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
          task: "헤더와 using namespace std를 써봐요!",
          target: "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;",
          hint: "iostream, vector, algorithm, numeric 네 개!",
          done: [],
          answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "합계와 평균을 구하는 코드를 써봐요!",
          target: "int total = accumulate(v.begin(), v.end(), 0);\ndouble avg = (double)total / v.size();",
          hint: "accumulate로 합계, 합계/size로 평균!",
          done: ["#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 7, 1, 9, 4};"],
          answer: "int total = accumulate(v.begin(), v.end(), 0);\ndouble avg = (double)total / v.size();"
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "최대값과 최소값을 출력하는 코드를 써봐요!",
          target: 'cout << "최대: " << *max_element(v.begin(), v.end()) << endl;\ncout << "최소: " << *min_element(v.begin(), v.end()) << endl;',
          hint: "*max_element, *min_element를 써요!",
          done: ["#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 7, 1, 9, 4};", "int total = accumulate(v.begin(), v.end(), 0);\ndouble avg = (double)total / v.size();\ncout << \"합계: \" << total << \", 평균: \" << avg << endl;"],
          answer: 'cout << "최대: " << *max_element(v.begin(), v.end()) << endl;\ncout << "최소: " << *min_element(v.begin(), v.end()) << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "숫자 분석기 프로젝트 완성!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 2: count_if & 심화 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "count_if & 심화 STL 함수",
          desc: "count_if, max/min_element, all_of/any_of를 익혀요!"
        }
      },

      // quiz: count_if
      {
        type: "quiz",
        content: {
          question: "count_if(v.begin(), v.end(), [](int x){ return x > 3; }) 가 하는 일은?",
          options: [
            "3보다 큰 원소를 모두 삭제한다",
            "3보다 큰 원소의 개수를 센다",
            "3보다 큰 첫 번째 원소를 찾는다",
            "3보다 큰 원소를 오름차순 정렬한다"
          ],
          answer: 1,
          explanation: "count_if는 조건(람다)을 만족하는 원소의 개수를 반환해요!",
          en: {
            question: "What does count_if(v.begin(), v.end(), [](int x){ return x > 3; }) do?",
            options: [
              "Deletes all elements greater than 3",
              "Counts elements greater than 3",
              "Finds the first element greater than 3",
              "Sorts elements greater than 3 in ascending order"
            ],
            explanation: "count_if returns the number of elements that satisfy the condition (lambda)!"
          }
        }
      },

      // practice: count_if 사용
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터에서 짝수의 개수를 세요!",
          guide: "count_if는 두 번째 인자로 조건 함수(람다)를 받아서 조건을 만족하는 원소의 수를 세!",
          template: "vector<int> v = {1,2,3,4,5,6};\nint evens = ___(v.begin(), v.end(),\n    [](int x){ return x % 2 == 0; });\ncout << evens << endl;",
          answer: "count_if",
          expect: "vector<int> v = {1,2,3,4,5,6};\nint evens = count_if(v.begin(), v.end(),\n    [](int x){ return x % 2 == 0; });\ncout << evens << endl;",
          en: {
            task: "Count the number of even numbers in a vector!",
            guide: "count_if takes a condition function (lambda) as its third argument and counts elements that satisfy it!"
          }
        }
      },

      // quiz: accumulate 초기값
      {
        type: "quiz",
        content: {
          question: "accumulate(v.begin(), v.end(), 10) 에서 10의 역할은?",
          options: [
            "최대 10개만 더한다",
            "합산의 시작값 (초기값)",
            "10보다 큰 원소만 더한다",
            "결과를 10으로 나눈다"
          ],
          answer: 1,
          explanation: "accumulate의 세 번째 인자는 초기값! 초기값부터 시작해서 모든 원소를 더해요.",
          en: {
            question: "What is the role of 10 in accumulate(v.begin(), v.end(), 10)?",
            options: [
              "Sums at most 10 elements",
              "Starting value (initial value) for the sum",
              "Only sums elements greater than 10",
              "Divides the result by 10"
            ],
            explanation: "The third argument to accumulate is the initial value! It starts from the initial value and adds all elements."
          }
        }
      },

      // practice: accumulate
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터 원소의 합계를 accumulate로 구해요!",
          guide: "범위와 초기값을 인자로 받아서 모든 원소를 합산하는 STL 함수야. <numeric> 헤더 필요!",
          template: "vector<int> v = {10, 20, 30, 40};\nint sum = ___(v.begin(), v.end(), 0);\ncout << sum << endl;",
          answer: "accumulate",
          expect: "vector<int> v = {10, 20, 30, 40};\nint sum = accumulate(v.begin(), v.end(), 0);\ncout << sum << endl;",
          en: {
            task: "Calculate the sum of vector elements using accumulate!",
            guide: "This STL function takes a range and an initial value to sum all elements. Requires the <numeric> header!"
          }
        }
      },

      // predict: max_element
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {3, 1, 7, 2, 9, 4};\ncout << *max_element(v.begin(), v.end()) << endl;\ncout << *min_element(v.begin(), v.end()) << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["7\n1", "9\n1", "9\n2", "7\n2"],
            answer: 1,
            feedback: "max는 9, min은 1! *를 붙여야 실제 값이 나와요 (이터레이터 역참조)"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["7\n1", "9\n1", "9\n2", "7\n2"],
              feedback: "max is 9, min is 1! Add * to dereference the iterator and get the actual value"
            }
          }
        }
      },

      // errorQuiz: find 반환값 처리
      {
        type: "errorQuiz",
        content: {
          question: "find()의 결과를 제대로 쓰지 못한 코드는?",
          code: 'vector<int> v = {1, 2, 3};\nint result = find(v.begin(), v.end(), 2);\ncout << result << endl;',
          options: [
            "find()는 이터레이터를 반환하므로 auto로 받아야 함",
            "find()는 벡터에서 사용할 수 없음",
            "v.begin()이 아닌 v.start()를 써야 함"
          ],
          answer: 0,
          explanation: "find()는 이터레이터(iterator)를 반환해요! int가 아닌 auto it = find(...)로 받고, *it로 값을 꺼내야 해요.",
          en: {
            question: "Which code incorrectly handles the return value of find()?",
            options: [
              "find() returns an iterator, so it must be stored in auto",
              "find() cannot be used with vectors",
              "Should use v.start() instead of v.begin()"
            ],
            explanation: "find() returns an iterator, not an int! Store it as auto it = find(...) and use *it to get the value."
          }
        }
      },

      // practice: max_element
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터에서 최솟값을 출력해요!",
          guide: "*min_element(시작, 끝) — * 로 역참조해야 값이 나와요!",
          template: "vector<int> v = {5, 3, 8, 1, 6};\ncout << *___(v.begin(), v.end()) << endl;",
          answer: "min_element",
          expect: "vector<int> v = {5, 3, 8, 1, 6};\ncout << *min_element(v.begin(), v.end()) << endl;",
          en: {
            task: "Print the minimum value from a vector!",
            guide: "*min_element(begin, end) — dereference with * to get the actual value!"
          }
        }
      },

      // interleaving: cpp-16 map 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! map 기억나요?",
          task: "map에서 키 \"apple\"에 해당하는 값을 가져와요!",
          template: 'map<string, int> m = {{"apple", 3}, {"banana", 5}};\ncout << m___["apple"] << endl;',
          answer: "",
          expect: 'map<string, int> m = {{"apple", 3}, {"banana", 5}};\ncout << m["apple"] << endl;',
          en: {
            message: "Quick! Remember map?",
            task: "Get the value for key \"apple\" from a map!"
          }
        }
      },

      // practice: find + count_if 조합
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터에서 5 이상인 원소의 개수를 count_if로 세요!",
          guide: "count_if의 람다에서 비교 연산자 빈칸을 채워봐! '이상'이면 어떤 연산자를 쓸까?",
          template: "vector<int> v = {3, 7, 1, 9, 4, 6, 2};\nint cnt = count_if(v.begin(), v.end(),\n    [](int x){ return x ___ 5; });\ncout << cnt << endl;",
          answer: ">=",
          expect: "vector<int> v = {3, 7, 1, 9, 4, 6, 2};\nint cnt = count_if(v.begin(), v.end(),\n    [](int x){ return x >= 5; });\ncout << cnt << endl;",
          en: {
            task: "Count elements that are 5 or greater in a vector using count_if!",
            guide: "Fill in the comparison operator in the lambda! What operator means 'greater than or equal to'?"
          }
        }
      },

      // errorQuiz: accumulate 헤더 누락
      {
        type: "errorQuiz",
        content: {
          question: "accumulate를 사용하는 코드가 컴파일 오류인 이유는?",
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    int s = accumulate(v.begin(), v.end(), 0);\n    cout << s;\n}',
          options: [
            "<numeric> 헤더가 없어서",
            "<algorithm> 헤더가 없어서",
            "초기값을 0으로 쓰면 안 돼서"
          ],
          answer: 0,
          explanation: "accumulate는 <numeric> 헤더에 있어요! #include <numeric> 을 추가해야 해요.",
          en: {
            question: "Why does this code using accumulate fail to compile?",
            options: [
              "Missing <numeric> header",
              "Missing <algorithm> header",
              "Cannot use 0 as the initial value"
            ],
            explanation: "accumulate is in the <numeric> header! Add #include <numeric>."
          }
        }
      },

      // practice: 처음부터 작성 — 통계 출력
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 벡터 {4, 7, 2, 9, 1, 5}의 합계, 최댓값, 최솟값을 각 줄에 출력해요",
          guide: "합계는 accumulate, 최대/최소는 max_element/min_element로 구해! 이터레이터를 역참조하는 것 잊지 마!",
          template: null,
          answer: "vector<int> v = {4, 7, 2, 9, 1, 5};\nint sum = accumulate(v.begin(), v.end(), 0);\ncout << sum << endl;\ncout << *max_element(v.begin(), v.end()) << endl;\ncout << *min_element(v.begin(), v.end()) << endl;",
          expect: "28\n9\n1",
          en: {
            task: "Write from scratch! Print the sum, max, and min of vector {4, 7, 2, 9, 1, 5}, each on a separate line",
            guide: "Use accumulate for sum, and max_element/min_element for max/min! Don't forget to dereference the iterator!"
          }
        }
      },

      // interleaving: cpp-16 set 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! set에서 특정 값이 있는지 확인하는 방법?",
          task: "set에서 값 5가 있는지 count로 확인하는 코드를 완성해요!",
          template: "set<int> s = {1, 3, 5, 7};\nif (s.___(5)) {\n    cout << \"있어요!\" << endl;\n}",
          answer: "count",
          expect: "set<int> s = {1, 3, 5, 7};\nif (s.count(5)) {\n    cout << \"있어요!\" << endl;\n}",
          en: {
            message: "Quick! Remember how to check if a value exists in a set?",
            task: "Complete the code to check if value 5 exists in a set using count!",
            template: "set<int> s = {1, 3, 5, 7};\nif (s.___(5)) {\n    cout << \"found!\" << endl;\n}",
            expect: "set<int> s = {1, 3, 5, 7};\nif (s.count(5)) {\n    cout << \"found!\" << endl;\n}",
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
