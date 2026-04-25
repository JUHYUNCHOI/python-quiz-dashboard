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
          title: "🔍 직접 짜기 vs STL — 한 줄로 끝내기",
          content: `벡터에 점수가 들어있어요. 최댓값을 구하려면 어떻게 짜죠?

\`\`\`cpp
vector<int> scores = {72, 95, 68, 88, 100, 55};
\`\`\`

지금까지 배운 걸로 짜면 이렇게:

\`\`\`cpp
int maxVal = scores[0];
for (int i = 1; i < scores.size(); i++) {
    if (scores[i] > maxVal) maxVal = scores[i];
}
\`\`\`

5 줄. 어렵진 않은데… 매번 이렇게 쓰면 귀찮죠. 그리고 합 구하기, 값 찾기, 평균 — 다 비슷한 패턴이라 매번 비슷한 코드를 새로 짜야 해요.

C++ 만든 사람들도 그렇게 생각했어요. **이렇게 자주 쓰는 작업은 미리 만들어두자.** 그게 **STL (Standard Template Library)** 이에요.

같은 작업, STL 로 한 줄:

\`\`\`cpp
int maxVal = *max_element(scores.begin(), scores.end());
\`\`\`

5 줄짜리 for 가 한 줄로 줄어요. 다른 작업도 비슷:

| 하고 싶은 것 | 직접 짜기 | STL |
|---|---|---|
| 최댓값 | for + if 비교 | \`*max_element(...)\` |
| 합계 | for + 누적 | \`accumulate(...)\` |
| 값 찾기 | for + 검색 | \`find(...)\` |
| 개수 세기 | for + 카운터 | \`count(...)\` |

파이썬에서 \`min()\`, \`max()\`, \`sum()\` 같은 내장 함수를 썼던 것 — C++ 의 STL 도 같은 발상이에요. "자주 쓰는 건 이미 만들어둠."

\`\`\`cpp
#include <algorithm>  // find, min, max, sort 등
#include <numeric>    // accumulate 등 (별도 헤더 주의)
\`\`\`

> 💡 이번 챕터에선 자주 쓰는 STL 도구 5-6 개를 익히고, 챕터 2 에선 **더 빠른 검색법**(이진탐색)까지 봐요.

근데 STL 쓰려면 살짝 낯선 게 하나 등장해요 — \`v.begin()\`, \`v.end()\` 라는 표현. 다음 페이지에서 그게 뭔지부터 짚을게요 👇`
        },
        {
          id: "ch1-iterator",
          type: "explain",
          title: "📍 iterator — 벡터를 가리키는 커서",
          component: "iteratorVisualizer",
          content: `방금 봤던 코드:

\`\`\`cpp
*max_element(scores.begin(), scores.end());
\`\`\`

여기 \`scores.begin()\`, \`scores.end()\` 가 뭐냐면 — **iterator** 라는 거예요.

> 🎯 한 줄: **iterator = 벡터 안의 한 자리를 가리키는 커서.**

쉽게 비유하면 글 쓸 때 깜빡이는 그 커서 ` + '`|`' + `. 어떤 위치를 가리키고 있고, 한 칸씩 옮길 수 있어요.

\`\`\`
v = [10, 20, 30, 40, 50]
     ↑                    ↑
  v.begin()            v.end()  ← 마지막 다음 자리!
\`\`\`

- \`v.begin()\` → **첫 번째 원소** 를 가리킴
- \`v.end()\` → **마지막 원소 다음** 자리. (마지막 자체가 아님 ⚠️)

왜 마지막이 아니라 그 *다음* 일까요? **"여기까지" 라는 끝 신호**예요. \`[begin, end)\` — 시작은 포함, 끝은 제외. 파이썬 \`range(0, 5)\` 에서 5 가 안 들어가는 거랑 비슷해요.

### iterator 로 뭘 할 수 있나요?

\`\`\`cpp
auto it = v.begin();   // 첫 칸을 가리키는 커서
cout << *it;            // 10  ← * 로 값 꺼내기
it++;                   // 다음 칸으로
cout << *it;            // 20
\`\`\`

| 표현 | 의미 |
|---|---|
| \`v.begin()\` | 첫 자리 |
| \`v.end()\` | 마지막 다음 자리 (끝 신호) |
| \`*it\` | iterator 가 가리키는 값 |
| \`it++\` | 다음 칸으로 이동 |
| \`it - v.begin()\` | 인덱스 (몇 번째 자리?) |

> 💡 포인터 레슨에서 배운 \`*\` 로 값 꺼내고 \`++\` 로 옮기던 그 감각 — iterator 도 똑같이 통해요. 사실 iterator 는 포인터의 친척이라고 생각해도 돼요.

STL 함수들은 거의 다 \`(begin, end)\` 쌍을 받아서 그 범위에서 작업해요. **이 한 가지 패턴만 익히면** STL 사용법이 다 비슷해 보일 거예요.

아래 시뮬에서 직접 커서를 옮겨보면서 \`*it\`, \`begin()\`, \`end()\` 가 어떻게 변하는지 확인해봐요 👇`
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
          content: `방금 배운 iterator 가 본격적으로 등장할 차례예요. \`find()\` 는 벡터에서 특정 값이 어디 있는지 찾아주는 함수인데, **그 위치를 iterator 로 돌려줘요**.

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

⚠️ \`accumulate()\`는 \`<algorithm>\`이 아니라 \`<numeric>\`에 있어요! 헤더를 잘 확인해요.

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
          id: "ch1-lambda",
          type: "explain",
          title: "🤔 정확한 값 말고 *조건* 으로 찾고 싶다면?",
          content: `지금까지 \`find(...)\` 로 **정확한 값** 을 찾았어요. 그런데 학생들 점수에서 이런 걸 찾고 싶다면?

> "**70점 이상인 첫 번째 점수** 찾기"
> "**짝수가 몇 개** 인지 세기"

\`find()\` 로는 안 돼요. 정확한 값만 찾을 수 있으니까요. 이런 **조건** 으로 검색할 땐 \`find_if()\`, \`count_if()\` 를 써요. 이름 끝의 \`_if\` 가 "조건이 붙어있다" 는 뜻이에요.

근데 한 가지 문제 — "70 이상" 이라는 **조건** 을 함수에 어떻게 넘기죠? 숫자 하나면 그냥 인자로 넘기면 되는데, 조건은 코드 한 덩어리잖아요.

→ 그래서 등장하는 게 **lambda** 예요. **이름 없이 즉석에서 만드는 작은 함수.**

\`\`\`cpp
[](int x) { return x >= 70; }
//└┘ └────┘ └──────────────┘
//  capture  parameter   body
\`\`\`

\`[]\` 로 시작하면 lambda 라는 신호. \`(int x)\` 는 일반 함수처럼 매개변수, \`{ return ... }\` 는 본문. **이름이 없을 뿐 보통 함수랑 똑같아요.**

> 💡 파이썬의 \`lambda x: x >= 70\` 이랑 같은 발상이에요. 문법만 살짝 달라요.

이제 find_if / count_if 에 lambda 를 넘겨봐요:

\`\`\`cpp
vector<int> scores = {55, 72, 68, 88, 41, 95};

// 70 이상인 첫 번째 점수 찾기
auto it = find_if(scores.begin(), scores.end(), [](int x) {
    return x >= 70;
});
if (it != scores.end()) cout << *it;  // 72

// 짝수 개수 세기
int evenCnt = count_if(scores.begin(), scores.end(), [](int x) {
    return x % 2 == 0;
});
cout << evenCnt;  // 3 (72, 68, 88)
\`\`\`

| 함수 | 무슨 조건? | 반환 |
|---|---|---|
| \`find(begin, end, 값)\` | "이 값 있어?" (정확) | 첫 위치 iterator |
| \`find_if(begin, end, lambda)\` | lambda 가 true 인 것 | 첫 위치 iterator |
| \`count(begin, end, 값)\` | "이 값이 몇 개?" (정확) | 개수 |
| \`count_if(begin, end, lambda)\` | lambda 가 true 인 것 몇 개? | 개수 |

> 💡 \`_if\` 가 붙으면 **세 번째 인자가 값 대신 조건(lambda)** 이라고 기억하면 끝.

람다는 정렬이나 다른 STL 알고리즘에서도 똑같이 쓰여요 (다음 챕터부터 자주 만나요).`,
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 벡터 종합 분석!",
          content: `STL 함수들을 활용해서 벡터의 최솟값, 최댓값, 합계를 구하고 특정 값의 위치를 찾는 코드를 작성해봐요!`,
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

    cout << minVal << endl;
    cout << maxVal << endl;
    cout << total << endl;

    auto it = find(v.begin(), v.end(), 9);
    if (it != v.end()) {
        cout << it - v.begin() << endl;
    }

    return 0;
}`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {3, 7, 1, 9, 4, 6};

    // min_element, max_element, accumulate로 최솟값, 최댓값, 합계를 구해서 출력하세요
    // 출력: 1, 9, 30

    // find()로 9의 위치(인덱스)를 찾아서 출력하세요
    // 출력: 3

    return 0;
}`,
          hint: "*min_element(v.begin(), v.end())처럼 앞에 *를 붙여서 역참조해요. accumulate는 <numeric> 헤더에 있어요. find()는 iterator를 반환하고 it - v.begin()이 인덱스예요",
          expectedOutput: `1
9
30
3`
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
          title: "🎯 더 빠른 탐색이 필요할 때 — binary_search()",
          content: `상상해봐요 — 학생 100만 명의 학번 명단에서 특정 학번 한 명을 찾아야 해요. \`find()\` 로 하면 어떻게 될까요?

\`find()\` 는 **앞에서부터 한 명씩** 확인해요. 운이 나쁘면 100만 번 비교. 컴퓨터한테도 부담스러운 양이에요.

근데 만약 학번이 **이미 정렬되어 있다면?** 사람도 그렇잖아요 — 사전에서 단어 찾을 때 "ㄱ"부터 한 페이지씩 안 넘기죠. 가운데 펴서 "내가 찾는 단어가 앞에 있나 뒤에 있나" 보고, 그 절반만 다시 가운데로… 이런 식으로 빨리 좁혀요.

이게 바로 **이진탐색(binary search)**. 매번 **반씩** 잘라내서 좁히는 방법.

| 방법 | 동작 | 1백만 개에서 |
|---|---|---|
| \`find()\` | 앞에서 한 칸씩 | 최대 100만 번 비교 |
| \`binary_search()\` | 가운데 잘라서 반씩 | 최대 ~20 번 비교 |

차이가 어마어마하죠? 단, **정렬되어 있어야** 가능해요. 정렬 안 된 데이터에선 "가운데 보면 앞쪽인지 뒤쪽인지" 자체를 알 수 없으니까요.

> 💡 그래서 한 번 검색하고 끝낼 거면 정렬 비용이 더 클 수 있어요. **여러 번 검색** 할 때 이득이 커져요.

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
          title: "🎯 lower_bound / upper_bound — 위치까지 알려줘요",
          component: "lowerUpperBoundVisualizer",
          content: `\`binary_search()\` 는 "있다/없다" 만 알려줘요. 그런데 실제로 풀고 싶은 문제는 보통 위치까지 필요해요. 예를 들어:

> "70 점 **이상** 인 학생 몇 명?"
> "특정 점수가 **몇 개** 있나?"
> "이 값을 정렬 유지하면서 **어디 끼워넣어야** 하지?"

이런 질문에 답해주는 게 \`lower_bound\` 와 \`upper_bound\`. 둘 다 이진탐색을 쓰니까 **빠르고**, 둘 다 **정렬된 데이터** 가 전제예요.

### 두 함수의 차이는 *이상* vs *초과*

\`\`\`cpp
vector<int> v = {1, 3, 5, 5, 5, 7, 9};
\`\`\`

- \`lower_bound(v.begin(), v.end(), 5)\` → **5 이상** 인 첫 위치 (≥ 5)
- \`upper_bound(v.begin(), v.end(), 5)\` → **5 초과** 인 첫 위치 (> 5)

말로만 보면 헷갈리니까, 아래 시뮬에서 target 값을 바꿔보면서 두 화살표가 어떻게 움직이는지 직접 확인해봐요 👇

### 코드로는 이렇게 써요

\`\`\`cpp
auto lb = lower_bound(v.begin(), v.end(), 5);
auto ub = upper_bound(v.begin(), v.end(), 5);

cout << lb - v.begin();   // 2  ← 인덱스 구하는 패턴
cout << ub - v.begin();   // 5
cout << ub - lb;          // 3  ← 5 가 몇 개인지
\`\`\`

(둘 다 iterator 를 돌려주니까 \`it - v.begin()\` 으로 인덱스를 뽑는 건 \`find()\` 때 본 그 패턴이에요.)

### 어디 쓸까?

- "**특정 값 개수**" → \`upper_bound - lower_bound\`
- "**target 이상이 몇 개**" → \`v.end() - lower_bound\`
- "**target 미만이 몇 개**" → \`lower_bound - v.begin()\`
- "**target 정확히 있나**" → \`lb != v.end() && *lb == target\`

> 💡 파이썬의 \`bisect.bisect_left\` / \`bisect.bisect_right\` 와 1:1 대응해요. 같은 도구가 이름만 다른 거예요.`
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
          content: `sort()와 lower_bound()를 활용해서 벡터를 정렬하고 30의 위치를 찾는 코드를 작성해봐요!`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {50, 20, 40, 10, 30};

    sort(v.begin(), v.end());

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
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {50, 20, 40, 10, 30};

    // sort()로 v를 정렬하고 출력하세요
    // 출력: "10 20 30 40 50 "

    int target = 30;
    // lower_bound()로 30의 위치를 찾아서 출력하세요
    // 출력: "30 found at index 2"

    return 0;
}`,
          hint: "sort(v.begin(), v.end())로 정렬 후, lower_bound(v.begin(), v.end(), target)은 iterator를 반환해요. *it == target으로 실제 값인지 확인하고, it - v.begin()이 인덱스예요",
          expectedOutput: `10 20 30 40 50 
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

🚀 **다음 레슨 (cpp-18): stack & queue** — 데이터를 **쌓고 꺼내는** 두 가지 방식. 괄호 짝 맞추기, BFS 같은 데서 진가가 드러나요. STL 컨테이너 어드벤처 계속!`
        }
      ]
    }
  ]
}
