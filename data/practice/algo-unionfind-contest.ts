import type { PracticeCluster } from "./types"

export const unionFindContestCluster: PracticeCluster = {
  id: "algo-unionfind-contest",
  title: "유니온 파인드 문제 풀이",
  emoji: "🔵",
  description: "동적 연결성, 크루스칼 MST, 그룹 카운트",
  unlockAfter: "algo-unionfind",
  en: {
    title: "Union Find Practice",
    description: "Connectivity, Kruskal MST, group count",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. 같은 그룹? — 보통 (BOJ 1717 paraphrased)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-001",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "보통",
      title: "같은 그룹? (union / find 기본)",
      description: `0 부터 N-1 까지 N 개의 원소가 있다. 처음에는 각자 따로 떨어져 있다. M 개의 쿼리가 주어진다.

- \`0 a b\` : a 와 b 를 같은 그룹으로 합친다 (union).
- \`1 a b\` : a 와 b 가 같은 그룹이면 \`YES\`, 아니면 \`NO\` 출력.

입력 첫 줄: N M. 다음 M 줄: 쿼리.

핵심 — \`parent[]\` 배열로 각 원소의 부모를 가리킨다. \`find(x)\` 는 루트까지 따라가고 (경로 압축), \`union(a, b)\` 는 두 루트를 합친다.

출처: BOJ 1717 (집합의 표현) paraphrased`,
      constraints: "1 ≤ N ≤ 1,000,000, 1 ≤ M ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 6\n0 0 1\n0 2 3\n1 0 1\n1 0 2\n0 1 2\n1 0 3",
          expectedOutput: "YES\nNO\nYES",
          label: "기본 — 합쳤다가 확인",
        },
        {
          stdin: "3 3\n1 0 1\n0 0 1\n1 0 1",
          expectedOutput: "NO\nYES",
          label: "합치기 전 / 후 비교",
        },
        {
          stdin: "5 5\n0 0 1\n0 1 2\n0 2 3\n1 0 3\n1 0 4",
          expectedOutput: "YES\nNO",
          label: "체인 연결 — 0-1-2-3 한 그룹, 4 따로",
        },
        {
          stdin: "1 2\n0 0 0\n1 0 0",
          expectedOutput: "YES",
          label: "자기 자신은 항상 같은 그룹",
        },
        {
          stdin: "6 7\n0 0 1\n0 2 3\n0 4 5\n1 0 2\n0 1 3\n1 0 3\n1 0 5",
          expectedOutput: "NO\nYES\nNO",
          label: "3 그룹 → 2 그룹",
        },
        {
          stdin: "4 4\n1 0 1\n1 1 2\n1 2 3\n1 0 3",
          expectedOutput: "NO\nNO\nNO\nNO",
          label: "합치는 쿼리 없음 — 모두 따로",
        },
      ],
      hints: [
        "\`parent[i] = i\` 로 초기화 (각자 자기 자신이 루트).",
        "find(x): parent[x] == x 면 x 반환, 아니면 find(parent[x]). 경로 압축으로 \`parent[x] = find(parent[x])\` 저장하면 빠르다.",
        "union(a, b): rootA = find(a), rootB = find(b). 다르면 \`parent[rootA] = rootB\`.",
        "같은 그룹 확인: find(a) == find(b).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);  // 경로 압축
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a != b) parent[a] = b;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    parent.resize(N);
    for (int i = 0; i < N; i++) parent[i] = i;

    while (M--) {
        int op, a, b;
        cin >> op >> a >> b;
        if (op == 0) unite(a, b);
        else cout << (find(a) == find(b) ? "YES" : "NO") << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "유니온 파인드의 기본 골격 — parent[] 배열, find(루트 찾기, 경로 압축), union(두 루트 합치기). 경로 압축 한 줄 \`parent[x] = find(parent[x])\` 으로 거의 O(α(N)) — 사실상 상수 시간.",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a != b:
        parent[a] = b

N, M = map(int, input().split())
parent = list(range(N))
out = []
for _ in range(M):
    op, a, b = map(int, input().split())
    if op == 0:
        unite(a, b)
    else:
        out.append("YES" if find(a) == find(b) else "NO")
sys.stdout.write("\\n".join(out) + ("\\n" if out else ""))
`,
      en: {
        title: "Same Group? (union / find basics)",
        description: `There are N elements numbered 0..N-1, initially in separate singleton groups. M queries follow.

- \`0 a b\` : union a and b.
- \`1 a b\` : print \`YES\` if a and b are in the same group, else \`NO\`.

First line: N M. Then M query lines.

Key — \`parent[]\` points each element to its parent. \`find(x)\` walks to the root (with path compression); \`union(a, b)\` joins the two roots.

Source: BOJ 1717 (Set Representation) paraphrased`,
        constraints: "1 ≤ N ≤ 1,000,000, 1 ≤ M ≤ 100,000",
        hints: [
          "Initialize \`parent[i] = i\` (everyone is their own root).",
          "find(x): if parent[x] == x return x; else recurse. Path-compress by writing \`parent[x] = find(parent[x])\`.",
          "union(a, b): rootA = find(a), rootB = find(b); if different, set \`parent[rootA] = rootB\`.",
          "Same group check: find(a) == find(b).",
        ],
        solutionExplanation:
          "Standard DSU skeleton — parent[] array, find with path compression, union of two roots. One line of path compression makes it effectively constant time.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 연결 요소 개수 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-002",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "보통",
      title: "연결 요소 개수 (DSU 버전)",
      description: `N 개의 정점 (0 부터 N-1) 과 M 개의 무방향 간선이 주어진다. **연결 요소의 개수** 를 출력하라.

핵심: 각 간선에 대해 union 을 호출한 뒤, **서로 다른 루트의 개수** 가 곧 연결 요소 수다. 즉 \`find(i) == i\` 인 i 의 개수.

출처: 원본 (DSU 기본 응용)`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ M ≤ 200,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5 3\n0 1\n1 2\n3 4", expectedOutput: "2", label: "기본 — {0,1,2}, {3,4}" },
        { stdin: "4 0", expectedOutput: "4", label: "간선 없음 — 각자 한 그룹" },
        { stdin: "1 0", expectedOutput: "1", label: "정점 1개" },
        { stdin: "6 5\n0 1\n2 3\n4 5\n1 2\n3 4", expectedOutput: "1", label: "체인으로 한 그룹" },
        { stdin: "5 4\n0 1\n0 1\n0 2\n3 4", expectedOutput: "2", label: "중복 간선도 OK" },
        { stdin: "7 3\n0 1\n2 3\n4 5", expectedOutput: "4", label: "{0,1},{2,3},{4,5},{6}" },
      ],
      hints: [
        "표준 DSU 구현 → 각 간선마다 union.",
        "끝나고 i = 0..N-1 돌며 find(i) == i 카운트 — 그게 답.",
        "또는 union 호출 시 합쳐졌을 때만 컴포넌트 카운트 감소 (시작 = N).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    parent[a] = b;
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    parent.resize(N);
    for (int i = 0; i < N; i++) parent[i] = i;

    int comps = N;
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        if (unite(u, v)) comps--;
    }
    cout << comps << "\\n";
    return 0;
}`,
      solutionExplanation:
        "컴포넌트 수 = N - (실제로 합쳐진 union 횟수). union 이 새로운 합병에 성공했을 때만 카운터를 줄이면 깔끔. 또는 끝에 find(i)==i 개수를 세도 동일.",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a == b:
        return False
    parent[a] = b
    return True

N, M = map(int, input().split())
parent = list(range(N))
comps = N
for _ in range(M):
    u, v = map(int, input().split())
    if unite(u, v):
        comps -= 1
print(comps)
`,
      en: {
        title: "Connected Components (DSU)",
        description: `Given N vertices (0..N-1) and M undirected edges, print the number of **connected components**.

Key: call union on every edge; the answer is the number of distinct roots, i.e. how many i satisfy \`find(i) == i\`.

Source: original (basic DSU application)`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ M ≤ 200,000",
        hints: [
          "Standard DSU → union for each edge.",
          "Afterwards count i with find(i) == i.",
          "Alternative: start counter at N and decrement only when union actually merges two roots.",
        ],
        solutionExplanation:
          "Components = N - (successful merges). Decrement a counter only when union truly joins two roots. Equivalent to counting find(i)==i at the end.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 친구 네트워크 사이즈 — 보통 (BOJ 4195 simplified)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-003",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "보통",
      title: "친구 그룹 사이즈 추적",
      description: `친구 관계가 차례대로 추가된다. 각 관계 추가 후, **방금 합쳐진 두 사람이 속한 친구 그룹의 크기** 를 출력하라.

입력:
- 첫 줄: F (관계 추가 횟수)
- 다음 F 줄: 두 정수 a b (0-indexed 사람 번호). 각 사람은 0..N-1.
- 그 전에 N (사람 수) 도 첫 줄에 같이 주어짐. 즉 첫 줄: \`N F\`.

핵심 — \`size[root]\` 를 함께 추적. union 시 \`size[새 루트] += size[기존 루트]\`.

이미 같은 그룹인 두 사람을 다시 합치는 쿼리는 그룹 크기 변화 없음 — 현재 크기 그대로 출력.

출처: BOJ 4195 (친구 네트워크) simplified — 이름 매핑 제거, 정수 ID 직접 사용`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ F ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 4\n0 1\n2 3\n0 2\n4 0",
          expectedOutput: "2\n2\n4\n5",
          label: "기본 — 1+1=2, 1+1=2, 2+2=4, 4+1=5",
        },
        {
          stdin: "3 3\n0 1\n0 1\n0 2",
          expectedOutput: "2\n2\n3",
          label: "이미 같은 그룹 — 크기 그대로",
        },
        {
          stdin: "2 1\n0 1",
          expectedOutput: "2",
          label: "한 번만",
        },
        {
          stdin: "4 3\n0 1\n1 2\n2 3",
          expectedOutput: "2\n3\n4",
          label: "체인 — 2 → 3 → 4",
        },
        {
          stdin: "6 5\n0 1\n2 3\n4 5\n0 2\n0 4",
          expectedOutput: "2\n2\n2\n4\n6",
          label: "3 쌍 → 합치며 두 배씩",
        },
      ],
      hints: [
        "\`size[]\` 배열도 같이 둔다. 초기 \`size[i] = 1\`.",
        "union(a, b): a = find(a), b = find(b). 같으면 size[a] 그대로 출력. 다르면 \`parent[a] = b; size[b] += size[a]\` 후 \`size[b]\` 출력.",
        "출력은 매 쿼리마다 새 그룹의 사이즈.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent, sz;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

int unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return sz[a];
    parent[a] = b;
    sz[b] += sz[a];
    return sz[b];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, F;
    cin >> N >> F;
    parent.resize(N);
    sz.assign(N, 1);
    for (int i = 0; i < N; i++) parent[i] = i;

    while (F--) {
        int a, b;
        cin >> a >> b;
        cout << unite(a, b) << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "size[]를 루트에만 의미 있게 유지하면 된다 — union 시 자식 측 size 를 부모 측 size 에 더한다. 같은 그룹인 두 사람 합치기는 변화 없으니 현재 크기를 그대로 반환.",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a == b:
        return sz[a]
    parent[a] = b
    sz[b] += sz[a]
    return sz[b]

N, F = map(int, input().split())
parent = list(range(N))
sz = [1] * N
out = []
for _ in range(F):
    a, b = map(int, input().split())
    out.append(str(unite(a, b)))
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Friend Group Size Tracking",
        description: `Friendships are added one at a time. After each, print the **size of the friend group containing the two just-united people**.

Input:
- First line: \`N F\` (number of people, number of relations).
- Next F lines: two integers a b (0-indexed).

Key — also maintain \`size[root]\`. On union, \`size[new root] += size[old root]\`.

Re-uniting two already-connected people doesn't change the size — just print the current size.

Source: BOJ 4195 (Friend Network) simplified — integer IDs instead of name strings`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ F ≤ 100,000",
        hints: [
          "Keep a \`size[]\` array, initialized to 1.",
          "union(a, b): if same root, print current size. Otherwise merge and add sizes; print the merged size.",
          "Print once per query.",
        ],
        solutionExplanation:
          "size[] is only meaningful at roots — on union, add child-side size into parent-side. Re-uniting an already-connected pair is a no-op; just print the current size.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 사이클 검출 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-004",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "보통",
      title: "사이클 검출 (간선 추가 시점)",
      description: `N 개의 정점 (0..N-1) 에 간선을 하나씩 추가한다. **처음으로 사이클이 만들어진 간선의 번호** (1-indexed) 를 출력하라. 사이클이 끝까지 안 생기면 \`-1\` 출력.

핵심 — 간선 (u, v) 를 추가하기 전에 \`find(u) == find(v)\` 면 이미 같은 그룹 → 이 간선이 사이클을 만든다.

출처: 원본 (DSU 의 가장 깔끔한 응용 하나 — 사이클 = 같은 루트)`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ M ≤ 200,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 4\n0 1\n1 2\n2 3\n3 0", expectedOutput: "4", label: "마지막 간선이 사이클" },
        { stdin: "4 3\n0 1\n1 2\n2 3", expectedOutput: "-1", label: "트리 — 사이클 없음" },
        { stdin: "3 3\n0 1\n1 2\n0 2", expectedOutput: "3", label: "삼각형 — 3번째 간선" },
        { stdin: "5 5\n0 1\n2 3\n1 2\n4 0\n3 4", expectedOutput: "5", label: "5 정점 사이클" },
        { stdin: "5 4\n0 1\n2 3\n1 2\n3 4", expectedOutput: "-1", label: "트리" },
        { stdin: "2 2\n0 1\n0 1", expectedOutput: "2", label: "중복 간선 → 사이클" },
        { stdin: "6 4\n0 1\n2 3\n4 5\n1 0", expectedOutput: "4", label: "이른 사이클" },
      ],
      hints: [
        "간선마다 두 끝점의 루트 비교 — 같으면 사이클 발생.",
        "발견 즉시 그 간선 번호 (1-indexed) 출력하고 종료.",
        "끝까지 없으면 -1.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    parent.resize(N);
    for (int i = 0; i < N; i++) parent[i] = i;

    int answer = -1;
    for (int i = 1; i <= M; i++) {
        int u, v;
        cin >> u >> v;
        if (answer != -1) continue;     // 이미 찾음 — 입력만 소비
        int ru = find(u), rv = find(v);
        if (ru == rv) {
            answer = i;
        } else {
            parent[ru] = rv;
        }
    }
    cout << answer << "\\n";
    return 0;
}`,
      solutionExplanation:
        "DSU 가 사이클 검출에 쓰이는 정석 — 합치기 전 두 끝점이 이미 같은 그룹이면 그 간선이 사이클을 닫는다. 발견 후에도 입력은 끝까지 읽어 형식을 깨뜨리지 않는다.",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

N, M = map(int, input().split())
parent = list(range(N))
answer = -1
for i in range(1, M + 1):
    u, v = map(int, input().split())
    if answer != -1:
        continue
    ru, rv = find(u), find(v)
    if ru == rv:
        answer = i
    else:
        parent[ru] = rv
print(answer)
`,
      en: {
        title: "Cycle Detection (First Closing Edge)",
        description: `Add edges one at a time to N vertices (0..N-1). Print the **1-indexed number of the first edge that closes a cycle**, or \`-1\` if no cycle ever forms.

Key — before uniting (u, v), if \`find(u) == find(v)\` they are already connected → this edge creates a cycle.

Source: original (cleanest DSU use case — cycle iff same root)`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ M ≤ 200,000",
        hints: [
          "For each edge compare roots — same root means cycle.",
          "Print the 1-indexed edge number on first detection.",
          "Print -1 if you reach the end without a cycle.",
        ],
        solutionExplanation:
          "Textbook DSU cycle detection — if both endpoints already share a root, this edge closes a cycle. Keep consuming input even after finding the answer to avoid format issues.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 가장 큰 그룹 사이즈 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-005",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "보통",
      title: "가장 큰 그룹 크기",
      description: `N 개의 사람과 M 개의 친구 관계가 주어진다. 모든 친구 관계를 적용한 뒤 **가장 큰 친구 그룹의 인원 수** 를 출력하라.

핵심: DSU + size 트래킹. 마지막에 \`find(i) == i\` 인 i 들의 \`size[i]\` 최댓값.

출처: 원본 (DSU 기본 응용 — Leetcode "Largest Connected Component" 류)`,
      constraints: "1 ≤ N ≤ 200,000, 0 ≤ M ≤ 200,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5 3\n0 1\n1 2\n3 4", expectedOutput: "3", label: "{0,1,2}=3, {3,4}=2" },
        { stdin: "6 4\n0 1\n2 3\n3 4\n4 5", expectedOutput: "4", label: "{2,3,4,5}=4, {0,1}=2" },
        { stdin: "1 0", expectedOutput: "1", label: "혼자" },
        { stdin: "5 0", expectedOutput: "1", label: "간선 없음 → 모두 1" },
        { stdin: "4 6\n0 1\n0 2\n0 3\n1 2\n1 3\n2 3", expectedOutput: "4", label: "완전 그래프" },
        { stdin: "6 3\n0 1\n2 3\n4 5", expectedOutput: "2", label: "균등 분할" },
      ],
      hints: [
        "사이즈 트래킹 DSU → 모든 union 처리 후, 루트들의 size 최댓값.",
        "또는 union 마다 'max 갱신' 변수를 유지 (덜 깔끔하지만 빠름).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent, sz;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return;
    parent[a] = b;
    sz[b] += sz[a];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    parent.resize(N);
    sz.assign(N, 1);
    for (int i = 0; i < N; i++) parent[i] = i;

    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        unite(u, v);
    }

    int best = 0;
    for (int i = 0; i < N; i++) {
        if (find(i) == i) best = max(best, sz[i]);
    }
    cout << best << "\\n";
    return 0;
}`,
      solutionExplanation:
        "사이즈 DSU 로 모두 합친 뒤, 루트만 골라 size 최댓값 — O(Nα(N)).",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a == b:
        return
    parent[a] = b
    sz[b] += sz[a]

N, M = map(int, input().split())
parent = list(range(N))
sz = [1] * N
for _ in range(M):
    u, v = map(int, input().split())
    unite(u, v)

best = 0
for i in range(N):
    if find(i) == i:
        if sz[i] > best:
            best = sz[i]
print(best)
`,
      en: {
        title: "Largest Group Size",
        description: `Given N people and M friendships, print the **size of the largest friend group** after all unions.

Key: DSU with size tracking. At the end, the max of \`size[i]\` over roots.

Source: original (Leetcode "Largest Connected Component" style)`,
        constraints: "1 ≤ N ≤ 200,000, 0 ≤ M ≤ 200,000",
        hints: [
          "Size-tracking DSU; after all unions take max over root sizes.",
          "Alternatively keep a 'running max' updated inside union.",
        ],
        solutionExplanation:
          "Size-DSU + max over roots → O(Nα(N)).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 가족 검사 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-006",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "보통",
      title: "같은 가족? (혈연 + 결혼 관계)",
      description: `N 명의 사람이 있다 (1..N). 다음 두 종류의 사건이 R 번 차례대로 발생한다.

- \`P a b\` : a 와 b 가 가족 관계 (부모-자식, 형제, 부부 등) — 같은 가족으로 합친다.
- \`Q a b\` : a 와 b 가 같은 가족인지 검사 — \`YES\` / \`NO\`.

쿼리는 **1-indexed** 이름을 사용한다. 코드에서는 0-indexed 로 바꿔서 처리하면 깔끔.

핵심: 1-indexed 입력을 받지만 내부 배열은 0-indexed (또는 size N+1) 로 처리.

출처: 원본 (DSU 표준 응용 — 1-indexed 입력에 익숙해지기)`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ R ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 5\nP 1 2\nP 3 4\nQ 1 2\nQ 1 3\nP 2 3",
          expectedOutput: "YES\nNO",
          label: "기본",
        },
        {
          stdin: "5 7\nP 1 2\nP 3 4\nP 2 3\nQ 1 4\nQ 1 5\nP 4 5\nQ 1 5",
          expectedOutput: "YES\nNO\nYES",
          label: "체인 결합",
        },
        {
          stdin: "3 2\nQ 1 2\nQ 1 1",
          expectedOutput: "NO\nYES",
          label: "관계 없음 / 자기 자신",
        },
        {
          stdin: "4 4\nP 1 2\nP 1 2\nP 1 3\nQ 2 3",
          expectedOutput: "YES",
          label: "중복 합치기 OK",
        },
        {
          stdin: "6 5\nP 1 2\nP 3 4\nP 5 6\nQ 2 4\nQ 5 6",
          expectedOutput: "NO\nYES",
          label: "3 가족 분리",
        },
      ],
      hints: [
        "size N+1 배열로 1-indexed 그대로 써도 됨 (parent[0] 는 무시).",
        "또는 입력 a,b 를 받고 a--, b-- 로 0-indexed 변환.",
        "operation 은 한 글자 ('P' 또는 'Q') — \`char op; cin >> op;\`.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a != b) parent[a] = b;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, R;
    cin >> N >> R;
    parent.resize(N + 1);
    for (int i = 0; i <= N; i++) parent[i] = i;

    while (R--) {
        char op;
        int a, b;
        cin >> op >> a >> b;
        if (op == 'P') unite(a, b);
        else cout << (find(a) == find(b) ? "YES" : "NO") << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "DSU 응용 — 1-indexed 입력 처리 + 문자 명령 분기. 핵심은 똑같다: union 으로 합치고 find 비교로 답.",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a != b:
        parent[a] = b

N, R = map(int, input().split())
parent = list(range(N + 1))
out = []
for _ in range(R):
    parts = input().split()
    op, a, b = parts[0], int(parts[1]), int(parts[2])
    if op == 'P':
        unite(a, b)
    else:
        out.append("YES" if find(a) == find(b) else "NO")
sys.stdout.write("\\n".join(out) + ("\\n" if out else ""))
`,
      en: {
        title: "Same Family? (relations + marriages)",
        description: `N people are labeled 1..N. R events follow:

- \`P a b\` : a and b are family (parent-child, sibling, spouse) — union them.
- \`Q a b\` : print \`YES\` if a and b are in the same family, else \`NO\`.

Names are **1-indexed** in input. Either keep arrays sized N+1 or convert to 0-indexed internally.

Source: original (DSU with 1-indexed input)`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ R ≤ 100,000",
        hints: [
          "Sizing arrays as N+1 lets you keep 1-indexed semantics.",
          "Read the single-character op with \`char op; cin >> op;\`.",
          "Otherwise it's the textbook DSU.",
        ],
        solutionExplanation:
          "DSU + single-character command dispatch. Union on P, find-compare on Q.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 크루스칼 MST — 어려움 (BOJ 1197 paraphrased)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-007",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "어려움",
      title: "최소 스패닝 트리 (크루스칼)",
      description: `V 개의 정점 (1..V) 과 E 개의 간선이 주어진다. 각 간선은 \`u v w\` 형식 — 두 정점과 가중치. **최소 스패닝 트리의 가중치 합** 을 출력하라. (모든 정점이 연결되어 있다고 가정.)

크루스칼 알고리즘:
1. 간선을 가중치 오름차순으로 정렬.
2. DSU 로 사이클 검사 — 사이클 안 만드는 간선만 채택.
3. 채택한 간선이 V-1 개가 되면 종료. 채택된 가중치의 합이 답.

핵심 — DSU 의 사이클 검사 (find(u) == find(v))가 크루스칼의 핵심. 정렬 + DSU = MST.

출처: BOJ 1197 (최소 스패닝 트리) paraphrased`,
      constraints: "1 ≤ V ≤ 10,000, 1 ≤ E ≤ 100,000, -1000 ≤ w ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3 3\n1 2 1\n2 3 2\n1 3 3",
          expectedOutput: "3",
          label: "삼각형 — 1 + 2 = 3 (3 빠짐)",
        },
        {
          stdin: "4 5\n1 2 1\n1 3 4\n1 4 3\n2 3 2\n3 4 5",
          expectedOutput: "6",
          label: "4 정점 → 3 간선 → 1+2+3 = 6",
        },
        {
          stdin: "2 1\n1 2 7",
          expectedOutput: "7",
          label: "간선 1개 — 그대로",
        },
        {
          stdin: "5 7\n1 2 3\n1 3 1\n2 3 5\n2 4 6\n3 4 4\n3 5 2\n4 5 7",
          expectedOutput: "10",
          label: "5 정점 → 4 간선 → 1+2+3+4 = 10",
        },
        {
          stdin: "4 4\n1 2 -1\n2 3 -2\n3 4 -3\n1 4 10",
          expectedOutput: "-6",
          label: "음수 가중치 — -1 + -2 + -3 = -6",
        },
        {
          stdin: "3 3\n1 2 5\n2 3 5\n1 3 5",
          expectedOutput: "10",
          label: "동률 가중치",
        },
      ],
      hints: [
        "간선 \`(w, u, v)\` 튜플로 저장 후 가중치 기준 정렬.",
        "정렬된 순서로 순회 — \`find(u) != find(v)\` 일 때만 union, 그 가중치 누적.",
        "채택 간선이 V-1 개가 되면 break (선택사항).",
        "가중치 합이 음수도 가능 — long long 사용 권장.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    parent[a] = b;
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int V, E;
    cin >> V >> E;
    vector<tuple<int,int,int>> edges(E);
    for (auto& [w, u, v] : edges) cin >> u >> v >> w;
    sort(edges.begin(), edges.end());

    parent.resize(V + 1);
    for (int i = 0; i <= V; i++) parent[i] = i;

    long long total = 0;
    int taken = 0;
    for (auto& [w, u, v] : edges) {
        if (unite(u, v)) {
            total += w;
            if (++taken == V - 1) break;
        }
    }
    cout << total << "\\n";
    return 0;
}`,
      solutionExplanation:
        "크루스칼 = 정렬 + DSU. 가장 싼 간선부터 보면서 사이클 안 만드는 것만 채택. DSU 가 '사이클이 되는가?' 를 즉시 답해주는 도구라 이 알고리즘이 성립한다. 시간 O(E log E).",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a == b:
        return False
    parent[a] = b
    return True

V, E = map(int, input().split())
edges = []
for _ in range(E):
    u, v, w = map(int, input().split())
    edges.append((w, u, v))
edges.sort()

parent = list(range(V + 1))
total = 0
taken = 0
for w, u, v in edges:
    if unite(u, v):
        total += w
        taken += 1
        if taken == V - 1:
            break
print(total)
`,
      en: {
        title: "Minimum Spanning Tree (Kruskal)",
        description: `V vertices (1..V) and E weighted edges (\`u v w\`). The graph is connected. Print the total weight of the **Minimum Spanning Tree**.

Kruskal:
1. Sort edges by weight ascending.
2. Use DSU to skip edges that would create a cycle.
3. Stop when V-1 edges are selected.

Key — DSU's cycle check (find(u) == find(v)) is the heart of Kruskal. Sort + DSU = MST.

Source: BOJ 1197 (Minimum Spanning Tree) paraphrased`,
        constraints: "1 ≤ V ≤ 10,000, 1 ≤ E ≤ 100,000, -1000 ≤ w ≤ 1000",
        hints: [
          "Store edges as (w, u, v) tuples; sort by w.",
          "Walk in order — accept the edge only if find(u) != find(v), then union.",
          "Stop after V-1 accepted edges (optional).",
          "Sum may be negative — use long long.",
        ],
        solutionExplanation:
          "Kruskal = sort + DSU. Cheapest first, skip cycle-makers. DSU's instant cycle test makes this O(E log E).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 도시 분할 계획 — 어려움 (BOJ 1647)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-008",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "어려움",
      title: "도시 분할 계획 (MST - 최댓값)",
      description: `N 개의 집 (1..N) 과 M 개의 길이 주어진다. 길마다 유지비 \`w\` 가 있다. 마을을 **정확히 두 개의 연결된 마을** 로 나누고 싶다. 각 마을은 내부적으로 연결되어야 하며, 두 마을 사이의 길은 끊는다. 그 외 마을 안의 불필요한 길도 끊을 수 있다.

**남기는 길들의 유지비 합** 을 최소화하라.

핵심 — MST 를 구한 뒤 **가장 비싼 한 간선을 제거** 하면 두 컴포넌트로 분할되며, 그것이 최적.

즉 답 = (MST 총합) - (MST 에서 채택한 간선 중 최댓값).

출처: BOJ 1647 (도시 분할 계획)`,
      constraints: "2 ≤ N ≤ 100,000, 1 ≤ M ≤ 1,000,000, 1 ≤ w ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "7 12\n1 2 3\n1 3 2\n3 2 1\n2 5 2\n3 4 4\n7 3 6\n5 1 5\n1 6 2\n6 4 1\n6 5 3\n4 5 3\n6 7 4",
          expectedOutput: "8",
          label: "BOJ 1647 예제",
        },
        {
          stdin: "3 3\n1 2 1\n2 3 2\n1 3 3",
          expectedOutput: "1",
          label: "삼각형 — MST = 3, 최대 채택 = 2, 답 = 1",
        },
        {
          stdin: "4 4\n1 2 1\n2 3 2\n3 4 3\n4 1 10",
          expectedOutput: "3",
          label: "4 정점 → MST = 1+2+3 = 6, 최대 = 3, 답 = 3",
        },
        {
          stdin: "2 1\n1 2 5",
          expectedOutput: "0",
          label: "2 정점 — 유일한 간선 끊으면 0",
        },
        {
          stdin: "5 4\n1 2 1\n2 3 1\n3 4 1\n4 5 1",
          expectedOutput: "3",
          label: "체인 — MST = 4, 최대 = 1, 답 = 3",
        },
        {
          stdin: "4 5\n1 2 2\n2 3 2\n3 4 2\n1 3 1\n2 4 1",
          expectedOutput: "2",
          label: "MST = 1+1+2 = 4, 최대 = 2, 답 = 2",
        },
      ],
      hints: [
        "MST 구하면서 (auf-007 처럼) 채택한 간선들의 가중치 최댓값을 따로 추적.",
        "답 = sum - max.",
        "정점 수 = 1 마을일 때 (N=1) 는 별도 처리 필요하나 제약상 N ≥ 2 이므로 무시 가능.",
        "M 이 100 만 — fast IO 필수.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    parent[a] = b;
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    vector<tuple<int,int,int>> edges(M);
    for (auto& [w, u, v] : edges) cin >> u >> v >> w;
    sort(edges.begin(), edges.end());

    parent.resize(N + 1);
    for (int i = 0; i <= N; i++) parent[i] = i;

    long long total = 0;
    int maxW = 0;
    int taken = 0;
    for (auto& [w, u, v] : edges) {
        if (unite(u, v)) {
            total += w;
            if (w > maxW) maxW = w;
            if (++taken == N - 1) break;
        }
    }
    cout << total - maxW << "\\n";
    return 0;
}`,
      solutionExplanation:
        "MST 는 V-1 개 간선의 트리 → 가장 비싼 간선을 끊으면 정확히 두 컴포넌트로 분할. MST 의 어떤 다른 간선을 끊어도 결과는 두 컴포넌트지만 합은 더 커진다 (가장 큰 걸 끊는 게 최적). 답 = MST합 - 최댓값.",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a == b:
        return False
    parent[a] = b
    return True

N, M = map(int, input().split())
edges = []
for _ in range(M):
    u, v, w = map(int, input().split())
    edges.append((w, u, v))
edges.sort()

parent = list(range(N + 1))
total = 0
max_w = 0
taken = 0
for w, u, v in edges:
    if unite(u, v):
        total += w
        if w > max_w:
            max_w = w
        taken += 1
        if taken == N - 1:
            break
print(total - max_w)
`,
      en: {
        title: "Town Partition (MST minus max edge)",
        description: `N houses and M roads with maintenance costs. Split the town into **exactly two connected sub-towns**, keeping the total kept-road cost minimum.

Key — build the MST, then **remove the most expensive MST edge**. That cuts the tree into exactly two components and the result is optimal.

So answer = (MST total) − (max accepted edge weight).

Source: BOJ 1647 (Town Partition Planning)`,
        constraints: "2 ≤ N ≤ 100,000, 1 ≤ M ≤ 1,000,000, 1 ≤ w ≤ 1000",
        hints: [
          "While building MST track the maximum accepted weight.",
          "Answer = total − max.",
          "M up to 1,000,000 — fast IO required.",
        ],
        solutionExplanation:
          "MST has V-1 edges; removing the heaviest leaves exactly two components and is the cheapest such split.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 행성 터널 — 어려움 (BOJ 2887 simplified)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-009",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "어려움",
      title: "행성 터널 (좌표 정렬 + MST)",
      description: `3 차원 공간에 N 개의 행성 (1..N) 이 있다. 좌표 (x, y, z) 가 각각 주어진다. 두 행성 a, b 사이의 터널 비용은 \`min(|xa-xb|, |ya-yb|, |za-zb|)\`. 모든 행성을 연결하는 **최소 비용** (MST) 을 구해 출력하라.

순진하게 모든 쌍 (N²) 의 간선을 만들면 N=100,000 에서 10^10 — 너무 많다.

**핵심 관찰**: 비용이 좌표 차이의 **최솟값** 이므로, 한 축 (예: x) 기준으로 정렬한 뒤 **인접한 쌍만** 간선으로 만들면 충분. 세 축에 대해 각각 N-1 개씩 → 총 약 3N 개 간선. 이 위에서 크루스칼.

증명 직관: 어떤 두 행성 사이 최소 비용 간선은 어떤 축에서든 정렬 순서상 멀리 떨어진 쌍에는 만들어지지 않는다 — 그 사이의 어떤 행성이 더 싼 다리를 만들어준다.

출처: BOJ 2887 (행성 터널)`,
      constraints: "1 ≤ N ≤ 100,000, -10^9 ≤ 좌표 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n11 -15 -15\n14 -5 -15\n-1 -1 -5\n10 -4 -1\n19 -4 19",
          expectedOutput: "4",
          label: "BOJ 2887 예제",
        },
        {
          stdin: "2\n0 0 0\n10 5 3",
          expectedOutput: "3",
          label: "두 행성 — min(10, 5, 3) = 3",
        },
        {
          stdin: "3\n0 0 0\n1 10 10\n100 0 100",
          expectedOutput: "1",
          label: "최소 거리만 더해짐 — (0→1: x차 1), (1 또는 0 → 100,0,100: y차 0)",
        },
        {
          stdin: "1\n5 5 5",
          expectedOutput: "0",
          label: "행성 1개 — 간선 0",
        },
        {
          stdin: "4\n0 0 0\n0 10 0\n0 0 10\n10 0 0",
          expectedOutput: "0",
          label: "모두 한 축씩 0 차이 — MST 합 0",
        },
      ],
      hints: [
        "x, y, z 세 축에 대해 \`(좌표, 인덱스)\` 배열을 각각 만들어 정렬.",
        "정렬된 순서로 **인접 쌍** 만 간선 (\`|좌표차|, i, j\`) 으로 추가 — 축당 N-1 개.",
        "총 ~3(N-1) 개 간선 → 크루스칼 (auf-007).",
        "좌표가 10^9 까지 — int 차이는 안전 (2 * 10^9 < 2^31). 안전하려면 long long.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    parent[a] = b;
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N;
    vector<array<long long, 3>> p(N);
    for (int i = 0; i < N; i++) cin >> p[i][0] >> p[i][1] >> p[i][2];

    vector<tuple<long long, int, int>> edges;
    edges.reserve(3 * N);

    for (int axis = 0; axis < 3; axis++) {
        vector<pair<long long, int>> sortedAxis(N);
        for (int i = 0; i < N; i++) sortedAxis[i] = {p[i][axis], i};
        sort(sortedAxis.begin(), sortedAxis.end());
        for (int i = 1; i < N; i++) {
            long long w = sortedAxis[i].first - sortedAxis[i - 1].first;
            edges.push_back({w, sortedAxis[i - 1].second, sortedAxis[i].second});
        }
    }

    sort(edges.begin(), edges.end());

    parent.resize(N);
    for (int i = 0; i < N; i++) parent[i] = i;

    long long total = 0;
    int taken = 0;
    for (auto& [w, u, v] : edges) {
        if (unite(u, v)) {
            total += w;
            if (++taken == N - 1) break;
        }
    }
    cout << total << "\\n";
    return 0;
}`,
      solutionExplanation:
        "핵심 관찰: 비용이 좌표 차이의 min 이라 한 축에서 정렬한 인접 쌍만 따져도 모든 MST 후보 간선을 커버. 간선 수를 O(N²) → O(N) 으로 줄여 크루스칼 적용. 정렬 + DSU 의 응용 중 가장 우아한 예 중 하나.",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a == b:
        return False
    parent[a] = b
    return True

N = int(input())
P = [tuple(map(int, input().split())) for _ in range(N)]

edges = []
for axis in range(3):
    sorted_axis = sorted((P[i][axis], i) for i in range(N))
    for i in range(1, N):
        w = sorted_axis[i][0] - sorted_axis[i - 1][0]
        edges.append((w, sorted_axis[i - 1][1], sorted_axis[i][1]))

edges.sort()
parent = list(range(N))
total = 0
taken = 0
for w, u, v in edges:
    if unite(u, v):
        total += w
        taken += 1
        if taken == N - 1:
            break
print(total)
`,
      en: {
        title: "Planet Tunnels (axis-sort + MST)",
        description: `N planets in 3D space. Tunnel cost between a and b is \`min(|xa−xb|, |ya−yb|, |za−zb|)\`. Find the minimum total cost to connect all (MST).

Building all N² edges is too many (~10^10 at N=100,000).

**Key observation**: since cost is the min of three coordinate differences, sorting by one axis and only keeping **adjacent pairs** is enough — about 3N candidate edges total. Then run Kruskal.

Source: BOJ 2887 (Planet Tunnels)`,
        constraints: "1 ≤ N ≤ 100,000, -10^9 ≤ coordinates ≤ 10^9",
        hints: [
          "For each axis x/y/z, sort (coord, index) pairs.",
          "Only add adjacent edges from each sorted list (≈3(N-1) total).",
          "Then standard Kruskal with DSU.",
          "Use long long for sums.",
        ],
        solutionExplanation:
          "min-cost reduces the candidate edge set from O(N²) to O(N) via per-axis adjacency. One of the prettiest DSU applications.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 여행 가자 — 어려움 (BOJ 1976 simplified)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-010",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "어려움",
      title: "여행 경로 (모두 같은 그룹?)",
      description: `N 개의 도시 (1..N) 가 있다. 도시 간 연결 정보가 \`N × N\` 행렬로 주어진다 (i, j 가 연결되어 있으면 1, 아니면 0). 그 후 여행 계획 — 방문할 도시 \`M\` 개의 순서가 한 줄에 주어진다. **여행 계획상의 모든 도시가 같은 연결 요소** 에 속하면 \`YES\`, 아니면 \`NO\` 를 출력하라. (어떤 순서로 가도 상관없고 환승 가능 — 그래서 사실상 '같은 그룹인가?' 만 묻는다.)

핵심: 행렬에서 1 인 쌍마다 union → 여행 도시들의 루트가 모두 같으면 \`YES\`.

출처: BOJ 1976 (여행 가자) simplified`,
      constraints: "1 ≤ N ≤ 200, 1 ≤ M ≤ 1000",
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
            "3\n3\n0 1 0\n1 0 1\n0 1 0\n1 2 3",
          expectedOutput: "YES",
          label: "BOJ 예제 — 1-2-3 체인",
        },
        {
          stdin:
            "5\n4\n0 1 0 1 1\n1 0 1 1 0\n0 1 0 0 0\n1 1 0 0 0\n1 0 0 0 0\n2 3 4 3",
          expectedOutput: "YES",
          label: "모두 한 그룹 — 중복 도시 OK",
        },
        {
          stdin:
            "4\n3\n0 1 0 0\n1 0 0 0\n0 0 0 1\n0 0 1 0\n1 2 3",
          expectedOutput: "NO",
          label: "{1,2}, {3,4} 분리 — 3 이 다른 그룹",
        },
        {
          stdin:
            "1\n1\n0\n1",
          expectedOutput: "YES",
          label: "도시 1개",
        },
        {
          stdin:
            "3\n1\n0 0 0\n0 0 0\n0 0 0\n2",
          expectedOutput: "YES",
          label: "방문 1 곳 — 항상 YES",
        },
        {
          stdin:
            "4\n4\n0 1 1 0\n1 0 0 1\n1 0 0 0\n0 1 0 0\n1 2 3 4",
          expectedOutput: "YES",
          label: "체인을 통해 모두 연결",
        },
      ],
      hints: [
        "입력: 첫 줄 N, 둘째 줄 M, 그 다음 N×N 행렬 (N 줄, 한 줄에 N 개), 마지막 한 줄에 여행 도시 M 개.",
        "행렬에서 i, j 모두 1..N → DSU 는 N+1 크기로.",
        "행렬 한 번만 보면 됨 — i < j 인 곳만 union 해도 충분.",
        "여행 도시 첫 번째의 루트와 나머지가 모두 같은지 검사.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a != b) parent[a] = b;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    parent.resize(N + 1);
    for (int i = 0; i <= N; i++) parent[i] = i;

    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            int x;
            cin >> x;
            if (x == 1) unite(i, j);
        }
    }

    int first;
    cin >> first;
    int firstRoot = find(first);
    bool ok = true;
    for (int i = 1; i < M; i++) {
        int city;
        cin >> city;
        if (find(city) != firstRoot) ok = false;
    }
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "그래프 연결성 질문을 DSU 로 즉답. 행렬 입력을 union 으로 변환 → 여행 도시 첫 번째의 루트와 나머지가 일치하는지 검사. M 도시 중 한 명이라도 다른 그룹이면 NO.",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a != b:
        parent[a] = b

N = int(input())
M = int(input())
parent = list(range(N + 1))

for i in range(1, N + 1):
    row = list(map(int, input().split()))
    for j in range(1, N + 1):
        if row[j - 1] == 1:
            unite(i, j)

plan = list(map(int, input().split()))
first_root = find(plan[0])
ok = all(find(c) == first_root for c in plan[1:])
print("YES" if ok else "NO")
`,
      en: {
        title: "Travel Plan (all in same component?)",
        description: `N cities (1..N) with an N×N connection matrix. Then a travel plan of M cities. Print \`YES\` if every planned city is in the **same connected component**, else \`NO\`.

Input order:
1. N
2. M
3. N×N matrix (N lines, N ints each)
4. M plan cities on one line

Source: BOJ 1976 (Let's Travel) simplified`,
        constraints: "1 ≤ N ≤ 200, 1 ≤ M ≤ 1000",
        hints: [
          "Union (i, j) whenever the matrix has a 1.",
          "Compare every plan city's root with the first one.",
          "Single-city plan or empty matrix is trivially YES.",
        ],
        solutionExplanation:
          "DSU directly answers the reachability question. Union over the matrix, then verify all plan cities share a root.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 친구 추천 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-011",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "어려움",
      title: "친구 그룹 — 가장 큰 그룹 + 그룹 수",
      description: `N 명의 사용자와 M 개의 친구 관계가 주어진다. 모든 관계를 처리한 뒤 두 가지를 한 줄에 공백으로 구분해 출력하라:

1. **친구 그룹의 총 개수** (= 루트 개수)
2. **가장 큰 친구 그룹의 크기**

핵심: 크기 트래킹 DSU 로 둘 다 끝에서 한 번 스캔에 해결.

출처: 원본 — auf-002 + auf-005 결합. 실제 추천 시스템에서 자주 묻는 두 통계.`,
      constraints: "1 ≤ N ≤ 200,000, 0 ≤ M ≤ 200,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5 3\n0 1\n1 2\n3 4",
          expectedOutput: "2 3",
          label: "{0,1,2}, {3,4} → 2 그룹, 최대 3",
        },
        {
          stdin: "6 0",
          expectedOutput: "6 1",
          label: "간선 없음 — 6 그룹, 각 크기 1",
        },
        {
          stdin: "4 6\n0 1\n0 2\n0 3\n1 2\n1 3\n2 3",
          expectedOutput: "1 4",
          label: "완전 그래프",
        },
        {
          stdin: "7 4\n0 1\n2 3\n4 5\n5 6",
          expectedOutput: "3 3",
          label: "{0,1},{2,3},{4,5,6} → 3 그룹, 최대 3",
        },
        {
          stdin: "1 0",
          expectedOutput: "1 1",
          label: "혼자",
        },
        {
          stdin: "5 4\n0 1\n1 2\n2 3\n3 4",
          expectedOutput: "1 5",
          label: "체인 — 한 그룹",
        },
      ],
      hints: [
        "크기 트래킹 DSU.",
        "마지막에 \`find(i) == i\` 인 i 들을 한 번 순회: 카운터 ++, max 갱신.",
        "두 값을 \`\"{groups} {largest}\"\` 형식으로 한 줄 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent, sz;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return;
    parent[a] = b;
    sz[b] += sz[a];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;
    parent.resize(N);
    sz.assign(N, 1);
    for (int i = 0; i < N; i++) parent[i] = i;

    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        unite(u, v);
    }

    int groups = 0, best = 0;
    for (int i = 0; i < N; i++) {
        if (find(i) == i) {
            groups++;
            if (sz[i] > best) best = sz[i];
        }
    }
    cout << groups << " " << best << "\\n";
    return 0;
}`,
      solutionExplanation:
        "두 통계 모두 마지막 한 번의 루트 스캔에 얻을 수 있다. groups = 루트 개수, best = 루트 size 최댓값. 어디서든 자주 묻는 패턴.",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a == b:
        return
    parent[a] = b
    sz[b] += sz[a]

N, M = map(int, input().split())
parent = list(range(N))
sz = [1] * N
for _ in range(M):
    u, v = map(int, input().split())
    unite(u, v)

groups = 0
best = 0
for i in range(N):
    if find(i) == i:
        groups += 1
        if sz[i] > best:
            best = sz[i]
print(groups, best)
`,
      en: {
        title: "Friend Stats — group count and largest size",
        description: `N users and M friendships. After processing all, print on one line:

1. **Total number of friend groups** (= number of roots)
2. **Size of the largest group**

Source: original — combines auf-002 + auf-005.`,
        constraints: "1 ≤ N ≤ 200,000, 0 ≤ M ≤ 200,000",
        hints: [
          "Size-tracking DSU.",
          "Final pass: every i with find(i)==i counts; track max size.",
          "Print \"{groups} {largest}\".",
        ],
        solutionExplanation:
          "Both stats come from one final root scan — groups = root count, best = max root size.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 섬과 다리 — 어려움 (동적 그래프 연결)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "auf-012",
      cluster: "algo-unionfind-contest",
      unlockAfter: "algo-unionfind",
      difficulty: "어려움",
      title: "섬과 다리 (동적 연결 카운트)",
      description: `N 개의 섬 (0..N-1) 이 있다. 처음에는 다리가 하나도 없다. Q 개의 이벤트가 차례대로 발생한다.

- \`B a b\` : 섬 a 와 b 사이에 다리를 놓는다 (양방향).
- \`C\` : 현재 **연결된 섬 그룹의 개수** 를 출력한다.

핵심: DSU + "그룹 수" 카운터를 함께 유지. 다리 추가 시 새로 합치게 되면 카운터 -= 1. \`C\` 쿼리는 카운터를 그대로 출력.

(주의: 같은 쌍을 다시 다리로 잇는 입력도 있을 수 있음 — 이미 같은 그룹이면 카운터 변화 없음.)

출처: 원본 (동적 DSU 연결 카운트 — 일반적인 면접/대회 패턴)`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ Q ≤ 200,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4 5\nC\nB 0 1\nC\nB 2 3\nC",
          expectedOutput: "4\n3\n2",
          label: "기본 — 4 → 3 → 2 그룹",
        },
        {
          stdin: "5 7\nC\nB 0 1\nB 1 2\nB 3 4\nC\nB 0 3\nC",
          expectedOutput: "5\n2\n1",
          label: "체인 합성",
        },
        {
          stdin: "3 4\nB 0 1\nB 0 1\nB 0 1\nC",
          expectedOutput: "2",
          label: "중복 다리 — 카운터 변화 한 번뿐",
        },
        {
          stdin: "1 2\nC\nB 0 0\nC",
          expectedOutput: "1\n1",
          label: "섬 1개 / 자기 자신 다리",
        },
        {
          stdin: "6 8\nC\nB 0 1\nB 2 3\nB 4 5\nC\nB 1 2\nB 3 4\nC",
          expectedOutput: "6\n3\n1",
          label: "병합 단계",
        },
        {
          stdin: "4 6\nC\nB 0 1\nC\nB 0 1\nC\nB 2 3",
          expectedOutput: "4\n3\n3",
          label: "쿼리 사이 변화 없는 union",
        },
      ],
      hints: [
        "DSU + 'groups' 변수. 초기 groups = N.",
        "\`B a b\`: union 이 실제로 합쳤을 때만 \`groups--\`. (이미 같은 그룹이면 변화 없음.)",
        "\`C\`: \`groups\` 출력.",
        "쿼리 형식이 'B' / 'C' 단일 문자 — \`char op; cin >> op;\` 후 분기.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> parent;

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    parent[a] = b;
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, Q;
    cin >> N >> Q;
    parent.resize(N);
    for (int i = 0; i < N; i++) parent[i] = i;

    int groups = N;
    while (Q--) {
        char op;
        cin >> op;
        if (op == 'B') {
            int a, b;
            cin >> a >> b;
            if (unite(a, b)) groups--;
        } else {
            cout << groups << "\\n";
        }
    }
    return 0;
}`,
      solutionExplanation:
        "DSU 의 '동적' 응용 — 그룹 수 카운터를 함께 운영. 다리 추가가 실제로 두 그룹을 합칠 때만 카운터 -1. C 쿼리에는 즉시 출력. 매 쿼리 O(α(N)) — 사실상 상수.",
      pyInitialCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(2000000)
input = sys.stdin.readline

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def unite(a, b):
    a, b = find(a), find(b)
    if a == b:
        return False
    parent[a] = b
    return True

N, Q = map(int, input().split())
parent = list(range(N))
groups = N
out = []
for _ in range(Q):
    parts = input().split()
    if parts[0] == 'B':
        a, b = int(parts[1]), int(parts[2])
        if unite(a, b):
            groups -= 1
    else:
        out.append(str(groups))
sys.stdout.write("\\n".join(out) + ("\\n" if out else ""))
`,
      en: {
        title: "Islands & Bridges (dynamic component count)",
        description: `N islands (0..N-1), initially no bridges. Q events:

- \`B a b\` : add a bridge between a and b.
- \`C\` : print the current number of **connected island groups**.

Maintain DSU + a "groups" counter. Decrement only when a bridge actually merges two distinct groups.

(Adding a redundant bridge — same component — does not change the count.)

Source: original (dynamic DSU component count — standard interview/contest pattern)`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ Q ≤ 200,000",
        hints: [
          "DSU + a \`groups\` counter initialized to N.",
          "On \`B\` decrement only when union truly merges.",
          "On \`C\` print \`groups\`.",
          "Op is a single char ('B'/'C') — read with \`cin >> op\`.",
        ],
        solutionExplanation:
          "Dynamic DSU — maintain a running group counter; bridge events decrement it only on actual merges. O(α(N)) per query.",
      },
    },
  ],
}
