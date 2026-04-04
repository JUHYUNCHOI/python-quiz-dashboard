import type { AlgoTopic } from '../types'

export const binarySearchTopic: AlgoTopic = {
    id: 'binarysearch',
    title: '이분 탐색',
    icon: '🔍',
    category: '탐색 (Silver)',
    order: 8,
    description: '정렬된 데이터에서 원하는 값을 빠르게 찾는 기법',
    track: 'both',
    stages: [
        {
            num: 1,
            title: '기본 이분 탐색',
            problemIds: [
                'boj-1920',
                'boj-10816'
            ],
            desc: '배열에서 값 찾기 (Silver IV)'
        },
        {
            num: 2,
            title: '매개변수 탐색 입문',
            problemIds: [
                'boj-1654',
                'boj-2805'
            ],
            desc: '최적값을 이분 탐색으로 (Silver II)'
        },
        {
            num: 3,
            title: '매개변수 탐색 심화',
            problemIds: [
                'boj-2110',
                'boj-1300'
            ],
            desc: '복잡한 판별 함수 (Gold)'
        },
        {
            num: 4,
            title: '응용',
            problemIds: [
                'boj-12015'
            ],
            desc: 'LIS + 이분 탐색 (Gold II)'
        }
    ],
    problems: [
        {
            id: 'boj-1920',
            title: 'BOJ 1920 - 수 찾기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1920',
            simIntro: '정렬된 배열에서 이분 탐색으로 값을 찾는 과정을 관찰하세요.',
            sim: {
                type: 'basicSearch'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N개의 정수 A[1], A[2], …, A[N]이 주어져 있을 때, 이 안에 X라는 정수가 존재하는지 알아내는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 자연수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 줄에는 N개의 정수 A[1], A[2], …, A[N]이 주어진다. 다음 줄에는 M(1 ≤ M ≤ 100,000)이 주어진다. 다음 줄에는 M개의 수들이 주어지는데, 이 수들이 A안에 존재하는지 알아내면 된다. 모든 정수의 범위는 -2<sup>31</sup> 보다 크거나 같고 2<sup>31</sup>보다 작다.</p>
                <h4>출력</h4>
                <p>M개의 줄에 답을 출력한다. 존재하면 1을, 존재하지 않으면 0을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5
4 1 5 2 3
5
1 3 7 9 5</pre></div>
                    <div><strong>출력</strong><pre>1
1
0
0
1</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 100,000</li>
                    <li>-2<sup>31</sup> ≤ 원소 ≤ 2<sup>31</sup></li>
                    <li>1 ≤ M ≤ 100,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '각 질문마다 배열을 <strong>처음부터 끝까지 훑으면서</strong> 같은 수가 있는지 확인하면 되겠지?<br>M개의 질문 × N개의 원소를 하나씩 비교 → 이중 반복문으로 해결!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N, M이 최대 <strong>100,000</strong>이야. 최악의 경우 100,000 × 100,000 = <strong>100억 번</strong> 비교해야 해.<br>시간 제한 안에 절대 못 끝나! O(N × M)은 너무 느려.<br><br><div style="display:flex;gap:12px;align-items:flex-end;padding:10px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);"><div style="text-align:center;"><div style="width:40px;height:120px;background:var(--red);border-radius:4px 4px 0 0;opacity:0.85;"></div><div style="font-size:0.75rem;color:var(--text2);margin-top:4px;">O(NM)<br>100억</div></div><div style="text-align:center;"><div style="width:40px;height:20px;background:var(--green);border-radius:4px 4px 0 0;"></div><div style="font-size:0.75rem;color:var(--text2);margin-top:4px;">O(MlogN)<br>170만</div></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '배열을 <strong>미리 정렬</strong>해두면? 정렬된 배열에서는 <strong>이분 탐색</strong>으로 한 번에 절반씩 범위를 줄일 수 있어!<br>한 번의 탐색이 O(log N)이니까, M개 질문 전체가 O(M log N). 정렬 O(N log N)까지 합쳐도 <strong>O((N+M) log N)</strong>으로 충분해.'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python: <code>bisect_left(A, x)</code>로 x가 들어갈 위치를 찾고, 그 위치의 값이 x와 같은지 확인하면 끝!</span><span class="lang-cpp">C++: <code>binary_search(A, A+N, x)</code>로 한 줄이면 존재 여부를 바로 판별할 수 있어! 또는 <code>lower_bound()</code>로 위치를 찾아서 비교해도 돼.</span>'
                }
            ],
            templates: {
                python: `import sys
from bisect import bisect_left
input = sys.stdin.readline

N = int(input())
A = sorted(list(map(int, input().split())))
M = int(input())
queries = list(map(int, input().split()))

for x in queries:
    idx = bisect_left(A, x)
    if idx < N and A[idx] == x:
        print(1)
    else:
        print(0)`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;
int N, M, A[100001];
bool bsearch(int target) {
    int lo = 0, hi = N - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (A[mid] == target) return true;
        else if (A[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++) cin >> A[i];
    sort(A, A + N);
    cin >> M;
    for (int i = 0; i < M; i++) { int x; cin >> x; cout << (bsearch(x) ? 1 : 0) << "\\n"; }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '정렬 + 이분 탐색',
                    description: '배열을 정렬한 뒤 bisect_left로 존재 여부를 확인합니다.',
                    timeComplexity: 'O((N+M) log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
from bisect import bisect_left
input = sys.stdin.readline

N = int(input())
A = sorted(list(map(int, input().split())))
M = int(input())
queries = list(map(int, input().split()))

for x in queries:
    idx = bisect_left(A, x)
    if idx < N and A[idx] == x:
        print(1)
    else:
        print(0)`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;
int N, M, A[100001];
bool bsearch(int target) {
    int lo = 0, hi = N - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (A[mid] == target) return true;
        else if (A[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++) cin >> A[i];
    sort(A, A + N);
    cin >> M;
    for (int i = 0; i < M; i++) { int x; cin >> x; cout << (bsearch(x) ? 1 : 0) << "\\n"; }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 정렬',
                                desc: `이분 탐색은 정렬된 배열에서만 동작합니다.
입력을 받으면서 바로 정렬해둡니다.`,
                                code: `import sys
from bisect import bisect_left
input = sys.stdin.readline

N = int(input())
A = sorted(list(map(int, input().split())))`
                            },
                            {
                                title: '쿼리 입력',
                                desc: '존재 여부를 확인할 M개의 수를 입력받습니다.',
                                code: `M = int(input())
queries = list(map(int, input().split()))`
                            },
                            {
                                title: '이분 탐색으로 탐색',
                                desc: `bisect_left로 x가 들어갈 위치를 찾고, 그 위치의 값이 x와 같은지 확인합니다.
일일이 순회하면 O(N)이지만, 이분 탐색으로 O(log N)에 판별합니다.`,
                                code: `for x in queries:
    idx = bisect_left(A, x)
    if idx < N and A[idx] == x:
        print(1)
    else:
        print(0)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 정렬',
                                desc: `이분 탐색은 정렬된 배열에서만 동작합니다.
sort()로 오름차순 정렬 후 탐색 준비를 합니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
int N, A[100001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++) cin >> A[i];
    sort(A, A + N);  // 이분 탐색 전 정렬 필수!`
                            },
                            {
                                title: '쿼리 입력',
                                desc: '존재 여부를 확인할 M개의 수를 입력받습니다.',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
int N, A[100001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++) cin >> A[i];
    sort(A, A + N);

    int M;
    cin >> M;`
                            },
                            {
                                title: '이분 탐색으로 탐색',
                                desc: `<algorithm>의 binary_search 함수로 존재 여부를 O(log N)에 판별합니다.
직접 구현 대신 STL을 활용하면 코드가 간결해집니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
int N, A[100001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++) cin >> A[i];
    sort(A, A + N);

    int M;
    cin >> M;

    while (M--) {
        int x;
        cin >> x;
        // binary_search: <algorithm>의 이분 탐색 함수
        cout << (binary_search(A, A + N, x) ? 1 : 0) << "\\n";
    }
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-10816',
            title: 'BOJ 10816 - 숫자 카드 2',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/10816',
            simIntro: 'lower_bound와 upper_bound의 차이를 시각적으로 확인하세요.',
            sim: {
                type: 'bounds'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>숫자 카드는 정수 하나가 적혀져 있는 카드이다. 상근이는 숫자 카드 N개를 가지고 있다. 정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를 상근이가 몇 개 가지고 있는지 구하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 숫자 카드의 개수 N(1 ≤ N ≤ 500,000)이 주어진다. 둘째 줄에는 숫자 카드에 적혀있는 정수가 주어진다. 숫자 카드에 적혀있는 수는 -10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다. 셋째 줄에는 M(1 ≤ M ≤ 500,000)이 주어진다. 넷째 줄에는 상근이가 몇 개 가지고 있는 숫자 카드인지 구해야 할 M개의 정수가 주어지며, 이 수는 공백으로 구분되어져 있다. 이 수도 -10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 입력으로 주어진 M개의 수에 대해서, 각 수가 적힌 숫자 카드를 상근이가 몇 개 가지고 있는지를 공백으로 구분해 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>10
6 3 2 10 10 10 -10 -10 7 3
8
10 9 -5 2 3 4 5 -10</pre></div>
                    <div><strong>출력</strong><pre>3 0 0 1 2 0 0 2</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 500,000</li>
                    <li>1 ≤ M ≤ 500,000</li>
                    <li>-10<sup>7</sup> ≤ 카드 값 ≤ 10<sup>7</sup></li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '각 질문마다 카드 배열을 <strong>처음부터 끝까지 돌면서</strong> 같은 숫자가 몇 개인지 세면 되겠지?<br>간단한 반복문 하나면 개수를 셀 수 있어!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N, M이 최대 <strong>500,000</strong>이야. 매 질문마다 50만 개를 순회하면 500,000 × 500,000 = <strong>2,500억 번</strong>!<br>O(N × M)은 시간 초과 확정이야.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '배열을 <strong>정렬</strong>하면 같은 숫자가 <strong>연속으로 모여</strong> 있잖아!<br>그러면 "x가 시작하는 위치"와 "x가 끝나는 다음 위치"만 찾으면 개수 = 끝 위치 - 시작 위치야.<br>이 두 위치를 이분 탐색으로 찾으면 각각 O(log N)이니까 전체 <strong>O((N+M) log N)</strong>으로 충분해!<br><br><div style="display:flex;gap:3px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.82rem;flex-wrap:wrap;"><span style="padding:3px 8px;background:var(--bg2);border-radius:4px;">2</span><span style="padding:3px 8px;background:var(--bg2);border-radius:4px;">3</span><span style="padding:3px 8px;background:var(--bg2);border-radius:4px;">3</span><span style="padding:3px 8px;border:2px solid var(--accent);border-radius:4px;font-weight:700;">10</span><span style="padding:3px 8px;border:2px solid var(--accent);border-radius:4px;font-weight:700;">10</span><span style="padding:3px 8px;border:2px solid var(--accent);border-radius:4px;font-weight:700;">10</span><span style="padding:3px 8px;background:var(--bg2);border-radius:4px;">11</span><span style="margin:0 4px;color:var(--text3);font-size:0.75rem;">↑L &nbsp; &nbsp; &nbsp; ↑R</span><span style="color:var(--accent);font-weight:600;margin-left:6px;">R - L = 3개!</span></div>'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python: <code>bisect_right(cards, x) - bisect_left(cards, x)</code> 한 줄이면 x의 개수를 바로 구할 수 있어!<br><code>bisect_left</code>는 x가 시작하는 위치, <code>bisect_right</code>는 x 다음 값이 시작하는 위치를 알려줘.</span><span class="lang-cpp">C++: <code>upper_bound(cards, cards+N, x) - lower_bound(cards, cards+N, x)</code>로 동일하게 구간 길이를 구할 수 있어!<br><code>lower_bound</code>는 x 이상 첫 위치, <code>upper_bound</code>는 x 초과 첫 위치를 반환해.</span>'
                }
            ],
            templates: {
                python: `import sys
from bisect import bisect_left, bisect_right
input = sys.stdin.readline

N = int(input())
cards = sorted(list(map(int, input().split())))
M = int(input())
queries = list(map(int, input().split()))

result = []
for x in queries:
    result.append(bisect_right(cards, x) - bisect_left(cards, x))

print(' '.join(map(str, result)))`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int N; cin >> N;
    int cards[500001];
    for (int i = 0; i < N; i++) cin >> cards[i];
    sort(cards, cards + N);
    int M; cin >> M;
    for (int i = 0; i < M; i++) {
        int x; cin >> x;
        int cnt = upper_bound(cards, cards + N, x) - lower_bound(cards, cards + N, x);
        cout << cnt << (i < M - 1 ? " " : "\\n");
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'bisect_left + bisect_right',
                    description: '정렬 후 upper_bound - lower_bound로 개수를 구합니다.',
                    timeComplexity: 'O((N+M) log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
from bisect import bisect_left, bisect_right
input = sys.stdin.readline

N = int(input())
cards = sorted(list(map(int, input().split())))
M = int(input())
queries = list(map(int, input().split()))

result = []
for x in queries:
    result.append(bisect_right(cards, x) - bisect_left(cards, x))

print(' '.join(map(str, result)))`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int N; cin >> N;
    int cards[500001];
    for (int i = 0; i < N; i++) cin >> cards[i];
    sort(cards, cards + N);
    int M; cin >> M;
    for (int i = 0; i < M; i++) {
        int x; cin >> x;
        int cnt = upper_bound(cards, cards + N, x) - lower_bound(cards, cards + N, x);
        cout << cnt << (i < M - 1 ? " " : "\\n");
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 정렬',
                                desc: `이분 탐색을 위해 카드 배열을 정렬합니다.
정렬하면 같은 숫자가 연속으로 모이므로 구간으로 개수를 셀 수 있습니다.`,
                                code: `import sys
from bisect import bisect_left, bisect_right
input = sys.stdin.readline

N = int(input())
cards = sorted(list(map(int, input().split())))`
                            },
                            {
                                title: '쿼리 처리',
                                desc: '개수를 확인할 M개의 숫자를 입력받습니다.',
                                code: `M = int(input())
queries = list(map(int, input().split()))`
                            },
                            {
                                title: '개수 계산 및 출력',
                                desc: `bisect_right(x) - bisect_left(x) = x가 나타나는 구간의 길이 = 개수.
정렬된 배열에서 같은 값은 연속 구간이므로, 양 끝 위치의 차이가 곧 개수입니다.`,
                                code: `result = []
for x in queries:
    result.append(bisect_right(cards, x) - bisect_left(cards, x))

print(' '.join(map(str, result)))`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 정렬',
                                desc: `이분 탐색을 위해 카드 배열을 정렬합니다.
정렬하면 같은 숫자가 연속으로 모이므로 구간으로 개수를 셀 수 있습니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
int N, cards[500001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++) cin >> cards[i];
    sort(cards, cards + N);`
                            },
                            {
                                title: '쿼리 처리',
                                desc: '개수를 확인할 M개의 숫자를 입력받습니다.',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
int N, cards[500001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++) cin >> cards[i];
    sort(cards, cards + N);

    int M;
    cin >> M;`
                            },
                            {
                                title: '개수 계산 및 출력',
                                desc: `upper_bound - lower_bound로 해당 값의 개수를 O(log N)에 구합니다.
STL의 upper_bound는 x 초과 첫 위치, lower_bound는 x 이상 첫 위치를 반환합니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
int N, cards[500001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> N;
    for (int i = 0; i < N; i++) cin >> cards[i];
    sort(cards, cards + N);

    int M;
    cin >> M;

    while (M--) {
        int x;
        cin >> x;
        // upper_bound - lower_bound = 해당 값의 개수
        int cnt = upper_bound(cards, cards + N, x) - lower_bound(cards, cards + N, x);
        cout << cnt;
        if (M) cout << " ";
    }
    cout << "\\n";
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1654',
            title: 'BOJ 1654 - 랜선 자르기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1654',
            simIntro: '랜선 길이를 이분 탐색으로 결정하는 과정을 관찰하세요.',
            sim: {
                type: 'cable'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>집에서 시간을 보내던 오영식은 이미 가지고 있는 K개의 랜선을 잘라서 N개의 같은 길이의 랜선을 만들려고 한다. 편의를 위해 랜선을 자르거나 만들 때 손실되는 길이는 없다고 가정하며, 기존의 K개의 랜선으로 N개의 랜선을 만들 수 없는 경우는 없다고 가정하자. N개보다 많이 만드는 것도 N개를 만드는 것에 포함된다. 만들 수 있는 최대 랜선의 길이를 구하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에는 오영식이 이미 가지고 있는 랜선의 개수 K, 그리고 필요한 랜선의 개수 N이 입력된다. K는 1이상 10,000이하의 정수이고, N은 1이상 1,000,000이하의 정수이다. 그리고 항상 K ≤ N 이다. 그 후 K줄에 걸쳐 이미 가지고 있는 각 랜선의 길이가 센티미터 단위의 정수로 입력된다. 랜선의 길이는 2<sup>31</sup>-1보다 작거나 같은 자연수이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 N개를 만들 수 있는 랜선의 최대 길이를 센티미터 단위의 정수로 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 11
802
743
457
539</pre></div>
                    <div><strong>출력</strong><pre>200</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ K ≤ 10,000</li>
                    <li>1 ≤ N ≤ 1,000,000</li>
                    <li>랜선 길이는 2<sup>31</sup> - 1 이하의 자연수</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '길이를 1cm부터 시작해서 1씩 늘려가면서, 그 길이로 잘랐을 때 N개 이상 만들 수 있는지 확인하면 되지 않을까?<br>가능한 가장 긴 길이를 찾을 때까지 반복!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '랜선 길이가 최대 <strong>2<sup>31</sup> - 1</strong> (약 21억)이야. 1부터 21억까지 하나씩 다 시도하면?<br>최악의 경우 21억 번 × K개 랜선 확인 = <strong>수십억 번 연산</strong>... 시간 초과야!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '"길이 x로 잘랐을 때 N개 이상 만들 수 있는가?" — 이 질문의 답은 x가 작으면 YES, 커지면 어느 순간 NO로 바뀌어.<br>이런 <strong>단조성</strong>이 있으면 <strong>이분 탐색(매개변수 탐색)</strong>으로 경계를 찾을 수 있어!<br>lo=1, hi=max(랜선)으로 범위를 잡고, mid로 잘랐을 때 개수 = sum(각 랜선 // mid).<br>N개 이상이면 더 긴 길이를 시도(lo=mid+1), 부족하면 줄여(hi=mid-1).<br>⚠️ <strong>lo=0이면 0으로 나누기 에러!</strong> 반드시 lo=1부터 시작해야 해.<br><br><div style="display:flex;gap:2px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.8rem;flex-wrap:wrap;"><span style="padding:2px 6px;background:var(--green);color:white;border-radius:3px;">YES</span><span style="padding:2px 6px;background:var(--green);color:white;border-radius:3px;">YES</span><span style="padding:2px 6px;background:var(--green);color:white;border-radius:3px;">YES</span><span style="padding:2px 6px;background:var(--yellow);color:#333;border-radius:3px;font-weight:700;border:2px solid var(--accent);">YES</span><span style="padding:2px 6px;background:var(--red);color:white;border-radius:3px;opacity:0.7;">NO</span><span style="padding:2px 6px;background:var(--red);color:white;border-radius:3px;opacity:0.7;">NO</span><span style="padding:2px 6px;background:var(--red);color:white;border-radius:3px;opacity:0.7;">NO</span><span style="color:var(--text3);margin-left:4px;">← 경계를 이분 탐색!</span></div>'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python: <code>sum(c // mid for c in cables)</code>로 한 줄에 개수를 셀 수 있어. 정수 나눗셈 <code>//</code>가 핵심!</span><span class="lang-cpp">C++: 랜선 길이가 2<sup>31</sup>-1까지이므로 <code>long long</code>을 써야 해. <code>for</code>문으로 <code>cables[i] / mid</code>를 누적하면 돼.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

K, N = map(int, input().split())
cables = [int(input()) for _ in range(K)]

lo, hi = 1, max(cables)
answer = 0

while lo <= hi:
    mid = (lo + hi) // 2
    count = sum(c // mid for c in cables)
    if count >= N:
        answer = mid
        lo = mid + 1
    else:
        hi = mid - 1

print(answer)`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;
int main() {
    int K, N; cin >> K >> N;
    ll cables[10001], maxLen = 0;
    for (int i = 0; i < K; i++) { cin >> cables[i]; maxLen = max(maxLen, cables[i]); }
    ll lo = 1, hi = maxLen, answer = 0;
    while (lo <= hi) {
        ll mid = (lo + hi) / 2, count = 0;
        for (int i = 0; i < K; i++) count += cables[i] / mid;
        if (count >= N) { answer = mid; lo = mid + 1; } else hi = mid - 1;
    }
    cout << answer << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '매개변수 탐색',
                    description: '길이 x로 잘랐을 때 N개 이상 가능한지 이분 탐색합니다.',
                    timeComplexity: 'O(K log max)',
                    spaceComplexity: 'O(K)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

K, N = map(int, input().split())
cables = [int(input()) for _ in range(K)]

lo, hi = 1, max(cables)
answer = 0

while lo <= hi:
    mid = (lo + hi) // 2
    count = sum(c // mid for c in cables)
    if count >= N:
        answer = mid
        lo = mid + 1
    else:
        hi = mid - 1

print(answer)`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;
int main() {
    int K, N; cin >> K >> N;
    ll cables[10001], maxLen = 0;
    for (int i = 0; i < K; i++) { cin >> cables[i]; maxLen = max(maxLen, cables[i]); }
    ll lo = 1, hi = maxLen, answer = 0;
    while (lo <= hi) {
        ll mid = (lo + hi) / 2, count = 0;
        for (int i = 0; i < K; i++) count += cables[i] / mid;
        if (count >= N) { answer = mid; lo = mid + 1; } else hi = mid - 1;
    }
    cout << answer << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `K개의 랜선 길이를 입력받습니다.
각 랜선을 잘라서 N개를 만들어야 합니다.`,
                                code: `import sys
input = sys.stdin.readline

K, N = map(int, input().split())
cables = [int(input()) for _ in range(K)]`
                            },
                            {
                                title: '이분 탐색 범위',
                                desc: `매개변수 탐색: "길이 x로 잘랐을 때 N개 이상 만들 수 있는가?"를 이분 탐색합니다.
lo=1(최소 길이), hi=max(cables)(가장 긴 랜선). lo=0이면 0으로 나누기 에러!`,
                                code: `lo, hi = 1, max(cables)
answer = 0`
                            },
                            {
                                title: '이분 탐색 + 판별',
                                desc: `각 랜선을 mid로 나눈 몫의 합이 N 이상이면 가능 → 더 긴 길이를 시도합니다.
불가능하면 더 짧은 길이로 줄입니다. 가능한 최대 길이를 answer에 저장합니다.`,
                                code: `while lo <= hi:
    mid = (lo + hi) // 2
    count = sum(c // mid for c in cables)
    if count >= N:
        answer = mid
        lo = mid + 1
    else:
        hi = mid - 1`
                            },
                            {
                                title: '출력',
                                desc: '조건을 만족하는 최대 랜선 길이를 출력합니다.',
                                code: 'print(answer)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `K개의 랜선 길이를 입력받습니다.
랜선 길이가 2^31-1까지이므로 long long을 사용합니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int main() {
    int K, N;
    cin >> K >> N;
    ll cables[10001];
    ll maxLen = 0;
    for (int i = 0; i < K; i++) {
        cin >> cables[i];
        maxLen = max(maxLen, cables[i]);
    }`
                            },
                            {
                                title: '이분 탐색 범위',
                                desc: `매개변수 탐색: "길이 x로 잘랐을 때 N개 이상 만들 수 있는가?"를 이분 탐색합니다.
lo=1, hi=최대 랜선 길이. 오버플로우 방지를 위해 long long 사용합니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int main() {
    int K, N;
    cin >> K >> N;
    ll cables[10001];
    ll maxLen = 0;
    for (int i = 0; i < K; i++) {
        cin >> cables[i];
        maxLen = max(maxLen, cables[i]);
    }

    ll lo = 1, hi = maxLen;
    ll answer = 0;`
                            },
                            {
                                title: '이분 탐색 + 판별',
                                desc: `각 랜선을 mid로 나눈 몫의 합이 N 이상이면 → 더 긴 길이 시도(lo = mid + 1).
불가능하면 → 더 짧게(hi = mid - 1). 가능할 때마다 answer를 갱신합니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int main() {
    int K, N;
    cin >> K >> N;
    ll cables[10001];
    ll maxLen = 0;
    for (int i = 0; i < K; i++) {
        cin >> cables[i];
        maxLen = max(maxLen, cables[i]);
    }

    ll lo = 1, hi = maxLen;
    ll answer = 0;

    while (lo <= hi) {
        ll mid = (lo + hi) / 2;
        ll count = 0;
        for (int i = 0; i < K; i++) count += cables[i] / mid;
        if (count >= N) {
            answer = mid;  // 가능! 더 긴 길이 시도
            lo = mid + 1;
        } else {
            hi = mid - 1;  // 불가능 → 더 짧게
        }
    }`
                            },
                            {
                                title: '출력',
                                desc: '조건을 만족하는 최대 랜선 길이를 출력합니다.',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int main() {
    int K, N;
    cin >> K >> N;
    ll cables[10001];
    ll maxLen = 0;
    for (int i = 0; i < K; i++) {
        cin >> cables[i];
        maxLen = max(maxLen, cables[i]);
    }

    ll lo = 1, hi = maxLen;
    ll answer = 0;

    while (lo <= hi) {
        ll mid = (lo + hi) / 2;
        ll count = 0;
        for (int i = 0; i < K; i++) count += cables[i] / mid;
        if (count >= N) {
            answer = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    cout << answer << endl;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2805',
            title: 'BOJ 2805 - 나무 자르기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2805',
            simIntro: '절단기 높이를 이분 탐색으로 결정하는 과정을 관찰하세요.',
            sim: {
                type: 'treeCut'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>상근이는 나무 M 미터가 필요하다. 절단기에 높이 H를 지정하면 한 줄에 연속해있는 나무를 모두 높이 H 위의 부분이 잘린다. H보다 작은 나무는 잘리지 않는다. 적어도 M 미터의 나무를 집에 가져가기 위해서 절단기에 설정할 수 있는 높이의 최댓값을 구하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 나무의 수 N과 상근이가 집으로 가져가려고 하는 나무의 길이 M이 주어진다. (1 ≤ N ≤ 1,000,000, 1 ≤ M ≤ 2,000,000,000)</p>
                <p>둘째 줄에는 나무의 높이가 주어진다. 나무의 높이의 합은 항상 M보다 크거나 같으므로, 상근이는 집에 필요한 나무를 항상 가져갈 수 있다. 높이는 1,000,000,000보다 작거나 같은 양의 정수 또는 0이다.</p>
                <h4>출력</h4>
                <p>적어도 M미터의 나무를 집에 가져가기 위해서 절단기에 설정할 수 있는 높이의 최댓값을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4 7
20 15 10 17</pre></div>
                    <div><strong>출력</strong><pre>15</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 20
4 42 40 26 46</pre></div>
                    <div><strong>출력</strong><pre>36</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 1,000,000</li>
                    <li>1 ≤ M ≤ 2,000,000,000</li>
                    <li>0 ≤ 나무 높이 ≤ 1,000,000,000</li>
                    <li>M은 항상 나무를 잘라서 얻을 수 있는 양</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '절단기 높이를 0부터 시작해서 1씩 올려가면서, 그 높이로 잘랐을 때 나무를 M미터 이상 얻을 수 있는지 확인하면 되지 않을까?<br>각 나무에서 <code>max(0, 나무높이 - H)</code>만큼 가져갈 수 있으니까, 전부 더하면 총 획득량이야.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '나무 높이가 최대 <strong>10억</strong>이야! 높이를 0부터 10억까지 1씩 올려가면 최악의 경우 <strong>10억 번</strong> × N개 나무 확인...<br>N도 최대 100만이라 연산 횟수가 어마어마해. 시간 초과 확정이야!<br><br><div style="display:flex;gap:12px;align-items:flex-end;padding:10px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);"><div style="text-align:center;"><div style="width:40px;height:100px;background:var(--red);border-radius:4px 4px 0 0;opacity:0.85;"></div><div style="font-size:0.72rem;color:var(--text2);margin-top:4px;">순차탐색<br>10억×N</div></div><div style="text-align:center;"><div style="width:40px;height:12px;background:var(--green);border-radius:4px 4px 0 0;"></div><div style="font-size:0.72rem;color:var(--text2);margin-top:4px;">이분탐색<br>30×N</div></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '랜선 자르기와 같은 패턴이야! "높이 H로 잘랐을 때 M미터 이상 얻을 수 있는가?"<br>H가 낮으면 많이 얻고(YES), H가 높으면 적게 얻어(NO) — <strong>단조성</strong>이 있지!<br>이분 탐색으로 lo=0, hi=max(나무)에서 시작. mid 높이로 잘랐을 때 합계 = sum(max(0, tree - mid)).<br>M 이상이면 더 높이 시도(lo=mid+1), 부족하면 낮춰(hi=mid-1).<br>⚠️ <span class="lang-py">Python은 정수 오버플로우가 없지만,</span><span class="lang-cpp">C++에서는 나무 합계가 <strong>int 범위를 넘을 수 있으므로 long long</strong>을 써야 해!</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
trees = list(map(int, input().split()))

lo, hi = 0, max(trees)
answer = 0

while lo <= hi:
    mid = (lo + hi) // 2
    gained = sum(max(0, t - mid) for t in trees)
    if gained >= M:
        answer = mid
        lo = mid + 1
    else:
        hi = mid - 1

print(answer)`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int N; ll M; cin >> N >> M;
    int trees[1000001]; int maxH = 0;
    for (int i = 0; i < N; i++) { cin >> trees[i]; maxH = max(maxH, trees[i]); }
    ll lo = 0, hi = maxH, answer = 0;
    while (lo <= hi) {
        ll mid = (lo + hi) / 2, gained = 0;
        for (int i = 0; i < N; i++) if (trees[i] > mid) gained += trees[i] - mid;
        if (gained >= M) { answer = mid; lo = mid + 1; } else hi = mid - 1;
    }
    cout << answer << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '매개변수 탐색',
                    description: '절단 높이 H에 대해 잘린 양이 M 이상인지 이분 탐색합니다.',
                    timeComplexity: 'O(N log max)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
trees = list(map(int, input().split()))

lo, hi = 0, max(trees)
answer = 0

while lo <= hi:
    mid = (lo + hi) // 2
    gained = sum(max(0, t - mid) for t in trees)
    if gained >= M:
        answer = mid
        lo = mid + 1
    else:
        hi = mid - 1

print(answer)`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int N; ll M; cin >> N >> M;
    int trees[1000001]; int maxH = 0;
    for (int i = 0; i < N; i++) { cin >> trees[i]; maxH = max(maxH, trees[i]); }
    ll lo = 0, hi = maxH, answer = 0;
    while (lo <= hi) {
        ll mid = (lo + hi) / 2, gained = 0;
        for (int i = 0; i < N; i++) if (trees[i] > mid) gained += trees[i] - mid;
        if (gained >= M) { answer = mid; lo = mid + 1; } else hi = mid - 1;
    }
    cout << answer << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: 'N개의 나무 높이와 필요한 나무 양 M을 입력받습니다.',
                                code: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())
trees = list(map(int, input().split()))`
                            },
                            {
                                title: '이분 탐색',
                                desc: `매개변수 탐색: "높이 H로 잘랐을 때 M미터 이상 얻을 수 있는가?".
가능하면 더 높은 H를 시도(lo=mid+1), 불가능하면 더 낮게(hi=mid-1).
높이를 최대화해야 하므로, 가능할 때마다 answer를 갱신합니다.`,
                                code: `lo, hi = 0, max(trees)
answer = 0

while lo <= hi:
    mid = (lo + hi) // 2
    gained = sum(max(0, t - mid) for t in trees)
    if gained >= M:
        answer = mid
        lo = mid + 1
    else:
        hi = mid - 1`
                            },
                            {
                                title: '출력',
                                desc: '조건을 만족하는 절단기 높이의 최댓값을 출력합니다.',
                                code: 'print(answer)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N개의 나무 높이와 필요한 나무 양 M을 입력받습니다.
나무 합이 int 범위를 넘을 수 있으므로 M은 long long으로 선언합니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    ll M;
    cin >> N >> M;
    int trees[1000001];
    int maxH = 0;
    for (int i = 0; i < N; i++) {
        cin >> trees[i];
        maxH = max(maxH, trees[i]);
    }`
                            },
                            {
                                title: '이분 탐색',
                                desc: `매개변수 탐색: "높이 mid로 잘랐을 때 M미터 이상 얻을 수 있는가?".
잘린 양(gained)이 int 범위를 넘을 수 있으므로 long long으로 누적합니다.
가능하면 더 높이 시도, 불가능하면 더 낮게 조정합니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    ll M;
    cin >> N >> M;
    int trees[1000001];
    int maxH = 0;
    for (int i = 0; i < N; i++) {
        cin >> trees[i];
        maxH = max(maxH, trees[i]);
    }

    ll lo = 0, hi = maxH;
    ll answer = 0;

    while (lo <= hi) {
        ll mid = (lo + hi) / 2;
        ll gained = 0;
        for (int i = 0; i < N; i++)
            if (trees[i] > mid) gained += trees[i] - mid;
        if (gained >= M) {
            answer = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }`
                            },
                            {
                                title: '출력',
                                desc: '조건을 만족하는 절단기 높이의 최댓값을 출력합니다.',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    ll M;
    cin >> N >> M;
    int trees[1000001];
    int maxH = 0;
    for (int i = 0; i < N; i++) {
        cin >> trees[i];
        maxH = max(maxH, trees[i]);
    }

    ll lo = 0, hi = maxH;
    ll answer = 0;

    while (lo <= hi) {
        ll mid = (lo + hi) / 2;
        ll gained = 0;
        for (int i = 0; i < N; i++)
            if (trees[i] > mid) gained += trees[i] - mid;
        if (gained >= M) {
            answer = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    cout << answer << endl;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2110',
            title: 'BOJ 2110 - 공유기 설치',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/2110',
            simIntro: '최소 거리 d를 이분 탐색하여 공유기를 배치하는 과정을 관찰하세요.',
            sim: {
                type: 'router'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>도현이의 집 N개가 수직선 위에 있다. 집의 좌표가 주어졌을 때, C개의 공유기를 설치하려고 한다. 가장 인접한 두 공유기 사이의 거리를 가능한 한 크게 하여 설치하려고 할 때, 가장 인접한 두 공유기 사이의 최대 거리를 출력하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 집의 개수 N (2 ≤ N ≤ 200,000)과 공유기의 개수 C (2 ≤ C ≤ N)이 하나 이상의 빈 칸을 사이에 두고 주어진다. 둘째 줄부터 N개의 줄에는 집의 좌표를 나타내는 x<sub>i</sub> (0 ≤ x<sub>i</sub> ≤ 1,000,000,000)가 한 줄에 하나씩 주어진다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 가장 인접한 두 공유기 사이의 최대 거리를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 3
1
2
8
4
9</pre></div>
                    <div><strong>출력</strong><pre>3</pre></div>
                </div><p class="example-explain">1, 4, 8에 설치하면 가장 인접한 거리는 3.</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>2 ≤ N ≤ 200,000</li>
                    <li>2 ≤ C ≤ N</li>
                    <li>0 ≤ 좌표 ≤ 1,000,000,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'N개 집 중에서 C개를 골라서 공유기를 설치하는 <strong>모든 조합</strong>을 시도해볼까?<br>각 조합마다 가장 인접한 두 공유기 거리를 구하고, 그 중 최대를 찾으면 되잖아!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 <strong>200,000</strong>이야. N개 중 C개를 고르는 조합 수는... 상상을 초월해!<br>예를 들어 200,000개 중 100,000개를 고르는 경우의 수? <strong>절대 불가능</strong>한 수준이야.<br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;"><span style="color:var(--red);font-weight:600;">조합:</span> <span style="color:var(--text2);">C(200000, 100000) = ∞ 수준</span></div><div style="display:flex;gap:8px;align-items:center;margin-top:4px;flex-wrap:wrap;"><span style="color:var(--green);font-weight:600;">매개변수 탐색:</span> <span style="color:var(--text);">O(N log D) ≈ 수백만</span></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '발상을 전환하자! 조합을 시도하는 대신, <strong>"최소 거리가 d 이상이 되도록 C개를 설치할 수 있는가?"</strong>를 물어보는 거야.<br>판별법은 간단해: 집을 정렬하고, 첫 집에 설치한 뒤 d 이상 떨어진 다음 집에 <strong>그리디하게</strong> 설치를 반복해.<br>설치 수 &ge; C면 가능! 가능하면 더 넓은 거리를 시도(lo=mid+1), 불가능하면 줄여(hi=mid-1).<br>범위: lo=1, hi=가장 먼 두 집 사이 거리.'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '핵심은 정렬 후 그리디 판별 함수를 만드는 거야:<br><span class="lang-py">Python: 정렬 후 <code>for</code>문으로 순회하면서 <code>houses[i] - last &gt;= mid</code>이면 설치하고 <code>last</code>를 갱신해.</span><span class="lang-cpp">C++: 동일한 로직인데, 좌표가 최대 10억이므로 거리 계산 시 <code>long long</code>을 사용하면 안전해.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, C = map(int, input().split())
houses = sorted([int(input()) for _ in range(N)])

lo, hi = 1, houses[-1] - houses[0]
answer = 0

while lo <= hi:
    mid = (lo + hi) // 2
    count = 1
    last = houses[0]
    for i in range(1, N):
        if houses[i] - last >= mid:
            count += 1
            last = houses[i]
    if count >= C:
        answer = mid
        lo = mid + 1
    else:
        hi = mid - 1

print(answer)`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;
int N, C, houses[200001];
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    cin >> N >> C;
    for (int i = 0; i < N; i++) cin >> houses[i];
    sort(houses, houses + N);
    long long lo = 1, hi = houses[N-1] - houses[0], answer = 0;
    while (lo <= hi) {
        long long mid = (lo + hi) / 2;
        int count = 1, last = houses[0];
        for (int i = 1; i < N; i++) { if (houses[i] - last >= mid) { count++; last = houses[i]; } }
        if (count >= C) { answer = mid; lo = mid + 1; } else hi = mid - 1;
    }
    cout << answer << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '매개변수 탐색 (거리)',
                    description: '최소 거리 d 이상으로 C개를 설치할 수 있는지 이분 탐색합니다.',
                    timeComplexity: 'O(N log(max-min))',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, C = map(int, input().split())
houses = sorted([int(input()) for _ in range(N)])

lo, hi = 1, houses[-1] - houses[0]
answer = 0

while lo <= hi:
    mid = (lo + hi) // 2
    count = 1
    last = houses[0]
    for i in range(1, N):
        if houses[i] - last >= mid:
            count += 1
            last = houses[i]
    if count >= C:
        answer = mid
        lo = mid + 1
    else:
        hi = mid - 1

print(answer)`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;
int N, C, houses[200001];
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    cin >> N >> C;
    for (int i = 0; i < N; i++) cin >> houses[i];
    sort(houses, houses + N);
    long long lo = 1, hi = houses[N-1] - houses[0], answer = 0;
    while (lo <= hi) {
        long long mid = (lo + hi) / 2;
        int count = 1, last = houses[0];
        for (int i = 1; i < N; i++) { if (houses[i] - last >= mid) { count++; last = houses[i]; } }
        if (count >= C) { answer = mid; lo = mid + 1; } else hi = mid - 1;
    }
    cout << answer << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 정렬',
                                desc: `집 좌표를 정렬합니다.
정렬해야 왼쪽부터 그리디하게 공유기를 배치할 수 있습니다.`,
                                code: `import sys
input = sys.stdin.readline

N, C = map(int, input().split())
houses = sorted([int(input()) for _ in range(N)])`
                            },
                            {
                                title: '이분 탐색 범위',
                                desc: `매개변수 탐색: "최소 거리 d 이상으로 C개를 설치할 수 있는가?".
lo=1(최소 거리), hi=가장 먼 두 집 사이 거리.`,
                                code: `lo, hi = 1, houses[-1] - houses[0]
answer = 0`
                            },
                            {
                                title: '탐색 + 그리디 판별',
                                desc: `그리디로 판별: 첫 집에 설치 후, d 이상 떨어진 다음 집에 설치를 반복합니다.
설치 수 >= C이면 가능 → 더 넓은 거리 시도, 아니면 더 좁게 줄입니다.`,
                                code: `while lo <= hi:
    mid = (lo + hi) // 2
    count = 1
    last = houses[0]
    for i in range(1, N):
        if houses[i] - last >= mid:
            count += 1
            last = houses[i]
    if count >= C:
        answer = mid
        lo = mid + 1
    else:
        hi = mid - 1`
                            },
                            {
                                title: '출력',
                                desc: '가장 인접한 두 공유기 사이의 최대 거리를 출력합니다.',
                                code: 'print(answer)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 정렬',
                                desc: `집 좌표를 정렬합니다.
정렬해야 왼쪽부터 그리디하게 공유기를 배치할 수 있습니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
int houses[200001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N, C;
    cin >> N >> C;
    for (int i = 0; i < N; i++) cin >> houses[i];
    sort(houses, houses + N);`
                            },
                            {
                                title: '이분 탐색 범위',
                                desc: `매개변수 탐색: "최소 거리 mid 이상으로 C개를 설치할 수 있는가?".
lo=1, hi=가장 먼 두 집 사이 거리. long long으로 오버플로우를 방지합니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
int houses[200001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N, C;
    cin >> N >> C;
    for (int i = 0; i < N; i++) cin >> houses[i];
    sort(houses, houses + N);

    long long lo = 1, hi = houses[N-1] - houses[0];
    long long answer = 0;`
                            },
                            {
                                title: '탐색 + 그리디 판별',
                                desc: `그리디로 판별: 첫 집에 설치 후, mid 이상 떨어진 다음 집에 설치를 반복합니다.
설치 수 >= C이면 가능 → 더 넓은 거리 시도, 아니면 더 좁게 줄입니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
int houses[200001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N, C;
    cin >> N >> C;
    for (int i = 0; i < N; i++) cin >> houses[i];
    sort(houses, houses + N);

    long long lo = 1, hi = houses[N-1] - houses[0];
    long long answer = 0;

    while (lo <= hi) {
        long long mid = (lo + hi) / 2;
        int count = 1, last = houses[0];
        for (int i = 1; i < N; i++) {
            if (houses[i] - last >= mid) {
                count++;
                last = houses[i];
            }
        }
        if (count >= C) {
            answer = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }`
                            },
                            {
                                title: '출력',
                                desc: '가장 인접한 두 공유기 사이의 최대 거리를 출력합니다.',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
int houses[200001];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N, C;
    cin >> N >> C;
    for (int i = 0; i < N; i++) cin >> houses[i];
    sort(houses, houses + N);

    long long lo = 1, hi = houses[N-1] - houses[0];
    long long answer = 0;

    while (lo <= hi) {
        long long mid = (lo + hi) / 2;
        int count = 1, last = houses[0];
        for (int i = 1; i < N; i++) {
            if (houses[i] - last >= mid) {
                count++;
                last = houses[i];
            }
        }
        if (count >= C) {
            answer = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    cout << answer << endl;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1300',
            title: 'BOJ 1300 - K번째 수',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/1300',
            simIntro: 'N×N 곱셈표에서 x 이하인 수의 개수를 이분 탐색으로 구하는 과정을 관찰하세요.',
            sim: {
                type: 'kth'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>세준이는 크기가 N×N인 배열 A를 만들었다. 배열에 들어있는 수 A[i][j] = i × j 이다. 이 수를 일차원 배열 B에 넣으면 B의 크기는 N×N이 된다. B를 오름차순 정렬했을 때, B[k]를 구해보자. 배열 A와 B의 인덱스는 1부터 시작한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 배열의 크기 N이 주어진다. N은 10<sup>5</sup>보다 작거나 같은 자연수이다. 둘째 줄에 k가 주어진다. k는 min(10<sup>9</sup>, N<sup>2</sup>)보다 작거나 같은 자연수이다.</p>
                <h4>출력</h4>
                <p>B[k]를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3
7</pre></div>
                    <div><strong>출력</strong><pre>6</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 10<sup>5</sup></li>
                    <li>1 ≤ k ≤ min(10<sup>9</sup>, N<sup>2</sup>)</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'N×N 곱셈표의 모든 값을 배열에 넣고 <strong>정렬</strong>한 다음, k번째를 꺼내면 되지 않을까?<br>A[i][j] = i × j이니까, 이중 반복문으로 N² 개를 전부 만들어서 정렬하면 끝!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 <strong>10<sup>5</sup></strong>이야. N² = <strong>10<sup>10</sup></strong>(100억) 개의 수를 배열에 담으면?<br>메모리도 수십 GB 필요하고, 정렬은 더 오래 걸려. <strong>메모리 초과 + 시간 초과</strong> 모두야!<br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.82rem;"><table style="border-collapse:collapse;width:100%;"><tr><td style="padding:4px 8px;color:var(--text2);">방법</td><td style="padding:4px 8px;color:var(--text2);">시간</td><td style="padding:4px 8px;color:var(--text2);">메모리</td></tr><tr><td style="padding:4px 8px;color:var(--red);font-weight:600;">전부 정렬</td><td style="padding:4px 8px;">O(N² log N²)</td><td style="padding:4px 8px;">수십 GB</td></tr><tr><td style="padding:4px 8px;color:var(--green);font-weight:600;">이분 탐색</td><td style="padding:4px 8px;">O(N log k)</td><td style="padding:4px 8px;">O(1)</td></tr></table></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '모든 값을 만들 필요 없이, <strong>"x 이하인 수가 몇 개인가?"</strong>만 빠르게 셀 수 있으면 돼!<br>i행에서 i×j &le; x인 j의 개수 = min(x &divide; i, N). 이걸 i = 1부터 N까지 더하면 O(N)에 "x 이하 개수"를 알 수 있어.<br>그러면 <strong>"x 이하인 수가 k개 이상인 최소 x"</strong>를 이분 탐색으로 찾으면 그게 답이야!<br>범위: lo=1, hi=k (k번째 수는 항상 k 이하). <code>count &ge; k</code>이면 hi=mid, 아니면 lo=mid+1 (lower_bound 형태).'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python: <code>count = sum(min(mid // i, N) for i in range(1, N+1))</code> 한 줄이면 x 이하 개수를 셀 수 있어!</span><span class="lang-cpp">C++: <code>for (ll i = 1; i &lt;= N; i++) count += min(mid / i, N);</code>로 동일하게 구현. N, k가 크므로 <code>long long</code>을 사용해야 해.</span>'
                }
            ],
            templates: {
                python: `N = int(input())
k = int(input())

lo, hi = 1, k

while lo < hi:
    mid = (lo + hi) // 2
    count = 0
    for i in range(1, N + 1):
        count += min(mid // i, N)
    if count >= k:
        hi = mid
    else:
        lo = mid + 1

print(lo)`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;
int main() {
    ll N, k; cin >> N >> k;
    ll lo = 1, hi = k;
    while (lo < hi) {
        ll mid = (lo + hi) / 2, count = 0;
        for (ll i = 1; i <= N; i++) count += min(mid / i, N);
        if (count >= k) hi = mid; else lo = mid + 1;
    }
    cout << lo << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '결정 문제 + 이분 탐색',
                    description: 'x 이하인 수의 개수를 O(N)에 세고, 그 값이 k 이상인 최소 x를 이분 탐색합니다.',
                    timeComplexity: 'O(N log k)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `N = int(input())
k = int(input())

lo, hi = 1, k

while lo < hi:
    mid = (lo + hi) // 2
    count = 0
    for i in range(1, N + 1):
        count += min(mid // i, N)
    if count >= k:
        hi = mid
    else:
        lo = mid + 1

print(lo)`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;
int main() {
    ll N, k; cin >> N >> k;
    ll lo = 1, hi = k;
    while (lo < hi) {
        ll mid = (lo + hi) / 2, count = 0;
        for (ll i = 1; i <= N; i++) count += min(mid / i, N);
        if (count >= k) hi = mid; else lo = mid + 1;
    }
    cout << lo << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `N×N 곱셈표에서 k번째로 작은 수를 찾아야 합니다.
N²개를 정렬하면 메모리 초과 → 이분 탐색으로 접근합니다.`,
                                code: `N = int(input())
k = int(input())`
                            },
                            {
                                title: '이분 탐색 (lower_bound)',
                                desc: `"x 이하인 수가 k개 이상인 최소 x"를 찾는 lower_bound 형태입니다.
i행에서 i×j ≤ x인 j의 개수 = min(x//i, N)으로 O(N)에 셀 수 있습니다.
hi=k인 이유: k번째 수는 항상 k 이하입니다.`,
                                code: `lo, hi = 1, k

while lo < hi:
    mid = (lo + hi) // 2
    count = 0
    for i in range(1, N + 1):
        count += min(mid // i, N)
    if count >= k:
        hi = mid
    else:
        lo = mid + 1`
                            },
                            {
                                title: '출력',
                                desc: 'lo == hi가 되면 그 값이 k번째 수입니다.',
                                code: 'print(lo)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N×N 곱셈표에서 k번째로 작은 수를 찾아야 합니다.
N이 최대 10^5이므로 N²개를 정렬하면 메모리 초과 → 이분 탐색으로 접근합니다.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int main() {
    ll N, k;
    cin >> N >> k;`
                            },
                            {
                                title: '이분 탐색 (lower_bound)',
                                desc: `"x 이하인 수가 k개 이상인 최소 x"를 찾는 lower_bound 형태입니다.
i행에서 i×j <= x인 j의 개수 = min(mid/i, N)으로 O(N)에 셀 수 있습니다.
count >= k이면 hi = mid, 아니면 lo = mid + 1.`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int main() {
    ll N, k;
    cin >> N >> k;

    ll lo = 1, hi = k;

    while (lo < hi) {
        ll mid = (lo + hi) / 2;
        ll count = 0;
        for (ll i = 1; i <= N; i++)
            count += min(mid / i, N);  // i행에서 mid 이하인 수
        if (count >= k)
            hi = mid;
        else
            lo = mid + 1;
    }`
                            },
                            {
                                title: '출력',
                                desc: 'lo == hi가 되면 그 값이 k번째 수입니다.',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

int main() {
    ll N, k;
    cin >> N >> k;

    ll lo = 1, hi = k;

    while (lo < hi) {
        ll mid = (lo + hi) / 2;
        ll count = 0;
        for (ll i = 1; i <= N; i++)
            count += min(mid / i, N);
        if (count >= k)
            hi = mid;
        else
            lo = mid + 1;
    }

    cout << lo << endl;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-12015',
            title: 'BOJ 12015 - 가장 긴 증가하는 부분 수열 2',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/12015',
            simIntro: 'tails 배열에 이분 탐색으로 원소를 삽입하는 LIS 알고리즘을 관찰하세요.',
            sim: {
                type: 'lIS'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오. 예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {<strong>10</strong>, <strong>20</strong>, 10, <strong>30</strong>, 20, <strong>50</strong>} 이고, 길이는 4이다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000,000)이 주어진다. 둘째 줄에는 수열 A를 이루고 있는 A<sub>i</sub>가 주어진다. (1 ≤ A<sub>i</sub> ≤ 1,000,000)</p>
                <h4>출력</h4>
                <p>첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>6
10 20 10 30 20 50</pre></div>
                    <div><strong>출력</strong><pre>4</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 1,000,000</li>
                    <li>1 ≤ A<sub>i</sub> ≤ 1,000,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '<strong>DP</strong>로 풀 수 있어! dp[i] = "i번째 원소를 마지막으로 하는 LIS 길이"로 정의하고,<br>각 원소마다 앞에 있는 모든 원소를 확인해서 <code>A[j] &lt; A[i]</code>인 경우 <code>dp[i] = max(dp[i], dp[j] + 1)</code>로 갱신하면 돼.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 <strong>1,000,000</strong>(100만)이야! DP의 이중 반복문은 O(N²) = <strong>1조 번</strong> 연산...<br>이건 몇 분이 걸려도 끝나지 않아. 더 빠른 방법이 필요해!<br><br><div style="display:flex;gap:12px;align-items:flex-end;padding:10px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);"><div style="text-align:center;"><div style="width:40px;height:100px;background:var(--red);border-radius:4px 4px 0 0;opacity:0.85;"></div><div style="font-size:0.72rem;color:var(--text2);margin-top:4px;">DP O(N²)<br>1조</div></div><div style="text-align:center;"><div style="width:40px;height:8px;background:var(--green);border-radius:4px 4px 0 0;"></div><div style="font-size:0.72rem;color:var(--text2);margin-top:4px;">tails+BS<br>2천만</div></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>tails</code>라는 배열을 유지하는 거야. tails[i] = "길이 i+1인 증가 부분 수열의 마지막 원소 <strong>최솟값</strong>".<br>새 원소 x를 볼 때:<br>- tails 끝보다 크면? LIS가 늘어나니까 <strong>뒤에 추가</strong>!<br>- 아니면? tails에서 x가 들어갈 위치를 <strong>이분 탐색</strong>으로 찾아서 <strong>교체</strong>해.<br>교체하면 당장 LIS가 바뀌진 않지만, 나중에 더 긴 LIS를 만들 가능성이 높아져!<br>tails는 항상 정렬 상태이므로 이분 탐색이 가능하고, 전체 <strong>O(N log N)</strong>이야.'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python: <code>bisect_left(tails, x)</code>로 교체할 위치를 O(log N)에 찾아. pos == len(tails)이면 <code>append</code>, 아니면 <code>tails[pos] = x</code>로 교체!</span><span class="lang-cpp">C++: <code>lower_bound(tails.begin(), tails.end(), x)</code>가 Python의 bisect_left와 동일한 역할이야. 끝이면 <code>push_back</code>, 아니면 <code>*it = x</code>로 교체!</span>'
                }
            ],
            templates: {
                python: `import sys
from bisect import bisect_left
input = sys.stdin.readline

N = int(input())
A = list(map(int, input().split()))

tails = []

for x in A:
    pos = bisect_left(tails, x)
    if pos == len(tails):
        tails.append(x)
    else:
        tails[pos] = x

print(len(tails))`,
                cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int N; cin >> N;
    vector<int> tails;
    for (int i = 0; i < N; i++) {
        int x; cin >> x;
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: 'tails 배열 + bisect_left',
                    description: 'tails 배열을 유지하며 이분 탐색으로 O(N log N)에 LIS 길이를 구합니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
from bisect import bisect_left
input = sys.stdin.readline

N = int(input())
A = list(map(int, input().split()))

tails = []

for x in A:
    pos = bisect_left(tails, x)
    if pos == len(tails):
        tails.append(x)
    else:
        tails[pos] = x

print(len(tails))`,
                        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int N; cin >> N;
    vector<int> tails;
    for (int i = 0; i < N; i++) {
        int x; cin >> x;
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `N이 최대 100만이므로 O(N^2) DP는 시간 초과입니다.
이분 탐색 기반 O(N log N) 알고리즘을 사용합니다.`,
                                code: `import sys
from bisect import bisect_left
input = sys.stdin.readline

N = int(input())
A = list(map(int, input().split()))`
                            },
                            {
                                title: 'tails 배열 초기화',
                                desc: `tails[i] = "길이 i+1인 증가 부분 수열의 마지막 원소 최솟값".
tails를 항상 정렬 상태로 유지해서 이분 탐색이 가능하게 합니다.`,
                                code: 'tails = []'
                            },
                            {
                                title: 'LIS 구축',
                                desc: `새 원소 x가 tails 끝보다 크면 LIS 길이 증가(append).
아니면 bisect_left로 교체할 위치를 찾아 더 작은 값으로 대체합니다.
교체하면 이후에 더 긴 LIS를 만들 가능성이 높아집니다.`,
                                code: `for x in A:
    pos = bisect_left(tails, x)
    if pos == len(tails):
        tails.append(x)    # LIS 길이 증가
    else:
        tails[pos] = x     # 더 작은 값으로 교체`
                            },
                            {
                                title: '출력',
                                desc: `tails 배열의 길이가 곧 LIS의 길이입니다.
(tails의 실제 내용은 LIS 자체가 아닐 수 있지만, 길이는 정확합니다.)`,
                                code: 'print(len(tails))'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `N이 최대 100만이므로 O(N^2) DP는 시간 초과입니다.
이분 탐색 기반 O(N log N) 알고리즘을 사용합니다.`,
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    cin >> N;
    vector<int> A(N);
    for (int i = 0; i < N; i++) cin >> A[i];`
                            },
                            {
                                title: 'tails 배열 초기화',
                                desc: `tails[i] = "길이 i+1인 증가 부분 수열의 마지막 원소 최솟값".
vector로 선언하여 동적으로 크기를 늘려갑니다.`,
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    cin >> N;
    vector<int> A(N);
    for (int i = 0; i < N; i++) cin >> A[i];

    vector<int> tails;  // tails[i] = 길이 i+1인 LIS의 마지막 최솟값`
                            },
                            {
                                title: 'LIS 구축',
                                desc: `lower_bound(= Python의 bisect_left)로 x가 들어갈 위치를 찾습니다.
tails 끝을 넘으면 push_back(LIS 연장), 아니면 해당 위치 값을 교체합니다.
교체하면 이후에 더 긴 LIS를 만들 가능성이 높아집니다.`,
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    cin >> N;
    vector<int> A(N);
    for (int i = 0; i < N; i++) cin >> A[i];

    vector<int> tails;

    for (int x : A) {
        // lower_bound: x 이상인 첫 위치 (= Python의 bisect_left)
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end())
            tails.push_back(x);   // LIS 길이 증가
        else
            *it = x;              // 더 작은 값으로 교체
    }`
                            },
                            {
                                title: '출력',
                                desc: `tails 배열의 크기가 곧 LIS의 길이입니다.
tails의 실제 내용은 LIS 자체가 아닐 수 있지만, 길이는 정확합니다.`,
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    cin >> N;
    vector<int> A(N);
    for (int i = 0; i < N; i++) cin >> A[i];

    vector<int> tails;

    for (int x : A) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end())
            tails.push_back(x);
        else
            *it = x;
    }

    cout << tails.size() << endl;
}`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
