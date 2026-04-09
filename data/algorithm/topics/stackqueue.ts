import type { AlgoTopic } from '../types'

export const stackQueueTopic: AlgoTopic = {
    id: 'stackqueue',
    title: '스택과 큐',
    icon: '📦',
    category: '기초 (Bronze~Silver)',
    order: 3,
    description: 'LIFO 스택과 FIFO 큐의 원리, 괄호 검증, 덱 활용',
    titleEn: 'Stack & Queue',
    categoryEn: 'Basics (Bronze~Silver)',
    descriptionEn: 'LIFO stack and FIFO queue principles, bracket validation, deque usage',
    track: 'both',
    stages: [
        {
            num: 1,
            title: '스택 구현하기',
            titleEn: 'Implementing a Stack',
            problemIds: [
                'boj-10828'
            ],
            desc: '스택의 기본 명령어를 직접 구현해보기 (Silver IV)',
            descEn: 'Implement basic stack commands yourself (Silver IV)'
        },
        {
            num: 2,
            title: '기본 스택·큐 다루기',
            titleEn: 'Basic Stack & Queue',
            problemIds: [
                'boj-10773',
                'lc-20'
            ],
            desc: '스택과 큐의 기본 연산과 괄호 검증 (Silver~Easy)',
            descEn: 'Basic stack/queue operations and bracket validation (Silver~Easy)'
        },
        {
            num: 3,
            title: '스택·큐 응용',
            titleEn: 'Applied Stack & Queue',
            problemIds: [
                'boj-2164',
                'lc-155'
            ],
            desc: '덱 활용과 단조 스택 (Silver~Medium)',
            descEn: 'Deque usage and monotonic stack (Silver~Medium)'
        }
    ],
    problems: [
        {
            id: 'boj-10828',
            title: 'BOJ 10828 - 스택',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/10828',
            simIntro: 'push, pop, size, empty, top 명령어가 스택에서 어떻게 동작하는지 한 단계씩 확인해보세요.',
            sim: {
                type: 'stackImpl'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>정수를 저장하는 스택을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.</p>
                <p>명령은 총 다섯 가지이다.</p>
                <ul>
                    <li><code>push X</code>: 정수 X를 스택에 넣는 연산이다.</li>
                    <li><code>pop</code>: 스택에서 가장 위에 있는 정수를 빼고, 그 수를 출력한다. 만약 스택이 비어있는 경우에는 -1을 출력한다.</li>
                    <li><code>size</code>: 스택에 들어있는 정수의 개수를 출력한다.</li>
                    <li><code>empty</code>: 스택이 비어있으면 1, 아니면 0을 출력한다.</li>
                    <li><code>top</code>: 스택의 가장 위에 있는 정수를 출력한다. 만약 스택이 비어있는 경우에는 -1을 출력한다.</li>
                </ul>
                <h4>입력</h4>
                <p>첫째 줄에 주어지는 명령의 수 N (1 &le; N &le; 10,000)이 주어진다. 둘째 줄부터 N개의 줄에는 명령이 하나씩 주어진다. 주어지는 정수는 1보다 크거나 같고, 100,000보다 작거나 같다. 문제에 나와있지 않은 명령이 주어지는 경우는 없다.</p>
                <h4>출력</h4>
                <p>출력해야하는 명령이 주어질 때마다, 한 줄에 하나씩 출력한다.</p>

                <div class="problem-example"><h4>예제</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>14
push 1
push 2
top
size
pop
push 3
empty
pop
pop
pop
push 4
empty
top
pop</pre></div>
                    <div><strong>출력</strong><pre>2
2
2
0
3
1
-1
0
4
4</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; N &le; 10,000</li>
                    <li>1 &le; X &le; 100,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '스택이 뭐지?',
                    content: '스택은 <strong>"접시 쌓기"</strong>와 같아요!<br><br>접시를 위에 하나씩 쌓고, 뺄 때도 맨 위에서만 빼요.<br>마지막에 넣은 것을 가장 먼저 빼는 구조 — 이걸 <strong>LIFO (Last In, First Out)</strong>라고 합니다.<div style="display:flex;justify-content:center;margin:12px 0 8px;"><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="font-size:0.75rem;color:var(--text3);">← top</div><div style="display:flex;flex-direction:column-reverse;align-items:center;gap:3px;padding:8px 16px;border:2px solid var(--bg3);border-radius:8px;min-height:80px;background:var(--bg2);"><div style="padding:4px 18px;background:var(--accent);color:white;border-radius:6px;font-size:0.85rem;font-weight:600;">1</div><div style="padding:4px 18px;background:var(--accent);color:white;border-radius:6px;font-size:0.85rem;font-weight:600;">2</div><div style="padding:4px 18px;background:var(--green);color:white;border-radius:6px;font-size:0.85rem;font-weight:600;">3</div></div><div style="font-size:0.75rem;color:var(--text3);margin-top:2px;">push 순서: 1→2→3</div></div></div>이 문제는 이 LIFO 구조를 직접 구현해서 5가지 명령어를 처리하는 거예요!'
                },
                {
                    title: '5가지 명령어 정리',
                    content: '각 명령어가 하는 일을 정리하면:<br><br>📥 <strong>push X</strong> → 스택 맨 위에 X를 넣는다 (출력 없음)<br>📤 <strong>pop</strong> → 맨 위 값을 출력하고 제거. 비어있으면 -1<br>📏 <strong>size</strong> → 현재 스택에 들어있는 개수 출력<br>❓ <strong>empty</strong> → 비어있으면 1, 아니면 0 출력<br>👀 <strong>top</strong> → 맨 위 값을 출력 (제거 안 함). 비어있으면 -1<div style="display:flex;justify-content:center;gap:24px;margin:12px 0 8px;flex-wrap:wrap;"><div style="text-align:center;"><div style="font-size:0.8rem;color:var(--text2);font-weight:600;margin-bottom:4px;">pop (꺼내고 제거)</div><div style="display:flex;flex-direction:column-reverse;align-items:center;gap:3px;padding:8px 14px;border:2px solid var(--bg3);border-radius:8px;min-height:60px;background:var(--bg2);"><div style="padding:3px 14px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">A</div><div style="padding:3px 14px;background:var(--red);color:white;border-radius:5px;font-size:0.8rem;opacity:0.5;text-decoration:line-through;">B</div></div></div><div style="text-align:center;"><div style="font-size:0.8rem;color:var(--text2);font-weight:600;margin-bottom:4px;">top (보기만)</div><div style="display:flex;flex-direction:column-reverse;align-items:center;gap:3px;padding:8px 14px;border:2px solid var(--bg3);border-radius:8px;min-height:60px;background:var(--bg2);"><div style="padding:3px 14px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">A</div><div style="padding:3px 14px;background:var(--yellow);color:var(--text);border-radius:5px;font-size:0.8rem;box-shadow:0 0 6px var(--yellow);">B</div></div></div></div><strong>pop과 top의 차이</strong>: pop은 꺼내고 제거, top은 보기만!'
                },
                {
                    title: '어떤 자료구조로 구현하지?',
                    content: '<span class="lang-py">Python에서는 <strong>리스트(list)</strong>가 곧 스택입니다!<br><br><code>append(x)</code> → push (맨 뒤에 추가)<br><code>pop()</code> → pop (맨 뒤에서 제거 + 반환)<br><code>stack[-1]</code> → top (맨 뒤 값 확인)<br><code>len(stack)</code> → size<br><br>모두 <strong>O(1)</strong>이라 빠릅니다!<br><a href="https://docs.python.org/3/tutorial/datastructures.html#using-lists-as-stacks" target="_blank" style="font-size:0.85rem;color:var(--accent);">Python 공식 문서: 리스트를 스택으로 쓰기 ↗</a></span><span class="lang-cpp">C++에서는 <code>vector&lt;int&gt;</code>나 <code>stack&lt;int&gt;</code>를 쓸 수 있어요.<br><br><code>push_back(x)</code> / <code>push(x)</code> → push<br><code>pop_back()</code> / <code>pop()</code> → pop (값은 미리 저장!)<br><code>back()</code> / <code>top()</code> → top<br><code>size()</code> → size<br><br>모두 <strong>O(1)</strong> 연산입니다!<br><a href="https://en.cppreference.com/w/cpp/container/stack" target="_blank" style="font-size:0.85rem;color:var(--accent);">C++ stack 레퍼런스 ↗</a></span>'
                },
                {
                    title: '빈 스택 처리가 핵심!',
                    content: '<strong>pop</strong>과 <strong>top</strong>은 스택이 비어있을 때 -1을 출력해야 해요.<br><br>이걸 빠뜨리면 런타임 에러가 나요! (빈 스택에서 꺼내려고 하니까)<div style="display:flex;justify-content:center;margin:10px 0;"><div style="padding:8px 16px;background:var(--red);color:white;border-radius:8px;font-size:0.85rem;opacity:0.9;">⚠️ 빈 스택에서 pop() → 런타임 에러!</div></div>처리 순서:<br>1. 명령어 파싱 (push일 때 숫자도 읽기)<br>2. if-else로 5가지 명령 분기<br>3. <strong>pop/top에서 empty 체크 필수!</strong><br><br><span class="lang-py">Python: <code>if not stack:</code>으로 빈 스택 체크</span><span class="lang-cpp">C++: <code>if (st.empty())</code>으로 빈 스택 체크</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

N = int(input())
stack = []

for _ in range(N):
    cmd = input().split()
    if cmd[0] == "push":
        stack.append(int(cmd[1]))
    elif cmd[0] == "pop":
        print(-1 if not stack else stack.pop())
    elif cmd[0] == "size":
        print(len(stack))
    elif cmd[0] == "empty":
        print(1 if not stack else 0)
    elif cmd[0] == "top":
        print(-1 if not stack else stack[-1])`,
                cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    int N;
    cin >> N;
    stack<int> st;

    while (N--) {
        string cmd;
        cin >> cmd;
        if (cmd == "push") {
            int x; cin >> x;
            st.push(x);
        } else if (cmd == "pop") {
            if (st.empty()) cout << -1 << "\\n";
            else { cout << st.top() << "\\n"; st.pop(); }
        } else if (cmd == "size") {
            cout << st.size() << "\\n";
        } else if (cmd == "empty") {
            cout << (st.empty() ? 1 : 0) << "\\n";
        } else if (cmd == "top") {
            if (st.empty()) cout << -1 << "\\n";
            else cout << st.top() << "\\n";
        }
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '리스트/배열로 스택 구현',
                    description: '리스트를 스택으로 사용하여 5가지 명령어를 처리합니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

N = int(input())
stack = []

for _ in range(N):
    cmd = input().split()
    if cmd[0] == "push":
        stack.append(int(cmd[1]))
    elif cmd[0] == "pop":
        print(-1 if not stack else stack.pop())
    elif cmd[0] == "size":
        print(len(stack))
    elif cmd[0] == "empty":
        print(1 if not stack else 0)
    elif cmd[0] == "top":
        print(-1 if not stack else stack[-1])`,
                        cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    int N;
    cin >> N;
    stack<int> st;

    while (N--) {
        string cmd;
        cin >> cmd;
        if (cmd == "push") {
            int x; cin >> x;
            st.push(x);
        } else if (cmd == "pop") {
            if (st.empty()) cout << -1 << "\\n";
            else { cout << st.top() << "\\n"; st.pop(); }
        } else if (cmd == "size") {
            cout << st.size() << "\\n";
        } else if (cmd == "empty") {
            cout << (st.empty() ? 1 : 0) << "\\n";
        } else if (cmd == "top") {
            if (st.empty()) cout << -1 << "\\n";
            else cout << st.top() << "\\n";
        }
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 설정',
                                desc: `sys.stdin.readline으로 빠른 입력.
리스트가 곧 스택! append/pop이 O(1)이라 효율적입니다.`,
                                code: `import sys
input = sys.stdin.readline

N = int(input())
stack = []  # 리스트를 스택으로 사용 (LIFO)`
                            },
                            {
                                title: 'push 처리',
                                desc: `명령어를 split()으로 나눠서 첫 단어로 분기합니다.
push는 두 번째 값을 정수로 변환해서 append!`,
                                code: `import sys
input = sys.stdin.readline

N = int(input())
stack = []

for _ in range(N):
    cmd = input().split()
    if cmd[0] == "push":
        stack.append(int(cmd[1]))  # 맨 위에 값 추가`
                            },
                            {
                                title: 'pop / top 처리',
                                desc: `pop과 top 모두 빈 스택 체크가 필수!
pop()은 값을 꺼내고 제거, stack[-1]은 보기만 합니다.`,
                                code: `import sys
input = sys.stdin.readline

N = int(input())
stack = []

for _ in range(N):
    cmd = input().split()
    if cmd[0] == "push":
        stack.append(int(cmd[1]))
    elif cmd[0] == "pop":
        # 비어있으면 -1, 아니면 꺼내서 출력
        print(-1 if not stack else stack.pop())
    elif cmd[0] == "top":
        # 비어있으면 -1, 아니면 맨 위 값 (제거 안 함!)
        print(-1 if not stack else stack[-1])`
                            },
                            {
                                title: 'size / empty 처리',
                                desc: `size는 len(), empty는 비어있는지 확인.
모든 연산이 O(1)이므로 전체 O(N)에 해결!`,
                                code: `import sys
input = sys.stdin.readline

N = int(input())
stack = []

for _ in range(N):
    cmd = input().split()
    if cmd[0] == "push":
        stack.append(int(cmd[1]))
    elif cmd[0] == "pop":
        print(-1 if not stack else stack.pop())
    elif cmd[0] == "size":
        print(len(stack))  # 현재 원소 개수
    elif cmd[0] == "empty":
        print(1 if not stack else 0)  # 비어있으면 1
    elif cmd[0] == "top":
        print(-1 if not stack else stack[-1])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 설정',
                                desc: `C++ <stack> 라이브러리를 사용합니다.
push/pop/top/size/empty 모두 O(1) 연산입니다.`,
                                code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    int N;
    cin >> N;
    stack<int> st;  // C++ 표준 스택 사용`
                            },
                            {
                                title: 'push 처리',
                                desc: `string으로 명령어를 읽고 분기합니다.
push일 때만 추가로 정수 x를 입력받습니다.`,
                                code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    int N;
    cin >> N;
    stack<int> st;

    while (N--) {
        string cmd;
        cin >> cmd;
        if (cmd == "push") {
            int x;
            cin >> x;
            st.push(x);  // 스택 맨 위에 추가
        }`
                            },
                            {
                                title: 'pop / top 처리',
                                desc: `C++의 pop()은 값을 반환하지 않아요!
반드시 top()으로 먼저 값을 읽고, 그 다음 pop()으로 제거합니다.
빈 스택 체크를 잊으면 런타임 에러!`,
                                code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    int N;
    cin >> N;
    stack<int> st;

    while (N--) {
        string cmd;
        cin >> cmd;
        if (cmd == "push") {
            int x; cin >> x;
            st.push(x);
        } else if (cmd == "pop") {
            if (st.empty()) cout << -1 << "\\n";
            else { cout << st.top() << "\\n"; st.pop(); }
            // top()으로 값 확인 후 pop()으로 제거!
        } else if (cmd == "top") {
            if (st.empty()) cout << -1 << "\\n";
            else cout << st.top() << "\\n";
            // top은 제거하지 않고 보기만
        }`
                            },
                            {
                                title: 'size / empty + 전체 코드',
                                desc: `size()와 empty()는 간단합니다.
"\\n"을 사용하면 endl보다 빠릅니다!
전체 시간복잡도: O(N) — 모든 연산이 O(1)!`,
                                code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    int N;
    cin >> N;
    stack<int> st;

    while (N--) {
        string cmd;
        cin >> cmd;
        if (cmd == "push") {
            int x; cin >> x;
            st.push(x);
        } else if (cmd == "pop") {
            if (st.empty()) cout << -1 << "\\n";
            else { cout << st.top() << "\\n"; st.pop(); }
        } else if (cmd == "size") {
            cout << st.size() << "\\n";
        } else if (cmd == "empty") {
            cout << (st.empty() ? 1 : 0) << "\\n";
        } else if (cmd == "top") {
            if (st.empty()) cout << -1 << "\\n";
            else cout << st.top() << "\\n";
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
            id: 'boj-10773',
            title: 'BOJ 10773 - 제로',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/10773',
            simIntro: '0이 입력되면 가장 최근 수를 스택에서 pop하는 과정을 확인해보세요.',
            sim: {
                type: 'zero'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>나코더 기장 재민이는 장부를 정리하는 중이다. 그런데 재민이는 매우 활발하여 재미있는 일을 생각해냈다. 재민이가 K개의 수를 불러준다. 어떤 수가 "0"이 아닌 경우에는 해당 수를 장부에 적고, "0"인 경우에는 가장 최근에 적은 수를 지운다. 재민이가 게임을 끝마쳤을 때, 장부에 적혀 있는 수의 합을 구하는 프로그램을 작성하시오. 0을 입력받을 때 지울 수가 반드시 존재한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 정수 K가 주어진다. (1 &le; K &le; 100,000)</p>
                <p>이후 K개의 줄에 정수가 한 개씩 주어진다. 정수는 0에서 100,000 사이의 값을 가지며, 정수가 "0"일 경우에는 가장 최근에 쓴 수를 지우고, 아닐 경우 해당 수를 쓴다. 정수가 "0"일 경우에 지울 수 있는 수가 있음을 보장할 수 있다.</p>
                <h4>출력</h4>
                <p>재민이가 게임을 마쳤을 때, 장부에 적혀 있는 수의 합을 출력한다. 이 값은 2<sup>31</sup> - 1보다 작거나 같은 정수이다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>4
3
0
4
0</pre></div>
                    <div><strong>출력</strong><pre>0</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>10
1
3
5
4
0
0
7
0
0
6</pre></div>
                    <div><strong>출력</strong><pre>7</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; K &le; 100,000</li>
                    <li>1 &le; 수 &le; 100,000</li>
                    <li>0을 입력받을 때 지울 수가 반드시 존재</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '숫자를 부르면 적고, 0을 부르면 지운다… 일단 <strong>리스트에 숫자를 넣으면</strong> 되지 않을까?<br><br>예를 들어: 3이 들어오면 → [3], 다음에 0이 오면 → 3을 지움 → []<br>1, 5, 0이 들어오면 → [1, 5] → 0이니까 지움 → [1]<br><br>그런데 "지운다"가 정확히 뭘 지우는 걸까요? <strong>"가장 최근에 적은 수"</strong>를 지우는 거예요!'
                },
                {
                    title: '근데 "가장 최근"을 어떻게 빼지?',
                    content: '"가장 최근에 넣은 걸 빼는" 이 패턴… 뭔가 익숙하지 않나요?<br><br>접시를 쌓아놓고 <strong>맨 위에 있는 접시부터 빼는 것</strong>과 같아요!<br>한쪽 끝에서만 넣고, 한쪽 끝에서만 빼는 패턴 — 바로 <strong>LIFO(후입선출) = 스택</strong>이에요!<div style="display:flex;justify-content:center;gap:24px;margin:12px 0;flex-wrap:wrap;align-items:flex-end;"><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--text3);margin-bottom:4px;">push 1, 3, 5 후</div><div style="display:flex;flex-direction:column-reverse;align-items:center;gap:3px;padding:8px 14px;border:2px solid var(--bg3);border-radius:8px;min-height:60px;background:var(--bg2);"><div style="padding:3px 14px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">1</div><div style="padding:3px 14px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">3</div><div style="padding:3px 14px;background:var(--yellow);color:var(--text);border-radius:5px;font-size:0.8rem;font-weight:600;box-shadow:0 0 6px var(--yellow);">5</div></div><div style="font-size:0.7rem;color:var(--text3);margin-top:2px;">top → 5</div></div><div style="font-size:1.2rem;color:var(--text3);">→ pop</div><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--green);margin-bottom:4px;">5가 빠짐 (가장 최근!)</div><div style="display:flex;flex-direction:column-reverse;align-items:center;gap:3px;padding:8px 14px;border:2px solid var(--bg3);border-radius:8px;min-height:60px;background:var(--bg2);"><div style="padding:3px 14px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">1</div><div style="padding:3px 14px;background:var(--yellow);color:var(--text);border-radius:5px;font-size:0.8rem;font-weight:600;box-shadow:0 0 6px var(--yellow);">3</div></div><div style="font-size:0.7rem;color:var(--text3);margin-top:2px;">top → 3</div></div></div>숫자가 오면 push, 0이 오면 pop하면 자연스럽게 "가장 최근 수"가 빠집니다.'
                },
                {
                    title: '스택으로 구현하면 이렇게!',
                    content: '① 0이 아닌 수 → <code>push(x)</code><br>② 0이면 → <code>pop()</code> (가장 최근 수가 빠짐)<br>③ K번 반복 후 → 스택에 남은 수들의 합이 정답!<div style="display:flex;justify-content:center;margin:12px 0;"><div style="display:flex;align-items:flex-end;gap:16px;"><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--text3);margin-bottom:3px;">입력: 1, 3, 0, 5</div><div style="display:flex;gap:4px;justify-content:center;"><div style="padding:3px 10px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">1</div><div style="padding:3px 10px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">3</div><div style="padding:3px 10px;background:var(--red);color:white;border-radius:5px;font-size:0.8rem;text-decoration:line-through;opacity:0.5;">0</div><div style="padding:3px 10px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">5</div></div></div><div style="font-size:1.2rem;color:var(--text3);margin-bottom:2px;">→</div><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--text3);margin-bottom:3px;">스택 결과</div><div style="display:flex;gap:4px;justify-content:center;"><div style="padding:3px 10px;background:var(--green);color:white;border-radius:5px;font-size:0.8rem;">1</div><div style="padding:3px 10px;background:var(--green);color:white;border-radius:5px;font-size:0.8rem;">5</div></div><div style="font-size:0.75rem;color:var(--green);margin-top:3px;">합 = 6</div></div></div></div>문제 조건상 0일 때 스택이 비어있지 않음이 보장되므로, 별도 체크는 불필요해요.<br>시간 복잡도: <strong>O(K)</strong> — push/pop 모두 O(1)이라 K번 반복이면 O(K)!'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '<span class="lang-py">Python에선 <code>list</code>가 곧 스택!<br><code>append(x)</code>로 push, <code>pop()</code>으로 pop — 둘 다 O(1)이에요.<br>마지막에 <code>sum(stack)</code>으로 남은 수의 합을 구하면 끝!</span><span class="lang-cpp">C++에선 <code>stack&lt;int&gt;</code>를 사용!<br><code>push(x)</code>로 넣고, <code>pop()</code>으로 빼요.<br>다만 <code>sum()</code>이 없으므로, <code>while (!st.empty())</code>로 하나씩 꺼내서 합산합니다.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

K = int(input())
stack = []

for _ in range(K):
    n = int(input())
    if n == 0:
        stack.pop()
    else:
        stack.append(n)

print(sum(stack))`,
                cpp: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int K, n;
    scanf("%d", &K);
    stack<int> st;

    while (K--) {
        scanf("%d", &n);
        if (n == 0) st.pop();
        else st.push(n);
    }

    long long sum = 0;
    while (!st.empty()) { sum += st.top(); st.pop(); }
    printf("%lld\\n", sum);
}`
            },
            solutions: [
                {
                    approach: '스택 활용',
                    description: '0이 나오면 pop, 아니면 push한 뒤 남은 합을 구합니다.',
                    timeComplexity: 'O(K)',
                    spaceComplexity: 'O(K)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

K = int(input())
stack = []

for _ in range(K):
    n = int(input())
    if n == 0:
        stack.pop()
    else:
        stack.append(n)

print(sum(stack))`,
                        cpp: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int K, n;
    scanf("%d", &K);
    stack<int> st;

    while (K--) {
        scanf("%d", &n);
        if (n == 0) st.pop();
        else st.push(n);
    }

    long long sum = 0;
    while (!st.empty()) { sum += st.top(); st.pop(); }
    printf("%lld\\n", sum);
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 설정',
                                desc: `왜 스택? → 0이 나오면 "가장 최근 수"를 지워야 하니까!
LIFO(후입선출) 구조가 딱 맞습니다.`,
                                code: `import sys
input = sys.stdin.readline

K = int(input())
stack = []  # 스택: 마지막에 넣은 걸 먼저 꺼냄 (LIFO)`
                            },
                            {
                                title: '반복문',
                                desc: `K번 반복하며 각 숫자를 입력받습니다.
수가 0인지 아닌지에 따라 동작이 달라집니다.`,
                                code: `import sys
input = sys.stdin.readline

K = int(input())
stack = []  # 스택: 마지막에 넣은 걸 먼저 꺼냄 (LIFO)

for _ in range(K):
    n = int(input())  # 각 수를 하나씩 입력`
                            },
                            {
                                title: '조건 분기',
                                desc: `핵심 로직: 0이면 pop, 아니면 push!
pop()은 항상 가장 최근에 넣은 수를 제거합니다.
→ 스택이라서 가능한 O(1) 연산!`,
                                code: `import sys
input = sys.stdin.readline

K = int(input())
stack = []  # 스택: 마지막에 넣은 걸 먼저 꺼냄 (LIFO)

for _ in range(K):
    n = int(input())
    if n == 0:          # 0 = "직전 수를 지워라!"
        stack.pop()     # LIFO → 가장 최근 수가 빠짐
    else:
        stack.append(n) # 0이 아니면 일단 쌓아둔다`
                            },
                            {
                                title: '결과 출력',
                                desc: '모든 0 처리가 끝난 뒤 스택에 남아있는 수들의 합!',
                                code: `import sys
input = sys.stdin.readline

K = int(input())
stack = []  # 스택: 마지막에 넣은 걸 먼저 꺼냄 (LIFO)

for _ in range(K):
    n = int(input())
    if n == 0:          # 0 = "직전 수를 지워라!"
        stack.pop()     # LIFO → 가장 최근 수가 빠짐
    else:
        stack.append(n) # 0이 아니면 일단 쌓아둔다

print(sum(stack))  # 지우기 끝난 뒤 남은 수들의 합`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 설정',
                                desc: `왜 스택? → 0이 나오면 "가장 최근 수"를 지워야 하니까!
LIFO(후입선출) 구조가 딱 맞습니다.
C++의 stack은 <stack> 헤더에서 제공합니다.`,
                                code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int K;
    cin >> K;
    stack<int> st;  // 스택: LIFO (후입선출)`
                            },
                            {
                                title: '반복문',
                                desc: `while (K--)는 K를 하나씩 줄이면서 0이 될 때까지 반복합니다.
수가 0인지 아닌지에 따라 동작이 달라집니다.`,
                                code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int K;
    cin >> K;
    stack<int> st;  // 스택: LIFO (후입선출)

    while (K--) {       // K번 반복
        int n;
        cin >> n;       // 각 수를 하나씩 입력`
                            },
                            {
                                title: '조건 분기',
                                desc: `핵심 로직: 0이면 pop, 아니면 push!
C++에서는 push()로 넣고 pop()으로 뺍니다.
pop()은 항상 가장 최근에 넣은 수를 제거 → O(1) 연산!`,
                                code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int K;
    cin >> K;
    stack<int> st;  // 스택: LIFO (후입선출)

    while (K--) {
        int n;
        cin >> n;
        if (n == 0)       // 0 → "직전 수를 지워라!"
            st.pop();     // LIFO → 가장 최근 수가 빠짐
        else
            st.push(n);   // 0이 아니면 쌓아둔다`
                            },
                            {
                                title: '결과 출력',
                                desc: `C++ stack은 sum()이 없으므로 하나씩 꺼내서 더합니다.
top()은 값만 반환(제거 X), pop()은 제거만 (반환 X)!
이 차이가 Python의 pop()과 다른 점입니다.`,
                                code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    int K;
    cin >> K;
    stack<int> st;  // 스택: LIFO (후입선출)

    while (K--) {
        int n;
        cin >> n;
        if (n == 0)       // 0 → "직전 수를 지워라!"
            st.pop();     // LIFO → 가장 최근 수가 빠짐
        else
            st.push(n);   // 0이 아니면 쌓아둔다
    }

    int total = 0;
    while (!st.empty()) {   // 스택이 빌 때까지
        total += st.top();  // top()으로 값 읽고
        st.pop();           // pop()으로 제거
    }
    cout << total << endl;  // 남은 수들의 합 출력`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-20',
            title: 'LeetCode 20 - Valid Parentheses',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/valid-parentheses/',
            simIntro: '여는 괄호를 스택에 push하고, 닫는 괄호가 나오면 짝이 맞는지 확인하는 과정을 살펴보세요.',
            sim: {
                type: 'parentheses'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>문자열 <code>s</code>가 <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code>, <code>']'</code>로만 이루어져 있을 때, 입력 문자열이 유효한지 판별하세요.</p>
                <p>유효한 조건:</p>
                <ol>
                    <li>열린 괄호는 <strong>같은 종류의 괄호</strong>로 닫혀야 한다.</li>
                    <li>열린 괄호는 <strong>올바른 순서</strong>로 닫혀야 한다.</li>
                    <li>모든 닫힌 괄호에는 <strong>같은 유형의 열린 괄호</strong>가 있어야 한다.</li>
                </ol>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>s = "()"</pre></div>
                    <div><strong>출력</strong><pre>true</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>s = "()[]{}"</pre></div>
                    <div><strong>출력</strong><pre>true</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>s = "(]"</pre></div>
                    <div><strong>출력</strong><pre>false</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; s.length &le; 10<sup>4</sup></li>
                    <li><code>s</code>는 <code>'()[]{}'</code> 문자로만 구성</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '여는 괄호랑 닫는 괄호 <strong>개수가 같으면</strong> 유효한 거 아닐까?<br><br><code>"()"</code> → 여는 1개, 닫는 1개 → 유효 ✓<br><code>"()[]{}"</code> → 여는 3개, 닫는 3개 → 유효 ✓<div style="display:flex;justify-content:center;gap:16px;margin:12px 0;flex-wrap:wrap;"><div style="text-align:center;padding:8px 14px;background:var(--bg2);border-radius:8px;"><div style="font-family:monospace;font-size:1.1rem;letter-spacing:3px;margin-bottom:4px;"><span style="color:var(--accent);">(</span> <span style="color:var(--green);">)</span></div><div style="font-size:0.75rem;color:var(--text3);">여는 1 = 닫는 1 ✓</div></div><div style="text-align:center;padding:8px 14px;background:var(--bg2);border-radius:8px;"><div style="font-family:monospace;font-size:1.1rem;letter-spacing:3px;margin-bottom:4px;"><span style="color:var(--accent);">(</span><span style="color:var(--green);">)</span><span style="color:var(--accent);">[</span><span style="color:var(--green);">]</span><span style="color:var(--accent);">{</span><span style="color:var(--green);">}</span></div><div style="font-size:0.75rem;color:var(--text3);">여는 3 = 닫는 3 ✓</div></div></div>개수만 세면 간단하게 풀 수 있을 것 같은데…'
                },
                {
                    title: '근데 이러면 문제가 있어',
                    content: '<code>"(]"</code> → 여는 괄호 1개, 닫는 괄호 1개… <strong>개수는 맞는데 유효하지 않아요!</strong><br><code>"([)]"</code> → 여는 2개, 닫는 2개… 역시 개수는 맞지만 유효하지 않아요!<div style="display:flex;justify-content:center;gap:20px;margin:12px 0;flex-wrap:wrap;"><div style="text-align:center;padding:8px 14px;background:var(--bg2);border:2px solid var(--green);border-radius:8px;"><div style="font-size:0.8rem;color:var(--green);font-weight:600;margin-bottom:4px;">유효 ✓</div><div style="font-size:1.1rem;font-family:monospace;letter-spacing:2px;"><span style="color:var(--accent);">(</span><span style="color:var(--accent);">[</span><span style="color:var(--green);">]</span><span style="color:var(--green);">)</span></div></div><div style="text-align:center;padding:8px 14px;background:var(--bg2);border:2px solid var(--red);border-radius:8px;"><div style="font-size:0.8rem;color:var(--red);font-weight:600;margin-bottom:4px;">무효 ✗</div><div style="font-size:1.1rem;font-family:monospace;letter-spacing:2px;"><span style="color:var(--accent);">(</span><span style="color:var(--accent);">[</span><span style="color:var(--red);">)</span><span style="color:var(--red);">]</span></div></div></div>개수만으로는 <strong>"종류"</strong>(괄호 모양이 같은지)와 <strong>"순서"</strong>(안쪽 괄호를 먼저 닫는지)를 확인할 수 없습니다.<br>그럼 종류와 순서를 둘 다 체크하려면 어떻게 해야 할까요?'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>"([{}])"</code>를 보면: <code>(</code> → <code>[</code> → <code>{</code> 순서로 열었으니,<br><code>}</code> → <code>]</code> → <code>)</code> 순서로, <strong>가장 최근에 연 괄호부터</strong> 닫아야 해요.<div style="display:flex;justify-content:center;margin:12px 0;"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;"><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="font-size:0.7rem;color:var(--text3);">스택</div><div style="display:flex;flex-direction:column-reverse;gap:2px;padding:6px 10px;border:2px solid var(--bg3);border-radius:6px;min-height:50px;background:var(--bg2);"><div style="padding:2px 10px;background:var(--accent);color:white;border-radius:4px;font-size:0.8rem;">(</div><div style="padding:2px 10px;background:var(--accent);color:white;border-radius:4px;font-size:0.8rem;">[</div><div style="padding:2px 10px;background:var(--yellow);color:var(--text);border-radius:4px;font-size:0.8rem;font-weight:600;">{</div></div></div><div style="font-size:0.85rem;color:var(--text2);max-width:180px;line-height:1.5;"><code>}</code> 등장!<br>스택 top = <code>{</code><br>짝이 맞으니 pop!</div></div></div>"가장 최근에 넣은 것을 빼서 비교"… 이 패턴, 어디서 본 것 같지 않나요? → <strong>스택</strong>!<br>여는 괄호 → push, 닫는 괄호가 나오면 → pop해서 짝이 맞나 확인하면 돼요.<br><br>주의할 점 두 가지:<br>① 닫는 괄호인데 <strong>스택이 비어있으면?</strong> → 짝이 없으니 실패<br>② 끝까지 봤는데 <strong>스택에 남아있으면?</strong> → 안 닫힌 괄호가 있으니 실패'
                },
                {
                    title: 'Python/C++에선 이렇게!',
                    content: '짝을 매핑해두면 닫는 괄호가 나왔을 때 O(1)로 비교할 수 있어요:<br><br><span class="lang-py">Python: <code>pairs = {")" : "(", "]" : "[", "}" : "{"}</code> (<a href="https://docs.python.org/3/library/stdtypes.html#dict" target="_blank" style="color:var(--accent);">딕셔너리</a>)<br>스택은 <code>list</code>의 <code>append/pop</code>으로 구현!<br>닫는 괄호 → <code>stack[-1] != pairs[c]</code>이면 짝 불일치 → <code>False</code></span><span class="lang-cpp">C++: <code><a href="https://en.cppreference.com/w/cpp/container/unordered_map" target="_blank" style="color:var(--accent);">unordered_map</a>&lt;char,char&gt;</code>로 매핑하거나 if/else로 비교<br>스택은 <code>stack&lt;char&gt;</code>의 <code>push/top/pop</code>으로 구현!<br>닫는 괄호 → <code>st.top() != pairs[c]</code>이면 짝 불일치 → <code>false</code></span>'
                }
            ],
            templates: {
                python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        pairs = {')': '(', ']': '[', '}': '{'}

        for c in s:
            if c in '([{':
                stack.append(c)
            elif c in ')]}':
                if not stack or stack[-1] != pairs[c]:
                    return False
                stack.pop()

        return len(stack) == 0`,
                cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};

        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                st.push(c);
            } else {
                if (st.empty() || st.top() != pairs[c]) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`
            },
            solutions: [
                {
                    approach: '스택 기반 괄호 매칭',
                    description: '여는 괄호는 push, 닫는 괄호가 나오면 top과 비교하여 매칭합니다.',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        pairs = {')': '(', ']': '[', '}': '{'}

        for c in s:
            if c in '([{':
                stack.append(c)
            elif c in ')]}':
                if not stack or stack[-1] != pairs[c]:
                    return False
                stack.pop()

        return len(stack) == 0`,
                        cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};

        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                st.push(c);
            } else {
                if (st.empty() || st.top() != pairs[c]) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '초기 설정',
                                desc: `왜 딕셔너리? → 닫는 괄호가 나왔을 때 짝을 O(1)로 찾으려고!
pairs[")"] = "(" 이런 식으로 매핑합니다.`,
                                code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []  # 여는 괄호를 쌓아두는 스택
        pairs = {')': '(', ']': '[', '}': '{'}  # 닫는→여는 매핑`
                            },
                            {
                                title: '문자 순회',
                                desc: `문자열의 각 문자를 하나씩 확인합니다.
여는 괄호인지 닫는 괄호인지에 따라 처리가 다릅니다.`,
                                code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []  # 여는 괄호를 쌓아두는 스택
        pairs = {')': '(', ']': '[', '}': '{'}  # 닫는→여는 매핑

        for c in s:  # 한 글자씩 확인`
                            },
                            {
                                title: '여는 괄호 push',
                                desc: `왜 push? → 여는 괄호는 아직 짝을 모르니까 일단 보관!
나중에 닫는 괄호가 나올 때 꺼내서 비교합니다.`,
                                code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []  # 여는 괄호를 쌓아두는 스택
        pairs = {')': '(', ']': '[', '}': '{'}  # 닫는→여는 매핑

        for c in s:
            if c in '([{':
                stack.append(c)  # 나중에 짝을 확인할 때까지 보관`
                            },
                            {
                                title: '닫는 괄호 검증',
                                desc: `핵심: 닫는 괄호가 나오면 스택 top과 비교!
not stack → 짝 지을 여는 괄호가 없음 → 실패
stack[-1] != pairs[c] → 가장 최근 여는 괄호와 짝이 안 맞음 → 실패`,
                                code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []  # 여는 괄호를 쌓아두는 스택
        pairs = {')': '(', ']': '[', '}': '{'}  # 닫는→여는 매핑

        for c in s:
            if c in '([{':
                stack.append(c)  # 나중에 짝을 확인할 때까지 보관
            elif c in ')]}':
                if not stack or stack[-1] != pairs[c]:  # 스택 비었거나 짝 불일치
                    return False
                stack.pop()  # 짝 맞으면 소비!`
                            },
                            {
                                title: '최종 판정',
                                desc: `왜 len(stack) == 0?
→ 스택에 여는 괄호가 남아있으면 짝을 못 찾은 것!
"(()" 같은 경우 스택에 "("가 남아있어서 False.`,
                                code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []  # 여는 괄호를 쌓아두는 스택
        pairs = {')': '(', ']': '[', '}': '{'}  # 닫는→여는 매핑

        for c in s:
            if c in '([{':
                stack.append(c)  # 나중에 짝을 확인할 때까지 보관
            elif c in ')]}':
                if not stack or stack[-1] != pairs[c]:  # 스택 비었거나 짝 불일치
                    return False
                stack.pop()  # 짝 맞으면 소비!

        return len(stack) == 0  # 남은 여는 괄호 있으면 실패!`
                            }
                        ],
                        cpp: [
                            {
                                title: '초기 설정',
                                desc: `왜 unordered_map? → 닫는 괄호가 나왔을 때 짝을 O(1)로 찾으려고!
pairs[')'] = '(' 이런 식으로 매핑합니다.
C++에서는 stack<char>로 문자 스택을 만듭니다.`,
                                code: `#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;  // 여는 괄호를 쌓아두는 스택
        // 닫는→여는 괄호 매핑 (O(1) 조회용)
        unordered_map<char, char> pairs = {
            {')', '('}, {']', '['}, {'}', '{'}
        };`
                            },
                            {
                                title: '문자 순회',
                                desc: `range-based for문으로 문자열의 각 문자를 순회합니다.
여는 괄호인지 닫는 괄호인지에 따라 처리가 다릅니다.`,
                                code: `#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {
            {')', '('}, {']', '['}, {'}', '{'}
        };

        for (char c : s) {  // 한 글자씩 확인`
                            },
                            {
                                title: '여는 괄호 push',
                                desc: `왜 push? → 여는 괄호는 아직 짝을 모르니까 일단 보관!
나중에 닫는 괄호가 나올 때 꺼내서 비교합니다.`,
                                code: `#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {
            {')', '('}, {']', '['}, {'}', '{'}
        };

        for (char c : s) {
            if (c == '(' || c == '[' || c == '{')
                st.push(c);  // 나중에 짝을 확인할 때까지 보관`
                            },
                            {
                                title: '닫는 괄호 검증',
                                desc: `핵심: 닫는 괄호가 나오면 스택 top과 비교!
st.empty() → 짝 지을 여는 괄호가 없음 → 실패
st.top() != pairs[c] → 가장 최근 여는 괄호와 짝이 안 맞음 → 실패`,
                                code: `#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {
            {')', '('}, {']', '['}, {'}', '{'}
        };

        for (char c : s) {
            if (c == '(' || c == '[' || c == '{')
                st.push(c);  // 나중에 짝을 확인할 때까지 보관
            else {
                // 스택 비었거나 짝 불일치 → 실패
                if (st.empty() || st.top() != pairs[c])
                    return false;
                st.pop();    // 짝 맞으면 소비!`
                            },
                            {
                                title: '최종 판정',
                                desc: `왜 st.empty()?
→ 스택에 여는 괄호가 남아있으면 짝을 못 찾은 것!
"(()" 같은 경우 스택에 '('가 남아있어서 false.`,
                                code: `#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {
            {')', '('}, {']', '['}, {'}', '{'}
        };

        for (char c : s) {
            if (c == '(' || c == '[' || c == '{')
                st.push(c);
            else {
                if (st.empty() || st.top() != pairs[c])
                    return false;
                st.pop();
            }
        }

        return st.empty();  // 남은 여는 괄호 있으면 실패!
    }
};`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-2164',
            title: 'BOJ 2164 - 카드2',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2164',
            simIntro: '큐에서 맨 위 카드를 버리고, 다음 카드를 맨 아래로 보내는 과정을 관찰해보세요.',
            sim: {
                type: 'card2'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>N장의 카드가 있다. 각 카드는 차례로 1부터 N까지의 번호가 붙어 있으며, 1번 카드가 제일 위에, N번 카드가 제일 아래인 상태로 놓여 있다. 이제 다음과 같은 동작을 카드가 한 장 남을 때까지 반복하게 된다. 우선 제일 위에 있는 카드를 바닥에 버린다. 그 다음 제일 위에 있는 카드를 제일 아래에 있는 카드 밑으로 옮긴다. 마지막에 남게 되는 카드를 구하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 정수 N(1 &le; N &le; 500,000)이 주어진다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 남게 되는 카드의 번호를 출력한다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>6</pre></div>
                    <div><strong>출력</strong><pre>4</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 &le; N &le; 500,000</li>
                </ul>
            `,
            hints: [
                {
                    title: '문제를 쉽게 이해해보자',
                    content: 'N=4일 때 카드가 [1, 2, 3, 4]로 놓여있어요.<br>"<strong>맨 위를 버리고 → 그다음 맨 위를 맨 아래로</strong>" 반복!<div style="margin:12px 0;overflow-x:auto;"><table style="border-collapse:collapse;font-size:0.82rem;width:100%;"><thead><tr style="background:var(--bg2);"><th style="padding:5px 8px;border:1px solid var(--bg3);">단계</th><th style="padding:5px 8px;border:1px solid var(--bg3);">동작</th><th style="padding:5px 8px;border:1px solid var(--bg3);">큐 상태</th></tr></thead><tbody><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">초기</td><td style="padding:4px 8px;border:1px solid var(--bg3);">-</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[1, 2, 3, 4]</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">1</td><td style="padding:4px 8px;border:1px solid var(--bg3);"><span style="color:var(--red);">1 버림</span>, 2→아래로</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[3, 4, 2]</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">2</td><td style="padding:4px 8px;border:1px solid var(--bg3);"><span style="color:var(--red);">3 버림</span>, 4→아래로</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[2, 4]</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;">3</td><td style="padding:4px 8px;border:1px solid var(--bg3);"><span style="color:var(--red);">2 버림</span></td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;color:var(--green);font-weight:600;">[4] ← 정답!</td></tr></tbody></table></div>한쪽(위)에서 빼서 다른 쪽(아래)으로 넣는 패턴이에요!'
                },
                {
                    title: '배열로 해볼까?',
                    content: '배열 앞에서 빼고 뒤에 넣으면 동작은 하겠죠?<br>(<span class="lang-py">Python: <code>list.pop(0)</code></span><span class="lang-cpp">C++: <code>erase(v.begin())</code></span>)<br><br>근데 "앞에서 빼기"가 매번 뭘 하는지 생각해봐요…'
                },
                {
                    title: '배열 앞에서 빼기의 함정!',
                    content: '배열 앞에서 빼면 <strong>나머지를 전부 한 칸씩 앞으로 당겨야</strong> 해요 → <strong>O(n)</strong><div style="display:flex;justify-content:center;margin:10px 0;"><div style="display:flex;align-items:center;gap:6px;"><div style="padding:3px 10px;background:var(--red);color:white;border-radius:5px;font-size:0.8rem;opacity:0.4;text-decoration:line-through;">1</div><div style="padding:3px 10px;background:var(--yellow);color:var(--text);border-radius:5px;font-size:0.8rem;">2</div><div style="font-size:0.8rem;color:var(--text3);">←</div><div style="padding:3px 10px;background:var(--yellow);color:var(--text);border-radius:5px;font-size:0.8rem;">3</div><div style="font-size:0.8rem;color:var(--text3);">←</div><div style="padding:3px 10px;background:var(--yellow);color:var(--text);border-radius:5px;font-size:0.8rem;">4</div><div style="font-size:0.75rem;color:var(--red);margin-left:8px;font-weight:600;">전부 이동! O(n)</div></div></div>(<span class="lang-py">Python: <code>list.pop(0)</code></span><span class="lang-cpp">C++: <code>vector.erase(begin())</code></span> 둘 다 O(n))<br><br>카드가 <strong>50만 장</strong>이면? 매번 O(n)씩 반복 → 총 O(n^2) → <strong>시간 초과!</strong><br>"앞에서 빼는 게 빠른" 자료구조가 필요합니다.'
                },
                {
                    title: '큐(Queue)를 쓰면 해결!',
                    content: '큐를 쓰면 앞에서 빼기가 <strong>O(1)</strong>!<div style="display:flex;justify-content:center;margin:10px 0;"><div style="display:flex;align-items:center;gap:4px;padding:8px 12px;background:var(--bg2);border:2px solid var(--bg3);border-radius:8px;"><div style="font-size:0.75rem;color:var(--red);margin-right:4px;">← out</div><div style="padding:3px 10px;background:var(--green);color:white;border-radius:5px;font-size:0.8rem;">3</div><div style="padding:3px 10px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">4</div><div style="padding:3px 10px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">2</div><div style="font-size:0.75rem;color:var(--accent);margin-left:4px;">in →</div></div></div><span class="lang-py">Python: <code><a href="https://docs.python.org/3/library/collections.html#collections.deque" target="_blank" style="color:var(--accent);">collections.deque</a></code>의 <code>popleft()</code></span><span class="lang-cpp">C++: <code><a href="https://en.cppreference.com/w/cpp/container/queue" target="_blank" style="color:var(--accent);">queue&lt;int&gt;</a></code>의 <code>front()</code> + <code>pop()</code></span><br><br>앞에서 빼고 뒤에 넣는 FIFO 구조가 이 문제에 딱 맞습니다!'
                },
                {
                    title: '큐가 뭔데 이렇게 빠른 거야?',
                    content: '<strong>큐(Queue)</strong> = FIFO (선입선출) 자료구조<br>앞에서 빼기와 뒤에 넣기가 모두 <strong>O(1)</strong>이에요.<div style="display:flex;justify-content:center;margin:10px 0;"><div style="display:flex;flex-direction:column;gap:6px;align-items:center;"><div style="display:flex;align-items:center;gap:12px;"><div style="font-size:0.8rem;color:var(--red);font-weight:600;width:90px;text-align:right;">배열 pop(0)</div><div style="padding:3px 16px;background:var(--red);color:white;border-radius:5px;font-size:0.85rem;opacity:0.8;">O(n)</div></div><div style="display:flex;align-items:center;gap:12px;"><div style="font-size:0.8rem;color:var(--green);font-weight:600;width:90px;text-align:right;">큐 popleft()</div><div style="padding:3px 16px;background:var(--green);color:white;border-radius:5px;font-size:0.85rem;">O(1)</div></div></div></div><span class="lang-py">Python: <code>from collections import deque</code> → <code>popleft()</code> O(1)</span><span class="lang-cpp">C++: <code>#include &lt;queue&gt;</code> → <code>front()</code> + <code>pop()</code> O(1)</span><br><br>배열의 앞에서 빼기 O(n)과 비교하면 <strong>큰 데이터에서 차이가 어마어마</strong>해요!'
                }
            ],
            templates: {
                python: `from collections import deque
import sys
input = sys.stdin.readline

N = int(input())
q = deque(range(1, N + 1))

while len(q) > 1:
    q.popleft()          # 맨 위 카드 버리기
    q.append(q.popleft()) # 다음 카드를 맨 아래로

print(q[0])`,
                cpp: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N;
    scanf("%d", &N);
    queue<int> q;
    for (int i = 1; i <= N; i++) q.push(i);

    while (q.size() > 1) {
        q.pop();             // 맨 위 버리기
        q.push(q.front());   // 다음 카드를 맨 아래로
        q.pop();
    }
    printf("%d\\n", q.front());
}`
            },
            solutions: [
                {
                    approach: '큐(deque) 시뮬레이션',
                    description: '맨 앞 카드를 버리고, 다음 카드를 뒤로 보내는 과정을 반복합니다.',
                    timeComplexity: 'O(N)',
                    spaceComplexity: 'O(N)',
                    templates: {
                        python: `from collections import deque
import sys
input = sys.stdin.readline

N = int(input())
q = deque(range(1, N + 1))

while len(q) > 1:
    q.popleft()          # 맨 위 카드 버리기
    q.append(q.popleft()) # 다음 카드를 맨 아래로

print(q[0])`,
                        cpp: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N;
    scanf("%d", &N);
    queue<int> q;
    for (int i = 1; i <= N; i++) q.push(i);

    while (q.size() > 1) {
        q.pop();             // 맨 위 버리기
        q.push(q.front());   // 다음 카드를 맨 아래로
        q.pop();
    }
    printf("%d\\n", q.front());
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '초기 설정',
                                desc: `왜 deque? → 리스트의 pop(0)은 O(n)이지만 deque.popleft()는 O(1)!
카드를 앞에서 빼는 연산이 핵심이라 deque가 필수입니다.`,
                                code: `from collections import deque  # 양쪽 끝 O(1) 삽입/삭제
import sys
input = sys.stdin.readline

N = int(input())
q = deque(range(1, N + 1))  # 1~N 카드를 큐에 (앞=맨 위)`
                            },
                            {
                                title: '반복 조건',
                                desc: `카드가 1장 남으면 그게 정답!
매 반복마다 카드가 1장씩 줄어듭니다 (버리기 때문).`,
                                code: `from collections import deque  # 양쪽 끝 O(1) 삽입/삭제
import sys
input = sys.stdin.readline

N = int(input())
q = deque(range(1, N + 1))  # 1~N 카드를 큐에 (앞=맨 위)

while len(q) > 1:  # 카드 1장 남을 때까지`
                            },
                            {
                                title: '카드 조작',
                                desc: `핵심 2단계:
① popleft() → 맨 위 카드를 버림
② popleft()로 꺼내서 append()로 맨 뒤에 → 맨 아래로 이동
모두 O(1)이라 전체 O(N)!`,
                                code: `from collections import deque  # 양쪽 끝 O(1) 삽입/삭제
import sys
input = sys.stdin.readline

N = int(input())
q = deque(range(1, N + 1))  # 1~N 카드를 큐에 (앞=맨 위)

while len(q) > 1:
    q.popleft()            # ① 맨 위 카드 버리기 (O(1))
    q.append(q.popleft())  # ② 다음 카드를 맨 아래로 이동`
                            },
                            {
                                title: '결과 출력',
                                desc: '마지막 남은 한 장이 정답입니다.',
                                code: `from collections import deque  # 양쪽 끝 O(1) 삽입/삭제
import sys
input = sys.stdin.readline

N = int(input())
q = deque(range(1, N + 1))  # 1~N 카드를 큐에 (앞=맨 위)

while len(q) > 1:
    q.popleft()            # ① 맨 위 카드 버리기 (O(1))
    q.append(q.popleft())  # ② 다음 카드를 맨 아래로 이동

print(q[0])  # 마지막 남은 카드!`
                            }
                        ],
                        cpp: [
                            {
                                title: '초기 설정',
                                desc: `왜 queue? → 앞에서 빼고(pop) 뒤에 넣는(push) 구조!
C++의 queue는 <queue> 헤더에서 제공합니다.
front()로 맨 앞을 확인하고 pop()으로 제거합니다.`,
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N;
    cin >> N;
    queue<int> q;  // 큐: FIFO (선입선출)
    for (int i = 1; i <= N; i++)
        q.push(i);  // 1~N 카드를 큐에 넣기`
                            },
                            {
                                title: '반복 조건',
                                desc: `카드가 1장 남으면 그게 정답!
매 반복마다 카드가 1장씩 줄어듭니다 (버리기 때문).`,
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N;
    cin >> N;
    queue<int> q;  // 큐: FIFO (선입선출)
    for (int i = 1; i <= N; i++)
        q.push(i);

    while (q.size() > 1) {  // 카드 1장 남을 때까지`
                            },
                            {
                                title: '카드 조작',
                                desc: `핵심 3단계:
① pop() → 맨 위 카드를 버림
② front()로 값을 읽어서 push()로 맨 뒤에 넣고
   다시 pop()으로 원래 위치에서 제거
C++의 pop()은 값을 반환하지 않으므로 front()로 먼저 읽어야 합니다!`,
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N;
    cin >> N;
    queue<int> q;  // 큐: FIFO (선입선출)
    for (int i = 1; i <= N; i++)
        q.push(i);

    while (q.size() > 1) {
        q.pop();              // ① 맨 위 카드 버리기
        q.push(q.front());    // ② 다음 카드를 맨 아래로 이동
        q.pop();              // ② front를 제거 (push 후)`
                            },
                            {
                                title: '결과 출력',
                                desc: `마지막 남은 한 장이 정답입니다.
q.front()로 큐의 맨 앞 값을 확인합니다.`,
                                code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    int N;
    cin >> N;
    queue<int> q;  // 큐: FIFO (선입선출)
    for (int i = 1; i <= N; i++)
        q.push(i);

    while (q.size() > 1) {
        q.pop();              // ① 맨 위 카드 버리기
        q.push(q.front());    // ② 다음 카드를 맨 아래로 이동
        q.pop();              // ② front를 제거
    }

    cout << q.front() << endl;  // 마지막 남은 카드!`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-155',
            title: 'LeetCode 155 - Min Stack',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/min-stack/',
            simIntro: '메인 스택과 최솟값 추적 보조 스택이 함께 동작하는 모습을 확인해보세요.',
            sim: {
                type: 'minStack'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>다음 연산을 지원하는 <code>MinStack</code> 클래스를 설계하세요.</p>
                <ul>
                    <li><code>MinStack()</code> — 스택 객체를 초기화합니다.</li>
                    <li><code>void push(int val)</code> — <code>val</code>을 스택에 넣습니다.</li>
                    <li><code>void pop()</code> — 스택의 맨 위 원소를 제거합니다.</li>
                    <li><code>int top()</code> — 스택의 맨 위 원소를 가져옵니다.</li>
                    <li><code>int getMin()</code> — 스택에서 최솟값을 가져옵니다.</li>
                </ul>
                <p>각 함수는 <strong>O(1) 시간</strong>에 동작해야 합니다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>["MinStack","push","push","push","getMin","pop","top","getMin"]
[[], [-2], [0], [-3], [], [], [], []]</pre></div>
                    <div><strong>출력</strong><pre>[null, null, null, null, -3, null, 0, -2]</pre></div>
                </div><p class="example-explain">push(-2), push(0), push(-3) → getMin()=-3 → pop() → top()=0 → getMin()=-2</p></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>-2<sup>31</sup> &le; val &le; 2<sup>31</sup> - 1</li>
                    <li><code>pop</code>, <code>top</code>, <code>getMin</code>은 비어있지 않은 스택에서만 호출</li>
                    <li>최대 3 × 10<sup>4</sup>번 호출</li>
                </ul>
            `,
            hints: [
                {
                    title: '문제를 쉽게 이해해보자',
                    content: '<code>push</code>, <code>pop</code>, <code>top</code>은 일반 스택이랑 똑같아요. 어려운 건 <strong>getMin()</strong>!<br><br><code>getMin()</code>이 항상 현재 스택에서 <strong>가장 작은 값을 O(1)에 반환</strong>해야 해요.<br>보통 최솟값을 찾으려면 전체를 봐야 하는데… O(1)이라고?'
                },
                {
                    title: 'min 변수 하나면 되지 않을까?',
                    content: '스택에 값을 넣을 때마다 <code>min_val = min(min_val, x)</code>로 갱신하면?<br><br><code>push(5)</code>, <code>push(2)</code>, <code>push(7)</code> → min_val = 2 ✓<br>근데 <code>pop()</code>으로 <strong>2를 빼면?</strong> min_val이 2인데 2는 이제 없잖아요!<div style="display:flex;justify-content:center;margin:10px 0;"><div style="padding:8px 14px;background:var(--red);color:white;border-radius:8px;font-size:0.85rem;opacity:0.9;">min_val=2인데 2가 사라짐 → 틀린 최솟값!</div></div>'
                },
                {
                    title: 'pop하면 이전 최솟값을 어떻게 알지?',
                    content: '2를 pop했으면 그 전의 최솟값(5)으로 <strong>돌아가야</strong> 해요.<br><br>"이전 상태로 돌아간다"… 뭔가 <strong>스택스러운</strong> 느낌이 들지 않나요?<br>각 시점의 최솟값을 "기억"해두면 어떨까요?'
                },
                {
                    title: '보조 스택으로 각 시점의 최솟값 기억하기',
                    content: '<strong>min_stack</strong>이라는 스택을 하나 더 만들자!<br><br><code>push(x)</code>할 때: min_stack에도 <code>min(x, 현재 min_stack의 top)</code>을 push<br><code>pop()</code>할 때: min_stack에서도 pop → 자동으로 이전 최솟값이 top!<br><code>getMin()</code>: min_stack의 top을 보면 끝 → <strong>O(1)!</strong><div style="display:flex;justify-content:center;gap:20px;margin:12px 0;flex-wrap:wrap;align-items:flex-end;"><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--text2);font-weight:600;margin-bottom:4px;">stack</div><div style="display:flex;flex-direction:column-reverse;align-items:center;gap:3px;padding:8px 12px;border:2px solid var(--bg3);border-radius:8px;background:var(--bg2);"><div style="padding:3px 12px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">5</div><div style="padding:3px 12px;background:var(--accent);color:white;border-radius:5px;font-size:0.8rem;">2</div><div style="padding:3px 12px;background:var(--yellow);color:var(--text);border-radius:5px;font-size:0.8rem;font-weight:600;">7</div></div></div><div style="text-align:center;"><div style="font-size:0.75rem;color:var(--green);font-weight:600;margin-bottom:4px;">min_stack</div><div style="display:flex;flex-direction:column-reverse;align-items:center;gap:3px;padding:8px 12px;border:2px solid var(--green);border-radius:8px;background:var(--bg2);"><div style="padding:3px 12px;background:var(--green);color:white;border-radius:5px;font-size:0.8rem;">5</div><div style="padding:3px 12px;background:var(--green);color:white;border-radius:5px;font-size:0.8rem;">2</div><div style="padding:3px 12px;background:var(--green);color:white;border-radius:5px;font-size:0.8rem;font-weight:600;box-shadow:0 0 6px var(--green);">2</div></div><div style="font-size:0.7rem;color:var(--green);margin-top:2px;">top = 현재 최솟값!</div></div></div>'
                },
                {
                    title: '예시로 확인해보자',
                    content: '<div style="overflow-x:auto;margin-bottom:10px;"><table style="border-collapse:collapse;font-size:0.82rem;width:100%;"><thead><tr style="background:var(--bg2);"><th style="padding:5px 8px;border:1px solid var(--bg3);">연산</th><th style="padding:5px 8px;border:1px solid var(--bg3);">stack</th><th style="padding:5px 8px;border:1px solid var(--bg3);">min_stack</th><th style="padding:5px 8px;border:1px solid var(--bg3);">getMin()</th></tr></thead><tbody><tr><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">push(5)</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[5]</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;color:var(--accent);font-weight:600;">[5]</td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;font-weight:600;">5</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">push(2)</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[5, 2]</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;color:var(--accent);font-weight:600;">[5, 2]</td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;font-weight:600;">2</td></tr><tr><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">push(7)</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[5, 2, 7]</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;color:var(--accent);font-weight:600;">[5, 2, 2]</td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;font-weight:600;">2</td></tr><tr style="background:var(--warm-bg);"><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;color:var(--red);">pop()</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[5, 2]</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;color:var(--green);font-weight:600;">[5, 2]</td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;font-weight:600;color:var(--green);">2 ✓</td></tr><tr style="background:var(--warm-bg);"><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;color:var(--red);">pop()</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;">[5]</td><td style="padding:4px 8px;border:1px solid var(--bg3);font-family:monospace;color:var(--green);font-weight:600;">[5]</td><td style="padding:4px 8px;border:1px solid var(--bg3);text-align:center;font-weight:600;color:var(--green);">5 ✓</td></tr></tbody></table></div>2가 빠졌는데 자동으로 최솟값이 5로 복원돼요!<br>보조 스택의 top이 항상 현재 최솟값을 가리키는 게 핵심입니다.'
                }
            ],
            templates: {
                python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # 보조 스택: 각 시점의 최솟값

    def push(self, val: int) -> None:
        self.stack.append(val)
        # min_stack이 비어있거나, 새 값이 더 작으면 갱신
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
                cpp: `class MinStack {
    stack<int> st, minSt;
public:
    MinStack() {}

    void push(int val) {
        st.push(val);
        if (minSt.empty() || val <= minSt.top())
            minSt.push(val);
        else
            minSt.push(minSt.top());
    }

    void pop() {
        st.pop();
        minSt.pop();
    }

    int top() { return st.top(); }
    int getMin() { return minSt.top(); }
};`
            },
            solutions: [
                {
                    approach: '보조 스택으로 최솟값 추적',
                    description: '메인 스택과 별도로 최솟값 스택을 유지하여 O(1) getMin을 구현합니다.',
                    timeComplexity: 'O(1) per op',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # 보조 스택: 각 시점의 최솟값

    def push(self, val: int) -> None:
        self.stack.append(val)
        # min_stack이 비어있거나, 새 값이 더 작으면 갱신
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
                        cpp: `class MinStack {
    stack<int> st, minSt;
public:
    MinStack() {}

    void push(int val) {
        st.push(val);
        if (minSt.empty() || val <= minSt.top())
            minSt.push(val);
        else
            minSt.push(minSt.top());
    }

    void pop() {
        st.pop();
        minSt.pop();
    }

    int top() { return st.top(); }
    int getMin() { return minSt.top(); }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '초기화',
                                desc: `왜 스택 2개? → getMin()을 O(1)로 하려면 "지금 최솟값이 뭔지" 항상 알아야!
min_stack의 top이 항상 현재 최솟값을 가리킵니다.`,
                                code: `class MinStack:
    def __init__(self):
        self.stack = []      # 메인 스택: 실제 데이터
        self.min_stack = []  # 보조 스택: 각 시점의 최솟값 기록`
                            },
                            {
                                title: 'push 구현',
                                desc: `핵심: push할 때 min_stack에도 항상 함께 push!
val이 현재 최솟값 이하면 → val을 넣고
아니면 → 기존 최솟값을 그대로 복사해서 넣음
→ 두 스택의 높이가 항상 같다!`,
                                code: `class MinStack:
    def __init__(self):
        self.stack = []      # 메인 스택: 실제 데이터
        self.min_stack = []  # 보조 스택: 각 시점의 최솟값 기록

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)              # 새로운 최솟값!
        else:
            self.min_stack.append(self.min_stack[-1])  # 최솟값 변동 없음 → 그대로 복사`
                            },
                            {
                                title: 'pop 구현',
                                desc: `왜 둘 다 pop?
→ 두 스택 높이를 항상 동기화해야 하니까!
pop 후에도 min_stack[-1]이 정확한 최솟값을 가리킵니다.`,
                                code: `class MinStack:
    def __init__(self):
        self.stack = []      # 메인 스택: 실제 데이터
        self.min_stack = []  # 보조 스택: 각 시점의 최솟값 기록

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        self.stack.pop()      # 메인에서 제거
        self.min_stack.pop()  # 보조도 같이 제거 → 높이 동기화!`
                            },
                            {
                                title: 'top과 getMin',
                                desc: `모든 연산이 O(1)!
top() → stack[-1], getMin() → min_stack[-1]
보조 스택 덕분에 최솟값을 매번 탐색할 필요가 없습니다.`,
                                code: `class MinStack:
    def __init__(self):
        self.stack = []      # 메인 스택: 실제 데이터
        self.min_stack = []  # 보조 스택: 각 시점의 최솟값 기록

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]      # 메인 스택의 top

    def getMin(self) -> int:
        return self.min_stack[-1]  # 보조 스택의 top = 현재 최솟값! O(1)`
                            }
                        ],
                        cpp: [
                            {
                                title: '초기화',
                                desc: `왜 스택 2개? → getMin()을 O(1)로 하려면 "지금 최솟값이 뭔지" 항상 알아야!
minSt의 top()이 항상 현재 최솟값을 가리킵니다.
C++에서는 stack<int>로 정수 스택을 만듭니다.`,
                                code: `#include <stack>
using namespace std;

class MinStack {
    stack<int> st;       // 메인 스택: 실제 데이터
    stack<int> minSt;    // 보조 스택: 각 시점의 최솟값 기록`
                            },
                            {
                                title: 'push 구현',
                                desc: `핵심: push할 때 minSt에도 항상 함께 push!
val이 현재 최솟값 이하면 → val을 넣고
아니면 → 기존 최솟값을 그대로 복사해서 넣음
→ 두 스택의 높이가 항상 같다!`,
                                code: `#include <stack>
using namespace std;

class MinStack {
    stack<int> st;       // 메인 스택
    stack<int> minSt;    // 보조 스택: 각 시점의 최솟값

public:
    void push(int val) {
        st.push(val);
        // 보조 스택이 비었거나 새 값이 최솟값 이하면 갱신
        if (minSt.empty() || val <= minSt.top())
            minSt.push(val);              // 새로운 최솟값!
        else
            minSt.push(minSt.top());      // 기존 최솟값 유지 → 그대로 복사`
                            },
                            {
                                title: 'pop 구현',
                                desc: `왜 둘 다 pop?
→ 두 스택 높이를 항상 동기화해야 하니까!
pop 후에도 minSt.top()이 정확한 최솟값을 가리킵니다.`,
                                code: `#include <stack>
using namespace std;

class MinStack {
    stack<int> st;       // 메인 스택
    stack<int> minSt;    // 보조 스택: 각 시점의 최솟값

public:
    void push(int val) {
        st.push(val);
        if (minSt.empty() || val <= minSt.top())
            minSt.push(val);
        else
            minSt.push(minSt.top());
    }

    void pop() {
        st.pop();      // 메인에서 제거
        minSt.pop();   // 보조도 같이 제거 → 높이 동기화!`
                            },
                            {
                                title: 'top과 getMin',
                                desc: `모든 연산이 O(1)!
top() → st.top(), getMin() → minSt.top()
보조 스택 덕분에 최솟값을 매번 탐색할 필요가 없습니다.`,
                                code: `#include <stack>
using namespace std;

class MinStack {
    stack<int> st;       // 메인 스택
    stack<int> minSt;    // 보조 스택: 각 시점의 최솟값

public:
    void push(int val) {
        st.push(val);
        if (minSt.empty() || val <= minSt.top())
            minSt.push(val);
        else
            minSt.push(minSt.top());
    }

    void pop() {
        st.pop();
        minSt.pop();
    }

    int top() {
        return st.top();       // 메인 스택의 top
    }

    int getMin() {
        return minSt.top();    // 보조 스택의 top = 현재 최솟값! O(1)
    }
};`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
