import type { PracticeCluster } from "./types"

export const priorityQueueContestCluster: PracticeCluster = {
  id: "algo-priorityqueue-contest",
  title: "우선순위 큐 문제 풀이",
  emoji: "⚡",
  description: "heap 으로 push/pop O(log N) — K 패턴, 스케줄링, 합치기, 중간값",
  unlockAfter: "algo-priorityqueue",
  en: {
    title: "Priority Queue Practice",
    description: "Heap push/pop in O(log N) — K patterns, scheduling, merging, median",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. 최소 힙 (BOJ 1927) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-001",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "보통",
      title: "최소 힙",
      description: `자연수 또는 0 으로 이루어진 N 개의 연산을 처리한다. 자연수 \`x\` 면 배열에 추가, \`0\` 이면 *가장 작은* 값을 출력하고 배열에서 제거.

배열이 비었는데 \`0\` 이 오면 \`0\` 을 출력한다.

출처: BOJ 1927 — 최소 힙 (paraphrased)`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ x ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "9\n0\n12345678\n1\n2\n0\n0\n0\n0\n32", expectedOutput: "0\n1\n2\n12345678\n0", label: "샘플 (BOJ 1927)" },
        { stdin: "3\n0\n0\n0", expectedOutput: "0\n0\n0", label: "전부 빈 pop" },
        { stdin: "5\n5\n3\n8\n0\n0", expectedOutput: "3\n5", label: "넣은 순서 무관 — 작은 거부터" },
        { stdin: "4\n1\n2\n3\n0", expectedOutput: "1", label: "최솟값 1" },
        { stdin: "6\n1000000000\n1\n500000000\n0\n0\n0", expectedOutput: "1\n500000000\n1000000000", label: "큰 값" },
      ],
      hints: [
        "C++: priority_queue<int, vector<int>, greater<int>> — min-heap.",
        "x > 0 면 push. x == 0 면 비어있는지 검사 후 top 출력 + pop.",
        "Python: heapq 가 기본 min-heap. heappush / heappop 그대로.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    priority_queue<int, vector<int>, greater<int>> pq;
    while (N--) {
        int x; cin >> x;
        if (x == 0) {
            if (pq.empty()) cout << 0 << "\\n";
            else { cout << pq.top() << "\\n"; pq.pop(); }
        } else {
            pq.push(x);
        }
    }
    return 0;
}`,
      solutionExplanation:
        "min-heap 의 가장 기본. push 는 그냥, pop 은 비어있는지 검사 후 top + pop. C++ 은 greater 비교자로 min-heap 만들기.",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

n = int(input())
h = []
out = []
for _ in range(n):
    x = int(input())
    if x == 0:
        out.append(str(heapq.heappop(h)) if h else "0")
    else:
        heapq.heappush(h, x)
sys.stdout.write("\\n".join(out) + ("\\n" if out else ""))
`,
      en: {
        title: "Min Heap",
        description: `Process N operations of natural numbers or 0. If \`x\` is positive, insert it. If \`x = 0\`, print the *smallest* value and remove it.

If the heap is empty and \`0\` arrives, print \`0\`.

Source: BOJ 1927 (paraphrased)`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ x ≤ 10^9",
        hints: [
          "C++: priority_queue<int, vector<int>, greater<int>> for min-heap.",
          "x > 0 → push. x == 0 → if empty print 0 else print + pop top.",
          "Python: heapq is min-heap by default.",
        ],
        solutionExplanation:
          "The most basic min-heap exercise. Push freely; on pop, check empty first. In C++ use greater<int> to flip to min-heap.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 최대 힙 (BOJ 11279) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-002",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "보통",
      title: "최대 힙",
      description: `자연수 또는 0 으로 이루어진 N 개의 연산을 처리한다. 자연수 \`x\` 면 배열에 추가, \`0\` 이면 *가장 큰* 값을 출력하고 배열에서 제거.

배열이 비었는데 \`0\` 이 오면 \`0\` 을 출력한다.

출처: BOJ 11279 — 최대 힙 (paraphrased)`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ x ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "13\n0\n1\n2\n0\n0\n3\n2\n1\n0\n0\n0\n0\n0", expectedOutput: "0\n2\n1\n3\n2\n1\n0\n0", label: "샘플 (BOJ 11279)" },
        { stdin: "3\n0\n0\n0", expectedOutput: "0\n0\n0", label: "전부 빈 pop" },
        { stdin: "5\n3\n1\n5\n0\n0", expectedOutput: "5\n3", label: "큰 거부터" },
        { stdin: "4\n1000000000\n1\n500000000\n0", expectedOutput: "1000000000", label: "최댓값" },
      ],
      hints: [
        "C++: priority_queue<int> — 기본이 max-heap.",
        "Python: heapq 는 min-heap → 부호 뒤집어서 push, pop 후 부호 복구.",
        "또는 (-x, x) 형태로 push 해서 첫 원소 음수 처리도 가능.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    priority_queue<int> pq;
    while (N--) {
        int x; cin >> x;
        if (x == 0) {
            if (pq.empty()) cout << 0 << "\\n";
            else { cout << pq.top() << "\\n"; pq.pop(); }
        } else {
            pq.push(x);
        }
    }
    return 0;
}`,
      solutionExplanation:
        "C++ priority_queue<int> 는 기본이 max-heap — 그대로 쓰면 끝. Python 은 음수로 뒤집어서 min-heap 흉내. 1927 의 거울 이미지.",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

n = int(input())
h = []
out = []
for _ in range(n):
    x = int(input())
    if x == 0:
        out.append(str(-heapq.heappop(h)) if h else "0")
    else:
        heapq.heappush(h, -x)
sys.stdout.write("\\n".join(out) + ("\\n" if out else ""))
`,
      en: {
        title: "Max Heap",
        description: `Process N operations. Positive \`x\` → insert; \`0\` → pop and print the *largest* value (or 0 if empty).

Source: BOJ 11279 (paraphrased)`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ x ≤ 10^9",
        hints: [
          "C++: priority_queue<int> is max-heap by default.",
          "Python: heapq is min-heap — push -x, then negate on pop.",
        ],
        solutionExplanation:
          "C++ priority_queue<int> is already a max-heap. In Python, push negated values to simulate max-heap. Mirror of problem 1.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 절댓값 힙 (BOJ 11286) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-003",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "보통",
      title: "절댓값 힙",
      description: `정수 N 개의 연산. \`x ≠ 0\` 이면 배열에 추가, \`x == 0\` 이면 *절댓값이 가장 작은* 값을 출력하고 제거.

절댓값이 같은 값이 여러 개라면 *가장 작은 (음수 우선)* 값을 출력.

배열이 비었는데 \`0\` 이면 \`0\` 출력.

출처: BOJ 11286 — 절댓값 힙 (paraphrased)`,
      constraints: "1 ≤ N ≤ 100,000, -2^31 < x < 2^31",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "18\n1\n-1\n0\n0\n0\n1\n1\n-1\n-1\n2\n-2\n0\n0\n0\n0\n0\n0\n0", expectedOutput: "-1\n1\n0\n-1\n-1\n1\n1\n-2\n2\n0", label: "샘플 (BOJ 11286)" },
        { stdin: "3\n-5\n5\n0", expectedOutput: "-5", label: "절댓값 같으면 음수 먼저" },
        { stdin: "5\n-10\n3\n-3\n0\n0", expectedOutput: "-3\n3", label: "|3|, |-3| 동률 → -3 먼저" },
        { stdin: "4\n7\n-2\n4\n0", expectedOutput: "-2", label: "절댓값 최소 = 2" },
        { stdin: "2\n0\n0", expectedOutput: "0\n0", label: "빈 pop" },
      ],
      hints: [
        "pair<int, int> 로 (|x|, x) 저장 → 자동으로 |x| 우선, 동률이면 원본 값으로 비교.",
        "min-heap 으로 (|x|, x) — 절댓값 작은 거 + 같으면 음수 우선이 정확히 pair 비교와 일치.",
        "Python: heappush(h, (abs(x), x)) → heappop[1] 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    while (N--) {
        int x; cin >> x;
        if (x == 0) {
            if (pq.empty()) cout << 0 << "\\n";
            else { cout << pq.top().second << "\\n"; pq.pop(); }
        } else {
            pq.push({abs(x), x});
        }
    }
    return 0;
}`,
      solutionExplanation:
        "pair 비교의 lexicographic 특성을 이용 — (|x|, x) 로 push 하면 |x| 가 먼저 비교되고, 같으면 x (음수가 작음) 가 우선. 한 줄 트릭.",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

n = int(input())
h = []
out = []
for _ in range(n):
    x = int(input())
    if x == 0:
        if h:
            out.append(str(heapq.heappop(h)[1]))
        else:
            out.append("0")
    else:
        heapq.heappush(h, (abs(x), x))
sys.stdout.write("\\n".join(out) + ("\\n" if out else ""))
`,
      en: {
        title: "Absolute Value Heap",
        description: `N operations. \`x ≠ 0\` → insert; \`x == 0\` → pop the value with the *smallest absolute value* (ties broken by the smaller value, i.e. negative first).

Empty + 0 → print 0.

Source: BOJ 11286 (paraphrased)`,
        constraints: "1 ≤ N ≤ 100,000, -2^31 < x < 2^31",
        hints: [
          "Store (|x|, x) pairs — lex comparison gives |x| first, then x (negative wins ties).",
          "Min-heap over the pairs gives exactly the required order.",
          "Python: heappush(h, (abs(x), x)).",
        ],
        solutionExplanation:
          "Lexicographic pair comparison: (|x|, x) — |x| wins, ties broken by x (negatives smaller). One-line trick.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. K 번째 작은 수 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-004",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "보통",
      title: "K 번째 작은 수",
      description: `N 개의 정수와 K 가 주어진다. K 번째로 작은 수를 출력하라.

heap 활용 방법: max-heap 의 크기를 K 로 유지. 들어오는 값이 heap 의 최댓값 (heap.top) 보다 작으면 교체. 끝나면 heap.top = K 번째로 작은 값.

단순 sort 도 가능하지만 — 큰 N 에서 heap 이 더 빠르고, 스트림 (모든 값을 한 번에 못 받는 경우) 에서도 동작.

출처: 원본 (K-smallest streaming pattern)`,
      constraints: "1 ≤ K ≤ N ≤ 100,000, -10^9 ≤ 각 값 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5 2\n3 1 4 1 5", expectedOutput: "1", label: "정렬: 1,1,3,4,5 → 2번째 = 1" },
        { stdin: "6 4\n9 7 5 3 1 8", expectedOutput: "7", label: "정렬: 1,3,5,7,8,9 → 4번째 = 7" },
        { stdin: "1 1\n42", expectedOutput: "42", label: "원소 1개" },
        { stdin: "5 5\n10 20 30 40 50", expectedOutput: "50", label: "K = N → 최댓값" },
        { stdin: "5 1\n10 20 30 40 50", expectedOutput: "10", label: "K = 1 → 최솟값" },
        { stdin: "7 3\n-5 -3 -1 0 2 4 6", expectedOutput: "-1", label: "음수 포함" },
      ],
      hints: [
        "max-heap 크기 K 유지. 새 값 v < heap.top → pop + push v.",
        "끝나면 heap.top = K 번째 작은 값.",
        "C++: priority_queue<int> 가 max-heap. Python: -v 로 push.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, K;
    cin >> N >> K;
    priority_queue<int> pq;   // max-heap, 크기 ≤ K
    for (int i = 0; i < N; i++) {
        int v; cin >> v;
        if ((int)pq.size() < K) pq.push(v);
        else if (v < pq.top()) { pq.pop(); pq.push(v); }
    }
    cout << pq.top() << "\\n";
    return 0;
}`,
      solutionExplanation:
        "K-smallest = max-heap 크기 K. 가장 큰 후보가 top 에 있어 비교/교체가 O(log K). 끝나면 K 개 중 최대 = K 번째 작은 값. 시간 O(N log K).",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

n, k = map(int, input().split())
arr = list(map(int, input().split()))
# max-heap 흉내: -v 로 push
h = []
for v in arr:
    if len(h) < k:
        heapq.heappush(h, -v)
    elif v < -h[0]:
        heapq.heapreplace(h, -v)
print(-h[0])
`,
      en: {
        title: "Kth Smallest",
        description: `Given N integers and K, print the K-th smallest.

Heap approach: keep a max-heap of size K. For each new v, if v < heap.top, replace. At the end, heap.top = K-th smallest.

Sort works too, but heap is faster for large N and works for streams.

Source: original (K-smallest streaming)`,
        constraints: "1 ≤ K ≤ N ≤ 100,000, -10^9 ≤ each ≤ 10^9",
        hints: [
          "Max-heap of size K. If v < heap.top, pop and push v.",
          "End: heap.top = K-th smallest.",
          "C++: priority_queue<int>. Python: push -v.",
        ],
        solutionExplanation:
          "K-smallest = max-heap of size K. The biggest candidate is on top for O(log K) compare/swap. End-state max = the K-th smallest overall. O(N log K).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 카드 합치기 (BOJ 1715) — 보통 (Huffman)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-005",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "보통",
      title: "카드 합치기 (최소 비용)",
      description: `N 개의 카드 묶음이 있다. 각 묶음의 카드 수가 주어진다. 두 묶음을 합칠 때, 합치는 비용 = 두 묶음 카드 수의 합. 모두 하나로 합칠 때 *최소 비용* 을 구하라.

핵심: 매번 *가장 작은 두 묶음* 을 합치면 최소 — Huffman 의 기본형. min-heap 에서 두 번 pop, 합쳐서 다시 push, 반복.

출처: BOJ 1715 — 카드 정렬하기 (paraphrased, Huffman)`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ 각 묶음 카드 수 ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\n10\n20\n40", expectedOutput: "100", label: "10+20=30, 30+40=70 → 100" },
        { stdin: "4\n1\n2\n3\n4", expectedOutput: "19", label: "1+2=3, 3+3=6, 6+4=10 → 19" },
        { stdin: "1\n5", expectedOutput: "0", label: "묶음 1개 — 합칠 게 없음" },
        { stdin: "2\n7\n3", expectedOutput: "10", label: "한 번 합치기" },
        { stdin: "5\n1\n1\n1\n1\n1", expectedOutput: "12", label: "1+1=2, 1+1=2, 2+1=3, 2+3=5 → 12" },
        { stdin: "6\n1\n2\n3\n4\n5\n6", expectedOutput: "51", label: "전형적 Huffman" },
      ],
      hints: [
        "탐욕 — 매번 *가장 작은 두 개* 만 합치는 게 최소.",
        "min-heap 에서 pop 두 번 → 합쳐서 비용 누적 → 합 push.",
        "N=1 이면 합칠 게 없어 비용 0.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    priority_queue<long long, vector<long long>, greater<>> pq;
    for (int i = 0; i < N; i++) {
        long long x; cin >> x;
        pq.push(x);
    }
    long long total = 0;
    while (pq.size() >= 2) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        long long s = a + b;
        total += s;
        pq.push(s);
    }
    cout << total << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Huffman 의 가장 단순한 형태 — 매번 작은 둘을 합치면 전체 비용 최소. 핵심은 *합친 결과를 다시 heap 에 넣는다* 는 점. heap 크기 1 될 때까지 반복. O(N log N).",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

n = int(input())
h = [int(input()) for _ in range(n)]
heapq.heapify(h)
total = 0
while len(h) >= 2:
    a = heapq.heappop(h)
    b = heapq.heappop(h)
    s = a + b
    total += s
    heapq.heappush(h, s)
print(total)
`,
      en: {
        title: "Merge Card Decks (Min Cost)",
        description: `N card decks. Merging two costs the sum of their sizes. Print the *minimum total cost* to merge all into one.

Greedy: always merge the *two smallest*. min-heap → pop twice, push back the sum, repeat.

Source: BOJ 1715 (Huffman, paraphrased)`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ each ≤ 1000",
        hints: [
          "Greedy — merging the two smallest each round gives the minimum.",
          "Pop two from min-heap, sum, accumulate, push sum back.",
          "If N=1, cost = 0.",
        ],
        solutionExplanation:
          "Simplest Huffman — merge smallest two each step. Crucial: *push the merged result back into the heap*. Repeat until size 1. O(N log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 두 힙으로 중간값 (BOJ 1655) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-006",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "보통",
      title: "running 중간값 (두 힙)",
      description: `N 개의 정수가 한 개씩 들어온다. 매 번 *지금까지 들어온 수들의 중간값* 을 출력하라. (짝수 개일 땐 작은 쪽.)

핵심 — 두 힙:
- \`lo\` = max-heap (작은 절반)
- \`hi\` = min-heap (큰 절반)
- 균형 유지: \`lo.size() == hi.size()\` 또는 \`lo.size() == hi.size() + 1\`
- 중간값 = \`lo.top()\`

새 값 v 가 오면: lo.top() 보다 작으면 lo 에, 아니면 hi 에. 크기 차이 ≥ 2 되면 더 큰 쪽에서 하나 옮기기.

출처: BOJ 1655 — 가운데를 말해요 (paraphrased)`,
      constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ 각 값 ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "7\n1\n5\n2\n10\n-99\n7\n5", expectedOutput: "1\n1\n2\n2\n2\n2\n5", label: "샘플 (BOJ 1655)" },
        { stdin: "1\n42", expectedOutput: "42", label: "N=1" },
        { stdin: "3\n1\n2\n3", expectedOutput: "1\n1\n2", label: "오름차순" },
        { stdin: "4\n4\n3\n2\n1", expectedOutput: "4\n3\n3\n2", label: "내림차순" },
        { stdin: "5\n5\n5\n5\n5\n5", expectedOutput: "5\n5\n5\n5\n5", label: "동일 값" },
      ],
      hints: [
        "두 힙: lo (max-heap, 작은 절반) 과 hi (min-heap, 큰 절반).",
        "균형 — lo.size 는 hi.size 또는 hi.size + 1. 즉 중간값 = lo.top.",
        "삽입: v ≤ lo.top → lo, 아니면 hi. 균형 깨지면 한 쪽 top 옮기기.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    priority_queue<int> lo;                                     // max-heap
    priority_queue<int, vector<int>, greater<>> hi;             // min-heap

    string out;
    for (int i = 0; i < N; i++) {
        int v; cin >> v;
        if (lo.empty() || v <= lo.top()) lo.push(v);
        else hi.push(v);

        // 균형 유지: lo 가 hi 보다 정확히 0 ~ 1 더 크게
        if (lo.size() > hi.size() + 1) { hi.push(lo.top()); lo.pop(); }
        else if (hi.size() > lo.size())  { lo.push(hi.top()); hi.pop(); }

        out += to_string(lo.top()); out += '\\n';
    }
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "두 힙 트릭 — 작은 절반은 max-heap, 큰 절반은 min-heap. 두 top 사이에 중간값이 있고, lo 가 하나 더 가지면 짝수 개일 때 작은 쪽이 답. 각 삽입 O(log N).",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

n = int(input())
lo = []   # max-heap (음수로 흉내) — 작은 절반
hi = []   # min-heap — 큰 절반
out = []

for _ in range(n):
    v = int(input())
    if not lo or v <= -lo[0]:
        heapq.heappush(lo, -v)
    else:
        heapq.heappush(hi, v)
    # 균형: len(lo) ∈ {len(hi), len(hi)+1}
    if len(lo) > len(hi) + 1:
        heapq.heappush(hi, -heapq.heappop(lo))
    elif len(hi) > len(lo):
        heapq.heappush(lo, -heapq.heappop(hi))
    out.append(str(-lo[0]))

sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Running Median (Two Heaps)",
        description: `N integers arrive one at a time. After each, print the *median so far*. (For even count, print the smaller middle.)

Two heaps trick:
- \`lo\` = max-heap (lower half)
- \`hi\` = min-heap (upper half)
- Invariant: \`|lo| == |hi|\` or \`|lo| == |hi| + 1\`
- Median = \`lo.top()\`

Source: BOJ 1655 (paraphrased)`,
        constraints: "1 ≤ N ≤ 100,000, |x| ≤ 10,000",
        hints: [
          "Two heaps: lo (max-heap, lower half) and hi (min-heap, upper half).",
          "Balance: |lo| is |hi| or |hi|+1. Median = lo.top.",
          "Insert: v ≤ lo.top → lo, else hi. Rebalance if needed.",
        ],
        solutionExplanation:
          "Two-heaps pattern — max-heap on lower half, min-heap on upper. Median sits between the tops; with lo carrying the extra, the smaller middle is at lo.top. O(log N) per insert.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. K largest 원소들 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-007",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "어려움",
      title: "K 큰 원소 (내림차순 출력)",
      description: `N 개의 정수와 K 가 주어진다. 가장 큰 K 개의 원소를 *내림차순* 으로 한 줄에 공백으로 출력하라.

전체 정렬 (O(N log N)) 도 가능하지만, **min-heap 크기 K** 유지가 더 효율적 (O(N log K)). 큰 N + 작은 K 의 정형 패턴.

핵심:
- min-heap 크기 ≤ K 유지
- 크기 < K → push
- 그 외 — v > heap.top → pop + push v

마지막에 heap 내용을 내림차순으로 출력.

출처: LeetCode 215 (Kth Largest) variant`,
      constraints: "1 ≤ K ≤ N ≤ 100,000, -10^9 ≤ 각 값 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "9 3\n4 1 7 3 8 2 9 5 6", expectedOutput: "9 8 7", label: "샘플 — top 3" },
        { stdin: "5 1\n3 1 4 1 5", expectedOutput: "5", label: "K=1 → 최댓값" },
        { stdin: "5 5\n10 20 30 40 50", expectedOutput: "50 40 30 20 10", label: "K=N → 전체 내림" },
        { stdin: "6 2\n-3 -1 -5 -2 -4 -6", expectedOutput: "-1 -2", label: "음수만" },
        { stdin: "1 1\n42", expectedOutput: "42", label: "N=1" },
        { stdin: "7 3\n5 5 5 5 5 5 5", expectedOutput: "5 5 5", label: "중복" },
      ],
      hints: [
        "min-heap 크기 K 유지 → 새 값이 heap.top 보다 크면 교체.",
        "끝나면 heap 안에 큰 K 개 (오름순). 내림차순 출력에 주의.",
        "출력: vector 로 빼내서 reverse, 또는 pop 한 결과를 거꾸로 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, K;
    cin >> N >> K;
    priority_queue<int, vector<int>, greater<>> pq;   // min-heap, 크기 K
    for (int i = 0; i < N; i++) {
        int v; cin >> v;
        if ((int)pq.size() < K) pq.push(v);
        else if (v > pq.top()) { pq.pop(); pq.push(v); }
    }
    vector<int> res;
    while (!pq.empty()) { res.push_back(pq.top()); pq.pop(); }
    // res 는 오름차순 — 거꾸로 출력
    for (int i = (int)res.size() - 1; i >= 0; i--) {
        cout << res[i];
        cout << (i > 0 ? ' ' : '\\n');
    }
    return 0;
}`,
      solutionExplanation:
        "K-largest 의 정형 — min-heap 크기 K. 매 입력 O(log K) → 전체 O(N log K). 출력은 heap 에서 빼낸 오름차순을 뒤집어 내림차순으로.",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

n, k = map(int, input().split())
arr = list(map(int, input().split()))
h = []
for v in arr:
    if len(h) < k:
        heapq.heappush(h, v)
    elif v > h[0]:
        heapq.heapreplace(h, v)
# heap = 가장 큰 K 개 (오름순). 내림차순 출력.
h.sort(reverse=True)
print(" ".join(map(str, h)))
`,
      en: {
        title: "Top K Largest (Descending)",
        description: `Given N integers and K, print the K largest in *descending* order, space-separated.

Min-heap of size K → O(N log K), better than full sort for large N + small K.

Source: LeetCode 215 variant`,
        constraints: "1 ≤ K ≤ N ≤ 100,000, |x| ≤ 10^9",
        hints: [
          "Min-heap of size K — if v > heap.top, swap.",
          "End state: K largest values inside (ascending). Reverse for output.",
        ],
        solutionExplanation:
          "Classic K-largest — size-K min-heap. O(log K) per input → O(N log K). Reverse the final ascending heap for descending output.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. K개의 정렬 배열 merge (LC 23) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-008",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "어려움",
      title: "K 개 정렬 배열 합치기",
      description: `각각 *오름차순으로 정렬된* K 개의 배열이 주어진다. 모두 합쳐서 *하나의 오름차순 정렬* 배열로 만든 결과를 한 줄에 공백으로 출력하라.

핵심: min-heap 에 \`(값, 어느 배열, 그 배열에서 몇 번째)\` 트리플을 K 개 (각 배열의 첫 원소) 로 시작. 한 번 pop 하면 그 배열의 다음 원소를 push. 모든 원소가 빠질 때까지 반복.

전체 길이 N (모든 원소 합), 시간 O(N log K). 단순 concat-sort 는 O(N log N) — K << N 일 때 차이 크다.

입력 형식: 첫 줄 K, 다음 K 줄마다 \`L v1 v2 ... vL\` (해당 배열 길이 L 과 원소들).

출처: LeetCode 23 (Merge K Sorted Lists) paraphrased`,
      constraints: "1 ≤ K ≤ 1000, 1 ≤ 각 배열 길이 L ≤ 1000, 총 원소 ≤ 100,000, -10^9 ≤ 각 값 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\n3 1 4 7\n3 2 5 8\n3 3 6 9", expectedOutput: "1 2 3 4 5 6 7 8 9", label: "3개 배열, 길이 3씩" },
        { stdin: "2\n3 1 3 5\n3 2 4 6", expectedOutput: "1 2 3 4 5 6", label: "2 배열 zip" },
        { stdin: "1\n5 5 4 3 2 1", expectedOutput: "5 4 3 2 1", label: "1 배열 — 그대로 (정렬 가정에 위배 — 그래도 그대로)" },
        { stdin: "3\n1 5\n1 1\n1 3", expectedOutput: "1 3 5", label: "각 배열 1개씩" },
        { stdin: "2\n4 -5 -3 -1 0\n3 -2 1 4", expectedOutput: "-5 -3 -2 -1 0 1 4", label: "음수 포함" },
        { stdin: "3\n2 10 20\n2 5 15\n2 1 100", expectedOutput: "1 5 10 15 20 100", label: "겹치는 범위" },
      ],
      hints: [
        "tuple (값, 배열 idx, 원소 idx) 를 min-heap 에. 초기엔 각 배열의 첫 원소.",
        "pop → 결과에 추가 → 그 배열의 다음 원소가 있으면 push.",
        "C++: priority_queue<tuple<int,int,int>, vector<...>, greater<>>.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int K;
    cin >> K;
    vector<vector<int>> arrs(K);
    for (int i = 0; i < K; i++) {
        int L; cin >> L;
        arrs[i].resize(L);
        for (int j = 0; j < L; j++) cin >> arrs[i][j];
    }
    // (값, 배열 idx, 원소 idx)
    using T = tuple<int,int,int>;
    priority_queue<T, vector<T>, greater<>> pq;
    for (int i = 0; i < K; i++) {
        if (!arrs[i].empty()) pq.push({arrs[i][0], i, 0});
    }
    string out;
    bool first = true;
    while (!pq.empty()) {
        auto [v, ai, ei] = pq.top(); pq.pop();
        if (!first) out += ' ';
        out += to_string(v);
        first = false;
        if (ei + 1 < (int)arrs[ai].size()) {
            pq.push({arrs[ai][ei + 1], ai, ei + 1});
        }
    }
    out += '\\n';
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "K-way merge — heap 에 매 순간 *각 배열의 다음 후보* K 개. pop 하면 결과에 붙이고 그 배열에서 다음 후보 보충. heap 크기 ≤ K → O(N log K).",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

k = int(input())
arrs = []
for _ in range(k):
    parts = list(map(int, input().split()))
    L = parts[0]
    arrs.append(parts[1:1 + L])

h = []
for i in range(k):
    if arrs[i]:
        heapq.heappush(h, (arrs[i][0], i, 0))

out = []
while h:
    v, ai, ei = heapq.heappop(h)
    out.append(str(v))
    if ei + 1 < len(arrs[ai]):
        heapq.heappush(h, (arrs[ai][ei + 1], ai, ei + 1))

print(" ".join(out))
`,
      en: {
        title: "Merge K Sorted Arrays",
        description: `Given K ascending arrays, merge them into a single ascending sequence. Print space-separated.

Min-heap holds \`(value, array idx, pos)\` triples — start with the first of each array. Pop one → emit → push the array's next element. O(N log K).

Input: first line K, then K lines each \`L v1 v2 ... vL\`.

Source: LeetCode 23 paraphrased`,
        constraints: "1 ≤ K ≤ 1000, total elements ≤ 100,000, |x| ≤ 10^9",
        hints: [
          "Min-heap of tuples (value, arrayIdx, posInArray). Seed with first of each array.",
          "After pop, push next element from the same array (if exists).",
          "Heap size stays ≤ K, total work O(N log K).",
        ],
        solutionExplanation:
          "K-way merge — heap always holds *the next candidate from each array*. Pop → emit → restock. Heap ≤ K → O(N log K).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 회의실 배정 최소 (BOJ 11000) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-009",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "어려움",
      title: "회의실 최소 개수",
      description: `N 개의 회의 일정 \`(시작, 끝)\` 이 주어진다. 회의는 동시에 진행될 수 있고, 한 회의실에선 끝난 직후 다음 회의가 바로 시작 가능 (시작 == 끝 OK).

모든 회의를 진행하려면 *최소 몇 개의 회의실* 이 필요한가?

핵심:
1. 모든 회의를 *시작 시간 오름차순* 으로 정렬.
2. min-heap 에 *현재 사용 중인 회의실들의 끝나는 시간* 저장.
3. 새 회의: heap.top (가장 빨리 끝나는 회의실) ≤ 시작 → 그 방 재활용 (pop 후 push 새 끝). 아니면 새 방 (push).
4. 답 = heap 의 *최대* 크기 (또는 끝에 남은 크기).

출처: BOJ 11000 — 강의실 배정 (paraphrased)`,
      constraints: "1 ≤ N ≤ 200,000, 0 ≤ 시작 < 끝 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\n1 3\n2 4\n3 5", expectedOutput: "2", label: "샘플 (BOJ 11000)" },
        { stdin: "1\n0 100", expectedOutput: "1", label: "회의 1개" },
        { stdin: "3\n1 2\n2 3\n3 4", expectedOutput: "1", label: "연속 — 한 방으로" },
        { stdin: "4\n0 10\n1 10\n2 10\n3 10", expectedOutput: "4", label: "전부 겹침" },
        { stdin: "5\n0 5\n5 10\n10 15\n3 8\n8 13", expectedOutput: "2", label: "두 줄로" },
        { stdin: "2\n5 10\n10 15", expectedOutput: "1", label: "끝 == 시작 — 재활용 OK" },
      ],
      hints: [
        "시작 시간으로 정렬 후 — 매 회의 처리 시 끝 시간 min-heap 사용.",
        "heap.top ≤ 현재 회의 시작 → pop (재활용), push 새 끝.",
        "아니면 새 회의실 → push (heap 크기 증가).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    vector<pair<int,int>> meets(N);
    for (int i = 0; i < N; i++) cin >> meets[i].first >> meets[i].second;
    sort(meets.begin(), meets.end());

    priority_queue<int, vector<int>, greater<>> pq;   // 끝나는 시간들
    for (auto& [s, e] : meets) {
        if (!pq.empty() && pq.top() <= s) pq.pop();   // 재활용
        pq.push(e);
    }
    cout << pq.size() << "\\n";
    return 0;
}`,
      solutionExplanation:
        "탐욕 + heap — 시작 순으로 보면 매 회의에서 '가장 빨리 끝나는 방' 만 확인하면 됨. 재활용 가능하면 pop, 어쨌든 새 끝을 push. heap 의 최종 크기 = 동시에 진행됐던 *최대* 개수 = 필요한 방 수.",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

n = int(input())
meets = []
for _ in range(n):
    s, e = map(int, input().split())
    meets.append((s, e))
meets.sort()

h = []
for s, e in meets:
    if h and h[0] <= s:
        heapq.heappop(h)
    heapq.heappush(h, e)
print(len(h))
`,
      en: {
        title: "Minimum Meeting Rooms",
        description: `Given N meetings \`(start, end)\`, find the *minimum number of rooms* needed (a room is reusable as soon as a meeting ends).

Approach:
1. Sort by start.
2. min-heap of currently-used rooms' end times.
3. New meeting: if heap.top ≤ start → reuse (pop), then push the new end. Else → new room.
4. Answer = max heap size encountered (equivalently, the final size with this approach).

Source: BOJ 11000 paraphrased`,
        constraints: "1 ≤ N ≤ 200,000, 0 ≤ start < end ≤ 10^9",
        hints: [
          "Sort meetings by start time, then process with a min-heap of end times.",
          "If heap.top ≤ current start, that room is free — pop it.",
          "Always push the new end. Final heap size = required rooms.",
        ],
        solutionExplanation:
          "Greedy + heap — sort by start, check the earliest-ending room each step. If reusable, pop; always push new end. Final heap size = peak simultaneous rooms.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 작업 스케줄링 (deadline + profit) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-010",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "어려움",
      title: "작업 스케줄링 (마감 + 이익)",
      description: `N 개의 작업이 있다. 각 작업은 *마감* \`d\` 와 *이익* \`p\`. 한 작업은 정확히 1 시간이 걸리고, 시간 1, 2, 3, ... 에 한 번에 한 작업씩 처리 가능. 작업 \`i\` 는 시간 \`d_i\` 안에 마쳐야 이익을 받는다.

*최대 총 이익* 을 구하라.

핵심 — 탐욕 + min-heap:
1. 마감 오름차순으로 정렬.
2. min-heap 에 *지금까지 채택한 작업들의 이익* 저장.
3. 각 작업: heap.size < d → 그냥 push. 아니면 heap.top (현재 최소 이익) < 이번 이익 이면 교체.
4. 끝나면 heap 안의 합.

직관: 마감 d 인 작업은 시간 ≤ d 에 끝나야 함 → 마감 시점까지 *최대 d 개* 작업만 가능. 항상 *지금까지 본 작업 중 큰 이익 d 개* 가 최적.

출처: 고전 — Job Sequencing with Deadlines`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ d ≤ N, 1 ≤ p ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n2 100\n1 19\n2 27\n1 25\n3 15", expectedOutput: "142", label: "마감 1 안에 1, 마감 2 안에 2, 3 안에 3 → 100+27+15 = 142" },
        { stdin: "1\n1 50", expectedOutput: "50", label: "작업 1개" },
        { stdin: "3\n1 10\n1 20\n1 30", expectedOutput: "30", label: "마감 모두 1 — 가장 큰 이익만" },
        { stdin: "4\n4 70\n1 80\n1 30\n1 100", expectedOutput: "170", label: "마감 1 안에 100, 마감 4 안에 70 → 170" },
        { stdin: "5\n5 1\n5 2\n5 3\n5 4\n5 5", expectedOutput: "15", label: "모두 마감 5 → 5개 다 가능" },
        { stdin: "3\n2 5\n2 10\n2 7", expectedOutput: "17", label: "마감 모두 2 → 큰 2개 (10 + 7)" },
      ],
      hints: [
        "(deadline, profit) 을 deadline 오름차순으로 정렬.",
        "min-heap 에 채택한 작업 이익. heap.size < d → push. 그 외 heap.top < p → pop + push p.",
        "답 = 끝난 후 heap 안의 모든 이익 합.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    vector<pair<int, long long>> jobs(N);   // (deadline, profit)
    for (int i = 0; i < N; i++) cin >> jobs[i].first >> jobs[i].second;
    sort(jobs.begin(), jobs.end());

    priority_queue<long long, vector<long long>, greater<>> pq;   // min-heap of profits
    for (auto& [d, p] : jobs) {
        if ((int)pq.size() < d) pq.push(p);
        else if (!pq.empty() && pq.top() < p) {
            pq.pop();
            pq.push(p);
        }
    }
    long long total = 0;
    while (!pq.empty()) { total += pq.top(); pq.pop(); }
    cout << total << "\\n";
    return 0;
}`,
      solutionExplanation:
        "탐욕 — 마감 순으로 처리하면 매 시점 *지금까지 채택한 작업 중 최소 이익* 만 보면 됨. heap 크기 ≤ d 유지 (마감 d 안에 가능한 작업 수). 더 좋은 작업 들어오면 가장 약한 거 교체.",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

n = int(input())
jobs = []
for _ in range(n):
    d, p = map(int, input().split())
    jobs.append((d, p))
jobs.sort()

h = []
for d, p in jobs:
    if len(h) < d:
        heapq.heappush(h, p)
    elif h and h[0] < p:
        heapq.heapreplace(h, p)
print(sum(h))
`,
      en: {
        title: "Job Scheduling (Deadline + Profit)",
        description: `N jobs; each has a *deadline* d and *profit* p. A job takes 1 unit of time; at times 1, 2, 3, ... one job runs. Job i pays p if finished by time d.

Print *max total profit*.

Greedy + min-heap:
1. Sort by deadline ascending.
2. min-heap of *selected profits* so far.
3. For each job: if heap.size < d → push. Else if heap.top < p → swap.
4. Sum of heap = answer.

Source: classical (Job Sequencing with Deadlines)`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ d ≤ N, 1 ≤ p ≤ 10^9",
        hints: [
          "Sort by deadline ascending.",
          "Min-heap holds chosen profits. Push if size < d, else swap with the weakest if p > top.",
          "Sum the heap at the end.",
        ],
        solutionExplanation:
          "Greedy: by deadline order, only the weakest selected job matters when deciding to swap. Heap size ≤ d (capacity by deadline d).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. stream Top-K 빈도 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-011",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "어려움",
      title: "stream 에서 가장 자주 나온 K 원소",
      description: `N 개의 정수가 주어진다. *가장 자주 등장한 K 개* 의 값을 빈도 내림차순으로 한 줄에 공백으로 출력하라.

빈도가 같으면 *값이 작은 것 먼저*.

핵심:
1. map / dict 로 빈도 카운트.
2. min-heap 크기 K — 원소 = (빈도, 값). 빈도가 작은 거 (또는 빈도 같고 값이 큰 거) 가 위에 있도록.
3. 새 (빈도, 값) 가 heap.top 보다 좋으면 교체.
4. 끝나면 heap → 정렬해서 출력.

힌트: pair 비교에서 빈도는 큰 게 우선, 값은 작은 게 우선이라 *(-빈도, 값)* 으로 min-heap 하면 자연스럽게 정렬됨.

출처: LeetCode 347 (Top K Frequent) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ 서로 다른 값의 개수, 1 ≤ 각 값 ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "9 2\n1 1 1 2 2 3 3 3 3", expectedOutput: "3 1", label: "3 (4회), 1 (3회) → 3 1" },
        { stdin: "5 1\n1 2 3 4 5", expectedOutput: "1", label: "전부 1회 — 값 작은 거 우선" },
        { stdin: "6 3\n5 5 4 4 3 3", expectedOutput: "3 4 5", label: "동률 — 값 오름순" },
        { stdin: "1 1\n42", expectedOutput: "42", label: "N=1" },
        { stdin: "8 2\n7 7 7 1 1 9 9 9", expectedOutput: "7 9", label: "7 (3), 9 (3) — 동률 → 값 작은 7 먼저" },
        { stdin: "10 3\n1 1 2 2 3 3 4 4 5 5", expectedOutput: "1 2 3", label: "전부 2회 동률 → 작은 값 3 개" },
      ],
      hints: [
        "1단계: unordered_map<int,int> 으로 (값 → 빈도) 누적.",
        "2단계: min-heap 크기 K. 비교 기준 — (빈도 작은 거 위, 동률이면 값 큰 거 위).",
        "3단계: heap 내용을 vector 로 빼서 (빈도 내림, 값 오름) 정렬 후 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, K;
    cin >> N >> K;
    unordered_map<int,int> cnt;
    for (int i = 0; i < N; i++) { int v; cin >> v; cnt[v]++; }

    // min-heap: (빈도 작은 거, 값 큰 거) 가 위
    // pair<int,int> = (빈도, -값) 으로 저장해 자연스러운 비교 활용
    using T = pair<int,int>;
    priority_queue<T, vector<T>, greater<>> pq;
    for (auto& [v, c] : cnt) {
        pq.push({c, -v});
        if ((int)pq.size() > K) pq.pop();
    }
    vector<pair<int,int>> res;   // (빈도, 값)
    while (!pq.empty()) {
        auto [c, negv] = pq.top(); pq.pop();
        res.push_back({c, -negv});
    }
    // 출력 정렬: 빈도 내림, 값 오름
    sort(res.begin(), res.end(), [](auto& a, auto& b) {
        if (a.first != b.first) return a.first > b.first;
        return a.second < b.second;
    });
    string out;
    for (size_t i = 0; i < res.size(); i++) {
        if (i) out += ' ';
        out += to_string(res[i].second);
    }
    out += '\\n';
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "Top-K frequent — 1) 카운트 2) min-heap 크기 K 로 *약한 후보* 만 위에 두고 비교/교체 3) 최종 출력 정렬. 비교 기준이 두 차원 (빈도 + 값) 이라 pair 트릭 (값을 음수로) 으로 자연스럽게.",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
from collections import Counter
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq
from collections import Counter

n, k = map(int, input().split())
arr = list(map(int, input().split()))
cnt = Counter(arr)

# min-heap: (빈도, -값) — 빈도 작은 거 위, 동률이면 -값 작은 거 (= 값 큰 거) 위
h = []
for v, c in cnt.items():
    heapq.heappush(h, (c, -v))
    if len(h) > k:
        heapq.heappop(h)

# 최종 정렬: 빈도 내림, 값 오름
res = [(c, -negv) for c, negv in h]
res.sort(key=lambda x: (-x[0], x[1]))
print(" ".join(str(v) for _, v in res))
`,
      en: {
        title: "Top-K Most Frequent",
        description: `Given N integers, print the *K most frequent* values in descending frequency. Ties broken by *smaller value first*.

Steps:
1. Count frequencies (map / dict).
2. Min-heap of size K with entries (freq, value) — weakest candidate on top.
3. Sort final result by (freq desc, value asc).

Source: LeetCode 347 paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ distinct count, 1 ≤ each value ≤ 100,000",
        hints: [
          "Step 1: map<int,int> for counts.",
          "Step 2: min-heap of size K; comparison is (lower freq first, then larger value first).",
          "Step 3: sort final K by (freq desc, value asc).",
        ],
        solutionExplanation:
          "Top-K frequent — count, then size-K min-heap keeps the weakest candidate on top for fast compare/swap. Two-dimensional ordering handled via pair (freq, -value).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 트리 다중 합치기 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "apq-012",
      cluster: "algo-priorityqueue-contest",
      unlockAfter: "algo-priorityqueue",
      difficulty: "어려움",
      title: "그룹 합치기 (트리 비용 최소화)",
      description: `N 개의 그룹 크기가 주어진다. 매 단계마다 *가장 작은 두 그룹* 을 골라 하나로 합친다. 합치는 비용 = 두 그룹 크기의 합. 모두 한 그룹이 될 때까지 — *총 비용을 최소화* 하라.

apq-005 의 일반화: Huffman 코딩 / Optimal Merge Pattern. 매 단계 작은 둘만 합치는 게 *증명 가능한 최적*.

값이 매우 크고 N 도 크기 때문에 — heap + long long 필수.

apq-005 와 의도적으로 동일한 알고리즘이지만, 입력 크기와 값 범위를 키워 *왜 heap O(N log N) 이 필요한지* 체감.

출처: 원본 / Huffman 의 일반형 (BOJ 1715 의 큰 버전)`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ 각 그룹 크기 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4\n1 2 3 4", expectedOutput: "19", label: "apq-005 같음 (장소 옮김)" },
        { stdin: "1\n100", expectedOutput: "0", label: "N=1 — 합칠 게 없음" },
        { stdin: "2\n7 3", expectedOutput: "10", label: "두 그룹" },
        { stdin: "5\n1000000000 1000000000 1000000000 1000000000 1000000000", expectedOutput: "12000000000", label: "큰 값 — long long 필수" },
        { stdin: "6\n5 4 8 2 3 9", expectedOutput: "76", label: "여러 그룹 (Huffman)" },
        { stdin: "3\n1000000000 1000000000 1000000000", expectedOutput: "5000000000", label: "10억 × 3 → 50억 (int overflow!)" },
      ],
      hints: [
        "min-heap. pop 2 → 합 + 비용 누적 → push 합.",
        "비용 합과 그룹 크기 합 모두 long long 이상 필요 (10^9 × 10^5 → 10^14 가능).",
        "단순 *매번 정렬* 은 O(N² log N) — N=10^5 에 비실용. heap O(N log N) 만 통과.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    priority_queue<long long, vector<long long>, greater<>> pq;
    for (int i = 0; i < N; i++) {
        long long x; cin >> x;
        pq.push(x);
    }
    long long total = 0;
    while (pq.size() >= 2) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        long long s = a + b;
        total += s;
        pq.push(s);
    }
    cout << total << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Huffman 의 큰 케이스 — 알고리즘은 apq-005 와 동일하지만 N=10^5, 값=10^9 라 heap 의 효율 (O(N log N)) 이 결정적. 매번 sort/scan 으론 못 통과. 합 누적은 반드시 long long.",
      pyInitialCode: `import sys
input = sys.stdin.readline
import heapq
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
import heapq

n = int(input())
arr = list(map(int, input().split()))
heapq.heapify(arr)
total = 0
while len(arr) >= 2:
    a = heapq.heappop(arr)
    b = heapq.heappop(arr)
    s = a + b
    total += s
    heapq.heappush(arr, s)
print(total)
`,
      en: {
        title: "Merge Groups (Optimal Total Cost)",
        description: `N group sizes. Repeatedly merge the *two smallest* groups; merge cost = sum of their sizes. Minimize the *total cost* until one group remains.

Same algorithm as apq-005, but bigger N (up to 10^5) and bigger values (up to 10^9) — to feel why O(N log N) heap matters and why long long is mandatory.

Source: original / Huffman general form`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ each group size ≤ 10^9",
        hints: [
          "Min-heap. Pop two → sum + accumulate cost → push sum.",
          "Use long long (cost can reach 10^14+).",
          "Sorting/scanning each step is O(N² log N) — only heap O(N log N) passes.",
        ],
        solutionExplanation:
          "Big-input Huffman — same algorithm as apq-005, but here the heap's O(N log N) and long long arithmetic both become non-negotiable.",
      },
    },
  ],
}
