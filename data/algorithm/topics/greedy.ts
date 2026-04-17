import type { AlgoTopic } from '../types'

export const greedyTopic: AlgoTopic = {
    id: 'greedy',
    title: '그리디',
    icon: '🏆',
    category: '문제 해결 기법 (Silver~Gold)',
    order: 13,
    description: '지금 당장 가장 좋은 선택을 반복하는 기법',
    titleEn: 'Greedy',
    categoryEn: 'Problem Solving (Silver~Gold)',
    descriptionEn: 'A technique that repeatedly makes the locally optimal choice',
    track: 'both',
    stages: [
        {
            num: 1,
            title: '기본 그리디',
            titleEn: 'Basic Greedy',
            problemIds: [
                'boj-11047',
                'boj-11399'
            ],
            desc: '간단한 탐욕 선택 (Silver IV)',
            descEn: 'Simple greedy selection (Silver IV)'
        },
        {
            num: 2,
            title: '정렬 + 그리디',
            titleEn: 'Sort + Greedy',
            problemIds: [
                'boj-1931',
                'boj-1541'
            ],
            desc: '정렬이 핵심인 그리디 (Silver I~II)',
            descEn: 'Greedy where sorting is key (Silver I~II)'
        },
        {
            num: 3,
            title: '응용 그리디',
            titleEn: 'Applied Greedy',
            problemIds: [
                'boj-13305'
            ],
            desc: '조건이 복잡한 그리디 (Silver III)',
            descEn: 'Greedy with complex conditions (Silver III)'
        }
    ],
    problems: [
        {
            id: 'boj-11047',
            title: 'BOJ 11047 - 동전 0',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/11047',
            simIntro: '큰 동전부터 차례로 사용하는 그리디 과정을 관찰하세요.',
            sim: {
                type: 'coin'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>준규가 가지고 있는 동전은 총 N종류이고, 각각의 동전을 매우 많이 가지고 있다. 동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다. 이때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 1 ≤ K ≤ 100,000,000)</p>
                <p>둘째 줄부터 N개의 줄에 동전의 가치 A<sub>i</sub>가 오름차순으로 주어진다. (1 ≤ A<sub>i</sub> ≤ 1,000,000, A<sub>1</sub> = 1, i ≥ 2인 경우에 A<sub>i</sub>는 A<sub>i-1</sub>의 배수)</p>
                <h4>출력</h4>
                <p>첫째 줄에 K원을 만드는데 필요한 동전 개수의 최솟값을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>10 4200
1
5
10
50
100
500
1000
5000
10000
50000</pre></div>
                    <div><strong>출력</strong><pre>6</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>10 4790
1
5
10
50
100
500
1000
5000
10000
50000</pre></div>
                    <div><strong>출력</strong><pre>12</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 10</li>
                    <li>1 ≤ K ≤ 100,000,000</li>
                    <li>A<sub>1</sub> = 1</li>
                    <li>A<sub>i</sub>는 A<sub>i-1</sub>의 배수</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '동전 N종류가 있고 금액 K를 만들어야 해. 일단 <strong>가장 작은 동전(1원)부터</strong> 하나씩 채워볼까?<br>1원짜리 K개 쓰면 무조건 만들 수 있긴 해. 근데 동전 수가 너무 많아지겠지...'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'K가 최대 1억이야. 1원짜리로 1억 개? 말이 안 돼!<br>동전 수를 <strong>최소</strong>로 하려면, 큰 동전을 최대한 많이 써야 하지 않을까?<br>예를 들어 4200원을 만들 때, 1000원짜리 4개 쓰면 벌써 4000원이잖아.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>가장 큰 동전부터</strong> 최대한 많이 쓰고, 나머지는 그다음 동전으로 처리하자!<br><br><div style="padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="font-weight:600;margin-bottom:6px;text-align:center;">예: 4200원 만들기</div><div style="display:flex;gap:4px;align-items:center;justify-content:center;flex-wrap:wrap;"><span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;font-weight:600;">1000×4</span><span style="color:var(--text3);">→ 남은 200 →</span><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">100×2</span><span style="color:var(--text3);">→ 남은 0</span></div><div style="text-align:center;margin-top:6px;font-weight:600;color:var(--green);">총 6개!</div></div>이 문제는 동전이 <strong>배수 관계</strong>(A<sub>i</sub>는 A<sub>i-1</sub>의 배수)라서 이 전략이 항상 최적이야. 작은 동전 여러 개 = 큰 동전 하나로 항상 바꿀 수 있거든.'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '큰 동전부터 역순으로 반복하면서:<br><span class="lang-py"><code>count += K // coin</code> → 몫 = 사용 개수<br><code>K %= coin</code> → 나머지 = 남은 금액</span><span class="lang-cpp"><code>count += K / coins[i]</code> → 몫 = 사용 개수<br><code>K %= coins[i]</code> → 나머지 = 남은 금액</span><br>딱 N번 반복이면 끝! O(N)으로 아주 빠르지.'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, K = map(int, input().split())
coins = [int(input()) for _ in range(N)]

count = 0
for coin in reversed(coins):    # 큰 동전부터
    count += K // coin
    K %= coin

print(count)`,
                cpp: `#include <iostream>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;

    int coins[10];
    for (int i = 0; i < N; i++) cin >> coins[i];

    int count = 0;
    for (int i = N - 1; i >= 0; i--) {
        count += K / coins[i];
        K %= coins[i];
    }
    cout << count << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '큰 동전부터 그리디',
                    description: '가장 큰 동전부터 최대한 사용하여 동전 수를 최소화합니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, K = map(int, input().split())
coins = [int(input()) for _ in range(N)]

count = 0
for coin in reversed(coins):    # 큰 동전부터
    count += K // coin
    K %= coin

print(count)`,
                        cpp: `#include <iostream>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;

    int coins[10];
    for (int i = 0; i < N; i++) cin >> coins[i];

    int count = 0;
    for (int i = N - 1; i >= 0; i--) {
        count += K / coins[i];
        K %= coins[i];
    }
    cout << count << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: 'N종류 동전과 목표 금액 K를 입력받습니다.',
                                code: `import sys
input = sys.stdin.readline

N, K = map(int, input().split())
coins = [int(input()) for _ in range(N)]`
                            },
                            {
                                title: '큰 동전부터 그리디',
                                desc: `큰 동전부터 최대한 사용해야 동전 수가 최소가 됩니다.
배수 관계이므로 그리디가 항상 최적입니다.`,
                                code: `count = 0
for coin in reversed(coins):    # 큰 동전부터
    count += K // coin
    K %= coin`
                            },
                            {
                                title: '출력',
                                desc: '최소 동전 개수를 출력합니다.',
                                code: 'print(count)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: 'N종류 동전과 목표 금액 K를 입력받습니다.',
                                code: `#include <iostream>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;
    int coins[10];
    for (int i = 0; i < N; i++) cin >> coins[i];`
                            },
                            {
                                title: '큰 동전부터 그리디',
                                desc: `큰 동전부터 역순 순회.
// 나눈 몫 = 사용 개수, 나머지 = 남은 금액.`,
                                code: `    int count = 0;
    for (int i = N - 1; i >= 0; i--) {
        count += K / coins[i];  // 몫 = 사용 개수
        K %= coins[i];          // 나머지 = 남은 금액
    }`
                            },
                            {
                                title: '출력',
                                desc: '최소 동전 개수를 출력합니다.',
                                code: `    cout << count << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-11399',
            title: 'BOJ 11399 - ATM',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/11399',
            simIntro: '짧은 시간 순서로 정렬하여 총 대기시간을 최소화하는 과정을 관찰하세요.',
            sim: {
                type: 'aTM'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>인하은행에는 ATM이 1대밖에 없다. 지금 N명이 줄을 서 있다. 각 사람이 돈을 인출하는데 걸리는 시간 Pi가 주어졌을 때, 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 구하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 사람의 수 N(1 ≤ N ≤ 1,000)이 주어진다. 둘째 줄에는 각 사람이 돈을 인출하는데 걸리는 시간 P<sub>i</sub>가 주어진다. (1 ≤ P<sub>i</sub> ≤ 1,000)</p>
                <h4>출력</h4>
                <p>첫째 줄에 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5
3 1 4 3 2</pre></div>
                    <div><strong>출력</strong><pre>32</pre></div>
                </div><p>순서를 1, 2, 3, 3, 4로 바꾸면 1 + 3 + 6 + 9 + 13 = 32</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 1,000</li>
                    <li>1 ≤ P<sub>i</sub> ≤ 1,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'N명이 ATM 앞에 줄 서 있어. 모든 가능한 줄 세우기 순서를 시도해서 총 대기시간이 최소인 걸 찾으면 되지 않을까?<br>순서를 전부 바꿔보면... N! (팩토리얼) 가지야.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 1,000이면 1000!은 우주가 끝나도 못 세는 수야...<br>잠깐, 생각해 보자. 앞 사람이 오래 걸리면 <strong>뒤의 모든 사람이 기다려야</strong> 해.<br><br><div style="display:flex;flex-direction:column;gap:6px;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.85rem;"><div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;"><span style="font-weight:600;color:var(--red);min-width:60px;">[3, 1]</span><span style="color:var(--text3);">→ 3 + (3+1) =</span><span style="font-weight:700;color:var(--red);">7분</span></div><div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;"><span style="font-weight:600;color:var(--green);min-width:60px;">[1, 3]</span><span style="color:var(--text3);">→ 1 + (1+3) =</span><span style="font-weight:700;color:var(--green);">5분</span></div></div><strong>짧은 사람이 앞에 오니까 더 좋아!</strong>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>짧은 시간 순서로 정렬</strong>하면 끝이야! 이유를 정리하면:<br>앞 사람의 시간은 뒤의 <em>모든</em> 사람 대기시간에 더해져. 그러니 짧은 시간을 앞에 둬야 뒤 사람들의 대기가 줄어들지.<br>정렬 후 각 사람의 실제 대기시간 = 앞 사람들의 시간 <strong>누적합</strong>이고, 이 누적합들을 전부 더하면 답이야.'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py"><code>P.sort()</code>로 정렬하고, <code>acc += p</code>로 누적합을 구하면서 <code>total += acc</code>로 더해가면 끝!</span><span class="lang-cpp"><code>sort(P, P + N)</code>으로 정렬하고, <code>acc += P[i]</code>로 누적합, <code>total += acc</code>로 합산!</span><br>정렬 O(N log N) + 순회 O(N) = 전체 O(N log N). 깔끔!'
                }
            ],
            templates: {
                python: `N = int(input())
P = list(map(int, input().split()))

P.sort()    # 짧은 시간부터

total = 0
acc = 0
for p in P:
    acc += p        # 누적 대기시간
    total += acc    # 각 사람의 대기시간 더하기

print(total)`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    int P[1000];
    for (int i = 0; i < N; i++) cin >> P[i];

    sort(P, P + N);

    int total = 0, acc = 0;
    for (int i = 0; i < N; i++) {
        acc += P[i];
        total += acc;
    }
    cout << total << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '정렬 + 누적합',
                    description: '오름차순 정렬 후 누적 대기시간의 합을 구합니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `N = int(input())
P = list(map(int, input().split()))

P.sort()    # 짧은 시간부터

total = 0
acc = 0
for p in P:
    acc += p        # 누적 대기시간
    total += acc    # 각 사람의 대기시간 더하기

print(total)`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    int P[1000];
    for (int i = 0; i < N; i++) cin >> P[i];

    sort(P, P + N);

    int total = 0, acc = 0;
    for (int i = 0; i < N; i++) {
        acc += P[i];
        total += acc;
    }
    cout << total << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: '사람 수 N과 각 인출 시간을 입력받습니다.',
                                code: `N = int(input())
P = list(map(int, input().split()))`
                            },
                            {
                                title: '정렬',
                                desc: '짧은 시간부터 정렬해야 뒤 사람들의 대기시간이 줄어듭니다.',
                                code: 'P.sort()    # 짧은 시간부터'
                            },
                            {
                                title: '누적합 계산',
                                desc: `각 사람의 실제 대기시간 = 앞 사람들의 시간 누적합입니다.
누적합들의 총합이 전체 대기시간입니다.`,
                                code: `total = 0
acc = 0
for p in P:
    acc += p        # 누적 대기시간
    total += acc    # 각 사람의 대기시간 더하기`
                            },
                            {
                                title: '출력',
                                desc: '최소 총 대기시간을 출력합니다.',
                                code: 'print(total)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: '사람 수 N과 각 인출 시간을 입력받습니다.',
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    int P[1000];
    for (int i = 0; i < N; i++) cin >> P[i];`
                            },
                            {
                                title: '정렬',
                                desc: '오름차순 정렬로 짧은 시간을 앞에 배치합니다.',
                                code: '    sort(P, P + N);  // 짧은 시간부터'
                            },
                            {
                                title: '누적합 계산',
                                desc: `각 사람의 실제 대기시간 = 앞 사람들의 시간 누적합입니다.
누적합들의 총합이 전체 대기시간입니다.`,
                                code: `    int total = 0, acc = 0;
    for (int i = 0; i < N; i++) {
        acc += P[i];    // 누적 대기시간
        total += acc;   // 각 사람의 대기시간 더하기
    }`
                            },
                            {
                                title: '출력',
                                desc: '최소 총 대기시간을 출력합니다.',
                                code: `    cout << total << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1931',
            title: 'BOJ 1931 - 회의실 배정',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1931',
            simIntro: '끝나는 시간 기준으로 정렬하고 선택하는 활동 선택 과정을 관찰하세요.',
            sim: {
                type: 'meeting'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 I에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의가 겹치지 않게 하면서 회의실을 사용할 수 있는 회의의 최대 개수를 찾아보자. 회의가 끝나는 것과 동시에 다음 회의가 시작될 수 있다. 시작시간과 끝나는 시간이 같을 수 있다(이 경우 시작하자마자 끝난 것으로 간주).</p>
                <h4>입력</h4>
                <p>첫째 줄에 회의의 수 N(1 ≤ N ≤ 100,000)이 주어진다. 둘째 줄부터 N개의 줄에 각 회의의 시작시간과 끝나는 시간이 주어진다. 시작 시간과 끝나는 시간은 2<sup>31</sup>-1보다 작거나 같은 자연수 또는 0이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 최대 사용할 수 있는 회의의 최대 개수를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>11
1 4
3 5
0 6
5 7
3 8
5 9
6 10
8 11
8 12
2 13
12 14</pre></div>
                    <div><strong>출력</strong><pre>4</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 100,000</li>
                    <li>0 ≤ 시작시간 ≤ 끝나는 시간 ≤ 2<sup>31</sup> - 1</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'N개의 회의 중 겹치지 않는 조합을 전부 만들어서, 그중 가장 많이 들어가는 걸 찾으면 되지 않을까?<br>부분집합을 모두 확인하면... 2<sup>N</sup> 가지. N이 최대 100,000이니까 이건 절대 불가능!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '그렇다면 회의를 어떤 기준으로 정렬해서 하나씩 골라보면 어떨까?<br><br><div style="display:flex;flex-direction:column;gap:6px;padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div><span style="font-weight:600;color:var(--red);">시작 시간 기준?</span> → 일찍 시작하지만 긴 회의 <span style="display:inline-block;width:100px;height:10px;background:var(--red);border-radius:3px;vertical-align:middle;opacity:0.7;"></span> 를 선택하면 나머지를 못 넣어!</div><div><span style="font-weight:600;color:var(--red);">회의 길이 기준?</span> → 짧은 회의 <span style="display:inline-block;width:20px;height:10px;background:var(--red);border-radius:3px;vertical-align:middle;opacity:0.7;"></span> 가 여러 회의와 겹칠 수 있어!</div><div><span style="font-weight:600;color:var(--green);">끝나는 시간 기준!</span> → 일찍 끝나면 남은 시간 확보 <span style="display:inline-block;width:30px;height:10px;background:var(--green);border-radius:3px;vertical-align:middle;"></span> <span style="display:inline-block;width:30px;height:10px;background:var(--green);border-radius:3px;vertical-align:middle;"></span> <span style="display:inline-block;width:30px;height:10px;background:var(--green);border-radius:3px;vertical-align:middle;"></span></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>끝나는 시간</strong> 기준으로 정렬하자! 일찍 끝나는 회의를 먼저 선택하면 <strong>남은 시간이 최대한 확보</strong>되니까, 더 많은 회의를 넣을 수 있어.<br>이전 회의가 끝난 뒤에 시작하는 회의만 골라가면 돼: <code>if start &gt;= last_end → 선택!</code><br>끝나는 시간이 같으면? 시작 시간이 빠른 걸 먼저 (시작=끝 인 0초짜리 회의도 놓치지 않게!).'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py"><code>(끝, 시작)</code> 튜플로 저장하면 <code>sort()</code> 한 번으로 끝나는 시간 기준 정렬 완료!</span><span class="lang-cpp"><code>pair&lt;int,int&gt;</code>의 <code>{끝, 시작}</code> 형태로 저장하면 <code>sort()</code>가 first 기준으로 자동 정렬해줘!</span><br>정렬 O(N log N) + 순회 O(N) = 전체 O(N log N).'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N = int(input())
meetings = []
for _ in range(N):
    s, e = map(int, input().split())
    meetings.append((e, s))     # (끝, 시작) 으로 저장

meetings.sort()     # 끝나는 시간 기준 정렬

count = 0
last_end = 0
for end, start in meetings:
    if start >= last_end:
        count += 1
        last_end = end

print(count)`,
                cpp: `#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;
    vector<pair<int,int>> meetings(N);
    for (int i = 0; i < N; i++) {
        int s, e;
        cin >> s >> e;
        meetings[i] = {e, s};  // {끝, 시작}
    }
    sort(meetings.begin(), meetings.end());

    int count = 0, lastEnd = 0;
    for (auto& [end, start] : meetings) {
        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }
    cout << count << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '끝나는 시간 기준 정렬 + 그리디',
                    description: '끝나는 시간 기준으로 정렬하고 겹치지 않는 회의를 선택합니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N = int(input())
meetings = []
for _ in range(N):
    s, e = map(int, input().split())
    meetings.append((e, s))     # (끝, 시작) 으로 저장

meetings.sort()     # 끝나는 시간 기준 정렬

count = 0
last_end = 0
for end, start in meetings:
    if start >= last_end:
        count += 1
        last_end = end

print(count)`,
                        cpp: `#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;
    vector<pair<int,int>> meetings(N);
    for (int i = 0; i < N; i++) {
        int s, e;
        cin >> s >> e;
        meetings[i] = {e, s};  // {끝, 시작}
    }
    sort(meetings.begin(), meetings.end());

    int count = 0, lastEnd = 0;
    for (auto& [end, start] : meetings) {
        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }
    cout << count << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: '(끝, 시작) 순서로 저장하면 sort()만으로 끝나는 시간 기준 정렬이 됩니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
meetings = []
for _ in range(N):
    s, e = map(int, input().split())
    meetings.append((e, s))`
                            },
                            {
                                title: '끝나는 시간 기준 정렬',
                                desc: '일찍 끝나는 회의부터 선택해야 남은 시간이 최대로 확보됩니다.',
                                code: 'meetings.sort()     # 끝나는 시간 기준 정렬'
                            },
                            {
                                title: '그리디 선택',
                                desc: `이전 회의 종료 이후에 시작하는 회의만 선택합니다.
겹치는 회의는 건너뛰어 최대 개수를 확보합니다.`,
                                code: `count = 0
last_end = 0
for end, start in meetings:
    if start >= last_end:
        count += 1
        last_end = end`
                            },
                            {
                                title: '출력',
                                desc: '겹치지 않게 선택한 최대 회의 수를 출력합니다.',
                                code: 'print(count)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `pair<int,int>의 {끝, 시작} 형태로 저장.
sort하면 끝나는 시간 기준 자동 정렬!`,
                                code: `#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<pair<int,int>> meetings(N);
    for (int i = 0; i < N; i++) {
        int s, e; cin >> s >> e;
        meetings[i] = {e, s};  // {끝, 시작}
    }`
                            },
                            {
                                title: '끝나는 시간 기준 정렬',
                                desc: 'pair는 first 기준 자동 정렬되므로 끝나는 시간 기준으로 정렬됩니다.',
                                code: '    sort(meetings.begin(), meetings.end());'
                            },
                            {
                                title: '그리디 선택',
                                desc: 'auto& [end, start]로 구조적 바인딩.',
                                code: `    int count = 0, lastEnd = 0;
    for (auto& [end, start] : meetings) {
        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }`
                            },
                            {
                                title: '출력',
                                desc: '겹치지 않게 선택한 최대 회의 수를 출력합니다.',
                                code: `    cout << count << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1541',
            title: 'BOJ 1541 - 잃어버린 괄호',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1541',
            simIntro: '수식에서 "-" 뒤에 괄호를 넣어 값을 최소화하는 과정을 관찰하세요.',
            sim: {
                type: 'bracket'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>세준이는 양수와 +, -로 이루어진 식이 있다. 여기에 괄호를 적절히 쳐서 이 식의 값을 최소로 만들려고 한다. 괄호를 적절히 쳐서 이 식의 값을 최소로 만드는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 식이 주어진다. 식은 '0'~'9', '+', 그리고 '-'만으로 이루어져 있고, 가장 처음과 마지막 문자는 숫자이다. 그리고 연속해서 두 개 이상의 연산자가 나타나지 않고, 5자리보다 많이 연속되는 숫자는 없다. 수는 0으로 시작할 수 있다. 입력으로 주어지는 식의 길이는 50보다 작거나 같다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 정답을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>55-50+40</pre></div>
                    <div><strong>출력</strong><pre>-35</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>10+20+30+40</pre></div>
                    <div><strong>출력</strong><pre>100</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>00009-00009</pre></div>
                    <div><strong>출력</strong><pre>0</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>수식은 '0'~'9', '+', '-'만 포함</li>
                    <li>수식 길이 ≤ 50</li>
                    <li>수의 크기 ≤ 5자리</li>
                    <li>수는 0으로 시작 가능</li>
                    <li>수식은 숫자로 시작하고 숫자로 끝남</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '괄호를 어디에 넣을 수 있는지 모든 경우를 시도해 볼까? 수식에 연산자가 여러 개 있으면 괄호 위치 조합이 꽤 많아질 텐데...<br>그냥 수식을 왼쪽부터 순서대로 계산하면 어떨까?'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '그냥 순서대로 계산하면 최솟값이 아닐 수도 있어!<br>예: <code>55-50+40</code> → 순서대로 하면 55-50+40 = 45인데, 괄호를 쳐서 <code>55-(50+40)</code> = 55-90 = <strong>-35</strong>가 더 작아!<br>핵심은 이거야: <strong>빼기 뒤에 있는 수들을 최대한 많이 빼면</strong> 값이 작아져.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '첫 번째 <code>-</code>가 등장하면, 그 뒤에 나오는 <code>+</code>를 전부 괄호로 묶어버리자!<br><br><div style="padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.85rem;text-align:center;"><div style="margin-bottom:6px;"><code>55 - 50 + 40</code> → <code>55 - <span style="padding:2px 6px;border-radius:4px;background:var(--green);color:white;">(50 + 40)</span></code></div><div style="display:flex;gap:8px;justify-content:center;align-items:center;"><span style="padding:3px 8px;border-radius:6px;background:var(--accent);color:white;font-weight:600;">55</span><span style="font-weight:700;">−</span><span style="padding:3px 8px;border-radius:6px;background:var(--red);color:white;font-weight:600;">90</span><span style="font-weight:700;">=</span><span style="padding:3px 8px;border-radius:6px;background:var(--green);color:white;font-weight:600;">−35</span></div></div><strong>구현</strong>: 식을 <code>-</code> 기준으로 나누고, 각 그룹 안의 <code>+</code>로 연결된 수를 합산해. 첫 그룹만 더하고 나머지 그룹은 전부 빼면 최솟값!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py"><code>expr.split(\'-\')</code>로 <code>-</code> 기준 분리 → 각 그룹을 <code>split(\'+\')</code>로 나눠서 <code>sum(map(int, ...))</code>으로 합산!</span><span class="lang-cpp"><code>getline(stream, segment, \'-\')</code>로 <code>-</code> 기준 분리 → 다시 <code>getline(gs, num, \'+\')</code>로 <code>+</code> 기준 분리해서 <code>stoi()</code>로 변환!</span><br>전체 O(N), 수식 길이만큼만 한 번 훑으면 끝이야.'
                }
            ],
            templates: {
                python: `expr = input()

# '-' 기준으로 나누기
groups = expr.split('-')

# 각 그룹 안의 수들을 더하기
sums = []
for group in groups:
    sums.append(sum(map(int, group.split('+'))))

# 첫 그룹은 더하고, 나머지는 빼기
result = sums[0]
for i in range(1, len(sums)):
    result -= sums[i]

print(result)`,
                cpp: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string expr;
    cin >> expr;

    int result = 0;
    bool isFirst = true;

    stringstream full(expr);
    string segment;
    while (getline(full, segment, '-')) {
        int groupSum = 0;
        stringstream gs(segment);
        string num;
        while (getline(gs, num, '+')) {
            groupSum += stoi(num);
        }
        if (isFirst) {
            result += groupSum;
            isFirst = false;
        } else {
            result -= groupSum;
        }
    }

    cout << result << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '"- 뒤 전부 빼기" 그리디',
                    description: '"-" 기준으로 그룹을 나누고, 첫 그룹만 더하고 나머지는 전부 뺍니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `expr = input()

# '-' 기준으로 나누기
groups = expr.split('-')

# 각 그룹 안의 수들을 더하기
sums = []
for group in groups:
    sums.append(sum(map(int, group.split('+'))))

# 첫 그룹은 더하고, 나머지는 빼기
result = sums[0]
for i in range(1, len(sums)):
    result -= sums[i]

print(result)`,
                        cpp: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string expr;
    cin >> expr;

    int result = 0;
    bool isFirst = true;

    stringstream full(expr);
    string segment;
    while (getline(full, segment, '-')) {
        int groupSum = 0;
        stringstream gs(segment);
        string num;
        while (getline(gs, num, '+')) {
            groupSum += stoi(num);
        }
        if (isFirst) {
            result += groupSum;
            isFirst = false;
        } else {
            result -= groupSum;
        }
    }

    cout << result << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: '양수와 +, -로 이루어진 수식을 입력받습니다.',
                                code: 'expr = input()'
                            },
                            {
                                title: '"-" 기준 분리',
                                desc: `"-" 뒤의 "+"를 괄호로 묶으면 전부 빼기가 되므로,
"-" 기준으로 그룹을 나눕니다.`,
                                code: 'groups = expr.split(\'-\')'
                            },
                            {
                                title: '각 그룹 합산',
                                desc: `각 그룹 안의 "+"로 연결된 수들을 합산합니다.
map(int, ...) + sum으로 간결하게 처리합니다.`,
                                code: `sums = []
for group in groups:
    sums.append(sum(map(int, group.split('+'))))`
                            },
                            {
                                title: '첫 그룹 더하고 나머지 빼기',
                                desc: `첫 그룹만 더하고 나머지 그룹은 전부 빼면 최솟값입니다.
"-" 뒤를 최대한 많이 빼는 것이 핵심입니다.`,
                                code: `result = sums[0]
for i in range(1, len(sums)):
    result -= sums[i]

print(result)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: 'stringstream을 사용하기 위해 <sstream>을 포함합니다.',
                                code: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string expr;
    cin >> expr;`
                            },
                            {
                                title: '"-" 기준 분리',
                                desc: `getline(stream, var, delimiter)로 문자열 분리.
stringstream으로 문자열을 스트림처럼 사용.`,
                                code: `    int result = 0;
    bool isFirst = true;
    stringstream full(expr);
    string segment;`
                            },
                            {
                                title: '각 그룹 합산',
                                desc: `"-" 구분 후 다시 "+" 기준으로 분리하여 합산합니다.
stoi()로 문자열을 정수로 변환합니다.`,
                                code: `    while (getline(full, segment, '-')) {
        int groupSum = 0;
        stringstream gs(segment);
        string num;
        while (getline(gs, num, '+'))
            groupSum += stoi(num);`
                            },
                            {
                                title: '첫 그룹 더하고 나머지 빼기',
                                desc: '첫 그룹만 더하고 나머지는 전부 빼서 최솟값을 구합니다.',
                                code: `        if (isFirst) { result += groupSum; isFirst = false; }
        else result -= groupSum;
    }
    cout << result << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-13305',
            title: 'BOJ 13305 - 주유소',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/13305',
            simIntro: '도시별 기름값을 비교하며 최소 비용으로 이동하는 과정을 관찰하세요.',
            sim: {
                type: 'gas'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>일직선 도로 위에 N개의 도시가 있다. 제일 왼쪽 도시에서 제일 오른쪽 도시로 가려 한다. 각 도시에는 주유소가 있고, 1리터당 가격이 다르다. 도시 사이의 거리와 각 도시의 주유 가격이 주어질 때, 제일 왼쪽에서 오른쪽 끝까지 가는데 드는 최소 비용을 구하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 도시의 개수 N(2 ≤ N ≤ 100,000)이 주어진다. 둘째 줄에는 인접한 두 도시를 연결하는 도로의 길이가 제일 왼쪽 도로부터 N-1개 주어진다. 셋째 줄에는 주유소의 리터당 가격이 제일 왼쪽 도시부터 N개 주어진다. (1 ≤ 도로의 길이, 리터당 가격 ≤ 1,000,000,000)</p>
                <h4>출력</h4>
                <p>첫째 줄에 제일 왼쪽 도시에서 제일 오른쪽 도시로 가는 최소 비용을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4
2 3 1
5 2 4 1</pre></div>
                    <div><strong>출력</strong><pre>18</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4
3 3 4
1 1 1 1</pre></div>
                    <div><strong>출력</strong><pre>10</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>2 ≤ N ≤ 100,000</li>
                    <li>1 ≤ 거리 ≤ 10<sup>9</sup></li>
                    <li>1 ≤ 리터당 가격 ≤ 10<sup>9</sup></li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '각 도시에서 "다음에 더 싼 주유소가 나올 때까지만" 딱 필요한 만큼 기름을 넣으면 되지 않을까?<br>매 도시마다 앞으로의 주유소 가격을 전부 살펴봐야 하니까... O(N<sup>2</sup>)이겠네.'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N이 최대 100,000이면 O(N<sup>2</sup>)은 100억 번 연산... 시간 초과!<br>그리고 미래의 모든 주유소를 보는 건 복잡해. 더 간단한 방법이 없을까?<br>잠깐, 핵심을 다시 생각해보자: 어떤 구간을 이동할 때, <strong>지금까지 지나온 주유소 중 가장 싼 곳</strong>에서 미리 넣어두면 되잖아!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '왼쪽에서 오른쪽으로 한 번만 훑으면서, <strong>지금까지 본 최소 가격</strong>을 기억하자!<br><br><div style="padding:10px;background:var(--bg2);border-radius:10px;margin:8px 0;font-size:0.8rem;"><div style="display:flex;gap:4px;align-items:end;justify-content:center;flex-wrap:wrap;margin-bottom:6px;"><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--text3);">5원</div><div style="width:30px;height:25px;background:var(--accent);border-radius:4px;"></div></div><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--text3);">2원</div><div style="width:30px;height:10px;background:var(--green);border-radius:4px;"></div></div><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--text3);">4원</div><div style="width:30px;height:20px;background:var(--green);border-radius:4px;"></div></div><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--text3);">1원</div><div style="width:30px;height:5px;background:var(--green);border-radius:4px;"></div></div></div><div style="text-align:center;font-size:0.75rem;color:var(--text3);">최소 가격: <span style="color:var(--accent);">5</span> → <span style="color:var(--green);">2</span> → <span style="color:var(--green);">2</span> → <span style="color:var(--green);">1</span> (더 싼 곳을 만나면 갱신!)</div></div>각 구간 비용 = <code>최소 가격 × 도로 길이</code>로 계산하면 끝. 한 번 순회로 O(N)에 해결!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py"><code>min_price = min(min_price, price[i])</code>로 최소 가격 갱신, <code>total += min_price * dist[i]</code>로 비용 누적. Python은 큰 수를 자동 처리해서 편해!</span><span class="lang-cpp"><code>minPrice = min(minPrice, price[i])</code>로 갱신, <code>total += minPrice * dist[i]</code>로 누적. 값이 10<sup>9</sup> x 10<sup>5</sup>까지 갈 수 있으니 <strong>long long</strong> 필수!</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N = int(input())
dist = list(map(int, input().split()))
price = list(map(int, input().split()))

min_price = price[0]
total = 0

for i in range(N - 1):
    min_price = min(min_price, price[i])
    total += min_price * dist[i]

print(total)`,
                cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;

    long long dist[100000], price[100000];
    for (int i = 0; i < N - 1; i++) cin >> dist[i];
    for (int i = 0; i < N; i++) cin >> price[i];

    long long minPrice = price[0];
    long long total = 0;

    for (int i = 0; i < N - 1; i++) {
        minPrice = min(minPrice, price[i]);
        total += minPrice * dist[i];
    }

    cout << total << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '최소 가격 추적 그리디',
                    description: '지금까지 본 최소 기름값을 유지하며 각 구간 비용을 계산합니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N = int(input())
dist = list(map(int, input().split()))
price = list(map(int, input().split()))

min_price = price[0]
total = 0

for i in range(N - 1):
    min_price = min(min_price, price[i])
    total += min_price * dist[i]

print(total)`,
                        cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;

    long long dist[100000], price[100000];
    for (int i = 0; i < N - 1; i++) cin >> dist[i];
    for (int i = 0; i < N; i++) cin >> price[i];

    long long minPrice = price[0];
    long long total = 0;

    for (int i = 0; i < N - 1; i++) {
        minPrice = min(minPrice, price[i]);
        total += minPrice * dist[i];
    }

    cout << total << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: '도시 수, 도시 간 거리, 각 도시의 기름값을 입력받습니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
dist = list(map(int, input().split()))
price = list(map(int, input().split()))`
                            },
                            {
                                title: '초기 최소 가격',
                                desc: '첫 도시의 기름값을 초기 최소 가격으로 설정합니다.',
                                code: `min_price = price[0]
total = 0`
                            },
                            {
                                title: '그리디 순회',
                                desc: `지금까지 본 최소 기름값으로 각 구간을 이동합니다.
더 싼 주유소를 만나면 즉시 최소 가격을 갱신합니다.`,
                                code: `for i in range(N - 1):
    min_price = min(min_price, price[i])
    total += min_price * dist[i]`
                            },
                            {
                                title: '출력',
                                desc: '최소 이동 비용을 출력합니다.',
                                code: 'print(total)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `long long으로 큰 수 처리.
값이 10^9 × 10^5까지 가능!`,
                                code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    long long dist[100000], price[100000];
    for (int i = 0; i < N-1; i++) cin >> dist[i];
    for (int i = 0; i < N; i++) cin >> price[i];`
                            },
                            {
                                title: '초기 최소 가격',
                                desc: '첫 도시의 기름값을 초기 최소 가격으로 설정합니다.',
                                code: `    long long minPrice = price[0];
    long long total = 0;`
                            },
                            {
                                title: '그리디 순회',
                                desc: `지금까지 본 최소 기름값으로 각 구간을 이동합니다.
더 싼 주유소를 만나면 즉시 최소 가격을 갱신합니다.`,
                                code: `    for (int i = 0; i < N-1; i++) {
        minPrice = min(minPrice, price[i]);
        total += minPrice * dist[i];
    }`
                            },
                            {
                                title: '출력',
                                desc: '최소 이동 비용을 출력합니다.',
                                code: `    cout << total << endl;
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
