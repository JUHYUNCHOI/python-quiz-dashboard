// ============================================
// C++ Lesson 17: STL 알고리즘
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson17Data: LessonData = {
  id: "cpp-17",
  title: "STL 알고리즘",
  emoji: "⚙️",
  description: "sort, find, binary search까지! 강력한 STL 활용법",
  chapters: [
    // ============================================
    // Chapter 1: 탐색 & 수치 알고리즘
    // ============================================
    {
      id: "ch1",
      title: "탐색 & 수치",
      emoji: "🔍",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔍 STL 알고리즘 — C++의 강력한 내장 도구!",
          content: `벡터에서 최솟값 찾기, 특정 값 검색하기... 매번 for문을 직접 짜면 귀찮고 실수하기 쉬워요. C++ STL에는 이런 작업을 **한 줄**로 해결하는 함수들이 있어요! 프로 개발자들이 가장 많이 쓰는 도구예요.

**STL**은 **Standard Template Library**의 약자예요. C++에서 제공하는 강력한 내장 함수 모음이에요!

이런 상황을 생각해봐요:
- 배열에서 최댓값을 찾고 싶어요 → \`max_element()\`
- 특정 값이 몇 개인지 세고 싶어요 → \`count()\`
- 특정 값을 찾고 싶어요 → \`find()\`
- 직접 for문을 쓸 수도 있지만, STL 알고리즘은 **한 줄**이면 돼요!

파이썬에서 \`sorted()\`, \`min()\`, \`max()\`, \`sum()\` 같은 내장 함수를 썼던 것 기억나요? C++에도 비슷한 함수들이 있어요!

\`\`\`cpp
#include <algorithm>  // sort, find, min, max 등
#include <numeric>    // accumulate (합계) 등
\`\`\`

기본적인 알고리즘들을 살펴봐요:

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {5, 2, 8, 1, 9, 3};

// min, max — 두 값 중 작은/큰 값
int a = min(3, 7);    // 3
int b = max(3, 7);    // 7

// min_element, max_element — 범위에서 최소/최대 찾기
auto minIt = min_element(v.begin(), v.end()); // 최소값 위치
auto maxIt = max_element(v.begin(), v.end()); // 최대값 위치
cout << *minIt;  // 1  (역참조로 값 가져오기)
cout << *maxIt;  // 9

// count — 특정 값의 개수
int cnt = count(v.begin(), v.end(), 3);  // 3이 몇 개? → 1
\`\`\`

파이썬과 비교해봐요:

| 파이썬 🐍 | C++ STL ⚡ |
|---|---|
| \`min(3, 7)\` | \`min(3, 7)\` |
| \`max(3, 7)\` | \`max(3, 7)\` |
| \`min(lst)\` | \`*min_element(v.begin(), v.end())\` |
| \`max(lst)\` | \`*max_element(v.begin(), v.end())\` |
| \`lst.count(3)\` | \`count(v.begin(), v.end(), 3)\` |

💡 C++의 STL 알고리즘은 대부분 \`(시작, 끝)\` 형태의 **범위(range)**를 인자로 받아요! \`v.begin()\`과 \`v.end()\`를 항상 넘겨줘야 해요.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "벡터에서 최소값을 찾아봐요!",
          code: "vector<int> v = {4, 1, 7, 2};\nauto it = ___(v.begin(), v.end());\ncout << *it;  // 1 출력",
          fillBlanks: [
            { id: 0, answer: "min_element", options: ["min_element", "max_element", "find", "sort"] }
          ],
          explanation: "min_element(v.begin(), v.end())는 벡터에서 최소값의 iterator를 반환해요! *it로 역참조하면 1이 나와요."
        },
        {
          id: "ch1-find",
          type: "explain",
          title: "🔍 find() — 벡터에서 값 찾기!",
          content: `\`find()\`는 벡터에서 특정 값을 **검색**하는 함수예요!

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {10, 20, 30, 40, 50};

// find(시작, 끝, 찾을값) → iterator 반환
auto it = find(v.begin(), v.end(), 30);

if (it != v.end()) {
    cout << "찾았다! " << *it << endl;       // 찾았다! 30
    cout << "인덱스: " << it - v.begin();     // 인덱스: 2
} else {
    cout << "없다!" << endl;
}
\`\`\`

**핵심 포인트:**
- 값을 찾으면 → 그 위치의 **iterator**를 반환해요
- 값이 없으면 → \`v.end()\`를 반환해요
- \`v.end()\`와 비교해서 존재 여부를 확인해요!

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
lst = [10, 20, 30, 40, 50]
if 30 in lst:          # 존재 확인
    idx = lst.index(30) # 인덱스 구하기
\`\`\`

**C++ ⚡:**
\`\`\`cpp
auto it = find(v.begin(), v.end(), 30);
if (it != v.end()) {         // 존재 확인
    int idx = it - v.begin(); // 인덱스 구하기
}
\`\`\`

| 파이썬 🐍 | C++ STL ⚡ |
|---|---|
| \`30 in lst\` | \`find(...) != v.end()\` |
| \`lst.index(30)\` | \`it - v.begin()\` |
| 없으면 ValueError | 없으면 \`v.end()\` 반환 |

⚠️ **find()가 값을 못 찾으면?** end()를 반환해요. 항상 확인하세요:
\`\`\`cpp
auto it = find(v.begin(), v.end(), 42);
if (it != v.end()) { /* 찾음 */ }
\`\`\`

💡 \`find()\`는 앞에서부터 순서대로 찾아요. 시간 복잡도는 **O(n)**이에요!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "find() 결과 예측!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {5, 10, 15, 20, 25};\n    auto it = find(v.begin(), v.end(), 15);\n    if (it != v.end()) {\n        cout << it - v.begin();\n    } else {\n        cout << -1;\n    }\n    return 0;\n}",
          options: ["15", "2", "3", "-1"],
          answer: 1,
          explanation: "find()로 15를 찾으면 인덱스 2의 위치를 가리키는 iterator가 반환돼요. it - v.begin()은 2예요! (0부터 세니까: 5→0, 10→1, 15→2)"
        },
        {
          id: "ch1-accum",
          type: "explain",
          title: "🔍 accumulate() & 유틸리티!",
          content: `\`accumulate()\`는 벡터의 모든 값을 **합산**하는 함수예요! 파이썬의 \`sum()\`과 같아요.

\`\`\`cpp
#include <numeric>    // accumulate는 여기에!
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {1, 2, 3, 4, 5};

// accumulate(시작, 끝, 초기값)
int total = accumulate(v.begin(), v.end(), 0);
cout << total;  // 15
\`\`\`

⚠️ \`accumulate()\`는 \`<algorithm>\`이 아니라 **\`<numeric>\`**에 있어요! 헤더를 잘 확인해요.

**다른 유용한 함수들:**

\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};

// reverse — 순서 뒤집기
reverse(v.begin(), v.end());
// v = {5, 4, 3, 2, 1}

// swap — 두 변수의 값 교환
int a = 10, b = 20;
swap(a, b);
// a=20, b=10
\`\`\`

파이썬과 비교해봐요:

| 파이썬 🐍 | C++ STL ⚡ |
|---|---|
| \`sum(lst)\` | \`accumulate(v.begin(), v.end(), 0)\` |
| \`lst.reverse()\` | \`reverse(v.begin(), v.end())\` |
| \`a, b = b, a\` | \`swap(a, b)\` |

💡 세 번째 인자(초기값)에 \`0\`을 넣으면 정수 합, \`0.0\`을 넣으면 실수 합이 돼요!`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 벡터 종합 분석!",
          content: `벡터에서 최대값, 최소값, 합계를 구하고, 특정 값이 있는지 찾아보는 코드를 실행해봐요!`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {3, 7, 1, 9, 4, 6};

    int minVal = *min_element(v.begin(), v.end());
    int maxVal = *max_element(v.begin(), v.end());
    int total = accumulate(v.begin(), v.end(), 0);

    cout << "Min: " << minVal << endl;
    cout << "Max: " << maxVal << endl;
    cout << "Sum: " << total << endl;

    auto it = find(v.begin(), v.end(), 9);
    if (it != v.end()) {
        cout << "Found 9 at index " << it - v.begin() << endl;
    }

    return 0;
}`,
          expectedOutput: `Min: 1
Max: 9
Sum: 30
Found 9 at index 3`
        },
        {
          id: "ch1-lambda",
          type: "explain",
          title: "🔍 find_if & count_if — 조건으로 검색!",
          content: `\`find()\`는 정확한 값을 찾지만, 조건으로 검색하고 싶을 때는 **\`find_if()\`**와 **\`count_if()\`**를 사용해요!

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {3, 7, 1, 8, 4, 9, 2};

// 조건: 5보다 큰 첫 번째 원소 찾기
auto it = find_if(v.begin(), v.end(), [](int x) {
    return x > 5;
});
if (it != v.end()) cout << *it;  // 7

// 조건: 짝수 개수 세기
int cnt = count_if(v.begin(), v.end(), [](int x) {
    return x % 2 == 0;
});
cout << cnt;  // 3 (8, 4, 2)
\`\`\`

**람다 표현식 (Lambda Expression)** — C++11+

\`[](매개변수) { return 조건식; }\` 형태의 **이름 없는 함수**예요!

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`filter(lambda x: x > 5, lst)\` | \`find_if(..., [](int x){ return x > 5; })\` |
| \`len([x for x in lst if x % 2 == 0])\` | \`count_if(..., [](int x){ return x % 2 == 0; })\` |

람다는 레슨 15의 \`sort()\`에서도 이미 사용했어요! STL 알고리즘 어디서든 조건 함수를 넘길 수 있어요.`,
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "STL 기초!",
          content: "`accumulate()` 함수가 들어있는 헤더 파일은?",
          options: [
            "<algorithm>",
            "<numeric>",
            "<vector>",
            "<cmath>"
          ],
          answer: 1,
          explanation: "accumulate()는 <numeric> 헤더에 있어요! sort, find, min_element 등은 <algorithm>에 있지만, 합계 관련 함수는 <numeric>이에요."
        }
      ]
    },
    // ============================================
    // Chapter 2: 이진탐색 (Binary Search)
    // ============================================
    {
      id: "ch2",
      title: "이진탐색 (Binary Search)",
      emoji: "🎯",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🎯 binary_search() — 초고속 탐색!",
          content: `USACO 대회에서 10만 개의 데이터를 검색해야 한다고 생각해보세요. find()로 하나씩 찾으면 **시간 초과**! binary_search는 20번만에 찾아요.

\`find()\`는 처음부터 끝까지 하나씩 확인해서 **O(n)**이에요. 만약 데이터가 **정렬되어 있다면**, 훨씬 빠르게 찾을 수 있어요!

- find()는 처음부터 끝까지 하나씩 봐요: O(n)
- binary_search()는 반씩 줄여가요: O(log n)
- **1백만 개**에서 찾을 때: find()는 ~100만 번, binary_search()는 ~20번!
- ⚠️ 대신 **정렬이 먼저** 필요해요. 정렬 비용이 크니까, 여러 번 검색할 때만 이득이에요.

**이진탐색(Binary Search)**은 정렬된 데이터에서 **O(log n)**에 탐색해요!

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {1, 3, 5, 7, 9, 11};
// ⚠️ 반드시 정렬되어 있어야 해요!

bool found = binary_search(v.begin(), v.end(), 7);
// found = true

bool notFound = binary_search(v.begin(), v.end(), 6);
// notFound = false
\`\`\`

**중요한 규칙:** \`binary_search()\`를 쓰려면 데이터가 **반드시 정렬**되어 있어야 해요!

\`\`\`cpp
vector<int> unsorted = {5, 3, 1, 9, 7};
// sort 먼저!
sort(unsorted.begin(), unsorted.end());
// 이제 {1, 3, 5, 7, 9}
bool ok = binary_search(unsorted.begin(), unsorted.end(), 5);
// ok = true
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
import bisect
lst = [1, 3, 5, 7, 9, 11]
# 파이썬에는 binary_search가 없어서 bisect로 구현
idx = bisect.bisect_left(lst, 7)
found = (idx < len(lst) and lst[idx] == 7)  # True
\`\`\`

**C++ ⚡:**
\`\`\`cpp
bool found = binary_search(v.begin(), v.end(), 7);  // True
\`\`\`

C++이 훨씬 간단하죠?

| 탐색 방법 | 시간 복잡도 | 정렬 필요? |
|---|---|---|
| \`find()\` | O(n) | 아니오 |
| \`binary_search()\` | O(log n) | **예!** |

💡 데이터가 정렬되어 있다면 항상 \`binary_search()\`를 쓰는 게 효율적이에요!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "이진탐색 전에 정렬부터 해요!",
          code: "vector<int> v = {4, 2, 7, 1, 9};\n___(v.begin(), v.end());  // 먼저 정렬!\nbool found = binary_search(v.begin(), v.end(), 7);",
          fillBlanks: [
            { id: 0, answer: "sort", options: ["sort", "find", "reverse", "binary_search"] }
          ],
          explanation: "binary_search()를 사용하기 전에 반드시 sort()로 정렬해야 해요! 정렬 안 하면 결과가 틀릴 수 있어요."
        },
        {
          id: "ch2-bounds",
          type: "explain",
          title: "🎯 lower_bound() & upper_bound()!",
          content: `\`binary_search()\`는 "있다/없다"만 알려줘요. **위치**가 필요하면 \`lower_bound()\`와 \`upper_bound()\`를 써요!

\`\`\`cpp
vector<int> v = {1, 3, 5, 5, 5, 7, 9};
//                0  1  2  3  4  5  6  (인덱스)

// lower_bound: target 이상인 첫 위치
auto lb = lower_bound(v.begin(), v.end(), 5);
cout << lb - v.begin();  // 2 (첫 번째 5의 위치)

// upper_bound: target 초과인 첫 위치
auto ub = upper_bound(v.begin(), v.end(), 5);
cout << ub - v.begin();  // 5 (5 다음 원소의 위치)

// 5의 개수 = upper_bound - lower_bound
cout << ub - lb;  // 3 (5가 3개!)
\`\`\`

시각적으로 보면:

\`\`\`
v = {1, 3, 5, 5, 5, 7, 9}
          ^        ^
          lb       ub
     lower_bound  upper_bound
     (이상)       (초과)
\`\`\`

파이썬의 bisect 모듈과 비교해봐요:

| 파이썬 🐍 | C++ STL ⚡ |
|---|---|
| \`bisect.bisect_left(lst, 5)\` | \`lower_bound(v.begin(), v.end(), 5) - v.begin()\` |
| \`bisect.bisect_right(lst, 5)\` | \`upper_bound(v.begin(), v.end(), 5) - v.begin()\` |

\`\`\`cpp
// 인덱스 구하기
int idx = lower_bound(v.begin(), v.end(), 5) - v.begin();
\`\`\`

💡 USACO Silver에서 \`lower_bound()\`는 정말 자주 쓰여요! 좌표 압축, 범위 쿼리 등에 필수예요!`
        },
        {
          id: "ch2-practice-bounds",
          type: "predict" as const,
          title: "70점 이상인 학생 수 구하기",
          content: "정렬된 점수 배열에서 70점 이상인 학생이 몇 명인지 구해보세요.",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {45, 55, 67, 72, 78, 85, 91, 98};\n    auto it = lower_bound(scores.begin(), scores.end(), 70);\n    cout << scores.end() - it << \"명\";\n}",
          options: ["3명", "4명", "5명", "6명"],
          answer: 2,
          explanation: "lower_bound는 70 '이상'인 첫 위치를 찾아요. 72가 첫 번째! 거기서 end()까지 세면 72, 78, 85, 91, 98 = 5명이에요."
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "lower_bound() 결과 예측!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {10, 20, 30, 40, 50};\n    auto it = lower_bound(v.begin(), v.end(), 25);\n    cout << it - v.begin();\n    return 0;\n}",
          options: ["1", "2", "3", "5"],
          answer: 1,
          explanation: "lower_bound는 25 '이상'인 첫 위치를 찾아요! v = {10, 20, 30, 40, 50}에서 25 이상인 첫 값은 30이고, 인덱스는 2예요. 그래서 it - v.begin()은 2가 출력돼요!"
        },
        {
          id: "ch2-unique",
          type: "explain",
          title: "🎯 unique() & erase() — 중복 제거!",
          content: `중복 제거가 필요한 상황: 데이터 파일에서 읽은 값에 중복이 있어요. set을 쓸 수도 있지만, 원래 순서를 유지하면서 중복만 제거하고 싶을 때 erase-unique 패턴이 필요해요!

\`unique()\`는 **연속된 중복**을 제거하는 함수예요. \`erase()\`와 함께 써서 완전히 중복을 제거해요!

\`\`\`cpp
vector<int> v = {3, 1, 4, 1, 5, 3, 3};

// Step 1: 정렬 (unique는 연속 중복만 제거하니까!)
sort(v.begin(), v.end());
// v = {1, 1, 3, 3, 3, 4, 5}

// Step 2: unique + erase 콤보!
v.erase(unique(v.begin(), v.end()), v.end());
// v = {1, 3, 4, 5}
\`\`\`

**어떻게 작동하는지 단계별로 봐요:**

\`\`\`
정렬 후:  {1, 1, 3, 3, 3, 4, 5}
unique():  {1, 3, 4, 5, ?, ?, ?}
                        ^-- unique가 반환하는 위치
erase():  {1, 3, 4, 5}  // ?들이 삭제됨!
\`\`\`

파이썬과 비교해봐요:

**파이썬 🐍:**
\`\`\`python
lst = [3, 1, 4, 1, 5, 3, 3]
result = sorted(set(lst))  # [1, 3, 4, 5]
\`\`\`

**C++ ⚡:**
\`\`\`cpp
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
\`\`\`

파이썬이 더 간단하지만, C++의 방식은 **좌표 압축(coordinate compression)**에서 매우 유용해요!

\`\`\`cpp
// 좌표 압축 패턴
vector<int> coords = {100, 500, 100, 200, 500};
sort(coords.begin(), coords.end());
coords.erase(unique(coords.begin(), coords.end()), coords.end());
// coords = {100, 200, 500}
// lower_bound로 압축된 인덱스를 구할 수 있어요!
\`\`\`

💡 \`sort → unique → erase\` 패턴은 경시대회에서 정말 자주 나와요! 외워두면 좋아요!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 정렬 + lower_bound로 값 찾기!",
          content: `정렬되지 않은 벡터를 정렬하고, 특정 값의 위치를 찾는 코드를 실행해봐요!`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {50, 20, 40, 10, 30};

    sort(v.begin(), v.end());

    cout << "Sorted: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    int target = 30;
    auto it = lower_bound(v.begin(), v.end(), target);

    if (it != v.end() && *it == target) {
        cout << target << " found at index " << it - v.begin() << endl;
    } else {
        cout << target << " not found" << endl;
    }

    return 0;
}`,
          expectedOutput: `Sorted: 10 20 30 40 50
30 found at index 2`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "binary_search 규칙!",
          content: "`binary_search()`를 사용하기 전에 반드시 해야 하는 것은?",
          options: [
            "벡터의 크기를 확인한다",
            "벡터를 정렬한다",
            "벡터를 reverse한다",
            "#include <numeric>을 추가한다"
          ],
          answer: 1,
          explanation: "binary_search()는 정렬된 데이터에서만 정확하게 작동해요! 반드시 sort()로 정렬한 후에 사용해야 해요."
        }
      ]
    },
    // ============================================
    // Chapter 3: 정리 퀴즈
    // ============================================
    {
      id: "ch3",
      title: "정리 퀴즈",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "find() 동작!",
          content: `이 코드의 출력은?

\`\`\`cpp
vector<int> v = {10, 20, 30, 40};
auto it = find(v.begin(), v.end(), 50);
if (it == v.end()) {
    cout << "X";
} else {
    cout << *it;
}
\`\`\``,
          options: [
            "50",
            "40",
            "X",
            "에러"
          ],
          answer: 2,
          explanation: "50은 벡터에 없으니까 find()가 v.end()를 반환해요! it == v.end()가 true이므로 X가 출력돼요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "binary_search 전제조건!",
          content: `이 코드의 결과는?

\`\`\`cpp
vector<int> v = {5, 3, 1, 4, 2};  // 정렬 안 됨!
bool result = binary_search(v.begin(), v.end(), 3);
\`\`\``,
          options: [
            "항상 true",
            "항상 false",
            "결과를 신뢰할 수 없다",
            "컴파일 에러"
          ],
          answer: 2,
          explanation: "binary_search()는 정렬된 데이터를 전제로 해요! 정렬되지 않은 벡터에서는 결과가 맞을 수도, 틀릴 수도 있어서 신뢰할 수 없어요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "lower_bound vs upper_bound!",
          content: `v = {1, 3, 5, 5, 5, 7}일 때, lower_bound(5)와 upper_bound(5)의 인덱스 차이는?`,
          options: [
            "1",
            "2",
            "3",
            "5"
          ],
          answer: 2,
          explanation: "lower_bound(5)는 인덱스 2 (첫 번째 5), upper_bound(5)는 인덱스 5 (7의 위치)를 가리켜요. 차이는 5-2=3이고, 이건 5의 개수와 같아요!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "accumulate 사용!",
          content: `이 코드의 출력은?

\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};
cout << accumulate(v.begin(), v.end(), 10);
\`\`\``,
          options: [
            "15",
            "25",
            "10",
            "에러"
          ],
          answer: 1,
          explanation: "accumulate의 세 번째 인자는 초기값이에요! 10 + 1 + 2 + 3 + 4 + 5 = 25가 출력돼요."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 레슨 17 완료!",
          content: `## 🏆 오늘 배운 것 정리!

### 🔍 탐색 & 수치 알고리즘
- \`min()\`, \`max()\` — 두 값 비교
- \`min_element()\`, \`max_element()\` — 범위에서 최소/최대
- \`find()\` — 값 찾기 (O(n))
- \`accumulate()\` — 합계 (\`<numeric>\` 헤더!)
- \`reverse()\`, \`swap()\` — 유틸리티

### 🎯 이진탐색
- \`binary_search()\` — true/false만 반환
- \`lower_bound()\` — target **이상**인 첫 위치
- \`upper_bound()\` — target **초과**인 첫 위치
- **반드시 정렬 후 사용!**

### 중복 제거 패턴
- \`sort → unique → erase\` — 좌표 압축의 핵심!

## ✅ 핵심 요약표

| 함수 | 헤더 | 반환 | 정렬 필요? |
|---|---|---|---|
| \`find()\` | \`<algorithm>\` | iterator | 아니오 |
| \`binary_search()\` | \`<algorithm>\` | bool | **예** |
| \`lower_bound()\` | \`<algorithm>\` | iterator | **예** |
| \`upper_bound()\` | \`<algorithm>\` | iterator | **예** |
| \`accumulate()\` | \`<numeric>\` | 값 | 아니오 |

🚀 **다음 레슨에서는 stack, queue & deque를 배워볼 거예요!** 자료구조의 세계로 들어가요!`
        }
      ]
    }
  ]
}
