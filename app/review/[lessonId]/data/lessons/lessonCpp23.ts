import { LessonData } from '../types';

export const lessonCpp23: LessonData = {
    id: "cpp-23",
    title: "sort 마스터",
    description: "sort 기초부터 lower_bound까지 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: sort 기초 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "sort 기초",
          desc: "sort()와 커스텀 정렬을 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "sort()는 벡터나 배열을 정렬해요! 📊",
            "기본은 오름차순(작은 → 큰 순서)!",
            "파이썬의 .sort()와 비슷하지만, begin/end를 넘겨줘요."
          ],
          code: '#include <algorithm>\n#include <vector>\nusing namespace std;\n\nvector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end());\n// v = {1, 2, 5, 8, 9}',
          result: "1 2 5 8 9",
          note: "sort(시작, 끝) — <algorithm> 헤더 필요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "내림차순 정렬은 greater<int>()를 세 번째 인자로!",
          ],
          code: 'vector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end(), greater<int>());\ncout << v[0] << " " << v[4] << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["1 9", "9 1", "5 2"],
            answer: 1,
            feedback: "greater<int>()는 내림차순! 가장 큰 9가 앞, 가장 작은 1이 뒤!"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터를 오름차순으로 정렬해요!",
          guide: "sort(시작, 끝) 형태!",
          template: "sort(v.___(), v.___());",
          answer: "begin",
          blanksAnswer: ["begin", "end"],
          expect: "sort(v.begin(), v.end());",
          en: {
            task: "Sort a vector in ascending order!",
            guide: "Use the form sort(begin, end)!"
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "sort()를 쓰려면 어떤 헤더가 필요할까요?",
          options: ["<iostream>", "<vector>", "<algorithm>", "<sort>"],
          answer: 2,
          explanation: "sort()는 <algorithm> 헤더에 들어있어요!",
          en: {
            question: "Which header is required to use sort()?",
            options: ["<iostream>", "<vector>", "<algorithm>", "<sort>"],
            explanation: "sort() is found in the <algorithm> header!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "람다(lambda)로 정렬 기준을 직접 만들 수 있어요! 🎯",
            "파이썬의 key=lambda와 비슷해요!",
            "true를 리턴하면 첫 번째 인자가 앞에 와요."
          ],
          code: 'vector<string> names = {"banana", "apple", "cherry"};\nsort(names.begin(), names.end(), [](string a, string b) {\n    return a.size() < b.size();  // 짧은 것부터\n});\n// names = {"apple", "banana", "cherry"}',
          result: "apple banana cherry",
          note: "람다 = 이름 없는 함수! []가 캡처, ()가 매개변수!"
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터를 내림차순으로 정렬해요!",
          guide: "세 번째 인자로 greater를 써요!",
          template: "sort(v.begin(), v.end(), ___<int>());",
          answer: "greater",
          expect: "sort(v.begin(), v.end(), greater<int>());",
          en: {
            task: "Sort a vector in descending order!",
            guide: "Use greater as the third argument!"
          }
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: '#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 1, 2};\n    sort(v.begin(), v.end());\n    return 0;\n}',
          options: [
            "#include <algorithm>이 빠져서",
            "vector가 비어서",
            "sort()의 인자가 틀려서"
          ],
          answer: 0,
          explanation: "sort()는 <algorithm> 헤더에 있어요! #include <algorithm>을 추가해야 해요.",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "#include <algorithm> is missing",
              "The vector is empty",
              "The arguments to sort() are wrong"
            ],
            explanation: "sort() is in the <algorithm> header! You need to add #include <algorithm>."
          }
        }
      },

      {
        type: "reward",
        content: {
          message: "sort 기초 완벽!",
          emoji: "📊"
        }
      },

      {
        type: "summary",
        content: {
          num: 1,
          title: "sort 기초",
          learned: [
            "sort(begin, end) — 오름차순 정렬",
            "sort(begin, end, greater<타입>()) — 내림차순",
            "람다로 커스텀 정렬 기준 만들기",
            "<algorithm> 헤더 필요!"
          ],
          canDo: "sort()로 벡터를 오름차순/내림차순/커스텀 정렬할 수 있어요!",
          emoji: "📊"
        }
      },

      // ==================== CHAPTER 2: lower_bound & stable_sort ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "lower_bound & stable_sort",
          desc: "이진 탐색과 안정 정렬을 복습해요!"
        }
      },

      {
        type: "interleaving",
        content: {
          message: "잠깐! sort 사용법 기억나요?",
          task: "벡터 v를 오름차순 정렬하는 코드를 써봐요!",
          template: null,
          answer: "sort(v.begin(), v.end());",
          alternateAnswers: [
            "sort(v.begin(), v.end())"
          ],
          expect: "sort(v.begin(), v.end());",
          en: {
            message: "Quick check! Do you remember how to use sort?",
            task: "Write the code to sort vector v in ascending order!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "lower_bound()는 정렬된 배열에서 이진 탐색! 🔍",
            "찾는 값 이상인 첫 번째 위치(반복자)를 반환해요.",
            "파이썬의 bisect.bisect_left()와 같아요!"
          ],
          code: 'vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.begin(), v.end(), 5);\ncout << *it << endl;         // 5\ncout << (it - v.begin());    // 인덱스: 2',
          result: "5\n2",
          note: "반드시 정렬된 배열에서만 사용! * 로 값 꺼내기!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "upper_bound()는 찾는 값 초과인 첫 위치!",
            "lower_bound ~ upper_bound 범위 = 해당 값의 구간"
          ],
          code: 'vector<int> v = {1, 3, 5, 5, 5, 7};\nauto lo = lower_bound(v.begin(), v.end(), 5);\nauto hi = upper_bound(v.begin(), v.end(), 5);\ncout << (hi - lo);  // 5의 개수: 3',
          predict: {
            question: "출력 결과는?",
            options: ["2", "3", "5"],
            answer: 1,
            feedback: "5가 인덱스 2,3,4에 3개 있어요! hi - lo = 3!"
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "lower_bound()를 쓰기 전에 반드시 해야 하는 것은?",
          options: ["벡터를 비워야 함", "벡터를 정렬해야 함", "헤더를 <utility>로 해야 함"],
          answer: 1,
          explanation: "lower_bound는 이진 탐색이라 반드시 정렬된 배열에서만 동작해요! sort() 먼저!",
          en: {
            question: "What must you do before using lower_bound()?",
            options: ["Empty the vector", "Sort the vector", "Change the header to <utility>"],
            explanation: "lower_bound is a binary search and only works on sorted arrays! sort() first!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "stable_sort()는 같은 값이면 원래 순서를 유지해요! 🔒",
            "sort()는 같은 값의 순서가 바뀔 수 있어요.",
            "sort+unique 패턴으로 중복을 제거할 수도 있어요!"
          ],
          code: '// 중복 제거 패턴!\nvector<int> v = {3, 1, 2, 1, 3, 2};\nsort(v.begin(), v.end());\nv.erase(unique(v.begin(), v.end()), v.end());\n// v = {1, 2, 3}',
          note: "sort → unique → erase 순서 암기!"
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "lower_bound로 값 5의 인덱스를 구해봐요!",
          guide: "lower_bound(begin, end, 값) - begin = 인덱스!",
          template: "auto it = ___(v.begin(), v.end(), 5);\nint idx = it - v.begin();",
          answer: "lower_bound",
          expect: "auto it = lower_bound(v.begin(), v.end(), 5);\nint idx = it - v.begin();",
          en: {
            task: "Use lower_bound to find the index of value 5!",
            guide: "lower_bound(begin, end, value) - begin = index!"
          }
        }
      },

      {
        type: "reward",
        content: {
          message: "lower_bound & stable_sort 마스터!",
          emoji: "🔍"
        }
      },

      {
        type: "summary",
        content: {
          num: 2,
          title: "lower_bound & stable_sort",
          learned: [
            "lower_bound(begin, end, val) — val 이상인 첫 위치",
            "upper_bound(begin, end, val) — val 초과인 첫 위치",
            "hi - lo = 해당 값의 개수",
            "sort+unique+erase — 중복 제거 패턴"
          ],
          canDo: "이진 탐색으로 빠르게 값을 찾고 중복을 제거할 수 있어요!",
          emoji: "🔍"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 학생 점수 정렬",
          desc: "pair 벡터로 학생 점수를 정렬해요!"
        }
      },

      {
        type: "interleaving",
        content: {
          message: "잠깐! lower_bound 기억나요?",
          task: "정렬된 벡터 v에서 값 7 이상의 첫 위치 찾기!",
          template: "auto it = ___(v.begin(), v.end(), 7);",
          answer: "lower_bound",
          expect: "auto it = lower_bound(v.begin(), v.end(), 7);",
          en: {
            message: "Quick check! Do you remember lower_bound?",
            task: "Find the first position in sorted vector v that is >= 7!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "pair<string, int> 벡터를 점수 기준으로 정렬해봐요!",
            "람다에서 .second를 비교하면 점수 기준 정렬!"
          ],
          code: 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};\nsort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });\ncout << students[0].first << ": " << students[0].second << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["철수: 85", "영희: 92", "민수: 78"],
            answer: 1,
            feedback: "내림차순(>)이니까 가장 높은 점수 92점인 영희가 맨 앞!"
          }
        }
      },

      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "헤더와 using namespace std를 써봐요!",
          target: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;",
          hint: "iostream, vector, algorithm 세 개!",
          done: [],
          answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;"
        }
      },

      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "pair 벡터에 학생 3명을 넣어요!",
          target: 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};',
          hint: 'vector<pair<string, int>> students = { {"이름", 점수}, ... };',
          done: ["#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {"],
          answer: 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};'
        }
      },

      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "점수 내림차순으로 정렬하는 sort를 써봐요!",
          target: "sort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });",
          hint: "람다에서 a.second > b.second 로 내림차순!",
          done: ["#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {", 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};'],
          answer: "sort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });"
        }
      },

      {
        type: "reward",
        content: {
          message: "학생 점수 정렬 프로젝트 완성!",
          emoji: "🏆"
        }
      },

      {
        type: "done",
        content: {}
      }
    ]
};
