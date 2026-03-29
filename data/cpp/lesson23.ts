// ============================================
// C++ Lesson 23: sort 마스터
// sort 기초부터 lower_bound, stable_sort까지!
// USACO Bronze 필수 패턴 집중!
// ============================================
import { LessonData } from '../types'

export const cppLesson23Data: LessonData = {
  id: "cpp-23",
  title: "sort 마스터",
  emoji: "📊",
  description: "sort 기초 + lower_bound + stable_sort — 정렬 완전정복!",
  chapters: [
    // ============================================
    // Chapter 0: sort 기초 (cpp-15에서 이어서)
    // ============================================
    {
      id: "s23-ch0",
      title: "sort 기초",
      emoji: "📊",
      steps: [
        {
          id: "s23-ch0-intro",
          type: "explain",
          title: "📊 sort() — 정렬의 기본!",
          content: `데이터를 순서대로 나열하는 **정렬**은 알고리즘의 핵심이에요. C++의 **sort()** 함수로 시작해봐요!

\`\`\`cpp
#include <algorithm>  // sort()가 들어있는 헤더!
#include <vector>

vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
// v = {1, 2, 5, 8, 9}  (오름차순)
\`\`\`

**배열도 정렬할 수 있어요:**
\`\`\`cpp
int arr[] = {5, 2, 8, 1, 9};
sort(arr, arr + 5);  // arr[0]~arr[4] 정렬
\`\`\`

| 파이썬 🐍 | C++ sort ⚡ |
|---|---|
| \`v.sort()\` | \`sort(v.begin(), v.end())\` |
| \`sorted(v)\` — 새 리스트 반환 | C++은 항상 원본 수정 (반환값 없음) |
| \`v.sort(reverse=True)\` | \`sort(v.begin(), v.end(), greater<int>())\` |

💡 sort()는 \`#include <algorithm>\`이 필요해요! **begin()과 end()**로 범위를 지정해야 해요.`
        },
        {
          id: "s23-ch0-fb1",
          type: "fillblank" as const,
          title: "sort 빈칸 채우기",
          content: "벡터를 정렬하는 코드를 완성해요!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.___, v.___);",
          fillBlanks: [
            { id: 0, answer: "begin()", options: ["begin()", "front()", "start()", "first()"] },
            { id: 1, answer: "end()", options: ["end()", "back()", "stop()", "last()"] }
          ],
          explanation: "sort()에는 시작 위치와 끝 위치를 넣어요! vector는 v.begin()과 v.end()를 사용해요."
        },
        {
          id: "s23-ch0-lambda",
          type: "explain",
          title: "🔧 람다(lambda) — 이름 없는 일회용 함수",
          content: `sort()에 **내 마음대로 기준**을 넣으려면 **람다**가 필요해요.

**왜 람다를 쓰냐면:**
함수를 딱 한 번만 쓸 때, 이름 붙여서 따로 정의하는 게 낭비예요.
람다는 **이름 없이 그 자리에서 바로 쓰는 일회용 함수**예요.

**문법 비교:**
\`\`\`
파이썬:  lambda x      : x * 2
C++:     [](int x)     { return x * 2; }
           ↑             ↑
       항상 []로 시작   중괄호 안에 return
\`\`\`

**C++ 람다 구조:**
\`\`\`cpp
[](int a, int b) { return a > b; }
 ↑  ↑              ↑
 [] 매개변수       함수 본문
(항상 빈 대괄호)
\`\`\`

**파이썬 vs C++ 람다:**
| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`lambda x: x * 2\` | \`[](int x) { return x * 2; }\` |
| \`lambda x, y: x + y\` | \`[](int x, int y) { return x + y; }\` |
| 인자 1개 (key 값) | 인자 2개 (비교할 두 값) |

💡 C++에서 \`[]\`는 그냥 "람다 시작" 표시예요. 지금은 항상 빈 대괄호로 쓴다고 외우면 돼요!`
        },
        {
          id: "s23-ch0-lambda-sort",
          type: "explain",
          title: "🔧 람다로 sort 기준 정하기!",
          content: `이제 람다를 sort에 적용해봐요!

**규칙:** 람다가 **true**를 리턴하면 첫 번째 인자가 **앞에** 와요.

\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};

// 내림차순 (큰 게 앞으로)
sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // a가 크면 a가 앞 → 내림차순
});
// v = {9, 8, 5, 2, 1}
\`\`\`

**pair를 점수 기준으로 정렬:**
\`\`\`cpp
// {이름, 점수} pair를 점수 내림차순으로
vector<pair<string, int>> v = {{"Kim", 85}, {"Lee", 92}, {"Park", 78}};

sort(v.begin(), v.end(), [](auto a, auto b) {
    return a.second > b.second;  // 점수(second) 큰 게 앞으로
});
// 결과: Lee(92) → Kim(85) → Park(78)
\`\`\`

**두 기준 정렬 (USACO 핵심!):**
\`\`\`cpp
// 1순위: 점수 내림차순, 동점이면 2순위: 이름 오름차순
sort(v.begin(), v.end(), [](auto a, auto b) {
    if (a.second != b.second)
        return a.second > b.second;  // 점수 큰 게 앞
    return a.first < b.first;        // 동점이면 이름 사전순
});
\`\`\`

💡 **greater<int>()**는 람다를 미리 만들어둔 것이에요. 커스텀 기준이 필요하면 직접 람다를 써요!`
        },
        {
          id: "s23-ch0-pred1",
          type: "predict" as const,
          title: "sort 후 출력!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {4, 2, 7, 1, 5};\n    sort(v.begin(), v.end());\n    cout << v[0] << \" \" << v[4];\n    return 0;\n}",
          options: ["4 5", "1 7", "7 1", "1 5"],
          answer: 1,
          explanation: "sort() 후 v = {1, 2, 4, 5, 7}이에요. v[0]은 가장 작은 1, v[4]는 가장 큰 7이에요. 그래서 1 7이 출력돼요!"
        },
        {
          id: "s23-ch0-q1",
          type: "quiz",
          title: "sort 헤더!",
          content: "sort()를 사용하려면 어떤 헤더를 include해야 하나요?",
          options: [
            "#include <sort>",
            "#include <algorithm>",
            "#include <vector>",
            "#include <utility>"
          ],
          answer: 1,
          explanation: "sort()는 <algorithm> 헤더에 들어있어요! <vector>는 vector용, <utility>는 pair용이에요."
        }
      ]
    },
    // ============================================
    // Chapter 1: lower_bound & upper_bound
    // ============================================
    {
      id: "s23-ch1",
      title: "lower_bound & upper_bound",
      emoji: "🔍",
      steps: [
        {
          id: "s23-ch1-intro",
          type: "explain",
          title: "🔍 정렬된 배열에서 빠르게 찾기!",
          content: `정렬된 배열에서 특정 값을 찾을 때 **처음부터 하나씩 찾는 건 느려요** — O(N).

**이진 탐색(Binary Search)**은 정렬된 배열에서 **O(log N)**으로 찾아요. 100만 개 배열도 20번만!

C++은 이진 탐색 함수를 기본 제공해요:
- \`lower_bound\` — 찾는 값 **이상**의 첫 번째 위치
- \`upper_bound\` — 찾는 값 **초과**의 첫 번째 위치

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {1, 3, 3, 5, 7, 9};
//               0  1  2  3  4  5

auto it1 = lower_bound(v.begin(), v.end(), 3);
// 3 이상의 첫 위치 → index 1 (첫 번째 3)

auto it2 = upper_bound(v.begin(), v.end(), 3);
// 3 초과의 첫 위치 → index 3 (5의 위치)

cout << (it1 - v.begin()) << endl;  // 1
cout << (it2 - v.begin()) << endl;  // 3
\`\`\`

**핵심: 반드시 정렬된 배열에서만 사용!**

파이썬과 비교해봐요:

\`\`\`python
import bisect
v = [1, 3, 3, 5, 7, 9]
bisect.bisect_left(v, 3)   # → 1  (lower_bound)
bisect.bisect_right(v, 3)  # → 3  (upper_bound)
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`bisect_left(v, x)\` | \`lower_bound(v.begin(), v.end(), x) - v.begin()\` |
| \`bisect_right(v, x)\` | \`upper_bound(v.begin(), v.end(), x) - v.begin()\` |
| 인덱스 직접 반환 | **반복자** 반환 → \`- v.begin()\`로 인덱스 변환 |

💡 lower/upper_bound는 인덱스가 아닌 **반복자(iterator)**를 반환해요! \`- v.begin()\`을 해야 인덱스를 얻어요.`
        },
        {
          id: "s23-ch1-fb1",
          type: "fillblank" as const,
          title: "lower_bound 빈칸 채우기",
          content: "정렬된 벡터에서 4 이상의 첫 번째 인덱스를 구해봐요!",
          code: "vector<int> v = {1, 2, 4, 4, 6};\nauto it = ___(v.begin(), v.end(), 4);\nint idx = it - v.___;\ncout << idx;  // 2",
          fillBlanks: [
            { id: 0, answer: "lower_bound", options: ["lower_bound", "upper_bound", "find", "binary_search"] },
            { id: 1, answer: "begin()", options: ["begin()", "end()", "front()", "start()"] }
          ],
          explanation: "lower_bound는 찾는 값 이상의 첫 위치를 반복자로 반환해요. - v.begin()으로 반복자를 인덱스로 변환해요. 4는 인덱스 2에 처음 등장하므로 결과는 2!"
        },
        {
          id: "s23-ch1-count",
          type: "explain",
          title: "🔍 특정 값의 개수 세기!",
          content: `lower_bound와 upper_bound를 같이 쓰면 **특정 값이 몇 개 있는지** O(log N)으로 알 수 있어요!

\`\`\`cpp
vector<int> v = {1, 3, 3, 3, 5, 7};
sort(v.begin(), v.end());  // 정렬 필수!

// 3의 개수 세기
auto lo = lower_bound(v.begin(), v.end(), 3);  // 3 이상 첫 위치
auto hi = upper_bound(v.begin(), v.end(), 3);  // 3 초과 첫 위치

int count = hi - lo;  // 3이 몇 개? → 3
cout << count << endl;  // 3
\`\`\`

**범위 안에 값이 존재하는지 확인:**
\`\`\`cpp
if (lo != v.end() && *lo == 3) {
    cout << "3이 있어요!" << endl;
}
// 또는 binary_search 함수:
if (binary_search(v.begin(), v.end(), 3)) {
    cout << "있어요!";
}
\`\`\`

파이썬과 비교해봐요:
\`\`\`python
# 파이썬은 정렬 후 bisect로 쉽게!
count = bisect_right(v, 3) - bisect_left(v, 3)
exists = 3 in v  # 간단하지만 O(N)
\`\`\`

💡 USACO에서 자주 나오는 패턴이에요! 정렬 + lower_bound 조합으로 많은 문제를 풀 수 있어요.`
        },
        {
          id: "s23-ch1-pred1",
          type: "predict" as const,
          title: "lower_bound & upper_bound 출력 예측!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {2, 4, 4, 6, 8};
    auto lo = lower_bound(v.begin(), v.end(), 4);
    auto hi = upper_bound(v.begin(), v.end(), 4);
    cout << (lo - v.begin()) << " " << (hi - lo);
    return 0;
}`,
          options: ["1 2", "2 2", "1 1", "2 1"],
          answer: 0,
          explanation: "lower_bound(4) → index 1 (첫 번째 4). upper_bound(4) → index 3 (6의 위치). hi - lo = 3 - 1 = 2 (4가 2개). 출력: 1 2"
        },
        {
          id: "s23-ch1-q1",
          type: "quiz",
          title: "lower_bound vs upper_bound!",
          content: `\`vector<int> v = {1, 2, 2, 3, 4}\`에서 \`upper_bound(v.begin(), v.end(), 2) - v.begin()\`의 결과는?`,
          options: ["1", "2", "3", "4"],
          answer: 2,
          explanation: "upper_bound(2)는 2 초과의 첫 번째 위치를 반환해요. v에서 2 다음에 3이 있는 인덱스 3이에요. 3 - v.begin() = 3. 정답은 3!"
        }
      ]
    },
    // ============================================
    // Chapter 2: stable_sort & sort+unique 패턴
    // ============================================
    {
      id: "s23-ch2",
      title: "stable_sort & sort+unique",
      emoji: "🧹",
      steps: [
        {
          id: "s23-ch2-stable",
          type: "explain",
          title: "🧹 stable_sort — 같은 값끼리의 순서를 보존!",
          content: `일반 sort()는 **같은 값끼리의 순서를 보장하지 않아요.**
어떤 원소가 앞에 올지 알 수 없어요!

**stable_sort**는 같은 값끼리의 **원래 순서를 보존**해요.

\`\`\`cpp
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int score;
};

Student v[] = {
    {"A", 90}, {"B", 90}, {"C", 90}
};

// 일반 sort: A, B, C의 순서가 보장 안 됨
sort(v, v+3, [](Student a, Student b) {
    return a.score > b.score;
});

// stable_sort: 같은 점수면 원래 순서(A→B→C) 보존!
stable_sort(v, v+3, [](Student a, Student b) {
    return a.score > b.score;
});
// 결과: A(90) → B(90) → C(90) 순서 유지!
\`\`\`

**언제 stable_sort를 써야 해요?**
- 같은 키 값을 가진 원소들의 **원래 순서가 중요**할 때
- 예: 날짜 순으로 정렬된 데이터를 이름 순으로 안정 정렬

파이썬과 비교해봐요:
\`\`\`python
# 파이썬의 sort와 sorted는 기본으로 stable!
v.sort(key=lambda x: x['score'], reverse=True)
# 파이썬에서는 항상 stable sort예요 😊
\`\`\`

💡 파이썬은 항상 stable sort지만, C++의 sort()는 stable이 아니에요! 순서가 중요하면 stable_sort를 쓰세요.`
        },
        {
          id: "s23-ch2-unique",
          type: "explain",
          title: "🧹 sort + unique — 중복 제거 패턴!",
          content: `배열에서 **중복된 값을 제거**하는 가장 흔한 C++ 패턴이에요!

**unique 함수만으론 부족:**
unique()는 중복을 뒤로 밀어낼 뿐, 실제로 지우지 않아요!
→ **반드시 erase와 함께** 사용해요.

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};

// 1단계: 정렬 (unique는 인접 중복만 제거!)
sort(v.begin(), v.end());
// v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}

// 2단계: unique로 중복을 뒤로 밀기
auto it = unique(v.begin(), v.end());
// it → 새로운 "끝" 위치

// 3단계: erase로 뒤쪽 쓰레기 제거
v.erase(it, v.end());
// v = {1, 2, 3, 4, 5, 6, 9}
\`\`\`

**한 줄로 줄이기:**
\`\`\`cpp
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
\`\`\`

파이썬과 비교해봐요:
\`\`\`python
v = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
v = list(set(v))     # set으로 중복 제거 (순서 보장 안 됨)
v.sort()             # 정렬
# 또는
v = sorted(set(v))   # 한 줄로!
\`\`\`

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`sorted(set(v))\` | \`sort + erase + unique\` |
| 한 줄 | 두~세 줄 |
| 순서 보장? set은 X (frozenset도) | 정렬 후 unique는 ✅ |

💡 **sort + erase(unique(...), end())** — 이 패턴을 외워두세요! USACO에서 정말 많이 나와요.`
        },
        {
          id: "s23-ch2-fb1",
          type: "fillblank" as const,
          title: "sort + unique 빈칸 채우기",
          content: "벡터에서 중복을 제거해봐요!",
          code: "vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5};\nsort(v.begin(), v.end());\nv.___(unique(v.begin(), v.end()), v.___());\n// 결과: {1, 2, 3, 4, 5, 6, 9}",
          fillBlanks: [
            { id: 0, answer: "erase", options: ["erase", "remove", "delete", "pop"] },
            { id: 1, answer: "end", options: ["end", "begin", "back", "last"] }
          ],
          explanation: "unique()는 반복자를 반환해요. erase(it, v.end())로 unique() 반환 위치부터 끝까지 지우면 중복이 제거돼요!"
        },
        {
          id: "s23-ch2-pred1",
          type: "predict" as const,
          title: "sort + unique 결과 예측!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {5, 3, 3, 1, 5, 2};
    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());
    cout << v.size() << " " << v[2];
    return 0;
}`,
          options: ["4 3", "4 5", "6 3", "5 3"],
          answer: 0,
          explanation: "정렬 후: {1,2,3,3,5,5}. unique 후: {1,2,3,5}. size=4, v[2]=3. 출력: 4 3"
        },
        {
          id: "s23-ch2-q1",
          type: "quiz",
          title: "unique 주의사항!",
          content: "unique() 함수를 사용하기 전에 반드시 해야 하는 것은?",
          options: [
            "배열을 역순으로 뒤집기",
            "배열을 정렬하기",
            "배열 크기를 절반으로 줄이기",
            "배열을 복사하기"
          ],
          answer: 1,
          explanation: "unique()는 인접한 중복만 제거해요! {1,3,1}에서는 3개 그대로예요. 먼저 sort해야 중복이 인접하게 되어 {1,1,3}이 되고, unique가 제대로 작동해요."
        }
      ]
    },
    // ============================================
    // Chapter 3: USACO 실전 패턴
    // ============================================
    {
      id: "s23-ch3",
      title: "USACO sort 실전 패턴",
      emoji: "🏆",
      steps: [
        {
          id: "s23-ch3-coord",
          type: "explain",
          title: "🏆 좌표 압축 — USACO 핵심 테크닉!",
          content: `값의 범위가 너무 커서 배열로 쓰기 어려울 때 **좌표 압축**을 써요!

**예시:** 값이 최대 10억인데, 개수는 10만 개뿐이에요.

\`\`\`
원래 값: {100000, 5, 1000000000, 7}
압축 후: {2, 0, 3, 1}  ← 순서만 보존, 값은 0~3으로 압축
\`\`\`

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> a = {100000, 5, 1000000000, 7};
vector<int> comp = a;  // 복사

// 1. 정렬 + 중복 제거
sort(comp.begin(), comp.end());
comp.erase(unique(comp.begin(), comp.end()), comp.end());
// comp = {5, 7, 100000, 1000000000}

// 2. 원래 값을 압축된 인덱스로 변환
for (int& x : a) {
    x = lower_bound(comp.begin(), comp.end(), x) - comp.begin();
}
// a = {2, 0, 3, 1}
\`\`\`

💡 **좌표 압축 = 정렬 + unique + lower_bound** 조합이에요! 세 기술을 모두 활용하는 패턴이라 이해가 중요해요.`
        },
        {
          id: "s23-ch3-q1",
          type: "quiz",
          title: "USACO 문제: 소 정렬!",
          content: `N마리 소의 출생 연도와 이름이 주어졌을 때, 출생 연도 오름차순으로 정렬하고 동년이면 이름 알파벳 순으로 출력하려고 해요. 어떤 비교 함수가 맞을까요?

\`\`\`cpp
struct Cow { string name; int year; };
\`\`\``,
          options: [
            "if (a.year != b.year) return a.year < b.year; return a.name < b.name;",
            "if (a.year != b.year) return a.year > b.year; return a.name < b.name;",
            "return a.year < b.year && a.name < b.name;",
            "return a.year + a.name < b.year + b.name;"
          ],
          answer: 0,
          explanation: "1순위: 연도 오름차순(a.year < b.year), 동년이면 2순위: 이름 알파벳 오름차순(a.name < b.name). if로 기준을 순서대로 나눠야 해요!"
        },
        {
          id: "s23-ch3-q2",
          type: "quiz",
          title: "sort + unique로 개수 세기!",
          content: `\`{5, 3, 5, 1, 3, 2, 1}\`에서 서로 다른 값의 개수를 sort + unique로 구하면?`,
          options: ["3", "4", "5", "7"],
          answer: 1,
          explanation: "정렬: {1,1,2,3,3,5,5}. unique 후: {1,2,3,5}. size = 4. 서로 다른 값은 1,2,3,5 총 4개!"
        },
        {
          id: "s23-ch3-summary",
          type: "explain",
          title: "🎉 레슨 23 완료! sort 심화 마스터!",
          content: `## 🏆 레슨 23 완료! 대단해요!

### 🔍 lower_bound & upper_bound
- **lower_bound(begin, end, x)**: x **이상**의 첫 번째 위치 → 반복자 반환
- **upper_bound(begin, end, x)**: x **초과**의 첫 번째 위치 → 반복자 반환
- 인덱스로 변환: \`- v.begin()\`
- 값의 개수: \`upper_bound - lower_bound\`
- **반드시 정렬된 상태에서 사용!**

### 🧹 stable_sort & sort+unique
- **stable_sort**: 같은 값끼리의 원래 순서 보존 (파이썬 sort는 기본 stable)
- **sort + erase(unique(...), end())**: 중복 제거 패턴 (외울 것!)

### 🏆 USACO 핵심 패턴
- **좌표 압축**: sort → unique → lower_bound 세트
- **복합 정렬**: if (기준1 다르면) return 기준1 비교; return 기준2 비교;

### 🔧 람다 (lambda)
- **문법:** \`[](타입 a, 타입 b) { return a > b; }\`
- **규칙:** true 리턴 → 첫 번째 인자가 앞으로
- 커스텀 기준 정렬에 필수! (pair, struct 등)
- \`greater<int>()\`는 내림차순 람다를 미리 만들어둔 것

### 🐍 파이썬과의 핵심 차이!
| 기능 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 람다 문법 | \`lambda x: x*2\` | \`[](int x){ return x*2; }\` |
| 정렬 기준 | \`key=\` (값 1개 변환) | 비교 함수 (두 값 직접 비교) |
| 이진 탐색 | \`bisect_left/right\` | \`lower_bound/upper_bound\` |
| 중복 제거 | \`sorted(set(v))\` | \`sort + erase(unique)\` |
| 안정 정렬 | 기본! | \`stable_sort\` 명시 |

🚀 다음은 **map & set** — 자동으로 정렬되는 마법의 컨테이너!`
        }
      ]
    }
  ]
}
