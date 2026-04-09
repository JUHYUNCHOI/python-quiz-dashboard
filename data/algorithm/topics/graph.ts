import type { AlgoTopic } from '../types'

export const graphTopic: AlgoTopic = {
    id: 'graph',
    title: '그래프와 순회',
    icon: '🕸️',
    category: '탐색 (Silver)',
    order: 9,
    description: '정점과 간선으로 이루어진 그래프를 DFS/BFS로 탐색하는 기법',
    titleEn: 'Graphs & Traversal',
    categoryEn: 'Search (Silver)',
    descriptionEn: 'Traversing graphs of vertices and edges with DFS and BFS',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: 'DFS/BFS 기본',
            titleEn: 'DFS/BFS Basics',
            problemIds: [
                'boj-2606',
                'boj-24479',
                'boj-24480',
                'boj-24444',
                'boj-24445',
                'boj-1260'
            ],
            desc: 'DFS와 BFS의 기본 구현을 연습합니다 (Silver II~III)',
            descEn: 'Practicing basic DFS and BFS implementations (Silver II~III)'
        },
        {
            num: 2,
            title: '그리드 탐색과 Flood Fill',
            titleEn: 'Grid Search & Flood Fill',
            problemIds: [
                'boj-1012',
                'boj-2667'
            ],
            desc: '격자에서 연결 요소를 탐색합니다 (Silver I~II)',
            descEn: 'Finding connected components in a grid (Silver I~II)'
        },
        {
            num: 3,
            title: 'BFS 최단 거리',
            titleEn: 'BFS Shortest Path',
            problemIds: [
                'boj-2178',
                'boj-1697',
                'boj-7562'
            ],
            desc: 'BFS로 최단 거리를 구합니다 (Silver I)',
            descEn: 'Finding shortest distances with BFS (Silver I)'
        },
        {
            num: 4,
            title: '심화 BFS',
            titleEn: 'Advanced BFS',
            problemIds: [
                'boj-7576',
                'boj-7569',
                'boj-16928',
                'boj-1707',
                'boj-2206'
            ],
            desc: '다중 시작점, 상태 확장 BFS (Gold III~V)',
            descEn: 'Multi-source BFS, state-space expansion (Gold III~V)'
        }
    ],
    problems: [
        {
            id: 'boj-2606',
            title: 'BOJ 2606 - 바이러스',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2606',
            simIntro: '1번 컴퓨터에서 시작해 연결된 컴퓨터로 바이러스가 퍼지는 BFS 탐색 과정을 시뮬레이션합니다.',
            sim: {
                type: 'virus'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>신종 바이러스인 웜 바이러스는 네트워크를 통해 전파됩니다. 한 컴퓨터가 웜 바이러스에 걸리면 그 컴퓨터와 네트워크 상에서 연결되어 있는 모든 컴퓨터는 웜 바이러스에 걸리게 됩니다.</p>
                <p>예를 들어 7대의 컴퓨터가 <그림 1>과 같이 네트워크 상에서 연결되어 있다고 하자. 1번 컴퓨터가 웜 바이러스에 걸리면 웜 바이러스는 2번과 5번 컴퓨터를 거쳐 3번과 6번 컴퓨터까지 전파되어 2, 3, 5, 6 네 대의 컴퓨터는 웜 바이러스에 걸리게 된다. 하지만 4번과 7번 컴퓨터는 1번 컴퓨터와 네트워크상에서 연결되어 있지 않기 때문에 영향을 받지 않는다.</p>
                <p>어느 날 1번 컴퓨터가 웜 바이러스에 걸렸다. 컴퓨터의 수와 네트워크 상에서 서로 연결되어 있는 정보가 주어질 때, 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 출력하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에는 컴퓨터의 수가 주어진다. 컴퓨터의 수는 100 이하인 양의 정수이고 각 컴퓨터에는 1번 부터 차례대로 번호가 매겨진다. 둘째 줄에는 네트워크 상에서 직접 연결되어 있는 컴퓨터 쌍의 수가 주어진다. 이어서 그 수만큼 한 줄에 한 쌍씩 네트워크 상에서 직접 연결되어 있는 컴퓨터의 번호 쌍이 주어진다.</p>
                <h4>출력</h4>
                <p>1번 컴퓨터가 웜 바이러스에 걸렸을 때, 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 첫째 줄에 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>7
6
1 2
2 3
1 5
5 2
5 6
4 7</pre></div>
                    <div><strong>출력</strong><pre>4</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3
0</pre></div>
                    <div><strong>출력</strong><pre>0</pre></div>
                </div><p class="example-explain">연결된 컴퓨터가 없으므로 아무 컴퓨터도 감염되지 않습니다.</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ 컴퓨터 수 ≤ 100</li>
                    <li>1 ≤ 연결 수 ≤ 100 × 99 / 2</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '1번 컴퓨터에서 바이러스가 퍼지니까... 1번과 연결된 컴퓨터를 찾고, 그 컴퓨터와 연결된 컴퓨터도 찾고... 이걸 반복하면 되지 않을까?<br><br>맞아요! <strong>"연결된 모든 컴퓨터를 찾는 것"</strong>이 핵심입니다. 이런 문제를 <strong>그래프 탐색</strong>이라고 해요.<br><br><div style="display:flex;gap:8px;align-items:center;justify-content:center;padding:10px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);flex-wrap:wrap;"><div style="width:36px;height:36px;border-radius:50%;background:var(--red);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;">1</div><span style="color:var(--text2);font-size:0.9rem;">→</span><div style="width:36px;height:36px;border-radius:50%;background:var(--yellow);color:#333;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;">2</div><span style="color:var(--text2);font-size:0.9rem;">→</span><div style="width:36px;height:36px;border-radius:50%;background:var(--yellow);color:#333;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;">3</div><span style="color:var(--text2);font-size:0.9rem;">→</span><div style="width:36px;height:36px;border-radius:50%;background:var(--yellow);color:#333;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;">5</div><span style="color:var(--text3);font-size:0.8rem;margin-left:8px;">감염 전파!</span></div>'
                },
                {
                    title: '근데 어떻게 빠짐없이 찾지?',
                    content: '연결된 컴퓨터를 하나씩 따라가다 보면 빠뜨리거나 같은 곳을 두 번 방문할 수 있어요.<br><br>이걸 체계적으로 하는 방법이 <strong>BFS(너비 우선 탐색)</strong>와 <strong>DFS(깊이 우선 탐색)</strong>입니다!<br>둘 다 <strong>visited 배열</strong>로 이미 방문한 곳을 체크하면 중복 방문을 막을 수 있어요.<br><br><div style="display:flex;gap:6px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;flex-wrap:wrap;"><span style="font-weight:600;color:var(--text);">visited:</span><span style="padding:3px 10px;background:var(--green);color:white;border-radius:4px;">T</span><span style="padding:3px 10px;background:var(--green);color:white;border-radius:4px;">T</span><span style="padding:3px 10px;background:var(--bg2);color:var(--text2);border-radius:4px;">F</span><span style="padding:3px 10px;background:var(--green);color:white;border-radius:4px;">T</span><span style="padding:3px 10px;background:var(--bg2);color:var(--text2);border-radius:4px;">F</span><span style="color:var(--text3);margin-left:6px;">← 방문한 곳 체크!</span></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '1번 컴퓨터를 큐에 넣고 BFS를 시작합니다:<br>1. 큐에서 컴퓨터를 꺼낸다<br>2. 그 컴퓨터와 연결된 이웃 중 방문하지 않은 것을 큐에 넣는다<br>3. 큐가 빌 때까지 반복!<br><br>방문한 컴퓨터 수에서 자기 자신(1번)을 빼면 정답이에요.'
                },
                {
                    title: '구현 팁',
                    content: '양방향 연결이니까 인접 리스트에 양쪽 다 추가해야 해요:<br><span class="lang-py">Python: <code>graph[u].append(v)</code>와 <code>graph[v].append(u)</code> 둘 다! BFS에는 <code>deque</code>를 사용합니다.</span><span class="lang-cpp">C++: <code>graph[u].push_back(v)</code>와 <code>graph[v].push_back(u)</code> 둘 다! BFS에는 <code>queue&lt;int&gt;</code>를 사용합니다.</span>'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

N = int(input())
M = int(input())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

visited = [False] * (N + 1)
queue = deque([1])
visited[1] = True
count = 0

while queue:
    v = queue.popleft()
    for u in graph[v]:
        if not visited[u]:
            visited[u] = True
            queue.append(u)
            count += 1

print(count)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }

    vector<bool> visited(N + 1, false);
    queue<int> q;
    q.push(1);
    visited[1] = true;
    int count = 0;

    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (!visited[u]) {
                visited[u] = true;
                q.push(u);
                count++;
            }
        }
    }
    printf("%d\\n", count);
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'BFS 탐색',
                    description: '1번 컴퓨터에서 BFS로 연결된 모든 컴퓨터를 방문하여 감염 수를 셉니다.',
                    timeComplexity: 'O(N + M)',
                    spaceComplexity: 'O(N + M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

N = int(input())
M = int(input())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

visited = [False] * (N + 1)
queue = deque([1])
visited[1] = True
count = 0

while queue:
    v = queue.popleft()
    for u in graph[v]:
        if not visited[u]:
            visited[u] = True
            queue.append(u)
            count += 1

print(count)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }

    vector<bool> visited(N + 1, false);
    queue<int> q;
    q.push(1);
    visited[1] = true;
    int count = 0;

    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (!visited[u]) {
                visited[u] = true;
                q.push(u);
                count++;
            }
        }
    }
    printf("%d\\n", count);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: '양방향 간선이므로 양쪽 모두 인접 리스트에 추가합니다.',
                                code: `import sys
from collections import deque
input = sys.stdin.readline

N = int(input())
M = int(input())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)`
                            },
                            {
                                title: 'BFS 초기화',
                                desc: '1번 컴퓨터에서 출발하므로 deque에 1을 넣고 시작합니다.',
                                code: `visited = [False] * (N + 1)
queue = deque([1])
visited[1] = True
count = 0`
                            },
                            {
                                title: 'BFS 탐색 및 출력',
                                desc: '연결된 모든 컴퓨터를 방문하며 감염 수를 세고 출력합니다.',
                                code: `while queue:
    v = queue.popleft()
    for u in graph[v]:
        if not visited[u]:
            visited[u] = True
            queue.append(u)
            count += 1
print(count)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: 'vector 인접 리스트와 scanf로 빠른 입력',
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    // 인접 리스트: vector 배열로 그래프 저장
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }`
                            },
                            {
                                title: 'BFS 초기화',
                                desc: 'deque 대신 queue<int> 사용',
                                code: `    vector<bool> visited(N + 1, false);
    queue<int> q;
    q.push(1);
    visited[1] = true;
    int count = 0;`
                            },
                            {
                                title: 'BFS 탐색 및 출력',
                                desc: '큐가 빌 때까지 탐색하며 감염된 컴퓨터 수를 셉니다.',
                                code: `    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (!visited[u]) {
                visited[u] = true;
                q.push(u);
                count++;
            }
        }
    }
    printf("%d\\n", count);
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-24479',
            title: 'BOJ 24479 - 깊이 우선 탐색 1',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/24479',
            simIntro: '시작 정점에서 오름차순 DFS를 수행하며 각 정점의 방문 순서를 기록하는 과정입니다.',
            sim: {
                type: 'dFS1'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N개의 정점과 M개의 간선으로 구성된 무방향 그래프가 주어집니다. 정점 R에서 시작하여 깊이 우선 탐색(DFS)으로 노드를 방문할 때, 각 노드의 방문 순서를 출력하는 프로그램을 작성하시오.</p>
                <p>인접 정점은 <strong>오름차순</strong>으로 방문합니다. 시작 정점의 방문 순서는 1이다. 시작 정점에서 방문할 수 없는 경우 0을 출력합니다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 정점의 수 N (5 ≤ N ≤ 100,000), 간선의 수 M (1 ≤ M ≤ 200,000), 시작 정점 R (1 ≤ R ≤ N)이 주어진다.</p>
                <p>다음 M개 줄에 간선 정보 u v가 주어지며 정점 u와 정점 v의 가중치 1인 양방향 간선을 나타낸다. (1 ≤ u < v ≤ N, u ≠ v) 모든 간선의 (u, v) 쌍의 값은 서로 다르다.</p>
                <h4>출력</h4>
                <p>첫째 줄부터 N개의 줄에 정수를 한 개씩 출력한다. i번째 줄에는 정점 i의 방문 순서를 출력한다. 시작 정점의 방문 순서는 1이다. 시작 정점에서 방문할 수 없는 경우 0을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 5 1
1 4
1 2
2 3
2 4
3 4</pre></div>
                    <div><strong>출력</strong><pre>1
2
3
4
0</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 100,000</li>
                    <li>1 ≤ M ≤ 200,000</li>
                    <li>1 ≤ R ≤ N</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '시작 정점 R에서 DFS를 돌리면서, 방문할 때마다 순서를 1, 2, 3... 이렇게 매기면 되겠다!<br><br>맞아요. <code>order[v]</code> 배열에 각 정점의 방문 순서를 기록하면 됩니다. 방문하지 못한 정점은 0을 출력하면 되고요.<br><br><div style="display:flex;gap:4px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;flex-wrap:wrap;"><span style="font-weight:600;color:var(--text);">order:</span><span style="padding:3px 8px;background:var(--green);color:white;border-radius:4px;">1</span><span style="padding:3px 8px;background:var(--green);color:white;border-radius:4px;">2</span><span style="padding:3px 8px;background:var(--green);color:white;border-radius:4px;">3</span><span style="padding:3px 8px;background:var(--green);color:white;border-radius:4px;">4</span><span style="padding:3px 8px;background:var(--bg2);color:var(--text2);border-radius:4px;">0</span><span style="color:var(--text3);margin-left:4px;">← 5번은 미방문</span></div>'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '문제에서 인접 정점을 <strong>오름차순</strong>으로 방문하라고 했어요. DFS를 그냥 돌리면 인접 리스트에 들어온 순서대로 방문하게 되니까, 정렬을 안 하면 순서가 달라질 수 있어요!<br><br><div style="display:flex;gap:12px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;flex-wrap:wrap;"><div><span style="color:var(--red);">정렬 전:</span> [4, 2, 3]</div><span style="font-size:1.1rem;">→</span><div><span style="color:var(--green);">정렬 후:</span> [2, 3, 4]</div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: 'DFS 전에 각 정점의 인접 리스트를 <strong>오름차순 정렬</strong>하면 됩니다!<br><br>그러면 DFS가 자연스럽게 작은 번호부터 방문해요:<br><span class="lang-py">Python: <code>graph[i].sort()</code>로 정렬 후, 재귀 DFS에서 <code>global cnt</code>로 순서를 매깁니다.</span><span class="lang-cpp">C++: <code>sort(graph[i].begin(), graph[i].end())</code>로 정렬 후, 전역 변수 <code>cnt</code>로 순서를 매깁니다.</span>'
                },
                {
                    title: '주의할 점',
                    content: '정점 수가 최대 100,000이므로 <span class="lang-py">Python에서는 <code>sys.setrecursionlimit(200000)</code>으로 재귀 한도를 늘려야 합니다!</span><span class="lang-cpp">C++에서는 기본 스택 크기로 충분하지만, 전역 배열을 사용하면 더 안전합니다.</span>'
                }
            ],
            templates: {
                python: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, N + 1):
    graph[i].sort()  # 오름차순 정렬

order = [0] * (N + 1)
cnt = 0

def dfs(v):
    global cnt
    cnt += 1
    order[v] = cnt
    for u in graph[v]:
        if order[u] == 0:
            dfs(u)

dfs(R)
for i in range(1, N + 1):
    print(order[i])`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N, M, R, cnt = 0;
vector<int> graph[100001];
int order_arr[100001];

void dfs(int v) {
    order_arr[v] = ++cnt;
    for (int u : graph[v]) {
        if (order_arr[u] == 0) dfs(u);
    }
}

int main() {
    scanf("%d %d %d", &N, &M, &R);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(graph[i].begin(), graph[i].end());
    dfs(R);
    for (int i = 1; i <= N; i++) printf("%d\\n", order_arr[i]);
    return 0;
}`
            },
            solutions: [
                {
                    approach: '오름차순 DFS',
                    description: '인접 리스트를 오름차순 정렬한 뒤 재귀 DFS로 방문 순서를 기록합니다.',
                    timeComplexity: 'O(N + M log M)',
                    spaceComplexity: 'O(N + M)',
                    templates: {
                        python: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, N + 1):
    graph[i].sort()  # 오름차순 정렬

order = [0] * (N + 1)
cnt = 0

def dfs(v):
    global cnt
    cnt += 1
    order[v] = cnt
    for u in graph[v]:
        if order[u] == 0:
            dfs(u)

dfs(R)
for i in range(1, N + 1):
    print(order[i])`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N, M, R, cnt = 0;
vector<int> graph[100001];
int order_arr[100001];

void dfs(int v) {
    order_arr[v] = ++cnt;
    for (int u : graph[v]) {
        if (order_arr[u] == 0) dfs(u);
    }
}

int main() {
    scanf("%d %d %d", &N, &M, &R);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(graph[i].begin(), graph[i].end());
    dfs(R);
    for (int i = 1; i <= N; i++) printf("%d\\n", order_arr[i]);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 정렬',
                                desc: '오름차순 방문을 위해 인접 리스트를 sort()합니다.',
                                code: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)
for i in range(1, N + 1):
    graph[i].sort()`
                            },
                            {
                                title: 'DFS 함수 정의',
                                desc: 'order 배열에 방문 순서를 기록하는 재귀 DFS입니다.',
                                code: `order = [0] * (N + 1)
cnt = 0

def dfs(v):
    global cnt
    cnt += 1
    order[v] = cnt
    for u in graph[v]:
        if order[u] == 0:
            dfs(u)`
                            },
                            {
                                title: 'DFS 실행 및 출력',
                                desc: '시작 정점 R에서 DFS를 실행하고 각 정점의 방문 순서를 출력합니다.',
                                code: `dfs(R)
for i in range(1, N + 1):
    print(order[i])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 정렬',
                                desc: '전역 배열 + sort()로 오름차순 정렬',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int N, M, R, cnt = 0;
vector<int> graph[100001];
int order_arr[100001]; // 방문 순서 기록 배열`
                            },
                            {
                                title: 'DFS 함수 정의',
                                desc: 'global 대신 전역 변수 cnt 사용',
                                code: `void dfs(int v) {
    order_arr[v] = ++cnt; // 방문 순서 기록
    for (int u : graph[v]) {
        if (order_arr[u] == 0) dfs(u);
    }
}`
                            },
                            {
                                title: 'DFS 실행 및 출력',
                                desc: 'main에서 입력·정렬·DFS·출력을 순서대로 처리합니다.',
                                code: `int main() {
    scanf("%d %d %d", &N, &M, &R);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    // 오름차순 정렬: 작은 번호부터 방문하기 위해
    for (int i = 1; i <= N; i++)
        sort(graph[i].begin(), graph[i].end());
    dfs(R);
    for (int i = 1; i <= N; i++)
        printf("%d\\n", order_arr[i]);
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-24480',
            title: 'BOJ 24480 - 깊이 우선 탐색 2',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/24480',
            simIntro: '시작 정점에서 내림차순 DFS를 수행하며 각 정점의 방문 순서를 기록하는 과정입니다.',
            sim: {
                type: 'dFS2'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N개의 정점과 M개의 간선으로 구성된 무방향 그래프가 주어집니다. 정점 R에서 시작하여 깊이 우선 탐색(DFS)으로 노드를 방문할 때, 각 노드의 방문 순서를 출력하는 프로그램을 작성하시오.</p>
                <p>인접 정점은 <strong>내림차순</strong>으로 방문합니다. 시작 정점의 방문 순서는 1이다. 시작 정점에서 방문할 수 없는 경우 0을 출력합니다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 정점의 수 N (5 ≤ N ≤ 100,000), 간선의 수 M (1 ≤ M ≤ 200,000), 시작 정점 R (1 ≤ R ≤ N)이 주어진다.</p>
                <p>다음 M개 줄에 간선 정보 u v가 주어지며 정점 u와 정점 v의 가중치 1인 양방향 간선을 나타낸다. (1 ≤ u < v ≤ N, u ≠ v) 모든 간선의 (u, v) 쌍의 값은 서로 다르다.</p>
                <h4>출력</h4>
                <p>첫째 줄부터 N개의 줄에 정수를 한 개씩 출력한다. i번째 줄에는 정점 i의 방문 순서를 출력한다. 시작 정점의 방문 순서는 1이다. 시작 정점에서 방문할 수 없는 경우 0을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 5 1
1 4
1 2
2 3
2 4
3 4</pre></div>
                    <div><strong>출력</strong><pre>1
4
3
2
0</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 100,000</li>
                    <li>1 ≤ M ≤ 200,000</li>
                    <li>1 ≤ R ≤ N</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '24479번(깊이 우선 탐색 1)을 이미 풀었다면, 같은 방식으로 DFS를 돌리면 될 것 같아요. 방문 순서를 <code>order</code> 배열에 기록하는 건 동일하고요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '이번에는 인접 정점을 <strong>내림차순</strong>으로 방문해야 해요! 24479번처럼 오름차순으로 정렬하면 방문 순서가 달라집니다.<br><br>결국 정렬 방향 <strong>한 줄</strong>만 바꾸면 되는 문제예요.<br><br><div style="display:flex;gap:12px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;flex-wrap:wrap;"><div><span style="color:var(--text2);">오름차순:</span> [2, 3, 4]</div><span style="font-size:1.1rem;">→</span><div><span style="color:var(--accent);font-weight:600;">내림차순:</span> [4, 3, 2]</div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '24479번 코드에서 정렬 부분만 내림차순으로 바꿉니다:<br><span class="lang-py">Python: <code>graph[i].sort(reverse=True)</code></span><span class="lang-cpp">C++: <code>sort(graph[i].rbegin(), graph[i].rend())</code></span><br><br>나머지 DFS 로직은 완전히 동일합니다!'
                }
            ],
            templates: {
                python: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, N + 1):
    graph[i].sort(reverse=True)  # 내림차순 정렬!

order = [0] * (N + 1)
cnt = 0

def dfs(v):
    global cnt
    cnt += 1
    order[v] = cnt
    for u in graph[v]:
        if order[u] == 0:
            dfs(u)

dfs(R)
for i in range(1, N + 1):
    print(order[i])`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N, M, R, cnt = 0;
vector<int> graph[100001];
int order_arr[100001];

void dfs(int v) {
    order_arr[v] = ++cnt;
    for (int u : graph[v]) {
        if (order_arr[u] == 0) dfs(u);
    }
}

int main() {
    scanf("%d %d %d", &N, &M, &R);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(graph[i].rbegin(), graph[i].rend()); // 내림차순!
    dfs(R);
    for (int i = 1; i <= N; i++) printf("%d\\n", order_arr[i]);
    return 0;
}`
            },
            solutions: [
                {
                    approach: '내림차순 DFS',
                    description: '인접 리스트를 내림차순 정렬한 뒤 재귀 DFS로 방문 순서를 기록합니다.',
                    timeComplexity: 'O(N + M log M)',
                    spaceComplexity: 'O(N + M)',
                    templates: {
                        python: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, N + 1):
    graph[i].sort(reverse=True)  # 내림차순 정렬!

order = [0] * (N + 1)
cnt = 0

def dfs(v):
    global cnt
    cnt += 1
    order[v] = cnt
    for u in graph[v]:
        if order[u] == 0:
            dfs(u)

dfs(R)
for i in range(1, N + 1):
    print(order[i])`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N, M, R, cnt = 0;
vector<int> graph[100001];
int order_arr[100001];

void dfs(int v) {
    order_arr[v] = ++cnt;
    for (int u : graph[v]) {
        if (order_arr[u] == 0) dfs(u);
    }
}

int main() {
    scanf("%d %d %d", &N, &M, &R);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(graph[i].rbegin(), graph[i].rend()); // 내림차순!
    dfs(R);
    for (int i = 1; i <= N; i++) printf("%d\\n", order_arr[i]);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 내림차순 정렬',
                                desc: '내림차순 방문을 위해 reverse=True로 정렬합니다.',
                                code: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)
for i in range(1, N + 1):
    graph[i].sort(reverse=True)`
                            },
                            {
                                title: 'DFS 함수 정의',
                                desc: '24479번과 동일한 재귀 DFS, 정렬 방향만 다릅니다.',
                                code: `order = [0] * (N + 1)
cnt = 0

def dfs(v):
    global cnt
    cnt += 1
    order[v] = cnt
    for u in graph[v]:
        if order[u] == 0:
            dfs(u)`
                            },
                            {
                                title: 'DFS 실행 및 출력',
                                desc: '시작 정점 R에서 DFS 실행 후 각 정점의 방문 순서를 출력합니다.',
                                code: `dfs(R)
for i in range(1, N + 1):
    print(order[i])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 내림차순 정렬',
                                desc: 'rbegin()/rend()로 내림차순 정렬',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int N, M, R, cnt = 0;
vector<int> graph[100001];
int order_arr[100001];`
                            },
                            {
                                title: 'DFS 함수 정의',
                                desc: '24479번과 동일한 재귀 DFS 구조입니다.',
                                code: `void dfs(int v) {
    order_arr[v] = ++cnt;
    for (int u : graph[v]) {
        if (order_arr[u] == 0) dfs(u);
    }
}`
                            },
                            {
                                title: 'DFS 실행 및 출력',
                                desc: 'rbegin/rend 역순 정렬 후 DFS 실행, 결과 출력합니다.',
                                code: `int main() {
    scanf("%d %d %d", &N, &M, &R);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    // 내림차순: rbegin/rend로 역순 정렬
    for (int i = 1; i <= N; i++)
        sort(graph[i].rbegin(), graph[i].rend());
    dfs(R);
    for (int i = 1; i <= N; i++)
        printf("%d\\n", order_arr[i]);
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-24444',
            title: 'BOJ 24444 - 너비 우선 탐색 1',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/24444',
            simIntro: '시작 정점에서 오름차순 BFS를 수행하며 각 정점의 방문 순서를 기록하는 과정입니다.',
            sim: {
                type: 'bFS1'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N개의 정점과 M개의 간선으로 구성된 무방향 그래프가 주어집니다. 정점 R에서 시작하여 너비 우선 탐색(BFS)으로 노드를 방문할 때, 각 노드의 방문 순서를 출력하는 프로그램을 작성하시오.</p>
                <p>인접 정점은 <strong>오름차순</strong>으로 방문합니다. 시작 정점의 방문 순서는 1이다. 시작 정점에서 방문할 수 없는 경우 0을 출력합니다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 정점의 수 N (5 ≤ N ≤ 100,000), 간선의 수 M (1 ≤ M ≤ 200,000), 시작 정점 R (1 ≤ R ≤ N)이 주어진다.</p>
                <p>다음 M개 줄에 간선 정보 u v가 주어지며 정점 u와 정점 v의 가중치 1인 양방향 간선을 나타낸다. (1 ≤ u < v ≤ N, u ≠ v) 모든 간선의 (u, v) 쌍의 값은 서로 다르다.</p>
                <h4>출력</h4>
                <p>첫째 줄부터 N개의 줄에 정수를 한 개씩 출력한다. i번째 줄에는 정점 i의 방문 순서를 출력한다. 시작 정점의 방문 순서는 1이다. 시작 정점에서 방문할 수 없는 경우 0을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 5 1
1 4
1 2
2 3
2 4
3 4</pre></div>
                    <div><strong>출력</strong><pre>1
2
3
4
0</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 100,000</li>
                    <li>1 ≤ M ≤ 200,000</li>
                    <li>1 ≤ R ≤ N</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '24479번처럼 DFS로... 잠깐, 이번엔 <strong>BFS(너비 우선 탐색)</strong>로 방문 순서를 구해야 해요!<br><br>BFS는 시작 정점에서 가까운 정점부터 차례로 방문하는 방식입니다. 큐(queue)를 사용해요.<br><br><div style="display:flex;gap:6px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;flex-wrap:wrap;"><span style="font-weight:600;color:var(--text);">큐:</span><span style="padding:3px 10px;background:#00b894;color:white;border-radius:4px;">R</span><span style="color:var(--text3);">→</span><span style="padding:3px 10px;background:var(--bg2);color:var(--text);border-radius:4px;">2</span><span style="padding:3px 10px;background:var(--bg2);color:var(--text);border-radius:4px;">3</span><span style="color:var(--text3);margin-left:4px;">← 가까운 순서대로!</span></div>'
                },
                {
                    title: '근데 순서가 중요해',
                    content: '문제에서 인접 정점을 <strong>오름차순</strong>으로 방문하라고 했으니, DFS 문제와 마찬가지로 인접 리스트를 먼저 정렬해야 합니다. 정렬 안 하면 순서가 달라져요!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '1. 인접 리스트를 오름차순 정렬<br>2. 시작 정점 R을 큐에 넣고 <code>order[R] = 1</code><br>3. 큐에서 꺼낸 정점의 이웃 중 미방문 정점을 순서대로 큐에 넣으며 방문 순서를 기록<br><br><span class="lang-py">Python: <code>deque</code>로 BFS, <code>popleft()</code>로 큐에서 꺼냅니다.</span><span class="lang-cpp">C++: <code>queue&lt;int&gt;</code>로 BFS, <code>q.front(); q.pop();</code>으로 큐에서 꺼냅니다.</span>'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, N + 1):
    graph[i].sort()  # 오름차순

order = [0] * (N + 1)
cnt = 0

queue = deque([R])
visited = [False] * (N + 1)
visited[R] = True
cnt += 1
order[R] = cnt

while queue:
    v = queue.popleft()
    for u in graph[v]:
        if not visited[u]:
            visited[u] = True
            cnt += 1
            order[u] = cnt
            queue.append(u)

for i in range(1, N + 1):
    print(order[i])`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M, R;
    scanf("%d %d %d", &N, &M, &R);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v; scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(graph[i].begin(), graph[i].end());

    vector<int> order_arr(N + 1, 0);
    vector<bool> visited(N + 1, false);
    queue<int> q;
    q.push(R); visited[R] = true;
    int cnt = 0;
    order_arr[R] = ++cnt;

    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (!visited[u]) {
                visited[u] = true;
                order_arr[u] = ++cnt;
                q.push(u);
            }
        }
    }
    for (int i = 1; i <= N; i++) printf("%d\\n", order_arr[i]);
    return 0;
}`
            },
            solutions: [
                {
                    approach: '오름차순 BFS',
                    description: '인접 리스트를 오름차순 정렬한 뒤 BFS로 방문 순서를 기록합니다.',
                    timeComplexity: 'O(N + M log M)',
                    spaceComplexity: 'O(N + M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, N + 1):
    graph[i].sort()  # 오름차순

order = [0] * (N + 1)
cnt = 0

queue = deque([R])
visited = [False] * (N + 1)
visited[R] = True
cnt += 1
order[R] = cnt

while queue:
    v = queue.popleft()
    for u in graph[v]:
        if not visited[u]:
            visited[u] = True
            cnt += 1
            order[u] = cnt
            queue.append(u)

for i in range(1, N + 1):
    print(order[i])`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M, R;
    scanf("%d %d %d", &N, &M, &R);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v; scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(graph[i].begin(), graph[i].end());

    vector<int> order_arr(N + 1, 0);
    vector<bool> visited(N + 1, false);
    queue<int> q;
    q.push(R); visited[R] = true;
    int cnt = 0;
    order_arr[R] = ++cnt;

    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (!visited[u]) {
                visited[u] = true;
                order_arr[u] = ++cnt;
                q.push(u);
            }
        }
    }
    for (int i = 1; i <= N; i++) printf("%d\\n", order_arr[i]);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 정렬',
                                desc: '오름차순 BFS를 위해 인접 리스트를 정렬합니다.',
                                code: `import sys
from collections import deque
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)
for i in range(1, N + 1):
    graph[i].sort()`
                            },
                            {
                                title: 'BFS 초기화',
                                desc: '시작 정점 R을 큐에 넣고 방문 순서 1을 기록합니다.',
                                code: `order = [0] * (N + 1)
cnt = 0
queue = deque([R])
cnt += 1
order[R] = cnt`
                            },
                            {
                                title: 'BFS 탐색 및 출력',
                                desc: '큐에서 꺼낸 정점의 이웃을 오름차순으로 방문합니다.',
                                code: `while queue:
    v = queue.popleft()
    for u in graph[v]:
        if order[u] == 0:
            cnt += 1
            order[u] = cnt
            queue.append(u)
for i in range(1, N + 1):
    print(order[i])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 정렬',
                                desc: 'vector<vector<int>>와 sort()로 오름차순 정렬',
                                code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M, R;
    scanf("%d %d %d", &N, &M, &R);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++)
        sort(graph[i].begin(), graph[i].end());`
                            },
                            {
                                title: 'BFS 초기화',
                                desc: 'deque 대신 queue 사용',
                                code: `    vector<int> order_arr(N + 1, 0);
    int cnt = 0;
    queue<int> q;
    q.push(R);
    order_arr[R] = ++cnt;`
                            },
                            {
                                title: 'BFS 탐색 및 출력',
                                desc: '방문 순서를 기록하며 BFS 수행 후 결과를 출력합니다.',
                                code: `    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (order_arr[u] == 0) {
                order_arr[u] = ++cnt;
                q.push(u);
            }
        }
    }
    for (int i = 1; i <= N; i++)
        printf("%d\\n", order_arr[i]);
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-24445',
            title: 'BOJ 24445 - 너비 우선 탐색 2',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/24445',
            simIntro: '시작 정점에서 내림차순 BFS를 수행하며 각 정점의 방문 순서를 기록하는 과정입니다.',
            sim: {
                type: 'bFS2'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N개의 정점과 M개의 간선으로 구성된 무방향 그래프가 주어집니다. 정점 R에서 시작하여 너비 우선 탐색(BFS)으로 노드를 방문할 때, 각 노드의 방문 순서를 출력하는 프로그램을 작성하시오.</p>
                <p>인접 정점은 <strong>내림차순</strong>으로 방문합니다. 시작 정점의 방문 순서는 1이다. 시작 정점에서 방문할 수 없는 경우 0을 출력합니다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 정점의 수 N (5 ≤ N ≤ 100,000), 간선의 수 M (1 ≤ M ≤ 200,000), 시작 정점 R (1 ≤ R ≤ N)이 주어진다.</p>
                <p>다음 M개 줄에 간선 정보 u v가 주어지며 정점 u와 정점 v의 가중치 1인 양방향 간선을 나타낸다. (1 ≤ u < v ≤ N, u ≠ v) 모든 간선의 (u, v) 쌍의 값은 서로 다르다.</p>
                <h4>출력</h4>
                <p>첫째 줄부터 N개의 줄에 정수를 한 개씩 출력한다. i번째 줄에는 정점 i의 방문 순서를 출력한다. 시작 정점의 방문 순서는 1이다. 시작 정점에서 방문할 수 없는 경우 0을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 5 1
1 4
1 2
2 3
2 4
3 4</pre></div>
                    <div><strong>출력</strong><pre>1
3
4
2
0</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 100,000</li>
                    <li>1 ≤ M ≤ 200,000</li>
                    <li>1 ≤ R ≤ N</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '24444번(너비 우선 탐색 1)을 풀었다면, 같은 BFS 로직을 그대로 쓰면 될 것 같아요. 큐에서 꺼내고 이웃을 넣고...'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '이번에는 인접 정점을 <strong>내림차순</strong>으로 방문해야 합니다! 오름차순 정렬을 그대로 쓰면 방문 순서가 완전히 달라져요.<br><br>24444번 코드에서 딱 <strong>한 줄</strong>만 바꾸면 됩니다.<br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;"><span class="lang-py"><code>graph[i].sort()</code> → <code style="color:var(--accent);font-weight:600;">graph[i].sort(reverse=True)</code></span><span class="lang-cpp"><code>sort(g.begin(), g.end())</code> → <code style="color:var(--accent);font-weight:600;">sort(g.rbegin(), g.rend())</code></span></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '정렬 방향만 내림차순으로 변경하면 끝!<br><span class="lang-py">Python: <code>graph[i].sort(reverse=True)</code></span><span class="lang-cpp">C++: <code>sort(graph[i].rbegin(), graph[i].rend())</code></span><br><br>BFS 로직 자체는 24444번과 완전히 동일합니다.'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, N + 1):
    graph[i].sort(reverse=True)  # 내림차순!

order = [0] * (N + 1)
cnt = 0
queue = deque([R])
visited = [False] * (N + 1)
visited[R] = True
cnt += 1
order[R] = cnt

while queue:
    v = queue.popleft()
    for u in graph[v]:
        if not visited[u]:
            visited[u] = True
            cnt += 1
            order[u] = cnt
            queue.append(u)

for i in range(1, N + 1):
    print(order[i])`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M, R;
    scanf("%d %d %d", &N, &M, &R);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v; scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(graph[i].rbegin(), graph[i].rend()); // 내림차순!

    vector<int> order_arr(N + 1, 0);
    vector<bool> visited(N + 1, false);
    queue<int> q;
    q.push(R); visited[R] = true;
    int cnt = 0; order_arr[R] = ++cnt;

    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (!visited[u]) {
                visited[u] = true;
                order_arr[u] = ++cnt;
                q.push(u);
            }
        }
    }
    for (int i = 1; i <= N; i++) printf("%d\\n", order_arr[i]);
    return 0;
}`
            },
            solutions: [
                {
                    approach: '내림차순 BFS',
                    description: '인접 리스트를 내림차순 정렬한 뒤 BFS로 방문 순서를 기록합니다.',
                    timeComplexity: 'O(N + M log M)',
                    spaceComplexity: 'O(N + M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, N + 1):
    graph[i].sort(reverse=True)  # 내림차순!

order = [0] * (N + 1)
cnt = 0
queue = deque([R])
visited = [False] * (N + 1)
visited[R] = True
cnt += 1
order[R] = cnt

while queue:
    v = queue.popleft()
    for u in graph[v]:
        if not visited[u]:
            visited[u] = True
            cnt += 1
            order[u] = cnt
            queue.append(u)

for i in range(1, N + 1):
    print(order[i])`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M, R;
    scanf("%d %d %d", &N, &M, &R);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v; scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(graph[i].rbegin(), graph[i].rend()); // 내림차순!

    vector<int> order_arr(N + 1, 0);
    vector<bool> visited(N + 1, false);
    queue<int> q;
    q.push(R); visited[R] = true;
    int cnt = 0; order_arr[R] = ++cnt;

    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (!visited[u]) {
                visited[u] = true;
                order_arr[u] = ++cnt;
                q.push(u);
            }
        }
    }
    for (int i = 1; i <= N; i++) printf("%d\\n", order_arr[i]);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 내림차순 정렬',
                                desc: '내림차순 BFS를 위해 reverse=True로 정렬합니다.',
                                code: `import sys
from collections import deque
input = sys.stdin.readline

N, M, R = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)
for i in range(1, N + 1):
    graph[i].sort(reverse=True)`
                            },
                            {
                                title: 'BFS 초기화',
                                desc: '시작 정점 R을 큐에 넣고 방문 순서 1을 기록합니다.',
                                code: `order = [0] * (N + 1)
cnt = 0
queue = deque([R])
cnt += 1
order[R] = cnt`
                            },
                            {
                                title: 'BFS 탐색 및 출력',
                                desc: '큐에서 꺼낸 정점의 이웃을 내림차순으로 방문합니다.',
                                code: `while queue:
    v = queue.popleft()
    for u in graph[v]:
        if order[u] == 0:
            cnt += 1
            order[u] = cnt
            queue.append(u)
for i in range(1, N + 1):
    print(order[i])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 내림차순 정렬',
                                desc: 'rbegin()/rend()로 내림차순 정렬',
                                code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M, R;
    scanf("%d %d %d", &N, &M, &R);
    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    // 내림차순: rbegin/rend로 역순 정렬
    for (int i = 1; i <= N; i++)
        sort(graph[i].rbegin(), graph[i].rend());`
                            },
                            {
                                title: 'BFS 초기화',
                                desc: '시작 정점을 큐에 넣고 방문 순서를 기록합니다.',
                                code: `    vector<int> order_arr(N + 1, 0);
    int cnt = 0;
    queue<int> q;
    q.push(R);
    order_arr[R] = ++cnt;`
                            },
                            {
                                title: 'BFS 탐색 및 출력',
                                desc: '내림차순 인접 리스트로 BFS 수행 후 결과 출력합니다.',
                                code: `    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            if (order_arr[u] == 0) {
                order_arr[u] = ++cnt;
                q.push(u);
            }
        }
    }
    for (int i = 1; i <= N; i++)
        printf("%d\\n", order_arr[i]);
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1260',
            title: 'BOJ 1260 - DFS와 BFS',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1260',
            simIntro: 'DFS와 BFS를 모두 수행하여 각각의 탐색 순서를 비교하는 과정입니다.',
            sim: {
                type: 'dFSBFS'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 5 1
1 2
1 3
1 4
2 4
3 4</pre></div>
                    <div><strong>출력</strong><pre>1 2 4 3
1 2 3 4</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 5 3
5 4
5 2
1 2
3 4
3 1</pre></div>
                    <div><strong>출력</strong><pre>3 1 2 5 4
3 1 4 2 5</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>1000 1 1000
999 1000</pre></div>
                    <div><strong>출력</strong><pre>1000 999
1000 999</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 1,000</li>
                    <li>1 ≤ M ≤ 10,000</li>
                    <li>1 ≤ V ≤ N</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'DFS 결과와 BFS 결과를 각각 출력하라고 하니까, 앞에서 배운 DFS와 BFS를 둘 다 구현하면 되겠다!<br><br>인접 리스트를 만들고, 정점 번호가 작은 것부터 방문하니까 오름차순 정렬도 해야겠네요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'DFS를 먼저 돌리면 visited 배열이 전부 True로 채워지잖아요. 그 상태에서 BFS를 돌리면 아무 곳도 방문 못 해요!<br><br>DFS와 BFS에서 <strong>별도의 visited 배열</strong>을 사용하거나, DFS 후에 visited를 초기화해야 합니다.<br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;"><div style="margin-bottom:4px;"><span style="color:var(--red);">DFS 후:</span> visited = <span style="padding:2px 6px;background:var(--green);color:white;border-radius:3px;font-size:0.8rem;">T T T T T</span> ← 전부 True!</div><div><span style="color:var(--accent);">해결:</span> visited를 <strong>초기화</strong>하거나 <strong>별도 배열</strong> 사용</div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '1. 인접 리스트를 오름차순 정렬<br>2. DFS(재귀)를 수행하며 방문 순서를 기록<br>3. visited를 초기화하고 BFS(큐)를 수행하며 방문 순서를 기록<br>4. 각 결과를 공백으로 구분하여 출력<br><br><span class="lang-py">Python: DFS는 재귀 함수, BFS는 <code>deque</code>로 구현합니다.</span><span class="lang-cpp">C++: DFS는 재귀 함수, BFS는 <code>queue</code>로 구현하고, <code>memset(vis, false, sizeof(vis))</code>로 초기화합니다.</span>'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
sys.setrecursionlimit(10000)
input = sys.stdin.readline

N, M, V = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, N + 1):
    graph[i].sort()

# DFS
dfs_result = []
visited_dfs = [False] * (N + 1)

def dfs(v):
    visited_dfs[v] = True
    dfs_result.append(v)
    for u in graph[v]:
        if not visited_dfs[u]:
            dfs(u)

dfs(V)

# BFS
bfs_result = []
visited_bfs = [False] * (N + 1)
queue = deque([V])
visited_bfs[V] = True

while queue:
    v = queue.popleft()
    bfs_result.append(v)
    for u in graph[v]:
        if not visited_bfs[u]:
            visited_bfs[u] = True
            queue.append(u)

print(*dfs_result)
print(*bfs_result)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N, M, V;
vector<int> graph[1001];
bool vis[1001];

vector<int> dfs_result, bfs_result;

void dfs(int v) {
    vis[v] = true;
    dfs_result.push_back(v);
    for (int u : graph[v])
        if (!vis[u]) dfs(u);
}

void bfs(int start) {
    memset(vis, false, sizeof(vis));
    queue<int> q;
    q.push(start); vis[start] = true;
    while (!q.empty()) {
        int v = q.front(); q.pop();
        bfs_result.push_back(v);
        for (int u : graph[v]) {
            if (!vis[u]) { vis[u] = true; q.push(u); }
        }
    }
}

int main() {
    scanf("%d %d %d", &N, &M, &V);
    for (int i = 0; i < M; i++) {
        int u, v; scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(graph[i].begin(), graph[i].end());

    dfs(V);
    bfs(V);

    for (int i = 0; i < (int)dfs_result.size(); i++) printf("%d%c", dfs_result[i], i+1<(int)dfs_result.size()?' ':'\\n');
    for (int i = 0; i < (int)bfs_result.size(); i++) printf("%d%c", bfs_result[i], i+1<(int)bfs_result.size()?' ':'\\n');
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'DFS + BFS',
                    description: '하나의 그래프에서 DFS와 BFS를 모두 수행하여 방문 순서를 각각 출력합니다.',
                    timeComplexity: 'O(N + M)',
                    spaceComplexity: 'O(N + M)',
                    templates: {
                        python: `import sys
from collections import deque
sys.setrecursionlimit(10000)
input = sys.stdin.readline

N, M, V = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, N + 1):
    graph[i].sort()

# DFS
dfs_result = []
visited_dfs = [False] * (N + 1)

def dfs(v):
    visited_dfs[v] = True
    dfs_result.append(v)
    for u in graph[v]:
        if not visited_dfs[u]:
            dfs(u)

dfs(V)

# BFS
bfs_result = []
visited_bfs = [False] * (N + 1)
queue = deque([V])
visited_bfs[V] = True

while queue:
    v = queue.popleft()
    bfs_result.append(v)
    for u in graph[v]:
        if not visited_bfs[u]:
            visited_bfs[u] = True
            queue.append(u)

print(*dfs_result)
print(*bfs_result)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N, M, V;
vector<int> graph[1001];
bool vis[1001];

vector<int> dfs_result, bfs_result;

void dfs(int v) {
    vis[v] = true;
    dfs_result.push_back(v);
    for (int u : graph[v])
        if (!vis[u]) dfs(u);
}

void bfs(int start) {
    memset(vis, false, sizeof(vis));
    queue<int> q;
    q.push(start); vis[start] = true;
    while (!q.empty()) {
        int v = q.front(); q.pop();
        bfs_result.push_back(v);
        for (int u : graph[v]) {
            if (!vis[u]) { vis[u] = true; q.push(u); }
        }
    }
}

int main() {
    scanf("%d %d %d", &N, &M, &V);
    for (int i = 0; i < M; i++) {
        int u, v; scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++) sort(graph[i].begin(), graph[i].end());

    dfs(V);
    bfs(V);

    for (int i = 0; i < (int)dfs_result.size(); i++) printf("%d%c", dfs_result[i], i+1<(int)dfs_result.size()?' ':'\\n');
    for (int i = 0; i < (int)bfs_result.size(); i++) printf("%d%c", bfs_result[i], i+1<(int)bfs_result.size()?' ':'\\n');
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: '오름차순 방문을 위해 인접 리스트를 정렬합니다.',
                                code: `import sys
from collections import deque
sys.setrecursionlimit(10000)
input = sys.stdin.readline

N, M, V = map(int, input().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)
for i in range(1, N + 1):
    graph[i].sort()`
                            },
                            {
                                title: 'DFS 수행',
                                desc: '재귀 DFS로 방문 순서를 dfs_result에 기록합니다.',
                                code: `dfs_result = []
visited = [False] * (N + 1)
def dfs(v):
    visited[v] = True
    dfs_result.append(v)
    for u in graph[v]:
        if not visited[u]:
            dfs(u)
dfs(V)`
                            },
                            {
                                title: 'BFS 수행 및 출력',
                                desc: '별도의 visited로 BFS를 수행하고 DFS/BFS 결과를 출력합니다.',
                                code: `bfs_result = []
visited2 = [False] * (N + 1)
q = deque([V])
visited2[V] = True
while q:
    v = q.popleft()
    bfs_result.append(v)
    for u in graph[v]:
        if not visited2[u]:
            visited2[u] = True
            q.append(u)
print(*dfs_result)
print(*bfs_result)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: '전역 배열 + memset으로 visited 관리',
                                code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
#include <cstring>
using namespace std;

int N, M, V;
vector<int> graph[1001];
bool vis[1001];
vector<int> dfs_result, bfs_result;`
                            },
                            {
                                title: 'DFS 수행',
                                desc: '재귀 DFS로 방문 순서를 vector에 기록합니다.',
                                code: `void dfs(int v) {
    vis[v] = true;
    dfs_result.push_back(v);
    for (int u : graph[v])
        if (!vis[u]) dfs(u);
}`
                            },
                            {
                                title: 'BFS 수행 및 출력',
                                desc: 'memset으로 visited 초기화 후 BFS 별도 수행',
                                code: `int main() {
    scanf("%d %d %d", &N, &M, &V);
    for (int i = 0; i < M; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    for (int i = 1; i <= N; i++)
        sort(graph[i].begin(), graph[i].end());

    dfs(V);

    // BFS: visited를 초기화하고 다시 탐색
    memset(vis, false, sizeof(vis));
    queue<int> q;
    q.push(V); vis[V] = true;
    while (!q.empty()) {
        int v = q.front(); q.pop();
        bfs_result.push_back(v);
        for (int u : graph[v]) {
            if (!vis[u]) { vis[u] = true; q.push(u); }
        }
    }

    for (int i = 0; i < (int)dfs_result.size(); i++)
        printf(i ? " %d" : "%d", dfs_result[i]);
    puts("");
    for (int i = 0; i < (int)bfs_result.size(); i++)
        printf(i ? " %d" : "%d", bfs_result[i]);
    puts("");
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1012',
            title: 'BOJ 1012 - 유기농 배추',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1012',
            simIntro: '배추밭을 탐색하며 연결된 배추 영역(연결 요소)을 카운트하는 과정입니다.',
            sim: {
                type: 'cabbage'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>차세대 영농인 한나는 강원도 고랭지에서 , , , 유기농 배추를 재배하기로 하였다. 농약을 쓰지 않고 배추를 재배하려면 배추를 해충으로부터 보호하는 것이 중요하기 때문에, 한나는 해충 방지에 효과적인 배추흰지렁이를 구입하기로 결심한다. 이 지렁이는 배추근처에 서식하며 해충을 잡아 먹음으로써 배추를 보호한다.</p>
                <p>어떤 배추에 배추흰지렁이가 한 마리라도 살고 있으면 이 지렁이는 인접한 다른 배추로 이동할 수 있어, 그 배추들 역시 해충으로부터 보호받을 수 있다. 한 배추의 상하좌우 네 방향에 다른 배추가 위치한 경우에 서로 인접해있는 것이다.</p>
                <p>한나가 배추를 재배하는 땅은 고르지 못해서 배추를 군데군데 , 심어 놓았다. 배추들이 모여있는 곳에는 배추흰지렁이가 한 마리만 있으면 되므로 서로 인접해있는 배추들이 몇 군데에 퍼져있는지 조사하면 총 몇 마리의 지렁이가 필요한지 알 수 있다. 예를 들어 배추밭이 아래와 같이 구성되어 있으면 최소 5마리의 배추흰지렁이가 필요하다.</p>
                <h4>입력</h4>
                <p>입력의 첫 줄에는 테스트 케이스의 개수 T가 주어진다. 그 다음 줄부터 각각의 테스트 케이스에 대해 첫째 줄에는 배추를 심은 배추밭의 가로길이 M(1 ≤ M ≤ 50)과 세로길이 N(1 ≤ N ≤ 50), 그리고 배추가 심어져 있는 위치의 개수 K(1 ≤ K ≤ 2500)이 주어진다. 그 다음 K줄에는 배추의 위치 X(0 ≤ X ≤ M-1), Y(0 ≤ Y ≤ N-1)가 주어진다. 두 배추의 위치가 같은 경우는 없다.</p>
                <h4>출력</h4>
                <p>각 테스트 케이스에 대해 필요한 최소의 배추흰지렁이 마리 수를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>1
5 3 6
0 2
1 2
2 2
3 2
4 2
4 0</pre></div>
                    <div><strong>출력</strong><pre>2</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ T ≤ 10</li>
                    <li>1 ≤ M, N ≤ 50</li>
                    <li>1 ≤ K ≤ 2,500</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '배추밭을 쭉 훑으면서 배추가 있는 칸(1)을 만나면, 거기서부터 상하좌우로 연결된 배추를 전부 찾아야 해요.<br><br>이건 <strong>"연결된 덩어리가 몇 개인가?"</strong>를 묻는 문제네요! 한 덩어리에 지렁이 한 마리면 되니까요.<br><br><div style="display:inline-grid;grid-template-columns:repeat(5,28px);gap:2px;padding:8px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);"><span style="text-align:center;padding:4px;background:var(--green);color:white;border-radius:3px;font-size:0.75rem;">1</span><span style="text-align:center;padding:4px;background:var(--green);color:white;border-radius:3px;font-size:0.75rem;">1</span><span style="text-align:center;padding:4px;background:var(--bg2);color:var(--text3);border-radius:3px;font-size:0.75rem;">0</span><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">1</span><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">1</span><span style="text-align:center;padding:4px;background:var(--bg2);color:var(--text3);border-radius:3px;font-size:0.75rem;">0</span><span style="text-align:center;padding:4px;background:var(--bg2);color:var(--text3);border-radius:3px;font-size:0.75rem;">0</span><span style="text-align:center;padding:4px;background:var(--bg2);color:var(--text3);border-radius:3px;font-size:0.75rem;">0</span><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">1</span><span style="text-align:center;padding:4px;background:var(--bg2);color:var(--text3);border-radius:3px;font-size:0.75rem;">0</span></div> <span style="font-size:0.82rem;color:var(--text2);">← 2개 덩어리 = 지렁이 2마리</span>'
                },
                {
                    title: '근데 어떻게 덩어리를 세지?',
                    content: '격자를 (0,0)부터 쭉 돌면서 배추(1)를 만날 때마다, 그 배추와 연결된 모든 배추를 BFS/DFS로 방문 처리합니다.<br><br>BFS/DFS를 <strong>새로 시작한 횟수</strong> = 덩어리(연결 요소) 수 = 필요한 지렁이 수!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '1. 격자를 순회하며 방문하지 않은 배추(1)를 발견<br>2. 그 칸에서 BFS 시작 → 연결된 배추 모두 방문 처리<br>3. count += 1<br>4. 격자 전체를 다 돌 때까지 반복<br><br>4방향 이동: <code>dx = [0, 0, 1, -1]</code>, <code>dy = [1, -1, 0, 0]</code>'
                },
                {
                    title: '주의할 점',
                    content: '테스트 케이스가 여러 개이므로 매번 <strong>visited 배열을 초기화</strong>해야 해요!<br><br>또한 좌표가 (x, y) 형태로 주어지므로 <code>grid[y][x] = 1</code>로 저장해야 합니다. 행(row)이 y, 열(column)이 x인 거 헷갈리지 마세요!'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]

T = int(input())
for _ in range(T):
    M, N, K = map(int, input().split())
    grid = [[0] * M for _ in range(N)]
    for _ in range(K):
        x, y = map(int, input().split())
        grid[y][x] = 1

    visited = [[False] * M for _ in range(N)]
    count = 0

    for r in range(N):
        for c in range(M):
            if grid[r][c] == 1 and not visited[r][c]:
                # BFS로 연결된 배추 모두 방문
                queue = deque([(r, c)])
                visited[r][c] = True
                while queue:
                    cr, cc = queue.popleft()
                    for d in range(4):
                        nr, nc = cr + dx[d], cc + dy[d]
                        if 0 <= nr < N and 0 <= nc < M:
                            if grid[nr][nc] == 1 and not visited[nr][nc]:
                                visited[nr][nc] = True
                                queue.append((nr, nc))
                count += 1

    print(count)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int dx[] = {0,0,1,-1};
int dy[] = {1,-1,0,0};

int main() {
    int T; scanf("%d", &T);
    while (T--) {
        int M, N, K;
        scanf("%d %d %d", &M, &N, &K);
        vector<vector<int>> grid(N, vector<int>(M, 0));
        vector<vector<bool>> vis(N, vector<bool>(M, false));
        for (int i = 0; i < K; i++) {
            int x, y; scanf("%d %d", &x, &y);
            grid[y][x] = 1;
        }
        int count = 0;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < M; c++) {
                if (grid[r][c] == 1 && !vis[r][c]) {
                    queue<pair<int,int>> q;
                    q.push({r, c}); vis[r][c] = true;
                    while (!q.empty()) {
                        auto [cr, cc] = q.front(); q.pop();
                        for (int d = 0; d < 4; d++) {
                            int nr = cr+dx[d], nc = cc+dy[d];
                            if (nr>=0&&nr<N&&nc>=0&&nc<M&&grid[nr][nc]==1&&!vis[nr][nc]) {
                                vis[nr][nc] = true;
                                q.push({nr, nc});
                            }
                        }
                    }
                    count++;
                }
            }
        }
        printf("%d\\n", count);
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'BFS 연결 요소',
                    description: '배추밭을 BFS로 탐색하며 연결된 배추 영역의 개수를 셉니다.',
                    timeComplexity: 'O(N * M)',
                    spaceComplexity: 'O(N * M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]

T = int(input())
for _ in range(T):
    M, N, K = map(int, input().split())
    grid = [[0] * M for _ in range(N)]
    for _ in range(K):
        x, y = map(int, input().split())
        grid[y][x] = 1

    visited = [[False] * M for _ in range(N)]
    count = 0

    for r in range(N):
        for c in range(M):
            if grid[r][c] == 1 and not visited[r][c]:
                # BFS로 연결된 배추 모두 방문
                queue = deque([(r, c)])
                visited[r][c] = True
                while queue:
                    cr, cc = queue.popleft()
                    for d in range(4):
                        nr, nc = cr + dx[d], cc + dy[d]
                        if 0 <= nr < N and 0 <= nc < M:
                            if grid[nr][nc] == 1 and not visited[nr][nc]:
                                visited[nr][nc] = True
                                queue.append((nr, nc))
                count += 1

    print(count)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int dx[] = {0,0,1,-1};
int dy[] = {1,-1,0,0};

int main() {
    int T; scanf("%d", &T);
    while (T--) {
        int M, N, K;
        scanf("%d %d %d", &M, &N, &K);
        vector<vector<int>> grid(N, vector<int>(M, 0));
        vector<vector<bool>> vis(N, vector<bool>(M, false));
        for (int i = 0; i < K; i++) {
            int x, y; scanf("%d %d", &x, &y);
            grid[y][x] = 1;
        }
        int count = 0;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < M; c++) {
                if (grid[r][c] == 1 && !vis[r][c]) {
                    queue<pair<int,int>> q;
                    q.push({r, c}); vis[r][c] = true;
                    while (!q.empty()) {
                        auto [cr, cc] = q.front(); q.pop();
                        for (int d = 0; d < 4; d++) {
                            int nr = cr+dx[d], nc = cc+dy[d];
                            if (nr>=0&&nr<N&&nc>=0&&nc<M&&grid[nr][nc]==1&&!vis[nr][nc]) {
                                vis[nr][nc] = true;
                                q.push({nr, nc});
                            }
                        }
                    }
                    count++;
                }
            }
        }
        printf("%d\\n", count);
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 맵 구성',
                                desc: '테스트 케이스마다 배추밭 격자를 생성합니다.',
                                code: `import sys
from collections import deque
input = sys.stdin.readline

T = int(input())
for _ in range(T):
    M, N, K = map(int, input().split())
    field = [[0] * M for _ in range(N)]
    for _ in range(K):
        x, y = map(int, input().split())
        field[y][x] = 1`
                            },
                            {
                                title: 'BFS 함수 정의',
                                desc: '배추 1을 만나면 BFS로 연결된 영역을 모두 방문합니다.',
                                code: `    dx = [0, 0, 1, -1]
    dy = [1, -1, 0, 0]
    visited = [[False]*M for _ in range(N)]
    def bfs(sy, sx):
        q = deque([(sy, sx)])
        visited[sy][sx] = True
        while q:
            y, x = q.popleft()
            for d in range(4):
                ny, nx = y+dy[d], x+dx[d]
                if 0<=ny<N and 0<=nx<M and not visited[ny][nx] and field[ny][nx]==1:
                    visited[ny][nx] = True
                    q.append((ny, nx))`
                            },
                            {
                                title: '연결 요소 카운트',
                                desc: '미방문 배추를 발견할 때마다 BFS 시작 → 지렁이 수 증가.',
                                code: `    count = 0
    for i in range(N):
        for j in range(M):
            if field[i][j] == 1 and not visited[i][j]:
                bfs(i, j)
                count += 1
    print(count)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 맵 구성',
                                desc: 'pair<int,int>로 BFS 큐 구성',
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

int main() {
    int T;
    scanf("%d", &T);
    while (T--) {
        int M, N, K;
        scanf("%d %d %d", &M, &N, &K);
        vector<vector<int>> field(N, vector<int>(M, 0));
        vector<vector<bool>> vis(N, vector<bool>(M, false));
        for (int i = 0; i < K; i++) {
            int x, y;
            scanf("%d %d", &x, &y);
            field[y][x] = 1;
        }`
                            },
                            {
                                title: 'BFS 함수 정의',
                                desc: 'queue<pair<int,int>>와 structured binding 사용',
                                code: `        int count = 0;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < M; c++) {
                if (field[r][c] == 1 && !vis[r][c]) {
                    // BFS로 연결된 배추 모두 방문
                    queue<pair<int,int>> q;
                    q.push({r, c});
                    vis[r][c] = true;
                    while (!q.empty()) {
                        auto [cr, cc] = q.front(); q.pop();
                        for (int d = 0; d < 4; d++) {
                            int nr = cr+dx[d], nc = cc+dy[d];
                            if (nr>=0 && nr<N && nc>=0 && nc<M
                                && field[nr][nc]==1 && !vis[nr][nc]) {
                                vis[nr][nc] = true;
                                q.push({nr, nc});
                            }
                        }
                    }`
                            },
                            {
                                title: '연결 요소 카운트',
                                desc: 'BFS가 끝날 때마다 count를 증가시켜 영역 수를 셉니다.',
                                code: `                    count++;
                }
            }
        }
        printf("%d\\n", count);
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
            id: 'boj-2667',
            title: 'BOJ 2667 - 단지번호붙이기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2667',
            simIntro: '지도에서 연결된 집 단지를 찾고, 각 단지의 크기를 계산하는 과정입니다.',
            sim: {
                type: 'complex'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p><그림 1>과 같이 정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다. 철수는 이 지도를 가지고 연결된 집의 모임인 단지를 정의하고, 단지에 번호를 붙이려 한다. 여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다. 대각선상에 집이 있는 경우는 연결된 것이 아니다.</p>
                <p>지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫 번째 줄에는 지도의 크기 N(정사각형이므로 가로와 세로의 크기는 같으며 5 ≤ N ≤ 25)이 입력되고, 그 다음 N줄에는 각각 N개의 자료(0 혹은 1)가 입력된다.</p>
                <h4>출력</h4>
                <p>첫 번째 줄에는 총 단지수를 출력하시오. 그리고 각 단지내 집의 수를 오름차순으로 정렬하여 한 줄에 하나씩 출력하시오.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>7
0110100
0110101
1110101
0000111
0100000
0111110
0111000</pre></div>
                    <div><strong>출력</strong><pre>3
7
8
9</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>5 ≤ N ≤ 25</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '1012번(유기농 배추)처럼 연결된 집 덩어리(단지)를 찾으면 되겠다! 격자를 훑으면서 집(1)을 만나면 BFS/DFS로 연결된 집을 전부 탐색하고...'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '1012번과 달리 이번에는 단지의 <strong>개수</strong>뿐만 아니라, 각 단지에 속하는 <strong>집의 수</strong>도 구해야 해요!<br><br>그리고 결과를 <strong>오름차순 정렬</strong>해서 출력해야 합니다.<br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;"><div style="margin-bottom:4px;">BFS 탐색 중 방문 칸 수를 <code>cnt</code>로 세기:</div><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;"><span style="padding:3px 10px;background:var(--accent);color:white;border-radius:4px;">단지1: 7</span><span style="padding:3px 10px;background:#00b894;color:white;border-radius:4px;">단지2: 8</span><span style="padding:3px 10px;background:var(--yellow);color:#333;border-radius:4px;">단지3: 9</span><span style="color:var(--text3);">→ 정렬: 7, 8, 9</span></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: 'BFS를 돌릴 때 방문한 칸의 수를 세면 됩니다:<br>1. 격자 순회 중 방문하지 않은 집(1) 발견<br>2. BFS 시작, 방문하는 칸마다 <code>cnt += 1</code><br>3. BFS 끝나면 <code>sizes.append(cnt)</code><br>4. 모든 탐색 후 <code>sizes</code>를 오름차순 정렬하여 출력<br><br><span class="lang-py">Python: <code>sizes.sort()</code>로 정렬 후 출력</span><span class="lang-cpp">C++: <code>sort(sizes.begin(), sizes.end())</code>로 정렬 후 출력</span>'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

N = int(input())
grid = []
for _ in range(N):
    grid.append(list(map(int, input().strip())))

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
visited = [[False] * N for _ in range(N)]
sizes = []

for r in range(N):
    for c in range(N):
        if grid[r][c] == 1 and not visited[r][c]:
            queue = deque([(r, c)])
            visited[r][c] = True
            cnt = 0
            while queue:
                cr, cc = queue.popleft()
                cnt += 1
                for d in range(4):
                    nr, nc = cr + dx[d], cc + dy[d]
                    if 0 <= nr < N and 0 <= nc < N:
                        if grid[nr][nc] == 1 and not visited[nr][nc]:
                            visited[nr][nc] = True
                            queue.append((nr, nc))
            sizes.append(cnt)

sizes.sort()
print(len(sizes))
for s in sizes:
    print(s)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N;
int grid[25][25];
bool vis[25][25];
int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};

int main() {
    scanf("%d", &N);
    for (int i = 0; i < N; i++) {
        char s[30]; scanf("%s", s);
        for (int j = 0; j < N; j++) grid[i][j] = s[j] - '0';
    }

    vector<int> sizes;
    for (int r = 0; r < N; r++) for (int c = 0; c < N; c++) {
        if (grid[r][c] == 1 && !vis[r][c]) {
            queue<pair<int,int>> q;
            q.push({r, c}); vis[r][c] = true;
            int cnt = 0;
            while (!q.empty()) {
                auto [cr, cc] = q.front(); q.pop();
                cnt++;
                for (int d = 0; d < 4; d++) {
                    int nr = cr+dx[d], nc = cc+dy[d];
                    if (nr>=0&&nr<N&&nc>=0&&nc<N&&grid[nr][nc]==1&&!vis[nr][nc]) {
                        vis[nr][nc] = true; q.push({nr,nc});
                    }
                }
            }
            sizes.push_back(cnt);
        }
    }
    sort(sizes.begin(), sizes.end());
    printf("%d\\n", (int)sizes.size());
    for (int s : sizes) printf("%d\\n", s);
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'BFS 연결 요소 + 크기',
                    description: '지도에서 BFS로 연결된 집 단지를 찾고 각 단지의 크기를 오름차순 출력합니다.',
                    timeComplexity: 'O(N^2)',
                    spaceComplexity: 'O(N^2)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

N = int(input())
grid = []
for _ in range(N):
    grid.append(list(map(int, input().strip())))

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
visited = [[False] * N for _ in range(N)]
sizes = []

for r in range(N):
    for c in range(N):
        if grid[r][c] == 1 and not visited[r][c]:
            queue = deque([(r, c)])
            visited[r][c] = True
            cnt = 0
            while queue:
                cr, cc = queue.popleft()
                cnt += 1
                for d in range(4):
                    nr, nc = cr + dx[d], cc + dy[d]
                    if 0 <= nr < N and 0 <= nc < N:
                        if grid[nr][nc] == 1 and not visited[nr][nc]:
                            visited[nr][nc] = True
                            queue.append((nr, nc))
            sizes.append(cnt)

sizes.sort()
print(len(sizes))
for s in sizes:
    print(s)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N;
int grid[25][25];
bool vis[25][25];
int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};

int main() {
    scanf("%d", &N);
    for (int i = 0; i < N; i++) {
        char s[30]; scanf("%s", s);
        for (int j = 0; j < N; j++) grid[i][j] = s[j] - '0';
    }

    vector<int> sizes;
    for (int r = 0; r < N; r++) for (int c = 0; c < N; c++) {
        if (grid[r][c] == 1 && !vis[r][c]) {
            queue<pair<int,int>> q;
            q.push({r, c}); vis[r][c] = true;
            int cnt = 0;
            while (!q.empty()) {
                auto [cr, cc] = q.front(); q.pop();
                cnt++;
                for (int d = 0; d < 4; d++) {
                    int nr = cr+dx[d], nc = cc+dy[d];
                    if (nr>=0&&nr<N&&nc>=0&&nc<N&&grid[nr][nc]==1&&!vis[nr][nc]) {
                        vis[nr][nc] = true; q.push({nr,nc});
                    }
                }
            }
            sizes.push_back(cnt);
        }
    }
    sort(sizes.begin(), sizes.end());
    printf("%d\\n", (int)sizes.size());
    for (int s : sizes) printf("%d\\n", s);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 지도 구성',
                                desc: '문자열을 리스트로 변환하여 격자를 만듭니다.',
                                code: `import sys
from collections import deque
input = sys.stdin.readline

N = int(input())
board = []
for _ in range(N):
    board.append(list(input().strip()))`
                            },
                            {
                                title: 'BFS 탐색 함수',
                                desc: 'BFS로 연결된 집을 모두 방문하며 단지 크기를 반환합니다.',
                                code: `dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
visited = [[False]*N for _ in range(N)]

def bfs(sy, sx):
    q = deque([(sy, sx)])
    visited[sy][sx] = True
    cnt = 1
    while q:
        y, x = q.popleft()
        for d in range(4):
            ny, nx = y+dy[d], x+dx[d]
            if 0<=ny<N and 0<=nx<N and not visited[ny][nx] and board[ny][nx]=="1":
                visited[ny][nx] = True
                q.append((ny, nx))
                cnt += 1
    return cnt`
                            },
                            {
                                title: '단지 찾기 및 출력',
                                desc: '각 단지 크기를 수집하고 오름차순 정렬하여 출력합니다.',
                                code: `sizes = []
for i in range(N):
    for j in range(N):
        if board[i][j] == "1" and not visited[i][j]:
            sizes.append(bfs(i, j))
sizes.sort()
print(len(sizes))
for s in sizes:
    print(s)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 지도 구성',
                                desc: 'char 배열로 문자열 입력 후 숫자 변환',
                                code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N;
int grid[25][25];
bool vis[25][25];
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

int main() {
    scanf("%d", &N);
    for (int i = 0; i < N; i++) {
        char s[30];
        scanf("%s", s);
        for (int j = 0; j < N; j++)
            grid[i][j] = s[j] - '0'; // 문자 -> 숫자 변환
    }`
                            },
                            {
                                title: 'BFS 탐색 함수',
                                desc: 'pair<int,int> 큐로 격자 BFS',
                                code: `    vector<int> sizes;
    for (int r = 0; r < N; r++) {
        for (int c = 0; c < N; c++) {
            if (grid[r][c] == 1 && !vis[r][c]) {
                queue<pair<int,int>> q;
                q.push({r, c});
                vis[r][c] = true;
                int cnt = 0;
                while (!q.empty()) {
                    auto [cr, cc] = q.front(); q.pop();
                    cnt++;
                    for (int d = 0; d < 4; d++) {
                        int nr = cr+dx[d], nc = cc+dy[d];
                        if (nr>=0 && nr<N && nc>=0 && nc<N
                            && grid[nr][nc]==1 && !vis[nr][nc]) {
                            vis[nr][nc] = true;
                            q.push({nr, nc});
                        }
                    }
                }
                sizes.push_back(cnt);
            }
        }
    }`
                            },
                            {
                                title: '단지 찾기 및 출력',
                                desc: '크기 배열을 정렬하여 단지 수와 각 크기를 출력합니다.',
                                code: `    sort(sizes.begin(), sizes.end());
    printf("%d\\n", (int)sizes.size());
    for (int s : sizes)
        printf("%d\\n", s);
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2178',
            title: 'BOJ 2178 - 미로 탐색',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2178',
            simIntro: '미로에서 (1,1)부터 (N,M)까지 BFS 최단 경로를 탐색하는 과정입니다.',
            sim: {
                type: 'maze'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N×M크기의 배열로 표현되는 미로가 있다. 미로에서 1은 이동할 수 있는 칸을 나타내고, 0은 이동할 수 없는 칸을 나타낸다. 이러한 미로가 주어졌을 때, (1, 1)에서 출발하여 (N, M)의 위치로 이동할 때 지나야 하는 최소의 칸 수를 구하는 프로그램을 작성하시오. 한 칸에서 다른 칸으로 이동할 때, 서로 인접한 칸으로만 이동할 수 있다.</p>
                <p>위의 예에서는 15칸을 지나야 (N, M)의 위치로 이동할 수 있다. 칸을 셀 때에는 시작 위치와 도착 위치도 포함한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 두 정수 N, M(2 ≤ N, M ≤ 100)이 주어진다. 다음 N개의 줄에는 M개의 정수로 미로가 주어진다. 각각의 수들은 <strong>붙어서</strong> 입력으로 주어진다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 지나야 하는 최소의 칸 수를 출력한다. 항상 도착위치로 이동할 수 있는 경우만 입력으로 주어진다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 6
101111
101010
101011
111011</pre></div>
                    <div><strong>출력</strong><pre>15</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 6
110110
110110
111111
111101</pre></div>
                    <div><strong>출력</strong><pre>9</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>2 ≤ N, M ≤ 100</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '미로에서 (1,1)부터 (N,M)까지 가는 <strong>최단 경로</strong>를 찾아야 해요. DFS로 모든 경로를 탐색하고 그중 가장 짧은 걸 고르면 되지 않을까?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'DFS는 모든 가능한 경로를 탐색하니까 시간이 오래 걸려요. 미로가 100x100이면 경로 수가 엄청나게 많아질 수 있어요!<br><br>최단 거리를 구할 때는 <strong>BFS</strong>가 훨씬 효율적입니다. BFS는 가까운 곳부터 탐색하니까, 도착점에 처음 도달했을 때가 바로 최단 거리!<br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;"><span style="color:var(--red);">DFS:</span> <span style="color:var(--text2);">모든 경로 탐색 → 느림</span></div><div style="display:flex;gap:8px;align-items:center;margin-top:4px;flex-wrap:wrap;"><span style="color:var(--green);font-weight:600;">BFS:</span> <span style="color:var(--text);">가까운 곳부터 → 처음 도달 = 최단!</span></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '(0,0)에서 BFS를 시작하고, 이동할 때마다 거리를 +1씩 기록합니다:<br><code>dist[nr][nc] = dist[r][c] + 1</code><br><br>시작칸도 포함해서 세니까 <code>dist[0][0] = 1</code>로 시작하고, <code>dist[N-1][M-1]</code>이 정답입니다.'
                },
                {
                    title: '구현 팁',
                    content: '입력이 공백 없이 붙어 있으므로 한 줄씩 읽어서 문자 단위로 파싱해야 해요:<br><span class="lang-py">Python: <code>list(map(int, input().strip()))</code>으로 각 자릿수를 리스트로 변환</span><span class="lang-cpp">C++: <code>char s[110]; scanf("%s", s);</code>로 문자열로 읽은 뒤 <code>s[j] - \'0\'</code>으로 숫자 변환</span>'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
grid = []
for _ in range(N):
    grid.append(list(map(int, input().strip())))

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
dist = [[-1] * M for _ in range(N)]
dist[0][0] = 1
queue = deque([(0, 0)])

while queue:
    r, c = queue.popleft()
    for d in range(4):
        nr, nc = r + dx[d], c + dy[d]
        if 0 <= nr < N and 0 <= nc < M:
            if grid[nr][nc] == 1 and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))

print(dist[N-1][M-1])`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<string> grid(N);
    for (int i = 0; i < N; i++) { char s[110]; scanf("%s", s); grid[i] = s; }

    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    vector<vector<int>> dist(N, vector<int>(M, -1));
    dist[0][0] = 1;
    queue<pair<int,int>> q;
    q.push({0, 0});

    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int nr = r+dx[d], nc = c+dy[d];
            if (nr>=0&&nr<N&&nc>=0&&nc<M&&grid[nr][nc]=='1'&&dist[nr][nc]==-1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.push({nr, nc});
            }
        }
    }
    printf("%d\\n", dist[N-1][M-1]);
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'BFS 최단 거리',
                    description: 'BFS로 미로의 (1,1)에서 (N,M)까지 최단 경로를 탐색합니다.',
                    timeComplexity: 'O(N * M)',
                    spaceComplexity: 'O(N * M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
grid = []
for _ in range(N):
    grid.append(list(map(int, input().strip())))

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
dist = [[-1] * M for _ in range(N)]
dist[0][0] = 1
queue = deque([(0, 0)])

while queue:
    r, c = queue.popleft()
    for d in range(4):
        nr, nc = r + dx[d], c + dy[d]
        if 0 <= nr < N and 0 <= nc < M:
            if grid[nr][nc] == 1 and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))

print(dist[N-1][M-1])`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<string> grid(N);
    for (int i = 0; i < N; i++) { char s[110]; scanf("%s", s); grid[i] = s; }

    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    vector<vector<int>> dist(N, vector<int>(M, -1));
    dist[0][0] = 1;
    queue<pair<int,int>> q;
    q.push({0, 0});

    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int nr = r+dx[d], nc = c+dy[d];
            if (nr>=0&&nr<N&&nc>=0&&nc<M&&grid[nr][nc]=='1'&&dist[nr][nc]==-1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.push({nr, nc});
            }
        }
    }
    printf("%d\\n", dist[N-1][M-1]);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 미로 구성',
                                desc: '공백 없이 붙어있는 입력을 리스트로 변환합니다.',
                                code: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
maze = []
for _ in range(N):
    maze.append(list(input().strip()))`
                            },
                            {
                                title: 'BFS 탐색',
                                desc: '시작칸 (0,0)을 1로 세팅하고 BFS를 준비합니다.',
                                code: `dist = [[0]*M for _ in range(N)]
dist[0][0] = 1
q = deque([(0, 0)])
dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]`
                            },
                            {
                                title: 'BFS 루프 및 출력',
                                desc: '인접 칸의 거리를 +1씩 기록하며 도착점 거리를 출력합니다.',
                                code: `while q:
    y, x = q.popleft()
    for d in range(4):
        ny, nx = y+dy[d], x+dx[d]
        if 0<=ny<N and 0<=nx<M and maze[ny][nx]=="1" and dist[ny][nx]==0:
            dist[ny][nx] = dist[y][x] + 1
            q.append((ny, nx))
print(dist[N-1][M-1])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 미로 구성',
                                desc: 'char 배열로 문자열 입력, string 대신 scanf',
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<string> maze(N);
    for (int i = 0; i < N; i++) {
        char s[110];
        scanf("%s", s);
        maze[i] = s;
    }`
                            },
                            {
                                title: 'BFS 탐색',
                                desc: 'dist를 -1로 초기화, 시작칸은 1로 세팅합니다.',
                                code: `    int dx[] = {0, 0, 1, -1};
    int dy[] = {1, -1, 0, 0};
    // dist 배열: -1이면 미방문, 1부터 시작(시작칸 포함)
    vector<vector<int>> dist(N, vector<int>(M, -1));
    dist[0][0] = 1;
    queue<pair<int,int>> q;
    q.push({0, 0});`
                            },
                            {
                                title: 'BFS 루프 및 출력',
                                desc: '4방향 탐색으로 최단 거리를 기록하고 도착점 값을 출력합니다.',
                                code: `    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int nr = r+dx[d], nc = c+dy[d];
            if (nr>=0 && nr<N && nc>=0 && nc<M
                && maze[nr][nc]=='1' && dist[nr][nc]==-1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.push({nr, nc});
            }
        }
    }
    printf("%d\\n", dist[N-1][M-1]);
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1697',
            title: 'BOJ 1697 - 숨바꼭질',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1697',
            simIntro: '수빈이가 동생을 찾기 위해 BFS로 최소 이동 횟수를 구하는 과정입니다.',
            sim: {
                type: 'hide'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.</p>
                <p>수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.</p>
                <h4>출력</h4>
                <p>수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 17</pre></div>
                    <div><strong>출력</strong><pre>4</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>0 0</pre></div>
                    <div><strong>출력</strong><pre>0</pre></div>
                </div><p class="example-explain">수빈이와 동생이 같은 위치에 있으면 이동할 필요가 없습니다.</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>0 ≤ N ≤ 100,000</li>
                    <li>0 ≤ K ≤ 100,000</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '수빈이는 현재 위치 N에서 X-1, X+1, 2*X 세 가지로 이동할 수 있어요. 모든 가능한 이동을 시도해서 동생 K에 도달하면 되지 않을까?<br><br>근데 이건 어디서 많이 본 것 같지 않아요?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '무작정 모든 이동을 시도하면 같은 위치를 계속 왔다 갔다 할 수 있어요. 그리고 <strong>가장 빠른</strong> 시간을 구해야 하니까...<br><br>잠깐, 이건 <strong>그래프 문제</strong>로 바꿀 수 있어요! 각 좌표를 <strong>정점</strong>, 이동(X-1, X+1, 2X)을 <strong>간선</strong>으로 생각하면 BFS로 최단 거리를 구할 수 있습니다!<br><br><div style="display:flex;gap:6px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;flex-wrap:wrap;"><div style="width:30px;height:30px;border-radius:50%;background:var(--accent);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">5</div><span style="color:var(--text3);">→</span><div style="padding:2px 8px;background:var(--bg2);border-radius:4px;font-size:0.8rem;">-1</div><div style="padding:2px 8px;background:var(--bg2);border-radius:4px;font-size:0.8rem;">+1</div><div style="padding:2px 8px;background:var(--yellow);color:#333;border-radius:4px;font-size:0.8rem;font-weight:600;">x2</div><span style="color:var(--text3);margin-left:4px;">← 3가지 이동 = 3개 간선</span></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: 'N에서 BFS를 시작하고, 각 위치에서 세 방향으로 이동합니다:<br>1. X-1 (뒤로 걷기)<br>2. X+1 (앞으로 걷기)<br>3. 2*X (순간이동)<br><br>BFS이니까 K에 처음 도달했을 때가 바로 최소 시간입니다!<br>예: 5 → 10 → 9 → 18 → 17 (4초)'
                },
                {
                    title: '주의할 점',
                    content: '위치 범위가 0~100,000이므로 <code>dist</code> 배열 크기를 100,001로 잡아야 해요.<br>이동한 위치가 0 미만이거나 100,000을 초과하면 무시해야 합니다!<br><br><span class="lang-py">Python: <code>for nx in (x-1, x+1, x*2):</code>로 세 방향 이동</span><span class="lang-cpp">C++: <code>for (int nx : {x-1, x+1, 2*x}):</code>로 세 방향 이동</span>'
                }
            ],
            templates: {
                python: `from collections import deque

N, K = map(int, input().split())

MAX = 100001
dist = [-1] * MAX
dist[N] = 0
queue = deque([N])

while queue:
    x = queue.popleft()
    if x == K:
        print(dist[x])
        break
    for nx in [x - 1, x + 1, 2 * x]:
        if 0 <= nx < MAX and dist[nx] == -1:
            dist[nx] = dist[x] + 1
            queue.append(nx)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int dist[100001];

int main() {
    int N, K;
    scanf("%d %d", &N, &K);
    memset(dist, -1, sizeof(dist));
    dist[N] = 0;
    queue<int> q;
    q.push(N);

    while (!q.empty()) {
        int x = q.front(); q.pop();
        if (x == K) { printf("%d\\n", dist[x]); return 0; }
        for (int nx : {x-1, x+1, 2*x}) {
            if (nx >= 0 && nx <= 100000 && dist[nx] == -1) {
                dist[nx] = dist[x] + 1;
                q.push(nx);
            }
        }
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'BFS 최단 이동',
                    description: '수빈이의 위치에서 +1, -1, *2 이동을 BFS로 탐색하여 최소 시간을 구합니다.',
                    timeComplexity: 'O(max_pos)',
                    spaceComplexity: 'O(max_pos)',
                    templates: {
                        python: `from collections import deque

N, K = map(int, input().split())

MAX = 100001
dist = [-1] * MAX
dist[N] = 0
queue = deque([N])

while queue:
    x = queue.popleft()
    if x == K:
        print(dist[x])
        break
    for nx in [x - 1, x + 1, 2 * x]:
        if 0 <= nx < MAX and dist[nx] == -1:
            dist[nx] = dist[x] + 1
            queue.append(nx)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int dist[100001];

int main() {
    int N, K;
    scanf("%d %d", &N, &K);
    memset(dist, -1, sizeof(dist));
    dist[N] = 0;
    queue<int> q;
    q.push(N);

    while (!q.empty()) {
        int x = q.front(); q.pop();
        if (x == K) { printf("%d\\n", dist[x]); return 0; }
        for (int nx : {x-1, x+1, 2*x}) {
            if (nx >= 0 && nx <= 100000 && dist[nx] == -1) {
                dist[nx] = dist[x] + 1;
                q.push(nx);
            }
        }
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: '수빈이 위치 N과 동생 위치 K를 입력받습니다.',
                                code: `from collections import deque

N, K = map(int, input().split())`
                            },
                            {
                                title: 'BFS 탐색',
                                desc: 'visited를 -1로 초기화, 시작점을 0으로 설정합니다.',
                                code: `MAX = 100001
visited = [-1] * MAX
visited[N] = 0
q = deque([N])`
                            },
                            {
                                title: 'BFS 루프 및 출력',
                                desc: 'X-1, X+1, 2*X 세 방향 이동을 BFS로 탐색합니다.',
                                code: `while q:
    x = q.popleft()
    if x == K:
        print(visited[x])
        break
    for nx in (x-1, x+1, x*2):
        if 0 <= nx < MAX and visited[nx] == -1:
            visited[nx] = visited[x] + 1
            q.append(nx)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: '전역 dist 배열로 0~100000 범위의 거리를 관리합니다.',
                                code: `#include <iostream>
#include <queue>
#include <cstring>
using namespace std;

int dist[100001]; // 각 위치까지의 최소 이동 횟수

int main() {
    int N, K;
    scanf("%d %d", &N, &K);`
                            },
                            {
                                title: 'BFS 탐색',
                                desc: 'memset으로 -1 초기화, initializer list로 3방향 이동',
                                code: `    memset(dist, -1, sizeof(dist));
    dist[N] = 0;
    queue<int> q;
    q.push(N);`
                            },
                            {
                                title: 'BFS 루프 및 출력',
                                desc: '목표 위치 K에 도달하면 최소 이동 횟수를 출력합니다.',
                                code: `    while (!q.empty()) {
        int x = q.front(); q.pop();
        if (x == K) {
            printf("%d\\n", dist[x]);
            return 0;
        }
        // X-1, X+1, 2*X 세 방향 이동
        for (int nx : {x-1, x+1, 2*x}) {
            if (nx >= 0 && nx <= 100000 && dist[nx] == -1) {
                dist[nx] = dist[x] + 1;
                q.push(nx);
            }
        }
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
            id: 'boj-7562',
            title: 'BOJ 7562 - 나이트의 이동',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/7562',
            simIntro: '체스판 위 나이트가 BFS로 목표 위치까지 최소 이동 횟수를 구하는 과정입니다.',
            sim: {
                type: 'knight'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>체스판 위에 한 나이트가 놓여져 있다. 나이트가 한 번에 이동할 수 있는 칸은 아래 그림에 나와있다. 나이트가 이동하려고 하는 칸이 주어진다. 나이트는 몇 번 움직이면 이 칸으로 이동할 수 있을까?</p>
                <h4>입력</h4>
                <p>입력의 첫째 줄에는 테스트 케이스의 개수가 주어진다.</p>
                <p>각 테스트 케이스는 세 줄로 이루어져 있다. 첫째 줄에는 체스판의 한 변의 길이 l(4 ≤ l ≤ 300)이 주어진다. 체스판의 크기는 l × l이다. 체스판의 각 칸은 두 수의 쌍 {0, ..., l-1} × {0, ..., l-1}로 나타낼 수 있다. 둘째 줄과 셋째 줄에는 나이트가 현재 있는 칸, 나이트가 이동하려고 하는 칸이 주어진다.</p>
                <h4>출력</h4>
                <p>각 테스트 케이스마다 나이트가 최소 몇 번만에 이동할 수 있는지 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3
8
0 0
7 0
100
0 0
30 50
10
1 1
1 1</pre></div>
                    <div><strong>출력</strong><pre>5
28
0</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>4 ≤ I ≤ 300 (체스판 한 변의 길이)</li>
                    <li>T ≤ 100 (테스트 케이스 수)</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '나이트가 목표 칸까지 가는 <strong>최소 이동 횟수</strong>를 구해야 해요. 나이트는 L자 모양으로 8방향 이동이 가능하죠.<br><br>이전 문제(숨바꼭질)처럼 <strong>최단 거리 = BFS</strong>를 떠올려 봅시다!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '미로 탐색은 상하좌우 4방향이었는데, 나이트는 <strong>8방향</strong>이에요. 이 8방향을 어떻게 표현하지?<br><br>나이트는 가로 2 + 세로 1, 또는 가로 1 + 세로 2로 이동하니까 dx/dy 배열로 8가지 조합을 만들면 됩니다!<br><br><div style="display:inline-grid;grid-template-columns:repeat(5,24px);gap:2px;padding:6px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);"><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;background:var(--yellow);color:#333;font-size:0.7rem;border-radius:3px;">x</span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;background:var(--yellow);color:#333;font-size:0.7rem;border-radius:3px;">x</span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;background:var(--yellow);color:#333;font-size:0.7rem;border-radius:3px;">x</span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;background:var(--yellow);color:#333;font-size:0.7rem;border-radius:3px;">x</span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;background:var(--accent);color:white;font-size:0.7rem;border-radius:3px;font-weight:700;">N</span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;background:var(--yellow);color:#333;font-size:0.7rem;border-radius:3px;">x</span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;background:var(--yellow);color:#333;font-size:0.7rem;border-radius:3px;">x</span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;background:var(--yellow);color:#333;font-size:0.7rem;border-radius:3px;">x</span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span><span style="text-align:center;padding:2px;background:var(--yellow);color:#333;font-size:0.7rem;border-radius:3px;">x</span><span style="text-align:center;padding:2px;font-size:0.7rem;border-radius:3px;"></span></div> <span style="font-size:0.82rem;color:var(--text2);">← 나이트 8방향</span>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '나이트의 8방향 이동:<br><code>dx = [-2, -2, -1, -1, 1, 1, 2, 2]</code><br><code>dy = [-1, 1, -2, 2, -2, 2, -1, 1]</code><br><br>시작칸에서 BFS를 돌리면, 목표칸에 처음 도달했을 때가 최소 이동 횟수입니다. 미로 탐색과 동일한 패턴이에요!'
                },
                {
                    title: '주의할 점',
                    content: '시작 위치와 도착 위치가 같으면 0을 바로 출력해야 해요!<br><br>테스트 케이스가 여러 개이므로, 매번 <code>dist</code> 배열을 새로 초기화해야 합니다.'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

dx = [-2, -2, -1, -1, 1, 1, 2, 2]
dy = [-1, 1, -2, 2, -2, 2, -1, 1]

T = int(input())
for _ in range(T):
    I = int(input())
    sr, sc = map(int, input().split())
    er, ec = map(int, input().split())

    if sr == er and sc == ec:
        print(0)
        continue

    dist = [[-1] * I for _ in range(I)]
    dist[sr][sc] = 0
    queue = deque([(sr, sc)])

    while queue:
        r, c = queue.popleft()
        if r == er and c == ec:
            print(dist[r][c])
            break
        for d in range(8):
            nr, nc = r + dx[d], c + dy[d]
            if 0 <= nr < I and 0 <= nc < I and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int dx[] = {-2,-2,-1,-1,1,1,2,2};
int dy[] = {-1,1,-2,2,-2,2,-1,1};

int main() {
    int T; scanf("%d", &T);
    while (T--) {
        int I; scanf("%d", &I);
        int sr, sc, er, ec;
        scanf("%d %d %d %d", &sr, &sc, &er, &ec);
        if (sr==er && sc==ec) { puts("0"); continue; }

        vector<vector<int>> dist(I, vector<int>(I, -1));
        dist[sr][sc] = 0;
        queue<pair<int,int>> q;
        q.push({sr, sc});

        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            if (r==er && c==ec) { printf("%d\\n", dist[r][c]); break; }
            for (int d = 0; d < 8; d++) {
                int nr = r+dx[d], nc = c+dy[d];
                if (nr>=0&&nr<I&&nc>=0&&nc<I&&dist[nr][nc]==-1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'BFS 나이트 이동',
                    description: '체스판에서 나이트의 8방향 이동을 BFS로 탐색하여 최소 이동 수를 구합니다.',
                    timeComplexity: 'O(L^2)',
                    spaceComplexity: 'O(L^2)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

dx = [-2, -2, -1, -1, 1, 1, 2, 2]
dy = [-1, 1, -2, 2, -2, 2, -1, 1]

T = int(input())
for _ in range(T):
    I = int(input())
    sr, sc = map(int, input().split())
    er, ec = map(int, input().split())

    if sr == er and sc == ec:
        print(0)
        continue

    dist = [[-1] * I for _ in range(I)]
    dist[sr][sc] = 0
    queue = deque([(sr, sc)])

    while queue:
        r, c = queue.popleft()
        if r == er and c == ec:
            print(dist[r][c])
            break
        for d in range(8):
            nr, nc = r + dx[d], c + dy[d]
            if 0 <= nr < I and 0 <= nc < I and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int dx[] = {-2,-2,-1,-1,1,1,2,2};
int dy[] = {-1,1,-2,2,-2,2,-1,1};

int main() {
    int T; scanf("%d", &T);
    while (T--) {
        int I; scanf("%d", &I);
        int sr, sc, er, ec;
        scanf("%d %d %d %d", &sr, &sc, &er, &ec);
        if (sr==er && sc==ec) { puts("0"); continue; }

        vector<vector<int>> dist(I, vector<int>(I, -1));
        dist[sr][sc] = 0;
        queue<pair<int,int>> q;
        q.push({sr, sc});

        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            if (r==er && c==ec) { printf("%d\\n", dist[r][c]); break; }
            for (int d = 0; d < 8; d++) {
                int nr = r+dx[d], nc = c+dy[d];
                if (nr>=0&&nr<I&&nc>=0&&nc<I&&dist[nr][nc]==-1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기화',
                                desc: '나이트의 8방향 이동을 튜플 리스트로 정의합니다.',
                                code: `from collections import deque
import sys
input = sys.stdin.readline

T = int(input())
moves = [(-2,-1),(-2,1),(-1,-2),(-1,2),(1,-2),(1,2),(2,-1),(2,1)]`
                            },
                            {
                                title: 'BFS 탐색',
                                desc: '테스트 케이스마다 dist 배열을 초기화하고 BFS를 준비합니다.',
                                code: `for _ in range(T):
    L = int(input())
    sx, sy = map(int, input().split())
    ex, ey = map(int, input().split())
    dist = [[-1]*L for _ in range(L)]
    dist[sx][sy] = 0
    q = deque([(sx, sy)])`
                            },
                            {
                                title: 'BFS 루프 및 출력',
                                desc: '8방향 이동으로 목표에 도달하면 최소 이동 수를 출력합니다.',
                                code: `    while q:
        x, y = q.popleft()
        if x == ex and y == ey:
            print(dist[x][y])
            break
        for dx, dy in moves:
            nx, ny = x+dx, y+dy
            if 0<=nx<L and 0<=ny<L and dist[nx][ny]==-1:
                dist[nx][ny] = dist[x][y] + 1
                q.append((nx, ny))`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기화',
                                desc: '나이트 8방향 이동을 dx/dy 배열로 정의',
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// 나이트의 8방향 이동
int dx[] = {-2, -2, -1, -1, 1, 1, 2, 2};
int dy[] = {-1, 1, -2, 2, -2, 2, -1, 1};

int main() {
    int T;
    scanf("%d", &T);`
                            },
                            {
                                title: 'BFS 탐색',
                                desc: '시작==도착이면 바로 0 출력, 아니면 BFS 시작합니다.',
                                code: `    while (T--) {
        int L;
        scanf("%d", &L);
        int sr, sc, er, ec;
        scanf("%d %d %d %d", &sr, &sc, &er, &ec);
        if (sr == er && sc == ec) { puts("0"); continue; }

        vector<vector<int>> dist(L, vector<int>(L, -1));
        dist[sr][sc] = 0;
        queue<pair<int,int>> q;
        q.push({sr, sc});`
                            },
                            {
                                title: 'BFS 루프 및 출력',
                                desc: '8방향 BFS로 목표 도달 시 최소 이동 수를 출력합니다.',
                                code: `        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            if (r == er && c == ec) {
                printf("%d\\n", dist[r][c]);
                break;
            }
            for (int d = 0; d < 8; d++) {
                int nr = r+dx[d], nc = c+dy[d];
                if (nr>=0 && nr<L && nc>=0 && nc<L && dist[nr][nc]==-1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
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
            id: 'boj-7576',
            title: 'BOJ 7576 - 토마토',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/7576',
            simIntro: '여러 익은 토마토에서 동시에 BFS를 시작하여 모든 토마토가 익는 최소 일수를 구합니다.',
            sim: {
                type: 'tomato'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림과 같이 격자 모양 상자의 칸에 하나씩 넣어서 창고에 보관한다.</p>
                <p>창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다. 하나의 토마토의 인접한 곳은 왼쪽, 오른쪽, 앞, 뒤 네 방향에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다.</p>
                <p>창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지, 그 최소 일수를 구하는 프로그램을 작성하라. 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다. 정수 1은 익은 토마토, 정수 0은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.</p>
                <p>토마토가 모두 익지는 못하는 상황이면 -1을 출력한다. 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력한다.</p>
                <h4>입력</h4>
                <p>첫 줄에는 상자의 크기를 나타내는 두 정수 M, N이 주어진다. M은 상자의 가로 칸의 수, N은 상자의 세로 칸의 수를 나타낸다. 단, 2 ≤ M, N ≤ 1,000 이다. 둘째 줄부터는 하나의 상자에 저장된 토마토들의 정보가 주어진다. 즉, 둘째 줄부터 N개의 줄에는 상자에 담긴 토마토의 정보가 주어진다. 하나의 줄에는 상자 가로줄에 들어있는 토마토의 상태가 M개의 정수로 주어진다. 정수 1은 익은 토마토, 정수 0은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.</p>
                <p>토마토가 하나 이상 있는 경우만 입력으로 주어진다.</p>
                <h4>출력</h4>
                <p>여러분은 토마토가 모두 익을 때까지의 최소 날짜를 출력해야 한다. 만약, 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면 -1을 출력해야 한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>6 4
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 1</pre></div>
                    <div><strong>출력</strong><pre>8</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>6 4
0 0 -1 0 0 0
0 0 1 0 -1 0
0 0 -1 0 0 0
0 0 0 0 -1 1</pre></div>
                    <div><strong>출력</strong><pre>6</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>6 4
1 -1 0 0 0 0
0 -1 0 0 0 0
0 0 0 0 -1 0
0 0 0 0 -1 1</pre></div>
                    <div><strong>출력</strong><pre>-1</pre></div>
                </div><p class="example-explain">벽(-1)으로 막혀서 일부 토마토에 도달할 수 없습니다.</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>2 ≤ M, N ≤ 1,000</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '익은 토마토 하나를 골라서 BFS를 돌리면... 잠깐, 익은 토마토가 <strong>여러 개</strong>일 수 있잖아! 각 토마토에서 하나씩 BFS를 돌려야 하나?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '익은 토마토마다 따로 BFS를 돌리면 비효율적이에요. 그리고 문제를 자세히 보면, 익은 토마토들이 <strong>동시에</strong> 주변을 익히잖아요!<br><br>즉, 하루에 모든 익은 토마토의 인접 칸이 동시에 익어야 합니다. 하나씩 순서대로 퍼뜨리면 답이 달라져요!<br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;"><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;"><span style="font-weight:600;">다중 시작점 BFS:</span><span style="padding:3px 8px;background:var(--red);color:white;border-radius:4px;">토마토A</span><span style="padding:3px 8px;background:var(--red);color:white;border-radius:4px;">토마토B</span><span style="color:var(--text3);">→ 큐에 동시에!</span></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>다중 시작점 BFS</strong>를 사용합니다! 처음부터 모든 익은 토마토(1)를 큐에 넣고 BFS를 한 번만 돌립니다:<br><br>1. 격자를 읽으면서 값이 1인 칸을 전부 큐에 넣기 (dist = 0)<br>2. BFS: 인접한 안 익은 토마토(0)를 익히며 거리 기록<br>3. BFS 후 아직 0인 칸이 있으면 -1, 없으면 최대 거리가 정답'
                },
                {
                    title: '왜 이게 맞을까?',
                    content: 'BFS는 거리가 가까운 칸부터 처리하니까, 모든 시작점을 동시에 넣으면 자연스럽게 "동시에 퍼지는" 효과가 나요.<br><br>시간 복잡도는 O(N*M) — 각 칸을 딱 한 번만 방문하니까 매우 효율적입니다!'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

M, N = map(int, input().split())
grid = []
queue = deque()

for r in range(N):
    row = list(map(int, input().split()))
    grid.append(row)
    for c in range(M):
        if row[c] == 1:
            queue.append((r, c))  # 다중 시작점!

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
dist = [[-1] * M for _ in range(N)]

# 초기 익은 토마토의 거리 = 0
for r, c in queue:
    dist[r][c] = 0

while queue:
    r, c = queue.popleft()
    for d in range(4):
        nr, nc = r + dx[d], c + dy[d]
        if 0 <= nr < N and 0 <= nc < M:
            if grid[nr][nc] == 0 and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                grid[nr][nc] = 1
                queue.append((nr, nc))

ans = 0
for r in range(N):
    for c in range(M):
        if grid[r][c] == 0:
            print(-1)
            exit()
        ans = max(ans, dist[r][c])

print(ans)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int M, N;
    scanf("%d %d", &M, &N);
    vector<vector<int>> grid(N, vector<int>(M));
    vector<vector<int>> dist(N, vector<int>(M, -1));
    queue<pair<int,int>> q;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};

    for (int r = 0; r < N; r++)
        for (int c = 0; c < M; c++) {
            scanf("%d", &grid[r][c]);
            if (grid[r][c] == 1) { q.push({r, c}); dist[r][c] = 0; }
        }

    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int nr = r+dx[d], nc = c+dy[d];
            if (nr>=0&&nr<N&&nc>=0&&nc<M&&grid[nr][nc]==0&&dist[nr][nc]==-1) {
                dist[nr][nc] = dist[r][c] + 1;
                grid[nr][nc] = 1;
                q.push({nr, nc});
            }
        }
    }

    int ans = 0;
    for (int r = 0; r < N; r++)
        for (int c = 0; c < M; c++) {
            if (grid[r][c] == 0) { puts("-1"); return 0; }
            ans = max(ans, dist[r][c]);
        }
    printf("%d\\n", ans);
    return 0;
}`
            },
            solutions: [
                {
                    approach: '다중 시작 BFS',
                    description: '모든 익은 토마토를 시작점으로 동시에 BFS를 수행하여 최소 일수를 구합니다.',
                    timeComplexity: 'O(N * M)',
                    spaceComplexity: 'O(N * M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

M, N = map(int, input().split())
grid = []
queue = deque()

for r in range(N):
    row = list(map(int, input().split()))
    grid.append(row)
    for c in range(M):
        if row[c] == 1:
            queue.append((r, c))  # 다중 시작점!

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
dist = [[-1] * M for _ in range(N)]

# 초기 익은 토마토의 거리 = 0
for r, c in queue:
    dist[r][c] = 0

while queue:
    r, c = queue.popleft()
    for d in range(4):
        nr, nc = r + dx[d], c + dy[d]
        if 0 <= nr < N and 0 <= nc < M:
            if grid[nr][nc] == 0 and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                grid[nr][nc] = 1
                queue.append((nr, nc))

ans = 0
for r in range(N):
    for c in range(M):
        if grid[r][c] == 0:
            print(-1)
            exit()
        ans = max(ans, dist[r][c])

print(ans)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int M, N;
    scanf("%d %d", &M, &N);
    vector<vector<int>> grid(N, vector<int>(M));
    vector<vector<int>> dist(N, vector<int>(M, -1));
    queue<pair<int,int>> q;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};

    for (int r = 0; r < N; r++)
        for (int c = 0; c < M; c++) {
            scanf("%d", &grid[r][c]);
            if (grid[r][c] == 1) { q.push({r, c}); dist[r][c] = 0; }
        }

    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int nr = r+dx[d], nc = c+dy[d];
            if (nr>=0&&nr<N&&nc>=0&&nc<M&&grid[nr][nc]==0&&dist[nr][nc]==-1) {
                dist[nr][nc] = dist[r][c] + 1;
                grid[nr][nc] = 1;
                q.push({nr, nc});
            }
        }
    }

    int ans = 0;
    for (int r = 0; r < N; r++)
        for (int c = 0; c < M; c++) {
            if (grid[r][c] == 0) { puts("-1"); return 0; }
            ans = max(ans, dist[r][c]);
        }
    printf("%d\\n", ans);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기 토마토 수집',
                                desc: '익은 토마토(1)를 모두 큐에 넣어 다중 시작점을 만듭니다.',
                                code: `import sys
from collections import deque
input = sys.stdin.readline

M, N = map(int, input().split())
box = []
q = deque()
for i in range(N):
    row = list(map(int, input().split()))
    box.append(row)
    for j in range(M):
        if row[j] == 1:
            q.append((i, j))`
                            },
                            {
                                title: 'BFS 탐색',
                                desc: '4방향으로 안 익은 토마토를 익히며 날짜를 기록합니다.',
                                code: `dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
while q:
    y, x = q.popleft()
    for d in range(4):
        ny, nx = y+dy[d], x+dx[d]
        if 0<=ny<N and 0<=nx<M and box[ny][nx]==0:
            box[ny][nx] = box[y][x] + 1
            q.append((ny, nx))`
                            },
                            {
                                title: '결과 계산 및 출력',
                                desc: '안 익은 토마토가 남으면 -1, 아니면 최대 날짜를 출력합니다.',
                                code: `ans = 0
for i in range(N):
    for j in range(M):
        if box[i][j] == 0:
            print(-1)
            exit()
        ans = max(ans, box[i][j])
print(ans - 1)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기 토마토 수집',
                                desc: '다중 시작점 BFS: 익은 토마토를 모두 큐에 넣고 시작',
                                code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int M, N;
    scanf("%d %d", &M, &N);
    vector<vector<int>> box(N, vector<int>(M));
    queue<pair<int,int>> q;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < M; j++) {
            scanf("%d", &box[i][j]);
            if (box[i][j] == 1)
                q.push({i, j}); // 익은 토마토 모두 큐에 넣기
        }`
                            },
                            {
                                title: 'BFS 탐색',
                                desc: '4방향 BFS로 인접 토마토를 익히며 날짜를 기록합니다.',
                                code: `    int dx[] = {0, 0, 1, -1};
    int dy[] = {1, -1, 0, 0};
    while (!q.empty()) {
        auto [y, x] = q.front(); q.pop();
        for (int d = 0; d < 4; d++) {
            int ny = y+dx[d], nx = x+dy[d];
            if (ny>=0 && ny<N && nx>=0 && nx<M && box[ny][nx]==0) {
                box[ny][nx] = box[y][x] + 1;
                q.push({ny, nx});
            }
        }
    }`
                            },
                            {
                                title: '결과 계산 및 출력',
                                desc: '0이 남아있으면 -1, 아니면 최대값-1이 정답입니다.',
                                code: `    int ans = 0;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < M; j++) {
            if (box[i][j] == 0) { puts("-1"); return 0; }
            ans = max(ans, box[i][j]);
        }
    printf("%d\\n", ans - 1);
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-7569',
            title: 'BOJ 7569 - 토마토 (3D)',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/7569',
            simIntro: '3차원 상자에서 여러 익은 토마토가 6방향으로 BFS를 수행하는 과정입니다.',
            sim: {
                type: 'tomato3'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 격자 모양 상자의 칸에 하나씩 넣어서 창고에 보관한다.</p>
                <p>창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다. 하나의 토마토에 인접한 곳은 위, 아래, 왼쪽, 오른쪽, 앞, 뒤 <strong>여섯 방향</strong>에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다.</p>
                <p>창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지, 그 최소 일수를 구하는 프로그램을 작성하라. 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.</p>
                <h4>입력</h4>
                <p>첫 줄에는 상자의 크기를 나타내는 두 정수 M, N과 쌓아올려지는 상자의 수를 나타내는 H가 주어진다. M은 상자의 가로 칸의 수, N은 상자의 세로 칸의 수를 나타낸다. 단, 2 ≤ M, N ≤ 100, 1 ≤ H ≤ 100 이다. 둘째 줄부터는 가장 밑의 상자부터 가장 위의 상자까지에 저장된 토마토들의 정보가 주어진다. 즉, 둘째 줄부터 N개의 줄에는 하나의 상자에 담긴 토마토의 정보가 주어진다. 하나의 줄에는 상자 가로줄에 들어있는 토마토의 상태가 M개의 정수로 주어진다. 정수 1은 익은 토마토, 정수 0은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.</p>
                <p>토마토가 하나 이상 있는 경우만 입력으로 주어진다.</p>
                <h4>출력</h4>
                <p>여러분은 토마토가 모두 익을 때까지의 최소 날짜를 출력해야 한다. 만약, 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면 -1을 출력해야 한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 3 2
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 1 0 0
0 0 0 0 0</pre></div>
                    <div><strong>출력</strong><pre>4</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>2 ≤ M, N ≤ 100</li>
                    <li>1 ≤ H ≤ 100</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '7576번(토마토 2D)을 풀었다면, 같은 다중 시작점 BFS를 쓰면 될 것 같아요. 익은 토마토를 전부 큐에 넣고 BFS를 돌리면...'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '이번에는 상자가 <strong>여러 층</strong>으로 쌓여 있어요! 2D에서는 상하좌우 4방향이었는데, 3D에서는 <strong>위층/아래층</strong>까지 합쳐서 <strong>6방향</strong>으로 확장해야 합니다.<br><br>배열도 2차원에서 3차원으로 바뀌어요: <code>grid[h][r][c]</code><br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;"><span style="color:var(--text2);">2D: 4방향</span> <span style="padding:2px 8px;background:var(--bg2);border-radius:4px;">상하좌우</span></div><div style="display:flex;gap:8px;align-items:center;margin-top:4px;flex-wrap:wrap;"><span style="color:var(--accent);font-weight:600;">3D: 6방향</span> <span style="padding:2px 8px;background:var(--bg2);border-radius:4px;">상하좌우</span><span style="padding:2px 8px;background:var(--yellow);color:#333;border-radius:4px;font-weight:600;">+ 위층/아래층</span></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '7576번 코드에서 두 가지만 바꿉니다:<br><br>1. 방향 배열에 위/아래 추가:<br><code>dh = [0,0,0,0,1,-1]</code> (위층 +1, 아래층 -1)<br><code>dr = [0,0,1,-1,0,0]</code><br><code>dc = [1,-1,0,0,0,0]</code><br><br>2. 큐에 <code>(h, r, c)</code> 3개 좌표를 넣기<br><br>나머지 다중 시작점 BFS 로직은 7576번과 완전히 동일합니다!'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

M, N, H = map(int, input().split())
grid = []
queue = deque()

for h in range(H):
    layer = []
    for r in range(N):
        row = list(map(int, input().split()))
        layer.append(row)
        for c in range(M):
            if row[c] == 1:
                queue.append((h, r, c))
    grid.append(layer)

# 6방향: 상하좌우 + 위/아래층
dh = [0, 0, 0, 0, 1, -1]
dr = [0, 0, 1, -1, 0, 0]
dc = [1, -1, 0, 0, 0, 0]

dist = [[[-1]*M for _ in range(N)] for _ in range(H)]
for h, r, c in queue:
    dist[h][r][c] = 0

while queue:
    h, r, c = queue.popleft()
    for d in range(6):
        nh, nr, nc = h+dh[d], r+dr[d], c+dc[d]
        if 0<=nh<H and 0<=nr<N and 0<=nc<M:
            if grid[nh][nr][nc] == 0 and dist[nh][nr][nc] == -1:
                dist[nh][nr][nc] = dist[h][r][c] + 1
                grid[nh][nr][nc] = 1
                queue.append((nh, nr, nc))

ans = 0
for h in range(H):
    for r in range(N):
        for c in range(M):
            if grid[h][r][c] == 0:
                print(-1)
                exit()
            ans = max(ans, dist[h][r][c])
print(ans)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int grid[100][100][100], dist_arr[100][100][100];
int dh[]={0,0,0,0,1,-1}, dr[]={0,0,1,-1,0,0}, dc[]={1,-1,0,0,0,0};

int main() {
    int M, N, H;
    scanf("%d %d %d", &M, &N, &H);
    queue<tuple<int,int,int>> q;
    memset(dist_arr, -1, sizeof(dist_arr));

    for (int h = 0; h < H; h++)
        for (int r = 0; r < N; r++)
            for (int c = 0; c < M; c++) {
                scanf("%d", &grid[h][r][c]);
                if (grid[h][r][c] == 1) { q.push({h,r,c}); dist_arr[h][r][c] = 0; }
            }

    while (!q.empty()) {
        auto [h,r,c] = q.front(); q.pop();
        for (int d = 0; d < 6; d++) {
            int nh=h+dh[d], nr=r+dr[d], nc=c+dc[d];
            if (nh>=0&&nh<H&&nr>=0&&nr<N&&nc>=0&&nc<M&&grid[nh][nr][nc]==0&&dist_arr[nh][nr][nc]==-1) {
                dist_arr[nh][nr][nc] = dist_arr[h][r][c]+1;
                grid[nh][nr][nc] = 1;
                q.push({nh,nr,nc});
            }
        }
    }

    int ans = 0;
    for (int h = 0; h < H; h++)
        for (int r = 0; r < N; r++)
            for (int c = 0; c < M; c++) {
                if (grid[h][r][c] == 0) { puts("-1"); return 0; }
                ans = max(ans, dist_arr[h][r][c]);
            }
    printf("%d\\n", ans);
    return 0;
}`
            },
            solutions: [
                {
                    approach: '3D 다중 BFS',
                    description: '3차원 상자에서 익은 토마토를 시작점으로 6방향 BFS를 수행합니다.',
                    timeComplexity: 'O(H * N * M)',
                    spaceComplexity: 'O(H * N * M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

M, N, H = map(int, input().split())
grid = []
queue = deque()

for h in range(H):
    layer = []
    for r in range(N):
        row = list(map(int, input().split()))
        layer.append(row)
        for c in range(M):
            if row[c] == 1:
                queue.append((h, r, c))
    grid.append(layer)

# 6방향: 상하좌우 + 위/아래층
dh = [0, 0, 0, 0, 1, -1]
dr = [0, 0, 1, -1, 0, 0]
dc = [1, -1, 0, 0, 0, 0]

dist = [[[-1]*M for _ in range(N)] for _ in range(H)]
for h, r, c in queue:
    dist[h][r][c] = 0

while queue:
    h, r, c = queue.popleft()
    for d in range(6):
        nh, nr, nc = h+dh[d], r+dr[d], c+dc[d]
        if 0<=nh<H and 0<=nr<N and 0<=nc<M:
            if grid[nh][nr][nc] == 0 and dist[nh][nr][nc] == -1:
                dist[nh][nr][nc] = dist[h][r][c] + 1
                grid[nh][nr][nc] = 1
                queue.append((nh, nr, nc))

ans = 0
for h in range(H):
    for r in range(N):
        for c in range(M):
            if grid[h][r][c] == 0:
                print(-1)
                exit()
            ans = max(ans, dist[h][r][c])
print(ans)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int grid[100][100][100], dist_arr[100][100][100];
int dh[]={0,0,0,0,1,-1}, dr[]={0,0,1,-1,0,0}, dc[]={1,-1,0,0,0,0};

int main() {
    int M, N, H;
    scanf("%d %d %d", &M, &N, &H);
    queue<tuple<int,int,int>> q;
    memset(dist_arr, -1, sizeof(dist_arr));

    for (int h = 0; h < H; h++)
        for (int r = 0; r < N; r++)
            for (int c = 0; c < M; c++) {
                scanf("%d", &grid[h][r][c]);
                if (grid[h][r][c] == 1) { q.push({h,r,c}); dist_arr[h][r][c] = 0; }
            }

    while (!q.empty()) {
        auto [h,r,c] = q.front(); q.pop();
        for (int d = 0; d < 6; d++) {
            int nh=h+dh[d], nr=r+dr[d], nc=c+dc[d];
            if (nh>=0&&nh<H&&nr>=0&&nr<N&&nc>=0&&nc<M&&grid[nh][nr][nc]==0&&dist_arr[nh][nr][nc]==-1) {
                dist_arr[nh][nr][nc] = dist_arr[h][r][c]+1;
                grid[nh][nr][nc] = 1;
                q.push({nh,nr,nc});
            }
        }
    }

    int ans = 0;
    for (int h = 0; h < H; h++)
        for (int r = 0; r < N; r++)
            for (int c = 0; c < M; c++) {
                if (grid[h][r][c] == 0) { puts("-1"); return 0; }
                ans = max(ans, dist_arr[h][r][c]);
            }
    printf("%d\\n", ans);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기 토마토 수집',
                                desc: '3차원 상자를 층별로 읽으며 익은 토마토를 큐에 넣습니다.',
                                code: `import sys
from collections import deque
input = sys.stdin.readline

M, N, H = map(int, input().split())
box = []
q = deque()
for h in range(H):
    layer = []
    for i in range(N):
        row = list(map(int, input().split()))
        layer.append(row)
        for j in range(M):
            if row[j] == 1:
                q.append((h, i, j))
    box.append(layer)`
                            },
                            {
                                title: '6방향 BFS 탐색',
                                desc: '상하좌우 + 위층/아래층 6방향으로 토마토를 익힙니다.',
                                code: `dz = [0, 0, 0, 0, 1, -1]
dy = [1, -1, 0, 0, 0, 0]
dx = [0, 0, 1, -1, 0, 0]
while q:
    z, y, x = q.popleft()
    for d in range(6):
        nz, ny, nx = z+dz[d], y+dy[d], x+dx[d]
        if 0<=nz<H and 0<=ny<N and 0<=nx<M and box[nz][ny][nx]==0:
            box[nz][ny][nx] = box[z][y][x] + 1
            q.append((nz, ny, nx))`
                            },
                            {
                                title: '결과 계산 및 출력',
                                desc: '3중 루프로 안 익은 토마토를 확인하고 최대 날짜를 출력합니다.',
                                code: `ans = 0
for h in range(H):
    for i in range(N):
        for j in range(M):
            if box[h][i][j] == 0:
                print(-1)
                exit()
            ans = max(ans, box[h][i][j])
print(ans - 1)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기 토마토 수집',
                                desc: 'tuple<int,int,int> 큐로 3차원 BFS, 전역 배열로 메모리 확보',
                                code: `#include <iostream>
#include <queue>
#include <tuple>
#include <algorithm>
#include <cstring>
using namespace std;

int grid[100][100][100];
int dh[] = {0,0,0,0,1,-1};
int dr[] = {0,0,1,-1,0,0};
int dc[] = {1,-1,0,0,0,0};

int main() {
    int M, N, H;
    scanf("%d %d %d", &M, &N, &H);
    queue<tuple<int,int,int>> q;

    for (int h = 0; h < H; h++)
        for (int r = 0; r < N; r++)
            for (int c = 0; c < M; c++) {
                scanf("%d", &grid[h][r][c]);
                if (grid[h][r][c] == 1)
                    q.push({h, r, c});
            }`
                            },
                            {
                                title: '6방향 BFS 탐색',
                                desc: '상하좌우 + 위아래 층 6방향으로 BFS를 수행합니다.',
                                code: `    while (!q.empty()) {
        auto [h, r, c] = q.front(); q.pop();
        for (int d = 0; d < 6; d++) {
            int nh = h+dh[d], nr = r+dr[d], nc = c+dc[d];
            if (nh>=0 && nh<H && nr>=0 && nr<N && nc>=0 && nc<M
                && grid[nh][nr][nc] == 0) {
                grid[nh][nr][nc] = grid[h][r][c] + 1;
                q.push({nh, nr, nc});
            }
        }
    }`
                            },
                            {
                                title: '결과 계산 및 출력',
                                desc: '3중 루프로 0이 남아있는지 확인 후 최대값-1을 출력합니다.',
                                code: `    int ans = 0;
    for (int h = 0; h < H; h++)
        for (int r = 0; r < N; r++)
            for (int c = 0; c < M; c++) {
                if (grid[h][r][c] == 0) {
                    puts("-1"); return 0;
                }
                ans = max(ans, grid[h][r][c]);
            }
    printf("%d\\n", ans - 1);
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-16928',
            title: 'BOJ 16928 - 뱀과 사다리 게임',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/16928',
            simIntro: '뱀과 사다리 게임판을 그래프로 모델링하여 BFS 최단 이동을 구하는 과정입니다.',
            sim: {
                type: 'snake'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>뱀과 사다리 게임을 즐겨 하는 큐브러버는 , 어느 게임 보드에서든 달성 가능한 게임 1번 칸에서 게임 100번 칸에 도착하기 위해 게임판에 주사위를 최소 몇 번 굴려야 하는지 궁금해졌다.</p>
                <p>게임은 게임판 위에서 주사위를 굴려 나온 수만큼 이동시키는 것이다. 이동한 칸에 뱀이 있는 경우, 뱀을 따라서 내려가게 된다. 이동한 칸에 사다리가 있는 경우, 사다리를 따라서 올라가게 된다. 게임판 위에 게임말이 있는 상태에서 주사위를 굴려, 주사위의 값이 이동해야 하는 칸 수를 나타낸다. 게임말이 100번 칸을 넘어가는 이동은 할 수 없다. 게임말이 도착한 칸이 사다리면 반드시 올라가야 하고, 뱀이면 반드시 내려가야 한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 게임판에 있는 사다리의 수 N(1 ≤ N ≤ 15)과 뱀의 수 M(1 ≤ M ≤ 15)이 주어진다.</p>
                <p>둘째 줄부터 N개의 줄에는 사다리의 정보를 의미하는 x, y (x < y)가 주어진다. x번 칸에 도착하면, y번 칸으로 이동한다는 의미이다.</p>
                <p>다음 M개의 줄에는 뱀의 정보를 의미하는 u, v (u > v)가 주어진다. u번 칸에 도착하면, v번 칸으로 이동한다는 의미이다.</p>
                <p>1번 칸과 100번 칸은 사다리 또는 뱀이 없다. 사다리 또는 뱀은 게임판 위의 어떤 칸에도 2개 이상 존재하지 않는다. 즉, 게임판의 게임말이 위치할 수 있는 칸 중 사다리 또는 뱀이 있는 칸의 번호는 모두 다르다.</p>
                <h4>출력</h4>
                <p>게임판 1번 칸에서 100번 칸까지 가는데 주사위를 최소 몇 번 굴려야 하는지를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3 7
32 62
42 68
12 98
95 13
97 25
93 37
79 27
75 19
49 47
67 17</pre></div>
                    <div><strong>출력</strong><pre>3</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N, M ≤ 15</li>
                    <li>사다리와 뱀의 시작과 끝은 모두 다름</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '1번 칸에서 주사위를 굴려서 100번 칸에 가야 해요. 주사위로 1~6칸 이동하는데, 사다리를 타면 위로 올라가고 뱀을 만나면 아래로 내려가고...<br><br>최소 주사위 굴림 횟수를 구해야 하니까 모든 경우를 다 해봐야 하나?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '무작정 모든 경우를 탐색하면 경우의 수가 너무 많아요. 잠깐, 이 문제를 <strong>그래프</strong>로 볼 수 있지 않을까?<br><br>칸 번호(1~100)를 <strong>정점</strong>, 주사위 이동(1~6)을 <strong>간선</strong>으로 생각하면, <strong>최단 거리 = BFS</strong>로 풀 수 있어요!<br><br><div style="display:flex;gap:6px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;flex-wrap:wrap;"><div style="padding:3px 8px;background:var(--accent);color:white;border-radius:4px;">칸3</div><span style="color:var(--text3);">→ 주사위</span><div style="padding:3px 8px;background:var(--bg2);border-radius:4px;">칸7</div><span style="color:var(--text3);">→ 사다리!</span><div style="padding:3px 8px;background:var(--green);color:white;border-radius:4px;">칸32</div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '1번 칸에서 BFS를 시작합니다:<br>1. 현재 칸에서 주사위 1~6으로 다음 칸 계산<br>2. 다음 칸에 사다리/뱀이 있으면 → 목적지로 <strong>강제 이동</strong><br>3. 아직 방문하지 않은 칸이면 큐에 넣기<br>4. 100번 칸에 도달하면 거리 출력!<br><br><span class="lang-py">Python: 사다리/뱀을 <code>dict</code>에 저장: <code>teleport[x] = y</code></span><span class="lang-cpp">C++: 배열에 저장: <code>teleport[x] = y</code> (0이면 사다리/뱀 없음)</span>'
                }
            ],
            templates: {
                python: `from collections import deque

N, M = map(int, input().split())
teleport = {}
for _ in range(N + M):
    x, y = map(int, input().split())
    teleport[x] = y

dist = [-1] * 101
dist[1] = 0
queue = deque([1])

while queue:
    pos = queue.popleft()
    if pos == 100:
        print(dist[pos])
        break
    for dice in range(1, 7):
        npos = pos + dice
        if npos > 100:
            continue
        # 사다리 또는 뱀이 있으면 강제 이동
        if npos in teleport:
            npos = teleport[npos]
        if dist[npos] == -1:
            dist[npos] = dist[pos] + 1
            queue.append(npos)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    int teleport[101] = {};
    for (int i = 0; i < N + M; i++) {
        int x, y; scanf("%d %d", &x, &y);
        teleport[x] = y;
    }

    int dist[101];
    memset(dist, -1, sizeof(dist));
    dist[1] = 0;
    queue<int> q;
    q.push(1);

    while (!q.empty()) {
        int pos = q.front(); q.pop();
        if (pos == 100) { printf("%d\\n", dist[pos]); return 0; }
        for (int d = 1; d <= 6; d++) {
            int npos = pos + d;
            if (npos > 100) continue;
            if (teleport[npos]) npos = teleport[npos];
            if (dist[npos] == -1) {
                dist[npos] = dist[pos] + 1;
                q.push(npos);
            }
        }
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'BFS 그래프 탐색',
                    description: '뱀과 사다리를 간선으로 모델링하여 BFS로 1번에서 100번까지 최소 이동을 구합니다.',
                    timeComplexity: 'O(100)',
                    spaceComplexity: 'O(100)',
                    templates: {
                        python: `from collections import deque

N, M = map(int, input().split())
teleport = {}
for _ in range(N + M):
    x, y = map(int, input().split())
    teleport[x] = y

dist = [-1] * 101
dist[1] = 0
queue = deque([1])

while queue:
    pos = queue.popleft()
    if pos == 100:
        print(dist[pos])
        break
    for dice in range(1, 7):
        npos = pos + dice
        if npos > 100:
            continue
        # 사다리 또는 뱀이 있으면 강제 이동
        if npos in teleport:
            npos = teleport[npos]
        if dist[npos] == -1:
            dist[npos] = dist[pos] + 1
            queue.append(npos)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    int teleport[101] = {};
    for (int i = 0; i < N + M; i++) {
        int x, y; scanf("%d %d", &x, &y);
        teleport[x] = y;
    }

    int dist[101];
    memset(dist, -1, sizeof(dist));
    dist[1] = 0;
    queue<int> q;
    q.push(1);

    while (!q.empty()) {
        int pos = q.front(); q.pop();
        if (pos == 100) { printf("%d\\n", dist[pos]); return 0; }
        for (int d = 1; d <= 6; d++) {
            int npos = pos + d;
            if (npos > 100) continue;
            if (teleport[npos]) npos = teleport[npos];
            if (dist[npos] == -1) {
                dist[npos] = dist[pos] + 1;
                q.push(npos);
            }
        }
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 뱀/사다리 구성',
                                desc: 'move 배열에 사다리/뱀의 이동 목적지를 저장합니다.',
                                code: `from collections import deque

N, M = map(int, input().split())
move = [0] * 101
for _ in range(N + M):
    a, b = map(int, input().split())
    move[a] = b`
                            },
                            {
                                title: 'BFS 초기화',
                                desc: '1번 칸에서 시작하므로 dist[1]=0으로 설정합니다.',
                                code: `dist = [-1] * 101
dist[1] = 0
q = deque([1])`
                            },
                            {
                                title: 'BFS 탐색 및 출력',
                                desc: '주사위 1~6으로 이동하되, 사다리/뱀이면 강제 이동합니다.',
                                code: `while q:
    x = q.popleft()
    for dice in range(1, 7):
        nx = x + dice
        if nx > 100: continue
        if move[nx] != 0: nx = move[nx]
        if dist[nx] == -1:
            dist[nx] = dist[x] + 1
            q.append(nx)
print(dist[100])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 뱀/사다리 구성',
                                desc: '배열로 사다리/뱀 맵핑 저장',
                                code: `#include <iostream>
#include <queue>
#include <cstring>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    int teleport[101] = {}; // 사다리/뱀 이동 맵핑
    for (int i = 0; i < N + M; i++) {
        int x, y;
        scanf("%d %d", &x, &y);
        teleport[x] = y;
    }`
                            },
                            {
                                title: 'BFS 초기화',
                                desc: 'memset으로 dist를 -1로 초기화, 1번 칸부터 시작합니다.',
                                code: `    int dist[101];
    memset(dist, -1, sizeof(dist));
    dist[1] = 0;
    queue<int> q;
    q.push(1);`
                            },
                            {
                                title: 'BFS 탐색 및 출력',
                                desc: '주사위 1~6 이동 후 teleport 배열로 강제 이동을 처리합니다.',
                                code: `    while (!q.empty()) {
        int pos = q.front(); q.pop();
        if (pos == 100) {
            printf("%d\\n", dist[pos]);
            return 0;
        }
        for (int d = 1; d <= 6; d++) {
            int npos = pos + d;
            if (npos > 100) continue;
            // 사다리/뱀이 있으면 강제 이동
            if (teleport[npos]) npos = teleport[npos];
            if (dist[npos] == -1) {
                dist[npos] = dist[pos] + 1;
                q.push(npos);
            }
        }
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
            id: 'boj-1707',
            title: 'BOJ 1707 - 이분 그래프',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/1707',
            simIntro: '그래프를 2색으로 칠하면서 이분 그래프 여부를 판별하는 BFS 과정입니다.',
            sim: {
                type: 'bipartite'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>그래프의 정점의 집합을 둘로 분할하여, 각 집합에 속한 정점끼리는 서로 인접하지 않도록 분할할 수 있을 때, 그러한 그래프를 특별히 이분 그래프 (Bipartite Graph) 라 부른다.</p>
                <p>그래프가 입력으로 주어졌을 때, 이 그래프가 이분 그래프인지 아닌지 판별하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>입력은 여러 개의 테스트 케이스로 구성되어 있는데, 첫째 줄에 테스트 케이스의 개수 K가 주어진다. 각 테스트 케이스의 첫째 줄에는 그래프의 정점의 개수 V와 간선의 개수 E가 빈 칸을 사이에 두고 순서대로 주어진다. 각 정점에는 1부터 V까지 차례로 번호가 붙어 있다. 이어서 둘째 줄부터 E개의 줄에 걸쳐 간선에 대한 정보가 주어지는데, 각 줄에 인접한 두 정점의 번호 u, v (1 ≤ u, v ≤ V)가 빈 칸을 사이에 두고 주어진다.</p>
                <h4>출력</h4>
                <p>K개의 테스트 케이스마다 해당 그래프가 이분 그래프이면 YES, 아니면 NO를 순서대로 한 줄에 하나씩 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>2
3 2
1 3
2 3
4 4
1 2
2 3
3 4
4 2</pre></div>
                    <div><strong>출력</strong><pre>YES
NO</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ K ≤ 5</li>
                    <li>1 ≤ V ≤ 20,000</li>
                    <li>1 ≤ E ≤ 200,000</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '이분 그래프란 정점을 두 그룹으로 나눌 수 있고, 같은 그룹끼리는 간선이 없는 그래프예요.<br><br>모든 가능한 2가지 분할을 시도해 보면 되지 않을까? 정점이 V개면 2^V가지 경우...'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'V가 최대 20,000이면 2^20000가지?! 이건 절대 불가능해요.<br><br>다르게 생각해 봅시다. 이분 그래프는 정점을 <strong>두 가지 색</strong>으로 칠할 수 있는 그래프예요. 인접한 정점끼리 항상 다른 색이면 이분 그래프!<br><br><div style="display:flex;gap:6px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;flex-wrap:wrap;"><div style="width:28px;height:28px;border-radius:50%;background:var(--accent);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">A</div><span style="color:var(--text3);">—</span><div style="width:28px;height:28px;border-radius:50%;background:#00b894;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">B</div><span style="color:var(--text3);">—</span><div style="width:28px;height:28px;border-radius:50%;background:var(--accent);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">C</div><span style="color:var(--text3);margin-left:6px;">← 번갈아 칠하기!</span></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>2-coloring BFS</strong>를 사용합니다:<br>1. 시작 정점을 색 0으로 칠하기<br>2. BFS로 이웃을 색 1로, 그 이웃을 색 0으로... 번갈아 칠하기<br>3. 이미 칠해진 이웃의 색이 나와 <strong>같으면</strong> → 이분 그래프가 아님! (NO)<br>4. 충돌 없이 끝나면 → 이분 그래프 (YES)'
                },
                {
                    title: '주의할 점',
                    content: '그래프가 <strong>연결 그래프가 아닐 수</strong> 있어요! 즉, 떨어진 컴포넌트가 여러 개일 수 있습니다.<br><br>모든 정점을 순회하면서, 아직 색칠 안 된 정점이 있으면 거기서 새로 BFS를 시작해야 해요.<br>각 테스트 케이스마다 <code>color</code> 배열을 초기화하는 것도 잊지 마세요!'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

K = int(input())
for _ in range(K):
    V, E = map(int, input().split())
    graph = [[] for _ in range(V + 1)]
    for _ in range(E):
        u, v = map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)

    color = [-1] * (V + 1)
    is_bipartite = True

    for start in range(1, V + 1):
        if color[start] != -1:
            continue
        color[start] = 0
        queue = deque([start])
        while queue:
            v = queue.popleft()
            for u in graph[v]:
                if color[u] == -1:
                    color[u] = 1 - color[v]  # 반대 색
                    queue.append(u)
                elif color[u] == color[v]:
                    is_bipartite = False
                    break
            if not is_bipartite:
                break
        if not is_bipartite:
            break

    print("YES" if is_bipartite else "NO")`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int K; scanf("%d", &K);
    while (K--) {
        int V, E; scanf("%d %d", &V, &E);
        vector<vector<int>> graph(V + 1);
        for (int i = 0; i < E; i++) {
            int u, v; scanf("%d %d", &u, &v);
            graph[u].push_back(v);
            graph[v].push_back(u);
        }

        vector<int> color(V + 1, -1);
        bool ok = true;

        for (int s = 1; s <= V && ok; s++) {
            if (color[s] != -1) continue;
            color[s] = 0;
            queue<int> q;
            q.push(s);
            while (!q.empty() && ok) {
                int v = q.front(); q.pop();
                for (int u : graph[v]) {
                    if (color[u] == -1) {
                        color[u] = 1 - color[v];
                        q.push(u);
                    } else if (color[u] == color[v]) {
                        ok = false;
                    }
                }
            }
        }
        puts(ok ? "YES" : "NO");
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'BFS 이분 그래프 판별',
                    description: '그래프를 2색으로 칠하면서 인접한 정점이 같은 색인지 검사합니다.',
                    timeComplexity: 'O(V + E)',
                    spaceComplexity: 'O(V + E)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

K = int(input())
for _ in range(K):
    V, E = map(int, input().split())
    graph = [[] for _ in range(V + 1)]
    for _ in range(E):
        u, v = map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)

    color = [-1] * (V + 1)
    is_bipartite = True

    for start in range(1, V + 1):
        if color[start] != -1:
            continue
        color[start] = 0
        queue = deque([start])
        while queue:
            v = queue.popleft()
            for u in graph[v]:
                if color[u] == -1:
                    color[u] = 1 - color[v]  # 반대 색
                    queue.append(u)
                elif color[u] == color[v]:
                    is_bipartite = False
                    break
            if not is_bipartite:
                break
        if not is_bipartite:
            break

    print("YES" if is_bipartite else "NO")`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int K; scanf("%d", &K);
    while (K--) {
        int V, E; scanf("%d %d", &V, &E);
        vector<vector<int>> graph(V + 1);
        for (int i = 0; i < E; i++) {
            int u, v; scanf("%d %d", &u, &v);
            graph[u].push_back(v);
            graph[v].push_back(u);
        }

        vector<int> color(V + 1, -1);
        bool ok = true;

        for (int s = 1; s <= V && ok; s++) {
            if (color[s] != -1) continue;
            color[s] = 0;
            queue<int> q;
            q.push(s);
            while (!q.empty() && ok) {
                int v = q.front(); q.pop();
                for (int u : graph[v]) {
                    if (color[u] == -1) {
                        color[u] = 1 - color[v];
                        q.push(u);
                    } else if (color[u] == color[v]) {
                        ok = false;
                    }
                }
            }
        }
        puts(ok ? "YES" : "NO");
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: '테스트 케이스마다 그래프를 새로 생성합니다.',
                                code: `import sys
from collections import deque
input = sys.stdin.readline

K = int(input())
for _ in range(K):
    V, E = map(int, input().split())
    graph = [[] for _ in range(V + 1)]
    for _ in range(E):
        u, v = map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)`
                            },
                            {
                                title: 'BFS 2색 칠하기',
                                desc: '인접한 정점에 반대 색을 칠하고, 충돌 시 이분 그래프가 아닙니다.',
                                code: `    color = [0] * (V + 1)
    is_bipartite = True
    for start in range(1, V + 1):
        if color[start] != 0: continue
        q = deque([start])
        color[start] = 1
        while q and is_bipartite:
            v = q.popleft()
            for u in graph[v]:
                if color[u] == 0:
                    color[u] = -color[v]
                    q.append(u)
                elif color[u] == color[v]:
                    is_bipartite = False`
                            },
                            {
                                title: '결과 출력',
                                desc: '이분 그래프 판별 결과에 따라 YES/NO를 출력합니다.',
                                code: '    print("YES" if is_bipartite else "NO")'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 구성',
                                desc: '테스트 케이스별로 vector 그래프를 생성합니다.',
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int K;
    scanf("%d", &K);
    while (K--) {
        int V, E;
        scanf("%d %d", &V, &E);
        vector<vector<int>> graph(V + 1);
        for (int i = 0; i < E; i++) {
            int u, v;
            scanf("%d %d", &u, &v);
            graph[u].push_back(v);
            graph[v].push_back(u);
        }`
                            },
                            {
                                title: 'BFS 2색 칠하기',
                                desc: 'vector<int> color로 0/1/-1 색 관리',
                                code: `        // 0: 미방문, 1/-1: 두 가지 색
        vector<int> color(V + 1, 0);
        bool ok = true;
        for (int s = 1; s <= V && ok; s++) {
            if (color[s] != 0) continue;
            color[s] = 1;
            queue<int> q;
            q.push(s);
            while (!q.empty() && ok) {
                int v = q.front(); q.pop();
                for (int u : graph[v]) {
                    if (color[u] == 0) {
                        color[u] = -color[v]; // 반대 색 칠하기
                        q.push(u);
                    } else if (color[u] == color[v]) {
                        ok = false; // 같은 색이면 이분 그래프 X
                    }
                }
            }
        }`
                            },
                            {
                                title: '결과 출력',
                                desc: '판별 결과를 YES/NO로 출력합니다.',
                                code: `        puts(ok ? "YES" : "NO");
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
            id: 'boj-2206',
            title: 'BOJ 2206 - 벽 부수고 이동하기',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/2206',
            simIntro: '벽을 부순 상태와 부수지 않은 상태를 분리하여 3차원 BFS를 수행하는 과정입니다.',
            sim: {
                type: 'wall'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N×M의 행렬로 표현되는 맵이 있다. 맵에서 0은 이동할 수 있는 곳을 나타내고, 1은 이동할 수 없는 벽이 있는 곳을 나타낸다. 당신은 (1, 1)에서 (N, M)의 위치까지 이동하려 하는데, 이때 최단 경로로 이동하려 한다. 최단 경로는 맵에서 가장 적은 개수의 칸을 지나는 경로를 말하는데, 이때 시작하는 칸과 끝나는 칸도 포함해서 센다.</p>
                <p>만약 이동하는 도중에 한 개의 벽을 부수고 이동하는 것이 좀 더 경로가 짧아진다면, 벽을 한 개 까지 부수고 이동하여도 된다.</p>
                <p>한 칸에서 이동할 수 있는 칸은 상하좌우로 인접한 칸이다. 맵이 주어졌을 때, 최단 경로를 구해 내는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 N(1 ≤ N ≤ 1,000), M(1 ≤ M ≤ 1,000)이 주어진다. 다음 N개의 줄에 M개의 숫자로 맵이 주어진다. (1, 1)과 (N, M)은 항상 0이라고 가정한다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 최단 거리를 출력한다. 불가능할 때는 -1을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>6 4
0100
0110
0000
0010
0100
0000</pre></div>
                    <div><strong>출력</strong><pre>15</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 4
0111
1111
1111
1110</pre></div>
                    <div><strong>출력</strong><pre>-1</pre></div>
                </div><p class="example-explain">벽을 하나만 부술 수 있으므로 (1,1)에서 (4,4)까지 도달할 수 없습니다.</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N, M ≤ 1,000</li>
                </ul>`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '(1,1)에서 (N,M)까지 최단 경로를 구해야 해요. 벽을 하나까지 부술 수 있으니까... 일단 벽 안 부수고 BFS, 그다음 벽을 하나씩 부숴보면서 BFS를 반복하면 되지 않을까?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '벽이 엄청 많으면 각 벽을 부술 때마다 BFS를 돌려야 해요. N, M이 최대 1,000이면 격자에 벽이 수십만 개일 수 있으니까, 벽 수 * O(NM) = 시간 초과!<br><br>벽을 부수는 것을 BFS <strong>안에서</strong> 처리할 방법은 없을까?<br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;"><div style="margin-bottom:4px;font-weight:600;color:var(--accent);">상태 확장: (r, c, broken)</div><div style="display:flex;gap:8px;flex-wrap:wrap;"><span style="padding:3px 8px;background:var(--bg2);border-radius:4px;">(3,2,0) 벽 안 부숨</span><span style="padding:3px 8px;background:var(--yellow);color:#333;border-radius:4px;">(3,2,1) 벽 부숨</span></div><div style="margin-top:4px;color:var(--text2);">같은 위치라도 다른 상태!</div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>상태 확장 BFS</strong>를 사용합니다! 위치 (r, c)에 "벽을 부쉈는지 여부"를 추가해서 3차원 상태로 관리해요:<br><br><code>dist[r][c][broken]</code> (broken: 0=아직 안 부숨, 1=이미 부숨)<br><br>이동 규칙:<br>- 빈 칸(0) → 그냥 이동 (broken 유지)<br>- 벽(1) + broken=0 → 벽을 부수고 이동 (broken을 1로 변경)<br>- 벽(1) + broken=1 → 이동 불가 (이미 한 번 부숨)'
                },
                {
                    title: '왜 이게 맞을까?',
                    content: '같은 (r, c)라도 <strong>벽을 부쉈느냐 아니냐</strong>에 따라 완전히 다른 상태예요!<br><br>예를 들어, (3, 4)에 벽을 안 부수고 도착한 것과, 벽을 부수고 도착한 것은 앞으로 갈 수 있는 경로가 달라요. 그래서 별도 상태로 관리해야 합니다.<br><br>BFS 큐에 <code>(r, c, broken)</code>을 넣으면, 도착점에 처음 도달했을 때가 최단 거리입니다.'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
grid = []
for _ in range(N):
    grid.append(list(map(int, input().strip())))

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]

# dist[r][c][broken]: broken=0(아직 안 부숨), broken=1(이미 부숨)
dist = [[[-1] * 2 for _ in range(M)] for _ in range(N)]
dist[0][0][0] = 1
queue = deque([(0, 0, 0)])  # (r, c, broken)

while queue:
    r, c, broken = queue.popleft()
    if r == N - 1 and c == M - 1:
        print(dist[r][c][broken])
        exit()

    for d in range(4):
        nr, nc = r + dx[d], c + dy[d]
        if 0 <= nr < N and 0 <= nc < M:
            if grid[nr][nc] == 0 and dist[nr][nc][broken] == -1:
                # 빈 칸으로 이동
                dist[nr][nc][broken] = dist[r][c][broken] + 1
                queue.append((nr, nc, broken))
            elif grid[nr][nc] == 1 and broken == 0 and dist[nr][nc][1] == -1:
                # 벽을 부수고 이동 (한 번만 가능)
                dist[nr][nc][1] = dist[r][c][broken] + 1
                queue.append((nr, nc, 1))

print(-1)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N, M;
char grid[1000][1001];
int dist_arr[1000][1000][2];
int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};

int main() {
    scanf("%d %d", &N, &M);
    for (int i = 0; i < N; i++) scanf("%s", grid[i]);
    memset(dist_arr, -1, sizeof(dist_arr));

    dist_arr[0][0][0] = 1;
    queue<tuple<int,int,int>> q;
    q.push({0, 0, 0});

    while (!q.empty()) {
        auto [r, c, b] = q.front(); q.pop();
        if (r == N-1 && c == M-1) {
            printf("%d\\n", dist_arr[r][c][b]);
            return 0;
        }
        for (int d = 0; d < 4; d++) {
            int nr = r+dx[d], nc = c+dy[d];
            if (nr<0||nr>=N||nc<0||nc>=M) continue;
            if (grid[nr][nc]=='0' && dist_arr[nr][nc][b]==-1) {
                dist_arr[nr][nc][b] = dist_arr[r][c][b]+1;
                q.push({nr,nc,b});
            }
            if (grid[nr][nc]=='1' && b==0 && dist_arr[nr][nc][1]==-1) {
                dist_arr[nr][nc][1] = dist_arr[r][c][b]+1;
                q.push({nr,nc,1});
            }
        }
    }
    puts("-1");
    return 0;
}`
            },
            solutions: [
                {
                    approach: '상태 BFS (벽 부수기)',
                    description: '(y, x, 벽부순여부) 3차원 상태 공간에서 BFS로 최단 거리를 구합니다.',
                    timeComplexity: 'O(N * M)',
                    spaceComplexity: 'O(N * M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
grid = []
for _ in range(N):
    grid.append(list(map(int, input().strip())))

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]

# dist[r][c][broken]: broken=0(아직 안 부숨), broken=1(이미 부숨)
dist = [[[-1] * 2 for _ in range(M)] for _ in range(N)]
dist[0][0][0] = 1
queue = deque([(0, 0, 0)])  # (r, c, broken)

while queue:
    r, c, broken = queue.popleft()
    if r == N - 1 and c == M - 1:
        print(dist[r][c][broken])
        exit()

    for d in range(4):
        nr, nc = r + dx[d], c + dy[d]
        if 0 <= nr < N and 0 <= nc < M:
            if grid[nr][nc] == 0 and dist[nr][nc][broken] == -1:
                # 빈 칸으로 이동
                dist[nr][nc][broken] = dist[r][c][broken] + 1
                queue.append((nr, nc, broken))
            elif grid[nr][nc] == 1 and broken == 0 and dist[nr][nc][1] == -1:
                # 벽을 부수고 이동 (한 번만 가능)
                dist[nr][nc][1] = dist[r][c][broken] + 1
                queue.append((nr, nc, 1))

print(-1)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int N, M;
char grid[1000][1001];
int dist_arr[1000][1000][2];
int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};

int main() {
    scanf("%d %d", &N, &M);
    for (int i = 0; i < N; i++) scanf("%s", grid[i]);
    memset(dist_arr, -1, sizeof(dist_arr));

    dist_arr[0][0][0] = 1;
    queue<tuple<int,int,int>> q;
    q.push({0, 0, 0});

    while (!q.empty()) {
        auto [r, c, b] = q.front(); q.pop();
        if (r == N-1 && c == M-1) {
            printf("%d\\n", dist_arr[r][c][b]);
            return 0;
        }
        for (int d = 0; d < 4; d++) {
            int nr = r+dx[d], nc = c+dy[d];
            if (nr<0||nr>=N||nc<0||nc>=M) continue;
            if (grid[nr][nc]=='0' && dist_arr[nr][nc][b]==-1) {
                dist_arr[nr][nc][b] = dist_arr[r][c][b]+1;
                q.push({nr,nc,b});
            }
            if (grid[nr][nc]=='1' && b==0 && dist_arr[nr][nc][1]==-1) {
                dist_arr[nr][nc][1] = dist_arr[r][c][b]+1;
                q.push({nr,nc,1});
            }
        }
    }
    puts("-1");
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기화',
                                desc: 'dist[y][x][벽부순여부] 3차원 배열로 상태를 관리합니다.',
                                code: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
board = []
for _ in range(N):
    board.append(list(input().strip()))

dist = [[[0]*2 for _ in range(M)] for _ in range(N)]
dist[0][0][0] = 1`
                            },
                            {
                                title: 'BFS 탐색',
                                desc: '(y, x, broken) 상태를 큐에서 꺼내며 도착 여부를 확인합니다.',
                                code: `q = deque([(0, 0, 0)])  # y, x, broken
dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
while q:
    y, x, broken = q.popleft()
    if y == N-1 and x == M-1:
        print(dist[y][x][broken])
        exit()`
                            },
                            {
                                title: '벽 처리 및 이동',
                                desc: '빈 칸이면 그대로, 벽이면 아직 안 부쉈을 때만 부수고 이동합니다.',
                                code: `    for d in range(4):
        ny, nx = y+dy[d], x+dx[d]
        if 0<=ny<N and 0<=nx<M:
            if board[ny][nx]=="0" and dist[ny][nx][broken]==0:
                dist[ny][nx][broken] = dist[y][x][broken] + 1
                q.append((ny, nx, broken))
            elif board[ny][nx]=="1" and broken==0 and dist[ny][nx][1]==0:
                dist[ny][nx][1] = dist[y][x][broken] + 1
                q.append((ny, nx, 1))
print(-1)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기화',
                                desc: '3차원 배열 dist[r][c][broken]으로 상태 확장 BFS',
                                code: `#include <iostream>
#include <queue>
#include <tuple>
#include <cstring>
using namespace std;

int N, M;
char grid[1000][1001];
int dist[1000][1000][2]; // [y][x][벽 부숬 여부]
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

int main() {
    scanf("%d %d", &N, &M);
    for (int i = 0; i < N; i++) scanf("%s", grid[i]);
    memset(dist, -1, sizeof(dist));
    dist[0][0][0] = 1;`
                            },
                            {
                                title: 'BFS 탐색',
                                desc: 'tuple<int,int,int>으로 (y, x, broken) 상태 관리',
                                code: `    queue<tuple<int,int,int>> q;
    q.push({0, 0, 0});

    while (!q.empty()) {
        auto [r, c, b] = q.front(); q.pop();
        if (r == N-1 && c == M-1) {
            printf("%d\\n", dist[r][c][b]);
            return 0;
        }`
                            },
                            {
                                title: '벽 처리 및 이동',
                                desc: '빈 칸은 그대로, 벽은 b==0일 때만 부수고 이동합니다.',
                                code: `        for (int d = 0; d < 4; d++) {
            int nr = r+dx[d], nc = c+dy[d];
            if (nr<0 || nr>=N || nc<0 || nc>=M) continue;
            // 빈 칸: 그냥 이동
            if (grid[nr][nc]=='0' && dist[nr][nc][b]==-1) {
                dist[nr][nc][b] = dist[r][c][b] + 1;
                q.push({nr, nc, b});
            }
            // 벽: 아직 안 부숌을 때만 부수고 이동
            if (grid[nr][nc]=='1' && b==0 && dist[nr][nc][1]==-1) {
                dist[nr][nc][1] = dist[r][c][b] + 1;
                q.push({nr, nc, 1});
            }
        }
    }
    puts("-1");
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
