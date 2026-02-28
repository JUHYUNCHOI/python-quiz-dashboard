// ============================================
// C++ Project Lesson P3: USACO 모의전
// 파이썬을 아는 학생을 위한 C++ 강의
// Part 3 복습 프로젝트
// ============================================
import { LessonData } from '../types'

export const cppLessonP3Data: LessonData = {
  id: "cpp-p3",
  title: "USACO 모의전",
  emoji: "🏆",
  description: "Part 3 복습 프로젝트! USACO Bronze 스타일 문제를 풀어봐요.",
  chapters: [
    // ============================================
    // Chapter 1: 문제 1 — 소 정렬 (Cow Sorting)
    // ============================================
    {
      id: "ch1",
      title: "문제 1 — 소 정렬",
      emoji: "🥉",
      steps: [
        {
          id: "ch1-exp1",
          type: "explain",
          title: "🏆 USACO 모의전 시작!",
          content: `오늘은 **USACO Bronze 스타일** 문제 3개를 풀어볼 거예요!

Part 3에서 배운 모든 것을 활용하는 실전 연습이에요.

### USACO 문제 풀이의 전형적 구조

\`\`\`
1. 파일에서 입력 읽기   (freopen)
2. 데이터 처리          (STL 활용!)
3. 파일로 출력 쓰기     (freopen)
\`\`\`

### 매 문제마다 사용하는 기본 세팅

\`\`\`cpp
#include <bits/stdc++.h>  // 모든 STL 헤더
using namespace std;

int main() {
    freopen("problem.in", "r", stdin);   // 파일 입력
    freopen("problem.out", "w", stdout); // 파일 출력

    // 풀이 코드 작성!

    return 0;
}
\`\`\`

이 3가지를 기억하세요:
- **\`bits/stdc++.h\`** — 헤더 고민 끝!
- **\`freopen\`** — 파일 이름 틀리지 않게 주의!
- **STL** — pair, map, set, stack, sort... 전부 활용!

준비됐나요? 첫 번째 문제부터 시작해봐요! 💪`
        },
        {
          id: "ch1-exp2",
          type: "explain",
          title: "📋 문제 1: 소 정렬 (Cow Sorting)",
          content: `### 문제 설명

농부 존에게 N마리의 소가 있어요. 각 소는 **이름**과 **우유 생산량**이 있어요.

우유 생산량이 많은 순서대로 정렬하고, **상위 K마리**의 이름을 출력하세요.
단, 우유 생산량이 같으면 **이름 사전순(오름차순)**으로 정렬해요.

---

### 입력 형식 (sort.in)
- 첫 줄: N K (소의 수, 출력할 수)
- 다음 N줄: 이름 우유생산량

### 출력 형식 (sort.out)
- 상위 K마리의 이름 (한 줄에 하나씩)

---

### 예시

**입력 (sort.in):**
\`\`\`
5 3
Bessie 12
Elsie 20
Daisy 15
Gertie 20
Buttercup 8
\`\`\`

**출력 (sort.out):**
\`\`\`
Elsie
Gertie
Daisy
\`\`\`

**설명:** 우유 생산량 순서: Elsie(20), Gertie(20), Daisy(15), Bessie(12), Buttercup(8). Elsie와 Gertie는 둘 다 20이지만, 이름 사전순으로 Elsie가 먼저예요!`
        },
        {
          id: "ch1-exp3",
          type: "explain",
          title: "💡 풀이 전략 — pair + custom sort",
          content: `### 어떤 자료구조를 쓸까?

소마다 **(우유생산량, 이름)** 두 값을 묶어야 해요 → **\`pair<int, string>\`**!

### 왜 pair의 first를 우유생산량으로?

\`pair\`를 정렬하면 **first 기준으로 먼저** 정렬하니까, 우유생산량을 first에 넣으면 편해요.

### 정렬 조건이 특별해요!

1. 우유 생산량 **내림차순** (많은 게 먼저)
2. 같으면 이름 **오름차순** (사전순)

기본 \`sort\`는 오름차순이니까, **커스텀 비교 함수(lambda)**가 필요해요!

\`\`\`cpp
sort(cows.begin(), cows.end(), [](const auto& a, const auto& b) {
    if (a.first != b.first) return a.first > b.first;  // 우유 내림차순
    return a.second < b.second;  // 이름 오름차순
});
\`\`\`

### 전체 흐름

\`\`\`
1. freopen으로 파일 열기
2. N, K 읽기
3. pair<int, string> 벡터에 소 정보 저장
4. 커스텀 sort로 정렬
5. 상위 K마리 이름 출력
\`\`\``
        },
        {
          id: "ch1-prac1",
          type: "practice" as const,
          title: "✋ 소 정렬 풀이 코드",
          content: `커스텀 정렬을 사용해서 소를 우유 생산량 내림차순, 이름 오름차순으로 정렬하는 완전한 코드예요.

pair의 first에 우유생산량, second에 이름을 넣는 것에 주목하세요!`,
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    freopen("sort.in", "r", stdin);
    freopen("sort.out", "w", stdout);

    int n, k;
    cin >> n >> k;

    vector<pair<int, string>> cows(n);
    for (int i = 0; i < n; i++) {
        cin >> cows[i].second >> cows[i].first;
    }

    sort(cows.begin(), cows.end(), [](const auto& a, const auto& b) {
        if (a.first != b.first) return a.first > b.first;  // 우유 내림차순
        return a.second < b.second;  // 이름 오름차순
    });

    for (int i = 0; i < k; i++) {
        cout << cows[i].second << endl;
    }
    return 0;
}`,
          expectedOutput: `Elsie
Gertie
Daisy`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "pair 구조 이해!",
          content: `소 정렬 코드에서 \`cin >> cows[i].second >> cows[i].first;\`로 입력을 받아요. 왜 second를 먼저 읽을까요?

\`\`\`
입력: Bessie 12
\`\`\``,
          options: [
            "second가 항상 먼저 입력되니까",
            "입력 순서가 이름(string), 우유량(int)이고, pair는 (int, string)이니까",
            "first와 second는 순서가 바뀌어도 상관없으니까",
            "컴파일러가 자동으로 타입을 맞춰주니까"
          ],
          answer: 1,
          explanation: "pair<int, string>에서 first는 int(우유생산량), second는 string(이름)이에요. 입력 파일에서는 이름이 먼저 나오니까 second(이름)를 먼저 읽고, first(우유생산량)를 나중에 읽어야 해요!"
        }
      ]
    },
    // ============================================
    // Chapter 2: 문제 2 — 중복 제거 (Distinct Numbers)
    // ============================================
    {
      id: "ch2",
      title: "문제 2 — 중복 제거",
      emoji: "🥉",
      steps: [
        {
          id: "ch2-exp1",
          type: "explain",
          title: "📋 문제 2: 중복 제거 (Distinct Numbers)",
          content: `### 문제 설명

N개의 정수가 주어져요. **서로 다른 숫자**가 몇 개인지, 그리고 각 숫자가 **몇 번 등장**했는지 출력하세요.

출력은 숫자를 **오름차순**으로 정렬해서 출력해요.

---

### 입력 형식 (distinct.in)
- 첫 줄: N
- 둘째 줄: N개의 정수

### 출력 형식 (distinct.out)
- 첫 줄: 서로 다른 숫자의 개수
- 다음 줄부터: 숫자 등장횟수 (오름차순)

---

### 예시

**입력 (distinct.in):**
\`\`\`
8
3 1 4 1 5 9 2 6
\`\`\`

**출력 (distinct.out):**
\`\`\`
7
1 2
2 1
3 1
4 1
5 1
6 1
9 1
\`\`\`

**설명:** 1이 2번, 나머지는 1번씩 등장해요. 서로 다른 숫자는 7개예요.`
        },
        {
          id: "ch2-exp2",
          type: "explain",
          title: "💡 풀이 전략 — map이 딱이에요!",
          content: `### 이 문제에 딱 맞는 STL은?

**\`map<int, int>\`** 을 쓰면 한번에 해결돼요!

\`\`\`cpp
map<int, int> count;
count[x]++;  // x가 처음이면 0에서 시작해서 1이 됨!
\`\`\`

### map의 핵심 특징

| 특징 | 설명 |
|---|---|
| **자동 정렬** | key가 자동으로 오름차순 정렬! |
| **기본값 0** | 없는 key에 접근하면 int는 0으로 초기화 |
| **size()** | 서로 다른 key의 개수 = 서로 다른 숫자! |

파이썬으로 비교하면:

\`\`\`python
# 파이썬 🐍
from collections import Counter
count = Counter([3, 1, 4, 1, 5, 9, 2, 6])
# 또는
count = {}
for x in nums:
    count[x] = count.get(x, 0) + 1
\`\`\`

\`\`\`cpp
// C++ ⚡ — map은 자동 정렬까지!
map<int, int> count;
for (int i = 0; i < n; i++) {
    int x; cin >> x;
    count[x]++;
}
\`\`\`

파이썬의 \`Counter\`와 비슷하지만, C++의 \`map\`은 **자동으로 key가 정렬**돼요! 따로 sort할 필요 없어요.`
        },
        {
          id: "ch2-prac1",
          type: "practice" as const,
          title: "✋ 중복 제거 풀이 코드",
          content: `map을 사용해서 각 숫자의 등장 횟수를 세고, 정렬된 순서로 출력하는 코드예요.

\`auto& [num, cnt]\`는 C++17의 structured binding이에요 — pair의 first/second를 한번에 꺼내요!`,
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    freopen("distinct.in", "r", stdin);
    freopen("distinct.out", "w", stdout);

    int n;
    cin >> n;

    map<int, int> count;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        count[x]++;
    }

    cout << count.size() << endl;
    for (auto& [num, cnt] : count) {
        cout << num << " " << cnt << endl;
    }
    return 0;
}`,
          expectedOutput: `7
1 2
2 1
3 1
4 1
5 1
6 1
9 1`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "map vs unordered_map!",
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    unordered_map<int, int> m;
    m[3]++;
    m[1]++;
    m[4]++;
    m[1]++;

    for (auto& [k, v] : m) {
        cout << k << " ";
    }
    return 0;
}`,
          options: [
            "1 3 4 (항상 오름차순)",
            "3 1 4 (입력 순서)",
            "순서가 보장되지 않음 (랜덤)",
            "4 3 1 (항상 내림차순)"
          ],
          answer: 2,
          explanation: "unordered_map은 해시 테이블이라 순서가 보장되지 않아요! 실행할 때마다 순서가 달라질 수 있어요. 순서가 필요하면 반드시 map을 써야 해요. map은 내부적으로 트리 구조라서 key가 항상 오름차순으로 정렬돼요!"
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "set으로 중복 제거!",
          content: "set으로 중복을 제거해봐요!",
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};
    ___<int> s(arr, arr + 8);
    cout << s.___() << endl;
    return 0;
}`,
          fillBlanks: [
            { id: 0, answer: "set", options: ["set", "map", "vector", "stack"] },
            { id: 1, answer: "size", options: ["size", "count", "length", "len"] }
          ],
          explanation: "set<int>은 중복을 자동으로 제거해요! 배열을 set에 넣으면 {1, 2, 3, 4, 5, 6, 9}가 되고, size()는 7이에요. 등장 횟수까지 세려면 map이 필요하지만, 개수만 알면 set으로 충분해요!"
        }
      ]
    },
    // ============================================
    // Chapter 3: 문제 3 — 괄호 짝짓기 + 정리
    // ============================================
    {
      id: "ch3",
      title: "문제 3 — 괄호 짝짓기 + 정리",
      emoji: "🥉",
      steps: [
        {
          id: "ch3-exp1",
          type: "explain",
          title: "📋 문제 3: 괄호 짝짓기 (Bracket Match)",
          content: `### 문제 설명

괄호 문자열이 주어져요. 모든 괄호가 올바르게 짝지어졌는지 확인하세요.

올바르면 \`YES\`, 아니면 \`NO\`와 **짝이 없는 괄호의 개수**를 출력해요.

---

### 입력 형식 (bracket.in)
- 한 줄: 괄호 문자열 (\`(\`와 \`)\`로만 구성)

### 출력 형식 (bracket.out)
- 올바르면: \`YES\`
- 아니면: \`NO\` (첫 줄) + 짝이 없는 괄호 개수 (둘째 줄)

---

### 예시 1

**입력:** \`((())\`
**출력:**
\`\`\`
NO
1
\`\`\`
\`(\` 하나가 짝이 없어요!

### 예시 2

**입력:** \`(())()\`
**출력:**
\`\`\`
YES
\`\`\`
모든 괄호가 짝이 맞아요!

---

### 힌트: stack이 핵심이에요!

- \`(\`를 만나면 → stack에 push
- \`)\`를 만나면 → stack에서 pop (짝 맞추기!)
- stack이 비어있는데 \`)\`가 오면? → 짝이 없는 \`)\`!
- 끝까지 갔는데 stack에 남아있으면? → 짝이 없는 \`(\`!`
        },
        {
          id: "ch3-prac1",
          type: "practice" as const,
          title: "✋ 괄호 짝짓기 풀이 코드",
          content: `stack을 사용해서 괄호 짝을 맞추는 코드예요.

핵심 아이디어:
- \`(\`를 만나면 stack에 push
- \`)\`를 만나면 stack에서 pop (비어있으면 unmatched 증가)
- 마지막에 stack에 남은 \`(\` 개수도 unmatched에 추가`,
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    freopen("bracket.in", "r", stdin);
    freopen("bracket.out", "w", stdout);

    string s;
    cin >> s;

    stack<int> st;
    int unmatched = 0;

    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '(') {
            st.push(i);
        } else {
            if (st.empty()) {
                unmatched++;
            } else {
                st.pop();
            }
        }
    }
    unmatched += st.size();

    if (unmatched == 0) {
        cout << "YES" << endl;
    } else {
        cout << "NO" << endl;
        cout << unmatched << endl;
    }
    return 0;
}`,
          expectedOutput: `NO
1`
        },
        {
          id: "ch3-pred1",
          type: "predict" as const,
          title: "괄호 분석!",
          code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s = "(()(("  ;
    stack<int> st;
    int unmatched = 0;

    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '(') {
            st.push(i);
        } else {
            if (st.empty()) unmatched++;
            else st.pop();
        }
    }
    unmatched += st.size();

    if (unmatched == 0) cout << "YES";
    else cout << "NO " << unmatched;

    return 0;
}`,
          options: [
            "YES",
            "NO 2",
            "NO 3",
            "NO 5"
          ],
          answer: 2,
          explanation: "문자열 \"(()((\": ( push, ( push, ) pop, ( push, ( push. stack에 3개 남음, unmatched는 0 + 3 = 3이에요! 5개 중 )가 하나뿐이라 (가 3개 짝이 없어요."
        },
        {
          id: "ch3-exp2",
          type: "explain",
          title: "📝 USACO 실전 체크리스트",
          content: `3문제를 다 풀었어요! 실전에서 실수하지 않도록 체크리스트를 정리해봐요.

### USACO 제출 전 체크리스트

| # | 항목 | 왜? |
|---|---|---|
| ✅ | \`#include <bits/stdc++.h>\` | 헤더 빠뜨리면 컴파일 에러! |
| ✅ | \`freopen\` 파일 이름 확인 | 파일 이름 틀리면 0점! |
| ✅ | 변수 타입 확인 (int vs long long) | N이 크면 오버플로우! |
| ✅ | 배열/벡터 크기 넉넉하게 | 범위 밖 접근 = 런타임 에러! |
| ✅ | edge case 체크 (N=0, N=1) | 예외 상황에서 틀리기 쉬움! |
| ✅ | 시간복잡도 계산 | N ≤ 10^5 → O(N log N) OK |

### 자주 하는 실수 TOP 3

**1. 파일 이름 오타**
\`\`\`cpp
// ❌ 실수!
freopen("Sort.in", "r", stdin);   // 대문자!
freopen("sort.out", "w", stdout);

// ✅ 정확하게!
freopen("sort.in", "r", stdin);   // 소문자!
freopen("sort.out", "w", stdout);
\`\`\`

**2. int 오버플로우**
\`\`\`cpp
// ❌ 위험!
int total = 1000000 * 1000000;  // 오버플로우!

// ✅ 안전하게!
long long total = 1000000LL * 1000000LL;
\`\`\`

**3. endl 대신 "\\n" 쓰기 (속도)**
\`\`\`cpp
// 느림 😩
cout << x << endl;

// 빠름 ⚡
cout << x << "\\n";
\`\`\``
        },
        {
          id: "ch3-exp3",
          type: "explain",
          title: "🏆 USACO 모의전 완주!",
          content: `## 🎉 USACO 모의전을 완주했어요!

3개의 USACO Bronze 스타일 문제를 풀면서 Part 3의 핵심을 모두 복습했어요!

### 📊 오늘 사용한 기법 정리

| 문제 | 핵심 기법 | STL |
|---|---|---|
| 🥉 소 정렬 | 커스텀 정렬 | \`pair\`, \`sort\` + lambda |
| 🥉 중복 제거 | 카운팅 & 자동 정렬 | \`map\`, \`set\` |
| 🥉 괄호 짝짓기 | LIFO 구조 활용 | \`stack\` |

### 🔑 공통으로 사용한 것들

- **\`#include <bits/stdc++.h>\`** — 모든 STL 한번에!
- **\`freopen\`** — USACO 파일 입출력
- **\`vector\`** — 동적 배열
- **range-for + structured binding** — 깔끔한 순회

---

### 🚀 다음 단계

이제 진짜 USACO Bronze에 도전해봐요!

1. **usaco.org** — 과거 문제 아카이브에서 Bronze 문제 풀기
2. 한 문제에 **30분** 이상 고민했으면 에디토리얼 참고해도 괜찮아요
3. **pair + sort**, **map**, **stack** — 이 3가지만으로 Bronze 많은 문제를 풀 수 있어요!

🏆 **USACO 모의전 클리어! 진짜 대회에서도 화이팅!** 💪`
        }
      ]
    }
  ]
}
