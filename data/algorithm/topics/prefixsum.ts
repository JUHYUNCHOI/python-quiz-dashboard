import type { AlgoTopic } from '../types'

export const prefixSumTopic: AlgoTopic = {
    id: 'prefixsum',
    title: '누적합',
    icon: '📊',
    category: '탐색 (Silver)',
    order: 10,
    description: '구간의 합을 한 번에 구하는 기법',
    track: 'both',
    stages: [
        {
            num: 1,
            title: '1차원 입문',
            problemIds: [
                'boj-11659',
                'boj-2559'
            ],
            desc: '기본 누적합 (Silver III)'
        },
        {
            num: 2,
            title: '응용 + 2차원',
            problemIds: [
                'boj-16139',
                'boj-11660',
                'boj-25682'
            ],
            desc: '누적합 활용, 2차원 누적합 (Silver I ~ Gold V)'
        },
        {
            num: 3,
            title: '심화',
            problemIds: [
                'boj-10986'
            ],
            desc: '나머지 연산 응용 (Gold III)'
        }
    ],
    problems: [
        {
            id: 'boj-11659',
            title: 'BOJ 11659 - 구간 합 구하기 4',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/11659',
            simIntro: '누적합 배열을 만들고 구간 합 쿼리를 O(1)로 처리하는 과정을 관찰하세요.',
            sim: {
                type: 'range'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>수 N개가 주어졌을 때, i번째 수부터 j번째 수까지의 합을 구하는 프로그램을 작성하시오.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 3
5 4 3 2 1
1 3
2 4
5 5</pre></div>
                    <div><strong>출력</strong><pre>12
9
1</pre></div>
                </div></div>
                <h4>입력</h4>
                <p>첫째 줄에 수의 개수 N과 합을 구해야 하는 횟수 M이 주어진다. 둘째 줄에는 N개의 수가 주어진다. 수는 1,000보다 작거나 같은 자연수이다. 셋째 줄부터 M개의 줄에는 합을 구해야 하는 구간 i와 j가 주어진다.</p>
                <h4>출력</h4>
                <p>총 M개의 줄에 입력으로 주어진 i번째 수부터 j번째 수까지의 합을 출력한다.</p>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 100,000</li>
                    <li>1 ≤ M ≤ 100,000</li>
                    <li>1 ≤ 수 ≤ 1,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '구간 합을 구하라고 하니까, 매 질문마다 i부터 j까지 반복문을 돌려서 더하면 되지 않을까?<br><br><strong>예: [5, 4, 3, 2, 1]에서 1~3 구간 합</strong><br>→ arr[1] + arr[2] + arr[3] = 5 + 4 + 3 = 12<br>한 번의 질문에 O(N)이면 충분해 보여!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '질문이 <strong>최대 100,000번</strong>이고 수도 100,000개야.<br>매번 반복문으로 더하면 최악의 경우 100,000 × 100,000 = <strong>100억 번 연산</strong>... 시간 초과 확정!<br><br>질문 하나에 O(N)이면 전체 O(N×M). 이걸 줄여야 해.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '미리 <strong>누적합 배열</strong>을 만들어두면 어떨까?<br><code>prefix[k]</code> = 1번째부터 k번째까지의 합<br><br><div style="padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="display:flex;gap:3px;align-items:center;justify-content:center;flex-wrap:wrap;margin-bottom:6px;"><span style="font-size:0.7rem;color:var(--text3);">arr:</span><span style="padding:3px 8px;border-radius:4px;background:var(--bg3);color:var(--text);">5</span><span style="padding:3px 8px;border-radius:4px;background:var(--bg3);color:var(--text);">4</span><span style="padding:3px 8px;border-radius:4px;background:var(--bg3);color:var(--text);">3</span><span style="padding:3px 8px;border-radius:4px;background:var(--bg3);color:var(--text);">2</span><span style="padding:3px 8px;border-radius:4px;background:var(--bg3);color:var(--text);">1</span></div><div style="display:flex;gap:3px;align-items:center;justify-content:center;flex-wrap:wrap;"><span style="font-size:0.7rem;color:var(--text3);">prefix:</span><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">0</span><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">5</span><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">9</span><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">12</span><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">14</span><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">15</span></div><div style="text-align:center;margin-top:6px;font-size:0.75rem;">구간 2~4 합 = <span style="color:var(--green);font-weight:600;">prefix[4] − prefix[1] = 14 − 5 = 9</span></div></div>전처리 O(N) + 각 질문 O(1) = 전체 <strong>O(N + M)</strong><br><br>팁: <code>prefix[0] = 0</code>으로 두면 i=1일 때도 예외 처리가 필요 없어!'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))

# 누적합 배열 만들기
prefix = [0] * (N + 1)
for i in range(1, N + 1):
    prefix[i] = prefix[i - 1] + arr[i - 1]

# 각 질문에 답하기
for _ in range(M):
    i, j = map(int, input().split())
    print(prefix[j] - prefix[i - 1])`,
                cpp: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    long long prefix[100001] = {0};
    for (int i = 1; i <= N; i++) {
        int x;
        cin >> x;
        prefix[i] = prefix[i - 1] + x;
    }

    while (M--) {
        int i, j;
        cin >> i >> j;
        cout << prefix[j] - prefix[i - 1] << '\\n';
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '1D 누적합',
                    description: '누적합 배열을 만든 뒤 prefix[j] - prefix[i-1]로 O(1) 쿼리 처리합니다.',
                    timeComplexity: 'O(N + M)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))

# 누적합 배열 만들기
prefix = [0] * (N + 1)
for i in range(1, N + 1):
    prefix[i] = prefix[i - 1] + arr[i - 1]

# 각 질문에 답하기
for _ in range(M):
    i, j = map(int, input().split())
    print(prefix[j] - prefix[i - 1])`,
                        cpp: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    long long prefix[100001] = {0};
    for (int i = 1; i <= N; i++) {
        int x;
        cin >> x;
        prefix[i] = prefix[i - 1] + x;
    }

    while (M--) {
        int i, j;
        cin >> i >> j;
        cout << prefix[j] - prefix[i - 1] << '\\n';
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `sys.stdin.readline으로 빠른 입력 처리.
N개 수와 M개 쿼리를 받습니다.`,
                                code: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))`
                            },
                            {
                                title: '누적합 배열 만들기',
                                desc: `prefix[i] = arr[0]~arr[i-1]의 합.
이후 구간 합을 O(1)로 구하기 위한 전처리입니다.`,
                                code: `prefix = [0] * (N + 1)
for i in range(1, N + 1):
    prefix[i] = prefix[i - 1] + arr[i - 1]`
                            },
                            {
                                title: '쿼리 처리',
                                desc: `구간 합 = prefix[j] - prefix[i-1].
전처리 덕분에 각 쿼리를 O(1)에 답합니다.`,
                                code: `for _ in range(M):
    i, j = map(int, input().split())
    print(prefix[j] - prefix[i - 1])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `ios::sync_with_stdio(false)로 입출력 속도 최적화.
대량 쿼리 처리에 필수입니다.`,
                                code: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;`
                            },
                            {
                                title: '누적합 배열 만들기',
                                desc: `배열 대신 입력받으면서 바로 누적합 계산.
long long으로 오버플로 방지.`,
                                code: `    long long prefix[100001] = {0};
    for (int i = 1; i <= N; i++) {
        int x;
        cin >> x;
        prefix[i] = prefix[i - 1] + x;  // 입력과 동시에 누적
    }`
                            },
                            {
                                title: '쿼리 처리',
                                desc: `prefix[j] - prefix[i-1]로 구간 합을 O(1)에 출력.
'\\n'은 endl보다 빠릅니다.`,
                                code: `    while (M--) {
        int i, j;
        cin >> i >> j;
        cout << prefix[j] - prefix[i - 1] << '\\n';
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
            id: 'boj-2559',
            title: 'BOJ 2559 - 수열',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2559',
            simIntro: '누적합으로 길이 K인 모든 구간의 합을 구하고 최대값을 찾는 과정을 관찰하세요.',
            sim: {
                type: 'window'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>매일의 온도가 정수의 수열로 주어졌을 때, 연속적인 며칠 동안의 온도의 합이 가장 큰 값을 구하는 프로그램을 작성하시오.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>10 2
3 -2 -4 -9 0 3 7 13 8 -3</pre></div>
                    <div><strong>출력</strong><pre>21</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>10 5
3 -2 -4 -9 0 3 7 13 8 -3</pre></div>
                    <div><strong>출력</strong><pre>31</pre></div>
                </div></div>
                <h4>입력</h4>
                <p>첫째 줄에는 두 개의 정수 N과 K가 한 개의 공백을 사이에 두고 순서대로 주어진다. 첫 번째 정수 N은 온도를 측정한 전체 날짜의 수이다. N은 2 이상 100,000 이하이다. 두 번째 정수 K는 합을 구하기 위한 연속적인 날짜의 수이다. K는 1 이상 N 이하이다. 둘째 줄에는 매일 측정한 온도를 나타내는 N개의 정수가 빈칸을 사이에 두고 주어진다. 이 수들은 모두 -100 이상 100 이하이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 연속적인 K일의 온도의 합이 최대가 되는 값을 출력한다.</p>
                <h4>제약 조건</h4>
                <ul>
                    <li>2 ≤ N ≤ 100,000</li>
                    <li>1 ≤ K ≤ N</li>
                    <li>-100 ≤ 온도 ≤ 100</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '"연속 K일의 온도 합이 최대"니까, 모든 연속 K일 구간을 다 구해보면 되지 않을까?<br><br>i=1일 때: arr[1]+arr[2]+...+arr[K]<br>i=2일 때: arr[2]+arr[3]+...+arr[K+1]<br>...<br>각 구간마다 K개를 더하면 합을 구할 수 있어!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '구간이 N-K+1개이고, 각 구간마다 K개를 더하니까 전체 <strong>O(N × K)</strong>.<br><br><div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;"><div style="font-weight:600;color:var(--red);">매번 K개 더하기</div><div style="font-size:1.1rem;font-weight:700;color:var(--red);">O(N × K)</div></div><div style="font-size:1.2rem;color:var(--text3);">→</div><div style="text-align:center;"><div style="font-weight:600;color:var(--green);">누적합 뺄셈</div><div style="font-size:1.1rem;font-weight:700;color:var(--green);">O(N)</div></div></div>이전 구간이랑 겹치는 부분이 K-1개나 되는데 또 더하는 건 낭비야!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '누적합을 미리 만들어두면 길이 K인 구간 합을 <strong>뺄셈 한 번</strong>으로 구할 수 있어!<br><br>i번째부터 K개 합 = <code>prefix[i + K - 1] - prefix[i - 1]</code><br><br>이걸 i = 1부터 N-K+1까지 반복하며 최대값을 갱신하면 끝!<br>전처리 O(N) + 탐색 O(N) = <strong>O(N)</strong> ⚡<br><br>💡 참고: 슬라이딩 윈도우(앞 하나 빼고 뒤 하나 더하기)로도 O(N)에 풀 수 있지만, 누적합을 쓰면 코드가 더 간결해!'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, K = map(int, input().split())
arr = list(map(int, input().split()))

# 누적합 배열 만들기
prefix = [0] * (N + 1)
for i in range(1, N + 1):
    prefix[i] = prefix[i - 1] + arr[i - 1]

# 길이 K인 모든 구간의 합 중 최대값
ans = -float('inf')
for i in range(1, N - K + 2):
    ans = max(ans, prefix[i + K - 1] - prefix[i - 1])

print(ans)`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;

    long long prefix[100001] = {0};
    for (int i = 1; i <= N; i++) {
        int x;
        cin >> x;
        prefix[i] = prefix[i - 1] + x;
    }

    long long ans = -1e18;
    for (int i = 1; i <= N - K + 1; i++) {
        ans = max(ans, prefix[i + K - 1] - prefix[i - 1]);
    }
    cout << ans << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '누적합 + 슬라이딩',
                    description: '누적합 배열에서 길이 K 구간의 합을 모두 구해 최대값을 찾습니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, K = map(int, input().split())
arr = list(map(int, input().split()))

# 누적합 배열 만들기
prefix = [0] * (N + 1)
for i in range(1, N + 1):
    prefix[i] = prefix[i - 1] + arr[i - 1]

# 길이 K인 모든 구간의 합 중 최대값
ans = -float('inf')
for i in range(1, N - K + 2):
    ans = max(ans, prefix[i + K - 1] - prefix[i - 1])

print(ans)`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;

    long long prefix[100001] = {0};
    for (int i = 1; i <= N; i++) {
        int x;
        cin >> x;
        prefix[i] = prefix[i - 1] + x;
    }

    long long ans = -1e18;
    for (int i = 1; i <= N - K + 1; i++) {
        ans = max(ans, prefix[i + K - 1] - prefix[i - 1]);
    }
    cout << ans << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `N개 온도와 연속 K일을 입력받습니다.
빠른 입력을 위해 sys.stdin.readline 사용.`,
                                code: `import sys
input = sys.stdin.readline

N, K = map(int, input().split())
arr = list(map(int, input().split()))`
                            },
                            {
                                title: '누적합',
                                desc: `누적합을 만들면 길이 K인 구간 합을
prefix[i+K-1] - prefix[i-1]로 O(1)에 구할 수 있습니다.`,
                                code: `prefix = [0] * (N + 1)
for i in range(1, N + 1):
    prefix[i] = prefix[i - 1] + arr[i - 1]`
                            },
                            {
                                title: '최대 구간 합',
                                desc: `모든 길이 K 구간의 합을 O(1)씩 구해 최대값 갱신.
음수 온도가 있으므로 초기값을 -inf로 설정합니다.`,
                                code: `ans = -float('inf')
for i in range(1, N - K + 2):
    ans = max(ans, prefix[i + K - 1] - prefix[i - 1])

print(ans)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N개 온도와 연속 K일을 입력받습니다.
algorithm 헤더는 max 함수를 위해 포함합니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;`
                            },
                            {
                                title: '누적합',
                                desc: `long long: 온도 합이 int 범위를 넘을 수 있으므로.
입력받으면서 바로 누적합을 계산합니다.`,
                                code: `    long long prefix[100001] = {0};
    for (int i = 1; i <= N; i++) {
        int x;
        cin >> x;
        prefix[i] = prefix[i - 1] + x;
    }`
                            },
                            {
                                title: '최대 구간 합',
                                desc: '-1e18: 음수 온도도 있으므로 충분히 작은 초기값 필요.',
                                code: `    long long ans = -1e18;  // 음수도 있으니 충분히 작게
    for (int i = 1; i <= N - K + 1; i++) {
        ans = max(ans, prefix[i + K - 1] - prefix[i - 1]);
    }
    cout << ans << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-16139',
            title: 'BOJ 16139 - 인간-컴퓨터 상호작용',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/16139',
            simIntro: '26개 알파벳 각각에 대한 누적합으로 문자 빈도 쿼리를 처리하는 과정을 관찰하세요.',
            sim: {
                type: 'charSum'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>문자열 S와 질의 q개가 주어진다. 각 질의는 알파벳 소문자 a와 두 정수 l, r로 이루어져 있으며, S의 l번째 문자부터 r번째 문자까지(0-indexed) a가 몇 번 나타나는지 구하시오.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>seungjaehwang
4
a 0 5
a 0 12
s 0 12
n 2 7</pre></div>
                    <div><strong>출력</strong><pre>0
2
1
1</pre></div>
                </div></div>
                <h4>입력</h4>
                <p>첫째 줄에 알파벳 소문자로만 이루어진 문자열 S가 주어진다. 둘째 줄에는 질의의 수 q가 주어진다. 셋째 줄부터 q개의 줄에는 각 질의를 나타내는 알파벳 소문자 a와 두 정수 l, r이 주어진다.</p>
                <h4>출력</h4>
                <p>각 질의에 대해 S의 l번째 문자부터 r번째 문자까지(0-indexed) a가 몇 번 등장하는지 출력한다.</p>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ |S| ≤ 200,000</li>
                    <li>1 ≤ q ≤ 200,000</li>
                    <li>0 ≤ l ≤ r < |S|</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '질문마다 l부터 r까지 훑으면서 해당 알파벳이 나올 때마다 카운트하면 되지 않을까?<br><br><strong>예: "seungjaehwang"에서 \'a\', 0~12</strong><br>→ s(X) e(X) u(X) n(X) g(X) j(X) <strong>a(O)</strong> e(X) h(X) w(X) <strong>a(O)</strong> n(X) g(X) → 2개<br>한 번의 질문에 구간 길이만큼 확인하면 돼!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '문자열 길이 최대 200,000, 질문도 최대 200,000번이야.<br>매번 구간을 훑으면 200,000 × 200,000 = <strong>400억 번</strong>... 시간 초과!<br><br>앞 문제에서 배운 누적합을 쓰면 될 것 같은데, 여기는 합이 아니라 <strong>"특정 문자의 개수"</strong>잖아. 어떻게 누적합을 적용하지?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '숫자의 합 대신 <strong>문자의 등장 횟수</strong>를 누적하면 돼!<br><br>알파벳이 26개니까, <strong>26개의 누적합 배열</strong>을 만들자:<br><code>count[c][i]</code> = 처음부터 i번째까지 알파벳 c가 나온 횟수<br><br><div style="padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="display:flex;gap:2px;align-items:center;justify-content:center;flex-wrap:wrap;margin-bottom:4px;"><span style="font-size:0.7rem;color:var(--text3);min-width:25px;">str:</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">s</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">e</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">u</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">n</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">g</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">j</span><span style="padding:2px 5px;border-radius:3px;background:var(--green);color:white;font-size:0.75rem;font-weight:600;">a</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">e</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">h</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">w</span><span style="padding:2px 5px;border-radius:3px;background:var(--green);color:white;font-size:0.75rem;font-weight:600;">a</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">n</span><span style="padding:2px 5px;border-radius:3px;background:var(--bg3);font-size:0.75rem;">g</span></div><div style="display:flex;gap:2px;align-items:center;justify-content:center;flex-wrap:wrap;"><span style="font-size:0.7rem;color:var(--text3);min-width:25px;">cnt[a]:</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">0</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">0</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">0</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">0</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">0</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">0</span><span style="padding:2px 5px;border-radius:3px;background:var(--green);color:white;font-size:0.75rem;font-weight:600;">1</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">1</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">1</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">1</span><span style="padding:2px 5px;border-radius:3px;background:var(--green);color:white;font-size:0.75rem;font-weight:600;">2</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">2</span><span style="padding:2px 5px;border-radius:3px;background:var(--accent);color:white;font-size:0.75rem;">2</span></div></div>l~r 구간에서 알파벳 c의 개수 = <code>count[c][r+1] - count[c][l]</code> — O(1)!<br>전처리 O(26 × N) + 쿼리 O(Q) = 충분히 빨라!'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

S = input().strip()
N = len(S)
q = int(input())

# 26개 알파벳별 누적합
count = [[0] * (N + 1) for _ in range(26)]
for i in range(N):
    for c in range(26):
        count[c][i + 1] = count[c][i]
    count[ord(S[i]) - ord('a')][i + 1] += 1

for _ in range(q):
    parts = input().split()
    c = ord(parts[0]) - ord('a')
    l, r = int(parts[1]), int(parts[2])
    print(count[c][r + 1] - count[c][l])`,
                cpp: `#include <iostream>
#include <cstring>
using namespace std;

int count[26][200002];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string S;
    cin >> S;
    int N = S.size();
    int q;
    cin >> q;

    for (int i = 0; i < N; i++) {
        for (int c = 0; c < 26; c++)
            count[c][i + 1] = count[c][i];
        count[S[i] - 'a'][i + 1]++;
    }

    while (q--) {
        char ch;
        int l, r;
        cin >> ch >> l >> r;
        cout << count[ch - 'a'][r + 1] - count[ch - 'a'][l] << '\\n';
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '문자별 누적합',
                    description: '26개 알파벳 각각에 대한 누적합 배열을 만들어 O(1) 쿼리 처리합니다.',
                    timeComplexity: 'O(26N + Q)',
                    spaceComplexity: 'O(26N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

S = input().strip()
N = len(S)
q = int(input())

# 26개 알파벳별 누적합
count = [[0] * (N + 1) for _ in range(26)]
for i in range(N):
    for c in range(26):
        count[c][i + 1] = count[c][i]
    count[ord(S[i]) - ord('a')][i + 1] += 1

for _ in range(q):
    parts = input().split()
    c = ord(parts[0]) - ord('a')
    l, r = int(parts[1]), int(parts[2])
    print(count[c][r + 1] - count[c][l])`,
                        cpp: `#include <iostream>
#include <cstring>
using namespace std;

int count[26][200002];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string S;
    cin >> S;
    int N = S.size();
    int q;
    cin >> q;

    for (int i = 0; i < N; i++) {
        for (int c = 0; c < 26; c++)
            count[c][i + 1] = count[c][i];
        count[S[i] - 'a'][i + 1]++;
    }

    while (q--) {
        char ch;
        int l, r;
        cin >> ch >> l >> r;
        cout << count[ch - 'a'][r + 1] - count[ch - 'a'][l] << '\\n';
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `문자열 S와 쿼리 수를 입력받습니다.
strip()으로 개행 문자를 제거합니다.`,
                                code: `import sys
input = sys.stdin.readline

S = input().strip()
N = len(S)
q = int(input())`
                            },
                            {
                                title: '26개 알파벳 누적합',
                                desc: `알파벳별로 누적합을 만들어 구간 내 문자 빈도를
O(1)에 구할 수 있게 전처리합니다.`,
                                code: `count = [[0] * (N + 1) for _ in range(26)]
for i in range(N):
    for c in range(26):
        count[c][i + 1] = count[c][i]
    count[ord(S[i]) - ord('a')][i + 1] += 1`
                            },
                            {
                                title: '쿼리 처리',
                                desc: `count[c][r+1] - count[c][l]로 구간 내 해당 문자 개수를 O(1)에 계산.
ord()로 문자를 0~25 인덱스로 변환합니다.`,
                                code: `for _ in range(q):
    parts = input().split()
    c = ord(parts[0]) - ord('a')
    l, r = int(parts[1]), int(parts[2])
    print(count[c][r + 1] - count[c][l])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: 'count 배열은 전역 선언 — 스택 크기 제한 회피.',
                                code: `#include <iostream>
#include <cstring>
using namespace std;

// 전역: 26개 알파벳 × 최대 길이 (스택 오버플로 방지)
int count[26][200002];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string S;
    cin >> S;
    int N = S.size();
    int q;
    cin >> q;`
                            },
                            {
                                title: '26개 알파벳 누적합',
                                desc: `S[i] - 'a'로 문자→인덱스 변환.
ord() 대신 char 뺄셈 사용.`,
                                code: `    for (int i = 0; i < N; i++) {
        for (int c = 0; c < 26; c++)
            count[c][i + 1] = count[c][i];  // 이전 값 복사
        count[S[i] - 'a'][i + 1]++;  // 해당 문자만 +1
    }`
                            },
                            {
                                title: '쿼리 처리',
                                desc: `ch - 'a'로 문자를 인덱스로 변환하여
해당 알파벳의 누적합 배열에서 O(1) 조회.`,
                                code: `    while (q--) {
        char ch;
        int l, r;
        cin >> ch >> l >> r;
        cout << count[ch - 'a'][r + 1] - count[ch - 'a'][l] << '\\n';
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
            id: 'boj-11660',
            title: 'BOJ 11660 - 구간 합 구하기 5',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/11660',
            simIntro: '2차원 누적합과 포함-배제 공식으로 영역 합을 구하는 과정을 관찰하세요.',
            sim: {
                type: '2DSum'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N×N개의 수가 N×N 크기의 표에 채워져 있다. (x1, y1)부터 (x2, y2)까지 합을 구하는 프로그램을 작성하시오.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 3
1 2 3 4
2 3 4 5
3 4 5 6
4 5 6 7
2 2 3 4
3 4 3 4
1 1 4 4</pre></div>
                    <div><strong>출력</strong><pre>27
6
64</pre></div>
                </div></div>
                <h4>입력</h4>
                <p>첫째 줄에 표의 크기 N과 합을 구해야 하는 횟수 M이 주어진다. (1 ≤ N ≤ 1,024, 1 ≤ M ≤ 100,000) 둘째 줄부터 N개의 줄에는 표에 채워져 있는 수가 1행부터 차례대로 주어진다. 다음 M개의 줄에는 네 개의 정수 x1, y1, x2, y2가 주어지며, (x1, y1)부터 (x2, y2)의 합을 구해야 한다. 표에 채워져 있는 수는 1,000보다 작거나 같은 자연수이다. (x1 ≤ x2, y1 ≤ y2)</p>
                <h4>출력</h4>
                <p>총 M줄에 걸쳐 (x1, y1)부터 (x2, y2)까지 합을 구해 출력한다.</p>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 1,024</li>
                    <li>1 ≤ M ≤ 100,000</li>
                    <li>1 ≤ 수 ≤ 1,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '(x1,y1)부터 (x2,y2)까지의 합을 구하라고 하니까, 이중 for문으로 직사각형 영역을 다 더하면 되지 않을까?<br><br><strong>예: (2,2)~(3,4) 영역</strong><br>for i in range(x1, x2+1):<br>&nbsp;&nbsp;for j in range(y1, y2+1):<br>&nbsp;&nbsp;&nbsp;&nbsp;합 += arr[i][j]<br>한 번의 쿼리에 영역 크기만큼 더하면 돼!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 1,024이니까 영역 크기가 최대 1,024 × 1,024 = 약 <strong>100만</strong>이야.<br>쿼리가 100,000번이면 100만 × 10만 = <strong>1000억 번 연산</strong>... 시간 초과!<br><br>1차원에서는 누적합으로 구간 합을 O(1)에 구했잖아. 2차원에서도 비슷하게 할 수 있을까?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>2차원 누적합</strong>을 만들면 돼! 개념 페이지에서 배운 <strong>포함-배제</strong> 원리를 그대로 적용하자.<br><br><div style="padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;text-align:center;"><div style="font-weight:600;margin-bottom:6px;">쿼리: (x1,y1)~(x2,y2) 합</div><div style="display:flex;gap:6px;align-items:center;justify-content:center;flex-wrap:wrap;"><span style="padding:4px 8px;border-radius:6px;background:var(--accent);color:white;font-weight:600;">전체</span><span style="font-weight:700;">−</span><span style="padding:4px 8px;border-radius:6px;background:var(--red);color:white;">위쪽</span><span style="font-weight:700;">−</span><span style="padding:4px 8px;border-radius:6px;background:var(--red);color:white;">왼쪽</span><span style="font-weight:700;">+</span><span style="padding:4px 8px;border-radius:6px;background:var(--green);color:white;">모서리</span></div><div style="font-size:0.7rem;color:var(--text3);margin-top:4px;">포함-배제: 빠진 영역을 다시 더해줘야!</div></div><code>prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1]</code><br><br>전처리 O(N²) + 쿼리 O(1) × M = <strong>O(N² + M)</strong>!'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())

# 2차원 누적합 만들기
prefix = [[0] * (N + 1) for _ in range(N + 1)]
for i in range(1, N + 1):
    row = list(map(int, input().split()))
    for j in range(1, N + 1):
        prefix[i][j] = (row[j - 1]
                        + prefix[i - 1][j]
                        + prefix[i][j - 1]
                        - prefix[i - 1][j - 1])

# 각 질문에 답하기
for _ in range(M):
    x1, y1, x2, y2 = map(int, input().split())
    ans = (prefix[x2][y2]
          - prefix[x1 - 1][y2]
          - prefix[x2][y1 - 1]
          + prefix[x1 - 1][y1 - 1])
    print(ans)`,
                cpp: `#include <iostream>
using namespace std;

int prefix[1025][1025];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            int x;
            cin >> x;
            prefix[i][j] = x + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
        }
    }

    while (M--) {
        int x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        cout << prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1] << '\\n';
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '2차원 누적합',
                    description: '2차원 누적합 + 포함-배제 공식으로 영역 합을 O(1)에 구합니다.',
                    timeComplexity: 'O(N^2 + M)',
                    spaceComplexity: 'O(N^2)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, M, K = map(int, input().split())
board = [input().strip() for _ in range(N)]

# (i+j)가 짝수인 칸에 B가 와야 하는 패턴 기준
diff = [[0] * (M + 1) for _ in range(N + 1)]
for i in range(N):
    for j in range(M):
        expected = 'B' if (i + j) % 2 == 0 else 'W'
        diff[i + 1][j + 1] = 1 if board[i][j] != expected else 0

# 2차원 누적합
prefix = [[0] * (M + 1) for _ in range(N + 1)]
for i in range(1, N + 1):
    for j in range(1, M + 1):
        prefix[i][j] = (diff[i][j]
                        + prefix[i-1][j]
                        + prefix[i][j-1]
                        - prefix[i-1][j-1])

ans = float('inf')
for i in range(1, N - K + 2):
    for j in range(1, M - K + 2):
        cost1 = (prefix[i+K-1][j+K-1]
                - prefix[i-1][j+K-1]
                - prefix[i+K-1][j-1]
                + prefix[i-1][j-1])
        cost2 = K * K - cost1
        ans = min(ans, cost1, cost2)

print(ans)`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int prefix[2001][2001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M, K;
    cin >> N >> M >> K;

    for (int i = 1; i <= N; i++) {
        string row;
        cin >> row;
        for (int j = 1; j <= M; j++) {
            char expected = ((i + j) % 2 == 0) ? 'B' : 'W';
            int diff = (row[j - 1] != expected) ? 1 : 0;
            prefix[i][j] = diff + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
        }
    }

    int ans = N * M;
    for (int i = 1; i <= N - K + 1; i++) {
        for (int j = 1; j <= M - K + 1; j++) {
            int cost1 = prefix[i+K-1][j+K-1] - prefix[i-1][j+K-1] - prefix[i+K-1][j-1] + prefix[i-1][j-1];
            int cost2 = K * K - cost1;
            ans = min({ans, cost1, cost2});
        }
    }
    cout << ans << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `N×N 표와 M개 쿼리를 입력받습니다.
2차원 누적합으로 영역 합을 빠르게 구합니다.`,
                                code: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())`
                            },
                            {
                                title: '2차원 누적합',
                                desc: `포함-배제 원리: 위 + 왼쪽 - 대각선 + 현재값.
이후 어떤 직사각형 영역의 합도 O(1)에 구할 수 있습니다.`,
                                code: `prefix = [[0] * (N + 1) for _ in range(N + 1)]
for i in range(1, N + 1):
    row = list(map(int, input().split()))
    for j in range(1, N + 1):
        prefix[i][j] = row[j-1] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]`
                            },
                            {
                                title: '쿼리 처리',
                                desc: `포함-배제 공식으로 (x1,y1)~(x2,y2) 영역 합을 O(1)에 계산.
전체 - 위 - 왼쪽 + 겹치는 부분으로 구합니다.`,
                                code: `for _ in range(M):
    x1, y1, x2, y2 = map(int, input().split())
    print(prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: '전역 2D 배열: 1025×1025는 지역 변수로 쓰면 스택 오버플로.',
                                code: `#include <iostream>
using namespace std;

// 전역: 2D 배열이 크므로 스택 오버플로 방지
int prefix[1025][1025];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;`
                            },
                            {
                                title: '2차원 누적합',
                                desc: `포함-배제: 위 + 왼쪽 - 대각선 + 현재값.
입력받으면서 바로 누적합 계산.`,
                                code: `    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            int x;
            cin >> x;
            // 포함-배제로 누적합 계산
            prefix[i][j] = x + prefix[i-1][j]
                             + prefix[i][j-1]
                             - prefix[i-1][j-1];
        }
    }`
                            },
                            {
                                title: '쿼리 처리',
                                desc: `포함-배제 공식으로 직사각형 영역 합을 O(1)에 출력.
'\\n'은 endl보다 출력이 빨라 대량 쿼리에 유리합니다.`,
                                code: `    while (M--) {
        int x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        cout << prefix[x2][y2] - prefix[x1-1][y2]
                - prefix[x2][y1-1] + prefix[x1-1][y1-1]
             << '\\n';
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
            id: 'boj-25682',
            title: 'BOJ 25682 - 체스판 다시 칠하기 2',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/25682',
            simIntro: '2차원 누적합으로 체스판 패턴과 다른 칸의 수를 빠르게 구하는 과정을 관찰하세요.',
            sim: {
                type: 'chess'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>M×N 크기의 보드가 있다. 이 보드에서 K×K 크기의 체스판을 잘라낸 뒤, 다시 칠해야 하는 정사각형의 최소 개수를 구하는 프로그램을 작성하시오. 체스판은 검은색과 흰색이 번갈아 칠해져 있어야 한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 4 3
BBBB
BBBB
BBBB
BBBB</pre></div>
                    <div><strong>출력</strong><pre>1</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>8 8 8
WBWBWBWB
BWBWBWBW
WBWBWBWB
BWBWBWBW
WBWBWBWB
BWBWBWBW
WBWBWBWB
BWBWBWBW</pre></div>
                    <div><strong>출력</strong><pre>0</pre></div>
                </div></div>
                <h4>입력</h4>
                <p>첫째 줄에 정수 N, M, K가 주어진다. 둘째 줄부터 N개의 줄에는 보드의 각 행의 상태가 B와 W로 이루어진 길이 M인 문자열로 주어진다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 다시 칠해야 하는 정사각형의 최소 개수를 출력한다.</p>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ K ≤ min(N, M)</li>
                    <li>1 ≤ N, M ≤ 2,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '모든 K×K 영역을 하나씩 잡고, 그 안에서 체스판 패턴과 다른 칸이 몇 개인지 세면 되지 않을까?<br><br>체스판 패턴은 2가지(왼쪽 위가 B / 왼쪽 위가 W)니까, 각 패턴에 대해 다른 칸 수를 구하고 더 작은 쪽을 선택하면 돼.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'K×K 영역의 수 = (N-K+1) × (M-K+1)개, 각 영역마다 K×K칸을 확인...<br>N, M이 최대 2,000이면 전체 <strong>O(N × M × K²)</strong> — 너무 느려!<br><br>그런데 잠깐, "K×K 영역의 합"... 이거 앞 문제(구간 합 구하기 5)에서 한 것 아닌가? 2차원 누적합으로 O(1)에 구할 수 있었잖아!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '① 먼저 체스판 패턴과 <strong>다른 칸을 1, 같은 칸을 0</strong>으로 표시한 배열을 만들자.<br><br><div style="padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;text-align:center;"><div style="font-weight:600;margin-bottom:4px;">원본 → diff 배열 (패턴과 다르면 1)</div><div style="display:inline-grid;grid-template-columns:repeat(4,1fr);gap:2px;"><span style="padding:3px 6px;border-radius:3px;background:#333;color:white;font-size:0.7rem;">B</span><span style="padding:3px 6px;border-radius:3px;background:#eee;color:#333;font-size:0.7rem;">W</span><span style="padding:3px 6px;border-radius:3px;background:#333;color:white;font-size:0.7rem;">B</span><span style="padding:3px 6px;border-radius:3px;background:var(--red);color:white;font-size:0.7rem;">B</span><span style="padding:3px 6px;border-radius:3px;background:#eee;color:#333;font-size:0.7rem;">W</span><span style="padding:3px 6px;border-radius:3px;background:#333;color:white;font-size:0.7rem;">B</span><span style="padding:3px 6px;border-radius:3px;background:#eee;color:#333;font-size:0.7rem;">W</span><span style="padding:3px 6px;border-radius:3px;background:#eee;color:#333;font-size:0.7rem;">W</span></div><span style="margin:0 10px;color:var(--text3);">→</span><div style="display:inline-grid;grid-template-columns:repeat(4,1fr);gap:2px;vertical-align:top;"><span style="padding:3px 6px;border-radius:3px;background:var(--green);color:white;font-size:0.7rem;">0</span><span style="padding:3px 6px;border-radius:3px;background:var(--green);color:white;font-size:0.7rem;">0</span><span style="padding:3px 6px;border-radius:3px;background:var(--green);color:white;font-size:0.7rem;">0</span><span style="padding:3px 6px;border-radius:3px;background:var(--red);color:white;font-size:0.7rem;">1</span><span style="padding:3px 6px;border-radius:3px;background:var(--green);color:white;font-size:0.7rem;">0</span><span style="padding:3px 6px;border-radius:3px;background:var(--green);color:white;font-size:0.7rem;">0</span><span style="padding:3px 6px;border-radius:3px;background:var(--green);color:white;font-size:0.7rem;">0</span><span style="padding:3px 6px;border-radius:3px;background:var(--red);color:white;font-size:0.7rem;">1</span></div></div>② 이 0/1 배열의 <strong>2차원 누적합</strong>을 구해!<br>③ K×K 영역의 cost = 누적합으로 O(1)에 구한 "다른 칸 수"<br>&nbsp;&nbsp;&nbsp;반대 패턴 = <code>K×K - cost</code> → <code>min(cost, K×K - cost)</code>가 답!<br><br>전처리 O(N×M) + 탐색 O(N×M) = <strong>O(N×M)</strong>!'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, M, K = map(int, input().split())
board = [input().strip() for _ in range(N)]

# (i+j)가 짝수인 칸에 B가 와야 하는 패턴 기준
diff = [[0] * (M + 1) for _ in range(N + 1)]
for i in range(N):
    for j in range(M):
        expected = 'B' if (i + j) % 2 == 0 else 'W'
        diff[i + 1][j + 1] = 1 if board[i][j] != expected else 0

# 2차원 누적합
prefix = [[0] * (M + 1) for _ in range(N + 1)]
for i in range(1, N + 1):
    for j in range(1, M + 1):
        prefix[i][j] = (diff[i][j]
                        + prefix[i-1][j]
                        + prefix[i][j-1]
                        - prefix[i-1][j-1])

ans = float('inf')
for i in range(1, N - K + 2):
    for j in range(1, M - K + 2):
        cost1 = (prefix[i+K-1][j+K-1]
                - prefix[i-1][j+K-1]
                - prefix[i+K-1][j-1]
                + prefix[i-1][j-1])
        cost2 = K * K - cost1
        ans = min(ans, cost1, cost2)

print(ans)`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int prefix[2001][2001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M, K;
    cin >> N >> M >> K;

    for (int i = 1; i <= N; i++) {
        string row;
        cin >> row;
        for (int j = 1; j <= M; j++) {
            char expected = ((i + j) % 2 == 0) ? 'B' : 'W';
            int diff = (row[j - 1] != expected) ? 1 : 0;
            prefix[i][j] = diff + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
        }
    }

    int ans = N * M;
    for (int i = 1; i <= N - K + 1; i++) {
        for (int j = 1; j <= M - K + 1; j++) {
            int cost1 = prefix[i+K-1][j+K-1] - prefix[i-1][j+K-1] - prefix[i+K-1][j-1] + prefix[i-1][j-1];
            int cost2 = K * K - cost1;
            ans = min({ans, cost1, cost2});
        }
    }
    cout << ans << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '2차원 누적합 + 체스판 패턴',
                    description: '체스판 패턴과 다른 칸을 0/1 배열로 만들고 2차원 누적합으로 최소 비용을 구합니다.',
                    timeComplexity: 'O(N*M)',
                    spaceComplexity: 'O(N*M)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))

# 나머지별 개수 세기
cnt = [0] * M
prefix_mod = 0
cnt[0] = 1  # prefix[0] = 0의 나머지는 0

for x in arr:
    prefix_mod = (prefix_mod + x) % M
    cnt[prefix_mod] += 1

# 나머지가 같은 쌍의 수 = nC2
ans = 0
for c in cnt:
    ans += c * (c - 1) // 2

print(ans)`,
                        cpp: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    long long cnt[1001] = {0};
    cnt[0] = 1;
    long long prefix_mod = 0;

    for (int i = 0; i < N; i++) {
        long long x;
        cin >> x;
        prefix_mod = (prefix_mod + x) % M;
        cnt[prefix_mod]++;
    }

    long long ans = 0;
    for (int r = 0; r < M; r++) {
        ans += cnt[r] * (cnt[r] - 1) / 2;
    }
    cout << ans << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `N×M 보드와 체스판 크기 K를 입력받습니다.
strip()으로 줄바꿈 문자를 제거합니다.`,
                                code: `import sys
input = sys.stdin.readline

N, M, K = map(int, input().split())
board = [input().strip() for _ in range(N)]`
                            },
                            {
                                title: 'diff + 누적합',
                                desc: `(i+j)%2로 기대 색을 판단하여 다른 칸을 1로 표시.
2차원 누적합으로 K×K 영역의 비용을 O(1)에 구합니다.`,
                                code: `diff = [[0]*(M+1) for _ in range(N+1)]
for i in range(N):
    for j in range(M):
        expected = 'B' if (i+j)%2==0 else 'W'
        diff[i+1][j+1] = 1 if board[i][j] != expected else 0

prefix = [[0]*(M+1) for _ in range(N+1)]
for i in range(1,N+1):
    for j in range(1,M+1):
        prefix[i][j] = diff[i][j]+prefix[i-1][j]+prefix[i][j-1]-prefix[i-1][j-1]`
                            },
                            {
                                title: 'K×K 영역 최소',
                                desc: `cost1은 패턴1의 비용, K*K-cost1은 반대 패턴의 비용.
둘 중 작은 값이 해당 영역의 최소 칠하기 비용입니다.`,
                                code: `ans = float('inf')
for i in range(1, N-K+2):
    for j in range(1, M-K+2):
        cost1 = prefix[i+K-1][j+K-1]-prefix[i-1][j+K-1]-prefix[i+K-1][j-1]+prefix[i-1][j-1]
        ans = min(ans, cost1, K*K-cost1)
print(ans)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: '전역 배열: 2001×2001은 지역 변수로 쓰면 스택 오버플로.',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int prefix[2001][2001];  // 전역: 스택 오버플로 방지

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M, K;
    cin >> N >> M >> K;`
                            },
                            {
                                title: 'diff + 누적합',
                                desc: `(i+j)%2로 기대 색 판단 → diff와 누적합을 한 번에 계산.
Python과 달리 diff 배열을 따로 만들지 않아도 됨.`,
                                code: `    for (int i = 1; i <= N; i++) {
        string row;
        cin >> row;
        for (int j = 1; j <= M; j++) {
            // (i+j) 짝수면 B가 와야 하는 패턴
            char expected = ((i + j) % 2 == 0) ? 'B' : 'W';
            int diff = (row[j - 1] != expected) ? 1 : 0;
            prefix[i][j] = diff + prefix[i-1][j]
                               + prefix[i][j-1]
                               - prefix[i-1][j-1];
        }
    }`
                            },
                            {
                                title: 'K×K 영역 최소',
                                desc: `cost1 = 패턴1의 비용, K*K-cost1 = 패턴2의 비용.
min({a,b,c})로 세 값 중 최소 한 번에 비교.`,
                                code: `    int ans = N * M;  // 충분히 큰 초기값
    for (int i = 1; i <= N - K + 1; i++) {
        for (int j = 1; j <= M - K + 1; j++) {
            int cost1 = prefix[i+K-1][j+K-1]
                      - prefix[i-1][j+K-1]
                      - prefix[i+K-1][j-1]
                      + prefix[i-1][j-1];
            int cost2 = K * K - cost1;
            ans = min({ans, cost1, cost2});
        }
    }
    cout << ans << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-10986',
            title: 'BOJ 10986 - 나머지 합',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/10986',
            simIntro: '누적합의 나머지가 같은 쌍을 세는 과정을 관찰하세요.',
            sim: {
                type: 'modSum'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>수 N개 A<sub>1</sub>, A<sub>2</sub>, ..., A<sub>N</sub>이 주어졌을 때, 연속 부분 합이 M으로 나누어 떨어지는 구간의 개수를 구하는 프로그램을 작성하시오. 즉, A<sub>i</sub> + ... + A<sub>j</sub> (i ≤ j)의 합이 M으로 나누어 떨어지는 (i, j) 쌍의 개수를 구하시오.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 3
1 2 3 1 2</pre></div>
                    <div><strong>출력</strong><pre>7</pre></div>
                </div></div>
                <h4>입력</h4>
                <p>첫째 줄에 N과 M이 주어진다. (1 ≤ N ≤ 10<sup>6</sup>, 2 ≤ M ≤ 10<sup>3</sup>) 둘째 줄에 N개의 수 A<sub>1</sub>, A<sub>2</sub>, ..., A<sub>N</sub>이 주어진다. (0 ≤ A<sub>i</sub> ≤ 10<sup>9</sup>)</p>
                <h4>출력</h4>
                <p>첫째 줄에 연속 부분 합이 M으로 나누어 떨어지는 구간의 개수를 출력한다.</p>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 10<sup>6</sup></li>
                    <li>2 ≤ M ≤ 10<sup>3</sup></li>
                    <li>0 ≤ A<sub>i</sub> ≤ 10<sup>9</sup></li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '모든 (i, j) 쌍을 시도해서 구간 합을 구한 뒤, M으로 나누어 떨어지는지 확인하면 되지 않을까?<br><br>이중 for문으로 i와 j를 정하고, 누적합으로 구간 합 = <code>prefix[j] - prefix[i]</code>를 구해서 M으로 나눠보자.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 <strong>1,000,000</strong>(백만)이야!<br>모든 (i, j) 쌍은 약 N² / 2 = <strong>5000억 개</strong>... 절대 불가능!<br><br>그런데 잠깐, 구간 합이 M의 배수라는 건 <code>prefix[j] - prefix[i]</code>가 M의 배수라는 거잖아?<br>이걸 다르게 표현하면... <code>prefix[j] % M == prefix[i] % M</code>이 되네!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '누적합의 <strong>나머지가 같은 것끼리 짝</strong>을 지으면 돼!<br><br><div style="padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;margin-bottom:6px;font-weight:600;">M=3 일 때 prefix % 3</div><div style="display:flex;gap:3px;align-items:center;justify-content:center;flex-wrap:wrap;margin-bottom:6px;"><span style="padding:3px 8px;border-radius:4px;background:var(--green);color:white;font-weight:600;">0</span><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">1</span><span style="padding:3px 8px;border-radius:4px;background:var(--yellow);color:white;">2</span><span style="padding:3px 8px;border-radius:4px;background:var(--green);color:white;font-weight:600;">0</span><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">1</span><span style="padding:3px 8px;border-radius:4px;background:var(--green);color:white;font-weight:600;">0</span></div><div style="text-align:center;font-size:0.75rem;color:var(--text3);">나머지 0: <span style="color:var(--green);font-weight:600;">3개</span> → C(3,2)=3쌍 | 나머지 1: 2개 → 1쌍 | 나머지 2: 1개 → 0쌍</div></div>① 각 prefix 값을 M으로 나눈 나머지를 구해<br>② <code>cnt[r]</code> = 나머지가 r인 prefix 값의 개수<br>③ 답 = 각 나머지별 <code>cnt[r] × (cnt[r]-1) / 2</code>를 합산<br><br><code>prefix[0] = 0</code>도 나머지 0에 포함시켜야 해!<br><span class="lang-cpp">답이 매우 커질 수 있으니 <code>long long</code> 타입 필수!</span><span class="lang-py">Python은 큰 수를 자동 처리하니 걱정 없어!</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))

# 나머지별 개수 세기
cnt = [0] * M
prefix_mod = 0
cnt[0] = 1  # prefix[0] = 0의 나머지는 0

for x in arr:
    prefix_mod = (prefix_mod + x) % M
    cnt[prefix_mod] += 1

# 나머지가 같은 쌍의 수 = nC2
ans = 0
for c in cnt:
    ans += c * (c - 1) // 2

print(ans)`,
                cpp: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    long long cnt[1001] = {0};
    cnt[0] = 1;
    long long prefix_mod = 0;

    for (int i = 0; i < N; i++) {
        long long x;
        cin >> x;
        prefix_mod = (prefix_mod + x) % M;
        cnt[prefix_mod]++;
    }

    long long ans = 0;
    for (int r = 0; r < M; r++) {
        ans += cnt[r] * (cnt[r] - 1) / 2;
    }
    cout << ans << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '나머지 분류',
                    description: '누적합의 나머지가 같은 쌍의 수를 조합(nC2)으로 구합니다.',
                    timeComplexity: 'O(N + M)',
                    spaceComplexity: 'O(M)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())

# 2차원 누적합 만들기
prefix = [[0] * (N + 1) for _ in range(N + 1)]
for i in range(1, N + 1):
    row = list(map(int, input().split()))
    for j in range(1, N + 1):
        prefix[i][j] = (row[j - 1]
                        + prefix[i - 1][j]
                        + prefix[i][j - 1]
                        - prefix[i - 1][j - 1])

# 각 질문에 답하기
for _ in range(M):
    x1, y1, x2, y2 = map(int, input().split())
    ans = (prefix[x2][y2]
          - prefix[x1 - 1][y2]
          - prefix[x2][y1 - 1]
          + prefix[x1 - 1][y1 - 1])
    print(ans)`,
                        cpp: `#include <iostream>
using namespace std;

int prefix[1025][1025];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            int x;
            cin >> x;
            prefix[i][j] = x + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
        }
    }

    while (M--) {
        int x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        cout << prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1] << '\\n';
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `N개 수와 나눌 수 M을 입력받습니다.
구간 합이 M으로 나누어 떨어지는 경우를 셉니다.`,
                                code: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))`
                            },
                            {
                                title: '나머지별 개수',
                                desc: `누적합의 나머지가 같은 두 위치의 구간 합은 M의 배수.
cnt[0]=1: prefix[0]=0도 나머지 0에 포함시킵니다.`,
                                code: `cnt = [0] * M
prefix_mod = 0
cnt[0] = 1

for x in arr:
    prefix_mod = (prefix_mod + x) % M
    cnt[prefix_mod] += 1`
                            },
                            {
                                title: '조합 계산',
                                desc: `나머지가 같은 쌍의 수 = nC2 = n*(n-1)//2.
모든 나머지 값에 대해 합산하면 답입니다.`,
                                code: `ans = 0
for c in cnt:
    ans += c * (c - 1) // 2

print(ans)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N개 수와 나눌 수 M을 입력받습니다.
빠른 입출력을 위해 sync_with_stdio(false) 설정.`,
                                code: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;`
                            },
                            {
                                title: '나머지별 개수',
                                desc: `prefix[0]=0의 나머지도 세야 하므로 cnt[0]=1로 시작.
long long: 값이 10억까지이므로 누적합 오버플로 방지.`,
                                code: `    long long cnt[1001] = {0};
    cnt[0] = 1;  // prefix[0]=0도 나머지 0에 포함
    long long prefix_mod = 0;

    for (int i = 0; i < N; i++) {
        long long x;
        cin >> x;
        prefix_mod = (prefix_mod + x) % M;
        cnt[prefix_mod]++;
    }`
                            },
                            {
                                title: '조합 계산',
                                desc: `nC2 = n*(n-1)/2.
답이 매우 커질 수 있으므로 long long 필수.`,
                                code: `    long long ans = 0;
    for (int r = 0; r < M; r++) {
        ans += cnt[r] * (cnt[r] - 1) / 2;  // nC2
    }
    cout << ans << endl;
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
