import type { PracticeCluster } from "./types"

export const arrayContestCluster: PracticeCluster = {
  id: "algo-array-contest",
  title: "배열 문제 풀이",
  emoji: "🏆",
  description: "기본 배열 넘어 — 두 포인터, 슬라이딩 윈도우, 부분 배열 패턴",
  unlockAfter: "algo-array",
  en: {
    title: "Array Practice",
    description: "Beyond basics — two-pointer, sliding window, subarray patterns",
  },
  problems: [
    // ═════════════════════════════════════════════════════════════════
    // 쉬움 입문 (on-ramp): 훑기 → 고정 윈도우 → 두 포인터
    // ═════════════════════════════════════════════════════════════════
    {
      id: "aarr-e01",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "쉬움",
      title: "최댓값과 최솟값",
      description: `N개의 정수가 주어진다. 그중 **가장 큰 값과 가장 작은 값**을 공백으로 구분해 출력하라.

배열을 한 번 훑으면서 두 변수를 갱신하는 가장 기본 패턴이다. 이게 모든 배열 문제의 출발점.`,
      constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ 각 정수 ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    // TODO: 첫 값으로 최대·최소를 초기화하고, 나머지를 훑으며 갱신하세요

    return 0;
}`,
      pyInitialCode: `n = int(input())
a = list(map(int, input().split()))
# TODO: 최댓값과 최솟값을 공백으로 출력`,
      testCases: [
        { stdin: "5\n3 1 4 1 5", expectedOutput: "5 1", label: "기본" },
        { stdin: "1\n7", expectedOutput: "7 7", label: "원소 1개" },
        { stdin: "3\n-1 -5 -3", expectedOutput: "-1 -5", label: "음수" },
        { stdin: "4\n2 2 2 2", expectedOutput: "2 2", label: "전부 같음" },
      ],
      hints: [
        "최댓값 mx, 최솟값 mn 을 첫 원소로 초기화.",
        "나머지 원소마다 mx = max(mx, x), mn = min(mn, x).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int mx = 0, mn = 0;
    for (int k = 0; k < n; k++) {
        int x; cin >> x;
        if (k == 0) { mx = mn = x; }
        else { mx = max(mx, x); mn = min(mn, x); }
    }
    cout << mx << ' ' << mn << '\\n';
    return 0;
}`,
      pySolutionCode: `n = int(input())
a = list(map(int, input().split()))
print(max(a), min(a))`,
      solutionExplanation: "배열을 한 번 훑으며 최댓값·최솟값 두 변수를 갱신합니다. 첫 원소로 초기화하는 걸 잊지 마세요.",
      en: {
        title: "Max and Min",
        description: `Given N integers, print the **largest and smallest** value, separated by a space. One pass updating two variables — the starting point for all array problems.`,
        constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ each integer ≤ 10,000",
        hints: ["Init mx, mn to the first element.", "For each other x: mx=max(mx,x), mn=min(mn,x)."],
        solutionExplanation: "One pass updating max and min, initialized to the first element.",
      },
    },
    {
      id: "aarr-e02",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "쉬움",
      title: "연속 K개의 최대 합",
      description: `N개의 정수와 K가 주어진다. **연속한 K개** 원소의 합 중 가장 큰 값을 출력하라.

매번 K개를 다시 더하면 느리다. 창(window)을 한 칸 옮길 때 **빠지는 값을 빼고 들어오는 값을 더하면** O(N)에 끝난다 — 이게 슬라이딩 윈도우의 첫걸음.`,
      constraints: "1 ≤ K ≤ N ≤ 100,000, -10,000 ≤ 각 정수 ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    // TODO: 처음 K개 합을 구한 뒤, 창을 옮기며 최댓값 갱신

    return 0;
}`,
      pyInitialCode: `import sys
d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
a = list(map(int, d[2:2+n]))
# TODO: 길이 K 창의 합 최댓값 출력`,
      testCases: [
        { stdin: "5 2\n1 2 3 4 5", expectedOutput: "9", label: "4+5" },
        { stdin: "5 1\n1 2 3 4 5", expectedOutput: "5", label: "K=1" },
        { stdin: "4 4\n1 2 3 4", expectedOutput: "10", label: "K=N" },
        { stdin: "5 2\n-1 -2 -3 -4 -5", expectedOutput: "-3", label: "음수 — 덜 음수인 창" },
      ],
      hints: [
        "먼저 처음 K개의 합 s 를 구해 best 로 둔다.",
        "i = K..N-1 에서 s += a[i] - a[i-K] 로 창을 옮기고 best 갱신.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    long long s = 0;
    for (int i = 0; i < k; i++) s += a[i];
    long long best = s;
    for (int i = k; i < n; i++) {
        s += a[i] - a[i - k];
        best = max(best, s);
    }
    cout << best << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
d = sys.stdin.read().split()
n, k = int(d[0]), int(d[1])
a = list(map(int, d[2:2+n]))
s = sum(a[:k])
best = s
for i in range(k, n):
    s += a[i] - a[i - k]
    best = max(best, s)
print(best)`,
      solutionExplanation: "처음 K개 합을 구한 뒤, 창을 한 칸 옮길 때마다 새로 들어온 값을 더하고 빠진 값을 빼서 O(N)에 모든 창의 합을 봅니다.",
      en: {
        title: "Max Sum of K in a Row",
        description: `Given N integers and K, print the largest sum of **K consecutive** elements. Don't re-add K every time — when the window slides, add the entering value and subtract the leaving one (O(N)). Your first sliding window.`,
        constraints: "1 ≤ K ≤ N ≤ 100,000, -10,000 ≤ each integer ≤ 10,000",
        hints: ["First sum the initial K elements as best.", "For i=K..N-1: s += a[i]-a[i-K], update best."],
        solutionExplanation: "Sum the first K, then slide: add the new element, drop the old one — all windows in O(N).",
      },
    },
    {
      id: "aarr-e03",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "쉬움",
      title: "합이 X인 두 수 (정렬된 배열)",
      description: `**오름차순으로 정렬된** N개의 정수와 목표값 X가 주어진다. 서로 다른 두 원소의 합이 X가 되는 쌍이 있으면 \`YES\`, 없으면 \`NO\` 를 출력하라.

정렬돼 있으니 **양 끝에서 두 포인터**로 좁혀가면 된다: 합이 크면 오른쪽을 당기고, 작으면 왼쪽을 민다.`,
      constraints: "2 ≤ N ≤ 100,000 (오름차순), -10,000 ≤ 각 정수 ≤ 10,000, |X| ≤ 20,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long x;
    cin >> n >> x;
    vector<long long> a(n);
    for (auto& v : a) cin >> v;
    int l = 0, r = n - 1;
    // TODO: 두 포인터로 합 == x 인 쌍이 있는지 찾기

    return 0;
}`,
      pyInitialCode: `import sys
d = sys.stdin.read().split()
n, x = int(d[0]), int(d[1])
a = list(map(int, d[2:2+n]))
l, r = 0, n - 1
# TODO: 두 포인터로 YES / NO 판정`,
      testCases: [
        { stdin: "5 9\n1 2 3 4 5", expectedOutput: "YES", label: "4+5=9" },
        { stdin: "5 100\n1 2 3 4 5", expectedOutput: "NO", label: "불가능" },
        { stdin: "3 4\n1 1 1", expectedOutput: "NO", label: "최대 합 2" },
        { stdin: "4 2\n1 1 2 3", expectedOutput: "YES", label: "1+1=2" },
        { stdin: "2 3\n1 2", expectedOutput: "YES", label: "두 원소" },
      ],
      hints: [
        "l=0, r=n-1 에서 시작. a[l]+a[r] 를 본다.",
        "합 == x 면 YES. 합 < x 면 l++, 합 > x 면 r--.",
        "l < r 인 동안 반복, 못 찾으면 NO.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long x;
    cin >> n >> x;
    vector<long long> a(n);
    for (auto& v : a) cin >> v;
    int l = 0, r = n - 1;
    bool ok = false;
    while (l < r) {
        long long s = a[l] + a[r];
        if (s == x) { ok = true; break; }
        else if (s < x) l++;
        else r--;
    }
    cout << (ok ? "YES" : "NO") << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
d = sys.stdin.read().split()
n, x = int(d[0]), int(d[1])
a = list(map(int, d[2:2+n]))
l, r = 0, n - 1
ok = False
while l < r:
    s = a[l] + a[r]
    if s == x:
        ok = True
        break
    elif s < x:
        l += 1
    else:
        r -= 1
print("YES" if ok else "NO")`,
      solutionExplanation: "정렬된 배열에서 양 끝 두 포인터로 좁혀갑니다. 합이 목표보다 작으면 왼쪽을 키우고, 크면 오른쪽을 줄여 O(N)에 판정해요.",
      en: {
        title: "Pair Summing to X (sorted)",
        description: `Given a **sorted** array of N integers and target X, print \`YES\` if two distinct elements sum to X, else \`NO\`. Use **two pointers** from both ends: if the sum is too big move right in, too small move left up.`,
        constraints: "2 ≤ N ≤ 100,000 (ascending), -10,000 ≤ each ≤ 10,000, |X| ≤ 20,000",
        hints: ["Start l=0, r=n-1; look at a[l]+a[r].", "==x → YES; <x → l++; >x → r--.", "Repeat while l<r, else NO."],
        solutionExplanation: "Two pointers from both ends on the sorted array: shrink from the side that overshoots — O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 1. 최대 연속 부분 배열 합 (Kadane) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-001",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "보통",
      title: "연속 부분 배열 최대 합 (Kadane)",
      description: `N개의 정수가 주어진다. **연속된** 부분 배열 중 합이 가장 큰 것을 찾아 그 합을 출력하라.

부분 배열은 최소 1개 원소를 가져야 한다 — 즉 빈 배열은 허용되지 않는다. 모든 값이 음수일 수도 있으니, 그때는 가장 큰 (덜 음수인) 원소 하나가 답이다.

출처: LeetCode 53 (Maximum Subarray) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ 각 정수 ≤ 10,000",
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
          label: "기본 — [4,-1,2,1] 합 6",
        },
        { stdin: "1\n5", expectedOutput: "5", label: "원소 1개" },
        { stdin: "5\n5 4 -1 7 8", expectedOutput: "23", label: "전체 합이 최대" },
        {
          stdin: "3\n-1 -2 -3",
          expectedOutput: "-1",
          label: "전부 음수 — 가장 큰 원소 하나",
        },
        { stdin: "4\n1 2 3 4", expectedOutput: "10", label: "전부 양수" },
        {
          stdin: "5\n-5 -2 -3 -1 -4",
          expectedOutput: "-1",
          label: "전부 음수 — 단일 원소 -1",
        },
      ],
      hints: [
        "각 위치 i 까지의 '여기서 끝나는 최대 부분 배열 합' 을 cur 라 하자.",
        "점화식: cur = max(a[i], cur + a[i]) — 지금 원소부터 새로 시작할지, 이어갈지.",
        "정답은 모든 i 에서의 cur 의 최댓값. 빈 배열 금지이므로 cur 의 초기값은 a[0].",
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
    long long cur = a[0], best = a[0];
    for (int i = 1; i < n; i++) {
        cur = max((long long)a[i], cur + a[i]);
        best = max(best, cur);
    }
    cout << best << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
cur = best = a[0]
for i in range(1, n):
    cur = max(a[i], cur + a[i])
    best = max(best, cur)
print(best)`,
      solutionExplanation:
        "Kadane 알고리즘. cur = max(a[i], cur + a[i]) — 이전 합이 음수면 버리고 새로 시작. 한 번 순회 O(N). 빈 배열 금지이므로 초기값을 0 이 아닌 a[0] 로 두는 게 핵심 (전부 음수일 때 0 을 답으로 내지 않도록).",
      en: {
        title: "Maximum Subarray Sum (Kadane)",
        description: `Given N integers, find the **contiguous** subarray with the largest sum and print that sum.

The subarray must have at least one element — empty subarrays are not allowed. If all values are negative, the answer is the largest (least negative) single element.

Source: LeetCode 53 (Maximum Subarray) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ each integer ≤ 10,000",
        hints: [
          "Let cur = the best subarray sum ending at position i.",
          "Recurrence: cur = max(a[i], cur + a[i]) — start fresh or extend.",
          "Answer is the max of cur over all positions. Initialize cur to a[0], not 0, since empty subarrays are forbidden.",
        ],
        solutionExplanation:
          "Kadane's algorithm. cur = max(a[i], cur + a[i]) — drop the prefix if it went negative. One pass O(N). Init to a[0] (not 0) so an all-negative array returns the largest element, not 0.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 두 수 합 = target — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-002",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "보통",
      title: "두 수 합 = target (정렬 + 두 포인터)",
      description: `N개의 정수와 target 이 주어진다. 합이 정확히 target 이 되는 **서로 다른 인덱스의 두 원소** 가 존재하면 두 값을 \`작은 값 큰 값\` 형식으로 출력하라. 없으면 \`NO\` 출력.

여러 쌍이 가능하면 **작은 값이 가장 작은** 쌍을 출력 (정렬 후 두 포인터로 처음 만나는 쌍).

출처: LeetCode 1 (Two Sum) paraphrased — 정렬판`,
      constraints: "1 ≤ N ≤ 100,000, -1,000,000,000 ≤ 각 정수, target ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 9\n2 7 11 15",
          expectedOutput: "2 7",
          label: "기본 — 2+7=9",
        },
        {
          stdin: "5 6\n1 2 3 4 5",
          expectedOutput: "1 5",
          label: "여러 쌍 가능 — 작은 값 작은 쌍 (1+5)",
        },
        { stdin: "3 10\n1 2 3", expectedOutput: "NO", label: "쌍 없음" },
        {
          stdin: "2 8\n4 4",
          expectedOutput: "4 4",
          label: "같은 값 두 번 — 서로 다른 인덱스",
        },
        {
          stdin: "5 0\n-3 -1 0 1 3",
          expectedOutput: "-3 3",
          label: "음수 포함",
        },
        { stdin: "1 5\n5", expectedOutput: "NO", label: "원소 1개 — 쌍 만들 수 없음" },
      ],
      hints: [
        "정렬한 뒤 양 끝에서 두 포인터 i, j (i<j) 로 시작.",
        "a[i] + a[j] 가 target 보다 작으면 i++, 크면 j--, 같으면 답.",
        "i 가 가장 작을 때 처음 매칭되는 쌍이 '작은 값 가장 작은' 쌍.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    long long target;
    cin >> n >> target;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sort(a.begin(), a.end());
    int i = 0, j = n - 1;
    while (i < j) {
        long long s = a[i] + a[j];
        if (s == target) {
            cout << a[i] << " " << a[j] << "\\n";
            return 0;
        } else if (s < target) i++;
        else j--;
    }
    cout << "NO\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, target = map(int, input().split())
a = sorted(map(int, input().split()))
i, j = 0, n - 1
found = False
while i < j:
    s = a[i] + a[j]
    if s == target:
        print(a[i], a[j])
        found = True
        break
    elif s < target:
        i += 1
    else:
        j -= 1
if not found:
    print("NO")`,
      solutionExplanation:
        "정렬 + 두 포인터. 합이 target 보다 작으면 작은 쪽을 키우고, 크면 큰 쪽을 줄인다. 정렬 상태에서 첫 매칭 = 작은 값이 가장 작은 쌍. 시간 O(N log N).",
      en: {
        title: "Two Sum = Target (Sort + Two-Pointer)",
        description: `Given N integers and target, find two values at **distinct indices** that sum to exactly target. Print them as \`small large\`. Print \`NO\` if none.

If multiple pairs are possible, print the one whose **smaller value is smallest** (the first match a sorted two-pointer scan finds).

Source: LeetCode 1 (Two Sum) paraphrased — sorted variant`,
        constraints: "1 ≤ N ≤ 100,000, -1,000,000,000 ≤ each integer, target ≤ 1,000,000,000",
        hints: [
          "Sort, then two pointers i, j (i<j) from both ends.",
          "If a[i] + a[j] < target → i++; if > → j--; if == → answer.",
          "Smallest matching i is the pair with the smallest small element.",
        ],
        solutionExplanation:
          "Sort + two-pointer. Move i right when sum too small, j left when too big. First match is the pair with smallest small element. O(N log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 최장 연속 증가 부분 배열 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-003",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "보통",
      title: "최장 연속 증가 부분 배열",
      description: `N개의 정수가 주어진다. **연속**되고 **순증가** (strictly increasing — a[i] < a[i+1]) 인 가장 긴 부분 배열의 **길이** 를 출력하라.

같은 값이 이어지면 증가가 끊긴다 — 즉 \`[2,2]\` 의 최장 길이는 1.

출처: LeetCode 674 (Longest Continuous Increasing Subsequence) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, -1,000,000,000 ≤ 각 정수 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n1 3 5 4 7",
          expectedOutput: "3",
          label: "기본 — [1,3,5] 길이 3",
        },
        { stdin: "5\n2 2 2 2 2", expectedOutput: "1", label: "전부 같음 — 길이 1" },
        { stdin: "5\n1 2 3 4 5", expectedOutput: "5", label: "전체 증가" },
        { stdin: "5\n5 4 3 2 1", expectedOutput: "1", label: "전체 감소 — 길이 1" },
        { stdin: "1\n42", expectedOutput: "1", label: "원소 1개" },
        {
          stdin: "7\n1 3 5 7 2 4 6",
          expectedOutput: "4",
          label: "끊김 — [1,3,5,7] 길이 4",
        },
      ],
      hints: [
        "현재 진행 중인 연속 증가 길이 cur 와 지금까지 최댓값 best 두 변수만으로 충분.",
        "a[i] > a[i-1] 이면 cur++, 아니면 cur = 1 (현재 원소부터 다시 시작).",
        "매번 best = max(best, cur) 갱신.",
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
    int cur = 1, best = 1;
    for (int i = 1; i < n; i++) {
        if (a[i] > a[i-1]) cur++;
        else cur = 1;
        best = max(best, cur);
    }
    cout << best << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
cur = best = 1
for i in range(1, n):
    if a[i] > a[i-1]:
        cur += 1
    else:
        cur = 1
    if cur > best:
        best = cur
print(best)`,
      solutionExplanation:
        "한 번 순회로 충분. 증가가 이어지면 cur 증가, 끊기면 1 로 리셋. best 는 cur 의 최댓값. 첫 원소는 자기 자신만으로 길이 1.",
      en: {
        title: "Longest Continuous Increasing Subarray",
        description: `Given N integers, print the length of the longest **contiguous** and **strictly increasing** subarray.

Equal consecutive values break the increasing run — so \`[2,2]\` has max length 1.

Source: LeetCode 674 paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, -1,000,000,000 ≤ each integer ≤ 1,000,000,000",
        hints: [
          "Track current run length cur and best seen so far.",
          "If a[i] > a[i-1] → cur++; else cur = 1 (restart from this element).",
          "Update best = max(best, cur) every step.",
        ],
        solutionExplanation:
          "Single-pass scan. Extend when increasing, reset to 1 when not. The first element alone counts as length 1.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 0 이동 (in-place) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-004",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "보통",
      title: "0 이동 (Move Zeroes)",
      description: `N개의 정수가 주어진다. 모든 **0 을 배열 끝으로 이동** 시키되, **0 이 아닌 원소들의 상대 순서** 는 그대로 유지. 결과 배열을 공백으로 구분해 한 줄에 출력하라.

추가 배열을 만들지 않고 풀 수 있어야 진짜 in-place 지만, 구현은 두 포인터로 깔끔하다.

출처: LeetCode 283 (Move Zeroes) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, -1,000,000,000 ≤ 각 정수 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n0 1 0 3 12",
          expectedOutput: "1 3 12 0 0",
          label: "기본",
        },
        { stdin: "1\n0", expectedOutput: "0", label: "0 하나" },
        { stdin: "3\n1 2 3", expectedOutput: "1 2 3", label: "0 없음" },
        { stdin: "4\n0 0 0 1", expectedOutput: "1 0 0 0", label: "0 가 앞에 몰림" },
        {
          stdin: "5\n1 0 2 0 3",
          expectedOutput: "1 2 3 0 0",
          label: "0 가 사이사이",
        },
        { stdin: "4\n0 0 0 0", expectedOutput: "0 0 0 0", label: "전부 0" },
      ],
      hints: [
        "write 포인터를 0 에서 시작. read 포인터로 배열을 순회.",
        "a[read] != 0 이면 a[write] = a[read] 후 write++.",
        "마지막에 write 부터 끝까지 0 으로 채우기.",
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
    int write = 0;
    for (int read = 0; read < n; read++) {
        if (a[read] != 0) {
            a[write++] = a[read];
        }
    }
    while (write < n) a[write++] = 0;
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << a[i];
    }
    cout << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
write = 0
for read in range(n):
    if a[read] != 0:
        a[write] = a[read]
        write += 1
while write < n:
    a[write] = 0
    write += 1
print(*a)`,
      solutionExplanation:
        "두 포인터 in-place 패턴. read 가 모든 원소를 훑고 0 이 아닌 것만 write 위치에 복사 후 write++. 끝나면 write 부터 N-1 까지 0 으로 채우면 끝. O(N), 추가 공간 O(1).",
      en: {
        title: "Move Zeroes (In-Place)",
        description: `Given N integers, **move all zeros to the end** while keeping the **relative order of non-zero elements**. Print the result on one line, space-separated.

A real in-place solution uses no extra array — two pointers do it cleanly.

Source: LeetCode 283 (Move Zeroes) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, -1,000,000,000 ≤ each integer ≤ 1,000,000,000",
        hints: [
          "Start a write pointer at 0; scan with a read pointer.",
          "If a[read] != 0, copy to a[write] and advance write.",
          "Finally, fill positions [write..n-1] with 0.",
        ],
        solutionExplanation:
          "Classic two-pointer in-place pattern. read scans, write keeps non-zeros packed at the front, then zero-fill the tail. O(N) time, O(1) extra space.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 배열 회전 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-005",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "보통",
      title: "배열 오른쪽 K칸 회전",
      description: `N개의 정수와 K가 주어진다. 배열을 **오른쪽으로 K칸 회전** 시킨 결과를 한 줄에 공백으로 구분해 출력하라.

오른쪽 회전: 끝의 원소가 앞으로 돌아온다. 예: \`[1,2,3,4,5]\` 를 2칸 회전 → \`[4,5,1,2,3]\`.

K 가 N 보다 크거나 0 일 수도 있다 — \`K = K mod N\` 으로 정규화하면 한 번에 처리.

**힌트**: 추가 배열 없이 **reverse 세 번** 으로 풀 수 있다 (in-place).

출처: LeetCode 189 (Rotate Array) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ K ≤ 1,000,000,000, -1,000,000,000 ≤ 각 정수 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "7 3\n1 2 3 4 5 6 7",
          expectedOutput: "5 6 7 1 2 3 4",
          label: "기본 — 오른쪽 3칸",
        },
        {
          stdin: "4 2\n-1 -100 3 99",
          expectedOutput: "3 99 -1 -100",
          label: "음수 포함",
        },
        { stdin: "1 5\n7", expectedOutput: "7", label: "원소 1개" },
        { stdin: "3 0\n1 2 3", expectedOutput: "1 2 3", label: "K=0" },
        {
          stdin: "3 3\n1 2 3",
          expectedOutput: "1 2 3",
          label: "K=N — 한 바퀴 = 그대로",
        },
        {
          stdin: "3 5\n1 2 3",
          expectedOutput: "2 3 1",
          label: "K>N — 5 mod 3 = 2",
        },
      ],
      hints: [
        "K = K mod N — N 의 배수만큼 회전은 효과 없음.",
        "Trick: 전체 reverse 한 번, 앞 K 개 reverse, 뒤 N-K 개 reverse → 오른쪽 K 칸 회전.",
        "또는 새 배열에 \`b[(i + k) % n] = a[i]\` 로 옮겨도 OK.",
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
    k %= n;
    reverse(a.begin(), a.end());
    reverse(a.begin(), a.begin() + k);
    reverse(a.begin() + k, a.end());
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << a[i];
    }
    cout << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
a = list(map(int, input().split()))
k %= n
a = a[-k:] + a[:-k] if k else a
print(*a)`,
      solutionExplanation:
        "Reverse 3 번 트릭: 전체 reverse → 앞 K 개 reverse → 뒤 N-K 개 reverse. K %= N 으로 큰 K 정규화 필수. 시간 O(N), 공간 O(1).",
      en: {
        title: "Rotate Array Right by K",
        description: `Given N integers and K, rotate the array **right by K positions** and print the result space-separated on one line.

Right rotation: tail elements wrap to the front. e.g. \`[1,2,3,4,5]\` rotated by 2 → \`[4,5,1,2,3]\`.

K may exceed N or be 0 — normalize via \`K = K mod N\`.

**Hint**: in-place is possible via **three reverses**.

Source: LeetCode 189 (Rotate Array) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ K ≤ 1,000,000,000, -1,000,000,000 ≤ each integer ≤ 1,000,000,000",
        hints: [
          "K = K mod N — multiples of N are no-ops.",
          "Trick: reverse the whole array, then the first K, then the last N-K → right rotation by K.",
          "Alternative: copy into a new array using b[(i + k) % n] = a[i].",
        ],
        solutionExplanation:
          "Three-reverse trick: reverse all, then the first K, then the last N-K. Must normalize K %= N first. O(N) time, O(1) extra space.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 다수 원소 (Boyer-Moore) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-006",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "보통",
      title: "다수 원소 (Boyer-Moore Vote)",
      description: `N개의 정수가 주어진다. 그 중 **N/2 보다 많이** 등장하는 값을 출력하라 (반드시 존재한다고 가정).

map 으로 빈도수를 세서 풀 수도 있지만, **Boyer-Moore 투표 알고리즘** 으로 풀면 시간 O(N), 공간 O(1) 로 끝난다.

투표 알고리즘:
- 후보 cand 와 카운트 cnt 를 유지.
- cnt == 0 이면 현재 원소를 새 cand 로.
- cand 와 같으면 cnt++, 다르면 cnt--.
- 다수 원소가 존재하면 마지막에 남는 cand 가 답.

출처: LeetCode 169 (Majority Element) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 다수 원소가 반드시 존재",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\n3 2 3", expectedOutput: "3", label: "기본" },
        {
          stdin: "7\n2 2 1 1 1 2 2",
          expectedOutput: "2",
          label: "1 도 많지만 2 가 다수",
        },
        { stdin: "1\n7", expectedOutput: "7", label: "원소 1개" },
        { stdin: "4\n5 5 5 5", expectedOutput: "5", label: "전부 같음" },
        {
          stdin: "5\n1 2 1 2 1",
          expectedOutput: "1",
          label: "1 이 3개로 > 5/2",
        },
        { stdin: "9\n6 5 5 6 6 6 5 6 6", expectedOutput: "6", label: "더 큰 케이스" },
      ],
      hints: [
        "다수 원소는 다른 모든 원소를 합한 것보다도 많다 — 1:1 상쇄해도 살아남는다.",
        "후보를 들고 가다가 같은 값 만나면 +1, 다른 값 만나면 -1. 0 되면 새 후보로 교체.",
        "다수 원소가 존재하는 한, 마지막 후보가 답.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    long long cand = 0;
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        if (cnt == 0) {
            cand = x;
            cnt = 1;
        } else if (x == cand) {
            cnt++;
        } else {
            cnt--;
        }
    }
    cout << cand << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
cand = 0
cnt = 0
for x in a:
    if cnt == 0:
        cand = x
        cnt = 1
    elif x == cand:
        cnt += 1
    else:
        cnt -= 1
print(cand)`,
      solutionExplanation:
        "Boyer-Moore 투표. 다수 원소는 절반보다 많으므로 다른 값과 1:1 상쇄해도 반드시 살아남는다. O(N) 시간, O(1) 공간. map 풀이도 가능하지만 메모리 오버헤드 큼.",
      en: {
        title: "Majority Element (Boyer-Moore Vote)",
        description: `Given N integers, print the value that appears **more than N/2 times** (guaranteed to exist).

A map of frequencies works, but **Boyer-Moore voting** runs in O(N) time and O(1) space.

Vote algorithm:
- Keep a candidate cand and counter cnt.
- If cnt == 0, set cand to the current element.
- If element == cand, increment cnt; else decrement cnt.
- The final cand is the majority (when one exists).

Source: LeetCode 169 paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, majority element guaranteed",
        hints: [
          "The majority outnumbers everything else combined — it survives even 1:1 cancellation.",
          "Increment on match, decrement on mismatch; reset candidate when counter hits 0.",
          "When a majority exists, the surviving candidate is the answer.",
        ],
        solutionExplanation:
          "Boyer-Moore voting. The majority outweighs everything else combined, so 1:1 cancellation leaves it standing. O(N) time, O(1) space — beats the map approach in both axes.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 부분 배열 합 = K — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-007",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "어려움",
      title: "부분 배열 합 = K (누적합 + 해시맵)",
      description: `N개의 정수와 정수 K 가 주어진다. **연속된** 부분 배열 중 합이 정확히 K 인 것이 **몇 개** 있는지 출력하라.

음수 원소가 있을 수 있으므로 단순 슬라이딩 윈도우로는 풀 수 없다. **누적합 + 해시맵** 패턴이 핵심.

핵심 아이디어: \`prefix[r] - prefix[l] == K\` 인 (l, r) 쌍의 개수가 답. 각 r 에서 prefix[l] = prefix[r] - K 인 l 의 개수를 map 으로 즉시 조회.

출처: LeetCode 560 (Subarray Sum Equals K) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, -1000 ≤ 각 정수 ≤ 1000, -1,000,000,000 ≤ K ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3 2\n1 1 1",
          expectedOutput: "2",
          label: "기본 — [1,1]@[0,1], [1,1]@[1,2]",
        },
        {
          stdin: "3 3\n1 2 3",
          expectedOutput: "2",
          label: "[1,2] 와 [3]",
        },
        { stdin: "1 0\n1", expectedOutput: "0", label: "합 0 인 부분 배열 없음" },
        {
          stdin: "3 0\n1 -1 0",
          expectedOutput: "3",
          label: "[1,-1], [1,-1,0], [0]",
        },
        {
          stdin: "8 7\n3 4 7 2 -3 1 4 2",
          expectedOutput: "4",
          label: "[3,4], [7], [7,2,-3,1], [1,4,2]",
        },
        { stdin: "3 6\n1 2 3", expectedOutput: "1", label: "[1,2,3] 전체" },
        {
          stdin: "3 0\n0 0 0",
          expectedOutput: "6",
          label: "0 만 — 부분 배열 6 개 (1짜리 3, 2짜리 2, 3짜리 1)",
        },
      ],
      hints: [
        "단순 두 중첩 루프 O(N²) 는 N=10만이면 시간 초과 위험. O(N) 풀이가 필요.",
        "누적합 prefix[i] 정의 후, 합이 K 인 부분 배열 [l..r] ⇔ prefix[r] - prefix[l-1] == K.",
        "각 r 마다 prefix[r] - K 가 이미 등장한 횟수를 map 에서 즉시 조회. 시작 전 prefix=0 을 1번 등장으로 넣어두기.",
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
    unordered_map<long long, long long> cnt;
    cnt[0] = 1; // 빈 prefix
    long long pref = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        pref += a[i];
        // prefix[l-1] = pref - k 인 l 의 개수
        auto it = cnt.find(pref - k);
        if (it != cnt.end()) ans += it->second;
        cnt[pref]++;
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
a = list(map(int, input().split()))
cnt = {0: 1}
pref = 0
ans = 0
for x in a:
    pref += x
    if pref - k in cnt:
        ans += cnt[pref - k]
    cnt[pref] = cnt.get(pref, 0) + 1
print(ans)`,
      solutionExplanation:
        "누적합 prefix + 해시맵 패턴. 합이 K 인 부분 배열 [l..r] ⇔ prefix[r] - prefix[l-1] = K. 오른쪽 끝 r 을 고정하고, 필요한 왼쪽 prefix 값을 map 으로 즉시 조회 O(1). 시작 시 cnt[0]=1 (빈 prefix) 가 핵심 — 시작점부터의 부분 배열도 카운트.",
      en: {
        title: "Subarray Sum = K (Prefix + Hashmap)",
        description: `Given N integers and K, count how many **contiguous** subarrays sum exactly to K.

Sliding window doesn't work because elements can be negative. The trick is **prefix sums + hashmap**.

Key insight: count pairs (l, r) with \`prefix[r] - prefix[l] == K\`. For each r, look up how many earlier prefix values equal \`prefix[r] - K\`.

Source: LeetCode 560 (Subarray Sum Equals K) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, -1000 ≤ each integer ≤ 1000, -1e9 ≤ K ≤ 1e9",
        hints: [
          "Brute O(N²) risks TLE for N=100k — aim for O(N).",
          "Define prefix sums. Subarray [l..r] has sum K iff prefix[r] - prefix[l-1] = K.",
          "For each r, look up count of (prefix[r] - K) in a hashmap. Seed cnt[0] = 1 for the empty prefix.",
        ],
        solutionExplanation:
          "Prefix sum + hashmap. Subarray [l..r] sums to K iff prefix[r] - prefix[l-1] = K. Fix r, look up the needed left prefix in O(1) average. Seeding cnt[0]=1 covers subarrays starting at index 0.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 가장 큰 물통 (Container With Most Water) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-008",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "어려움",
      title: "가장 큰 물통 (Container With Most Water)",
      description: `N개의 높이 \`h[0..N-1]\` 가 주어진다. 두 인덱스 i < j 를 골라 사이에 물을 채울 때, 담을 수 있는 물의 양은 \`min(h[i], h[j]) × (j - i)\` 다. 이 값의 **최댓값** 을 출력하라.

브루트포스 O(N²) 는 N=10만에 너무 느리다. **두 포인터** 로 O(N) 에 해결.

핵심 관찰: 양 끝에서 시작해, 더 **낮은** 쪽의 포인터를 안쪽으로 밀어야 답이 커질 가능성이 있다 (높은 쪽을 미는 건 너비만 줄어들고 min 은 그대로거나 감소).

출처: LeetCode 11 (Container With Most Water) paraphrased`,
      constraints: "2 ≤ N ≤ 100,000, 0 ≤ h[i] ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "9\n1 8 6 2 5 4 8 3 7",
          expectedOutput: "49",
          label: "기본 — i=1(8), j=8(7): min*7=49",
        },
        { stdin: "2\n1 1", expectedOutput: "1", label: "최소 케이스" },
        {
          stdin: "5\n4 3 2 1 4",
          expectedOutput: "16",
          label: "양 끝 — min(4,4)*4=16",
        },
        {
          stdin: "3\n1 2 1",
          expectedOutput: "2",
          label: "min(1,1)*2=2",
        },
        {
          stdin: "7\n2 3 4 5 18 17 6",
          expectedOutput: "17",
          label: "min(18,17)*1=17",
        },
        {
          stdin: "4\n1 2 4 3",
          expectedOutput: "4",
          label: "i=2(4), j=3(3): min*1=3? i=0(1),j=3(3):1*3=3, i=1(2),j=3(3):2*2=4 → 4",
        },
      ],
      hints: [
        "두 포인터 l=0, r=N-1 로 시작. 매번 면적 계산 후 최대값 갱신.",
        "더 낮은 쪽 포인터를 안쪽으로 한 칸 이동 — 그쪽이 bottleneck 이므로 이동해야 개선 가능.",
        "l < r 일 동안 반복. O(N).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    int l = 0, r = n - 1;
    long long best = 0;
    while (l < r) {
        long long area = (long long)min(h[l], h[r]) * (r - l);
        best = max(best, area);
        if (h[l] < h[r]) l++;
        else r--;
    }
    cout << best << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
h = list(map(int, input().split()))
l, r = 0, n - 1
best = 0
while l < r:
    area = min(h[l], h[r]) * (r - l)
    if area > best:
        best = area
    if h[l] < h[r]:
        l += 1
    else:
        r -= 1
print(best)`,
      solutionExplanation:
        "두 포인터 패턴. 낮은 쪽이 bottleneck 이므로 그쪽을 옮겨야 한다 — 높은 쪽을 옮기면 너비만 줄고 min 은 그대로거나 감소. 매 단계 O(1), 전체 O(N).",
      en: {
        title: "Container With Most Water",
        description: `Given N heights \`h[0..N-1]\`, choose two indices i < j. The water you can hold between them is \`min(h[i], h[j]) × (j - i)\`. Print the **maximum** value.

Brute O(N²) is too slow for N=100k. **Two pointers** gives O(N).

Key insight: starting from both ends, move the pointer at the **shorter** side inward — moving the taller side only shrinks width without raising the min.

Source: LeetCode 11 paraphrased`,
        constraints: "2 ≤ N ≤ 100,000, 0 ≤ h[i] ≤ 10,000",
        hints: [
          "Two pointers l=0, r=N-1. Compute area and update best each step.",
          "Move the lower side inward — it's the bottleneck, so only moving it can improve.",
          "Loop while l < r. O(N).",
        ],
        solutionExplanation:
          "Two-pointer pattern. The shorter side is the bottleneck, so moving the taller side can never increase min while losing width. Each step O(1), total O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 슬라이딩 윈도우 최대 합 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-009",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "어려움",
      title: "길이 K 부분 배열 최대 합 (슬라이딩 윈도우)",
      description: `N개의 정수와 K 가 주어진다. **정확히 길이 K** 인 연속 부분 배열들 중 합이 가장 큰 값을 출력하라.

브루트로 매 윈도우마다 합을 다시 계산하면 O(N·K) — N=10만, K=5만이면 답 안 나옴. **슬라이딩 윈도우** 로 O(N).

아이디어: 첫 윈도우 합을 구한 뒤, 한 칸 밀 때마다 **나가는 원소를 빼고 들어오는 원소를 더한다** — O(1) per step.

출처: LeetCode 643 (Maximum Average Subarray I) paraphrased — 평균 → 합`,
      constraints: "1 ≤ K ≤ N ≤ 100,000, -10,000 ≤ 각 정수 ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 3\n2 1 5 1 3",
          expectedOutput: "9",
          label: "기본 — [5,1,3]=9",
        },
        {
          stdin: "4 2\n1 2 3 4",
          expectedOutput: "7",
          label: "[3,4]=7",
        },
        { stdin: "1 1\n5", expectedOutput: "5", label: "N=K=1" },
        { stdin: "5 5\n1 2 3 4 5", expectedOutput: "15", label: "K=N — 전체 합" },
        {
          stdin: "6 3\n-1 -2 -3 -4 -5 -6",
          expectedOutput: "-6",
          label: "전부 음수 — [-1,-2,-3]=-6",
        },
        {
          stdin: "4 2\n-1 3 -1 3",
          expectedOutput: "2",
          label: "[-1,3], [3,-1], [-1,3] 모두 2",
        },
      ],
      hints: [
        "첫 K 개의 합 cur 을 미리 계산 후 best 에 저장.",
        "i = K 부터 N-1 까지: cur += a[i] - a[i-K]. best = max(best, cur).",
        "전체 O(N), 추가 공간 O(1).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    long long cur = 0;
    for (int i = 0; i < k; i++) cur += a[i];
    long long best = cur;
    for (int i = k; i < n; i++) {
        cur += a[i] - a[i - k];
        best = max(best, cur);
    }
    cout << best << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
a = list(map(int, input().split()))
cur = sum(a[:k])
best = cur
for i in range(k, n):
    cur += a[i] - a[i - k]
    if cur > best:
        best = cur
print(best)`,
      solutionExplanation:
        "고정 길이 슬라이딩 윈도우. 매 단계 나가는 원소만 빼고 들어오는 원소만 더해 합을 O(1) 로 갱신. 첫 윈도우 합을 미리 구하는 게 시작점. 전체 O(N).",
      en: {
        title: "Max Sum of Length-K Subarray (Sliding Window)",
        description: `Given N integers and K, find the maximum sum over all contiguous subarrays of **exactly length K**.

Recomputing each window from scratch is O(N·K) — too slow for N=100k, K=50k. Use a **sliding window** for O(N).

Idea: compute the first window sum, then on each step **subtract the leaving element and add the entering one** — O(1) per slide.

Source: LeetCode 643 paraphrased — sum instead of average`,
        constraints: "1 ≤ K ≤ N ≤ 100,000, -10,000 ≤ each integer ≤ 10,000",
        hints: [
          "Precompute the first window sum cur and seed best with it.",
          "For i from K to N-1: cur += a[i] - a[i-K]; best = max(best, cur).",
          "Total O(N), O(1) extra space.",
        ],
        solutionExplanation:
          "Fixed-size sliding window. Each step subtracts the outgoing element and adds the incoming one — O(1) per slide. Precompute the first window sum to seed. Total O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 다음 큰 수 (Monotonic Stack) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-010",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "어려움",
      title: "다음 큰 수 (Monotonic Stack)",
      description: `N개의 정수가 주어진다. 각 위치 i 마다 **오른쪽에서 처음 등장하는 더 큰 값** 을 찾아라. 없으면 -1.

결과를 입력 순서대로 한 줄에 공백으로 구분해 출력.

브루트 O(N²) 는 N=10만에 위태롭다. **단조 감소 스택** 으로 O(N).

핵심: 스택에 인덱스를 쌓아두되, 새 원소가 들어올 때 그보다 작은 스택 top 들을 모두 pop 하면서 그 답을 현재 원소로 채운다.

출처: LeetCode 496/503 simplified (Next Greater Element)`,
      constraints: "1 ≤ N ≤ 100,000, -1,000,000,000 ≤ 각 정수 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n2 1 2 4 3",
          expectedOutput: "4 2 4 -1 -1",
          label: "기본",
        },
        {
          stdin: "4\n1 2 3 4",
          expectedOutput: "2 3 4 -1",
          label: "전부 증가",
        },
        {
          stdin: "4\n4 3 2 1",
          expectedOutput: "-1 -1 -1 -1",
          label: "전부 감소 — 답 없음",
        },
        { stdin: "1\n5", expectedOutput: "-1", label: "원소 1개" },
        {
          stdin: "7\n2 7 3 5 4 6 8",
          expectedOutput: "7 8 5 6 6 8 -1",
          label: "복합 패턴",
        },
        {
          stdin: "3\n5 5 5",
          expectedOutput: "-1 -1 -1",
          label: "같은 값은 더 크지 않음 (strict)",
        },
      ],
      hints: [
        "왼쪽에서 오른쪽으로 순회. 스택에 '답을 아직 모르는 인덱스' 들을 쌓아둔다.",
        "새 원소 a[i] 가 스택 top 의 값보다 크면, top 을 pop 하고 그 답을 a[i] 로 결정. a[i] 가 더 이상 크지 않을 때까지 반복.",
        "끝까지 스택에 남은 인덱스들은 답이 -1.",
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
    vector<long long> ans(n, -1);
    stack<int> st; // 답을 아직 못 정한 인덱스들 (단조 감소)
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] < a[i]) {
            ans[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << ans[i];
    }
    cout << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
ans = [-1] * n
stack = []
for i in range(n):
    while stack and a[stack[-1]] < a[i]:
        ans[stack.pop()] = a[i]
    stack.append(i)
print(*ans)`,
      solutionExplanation:
        "단조 감소 스택 패턴. 스택에는 '아직 다음 큰 수를 못 찾은' 인덱스만 있고 값은 단조 감소. 새 원소가 들어올 때 자기보다 작은 top 들을 모두 처리하므로 각 원소는 정확히 1번 push, 1번 pop — 총 O(N).",
      en: {
        title: "Next Greater Element (Monotonic Stack)",
        description: `Given N integers, for each position i find the **first element to its right that is strictly greater**. Print -1 if none.

Output all answers space-separated in input order.

Brute O(N²) is risky for N=100k. **Monotonic decreasing stack** gives O(N).

Idea: keep indices in a stack. When a new element arrives, pop everything on top that is smaller and record the new element as their answer.

Source: LeetCode 496/503 simplified`,
        constraints: "1 ≤ N ≤ 100,000, -1,000,000,000 ≤ each integer ≤ 1,000,000,000",
        hints: [
          "Scan left-to-right. Stack holds 'indices whose answer we haven't found yet'.",
          "When a[i] > stack top's value, pop and set its answer to a[i]. Repeat while top is smaller.",
          "Anything left in the stack at the end gets -1.",
        ],
        solutionExplanation:
          "Monotonic decreasing stack. Each element is pushed and popped at most once, giving total O(N). 'Strictly greater' means equal values don't pop, so duplicates stay on the stack.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 빠진 수 찾기 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-011",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "어려움",
      title: "빠진 수 찾기 (0..N 중 하나 빠짐)",
      description: `0 부터 N 까지의 정수 중 **정확히 하나가 빠진** 배열 (즉 N 개의 서로 다른 정수가 있고, 빠진 값은 [0, N] 중 하나) 이 주어진다. 빠진 값을 출력하라.

정렬해서 찾는 건 O(N log N). 더 좋은 방법:

1. **수학 트릭**: 0+1+...+N = N(N+1)/2 에서 실제 합을 빼면 빠진 값. O(N), O(1).
2. **XOR 트릭**: 0^1^...^N ^ a[0]^a[1]^...^a[N-1] = 빠진 값. 오버플로우 걱정 없음.

출처: LeetCode 268 (Missing Number) paraphrased`,
      constraints: "1 ≤ N ≤ 1,000,000, 입력은 0..N 중 N 개의 서로 다른 정수",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3\n0 1 3",
          expectedOutput: "2",
          label: "범위 0..3 에서 2 빠짐",
        },
        { stdin: "2\n0 1", expectedOutput: "2", label: "끝 값 빠짐" },
        { stdin: "1\n0", expectedOutput: "1", label: "1 빠짐" },
        { stdin: "1\n1", expectedOutput: "0", label: "0 빠짐" },
        {
          stdin: "5\n3 0 1 2 5",
          expectedOutput: "4",
          label: "중간 값 빠짐",
        },
        {
          stdin: "4\n4 3 1 0",
          expectedOutput: "2",
          label: "순서 섞임",
        },
        {
          stdin: "8\n8 6 4 2 3 5 7 0",
          expectedOutput: "1",
          label: "큰 케이스 — 1 빠짐",
        },
      ],
      hints: [
        "0..N 합은 N(N+1)/2. 실제 합을 빼면 빠진 값 — O(N), O(1).",
        "또는 XOR: 0^1^...^N 과 모든 원소의 XOR 을 한 번에 묶어 XOR 하면 짝지어 사라지고 빠진 값만 남는다.",
        "N=10^6 이라면 합이 약 5×10^11 — long long 안전.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    long long expected = (long long)n * (n + 1) / 2;
    long long actual = 0;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        actual += x;
    }
    cout << (expected - actual) << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
expected = n * (n + 1) // 2
actual = sum(a)
print(expected - actual)`,
      solutionExplanation:
        "합 트릭: 0..N 의 합은 N(N+1)/2 (공식). 실제 합을 빼면 빠진 값 한 번에. O(N) 시간, O(1) 공간. N=10^6 이면 합이 약 5×10^11 이므로 long long 필요. XOR 풀이도 동일 시간/공간이며 오버플로우 걱정이 아예 없다.",
      en: {
        title: "Missing Number (One Missing in 0..N)",
        description: `Given N distinct integers from [0, N] (exactly one value is missing), print the missing value.

Sorting works in O(N log N). Better:

1. **Sum trick**: 0+1+…+N = N(N+1)/2. Subtract the actual sum. O(N), O(1).
2. **XOR trick**: 0^1^…^N ^ a[0]^…^a[N-1] cancels everything except the missing value — no overflow concern.

Source: LeetCode 268 (Missing Number) paraphrased`,
        constraints: "1 ≤ N ≤ 1,000,000, input is N distinct integers from [0..N]",
        hints: [
          "Sum of 0..N is N(N+1)/2. Subtract the actual sum — O(N), O(1).",
          "Or XOR: 0^1^…^N XOR all elements together — pairs cancel, missing value remains.",
          "For N up to 1e6 the expected sum reaches ~5×10^11 — use long long.",
        ],
        solutionExplanation:
          "Sum trick: 0..N sums to N(N+1)/2 by formula. Subtract the actual sum to get the missing value. O(N) time, O(1) space. Use long long since N up to 1e6 makes the sum ~5×10^11. The XOR variant has the same complexity and avoids overflow entirely.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 주식 사고팔기 (한 번 거래) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "aarr-012",
      cluster: "algo-array-contest",
      unlockAfter: "algo-array",
      difficulty: "어려움",
      title: "주식 사고팔기 — 한 번 거래로 최대 이익",
      description: `N일 간의 주식 종가 \`p[0..N-1]\` 이 주어진다. **하루에 한 번 사고, 그 이후 어느 하루에 한 번 팔아** 얻을 수 있는 최대 이익을 출력하라. 이익을 낼 수 없으면 0.

브루트 O(N²) 는 N=10만에 위태롭다. **러닝 최솟값** 으로 O(N).

핵심: 각 날 i 에 팔 때 최대 이익은 \`p[i] - (지금까지 본 최솟값)\`. 한 번 순회로 충분.

출처: LeetCode 121 (Best Time to Buy and Sell Stock) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ p[i] ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "6\n7 1 5 3 6 4",
          expectedOutput: "5",
          label: "기본 — 1 사서 6 팔기",
        },
        {
          stdin: "5\n7 6 4 3 1",
          expectedOutput: "0",
          label: "계속 내려감 — 이익 0",
        },
        { stdin: "1\n5", expectedOutput: "0", label: "1일 — 거래 불가" },
        { stdin: "2\n1 2", expectedOutput: "1", label: "최소 케이스" },
        {
          stdin: "5\n2 1 2 0 1",
          expectedOutput: "1",
          label: "0 사서 1 팔기",
        },
        { stdin: "4\n3 3 3 3", expectedOutput: "0", label: "전부 동일 — 이익 0" },
        {
          stdin: "3\n1 2 100",
          expectedOutput: "99",
          label: "큰 차이",
        },
      ],
      hints: [
        "팔기 전에 사야 한다 — buy day < sell day.",
        "각 i 에 대해 '지금까지 본 최솟값' 만 기억하면 그 i 에 팔았을 때 이익은 p[i] - minSoFar.",
        "한 번 순회하며 minSoFar 와 best 를 동시에 갱신.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<long long> p(n);
    for (int i = 0; i < n; i++) cin >> p[i];
    long long minSoFar = LLONG_MAX, best = 0;
    for (int i = 0; i < n; i++) {
        if (p[i] < minSoFar) minSoFar = p[i];
        else best = max(best, p[i] - minSoFar);
    }
    cout << best << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
p = list(map(int, input().split()))
min_so_far = float('inf')
best = 0
for x in p:
    if x < min_so_far:
        min_so_far = x
    elif x - min_so_far > best:
        best = x - min_so_far
print(best)`,
      solutionExplanation:
        "러닝 최솟값 패턴. 각 i 에 팔았을 때 최대 이익 = p[i] - (지금까지 본 최솟값). minSoFar 와 best 를 동시에 갱신하며 한 번 순회. 이익 불가능하면 best 는 초기값 0 유지. O(N) 시간, O(1) 공간.",
      en: {
        title: "Stock Buy and Sell (One Transaction)",
        description: `Given N daily prices \`p[0..N-1]\`, buy on one day and sell on a later day. Print the maximum profit. If no profit is possible, print 0.

Brute O(N²) is too slow for N=100k. **Running min** gives O(N).

Key idea: selling on day i, the best profit is \`p[i] - min(p[0..i])\`. One pass suffices.

Source: LeetCode 121 (Best Time to Buy and Sell Stock) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ p[i] ≤ 1,000,000,000",
        hints: [
          "Must buy before sell — buy day < sell day.",
          "Track the minimum price seen so far; at each day i the best sell profit is p[i] - minSoFar.",
          "Walk once, updating minSoFar and best.",
        ],
        solutionExplanation:
          "Running-min pattern. For each i, the best profit selling that day is p[i] - minSoFar. Update both in one pass. If no profit exists, best stays 0. O(N) time, O(1) space.",
      },
    },
  ],
}
