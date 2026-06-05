import type { PracticeCluster } from "./types"

export const dpContestCluster: PracticeCluster = {
  id: "algo-dp-contest",
  title: "DP 문제 풀이",
  emoji: "🧩",
  description: "1D DP (계단/피보나치), 2D DP (knapsack), LIS, 점화식 설계",
  unlockAfter: "algo-dp",
  en: {
    title: "DP Practice",
    description: "1D, 2D DP, LIS, recurrence design",
  },
  problems: [
    // ═════════════════════════════════════════════════════════════════
    // 쉬움 입문 (on-ramp): 1·2·3 더하기(경우의 수) → 최소 동전 → 1로 만들기
    // ═════════════════════════════════════════════════════════════════
    {
      id: "adp-e01",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "쉬움",
      title: "1, 2, 3 더하기",
      description: `정수 N을 **1, 2, 3 의 합으로 나타내는 방법의 수**를 출력하라. 더하는 순서가 다르면 다른 방법으로 센다. 예: 4 = 1+1+1+1 = 1+1+2 = 1+2+1 = 2+1+1 = 2+2 = 1+3 = 3+1 → 7가지.

DP의 기본: \`dp[i] = dp[i-1] + dp[i-2] + dp[i-3]\` (마지막에 1/2/3 중 무엇을 더했는지). 작은 답에서 큰 답을 쌓아 올린다.

출처: BOJ 9095 paraphrased`,
      constraints: "1 ≤ N ≤ 30",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> dp(n + 1, 0);
    dp[0] = 1;
    // TODO: dp[i] = dp[i-1] + dp[i-2] + dp[i-3] (i-s >= 0 인 경우만)

    return 0;
}`,
      pyInitialCode: `n = int(input())
dp = [0] * (n + 1)
dp[0] = 1
# TODO: dp[i] = dp[i-1]+dp[i-2]+dp[i-3] (인덱스 0 이상만)`,
      testCases: [
        { stdin: "4", expectedOutput: "7", label: "4 → 7가지" },
        { stdin: "7", expectedOutput: "44", label: "7 → 44가지" },
        { stdin: "1", expectedOutput: "1", label: "1가지" },
        { stdin: "2", expectedOutput: "2", label: "2가지" },
        { stdin: "3", expectedOutput: "4", label: "4가지" },
      ],
      hints: [
        "dp[0] = 1 (아무것도 안 더하는 한 가지).",
        "dp[i] = (i≥1? dp[i-1]) + (i≥2? dp[i-2]) + (i≥3? dp[i-3]).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> dp(n + 1, 0);
    dp[0] = 1;
    for (int i = 1; i <= n; i++) {
        for (int s = 1; s <= 3; s++) {
            if (i - s >= 0) dp[i] += dp[i - s];
        }
    }
    cout << dp[n] << '\\n';
    return 0;
}`,
      pySolutionCode: `n = int(input())
dp = [0] * (n + 1)
dp[0] = 1
for i in range(1, n + 1):
    for s in (1, 2, 3):
        if i - s >= 0:
            dp[i] += dp[i - s]
print(dp[n])`,
      solutionExplanation: "마지막에 더한 수가 1·2·3 중 무엇인지로 나누면, dp[i]=dp[i-1]+dp[i-2]+dp[i-3]. 작은 값부터 채워 올리는 게 DP의 기본 모양이에요.",
      en: {
        title: "1, 2, 3 Addition",
        description: `Print the **number of ways** to write N as an ordered sum of 1, 2, 3. E.g. 4 has 7 ways. Basic DP: \`dp[i] = dp[i-1] + dp[i-2] + dp[i-3]\` (what you added last). Build big answers from small ones.`,
        constraints: "1 ≤ N ≤ 30",
        hints: ["dp[0]=1 (the empty sum).", "dp[i] = dp[i-1]+dp[i-2]+dp[i-3] for valid indices."],
        solutionExplanation: "Split by the last added number (1/2/3): dp[i]=dp[i-1]+dp[i-2]+dp[i-3], filled bottom-up.",
      },
    },
    {
      id: "adp-e02",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "쉬움",
      title: "최소 동전 개수",
      description: `N종류의 동전(금액)과 목표 금액 K가 주어진다. 각 동전은 **몇 개든** 쓸 수 있다. K를 만드는 **최소 동전 개수**를 출력하라. 만들 수 없으면 \`-1\`.

(그리디로는 안 되는 동전도 있어서) DP로 푼다: \`dp[x] = min(dp[x - 동전]) + 1\`. 0원부터 K원까지 차례로 최소 개수를 채워 올린다.`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ K ≤ 10,000, 1 ≤ 동전 금액 ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> coin(n);
    for (auto& c : coin) cin >> c;
    const int INF = 1e9;
    vector<int> dp(k + 1, INF);
    dp[0] = 0;
    // TODO: 각 금액 x 에 대해 dp[x] = min(dp[x - coin]) + 1

    return 0;
}`,
      pyInitialCode: `import sys
d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
coin = list(map(int, d[2:2+n]))
INF = float('inf')
dp = [0] + [INF] * k
# TODO: dp[x] = min(dp[x - c]) + 1, 못 만들면 -1`,
      testCases: [
        { stdin: "3 11\n1 2 5", expectedOutput: "3", label: "5+5+1" },
        { stdin: "2 6\n3 4", expectedOutput: "2", label: "3+3" },
        { stdin: "2 7\n2 4", expectedOutput: "-1", label: "불가능" },
        { stdin: "1 7\n1", expectedOutput: "7", label: "1원만" },
      ],
      hints: [
        "dp[0] = 0, 나머지는 무한대(INF)로 시작.",
        "각 동전 c 에 대해 x = c..K 를 돌며 dp[x] = min(dp[x], dp[x-c]+1).",
        "끝에 dp[K] 가 여전히 INF 면 -1.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> coin(n);
    for (auto& c : coin) cin >> c;
    const int INF = 1e9;
    vector<int> dp(k + 1, INF);
    dp[0] = 0;
    for (int c : coin) {
        for (int x = c; x <= k; x++) {
            if (dp[x - c] + 1 < dp[x]) dp[x] = dp[x - c] + 1;
        }
    }
    cout << (dp[k] == INF ? -1 : dp[k]) << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
coin = list(map(int, d[2:2+n]))
INF = float('inf')
dp = [0] + [INF] * k
for c in coin:
    for x in range(c, k + 1):
        if dp[x - c] + 1 < dp[x]:
            dp[x] = dp[x - c] + 1
print(dp[k] if dp[k] != INF else -1)`,
      solutionExplanation: "0원은 0개. 각 금액 x는 '어떤 동전 c를 마지막에 썼다'고 보면 dp[x]=dp[x-c]+1. 모든 동전·금액을 돌며 최소를 채우고, 끝까지 INF면 못 만드는 것(-1)이에요.",
      en: {
        title: "Minimum Number of Coins",
        description: `Given N coin values and target K (each coin usable any number of times), print the **minimum coins** to make K, or \`-1\` if impossible. Greedy can fail, so use DP: \`dp[x] = min(dp[x - coin]) + 1\`, filled from 0 to K.`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ K ≤ 10,000, 1 ≤ coin ≤ 10,000",
        hints: ["dp[0]=0, rest = INF.", "For each coin c, x=c..K: dp[x]=min(dp[x], dp[x-c]+1).", "If dp[K] stays INF → -1."],
        solutionExplanation: "dp[x]=dp[x-c]+1 over all coins; fill 0..K and report -1 if K stays unreachable.",
      },
    },
    {
      id: "adp-e03",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "쉬움",
      title: "1로 만들기",
      description: `정수 N에 다음 세 연산을 쓸 수 있다: ①3으로 나누기(3의 배수일 때) ②2로 나누기(2의 배수일 때) ③1 빼기. N을 **1로 만드는 최소 연산 횟수**를 출력하라.

DP: \`dp[i]\` = i를 1로 만드는 최소 횟수. \`dp[i] = min(dp[i-1], dp[i/2], dp[i/3]) + 1\` (가능한 것만).

출처: BOJ 1463 paraphrased`,
      constraints: "1 ≤ N ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> dp(n + 1, 0);
    // TODO: dp[i] = min(dp[i-1], (i%2==0? dp[i/2]), (i%3==0? dp[i/3])) + 1

    return 0;
}`,
      pyInitialCode: `n = int(input())
dp = [0] * (n + 1)
# TODO: dp[i] = min(dp[i-1], dp[i//2] if i%2==0, dp[i//3] if i%3==0) + 1`,
      testCases: [
        { stdin: "1", expectedOutput: "0", label: "이미 1" },
        { stdin: "3", expectedOutput: "1", label: "3→1" },
        { stdin: "10", expectedOutput: "3", label: "10→9→3→1" },
        { stdin: "2", expectedOutput: "1", label: "2→1" },
        { stdin: "6", expectedOutput: "2", label: "6→2→1 또는 6→3→1" },
      ],
      hints: [
        "dp[1] = 0.",
        "dp[i] 는 우선 dp[i-1]+1. 2의 배수면 dp[i/2]+1 과 비교, 3의 배수면 dp[i/3]+1 과 비교.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> dp(n + 1, 0);
    for (int i = 2; i <= n; i++) {
        int best = dp[i - 1] + 1;
        if (i % 2 == 0) best = min(best, dp[i / 2] + 1);
        if (i % 3 == 0) best = min(best, dp[i / 3] + 1);
        dp[i] = best;
    }
    cout << dp[n] << '\\n';
    return 0;
}`,
      pySolutionCode: `n = int(input())
dp = [0] * (n + 1)
for i in range(2, n + 1):
    best = dp[i - 1] + 1
    if i % 2 == 0:
        best = min(best, dp[i // 2] + 1)
    if i % 3 == 0:
        best = min(best, dp[i // 3] + 1)
    dp[i] = best
print(dp[n])`,
      solutionExplanation: "i를 1로 만드는 최소 횟수 dp[i]를 작은 수부터 채웁니다. 항상 -1(dp[i-1])은 가능하고, 2/3의 배수면 나누기 경우와 비교해 더 적은 쪽을 택해요.",
      en: {
        title: "Make It 1",
        description: `Given N, with operations: divide by 3 (if divisible), divide by 2 (if divisible), subtract 1. Print the **minimum operations to reach 1**. DP: \`dp[i] = min(dp[i-1], dp[i/2], dp[i/3]) + 1\` (valid moves only).`,
        constraints: "1 ≤ N ≤ 1,000,000",
        hints: ["dp[1]=0.", "dp[i]: start dp[i-1]+1; if divisible by 2/3 compare dp[i/2]+1, dp[i/3]+1."],
        solutionExplanation: "Fill dp[i] bottom-up: -1 always works; if divisible by 2 or 3 compare those moves and take the min.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 1. 계단 오르기 N 가지 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-001",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "보통",
      title: "계단 오르기 — 경우의 수",
      description: `N 칸의 계단이 있다. 한 번에 **1 칸 또는 2 칸** 을 오를 수 있을 때, 맨 꼭대기 (N 번째 칸) 에 도달하는 서로 다른 방법의 수를 출력하라.

DP 관점:
- \`dp[i]\` = i 번째 칸에 도달하는 방법의 수
- \`dp[1] = 1\` (1 칸 한 번)
- \`dp[2] = 2\` (1+1, 2)
- \`dp[i] = dp[i-1] + dp[i-2]\` (직전 1 칸 이전 + 2 칸 이전에서 한 발자국)

결과적으로 피보나치 수열과 같지만, **점화식이 어떻게 나오는지** 를 직접 그려보는 게 핵심.

출처: LeetCode 70 (Climbing Stairs) paraphrased`,
      constraints: "1 ≤ N ≤ 45 (int 범위 안전)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "N=1 → 1 가지" },
        { stdin: "2", expectedOutput: "2", label: "N=2 → (1+1), (2)" },
        { stdin: "3", expectedOutput: "3", label: "N=3 → 1+1+1, 1+2, 2+1" },
        { stdin: "4", expectedOutput: "5", label: "N=4 → 5 가지" },
        { stdin: "10", expectedOutput: "89", label: "N=10 → 89" },
        { stdin: "20", expectedOutput: "10946", label: "N=20" },
        { stdin: "45", expectedOutput: "1836311903", label: "N=45 — int 한계 근처" },
      ],
      hints: [
        "i 번째에 도달하려면 직전에 i-1 (1 칸 점프) 또는 i-2 (2 칸 점프) 에 있었어야 한다.",
        "그러므로 dp[i] = dp[i-1] + dp[i-2].",
        "dp[0]=1, dp[1]=1 로 두면 dp[2] = dp[1] + dp[0] = 2 로 일관된다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<long long> dp(max(n + 1, 2), 0);
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    cout << dp[n] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "1D DP 의 입문 — '직전 상태로부터 어떻게 도달했나' 를 그리면 dp[i] = dp[i-1] + dp[i-2] 가 자연스럽게 나온다. 피보나치와 동형이지만 의미가 다르다는 것이 포인트.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
dp = [0] * max(n + 1, 2)
dp[0] = 1
dp[1] = 1
for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]
print(dp[n])
`,
      en: {
        title: "Climbing Stairs",
        description: `An N-step staircase. You can climb **1 or 2 steps** at a time. Print the number of distinct ways to reach the top (step N).

DP view:
- \`dp[i]\` = number of ways to reach step i
- \`dp[1] = 1\`
- \`dp[2] = 2\` (1+1, 2)
- \`dp[i] = dp[i-1] + dp[i-2]\` (one step from i-1, or two steps from i-2)

Same numbers as Fibonacci — the point is **deriving the recurrence yourself**.

Source: LeetCode 70 (Climbing Stairs) paraphrased`,
        constraints: "1 ≤ N ≤ 45 (fits in int)",
        hints: [
          "To reach step i you must have been on step i-1 (jump 1) or step i-2 (jump 2).",
          "So dp[i] = dp[i-1] + dp[i-2].",
          "Setting dp[0]=1, dp[1]=1 makes dp[2] = 2 consistent.",
        ],
        solutionExplanation:
          "Entry-level 1D DP — drawing 'how could I have arrived here?' yields dp[i] = dp[i-1] + dp[i-2]. Same as Fibonacci but with a different meaning.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 피보나치 (Bottom-up) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-002",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "보통",
      title: "피보나치 (Bottom-up DP)",
      description: `정수 N 이 주어진다. 피보나치 수열의 N 번째 값 \`fib(N)\` 을 **반복문 기반 bottom-up DP** 로 계산해 출력하라.

정의: \`fib(0) = 0\`, \`fib(1) = 1\`, \`fib(n) = fib(n-1) + fib(n-2)\` (n ≥ 2).

이전 문제 (\`arec-011\`) 에서는 **top-down 메모이제이션** 으로 풀었다. 여기서는 같은 점화식을 **반복문** 으로 채워 가는 bottom-up 방식을 쓴다. 같은 시간 복잡도 O(N) 이지만, 스택을 안 쓰고 캐시 적중률이 좋다.

\`fib(90)\` 까지 long long 안전.

출처: BOJ 2747 paraphrased`,
      constraints: "0 ≤ N ≤ 90",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "0", expectedOutput: "0", label: "fib(0) = 0" },
        { stdin: "1", expectedOutput: "1", label: "fib(1) = 1" },
        { stdin: "2", expectedOutput: "1", label: "fib(2) = 1" },
        { stdin: "10", expectedOutput: "55", label: "fib(10) = 55" },
        { stdin: "30", expectedOutput: "832040", label: "fib(30)" },
        { stdin: "50", expectedOutput: "12586269025", label: "fib(50) — int 넘침, long long 필요" },
        { stdin: "90", expectedOutput: "2880067194370816120", label: "fib(90) — long long 한계 직전" },
      ],
      hints: [
        "dp[0] = 0, dp[1] = 1 로 초기화.",
        "for i = 2..N: dp[i] = dp[i-1] + dp[i-2].",
        "결과가 약 2.88 × 10^18 까지 가니 long long.",
        "메모리 아끼려면 두 변수만 갱신하는 O(1) 공간 버전도 가능.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<long long> dp(max(n + 1, 2), 0);
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    cout << dp[n] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "재귀 + 메모이제이션 (top-down) 과 반복문 + 배열 (bottom-up) 은 같은 DP 의 두 얼굴. 작은 입력부터 차곡차곡 채워 큰 입력의 답을 만든다. 스택 오버플로우 위험 없음.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
dp = [0] * max(n + 1, 2)
dp[0] = 0
dp[1] = 1
for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]
print(dp[n])
`,
      en: {
        title: "Fibonacci (Bottom-up DP)",
        description: `Given N, compute \`fib(N)\` using **iterative bottom-up DP**.

Definition: \`fib(0) = 0\`, \`fib(1) = 1\`, \`fib(n) = fib(n-1) + fib(n-2)\` (n ≥ 2).

The recursion + memoization version was in \`arec-011\`. Here we fill the same recurrence iteratively (bottom-up). Same O(N), but no recursion stack and friendlier cache behavior.

\`fib(90)\` fits in long long.

Source: BOJ 2747 paraphrased`,
        constraints: "0 ≤ N ≤ 90",
        hints: [
          "Initialize dp[0] = 0, dp[1] = 1.",
          "For i = 2..N: dp[i] = dp[i-1] + dp[i-2].",
          "Up to ~2.88 × 10^18 — long long required.",
          "You can also use only two rolling variables for O(1) space.",
        ],
        solutionExplanation:
          "Top-down (recursion + memo) and bottom-up (loop + array) are two faces of the same DP. Fill small inputs first, build up to N. No stack overflow risk.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. RGB 거리 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-003",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "보통",
      title: "RGB 거리 (3-state DP)",
      description: `N 채의 집이 일렬로 있다. 각 집을 빨강 (R) / 초록 (G) / 파랑 (B) 중 하나로 칠하는데, **이웃한 두 집의 색은 달라야 한다**. 집 i 를 색 c 로 칠하는 비용이 \`cost[i][c]\` 로 주어질 때, 전체 칠하기 비용의 **최솟값** 을 출력하라.

상태 설계:
- \`dp[i][R]\` = i 집까지 칠하고 i 가 R 일 때 최소 비용
- 마찬가지로 G, B
- 점화: \`dp[i][R] = cost[i][R] + min(dp[i-1][G], dp[i-1][B])\` (이웃이 R 이면 안 됨)
- 정답: \`min(dp[N-1][R], dp[N-1][G], dp[N-1][B])\`

DP 의 핵심 — **마지막 결정이 어떤 상태였느냐를 들고 다닌다**.

입력 형식:
- 첫 줄: N
- 다음 N 줄: 각 줄에 \`cost[i][R] cost[i][G] cost[i][B]\` (공백 구분)

출처: BOJ 1149 (RGB 거리)`,
      constraints: "2 ≤ N ≤ 1000, 1 ≤ cost ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3\n26 40 83\n49 60 57\n13 89 99",
          expectedOutput: "96",
          label: "BOJ 1149 기본 — 26 + 57 + 13 = 96",
        },
        { stdin: "2\n1 100 100\n100 1 100", expectedOutput: "2", label: "R 다음 G — 1+1 = 2" },
        { stdin: "2\n1 1 1\n1 1 1", expectedOutput: "2", label: "최솟값 1+1 = 2" },
        {
          stdin: "4\n5 8 7\n10 2 9\n6 4 3\n1 5 8",
          expectedOutput: "11",
          label: "5+2+3+1 → R,G,B,R = 11",
        },
        {
          stdin: "5\n10 10 10\n10 10 10\n10 10 10\n10 10 10\n10 10 10",
          expectedOutput: "50",
          label: "균일 비용 → 50",
        },
      ],
      hints: [
        "상태에 'i 집이 어떤 색이냐' 를 포함해야 다음 집의 색을 제한할 수 있다.",
        "dp[i][c] = cost[i][c] + min(dp[i-1][다른 두 색]).",
        "마지막에 dp[N-1][R/G/B] 중 최솟값이 답.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<vector<int>> cost(n, vector<int>(3));
    for (int i = 0; i < n; i++)
        for (int c = 0; c < 3; c++)
            cin >> cost[i][c];

    vector<vector<int>> dp(n, vector<int>(3, 0));
    for (int c = 0; c < 3; c++) dp[0][c] = cost[0][c];

    for (int i = 1; i < n; i++) {
        dp[i][0] = cost[i][0] + min(dp[i - 1][1], dp[i - 1][2]);
        dp[i][1] = cost[i][1] + min(dp[i - 1][0], dp[i - 1][2]);
        dp[i][2] = cost[i][2] + min(dp[i - 1][0], dp[i - 1][1]);
    }
    cout << min({dp[n - 1][0], dp[n - 1][1], dp[n - 1][2]}) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "전형적인 '마지막 상태를 들고 가는' DP. 색 제약 때문에 dp[i] 1 차원만으로는 부족 — 색깔 차원을 추가해서 dp[i][c] 로 본다. 점화식은 '나는 c, 직전은 c 가 아닌 다른 두 색 중 더 싼 것'.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
cost = [list(map(int, input().split())) for _ in range(n)]

dp = [[0] * 3 for _ in range(n)]
for c in range(3):
    dp[0][c] = cost[0][c]

for i in range(1, n):
    dp[i][0] = cost[i][0] + min(dp[i - 1][1], dp[i - 1][2])
    dp[i][1] = cost[i][1] + min(dp[i - 1][0], dp[i - 1][2])
    dp[i][2] = cost[i][2] + min(dp[i - 1][0], dp[i - 1][1])

print(min(dp[n - 1]))
`,
      en: {
        title: "RGB Distance (3-state DP)",
        description: `N houses in a row. Paint each Red/Green/Blue so that **adjacent houses have different colors**. Cost of painting house i with color c is \`cost[i][c]\`. Print the **minimum total cost**.

State design:
- \`dp[i][R]\` = min cost up to house i, ending with R
- Similarly for G, B
- Recurrence: \`dp[i][R] = cost[i][R] + min(dp[i-1][G], dp[i-1][B])\`
- Answer: \`min(dp[N-1][R], dp[N-1][G], dp[N-1][B])\`

DP key idea — **carry the last decision as part of the state**.

Input:
- Line 1: N
- Next N lines: \`cost[i][R] cost[i][G] cost[i][B]\` (space-separated)

Source: BOJ 1149 (RGB Distance)`,
        constraints: "2 ≤ N ≤ 1000, 1 ≤ cost ≤ 1000",
        hints: [
          "Include 'house i's color' in the state so you can constrain the next house.",
          "dp[i][c] = cost[i][c] + min(dp[i-1][other two colors]).",
          "Answer is the min over the last row's three colors.",
        ],
        solutionExplanation:
          "Classic 'carry the last state' DP. Color constraint kills a 1D dp[i] — add the color dimension. The recurrence: 'I'm color c, the previous house took whichever of the other two colors is cheaper.'",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 1로 만들기 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-004",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "보통",
      title: "1로 만들기 (BOJ 1463)",
      description: `정수 N 에 다음 세 연산 중 하나를 적용할 수 있다.
1. 3 으로 나누어 떨어지면 3 으로 나눈다.
2. 2 로 나누어 떨어지면 2 로 나눈다.
3. 1 을 뺀다.

N 을 1 로 만드는데 사용하는 연산 횟수의 **최솟값** 을 출력하라.

점화식:
- \`dp[1] = 0\`
- \`dp[n] = 1 + min( dp[n-1], dp[n/2] (n%2==0 일 때), dp[n/3] (n%3==0 일 때) )\`

그리디 (큰 나누기 우선) 는 안 됨 — 예: 10 은 10→9→3→1 (3 번) 이 10→5→4→2→1 (4 번) 보다 짧다. **DP 가 정답**.

출처: BOJ 1463 (1로 만들기)`,
      constraints: "1 ≤ N ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "0", label: "이미 1 — 연산 0 회" },
        { stdin: "2", expectedOutput: "1", label: "2 → 1" },
        { stdin: "3", expectedOutput: "1", label: "3 → 1" },
        { stdin: "10", expectedOutput: "3", label: "10 → 9 → 3 → 1" },
        { stdin: "6", expectedOutput: "2", label: "6 → 2 → 1 (또는 6 → 3 → 1)" },
        { stdin: "9", expectedOutput: "2", label: "9 → 3 → 1" },
        { stdin: "100", expectedOutput: "7", label: "BOJ 예시 — 100" },
        { stdin: "1000000", expectedOutput: "19", label: "최댓값 N=10^6" },
      ],
      hints: [
        "그리디 (3 으로 나눌 수 있으면 무조건 나누기) 는 틀린다. DP 로 모든 경우 비교.",
        "dp[i] = 1 + min(dp[i-1], dp[i/2] if i%2==0, dp[i/3] if i%3==0).",
        "1 부터 N 까지 채워 가는 bottom-up.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> dp(n + 1, 0);
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + 1;
        if (i % 2 == 0) dp[i] = min(dp[i], dp[i / 2] + 1);
        if (i % 3 == 0) dp[i] = min(dp[i], dp[i / 3] + 1);
    }
    cout << dp[n] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "그리디 함정 — '큰 나누기 먼저' 가 항상 옳지 않다. DP 가 세 선택을 모두 비교해서 진짜 최솟값을 보장한다. 1 부터 N 까지 한 번 훑으면 끝 — O(N).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
dp = [0] * (n + 1)
for i in range(2, n + 1):
    dp[i] = dp[i - 1] + 1
    if i % 2 == 0:
        dp[i] = min(dp[i], dp[i // 2] + 1)
    if i % 3 == 0:
        dp[i] = min(dp[i], dp[i // 3] + 1)
print(dp[n])
`,
      en: {
        title: "Make It 1 (BOJ 1463)",
        description: `Given N, you can apply any of:
1. If divisible by 3, divide by 3.
2. If divisible by 2, divide by 2.
3. Subtract 1.

Print the **minimum number of operations** to reduce N to 1.

Recurrence:
- \`dp[1] = 0\`
- \`dp[n] = 1 + min(dp[n-1], dp[n/2] if n%2==0, dp[n/3] if n%3==0)\`

Greedy ("divide by largest first") fails. Example: 10 → 9 → 3 → 1 (3 ops) beats 10 → 5 → 4 → 2 → 1 (4 ops). **DP wins.**

Source: BOJ 1463`,
        constraints: "1 ≤ N ≤ 1,000,000",
        hints: [
          "Greedy (always divide by 3 if possible) is WRONG. Compare all three operations via DP.",
          "dp[i] = 1 + min(dp[i-1], dp[i/2] if even, dp[i/3] if divisible by 3).",
          "Fill bottom-up from 1 to N.",
        ],
        solutionExplanation:
          "Greedy trap — 'biggest division first' isn't always optimal. DP compares all three choices and guarantees the true minimum. One pass 1..N, O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 정수 삼각형 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-005",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "보통",
      title: "정수 삼각형 (BOJ 1932)",
      description: `N 줄로 이루어진 정수 삼각형이 있다 (i 번째 줄에는 i 개의 수). 맨 위에서 출발해 한 칸 아래로 갈 때 **바로 아래** 또는 **오른쪽 아래** 로만 이동할 수 있다. 거쳐 간 수들의 합이 **최대** 가 되는 값을 출력하라.

상태 설계:
- \`dp[i][j]\` = (i, j) 칸까지 도달했을 때 합의 최댓값
- 점화식: \`dp[i][j] = tri[i][j] + max(dp[i-1][j-1], dp[i-1][j])\` (경계 처리 주의)
  - j == 0 → 위에서 직진 (\`dp[i-1][0]\`) 만 가능
  - j == i → 위에서 오른쪽 (\`dp[i-1][j-1]\`) 만 가능
- 정답: 마지막 줄에서 max.

입력 형식:
- 첫 줄: N
- 다음 N 줄: i 번째 줄에 i 개의 수.

출처: BOJ 1932 (정수 삼각형)`,
      constraints: "1 ≤ N ≤ 500, 0 ≤ 각 칸의 수 ≤ 9999",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5",
          expectedOutput: "30",
          label: "BOJ 1932 예시 — 7→3→8→7→5 = 30",
        },
        { stdin: "1\n10", expectedOutput: "10", label: "N=1 — 한 줄" },
        { stdin: "2\n1\n2 3", expectedOutput: "4", label: "1+3=4" },
        { stdin: "3\n1\n2 3\n4 5 6", expectedOutput: "10", label: "1+3+6=10" },
        { stdin: "3\n5\n1 2\n3 4 5", expectedOutput: "12", label: "5+2+5=12 (R→G→C max)" },
        {
          stdin: "4\n1\n9 9\n1 1 1\n9 9 9 9",
          expectedOutput: "20",
          label: "1+9+1+9=20",
        },
      ],
      hints: [
        "삼각형은 직사각형 2D 배열의 왼쪽 절반 — j 가 0..i 까지.",
        "(i, j) 칸의 위쪽 부모는 (i-1, j-1) (왼쪽 위) 와 (i-1, j) (바로 위).",
        "j==0 / j==i 경계에서는 부모가 하나뿐 — 인덱스 안전하게 처리.",
        "마지막 줄을 다 채운 후 그 줄에서 max 를 취하면 끝.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<vector<int>> tri(n);
    for (int i = 0; i < n; i++) {
        tri[i].assign(i + 1, 0);
        for (int j = 0; j <= i; j++) cin >> tri[i][j];
    }

    vector<vector<int>> dp(n);
    for (int i = 0; i < n; i++) dp[i].assign(i + 1, 0);
    dp[0][0] = tri[0][0];

    for (int i = 1; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            int best = 0;
            if (j > 0) best = max(best, dp[i - 1][j - 1]);
            if (j < i) best = max(best, dp[i - 1][j]);
            dp[i][j] = tri[i][j] + best;
        }
    }
    cout << *max_element(dp[n - 1].begin(), dp[n - 1].end()) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "2D DP 의 첫 만남 — 격자 위에서 '도착 가능한 부모는 두 곳' 패턴. 경계 (왼쪽 끝 / 오른쪽 끝) 에서 부모가 하나뿐임을 잊지 말 것. 마지막 줄에서 max 가 답.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
tri = []
for i in range(n):
    tri.append(list(map(int, input().split())))

dp = [[0] * (i + 1) for i in range(n)]
dp[0][0] = tri[0][0]

for i in range(1, n):
    for j in range(i + 1):
        best = 0
        if j > 0:
            best = max(best, dp[i - 1][j - 1])
        if j < i:
            best = max(best, dp[i - 1][j])
        dp[i][j] = tri[i][j] + best

print(max(dp[n - 1]))
`,
      en: {
        title: "Integer Triangle (BOJ 1932)",
        description: `An N-row integer triangle (row i has i numbers). Starting from the top, at each step move **directly below** or **diagonally right-below**. Print the **maximum sum** of numbers along the path.

State:
- \`dp[i][j]\` = max sum reaching (i, j)
- Recurrence: \`dp[i][j] = tri[i][j] + max(dp[i-1][j-1], dp[i-1][j])\` with boundary care
  - j == 0 → only \`dp[i-1][0]\`
  - j == i → only \`dp[i-1][j-1]\`
- Answer: max over the last row.

Input:
- Line 1: N
- Next N lines: row i contains i numbers.

Source: BOJ 1932`,
        constraints: "1 ≤ N ≤ 500, 0 ≤ each value ≤ 9999",
        hints: [
          "Treat the triangle as the left half of a rectangular 2D array (j ranges 0..i).",
          "Parents of (i,j) are (i-1, j-1) and (i-1, j).",
          "At boundaries j==0 / j==i, only one parent exists.",
          "After filling, take max over the last row.",
        ],
        solutionExplanation:
          "First encounter with 2D DP — 'two possible parents on a grid' pattern. Watch boundaries (leftmost / rightmost). Max over the last row is the answer.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 연속 부분합 최대 (Kadane, DP) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-006",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "보통",
      title: "연속 부분합 최대 (Kadane → DP)",
      description: `N 개의 정수 (음수 포함) 배열에서 **연속한 부분 배열** 의 합이 최대인 값을 출력하라. 부분 배열은 적어도 원소 1 개를 포함해야 한다.

DP 관점:
- \`dp[i]\` = i 번째에서 **끝나는** 연속 부분합의 최댓값
- 점화식: \`dp[i] = max(arr[i], dp[i-1] + arr[i])\` — "이어붙일지, 여기서 새로 시작할지"
- 정답: \`max(dp[0..N-1])\`

Kadane 알고리즘으로도 알려져 있다. **모두 음수인 경우** 도 단일 원소가 답이므로 dp[i] = arr[i] (혼자 시작) 가 가능해야 함.

출처: LeetCode 53 (Maximum Subarray) / Kadane 1984`,
      constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ 각 원소 ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "9\n-2 1 -3 4 -1 2 1 -5 4",
          expectedOutput: "6",
          label: "고전 — [4,-1,2,1] 합 6",
        },
        { stdin: "1\n5", expectedOutput: "5", label: "원소 1개" },
        { stdin: "1\n-7", expectedOutput: "-7", label: "음수 하나 — 그대로 답" },
        { stdin: "5\n-1 -2 -3 -4 -5", expectedOutput: "-1", label: "모두 음수 → 가장 큰 음수" },
        { stdin: "5\n1 2 3 4 5", expectedOutput: "15", label: "모두 양수 → 전체 합" },
        { stdin: "4\n-2 -1 -3 -4", expectedOutput: "-1", label: "모두 음수 — 최댓값 -1" },
        { stdin: "8\n5 -3 5 -3 5 -3 5 -3", expectedOutput: "11", label: "교대" },
      ],
      hints: [
        "각 위치 i 에서 '여기서 끝나는 최대 합' 만 유지하면 충분.",
        "이전 합이 음수면 끊고 새로 시작 — dp[i] = max(arr[i], dp[i-1] + arr[i]).",
        "전체 답은 dp 배열의 최댓값.",
        "변수 두 개 (cur, best) 만으로 O(1) 공간 가능.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    long long cur = arr[0];
    long long best = arr[0];
    for (int i = 1; i < n; i++) {
        cur = max((long long)arr[i], cur + arr[i]);
        best = max(best, cur);
    }
    cout << best << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Kadane 을 DP 로 다시 본다 — dp[i] = '여기서 끝나는' 최댓값. 이전 합이 도움이 되면 잇고 (cur + arr[i]) 아니면 끊는다 (arr[i]). 답은 모든 dp[i] 중 최댓값. 변수 두 개로 O(N) / O(1).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
arr = list(map(int, input().split()))

cur = arr[0]
best = arr[0]
for i in range(1, n):
    cur = max(arr[i], cur + arr[i])
    best = max(best, cur)
print(best)
`,
      en: {
        title: "Maximum Subarray (Kadane via DP)",
        description: `Given N integers (may include negatives), find the maximum sum of a **contiguous non-empty subarray**.

DP view:
- \`dp[i]\` = max contiguous sum **ending at** index i
- Recurrence: \`dp[i] = max(arr[i], dp[i-1] + arr[i])\` — "extend or restart here"
- Answer: \`max(dp[0..N-1])\`

Also known as Kadane's algorithm. **All-negative case**: a single element is the answer, so dp[i] = arr[i] (restart) must be allowed.

Source: LeetCode 53 / Kadane 1984`,
        constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ each element ≤ 10,000",
        hints: [
          "Only track 'best subarray ending here'.",
          "If the previous sum is negative, restart: dp[i] = max(arr[i], dp[i-1] + arr[i]).",
          "Answer is max over dp.",
          "Two variables (cur, best) suffice → O(1) space.",
        ],
        solutionExplanation:
          "Kadane through a DP lens — dp[i] = 'best ending here'. Extend if previous helps, otherwise restart. Answer = max over all dp[i]. O(N) / O(1) with two variables.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 0/1 Knapsack — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-007",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "어려움",
      title: "0/1 배낭 문제 (BOJ 12865)",
      description: `N 개의 물건이 있다. 물건 i 의 무게는 \`w[i]\`, 가치는 \`v[i]\` 이다. 최대 무게 W 까지 담을 수 있는 배낭에 물건을 (한 번씩만) 넣어 **가치의 합을 최대화** 하라. 그 최댓값을 출력하라.

상태:
- \`dp[i][j]\` = 처음 i 개 물건만 보고 무게 한도 j 일 때 최대 가치
- 점화식: 물건 i 를...
  - 안 넣음: \`dp[i][j] = dp[i-1][j]\`
  - 넣음 (단 \`j >= w[i]\`): \`dp[i-1][j - w[i]] + v[i]\`
  - 둘 중 최댓값
- 정답: \`dp[N][W]\`

1D 최적화: \`dp[j]\` 만 두고 **j 를 W → w[i] 역방향** 으로 갱신 (정방향이면 같은 물건 중복 사용).

입력 형식:
- 첫 줄: N W
- 다음 N 줄: \`w[i] v[i]\`

출처: BOJ 12865 (평범한 배낭)`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ W ≤ 100,000, 1 ≤ w[i], v[i] ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 7\n6 13\n4 8\n3 6\n5 12",
          expectedOutput: "14",
          label: "BOJ 12865 예시 — 4+3 (8+6) = 14",
        },
        { stdin: "1 5\n3 10", expectedOutput: "10", label: "물건 1 개, 무게 통과" },
        { stdin: "1 2\n3 10", expectedOutput: "0", label: "물건이 너무 무거움" },
        { stdin: "3 10\n5 10\n4 40\n6 30", expectedOutput: "70", label: "4+6 → 40+30 = 70" },
        { stdin: "2 5\n2 3\n3 4", expectedOutput: "7", label: "둘 다 담음 — 3+4 = 7" },
        {
          stdin: "5 10\n2 3\n3 4\n4 5\n5 6\n6 7",
          expectedOutput: "13",
          label: "2+3+5 (3+4+6) = 13",
        },
      ],
      hints: [
        "각 물건마다 '넣을까 / 말까' — 2 가지 결정 × N 개 = 지수 → DP 로 줄임.",
        "dp[i][j] = max(dp[i-1][j], dp[i-1][j - w[i]] + v[i]) (j >= w[i] 일 때).",
        "1D 최적화: j 루프를 W 부터 w[i] 까지 **거꾸로** — 같은 물건을 중복 사용하지 않으려면 역방향 필수.",
        "가치 합이 100 × 100000 = 10^7 — int 도 OK 지만 안전하게 long long.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, W;
    cin >> n >> W;
    vector<int> w(n + 1), v(n + 1);
    for (int i = 1; i <= n; i++) cin >> w[i] >> v[i];

    vector<long long> dp(W + 1, 0);
    for (int i = 1; i <= n; i++) {
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + (long long)v[i]);
        }
    }
    cout << dp[W] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "0/1 knapsack 의 정석 — 물건마다 '넣음 / 안 넣음' 을 선택해 dp[j] 를 갱신. 1D 로 줄일 때 j 를 **역방향** 으로 가는 게 핵심 — 정방향이면 같은 물건을 한 번 더 쓸 수 있게 됨 (그건 unbounded knapsack).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, W = map(int, input().split())
w = [0] * (n + 1)
v = [0] * (n + 1)
for i in range(1, n + 1):
    w[i], v[i] = map(int, input().split())

dp = [0] * (W + 1)
for i in range(1, n + 1):
    for j in range(W, w[i] - 1, -1):
        if dp[j - w[i]] + v[i] > dp[j]:
            dp[j] = dp[j - w[i]] + v[i]
print(dp[W])
`,
      en: {
        title: "0/1 Knapsack (BOJ 12865)",
        description: `N items. Item i has weight \`w[i]\` and value \`v[i]\`. With capacity W, choose items (each at most once) to **maximize total value**.

State:
- \`dp[i][j]\` = max value using only the first i items with weight limit j
- Recurrence: for item i, either
  - skip: \`dp[i][j] = dp[i-1][j]\`
  - take (if \`j >= w[i]\`): \`dp[i-1][j - w[i]] + v[i]\`
  - take the max
- Answer: \`dp[N][W]\`

1D optimization: keep only \`dp[j]\` and iterate **j from W down to w[i]** (forward iteration would reuse the same item).

Input:
- Line 1: N W
- Next N lines: \`w[i] v[i]\`

Source: BOJ 12865`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ W ≤ 100,000, 1 ≤ w[i], v[i] ≤ 100,000",
        hints: [
          "Each item is take/skip — 2^N would be exponential, DP collapses overlapping subproblems.",
          "dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i]).",
          "1D: iterate j from W down to w[i]. Reverse iteration prevents reusing the same item.",
          "Max value ~10^7 fits in int but long long is safer.",
        ],
        solutionExplanation:
          "Classic 0/1 knapsack — for each item, choose take or skip. The 1D trick: iterate j in **reverse** so an item isn't double-used (forward = unbounded knapsack).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. LIS O(N²) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-008",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "어려움",
      title: "최장 증가 부분수열 (LIS, O(N²))",
      description: `N 개의 정수 배열이 주어진다. 원소 순서를 유지하면서 **strictly increasing** (엄격히 증가) 하는 가장 긴 부분수열의 길이를 출력하라.

상태:
- \`dp[i]\` = i 번째 원소로 **끝나는** LIS 의 길이
- 점화식: \`dp[i] = 1 + max(dp[j] for j < i if arr[j] < arr[i])\` — 그런 j 가 없으면 \`dp[i] = 1\`
- 정답: \`max(dp[0..N-1])\`

시간 O(N²). 더 빠른 O(N log N) 풀이는 다음 단계.

예: [10, 20, 10, 30, 20, 50] → 길이 4 ([10, 20, 30, 50])

출처: BOJ 11053 / LeetCode 300 paraphrased`,
      constraints: "1 ≤ N ≤ 1000, -1,000,000 ≤ 각 원소 ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "6\n10 20 10 30 20 50",
          expectedOutput: "4",
          label: "BOJ 11053 예시 — [10,20,30,50]",
        },
        { stdin: "1\n5", expectedOutput: "1", label: "원소 1개" },
        { stdin: "5\n5 4 3 2 1", expectedOutput: "1", label: "감소하는 배열 — LIS = 1" },
        { stdin: "5\n1 2 3 4 5", expectedOutput: "5", label: "이미 증가 — 전체" },
        { stdin: "5\n2 2 2 2 2", expectedOutput: "1", label: "strict 이므로 1" },
        {
          stdin: "8\n1 3 2 4 3 5 4 6",
          expectedOutput: "5",
          label: "[1,2,3,4,6] 또는 [1,2,4,5,6]",
        },
        { stdin: "7\n3 1 4 1 5 9 2", expectedOutput: "4", label: "[1,4,5,9] 또는 [3,4,5,9]" },
      ],
      hints: [
        "i 번째 원소로 끝나는 LIS 만 별도로 생각. 모든 j < i 중 arr[j] < arr[i] 인 것의 dp[j] 최댓값 + 1.",
        "j 후보가 없으면 dp[i] = 1 (자기 자신만).",
        "최종 답은 max(dp) — '아무 위치에서 끝나는' 것 중 최댓값.",
        "이중 루프 → O(N²). N ≤ 1000 이면 충분.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    vector<int> dp(n, 1);
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    cout << *max_element(dp.begin(), dp.end()) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "LIS DP 의 기본형 — '끝나는 위치' 를 상태로 두면 자연스러운 점화식이 나온다. 모든 작은 j 를 훑어 자기보다 작은 값을 찾아 잇기. O(N²) 라 N 작을 때만 가능.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
arr = list(map(int, input().split()))

dp = [1] * n
for i in range(1, n):
    for j in range(i):
        if arr[j] < arr[i] and dp[j] + 1 > dp[i]:
            dp[i] = dp[j] + 1
print(max(dp))
`,
      en: {
        title: "Longest Increasing Subsequence (O(N²))",
        description: `Given N integers, find the length of the longest **strictly increasing** subsequence (keep order, drop elements).

State:
- \`dp[i]\` = length of LIS ending at index i
- Recurrence: \`dp[i] = 1 + max(dp[j] for j < i if arr[j] < arr[i])\`; if no such j, \`dp[i] = 1\`
- Answer: \`max(dp[0..N-1])\`

Time O(N²). The faster O(N log N) version is a follow-up.

Example: [10, 20, 10, 30, 20, 50] → length 4 ([10, 20, 30, 50])

Source: BOJ 11053 / LeetCode 300 paraphrased`,
        constraints: "1 ≤ N ≤ 1000, -10^6 ≤ each ≤ 10^6",
        hints: [
          "Think only of subsequences ending at i. Best dp[j] (j<i, arr[j]<arr[i]) + 1.",
          "If no such j, dp[i] = 1 (just the element itself).",
          "Final answer = max(dp) — best ending position overall.",
          "Double loop → O(N²), fine for N ≤ 1000.",
        ],
        solutionExplanation:
          "Canonical LIS DP — making 'where it ends' the state gives a natural recurrence. Scan smaller indices for a smaller value to chain onto. O(N²), so only for small N.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. LCS — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-009",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "어려움",
      title: "최장 공통 부분수열 (LCS, BOJ 9251)",
      description: `두 영문 대문자 문자열 \`s1\`, \`s2\` 가 주어진다. 두 문자열의 **공통 부분수열 (subsequence)** 중 가장 긴 것의 **길이** 를 출력하라.

부분수열: 원래 순서를 유지하며 일부 글자를 골라 만든 것 (연속일 필요 없음).

상태:
- \`dp[i][j]\` = \`s1[0..i-1]\` 과 \`s2[0..j-1]\` 의 LCS 길이
- 점화식:
  - \`s1[i-1] == s2[j-1]\` 면 \`dp[i][j] = dp[i-1][j-1] + 1\`
  - 아니면 \`dp[i][j] = max(dp[i-1][j], dp[i][j-1])\`
- 경계: \`dp[0][*] = dp[*][0] = 0\`
- 정답: \`dp[|s1|][|s2|]\`

예: ACAYKP, CAPCAK → 공통 LCS \`ACAK\` (길이 4)

출처: BOJ 9251 (LCS)`,
      constraints: "1 ≤ |s1|, |s2| ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "ACAYKP\nCAPCAK", expectedOutput: "4", label: "BOJ 9251 예시 — ACAK" },
        { stdin: "ABC\nDEF", expectedOutput: "0", label: "공통 글자 없음" },
        { stdin: "ABCDE\nABCDE", expectedOutput: "5", label: "동일 문자열" },
        { stdin: "A\nA", expectedOutput: "1", label: "길이 1 동일" },
        { stdin: "A\nB", expectedOutput: "0", label: "길이 1 다름" },
        { stdin: "AAAA\nAA", expectedOutput: "2", label: "한쪽이 짧음 — 한쪽 길이가 상한" },
        { stdin: "ABCBDAB\nBDCAB", expectedOutput: "4", label: "고전 예 — BCAB/BDAB" },
      ],
      hints: [
        "두 문자열의 끝 글자가 같으면 한 글자 매치 + 양쪽 끝 떼낸 부분 LCS — dp[i-1][j-1] + 1.",
        "다르면 한쪽을 떼낸 두 경우 중 더 긴 LCS — max(dp[i-1][j], dp[i][j-1]).",
        "dp 첫 행/열은 모두 0 (한쪽이 비면 공통 없음).",
        "메모리 O(N×M) — N, M ≤ 1000 이면 10^6 셀, 충분.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s1, s2;
    cin >> s1 >> s2;
    int n = s1.size(), m = s2.size();

    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    cout << dp[n][m] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "LCS 의 정석 2D DP — '두 문자열의 prefix 쌍' 을 상태로 두면 자연스럽다. 끝 글자가 같으면 그것을 LCS 에 포함시켜 둘 다 한 칸씩 떼낸 부분문제로, 다르면 한쪽을 떼낸 두 부분문제의 max. 시간/공간 O(N×M).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

s1 = input().strip()
s2 = input().strip()
n, m = len(s1), len(s2)

dp = [[0] * (m + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    for j in range(1, m + 1):
        if s1[i - 1] == s2[j - 1]:
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
print(dp[n][m])
`,
      en: {
        title: "Longest Common Subsequence (BOJ 9251)",
        description: `Given two uppercase strings \`s1\` and \`s2\`, print the **length of the LCS** (longest common subsequence).

A subsequence preserves original order; elements need not be contiguous.

State:
- \`dp[i][j]\` = LCS length of \`s1[0..i-1]\` and \`s2[0..j-1]\`
- Recurrence:
  - if \`s1[i-1] == s2[j-1]\` → \`dp[i][j] = dp[i-1][j-1] + 1\`
  - else → \`dp[i][j] = max(dp[i-1][j], dp[i][j-1])\`
- Boundary: \`dp[0][*] = dp[*][0] = 0\`
- Answer: \`dp[|s1|][|s2|]\`

Example: ACAYKP, CAPCAK → common LCS \`ACAK\` (length 4).

Source: BOJ 9251`,
        constraints: "1 ≤ |s1|, |s2| ≤ 1000",
        hints: [
          "If last chars match: dp[i-1][j-1] + 1.",
          "Else: max(dp[i-1][j], dp[i][j-1]).",
          "First row/col are 0 (one empty → no common).",
          "Memory O(N×M) ≤ 10^6 — fine.",
        ],
        solutionExplanation:
          "Canonical 2D LCS DP — states = (prefix length of s1, prefix length of s2). If last chars match, include them and recurse on both shortened; otherwise drop one side and take max. O(N×M) time/space.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 동전 1 (조합 DP) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-010",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "어려움",
      title: "동전 1 — 만드는 방법 수 (BOJ 2293)",
      description: `N 종류의 동전이 있다 (각 종류는 무한 개). 가치의 합이 K 원이 되도록 동전을 사용하는 **서로 다른 방법의 수** 를 출력하라. 동전의 사용 순서만 다른 것은 같은 경우로 본다 (즉, **조합**).

상태:
- \`dp[j]\` = 합이 j 가 되는 방법의 수
- 초기값: \`dp[0] = 1\` (아무것도 안 쓰는 한 가지).
- 동전 \`c\` 마다 \`for j = c..K\`: \`dp[j] += dp[j - c]\` — **정방향**.
  - 정방향이 핵심. 역방향이면 0/1 knapsack 처럼 동전을 한 번만 쓰는 의미가 됨.
  - 동전 루프를 바깥에 두는 게 핵심 — 순서가 다른 같은 조합을 한 번만 센다.

답이 \`2^31\` 까지 갈 수 있으니 **int 로 충분** (BOJ 보장). 안전하게 long long 도 OK.

입력 형식:
- 첫 줄: N K
- 다음 N 줄: 각 줄에 동전의 가치 한 개.

출처: BOJ 2293 (동전 1)`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ K ≤ 10,000, 1 ≤ 동전 가치 ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3 10\n1\n2\n5",
          expectedOutput: "10",
          label: "BOJ 2293 예시 — 10 원 만드는 방법 10 가지",
        },
        { stdin: "1 5\n1", expectedOutput: "1", label: "동전 1 종류만 — 한 가지" },
        { stdin: "1 5\n2", expectedOutput: "0", label: "2 원으로 5 원 불가" },
        { stdin: "2 4\n1\n2", expectedOutput: "3", label: "1+1+1+1, 1+1+2, 2+2" },
        { stdin: "2 5\n2\n3", expectedOutput: "1", label: "2+3 한 가지만" },
        { stdin: "3 5\n1\n2\n5", expectedOutput: "4", label: "5, 2+2+1, 2+1+1+1, 1×5 = 4" },
        { stdin: "3 7\n1\n2\n5", expectedOutput: "6", label: "직접 계산" },
      ],
      hints: [
        "**동전 루프가 바깥, 금액 루프가 안쪽** — 조합을 세려면 이 순서.",
        "j 루프는 **정방향** (c → K). 같은 동전을 여러 번 쓰는 것을 허용.",
        "dp[0] = 1 (0 원은 아무 동전도 안 쓰는 한 가지) — 시작점.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, K;
    cin >> n >> K;
    vector<int> coin(n);
    for (int i = 0; i < n; i++) cin >> coin[i];

    vector<long long> dp(K + 1, 0);
    dp[0] = 1;
    for (int i = 0; i < n; i++) {
        int c = coin[i];
        for (int j = c; j <= K; j++) {
            dp[j] += dp[j - c];
        }
    }
    cout << dp[K] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "조합 (순서 무시) 으로 세는 DP — **동전 바깥 / 금액 안쪽, 정방향 갱신**. 동전을 하나 추가할 때마다 그 동전을 쓰는 방법을 dp 에 더해간다. 동전을 안쪽에 두면 순열 (순서 있음) 이 되니 주의.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, K = map(int, input().split())
coins = [int(input()) for _ in range(n)]

dp = [0] * (K + 1)
dp[0] = 1
for c in coins:
    for j in range(c, K + 1):
        dp[j] += dp[j - c]
print(dp[K])
`,
      en: {
        title: "Coin Change — Count Ways (BOJ 2293)",
        description: `N coin denominations (infinite supply each). Count the **number of distinct ways** to make exactly K (order doesn't matter — combinations, not permutations).

State:
- \`dp[j]\` = number of ways to make j
- Init: \`dp[0] = 1\`
- For each coin \`c\`, iterate \`j = c..K\` forward: \`dp[j] += dp[j - c]\`.
  - **Forward** direction allows reusing the same coin (multi-use).
  - **Coin loop outside** ensures permutations of the same combo are counted once.

Answer fits in int per BOJ; long long is safer.

Input:
- Line 1: N K
- Next N lines: one coin value per line.

Source: BOJ 2293`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ K ≤ 10,000, 1 ≤ each coin ≤ 100,000",
        hints: [
          "**Coin loop outside, amount loop inside** — gives combinations.",
          "j loop **forward** (c → K) to allow reusing the same coin.",
          "dp[0] = 1 (one way to make 0 — use nothing).",
        ],
        solutionExplanation:
          "Combination-count DP — **coin loop outer, amount loop inner, forward update**. Adding a coin increases ways. Swap the loops and you'd count permutations.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 거스름 — 최소 동전 수 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-011",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "어려움",
      title: "거스름 — 최소 동전 수 (BOJ 2294)",
      description: `N 종류의 동전이 있다 (각 종류는 무한 개). 합이 K 원이 되도록 동전을 사용할 때, **사용한 동전 개수의 최솟값** 을 출력하라. 만들 수 없으면 \`-1\`.

상태:
- \`dp[j]\` = j 원을 만드는 최소 동전 수 (-1 또는 INF 로 '불가능' 표시)
- 초기값: \`dp[0] = 0\`. 나머지는 INF 로 표시.
- 동전 \`c\` 마다 \`for j = c..K\`: \`dp[j] = min(dp[j], dp[j - c] + 1)\`

그리디 (큰 동전 우선) 는 일반적으로 **틀린다** — 예: 동전 [1, 3, 4], K=6 → 그리디는 4+1+1=3 개, DP 는 3+3=2 개.

입력 형식:
- 첫 줄: N K
- 다음 N 줄: 각 줄에 동전의 가치 한 개.

출처: BOJ 2294 (동전 2)`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ K ≤ 10,000, 1 ≤ 동전 가치 ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3 15\n1\n5\n12",
          expectedOutput: "3",
          label: "BOJ 2294 예시 — 5+5+5 = 15, 3 개",
        },
        { stdin: "3 6\n1\n3\n4", expectedOutput: "2", label: "그리디 함정 — 3+3=6 (2 개), 4+1+1 (3 개) X" },
        { stdin: "1 5\n1", expectedOutput: "5", label: "1 원만 — 5 개" },
        { stdin: "1 5\n2", expectedOutput: "-1", label: "2 원으로 5 만들 수 없음" },
        { stdin: "2 7\n2\n5", expectedOutput: "2", label: "2+5 = 7, 2 개" },
        { stdin: "3 10\n1\n5\n10", expectedOutput: "1", label: "10 한 번이면 됨" },
        { stdin: "3 11\n2\n5\n6", expectedOutput: "2", label: "5+6 = 11, 2 개" },
      ],
      hints: [
        "dp[j] 를 INF (또는 큰 값) 로 초기화, dp[0] = 0.",
        "동전 c 마다 j = c..K 정방향: dp[j] = min(dp[j], dp[j - c] + 1).",
        "마지막에 dp[K] 가 여전히 INF 면 -1 출력.",
        "그리디는 일반 동전계에서 **실패** — 반드시 DP.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, K;
    cin >> n >> K;
    vector<int> coin(n);
    for (int i = 0; i < n; i++) cin >> coin[i];

    const int INF = 1e9;
    vector<int> dp(K + 1, INF);
    dp[0] = 0;
    for (int i = 0; i < n; i++) {
        int c = coin[i];
        for (int j = c; j <= K; j++) {
            if (dp[j - c] + 1 < dp[j]) {
                dp[j] = dp[j - c] + 1;
            }
        }
    }
    cout << (dp[K] == INF ? -1 : dp[K]) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "동전 1 과 점화식만 다르다 — '방법의 수' 대신 '최솟값'. INF 로 불가능을 표현하고 마지막에 -1 로 변환. 그리디가 실패하는 대표 예 (3,4 동전으로 6 만들기) 를 직접 시뮬해보면 DP 의 필요성이 명확.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, K = map(int, input().split())
coins = [int(input()) for _ in range(n)]

INF = 10**9
dp = [INF] * (K + 1)
dp[0] = 0
for c in coins:
    for j in range(c, K + 1):
        if dp[j - c] + 1 < dp[j]:
            dp[j] = dp[j - c] + 1
print(-1 if dp[K] == INF else dp[K])
`,
      en: {
        title: "Coin Change — Min Coins (BOJ 2294)",
        description: `N coin denominations (infinite supply each). Find the **minimum number of coins** to make exactly K. If impossible, print \`-1\`.

State:
- \`dp[j]\` = min coins to make j (INF means unreachable)
- Init: \`dp[0] = 0\`, others INF
- For each coin \`c\`, iterate \`j = c..K\`: \`dp[j] = min(dp[j], dp[j - c] + 1)\`

Greedy (always biggest coin) **fails in general** — e.g., coins [1, 3, 4], K=6 → greedy gives 4+1+1=3, DP gives 3+3=2.

Input:
- Line 1: N K
- Next N lines: coin values, one per line.

Source: BOJ 2294`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ K ≤ 10,000, 1 ≤ each coin ≤ 100,000",
        hints: [
          "Initialize dp[j] = INF, dp[0] = 0.",
          "For each coin c, j from c..K forward: dp[j] = min(dp[j], dp[j-c] + 1).",
          "If dp[K] is still INF, print -1.",
          "Greedy fails on arbitrary coin systems — DP required.",
        ],
        solutionExplanation:
          "Same shape as BOJ 2293, different recurrence — 'count' becomes 'min'. INF encodes infeasibility, converted to -1 at the end. The greedy-fails example (coins 3,4 for 6) sells the need for DP.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 격자 경로 수 (2D DP, 장애물 포함) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adp-012",
      cluster: "algo-dp-contest",
      unlockAfter: "algo-dp",
      difficulty: "어려움",
      title: "격자 경로 수 (장애물 포함, 2D DP)",
      description: `N × M 격자가 있다. 각 칸은 \`.\` (빈칸) 또는 \`#\` (장애물) 이다. 왼쪽 위 (0, 0) 에서 오른쪽 아래 (N-1, M-1) 까지 **오른쪽 또는 아래** 로만 한 칸씩 이동하면서 장애물 칸을 통과하지 않는 서로 다른 경로의 수를 출력하라. 시작/도착 칸도 \`.\` 이라고 가정한다.

상태:
- \`dp[r][c]\` = (0, 0) 에서 (r, c) 까지의 경로 수
- 점화식:
  - 장애물 (\`#\`): \`dp[r][c] = 0\`
  - 그 외: \`dp[r][c] = dp[r-1][c] + dp[r][c-1]\` (경계 처리 — 격자 밖은 0)
- 초기: \`dp[0][0] = 1\` (출발 칸 자체)
- 정답: \`dp[N-1][M-1]\`

이는 \`arec-012\` (재귀 + 메모이제이션) 의 bottom-up 버전 + 장애물.

답이 매우 클 수 있으므로 long long.

입력 형식:
- 첫 줄: N M
- 다음 N 줄: 길이 M 의 문자열 (각 줄에 \`.\` 와 \`#\` 만).

출처: LeetCode 63 (Unique Paths II) paraphrased`,
      constraints: "1 ≤ N, M ≤ 20",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1 1\n.", expectedOutput: "1", label: "1×1 — 출발 = 도착" },
        { stdin: "2 2\n..\n..", expectedOutput: "2", label: "2×2 장애물 없음" },
        { stdin: "3 3\n...\n...\n...", expectedOutput: "6", label: "3×3 장애물 없음 — C(4,2)=6" },
        {
          stdin: "3 3\n...\n.#.\n...",
          expectedOutput: "2",
          label: "중앙 장애물 — 위/오, 왼/아 두 경로",
        },
        { stdin: "2 2\n#.\n..", expectedOutput: "0", label: "출발 막힘 (관용)" },
        { stdin: "2 2\n.#\n..", expectedOutput: "1", label: "위쪽 막힘 — 한 경로" },
        {
          stdin: "3 3\n.#.\n...\n.#.",
          expectedOutput: "1",
          label: "복잡 — 직접 풀어보기",
        },
        {
          stdin: "20 20\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................",
          expectedOutput: "35345263800",
          label: "20×20 무장애물 — C(38,19)",
        },
      ],
      hints: [
        "dp[r][c] = (위에서 온 경로 수) + (왼쪽에서 온 경로 수). 격자 밖은 0.",
        "장애물 칸이면 dp[r][c] = 0 — 출발 (0,0) 자체가 장애물이면 답 0.",
        "long long 사용 — 20×20 답이 약 350 억까지.",
        "행을 위에서 아래로, 열을 왼쪽에서 오른쪽으로 (정방향) 두 번 루프.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<string> grid(n);
    for (int i = 0; i < n; i++) cin >> grid[i];

    vector<vector<long long>> dp(n, vector<long long>(m, 0));
    if (grid[0][0] == '.') dp[0][0] = 1;

    for (int r = 0; r < n; r++) {
        for (int c = 0; c < m; c++) {
            if (grid[r][c] == '#') { dp[r][c] = 0; continue; }
            if (r == 0 && c == 0) continue;
            long long up = (r > 0) ? dp[r - 1][c] : 0;
            long long left = (c > 0) ? dp[r][c - 1] : 0;
            dp[r][c] = up + left;
        }
    }
    cout << dp[n - 1][m - 1] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "2D bottom-up DP — '도착 가능한 부모는 위, 왼쪽 두 곳'. 장애물 칸은 즉시 0 으로 두어 다음 칸에 안 더해지게. 재귀 + 메모이제이션 (arec-012) 과 같은 점화식의 반복문 버전이다.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
grid = [input().strip() for _ in range(n)]

dp = [[0] * m for _ in range(n)]
if grid[0][0] == '.':
    dp[0][0] = 1

for r in range(n):
    for c in range(m):
        if grid[r][c] == '#':
            dp[r][c] = 0
            continue
        if r == 0 and c == 0:
            continue
        up = dp[r - 1][c] if r > 0 else 0
        left = dp[r][c - 1] if c > 0 else 0
        dp[r][c] = up + left

print(dp[n - 1][m - 1])
`,
      en: {
        title: "Grid Paths with Obstacles (2D DP)",
        description: `An N × M grid. Each cell is \`.\` (empty) or \`#\` (obstacle). Count paths from (0, 0) to (N-1, M-1) moving only **right or down**, avoiding obstacles. Assume start/end are \`.\`.

State:
- \`dp[r][c]\` = paths from (0,0) to (r,c)
- Recurrence:
  - obstacle (\`#\`): \`dp[r][c] = 0\`
  - else: \`dp[r][c] = dp[r-1][c] + dp[r][c-1]\` (off-grid → 0)
- Init: \`dp[0][0] = 1\`
- Answer: \`dp[N-1][M-1]\`

This is the bottom-up version of \`arec-012\` (recursion + memo) with obstacles added.

Answer can be large — use long long.

Input:
- Line 1: N M
- Next N lines: length-M string of \`.\` and \`#\`.

Source: LeetCode 63 (Unique Paths II) paraphrased`,
        constraints: "1 ≤ N, M ≤ 20",
        hints: [
          "dp[r][c] = paths from above + paths from left. Off-grid = 0.",
          "Obstacle cell → dp[r][c] = 0; if start itself is blocked, answer = 0.",
          "Use long long — 20×20 answer reaches ~35 billion.",
          "Two nested loops (rows top→down, cols left→right).",
        ],
        solutionExplanation:
          "2D bottom-up DP — parents are the cell above and to the left. Obstacles zero out so they don't propagate. Same recurrence as arec-012's recursive memoization, just iterative.",
      },
    },
  ],
}
