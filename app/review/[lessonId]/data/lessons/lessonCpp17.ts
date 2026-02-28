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
          lines: [
            "STL 알고리즘은 <algorithm> 헤더에 들어있어요! 🧰",
            "벡터, 배열 등에 바로 쓸 수 있는 편리한 함수들!",
            "먼저 find()로 값을 찾아봐요."
          ],
          code: '#include <algorithm>\n#include <vector>\nusing namespace std;\n\nvector<int> v = {10, 20, 30, 40, 50};\nauto it = find(v.begin(), v.end(), 30);\nif (it != v.end()) {\n    cout << "찾았다! " << *it << endl;\n}',
          result: "찾았다! 30",
          note: "find(시작, 끝, 값) — 못 찾으면 end() 리턴!"
        }
      },

      // count 설명
      {
        type: "explain",
        content: {
          lines: [
            "count()는 특정 값이 몇 개인지 세요! 🔢",
            "파이썬의 list.count()와 같은 역할!"
          ],
          code: 'vector<int> v = {1, 2, 3, 2, 4, 2, 5};\nint cnt = count(v.begin(), v.end(), 2);\ncout << "2의 개수: " << cnt << endl;',
          result: "2의 개수: 3",
          note: "count(시작, 끝, 값) — 해당 값의 개수 리턴!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "find()가 못 찾으면 어떤 값을 리턴할까요?"
          ],
          code: 'vector<int> v = {1, 2, 3};\nauto it = find(v.begin(), v.end(), 99);\nif (it == v.end()) {\n    cout << "못 찾음!" << endl;\n} else {\n    cout << "찾음!" << endl;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["찾음!", "못 찾음!", "에러"],
            answer: 1,
            feedback: "99는 벡터에 없으니까 find()는 end()를 리턴해요!"
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
          expect: "auto it = find(v.begin(), v.end(), 30);"
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
          expect: "int cnt = count(v.begin(), v.end(), 2);"
        }
      },

      // binary_search 설명
      {
        type: "explain",
        content: {
          lines: [
            "binary_search()는 정렬된 벡터에서 빠르게 찾아요! ⚡",
            "true/false를 리턴해요 (있다/없다).",
            "반드시 정렬된 상태여야 써요!"
          ],
          code: 'vector<int> v = {1, 2, 3, 4, 5};  // 정렬되어 있어야!\nbool found = binary_search(v.begin(), v.end(), 3);\ncout << found << endl;  // 1 (true)',
          result: "1",
          note: "binary_search = 이진 탐색! 정렬 필수!"
        }
      },

      // lower_bound 설명
      {
        type: "explain",
        content: {
          lines: [
            "lower_bound()는 값 이상인 첫 위치를 찾아요! 📍",
            "정렬된 벡터에서 삽입 위치를 찾을 때 유용해요."
          ],
          code: 'vector<int> v = {10, 20, 30, 40, 50};\nauto it = lower_bound(v.begin(), v.end(), 25);\ncout << *it << endl;  // 25 이상인 첫 값',
          result: "30",
          note: "lower_bound(시작, 끝, 값) — 값 이상인 첫 위치!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "binary_search()를 쓰기 전에 반드시 해야 하는 것은?",
          options: [
            "벡터를 비워야 한다",
            "벡터를 정렬해야 한다",
            "벡터 크기를 확인해야 한다",
            "벡터를 복사해야 한다"
          ],
          answer: 1,
          explanation: "binary_search(이진 탐색)는 정렬된 데이터에서만 올바르게 동작해요! 먼저 sort() 하세요."
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는 뭘까요?",
          code: 'vector<int> v = {5, 2, 8, 1, 9};\nbool found = binary_search(v.begin(), v.end(), 8);\ncout << found << endl;',
          options: [
            "벡터가 정렬되지 않아서 결과가 틀릴 수 있다",
            "binary_search의 인자가 틀렸다",
            "bool 타입에 저장할 수 없다"
          ],
          answer: 0,
          explanation: "binary_search는 정렬된 벡터에서만 정확해요! 먼저 sort(v.begin(), v.end());를 해야 해요."
        }
      },

      // Lv.2: binary_search 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "정렬된 벡터에서 값 3이 있는지 이진 탐색해요!",
          guide: "binary_search(시작, 끝, 값) — true/false 리턴!",
          template: "bool found = ___(v.begin(), v.end(), 3);",
          answer: "binary_search",
          expect: "bool found = binary_search(v.begin(), v.end(), 3);"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "탐색 알고리즘 마스터!",
          emoji: "🔍"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "탐색 & 카운팅",
          learned: [
            "find(begin, end, 값) — 값 찾기 (못 찾으면 end)",
            "count(begin, end, 값) — 값 개수 세기",
            "binary_search(begin, end, 값) — 이진 탐색 (정렬 필수!)",
            "lower_bound(begin, end, 값) — 값 이상인 첫 위치",
            "모두 <algorithm> 헤더 필요!"
          ],
          canDo: "STL 알고리즘으로 벡터에서 값을 찾고 셀 수 있어요!",
          emoji: "🔍"
        }
      },

      // ==================== CHAPTER 2: 변환 & 집계 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "변환 & 집계",
          desc: "accumulate, min/max_element, reverse, unique를 복습해요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "벡터에서 값을 찾는 STL 함수 이름은?",
          template: "auto it = ___(v.begin(), v.end(), 30);",
          answer: "find",
          expect: "auto it = find(v.begin(), v.end(), 30);"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "accumulate()로 합계를 구해요! ➕",
            "<numeric> 헤더가 필요해요 (algorithm이 아님!).",
            "파이썬의 sum()과 비슷해요."
          ],
          code: '#include <numeric>\nusing namespace std;\n\nvector<int> v = {1, 2, 3, 4, 5};\nint total = accumulate(v.begin(), v.end(), 0);\ncout << "합계: " << total << endl;',
          result: "합계: 15",
          note: "accumulate(시작, 끝, 초기값) — <numeric> 헤더!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "accumulate의 세 번째 인자는 초기값이에요!",
            "초기값부터 시작해서 더해가요."
          ],
          code: 'vector<int> v = {1, 2, 3};\nint result = accumulate(v.begin(), v.end(), 100);\ncout << result << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["6", "100", "106"],
            answer: 2,
            feedback: "초기값 100에서 시작! 100 + 1 + 2 + 3 = 106!"
          }
        }
      },

      // min/max_element 설명
      {
        type: "explain",
        content: {
          lines: [
            "min_element와 max_element로 최소/최대를 찾아요! 📈",
            "반복자(iterator)를 리턴하니까 *로 값을 꺼내요."
          ],
          code: 'vector<int> v = {5, 2, 8, 1, 9};\nauto minIt = min_element(v.begin(), v.end());\nauto maxIt = max_element(v.begin(), v.end());\ncout << "최소: " << *minIt << endl;\ncout << "최대: " << *maxIt << endl;',
          result: "최소: 1\n최대: 9",
          note: "*반복자 = 값 꺼내기! (포인터와 같은 원리)"
        }
      },

      // Lv.1: accumulate 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터의 합계를 구해요!",
          guide: "accumulate(시작, 끝, 초기값) 형태!",
          template: "int total = ___(v.begin(), v.end(), 0);",
          answer: "accumulate",
          expect: "int total = accumulate(v.begin(), v.end(), 0);"
        }
      },

      // Lv.1: max_element 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터에서 최대값을 찾아요!",
          guide: "*max_element(시작, 끝) 형태!",
          template: "int mx = *___(v.begin(), v.end());",
          answer: "max_element",
          expect: "int mx = *max_element(v.begin(), v.end());"
        }
      },

      // reverse, unique 설명
      {
        type: "explain",
        content: {
          lines: [
            "reverse()는 순서를 뒤집고, unique()는 연속 중복을 제거! 🔄",
            "unique()는 정렬 후에 써야 제대로 동작해요."
          ],
          code: 'vector<int> v = {3, 1, 2};\nreverse(v.begin(), v.end());\n// v = {2, 1, 3}\n\nvector<int> v2 = {1, 1, 2, 2, 3};\nauto last = unique(v2.begin(), v2.end());\nv2.erase(last, v2.end());\n// v2 = {1, 2, 3}',
          note: "reverse = 뒤집기, unique + erase = 중복 제거!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "accumulate()는 어떤 헤더에 있을까요?",
          options: ["<algorithm>", "<numeric>", "<cmath>", "<vector>"],
          answer: 1,
          explanation: "accumulate는 <numeric> 헤더에 있어요! 다른 STL 알고리즘은 <algorithm>!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는 뭘까요?",
          code: 'vector<int> v = {3, 1, 2, 1, 3};\nauto last = unique(v.begin(), v.end());\nv.erase(last, v.end());\n// 기대: {1, 2, 3}',
          options: [
            "정렬하지 않아서 unique가 제대로 안 됨",
            "erase의 인자가 틀렸다",
            "unique는 vector에 못 쓴다"
          ],
          answer: 0,
          explanation: "unique()는 '연속' 중복만 제거해요! 먼저 sort()로 정렬해야 모든 중복이 제거돼요."
        }
      },

      // Lv.2: reverse 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터를 뒤집어요!",
          guide: "reverse(시작, 끝) 형태!",
          template: "___(v.begin(), v.end());",
          answer: "reverse",
          expect: "reverse(v.begin(), v.end());"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "STL 알고리즘 마스터!",
          emoji: "🧰"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "변환 & 집계",
          learned: [
            "accumulate(begin, end, 초기값) — 합계 (<numeric>!)",
            "*min_element(begin, end) — 최소값",
            "*max_element(begin, end) — 최대값",
            "reverse(begin, end) — 뒤집기",
            "unique() — 연속 중복 제거 (정렬 필수!)"
          ],
          canDo: "STL 알고리즘으로 합계, 최대/최소, 뒤집기, 중복 제거를 할 수 있어요!",
          emoji: "🧰"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 숫자 분석기",
          desc: "STL 알고리즘으로 숫자 벡터를 분석해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 합계를 구하는 함수 기억나요?",
          task: "벡터의 합계를 구하는 코드를 써봐요!",
          template: "int total = ___(v.begin(), v.end(), 0);",
          answer: "accumulate",
          expect: "int total = accumulate(v.begin(), v.end(), 0);"
        }
      },

      // 종합 예측
      {
        type: "explain",
        content: {
          lines: [
            "여러 STL 알고리즘을 조합해서 숫자를 분석해봐요!",
            "합계, 최대, 최소, 개수를 한 번에!"
          ],
          code: 'vector<int> v = {3, 7, 1, 9, 4, 7, 2};\nint total = accumulate(v.begin(), v.end(), 0);\nint cnt7 = count(v.begin(), v.end(), 7);\ncout << "합계: " << total << ", 7의 개수: " << cnt7 << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["합계: 33, 7의 개수: 2", "합계: 33, 7의 개수: 1", "합계: 26, 7의 개수: 2"],
            answer: 0,
            feedback: "3+7+1+9+4+7+2 = 33, 7은 2번 나와요!"
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
