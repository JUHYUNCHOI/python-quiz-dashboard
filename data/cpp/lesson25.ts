// ============================================
// C++ Lesson 25: 정렬된 데이터에서 빠른 검색
// (이전 cpp-23 에서 분리: ch2 정렬된 배열에서 탐색하기)
// ============================================
import { LessonData } from '../types'

export const cppLesson25Data: LessonData = {
  id: "cpp-25",
  title: "정렬된 데이터에서 빠른 검색",
  emoji: "🔍",
  description: "binary_search, lower_bound, upper_bound — 정렬 한 번이 풀어주는 마법",
  chapters: [
    {
      id: "s23-ch2",
      title: "정렬된 배열에서 탐색하기",
      emoji: "🔍",
      steps: [
        {
          id: "s23-ch2-linear",
          type: "animation" as const,
          title: "🔎 선형 탐색 — 한 장씩 넘기기",
          component: "linearSearch",
          content: `여기까지 sort 로 정렬을 마스터했어요. 정렬해두면 좋은 또 하나의 큰 이유 — **탐색이 훨씬 빨라져요.** 그 이야기를 시작해요.

먼저 정렬돼 있지 **않은** 경우부터 봐요. 전화번호부에서 **"Kim"** 을 찾는다고 해봐요.

가장 단순한 방법: **1페이지부터 한 장씩** 넘기며 확인해요.

1페이지... 아니네. 2페이지... 아니네. 3페이지...

500페이지짜리 책이면 최악의 경우 **500번**을 봐야 해요. 배열도 똑같아요 — **100만 개면 최악 100만 번** 확인해야 해요.

버튼을 눌러서 직접 따라가 봐요!`,
        },
        {
          id: "s23-ch2-binary",
          type: "animation" as const,
          title: "⚡ 이진 탐색 — 가운데를 먼저 펼치기",
          component: "binarySearch",
          content: `전화번호부에서 "Kim"을 찾을 때, 1페이지부터 보나요?

**아니죠.** K는 알파벳 중간쯤이니까 자연스럽게 **중간을 펼쳐요.**

이게 가능한 이유가 딱 하나예요 — **전화번호부가 알파벳 순서로 정렬되어 있기 때문이에요.**
정렬이 안 되어 있으면 어디에 있을지 감이 없으니까 1페이지부터 볼 수밖에 없어요.

**이진 탐색은 이 직관을 알고리즘으로 만든 거예요:**

가운데(250p)를 펼쳤더니 "Park" → Kim은 앞쪽! **뒤 250페이지는 볼 필요 없어요.**
앞쪽 가운데(125p)를 펼쳤더니 "Lee" → Kim은 앞쪽! **또 절반을 버려요.**
이렇게 계속 절반씩 줄이면 **500페이지도 9번이면 찾아요.**

**정렬 → 이진 탐색 가능 → 훨씬 빠름!**
이게 sort를 배운 다음 이진 탐색을 배우는 이유예요.

버튼을 눌러서 직접 따라가 봐요!`,
        },
        {
          id: "s23-ch2-sorted-toolbox",
          type: "explain",
          title: "🗝️ 정렬은 출발선 — 정렬 한 번으로 열리는 도구 묶음",
          content: `## 🚀 sort 는 끝이 아니라 시작

> **🎯 sort 의 진짜 가치는 "정렬해둔 다음 가능해지는 일들" 에 있어요.**
> 이번 챕터 전부 그 이야기예요.

앞 페이지 **이진 탐색** 떠올려봐요. "가운데부터 펼치기" 가 됐던 이유 — 전화번호부가 정렬돼 있어서. 이번 챕터의 모든 함수가 같은 원리를 써먹어요.

---

### 📊 정렬 한 번이 풀어주는 것들 — 100 만 개 데이터

| 하고 싶은 일 | 정렬 **안** 됐을 때 | 정렬해두면 (이 챕터) |
|---|---|---|
| "x 가 있나?" | 100 만 번 (\`find\`) | **~20 번** (\`binary_search\`) |
| "x 가 몇 개?" | 100 만 번 (\`count\`) | **~40 번** (\`upper - lower\`) |
| "x 이상 첫 거?" | 100 만 번 | **~20 번** (\`lower_bound\`) |
| "중복 제거" | 직접 짜기 어려움 | **한 줄** (\`sort + unique + erase\`) |
| "최댓값 / 최솟값?" | 전체 스캔 | **즉시** (\`v.front()\`, \`v.back()\`) |

> 💡 함수 이름 처음 보여도 OK — 곧 하나씩 배워요. **정렬 한 번이 거의 5 만 배 빨라지는 마법**, 그래서 USACO 풀이는 거의 "일단 sort" 부터.

---

### ⚠️ 이번 챕터의 약속 — 정렬된 배열 전제

\`binary_search\`, \`lower_bound\`, \`upper_bound\` — **셋 다 정렬된 배열에서만 정확히 동작.** 정렬 안 된 배열에 쓰면 **에러도 안 나고** 엉뚱한 답이 슬쩍 나와요. 그러니 함수 쓰기 전엔 항상 \`sort(v.begin(), v.end())\` 먼저.

---

### 🪧 다음 페이지

위 함수들이 결과로 숫자 (인덱스) 가 아니라 **"위치를 가리키는 손가락"** 을 돌려줘요. 그 손가락 이름이 **이터레이터 (iterator)** — 1 분만 친해지고 본격 함수로 가요!`
        },
        {
          id: "s23-ch2-iter",
          type: "explain",
          title: "📌 이터레이터 — 위치를 가리키는 손가락",
          content: `방금 본 표 (👈) 의 \`lower_bound\`, \`binary_search\`, \`upper_bound\` 기억나죠? 결과로 **숫자 (인덱스) 가 아니라 '위치'** 를 돌려준다고 했어요. 그 '위치' 의 정식 이름이 바로 **이터레이터 (iterator)** 예요.

**이름은 좀 무섭게 들려도 별 거 아니에요** — 그냥 손가락 하나라고 생각하면 끝!

---

### 이터레이터 = 데이터 안의 한 자리를 가리키는 손가락 🫵

> 💡 사실 vector 만이 아니라 **map, set, list 등 어떤 컨테이너에서도** 통하는 개념. 이번 챕터는 vector 로 익히지만, 다음 레슨 map / set 에서도 똑같은 손가락을 또 만나요.

vector 위에 손가락 하나를 살짝 올린다고 상상해봐요:

\`\`\`
   10    20    30    40    50
   ↑
  여기!
\`\`\`

지금 손가락이 첫 자리 (10) 를 가리키고 있죠? **이게 바로 이터레이터예요.** 끝. 코드로 쓰면 이렇게 돼요:

\`\`\`cpp
auto it = v.begin();   // 손가락을 첫 자리에 올림
\`\`\`

\`v.begin()\` 이 바로 "벡터 첫 자리를 가리키는 손가락" 을 만들어주는 함수예요.

---

### 손가락이 할 수 있는 건 딱 두 가지

**1️⃣ "여기 뭐 있어?" → \`*it\`**

이름 앞에 별표 \`*\` 를 붙이면 **손가락이 가리키는 자리의 값** 이 나와요:

\`\`\`cpp
auto it = v.begin();   // 첫 자리 (10) 가리킴
cout << *it;           // 10
\`\`\`

**2️⃣ "한 칸 옆!" → \`++it\`**

손가락을 옆으로 한 칸 옮겨요:

\`\`\`cpp
auto it = v.begin();   // 10 가리킴
++it;
cout << *it;           // 20
++it;
cout << *it;           // 30
\`\`\`

\`++\` 할 때마다 손가락이 한 칸씩 옆으로 — 그게 전부예요.

---

### 두 동작을 합치면 → 전체 훑기

\`*it\` 로 값 읽고 \`++it\` 로 다음 자리로 — 이걸 반복하면 벡터 전체를 훑을 수 있어요:

\`\`\`cpp
vector<int> v = {10, 20, 30, 40, 50};

for (auto it = v.begin(); it != v.end(); ++it) {
    cout << *it << " ";   // 10 20 30 40 50
}
\`\`\`

여기서 새로 등장한 건 **\`v.end()\` 딱 하나** 예요. 끝을 알리는 표지죠:

\`\`\`
   10    20    30    40    50
   ↑                         ↑
begin()                    end()  ← 마지막 "다음" 자리
                                   (값 없음 — "여기서 멈춰!" 표지)
\`\`\`

- \`it != v.end()\` → 손가락이 **끝 표지에 닿기 전까지** 만 반복
- 끝 표지 자체는 값이 없으니까 \`*it\` 로 읽으면 안 돼요

> 💡 사실 평소엔 \`for (int x : v)\` (range-for) 가 훨씬 짧아서 이걸 더 많이 써요. 위 풀-패턴은 **이터레이터가 어떻게 움직이는지** 머릿속에 그려보려고 쓴 거예요 — 다음 페이지에서 \`lower_bound\` 가 손가락을 정확히 어디에 놔주는지 따라가려면 이 그림이 있어야 편해요.

---

### 혹시 '포인터' 들어봤다면?

이터레이터는 **포인터랑 거의 똑같아요** — \`*\` 로 값 보고 \`++\` 로 옆 가는 거 다 똑같아요. **다음 페이지에서 차이를 눈으로 보여줄게요** — 지금은 "아, 손가락 같은 거구나" 정도면 충분해요!`
        },
        {
          id: "s23-ch2-iter-sim",
          type: "animation" as const,
          title: "🎮 직접 보기 — 포인터 vs 이터레이터",
          component: "iteratorVsPointer",
          content: `**\`++\` 했을 때** 포인터와 이터레이터가 어떻게 다르게 움직이는지 직접 봐요.

- **vector 모드**: 둘이 똑같이 다음 칸으로 — 포인터로도, 이터레이터로도 OK
- **list 모드**: 포인터는 ❌ 엉뚱한 주소로 가버림, 이터레이터만 ✅ 진짜 다음 노드로

토글을 바꿔가며 \`++\` 버튼을 눌러봐요. **vector 와 list 에서 차이가 한 번에 보임.**`
        },
        {
          id: "s23-ch2-iter-formulas",
          type: "explain",
          title: "🎯 다음 페이지 들어가기 전 — 외울 공식 딱 두 줄",
          content: `\`lower_bound\` 가 돌려주는 이터레이터를 다룰 때 **학생이 할 일은 이 둘뿐**:

\`\`\`
   10    20    30    40    50
    ↑                ↑
 begin()             it  (40 을 가리킴)
\`\`\`

\`\`\`cpp
cout << *it;             // 40   ← *it 는 가리키는 값
cout << it - v.begin();  // 3    ← 인덱스로 변환
\`\`\`

---

### 🛡️ 못 찾았을 때 — \`v.end()\` 반환

\`lower_bound\` 나 \`find\` 가 못 찾으면 \`v.end()\` 를 돌려줘요 (= "끝 표시"). 그 자리를 \`*it\` 로 읽으려 하면 **위험** — 값이 없는 자리니까.

\`\`\`cpp
auto it = lower_bound(v.begin(), v.end(), x);
if (it != v.end()) {        // ← 반드시 체크
    cout << *it;             // 안전
} else {
    cout << "없음";
}
\`\`\`

> 💡 패턴 통째 외워두기 — \`auto it = ...; if (it != v.end()) { ... }\`. 이 한 줄이면 90% 의 이터레이터 코드는 안전.

---

### 두 줄 + 한 패턴, 이게 끝

| 외울 것 | 의미 |
|---|---|
| \`*it\` | 그 자리 **값** |
| \`it - v.begin()\` | **인덱스** (0-based) |
| \`it != v.end()\` | **찾았는지 확인** (못 찾으면 end) |

이 셋만 알면 다음 페이지부터 막힘 없어요. 직접 한번 써볼게요 👇`
        },
        {
          id: "s23-ch2-iter-try",
          type: "predict" as const,
          title: "✋ 직접 — 이터레이터 출력 예측",
          code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    auto it = v.begin() + 2;
    cout << *it << " ";
    cout << (it - v.begin()) << endl;
    return 0;
}`,
          options: ["30 2", "20 1", "30 3", "2 30"],
          answer: 0,
          explanation: "\\`v.begin() + 2\\` 는 첫 자리에서 두 칸 이동 → 인덱스 2 → 값 **30**. \\`*it\\` = 30. \\`it - v.begin()\\` = 2 (인덱스). 출력: **30 2**."
        },
        {
          id: "s23-ch2-lb",
          type: "explain",
          title: "🔍 binary_search / lower_bound / upper_bound — 이진탐색 3 형제",
          content: `방금 본 이진 탐색을 매번 직접 짜진 않아요. C++ 이 **세 함수** 를 미리 만들어뒀어요 — 같은 가족이에요:

\`\`\`cpp
binary_search(v.begin(), v.end(), x);  // x 가 있나? → true / false
lower_bound (v.begin(), v.end(), x);   // x 가 시작되는 위치
upper_bound (v.begin(), v.end(), x);   // x 가 끝난 다음 위치
\`\`\`

⚠️ **반드시 정렬된 배열에서만!** (이진 탐색이라서)

---

**그림으로 보기 — 값 3 찾기**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
     ↑       ↑
lower_bound  upper_bound
  (값=3)      (값=3)
"3 시작"    "3 끝 다음"
\`\`\`

- **binary_search(x)** → \`x\` 가 있나? **true / false** _("있다/없다" 만 깔끔하게)_
- **lower_bound(x)** → \`x\` **이상(≥)** 의 첫 위치 _("기준 이상 첫 거" 찾기)_
- **upper_bound(x)** → \`x\` **초과(>)** 의 첫 위치 _(주로 lower_bound 와 짝 — 개수 세기 / 구간 카운트)_

> 💡 깊이 파지 말고 **그림 + 세 줄 설명** 만 기억해도 충분. 어떤 상황에 어느 걸 쓰는지 구체 예시는 다음 페이지들에서 봐요.`
        },
        {
          id: "s23-ch2-binary-search-predict",
          type: "predict" as const,
          title: "✋ 직접 — binary_search 출력 예측",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {1, 3, 5, 7, 9};
    cout << binary_search(v.begin(), v.end(), 5) << " ";
    cout << binary_search(v.begin(), v.end(), 4) << endl;
    return 0;
}`,
          options: ["1 0", "5 4", "true false", "0 1"],
          answer: 0,
          explanation: "binary_search 는 **bool** 을 돌려줘요 — \`cout\` 으로 출력하면 \`true → 1\`, \`false → 0\`. 5 는 배열에 있어서 1, 4 는 없어서 0. (\"true\"/\"false\" 가 아니라 \"1\"/\"0\" 으로 출력되는 게 핵심.)"
        },
        {
          id: "s23-ch2-trio-quiz",
          type: "quiz" as const,
          title: "3 형제 중 누구를 쓰지?",
          content: "정렬된 \`vector<int> v\` 가 있어요. \"숫자 7 이 배열에 있는지 **있다 / 없다** 만 알면 돼\" 라면 셋 중 어느 걸 쓰는 게 가장 깔끔할까요?",
          options: [
            "`binary_search(v.begin(), v.end(), 7)`",
            "`lower_bound(v.begin(), v.end(), 7)`",
            "`upper_bound(v.begin(), v.end(), 7)`"
          ],
          answer: 0,
          explanation: "**`binary_search`** 는 정확히 \"있나 / 없나\" 만 묻는 함수 — true / false 반환이라 가장 직관적이에요. lower_bound / upper_bound 는 **위치** 를 돌려주니까 \"있는지만\" 확인하기엔 한 단계 더 필요해요 (`lower_bound != upper_bound` 같은 식)."
        },
        {
          id: "s23-ch2-lb-missing",
          type: "explain",
          title: "🔍 없는 값을 찾으면? — 끼워넣을 자리",
          content: `값이 배열에 **없어도** lower_bound 는 에러 없이 숫자를 돌려줘요. 뭘 돌려주냐면 — **"정렬을 유지한 채 그 값을 넣으면 어느 자리?"** 를 알려줘요.

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

// 4 는 없음 — "4 가 들어갈 자리?"
lower_bound(v.begin(), v.end(), 4) - v.begin() →  2   ← 5 의 앞 (= 4 가 들어갈 자리)
upper_bound(v.begin(), v.end(), 4) - v.begin() →  2   ← 같음 (없으니까 시작=끝)

// 10 은 모든 값보다 큼 — "맨 뒤에 넣어야"
lower_bound(v.begin(), v.end(), 10) - v.begin() →  5  ← v.end() 위치 (= v.size())
\`\`\`

이게 lower_bound 가 **그냥 위치를 돌려주는 것보다 더 강한** 이유예요. "있으면 그 자리 / 없으면 들어갈 자리" → **언제나** 의미 있는 위치를 줘요.

---

**활용 — "정렬을 유지하면서 삽입":**

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};
int x = 4;
v.insert(lower_bound(v.begin(), v.end(), x), x);
// v = {1, 3, 4, 5, 7, 9}  ← 정렬 유지!
\`\`\`

---

> ⚠️ **"있는지만 확인" 할 때는 \`lower == upper\` 트릭 쓰지 마세요.** 의도가 안 보여요. → **\`binary_search(v.begin(), v.end(), x)\`** 가 정답 (앞 페이지에서 배운 그거). lower / upper 가 같아지는 건 **부수효과** 일 뿐, 도구의 목적이 아니에요.`
        },
        {
          id: "s23-ch2-lb-firstge-fb",
          type: "fillblank" as const,
          title: "✋ 직접 — 70 점 이상 첫 학생 찾기",
          content: "정렬된 점수 배열에서 **70 점 이상 첫 학생** 의 점수를 출력해봐요.",
          code: "vector<int> scores = {45, 60, 72, 85, 91};\nauto it = ___(scores.begin(), scores.end(), 70);\ncout << *it;  // 72 출력",
          fillBlanks: [
            { id: 0, answer: "lower_bound", options: ["lower_bound", "upper_bound", "binary_search", "find"] }
          ],
          explanation: "**lower_bound(scores, 70)** 가 \"70 이상 첫 위치\" 를 돌려줘요. \\*it 로 그 자리의 값 (72) 을 봐요. \\`find\\` 는 정확히 70 만 찾으므로 ❌, \\`binary_search\\` 는 bool 만 돌려주므로 ❌."
        },
        {
          id: "s23-ch2-lb-patterns",
          type: "explain",
          title: "🎯 활용 패턴 3 가지",
          content: `\`\`\`cpp
vector<int> v = {1, 3, 3, 5, 7, 9};

// ① 3 이 몇 개인가?
int count = upper_bound(v.begin(), v.end(), 3)
          - lower_bound(v.begin(), v.end(), 3);
// 3 - 1 = 2 개!

// ② 값이 있는지 확인 — binary_search() 사용 (더 간단!)
if (binary_search(v.begin(), v.end(), 3)) cout << "있음";
else cout << "없음";

// ③ 값의 위치가 필요할 때 — lower_bound 사용
int idx = lower_bound(v.begin(), v.end(), 3) - v.begin();
cout << idx;  // 1
\`\`\`

> 💡 셋이 한 가족이지만 **돌려주는 게 달라서** 쓰임도 달라요. 다음 페이지에서 흔한 함정 하나 짚고 가요. (구체적 "어디 쓰는지" 는 이 챕터 뒤쪽 비교표에서 한 번에 정리해요.)`
        },
        {
          id: "s23-ch2-patterns-fb",
          type: "fillblank" as const,
          title: "✋ 직접 — 5 가 몇 개?",
          content: "정렬된 \`vector<int> v = {1, 2, 5, 5, 5, 7}\` 에서 **5 가 몇 개** 있는지 한 줄로 구해봐요. (upper-lower 패턴)",
          code: "vector<int> v = {1, 2, 5, 5, 5, 7};\nint cnt = ___(v.begin(), v.end(), 5)\n        - ___(v.begin(), v.end(), 5);\ncout << cnt;  // 3",
          fillBlanks: [
            { id: 0, answer: "upper_bound", options: ["upper_bound", "lower_bound", "binary_search", "count"] },
            { id: 1, answer: "lower_bound", options: ["lower_bound", "upper_bound", "binary_search", "count"] }
          ],
          explanation: "**\"끝 다음 - 시작\" = 개수.** upper_bound 가 끝 다음을 가리키고 lower_bound 가 시작을 가리켜요. 둘을 빼면 그 값의 개수. 5 는 인덱스 2,3,4 에 3 개 있으니 결과 3."
        },
        {
          id: "s23-ch2-lb-vs-count",
          type: "explain",
          title: "🤔 잠깐 — 개수 세기는 \`count()\` 도 있지 않아?",
          content: `맞아요. \`count()\` 도 개수를 세요 (algorithm 의 표준 함수):

\`\`\`cpp
int cnt = count(v.begin(), v.end(), 3);   // 정렬 안 되어 있어도 OK
\`\`\`

**그럼 둘이 뭐가 달라요?**

| | \`count()\` | \`upper - lower\` |
|---|---|---|
| 정렬 필요? | ❌ 아니요 | ✅ 정렬돼 있어야 함 |
| 속도 | **O(n)** — 처음부터 끝까지 훑음 | **O(log n)** — 이진 탐색 |
| 100 만 개 중 세기 | 100 만 번 비교 | 약 20 번 비교 |

**함정:** "그럼 sort 한 번 하고 upper-lower 쓰면 되겠네!" → ❌. sort 자체가 O(n log n) 이라 **한 번만** 셀 거면 그냥 \`count()\` 가 더 빠름.

✅ **upper-lower 가 빛나는 순간:**
- 데이터가 **이미** 정렬돼 있을 때
- 같은 데이터에서 **여러 번** 세야 할 때 (한 번 sort → 매 질의마다 O(log n))

알고리즘 대회에선 자주 쓰는 패턴, 일반 코딩에선 \`count()\` 가 더 흔해요.

---

### ⚠️ 헷갈림 주의 — \`count\` 이름이 **두 곳** 에 나옴

다음 레슨 (map) 에서 \`m.count(key)\` 가 나오는데 이름은 같지만 **완전히 다른 함수예요.**

| | \`count(v.begin, v.end, x)\` | \`m.count(key)\` |
|---|---|---|
| 어디 거? | algorithm 함수 (외부) | map / set 의 **멤버** 함수 |
| 어디서 씀? | vector 같은 일반 범위 | map, set |
| 속도 | O(n) — 처음부터 훑음 | **O(log n)** — 트리 직접 탐색 |
| 답 | 정확히 \`x\` 인 거 몇 개 | 키가 있나 (map 은 0/1, multiset 은 진짜 개수) |

> 💡 같은 이름이지만 **다른 함수.** vector 의 \`count()\` 는 느린데, map 의 \`m.count()\` 는 자기 안에 트리가 있어서 빠름 — sort 안 해도 빠른 거. 이건 다음 레슨에서 다시 짚어요.`
        },
        {
          id: "s23-ch2-lb-vs-bs",
          type: "explain",
          title: "🆚 binary_search() vs lower_bound — 언제 뭘 써?",
          content: `| | binary_search() | lower_bound() |
|---|---|---|
| 반환값 | true / false | 위치(반복자) |
| 용도 | 있는지만 확인 | 위치·개수·경계 필요할 때 |
| 코드 | 짧고 직관적 | 조금 길지만 강력 |

\`\`\`cpp
// 단순히 "5가 있나?" → binary_search
binary_search(v.begin(), v.end(), 5)  // true

// "5가 몇 번째야?" → lower_bound
lower_bound(v.begin(), v.end(), 5) - v.begin()  // 3
\`\`\`

---

### 🎯 USACO 어디서 어느 거?

| 상황 | 도구 |
|---|---|
| "ID 명단에 이 사용자 있어?" | \`binary_search\` |
| "이 회원 코드가 등록된 회원인지" | \`binary_search\` |
| "70 점 이상 몇 명?" | \`lower_bound\` ( v.end - lower_bound ) |
| "예산 이하 가장 비싼 거" | \`upper_bound\` 의 한 칸 앞 |
| "[a, b] 구간 안 점 개수" | \`upper_bound(b) - lower_bound(a)\` |
| "X 가 몇 개 있나?" | \`upper - lower\` |

---

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`x in v\` | \`binary_search(v.begin(), v.end(), x)\` |
| \`bisect.bisect_left(v, x)\` | \`lower_bound(v.begin(), v.end(), x) - v.begin()\` |
| \`bisect.bisect_right(v, x)\` | \`upper_bound(v.begin(), v.end(), x) - v.begin()\` |`
        },
        {
          id: "s23-ch2-quiz1",
          type: "quiz",
          title: "이진탐색의 전제 조건!",
          content: "정렬되지 않은 벡터 \`v = {3, 1, 4, 1, 5}\` 에 대해 \`binary_search(v.begin(), v.end(), 4)\` 를 호출하면?",
          options: [
            "true 반환 (4 가 있으니까)",
            "false 반환 (정렬 안 된 걸 자동 감지해서)",
            "**예측 불가** — 이진탐색은 정렬된 배열에서만 동작 보장. 결과는 컴파일러/구현마다 다름",
            "컴파일 에러"
          ],
          answer: 2,
          explanation: "**`binary_search`, `lower_bound`, `upper_bound` 는 모두 정렬된 배열에서만 정확히 동작해요.** 정렬 안 된 배열에서 호출하면 컴파일은 되지만 결과는 **undefined behavior** — true / false / 엉뚱한 인덱스 등 어떤 결과든 나올 수 있음. 그래서 사용 전 반드시 `sort()` 먼저!"
        },
        {
          id: "s23-ch2-lb3",
          type: "explain",
          title: "⚠️ 주의 — 모든 값보다 큰 값을 찾으면?",
          content: `\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

lower_bound(v.begin(), v.end(), 10) - v.begin();
// → 5 (범위 **밖**, v[5] 는 존재 안 함!)
\`\`\`

찾는 값보다 큰 게 배열에 없으면 lower_bound 는 **\`v.end()\` 위치 (= 인덱스 \`v.size()\`)** 를 돌려줘요. 여길 그냥 \`v[5]\` 로 접근하면 잘못된 메모리 읽기 → 프로그램 폭발.

---

**안전하게 쓰는 패턴**

\`\`\`cpp
auto it = lower_bound(v.begin(), v.end(), x);

if (it != v.end() && *it == x) {
    int idx = it - v.begin();
    cout << idx;       // 진짜로 x 가 있을 때만
}
\`\`\`

> 💡 \`it != v.end()\` 로 **범위 안인지 확인** + \`*it == x\` 로 **정확히 그 값인지 확인**. 두 조건 모두 OK 일 때만 접근.`
        },
        {
          id: "s23-ch2-fb1",
          type: "fillblank" as const,
          title: "✋ 직접 — 4 이상 첫 인덱스 찾기",
          content: "정렬된 벡터에서 **4 이상 첫 자리** 의 인덱스를 구해봐요!",
          code: "vector<int> v = {1, 2, 4, 4, 6};\nauto it = ___(v.begin(), v.end(), 4);\nint idx = it - v.___;\ncout << idx;  // 2",
          fillBlanks: [
            { id: 0, answer: "lower_bound", options: ["lower_bound", "upper_bound", "find", "binary_search"] },
            { id: 1, answer: "begin()", options: ["begin()", "end()", "front()", "start()"] }
          ],
          explanation: "lower_bound 는 '값 이상 첫 자리' 손가락을 돌려줘요. 거기서 v.begin() 을 빼면 인덱스로 바뀜.\n\n배열 {1, 2, 4, 4, 6} 에서 4 는 인덱스 2 에 처음 등장 → 답: 2"
        },
        {
          id: "s23-ch2-practice1",
          type: "practice" as const,
          title: "✋ 처음부터 — binary_search 로 존재 확인",
          content: `**문제**: **이미 정렬된** N 개의 정수가 주어지고, 그 다음 줄에 찾을 값 \`x\` 가 주어져요. \`x\` 가 배열에 있으면 \`Yes\`, 없으면 \`No\` 출력.

\`\`\`
입력: 5
      1 3 5 7 9
      5
출력: Yes

입력: 5
      1 3 5 7 9
      4
출력: No
\`\`\`

> 💡 \`binary_search(v.begin(), v.end(), x)\` 는 **true / false** 반환. "있는지만" 알면 될 때 가장 간단한 함수.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    // 👇 binary_search 로 x 존재 여부 확인 → "Yes" 또는 "No" 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    if (binary_search(v.begin(), v.end(), x)) cout << "Yes";
    else cout << "No";
    return 0;
}`,
          hint: "binary_search 는 true 나 false 만 돌려줘요. if 문 조건에 바로 넣어서 Yes / No 갈라보세요.",
          expectedOutput: `Yes`,
          stdin: `5
1 3 5 7 9
5`,
        },
        {
          id: "s23-ch2-pred1",
          type: "predict" as const,
          title: "✋ 직접 — lower_bound & upper_bound 출력 예측",
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
          explanation: "배열 {2, 4, 4, 6, 8}\n인덱스  0  1  2  3  4\n           ↑     ↑\n           lo    hi\n\nlower_bound(4) → '값 4 이상 첫 자리' = 인덱스 1\nupper_bound(4) → '값 4 끝난 다음' = 인덱스 3\n\nlo - v.begin() = 1\nhi - lo        = 3 - 1 = 2  (4 가 2 개)\n\n→ 출력: 1 2"
        },
        {
          id: "s23-ch2-practice2",
          type: "practice" as const,
          title: "✋ 처음부터 — X 가 몇 개인지 (upper - lower 패턴)",
          content: `**문제**: **이미 정렬된** N 개의 정수가 주어지고, 그 다음 줄에 찾을 값 \`x\` 가 주어져요. \`x\` 가 배열에 **몇 개** 등장하는지 출력하세요.

\`\`\`
입력: 6
      1 3 3 3 5 7
      3
출력: 3

입력: 5
      1 2 4 6 8
      4
출력: 1

입력: 5
      1 3 5 7 9
      4
출력: 0
\`\`\`

> 💡 \`upper_bound(...) - lower_bound(...)\` — chapter 의 핵심 응용 패턴. 두 반복자의 차이가 곧 개수.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    // 👇 upper_bound - lower_bound 로 x 의 개수 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    auto lo = lower_bound(v.begin(), v.end(), x);
    auto hi = upper_bound(v.begin(), v.end(), x);
    cout << (hi - lo);
    return 0;
}`,
          hint: "auto lo = lower_bound(v.begin(), v.end(), x); auto hi = upper_bound(v.begin(), v.end(), x); cout << (hi - lo); — 두 반복자의 차이가 개수. 없으면 hi == lo → 0.",
          expectedOutput: `3`,
          stdin: `6
1 3 3 3 5 7
3`,
        }
      ]
    }
  ]
}
