import type { PracticeCluster } from "./types"

export const treeContestCluster: PracticeCluster = {
  id: "algo-tree-contest",
  title: "트리 문제 풀이",
  emoji: "🌳",
  description: "트리 표현 + 4 가지 순회 + 트리 DP — 자식 답으로 부모 답 만들기",
  unlockAfter: "algo-tree",
  en: {
    title: "Tree Practice",
    description: "Tree representation + 4 traversals + tree DP — build parent from children",
  },
  problems: [
    // ═══════════ 쉬움 입문 (on-ramp) ═══════════
    {
      id: "atree-e01",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "쉬움",
      title: "트리의 리프 노드 개수",
      description: `루트가 1번인 트리가 주어집니다. **리프(leaf)** 노드는 자식이 하나도 없는 노드예요.

루트 1번을 기준으로 자식이 없는 노드가 몇 개인지 세어 출력하세요.

**입력**: 첫 줄에 노드 수 N(루트는 1번), 다음 N-1줄에 간선 \`u v\`(무방향).
**출력**: 리프 노드의 개수. (N=1이면 1)`,
      constraints: "1 ≤ N ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    // TODO: 인접 리스트 + 루트 1 BFS로 자식 없는 노드 수 세기
    return 0;
}`,
      pyInitialCode: `import sys
from collections import deque
input = sys.stdin.readline

def main():
    n = int(input())
    # TODO: 인접 리스트 + 루트 1 BFS로 리프 수 세기

main()`,
      testCases: [
        { stdin: "3\n1 2\n1 3", expectedOutput: "2", label: "두 자식 모두 잎" },
        { stdin: "4\n1 2\n2 3\n2 4", expectedOutput: "2", label: "잎 3,4" },
        { stdin: "5\n1 2\n1 3\n3 4\n3 5", expectedOutput: "3", label: "잎 2,4,5" },
        { stdin: "1", expectedOutput: "1", label: "노드 1개" },
        { stdin: "2\n1 2", expectedOutput: "1", label: "잎 2" },
      ],
      hints: [
        "인접 리스트 adj[u]에 양방향 간선 저장.",
        "루트 1에서 BFS로 각 노드의 자식 수를 세면, 자식 0인 노드가 리프.",
        "N≥2이면 차수 1인 노드가 리프. N=1은 1로 따로 처리.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n == 1) { cout << 1 << '\\n'; return 0; }
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<bool> visited(n + 1, false);
    vector<int> childCnt(n + 1, 0);
    queue<int> q;
    q.push(1); visited[1] = true;
    while (!q.empty()) {
        int cur = q.front(); q.pop();
        for (int nx : adj[cur]) {
            if (!visited[nx]) { visited[nx] = true; childCnt[cur]++; q.push(nx); }
        }
    }
    int leaves = 0;
    for (int i = 1; i <= n; i++) if (childCnt[i] == 0) leaves++;
    cout << leaves << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
from collections import deque
input = sys.stdin.readline

def main():
    n = int(input())
    if n == 1:
        print(1)
        return
    adj = [[] for _ in range(n + 1)]
    for _ in range(n - 1):
        u, v = map(int, input().split())
        adj[u].append(v)
        adj[v].append(u)
    visited = [False] * (n + 1)
    child_cnt = [0] * (n + 1)
    q = deque([1]); visited[1] = True
    while q:
        cur = q.popleft()
        for nx in adj[cur]:
            if not visited[nx]:
                visited[nx] = True
                child_cnt[cur] += 1
                q.append(nx)
    print(sum(1 for i in range(1, n + 1) if child_cnt[i] == 0))

main()`,
      solutionExplanation: "루트 1에서 BFS로 각 노드를 처음 방문할 때 부모의 자식 수를 늘립니다. 자식 수 0인 노드가 리프. N=1은 1로 따로 처리.",
      en: {
        title: "Count Leaf Nodes",
        description: `A tree rooted at node 1. A leaf has no children. Count nodes with no children (N=1 → 1).`,
        constraints: "1 ≤ N ≤ 100,000",
        hints: ["Adjacency list both ways.", "BFS from 1 counting children; 0 children = leaf.", "For N≥2 a degree-1 node is a leaf; N=1 → 1."],
        solutionExplanation: "BFS from root 1; nodes with 0 children are leaves. N=1 handled as 1.",
      },
    },
    {
      id: "atree-e02",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "쉬움",
      title: "트리의 높이",
      description: `루트가 1번인 트리가 주어집니다. **높이**는 루트 1번에서 가장 멀리 떨어진 노드까지의 **간선 개수**예요.

루트에서 BFS로 각 노드의 깊이를 구한 뒤 최댓값을 출력하세요. (루트 깊이 0, N=1이면 0)`,
      constraints: "1 ≤ N ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    // TODO: 루트 1 BFS로 깊이 구하고 최댓값 출력 (루트 깊이 0)
    return 0;
}`,
      pyInitialCode: `import sys
from collections import deque
input = sys.stdin.readline

def main():
    n = int(input())
    # TODO: 루트 1 BFS로 최대 깊이 출력

main()`,
      testCases: [
        { stdin: "1", expectedOutput: "0", label: "노드 1개" },
        { stdin: "3\n1 2\n1 3", expectedOutput: "1", label: "높이 1" },
        { stdin: "4\n1 2\n2 3\n3 4", expectedOutput: "3", label: "일자 체인" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5", expectedOutput: "2", label: "높이 2" },
        { stdin: "2\n1 2", expectedOutput: "1", label: "간선 하나" },
      ],
      hints: [
        "depth[1]=0으로 시작, BFS 큐에 1을 넣기.",
        "자식 nx로 내려가면 depth[nx]=depth[cur]+1.",
        "모든 depth 중 최댓값이 높이.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n == 1) { cout << 0 << '\\n'; return 0; }
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<int> depth(n + 1, -1);
    queue<int> q;
    q.push(1); depth[1] = 0;
    int best = 0;
    while (!q.empty()) {
        int cur = q.front(); q.pop();
        for (int nx : adj[cur]) {
            if (depth[nx] == -1) {
                depth[nx] = depth[cur] + 1;
                best = max(best, depth[nx]);
                q.push(nx);
            }
        }
    }
    cout << best << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
from collections import deque
input = sys.stdin.readline

def main():
    n = int(input())
    if n == 1:
        print(0)
        return
    adj = [[] for _ in range(n + 1)]
    for _ in range(n - 1):
        u, v = map(int, input().split())
        adj[u].append(v)
        adj[v].append(u)
    depth = [-1] * (n + 1)
    depth[1] = 0
    best = 0
    q = deque([1])
    while q:
        cur = q.popleft()
        for nx in adj[cur]:
            if depth[nx] == -1:
                depth[nx] = depth[cur] + 1
                best = max(best, depth[nx])
                q.append(nx)
    print(best)

main()`,
      solutionExplanation: "루트 깊이를 0으로 두고 BFS. 한 칸 내려갈 때마다 깊이가 1 증가하고, 최대 깊이가 트리의 높이입니다.",
      en: {
        title: "Height of a Tree",
        description: `Tree rooted at 1. Height = edges from root to the farthest node. BFS for depths, print the max (root depth 0, N=1 → 0).`,
        constraints: "1 ≤ N ≤ 100,000",
        hints: ["depth[1]=0, push 1.", "Child depth = parent depth + 1.", "Max depth is the height."],
        solutionExplanation: "BFS depths from root; the maximum depth is the height.",
      },
    },
    {
      id: "atree-e03",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "쉬움",
      title: "각 노드의 부모 찾기",
      description: `루트가 1번인 트리가 주어집니다. **2번부터 N번까지** 각 노드의 부모 번호를 공백으로 구분해 한 줄에 출력하세요. (N=1이면 빈 줄)

부모는 루트 쪽으로 한 칸 올라갔을 때 만나는 노드예요.`,
      constraints: "1 ≤ N ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    // TODO: 루트 1 BFS로 부모를 정하고 2..N 부모 출력
    return 0;
}`,
      pyInitialCode: `import sys
from collections import deque
input = sys.stdin.readline

def main():
    n = int(input())
    # TODO: 루트 1 BFS로 부모 정하고 2..N 출력

main()`,
      testCases: [
        { stdin: "3\n1 2\n1 3", expectedOutput: "1 1", label: "2,3의 부모 1" },
        { stdin: "4\n1 2\n2 3\n2 4", expectedOutput: "1 2 2", label: "p2=1,p3=2,p4=2" },
        { stdin: "5\n1 2\n1 3\n3 4\n3 5", expectedOutput: "1 1 3 3", label: "기본" },
        { stdin: "2\n1 2", expectedOutput: "1", label: "2의 부모 1" },
        { stdin: "1", expectedOutput: "", label: "노드 1개" },
      ],
      hints: [
        "parent[1]=0으로 두고 BFS 큐에 1을 넣기.",
        "cur에서 안 간 nx로 갈 때 parent[nx]=cur.",
        "2..N parent 를 공백으로 출력. N=1이면 빈 줄.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n == 1) { cout << '\\n'; return 0; }
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<int> parent(n + 1, 0);
    vector<bool> visited(n + 1, false);
    queue<int> q;
    q.push(1); visited[1] = true;
    while (!q.empty()) {
        int cur = q.front(); q.pop();
        for (int nx : adj[cur]) {
            if (!visited[nx]) { visited[nx] = true; parent[nx] = cur; q.push(nx); }
        }
    }
    for (int i = 2; i <= n; i++) {
        cout << parent[i];
        if (i < n) cout << ' ';
    }
    cout << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
from collections import deque
input = sys.stdin.readline

def main():
    n = int(input())
    if n == 1:
        print()
        return
    adj = [[] for _ in range(n + 1)]
    for _ in range(n - 1):
        u, v = map(int, input().split())
        adj[u].append(v)
        adj[v].append(u)
    parent = [0] * (n + 1)
    visited = [False] * (n + 1)
    q = deque([1]); visited[1] = True
    while q:
        cur = q.popleft()
        for nx in adj[cur]:
            if not visited[nx]:
                visited[nx] = True
                parent[nx] = cur
                q.append(nx)
    print(" ".join(str(parent[i]) for i in range(2, n + 1)))

main()`,
      solutionExplanation: "루트 1에서 BFS. 노드를 처음 방문할 때 꺼낸 노드가 부모입니다. 2번부터 N번까지 부모를 공백으로 출력.",
      en: {
        title: "Find the Parent of Each Node",
        description: `Tree rooted at 1. Print parents of nodes 2..N, space-separated (N=1 → empty line).`,
        constraints: "1 ≤ N ≤ 100,000",
        hints: ["parent[1]=0, push 1.", "Going cur→nx records parent[nx]=cur.", "Print parents 2..N; N=1 → empty line."],
        solutionExplanation: "BFS from root 1; the node you came from is the parent. Print parents 2..N.",
      },
    },
    // ─────────────────────────────────────────────────────────────────
    // 1. 트리 노드 수 카운트 (DFS) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-001",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "보통",
      title: "트리 노드 수 카운트 (DFS)",
      description: `정수 N 과 N-1 개의 간선이 주어진다. 루트는 1 번 노드. **DFS 로 노드 수** 를 세어 출력하라.

(사실 답은 항상 N 이지만 — 여기서는 *DFS 순회* 가 트리의 모든 노드를 *정확히 한 번씩* 방문한다는 걸 직접 확인하는 게 목적이다.)

핵심: 양방향 인접 리스트 + parent 추적 (parent 방향으로는 안 감).

출처: 원본 (DFS 입문 — 노드를 한 번씩 방문하는 골격)`,
      constraints: "1 ≤ N ≤ 100,000, 간선 N-1 개, 루트 = 1",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n", expectedOutput: "1", label: "N=1 — 루트만" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n", expectedOutput: "5", label: "5 노드 트리" },
        { stdin: "3\n1 2\n2 3\n", expectedOutput: "3", label: "직선 트리" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n", expectedOutput: "7", label: "완전 이진 트리 (높이 3)" },
        { stdin: "4\n1 2\n1 3\n1 4\n", expectedOutput: "4", label: "별 모양 (스타 트리)" },
      ],
      hints: [
        "양방향 인접 리스트로 저장: 간선 u-v 마다 adj[u].push_back(v), adj[v].push_back(u).",
        "DFS 함수 dfs(u, parent) — parent 방향 자식은 건너뛰기.",
        "각 노드 방문 시 카운트 +1.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> adj;
int cnt = 0;

void dfs(int u, int parent) {
    cnt++;
    for (int v : adj[u]) {
        if (v == parent) continue;
        dfs(v, u);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    adj.assign(N + 1, {});
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    dfs(1, 0);
    cout << cnt << "\\n";
    return 0;
}`,
      solutionExplanation:
        "DFS 의 골격 — 인접 리스트 + parent 인자로 역방향 차단. 매 노드 방문 시 +1. 사이클이 없는 트리이므로 visited 배열 없이 parent 만으로 충분.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)

cnt = 0
def dfs(u, parent):
    global cnt
    cnt += 1
    for v in adj[u]:
        if v == parent:
            continue
        dfs(v, u)

dfs(1, 0)
print(cnt)
`,
      en: {
        title: "Count Tree Nodes (DFS)",
        description: `Given N and N-1 edges. Root = 1. **Count nodes via DFS** and print.

(Yes, the answer is always N — but here we're practicing the DFS skeleton that visits every node exactly once.)

Key: bidirectional adjacency list + track parent (don't go backward).

Source: original (DFS intro — visit-each-once skeleton)`,
        constraints: "1 ≤ N ≤ 100,000, N-1 edges, root = 1",
        hints: [
          "Bidirectional adjacency list: for each edge u-v, push both ways.",
          "dfs(u, parent) — skip the parent direction.",
          "Increment counter at each node.",
        ],
        solutionExplanation:
          "DFS skeleton — adjacency list + parent argument blocks the back-edge. +1 per node. No visited array needed (trees have no cycles).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. Preorder 순회 출력 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-002",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "보통",
      title: "Preorder 순회 (루트=1, 자식은 번호 오름차순)",
      description: `N 개 노드, 루트 1 번 트리가 주어진다. **preorder (전위)** 로 순회하며 방문한 노드를 공백 구분 한 줄로 출력하라.

규칙:
- preorder = **나 → 자식들 (번호 오름차순)**.
- 일반 트리 (자식 여러 명 가능). 각 노드에서 자식들을 번호 오름차순으로 방문.

출처: 원본 (DFS preorder 기본 패턴)`,
      constraints: "1 ≤ N ≤ 100,000, 간선 N-1 개, 루트 = 1",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n", expectedOutput: "1", label: "N=1" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n", expectedOutput: "1 2 4 5 3", label: "5 노드 — 나 → 자식들" },
        { stdin: "3\n1 2\n2 3\n", expectedOutput: "1 2 3", label: "직선" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n", expectedOutput: "1 2 4 5 3 6 7", label: "완전 이진" },
        { stdin: "4\n1 2\n1 3\n1 4\n", expectedOutput: "1 2 3 4", label: "스타" },
      ],
      hints: [
        "각 노드의 자식 리스트 (parent 제외) 를 sort 해서 오름차순.",
        "preorder: 현재 노드 출력 → 자식 재귀.",
        "출력 효율: 결과를 vector 에 모은 후 한 번에 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> adj;
vector<int> out;

void dfs(int u, int parent) {
    out.push_back(u);                       // ← 나 먼저
    vector<int> ch;
    for (int v : adj[u]) if (v != parent) ch.push_back(v);
    sort(ch.begin(), ch.end());             // 번호 오름차순
    for (int v : ch) dfs(v, u);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    adj.assign(N + 1, {});
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    dfs(1, 0);
    for (int i = 0; i < (int)out.size(); i++) {
        if (i) cout << ' ';
        cout << out[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Preorder = 나 → 자식들. 자식 리스트를 정렬하면 사전순 트리 순회. 출력은 누적 후 한 번에 — IO 효율.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)

out = []
def dfs(u, parent):
    out.append(u)
    ch = sorted(v for v in adj[u] if v != parent)
    for v in ch:
        dfs(v, u)

dfs(1, 0)
print(" ".join(map(str, out)))
`,
      en: {
        title: "Preorder Traversal (root=1, children by number)",
        description: `N-node tree, root=1. Print **preorder** traversal in one line, space-separated.

Rules:
- preorder = **me → children (by ascending number)**.
- General tree. At each node, visit children in ascending number order.

Source: original (DFS preorder template)`,
        constraints: "1 ≤ N ≤ 100,000, N-1 edges, root = 1",
        hints: [
          "Sort each node's children list (parent excluded) ascending.",
          "Preorder: print self → recurse into children.",
          "Output efficiency: collect into a vector, print once at the end.",
        ],
        solutionExplanation:
          "Preorder = me → children. Sorting children gives lex-order DFS. Buffer output and print once for IO speed.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. Inorder 순회 (이진 트리) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-003",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "보통",
      title: "Inorder 순회 (이진 트리, left[]/right[])",
      description: `N 개 노드의 **이진 트리** 가 주어진다. 각 줄에 \`u L R\` 형태로 노드 u 의 왼쪽 자식 L, 오른쪽 자식 R (없으면 0).

루트는 1 번. **inorder (중위) = 왼 → 나 → 오** 순서로 방문한 노드를 공백 구분 한 줄로 출력하라.

출처: BOJ 1991 paraphrased (트리 순회)`,
      constraints: "1 ≤ N ≤ 100,000, 자식 없으면 0",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n1 0 0\n", expectedOutput: "1", label: "N=1" },
        { stdin: "5\n1 2 3\n2 4 5\n3 0 0\n4 0 0\n5 0 0\n", expectedOutput: "4 2 5 1 3", label: "5 노드 이진" },
        { stdin: "3\n1 2 0\n2 3 0\n3 0 0\n", expectedOutput: "3 2 1", label: "왼쪽 직선" },
        { stdin: "3\n1 0 2\n2 0 3\n3 0 0\n", expectedOutput: "1 2 3", label: "오른쪽 직선" },
        { stdin: "7\n1 2 3\n2 4 5\n3 6 7\n4 0 0\n5 0 0\n6 0 0\n7 0 0\n", expectedOutput: "4 2 5 1 6 3 7", label: "완전 이진" },
      ],
      hints: [
        "left[N+1], right[N+1] 배열에 자식 저장.",
        "inorder(u): if u==0 return; inorder(left[u]); print u; inorder(right[u]);",
        "입력은 순서 없이 올 수 있으니 노드 번호로 인덱싱.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<int> L, R;
vector<int> out;

void inorder(int u) {
    if (u == 0) return;
    inorder(L[u]);
    out.push_back(u);
    inorder(R[u]);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    L.assign(N + 1, 0);
    R.assign(N + 1, 0);
    for (int i = 0; i < N; i++) {
        int u, l, r;
        cin >> u >> l >> r;
        L[u] = l;
        R[u] = r;
    }
    inorder(1);
    for (int i = 0; i < (int)out.size(); i++) {
        if (i) cout << ' ';
        cout << out[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Inorder = 왼 → 나 → 오. 이진 트리는 left[]/right[] 배열로 표현하는 게 가장 간결. 0 은 '없음' 표시 — base case.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
L = [0] * (n + 1)
R = [0] * (n + 1)
for _ in range(n):
    u, l, r = map(int, input().split())
    L[u] = l
    R[u] = r

out = []
def inorder(u):
    if u == 0:
        return
    inorder(L[u])
    out.append(u)
    inorder(R[u])

inorder(1)
print(" ".join(map(str, out)))
`,
      en: {
        title: "Inorder Traversal (Binary Tree, left[]/right[])",
        description: `N-node **binary tree**. Each line: \`u L R\` — node u's left child L and right child R (0 if none).

Root = 1. Print **inorder (left → me → right)** traversal in one line.

Source: BOJ 1991 paraphrased (tree traversals)`,
        constraints: "1 ≤ N ≤ 100,000, 0 = no child",
        hints: [
          "Store children in left[N+1], right[N+1] arrays.",
          "inorder(u): if u==0 return; inorder(left[u]); print u; inorder(right[u]).",
          "Input may be unordered — index by node id.",
        ],
        solutionExplanation:
          "Inorder = left → me → right. left[]/right[] arrays are cleanest for binary trees. 0 = 'none' = base case.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. Postorder 순회 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-004",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "보통",
      title: "Postorder 순회 (이진 트리)",
      description: `atree-003 과 같은 입력 형식. 이번에는 **postorder (후위) = 왼 → 오 → 나** 로 출력하라.

postorder 는 트리 DP 의 기본이다 — 자식 다 처리한 후 부모 처리.

출처: BOJ 1991 paraphrased`,
      constraints: "1 ≤ N ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n1 0 0\n", expectedOutput: "1", label: "N=1" },
        { stdin: "5\n1 2 3\n2 4 5\n3 0 0\n4 0 0\n5 0 0\n", expectedOutput: "4 5 2 3 1", label: "5 노드" },
        { stdin: "3\n1 2 0\n2 3 0\n3 0 0\n", expectedOutput: "3 2 1", label: "왼쪽 직선" },
        { stdin: "3\n1 0 2\n2 0 3\n3 0 0\n", expectedOutput: "3 2 1", label: "오른쪽 직선" },
        { stdin: "7\n1 2 3\n2 4 5\n3 6 7\n4 0 0\n5 0 0\n6 0 0\n7 0 0\n", expectedOutput: "4 5 2 6 7 3 1", label: "완전 이진" },
      ],
      hints: [
        "postorder(u): if u==0 return; postorder(left[u]); postorder(right[u]); print u;",
        "왼쪽 → 오른쪽 → 자기 자신. 마지막에 루트 출력.",
        "inorder 와 print 위치만 다름.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<int> L, R;
vector<int> out;

void postorder(int u) {
    if (u == 0) return;
    postorder(L[u]);
    postorder(R[u]);
    out.push_back(u);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    L.assign(N + 1, 0);
    R.assign(N + 1, 0);
    for (int i = 0; i < N; i++) {
        int u, l, r;
        cin >> u >> l >> r;
        L[u] = l;
        R[u] = r;
    }
    postorder(1);
    for (int i = 0; i < (int)out.size(); i++) {
        if (i) cout << ' ';
        cout << out[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Postorder = 왼 → 오 → 나. print 를 재귀 호출 다음으로 옮기는 게 차이의 전부. 트리 DP 의 기본 골격이다.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
L = [0] * (n + 1)
R = [0] * (n + 1)
for _ in range(n):
    u, l, r = map(int, input().split())
    L[u] = l
    R[u] = r

out = []
def postorder(u):
    if u == 0:
        return
    postorder(L[u])
    postorder(R[u])
    out.append(u)

postorder(1)
print(" ".join(map(str, out)))
`,
      en: {
        title: "Postorder Traversal (Binary Tree)",
        description: `Same input as atree-003. Print **postorder (left → right → me)**.

Postorder is the foundation of tree DP — process children, then parent.

Source: BOJ 1991 paraphrased`,
        constraints: "1 ≤ N ≤ 100,000",
        hints: [
          "postorder(u): if u==0 return; recurse left; recurse right; print u.",
          "Left → right → me. Root prints last.",
          "Only the print position differs from inorder.",
        ],
        solutionExplanation:
          "Postorder = left → right → me. Moving print after the recursive calls is the entire difference. Tree DP's basic skeleton.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. BFS Level Order — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-005",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "보통",
      title: "BFS Level Order 출력",
      description: `N 개 노드, 루트 1 인 일반 트리. 간선 N-1 개가 주어진다.

**BFS (level order)** 로 순회하며 방문한 노드를 공백 구분 한 줄로 출력. 같은 레벨에서는 **번호 오름차순**.

핵심: queue 사용. 한 노드 꺼내 → 자식들을 정렬해 queue 에 push.

출처: 원본 (BFS 입문)`,
      constraints: "1 ≤ N ≤ 100,000, 루트 = 1",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n", expectedOutput: "1", label: "N=1" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n", expectedOutput: "1 2 3 4 5", label: "5 노드 — 레벨별" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n", expectedOutput: "1 2 3 4 5 6 7", label: "완전 이진" },
        { stdin: "3\n1 2\n2 3\n", expectedOutput: "1 2 3", label: "직선" },
        { stdin: "4\n1 4\n1 2\n1 3\n", expectedOutput: "1 2 3 4", label: "스타 — 자식 정렬" },
      ],
      hints: [
        "queue<int> q; q.push(1); 시작.",
        "한 노드 꺼낸 후 자식 (parent 제외) 을 정렬해 push.",
        "parent 추적: parent[v] = u 로 저장하거나, dfs 처럼 인자 전달.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> adj;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    adj.assign(N + 1, {});
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(adj[i].begin(), adj[i].end());

    vector<int> parent(N + 1, 0);
    queue<int> q;
    q.push(1);
    parent[1] = -1;     // root marker
    vector<int> out;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        out.push_back(u);
        for (int v : adj[u]) {
            if (v == parent[u]) continue;
            parent[v] = u;
            q.push(v);
        }
    }
    for (int i = 0; i < (int)out.size(); i++) {
        if (i) cout << ' ';
        cout << out[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "BFS = 큐. 한 레벨이 모두 큐에 들어간 후 다음 레벨이 들어가니, 자연스럽게 level order. 각 노드의 인접 리스트를 미리 정렬하면 자식이 번호 오름차순.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)
for i in range(1, n + 1):
    adj[i].sort()

parent = [0] * (n + 1)
parent[1] = -1
q = deque([1])
out = []
while q:
    u = q.popleft()
    out.append(u)
    for v in adj[u]:
        if v == parent[u]:
            continue
        parent[v] = u
        q.append(v)

print(" ".join(map(str, out)))
`,
      en: {
        title: "BFS Level Order",
        description: `N-node tree, root = 1. N-1 edges given.

Print **BFS (level order)** in one line, space-separated. Within a level, **ascending node number**.

Key: use a queue. Pop one → push sorted children.

Source: original (BFS intro)`,
        constraints: "1 ≤ N ≤ 100,000, root = 1",
        hints: [
          "queue<int> q; q.push(1); to start.",
          "Pop a node, push its children (parent excluded) in sorted order.",
          "Track parent: parent[v] = u or pass as argument.",
        ],
        solutionExplanation:
          "BFS = queue. A whole level enters before the next, so order is level-by-level. Pre-sort adjacency lists for ascending children.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 트리 높이 (최대 깊이) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-006",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "보통",
      title: "트리 높이 (최대 깊이)",
      description: `N 개 노드, 루트 1. 트리의 **높이** 를 출력하라.

정의: 높이 = 루트에서 가장 먼 리프까지의 간선 수.
- 노드 하나뿐인 트리: 높이 = 0.
- 루트가 자식 하나 있는 트리: 높이 = 1.

핵심: \`height(u) = 1 + max(height(child))\` — 자식 없으면 0. 트리 DP 의 기본형.

출처: 원본 (트리 DP 워밍업)`,
      constraints: "1 ≤ N ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n", expectedOutput: "0", label: "노드 1개 — 높이 0" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n", expectedOutput: "2", label: "5 노드 — 1→2→4 (또는 5)" },
        { stdin: "3\n1 2\n2 3\n", expectedOutput: "2", label: "직선 3 노드" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n", expectedOutput: "2", label: "완전 이진 (높이 2)" },
        { stdin: "4\n1 2\n2 3\n3 4\n", expectedOutput: "3", label: "직선 4 노드" },
        { stdin: "4\n1 2\n1 3\n1 4\n", expectedOutput: "1", label: "스타 — 높이 1" },
      ],
      hints: [
        "height(u, parent) = 자식 없으면 0, 있으면 1 + max(height(child)).",
        "리프는 자식이 모두 parent 인 노드 — 그 경우 0 반환.",
        "결과 = height(1, 0).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> adj;

int height(int u, int parent) {
    int h = 0;
    bool hasChild = false;
    for (int v : adj[u]) {
        if (v == parent) continue;
        hasChild = true;
        h = max(h, 1 + height(v, u));
    }
    return hasChild ? h : 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    adj.assign(N + 1, {});
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    cout << height(1, 0) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "트리 DP 의 워밍업 — '자식 없으면 0, 있으면 1 + max(자식 높이)' 공식. postorder 자연스럽게 적용 (자식 답 먼저 모은 후 부모 결정).",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)

def height(u, parent):
    h = 0
    has_child = False
    for v in adj[u]:
        if v == parent:
            continue
        has_child = True
        h = max(h, 1 + height(v, u))
    return h if has_child else 0

print(height(1, 0))
`,
      en: {
        title: "Tree Height (Max Depth)",
        description: `N-node tree, root 1. Print the **height**.

Definition: height = number of edges from root to the farthest leaf.
- Single-node tree: height = 0.
- Root with one child: height = 1.

Key: \`height(u) = 1 + max(height(child))\`. Base = 0 if no children.

Source: original (tree DP warmup)`,
        constraints: "1 ≤ N ≤ 100,000",
        hints: [
          "height(u, parent): no children → 0; else 1 + max(height(child)).",
          "Leaves return 0.",
          "Answer = height(1, 0).",
        ],
        solutionExplanation:
          "Tree DP warmup — 'no kids = 0, else 1 + max(child height)'. Postorder fits naturally.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 트리 지름 (가장 긴 경로) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-007",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "어려움",
      title: "트리 지름 (가장 긴 경로)",
      description: `N 개 노드의 트리가 주어진다 (가중치 없음, 모든 간선 길이 1). **두 노드를 잡아 만들 수 있는 가장 긴 경로의 길이 (간선 수)** 를 출력하라. 이걸 *트리의 지름* 이라 부른다.

핵심 아이디어 — 한 번의 DFS 로:
- 각 노드 u 에서 자식들의 height 들을 모은다.
- 두 자식 가지를 통과하는 가장 긴 경로 = top1 + top2.
- 모든 노드에 대해 이 값의 최댓값이 지름.

공식: \`diameter = max over u of (가장 큰 두 height_child 합)\`.

리프 노드는 height_child = 0, 한 가지만 있어도 OK (top2 = 0).

출처: BOJ 1167 simplified (가중치 없는 트리 지름)`,
      constraints: "1 ≤ N ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n", expectedOutput: "0", label: "노드 1개 — 지름 0" },
        { stdin: "2\n1 2\n", expectedOutput: "1", label: "노드 2개 — 지름 1" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n", expectedOutput: "3", label: "4→2→1→3 (또는 5→2→1→3)" },
        { stdin: "3\n1 2\n2 3\n", expectedOutput: "2", label: "직선 3 노드 — 지름 2" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n", expectedOutput: "4", label: "완전 이진 — 4→2→1→3→6" },
        { stdin: "4\n1 2\n2 3\n3 4\n", expectedOutput: "3", label: "직선 4 노드" },
        { stdin: "4\n1 2\n1 3\n1 4\n", expectedOutput: "2", label: "스타 — 지름 2" },
      ],
      hints: [
        "dfs(u, parent) → u 를 루트로 한 서브트리에서 u 까지의 최대 깊이를 반환.",
        "재귀 중 각 노드에서 자식들의 깊이 두 큰 값 (top1, top2) 을 잡아 ans = max(ans, top1 + top2).",
        "한 자식뿐이면 top2 = 0, 두 자식 가지를 합쳐 경로를 만들 수 있다는 게 핵심.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> adj;
int ans = 0;

int dfs(int u, int parent) {
    int top1 = 0, top2 = 0;
    for (int v : adj[u]) {
        if (v == parent) continue;
        int d = dfs(v, u) + 1;     // u 까지 깊이
        if (d > top1) { top2 = top1; top1 = d; }
        else if (d > top2) { top2 = d; }
    }
    ans = max(ans, top1 + top2);
    return top1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    adj.assign(N + 1, {});
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    dfs(1, 0);
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "트리 지름의 한 번 DFS 풀이 — 각 노드에서 자식 깊이 두 큰 값의 합을 후보로. 노드 N=1 도 자식 0 이라 ans=0 유지. 시간 O(N).",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)

ans = 0
def dfs(u, parent):
    global ans
    top1 = 0
    top2 = 0
    for v in adj[u]:
        if v == parent:
            continue
        d = dfs(v, u) + 1
        if d > top1:
            top2 = top1
            top1 = d
        elif d > top2:
            top2 = d
    if top1 + top2 > ans:
        ans = top1 + top2
    return top1

dfs(1, 0)
print(ans)
`,
      en: {
        title: "Tree Diameter (Longest Path)",
        description: `Unweighted tree with N nodes (all edges length 1). Print the length (edge count) of the **longest path between any two nodes** — the *diameter*.

Single-DFS idea:
- At each node u, take children's depths.
- Path through u using its two best branches = top1 + top2.
- Diameter = max over all u.

Formula: \`diameter = max_u (top two child depths sum)\`.

Leaf nodes have no children, so top1 = top2 = 0 → contribution 0.

Source: BOJ 1167 simplified (unweighted diameter)`,
        constraints: "1 ≤ N ≤ 100,000",
        hints: [
          "dfs(u, parent) returns the max depth from u in u's subtree.",
          "At each node track top1, top2 of child depths; update ans = max(ans, top1+top2).",
          "If only one child exists, top2 = 0. The two-branch combine at u is the heart.",
        ],
        solutionExplanation:
          "Single-DFS tree diameter — at each node combine top two child depths for the candidate. Works for N=1 trivially. O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 부모 찾기 (BFS) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-008",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "어려움",
      title: "각 노드의 부모 찾기 (BFS)",
      description: `N 개 노드의 트리가 주어진다. 루트는 **1 번**. 각 노드 (2~N) 의 부모 번호를 한 줄에 하나씩 출력하라.

\`2 번 노드 부모\`
\`3 번 노드 부모\`
\`...\`
\`N 번 노드 부모\`

핵심: 트리는 양방향 인접 리스트로 들어오니, 루트 1 에서 BFS (또는 DFS) 하면서 처음 만난 방향이 부모.

출처: BOJ 11725 (트리의 부모 찾기) paraphrased`,
      constraints: "2 ≤ N ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n", expectedOutput: "1\n1\n2\n2", label: "5 노드 — 2→1, 3→1, 4→2, 5→2" },
        { stdin: "3\n1 2\n2 3\n", expectedOutput: "1\n2", label: "직선" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n", expectedOutput: "1\n1\n2\n2\n3\n3", label: "완전 이진" },
        { stdin: "4\n1 2\n1 3\n1 4\n", expectedOutput: "1\n1\n1", label: "스타" },
        { stdin: "2\n1 2\n", expectedOutput: "1", label: "노드 2개" },
      ],
      hints: [
        "BFS 큐로 루트 1 부터 시작. parent[1] = 0 (없음 표시).",
        "큐에서 u 꺼내 → adj[u] 의 v 중 parent[v] == 0 이고 v != 1 이면 parent[v] = u 후 push.",
        "또는 parent[] 를 -1 로 초기화하고 방문 여부 함께 표시.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    vector<vector<int>> adj(N + 1);
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<int> parent(N + 1, 0);
    queue<int> q;
    q.push(1);
    parent[1] = -1;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (parent[v] != 0) continue;
            parent[v] = u;
            q.push(v);
        }
    }
    for (int i = 2; i <= N; i++) cout << parent[i] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "트리 루트로부터의 BFS — 각 노드에 처음 도달했을 때의 직전 노드가 부모. parent[1] = -1 로 마킹해 루트와 미방문을 구별 (0 = 미방문).",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)

parent = [0] * (n + 1)
parent[1] = -1
q = deque([1])
while q:
    u = q.popleft()
    for v in adj[u]:
        if parent[v] != 0:
            continue
        parent[v] = u
        q.append(v)

print("\\n".join(str(parent[i]) for i in range(2, n + 1)))
`,
      en: {
        title: "Find Each Node's Parent (BFS)",
        description: `N-node tree, root = **1**. For each node 2..N, print its parent on its own line.

Key: input gives bidirectional edges → BFS (or DFS) from root 1; the first neighbor we arrived from is the parent.

Source: BOJ 11725 (Find Parent in Tree) paraphrased`,
        constraints: "2 ≤ N ≤ 100,000",
        hints: [
          "BFS from root 1. parent[1] = -1 (none marker).",
          "Pop u, scan neighbors v with parent[v] == 0 → parent[v] = u, push.",
          "Or use a visited[] array along with parent[].",
        ],
        solutionExplanation:
          "BFS from root — first discoverer becomes parent. parent[1] = -1 marks root vs unvisited (0).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. LCA 단순 버전 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-009",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "어려움",
      title: "LCA (최저 공통 조상) — 단순 버전",
      description: `N 개 노드 트리, 루트 1. 두 노드 \`a\`, \`b\` 가 주어진다. **두 노드의 가장 가까운 공통 조상 (LCA)** 의 번호를 출력하라.

단순 풀이 (O(N) per query — 한 쿼리만 처리하니 충분):
1. 각 노드의 깊이 (depth) 와 부모 (parent) 를 BFS/DFS 로 계산.
2. 두 노드의 깊이를 같게 맞춤 (깊은 쪽이 한 칸씩 올라감).
3. 둘이 같아질 때까지 동시에 한 칸씩 올림 → 만나는 노드가 LCA.

출처: 고전 LCA (단순 방식) — 작은 입력에서 BOJ 11437 paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ a, b ≤ N",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n4 5\n", expectedOutput: "2", label: "4 와 5 — LCA = 2" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n4 3\n", expectedOutput: "1", label: "4 와 3 — LCA = 1" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n3 3\n", expectedOutput: "3", label: "같은 노드 — LCA = 자기" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n6 7\n", expectedOutput: "3", label: "완전 이진 — 6, 7 의 LCA = 3" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n4 7\n", expectedOutput: "1", label: "4, 7 의 LCA = 1" },
        { stdin: "3\n1 2\n2 3\n1 3\n", expectedOutput: "1", label: "직선 1-2-3, LCA(1,3) = 1" },
      ],
      hints: [
        "1 단계: BFS 로 parent[], depth[] 계산 (parent[1] = 0, depth[1] = 0).",
        "2 단계: depth[a] > depth[b] 면 a 가 parent 로 올라가며 같아질 때까지 반복.",
        "3 단계: a != b 면 둘 다 parent 로 한 칸씩 올림 → 같아지면 LCA.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    vector<vector<int>> adj(N + 1);
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    int a, b;
    cin >> a >> b;

    vector<int> parent(N + 1, 0), depth(N + 1, 0);
    queue<int> q;
    q.push(1);
    parent[1] = -1;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (parent[v] != 0) continue;
            parent[v] = u;
            depth[v] = depth[u] + 1;
            q.push(v);
        }
    }
    parent[1] = 0;   // restore for LCA loop

    // 깊이 맞추기
    while (depth[a] > depth[b]) a = parent[a];
    while (depth[b] > depth[a]) b = parent[b];
    // 동시 상승
    while (a != b) {
        a = parent[a];
        b = parent[b];
    }
    cout << a << "\\n";
    return 0;
}`,
      solutionExplanation:
        "단순 LCA — 깊이 맞추고 동시에 위로 올라가며 만남. O(N) per query 라 단일 쿼리엔 충분. 더 빠른 sparse-table LCA (O(log N) per query) 는 Gold+ 토픽.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)
a, b = map(int, input().split())

parent = [0] * (n + 1)
depth = [0] * (n + 1)
parent[1] = -1
q = deque([1])
while q:
    u = q.popleft()
    for v in adj[u]:
        if parent[v] != 0:
            continue
        parent[v] = u
        depth[v] = depth[u] + 1
        q.append(v)
parent[1] = 0

while depth[a] > depth[b]:
    a = parent[a]
while depth[b] > depth[a]:
    b = parent[b]
while a != b:
    a = parent[a]
    b = parent[b]
print(a)
`,
      en: {
        title: "LCA (Lowest Common Ancestor) — Simple",
        description: `Tree with N nodes, root = 1. Given two nodes \`a\` and \`b\`, print their **LCA**.

Simple approach (O(N) per query — fine here):
1. BFS/DFS to compute parent[] and depth[].
2. Equalize depths (deeper one climbs up).
3. Climb together one step at a time until they meet.

Source: classical LCA (simple) — BOJ 11437 paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ a, b ≤ N",
        hints: [
          "Step 1: BFS to set parent[], depth[].",
          "Step 2: while depth[a] > depth[b], a = parent[a]; mirror for b.",
          "Step 3: while a != b, climb both.",
        ],
        solutionExplanation:
          "Naive LCA — equalize depths, then climb together. O(N) per query, fine for one query. Sparse-table LCA (O(log N)/query) is a later topic.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 두 노드 사이 거리 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-010",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "어려움",
      title: "두 노드 사이 거리 (간선 수)",
      description: `N 개 노드 트리, 루트 1. 두 노드 \`a\`, \`b\` 가 주어지면 **둘 사이 경로의 간선 수** 를 출력하라.

공식 (LCA 이용): \`dist(a, b) = depth[a] + depth[b] - 2 * depth[LCA(a, b)]\`.

직관: a 에서 LCA 까지, b 에서 LCA 까지 두 구간을 합치는데, LCA 의 깊이만큼은 두 번 더해졌으니 빼준다.

출처: 원본 (LCA 응용 — 트리 거리)`,
      constraints: "1 ≤ N ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n4 5\n", expectedOutput: "2", label: "4-2-5 → 거리 2" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n4 3\n", expectedOutput: "3", label: "4-2-1-3" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n3 3\n", expectedOutput: "0", label: "같은 노드 — 거리 0" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n6 7\n", expectedOutput: "2", label: "6-3-7" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n4 7\n", expectedOutput: "4", label: "4-2-1-3-7" },
        { stdin: "3\n1 2\n2 3\n1 3\n", expectedOutput: "2", label: "1-2-3" },
      ],
      hints: [
        "atree-009 의 LCA 구현 + depth[] 를 그대로 활용.",
        "dist(a, b) = depth[a] + depth[b] - 2 * depth[lca].",
        "노드 1 의 depth = 0 으로 잡으면 자연스러움.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    vector<vector<int>> adj(N + 1);
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    int a, b;
    cin >> a >> b;

    vector<int> parent(N + 1, 0), depth(N + 1, 0);
    queue<int> q;
    q.push(1);
    parent[1] = -1;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (parent[v] != 0) continue;
            parent[v] = u;
            depth[v] = depth[u] + 1;
            q.push(v);
        }
    }
    parent[1] = 0;

    int origA = a, origB = b;
    while (depth[a] > depth[b]) a = parent[a];
    while (depth[b] > depth[a]) b = parent[b];
    while (a != b) {
        a = parent[a];
        b = parent[b];
    }
    int lca = a;
    cout << (depth[origA] + depth[origB] - 2 * depth[lca]) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "LCA 응용 — 두 노드 거리 = 깊이의 합 - 2 × LCA 깊이. LCA 까지 올라간 경로 두 개를 합치되 공통 부분 (루트~LCA) 은 중복이라 빼준다.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
from collections import deque
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)
a, b = map(int, input().split())

parent = [0] * (n + 1)
depth = [0] * (n + 1)
parent[1] = -1
q = deque([1])
while q:
    u = q.popleft()
    for v in adj[u]:
        if parent[v] != 0:
            continue
        parent[v] = u
        depth[v] = depth[u] + 1
        q.append(v)
parent[1] = 0

orig_a, orig_b = a, b
while depth[a] > depth[b]:
    a = parent[a]
while depth[b] > depth[a]:
    b = parent[b]
while a != b:
    a = parent[a]
    b = parent[b]
lca = a
print(depth[orig_a] + depth[orig_b] - 2 * depth[lca])
`,
      en: {
        title: "Distance Between Two Nodes (Edge Count)",
        description: `Tree with N nodes, root 1. Given \`a\`, \`b\`, print the **number of edges on the a→b path**.

Formula (via LCA): \`dist(a, b) = depth[a] + depth[b] - 2 * depth[LCA(a, b)]\`.

Intuition: combine the a→LCA and b→LCA segments; the LCA's depth was counted twice so we subtract.

Source: original (LCA application — tree distance)`,
        constraints: "1 ≤ N ≤ 100,000",
        hints: [
          "Reuse atree-009 LCA + depth[].",
          "dist = depth[a] + depth[b] - 2 * depth[lca].",
          "Set depth[1] = 0 (root).",
        ],
        solutionExplanation:
          "LCA application — depth sum minus 2× LCA depth removes the double-counted root→LCA segment.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 리프 노드 카운트 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-011",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "어려움",
      title: "리프 노드 카운트",
      description: `N 개 노드 트리, 루트 1. **리프 노드의 수** 를 출력하라.

리프 (leaf) = 자식이 0 명인 노드. 일반 트리에서는 'parent 가 아닌 인접 노드' 가 0 개인 노드.

**주의**: 노드 1 개짜리 트리 (N=1) 에서는 루트 1 이 동시에 리프 → 1.
하지만 노드 2 개 (간선 1 개) 의 트리에서 루트 1 은 자식이 있으니 리프 아님 (입력 트리에서 적어도 한 명의 자식이 있는 노드는 리프 아님).

출처: 원본 (리프 정의 + 엣지 케이스)`,
      constraints: "1 ≤ N ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n", expectedOutput: "1", label: "N=1 — 루트 = 리프" },
        { stdin: "2\n1 2\n", expectedOutput: "1", label: "노드 2 — 리프 1개 (노드 2)" },
        { stdin: "5\n1 2\n1 3\n2 4\n2 5\n", expectedOutput: "3", label: "리프 = {3, 4, 5}" },
        { stdin: "3\n1 2\n2 3\n", expectedOutput: "1", label: "직선 — 리프 = {3}" },
        { stdin: "7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n", expectedOutput: "4", label: "완전 이진 — 리프 = {4, 5, 6, 7}" },
        { stdin: "4\n1 2\n1 3\n1 4\n", expectedOutput: "3", label: "스타 — 리프 = {2, 3, 4}" },
      ],
      hints: [
        "N=1 은 특수 처리: 답은 1.",
        "N ≥ 2: 노드 u 의 'parent 가 아닌 이웃' 수가 0 이면 리프.",
        "루트 1 의 경우: 자식 (adj[1] 전체) 이 0 명이어야 리프. N ≥ 2 면 자식이 최소 1 명이라 리프 아님.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    if (N == 1) {
        cout << 1 << "\\n";
        return 0;
    }
    vector<vector<int>> adj(N + 1);
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    int leaves = 0;
    // 루트 1: 자식 수 = adj[1].size(). 0 이면 리프지만 N ≥ 2 면 불가.
    // 다른 노드: parent 1 명 제외, 나머지가 자식. degree == 1 → 리프.
    for (int u = 2; u <= N; u++) {
        if ((int)adj[u].size() == 1) leaves++;
    }
    if ((int)adj[1].size() == 0) leaves++;  // 안전 (N=1 외엔 발생 X)
    cout << leaves << "\\n";
    return 0;
}`,
      solutionExplanation:
        "리프 = degree 1 (트리에서, 루트 외). N=1 케이스만 따로 처리. 루트는 N ≥ 2 면 항상 degree ≥ 1 이라 리프 아님 (자식이 부모 역할).",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
if n == 1:
    print(1)
else:
    adj = [[] for _ in range(n + 1)]
    for _ in range(n - 1):
        u, v = map(int, input().split())
        adj[u].append(v)
        adj[v].append(u)
    leaves = 0
    for u in range(2, n + 1):
        if len(adj[u]) == 1:
            leaves += 1
    if len(adj[1]) == 0:
        leaves += 1
    print(leaves)
`,
      en: {
        title: "Count Leaf Nodes",
        description: `Tree with N nodes, root 1. Print the **number of leaves**.

A leaf has 0 children. In a rooted tree, leaves are nodes whose only neighbor is their parent.

**Edge case**: with N=1 the lone root counts as a leaf → answer 1. With N ≥ 2 the root has at least one child so it's not a leaf.

Source: original (leaf definition + edge cases)`,
        constraints: "1 ≤ N ≤ 100,000",
        hints: [
          "Handle N=1 specially: answer = 1.",
          "N ≥ 2: non-root node u is a leaf iff degree(u) == 1.",
          "Root (node 1) is a leaf only when N=1.",
        ],
        solutionExplanation:
          "Leaf = degree 1 (non-root). Special-case N=1. For N ≥ 2 the root always has degree ≥ 1 so it's never a leaf.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 트리 DP — 서브트리 합 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atree-012",
      cluster: "algo-tree-contest",
      unlockAfter: "algo-tree",
      difficulty: "어려움",
      title: "트리 DP — 각 노드의 서브트리 합",
      description: `N 개 노드 트리, 루트 1. 각 노드에 값 \`val[i]\` 가 부여돼 있다.

각 노드 \`u\` 에 대해 **u 를 루트로 한 서브트리의 모든 노드 값 합** \`sub[u]\` 를 계산하고, \`sub[1], sub[2], ..., sub[N]\` 을 한 줄에 공백 구분으로 출력하라.

입력:
\`\`\`
N
val[1] val[2] ... val[N]
(N-1 줄: 간선)
\`\`\`

공식: \`sub[u] = val[u] + sum(sub[v] for v in children of u)\`. **Postorder DFS**.

출처: 원본 (트리 DP 의 입문 — postorder + 자식 답 합치기)`,
      constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ val[i] ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n7\n", expectedOutput: "7", label: "N=1 — sub[1] = 7" },
        { stdin: "5\n1 2 3 4 5\n1 2\n1 3\n2 4\n2 5\n", expectedOutput: "15 11 3 4 5", label: "5 노드 — sub[1]=15, sub[2]=2+4+5=11, sub[3]=3, sub[4]=4, sub[5]=5" },
        { stdin: "3\n10 20 30\n1 2\n2 3\n", expectedOutput: "60 50 30", label: "직선 — sub[1]=60, sub[2]=50, sub[3]=30" },
        { stdin: "4\n1 1 1 1\n1 2\n1 3\n1 4\n", expectedOutput: "4 1 1 1", label: "스타 — sub[1]=4" },
        { stdin: "5\n-1 -2 -3 -4 -5\n1 2\n1 3\n2 4\n2 5\n", expectedOutput: "-15 -11 -3 -4 -5", label: "음수 값" },
        { stdin: "7\n1 1 1 1 1 1 1\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n", expectedOutput: "7 3 3 1 1 1 1", label: "완전 이진 — 모든 값 1" },
      ],
      hints: [
        "DFS(u, parent) — 자식 먼저 재귀, 끝나면 sub[u] = val[u] + Σ sub[v].",
        "값은 음수 가능하니 sub[] 는 long long 안전 (N=10^5 * |val|=10^4 = 10^9 — int 도 OK 지만 long long 권장).",
        "출력 순서는 노드 1, 2, ..., N — sub[i] 를 인덱스 순서로.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<long long> val, sub;
vector<vector<int>> adj;

void dfs(int u, int parent) {
    sub[u] = val[u];
    for (int v : adj[u]) {
        if (v == parent) continue;
        dfs(v, u);
        sub[u] += sub[v];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    val.assign(N + 1, 0);
    sub.assign(N + 1, 0);
    adj.assign(N + 1, {});
    for (int i = 1; i <= N; i++) cin >> val[i];
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    dfs(1, 0);
    for (int i = 1; i <= N; i++) {
        if (i > 1) cout << ' ';
        cout << sub[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "트리 DP 의 정석 — postorder DFS 로 sub[u] = val[u] + Σ sub[child]. 자식 답을 먼저 만든 후 합치는 패턴은 거의 모든 트리 DP 의 골격이다.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
val = [0] + list(map(int, input().split()))
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)

sub = [0] * (n + 1)
def dfs(u, parent):
    sub[u] = val[u]
    for v in adj[u]:
        if v == parent:
            continue
        dfs(v, u)
        sub[u] += sub[v]

dfs(1, 0)
print(" ".join(str(sub[i]) for i in range(1, n + 1)))
`,
      en: {
        title: "Tree DP — Subtree Sum Per Node",
        description: `Tree with N nodes, root 1. Each node has value \`val[i]\`.

For every node \`u\`, compute \`sub[u]\` = sum of values in u's subtree, and print \`sub[1] sub[2] ... sub[N]\` space-separated.

Input:
\`\`\`
N
val[1] ... val[N]
(N-1 edges)
\`\`\`

Formula: \`sub[u] = val[u] + Σ sub[child]\`. **Postorder DFS**.

Source: original (tree DP intro — postorder + combine children)`,
        constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ val[i] ≤ 10,000",
        hints: [
          "DFS(u, parent) — recurse into children first, then sub[u] = val[u] + Σ sub[child].",
          "Values can be negative; long long is safe.",
          "Output sub[1], sub[2], ..., sub[N] in index order.",
        ],
        solutionExplanation:
          "Tree DP template — postorder DFS: sub[u] = val[u] + Σ sub[child]. The recurse-then-combine pattern underlies nearly all tree DP.",
      },
    },
  ],
}
