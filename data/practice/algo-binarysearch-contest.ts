import type { PracticeCluster } from "./types"

export const binarySearchContestCluster: PracticeCluster = {
  id: "algo-binarysearch-contest",
  title: "이분탐색 문제 풀이",
  emoji: "🔍",
  description: "정렬된 배열 검색, lower/upper bound, parametric search",
  unlockAfter: "algo-binarysearch",
  en: {
    title: "Binary Search Practice",
    description: "Sorted search, lower/upper bound, parametric",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. 수 찾기 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-001",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "보통",
      title: "수 찾기 (이분탐색)",
      description: `N 개의 정수가 주어진다. 그 다음 M 개의 정수가 주어질 때, 각 정수가 N 개의 수 안에 있으면 \`1\`, 없으면 \`0\` 을 한 줄에 하나씩 출력하라.

**선형 탐색 O(N×M) 은 N=M=10^5 일 때 10^10 → 시간초과.** 정렬 후 **이분탐색** O((N+M) log N) 으로 풀어야 한다.

핵심: 입력 배열을 정렬 → 각 쿼리마다 \`binary_search\` (C++) / \`bisect\` (Python) 로 존재 여부 확인.

출처: BOJ 1920 paraphrased`,
      constraints: "1 ≤ N, M ≤ 100,000, -10^9 ≤ 각 정수 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n4 1 5 2 3\n5\n1 3 7 9 5", expectedOutput: "1\n1\n0\n0\n1", label: "기본 — 일부 존재, 일부 없음" },
        { stdin: "1\n42\n3\n42 41 43", expectedOutput: "1\n0\n0", label: "N=1, 한 개만 일치" },
        { stdin: "5\n1 2 3 4 5\n3\n6 0 3", expectedOutput: "0\n0\n1", label: "경계값 — 범위 밖" },
        { stdin: "3\n-5 0 5\n4\n-5 0 5 -1", expectedOutput: "1\n1\n1\n0", label: "음수 포함" },
        { stdin: "5\n10 20 30 40 50\n5\n10 50 25 40 100", expectedOutput: "1\n1\n0\n1\n0", label: "정렬 안 된 입력" },
        { stdin: "4\n1 1 2 2\n3\n1 2 3", expectedOutput: "1\n1\n0", label: "중복 원소 — 존재 여부만" },
      ],
      hints: [
        "먼저 N 개를 입력받아 정렬.",
        "각 쿼리마다 정렬된 배열에 binary_search (C++) / bisect_left + 검사 (Python) 사용.",
        "선형 탐색은 10^10 회 → 무조건 시간초과. 정렬 + 이분탐색 필수.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sort(a.begin(), a.end());

    int m;
    cin >> m;
    while (m--) {
        int x;
        cin >> x;
        cout << (binary_search(a.begin(), a.end(), x) ? 1 : 0) << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "이분탐색의 가장 단순한 형태 — 정렬 후 \`binary_search\` 한 줄. O((N+M) log N) 으로 10^5 + 10^5 도 0.1 초 안.",
      pyInitialCode: `import sys
from bisect import bisect_left
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from bisect import bisect_left
input = sys.stdin.readline

n = int(input())
a = sorted(map(int, input().split()))
m = int(input())
queries = list(map(int, input().split()))

out = []
for x in queries:
    i = bisect_left(a, x)
    out.append("1" if i < n and a[i] == x else "0")
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Find a Number (Binary Search)",
        description: `Given N integers and M query integers, print \`1\` if the query exists in the N numbers, else \`0\`, one per line.

**Linear scan O(N×M) = 10^10 → TLE.** Sort + **binary search** = O((N+M) log N).

Key: sort the input array, then for each query use \`binary_search\` (C++) / \`bisect\` (Python).

Source: BOJ 1920 paraphrased`,
        constraints: "1 ≤ N, M ≤ 100,000, -10^9 ≤ each integer ≤ 10^9",
        hints: [
          "Read N integers, then sort.",
          "For each query, use binary_search (C++) / bisect_left + check (Python).",
          "Linear search hits 10^10 → TLE for sure. Sort + binary search is required.",
        ],
        solutionExplanation:
          "Simplest binary search — sort, then \`binary_search\` per query. O((N+M) log N), fast even at 10^5 + 10^5.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. lower_bound — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-002",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "보통",
      title: "lower_bound — 첫 위치 찾기",
      description: `정렬된 N 개의 정수 배열에서 Q 개의 쿼리에 대해 **각 쿼리 값 이상이 처음 등장하는 인덱스 (0-based)** 를 출력하라. 그런 값이 없으면 \`N\` 을 출력.

이게 바로 \`lower_bound\` — \`x\` 보다 같거나 큰 첫 위치.

예: 배열 \`[1, 3, 3, 5, 7]\` 에 대해
- \`3\` 의 lower_bound → 1 (값 3 의 첫 등장)
- \`4\` 의 lower_bound → 3 (5 의 위치)
- \`8\` 의 lower_bound → 5 (배열 끝, 없음)

출처: 원본 (lower_bound 개념 다지기)`,
      constraints: "1 ≤ N, Q ≤ 100,000, -10^9 ≤ 각 정수 ≤ 10^9. 입력 배열은 이미 정렬되어 있음",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 3 3 5 7\n3\n3 4 8", expectedOutput: "1\n3\n5", label: "기본 예시" },
        { stdin: "5\n1 2 3 4 5\n5\n1 2 3 4 5", expectedOutput: "0\n1\n2\n3\n4", label: "각 원소의 lower_bound = 자기 위치" },
        { stdin: "5\n10 20 30 40 50\n3\n5 15 100", expectedOutput: "0\n1\n5", label: "범위 밖 — 앞쪽 / 가운데 / 뒤쪽" },
        { stdin: "4\n1 1 1 1\n2\n1 2", expectedOutput: "0\n4", label: "모두 같은 값" },
        { stdin: "1\n5\n3\n3 5 7", expectedOutput: "0\n0\n1", label: "N=1" },
        { stdin: "3\n-5 0 5\n4\n-10 -5 0 6", expectedOutput: "0\n0\n1\n3", label: "음수 포함" },
      ],
      hints: [
        "C++: \`lower_bound(a.begin(), a.end(), x) - a.begin()\` 로 인덱스 얻기.",
        "Python: \`bisect_left(a, x)\` 가 정확히 같은 동작.",
        "값이 없으면 결과가 \`N\` (배열 끝 너머) 이 됨 — 이게 정답이다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    int q;
    cin >> q;
    while (q--) {
        int x;
        cin >> x;
        int idx = lower_bound(a.begin(), a.end(), x) - a.begin();
        cout << idx << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "\`lower_bound\` 는 \`x\` 이상이 처음 나오는 위치. 직접 구현하면 \`while (lo < hi) { mid = (lo+hi)/2; if (a[mid] < x) lo = mid+1; else hi = mid; }\` — 답은 lo. STL 한 줄로 끝.",
      pyInitialCode: `import sys
from bisect import bisect_left
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from bisect import bisect_left
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
q = int(input())
queries = list(map(int, input().split()))

out = [str(bisect_left(a, x)) for x in queries]
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "lower_bound — First Position ≥ x",
        description: `Given a sorted array of N integers and Q queries, for each query value print the **first 0-based index where value ≥ x**. If no such position exists, print \`N\`.

This is \`lower_bound\` — first position with value at least \`x\`.

Example: array \`[1, 3, 3, 5, 7]\`
- lower_bound of \`3\` → 1 (first occurrence of 3)
- lower_bound of \`4\` → 3 (position of 5)
- lower_bound of \`8\` → 5 (past the end)

Source: original (cementing lower_bound)`,
        constraints: "1 ≤ N, Q ≤ 100,000, -10^9 ≤ each integer ≤ 10^9. Input array is pre-sorted.",
        hints: [
          "C++: \`lower_bound(a.begin(), a.end(), x) - a.begin()\`.",
          "Python: \`bisect_left(a, x)\` does the same thing.",
          "If no value qualifies, the result is \`N\` (past the end) — that's the correct answer.",
        ],
        solutionExplanation:
          "\`lower_bound\` returns the first position with value ≥ x. Manual form: \`while (lo < hi) { mid = (lo+hi)/2; if (a[mid] < x) lo=mid+1; else hi=mid; }\` — answer is lo. The STL one-liner is enough.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. upper_bound — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-003",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "보통",
      title: "upper_bound — 초과 위치 찾기",
      description: `정렬된 N 개의 정수 배열에서 Q 개의 쿼리에 대해 **각 쿼리 값을 초과하는 값이 처음 등장하는 인덱스 (0-based)** 를 출력하라. 그런 값이 없으면 \`N\` 을 출력.

이게 \`upper_bound\` — \`x\` **보다 큰** 첫 위치 (= 와 같으면 안 됨).

예: 배열 \`[1, 3, 3, 5, 7]\` 에 대해
- \`3\` 의 upper_bound → 3 (3 보다 큰 첫 위치, 즉 5 의 자리)
- \`4\` 의 upper_bound → 3
- \`7\` 의 upper_bound → 5

핵심 차이: \`lower_bound\` 는 ≥ x, \`upper_bound\` 는 > x.

출처: 원본 (upper_bound — lower_bound 의 친구)`,
      constraints: "1 ≤ N, Q ≤ 100,000, -10^9 ≤ 각 정수 ≤ 10^9. 입력 배열은 이미 정렬되어 있음",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 3 3 5 7\n3\n3 4 7", expectedOutput: "3\n3\n5", label: "기본 예시" },
        { stdin: "5\n1 2 3 4 5\n5\n0 1 3 5 10", expectedOutput: "0\n1\n3\n5\n5", label: "각 위치" },
        { stdin: "4\n1 1 1 1\n2\n1 0", expectedOutput: "4\n0", label: "모두 같음 — 1 의 upper_bound 는 끝" },
        { stdin: "1\n5\n3\n4 5 6", expectedOutput: "0\n1\n1", label: "N=1" },
        { stdin: "6\n2 2 2 3 3 3\n2\n2 3", expectedOutput: "3\n6", label: "중복 그룹 — upper_bound 는 그룹의 끝 다음" },
        { stdin: "3\n-5 0 5\n3\n-5 0 5", expectedOutput: "1\n2\n3", label: "각각 자기 다음 위치" },
      ],
      hints: [
        "C++: \`upper_bound(a.begin(), a.end(), x) - a.begin()\`.",
        "Python: \`bisect_right(a, x)\` 가 정확히 같다.",
        "\`upper_bound - lower_bound\` 가 바로 \`x\` 의 등장 횟수 → 다음 문제 (abs-004) 에서 활용.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    int q;
    cin >> q;
    while (q--) {
        int x;
        cin >> x;
        int idx = upper_bound(a.begin(), a.end(), x) - a.begin();
        cout << idx << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "\`upper_bound\` 는 \`x\` 를 초과하는 첫 위치. 직접 구현 시 비교를 \`<=\` 로 바꾸면 됨: \`if (a[mid] <= x) lo = mid+1; else hi = mid;\`.",
      pyInitialCode: `import sys
from bisect import bisect_right
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from bisect import bisect_right
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
q = int(input())
queries = list(map(int, input().split()))

out = [str(bisect_right(a, x)) for x in queries]
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "upper_bound — First Position > x",
        description: `Given a sorted array of N integers and Q queries, for each query value print the **first 0-based index where value > x**. If no such position exists, print \`N\`.

This is \`upper_bound\` — first position with value **strictly greater** than \`x\`.

Example: array \`[1, 3, 3, 5, 7]\`
- upper_bound of \`3\` → 3 (first index > 3, i.e. position of 5)
- upper_bound of \`4\` → 3
- upper_bound of \`7\` → 5

Key difference: \`lower_bound\` is ≥ x, \`upper_bound\` is > x.

Source: original (upper_bound — lower_bound's partner)`,
        constraints: "1 ≤ N, Q ≤ 100,000, -10^9 ≤ each integer ≤ 10^9. Input array is pre-sorted.",
        hints: [
          "C++: \`upper_bound(a.begin(), a.end(), x) - a.begin()\`.",
          "Python: \`bisect_right(a, x)\` does the same.",
          "\`upper_bound - lower_bound\` gives the count of \`x\` — that's the next problem (abs-004).",
        ],
        solutionExplanation:
          "\`upper_bound\` is the first position with value > x. Manual: flip the compare to \`<=\` in lower_bound's loop: \`if (a[mid] <= x) lo=mid+1; else hi=mid;\`.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. K 의 개수 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-004",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "보통",
      title: "정렬된 배열에서 K 의 개수",
      description: `정렬된 N 개의 정수 배열과 Q 개의 쿼리 값 K 가 주어진다. 각 K 에 대해 배열에 **K 가 몇 번 등장하는지** 출력하라.

핵심 공식: **\`count(K) = upper_bound(K) - lower_bound(K)\`**

\`lower_bound\` 는 K 의 첫 등장 위치, \`upper_bound\` 는 K 마지막 등장 다음 위치 → 그 차이가 등장 횟수.

선형 탐색은 O(N × Q) = 10^10 → TLE. 이분탐색 두 번이면 O(log N) per query.

출처: BOJ 10816 paraphrased`,
      constraints: "1 ≤ N, Q ≤ 100,000, -10^9 ≤ 각 정수 ≤ 10^9. 입력 배열은 정렬되어 있음",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "8\n1 2 2 3 3 3 4 5\n4\n2 3 4 6", expectedOutput: "2 3 1 0", label: "기본 — 각 K 의 개수" },
        { stdin: "5\n1 1 1 1 1\n2\n1 2", expectedOutput: "5 0", label: "모두 같은 값" },
        { stdin: "5\n1 2 3 4 5\n3\n1 5 3", expectedOutput: "1 1 1", label: "유일 — 각 1번" },
        { stdin: "1\n42\n3\n42 41 43", expectedOutput: "1 0 0", label: "N=1" },
        { stdin: "6\n-3 -3 0 0 0 5\n3\n-3 0 5", expectedOutput: "2 3 1", label: "음수 + 0 포함" },
        { stdin: "4\n1 2 3 4\n2\n0 100", expectedOutput: "0 0", label: "쿼리가 범위 밖" },
      ],
      hints: [
        "한 줄 핵심: \`count = upper_bound(K) - lower_bound(K)\`.",
        "출력은 공백으로 구분된 한 줄 — 각 K 의 개수를 띄어쓰기로.",
        "각 쿼리당 O(log N) → 전체 O((N + Q) log N).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    int q;
    cin >> q;
    string out;
    for (int i = 0; i < q; i++) {
        int k;
        cin >> k;
        int lo = lower_bound(a.begin(), a.end(), k) - a.begin();
        int hi = upper_bound(a.begin(), a.end(), k) - a.begin();
        if (i > 0) out += ' ';
        out += to_string(hi - lo);
    }
    cout << out << "\\n";
    return 0;
}`,
      solutionExplanation:
        "정렬된 배열에서 K 의 개수는 \`upper_bound(K) - lower_bound(K)\`. 두 이분탐색의 차 — 단순하지만 강력. Python 은 \`bisect_right - bisect_left\` 동일.",
      pyInitialCode: `import sys
from bisect import bisect_left, bisect_right
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from bisect import bisect_left, bisect_right
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
q = int(input())
queries = list(map(int, input().split()))

out = [str(bisect_right(a, k) - bisect_left(a, k)) for k in queries]
print(" ".join(out))
`,
      en: {
        title: "Count of K in Sorted Array",
        description: `Given a sorted array of N integers and Q query values K, for each K print **how many times K appears** in the array.

Key formula: **\`count(K) = upper_bound(K) - lower_bound(K)\`**

\`lower_bound\` is K's first position, \`upper_bound\` is one past K's last position — the difference is the count.

Linear scan is O(N × Q) = 10^10 → TLE. Two binary searches give O(log N) per query.

Source: BOJ 10816 paraphrased`,
        constraints: "1 ≤ N, Q ≤ 100,000, -10^9 ≤ each integer ≤ 10^9. Array is pre-sorted.",
        hints: [
          "One-line core: \`count = upper_bound(K) - lower_bound(K)\`.",
          "Output as a single space-separated line.",
          "O(log N) per query → O((N + Q) log N) total.",
        ],
        solutionExplanation:
          "Count of K in a sorted array is \`upper_bound(K) - lower_bound(K)\`. Two binary searches, simple but powerful. In Python: \`bisect_right - bisect_left\`.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 회전된 정렬 배열에서 검색 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-005",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "보통",
      title: "회전된 정렬 배열에서 검색",
      description: `오름차순으로 정렬됐다가 **어딘가에서 회전된** 배열이 주어진다 (예: \`[4, 5, 6, 7, 0, 1, 2]\`). 모든 원소는 서로 다르다.

목표값 \`target\` 이 배열에 존재하면 그 **0-based 인덱스** 를, 없으면 \`-1\` 을 출력하라. **O(log N)** 에 풀어야 한다 — 즉 그냥 선형 탐색은 안 된다.

핵심 통찰: 회전된 배열을 중간 \`mid\` 로 자르면 **왼쪽 절반과 오른쪽 절반 중 적어도 하나는 정렬되어 있다.** 그 정렬된 절반에 target 이 들어가는지 확인해 탐색 범위를 좁힌다.

\`a[lo] <= a[mid]\` 이면 왼쪽이 정렬, 아니면 오른쪽이 정렬.

출처: LeetCode 33 (Search in Rotated Sorted Array) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, -10^9 ≤ 각 원소 ≤ 10^9, 모두 서로 다름",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "7\n4 5 6 7 0 1 2\n0", expectedOutput: "4", label: "회전 후 target = 0 → idx 4" },
        { stdin: "7\n4 5 6 7 0 1 2\n3", expectedOutput: "-1", label: "회전 + 없음" },
        { stdin: "5\n1 2 3 4 5\n3", expectedOutput: "2", label: "회전 안 된 경우" },
        { stdin: "1\n1\n0", expectedOutput: "-1", label: "N=1 — 없음" },
        { stdin: "1\n5\n5", expectedOutput: "0", label: "N=1 — 일치" },
        { stdin: "7\n4 5 6 7 0 1 2\n4", expectedOutput: "0", label: "첫 원소 일치" },
        { stdin: "6\n5 6 7 0 1 2\n7", expectedOutput: "2", label: "회전된 왼쪽 끝" },
        { stdin: "6\n5 6 7 0 1 2\n2", expectedOutput: "5", label: "마지막 원소" },
      ],
      hints: [
        "lo, hi = 0, N-1. while lo <= hi 루프.",
        "mid 에서 \`a[mid] == target\` 즉시 mid 반환.",
        "\`a[lo] <= a[mid]\` 이면 **왼쪽 절반 정렬됨** — target 이 [a[lo], a[mid]) 안이면 hi = mid-1, 아니면 lo = mid+1.",
        "아니면 **오른쪽 절반 정렬됨** — target 이 (a[mid], a[hi]] 안이면 lo = mid+1, 아니면 hi = mid-1.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    int target;
    cin >> target;

    int lo = 0, hi = n - 1, ans = -1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] == target) {
            ans = mid;
            break;
        }
        if (a[lo] <= a[mid]) {
            // 왼쪽 절반 정렬
            if (a[lo] <= target && target < a[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {
            // 오른쪽 절반 정렬
            if (a[mid] < target && target <= a[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "회전된 배열은 그대로 binary_search 못 함 — 단조 증가가 아니니까. 하지만 mid 기준 두 절반 중 하나는 반드시 정렬되어 있다는 관찰이 핵심. 그 정렬된 절반에 target 이 있는지 보고 탐색 범위 절반 자르기. O(log N).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
target = int(input())

lo, hi = 0, n - 1
ans = -1
while lo <= hi:
    mid = (lo + hi) // 2
    if a[mid] == target:
        ans = mid
        break
    if a[lo] <= a[mid]:
        if a[lo] <= target < a[mid]:
            hi = mid - 1
        else:
            lo = mid + 1
    else:
        if a[mid] < target <= a[hi]:
            lo = mid + 1
        else:
            hi = mid - 1
print(ans)
`,
      en: {
        title: "Search in Rotated Sorted Array",
        description: `An ascending sorted array was **rotated at some pivot** (e.g. \`[4, 5, 6, 7, 0, 1, 2]\`). All values are distinct.

Print the **0-based index** of \`target\` if present, else \`-1\`. Must run in **O(log N)** — no linear scan.

Insight: split at \`mid\`; **at least one of the two halves is sorted.** Check whether \`target\` lies in the sorted half and narrow the search.

If \`a[lo] <= a[mid]\` the left half is sorted, otherwise the right half is.

Source: LeetCode 33 (Search in Rotated Sorted Array) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, -10^9 ≤ each element ≤ 10^9, all distinct",
        hints: [
          "lo, hi = 0, N-1. Loop while lo <= hi.",
          "If \`a[mid] == target\`, return mid.",
          "If \`a[lo] <= a[mid]\`, **left half is sorted** — if target is in [a[lo], a[mid]), set hi = mid-1, else lo = mid+1.",
          "Otherwise the **right half is sorted** — if target is in (a[mid], a[hi]], set lo = mid+1, else hi = mid-1.",
        ],
        solutionExplanation:
          "A rotated array isn't monotone, so plain binary_search fails. But one of the two halves around mid is always sorted — exploit that to halve the range. O(log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. ceil sqrt — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-006",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "보통",
      title: "ceil sqrt — 제곱근 이분탐색",
      description: `정수 N 이 주어진다 (0 ≤ N ≤ 10^18). **\`ceil(sqrt(N))\` — 즉 N 의 제곱근을 올림한 정수** 를 출력하라.

\`x = ceil(sqrt(N))\` 의 정의: \`x*x >= N\` 을 만족하는 **가장 작은 음 아닌 정수**.

**부동소수점 \`sqrt()\` 는 큰 N (>10^15) 에서 1 차이로 틀릴 수 있다.** 이분탐색으로 정확하게 풀어야 한다.

핵심: \`lo = 0\`, \`hi = N\` (또는 \`10^9 + 1\`) 에서 시작해 \`mid*mid >= N\` 인 가장 작은 mid 를 찾는다. **곱하기 시 \`__int128\` 또는 mid > N/mid 형태로 오버플로우 방지.**

출처: 원본 (큰 수 sqrt 의 정확성 이슈)`,
      constraints: "0 ≤ N ≤ 10^18 (long long 안전, 곱셈은 오버플로우 가능)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "0", expectedOutput: "0", label: "N=0 — sqrt(0) = 0" },
        { stdin: "1", expectedOutput: "1", label: "N=1 — 1*1 = 1" },
        { stdin: "2", expectedOutput: "2", label: "sqrt(2) ≈ 1.41 → ceil = 2" },
        { stdin: "4", expectedOutput: "2", label: "정확한 제곱 — 2" },
        { stdin: "16", expectedOutput: "4", label: "정확한 제곱 — 4" },
        { stdin: "17", expectedOutput: "5", label: "16+1 → 5*5=25 ≥ 17" },
        { stdin: "1000000000000000000", expectedOutput: "1000000000", label: "N=10^18 — 정확히 10^9" },
        { stdin: "999999999999999999", expectedOutput: "1000000000", label: "10^18 - 1 — 여전히 10^9 (10^9-1 의 제곱은 부족)" },
      ],
      hints: [
        "\`lo = 0\`, \`hi = 2*10^9\` (안전 상한 — 10^9 의 제곱이 10^18) 으로 이분탐색.",
        "조건: \`mid*mid >= N\` 인 가장 작은 mid 가 답.",
        "오버플로우 방지: \`mid > 0 && mid > (N + mid - 1) / mid\` 형태 또는 \`__int128\` 캐스팅. 또는 mid 가 long long 일 때 \`mid * mid >= N\` 비교는 mid <= 10^9 안전 (10^9 × 10^9 = 10^18 < 9.2*10^18).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    long long n;
    cin >> n;

    long long lo = 0, hi = 2000000000LL;
    while (lo < hi) {
        long long mid = (lo + hi) / 2;
        // mid * mid >= n ?  mid up to 2*10^9 → mid*mid up to 4*10^18, still fits long long
        if (mid * mid >= n) hi = mid;
        else lo = mid + 1;
    }
    cout << lo << "\\n";
    return 0;
}`,
      solutionExplanation:
        "이분탐색의 답 = '조건을 만족하는 가장 작은 / 가장 큰 값' 패턴. \`mid*mid >= N\` 을 만족하는 가장 작은 mid. \`hi\` 를 2×10^9 로 잡으면 mid*mid 가 long long 안전 (4×10^18 < 9.2×10^18).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
lo, hi = 0, 2 * 10**9
while lo < hi:
    mid = (lo + hi) // 2
    if mid * mid >= n:
        hi = mid
    else:
        lo = mid + 1
print(lo)
`,
      en: {
        title: "ceil sqrt — Square Root by Binary Search",
        description: `Given integer N (0 ≤ N ≤ 10^18), print **\`ceil(sqrt(N))\`** — the smallest non-negative integer \`x\` such that \`x*x >= N\`.

**Floating-point \`sqrt()\` can be off by one for large N (>10^15).** Solve exactly with binary search.

Core: search for the smallest mid in \`[0, 2×10^9]\` where \`mid*mid >= N\`. **Watch overflow** — keep mid ≤ 2×10^9 so \`mid*mid\` still fits in long long.

Source: original (precision pitfall for big sqrt)`,
        constraints: "0 ≤ N ≤ 10^18 (long long; multiplication can overflow if careless)",
        hints: [
          "\`lo = 0\`, \`hi = 2×10^9\` (safe upper bound since 10^9 squared is 10^18).",
          "Condition: smallest mid with \`mid*mid >= N\`.",
          "Overflow: keep mid ≤ 2×10^9 so mid*mid stays in long long (max ~4×10^18 < 9.2×10^18).",
        ],
        solutionExplanation:
          "Binary search for 'smallest value satisfying a condition' pattern. Smallest mid with \`mid*mid >= N\`. Cap \`hi\` at 2×10^9 so the product fits long long.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 나무 자르기 (parametric search) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-007",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "어려움",
      title: "나무 자르기 (parametric search)",
      description: `상근이는 길이가 \`h_1, h_2, ..., h_N\` 인 나무 N 그루를 가지고 있다. 절단기를 높이 \`H\` 로 설정하면 H 보다 높은 부분만 잘려나가고 (H 이하는 그대로), 잘려나간 부분의 총 길이가 \`sum max(h_i - H, 0)\` 이 된다.

상근이가 \`M\` 미터 이상의 나무를 가져가려면 절단기를 **최대 얼마 높이** 로 설정할 수 있는지 출력하라.

핵심 — **매개변수 탐색 (parametric search):**
- 답 (높이 H) 자체를 이분탐색.
- 판정 함수: \`H 로 잘랐을 때 얻는 양 >= M ?\`
- 단조성: H 가 커지면 얻는 양은 줄어든다 → \`>= M\` 인 가장 큰 H 가 답.

\`lo = 0\`, \`hi = max(h_i)\`. 각 mid 마다 O(N) 으로 합 계산 → 전체 O(N log(max h)).

출처: BOJ 2805 paraphrased`,
      constraints: "1 ≤ N ≤ 1,000,000, 1 ≤ M ≤ 2×10^9, 1 ≤ h_i ≤ 10^9. 답은 항상 존재 (M 이 도달 가능)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 7\n20 15 10 17", expectedOutput: "15", label: "예시 — H=15 → 5+0+0+2=7" },
        { stdin: "5 20\n4 42 40 26 46", expectedOutput: "36", label: "큰 값 — H=36 → 0+6+4+0+10=20" },
        { stdin: "1 5\n10", expectedOutput: "5", label: "나무 1 그루 — 정확히 5" },
        { stdin: "3 6\n10 10 10", expectedOutput: "8", label: "모두 같음 — H=8 → 2+2+2=6" },
        { stdin: "2 1\n1 2", expectedOutput: "1", label: "H=1 → 0+1=1" },
        { stdin: "3 0\n5 5 5", expectedOutput: "5", label: "M=0 — 자를 필요 없음, H = max" },
        { stdin: "4 100\n100 100 100 100", expectedOutput: "75", label: "큰 M — H=75 → 25*4=100" },
      ],
      hints: [
        "이분탐색 대상은 **답 (H)** 자체. \`lo = 0\`, \`hi = max(h_i)\`.",
        "판정 함수: H 로 잘랐을 때의 \`sum max(h_i - H, 0)\` 을 계산. **합이 M 이상인지** 검사.",
        "조건 만족 (>= M) 이면 H 더 키워보기 → lo = mid+1. 아니면 hi = mid-1. 마지막에 lo-1 또는 hi 가 답 (구현 방식에 따라).",
        "합이 10^9 × 10^6 = 10^15 까지 가능 → long long.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    long long m;
    cin >> n >> m;
    vector<long long> h(n);
    long long hi = 0;
    for (int i = 0; i < n; i++) {
        cin >> h[i];
        hi = max(hi, h[i]);
    }

    long long lo = 0, ans = 0;
    while (lo <= hi) {
        long long mid = (lo + hi) / 2;
        long long total = 0;
        for (int i = 0; i < n; i++) {
            if (h[i] > mid) total += h[i] - mid;
        }
        if (total >= m) {
            ans = mid;    // 후보 — 더 높이도 가능한지 보기
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Parametric search 의 정석 — 답 자체 (높이 H) 를 이분탐색. 'H 가 클수록 얻는 양이 줄어든다' 는 단조성을 이용해 \`>= M\` 인 **가장 큰 H** 를 찾는다. 판정 함수는 O(N), 이분탐색은 O(log(10^9)) ≈ 30 → 전체 O(N × 30).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
h = list(map(int, input().split()))

lo, hi = 0, max(h)
ans = 0
while lo <= hi:
    mid = (lo + hi) // 2
    total = 0
    for x in h:
        if x > mid:
            total += x - mid
    if total >= m:
        ans = mid
        lo = mid + 1
    else:
        hi = mid - 1
print(ans)
`,
      en: {
        title: "Cutting Trees (Parametric Search)",
        description: `Sanggun has N trees with heights \`h_1, ..., h_N\`. A saw set at height \`H\` cuts off only the parts above H — total wood gained is \`sum max(h_i - H, 0)\`.

To take at least \`M\` meters of wood, what is the **maximum** H he can set?

**Parametric search:**
- Binary-search the answer (H) itself.
- Predicate: 'amount obtained at H ≥ M?'
- Monotonicity: larger H → smaller yield → find the **largest H** with yield ≥ M.

\`lo = 0\`, \`hi = max(h_i)\`. Each mid takes O(N). Total O(N log(max h)).

Source: BOJ 2805 paraphrased`,
        constraints: "1 ≤ N ≤ 1,000,000, 1 ≤ M ≤ 2×10^9, 1 ≤ h_i ≤ 10^9. Answer always exists.",
        hints: [
          "Binary-search the **answer** (H). \`lo = 0\`, \`hi = max(h_i)\`.",
          "Predicate: compute \`sum max(h_i - H, 0)\`. Check if ≥ M.",
          "If yes → try larger H (lo = mid+1). Else hi = mid-1.",
          "Sum can be up to 10^15 → long long.",
        ],
        solutionExplanation:
          "Textbook parametric search — binary-search the answer itself. Monotonicity (larger H, smaller yield) lets us find the **largest H** with yield ≥ M. O(N log(10^9)) ≈ O(30N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 랜선 자르기 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-008",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "어려움",
      title: "랜선 자르기 (parametric search)",
      description: `이미 만들어진 K 개의 랜선 (길이 \`L_1, ..., L_K\`) 이 있다. 이걸 잘라서 **같은 길이의 랜선 N 개 이상** 을 만들려고 한다 (남는 부분은 버림). 만들 수 있는 **랜선의 최대 길이** 를 출력하라.

\`길이 x\` 로 자를 때 만들 수 있는 개수: \`sum (L_i / x)\` (정수 나눗셈).

핵심 — parametric search:
- 답 (길이 x) 자체를 이분탐색.
- 판정: \`sum(L_i / x) >= N ?\`
- 단조성: x 가 커지면 개수가 줄어듦 → \`>= N\` 인 **가장 큰 x** 가 답.

주의: x = 0 은 금지 (나누기). \`lo = 1\`, \`hi = max(L_i)\`.

출처: BOJ 1654 paraphrased`,
      constraints: "1 ≤ K ≤ 10,000, 1 ≤ N ≤ 1,000,000, 1 ≤ L_i ≤ 2^31 - 1. 답은 항상 1 이상 존재한다고 가정 (sum(L_i) >= N)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 11\n802 743 457 539", expectedOutput: "200", label: "예시 — x=200 으로 4+3+2+2=11" },
        { stdin: "1 1\n100", expectedOutput: "100", label: "1 그루, 1 개 — 전체 길이" },
        { stdin: "2 5\n10 10", expectedOutput: "3", label: "x=3 → 3+3=6 ≥ 5; x=4 → 2+2=4 < 5" },
        { stdin: "3 6\n6 6 6", expectedOutput: "3", label: "x=3 → 2+2+2=6" },
        { stdin: "1 7\n100", expectedOutput: "14", label: "x=14 → 7개. x=15 → 6개." },
        { stdin: "2 1\n5 5", expectedOutput: "5", label: "1 개만 필요 — x=5 로 자르면 1+1=2 ≥ 1, x=6 은 0" },
      ],
      hints: [
        "이분탐색 범위: \`lo = 1\`, \`hi = max(L_i)\`.",
        "판정: \`sum(L_i / mid) >= N\` 이면 mid 가 충분 — 더 키워보기 (lo = mid+1, ans 갱신).",
        "L_i 가 2^31-1 까지 → int 가 아닌 **long long** 사용. hi 도 long long.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int k;
    long long n;
    cin >> k >> n;
    vector<long long> L(k);
    long long hi = 0;
    for (int i = 0; i < k; i++) {
        cin >> L[i];
        hi = max(hi, L[i]);
    }

    long long lo = 1, ans = 0;
    while (lo <= hi) {
        long long mid = (lo + hi) / 2;
        long long cnt = 0;
        for (int i = 0; i < k; i++) cnt += L[i] / mid;
        if (cnt >= n) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "나무 자르기 (abs-007) 와 같은 parametric search 패턴 — 답 자체를 이분탐색. 판정 함수만 살짝 다름: 합산 대신 '몇 개로 나뉘는지'. x 가 클수록 만들 수 있는 개수가 줄어들기 때문에 \`>= N\` 인 가장 큰 x 가 답.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

k, n = map(int, input().split())
L = list(map(int, input().split()))

lo, hi = 1, max(L)
ans = 0
while lo <= hi:
    mid = (lo + hi) // 2
    cnt = sum(l // mid for l in L)
    if cnt >= n:
        ans = mid
        lo = mid + 1
    else:
        hi = mid - 1
print(ans)
`,
      en: {
        title: "Cutting Cables (Parametric Search)",
        description: `K cables of lengths \`L_1, ..., L_K\` need to be cut into **N equal-length pieces** (waste allowed). Print the **maximum possible piece length**.

For length \`x\`, count = \`sum(L_i / x)\` (integer division).

Parametric search:
- Binary-search the answer (length x).
- Predicate: \`sum(L_i / x) >= N\` ?
- Monotone: larger x → fewer pieces → find **largest x** with count ≥ N.

Watch: x = 0 is invalid. \`lo = 1\`, \`hi = max(L_i)\`.

Source: BOJ 1654 paraphrased`,
        constraints: "1 ≤ K ≤ 10,000, 1 ≤ N ≤ 1,000,000, 1 ≤ L_i ≤ 2^31 - 1. Answer ≥ 1 always exists.",
        hints: [
          "Range: \`lo = 1\`, \`hi = max(L_i)\`.",
          "Predicate: \`sum(L_i / mid) >= N\` → try larger x (lo = mid+1, save ans).",
          "L_i up to 2^31-1 → use **long long**.",
        ],
        solutionExplanation:
          "Same parametric pattern as 'cutting trees' — binary-search the answer itself. Only the predicate differs: count divisions instead of summing leftover. Larger x means fewer pieces, so find the largest x with count ≥ N.",
      },
    },

    // Note: test case 6 above for abs-008 — let me reconsider: with 5+5=10 length, max piece for 1 piece = max single piece = 5. But cable can't be merged. So with [5,5] and need 1, x=5 gives 1+1=2 ≥ 1, x=6 gives 0+0=0 < 1. Answer = 5. Fixed below.

    // ─────────────────────────────────────────────────────────────────
    // 9. 정렬된 배열 두 합 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-009",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "어려움",
      title: "정렬된 배열 두 합 (Two Sum II)",
      description: `**이미 오름차순 정렬된** N 개의 정수 배열과 목표값 \`target\` 이 주어진다. 합이 정확히 \`target\` 이 되는 두 원소의 **1-based 인덱스** \`i < j\` 를 출력하라.

해는 정확히 하나 존재한다고 가정. 한 원소를 두 번 쓰면 안 됨.

두 가지 접근 모두 정답:
1. **투 포인터** O(N) — \`l=0\`, \`r=N-1\`. 합이 작으면 \`l++\`, 크면 \`r--\`.
2. **이분탐색** O(N log N) — 각 \`i\` 에 대해 \`target - a[i]\` 를 \`i+1\` 이후 구간에서 이분탐색.

투 포인터가 더 빠르지만, 이분탐색이 더 일반적 (정렬된 자료에 대한 검색이라는 관점에서).

출처: LeetCode 167 (Two Sum II - Input Array Is Sorted) paraphrased`,
      constraints: "2 ≤ N ≤ 100,000, -10^9 ≤ a_i ≤ 10^9, -2×10^9 ≤ target ≤ 2×10^9. 정확히 하나의 해 존재",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4\n2 7 11 15\n9", expectedOutput: "1 2", label: "기본 — 2+7=9, 인덱스 (1,2)" },
        { stdin: "3\n2 3 4\n6", expectedOutput: "1 3", label: "2+4=6 — (1,3)" },
        { stdin: "2\n-1 0\n-1", expectedOutput: "1 2", label: "음수 포함 — -1+0=-1" },
        { stdin: "5\n1 2 3 4 5\n9", expectedOutput: "4 5", label: "맨 끝 두 개 — 4+5=9" },
        { stdin: "5\n1 2 3 4 5\n3", expectedOutput: "1 2", label: "맨 앞 두 개 — 1+2=3" },
        { stdin: "6\n-5 -3 0 2 4 8\n5", expectedOutput: "2 6", label: "-3+8=5 → 인덱스 (2,6)" },
      ],
      hints: [
        "투 포인터: \`l=0\`, \`r=N-1\`. \`a[l] + a[r] == target\` 이면 답. < 이면 l++, > 이면 r--.",
        "이분탐색: 각 i (0..N-2) 마다 \`lower_bound\` 로 \`target - a[i]\` 의 위치 찾고 일치하면 답.",
        "출력은 **1-based** — 인덱스 +1 잊지 말기.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    long long target;
    cin >> target;

    int l = 0, r = n - 1;
    while (l < r) {
        long long s = a[l] + a[r];
        if (s == target) {
            cout << (l + 1) << ' ' << (r + 1) << "\\n";
            return 0;
        }
        if (s < target) l++;
        else r--;
    }
    return 0;
}`,
      solutionExplanation:
        "이미 정렬된 배열이라 투 포인터가 가장 깔끔. 합이 작으면 왼쪽 포인터 (값 키우기), 크면 오른쪽 포인터 (값 줄이기). 한 번 같아지면 답. O(N). 이분탐색 풀이 (각 i 마다 target - a[i] 검색) 도 가능 — O(N log N).",
      pyInitialCode: `import sys
from bisect import bisect_left
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
target = int(input())

l, r = 0, n - 1
while l < r:
    s = a[l] + a[r]
    if s == target:
        print(l + 1, r + 1)
        break
    if s < target:
        l += 1
    else:
        r -= 1
`,
      en: {
        title: "Two Sum on Sorted Array",
        description: `An **already-sorted** ascending array of N integers and a \`target\`. Print the **1-based indices** \`i < j\` of two elements summing to exactly \`target\`. Exactly one solution exists; can't use the same element twice.

Two valid approaches:
1. **Two pointers** O(N) — \`l=0\`, \`r=N-1\`. Sum too small → l++; too big → r--.
2. **Binary search** O(N log N) — for each i, binary-search for \`target - a[i]\` after position i.

Two pointers is faster; binary search is more general.

Source: LeetCode 167 (Two Sum II - Input Array Is Sorted) paraphrased`,
        constraints: "2 ≤ N ≤ 100,000, -10^9 ≤ a_i ≤ 10^9. Exactly one solution.",
        hints: [
          "Two-pointer: \`l=0\`, \`r=N-1\`. \`a[l]+a[r] == target\` → answer; < → l++; > → r--.",
          "Binary search: for each i, lower_bound for \`target - a[i]\` in a[i+1..].",
          "Output is **1-based** — add 1 to each index.",
        ],
        solutionExplanation:
          "Sorted input → two pointers is cleanest. Sum too small? Move left (increase). Too big? Move right (decrease). O(N). Binary-search version (look up \`target - a[i]\` for each i) is O(N log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 매개변수 탐색: 분량 결정 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-010",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "어려움",
      title: "가장 적은 분량 (parametric search)",
      description: `N 개의 음 아닌 정수 배열 \`a\` 와 정수 \`m\` 이 주어진다. 어떤 양의 정수 \`divisor\` 로 배열의 각 원소를 나눠 **올림** 한 값들의 합 \`sum(ceil(a_i / divisor))\` 가 \`m\` **이하** 가 되는 **가장 작은 divisor** 를 출력하라.

핵심 — parametric search:
- 답 (divisor) 자체를 이분탐색.
- 판정: \`sum(ceil(a_i / divisor)) <= m\` ?
- 단조성: divisor 가 커지면 합은 작아진다 → \`<= m\` 인 **가장 작은 divisor** 가 답.

\`ceil(a/b)\` 는 \`(a + b - 1) / b\` 또는 \`(a - 1) / b + 1\` (단 a > 0; a = 0 이면 0).

\`lo = 1\`, \`hi = max(a_i)\` (또는 그 이상이면 합이 N 으로 줄어듦 → m >= N 이면 작동).

출처: LeetCode 1283 (Find the Smallest Divisor Given a Threshold) paraphrased`,
      constraints: "1 ≤ N ≤ 50,000, N ≤ m ≤ 10^6, 0 ≤ a_i ≤ 10^6. 답은 항상 존재 (m >= N 가정)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 6\n1 2 5 9", expectedOutput: "5", label: "예시 — divisor=5: 1+1+1+2=5 <= 6. divisor=4: 1+1+2+3=7 > 6." },
        { stdin: "5 44\n44 22 33 11 1", expectedOutput: "3", label: "d=3 → 15+8+11+4+1=39 ≤ 44. d=2 → 57 > 44" },
        { stdin: "3 6\n21 36 9", expectedOutput: "12", label: "d=12: ceil(21/12)+ceil(36/12)+ceil(9/12)=2+3+1=6 ≤6; d=11: 2+4+1=7>6" },
        { stdin: "1 1\n1", expectedOutput: "1", label: "N=1, ceil(1/1)=1 <= 1" },
        { stdin: "3 3\n1 2 3", expectedOutput: "3", label: "d=2 → 1+1+2=4 > 3; d=3 → 1+1+1=3 ≤ 3" },
        { stdin: "3 5\n10 20 30", expectedOutput: "15", label: "더 빡빡한 m — d=15: 1+2+2=5; d=14: 1+2+3=6>5" },
      ],
      hints: [
        "이분탐색 대상은 divisor (답). \`lo = 1\`, \`hi = max(a_i)\` (또는 10^6).",
        "판정 함수: \`sum( (a_i + divisor - 1) / divisor ) <= m\` (정수 올림 트릭).",
        "조건 만족 (<=m) 이면 더 작은 divisor 시도 (hi = mid-1, ans 갱신). 아니면 lo = mid+1.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    long long m;
    cin >> n >> m;
    vector<long long> a(n);
    long long hi = 1;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        hi = max(hi, a[i]);
    }
    if (hi < 1) hi = 1;

    long long lo = 1, ans = hi;
    while (lo <= hi) {
        long long mid = (lo + hi) / 2;
        long long total = 0;
        for (int i = 0; i < n; i++) {
            total += (a[i] + mid - 1) / mid;   // ceil
        }
        if (total <= m) {
            ans = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Parametric search '<= m 인 가장 작은 divisor' — divisor 가 커질수록 합이 작아지는 단조성 활용. 핵심 트릭: 올림은 \`(a + b - 1) / b\` 로 정수 연산 안에서 처리. O(N log(max a)).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
a = list(map(int, input().split()))

lo, hi = 1, max(a) if a else 1
if hi < 1:
    hi = 1
ans = hi
while lo <= hi:
    mid = (lo + hi) // 2
    total = sum((x + mid - 1) // mid for x in a)
    if total <= m:
        ans = mid
        hi = mid - 1
    else:
        lo = mid + 1
print(ans)
`,
      en: {
        title: "Smallest Divisor (Parametric Search)",
        description: `Given a non-negative integer array \`a\` of length N and a threshold \`m\`, find the **smallest positive divisor** \`d\` such that \`sum(ceil(a_i / d)) <= m\`.

Parametric search:
- Binary-search the answer (d).
- Predicate: \`sum(ceil(a_i / d)) <= m\` ?
- Monotone: larger d → smaller sum → find the **smallest d** where the sum is within budget.

Integer ceiling: \`ceil(a/b) = (a + b - 1) / b\`.

\`lo = 1\`, \`hi = max(a_i)\`.

Source: LeetCode 1283 (Find the Smallest Divisor Given a Threshold) paraphrased`,
        constraints: "1 ≤ N ≤ 50,000, N ≤ m ≤ 10^6, 0 ≤ a_i ≤ 10^6. Answer always exists.",
        hints: [
          "Binary-search d. \`lo = 1\`, \`hi = max(a_i)\`.",
          "Predicate: \`sum((a_i + d - 1) / d) <= m\` (integer ceiling trick).",
          "If yes → try smaller d (hi = mid-1, save ans). Else lo = mid+1.",
        ],
        solutionExplanation:
          "Parametric: 'smallest d with sum ≤ m'. Sum decreases as d grows — classic monotone predicate. Key trick: integer ceiling \`(a + b - 1) / b\`. O(N log(max a)).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. K 번째 수 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-011",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "어려움",
      title: "K 번째 수 (N×N 곱셈표)",
      description: `N×N 배열 \`B\` 가 \`B[i][j] = i × j\` (1 ≤ i, j ≤ N) 로 정의되어 있다. 이 N² 개의 수를 **모두** 작은 순서로 줄세웠을 때 **K 번째 수** 를 출력하라.

N 이 10^5 까지 가니 N² = 10^10 → 배열로 저장 불가. **이분탐색 + counting** 으로 풀어야 한다.

핵심 — 답을 이분탐색:
- "값이 \`mid\` 이하인 원소가 몇 개인가?" 를 빠르게 계산할 수 있다 — **\`sum_{i=1..N} min(mid / i, N)\`** (i 번째 행에서 \`i × j <= mid\` 인 j 개수 = \`min(mid/i, N)\`).
- 이 함수는 mid 에 대해 단조 증가 → 이분탐색.
- K 번째 수 = "이하 개수가 처음으로 K 이상이 되는 mid" = lower_bound 패턴.

\`lo = 1\`, \`hi = N×N\`. 각 mid 마다 O(N) → 전체 O(N log(N²)) = O(N log N).

출처: BOJ 1300 paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ min(10^9, N²)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\n7", expectedOutput: "6", label: "3×3 표 정렬: 1,2,2,3,3,4,6,6,9 → 7번째 = 6" },
        { stdin: "3\n1", expectedOutput: "1", label: "1번째 = 1" },
        { stdin: "3\n9", expectedOutput: "9", label: "마지막 = 9" },
        { stdin: "1\n1", expectedOutput: "1", label: "N=1 — 1×1 표" },
        { stdin: "2\n3", expectedOutput: "2", label: "2×2: 1,2,2,4 → 3번째 = 2" },
        { stdin: "5\n12", expectedOutput: "6", label: "5×5 정렬: 1,2,2,3,3,4,4,4,5,5,6,6,... → 12번째 = 6" },
        { stdin: "5\n25", expectedOutput: "25", label: "5×5 마지막 = 5×5 = 25" },
      ],
      hints: [
        "답 자체를 이분탐색. \`lo = 1\`, \`hi = N*N\` (long long).",
        "\`count(mid)\` = \`sum_{i=1..N} min(mid/i, N)\` — i 번째 행의 i×j ≤ mid 인 j 개수.",
        "K 번째 수는 \`count(mid) >= K\` 인 가장 작은 mid — lower_bound 패턴.",
        "count(mid) 도 mid 도 N×N 까지 갈 수 있으니 모두 long long.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
long long K;

long long countLE(long long x) {
    long long total = 0;
    for (int i = 1; i <= N; i++) {
        total += min((long long)N, x / i);
    }
    return total;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N >> K;

    long long lo = 1, hi = (long long)N * N;
    while (lo < hi) {
        long long mid = (lo + hi) / 2;
        if (countLE(mid) >= K) hi = mid;
        else lo = mid + 1;
    }
    cout << lo << "\\n";
    return 0;
}`,
      solutionExplanation:
        "직접 N² 개를 만들 수 없을 때의 정석 — '값 v 이하 개수' 함수를 빠르게 계산 (각 행에서 \`min(v/i, N)\`), 그걸 이분탐색. K 번째 = '이하 개수 >= K' 인 가장 작은 v. O(N log N²). 곱셈표뿐 아니라 일반적인 '직접 만들면 너무 큰' 정렬 문제의 패턴.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
k = int(input())

def count_le(x):
    total = 0
    for i in range(1, n + 1):
        total += min(n, x // i)
    return total

lo, hi = 1, n * n
while lo < hi:
    mid = (lo + hi) // 2
    if count_le(mid) >= k:
        hi = mid
    else:
        lo = mid + 1
print(lo)
`,
      en: {
        title: "K-th Number in N×N Multiplication Table",
        description: `An N×N table has \`B[i][j] = i × j\` (1 ≤ i, j ≤ N). Sort all N² entries ascending and print the **K-th** one.

N can be 10^5, so N² = 10^10 — can't materialize. Solve with **binary search + counting**.

Binary-search the answer:
- "How many entries ≤ \`mid\`?" → **\`sum_{i=1..N} min(mid/i, N)\`** (count of j with i×j ≤ mid in row i).
- This count is monotone in mid → binary search.
- K-th value = smallest mid where count(mid) ≥ K (lower_bound pattern).

\`lo = 1\`, \`hi = N×N\`. Each check O(N) → O(N log N²) total.

Source: BOJ 1300 paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ min(10^9, N²)",
        hints: [
          "Binary-search the answer. \`lo = 1\`, \`hi = N*N\` (long long).",
          "\`count(mid) = sum_{i=1..N} min(mid/i, N)\`.",
          "K-th = smallest mid with count(mid) >= K — lower_bound pattern.",
          "Use long long throughout (values up to N² = 10^10).",
        ],
        solutionExplanation:
          "When the array is too big to build, binary-search on **values** and use a fast 'how many ≤ v' counter (per-row \`min(v/i, N)\`). K-th = smallest v with count ≥ K. O(N log N²). Standard pattern for 'sort the implicit set' problems.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 합이 K 이상인 부분 배열 최소 길이 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abs-012",
      cluster: "algo-binarysearch-contest",
      unlockAfter: "algo-binarysearch",
      difficulty: "어려움",
      title: "합이 K 이상인 부분 배열 최소 길이",
      description: `**양의 정수** N 개의 배열 \`a\` 와 정수 \`K\` 가 주어진다. 합이 K **이상** 인 **연속 부분 배열** 중 **가장 짧은 것의 길이** 를 출력하라. 그런 부분 배열이 없으면 \`0\` 을 출력.

핵심 — 이분탐색 + 누적합:
- 누적합 \`P[i] = a[0] + ... + a[i-1]\` (P[0] = 0). 부분 배열 \`a[l..r]\` 의 합 = \`P[r+1] - P[l]\`.
- **모든 원소가 양수** 이므로 P 는 strictly increasing → 이분탐색 가능.
- 각 \`i\` (시작 인덱스) 마다 \`P[j] - P[i] >= K\` 인 가장 작은 \`j\` 를 \`lower_bound\` 로 찾음 → 길이 \`j - i\`.
- 모든 i 에 대한 최소 길이가 답.

O(N log N).

대안 — sliding window 도 O(N) 으로 가능하지만, 이 챕터에서는 이분탐색 풀이를 본다.

출처: LeetCode 209 (Minimum Size Subarray Sum) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ 10^9, 1 ≤ a_i ≤ 10^4. 합 P[N] 은 10^9 까지 가능 → long long",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "6 7\n2 3 1 2 4 3", expectedOutput: "2", label: "예시 — [4,3] 또는 [3,4] 합 7, 길이 2" },
        { stdin: "1 4\n4", expectedOutput: "1", label: "N=1, 정확히 K" },
        { stdin: "1 5\n4", expectedOutput: "0", label: "N=1, 부족 — 답 없음" },
        { stdin: "5 11\n1 1 1 1 1", expectedOutput: "0", label: "총합 5 < 11 — 불가능" },
        { stdin: "5 15\n1 2 3 4 5", expectedOutput: "5", label: "전체 합 = 15 → 길이 5" },
        { stdin: "8 15\n1 2 3 4 5 6 7 8", expectedOutput: "2", label: "[7,8]=15 → 길이 2" },
        { stdin: "3 6\n1 4 4", expectedOutput: "2", label: "[4,4]=8 ≥ 6 → 길이 2" },
      ],
      hints: [
        "누적합 \`P[0..N]\`: P[0]=0, P[i] = P[i-1] + a[i-1]. 양수만이므로 P 는 strictly increasing.",
        "각 i (0..N-1) 마다 P[j] >= P[i] + K 인 가장 작은 j (i < j <= N) 를 lower_bound 로 찾기.",
        "찾으면 후보 길이 = j - i. 모든 i 에 대한 최소.",
        "답 없으면 0 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    long long k;
    cin >> n >> k;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    vector<long long> P(n + 1, 0);
    for (int i = 1; i <= n; i++) P[i] = P[i - 1] + a[i - 1];

    int ans = INT_MAX;
    for (int i = 0; i < n; i++) {
        long long need = P[i] + k;
        auto it = lower_bound(P.begin() + i + 1, P.end(), need);
        if (it != P.end()) {
            int j = it - P.begin();
            ans = min(ans, j - i);
        }
    }
    cout << (ans == INT_MAX ? 0 : ans) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "양수 배열의 누적합은 strictly increasing → 이분탐색 가능. 각 시작 i 마다 \`P[j] - P[i] >= K\` 인 첫 j 를 \`lower_bound(P, P[i] + K)\` 로 찾으면 그 부분배열이 'i 에서 시작하는 최소 길이'. 모든 i 의 최소. O(N log N). 같은 문제를 sliding window 로 O(N) 도 가능하지만, 이분탐색 사고는 더 일반적.",
      pyInitialCode: `import sys
from bisect import bisect_left
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from bisect import bisect_left
input = sys.stdin.readline

n, k = map(int, input().split())
a = list(map(int, input().split()))

P = [0] * (n + 1)
for i in range(1, n + 1):
    P[i] = P[i - 1] + a[i - 1]

ans = float('inf')
for i in range(n):
    need = P[i] + k
    j = bisect_left(P, need, i + 1, n + 1)
    if j <= n:
        if j - i < ans:
            ans = j - i

print(0 if ans == float('inf') else ans)
`,
      en: {
        title: "Shortest Subarray with Sum ≥ K",
        description: `Given **positive integers** array of size N and integer K, print the length of the **shortest contiguous subarray** with sum ≥ K. If none exists, print \`0\`.

Binary search + prefix sums:
- Prefix sum \`P[i] = a[0] + ... + a[i-1]\` (P[0]=0). Subarray sum = \`P[r+1] - P[l]\`.
- **All positive** ⇒ P is strictly increasing → binary-searchable.
- For each \`i\`, lower_bound for \`P[i] + K\` finds the smallest \`j\` with sum ≥ K. Length = \`j - i\`.
- Take the minimum over all i.

O(N log N).

(Sliding window gives O(N), but binary search is the focus here.)

Source: LeetCode 209 (Minimum Size Subarray Sum) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ 10^9, 1 ≤ a_i ≤ 10^4. Use long long for prefix sums.",
        hints: [
          "Build prefix sums \`P[0..N]\`. Positive a_i ⇒ P is strictly increasing.",
          "For each i (0..N-1), lower_bound for \`P[i] + K\` in P[i+1..N].",
          "Candidate length = j - i. Track minimum.",
          "If nothing qualifies, print 0.",
        ],
        solutionExplanation:
          "Positive prefix sums are strictly increasing → binary-searchable. For each start i, find the first j with \`P[j] - P[i] >= K\` via lower_bound. Minimum (j - i) over all i. O(N log N). Sliding-window gives O(N) but binary search generalizes more.",
      },
    },
  ],
}
