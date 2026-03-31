import type { AlgoTopic } from '../types'

export const backtrackingTopic: AlgoTopic = {
    id: 'backtracking',
    title: '백트래킹',
    icon: '🔙',
    category: '문제 해결 기법 (Silver~Gold)',
    order: 11,
    description: '끝까지 해보고, 안 되면 돌아와서 다른 길을 가보는 기법',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: '기본 백트래킹',
            problemIds: [
                'boj-15649',
                'boj-15650',
                'boj-15651',
                'boj-15652'
            ],
            desc: 'N과 M 시리즈 (Silver III)'
        },
        {
            num: 2,
            title: '응용 백트래킹',
            problemIds: [
                'boj-14888',
                'boj-14889'
            ],
            desc: '조건이 복잡한 문제 (Silver I)'
        },
        {
            num: 3,
            title: '심화 백트래킹',
            problemIds: [
                'boj-9663',
                'boj-2580'
            ],
            desc: '고전 백트래킹 문제 (Gold IV~V)'
        }
    ],
    problems: [
        {
            id: 'boj-15649',
            title: 'BOJ 15649 - N과 M (1)',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/15649',
            simIntro: 'used 배열을 사용한 순열 생성 백트래킹 과정을 관찰하세요.',
            sim: {
                type: 'nM1'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.</p>
                <ul><li>1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열</li></ul>
                <h4>입력</h4>
                <p>첫째 줄에 자연수 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 8)</p>
                <h4>출력</h4>
                <p>한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.</p>
                <p>수열은 사전 순으로 증가하는 순서로 출력해야 한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3 1</pre></div>
                    <div><strong>출력</strong><pre>1
2
3</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 2</pre></div>
                    <div><strong>출력</strong><pre>1 2
1 3
1 4
2 1
2 3
2 4
3 1
3 2
3 4
4 1
4 2
4 3</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ M ≤ N ≤ 8</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '1~N에서 M개를 뽑는 모든 수열을 만들어야 해. 가장 직관적인 방법은? M중 for문! 예를 들어 M=3이면 <code>for i / for j / for k</code>로 전부 돌리면 되지 않을까?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'M이 몇인지 <strong>입력으로</strong> 들어오잖아. M=2면 2중 for문, M=5면 5중 for문... 코드로는 "M중 for문"을 짤 수가 없어! 게다가 중복 체크도 매번 직접 해줘야 하고.<br><br><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;font-size:0.8rem;"><div style="text-align:center;border:1.5px solid var(--red);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--red);margin-bottom:3px;">M=2</div><code>for i: for j:</code></div><div style="text-align:center;border:1.5px solid var(--red);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--red);margin-bottom:3px;">M=3</div><code>for i: for j: for k:</code></div><div style="text-align:center;border:1.5px solid var(--red);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--red);margin-bottom:3px;">M=?</div><code>for ...: ???</code></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: 'for문 대신 <strong>재귀</strong>를 쓰면 깊이가 자유자재야! <code>backtrack()</code> 함수가 자기 자신을 호출하면서 한 자리씩 채워가는 거지. 그리고 <code>used</code> 배열로 "이미 쓴 숫자"를 표시해두면 중복 방지도 깔끔해.<br><br>핵심 패턴: <strong>선택 → 재귀 → 되돌리기</strong><br>숫자를 고르고 → 다음 자리로 재귀하고 → 돌아오면 <code>used[i] = False</code>와 <code>path.pop()</code>으로 원상복구해서 다른 숫자를 시도해.'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
path = []
used = [False] * (n + 1)

def backtrack():
    if len(path) == m:
        print(*path)
        return
    for i in range(1, n + 1):
        if not used[i]:
            used[i] = True
            path.append(i)
            backtrack()
            path.pop()
            used[i] = False

backtrack()`,
                cpp: `#include <iostream>
using namespace std;

int n, m;
int path[9];
bool used[9];

void backtrack(int depth) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            cout << path[i] << (i < m-1 ? " " : "\\n");
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            used[i] = true;
            path[depth] = i;
            backtrack(depth + 1);
            used[i] = false;
        }
    }
}

int main() {
    cin >> n >> m;
    backtrack(0);
}`
            },
            solutions: [
                {
                    approach: 'used 배열 백트래킹',
                    description: 'used 배열로 사용 여부를 추적하며 순열을 생성한다',
                    timeComplexity: 'O(N!/(N-M)!)',
                    spaceComplexity: 'O(M)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
path = []
used = [False] * (n + 1)

def backtrack():
    if len(path) == m:
        print(*path)
        return
    for i in range(1, n + 1):
        if not used[i]:
            used[i] = True
            path.append(i)
            backtrack()
            path.pop()
            used[i] = False

backtrack()`,
                        cpp: `#include <iostream>
using namespace std;

int n, m;
int path[9];
bool used[9];

void backtrack(int depth) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            cout << path[i] << (i < m-1 ? " " : "\\n");
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            used[i] = true;
            path[depth] = i;
            backtrack(depth + 1);
            used[i] = false;
        }
    }
}

int main() {
    cin >> n >> m;
    backtrack(0);
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '기본 세팅',
                                desc: 'used 배열로 각 숫자의 사용 여부를 추적합니다.',
                                code: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
path = []
used = [False] * (n + 1)`
                            },
                            {
                                title: '백트래킹 함수',
                                desc: '길이가 M이면 출력하고, 아니면 1~N 중 미사용 숫자를 탐색합니다.',
                                code: `def backtrack():
    if len(path) == m:
        print(*path)
        return
    for i in range(1, n + 1):
        if not used[i]:`
                            },
                            {
                                title: '선택과 되돌리기',
                                desc: '숫자를 선택 후 재귀하고, 돌아오면 원상복구하여 다른 선택을 시도합니다.',
                                code: `            used[i] = True
            path.append(i)
            backtrack()
            path.pop()
            used[i] = False

backtrack()`
                            }
                        ],
                        cpp: [
                            {
                                title: '기본 세팅',
                                desc: `path를 depth 인덱스로 관리.
used 배열로 사용 여부 추적.`,
                                code: `#include <iostream>
using namespace std;

int n, m;
int path[9];
bool used[9];`
                            },
                            {
                                title: '백트래킹 함수',
                                desc: 'depth가 M이면 출력, 아니면 미사용 숫자를 순회합니다.',
                                code: `void backtrack(int depth) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            cout << path[i] << (i < m-1 ? " " : "\\n");
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {`
                            },
                            {
                                title: '선택과 되돌리기',
                                desc: '선택 → 재귀 → 복구의 백트래킹 핵심 패턴입니다.',
                                code: `            used[i] = true;
            path[depth] = i;
            backtrack(depth + 1);
            used[i] = false;  // 되돌리기
        }
    }
}

int main() {
    cin >> n >> m;
    backtrack(0);
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-15650',
            title: 'BOJ 15650 - N과 M (2)',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/15650',
            simIntro: 'start 파라미터로 오름차순 조합을 생성하는 과정을 관찰하세요.',
            sim: {
                type: 'nM2'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.</p>
                <ul><li>1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열</li><li>고른 수열은 오름차순이어야 한다.</li></ul>
                <h4>입력</h4>
                <p>첫째 줄에 자연수 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 8)</p>
                <h4>출력</h4>
                <p>한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.</p>
                <p>수열은 사전 순으로 증가하는 순서로 출력해야 한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3 1</pre></div>
                    <div><strong>출력</strong><pre>1
2
3</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 2</pre></div>
                    <div><strong>출력</strong><pre>1 2
1 3
1 4
2 3
2 4
3 4</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ M ≤ N ≤ 8</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'N과 M (1)처럼 수열을 다 만들고, 오름차순이 아닌 것만 걸러내면 되지 않을까? <code>used</code> 배열로 순열 만들고, 출력 전에 정렬 여부를 체크하는 거야.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '그러면 N!/(N-M)!개를 다 만들어 놓고 대부분을 버리게 돼. 예를 들어 N=8, M=4면 1680개를 만들어서 70개만 남기는 셈이야. <strong>만들기 전에</strong> 걸러낼 수 없을까?<br><br><div style="display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;font-size:0.85rem;"><div style="text-align:center;"><div style="font-weight:600;color:var(--red);margin-bottom:3px;">순열 전부 생성</div><div style="font-size:1.3rem;font-weight:700;color:var(--red);">1680개</div></div><div style="font-size:1.5rem;color:var(--text3);">→</div><div style="text-align:center;"><div style="font-weight:600;color:var(--green);margin-bottom:3px;">오름차순만</div><div style="font-size:1.3rem;font-weight:700;color:var(--green);">70개</div></div><div style="font-size:0.75rem;color:var(--text3);">96% 버림!</div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '핵심 아이디어: 이전에 고른 숫자보다 <strong>큰 것만</strong> 고르면 자동으로 오름차순이야!<br><br><code>backtrack(start)</code>에서 반복문을 <code>start</code>부터 시작하고, 재귀할 때 <code>i+1</code>을 넘기면 돼. 이러면 <code>used</code> 배열도 필요 없어! <code>start</code> 파라미터가 "여기부터만 골라"라고 범위를 제한해주니까.'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
path = []

def backtrack(start):
    if len(path) == m:
        print(*path)
        return
    for i in range(start, n + 1):
        path.append(i)
        backtrack(i + 1)
        path.pop()

backtrack(1)`,
                cpp: `#include <iostream>
using namespace std;

int n, m;
int path[9];

void backtrack(int depth, int start) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            cout << path[i] << (i < m-1 ? " " : "\\n");
        return;
    }
    for (int i = start; i <= n; i++) {
        path[depth] = i;
        backtrack(depth + 1, i + 1);
    }
}

int main() {
    cin >> n >> m;
    backtrack(0, 1);
}`
            },
            solutions: [
                {
                    approach: 'start 파라미터 조합',
                    description: 'start 파라미터로 오름차순 조합만 생성한다',
                    timeComplexity: 'O(C(N,M))',
                    spaceComplexity: 'O(M)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
path = []

def backtrack(start):
    if len(path) == m:
        print(*path)
        return
    for i in range(start, n + 1):
        path.append(i)
        backtrack(i + 1)
        path.pop()

backtrack(1)`,
                        cpp: `#include <iostream>
using namespace std;

int n, m;
int path[9];

void backtrack(int depth, int start) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            cout << path[i] << (i < m-1 ? " " : "\\n");
        return;
    }
    for (int i = start; i <= n; i++) {
        path[depth] = i;
        backtrack(depth + 1, i + 1);
    }
}

int main() {
    cin >> n >> m;
    backtrack(0, 1);
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '세팅',
                                desc: 'used 배열 없이 start 파라미터만으로 조합을 구성합니다.',
                                code: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
path = []`
                            },
                            {
                                title: 'start 파라미터',
                                desc: 'start부터 순회하므로 이전 숫자를 다시 고르지 않아 오름차순이 보장됩니다.',
                                code: `def backtrack(start):
    if len(path) == m:
        print(*path)
        return
    for i in range(start, n + 1):`
                            },
                            {
                                title: 'i+1로 재귀',
                                desc: 'i+1을 넘겨 자기보다 큰 수만 선택하게 하여 중복 없는 조합을 만듭니다.',
                                code: `        path.append(i)
        backtrack(i + 1)  # i+1로 오름차순 보장
        path.pop()

backtrack(1)`
                            }
                        ],
                        cpp: [
                            {
                                title: '세팅',
                                desc: 'used 배열 불필요 — start 파라미터가 순서를 제어합니다.',
                                code: `#include <iostream>
using namespace std;

int n, m;
int path[9];`
                            },
                            {
                                title: 'start 파라미터',
                                desc: 'used 배열 불필요 — start가 중복 방지.',
                                code: `void backtrack(int depth, int start) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            cout << path[i] << (i < m-1 ? " " : "\\n");
        return;
    }
    for (int i = start; i <= n; i++) {`
                            },
                            {
                                title: 'i+1로 재귀',
                                desc: 'i+1을 넘겨 현재보다 큰 수만 선택 → 오름차순 조합.',
                                code: `        path[depth] = i;
        backtrack(depth + 1, i + 1);  // i+1로 오름차순 보장
    }
}

int main() {
    cin >> n >> m;
    backtrack(0, 1);
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-15651',
            title: 'BOJ 15651 - N과 M (3)',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/15651',
            simIntro: '중복을 허용하는 순열 생성 과정을 관찰하세요. used 배열이 없습니다!',
            sim: {
                type: 'nM3'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.</p>
                <ul><li>1부터 N까지 자연수 중에서 M개를 고른 수열</li><li>같은 수를 여러 번 골라도 된다.</li></ul>
                <h4>입력</h4>
                <p>첫째 줄에 자연수 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 7)</p>
                <h4>출력</h4>
                <p>한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.</p>
                <p>수열은 사전 순으로 증가하는 순서로 출력해야 한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3 1</pre></div>
                    <div><strong>출력</strong><pre>1
2
3</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 2</pre></div>
                    <div><strong>출력</strong><pre>1 1
1 2
1 3
1 4
2 1
2 2
2 3
2 4
3 1
3 2
3 3
3 4
4 1
4 2
4 3
4 4</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ M ≤ N ≤ 7</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'N과 M (1)과 비슷한데, 이번엔 같은 숫자를 여러 번 써도 돼! 그러면 (1)처럼 <code>used</code> 배열을 쓰되, 재귀 후 되돌릴 때 다시 허용하면 되려나?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '잠깐, <code>used</code>를 쓰고 되돌리는 건 (1)에서 이미 하고 있잖아! 중복을 <strong>허용</strong>하는 거니까, 애초에 "이 숫자 썼는지" 확인 자체가 필요 없는 거야.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>used</code> 배열을 <strong>완전히 없애면</strong> 끝! 매번 1~N 전체를 자유롭게 골라. 코드가 오히려 (1)보다 더 간단해져.<br><br><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;font-size:0.8rem;"><div style="text-align:center;border:1.5px solid var(--accent);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--accent);margin-bottom:3px;">(1) 중복 X</div><code>used[i]</code> 체크 O</div><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--green);margin-bottom:3px;">(3) 중복 O</div><code>used</code> 필요 없음!</div></div><br>단, 출력량이 N<sup>M</sup>개로 어마어마하게 많아질 수 있으니 빠른 출력이 필수야!<br><span class="lang-py">Python: <code>sys.stdout.write()</code>로 한 번에 모아서 출력</span><span class="lang-cpp">C++: <code>printf</code> 또는 <code>ios::sync_with_stdio(false)</code> 사용</span>'
                }
            ],
            templates: {
                python: `import sys

n, m = map(int, sys.stdin.readline().split())
path = []
result = []

def backtrack():
    if len(path) == m:
        result.append(' '.join(map(str, path)))
        return
    for i in range(1, n + 1):
        path.append(i)
        backtrack()
        path.pop()

backtrack()
sys.stdout.write('\\n'.join(result))`,
                cpp: `#include <cstdio>

int n, m;
int path[8];

void backtrack(int depth) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            printf("%d%c", path[i], i < m-1 ? ' ' : '\\n');
        return;
    }
    for (int i = 1; i <= n; i++) {
        path[depth] = i;
        backtrack(depth + 1);
    }
}

int main() {
    scanf("%d %d", &n, &m);
    backtrack(0);
}`
            },
            solutions: [
                {
                    approach: '제한 없는 중복 순열',
                    description: 'used 배열 없이 모든 조합을 생성한다',
                    timeComplexity: 'O(N^M)',
                    spaceComplexity: 'O(M)',
                    templates: {
                        python: `import sys

n, m = map(int, sys.stdin.readline().split())
path = []
result = []

def backtrack():
    if len(path) == m:
        result.append(' '.join(map(str, path)))
        return
    for i in range(1, n + 1):
        path.append(i)
        backtrack()
        path.pop()

backtrack()
sys.stdout.write('\\n'.join(result))`,
                        cpp: `#include <cstdio>

int n, m;
int path[8];

void backtrack(int depth) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            printf("%d%c", path[i], i < m-1 ? ' ' : '\\n');
        return;
    }
    for (int i = 1; i <= n; i++) {
        path[depth] = i;
        backtrack(depth + 1);
    }
}

int main() {
    scanf("%d %d", &n, &m);
    backtrack(0);
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '세팅',
                                desc: 'result에 모아 한 번에 출력 — 출력량이 N^M으로 많기 때문입니다.',
                                code: `import sys

n, m = map(int, sys.stdin.readline().split())
path = []
result = []`
                            },
                            {
                                title: '백트래킹 (used 없음)',
                                desc: '중복 허용이라 used 체크 없이 매번 1~N 전부 선택 가능합니다.',
                                code: `def backtrack():
    if len(path) == m:
        result.append(' '.join(map(str, path)))
        return
    for i in range(1, n + 1):  # 제한 없이 1~N
        path.append(i)
        backtrack()
        path.pop()`
                            },
                            {
                                title: '전체 출력 최적화',
                                desc: 'stdout.write로 한 번에 출력하여 I/O 병목을 줄입니다.',
                                code: `backtrack()
sys.stdout.write('\\n'.join(result))`
                            }
                        ],
                        cpp: [
                            {
                                title: '세팅',
                                desc: 'printf로 빠른 출력 — N^M개가 많을 수 있음.',
                                code: `#include <cstdio>

int n, m;
int path[8];`
                            },
                            {
                                title: '백트래킹 (used 없음)',
                                desc: '중복 허용이라 used 체크 없이 1~N 전체 순회.',
                                code: `void backtrack(int depth) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            printf("%d%c", path[i], i < m-1 ? ' ' : '\\n');
        return;
    }
    for (int i = 1; i <= n; i++) {
        path[depth] = i;
        backtrack(depth + 1);
    }
}`
                            },
                            {
                                title: '입력 및 실행',
                                desc: 'scanf로 빠른 입력 — printf와 짝을 맞춥니다.',
                                code: `int main() {
    scanf("%d %d", &n, &m);
    backtrack(0);
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-15652',
            title: 'BOJ 15652 - N과 M (4)',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/15652',
            simIntro: '중복 조합을 생성하는 과정을 관찰하세요. start를 i로 넘기는 것이 핵심입니다!',
            sim: {
                type: 'nM4'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.</p>
                <ul><li>1부터 N까지 자연수 중에서 M개를 고른 수열</li><li>같은 수를 여러 번 골라도 된다.</li><li>고른 수열은 비내림차순이어야 한다.</li></ul>
                <h4>입력</h4>
                <p>첫째 줄에 자연수 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 8)</p>
                <h4>출력</h4>
                <p>한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.</p>
                <p>수열은 사전 순으로 증가하는 순서로 출력해야 한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3 1</pre></div>
                    <div><strong>출력</strong><pre>1
2
3</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 2</pre></div>
                    <div><strong>출력</strong><pre>1 1
1 2
1 3
1 4
2 2
2 3
2 4
3 3
3 4
4 4</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ M ≤ N ≤ 8</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '비내림차순 + 중복 허용이라... (3)처럼 중복 허용으로 전부 만들고, 비내림차순이 아닌 건 버리면 되지 않을까? 아니면 (2)의 오름차순 코드에서 중복만 허용하면?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '(3)처럼 전부 만들고 거르면 낭비가 크고, (2)의 코드는 <code>i+1</code>을 넘기니까 같은 수를 다시 못 골라. 그럼 어디를 바꿔야 "같은 수도 다시 고를 수 있게" 될까?<br><br><div style="display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;font-size:0.85rem;"><div style="text-align:center;border:1.5px solid var(--accent);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--accent);margin-bottom:3px;">(2) 오름차순</div><code>backtrack(i+1)</code><div style="font-size:0.75rem;color:var(--text3);margin-top:2px;">다음 수부터 → 중복 X</div></div><div style="font-size:1.3rem;color:var(--text3);">→</div><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--green);margin-bottom:3px;">(4) 비내림차순</div><code>backtrack(i)</code><div style="font-size:0.75rem;color:var(--text3);margin-top:2px;">같은 수부터 → 중복 O</div></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '(2)에서 딱 한 글자만 바꾸면 돼! 재귀 호출 시 <code>i+1</code> 대신 <code>i</code>를 넘기면, 자기 자신을 다시 선택할 수 있어. <code>start</code>가 안 올라가니까 같은 수를 또 고를 수 있는 거지.<br><br>📌 <strong>N과 M 시리즈 정리:</strong><br>(1) 순서 O, 중복 X → <code>used</code> 배열<br>(2) 순서 X, 중복 X → <code>start</code>, <code>i+1</code><br>(3) 순서 O, 중복 O → 제한 없음<br>(4) 순서 X, 중복 O → <code>start</code>, <code>i</code>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
path = []

def backtrack(start):
    if len(path) == m:
        print(*path)
        return
    for i in range(start, n + 1):
        path.append(i)
        backtrack(i)    # i+1이 아닌 i!
        path.pop()

backtrack(1)`,
                cpp: `#include <iostream>
using namespace std;

int n, m;
int path[9];

void backtrack(int depth, int start) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            cout << path[i] << (i < m-1 ? " " : "\\n");
        return;
    }
    for (int i = start; i <= n; i++) {
        path[depth] = i;
        backtrack(depth + 1, i);  // i+1이 아닌 i!
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n >> m;
    backtrack(0, 1);
}`
            },
            solutions: [
                {
                    approach: 'start 파라미터 중복 조합',
                    description: 'start를 i로 넘겨 중복 허용 비내림차순 조합을 생성한다',
                    timeComplexity: 'O(C(N+M-1,M))',
                    spaceComplexity: 'O(M)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
path = []

def backtrack(start):
    if len(path) == m:
        print(*path)
        return
    for i in range(start, n + 1):
        path.append(i)
        backtrack(i)    # i+1이 아닌 i!
        path.pop()

backtrack(1)`,
                        cpp: `#include <iostream>
using namespace std;

int n, m;
int path[9];

void backtrack(int depth, int start) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            cout << path[i] << (i < m-1 ? " " : "\\n");
        return;
    }
    for (int i = start; i <= n; i++) {
        path[depth] = i;
        backtrack(depth + 1, i);  // i+1이 아닌 i!
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n >> m;
    backtrack(0, 1);
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '세팅',
                                desc: 'N과 M (2)와 구조 동일 — 차이는 재귀 호출 인자뿐입니다.',
                                code: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
path = []`
                            },
                            {
                                title: 'start 파라미터',
                                desc: 'start부터 순회하여 비내림차순을 보장합니다.',
                                code: `def backtrack(start):
    if len(path) == m:
        print(*path)
        return
    for i in range(start, n + 1):`
                            },
                            {
                                title: 'i로 재귀 (i+1 아님)',
                                desc: 'i를 넘기면 같은 수를 다시 고를 수 있어 중복 조합이 됩니다.',
                                code: `        path.append(i)
        backtrack(i)    # i+1이 아닌 i!
        path.pop()

backtrack(1)`
                            }
                        ],
                        cpp: [
                            {
                                title: '세팅',
                                desc: 'N과 M (2)와 동일한 구조 — 재귀 인자만 다릅니다.',
                                code: `#include <iostream>
using namespace std;

int n, m;
int path[9];`
                            },
                            {
                                title: 'start 파라미터',
                                desc: 'start 이상의 수만 순회하여 비내림차순을 유지합니다.',
                                code: `void backtrack(int depth, int start) {
    if (depth == m) {
        for (int i = 0; i < m; i++)
            cout << path[i] << (i < m-1 ? " " : "\\n");
        return;
    }
    for (int i = start; i <= n; i++) {`
                            },
                            {
                                title: 'i로 재귀 (i+1 아님)',
                                desc: 'i+1이 아닌 i → 같은 수를 또 선택 가능.',
                                code: `        path[depth] = i;
        backtrack(depth + 1, i);  // i+1이 아닌 i!
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n >> m;
    backtrack(0, 1);
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-14888',
            title: 'BOJ 14888 - 연산자 끼워넣기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/14888',
            simIntro: '연산자를 배치하며 최대/최소를 찾는 백트래킹 과정을 관찰하세요.',
            sim: {
                type: 'operator'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N개의 수로 이루어진 수열 A1, A2, ..., AN이 주어진다. 또, 수와 수 사이에 끼워넣을 수 있는 N-1개의 연산자가 주어진다. 연산자는 덧셈(+), 뺄셈(-), 곱셈(×), 나눗셈(÷)으로만 이루어져 있다.</p>
                <p>식의 계산은 연산자 우선 순위를 무시하고 앞에서부터 진행한다. 나눗셈은 정수 나눗셈(C++14의 기준)으로 몫만 취한다. 음수를 양수로 나눌 때는 양수로 바꾼 뒤 몫을 취하고 음수로 바꾼다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 수의 개수 N(2 ≤ N ≤ 11)이 주어진다. 둘째 줄에는 A<sub>1</sub>, A<sub>2</sub>, ..., A<sub>N</sub>이 주어진다. (1 ≤ A<sub>i</sub> ≤ 100) 셋째 줄에는 합이 N-1인 4개의 정수가 주어지는데, 차례대로 덧셈(+)의 개수, 뺄셈(-)의 개수, 곱셈(×)의 개수, 나눗셈(÷)의 개수이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 만들 수 있는 식의 결과의 최댓값을, 둘째 줄에는 최솟값을 출력한다. 연산자를 어떻게 끼워넣어도 항상 -10억보다 크거나 같고, 10억보다 작거나 같은 결과가 나오는 입력만 주어진다. 또한, 앞에서부터 계산했을 때, 중간에 계산되는 식의 결과도 항상 -10억보다 크거나 같고, 10억보다 작거나 같다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>2
5 6
0 0 1 0</pre></div>
                    <div><strong>출력</strong><pre>30
30</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3
3 4 5
1 0 1 0</pre></div>
                    <div><strong>출력</strong><pre>35
17</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>6
1 2 3 4 5 6
2 1 1 1</pre></div>
                    <div><strong>출력</strong><pre>54
-24</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>2 ≤ N ≤ 11</li><li>1 ≤ A<sub>i</sub> ≤ 100</li><li>연산자 개수의 합은 N-1</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '숫자 사이에 연산자 N-1개를 끼워 넣는 거니까... 연산자의 모든 <strong>순서</strong>를 시도해보면 되지 않을까? 예를 들어 [+, -, ×] 가 있으면 이걸 배치하는 모든 순열을 만들어서 계산해보는 거야.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '같은 종류의 연산자가 여러 개일 수 있어! 예를 들어 +가 2개, ×가 1개면, 순열로 만들면 중복 배치가 생기고 비효율적이야. 연산자를 "종류별 개수"로 관리하면 더 깔끔하지 않을까?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>ops = [+개수, -개수, ×개수, ÷개수]</code>로 남은 개수를 관리해! 각 자리에서 남은 연산자 4종류를 확인하고, 개수가 0보다 큰 것만 사용해.<br><br><div style="display:flex;gap:4px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;font-size:0.8rem;"><span style="padding:4px 8px;border-radius:6px;background:var(--accent);color:white;font-weight:600;">선택</span><span style="color:var(--text3);">ops[i] -= 1</span><span style="font-size:1.2rem;color:var(--text3);">→</span><span style="padding:4px 8px;border-radius:6px;background:var(--yellow);color:white;font-weight:600;">재귀</span><span style="color:var(--text3);">backtrack()</span><span style="font-size:1.2rem;color:var(--text3);">→</span><span style="padding:4px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">되돌리기</span><span style="color:var(--text3);">ops[i] += 1</span></div>'
                },
                {
                    title: '함정 주의: 나눗셈!',
                    content: '이 문제의 나눗셈은 <strong>0 방향으로 버림</strong>이야. 양수끼리는 상관없지만, 음수가 섞이면 조심해야 해!<br><span class="lang-py">Python: <code>a // b</code>는 음수에서 바닥 방향으로 내림해서 결과가 달라. <code>int(a / b)</code>를 써야 0 방향 버림이 돼!</span><span class="lang-cpp">C++: <code>a / b</code>가 기본적으로 0 방향 버림이라 그대로 쓰면 돼.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
nums = list(map(int, input().split()))
ops = list(map(int, input().split()))  # +, -, *, //

max_val = -1e9
min_val = 1e9

def backtrack(idx, current):
    global max_val, min_val
    if idx == n:
        max_val = max(max_val, current)
        min_val = min(min_val, current)
        return
    for i in range(4):
        if ops[i] > 0:
            ops[i] -= 1
            if i == 0:   nxt = current + nums[idx]
            elif i == 1: nxt = current - nums[idx]
            elif i == 2: nxt = current * nums[idx]
            else:        nxt = int(current / nums[idx])  # 0 방향 버림
            backtrack(idx + 1, nxt)
            ops[i] += 1

backtrack(1, nums[0])
print(max_val)
print(min_val)`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int n, nums[12], ops[4];
int maxVal = -1e9, minVal = 1e9;

void backtrack(int idx, int cur) {
    if (idx == n) {
        maxVal = max(maxVal, cur);
        minVal = min(minVal, cur);
        return;
    }
    for (int i = 0; i < 4; i++) {
        if (ops[i] > 0) {
            ops[i]--;
            int nxt;
            if (i == 0) nxt = cur + nums[idx];
            else if (i == 1) nxt = cur - nums[idx];
            else if (i == 2) nxt = cur * nums[idx];
            else nxt = cur / nums[idx];
            backtrack(idx + 1, nxt);
            ops[i]++;
        }
    }
}

int main() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> nums[i];
    for (int i = 0; i < 4; i++) cin >> ops[i];
    backtrack(1, nums[0]);
    cout << maxVal << "\\n" << minVal << endl;
}`
            },
            solutions: [
                {
                    approach: '연산자 배치 백트래킹',
                    description: '연산자 개수를 소모/복구하며 모든 배치를 시도한다',
                    timeComplexity: 'O(4^(N-1))',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
nums = list(map(int, input().split()))
ops = list(map(int, input().split()))  # +, -, *, //

max_val = -1e9
min_val = 1e9

def backtrack(idx, current):
    global max_val, min_val
    if idx == n:
        max_val = max(max_val, current)
        min_val = min(min_val, current)
        return
    for i in range(4):
        if ops[i] > 0:
            ops[i] -= 1
            if i == 0:   nxt = current + nums[idx]
            elif i == 1: nxt = current - nums[idx]
            elif i == 2: nxt = current * nums[idx]
            else:        nxt = int(current / nums[idx])  # 0 방향 버림
            backtrack(idx + 1, nxt)
            ops[i] += 1

backtrack(1, nums[0])
print(max_val)
print(min_val)`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int n, nums[12], ops[4];
int maxVal = -1e9, minVal = 1e9;

void backtrack(int idx, int cur) {
    if (idx == n) {
        maxVal = max(maxVal, cur);
        minVal = min(minVal, cur);
        return;
    }
    for (int i = 0; i < 4; i++) {
        if (ops[i] > 0) {
            ops[i]--;
            int nxt;
            if (i == 0) nxt = cur + nums[idx];
            else if (i == 1) nxt = cur - nums[idx];
            else if (i == 2) nxt = cur * nums[idx];
            else nxt = cur / nums[idx];
            backtrack(idx + 1, nxt);
            ops[i]++;
        }
    }
}

int main() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> nums[i];
    for (int i = 0; i < 4; i++) cin >> ops[i];
    backtrack(1, nums[0]);
    cout << maxVal << "\\n" << minVal << endl;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 처리',
                                desc: 'ops 리스트로 +, -, *, // 각 연산자의 남은 개수를 관리합니다.',
                                code: `import sys
input = sys.stdin.readline

n = int(input())
nums = list(map(int, input().split()))
ops = list(map(int, input().split()))

max_val = -1e9
min_val = 1e9`
                            },
                            {
                                title: '연산자 소모/복구',
                                desc: '연산자를 하나 쓰고(ops[i]-=1) 재귀 후 복구(ops[i]+=1)하여 모든 배치를 시도합니다.',
                                code: `def backtrack(idx, current):
    global max_val, min_val
    if idx == n:
        max_val = max(max_val, current)
        min_val = min(min_val, current)
        return
    for i in range(4):
        if ops[i] > 0:
            ops[i] -= 1
            if i == 0:   nxt = current + nums[idx]
            elif i == 1: nxt = current - nums[idx]
            elif i == 2: nxt = current * nums[idx]
            else:        nxt = int(current / nums[idx])
            backtrack(idx + 1, nxt)
            ops[i] += 1`
                            },
                            {
                                title: '최대/최소 갱신',
                                desc: '첫 번째 수(nums[0])부터 시작해 모든 연산자 배치의 최대/최소를 구합니다.',
                                code: `backtrack(1, nums[0])
print(max_val)
print(min_val)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 처리',
                                desc: 'ops[4]로 +, -, *, / 각 연산자의 남은 개수를 관리합니다.',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int n, nums[12], ops[4];
int maxVal = -1e9, minVal = 1e9;`
                            },
                            {
                                title: '연산자 소모/복구',
                                desc: 'C++ 정수 나눗셈은 기본이 0 방향 버림 → 별도 처리 불필요.',
                                code: `void backtrack(int idx, int cur) {
    if (idx == n) {
        maxVal = max(maxVal, cur);
        minVal = min(minVal, cur);
        return;
    }
    for (int i = 0; i < 4; i++) {
        if (ops[i] > 0) {
            ops[i]--;
            int nxt;
            if (i == 0) nxt = cur + nums[idx];
            else if (i == 1) nxt = cur - nums[idx];
            else if (i == 2) nxt = cur * nums[idx];
            else nxt = cur / nums[idx];  // 0 방향 버림 (C++ 기본)
            backtrack(idx + 1, nxt);
            ops[i]++;  // 되돌리기
        }
    }
}`
                            },
                            {
                                title: '최대/최소 갱신',
                                desc: 'nums[0]을 초기값으로 시작해 모든 배치를 탐색합니다.',
                                code: `int main() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> nums[i];
    for (int i = 0; i < 4; i++) cin >> ops[i];
    backtrack(1, nums[0]);
    cout << maxVal << "\\n" << minVal << endl;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-14889',
            title: 'BOJ 14889 - 스타트와 링크',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/14889',
            simIntro: 'N명을 두 팀으로 나누며 시너지 차이를 최소화하는 과정을 관찰하세요.',
            sim: {
                type: 'team'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>짝수 N명을 N/2명씩 두 팀으로 나눈다. S<sub>ij</sub>는 i번과 j번이 같은 팀일 때 능력치. 팀의 능력치는 팀원 쌍의 S<sub>ij</sub> 합. 두 팀의 능력치 차이의 최솟값을 구하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 N(4 ≤ N ≤ 20, N은 짝수)이 주어진다. 둘째 줄부터 N개의 줄에 S가 주어진다. 각 줄은 N개의 수로 이루어져 있고, i번 줄의 j번째 수는 S<sub>ij</sub>이다. S<sub>ii</sub>는 항상 0이고, 나머지 S<sub>ij</sub>는 1보다 크거나 같고, 100보다 작거나 같은 정수이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 스타트 팀과 링크 팀의 능력치의 차이의 최솟값을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4
0 1 2 3
4 0 5 6
7 1 0 2
3 4 5 0</pre></div>
                    <div><strong>출력</strong><pre>0</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>6
0 1 2 3 4 5
1 0 2 3 4 5
1 2 0 3 4 5
1 2 3 0 4 5
1 2 3 4 0 5
1 2 3 4 5 0</pre></div>
                    <div><strong>출력</strong><pre>2</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>4 ≤ N ≤ 20 (짝수)</li><li>1 ≤ S<sub>ij</sub> ≤ 100</li><li>S<sub>ii</sub> = 0</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'N명을 두 팀으로 나누는 거니까, 모든 가능한 팀 조합을 만들어보면 되지 않을까? N명 중 N/2명을 고르면 그게 스타트 팀이고, 나머지가 링크 팀이잖아.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '맞아, 근데 N이 최대 20이야. C(20, 10) = 184,756가지인데, 각 조합마다 팀 능력치를 계산해야 해.<br><br><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;font-size:0.8rem;"><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--text3);">조합 수</div><div style="font-size:1.1rem;font-weight:700;color:var(--accent);">C(20,10) = 184,756</div></div><div style="font-size:1rem;color:var(--text3);">×</div><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--text3);">능력치 계산</div><div style="font-size:1.1rem;font-weight:700;color:var(--accent);">O(N<sup>2</sup>)</div></div><div style="font-size:1rem;color:var(--text3);">=</div><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--text3);">총 연산</div><div style="font-size:1.1rem;font-weight:700;color:var(--green);">충분!</div></div></div>능력치는 팀원 모든 쌍 (i, j)에 대해 <code>S[i][j] + S[j][i]</code>를 합산하는 거야. 더 줄일 수 있을까?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '팀 나누기는 0번 사람부터 순서대로 "스타트에 넣을까, 말까?"를 결정하는 백트래킹으로 구현해. N과 M (2)의 조합 패턴과 비슷해!<br><br>💡 <strong>가지치기 팁:</strong> {1,2,3}을 스타트로 고르는 것과 {4,5,6}을 스타트로 고르는 건 서로 반대팀일 뿐 결과가 같아 (대칭). 그래서 0번 사람은 <strong>항상 스타트 팀에 고정</strong>하면 탐색량이 절반으로 줄어!'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
s = [list(map(int, input().split())) for _ in range(n)]
ans = float('inf')

def calc(team):
    total = 0
    for i in range(len(team)):
        for j in range(i+1, len(team)):
            total += s[team[i]][team[j]] + s[team[j]][team[i]]
    return total

def backtrack(idx, team):
    global ans
    if len(team) == n // 2:
        other = [i for i in range(n) if i not in set(team)]
        diff = abs(calc(team) - calc(other))
        ans = min(ans, diff)
        return
    if idx >= n:
        return
    if n - idx < n // 2 - len(team):
        return
    team.append(idx)
    backtrack(idx + 1, team)
    team.pop()
    backtrack(idx + 1, team)

backtrack(0, [])
print(ans)`,
                cpp: `#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

int n, s[20][20];
bool team[20];
int ans = 1e9;

void backtrack(int idx, int cnt) {
    if (cnt == n / 2) {
        int s1 = 0, s2 = 0;
        for (int i = 0; i < n; i++)
            for (int j = i+1; j < n; j++) {
                if (team[i] && team[j])
                    s1 += s[i][j] + s[j][i];
                else if (!team[i] && !team[j])
                    s2 += s[i][j] + s[j][i];
            }
        ans = min(ans, abs(s1 - s2));
        return;
    }
    if (idx >= n) return;
    if (n - idx < n/2 - cnt) return;
    team[idx] = true;
    backtrack(idx + 1, cnt + 1);
    team[idx] = false;
    backtrack(idx + 1, cnt);
}

int main() {
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> s[i][j];
    backtrack(0, 0);
    cout << ans << endl;
}`
            },
            solutions: [
                {
                    approach: '팀 분배 백트래킹',
                    description: 'N명 중 N/2명을 선택하여 시너지 차이를 최소화한다',
                    timeComplexity: 'O(C(N,N/2)*N^2)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
s = [list(map(int, input().split())) for _ in range(n)]
ans = float('inf')

def calc(team):
    total = 0
    for i in range(len(team)):
        for j in range(i+1, len(team)):
            total += s[team[i]][team[j]] + s[team[j]][team[i]]
    return total

def backtrack(idx, team):
    global ans
    if len(team) == n // 2:
        other = [i for i in range(n) if i not in set(team)]
        diff = abs(calc(team) - calc(other))
        ans = min(ans, diff)
        return
    if idx >= n:
        return
    if n - idx < n // 2 - len(team):
        return
    team.append(idx)
    backtrack(idx + 1, team)
    team.pop()
    backtrack(idx + 1, team)

backtrack(0, [])
print(ans)`,
                        cpp: `#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

int n, s[20][20];
bool team[20];
int ans = 1e9;

void backtrack(int idx, int cnt) {
    if (cnt == n / 2) {
        int s1 = 0, s2 = 0;
        for (int i = 0; i < n; i++)
            for (int j = i+1; j < n; j++) {
                if (team[i] && team[j])
                    s1 += s[i][j] + s[j][i];
                else if (!team[i] && !team[j])
                    s2 += s[i][j] + s[j][i];
            }
        ans = min(ans, abs(s1 - s2));
        return;
    }
    if (idx >= n) return;
    if (n - idx < n/2 - cnt) return;
    team[idx] = true;
    backtrack(idx + 1, cnt + 1);
    team[idx] = false;
    backtrack(idx + 1, cnt);
}

int main() {
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> s[i][j];
    backtrack(0, 0);
    cout << ans << endl;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력과 초기화',
                                desc: 'N×N 시너지 행렬을 읽고, 최솟값을 무한대로 초기화합니다.',
                                code: `import sys
input = sys.stdin.readline

n = int(input())
s = [list(map(int, input().split())) for _ in range(n)]
ans = float('inf')`
                            },
                            {
                                title: 'N/2명 선택',
                                desc: '각 사람을 팀에 넣거나 빼며 C(N,N/2) 조합을 탐색합니다.',
                                code: `def backtrack(idx, team):
    global ans
    if len(team) == n // 2:
        other = [i for i in range(n) if i not in set(team)]
        diff = abs(calc(team) - calc(other))
        ans = min(ans, diff)
        return
    if idx >= n or n - idx < n // 2 - len(team):
        return
    team.append(idx)
    backtrack(idx + 1, team)
    team.pop()
    backtrack(idx + 1, team)`
                            },
                            {
                                title: '시너지 계산과 차이',
                                desc: '팀원 모든 쌍의 S[i][j]+S[j][i]를 합산하여 두 팀 차이를 구합니다.',
                                code: `def calc(team):
    total = 0
    for i in range(len(team)):
        for j in range(i+1, len(team)):
            total += s[team[i]][team[j]] + s[team[j]][team[i]]
    return total

backtrack(0, [])
print(ans)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력과 초기화',
                                desc: `bool team[] 배열로 팀 소속 관리.
Python의 list.append/pop 대신 bool 토글.`,
                                code: `#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

int n, s[20][20];
bool team[20];
int ans = 1e9;`
                            },
                            {
                                title: 'N/2명 선택',
                                desc: '가지치기: 남은 인원이 부족하면 조기 종료.',
                                code: `void backtrack(int idx, int cnt) {
    if (cnt == n / 2) {
        int s1 = 0, s2 = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                if (team[i] && team[j])
                    s1 += s[i][j] + s[j][i];
                else if (!team[i] && !team[j])
                    s2 += s[i][j] + s[j][i];
            }
        ans = min(ans, abs(s1 - s2));
        return;
    }
    if (idx >= n || n - idx < n/2 - cnt) return;
    team[idx] = true;
    backtrack(idx + 1, cnt + 1);
    team[idx] = false;  // 되돌리기
    backtrack(idx + 1, cnt);
}`
                            },
                            {
                                title: '시너지 계산과 차이',
                                desc: 'team[] 배열로 팀 분류 후, 쌍별 시너지 합을 비교합니다.',
                                code: `int main() {
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> s[i][j];
    backtrack(0, 0);
    cout << ans << endl;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-9663',
            title: 'BOJ 9663 - N-Queen',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/9663',
            simIntro: '4×4 체스판에서 퀸을 배치하고 충돌을 확인하는 과정을 관찰하세요.',
            sim: {
                type: 'nQueen'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N×N인 체스판 위에 퀸 N개를 서로 공격할 수 없게 놓는 문제이다. N이 주어졌을 때, 퀸을 놓는 방법의 수를 구하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 N이 주어진다. (1 ≤ N < 15)</p>
                <h4>출력</h4>
                <p>첫째 줄에 퀸 N개를 서로 공격할 수 없게 놓는 경우의 수를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>8</pre></div>
                    <div><strong>출력</strong><pre>92</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ N ≤ 15 (단, 시간제한 10초)</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'N×N 체스판의 모든 칸에 퀸을 놓아볼까? N개의 퀸을 N<sup>2</sup>개의 칸 중에 배치하는 모든 경우의 수를 시도하면... 되긴 하겠지?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N=8이면 64칸 중 8개를 고르는 건 C(64, 8) = 약 44억 가지야! 너무 많아.<br><br><div style="display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;font-size:0.8rem;"><div style="text-align:center;"><div style="font-weight:600;color:var(--red);margin-bottom:3px;">모든 칸 조합</div><div style="font-size:1.1rem;font-weight:700;color:var(--red);">C(64,8) ≈ 44억</div></div><div style="font-size:1.2rem;color:var(--text3);">→</div><div style="text-align:center;"><div style="font-weight:600;color:var(--yellow);margin-bottom:3px;">행별 1개씩</div><div style="font-size:1.1rem;font-weight:700;color:var(--yellow);">8<sup>8</sup> = 1677만</div></div><div style="font-size:1.2rem;color:var(--text3);">→</div><div style="text-align:center;"><div style="font-weight:600;color:var(--green);margin-bottom:3px;">+ 가지치기</div><div style="font-size:1.1rem;font-weight:700;color:var(--green);">훨씬 적음!</div></div></div>퀸은 같은 행에 두 개가 올 수 없으니까, <strong>한 행에 하나씩</strong>만 놓으면 줄어들고, 충돌 체크로 더 가지치기하면 훨씬 빨라져.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '행별로 퀸을 놓을 <strong>열</strong>을 선택하면서 백트래킹해! 행 충돌은 구조적으로 불가능하고, 확인할 건 세 가지:<br>① 같은 열에 이미 퀸이 있나? → <code>col[c]</code><br>② ↘ 대각선에 퀸이 있나? → 같은 대각선은 <code>row - col</code> 값이 같아! → <code>diag1[r-c+N]</code><br>③ ↗ 대각선에 퀸이 있나? → 같은 대각선은 <code>row + col</code> 값이 같아! → <code>diag2[r+c]</code>'
                },
                {
                    title: '더 빠르게 할 수 있어!',
                    content: '2차원 보드 대신 <strong>1차원 배열 3개</strong>(col, diag1, diag2)만 쓰면 충돌 확인이 O(1)이야. 매번 보드를 탐색할 필요 없이 배열 인덱스 하나만 보면 되니까 엄청 빨라져. N=15까지도 10초 안에 해결할 수 있어!'
                }
            ],
            templates: {
                python: `import sys

n = int(sys.stdin.readline())
col = [False] * n
diag1 = [False] * (2 * n)  # row - col + n
diag2 = [False] * (2 * n)  # row + col
count = 0

def solve(row):
    global count
    if row == n:
        count += 1
        return
    for c in range(n):
        if not col[c] and not diag1[row - c + n] and not diag2[row + c]:
            col[c] = diag1[row - c + n] = diag2[row + c] = True
            solve(row + 1)
            col[c] = diag1[row - c + n] = diag2[row + c] = False

solve(0)
print(count)`,
                cpp: `#include <iostream>
using namespace std;

int n, cnt = 0;
bool col[15], diag1[30], diag2[30];

void solve(int row) {
    if (row == n) { cnt++; return; }
    for (int c = 0; c < n; c++) {
        if (!col[c] && !diag1[row-c+n] && !diag2[row+c]) {
            col[c] = diag1[row-c+n] = diag2[row+c] = true;
            solve(row + 1);
            col[c] = diag1[row-c+n] = diag2[row+c] = false;
        }
    }
}

int main() {
    cin >> n;
    solve(0);
    cout << cnt << endl;
}`
            },
            solutions: [
                {
                    approach: '열/대각선 체크 백트래킹',
                    description: 'col, diag1, diag2 배열로 O(1) 충돌 체크한다',
                    timeComplexity: 'O(N!)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys

n = int(sys.stdin.readline())
col = [False] * n
diag1 = [False] * (2 * n)  # row - col + n
diag2 = [False] * (2 * n)  # row + col
count = 0

def solve(row):
    global count
    if row == n:
        count += 1
        return
    for c in range(n):
        if not col[c] and not diag1[row - c + n] and not diag2[row + c]:
            col[c] = diag1[row - c + n] = diag2[row + c] = True
            solve(row + 1)
            col[c] = diag1[row - c + n] = diag2[row + c] = False

solve(0)
print(count)`,
                        cpp: `#include <iostream>
using namespace std;

int n, cnt = 0;
bool col[15], diag1[30], diag2[30];

void solve(int row) {
    if (row == n) { cnt++; return; }
    for (int c = 0; c < n; c++) {
        if (!col[c] && !diag1[row-c+n] && !diag2[row+c]) {
            col[c] = diag1[row-c+n] = diag2[row+c] = true;
            solve(row + 1);
            col[c] = diag1[row-c+n] = diag2[row+c] = false;
        }
    }
}

int main() {
    cin >> n;
    solve(0);
    cout << cnt << endl;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '충돌 배열 세팅',
                                desc: 'col/diag1/diag2 세 배열로 열과 양쪽 대각선 사용 여부를 O(1)에 체크합니다.',
                                code: `import sys

n = int(sys.stdin.readline())
col = [False] * n
diag1 = [False] * (2 * n)  # row - col + n
diag2 = [False] * (2 * n)  # row + col
count = 0`
                            },
                            {
                                title: '행별 퀸 배치',
                                desc: '한 행에 퀸을 하나만 놓으므로, 행별로 열을 선택하며 재귀합니다.',
                                code: `def solve(row):
    global count
    if row == n:
        count += 1
        return
    for c in range(n):`
                            },
                            {
                                title: '대각선 충돌 체크',
                                desc: 'row-c+n(↘ 대각선), row+c(↗ 대각선) 인덱스로 충돌을 판별합니다.',
                                code: `        if not col[c] and not diag1[row - c + n] and not diag2[row + c]:
            col[c] = diag1[row - c + n] = diag2[row + c] = True
            solve(row + 1)
            col[c] = diag1[row - c + n] = diag2[row + c] = False

solve(0)
print(count)`
                            }
                        ],
                        cpp: [
                            {
                                title: '충돌 배열 세팅',
                                desc: `col: 열 사용 여부, diag1/diag2: 대각선 사용 여부.
bool 배열 3개로 O(1) 충돌 체크.`,
                                code: `#include <iostream>
using namespace std;

int n, cnt = 0;
bool col[15], diag1[30], diag2[30];`
                            },
                            {
                                title: '행별 퀸 배치',
                                desc: '행마다 열을 하나 선택 — 행 충돌은 구조적으로 불가능합니다.',
                                code: `void solve(int row) {
    if (row == n) {
        cnt++;
        return;
    }
    for (int c = 0; c < n; c++) {`
                            },
                            {
                                title: '대각선 충돌 체크',
                                desc: `row-c+n: ↘ 대각선 인덱스 (음수 방지).
row+c: ↗ 대각선 인덱스.`,
                                code: `        if (!col[c] && !diag1[row-c+n] && !diag2[row+c]) {
            col[c] = diag1[row-c+n] = diag2[row+c] = true;
            solve(row + 1);
            col[c] = diag1[row-c+n] = diag2[row+c] = false;
        }
    }
}

int main() {
    cin >> n;
    solve(0);
    cout << cnt << endl;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2580',
            title: 'BOJ 2580 - 스도쿠',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/2580',
            simIntro: '4×4 미니 스도쿠에서 빈 칸을 채우는 백트래킹 과정을 관찰하세요.',
            sim: {
                type: 'sudoku'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>스도쿠는 18세기 스위스 수학자가 만든 '라틴 사각형'이라는 퍼즐에서 유래한 것으로, 가로 9칸, 세로 9칸으로 이루어져 있는 표에 1부터 9까지의 숫자를 채워넣는 퍼즐이다.</p>
                <p>같은 행, 같은 열, 같은 3×3 정사각형 안에는 같은 숫자가 들어가지 않도록 하면서 빈 칸(0)을 채워 완성하시오. 답이 여러 개이면 하나만 출력.</p>
                <h4>입력</h4>
                <p>아홉 줄에 걸쳐 한 줄에 9개씩 게임 시작 전 스도쿠판 각 줄에 쓰여 있는 숫자가 한 칸씩 띄워서 차례로 주어진다. 스도쿠 판의 빈 칸의 경우에는 0이 주어진다. 스도쿠 판을 규칙대로 채울 수 없는 경우의 입력은 주어지지 않는다.</p>
                <h4>출력</h4>
                <p>모든 빈 칸이 채워진 스도쿠 판의 최종 모습을 아홉 줄에 걸쳐 한 줄에 9개씩 한 칸씩 띄워서 출력한다.</p>
                <p>스도쿠 판을 채우는 방법이 여럿인 경우는 그 중 하나만을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>0 3 5 4 6 9 2 7 8
7 8 2 1 0 5 6 0 9
0 6 0 2 7 8 1 3 5
3 2 1 0 4 6 8 9 7
8 0 4 9 1 3 5 0 6
5 9 6 8 2 0 4 1 3
9 1 7 6 5 2 0 8 0
6 0 3 7 0 1 9 5 2
2 5 8 3 9 4 7 6 0</pre></div>
                    <div><strong>출력</strong><pre>1 3 5 4 6 9 2 7 8
7 8 2 1 3 5 6 4 9
4 6 9 2 7 8 1 3 5
3 2 1 5 4 6 8 9 7
8 7 4 9 1 3 5 2 6
5 9 6 8 2 7 4 1 3
9 1 7 6 5 2 3 8 4
6 4 3 7 8 1 9 5 2
2 5 8 3 9 4 7 6 1</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>빈 칸은 0으로 표시</li><li>답이 여러 개이면 하나만 출력</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '빈 칸에 1~9를 넣어보면 되지 않을까? 첫 번째 빈 칸에 1을 넣어보고, 두 번째 빈 칸에 1을 넣어보고... 이런 식으로 모든 경우를 시도하는 거야.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '빈 칸이 많으면 9<sup>빈칸수</sup>가지를 전부 시도하게 돼! 하지만 스도쿠는 규칙이 빡빡하잖아 — 같은 행, 같은 열, 같은 3×3 박스에 중복 불가. 이 조건을 <strong>넣는 순간에</strong> 체크하면 불가능한 가지를 미리 잘라낼 수 있어.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '빈 칸 좌표를 미리 모아두고, 순서대로 하나씩 채워가면서 백트래킹해!<br><br>매번 숫자를 넣을 때 세 가지를 확인해:<br><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="border:1.5px solid var(--accent);border-radius:8px;padding:6px 10px;text-align:center;"><div style="font-weight:600;color:var(--accent);">① 행 체크</div><div style="display:flex;gap:2px;margin-top:4px;"><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">5</span><span style="padding:2px 6px;border-radius:4px;background:var(--bg3);">3</span><span style="padding:2px 6px;border-radius:4px;background:var(--bg3);">?</span><span style="padding:2px 6px;border-radius:4px;background:var(--bg3);">7</span></div></div><div style="border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;text-align:center;"><div style="font-weight:600;color:var(--green);">② 열 체크</div><div style="display:flex;flex-direction:column;gap:2px;margin-top:4px;align-items:center;"><span style="padding:2px 6px;border-radius:4px;background:var(--green);color:white;">6</span><span style="padding:2px 6px;border-radius:4px;background:var(--bg3);">?</span><span style="padding:2px 6px;border-radius:4px;background:var(--bg3);">9</span></div></div><div style="border:1.5px solid var(--yellow);border-radius:8px;padding:6px 10px;text-align:center;"><div style="font-weight:600;color:var(--yellow);">③ 3×3 박스</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:4px;"><span style="padding:2px 5px;border-radius:3px;background:var(--yellow);color:white;font-size:0.7rem;">5</span><span style="padding:2px 5px;border-radius:3px;background:var(--yellow);color:white;font-size:0.7rem;">3</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.7rem;">?</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.7rem;">6</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.7rem;"> </span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.7rem;"> </span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.7rem;"> </span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.7rem;">9</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.7rem;">8</span></div></div></div>3×3 박스의 시작점은 <code>(row//3*3, col//3*3)</code>로 계산해. 실패하면 0으로 되돌리고 다음 숫자를 시도!'
                },
                {
                    title: '마지막 포인트: 즉시 종료!',
                    content: '답이 여러 개일 수 있지만 <strong>하나만 출력</strong>하면 돼. 빈 칸을 모두 채우면 바로 출력하고 프로그램을 종료해야 해.<br><span class="lang-py">Python: <code>sys.exit()</code>로 즉시 종료</span><span class="lang-cpp">C++: <code>exit(0)</code>으로 즉시 종료</span><br><br>💡 더 빠르게 하려면? 가능한 숫자가 <strong>가장 적은</strong> 빈 칸부터 채우면 가지치기 효과가 커져!'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

board = [list(map(int, input().split())) for _ in range(9)]
blanks = [(r, c) for r in range(9) for c in range(9) if board[r][c] == 0]

def is_valid(r, c, num):
    if num in board[r]: return False
    for i in range(9):
        if board[i][c] == num: return False
    sr, sc = r // 3 * 3, c // 3 * 3
    for i in range(sr, sr + 3):
        for j in range(sc, sc + 3):
            if board[i][j] == num: return False
    return True

def solve(idx):
    if idx == len(blanks):
        for row in board:
            print(*row)
        sys.exit()
    r, c = blanks[idx]
    for num in range(1, 10):
        if is_valid(r, c, num):
            board[r][c] = num
            solve(idx + 1)
            board[r][c] = 0

solve(0)`,
                cpp: `#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;

int board[9][9];
vector<pair<int,int>> blanks;

bool isValid(int r, int c, int num) {
    for (int i = 0; i < 9; i++) {
        if (board[r][i] == num) return false;
        if (board[i][c] == num) return false;
    }
    int sr = r/3*3, sc = c/3*3;
    for (int i = sr; i < sr+3; i++)
        for (int j = sc; j < sc+3; j++)
            if (board[i][j] == num) return false;
    return true;
}

void solve(int idx) {
    if (idx == blanks.size()) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++)
                cout << board[i][j] << (j < 8 ? " " : "\\n");
        }
        exit(0);
    }
    auto [r, c] = blanks[idx];
    for (int num = 1; num <= 9; num++) {
        if (isValid(r, c, num)) {
            board[r][c] = num;
            solve(idx + 1);
            board[r][c] = 0;
        }
    }
}

int main() {
    for (int i = 0; i < 9; i++)
        for (int j = 0; j < 9; j++) {
            cin >> board[i][j];
            if (board[i][j] == 0) blanks.push_back({i, j});
        }
    solve(0);
}`
            },
            solutions: [
                {
                    approach: '빈칸 채우기 백트래킹',
                    description: '빈칸을 순서대로 1~9를 넣어보며 충돌 검사한다',
                    timeComplexity: 'O(9^빈칸수)',
                    spaceComplexity: 'O(81)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

board = [list(map(int, input().split())) for _ in range(9)]
blanks = [(r, c) for r in range(9) for c in range(9) if board[r][c] == 0]

def is_valid(r, c, num):
    if num in board[r]: return False
    for i in range(9):
        if board[i][c] == num: return False
    sr, sc = r // 3 * 3, c // 3 * 3
    for i in range(sr, sr + 3):
        for j in range(sc, sc + 3):
            if board[i][j] == num: return False
    return True

def solve(idx):
    if idx == len(blanks):
        for row in board:
            print(*row)
        sys.exit()
    r, c = blanks[idx]
    for num in range(1, 10):
        if is_valid(r, c, num):
            board[r][c] = num
            solve(idx + 1)
            board[r][c] = 0

solve(0)`,
                        cpp: `#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;

int board[9][9];
vector<pair<int,int>> blanks;

bool isValid(int r, int c, int num) {
    for (int i = 0; i < 9; i++) {
        if (board[r][i] == num) return false;
        if (board[i][c] == num) return false;
    }
    int sr = r/3*3, sc = c/3*3;
    for (int i = sr; i < sr+3; i++)
        for (int j = sc; j < sc+3; j++)
            if (board[i][j] == num) return false;
    return true;
}

void solve(int idx) {
    if (idx == blanks.size()) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++)
                cout << board[i][j] << (j < 8 ? " " : "\\n");
        }
        exit(0);
    }
    auto [r, c] = blanks[idx];
    for (int num = 1; num <= 9; num++) {
        if (isValid(r, c, num)) {
            board[r][c] = num;
            solve(idx + 1);
            board[r][c] = 0;
        }
    }
}

int main() {
    for (int i = 0; i < 9; i++)
        for (int j = 0; j < 9; j++) {
            cin >> board[i][j];
            if (board[i][j] == 0) blanks.push_back({i, j});
        }
    solve(0);
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '빈칸 수집',
                                desc: '빈칸(0) 좌표를 미리 모아두면 순서대로 채우기만 하면 됩니다.',
                                code: `import sys
input = sys.stdin.readline

board = [list(map(int, input().split())) for _ in range(9)]
blanks = [(r, c) for r in range(9) for c in range(9) if board[r][c] == 0]`
                            },
                            {
                                title: '행/열/박스 검증',
                                desc: '같은 행, 열, 3x3 박스에 중복이 없는지 확인합니다.',
                                code: `def is_valid(r, c, num):
    if num in board[r]: return False
    for i in range(9):
        if board[i][c] == num: return False
    sr, sc = r // 3 * 3, c // 3 * 3
    for i in range(sr, sr + 3):
        for j in range(sc, sc + 3):
            if board[i][j] == num: return False
    return True`
                            },
                            {
                                title: '채우기와 출력',
                                desc: '1~9를 넣어보고 실패 시 0으로 되돌리며, 완성 시 sys.exit()로 즉시 종료합니다.',
                                code: `def solve(idx):
    if idx == len(blanks):
        for row in board:
            print(*row)
        sys.exit()
    r, c = blanks[idx]
    for num in range(1, 10):
        if is_valid(r, c, num):
            board[r][c] = num
            solve(idx + 1)
            board[r][c] = 0

solve(0)`
                            }
                        ],
                        cpp: [
                            {
                                title: '빈칸 수집',
                                desc: `auto [r, c]로 구조적 바인딩 (C++17).
exit(0)으로 답 찾으면 즉시 종료.`,
                                code: `#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;

int board[9][9];
vector<pair<int,int>> blanks;`
                            },
                            {
                                title: '행/열/박스 검증',
                                desc: 'r/3*3, c/3*3으로 3x3 박스 시작점을 계산합니다.',
                                code: `bool isValid(int r, int c, int num) {
    for (int i = 0; i < 9; i++) {
        if (board[r][i] == num) return false;  // 행
        if (board[i][c] == num) return false;  // 열
    }
    int sr = r/3*3, sc = c/3*3;  // 3x3 박스 시작점
    for (int i = sr; i < sr+3; i++)
        for (int j = sc; j < sc+3; j++)
            if (board[i][j] == num) return false;
    return true;
}`
                            },
                            {
                                title: '채우기와 출력',
                                desc: '1~9를 넣어보고 실패 시 0으로 되돌리며, exit(0)으로 첫 답 즉시 종료합니다.',
                                code: `void solve(int idx) {
    if (idx == (int)blanks.size()) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++)
                cout << board[i][j] << (j < 8 ? " " : "\\n");
        }
        exit(0);  // 답 하나만 출력 후 즉시 종료
    }
    auto [r, c] = blanks[idx];
    for (int num = 1; num <= 9; num++) {
        if (isValid(r, c, num)) {
            board[r][c] = num;
            solve(idx + 1);
            board[r][c] = 0;  // 되돌리기
        }
    }
}

int main() {
    for (int i = 0; i < 9; i++)
        for (int j = 0; j < 9; j++) {
            cin >> board[i][j];
            if (board[i][j] == 0)
                blanks.push_back({i, j});
        }
    solve(0);
}`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
