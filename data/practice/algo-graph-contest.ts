import type { PracticeCluster } from "./types"

export const graphContestCluster: PracticeCluster = {
  id: "algo-graph-contest",
  title: "그래프 문제 풀이",
  emoji: "🕸️",
  description: "BFS 최단 거리, DFS 연결 요소, 사이클, 그리드 탐색",
  unlockAfter: "algo-graph",
  en: {
    title: "Graph Practice",
    description: "BFS shortest, DFS connected components, cycle, grid",
  },
  problems: [
    // ═════════════════════════════════════════════════════════════════
    // 쉬움 입문 (on-ramp): 그래프 표현(차수) → 도달 가능 수(BFS 한 번) → 연결 요소
    // ═════════════════════════════════════════════════════════════════
    {
      id: "agra-e01",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "쉬움",
      title: "정점의 차수",
      description: `정점 N개, 간선 M개의 (무방향) 그래프가 주어진다. 각 간선은 \`u v\` 로 주어진다. **각 정점에 연결된 간선 수(차수)** 를 1번부터 N번까지 공백으로 구분해 출력하라.

그래프를 다루는 첫걸음은 "누가 누구랑 연결됐는지" 표현하는 것. 차수를 세는 건 그 표현을 만드는 가장 기본 연습이다.`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ M ≤ 200,000, 1 ≤ u, v ≤ N",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> deg(n + 1, 0);
    // TODO: 간선마다 양 끝 정점의 차수를 1씩 늘리고, 1..N 출력

    return 0;
}`,
      pyInitialCode: `import sys
d = sys.stdin.read().split()
n, m = int(d[0]), int(d[1])
deg = [0] * (n + 1)
# TODO: 간선마다 deg[u]++, deg[v]++ 한 뒤 1..N 출력`,
      testCases: [
        { stdin: "4 3\n1 2\n1 3\n2 4", expectedOutput: "2 2 1 1", label: "기본" },
        { stdin: "3 0", expectedOutput: "0 0 0", label: "간선 없음" },
        { stdin: "2 1\n1 2", expectedOutput: "1 1", label: "간선 1개" },
      ],
      hints: ["간선 u v 를 읽을 때마다 deg[u]++, deg[v]++.", "1번부터 N번까지 차수 출력."],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> deg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        deg[u]++; deg[v]++;
    }
    for (int i = 1; i <= n; i++) {
        cout << deg[i];
        if (i < n) cout << ' ';
    }
    cout << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
d = sys.stdin.read().split()
n, m = int(d[0]), int(d[1])
deg = [0] * (n + 1)
i = 2
for _ in range(m):
    u, v = int(d[i]), int(d[i + 1])
    i += 2
    deg[u] += 1
    deg[v] += 1
print(*deg[1:])`,
      solutionExplanation: "간선 하나는 양 끝 정점 두 개의 차수를 1씩 올립니다. 모든 간선을 훑으며 세면 끝이에요.",
      en: {
        title: "Degree of Each Vertex",
        description: `An undirected graph with N vertices and M edges (each \`u v\`). Print the **degree** (number of incident edges) of vertices 1..N, space-separated. The first step in graphs is representing connections — counting degrees is the most basic practice.`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ M ≤ 200,000, 1 ≤ u, v ≤ N",
        hints: ["For each edge u v: deg[u]++, deg[v]++.", "Print degrees 1..N."],
        solutionExplanation: "Each edge raises the degree of its two endpoints; sweep all edges and count.",
      },
    },
    {
      id: "agra-e02",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "쉬움",
      title: "1번에서 갈 수 있는 정점 수",
      description: `정점 N개, 간선 M개의 무방향 그래프가 주어진다. **1번 정점에서 출발해 간선을 따라 도달할 수 있는 정점의 수**(자기 자신 포함)를 출력하라.

이게 BFS/DFS의 핵심이다 — 시작점에서 퍼져나가며 방문한 정점을 세면 된다.`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ M ≤ 200,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    // TODO: 1번에서 BFS/DFS 로 퍼지며 방문 정점 수 세기

    return 0;
}`,
      pyInitialCode: `import sys
from collections import deque
d = sys.stdin.read().split()
n, m = int(d[0]), int(d[1])
adj = [[] for _ in range(n + 1)]
i = 2
for _ in range(m):
    u, v = int(d[i]), int(d[i + 1]); i += 2
    adj[u].append(v); adj[v].append(u)
# TODO: 1번에서 BFS 로 방문 정점 수 출력`,
      testCases: [
        { stdin: "4 2\n1 2\n3 4", expectedOutput: "2", label: "1과 2만" },
        { stdin: "4 3\n1 2\n2 3\n3 4", expectedOutput: "4", label: "전부 연결" },
        { stdin: "1 0", expectedOutput: "1", label: "혼자" },
      ],
      hints: [
        "방문 표시 배열 vis 와 큐(또는 재귀)를 쓴다.",
        "1번을 큐에 넣고 방문 표시. 꺼낼 때마다 카운트하고, 안 간 이웃을 큐에 넣는다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<bool> vis(n + 1, false);
    queue<int> q;
    q.push(1); vis[1] = true;
    int c = 0;
    while (!q.empty()) {
        int x = q.front(); q.pop();
        c++;
        for (int y : adj[x]) if (!vis[y]) { vis[y] = true; q.push(y); }
    }
    cout << c << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
from collections import deque
d = sys.stdin.read().split()
n, m = int(d[0]), int(d[1])
adj = [[] for _ in range(n + 1)]
i = 2
for _ in range(m):
    u, v = int(d[i]), int(d[i + 1]); i += 2
    adj[u].append(v); adj[v].append(u)
vis = [False] * (n + 1)
q = deque([1]); vis[1] = True
c = 0
while q:
    x = q.popleft()
    c += 1
    for y in adj[x]:
        if not vis[y]:
            vis[y] = True
            q.append(y)
print(c)`,
      solutionExplanation: "1번에서 시작해 큐로 이웃을 따라 퍼집니다(BFS). 방문 표시를 하며 꺼낸 정점 수를 세면 도달 가능한 정점 수예요.",
      en: {
        title: "How Many Vertices Are Reachable from 1",
        description: `Undirected graph, N vertices, M edges. Print the number of vertices **reachable from vertex 1** (including itself). This is the core of BFS/DFS — spread out from the start and count visited vertices.`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ M ≤ 200,000",
        hints: ["Use a visited array and a queue (or recursion).", "Push 1, mark it; on pop count it and enqueue unvisited neighbors."],
        solutionExplanation: "BFS from vertex 1, marking visited; the number of popped vertices is the reachable count.",
      },
    },
    {
      id: "agra-e03",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "쉬움",
      title: "연결 요소의 개수",
      description: `정점 N개, 간선 M개의 무방향 그래프가 주어진다. 서로 이어진 정점들을 한 덩어리로 볼 때, **덩어리(연결 요소)가 몇 개**인지 출력하라.

방문 안 한 정점에서 BFS/DFS 를 시작할 때마다 새 덩어리 하나. 그 횟수를 세면 된다.

출처: BOJ 11724 paraphrased`,
      constraints: "1 ≤ N ≤ 50,000, 0 ≤ M ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    // TODO: 방문 안 한 정점마다 BFS/DFS 시작 → 시작 횟수 = 연결 요소 수

    return 0;
}`,
      pyInitialCode: `import sys
from collections import deque
d = sys.stdin.read().split()
n, m = int(d[0]), int(d[1])
adj = [[] for _ in range(n + 1)]
i = 2
for _ in range(m):
    u, v = int(d[i]), int(d[i + 1]); i += 2
    adj[u].append(v); adj[v].append(u)
# TODO: 방문 안 한 정점마다 BFS 시작, 시작 횟수 출력`,
      testCases: [
        { stdin: "4 2\n1 2\n3 4", expectedOutput: "2", label: "두 덩어리" },
        { stdin: "5 0", expectedOutput: "5", label: "전부 따로" },
        { stdin: "4 3\n1 2\n2 3\n3 4", expectedOutput: "1", label: "하나로 연결" },
      ],
      hints: [
        "1번부터 N번까지 보면서, 아직 방문 안 했으면 거기서 BFS/DFS 시작.",
        "BFS/DFS 를 새로 시작한 횟수가 곧 연결 요소의 수.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<bool> vis(n + 1, false);
    int comp = 0;
    for (int s = 1; s <= n; s++) {
        if (vis[s]) continue;
        comp++;
        queue<int> q;
        q.push(s); vis[s] = true;
        while (!q.empty()) {
            int x = q.front(); q.pop();
            for (int y : adj[x]) if (!vis[y]) { vis[y] = true; q.push(y); }
        }
    }
    cout << comp << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
from collections import deque
input_data = sys.stdin.read().split()
n, m = int(input_data[0]), int(input_data[1])
adj = [[] for _ in range(n + 1)]
i = 2
for _ in range(m):
    u, v = int(input_data[i]), int(input_data[i + 1]); i += 2
    adj[u].append(v); adj[v].append(u)
vis = [False] * (n + 1)
comp = 0
for s in range(1, n + 1):
    if vis[s]:
        continue
    comp += 1
    q = deque([s]); vis[s] = True
    while q:
        x = q.popleft()
        for y in adj[x]:
            if not vis[y]:
                vis[y] = True
                q.append(y)
print(comp)`,
      solutionExplanation: "방문하지 않은 정점에서 BFS/DFS를 새로 시작할 때마다 덩어리 하나입니다. 시작한 횟수가 연결 요소의 개수예요.",
      en: {
        title: "Number of Connected Components",
        description: `Undirected graph, N vertices, M edges. Print how many **connected components** (clumps of mutually reachable vertices) there are. Each time you start BFS/DFS from an unvisited vertex, that's one new component — count the starts.`,
        constraints: "1 ≤ N ≤ 50,000, 0 ≤ M ≤ 100,000",
        hints: ["Scan 1..N; if unvisited, start a BFS/DFS there.", "The number of starts = number of components."],
        solutionExplanation: "Each BFS/DFS started from an unvisited vertex is one component; count the starts.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 1. DFS 순서 출력 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-001",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "보통",
      title: "DFS 방문 순서",
      description: `정점 \`N\` 개와 간선 \`M\` 개로 이루어진 **무방향 그래프** 가 주어진다. 시작 정점 \`V\` 에서 **DFS** (깊이 우선 탐색) 로 정점을 방문한 순서를 한 줄에 공백으로 출력하라.

같은 정점에서 갈 수 있는 이웃이 여러 개라면 **번호가 작은 정점부터** 방문한다. (인접 리스트를 오름차순으로 정렬해 두면 자동.)

입력 형식:
\`\`\`
N M V
u1 v1
u2 v2
...
\`\`\`

출처: BOJ 1260 (DFS 부분 paraphrased)`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 10000, 1 ≤ V ≤ N",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 5 1\n1 2\n1 3\n1 4\n2 4\n3 4",
          expectedOutput: "1 2 4 3",
          label: "기본 — 1→2→4→3",
        },
        {
          stdin: "5 5 3\n5 4\n5 2\n1 2\n3 4\n3 1",
          expectedOutput: "3 1 2 5 4",
          label: "BOJ 예제 — 시작 3",
        },
        {
          stdin: "1 0 1",
          expectedOutput: "1",
          label: "정점 1개 — 시작점만",
        },
        {
          stdin: "5 4 1\n1 2\n2 3\n3 4\n4 5",
          expectedOutput: "1 2 3 4 5",
          label: "선형 그래프",
        },
        {
          stdin: "6 5 1\n1 2\n1 3\n2 4\n2 5\n3 6",
          expectedOutput: "1 2 4 5 3 6",
          label: "트리 모양",
        },
        {
          stdin: "4 3 2\n1 2\n2 3\n3 4",
          expectedOutput: "2 1 3 4",
          label: "중간 시작",
        },
      ],
      hints: [
        "인접 리스트 \`vector<vector<int>> adj(N+1)\` 를 만든 뒤, 각 \`adj[u]\` 를 \`sort\` 로 오름차순 정렬.",
        "DFS 재귀: 현재 정점을 출력 + visited 표시, 이웃을 순서대로 돌며 미방문이면 재귀.",
        "정점 번호가 1 부터이므로 배열 크기를 \`N+1\` 로 잡는 게 편함.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, M, V;
vector<vector<int>> adj;
vector<bool> visited;
vector<int> order;

void dfs(int u) {
    visited[u] = true;
    order.push_back(u);
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N >> M >> V;
    adj.assign(N + 1, {});
    visited.assign(N + 1, false);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    for (int u = 1; u <= N; u++) sort(adj[u].begin(), adj[u].end());

    dfs(V);
    for (int i = 0; i < (int)order.size(); i++) {
        if (i > 0) cout << ' ';
        cout << order[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "DFS 의 기본 골격 — visited 배열로 재방문 방지, 인접 리스트를 정렬해 '번호 작은 것 먼저' 규칙 충족. 출력은 방문하는 순간 한 번씩.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n, m, v = map(int, input().split())
adj = [[] for _ in range(n + 1)]
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    adj[b].append(a)
for i in range(1, n + 1):
    adj[i].sort()

visited = [False] * (n + 1)
order = []

def dfs(u):
    visited[u] = True
    order.append(u)
    for w in adj[u]:
        if not visited[w]:
            dfs(w)

dfs(v)
print(" ".join(map(str, order)))
`,
      en: {
        title: "DFS Visit Order",
        description: `An **undirected graph** has \`N\` vertices and \`M\` edges. Starting from \`V\`, run **DFS** and print the visit order on one line, space-separated.

When several neighbors are available, visit the **smaller-numbered** one first. (Sort the adjacency lists ascending and you're done.)

Input format:
\`\`\`
N M V
u1 v1
u2 v2
...
\`\`\`

Source: BOJ 1260 (DFS part paraphrased)`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 10000, 1 ≤ V ≤ N",
        hints: [
          "Build \`vector<vector<int>> adj(N+1)\` and sort each \`adj[u]\` ascending.",
          "Recursive DFS: print + mark visited, walk neighbors in order, recurse on unvisited.",
          "Vertices are 1-indexed — allocate size \`N+1\`.",
        ],
        solutionExplanation:
          "Standard DFS — visited array prevents revisits, sorted adjacency satisfies the 'smaller first' rule. Print each vertex when first visited.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. BFS 순서 출력 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-002",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "보통",
      title: "BFS 방문 순서",
      description: `같은 입력 (\`N\` 정점, \`M\` 간선, 시작 \`V\`) 에서 이번에는 **BFS** (너비 우선 탐색) 로 방문 순서를 출력한다.

같은 단계에서 갈 수 있는 이웃이 여러 개라면 **번호가 작은 정점부터** 큐에 넣는다.

입력 형식은 \`agra-001\` 과 동일.

핵심: \`queue\` 와 \`visited\` 두 가지. **큐에 넣는 순간 visited 표시** — 큐에서 꺼낼 때 표시하면 중복 push 발생.

출처: BOJ 1260 (BFS 부분 paraphrased)`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 10000, 1 ≤ V ≤ N",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 5 1\n1 2\n1 3\n1 4\n2 4\n3 4",
          expectedOutput: "1 2 3 4",
          label: "기본 — 1 의 이웃 2,3,4 순서로",
        },
        {
          stdin: "5 5 3\n5 4\n5 2\n1 2\n3 4\n3 1",
          expectedOutput: "3 1 4 2 5",
          label: "BOJ 예제 — 시작 3",
        },
        {
          stdin: "1 0 1",
          expectedOutput: "1",
          label: "정점 1개",
        },
        {
          stdin: "5 4 1\n1 2\n2 3\n3 4\n4 5",
          expectedOutput: "1 2 3 4 5",
          label: "선형 그래프 (BFS 결과 = DFS 결과)",
        },
        {
          stdin: "6 5 1\n1 2\n1 3\n2 4\n2 5\n3 6",
          expectedOutput: "1 2 3 4 5 6",
          label: "트리 — BFS 는 레벨 순서",
        },
        {
          stdin: "7 6 1\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7",
          expectedOutput: "1 2 3 4 5 6 7",
          label: "더 큰 트리",
        },
      ],
      hints: [
        "\`queue<int>\` 와 \`visited[]\` — 시작 V 를 push 하면서 visited[V] = true.",
        "while 큐가 비지 않으면: front 출력, 정렬된 이웃을 돌며 미방문이면 visited 표시 + push.",
        "큐에 push 하는 순간 visited 표시 (pop 할 때 표시하면 같은 정점이 큐에 두 번 들어감).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, M, V;
vector<vector<int>> adj;
vector<bool> visited;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N >> M >> V;
    adj.assign(N + 1, {});
    visited.assign(N + 1, false);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    for (int u = 1; u <= N; u++) sort(adj[u].begin(), adj[u].end());

    queue<int> q;
    q.push(V);
    visited[V] = true;
    bool first = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (!first) cout << ' ';
        cout << u;
        first = false;
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "BFS 의 정석 — 큐로 레벨 단위 탐색. push 시점에 visited 표시가 핵심 (안 그러면 중복). 인접 리스트 정렬 덕에 '작은 번호 먼저' 자동 만족.",
      pyInitialCode: `import sys
from collections import deque
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque
input = sys.stdin.readline

n, m, v = map(int, input().split())
adj = [[] for _ in range(n + 1)]
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    adj[b].append(a)
for i in range(1, n + 1):
    adj[i].sort()

visited = [False] * (n + 1)
order = []
q = deque([v])
visited[v] = True
while q:
    u = q.popleft()
    order.append(u)
    for w in adj[u]:
        if not visited[w]:
            visited[w] = True
            q.append(w)
print(" ".join(map(str, order)))
`,
      en: {
        title: "BFS Visit Order",
        description: `Same input as \`agra-001\`. This time run **BFS** and print the visit order.

When several neighbors are available, enqueue the **smaller-numbered** one first.

Key: \`queue\` and \`visited\`. **Mark visited when enqueuing**, not when dequeuing — otherwise a vertex can be pushed multiple times.

Source: BOJ 1260 (BFS part paraphrased)`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 10000, 1 ≤ V ≤ N",
        hints: [
          "\`queue<int>\` + \`visited[]\`; push V and set visited[V] = true.",
          "Loop: pop front, print, walk sorted neighbors, push if not visited.",
          "Mark visited on push (not on pop) to avoid duplicates in the queue.",
        ],
        solutionExplanation:
          "Textbook BFS — queue-based level expansion. Marking visited on push prevents duplicates. Sorted adjacency gives the 'smaller first' rule for free.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 연결 요소 개수 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-003",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "보통",
      title: "연결 요소 개수",
      description: `정점 \`N\` 개와 간선 \`M\` 개로 이루어진 **무방향 그래프** 에서 **연결 요소** (connected components) 의 개수를 출력하라.

정의: 두 정점 사이에 경로가 있으면 같은 연결 요소.

방법: 모든 정점을 1..N 순회하면서 미방문이면 DFS/BFS 로 같은 연결 요소를 모두 표시하고 카운트 +1.

입력 형식:
\`\`\`
N M
u1 v1
u2 v2
...
\`\`\`

출처: BOJ 11724 paraphrased`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ N(N-1)/2",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "6 5\n1 2\n2 5\n5 1\n3 4\n4 6",
          expectedOutput: "2",
          label: "BOJ 예제 — {1,2,5}, {3,4,6}",
        },
        {
          stdin: "6 8\n1 2\n2 5\n5 1\n3 4\n4 6\n5 4\n2 4\n2 3",
          expectedOutput: "1",
          label: "BOJ 예제 — 모두 연결",
        },
        {
          stdin: "5 0",
          expectedOutput: "5",
          label: "간선 0 — 각 정점이 한 요소",
        },
        {
          stdin: "1 0",
          expectedOutput: "1",
          label: "정점 1개",
        },
        {
          stdin: "4 2\n1 2\n3 4",
          expectedOutput: "2",
          label: "두 쌍",
        },
        {
          stdin: "7 3\n1 2\n3 4\n5 6",
          expectedOutput: "4",
          label: "{1,2} {3,4} {5,6} {7} — 4 개 요소",
        },
      ],
      hints: [
        "for u = 1..N: visited[u] 가 false 면 DFS/BFS 로 그 요소 전부 표시 → count++.",
        "재귀 깊이는 최대 N (1000). \`sys.setrecursionlimit\` (Python) / 기본 충분 (C++).",
        "BFS 로도 풀린다 — 자기가 편한 방법.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, M;
vector<vector<int>> adj;
vector<bool> visited;

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) if (!visited[v]) dfs(v);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N >> M;
    adj.assign(N + 1, {});
    visited.assign(N + 1, false);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    int count = 0;
    for (int u = 1; u <= N; u++) {
        if (!visited[u]) {
            dfs(u);
            count++;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation:
        "연결 요소 카운트의 정석 — 모든 정점을 도는 바깥 for + 미방문 정점에서 DFS 한 번 = 한 요소. DFS 가 그 요소 전부에 visited 도장을 찍어주니, 미방문 정점이 또 나오면 새 요소가 시작된 것.",
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
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    adj[b].append(a)

visited = [False] * (n + 1)

def dfs(u):
    stack = [u]
    visited[u] = True
    while stack:
        x = stack.pop()
        for w in adj[x]:
            if not visited[w]:
                visited[w] = True
                stack.append(w)

count = 0
for u in range(1, n + 1):
    if not visited[u]:
        dfs(u)
        count += 1

print(count)
`,
      en: {
        title: "Count Connected Components",
        description: `Given an **undirected graph** with \`N\` vertices and \`M\` edges, print the number of **connected components**.

Definition: two vertices are in the same component if a path exists between them.

Approach: walk 1..N; for each unvisited vertex, run DFS/BFS to flood-fill its component and increment the count.

Input:
\`\`\`
N M
u1 v1
u2 v2
...
\`\`\`

Source: BOJ 11724 paraphrased`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ N(N-1)/2",
        hints: [
          "For u = 1..N: if not visited, DFS/BFS the whole component and count++.",
          "Recursion depth up to N=1000 — \`sys.setrecursionlimit\` in Python; iterative stack also works.",
          "BFS works just as well — pick what you like.",
        ],
        solutionExplanation:
          "Standard component counter — outer for + DFS from each unvisited vertex = one component. DFS marks the entire component, so the next unvisited vertex starts a fresh one.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 미로 최단 거리 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-004",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "보통",
      title: "미로 최단 거리 (BFS)",
      description: `\`N × M\` 크기의 미로가 주어진다. 각 칸은 \`1\` (지나갈 수 있음) 또는 \`0\` (벽). 좌측 상단 \`(0, 0)\` 에서 우측 하단 \`(N-1, M-1)\` 까지 **상하좌우** 로만 한 칸씩 이동할 때, 지나간 **칸의 개수의 최솟값** 을 출력하라. (시작 칸과 도착 칸 둘 다 포함.)

입력 형식:
\`\`\`
N M
m1 (한 줄에 M 글자, 공백 없음)
m2
...
\`\`\`

출발과 도착은 항상 \`1\`. 도달 불가능한 경우는 입력으로 주어지지 않는다.

핵심: **격자 위 BFS**. 4 방향 \`dx[]\`, \`dy[]\`. \`dist[r][c]\` 가 거리. 모든 간선 가중치 1 이므로 BFS 가 곧 최단 거리.

출처: BOJ 2178 paraphrased`,
      constraints: "2 ≤ N, M ≤ 100",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 6\n101111\n101010\n101011\n111011",
          expectedOutput: "15",
          label: "BOJ 예제 1",
        },
        {
          stdin: "4 6\n110110\n110110\n111111\n111101",
          expectedOutput: "9",
          label: "BOJ 예제 2",
        },
        {
          stdin: "2 25\n1011101110111011101110111\n1110111011101110111011101",
          expectedOutput: "38",
          label: "BOJ 예제 3 — 긴 가로",
        },
        {
          stdin: "2 2\n11\n11",
          expectedOutput: "3",
          label: "2x2 — 최소 3 칸",
        },
        {
          stdin: "3 3\n101\n111\n101",
          expectedOutput: "5",
          label: "3x3 — 5 칸",
        },
        {
          stdin: "5 5\n11111\n10001\n10101\n10001\n11111",
          expectedOutput: "9",
          label: "ㅁ 모양 — 가장자리로",
        },
      ],
      hints: [
        "\`dist[r][c]\` 를 -1 로 초기화 (방문 여부 + 거리 한 번에).",
        "큐에 \`(0, 0)\` 푸시, \`dist[0][0] = 1\` (자기 칸 포함).",
        "꺼낸 \`(r, c)\` 의 4 방향: 격자 안 + 값 1 + 미방문이면 \`dist = 부모 + 1\` 후 큐에 push.",
        "도착 칸을 큐에서 꺼내거나 큐 비고 난 후 \`dist[N-1][M-1]\` 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    vector<string> grid(N);
    for (int i = 0; i < N; i++) cin >> grid[i];

    vector<vector<int>> dist(N, vector<int>(M, -1));
    queue<pair<int,int>> q;
    q.push({0, 0});
    dist[0][0] = 1;

    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};

    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
            if (grid[nr][nc] != '1') continue;
            if (dist[nr][nc] != -1) continue;
            dist[nr][nc] = dist[r][c] + 1;
            q.push({nr, nc});
        }
    }
    cout << dist[N-1][M-1] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "격자 BFS 의 정석 — \`dist\` 배열이 방문/거리 동시에. 모든 간선 가중치 1 인 무가중치 그래프이므로 BFS 의 첫 도착이 곧 최단. 시작 칸을 1 로 카운트해 그 후 +1 씩 늘리면 답.",
      pyInitialCode: `import sys
from collections import deque
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque
input = sys.stdin.readline

n, m = map(int, input().split())
grid = [input().strip() for _ in range(n)]

dist = [[-1] * m for _ in range(n)]
q = deque([(0, 0)])
dist[0][0] = 1

dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]

while q:
    r, c = q.popleft()
    for d in range(4):
        nr, nc = r + dr[d], c + dc[d]
        if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == '1' and dist[nr][nc] == -1:
            dist[nr][nc] = dist[r][c] + 1
            q.append((nr, nc))

print(dist[n-1][m-1])
`,
      en: {
        title: "Maze Shortest Path (BFS)",
        description: `Given an \`N × M\` maze where each cell is \`1\` (passable) or \`0\` (wall), find the minimum number of cells visited going from \`(0, 0)\` to \`(N-1, M-1)\`, moving only up/down/left/right. Count both endpoints.

Input:
\`\`\`
N M
m1 (M chars, no spaces)
m2
...
\`\`\`

Start and end are always \`1\`. Test cases never use unreachable boards.

Key: **grid BFS**. Use 4-direction \`dx[]\`, \`dy[]\` and \`dist[r][c]\`. Unit weights → BFS gives shortest distance.

Source: BOJ 2178 paraphrased`,
        constraints: "2 ≤ N, M ≤ 100",
        hints: [
          "Init \`dist[r][c] = -1\` (sentinel for unvisited).",
          "Push \`(0, 0)\`, set \`dist[0][0] = 1\` (include the start cell).",
          "For each popped cell, try 4 neighbors: in-bounds + cell == 1 + unvisited → \`dist = parent + 1\`, push.",
          "Print \`dist[N-1][M-1]\`.",
        ],
        solutionExplanation:
          "Textbook grid BFS — \`dist\` doubles as visited + distance. Unweighted graph, so first arrival = shortest. Start with 1, increment as you expand.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 그래프 거리 (BFS) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-005",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "보통",
      title: "한 정점에서의 거리",
      description: `정점 \`N\` 개와 간선 \`M\` 개의 **무방향 그래프** 와 시작 정점 \`V\` 가 주어진다. \`V\` 에서 각 정점 \`1, 2, ..., N\` 까지의 **간선 개수로 잰 최단 거리** 를 공백으로 구분해 한 줄에 출력하라. \`V\` 자신은 \`0\`, 도달 불가능하면 \`-1\`.

입력 형식:
\`\`\`
N M V
u1 v1
u2 v2
...
\`\`\`

핵심: 무가중치 그래프이므로 BFS 한 번이면 모든 정점까지의 거리를 동시에 얻는다.

출처: 원본 (BFS 거리 배열 응용 — 사회망 분석의 기초)`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ 10000, 1 ≤ V ≤ N",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 4 1\n1 2\n2 3\n3 4\n4 5",
          expectedOutput: "0 1 2 3 4",
          label: "선형 — 거리 0,1,2,3,4",
        },
        {
          stdin: "6 5 1\n1 2\n2 5\n5 1\n3 4\n4 6",
          expectedOutput: "0 1 -1 -1 1 -1",
          label: "두 연결 요소 — 다른 쪽은 -1",
        },
        {
          stdin: "4 4 1\n1 2\n1 3\n2 4\n3 4",
          expectedOutput: "0 1 1 2",
          label: "정사각형 — 양쪽 같은 거리",
        },
        {
          stdin: "1 0 1",
          expectedOutput: "0",
          label: "정점 1개",
        },
        {
          stdin: "5 0 3",
          expectedOutput: "-1 -1 0 -1 -1",
          label: "간선 0 — 자신만 0",
        },
        {
          stdin: "7 6 4\n4 1\n4 2\n4 3\n4 5\n4 6\n4 7",
          expectedOutput: "1 1 1 0 1 1 1",
          label: "별 모양 — 중심에서 모두 거리 1",
        },
      ],
      hints: [
        "\`dist[N+1]\` 을 -1 로 초기화.",
        "BFS 시작: 큐에 V push, \`dist[V] = 0\`.",
        "이웃을 펼칠 때 \`dist == -1\` 인 곳만 \`dist[부모] + 1\` 로 채우면 자동으로 첫 도착 = 최단.",
        "출력 시 \`dist[i]\` 가 그대로 답 (-1 은 도달 불가 표시).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M, V;
    cin >> N >> M >> V;
    vector<vector<int>> adj(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<int> dist(N + 1, -1);
    queue<int> q;
    dist[V] = 0;
    q.push(V);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    for (int i = 1; i <= N; i++) {
        if (i > 1) cout << ' ';
        cout << dist[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "BFS 거리 배열 패턴 — dist 가 -1 이면 미방문 + 도달 불가 표시 겸용. 무가중치 그래프이므로 한 번의 BFS 로 모든 정점 거리 동시 계산.",
      pyInitialCode: `import sys
from collections import deque
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque
input = sys.stdin.readline

n, m, v = map(int, input().split())
adj = [[] for _ in range(n + 1)]
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    adj[b].append(a)

dist = [-1] * (n + 1)
dist[v] = 0
q = deque([v])
while q:
    u = q.popleft()
    for w in adj[u]:
        if dist[w] == -1:
            dist[w] = dist[u] + 1
            q.append(w)

print(" ".join(str(dist[i]) for i in range(1, n + 1)))
`,
      en: {
        title: "Distances From a Source",
        description: `Given an **undirected graph** with \`N\` vertices, \`M\` edges, and source \`V\`, print the **shortest distance (in edges)** from \`V\` to every vertex \`1..N\`, space-separated. \`V\` itself is \`0\`; unreachable vertices are \`-1\`.

Input:
\`\`\`
N M V
u1 v1
...
\`\`\`

One BFS gives all distances at once (unweighted graph).

Source: original (BFS distance array — social-network basics)`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ 10000, 1 ≤ V ≤ N",
        hints: [
          "Init \`dist[N+1] = -1\`.",
          "Start BFS: push V, \`dist[V] = 0\`.",
          "Set \`dist[neighbor] = dist[parent] + 1\` only when \`dist[neighbor] == -1\` — first arrival = shortest.",
          "Print dist[1..N] in order.",
        ],
        solutionExplanation:
          "Standard BFS distance array — \`-1\` doubles as 'unvisited' and 'unreachable'. One BFS on an unweighted graph yields all distances.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 양분 그래프 검사 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-006",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "보통",
      title: "양분 그래프 (Bipartite) 검사",
      description: `정점 \`N\` 개, 간선 \`M\` 개의 **무방향 그래프** 가 주어진다. 정점을 **두 색** (A, B) 으로 칠하되 **모든 간선의 양 끝 색이 다르도록** 칠할 수 있으면 \`YES\`, 아니면 \`NO\` 를 출력하라.

이런 그래프를 **양분 그래프** (bipartite) 라고 한다.

핵심 — BFS 로 색칠: 시작 정점에 색 0, 이웃에 색 1, 그 다음 이웃에 색 0... 번갈아 칠한다. 칠하다가 같은 색인 이웃을 만나면 NO.

그래프가 여러 연결 요소로 나뉠 수 있으니 모든 미방문 정점에서 BFS 시작.

출처: LeetCode 785 (Is Graph Bipartite?) simplified`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ 10000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 4\n1 2\n2 3\n3 4\n4 1",
          expectedOutput: "YES",
          label: "사이클 길이 4 — 양분 가능",
        },
        {
          stdin: "3 3\n1 2\n2 3\n3 1",
          expectedOutput: "NO",
          label: "사이클 길이 3 (홀수) — 불가능",
        },
        {
          stdin: "5 4\n1 2\n2 3\n3 4\n4 5",
          expectedOutput: "YES",
          label: "선형 — 항상 양분 가능",
        },
        {
          stdin: "5 0",
          expectedOutput: "YES",
          label: "간선 0 — 양분 가능",
        },
        {
          stdin: "5 5\n1 2\n2 3\n3 1\n4 5\n5 4",
          expectedOutput: "NO",
          label: "어느 한 요소가 홀수 사이클",
        },
        {
          stdin: "6 5\n1 2\n3 4\n5 6\n1 3\n5 1",
          expectedOutput: "YES",
          label: "여러 요소 모두 양분 가능",
        },
        {
          stdin: "2 1\n1 2",
          expectedOutput: "YES",
          label: "간선 1개",
        },
      ],
      hints: [
        "\`color[N+1]\` 을 -1 로 초기화 (미방문 표시).",
        "각 미방문 정점에서 BFS 시작 — 시작점 색 0, 이웃 색은 \`1 - color[부모]\`.",
        "이웃이 이미 색칠되어 있고 같은 색이면 즉시 NO 결정 가능 (조기 종료).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    vector<vector<int>> adj(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<int> color(N + 1, -1);
    bool ok = true;
    for (int s = 1; s <= N && ok; s++) {
        if (color[s] != -1) continue;
        queue<int> q;
        q.push(s);
        color[s] = 0;
        while (!q.empty() && ok) {
            int u = q.front(); q.pop();
            for (int v : adj[u]) {
                if (color[v] == -1) {
                    color[v] = 1 - color[u];
                    q.push(v);
                } else if (color[v] == color[u]) {
                    ok = false;
                    break;
                }
            }
        }
    }
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Bipartite 판정의 정석 — BFS 로 색을 번갈아 칠하고, 같은 색 이웃을 만나면 즉시 실패. 무방향 그래프가 bipartite 이면 ⇔ 홀수 길이 사이클이 없음.",
      pyInitialCode: `import sys
from collections import deque
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque
input = sys.stdin.readline

n, m = map(int, input().split())
adj = [[] for _ in range(n + 1)]
for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    adj[b].append(a)

color = [-1] * (n + 1)
ok = True
for s in range(1, n + 1):
    if not ok:
        break
    if color[s] != -1:
        continue
    color[s] = 0
    q = deque([s])
    while q and ok:
        u = q.popleft()
        for w in adj[u]:
            if color[w] == -1:
                color[w] = 1 - color[u]
                q.append(w)
            elif color[w] == color[u]:
                ok = False
                break

print("YES" if ok else "NO")
`,
      en: {
        title: "Bipartite Check",
        description: `Given an **undirected graph** with \`N\` vertices and \`M\` edges, decide whether the vertices can be 2-colored (A/B) so that **every edge connects different colors**. Print \`YES\` or \`NO\`.

Such a graph is called **bipartite**.

Idea — color via BFS: start = color 0, neighbors = color 1, then 0, alternating. If a neighbor is already colored the same as you, answer is NO.

Process every unvisited vertex (graph may be disconnected).

Source: LeetCode 785 (Is Graph Bipartite?) simplified`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ 10000",
        hints: [
          "Init \`color[N+1] = -1\` (uncolored).",
          "For each uncolored vertex, BFS — start color 0, neighbors get \`1 - color[parent]\`.",
          "If a neighbor is already colored and matches you, return NO immediately.",
        ],
        solutionExplanation:
          "Standard bipartite test — BFS with alternating colors; conflict means failure. A graph is bipartite iff it has no odd-length cycle.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 단지 번호 붙이기 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-007",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "어려움",
      title: "단지 번호 붙이기 (DFS)",
      description: `\`N × N\` 격자에 \`1\` 은 집, \`0\` 은 빈 칸이다. **상하좌우** 로 연결된 1 의 묶음을 **단지** 라 한다.

전체 단지의 **개수** 를 첫 줄에, 각 단지의 **집 수** 를 **오름차순 정렬** 해 한 줄에 하나씩 출력하라.

입력 형식:
\`\`\`
N
row1 (N 글자, 공백 없음)
row2
...
\`\`\`

핵심: 격자 전체를 훑으며 \`1\` 이면서 미방문인 칸에서 DFS/BFS → 연결된 1 의 개수를 세고, 그 단지 크기 기록. 마지막에 단지 크기 배열을 정렬해 출력.

출처: BOJ 2667 paraphrased`,
      constraints: "1 ≤ N ≤ 25",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "7\n0110100\n0110101\n1110101\n0000111\n0100000\n0111110\n0111000",
          expectedOutput: "3\n7\n8\n9",
          label: "BOJ 예제",
        },
        {
          stdin: "3\n111\n111\n111",
          expectedOutput: "1\n9",
          label: "모두 채워짐",
        },
        {
          stdin: "3\n000\n000\n000",
          expectedOutput: "0",
          label: "빈 격자 — 단지 0",
        },
        {
          stdin: "3\n101\n010\n101",
          expectedOutput: "5\n1\n1\n1\n1\n1",
          label: "대각선 — 각 칸 따로",
        },
        {
          stdin: "4\n1100\n1100\n0011\n0011",
          expectedOutput: "2\n4\n4",
          label: "2x2 블록 두 개",
        },
        {
          stdin: "1\n1",
          expectedOutput: "1\n1",
          label: "1x1 — 집 한 채",
        },
        {
          stdin: "1\n0",
          expectedOutput: "0",
          label: "1x1 — 빈 칸",
        },
      ],
      hints: [
        "격자 입력은 한 줄을 string 으로 받으면 \`grid[r][c]\` 가 '0' 또는 '1' 문자.",
        "DFS 안에서 카운터 증가 — 또는 BFS 로 푸쉬한 칸 개수.",
        "단지 개수 = 시작한 DFS 호출 수. 단지 크기들을 \`vector\` 에 모은 뒤 \`sort\` → 출력.",
        "재귀 깊이 최대 N×N = 625 — 안전.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<string> grid;
vector<vector<bool>> visited;
int dr[] = {-1, 1, 0, 0};
int dc[] = {0, 0, -1, 1};

int dfs(int r, int c) {
    visited[r][c] = true;
    int sz = 1;
    for (int d = 0; d < 4; d++) {
        int nr = r + dr[d], nc = c + dc[d];
        if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
        if (grid[nr][nc] != '1' || visited[nr][nc]) continue;
        sz += dfs(nr, nc);
    }
    return sz;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    grid.assign(N, "");
    for (int i = 0; i < N; i++) cin >> grid[i];
    visited.assign(N, vector<bool>(N, false));
    vector<int> sizes;
    for (int r = 0; r < N; r++)
        for (int c = 0; c < N; c++)
            if (grid[r][c] == '1' && !visited[r][c])
                sizes.push_back(dfs(r, c));
    sort(sizes.begin(), sizes.end());
    cout << sizes.size() << "\\n";
    for (int s : sizes) cout << s << "\\n";
    return 0;
}`,
      solutionExplanation:
        "격자 위 DFS + 연결 요소 크기 집계. 모든 칸 훑기 + 미방문 1 에서 DFS = 새 단지, DFS 반환값 = 단지 크기. 마지막에 정렬해 출력하면 끝.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
grid = [input().strip() for _ in range(n)]
visited = [[False] * n for _ in range(n)]

dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]

def dfs(r, c):
    stack = [(r, c)]
    visited[r][c] = True
    sz = 0
    while stack:
        x, y = stack.pop()
        sz += 1
        for d in range(4):
            nx, ny = x + dr[d], y + dc[d]
            if 0 <= nx < n and 0 <= ny < n and grid[nx][ny] == '1' and not visited[nx][ny]:
                visited[nx][ny] = True
                stack.append((nx, ny))
    return sz

sizes = []
for r in range(n):
    for c in range(n):
        if grid[r][c] == '1' and not visited[r][c]:
            sizes.append(dfs(r, c))

sizes.sort()
out = [str(len(sizes))] + [str(s) for s in sizes]
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Number the Complexes (DFS)",
        description: `On an \`N × N\` grid, \`1\` is a house and \`0\` is empty. Houses connected **4-directionally** form a **complex**.

Print the **total number of complexes** on the first line, then the **size of each complex** sorted in **ascending order**, one per line.

Input:
\`\`\`
N
row1 (N chars, no spaces)
row2
...
\`\`\`

Approach: scan the grid; for each unvisited \`1\`, DFS/BFS to count connected houses. Sort the sizes at the end.

Source: BOJ 2667 paraphrased`,
        constraints: "1 ≤ N ≤ 25",
        hints: [
          "Read each row as a string — \`grid[r][c]\` is '0' or '1' (char).",
          "Increment a counter inside DFS, or count pushes in BFS.",
          "Number of complexes = number of DFS launches. Collect sizes, sort, print.",
          "Recursion depth ≤ 625 — safe.",
        ],
        solutionExplanation:
          "Grid DFS + component-size collection. Scan all cells; each unvisited '1' launches a DFS whose return value is that complex's size. Sort and print.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 토마토 (multi-source BFS) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-008",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "어려움",
      title: "토마토 — 모두 익는 데 며칠? (다중 시작 BFS)",
      description: `\`N × M\` 창고에 토마토가 놓여 있다. 각 칸 값:
- \`1\` — 익은 토마토
- \`0\` — 안 익은 토마토
- \`-1\` — 토마토 없음 (빈 칸)

하루가 지나면 익은 토마토와 **상하좌우로 인접한** 안 익은 토마토가 모두 익는다. 모든 안 익은 토마토가 익는 데 **최소 며칠** 걸리는지 출력하라. 처음부터 모두 익어 있으면 \`0\`, 아무리 기다려도 못 익는 토마토가 있으면 \`-1\`.

핵심: **여러 시작점에서 동시에 BFS**. 처음에 모든 익은 토마토를 한꺼번에 큐에 넣고 시작 — 이게 *다중 시작 BFS* 의 핵심 트릭.

답 = 마지막에 익은 토마토의 \`dist\` (모두 익었으면). 못 익은 \`0\` 이 남아 있으면 \`-1\`.

입력 형식:
\`\`\`
M N
첫째 줄: 1×M 값
둘째 줄: 1×M 값
... (총 N 줄)
\`\`\`

출처: BOJ 7569 (2D 단순화)`,
      constraints: "2 ≤ M, N ≤ 100",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "6 4\n0 0 0 0 0 0\n0 0 0 0 0 0\n0 0 0 0 0 0\n0 0 0 0 0 1",
          expectedOutput: "8",
          label: "오른쪽 아래에서 시작 → 8 일",
        },
        {
          stdin: "6 4\n0 -1 0 0 0 0\n-1 0 0 0 0 0\n0 0 0 0 0 0\n0 0 0 0 0 1",
          expectedOutput: "-1",
          label: "장벽으로 막혀 못 익음",
        },
        {
          stdin: "5 5\n-1 1 0 0 0\n0 -1 -1 -1 0\n0 -1 0 0 0\n0 -1 -1 -1 0\n0 0 0 0 0",
          expectedOutput: "14",
          label: "미로 같은 통로",
        },
        {
          stdin: "2 1\n1 0",
          expectedOutput: "1",
          label: "1x2 — 하루",
        },
        {
          stdin: "2 2\n1 -1\n-1 1",
          expectedOutput: "0",
          label: "처음부터 모두 익음 (0 없음)",
        },
        {
          stdin: "3 3\n1 0 0\n0 0 0\n0 0 1",
          expectedOutput: "2",
          label: "두 시작점 → 2 일",
        },
        {
          stdin: "5 1\n-1 -1 -1 0 -1",
          expectedOutput: "-1",
          label: "익은 토마토 없음 → -1",
        },
      ],
      hints: [
        "*입력 순서 주의*: \`M N\` (가로 먼저), 그 다음 N 줄에 M 개씩.",
        "초기 BFS 큐에 **모든** 익은 토마토를 한꺼번에 push (dist = 0).",
        "BFS 가 끝난 뒤 격자를 다 훑어서: \`0\` 이 남아 있으면 -1, 아니면 \`dist\` 의 최댓값.",
        "다중 시작 BFS = 격자 전체를 같은 속도로 동시에 채우는 흐름.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int M, N;
    cin >> M >> N;
    vector<vector<int>> g(N, vector<int>(M));
    vector<vector<int>> dist(N, vector<int>(M, -1));
    queue<pair<int,int>> q;
    for (int r = 0; r < N; r++)
        for (int c = 0; c < M; c++) {
            cin >> g[r][c];
            if (g[r][c] == 1) {
                dist[r][c] = 0;
                q.push({r, c});
            }
        }

    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};
    int best = 0;
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        best = max(best, dist[r][c]);
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
            if (g[nr][nc] != 0 || dist[nr][nc] != -1) continue;
            dist[nr][nc] = dist[r][c] + 1;
            q.push({nr, nc});
        }
    }
    for (int r = 0; r < N; r++)
        for (int c = 0; c < M; c++)
            if (g[r][c] == 0 && dist[r][c] == -1) {
                cout << -1 << "\\n";
                return 0;
            }
    cout << best << "\\n";
    return 0;
}`,
      solutionExplanation:
        "다중 시작 BFS — 처음부터 모든 익은 토마토를 큐에 넣고 BFS. dist 가 곧 며칠 만에 익었는지. BFS 끝나고 \`0\` 이 남아 있으면 -1, 아니면 dist 의 최댓값이 답.",
      pyInitialCode: `import sys
from collections import deque
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque
input = sys.stdin.readline

m, n = map(int, input().split())
g = [list(map(int, input().split())) for _ in range(n)]
dist = [[-1] * m for _ in range(n)]
q = deque()
for r in range(n):
    for c in range(m):
        if g[r][c] == 1:
            dist[r][c] = 0
            q.append((r, c))

dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]
best = 0
while q:
    r, c = q.popleft()
    if dist[r][c] > best:
        best = dist[r][c]
    for d in range(4):
        nr, nc = r + dr[d], c + dc[d]
        if 0 <= nr < n and 0 <= nc < m and g[nr][nc] == 0 and dist[nr][nc] == -1:
            dist[nr][nc] = dist[r][c] + 1
            q.append((nr, nc))

for r in range(n):
    for c in range(m):
        if g[r][c] == 0 and dist[r][c] == -1:
            print(-1)
            sys.exit()

print(best)
`,
      en: {
        title: "Tomatoes — Days Until All Ripen (Multi-source BFS)",
        description: `An \`N × M\` warehouse stores tomatoes:
- \`1\` — ripe
- \`0\` — unripe
- \`-1\` — empty cell

Each day, ripe tomatoes ripen their **4-direction neighbors** that are unripe. Print the **minimum number of days** until all unripe tomatoes ripen. \`0\` if already all ripe; \`-1\` if some can never ripen.

Key: **multi-source BFS** — enqueue all initially ripe tomatoes at the start. That's the trick.

The answer is the max \`dist\` after BFS (if no \`0\` is left), else \`-1\`.

Input:
\`\`\`
M N
N rows of M values
\`\`\`

Source: BOJ 7569 (2D simplification)`,
        constraints: "2 ≤ M, N ≤ 100",
        hints: [
          "Read order: \`M N\` (M first), then N rows of M values.",
          "Push **all** initial ripe cells onto the BFS queue with dist = 0.",
          "After BFS, scan for any leftover \`0\` with dist == -1 → print -1; else print max dist.",
          "Multi-source BFS = an even wavefront expanding from many origins at once.",
        ],
        solutionExplanation:
          "Multi-source BFS — enqueue every ripe cell up front. dist[r][c] = day that cell ripens. If any 0 stays unvisited, print -1; otherwise max(dist).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 섬의 개수 (8 방향 DFS) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-009",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "어려움",
      title: "섬의 개수 (8 방향 DFS)",
      description: `\`H × W\` 격자가 주어진다. \`1\` 은 땅, \`0\` 은 바다. **상하좌우 + 대각선 4 방향 = 총 8 방향** 으로 연결된 땅의 묶음을 **섬** 이라 한다.

섬의 개수를 출력하라.

여러 개의 격자가 연속으로 입력될 수 있다. 종료는 \`0 0\`. 각 격자마다 답을 한 줄씩 출력.

입력 형식:
\`\`\`
W H
row1 (W 값)
row2
...
W H
...
0 0
\`\`\`

\`agra-007\` 의 4 방향 단지를 8 방향으로 확장한 문제.

출처: BOJ 4963 paraphrased`,
      constraints: "1 ≤ W, H ≤ 50, 격자 최대 50개",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "1 1\n0\n2 2\n0 1\n1 0\n3 2\n1 1 1\n1 1 1\n5 4\n1 0 1 0 0\n1 0 0 0 0\n1 0 1 0 1\n1 0 0 1 0\n5 4\n1 1 1 0 1\n1 0 1 0 1\n1 0 1 0 1\n1 0 1 1 1\n5 5\n1 0 1 0 1\n0 0 0 0 0\n1 0 1 0 1\n0 0 0 0 0\n1 0 1 0 1\n0 0",
          expectedOutput: "0\n1\n1\n3\n1\n9",
          label: "BOJ 예제 — 여러 격자",
        },
        {
          stdin: "3 3\n1 0 1\n0 1 0\n1 0 1\n0 0",
          expectedOutput: "1",
          label: "대각선으로 모두 연결 → 1 섬",
        },
        {
          stdin: "2 2\n1 0\n0 1\n0 0",
          expectedOutput: "1",
          label: "대각선 — 1 섬",
        },
        {
          stdin: "3 3\n0 0 0\n0 0 0\n0 0 0\n0 0",
          expectedOutput: "0",
          label: "모두 바다",
        },
      ],
      hints: [
        "8 방향: \`dr[] = {-1,-1,-1,0,0,1,1,1}\`, \`dc[] = {-1,0,1,-1,1,-1,0,1}\`.",
        "DFS 가 4 방향과 똑같지만 8 방향으로 확장. 단지 7번 문제의 손쉬운 변형.",
        "while 루프 안에서 \`W H\` 읽고 \`0 0\` 이면 break. 각 격자마다 \`visited\`/grid 새로 초기화.",
        "출력은 격자 하나당 한 줄 — \"\\n\" 빼먹지 말기.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int W, H;
vector<vector<int>> g;
vector<vector<bool>> visited;
int dr[] = {-1,-1,-1,0,0,1,1,1};
int dc[] = {-1,0,1,-1,1,-1,0,1};

void dfs(int r, int c) {
    visited[r][c] = true;
    for (int d = 0; d < 8; d++) {
        int nr = r + dr[d], nc = c + dc[d];
        if (nr < 0 || nr >= H || nc < 0 || nc >= W) continue;
        if (g[nr][nc] != 1 || visited[nr][nc]) continue;
        dfs(nr, nc);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    while (cin >> W >> H && (W || H)) {
        g.assign(H, vector<int>(W));
        visited.assign(H, vector<bool>(W, false));
        for (int r = 0; r < H; r++)
            for (int c = 0; c < W; c++)
                cin >> g[r][c];
        int count = 0;
        for (int r = 0; r < H; r++)
            for (int c = 0; c < W; c++)
                if (g[r][c] == 1 && !visited[r][c]) {
                    dfs(r, c);
                    count++;
                }
        cout << count << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "agra-007 단지 번호의 8 방향 버전. \`dr/dc\` 배열만 8 칸으로 확장하면 끝. 여러 입력은 \`while (cin >> W >> H)\` + \`0 0\` 종료 패턴.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

DR = [-1,-1,-1,0,0,1,1,1]
DC = [-1,0,1,-1,1,-1,0,1]

out = []
while True:
    w, h = map(int, input().split())
    if w == 0 and h == 0:
        break
    g = [list(map(int, input().split())) for _ in range(h)]
    visited = [[False] * w for _ in range(h)]
    count = 0
    for r in range(h):
        for c in range(w):
            if g[r][c] == 1 and not visited[r][c]:
                stack = [(r, c)]
                visited[r][c] = True
                while stack:
                    x, y = stack.pop()
                    for d in range(8):
                        nx, ny = x + DR[d], y + DC[d]
                        if 0 <= nx < h and 0 <= ny < w and g[nx][ny] == 1 and not visited[nx][ny]:
                            visited[nx][ny] = True
                            stack.append((nx, ny))
                count += 1
    out.append(str(count))

sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Number of Islands (8-direction DFS)",
        description: `An \`H × W\` grid: \`1\` is land, \`0\` is sea. Lands connected **horizontally, vertically, or diagonally (8 directions total)** form an **island**.

Print the number of islands.

Multiple grids are given. Terminate when \`0 0\`. Print one count per grid.

Input:
\`\`\`
W H
H rows of W values
W H
...
0 0
\`\`\`

This is \`agra-007\` extended from 4 to 8 directions.

Source: BOJ 4963 paraphrased`,
        constraints: "1 ≤ W, H ≤ 50, at most 50 grids",
        hints: [
          "8 directions: \`dr/dc\` arrays of length 8.",
          "DFS body is identical to 4-direction — just extend the offsets.",
          "Loop: read \`W H\`; break on \`0 0\`. Reinit visited per grid.",
          "One answer line per grid.",
        ],
        solutionExplanation:
          "\`agra-007\` with 8 directions — just extend the \`dr/dc\` arrays. Read-until-\`0 0\` is the standard multi-test-case loop.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 안전 영역 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-010",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "어려움",
      title: "안전 영역 (다중 시뮬레이션)",
      description: `\`N × N\` 격자의 각 칸에 높이가 적혀 있다. 비가 와서 **물에 잠긴 칸** 의 높이 ≤ 강수량 이면 잠긴다.

강수량을 \`0, 1, 2, ...\` 차례로 모두 시도해 보면서, 잠기지 않은 칸들로 이루어진 **연결 영역 (4 방향) 의 개수가 최대** 가 되도록 하는 그 최댓값을 출력하라. (강수량 0 일 때는 아무도 안 잠겨 영역 1 개.)

입력 형식:
\`\`\`
N
row1 (N 개 정수, 공백)
...
\`\`\`

핵심: 강수량을 \`0\` 부터 \`max(height)\` 까지 시도. 각 강수량마다 격자에 BFS/DFS 로 안 잠긴 칸의 연결 요소 개수를 셈. 최댓값 기록.

출처: BOJ 2468 paraphrased`,
      constraints: "2 ≤ N ≤ 100, 각 칸 높이 1 ~ 100",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n6 8 2 6 2\n3 2 3 4 6\n6 7 3 3 2\n7 2 5 3 6\n8 9 5 2 7",
          expectedOutput: "5",
          label: "BOJ 예제 — 강수량 7 일 때 5 영역",
        },
        {
          stdin: "3\n5 5 5\n5 5 5\n5 5 5",
          expectedOutput: "1",
          label: "모두 같은 높이 — 잠기기 전이 1 영역, 잠긴 후 0",
        },
        {
          stdin: "3\n1 2 3\n4 5 6\n7 8 9",
          expectedOutput: "1",
          label: "단조 증가 — 어떤 강수량이든 1 영역",
        },
        {
          stdin: "2\n1 2\n2 1",
          expectedOutput: "2",
          label: "강수량 1 — 두 1 칸이 안 잠긴 채 따로",
        },
        {
          stdin: "4\n10 10 10 10\n10 1 1 10\n10 1 1 10\n10 10 10 10",
          expectedOutput: "1",
          label: "안쪽이 낮음 — 가장자리 1 영역 최대",
        },
        {
          stdin: "5\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1\n1 1 1 1 1",
          expectedOutput: "1",
          label: "모두 1 — 강수량 0 일 때 1 영역",
        },
      ],
      hints: [
        "강수량 0 도 반드시 포함 — 답이 최소 1 이상.",
        "각 강수량마다: BFS/DFS 로 \`높이 > 강수량\` 칸들의 4 방향 연결 요소 개수.",
        "최대 높이를 찾아 그것까지만 시도하면 충분 (그 이상은 0).",
        "N ≤ 100, 강수량 0~100 → 약 1.01 × 10^6 칸 검사 — 충분히 빠름.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> g;
vector<vector<bool>> visited;
int dr[] = {-1,1,0,0};
int dc[] = {0,0,-1,1};

void dfs(int r, int c, int rain) {
    visited[r][c] = true;
    for (int d = 0; d < 4; d++) {
        int nr = r + dr[d], nc = c + dc[d];
        if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
        if (visited[nr][nc] || g[nr][nc] <= rain) continue;
        dfs(nr, nc, rain);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    g.assign(N, vector<int>(N));
    int maxH = 0;
    for (int r = 0; r < N; r++)
        for (int c = 0; c < N; c++) {
            cin >> g[r][c];
            maxH = max(maxH, g[r][c]);
        }
    int best = 0;
    for (int rain = 0; rain <= maxH; rain++) {
        visited.assign(N, vector<bool>(N, false));
        int cnt = 0;
        for (int r = 0; r < N; r++)
            for (int c = 0; c < N; c++)
                if (!visited[r][c] && g[r][c] > rain) {
                    dfs(r, c, rain);
                    cnt++;
                }
        best = max(best, cnt);
    }
    cout << best << "\\n";
    return 0;
}`,
      solutionExplanation:
        "강수량 0..max 를 전부 시뮬레이션. 각 강수량마다 visited 새로 초기화 후 4 방향 DFS 로 안 잠긴 영역 개수 세기. 최댓값이 답. 단순하지만 '여러 시나리오를 BFS/DFS 로 비교' 라는 전형적인 그래프 시뮬 패턴.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
g = [list(map(int, input().split())) for _ in range(n)]
max_h = max(max(row) for row in g)

DR = [-1,1,0,0]
DC = [0,0,-1,1]

best = 0
for rain in range(max_h + 1):
    visited = [[False] * n for _ in range(n)]
    count = 0
    for r in range(n):
        for c in range(n):
            if not visited[r][c] and g[r][c] > rain:
                stack = [(r, c)]
                visited[r][c] = True
                while stack:
                    x, y = stack.pop()
                    for d in range(4):
                        nx, ny = x + DR[d], y + DC[d]
                        if 0 <= nx < n and 0 <= ny < n and not visited[nx][ny] and g[nx][ny] > rain:
                            visited[nx][ny] = True
                            stack.append((nx, ny))
                count += 1
    if count > best:
        best = count

print(best)
`,
      en: {
        title: "Safe Zone (Multi-Simulation)",
        description: `Each cell of an \`N × N\` grid has a height. With a given rainfall, cells with height ≤ rainfall are submerged.

For rainfalls \`0, 1, 2, ...\`, count the number of **4-direction connected components** of dry cells, and print the **maximum** such count. (Rainfall 0 means nothing submerged → 1 region.)

Input:
\`\`\`
N
row1 (N integers, space-separated)
...
\`\`\`

Approach: try every rainfall from 0 to max(height); for each, run BFS/DFS on dry cells; track the max region count.

Source: BOJ 2468 paraphrased`,
        constraints: "2 ≤ N ≤ 100, heights 1..100",
        hints: [
          "Include rainfall 0 — answer is at least 1.",
          "For each rainfall, BFS/DFS over cells with \`height > rainfall\` (4 directions) and count components.",
          "Stop at max(height); beyond that everything is submerged.",
          "N ≤ 100, ~100 rainfalls × 10000 cells ≈ 10^6 — easily fast.",
        ],
        solutionExplanation:
          "Simulate every rainfall 0..max. For each, reinit visited, DFS over dry cells, count components, keep the best. Classic 'compare scenarios via BFS/DFS' pattern.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 유기농 배추 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-011",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "어려움",
      title: "유기농 배추 (다중 테스트 케이스)",
      description: `\`M × N\` 밭에 배추 \`K\` 개가 어딘가에 심어져 있다. **상하좌우** 로 인접한 배추 묶음 하나마다 흰 지렁이 한 마리가 필요하다. 필요한 지렁이의 **최소 개수** = **배추 묶음의 개수** 를 출력하라.

테스트 케이스가 \`T\` 개 주어진다. 각 테스트마다 답을 한 줄씩.

입력 형식:
\`\`\`
T
M N K
x1 y1
x2 y2
... (K 줄)
M N K
...
\`\`\`

여기서 \`(x, y)\` 는 배추 한 포기 좌표 — 격자에서 \`grid[y][x] = 1\` 로 표시한다고 보면 됨 (행 = y, 열 = x).

핵심: 격자에 배추를 찍어 두고 \`agra-007\` 처럼 4 방향 연결 요소 카운트.

출처: BOJ 1012 paraphrased`,
      constraints: "1 ≤ T ≤ 50, 1 ≤ M ≤ 50, 1 ≤ N ≤ 50, 1 ≤ K ≤ M × N",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin:
            "2\n10 8 17\n0 0\n1 0\n1 1\n4 2\n4 3\n4 5\n2 4\n3 4\n7 4\n8 4\n9 4\n7 5\n8 5\n9 5\n7 6\n8 6\n9 6\n10 10 1\n5 5",
          expectedOutput: "5\n1",
          label: "BOJ 예제",
        },
        {
          stdin: "1\n5 3 6\n0 2\n1 2\n2 2\n3 2\n4 2\n4 0",
          expectedOutput: "2",
          label: "한 줄 + 외딴 한 칸",
        },
        {
          stdin: "1\n3 3 9\n0 0\n0 1\n0 2\n1 0\n1 1\n1 2\n2 0\n2 1\n2 2",
          expectedOutput: "1",
          label: "3x3 전체 채움 → 1 묶음",
        },
        {
          stdin: "1\n5 5 4\n0 0\n2 2\n4 4\n1 3",
          expectedOutput: "4",
          label: "모두 떨어져 있음 → 4 마리",
        },
        {
          stdin: "1\n4 4 4\n0 0\n0 1\n1 0\n1 1",
          expectedOutput: "1",
          label: "2x2 블록 — 1 묶음",
        },
        {
          stdin: "3\n2 2 1\n0 0\n3 3 3\n0 0\n2 2\n1 1\n4 4 8\n0 0\n0 1\n0 2\n0 3\n3 0\n3 1\n3 2\n3 3",
          expectedOutput: "1\n3\n2",
          label: "여러 테스트 케이스",
        },
      ],
      hints: [
        "\`grid[N][M]\` 을 0 으로 초기화 → 입력의 \`x y\` 마다 \`grid[y][x] = 1\`.",
        "agra-007 과 같은 4 방향 DFS/BFS 로 연결 요소 개수 카운트.",
        "테스트 케이스마다 grid/visited 새로 초기화 잊지 말기.",
        "M, N 헷갈리지 않게 — \`M\` 가로 길이, \`N\` 세로 길이.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int M, N;
vector<vector<int>> g;
vector<vector<bool>> visited;
int dr[] = {-1,1,0,0};
int dc[] = {0,0,-1,1};

void dfs(int r, int c) {
    visited[r][c] = true;
    for (int d = 0; d < 4; d++) {
        int nr = r + dr[d], nc = c + dc[d];
        if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
        if (g[nr][nc] != 1 || visited[nr][nc]) continue;
        dfs(nr, nc);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int T;
    cin >> T;
    while (T--) {
        int K;
        cin >> M >> N >> K;
        g.assign(N, vector<int>(M, 0));
        visited.assign(N, vector<bool>(M, false));
        for (int i = 0; i < K; i++) {
            int x, y;
            cin >> x >> y;
            g[y][x] = 1;
        }
        int count = 0;
        for (int r = 0; r < N; r++)
            for (int c = 0; c < M; c++)
                if (g[r][c] == 1 && !visited[r][c]) {
                    dfs(r, c);
                    count++;
                }
        cout << count << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "agra-007 단지 번호의 다중 테스트 케이스 버전. 좌표 \`(x, y)\` 를 \`grid[y][x]\` 로 변환하는 것만 주의. 4 방향 DFS 로 연결 요소 개수 = 지렁이 마리수.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

DR = [-1,1,0,0]
DC = [0,0,-1,1]

out = []
t = int(input())
for _ in range(t):
    m, n, k = map(int, input().split())
    g = [[0] * m for _ in range(n)]
    for _ in range(k):
        x, y = map(int, input().split())
        g[y][x] = 1
    visited = [[False] * m for _ in range(n)]
    count = 0
    for r in range(n):
        for c in range(m):
            if g[r][c] == 1 and not visited[r][c]:
                stack = [(r, c)]
                visited[r][c] = True
                while stack:
                    x, y = stack.pop()
                    for d in range(4):
                        nx, ny = x + DR[d], y + DC[d]
                        if 0 <= nx < n and 0 <= ny < m and g[nx][ny] == 1 and not visited[nx][ny]:
                            visited[nx][ny] = True
                            stack.append((nx, ny))
                count += 1
    out.append(str(count))

sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Organic Cabbages (Multi Test Cases)",
        description: `An \`M × N\` field has \`K\` cabbages. Each 4-directionally connected cluster needs one worm. Print the **number of clusters** (= worms needed).

\`T\` test cases. One answer per line.

Input:
\`\`\`
T
M N K
x1 y1
... (K lines)
M N K
...
\`\`\`

\`(x, y)\` = cabbage coordinate → \`grid[y][x] = 1\`.

Same as \`agra-007\` style component counting, just multi-tested.

Source: BOJ 1012 paraphrased`,
        constraints: "1 ≤ T ≤ 50, 1 ≤ M, N ≤ 50, 1 ≤ K ≤ M × N",
        hints: [
          "Init \`grid[N][M] = 0\`; for each input \`x y\`, set \`grid[y][x] = 1\`.",
          "Standard 4-direction DFS/BFS for component count.",
          "Reset grid/visited per test case.",
          "Don't confuse M (width) vs N (height).",
        ],
        solutionExplanation:
          "Multi-test version of agra-007 with \`(x, y) → grid[y][x]\`. 4-direction DFS counts connected components = number of worms.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 미로 만들기 (0-1 BFS) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "agra-012",
      cluster: "algo-graph-contest",
      unlockAfter: "algo-graph",
      difficulty: "어려움",
      title: "미로 만들기 (0-1 BFS)",
      description: `\`N × N\` 격자의 각 칸은 \`1\` (흰 방) 또는 \`0\` (검은 방). 인접한 흰 방 끼리는 그냥 이동할 수 있지만, 검은 방에 들어가려면 그 방을 흰 방으로 **바꿔야** 한다. 바꾼 횟수 = 비용.

\`(0, 0)\` 에서 \`(N-1, N-1)\` 까지 가는 데 필요한 **최소 비용** 을 출력하라. 시작과 끝은 항상 \`1\`.

핵심 — **0-1 BFS** (deque):
- 흰 방으로 가는 간선 = 가중치 0 → **deque 앞** 에 push
- 검은 방으로 가는 간선 = 가중치 1 → **deque 뒤** 에 push
- 항상 dist 작은 것이 앞에 있게 유지 → 첫 도착이 최단

다익스트라로도 풀린다 — 둘 다 OK.

입력 형식:
\`\`\`
N
row1 (N 글자, 공백 없음)
row2
...
\`\`\`

출처: BOJ 2665 simplified`,
      constraints: "1 ≤ N ≤ 50",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "8\n11100110\n11010010\n10011010\n11101100\n01000111\n00110001\n11011000\n10010101",
          expectedOutput: "2",
          label: "BOJ 예제 — 검은 방 2 개 통과",
        },
        {
          stdin: "1\n1",
          expectedOutput: "0",
          label: "1x1 — 출발 = 도착",
        },
        {
          stdin: "2\n11\n11",
          expectedOutput: "0",
          label: "모두 흰 방 — 비용 0",
        },
        {
          stdin: "3\n111\n101\n111",
          expectedOutput: "0",
          label: "양쪽 길로 우회 — 비용 0",
        },
        {
          stdin: "3\n100\n000\n001",
          expectedOutput: "3",
          label: "검은 방 세 개 통과",
        },
        {
          stdin: "4\n1001\n0010\n0100\n1001",
          expectedOutput: "4",
          label: "여러 갈래",
        },
        {
          stdin: "2\n10\n01",
          expectedOutput: "1",
          label: "1 회 바꿈",
        },
      ],
      hints: [
        "\`deque<pair<int,int>>\` 사용. 시작점 \`(0, 0)\` 을 앞에 push, dist[0][0] = 0.",
        "다음 칸으로 갈 때 새 dist 가 더 작으면 갱신: 흰 방 \`(+0)\` 은 \`push_front\`, 검은 방 \`(+1)\` 은 \`push_back\`.",
        "\`dist[N-1][N-1]\` 이 답. 다익스트라 (priority_queue) 도 동일 결과 — 작은 N 이라 무엇이든 OK.",
        "주의: 시작 칸 비용은 0 (시작 칸이 1 이므로 그대로).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    vector<string> grid(N);
    for (int i = 0; i < N; i++) cin >> grid[i];

    const int INF = 1e9;
    vector<vector<int>> dist(N, vector<int>(N, INF));
    deque<pair<int,int>> dq;
    dq.push_front({0, 0});
    dist[0][0] = 0;

    int dr[] = {-1,1,0,0};
    int dc[] = {0,0,-1,1};

    while (!dq.empty()) {
        auto [r, c] = dq.front(); dq.pop_front();
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
            int w = (grid[nr][nc] == '0') ? 1 : 0;
            if (dist[r][c] + w < dist[nr][nc]) {
                dist[nr][nc] = dist[r][c] + w;
                if (w == 0) dq.push_front({nr, nc});
                else dq.push_back({nr, nc});
            }
        }
    }
    cout << dist[N-1][N-1] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "0-1 BFS 의 정석 — 가중치가 0 또는 1 일 때 deque 로 양 끝 push 만 해도 다익스트라와 같은 효과. 가중치 0 은 앞, 1 은 뒤로 → 항상 가장 작은 dist 가 앞. N ≤ 50 이라 다익스트라/단순 BFS 변형 모두 통과하지만 0-1 BFS 패턴을 익혀 두면 더 큰 입력에서도 빠르다.",
      pyInitialCode: `import sys
from collections import deque
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque
input = sys.stdin.readline

n = int(input())
grid = [input().strip() for _ in range(n)]

INF = 10**9
dist = [[INF] * n for _ in range(n)]
dq = deque()
dq.appendleft((0, 0))
dist[0][0] = 0

DR = [-1,1,0,0]
DC = [0,0,-1,1]

while dq:
    r, c = dq.popleft()
    for d in range(4):
        nr, nc = r + DR[d], c + DC[d]
        if 0 <= nr < n and 0 <= nc < n:
            w = 1 if grid[nr][nc] == '0' else 0
            if dist[r][c] + w < dist[nr][nc]:
                dist[nr][nc] = dist[r][c] + w
                if w == 0:
                    dq.appendleft((nr, nc))
                else:
                    dq.append((nr, nc))

print(dist[n-1][n-1])
`,
      en: {
        title: "Maze Construction (0-1 BFS)",
        description: `Each cell of an \`N × N\` grid is \`1\` (white room) or \`0\` (black room). Adjacent white rooms can be entered freely; entering a black room requires **converting** it to white. Conversions count as cost.

Print the **minimum cost** to go from \`(0, 0)\` to \`(N-1, N-1)\`. Start and end are always \`1\`.

Key — **0-1 BFS** (deque):
- Edge to a white cell has weight 0 → **push_front**
- Edge to a black cell has weight 1 → **push_back**

This keeps the smallest dist always at the front → first arrival = shortest. Dijkstra also works.

Input:
\`\`\`
N
row1 (N chars, no spaces)
...
\`\`\`

Source: BOJ 2665 simplified`,
        constraints: "1 ≤ N ≤ 50",
        hints: [
          "Use \`deque<pair<int,int>>\`. Push start front, \`dist[0][0] = 0\`.",
          "Relax: weight 0 → push_front, weight 1 → push_back.",
          "Read \`dist[N-1][N-1]\` for the answer.",
          "Start cell costs 0 (it is white).",
        ],
        solutionExplanation:
          "Textbook 0-1 BFS — for weights ∈ {0,1}, a deque (push_front for 0, push_back for 1) gives Dijkstra-like behavior with O(V+E). Works for any size and is the right tool here.",
      },
    },
  ],
}
