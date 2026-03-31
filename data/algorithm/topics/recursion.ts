import type { AlgoTopic } from '../types'

export const recursionTopic: AlgoTopic = {
    id: 'recursion',
    title: '재귀 함수',
    icon: '🔄',
    category: '탐색 (Silver)',
    order: 6,
    description: '자기 자신을 호출하여 문제를 쪼개는 기법',
    track: 'both',
    stages: [
        {
            num: 1,
            title: '재귀 입문',
            problemIds: [
                'boj-27433',
                'boj-10870'
            ],
            desc: '기본 재귀 함수 연습'
        },
        {
            num: 2,
            title: '재귀 활용',
            problemIds: [
                'boj-25501',
                'boj-24060'
            ],
            desc: '재귀 호출 추적과 이해'
        },
        {
            num: 3,
            title: '나누어 풀기',
            problemIds: [
                'boj-4779',
                'boj-2447',
                'boj-11729'
            ],
            desc: '재귀적 패턴과 하노이 탑'
        }
    ],
    problems: [
        {
            id: 'boj-27433',
            title: 'BOJ 27433 - 팩토리얼 2',
            difficulty: 'bronze',
            link: 'https://www.acmicpc.net/problem/27433',
            simIntro: 'factorial(5)의 콜 스택이 어떻게 쌓이고 풀리는지 확인해보세요!',
            inputLabel: '입력값 (N)',
            descriptionHTML: `
                <h3>문제</h3>
                <p>0보다 크거나 같은 정수 N이 주어진다. 이때, N!을 출력하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 정수 N(0 ≤ N ≤ 20)이 주어진다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 N!을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>10</pre></div>
                    <div><strong>출력</strong><pre>3628800</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>0</pre></div>
                    <div><strong>출력</strong><pre>1</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>0 ≤ N ≤ 20</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '<code>5! = 5 × 4 × 3 × 2 × 1</code>이니까 for문으로 곱하면 되지 않을까? 맞아, 그것도 방법이야! 근데 이 문제는 <strong>재귀</strong>를 연습하는 문제야.'
                },
                {
                    title: '근데 재귀로는 어떻게?',
                    content: '잘 보면 <code>5! = 5 × 4!</code>이고, <code>4! = 4 × 3!</code>이야. 즉 <code>n! = n × (n-1)!</code> — 큰 문제가 작은 문제로 쪼개지는 구조! 이게 바로 재귀의 핵심이야.<br><br><div style="display:flex;flex-direction:column;gap:2px;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.85rem;"><div style="display:flex;align-items:center;gap:6px;"><span style="padding:2px 8px;background:var(--accent);color:white;border-radius:4px;">5!</span><span>=</span><span>5</span><span>×</span><span style="padding:2px 8px;background:var(--accent);color:white;border-radius:4px;opacity:0.85;">4!</span></div><div style="display:flex;align-items:center;gap:6px;padding-left:20px;"><span style="padding:2px 8px;background:var(--accent);color:white;border-radius:4px;opacity:0.85;">4!</span><span>=</span><span>4</span><span>×</span><span style="padding:2px 8px;background:var(--accent);color:white;border-radius:4px;opacity:0.7;">3!</span></div><div style="display:flex;align-items:center;gap:6px;padding-left:40px;"><span style="padding:2px 8px;background:var(--accent);color:white;border-radius:4px;opacity:0.7;">3!</span><span>=</span><span>3</span><span>×</span><span style="padding:2px 8px;background:var(--accent);color:white;border-radius:4px;opacity:0.55;">2!</span></div><div style="display:flex;align-items:center;gap:6px;padding-left:60px;"><span style="padding:2px 8px;background:var(--green);color:white;border-radius:4px;">1!</span><span>=</span><span style="font-weight:700;">1</span><span style="color:var(--text3);margin-left:4px;">← 멈춤!</span></div></div>'
                },
                {
                    title: '멈추는 조건은?',
                    content: '재귀는 반드시 <strong>멈추는 조건</strong>이 필요해. 안 그러면 무한히 호출돼! <code>0! = 1</code>, <code>1! = 1</code>이니까, n이 0 또는 1이면 곱하기를 멈추고 1을 반환하면 돼.'
                },
                {
                    title: '주의할 점',
                    content: '20!은 약 2,432,902,008,176,640,000이야 — 엄청 큰 수! <span class="lang-py">Python은 큰 수를 자동으로 처리하니까 걱정 없어.</span><span class="lang-cpp">C++에서 <code>int</code>는 약 21억까지만 저장 가능해서 터져! <code>long long</code>을 써야 해 (약 9.2 × 10<sup>18</sup>까지).</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())

def factorial(n):
    # 여기에 재귀 함수를 작성하세요
    pass

print(factorial(n))
`,
                cpp: `#include <iostream>
using namespace std;

long long factorial(int n) {
    // 여기에 재귀 함수를 작성하세요
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << factorial(n) << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '재귀 풀이',
                    description: '팩토리얼의 재귀 정의를 그대로 구현한다',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())

def factorial(n):
    # 여기에 재귀 함수를 작성하세요
    pass

print(factorial(n))
`,
                        cpp: `#include <iostream>
using namespace std;

long long factorial(int n) {
    // 여기에 재귀 함수를 작성하세요
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << factorial(n) << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '함수 정의 + 멈추는 조건',
                                desc: 'n이 1 이하이면 1을 반환',
                                code: `def factorial(n):
    if n <= 1:
        return 1`
                            },
                            {
                                title: '재귀 호출',
                                desc: 'n * factorial(n-1)로 재귀',
                                code: '    return n * factorial(n - 1)'
                            },
                            {
                                title: '입출력',
                                desc: '입력받고 결과 출력',
                                code: `n = int(input())
print(factorial(n))`
                            }
                        ],
                        cpp: [
                            {
                                title: '함수 정의 + 멈추는 조건',
                                desc: 'long long: 20! = 약 2.4×10^18이라 int 범위 초과.',
                                code: `#include <iostream>
using namespace std;

long long factorial(int n) {
    if (n <= 1) return 1;  // 멈추는 조건`
                            },
                            {
                                title: '재귀 호출',
                                desc: 'n * factorial(n-1)로 재귀',
                                code: `    return (long long)n * factorial(n - 1);
}`
                            },
                            {
                                title: '입출력',
                                desc: 'cin/cout으로 입출력. Python과 달리 main 함수가 필요.',
                                code: `int main() {
    int n;
    cin >> n;
    cout << factorial(n) << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-10870',
            title: 'BOJ 10870 - 피보나치 수 5',
            difficulty: 'bronze',
            link: 'https://www.acmicpc.net/problem/10870',
            simIntro: 'fib(5)의 재귀 호출 트리가 어떻게 펼쳐지는지 확인해보세요!',
            inputLabel: '입력값 (n)',
            descriptionHTML: `
                <h3>문제</h3>
                <p>피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째부터는 바로 앞 두 피보나치 수의 합이 된다.</p>
                <p>이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.</p>
                <p>n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 n이 주어진다. n은 20보다 작거나 같은 자연수 또는 0이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 n번째 피보나치 수를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>10</pre></div>
                    <div><strong>출력</strong><pre>55</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>0 ≤ n ≤ 20</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '피보나치 수열은 <code>0, 1, 1, 2, 3, 5, 8, 13, ...</code> — 앞 두 수를 더하면 다음 수가 나와! for문으로 앞에서부터 하나씩 구하면 될 것 같은데?'
                },
                {
                    title: '근데 재귀로는 어떻게?',
                    content: '정의를 다시 보면: <code>fib(n) = fib(n-1) + fib(n-2)</code>. n번째를 구하려면 (n-1)번째와 (n-2)번째가 필요하고, 그것들도 같은 방식으로 구해! 이게 재귀적 구조야.'
                },
                {
                    title: '멈추는 조건이 두 개!',
                    content: '팩토리얼은 멈추는 조건이 1개였지만, 피보나치는 <strong>2개</strong> 필요해: <code>fib(0) = 0</code>, <code>fib(1) = 1</code>. 두 개가 없으면 <code>fib(1) → fib(0) + fib(-1)</code>로 끝없이 내려가!'
                },
                {
                    title: '이 풀이의 한계는?',
                    content: 'n ≤ 20이라 이 문제에선 괜찮지만, 순수 재귀는 <strong>같은 값을 여러 번 계산</strong>해. fib(5)를 구하면 fib(2)를 3번이나 계산해! n이 커지면 시간 복잡도가 O(2<sup>n</sup>)으로 폭발해. 나중에 DP(동적 프로그래밍)에서 이걸 해결하는 법을 배울 거야!<br><br><div style="display:flex;gap:12px;align-items:flex-end;padding:10px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);"><div style="text-align:center;"><div style="width:32px;height:20px;background:var(--green);border-radius:4px 4px 0 0;"></div><div style="font-size:0.7rem;color:var(--text2);margin-top:3px;">n=5<br>15번</div></div><div style="text-align:center;"><div style="width:32px;height:50px;background:var(--yellow);border-radius:4px 4px 0 0;"></div><div style="font-size:0.7rem;color:var(--text2);margin-top:3px;">n=10<br>177번</div></div><div style="text-align:center;"><div style="width:32px;height:100px;background:var(--red);border-radius:4px 4px 0 0;opacity:0.85;"></div><div style="font-size:0.7rem;color:var(--text2);margin-top:3px;">n=20<br>2만번</div></div><div style="text-align:center;"><div style="width:32px;height:130px;background:var(--red);border-radius:4px 4px 0 0;opacity:0.6;"></div><div style="font-size:0.7rem;color:var(--text2);margin-top:3px;">n=40<br>3억번!</div></div></div>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())

def fib(n):
    # 여기에 재귀 함수를 작성하세요
    pass

print(fib(n))
`,
                cpp: `#include <iostream>
using namespace std;

int fib(int n) {
    // 여기에 재귀 함수를 작성하세요
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << fib(n) << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '재귀 풀이',
                    description: '피보나치의 재귀 정의를 그대로 구현한다',
                    timeComplexity: 'O(2^n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())

def fib(n):
    # 여기에 재귀 함수를 작성하세요
    pass

print(fib(n))
`,
                        cpp: `#include <iostream>
using namespace std;

int fib(int n) {
    // 여기에 재귀 함수를 작성하세요
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << fib(n) << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '함수 정의 + 멈추는 조건',
                                desc: 'n이 0이면 0, 1이면 1 반환',
                                code: `def fib(n):
    if n == 0: return 0
    if n == 1: return 1`
                            },
                            {
                                title: '재귀 호출',
                                desc: 'fib(n-1) + fib(n-2)로 재귀',
                                code: '    return fib(n-1) + fib(n-2)'
                            },
                            {
                                title: '입출력',
                                desc: '입력받고 결과 출력',
                                code: `n = int(input())
print(fib(n))`
                            }
                        ],
                        cpp: [
                            {
                                title: '함수 정의 + 멈추는 조건',
                                desc: 'n ≤ 20이므로 int 범위 충분.',
                                code: `#include <iostream>
using namespace std;

int fib(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;`
                            },
                            {
                                title: '재귀 호출',
                                desc: '앞 두 피보나치 수의 합을 재귀로 구한다.',
                                code: `    return fib(n - 1) + fib(n - 2);
}`
                            },
                            {
                                title: '입출력',
                                desc: 'cin/cout으로 입출력. main 함수에서 fib 호출.',
                                code: `int main() {
    int n;
    cin >> n;
    cout << fib(n) << endl;
    return 0;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-25501',
            title: 'BOJ 25501 - 재귀의 귀재',
            difficulty: 'bronze',
            link: 'https://www.acmicpc.net/problem/25501',
            simIntro: '회문 검사 재귀가 양쪽 끝에서 어떻게 좁혀가는지 확인해보세요!',
            inputLabel: '입력값 (n)',
            descriptionHTML: `
                <h3>문제</h3>
                <p>정수를 문자열로 변환한 다음, 그 문자열이 팰린드롬인지 재귀 함수를 이용해 판별하려 한다. 아래와 같이 재귀 함수 isPalindrome과 recursion이 주어졌을 때, 각 문자열에 대해 팰린드롬 여부(1 또는 0)와 재귀 함수 recursion의 호출 횟수를 출력하시오.</p>
                <pre style="background:var(--bg);padding:1rem;border-radius:8px;border:1px solid var(--border);font-size:0.85rem;line-height:1.6;overflow-x:auto;">recursion(s, l, r){
    if(l >= r) return 1
    else if(s[l] != s[r]) return 0
    else return recursion(s, l+1, r-1)
}

isPalindrome(s){
    return recursion(s, 0, length(s)-1)
}</pre>
                <p>위 의사 코드에서 <code>recursion</code> 함수의 호출 횟수를 세는 것이 핵심이다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 테스트케이스의 개수 T가 주어진다. (1 ≤ T ≤ 1,000)</p>
                <p>둘째 줄부터 T개의 줄에 알파벳 대문자로 구성된 문자열 S가 주어진다. (1 ≤ |S| ≤ 1,000)</p>
                <h4>출력</h4>
                <p>각 테스트케이스마다, isPalindrome 함수의 반환값과 recursion 함수의 호출 횟수를 한 줄에 공백으로 구분하여 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3
AAA
ABBA
ABCDA</pre></div>
                    <div><strong>출력</strong><pre>1 2
1 3
0 3</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ T ≤ 1,000</li>
                    <li>1 ≤ 문자열 길이 ≤ 1,000</li>
                    <li>문자열은 알파벳 대문자</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '문제에서 재귀 함수 <code>recursion(s, l, r)</code>이 이미 주어졌어! 양쪽 끝 글자를 비교하고, 같으면 안쪽으로 좁혀가는 구조야. 일단 그대로 구현하면 회문 판별은 되는데... 호출 횟수는 어떻게 세지?'
                },
                {
                    title: '근데 호출 횟수를 어떻게 세?',
                    content: '<code>recursion</code> 함수가 실행될 때마다 "나 한 번 호출됐어!"를 기록하면 돼. 함수 안 맨 첫 줄에 카운터를 1 증가시키면, 호출될 때마다 자동으로 세지!<br><br><div style="display:flex;gap:6px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.82rem;flex-wrap:wrap;"><span style="color:var(--text2);">A<u>B</u>BA:</span><span style="padding:2px 8px;background:var(--green);color:white;border-radius:4px;">A=A ✓</span><span style="padding:2px 8px;background:var(--green);color:white;border-radius:4px;">B=B ✓</span><span style="padding:2px 8px;background:var(--accent);color:white;border-radius:4px;">끝!</span><span style="color:var(--text3);margin-left:4px;">cnt = 3</span></div> <span class="lang-py"><code>global cnt</code>로 전역 변수를 쓰거나</span><span class="lang-cpp">전역 변수 <code>int cnt</code>를 쓰거나</span> 하면 돼.'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '매 테스트케이스마다 카운터를 0으로 <strong>초기화</strong>하는 걸 잊지 마! 안 그러면 이전 문자열의 횟수가 누적돼. <code>isPalindrome</code> 안에서 <code>cnt = 0</code>으로 리셋하고 <code>recursion</code>을 호출하면 깔끔해.'
                },
                {
                    title: '호출 횟수 패턴',
                    content: '회문이면 양쪽 끝에서 가운데까지 가니까 <code>(길이+1)//2</code>번 호출돼. 회문이 아니면? 불일치가 발생하는 위치까지만! 예: "ABCDA"는 A=A → B≠D에서 멈추니까 3번 (첫 호출 포함 — l=0 비교, l=1 비교에서 불일치).'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

def recursion(s, l, r):
    # 주어진 코드를 구현하되, 호출 횟수를 세세요
    pass

def isPalindrome(s):
    return recursion(s, 0, len(s)-1)

T = int(input())
for _ in range(T):
    s = input().strip()
    # 결과와 호출 횟수를 출력하세요
`,
                cpp: `#include <iostream>
#include <string>
using namespace std;

int cnt;

int recursion(string s, int l, int r) {
    cnt++;
    // 여기에 재귀 함수를 작성하세요
    return 0;
}

int main() {
    int T;
    cin >> T;
    while (T--) {
        string s;
        cin >> s;
        cnt = 0;
        int result = recursion(s, 0, s.length()-1);
        cout << result << " " << cnt << endl;
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '재귀 + 카운터',
                    description: '주어진 재귀 함수에 전역 카운터를 추가하여 호출 횟수를 센다',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

def recursion(s, l, r):
    # 주어진 코드를 구현하되, 호출 횟수를 세세요
    pass

def isPalindrome(s):
    return recursion(s, 0, len(s)-1)

T = int(input())
for _ in range(T):
    s = input().strip()
    # 결과와 호출 횟수를 출력하세요
`,
                        cpp: `#include <iostream>
#include <string>
using namespace std;

int cnt;

int recursion(string s, int l, int r) {
    cnt++;
    // 여기에 재귀 함수를 작성하세요
    return 0;
}

int main() {
    int T;
    cin >> T;
    while (T--) {
        string s;
        cin >> s;
        cnt = 0;
        int result = recursion(s, 0, s.length()-1);
        cout << result << " " << cnt << endl;
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'recursion 함수',
                                desc: '전역 카운터를 두고 재귀 호출마다 증가',
                                code: `cnt = 0
def recursion(s, l, r):
    global cnt
    cnt += 1
    if l >= r: return 1
    if s[l] != s[r]: return 0
    return recursion(s, l+1, r-1)`
                            },
                            {
                                title: 'isPalindrome',
                                desc: '카운터를 초기화하고 recursion 호출',
                                code: `def isPalindrome(s):
    global cnt
    cnt = 0
    return recursion(s, 0, len(s)-1)`
                            },
                            {
                                title: '입출력',
                                desc: 'T개의 문자열에 대해 결과 출력',
                                code: `T = int(input())
for _ in range(T):
    s = input()
    print(isPalindrome(s), cnt)`
                            }
                        ],
                        cpp: [
                            {
                                title: 'recursion 함수',
                                desc: `전역 cnt로 호출 횟수 카운팅.
string을 참조(&)로 전달하여 복사 비용 절감.`,
                                code: `#include <iostream>
#include <string>
using namespace std;

int cnt;  // 전역 카운터

int recursion(string& s, int l, int r) {
    cnt++;  // 호출될 때마다 증가
    if (l >= r) return 1;       // 회문
    if (s[l] != s[r]) return 0; // 불일치
    return recursion(s, l + 1, r - 1);
}`
                            },
                            {
                                title: '입출력',
                                desc: 'while(T--)로 테스트케이스 반복. 매번 cnt를 0으로 초기화.',
                                code: `int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T;
    cin >> T;
    while (T--) {
        string s;
        cin >> s;
        cnt = 0;  // 매 테스트케이스마다 초기화
        int result = recursion(s, 0, s.length() - 1);
        cout << result << " " << cnt << '\\n';
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
            id: 'boj-24060',
            title: 'BOJ 24060 - 알고리즘 수업: 병합 정렬 1',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/24060',
            simIntro: '병합 정렬의 분할과 병합 과정에서 값이 저장되는 순서를 확인해보세요!',
            inputLabel: '입력값 (N)',
            descriptionHTML: `
                <h3>문제</h3>
                <p>오늘도 서준이는 병합 정렬 수업 조교를 맡았다. 아래는 오름차순으로 정렬하는 병합 정렬 의사 코드이다.</p>
                <pre style="background:var(--bg);padding:1rem;border-radius:8px;border:1px solid var(--border);font-size:0.85rem;line-height:1.6;overflow-x:auto;">merge_sort(A, p, r):
    if p < r
        q = ⌊(p + r) / 2⌋
        merge_sort(A, p, q)
        merge_sort(A, q + 1, r)
        merge(A, p, q, r)

merge(A, p, q, r):
    i = p, j = q + 1, t = 1
    while i ≤ q and j ≤ r
        if A[i] ≤ A[j]
            tmp[t++] = A[i++]
        else
            tmp[t++] = A[j++]
    while i ≤ q
        tmp[t++] = A[i++]
    while j ≤ r
        tmp[t++] = A[j++]
    i = p, t = 1
    while i ≤ r
        A[i++] = tmp[t++]    # 이 부분이 "저장"</pre>
                <p>배열 A가 주어졌을 때, 병합 정렬로 배열을 오름차순으로 정렬할 경우 배열 A에 K번째로 저장되는 수를 구하는 프로그램을 작성하시오. 저장 횟수가 K보다 작으면 -1을 출력한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 배열 A의 크기 N(5 ≤ N ≤ 500,000), 저장 횟수 K(1 ≤ K ≤ 10<sup>8</sup>)가 주어진다.</p>
                <p>다음 줄에 서로 다른 배열 A의 원소 A<sub>1</sub>, A<sub>2</sub>, ..., A<sub>N</sub>이 주어진다. (1 ≤ A<sub>i</sub> ≤ 10<sup>9</sup>)</p>
                <h4>출력</h4>
                <p>배열 A에 K번째 저장 되는 수를 출력한다. 저장 횟수가 K보다 작으면 -1을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 7
4 5 1 3 2</pre></div>
                    <div><strong>출력</strong><pre>-1</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 6
4 5 1 3 2</pre></div>
                    <div><strong>출력</strong><pre>2</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N ≤ 500,000</li>
                    <li>1 ≤ K ≤ N²</li>
                    <li>1 ≤ A[i] ≤ 10<sup>9</sup></li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '병합 정렬을 그냥 구현하면 정렬은 되는데... 문제는 "K번째로 저장되는 수"를 찾는 거야. 정렬 과정에서 배열에 값이 <strong>써지는 순서</strong>를 추적해야 해. 어디서 값이 써지지?'
                },
                {
                    title: '어디서 값이 저장되는 걸까?',
                    content: '<strong>merge 단계</strong>에서야! 병합 정렬은 "나누기(분할)"와 "합치기(병합)" 두 단계인데, 실제로 배열 A에 값이 복사되는 건 merge 할 때뿐이야. 임시 배열에서 A로 값을 옮겨 쓸 때마다 1번 저장되는 거지.<br><br><div style="padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.82rem;"><div style="display:flex;gap:4px;margin-bottom:6px;"><span style="padding:3px 8px;background:var(--accent);color:white;border-radius:4px;">4</span><span style="padding:3px 8px;background:var(--accent);color:white;border-radius:4px;">5</span><span style="color:var(--text3);margin:0 4px;">+</span><span style="padding:3px 8px;background:#00b894;color:white;border-radius:4px;">1</span><span style="padding:3px 8px;background:#00b894;color:white;border-radius:4px;">3</span></div><div style="display:flex;gap:4px;align-items:center;"><span style="color:var(--text3);">→</span><span style="padding:3px 8px;background:var(--yellow);color:#333;border-radius:4px;border:1px solid var(--yellow);">1</span><span style="padding:3px 8px;background:var(--yellow);color:#333;border-radius:4px;border:1px solid var(--yellow);">3</span><span style="padding:3px 8px;background:var(--yellow);color:#333;border-radius:4px;border:1px solid var(--yellow);">4</span><span style="padding:3px 8px;background:var(--yellow);color:#333;border-radius:4px;border:1px solid var(--yellow);">5</span><span style="color:var(--text3);margin-left:4px;">저장 4번!</span></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '전역 카운터 <code>cnt</code>를 만들어서, merge에서 A에 값을 쓸 때마다 <code>cnt += 1</code>. cnt가 K가 되는 순간의 값을 <code>result</code>에 저장하면 끝! merge_sort 자체의 재귀 구조(<code>q = (p+r)//2</code>로 반 나누고, 왼쪽/오른쪽 각각 정렬 후 merge)는 교과서 그대로 구현하면 돼.'
                },
                {
                    title: '주의할 점',
                    content: '총 저장 횟수가 K보다 적으면 <code>-1</code>을 출력해야 해. result 초기값을 -1로 두면 K번째가 없을 때 자동으로 -1이 출력돼서 편해! <span class="lang-py">N이 50만이라 재귀 깊이가 깊어질 수 있어 — <code>sys.setrecursionlimit(600000)</code>을 잊지 마!</span><span class="lang-cpp">전역 배열을 사용하면 스택 오버플로 걱정 없이 깔끔해.</span>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(600000)

N, K = map(int, input().split())
A = list(map(int, input().split()))

cnt = 0
result = -1

def merge_sort(A, p, r):
    # 여기에 병합 정렬을 구현하세요
    # merge 단계에서 A에 저장할 때마다 cnt를 증가
    pass

merge_sort(A, 0, N-1)
print(result)
`,
                cpp: `#include <iostream>
using namespace std;

int A[500001], tmp[500001];
int N, K, cnt = 0, result = -1;

void merge(int p, int q, int r) {
    // 여기에 병합 함수를 작성하세요
}

void merge_sort(int p, int r) {
    if (p >= r) return;
    int q = (p + r) / 2;
    merge_sort(p, q);
    merge_sort(q + 1, r);
    merge(p, q, r);
}

int main() {
    cin >> N >> K;
    for (int i = 0; i < N; i++) cin >> A[i];
    merge_sort(0, N-1);
    cout << result << endl;
    return 0;
}`
            },
            solutions: [
                {
                    approach: '병합 정렬 추적',
                    description: '병합 정렬을 구현하면서 merge 단계의 저장 순서를 카운팅한다',
                    timeComplexity: 'O(n log n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(600000)

N, K = map(int, input().split())
A = list(map(int, input().split()))

cnt = 0
result = -1

def merge_sort(A, p, r):
    # 여기에 병합 정렬을 구현하세요
    # merge 단계에서 A에 저장할 때마다 cnt를 증가
    pass

merge_sort(A, 0, N-1)
print(result)
`,
                        cpp: `#include <iostream>
using namespace std;

int A[500001], tmp[500001];
int N, K, cnt = 0, result = -1;

void merge(int p, int q, int r) {
    // 여기에 병합 함수를 작성하세요
}

void merge_sort(int p, int r) {
    if (p >= r) return;
    int q = (p + r) / 2;
    merge_sort(p, q);
    merge_sort(q + 1, r);
    merge(p, q, r);
}

int main() {
    cin >> N >> K;
    for (int i = 0; i < N; i++) cin >> A[i];
    merge_sort(0, N-1);
    cout << result << endl;
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'merge 함수',
                                desc: '두 정렬된 구간을 병합하며 저장 횟수 카운팅',
                                code: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(600000)

cnt = 0
result = -1

def merge(A, p, q, r):
    global cnt, result
    tmp = []
    i, j = p, q + 1
    while i <= q and j <= r:
        if A[i] <= A[j]:
            tmp.append(A[i]); i += 1
        else:
            tmp.append(A[j]); j += 1
    while i <= q:
        tmp.append(A[i]); i += 1
    while j <= r:
        tmp.append(A[j]); j += 1
    for k in range(len(tmp)):
        A[p + k] = tmp[k]
        cnt += 1
        if cnt == K:
            result = tmp[k]`
                            },
                            {
                                title: 'merge_sort 재귀',
                                desc: '반으로 나눠서 각각 정렬 후 병합',
                                code: `def merge_sort(A, p, r):
    if p >= r: return
    q = (p + r) // 2
    merge_sort(A, p, q)
    merge_sort(A, q + 1, r)
    merge(A, p, q, r)`
                            },
                            {
                                title: 'K번째 체크',
                                desc: '결과가 이미 나왔으면 바로 종료할 수도 있음',
                                code: '# K번째 저장값을 찾으면 result에 저장됨'
                            },
                            {
                                title: '입출력',
                                desc: '입력 받고 merge_sort 실행 후 결과 출력',
                                code: `N, K = map(int, input().split())
A = list(map(int, input().split()))
merge_sort(A, 0, N - 1)
print(result)`
                            }
                        ],
                        cpp: [
                            {
                                title: 'merge 함수',
                                desc: `전역 배열 A, tmp로 병합.
저장할 때마다 cnt 증가, K번째면 result에 저장.`,
                                code: `#include <iostream>
using namespace std;

int A[500001], tmp[500001];
int N, K, cnt = 0, result = -1;

void merge(int p, int q, int r) {
    int i = p, j = q + 1, idx = p;
    while (i <= q && j <= r) {
        if (A[i] <= A[j]) tmp[idx++] = A[i++];
        else tmp[idx++] = A[j++];
    }
    while (i <= q) tmp[idx++] = A[i++];
    while (j <= r) tmp[idx++] = A[j++];
    // A에 복사하면서 카운팅
    for (int k = p; k <= r; k++) {
        A[k] = tmp[k];
        cnt++;
        if (cnt == K) result = tmp[k];
    }
}`
                            },
                            {
                                title: 'merge_sort 재귀',
                                desc: '반으로 나눠서 각각 정렬 후 merge로 합친다.',
                                code: `void merge_sort(int p, int r) {
    if (p >= r) return;
    int q = (p + r) / 2;
    merge_sort(p, q);
    merge_sort(q + 1, r);
    merge(p, q, r);
}`
                            },
                            {
                                title: '입출력',
                                desc: '전역 배열에 입력 후 merge_sort 실행, result 출력.',
                                code: `int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> N >> K;
    for (int i = 0; i < N; i++) cin >> A[i];
    merge_sort(0, N - 1);
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
            id: 'boj-4779',
            title: 'BOJ 4779 - 칸토어 집합',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/4779',
            simIntro: '칸토어 집합에서 가운데 1/3이 어떻게 재귀적으로 빠지는지 확인해보세요!',
            inputLabel: '입력값 (N)',
            descriptionHTML: `
                <h3>문제</h3>
                <p>칸토어 집합은 0과 1 사이의 실수로 이루어진 집합으로, [0, 1]에서 시작하여 각 구간을 3등분하여 가운데 구간을 제거하는 작업을 무한히 반복하여 얻어진다. 길이가 3^N인 문자열에서 시작하여, 가운데 1/3을 공백으로 바꾸는 과정을 반복한다. 입력이 없을 때까지 반복.</p>
                <h4>입력</h4>
                <p>입력을 여러 줄로 이루어져 있다. 각 줄에 N이 주어진다. 파일의 끝에서 입력을 멈춘다. N은 0보다 크거나 같고, 12보다 작거나 같은 정수이다.</p>
                <h4>출력</h4>
                <p>입력으로 주어진 N에 대해서, 해당하는 칸토어 집합의 근사를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>0</pre></div>
                    <div><strong>출력</strong><pre>-</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>1</pre></div>
                    <div><strong>출력</strong><pre>- -</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3</pre></div>
                    <div><strong>출력</strong><pre>- -   - -         - -   - -</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>0 ≤ N ≤ 12</li>
                    <li>입력이 없을 때까지 반복 (EOF)</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: 'N=2면 길이 9짜리 <code>---------</code>에서 가운데 3개를 공백으로 바꾸면... <code>---   ---</code>? 근데 양쪽 <code>---</code> 안에서도 또 가운데를 빼야 해! 한 번만 하는 게 아니라 <strong>반복적으로 쪼개야</strong> 하는 구조네.'
                },
                {
                    title: '이건 재귀 구조야!',
                    content: '길이 len인 구간을 3등분해서: ① 왼쪽 1/3에 재귀 ② 가운데 1/3을 공백으로 ③ 오른쪽 1/3에 재귀. "전체에서 가운데를 빼고, 남은 양쪽에서도 같은 걸 반복" — 전형적인 분할 정복이야!<br><br><div style="display:flex;flex-direction:column;gap:4px;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.82rem;font-family:monospace;"><div><span style="color:var(--accent);">N=0:</span> <span style="background:var(--accent);color:white;padding:1px 3px;border-radius:2px;">-</span></div><div><span style="color:var(--accent);">N=1:</span> <span style="background:var(--accent);color:white;padding:1px 3px;border-radius:2px;">-</span><span style="opacity:0.3;"> </span><span style="background:var(--accent);color:white;padding:1px 3px;border-radius:2px;">-</span></div><div><span style="color:var(--accent);">N=2:</span> <span style="background:var(--accent);color:white;padding:1px 3px;border-radius:2px;">-</span><span style="opacity:0.3;"> </span><span style="background:var(--accent);color:white;padding:1px 3px;border-radius:2px;">-</span><span style="opacity:0.3;">   </span><span style="background:var(--accent);color:white;padding:1px 3px;border-radius:2px;">-</span><span style="opacity:0.3;"> </span><span style="background:var(--accent);color:white;padding:1px 3px;border-radius:2px;">-</span></div></div>'
                },
                {
                    title: '멈추는 조건은?',
                    content: '길이가 1이면 더 이상 3등분할 수 없어 — 그냥 <code>-</code> 하나니까 return! 구현 팁: 처음에 길이 3<sup>N</sup>짜리 배열을 전부 <code>-</code>로 채운 뒤, 재귀적으로 가운데를 공백으로 <strong>덮어쓰는</strong> 방식이 깔끔해.'
                },
                {
                    title: 'EOF 입력 처리',
                    content: '이 문제는 입력이 여러 줄이고, 몇 줄인지 안 알려줘 (EOF까지 반복). <span class="lang-py">Python: <code>while True: try: ... except: break</code>로 입력이 없을 때까지 반복!</span><span class="lang-cpp">C++: <code>while(cin &gt;&gt; n)</code>으로 EOF까지 반복! 입력이 없으면 자동으로 루프가 끝나.</span>'
                }
            ],
            templates: {
                python: `import sys

def cantor(arr, start, size):
    # 여기에 재귀 함수를 작성하세요
    # 가운데 1/3을 공백으로 바꾸고, 양쪽 1/3에 대해 재귀
    pass

while True:
    try:
        n = int(input())
        length = 3 ** n
        arr = list('-' * length)
        cantor(arr, 0, length)
        print(''.join(arr))
    except:
        break
`,
                cpp: `#include <iostream>
#include <cstring>
#include <cmath>
using namespace std;

char arr[600000];

void cantor(int start, int size) {
    // 여기에 재귀 함수를 작성하세요
}

int main() {
    int n;
    while (cin >> n) {
        int len = pow(3, n);
        memset(arr, '-', len);
        arr[len] = '\\0';
        cantor(0, len);
        cout << arr << endl;
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '배열 재귀',
                    description: '배열을 만들고 재귀적으로 가운데 1/3을 공백으로 바꾼다',
                    timeComplexity: 'O(3^n)',
                    spaceComplexity: 'O(3^n)',
                    templates: {
                        python: `import sys

def cantor(arr, start, size):
    # 여기에 재귀 함수를 작성하세요
    # 가운데 1/3을 공백으로 바꾸고, 양쪽 1/3에 대해 재귀
    pass

while True:
    try:
        n = int(input())
        length = 3 ** n
        arr = list('-' * length)
        cantor(arr, 0, length)
        print(''.join(arr))
    except:
        break
`,
                        cpp: `#include <iostream>
#include <cstring>
#include <cmath>
using namespace std;

char arr[600000];

void cantor(int start, int size) {
    // 여기에 재귀 함수를 작성하세요
}

int main() {
    int n;
    while (cin >> n) {
        int len = pow(3, n);
        memset(arr, '-', len);
        arr[len] = '\\0';
        cantor(0, len);
        cout << arr << endl;
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'cantor 재귀 함수',
                                desc: '가운데 1/3을 공백으로 바꾸고 양쪽에 재귀',
                                code: `def cantor(arr, start, size):
    if size <= 1:
        return
    third = size // 3
    for i in range(start + third, start + 2 * third):
        arr[i] = " "
    cantor(arr, start, third)
    cantor(arr, start + 2 * third, third)`
                            },
                            {
                                title: '문자열 초기화 + 호출',
                                desc: '대시 배열을 만들고 cantor 호출',
                                code: `n = int(input())
length = 3 ** n
arr = list("-" * length)
cantor(arr, 0, length)
print("".join(arr))`
                            },
                            {
                                title: 'EOF 처리',
                                desc: 'try/except로 여러 줄 입력 처리',
                                code: `while True:
    try:
        n = int(input())
        length = 3 ** n
        arr = list("-" * length)
        cantor(arr, 0, length)
        print("".join(arr))
    except:
        break`
                            }
                        ],
                        cpp: [
                            {
                                title: 'cantor 재귀 함수',
                                desc: `memset으로 가운데 1/3을 공백으로.
양쪽 1/3에 대해 재귀 호출.`,
                                code: `#include <iostream>
#include <cstring>
#include <cmath>
using namespace std;

char arr[600000];

void cantor(int start, int size) {
    if (size <= 1) return;
    int t = size / 3;
    // 가운데 1/3을 공백으로
    memset(arr + start + t, ' ', t);
    cantor(start, t);         // 왼쪽 1/3
    cantor(start + 2 * t, t); // 오른쪽 1/3
}`
                            },
                            {
                                title: 'EOF 처리 + 출력',
                                desc: `while(cin >> n)으로 EOF까지 반복.
memset으로 대시 초기화 후 cantor 호출.`,
                                code: `int main() {
    int n;
    while (cin >> n) {
        int len = (int)pow(3, n);
        memset(arr, '-', len);  // 대시로 초기화
        arr[len] = '\\0';       // 널 종료
        cantor(0, len);
        cout << arr << '\\n';
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
            id: 'boj-2447',
            title: 'BOJ 2447 - 별 찍기 - 10',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/2447',
            simIntro: '9x9 별 패턴에서 가운데 블록이 재귀적으로 비워지는 과정을 확인해보세요!',
            inputLabel: '입력값 (N)',
            descriptionHTML: `
                <h3>문제</h3>
                <p>재귀적인 패턴으로 별을 찍어 보자. N이 3의 거듭제곱(3, 9, 27, ...)이라고 할 때, 크기 N의 패턴은 N×N 정사각형 모양이다. 크기 3의 패턴은 가운데가 비어있는 3×3 패턴이고, 크기 N의 패턴은 가운데가 비어있는 (N/3)×(N/3) 패턴을 크기 N/3의 패턴 8개로 둘러싼 형태이다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 N이 주어진다. N은 3의 거듭제곱이다. 즉 어떤 정수 k에 대해 N=3<sup>k</sup>이며, 이때 1 ≤ k < 8이다.</p>
                <h4>출력</h4>
                <p>첫째 줄부터 N번째 줄까지 별을 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>27</pre></div>
                    <div><strong>출력</strong><pre>(27×27 star pattern)</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>N은 3의 거듭제곱</li>
                    <li>3 ≤ N ≤ 2,187 (3<sup>7</sup>)</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '크기 3이면 가운데만 비운 3×3 패턴이야. 크기 9면? 9×9를 3×3 블록 9개로 나눠서 가운데 블록을 통째로 비우고, 나머지 8개 블록 안에서도 같은 패턴을 반복... 이거 칸토어 집합이랑 비슷한데, 1차원이 아니라 <strong>2차원</strong>이네!'
                },
                {
                    title: '이건 2D 재귀야!',
                    content: '칸토어 집합은 3등분(1D)이었다면, 이건 <strong>9등분(3×3, 2D)</strong>이야! 크기 size의 블록을 <code>third = size / 3</code>으로 나눠서, 가운데(i=1, j=1) 블록을 공백으로 채우고, 나머지 8개 블록에 재귀. 전체를 <code>*</code>로 먼저 채운 뒤 공백으로 "파내는" 방식이 편해.<br><br><div style="display:inline-grid;grid-template-columns:repeat(3,28px);gap:2px;padding:6px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);"><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">★</span><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">★</span><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">★</span><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">★</span><span style="text-align:center;padding:4px;background:var(--bg2);color:var(--text3);border-radius:3px;font-size:0.75rem;"> </span><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">★</span><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">★</span><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">★</span><span style="text-align:center;padding:4px;background:var(--accent);color:white;border-radius:3px;font-size:0.75rem;">★</span></div> <span style="font-size:0.82rem;color:var(--text2);">← 가운데만 비움!</span>'
                },
                {
                    title: '좌표 계산은 어떻게?',
                    content: '(row, col)에서 시작하는 size×size 블록이면, 9개 블록은 <code>(row + i*third, col + j*third)</code>에서 i,j = 0,1,2. 가운데는 i=1, j=1일 때! 나머지 8개(<code>i != 1 || j != 1</code>)에 대해 재귀하면 돼.'
                },
                {
                    title: '멈추는 조건 + 구현 팁',
                    content: 'size가 1이면 더 이상 쪼갤 수 없으니 return! <span class="lang-py">Python: 2D 리스트 <code>[["*"] * n for _ in range(n)]</code>으로 초기화.</span><span class="lang-cpp">C++: 전역 <code>char grid[2200][2200]</code>을 <code>memset(grid, \'*\', sizeof(grid))</code>로 초기화. 출력 시 각 행 끝에 <code>grid[i][N] = \'\\0\'</code>을 넣어줘야 깔끔하게 잘려.</span>'
                }
            ],
            templates: {
                python: `import sys

n = int(input())
grid = [['*'] * n for _ in range(n)]

def star(r, c, size):
    # 여기에 재귀 함수를 작성하세요
    # 가운데 블록을 공백으로 바꾸고, 나머지 8블록에 재귀
    pass

star(0, 0, n)
for row in grid:
    print(''.join(row))
`,
                cpp: `#include <iostream>
#include <cstring>
using namespace std;

char grid[2200][2200];
int N;

void star(int r, int c, int size) {
    // 여기에 재귀 함수를 작성하세요
}

int main() {
    cin >> N;
    memset(grid, '*', sizeof(grid));
    star(0, 0, N);
    for (int i = 0; i < N; i++) {
        grid[i][N] = '\\0';
        cout << grid[i] << '\\n';
    }
    return 0;
}`
            },
            solutions: [
                {
                    approach: '2D 배열 재귀',
                    description: '전체를 *로 채운 뒤 재귀적으로 가운데 블록을 공백으로 바꾼다',
                    timeComplexity: 'O(n^2)',
                    spaceComplexity: 'O(n^2)',
                    templates: {
                        python: `import sys

n = int(input())
grid = [['*'] * n for _ in range(n)]

def star(r, c, size):
    # 여기에 재귀 함수를 작성하세요
    # 가운데 블록을 공백으로 바꾸고, 나머지 8블록에 재귀
    pass

star(0, 0, n)
for row in grid:
    print(''.join(row))
`,
                        cpp: `#include <iostream>
#include <cstring>
using namespace std;

char grid[2200][2200];
int N;

void star(int r, int c, int size) {
    // 여기에 재귀 함수를 작성하세요
}

int main() {
    cin >> N;
    memset(grid, '*', sizeof(grid));
    star(0, 0, N);
    for (int i = 0; i < N; i++) {
        grid[i][N] = '\\0';
        cout << grid[i] << '\\n';
    }
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'star 재귀 함수',
                                desc: '가운데 블록을 공백으로 바꾸고 8개 블록에 재귀',
                                code: `def star(r, c, size):
    if size <= 1:
        return
    t = size // 3
    for i in range(r + t, r + 2 * t):
        for j in range(c + t, c + 2 * t):
            grid[i][j] = " "
    for i in range(3):
        for j in range(3):
            if i != 1 or j != 1:
                star(r + i * t, c + j * t, t)`
                            },
                            {
                                title: '그리드 생성 + 호출',
                                desc: 'N×N 그리드를 *로 채우고 star 호출',
                                code: `n = int(input())
grid = [["*"] * n for _ in range(n)]
star(0, 0, n)`
                            },
                            {
                                title: '출력',
                                desc: '각 행을 문자열로 변환하여 출력',
                                code: `for row in grid:
    print("".join(row))`
                            }
                        ],
                        cpp: [
                            {
                                title: 'star 재귀 함수',
                                desc: `2D char 배열에서 가운데 블록을 공백으로.
9블록 중 가운데(i=1,j=1) 제외 8개에 재귀.`,
                                code: `#include <iostream>
#include <cstring>
using namespace std;

char grid[2200][2200];  // 전역: 3^7 = 2187
int N;

void star(int r, int c, int size) {
    if (size <= 1) return;
    int t = size / 3;
    // 가운데 블록을 공백으로
    for (int i = r + t; i < r + 2 * t; i++)
        for (int j = c + t; j < c + 2 * t; j++)
            grid[i][j] = ' ';
    // 나머지 8개 블록에 재귀
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (i != 1 || j != 1)
                star(r + i * t, c + j * t, t);
}`
                            },
                            {
                                title: '그리드 생성 + 출력',
                                desc: `memset으로 * 초기화 후 star 호출.
각 행 끝에 널 문자로 잘라서 출력.`,
                                code: `int main() {
    cin >> N;
    memset(grid, '*', sizeof(grid));
    star(0, 0, N);
    for (int i = 0; i < N; i++) {
        grid[i][N] = '\\0';  // 행 끝 표시
        cout << grid[i] << '\\n';
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
            id: 'boj-11729',
            title: 'BOJ 11729 - 하노이 탑 이동 순서',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/11729',
            simIntro: '3개 원판의 하노이 탑이 7번의 이동으로 어떻게 옮겨지는지 확인해보세요!',
            inputLabel: '입력값 (N)',
            descriptionHTML: `
                <h3>문제</h3>
                <p>세 개의 장대가 있고 첫 번째 장대에 반경이 서로 다른 n개의 원판이 쌓여 있다. 이 원판을 다음과 같은 규칙에 따라 세 번째 장대로 옮기려 한다. 한 번에 한 개의 원판만을 다른 탑으로 옮길 수 있다. 쌓아 놓은 원판은 항상 위의 것이 아래의 것보다 작아야 한다. 이 작업을 수행하는데 필요한 이동 순서를 출력하는 프로그램을 작성하라. 단, 이동 횟수는 최소가 되어야 한다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 첫 번째 장대에 쌓인 원판의 개수 N (1 ≤ N ≤ 20)이 주어진다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 옮긴 횟수 K를 출력한다.</p>
                <p>두 번째 줄부터 수행 과정을 출력한다. 두 번째 줄부터 K개의 줄에 걸쳐 두 정수 A B를 빈칸을 사이에 두고 출력하는데, 이는 A번째 탑의 가장 위에 있는 원판을 B번째 탑의 가장 위로 옮긴다는 뜻이다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>3</pre></div>
                    <div><strong>출력</strong><pre>7
1 3
1 2
3 2
1 3
2 1
2 3
1 3</pre></div>
                </div></div>
                <h4>제약 조건</h4>
                <ul><li>1 ≤ N ≤ 20</li></ul>
            `,
            hints: [
                {
                    title: '처음 떠오르는 방법',
                    content: '원판 1개는 쉬워 — 그냥 옮기면 돼. 원판 2개도 해볼 만해: 작은 걸 보조 기둥에, 큰 걸 목표에, 작은 걸 다시 목표에. 근데 원판 3개, 4개는... 머리가 복잡해지는데, 일일이 시뮬레이션하지 않고 <strong>패턴</strong>을 찾을 수 없을까?'
                },
                {
                    title: '핵심 아이디어',
                    content: 'N개의 원판을 1번→3번으로 옮기는 문제를 <strong>3단계</strong>로 쪼개면 돼! ① 위 N-1개를 2번 기둥으로 (가장 큰 원판이 드러나도록) ② 가장 큰 원판을 3번으로 ③ 2번에 있는 N-1개를 다시 3번으로. "위 N-1개를 옮기는 것"도 같은 문제 — 이게 재귀야!<br><br><div style="display:flex;gap:16px;align-items:center;padding:8px 12px;background:var(--bg);border-radius:8px;border:1px solid var(--bg3);font-size:0.8rem;flex-wrap:wrap;"><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--text3);margin-bottom:2px;">①</div><div style="padding:3px 8px;background:var(--accent);color:white;border-radius:4px;">N-1 → 보조</div></div><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--text3);margin-bottom:2px;">②</div><div style="padding:3px 8px;background:var(--yellow);color:#333;border-radius:4px;font-weight:700;">큰판 → 목표</div></div><div style="text-align:center;"><div style="font-size:0.7rem;color:var(--text3);margin-bottom:2px;">③</div><div style="padding:3px 8px;background:var(--green);color:white;border-radius:4px;">N-1 → 목표</div></div></div>'
                },
                {
                    title: '이렇게 하면 어떨까?',
                    content: '<code>hanoi(n, from, to, via)</code> 함수를 만들어: n개를 from→to로, 보조 기둥은 via. 멈추는 조건은 <code>n = 0</code>이면 옮길 게 없으니 return. <code>n = 1</code>이면 바로 from→to 출력해도 되지만, n=0으로 멈춰도 자연스럽게 동작해!'
                },
                {
                    title: '이동 횟수는 미리 알 수 있어!',
                    content: '최소 이동 횟수는 <code>2<sup>N</sup> - 1</code>이야. 왜냐하면 <code>T(N) = 2 × T(N-1) + 1</code>이거든 (N-1개 옮기기 × 2 + 큰 원판 1번). 이 점화식을 풀면 <code>2<sup>N</sup> - 1</code>! 먼저 이 숫자를 출력하고, 그 다음에 이동 순서를 출력하면 돼.'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

n = int(input())
moves = []

def hanoi(n, fr, to, via):
    # 여기에 재귀 함수를 작성하세요
    pass

hanoi(n, 1, 3, 2)
print(len(moves))
print('\\n'.join(moves))
`,
                cpp: `#include <iostream>
#include <cmath>
using namespace std;

void hanoi(int n, int from, int to, int via) {
    // 여기에 재귀 함수를 작성하세요
}

int main() {
    int n;
    cin >> n;
    cout << (int)pow(2, n) - 1 << '\\n';
    hanoi(n, 1, 3, 2);
    return 0;
}`
            },
            solutions: [
                {
                    approach: '재귀 풀이',
                    description: 'hanoi(n, from, to, via) 재귀로 이동 순서를 구한다',
                    timeComplexity: 'O(2^n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

n = int(input())
moves = []

def hanoi(n, fr, to, via):
    # 여기에 재귀 함수를 작성하세요
    pass

hanoi(n, 1, 3, 2)
print(len(moves))
print('\\n'.join(moves))
`,
                        cpp: `#include <iostream>
#include <cmath>
using namespace std;

void hanoi(int n, int from, int to, int via) {
    // 여기에 재귀 함수를 작성하세요
}

int main() {
    int n;
    cin >> n;
    cout << (int)pow(2, n) - 1 << '\\n';
    hanoi(n, 1, 3, 2);
    return 0;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'hanoi 함수',
                                desc: 'N-1개를 via로, 가장 큰 원판을 to로, N-1개를 to로',
                                code: `import sys
input = sys.stdin.readline

moves = []

def hanoi(n, fr, to, via):
    if n == 0:
        return
    hanoi(n - 1, fr, via, to)
    moves.append(f"{fr} {to}")
    hanoi(n - 1, via, to, fr)`
                            },
                            {
                                title: '이동 횟수 + 호출',
                                desc: '2^n - 1 출력 후 hanoi 호출',
                                code: `n = int(input())
print(2 ** n - 1)
hanoi(n, 1, 3, 2)`
                            },
                            {
                                title: '출력',
                                desc: '이동 순서를 줄바꿈으로 출력',
                                code: 'print("\\n".join(moves))'
                            }
                        ],
                        cpp: [
                            {
                                title: 'hanoi 함수',
                                desc: `Python과 동일한 재귀 구조.
cout으로 바로 출력 (배열에 저장 불필요).`,
                                code: `#include <iostream>
#include <cmath>
using namespace std;

void hanoi(int n, int from, int to, int via) {
    if (n == 0) return;
    hanoi(n - 1, from, via, to);     // 위 N-1개를 via로
    cout << from << " " << to << '\\n'; // 가장 큰 원판 이동
    hanoi(n - 1, via, to, from);     // N-1개를 to로
}`
                            },
                            {
                                title: '이동 횟수 + 호출',
                                desc: `pow(2,n)-1 = 최소 이동 횟수.
먼저 출력하고 hanoi 재귀 시작.`,
                                code: `int main() {
    int n;
    cin >> n;
    cout << (int)pow(2, n) - 1 << '\\n';
    hanoi(n, 1, 3, 2);
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
