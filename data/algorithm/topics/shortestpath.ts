import type { AlgoTopic } from '../types'

export const shortestPathTopic: AlgoTopic = {
    id: 'shortestpath',
    title: '최단 경로',
    icon: '🛤️',
    category: '심화 (Gold~Platinum)',
    order: 19,
    description: '가중치 그래프에서 최소 비용 경로를 찾는 알고리즘',
    titleEn: 'Shortest Path',
    categoryEn: 'Advanced Algorithms (Gold~Platinum)',
    descriptionEn: 'Algorithms for finding minimum-cost paths in weighted graphs',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: 'BFS 최단거리',
            titleEn: 'BFS Shortest Distance',
            problemIds: [
                'boj-18352'
            ],
            desc: '가중치 없는 그래프에서 BFS로 최단 거리를 구합니다 (Silver II)',
            descEn: 'Finding shortest distance with BFS in unweighted graphs (Silver II)'
        },
        {
            num: 2,
            title: '다익스트라',
            titleEn: 'Dijkstra',
            problemIds: [
                'boj-1753',
                'boj-1916',
                'lc-743'
            ],
            desc: '다익스트라 기본 구현과 응용 (Gold IV~V ~ Medium)',
            descEn: 'Dijkstra basic implementation and applications (Gold IV~V ~ Medium)'
        },
        {
            num: 3,
            title: '플로이드-워셜',
            titleEn: 'Floyd-Warshall',
            problemIds: [
                'boj-11404'
            ],
            desc: '모든 쌍 최단 경로 (Gold IV)',
            descEn: 'All-pairs shortest path (Gold IV)'
        }
    ],
    problems: [
        {
            id: 'boj-18352',
            title: 'BOJ 18352 - 특정 거리의 도시 찾기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/18352',
            simIntro: 'BFS로 시작 도시에서 각 도시까지의 최단 거리를 구하고, 거리가 K인 도시를 찾는 과정을 관찰하세요.',
            sim: {
                type: 'cityDist'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>어떤 나라에는 1번부터 N번까지의 도시와 M개의 단방향 도로가 있다. 모든 도로의 거리는 1이다.</p>
                <p>이 때 특정한 도시 X로부터 출발하여 도달할 수 있는 모든 도시 중에서, 최단 거리가 정확히 K인 모든 도시들의 번호를 출력하는 프로그램을 작성하시오. 또한 출발 도시 X에서 출발 도시 X로의 최단 거리는 항상 0이라고 가정한다.</p>
                <p>예를 들어 N=4, K=2, X=1일 때 다음과 같이 그래프가 구성되어 있다고 가정하자.</p>
                <p>이 때 1번 도시에서 출발하여 도달할 수 있는 도시 중에서, 최단 거리가 2인 도시는 4번 도시뿐이다. 2번과 3번 도시의 경우, 최단 거리가 1이기 때문에 출력하지 않는다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 도시의 개수 N, 도로의 개수 M, 거리 정보 K, 출발 도시의 번호 X가 주어진다. (2 ≤ N ≤ 300,000, 1 ≤ M ≤ 1,000,000, 1 ≤ K ≤ 300,000, 1 ≤ X ≤ N) 둘째 줄부터 M개의 줄에 걸쳐서 두 개의 자연수 A, B가 주어지며, A번 도시에서 B번 도시로 이동하는 단방향 도로가 존재한다는 의미이다. 단, A와 B는 서로 다른 자연수이다.</p>
                <h4>출력</h4>
                <p>X로부터 출발하여 도달할 수 있는 도시 중에서, 최단 거리가 정확히 K인 모든 도시의 번호를 한 줄에 하나씩 오름차순으로 출력한다.</p>
                <p>이 때 도달할 수 있는 도시 중에서, 최단 거리가 정확히 K인 도시가 하나도 없으면 -1을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 4 2 1
1 2
1 3
2 3
2 4</pre></div>
                    <div><strong>출력</strong><pre>4</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 3 2 1
1 2
1 3
1 4</pre></div>
                    <div><strong>출력</strong><pre>-1</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>2 ≤ N ≤ 300,000</li>
                    <li>1 ≤ M ≤ 1,000,000</li>
                    <li>1 ≤ K ≤ 300,000</li>
                    <li>1 ≤ X ≤ N</li>
                    <li>모든 도로의 거리는 1</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '시작 도시 X에서 다른 모든 도시까지의 <strong>최단 거리</strong>를 구해야 해요.<br>일단 가장 먼저 떠오르는 건, X에서 출발해서 <strong>모든 경로를 탐색</strong>하는 거예요.<br>DFS로 모든 경로를 시도하고, 각 도시에 도착하는 최소 거리를 기록하면 되지 않을까요?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'DFS로 모든 경로를 탐색하면, <strong>같은 도시를 여러 번</strong> 방문할 수 있어요.<br>N이 최대 300,000이고 M이 1,000,000이면 시간이 엄청 오래 걸려요!<br><br>핵심 관찰: 이 문제의 모든 도로 거리는 <strong>1</strong>이에요.<br>거리가 모두 같다면, <strong>먼저 도착한 게 곧 최단 거리</strong>예요. 이런 상황에서 딱 맞는 알고리즘이 있는데...'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>BFS(너비 우선 탐색)</strong>가 정답이에요!<br><br>BFS는 시작점에서 <strong>가까운 순서대로</strong> 탐색하기 때문에, 모든 간선 가중치가 1일 때 최단거리를 보장해요.<br>① dist 배열을 -1(미방문)로 초기화, dist[X] = 0<br>② 큐에 X를 넣고 BFS 시작<br>③ 큐에서 도시를 꺼내서, 아직 방문하지 않은 이웃 도시의 거리를 현재+1로 설정<br>④ BFS 끝나면, dist가 K인 도시를 오름차순으로 출력<br><br>시간 복잡도: O(N + M) — 각 도시와 도로를 한 번씩만 확인!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python에선 <code>collections.deque</code>를 BFS 큐로 사용해요.<br><code>deque</code>는 양쪽 끝에서 O(1)으로 넣고 뺄 수 있어서 BFS에 딱이에요.<br>리스트의 <code>pop(0)</code>은 O(N)이라 느리니까, 반드시 <code>deque</code>를 쓰세요!<br>입력이 많으니 <code>sys.stdin.readline</code>도 필수에요.</span><span class="lang-cpp">C++에선 <code>queue&lt;int&gt;</code>를 BFS 큐로 사용해요.<br><code>queue</code>는 FIFO 방식으로 <code>push()</code>와 <code>front()</code>+<code>pop()</code>으로 동작해요.<br>N이 최대 300,000이므로 <code>scanf/printf</code>로 빠른 입출력을 하는 게 안전해요!</span>'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

N, M, K, X = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)

dist = [-1] * (N + 1)
dist[X] = 0
q = deque([X])

while q:
    v = q.popleft()
    for u in graph[v]:
        if dist[u] == -1:
            dist[u] = dist[v] + 1
            q.append(u)

result = [i for i in range(1, N + 1) if dist[i] == K]
if result:
    for city in result:
        print(city)
else:
    print(-1)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int N, M, K, X;
    scanf("%d %d %d %d", &N, &M, &K, &X);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
    }

    vector<int> dist(N + 1, -1);
    dist[X] = 0;
    queue<int> q;
    q.push(X);

    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (dist[u] == -1) {
                dist[u] = dist[v] + 1;
                q.push(u);
            }
        }
    }

    bool found = false;
    for (int i = 1; i <= N; i++) {
        if (dist[i] == K) {
            printf("%d\\n", i);
            found = true;
        }
    }
    if (!found) printf("-1\\n");
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'BFS 최단거리',
                    description: '모든 간선의 가중치가 1이므로 BFS로 최단 거리를 구한 뒤, 거리가 K인 도시를 출력합니다.',
                    timeComplexity: 'O(N + M)',
                    spaceComplexity: 'O(N + M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

N, M, K, X = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)

dist = [-1] * (N + 1)
dist[X] = 0
q = deque([X])

while q:
    v = q.popleft()
    for u in graph[v]:
        if dist[u] == -1:
            dist[u] = dist[v] + 1
            q.append(u)

result = [i for i in range(1, N + 1) if dist[i] == K]
if result:
    for city in result:
        print(city)
else:
    print(-1)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int N, M, K, X;
    scanf("%d %d %d %d", &N, &M, &K, &X);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
    }

    vector<int> dist(N + 1, -1);
    dist[X] = 0;
    queue<int> q;
    q.push(X);

    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (dist[u] == -1) {
                dist[u] = dist[v] + 1;
                q.push(u);
            }
        }
    }

    bool found = false;
    for (int i = 1; i <= N; i++) {
        if (dist[i] == K) {
            printf("%d\\n", i);
            found = true;
        }
    }
    if (!found) printf("-1\\n");
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: `인접 리스트로 단방향 그래프를 저장합니다.
sys.stdin.readline으로 빠른 입력을 받아야 N, M이 클 때 시간 초과를 피할 수 있습니다.`,
                                code: `import sys
from collections import deque
input = sys.stdin.readline

N, M, K, X = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)`
                            },
                            {
                                title: 'BFS로 최단 거리 계산',
                                desc: `모든 간선 가중치가 1이므로 BFS가 곧 최단 거리입니다.
dist[v]가 -1이면 미방문 → 현재 거리+1로 갱신하고 큐에 추가합니다.
deque의 popleft()는 O(1)이라 list의 pop(0)보다 훨씬 빠릅니다.`,
                                code: `dist = [-1] * (N + 1)  # -1 = 미방문
dist[X] = 0             # 시작점은 거리 0
q = deque([X])

while q:
    v = q.popleft()     # 큐에서 가장 앞의 도시를 꺼냄
    for u in graph[v]:  # 이웃 도시 확인
        if dist[u] == -1:        # 아직 방문하지 않았다면
            dist[u] = dist[v] + 1  # 거리 = 현재 + 1
            q.append(u)            # 큐에 추가`
                            },
                            {
                                title: '결과 출력',
                                desc: `dist가 정확히 K인 도시를 오름차순으로 출력합니다.
1번부터 N번까지 순서대로 확인하면 자연스럽게 오름차순이 됩니다.
해당 도시가 없으면 -1을 출력합니다.`,
                                code: `result = [i for i in range(1, N + 1) if dist[i] == K]
if result:
    for city in result:
        print(city)
else:
    print(-1)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: `vector<vector<int>>로 단방향 인접 리스트를 구성합니다.
N이 최대 300,000이므로 scanf로 빠른 입력을 받습니다.`,
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int N, M, K, X;
    scanf("%d %d %d %d", &N, &M, &K, &X);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
    }`
                            },
                            {
                                title: 'BFS로 최단 거리 계산',
                                desc: `queue<int>로 BFS를 수행합니다.
dist를 -1로 초기화하여 방문 여부와 거리를 동시에 관리합니다.
방문하지 않은 이웃만 큐에 추가하므로 각 도시는 한 번만 처리됩니다.`,
                                code: `    vector<int> dist(N + 1, -1); // -1 = 미방문
    dist[X] = 0;                  // 시작점 거리 0
    queue<int> q;
    q.push(X);

    while (!q.empty()) {
        int v = q.front(); q.pop(); // 큐에서 꺼냄
        for (int u : graph[v]) {    // 이웃 확인
            if (dist[u] == -1) {    // 미방문이면
                dist[u] = dist[v] + 1; // 거리 갱신
                q.push(u);             // 큐에 추가
            }
        }
    }`
                            },
                            {
                                title: '결과 출력',
                                desc: `1번부터 N번까지 순회하며 dist가 K인 도시를 출력합니다.
순서대로 확인하므로 자동으로 오름차순이 보장됩니다.`,
                                code: `    bool found = false;
    for (int i = 1; i <= N; i++) {
        if (dist[i] == K) {
            printf("%d\\n", i);
            found = true;
        }
    }
    if (!found) printf("-1\\n");
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1753',
            title: 'BOJ 1753 - 최단경로',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/1753',
            simIntro: '다익스트라가 정점을 하나씩 처리하며 최단 거리를 확정하는 과정을 관찰하세요.',
            sim: {
                type: 'dijkstra'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>방향그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오. 단, 모든 간선의 가중치는 10 이하의 자연수이다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 정점의 개수 V와 간선의 개수 E가 주어진다. (1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000) 모든 정점에는 1부터 V까지 번호가 매겨져 있다고 가정한다. 둘째 줄에는 시작 정점의 번호 K(1 ≤ K ≤ V)가 주어진다. 셋째 줄부터 E개의 줄에 걸쳐 각 간선을 나타내는 세 개의 정수 (u, v, w)가 순서대로 주어진다. 이는 u에서 v로 가는 가중치 w인 간선이 존재한다는 뜻이다. u와 v는 서로 다르며 w는 10 이하의 자연수이다. 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.</p>
                <h4>출력</h4>
                <p>첫째 줄부터 V개의 줄에 걸쳐, i번째 줄에 i번 정점으로의 최단 경로의 경로값을 출력한다. 시작점 자신은 0으로 출력하고, 경로가 존재하지 않는 경우에는 INF를 출력하면 된다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 6
1
5 1 1
1 2 2
1 3 3
2 3 4
2 4 5
3 4 6</pre></div>
                    <div><strong>출력</strong><pre>0
2
3
7
INF</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ V ≤ 20,000</li>
                    <li>1 ≤ E ≤ 300,000</li>
                    <li>간선 가중치 ≤ 10</li>
                    <li>서로 다른 두 정점 사이에 여러 간선이 존재할 수 있다</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '시작점에서 다른 모든 정점까지 최단 경로를 구해야 해요.<br>일단 떠오르는 건 <strong>BFS</strong>처럼 시작점에서 출발해서 이웃을 하나씩 방문하는 거예요.<br>근데 이 문제는 간선마다 <strong>가중치(비용)</strong>가 달라요. 가중치 없는 BFS는 "한 칸 = 1"이지만, 여기선 간선마다 비용이 다르니까 단순 BFS로는 안 돼요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '가중치가 있는 그래프에서 그냥 BFS를 쓰면, <strong>먼저 도착한 게 최단이 아닐 수 있어요!</strong><br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.88em;text-align:center;"><div style="font-weight:600;margin-bottom:10px;">BFS가 실패하는 예시</div><div style="position:relative;display:inline-block;"><div style="display:flex;gap:60px;align-items:center;"><div style="width:36px;height:36px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">A</div><div style="display:flex;flex-direction:column;gap:24px;"><div style="width:36px;height:36px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">B</div><div style="width:36px;height:36px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">C</div></div></div></div><div style="margin-top:8px;display:flex;gap:16px;justify-content:center;flex-wrap:wrap;"><span style="padding:3px 10px;background:var(--red);color:#fff;border-radius:4px;">A→B 직행: 비용 10</span><span style="padding:3px 10px;background:var(--green);color:#fff;border-radius:4px;">A→C→B 경유: 2+3 = 5</span></div><div style="margin-top:6px;color:var(--text2);font-size:0.85em;">BFS는 직행(10)을 먼저 찾지만, 실제 최단은 경유(5)!</div></div>그러면 "가장 가까운 정점부터 처리"하는 방법이 필요한데... 이게 바로 <strong>다익스트라 알고리즘</strong>이에요!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>다익스트라</strong>의 핵심: 아직 확정 안 된 정점 중 <strong>거리가 가장 짧은 것</strong>부터 꺼내서 처리해요.<br>① dist 배열을 INF로 초기화하고, 시작점만 0으로 설정<br>② <strong>최소 힙</strong>에 (0, 시작점)을 넣어요<br>③ 힙에서 꺼낸 (거리, 정점)이 이미 확정된 거리보다 크면 → 무시!<br>④ 이웃 정점의 거리를 갱신할 수 있으면 갱신하고 힙에 추가<br>이렇게 하면 O((V+E) log V)로 모든 정점까지의 최단 거리를 구할 수 있어요!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python에선 <code>heapq</code> 모듈로 최소 힙을 쓸 수 있어요.<br><code>heapq.heappush(heap, (거리, 정점))</code>으로 넣고, <code>heapq.heappop(heap)</code>으로 가장 가까운 걸 꺼내요.<br>힙이 알아서 거리순 정렬을 유지해주니까, 우리는 그냥 넣고 빼기만 하면 돼요!</span><span class="lang-cpp">C++에선 <code>priority_queue</code>에 <code>greater&lt;pair&lt;int,int&gt;&gt;</code>를 넣어 최소 힙을 만들어요.<br><code>pq.push({거리, 정점})</code>으로 넣고, <code>pq.top()</code> + <code>pq.pop()</code>으로 가장 가까운 걸 꺼내요.<br>C++ priority_queue는 기본이 최대 힙이라 <code>greater</code>를 꼭 써야 최소 힙이 돼요!</span>'
                }
            ],
            templates: {
                python: `import sys
import heapq
input = sys.stdin.readline
INF = float('inf')

V, E = map(int, input().split())
K = int(input())
graph = [[] for _ in range(V + 1)]
for _ in range(E):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))

dist = [INF] * (V + 1)
dist[K] = 0
heap = [(0, K)]

while heap:
    d, v = heapq.heappop(heap)
    if d > dist[v]:
        continue
    for u, w in graph[v]:
        nd = d + w
        if nd < dist[u]:
            dist[u] = nd
            heapq.heappush(heap, (nd, u))

for i in range(1, V + 1):
    print(dist[i] if dist[i] != INF else "INF")`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;
typedef pair<int,int> pii;
const int INF = 1e9;

int main() {
    int V, E, K;
    scanf("%d %d %d", &V, &E, &K);
    vector<vector<pii>> graph(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        graph[u].push_back({v, w});
    }

    vector<int> dist(V + 1, INF);
    dist[K] = 0;
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, K});

    while (!pq.empty()) {
        auto [d, v] = pq.top(); pq.pop();
        if (d > dist[v]) continue;
        for (auto [u, w] : graph[v]) {
            int nd = d + w;
            if (nd < dist[u]) {
                dist[u] = nd;
                pq.push({nd, u});
            }
        }
    }

    for (int i = 1; i <= V; i++) {
        if (dist[i] == INF) puts("INF");
        else printf("%d\\n", dist[i]);
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '다익스트라 (최소 힙)',
                    description: '시작점에서 heapq를 이용하여 모든 정점까지의 최단 거리를 구합니다.',
                    timeComplexity: 'O((V+E) log V)',
                    spaceComplexity: 'O(V+E)',
                    templates: {
                        python: `import sys
import heapq
input = sys.stdin.readline
INF = float('inf')

V, E = map(int, input().split())
K = int(input())
graph = [[] for _ in range(V + 1)]
for _ in range(E):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))

dist = [INF] * (V + 1)
dist[K] = 0
heap = [(0, K)]

while heap:
    d, v = heapq.heappop(heap)
    if d > dist[v]:
        continue
    for u, w in graph[v]:
        nd = d + w
        if nd < dist[u]:
            dist[u] = nd
            heapq.heappush(heap, (nd, u))

for i in range(1, V + 1):
    print(dist[i] if dist[i] != INF else "INF")`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;
typedef pair<int,int> pii;
const int INF = 1e9;

int main() {
    int V, E, K;
    scanf("%d %d %d", &V, &E, &K);
    vector<vector<pii>> graph(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        graph[u].push_back({v, w});
    }

    vector<int> dist(V + 1, INF);
    dist[K] = 0;
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, K});

    while (!pq.empty()) {
        auto [d, v] = pq.top(); pq.pop();
        if (d > dist[v]) continue;
        for (auto [u, w] : graph[v]) {
            int nd = d + w;
            if (nd < dist[u]) {
                dist[u] = nd;
                pq.push({nd, u});
            }
        }
    }

    for (int i = 1; i <= V; i++) {
        if (dist[i] == INF) puts("INF");
        else printf("%d\\n", dist[i]);
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: `인접 리스트로 방향 가중 그래프를 저장합니다.
각 간선을 (도착정점, 가중치) 튜플로 추가합니다.`,
                                code: `import sys
import heapq
input = sys.stdin.readline
INF = float('inf')

V, E = map(int, input().split())
K = int(input())
graph = [[] for _ in range(V + 1)]
for _ in range(E):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))`
                            },
                            {
                                title: '다익스트라 초기화',
                                desc: `시작점 거리를 0으로 설정하고 최소 힙에 넣습니다.
나머지는 INF로 초기화하여 "아직 모름" 상태를 표현합니다.`,
                                code: `dist = [INF] * (V + 1)
dist[K] = 0
heap = [(0, K)]`
                            },
                            {
                                title: '다익스트라 실행',
                                desc: `힙에서 가장 가까운 정점을 꺼내 인접 정점을 완화합니다.
d > dist[v]이면 이미 더 짧은 경로를 찾았으므로 스킵합니다.`,
                                code: `while heap:
    d, v = heapq.heappop(heap)
    if d > dist[v]:
        continue
    for u, w in graph[v]:
        nd = d + w
        if nd < dist[u]:
            dist[u] = nd
            heapq.heappush(heap, (nd, u))`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: `pair<int,int>로 (정점, 가중치) 저장.
typedef로 pii 축약.`,
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;
typedef pair<int,int> pii;
const int INF = 1e9;

int main() {
    int V, E, K;
    scanf("%d %d %d", &V, &E, &K);
    vector<vector<pii>> graph(V + 1);
    for (int i = 0; i < E; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        graph[u].push_back({v, w});
    }`
                            },
                            {
                                title: '다익스트라 초기화',
                                desc: 'greater<pii> → 최소 힙 (거리 기준).',
                                code: `    vector<int> dist(V + 1, INF);
    dist[K] = 0;
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, K});`
                            },
                            {
                                title: '다익스트라 실행',
                                desc: `최소 힙에서 거리가 가장 짧은 정점부터 처리합니다.
auto [d, v]로 구조적 바인딩하여 거리와 정점을 분리합니다.`,
                                code: `    while (!pq.empty()) {
        auto [d, v] = pq.top(); pq.pop();
        if (d > dist[v]) continue;  // 이미 더 짧은 경로 발견됨
        for (auto [u, w] : graph[v]) {
            int nd = d + w;
            if (nd < dist[u]) {
                dist[u] = nd;
                pq.push({nd, u});
            }
        }
    }`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1916',
            title: 'BOJ 1916 - 최소비용 구하기',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/1916',
            simIntro: '다익스트라로 출발점에서 도착점까지의 최소 비용을 구하는 과정을 관찰하세요.',
            sim: {
                type: 'minCost'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 M개의 버스가 있다. 우리는 A번째 도시에서 B번째 도시까지 가는데 드는 버스 비용을 최소화 시키려고 한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 도시의 개수 N(1 ≤ N ≤ 1,000)이 주어진다. 둘째 줄에는 버스의 개수 M(1 ≤ M ≤ 100,000)이 주어진다. 셋째 줄부터 M+2줄까지 다음과 같은 버스의 정보가 주어진다. 먼저 처음에는 그 버스의 출발 도시의 번호가 주어진다. 그리고 그 다음에는 도착지의 도시 번호가 주어지고 또 그 버스 비용이 주어진다. 버스 비용은 0보다 크거나 같고, 100,000보다 작은 정수이다. 그리고 M+3째 줄에는 우리가 구하고자 하는 구간 출발점의 도시번호와 도착점의 도시번호가 주어진다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 출발 도시에서 도착 도시까지 가는데 드는 최소 비용을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5
8
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
1 5</pre></div>
                    <div><strong>출력</strong><pre>4</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 1,000</li>
                    <li>1 ≤ M ≤ 100,000</li>
                    <li>0 ≤ 비용 ≤ 100,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'A 도시에서 B 도시까지 가는 <strong>최소 비용</strong>을 구해야 해요.<br>일단 가장 단순하게, A에서 B까지 가능한 <strong>모든 경로</strong>를 탐색해서 비용을 비교하면 어떨까요?<br>DFS로 A에서 출발해서 B에 도착하는 모든 경로의 비용을 구하고, 그 중 최솟값을 찾는 거예요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '모든 경로를 탐색하면 경로 수가 <strong>지수적으로</strong> 늘어나요!<br>도시가 1,000개이고 버스가 100,000개면, 가능한 경로가 어마어마하게 많아서 시간 초과가 나요.<br>이전 문제(1753번)에서 배운 <strong>다익스트라</strong>를 쓰면 훨씬 빠르게 해결할 수 있어요!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '1753번과 거의 같은 구조예요! <strong>다익스트라</strong>로 출발 도시 A에서 모든 도시까지의 최단 거리를 구해요.<br>다른 점은 딱 하나: 마지막에 <strong>모든 정점의 거리</strong>를 출력하는 대신, <strong>도착 도시 B의 거리만</strong> 출력하면 끝!<br><br>⚠️ 주의: 같은 출발-도착에 <strong>여러 버스</strong>가 있을 수 있어요.<br>하지만 인접 리스트에 모두 추가하면 다익스트라가 알아서 최솟값을 찾아줘요!'
                },
                {
                    title: '1753번과 비교하면?',
                    content: '이 문제는 1753번의 <strong>변형</strong>이에요. 핵심 차이를 정리하면:<br><br><table style="border-collapse:collapse;width:100%;font-size:0.9em;"><tr style="background:var(--bg2);"><th style="padding:6px 10px;border:1px solid var(--bg3);">구분</th><th style="padding:6px 10px;border:1px solid var(--bg3);">1753번</th><th style="padding:6px 10px;border:1px solid var(--bg3);">1916번</th></tr><tr><td style="padding:6px 10px;border:1px solid var(--bg3);">출력</td><td style="padding:6px 10px;border:1px solid var(--bg3);">모든 정점의 dist</td><td style="padding:6px 10px;border:1px solid var(--bg3);">도착 도시 dist[E]만</td></tr><tr><td style="padding:6px 10px;border:1px solid var(--bg3);">입력 순서</td><td style="padding:6px 10px;border:1px solid var(--bg3);">V, E → 시작점</td><td style="padding:6px 10px;border:1px solid var(--bg3);">N → M → 간선들 → 출발, 도착</td></tr></table><br>다익스트라 코드 자체는 <strong>완전히 동일</strong>하고, 입출력만 다른 거예요!'
                }
            ],
            templates: {
                python: `import sys
import heapq
input = sys.stdin.readline
INF = float('inf')

N = int(input())
M = int(input())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))

S, E = map(int, input().split())

dist = [INF] * (N + 1)
dist[S] = 0
heap = [(0, S)]

while heap:
    d, v = heapq.heappop(heap)
    if d > dist[v]:
        continue
    for u, w in graph[v]:
        nd = d + w
        if nd < dist[u]:
            dist[u] = nd
            heapq.heappush(heap, (nd, u))

print(dist[E])`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;
typedef pair<int,int> pii;
const int INF = 1e9;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<pii>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        graph[u].push_back({v, w});
    }
    int S, E;
    scanf("%d %d", &S, &E);

    vector<int> dist(N + 1, INF);
    dist[S] = 0;
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, S});

    while (!pq.empty()) {
        auto [d, v] = pq.top(); pq.pop();
        if (d > dist[v]) continue;
        for (auto [u, w] : graph[v]) {
            int nd = d + w;
            if (nd < dist[u]) {
                dist[u] = nd;
                pq.push({nd, u});
            }
        }
    }

    printf("%d\\n", dist[E]);
    return 0;
}`
            },
            solutions: [
                {
                    approach: '다익스트라 (특정 도착점)',
                    description: '다익스트라를 돌린 뒤 도착 도시의 dist 값만 출력합니다.',
                    timeComplexity: 'O((N+M) log N)',
                    spaceComplexity: 'O(N+M)',
                    templates: {
                        python: `class Solution:
    def networkDelayTime(self, times, n, k):
        import heapq
        INF = float('inf')
        graph = [[] for _ in range(n + 1)]
        for u, v, w in times:
            graph[u].append((v, w))

        dist = [INF] * (n + 1)
        dist[k] = 0
        heap = [(0, k)]

        while heap:
            d, v = heapq.heappop(heap)
            if d > dist[v]:
                continue
            for u, w in graph[v]:
                nd = d + w
                if nd < dist[u]:
                    dist[u] = nd
                    heapq.heappush(heap, (nd, u))

        ans = max(dist[1:n+1])
        return ans if ans != INF else -1`,
                        cpp: `class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        const int INF = 1e9;
        vector<vector<pair<int,int>>> graph(n + 1);
        for (auto& t : times) {
            graph[t[0]].push_back({t[1], t[2]});
        }

        vector<int> dist(n + 1, INF);
        dist[k] = 0;
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        pq.push({0, k});

        while (!pq.empty()) {
            auto [d, v] = pq.top(); pq.pop();
            if (d > dist[v]) continue;
            for (auto [u, w] : graph[v]) {
                int nd = d + w;
                if (nd < dist[u]) {
                    dist[u] = nd;
                    pq.push({nd, u});
                }
            }
        }

        int ans = *max_element(dist.begin() + 1, dist.end());
        return ans == INF ? -1 : ans;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: `도시와 버스 정보를 인접 리스트로 저장합니다.
같은 경로에 여러 버스가 있어도 모두 추가합니다.`,
                                code: `import sys
import heapq
input = sys.stdin.readline
INF = float('inf')

N = int(input())
M = int(input())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))`
                            },
                            {
                                title: '출발/도착 입력 및 초기화',
                                desc: `출발 도시 S에서 시작하여 도착 도시 E까지의 최소 비용을 구합니다.
시작점만 0, 나머지는 INF로 초기화합니다.`,
                                code: `S, E = map(int, input().split())

dist = [INF] * (N + 1)
dist[S] = 0
heap = [(0, S)]`
                            },
                            {
                                title: '다익스트라 + 출력',
                                desc: `1753번과 동일한 다익스트라를 실행한 뒤,
도착 도시의 최단 거리 dist[E]만 출력합니다.`,
                                code: `while heap:
    d, v = heapq.heappop(heap)
    if d > dist[v]:
        continue
    for u, w in graph[v]:
        nd = d + w
        if nd < dist[u]:
            dist[u] = nd
            heapq.heappush(heap, (nd, u))

print(dist[E])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: `pair<int,int>로 (도착정점, 비용)을 저장하는 인접 리스트를 구성합니다.
typedef pii로 타입을 축약하여 코드를 간결하게 합니다.`,
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;
typedef pair<int,int> pii;
const int INF = 1e9;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<pii>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        graph[u].push_back({v, w});
    }`
                            },
                            {
                                title: '출발/도착 입력 및 초기화',
                                desc: `greater<pii>로 최소 힙을 만들어 거리가 짧은 것부터 꺼냅니다.
출발 도시 S의 거리를 0으로 설정하고 힙에 삽입합니다.`,
                                code: `    int S, E;
    scanf("%d %d", &S, &E);
    vector<int> dist(N + 1, INF);
    dist[S] = 0;
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, S});`
                            },
                            {
                                title: '다익스트라 + 출력',
                                desc: `다익스트라를 실행한 뒤 도착 도시 E의 최단 거리만 출력합니다.
구조는 1753번과 동일하고, 출력만 다릅니다.`,
                                code: `    while (!pq.empty()) {
        auto [d, v] = pq.top(); pq.pop();
        if (d > dist[v]) continue;
        for (auto [u, w] : graph[v]) {
            int nd = d + w;
            if (nd < dist[u]) {
                dist[u] = nd;
                pq.push({nd, u});
            }
        }
    }
    printf("%d\\n", dist[E]);
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-743',
            title: 'LeetCode 743 - Network Delay Time',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/network-delay-time/',
            simIntro: '다익스트라 결과에서 max(dist)를 구해 답을 도출하는 과정을 관찰하세요.',
            sim: {
                type: 'delay'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>n개의 노드로 이루어진 네트워크가 있고, 1부터 n까지 번호가 매겨져 있습니다. times[i] = (u<sub>i</sub>, v<sub>i</sub>, w<sub>i</sub>)는 소스 노드 u<sub>i</sub>에서 타겟 노드 v<sub>i</sub>로 신호가 이동하는 데 w<sub>i</sub>의 시간이 걸린다는 것을 의미합니다.</p>
                <p>노드 k에서 신호를 보내면, 모든 n개의 노드가 신호를 받는 데 걸리는 최소 시간을 반환하세요. 모든 노드가 신호를 받을 수 없으면 -1을 반환하세요.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2</pre></div>
                    <div><strong>출력</strong><pre>2</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>times = [[1,2,1]], n = 2, k = 1</pre></div>
                    <div><strong>출력</strong><pre>1</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>times = [[1,2,1]], n = 2, k = 2</pre></div>
                    <div><strong>출력</strong><pre>-1</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ k ≤ n ≤ 100</li>
                    <li>1 ≤ times.length ≤ 6,000</li>
                    <li>times[i].length == 3</li>
                    <li>1 ≤ u<sub>i</sub>, v<sub>i</sub> ≤ n</li>
                    <li>u<sub>i</sub> ≠ v<sub>i</sub></li>
                    <li>0 ≤ w<sub>i</sub> ≤ 100</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '노드 k에서 신호를 보내면 <strong>모든 노드가 신호를 받는 데 걸리는 시간</strong>을 구해야 해요.<br>일단 가장 직관적인 방법: k에서 모든 노드까지 가능한 경로를 전부 탐색(DFS/BFS)해서, 각 노드에 도달하는 최소 시간을 구하는 거예요.<br>그리고 그 중 가장 큰 값이 "모든 노드가 신호를 받는 시간"이에요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '모든 경로를 탐색하면 중복 방문이 많아져서 느려요!<br>간선이 최대 6,000개이고 가중치가 있으니까, 단순 BFS로도 최단 시간을 보장할 수 없어요.<br>가중치가 있는 그래프에서 한 점 → 모든 점 최단 경로... 이건 <strong>다익스트라</strong>가 딱이에요!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>다익스트라</strong>로 k에서 모든 노드까지의 최단 시간을 구해요. 여기까진 1753번과 같아요!<br><br>그런데 이 문제는 한 가지가 더 있어요: <strong>"모든 노드가 신호를 받는 시간"</strong>이 정답이에요.<br>신호는 동시에 퍼져나가니까, 가장 <strong>늦게 도착하는 노드의 시간 = 전체 시간</strong>이에요.<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.88em;"><div style="font-weight:600;text-align:center;margin-bottom:8px;">다익스트라 후 dist 배열</div><div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;"><div style="text-align:center;"><div style="padding:6px 12px;background:var(--accent);color:#fff;border-radius:6px;">0</div><div style="font-size:0.78em;color:var(--text2);margin-top:2px;">노드1(k)</div></div><div style="text-align:center;"><div style="padding:6px 12px;background:var(--accent);color:#fff;border-radius:6px;">1</div><div style="font-size:0.78em;color:var(--text2);margin-top:2px;">노드2</div></div><div style="text-align:center;"><div style="padding:6px 12px;background:var(--accent);color:#fff;border-radius:6px;">1</div><div style="font-size:0.78em;color:var(--text2);margin-top:2px;">노드3</div></div><div style="text-align:center;"><div style="padding:6px 12px;background:var(--green);color:#fff;border-radius:6px;font-weight:700;box-shadow:0 0 8px var(--green);">2</div><div style="font-size:0.78em;color:var(--text2);margin-top:2px;">노드4</div></div></div><div style="text-align:center;margin-top:8px;color:var(--green);font-weight:600;">max(dist) = 2 → 정답!</div></div>→ dist 배열에서 <strong>최댓값</strong>을 구하면 끝!<br><br>⚠️ 한 가지 더: 도달 불가능한 노드가 있으면(dist가 INF) <strong>-1</strong>을 반환해야 해요.'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">다익스트라 후 <code>max(dist[1:n+1])</code>로 최댓값을 구해요.<br>이 값이 <code>float(\'inf\')</code>이면 도달 불가능한 노드가 있다는 뜻이니까 -1을 반환해요.<br><code>return ans if ans != INF else -1</code> 한 줄로 깔끔하게 처리!</span><span class="lang-cpp">다익스트라 후 <code>*max_element(dist.begin()+1, dist.end())</code>로 최댓값을 구해요.<br>이 값이 INF(1e9)이면 도달 불가능한 노드가 있으므로 -1을 반환해요.<br><code>return ans == INF ? -1 : ans;</code> 삼항 연산자로 간결하게 처리!</span>'
                }
            ],
            templates: {
                python: `class Solution:
    def networkDelayTime(self, times, n, k):
        import heapq
        INF = float('inf')
        graph = [[] for _ in range(n + 1)]
        for u, v, w in times:
            graph[u].append((v, w))

        dist = [INF] * (n + 1)
        dist[k] = 0
        heap = [(0, k)]

        while heap:
            d, v = heapq.heappop(heap)
            if d > dist[v]:
                continue
            for u, w in graph[v]:
                nd = d + w
                if nd < dist[u]:
                    dist[u] = nd
                    heapq.heappush(heap, (nd, u))

        ans = max(dist[1:n+1])
        return ans if ans != INF else -1`,
                cpp: `class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        const int INF = 1e9;
        vector<vector<pair<int,int>>> graph(n + 1);
        for (auto& t : times) {
            graph[t[0]].push_back({t[1], t[2]});
        }

        vector<int> dist(n + 1, INF);
        dist[k] = 0;
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        pq.push({0, k});

        while (!pq.empty()) {
            auto [d, v] = pq.top(); pq.pop();
            if (d > dist[v]) continue;
            for (auto [u, w] : graph[v]) {
                int nd = d + w;
                if (nd < dist[u]) {
                    dist[u] = nd;
                    pq.push({nd, u});
                }
            }
        }

        int ans = *max_element(dist.begin() + 1, dist.end());
        return ans == INF ? -1 : ans;
    }
};`
            },
            solutions: [
                {
                    approach: '다익스트라 + max',
                    description: '다익스트라로 모든 노드까지의 최단 거리를 구한 뒤 최댓값을 반환합니다.',
                    timeComplexity: 'O((V+E) log V)',
                    spaceComplexity: 'O(V+E)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline
INF = float('inf')

n = int(input())
m = int(input())
dp = [[INF] * (n + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    dp[i][i] = 0

for _ in range(m):
    a, b, c = map(int, input().split())
    dp[a][b] = min(dp[a][b], c)

for k in range(1, n + 1):
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])

for i in range(1, n + 1):
    print(' '.join(str(x) if x != INF else '0' for x in dp[i][1:n+1]))`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;
const int INF = 1e9;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> dp(n + 1, vector<int>(n + 1, INF));
    for (int i = 1; i <= n; i++) dp[i][i] = 0;

    for (int i = 0; i < m; i++) {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);
        dp[a][b] = min(dp[a][b], c);
    }

    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]);

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            printf("%d ", dp[i][j] == INF ? 0 : dp[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '그래프 구성',
                                desc: `times 배열에서 인접 리스트를 만듭니다.
각 간선을 (도착노드, 시간) 튜플로 저장합니다.`,
                                code: `import heapq
INF = float('inf')
graph = [[] for _ in range(n + 1)]
for u, v, w in times:
    graph[u].append((v, w))`
                            },
                            {
                                title: '다익스트라 실행',
                                desc: `시작 노드 k에서 모든 노드까지의 최단 시간을 구합니다.
표준 다익스트라로 각 노드에 신호가 도달하는 최소 시간을 계산합니다.`,
                                code: `dist = [INF] * (n + 1)
dist[k] = 0
heap = [(0, k)]

while heap:
    d, v = heapq.heappop(heap)
    if d > dist[v]:
        continue
    for u, w in graph[v]:
        nd = d + w
        if nd < dist[u]:
            dist[u] = nd
            heapq.heappush(heap, (nd, u))`
                            },
                            {
                                title: '결과 반환',
                                desc: `모든 노드 중 가장 늦게 도착하는 시간이 정답입니다.
INF가 남아있으면 도달 불가능한 노드가 있으므로 -1을 반환합니다.`,
                                code: `ans = max(dist[1:n+1])
return ans if ans != INF else -1`
                            }
                        ],
                        cpp: [
                            {
                                title: '그래프 구성',
                                desc: `times 벡터에서 인접 리스트를 구성합니다.
auto&로 복사 없이 참조하여 성능을 최적화합니다.`,
                                code: `const int INF = 1e9;
vector<vector<pair<int,int>>> graph(n + 1);
for (auto& t : times)
    graph[t[0]].push_back({t[1], t[2]});`
                            },
                            {
                                title: '다익스트라 실행',
                                desc: `greater<>로 최소 힙을 구성하여 거리가 짧은 노드부터 처리합니다.
모든 노드까지의 최단 신호 전달 시간을 계산합니다.`,
                                code: `vector<int> dist(n + 1, INF);
dist[k] = 0;
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
pq.push({0, k});

while (!pq.empty()) {
    auto [d, v] = pq.top(); pq.pop();
    if (d > dist[v]) continue;
    for (auto [u, w] : graph[v]) {
        int nd = d + w;
        if (nd < dist[u]) {
            dist[u] = nd;
            pq.push({nd, u});
        }
    }
}`
                            },
                            {
                                title: '결과 반환',
                                desc: 'max_element로 dist[1]~dist[n] 중 최대값 확인.',
                                code: `int ans = *max_element(dist.begin()+1, dist.end());
return ans == INF ? -1 : ans;`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-11404',
            title: 'BOJ 11404 - 플로이드',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/11404',
            simIntro: '경유지 k를 하나씩 추가하며 거리 행렬이 갱신되는 과정을 관찰하세요.',
            sim: {
                type: 'floyd'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>n(2 ≤ n ≤ 100)개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 m(1 ≤ m ≤ 100,000)개의 버스가 있다. 각 버스는 한 번 사용할 때 필요한 비용이 있다.</p>
                <p>모든 도시의 쌍 (A, B)에 대해서 도시 A에서 B로 가는데 필요한 비용의 최솟값을 구하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 도시의 개수 n(2 ≤ n ≤ 100)이 주어지고 둘째 줄에는 버스의 개수 m(1 ≤ m ≤ 100,000)이 주어진다. 그리고 셋째 줄부터 m+2줄까지 다음과 같은 버스의 정보가 주어진다. 먼저 처음에는 그 버스의 출발 도시의 번호가 주어진다. 그리고 그 다음에는 도착지의 도시 번호가 주어지고 또 그 버스 비용이 주어진다. 버스 비용은 0보다 크거나 같고, 100,000보다 작은 정수이다.</p>
                <h4>출력</h4>
                <p>n개의 줄을 출력해야 한다. i번째 줄에 출력하는 j번째 숫자는 도시 i에서 j로 가는데 필요한 최소 비용이다. 만약, i에서 j로 갈 수 없는 경우에는 그 자리에 0을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5
14
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
3 5 10
3 1 8
1 4 2
5 1 7
3 4 2
5 2 4</pre></div>
                    <div><strong>출력</strong><pre>0 2 3 1 4
12 0 15 2 5
8 5 0 1 1
10 7 13 0 3
7 4 10 6 0</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>2 ≤ n ≤ 100</li>
                    <li>1 ≤ m ≤ 100,000</li>
                    <li>비용 ≤ 100,000</li>
                    <li>갈 수 없는 경우 0을 출력</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '모든 도시 쌍 (A, B)의 최단 경로를 구해야 해요.<br>일단 떠오르는 건, 각 도시를 시작점으로 해서 <strong>다익스트라를 n번</strong> 돌리는 거예요.<br>도시 1에서 다익스트라, 도시 2에서 다익스트라, ... 도시 n에서 다익스트라. 이러면 모든 쌍의 최단 거리를 구할 수 있어요!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '다익스트라를 n번 돌리면 시간 복잡도가 O(n × (n+m) log n)이에요.<br>이 문제는 n ≤ 100으로 작으니까 사실 돌아가긴 하지만... 구현이 복잡해요.<br>n이 이렇게 작으면 <strong>더 간단한 방법</strong>이 있지 않을까?<br>O(n³) = 100³ = 1,000,000이면 충분히 빠르거든요!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>플로이드-워셜 알고리즘</strong>은 3중 for문 하나로 모든 쌍의 최단 경로를 구해요!<br>아이디어: "i에서 j로 갈 때, <strong>k를 경유</strong>하면 더 짧아질까?"를 모든 k에 대해 확인해요.<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.88em;text-align:center;"><div style="font-weight:600;margin-bottom:8px;">경유지 k를 거치면 더 짧아질까?</div><div style="display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;"><span style="padding:6px 12px;border:2px solid var(--accent);border-radius:50%;font-weight:700;">i</span><span style="color:var(--text2);">——<span style="font-size:0.8em;">dp[i][k]</span>——→</span><span style="padding:6px 12px;border:2px solid var(--yellow);background:var(--warm-bg);border-radius:50%;font-weight:700;">k</span><span style="color:var(--text2);">——<span style="font-size:0.8em;">dp[k][j]</span>——→</span><span style="padding:6px 12px;border:2px solid var(--accent);border-radius:50%;font-weight:700;">j</span></div><div style="margin-top:8px;"><code style="background:var(--bg);padding:4px 10px;border-radius:4px;">dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])</code></div><div style="margin-top:6px;color:var(--text2);font-size:0.85em;">k=1,2,...,n을 순서대로 경유지로 시도하면 모든 쌍의 최단 경로가 구해짐!</div></div>⚠️ 주의할 점 두 가지:<br>① <strong>k(경유지)가 가장 바깥 루프</strong>여야 해요! k→i→j 순서가 핵심이에요.<br>② 같은 출발-도착에 <strong>여러 버스가 있으면 최솟값</strong>만 저장해야 해요!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python에선 2차원 리스트를 <code>[[INF] * (n+1) for _ in range(n+1)]</code>로 초기화해요.<br>3중 for문을 돌린 후, INF가 남아있는 칸은 갈 수 없는 경우이므로 <strong>0으로 바꿔서</strong> 출력해요.<br>입출력이 많으니 <code>sys.stdin.readline</code>을 쓰는 게 안전해요!</span><span class="lang-cpp">C++에선 <code>vector&lt;vector&lt;int&gt;&gt; dp(n+1, vector&lt;int&gt;(n+1, INF))</code>로 초기화해요.<br>3중 for문 후 INF는 0으로 바꿔서 출력하면 돼요.<br><code>scanf/printf</code>를 쓰면 입출력 속도가 빨라요!</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline
INF = float('inf')

n = int(input())
m = int(input())
dp = [[INF] * (n + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    dp[i][i] = 0

for _ in range(m):
    a, b, c = map(int, input().split())
    dp[a][b] = min(dp[a][b], c)

for k in range(1, n + 1):
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])

for i in range(1, n + 1):
    print(' '.join(str(x) if x != INF else '0' for x in dp[i][1:n+1]))`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;
const int INF = 1e9;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> dp(n + 1, vector<int>(n + 1, INF));
    for (int i = 1; i <= n; i++) dp[i][i] = 0;

    for (int i = 0; i < m; i++) {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);
        dp[a][b] = min(dp[a][b], c);
    }

    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]);

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            printf("%d ", dp[i][j] == INF ? 0 : dp[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '플로이드-워셜',
                    description: '3중 for문으로 모든 쌍의 최단 거리를 O(N³)에 구합니다.',
                    timeComplexity: 'O(N³)',
                    spaceComplexity: 'O(N²)',
                    templates: {
                        python: `import sys
import heapq
input = sys.stdin.readline
INF = float('inf')

N = int(input())
M = int(input())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))

S, E = map(int, input().split())

dist = [INF] * (N + 1)
dist[S] = 0
heap = [(0, S)]

while heap:
    d, v = heapq.heappop(heap)
    if d > dist[v]:
        continue
    for u, w in graph[v]:
        nd = d + w
        if nd < dist[u]:
            dist[u] = nd
            heapq.heappush(heap, (nd, u))

print(dist[E])`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;
typedef pair<int,int> pii;
const int INF = 1e9;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<pii>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        graph[u].push_back({v, w});
    }
    int S, E;
    scanf("%d %d", &S, &E);

    vector<int> dist(N + 1, INF);
    dist[S] = 0;
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, S});

    while (!pq.empty()) {
        auto [d, v] = pq.top(); pq.pop();
        if (d > dist[v]) continue;
        for (auto [u, w] : graph[v]) {
            int nd = d + w;
            if (nd < dist[u]) {
                dist[u] = nd;
                pq.push({nd, u});
            }
        }
    }

    printf("%d\\n", dist[E]);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기화',
                                desc: `2차원 배열을 INF로 채우고, 자기 자신(dp[i][i])은 0으로 설정합니다.
모든 쌍의 최단 거리를 담을 거리 행렬을 준비합니다.`,
                                code: `import sys
input = sys.stdin.readline
INF = float('inf')

n = int(input())
m = int(input())
dp = [[INF] * (n + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    dp[i][i] = 0`
                            },
                            {
                                title: '간선 입력',
                                desc: `같은 출발-도착에 여러 간선이 있을 수 있으므로
min으로 최솟값만 저장합니다.`,
                                code: `for _ in range(m):
    a, b, c = map(int, input().split())
    dp[a][b] = min(dp[a][b], c)`
                            },
                            {
                                title: '플로이드-워셜 실행',
                                desc: `경유지 k를 하나씩 추가하며 모든 쌍의 거리를 갱신합니다.
k → i → j 순서가 핵심입니다 (k가 가장 바깥 루프).`,
                                code: `for k in range(1, n + 1):
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기화',
                                desc: `vector<vector<int>>로 N×N 거리 행렬을 INF로 초기화합니다.
자기 자신까지의 거리는 0입니다.`,
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
const int INF = 1e9;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> dp(n+1, vector<int>(n+1, INF));
    for (int i = 1; i <= n; i++) dp[i][i] = 0;`
                            },
                            {
                                title: '간선 입력',
                                desc: '같은 출발-도착에 여러 간선 → min으로 최솟값만 저장.',
                                code: `    for (int i = 0; i < m; i++) {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);
        dp[a][b] = min(dp[a][b], c);
    }`
                            },
                            {
                                title: '플로이드-워셜 실행',
                                desc: 'k(경유지) → i(출발) → j(도착) 순서 필수!',
                                code: `    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]);`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
