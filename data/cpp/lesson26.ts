// ============================================
// C++ Lesson 26: sort 응용 패턴 (심화)
// (이전 cpp-23 에서 분리: ch3 + ch4 심화 + 람다 STL)
// ============================================
import { LessonData } from '../types'

export const cppLesson26Data: LessonData = {
  id: "cpp-26",
  title: "sort 응용 패턴 (심화)",
  emoji: "🧹",
  description: "sort+unique+erase, stable_sort, count_if, find_if, accumulate — Bronze 합격 후 알아두면 좋은 패턴들",
  chapters: [
    {
      id: "s23-ch3",
      title: "심화 패턴",
      emoji: "🧹",
      steps: [
        {
          id: "s23-ch3-unique",
          type: "explain",
          title: "🧹 sort + unique — 중복 제거 패턴",
          content: `> 📌 **심화 패턴 — USACO Bronze 에서는 거의 안 쓰지만 Silver 부터 자주 등장**

### 언제 진짜 쓰나요?

USACO 에서 \`sort + unique\` 가 등장하는 대표적 상황 2 개:

1. **"서로 다른 값이 몇 개?"** — 입력에 중복 섞여 있는데 종류만 세고 싶을 때
   > 예: "농장에 들어온 소들의 *서로 다른* 이름 개수"

2. **좌표 압축 (Silver+)** — 좌표가 10⁹ 처럼 큰데 N 은 10⁵ 인 경우, **값들을 0, 1, 2, ... 같이 작은 번호로 다시 매김** 하는 표준 트릭. \`sort + unique + lower_bound\` 3 단 콤보.

이 두 상황 외엔 사실 \`set\` 쓰는 게 더 깔끔해요. **vector 를 유지하면서** dedupe 하고 싶을 때만 이 패턴.

---

### 코드 자체는 단순

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};

// 1단계: 정렬 (unique 는 "인접 중복" 만 제거하니까 정렬 먼저)
sort(v.begin(), v.end());
// v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}

// 2단계: unique + erase 한 줄
v.erase(unique(v.begin(), v.end()), v.end());
// v = {1, 2, 3, 4, 5, 6, 9}
\`\`\`

⚠️ **sort 먼저!** \`unique\` 는 인접한 중복만 본다. 정렬 안 된 \`{1, 3, 1}\` 에 그냥 unique 쓰면 3 개 그대로.

---

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`sorted(set(v))\` | \`sort + erase(unique(...))\` |

💡 **외울 거**: \`sort\` → \`v.erase(unique(v.begin(), v.end()), v.end())\` 이 두 줄을 **세트로** 통째 외워두면 좌표 압축 / dedupe 어디서든 바로 갖다 씀. 다음 페이지에서 **왜 erase 까지 필요한지** 짚고 가요.`
        },
        {
          id: "s23-ch3-unique-detail",
          type: "explain",
          title: "🤔 잠깐 — 왜 \`erase\` 까지 필요해? \`unique\` 만 쓰면?",
          content: `\`unique\` 의 **진짜** 동작을 알면 왜 \`erase\` 가 짝꿍인지 자연스럽게 이해돼요.

### unique 의 진짜 동작

\`unique\` 는 사실 **벡터 크기를 줄이지 않아요.** 앞쪽으로 중복 없는 값들을 모으고, "여기까지가 진짜 끝" 이라는 위치 (iterator) 만 돌려줘요.

\`\`\`
v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}   sort 직후 (size = 10)

↓ auto it = unique(v.begin(), v.end());  ← erase 안 함

v = {1, 2, 3, 4, 5, 6, 9, ?, ?, ?}   size 는 여전히 10!
                          ↑
                          it 가 가리키는 위치
                          여기부터 뒤는 쓰레기 값 (의미 없음)
\`\`\`

\`v.size()\` 를 출력해보면 여전히 10. 앞 7 개만 진짜고 나머지 3 개는 메모리에 남은 **흔적**.

---

### erase 문법 빠른 리마인더

벡터에서 **구간 잘라내기** 는 \`erase(시작, 끝)\` 형태예요. 두 iterator 사이를 통째로 들어내는 거.

\`\`\`cpp
vector<int> v = {10, 20, 30, 40, 50};

v.erase(v.begin() + 1, v.begin() + 4);
//     ↑                ↑
//   여기부터        여기 직전까지 (4 는 미포함)

// 결과: v = {10, 50}   (20, 30, 40 제거)
\`\`\`

| 형태 | 의미 |
|---|---|
| \`v.erase(it)\` | iterator \`it\` 가 가리키는 **한 개** 제거 |
| \`v.erase(시작, 끝)\` | \`[시작, 끝)\` **구간 통째로** 제거 |

---

### 그래서 erase + unique 합치면

\`\`\`cpp
v.erase( unique(v.begin(), v.end()),  v.end() );
//        ↑                            ↑
//   "진짜 끝" 위치 (it)           벡터의 진짜 끝
//          ───────  이 사이의 쓰레기를 잘라냄  ───────
\`\`\`

unique 가 알려준 **진짜 끝** 부터 \`v.end()\` 까지 erase — 이게 그 유명한 패턴.

> 💡 외울 거: \`unique\` 는 **모으기만** 함, 크기는 그대로. 진짜 줄이려면 \`erase\` 한 세트.`
        },
        {
          id: "s23-ch3-unique-practice",
          type: "practice" as const,
          title: "✋ 처음부터 — 중복 제거 후 개수 출력",
          content: `**문제**: N 개의 정수가 주어질 때, **중복 제거 후 서로 다른 정수의 개수** 를 출력하세요.

\`\`\`
입력: 8
      3 1 4 1 5 9 2 6
출력: 7

입력: 5
      2 2 2 2 2
출력: 1
\`\`\`

> 💡 \`sort\` → \`erase(unique(...), end())\` 패턴 후 \`v.size()\` 출력. 한 줄로 끝.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    // 👇 sort + unique + erase 후 v.size() 출력

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
    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());
    cout << v.size();
    return 0;
}`,
          hint: "sort(v.begin(), v.end()); v.erase(unique(v.begin(), v.end()), v.end()); cout << v.size(); — sort 먼저 (unique 는 인접 중복만 제거).",
          expectedOutput: `7`,
          stdin: `8
3 1 4 1 5 9 2 6`,
        },
        {
          id: "s23-ch3-stable",
          type: "explain",
          title: "📊 stable_sort — 동점 시 원래 순서 보존",
          content: `> 📌 **심화 — USACO Bronze 에서는 거의 안 씀. "이런 게 있다" 만 알면 충분**

### 무슨 문제 때문에 stable_sort 가 있나?

\`sort()\` 는 빠르지만 **단점 하나**: 같은 값이 여러 개 있을 때 **그들 사이 순서를 보장 안 해요.**

\`\`\`cpp
vector<pair<string, int>> students = {
    {"Alice", 90}, {"Bob", 80}, {"Carol", 90}, {"Dave", 80}
};

sort(students.begin(), students.end(), [](auto a, auto b) {
    return a.second > b.second;   // 점수 내림차순
});
\`\`\`

90 점인 Alice 와 Carol 의 순서가 **입력 순서대로 (Alice 먼저)** 일까? **\`sort\` 는 보장 안 함.** 컴파일러/구현마다 다르게 나옴.

---

### \`stable_sort\` — 동점이면 입력 순서 유지

\`\`\`cpp
stable_sort(students.begin(), students.end(), [](auto a, auto b) {
    return a.second > b.second;
});
// → 동점이면 항상 입력 순서 유지 (Alice → Carol, Bob → Dave)
\`\`\`

함수 이름만 바꾸면 끝. 인자 다 동일.

---

### 비교표

| | \`sort\` | \`stable_sort\` |
|---|---|---|
| 속도 | 더 빠름 — O(N log N) | 약간 느림 — O(N log² N) |
| 동점 순서 | 무작위 (보장 X) | 입력 순서 그대로 ✅ |
| 언제 | 99% 의 경우 | 동점 순서가 답에 영향 줄 때 |

---

### 언제 진짜 필요한가?

대부분 **필요 없어요.** 진짜 쓰는 상황은:

1. **순위표 출력** 인데 동점인 학생은 입력 순서대로 보여줘야 할 때
2. **이미 한 기준으로 정렬된 데이터** 를 다른 기준으로 다시 정렬할 때 — 첫 기준 순서 보존하려고
   > 예: 학생을 이름순으로 정렬해둔 뒤 점수순으로 다시 정렬. 점수 같은 학생은 이름순 유지.

USACO Bronze 문제에선 "정답 순서" 가 고정되어 있어 보통 \`sort\` 면 충분. **stable_sort 는 "동점 순서까지 신경 쓰는 출력 문제" 만나면 그때 다시 와서 보면 됨.**

> 💡 **한 줄 결론**: 99% 는 \`sort\`. "동점 순서가 답이다" 라는 문제 만나면 \`stable_sort\` 로 한 글자만 바꾸면 끝.`
        },
        {
          id: "s23-ch3-stable-practice",
          type: "practice" as const,
          title: "✋ 처음부터 — stable_sort 직접 써보기",
          content: `**문제**: 학생 4 명 (이름, 점수). 점수 내림차순 정렬, **동점이면 입력 순서 유지**.

> 💡 \`stable_sort\` + lambda 로 점수 내림차순. 동점은 자동으로 입력 순서 유지됨. 입력/정답은 아래 박스 참고.`,
          starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    // 👇 stable_sort 로 점수 내림차순 (동점은 입력 순서)

    // 👇 한 줄에 한 명씩 "이름 점수" 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    stable_sort(v.begin(), v.end(), [](auto a, auto b) {
        return a.second > b.second;
    });
    for (auto& [name, score] : v) {
        cout << name << " " << score << "\\n";
    }
    return 0;
}`,
          hint: "stable_sort(v.begin(), v.end(), [](auto a, auto b) { return a.second > b.second; }); — sort 자리에 stable_sort 만 바꾸면 됨.",
          expectedOutput: `Alice 90
Carol 90
Bob 80
Dave 80`,
          stdin: `4
Alice 90
Bob 80
Carol 90
Dave 80`,
        },
      ]
    },

    {
      id: "s23-ch4",
      title: "람다 + STL 일반 알고리즘",
      emoji: "🔍",
      steps: [
        {
          id: "s23-ch4-intro",
          type: "explain",
          title: "🤔 sort 의 람다, 다른 데서도 통할까?",
          content: `> 📌 **심화 — Bronze 풀이엔 보통 <code>for</code> 루프 한 줄이 더 명확. "더 깔끔한 표현" 을 보여주는 챕터**

\`sort\` 에 람다 비교 함수 넣었던 거 기억나죠?

\`\`\`cpp
sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
\`\`\`

이 \`(begin, end, 람다)\` 패턴이 사실 \`<algorithm>\` 의 거의 모든 함수에 통해요:

- "**조건 만족 개수**" → \`count_if\`
- "**조건 만족 첫 원소**" → \`find_if\`
- "**다 더한 값**" → \`accumulate\` (\`<numeric>\` 헤더)

---

### Bronze 학생에게는 솔직한 한 마디

위 함수들은 **for 루프로 풀 수 있는 일을 한 줄로 줄여주는** 거예요. 즉 **\`for\` 루프 자체를 못 쓰겠다는 게 아니에요.** Bronze 합격에는 다음 \`for\` 패턴이 더 편할 수 있어요:

\`\`\`cpp
int cnt = 0;
for (int x : scores) if (x >= 80) cnt++;
\`\`\`

이걸 \`count_if\` 한 줄로 쓸 수 있다는 거지, **꼭 써야 한다는 건 아님**. 코드 길이가 5 줄에서 1 줄로 줄어드는 게 의미 있는 건 **숙련된 사람이 코드 빨리 읽을 때**. 학생 수준에선 for 루프가 더 직관적.

> 💡 **이 챕터의 진짜 목표**: "이런 게 있다" 만 알아두고, 나중에 다른 사람 코드 읽다가 \`count_if\` 보면 "아, for 루프로 세는 거구나" 알아챌 수 있는 정도. **꼭 외워 쓸 필요 없음.**`
        },
        {
          id: "s23-ch4-count-if",
          type: "explain",
          title: "🔢 count_if — 조건 맞는 원소 개수",
          content: `> 📌 심화 — for 루프로 더 직관적. "있다는 것만" 알고 가도 OK

**문제:** 점수 벡터에서 80 점 이상이 몇 명?

### 방법 A — for 루프 (Bronze 에선 이게 더 명확)

\`\`\`cpp
int cnt = 0;
for (int x : scores) {
    if (x >= 80) cnt++;
}
\`\`\`

### 방법 B — \`count_if\` 한 줄

\`\`\`cpp
int cnt = count_if(scores.begin(), scores.end(),
                   [](int x){ return x >= 80; });
\`\`\`

---

### 인자 구조 (sort 와 똑같음)

| 자리 | 의미 |
|---|---|
| 1 번째 | 시작 iterator (\`v.begin()\`) |
| 2 번째 | 끝 iterator (\`v.end()\`) |
| 3 번째 | **bool 리턴 람다** — true 면 카운트 |

---

### \`count\` vs \`count_if\` — 헷갈리지 말기

- \`count(b, e, x)\` — **값 x 와 정확히 같은 것** 셈
- \`count_if(b, e, pred)\` — **람다 조건** 을 만족하는 것 셈 (훨씬 유연)

---

### 진짜 언제 쓰면 좋을까

- 코드를 **읽을 사람** 한테 의도를 빨리 보여주고 싶을 때 — \`count_if(scores, x>=80)\` 한 줄이 곧 "80 점 이상 세기" 의도
- 람다 안에 **복잡한 조건** (여러 변수 캡처, AND/OR 결합) 이 들어갈 때
- **알고리즘 대회** 에서 코드 길이 줄이고 싶을 때

> 💡 결론: **Bronze 풀이에선 \`for\` 루프가 가독성 좋음.** \`count_if\` 는 알아두기만, 안 써도 됨. 코드 리뷰 시 다른 사람이 쓴 거 읽을 수 있으면 충분.`
        },
        {
          id: "s23-ch4-count-if-predict",
          type: "predict" as const,
          title: "출력 예측",
          content: `\`\`\`cpp
vector<int> v = {10, 25, 30, 45, 50, 65};
int cnt = count_if(v.begin(), v.end(),
                   [](int x){ return x % 5 == 0 && x > 30; });
cout << cnt;
\`\`\`

cnt 값은?`,
          options: ["4", "3", "2", "5"],
          answer: 1,
          explanation: "5 의 배수이면서 30 보다 큰 것: 45, 50, 65 → 3 개. (10, 25, 30 은 30 초과 조건 X.)"
        },
        {
          id: "s23-ch4-find-if",
          type: "explain",
          title: "🎯 find_if — 조건 맞는 첫 원소",
          content: `> 📌 심화 — for 루프 + <code>break</code> 가 보통 더 직관적

**문제:** 벡터에서 첫 번째 짝수 찾기.

### 방법 A — for 루프 (Bronze 에선 이게 더 흔함)

\`\`\`cpp
int answer = -1;   // 못 찾은 경우 -1
for (int x : v) {
    if (x % 2 == 0) {
        answer = x;
        break;
    }
}
\`\`\`

### 방법 B — \`find_if\` 한 줄

\`\`\`cpp
vector<int> v = {3, 7, 4, 9, 6};
auto it = find_if(v.begin(), v.end(),
                  [](int x){ return x % 2 == 0; });

if (it != v.end()) {
    cout << *it;        // 4
} else {
    cout << "없음";
}
\`\`\`

---

### 핵심 패턴 (방법 B 의)

- \`find_if\` 는 **iterator** 를 돌려줘요 (값 X)
- 못 찾으면 \`v.end()\` 반환 → \`!= v.end()\` 로 체크
- 값을 쓰려면 \`*it\` (역참조)
- 인덱스가 필요하면 \`it - v.begin()\`

---

### \`find\` vs \`find_if\` — 헷갈리지 말기

- \`find(b, e, x)\` — **값 x 자체** 찾기 (예: "정확히 5 인 첫 위치")
- \`find_if(b, e, pred)\` — **조건 (람다)** 만족 첫 원소 (예: "짝수인 첫 원소")

---

### 정렬된 vector 면 \`lower_bound\` 가 더 빠름

⚠️ "70 점 이상 첫 학생" 같은 질문에서:
- 안 정렬된 vector → \`find_if\` O(N)
- 정렬된 vector → \`lower_bound\` O(log N) ← **이게 더 빠름**

> 💡 결론: Bronze 에선 보통 **for 루프 + break** 가 가장 명확. \`find_if\` 는 람다 조건이 복잡할 때 한 줄로 줄이고 싶을 때. 정렬되어 있고 큰 데이터면 \`lower_bound\` 가 정답.`
        },
        {
          id: "s23-ch4-accumulate",
          type: "explain",
          title: "➕ accumulate — 다 더하기 (또는 다 곱하기)",
          content: `> 📌 심화 — Bronze 에선 <code>for</code> 루프 합산이 더 직관적. accumulate 는 알아두기만

**문제:** 점수 합계, 평균 구하기.

### 방법 A — for 루프 (Bronze 에선 이게 가장 흔함)

\`\`\`cpp
vector<int> v = {10, 20, 30, 40};

int sum = 0;
for (int x : v) sum += x;
cout << sum;        // 100
\`\`\`

### 방법 B — \`accumulate\` 한 줄

\`\`\`cpp
#include <numeric>     // ⚠️ <algorithm> 아니라 <numeric>!

int sum = accumulate(v.begin(), v.end(), 0);
//                                       ↑ 시작값 (sum 의 초깃값 0)
cout << sum;     // 100
\`\`\`

---

### \`accumulate\` 의 진짜 강점 — 시작값 + 커스텀 연산

기본 합산은 for 루프나 accumulate 나 같은데, **곱셈이나 커스텀 누적** 이 필요할 때 accumulate 가 빛나요:

\`\`\`cpp
// 곱: 시작 1, 4 번째 인자에 곱셈 함수
#include <functional>
accumulate(v.begin(), v.end(), 1, multiplies<int>());   // 10*20*30*40 = 240000

// 람다로 커스텀: 제곱의 합
accumulate(v.begin(), v.end(), 0,
           [](int acc, int x){ return acc + x * x; });   // 100+400+900+1600 = 3000
\`\`\`

### 평균 한 줄

\`\`\`cpp
double avg = (double)accumulate(v.begin(), v.end(), 0) / v.size();
\`\`\`

---

### 흔한 함정 ⚠️

- **\`<numeric>\` 헤더** 따로 \`#include\` 필요. 자주 까먹어서 컴파일 에러.
- 시작값이 \`int\` 면 결과도 \`int\` — 큰 수 합산엔 \`0LL\` (long long) 로 시작하기.
  \`\`\`cpp
  long long bigSum = accumulate(v.begin(), v.end(), 0LL);   // ← 0LL 주의
  \`\`\`

---

> 💡 **언제 진짜 쓸까:** USACO 문제에서 합계가 큰 수 (10⁹ 넘는 경우) + long long 필요할 때 \`accumulate(..., 0LL)\` 로 한 줄 깔끔. 그 외엔 for 루프가 더 명확.`
        },
        {
          id: "s23-ch4-practice",
          type: "practice" as const,
          title: "✋ 처음부터 — 80 점 이상 학생 수 + 합계 (심화 연습)",
          content: `> 📌 심화 연습 — for 루프로 풀어도 정답. \`count_if\` / \`accumulate\` 를 직접 한 번 써보는 게 이번 목적.

**문제:** 학생 5 명 점수를 입력받아:
1. 80 점 이상인 학생 수
2. 전체 합계

를 한 줄에 공백으로 구분해 출력.

> 💡 \`count_if\` 로 1 번, \`accumulate\` 로 2 번. 둘 다 한 줄로 해결 가능.
> ⚠️ \`accumulate\` 는 \`<numeric>\` 헤더 필요!
> 🔁 **for 루프로도 같은 정답.** 둘 중 편한 방식으로.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> scores(5);
    for (int i = 0; i < 5; i++) cin >> scores[i];
    // 👇 80 점 이상 개수, 합계 구해서 한 줄에 출력

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> scores(5);
    for (int i = 0; i < 5; i++) cin >> scores[i];
    int high = count_if(scores.begin(), scores.end(),
                        [](int x){ return x >= 80; });
    int total = accumulate(scores.begin(), scores.end(), 0);
    cout << high << " " << total << endl;
    return 0;
}`,
          hint: "count_if(scores.begin(), scores.end(), [](int x){ return x >= 80; }); + accumulate(scores.begin(), scores.end(), 0); — 두 줄로 끝.",
          expectedOutput: `3 380`,
          stdin: `90 65 80 75 70`,
        },
        {
          id: "s23-ch4-summary",
          type: "explain",
          title: "🎉 레슨 23 완료! sort + STL 알고리즘 마스터!",
          content: `## 🏆 레슨 23 완료! 대단해요!

### 📊 sort 기초
- **sort(v.begin(), v.end())** → 오름차순 (기본)
- **sort(v.begin(), v.end(), greater<int>())** → 내림차순
- \`#include <algorithm>\` 필요!

### 🔧 람다 (lambda)
- **문법:** \`[](타입 a, 타입 b) { return a > b; }\`
- **규칙:** true 리턴 → 첫 번째 인자(a)가 앞으로
- pair, struct 등 커스텀 기준 정렬에 필수!
- \`greater<int>()\`는 내림차순 람다를 미리 만든 것

### 🔍 lower_bound & upper_bound
- **반드시 정렬된 배열에서만 사용!** (이진 탐색 원리)
- **lower_bound(begin, end, x)**: x **이상**의 첫 번째 위치
- **upper_bound(begin, end, x)**: x **초과**의 첫 번째 위치
- 인덱스로 변환: \`- v.begin()\`

### 🧹 심화 패턴
- **sort + erase(unique(...), end())**: 중복 제거 (세트로 외울 것!)
- **stable_sort**: 동점 원래 순서 유지

### 🔍 람다 + STL 일반 알고리즘 ⭐ 신규
- **count_if(b, e, pred)** — 조건 맞는 원소 개수
- **find_if(b, e, pred)** — 조건 맞는 첫 원소 (iterator)
- **accumulate(b, e, init)** — 합계/곱/커스텀 누적 (\`<numeric>\` 필요)
- 패턴이 sort 와 똑같음: \`(begin, end, 람다)\`

### 🐍 파이썬과의 핵심 차이!
| 기능 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 람다 문법 | \`lambda x: x*2\` | \`[](int x){ return x*2; }\` |
| 정렬 기준 | \`key=\` (값 1개 변환) | 비교 함수 (두 값 직접 비교) |
| 이진 탐색 | \`bisect_left/right\` | \`lower_bound/upper_bound\` |
| 중복 제거 | \`sorted(set(v))\` | \`sort + erase(unique)\` |
| 조건 카운트 | \`sum(1 for x in v if x>=80)\` | \`count_if(b, e, pred)\` |
| 합계 | \`sum(v)\` | \`accumulate(b, e, 0)\` |

🚀 다음은 **map & set** — 자동으로 정렬되는 마법의 컨테이너!
   그 다음 바로 **🏆 USACO 모의전 (cpp-p3)** — 이제 진짜 실전!`
        }
      ]
    }
  ]
}
