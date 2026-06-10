import type { PracticeCluster } from "./types"

export const prefixSumContestCluster: PracticeCluster = {
  id: "algo-prefixsum-contest",
  title: "누적합 문제 풀이",
  emoji: "🏆",
  description: "구간 합, 2D 누적합, 빈도 누적, 부분 합 = K — 기법 활용",
  unlockAfter: "algo-prefixsum",
  en: {
    title: "Prefix Sum Practice",
    description: "Range sums, 2D prefix, frequency prefix, subarray sum = K",
  },
  problems: [
    // ═════════════════════════════════════════════════════════════════
    // 쉬움 입문 (알고리즘 절벽 완화 on-ramp): 누적합이 뭔지 → 한 구간 → 여러 구간
    // ═════════════════════════════════════════════════════════════════
    {
      id: "apre-e01",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "쉬움",
      kl: true,
      title: "누적합 만들기",
      description: `N개의 정수가 주어진다. **앞에서부터 더한 합**(누적합)을 차례대로 출력하라.

예를 들어 \`3 1 4\` 의 누적합은 \`3 4 8\` 이다 (3, 3+1, 3+1+4). 누적합은 모든 구간 합 문제의 출발점이다 — 먼저 "지금까지의 합"을 만드는 감을 잡아보자.

누적합들을 공백으로 구분해 한 줄에 출력.`,
      constraints: "1 ≤ N ≤ 100,000, -1000 ≤ 각 정수 ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    // TODO: 숫자를 하나씩 읽으며 지금까지의 합을 누적해 출력하세요

    return 0;
}`,
      pyInitialCode: `n = int(input())
a = list(map(int, input().split()))
# TODO: 앞에서부터 누적한 합을 만들어 공백으로 출력하세요`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "3 4 8 9 14", label: "기본" },
        { stdin: "1\n7", expectedOutput: "7", label: "원소 1개" },
        { stdin: "4\n1 2 3 4", expectedOutput: "1 3 6 10", label: "전부 양수" },
        { stdin: "3\n-1 -2 -3", expectedOutput: "-1 -3 -6", label: "음수" },
        { stdin: "4\n5 -5 5 -5", expectedOutput: "5 0 5 0", label: "양음 섞임" },
      ],
      hints: [
        "변수 하나(s)에 계속 더해 나가면 돼요. 처음엔 0.",
        "숫자 하나 읽을 때마다 s += 그 숫자, 그리고 s 를 출력.",
        "출력 사이에 공백을 넣되 줄 끝 처리에 주의.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long s = 0;
    for (int k = 0; k < n; k++) {
        int x; cin >> x;
        s += x;
        cout << s;
        if (k + 1 < n) cout << ' ';
    }
    cout << '\\n';
    return 0;
}`,
      pySolutionCode: `n = int(input())
a = list(map(int, input().split()))
s = 0
out = []
for x in a:
    s += x
    out.append(s)
print(*out)`,
      solutionExplanation: "합 변수 s를 0에서 시작해 숫자를 읽을 때마다 더하고, 그 값을 바로 출력합니다. 이 '지금까지의 합' 배열이 곧 누적합(prefix sum)이에요.",
      en: {
        title: "Build the Prefix Sum",
        description: `Given N integers, print the **running total** (prefix sum) step by step. For \`3 1 4\` the prefix sums are \`3 4 8\`. This is the starting point for every range-sum problem. Print them space-separated on one line.`,
        constraints: "1 ≤ N ≤ 100,000, -1000 ≤ each integer ≤ 1000",
        hints: [
          "Keep one variable s, starting at 0.",
          "Each time you read a number, do s += x and print s.",
          "Mind the spacing at the end of the line.",
        ],
        solutionExplanation: "Start s at 0, add each number as you read it, and print the value. That running total array IS the prefix sum.",
      },
    },
    {
      id: "apre-e02",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "쉬움",
      kl: true,
      title: "한 구간의 합",
      description: `N개의 정수가 주어지고, 그 다음 줄에 두 정수 \`i j\` (1-based, i ≤ j) 가 주어진다. **i번째부터 j번째까지의 합**을 출력하라.

누적합 배열 \`pre\` 를 만들어 두면 (pre[k] = 1~k번째 합), 구간 [i, j] 의 합은 **pre[j] - pre[i-1]** 한 번의 뺄셈으로 구해진다. 이게 누적합의 핵심 기술이다.`,
      constraints: "1 ≤ N ≤ 100,000, -1000 ≤ 각 정수 ≤ 1000, 1 ≤ i ≤ j ≤ N",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> pre(n + 1, 0);
    // TODO: pre[k] = pre[k-1] + (k번째 수) 로 누적합 배열을 채우세요

    int i, j;
    cin >> i >> j;
    // TODO: 구간 [i, j] 합 = pre[j] - pre[i-1] 출력

    return 0;
}`,
      pyInitialCode: `n = int(input())
a = list(map(int, input().split()))
pre = [0] * (n + 1)
# TODO: pre[k] = pre[k-1] + a[k-1]
i, j = map(int, input().split())
# TODO: pre[j] - pre[i-1] 출력`,
      testCases: [
        { stdin: "5\n10 20 30 40 50\n2 4", expectedOutput: "90", label: "20+30+40" },
        { stdin: "3\n1 2 3\n1 3", expectedOutput: "6", label: "전체" },
        { stdin: "1\n7\n1 1", expectedOutput: "7", label: "한 칸" },
        { stdin: "5\n1 1 1 1 1\n2 4", expectedOutput: "3", label: "세 칸" },
        { stdin: "4\n-2 -2 -2 -2\n1 4", expectedOutput: "-8", label: "음수" },
      ],
      hints: [
        "pre[0] = 0 으로 두고, pre[k] = pre[k-1] + a[k] (1-based).",
        "구간 [i, j] 합 = pre[j] - pre[i-1].",
        "왜 i-1 인지 종이에 작은 예로 그려보면 확실해져요.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> pre(n + 1, 0);
    for (int k = 1; k <= n; k++) {
        int x; cin >> x;
        pre[k] = pre[k - 1] + x;
    }
    int i, j;
    cin >> i >> j;
    cout << pre[j] - pre[i - 1] << '\\n';
    return 0;
}`,
      pySolutionCode: `n = int(input())
a = list(map(int, input().split()))
pre = [0] * (n + 1)
for k in range(1, n + 1):
    pre[k] = pre[k - 1] + a[k - 1]
i, j = map(int, input().split())
print(pre[j] - pre[i - 1])`,
      solutionExplanation: "pre[k]에 1~k번째 합을 저장해 두면, 구간 [i,j] 합은 pre[j]에서 i-1번째까지의 합 pre[i-1]을 빼서 한 번에 구합니다.",
      en: {
        title: "Sum of One Range",
        description: `Given N integers and one query \`i j\` (1-based, i ≤ j), print the sum of elements i..j. Build a prefix array \`pre\` (pre[k] = sum of first k), then the range sum is **pre[j] - pre[i-1]** — one subtraction. This is the core trick.`,
        constraints: "1 ≤ N ≤ 100,000, -1000 ≤ each integer ≤ 1000, 1 ≤ i ≤ j ≤ N",
        hints: [
          "Set pre[0]=0, pre[k]=pre[k-1]+a[k] (1-based).",
          "Range [i, j] sum = pre[j] - pre[i-1].",
          "Draw a tiny example to see why it's i-1.",
        ],
        solutionExplanation: "Store sums of the first k elements in pre[k]; the range [i,j] sum is pre[j] minus pre[i-1] in one step.",
      },
    },
    {
      id: "apre-e03",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "쉬움",
      kl: true,
      title: "여러 구간의 합",
      description: `N개의 정수가 주어지고, M개의 질의가 이어진다. 각 질의 \`i j\` (1-based) 마다 i번째부터 j번째까지의 합을 한 줄씩 출력하라.

누적합을 **한 번만** 만들어 두면, 질의가 몇 개든 각각 pre[j] - pre[i-1] 로 즉시 답할 수 있다. (질의가 아주 많아지는 버전이 바로 다음 '보통' 문제다.)`,
      constraints: "1 ≤ N, M ≤ 1,000, -1000 ≤ 각 정수 ≤ 1000, 1 ≤ i ≤ j ≤ N",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> pre(n + 1, 0);
    // TODO: 누적합 배열 pre 채우기

    int m;
    cin >> m;
    while (m--) {
        int i, j;
        cin >> i >> j;
        // TODO: pre[j] - pre[i-1] 출력
    }
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline
n = int(input())
a = list(map(int, input().split()))
pre = [0] * (n + 1)
# TODO: 누적합 채우기
m = int(input())
for _ in range(m):
    i, j = map(int, input().split())
    # TODO: pre[j] - pre[i-1] 출력`,
      testCases: [
        { stdin: "5\n1 2 3 4 5\n3\n1 5\n2 3\n4 4", expectedOutput: "15\n5\n4", label: "질의 3개" },
        { stdin: "3\n10 10 10\n2\n1 1\n1 3", expectedOutput: "10\n30", label: "질의 2개" },
        { stdin: "4\n1 2 3 4\n1\n2 4", expectedOutput: "9", label: "질의 1개" },
      ],
      hints: [
        "누적합 pre 는 질의 전에 딱 한 번만 만들면 돼요.",
        "각 질의는 pre[j] - pre[i-1] — 반복문 안에서 매번 새로 더하지 마세요.",
        "출력은 질의마다 한 줄.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> pre(n + 1, 0);
    for (int k = 1; k <= n; k++) {
        int x; cin >> x;
        pre[k] = pre[k - 1] + x;
    }
    int m;
    cin >> m;
    while (m--) {
        int i, j;
        cin >> i >> j;
        cout << pre[j] - pre[i - 1] << '\\n';
    }
    return 0;
}`,
      pySolutionCode: `import sys
input = sys.stdin.readline
n = int(input())
a = list(map(int, input().split()))
pre = [0] * (n + 1)
for k in range(1, n + 1):
    pre[k] = pre[k - 1] + a[k - 1]
m = int(input())
out = []
for _ in range(m):
    i, j = map(int, input().split())
    out.append(str(pre[j] - pre[i - 1]))
print('\\n'.join(out))`,
      solutionExplanation: "누적합은 질의 전에 한 번만 만들어 둡니다. 그 뒤로는 질의가 몇 개든 각각 pre[j]-pre[i-1] 한 번의 뺄셈으로 끝나요. 다음 보통 문제는 이걸 N,M이 10만까지 커진 버전입니다.",
      en: {
        title: "Sums of Many Ranges",
        description: `Given N integers and M queries \`i j\` (1-based), print each range sum on its own line. Build the prefix sum **once**; then answer any number of queries with pre[j] - pre[i-1]. (The next 'medium' problem is this with much larger N, M.)`,
        constraints: "1 ≤ N, M ≤ 1,000, -1000 ≤ each integer ≤ 1000, 1 ≤ i ≤ j ≤ N",
        hints: [
          "Build pre only once, before the queries.",
          "Each query is pre[j] - pre[i-1] — don't re-loop per query.",
          "One line of output per query.",
        ],
        solutionExplanation: "Build the prefix sum once; then each of the M queries is a single subtraction. The next medium problem is the same with N, M up to 100,000.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 1. 구간 합 구하기 4 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-001",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "보통",
      kl: true,
      title: "구간 합 빠르게",
      description: `N개의 정수가 주어지고, M개의 질의가 이어진다. 각 질의는 두 정수 \`i j\` (1-based, i ≤ j) 로 주어지며, **i번째부터 j번째까지의 원소 합** 을 답해야 한다.

질의가 많아 매번 for 루프로 더하면 시간 초과. 누적합 배열을 미리 만들어 두면 각 질의를 O(1) 에 답할 수 있다.

각 답을 한 줄에 하나씩 출력.

출처: BOJ 11659 paraphrased`,
      constraints: "1 ≤ N, M ≤ 100,000, -1000 ≤ 각 정수 ≤ 1000, 1 ≤ i ≤ j ≤ N",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 3\n5 4 3 2 1\n1 3\n2 4\n5 5",
          expectedOutput: "12\n9\n1",
          label: "기본 — (1-3)=12, (2-4)=9, (5-5)=1",
        },
        {
          stdin: "1 1\n42\n1 1",
          expectedOutput: "42",
          label: "원소 1개",
        },
        {
          stdin: "4 2\n1 1 1 1\n1 4\n2 3",
          expectedOutput: "4\n2",
          label: "전부 1",
        },
        {
          stdin: "5 4\n-1 -2 -3 -4 -5\n1 5\n1 1\n3 5\n2 4",
          expectedOutput: "-15\n-1\n-12\n-9",
          label: "음수 전부",
        },
        {
          stdin: "6 3\n10 -5 3 7 -2 8\n1 6\n2 4\n4 6",
          expectedOutput: "21\n5\n13",
          label: "혼합",
        },
      ],
      hints: [
        "누적합 배열 `s` 를 만든다: `s[0]=0`, `s[k]=a[0]+a[1]+...+a[k-1]`.",
        "구간 [i, j] (1-based) 의 합 = `s[j] - s[i-1]`.",
        "M 번의 질의가 각각 O(1) 이므로 전체 O(N + M).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<long long> s(n + 1, 0);
    for (int k = 1; k <= n; k++) {
        int x; cin >> x;
        s[k] = s[k - 1] + x;
    }
    while (m--) {
        int i, j;
        cin >> i >> j;
        cout << s[j] - s[i - 1] << "\\n";
    }
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    idx = 0
    n = int(data[idx]); idx += 1
    m = int(data[idx]); idx += 1
    s = [0] * (n + 1)
    for k in range(1, n + 1):
        s[k] = s[k - 1] + int(data[idx]); idx += 1
    out = []
    for _ in range(m):
        i = int(data[idx]); idx += 1
        j = int(data[idx]); idx += 1
        out.append(str(s[j] - s[i - 1]))
    sys.stdout.write("\\n".join(out) + "\\n")

main()`,
      solutionExplanation:
        "누적합 패턴의 가장 순수한 형태. `s[k]` 가 첫 k 개의 합이면 [i, j] 구간 합은 `s[j] - s[i-1]`. 합이 -10^8 까지 갈 수 있으니 long long 안전.",
      en: {
        title: "Range Sum, Fast",
        description: `Given N integers and M queries of the form \`i j\` (1-based, i ≤ j), print the sum of elements i..j for each query.

A naive per-query loop is too slow — build a prefix-sum array so each query is O(1).

Print each answer on its own line.

Source: BOJ 11659 paraphrased`,
        constraints: "1 ≤ N, M ≤ 100,000, -1000 ≤ each integer ≤ 1000, 1 ≤ i ≤ j ≤ N",
        hints: [
          "Build `s` with `s[0]=0`, `s[k] = a[0]+...+a[k-1]`.",
          "Range [i, j] (1-based) sum = `s[j] - s[i-1]`.",
          "Each query is O(1), total O(N + M).",
        ],
        solutionExplanation:
          "The purest prefix-sum pattern. If `s[k]` is the sum of the first k elements, the sum of [i, j] is `s[j] - s[i-1]`. Use long long because sums can reach 10^8.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. K일간 최대 합 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-002",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "보통",
      kl: true,
      title: "연속 K개의 최대 합",
      description: `N일간 매일의 기온 변화 \`a[1..N]\` 이 주어진다. 연속한 **K일** 동안 기온 변화의 합이 **가장 큰 값** 을 출력하라.

핵심: 누적합으로 길이 K 구간 합을 O(1) 에 구할 수 있다. 슬라이딩 윈도우 합으로도 풀 수 있지만, 누적합 차이로 보는 시각이 더 일반적이다.

출처: BOJ 2559 paraphrased`,
      constraints: "1 ≤ K ≤ N ≤ 100,000, -100 ≤ a[i] ≤ 100",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "10 2\n3 -2 -4 -9 0 3 7 13 8 -3",
          expectedOutput: "21",
          label: "기본 — 7+13+8 아니라 K=2 → 13+8=21",
        },
        {
          stdin: "5 5\n1 2 3 4 5",
          expectedOutput: "15",
          label: "K=N — 전체 합",
        },
        {
          stdin: "5 1\n-3 -1 -7 -4 -2",
          expectedOutput: "-1",
          label: "K=1 — 단일 원소 최댓값 (전부 음수)",
        },
        {
          stdin: "6 3\n1 1 1 1 1 1",
          expectedOutput: "3",
          label: "전부 1 — 어디서나 동일",
        },
        {
          stdin: "7 4\n1 -2 3 4 -1 5 2",
          expectedOutput: "11",
          label: "K=4 — 가운데 [3,4,-1,5] = 11",
        },
      ],
      hints: [
        "누적합 `s[0..N]` 을 만들면 [i+1, i+K] 의 합 = `s[i+K] - s[i]`.",
        "i 를 0 부터 N-K 까지 돌며 최댓값 추적.",
        "초기 max 는 매우 작은 값 (예: LLONG_MIN) 으로 두면 전부 음수일 때도 안전.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    vector<long long> s(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        int x; cin >> x;
        s[i] = s[i - 1] + x;
    }
    long long best = LLONG_MIN;
    for (int i = 0; i + k <= n; i++) {
        best = max(best, s[i + k] - s[i]);
    }
    cout << best << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    n = int(data[0]); k = int(data[1])
    a = [int(x) for x in data[2:2 + n]]
    s = [0] * (n + 1)
    for i in range(1, n + 1):
        s[i] = s[i - 1] + a[i - 1]
    best = -10 ** 18
    for i in range(n - k + 1):
        v = s[i + k] - s[i]
        if v > best: best = v
    sys.stdout.write(str(best) + "\\n")

main()`,
      solutionExplanation:
        "누적합으로 길이 K 윈도우 합을 O(1). i 를 0 부터 N-K 까지 돌리며 `s[i+K] - s[i]` 의 최댓값. 음수만 있을 수 있으니 초기값은 LLONG_MIN.",
      en: {
        title: "Maximum Sum of K Consecutive Days",
        description: `Given temperature deltas a[1..N], print the **maximum sum of any K consecutive** days.

Use prefix sums so each window sum is O(1). Sliding window works too, but the prefix-sum view is more general.

Source: BOJ 2559 paraphrased`,
        constraints: "1 ≤ K ≤ N ≤ 100,000, -100 ≤ a[i] ≤ 100",
        hints: [
          "With prefix sums `s[0..N]`, window [i+1, i+K] sums to `s[i+K] - s[i]`.",
          "Sweep i from 0 to N-K, track the max.",
          "Initialize max to LLONG_MIN so all-negative inputs work.",
        ],
        solutionExplanation:
          "Length-K windows in O(1) via prefix sums: scan i in 0..N-K and track max of `s[i+K] - s[i]`. Init to LLONG_MIN to handle all-negative arrays.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 알파벳별 빈도 prefix — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-003",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "보통",
      kl: true,
      title: "알파벳별 등장 횟수 (구간)",
      description: `영문 소문자로 된 문자열 \`s\` 와 Q개의 질의가 주어진다. 각 질의는 \`c l r\` (문자 c, 0-based 인덱스 l과 r, l ≤ r) 형식이며, **s[l..r] 구간 안에 문자 c 가 몇 번 등장하는지** 답해야 한다.

질의가 많을 수 있으므로 각 알파벳마다 누적합 배열을 미리 만든다 (26 × (N+1)).

각 답을 한 줄에 하나씩 출력.

출처: BOJ 16139 paraphrased`,
      constraints: "1 ≤ |s| ≤ 200,000, 1 ≤ Q ≤ 200,000, 0 ≤ l ≤ r < |s|",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "ccccbbbaa\n3\nc 0 8\nb 0 8\na 0 2",
          expectedOutput: "4\n3\n0",
          label: "기본 — c 4개 / b 3개 / 앞 3글자에 a 없음",
        },
        {
          stdin: "a\n2\na 0 0\nb 0 0",
          expectedOutput: "1\n0",
          label: "글자 1개",
        },
        {
          stdin: "ababab\n4\na 0 5\nb 0 5\na 1 4\nb 0 0",
          expectedOutput: "3\n3\n2\n0",
          label: "교대로 — 부분 구간 검사",
        },
        {
          stdin: "zzzzz\n3\nz 0 4\nz 2 2\na 0 4",
          expectedOutput: "5\n1\n0",
          label: "전부 z + 없는 문자",
        },
        {
          stdin: "abcdefghij\n2\ne 0 9\nz 0 9",
          expectedOutput: "1\n0",
          label: "각 글자 1번씩 + 없는 문자",
        },
      ],
      hints: [
        "각 알파벳 c 마다 `cnt[c][k] = s[0..k-1] 안의 c 개수` 누적합.",
        "질의 답: `cnt[c][r+1] - cnt[c][l]`.",
        "메모리 26 × (N+1) ≈ 5.2M 개의 int — 충분.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    int n = s.size();
    vector<vector<int>> cnt(26, vector<int>(n + 1, 0));
    for (int i = 0; i < n; i++) {
        for (int c = 0; c < 26; c++) cnt[c][i + 1] = cnt[c][i];
        cnt[s[i] - 'a'][i + 1]++;
    }
    int q;
    cin >> q;
    while (q--) {
        char c;
        int l, r;
        cin >> c >> l >> r;
        cout << cnt[c - 'a'][r + 1] - cnt[c - 'a'][l] << "\\n";
    }
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    s = data[0].decode()
    n = len(s)
    # 26 prefix-count arrays
    cnt = [[0] * (n + 1) for _ in range(26)]
    for i in range(n):
        ci = ord(s[i]) - ord('a')
        for c in range(26):
            cnt[c][i + 1] = cnt[c][i]
        cnt[ci][i + 1] += 1
    q = int(data[1])
    out = []
    idx = 2
    for _ in range(q):
        c = data[idx].decode(); idx += 1
        l = int(data[idx]); idx += 1
        r = int(data[idx]); idx += 1
        ci = ord(c) - ord('a')
        out.append(str(cnt[ci][r + 1] - cnt[ci][l]))
    sys.stdout.write("\\n".join(out) + "\\n")

main()`,
      solutionExplanation:
        "1D 누적합을 알파벳별로 26개 만든다. 각 위치 i 마다 모든 26개를 복사한 뒤 현재 글자만 +1. 질의는 표준 `cnt[c][r+1] - cnt[c][l]` 패턴.",
      en: {
        title: "Letter Frequency in a Range",
        description: `Given a lowercase string s and Q queries of the form \`c l r\` (0-based, l ≤ r), print how many times character c appears in s[l..r].

Precompute a prefix-count array for each letter (26 × (N+1)).

Source: BOJ 16139 paraphrased`,
        constraints: "1 ≤ |s| ≤ 200,000, 1 ≤ Q ≤ 200,000, 0 ≤ l ≤ r < |s|",
        hints: [
          "For each letter c, build `cnt[c][k] = #c in s[0..k-1]`.",
          "Answer = `cnt[c][r+1] - cnt[c][l]`.",
          "Memory ≈ 26 × (N+1) ints, plenty fine.",
        ],
        solutionExplanation:
          "Build 26 separate 1D prefix arrays. At each position copy all 26 then bump the current letter. Each query is the usual `cnt[c][r+1] - cnt[c][l]`.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 이번 달 매출 (1D prefix queries) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-004",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "보통",
      kl: true,
      title: "이번 달 매출 — 누적 vs 구간",
      description: `N일간 매출 \`a[1..N]\` 이 주어진다. Q개의 질의를 처리하라.

각 질의는 두 형식 중 하나다:
- \`1 i\` → **1일부터 i일까지의 누적 매출** 을 출력
- \`2 i j\` → **i일부터 j일까지의 매출 합** 을 출력 (1 ≤ i ≤ j ≤ N)

매번 다시 더하면 느리니 누적합 배열을 한 번만 만들고 재사용한다.

출처: 원본 (1D prefix 다중 형식 질의)`,
      constraints: "1 ≤ N, Q ≤ 100,000, -10,000 ≤ a[i] ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 4\n1 2 3 4 5\n1 3\n2 2 4\n1 5\n2 1 1",
          expectedOutput: "6\n9\n15\n1",
          label: "기본 — 두 형식 섞임",
        },
        {
          stdin: "3 3\n10 -5 20\n1 1\n1 2\n1 3",
          expectedOutput: "10\n5\n25",
          label: "누적만 — 음수 포함",
        },
        {
          stdin: "1 2\n7\n1 1\n2 1 1",
          expectedOutput: "7\n7",
          label: "원소 1개 — 두 형식 같은 답",
        },
        {
          stdin: "4 2\n0 0 0 0\n1 4\n2 1 4",
          expectedOutput: "0\n0",
          label: "전부 0",
        },
        {
          stdin: "5 3\n-100 -100 200 -50 50\n1 5\n2 1 2\n2 3 5",
          expectedOutput: "0\n-200\n200",
          label: "음수 + 양수 혼합",
        },
      ],
      hints: [
        "누적합 `s[k] = a[1] + ... + a[k]`, `s[0] = 0`.",
        "형식 1: `s[i]` 그대로.",
        "형식 2: `s[j] - s[i-1]`.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, q;
    cin >> n >> q;
    vector<long long> s(n + 1, 0);
    for (int k = 1; k <= n; k++) {
        long long x; cin >> x;
        s[k] = s[k - 1] + x;
    }
    while (q--) {
        int type;
        cin >> type;
        if (type == 1) {
            int i; cin >> i;
            cout << s[i] << "\\n";
        } else {
            int i, j; cin >> i >> j;
            cout << s[j] - s[i - 1] << "\\n";
        }
    }
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    idx = 0
    n = int(data[idx]); idx += 1
    q = int(data[idx]); idx += 1
    s = [0] * (n + 1)
    for k in range(1, n + 1):
        s[k] = s[k - 1] + int(data[idx]); idx += 1
    out = []
    for _ in range(q):
        t = int(data[idx]); idx += 1
        if t == 1:
            i = int(data[idx]); idx += 1
            out.append(str(s[i]))
        else:
            i = int(data[idx]); idx += 1
            j = int(data[idx]); idx += 1
            out.append(str(s[j] - s[i - 1]))
    sys.stdout.write("\\n".join(out) + "\\n")

main()`,
      solutionExplanation:
        "두 가지 질의 모두 같은 누적합 배열로 답할 수 있다. 누적 매출은 `s[i]` 자체, 구간 매출은 `s[j] - s[i-1]`. 배열은 한 번만 만든다.",
      en: {
        title: "Monthly Revenue — Prefix vs Range",
        description: `Daily revenues a[1..N] are given. Process Q queries of two types:
- \`1 i\` → print cumulative revenue from day 1 to day i.
- \`2 i j\` → print revenue from day i to day j.

Use one prefix-sum array for both.

Source: original (mixed-type 1D prefix queries)`,
        constraints: "1 ≤ N, Q ≤ 100,000, -10,000 ≤ a[i] ≤ 10,000",
        hints: [
          "Prefix `s[k] = a[1] + ... + a[k]`, `s[0] = 0`.",
          "Type 1 answer: `s[i]`.",
          "Type 2 answer: `s[j] - s[i-1]`.",
        ],
        solutionExplanation:
          "Both query types share one prefix array — cumulative is `s[i]` and range is `s[j] - s[i-1]`.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 0 첫 도달 위치 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-005",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "보통",
      kl: true,
      title: "누적합이 0 이 되는 가장 빠른 위치",
      description: `N개의 정수 \`a[1..N]\` 이 주어진다. **첫 k 개의 합이 0** 이 되는 **가장 작은 k (1 ≤ k ≤ N)** 를 출력하라. 그런 k 가 없다면 \`-1\` 출력.

예: \`[3, -1, -2, 5]\` → s = [0, 3, 2, 0, 5] → s[3]=0 이므로 k=3.

출처: 원본 (prefix 첫 등장 인덱스)`,
      constraints: "1 ≤ N ≤ 200,000, -1,000,000 ≤ a[i] ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4\n3 -1 -2 5", expectedOutput: "3", label: "기본 — k=3" },
        { stdin: "1\n0", expectedOutput: "1", label: "첫 원소가 0" },
        { stdin: "3\n1 2 3", expectedOutput: "-1", label: "도달 불가 (전부 양수)" },
        { stdin: "5\n5 -5 5 -5 5", expectedOutput: "2", label: "k=2 에서 첫 0" },
        { stdin: "2\n1 -1", expectedOutput: "2", label: "마지막에서 도달" },
        { stdin: "4\n-1 -1 -1 -1", expectedOutput: "-1", label: "전부 음수 — 도달 불가" },
      ],
      hints: [
        "누적합 `s[k]` 를 1 부터 계산하며 처음으로 0 이 되는 k 를 찾는다.",
        "찾으면 즉시 출력 후 종료. 끝까지 못 찾으면 -1.",
        "값 범위가 커서 `s` 는 long long.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    long long s = 0;
    int ans = -1;
    for (int k = 1; k <= n; k++) {
        long long x; cin >> x;
        s += x;
        if (s == 0 && ans == -1) ans = k;
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    n = int(data[0])
    s = 0
    ans = -1
    for k in range(1, n + 1):
        s += int(data[k])
        if s == 0 and ans == -1:
            ans = k
    sys.stdout.write(str(ans) + "\\n")

main()`,
      solutionExplanation:
        "전체 배열을 만들 필요 없이 누적합을 흘려가면서 처음 0 이 되는 k 만 기억. 이후 입력은 계속 읽어야 stdin 이 깔끔하지만 답은 안 갱신.",
      en: {
        title: "First Prefix Hitting Zero",
        description: `Given integers a[1..N], print the smallest k (1 ≤ k ≤ N) such that the sum of the first k equals 0, or \`-1\` if none.

Source: original (first-occurrence prefix)`,
        constraints: "1 ≤ N ≤ 200,000, -1,000,000 ≤ a[i] ≤ 1,000,000",
        hints: [
          "Sweep a running prefix sum and stop at the first time it equals 0.",
          "Print -1 if you never hit 0.",
          "Use long long — values are large.",
        ],
        solutionExplanation:
          "Stream the prefix sum and remember the first k where it equals 0. Keep reading even after to consume stdin cleanly.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 두 부분 합이 같은 분할점 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-006",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "보통",
      kl: true,
      title: "균형점 찾기 (양쪽 합 같음)",
      description: `N개의 정수 \`a[1..N]\` 이 주어진다. \`a[1..i] 의 합 == a[i+1..N] 의 합\` 을 만족하는 **가장 작은 i (1 ≤ i < N)** 를 찾아 출력하라. 그런 i 가 없으면 \`-1\` 출력.

핵심 관찰: 전체 합 \`T\` 가 짝수의 절반이라야 균형 가능. 즉 \`s[i] = T / 2\` 인 첫 i. 단, T 가 홀수여도 답이 있을 수 있음? 아니다 — 양쪽 정수 합이 같으려면 2*s[i] = T 즉 T 가 짝수.

엄밀히는: 답이 있다 ⇔ T 가 짝수이고 s[i] == T/2 인 i (1 ≤ i < N) 존재.

출처: 원본 (LeetCode 724 Find Pivot Index 변형 — 1-based & "smallest i")`,
      constraints: "2 ≤ N ≤ 200,000, -10,000 ≤ a[i] ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n1 2 3 3 3",
          expectedOutput: "3",
          label: "1+2+3 = 6, 3+3 = 6 → i=3",
        },
        {
          stdin: "4\n1 1 1 1",
          expectedOutput: "2",
          label: "1+1 = 1+1 → i=2",
        },
        {
          stdin: "3\n1 2 4",
          expectedOutput: "-1",
          label: "T=7 홀수 — 불가능",
        },
        {
          stdin: "2\n5 5",
          expectedOutput: "1",
          label: "최소 케이스 — i=1",
        },
        {
          stdin: "5\n1 5 2 -1 7",
          expectedOutput: "4",
          label: "혼합 — T=14, s[4]=7=T/2 → i=4",
        },
        {
          stdin: "5\n0 0 0 0 0",
          expectedOutput: "1",
          label: "전부 0 — i=1 이 가장 작음",
        },
      ],
      hints: [
        "전체 합 T 를 먼저 구한다. T 가 홀수면 즉시 -1.",
        "누적합 s[i] 를 1 부터 흘리며 첫 s[i] == T/2 (i < N) 를 찾는다.",
        "long long 사용 — 합이 음수 또는 큰 값일 수 있음.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<long long> a(n + 1);
    long long T = 0;
    for (int i = 1; i <= n; i++) { cin >> a[i]; T += a[i]; }
    int ans = -1;
    // T 홀수 (음수여도 abs 기준 홀수면 mod 가 ±1) 이면 답 없음
    if (T % 2 == 0) {
        long long half = T / 2;
        long long s = 0;
        for (int i = 1; i < n; i++) {
            s += a[i];
            if (s == half) { ans = i; break; }
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    n = int(data[0])
    a = [int(x) for x in data[1:1 + n]]
    T = sum(a)
    ans = -1
    if T % 2 == 0:
        half = T // 2
        s = 0
        for i in range(1, n):  # i < N
            s += a[i - 1]
            if s == half:
                ans = i
                break
    sys.stdout.write(str(ans) + "\\n")

main()`,
      solutionExplanation:
        "전체 합 T 가 짝수일 때만 답이 있을 수 있다. 그 경우 s[i] = T/2 가 되는 첫 i (1 ≤ i < N) 가 답. 한 번의 패스로 끝.",
      en: {
        title: "Balance Point (Equal Left/Right Sum)",
        description: `Given integers a[1..N], find the smallest i (1 ≤ i < N) such that the sum of a[1..i] equals the sum of a[i+1..N]. Print \`-1\` if no such i exists.

A solution exists only when the total sum T is even, and the first prefix equal to T/2 is the answer.

Source: original (LC 724 variant — 1-based, smallest i)`,
        constraints: "2 ≤ N ≤ 200,000, -10,000 ≤ a[i] ≤ 10,000",
        hints: [
          "Compute total T first. If T is odd → -1.",
          "Sweep the prefix sum; the first i with s[i] = T/2 (and i < N) is the answer.",
          "Use long long.",
        ],
        solutionExplanation:
          "An answer exists only if T is even. Scan the prefix sum and stop at the first s[i] = T/2 with i < N.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 부분 배열 합 = K — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-007",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "어려움",
      title: "부분 배열 합이 K 인 개수",
      description: `N개의 정수 \`a[1..N]\` 과 정수 K 가 주어진다. **연속한 부분 배열의 합이 정확히 K** 인 부분 배열의 개수를 출력하라.

핵심: 누적합 \`s[i]\` 만들고, 두 인덱스 \`i < j\` 에서 \`s[j] - s[i] = K\` ⇔ \`s[i] = s[j] - K\`. 즉 지금까지 본 prefix 값 중 \`s[j] - K\` 가 몇 번 나왔는지를 **해시맵** 으로 즉시 답.

음수가 있어서 슬라이딩 윈도우는 안 된다 — 합이 단조롭게 늘지 않으니까.

출처: LeetCode 560 (Subarray Sum Equals K)`,
      constraints: "1 ≤ N ≤ 200,000, -10,000 ≤ a[i] ≤ 10,000, -10^9 ≤ K ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 2\n1 1 1 1",
          expectedOutput: "3",
          label: "K=2 — (1,2), (2,3), (3,4) 세 부분",
        },
        {
          stdin: "5 3\n1 2 3 -3 3",
          expectedOutput: "5",
          label: "음수 포함 — [3](가운데), [1,2], [1,2,3,-3], [3,-3,3], [3](마지막)",
        },
        {
          stdin: "1 5\n5",
          expectedOutput: "1",
          label: "원소 1개 = K",
        },
        {
          stdin: "1 5\n4",
          expectedOutput: "0",
          label: "원소 1개 ≠ K",
        },
        {
          stdin: "5 0\n1 -1 1 -1 1",
          expectedOutput: "6",
          label: "K=0 — 누적합 동일 쌍 다수",
        },
        {
          stdin: "3 6\n1 2 3",
          expectedOutput: "1",
          label: "전체만 — [1,2,3]",
        },
      ],
      hints: [
        "누적합 `s[0]=0, s[k]=s[k-1]+a[k]`. 구간 [i+1, j] 합 = `s[j] - s[i]`.",
        "각 j 에서 `s[j] - K` 가 지금까지 몇 번 나왔는지 카운트 (해시맵).",
        "맵을 채우기 **전에** 답을 누적해야 같은 인덱스를 양쪽에 두지 않는다. 초기값 `mp[0] = 1` (빈 prefix).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    long long K;
    cin >> n >> K;
    unordered_map<long long, long long> mp;
    mp[0] = 1; // 빈 prefix
    long long s = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        s += x;
        auto it = mp.find(s - K);
        if (it != mp.end()) ans += it->second;
        mp[s]++;
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    n = int(data[0]); K = int(data[1])
    seen = {0: 1}  # 빈 prefix
    s = 0
    ans = 0
    for i in range(n):
        s += int(data[2 + i])
        ans += seen.get(s - K, 0)
        seen[s] = seen.get(s, 0) + 1
    sys.stdout.write(str(ans) + "\\n")

main()`,
      solutionExplanation:
        "고전 패턴. 누적합을 흘리며 `s - K` 가 지금까지 몇 번 나왔는지 해시맵으로 조회 → 그 만큼이 j 에서 끝나는 답 부분배열 수. `mp[0]=1` 초기화로 [1..j] 자체가 K 인 경우 포함. O(N) 평균.",
      en: {
        title: "Subarray Sum Equals K",
        description: `Given N integers and K, print the number of **contiguous subarrays** whose sum is exactly K.

Use prefix sums in a hashmap: for each j, count how many earlier prefix values equal \`s[j] - K\`. Sliding window fails when negatives are allowed.

Source: LeetCode 560`,
        constraints: "1 ≤ N ≤ 200,000, -10,000 ≤ a[i] ≤ 10,000, -10^9 ≤ K ≤ 10^9",
        hints: [
          "Prefix `s[0]=0, s[k]=s[k-1]+a[k]`. Range [i+1, j] sum = `s[j] - s[i]`.",
          "At each j, count how many earlier prefixes equal `s[j] - K` (hashmap).",
          "Add to answer **before** inserting current prefix. Initialize `mp[0] = 1`.",
        ],
        solutionExplanation:
          "Classic trick: stream prefix sums, look up `s - K` in a hashmap of earlier sums. `mp[0] = 1` handles subarrays starting at index 1. Average O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 부분 배열 합 % K == 0 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-008",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "어려움",
      title: "부분 배열 합이 K의 배수",
      description: `N개의 정수 \`a[1..N]\` 과 양의 정수 K 가 주어진다. **연속한 부분 배열의 합이 K 로 나누어떨어지는** 부분 배열의 개수를 출력하라.

핵심: \`(s[j] - s[i]) % K == 0 ⇔ s[j] % K == s[i] % K\`. 즉 같은 나머지를 가지는 prefix 쌍의 개수를 세면 된다.

⚠️ C++ 에서 음수 mod 는 음수가 나올 수 있다 — \`((s % K) + K) % K\` 로 보정.

출처: LeetCode 974 (Subarray Sums Divisible by K) paraphrased`,
      constraints: "1 ≤ N ≤ 200,000, -10,000 ≤ a[i] ≤ 10,000, 1 ≤ K ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "6 5\n4 5 0 -2 -3 1",
          expectedOutput: "7",
          label: "LC 974 예시",
        },
        {
          stdin: "3 3\n3 3 3",
          expectedOutput: "6",
          label: "전부 K 배수 — 모든 부분 배열 (3+2+1=6)",
        },
        {
          stdin: "1 5\n5",
          expectedOutput: "1",
          label: "원소 1개 = K",
        },
        {
          stdin: "1 5\n3",
          expectedOutput: "0",
          label: "원소 1개 ≠ K의 배수",
        },
        {
          stdin: "4 2\n1 1 1 1",
          expectedOutput: "4",
          label: "합이 2의 배수: (1,2),(2,3),(3,4),(1,4)",
        },
        {
          stdin: "5 7\n-7 14 -21 7 -14",
          expectedOutput: "15",
          label: "전부 7 배수 — C(5+1,2)=15? 5×6/2=15. 부분배열 수 = 5+4+3+2+1=15.",
        },
      ],
      hints: [
        "누적합 s 의 mod K 값만 세면 충분.",
        "C++ 음수 mod 보정: `r = ((s % K) + K) % K`.",
        "각 나머지 r 의 등장 횟수 c 에 대해 답에 `c choose 2` 만큼 기여. 초기값 `cnt[0]=1` (빈 prefix).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, K;
    cin >> n >> K;
    vector<long long> cnt(K, 0);
    cnt[0] = 1; // 빈 prefix
    long long s = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        s += x;
        long long r = ((s % K) + K) % K;
        ans += cnt[r];
        cnt[r]++;
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    n = int(data[0]); K = int(data[1])
    cnt = [0] * K
    cnt[0] = 1  # 빈 prefix
    s = 0
    ans = 0
    for i in range(n):
        s += int(data[2 + i])
        # 파이썬 % 는 항상 양수 (K>0) — 별도 보정 불필요
        r = s % K
        ans += cnt[r]
        cnt[r] += 1
    sys.stdout.write(str(ans) + "\\n")

main()`,
      solutionExplanation:
        "두 prefix 의 mod 가 같으면 그 사이 구간 합이 K 의 배수. 각 나머지의 등장 횟수를 세면서 매번 '지금까지 같은 나머지였던 prefix 의 수' 를 답에 더한다. 음수 mod 보정이 핵심.",
      en: {
        title: "Subarray Sum Divisible by K",
        description: `Given N integers and K > 0, count contiguous subarrays whose sum is divisible by K.

\`(s[j] - s[i]) % K == 0 ⇔ s[j] % K == s[i] % K\` — count pairs with equal mod-K prefix values.

⚠️ In C++, negative mod can be negative — normalize via \`((s % K) + K) % K\`.

Source: LeetCode 974 paraphrased`,
        constraints: "1 ≤ N ≤ 200,000, -10,000 ≤ a[i] ≤ 10,000, 1 ≤ K ≤ 10,000",
        hints: [
          "Track mod-K of the prefix sum.",
          "Fix negative mod: `r = ((s % K) + K) % K`.",
          "Each pair of prefixes with the same r adds 1 to the answer. Initialize `cnt[0]=1`.",
        ],
        solutionExplanation:
          "Two prefixes with equal mod K bound a divisible subarray. Sweep prefixes, on each step add the count of earlier prefixes with the same r, then bump the counter.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 2D 누적합 영역 합 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-009",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "어려움",
      title: "2D 영역 합 질의",
      description: `N×N 정수 격자가 주어진다. M개의 질의 \`x1 y1 x2 y2\` (1-based, x1 ≤ x2, y1 ≤ y2) 가 이어진다. 각 질의에 대해 **부분 사각형의 합** 을 출력하라.

핵심: 2D 누적합 \`S[i][j] = (1,1)..(i,j) 사각형 합\` 을 미리 계산. 그러면 임의 사각형 합은
\`S[x2][y2] - S[x1-1][y2] - S[x2][y1-1] + S[x1-1][y1-1]\`.

출처: BOJ 11660 paraphrased`,
      constraints: "1 ≤ N ≤ 1024, 1 ≤ M ≤ 100,000, -1000 ≤ 각 원소 ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 3\n1 2 3 4\n2 3 4 5\n3 4 5 6\n4 5 6 7\n2 2 3 4\n3 4 3 4\n1 1 4 4",
          expectedOutput: "27\n6\n64",
          label: "BOJ 11660 예시",
        },
        {
          stdin: "2 2\n5 5\n5 5\n1 1 1 1\n1 1 2 2",
          expectedOutput: "5\n20",
          label: "단일 셀 + 전체",
        },
        {
          stdin: "3 2\n1 1 1\n1 1 1\n1 1 1\n2 2 3 3\n1 1 3 3",
          expectedOutput: "4\n9",
          label: "전부 1",
        },
        {
          stdin: "2 3\n-1 -2\n-3 -4\n1 1 1 1\n1 1 2 2\n2 2 2 2",
          expectedOutput: "-1\n-10\n-4",
          label: "음수만",
        },
        {
          stdin: "3 1\n1 -1 1\n-1 1 -1\n1 -1 1\n1 1 3 3",
          expectedOutput: "1",
          label: "교차 부호 — 전체 합",
        },
      ],
      hints: [
        "S[i][j] = S[i-1][j] + S[i][j-1] - S[i-1][j-1] + a[i][j] (1-based, 경계 0).",
        "질의 답 = S[x2][y2] - S[x1-1][y2] - S[x2][y1-1] + S[x1-1][y1-1].",
        "M = 10만 이라도 질의당 O(1) 이라 충분히 빠름.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<vector<long long>> S(n + 1, vector<long long>(n + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            long long x; cin >> x;
            S[i][j] = S[i - 1][j] + S[i][j - 1] - S[i - 1][j - 1] + x;
        }
    }
    while (m--) {
        int x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        cout << S[x2][y2] - S[x1 - 1][y2] - S[x2][y1 - 1] + S[x1 - 1][y1 - 1] << "\\n";
    }
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    idx = 0
    n = int(data[idx]); idx += 1
    m = int(data[idx]); idx += 1
    # 2D prefix S[0..n][0..n], 1-based
    S = [[0] * (n + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        row_prev = S[i - 1]
        row = S[i]
        for j in range(1, n + 1):
            v = int(data[idx]); idx += 1
            row[j] = row_prev[j] + row[j - 1] - row_prev[j - 1] + v
    out = []
    for _ in range(m):
        x1 = int(data[idx]); idx += 1
        y1 = int(data[idx]); idx += 1
        x2 = int(data[idx]); idx += 1
        y2 = int(data[idx]); idx += 1
        out.append(str(S[x2][y2] - S[x1 - 1][y2] - S[x2][y1 - 1] + S[x1 - 1][y1 - 1]))
    sys.stdout.write("\\n".join(out) + "\\n")

main()`,
      solutionExplanation:
        "포함-배제: 큰 직사각형 빼기 두 옆/위 직사각형 더하기 좌상단 겹친 사각형. 1-based 로 두면 경계 처리 깔끔. 총 시간 O(N² + M).",
      en: {
        title: "2D Rectangle Sum Queries",
        description: `Given an N×N grid and M queries \`x1 y1 x2 y2\` (1-based), print the sum of each subrectangle.

Build the 2D prefix \`S[i][j]\` once, then each query is O(1) via inclusion-exclusion:
\`S[x2][y2] - S[x1-1][y2] - S[x2][y1-1] + S[x1-1][y1-1]\`.

Source: BOJ 11660 paraphrased`,
        constraints: "1 ≤ N ≤ 1024, 1 ≤ M ≤ 100,000, -1000 ≤ each cell ≤ 1000",
        hints: [
          "S[i][j] = S[i-1][j] + S[i][j-1] - S[i-1][j-1] + a[i][j].",
          "Answer = S[x2][y2] - S[x1-1][y2] - S[x2][y1-1] + S[x1-1][y1-1].",
          "Each query is O(1), so even 100k queries are fine.",
        ],
        solutionExplanation:
          "Inclusion-exclusion: subtract the two adjacent strips, add back the doubly subtracted corner. 1-based indexing keeps boundary handling clean.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. +1/-1 균형 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-010",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "어려움",
      title: "0/1 배열에서 0과 1 같은 수 — 최장 부분 배열",
      description: `N개의 비트 (0 또는 1) 가 주어진다. **0의 개수와 1의 개수가 같은** 연속 부분 배열의 **최대 길이** 를 출력하라.

존재하지 않으면 \`0\` 출력.

핵심 변환: 0 을 -1 로 바꾸면 "합이 0 인 가장 긴 부분 배열" 문제가 된다. 누적합이 같은 두 인덱스 \`i < j\` 가 있으면 그 사이 합이 0 → 길이 \`j - i\`. 각 누적합 값의 **첫 등장 인덱스** 만 기억하면 최대 길이를 갱신할 수 있다.

출처: LeetCode 525 (Contiguous Array) paraphrased`,
      constraints: "1 ≤ N ≤ 200,000, 각 원소는 0 또는 1",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "2\n0 1",
          expectedOutput: "2",
          label: "기본",
        },
        {
          stdin: "3\n0 1 0",
          expectedOutput: "2",
          label: "[0,1] 또는 [1,0]",
        },
        {
          stdin: "1\n0",
          expectedOutput: "0",
          label: "1개 — 균형 불가",
        },
        {
          stdin: "4\n1 1 1 1",
          expectedOutput: "0",
          label: "전부 1 — 균형 불가",
        },
        {
          stdin: "6\n0 1 1 0 1 1",
          expectedOutput: "4",
          label: "[0,1,1,0] 길이 4",
        },
        {
          stdin: "8\n0 0 1 0 0 0 1 1",
          expectedOutput: "6",
          label: "마지막 6개 [1,0,0,0,1,1] — 1: 3개, 0: 3개",
        },
      ],
      hints: [
        "0 → -1 로 치환하면 '합 0 인 최장 부분 배열'.",
        "누적합 `s` 를 흘리며, 각 값의 **첫 등장 인덱스** 만 해시맵에 기록.",
        "같은 값이 다시 나오면 `i - first[s]` 가 후보 길이. 초기값 `first[0] = 0` (빈 prefix).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    unordered_map<int, int> first;
    first[0] = 0;
    int s = 0, best = 0;
    for (int i = 1; i <= n; i++) {
        int x; cin >> x;
        s += (x == 1) ? 1 : -1;
        auto it = first.find(s);
        if (it != first.end()) best = max(best, i - it->second);
        else first[s] = i;
    }
    cout << best << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    n = int(data[0])
    first = {0: 0}
    s = 0
    best = 0
    for i in range(1, n + 1):
        x = int(data[i])
        s += 1 if x == 1 else -1
        if s in first:
            cand = i - first[s]
            if cand > best: best = cand
        else:
            first[s] = i
    sys.stdout.write(str(best) + "\\n")

main()`,
      solutionExplanation:
        "0↔-1 치환 트릭으로 prefix 합이 같은 두 지점 사이가 균형 구간. **첫 등장 인덱스만** 기록해야 최대 길이가 나온다 — 이후 같은 값이 나오면 항상 i - first[s] 가 더 길다.",
      en: {
        title: "Longest Subarray with Equal 0s and 1s",
        description: `Given N bits (0 or 1), print the maximum length of a contiguous subarray with equal counts of 0 and 1 (or \`0\` if none).

Trick: map 0 → -1, then it becomes the longest subarray summing to 0. Track the **first occurrence** of each prefix-sum value in a hashmap.

Source: LeetCode 525 paraphrased`,
        constraints: "1 ≤ N ≤ 200,000, each element is 0 or 1",
        hints: [
          "Replace 0 → -1 → longest zero-sum subarray.",
          "Hashmap the first index of each prefix-sum value.",
          "When the value repeats, candidate length = i - first[s]. Init `first[0] = 0`.",
        ],
        solutionExplanation:
          "0↔-1 substitution turns this into 'longest zero-sum subarray'. Storing only the **first** occurrence of each prefix value maximizes the candidate length on every revisit.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 빗물 가두기 — 어려움 (양방향 prefix max)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-011",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "어려움",
      title: "빗물 가두기 (양방향 prefix max)",
      description: `히스토그램 (높이 배열 \`h[0..N-1]\`) 위에 비가 내린다. 각 위치 \`i\` 에 고이는 물의 높이는 \`min(좌측 최댓값, 우측 최댓값) - h[i]\` (단, 음수면 0). 모든 위치의 고인 물의 합을 출력하라.

핵심: **좌측 prefix max** 와 **우측 suffix max** 두 배열을 미리 만들면 각 위치 답이 O(1).

출처: LeetCode 42 (Trapping Rain Water) — prefix-max 풀이`,
      constraints: "0 ≤ N ≤ 200,000, 0 ≤ h[i] ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "12\n0 1 0 2 1 0 1 3 2 1 2 1",
          expectedOutput: "6",
          label: "LC 42 예시",
        },
        {
          stdin: "0\n",
          expectedOutput: "0",
          label: "빈 입력",
        },
        {
          stdin: "1\n5",
          expectedOutput: "0",
          label: "막대 1개",
        },
        {
          stdin: "2\n3 5",
          expectedOutput: "0",
          label: "2개 — 가둘 곳 없음",
        },
        {
          stdin: "5\n5 4 3 2 1",
          expectedOutput: "0",
          label: "단조 감소 — 0",
        },
        {
          stdin: "6\n4 2 0 3 2 5",
          expectedOutput: "9",
          label: "LC 42 두 번째 예시",
        },
      ],
      hints: [
        "L[i] = max(h[0..i]), R[i] = max(h[i..N-1]) 두 배열 만들기.",
        "각 i 에서 물 = max(0, min(L[i], R[i]) - h[i]).",
        "전체 시간 O(N), 메모리 O(N). N=0 일 때 0 출력하도록 조심.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    if (n == 0) { cout << 0 << "\\n"; return 0; }
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    vector<int> L(n), R(n);
    L[0] = h[0];
    for (int i = 1; i < n; i++) L[i] = max(L[i - 1], h[i]);
    R[n - 1] = h[n - 1];
    for (int i = n - 2; i >= 0; i--) R[i] = max(R[i + 1], h[i]);
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        int level = min(L[i], R[i]);
        if (level > h[i]) ans += level - h[i];
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    n = int(data[0])
    if n == 0:
        sys.stdout.write("0\\n")
        return
    h = [int(x) for x in data[1:1 + n]]
    L = [0] * n
    R = [0] * n
    L[0] = h[0]
    for i in range(1, n):
        L[i] = L[i - 1] if L[i - 1] > h[i] else h[i]
    R[n - 1] = h[n - 1]
    for i in range(n - 2, -1, -1):
        R[i] = R[i + 1] if R[i + 1] > h[i] else h[i]
    ans = 0
    for i in range(n):
        lvl = L[i] if L[i] < R[i] else R[i]
        if lvl > h[i]:
            ans += lvl - h[i]
    sys.stdout.write(str(ans) + "\\n")

main()`,
      solutionExplanation:
        "각 위치의 물 높이는 양쪽 최댓값 중 작은 쪽까지. 좌측 prefix max 와 우측 suffix max 두 패스로 만들어두면 메인 루프는 O(1) 조회. 한쪽 max 만으로는 부족 — 양쪽 모두 필요.",
      en: {
        title: "Trapping Rain Water (Two-Way Prefix Max)",
        description: `Given heights h[0..N-1], rainwater trapped at i is \`max(0, min(left_max, right_max) - h[i])\`. Print the total trapped water.

Build left-prefix-max and right-suffix-max in two passes; each cell is then O(1).

Source: LeetCode 42 — prefix-max approach`,
        constraints: "0 ≤ N ≤ 200,000, 0 ≤ h[i] ≤ 100,000",
        hints: [
          "L[i] = max(h[0..i]), R[i] = max(h[i..N-1]).",
          "Trapped at i = max(0, min(L[i], R[i]) - h[i]).",
          "O(N) time and memory. Handle N=0 separately.",
        ],
        solutionExplanation:
          "Water at each index is capped by the smaller of the two side maxima. Two prefix/suffix-max passes plus one main sweep — three linear passes total.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 평균 ≥ X 인 길이 ≥ K 부분 배열 존재? — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apre-012",
      cluster: "algo-prefixsum-contest",
      unlockAfter: "algo-prefixsum",
      difficulty: "어려움",
      title: "길이 K 이상 부분 배열의 최대 평균",
      description: `N개의 정수 \`a[1..N]\` 과 정수 K (1 ≤ K ≤ N) 가 주어진다. **길이가 K 이상인** 모든 연속 부분 배열 중 **평균이 가장 큰** 값을 출력하라. 정수 부분만 출력 (floor).

힌트: 평균 ≥ X 인 부분 배열 존재 ⇔ \`a[i] - X\` 의 누적합에서 길이 ≥ K 인 양수 부분합 존재. 이를 활용해 X 를 이분 탐색.

하지만 이 문제는 **정수 X** 만 다루므로 가능한 X 범위를 \`-10^4 .. 10^4\` 에서 이분 탐색하면 충분.

체크 함수: \`b[i] = a[i] - X\`, prefix \`P\`, \`P[j] - min(P[0..j-K]) ≥ 0\` 인 j 가 있으면 가능.

출처: 원본 (LeetCode 644 paraphrased — float → int)`,
      constraints: "1 ≤ K ≤ N ≤ 100,000, -10,000 ≤ a[i] ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 2\n1 12 -5 -6 50",
          expectedOutput: "22",
          label: "마지막 두 개 -6+50=44, 평균 22",
        },
        {
          stdin: "1 1\n7",
          expectedOutput: "7",
          label: "1개 — 그 값이 답",
        },
        {
          stdin: "4 4\n2 4 6 8",
          expectedOutput: "5",
          label: "K=N — 전체 평균 (20/4=5)",
        },
        {
          stdin: "5 1\n-3 -2 -1 -4 -5",
          expectedOutput: "-1",
          label: "전부 음수 — 최댓값 -1",
        },
        {
          stdin: "6 3\n1 1 1 10 10 10",
          expectedOutput: "10",
          label: "마지막 3개 평균 10",
        },
        {
          stdin: "5 2\n5 5 5 5 5",
          expectedOutput: "5",
          label: "균일 — 5",
        },
      ],
      hints: [
        "이분 탐색 변수 X 의 범위는 `[-10^4, 10^4]`.",
        "체크 함수 check(X): `b[i] = a[i] - X`, P 누적합. j 를 K..N 으로 돌리며 `P[j] - min(P[0..j-K])` ≥ 0 인지 확인.",
        "min(P[0..j-K]) 는 j 가 K, K+1, ... 으로 늘 때마다 P[j-K] 를 새로 후보로 포함하면서 갱신 — 단조 추적.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int n, k;
vector<long long> a;

bool check(long long X) {
    // b[i] = a[i] - X, prefix P[0..n]. Some j in [k..n] with P[j] - min(P[0..j-k]) >= 0?
    vector<long long> P(n + 1, 0);
    for (int i = 1; i <= n; i++) P[i] = P[i - 1] + (a[i - 1] - X);
    long long mn = P[0];
    for (int j = k; j <= n; j++) {
        if (P[j] - mn >= 0) return true;
        mn = min(mn, P[j - k + 1]);
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> n >> k;
    a.assign(n, 0);
    for (int i = 0; i < n; i++) cin >> a[i];
    long long lo = -10000, hi = 10000, ans = lo;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (check(mid)) { ans = mid; lo = mid + 1; }
        else hi = mid - 1;
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys

def main():
    pass

main()`,
      pySolutionCode: `import sys

def main():
    data = sys.stdin.buffer.read().split()
    n = int(data[0]); k = int(data[1])
    a = [int(x) for x in data[2:2 + n]]

    def check(X):
        # b[i] = a[i] - X, prefix P. Some j in [k..n] with P[j] - min(P[0..j-k]) >= 0?
        P = [0] * (n + 1)
        for i in range(1, n + 1):
            P[i] = P[i - 1] + (a[i - 1] - X)
        mn = P[0]
        for j in range(k, n + 1):
            if P[j] - mn >= 0:
                return True
            mn = min(mn, P[j - k + 1])
        return False

    lo, hi = -10000, 10000
    ans = lo
    while lo <= hi:
        mid = lo + (hi - lo) // 2  # 양수 폭 → // 가 C++ 의 / 와 같음
        if check(mid):
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    sys.stdout.write(str(ans) + "\\n")

main()`,
      solutionExplanation:
        "평균이 X 이상인 부분 배열 존재 여부는 `a[i] - X` 의 누적합에서 길이 ≥ K 양수 부분합 존재 여부와 동치. 이를 O(N) 체크로 만들고 정수 X 를 이분 탐색 → O(N log V). 핵심은 'min(P[0..j-K]) 를 j 가 늘면서 P[j-K+1] 만 새로 후보로 추가'.",
      en: {
        title: "Max Average of Subarray Length ≥ K (Integer)",
        description: `Given a[1..N] and K, print the **floor of the maximum average** over all contiguous subarrays of length ≥ K.

Reduction: average ≥ X ⇔ some length-≥-K subarray of \`a[i] - X\` has sum ≥ 0. Binary search the integer X.

Check in O(N) using prefix sums and a running minimum.

Source: LeetCode 644 paraphrased (float → int)`,
        constraints: "1 ≤ K ≤ N ≤ 100,000, -10,000 ≤ a[i] ≤ 10,000",
        hints: [
          "Binary-search X in [-10^4, 10^4].",
          "check(X): build P over `a[i] - X`; for j in K..N test `P[j] - min(P[0..j-K]) ≥ 0`.",
          "Maintain min incrementally — only P[j-K+1] becomes a new candidate as j advances.",
        ],
        solutionExplanation:
          "Classic 'binary-search on the answer + check via prefix sums'. Total O(N log V). The check trick is maintaining the running minimum of P[0..j-K] in O(1) per step.",
      },
    },
  ],
}
