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

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
