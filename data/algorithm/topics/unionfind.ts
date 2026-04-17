import type { AlgoTopic } from '../types'

export const unionFindTopic: AlgoTopic = {
    id: 'unionfind',
    title: '유니온 파인드',
    icon: '🤝',
    category: '심화 (Gold~Platinum)',
    order: 21,
    description: '서로소 집합을 효율적으로 관리하는 자료구조',
    titleEn: 'Union-Find',
    categoryEn: 'Advanced Algorithms (Gold~Platinum)',
    descriptionEn: 'A data structure for efficiently managing disjoint sets',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: '기본 유니온 파인드',
            titleEn: 'Basic Union-Find',
            problemIds: [
                'boj-1717',
                'boj-1976'
            ],
            desc: '유니온 파인드의 기본 구현과 집합 판별 (Gold IV~V)',
            descEn: 'Basic Union-Find implementation and set membership check (Gold IV~V)'
        },
        {
            num: 2,
            title: '유니온 파인드 응용',
            titleEn: 'Applied Union-Find',
            problemIds: [
                'lc-200',
                'boj-4195'
            ],
            desc: '섬 개수, 네트워크 크기 등 응용 문제 (Medium~Gold)',
            descEn: 'Applied problems: island count, network size (Medium~Gold)'
        }
    ],
    problems: [
        {
            id: 'boj-1717',
            title: 'BOJ 1717 - 집합의 표현',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/1717',
            simIntro: '기본 Union-Find 연산(union, find)이 어떻게 동작하는지 확인하세요.',
            sim: {
                type: 'basicUF'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>초기에 {0}, {1}, ..., {n}이 각각 n+1개의 집합을 이루고 있다. 여기에 합집합 연산과, 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산을 수행하려고 한다.</p>
                <p>0 a b: a가 포함된 집합과 b가 포함된 집합을 합친다.</p>
                <p>1 a b: a와 b가 같은 집합에 포함되어 있는지를 확인한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 n(1 &le; n &le; 1,000,000), m(1 &le; m &le; 100,000)이 주어진다. m은 입력으로 주어지는 연산의 개수이다. 다음 m개의 줄에는 각각의 연산이 주어진다. 합집합은 0 a b의 형태로 입력이 주어진다. 이는 a가 포함되어 있는 집합과, b가 포함되어 있는 집합을 합친다는 의미이다. 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산은 1 a b의 형태로 입력이 주어진다. a와 b는 n 이하의 자연수 또는 0이며 같을 수도 있다.</p>
                <h4>출력</h4>
                <p>1로 시작하는 입력에 대해서 한 줄에 하나씩 "YES" 또는 "NO"로 결과를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>7 8
0 1 3
1 1 7
0 7 6
1 7 1
0 3 7
0 4 2
0 1 1
1 1 1</pre></div>
                    <div><strong>출력</strong><pre>NO
NO
YES</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ n ≤ 1,000,000</li><li>1 ≤ m ≤ 100,000</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '집합을 관리하려면... 각 집합을 <span class="lang-py"><strong>리스트(list)</strong></span><span class="lang-cpp"><strong>벡터(vector)</strong></span>로 만들면 되지 않을까?<br><br>"0 a b"가 오면 a가 속한 리스트와 b가 속한 리스트를 합치고,<br>"1 a b"가 오면 a와 b가 같은 리스트에 있는지 확인하면 될 것 같아!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '합집합할 때 한쪽 리스트의 원소를 전부 다른 쪽으로 옮겨야 해. 원소가 k개면 <strong>O(k)</strong>번 이동이 필요하고...<br><br>n이 최대 <strong>1,000,000</strong>, m이 최대 <strong>100,000</strong>이면, 최악의 경우 합칠 때마다 수십만 개를 옮겨야 할 수도 있어. 너무 느려! 😱<br><br>같은 집합인지 확인하는 것도, 리스트를 다 뒤져야 하면 <strong>O(n)</strong>이 걸려.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '리스트 대신 <strong>트리 구조</strong>를 쓰자! 각 원소가 "부모"를 가리키게 하면:<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.88em;"><div style="font-weight:600;text-align:center;margin-bottom:8px;">parent[] 배열 → 트리 구조</div><div style="display:flex;gap:24px;justify-content:center;align-items:flex-start;flex-wrap:wrap;"><div style="text-align:center;"><div style="font-size:0.8em;color:var(--text2);margin-bottom:4px;">parent = [0,1,1,3,1]</div><table style="border-collapse:collapse;font-family:monospace;margin:0 auto;"><tr><td style="padding:2px 8px;border:1px solid var(--bg3);text-align:center;font-size:0.8em;color:var(--text2);">idx</td><td style="padding:2px 8px;border:1px solid var(--bg3);">0</td><td style="padding:2px 8px;border:1px solid var(--bg3);">1</td><td style="padding:2px 8px;border:1px solid var(--bg3);">2</td><td style="padding:2px 8px;border:1px solid var(--bg3);">3</td><td style="padding:2px 8px;border:1px solid var(--bg3);">4</td></tr><tr><td style="padding:2px 8px;border:1px solid var(--bg3);text-align:center;font-size:0.8em;color:var(--text2);">par</td><td style="padding:2px 8px;border:1px solid var(--bg3);">0</td><td style="padding:2px 8px;border:1px solid var(--bg3);font-weight:700;color:var(--green);">1</td><td style="padding:2px 8px;border:1px solid var(--bg3);">1</td><td style="padding:2px 8px;border:1px solid var(--bg3);">3</td><td style="padding:2px 8px;border:1px solid var(--bg3);">1</td></tr></table></div><div style="text-align:center;"><div style="font-size:0.8em;color:var(--text2);margin-bottom:4px;">트리 형태</div><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><span style="padding:4px 10px;background:var(--green);color:#fff;border-radius:6px;font-weight:700;">1 (루트)</span><div style="display:flex;gap:16px;"><span style="border-left:2px solid var(--text2);height:12px;"></span><span style="border-left:2px solid var(--text2);height:12px;"></span></div><div style="display:flex;gap:12px;"><span style="padding:3px 8px;background:var(--accent);color:#fff;border-radius:4px;">2</span><span style="padding:3px 8px;background:var(--accent);color:#fff;border-radius:4px;">4</span></div></div></div></div></div>• <strong>find(x)</strong>: x에서 부모를 따라 올라가면 루트를 찾을 수 있어. 루트가 같으면 같은 집합!<br>• <strong>union(a, b)</strong>: 한쪽 루트를 다른 쪽 루트의 자식으로 붙이면 끝!<br><br>여기에 두 가지 최적화를 더하면 거의 <strong>O(1)</strong>에 가까워져:<br>① <strong>경로 압축</strong> — find할 때 만나는 노드를 전부 루트에 직접 연결<br>② <strong>랭크 기반 합치기</strong> — 높이가 낮은 트리를 높은 쪽에 붙임'
                },
                {
                    title: '구현 시 주의할 점',
                    content: 'n이 최대 1,000,000이라 입출력 속도가 중요해!<br><br><span class="lang-py"><code>sys.stdin.readline</code>을 써서 입력을 빠르게 받고, 재귀 find를 쓸 거면 <code>sys.setrecursionlimit</code>을 늘려줘야 해. 아니면 반복문으로 find를 구현하는 방법도 있어.</span><span class="lang-cpp"><code>scanf/printf</code>를 쓰면 충분히 빠르고, 배열 크기를 1,000,001로 잡아야 해. C++에서 <code>union</code>은 예약어라 함수 이름을 <code>unite</code>로 써야 해!</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(1000001)

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a, b = find(a), find(b)
    if a == b:
        return
    if rank[a] < rank[b]:
        a, b = b, a
    parent[b] = a
    if rank[a] == rank[b]:
        rank[a] += 1

n, m = map(int, input().split())
parent = list(range(n + 1))
rank = [0] * (n + 1)

for _ in range(m):
    op, a, b = map(int, input().split())
    if op == 0:
        union(a, b)
    else:
        print("YES" if find(a) == find(b) else "NO")`,
                cpp: `#include <cstdio>
#include <algorithm>
using namespace std;

int parent[1000001], rnk[1000001];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return;
    if (rnk[a] < rnk[b]) swap(a, b);
    parent[b] = a;
    if (rnk[a] == rnk[b]) rnk[a]++;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    for (int i = 0; i <= n; i++) {
        parent[i] = i;
        rnk[i] = 0;
    }
    while (m--) {
        int op, a, b;
        scanf("%d %d %d", &op, &a, &b);
        if (op == 0) unite(a, b);
        else printf("%s\\n", find(a) == find(b) ? "YES" : "NO");
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '경로 압축 + 랭크 기반 Union-Find',
                    description: 'parent 배열과 rank 배열로 union/find를 구현합니다.',
                    timeComplexity: 'O(m * α(n))',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(1000001)

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a, b = find(a), find(b)
    if a == b:
        return
    if rank[a] < rank[b]:
        a, b = b, a
    parent[b] = a
    if rank[a] == rank[b]:
        rank[a] += 1

n, m = map(int, input().split())
parent = list(range(n + 1))
rank = [0] * (n + 1)

for _ in range(m):
    op, a, b = map(int, input().split())
    if op == 0:
        union(a, b)
    else:
        print("YES" if find(a) == find(b) else "NO")`,
                        cpp: `#include <cstdio>
#include <algorithm>
using namespace std;

int parent[1000001], rnk[1000001];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return;
    if (rnk[a] < rnk[b]) swap(a, b);
    parent[b] = a;
    if (rnk[a] == rnk[b]) rnk[a]++;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    for (int i = 0; i <= n; i++) {
        parent[i] = i;
        rnk[i] = 0;
    }
    while (m--) {
        int op, a, b;
        scanf("%d %d %d", &op, &a, &b);
        if (op == 0) unite(a, b);
        else printf("%s\\n", find(a) == find(b) ? "YES" : "NO");
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'find/union 구현',
                                desc: '경로 압축 find + 랭크 기반 union으로 거의 O(1) 연산을 보장합니다.',
                                code: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(1000001)

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a, b = find(a), find(b)
    if a == b: return
    if rank[a] < rank[b]: a, b = b, a
    parent[b] = a
    if rank[a] == rank[b]: rank[a] += 1`
                            },
                            {
                                title: '초기화',
                                desc: '각 노드가 자기 자신을 부모로 가리키도록 초기화합니다. 처음엔 모두 독립 집합입니다.',
                                code: `n, m = map(int, input().split())
parent = list(range(n + 1))
rank = [0] * (n + 1)`
                            },
                            {
                                title: '쿼리 처리',
                                desc: 'op=0이면 합치기(union), op=1이면 같은 집합인지 find로 확인합니다.',
                                code: `for _ in range(m):
    op, a, b = map(int, input().split())
    if op == 0:
        union(a, b)
    else:
        print("YES" if find(a) == find(b) else "NO")`
                            }
                        ],
                        cpp: [
                            {
                                title: 'find/unite 구현',
                                desc: `전역 배열 + 경로 압축 + 랭크 합치기.
C++에서 union은 예약어라 unite 사용.`,
                                code: `#include <cstdio>
#include <algorithm>
using namespace std;

int parent[1000001], rnk[1000001];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);  // 경로 압축
    return parent[x];
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return;
    if (rnk[a] < rnk[b]) swap(a, b);  // 랭크 기반
    parent[b] = a;
    if (rnk[a] == rnk[b]) rnk[a]++;
}`
                            },
                            {
                                title: '초기화',
                                desc: '전역 배열이므로 main에서 0~n까지 자기 자신으로 초기화합니다.',
                                code: `int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    for (int i = 0; i <= n; i++) {
        parent[i] = i;
        rnk[i] = 0;
    }`
                            },
                            {
                                title: '쿼리 처리',
                                desc: 'op=0이면 unite, 아니면 find 비교 후 YES/NO를 출력합니다.',
                                code: `    while (m--) {
        int op, a, b;
        scanf("%d %d %d", &op, &a, &b);
        if (op == 0) unite(a, b);
        else printf("%s\\n", find(a)==find(b) ? "YES" : "NO");
    }
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1976',
            title: 'BOJ 1976 - 여행 가자',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/1976',
            simIntro: '인접행렬로 도시를 union한 뒤, 여행 경로를 확인하는 과정을 관찰하세요.',
            sim: {
                type: 'travel'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>동혁이는 도시를 여행하려고 한다. N개의 도시가 있고, 그 중 일부 쌍이 연결되어 있다. 주어진 여행 경로가 가능한 여행 경로인지 여부를 판별하시오. 같은 도시를 여러 번 방문하는 것도 가능하다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 도시의 수 N이 주어진다. N은 200 이하이다. 둘째 줄에 여행 계획에 속한 도시들의 수 M이 주어진다. M은 1000 이하이다. 다음 N개의 줄에는 N개의 정수로 도시 간의 연결 정보가 주어진다. i번째 줄의 j번째 수는 i번 도시와 j번 도시의 연결 정보이며, 1이면 연결된 것이고 0이면 연결이 되지 않은 것이다. 마지막 줄에는 여행 계획이 주어진다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 가능하면 "YES", 불가능하면 "NO"를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3
3
0 1 0
1 0 1
0 1 0
1 2 3</pre></div>
                    <div><strong>출력</strong><pre>YES</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ N ≤ 200</li><li>1 ≤ M ≤ 1,000</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '여행 경로가 1→2→3이면... 1에서 2로 갈 수 있는지, 2에서 3으로 갈 수 있는지 하나씩 확인하면 되지 않을까?<br><br>인접 행렬에서 직접 연결을 확인하거나, 직접 연결이 없으면 <strong>BFS/DFS</strong>로 경로가 있는지 탐색해볼 수 있겠어!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '잠깐, 여행 경로가 M개 도시를 거치면 매번 BFS/DFS를 돌려야 해. 최악의 경우 <strong>O(M * N^2)</strong>이 될 수 있어.<br><br>그런데 사실... 꼭 "1→2→3 순서대로" 갈 수 있는지를 볼 필요가 있을까? 🤔<br>문제를 다시 읽어보면, 같은 도시를 여러 번 방문해도 되고, 경로가 어떻든 상관없어. 그러면 핵심은 뭘까?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '핵심 관찰: 여행 도시들이 전부 <strong>같은 연결 요소</strong>에 있기만 하면 여행이 가능해!<br><br>연결만 되어 있으면 어떤 경로로든 오갈 수 있으니까. 그러면 문제가 단순해져:<br><br>① 인접 행렬에서 연결된 도시 쌍을 전부 <strong>union</strong><br>② 여행 도시들의 <strong>find</strong> 값이 모두 같으면 YES!<br><br>N이 최대 200이라 인접행렬을 읽으며 union하면 O(N^2)이면 충분해. 유니온 파인드로 깔끔하게 해결!'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a, b = find(a), find(b)
    if a != b:
        parent[b] = a

N = int(input())
M = int(input())
parent = list(range(N + 1))

for i in range(1, N + 1):
    row = list(map(int, input().split()))
    for j in range(N):
        if row[j] == 1:
            union(i, j + 1)

cities = list(map(int, input().split()))
root = find(cities[0])
if all(find(c) == root for c in cities):
    print("YES")
else:
    print("NO")`,
                cpp: `#include <cstdio>
using namespace std;

int parent[201];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a != b) parent[b] = a;
}

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    for (int i = 1; i <= N; i++) parent[i] = i;

    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            int v;
            scanf("%d", &v);
            if (v == 1) unite(i, j);
        }
    }

    int first, city;
    scanf("%d", &first);
    bool ok = true;
    for (int i = 1; i < M; i++) {
        scanf("%d", &city);
        if (find(city) != find(first)) ok = false;
    }
    printf("%s\\n", ok ? "YES" : "NO");
    return 0;
}`
            },
            solutions: [
                {
                    approach: '인접행렬 + Union-Find',
                    description: '인접행렬에서 연결된 도시를 union하고, 여행 도시의 find 값이 모두 같은지 확인합니다.',
                    timeComplexity: 'O(N^2 * α(N))',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a, b = find(a), find(b)
    if a != b:
        parent[b] = a

N = int(input())
M = int(input())
parent = list(range(N + 1))

for i in range(1, N + 1):
    row = list(map(int, input().split()))
    for j in range(N):
        if row[j] == 1:
            union(i, j + 1)

cities = list(map(int, input().split()))
root = find(cities[0])
if all(find(c) == root for c in cities):
    print("YES")
else:
    print("NO")`,
                        cpp: `#include <cstdio>
using namespace std;

int parent[201];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a != b) parent[b] = a;
}

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    for (int i = 1; i <= N; i++) parent[i] = i;

    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            int v;
            scanf("%d", &v);
            if (v == 1) unite(i, j);
        }
    }

    int first, city;
    scanf("%d", &first);
    bool ok = true;
    for (int i = 1; i < M; i++) {
        scanf("%d", &city);
        if (find(city) != find(first)) ok = false;
    }
    printf("%s\\n", ok ? "YES" : "NO");
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'find/union 구현',
                                desc: '경로 압축으로 트리를 납작하게 만들어 find를 빠르게 합니다.',
                                code: `import sys
input = sys.stdin.readline

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a, b = find(a), find(b)
    if a != b: parent[b] = a`
                            },
                            {
                                title: '입력 및 인접행렬 union',
                                desc: '인접행렬에서 1인 칸을 찾아 해당 도시 쌍을 union합니다. 직접 연결된 도시들이 같은 집합이 됩니다.',
                                code: `N = int(input())
M = int(input())
parent = list(range(N + 1))

for i in range(1, N + 1):
    row = list(map(int, input().split()))
    for j in range(N):
        if row[j] == 1: union(i, j + 1)`
                            },
                            {
                                title: '여행 가능 여부 확인',
                                desc: '여행 도시들의 find 값이 모두 같으면 같은 연결 요소 → 여행 가능합니다.',
                                code: `cities = list(map(int, input().split()))
root = find(cities[0])
if all(find(c) == root for c in cities):
    print("YES")
else:
    print("NO")`
                            }
                        ],
                        cpp: [
                            {
                                title: 'find/unite 구현',
                                desc: '도시 수가 최대 200이라 배열 크기가 작습니다. 경로 압축만으로 충분합니다.',
                                code: `#include <cstdio>
using namespace std;

int parent[201];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}

void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a != b) parent[b] = a;
}`
                            },
                            {
                                title: '입력 및 인접행렬 unite',
                                desc: 'N*N 인접행렬을 읽으며 값이 1인 도시 쌍을 unite로 같은 집합으로 묶습니다.',
                                code: `int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    for (int i = 1; i <= N; i++) parent[i] = i;

    for (int i = 1; i <= N; i++)
        for (int j = 1; j <= N; j++) {
            int v; scanf("%d", &v);
            if (v == 1) unite(i, j);
        }`
                            },
                            {
                                title: '여행 가능 여부 확인',
                                desc: '첫 번째 여행 도시의 루트와 나머지를 비교해서 하나라도 다르면 NO입니다.',
                                code: `    int first, city;
    scanf("%d", &first);
    bool ok = true;
    for (int i = 1; i < M; i++) {
        scanf("%d", &city);
        if (find(city) != find(first)) ok = false;
    }
    printf("%s\\n", ok ? "YES" : "NO");
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-200',
            title: 'LeetCode 200 - Number of Islands',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/number-of-islands/',
            simIntro: '격자에서 인접한 땅을 union하여 섬 개수를 세는 과정을 관찰하세요.',
            sim: {
                type: 'islands'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>'1'(land)과 '0'(water)으로 이루어진 2D 격자 지도가 주어집니다. 섬의 개수를 반환하세요. 섬은 물로 둘러싸여 있으며, 수평 또는 수직으로 인접한 땅을 연결하여 형성됩니다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]</pre></div>
                    <div><strong>출력</strong><pre>1</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]</pre></div>
                    <div><strong>출력</strong><pre>3</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>m == grid.length</li><li>n == grid[i].length</li><li>1 ≤ m, n ≤ 300</li><li>grid[i][j]는 '0' 또는 '1'</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '격자에서 섬을 찾으려면... \'1\'인 칸을 만나면 거기서 <strong>BFS나 DFS</strong>로 연결된 \'1\'을 전부 방문 처리하면 되겠지?<br><br>탐색을 시작한 횟수 = 섬 개수! 이건 그래프 탐색의 기본 패턴이야.'
                },
                {
                    title: '근데 다른 방법도 있어',
                    content: 'BFS/DFS도 좋지만, 이 문제를 <strong>유니온 파인드</strong>로도 풀 수 있어!<br><br>생각해보면, 인접한 \'1\' 칸끼리 "같은 그룹"으로 묶는 거잖아? 그게 바로 union 연산이야.<br>처음에 \'1\' 칸이 각각 독립된 섬이라고 하고, 인접한 \'1\'끼리 union하면 섬이 합쳐지는 거지!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '구체적인 방법:<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.85em;"><div style="font-weight:600;text-align:center;margin-bottom:8px;">2D → 1D 인덱스 변환 (cols=5)</div><div style="display:flex;gap:2px;justify-content:center;flex-wrap:wrap;font-family:monospace;"><div style="display:flex;gap:2px;"><span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--green);color:#fff;border-radius:4px;font-size:0.8em;">0</span><span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--green);color:#fff;border-radius:4px;font-size:0.8em;">1</span><span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--bg3);border-radius:4px;font-size:0.8em;">2</span><span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--bg3);border-radius:4px;font-size:0.8em;">3</span><span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--bg3);border-radius:4px;font-size:0.8em;">4</span></div><div style="display:flex;gap:2px;"><span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--green);color:#fff;border-radius:4px;font-size:0.8em;">5</span><span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--green);color:#fff;border-radius:4px;font-size:0.8em;">6</span><span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--bg3);border-radius:4px;font-size:0.8em;">7</span><span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--bg3);border-radius:4px;font-size:0.8em;">8</span><span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--bg3);border-radius:4px;font-size:0.8em;">9</span></div></div><div style="text-align:center;margin-top:6px;color:var(--text2);font-size:0.85em;">(r,c) → r*5+c: (1,0)→5, (1,1)→6</div><div style="text-align:center;margin-top:4px;color:var(--green);font-weight:600;">초록 칸끼리 union → 하나의 섬!</div></div>① 2D 좌표 (r, c)를 <code>r * cols + c</code>로 <strong>1D 인덱스</strong>로 변환 (parent 배열에 쓰려고!)<br>② 처음 섬 개수 = \'1\'인 칸의 총 개수<br>③ 모든 \'1\' 칸을 순회하면서, <strong>오른쪽/아래</strong> 칸도 \'1\'이면 union<br>④ union이 성공할 때마다 (서로 다른 집합이었을 때) 섬 개수를 <strong>1 감소</strong><br><br>왜 오른쪽/아래만? 왼쪽/위는 이미 이전에 확인했으니까 중복을 피하는 거야!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python에서는 <code>parent = list(range(rows * cols))</code>로 간단히 초기화하고, union 성공 여부를 <code>return True/False</code>로 반환하면 count 감소를 깔끔하게 처리할 수 있어!</span><span class="lang-cpp">C++에서는 <code>iota(parent.begin(), parent.end(), 0)</code>으로 0,1,2,...를 한 번에 초기화할 수 있어! unite가 <code>bool</code>을 반환하게 만들면 성공 시 count--를 깔끔하게 처리할 수 있지.</span>'
                }
            ],
            templates: {
                python: `class Solution:
    def numIslands(self, grid):
        if not grid:
            return 0
        rows, cols = len(grid), len(grid[0])
        parent = list(range(rows * cols))
        rank = [0] * (rows * cols)

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            a, b = find(a), find(b)
            if a == b:
                return False
            if rank[a] < rank[b]:
                a, b = b, a
            parent[b] = a
            if rank[a] == rank[b]:
                rank[a] += 1
            return True

        count = sum(grid[r][c] == '1'
                     for r in range(rows)
                     for c in range(cols))

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    idx = r * cols + c
                    for dr, dc in [(0, 1), (1, 0)]:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                            if union(idx, nr * cols + nc):
                                count -= 1
        return count`,
                cpp: `class Solution {
public:
    vector<int> parent, rnk;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (rnk[a] < rnk[b]) swap(a, b);
        parent[b] = a;
        if (rnk[a] == rnk[b]) rnk[a]++;
        return true;
    }

    int numIslands(vector<vector<char>>& grid) {
        int rows = grid.size(), cols = grid[0].size();
        parent.resize(rows * cols);
        rnk.resize(rows * cols, 0);
        iota(parent.begin(), parent.end(), 0);

        int count = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (grid[r][c] == '1') count++;

        int dr[] = {0, 1}, dc[] = {1, 0};
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    for (int d = 0; d < 2; d++) {
                        int nr = r + dr[d], nc = c + dc[d];
                        if (nr < rows && nc < cols && grid[nr][nc] == '1')
                            if (unite(r * cols + c, nr * cols + nc))
                                count--;
                    }
                }
            }
        }
        return count;
    }
};`
            },
            solutions: [
                {
                    approach: 'Union-Find로 섬 세기',
                    description: '인접한 \'1\' 칸을 union하고, union 성공시 count를 줄여 섬 개수를 구합니다.',
                    timeComplexity: 'O(m * n * α(m*n))',
                    spaceComplexity: 'O(m * n)',
                    templates: {
                        python: `class Solution:
    def numIslands(self, grid):
        if not grid:
            return 0
        rows, cols = len(grid), len(grid[0])
        parent = list(range(rows * cols))
        rank = [0] * (rows * cols)

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            a, b = find(a), find(b)
            if a == b:
                return False
            if rank[a] < rank[b]:
                a, b = b, a
            parent[b] = a
            if rank[a] == rank[b]:
                rank[a] += 1
            return True

        count = sum(grid[r][c] == '1'
                     for r in range(rows)
                     for c in range(cols))

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    idx = r * cols + c
                    for dr, dc in [(0, 1), (1, 0)]:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                            if union(idx, nr * cols + nc):
                                count -= 1
        return count`,
                        cpp: `class Solution {
public:
    vector<int> parent, rnk;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (rnk[a] < rnk[b]) swap(a, b);
        parent[b] = a;
        if (rnk[a] == rnk[b]) rnk[a]++;
        return true;
    }

    int numIslands(vector<vector<char>>& grid) {
        int rows = grid.size(), cols = grid[0].size();
        parent.resize(rows * cols);
        rnk.resize(rows * cols, 0);
        iota(parent.begin(), parent.end(), 0);

        int count = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (grid[r][c] == '1') count++;

        int dr[] = {0, 1}, dc[] = {1, 0};
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    for (int d = 0; d < 2; d++) {
                        int nr = r + dr[d], nc = c + dc[d];
                        if (nr < rows && nc < cols && grid[nr][nc] == '1')
                            if (unite(r * cols + c, nr * cols + nc))
                                count--;
                    }
                }
            }
        }
        return count;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'find/union 구현',
                                desc: 'union이 성공하면 True를 반환해서 섬 개수를 줄이는 데 활용합니다.',
                                code: `parent = list(range(rows * cols))
rank = [0] * (rows * cols)

def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]
        x = parent[x]
    return x

def union(a, b):
    a, b = find(a), find(b)
    if a == b: return False
    if rank[a] < rank[b]: a, b = b, a
    parent[b] = a
    if rank[a] == rank[b]: rank[a] += 1
    return True`
                            },
                            {
                                title: '초기 섬 수 계산',
                                desc: '처음엔 모든 \'1\' 칸이 각각 독립된 섬이라고 가정하고 총 개수를 셉니다.',
                                code: `count = sum(grid[r][c] == '1'
             for r in range(rows)
             for c in range(cols))`
                            },
                            {
                                title: '인접 칸 union',
                                desc: '오른쪽/아래만 확인하면 중복 없이 모든 인접 쌍을 처리합니다. union 성공 시 섬 개수를 1 줄입니다.',
                                code: `for r in range(rows):
    for c in range(cols):
        if grid[r][c] == '1':
            idx = r * cols + c
            for dr, dc in [(0,1),(1,0)]:
                nr, nc = r+dr, c+dc
                if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]=='1':
                    if union(idx, nr*cols+nc):
                        count -= 1
return count`
                            }
                        ],
                        cpp: [
                            {
                                title: 'find/unite 구현',
                                desc: `클래스 멤버로 parent/rnk 벡터.
iota로 0,1,2,...초기화.`,
                                code: `vector<int> parent, rnk;

int find(int x) {
    while (parent[x] != x) {
        parent[x] = parent[parent[x]];  // 경로 압축
        x = parent[x];
    }
    return x;
}

bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    if (rnk[a] < rnk[b]) swap(a, b);
    parent[b] = a;
    if (rnk[a] == rnk[b]) rnk[a]++;
    return true;  // union 성공 → 섬 개수 -1
}`
                            },
                            {
                                title: '초기 섬 수 계산',
                                desc: 'iota로 parent를 0,1,2,...로 초기화하고, \'1\' 칸 수를 초기 섬 개수로 설정합니다.',
                                code: `int rows = grid.size(), cols = grid[0].size();
parent.resize(rows * cols);
rnk.resize(rows * cols, 0);
iota(parent.begin(), parent.end(), 0);

int count = 0;
for (int r = 0; r < rows; r++)
    for (int c = 0; c < cols; c++)
        if (grid[r][c] == '1') count++;`
                            },
                            {
                                title: '인접 칸 unite',
                                desc: '오른쪽(0,1)과 아래(1,0) 두 방향만 확인합니다. unite 성공하면 두 섬이 합쳐져 count를 감소시킵니다.',
                                code: `int dr[] = {0, 1}, dc[] = {1, 0};
for (int r = 0; r < rows; r++)
    for (int c = 0; c < cols; c++)
        if (grid[r][c] == '1')
            for (int d = 0; d < 2; d++) {
                int nr = r+dr[d], nc = c+dc[d];
                if (nr<rows && nc<cols && grid[nr][nc]=='1')
                    if (unite(r*cols+c, nr*cols+nc))
                        count--;
            }
return count;`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-4195',
            title: 'BOJ 4195 - 친구 네트워크',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/4195',
            simIntro: '이름→번호 매핑과 size 배열로 네트워크 크기를 추적하는 과정을 관찰하세요.',
            sim: {
                type: 'friendNet'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>민혁이는 소셜 네트워크 사이트를 하나 만들었다. 두 사람이 친구가 되면, 두 사람의 친구 네트워크에 있는 사람의 수를 출력하는 프로그램을 작성하시오. 친구 관계는 전이적이다 (A-B 친구, B-C 친구 → A-C도 같은 네트워크).</p>
                <h4>입력</h4>
                <p>첫째 줄에 테스트 케이스의 개수가 주어진다. 각 테스트 케이스의 첫째 줄에는 친구 관계의 수 F가 주어지며, 1 &le; F &le; 100,000이다. 다음 F개의 줄에는 친구 관계가 주어진다. 친구 관계는 두 사용자의 아이디로 이루어져 있으며, 알파벳 대소문자 또는 숫자로 이루어진 길이 20 이하의 문자열이다.</p>
                <h4>출력</h4>
                <p>친구 관계가 생길 때마다, 두 사람의 친구 네트워크에 몇 명이 있는지 구하는 프로그램을 작성하시오.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>2
3
Fred Barney
Barney Betty
Betty Wilma
3
Fred Barney
Betty Wilma
Barney Betty</pre></div>
                    <div><strong>출력</strong><pre>2
3
4
2
2
4</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ T</li><li>1 ≤ F ≤ 100,000</li><li>이름은 알파벳 20자 이하</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '두 사람이 친구가 될 때마다 네트워크 크기를 출력해야 하네. 일단 유니온 파인드로 친구 관계를 합치면 될 것 같아!<br><br>근데... 이름이 문자열이야. "Fred", "Barney" 같은 이름을 유니온 파인드에 어떻게 넣지? parent 배열은 숫자 인덱스인데...'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '이름을 숫자로 바꾸는 건 <span class="lang-py"><strong>딕셔너리(dict)</strong></span><span class="lang-cpp"><strong>해시맵(unordered_map)</strong></span>으로 해결할 수 있어! 새 이름이 나올 때마다 번호를 하나씩 부여하면 돼.<br><br>그런데 또 문제가 있어. union은 할 수 있는데, 합친 후 <strong>네트워크 크기</strong>를 어떻게 알지?<br>매번 같은 집합인 사람을 전부 세면 <strong>O(n)</strong>이야. F가 최대 100,000이면 너무 느려!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: 'parent 배열 외에 <strong>size 배열</strong>을 하나 더 만들자!<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.88em;"><div style="font-weight:600;text-align:center;margin-bottom:8px;">union(A, B) 시 size 갱신 과정</div><div style="display:flex;gap:20px;justify-content:center;align-items:flex-end;flex-wrap:wrap;"><div style="text-align:center;"><div style="font-size:0.8em;color:var(--text2);margin-bottom:4px;">union 전</div><div style="display:flex;gap:16px;justify-content:center;"><div><div style="padding:4px 10px;background:var(--accent);color:#fff;border-radius:6px;font-weight:600;">A</div><div style="font-size:0.78em;color:var(--text2);">size=2</div></div><div><div style="padding:4px 10px;background:var(--accent);color:#fff;border-radius:6px;font-weight:600;">B</div><div style="font-size:0.78em;color:var(--text2);">size=3</div></div></div></div><div style="font-size:1.2em;color:var(--text2);">→</div><div style="text-align:center;"><div style="font-size:0.8em;color:var(--text2);margin-bottom:4px;">union 후</div><div style="display:flex;flex-direction:column;align-items:center;gap:4px;"><div style="padding:4px 10px;background:var(--green);color:#fff;border-radius:6px;font-weight:700;">B (루트)</div><div style="font-size:0.78em;color:var(--green);font-weight:600;">size = 2 + 3 = 5</div><div style="border-left:2px solid var(--text2);height:8px;"></div><div style="padding:3px 8px;background:var(--accent);color:#fff;border-radius:4px;">A</div></div></div></div></div>• 처음에 모든 사람의 <code>size = 1</code> (자기 자신만 있으니까)<br>• union할 때 한쪽 루트를 다른 쪽에 붙이면서, <code>size[새 루트] += size[붙인 쪽]</code><br>• 크기를 항상 <strong>루트에만</strong> 저장하면, union 후 <code>size[find(a)]</code>가 바로 답!<br><br>이러면 크기를 O(1)에 바로 알 수 있어. 전체 시간복잡도는 <strong>O(F * a(F))</strong>로 거의 선형이야!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python에서는 parent와 size를 <strong>딕셔너리</strong>로 쓰면 이름 매핑과 자연스럽게 연결돼. <code>name_to_id</code> dict로 이름→번호 변환 후, <code>parent[idx] = idx</code>, <code>size[idx] = 1</code>로 초기화하면 깔끔해!</span><span class="lang-cpp">C++에서는 <code>unordered_map&lt;string, int&gt;</code>로 이름을 매핑하고, 전역 배열 <code>parent[]</code>와 <code>sz[]</code>를 사용해. 테스트 케이스마다 idx를 0으로 리셋하는 걸 잊지 마!</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a, b = find(a), find(b)
    if a != b:
        if size[a] < size[b]:
            a, b = b, a
        parent[b] = a
        size[a] += size[b]
    return size[a]

T = int(input())
for _ in range(T):
    F = int(input())
    parent = {}
    size = {}
    name_to_id = {}
    idx = 0

    for _ in range(F):
        a, b = input().split()
        if a not in name_to_id:
            name_to_id[a] = idx
            parent[idx] = idx
            size[idx] = 1
            idx += 1
        if b not in name_to_id:
            name_to_id[b] = idx
            parent[idx] = idx
            size[idx] = 1
            idx += 1
        print(union(name_to_id[a], name_to_id[b]))`,
                cpp: `#include <cstdio>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int parent[200001], sz[200001];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}

int unite(int a, int b) {
    a = find(a); b = find(b);
    if (a != b) {
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
    }
    return sz[a];
}

int main() {
    int T;
    scanf("%d", &T);
    while (T--) {
        int F;
        scanf("%d", &F);
        unordered_map<string, int> nameToId;
        int idx = 0;
        char a[21], b[21];

        for (int i = 0; i < F; i++) {
            scanf("%s %s", a, b);
            string sa(a), sb(b);
            if (nameToId.find(sa) == nameToId.end()) {
                nameToId[sa] = idx;
                parent[idx] = idx;
                sz[idx] = 1;
                idx++;
            }
            if (nameToId.find(sb) == nameToId.end()) {
                nameToId[sb] = idx;
                parent[idx] = idx;
                sz[idx] = 1;
                idx++;
            }
            printf("%d\\n", unite(nameToId[sa], nameToId[sb]));
        }
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '이름 매핑 + size 추적 Union-Find',
                    description: '이름→번호 매핑 후 union 시 size 배열을 갱신하여 네트워크 크기를 출력합니다.',
                    timeComplexity: 'O(F * α(F))',
                    spaceComplexity: 'O(F)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a, b = find(a), find(b)
    if a != b:
        if size[a] < size[b]:
            a, b = b, a
        parent[b] = a
        size[a] += size[b]
    return size[a]

T = int(input())
for _ in range(T):
    F = int(input())
    parent = {}
    size = {}
    name_to_id = {}
    idx = 0

    for _ in range(F):
        a, b = input().split()
        if a not in name_to_id:
            name_to_id[a] = idx
            parent[idx] = idx
            size[idx] = 1
            idx += 1
        if b not in name_to_id:
            name_to_id[b] = idx
            parent[idx] = idx
            size[idx] = 1
            idx += 1
        print(union(name_to_id[a], name_to_id[b]))`,
                        cpp: `#include <cstdio>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int parent[200001], sz[200001];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}

int unite(int a, int b) {
    a = find(a); b = find(b);
    if (a != b) {
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
    }
    return sz[a];
}

int main() {
    int T;
    scanf("%d", &T);
    while (T--) {
        int F;
        scanf("%d", &F);
        unordered_map<string, int> nameToId;
        int idx = 0;
        char a[21], b[21];

        for (int i = 0; i < F; i++) {
            scanf("%s %s", a, b);
            string sa(a), sb(b);
            if (nameToId.find(sa) == nameToId.end()) {
                nameToId[sa] = idx;
                parent[idx] = idx;
                sz[idx] = 1;
                idx++;
            }
            if (nameToId.find(sb) == nameToId.end()) {
                nameToId[sb] = idx;
                parent[idx] = idx;
                sz[idx] = 1;
                idx++;
            }
            printf("%d\\n", unite(nameToId[sa], nameToId[sb]));
        }
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'find/union with size',
                                desc: 'rank 대신 size 배열을 써서 합칠 때 집합 크기를 바로 추적합니다.',
                                code: `def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a, b = find(a), find(b)
    if a != b:
        if size[a] < size[b]: a, b = b, a
        parent[b] = a
        size[a] += size[b]
    return size[a]`
                            },
                            {
                                title: '이름→번호 매핑',
                                desc: '문자열 이름을 dict로 정수에 매핑합니다. 새 이름이 나올 때마다 번호를 부여하고 parent/size를 초기화합니다.',
                                code: `name_to_id = {}
idx = 0
for name in [a, b]:
    if name not in name_to_id:
        name_to_id[name] = idx
        parent[idx] = idx
        size[idx] = 1
        idx += 1`
                            },
                            {
                                title: 'union 후 크기 출력',
                                desc: 'union이 루트의 size를 반환하므로 바로 출력하면 됩니다.',
                                code: 'print(union(name_to_id[a], name_to_id[b]))'
                            }
                        ],
                        cpp: [
                            {
                                title: 'find/unite with size',
                                desc: `size 배열로 집합 크기 추적.
unite 후 루트의 size를 반환.`,
                                code: `int parent[200001], sz[200001];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}

int unite(int a, int b) {
    a = find(a); b = find(b);
    if (a != b) {
        if (sz[a] < sz[b]) swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
    }
    return sz[a];  // 합쳐진 집합 크기
}`
                            },
                            {
                                title: '이름→번호 매핑',
                                desc: `unordered_map<string,int>으로 매핑.
새 이름 등장 시 번호 부여 + 초기화.`,
                                code: `unordered_map<string, int> nameToId;
int idx = 0;
// 각 이름에 대해:
if (nameToId.find(name) == nameToId.end()) {
    nameToId[name] = idx;
    parent[idx] = idx;
    sz[idx] = 1;
    idx++;
}`
                            },
                            {
                                title: 'unite 후 크기 출력',
                                desc: 'unite가 합쳐진 집합의 sz를 반환하므로 바로 printf로 출력합니다.',
                                code: 'printf("%d\\n", unite(nameToId[a], nameToId[b]));'
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
