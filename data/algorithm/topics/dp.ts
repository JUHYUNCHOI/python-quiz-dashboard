import type { AlgoTopic } from '../types'

export const dpTopic: AlgoTopic = {
    id: 'dp',
    title: '다이나믹 프로그래밍 (DP)',
    icon: '🧩',
    category: '문제 해결 기법 (Silver~Gold)',
    order: 12,
    description: '다이나믹 프로그래밍 — 한 번 푼 건 다시 안 풀기!',
    titleEn: 'Dynamic Programming (DP)',
    categoryEn: 'Problem Solving (Silver~Gold)',
    descriptionEn: 'Dynamic programming — never solve the same subproblem twice!',
    track: 'both',
    stages: [
        {
            num: 1,
            title: 'DP 입문',
            titleEn: 'DP Introduction',
            problemIds: [
                'boj-24416',
                'boj-9184',
                'boj-1463',
                'boj-1904'
            ],
            desc: '기본 계산 규칙 연습',
            descEn: 'Practicing basic recurrence relations'
        },
        {
            num: 2,
            title: '1차원 DP 심화',
            titleEn: '1D DP Advanced',
            problemIds: [
                'boj-2579',
                'boj-2156',
                'boj-1912',
                'boj-10844'
            ],
            desc: '조건이 있는 1차원 DP',
            descEn: '1D DP with constraints'
        },
        {
            num: 3,
            title: '2차원 DP',
            titleEn: '2D DP',
            problemIds: [
                'boj-1149',
                'boj-1932'
            ],
            desc: '테이블을 2차원으로 확장',
            descEn: 'Extending the DP table to 2 dimensions'
        },
        {
            num: 4,
            title: '가장 긴 증가 수열',
            titleEn: 'Longest Increasing Subsequence',
            problemIds: [
                'boj-11053',
                'boj-11054',
                'boj-2565'
            ],
            desc: '증가 수열 찾기',
            descEn: 'Finding the longest increasing subsequence'
        },
        {
            num: 5,
            title: '고전 DP',
            titleEn: 'Classic DP',
            problemIds: [
                'boj-9251',
                'boj-12865'
            ],
            desc: '가장 긴 공통 수열, 배낭 문제',
            descEn: 'Longest common subsequence, knapsack problem'
        }
    ],
    problems: [
        {
            id: 'boj-24416',
            title: 'BOJ 24416 - 알고리즘 수업: 피보나치 수 1',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/24416',
            simIntro: '재귀와 DP의 연산 횟수 차이를 단계별로 비교해보세요.',
            inputLabel: '입력값 (n)',
            sim: {
                type: 'fib1'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>오늘도 서준이는 동적 프로그래밍 수업 조교를 맡았다. 재귀 호출에 비해 동적 프로그래밍이 얼마나 빠른지 확인해 보자. n번째 피보나치 수를 구하는 재귀 함수의 호출 횟수와 동적 프로그래밍의 대입 횟수를 출력하시오.</p>
    <h4>입력</h4>
    <p>첫째 줄에 n이 주어진다. (5 ≤ n ≤ 40)</p>
    <h4>출력</h4>
    <p>첫째 줄에 재귀 호출의 기본 연산 횟수와 동적 프로그래밍의 기본 연산 횟수를 공백으로 구분하여 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>5</pre></div>
        <div><strong>출력</strong><pre>5 3</pre></div>
    </div></div>
    <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
        <div><strong>입력</strong><pre>30</pre></div>
        <div><strong>출력</strong><pre>832040 28</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>5 ≤ n ≤ 40</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '문제가 "기본 연산 횟수를 세라"고 하네요. 그러면 일단 재귀 코드를 그대로 돌려볼까요? <code>fib(n)</code>을 호출하면서 <code>return 1</code>이 실행될 때마다 카운트를 세면 되겠죠. DP 쪽도 <code>f[i] = f[i-1] + f[i-2]</code>가 실행될 때마다 세면 될 것 같아요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '잠깐, 재귀에서 매번 카운트 변수를 따로 관리해야 할까요? 사실 잘 생각해보면, 재귀의 기본 연산 <code>return 1</code>이 실행되는 횟수는 곧 <strong>fib(n)의 값 자체</strong>예요! 리프 노드에 도달한 횟수 = fib(n)이니까요. 그러면 카운트를 따로 셀 필요 없이 그냥 fib(n) 값을 구하면 되는 거죠.<br><br><div style="display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;"><div style="text-align:center;"><div style="font-size:0.8rem;color:var(--text3);">재귀 기본 연산</div><div style="font-size:1.3rem;font-weight:700;color:var(--red);">fib(n) 값</div></div><div style="font-size:1.2rem;color:var(--text3);">vs</div><div style="text-align:center;"><div style="font-size:0.8rem;color:var(--text3);">DP 기본 연산</div><div style="font-size:1.3rem;font-weight:700;color:var(--green);">n − 2</div></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: 'DP 쪽은 더 간단합니다. for문이 <code>i = 3</code>부터 <code>i = n</code>까지 돌면서 <code>f[i] = f[i-1] + f[i-2]</code>를 실행하니까, 총 횟수는 그냥 <strong>n - 2</strong>번이에요. 계산할 것도 없죠!<br><br>정리하면:<br>• 재귀 기본 연산 수 = <code>fib(n)</code> 값<br>• DP 기본 연산 수 = <code>n - 2</code>'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python에서 재귀로 <code>fib(n)</code>을 구현하면 됩니다. n이 최대 40이라 재귀도 시간 내에 동작해요. 단, <code>sys.setrecursionlimit</code>은 여기선 필요 없습니다.</span><span class="lang-cpp">C++에서 <code>fib(40)</code>은 약 1억이라 <code>long long</code>을 써야 오버플로우가 안 납니다. <code>int</code>로 하면 틀릴 수 있어요!</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())

# 여기에 풀이를 작성하세요
# 재귀 호출의 기본 연산 횟수와 DP의 기본 연산 횟수를 구하세요
`,
                cpp: `#include <iostream>
using namespace std;

// 여기에 풀이를 작성하세요

int main() {
    int n;
    cin >> n;
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: '재귀 fib + 단순 계산',
                    description: '재귀 fib(n)의 값이 곧 재귀 기본 연산 수이고, DP는 n-2번입니다.',
                    timeComplexity: 'O(2^n) 재귀 / O(n) DP',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())

# 여기에 풀이를 작성하세요
# 재귀 호출의 기본 연산 횟수와 DP의 기본 연산 횟수를 구하세요
`,
                        cpp: `#include <iostream>
using namespace std;

// 여기에 풀이를 작성하세요

int main() {
    int n;
    cin >> n;
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '재귀 함수 정의',
                                desc: `재귀 fib(n) 호출 횟수 자체가 기본 연산 수와 같습니다.
기저 조건: n이 1 또는 2이면 1을 반환.`,
                                code: `import sys
input = sys.stdin.readline

def fib(n):
    if n == 1 or n == 2:
        return 1
    return fib(n-1) + fib(n-2)`
                            },
                            {
                                title: '입력 받기',
                                desc: 'n을 정수로 입력받습니다.',
                                code: 'n = int(input())'
                            },
                            {
                                title: '결과 출력',
                                desc: `fib(n)이 재귀 기본 연산 수, n-2가 DP 기본 연산 수입니다.
DP는 i=3부터 n까지 반복하므로 정확히 n-2번.`,
                                code: 'print(fib(n), n - 2)'
                            }
                        ],
                        cpp: [
                            {
                                title: '재귀 함수 정의',
                                desc: `long long 사용: fib(40)은 int 범위를 초과할 수 있습니다.
재귀 호출 횟수 = fib(n) 값 자체.`,
                                code: `#include <iostream>
using namespace std;

// 재귀 fib: 호출 횟수 자체가 기본 연산 수
long long fib(int n) {
    if (n == 1 || n == 2) return 1;
    return fib(n-1) + fib(n-2);
}`
                            },
                            {
                                title: '입력 받기',
                                desc: 'n을 입력받고 main 함수를 시작합니다.',
                                code: `int main() {
    int n;
    cin >> n;`
                            },
                            {
                                title: '결과 출력',
                                desc: '재귀 기본 연산 수(fib(n))와 DP 기본 연산 수(n-2)를 출력합니다.',
                                code: `    cout << fib(n) << " " << n - 2 << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-9184',
            title: 'BOJ 9184 - 신나는 함수 실행',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/9184',
            simIntro: 'w(2,2,2) 호출 과정에서 메모이제이션이 어떻게 중복을 제거하는지 확인하세요.',
            inputLabel: 'a 값',
            sim: {
                type: 'fun'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>재귀 함수 w(a, b, c)의 결과를 구하시오. 메모이제이션을 사용하여 효율적으로 계산한다. 입력은 EOF까지 반복하며, a=b=c=-1이면 종료.</p>
    <h4>입력</h4>
    <p>입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 테스트 케이스는 한 줄에 세 정수 a, b, c가 주어진다. 입력의 마지막은 -1 -1 -1로 나타내며, 세 수가 모두 -1인 경우는 입력의 마지막을 나타내므로 처리하지 않는다. (-50 ≤ a, b, c ≤ 50)</p>
    <h4>출력</h4>
    <p>각 테스트 케이스마다 w(a, b, c)의 값을 출력한다. 출력 형식은 예제를 참고한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>1 1 1
2 2 2
10 4 6
50 50 50
-1 -1 -1</pre></div>
        <div><strong>출력</strong><pre>w(1, 1, 1) = 2
w(2, 2, 2) = 4
w(10, 4, 6) = 523
w(50, 50, 50) = 1048576</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>-50 ≤ a, b, c ≤ 50</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '문제에서 재귀 함수 코드를 이미 알려줬으니, 그대로 구현하면 되겠네요! 조건문 그대로 옮기면 될 것 같아요:<br>• a, b, c 중 하나가 &le; 0이면 1 반환<br>• 하나라도 &gt; 20이면 w(20, 20, 20)<br>• a &lt; b &lt; c이면 w(a,b,c-1) + w(a,b-1,c-1) - w(a,b-1,c)<br>• 그 외: w(a-1,b,c) + w(a-1,b-1,c) + w(a-1,b,c-1) - w(a-1,b-1,c-1)'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '그대로 재귀를 돌리면 같은 (a, b, c) 조합이 수없이 반복 호출됩니다.<br><br><div style="display:flex;gap:6px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;font-size:0.8rem;"><div style="text-align:center;border:1.5px solid var(--red);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--red);margin-bottom:2px;">순수 재귀</div><div style="font-size:0.75rem;">같은 호출 반복</div><div style="font-weight:700;color:var(--red);font-size:1.1rem;">O(3<sup>n</sup>)</div></div><div style="font-size:1.2rem;color:var(--text3);">→</div><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--green);margin-bottom:2px;">메모이제이션</div><div style="font-size:0.75rem;">한 번만 계산</div><div style="font-weight:700;color:var(--green);font-size:1.1rem;">O(21<sup>3</sup>)</div></div></div><strong>이미 계산한 값을 다시 계산하는 건 낭비</strong>죠!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '한 번 계산한 w(a,b,c)의 결과를 저장해두고, 다음에 같은 호출이 오면 바로 꺼내 쓰면 됩니다 — 이것이 <strong>메모이제이션</strong>이에요!<br><br><code>dp[a][b][c]</code>에 결과를 저장하면 되는데, a, b, c가 0~20 범위이므로 <code>dp[21][21][21]</code> 크기면 충분합니다. 함수 시작에서 "이미 계산했나?" 체크 한 줄만 추가하면 끝!<br><br><div style="display:flex;gap:6px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;font-size:0.85rem;"><div style="padding:6px 10px;border-radius:8px;background:var(--yellow);color:white;font-weight:600;">w(2,2,2) 호출</div><div>→</div><div style="padding:6px 10px;border-radius:8px;background:var(--accent);color:white;">dp에 저장</div><div>→</div><div style="padding:6px 10px;border-radius:8px;background:var(--yellow);color:white;font-weight:600;">w(2,2,2) 또 호출</div><div>→</div><div style="padding:6px 10px;border-radius:8px;background:var(--green);color:white;font-weight:600;">dp에서 바로 반환!</div></div>'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python은 딕셔너리로 메모이제이션하면 편합니다. <code>(a,b,c)</code> 튜플을 키로 쓰면 별도 visited 배열이 필요 없어요:<br><code>if (a,b,c) in dp: return dp[(a,b,c)]</code></span><span class="lang-cpp">C++은 3차원 배열 <code>dp[21][21][21]</code>과 <code>visited[21][21][21]</code>을 선언해서, visited가 true이면 dp 값을 바로 리턴합니다. 출력 형식은 <code>printf("w(%d, %d, %d) = %d\\n", ...)</code>로 맞추세요.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

# 값을 저장할 3차원 배열 또는 딕셔너리
# dp = [[[0]*21 for _ in range(21)] for _ in range(21)]

def w(a, b, c):
    # 여기에 저장하며 풀기를 적용한 함수를 작성하세요
    pass

while True:
    a, b, c = map(int, input().split())
    if a == -1 and b == -1 and c == -1:
        break
    print(f"w({a}, {b}, {c}) = {w(a, b, c)}")
`,
                cpp: `#include <iostream>
using namespace std;

int dp[21][21][21];
bool visited[21][21][21];

int w(int a, int b, int c) {
    // 여기에 저장하며 풀기를 적용한 함수를 작성하세요
    return 0;
}

int main() {
    int a, b, c;
    while (cin >> a >> b >> c) {
        if (a == -1 && b == -1 && c == -1) break;
        printf("w(%d, %d, %d) = %d\\n", a, b, c, w(a, b, c));
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '메모이제이션 (Top-Down DP)',
                    description: '3차원 배열에 계산 결과를 저장하여 중복 호출을 제거합니다.',
                    timeComplexity: 'O(21^3)',
                    spaceComplexity: 'O(21^3)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

# 값을 저장할 3차원 배열 또는 딕셔너리
# dp = [[[0]*21 for _ in range(21)] for _ in range(21)]

def w(a, b, c):
    # 여기에 저장하며 풀기를 적용한 함수를 작성하세요
    pass

while True:
    a, b, c = map(int, input().split())
    if a == -1 and b == -1 and c == -1:
        break
    print(f"w({a}, {b}, {c}) = {w(a, b, c)}")
`,
                        cpp: `#include <iostream>
using namespace std;

int dp[21][21][21];
bool visited[21][21][21];

int w(int a, int b, int c) {
    // 여기에 저장하며 풀기를 적용한 함수를 작성하세요
    return 0;
}

int main() {
    int a, b, c;
    while (cin >> a >> b >> c) {
        if (a == -1 && b == -1 && c == -1) break;
        printf("w(%d, %d, %d) = %d\\n", a, b, c, w(a, b, c));
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '메모 테이블 초기화',
                                desc: `Python은 딕셔너리로 메모이제이션 구현.
(a,b,c) 튜플을 키로 사용하면 별도 visited 불필요.`,
                                code: `import sys
input = sys.stdin.readline

dp = {}`
                            },
                            {
                                title: 'w 함수 구현 (메모이제이션)',
                                desc: `문제에 주어진 조건을 그대로 구현하되,
이미 계산한 값은 dp에서 바로 꺼내 중복 호출을 제거합니다.`,
                                code: `def w(a, b, c):
    if a <= 0 or b <= 0 or c <= 0:
        return 1
    if a > 20 or b > 20 or c > 20:
        return w(20, 20, 20)
    if (a, b, c) in dp:
        return dp[(a, b, c)]
    if a < b < c:
        dp[(a,b,c)] = w(a,b,c-1) + w(a,b-1,c-1) - w(a,b-1,c)
    else:
        dp[(a,b,c)] = w(a-1,b,c) + w(a-1,b-1,c) + w(a-1,b,c-1) - w(a-1,b-1,c-1)
    return dp[(a,b,c)]`
                            },
                            {
                                title: '입출력 처리',
                                desc: `-1 -1 -1이 나올 때까지 반복 입력.
f-string으로 출력 형식을 맞춥니다.`,
                                code: `while True:
    a, b, c = map(int, input().split())
    if a == -1 and b == -1 and c == -1:
        break
    print(f"w({a}, {b}, {c}) = {w(a, b, c)}")`
                            }
                        ],
                        cpp: [
                            {
                                title: '메모 테이블 초기화',
                                desc: 'C++은 3차원 배열 + visited 배열로 메모이제이션 구현',
                                code: `#include <iostream>
using namespace std;

// 0~20 범위만 저장하면 되므로 21^3 크기
int dp[21][21][21];
bool visited[21][21][21];`
                            },
                            {
                                title: 'w 함수 구현 (메모이제이션)',
                                desc: `visited 배열로 계산 여부를 체크해 중복 호출을 방지합니다.
문제 조건을 그대로 if-else로 분기.`,
                                code: `int w(int a, int b, int c) {
    if (a <= 0 || b <= 0 || c <= 0) return 1;
    if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);
    // 이미 계산했으면 바로 리턴
    if (visited[a][b][c]) return dp[a][b][c];
    visited[a][b][c] = true;
    if (a < b && b < c)
        dp[a][b][c] = w(a,b,c-1) + w(a,b-1,c-1) - w(a,b-1,c);
    else
        dp[a][b][c] = w(a-1,b,c) + w(a-1,b-1,c) + w(a-1,b,c-1) - w(a-1,b-1,c-1);
    return dp[a][b][c];
}`
                            },
                            {
                                title: '입출력 처리',
                                desc: 'C++은 printf로 출력 형식을 맞춤',
                                code: `int main() {
    int a, b, c;
    while (cin >> a >> b >> c) {
        if (a == -1 && b == -1 && c == -1) break;
        printf("w(%d, %d, %d) = %d\\n", a, b, c, w(a, b, c));
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
            id: 'boj-1463',
            title: 'BOJ 1463 - 1로 만들기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1463',
            simIntro: '10을 1로 만드는 최소 연산 과정을 DP 테이블로 확인하세요.',
            inputLabel: '정수 N',
            sim: {
                type: '1to'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>정수 X에 사용할 수 있는 연산은 다음과 같이 세 가지이다. X가 3으로 나누어 떨어지면 3으로 나눈다. X가 2로 나누어 떨어지면 2로 나눈다. 1을 뺀다. 정수 N이 주어졌을 때, 위와 같은 연산 세 개를 적절히 사용해서 1을 만들려고 한다. 연산을 사용하는 횟수의 최솟값을 출력하시오.</p>
    <h4>입력</h4>
    <p>첫째 줄에 정수 N이 주어진다. (1 ≤ N ≤ 10<sup>6</sup>)</p>
    <h4>출력</h4>
    <p>첫째 줄에 연산을 하는 횟수의 최솟값을 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>2</pre></div>
        <div><strong>출력</strong><pre>1</pre></div>
    </div></div>
    <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
        <div><strong>입력</strong><pre>10</pre></div>
        <div><strong>출력</strong><pre>3</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ N ≤ 10<sup>6</sup></li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '세 가지 연산(÷3, ÷2, -1)이 있으니, 그리디하게 "가능한 한 큰 수로 나누기"를 하면 빠르지 않을까요? 예를 들어 3으로 나눌 수 있으면 3으로, 아니면 2로, 둘 다 안 되면 1을 빼는 식으로요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '10을 생각해보세요.<br><div style="display:flex;flex-direction:column;gap:6px;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.85rem;"><div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;"><span style="font-weight:600;color:var(--red);">그리디:</span><span style="padding:3px 8px;border-radius:6px;background:var(--red);color:white;font-weight:600;">10</span><span>→-1→</span><span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">5</span><span>→-1→</span><span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">4</span><span>→÷2→</span><span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">2</span><span>→÷2→</span><span style="padding:3px 8px;border-radius:6px;background:var(--red);color:white;">1</span><span style="font-weight:600;color:var(--red);">= 4번</span></div><div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;"><span style="font-weight:600;color:var(--green);">최적:</span><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">10</span><span>→-1→</span><span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">9</span><span>→÷3→</span><span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">3</span><span>→÷3→</span><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;">1</span><span style="font-weight:600;color:var(--green);">= 3번</span></div></div>큰 수로 나누는 게 항상 최선이 아니에요! 때로는 1을 빼서 3의 배수로 만드는 게 더 나을 수 있습니다. 모든 경우를 따져봐야 해요.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>dp[i]</code> = 정수 i를 1로 만드는 최소 연산 횟수로 정의합시다. dp[1] = 0 (이미 1이니까).<br><br>i에서 가능한 연산 세 가지를 <strong>전부</strong> 시도해서 최솟값을 고르면 됩니다:<br>• 1 빼기: <code>dp[i] = dp[i-1] + 1</code><br>• 2로 나누기 (가능할 때): <code>dp[i] = min(dp[i], dp[i/2] + 1)</code><br>• 3으로 나누기 (가능할 때): <code>dp[i] = min(dp[i], dp[i/3] + 1)</code><br><br>i = 2부터 N까지 순서대로 채우면 됩니다 (Bottom-Up).'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python은 리스트 <code>dp = [0] * (n + 1)</code>로 만들고, <code>range(2, n + 1)</code>로 순회하면 깔끔합니다. <code>//</code> 연산자로 정수 나눗셈을 하세요.</span><span class="lang-cpp">C++은 N이 최대 10<sup>6</sup>이므로 전역 배열 <code>int dp[1000001]</code>로 선언합니다. <code>min()</code>과 <code>algorithm</code> 헤더를 사용하세요.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())

# dp[i] = i를 1로 만드는 최소 연산 횟수
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int dp[1000001];

int main() {
    int n;
    cin >> n;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'Bottom-Up DP',
                    description: 'dp[1]=0에서 시작하여 dp[N]까지 세 가지 연산의 최솟값을 채웁니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())

# dp[i] = i를 1로 만드는 최소 연산 횟수
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int dp[1000001];

int main() {
    int n;
    cin >> n;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 DP 배열',
                                desc: `dp[i] = i를 1로 만드는 최소 연산 횟수.
dp[1] = 0 (이미 1이므로 연산 불필요).`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
dp = [0] * (n + 1)`
                            },
                            {
                                title: 'DP 테이블 채우기',
                                desc: `매 i에서 세 가지 연산(−1, ÷2, ÷3)을 모두 시도하고
최솟값을 저장합니다. 그리디가 아닌 DP가 필요한 이유.`,
                                code: `for i in range(2, n + 1):
    dp[i] = dp[i-1] + 1
    if i % 2 == 0:
        dp[i] = min(dp[i], dp[i//2] + 1)
    if i % 3 == 0:
        dp[i] = min(dp[i], dp[i//3] + 1)`
                            },
                            {
                                title: '결과 출력',
                                desc: 'dp[n]이 N을 1로 만드는 최소 연산 횟수입니다.',
                                code: 'print(dp[n])'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 DP 배열',
                                desc: 'N이 최대 10^6이므로 전역 배열 사용',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

// N 최대 10^6 → 전역 배열로 선언
int dp[1000001];

int main() {
    int n;
    cin >> n;`
                            },
                            {
                                title: 'DP 테이블 채우기',
                                desc: `1을 빼기 → 기본값, 2로 나누기 / 3으로 나누기 → 가능할 때만 min 갱신.
세 연산 모두 시도해야 최적해를 보장합니다.`,
                                code: `    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + 1;          // 1을 빼는 연산
        if (i % 2 == 0)
            dp[i] = min(dp[i], dp[i/2] + 1);  // 2로 나누기
        if (i % 3 == 0)
            dp[i] = min(dp[i], dp[i/3] + 1);  // 3으로 나누기
    }`
                            },
                            {
                                title: '결과 출력',
                                desc: 'dp[n]이 N을 1로 만드는 최소 연산 횟수입니다.',
                                code: `    cout << dp[n] << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1904',
            title: 'BOJ 1904 - 01타일',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1904',
            simIntro: '01타일이 피보나치와 동일한 구조임을 dp 배열 채우기로 확인하세요.',
            inputLabel: '길이 N',
            sim: {
                type: 'tile'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>지원이에게 2진 수열이 주어졌다. 이 수열은 0 또는 1로 이루어져 있다. 이 수열에서 00타일과 1타일을 사용하여 길이가 N인 수열을 만드는 방법의 수를 15746으로 나눈 나머지를 출력한다.</p>
    <h4>입력</h4>
    <p>첫째 줄에 자연수 N이 주어진다. (1 ≤ N ≤ 1,000,000)</p>
    <h4>출력</h4>
    <p>첫째 줄에 지원이가 만들 수 있는 길이가 N인 모든 2진 수열의 개수를 15746으로 나눈 나머지를 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>4</pre></div>
        <div><strong>출력</strong><pre>5</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ N ≤ 1,000,000</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '사용할 수 있는 타일이 "1"(길이 1)과 "00"(길이 2)이에요. 길이 N인 수열을 만들어야 하니까... 일단 모든 조합을 다 만들어볼까요? 길이 1짜리를 N개 쓰는 것부터, 00을 최대한 많이 쓰는 것까지 경우를 나누면 될 것 같아요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 <strong>100만</strong>이에요! 모든 조합을 세려면 경우의 수가 엄청 많습니다. 그런데 잠깐, <strong>마지막에 놓는 타일</strong>에 집중해보면 어떨까요?<br><br><div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;border:1.5px solid var(--accent);border-radius:8px;padding:8px 12px;"><div style="font-weight:600;color:var(--accent);margin-bottom:4px;">마지막 = "1"</div><div style="display:flex;gap:3px;align-items:center;"><span style="padding:3px 8px;border-radius:4px;background:var(--bg3);color:var(--text);">N-1칸</span><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;font-weight:600;">1</span></div><div style="font-size:0.75rem;margin-top:3px;">= dp[N-1]가지</div></div><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:8px 12px;"><div style="font-weight:600;color:var(--green);margin-bottom:4px;">마지막 = "00"</div><div style="display:flex;gap:3px;align-items:center;"><span style="padding:3px 8px;border-radius:4px;background:var(--bg3);color:var(--text);">N-2칸</span><span style="padding:3px 8px;border-radius:4px;background:var(--green);color:white;font-weight:600;">00</span></div><div style="font-size:0.75rem;margin-top:3px;">= dp[N-2]가지</div></div></div>어딘가 익숙하지 않나요? <code>dp[N] = dp[N-1] + dp[N-2]</code> — 피보나치!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '바로 <strong>피보나치</strong>와 같은 구조입니다!<br><br><code>dp[i]</code> = 길이 i인 수열의 개수라고 하면:<br><code>dp[i] = dp[i-1] + dp[i-2]</code><br><br><div style="display:flex;gap:4px;align-items:flex-end;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;"><div style="text-align:center;"><div style="font-size:0.65rem;color:var(--text3);">dp[1]</div><div style="padding:4px 10px;border-radius:6px;background:var(--accent);color:white;font-weight:600;">1</div></div><div style="text-align:center;"><div style="font-size:0.65rem;color:var(--text3);">dp[2]</div><div style="padding:4px 10px;border-radius:6px;background:var(--accent);color:white;font-weight:600;">2</div></div><div style="text-align:center;"><div style="font-size:0.65rem;color:var(--text3);">dp[3]</div><div style="padding:4px 10px;border-radius:6px;background:var(--green);color:white;font-weight:600;">3</div></div><div style="text-align:center;"><div style="font-size:0.65rem;color:var(--text3);">dp[4]</div><div style="padding:4px 10px;border-radius:6px;background:var(--green);color:white;font-weight:600;">5</div></div><div style="text-align:center;"><div style="font-size:0.65rem;color:var(--text3);">dp[5]</div><div style="padding:4px 10px;border-radius:6px;background:var(--green);color:white;font-weight:600;">8</div></div></div>초기값: dp[1] = 1 ("1" 하나), dp[2] = 2 ("11", "00")<br><br>매 계산마다 <strong>15746으로 나머지</strong>를 취하는 것 잊지 마세요! 안 하면 숫자가 어마어마하게 커집니다.'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: 'N이 100만이라 배열을 만들 수도 있지만, 이전 두 값만 필요하니 <strong>변수 2개로 공간 O(1)</strong>에 할 수 있어요.<br><span class="lang-py"><code>a, b = 1, 2</code>로 시작해서 <code>a, b = b, (a + b) % 15746</code>을 반복하면 됩니다.</span><span class="lang-cpp"><code>int a = 1, b = 2;</code>로 시작해서 <code>int t = (a + b) % 15746; a = b; b = t;</code>를 반복합니다.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())

# dp[i] = 길이 i인 2진 수열의 개수
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: '피보나치 (Bottom-Up)',
                    description: 'dp[i] = dp[i-1] + dp[i-2] (mod 15746). 피보나치와 동일한 점화식입니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())

# dp[i] = 길이 i인 2진 수열의 개수
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: 'N이 최대 100만이므로 빠른 입력을 사용합니다.',
                                code: `import sys
input = sys.stdin.readline

n = int(input())`
                            },
                            {
                                title: 'DP 계산',
                                desc: `피보나치와 동일한 구조: dp[i] = dp[i-1] + dp[i-2].
변수 2개로 공간 O(1) 최적화, 매번 MOD 연산.`,
                                code: `if n == 1:
    print(1)
else:
    a, b = 1, 2
    for i in range(3, n + 1):
        a, b = b, (a + b) % 15746`
                            },
                            {
                                title: '출력',
                                desc: 'b에 dp[n] 값이 저장되어 있습니다.',
                                code: '    print(b)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: 'N을 입력받습니다.',
                                code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;`
                            },
                            {
                                title: 'DP 계산',
                                desc: '변수 2개로 공간 최적화, 매번 MOD 연산',
                                code: `    if (n == 1) {
        cout << 1 << endl;
        return 0;
    }
    // 변수 2개로 피보나치 계산 (공간 O(1))
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int t = (a + b) % 15746;
        a = b;
        b = t;
    }`
                            },
                            {
                                title: '출력',
                                desc: 'b에 dp[n]의 결과가 저장되어 있습니다.',
                                code: `    cout << b << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2579',
            title: 'BOJ 2579 - 계단 오르기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2579',
            simIntro: '연속 3개 제약 조건 하에서 DP가 어떻게 최적 경로를 찾는지 확인하세요.',
            inputLabel: '계단 수 N',
            sim: {
                type: 'stair'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>계단 오르기 게임은 계단 아래 시작점부터 계단 꼭대기에 위치한 도착점까지 가는 게임이다. 계단을 밟으면 그 계단에 쓰여진 점수를 얻게 된다. 연속된 세 개의 계단을 모두 밟아서는 안 된다. 마지막 도착 계단은 반드시 밟아야 한다. 총 점수의 최댓값을 구하시오.</p>
    <h4>입력</h4>
    <p>입력의 첫째 줄에 계단의 개수가 주어진다. 둘째 줄부터 한 줄에 하나씩 제일 아래에 놓인 계단부터 순서대로 각 계단에 쓰여 있는 점수가 주어진다. 계단의 개수는 300 이하의 자연수이고, 계단에 쓰여 있는 점수는 10,000 이하의 자연수이다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 계단 오르기 게임에서 얻을 수 있는 총 점수의 최댓값을 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>6
10
20
15
25
10
20</pre></div>
        <div><strong>출력</strong><pre>75</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ N ≤ 300</li><li>각 계단 점수 ≤ 10,000</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '계단이 6개뿐이니까 모든 밟는 조합을 다 해볼까요? "연속 3개 불가" + "마지막 반드시 밟기" 조건을 만족하는 경우만 골라서 합이 가장 큰 걸 찾으면 되겠죠. 예를 들어 1,2,4,6번을 밟는 경우, 1,3,5,6번을 밟는 경우... 이런 식으로요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 300이면 경우의 수가 폭발적으로 늘어나서 전부 해보는 건 불가능해요. 대신 이렇게 생각해볼까요 — i번째 계단을 밟는 순간, <strong>바로 직전(i-1)을 밟았냐 안 밟았냐</strong>에 따라 딱 두 가지 경우뿐이에요:<br><br><div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;border:1.5px solid var(--accent);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--accent);margin-bottom:4px;">① 2칸 점프</div><div style="display:flex;gap:3px;align-items:center;"><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">i-2</span><span style="color:var(--text3);">···</span><span style="padding:3px 8px;border-radius:4px;background:var(--yellow);color:white;font-weight:600;">i</span></div></div><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--green);margin-bottom:4px;">② 1칸+1칸</div><div style="display:flex;gap:3px;align-items:center;"><span style="padding:3px 8px;border-radius:4px;background:var(--green);color:white;">i-1</span><span style="padding:3px 8px;border-radius:4px;background:var(--yellow);color:white;font-weight:600;">i</span></div><div style="font-size:0.7rem;color:var(--text3);margin-top:2px;">i-2는 안 밟아야 함!</div></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>dp[i]</code> = i번째 계단을 밟았을 때의 최대 점수라고 하면:<br><br><div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.85rem;"><div style="text-align:center;border:1.5px solid var(--accent);border-radius:8px;padding:8px 12px;"><div style="font-weight:600;color:var(--accent);margin-bottom:4px;">경우 ①: 2칸 점프</div><div style="display:flex;gap:4px;align-items:center;"><span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;">i-2</span><span style="color:var(--text3);">···</span><span style="padding:3px 8px;border-radius:6px;background:var(--yellow);color:white;">i</span></div><div style="margin-top:4px;font-size:0.8rem;"><code>dp[i-2] + s[i]</code></div></div><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:8px 12px;"><div style="font-weight:600;color:var(--green);margin-bottom:4px;">경우 ②: 1칸+1칸</div><div style="display:flex;gap:4px;align-items:center;"><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;">i-3</span><span style="color:var(--text3);">·</span><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;">i-1</span><span style="padding:3px 8px;border-radius:6px;background:var(--yellow);color:white;">i</span></div><div style="margin-top:4px;font-size:0.8rem;"><code>dp[i-3] + s[i-1] + s[i]</code></div></div></div><code>dp[i] = max(경우①, 경우②)</code><br><br>초기값 3개만 수동으로 채우면 됩니다:<br>dp[1] = score[1], dp[2] = score[1]+score[2], dp[3] = max(score[1], score[2])+score[3]'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '1-indexed로 구현하면 점화식과 코드가 딱 맞아요.<br><span class="lang-py"><code>scores = [0] + [int(input()) for _ in range(n)]</code>으로 0번째를 패딩하면 인덱스가 깔끔합니다.</span><span class="lang-cpp"><code>int score[301], dp[301];</code>을 전역으로 선언하고 1번부터 입력받으세요. <code>max()</code>와 <code>&lt;algorithm&gt;</code>을 사용합니다.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
scores = [0] + [int(input()) for _ in range(n)]

# dp[i] = i번째 계단을 밟았을 때 최대 점수
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int score[301], dp[301];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> score[i];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'Bottom-Up DP',
                    description: '각 계단에서 2칸 점프 vs 1칸+1칸 중 최대를 선택합니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
scores = [0] + [int(input()) for _ in range(n)]

# dp[i] = i번째 계단을 밟았을 때 최대 점수
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int score[301], dp[301];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> score[i];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `1-indexed 사용: scores[0]=0을 패딩으로 넣어 인덱스를 맞춥니다.
각 계단 점수를 한 줄씩 입력받습니다.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
scores = [0] + [int(input()) for _ in range(n)]
dp = [0] * (n + 1)`
                            },
                            {
                                title: '초기값 및 DP',
                                desc: `연속 3개 불가 → 두 가지 경우만 존재:
① i-2에서 2칸 점프 ② i-3→i-1→i (1칸+1칸).
초기값 3개를 수동으로 설정 후 i=4부터 점화식 적용.`,
                                code: `dp[1] = scores[1]
if n >= 2: dp[2] = scores[1] + scores[2]
if n >= 3: dp[3] = max(scores[1], scores[2]) + scores[3]
for i in range(4, n + 1):
    dp[i] = max(dp[i-2] + scores[i], dp[i-3] + scores[i-1] + scores[i])`
                            },
                            {
                                title: '출력',
                                desc: 'dp[n]이 마지막 계단을 밟았을 때의 최대 점수입니다.',
                                code: 'print(dp[n])'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N이 최대 300이므로 전역 배열로 충분합니다.
1-indexed로 입력받습니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int score[301], dp[301];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> score[i];`
                            },
                            {
                                title: '초기값 및 DP',
                                desc: `초기값 3개 설정 후, i=4부터 점화식 적용.
2칸 점프 vs 1칸+1칸(i-2 건너뜀) 중 최대를 선택.`,
                                code: `    dp[1] = score[1];
    if (n >= 2) dp[2] = score[1] + score[2];
    if (n >= 3) dp[3] = max(score[1], score[2]) + score[3];
    for (int i = 4; i <= n; i++) {
        // 2칸 점프 vs 1칸+1칸(i-2는 건너뜀)
        dp[i] = max(dp[i-2] + score[i],
                    dp[i-3] + score[i-1] + score[i]);
    }`
                            },
                            {
                                title: '출력',
                                desc: 'dp[n]이 마지막 계단까지의 최대 점수입니다.',
                                code: `    cout << dp[n] << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2156',
            title: 'BOJ 2156 - 포도주 시식',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2156',
            simIntro: '계단 오르기와 다르게 "안 마시는" 선택이 추가된 DP를 확인하세요.',
            inputLabel: '잔 수 n',
            sim: {
                type: 'wine'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>포도주 잔이 일렬로 놓여져 있고, 다음과 같은 규칙으로 포도주를 마시려고 한다. 포도주 잔을 선택하면 그 잔에 들어있는 포도주를 모두 마셔야 하고, 마신 후에는 원래 위치에 다시 놓아야 한다. 연속으로 놓여 있는 3잔을 모두 마실 수는 없다. 최대로 마실 수 있는 포도주의 양을 구하시오.</p>
    <h4>입력</h4>
    <p>첫째 줄에 포도주 잔의 개수 n이 주어진다. (1 ≤ n ≤ 10,000) 둘째 줄부터 n+1번째 줄까지 포도주 잔에 들어있는 포도주의 양이 순서대로 주어진다. 포도주의 양은 1,000 이하의 음이 아닌 정수이다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 최대로 마실 수 있는 포도주의 양을 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>6
6
10
13
9
8
1</pre></div>
        <div><strong>출력</strong><pre>33</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ n ≤ 10,000</li><li>0 ≤ 포도주 양 ≤ 1,000</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '아까 "계단 오르기"랑 비슷해 보여요! 연속 3잔 불가 조건이 같으니까, 같은 방법으로 풀면 되지 않을까요? dp[i] = i번째 잔까지의 최대 양으로 놓고, 계단 오르기처럼 두 가지 경우를 보면...'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '잠깐, 계단 오르기와 <strong>결정적인 차이</strong>가 있어요!<br><br><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;border:1.5px solid var(--accent);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--accent);margin-bottom:3px;">계단 오르기</div><div style="font-size:0.75rem;">마지막 계단 <strong>반드시</strong> 밟아야</div><div style="font-size:0.75rem;color:var(--text3);">→ 2가지 경우</div></div><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--green);margin-bottom:3px;">포도주 시식</div><div style="font-size:0.75rem;">i번째 잔을 <strong>건너뛸 수 있음</strong></div><div style="font-size:0.75rem;color:var(--text3);">→ 3가지 경우</div></div></div>이 차이 때문에 "i번째를 건너뛰는" 경우가 추가됩니다. 계단 오르기의 점화식을 그대로 쓰면 이 경우를 놓쳐서 틀릴 수 있어요!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>dp[i]</code> = 1번~i번째 잔까지 <strong>고려</strong>했을 때 최대 양 (i번째를 안 마실 수도 있음!)으로 정의하면, 3가지 경우가 생겨요:<br><br><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="border:1.5px solid var(--text3);border-radius:8px;padding:6px 10px;text-align:center;"><div style="font-weight:600;margin-bottom:3px;">① 안 마심</div><span style="padding:2px 6px;border-radius:4px;background:var(--bg3);color:var(--text3);">i</span><div style="margin-top:3px;"><code>dp[i-1]</code></div></div><div style="border:1.5px solid var(--accent);border-radius:8px;padding:6px 10px;text-align:center;"><div style="font-weight:600;margin-bottom:3px;">② 1잔만</div><span style="padding:2px 6px;border-radius:4px;background:var(--bg3);color:var(--text3);">i-1</span> <span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">i</span><div style="margin-top:3px;"><code>dp[i-2]+w[i]</code></div></div><div style="border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;text-align:center;"><div style="font-weight:600;margin-bottom:3px;">③ 연속 2잔</div><span style="padding:2px 6px;border-radius:4px;background:var(--green);color:white;">i-1</span> <span style="padding:2px 6px;border-radius:4px;background:var(--green);color:white;">i</span><div style="margin-top:3px;"><code>dp[i-3]+w[i-1]+w[i]</code></div></div></div><code>dp[i] = max(①, ②, ③)</code><br><br>계단 오르기보다 ①번 경우가 추가된 거예요!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py"><code>dp[i] = max(dp[i-1], dp[i-2] + wine[i], dp[i-3] + wine[i-1] + wine[i])</code> 한 줄로 깔끔하게 됩니다. n이 1이나 2일 때 인덱스 에러가 나지 않도록 초기값 처리에 주의하세요.</span><span class="lang-cpp"><code>max({dp[i-1], dp[i-2]+wine[i], dp[i-3]+wine[i-1]+wine[i]})</code>처럼 초기화 리스트로 3개를 비교할 수 있습니다. <code>&lt;algorithm&gt;</code> 헤더가 필요해요.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
wine = [0] + [int(input()) for _ in range(n)]

# dp[i] = i번째 잔까지 고려했을 때 최대 양
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int wine[10001], dp[10001];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> wine[i];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'Bottom-Up DP (3가지 경우)',
                    description: '안 마시기 / 1잔만 / 연속 2잔 중 최대를 선택합니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
wine = [0] + [int(input()) for _ in range(n)]

# dp[i] = i번째 잔까지 고려했을 때 최대 양
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int wine[10001], dp[10001];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> wine[i];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `1-indexed로 wine[0]=0 패딩.
각 잔의 포도주 양을 한 줄씩 입력받습니다.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
wine = [0] + [int(input()) for _ in range(n)]
dp = [0] * (n + 1)`
                            },
                            {
                                title: 'DP 채우기',
                                desc: `계단 오르기와 달리 "안 마시기"(dp[i-1]) 경우가 추가.
3가지: ① 안 마심 ② i만 마심 ③ i-1과 i 연속.
i번째를 반드시 포함하지 않아도 되는 게 핵심 차이.`,
                                code: `dp[1] = wine[1]
if n >= 2: dp[2] = wine[1] + wine[2]
for i in range(3, n + 1):
    dp[i] = max(dp[i-1], dp[i-2] + wine[i], dp[i-3] + wine[i-1] + wine[i])`
                            },
                            {
                                title: '출력',
                                desc: 'dp[n]이 최대로 마실 수 있는 포도주 양입니다.',
                                code: 'print(dp[n])'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N이 최대 10,000이므로 전역 배열 사용.
1-indexed로 입력받습니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int wine[10001], dp[10001];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> wine[i];`
                            },
                            {
                                title: 'DP 채우기',
                                desc: `max({...}) 초기화 리스트로 3개 값 비교.
안 마시기 / 1잔만 / 연속 2잔 중 최대 선택.`,
                                code: `    dp[1] = wine[1];
    if (n >= 2) dp[2] = wine[1] + wine[2];
    for (int i = 3; i <= n; i++) {
        // 3가지: 안 마시기 / 1잔만 / 연속 2잔
        dp[i] = max({dp[i-1],
                     dp[i-2] + wine[i],
                     dp[i-3] + wine[i-1] + wine[i]});
    }`
                            },
                            {
                                title: '출력',
                                desc: 'dp[n]이 최대 포도주 양입니다.',
                                code: `    cout << dp[n] << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1912',
            title: 'BOJ 1912 - 연속합',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1912',
            simIntro: '카데인 알고리즘이 연속합을 어떻게 추적하는지 단계별로 확인하세요.',
            inputLabel: 'n 값',
            sim: {
                type: 'maxSub'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>n개의 정수로 이루어진 임의의 수열이 주어진다. 우리는 이 중 연속된 몇 개의 수를 선택해서 구할 수 있는 합 중 가장 큰 합을 구하려고 한다. 수는 한 개 이상 선택해야 한다.</p>
    <h4>입력</h4>
    <p>첫째 줄에 정수 n(1 ≤ n ≤ 100,000)이 주어지고, 둘째 줄에는 n개의 정수로 이루어진 수열이 주어진다. 수는 -1,000보다 크거나 같고, 1,000보다 작거나 같은 정수이다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 답을 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>10
10 -4 3 1 5 6 -35 12 21 -1</pre></div>
        <div><strong>출력</strong><pre>33</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ n ≤ 100,000</li><li>-1,000 ≤ 수 ≤ 1,000</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '연속된 수들의 합 중 최대를 찾아야 하니까... 모든 가능한 구간 (i, j)를 다 해보면 어떨까요? 시작점 i, 끝점 j를 정하고 그 사이 합을 구해서 최대를 찾는 거예요. 이중 for문으로 모든 구간을 탐색하면 될 것 같아요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 <strong>10만</strong>이에요! 이중 for문은 O(N<sup>2</sup>) = 100억 번이라 시간 초과입니다.<br><br><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.85rem;"><div style="text-align:center;"><div style="font-size:0.8rem;font-weight:600;color:var(--red);">이중 for문</div><div style="font-size:1.1rem;font-weight:700;color:var(--red);">O(N<sup>2</sup>)</div></div><div style="font-size:1.2rem;color:var(--text3);">→</div><div style="text-align:center;"><div style="font-size:0.8rem;font-weight:600;color:var(--green);">카데인</div><div style="font-size:1.1rem;font-weight:700;color:var(--green);">O(N)</div></div></div>매 위치에서 결정해야 할 건 딱 하나예요:<br>"지금까지 이어온 연속합이 플러스인가, 마이너스인가?"<br>마이너스면 <strong>여기서 새로 시작</strong>하는 게 낫고, 플러스면 <strong>이어 붙이는</strong> 게 낫죠!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>dp[i]</code> = i번째 원소를 <strong>마지막으로 포함하는</strong> 최대 연속합이라 하면:<br><br><code>dp[i] = max(dp[i-1] + a[i], a[i])</code><br><br><div style="display:flex;gap:3px;align-items:flex-end;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.75rem;"><div style="text-align:center;"><div style="color:var(--text3);">10</div><div style="width:28px;height:40px;background:var(--green);border-radius:4px;"></div><div style="color:var(--green);font-weight:600;">10</div></div><div style="text-align:center;"><div style="color:var(--text3);">-4</div><div style="width:28px;height:24px;background:var(--green);border-radius:4px;"></div><div style="color:var(--green);font-weight:600;">6</div></div><div style="text-align:center;"><div style="color:var(--text3);">3</div><div style="width:28px;height:36px;background:var(--green);border-radius:4px;"></div><div style="color:var(--green);font-weight:600;">9</div></div><div style="text-align:center;"><div style="color:var(--text3);">1</div><div style="width:28px;height:40px;background:var(--green);border-radius:4px;"></div><div style="color:var(--green);font-weight:600;">10</div></div><div style="text-align:center;"><div style="color:var(--text3);">5</div><div style="width:28px;height:60px;background:var(--green);border-radius:4px;"></div><div style="color:var(--green);font-weight:600;">15</div></div><div style="text-align:center;"><div style="color:var(--text3);">6</div><div style="width:28px;height:84px;background:var(--green);border-radius:4px;"></div><div style="color:var(--green);font-weight:600;">21</div></div><div style="text-align:center;"><div style="color:var(--text3);">-35</div><div style="width:28px;height:4px;background:var(--red);border-radius:4px;"></div><div style="color:var(--red);font-weight:600;">-14</div></div><div style="text-align:center;"><div style="color:var(--text3);">12</div><div style="width:28px;height:48px;background:var(--yellow);border-radius:4px;"></div><div style="color:var(--yellow);font-weight:600;">12</div></div><div style="text-align:center;"><div style="color:var(--text3);">21</div><div style="width:28px;height:100px;background:var(--green);border-radius:4px;"></div><div style="color:var(--green);font-weight:600;">33</div></div><div style="text-align:center;"><div style="color:var(--text3);">-1</div><div style="width:28px;height:90px;background:var(--accent);border-radius:4px;"></div><div style="color:var(--accent);font-weight:600;">32</div></div></div><div style="text-align:center;font-size:0.8rem;color:var(--text2);margin-top:4px;">↑ 각 위치의 dp 값 (밑에서부터 높이). <span style="color:var(--yellow);">노란색</span>: 새로 시작한 지점</div><br>최종 답은 <code>max(dp[0], dp[1], ..., dp[n-1])</code>. 이 방법이 바로 <strong>카데인(Kadane) 알고리즘</strong>이에요. O(N)에 끝납니다!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '사실 배열도 필요 없어요! 변수 2개면 충분합니다.<br><span class="lang-py"><code>cur = a[0]</code>, <code>ans = a[0]</code>으로 시작해서<br><code>cur = max(cur + a[i], a[i])</code><br><code>ans = max(ans, cur)</code><br>음수만 있는 경우도 자동으로 처리돼요 (가장 큰 음수가 답).</span><span class="lang-cpp">같은 로직인데, <code>int cur = a[0], ans = a[0];</code>으로 시작합니다. <code>max()</code>와 <code>&lt;algorithm&gt;</code>을 사용하세요.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))

# dp[i] = i번째를 마지막으로 하는 최대 연속합
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: '카데인 알고리즘',
                    description: '이어붙이기 vs 새시작 중 최대를 선택하며 전체 최대를 추적합니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))

# dp[i] = i번째를 마지막으로 하는 최대 연속합
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `n개의 정수를 한 줄에 입력받습니다.
수는 음수일 수도 있으므로 주의.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))`
                            },
                            {
                                title: '카데인 알고리즘',
                                desc: `핵심: "이어 붙이기 vs 새로 시작" 중 큰 쪽 선택.
cur = 현재 위치까지의 최대 연속합, ans = 전체 최대.
배열 없이 변수 2개로 O(1) 공간에 해결.`,
                                code: `cur = a[0]
ans = a[0]
for i in range(1, n):
    cur = max(cur + a[i], a[i])
    ans = max(ans, cur)`
                            },
                            {
                                title: '출력',
                                desc: 'ans가 연속 부분의 최대 합입니다.',
                                code: 'print(ans)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N이 최대 10만이므로 지역 배열도 가능합니다.
0-indexed로 입력받습니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[100001];
    for (int i = 0; i < n; i++) cin >> a[i];`
                            },
                            {
                                title: '카데인 알고리즘',
                                desc: `이어붙이기(cur+a[i]) vs 새시작(a[i]) 중 max 선택.
ans로 전체 최대를 추적합니다. O(N) 시간, O(1) 공간.`,
                                code: `    // 이어붙이기 vs 새시작 중 최대를 선택
    int cur = a[0], ans = a[0];
    for (int i = 1; i < n; i++) {
        cur = max(cur + a[i], a[i]);
        ans = max(ans, cur);
    }`
                            },
                            {
                                title: '출력',
                                desc: 'ans가 최대 연속합입니다.',
                                code: `    cout << ans << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-10844',
            title: 'BOJ 10844 - 쉬운 계단 수',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/10844',
            simIntro: '끝자리별 전이 과정을 통해 2차원 DP가 어떻게 동작하는지 확인하세요.',
            inputLabel: '길이 N',
            sim: {
                type: 'easyStair'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>45656이란 수를 보자. 이 수는 인접한 모든 자리의 차이가 1이 난다. 이런 수를 계단 수라고 한다. N이 주어질 때, 길이가 N인 계단 수가 총 몇 개인지 구해보자. 0으로 시작하는 수는 계단수가 아니다. 정답을 1,000,000,000으로 나눈 나머지를 출력한다.</p>
    <h4>입력</h4>
    <p>첫째 줄에 N이 주어진다. N은 1 이상 100 이하의 자연수이다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 정답을 1,000,000,000으로 나눈 나머지를 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>1</pre></div>
        <div><strong>출력</strong><pre>9</pre></div>
    </div></div>
    <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
        <div><strong>입력</strong><pre>2</pre></div>
        <div><strong>출력</strong><pre>17</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ N ≤ 100</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '"인접한 자리 차이가 1"인 계단 수를 세야 해요. 일단 길이 N인 숫자를 하나씩 만들어보면서 조건을 체크하면 될까요? 예를 들어 N=2면 12, 21, 23, 32, ... 이런 식으로 전부 만들어서 계단 수인지 확인하는 거예요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 100이면 숫자가 10<sup>100</sup>개까지 가능해요! 전부 만들어보는 건 당연히 불가능합니다.<br><br>그런데 잘 보면, 계단 수의 다음 자릿수는 <strong>마지막 자릿수에만 의존</strong>해요.<br><br><div style="display:flex;gap:4px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.85rem;"><span style="padding:4px 10px;border-radius:6px;background:var(--accent);color:white;font-weight:600;">...3</span><span style="font-size:1.2rem;color:var(--text3);">→</span><span style="padding:4px 10px;border-radius:6px;background:var(--green);color:white;">2</span><span style="color:var(--text3);">또는</span><span style="padding:4px 10px;border-radius:6px;background:var(--green);color:white;">4</span><span style="color:var(--text3);font-size:0.8rem;">(±1만 가능)</span></div>그러면 <strong>"마지막 자릿수"를 상태로 관리</strong>하면 되지 않을까요?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>dp[i][j]</code> = 길이 i이고 마지막 자릿수가 j인 계단 수의 개수로 정의합시다!<br><br><div style="padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;text-align:center;font-size:0.8rem;"><div style="margin-bottom:6px;font-weight:600;color:var(--text2);">끝자리 전이 규칙</div><div style="display:flex;gap:3px;align-items:center;justify-content:center;flex-wrap:wrap;"><span style="padding:3px 8px;border-radius:6px;background:var(--red);color:white;font-weight:600;">0</span><span>←→</span><span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;">1</span><span>←→</span><span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;">2</span><span>←→</span><span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;">3</span><span>←→</span><span style="color:var(--text3);">...</span><span>←→</span><span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;">8</span><span>←→</span><span style="padding:3px 8px;border-radius:6px;background:var(--red);color:white;font-weight:600;">9</span></div><div style="margin-top:6px;color:var(--text3);font-size:0.75rem;"><span style="color:var(--red);">0</span>은 1에서만, <span style="color:var(--red);">9</span>는 8에서만 올 수 있음 (경계!)</div></div>초기값: dp[1][1~9] = 1 (0으로 시작하는 건 계단 수가 아님!)<br>답: <code>dp[N][0] + dp[N][1] + ... + dp[N][9]</code>'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '답이 매우 커지므로 매 계산마다 <code>% 1,000,000,000</code>을 해야 해요.<br><span class="lang-py"><code>dp = [[0]*10 for _ in range(n+1)]</code>로 2차원 리스트를 만들고, 마지막에 <code>sum(dp[n]) % MOD</code>로 출력합니다.</span><span class="lang-cpp"><code>long long dp[101][10]</code>을 사용하세요. 합산할 때 <code>int</code>로 하면 오버플로우가 날 수 있어요!</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
MOD = 1_000_000_000

# dp[i][j] = 길이 i, 마지막 자릿수 j인 계단 수의 개수
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
using namespace std;

const int MOD = 1000000000;
long long dp[101][10];

int main() {
    int n;
    cin >> n;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: '2차원 DP (자릿수 전이)',
                    description: '끝자리 0과 9의 경계 처리를 주의하며 전이합니다.',
                    timeComplexity: 'O(10N)',
                    spaceComplexity: 'O(10N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
MOD = 1_000_000_000

# dp[i][j] = 길이 i, 마지막 자릿수 j인 계단 수의 개수
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
using namespace std;

const int MOD = 1000000000;
long long dp[101][10];

int main() {
    int n;
    cin >> n;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기화',
                                desc: `dp[i][j] = 길이 i, 끝자리 j인 계단 수 개수.
0으로 시작하는 수는 계단 수가 아니므로 dp[1][0]=0.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
MOD = 1_000_000_000
dp = [[0]*10 for _ in range(n+1)]
for j in range(1, 10):
    dp[1][j] = 1`
                            },
                            {
                                title: 'DP 전이',
                                desc: `끝자리 0은 1에서만, 끝자리 9는 8에서만 올 수 있음.
나머지 j는 j-1 또는 j+1에서 전이. 매번 MOD 연산.`,
                                code: `for i in range(2, n+1):
    dp[i][0] = dp[i-1][1]
    dp[i][9] = dp[i-1][8]
    for j in range(1, 9):
        dp[i][j] = (dp[i-1][j-1] + dp[i-1][j+1]) % MOD`
                            },
                            {
                                title: '합산 및 출력',
                                desc: '길이 N인 모든 계단 수 = dp[N][0] + dp[N][1] + ... + dp[N][9].',
                                code: 'print(sum(dp[n]) % MOD)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기화',
                                desc: 'long long 사용: 합산 시 int 범위 초과 가능',
                                code: `#include <iostream>
using namespace std;

const int MOD = 1000000000;
// long long: 합산 시 int 범위 초과 방지
long long dp[101][10];

int main() {
    int n;
    cin >> n;
    // 0으로 시작하는 수는 계단 수가 아님
    for (int j = 1; j <= 9; j++) dp[1][j] = 1;`
                            },
                            {
                                title: 'DP 전이',
                                desc: `경계 처리: 0 뒤에는 1만, 9 뒤에는 8만 가능.
나머지 자릿수는 양쪽에서 전이받습니다.`,
                                code: `    for (int i = 2; i <= n; i++) {
        dp[i][0] = dp[i-1][1];           // 0 뒤에는 1만 가능
        dp[i][9] = dp[i-1][8];           // 9 뒤에는 8만 가능
        for (int j = 1; j <= 8; j++)
            dp[i][j] = (dp[i-1][j-1] + dp[i-1][j+1]) % MOD;
    }`
                            },
                            {
                                title: '합산 및 출력',
                                desc: `0~9 모든 끝자리의 개수를 합산합니다.
long long으로 합산 시 오버플로우 방지.`,
                                code: `    long long ans = 0;
    for (int j = 0; j <= 9; j++)
        ans = (ans + dp[n][j]) % MOD;
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
            id: 'boj-1149',
            title: 'BOJ 1149 - RGB거리',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1149',
            simIntro: '이웃 색 제약 하에서 최소 비용을 선택하는 2차원 DP를 확인하세요.',
            inputLabel: '집의 수 N',
            sim: {
                type: 'rGB'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>RGB거리에는 집이 N개 있다. 거리는 선분으로 나타낼 수 있고, 1번 집부터 N번 집이 순서대로 있다. 집은 빨강, 초록, 파랑 중 하나의 색으로 칠해야 한다. 이웃한 집은 같은 색으로 칠할 수 없다. 각 집을 빨강, 초록, 파랑으로 칠하는 비용이 주어졌을 때, 모든 집을 칠하는 비용의 최솟값을 구하시오.</p>
    <h4>입력</h4>
    <p>첫째 줄에 집의 수 N(2 ≤ N ≤ 1,000)이 주어진다. 둘째 줄부터 N개의 줄에는 각 집을 빨강, 초록, 파랑으로 칠하는 비용이 1번 집부터 한 줄에 하나씩 주어진다. 집을 칠하는 비용은 1,000 이하의 자연수이다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 모든 집을 칠하는 비용의 최솟값을 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>3
26 40 83
49 60 57
13 89 99</pre></div>
        <div><strong>출력</strong><pre>96</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>2 ≤ N ≤ 1,000</li><li>1 ≤ 비용 ≤ 1,000</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '각 집을 R, G, B 중 하나로 칠하니까, 모든 조합을 다 해보면 어떨까요? N개 집에 3가지 색이니 3<sup>N</sup>가지 경우를 확인해서 "이웃 같은 색 아님" 조건을 만족하면서 비용이 최소인 걸 고르면 되겠죠.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 1000이면 3<sup>1000</sup>... 우주의 나이보다 긴 시간이 걸려요!<br><br><div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;"><div style="font-weight:600;color:var(--red);">전수 조사</div><div style="font-size:1.1rem;font-weight:700;color:var(--red);">3<sup>1000</sup></div></div><div style="font-size:1.2rem;color:var(--text3);">→</div><div style="text-align:center;"><div style="font-weight:600;color:var(--green);">DP</div><div style="font-size:1.1rem;font-weight:700;color:var(--green);">N × 3</div></div></div>i번째 집의 색을 정할 때 중요한 건 <strong>바로 직전 집(i-1)이 무슨 색이냐</strong>뿐이에요. "마지막에 칠한 색"만 기억하면 되지 않을까요?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>dp[i][c]</code> = i번째 집을 색 c(R=0, G=1, B=2)로 칠했을 때의 최소 총 비용<br><br><div style="display:flex;gap:4px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--text3);">집 1</div><div style="width:36px;height:30px;background:#e74c3c;border-radius:4px;display:flex;align-items:center;justify-content:center;color:white;font-weight:600;">R</div></div><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--text3);">집 2</div><div style="width:36px;height:30px;background:#2ecc71;border-radius:4px;display:flex;align-items:center;justify-content:center;color:white;font-weight:600;">G</div></div><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--text3);">집 3</div><div style="width:36px;height:30px;background:#3498db;border-radius:4px;display:flex;align-items:center;justify-content:center;color:white;font-weight:600;">B</div></div><div style="font-size:0.75rem;color:var(--text3);margin-left:8px;">← 이웃이 같은 색이면 안 됨!</div></div>이웃 색이 달라야 하므로:<br>• 빨강: <code>dp[i][0] = min(dp[i-1][1], dp[i-1][2]) + cost[i][0]</code><br>• 초록: <code>dp[i][1] = min(dp[i-1][0], dp[i-1][2]) + cost[i][1]</code><br>• 파랑: <code>dp[i][2] = min(dp[i-1][0], dp[i-1][1]) + cost[i][2]</code><br><br>답: <code>min(dp[N][0], dp[N][1], dp[N][2])</code>'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '이전 행만 참조하니까 공간 최적화로 <strong>1차원 배열 하나</strong>로도 충분해요!<br><span class="lang-py"><code>dp = list(cost[0])</code>으로 시작해서, 매 집마다 <code>ndp</code>를 만들어 교체합니다. <code>min(dp)</code>로 최종 답을 구하면 깔끔해요.</span><span class="lang-cpp"><code>int dp[1001][3]</code>을 전역으로 선언하거나, 1차원 배열 2개로 최적화할 수 있습니다. <code>min({dp[n-1][0], dp[n-1][1], dp[n-1][2]})</code>으로 출력하세요.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
cost = [list(map(int, input().split())) for _ in range(n)]

# dp[i][c] = i번째 집을 색 c로 칠했을 때 최소 비용
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int cost[1001][3], dp[1001][3];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        cin >> cost[i][0] >> cost[i][1] >> cost[i][2];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: '2차원 DP (색 선택)',
                    description: '각 집마다 이전 집의 다른 색 최소비용 + 현재 비용을 선택합니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
cost = [list(map(int, input().split())) for _ in range(n)]

# dp[i][c] = i번째 집을 색 c로 칠했을 때 최소 비용
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int cost[1001][3], dp[1001][3];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        cin >> cost[i][0] >> cost[i][1] >> cost[i][2];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: 'N개의 집에 대해 R, G, B 비용을 2차원 리스트로 입력받습니다.',
                                code: `import sys
input = sys.stdin.readline

n = int(input())
cost = [list(map(int, input().split())) for _ in range(n)]`
                            },
                            {
                                title: 'DP 계산',
                                desc: `이전 행만 참조하므로 1차원 배열로 공간 최적화.
각 색마다 이전 집의 "다른 색" 최소비용 + 현재 비용.`,
                                code: `dp = list(cost[0])
for i in range(1, n):
    ndp = [
        min(dp[1], dp[2]) + cost[i][0],
        min(dp[0], dp[2]) + cost[i][1],
        min(dp[0], dp[1]) + cost[i][2]
    ]
    dp = ndp`
                            },
                            {
                                title: '출력',
                                desc: '마지막 집의 R, G, B 비용 중 최솟값이 답입니다.',
                                code: 'print(min(dp))'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N이 최대 1000이므로 전역 2차원 배열 사용.
각 집의 R, G, B 비용을 입력받습니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int cost[1001][3], dp[1001][3];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        cin >> cost[i][0] >> cost[i][1] >> cost[i][2];`
                            },
                            {
                                title: 'DP 계산',
                                desc: `이웃한 집은 같은 색 불가 → 나머지 2색의 min 선택.
첫 번째 집은 비용 그대로 초기화합니다.`,
                                code: `    // 첫 번째 집 초기화
    for (int c = 0; c < 3; c++) dp[0][c] = cost[0][c];
    for (int i = 1; i < n; i++) {
        // 이웃한 집은 다른 색이어야 하므로 나머지 2색의 min 선택
        dp[i][0] = min(dp[i-1][1], dp[i-1][2]) + cost[i][0];
        dp[i][1] = min(dp[i-1][0], dp[i-1][2]) + cost[i][1];
        dp[i][2] = min(dp[i-1][0], dp[i-1][1]) + cost[i][2];
    }`
                            },
                            {
                                title: '출력',
                                desc: 'min({...}) 초기화 리스트로 3색 중 최솟값 출력.',
                                code: `    cout << min({dp[n-1][0], dp[n-1][1], dp[n-1][2]}) << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1932',
            title: 'BOJ 1932 - 정수 삼각형',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1932',
            simIntro: '삼각형을 아래에서 위로 올라가며 최대 경로 합을 구하는 과정을 확인하세요.',
            inputLabel: '삼각형 크기 n',
            sim: {
                type: 'triangle'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>정수 삼각형의 맨 위에서 아래로 내려오면서, 대각선 왼쪽 또는 오른쪽으로만 이동할 때 선택된 수의 합이 최대가 되는 경로를 찾으시오.</p>
    <h4>입력</h4>
    <p>첫째 줄에 삼각형의 크기 n(1 ≤ n ≤ 500)이 주어지고, 둘째 줄부터 n+1번째 줄까지 정수 삼각형이 주어진다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 합이 최대가 되는 경로에 있는 수의 합을 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>5
7
3 8
8 1 0
2 7 4 4
4 5 2 6 5</pre></div>
        <div><strong>출력</strong><pre>30</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ n ≤ 500</li><li>0 ≤ 수 ≤ 9,999</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '꼭대기에서 바닥까지 내려가는 모든 경로를 탐색해볼까요? 매 층에서 왼쪽 대각선 또는 오른쪽 대각선으로 이동하니까, 깊이가 n이면 경로가 2<sup>n-1</sup>개예요. 각 경로의 합을 구해서 최대를 찾으면 되겠죠.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'n이 최대 500이면 2<sup>499</sup>개의 경로... 불가능하죠!<br><br>그런데 삼각형의 각 칸 (i, j)에는 <strong>두 곳에서만</strong> 올 수 있어요:<br><br><div style="text-align:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="display:flex;gap:20px;justify-content:center;align-items:end;"><div style="text-align:center;"><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">i-1,j-1</span><div style="font-size:0.7rem;color:var(--text3);">왼쪽 위</div></div><div style="text-align:center;"><span style="padding:3px 8px;border-radius:4px;background:var(--accent);color:white;">i-1,j</span><div style="font-size:0.7rem;color:var(--text3);">바로 위</div></div></div><div style="font-size:1.2rem;color:var(--text3);">↘ ↙</div><div><span style="padding:4px 10px;border-radius:6px;background:var(--yellow);color:white;font-weight:600;">i, j</span></div></div>이전 칸까지의 최대 합만 알면 현재 칸의 최대 합도 바로 구할 수 있죠!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '위→아래로 풀 수도 있지만, <strong>아래→위</strong>로 올라가면 더 간단해요!<br><br><div style="text-align:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;line-height:2;"><div><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">30</span></div><div><span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;">23</span> <span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;">21</span></div><div><span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;">20</span> <span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;">13</span> <span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;">10</span></div><div><span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">7</span> <span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">12</span> <span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">10</span> <span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">10</span></div><div><span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">4</span> <span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">5</span> <span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">2</span> <span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">6</span> <span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">5</span></div><div style="font-size:0.75rem;color:var(--text3);margin-top:4px;">↑ 아래에서 위로 큰 값을 더해 올라감. 꼭대기 = 답!</div></div>맨 아래 행부터 시작해서, 각 칸에서 아래 두 자식 중 큰 값을 더해 올라갑니다:<br><code>tri[i][j] += max(tri[i+1][j], tri[i+1][j+1])</code><br><br>이러면 경계 처리도 필요 없고, 최종 답이 <code>tri[0][0]</code> 하나에 깔끔하게 모입니다!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '삼각형 배열을 직접 수정하면 추가 메모리도 필요 없어요.<br><span class="lang-py"><code>for i in range(n-2, -1, -1):</code>로 아래에서 위로 올라갑니다. 입력은 <code>tri = [list(map(int, input().split())) for _ in range(n)]</code>으로 2차원 리스트로 받으세요.</span><span class="lang-cpp"><code>for (int i = n-2; i &gt;= 0; i--)</code>로 역순 순회합니다. <code>int tri[501][501]</code> 전역 배열에 직접 누적하면 됩니다.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
tri = [list(map(int, input().split())) for _ in range(n)]

# dp[i][j] = i행 j열까지의 최대 합
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int tri[501][501];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= i; j++)
            cin >> tri[i][j];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: '아래→위 Bottom-Up',
                    description: '맨 아래 행부터 위로 올라가며 max를 누적합니다.',
                    timeComplexity: 'O(N^2)',
                    spaceComplexity: 'O(N^2)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
tri = [list(map(int, input().split())) for _ in range(n)]

# dp[i][j] = i행 j열까지의 최대 합
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int tri[501][501];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= i; j++)
            cin >> tri[i][j];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `삼각형을 2차원 리스트로 입력받습니다.
i행에는 i+1개의 수가 있습니다.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
tri = [list(map(int, input().split())) for _ in range(n)]`
                            },
                            {
                                title: '아래→위 DP',
                                desc: `아래에서 위로 올라가며 풀면 경계 처리가 필요 없고,
tri[0][0]이 바로 답이 되어 간결합니다.
원본 배열을 직접 수정하여 추가 공간 불필요.`,
                                code: `for i in range(n-2, -1, -1):
    for j in range(i+1):
        tri[i][j] += max(tri[i+1][j], tri[i+1][j+1])`
                            },
                            {
                                title: '출력',
                                desc: '꼭대기(tri[0][0])에 최대 합이 누적되어 있습니다.',
                                code: 'print(tri[0][0])'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N이 최대 500이므로 전역 2차원 배열 사용.
삼각형 형태로 입력받습니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int tri[501][501];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= i; j++)
            cin >> tri[i][j];`
                            },
                            {
                                title: '아래→위 DP',
                                desc: `맨 아래 행부터 위로 올라가며 max 누적.
아래→위 방식은 경계 처리 없이 tri[0][0]이 답.`,
                                code: `    // 맨 아래 행부터 올라가며 max 누적
    for (int i = n-2; i >= 0; i--)
        for (int j = 0; j <= i; j++)
            tri[i][j] += max(tri[i+1][j], tri[i+1][j+1]);`
                            },
                            {
                                title: '출력',
                                desc: 'tri[0][0]에 최대 경로 합이 누적됩니다.',
                                code: `    cout << tri[0][0] << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-11053',
            title: 'BOJ 11053 - 가장 긴 증가하는 부분 수열',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/11053',
            simIntro: 'dp[i] 배열을 채우며 가장 긴 증가 수열을 찾는 과정을 확인하세요.',
            inputLabel: '수열 크기 N',
            sim: {
                type: 'lIS'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열(LIS)의 길이를 구하는 프로그램을 작성하시오. 예를 들어 수열 A = {10, 20, 10, 30, 20, 50}이면 LIS는 {10, 20, 30, 50}이고 길이는 4이다.</p>
    <h4>입력</h4>
    <p>첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000)이 주어진다. 둘째 줄에는 수열 A를 이루고 있는 A<sub>i</sub>가 주어진다. (1 ≤ A<sub>i</sub> ≤ 1,000)</p>
    <h4>출력</h4>
    <p>첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>6
10 20 10 30 20 50</pre></div>
        <div><strong>출력</strong><pre>4</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ N ≤ 1,000</li><li>1 ≤ A<sub>i</sub> ≤ 1,000</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '가장 긴 증가하는 부분 수열(LIS)을 찾아야 해요. 일단 모든 부분 수열을 만들어서 "증가하는가?" 체크하고 그중 가장 긴 걸 고르면 될까요? 수열 {10, 20, 10, 30, 20, 50}에서 부분 수열은 {10}, {10, 20}, {10, 20, 30}, {10, 20, 30, 50}, ...'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N개 원소의 부분 수열은 2<sup>N</sup>개예요. N=1000이면... 전혀 안 됩니다!<br><br>대신 이렇게 생각해볼까요: 각 원소를 "마지막 원소"로 끝나는 가장 긴 증가 수열의 길이를 구하는 거예요.<br><br><div style="display:flex;gap:4px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">10</span><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">20</span><span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">10</span><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">30</span><span style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">20</span><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">50</span></div><div style="text-align:center;font-size:0.75rem;color:var(--text3);">LIS = {10, 20, 30, 50} 길이 4</div>i번째 원소로 끝나는 LIS를 구하려면, 앞에 있는 <strong>나보다 작은</strong> 원소들의 LIS 길이를 참고하면 되죠!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>dp[i]</code> = i번째 원소를 <strong>마지막으로 포함하는</strong> LIS 길이로 정의합시다.<br><br><div style="display:flex;gap:3px;align-items:flex-end;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;"><div style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">10</div><div style="color:var(--green);font-weight:600;">1</div></div><div style="text-align:center;"><div style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">20</div><div style="color:var(--green);font-weight:600;">2</div></div><div style="text-align:center;"><div style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">10</div><div style="color:var(--text3);">1</div></div><div style="text-align:center;"><div style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">30</div><div style="color:var(--green);font-weight:600;">3</div></div><div style="text-align:center;"><div style="padding:3px 8px;border-radius:6px;background:var(--bg3);color:var(--text);">20</div><div style="color:var(--text3);">2</div></div><div style="text-align:center;"><div style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">50</div><div style="color:var(--green);font-weight:600;">4</div></div></div><div style="text-align:center;font-size:0.75rem;color:var(--text3);margin-bottom:8px;">↑ 위: 수열 값, 아래: dp[i] (LIS 길이). <span style="color:var(--green);">초록</span> = LIS에 포함</div>초기값: dp[i] = 1 (자기 자신만 포함)<br>0 &le; j &lt; i인 모든 j에 대해:<br><code>A[j] &lt; A[i]</code>이면 → <code>dp[i] = max(dp[i], dp[j] + 1)</code><br><br>답: <code>max(dp[0], dp[1], ..., dp[n-1])</code><br><br>이중 for문으로 O(N<sup>2</sup>). N &le; 1000이므로 충분합니다!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py"><code>dp = [1] * n</code>으로 초기화하고 이중 for문을 돌립니다. 마지막에 <code>print(max(dp))</code>로 간단하게 출력!</span><span class="lang-cpp"><code>int dp[1001]</code>을 전역으로 선언하고, 내부 루프에서 <code>dp[i] = max(dp[i], dp[j] + 1)</code>을 갱신합니다. <code>*max_element(dp, dp + n)</code>으로 최댓값을 구하세요.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))

# dp[i] = a[i]를 마지막으로 하는 가장 긴 증가 수열의 길이
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int a[1001], dp[1001];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'O(N^2) DP',
                    description: '각 원소마다 앞의 모든 원소를 확인하여 LIS를 구합니다.',
                    timeComplexity: 'O(N^2)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))

# dp[i] = a[i]를 마지막으로 하는 가장 긴 증가 수열의 길이
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int a[1001], dp[1001];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: '수열 크기 N과 N개의 정수를 입력받습니다.',
                                code: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))`
                            },
                            {
                                title: 'LIS DP',
                                desc: `dp[i] = a[i]를 마지막으로 하는 LIS 길이.
각 원소마다 앞의 더 작은 원소들의 dp값 중 최대 + 1.
이중 for문 O(N²), N ≤ 1000이므로 충분.`,
                                code: `dp = [1] * n
for i in range(1, n):
    for j in range(i):
        if a[j] < a[i]:
            dp[i] = max(dp[i], dp[j] + 1)`
                            },
                            {
                                title: '출력',
                                desc: 'dp 배열의 최댓값이 가장 긴 증가 수열의 길이.',
                                code: 'print(max(dp))'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N이 최대 1000이므로 전역 배열 사용.
0-indexed로 입력받습니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int a[1001], dp[1001];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];`
                            },
                            {
                                title: 'LIS DP',
                                desc: `각 원소에서 앞의 더 작은 원소를 찾아 dp 갱신.
초기값 dp[i]=1(자기만 포함). O(N²) 이중 루프.`,
                                code: `    // dp[i] = a[i]를 마지막으로 하는 LIS 길이
    for (int i = 0; i < n; i++) {
        dp[i] = 1;  // 자기 자신만 포함
        for (int j = 0; j < i; j++)
            if (a[j] < a[i])
                dp[i] = max(dp[i], dp[j] + 1);
    }`
                            },
                            {
                                title: '출력',
                                desc: 'max_element로 dp 배열의 최댓값을 구합니다.',
                                code: `    cout << *max_element(dp, dp + n) << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-11054',
            title: 'BOJ 11054 - 가장 긴 올라갔다 내려가는 수열',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/11054',
            simIntro: 'LIS와 LDS를 합쳐 바이토닉 수열을 구하는 과정을 확인하세요.',
            inputLabel: '수열 크기 N',
            sim: {
                type: 'bitonic'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>수열 S가 어떤 수 S<sub>k</sub>를 기준으로 S<sub>1</sub> &lt; S<sub>2</sub> &lt; ... &lt; S<sub>k-1</sub> &lt; S<sub>k</sub> &gt; S<sub>k+1</sub> &gt; ... &gt; S<sub>N-1</sub> &gt; S<sub>N</sub>을 만족하면 바이토닉 수열이라고 한다. 주어진 수열에서 가장 긴 바이토닉 부분 수열의 길이를 구하시오.</p>
    <h4>입력</h4>
    <p>첫째 줄에 수열 A의 크기 N이 주어지고, 둘째 줄에는 수열 A를 이루고 있는 A<sub>i</sub>가 주어진다. (1 ≤ N ≤ 1,000, 1 ≤ A<sub>i</sub> ≤ 1,000)</p>
    <h4>출력</h4>
    <p>첫째 줄에 수열 A의 가장 긴 바이토닉 부분 수열의 길이를 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>10
1 5 2 1 4 3 4 5 2 1</pre></div>
        <div><strong>출력</strong><pre>7</pre></div>
    </div></div>
    <p><strong>설명:</strong> {1, 2, 3, 4, 5, 2, 1}</p>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ N ≤ 1,000</li><li>1 ≤ A<sub>i</sub> ≤ 1,000</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '바이토닉 수열은 "올라갔다 내려가는" 수열이에요. 어떤 꼭짓점 k를 기준으로 왼쪽은 증가, 오른쪽은 감소하죠. 그러면 모든 위치 k를 꼭짓점으로 해보고, 그때마다 왼쪽 증가 수열 + 오른쪽 감소 수열의 합이 가장 큰 걸 찾으면 되지 않을까요?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '꼭짓점 k마다 왼쪽 LIS, 오른쪽 감소 수열을 매번 새로 구하면 O(N<sup>3</sup>)이 돼요.<br><br><div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;border:1.5px solid var(--red);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--red);">매번 계산</div><div style="font-size:0.75rem;">N번 × O(N<sup>2</sup>)</div><div style="font-weight:700;color:var(--red);">O(N<sup>3</sup>)</div></div><div style="font-size:1.2rem;color:var(--text3);">→</div><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--green);">미리 구해놓기</div><div style="font-size:0.75rem;">LIS 1회 + LDS 1회</div><div style="font-weight:700;color:var(--green);">O(N<sup>2</sup>)</div></div></div><strong>왼쪽에서의 LIS</strong>와 <strong>오른쪽에서의 LIS</strong>(= 감소 수열)를 <strong>한 번씩만</strong> 미리 구해놓으면, 합치는 건 O(N)이에요!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '두 배열을 미리 구합시다:<br>• <code>lis[i]</code> = 왼→오 방향에서 i를 마지막으로 하는 LIS 길이<br>• <code>lds[i]</code> = 오→왼 방향에서 i를 마지막으로 하는 LIS 길이 (= i를 시작으로 하는 감소 수열 길이)<br><br><div style="text-align:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="display:flex;gap:3px;justify-content:center;align-items:flex-end;margin-bottom:4px;"><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">1</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">5</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">2</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">1</span><span style="padding:2px 6px;border-radius:4px;background:var(--yellow);color:white;font-weight:700;">4</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">3</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">4</span><span style="padding:2px 6px;border-radius:4px;background:var(--green);color:white;font-weight:700;">5</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">2</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">1</span></div><div style="font-size:0.7rem;color:var(--text3);">lis: 1 2 2 1 <span style="color:var(--yellow);">3</span> 3 4 <span style="color:var(--green);">5</span> 2 1</div><div style="font-size:0.7rem;color:var(--text3);">lds: 1 4 2 1 <span style="color:var(--yellow);">3</span> 2 2 <span style="color:var(--green);">3</span> 2 1</div><div style="font-size:0.7rem;color:var(--text3);margin-top:2px;">합: 1 5 3 1 <span style="color:var(--yellow);">5</span> 4 5 <span style="color:var(--green);font-weight:600;">7</span> 3 1 ← <span style="color:var(--green);">최대 7</span></div></div>그러면 각 꼭짓점 i에서의 바이토닉 수열 길이는:<br><code>lis[i] + lds[i] - 1</code><br>(-1은 꼭짓점이 양쪽에서 중복 카운트되기 때문)<br><br>답: 모든 i에 대해 이 값의 최대!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: 'LIS를 정방향, 역방향으로 딱 <strong>두 번</strong> 구하면 됩니다.<br><span class="lang-py">역방향 LIS는 <code>for i in range(n-2, -1, -1):</code>로 뒤에서부터 순회합니다. 마지막에 <code>max(lis[i] + lds[i] - 1 for i in range(n))</code>으로 한 줄 출력!</span><span class="lang-cpp">정방향은 <code>lis[1001]</code>, 역방향은 <code>lds[1001]</code> 전역 배열. 합산 시 <code>max(ans, lis[i] + lds[i] - 1)</code>로 갱신합니다.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))

# lis[i] = 왼→우 증가 수열, lds[i] = 우→좌 증가 수열
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int a[1001], lis[1001], lds[1001];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'LIS + LDS 합치기',
                    description: '정방향 LIS와 역방향 LIS를 구해 합산합니다.',
                    timeComplexity: 'O(N^2)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))

# lis[i] = 왼→우 증가 수열, lds[i] = 우→좌 증가 수열
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int a[1001], lis[1001], lds[1001];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 LIS',
                                desc: `먼저 정방향 LIS를 구합니다.
lis[i] = i번째를 마지막으로 하는 증가 수열 길이.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
lis = [1] * n
for i in range(1, n):
    for j in range(i):
        if a[j] < a[i]: lis[i] = max(lis[i], lis[j]+1)`
                            },
                            {
                                title: 'LDS (역방향 LIS)',
                                desc: `뒤에서부터 증가 수열 = 앞에서 보면 감소 수열.
lds[i] = i번째를 시작으로 하는 감소 수열 길이.`,
                                code: `lds = [1] * n
for i in range(n-2, -1, -1):
    for j in range(n-1, i, -1):
        if a[j] < a[i]: lds[i] = max(lds[i], lds[j]+1)`
                            },
                            {
                                title: '합산 및 출력',
                                desc: `꼭짓점 i 기준으로 lis[i]+lds[i]-1의 최대.
-1은 꼭짓점이 양쪽에서 중복 카운트되기 때문.`,
                                code: 'print(max(lis[i] + lds[i] - 1 for i in range(n)))'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 LIS',
                                desc: `정방향 LIS를 먼저 구합니다.
lis[i] = a[i]를 마지막으로 하는 증가 수열 길이.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int a[1001], lis[1001], lds[1001];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    // 정방향 LIS
    for (int i = 0; i < n; i++) {
        lis[i] = 1;
        for (int j = 0; j < i; j++)
            if (a[j] < a[i]) lis[i] = max(lis[i], lis[j] + 1);
    }`
                            },
                            {
                                title: 'LDS (역방향 LIS)',
                                desc: `역방향으로 LIS를 구하면 감소 수열 길이가 됩니다.
lds[i] = a[i]를 시작으로 하는 감소 수열 길이.`,
                                code: `    // 역방향 LIS = 감소 수열 길이
    for (int i = n-1; i >= 0; i--) {
        lds[i] = 1;
        for (int j = n-1; j > i; j--)
            if (a[j] < a[i]) lds[i] = max(lds[i], lds[j] + 1);
    }`
                            },
                            {
                                title: '합산 및 출력',
                                desc: `꼭짓점 i에서 증가+감소 합산, -1로 중복 제거.
모든 i에 대해 최대를 구합니다.`,
                                code: `    // 꼭짓점 i 기준 lis[i]+lds[i]-1의 최대
    int ans = 0;
    for (int i = 0; i < n; i++)
        ans = max(ans, lis[i] + lds[i] - 1);
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
            id: 'boj-2565',
            title: 'BOJ 2565 - 전깃줄',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/2565',
            simIntro: 'A 기준 정렬 후 B 배열에서 LIS를 구해 제거할 전깃줄 수를 구하세요.',
            inputLabel: '전깃줄 수 N',
            sim: {
                type: 'wire'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>두 전봇대 A와 B 사이에 전깃줄이 있다. 전깃줄이 교차하지 않게 하기 위해 몇 개의 전깃줄을 제거하려 한다. 제거해야 하는 전깃줄의 최소 개수를 구하시오.</p>
    <h4>입력</h4>
    <p>첫째 줄에는 두 전봇대 사이의 전깃줄의 개수가 주어진다. 전깃줄의 개수는 100 이하의 자연수이다. 둘째 줄부터 한 줄에 하나씩 전깃줄이 A전봇대와 연결되는 위치의 번호와 B전봇대와 연결되는 위치의 번호가 차례로 주어진다. 위치의 번호는 500 이하의 자연수이고, 같은 위치에 두 개 이상의 전깃줄이 연결될 수 없다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 남아있는 모든 전깃줄이 서로 교차하지 않게 하기 위해 없애야 하는 전깃줄의 최소 개수를 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>8
1 8
3 9
2 2
4 1
6 4
10 10
9 7
7 6</pre></div>
        <div><strong>출력</strong><pre>3</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ N ≤ 100</li><li>위치 번호 ≤ 500</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '전깃줄이 교차하는 쌍을 모두 찾아서, 교차를 없애려면 어느 줄을 제거할지 정하면 될까요? 교차하는 쌍들을 그래프처럼 생각해서... 음, 복잡해지네요. 어떤 줄을 제거해야 나머지가 교차하지 않을지 조합을 따져봐야 할 것 같아요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '제거 조합을 모두 시도하면 2<sup>N</sup>이 되어 안 돼요. <strong>발상을 전환</strong>해봅시다!<br><br><div style="display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.85rem;"><div style="text-align:center;border:1.5px solid var(--red);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--red);">제거 최소?</div><div style="font-size:0.75rem;color:var(--text3);">직접 구하기 어려움</div></div><div style="font-size:1.2rem;color:var(--text3);">⟺</div><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--green);">남기기 최대!</div><div style="font-size:0.75rem;color:var(--text3);">N − 남긴 수 = 답</div></div></div>"교차하지 않는 전깃줄의 최대 집합"은 어떤 구조일까요?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: 'A 전봇대 기준으로 전깃줄을 정렬해봅시다. 그러면 교차하지 않으려면 B 쪽 번호도 <strong>증가해야</strong> 해요!<br><br><div style="padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-weight:600;">A (정렬됨)</span><span style="font-weight:600;">B</span></div><div style="display:flex;justify-content:space-between;"><div style="display:flex;gap:3px;"><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">1</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">2</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">3</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">4</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">6</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">7</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">9</span><span style="padding:2px 6px;border-radius:4px;background:var(--accent);color:white;">10</span></div><div style="display:flex;gap:3px;"><span style="padding:2px 6px;border-radius:4px;background:var(--bg3);color:var(--text);">8</span><span style="padding:2px 6px;border-radius:4px;background:var(--green);color:white;font-weight:600;">2</span><span style="padding:2px 6px;border-radius:4px;background:var(--bg3);color:var(--text);">9</span><span style="padding:2px 6px;border-radius:4px;background:var(--bg3);color:var(--text);">1</span><span style="padding:2px 6px;border-radius:4px;background:var(--green);color:white;font-weight:600;">4</span><span style="padding:2px 6px;border-radius:4px;background:var(--green);color:white;font-weight:600;">6</span><span style="padding:2px 6px;border-radius:4px;background:var(--green);color:white;font-weight:600;">7</span><span style="padding:2px 6px;border-radius:4px;background:var(--green);color:white;font-weight:600;">10</span></div></div><div style="text-align:center;font-size:0.7rem;color:var(--text3);margin-top:4px;"><span style="color:var(--green);">초록</span> = B의 LIS → 교차 안 하는 전깃줄!</div></div>결국 <strong>B 배열의 LIS</strong>를 구하는 문제예요!<br>답: <code>N - LIS 길이</code>'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '핵심은 <strong>A 기준 정렬</strong>을 먼저 하는 거예요!<br><span class="lang-py"><code>wires.sort()</code>하면 첫 번째 값(A) 기준으로 자동 정렬. 이후 <code>b = [w[1] for w in wires]</code>에서 LIS를 구합니다.</span><span class="lang-cpp"><code>pair&lt;int,int&gt;</code>를 사용하면 <code>sort()</code>가 first 기준으로 자동 정렬합니다. <code>wires[i].second</code>에서 LIS를 구하세요.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
wires = [list(map(int, input().split())) for _ in range(n)]

# A 기준 정렬 후 B에서 가장 긴 증가 수열 찾기
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

pair<int,int> wires[101];
int dp[101];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        cin >> wires[i].first >> wires[i].second;
    sort(wires, wires + n);
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: '정렬 + LIS',
                    description: 'A 기준 정렬 후 B 배열에서 LIS를 구해 N에서 뺍니다.',
                    timeComplexity: 'O(N^2)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
wires = [list(map(int, input().split())) for _ in range(n)]

# A 기준 정렬 후 B에서 가장 긴 증가 수열 찾기
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

pair<int,int> wires[101];
int dp[101];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        cin >> wires[i].first >> wires[i].second;
    sort(wires, wires + n);
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 정렬',
                                desc: `A 전봇대 기준으로 정렬하면, B 배열에서 LIS를 구하는
문제로 변환됩니다. 교차 = B가 증가하지 않는 부분.`,
                                code: `import sys
input = sys.stdin.readline

n = int(input())
wires = [list(map(int, input().split())) for _ in range(n)]
wires.sort()`
                            },
                            {
                                title: 'B 배열에서 LIS',
                                desc: `A 정렬 후 B에서 LIS = 교차하지 않는 최대 전깃줄 수.
표준 O(N²) LIS DP를 적용합니다.`,
                                code: `b = [w[1] for w in wires]
dp = [1] * n
for i in range(1, n):
    for j in range(i):
        if b[j] < b[i]: dp[i] = max(dp[i], dp[j]+1)`
                            },
                            {
                                title: '출력',
                                desc: '제거할 전깃줄 수 = 전체 N - 교차 안 하는 최대(LIS).',
                                code: 'print(n - max(dp))'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 정렬',
                                desc: 'pair는 first 기준 자동 정렬',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

pair<int,int> wires[101];
int dp[101];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
        cin >> wires[i].first >> wires[i].second;
    // pair는 first 기준 자동 정렬
    sort(wires, wires + n);`
                            },
                            {
                                title: 'B 배열에서 LIS',
                                desc: `pair의 second(B값)에서 LIS를 구합니다.
LIS 길이 = 교차하지 않는 최대 전깃줄 수.`,
                                code: `    // A 정렬 후 B(second)에서 LIS 구하기
    for (int i = 0; i < n; i++) {
        dp[i] = 1;
        for (int j = 0; j < i; j++)
            if (wires[j].second < wires[i].second)
                dp[i] = max(dp[i], dp[j] + 1);
    }`
                            },
                            {
                                title: '출력',
                                desc: '전체 N에서 LIS 길이를 빼면 제거할 최소 전깃줄 수.',
                                code: `    // 제거할 전깃줄 = 전체 - 교차 안 하는 최대(LIS)
    cout << n - *max_element(dp, dp + n) << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-9251',
            title: 'BOJ 9251 - LCS',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/9251',
            simIntro: '2차원 DP 테이블을 채우며 LCS를 구하는 과정을 확인하세요.',
            inputLabel: '(내장 예제 사용)',
            sim: {
                type: 'lCS'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>LCS(Longest Common Subsequence, 최장 공통 부분 수열) 문제는 두 수열이 주어졌을 때, 모두의 부분 수열이 되는 수열 중 가장 긴 것을 찾는 문제이다.</p>
    <h4>입력</h4>
    <p>첫째 줄과 둘째 줄에 두 문자열이 주어진다. 문자열은 알파벳 대문자로만 이루어져 있으며, 최대 1000글자로 이루어져 있다.</p>
    <h4>출력</h4>
    <p>첫째 줄에 입력으로 주어진 두 문자열의 LCS의 길이를 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>ACAYKP
CAPCAK</pre></div>
        <div><strong>출력</strong><pre>4</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>두 문자열 길이 ≤ 1,000</li><li>대문자로만 구성</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '두 문자열에서 공통 부분 수열 중 가장 긴 걸 찾아야 해요. 일단 A의 모든 부분 수열을 만들고, 각각이 B의 부분 수열이기도 한지 확인하면 될까요? A = "ACAYKP"의 부분 수열은 {A, C, AC, AY, ACK, ...} 이런 식으로요.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '길이 N인 문자열의 부분 수열은 2<sup>N</sup>개! N이 1000이면 전혀 안 되죠.<br><br>대신 이렇게 생각해봐요: A의 i번째 문자와 B의 j번째 문자를 비교할 때,<br><br><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--green);margin-bottom:3px;">A[i] == B[j]</div><div style="font-size:0.75rem;">포함! 양쪽 한 칸 앞으로</div><div><code>dp[i-1][j-1] + 1</code></div></div><div style="text-align:center;border:1.5px solid var(--text3);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;margin-bottom:3px;">A[i] != B[j]</div><div style="font-size:0.75rem;">둘 중 나은 쪽</div><div><code>max(dp[i-1][j], dp[i][j-1])</code></div></div></div>이걸 표로 정리하면 어떨까요?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>dp[i][j]</code> = A의 처음 i글자와 B의 처음 j글자의 LCS 길이로 정의하면:<br><br><div style="overflow-x:auto;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;"><table style="border-collapse:collapse;font-size:0.75rem;margin:0 auto;"><tr><td style="padding:3px 6px;"></td><td style="padding:3px 6px;color:var(--text3);"></td><td style="padding:3px 6px;font-weight:600;">C</td><td style="padding:3px 6px;font-weight:600;">A</td><td style="padding:3px 6px;font-weight:600;">P</td><td style="padding:3px 6px;font-weight:600;">C</td><td style="padding:3px 6px;font-weight:600;">A</td><td style="padding:3px 6px;font-weight:600;">K</td></tr><tr><td style="padding:3px 6px;color:var(--text3);"></td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;color:var(--text3);">0</td></tr><tr><td style="padding:3px 6px;font-weight:600;">A</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;">0</td><td style="padding:3px 6px;background:var(--green);color:white;border-radius:4px;font-weight:600;">1</td><td style="padding:3px 6px;">1</td><td style="padding:3px 6px;">1</td><td style="padding:3px 6px;">1</td><td style="padding:3px 6px;">1</td></tr><tr><td style="padding:3px 6px;font-weight:600;">C</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;background:var(--green);color:white;border-radius:4px;font-weight:600;">1</td><td style="padding:3px 6px;">1</td><td style="padding:3px 6px;">1</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">2</td></tr><tr><td style="padding:3px 6px;font-weight:600;">A</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;">1</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;background:var(--green);color:white;border-radius:4px;font-weight:600;">3</td><td style="padding:3px 6px;">3</td></tr><tr><td style="padding:3px 6px;font-weight:600;">Y</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;">1</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">3</td><td style="padding:3px 6px;">3</td></tr><tr><td style="padding:3px 6px;font-weight:600;">K</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;">1</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">3</td><td style="padding:3px 6px;background:var(--green);color:white;border-radius:4px;font-weight:600;">4</td></tr><tr><td style="padding:3px 6px;font-weight:600;">P</td><td style="padding:3px 6px;color:var(--text3);">0</td><td style="padding:3px 6px;">1</td><td style="padding:3px 6px;">2</td><td style="padding:3px 6px;">3</td><td style="padding:3px 6px;">3</td><td style="padding:3px 6px;">3</td><td style="padding:3px 6px;background:var(--accent);color:white;border-radius:4px;font-weight:700;">4</td></tr></table><div style="text-align:center;font-size:0.7rem;color:var(--text3);margin-top:4px;"><span style="color:var(--green);">초록</span> = 같은 문자 매칭 (+1), 우하단 = 답!</div></div>• <code>A[i] == B[j]</code>: 같은 문자 발견! → <code>dp[i][j] = dp[i-1][j-1] + 1</code><br>• <code>A[i] != B[j]</code>: 둘 중 나은 쪽 → <code>dp[i][j] = max(dp[i-1][j], dp[i][j-1])</code><br><br>0행, 0열은 모두 0 (빈 문자열과의 LCS = 0)<br>답: <code>dp[len(A)][len(B)]</code>'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '1-indexed로 구현하면 경계 처리가 자연스러워요.<br><span class="lang-py"><code>dp = [[0]*(len(b)+1) for _ in range(len(a)+1)]</code>로 초기화. <code>a[i-1] == b[j-1]</code>로 비교하면 0행/0열이 자동으로 0이 됩니다.</span><span class="lang-cpp"><code>int dp[1001][1001]</code>을 전역 선언하면 자동 0 초기화. <code>a[i-1] == b[j-1]</code>로 비교하세요. <code>string</code>으로 입력받으면 편합니다.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

a = input().strip()
b = input().strip()

# dp[i][j] = a[:i]와 b[:j]의 가장 긴 공통 수열 길이
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;

int dp[1001][1001];

int main() {
    string a, b;
    cin >> a >> b;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: '2차원 DP',
                    description: '같으면 대각선+1, 다르면 왼쪽/위쪽 max로 채웁니다.',
                    timeComplexity: 'O(N*M)',
                    spaceComplexity: 'O(N*M)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

a = input().strip()
b = input().strip()

# dp[i][j] = a[:i]와 b[:j]의 가장 긴 공통 수열 길이
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;

int dp[1001][1001];

int main() {
    string a, b;
    cin >> a >> b;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `두 문자열을 한 줄씩 입력받습니다.
strip()으로 개행 문자를 제거합니다.`,
                                code: `import sys
input = sys.stdin.readline

a = input().strip()
b = input().strip()`
                            },
                            {
                                title: 'DP 테이블 채우기',
                                desc: `같은 문자면 대각선(dp[i-1][j-1])+1,
다르면 왼쪽(dp[i][j-1])과 위쪽(dp[i-1][j]) 중 max.
0행/0열은 모두 0 (빈 문자열과의 LCS).`,
                                code: `dp = [[0]*(len(b)+1) for _ in range(len(a)+1)]
for i in range(1, len(a)+1):
    for j in range(1, len(b)+1):
        if a[i-1] == b[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])`
                            },
                            {
                                title: '출력',
                                desc: 'dp[len(a)][len(b)]가 LCS 길이입니다.',
                                code: 'print(dp[len(a)][len(b)])'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `전역 2차원 배열로 DP 테이블 선언.
string으로 두 문자열을 입력받습니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int dp[1001][1001];

int main() {
    string a, b;
    cin >> a >> b;
    int m = a.size(), n = b.size();`
                            },
                            {
                                title: 'DP 테이블 채우기',
                                desc: `같으면 대각선+1 (공통 문자 발견), 다르면 왼쪽/위쪽 max.
1-indexed로 구현하여 0행/0열 초기화 불필요.`,
                                code: `    // 같으면 대각선+1, 다르면 왼쪽/위쪽 max
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a[i-1] == b[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }`
                            },
                            {
                                title: '출력',
                                desc: 'dp[m][n]이 두 문자열의 LCS 길이입니다.',
                                code: `    cout << dp[m][n] << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-12865',
            title: 'BOJ 12865 - 평범한 배낭',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/12865',
            simIntro: '1차원 DP 배열로 배낭 문제를 푸는 과정을 확인하세요.',
            inputLabel: '(내장 예제 사용)',
            sim: {
                type: 'knapsack'
            },
            descriptionHTML: `
    <h3>문제</h3>
    <p>준서가 여행에 필요하다고 생각하는 N개의 물건이 있다. 각 물건은 무게 W와 가치 V를 가진다. 배낭에 넣을 수 있는 물건들의 가치의 최댓값을 구하시오. 배낭 무게 제한은 K이다.</p>
    <h4>입력</h4>
    <p>첫 줄에 물품의 수 N(1 ≤ N ≤ 100)과 준서가 버틸 수 있는 무게 K(1 ≤ K ≤ 100,000)가 주어진다. 두 번째 줄부터 N개의 줄에 거쳐 각 물건의 무게 W(1 ≤ W ≤ 100,000)와 해당 물건의 가치 V(0 ≤ V ≤ 1,000)가 주어진다.</p>
    <h4>출력</h4>
    <p>한 줄에 배낭에 넣을 수 있는 물건들의 가치합의 최댓값을 출력한다.</p>
    <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
        <div><strong>입력</strong><pre>4 7
6 13
4 8
3 6
5 12</pre></div>
        <div><strong>출력</strong><pre>14</pre></div>
    </div></div>
    <h4>제약 조건</h4>
    <ul><li>1 ≤ N ≤ 100</li><li>1 ≤ K ≤ 100,000</li><li>1 ≤ W ≤ 100,000</li><li>0 ≤ V ≤ 1,000</li></ul>
`,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '물건 N개 중에서 넣을 물건을 골라야 해요. 각 물건은 "넣거나" "안 넣거나" 두 가지 선택이니까, 모든 조합(2<sup>N</sup>가지)을 시도해볼까요? 무게 합이 K 이하인 조합 중 가치 합이 최대인 걸 고르면 되겠죠.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 100이면 2<sup>100</sup> = 약 10<sup>30</sup>... 전부 해보는 건 불가능해요!<br><br><div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;"><div style="font-weight:600;color:var(--red);">전수 조사</div><div style="font-size:1.1rem;font-weight:700;color:var(--red);">2<sup>100</sup></div></div><div style="font-size:1.2rem;color:var(--text3);">→</div><div style="text-align:center;"><div style="font-weight:600;color:var(--green);">DP (물건 × 용량)</div><div style="font-size:1.1rem;font-weight:700;color:var(--green);">N × K</div></div></div>i번째 물건을 고려할 때 중요한 건 <strong>지금까지 쓴 무게(남은 용량)</strong>뿐이에요. "이전 물건 수 + 현재 용량"을 상태로 잡으면 될 것 같아요!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>dp[i][w]</code> = 처음 i개 물건까지 고려하고, 배낭 용량이 w일 때의 최대 가치<br><br><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="text-align:center;border:1.5px solid var(--text3);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;margin-bottom:3px;">안 넣기</div><div style="font-size:0.75rem;color:var(--text3);">무게 그대로</div><div><code>dp[i-1][w]</code></div></div><div style="display:flex;align-items:center;font-size:1.2rem;color:var(--text3);">vs</div><div style="text-align:center;border:1.5px solid var(--green);border-radius:8px;padding:6px 10px;"><div style="font-weight:600;color:var(--green);margin-bottom:3px;">넣기!</div><div style="font-size:0.75rem;color:var(--text3);">무게 W[i]만큼 사용</div><div><code>dp[i-1][w-W[i]] + V[i]</code></div></div></div><code>dp[i][w] = max(안 넣기, 넣기)</code><br><br>이것이 유명한 <strong>0/1 배낭 문제(Knapsack)</strong>입니다!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '2차원 배열 대신 <strong>1차원 배열로 공간 최적화</strong>할 수 있어요! 핵심: w를 <strong>역순</strong>으로 순회해야 같은 물건을 두 번 넣는 것을 방지합니다.<br><span class="lang-py"><code>dp = [0] * (K + 1)</code>로 1차원 배열 하나만. 각 물건마다 <code>for w in range(K, wi-1, -1):</code>로 역순 순회하면서 <code>dp[w] = max(dp[w], dp[w-wi] + vi)</code>를 갱신합니다.</span><span class="lang-cpp"><code>int dp[100001] = {0};</code>으로 선언. <code>for (int j = K; j &gt;= w; j--)</code>로 역순 순회합니다. K가 최대 10만이니 배열 크기에 주의하세요.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
items = [list(map(int, input().split())) for _ in range(n)]

# dp[i][w] = i번째까지 고려, 용량 w일 때 최대 가치
# 여기에 풀이를 작성하세요
`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int dp[100001];

int main() {
    int n, k;
    cin >> n >> k;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
            },
            solutions: [
                {
                    approach: '1차원 DP (역순 순회)',
                    description: '각 물건마다 dp 배열을 역순으로 갱신하여 공간을 최적화합니다.',
                    timeComplexity: 'O(NK)',
                    spaceComplexity: 'O(K)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
items = [list(map(int, input().split())) for _ in range(n)]

# dp[i][w] = i번째까지 고려, 용량 w일 때 최대 가치
# 여기에 풀이를 작성하세요
`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int dp[100001];

int main() {
    int n, k;
    cin >> n >> k;
    // 여기에 풀이를 작성하세요
    
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: 'N개 물건의 (무게, 가치) 쌍과 배낭 용량 K를 입력받습니다.',
                                code: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
items = [list(map(int, input().split())) for _ in range(n)]`
                            },
                            {
                                title: '1차원 DP (역순)',
                                desc: `핵심: 역순 순회로 같은 물건을 두 번 넣는 것을 방지.
순방향이면 dp[j-w]가 이미 갱신되어 중복 사용 발생.
dp[j] = 용량 j일 때 최대 가치.`,
                                code: `dp = [0] * (k + 1)
for w, v in items:
    for j in range(k, w - 1, -1):
        dp[j] = max(dp[j], dp[j-w] + v)`
                            },
                            {
                                title: '출력',
                                desc: 'dp[k]가 배낭 용량 K 내 최대 가치입니다.',
                                code: 'print(dp[k])'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `K가 최대 10만이므로 전역 배열 dp[100001] 사용.
N과 K를 입력받습니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int dp[100001];

int main() {
    int n, k;
    cin >> n >> k;`
                            },
                            {
                                title: '1차원 DP (역순)',
                                desc: '역순 순회: 같은 물건을 두 번 넣는 것을 방지',
                                code: `    for (int i = 0; i < n; i++) {
        int w, v;
        cin >> w >> v;
        // 역순으로 순회해야 같은 물건 중복 사용 방지
        for (int j = k; j >= w; j--)
            dp[j] = max(dp[j], dp[j-w] + v);
    }`
                            },
                            {
                                title: '출력',
                                desc: 'dp[k]가 배낭 용량 K 내 최대 가치입니다.',
                                code: `    cout << dp[k] << endl;
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
