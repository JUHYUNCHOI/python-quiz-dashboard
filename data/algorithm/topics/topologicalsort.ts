import type { AlgoTopic } from '../types'

export const topologicalSortTopic: AlgoTopic = {
    id: 'topologicalsort',
    title: '위상 정렬',
    icon: '📋',
    category: '심화 (Gold~Platinum)',
    order: 17,
    description: 'DAG에서 선후관계를 지키며 모든 노드를 일렬로 나열하는 기법',
    titleEn: 'Topological Sort',
    categoryEn: 'Advanced Algorithms (Gold~Platinum)',
    descriptionEn: 'A technique to linearly order all nodes in a DAG while respecting dependencies',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: '선수과목 (입문)',
            titleEn: 'Prerequisites (Intro)',
            problemIds: [
                'boj-14567'
            ],
            desc: '위상 정렬 입문 — 선수과목 순서 구하기 (Gold V)',
            descEn: 'Topological sort intro — finding prerequisite course order (Gold V)'
        },
        {
            num: 2,
            title: '기본 위상 정렬',
            titleEn: 'Basic Topological Sort',
            problemIds: [
                'boj-2252'
            ],
            desc: '진입 차수와 BFS를 활용한 기본 위상 정렬 (Gold III)',
            descEn: 'Basic topological sort using in-degree and BFS (Gold III)'
        },
        {
            num: 3,
            title: '심화 위상 정렬',
            titleEn: 'Advanced Topological Sort',
            problemIds: [
                'boj-1766',
                'boj-3665'
            ],
            desc: '우선순위 큐, 사이클 판별 등 심화 응용 (Gold I~II)',
            descEn: 'Advanced applications: priority queue, cycle detection (Gold I~II)'
        }
    ],
    problems: [
        {
            id: 'boj-14567',
            title: 'BOJ 14567 - 선수과목 (Prerequisite)',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/14567',
            simIntro: '선수과목 관계를 DAG로 만들고, Kahn\'s Algorithm으로 각 과목의 최소 이수 학기를 구해보세요.',
            sim: {
                type: 'prereq'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>올해 Z대학 , , 학번인 학생들은 새로운 커리큘럼을 맞아 , 총 N개의 과목을 수강해야 한다. 각 과목을 수강하기 위해 반드시 먼저 이수해야 하는 선수과목이 있을 수 있다.</p>
                <p>한 학기에 들을 수 있는 과목 수에는 제한이 없다. 모든 과목은 매 학기 개설된다.</p>
                <p>각 과목을 가장 빠르게 이수할 수 있는 학기를 구하라.</p>
                <h4>입력</h4>
                <p>첫 번째 줄에 과목의 수 N(1 ≤ N ≤ 1000)과 선수과목 조건의 수 M(0 ≤ M ≤ 500000)이 주어진다.</p>
                <p>다음 M개의 줄에 선수과목 조건을 나타내는 두 정수 A, B가 주어진다. A번 과목이 B번 과목의 선수과목이다. (A번을 이수해야 B번을 들을 수 있다.)</p>
                <h4>출력</h4>
                <p>1번 과목부터 N번 과목까지 각 과목을 이수할 수 있는 가장 빠른 학기를 공백으로 구분하여 한 줄에 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3 2
2 3
1 2</pre></div>
                    <div><strong>출력</strong><pre>1 1 2</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>6 4
1 2
1 3
2 5
4 5</pre></div>
                    <div><strong>출력</strong><pre>1 2 2 1 3 1</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ N ≤ 1000</li><li>0 ≤ M ≤ 500,000</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 생각 — 그래프로 모델링',
                    content: '"A를 먼저 들어야 B를 들을 수 있다" → A에서 B로 향하는 <strong>간선</strong>이 있는 방향 그래프(DAG)예요.<br>이런 선후관계를 처리하는 데 딱 맞는 알고리즘이 뭘까요? 바로 <strong>위상 정렬</strong>입니다!'
                },
                {
                    title: '"가장 빠른 학기"는 어떻게 구하지?',
                    content: '선수과목이 없으면 → <strong>1학기</strong>에 바로 수강 가능!<br>선수과목이 있으면 → 선수과목들이 모두 이수된 <strong>다음 학기</strong>에 들을 수 있어요.<br><br><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:10px 0;padding:10px 14px;background:var(--bg2);border-radius:8px;"><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--green);background:var(--green)15;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">A</div><div style="font-size:0.6rem;color:var(--green);font-weight:600;">1학기</div></div><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--green);background:var(--green)15;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">B</div><div style="font-size:0.6rem;color:var(--green);font-weight:600;">2학기</div></div><div style="font-size:1rem;color:var(--text2);">→</div><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--yellow);background:var(--yellow)20;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;box-shadow:0 0 6px var(--yellow);">C</div><div style="font-size:0.6rem;color:var(--yellow);font-weight:600;">max(1,2)+1 = <strong>3학기</strong></div></div></div>즉, <code>semester[B] = max(semester[A들]) + 1</code> — 선수과목 중 가장 늦게 끝나는 것 + 1!'
                },
                {
                    title: 'BFS(Kahn\'s 알고리즘)로 구현',
                    content: '진입차수가 0인 과목(선수과목 없음)을 큐에 넣고 학기=1로 시작.<br>큐에서 꺼낸 과목의 이웃 진입차수를 줄이면서 <code>semester[이웃] = max(semester[이웃], semester[현재] + 1)</code>로 갱신!<br>진입차수가 0이 되면 큐에 추가.<br><br><span class="lang-py">Python: <code>deque</code>로 BFS 구현</span><span class="lang-cpp">C++: <code>queue</code>로 BFS 구현</span>'
                },
                {
                    title: '시간 복잡도 확인',
                    content: '모든 노드를 한 번씩 처리하고, 모든 간선을 한 번씩 확인하므로 <strong>O(N + M)</strong>이에요.<br>N ≤ 1000, M ≤ 500,000이니 충분히 빠릅니다!'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [[] for _ in range(N + 1)]
in_degree = [0] * (N + 1)

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    in_degree[b] += 1

semester = [0] * (N + 1)
queue = deque()
for i in range(1, N + 1):
    if in_degree[i] == 0:
        queue.append(i)
        semester[i] = 1

while queue:
    v = queue.popleft()
    for u in graph[v]:
        semester[u] = max(semester[u], semester[v] + 1)
        in_degree[u] -= 1
        if in_degree[u] == 0:
            queue.append(u)

print(*semester[1:])`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    vector<int> in_degree(N + 1, 0);

    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
        in_degree[b]++;
    }

    vector<int> semester(N + 1, 0);
    queue<int> q;
    for (int i = 1; i <= N; i++) {
        if (in_degree[i] == 0) {
            q.push(i);
            semester[i] = 1;
        }
    }

    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            semester[u] = max(semester[u], semester[v] + 1);
            if (--in_degree[u] == 0) q.push(u);
        }
    }

    for (int i = 1; i <= N; i++)
        printf("%d%c", semester[i], i == N ? '\\n' : ' ');
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'Kahn\'s Algorithm + 학기 계산',
                    description: '진입 차수가 0인 과목부터 BFS하면서 각 과목의 최소 이수 학기를 구합니다.',
                    timeComplexity: 'O(N + M)',
                    spaceComplexity: 'O(N + M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [[] for _ in range(N + 1)]
in_degree = [0] * (N + 1)

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    in_degree[b] += 1

semester = [0] * (N + 1)
queue = deque()
for i in range(1, N + 1):
    if in_degree[i] == 0:
        queue.append(i)
        semester[i] = 1

while queue:
    v = queue.popleft()
    for u in graph[v]:
        semester[u] = max(semester[u], semester[v] + 1)
        in_degree[u] -= 1
        if in_degree[u] == 0:
            queue.append(u)

print(*semester[1:])`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    vector<int> in_degree(N + 1, 0);

    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
        in_degree[b]++;
    }

    vector<int> semester(N + 1, 0);
    queue<int> q;
    for (int i = 1; i <= N; i++) {
        if (in_degree[i] == 0) {
            q.push(i);
            semester[i] = 1;
        }
    }

    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            semester[u] = max(semester[u], semester[v] + 1);
            if (--in_degree[u] == 0) q.push(u);
        }
    }

    for (int i = 1; i <= N; i++)
        printf("%d%c", semester[i], i == N ? '\\n' : ' ');
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 구축',
                                desc: `선수과목 관계를 인접 리스트로 저장하고
진입 차수를 세어 위상 정렬을 준비합니다.`,
                                code: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [[] for _ in range(N + 1)]  # 인접 리스트
in_degree = [0] * (N + 1)           # 진입 차수

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)  # a → b 간선
    in_degree[b] += 1   # b의 진입 차수 증가`
                            },
                            {
                                title: '진입 차수 0인 과목 큐에 추가',
                                desc: `선수과목이 없는 과목은 1학기에 바로 수강 가능하므로
큐에 넣고 semester=1로 초기화합니다.`,
                                code: `semester = [0] * (N + 1)
queue = deque()
for i in range(1, N + 1):
    if in_degree[i] == 0:
        queue.append(i)
        semester[i] = 1  # 선수과목 없음 → 1학기`
                            },
                            {
                                title: 'BFS + 학기 계산',
                                desc: `큐에서 꺼낸 과목의 이웃 학기를
max(현재값, 선수과목 학기+1)로 갱신합니다.
모든 선수과목 중 가장 늦은 것 + 1이 최소 이수 학기!`,
                                code: `while queue:
    v = queue.popleft()
    for u in graph[v]:
        # 선수과목 중 가장 늦게 끝나는 것 + 1
        semester[u] = max(semester[u], semester[v] + 1)
        in_degree[u] -= 1
        if in_degree[u] == 0:
            queue.append(u)`
                            },
                            {
                                title: '출력',
                                desc: '1번부터 N번까지 각 과목의 최소 이수 학기를 출력합니다.',
                                code: 'print(*semester[1:])'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 구축',
                                desc: `선수과목 관계를 인접 리스트로 저장하고
진입 차수를 세어 위상 정렬을 준비합니다.`,
                                code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    vector<int> in_degree(N + 1, 0);

    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);  // a → b 간선
        in_degree[b]++;         // b의 진입 차수 증가
    }`
                            },
                            {
                                title: '진입 차수 0인 과목 큐에 추가',
                                desc: `선수과목이 없는 과목을 queue에 넣고
semester=1로 초기화합니다.`,
                                code: `    vector<int> semester(N + 1, 0);
    queue<int> q;
    for (int i = 1; i <= N; i++) {
        if (in_degree[i] == 0) {
            q.push(i);
            semester[i] = 1;  // 선수과목 없음 → 1학기
        }
    }`
                            },
                            {
                                title: 'BFS + 학기 계산',
                                desc: `큐에서 꺼낸 과목의 이웃 학기를
max(현재값, 선수과목 학기+1)로 갱신합니다.`,
                                code: `    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (int u : graph[v]) {
            // 선수과목 중 가장 늦게 끝나는 것 + 1
            semester[u] = max(semester[u], semester[v] + 1);
            if (--in_degree[u] == 0) q.push(u);
        }
    }`
                            },
                            {
                                title: '출력',
                                desc: '각 과목의 최소 이수 학기를 출력하고 프로그램을 종료합니다.',
                                code: `    for (int i = 1; i <= N; i++)
        printf("%d%c", semester[i], i == N ? '\\n' : ' ');
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2252',
            title: 'BOJ 2252 - 줄 세우기',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/2252',
            simIntro: 'Kahn\'s Algorithm으로 학생들을 줄 세우는 과정을 단계별로 확인하세요.',
            sim: {
                type: 'lineup'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N명의 학생들을 키 순서대로 줄을 세우려고 한다. 일부 학생들의 키를 비교한 결과가 주어진다. 예를 들어, 학생 A가 학생 B 앞에 서야 한다는 것을 알고 있다면 A는 B보다 앞에 서야 한다. 키를 비교한 결과가 주어질 때, 학생들을 줄 세우는 프로그램을 작성하시오. 답이 여러 가지인 경우 아무거나 출력한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 N(1 ≤ N ≤ 32,000), M(1 ≤ M ≤ 100,000)이 주어진다. M은 키를 비교한 횟수이다. 다음 M개의 줄에는 키를 비교한 두 학생의 번호 A, B가 주어진다. 이는 학생 A가 학생 B의 앞에 서야 한다는 의미이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 학생들을 앞에서부터 줄을 세운 결과를 출력한다. 답이 여러 가지인 경우에는 아무거나 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3 2
1 3
2 3</pre></div>
                    <div><strong>출력</strong><pre>1 2 3</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 2
4 2
3 1</pre></div>
                    <div><strong>출력</strong><pre>4 3 2 1</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ N ≤ 32,000</li><li>1 ≤ M ≤ 100,000</li></ul>
            `,
            hints: [
                {
                    title: '순서가 정해진 정렬?',
                    content: 'A가 B 앞이라는 조건이 여러 개 주어져요. 이 조건을 <strong>모두 만족하는 순서</strong>를 찾아야 합니다.<br>이런 문제를 <strong>"위상 정렬"</strong>이라고 불러요!'
                },
                {
                    title: '진입차수가 0인 노드부터',
                    content: '아무도 "나보다 앞에 서야 한다"고 지정하지 않은 학생 — 즉 <strong>진입차수가 0</strong>인 학생을 먼저 세울 수 있어요.<br><br><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0;padding:10px 14px;background:var(--bg2);border-radius:8px;"><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="width:30px;height:30px;border-radius:50%;border:2px solid var(--green);background:var(--green)20;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;box-shadow:0 0 6px var(--green);">1</div><div style="font-size:0.6rem;color:var(--green);font-weight:600;">진입0</div></div><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="width:30px;height:30px;border-radius:50%;border:2px solid var(--green);background:var(--green)20;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;box-shadow:0 0 6px var(--green);">4</div><div style="font-size:0.6rem;color:var(--green);font-weight:600;">진입0</div></div><div style="font-size:1rem;color:var(--text2);">→</div><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="width:30px;height:30px;border-radius:50%;border:2px solid var(--accent);background:var(--accent)10;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">3</div><div style="font-size:0.6rem;color:var(--text2);">진입1</div></div><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="width:30px;height:30px;border-radius:50%;border:2px solid var(--accent);background:var(--accent)10;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">5</div><div style="font-size:0.6rem;color:var(--text2);">진입2</div></div></div>그 학생을 세우면, 그 학생 뒤에 와야 하는 학생들의 진입차수가 1씩 줄어듭니다.'
                },
                {
                    title: 'BFS(Kahn\'s 알고리즘)로 구현',
                    content: '큐에 진입차수 0인 노드를 넣고, 하나씩 빼면서 연결된 노드의 진입차수를 줄여요. 진입차수가 0이 되면 큐에 추가!<br><br><span class="lang-py">Python: <code>deque</code>를 사용해 BFS 구현</span><span class="lang-cpp">C++: <code>queue</code>를 사용해 BFS 구현</span>'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [[] for _ in range(N + 1)]
in_degree = [0] * (N + 1)

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    in_degree[b] += 1

queue = deque()
for i in range(1, N + 1):
    if in_degree[i] == 0:
        queue.append(i)

result = []
while queue:
    v = queue.popleft()
    result.append(v)
    for u in graph[v]:
        in_degree[u] -= 1
        if in_degree[u] == 0:
            queue.append(u)

print(*result)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    vector<int> in_degree(N + 1, 0);

    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
        in_degree[b]++;
    }

    queue<int> q;
    for (int i = 1; i <= N; i++) {
        if (in_degree[i] == 0) q.push(i);
    }

    while (!q.empty()) {
        int v = q.front(); q.pop();
        printf("%d ", v);
        for (int u : graph[v]) {
            if (--in_degree[u] == 0) q.push(u);
        }
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'Kahn\'s Algorithm (BFS)',
                    description: '진입 차수가 0인 노드부터 큐에 넣고 BFS로 위상 정렬합니다.',
                    timeComplexity: 'O(N + M)',
                    spaceComplexity: 'O(N + M)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [[] for _ in range(N + 1)]
in_degree = [0] * (N + 1)

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    in_degree[b] += 1

queue = deque()
for i in range(1, N + 1):
    if in_degree[i] == 0:
        queue.append(i)

result = []
while queue:
    v = queue.popleft()
    result.append(v)
    for u in graph[v]:
        in_degree[u] -= 1
        if in_degree[u] == 0:
            queue.append(u)

print(*result)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    vector<int> in_degree(N + 1, 0);

    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
        in_degree[b]++;
    }

    queue<int> q;
    for (int i = 1; i <= N; i++) {
        if (in_degree[i] == 0) q.push(i);
    }

    while (!q.empty()) {
        int v = q.front(); q.pop();
        printf("%d ", v);
        for (int u : graph[v]) {
            if (--in_degree[u] == 0) q.push(u);
        }
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 구축',
                                desc: `인접 리스트와 진입 차수 배열을 만들어야
BFS 위상 정렬의 기반이 됩니다.`,
                                code: `import sys
from collections import deque
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [[] for _ in range(N + 1)]
in_degree = [0] * (N + 1)

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    in_degree[b] += 1`
                            },
                            {
                                title: '진입 차수 0인 노드 큐에 추가',
                                desc: `선행 조건이 없는 노드(진입 차수 0)를
먼저 처리할 수 있으므로 큐에 넣습니다.`,
                                code: `queue = deque()
for i in range(1, N + 1):
    if in_degree[i] == 0:
        queue.append(i)`
                            },
                            {
                                title: 'BFS 위상 정렬',
                                desc: `큐에서 꺼낸 노드의 이웃 진입 차수를 줄여
0이 되면 큐에 추가하는 Kahn's Algorithm 핵심 루프.`,
                                code: `result = []
while queue:
    v = queue.popleft()
    result.append(v)
    for u in graph[v]:
        in_degree[u] -= 1
        if in_degree[u] == 0:
            queue.append(u)`
                            },
                            {
                                title: '출력',
                                desc: '위상 정렬 결과를 공백 구분으로 출력합니다.',
                                code: 'print(*result)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 구축',
                                desc: `인접 리스트와 진입 차수 배열을 만들어야
BFS 위상 정렬의 기반이 됩니다.`,
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    vector<int> in_degree(N + 1, 0);

    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
        in_degree[b]++;
    }`
                            },
                            {
                                title: '진입 차수 0인 노드 큐에 추가',
                                desc: `선행 조건이 없는 노드를 queue에 넣어
위상 정렬의 시작점으로 사용합니다.`,
                                code: `    queue<int> q;
    for (int i = 1; i <= N; i++) {
        if (in_degree[i] == 0) q.push(i);
    }`
                            },
                            {
                                title: 'BFS 위상 정렬',
                                desc: `큐에서 꺼내며 이웃의 진입 차수를 줄이고,
0이 되면 큐에 추가하는 Kahn's Algorithm 핵심.`,
                                code: `    while (!q.empty()) {
        int v = q.front(); q.pop();
        printf("%d ", v);
        for (int u : graph[v]) {
            if (--in_degree[u] == 0) q.push(u);
        }
    }`
                            },
                            {
                                title: '출력',
                                desc: '위상 정렬 결과를 출력하고 프로그램을 종료합니다.',
                                code: `    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1766',
            title: 'BOJ 1766 - 문제집',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/1766',
            simIntro: '최소 힙을 사용하여 번호가 작은 문제부터 풀어나가는 과정을 확인하세요.',
            sim: {
                type: 'workbook'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>민오는 1번부터 N번까지 총 N개의 문제로 되어 있는 문제집을 풀려고 한다. 문제는 난이도 순서로 출제되어 있어서 1번 문제가 가장 쉽고 N번 문제가 가장 어렵다. 먼저 풀어야 하는 문제 쌍이 M개 주어진다. 가능하면 쉬운 문제부터(번호가 작은 것부터) 풀려고 한다. 문제를 풀 순서를 출력하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 문제의 수 N(1 ≤ N ≤ 32,000)과 먼저 푸는 것이 좋은 문제에 대한 정보의 개수 M(1 ≤ M ≤ 100,000)이 주어진다. 둘째 줄부터 M개의 줄에 걸쳐 두 정수의 순서쌍 A, B가 빈칸을 사이에 두고 주어진다. 이는 A번 문제는 B번 문제보다 먼저 푸는 것이 좋다는 의미이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 문제 번호를 나타내는 1 이상 N 이하의 정수들을 문제를 풀어야 하는 순서대로 빈칸을 사이에 두고 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 2
4 2
3 1</pre></div>
                    <div><strong>출력</strong><pre>3 1 4 2</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ N ≤ 32,000</li><li>1 ≤ M ≤ 100,000</li></ul>
            `,
            hints: [
                {
                    title: '위상 정렬 + 쉬운 문제 우선',
                    content: '"먼저 풀어야 하는 조건"이 있으니 위상 정렬이 필요해요. 그런데 조건이 하나 더 — <strong>"가능하면 쉬운 문제부터"</strong>, 즉 번호가 작은 것을 우선해야 합니다.'
                },
                {
                    title: '일반 큐로는 안 돼!',
                    content: '2252번처럼 일반 큐를 쓰면 진입차수 0인 노드가 여러 개일 때 <strong>아무거나</strong> 먼저 처리해버려요.<br><br><div style="display:flex;gap:12px;flex-wrap:wrap;margin:10px 0;"><div style="flex:1;min-width:120px;padding:8px 10px;border:2px solid var(--red);border-radius:8px;background:var(--red)06;text-align:center;"><div style="font-size:0.72rem;font-weight:700;color:var(--red);margin-bottom:4px;">일반 큐</div><div style="display:flex;gap:3px;justify-content:center;"><div style="padding:3px 7px;border-radius:4px;background:var(--bg3);font-size:0.8rem;font-weight:600;">5</div><div style="padding:3px 7px;border-radius:4px;background:var(--bg3);font-size:0.8rem;font-weight:600;">2</div><div style="padding:3px 7px;border-radius:4px;background:var(--bg3);font-size:0.8rem;font-weight:600;">3</div></div><div style="font-size:0.65rem;color:var(--red);margin-top:4px;">→ 5 먼저 (순서 무관)</div></div><div style="flex:1;min-width:120px;padding:8px 10px;border:2px solid var(--green);border-radius:8px;background:var(--green)06;text-align:center;"><div style="font-size:0.72rem;font-weight:700;color:var(--green);margin-bottom:4px;">최소 힙</div><div style="display:flex;gap:3px;justify-content:center;"><div style="padding:3px 7px;border-radius:4px;background:var(--green)20;font-size:0.8rem;font-weight:700;color:var(--green);">2</div><div style="padding:3px 7px;border-radius:4px;background:var(--bg3);font-size:0.8rem;font-weight:600;">3</div><div style="padding:3px 7px;border-radius:4px;background:var(--bg3);font-size:0.8rem;font-weight:600;">5</div></div><div style="font-size:0.65rem;color:var(--green);margin-top:4px;">→ 2 먼저 (최솟값!)</div></div></div>번호가 작은 것을 먼저 골라낼 방법이 없습니다!'
                },
                {
                    title: '우선순위 큐(최소 힙)로!',
                    content: '큐 대신 <strong>최소 힙</strong>을 쓰면 진입차수 0인 노드 중 항상 번호가 <strong>가장 작은 것</strong>을 먼저 처리할 수 있어요.<br><br><span class="lang-py">Python: <code>heapq</code> — 기본이 최소 힙이라 바로 사용 가능</span><span class="lang-cpp">C++: <code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code> — greater를 넣어야 최소 힙</span>'
                }
            ],
            templates: {
                python: `import sys
import heapq
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [[] for _ in range(N + 1)]
in_degree = [0] * (N + 1)

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    in_degree[b] += 1

heap = []
for i in range(1, N + 1):
    if in_degree[i] == 0:
        heapq.heappush(heap, i)

result = []
while heap:
    v = heapq.heappop(heap)
    result.append(v)
    for u in graph[v]:
        in_degree[u] -= 1
        if in_degree[u] == 0:
            heapq.heappush(heap, u)

print(*result)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    vector<int> in_degree(N + 1, 0);

    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
        in_degree[b]++;
    }

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= N; i++) {
        if (in_degree[i] == 0) pq.push(i);
    }

    while (!pq.empty()) {
        int v = pq.top(); pq.pop();
        printf("%d ", v);
        for (int u : graph[v]) {
            if (--in_degree[u] == 0) pq.push(u);
        }
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '최소 힙 + Kahn\'s Algorithm',
                    description: '일반 큐 대신 최소 힙을 사용하여 번호가 작은 문제부터 처리합니다.',
                    timeComplexity: 'O((N + M) log N)',
                    spaceComplexity: 'O(N + M)',
                    templates: {
                        python: `import sys
import heapq
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [[] for _ in range(N + 1)]
in_degree = [0] * (N + 1)

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    in_degree[b] += 1

heap = []
for i in range(1, N + 1):
    if in_degree[i] == 0:
        heapq.heappush(heap, i)

result = []
while heap:
    v = heapq.heappop(heap)
    result.append(v)
    for u in graph[v]:
        in_degree[u] -= 1
        if in_degree[u] == 0:
            heapq.heappush(heap, u)

print(*result)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    vector<int> in_degree(N + 1, 0);

    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
        in_degree[b]++;
    }

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= N; i++) {
        if (in_degree[i] == 0) pq.push(i);
    }

    while (!pq.empty()) {
        int v = pq.top(); pq.pop();
        printf("%d ", v);
        for (int u : graph[v]) {
            if (--in_degree[u] == 0) pq.push(u);
        }
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 그래프 구축',
                                desc: `선행 조건을 인접 리스트로 저장하고
진입 차수를 세어 위상 정렬을 준비합니다.`,
                                code: `import sys
import heapq
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [[] for _ in range(N + 1)]
in_degree = [0] * (N + 1)

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    in_degree[b] += 1`
                            },
                            {
                                title: '최소 힙 초기화',
                                desc: `번호가 작은 문제를 먼저 풀어야 하므로
일반 큐 대신 최소 힙을 사용합니다.`,
                                code: `heap = []
for i in range(1, N + 1):
    if in_degree[i] == 0:
        heapq.heappush(heap, i)`
                            },
                            {
                                title: '힙 기반 위상 정렬',
                                desc: `heappop으로 항상 가장 작은 번호를 먼저 꺼내어
"쉬운 문제부터" 조건을 자동으로 만족합니다.`,
                                code: `result = []
while heap:
    v = heapq.heappop(heap)
    result.append(v)
    for u in graph[v]:
        in_degree[u] -= 1
        if in_degree[u] == 0:
            heapq.heappush(heap, u)`
                            },
                            {
                                title: '출력',
                                desc: '최소 힙으로 정렬된 결과를 출력합니다.',
                                code: 'print(*result)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 그래프 구축',
                                desc: `선행 조건을 인접 리스트로 저장하고
진입 차수를 세어 위상 정렬을 준비합니다.`,
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int N, M;
    scanf("%d %d", &N, &M);
    vector<vector<int>> graph(N + 1);
    vector<int> in_degree(N + 1, 0);

    for (int i = 0; i < M; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        graph[a].push_back(b);
        in_degree[b]++;
    }`
                            },
                            {
                                title: '최소 힙 초기화',
                                desc: `priority_queue에 greater<int>를 넣으면 최소 힙!
기본은 최대 힙이라 주의.`,
                                code: `    // greater<int> → 최소 힙 (기본은 최대 힙)
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= N; i++) {
        if (in_degree[i] == 0) pq.push(i);
    }`
                            },
                            {
                                title: '힙 기반 위상 정렬',
                                desc: `pq.top()이 항상 최솟값을 반환하므로
작은 번호부터 자동으로 처리됩니다.`,
                                code: `    while (!pq.empty()) {
        int v = pq.top(); pq.pop();
        printf("%d ", v);
        for (int u : graph[v]) {
            if (--in_degree[u] == 0) pq.push(u);
        }
    }`
                            },
                            {
                                title: '출력',
                                desc: '위상 정렬 결과를 출력하고 프로그램을 종료합니다.',
                                code: `    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-3665',
            title: 'BOJ 3665 - 최종 순위',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/3665',
            simIntro: '작년 순위로부터 간선을 만들고 위상 정렬하는 과정을 확인하세요.',
            sim: {
                type: 'ranking'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>올해 ACM-ICPC 대전 인터넷 예선에는 총 n개의 팀이 참가했다. 작년 순위가 주어지고, 올해 상대적인 순위가 바뀐 쌍이 주어진다. 바뀐 정보를 이용해서 올해 순위를 만들어라. 확실한 순위를 찾을 수 없다면 "?", 일관성이 없는 경우 "IMPOSSIBLE"을 출력한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에는 테스트 케이스의 개수가 주어진다. 각 테스트 케이스의 첫째 줄에는 팀의 수 n(2 ≤ n ≤ 500)이 주어진다. 둘째 줄에는 작년에 i등을 한 팀의 번호가 차례대로 주어진다. 셋째 줄에는 상대적인 등수가 바뀐 쌍의 수 m(0 ≤ m ≤ 25,000)이 주어진다. 다음 m개 줄에는 상대적인 등수가 바뀐 쌍이 주어진다.</p>
                <h4>출력</h4>
                <p>각 테스트 케이스에 대해서 올해 순위를 출력한다. 만약 확실한 순위를 찾을 수 없다면 "?"를, 데이터에 일관성이 없어서 순위를 정할 수 없는 경우에는 "IMPOSSIBLE"을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3
5
5 4 3 2 1
2
2 4
3 4
3
2 3 1
0
4
1 2 3 4
3
1 2
3 4
2 3</pre></div>
                    <div><strong>출력</strong><pre>5 3 2 4 1
2 3 1
IMPOSSIBLE</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>2 ≤ n ≤ 500</li><li>0 ≤ m ≤ 25,000</li><li>T는 테스트 케이스 수</li></ul>
            `,
            hints: [
                {
                    title: '작년 순위에서 시작',
                    content: '작년 순위가 곧 초기 위상 정렬 결과예요. 앞에 있는 팀 → 뒤에 있는 팀으로 <strong>모든 쌍</strong>에 간선을 만들면 DAG가 됩니다.<br>예: [5,4,3,2,1]이면 5→4, 5→3, ..., 4→3, 4→2, ... 모든 쌍!'
                },
                {
                    title: '간선 뒤집기가 핵심',
                    content: '올해 바뀐 쌍의 간선 방향을 <strong>뒤집는 것</strong>이 이 문제의 핵심이에요.<br><br><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0;padding:10px 14px;background:var(--bg2);border-radius:8px;"><div style="display:flex;align-items:center;gap:6px;"><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">A</div><span style="font-size:0.9rem;color:var(--red);text-decoration:line-through;">→</span><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">B</div></div><div style="font-size:1rem;font-weight:700;color:var(--yellow);">⇒</div><div style="display:flex;align-items:center;gap:6px;"><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--green);background:var(--green)15;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">B</div><span style="font-size:0.9rem;color:var(--green);font-weight:700;">→</span><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--green);background:var(--green)15;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">A</div></div></div><div style="font-size:0.82rem;margin-top:4px;">작년에 A가 B보다 앞이었는데 올해 뒤집혔다면 → A→B 간선을 제거하고 B→A로 변경. 진입차수도 함께 조정합니다.</div>'
                },
                {
                    title: 'IMPOSSIBLE과 ?',
                    content: '위상 정렬 도중 큐에 노드가 <strong>2개 이상</strong>이면 순서를 확정할 수 없어요 → <strong>"?"</strong> 출력.<br>모든 노드를 방문하지 못하면 사이클이 존재한다는 뜻 → <strong>"IMPOSSIBLE"</strong> 출력.'
                }
            ],
            templates: {
                python: `import sys
from collections import deque
input = sys.stdin.readline

T = int(input())
for _ in range(T):
    n = int(input())
    rank = list(map(int, input().split()))

    # 모든 쌍에 대해 간선 생성
    graph = [[False] * (n + 1) for _ in range(n + 1)]
    in_degree = [0] * (n + 1)

    for i in range(n):
        for j in range(i + 1, n):
            graph[rank[i]][rank[j]] = True
            in_degree[rank[j]] += 1

    m = int(input())
    for _ in range(m):
        a, b = map(int, input().split())
        if graph[a][b]:
            graph[a][b] = False
            graph[b][a] = True
            in_degree[b] -= 1
            in_degree[a] += 1
        else:
            graph[b][a] = False
            graph[a][b] = True
            in_degree[a] -= 1
            in_degree[b] += 1

    queue = deque()
    for i in range(1, n + 1):
        if in_degree[i] == 0:
            queue.append(i)

    result = []
    ambiguous = False

    for _ in range(n):
        if len(queue) == 0:
            break
        if len(queue) > 1:
            ambiguous = True
        v = queue.popleft()
        result.append(v)
        for u in range(1, n + 1):
            if graph[v][u]:
                in_degree[u] -= 1
                if in_degree[u] == 0:
                    queue.append(u)

    if len(result) != n:
        print("IMPOSSIBLE")
    elif ambiguous:
        print("?")
    else:
        print(*result)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int T;
    scanf("%d", &T);
    while (T--) {
        int n;
        scanf("%d", &n);
        vector<int> rank_arr(n);
        for (int i = 0; i < n; i++) scanf("%d", &rank_arr[i]);

        vector<vector<bool>> graph(n + 1, vector<bool>(n + 1, false));
        vector<int> in_deg(n + 1, 0);

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                graph[rank_arr[i]][rank_arr[j]] = true;
                in_deg[rank_arr[j]]++;
            }
        }

        int m;
        scanf("%d", &m);
        for (int i = 0; i < m; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            if (graph[a][b]) {
                graph[a][b] = false; graph[b][a] = true;
                in_deg[b]--; in_deg[a]++;
            } else {
                graph[b][a] = false; graph[a][b] = true;
                in_deg[a]--; in_deg[b]++;
            }
        }

        queue<int> q;
        for (int i = 1; i <= n; i++) {
            if (in_deg[i] == 0) q.push(i);
        }

        vector<int> result;
        bool ambiguous = false;

        for (int i = 0; i < n; i++) {
            if (q.empty()) { result.clear(); break; }
            if (q.size() > 1) ambiguous = true;
            int v = q.front(); q.pop();
            result.push_back(v);
            for (int u = 1; u <= n; u++) {
                if (graph[v][u]) {
                    if (--in_deg[u] == 0) q.push(u);
                }
            }
        }

        if ((int)result.size() != n) printf("IMPOSSIBLE\\n");
        else if (ambiguous) printf("?\\n");
        else {
            for (int i = 0; i < n; i++)
                printf("%d%c", result[i], i == n - 1 ? '\\n' : ' ');
        }
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '간선 반전 + Kahn\'s Algorithm',
                    description: '작년 순위로 모든 쌍의 간선을 만들고, 바뀐 쌍의 간선을 뒤집은 뒤 위상 정렬합니다.',
                    timeComplexity: 'O(N^2)',
                    spaceComplexity: 'O(N^2)',
                    templates: {
                        python: `import sys
from collections import deque
input = sys.stdin.readline

T = int(input())
for _ in range(T):
    n = int(input())
    rank = list(map(int, input().split()))

    # 모든 쌍에 대해 간선 생성
    graph = [[False] * (n + 1) for _ in range(n + 1)]
    in_degree = [0] * (n + 1)

    for i in range(n):
        for j in range(i + 1, n):
            graph[rank[i]][rank[j]] = True
            in_degree[rank[j]] += 1

    m = int(input())
    for _ in range(m):
        a, b = map(int, input().split())
        if graph[a][b]:
            graph[a][b] = False
            graph[b][a] = True
            in_degree[b] -= 1
            in_degree[a] += 1
        else:
            graph[b][a] = False
            graph[a][b] = True
            in_degree[a] -= 1
            in_degree[b] += 1

    queue = deque()
    for i in range(1, n + 1):
        if in_degree[i] == 0:
            queue.append(i)

    result = []
    ambiguous = False

    for _ in range(n):
        if len(queue) == 0:
            break
        if len(queue) > 1:
            ambiguous = True
        v = queue.popleft()
        result.append(v)
        for u in range(1, n + 1):
            if graph[v][u]:
                in_degree[u] -= 1
                if in_degree[u] == 0:
                    queue.append(u)

    if len(result) != n:
        print("IMPOSSIBLE")
    elif ambiguous:
        print("?")
    else:
        print(*result)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int T;
    scanf("%d", &T);
    while (T--) {
        int n;
        scanf("%d", &n);
        vector<int> rank_arr(n);
        for (int i = 0; i < n; i++) scanf("%d", &rank_arr[i]);

        vector<vector<bool>> graph(n + 1, vector<bool>(n + 1, false));
        vector<int> in_deg(n + 1, 0);

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                graph[rank_arr[i]][rank_arr[j]] = true;
                in_deg[rank_arr[j]]++;
            }
        }

        int m;
        scanf("%d", &m);
        for (int i = 0; i < m; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            if (graph[a][b]) {
                graph[a][b] = false; graph[b][a] = true;
                in_deg[b]--; in_deg[a]++;
            } else {
                graph[b][a] = false; graph[a][b] = true;
                in_deg[a]--; in_deg[b]++;
            }
        }

        queue<int> q;
        for (int i = 1; i <= n; i++) {
            if (in_deg[i] == 0) q.push(i);
        }

        vector<int> result;
        bool ambiguous = false;

        for (int i = 0; i < n; i++) {
            if (q.empty()) { result.clear(); break; }
            if (q.size() > 1) ambiguous = true;
            int v = q.front(); q.pop();
            result.push_back(v);
            for (int u = 1; u <= n; u++) {
                if (graph[v][u]) {
                    if (--in_deg[u] == 0) q.push(u);
                }
            }
        }

        if ((int)result.size() != n) printf("IMPOSSIBLE\\n");
        else if (ambiguous) printf("?\\n");
        else {
            for (int i = 0; i < n; i++)
                printf("%d%c", result[i], i == n - 1 ? '\\n' : ' ');
        }
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 모든 쌍 간선 생성',
                                desc: `작년 순위에서 앞→뒤 모든 쌍에 간선을 만들어
"앞선 팀이 더 높은 순위"라는 관계를 그래프로 표현합니다.`,
                                code: `import sys
from collections import deque
input = sys.stdin.readline

n = int(input())
rank = list(map(int, input().split()))

graph = [[False] * (n + 1) for _ in range(n + 1)]
in_degree = [0] * (n + 1)

for i in range(n):
    for j in range(i + 1, n):
        graph[rank[i]][rank[j]] = True
        in_degree[rank[j]] += 1`
                            },
                            {
                                title: '바뀐 쌍 간선 반전',
                                desc: `올해 상대적 순서가 바뀐 쌍의 간선 방향을
뒤집어 새로운 순위 관계를 반영합니다.`,
                                code: `m = int(input())
for _ in range(m):
    a, b = map(int, input().split())
    if graph[a][b]:
        graph[a][b] = False
        graph[b][a] = True
        in_degree[b] -= 1
        in_degree[a] += 1
    else:
        graph[b][a] = False
        graph[a][b] = True
        in_degree[a] -= 1
        in_degree[b] += 1`
                            },
                            {
                                title: '위상 정렬 + 판별',
                                desc: `큐에 동시에 2개 이상 있으면 순서 불확정("?"),
결과 수가 n보다 적으면 사이클("IMPOSSIBLE").`,
                                code: `queue = deque()
for i in range(1, n + 1):
    if in_degree[i] == 0:
        queue.append(i)

result = []
ambiguous = False

for _ in range(n):
    if len(queue) == 0: break
    if len(queue) > 1: ambiguous = True
    v = queue.popleft()
    result.append(v)
    for u in range(1, n + 1):
        if graph[v][u]:
            in_degree[u] -= 1
            if in_degree[u] == 0:
                queue.append(u)`
                            },
                            {
                                title: '결과 출력',
                                desc: `사이클이면 IMPOSSIBLE, 순서 불확정이면 ?,
그 외엔 확정된 올해 순위를 출력합니다.`,
                                code: `if len(result) != n:
    print("IMPOSSIBLE")
elif ambiguous:
    print("?")
else:
    print(*result)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 모든 쌍 간선 생성',
                                desc: `작년 순위에서 앞→뒤 모든 쌍에 간선.
2차원 bool 배열로 O(1) 간선 확인.`,
                                code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int T; scanf("%d", &T);
    while (T--) {
        int n; scanf("%d", &n);
        vector<int> rank_arr(n);
        for (int i = 0; i < n; i++) scanf("%d", &rank_arr[i]);

        vector<vector<bool>> graph(n+1, vector<bool>(n+1, false));
        vector<int> in_deg(n+1, 0);
        for (int i = 0; i < n; i++)
            for (int j = i+1; j < n; j++) {
                graph[rank_arr[i]][rank_arr[j]] = true;
                in_deg[rank_arr[j]]++;
            }`
                            },
                            {
                                title: '바뀐 쌍 간선 반전',
                                desc: '기존 방향을 뒤집고 진입 차수 갱신.',
                                code: `        int m; scanf("%d", &m);
        for (int i = 0; i < m; i++) {
            int a, b; scanf("%d %d", &a, &b);
            if (graph[a][b]) {
                graph[a][b] = false; graph[b][a] = true;
                in_deg[b]--; in_deg[a]++;
            } else {
                graph[b][a] = false; graph[a][b] = true;
                in_deg[a]--; in_deg[b]++;
            }
        }`
                            },
                            {
                                title: '위상 정렬 + 판별',
                                desc: '큐에 2개 이상 → "?", 결과<n → "IMPOSSIBLE".',
                                code: `        queue<int> q;
        for (int i = 1; i <= n; i++)
            if (in_deg[i] == 0) q.push(i);

        vector<int> result;
        bool ambiguous = false;
        for (int i = 0; i < n; i++) {
            if (q.empty()) break;
            if (q.size() > 1) ambiguous = true;
            int v = q.front(); q.pop();
            result.push_back(v);
            for (int u = 1; u <= n; u++)
                if (graph[v][u] && --in_deg[u] == 0) q.push(u);
        }`
                            },
                            {
                                title: '결과 출력',
                                desc: `사이클이면 IMPOSSIBLE, 순서 불확정이면 ?,
그 외엔 확정된 올해 순위를 출력합니다.`,
                                code: `        if ((int)result.size() != n) printf("IMPOSSIBLE\\n");
        else if (ambiguous) printf("?\\n");
        else {
            for (int i = 0; i < n; i++)
                printf("%d%c", result[i], i==n-1?'\\n':' ');
        }
    }
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
