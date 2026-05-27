import type { PracticeCluster } from "./types"

export const shortestPathContestCluster: PracticeCluster = {
  id: "algo-shortestpath-contest",
  title: "최단 경로 문제 풀이",
  emoji: "🗺️",
  description: "Dijkstra / Bellman-Ford / Floyd-Warshall — 가중치 그래프 위에서 최소 비용 길 찾기",
  unlockAfter: "algo-shortestpath",
  en: {
    title: "Shortest Path Practice",
    description: "Dijkstra / Bellman-Ford / Floyd-Warshall — least-cost paths on weighted graphs",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. Dijkstra 기본 — 보통 (BOJ 1753)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-001",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "보통",
      title: "최단 경로 (Dijkstra 기본)",
      description: `방향 가중치 그래프가 주어진다. 시작 정점 \`K\` 에서 모든 정점까지의 **최단 거리** 를 출력하라.

입력:
- 첫 줄: 정점 수 \`V\`, 간선 수 \`E\`
- 둘째 줄: 시작 정점 \`K\`
- 다음 \`E\` 줄: \`u v w\` — \`u\` 에서 \`v\` 로 가는 가중치 \`w\` 의 간선

출력: 1 번 정점부터 V 번 정점까지 한 줄에 하나씩 거리 출력. 도달 불가능하면 \`INF\` 출력. 시작 정점 자신은 0.

가중치는 모두 양수.

출처: BOJ 1753 paraphrased`,
      constraints: "1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000, 1 ≤ K ≤ V, 1 ≤ w ≤ 10",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 6\n1\n5 1 1\n1 2 2\n1 3 3\n2 3 4\n2 4 5\n3 4 6",
          expectedOutput: "0\n2\n3\n7\nINF",
          label: "기본 — BOJ 예제",
        },
        {
          stdin: "3 3\n1\n1 2 1\n2 3 1\n1 3 5",
          expectedOutput: "0\n1\n2",
          label: "1→2→3 (2) 이 1→3 (5) 보다 짧음",
        },
        {
          stdin: "4 2\n1\n1 2 3\n3 4 5",
          expectedOutput: "0\n3\nINF\nINF",
          label: "두 컴포넌트 — 도달 불가 INF",
        },
        {
          stdin: "1 0\n1",
          expectedOutput: "0",
          label: "정점 1 개 — 자기 자신만",
        },
        {
          stdin: "5 7\n3\n1 2 1\n2 3 1\n3 4 1\n4 5 1\n1 5 10\n3 1 2\n3 5 8",
          expectedOutput: "2\n3\n0\n1\n2",
          label: "역방향 간선 포함",
        },
      ],
      hints: [
        "우선순위 큐 (min-heap) + dist[] 배열로 Dijkstra 구현.",
        "C++: `priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>>` — (거리, 정점) 쌍.",
        "큐에서 꺼낸 (d, u) 가 dist[u] 와 다르면 *낡은 항목* — skip!",
        "도달 불가능한 정점은 dist[i] == INF — 'INF' 문자열로 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int V, E, K;
    cin >> V >> E >> K;
    vector<vector<pair<int,int>>> g(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
    }

    const long long INF = LLONG_MAX;
    vector<long long> dist(V + 1, INF);
    dist[K] = 0;
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    pq.push({0, K});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d != dist[u]) continue;       // 낡은 항목
        for (auto [v, w] : g[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }

    for (int i = 1; i <= V; i++) {
        if (dist[i] == INF) cout << "INF\\n";
        else cout << dist[i] << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "Dijkstra 의 정석 — 우선순위 큐로 가장 가까운 정점부터 확정. 큐에서 꺼낼 때 dist 와 비교해 낡은 항목 걸러내기, 더 짧은 경로 발견 시 갱신 후 큐에 push. 시간 O((V+E) log V).",
      pyInitialCode: `import heapq
import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import heapq
import sys
input = sys.stdin.readline

v, e = map(int, input().split())
k = int(input())
g = [[] for _ in range(v + 1)]
for _ in range(e):
    u, vv, w = map(int, input().split())
    g[u].append((vv, w))

INF = float("inf")
dist = [INF] * (v + 1)
dist[k] = 0
pq = [(0, k)]

while pq:
    d, u = heapq.heappop(pq)
    if d != dist[u]:
        continue
    for nv, w in g[u]:
        if dist[u] + w < dist[nv]:
            dist[nv] = dist[u] + w
            heapq.heappush(pq, (dist[nv], nv))

out = []
for i in range(1, v + 1):
    out.append("INF" if dist[i] == INF else str(dist[i]))
print("\\n".join(out))
`,
      en: {
        title: "Shortest Path (Dijkstra Basic)",
        description: `Directed weighted graph. Print the **shortest distance** from start vertex \`K\` to every vertex.

Input:
- Line 1: vertices \`V\`, edges \`E\`
- Line 2: start \`K\`
- Next \`E\` lines: \`u v w\` — edge from \`u\` to \`v\` with weight \`w\`

Output: distance from 1..V, one per line. Print \`INF\` if unreachable. Start vertex is 0.

All weights positive.

Source: BOJ 1753 paraphrased`,
        constraints: "1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000, 1 ≤ K ≤ V, 1 ≤ w ≤ 10",
        hints: [
          "Priority queue (min-heap) + dist[] = standard Dijkstra.",
          "C++: `priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>>` storing (dist, node).",
          "If popped d != dist[u], it's a stale entry — skip!",
          "Unreachable → dist[i] == INF → print 'INF'.",
        ],
        solutionExplanation:
          "Standard Dijkstra — priority queue confirms the closest unvisited vertex first. Stale-entry skip on pop, relax neighbors, push updates. O((V+E) log V).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. Dijkstra 그리드 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-002",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "보통",
      title: "격자 최단 비용 (Dijkstra 4 방향)",
      description: `N × M 격자가 주어진다. 각 칸 \`(r, c)\` 에는 **통과 비용** \`cost[r][c]\` 가 적혀 있다. \`(0, 0)\` 에서 \`(N-1, M-1)\` 까지 상하좌우 4 방향으로 이동하며, 칸을 방문할 때마다 그 칸의 비용이 누적된다. \`(0, 0)\` 의 비용도 포함, \`(N-1, M-1)\` 의 비용도 포함.

**최소 누적 비용** 을 출력하라.

격자 위 Dijkstra: 정점 = 칸, 간선 = 인접 칸으로의 이동 (가중치 = 도착 칸의 비용).

출처: 원본 (격자 + Dijkstra)`,
      constraints: "1 ≤ N, M ≤ 500, 1 ≤ cost ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3 3\n1 3 1\n1 5 1\n4 2 1",
          expectedOutput: "7",
          label: "1→3 (오) 안 거치고 1→1→4→2→1 = 7",
        },
        {
          stdin: "1 1\n42",
          expectedOutput: "42",
          label: "1×1 — 시작 = 끝",
        },
        {
          stdin: "1 4\n1 2 3 4",
          expectedOutput: "10",
          label: "한 줄 — 모두 통과",
        },
        {
          stdin: "2 2\n1 100\n1 1",
          expectedOutput: "3",
          label: "100 우회 — 아래로 가는 게 이득",
        },
        {
          stdin: "4 4\n1 1 1 1\n9 9 9 1\n1 1 1 1\n1 9 9 9",
          expectedOutput: "10",
          label: "지그재그 경로",
        },
        {
          stdin: "3 3\n1 1 1\n1 1 1\n1 1 1",
          expectedOutput: "5",
          label: "균일 비용 — 5 칸 통과",
        },
      ],
      hints: [
        "(r, c) 를 그래프의 정점으로, 4 방향 이웃을 간선으로 본다.",
        "dist[r][c] = (r, c) 도달 최소 비용. 시작: dist[0][0] = cost[0][0].",
        "이웃 (nr, nc) 갱신: dist[nr][nc] = dist[r][c] + cost[nr][nc] (도착 칸 비용을 더함).",
        "우선순위 큐 — (현재 비용, r, c) 튜플로 push.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    vector<vector<int>> cost(N, vector<int>(M));
    for (int i = 0; i < N; i++)
        for (int j = 0; j < M; j++)
            cin >> cost[i][j];

    const long long INF = LLONG_MAX;
    vector<vector<long long>> dist(N, vector<long long>(M, INF));
    dist[0][0] = cost[0][0];

    priority_queue<tuple<long long,int,int>, vector<tuple<long long,int,int>>, greater<>> pq;
    pq.push({dist[0][0], 0, 0});

    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};

    while (!pq.empty()) {
        auto [d, r, c] = pq.top(); pq.pop();
        if (d != dist[r][c]) continue;
        for (int k = 0; k < 4; k++) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
            long long nd = d + cost[nr][nc];
            if (nd < dist[nr][nc]) {
                dist[nr][nc] = nd;
                pq.push({nd, nr, nc});
            }
        }
    }

    cout << dist[N-1][M-1] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "격자 위 Dijkstra — 정점이 (r, c) 쌍이라는 것만 다르고 알고리즘은 동일. 시작 칸 비용도 포함하는 게 함정 포인트 (dist[0][0] = cost[0][0] 초기화).",
      pyInitialCode: `import heapq
import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import heapq
import sys
input = sys.stdin.readline

n, m = map(int, input().split())
cost = [list(map(int, input().split())) for _ in range(n)]

INF = float("inf")
dist = [[INF] * m for _ in range(n)]
dist[0][0] = cost[0][0]
pq = [(cost[0][0], 0, 0)]

dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]

while pq:
    d, r, c = heapq.heappop(pq)
    if d != dist[r][c]:
        continue
    for k in range(4):
        nr, nc = r + dr[k], c + dc[k]
        if 0 <= nr < n and 0 <= nc < m:
            nd = d + cost[nr][nc]
            if nd < dist[nr][nc]:
                dist[nr][nc] = nd
                heapq.heappush(pq, (nd, nr, nc))

print(dist[n - 1][m - 1])
`,
      en: {
        title: "Grid Minimum Path Cost (Dijkstra 4-dir)",
        description: `An N × M grid; cell \`(r, c)\` has cost \`cost[r][c]\`. Travel from \`(0, 0)\` to \`(N-1, M-1)\` moving up/down/left/right; each cell's cost adds when visited (both endpoints included).

Output the **minimum total cost**.

Grid Dijkstra: vertices = cells, edges = adjacency (weight = entry cost of destination cell).

Source: original (grid + Dijkstra)`,
        constraints: "1 ≤ N, M ≤ 500, 1 ≤ cost ≤ 1000",
        hints: [
          "Treat (r, c) as a vertex; 4-neighbors are edges.",
          "dist[r][c] = min cost to reach (r, c). Init dist[0][0] = cost[0][0].",
          "Relax: dist[nr][nc] = dist[r][c] + cost[nr][nc].",
          "Priority queue holds (cost, r, c) tuples.",
        ],
        solutionExplanation:
          "Standard Dijkstra where vertices are cells. Don't forget the start cell's own cost in dist[0][0].",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 가중치 없는 그래프 BFS — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-003",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "보통",
      title: "가중치 없는 최단 경로 (BFS)",
      description: `무방향 그래프에서 시작 정점 1 에서 모든 정점까지의 **최단 거리 (간선 수)** 를 출력하라. 모든 간선의 가중치가 1 이면 Dijkstra 가 아니라 **BFS** 가 더 빠르다 (O(V + E)).

입력:
- 첫 줄: \`V E\`
- 다음 \`E\` 줄: \`u v\` — 무방향 간선

출력: 1 ~ V 번 정점까지 한 줄에 하나씩 거리. 도달 불가능하면 \`-1\`. 시작 정점은 0.

핵심: BFS 큐에서 처음 꺼낸 순간이 그 정점의 최단 거리 — 가중치 1 일 때만 성립.

출처: 원본 (BFS = 단위 가중치 Dijkstra)`,
      constraints: "1 ≤ V ≤ 100,000, 0 ≤ E ≤ 200,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 4\n1 2\n2 3\n3 4\n4 5",
          expectedOutput: "0\n1\n2\n3\n4",
          label: "일자 그래프 1-2-3-4-5",
        },
        {
          stdin: "4 4\n1 2\n2 3\n3 4\n1 4",
          expectedOutput: "0\n1\n2\n1",
          label: "직접 간선이 더 짧은 경로",
        },
        {
          stdin: "6 4\n1 2\n2 3\n4 5\n5 6",
          expectedOutput: "0\n1\n2\n-1\n-1\n-1",
          label: "두 컴포넌트 — 4, 5, 6 도달 불가",
        },
        {
          stdin: "1 0",
          expectedOutput: "0",
          label: "정점 1 개",
        },
        {
          stdin: "3 3\n1 2\n2 3\n1 3",
          expectedOutput: "0\n1\n1",
          label: "삼각형 — 모두 거리 1",
        },
      ],
      hints: [
        "BFS 의 정석 — queue 와 dist[] 배열로 한 번씩만 방문.",
        "처음 꺼낸 순간이 그 정점의 최단 거리. 한 번 visited 되면 다시 push 안 함.",
        "그래프가 무방향이므로 한 간선당 양쪽 인접 리스트에 추가.",
        "Dijkstra 대신 BFS — 가중치 1 일 때 O(V+E) 로 더 빠름.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int V, E;
    cin >> V >> E;
    vector<vector<int>> g(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }

    vector<int> dist(V + 1, -1);
    dist[1] = 0;
    queue<int> q;
    q.push(1);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : g[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }

    for (int i = 1; i <= V; i++) {
        cout << dist[i] << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "가중치가 모두 같으면 BFS 가 최단 경로의 정답 — 큐에서 처음 꺼낸 순간이 최단 거리이고 한 번 방문된 정점은 다시 갱신될 일이 없다. log V 인수가 빠지므로 Dijkstra 보다 빠르다.",
      pyInitialCode: `from collections import deque
import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `from collections import deque
import sys
input = sys.stdin.readline

v, e = map(int, input().split())
g = [[] for _ in range(v + 1)]
for _ in range(e):
    a, b = map(int, input().split())
    g[a].append(b)
    g[b].append(a)

dist = [-1] * (v + 1)
dist[1] = 0
q = deque([1])
while q:
    u = q.popleft()
    for nv in g[u]:
        if dist[nv] == -1:
            dist[nv] = dist[u] + 1
            q.append(nv)

print("\\n".join(str(dist[i]) for i in range(1, v + 1)))
`,
      en: {
        title: "Unweighted Shortest Path (BFS)",
        description: `Undirected graph. Print shortest **edge count** distance from vertex 1 to every other vertex. When all weights equal 1, **BFS** beats Dijkstra (O(V+E)).

Input:
- Line 1: \`V E\`
- Next \`E\` lines: \`u v\` — undirected edge.

Output: distance for 1..V, one per line. \`-1\` if unreachable. Start is 0.

Key: first time BFS pops a vertex = its shortest distance (only valid for unit weights).

Source: original (BFS = unit-weight Dijkstra)`,
        constraints: "1 ≤ V ≤ 100,000, 0 ≤ E ≤ 200,000",
        hints: [
          "Standard BFS — queue + dist[] visited once.",
          "First pop = shortest distance. No re-pushing.",
          "Undirected → push both directions in adjacency list.",
          "BFS over Dijkstra — O(V+E) without the log factor.",
        ],
        solutionExplanation:
          "BFS is optimal for unit weights — first dequeue is the shortest. No log factor, faster than Dijkstra.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. K-th shortest (단순화) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-004",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "보통",
      title: "K 번째 최단 경로",
      description: `방향 가중치 그래프와 시작 정점 1, 도착 정점 N, 정수 K 가 주어진다. **1 에서 N 까지 가는 K 번째로 짧은 경로의 길이** 를 출력하라. 같은 정점을 여러 번 지나갈 수 있고, 같은 길이의 경로도 모두 따로 세어 본다. K 개의 경로가 없으면 \`-1\` 출력.

입력:
- 첫 줄: \`N M K\` — 정점 수, 간선 수, K
- 다음 \`M\` 줄: \`u v w\` — 방향 간선

핵심 — Dijkstra 변형: dist 배열 대신 \`dists[v]\` = 사이즈 K 의 정렬된 리스트 (또는 max-heap) 으로 v 까지의 K 개 최단을 유지. 새 경로가 들어왔을 때 heap 크기가 K 미만이면 push, K 면 top 보다 작은 경우만 교체.

출처: BOJ 1854 paraphrased`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ 200,000, 1 ≤ K ≤ 100, 1 ≤ w ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 10 2\n1 2 2\n1 3 7\n1 4 5\n1 5 6\n2 4 2\n2 3 4\n3 4 6\n3 5 8\n5 2 4\n5 4 1",
          expectedOutput: "-1\n10\n7\n5\n14",
          label: "BOJ 예제 (여기서는 도착 N=5 의 2번째 → 출력은 1..N 의 2번째)",
        },
        {
          stdin: "2 1 1\n1 2 5",
          expectedOutput: "0\n5",
          label: "1번째 — 직접 간선",
        },
        {
          stdin: "2 0 1",
          expectedOutput: "0\n-1",
          label: "간선 없음 — 도달 불가",
        },
        {
          stdin: "3 4 2\n1 2 1\n1 2 3\n2 3 5\n1 3 100",
          expectedOutput: "-1\n3\n8",
          label: "1→2 두 경로, 2번째 거리 (1 은 자기 경로 1 개뿐 → -1)",
        },
      ],
      hints: [
        "각 정점 v 에 대해 'K 개의 최단 거리들' 을 유지 — max-heap (크기 K 캡).",
        "새 거리 d 가 들어왔을 때: 힙 크기 < K → push; 크기 = K 이고 d < top → pop, push.",
        "max-heap 의 top = '현재까지 본 K 개 중 가장 큰 것' — 새 d 가 이보다 크면 영향 없음 → skip.",
        "출력: heap 의 top (1..N 각각).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M, K;
    cin >> N >> M >> K;
    vector<vector<pair<int,int>>> g(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
    }

    // 각 정점마다 max-heap (크기 K 유지) — top = 현재 K-th 후보
    vector<priority_queue<long long>> best(N + 1);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    best[1].push(0);
    pq.push({0, 1});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        for (auto [v, w] : g[u]) {
            long long nd = d + w;
            if ((int)best[v].size() < K) {
                best[v].push(nd);
                pq.push({nd, v});
            } else if (nd < best[v].top()) {
                best[v].pop();
                best[v].push(nd);
                pq.push({nd, v});
            }
        }
    }

    for (int i = 1; i <= N; i++) {
        if ((int)best[i].size() < K) cout << -1 << "\\n";
        else cout << best[i].top() << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "Dijkstra 의 자연스러운 확장 — dist[v] (스칼라) 대신 best[v] (사이즈 K max-heap) 를 유지. 새 거리가 들어올 때 힙이 덜 차 있거나 top 보다 작으면 갱신. 각 간선이 최대 K 번 처리되므로 시간 O((N + M) K log(NK)).",
      pyInitialCode: `import heapq
import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import heapq
import sys
input = sys.stdin.readline

n, m, k = map(int, input().split())
g = [[] for _ in range(n + 1)]
for _ in range(m):
    u, v, w = map(int, input().split())
    g[u].append((v, w))

# best[v]: 크기 K max-heap (negated for min-heap module use)
best = [[] for _ in range(n + 1)]
heapq.heappush(best[1], -0)  # 0 → -0
pq = [(0, 1)]

while pq:
    d, u = heapq.heappop(pq)
    for v, w in g[u]:
        nd = d + w
        if len(best[v]) < k:
            heapq.heappush(best[v], -nd)
            heapq.heappush(pq, (nd, v))
        elif nd < -best[v][0]:
            heapq.heapreplace(best[v], -nd)
            heapq.heappush(pq, (nd, v))

out = []
for i in range(1, n + 1):
    if len(best[i]) < k:
        out.append("-1")
    else:
        out.append(str(-best[i][0]))
print("\\n".join(out))
`,
      en: {
        title: "K-th Shortest Path",
        description: `Directed weighted graph, start = 1, target = N, integer K. Output the **length of the K-th shortest path** from 1 to every vertex. Paths may revisit vertices; equal-length distinct paths each count. \`-1\` if fewer than K paths exist.

Input:
- Line 1: \`N M K\`
- Next \`M\` lines: \`u v w\` directed edge.

Dijkstra variant: replace \`dist[v]\` (scalar) with a size-K max-heap of best distances to v. On a new candidate d: if heap < K push; else if d < heap-top replace.

Source: BOJ 1854 paraphrased`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ 200,000, 1 ≤ K ≤ 100, 1 ≤ w ≤ 1000",
        hints: [
          "Per vertex: max-heap of size ≤ K. Top = current K-th candidate.",
          "Push if size < K, else replace if d < top.",
          "Skip if d ≥ top (won't enter the top-K).",
          "Print top of each heap (or -1 if size < K).",
        ],
        solutionExplanation:
          "Natural Dijkstra extension — keep K best distances per vertex. Edge processed ≤ K times → O((N+M) K log(NK)).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 출발지 여러 개 (multi-source) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-005",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "보통",
      title: "여러 출발지 최단 거리 (Multi-source Dijkstra)",
      description: `N × M 격자가 주어진다. 일부 칸에는 **소방서** 가 있고 (\`F\` 로 표시), 일부는 빈 칸 (\`.\`). 각 칸에서 **가장 가까운 소방서까지의 거리** (4 방향 이동, 칸 1 칸 = 거리 1) 를 출력하라. 소방서 자신은 0, 도달 불가능 칸은 \`-1\` (입력은 항상 최소 1 개의 F 를 보장).

핵심 — Multi-source BFS: 모든 소방서를 동시에 큐에 넣고 시작하면 한 번의 BFS 로 끝. (Dijkstra 도 같은 트릭, 가중치 1 이라 BFS 가 빠름.)

출력: N 줄, 각 줄에 M 개의 거리 공백 구분.

출처: 원본 (multi-source BFS)`,
      constraints: "1 ≤ N, M ≤ 500, 최소 1 개의 'F' 보장",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3 3\nF..\n...\n..F",
          expectedOutput: "0 1 2\n1 2 1\n2 1 0",
          label: "두 모서리에 소방서",
        },
        {
          stdin: "1 5\n..F..",
          expectedOutput: "2 1 0 1 2",
          label: "한 줄 — 중앙에서 양쪽으로 BFS",
        },
        {
          stdin: "3 3\nFFF\nFFF\nFFF",
          expectedOutput: "0 0 0\n0 0 0\n0 0 0",
          label: "모두 소방서",
        },
        {
          stdin: "2 3\n.F.\n...",
          expectedOutput: "1 0 1\n2 1 2",
          label: "중앙 위쪽 소방서",
        },
        {
          stdin: "4 4\nF...\n....\n....\n...F",
          expectedOutput: "0 1 2 3\n1 2 3 2\n2 3 2 1\n3 2 1 0",
          label: "대각선 모서리",
        },
      ],
      hints: [
        "BFS 큐에 *모든* 소방서 좌표를 처음부터 넣고 시작 → multi-source BFS.",
        "dist[r][c] = 0 (소방서면), 그 외엔 INF/-1. visited 대신 dist 가 0 이상인지로 체크.",
        "한 번의 BFS 만으로 모든 칸 처리됨 — O(N × M).",
        "Dijkstra 도 가능하지만 가중치 1 이라 BFS 가 더 빠름 (log 없음).",
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
    for (int i = 0; i < N; i++)
        for (int j = 0; j < M; j++)
            if (grid[i][j] == 'F') {
                dist[i][j] = 0;
                q.push({i, j});
            }

    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int k = 0; k < 4; k++) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
            if (dist[nr][nc] != -1) continue;
            dist[nr][nc] = dist[r][c] + 1;
            q.push({nr, nc});
        }
    }

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            if (j > 0) cout << ' ';
            cout << dist[i][j];
        }
        cout << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "Multi-source BFS — 가상의 'super source' 가 모든 소방서와 거리 0 으로 연결됐다고 보면 BFS 한 번에 풀린다. 큐에 *시작 시점에* 모든 소방서를 넣는 게 핵심. 가중치 1 이라 BFS 가 Dijkstra 보다 빠르다.",
      pyInitialCode: `from collections import deque
import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `from collections import deque
import sys
input = sys.stdin.readline

n, m = map(int, input().split())
grid = [input().rstrip() for _ in range(n)]

dist = [[-1] * m for _ in range(n)]
q = deque()
for i in range(n):
    for j in range(m):
        if grid[i][j] == "F":
            dist[i][j] = 0
            q.append((i, j))

dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]
while q:
    r, c = q.popleft()
    for k in range(4):
        nr, nc = r + dr[k], c + dc[k]
        if 0 <= nr < n and 0 <= nc < m and dist[nr][nc] == -1:
            dist[nr][nc] = dist[r][c] + 1
            q.append((nr, nc))

out = []
for i in range(n):
    out.append(" ".join(str(dist[i][j]) for j in range(m)))
print("\\n".join(out))
`,
      en: {
        title: "Multi-source Shortest Distance (BFS)",
        description: `N × M grid; some cells are fire stations (\`F\`), others empty (\`.\`). For every cell, print the **4-directional distance to the nearest fire station**. Stations are 0; unreachable cells are \`-1\` (input guarantees ≥ 1 F).

Multi-source BFS: push *all* stations into the queue at start — one sweep does it.

Output: N lines, M space-separated distances.

Source: original (multi-source BFS)`,
        constraints: "1 ≤ N, M ≤ 500; at least one 'F'",
        hints: [
          "Push every fire station into the BFS queue at the start.",
          "dist = 0 at stations, otherwise -1 (sentinel).",
          "Single BFS → O(N × M).",
          "Dijkstra works too but BFS is faster for unit weights.",
        ],
        solutionExplanation:
          "Imagine a super-source connected to every station with weight 0 — one BFS sweeps the grid.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 최단 경로 + 경로 출력 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-006",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "보통",
      title: "최단 경로 복원 (Dijkstra + parent)",
      description: `방향 가중치 그래프와 시작 정점 \`s\`, 도착 정점 \`t\` 가 주어진다. **최단 거리** 와 그 **경로 (정점 나열)** 를 출력하라.

입력:
- 첫 줄: \`N M\`
- 둘째 줄: \`s t\`
- 다음 \`M\` 줄: \`u v w\` — 방향 간선

출력:
- 첫 줄: 최단 거리
- 둘째 줄: 경로 (정점 개수)
- 셋째 줄: 경로 정점 (s 부터 t 까지 공백 구분)

도달 불가능하면 한 줄에 \`-1\` 출력.

핵심: Dijkstra 진행 중 \`prev[v]\` = '직전 정점' 을 기록. 끝나면 t 부터 prev 따라 거꾸로 가서 reverse.

출처: BOJ 11779 paraphrased`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 100,000, 1 ≤ w ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 8\n1 5\n1 2 2\n1 3 3\n1 4 1\n1 5 10\n2 4 2\n3 4 1\n3 5 1\n4 5 3",
          expectedOutput: "4\n3\n1 3 5",
          label: "1→3→5 비용 4",
        },
        {
          stdin: "3 2\n1 3\n1 2 5\n2 3 5",
          expectedOutput: "10\n3\n1 2 3",
          label: "직선 경로",
        },
        {
          stdin: "4 2\n1 4\n1 2 1\n3 4 1",
          expectedOutput: "-1",
          label: "도달 불가",
        },
        {
          stdin: "2 1\n1 2\n1 2 7",
          expectedOutput: "7\n2\n1 2",
          label: "직접 간선",
        },
        {
          stdin: "1 0\n1 1",
          expectedOutput: "0\n1\n1",
          label: "s == t",
        },
      ],
      hints: [
        "표준 Dijkstra 와 거의 같음 — 단, dist 갱신할 때마다 prev[v] = u 도 같이 갱신.",
        "끝나면 v = t 에서 시작해 prev 따라 거꾸로 가며 vector 에 push, 마지막에 reverse.",
        "도달 불가능 (dist[t] == INF) 케이스를 잊지 말기.",
        "s == t 인 경우 — 거리 0, 경로 길이 1, 경로 = [s] 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M, s, t;
    cin >> N >> M >> s >> t;
    vector<vector<pair<int,int>>> g(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
    }

    const long long INF = LLONG_MAX;
    vector<long long> dist(N + 1, INF);
    vector<int> prev(N + 1, -1);
    dist[s] = 0;
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    pq.push({0, s});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d != dist[u]) continue;
        for (auto [v, w] : g[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                prev[v] = u;
                pq.push({dist[v], v});
            }
        }
    }

    if (dist[t] == INF) {
        cout << -1 << "\\n";
        return 0;
    }
    vector<int> path;
    for (int cur = t; cur != -1; cur = prev[cur]) path.push_back(cur);
    reverse(path.begin(), path.end());
    cout << dist[t] << "\\n" << path.size() << "\\n";
    for (size_t i = 0; i < path.size(); i++) {
        if (i > 0) cout << ' ';
        cout << path[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Dijkstra 의 '한 줄 추가' 변형 — dist 를 갱신할 때마다 누가 갱신했는지 prev 에 기록. 끝나면 t 에서 prev 사슬을 거꾸로 따라가 reverse 하면 경로 완성. s 가 prev 가 -1 이라 자동으로 멈춤.",
      pyInitialCode: `import heapq
import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import heapq
import sys
input = sys.stdin.readline

n, m = map(int, input().split())
s, t = map(int, input().split())
g = [[] for _ in range(n + 1)]
for _ in range(m):
    u, v, w = map(int, input().split())
    g[u].append((v, w))

INF = float("inf")
dist = [INF] * (n + 1)
prev = [-1] * (n + 1)
dist[s] = 0
pq = [(0, s)]

while pq:
    d, u = heapq.heappop(pq)
    if d != dist[u]:
        continue
    for v, w in g[u]:
        nd = d + w
        if nd < dist[v]:
            dist[v] = nd
            prev[v] = u
            heapq.heappush(pq, (nd, v))

if dist[t] == INF:
    print(-1)
else:
    path = []
    cur = t
    while cur != -1:
        path.append(cur)
        cur = prev[cur]
    path.reverse()
    print(dist[t])
    print(len(path))
    print(" ".join(map(str, path)))
`,
      en: {
        title: "Shortest Path Reconstruction (Dijkstra + parent)",
        description: `Directed weighted graph; start \`s\`, target \`t\`. Output the **shortest distance** and the **path (vertex list)**.

Input:
- Line 1: \`N M\`
- Line 2: \`s t\`
- Next \`M\` lines: \`u v w\`.

Output:
- Line 1: distance
- Line 2: number of vertices on path
- Line 3: path vertices (space-separated, s to t)

If unreachable, output \`-1\` only.

Key: during Dijkstra, record \`prev[v]\` = predecessor. After, follow prev from t back and reverse.

Source: BOJ 11779 paraphrased`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 100,000, 1 ≤ w ≤ 100,000",
        hints: [
          "Standard Dijkstra + update prev[v] = u whenever dist[v] is relaxed.",
          "Walk from t back via prev into a vector, reverse.",
          "Handle dist[t] == INF (unreachable).",
          "s == t → distance 0, single-vertex path.",
        ],
        solutionExplanation:
          "Add one line: prev[v] = u alongside each dist update. After Dijkstra, trace prev backward from t and reverse.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. Bellman-Ford 음수 사이클 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-007",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "어려움",
      title: "Bellman-Ford — 음수 사이클 검출",
      description: `방향 가중치 그래프가 주어진다. 가중치 \`w\` 는 **음수 가능**. 시작 정점 1 에서 모든 정점까지의 최단 거리를 구하라. 단, **음수 사이클** 이 1 에서 도달 가능한 경우에는 한 줄에 \`-1\` 만 출력한다.

입력:
- 첫 줄: \`N M\`
- 다음 \`M\` 줄: \`u v w\`

출력:
- 음수 사이클이 있으면 \`-1\`
- 없으면 2 ~ N 번까지 한 줄에 하나씩 거리. 도달 불가능 정점은 \`-1\`.

Bellman-Ford: 모든 간선을 V-1 번 relax → V 번째 라운드에서도 갱신되는 게 있으면 음수 사이클 존재. 단, 그 사이클이 시작점에서 *도달 가능* 한지도 검사해야 함.

출처: BOJ 11657 paraphrased`,
      constraints: "1 ≤ N ≤ 500, 1 ≤ M ≤ 6000, -10,000 ≤ w ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3 4\n1 2 4\n1 3 3\n2 3 -1\n3 1 -2",
          expectedOutput: "4\n3",
          label: "음수 간선 있지만 음수 사이클 없음 (1→3→1 = 1, 1→2→3→1 = 1)",
        },
        {
          stdin: "3 4\n1 2 4\n1 3 3\n2 3 -4\n3 1 -2",
          expectedOutput: "-1",
          label: "음수 사이클 — 1→2→3→1 = 4-4-2 = -2",
        },
        {
          stdin: "3 2\n1 2 4\n1 2 3",
          expectedOutput: "3\n-1",
          label: "1→3 도달 불가",
        },
        {
          stdin: "4 4\n1 2 1\n2 3 2\n3 4 3\n4 2 -10",
          expectedOutput: "-1",
          label: "1→2→3→4→2... 음수 사이클",
        },
        {
          stdin: "3 3\n1 2 5\n2 3 -2\n1 3 4",
          expectedOutput: "5\n3",
          label: "음수 간선 OK, 사이클 없음",
        },
        {
          stdin: "1 0",
          expectedOutput: "",
          label: "정점 1 개 — 출력 없음 (2..N 비어 있음)",
        },
      ],
      hints: [
        "dist[1] = 0, 나머지 = INF. 모든 간선을 (N-1) 번 relax.",
        "N 번째 라운드에 또 갱신되는 게 있으면 음수 사이클 의심.",
        "단, 그 사이클이 시작점에서 도달 가능한지 (dist[u] != INF) 확인해야 함 — 아니면 영향 없음.",
        "도달 불가능 (dist[i] == INF) 표시는 -1.",
        "오버플로우 주의 — long long, INF 더하기 전에 dist[u] == INF 검사.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    vector<tuple<int,int,int>> edges(M);
    for (auto& [u, v, w] : edges) cin >> u >> v >> w;

    const long long INF = LLONG_MAX;
    vector<long long> dist(N + 1, INF);
    dist[1] = 0;

    for (int i = 0; i < N - 1; i++) {
        for (auto& [u, v, w] : edges) {
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    // N 번째 라운드 — 음수 사이클 검출
    for (auto& [u, v, w] : edges) {
        if (dist[u] != INF && dist[u] + w < dist[v]) {
            cout << -1 << "\\n";
            return 0;
        }
    }

    for (int i = 2; i <= N; i++) {
        if (dist[i] == INF) cout << -1 << "\\n";
        else cout << dist[i] << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "Bellman-Ford: 모든 간선을 V-1 번 통과하면 모든 최단 거리가 확정 (음수 사이클이 없는 한). V 번째 통과에서 또 갱신되는 간선이 있으면 음수 사이클 — 단, dist[u] != INF 인지 검사해서 *도달 가능한 것만* 카운트한다. 시간 O(V × E).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
edges = []
for _ in range(m):
    u, v, w = map(int, input().split())
    edges.append((u, v, w))

INF = float("inf")
dist = [INF] * (n + 1)
dist[1] = 0

for _ in range(n - 1):
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            dist[v] = dist[u] + w

# N 번째 라운드 — 음수 사이클 검출
neg_cycle = False
for u, v, w in edges:
    if dist[u] != INF and dist[u] + w < dist[v]:
        neg_cycle = True
        break

if neg_cycle:
    print(-1)
else:
    out = []
    for i in range(2, n + 1):
        out.append("-1" if dist[i] == INF else str(dist[i]))
    if out:
        print("\\n".join(out))
`,
      en: {
        title: "Bellman-Ford — Negative Cycle Detection",
        description: `Directed weighted graph; weights may be **negative**. Find shortest distances from vertex 1 to all others. If a **negative cycle reachable from 1** exists, output \`-1\`.

Input:
- Line 1: \`N M\`
- Next \`M\` lines: \`u v w\`

Output:
- \`-1\` if reachable negative cycle
- Otherwise distances to 2..N (one per line, \`-1\` if unreachable)

Algorithm: relax every edge V-1 times; a Vth round relaxation means a negative cycle. Also check the cycle is reachable (dist[u] ≠ INF).

Source: BOJ 11657 paraphrased`,
        constraints: "1 ≤ N ≤ 500, 1 ≤ M ≤ 6000, -10,000 ≤ w ≤ 10,000",
        hints: [
          "Init dist[1]=0, others INF. Loop edges V-1 times.",
          "Vth round: if any edge relaxes, a negative cycle exists.",
          "Verify reachability (dist[u] ≠ INF) before counting it.",
          "Use long long; guard INF before adding.",
        ],
        solutionExplanation:
          "Bellman-Ford: V-1 rounds settle distances if no neg-cycle; a Vth-round relax = neg cycle (but only counts if the source vertex is reachable). O(V × E).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. Floyd-Warshall — 어려움 (BOJ 11404)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-008",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "어려움",
      title: "모든 쌍 최단 경로 (Floyd-Warshall)",
      description: `\`N\` 개의 도시와 \`M\` 개의 버스 노선이 있다. 각 버스 노선은 출발 도시 \`u\`, 도착 도시 \`v\`, 비용 \`w\` 로 주어진다 (방향 있음, 같은 (u, v) 에 여러 노선 가능 — 그중 최소를 택해야 함).

모든 도시 쌍 \`(i, j)\` 에 대해 \`i\` 에서 \`j\` 로 가는 **최소 비용** 을 출력하라 (\`i == j\` 면 0, 도달 불가능이면 0). 출력은 N 줄, 각 줄에 N 개의 값을 공백으로.

알고리즘: Floyd-Warshall — 3 중 루프 O(V³).

\`\`\`
for k in 1..N:
    for i in 1..N:
        for j in 1..N:
            d[i][j] = min(d[i][j], d[i][k] + d[k][j])
\`\`\`

출처: BOJ 11404 paraphrased`,
      constraints: "1 ≤ N ≤ 100, 1 ≤ M ≤ 100,000, 1 ≤ w ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 14\n1 2 2\n1 3 3\n1 4 1\n1 5 10\n2 4 2\n3 4 1\n3 5 1\n4 5 3\n3 5 10\n3 1 8\n1 4 2\n5 1 7\n3 4 2\n5 2 4",
          expectedOutput: "0 2 3 1 4\n12 0 15 2 5\n8 5 0 1 1\n10 7 13 0 3\n7 4 10 6 0",
          label: "BOJ 11404 예제",
        },
        {
          stdin: "2 2\n1 2 5\n2 1 3",
          expectedOutput: "0 5\n3 0",
          label: "양방향",
        },
        {
          stdin: "3 1\n1 2 5",
          expectedOutput: "0 5 0\n0 0 0\n0 0 0",
          label: "도달 불가는 0",
        },
        {
          stdin: "3 4\n1 2 1\n2 1 1\n1 2 5\n1 2 2",
          expectedOutput: "0 1 0\n1 0 0\n0 0 0",
          label: "중복 간선 — 최솟값 택",
        },
        {
          stdin: "1 0",
          expectedOutput: "0",
          label: "정점 1 개",
        },
      ],
      hints: [
        "초기화: dist[i][j] = INF (i != j), dist[i][i] = 0. 간선 (u, v, w) → dist[u][v] = min(dist[u][v], w).",
        "3 중 루프 순서는 반드시 **k → i → j** (경유지 k 가 가장 바깥).",
        "INF + INF 를 INF 로 클램프 — 오버플로우 방지 (또는 1e18 정도로 시작).",
        "출력 시 INF 는 0 으로 (도달 불가 표시).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    const long long INF = 1e18;
    vector<vector<long long>> d(N + 1, vector<long long>(N + 1, INF));
    for (int i = 1; i <= N; i++) d[i][i] = 0;
    for (int i = 0; i < M; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        d[u][v] = min(d[u][v], (long long)w);
    }

    for (int k = 1; k <= N; k++)
        for (int i = 1; i <= N; i++)
            for (int j = 1; j <= N; j++)
                if (d[i][k] + d[k][j] < d[i][j])
                    d[i][j] = d[i][k] + d[k][j];

    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            if (j > 1) cout << ' ';
            cout << (d[i][j] >= INF ? 0 : d[i][j]);
        }
        cout << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "Floyd-Warshall: 'k 이하의 정점을 경유지로 허용' 이라는 DP. k 가 가장 바깥 루프 — 한 번의 k 라운드가 끝나면 'k 까지 경유 허용한 모든 쌍의 최단' 이 d 에 들어 있음. V = 100 이라 O(V³) = 10⁶ 안전.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
INF = float("inf")
d = [[INF] * (n + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    d[i][i] = 0
for _ in range(m):
    u, v, w = map(int, input().split())
    if w < d[u][v]:
        d[u][v] = w

for k in range(1, n + 1):
    dk = d[k]
    for i in range(1, n + 1):
        di = d[i]
        dik = di[k]
        if dik == INF:
            continue
        for j in range(1, n + 1):
            nd = dik + dk[j]
            if nd < di[j]:
                di[j] = nd

out = []
for i in range(1, n + 1):
    row = []
    for j in range(1, n + 1):
        row.append("0" if d[i][j] == INF else str(d[i][j]))
    out.append(" ".join(row))
print("\\n".join(out))
`,
      en: {
        title: "All-Pairs Shortest Paths (Floyd-Warshall)",
        description: `\`N\` cities, \`M\` bus routes; each route is \`u v w\` (directed, multiple (u,v) routes possible — take min). Output the minimum cost from \`i\` to \`j\` for every pair. Self-pair = 0, unreachable = 0. Output N × N grid.

Floyd-Warshall — triple loop O(V³):
\`\`\`
for k in 1..N:
    for i in 1..N:
        for j in 1..N:
            d[i][j] = min(d[i][j], d[i][k] + d[k][j])
\`\`\`

Source: BOJ 11404 paraphrased`,
        constraints: "1 ≤ N ≤ 100, 1 ≤ M ≤ 100,000, 1 ≤ w ≤ 100,000",
        hints: [
          "Init d[i][j] = INF (i ≠ j); d[i][i] = 0; relax with input edges (take min for duplicates).",
          "Loop order MUST be **k → i → j**.",
          "Guard against INF overflow (use 1e18 sentinel).",
          "Print INF as 0 (unreachable).",
        ],
        solutionExplanation:
          "Floyd-Warshall DP — 'allow intermediates ≤ k'. After kth outer round, d holds optimal paths using vertices ≤ k as relays. V³ = 10⁶ for V=100.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 경유지 통과 (Dijkstra 2 회) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-009",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "어려움",
      title: "경유지 통과 최단 경로",
      description: `방향 (또는 무방향) 가중치 그래프와 시작 1, 끝 N, **반드시 거쳐야 하는 두 정점** \`v1\`, \`v2\` 가 주어진다. \`1 → v1 → v2 → N\` 또는 \`1 → v2 → v1 → N\` 중 더 짧은 경로의 비용을 출력하라. 도달 불가능하면 \`-1\`.

입력:
- 첫 줄: \`N E\`
- 다음 \`E\` 줄: \`a b c\` — 무방향 간선
- 마지막 줄: \`v1 v2\`

핵심: Dijkstra 를 1, v1, v2 에서 각각 한 번씩 (3 회) 돌리면, \`d(1,v1)\`, \`d(v1,v2)\`, \`d(v2,N)\` 같은 모든 필요한 거리가 나옴. 두 순서 합 중 작은 것을 택하면 끝.

출처: BOJ 1504 paraphrased`,
      constraints: "1 ≤ N ≤ 800, 0 ≤ E ≤ 200,000, 1 ≤ c ≤ 1000, 1 ≤ v1, v2 ≤ N (v1 ≠ v2)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 6\n1 2 3\n2 3 3\n3 4 1\n1 3 5\n2 4 5\n1 4 4\n2 3",
          expectedOutput: "7",
          label: "BOJ 예제 — 1→2→3→4 = 3+3+1 = 7",
        },
        {
          stdin: "3 2\n1 2 5\n2 3 5\n2 3",
          expectedOutput: "10",
          label: "1→2→3, v1=v2 부분 = 0",
        },
        {
          stdin: "4 2\n1 2 1\n3 4 1\n2 3",
          expectedOutput: "-1",
          label: "2와 3 사이 끊김",
        },
        {
          stdin: "5 6\n1 2 1\n2 3 1\n3 4 1\n4 5 1\n1 5 100\n2 4 100\n3 4",
          expectedOutput: "4",
          label: "1→2→3→4→5",
        },
        {
          stdin: "4 4\n1 2 1\n2 3 1\n3 4 1\n1 4 10\n3 2",
          expectedOutput: "3",
          label: "1→2→3→4 가 v1=3, v2=2 둘 다 통과 → 3",
        },
      ],
      hints: [
        "Dijkstra 를 *시작점 별* 로 3 번: from 1, from v1, from v2. d_from_X[] 세 배열.",
        "두 가지 순서: 1→v1→v2→N (= d_1[v1] + d_v1[v2] + d_v2[N]) 또는 1→v2→v1→N.",
        "각 부분이 INF 면 그 순서는 사용 불가 → 둘 다 INF 면 -1.",
        "오버플로우 주의 — long long, INF 더하기 전에 INF 검사.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1e18;

vector<long long> dijkstra(int n, int src, vector<vector<pair<int,int>>>& g) {
    vector<long long> dist(n + 1, INF);
    dist[src] = 0;
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d != dist[u]) continue;
        for (auto [v, w] : g[u]) {
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, E;
    cin >> N >> E;
    vector<vector<pair<int,int>>> g(N + 1);
    for (int i = 0; i < E; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        g[a].push_back({b, c});
        g[b].push_back({a, c});
    }
    int v1, v2;
    cin >> v1 >> v2;

    auto d1 = dijkstra(N, 1, g);
    auto dv1 = dijkstra(N, v1, g);
    auto dv2 = dijkstra(N, v2, g);

    long long pathA = INF, pathB = INF;
    if (d1[v1] < INF && dv1[v2] < INF && dv2[N] < INF)
        pathA = d1[v1] + dv1[v2] + dv2[N];
    if (d1[v2] < INF && dv2[v1] < INF && dv1[N] < INF)
        pathB = d1[v2] + dv2[v1] + dv1[N];

    long long ans = min(pathA, pathB);
    cout << (ans >= INF ? -1 : ans) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "필수 경유지 두 곳이면 가능한 방문 순서는 (1, v1, v2, N) 과 (1, v2, v1, N) 두 가지뿐. 시작점이 1/v1/v2 인 Dijkstra 결과 셋만 있으면 두 경우 다 계산됨. 두 합 중 작은 것이 답 (어느 부분이라도 INF 면 그 경로 사용 불가).",
      pyInitialCode: `import heapq
import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import heapq
import sys
input = sys.stdin.readline

INF = float("inf")

def dijkstra(n, src, g):
    dist = [INF] * (n + 1)
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d != dist[u]:
            continue
        for v, w in g[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist

n, e = map(int, input().split())
g = [[] for _ in range(n + 1)]
for _ in range(e):
    a, b, c = map(int, input().split())
    g[a].append((b, c))
    g[b].append((a, c))
v1, v2 = map(int, input().split())

d1 = dijkstra(n, 1, g)
dv1 = dijkstra(n, v1, g)
dv2 = dijkstra(n, v2, g)

pathA = pathB = INF
if d1[v1] < INF and dv1[v2] < INF and dv2[n] < INF:
    pathA = d1[v1] + dv1[v2] + dv2[n]
if d1[v2] < INF and dv2[v1] < INF and dv1[n] < INF:
    pathB = d1[v2] + dv2[v1] + dv1[n]

ans = min(pathA, pathB)
print(-1 if ans == INF else ans)
`,
      en: {
        title: "Shortest Path Through Two Required Stops",
        description: `Undirected weighted graph; start 1, end N, two **mandatory waypoints** \`v1\`, \`v2\`. Output the cheaper of \`1→v1→v2→N\` vs \`1→v2→v1→N\`, or \`-1\` if neither is possible.

Input:
- Line 1: \`N E\`
- Next \`E\` lines: \`a b c\` (undirected)
- Last line: \`v1 v2\`

Run Dijkstra from each of {1, v1, v2}; combine using d(1,v1)+d(v1,v2)+d(v2,N) and the mirror.

Source: BOJ 1504 paraphrased`,
        constraints: "1 ≤ N ≤ 800, 0 ≤ E ≤ 200,000, 1 ≤ c ≤ 1000, v1 ≠ v2",
        hints: [
          "Three Dijkstra runs (from 1, v1, v2).",
          "Two orderings to compare: 1→v1→v2→N and 1→v2→v1→N.",
          "If any segment is INF, that ordering is invalid → -1 if both invalid.",
          "Long long + INF guards.",
        ],
        solutionExplanation:
          "Only two visit orders are possible — three Dijkstra runs give all needed pairwise distances.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. K 회 이내 도착 (LC 787) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-010",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "어려움",
      title: "K 번 이내 환승 최저가 (Bellman-Ford 변형)",
      description: `\`N\` 개의 도시와 항공편 정보가 주어진다. 각 항공편은 \`u v w\` — \`u\` 에서 \`v\` 로 가는 비용 \`w\`. 시작 도시 \`src\`, 도착 도시 \`dst\`, 최대 환승 횟수 \`K\` 가 주어졌을 때, **K 회 이하의 환승** 으로 \`src → dst\` 도달 가능한 **최소 비용** 을 출력하라. 불가능하면 \`-1\`.

(여기서 '환승 횟수' = '중간 경유 도시 수'. 즉 \`src → A → dst\` 는 1 회 환승, \`src → dst\` 는 0 회.)

핵심: 'K + 1 개의 간선' 까지 사용 가능 → Bellman-Ford 를 정확히 K + 1 라운드 돌린다. 단, 한 라운드 안에서 같은 라운드 갱신이 다음으로 전파되면 안 되므로 \`dist\` 를 매 라운드 복사해 \`prev\` 에서만 읽어야 함.

출처: LeetCode 787 (Cheapest Flights Within K Stops) paraphrased`,
      constraints: "1 ≤ N ≤ 100, 0 ≤ flights ≤ 10,000, 0 ≤ K ≤ N, 1 ≤ w ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3 3\n0 1 100\n1 2 100\n0 2 500\n0 2 1",
          expectedOutput: "200",
          label: "K=1 — 0→1→2 = 200 가능 (환승 1회)",
        },
        {
          stdin: "3 3\n0 1 100\n1 2 100\n0 2 500\n0 2 0",
          expectedOutput: "500",
          label: "K=0 — 직항만 → 0→2 = 500",
        },
        {
          stdin: "4 4\n0 1 100\n1 2 100\n2 3 100\n0 3 1000\n0 3 2",
          expectedOutput: "300",
          label: "K=2 — 환승 2 회 OK",
        },
        {
          stdin: "4 4\n0 1 100\n1 2 100\n2 3 100\n0 3 1000\n0 3 1",
          expectedOutput: "1000",
          label: "K=1 — 환승 1 회만 가능 → 직항 1000",
        },
        {
          stdin: "2 1\n0 1 50\n0 1 0",
          expectedOutput: "50",
          label: "직항 K=0",
        },
        {
          stdin: "3 1\n0 1 100\n0 2 5",
          expectedOutput: "-1",
          label: "도달 불가",
        },
      ],
      hints: [
        "K 환승 = K+1 개 간선 사용. Bellman-Ford 를 K+1 번 돌리되, 한 라운드 안에서 갱신을 *섞으면 안 됨*.",
        "매 라운드: prev = dist 복사 → 모든 간선을 prev 에서 읽어 dist 갱신.",
        "dist 와 prev 두 배열 필요. 그래야 'i 라운드 = 정확히 i 개 이하 간선' 이 보장됨.",
        "도달 불가 → INF → 출력 -1.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, F;
    cin >> N >> F;
    vector<tuple<int,int,int>> flights(F);
    for (auto& [u, v, w] : flights) cin >> u >> v >> w;
    int src, dst, K;
    cin >> src >> dst >> K;

    const long long INF = 1e18;
    vector<long long> dist(N, INF);
    dist[src] = 0;

    for (int i = 0; i <= K; i++) {
        vector<long long> prev = dist;
        for (auto& [u, v, w] : flights) {
            if (prev[u] != INF && prev[u] + w < dist[v]) {
                dist[v] = prev[u] + w;
            }
        }
    }

    cout << (dist[dst] >= INF ? -1 : dist[dst]) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Bellman-Ford 변형: 매 라운드 시작 시 dist 를 prev 로 복사해두고, 갱신은 *항상 prev 에서 읽는다*. 그러면 i 번째 라운드 후 dist[v] = '최대 i 개 간선으로 도달 가능한 최단 비용'. K + 1 라운드 → K 환승 (= K + 1 간선) 까지 허용.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, f = map(int, input().split())
flights = []
for _ in range(f):
    u, v, w = map(int, input().split())
    flights.append((u, v, w))
src, dst, k = map(int, input().split())

INF = float("inf")
dist = [INF] * n
dist[src] = 0

for _ in range(k + 1):
    prev = dist[:]
    for u, v, w in flights:
        if prev[u] != INF and prev[u] + w < dist[v]:
            dist[v] = prev[u] + w

print(-1 if dist[dst] == INF else dist[dst])
`,
      en: {
        title: "Cheapest Flights Within K Stops (Bellman-Ford Variant)",
        description: `\`N\` cities and flights \`u v w\`. Given \`src\`, \`dst\`, and \`K\` max stops, find the cheapest \`src → dst\` cost using ≤ K + 1 edges; \`-1\` if impossible.

(0 stops = direct flight; 1 stop = src → A → dst.)

Bellman-Ford with exactly K + 1 rounds, **copying dist to prev each round** so within a single round you don't read freshly-relaxed values (otherwise a round could chain multiple edges).

Source: LeetCode 787 paraphrased`,
        constraints: "1 ≤ N ≤ 100, 0 ≤ flights ≤ 10,000, 0 ≤ K ≤ N",
        hints: [
          "K stops = up to K+1 edges. Run K+1 BF rounds.",
          "Each round: snapshot prev = dist; relax edges reading only from prev.",
          "Round i guarantees 'paths using ≤ i edges'.",
          "INF → -1.",
        ],
        solutionExplanation:
          "Snapshot dist at the start of each round so relaxations don't chain within a single round. K + 1 rounds = at most K + 1 edges = K stops.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 우주신과의 교감 (MST + 가장 큰 가중치) — 어려움 (BOJ 1774)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-011",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "어려움",
      title: "우주신과의 교감 (MST + 최대 가중치)",
      description: `2D 평면 위에 \`N\` 개의 우주신이 있다. 일부 쌍은 이미 \`통로\` 로 연결되어 있다 (비용 0). 나머지 쌍은 **유클리드 거리** 만큼 비용을 들여 연결할 수 있다. 모든 우주신이 (직접 or 간접) 연결되도록 **추가로 만들어야 하는 통로들의 길이 합** 의 **최솟값** 을 출력하라.

답은 소수점 둘째 자리까지 반올림 — \`%.2f\` 형식으로 출력 (말 그대로 \`1.41\`, \`8.00\` 같은 형태).

핵심: 기존 연결을 union-find 로 묶고, 나머지 가능한 모든 간선을 Kruskal 로 추가. 또는 모든 정점 쌍을 그래프로 만들고 기존 통로의 가중치만 0 으로 둔 후 Prim.

(이 문제는 *MST 위주* 지만 챕터 5 옆길 — '간선 가중치 그래프' 일반화 의 자연스러운 후속이라 포함.)

출처: BOJ 1774 paraphrased`,
      constraints: "1 ≤ N ≤ 1000, 0 ≤ M (기존 통로 수) ≤ N×(N-1)/2, 좌표 ≤ 10^6",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3 1\n1 1\n3 1\n5 1\n1 2",
          expectedOutput: "2.00",
          label: "1-2 통로 있음 → 2-3 추가 (거리 2)",
        },
        {
          stdin: "2 0\n0 0\n3 4",
          expectedOutput: "5.00",
          label: "2 점만 — 직선 거리",
        },
        {
          stdin: "4 0\n0 0\n0 3\n4 0\n4 3",
          expectedOutput: "10.00",
          label: "직사각형 4 점 — MST = 3+3+4 = 10",
        },
        {
          stdin: "4 1\n0 0\n0 3\n4 0\n4 3\n1 2",
          expectedOutput: "7.00",
          label: "직사각형 + 1-2 통로 — MST = 3 (3-4) + 4 (1-3 or 2-4) = 7",
        },
        {
          stdin: "1 0\n5 5",
          expectedOutput: "0.00",
          label: "정점 1 개 — 추가 필요 없음",
        },
      ],
      hints: [
        "기존 통로를 먼저 union-find 로 합치기 (비용 0).",
        "모든 정점 쌍 (i, j) 의 유클리드 거리 계산해 Kruskal 후보 간선으로.",
        "거리 = sqrt(dx² + dy²). dx, dy 가 10^6 까지 → dx² 가 10^12 → long long 곱셈 필요.",
        "Kruskal: 간선 정렬 후 사이클 만들지 않는 것만 골라 합치고 총합 누적.",
        "출력: printf(\"%.2f\\\\n\", total).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> p, r;
    DSU(int n) : p(n + 1), r(n + 1, 0) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
        return true;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    vector<pair<long long,long long>> pt(N + 1);
    for (int i = 1; i <= N; i++) cin >> pt[i].first >> pt[i].second;

    DSU dsu(N);
    for (int i = 0; i < M; i++) {
        int a, b;
        cin >> a >> b;
        dsu.unite(a, b);
    }

    vector<tuple<double,int,int>> edges;
    edges.reserve((long long)N * (N - 1) / 2);
    for (int i = 1; i <= N; i++) {
        for (int j = i + 1; j <= N; j++) {
            long long dx = pt[i].first - pt[j].first;
            long long dy = pt[i].second - pt[j].second;
            double d = sqrt((double)(dx * dx + dy * dy));
            edges.push_back({d, i, j});
        }
    }
    sort(edges.begin(), edges.end());

    double total = 0;
    for (auto& [d, u, v] : edges) {
        if (dsu.unite(u, v)) total += d;
    }
    printf("%.2f\\n", total);
    return 0;
}`,
      solutionExplanation:
        "Kruskal MST — 기존 통로를 무료 간선처럼 union-find 로 미리 묶어두면, 나머지는 일반 MST 와 똑같다. 거리 계산에서 dx, dy 곱이 10^12 까지 가니 반드시 long long 후 double 변환. 출력 형식 \"%.2f\" 정확히 지킬 것.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from math import sqrt
input = sys.stdin.readline

def find(p, x):
    while p[x] != x:
        p[x] = p[p[x]]
        x = p[x]
    return x

def unite(p, r, a, b):
    a = find(p, a)
    b = find(p, b)
    if a == b:
        return False
    if r[a] < r[b]:
        a, b = b, a
    p[b] = a
    if r[a] == r[b]:
        r[a] += 1
    return True

n, m = map(int, input().split())
pts = [(0, 0)]
for _ in range(n):
    x, y = map(int, input().split())
    pts.append((x, y))

p = list(range(n + 1))
r = [0] * (n + 1)
for _ in range(m):
    a, b = map(int, input().split())
    unite(p, r, a, b)

edges = []
for i in range(1, n + 1):
    for j in range(i + 1, n + 1):
        dx = pts[i][0] - pts[j][0]
        dy = pts[i][1] - pts[j][1]
        d = sqrt(dx * dx + dy * dy)
        edges.append((d, i, j))
edges.sort()

total = 0.0
for d, u, v in edges:
    if unite(p, r, u, v):
        total += d

print(f"{total:.2f}")
`,
      en: {
        title: "Cosmic Communication (MST + Max Edge)",
        description: `\`N\` cosmic beings on a 2D plane. Some pairs already have a *channel* (cost 0). Others can be linked at a cost equal to **Euclidean distance**. Output the **minimum extra total length** needed so all beings are (directly or indirectly) connected. Print with 2 decimals (e.g. \`1.41\`, \`8.00\`).

Kruskal MST: pre-union the existing channels, then add candidate edges = all other pairs.

(This problem leans MST — included as the natural side-quest to weighted-graph thinking.)

Source: BOJ 1774 paraphrased`,
        constraints: "1 ≤ N ≤ 1000, 0 ≤ M ≤ N(N-1)/2, coordinates ≤ 10^6",
        hints: [
          "Union-find existing channels first (cost 0).",
          "All pairs (i,j) → Euclidean distance edges, Kruskal them.",
          "Use long long for dx², dy² (up to 10¹²), then convert to double.",
          "Print using \"%.2f\" / f\"{x:.2f}\".",
        ],
        solutionExplanation:
          "Kruskal where existing channels are pre-united. Long long for squared diffs to avoid overflow, then sqrt.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 알고리즘 수업 - 최소 비용 (BOJ 1916) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asp-012",
      cluster: "algo-shortestpath-contest",
      unlockAfter: "algo-shortestpath",
      difficulty: "어려움",
      title: "최소 비용 (단일 쌍 Dijkstra)",
      description: `N 개의 도시와 M 개의 버스가 있다. 각 버스의 정보는 \`u v w\` (\`u\` 에서 \`v\` 로 비용 \`w\`). 출발 도시 \`s\` 와 도착 도시 \`t\` 가 주어진다. **s 에서 t 로 가는 최소 비용** 을 출력하라.

입력:
- 첫 줄: \`N\`
- 둘째 줄: \`M\`
- 다음 \`M\` 줄: \`u v w\`
- 마지막 줄: \`s t\`

가중치가 모두 양수이므로 Dijkstra. 도착 보장됨 (입력은 항상 도달 가능).

출처: BOJ 1916 paraphrased`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 100,000, 0 ≤ w ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n8\n1 2 2\n1 3 3\n1 4 1\n1 5 10\n2 4 2\n3 4 1\n3 5 1\n4 5 3\n1 5",
          expectedOutput: "4",
          label: "BOJ 예제 — 1→3→5 = 4",
        },
        {
          stdin: "2\n1\n1 2 100\n1 2",
          expectedOutput: "100",
          label: "직접 간선",
        },
        {
          stdin: "1\n0\n1 1",
          expectedOutput: "0",
          label: "s == t",
        },
        {
          stdin: "4\n5\n1 2 1\n2 3 1\n3 4 1\n1 4 10\n2 4 5\n1 4",
          expectedOutput: "3",
          label: "1→2→3→4 = 3",
        },
        {
          stdin: "3\n3\n1 2 1000\n2 3 1000\n1 3 100000\n1 3",
          expectedOutput: "2000",
          label: "큰 가중치 — long long 안전 영역",
        },
      ],
      hints: [
        "표준 Dijkstra — priority queue + dist[].",
        "단일 쌍이므로 t 가 큐에서 꺼내진 순간 종료해도 됨 (가지치기).",
        "C++: priority_queue<pair<long long,int>, vector<...>, greater<>>.",
        "가중치 w ≤ 10^5, 정점 ≤ 1000 — 답이 10^8 까지 가능 → int 도 안전하지만 long long 추천.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    vector<vector<pair<int,int>>> g(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
    }
    int s, t;
    cin >> s >> t;

    const long long INF = LLONG_MAX;
    vector<long long> dist(N + 1, INF);
    dist[s] = 0;
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    pq.push({0, s});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (u == t) break;             // 단일 쌍 — 조기 종료 OK
        if (d != dist[u]) continue;
        for (auto [v, w] : g[u]) {
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }

    cout << dist[t] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "단일 쌍 Dijkstra — t 가 큐에서 꺼내진 순간 dist[t] 가 최단 거리 (Dijkstra 의 불변식). 그 시점에 break 하면 약간 빠르다. 가중치 모두 양수라 Dijkstra 만으로 충분.",
      pyInitialCode: `import heapq
import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import heapq
import sys
input = sys.stdin.readline

n = int(input())
m = int(input())
g = [[] for _ in range(n + 1)]
for _ in range(m):
    u, v, w = map(int, input().split())
    g[u].append((v, w))
s, t = map(int, input().split())

INF = float("inf")
dist = [INF] * (n + 1)
dist[s] = 0
pq = [(0, s)]

while pq:
    d, u = heapq.heappop(pq)
    if u == t:
        break
    if d != dist[u]:
        continue
    for v, w in g[u]:
        nd = d + w
        if nd < dist[v]:
            dist[v] = nd
            heapq.heappush(pq, (nd, v))

print(dist[t])
`,
      en: {
        title: "Minimum Cost (Single-Pair Dijkstra)",
        description: `\`N\` cities, \`M\` directed buses \`u v w\`. Given start \`s\` and target \`t\`, print the **minimum cost** from s to t. All weights non-negative; reachability guaranteed.

Input:
- Line 1: \`N\`
- Line 2: \`M\`
- Next \`M\` lines: \`u v w\`
- Last line: \`s t\`

Source: BOJ 1916 paraphrased`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ M ≤ 100,000, 0 ≤ w ≤ 100,000",
        hints: [
          "Standard Dijkstra; early exit when t is popped.",
          "Long long for safety though int fits.",
          "Skip stale heap entries (d ≠ dist[u]).",
        ],
        solutionExplanation:
          "Single-pair Dijkstra — pop t = answer (Dijkstra invariant). Early break for a small speedup.",
      },
    },
  ],
}
