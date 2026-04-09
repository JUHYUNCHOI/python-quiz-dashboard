import type { AlgoTopic } from '../types'

export const priorityQueueTopic: AlgoTopic = {
    id: 'priorityqueue',
    title: '우선순위 큐',
    icon: '🏥',
    category: '심화 (Gold~Platinum)',
    order: 16,
    description: '가장 중요한 것부터 꺼내는 자료구조',
    titleEn: 'Priority Queue',
    categoryEn: 'Advanced Algorithms (Gold~Platinum)',
    descriptionEn: 'A data structure that always retrieves the most important element first',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: '기본 힙 연산',
            titleEn: 'Basic Heap Operations',
            problemIds: [
                'boj-11279',
                'boj-1927',
                'boj-11286'
            ],
            desc: '최대/최소/절댓값 힙 (Silver II)',
            descEn: 'Max/min/absolute value heap (Silver II)'
        },
        {
            num: 2,
            title: '힙 활용',
            titleEn: 'Heap Applications',
            problemIds: [
                'boj-2075',
                'boj-2696'
            ],
            desc: '크기 제한 힙, 두 개의 힙 (Gold)',
            descEn: 'Size-limited heap, two heaps (Gold)'
        },
        {
            num: 3,
            title: '그리디 + 힙',
            titleEn: 'Greedy + Heap',
            problemIds: [
                'boj-1202'
            ],
            desc: '정렬 + 힙으로 최적해 (Gold II)',
            descEn: 'Optimal solution with sort + heap (Gold II)'
        }
    ],
    problems: [
        {
            id: 'boj-11279',
            title: 'BOJ 11279 - 최대 힙',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/11279',
            simIntro: '최대 힙에서 삽입과 삭제가 어떻게 동작하는지 관찰하세요.',
            sim: {
                type: 'maxHeap'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>널리 잘 알려진 자료구조 중 최대 힙이 있다. 최대 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.</p>
                <p>배열에 자연수 x를 넣는다. 배열에서 가장 큰 값을 출력하고, 그 값을 배열에서 제거한다.</p>
                <p>프로그램은 처음에 비어있는 배열에서 시작하게 된다.</p>
                <p>x가 자연수라면 배열에 x를 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 큰 값을 출력하고 그 값을 배열에서 제거하는 경우이다. 만약 배열이 비어 있는 경우인데 가장 큰 값을 출력하라고 한 경우에는 0을 출력하면 된다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 연산의 개수 N(1 &le; N &le; 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 큰 값을 출력하고, 그 값을 배열에서 제거하는 경우이다. x는 2<sup>31</sup>보다 작은 자연수 또는 0이고, 음의 정수는 입력으로 주어지지 않는다.</p>
                <h4>출력</h4>
                <p>입력에서 0이 주어진 회수만큼 답을 한 줄에 하나씩 출력한다. 만약 배열이 비어 있는 경우인데 가장 큰 값을 출력하라고 한 경우에는 0을 출력하면 된다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>13
1
2
0
0
3
2
1
0
0
0
0
0
0</pre></div>
                    <div><strong>출력</strong><pre>2
1
3
2
1
0
0</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 100,000</li>
                    <li>x는 자연수 또는 0</li>
                    <li>x ≤ 2<sup>31</sup> - 1</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '"가장 큰 값을 출력하라"니까... 배열에 숫자를 넣고, 0이 나올 때마다 <strong>배열 전체를 뒤져서 최댓값</strong>을 찾으면 되지 않을까?<br><br>매번 <code>max()</code>로 찾고, 그 값을 제거하면 될 것 같아!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '배열에서 최댓값 찾기 = <strong>O(N)</strong>, 제거도 <strong>O(N)</strong>이야.<br>연산이 최대 10만 번이고, 매번 O(N)이면 <strong>10만 × 10만 = 100억 번</strong>... 시간 초과!<br><br><div style="display:flex;align-items:flex-end;gap:18px;justify-content:center;margin:12px 0 8px;"><div style="text-align:center;"><div style="width:48px;height:120px;background:var(--red);border-radius:6px 6px 0 0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:6px;color:#fff;font-weight:700;font-size:0.8em;">10<sup>10</sup></div><div style="font-size:0.78em;color:var(--text2);margin-top:4px;">배열<br>O(N) &times; N</div></div><div style="text-align:center;"><div style="width:48px;height:30px;background:var(--green);border-radius:6px 6px 0 0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:6px;color:#fff;font-weight:700;font-size:0.8em;">10<sup>5</sup></div><div style="font-size:0.78em;color:var(--text2);margin-top:4px;">힙<br>O(log N) &times; N</div></div></div>넣을 때는 빠르지만, <strong>꺼낼 때마다 전부 뒤지는 게 병목</strong>이야.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>힙(Heap)</strong>을 쓰면 삽입도 O(log N), 최댓값 꺼내기도 O(log N)이야!<br>힙은 "항상 최댓값(또는 최솟값)이 맨 위에 있는" 특별한 트리 구조거든.<br><br>그런데 주의할 점이 하나 있어:<br><span class="lang-py">Python의 <code>heapq</code>는 <strong>최소 힙</strong>만 지원해. 최대 힙이 필요한데 어떡하지? 🤔<br>→ <strong>-1을 곱해서</strong> 넣으면 돼! 가장 작은 음수 = 원래 가장 큰 수니까!</span><span class="lang-cpp">C++의 <code>priority_queue&lt;int&gt;</code>는 <strong>기본이 최대 힙</strong>이라 그대로 쓰면 돼! Python보다 오히려 간단하지.</span>'
                },
                {
                    title: '<span class="lang-py">Python</span><span class="lang-cpp">C++</span>에선 이렇게!',
                    content: '<span class="lang-py"><code>heapq.heappush(heap, <strong>-x</strong>)</code>로 넣고, 꺼낼 때 <code><strong>-</strong>heapq.heappop(heap)</code>으로 부호를 되돌려주면 끝!<br>삽입/삭제 모두 <strong>O(log N)</strong>이라 전체 <strong>O(N log N)</strong>으로 여유있게 통과해.</span><span class="lang-cpp"><code>pq.push(x)</code>로 넣고, <code>pq.top()</code>으로 최댓값 확인 후 <code>pq.pop()</code>으로 제거하면 끝!<br>삽입/삭제 모두 <strong>O(log N)</strong>이라 전체 <strong>O(N log N)</strong>으로 여유있게 통과해.</span>'
                }
            ],
            templates: {
                python: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []
for _ in range(n):
    x = int(input())
    if x > 0:
        heapq.heappush(heap, -x)
    else:
        if heap:
            print(-heapq.heappop(heap))
        else:
            print(0)`,
                cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, x; cin >> n;
    priority_queue<int> pq;
    while (n--) {
        cin >> x;
        if (x > 0) pq.push(x);
        else { if (!pq.empty()) { cout << pq.top() << "\\n"; pq.pop(); } else cout << 0 << "\\n"; }
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '최대 힙 (-1 곱하기)',
                    description: 'heapq에 -x를 넣고 꺼낼 때 -1을 곱합니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []
for _ in range(n):
    x = int(input())
    if x > 0:
        heapq.heappush(heap, -x)
    else:
        if heap:
            print(-heapq.heappop(heap))
        else:
            print(0)`,
                        cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, x; cin >> n;
    priority_queue<int> pq;
    while (n--) {
        cin >> x;
        if (x > 0) pq.push(x);
        else { if (!pq.empty()) { cout << pq.top() << "\\n"; pq.pop(); } else cout << 0 << "\\n"; }
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기화',
                                desc: 'heapq는 최소 힙이므로 -1을 곱해 넣으면 최대 힙처럼 동작합니다.',
                                code: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []`
                            },
                            {
                                title: '연산 처리',
                                desc: 'x > 0이면 -x를 push하여 최대 힙 효과를 냅니다.',
                                code: `for _ in range(n):
    x = int(input())
    if x > 0:
        heapq.heappush(heap, -x)`
                            },
                            {
                                title: '출력',
                                desc: '꺼낸 값에 다시 -1을 곱해 원래 값을 복원합니다.',
                                code: `    else:
        if heap:
            print(-heapq.heappop(heap))
        else:
            print(0)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기화',
                                desc: 'C++ priority_queue는 기본이 최대 힙 → -1 곱할 필요 없음.',
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, x;
    cin >> n;
    priority_queue<int> pq;  // 기본: 최대 힙`
                            },
                            {
                                title: '연산 처리',
                                desc: 'x > 0이면 그대로 push. 기본 최대 힙이라 별도 변환 불필요.',
                                code: `    while (n--) {
        cin >> x;
        if (x > 0) {
            pq.push(x);
        }`
                            },
                            {
                                title: '출력',
                                desc: 'top()으로 최댓값을 확인하고 pop()으로 제거합니다.',
                                code: `        else {
            if (!pq.empty()) {
                cout << pq.top() << '\\n';
                pq.pop();
            } else {
                cout << 0 << '\\n';
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
            id: 'boj-1927',
            title: 'BOJ 1927 - 최소 힙',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1927',
            simIntro: '최소 힙에서 삽입과 삭제가 어떻게 동작하는지 관찰하세요.',
            sim: {
                type: 'minHeap'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>널리 잘 알려진 자료구조 중 최소 힙이 있다. 최소 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.</p>
                <p>배열에 자연수 x를 넣는다. 배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다.</p>
                <p>x가 자연수라면 배열에 x를 넣고, x가 0이라면 배열에서 가장 작은 값을 출력하고 제거한다. 배열이 비어있으면 0을 출력한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 연산의 개수 N(1 &le; N &le; 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거하는 경우이다. x는 2<sup>31</sup>보다 작은 자연수 또는 0이고, 음의 정수는 입력으로 주어지지 않는다.</p>
                <h4>출력</h4>
                <p>입력에서 0이 주어진 회수만큼 답을 한 줄에 하나씩 출력한다. 만약 배열이 비어 있는 경우인데 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>9
0
12345678
1
2
0
0
0
0
32</pre></div>
                    <div><strong>출력</strong><pre>0
1
2
12345678
0</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 100,000</li>
                    <li>1 ≤ x ≤ 2<sup>31</sup> - 1</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '"가장 작은 값을 출력하라"니까... 숫자를 배열에 넣고, 0이 나오면 <strong>배열을 정렬해서 맨 앞</strong>을 꺼내면 되지 않을까?<br><br>아니면 매번 <code>min()</code>으로 최솟값을 찾아서 제거하거나!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '매번 정렬하면 <strong>O(N log N)</strong>, min()으로 찾아도 <strong>O(N)</strong>이야.<br>연산이 최대 10만 번이면 <strong>최악 10만 × 10만 = 100억 번</strong>... 너무 느려!<br><br>최대 힙 문제랑 똑같은 상황이야. <strong>"매번 전체를 뒤지는"</strong> 게 문제지.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>최소 힙</strong>을 쓰면 삽입 O(log N), 최솟값 꺼내기 O(log N)으로 해결돼!<br>힙은 "맨 위에 항상 최솟값(또는 최댓값)이 있는" 구조라서, 매번 전체를 안 뒤져도 바로 꺼낼 수 있어.<br><br>최대 힙 문제에선 -1 곱하기 트릭이 필요했는데, <strong>최소 힙은 그냥 넣으면 돼!</strong>'
                },
                {
                    title: '<span class="lang-py">Python</span><span class="lang-cpp">C++</span>에선 이렇게!',
                    content: '<span class="lang-py"><code>heapq</code>가 기본으로 <strong>최소 힙</strong>이라서, 아무 트릭 없이 <code>heappush(heap, x)</code>로 넣고 <code>heappop(heap)</code>으로 꺼내면 끝!<br>최대 힙보다 오히려 더 간단해. 전체 <strong>O(N log N)</strong>.</span><span class="lang-cpp">C++ <code>priority_queue</code>는 기본이 최대 힙이라, 최소 힙으로 바꿔야 해.<br><code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code>처럼 <strong>greater&lt;int&gt;</strong>를 넣어주면 최소 힙이 돼!<br>그 뒤로는 <code>pq.push(x)</code>, <code>pq.top()</code>, <code>pq.pop()</code> 그대로 사용. 전체 <strong>O(N log N)</strong>.</span>'
                }
            ],
            templates: {
                python: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []
for _ in range(n):
    x = int(input())
    if x > 0:
        heapq.heappush(heap, x)
    else:
        if heap:
            print(heapq.heappop(heap))
        else:
            print(0)`,
                cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, x; cin >> n;
    priority_queue<int, vector<int>, greater<int>> pq;
    while (n--) {
        cin >> x;
        if (x > 0) pq.push(x);
        else { if (!pq.empty()) { cout << pq.top() << "\\n"; pq.pop(); } else cout << 0 << "\\n"; }
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '최소 힙 (heapq 기본)',
                    description: 'heapq를 그대로 사용합니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []
for _ in range(n):
    x = int(input())
    if x > 0:
        heapq.heappush(heap, x)
    else:
        if heap:
            print(heapq.heappop(heap))
        else:
            print(0)`,
                        cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, x; cin >> n;
    priority_queue<int, vector<int>, greater<int>> pq;
    while (n--) {
        cin >> x;
        if (x > 0) pq.push(x);
        else { if (!pq.empty()) { cout << pq.top() << "\\n"; pq.pop(); } else cout << 0 << "\\n"; }
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기화',
                                desc: 'heapq는 기본이 최소 힙이므로 그대로 사용하면 됩니다.',
                                code: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []`
                            },
                            {
                                title: '연산 처리',
                                desc: 'x가 자연수이면 heappush로 최소 힙에 삽입합니다.',
                                code: `for _ in range(n):
    x = int(input())
    if x > 0:
        heapq.heappush(heap, x)`
                            },
                            {
                                title: '출력',
                                desc: 'heappop은 항상 가장 작은 값을 꺼냅니다. 비어있으면 0 출력.',
                                code: `    else:
        if heap:
            print(heapq.heappop(heap))
        else:
            print(0)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기화',
                                desc: `greater<int>를 넣으면 최소 힙.
Python heapq와 같은 동작.`,
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, x;
    cin >> n;
    // greater<int> → 최소 힙 (Python heapq 기본과 동일)
    priority_queue<int, vector<int>, greater<int>> pq;`
                            },
                            {
                                title: '연산 처리',
                                desc: 'x > 0이면 push. greater<int> 덕분에 자동으로 최솟값이 top.',
                                code: `    while (n--) {
        cin >> x;
        if (x > 0) {
            pq.push(x);
        }`
                            },
                            {
                                title: '출력',
                                desc: 'top()이 최솟값. pop()으로 제거 후 출력합니다.',
                                code: `        else {
            if (!pq.empty()) {
                cout << pq.top() << '\\n';
                pq.pop();
            } else {
                cout << 0 << '\\n';
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
            id: 'boj-11286',
            title: 'BOJ 11286 - 절댓값 힙',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/11286',
            simIntro: '절댓값 힙에서 (abs(x), x) 튜플이 어떻게 정렬되는지 관찰하세요.',
            sim: {
                type: 'absHeap'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>절댓값 힙은 다음과 같은 연산을 지원하는 자료구조이다.</p>
                <p>배열에 정수 x (x ≠ 0)를 넣는다. 배열에서 절댓값이 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다. 절댓값이 가장 작은 값이 여러개일 때는, 가장 작은 수를 출력하고 그 값을 배열에서 제거한다.</p>
                <p>x가 0이 아니라면 배열에 x를 넣고, x가 0이라면 절댓값이 가장 작은 값을 출력하고 제거한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 연산의 개수 N(1 &le; N &le; 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 0이 아니라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 절댓값이 가장 작은 값을 출력하고, 그 값을 배열에서 제거하는 경우이다. 입력되는 정수는 -2<sup>31</sup>보다 크고, 2<sup>31</sup>보다 작다.</p>
                <h4>출력</h4>
                <p>입력에서 0이 주어진 회수만큼 답을 한 줄에 하나씩 출력한다. 만약 배열이 비어 있는 경우인데 절댓값이 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>18
1
-1
0
0
0
1
1
-1
-1
2
-2
0
0
0
0
0
0
0</pre></div>
                    <div><strong>출력</strong><pre>-1
1
0
-1
-1
1
1
-2
2
0</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 100,000</li>
                    <li>-2<sup>31</sup> < x < 2<sup>31</sup></li>
                    <li>x ≠ 0 (입력에서 0은 출력 명령)</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '"절댓값이 가장 작은 값을 꺼내라"니까... 배열에 숫자를 넣고, 0이 나오면 <strong>전부 절댓값을 비교해서</strong> 가장 작은 걸 찾으면 되지 않을까?<br><br>절댓값이 같은 게 여러 개면 그중 실제 값이 작은 걸 고르면 되고!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '매번 전체를 훑으면 <strong>O(N)</strong>이야. 연산이 최대 10만 번이면 또 시간 초과!<br><br>힙을 쓰면 될 것 같은데... 문제는 <strong>"절댓값 기준"</strong>이라는 거야.<br>일반 최소 힙은 실제 값 기준으로 정렬하니까, -1과 1 중에 -1을 먼저 꺼내버려. 우리는 둘 다 절댓값이 1이니까 동점 처리가 필요한데!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '힙에 숫자를 그냥 넣지 말고, <strong>(절댓값, 실제 값)</strong> 쌍으로 넣으면 어떨까?<br><br><div style="margin:10px 0;padding:10px 14px;background:var(--bg2);border-radius:8px;font-size:0.88em;"><div style="margin-bottom:6px;font-weight:600;color:var(--text);">입력 → 튜플 변환:</div><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;"><div style="padding:4px 10px;background:var(--bg);border:1px solid var(--bg3);border-radius:6px;"><code>1</code> → <code>(1, 1)</code></div><div style="padding:4px 10px;background:var(--bg);border:1px solid var(--bg3);border-radius:6px;"><code>-1</code> → <code>(1, -1)</code></div><div style="padding:4px 10px;background:var(--bg);border:1px solid var(--bg3);border-radius:6px;"><code>3</code> → <code>(3, 3)</code></div><div style="padding:4px 10px;background:var(--bg);border:1px solid var(--bg3);border-radius:6px;"><code>-3</code> → <code>(3, -3)</code></div></div><div style="margin-top:8px;font-weight:600;color:var(--text);">힙 정렬 순서 (위 → 아래):</div><div style="display:flex;gap:6px;margin-top:4px;justify-content:center;"><div style="padding:4px 10px;background:var(--green);color:#fff;border-radius:6px;font-weight:600;">(1,-1)</div><div style="padding:4px 10px;background:var(--accent);color:#fff;border-radius:6px;">(1, 1)</div><div style="padding:4px 10px;background:var(--accent);color:#fff;border-radius:6px;">(3,-3)</div><div style="padding:4px 10px;background:var(--accent);color:#fff;border-radius:6px;">(3, 3)</div></div></div>힙이 첫 번째 값(절댓값)으로 먼저 정렬하고, 같으면 두 번째 값(실제 값)으로 정렬하니까, <strong>절댓값이 같을 때 음수가 먼저</strong> 나오게 돼! 정확히 문제가 원하는 동작이야.'
                },
                {
                    title: '<span class="lang-py">Python</span><span class="lang-cpp">C++</span>에선 이렇게!',
                    content: '<span class="lang-py"><code>heapq.heappush(heap, (abs(x), x))</code>로 튜플을 넣고, 꺼낼 때 <code>heappop(heap)[1]</code>로 원래 값만 가져오면 끝!<br>Python 튜플 비교가 자동으로 (절댓값 → 실제 값) 순서로 정렬해줘서 코드가 아주 깔끔해.</span><span class="lang-cpp">C++에선 <strong>커스텀 비교 구조체</strong>를 만들어야 해:<br><code>struct cmp { bool operator()(int a, int b) { if(abs(a)==abs(b)) return a&gt;b; return abs(a)&gt;abs(b); } };</code><br>이러면 <code>priority_queue&lt;int, vector&lt;int&gt;, cmp&gt;</code>로 절댓값 기준 최소 힙을 만들 수 있어!<br>Python 튜플처럼 자동 비교가 안 되니까, 비교 함수를 직접 정의하는 거야.</span>'
                }
            ],
            templates: {
                python: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []
for _ in range(n):
    x = int(input())
    if x != 0:
        heapq.heappush(heap, (abs(x), x))
    else:
        if heap:
            print(heapq.heappop(heap)[1])
        else:
            print(0)`,
                cpp: `#include <iostream>
#include <queue>
#include <cstdlib>
using namespace std;
struct cmp { bool operator()(int a, int b) { if (abs(a)==abs(b)) return a>b; return abs(a)>abs(b); } };
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, x; cin >> n;
    priority_queue<int, vector<int>, cmp> pq;
    while (n--) { cin >> x; if (x!=0) pq.push(x); else { if (!pq.empty()) { cout << pq.top() << "\\n"; pq.pop(); } else cout << 0 << "\\n"; } }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '튜플 (abs(x), x)',
                    description: '절댓값과 실제 값을 튜플로 묶어 힙에 넣습니다.',
                    timeComplexity: 'O(N log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []
for _ in range(n):
    x = int(input())
    if x != 0:
        heapq.heappush(heap, (abs(x), x))
    else:
        if heap:
            print(heapq.heappop(heap)[1])
        else:
            print(0)`,
                        cpp: `#include <iostream>
#include <queue>
#include <cstdlib>
using namespace std;
struct cmp { bool operator()(int a, int b) { if (abs(a)==abs(b)) return a>b; return abs(a)>abs(b); } };
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, x; cin >> n;
    priority_queue<int, vector<int>, cmp> pq;
    while (n--) { cin >> x; if (x!=0) pq.push(x); else { if (!pq.empty()) { cout << pq.top() << "\\n"; pq.pop(); } else cout << 0 << "\\n"; } }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기화',
                                desc: '(|x|, x) 튜플을 힙에 넣어 절댓값 기준 정렬을 구현합니다.',
                                code: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []`
                            },
                            {
                                title: '연산 처리',
                                desc: '튜플 비교: 첫 번째 값(절댓값)으로 정렬, 같으면 두 번째 값(원래 값)으로 정렬.',
                                code: `for _ in range(n):
    x = int(input())
    if x != 0:
        heapq.heappush(heap, (abs(x), x))`
                            },
                            {
                                title: '출력',
                                desc: 'heappop()[1]로 튜플에서 원래 값만 꺼냅니다.',
                                code: `    else:
        if heap:
            print(heapq.heappop(heap)[1])
        else:
            print(0)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기화',
                                desc: `커스텀 비교 함수로 절댓값 기준 최소 힙 구현.
절댓값 같으면 실제 값이 작은 것 우선.`,
                                code: `#include <iostream>
#include <queue>
#include <cstdlib>
using namespace std;

// 커스텀 비교: |a|==|b|이면 실제 값 작은 것 우선
struct cmp {
    bool operator()(int a, int b) {
        if (abs(a) == abs(b)) return a > b;
        return abs(a) > abs(b);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, x;
    cin >> n;
    priority_queue<int, vector<int>, cmp> pq;`
                            },
                            {
                                title: '연산 처리',
                                desc: 'cmp 구조체 덕분에 push만 하면 절댓값 기준으로 자동 정렬됩니다.',
                                code: `    while (n--) {
        cin >> x;
        if (x != 0) {
            pq.push(x);
        }`
                            },
                            {
                                title: '출력',
                                desc: 'top()이 절댓값이 가장 작은 값. Python 튜플 방식과 동일한 결과.',
                                code: `        else {
            if (!pq.empty()) {
                cout << pq.top() << '\\n';
                pq.pop();
            } else {
                cout << 0 << '\\n';
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
            id: 'boj-2075',
            title: 'BOJ 2075 - N번째 큰 수',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/2075',
            simIntro: '크기 N인 최소 힙을 유지하면서 N번째 큰 수를 구하는 과정을 관찰하세요.',
            sim: {
                type: 'nthLargest'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N×N의 표에 수 N<sup>2</sup>개 채워져 있다. 채워진 수에는 한 가지 특징이 있는데, 모든 수는 자신의 한 칸 위에 있는 수보다 크다는 것이다. N번째 큰 수를 찾아라.</p>
                <p>메모리 제한은 12MB이다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 N(1 &le; N &le; 1,500)이 주어진다. 다음 N개의 줄에는 각 줄마다 N개의 수가 주어진다. 표에 적힌 수는 -10억보다 크거나 같고, 10억보다 작거나 같은 정수이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 N번째 큰 수를 출력한다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5
12 22 31 36 44
11 26 27 28 45
16 25 33 34 46
15 29 30 35 47
14 24 32 39 48</pre></div>
                    <div><strong>출력</strong><pre>35</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 1,500</li>
                    <li>표에 채워진 수는 모두 -10억 이상 10억 이하</li>
                    <li>메모리 제한 12MB</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'N번째 큰 수를 찾으라니까... N²개 숫자를 <strong>전부 배열에 넣고 정렬</strong>해서 N번째를 꺼내면 되지 않을까?<br><br>N이 1,500이면 숫자가 1,500 × 1,500 = <strong>225만 개</strong>. 정렬하면 답은 나올 것 같아!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '문제를 다시 보면... <strong>메모리 제한이 12MB</strong>야!<br>int 225만 개 = 약 9MB인데, 배열 자체만으로도 빠듯하고 정렬에 추가 메모리까지 필요하면 초과할 수 있어.<br><br>핵심은 "225만 개를 <strong>전부 저장하지 않고</strong>도 N번째 큰 수를 찾을 수 있느냐"야!'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '생각해보면, <strong>"상위 N개"만 기억</strong>하면 되잖아!<br><br><strong>크기 N짜리 최소 힙</strong>을 유지하는 거야:<br>1. 힙 크기가 N 미만이면 그냥 넣기<br>2. 힙 크기가 N이면, 새 값이 힙의 최솟값(루트)보다 <strong>클 때만</strong> 교체<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;text-align:center;font-size:0.88em;"><div style="font-weight:600;margin-bottom:8px;">크기 3 최소 힙 유지 과정 (N=3)</div><div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;"><div><div style="color:var(--text2);font-size:0.8em;">입력: 5,2,8</div><div style="display:flex;gap:4px;margin-top:4px;justify-content:center;"><span style="padding:3px 8px;background:var(--green);color:#fff;border-radius:4px;font-weight:600;">2</span><span style="padding:3px 8px;background:var(--accent);color:#fff;border-radius:4px;">5</span><span style="padding:3px 8px;background:var(--accent);color:#fff;border-radius:4px;">8</span></div></div><div style="display:flex;align-items:center;font-size:1.2em;color:var(--text2);">→</div><div><div style="color:var(--text2);font-size:0.8em;">입력: 9 (9 &gt; 2, 교체!)</div><div style="display:flex;gap:4px;margin-top:4px;justify-content:center;"><span style="padding:3px 8px;background:var(--green);color:#fff;border-radius:4px;font-weight:600;">5</span><span style="padding:3px 8px;background:var(--accent);color:#fff;border-radius:4px;">8</span><span style="padding:3px 8px;background:var(--accent);color:#fff;border-radius:4px;">9</span></div></div><div style="display:flex;align-items:center;font-size:1.2em;color:var(--text2);">→</div><div><div style="color:var(--text2);font-size:0.8em;">입력: 1 (1 &lt; 5, 무시)</div><div style="display:flex;gap:4px;margin-top:4px;justify-content:center;"><span style="padding:3px 8px;background:var(--green);color:#fff;border-radius:4px;font-weight:600;">5</span><span style="padding:3px 8px;background:var(--accent);color:#fff;border-radius:4px;">8</span><span style="padding:3px 8px;background:var(--accent);color:#fff;border-radius:4px;">9</span></div></div></div><div style="margin-top:6px;color:var(--green);font-weight:600;">루트(5) = 3번째 큰 수!</div></div>이러면 힙에는 항상 "지금까지 본 숫자 중 가장 큰 N개"만 남아. 다 읽은 후 <strong>힙의 루트(최솟값) = N번째 큰 수</strong>!<br>메모리도 N개만 저장하니까 12MB 여유있게 통과해.'
                },
                {
                    title: '<span class="lang-py">Python</span><span class="lang-cpp">C++</span>에선 이렇게!',
                    content: '<span class="lang-py">힙 크기 &lt; N이면 <code>heappush</code>, 아니면 새 값 &gt; <code>heap[0]</code>(루트)일 때만 <code>heapreplace(heap, x)</code>로 교체!<br><code>heapreplace</code>는 pop+push를 한 번에 해줘서 효율적이야.<br>마지막에 <code>heap[0]</code>이 정답. 전체 <strong>O(N² log N)</strong>.</span><span class="lang-cpp"><code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code>로 최소 힙을 만들어.<br>힙 크기 &lt; N이면 <code>pq.push(x)</code>, 아니면 <code>x &gt; pq.top()</code>일 때 <code>pq.pop(); pq.push(x);</code>로 교체!<br>마지막에 <code>pq.top()</code>이 정답. 전체 <strong>O(N² log N)</strong>.</span>'
                }
            ],
            templates: {
                python: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []
for _ in range(n):
    row = list(map(int, input().split()))
    for x in row:
        if len(heap) < n:
            heapq.heappush(heap, x)
        elif x > heap[0]:
            heapq.heapreplace(heap, x)
print(heap[0])`,
                cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, x; cin >> n;
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 0; i < n*n; i++) { cin >> x; if ((int)pq.size()<n) pq.push(x); else if (x>pq.top()) { pq.pop(); pq.push(x); } }
    cout << pq.top() << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '크기 제한 최소 힙',
                    description: '힙 크기를 N으로 유지하며 N번째 큰 수를 구합니다.',
                    timeComplexity: 'O(N² log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []
for _ in range(n):
    row = list(map(int, input().split()))
    for x in row:
        if len(heap) < n:
            heapq.heappush(heap, x)
        elif x > heap[0]:
            heapq.heapreplace(heap, x)
print(heap[0])`,
                        cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, x; cin >> n;
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 0; i < n*n; i++) { cin >> x; if ((int)pq.size()<n) pq.push(x); else if (x>pq.top()) { pq.pop(); pq.push(x); } }
    cout << pq.top() << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: '힙 크기를 N으로 제한하여 메모리 12MB 제한을 지킵니다.',
                                code: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
heap = []`
                            },
                            {
                                title: '힙 유지',
                                desc: '힙 크기 < N이면 push, 아니면 새 값 > 루트일 때만 heapreplace로 교체합니다.',
                                code: `for _ in range(n):
    row = list(map(int, input().split()))
    for x in row:
        if len(heap) < n:
            heapq.heappush(heap, x)
        elif x > heap[0]:
            heapq.heapreplace(heap, x)`
                            },
                            {
                                title: '출력',
                                desc: '크기 N 최소 힙의 루트가 곧 N번째 큰 수입니다.',
                                code: 'print(heap[0])'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력',
                                desc: `최소 힙으로 크기 N을 유지.
N²개를 다 저장하면 메모리 초과(12MB)!`,
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, x;
    cin >> n;
    // 최소 힙: 크기 N을 유지하면 루트 = N번째 큰 수
    priority_queue<int, vector<int>, greater<int>> pq;`
                            },
                            {
                                title: '힙 유지',
                                desc: `힙 크기 < N이면 그냥 push.
새 값 > 힙 루트일 때만 pop 후 push (heapreplace 대응).`,
                                code: `    for (int i = 0; i < n * n; i++) {
        cin >> x;
        if ((int)pq.size() < n) {
            pq.push(x);
        } else if (x > pq.top()) {
            pq.pop();   // 가장 작은 값 제거
            pq.push(x); // 더 큰 값으로 교체
        }
    }`
                            },
                            {
                                title: '출력',
                                desc: 'top()이 N번째 큰 수. Python의 heap[0]과 동일한 역할.',
                                code: `    cout << pq.top() << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2696',
            title: 'BOJ 2696 - 중앙값 구하기',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/2696',
            simIntro: '최대 힙 + 최소 힙으로 중앙값을 실시간으로 구하는 과정을 관찰하세요.',
            sim: {
                type: 'medianHeap'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>어떤 수열을 읽고, 홀수 번째 수를 읽을 때마다 지금까지 읽은 값의 중앙값을 출력하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스의 첫째 줄에는 수열의 크기 M이 주어지고, 그 다음 줄부터 수열의 원소가 한 줄에 10개씩 나누어 주어진다. M은 9999 이하의 홀수이다.</p>
                <h4>출력</h4>
                <p>각 테스트 케이스에 대해, 첫째 줄에 중앙값의 개수를 출력하고, 그 다음 줄부터 중앙값을 한 줄에 10개씩 출력한다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3
9
1 2 3 4 5 6 7 8 9
9
9 8 7 6 5 4 3 2 1
23
23 41 13 22 -3 24 -31 -11 -8 -7
3 5 103 211 -311 -45 0 1 2 3
0 -2 99</pre></div>
                    <div><strong>출력</strong><pre>5
1 2 3 4 5
5
9 9 8 7 6
12
23 23 22 22 13 3 5 5 3 0 0 -2</pre></div>
                </div>
                <p class="example-explain">출력 첫 줄: 중앙값 개수, 이후 줄: 중앙값을 한 줄에 최대 10개씩 출력한다.</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>T ≤ 1,000 (테스트 케이스 수)</li>
                    <li>M은 9,999 이하의 홀수</li>
                    <li>수열의 각 값은 -32,768 ~ 32,767</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '홀수 번째 수를 읽을 때마다 "지금까지의 중앙값"을 출력하라니까...<br>매번 <strong>지금까지 읽은 숫자를 정렬</strong>하고 가운데 값을 꺼내면 되지 않을까?<br><br>예: [1, 2, 3, 4, 5] → 정렬 → 가운데(3번째) = 3!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '숫자가 하나 들어올 때마다 전체를 정렬하면 <strong>O(N log N)</strong>이야.<br>M이 최대 9,999이면 매 홀수 번째마다 정렬 → 약 5,000 × 10,000 × log(10,000) ≈ <strong>6억 번</strong>... 시간 초과 위험!<br><br>숫자가 하나 추가될 때마다 <strong>정렬을 다시 하는 건 낭비</strong>야. 이미 정렬된 상태에서 하나만 추가되는 건데...'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '핵심 아이디어: 수열을 <strong>절반으로 나눠서</strong> 관리하자!<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.88em;"><div style="display:flex;gap:20px;justify-content:center;align-items:flex-start;flex-wrap:wrap;"><div style="text-align:center;flex:1;min-width:120px;"><div style="font-weight:700;color:var(--accent);margin-bottom:6px;">최대 힙 (maxH)</div><div style="font-size:0.82em;color:var(--text2);margin-bottom:6px;">작은 쪽 절반</div><div style="display:flex;flex-direction:column;align-items:center;gap:3px;"><span style="padding:4px 14px;background:var(--green);color:#fff;border-radius:6px;font-weight:700;font-size:1.1em;">3 ← 루트</span><span style="padding:3px 10px;background:var(--accent);color:#fff;border-radius:4px;">1</span><span style="padding:3px 10px;background:var(--accent);color:#fff;border-radius:4px;">2</span></div></div><div style="display:flex;align-items:center;font-size:1.5em;color:var(--text2);padding-top:30px;">|</div><div style="text-align:center;flex:1;min-width:120px;"><div style="font-weight:700;color:var(--accent);margin-bottom:6px;">최소 힙 (minH)</div><div style="font-size:0.82em;color:var(--text2);margin-bottom:6px;">큰 쪽 절반</div><div style="display:flex;flex-direction:column;align-items:center;gap:3px;"><span style="padding:3px 10px;background:var(--accent);color:#fff;border-radius:4px;">5</span><span style="padding:3px 10px;background:var(--accent);color:#fff;border-radius:4px;">7</span></div></div></div><div style="text-align:center;margin-top:8px;color:var(--green);font-weight:600;">maxH 루트(3) = 중앙값!</div></div>• <strong>최대 힙(maxH)</strong>: 작은 쪽 절반 → 이 중 가장 큰 값이 루트<br>• <strong>최소 힙(minH)</strong>: 큰 쪽 절반 → 이 중 가장 작은 값이 루트<br><br>두 힙의 크기를 균형 맞추면 (maxH 크기 ≥ minH 크기), <strong>maxH의 루트가 바로 중앙값</strong>이야!<br><br>새 숫자가 들어오면:<br>1. maxH 루트보다 작으면 maxH에, 크면 minH에 넣기<br>2. 크기가 불균형하면 한쪽에서 다른 쪽으로 옮기기<br><br>삽입+균형 맞추기가 <strong>O(log N)</strong>이라서 전체 <strong>O(M log M)</strong>으로 해결!'
                },
                {
                    title: '<span class="lang-py">Python</span><span class="lang-cpp">C++</span>에선 이렇게!',
                    content: '<span class="lang-py"><code>heapq</code>는 최소 힙이라, maxH는 <strong>-1 곱하기 트릭</strong>을 써야 해.<br><code>heappush(maxH, -x)</code>로 넣고, 루트는 <code>-maxH[0]</code>으로 확인.<br>균형 맞추기: maxH가 2개 더 많으면 minH로, minH가 더 많으면 maxH로 옮기기!</span><span class="lang-cpp">C++은 <code>priority_queue&lt;int&gt;</code>가 기본 최대 힙이라 maxH는 그대로!<br>minH는 <code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code>로 최소 힙.<br><code>maxH.top()</code>이 곧 중앙값. Python처럼 -1 곱할 필요가 없어서 더 직관적이야.</span>'
                }
            ],
            templates: {
                python: `import sys
import heapq
input = sys.stdin.readline

T = int(input())
for _ in range(T):
    M = int(input())
    nums = []
    while len(nums) < M:
        nums.extend(map(int, input().split()))
    maxH, minH, medians = [], [], []
    for i, x in enumerate(nums):
        if not maxH or x <= -maxH[0]:
            heapq.heappush(maxH, -x)
        else:
            heapq.heappush(minH, x)
        if len(maxH) > len(minH) + 1:
            heapq.heappush(minH, -heapq.heappop(maxH))
        elif len(minH) > len(maxH):
            heapq.heappush(maxH, -heapq.heappop(minH))
        if (i + 1) % 2 == 1:
            medians.append(-maxH[0])
    print(len(medians))
    for i in range(0, len(medians), 10):
        print(' '.join(map(str, medians[i:i+10])))`,
                cpp: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int T; cin >> T;
    while (T--) {
        int M; cin >> M;
        priority_queue<int> maxH;
        priority_queue<int, vector<int>, greater<int>> minH;
        vector<int> med;
        for (int i = 0; i < M; i++) {
            int x; cin >> x;
            if (maxH.empty()||x<=maxH.top()) maxH.push(x); else minH.push(x);
            if ((int)maxH.size()>(int)minH.size()+1){minH.push(maxH.top());maxH.pop();}
            else if ((int)minH.size()>(int)maxH.size()){maxH.push(minH.top());minH.pop();}
            if ((i+1)%2==1) med.push_back(maxH.top());
        }
        cout << med.size() << "\\n";
        for (int i=0;i<(int)med.size();i++){cout<<med[i];if((i+1)%10==0||i==(int)med.size()-1)cout<<"\\n";else cout<<" ";}
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '두 개의 힙',
                    description: '최대 힙 + 최소 힙으로 중앙값을 실시간 유지합니다.',
                    timeComplexity: 'O(M log M)',
                    spaceComplexity: 'O(M)',
                    templates: {
                        python: `import sys
import heapq
input = sys.stdin.readline

T = int(input())
for _ in range(T):
    M = int(input())
    nums = []
    while len(nums) < M:
        nums.extend(map(int, input().split()))
    maxH, minH, medians = [], [], []
    for i, x in enumerate(nums):
        if not maxH or x <= -maxH[0]:
            heapq.heappush(maxH, -x)
        else:
            heapq.heappush(minH, x)
        if len(maxH) > len(minH) + 1:
            heapq.heappush(minH, -heapq.heappop(maxH))
        elif len(minH) > len(maxH):
            heapq.heappush(maxH, -heapq.heappop(minH))
        if (i + 1) % 2 == 1:
            medians.append(-maxH[0])
    print(len(medians))
    for i in range(0, len(medians), 10):
        print(' '.join(map(str, medians[i:i+10])))`,
                        cpp: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int T; cin >> T;
    while (T--) {
        int M; cin >> M;
        priority_queue<int> maxH;
        priority_queue<int, vector<int>, greater<int>> minH;
        vector<int> med;
        for (int i = 0; i < M; i++) {
            int x; cin >> x;
            if (maxH.empty()||x<=maxH.top()) maxH.push(x); else minH.push(x);
            if ((int)maxH.size()>(int)minH.size()+1){minH.push(maxH.top());maxH.pop();}
            else if ((int)minH.size()>(int)maxH.size()){maxH.push(minH.top());minH.pop();}
            if ((i+1)%2==1) med.push_back(maxH.top());
        }
        cout << med.size() << "\\n";
        for (int i=0;i<(int)med.size();i++){cout<<med[i];if((i+1)%10==0||i==(int)med.size()-1)cout<<"\\n";else cout<<" ";}
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 초기화',
                                desc: '두 개의 힙(최대 힙 + 최소 힙)으로 중앙값을 실시간 유지합니다.',
                                code: `import sys
import heapq
input = sys.stdin.readline

T = int(input())
for _ in range(T):
    M = int(input())
    nums = []
    while len(nums) < M:
        nums.extend(map(int, input().split()))`
                            },
                            {
                                title: '힙 삽입 및 균형',
                                desc: 'maxH(작은 절반)과 minH(큰 절반) 크기를 균형 맞춰 maxH 루트 = 중앙값.',
                                code: `    maxH, minH, medians = [], [], []
    for i, x in enumerate(nums):
        if not maxH or x <= -maxH[0]:
            heapq.heappush(maxH, -x)
        else:
            heapq.heappush(minH, x)
        if len(maxH) > len(minH) + 1:
            heapq.heappush(minH, -heapq.heappop(maxH))
        elif len(minH) > len(maxH):
            heapq.heappush(maxH, -heapq.heappop(minH))`
                            },
                            {
                                title: '중앙값 출력',
                                desc: '홀수 번째마다 maxH 루트(-maxH[0])가 중앙값. 10개씩 줄바꿈 출력.',
                                code: `        if (i + 1) % 2 == 1:
            medians.append(-maxH[0])
    print(len(medians))
    for i in range(0, len(medians), 10):
        print(' '.join(map(str, medians[i:i+10])))`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 초기화',
                                desc: `C++ priority_queue는 기본이 최대 힙 → maxH는 그대로.
minH는 greater<int>로 최소 힙.`,
                                code: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T;
    cin >> T;
    while (T--) {
        int M;
        cin >> M;
        priority_queue<int> maxH;  // 최대 힙 (작은 절반)
        priority_queue<int, vector<int>, greater<int>> minH;  // 최소 힙 (큰 절반)
        vector<int> med;`
                            },
                            {
                                title: '힙 삽입 및 균형',
                                desc: `maxH 크기 ≥ minH 크기 유지.
maxH의 top = 중앙값.`,
                                code: `        for (int i = 0; i < M; i++) {
            int x;
            cin >> x;
            // 작은 절반 또는 큰 절반에 삽입
            if (maxH.empty() || x <= maxH.top())
                maxH.push(x);
            else
                minH.push(x);
            // 균형 맞추기: maxH 크기 ≥ minH 크기
            if ((int)maxH.size() > (int)minH.size() + 1) {
                minH.push(maxH.top()); maxH.pop();
            } else if ((int)minH.size() > (int)maxH.size()) {
                maxH.push(minH.top()); minH.pop();
            }`
                            },
                            {
                                title: '중앙값 출력',
                                desc: '홀수 번째마다 maxH.top()이 중앙값. 한 줄에 10개씩 출력합니다.',
                                code: `            if ((i + 1) % 2 == 1)
                med.push_back(maxH.top());
        }
        cout << med.size() << '\\n';
        for (int i = 0; i < (int)med.size(); i++) {
            cout << med[i];
            if ((i + 1) % 10 == 0 || i == (int)med.size() - 1)
                cout << '\\n';
            else
                cout << ' ';
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
            id: 'boj-1202',
            title: 'BOJ 1202 - 보석 도둑',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/1202',
            simIntro: '가방을 작은 순서대로 처리하면서 그리디 + 힙으로 최적해를 구하는 과정을 관찰하세요.',
            sim: {
                type: 'jewelThief'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>세계적인 도둑 상덕이는 보석점을 털기로 했다. 보석점에 있는 보석 개수는 총 N개이다. 각 보석은 무게 M<sub>i</sub>와 가격 V<sub>i</sub>를 가지고 있다. 상덕이는 가방을 K개 가지고 있고, 각 가방에 담을 수 있는 최대 무게는 C<sub>i</sub>이다. 가방에는 최대 한 개의 보석만 넣을 수 있다.</p>
                <p>상덕이가 훔칠 수 있는 보석의 최대 가격을 구하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 N과 K가 주어진다. (1 &le; N, K &le; 300,000)</p>
                <p>다음 N개 줄에는 각 보석의 무게 M<sub>i</sub>와 가격 V<sub>i</sub>가 주어진다. (0 &le; M<sub>i</sub>, V<sub>i</sub> &le; 1,000,000)</p>
                <p>다음 K개 줄에는 가방에 담을 수 있는 최대 무게 C<sub>i</sub>가 주어진다. (1 &le; C<sub>i</sub> &le; 100,000,000)</p>
                <h4>출력</h4>
                <p>첫째 줄에 상덕이가 훔칠 수 있는 보석 가격의 합의 최댓값을 출력한다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>2 1
5 10
100 100
11</pre></div>
                    <div><strong>출력</strong><pre>10</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3 2
1 65
5 23
2 99
10
2</pre></div>
                    <div><strong>출력</strong><pre>164</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N, K ≤ 300,000</li>
                    <li>0 ≤ M<sub>i</sub>, V<sub>i</sub> ≤ 1,000,000</li>
                    <li>1 ≤ C<sub>i</sub> ≤ 100,000,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '가방마다 보석 하나씩 넣으니까... 각 가방에 <strong>들어갈 수 있는 보석 중 가장 비싼 걸</strong> 넣으면 최대 이득 아닌가?<br><br>가방마다 모든 보석을 확인해서 "무게가 맞고 가장 비싼 것"을 골라 넣자!'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: 'N, K가 최대 30만이면, 가방 30만 개 × 보석 30만 개 = <strong>900억 번</strong> 비교... 완전히 시간 초과!<br><br>게다가 한 보석을 가방 A에 넣으면 가방 B에 못 넣으니까, <strong>어떤 가방에 어떤 보석을 배정하느냐</strong>가 중요해. 단순 완전 탐색으론 안 돼.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<strong>그리디 전략</strong>: 가방을 <strong>용량이 작은 순서</strong>대로 처리하자!<br><br>왜 작은 가방부터? 작은 가방에 들어가는 보석은 큰 가방에도 들어가지만, 반대는 아니거든. 그래서 <strong>선택지가 적은 가방부터</strong> 처리하는 게 최적이야.<br><br><div style="margin:10px 0;padding:12px;background:var(--bg2);border-radius:8px;font-size:0.85em;"><div style="font-weight:600;margin-bottom:8px;text-align:center;">가방 용량순 처리 예시</div><table style="border-collapse:collapse;width:100%;"><tr style="background:var(--bg3);"><th style="padding:5px 8px;border:1px solid var(--bg3);font-size:0.9em;">단계</th><th style="padding:5px 8px;border:1px solid var(--bg3);font-size:0.9em;">가방 용량</th><th style="padding:5px 8px;border:1px solid var(--bg3);font-size:0.9em;">힙에 추가</th><th style="padding:5px 8px;border:1px solid var(--bg3);font-size:0.9em;">선택</th></tr><tr><td style="padding:5px 8px;border:1px solid var(--bg3);text-align:center;">1</td><td style="padding:5px 8px;border:1px solid var(--bg3);text-align:center;">2</td><td style="padding:5px 8px;border:1px solid var(--bg3);">무게≤2: (1,65), (2,99)</td><td style="padding:5px 8px;border:1px solid var(--bg3);color:var(--green);font-weight:600;">99 선택!</td></tr><tr><td style="padding:5px 8px;border:1px solid var(--bg3);text-align:center;">2</td><td style="padding:5px 8px;border:1px solid var(--bg3);text-align:center;">10</td><td style="padding:5px 8px;border:1px solid var(--bg3);">무게≤10: (5,23) 추가</td><td style="padding:5px 8px;border:1px solid var(--bg3);color:var(--green);font-weight:600;">65 선택!</td></tr></table><div style="margin-top:6px;text-align:center;color:var(--green);font-weight:600;">합계 = 99 + 65 = 164</div></div>각 가방을 처리할 때:<br>1. 이 가방에 <strong>무게가 맞는 보석</strong>을 전부 최대 힙에 넣기<br>2. 힙에서 <strong>가장 비싼 보석</strong>을 하나 꺼내기<br><br>보석도 무게순 정렬해두면, 포인터 하나로 "아직 안 넣은 보석 중 무게가 맞는 것"을 순서대로 넣을 수 있어!'
                },
                {
                    title: '<span class="lang-py">Python</span><span class="lang-cpp">C++</span>에선 이렇게!',
                    content: '<span class="lang-py">보석은 무게순 정렬, 가방은 용량순 정렬.<br>포인터 <code>j</code>로 보석을 순서대로 탐색하면서 <code>heappush(heap, -v)</code>로 가격을 최대 힙에 넣기. (-1 곱하기 트릭!)<br>각 가방마다 <code>-heappop(heap)</code>으로 가장 비싼 보석 선택.<br>전체 <strong>O((N+K) log N)</strong>으로 통과!</span><span class="lang-cpp">C++ <code>priority_queue&lt;int&gt;</code>는 기본이 최대 힙이라 가격을 그대로 넣으면 돼!<br>포인터 <code>j</code>로 보석을 무게순 탐색하면서 <code>pq.push(v)</code>로 넣고, 각 가방마다 <code>pq.top()</code>으로 가장 비싼 보석 선택.<br>답이 int 범위를 넘을 수 있으니 <code>long long</code> 사용! 전체 <strong>O((N+K) log N)</strong>.</span>'
                }
            ],
            templates: {
                python: `import sys
import heapq
input = sys.stdin.readline

N, K = map(int, input().split())
jewels = []
for _ in range(N):
    m, v = map(int, input().split())
    jewels.append((m, v))
bags = [int(input()) for _ in range(K)]

jewels.sort()
bags.sort()

answer = 0
heap = []
j = 0
for bag in bags:
    while j < N and jewels[j][0] <= bag:
        heapq.heappush(heap, -jewels[j][1])
        j += 1
    if heap:
        answer += -heapq.heappop(heap)
print(answer)`,
                cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int N, K; cin >> N >> K;
    vector<pair<int,int>> jewels(N); vector<int> bags(K);
    for (int i=0;i<N;i++) cin >> jewels[i].first >> jewels[i].second;
    for (int i=0;i<K;i++) cin >> bags[i];
    sort(jewels.begin(),jewels.end()); sort(bags.begin(),bags.end());
    priority_queue<int> pq; long long ans=0; int j=0;
    for (int i=0;i<K;i++){while(j<N&&jewels[j].first<=bags[i]){pq.push(jewels[j].second);j++;}if(!pq.empty()){ans+=pq.top();pq.pop();}}
    cout << ans << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '그리디 + 최대 힙',
                    description: '가방 순서대로 처리하며 최대 힙으로 가장 비싼 보석을 선택합니다.',
                    timeComplexity: 'O((N+K) log N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
import heapq
input = sys.stdin.readline

N, K = map(int, input().split())
jewels = []
for _ in range(N):
    m, v = map(int, input().split())
    jewels.append((m, v))
bags = [int(input()) for _ in range(K)]

jewels.sort()
bags.sort()

answer = 0
heap = []
j = 0
for bag in bags:
    while j < N and jewels[j][0] <= bag:
        heapq.heappush(heap, -jewels[j][1])
        j += 1
    if heap:
        answer += -heapq.heappop(heap)
print(answer)`,
                        cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;
int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int N, K; cin >> N >> K;
    vector<pair<int,int>> jewels(N); vector<int> bags(K);
    for (int i=0;i<N;i++) cin >> jewels[i].first >> jewels[i].second;
    for (int i=0;i<K;i++) cin >> bags[i];
    sort(jewels.begin(),jewels.end()); sort(bags.begin(),bags.end());
    priority_queue<int> pq; long long ans=0; int j=0;
    for (int i=0;i<K;i++){while(j<N&&jewels[j].first<=bags[i]){pq.push(jewels[j].second);j++;}if(!pq.empty()){ans+=pq.top();pq.pop();}}
    cout << ans << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 및 정렬',
                                desc: '보석은 무게순, 가방은 용량순 정렬. 작은 가방부터 처리하기 위함.',
                                code: `import sys
import heapq
input = sys.stdin.readline

N, K = map(int, input().split())
jewels = []
for _ in range(N):
    m, v = map(int, input().split())
    jewels.append((m, v))
bags = [int(input()) for _ in range(K)]
jewels.sort()
bags.sort()`
                            },
                            {
                                title: '그리디 + 힙',
                                desc: '가방마다 담을 수 있는 보석을 최대 힙에 넣고, 가장 비싼 것을 선택합니다.',
                                code: `answer = 0
heap = []
j = 0
for bag in bags:
    while j < N and jewels[j][0] <= bag:
        heapq.heappush(heap, -jewels[j][1])
        j += 1
    if heap:
        answer += -heapq.heappop(heap)`
                            },
                            {
                                title: '출력',
                                desc: '모든 가방을 처리한 뒤 누적 가격 합을 출력합니다.',
                                code: 'print(answer)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 및 정렬',
                                desc: `pair<무게, 가격>으로 정렬 → 무게 기준 자동 정렬.
가방도 용량 작은 순서로 정렬.`,
                                code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, K;
    cin >> N >> K;
    vector<pair<int,int>> jewels(N);  // {무게, 가격}
    vector<int> bags(K);
    for (int i = 0; i < N; i++)
        cin >> jewels[i].first >> jewels[i].second;
    for (int i = 0; i < K; i++)
        cin >> bags[i];
    sort(jewels.begin(), jewels.end());
    sort(bags.begin(), bags.end());`
                            },
                            {
                                title: '그리디 + 힙',
                                desc: `가방마다 들어갈 수 있는 보석을 최대 힙에 넣고,
가장 비싼 보석을 꺼냄.
C++ priority_queue는 기본이 최대 힙이라 -1 곱할 필요 없음.`,
                                code: `    priority_queue<int> pq;  // 최대 힙: 가장 비싼 보석이 top
    long long ans = 0;
    int j = 0;
    for (int i = 0; i < K; i++) {
        // 현재 가방에 들어갈 수 있는 보석 모두 힙에 넣기
        while (j < N && jewels[j].first <= bags[i]) {
            pq.push(jewels[j].second);
            j++;
        }
        if (!pq.empty()) {
            ans += pq.top();
            pq.pop();
        }
    }`
                            },
                            {
                                title: '출력',
                                desc: 'long long으로 누적한 총 가격을 출력합니다.',
                                code: `    cout << ans << endl;
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
