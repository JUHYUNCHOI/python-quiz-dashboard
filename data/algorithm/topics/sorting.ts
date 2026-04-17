import type { AlgoTopic } from '../types'

export const sortingTopic: AlgoTopic = {
    id: 'sorting',
    title: '정렬',
    icon: '🔢',
    category: '탐색 (Silver)',
    order: 7,
    description: '버블/선택/삽입 정렬부터 병합/퀵 정렬까지, 정렬의 모든 것',
    titleEn: 'Sorting',
    categoryEn: 'Search (Silver)',
    descriptionEn: 'Everything about sorting, from bubble/selection/insertion to merge/quick sort',
    track: 'both',
    stages: [
        {
            num: 1,
            title: '커트라인',
            titleEn: 'Cutline',
            problemIds: [
                'boj-25305'
            ],
            desc: '정렬 후 인덱싱',
            descEn: 'Indexing after sorting'
        },
        {
            num: 2,
            title: '기본 정렬',
            titleEn: 'Basic Sorting',
            problemIds: [
                'boj-2750',
                'boj-11650',
                'boj-10814'
            ],
            desc: '정렬 구현과 커스텀 정렬 (Bronze~Silver)',
            descEn: 'Sorting implementation and custom comparators (Bronze~Silver)'
        },
        {
            num: 3,
            title: '정렬 응용',
            titleEn: 'Applied Sorting',
            problemIds: [
                'lc-56'
            ],
            desc: '정렬 기반 문제 풀이 (Medium)',
            descEn: 'Problem solving based on sorting (Medium)'
        }
    ],
    problems: [
        {
            id: 'boj-25305',
            title: 'BOJ 25305 - 커트라인',
            difficulty: 'bronze',
            link: 'https://www.acmicpc.net/problem/25305',
            simIntro: '점수를 내림차순으로 정렬한 뒤, k번째 점수를 찾아 커트라인을 구하는 과정을 관찰하세요.',
            sim: {
                type: 'cutline'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>2022 연세대학교 미래캠퍼스 슬기로운 코딩생활에 N명의 학생들이 응시했다.</p>
                <p>이들 중 점수가 가장 높은 k명은 상을 받을 것이다. 이 때, 상을 받는 커트라인이 몇 점인지 구하라.</p>
                <p>커트라인이란 상을 받는 사람들 중 가장 낮은 점수를 말한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에는 응시자의 수 N과 상을 받는 사람의 수 k가 공백을 사이에 두고 주어진다.</p>
                <p>둘째 줄에는 각 학생의 점수 x가 공백을 사이에 두고 주어진다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 2
100 76 85 93 98</pre></div>
                    <div><strong>출력</strong><pre>98</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; k &le; N &le; 1,000</li>
                    <li>1 &le; x &le; 10,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '가장 먼저 떠오르는 방법',
                    content: '상위 k명을 찾아야 하니까, 일단 점수를 큰 순서대로 나열하면 되지 않을까요?<br><strong>내림차순 정렬</strong>하면 가장 높은 점수가 맨 앞에 오겠죠!<div style="display:flex;gap:6px;justify-content:center;margin-top:12px;flex-wrap:wrap;"><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;font-size:0.9rem;">100</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;font-size:0.9rem;">76</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;font-size:0.9rem;">85</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;font-size:0.9rem;">93</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;font-size:0.9rem;">98</div></div><div style="text-align:center;margin:8px 0;font-size:1.2rem;">↓ 내림차순 정렬</div><div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;"><div style="padding:6px 14px;border-radius:8px;background:var(--green);color:white;font-weight:700;font-size:0.9rem;">100</div><div style="padding:6px 14px;border-radius:8px;background:var(--green);color:white;font-weight:700;font-size:0.9rem;">98</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;font-size:0.9rem;">93</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;font-size:0.9rem;">85</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;font-size:0.9rem;">76</div></div>'
                },
                {
                    title: '정렬 후 어디를 보면 될까?',
                    content: '내림차순으로 정렬하면 앞에서 k번째가 상을 받는 사람 중 가장 낮은 점수, 즉 <strong>커트라인</strong>이에요.<br>배열 인덱스는 0부터 시작하니까 <code>arr[k-1]</code>이 답입니다!<div style="display:flex;gap:6px;justify-content:center;margin-top:12px;align-items:flex-end;flex-wrap:wrap;"><div style="display:flex;flex-direction:column;align-items:center;"><div style="font-size:0.65rem;color:var(--text3);">[0]</div><div style="padding:6px 14px;border-radius:8px;background:var(--green);color:white;font-weight:700;">100</div></div><div style="display:flex;flex-direction:column;align-items:center;"><div style="font-size:0.65rem;color:var(--yellow);font-weight:700;">[k-1] ← 커트라인!</div><div style="padding:6px 14px;border-radius:8px;border:2px solid var(--yellow);box-shadow:0 0 8px var(--yellow);font-weight:700;">98</div></div><div style="display:flex;flex-direction:column;align-items:center;"><div style="font-size:0.65rem;color:var(--text3);">[2]</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">93</div></div><div style="display:flex;flex-direction:column;align-items:center;"><div style="font-size:0.65rem;color:var(--text3);">[3]</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">85</div></div><div style="display:flex;flex-direction:column;align-items:center;"><div style="font-size:0.65rem;color:var(--text3);">[4]</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">76</div></div></div>'
                },
                {
                    title: '오름차순으로도 가능!',
                    content: '오름차순 정렬을 했다면? 뒤에서 k번째를 보면 돼요!<br><span class="lang-py"><code>arr[N-k]</code> 또는 <code>arr[-k]</code> (Python 음수 인덱스)</span><span class="lang-cpp"><code>arr[N-k]</code>를 출력하면 됩니다</span><div style="display:flex;gap:6px;justify-content:center;margin-top:12px;align-items:flex-end;flex-wrap:wrap;"><div style="display:flex;flex-direction:column;align-items:center;"><div style="font-size:0.65rem;color:var(--text3);">[0]</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">76</div></div><div style="display:flex;flex-direction:column;align-items:center;"><div style="font-size:0.65rem;color:var(--text3);">[1]</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">85</div></div><div style="display:flex;flex-direction:column;align-items:center;"><div style="font-size:0.65rem;color:var(--text3);">[2]</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">93</div></div><div style="display:flex;flex-direction:column;align-items:center;"><div style="font-size:0.65rem;color:var(--yellow);font-weight:700;"><span class="lang-py">[-k]</span><span class="lang-cpp">[N-k]</span> ← 커트라인!</div><div style="padding:6px 14px;border-radius:8px;border:2px solid var(--yellow);box-shadow:0 0 8px var(--yellow);font-weight:700;">98</div></div><div style="display:flex;flex-direction:column;align-items:center;"><div style="font-size:0.65rem;color:var(--text3);">[4]</div><div style="padding:6px 14px;border-radius:8px;background:var(--green);color:white;font-weight:700;">100</div></div></div>'
                },
                {
                    title: '시간 복잡도',
                    content: 'N ≤ 1,000이므로 어떤 정렬을 써도 충분해요. 내장 sort는 O(N log N)이라 넉넉합니다.<div style="margin-top:10px;overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:0.85rem;"><tr style="background:var(--bg2);"><th style="padding:6px 10px;text-align:left;border:1px solid var(--bg3);">방법</th><th style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">시간</th><th style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">N=1000</th></tr><tr><td style="padding:6px 10px;border:1px solid var(--bg3);">O(n²) 정렬</td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">O(n²)</td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">1,000,000 ✅</td></tr><tr><td style="padding:6px 10px;border:1px solid var(--bg3);"><span class="lang-py">sort()</span><span class="lang-cpp">sort()</span></td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">O(n log n)</td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);color:var(--green);font-weight:700;">~10,000 ✅✅</td></tr></table></div>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N, k = map(int, input().split())
scores = list(map(int, input().split()))
scores.sort(reverse=True)  # 내림차순 정렬
print(scores[k - 1])  # k번째가 커트라인`,
                cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, k;
    cin >> N >> k;
    vector<int> scores(N);
    for (int i = 0; i < N; i++) cin >> scores[i];
    sort(scores.begin(), scores.end(), greater<int>());  // 내림차순
    cout << scores[k - 1] << endl;  // k번째가 커트라인
}`
            },
            solutions: [
                {
                    approach: '내림차순 정렬 + 인덱싱',
                    description: '점수를 내림차순 정렬하면 앞에서 k번째가 커트라인입니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, k = map(int, input().split())
scores = list(map(int, input().split()))
scores.sort(reverse=True)  # 내림차순 정렬
print(scores[k - 1])  # k번째가 커트라인`,
                        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, k;
    cin >> N >> k;
    vector<int> scores(N);
    for (int i = 0; i < N; i++) cin >> scores[i];
    sort(scores.begin(), scores.end(), greater<int>());  // 내림차순
    cout << scores[k - 1] << endl;  // k번째가 커트라인
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 받기',
                                desc: 'N, k와 점수 배열을 입력받습니다.',
                                code: `import sys
input = sys.stdin.readline

N, k = map(int, input().split())
scores = list(map(int, input().split()))`
                            },
                            {
                                title: '내림차순 정렬',
                                desc: 'reverse=True로 큰 점수가 앞에 오도록 정렬합니다. 상위 k명을 쉽게 찾기 위해!',
                                code: `import sys
input = sys.stdin.readline

N, k = map(int, input().split())
scores = list(map(int, input().split()))
scores.sort(reverse=True)  # 큰 점수가 앞으로!`
                            },
                            {
                                title: '커트라인 출력',
                                desc: '0-indexed이므로 arr[k-1]이 k번째로 높은 점수 = 커트라인입니다.',
                                code: `import sys
input = sys.stdin.readline

N, k = map(int, input().split())
scores = list(map(int, input().split()))
scores.sort(reverse=True)
print(scores[k - 1])  # k번째 = 커트라인`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 받기',
                                desc: 'N, k와 점수 배열을 입력받습니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, k;
    cin >> N >> k;
    vector<int> scores(N);
    for (int i = 0; i < N; i++) cin >> scores[i];`
                            },
                            {
                                title: '내림차순 정렬',
                                desc: 'greater<int>()로 큰 점수가 앞에 오도록 정렬합니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, k;
    cin >> N >> k;
    vector<int> scores(N);
    for (int i = 0; i < N; i++) cin >> scores[i];
    sort(scores.begin(), scores.end(), greater<int>());  // 내림차순`
                            },
                            {
                                title: '커트라인 출력',
                                desc: '0-indexed이므로 scores[k-1]이 k번째로 높은 점수 = 커트라인입니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, k;
    cin >> N >> k;
    vector<int> scores(N);
    for (int i = 0; i < N; i++) cin >> scores[i];
    sort(scores.begin(), scores.end(), greater<int>());
    cout << scores[k - 1] << endl;  // k번째 = 커트라인
}`
                            }
                        ]
                    }
                },
                {
                    approach: '오름차순 정렬 + 뒤에서 k번째',
                    description: '오름차순 정렬 후 뒤에서 k번째 원소를 출력합니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N, k = map(int, input().split())
scores = list(map(int, input().split()))
scores.sort()  # 오름차순 정렬
print(scores[-k])  # 뒤에서 k번째 = 커트라인`,
                        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, k;
    cin >> N >> k;
    vector<int> scores(N);
    for (int i = 0; i < N; i++) cin >> scores[i];
    sort(scores.begin(), scores.end());  // 오름차순
    cout << scores[N - k] << endl;  // 뒤에서 k번째 = 커트라인
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 받기',
                                desc: 'N, k와 점수 배열을 입력받습니다.',
                                code: `import sys
input = sys.stdin.readline

N, k = map(int, input().split())
scores = list(map(int, input().split()))`
                            },
                            {
                                title: '오름차순 정렬',
                                desc: '기본 sort()는 오름차순입니다. 작은 점수가 앞에 옵니다.',
                                code: `import sys
input = sys.stdin.readline

N, k = map(int, input().split())
scores = list(map(int, input().split()))
scores.sort()  # 오름차순 정렬`
                            },
                            {
                                title: '뒤에서 k번째 출력',
                                desc: 'Python 음수 인덱스를 활용! scores[-k]는 뒤에서 k번째 원소입니다.',
                                code: `import sys
input = sys.stdin.readline

N, k = map(int, input().split())
scores = list(map(int, input().split()))
scores.sort()
print(scores[-k])  # 뒤에서 k번째 = 커트라인`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 받기',
                                desc: 'N, k와 점수 배열을 입력받습니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, k;
    cin >> N >> k;
    vector<int> scores(N);
    for (int i = 0; i < N; i++) cin >> scores[i];`
                            },
                            {
                                title: '오름차순 정렬',
                                desc: '기본 sort()는 오름차순입니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, k;
    cin >> N >> k;
    vector<int> scores(N);
    for (int i = 0; i < N; i++) cin >> scores[i];
    sort(scores.begin(), scores.end());  // 오름차순`
                            },
                            {
                                title: '뒤에서 k번째 출력',
                                desc: 'C++에서는 scores[N-k]로 뒤에서 k번째 원소에 접근합니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, k;
    cin >> N >> k;
    vector<int> scores(N);
    for (int i = 0; i < N; i++) cin >> scores[i];
    sort(scores.begin(), scores.end());
    cout << scores[N - k] << endl;  // 뒤에서 k번째 = 커트라인
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2750',
            title: 'BOJ 2750 - 수 정렬하기',
            difficulty: 'bronze',
            link: 'https://www.acmicpc.net/problem/2750',
            simIntro: '선택 정렬로 배열을 정렬하는 과정을 관찰하세요. 매번 최솟값을 찾아 교환합니다.',
            sim: {
                type: 'selection'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 수의 개수 N(1 ≤ N ≤ 1,000)이 주어진다. 둘째 줄부터 N개의 줄에는 수가 주어진다. 이 수는 절댓값이 1,000보다 작거나 같은 정수이다. 수는 중복되지 않는다.</p>
                <h4>출력</h4>
                <p>첫째 줄부터 N개의 줄에 오름차순으로 정렬한 결과를 한 줄에 하나씩 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5
5
2
3
4
1</pre></div>
                    <div><strong>출력</strong><pre>1
2
3
4
5</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; N &le; 1,000</li>
                    <li>|수| &le; 1,000</li>
                    <li>수는 중복되지 않는다.</li>
                </ul>
            `,
            hints: [
                {
                    title: '가장 단순한 방법',
                    content: '아는 정렬 아무거나 쓰면 돼요! 선택 정렬, 삽입 정렬, 버블 정렬 — 뭘 쓰든 OK.<br>N &le; 1,000이라서 O(n&sup2;)도 시간 안에 충분히 들어와요. 직접 구현해보는 좋은 연습 문제!<div style="display:flex;gap:6px;justify-content:center;margin-top:12px;flex-wrap:wrap;"><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">5</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">2</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">3</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">4</div><div style="padding:6px 14px;border-radius:8px;background:var(--bg2);font-weight:700;">1</div></div><div style="text-align:center;margin:6px 0;font-size:1.2rem;">↓ 아무 정렬이나!</div><div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;"><div style="padding:6px 14px;border-radius:8px;background:var(--green);color:white;font-weight:700;">1</div><div style="padding:6px 14px;border-radius:8px;background:var(--green);color:white;font-weight:700;">2</div><div style="padding:6px 14px;border-radius:8px;background:var(--green);color:white;font-weight:700;">3</div><div style="padding:6px 14px;border-radius:8px;background:var(--green);color:white;font-weight:700;">4</div><div style="padding:6px 14px;border-radius:8px;background:var(--green);color:white;font-weight:700;">5</div></div>'
                },
                {
                    title: '더 빠른 정렬도 가능',
                    content: '직접 구현 대신 내장 정렬을 쓰면 O(n log n)으로 훨씬 빨라요.<br><span class="lang-py">Python: <code>sorted()</code>나 <code>.sort()</code>는 O(n log n) Timsort를 사용합니다.</span><span class="lang-cpp">C++: <code>sort()</code>는 O(n log n) IntroSort를 사용합니다. <code>&lt;algorithm&gt;</code> 헤더 필요!</span><div style="margin-top:10px;overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:0.85rem;"><tr style="background:var(--bg2);"><th style="padding:6px 10px;text-align:left;border:1px solid var(--bg3);">방법</th><th style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">시간</th><th style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">추천?</th></tr><tr><td style="padding:6px 10px;border:1px solid var(--bg3);">직접 구현 (O(n²))</td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">O(n²)</td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">연습용 ✏️</td></tr><tr><td style="padding:6px 10px;border:1px solid var(--bg3);"><span class="lang-py">sort()</span><span class="lang-cpp">sort()</span></td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">O(n log n)</td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);color:var(--green);font-weight:700;">실전 추천 ✅</td></tr></table></div>'
                },
                {
                    title: '입출력 최적화',
                    content: '정렬은 맞는데 시간 초과? 입출력이 병목일 수 있어요!<br><span class="lang-py">Python: <code>sys.stdin.readline</code>으로 빠른 입력 + <code>"\\n".join()</code>으로 한 번에 출력<div style="margin-top:8px;padding:8px 12px;background:var(--bg2);border-radius:8px;font-size:0.85rem;font-family:monospace;"><span style="color:var(--green);">import</span> sys<br>input = sys.stdin.readline &nbsp; <span style="color:var(--text3);"># 빠른 입력!</span><br>print(<span style="color:var(--yellow);">\'\\n\'</span>.join(map(str, arr))) &nbsp; <span style="color:var(--text3);"># 한 번에 출력!</span></div></span><span class="lang-cpp">C++: <code>ios::sync_with_stdio(false)</code>와 <code>cin.tie(nullptr)</code>로 빠른 입출력<div style="margin-top:8px;padding:8px 12px;background:var(--bg2);border-radius:8px;font-size:0.85rem;font-family:monospace;"><span style="color:var(--green);">ios</span>::sync_with_stdio(<span style="color:var(--red);">false</span>);<br>cin.tie(<span style="color:var(--red);">nullptr</span>); &nbsp; <span style="color:var(--text3);">// 빠른 입출력!</span></div></span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N = int(input())
arr = [int(input()) for _ in range(N)]
arr.sort()
print('\\n'.join(map(str, arr)))`,
                cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    scanf("%d", &N);
    vector<int> arr(N);
    for (int i = 0; i < N; i++) scanf("%d", &arr[i]);
    sort(arr.begin(), arr.end());
    for (int x : arr) printf("%d\\n", x);
}`
            },
            solutions: [
                {
                    approach: '내장 sort 사용',
                    description: '리스트에 입력을 담고 sort()를 호출합니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N = int(input())
arr = [int(input()) for _ in range(N)]
arr.sort()
print('\\n'.join(map(str, arr)))`,
                        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    scanf("%d", &N);
    vector<int> arr(N);
    for (int i = 0; i < N; i++) scanf("%d", &arr[i]);
    sort(arr.begin(), arr.end());
    for (int x : arr) printf("%d\\n", x);
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 받기',
                                desc: 'sys.stdin.readline으로 빠른 입력을 받아 배열에 저장합니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
arr = [int(input()) for _ in range(N)]`
                            },
                            {
                                title: '정렬',
                                desc: '내장 sort()는 TimSort(O(n log n))를 사용하므로 가장 빠르고 간편합니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
arr = [int(input()) for _ in range(N)]
arr.sort()`
                            },
                            {
                                title: '출력',
                                desc: 'join으로 한 번에 출력하면 print를 반복하는 것보다 훨씬 빠릅니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
arr = [int(input()) for _ in range(N)]
arr.sort()
print('\\n'.join(map(str, arr)))`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 받기',
                                desc: 'vector에 N개의 정수를 입력받아 저장합니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<int> arr(N);
    for (int i = 0; i < N; i++) cin >> arr[i];`
                            },
                            {
                                title: '정렬',
                                desc: 'STL sort()는 IntroSort(O(n log n))를 사용하므로 직접 구현보다 빠르고 안전합니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<int> arr(N);
    for (int i = 0; i < N; i++) cin >> arr[i];

    sort(arr.begin(), arr.end());  // O(n log n) IntroSort`
                            },
                            {
                                title: '출력',
                                desc: '"\\n"을 사용해 줄바꿈 출력합니다. endl보다 빠릅니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<int> arr(N);
    for (int i = 0; i < N; i++) cin >> arr[i];

    sort(arr.begin(), arr.end());

    for (int x : arr) cout << x << "\\n";
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-11650',
            title: 'BOJ 11650 - 좌표 정렬하기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/11650',
            simIntro: '좌표를 (x, y) 튜플로 만들고 정렬하는 과정을 관찰하세요.',
            sim: {
                type: 'coordSort'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>2차원 평면 위의 점 N개가 주어진다. 좌표를 x좌표가 증가하는 순으로, x좌표가 같으면 y좌표가 증가하는 순서로 정렬한 다음 출력하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 점의 개수 N (1 ≤ N ≤ 100,000)이 주어진다. 둘째 줄부터 N개의 줄에는 i번점의 위치 x<sub>i</sub>와 y<sub>i</sub>가 주어진다. (-100,000 ≤ x<sub>i</sub>, y<sub>i</sub> ≤ 100,000) 좌표는 항상 정수이고, 위치가 같은 두 점은 없다.</p>
                <h4>출력</h4>
                <p>첫째 줄부터 N개의 줄에 점을 정렬한 결과를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5
3 4
1 1
1 -1
2 2
3 3</pre></div>
                    <div><strong>출력</strong><pre>1 -1
1 1
2 2
3 3
3 4</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; N &le; 100,000</li>
                    <li>-100,000 &le; x, y &le; 100,000</li>
                    <li>좌표는 정수이다.</li>
                </ul>
            `,
            hints: [
                {
                    title: '좌표 정렬 = 비교 기준이 2개',
                    content: 'x좌표 먼저 비교하고, 같으면 y좌표를 비교해야 해요. 비교 함수를 직접 만들어야 할까?<div style="margin-top:12px;overflow-x:auto;"><table style="border-collapse:collapse;font-size:0.85rem;margin:0 auto;"><tr style="background:var(--bg2);"><th style="padding:6px 12px;border:1px solid var(--bg3);">좌표</th><th style="padding:6px 12px;border:1px solid var(--bg3);">1차 비교 (x)</th><th style="padding:6px 12px;border:1px solid var(--bg3);">2차 비교 (y)</th></tr><tr><td style="padding:6px 12px;border:1px solid var(--bg3);text-align:center;">(1, -1) vs (1, 1)</td><td style="padding:6px 12px;border:1px solid var(--bg3);text-align:center;">x = x → 같다!</td><td style="padding:6px 12px;border:1px solid var(--bg3);text-align:center;color:var(--green);">-1 < 1 → (1,-1) 먼저</td></tr><tr><td style="padding:6px 12px;border:1px solid var(--bg3);text-align:center;">(1, 1) vs (3, 3)</td><td style="padding:6px 12px;border:1px solid var(--bg3);text-align:center;color:var(--green);">1 < 3 → (1,1) 먼저</td><td style="padding:6px 12px;border:1px solid var(--bg3);text-align:center;color:var(--text3);">비교 불필요</td></tr></table></div>'
                },
                {
                    title: '튜플/pair 정렬의 마법',
                    content: '직접 비교 함수를 만들 필요 없어요!<br><span class="lang-py">Python: <code>(x, y)</code> 튜플을 정렬하면 자동으로 x 우선, y 차선으로 정렬돼요. 그냥 <code>coords.sort()</code> 한 줄이면 끝!</span><span class="lang-cpp">C++: <code>pair&lt;int,int&gt;</code>를 <code>sort()</code>하면 first 기준 정렬, 같으면 second 기준으로 자동 정렬돼요!</span><div style="display:flex;gap:8px;justify-content:center;margin-top:12px;align-items:center;flex-wrap:wrap;"><div style="padding:6px 12px;border-radius:8px;background:var(--bg2);font-size:0.85rem;">(3,4)</div><div style="padding:6px 12px;border-radius:8px;background:var(--bg2);font-size:0.85rem;">(1,1)</div><div style="padding:6px 12px;border-radius:8px;background:var(--bg2);font-size:0.85rem;">(1,-1)</div><div style="padding:6px 12px;border-radius:8px;background:var(--bg2);font-size:0.85rem;">(2,2)</div><div style="padding:6px 12px;border-radius:8px;background:var(--bg2);font-size:0.85rem;">(3,3)</div></div><div style="text-align:center;margin:6px 0;font-size:1.1rem;"><span class="lang-py">↓ coords.sort()</span><span class="lang-cpp">↓ sort(coords.begin(), coords.end())</span></div><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;"><div style="padding:6px 12px;border-radius:8px;background:var(--green);color:white;font-size:0.85rem;">(1,-1)</div><div style="padding:6px 12px;border-radius:8px;background:var(--green);color:white;font-size:0.85rem;">(1,1)</div><div style="padding:6px 12px;border-radius:8px;background:var(--green);color:white;font-size:0.85rem;">(2,2)</div><div style="padding:6px 12px;border-radius:8px;background:var(--green);color:white;font-size:0.85rem;">(3,3)</div><div style="padding:6px 12px;border-radius:8px;background:var(--green);color:white;font-size:0.85rem;">(3,4)</div></div>'
                },
                {
                    title: '입출력이 핵심',
                    content: 'N이 최대 100,000이므로 빠른 입출력이 필수예요. 느린 입출력을 쓰면 정답인데도 시간 초과!<br><span class="lang-py">Python: <code>sys.stdin.readline</code>으로 빠른 입력</span><span class="lang-cpp">C++: <code>ios::sync_with_stdio(false)</code>와 <code>cin.tie(nullptr)</code>로 빠른 입출력</span><div style="margin-top:10px;overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:0.85rem;"><tr style="background:var(--bg2);"><th style="padding:6px 10px;text-align:left;border:1px solid var(--bg3);">입출력 방법</th><th style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">속도</th></tr><tr><td style="padding:6px 10px;border:1px solid var(--bg3);"><span class="lang-py"><code>input()</code></span><span class="lang-cpp"><code>cin</code> (동기화 해제 안 함)</span></td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);color:var(--red);">느림 ❌</td></tr><tr><td style="padding:6px 10px;border:1px solid var(--bg3);"><span class="lang-py"><code>sys.stdin.readline</code></span><span class="lang-cpp"><code>scanf</code> 또는 동기화 해제</span></td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);color:var(--green);font-weight:700;">빠름 ✅</td></tr></table></div>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N = int(input())
coords = []
for _ in range(N):
    x, y = map(int, input().split())
    coords.append((x, y))

coords.sort()  # 튜플은 자동으로 (x, y) 순 정렬!

output = []
for x, y in coords:
    output.append(f"{x} {y}")
print('\\n'.join(output))`,
                cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <utility>
using namespace std;

int main() {
    int N;
    scanf("%d", &N);
    vector<pair<int,int>> coords(N);
    for (int i = 0; i < N; i++)
        scanf("%d %d", &coords[i].first, &coords[i].second);
    sort(coords.begin(), coords.end());
    for (auto& [x, y] : coords)
        printf("%d %d\\n", x, y);
}`
            },
            solutions: [
                {
                    approach: '튜플 정렬',
                    description: '좌표를 (x, y) 튜플로 만들면 자동으로 x → y 순으로 정렬됩니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N = int(input())
coords = []
for _ in range(N):
    x, y = map(int, input().split())
    coords.append((x, y))

coords.sort()  # 튜플은 자동으로 (x, y) 순 정렬!

output = []
for x, y in coords:
    output.append(f"{x} {y}")
print('\\n'.join(output))`,
                        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <utility>
using namespace std;

int main() {
    int N;
    scanf("%d", &N);
    vector<pair<int,int>> coords(N);
    for (int i = 0; i < N; i++)
        scanf("%d %d", &coords[i].first, &coords[i].second);
    sort(coords.begin(), coords.end());
    for (auto& [x, y] : coords)
        printf("%d %d\\n", x, y);
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 받기',
                                desc: '좌표를 (x, y) 튜플로 저장하면 정렬 시 자동으로 x → y 순 비교됩니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
coords = []
for _ in range(N):
    x, y = map(int, input().split())
    coords.append((x, y))`
                            },
                            {
                                title: '튜플 정렬',
                                desc: 'Python 튜플은 첫 번째 원소부터 순서대로 비교하므로 별도 key 없이 sort()만 호출하면 됩니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
coords = []
for _ in range(N):
    x, y = map(int, input().split())
    coords.append((x, y))

coords.sort()  # (x, y) 순 자동 정렬!`
                            },
                            {
                                title: '출력',
                                desc: 'f-string으로 포맷팅 후 join으로 한 번에 출력하여 속도를 높입니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
coords = []
for _ in range(N):
    x, y = map(int, input().split())
    coords.append((x, y))

coords.sort()

output = []
for x, y in coords:
    output.append(f"{x} {y}")
print('\\n'.join(output))`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 받기',
                                desc: 'pair<int,int>로 좌표를 저장하면 정렬 시 first → second 순으로 자동 비교됩니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<pair<int,int>> coords(N);
    for (int i = 0; i < N; i++)
        cin >> coords[i].first >> coords[i].second;`
                            },
                            {
                                title: 'pair 정렬',
                                desc: 'STL sort()는 pair를 자동으로 first 우선, 같으면 second 순으로 비교합니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<pair<int,int>> coords(N);
    for (int i = 0; i < N; i++)
        cin >> coords[i].first >> coords[i].second;

    sort(coords.begin(), coords.end());  // pair 자동 정렬 (first 먼저, 같으면 second)`
                            },
                            {
                                title: '출력',
                                desc: '구조화 바인딩(auto& [x, y])으로 깔끔하게 출력합니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<pair<int,int>> coords(N);
    for (int i = 0; i < N; i++)
        cin >> coords[i].first >> coords[i].second;

    sort(coords.begin(), coords.end());

    for (auto& [x, y] : coords)
        cout << x << " " << y << "\\n";
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-10814',
            title: 'BOJ 10814 - 나이순 정렬',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/10814',
            simIntro: '안정 정렬(Stable Sort)로 나이 기준 정렬 시 입력 순서가 유지되는 과정을 관찰하세요.',
            sim: {
                type: 'stableSort'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>온라인 저지에 가입한 사람들의 나이와 이름이 가입한 순서대로 주어진다. 이때, 회원들을 나이가 증가하는 순으로, 나이가 같으면 먼저 가입한 사람이 앞에 오는 순서로 정렬하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 온라인 저지 회원의 수 N이 주어진다. (1 ≤ N ≤ 100,000)</p>
                <p>둘째 줄부터 N개의 줄에는 각 회원의 나이와 이름이 공백으로 구분되어 주어진다. 나이는 1보다 크거나 같고, 200보다 작거나 같은 정수이고, 이름은 알파벳 대소문자로만 이루어져 있고, 길이가 100보다 작거나 같은 문자열이다. 입력은 가입한 순서로 주어진다.</p>
                <h4>출력</h4>
                <p>첫째 줄부터 N개의 줄에 회원들을 나이 순, 나이가 같으면 가입한 순으로 한 줄에 한 명씩 나이와 이름을 공백으로 구분하여 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3
21 Junkyu
21 Dohyun
20 Sunyoung</pre></div>
                    <div><strong>출력</strong><pre>20 Sunyoung
21 Junkyu
21 Dohyun</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; N &le; 100,000</li>
                    <li>1 &le; 나이 &le; 200</li>
                    <li>이름은 알파벳 대소문자로만 이루어져 있고, 길이는 100 이하이다.</li>
                </ul>
            `,
            hints: [
                {
                    title: '나이순 정렬인데, 같은 나이는?',
                    content: '나이 기준으로 정렬하는 건 쉬워요. 그런데 문제를 잘 보면 — 같은 나이일 때 <strong>먼저 가입한 사람이 앞</strong>에 와야 해요. 즉, 같은 나이면 입력 순서를 유지해야 해요. 이런 정렬을 <strong>"안정 정렬(stable sort)"</strong>이라고 해요.<div style="margin-top:12px;"><div style="font-size:0.8rem;color:var(--text2);margin-bottom:6px;">입력 순서 (가입 순):</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;"><div style="padding:6px 12px;border-radius:8px;background:var(--bg2);font-size:0.85rem;"><strong>21</strong> Junkyu <span style="font-size:0.7rem;color:var(--text3);">①</span></div><div style="padding:6px 12px;border-radius:8px;background:var(--bg2);font-size:0.85rem;"><strong>21</strong> Dohyun <span style="font-size:0.7rem;color:var(--text3);">②</span></div><div style="padding:6px 12px;border-radius:8px;background:var(--bg2);font-size:0.85rem;"><strong>20</strong> Sunyoung</div></div><div style="font-size:0.8rem;color:var(--green);margin-bottom:6px;">정렬 후 (같은 나이 21: 가입 순 유지!)</div><div style="display:flex;gap:8px;flex-wrap:wrap;"><div style="padding:6px 12px;border-radius:8px;background:var(--green);color:white;font-size:0.85rem;"><strong>20</strong> Sunyoung</div><div style="padding:6px 12px;border-radius:8px;border:2px solid var(--yellow);font-size:0.85rem;"><strong>21</strong> Junkyu <span style="font-size:0.7rem;color:var(--yellow);">①</span></div><div style="padding:6px 12px;border-radius:8px;border:2px solid var(--yellow);font-size:0.85rem;"><strong>21</strong> Dohyun <span style="font-size:0.7rem;color:var(--yellow);">②</span></div></div></div>'
                },
                {
                    title: '안정 정렬 활용',
                    content: '나이만 기준(key)으로 정렬하면, 안정 정렬 덕분에 같은 나이끼리는 원래 순서가 유지돼요!<br><span class="lang-py">Python: <code>sorted()</code>와 <code>.sort()</code>는 기본이 안정 정렬(TimSort)! <code>key=lambda x: int(x.split()[0])</code>이면 끝.</span><span class="lang-cpp">C++: <code>stable_sort()</code>를 사용하면 돼요. 주의: <code>sort()</code>는 불안정 정렬이라 같은 나이 순서가 바뀔 수 있어요!</span><div style="margin-top:10px;overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:0.85rem;"><tr style="background:var(--bg2);"><th style="padding:6px 10px;text-align:left;border:1px solid var(--bg3);">언어</th><th style="padding:6px 10px;text-align:left;border:1px solid var(--bg3);">안정 정렬?</th><th style="padding:6px 10px;text-align:left;border:1px solid var(--bg3);">사용법</th></tr><tr class="lang-py"><td style="padding:6px 10px;border:1px solid var(--bg3);">Python</td><td style="padding:6px 10px;border:1px solid var(--bg3);color:var(--green);">✅ 기본 안정</td><td style="padding:6px 10px;border:1px solid var(--bg3);"><code>sort(key=lambda x: x[0])</code></td></tr><tr class="lang-cpp"><td style="padding:6px 10px;border:1px solid var(--bg3);">C++</td><td style="padding:6px 10px;border:1px solid var(--bg3);color:var(--red);">sort() ❌ 불안정</td><td style="padding:6px 10px;border:1px solid var(--bg3);"><code>stable_sort()</code> 필수!</td></tr></table></div>'
                },
                {
                    title: '시간 복잡도',
                    content: 'O(n log n)이면 충분해요. N &le; 100,000이므로 넉넉합니다.<div style="margin-top:8px;padding:8px 12px;background:var(--warm-bg);border-left:3px solid var(--warm-accent);border-radius:6px;font-size:0.85rem;line-height:1.7;">핵심: 나이만 key로 주고 이름은 key에 포함하지 않는 것이 포인트! 안정 정렬이 같은 key에 대해 입력 순서를 자동으로 유지해줍니다.</div>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N = int(input())
members = []
for _ in range(N):
    line = input().split()
    members.append((int(line[0]), line[1]))

# Python sort는 안정 정렬 → 나이만 기준으로 정렬해도 입력 순서 유지
members.sort(key=lambda x: x[0])

for age, name in members:
    print(age, name)`,
                cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <utility>
using namespace std;

int main() {
    int N;
    scanf("%d", &N);
    vector<pair<int, string>> v(N);
    for (int i = 0; i < N; i++)
        cin >> v[i].first >> v[i].second;

    // stable_sort: 같은 나이면 입력 순서 유지
    stable_sort(v.begin(), v.end(), [](auto& a, auto& b) {
        return a.first < b.first;
    });

    for (auto& [age, name] : v)
        printf("%d %s\\n", age, name.c_str());
}`
            },
            solutions: [
                {
                    approach: '안정 정렬 활용',
                    description: '나이만 기준으로 sort()하면 안정 정렬 덕분에 입력 순서가 자동 유지됩니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N = int(input())
members = []
for _ in range(N):
    line = input().split()
    members.append((int(line[0]), line[1]))

# Python sort는 안정 정렬 → 나이만 기준으로 정렬해도 입력 순서 유지
members.sort(key=lambda x: x[0])

for age, name in members:
    print(age, name)`,
                        cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <utility>
using namespace std;

int main() {
    int N;
    scanf("%d", &N);
    vector<pair<int, string>> v(N);
    for (int i = 0; i < N; i++)
        cin >> v[i].first >> v[i].second;

    // stable_sort: 같은 나이면 입력 순서 유지
    stable_sort(v.begin(), v.end(), [](auto& a, auto& b) {
        return a.first < b.first;
    });

    for (auto& [age, name] : v)
        printf("%d %s\\n", age, name.c_str());
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 받기',
                                desc: '나이(int)와 이름(str)을 튜플로 저장합니다. 나이만 정렬 키로 쓸 예정입니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
members = []
for _ in range(N):
    line = input().split()
    members.append((int(line[0]), line[1]))`
                            },
                            {
                                title: '나이 기준 정렬 (안정)',
                                desc: 'Python sort()는 안정 정렬(TimSort)이므로, 나이만 key로 주면 같은 나이끼리 입력 순서가 유지됩니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
members = []
for _ in range(N):
    line = input().split()
    members.append((int(line[0]), line[1]))

# Python sort는 안정 정렬!
members.sort(key=lambda x: x[0])`
                            },
                            {
                                title: '출력',
                                desc: '정렬된 결과를 나이와 이름 순서로 출력합니다.',
                                code: `import sys
input = sys.stdin.readline

N = int(input())
members = []
for _ in range(N):
    line = input().split()
    members.append((int(line[0]), line[1]))

members.sort(key=lambda x: x[0])

for age, name in members:
    print(age, name)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 받기',
                                desc: 'pair<int, string>으로 나이와 이름을 함께 저장합니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<pair<int, string>> v(N);
    for (int i = 0; i < N; i++)
        cin >> v[i].first >> v[i].second;`
                            },
                            {
                                title: '나이 기준 안정 정렬',
                                desc: 'C++ sort()는 불안정 정렬이므로 stable_sort()를 써야 같은 나이끼리 입력 순서가 보장됩니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<pair<int, string>> v(N);
    for (int i = 0; i < N; i++)
        cin >> v[i].first >> v[i].second;

    // stable_sort: 같은 키이면 입력 순서 유지!
    stable_sort(v.begin(), v.end(), [](auto& a, auto& b) {
        return a.first < b.first;
    });`
                            },
                            {
                                title: '출력',
                                desc: '구조화 바인딩으로 나이와 이름을 깔끔하게 출력합니다.',
                                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<pair<int, string>> v(N);
    for (int i = 0; i < N; i++)
        cin >> v[i].first >> v[i].second;

    stable_sort(v.begin(), v.end(), [](auto& a, auto& b) {
        return a.first < b.first;
    });

    for (auto& [age, name] : v)
        cout << age << " " << name << "\\n";
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-56',
            title: 'LeetCode 56 - Merge Intervals',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/merge-intervals/',
            simIntro: '시작점으로 정렬한 뒤, 겹치는 구간을 순서대로 병합하는 과정을 관찰하세요.',
            sim: {
                type: 'mergeIntervals'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>구간 배열 <code>intervals</code>가 주어집니다. <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>입니다. 겹치는 구간을 모두 합치고, 겹치지 않는 구간만 남긴 배열을 반환하세요.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>intervals = [[1,3],[2,6],[8,10],[15,18]]</pre></div>
                    <div><strong>출력</strong><pre>[[1,6],[8,10],[15,18]]</pre></div>
                </div><p class="example-explain">구간 [1,3]과 [2,6]이 겹치므로 [1,6]으로 합칩니다.</p></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>intervals = [[1,4],[4,5]]</pre></div>
                    <div><strong>출력</strong><pre>[[1,5]]</pre></div>
                </div><p class="example-explain">구간 [1,4]와 [4,5]는 겹치는 것으로 간주합니다.</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; intervals.length &le; 10<sup>4</sup></li>
                    <li>intervals[i].length == 2</li>
                    <li>0 &le; start<sub>i</sub> &le; end<sub>i</sub> &le; 10<sup>4</sup></li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 생각: 하나씩 비교?',
                    content: '모든 구간 쌍을 하나씩 비교하면 겹치는지 알 수 있어요. 하지만 구간이 n개면 비교 횟수가 O(n&sup2;)... 구간이 10,000개면 1억 번 비교!<div style="margin-top:10px;overflow-x:auto;"><table style="border-collapse:collapse;font-size:0.85rem;margin:0 auto;"><tr style="background:var(--bg2);"><th style="padding:6px 10px;border:1px solid var(--bg3);">방법</th><th style="padding:6px 10px;border:1px solid var(--bg3);">비교 횟수</th><th style="padding:6px 10px;border:1px solid var(--bg3);">n=10,000</th></tr><tr><td style="padding:6px 10px;border:1px solid var(--bg3);">모든 쌍 비교</td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">O(n²)</td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);color:var(--red);">~1억 ❌</td></tr><tr><td style="padding:6px 10px;border:1px solid var(--bg3);">정렬 후 순회</td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);">O(n log n)</td><td style="padding:6px 10px;text-align:center;border:1px solid var(--bg3);color:var(--green);font-weight:700;">~13만 ✅</td></tr></table></div>'
                },
                {
                    title: '정렬하면 쉬워진다!',
                    content: '<strong>시작점 기준으로 정렬</strong>하면, 겹치는 구간은 반드시 연속으로 나열돼요. 그러면 앞에서부터 한 번만 스캔하면서 합치면 끝!<div style="margin-top:12px;"><div style="font-size:0.8rem;color:var(--text2);margin-bottom:4px;">정렬 전: 순서가 뒤죽박죽</div><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;"><div style="padding:4px 10px;border-radius:6px;background:var(--bg2);font-size:0.85rem;">[1,3]</div><div style="padding:4px 10px;border-radius:6px;background:var(--bg2);font-size:0.85rem;">[8,10]</div><div style="padding:4px 10px;border-radius:6px;background:var(--bg2);font-size:0.85rem;">[2,6]</div><div style="padding:4px 10px;border-radius:6px;background:var(--bg2);font-size:0.85rem;">[15,18]</div></div><div style="font-size:0.8rem;color:var(--green);margin-bottom:4px;">정렬 후: 겹치는 구간이 나란히!</div><div style="display:flex;gap:6px;flex-wrap:wrap;"><div style="padding:4px 10px;border-radius:6px;border:2px solid var(--yellow);font-size:0.85rem;">[1,3]</div><div style="padding:4px 10px;border-radius:6px;border:2px solid var(--yellow);font-size:0.85rem;">[2,6]</div><div style="padding:4px 10px;border-radius:6px;background:var(--bg2);font-size:0.85rem;">[8,10]</div><div style="padding:4px 10px;border-radius:6px;background:var(--bg2);font-size:0.85rem;">[15,18]</div></div></div>'
                },
                {
                    title: '합치기 로직',
                    content: '현재 구간의 끝 &ge; 다음 구간의 시작이면 겹치니까 합쳐요 → <code>끝 = max(현재 끝, 다음 끝)</code>.<br>겹치지 않으면? 새 구간을 결과에 추가하고 다음으로 넘어가면 돼요.<div style="margin-top:12px;display:flex;flex-direction:column;gap:8px;"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><div style="padding:4px 10px;border-radius:6px;border:2px solid var(--yellow);font-size:0.85rem;">[1,3]</div><div style="font-size:0.85rem;">+</div><div style="padding:4px 10px;border-radius:6px;border:2px solid var(--yellow);font-size:0.85rem;">[2,6]</div><div style="font-size:1rem;">→</div><div style="font-size:0.85rem;color:var(--text2);">3 &ge; 2 겹침!</div><div style="font-size:1rem;">→</div><div style="padding:4px 10px;border-radius:6px;background:var(--green);color:white;font-size:0.85rem;">[1, max(3,6)] = [1,6]</div></div><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><div style="padding:4px 10px;border-radius:6px;border:2px solid var(--accent);font-size:0.85rem;">[1,6]</div><div style="font-size:0.85rem;">+</div><div style="padding:4px 10px;border-radius:6px;background:var(--bg2);font-size:0.85rem;">[8,10]</div><div style="font-size:1rem;">→</div><div style="font-size:0.85rem;color:var(--text2);">6 < 8 안 겹침</div><div style="font-size:1rem;">→</div><div style="font-size:0.85rem;color:var(--accent);">새 구간 추가</div></div></div>'
                }
            ],
            templates: {
                python: `class Solution:
    def merge(self, intervals):
        intervals.sort(key=lambda x: x[0])  # 시작점 기준 정렬
        merged = [intervals[0]]

        for start, end in intervals[1:]:
            if start <= merged[-1][1]:  # 겹침!
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append([start, end])

        return merged`,
                cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged = {intervals[0]};

        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] <= merged.back()[1])
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            else
                merged.push_back(intervals[i]);
        }
        return merged;
    }
};`
            },
            solutions: [
                {
                    approach: '정렬 + 순차 병합',
                    description: '시작점 기준 정렬 후, 겹치면 end를 max로 갱신합니다.',
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `class Solution:
    def merge(self, intervals):
        intervals.sort(key=lambda x: x[0])  # 시작점 기준 정렬
        merged = [intervals[0]]

        for start, end in intervals[1:]:
            if start <= merged[-1][1]:  # 겹침!
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append([start, end])

        return merged`,
                        cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged = {intervals[0]};

        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] <= merged.back()[1])
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            else
                merged.push_back(intervals[i]);
        }
        return merged;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '시작점 정렬',
                                desc: '시작점 기준으로 정렬하면 겹치는 구간이 연속으로 나와 한 번의 순회로 병합할 수 있습니다.',
                                code: `def merge(self, intervals):
    intervals.sort(key=lambda x: x[0])`
                            },
                            {
                                title: '첫 구간 추가',
                                desc: '결과 리스트에 첫 구간을 넣어 비교의 시작점을 만듭니다.',
                                code: `def merge(self, intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]`
                            },
                            {
                                title: '겹침 판별 + 병합',
                                desc: '현재 구간의 시작이 이전 구간의 끝 이하이면 겹치므로, end를 max로 확장합니다.',
                                code: `def merge(self, intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:  # 겹침!
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])`
                            },
                            {
                                title: '결과 반환',
                                desc: '병합이 완료된 구간 리스트를 반환합니다.',
                                code: `def merge(self, intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged`
                            }
                        ],
                        cpp: [
                            {
                                title: '시작점 정렬',
                                desc: '시작점 기준으로 정렬하면 겹치는 구간이 연속으로 나와 한 번의 순회로 병합할 수 있습니다.',
                                code: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());`
                            },
                            {
                                title: '첫 구간 추가',
                                desc: '결과 벡터에 첫 구간을 넣어 비교의 시작점을 만듭니다.',
                                code: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());

    vector<vector<int>> merged = {intervals[0]};`
                            },
                            {
                                title: '겹침 판별 + 병합',
                                desc: '현재 구간의 시작이 이전 구간의 끝 이하이면 겹치므로, end를 max로 확장합니다.',
                                code: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());

    vector<vector<int>> merged = {intervals[0]};

    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= merged.back()[1])
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        else
            merged.push_back(intervals[i]);
    }`
                            },
                            {
                                title: '결과 반환',
                                desc: '병합이 완료된 구간 벡터를 반환합니다.',
                                code: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());

    vector<vector<int>> merged = {intervals[0]};

    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= merged.back()[1])
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        else
            merged.push_back(intervals[i]);
    }

    return merged;
}`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
