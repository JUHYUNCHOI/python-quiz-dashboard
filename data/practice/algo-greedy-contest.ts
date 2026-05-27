import type { PracticeCluster } from "./types"

export const greedyContestCluster: PracticeCluster = {
  id: "algo-greedy-contest",
  title: "그리디 문제 풀이",
  emoji: "💡",
  description: "활동 선택, 동전 거스름, 정렬 + 1-pass 패턴",
  unlockAfter: "algo-greedy",
  en: {
    title: "Greedy Practice",
    description: "Activity selection, coin change, sort + 1-pass",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. 동전 거스름 — 보통 (BOJ 11047)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-001",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "보통",
      title: "동전 거스름 (큰 단위부터)",
      description: `N 가지 동전이 있고, K 원을 거슬러 주려고 한다. 각 동전은 무한히 사용 가능. 사용한 **동전의 최소 개수** 를 출력하라.

입력 보장: 동전 값은 **오름차순** 으로 주어지며, 큰 동전은 작은 동전의 배수 — 그래서 **큰 단위부터 욕심껏** 채우는 그리디가 최적이다.

핵심: 가장 큰 동전부터 \`K // coin\` 개씩 쓰고 \`K %= coin\` 로 줄여나간다.

출처: BOJ 11047 paraphrased`,
      constraints: "1 ≤ N ≤ 10, 1 ≤ K ≤ 100,000,000, 동전 값은 오름차순 + 배수 관계",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "10 4200\n1\n5\n10\n50\n100\n500\n1000\n5000\n10000\n50000", expectedOutput: "6", label: "BOJ 1700 sample — 4200원 = 1000*4 + 100*2" },
        { stdin: "10 4790\n1\n5\n10\n50\n100\n500\n1000\n5000\n10000\n50000", expectedOutput: "12", label: "4790원" },
        { stdin: "3 30\n5\n10\n25", expectedOutput: "2", label: "25 + 5" },
        { stdin: "1 100\n1", expectedOutput: "100", label: "1원짜리만 — 100개" },
        { stdin: "2 7\n1\n5", expectedOutput: "3", label: "5 + 1 + 1" },
        { stdin: "4 1\n1\n2\n4\n8", expectedOutput: "1", label: "K=1 — 1원 1개" },
      ],
      hints: [
        "동전을 내림차순으로 정렬 (또는 입력이 오름차순이니 뒤에서부터 순회).",
        "각 동전마다 K // coin 개 사용, K %= coin.",
        "K 가 0 이 되면 끝. 큰 동전이 작은 동전의 배수라는 조건이 그리디 최적성을 보장.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    long long K;
    cin >> n >> K;
    vector<long long> coins(n);
    for (int i = 0; i < n; i++) cin >> coins[i];

    long long count = 0;
    for (int i = n - 1; i >= 0; i--) {
        count += K / coins[i];
        K %= coins[i];
    }
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation:
        "큰 단위부터 욕심껏 — 동전이 배수 관계라 큰 거 하나가 작은 거 여러 개보다 항상 이득. K //= coin, K %= coin 한 방에 처리.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
coins = [int(input()) for _ in range(n)]

count = 0
for c in reversed(coins):
    count += k // c
    k %= c
print(count)
`,
      en: {
        title: "Coin Change (Largest First)",
        description: `N coin denominations and K won to make change for. Coins are infinite. Print the **minimum number of coins** used.

Input guarantee: coin values are **ascending**, and each is a multiple of the previous — so the **greedy from largest** is optimal.

Idea: use the biggest coin you can, \`K // coin\` times, then \`K %= coin\`.

Source: BOJ 11047 paraphrased`,
        constraints: "1 ≤ N ≤ 10, 1 ≤ K ≤ 10^8, coins ascending and each is a multiple of the previous",
        hints: [
          "Iterate coins from largest to smallest.",
          "For each coin: count += K // coin; K %= coin.",
          "Stop when K = 0. The multiple-of-previous condition guarantees greedy optimality.",
        ],
        solutionExplanation:
          "Pure greedy — since each coin is a multiple of the previous, taking as many of the biggest as possible is always optimal. K //= coin, K %= coin and you're done.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 회의실 배정 — 보통 (BOJ 1931)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-002",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "보통",
      title: "회의실 배정 (끝 시간 정렬)",
      description: `한 회의실에 N 개의 회의가 신청되었다. 각 회의는 (시작, 끝) 시간을 갖는다. 서로 겹치지 않게 **최대로 많은 회의** 를 배정할 때, 그 개수를 출력하라.

같은 시각에 한 회의가 끝나고 다른 회의가 시작해도 OK (s == prev_end 허용).

핵심 그리디: **끝 시간이 빠른 회의부터** 정렬해서 차례대로 가능하면 잡는다. 끝 시간이 같으면 시작 시간이 빠른 것 먼저 (시작 == 끝 인 회의 처리용).

출처: BOJ 1931 paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ 시작 ≤ 끝 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "11\n1 4\n3 5\n0 6\n5 7\n3 8\n5 9\n6 10\n8 11\n8 12\n2 13\n12 14",
          expectedOutput: "4",
          label: "BOJ 1931 sample — (1,4)(5,7)(8,11)(12,14)",
        },
        { stdin: "1\n0 5", expectedOutput: "1", label: "회의 1개" },
        { stdin: "3\n0 5\n0 5\n0 5", expectedOutput: "1", label: "전부 겹침" },
        { stdin: "3\n0 1\n1 2\n2 3", expectedOutput: "3", label: "딱 맞닿음 OK" },
        { stdin: "4\n5 5\n3 5\n0 5\n5 10", expectedOutput: "3", label: "0-tick 회의 (5,5) 포함 — (0,5),(5,5),(5,10)" },
        { stdin: "5\n1 2\n2 3\n3 4\n4 5\n5 6", expectedOutput: "5", label: "체인 — 전부 가능" },
      ],
      hints: [
        "(시작, 끝) pair 의 벡터를 만들어 끝 오름차순으로 정렬. 끝 같으면 시작 오름차순.",
        "현재 시간 \`cur = 0\` (또는 충분히 작은 값) 두고, 시작 >= cur 이면 잡고 cur = 끝 으로 업데이트.",
        "끝 시간 정렬이 핵심 — 시작 정렬이나 길이 정렬은 반례 있음.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<pair<int,int>> v(n);  // (end, start) 로 저장 — 정렬 편의
    for (int i = 0; i < n; i++) cin >> v[i].second >> v[i].first;
    sort(v.begin(), v.end());

    int count = 0;
    int cur = 0;
    for (auto& [e, s] : v) {
        if (s >= cur) {
            count++;
            cur = e;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation:
        "끝 시간 정렬 그리디 — 가장 빨리 끝나는 회의를 잡으면 뒤에 더 많은 회의를 끼울 여지가 생긴다. 시작이 cur 이상이면 잡고 cur 갱신. O(N log N).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
meetings = [tuple(map(int, input().split())) for _ in range(n)]
meetings.sort(key=lambda x: (x[1], x[0]))  # 끝, 시작 오름차순

count = 0
cur = 0
for s, e in meetings:
    if s >= cur:
        count += 1
        cur = e
print(count)
`,
      en: {
        title: "Meeting Room Scheduling (Sort by End)",
        description: `N meetings are requested for one room, each with (start, end). Select the **maximum number** of non-overlapping meetings.

Touching at endpoints is allowed (s == prev_end is fine).

Key greedy: **sort by end time ascending**, then take each meeting if it starts at or after the current end. Break ties by start (handles zero-length meetings).

Source: BOJ 1931 paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ start ≤ end ≤ 10^9",
        hints: [
          "Sort meetings by end ascending (tie-break by start).",
          "Maintain \`cur\` (current free time). If start >= cur, take it and set cur = end.",
          "Sorting by start, or by length, fails — only by end is provably optimal.",
        ],
        solutionExplanation:
          "Earliest-finish-first greedy — picking the meeting that ends soonest leaves the most room afterward. Take if start ≥ cur, update cur. O(N log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. ATM 줄서기 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-003",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "보통",
      title: "ATM 줄서기 (짧은 일 먼저)",
      description: `N 명이 ATM 앞에 줄을 선다. \`i\` 번째 사람의 인출 시간이 \`t[i]\` 분이다. **각 사람의 대기 시간 합** (= 자기 차례까지 기다린 시간 + 자기 인출 시간) 의 **최솟값** 을 출력하라.

핵심 — **짧은 일 먼저 (SJF, Shortest Job First)**: 작은 \`t\` 가 앞에 오도록 정렬하면 그 인출 시간이 뒤 사람 모두의 대기 시간에 K 배 누적되는 효과가 작아진다.

\`t\` 를 오름차순 정렬 후, 각 사람의 대기 = (앞사람들의 누적합 + 자기 시간).

출처: BOJ 11399 paraphrased`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ t[i] ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n3 1 4 3 2", expectedOutput: "32", label: "BOJ 11399 sample — 정렬: 1,2,3,3,4 → 1+3+6+9+13 = 32" },
        { stdin: "1\n5", expectedOutput: "5", label: "혼자" },
        { stdin: "3\n1 1 1", expectedOutput: "6", label: "모두 동일 — 1+2+3" },
        { stdin: "4\n10 20 30 40", expectedOutput: "200", label: "이미 정렬 — 10+30+60+100" },
        { stdin: "2\n100 1", expectedOutput: "102", label: "1 먼저 → 1+101 = 102 (반대로면 100+101=201)" },
        { stdin: "5\n5 4 3 2 1", expectedOutput: "35", label: "역정렬 입력 — 1+3+6+10+15" },
      ],
      hints: [
        "t 오름차순 정렬.",
        "누적합 cum 을 유지하며 매번 cum += t[i], total += cum.",
        "직관: 가장 짧은 일을 맨 앞에 놓아야 뒤 사람들의 '기다리는 시간' 에 큰 값이 안 쌓인다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> t(n);
    for (int i = 0; i < n; i++) cin >> t[i];
    sort(t.begin(), t.end());

    long long cum = 0, total = 0;
    for (int x : t) {
        cum += x;
        total += cum;
    }
    cout << total << "\\n";
    return 0;
}`,
      solutionExplanation:
        "SJF 그리디 — 짧은 일을 먼저 처리하면 그 시간이 뒤 사람 모두에게 누적되는 양이 최소화. 정렬 후 단순 누적합 한 번이면 끝. O(N log N).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
t = sorted(map(int, input().split()))

cum = 0
total = 0
for x in t:
    cum += x
    total += cum
print(total)
`,
      en: {
        title: "ATM Queue (Shortest Job First)",
        description: `N people queue at one ATM. Person \`i\` needs \`t[i]\` minutes. Print the minimum total of **each person's wait time** (wait before turn + own time).

Key — **SJF (Shortest Job First)**: putting smaller \`t\` first reduces how much that time piles onto everyone behind.

Sort \`t\` ascending; person i's wait = (prefix sum up to i).

Source: BOJ 11399 paraphrased`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ t[i] ≤ 1000",
        hints: [
          "Sort t ascending.",
          "Walk the array maintaining a running cumulative sum; add it to the total each step.",
          "Intuition: putting the shortest job first prevents a big value from being counted many times.",
        ],
        solutionExplanation:
          "SJF greedy — shortest first minimizes how often each time is recounted in others' waits. Sort, prefix-sum, accumulate. O(N log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 잃어버린 괄호 — 보통 (BOJ 1541)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-004",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "보통",
      title: "잃어버린 괄호 (최소화)",
      description: `\`+\` 와 \`-\` 만 들어간 수식이 주어진다 (예: \`55-50+40\`). 적절히 괄호를 쳐서 **식의 값을 최소화** 한 결과를 출력하라.

핵심 통찰 — 그리디: 첫 \`-\` 가 나온 이후의 모든 수를 한 묶음으로 빼버리면 된다. 즉 \`A + B - (C + D + E + F) - (G + H) - ...\` 형태.

구현: 식을 \`-\` 로 split → 첫 토막은 그대로 더하고, 나머지 각 토막은 (그 안의 + 합) 만큼 빼면 끝.

출처: BOJ 1541 paraphrased`,
      constraints: "수식 길이 1 ≤ |s| ≤ 50, 각 수는 0 이상 99999 이하, \`+\` 와 \`-\` 만 사용",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "55-50+40", expectedOutput: "-35", label: "BOJ 1541 sample — 55-(50+40) = -35" },
        { stdin: "10+20+30+40", expectedOutput: "100", label: "마이너스 없음 — 그냥 합" },
        { stdin: "00009-00009", expectedOutput: "0", label: "선행 0 — atoi 로 처리" },
        { stdin: "100-40-30+20", expectedOutput: "10", label: "100-(40)-(30+20) = 10 — 각 - 이후 묶음" },
        { stdin: "5", expectedOutput: "5", label: "단일 수" },
        { stdin: "1+2+3-4+5+6-7+8+9", expectedOutput: "-33", label: "1+2+3-(4+5+6)-(7+8+9) = 6-15-24 = -33" },
      ],
      hints: [
        "문자열을 먼저 \`-\` 로 split.",
        "첫 토막: 안의 \`+\` 들을 모두 더한 게 시작값.",
        "나머지 토막: 각각 안의 \`+\` 합을 빼면 됨 — 묶음 안 큰 합을 한 번에 빼는 게 최소화.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long sumPlus(const string& s) {
    long long total = 0, cur = 0;
    for (char c : s) {
        if (c == '+') { total += cur; cur = 0; }
        else cur = cur * 10 + (c - '0');
    }
    return total + cur;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;

    long long result = 0;
    bool first = true;
    string cur;
    for (size_t i = 0; i <= s.size(); i++) {
        if (i == s.size() || s[i] == '-') {
            long long val = sumPlus(cur);
            if (first) { result = val; first = false; }
            else result -= val;
            cur.clear();
        } else {
            cur += s[i];
        }
    }
    cout << result << "\\n";
    return 0;
}`,
      solutionExplanation:
        "그리디 — 한 번 \`-\` 가 나오면 그 이후 전체를 괄호로 묶어 음수화하는 게 최선. \`-\` 로 split, 첫 토막은 더하고 나머지는 그 안의 합을 통째로 뺀다.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

s = input().strip()
parts = s.split('-')
# 각 part 는 + 로 더하면 됨
result = sum(int(x) for x in parts[0].split('+'))
for p in parts[1:]:
    result -= sum(int(x) for x in p.split('+'))
print(result)
`,
      en: {
        title: "Lost Parentheses (Minimize)",
        description: `An expression of \`+\` and \`-\` is given (e.g. \`55-50+40\`). Insert parentheses to **minimize** the value.

Greedy insight: once a \`-\` appears, group everything that follows under one parenthesis and subtract the whole block. So \`A + B - (C + D + ...) - (G + H) - ...\`.

Implementation: split on \`-\` → first chunk added as-is; remaining chunks each fully subtracted (sum of their \`+\`-separated numbers).

Source: BOJ 1541 paraphrased`,
        constraints: "1 ≤ |s| ≤ 50, each number 0..99999, only \`+\` and \`-\`",
        hints: [
          "Split the string on \`-\`.",
          "First chunk: add all its \`+\`-separated numbers.",
          "Each subsequent chunk: subtract its full sum — pulling a big block under one negative is what minimizes the value.",
        ],
        solutionExplanation:
          "Greedy — after the first \`-\`, parenthesize the entire rest to negate it. Split on \`-\`, add the first piece, subtract the sum of each later piece.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. K번째 큰 수 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-005",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "보통",
      title: "K번째 큰 수 (정렬 + 인덱싱)",
      description: `N 개의 정수와 정수 K 가 주어진다. **K번째로 큰 수** 를 출력하라 (1-indexed, 중복 허용).

핵심 — 그리디 정렬: 내림차순 정렬 후 \`a[K-1]\` 이 답. 더 복잡하게 풀려 들지 말 것 — 작은 입력은 정렬 한 번이면 끝.

(현실의 K-th 문제는 quickselect 로 O(N) 가능, 하지만 여기서는 정렬로 충분.)

출처: 원본 (정렬 그리디 입문)`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ N, -10^9 ≤ 각 원소 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "8 3\n3 1 4 1 5 9 2 6", expectedOutput: "5", label: "정렬 desc: 9,6,5,4,3,2,1,1 → 3번째 = 5" },
        { stdin: "5 1\n1 2 3 4 5", expectedOutput: "5", label: "K=1 — 최댓값" },
        { stdin: "5 5\n1 2 3 4 5", expectedOutput: "1", label: "K=N — 최솟값" },
        { stdin: "6 2\n7 7 7 7 7 7", expectedOutput: "7", label: "중복 허용 — 두 번째도 7" },
        { stdin: "3 2\n-5 -10 -1", expectedOutput: "-5", label: "음수 — desc: -1,-5,-10" },
        { stdin: "1 1\n42", expectedOutput: "42", label: "N=1, K=1" },
      ],
      hints: [
        "내림차순 정렬 → \`a[K-1]\` 이 답.",
        "또는 오름차순 정렬 → \`a[N-K]\`.",
        "음수까지 다루므로 int 면 충분, sort 의 비교 함수 한 줄.",
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
    sort(a.begin(), a.end(), greater<int>());
    cout << a[k - 1] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "정렬 + 인덱싱 — K 번째 큰 수는 내림차순 정렬 후 (K-1) 번 인덱스. 직관적이고 안전 (O(N log N)). nth_element 로 O(N) 도 가능하지만 학습용은 정렬이 명확.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
a = list(map(int, input().split()))
a.sort(reverse=True)
print(a[k - 1])
`,
      en: {
        title: "K-th Largest (Sort + Index)",
        description: `Given N integers and K, print the **K-th largest** value (1-indexed, duplicates allowed).

Greedy sort: sort descending and return \`a[K-1]\`. Don't overcomplicate — for these sizes a single sort is enough.

(In production you'd use quickselect for O(N), but sort is the safe lesson here.)

Source: original`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ N, -10^9 ≤ each element ≤ 10^9",
        hints: [
          "Sort descending and return \`a[K-1]\`.",
          "Or sort ascending and return \`a[N-K]\`.",
          "Negative values are allowed — int suffices.",
        ],
        solutionExplanation:
          "Sort + index — sort descending, take position K-1. Clear and safe at O(N log N). nth_element gives O(N) but sort is the cleaner lesson.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 캠핑 가져갈 짐 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-006",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "보통",
      title: "캠핑 짐 — 최대 개수",
      description: `캠핑 갈 가방의 무게 한도가 \`W\` 이고, N 개의 짐이 있다. 짐 \`i\` 의 무게는 \`w[i]\`. **개수를 최대로** 가져가려면 몇 개 가져갈 수 있는지 출력하라.

핵심 그리디: **가벼운 짐 먼저** 정렬해 가능한 만큼 채운다. 가치를 고려하지 않으니 "값어치 / 무게" 같은 비율 따위는 필요 없다 — 그저 작은 무게부터.

출처: 원본 (DP 가 아닌 단순 그리디 — 부분 합 구조에서 무게만 따짐)`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ W ≤ 1,000,000, 1 ≤ w[i] ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "6 10\n3 4 5 1 7 2", expectedOutput: "4", label: "정렬 1,2,3,4,5,7 → 1+2+3+4=10 → 4 개" },
        { stdin: "1 5\n5", expectedOutput: "1", label: "딱 맞음" },
        { stdin: "1 5\n6", expectedOutput: "0", label: "한도 초과 — 0 개" },
        { stdin: "3 0\n1 2 3", expectedOutput: "0", label: "W=0 — 못 가져감" },
        { stdin: "4 100\n10 20 30 40", expectedOutput: "4", label: "전부 가져감" },
        { stdin: "5 7\n2 2 2 2 2", expectedOutput: "3", label: "2+2+2=6 ≤ 7, 한 개 더는 초과" },
      ],
      hints: [
        "w 를 오름차순 정렬.",
        "앞에서부터 W 가 남아있으면 차감하고 카운트++, 모자라면 멈춤.",
        "개수를 최대화 = 작은 거 먼저. 짐 값어치 안 따짐 → DP 필요 없음.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, W;
    cin >> n >> W;
    vector<int> w(n);
    for (int i = 0; i < n; i++) cin >> w[i];
    sort(w.begin(), w.end());

    int count = 0;
    for (int x : w) {
        if (W >= x) { W -= x; count++; }
        else break;
    }
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation:
        "오름차순 정렬 후 가능한 만큼 차곡차곡 — 개수 최대화에서는 가벼운 것부터가 정답. 값이 끼면 DP/knapsack 이 되지만 무게만 따지면 그리디로 끝.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, W = map(int, input().split())
w = sorted(map(int, input().split()))

count = 0
for x in w:
    if W >= x:
        W -= x
        count += 1
    else:
        break
print(count)
`,
      en: {
        title: "Camping — Max Items",
        description: `Backpack capacity \`W\` and N items with weights \`w[i]\`. **Maximize the number of items** you can take. Print that count.

Greedy: take the **lightest items first**. Since only counts matter (no values), no DP needed.

Source: original (simple greedy — no knapsack)`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ W ≤ 10^6, 1 ≤ w[i] ≤ 100,000",
        hints: [
          "Sort w ascending.",
          "Take items in order while W ≥ current weight, decrementing W and counting.",
          "Maximizing count → smallest first. With values it'd be knapsack DP, but here greedy suffices.",
        ],
        solutionExplanation:
          "Ascending sort, fill greedily — for count-maximization, lightest-first is optimal. Values would require knapsack DP, but weight-only is straight greedy.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 회의실 2 (여러 회의실, BOJ 11000) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-007",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "어려움",
      title: "회의실 2 — 필요한 회의실 수 (heap)",
      description: `N 개의 회의 (시작, 끝) 를 모두 배정해야 한다. 회의가 겹치면 다른 회의실이 필요하다. **필요한 최소 회의실 수** 를 출력하라.

핵심 — 그리디 + 우선순위 큐:
1. 회의를 **시작 시간 오름차순** 으로 정렬.
2. min-heap 에 현재 진행 중인 회의들의 **끝 시간** 을 보관.
3. 새 회의의 시작 ≥ heap top (가장 빨리 끝나는 회의) 이면 그 방을 재사용 (pop). 아니면 새 방을 추가 (push 만).
4. 마지막에 \`heap.size()\` 가 답.

\`s == prev_end\` 는 OK (한 회의실 재사용 가능).

출처: BOJ 11000 paraphrased / LeetCode 253 Meeting Rooms II`,
      constraints: "1 ≤ N ≤ 200,000, 0 ≤ 시작 < 끝 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\n1 10\n2 7\n3 19", expectedOutput: "3", label: "전부 겹침 — 3 개 필요" },
        { stdin: "1\n5 10", expectedOutput: "1", label: "회의 1개" },
        { stdin: "4\n0 5\n5 10\n10 15\n15 20", expectedOutput: "1", label: "체인 — 1 개로 충분" },
        { stdin: "5\n1 10\n2 11\n3 12\n4 13\n5 14", expectedOutput: "5", label: "모두 겹침 — 5 개" },
        { stdin: "3\n0 30\n5 10\n15 20", expectedOutput: "2", label: "BOJ-style — (5,10)→(15,20) 재사용 + (0,30) 별도" },
        { stdin: "4\n1 5\n6 10\n2 7\n8 12", expectedOutput: "2", label: "정렬 후 (1,5)→(6,10), (2,7)→(8,12) 같은 방 2 개" },
      ],
      hints: [
        "회의를 (start, end) 로 저장 후 start 오름차순 정렬.",
        "\`priority_queue<int, vector<int>, greater<int>>\` (min-heap) 에 진행 중인 회의 끝 시간 저장.",
        "새 회의 처리: heap 비어있지 않고 top <= 시작 이면 pop (방 재사용), 그 후 push.",
        "답 = heap.size().",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<pair<int,int>> v(n);
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    sort(v.begin(), v.end());

    priority_queue<int, vector<int>, greater<int>> pq;  // min-heap of end times
    for (auto& [s, e] : v) {
        if (!pq.empty() && pq.top() <= s) pq.pop();
        pq.push(e);
    }
    cout << pq.size() << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Heap 으로 진행 중인 회의들을 추적 — 가장 빨리 끝나는 회의가 top. 새 회의 시작 시점에 top 회의가 끝나 있으면 그 방 재사용 (pop + push), 아니면 새 방 (push). 최종 heap 크기가 동시 진행 최대치 = 필요한 회의실 수. O(N log N).",
      pyInitialCode: `import sys
import heapq
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
meetings = [tuple(map(int, input().split())) for _ in range(n)]
meetings.sort()

heap = []
for s, e in meetings:
    if heap and heap[0] <= s:
        heapq.heappop(heap)
    heapq.heappush(heap, e)
print(len(heap))
`,
      en: {
        title: "Meeting Rooms II (Heap)",
        description: `Schedule **all** N meetings. Overlapping meetings need different rooms. Print the **minimum number of rooms** required.

Greedy + min-heap:
1. Sort by **start time ascending**.
2. Keep a min-heap of **end times** of currently running meetings.
3. For each meeting: if heap top ≤ new start, reuse that room (pop); always push the new end.
4. Final answer = \`heap.size()\`.

\`s == prev_end\` is OK (room reusable).

Source: BOJ 11000 / LeetCode 253`,
        constraints: "1 ≤ N ≤ 200,000, 0 ≤ start < end ≤ 10^9",
        hints: [
          "Sort meetings by start ascending.",
          "Use \`priority_queue<int, vector<int>, greater<int>>\` as min-heap of end times.",
          "Per meeting: pop if heap top ≤ start (room frees up), then push new end.",
          "Answer is the heap size.",
        ],
        solutionExplanation:
          "Heap tracks active meetings — top is the soonest-ending. Reuse that room when possible (pop) or open a new one (push). Heap size = peak concurrent meetings = rooms needed. O(N log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 단어 수학 (BOJ 1339 simplified) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-008",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "어려움",
      title: "단어 수학 (자리값 그리디)",
      description: `N 개의 단어 (대문자 알파벳만) 가 주어진다. 각 알파벳에 \`0..9\` 의 서로 다른 숫자를 배정해 단어들을 숫자로 읽었을 때 **그 합이 최대** 가 되도록 하라. 그 최대값을 출력하라 (서로 다른 알파벳은 서로 다른 숫자, 최대 10 종류 가정).

핵심 — 자리값 합산:
- 각 알파벳마다 등장한 모든 자리의 **place-value 합** (\`10^(len - 1 - position)\`) 을 계산.
- 그 place-value 가 큰 알파벳부터 9, 8, 7, ... 을 배정.
- 각 항을 합산.

예: \`["AB", "BA"]\`. A: \`10\` (in AB) + \`1\` (in BA) = 11. B: 11. 둘 다 11 → 9+8 = 17 → 11*9 + 11*8 = 187.

출처: BOJ 1339 paraphrased`,
      constraints: "1 ≤ N ≤ 10, 1 ≤ 단어 길이 ≤ 8, 서로 다른 알파벳 ≤ 10 종류",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\nA", expectedOutput: "9", label: "단일 알파벳 — A=9" },
        { stdin: "2\nAAA\nAAA", expectedOutput: "1998", label: "A 만 → place=222 → 222*9 = 1998" },
        { stdin: "2\nAB\nBA", expectedOutput: "187", label: "A=B=11 → 11*9 + 11*8 = 187" },
        { stdin: "1\nACDEB", expectedOutput: "98765", label: "5 자리 — A=9, ..., B=5" },
        { stdin: "2\nGCF\nACDEB", expectedOutput: "99437", label: "BOJ 1339 sample" },
        { stdin: "3\nA\nB\nC", expectedOutput: "24", label: "각각 9, 8, 7" },
      ],
      hints: [
        "\`place[알파벳] += 10^(len - 1 - position)\` 누적.",
        "place 값들 내림차순 정렬.",
        "큰 place 부터 digit = 9, 8, 7, ... 곱해서 합.",
        "10 개 이하로 가정되니 디지트 부족할 일 없음.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    map<char, long long> place;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        int len = (int)w.size();
        long long p = 1;
        for (int j = len - 1; j >= 0; j--) {
            place[w[j]] += p;
            p *= 10;
        }
    }

    vector<long long> vals;
    for (auto& [c, v] : place) vals.push_back(v);
    sort(vals.begin(), vals.end(), greater<long long>());

    long long total = 0;
    int digit = 9;
    for (long long v : vals) {
        total += v * digit;
        digit--;
    }
    cout << total << "\\n";
    return 0;
}`,
      solutionExplanation:
        "각 알파벳의 자리값을 누적 → 큰 자리값에 큰 숫자를 — 곱셈 합의 최대화는 정렬한 두 벡터의 같은 인덱스끼리 곱이 최대 (rearrangement inequality). 알파벳별 place 합 정렬 후 9, 8, 7, ... 차례로 배정.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
place = {}
for _ in range(n):
    w = input().strip()
    L = len(w)
    for i, c in enumerate(w):
        place[c] = place.get(c, 0) + 10 ** (L - 1 - i)

vals = sorted(place.values(), reverse=True)
total = 0
digit = 9
for v in vals:
    total += v * digit
    digit -= 1
print(total)
`,
      en: {
        title: "Word Math (Place-Value Greedy)",
        description: `Given N uppercase-only words, assign distinct digits \`0..9\` to the letters so the sum of the words read as numbers is **maximized**. Print that maximum (assume ≤ 10 distinct letters).

Greedy via place values:
- For each letter, sum the place values (\`10^(len-1-pos)\`) of every occurrence.
- Sort letters by total place value descending; assign 9, 8, 7, ...
- Sum each letter's (place × digit).

Example: \`["AB", "BA"]\` → A's place = 10+1 = 11, B's place = 1+10 = 11 → 11×9 + 11×8 = 187.

Source: BOJ 1339 paraphrased`,
        constraints: "1 ≤ N ≤ 10, word length ≤ 8, ≤ 10 distinct letters",
        hints: [
          "Accumulate \`place[letter] += 10^(len-1-pos)\`.",
          "Sort places descending.",
          "Multiply largest place by 9, next by 8, and so on; sum.",
          "≤ 10 distinct letters → digits never run out.",
        ],
        solutionExplanation:
          "Accumulate place value per letter, then pair largest place with largest digit (rearrangement inequality). Sort descending and assign 9, 8, 7, ... in order.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 멀티탭 스케줄링 (LRU-like, BOJ 1700) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-009",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "어려움",
      title: "멀티탭 스케줄링 (Belady)",
      description: `N 구짜리 멀티탭이 있고, K 번 사용 순서가 주어진다. 매 단계마다 그 전기용품이 이미 꽂혀 있으면 그대로 사용, 빈 구가 있으면 꽂아서 사용, 둘 다 아니면 **하나를 뽑고** 새로 꽂아야 한다. **뽑는 횟수의 최솟값** 을 출력하라.

핵심 — Belady's optimal: 뽑아야 할 때, **앞으로 가장 늦게 (또는 영원히) 다시 쓰이는 것** 을 뽑는다.

\`for i = 0 .. K-1:\`
- 이미 꽂혀 있으면 pass.
- 빈 구 있으면 그냥 꽂기 (스왑 0).
- 풀이면 미래 (i+1 부터) 를 봐 각 plugged 의 다음 사용 위치 비교 → 가장 멀거나 없는 걸 뽑기 → swap++.

출처: BOJ 1700 paraphrased (Belady cache replacement)`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ K ≤ 100, 전기용품 번호 1..100",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "2 7\n2 3 4 3 1 2 7", expectedOutput: "4", label: "Belady greedy — 매번 가장 늦게 쓰이는 거 뽑기" },
        { stdin: "2 4\n1 2 3 4", expectedOutput: "2", label: "1,2 채우고 3 꽂을 때 1 뽑기, 4 꽂을 때 2 뽑기" },
        { stdin: "3 4\n1 2 3 4", expectedOutput: "1", label: "3 구 멀티탭 — 4 꽂을 때 한 번만 뽑기" },
        { stdin: "1 3\n1 2 3", expectedOutput: "2", label: "1 구 — 매번 뽑기" },
        { stdin: "5 3\n1 2 3", expectedOutput: "0", label: "구가 충분 — 안 뽑음" },
        { stdin: "2 5\n1 2 1 2 1", expectedOutput: "0", label: "사용 중 같은 거만 — 첫 두 번만 꽂고 끝" },
      ],
      hints: [
        "현재 꽂혀 있는 것들을 \`vector<int>\` 또는 \`set<int>\` 로 관리.",
        "꽂혀 있으면 skip. 빈 구 있으면 추가만 (no swap).",
        "꽉 찼고 새 것이 안 꽂혀 있으면: 꽂힌 것들 각각 **다음 등장 위치** 를 미래에서 찾아 비교.",
        "다음 등장이 없는 것 → 즉시 뽑기. 있는 것끼리는 가장 늦게 등장하는 것 뽑기.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, K;
    cin >> N >> K;
    vector<int> seq(K);
    for (int i = 0; i < K; i++) cin >> seq[i];

    vector<int> plugged;
    int swaps = 0;
    for (int i = 0; i < K; i++) {
        int x = seq[i];
        // 이미 꽂혀있나?
        if (find(plugged.begin(), plugged.end(), x) != plugged.end()) continue;
        // 빈 구 있나?
        if ((int)plugged.size() < N) { plugged.push_back(x); continue; }
        // 누구를 뽑을지: 미래에 가장 늦게 (또는 없는 것)
        int victim = -1, victimIdx = -1;
        for (int p : plugged) {
            int nxt = -1;
            for (int j = i + 1; j < K; j++) if (seq[j] == p) { nxt = j; break; }
            if (nxt == -1) { victim = p; break; }    // 다시 안 쓰이면 즉시 결정
            if (nxt > victimIdx) { victimIdx = nxt; victim = p; }
        }
        plugged.erase(find(plugged.begin(), plugged.end(), victim));
        plugged.push_back(x);
        swaps++;
    }
    cout << swaps << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Belady (1966) optimal cache replacement — 미래를 들여다볼 수 있다면 가장 늦게 쓰이는 것을 뽑는 게 항상 최적이다. 작은 K (≤ 100) 라 매 단계 O(N·K) 로 미래 스캔해도 충분.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
seq = list(map(int, input().split()))

plugged = []
swaps = 0
for i, x in enumerate(seq):
    if x in plugged:
        continue
    if len(plugged) < n:
        plugged.append(x)
        continue
    # Belady: 미래에 가장 늦게 등장하는 (또는 안 나오는) 것 뽑기
    future = seq[i + 1:]
    victim = None
    victim_idx = -1
    for p in plugged:
        if p not in future:
            victim = p
            break
        idx = future.index(p)
        if idx > victim_idx:
            victim_idx = idx
            victim = p
    plugged.remove(victim)
    plugged.append(x)
    swaps += 1
print(swaps)
`,
      en: {
        title: "Multitap Scheduling (Belady)",
        description: `An N-hole multitap and a sequence of K usages. If the device is already plugged in, use as-is; if a hole is free, plug it; otherwise **unplug one** and plug the new device. Print the **minimum number of unplugs**.

Greedy — Belady's optimal: when forced to unplug, remove the device whose **next use is farthest in the future (or never)**.

For each step:
- Already plugged → skip.
- Empty hole → just plug (no swap).
- Full → scan currently-plugged devices, find each's next future occurrence; unplug the one farthest (or never).

Source: BOJ 1700 paraphrased (Belady cache replacement)`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ K ≤ 100, device IDs 1..100",
        hints: [
          "Track plugged devices in a vector or set.",
          "If already in: skip. If room: just plug.",
          "Else for each plugged device look forward for next occurrence.",
          "If never: evict immediately. Otherwise evict whichever has the latest next use.",
        ],
        solutionExplanation:
          "Belady's optimal cache replacement (1966) — with foresight, evicting the device used farthest in the future is always optimal. K ≤ 100 so O(K²·N) future-scan is fine.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 가장 작은 수 만들기 — 어려움 (LC 402)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-010",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "어려움",
      title: "K 개 지워 가장 작은 수 (stack 그리디)",
      description: `자연수 문자열 \`num\` 과 정수 K 가 주어진다. \`num\` 에서 정확히 K 개의 숫자를 **삭제** 해 만들 수 있는 **가장 작은 수** 를 출력하라 (선행 0 제거; 다 지우면 \`0\`).

핵심 — monotonic stack 그리디: 왼쪽에서 한 글자씩 보면서, "**이전 글자가 현재보다 크면** 그건 지워야 더 작은 수가 된다" — K 가 남아있는 한 스택에서 pop.

코드 골격:
\`\`\`
for d in num:
  while stack and k > 0 and stack[-1] > d:
    stack.pop(); k -= 1
  stack.push(d)
while k > 0: stack.pop(); k -= 1   // 못 다 지운 만큼 뒤에서 떼기
result = stack.lstrip('0')         // 선행 0 제거
return result or '0'
\`\`\`

출처: LeetCode 402 paraphrased`,
      constraints: "1 ≤ |num| ≤ 100,000, 0 ≤ K ≤ |num|, num 의 첫 글자 ≠ 0 (이지만 결과는 \`0\` 일 수 있음)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1432219\n3", expectedOutput: "1219", label: "LC 402 sample 1" },
        { stdin: "10200\n1", expectedOutput: "200", label: "LC 402 sample 2 — 선행 0 제거" },
        { stdin: "10\n2", expectedOutput: "0", label: "LC 402 sample 3 — 전부 지움" },
        { stdin: "12345\n2", expectedOutput: "123", label: "이미 오름차순 → 뒤 2개 떼기" },
        { stdin: "54321\n2", expectedOutput: "321", label: "내림차순 → 앞 2개 떼기" },
        { stdin: "9\n0", expectedOutput: "9", label: "K=0 — 그대로" },
        { stdin: "100\n1", expectedOutput: "0", label: "1 떼면 \"00\" → \"0\"" },
      ],
      hints: [
        "monotonic increasing stack — 새 글자가 스택 top 보다 작으면 (K 남았으면) top 을 pop.",
        "마지막에 K 가 남으면 스택 뒤에서 그만큼 떼기 (이미 단조증가 상태이니 뒤가 가장 큼).",
        "선행 0 처리: 앞에서 \"0\" 제거. 비어 있으면 \"0\" 반환.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string num;
    int k;
    cin >> num >> k;

    string stk;
    for (char d : num) {
        while (!stk.empty() && k > 0 && stk.back() > d) {
            stk.pop_back();
            k--;
        }
        stk.push_back(d);
    }
    while (k > 0 && !stk.empty()) { stk.pop_back(); k--; }

    // 선행 0 제거
    size_t start = 0;
    while (start < stk.size() && stk[start] == '0') start++;
    string result = stk.substr(start);
    if (result.empty()) result = "0";
    cout << result << "\\n";
    return 0;
}`,
      solutionExplanation:
        "단조 증가 스택 그리디 — 새 글자가 들어올 때 스택 top 이 더 크면 그건 결과에 두면 손해 (앞자리가 큰 게 더 큰 수). K 가 허락하는 한 pop. 다 못 떼면 뒤에서 마저, 선행 0 제거. O(N).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

num = input().strip()
k = int(input())

stk = []
for d in num:
    while stk and k > 0 and stk[-1] > d:
        stk.pop()
        k -= 1
    stk.append(d)
while k > 0 and stk:
    stk.pop()
    k -= 1

result = "".join(stk).lstrip("0")
print(result if result else "0")
`,
      en: {
        title: "Remove K Digits for Smallest (Stack Greedy)",
        description: `Given numeric string \`num\` and K, remove exactly K digits to produce the **smallest** number. Strip leading zeros; if all digits removed, print \`0\`.

Monotonic-stack greedy: scanning left to right, if the previous digit on the stack is **greater than the current**, it's worth discarding — while K > 0, pop.

\`\`\`
for d in num:
  while stack and k > 0 and stack[-1] > d:
    stack.pop(); k -= 1
  stack.push(d)
while k > 0: stack.pop(); k -= 1   // trim leftover K from the back
result = stack.lstrip('0')
return result or '0'
\`\`\`

Source: LeetCode 402 paraphrased`,
        constraints: "1 ≤ |num| ≤ 10^5, 0 ≤ K ≤ |num|",
        hints: [
          "Monotonic-increasing stack — pop the top when a smaller digit arrives (while K > 0).",
          "Leftover K? Trim from the back of the stack — it's already increasing so the tail is largest.",
          "Strip leading zeros; if empty, return \"0\".",
        ],
        solutionExplanation:
          "Monotonic stack greedy — a smaller incoming digit means the bigger top hurts the result (higher digit = bigger number). Pop while K allows. Trim leftover from the back, strip leading zeros. O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 활동 최대 — 가장 일찍 끝나는 것 정렬 (재방문) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-011",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "어려움",
      title: "활동 선택 재방문 (정렬 + 1-pass 증명)",
      description: `agre-002 와 비슷하지만 **다른 데이터 분포** 에서 끝 시간 정렬 그리디의 강력함을 다시 본다. 활동 N 개 (시작, 끝). 서로 겹치지 않게 **최대 개수** 선택. 단, 여기서는:

- 시작과 끝이 **같은 활동 (instant event)** 도 등장 — 한 점에서 활동.
- 시작 == 이전 끝 도 OK.
- 입력이 정렬되어 있지 않음.
- 활동 N 이 큰 (N ≤ 200,000) 경우에도 동작.

같은 알고리즘 (끝 시간 정렬 + 1-pass): \`s >= cur\` 이면 채택.

핵심 학습: 이 그리디가 왜 항상 최적인지 **교환 논증 (exchange argument)** 으로 직관 잡기.
- 어떤 최적해에서 첫 활동을 우리 그리디가 고른 (가장 일찍 끝나는) 활동으로 바꿔도 최적성 유지 → 귀납적으로 그리디 = 최적.

출처: 원본 (재방문)`,
      constraints: "1 ≤ N ≤ 200,000, 0 ≤ 시작 ≤ 끝 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "6\n1 3\n2 4\n3 5\n0 6\n5 7\n8 9", expectedOutput: "4", label: "(1,3)(3,5)(5,7)(8,9)" },
        { stdin: "5\n5 5\n3 3\n1 1\n2 2\n4 4", expectedOutput: "5", label: "모두 instant — 전부 가능 (정렬 시 1,2,3,4,5)" },
        { stdin: "3\n0 10\n0 10\n0 10", expectedOutput: "1", label: "전부 동일 — 1 개" },
        { stdin: "4\n0 1\n1 2\n2 3\n3 4", expectedOutput: "4", label: "체인 — 전부 가능" },
        { stdin: "5\n0 100\n0 1\n1 2\n2 3\n3 4", expectedOutput: "4", label: "(0,100) 무시하고 짧은 4 개" },
        { stdin: "1\n42 42", expectedOutput: "1", label: "단일 instant" },
      ],
      hints: [
        "끝 시간 오름차순 정렬. 끝 동률이면 시작 오름차순 (instant 안전 처리).",
        "cur 을 충분히 작은 값으로 초기화. s >= cur 이면 채택, cur = e.",
        "교환 논증: 가장 일찍 끝나는 활동을 항상 골라도 손해 없음 — 시간이 더 많이 남으니까.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<pair<long long,long long>> v(n);  // (end, start)
    for (int i = 0; i < n; i++) cin >> v[i].second >> v[i].first;
    sort(v.begin(), v.end());

    int count = 0;
    long long cur = LLONG_MIN;
    for (auto& [e, s] : v) {
        if (s >= cur) {
            count++;
            cur = e;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation:
        "끝 시간 정렬 + 1-pass — agre-002 와 같은 알고리즘이지만 데이터 분포 (instant, 큰 N) 가 다르다. \`cur\` 초기값을 음의 무한대로 두면 (0,0) 같은 활동도 안전. 교환 논증으로 최적성 증명됨.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
v = [tuple(map(int, input().split())) for _ in range(n)]
v.sort(key=lambda x: (x[1], x[0]))

count = 0
cur = -10**18
for s, e in v:
    if s >= cur:
        count += 1
        cur = e
print(count)
`,
      en: {
        title: "Activity Selection Revisited (Earliest-Finish Sort)",
        description: `Same algorithm as agre-002 (sort by end + 1-pass), but tested with **harder distributions**: instant events (start == end), unsorted input, larger N (up to 200,000), touching endpoints, etc.

Key learning: see *why* earliest-finish-first is always optimal via the **exchange argument** —
- Take any optimal solution; replace its first activity with the greedy choice (the earliest-finishing one). Still valid, still optimal.
- Induction → greedy = optimal.

Source: original (revisit)`,
        constraints: "1 ≤ N ≤ 200,000, 0 ≤ start ≤ end ≤ 10^9",
        hints: [
          "Sort by end ascending; tie-break by start.",
          "Initialize cur to a very small value (handles instant events at 0).",
          "Exchange argument: swapping any first pick for the earliest-finishing one never hurts.",
        ],
        solutionExplanation:
          "Same sort-by-end + 1-pass as agre-002, but harder data shapes. Setting \`cur = -∞\` keeps (0,0) events safe. Exchange argument confirms optimality.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 보석 도둑 (BOJ 1202) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agre-012",
      cluster: "algo-greedy-contest",
      unlockAfter: "algo-greedy",
      difficulty: "어려움",
      title: "보석 도둑 (priority_queue)",
      description: `N 개의 보석 (무게 w, 가치 v) 과 K 개의 가방 (각 가방 한도 c) 이 있다. **한 가방에 한 개의 보석** 만 담을 수 있다. 가방의 한도를 초과하지 않게 보석을 담아 **가치 합 최대** 를 출력하라.

핵심 — 가방 + heap 그리디:
1. 보석을 무게 오름차순, 가방을 한도 오름차순 정렬.
2. 가장 작은 가방부터: 그 가방에 들어갈 수 있는 모든 보석 (\`w[j] <= c\`) 을 **max-heap (가치 기준)** 에 추가.
3. heap 비어있지 않으면 가장 큰 가치를 꺼내 이 가방에 담기.

가방을 작은 것부터 처리하면, 한 번 heap 에 들어간 보석은 더 큰 가방에서도 여전히 후보로 남아있어 안전.

출처: BOJ 1202 paraphrased`,
      constraints: "1 ≤ N, K ≤ 300,000, 1 ≤ 보석 무게/가치 ≤ 1,000,000, 1 ≤ 가방 한도 ≤ 100,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "2 1\n5 10\n100 100\n11", expectedOutput: "10", label: "BOJ 1202 sample — (5,10) 만 한도 11 에 맞음" },
        { stdin: "3 4\n1 65\n5 23\n2 99\n10\n11\n12\n13", expectedOutput: "187", label: "3 개 모두 작은 무게 → 가치 다 챙김" },
        { stdin: "4 4\n1 65\n5 23\n2 99\n10 40\n10\n11\n12\n13", expectedOutput: "227", label: "4 보석 4 가방 — 99+65+40+23" },
        { stdin: "1 1\n1 1\n10", expectedOutput: "1", label: "단일" },
        { stdin: "1 1\n100 50\n10", expectedOutput: "0", label: "보석이 가방보다 무거움 — 0" },
        { stdin: "3 2\n1 10\n1 20\n1 30\n5 5", expectedOutput: "50", label: "각 가방에 1 개씩 (30, 20)" },
      ],
      hints: [
        "보석은 무게 오름차순, 가방은 한도 오름차순 정렬.",
        "가방을 하나씩 보면서, 그 한도 ≤ 까지의 보석들을 max-heap (가치) 에 push.",
        "heap top 의 가치를 꺼내 (pop) 이 가방에 담기. 빈 heap 이면 이 가방은 비움.",
        "한 번 들어간 보석은 더 큰 가방에서도 후보 — 작은 가방부터 처리하는 게 핵심.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, K;
    cin >> N >> K;
    vector<pair<int,int>> jewels(N);  // (weight, value)
    for (int i = 0; i < N; i++) cin >> jewels[i].first >> jewels[i].second;
    vector<int> bags(K);
    for (int i = 0; i < K; i++) cin >> bags[i];

    sort(jewels.begin(), jewels.end());
    sort(bags.begin(), bags.end());

    priority_queue<int> pq;  // max-heap of values
    long long total = 0;
    int j = 0;
    for (int c : bags) {
        while (j < N && jewels[j].first <= c) {
            pq.push(jewels[j].second);
            j++;
        }
        if (!pq.empty()) { total += pq.top(); pq.pop(); }
    }
    cout << total << "\\n";
    return 0;
}`,
      solutionExplanation:
        "두-단계 정렬 + max-heap — 가방을 작은 것부터 처리하면 그 가방에 맞는 후보들이 heap 에 다 모이고, 더 큰 가방에서는 추가 후보만 더 합류한다 (이미 들어간 건 그대로). 매 가방마다 heap top 의 최고 가치를 가져가면 끝. O((N+K) log N).",
      pyInitialCode: `import sys
import heapq
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
import heapq
input = sys.stdin.readline

n, k = map(int, input().split())
jewels = [tuple(map(int, input().split())) for _ in range(n)]
bags = [int(input()) for _ in range(k)]

jewels.sort()
bags.sort()

heap = []
total = 0
j = 0
for c in bags:
    while j < n and jewels[j][0] <= c:
        heapq.heappush(heap, -jewels[j][1])  # max-heap via negation
        j += 1
    if heap:
        total -= heapq.heappop(heap)
print(total)
`,
      en: {
        title: "Jewelry Thief (priority_queue)",
        description: `N jewels (weight w, value v) and K bags (each capacity c). **Each bag holds at most one jewel** within its capacity. Print the **maximum total value**.

Greedy with heap:
1. Sort jewels by weight ascending; bags by capacity ascending.
2. For each bag (smallest first): push all jewels with \`w ≤ c\` into a **max-heap by value**.
3. If heap is non-empty, pop the top (max value) into this bag.

Processing bags small-to-large keeps every already-eligible jewel still eligible for larger bags — that's the correctness argument.

Source: BOJ 1202 paraphrased`,
        constraints: "1 ≤ N, K ≤ 300,000, 1 ≤ weight/value ≤ 10^6, 1 ≤ capacity ≤ 10^8",
        hints: [
          "Sort jewels by weight; sort bags by capacity.",
          "For each bag, push every jewel with weight ≤ capacity into a max-heap (by value).",
          "Pop the heap's top into the current bag. Empty heap → bag stays empty.",
          "Once a jewel is in the heap, all larger bags still see it — small-first is essential.",
        ],
        solutionExplanation:
          "Two-stage sort + max-heap — processing smallest bag first accumulates all eligible jewels; later bags only add to the pool. Each bag takes the heap's current best. O((N+K) log N).",
      },
    },
  ],
}
