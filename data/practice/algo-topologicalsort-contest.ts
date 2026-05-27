import type { PracticeCluster } from "./types"

export const topologicalSortContestCluster: PracticeCluster = {
  id: "algo-topologicalsort-contest",
  title: "위상 정렬 문제 풀이",
  emoji: "📐",
  description: "DAG 에서 선행 → 후행 순서 뽑기 — Kahn's, DFS post-order, 사이클 검출, 위상 + DP",
  unlockAfter: "algo-topologicalsort",
  en: {
    title: "Topological Sort Practice",
    description: "Pull prerequisite → dependent order from DAG — Kahn's, DFS post-order, cycle detection, topo + DP",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. 줄세우기 (BOJ 2252) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-001",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "보통",
      title: "줄세우기 (Kahn's 기본)",
      description: `N 명의 학생을 일렬로 세우려고 한다. 일부 학생들 사이에는 키 비교 결과 (A 가 B 보다 앞) 가 M 개 주어진다. 가능한 *어떤 줄* 이든 한 줄 출력하라.

입력:
- 첫 줄: \`N M\`
- 다음 M 줄: \`A B\` (A 가 B 의 앞)

출력: 학생 번호를 한 줄에 공백으로 구분.

답이 여러 개면 같은 in-degree=0 일 때 *번호 작은 것 먼저* 처리해 결정적으로 출력. (테스트는 이 규칙으로 검증)

출처: BOJ 2252 paraphrased`,
      constraints: "1 ≤ N ≤ 32000, 0 ≤ M ≤ 100000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 2\n1 3\n2 3", expectedOutput: "1 2 3", label: "1<3, 2<3 — 1,2 번 in-deg 0" },
        { stdin: "4 2\n4 2\n3 1", expectedOutput: "3 1 4 2", label: "3,4 번 in-deg 0 — 작은 번호 먼저" },
        { stdin: "1 0", expectedOutput: "1", label: "단일 노드" },
        { stdin: "5 4\n1 2\n2 3\n3 4\n4 5", expectedOutput: "1 2 3 4 5", label: "체인" },
        { stdin: "5 0", expectedOutput: "1 2 3 4 5", label: "에지 없음 — 번호순" },
        { stdin: "6 4\n1 4\n5 4\n4 3\n2 3", expectedOutput: "1 2 5 4 3 6", label: "1,2,5,6 모두 in-deg 0" },
      ],
      hints: [
        "Kahn's 알고리즘 — in-degree 배열 + 큐.",
        "동률일 때 번호 작은 것 먼저 → priority_queue (min-heap) 또는 set 사용.",
        "출력: 처리 순서대로 공백 구분.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        indeg[b]++;
    }

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) pq.push(i);

    bool first = true;
    while (!pq.empty()) {
        int u = pq.top(); pq.pop();
        if (!first) cout << ' ';
        cout << u;
        first = false;
        for (int v : adj[u]) {
            if (--indeg[v] == 0) pq.push(v);
        }
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Kahn's 알고리즘의 가장 깔끔한 형태. min-heap (priority_queue + greater) 으로 동률일 때 번호 작은 것 먼저 처리하면 출력이 결정적. 시간 O((N+M) log N).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
import heapq
from collections import defaultdict
input = sys.stdin.readline

n, m = map(int, input().split())
adj = defaultdict(list)
indeg = [0] * (n + 1)
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    indeg[b] += 1

heap = [i for i in range(1, n + 1) if indeg[i] == 0]
heapq.heapify(heap)
result = []
while heap:
    u = heapq.heappop(heap)
    result.append(u)
    for v in adj[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            heapq.heappush(heap, v)

print(*result)
`,
      en: {
        title: "Line up (Kahn's basic)",
        description: `Line up N students. M comparisons "A is before B" are given. Print *any one valid order*.

Input:
- First line: \`N M\`
- Next M lines: \`A B\` (A is before B)

Output: student numbers on one line separated by spaces.

When multiple are valid, process *smaller numbers first* among in-degree=0 nodes — tests verify with this rule.

Source: BOJ 2252 paraphrased`,
        constraints: "1 ≤ N ≤ 32000, 0 ≤ M ≤ 100000",
        hints: [
          "Kahn's algorithm — in-degree array + queue.",
          "Tie-break by smaller number → use priority_queue (min-heap) or set.",
          "Print in processing order, space-separated.",
        ],
        solutionExplanation:
          "Cleanest Kahn's. Min-heap ensures smaller numbers come out first when tied, making output deterministic. O((N+M) log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 작업 순서 출력 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-002",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "보통",
      title: "작업 순서 (한 줄 출력)",
      description: `N 개의 작업이 있고, 일부 작업은 다른 작업이 끝나야 시작할 수 있다 (선행 조건). M 개의 (선행, 후행) 쌍이 주어질 때, 모든 작업을 끝낼 수 있는 *작업 순서* 를 출력하라.

같은 단계에 여러 작업이 가능하면 *번호 작은 것 먼저* 처리.

출력: 한 줄에 작업 번호들을 공백으로.

출처: 원본 (Kahn's 패턴 변형 + 출력 형식)`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ N*(N-1)/2 (DAG 보장)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 3\n1 2\n2 3\n3 4", expectedOutput: "1 2 3 4", label: "선형 체인" },
        { stdin: "5 4\n1 3\n2 3\n3 5\n4 5", expectedOutput: "1 2 3 4 5", label: "두 갈래 합류" },
        { stdin: "3 0", expectedOutput: "1 2 3", label: "독립 작업" },
        { stdin: "6 5\n1 2\n1 3\n2 4\n3 4\n4 5", expectedOutput: "1 2 3 4 5 6", label: "6 은 독립" },
        { stdin: "2 1\n2 1", expectedOutput: "2 1", label: "2 → 1" },
        { stdin: "7 6\n1 2\n1 3\n2 4\n3 4\n4 5\n4 6", expectedOutput: "1 2 3 4 5 6 7", label: "분기 + 독립" },
      ],
      hints: [
        "atop-001 과 거의 동일 — Kahn's + min-heap.",
        "동률 시 번호 작은 것 우선.",
        "선행/후행 방향을 헷갈리지 말 것: (a, b) = 'a 가 b 의 선행' 이므로 a → b 에지.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        indeg[b]++;
    }

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) pq.push(i);

    vector<int> result;
    while (!pq.empty()) {
        int u = pq.top(); pq.pop();
        result.push_back(u);
        for (int v : adj[u])
            if (--indeg[v] == 0) pq.push(v);
    }

    for (int i = 0; i < (int)result.size(); i++) {
        if (i) cout << ' ';
        cout << result[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Kahn's + min-heap. 결과를 벡터에 모아 한 줄 출력. atop-001 과 본질적으로 같지만 입력 형식과 작업 개념을 분리해서 익숙해지는 게 목적.",
      pyInitialCode: `import sys
import heapq
from collections import defaultdict
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
import heapq
from collections import defaultdict
input = sys.stdin.readline

n, m = map(int, input().split())
adj = defaultdict(list)
indeg = [0] * (n + 1)
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    indeg[b] += 1

heap = [i for i in range(1, n + 1) if indeg[i] == 0]
heapq.heapify(heap)
result = []
while heap:
    u = heapq.heappop(heap)
    result.append(u)
    for v in adj[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            heapq.heappush(heap, v)

print(*result)
`,
      en: {
        title: "Task Order (single line)",
        description: `N tasks; some tasks require others to finish first (prerequisites). Given M prerequisite pairs (a, b) meaning a is before b, print a valid task order.

When multiple are possible, use *smaller numbers first* among in-degree=0 nodes.

Output: task numbers space-separated on one line.

Source: original (Kahn's pattern variant)`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ N*(N-1)/2 (DAG guaranteed)",
        hints: [
          "Almost identical to atop-001 — Kahn's + min-heap.",
          "Tie-break by smaller number.",
          "Direction: (a, b) means a before b → edge a → b.",
        ],
        solutionExplanation:
          "Kahn's + min-heap. Collect into a vector and print as one line. Practically the same as atop-001 — repetition builds the pattern.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 선수 과목 (DFS 기반) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-003",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "보통",
      title: "선수 과목 수강 순서 (DFS 기반)",
      description: `N 개의 과목과 M 개의 선수 조건이 주어진다. (선수, 후속) 쌍이 입력으로 들어온다. **DFS 기반** 위상 정렬로 수강 순서를 출력하라.

DFS 시작 노드는 *번호 작은 노드부터* 호출 (visited 검사). 각 DFS 안에서도 인접 노드는 *번호 오름차순* 으로 방문.

출력: 과목 번호들을 한 줄에 공백으로 구분.

출처: 원본 (DFS post-order 학습용)`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ 10000 (DAG)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 3\n1 2\n2 3\n3 4", expectedOutput: "1 2 3 4", label: "선형" },
        { stdin: "5 4\n1 2\n1 3\n2 4\n3 4", expectedOutput: "5 1 3 2 4", label: "다이아몬드 + 독립" },
        { stdin: "3 0", expectedOutput: "3 2 1", label: "독립 (DFS 종료 순서의 역)" },
        { stdin: "6 5\n1 2\n3 2\n2 4\n5 4\n4 6", expectedOutput: "5 3 1 2 4 6", label: "다중 선행" },
        { stdin: "2 1\n2 1", expectedOutput: "2 1", label: "역방향" },
      ],
      hints: [
        "DFS(u): visited[u]=true, 인접 노드(오름차순) 모두 DFS → 함수 *끝에* result.push_back(u).",
        "외부 루프: i=1..N 에 대해 !visited[i] 이면 DFS(i).",
        "끝나면 result 를 reverse() 후 출력.",
        "인접 리스트를 정렬해두면 인접 방문 순서 보장.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<vector<int>> adj;
vector<bool> visited;
vector<int> result;

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v);
    }
    result.push_back(u);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> n >> m;
    adj.assign(n + 1, {});
    visited.assign(n + 1, false);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
    }
    for (int i = 1; i <= n; i++) sort(adj[i].begin(), adj[i].end());

    for (int i = 1; i <= n; i++)
        if (!visited[i]) dfs(i);

    reverse(result.begin(), result.end());
    for (int i = 0; i < (int)result.size(); i++) {
        if (i) cout << ' ';
        cout << result[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "DFS post-order 의 역순 = 위상 순서. 함수 *끝* 에서 push_back 하는 것이 핵심. 외부 루프로 모든 시작점을 cover, 인접 리스트 정렬로 결정적 출력. 시간 O(V+E).",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import defaultdict
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n, m = map(int, input().split())
adj = defaultdict(list)
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
for k in adj:
    adj[k].sort()

visited = [False] * (n + 1)
result = []

def dfs(u):
    visited[u] = True
    for v in adj[u]:
        if not visited[v]:
            dfs(v)
    result.append(u)

for i in range(1, n + 1):
    if not visited[i]:
        dfs(i)

result.reverse()
print(*result)
`,
      en: {
        title: "Course Prerequisites (DFS-based)",
        description: `N courses with M prerequisite pairs. Use **DFS-based** topological sort to print a course order.

DFS start nodes: in increasing order (with visited[] check). Inside DFS, visit neighbors in *ascending order*.

Output: course numbers space-separated on one line.

Source: original (DFS post-order practice)`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ 10000 (DAG)",
        hints: [
          "DFS(u): mark visited, recurse on neighbors (sorted), then push to result at the *end*.",
          "Outer loop: i=1..N, if not visited[i] then DFS(i).",
          "After all: reverse the result.",
          "Sort the adjacency lists to make neighbor order deterministic.",
        ],
        solutionExplanation:
          "Reverse of DFS post-order = topo order. push_back must be at the *end* of the function. Outer loop covers all starting points; sorted adjacency gives deterministic output. O(V+E).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 가능한 위상 순서 개수 (백트래킹) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-004",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "보통",
      title: "가능한 위상 순서 개수",
      description: `N 개의 노드와 M 개의 선행 조건이 주어진다. *서로 다른* 위상 순서가 몇 가지나 가능한지 출력하라.

방법 — 백트래킹 변형 Kahn's: 매 단계에서 in-degree=0 인 노드 *중 하나* 를 골라 진행. 어느 노드를 고르냐의 분기 수를 모두 세면 됨.

N ≤ 10 보장 — 최악도 10! ≈ 360만 안에서 끝남.

출처: 원본 (Kahn's + 백트래킹 합성)`,
      constraints: "1 ≤ N ≤ 10, 0 ≤ M ≤ 30 (DAG)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 0", expectedOutput: "6", label: "독립 — 3! = 6" },
        { stdin: "3 2\n1 2\n2 3", expectedOutput: "1", label: "강한 체인 — 유일" },
        { stdin: "4 2\n1 2\n3 4", expectedOutput: "6", label: "두 독립 체인 — C(4,2)=6" },
        { stdin: "4 3\n1 2\n1 3\n1 4", expectedOutput: "6", label: "1 먼저 후 3! = 6" },
        { stdin: "1 0", expectedOutput: "1", label: "단일 노드" },
        { stdin: "2 0", expectedOutput: "2", label: "둘 독립" },
        { stdin: "5 4\n1 2\n2 3\n3 4\n4 5", expectedOutput: "1", label: "체인 5" },
        { stdin: "4 0", expectedOutput: "24", label: "4! = 24" },
      ],
      hints: [
        "DFS 안에서 'in-degree=0 인 후보들' 을 매번 모아 하나씩 고름.",
        "고를 때마다 결과 -- 진행 → 재귀 → 복원 (백트래킹).",
        "leaf (다 처리) 에 도달하면 카운터 +1.",
        "N ≤ 10 이므로 visited 비트마스크로 짜도 OK.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<vector<int>> adj;
vector<int> indeg;
long long count_ways = 0;

void backtrack(int placed) {
    if (placed == n) {
        count_ways++;
        return;
    }
    // 현재 in-degree 0 인 모든 후보를 시도
    vector<int> candidates;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) candidates.push_back(i);
    for (int u : candidates) {
        indeg[u] = -1;  // 처리됨 표시 (다시 0 으로 안 잡히게)
        for (int v : adj[u]) indeg[v]--;
        backtrack(placed + 1);
        for (int v : adj[u]) indeg[v]++;
        indeg[u] = 0;   // 복원
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> n >> m;
    adj.assign(n + 1, {});
    indeg.assign(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        indeg[b]++;
    }
    backtrack(0);
    cout << count_ways << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Kahn's 의 큐 대신 '현재 가능한 후보 전부' 를 백트래킹으로 분기. N ≤ 10 보장이라 가능. indeg=-1 트릭으로 처리된 노드 표시 후 복원. 시간 O(가능한 순서 수 × N).",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n, m = map(int, input().split())
adj = [[] for _ in range(n + 1)]
indeg = [0] * (n + 1)
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    indeg[b] += 1

count_ways = 0

def backtrack(placed):
    global count_ways
    if placed == n:
        count_ways += 1
        return
    candidates = [i for i in range(1, n + 1) if indeg[i] == 0]
    for u in candidates:
        indeg[u] = -1
        for v in adj[u]:
            indeg[v] -= 1
        backtrack(placed + 1)
        for v in adj[u]:
            indeg[v] += 1
        indeg[u] = 0

backtrack(0)
print(count_ways)
`,
      en: {
        title: "Count Topological Orders",
        description: `Given N nodes and M prerequisite edges, output the number of *distinct* valid topological orders.

Approach — Kahn's + backtracking: at each step, branch over *all* in-degree=0 candidates.

N ≤ 10 — at worst 10! ≈ 3.6M.

Source: original (Kahn's + backtracking)`,
        constraints: "1 ≤ N ≤ 10, 0 ≤ M ≤ 30 (DAG)",
        hints: [
          "Inside DFS, collect every in-degree=0 candidate and try each.",
          "Mark as taken, decrement neighbors, recurse, restore (backtracking).",
          "Leaf (all placed) → increment counter.",
          "N ≤ 10 — could also use bitmask visited.",
        ],
        solutionExplanation:
          "Branch over all current candidates instead of using a queue. N ≤ 10 keeps it feasible. indeg=-1 trick marks taken; restore after recursion.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 사이클 검출 (DAG 인가?) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-005",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "보통",
      title: "DAG 검사 (사이클이 있는가?)",
      description: `방향 그래프가 주어진다. **DAG 인지 (사이클이 없는지)** 판정해 \`YES\` 또는 \`NO\` 출력.

방법: Kahn's 알고리즘 돌려 결과 리스트 길이를 N 과 비교. 같으면 DAG, 작으면 사이클.

출처: 원본 (사이클 검출 — Kahn's 응용)`,
      constraints: "1 ≤ N ≤ 10000, 0 ≤ M ≤ 100000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 3\n1 2\n2 3\n3 1", expectedOutput: "NO", label: "3-사이클" },
        { stdin: "3 2\n1 2\n2 3", expectedOutput: "YES", label: "체인 DAG" },
        { stdin: "1 0", expectedOutput: "YES", label: "단일 노드" },
        { stdin: "2 2\n1 2\n2 1", expectedOutput: "NO", label: "2-사이클" },
        { stdin: "5 5\n1 2\n2 3\n3 4\n4 5\n5 3", expectedOutput: "NO", label: "꼬리 + 사이클" },
        { stdin: "4 4\n1 2\n2 3\n3 4\n1 4", expectedOutput: "YES", label: "교차 있어도 DAG" },
        { stdin: "6 6\n1 2\n2 3\n4 5\n5 6\n3 1\n6 4", expectedOutput: "NO", label: "두 개의 분리 사이클" },
      ],
      hints: [
        "Kahn's 알고리즘 그대로 실행.",
        "결과 리스트 크기 < N → 사이클 → NO.",
        "= N → DAG → YES.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        indeg[b]++;
    }

    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) q.push(i);

    int processed = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        processed++;
        for (int v : adj[u])
            if (--indeg[v] == 0) q.push(v);
    }

    cout << (processed == n ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "사이클 검출의 가장 직관적인 방법 — Kahn's 끝까지 돌리고 처리된 노드 수 비교. 사이클 안의 노드들은 영원히 in-degree 0 이 안 되어 큐에 못 들어감. O(V+E).",
      pyInitialCode: `import sys
from collections import deque, defaultdict
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque, defaultdict
input = sys.stdin.readline

n, m = map(int, input().split())
adj = defaultdict(list)
indeg = [0] * (n + 1)
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    indeg[b] += 1

q = deque(i for i in range(1, n + 1) if indeg[i] == 0)
processed = 0
while q:
    u = q.popleft()
    processed += 1
    for v in adj[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            q.append(v)

print("YES" if processed == n else "NO")
`,
      en: {
        title: "Is it a DAG? (Cycle Detection)",
        description: `Given a directed graph, determine if it is a **DAG (no cycle)**. Print \`YES\` or \`NO\`.

Method: run Kahn's, compare processed count to N. Equal → DAG, less → cycle.

Source: original (Kahn's-based cycle detection)`,
        constraints: "1 ≤ N ≤ 10000, 0 ≤ M ≤ 100000",
        hints: [
          "Run Kahn's normally.",
          "Processed count < N → cycle → NO.",
          "= N → DAG → YES.",
        ],
        solutionExplanation:
          "Most direct cycle test — run Kahn's, count processed. Cycle members never hit in-degree 0 so they never enter the queue. O(V+E).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 강의 시간표 만들기 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-006",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "보통",
      title: "강의 시간표 (학기 번호 출력)",
      description: `N 개의 강의가 있다. 일부 강의는 다른 강의가 선수 조건이다. 가장 빨리 들을 수 있다고 했을 때 각 강의가 *몇 번째 학기* 에 들을 수 있는지 출력하라.

규칙:
- 선수 조건이 없으면 1 학기.
- 그렇지 않으면 모든 선수 조건의 학기 + 1.

출력: 1 번 강의부터 N 번 강의까지의 학기 번호를 한 줄에 공백으로.

출처: 원본 (위상 정렬 + 단계 계산 — DP 입문)`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ 10000 (DAG 보장)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 3\n1 2\n2 3\n3 4", expectedOutput: "1 2 3 4", label: "체인" },
        { stdin: "5 4\n1 3\n2 3\n3 5\n4 5", expectedOutput: "1 1 2 1 3", label: "분기 후 합류" },
        { stdin: "3 0", expectedOutput: "1 1 1", label: "독립" },
        { stdin: "6 5\n1 2\n1 3\n2 4\n3 4\n4 5", expectedOutput: "1 2 2 3 4 1", label: "다이아몬드 + 독립" },
        { stdin: "1 0", expectedOutput: "1", label: "단일 강의" },
        { stdin: "5 5\n1 2\n2 3\n1 4\n4 3\n3 5", expectedOutput: "1 2 3 2 4", label: "복잡한 패턴" },
      ],
      hints: [
        "Kahn's 돌리면서 \`sem[v] = max(sem[v], sem[u] + 1)\` 로 학기 갱신.",
        "처음엔 모든 노드 sem=1.",
        "큐에서 u 꺼낼 때 u 의 sem 이 확정됨 — 그때 이웃의 sem 갱신.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    vector<int> sem(n + 1, 1);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        indeg[b]++;
    }

    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) q.push(i);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            sem[v] = max(sem[v], sem[u] + 1);
            if (--indeg[v] == 0) q.push(v);
        }
    }

    for (int i = 1; i <= n; i++) {
        if (i > 1) cout << ' ';
        cout << sem[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "위상 정렬 위에 DP — 'sem[v] = 모든 선수 sem 의 최댓값 + 1'. Kahn's 가 노드를 *선수 다 끝난 후* 처리하므로 그때 sem 갱신하면 됨. 위상 + DP 의 가장 간단한 예. O(V+E).",
      pyInitialCode: `import sys
from collections import deque, defaultdict
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque, defaultdict
input = sys.stdin.readline

n, m = map(int, input().split())
adj = defaultdict(list)
indeg = [0] * (n + 1)
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    indeg[b] += 1

sem = [1] * (n + 1)
q = deque(i for i in range(1, n + 1) if indeg[i] == 0)
while q:
    u = q.popleft()
    for v in adj[u]:
        if sem[u] + 1 > sem[v]:
            sem[v] = sem[u] + 1
        indeg[v] -= 1
        if indeg[v] == 0:
            q.append(v)

print(*sem[1:])
`,
      en: {
        title: "Class Schedule (semester number)",
        description: `N courses with prerequisite relations. For each course, print the earliest semester in which it can be taken.

Rule:
- No prerequisites → semester 1.
- Otherwise: max(prerequisite semesters) + 1.

Output: semester numbers for courses 1..N on one line.

Source: original (topo + DP intro)`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ 10000 (DAG)",
        hints: [
          "During Kahn's, update \`sem[v] = max(sem[v], sem[u] + 1)\`.",
          "Initialize sem[i] = 1 for all i.",
          "Update sem[v] for each edge as Kahn's processes u.",
        ],
        solutionExplanation:
          "Topo + DP — 'sem[v] = max over prerequisites + 1'. Kahn's processes u *after* all prerequisites, so update sem[v] when relaxing the edge. Simplest topo + DP example. O(V+E).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 최소 작업 시간 (BOJ 2056 simplified) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-007",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "어려움",
      title: "최소 작업 완료 시간 (위상 + DP)",
      description: `N 개의 작업이 있고 각 작업 i 는 처리 시간 \`time[i]\` 와 선행 작업 목록을 갖는다. 모든 작업을 *병렬* 로 (선행이 다 끝나는 즉시 시작) 처리할 때 *마지막 작업이 끝나는 시간* 의 최솟값을 출력하라.

입력 형식:
- 첫 줄: \`N\`
- 다음 N 줄: 작업 i 의 정보. \`t k p1 p2 ... pk\` — 처리 시간 t, 선행 개수 k, 선행 작업 번호들.

출력: 정수 1 개 — 최소 완료 시간.

출처: BOJ 2056 paraphrased`,
      constraints: "1 ≤ N ≤ 10000, 1 ≤ time[i] ≤ 100, DAG 보장",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\n5 0\n3 1 1\n4 1 2", expectedOutput: "12", label: "선형: 5+3+4=12" },
        { stdin: "4\n3 0\n5 0\n2 2 1 2\n4 1 3", expectedOutput: "11", label: "병렬: max(3,5)+2+4=11" },
        { stdin: "1\n7 0", expectedOutput: "7", label: "단일 작업" },
        { stdin: "5\n1 0\n1 1 1\n1 1 2\n1 1 3\n1 1 4", expectedOutput: "5", label: "긴 체인" },
        { stdin: "6\n2 0\n3 0\n4 0\n1 3 1 2 3\n5 1 4\n2 1 5", expectedOutput: "12", label: "다중 선행 합류" },
        { stdin: "3\n10 0\n10 0\n10 0", expectedOutput: "10", label: "완전 독립 — max" },
      ],
      hints: [
        "위상 정렬 위에서 DP: finish[v] = max(finish[v], finish[u] + time[v]) ← u 가 v 의 선행일 때.",
        "처음엔 finish[i] = time[i] (선행 없는 노드의 종료 시간).",
        "정답 = max(finish[1..N]).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> taskTime(n + 1);
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        int t, k;
        cin >> t >> k;
        taskTime[i] = t;
        for (int j = 0; j < k; j++) {
            int p;
            cin >> p;
            adj[p].push_back(i);
            indeg[i]++;
        }
    }

    vector<long long> finish(n + 1, 0);
    queue<int> q;
    for (int i = 1; i <= n; i++) {
        if (indeg[i] == 0) {
            finish[i] = taskTime[i];
            q.push(i);
        }
    }

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            finish[v] = max(finish[v], finish[u] + taskTime[v]);
            if (--indeg[v] == 0) q.push(v);
        }
    }

    long long ans = 0;
    for (int i = 1; i <= n; i++) ans = max(ans, finish[i]);
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "atop-006 의 확장 — 학기 수 대신 finish[v] = max(finish[u] + time[v]) 로 DP. Kahn's 가 노드를 모든 선행 처리 후에 보장하므로 자연스럽게 DP 가 성립. 위상 + DP 의 표준 형태. O(V+E).",
      pyInitialCode: `import sys
from collections import deque, defaultdict
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque, defaultdict
input = sys.stdin.readline

n = int(input())
task_time = [0] * (n + 1)
adj = defaultdict(list)
indeg = [0] * (n + 1)
for i in range(1, n + 1):
    parts = list(map(int, input().split()))
    t, k = parts[0], parts[1]
    task_time[i] = t
    for p in parts[2:2 + k]:
        adj[p].append(i)
        indeg[i] += 1

finish = [0] * (n + 1)
q = deque()
for i in range(1, n + 1):
    if indeg[i] == 0:
        finish[i] = task_time[i]
        q.append(i)

while q:
    u = q.popleft()
    for v in adj[u]:
        if finish[u] + task_time[v] > finish[v]:
            finish[v] = finish[u] + task_time[v]
        indeg[v] -= 1
        if indeg[v] == 0:
            q.append(v)

print(max(finish[1:]))
`,
      en: {
        title: "Minimum Completion Time (Topo + DP)",
        description: `N tasks; each task i has time \`time[i]\` and a list of prerequisite tasks. When tasks run *in parallel* (start immediately when prerequisites finish), output the minimum time at which the *last* task completes.

Input:
- First line: \`N\`
- Next N lines: \`t k p1 p2 ... pk\` for task i — time t, k prerequisites, prereq IDs.

Output: a single integer.

Source: BOJ 2056 paraphrased`,
        constraints: "1 ≤ N ≤ 10000, 1 ≤ time[i] ≤ 100, DAG",
        hints: [
          "Topo + DP: finish[v] = max(finish[v], finish[u] + time[v]) when u is prereq of v.",
          "Initialize finish[i] = time[i] for prereq-free i.",
          "Answer = max(finish[1..N]).",
        ],
        solutionExplanation:
          "Extension of atop-006 — instead of semester number, finish[v] = max(finish[u] + time[v]). Kahn's processes after all prerequisites, so DP is valid. Standard topo + DP. O(V+E).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 게임 개발 (BOJ 1516) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-008",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "어려움",
      title: "건물 짓기 (각 건물의 최소 시간)",
      description: `N 개의 건물을 짓는다. 각 건물 i 는 짓는 데 \`time[i]\` 가 걸리고, 일부 건물이 선행으로 필요하다. *병렬* 로 진행할 때 각 건물 i 가 완성되는 *가장 빠른 시점* 을 1~N 번 순서로 한 줄에 하나씩 출력하라.

입력 형식:
- 첫 줄: \`N\`
- 다음 N 줄: 건물 i 의 정보. \`t p1 p2 ... -1\` — time t, 선행 건물 번호들, -1 로 끝.

출력: N 줄. i 번째 줄에 건물 i 의 최소 완성 시간.

출처: BOJ 1516 paraphrased (각 건물별 시간 출력)`,
      constraints: "1 ≤ N ≤ 500, 1 ≤ time[i] ≤ 100000, DAG",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\n5 -1\n3 1 -1\n4 2 -1", expectedOutput: "5\n8\n12", label: "선형" },
        { stdin: "4\n3 -1\n5 -1\n2 1 2 -1\n4 3 -1", expectedOutput: "3\n5\n7\n11", label: "병합 후 단일" },
        { stdin: "1\n7 -1", expectedOutput: "7", label: "단일 건물" },
        { stdin: "5\n10 -1\n10 1 -1\n10 1 -1\n10 2 3 -1\n10 4 -1", expectedOutput: "10\n20\n20\n30\n40", label: "다이아몬드 + 연장" },
        { stdin: "6\n1 -1\n2 -1\n3 -1\n5 1 2 -1\n6 2 3 -1\n7 4 5 -1", expectedOutput: "1\n2\n3\n7\n9\n16", label: "복합" },
      ],
      hints: [
        "atop-007 과 동일한 구조 — 출력만 각 건물별로.",
        "finish[i] = time[i] + max(선행 finish), 선행 없으면 time[i] 그대로.",
        "Kahn's 로 위상 순서 진행하면서 finish 갱신.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> taskTime(n + 1);
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        cin >> taskTime[i];
        int p;
        while (cin >> p && p != -1) {
            adj[p].push_back(i);
            indeg[i]++;
        }
    }

    vector<long long> finish(n + 1, 0);
    queue<int> q;
    for (int i = 1; i <= n; i++) {
        if (indeg[i] == 0) {
            finish[i] = taskTime[i];
            q.push(i);
        }
    }

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            finish[v] = max(finish[v], finish[u] + taskTime[v]);
            if (--indeg[v] == 0) q.push(v);
        }
    }

    for (int i = 1; i <= n; i++) cout << finish[i] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "atop-007 의 출력 변형 — 각 건물별 finish 시간을 모두 출력. 입력 형식 (선행 목록 -1 로 종료) 만 다르고 알고리즘은 동일.",
      pyInitialCode: `import sys
from collections import deque, defaultdict
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque, defaultdict
input = sys.stdin.readline

n = int(input())
task_time = [0] * (n + 1)
adj = defaultdict(list)
indeg = [0] * (n + 1)
for i in range(1, n + 1):
    parts = list(map(int, input().split()))
    task_time[i] = parts[0]
    for p in parts[1:]:
        if p == -1:
            break
        adj[p].append(i)
        indeg[i] += 1

finish = [0] * (n + 1)
q = deque()
for i in range(1, n + 1):
    if indeg[i] == 0:
        finish[i] = task_time[i]
        q.append(i)

while q:
    u = q.popleft()
    for v in adj[u]:
        if finish[u] + task_time[v] > finish[v]:
            finish[v] = finish[u] + task_time[v]
        indeg[v] -= 1
        if indeg[v] == 0:
            q.append(v)

sys.stdout.write("\\n".join(str(finish[i]) for i in range(1, n + 1)) + "\\n")
`,
      en: {
        title: "Game Dev — Build Time Per Building",
        description: `Build N buildings. Each building i takes \`time[i]\` to build and has some prerequisite buildings. With *parallel* construction, output the earliest finish time of each building 1..N (one per line).

Input:
- First line: \`N\`
- Next N lines: building i info: \`t p1 p2 ... -1\` — time t, prereq IDs, terminated by -1.

Output: N lines, finish time of building i on line i.

Source: BOJ 1516 paraphrased`,
        constraints: "1 ≤ N ≤ 500, 1 ≤ time[i] ≤ 100000, DAG",
        hints: [
          "Same structure as atop-007 — only output differs (per-building).",
          "finish[i] = time[i] + max(prereq finish), or just time[i] if no prereqs.",
          "Run Kahn's and relax along each edge.",
        ],
        solutionExplanation:
          "Output variant of atop-007. Algorithm identical, just print finish[1..N]. Input format (-1 terminator) is the only twist.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 음악 프로그램 (BOJ 2623) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-009",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "어려움",
      title: "음악 프로그램 순서 (불가능 검출)",
      description: `N 명의 가수가 있고 M 개의 PD 가 자기 차례의 가수 순서를 제출한다. 각 PD 는 자기가 맡은 가수 K 명을 *정해진 순서대로* 부르길 원한다. 모든 PD 의 요구를 만족하는 *전체 가수 순서* 가 존재하면 한 줄에 한 명씩 출력. 불가능하면 \`0\` 하나만 출력.

각 PD 의 입력: \`K g1 g2 ... gK\` — K 명, 그 순서대로 g1 → g2 → ... → gK 가 와야 함.

같은 단계에서 여러 후보가 있으면 *번호 작은 가수 먼저*.

출처: BOJ 2623 paraphrased`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 100, 각 PD 의 K ≤ N",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "6 3\n3 1 4 3\n4 6 2 5 4\n2 2 3", expectedOutput: "1\n6\n2\n5\n4\n3", label: "기본 예제" },
        { stdin: "3 2\n2 1 2\n2 2 3", expectedOutput: "1\n2\n3", label: "선형 결합" },
        { stdin: "3 2\n2 1 2\n2 2 1", expectedOutput: "0", label: "모순 → 사이클" },
        { stdin: "4 2\n2 1 3\n2 2 4", expectedOutput: "1\n2\n3\n4", label: "두 독립 체인" },
        { stdin: "5 1\n5 5 4 3 2 1", expectedOutput: "5\n4\n3\n2\n1", label: "단일 PD" },
        { stdin: "2 0", expectedOutput: "1\n2", label: "PD 없음 — 번호순" },
      ],
      hints: [
        "각 PD 의 K 명: g1→g2, g2→g3, ..., gK-1→gK 에지 추가.",
        "Kahn's + min-heap 으로 출력. 처리된 노드 < N 이면 사이클 → 0 출력.",
        "출력: 한 줄에 한 명씩 (atop-001 과 다름!).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int k;
        cin >> k;
        vector<int> seq(k);
        for (int j = 0; j < k; j++) cin >> seq[j];
        for (int j = 0; j + 1 < k; j++) {
            adj[seq[j]].push_back(seq[j + 1]);
            indeg[seq[j + 1]]++;
        }
    }

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) pq.push(i);

    vector<int> result;
    while (!pq.empty()) {
        int u = pq.top(); pq.pop();
        result.push_back(u);
        for (int v : adj[u])
            if (--indeg[v] == 0) pq.push(v);
    }

    if ((int)result.size() < n) {
        cout << 0 << "\\n";
    } else {
        for (int x : result) cout << x << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "각 PD 의 K 명 시퀀스를 연속 에지 K-1 개로 변환 → 위상 정렬. min-heap 으로 안정적 출력. result.size() < N 이면 사이클 → 0. atop-001 의 사이클 검출 확장판.",
      pyInitialCode: `import sys
import heapq
from collections import defaultdict
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
import heapq
from collections import defaultdict
input = sys.stdin.readline

n, m = map(int, input().split())
adj = defaultdict(list)
indeg = [0] * (n + 1)
for _ in range(m):
    parts = list(map(int, input().split()))
    k = parts[0]
    seq = parts[1:1 + k]
    for j in range(k - 1):
        adj[seq[j]].append(seq[j + 1])
        indeg[seq[j + 1]] += 1

heap = [i for i in range(1, n + 1) if indeg[i] == 0]
heapq.heapify(heap)
result = []
while heap:
    u = heapq.heappop(heap)
    result.append(u)
    for v in adj[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            heapq.heappush(heap, v)

if len(result) < n:
    print(0)
else:
    sys.stdout.write("\\n".join(map(str, result)) + "\\n")
`,
      en: {
        title: "Music Program (with impossibility)",
        description: `N singers. M PDs each submit a sequence \`K g1 g2 ... gK\` meaning g1 → g2 → ... → gK in that order. Print a valid total order (one singer per line). If impossible, print just \`0\`.

When multiple candidates have in-degree 0, pick the *smallest number* first.

Source: BOJ 2623 paraphrased`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 100, K ≤ N",
        hints: [
          "Each PD's K names → K-1 consecutive edges.",
          "Kahn's + min-heap. If processed < N, print 0.",
          "Output: one number per line (different from atop-001!).",
        ],
        solutionExplanation:
          "Convert each PD's sequence into K-1 edges, run Kahn's with min-heap. Cycle detection via result.size() < N. Extension of atop-001 with impossibility output.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 강의 수강 가능 여부 (LC 207) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-010",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "어려움",
      title: "강의 수강 완료 가능? (LC 207)",
      description: `\`numCourses\` 개의 강의 (0번부터 numCourses-1번) 가 있다. 선수 조건이 \`prerequisites[i] = [a, b]\` 형태로 주어진다 (a 를 듣기 위해 b 를 먼저 들어야 함). 모든 강의를 들을 수 있는지 \`true\` / \`false\` 출력.

입력 형식:
- 첫 줄: \`numCourses numPrereq\`
- 다음 numPrereq 줄: \`a b\` (b → a 에지)

핵심: 사이클 검출. Kahn's 또는 DFS in-stack.

출처: LeetCode 207 (Course Schedule) paraphrased`,
      constraints: "1 ≤ numCourses ≤ 2000, 0 ≤ numPrereq ≤ 5000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "2 1\n1 0", expectedOutput: "true", label: "단순 — 0 먼저 후 1" },
        { stdin: "2 2\n1 0\n0 1", expectedOutput: "false", label: "사이클" },
        { stdin: "4 4\n1 0\n2 0\n3 1\n3 2", expectedOutput: "true", label: "다이아몬드" },
        { stdin: "3 3\n1 0\n2 1\n0 2", expectedOutput: "false", label: "삼각 사이클" },
        { stdin: "1 0", expectedOutput: "true", label: "단일 강의" },
        { stdin: "5 0", expectedOutput: "true", label: "선수 조건 없음" },
        { stdin: "6 5\n1 0\n2 0\n3 1\n4 2\n5 3", expectedOutput: "true", label: "트리 형태" },
      ],
      hints: [
        "atop-005 와 본질 동일 — 사이클 없으면 가능.",
        "에지 방향 주의: [a, b] = b → a (b 가 a 의 선수).",
        "출력은 소문자 'true' / 'false'.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n);
    vector<int> indeg(n, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[b].push_back(a);
        indeg[a]++;
    }

    queue<int> q;
    for (int i = 0; i < n; i++)
        if (indeg[i] == 0) q.push(i);

    int processed = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        processed++;
        for (int v : adj[u])
            if (--indeg[v] == 0) q.push(v);
    }

    cout << (processed == n ? "true" : "false") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "LeetCode 207 의 표준 풀이. atop-005 와 본질 같지만 0-indexed 와 LC 입력 형식 [a, b] = b → a 에지 방향 주의. Kahn's 로 사이클 검출.",
      pyInitialCode: `import sys
from collections import deque, defaultdict
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque, defaultdict
input = sys.stdin.readline

n, m = map(int, input().split())
adj = defaultdict(list)
indeg = [0] * n
for _ in range(m):
    a, b = map(int, input().split())
    adj[b].append(a)
    indeg[a] += 1

q = deque(i for i in range(n) if indeg[i] == 0)
processed = 0
while q:
    u = q.popleft()
    processed += 1
    for v in adj[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            q.append(v)

print("true" if processed == n else "false")
`,
      en: {
        title: "Course Schedule — Can Finish? (LC 207)",
        description: `\`numCourses\` courses (0..numCourses-1). Prerequisites given as \`[a, b]\` (need to take b before a). Output \`true\` if all courses can be taken, else \`false\`.

Input:
- First line: \`numCourses numPrereq\`
- Next numPrereq lines: \`a b\` (edge b → a)

Key: detect cycle. Kahn's or DFS in-stack.

Source: LeetCode 207 paraphrased`,
        constraints: "1 ≤ numCourses ≤ 2000, 0 ≤ numPrereq ≤ 5000",
        hints: [
          "Essentially atop-005 — no cycle → can finish.",
          "Edge direction: [a, b] = b → a.",
          "Output is lowercase 'true' / 'false'.",
        ],
        solutionExplanation:
          "Standard LC 207 solution via Kahn's. 0-indexed and edge direction [a, b] = b → a are the only twists.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 사전 순 위상 정렬 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-011",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "어려움",
      title: "사전 순 위상 정렬",
      description: `N 개 노드, M 개 에지 (선행 → 후행) 그래프가 주어진다. 가능한 위상 순서 중 *사전 순으로 가장 빠른* 순서를 한 줄에 공백으로 출력하라.

핵심: Kahn's + **min-heap** — in-degree=0 인 노드 중 *항상 가장 작은* 번호부터.

> 주의: 단순 BFS 큐 (FIFO) 로 짜면 사전 순 보장 안 됨. 반드시 priority_queue.

출처: 원본 (priority queue 활용 강조)`,
      constraints: "1 ≤ N ≤ 32000, 0 ≤ M ≤ 100000 (DAG 보장)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5 4\n2 1\n3 1\n4 1\n5 1", expectedOutput: "2 3 4 5 1", label: "1 빼고 모두 선행 → 사전순 2,3,4,5" },
        { stdin: "4 0", expectedOutput: "1 2 3 4", label: "에지 없음" },
        { stdin: "3 2\n3 1\n3 2", expectedOutput: "3 1 2", label: "3 이 모두의 선행" },
        { stdin: "5 3\n1 4\n2 4\n3 4", expectedOutput: "1 2 3 4 5", label: "1,2,3 → 4 합류, 5 독립" },
        { stdin: "6 4\n6 5\n5 4\n4 3\n3 2", expectedOutput: "1 6 5 4 3 2", label: "1 독립, 역 체인" },
        { stdin: "7 6\n2 1\n3 1\n4 2\n4 3\n5 4\n6 5", expectedOutput: "6 7 5 4 2 3 1", label: "복잡한 분기" },
      ],
      hints: [
        "큐 대신 *min-heap* (priority_queue + greater).",
        "FIFO 큐로는 안 됨 — 같은 시점에 in-degree=0 여러 개일 때 우선순위가 보장 안 됨.",
        "결과를 한 줄에 공백으로.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        indeg[b]++;
    }

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) pq.push(i);

    vector<int> result;
    while (!pq.empty()) {
        int u = pq.top(); pq.pop();
        result.push_back(u);
        for (int v : adj[u])
            if (--indeg[v] == 0) pq.push(v);
    }

    for (int i = 0; i < (int)result.size(); i++) {
        if (i) cout << ' ';
        cout << result[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "사전 순 보장의 핵심은 *priority_queue (min-heap)*. 매번 in-degree=0 인 후보 중 가장 작은 번호를 꺼냄. 일반 큐 사용 시 같은 시점 후보의 순서는 입력 순서에 의존해서 사전 순 깨질 수 있음. O((N+M) log N).",
      pyInitialCode: `import sys
import heapq
from collections import defaultdict
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
import heapq
from collections import defaultdict
input = sys.stdin.readline

n, m = map(int, input().split())
adj = defaultdict(list)
indeg = [0] * (n + 1)
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    indeg[b] += 1

heap = [i for i in range(1, n + 1) if indeg[i] == 0]
heapq.heapify(heap)
result = []
while heap:
    u = heapq.heappop(heap)
    result.append(u)
    for v in adj[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            heapq.heappush(heap, v)

print(*result)
`,
      en: {
        title: "Lexicographic Topological Sort",
        description: `N nodes, M edges (prereq → next). Print the *lexicographically smallest* topological order, space-separated.

Key: Kahn's + **min-heap** — always pick the smallest in-degree=0 node.

> Plain BFS queue does NOT guarantee lex order. Must use priority_queue.

Source: original (emphasizes priority queue)`,
        constraints: "1 ≤ N ≤ 32000, 0 ≤ M ≤ 100000 (DAG)",
        hints: [
          "Use *min-heap* (priority_queue + greater).",
          "Plain FIFO won't guarantee lex order when multiple in-degree=0 are available.",
          "Output: space-separated on one line.",
        ],
        solutionExplanation:
          "min-heap is the trick — pop smallest in-degree=0 each step. FIFO order depends on insertion order, which breaks lex. O((N+M) log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 학기 과목 — 사이클 있으면 알림 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atop-012",
      cluster: "algo-topologicalsort-contest",
      unlockAfter: "algo-topologicalsort",
      difficulty: "어려움",
      title: "학기 과목 — 사이클이면 사이클 길이 출력",
      description: `N 개의 과목과 M 개의 선수 조건. 위상 정렬이 가능하면 \`OK <순서>\` (Kahn's + min-heap 결과를 공백으로), 사이클이 있으면 \`CYCLE <K>\` (K = 사이클에 포함된 노드 수 = N - 처리된 노드 수).

출력 예:
- 가능: \`OK 1 2 3\`
- 불가능 (사이클): \`CYCLE 3\` (사이클에 3 개 노드 포함)

출처: 원본 (atop-010 의 확장 — 사이클일 때 더 풍부한 정보)`,
      constraints: "1 ≤ N ≤ 10000, 0 ≤ M ≤ 100000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 2\n1 2\n2 3", expectedOutput: "OK 1 2 3", label: "DAG" },
        { stdin: "3 3\n1 2\n2 3\n3 1", expectedOutput: "CYCLE 3", label: "3-사이클 — 3 개 모두" },
        { stdin: "5 5\n1 2\n2 3\n3 4\n4 5\n5 3", expectedOutput: "CYCLE 3", label: "꼬리 + 3-사이클" },
        { stdin: "4 0", expectedOutput: "OK 1 2 3 4", label: "에지 없음" },
        { stdin: "2 2\n1 2\n2 1", expectedOutput: "CYCLE 2", label: "2-사이클" },
        { stdin: "6 4\n1 2\n3 4\n4 3\n5 6", expectedOutput: "CYCLE 2", label: "두 체인 + 2-사이클" },
        { stdin: "1 0", expectedOutput: "OK 1", label: "단일 노드" },
      ],
      hints: [
        "Kahn's + min-heap 으로 처리.",
        "처리 후 result.size() == N → OK + 순서 출력.",
        "아니면 → CYCLE + (N - result.size()) 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        indeg[b]++;
    }

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) pq.push(i);

    vector<int> result;
    while (!pq.empty()) {
        int u = pq.top(); pq.pop();
        result.push_back(u);
        for (int v : adj[u])
            if (--indeg[v] == 0) pq.push(v);
    }

    if ((int)result.size() == n) {
        cout << "OK";
        for (int x : result) cout << ' ' << x;
        cout << "\\n";
    } else {
        cout << "CYCLE " << (n - (int)result.size()) << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "Kahn's 결과 길이로 판정 후 분기 출력. 사이클 안의 노드들은 in-degree 가 영원히 0 안 되어 처리 안 됨 → 사이클 노드 수 = N - 처리 수. DAG/사이클 두 케이스 모두 한 알고리즘으로.",
      pyInitialCode: `import sys
import heapq
from collections import defaultdict
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
import heapq
from collections import defaultdict
input = sys.stdin.readline

n, m = map(int, input().split())
adj = defaultdict(list)
indeg = [0] * (n + 1)
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    indeg[b] += 1

heap = [i for i in range(1, n + 1) if indeg[i] == 0]
heapq.heapify(heap)
result = []
while heap:
    u = heapq.heappop(heap)
    result.append(u)
    for v in adj[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            heapq.heappush(heap, v)

if len(result) == n:
    print("OK", *result)
else:
    print("CYCLE", n - len(result))
`,
      en: {
        title: "Class Schedule — Report Cycle Size",
        description: `N courses, M prerequisites. If a topological order exists, print \`OK <order>\` (Kahn's + min-heap, space-separated). If there's a cycle, print \`CYCLE <K>\` where K is the number of nodes inside cycles (= N - processed).

Examples:
- OK: \`OK 1 2 3\`
- Cycle: \`CYCLE 3\` (3 nodes stuck in cycle)

Source: original (extension of atop-010 with richer cycle info)`,
        constraints: "1 ≤ N ≤ 10000, 0 ≤ M ≤ 100000",
        hints: [
          "Run Kahn's + min-heap.",
          "result.size() == N → OK + order.",
          "Else → CYCLE + (N - result.size()).",
        ],
        solutionExplanation:
          "Cycle members never drop to in-degree 0, so cycle size = N - processed. Same algorithm handles both DAG and cyclic cases.",
      },
    },
  ],
}
