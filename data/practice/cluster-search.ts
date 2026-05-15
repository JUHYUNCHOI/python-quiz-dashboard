import type { PracticeCluster } from "./types"

export const searchCluster: PracticeCluster = {
  id: "search",
  title: "정렬 후 빠른 검색",
  emoji: "🔍",
  description: "binary_search, lower_bound, upper_bound 활용 — 정렬된 데이터에서 O(log N) 검색",
  unlockAfter: "cpp-25",
  en: { title: "Fast Search on Sorted Data", description: "binary_search, lower_bound, upper_bound — O(log N) queries on sorted data" },
  problems: [
    {
      id: "search-001",
      cluster: "search",
      unlockAfter: "cpp-25",
      difficulty: "쉬움",
      title: "정렬된 배열에서 값 찾기",
      description: `N개의 정수가 **이미 오름차순으로 정렬되어** 주어집니다. 그 다음 Q개의 질의가 주어지는데, 각 질의마다 정수 x 가 배열에 있는지 "YES" 또는 "NO" 로 한 줄씩 출력하세요.

> 💡 정렬돼 있으니까 binary_search 가 정답.`,
      constraints: "1 ≤ N, Q ≤ 100000, -10⁹ ≤ 각 정수 ≤ 10⁹",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 3 5 7 9\n3\n5\n4\n9", expectedOutput: "YES\nNO\nYES", label: "기본" },
        { stdin: "1\n42\n2\n42\n0", expectedOutput: "YES\nNO", label: "원소 1개" },
        { stdin: "6\n-5 -3 0 2 7 11\n4\n0\n-3\n-100\n11", expectedOutput: "YES\nYES\nNO\nYES", label: "음수 포함" },
      ],
      hints: [
        "binary_search(v.begin(), v.end(), x) 는 true/false 반환.",
        "find() 는 O(N) 이라 100,000 × 100,000 = 10¹⁰ 으로 너무 느려요. binary_search 는 O(log N).",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int q;
    cin >> q;
    while (q--) {
        int x;
        cin >> x;
        if (binary_search(v.begin(), v.end(), x)) cout << "YES\\n";
        else cout << "NO\\n";
    }
    return 0;
}`,
      solutionExplanation: "binary_search 는 정렬된 데이터에서 O(log N). 100,000 개 데이터에 100,000 개 질의면 약 100,000 × 17 ≈ 170 만 번 비교 — 충분히 빠름.",
      en: {
        title: "Search in Sorted Array",
        description: `N integers are given **already sorted in ascending order**. Then Q queries follow — for each query x, print "YES" if x is in the array, otherwise "NO", one per line.

> 💡 The array is sorted, so binary_search is the right tool.`,
        constraints: "1 ≤ N, Q ≤ 100000, -10⁹ ≤ each integer ≤ 10⁹",
        hints: [
          "`binary_search(v.begin(), v.end(), x)` returns true/false.",
          "`find()` is O(N) — too slow at 100,000 × 100,000 = 10¹⁰. `binary_search` is O(log N).",
        ],
        solutionExplanation: "`binary_search` runs in O(log N) on sorted data. With 100K data and 100K queries it's roughly 100,000 × 17 ≈ 1.7M comparisons — fast enough.",
      },
    },
    {
      id: "search-002",
      cluster: "search",
      unlockAfter: "cpp-25",
      difficulty: "쉬움",
      title: "특정 값이 몇 개?",
      description: `정렬된 N개의 정수가 주어집니다. 그 다음 Q개의 질의마다 정수 x 가 배열에 **몇 개** 있는지 한 줄씩 출력하세요.

> 💡 upper_bound - lower_bound 패턴. 두 위치의 차이가 곧 개수.`,
      constraints: "1 ≤ N, Q ≤ 100000",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "7\n1 2 2 2 3 4 5\n4\n2\n3\n1\n100", expectedOutput: "3\n1\n1\n0", label: "기본" },
        { stdin: "5\n5 5 5 5 5\n2\n5\n4", expectedOutput: "5\n0", label: "전부 같은 값" },
      ],
      hints: [
        "upper_bound(v.begin(), v.end(), x) 와 lower_bound(v.begin(), v.end(), x) 의 iterator 차이가 개수.",
        "둘 다 같은 위치 (lower==upper) 면 그 값은 배열에 없음 → 개수 0.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int q;
    cin >> q;
    while (q--) {
        int x;
        cin >> x;
        auto lo = lower_bound(v.begin(), v.end(), x);
        auto hi = upper_bound(v.begin(), v.end(), x);
        cout << (hi - lo) << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "lower_bound 는 'x 가 시작되는 위치', upper_bound 는 'x 가 끝난 다음 위치'. 두 iterator 의 차이 = x 의 개수. 둘 다 O(log N).",
      en: {
        title: "How Many of X?",
        description: `Given a sorted vector of N integers, then Q queries — for each x, print how many times x appears.

> 💡 The upper_bound - lower_bound pattern. The difference between the two iterators is the count.`,
        constraints: "1 ≤ N, Q ≤ 100000",
        hints: [
          "Subtract the lower_bound iterator from the upper_bound iterator to get the count.",
          "If both point to the same place (lower == upper), x is not in the array → 0.",
        ],
        solutionExplanation: "`lower_bound` is 'where x starts', `upper_bound` is 'one past where x ends'. The difference is exactly x's count. Both O(log N).",
      },
    },
    {
      id: "search-003",
      cluster: "search",
      unlockAfter: "cpp-25",
      difficulty: "보통",
      title: "합격선 이상 학생 수",
      description: `N명 학생의 점수가 주어집니다. 점수를 정렬한 뒤, Q개의 질의마다 정수 K 가 주어지면 **K 점 이상인 학생 수**를 한 줄씩 출력하세요.

> 💡 lower_bound 가 'K 이상 첫 위치'. 거기서 v.end() 까지의 거리.`,
      constraints: "1 ≤ N, Q ≤ 100000, 0 ≤ 점수 ≤ 100",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "6\n45 78 92 85 60 70\n3\n70\n90\n100", expectedOutput: "4\n1\n0", label: "기본" },
        { stdin: "5\n100 100 100 100 100\n2\n100\n50", expectedOutput: "5\n5", label: "전부 만점" },
      ],
      hints: [
        "sort(v.begin(), v.end()) 로 먼저 정렬.",
        "v.end() - lower_bound(v.begin(), v.end(), K) 가 'K 이상 원소 수'.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    int q;
    cin >> q;
    while (q--) {
        int k;
        cin >> k;
        cout << (v.end() - lower_bound(v.begin(), v.end(), k)) << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "정렬 후 lower_bound 가 K 이상 첫 위치를 반환. v.end() 와의 거리 = K 이상 원소 수. 매 질의 O(log N).",
      en: {
        title: "Count Students Above Threshold",
        description: `N student scores. After sorting, for each query K print **how many scored K or higher**.

> 💡 lower_bound finds 'first position with value ≥ K'. The distance to v.end() is the answer.`,
        constraints: "1 ≤ N, Q ≤ 100000, 0 ≤ score ≤ 100",
        hints: [
          "Sort first: `sort(v.begin(), v.end())`.",
          "`v.end() - lower_bound(v.begin(), v.end(), K)` = number of elements ≥ K.",
        ],
        solutionExplanation: "After sorting, `lower_bound` returns the first position with value ≥ K. Its distance to `v.end()` is the count. Each query is O(log N).",
      },
    },
    {
      id: "search-004",
      cluster: "search",
      unlockAfter: "cpp-25",
      difficulty: "보통",
      title: "구간 안의 점 개수",
      description: `정렬된 N개의 정수가 주어집니다. Q개의 질의 각각에 두 정수 a, b 가 주어지면 **[a, b] 구간 (양 끝 포함) 에 들어있는 정수의 개수**를 출력하세요.

> 💡 upper_bound(b) - lower_bound(a) 한 줄.`,
      constraints: "1 ≤ N, Q ≤ 100000, -10⁹ ≤ 각 정수 ≤ 10⁹, a ≤ b",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "7\n1 3 5 7 9 11 13\n3\n3 9\n0 100\n10 12", expectedOutput: "4\n7\n1", label: "기본" },
        { stdin: "5\n1 1 2 2 3\n2\n1 2\n0 5", expectedOutput: "4\n5", label: "중복 포함" },
      ],
      hints: [
        "lower_bound(a) = a 이상 첫 위치. upper_bound(b) = b 초과 첫 위치.",
        "둘 사이 거리 = [a, b] 안의 원소 수 (b 포함).",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int q;
    cin >> q;
    while (q--) {
        int a, b;
        cin >> a >> b;
        auto lo = lower_bound(v.begin(), v.end(), a);
        auto hi = upper_bound(v.begin(), v.end(), b);
        cout << (hi - lo) << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "lower_bound(a) 가 'a 이상 첫 거', upper_bound(b) 가 'b 초과 첫 거'. 두 위치 사이가 정확히 [a, b] 구간 (a 포함, b 포함). O(log N) 으로 끝.",
      en: {
        title: "Points in a Range",
        description: `Given a sorted vector of N integers, then Q queries each giving (a, b). Print the count of values in **[a, b] inclusive**.

> 💡 \`upper_bound(b) - lower_bound(a)\` in one line.`,
        constraints: "1 ≤ N, Q ≤ 100000, -10⁹ ≤ each integer ≤ 10⁹, a ≤ b",
        hints: [
          "`lower_bound(a)` = first position with value ≥ a. `upper_bound(b)` = first with value > b.",
          "The distance between them = count of values in [a, b] (inclusive on both ends).",
        ],
        solutionExplanation: "`lower_bound(a)` is 'first ≥ a', `upper_bound(b)` is 'first > b'. The gap is exactly the inclusive [a, b] range. O(log N) per query.",
      },
    },
    {
      id: "search-005",
      cluster: "search",
      unlockAfter: "cpp-25",
      difficulty: "보통",
      title: "예산 이하 가장 비싼 상품",
      description: `상점에 N개 상품이 있고 가격이 주어집니다. 가격을 정렬한 뒤, Q개의 질의마다 예산 B 가 주어지면 **B 원 이하의 상품 중 가장 비싼 가격**을 출력하세요. 살 수 있는 상품이 없으면 \`-1\` 출력.

> 💡 lower_bound(B+1) 의 한 칸 앞이 답. 단, 그게 begin() 이라면 살 수 있는 게 없음.`,
      constraints: "1 ≤ N, Q ≤ 100000, 1 ≤ 가격, 예산 ≤ 10⁹",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "5\n1000 3000 5000 7000 10000\n4\n2000\n5000\n100\n50000", expectedOutput: "1000\n5000\n-1\n10000", label: "기본" },
        { stdin: "3\n100 200 300\n2\n100\n99", expectedOutput: "100\n-1", label: "경계값" },
      ],
      hints: [
        "정렬 후 lower_bound(v.begin(), v.end(), B + 1) 이 'B 초과 첫 위치'.",
        "그 위치의 한 칸 앞 (it - 1) 이 'B 이하 중 가장 큰 거'. 단 it == v.begin() 이면 답 없음.",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    int q;
    cin >> q;
    while (q--) {
        long long b;
        cin >> b;
        auto it = upper_bound(v.begin(), v.end(), b);
        if (it == v.begin()) cout << -1 << "\\n";
        else cout << *(it - 1) << "\\n";
    }
    return 0;
}`,
      solutionExplanation: "upper_bound(b) 가 'b 초과 첫 위치'. 그 한 칸 앞이 'b 이하 중 가장 큰 값'. it == begin() 이면 b 이하인 게 없음 → -1.",
      en: {
        title: "Most Expensive Within Budget",
        description: `A shop has N items with given prices. After sorting, for each query budget B, print **the most expensive price that's ≤ B**. Print \`-1\` if nothing fits.

> 💡 The element just before \`upper_bound(B)\` is the answer — unless that's \`begin()\`.`,
        constraints: "1 ≤ N, Q ≤ 100000, 1 ≤ price, budget ≤ 10⁹",
        hints: [
          "Sort, then `upper_bound(v.begin(), v.end(), B)` = first position with value > B.",
          "One position before that is the largest value ≤ B — unless the iterator is `v.begin()` (nothing fits).",
        ],
        solutionExplanation: "`upper_bound(b)` returns 'first > b'. One position back is the largest value ≤ b. If it equals `begin()`, nothing is ≤ b → output -1.",
      },
    },
    {
      id: "search-006",
      cluster: "search",
      unlockAfter: "cpp-25",
      difficulty: "어려움",
      title: "정렬 유지하며 삽입",
      description: `처음에 빈 벡터가 있습니다. K개의 작업이 주어지는데, 각 작업은:
- \`1 x\` — 정수 x 를 정렬을 유지하면서 벡터에 삽입
- \`2\` — 현재 벡터의 중앙값 (size/2 위치) 출력

각 \`2\` 작업마다 한 줄씩 결과를 출력.

> 💡 lower_bound + v.insert 패턴.`,
      constraints: "1 ≤ K ≤ 1000, -10⁹ ≤ x ≤ 10⁹",
      initialCode: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,
      testCases: [
        { stdin: "6\n1 5\n1 3\n2\n1 7\n1 1\n2", expectedOutput: "5\n5", label: "기본" },
        { stdin: "5\n1 10\n2\n1 20\n2\n1 5", expectedOutput: "10\n20", label: "중앙값 변화" },
      ],
      hints: [
        "v.insert(lower_bound(v.begin(), v.end(), x), x) — 한 줄로 정렬 유지하며 삽입.",
        "중앙값은 v[v.size()/2]. (size 0 이면 안 묻는 입력 가정)",
      ],
      solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int k;
    cin >> k;
    vector<int> v;
    while (k--) {
        int op;
        cin >> op;
        if (op == 1) {
            int x;
            cin >> x;
            v.insert(lower_bound(v.begin(), v.end(), x), x);
        } else {
            cout << v[v.size() / 2] << "\\n";
        }
    }
    return 0;
}`,
      solutionExplanation: "lower_bound 가 '정렬을 유지한 채 x 가 들어갈 자리' 를 알려줘요. v.insert 가 그 자리에 끼워넣음. K 회 반복해도 N 이 작으니 OK (insert 는 O(N)).",
      en: {
        title: "Insert While Staying Sorted",
        description: `Start with an empty vector. K operations follow:
- \`1 x\` — insert integer x while keeping the vector sorted
- \`2\` — print the median (element at size/2)

Print the answer to each \`2\` operation on its own line.

> 💡 The \`lower_bound\` + \`v.insert\` pattern.`,
        constraints: "1 ≤ K ≤ 1000, -10⁹ ≤ x ≤ 10⁹",
        hints: [
          "`v.insert(lower_bound(v.begin(), v.end(), x), x)` — sorted insertion in one line.",
          "Median is `v[v.size()/2]`. (Inputs guarantee non-empty when asking.)",
        ],
        solutionExplanation: "`lower_bound` tells you where x should go to keep the vector sorted. `v.insert` places it there. Works fine for small K because insert itself is O(N).",
      },
    },
  ],
}
