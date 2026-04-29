import type { PracticeCluster } from "./types"

export const pairTupleCluster: PracticeCluster = {
  id: "pair-tuple",
  title: "pair & tuple",
  emoji: "🔗",
  description: "두 값 묶기, structured bindings, vector<pair>, 함수 multi-return",
  unlockAfter: "cpp-15",
  en: { title: "pair & tuple", description: "Bundle two values, structured bindings, vector<pair>, multi-return functions" },
  problems: [
    {
      id: "pt-001",
      cluster: "pair-tuple",
      unlockAfter: "cpp-15",
      difficulty: "쉬움",
      title: "함수에서 두 값 반환 — divmod (몫, 나머지)",
      description: `\`divmod(a, b)\` **함수를 직접 작성** 하세요. 이 함수는 \`pair<int, int>\` 로 **(몫, 나머지)** 를 한 번에 돌려줘요.

main 에서 두 정수 \`a b\` 를 입력받아 \`divmod\` 호출 후 \`몫 나머지\` 를 한 줄에 출력하세요.

> 💡 함수가 **두 값을 한 번에 반환** 하려면 pair 가 정석. 변수 두 개 따로 반환하는 건 C++ 에서 불가능 — pair 의 진짜 강제 use case.`,
      constraints: "-10000 ≤ a ≤ 10000, 1 ≤ b ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "17 5", expectedOutput: "3 2", label: "기본 — 17 = 3*5 + 2" },
        { stdin: "20 4", expectedOutput: "5 0", label: "나누어 떨어짐" },
        { stdin: "7 10", expectedOutput: "0 7", label: "a < b" },
        { stdin: "100 7", expectedOutput: "14 2", label: "큰 수" },
      ],
      hints: [
        "함수 정의: pair<int, int> divmod(int a, int b) { return {a / b, a % b}; }",
        "main 에서 호출 + 풀어 담기: auto [q, r] = divmod(a, b);",
        "출력: cout << q << \" \" << r;",
      ],
      solutionCode: `#include <iostream>
#include <utility>
using namespace std;

pair<int, int> divmod(int a, int b) {
    return {a / b, a % b};
}

int main() {
    int a, b;
    cin >> a >> b;
    auto [q, r] = divmod(a, b);
    cout << q << " " << r << "\\n";
    return 0;
}`,
      solutionExplanation: "**pair 가 진짜 강제되는 패턴 — 함수에서 여러 값 반환.** C++ 함수는 값을 *하나* 만 반환할 수 있어요. 두 값 (몫, 나머지) 을 한 번에 보내려면 pair (또는 struct/tuple) 로 묶어야 함. 호출부에선 structured bindings 로 풀어 담기.",
      en: {
        title: "Return Two Values from a Function — divmod (quotient, remainder)",
        description: `**Write a function** \`divmod(a, b)\` that returns \`pair<int, int>\` containing **(quotient, remainder)** in one go.

In main, read two integers \`a b\`, call \`divmod\`, and print \`quotient remainder\` on one line.

> 💡 To return **two values at once**, pair is the canonical answer. C++ doesn't allow returning two separate variables — this is pair's truly mandatory use case.`,
        constraints: "-10000 ≤ a ≤ 10000, 1 ≤ b ≤ 10000",
        initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
        hints: [
          "Define: pair<int, int> divmod(int a, int b) { return {a / b, a % b}; }",
          "Call + unpack: auto [q, r] = divmod(a, b);",
          "Print: cout << q << \" \" << r;",
        ],
        solutionExplanation: "**Pair's truly mandatory pattern — multi-value function returns.** C++ functions return *one* value. To send back two (quotient, remainder), bundle them in a pair (or struct/tuple). At the call site, use structured bindings to unpack.",
      },
    },
    {
      id: "pt-002",
      cluster: "pair-tuple",
      unlockAfter: "cpp-15",
      difficulty: "쉬움",
      title: "함수에서 (min, max) pair 로 반환",
      description: `\`minmax(v)\` **함수를 직접 작성** 하세요. 이 함수는 \`vector<int>\` 를 받아 **(최솟값, 최댓값)** 을 \`pair<int, int>\` 로 반환합니다.

main 에서 N 개의 정수를 입력받아 함수 호출 후 \`min max\` 출력.

> 💡 두 값을 한 함수에서 같이 구하면 두 번 순회 안 해도 되어 효율적. 두 결과를 한 묶음으로 반환 = pair.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "1 5", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42 42", label: "한 개 — 같음" },
        { stdin: "4\n-3 -1 -7 -2", expectedOutput: "-7 -1", label: "전부 음수" },
        { stdin: "3\n10 10 10", expectedOutput: "10 10", label: "전부 같음" },
      ],
      hints: [
        "함수 안: int mn = v[0], mx = v[0]; range-for 로 mn = min(mn, x), mx = max(mx, x). return {mn, mx};",
        "main 에서: auto [mn, mx] = minmax(v); cout << mn << \" \" << mx;",
        "두 결과를 별도 함수 두 번 호출하면 비효율 — 한 함수가 pair 로 둘 다 반환하면 한 번 순회로 끝.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <utility>
#include <algorithm>
using namespace std;

pair<int, int> minmax(const vector<int>& v) {
    int mn = v[0], mx = v[0];
    for (int x : v) {
        mn = std::min(mn, x);
        mx = std::max(mx, x);
    }
    return {mn, mx};
}

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    auto [mn, mx] = minmax(v);
    cout << mn << " " << mx << "\\n";
    return 0;
}`,
      solutionExplanation: "**한 함수, 두 결과 = pair.** min 과 max 를 따로 두 함수로 만들면 vector 를 두 번 순회. pair 로 한 번에 반환하면 한 번만 순회. 호출부는 structured bindings 로 깔끔하게 풀어 담기. (참고: STL 에 \`std::minmax_element\` 가 같은 일을 해줘요 — 반환 타입이 pair 인 이유가 이거.)",
      en: {
        title: "Return (min, max) as pair from a Function",
        description: `**Write a function** \`minmax(v)\` that takes a \`vector<int>\` and returns **(min, max)** as a \`pair<int, int>\`.

In main, read N integers, call the function, and print \`min max\`.

> 💡 Computing both in one function avoids two passes — efficient. Returning both as one bundle = pair.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each integer ≤ 10000",
        initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
        hints: [
          "Inside the function: int mn = v[0], mx = v[0]; range-for with mn = min(mn, x), mx = max(mx, x). return {mn, mx};",
          "In main: auto [mn, mx] = minmax(v); cout << mn << \" \" << mx;",
          "Two separate functions would scan the vector twice — one function returning a pair scans once.",
        ],
        solutionExplanation: "**One function, two results = pair.** Splitting min and max into two functions means scanning the vector twice. Returning both as a pair scans once. The caller uses structured bindings to unpack. (FYI: STL's `std::minmax_element` does exactly this — that's why its return type is a pair.)",
      },
    },
    {
      id: "pt-003",
      cluster: "pair-tuple",
      unlockAfter: "cpp-15",
      difficulty: "쉬움",
      title: "평균 점수 + 평균 이상 학생 이름",
      description: `N 명의 학생 (이름, 점수) 가 주어질 때:
1. **첫 줄**: 평균 점수 (정수 나눗셈)
2. **다음 줄들**: **평균 이상** 인 학생들의 이름 (입력 순서 유지, 한 줄에 한 명)

> 💡 평균 계산엔 점수만 필요하지만 출력엔 이름이 필요 — 점수와 이름이 짝꿍으로 묶여 있어야 매칭이 안 깨져요. **\`vector<pair<string, int>>\` 사용**.`,
      constraints: "1 ≤ N ≤ 1000, 이름은 영문 1-20자, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "3\nAlice 90\nBob 80\nCarol 70", expectedOutput: "80\nAlice\nBob", label: "기본 — 평균 80, Alice·Bob 이상" },
        { stdin: "1\nDave 100", expectedOutput: "100\nDave", label: "한 명 — 본인이 평균" },
        { stdin: "4\nEve 100\nFrank 90\nGrace 80\nHan 70", expectedOutput: "85\nEve\nFrank", label: "짝수 명 — 평균 85" },
        { stdin: "5\nIvy 60\nJay 50\nKim 40\nLee 30\nMin 20", expectedOutput: "40\nIvy\nJay\nKim", label: "감소 — 평균 40" },
      ],
      hints: [
        "1단계: int total = 0; range-for 로 점수 누적 (s.second 또는 auto& [name, score] = s; 후 score)",
        "2단계: 평균 = total / n. cout << avg << endl;",
        "3단계: 다시 range-for, 점수 >= 평균 인 학생의 이름 출력 — pair 짝꿍 덕에 이름·점수 매칭이 자동",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> students(n);
    for (int i = 0; i < n; i++) cin >> students[i].first >> students[i].second;

    int total = 0;
    for (auto& [name, score] : students) total += score;
    int avg = total / n;
    cout << avg << "\\n";

    for (auto& [name, score] : students) {
        if (score >= avg) cout << name << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "**pair 가 진짜 필요해지는 자리** — 평균 계산은 점수만 필요하지만 출력은 *이름* 이 필요. 두 값이 묶여있지 않으면 (vector<int> 점수, vector<string> 이름 따로) 인덱스로 매칭해야 하고 실수 가능. pair 로 묶으면 짝꿍 자동 유지 — 1단계 평균 계산, 2단계 평균 이상 필터+이름 출력.",
      en: {
        title: "Average Score + Names Above Average",
        description: `Given N students (name, score):
1. **First line**: average score (integer division)
2. **Following lines**: names of students with score **at or above the average** (preserve input order, one per line)

> 💡 Averaging needs only scores, but output needs names — keep them paired so the matching can't drift. **Use \`vector<pair<string, int>>\`**.`,
        constraints: "1 ≤ N ≤ 1000, names are 1-20 English chars, 0 ≤ score ≤ 100",
        initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
        hints: [
          "Step 1: int total = 0; range-for accumulating scores (s.second or auto& [name, score] = s; then score).",
          "Step 2: avg = total / n. cout << avg << endl;",
          "Step 3: range-for again, print name when score >= avg — pair keeps name/score paired automatically.",
        ],
        solutionExplanation: "**Where pair earns its keep** — averaging only needs scores, but output needs *names*. Without pair (separate vectors), you'd track them by parallel indices — error-prone. Pair keeps them bonded — pass 1: compute average, pass 2: filter by score and print name.",
      },
    },
    {
      id: "pt-004",
      cluster: "pair-tuple",
      unlockAfter: "cpp-15",
      difficulty: "보통",
      title: "filter — 80점 이상 학생만 출력",
      description: `N명의 학생 (이름, 점수) 가 주어질 때, **점수 80 이상인 학생만** 한 줄에 한 명씩 \`이름 점수\` 형식으로 출력하세요. (입력 순서 유지)

> 💡 평행 vector 로도 풀 수 있지만 **\`vector<pair<string, int>>\` 사용** — 이름·점수 짝꿍 유지 패턴 익히기. 다음 챕터 (sort) 에서 진가 발휘.`,
      constraints: "1 ≤ N ≤ 1000, 이름은 영문 1-20자, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "5\nAlice 72\nBob 88\nCarol 55\nDave 95\nEve 81", expectedOutput: "Bob 88\nDave 95\nEve 81", label: "기본" },
        { stdin: "3\nFrank 80\nGrace 79\nHan 100", expectedOutput: "Frank 80\nHan 100", label: "경계값 80" },
        { stdin: "2\nIvy 50\nJay 60", expectedOutput: "", label: "통과자 없음" },
      ],
      hints: [
        "range-for 로 돌면서 점수 조건 체크 — 통과하면 출력",
        "꺼내는 방식은 본인 편한 쪽: .first/.second 또는 auto& [name, score] = s;",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    for (auto& [name, score] : v) {
        if (score >= 80) cout << name << " " << score << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "filter 패턴 — 데이터 중 조건에 맞는 것만 골라 처리. range-for + structured bindings 가 가장 가독성 좋은 형태.",
      en: {
        title: "Filter — Print Students with Score 80+",
        description: `Given N students with (name, score), print **only students scoring 80 or above**, one per line, as \`name score\`. (Preserve input order.)

> 💡 Parallel vectors would work, but **use \`vector<pair<string, int>>\`** — practice the bonded-pair pattern. The next chapter (sort) is where it really shines.`,
        constraints: "1 ≤ N ≤ 1000, name is 1-20 English letters, 0 ≤ score ≤ 100",
        initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
        hints: [
          "Range-for through students, check the score condition, print on match.",
          "Access values either way: .first/.second or auto& [name, score] = s;",
        ],
        solutionExplanation: "Filter pattern — pick out items matching a condition. range-for + structured bindings is the most readable form.",
      },
    },
    {
      id: "pt-005",
      cluster: "pair-tuple",
      unlockAfter: "cpp-15",
      difficulty: "보통",
      title: "max-tracking — 가장 높은 점수의 학생 이름",
      description: `N명의 학생 (이름, 점수) 중 **가장 높은 점수를 받은 학생의 이름** 만 출력하세요. (정렬 X — 한 번 훑으면서 최댓값 추적)
점수가 같은 학생이 여러 명이면 **먼저 입력된** 학생을 출력.

> 💡 평행 vector 로도 풀 수 있지만 **\`vector<pair<string, int>>\` 사용** — pair 째로 best 트래커에 담으면 이름·점수 짝꿍이 자동으로 같이 갱신돼요. 다음 챕터 (sort) 에서 진가 발휘.`,
      constraints: "1 ≤ N ≤ 1000, 이름은 영문 1-20자, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "3\nAlice 85\nBob 92\nCarol 78", expectedOutput: "Bob", label: "기본" },
        { stdin: "1\nDave 50", expectedOutput: "Dave", label: "한 명" },
        { stdin: "4\nEve 90\nFrank 90\nGrace 88\nHan 90", expectedOutput: "Eve", label: "동점 → 먼저 입력된" },
      ],
      hints: [
        "best = v[0] 로 시작 → range-for 로 돌면서 더 높은 점수 나오면 갱신",
        "동점은 입력 순서 우선 → > (엄격한 부등호) 로 비교, >= 쓰면 안 됨",
      ],
      solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    pair<string, int> best = v[0];
    for (auto& p : v) {
        if (p.second > best.second) best = p;
    }
    cout << best.first << "\\n";
    return 0;
}`,
      solutionExplanation: "single-pass max tracking — sort 안 쓰고 한 번 순회로 최대값 찾는 패턴. 동점 처리는 비교 연산자 (>) vs (>=) 로 결정. >= 쓰면 마지막 동점자가 남음.",
      en: {
        title: "Max-tracking — Name of Top-scoring Student",
        description: `Given N students with (name, score), print **just the name of the student with the highest score**. (No sorting — single-pass max tracking.)
On ties, print the **earliest-entered** student.

> 💡 Parallel vectors would work, but **use \`vector<pair<string, int>>\`** — keeping the whole pair in a tracker means name and score never drift apart. The next chapter (sort) is where it really shines.`,
        constraints: "1 ≤ N ≤ 1000, name is 1-20 English letters, 0 ≤ score ≤ 100",
        initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
        hints: [
          "Seed best = v[0], range-for through, update when a higher score appears.",
          "For ties → earliest wins, use strict > (not >=).",
        ],
        solutionExplanation: "Single-pass max tracking — find the maximum without sorting. Tie-breaking depends on the operator: > keeps the first, >= keeps the last.",
      },
    },
    {
      id: "pt-006",
      cluster: "pair-tuple",
      unlockAfter: "cpp-15",
      difficulty: "보통",
      title: "tuple multi-return — 합·최대·최소",
      description: `함수 \`analyze(v)\` 가 정수 벡터의 **(합, 최대, 최소)** 를 \`tuple<int, int, int>\` 로 한 번에 돌려줘요.
N개의 정수가 주어질 때, 이 함수를 호출하고 **structured bindings 로 풀어** 한 줄에 \`합 최대 최소\` 출력하세요.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ 각 정수 ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "14 5 1", label: "기본" },
        { stdin: "3\n-2 -8 -3", expectedOutput: "-13 -2 -8", label: "음수" },
        { stdin: "1\n42", expectedOutput: "42 42 42", label: "한 개" },
      ],
      hints: [
        "auto [sum, mx, mn] = analyze(v);",
        "출력은 cout << sum << \" \" << mx << \" \" << mn;",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <tuple>
#include <algorithm>
using namespace std;

tuple<int, int, int> analyze(const vector<int>& v) {
    int sum = 0;
    int mx = v[0], mn = v[0];
    for (int x : v) {
        sum += x;
        mx = max(mx, x);
        mn = min(mn, x);
    }
    return {sum, mx, mn};
}

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    auto [sum, mx, mn] = analyze(v);
    cout << sum << " " << mx << " " << mn << "\\n";
    return 0;
}`,
      solutionExplanation: "tuple 의 진짜 자연스러운 용도 — **함수에서 여러 값 한 번에 리턴**. structured bindings 와 결합하면 호출부가 깔끔해짐 (`auto [a, b, c] = func()`). pair 로는 2 개까지만 가능.",
      en: {
        title: "tuple multi-return — sum, max, min",
        description: `A function \`analyze(v)\` returns the **(sum, max, min)** of an int vector as a \`tuple<int, int, int>\` in one call.
Given N integers, call the function, **unpack with structured bindings**, and print \`sum max min\` on one line.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ each integer ≤ 10000",
        initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
        hints: [
          "auto [sum, mx, mn] = analyze(v);",
          "Print: cout << sum << \" \" << mx << \" \" << mn;",
        ],
        solutionExplanation: "tuple's most natural use — **returning multiple values from a function**. Combined with structured bindings, the call site stays clean (`auto [a, b, c] = func()`). pair tops out at 2 values.",
      },
    },
    {
      id: "pt-007",
      cluster: "pair-tuple",
      unlockAfter: "cpp-15",
      difficulty: "어려움",
      title: "좌표 — 원점에서 가장 가까운 점",
      description: `2D 평면 위의 N개의 점이 주어질 때, **원점 (0, 0) 에서 가장 가까운 점** 의 좌표를 출력하세요.
거리는 \`x² + y²\` (제곱근 안 씀 — 비교만 하면 되니까).
출력 형식: \`x y\` (가장 가까운 점)
동점이면 **먼저 입력된** 점 우선.

> 💡 좌표 (x, y) 는 pair 의 가장 자연스러운 용도 — 분리하면 "x 가 어느 점의 x 인지" 추적 어려움. **\`vector<pair<int, int>>\` 사용**.`,
      constraints: "1 ≤ N ≤ 1000, -10000 ≤ x, y ≤ 10000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "3\n3 4\n1 1\n5 0", expectedOutput: "1 1", label: "기본 — 1²+1²=2 가 최소" },
        { stdin: "1\n7 -3", expectedOutput: "7 -3", label: "한 점" },
        { stdin: "4\n2 0\n0 2\n-2 0\n0 -2", expectedOutput: "2 0", label: "동점 (모두 거리² = 4) — 첫 점" },
        { stdin: "3\n10 10\n-1 0\n0 1", expectedOutput: "-1 0", label: "음수 좌표 포함" },
      ],
      hints: [
        "best = points[0] 로 시작 → range-for 로 거리² 비교하며 갱신",
        "거리 비교는 sqrt 안 써도 됨 — x*x + y*y 두 개를 그대로 비교",
        "structured bindings 로 깔끔하게: auto& [x, y] = p; 후 long long d = (long long)x*x + y*y;",
        "동점 시 '먼저 입력' 우선 → 엄격한 < 사용",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <utility>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int, int>> points(n);
    for (int i = 0; i < n; i++) cin >> points[i].first >> points[i].second;
    pair<int, int> best = points[0];
    long long bestDist = (long long)best.first * best.first + (long long)best.second * best.second;
    for (auto& [x, y] : points) {
        long long d = (long long)x * x + (long long)y * y;
        if (d < bestDist) {
            bestDist = d;
            best = {x, y};
        }
    }
    cout << best.first << " " << best.second << "\\n";
    return 0;
}`,
      solutionExplanation: "좌표는 pair 의 **가장 자연스러운 용도** — 점 하나 = (x, y) 는 항상 같이 다녀야 의미 있음. 한 번 순회로 최소 거리 점 추적. \`sqrt\` **안 쓰는 이유**: 비교만 하면 되니까 거리² 끼리 비교해도 결과 같고 정수 연산이라 더 빠르고 정확. \`long long\` **쓰는 이유**: x, y 가 ±10000 이면 x*x 는 1억까지 갈 수 있어 int 안전 범위 (~21억) 안이지만, 두 개 더하면 2억. 안전하게 long long 으로.",
      en: {
        title: "Coordinates — Closest Point to Origin",
        description: `Given N points in 2D, print the **point closest to the origin (0, 0)**.
Use distance² = \`x² + y²\` (no square root needed — comparison is enough).
Output format: \`x y\` (the closest point)
On ties, the **earliest-entered** point wins.

> 💡 Coordinates (x, y) are pair's most natural fit — splitting them makes it hard to track which x belongs to which point. **Use \`vector<pair<int, int>>\`**.`,
        constraints: "1 ≤ N ≤ 1000, -10000 ≤ x, y ≤ 10000",
        initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
        hints: [
          "Seed best = points[0], then range-for comparing distance² and updating.",
          "Skip sqrt — comparing x*x + y*y directly gives the same answer and avoids floating-point.",
          "Structured bindings keep it clean: auto& [x, y] = p; then long long d = (long long)x*x + y*y;",
          "For ties → earliest wins, use strict < .",
        ],
        solutionExplanation: "Coordinates are pair's **most natural use case** — a point = (x, y) only makes sense as a unit. Single-pass tracking finds the closest point. **Why no sqrt**: comparison only — comparing distance² gives the same ordering, stays in integer math, faster and more precise. **Why long long**: x*x can reach 1e8 within int range, but summing two reaches 2e8 — use long long for safety.",
      },
    },
  ],
}
