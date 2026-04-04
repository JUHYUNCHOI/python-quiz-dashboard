import type { AlgoTopic } from '../types'

export const stringTopic: AlgoTopic = {
    id: 'string',
    title: '문자열 조작',
    icon: '🔤',
    category: '기초 (Bronze~Silver)',
    order: 1,
    description: '빈도수 분석, 팰린드롬, 애너그램 등 문자열 핵심 유형과 풀이법',
    track: 'both',
    stages: [
        {
            num: 1,
            title: '알파벳 찾기',
            problemIds: [
                'boj-10809'
            ],
            desc: '문자열 순회 입문'
        },
        {
            num: 2,
            title: '빈도수 분석',
            problemIds: [
                'boj-1157'
            ],
            desc: '문자 등장 횟수 세기'
        },
        {
            num: 3,
            title: '팰린드롬 판별',
            problemIds: [
                'lc-125'
            ],
            desc: '투 포인터 기본 패턴'
        },
        {
            num: 4,
            title: '애너그램 그룹화',
            problemIds: [
                'lc-49'
            ],
            desc: '정렬 키 + 해시맵'
        },
        {
            num: 5,
            title: '문자열 재구성',
            problemIds: [
                'boj-1213'
            ],
            desc: '빈도수 활용한 재배열'
        }
    ],
    problems: [
        {
            id: 'boj-10809',
            title: 'BOJ 10809 - 알파벳 찾기',
            difficulty: 'bronze',
            link: 'https://www.acmicpc.net/problem/10809',
            simIntro: '문자열을 한 글자씩 순회하면서 각 알파벳의 첫 등장 위치를 기록하는 과정을 확인해보세요!',
            sim: { type: 'alphabet-search', defaultInput: 'baekjoon' },
            descriptionHTML: `
                <h3>문제</h3>
                <p>알파벳 소문자로만 이루어진 단어 S가 주어진다. 각각의 알파벳에 대해서, 단어에 포함되어 있는 경우에는 <strong>처음 등장하는 위치</strong>를, 포함되어 있지 않은 경우에는 <strong>-1</strong>을 출력하는 프로그램을 작성하시오.</p>

                <h4>입력</h4>
                <p>첫째 줄에 단어 S가 주어진다. 단어의 길이는 100을 넘지 않으며, 알파벳 소문자로만 이루어져 있다.</p>

                <h4>출력</h4>
                <p>각각의 알파벳에 대해서, a가 처음 등장하는 위치, b가 처음 등장하는 위치, … z가 처음 등장하는 위치를 공백으로 구분해서 출력한다.</p>
                <p>만약, 어떤 알파벳이 단어에 포함되어 있지 않다면 -1을 출력한다. 단어의 첫 번째 글자는 0번째 위치이고, 두 번째 글자는 1번째 위치이다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>baekjoon</pre></div>
                    <div><strong>출력</strong><pre>1 0 -1 -1 2 -1 -1 -1 -1 4 3 -1 -1 7 5 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1</pre></div>
                </div>
                <p class="example-explain">b→0, a→1, e→2, k→3, j→4, o→5, n→7 위치에 처음 등장. 나머지 알파벳은 -1</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>단어의 길이는 1 이상 100 이하</li>
                    <li>알파벳 소문자로만 이루어져 있음</li>
                </ul>
            `,
            hints: [
                {
                    title: '문제를 쉽게 이해해보자',
                    content: '"baekjoon"에서 a는 몇 번째에 <strong>처음</strong> 나올까?<br>b→0번, a→1번, e→2번… 이렇게 26개 알파벳 각각의 <strong>첫 등장 위치</strong>를 찾는 문제예요!<br>문자열에 없는 알파벳은 <code>-1</code>로 출력합니다.'
                },
                {
                    title: '크기 26인 배열을 만들자!',
                    content: '알파벳은 a~z 총 <strong>26개</strong>니까, 크기 26인 배열을 <code>-1</code>로 채워서 시작해요.<br><span class="lang-py">Python: <code>result = [-1] * 26</code></span><span class="lang-cpp">C++: <code>int result[26]; fill(result, result+26, -1);</code></span><br><br>a→0번 칸, b→1번 칸, … z→25번 칸으로 매핑하면 돼요!'
                },
                {
                    title: '문자를 숫자로 바꾸는 법',
                    content: '알파벳을 배열 인덱스로 바꾸려면?<br><span class="lang-py">Python: <code>ord(\'a\') - ord(\'a\') = 0</code>, <code>ord(\'b\') - ord(\'a\') = 1</code></span><span class="lang-cpp">C++: <code>\'a\' - \'a\' = 0</code>, <code>\'b\' - \'a\' = 1</code> (char 자체가 숫자!)</span><div style="display:flex;align-items:end;gap:6px;margin:14px 0;padding:12px;background:var(--bg2);border-radius:10px;flex-wrap:wrap;"><div style="text-align:center;"><div style="background:#6c5ce7;color:white;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;">a</div><div style="font-size:0.75rem;color:var(--text3);margin-top:4px;">0</div></div><div style="text-align:center;"><div style="background:#6c5ce7;color:white;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;">b</div><div style="font-size:0.75rem;color:var(--text3);margin-top:4px;">1</div></div><div style="text-align:center;"><div style="background:#6c5ce7;color:white;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;">c</div><div style="font-size:0.75rem;color:var(--text3);margin-top:4px;">2</div></div><div style="color:var(--text3);font-size:1.2em;padding:0 4px;">...</div><div style="text-align:center;"><div style="background:#00b894;color:white;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;">z</div><div style="font-size:0.75rem;color:var(--text3);margin-top:4px;">25</div></div></div>이렇게 하면 어떤 알파벳이든 0~25 사이의 인덱스로 변환할 수 있어요.'
                },
                {
                    title: '핵심: "처음"만 기록하기',
                    content: '문자열을 앞에서부터 순회하면서:<br>1. 현재 글자의 인덱스를 계산 (<code>ch - \'a\'</code>)<br>2. <code>result[인덱스]</code>가 <code>-1</code>이면? → <strong>처음 등장!</strong> 현재 위치를 기록<br>3. <code>-1</code>이 아니면? → 이미 기록됨, <strong>건너뛰기</strong><br><br>이 조건 하나면 "처음 등장하는 위치"만 정확히 기록할 수 있어요!'
                }
            ],
            solutions: [
                {
                    approach: '배열 순회',
                    description: '크기 26 배열을 -1로 초기화하고, 문자열을 순회하며 첫 등장 위치만 기록한다',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `s = input()
result = [-1] * 26  # a~z 26칸, 모두 -1로 시작

for i in range(len(s)):
    idx = ord(s[i]) - ord('a')  # 알파벳 → 배열 인덱스
    if result[idx] == -1:        # 처음 등장하는 경우에만 기록
        result[idx] = i

print(' '.join(map(str, result)))`,
                        cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    int result[26];
    fill(result, result + 26, -1);  // 모두 -1로 초기화

    for (int i = 0; i < s.size(); i++) {
        int idx = s[i] - 'a';  // 알파벳 → 배열 인덱스
        if (result[idx] == -1)  // 처음 등장하는 경우에만 기록
            result[idx] = i;
    }

    for (int i = 0; i < 26; i++)
        cout << result[i] << (i < 25 ? " " : "\\n");
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 받기',
                                desc: '알파벳 소문자로 이루어진 단어를 입력받습니다.',
                                code: 's = input()'
                            },
                            {
                                title: '결과 배열 초기화',
                                desc: `26개 알파벳(a~z)의 첫 등장 위치를 저장할 배열.
처음엔 모두 -1 → "아직 안 나왔다"는 뜻!`,
                                code: 'result = [-1] * 26  # a~z 각각의 첫 위치'
                            },
                            {
                                title: '문자열 순회 + 기록',
                                desc: `핵심: 각 문자를 0~25 인덱스로 변환!
ord('a') - ord('a') = 0, ord('b') - ord('a') = 1, ...
-1인 경우에만 기록 → "처음 등장"만 저장.`,
                                code: `for i in range(len(s)):
    idx = ord(s[i]) - ord('a')  # 알파벳 → 0~25 인덱스
    if result[idx] == -1:        # 처음 등장하는 경우에만
        result[idx] = i          # 현재 위치를 기록`
                            },
                            {
                                title: '출력',
                                desc: `26개 값을 공백으로 구분하여 출력합니다.
map(str, result) → 숫자 리스트를 문자열로 변환.`,
                                code: 'print(\' \'.join(map(str, result)))'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 + 배열 초기화',
                                desc: `문자열 입력 후 크기 26 배열을 -1로 채웁니다.
fill()로 배열 전체를 한번에 초기화!`,
                                code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    int result[26];
    fill(result, result + 26, -1);  // 모두 -1로 초기화`
                            },
                            {
                                title: '문자열 순회 + 기록',
                                desc: `C++에서는 char 자체가 숫자!
s[i] - 'a' → 0~25 인덱스 변환.
-1일 때만 기록 → 첫 등장 위치만 저장.`,
                                code: `    for (int i = 0; i < s.size(); i++) {
        int idx = s[i] - 'a';      // 알파벳 → 0~25 인덱스
        if (result[idx] == -1)      // 처음 등장하는 경우에만
            result[idx] = i;        // 현재 위치를 기록
    }`
                            },
                            {
                                title: '출력',
                                desc: '26개 값을 공백으로 구분하여 출력합니다.',
                                code: `    for (int i = 0; i < 26; i++)
        cout << result[i] << (i < 25 ? " " : "\\n");
}`
                            }
                        ]
                    }
                },
                {
                    approach: 'find 메서드',
                    description: '각 알파벳에 대해 find()로 첫 등장 위치를 바로 구한다',
                    timeComplexity: 'O(26·n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `s = input()

# 각 알파벳에 대해 find()로 첫 위치를 구함
# find()는 없으면 -1을 반환 — 딱 우리가 원하는 것!
result = [s.find(chr(i + ord('a'))) for i in range(26)]

print(' '.join(map(str, result)))`,
                        cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    for (int i = 0; i < 26; i++) {
        char ch = 'a' + i;
        // find()는 못 찾으면 string::npos 반환
        size_t pos = s.find(ch);
        cout << (pos == string::npos ? -1 : (int)pos);
        if (i < 25) cout << ' ';
    }
    cout << endl;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'find() 메서드란?',
                                desc: `Python의 str.find(ch)는 문자열에서 ch의
첫 등장 위치를 반환합니다.
없으면 -1 반환 → 딱 우리가 원하는 것!`,
                                code: 's = input()'
                            },
                            {
                                title: 'a~z 각각 find()',
                                desc: `리스트 컴프리헨션으로 26개 알파벳 한번에 처리!
chr(i + ord('a')) → 0→'a', 1→'b', ..., 25→'z'`,
                                code: `# 각 알파벳에 대해 find()로 첫 위치를 구함
result = [s.find(chr(i + ord('a'))) for i in range(26)]`
                            },
                            {
                                title: '출력',
                                desc: '결과 출력. find()가 -1을 반환하므로 별도 처리 불필요!',
                                code: 'print(\' \'.join(map(str, result)))'
                            }
                        ],
                        cpp: [
                            {
                                title: 'string::find()란?',
                                desc: `C++의 string::find(ch)는 문자의
첫 등장 위치를 반환합니다.
없으면 string::npos(매우 큰 수) 반환.`,
                                code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;`
                            },
                            {
                                title: 'a~z 각각 find()',
                                desc: `각 알파벳에 대해 find()로 첫 위치를 구합니다.
npos면 -1로 변환하여 출력합니다.`,
                                code: `    for (int i = 0; i < 26; i++) {
        char ch = 'a' + i;
        size_t pos = s.find(ch);
        cout << (pos == string::npos ? -1 : (int)pos);
        if (i < 25) cout << ' ';
    }
    cout << endl;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1157',
            title: 'BOJ 1157 - 단어 공부',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1157',
            simIntro: '딕셔너리로 글자 빈도를 세는 과정을 확인해보세요! (코드 탭에서는 배열 방식도 볼 수 있어요)',
            sim: { type: 'char-freq', defaultInput: 'Mississipi' },
            descriptionHTML: `
                <h3>문제</h3>
                <p>알파벳 대소문자로 이루어진 단어가 주어집니다.
                이 단어에서 <strong>가장 많이 사용된 알파벳</strong>을 대문자로 출력하세요.
                가장 많이 사용된 알파벳이 여러 개라면 <code>?</code>를 출력합니다.</p>
                <h4>입력</h4>
                <p>알파벳 대소문자로 이루어진 단어가 주어진다. 주어지는 단어의 길이는 1,000,000을 넘지 않는다.</p>
                <h4>출력</h4>
                <p>이 단어에서 가장 많이 사용된 알파벳을 대문자로 출력한다. 단, 가장 많이 사용된 알파벳이 여러 개 존재하는 경우에는 <code>?</code>를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>Mississipi</pre></div>
                    <div><strong>출력</strong><pre>?</pre></div>
                </div>
                <p class="example-explain">I와 S가 각각 4번으로 공동 최다 → <code>?</code> 출력</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>zZa</pre></div>
                    <div><strong>출력</strong><pre>Z</pre></div>
                </div>
                <p class="example-explain">대소문자 무시하면 Z가 2번으로 최다 → 대문자 <code>Z</code> 출력</p>
                </div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>z</pre></div>
                    <div><strong>출력</strong><pre>Z</pre></div>
                </div>
                <p class="example-explain">글자가 하나뿐이므로 대문자로 출력</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>단어의 길이는 1 이상 1,000,000 이하</li>
                    <li>알파벳 대소문자로만 이루어져 있음</li>
                </ul>
            `,
            hints: [
                {
                    title: '문제를 쉽게 이해해보자',
                    content: '<code>"Mississipi"</code>에서 가장 많이 나온 글자는?<br>대소문자를 구분하지 않으니까 먼저 전부 대문자(또는 소문자)로 바꿔야 해요.<br>그 다음 각 글자가 몇 번 나왔는지 세면 됩니다!'
                },
                {
                    title: '글자를 숫자로? — ASCII 코드',
                    content: '컴퓨터는 글자를 <strong>숫자(ASCII 코드)</strong>로 저장해요.<br><code>\'A\' = 65</code>, <code>\'B\' = 66</code>, … <code>\'Z\' = 90</code><br><br><span class="lang-py">Python: <code>ord(\'A\')</code> → 65, <code>chr(65)</code> → \'A\'</span><span class="lang-cpp">C++: <code>(int)\'A\'</code> → 65, <code>(char)65</code> → \'A\' (char 자체가 숫자!)</span><br><br><a href="https://ko.wikipedia.org/wiki/ASCII" target="_blank" style="color: var(--accent); text-decoration: underline; font-size: 0.9em;">📎 ASCII 코드표 전체 보기 →</a>'
                },
                {
                    title: '방법 1: 배열로 세기',
                    content: '알파벳은 A~Z 딱 <strong>26개</strong>니까, 크기 26인 배열을 만들어요.<br><span class="lang-py">Python: <code>count = [0] * 26</code></span><span class="lang-cpp">C++: <code>int count[26] = {0};</code></span><br><br>A를 0번 칸에 넣고 싶으면?<br><code>\'A\' - \'A\' = 65 - 65 = <strong>0</strong></code> ✓<br><code>\'B\' - \'A\' = 66 - 65 = <strong>1</strong></code> ✓<br><code>\'Z\' - \'A\' = 90 - 65 = <strong>25</strong></code> ✓<br><br>그래서 <code>count[c - \'A\'] += 1</code> 이렇게 세는 거예요!'
                },
                {
                    title: '방법 2: 해시맵으로 세기',
                    content: '해시맵을 쓰면 더 직관적이에요!<br><span class="lang-py">Python: <code>freq = {}</code> (딕셔너리)</span><span class="lang-cpp">C++: <code>unordered_map&lt;char, int&gt; freq;</code></span><br><br>글자가 나올 때마다 <code>freq[c] += 1</code>로 카운트!<br>결과: <code>{"M": 1, "I": 4, "S": 4, "P": 1}</code><br>시뮬레이션에서는 이 방법으로 보여줍니다!'
                },
                {
                    title: '최댓값이 여러 개면?',
                    content: '가장 큰 빈도를 찾은 뒤, 그 빈도를 가진 글자가 <strong>2개 이상</strong>이면 <code>?</code>를 출력해요.<div style="display:flex;gap:16px;margin:14px 0;align-items:end;justify-content:center;"><div style="text-align:center;"><div style="background:#6c5ce7;color:white;width:40px;height:80px;border-radius:8px;display:flex;align-items:end;justify-content:center;padding-bottom:6px;font-weight:700;font-size:0.85rem;">4</div><div style="font-size:0.8rem;margin-top:4px;font-weight:600;">I</div></div><div style="text-align:center;"><div style="background:#e17055;color:white;width:40px;height:80px;border-radius:8px;display:flex;align-items:end;justify-content:center;padding-bottom:6px;font-weight:700;font-size:0.85rem;">4</div><div style="font-size:0.8rem;margin-top:4px;font-weight:600;">S</div></div><div style="text-align:center;"><div style="background:#dfe6e9;color:#636e72;width:40px;height:40px;border-radius:8px;display:flex;align-items:end;justify-content:center;padding-bottom:6px;font-weight:700;font-size:0.85rem;">2</div><div style="font-size:0.8rem;margin-top:4px;">P</div></div><div style="text-align:center;"><div style="background:#dfe6e9;color:#636e72;width:40px;height:20px;border-radius:8px;display:flex;align-items:end;justify-content:center;padding-bottom:6px;font-weight:700;font-size:0.85rem;">1</div><div style="font-size:0.8rem;margin-top:4px;">M</div></div></div><div style="text-align:center;color:#e17055;font-weight:700;">I와 S 둘 다 최대(4번) → <code>?</code> 출력!</div>'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

word = input().strip().upper()
count = [0] * 26

for c in word:
    count[ord(c) - ord('A')] += 1

max_count = max(count)

if count.count(max_count) > 1:
    print('?')
else:
    print(chr(count.index(max_count) + ord('A')))`,
                cpp: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    string word;
    cin >> word;

    int cnt[26] = {};
    for (char c : word) cnt[toupper(c) - 'A']++;

    int mx = *max_element(cnt, cnt + 26);
    int idx = -1, dup = 0;
    for (int i = 0; i < 26; i++) {
        if (cnt[i] == mx) { idx = i; dup++; }
    }
    printf("%c\\n", dup > 1 ? '?' : 'A' + idx);
}`
            },
            solutions: [
                {
                    approach: '배열 카운팅',
                    description: '크기 26 배열로 각 알파벳 빈도를 세고, 최댓값을 가진 문자를 찾는다',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `word = input().upper()
cnt = [0] * 26
for c in word:
    cnt[ord(c) - ord('A')] += 1

mx = max(cnt)
if cnt.count(mx) > 1:
    print('?')
else:
    print(chr(cnt.index(mx) + ord('A')))`,
                        cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    int cnt[26] = {};
    for (char c : s) cnt[toupper(c) - 'A']++;

    int mx = 0, idx = 0, dup = 0;
    for (int i = 0; i < 26; i++) {
        if (cnt[i] > mx) { mx = cnt[i]; idx = i; dup = 1; }
        else if (cnt[i] == mx && mx > 0) dup++;
    }
    cout << (dup > 1 ? "?" : string(1, 'A' + idx)) << endl;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 + 대문자 변환',
                                desc: `대소문자 구분 없이 세야 하므로 upper()로 통일.
"Mississipi" → "MISSISSIPI"`,
                                code: 'word = input().upper()  # 대소문자 통일'
                            },
                            {
                                title: '빈도 배열 카운팅',
                                desc: `핵심: 크기 26 배열로 알파벳 빈도를 셉니다.
ord(c) - ord('A') → A=0, B=1, ..., Z=25 인덱스 변환.`,
                                code: `cnt = [0] * 26  # A~Z 각 빈도
for c in word:
    cnt[ord(c) - ord('A')] += 1  # 해당 알파벳 +1`
                            },
                            {
                                title: '최댓값 찾기',
                                desc: '가장 많이 등장한 횟수를 찾습니다.',
                                code: 'mx = max(cnt)'
                            },
                            {
                                title: '중복 체크 + 출력',
                                desc: `최댓값이 여러 개 → 가장 많은 문자가 둘 이상 → "?" 출력.
하나뿐이면 해당 문자를 출력합니다.`,
                                code: `if cnt.count(mx) > 1:       # 최댓값이 여러 개?
    print('?')
else:
    print(chr(cnt.index(mx) + ord('A')))  # 인덱스 → 문자`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 받기',
                                desc: '문자열을 입력받습니다.',
                                code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;`
                            },
                            {
                                title: '빈도 배열 카운팅',
                                desc: `크기 26 배열로 알파벳 빈도를 셉니다.
toupper()로 대소문자를 통일합니다.`,
                                code: `    int cnt[26] = {};  // A~Z 각 빈도
    for (char c : s) cnt[toupper(c) - 'A']++;`
                            },
                            {
                                title: '최댓값 + 중복 체크',
                                desc: `한 번의 순회로 최댓값과 중복 여부를 동시에 파악.
새 최대 발견 → dup 리셋. 같은 최대 → dup 증가.`,
                                code: `    int mx = 0, idx = 0, dup = 0;
    for (int i = 0; i < 26; i++) {
        if (cnt[i] > mx) { mx = cnt[i]; idx = i; dup = 1; }
        else if (cnt[i] == mx && mx > 0) dup++;
    }`
                            },
                            {
                                title: '출력',
                                desc: '중복이면 "?", 아니면 해당 알파벳 출력.',
                                code: `    cout << (dup > 1 ? "?" : string(1, 'A' + idx)) << endl;
}`
                            }
                        ]
                    }
                },
                {
                    approach: '딕셔너리',
                    description: '딕셔너리(해시맵)로 문자별 빈도를 세고, 최댓값을 찾는다',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `word = input().upper()
freq = {}
for c in word:
    if c in freq:
        freq[c] += 1
    else:
        freq[c] = 1

mx = max(freq.values())
candidates = [k for k, v in freq.items() if v == mx]
print('?' if len(candidates) > 1 else candidates[0])`,
                        cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    string s;
    cin >> s;
    unordered_map<char, int> freq;
    for (char c : s) freq[toupper(c)]++;

    int mx = 0;
    for (auto& [ch, cnt] : freq) mx = max(mx, cnt);

    int dup = 0;
    char ans = '?';
    for (auto& [ch, cnt] : freq) {
        if (cnt == mx) { ans = ch; dup++; }
    }
    cout << (dup > 1 ? '?' : ans) << endl;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 + 대문자 변환',
                                desc: '대소문자 구분 없이 세기 위해 upper()로 통일.',
                                code: 'word = input().upper()  # 대소문자 통일'
                            },
                            {
                                title: '딕셔너리 카운팅',
                                desc: `배열 대신 딕셔너리로 빈도를 셉니다.
키가 없으면 1로 초기화, 있으면 +1.
→ 어떤 문자든 셀 수 있어 더 범용적!`,
                                code: `freq = {}  # {문자: 빈도}
for c in word:
    if c in freq:
        freq[c] += 1   # 이미 있으면 +1
    else:
        freq[c] = 1     # 처음 보면 1로 시작`
                            },
                            {
                                title: '최댓값 찾기',
                                desc: '딕셔너리의 모든 값(빈도) 중 최대를 찾습니다.',
                                code: 'mx = max(freq.values())  # 최대 빈도'
                            },
                            {
                                title: '후보 체크 + 출력',
                                desc: `최대 빈도를 가진 문자가 여러 개면 "?" 출력.
리스트 컴프리헨션으로 후보를 추출합니다.`,
                                code: `candidates = [k for k, v in freq.items() if v == mx]
print('?' if len(candidates) > 1 else candidates[0])`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 + 해시맵 준비',
                                desc: `unordered_map으로 문자별 빈도를 저장합니다.
배열과 달리 어떤 문자든 키로 사용 가능!`,
                                code: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    string s;
    cin >> s;`
                            },
                            {
                                title: '빈도 카운팅',
                                desc: `toupper()로 대문자 변환 후 해시맵에 기록.
freq[key]++ → 없으면 0에서 시작, 있으면 +1.`,
                                code: `    unordered_map<char, int> freq;
    for (char c : s) freq[toupper(c)]++; // 대문자로 통일 후 카운팅`
                            },
                            {
                                title: '최댓값 찾기',
                                desc: '해시맵의 모든 빈도를 순회하며 최대값을 찾습니다.',
                                code: `    int mx = 0;
    for (auto& [ch, cnt] : freq) mx = max(mx, cnt);`
                            },
                            {
                                title: '후보 체크 + 출력',
                                desc: '최대 빈도 문자가 여러 개면 "?", 하나면 해당 문자.',
                                code: `    int dup = 0;
    char ans = '?';
    for (auto& [ch, cnt] : freq) {
        if (cnt == mx) { ans = ch; dup++; }
    }
    cout << (dup > 1 ? '?' : ans) << endl;
}`
                            }
                        ]
                    }
                },
                {
                    approach: 'Counter',
                    description: 'Counter의 most_common()으로 가장 빈도 높은 문자를 바로 구한다',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `from collections import Counter

word = input().upper()
counter = Counter(word)
top = counter.most_common()

if len(top) > 1 and top[0][1] == top[1][1]:
    print('?')
else:
    print(top[0][0])`,
                        cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    string word;
    cin >> word;
    // 대문자 변환
    for (char& c : word) c = toupper(c);

    // 빈도 세기 — Counter 대신 unordered_map
    unordered_map<char, int> freq;
    for (char c : word) freq[c]++;

    // 최대 빈도 찾기
    int mx = 0;
    for (auto& [ch, cnt] : freq)
        if (cnt > mx) mx = cnt;

    // 최대 빈도 문자가 2개 이상이면 '?'
    char ans = '?';
    int dup = 0;
    for (auto& [ch, cnt] : freq)
        if (cnt == mx) { ans = ch; dup++; }

    cout << (dup > 1 ? '?' : ans) << endl;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'Counter란?',
                                desc: `Python의 빈도 카운팅 전용 클래스!
딕셔너리 직접 만드는 것보다 훨씬 간결합니다.`,
                                code: '',
                                explanation: '<h4>Counter란?</h4><p>Python의 <code>collections</code> 모듈에 있는 <code>Counter</code> 클래스는 요소의 개수를 세어주는 딕셔너리의 하위 클래스입니다.</p><p style="margin:0.6rem 0;"><code>from collections import Counter</code></p><p style="margin:0.4rem 0;"><code>Counter("hello")</code> → <code>{\'l\': 2, \'h\': 1, \'e\': 1, \'o\': 1}</code></p><p style="margin-top:0.8rem;"><strong>주요 기능:</strong></p><ul><li><code>most_common(n)</code> — 빈도 높은 순서로 n개 반환</li><li><code>counter[key]</code> — 해당 키의 개수 (없으면 0)</li><li><code>counter.items()</code> — (요소, 개수) 쌍 순회</li></ul>'
                            },
                            {
                                title: 'Counter로 빈도 세기',
                                desc: `Counter(word) 한 줄로 빈도 딕셔너리 완성!
most_common() → 빈도 내림차순 정렬된 리스트 반환.`,
                                code: `from collections import Counter

word = input().upper()
counter = Counter(word)  # 한 줄로 빈도 카운팅!
top = counter.most_common()  # [(문자, 빈도)] 내림차순`
                            },
                            {
                                title: '결과 출력',
                                desc: `1위와 2위의 빈도가 같으면 동률 → "?" 출력.
1위가 유일하면 해당 문자를 출력합니다.`,
                                code: `if len(top) > 1 and top[0][1] == top[1][1]:  # 1위 == 2위?
    print('?')
else:
    print(top[0][0])  # 1위 문자 출력`
                            }
                        ],
                        cpp: [
                            {
                                title: 'max_element란?',
                                desc: `C++ <algorithm>의 max_element()!
반복자 범위에서 최댓값 위치를 O(n)으로 찾습니다.
Python의 Counter.most_common()과 비슷한 역할.`,
                                code: '',
                                explanation: '<h4>Counter란?</h4><p>Python의 <code>collections</code> 모듈에 있는 <code>Counter</code> 클래스는 요소의 개수를 세어주는 딕셔너리의 하위 클래스입니다.</p><p style="margin:0.6rem 0;"><code>from collections import Counter</code></p><p style="margin:0.4rem 0;"><code>Counter("hello")</code> → <code>{\'l\': 2, \'h\': 1, \'e\': 1, \'o\': 1}</code></p><p style="margin-top:0.8rem;"><strong>주요 기능:</strong></p><ul><li><code>most_common(n)</code> — 빈도 높은 순서로 n개 반환</li><li><code>counter[key]</code> — 해당 키의 개수 (없으면 0)</li><li><code>counter.items()</code> — (요소, 개수) 쌍 순회</li></ul>'
                            },
                            {
                                title: 'unordered_map으로 빈도 세기',
                                desc: `unordered_map<char,int>으로 빈도 카운팅.
toupper()로 대문자 통일 후 freq[c]++.`,
                                code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    unordered_map<char, int> freq;
    for (char c : s) freq[toupper(c)]++;  // 대문자 통일 후 카운팅`
                            },
                            {
                                title: '최댓값 + 동률 체크',
                                desc: `max_element로 최대 빈도를 찾고,
같은 빈도가 2개 이상이면 "?" 출력.`,
                                code: `    // 최대 빈도 찾기
    int mx = max_element(freq.begin(), freq.end(),
        [](auto& a, auto& b) { return a.second < b.second; }
    )->second;

    // 동률 체크
    int dup = 0; char ans;
    for (auto& [ch, cnt] : freq) {
        if (cnt == mx) { ans = ch; dup++; }
    }
    cout << (dup > 1 ? '?' : ans) << endl;
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-125',
            title: 'LeetCode 125 - Valid Palindrome',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/valid-palindrome/',
            simIntro: '힌트 3에서 배운 투 포인터가 양쪽 끝에서 어떻게 좁혀가는지 직접 확인해보세요!',
            sim: { type: 'palindrome', defaultInput: 'racecar' },
            descriptionHTML: `
                <h3>문제</h3>
                <p>문자열 <code>s</code>가 주어집니다.
                <strong>영문자와 숫자만</strong> 남기고, 대소문자를 무시했을 때
                팰린드롬(앞뒤가 같은 문자열)인지 판별하세요.</p>
                <p>빈 문자열은 팰린드롬으로 간주합니다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>s = "A man, a plan, a canal: Panama"</pre></div>
                    <div><strong>출력</strong><pre>true</pre></div>
                </div>
                <p class="example-explain">"amanaplanacanalpanama"는 앞뒤가 같은 팰린드롬입니다.</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>s = "race a car"</pre></div>
                    <div><strong>출력</strong><pre>false</pre></div>
                </div>
                <p class="example-explain">"raceacar"는 뒤집으면 "racaecar"이므로 팰린드롬이 아닙니다.</p>
                </div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>s = " "</pre></div>
                    <div><strong>출력</strong><pre>true</pre></div>
                </div>
                <p class="example-explain">영숫자를 제거하면 빈 문자열 ""이 되고, 빈 문자열은 팰린드롬입니다.</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ s.length ≤ 2 × 10⁵</li>
                    <li>s는 ASCII 문자로만 이루어져 있습니다.</li>
                </ul>

                <h4>💡 Follow-up</h4>
                <p>추가 문자열을 만들지 않고 O(1) 공간으로 풀 수 있을까요?</p>
            `,
            hints: [
                {
                    title: '팰린드롬이 뭐야?',
                    content: `앞에서 읽어도, 뒤에서 읽어도 <strong>같은 문자열</strong>이에요!
                    <div style="display:flex;flex-direction:column;align-items:center;gap:12px;margin:16px 0;">
                        <div style="display:flex;gap:4px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">r</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">r</span>
                        </div>
                        <div style="font-size:1.3em;">🔄 뒤집으면?</div>
                        <div style="display:flex;gap:4px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">r</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">r</span>
                        </div>
                        <div style="color:#00b894;font-weight:700;">✅ 똑같다! → 팰린드롬!</div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:center;gap:12px;margin:12px 0;padding:12px;background:rgba(255,118,117,0.08);border-radius:10px;">
                        <div style="display:flex;gap:4px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">h</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">l</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">l</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">o</span>
                        </div>
                        <div style="font-size:1.3em;">🔄 뒤집으면?</div>
                        <div style="display:flex;gap:4px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#636e72;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">o</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#636e72;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">l</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#636e72;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">l</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#636e72;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#636e72;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">h</span>
                        </div>
                        <div style="color:#e17055;font-weight:700;">❌ 다르다! → 팰린드롬 아님</div>
                    </div>
                    <p style="margin-top:24px;margin-bottom:4px;">근데 <code>"A man, a plan, a canal: Panama"</code>도 팰린드롬이에요.<br>공백, 쉼표, 콜론은 무시하고 대소문자도 구분하지 않거든요!</p>
                    <p style="margin-top:14px;padding:10px 14px;background:rgba(253,203,110,0.15);border-radius:8px;font-size:0.92em;">그럼 이런 문자열은 어떻게 비교하지? 🤔<br>공백이랑 특수문자가 섞여 있으니까 <strong>그냥 뒤집으면 안 맞아요!</strong></p>`
                },
                {
                    title: '먼저 깔끔하게 정리하자!',
                    content: `왜 정리가 필요할까요? <code>"A man, a plan..."</code>을 그대로 뒤집으면 <code>"...nalp a ,nam A"</code>가 돼서 원본이랑 달라요. 공백이랑 쉼표 때문이죠!
                    <p style="margin-top:8px;">그래서 <strong>영문자/숫자만 남기고 나머지는 빼버려요.</strong> 이걸 "전처리"라고 해요.</p>
                    <div style="display:flex;flex-wrap:wrap;gap:3px;margin:14px 0;">
                        <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">A</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#dfe6e9;color:#b2bec3;text-decoration:line-through;">␣</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">m</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">n</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#dfe6e9;color:#b2bec3;text-decoration:line-through;">,</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#dfe6e9;color:#b2bec3;text-decoration:line-through;">␣</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#dfe6e9;color:#b2bec3;text-decoration:line-through;">␣</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">p</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">l</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">n</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#dfe6e9;color:#b2bec3;text-decoration:line-through;">,</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#dfe6e9;color:#b2bec3;text-decoration:line-through;">␣</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#dfe6e9;color:#b2bec3;text-decoration:line-through;">␣</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">n</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">l</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#dfe6e9;color:#b2bec3;text-decoration:line-through;">:</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#dfe6e9;color:#b2bec3;text-decoration:line-through;">␣</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">P</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">n</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">m</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;border-radius:6px;font-weight:600;font-size:0.95em;background:#6c5ce7;color:white;">a</span>
                    </div>
                    <div style="text-align:center;font-size:1.2em;margin:8px 0;">⬇️</div>
                    <div style="display:flex;flex-wrap:wrap;gap:3px;margin:8px 0;">
                        <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">m</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">n</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">p</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">l</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">n</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">n</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">l</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">p</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">n</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">m</span><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:600;font-size:0.95em;">a</span>
                    </div>
                    <p style="margin-top:10px;"><span class="lang-py">Python: <code>isalnum()</code>으로 영문자/숫자 확인 → <code>lower()</code>로 소문자 통일</span><span class="lang-cpp">C++: <code>isalnum(c)</code>로 확인 → <code>tolower(c)</code>로 소문자 통일</span></p>`
                },
                {
                    title: '가장 쉬운 방법: 뒤집어서 비교!',
                    content: `팰린드롬은 뒤집어도 같으니까, <strong>뒤집어서 원본이랑 같은지 확인</strong>하면 돼요. 가장 직관적이고 쉬운 방법이에요!
                    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;margin:14px 0;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="min-width:40px;font-weight:600;text-align:right;">원본</span>
                            <div style="display:flex;gap:2px;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">b</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">b</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">a</span>
                            </div>
                        </div>
                        <div style="font-size:1.1em;">🔄 뒤집기</div>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="min-width:40px;font-weight:600;text-align:right;">뒤집기</span>
                            <div style="display:flex;gap:2px;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:700;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:700;">b</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:700;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:700;">b</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:700;">a</span>
                            </div>
                        </div>
                        <div style="color:#00b894;font-weight:700;">모두 일치 → True! ✅</div>
                    </div>
                    <p style="margin-top:8px;">코딩 테스트에서는 이 방법으로 충분해요! 👍</p>
                    <p style="margin-top:6px;padding:10px 14px;background:rgba(253,203,110,0.15);border-radius:8px;font-size:0.92em;">다만 뒤집은 문자열을 <strong>새로 만들어야</strong> 해서 메모리를 O(n)만큼 써요.<br>문자열이 아주 길면 부담이 될 수 있는데... 더 효율적인 방법이 있을까요?</p>`
                },
                {
                    title: '더 똑똑한 방법: 투 포인터',
                    content: `뒤집기도 좋지만, 새 문자열을 안 만들고도 확인할 수 있어요!<br><strong>양쪽 끝에서 출발</strong>해서 가운데로 좁혀가며 비교하는 거예요.
                    <div style="display:flex;flex-direction:column;align-items:center;gap:10px;margin:14px 0;padding:16px;background:var(--bg2);border-radius:12px;">
                        <div style="display:flex;gap:4px;position:relative;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">r</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#dfe6e9;color:#2d3436;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#dfe6e9;color:#2d3436;border-radius:8px;font-weight:700;font-size:1.1em;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#dfe6e9;color:#2d3436;border-radius:8px;font-weight:700;font-size:1.1em;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#dfe6e9;color:#2d3436;border-radius:8px;font-weight:700;font-size:1.1em;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#dfe6e9;color:#2d3436;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">r</span>
                        </div>
                        <div style="display:flex;gap:4px;width:100%;justify-content:center;">
                            <span style="width:36px;text-align:center;color:#6c5ce7;font-weight:700;">L→</span>
                            <span style="width:180px;"></span>
                            <span style="width:36px;text-align:center;color:#6c5ce7;font-weight:700;">←R</span>
                        </div>
                        <div style="color:#00b894;font-weight:600;">r == r ✓ → 안쪽으로!</div>
                        <div style="display:flex;gap:4px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#b2bec3;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">r</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#dfe6e9;color:#2d3436;border-radius:8px;font-weight:700;font-size:1.1em;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#dfe6e9;color:#2d3436;border-radius:8px;font-weight:700;font-size:1.1em;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#dfe6e9;color:#2d3436;border-radius:8px;font-weight:700;font-size:1.1em;">c</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#b2bec3;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">r</span>
                        </div>
                        <div style="display:flex;gap:4px;width:100%;justify-content:center;">
                            <span style="width:36px;"></span>
                            <span style="width:36px;text-align:center;color:#00b894;font-weight:700;">L→</span>
                            <span style="width:108px;"></span>
                            <span style="width:36px;text-align:center;color:#00b894;font-weight:700;">←R</span>
                            <span style="width:36px;"></span>
                        </div>
                        <div style="color:#00b894;font-weight:600;">a == a ✓ → 계속!</div>
                    </div>
                    <p>① 같으면 → 안쪽으로 이동<br>② 다르면 → 바로 <code>False</code>!<br>③ L ≥ R → 전부 일치 → <code>True</code></p>
                    <p style="margin-top:8px;padding:10px 14px;background:rgba(0,184,148,0.1);border-radius:8px;font-size:0.92em;">새 문자열을 안 만드니까 <strong>추가 메모리가 거의 안 들어요!</strong> O(1) 공간!<br>면접에서 이 방법을 설명하면 "메모리 효율을 생각하는구나" 하고 좋은 인상을 줄 수 있어요.</p>`
                }
            ],
            templates: {
                python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # 방법 1: 간단한 풀이
        s = ''.join(c.lower() for c in s if c.isalnum())
        return s == s[::-1]

    def isPalindrome_twopointer(self, s: str) -> bool:
        # 방법 2: 투 포인터 (메모리 절약)
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`,
                cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};`
            },
            solutions: [
                {
                    approach: '뒤집어서 비교',
                    description: '영숫자만 남기고 소문자로 변환 후, 뒤집은 문자열과 비교한다',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        cleaned = ''
        for c in s:
            if c.isalnum():
                cleaned += c.lower()
        return cleaned == cleaned[::-1]

    # 💡 한 줄 버전 (정규식 활용)
    # import re
    # s = re.sub(r'[^a-zA-Z0-9]', '', s).lower()
    # return s == s[::-1]`,
                        cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        string cleaned;
        for (char c : s) {
            if (isalnum(c)) cleaned += tolower(c);
        }
        string rev = cleaned;
        reverse(rev.begin(), rev.end());
        return cleaned == rev;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '함수 정의',
                                desc: '팰린드롬 여부를 판별하는 함수입니다.',
                                code: `class Solution:
    def isPalindrome(self, s: str) -> bool:`
                            },
                            {
                                title: '영숫자만 추출',
                                desc: `핵심: 공백, 특수문자는 무시하고 영숫자만 남기기!
isalnum() → 영문자 또는 숫자인지 확인.
lower() → 대소문자 구분 없이 비교하기 위해.`,
                                code: `        cleaned = ''
        for c in s:
            if c.isalnum():        # 영문자/숫자만
                cleaned += c.lower()  # 소문자로 통일`
                            },
                            {
                                title: '뒤집어서 비교',
                                desc: `Python의 [::-1] 슬라이싱으로 문자열 뒤집기!
원본과 뒤집은 것이 같으면 → 팰린드롬.`,
                                code: '        return cleaned == cleaned[::-1]  # 뒤집어도 같으면 팰린드롬!'
                            }
                        ],
                        cpp: [
                            {
                                title: '함수 정의',
                                desc: '팰린드롬 여부를 판별하는 함수입니다.',
                                code: `class Solution {
public:
    bool isPalindrome(string s) {`
                            },
                            {
                                title: '영숫자만 추출',
                                desc: `isalnum()으로 영숫자만 남기고 tolower()로 소문자 통일.
→ 공백, 특수문자는 무시됩니다.`,
                                code: `        string cleaned;
        for (char c : s) {
            if (isalnum(c)) cleaned += tolower(c); // 영숫자만, 소문자로
        }`
                            },
                            {
                                title: '뒤집어서 비교',
                                desc: `reverse()로 뒤집은 복사본과 비교.
같으면 팰린드롬입니다.`,
                                code: `        string rev = cleaned;
        reverse(rev.begin(), rev.end());
        return cleaned == rev;  // 뒤집어도 같으면 팰린드롬!
    }
};`
                            }
                        ]
                    }
                },
                {
                    approach: '투 포인터',
                    description: '양쪽 끝에서 좁혀가며 비교 — 추가 문자열 생성 없이 O(1) 공간',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`,
                        cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '포인터 초기화',
                                desc: `핵심: 양쪽 끝에서 시작하는 두 포인터!
새 문자열을 만들지 않으므로 O(1) 공간.`,
                                code: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1  # 양쪽 끝에서 시작`
                            },
                            {
                                title: '양쪽에서 비교',
                                desc: `영숫자가 아닌 문자는 건너뛰고 비교.
다르면 즉시 False! → 전체 정제 없이 바로 판별.
lower()로 대소문자 무시.`,
                                code: `        while left < right:
            while left < right and not s[left].isalnum():  # 영숫자 아니면 skip
                left += 1
            while left < right and not s[right].isalnum(): # 영숫자 아니면 skip
                right -= 1
            if s[left].lower() != s[right].lower():  # 다르면 팰린드롬 아님!
                return False
            left += 1
            right -= 1`
                            },
                            {
                                title: '결과 반환',
                                desc: `끝까지 한 번도 다르지 않았으면 팰린드롬!
O(n) 시간, O(1) 공간 — 뒤집기 방식보다 효율적.`,
                                code: '        return True'
                            }
                        ],
                        cpp: [
                            {
                                title: '포인터 초기화',
                                desc: '양쪽 끝에서 시작 → O(1) 공간으로 판별 가능!',
                                code: `class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1; // 양쪽 끝`
                            },
                            {
                                title: '양쪽에서 비교',
                                desc: `영숫자 아니면 skip, 다르면 즉시 false.
tolower()로 대소문자 무시.`,
                                code: `        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;  // skip
            while (l < r && !isalnum(s[r])) r--;  // skip
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }`
                            },
                            {
                                title: '결과 반환',
                                desc: '끝까지 통과 → 팰린드롬! O(n) 시간, O(1) 공간.',
                                code: `        return true;
    }
};`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-49',
            title: 'LeetCode 49 - Group Anagrams',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/group-anagrams/',
            simIntro: '정렬 키로 애너그램이 어떻게 같은 그룹으로 묶이는지 확인해보세요!',
            sim: { type: 'anagram', defaultInput: 'eat tea tan ate nat bat' },
            descriptionHTML: `
                <h3>문제</h3>
                <p>문자열 배열 <code>strs</code>가 주어집니다.
                <strong>애너그램(같은 글자로 이루어진 단어)</strong>끼리 그룹으로 묶어서 반환하세요.</p>
                <p>결과의 순서는 상관없습니다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>strs = ["eat","tea","tan","ate","nat","bat"]</pre></div>
                    <div><strong>출력</strong><pre>[["bat"],["nat","tan"],["ate","eat","tea"]]</pre></div>
                </div>
                <p class="example-explain">"eat","tea","ate"는 모두 e,a,t로 이루어진 애너그램</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>strs = [""]</pre></div>
                    <div><strong>출력</strong><pre>[[""]]</pre></div>
                </div></div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>strs = ["a"]</pre></div>
                    <div><strong>출력</strong><pre>[["a"]]</pre></div>
                </div></div>

                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ strs.length ≤ 10<sup>4</sup></li>
                    <li>0 ≤ strs[i].length ≤ 100</li>
                    <li><code>strs[i]</code>는 영문 소문자로만 이루어져 있습니다.</li>
                </ul>

                <h4>💡 Follow-up</h4>
                <p>정렬 없이 O(NK) 시간에 풀 수 있을까요?</p>
            `,
            hints: [
                {
                    title: '애너그램이 뭐야?',
                    content: `같은 글자들을 <strong>순서만 바꿔서</strong> 만든 단어예요!
                    <div style="display:flex;flex-direction:column;align-items:center;gap:14px;margin:16px 0;">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div style="display:flex;gap:3px;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">t</span>
                            </div>
                            <span style="font-size:1.3em;">🔄</span>
                            <div style="display:flex;gap:3px;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">t</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">a</span>
                            </div>
                            <span style="color:#00b894;font-weight:700;">✅ 같은 글자!</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div style="display:flex;gap:3px;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">t</span>
                            </div>
                            <span style="font-size:1.3em;">vs</span>
                            <div style="display:flex;gap:3px;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">b</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#e17055;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">t</span>
                            </div>
                            <span style="color:#e17055;font-weight:700;">❌ 글자 다름!</span>
                        </div>
                    </div>
                    <p>이 문제는 애너그램끼리 <strong>같은 그룹으로 묶는</strong> 거예요.</p>
                    <p style="margin-top:10px;padding:10px 14px;background:rgba(253,203,110,0.15);border-radius:8px;font-size:0.92em;">근데 단어가 수천 개면... 하나하나 글자를 비교할 순 없잖아요? 🤔<br><strong>같은 애너그램이라는 걸 빠르게 판별하는 방법</strong>이 필요해요!</p>`
                },
                {
                    title: '핵심 아이디어: 글자를 정렬하자!',
                    content: `애너그램은 글자 구성이 같으니까, <strong>알파벳 순으로 정렬하면 결과가 똑같아져요!</strong>
                    <div style="display:flex;flex-direction:column;gap:12px;margin:16px 0;padding:16px;background:var(--bg2);border-radius:12px;">
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                            <code style="min-width:50px;">"eat"</code><span>→ 정렬 →</span>
                            <div style="display:flex;gap:2px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">t</span></div>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                            <code style="min-width:50px;">"tea"</code><span>→ 정렬 →</span>
                            <div style="display:flex;gap:2px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">t</span></div>
                            <span style="color:#00b894;font-weight:700;">← 같다!</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                            <code style="min-width:50px;">"ate"</code><span>→ 정렬 →</span>
                            <div style="display:flex;gap:2px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">e</span><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">t</span></div>
                            <span style="color:#00b894;font-weight:700;">← 같다!</span>
                        </div>
                        <div style="border-top:1px dashed #ccc;padding-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                            <code style="min-width:50px;">"bat"</code><span>→ 정렬 →</span>
                            <div style="display:flex;gap:2px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#e17055;color:white;border-radius:6px;font-weight:700;">a</span><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#e17055;color:white;border-radius:6px;font-weight:700;">b</span><span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;background:#e17055;color:white;border-radius:6px;font-weight:700;">t</span></div>
                            <span style="color:#e17055;font-weight:700;">← 다름!</span>
                        </div>
                    </div>
                    <p><strong>정렬 결과가 같으면 = 같은 애너그램!</strong> 이걸 "키(key)"로 쓸 수 있어요.</p>`
                },
                {
                    title: '딕셔너리에 그룹으로 모아!',
                    content: `정렬한 결과를 <strong>키(key)</strong>로, 원본 단어를 <strong>리스트에 추가</strong>하면 자동으로 그룹이 만들어져요!
                    <div style="margin:16px 0;padding:16px;background:var(--bg2);border-radius:12px;font-family:'Fira Code',monospace;font-size:0.9em;line-height:2;">
                        <div><span style="color:#e17055;">"eat"</span> → key=<span style="color:#6c5ce7;font-weight:700;">"aet"</span> → groups[<span style="color:#6c5ce7;">"aet"</span>] = [<span style="color:#e17055;">"eat"</span>]</div>
                        <div><span style="color:#e17055;">"tea"</span> → key=<span style="color:#6c5ce7;font-weight:700;">"aet"</span> → groups[<span style="color:#6c5ce7;">"aet"</span>] = [<span style="color:#e17055;">"eat"</span>, <span style="color:#e17055;">"tea"</span>]</div>
                        <div><span style="color:#00b894;">"tan"</span> → key=<span style="color:#00b894;font-weight:700;">"ant"</span> → groups[<span style="color:#00b894;">"ant"</span>] = [<span style="color:#00b894;">"tan"</span>]</div>
                        <div><span style="color:#e17055;">"ate"</span> → key=<span style="color:#6c5ce7;font-weight:700;">"aet"</span> → groups[<span style="color:#6c5ce7;">"aet"</span>] = [<span style="color:#e17055;">"eat"</span>, <span style="color:#e17055;">"tea"</span>, <span style="color:#e17055;">"ate"</span>]</div>
                        <div>...</div>
                    </div>
                    <p style="margin-top:8px;"><span class="lang-py">Python: <code>defaultdict(list)</code>로 자동 빈 리스트 생성</span><span class="lang-cpp">C++: <code>unordered_map&lt;string, vector&lt;string&gt;&gt;</code>로 같은 패턴 구현</span></p>
                    <p style="margin-top:10px;padding:10px 14px;background:rgba(0,184,148,0.1);border-radius:8px;font-size:0.92em;">✅ 마지막에 <code>groups.values()</code>를 반환하면 끝! 핵심 로직이 딱 3줄이에요.</p>`
                },
                {
                    title: '정렬 말고 다른 방법도 있을까?',
                    content: `앞에서 배운 <strong>정렬 키</strong> 방법이면 충분히 풀 수 있어요! 실전에서는 이걸 쓰면 됩니다. 👍
                    <p style="margin-top:10px;">그런데 면접에서 <em>"정렬보다 더 빠른 방법이 있을까요?"</em>라고 물어볼 수 있어요.</p>
                    <p>아이디어는 이래요: 정렬 대신 <strong>각 글자가 몇 번 나오는지</strong>를 세서 그걸 키로 쓰는 거예요.</p>
                    <div style="margin:14px 0;padding:14px;background:var(--bg2);border-radius:12px;">
                        <div style="display:flex;flex-direction:column;gap:6px;">
                            <div><code>"eat"</code> → a가 1번, e가 1번, t가 1번 → <code>(1,0,0,0,1,...,0,0,1,0,0)</code></div>
                            <div><code>"tea"</code> → a가 1번, e가 1번, t가 1번 → <code>(1,0,0,0,1,...,0,0,1,0,0)</code></div>
                        </div>
                        <p style="margin:8px 0 0;font-size:0.9em;">글자 구성이 같으니까 빈도수도 똑같아요 → 같은 키! 정렬 안 해도 됩니다.</p>
                    </div>
                    <p style="margin-top:10px;">솔직히 이 방법은 <strong>정렬보다 구현이 더 복잡하고 떠올리기도 어려워요.</strong><br>
                    하지만 이론적으로 정렬이 O(K log K)인데, 빈도수를 세는 건 O(K)라서 더 빨라요.</p>
                    <div style="margin-top:14px;padding:14px;background:rgba(0,184,148,0.08);border:1px solid rgba(0,184,148,0.15);border-radius:10px;">
                        <div style="font-weight:700;margin-bottom:6px;">💡 결론</div>
                        <div style="font-size:0.9em;color:var(--text-body);">
                            ✅ <strong>코딩테스트</strong>: <code>sorted()</code>를 키로 쓰세요. 3줄이면 끝!<br>
                            ✅ <strong>면접</strong>: "빈도수로도 가능합니다"를 언급하면 어필 가능<br>
                            ⚠️ 빈도수 키는 <strong>알파벳만 쓸 때</strong> (26칸 배열) 잘 먹혀요. 유니코드면 오히려 정렬이 나아요.
                        </div>
                    </div>`
                }
            ],
            templates: {
                python: `from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs):
        groups = defaultdict(list)
        for s in strs:
            key = ''.join(sorted(s))  # 정렬 키
            groups[key].append(s)
        return list(groups.values())

    # 대안: Counter 기반 (O(NK))
    def groupAnagrams_counter(self, strs):
        groups = defaultdict(list)
        for s in strs:
            count = [0] * 26
            for c in s:
                count[ord(c) - ord('a')] += 1
            groups[tuple(count)].append(s)
        return list(groups.values())`,
                cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (auto& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& [k, v] : mp) res.push_back(v);
        return res;
    }
};`
            },
            solutions: [
                {
                    approach: '정렬 키',
                    description: '각 단어를 정렬한 결과를 키로 사용하여 같은 애너그램끼리 그룹화',
                    timeComplexity: 'O(NK log K)',
                    spaceComplexity: 'O(NK)',
                    templates: {
                        python: `class Solution:
    def groupAnagrams(self, strs):
        groups = {}
        for s in strs:
            key = ''.join(sorted(s))
            if key not in groups:
                groups[key] = []
            groups[key].append(s)
        return list(groups.values())`,
                        cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (auto& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& [k, v] : mp) res.push_back(v);
        return res;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '해시맵 준비',
                                desc: `핵심 아이디어: 애너그램은 정렬하면 같은 문자열!
"eat" → "aet", "tea" → "aet" → 같은 그룹!
→ 정렬 결과를 키로 쓰면 자동 그룹화.`,
                                code: `class Solution:
    def groupAnagrams(self, strs):
        groups = {}  # {정렬된 키: [원본 단어들]}`
                            },
                            {
                                title: '정렬 키로 그룹화',
                                desc: `각 단어를 sorted()로 정렬 → 키로 사용.
같은 애너그램끼리 같은 키에 모입니다!
O(n × k log k) — n개 단어, 평균 길이 k.`,
                                code: `        for s in strs:
            key = ''.join(sorted(s))  # "eat" → "aet"
            if key not in groups:
                groups[key] = []
            groups[key].append(s)     # 같은 키에 모으기`
                            },
                            {
                                title: '결과 반환',
                                desc: '딕셔너리의 값(그룹 리스트)들을 반환합니다.',
                                code: '        return list(groups.values())'
                            }
                        ],
                        cpp: [
                            {
                                title: '해시맵 준비',
                                desc: `핵심: 애너그램 → 정렬하면 같은 문자열!
정렬 결과를 키로 사용하여 그룹화합니다.`,
                                code: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp; // {정렬키: [단어들]}`
                            },
                            {
                                title: '정렬 키로 그룹화',
                                desc: `각 단어를 sort() → 같은 애너그램은 같은 키.
mp[key]에 자동으로 push_back됩니다.`,
                                code: `        for (auto& s : strs) {
            string key = s;
            sort(key.begin(), key.end()); // "eat" → "aet"
            mp[key].push_back(s);         // 같은 키에 모으기
        }`
                            },
                            {
                                title: '결과 반환',
                                desc: '맵의 값들(그룹)을 벡터로 모아 반환.',
                                code: `        vector<vector<string>> res;
        for (auto& [k, v] : mp) res.push_back(v);
        return res;
    }
};`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-1213',
            title: 'BOJ 1213 - 팰린드롬 만들기',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/1213',
            simIntro: '딕셔너리로 빈도를 세고, 절반씩 배치하는 과정을 확인해보세요! (코드 탭에서는 배열 방식도 볼 수 있어요)',
            sim: { type: 'palindrome-make', defaultInput: 'aabbccd' },
            descriptionHTML: `
                <h3>문제</h3>
                <p>영어 대문자로만 이루어진 이름이 주어집니다.
                이 이름의 글자들을 재배열해서 <strong>팰린드롬</strong>을 만드세요.
                가능한 팰린드롬 중 사전순으로 가장 앞서는 것을 출력합니다.</p>
                <p>팰린드롬을 만들 수 없으면 <code>I'm Sorry Hansoo</code>를 출력합니다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 임한수의 영어 이름이 있다. 알파벳 대문자로만 이루어져 있으며, 길이는 최대 50이다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 이름의 글자들을 재배열해서 만들 수 있는 팰린드롬을 출력한다. 만들 수 있는 팰린드롬이 여러 개일 경우 사전순으로 앞서는 것을 출력한다. 만약 팰린드롬을 만들 수 없을 때에는 "I'm Sorry Hansoo"를 출력한다.</p>

                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>AABB</pre></div>
                    <div><strong>출력</strong><pre>ABBA</pre></div>
                </div>
                <p class="example-explain">A:2, B:2 → 절반 "AB" + 뒤집기 "BA" = "ABBA"</p>
                </div>

                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>AAABB</pre></div>
                    <div><strong>출력</strong><pre>ABABA</pre></div>
                </div>
                <p class="example-explain">A:3, B:2 → 절반 "AB" + 가운데 "A" + 뒤집기 "BA" = "ABABA"</p>
                </div>

                <div class="problem-example"><h4>예제 3</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>ABACABA</pre></div>
                    <div><strong>출력</strong><pre>AABCBAA</pre></div>
                </div>
                <p class="example-explain">A:4, B:2, C:1 → 절반 "AAB" + 가운데 "C" + 뒤집기 "BAA"</p>
                </div>

                <div class="problem-example"><h4>예제 4</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>ABC</pre></div>
                    <div><strong>출력</strong><pre>I'm Sorry Hansoo</pre></div>
                </div>
                <p class="example-explain">A:1, B:1, C:1 — 홀수 개인 문자가 3개이므로 불가능</p>
                </div>

                <h4>제약 조건</h4>
                <ul>
                    <li>이름은 영어 대문자로만 이루어져 있습니다.</li>
                    <li>1 ≤ 이름의 길이 ≤ 50</li>
                </ul>

                <h4>💡 Follow-up</h4>
                <p>홀수 번 나오는 글자의 개수를 먼저 세서 불가능 여부를 빠르게 판단할 수 있을까요?</p>
            `,
            hints: [
                {
                    title: '팰린드롬이 되려면?',
                    content: `팰린드롬을 만들라고 하니까, 먼저 <strong>팰린드롬이 뭔지</strong> 다시 생각해봐요. 앞뒤로 읽어도 같은 문자열이죠!
                    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;margin:14px 0;">
                        <div style="display:flex;gap:4px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.2em;">A</span>
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.2em;">B</span>
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#fdcb6e;color:#2d3436;border-radius:8px;font-weight:700;font-size:1.2em;">C</span>
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.2em;">B</span>
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.2em;">A</span>
                        </div>
                        <div style="display:flex;gap:4px;font-size:0.8em;color:var(--text-secondary);">
                            <span style="width:40px;text-align:center;">←</span>
                            <span style="width:40px;text-align:center;">←</span>
                            <span style="width:40px;text-align:center;">가운데</span>
                            <span style="width:40px;text-align:center;">→</span>
                            <span style="width:40px;text-align:center;">→</span>
                        </div>
                        <div style="color:#6c5ce7;font-weight:600;">🪞 가운데를 기준으로 거울처럼 대칭!</div>
                    </div>
                    <p>거울처럼 대칭이니까, 각 글자가 <strong>양쪽에 똑같이</strong> 있어야 해요. 그래서:</p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0;">
                        <div style="background:rgba(0,184,148,0.1);border:1px solid rgba(0,184,148,0.3);border-radius:10px;padding:12px;text-align:center;">
                            <div style="font-weight:700;color:#00b894;">짝수 번 나온 글자</div>
                            <div style="font-size:0.9em;margin-top:4px;">반반 나눠서 양쪽에 배치 ✅</div>
                        </div>
                        <div style="background:rgba(253,203,110,0.15);border:1px solid rgba(253,203,110,0.4);border-radius:10px;padding:12px;text-align:center;">
                            <div style="font-weight:700;color:#e17055;">홀수 번 나온 글자</div>
                            <div style="font-size:0.9em;margin-top:4px;">1개 남으니까 가운데에!</div>
                        </div>
                    </div>
                    <p style="padding:10px 14px;background:rgba(253,203,110,0.15);border-radius:8px;font-size:0.92em;">홀수인 글자가 <strong>2개 이상</strong>이면? 가운데 자리는 1개뿐이니까 팰린드롬을 만들 수 없어요! → <code>"I'm Sorry Hansoo"</code></p>`
                },
                {
                    title: '빈도수를 세자 (배열 or 딕셔너리)',
                    content: `그럼 각 글자가 짝수 번인지 홀수 번인지 어떻게 알까요? <strong>각 글자가 몇 번 나오는지 세면</strong> 돼요!
                    <div style="margin:14px 0;padding:14px;background:var(--bg2);border-radius:10px;">
                        <div style="font-weight:600;margin-bottom:8px;">예: "ABACABA"</div>
                        <div style="display:flex;gap:4px;margin-bottom:10px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">A</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:700;">B</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">A</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#fdcb6e;color:#2d3436;border-radius:6px;font-weight:700;">C</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">A</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#00b894;color:white;border-radius:6px;font-weight:700;">B</span><span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">A</span>
                        </div>
                        <div style="display:flex;gap:16px;flex-wrap:wrap;">
                            <div><span style="display:inline-block;width:24px;height:24px;background:#6c5ce7;border-radius:4px;vertical-align:middle;"></span> A: <strong>4</strong>번 (짝수 ✅)</div>
                            <div><span style="display:inline-block;width:24px;height:24px;background:#00b894;border-radius:4px;vertical-align:middle;"></span> B: <strong>2</strong>번 (짝수 ✅)</div>
                            <div><span style="display:inline-block;width:24px;height:24px;background:#fdcb6e;border-radius:4px;vertical-align:middle;"></span> C: <strong>1</strong>번 (홀수 → 가운데!)</div>
                        </div>
                    </div>
                    <p style="margin-top:10px;">세는 방법은 두 가지가 있어요:</p>
                    <strong>배열</strong>: 알파벳이 26개니까 크기 26 배열로 <code>count[c - 'A'] += 1</code><br>
                    <strong>해시맵</strong>: <span class="lang-py">Python <code>dict</code></span><span class="lang-cpp">C++ <code>unordered_map</code></span>으로 글자를 키로 바로 세기<br>
                    <p style="margin-top:8px;padding:10px 14px;background:rgba(0,184,148,0.1);border-radius:8px;font-size:0.92em;">어떤 걸 쓰든 결과는 같아요. 배열이 더 빠르고, 딕셔너리가 더 읽기 쉬워요!</p>
                    <a href="https://ko.wikipedia.org/wiki/ASCII" target="_blank" style="color: var(--accent); text-decoration: underline; font-size: 0.9em;">📎 ASCII 코드표 보기 →</a>`
                },
                {
                    title: '절반씩 배치하기',
                    content: `빈도수를 세서 가능하다는 걸 알았으면, 이제 <strong>실제로 팰린드롬을 만들어볼</strong> 차례예요! 어떻게 배치할까요?
                    <div style="margin:10px 0;">
                        <div style="font-weight:600;margin-bottom:10px;">예: A:4, B:2, C:1</div>
                        <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin:12px 0;">
                            <div style="text-align:center;">
                                <div style="font-size:0.8em;color:var(--text-secondary);margin-bottom:4px;">왼쪽 절반</div>
                                <div style="display:flex;gap:3px;">
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">A</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">A</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#00b894;color:white;border-radius:6px;font-weight:700;">B</span>
                                </div>
                                <div style="font-size:0.75em;color:var(--text-secondary);margin-top:2px;">A×(4÷2) + B×(2÷2)</div>
                            </div>
                            <span style="font-size:1.5em;color:var(--text-secondary);">+</span>
                            <div style="text-align:center;">
                                <div style="font-size:0.8em;color:var(--text-secondary);margin-bottom:4px;">가운데</div>
                                <div style="display:flex;gap:3px;">
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#fdcb6e;color:#2d3436;border-radius:6px;font-weight:700;">C</span>
                                </div>
                                <div style="font-size:0.75em;color:var(--text-secondary);margin-top:2px;">홀수 1개</div>
                            </div>
                            <span style="font-size:1.5em;color:var(--text-secondary);">+</span>
                            <div style="text-align:center;">
                                <div style="font-size:0.8em;color:var(--text-secondary);margin-bottom:4px;">🔄 뒤집기</div>
                                <div style="display:flex;gap:3px;">
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#00b894;color:white;border-radius:6px;font-weight:700;">B</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">A</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">A</span>
                                </div>
                                <div style="font-size:0.75em;color:var(--text-secondary);margin-top:2px;">왼쪽의 역순</div>
                            </div>
                        </div>
                        <div style="text-align:center;font-size:1.2em;margin:8px 0;">⬇️</div>
                        <div style="display:flex;justify-content:center;gap:3px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">A</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">A</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">B</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#fdcb6e;color:#2d3436;border-radius:8px;font-weight:700;font-size:1.1em;">C</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#00b894;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">B</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">A</span><span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;font-size:1.1em;">A</span>
                        </div>
                        <div style="text-align:center;color:#00b894;font-weight:700;margin-top:8px;">AABCBAA 완성! 🎉</div>
                    </div>
                    <p style="padding:10px 14px;background:var(--bg2);border-radius:8px;font-size:0.92em;">정리하면: <strong>왼쪽 절반</strong>을 만들고 + 홀수 글자가 있으면 <strong>가운데</strong>에 넣고 + 왼쪽을 <strong>뒤집어서</strong> 오른쪽에 붙이면 끝!</p>`
                },
                {
                    title: '사전순으로 만들려면?',
                    content: `팰린드롬이 여러 개 가능할 수 있어요. 예를 들어 "AABB"로 ABBA도 되고 BAAB도 되죠. 문제에서는 <strong>사전순으로 가장 앞서는 것</strong>을 원하니까, 왼쪽 절반을 <strong>ABC 순서</strong>로 만들면 자동으로 사전순이 돼요!
                    <div style="margin:14px 0;padding:14px;background:var(--bg2);border-radius:10px;">
                        <div style="font-weight:600;margin-bottom:10px;">예: "AABB" → 빈도 A:2, B:2</div>
                        <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
                            <div style="display:flex;align-items:center;gap:8px;">
                                <span style="font-size:0.85em;min-width:50px;text-align:right;color:var(--text-secondary);">절반</span>
                                <div style="display:flex;gap:3px;">
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">A</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#00b894;color:white;border-radius:6px;font-weight:700;">B</span>
                                </div>
                                <span style="font-size:0.85em;color:var(--text-secondary);">← A부터!</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px;">
                                <span style="font-size:0.85em;min-width:50px;text-align:right;color:var(--text-secondary);">뒤집기</span>
                                <div style="display:flex;gap:3px;">
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#00b894;color:white;border-radius:6px;font-weight:700;">B</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:6px;font-weight:700;">A</span>
                                </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px;">
                                <span style="font-size:0.85em;min-width:50px;text-align:right;color:#00b894;font-weight:700;">결과</span>
                                <div style="display:flex;gap:3px;">
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;box-shadow:0 2px 8px rgba(108,92,231,0.3);">A</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#00b894;color:white;border-radius:8px;font-weight:700;box-shadow:0 2px 8px rgba(0,184,148,0.3);">B</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#00b894;color:white;border-radius:8px;font-weight:700;box-shadow:0 2px 8px rgba(0,184,148,0.3);">B</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:#6c5ce7;color:white;border-radius:8px;font-weight:700;box-shadow:0 2px 8px rgba(108,92,231,0.3);">A</span>
                                </div>
                                <span style="font-size:1.1em;">🎉</span>
                            </div>
                        </div>
                    </div>`
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

name = input().strip()
count = [0] * 26

for c in name:
    count[ord(c) - ord('A')] += 1

# 홀수 개수인 알파벳이 2개 이상이면 불가능
odd_count = sum(1 for c in count if c % 2 == 1)
if odd_count > 1:
    print("I'm Sorry Hansoo")
else:
    half = ''
    mid = ''
    for i in range(26):
        if count[i] % 2 == 1:
            mid = chr(i + ord('A'))
        half += chr(i + ord('A')) * (count[i] // 2)
    print(half + mid + half[::-1])`,
                cpp: `#include <iostream>
using namespace std;

int main() {
    string name;
    cin >> name;

    int cnt[26] = {};
    for (char c : name) cnt[c - 'A']++;

    int odd = 0;
    for (int i = 0; i < 26; i++) if (cnt[i] % 2) odd++;
    if (odd > 1) { puts("I'm Sorry Hansoo"); return 0; }

    string half = "", mid = "";
    for (int i = 0; i < 26; i++) {
        if (cnt[i] % 2) mid = string(1, 'A' + i);
        half += string(cnt[i] / 2, 'A' + i);
    }
    string rev = half;
    reverse(rev.begin(), rev.end());
    cout << half + mid + rev << endl;
}`
            },
            solutions: [
                {
                    approach: '배열 카운팅',
                    description: '크기 26 배열로 빈도를 세고, 홀수 개인 문자가 2개 이상이면 불가능',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

name = input().strip()
cnt = [0] * 26
for c in name:
    cnt[ord(c) - ord('A')] += 1

odd_count = sum(1 for x in cnt if x % 2 != 0)
if odd_count > 1:
    print("I'm Sorry Hansoo")
else:
    half = ''
    mid = ''
    for i in range(26):
        if cnt[i] % 2 == 1:
            mid = chr(i + ord('A'))
        half += chr(i + ord('A')) * (cnt[i] // 2)
    print(half + mid + half[::-1])`,
                        cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    int cnt[26] = {};
    for (char c : s) cnt[c - 'A']++;

    int odd = 0;
    for (int i = 0; i < 26; i++) if (cnt[i] % 2) odd++;
    if (odd > 1) { cout << "I'm Sorry Hansoo" << endl; return 0; }

    string half = "", mid = "";
    for (int i = 0; i < 26; i++) {
        if (cnt[i] % 2) mid = string(1, 'A' + i);
        half += string(cnt[i] / 2, 'A' + i);
    }
    string rev = half;
    reverse(rev.begin(), rev.end());
    cout << half + mid + rev << endl;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력 + 빈도 세기',
                                desc: `각 알파벳이 몇 번 등장하는지 크기 26 배열로 셉니다.
ord(c) - ord('A') → A=0, B=1, ..., Z=25`,
                                code: `import sys
input = sys.stdin.readline

name = input().strip()
cnt = [0] * 26  # A~Z 빈도
for c in name:
    cnt[ord(c) - ord('A')] += 1`
                            },
                            {
                                title: '홀수 개수 체크',
                                desc: `핵심: 팰린드롬에서 홀수 빈도 문자는 최대 1개!
(가운데 한 자리만 홀수 가능)
홀수가 2개 이상이면 팰린드롬 불가능.`,
                                code: `odd_count = sum(1 for x in cnt if x % 2 != 0)
if odd_count > 1:  # 홀수 빈도 문자가 2개 이상 → 불가능
    print("I'm Sorry Hansoo")`
                            },
                            {
                                title: '팰린드롬 절반 구성',
                                desc: `각 문자를 절반씩(cnt//2) 앞쪽에 배치.
홀수 빈도 문자는 가운데(mid)에 놓습니다.
i=0~25 순서 → 사전순 보장!`,
                                code: `else:
    half = ''
    mid = ''
    for i in range(26):
        if cnt[i] % 2 == 1:  # 홀수면 → 가운데
            mid = chr(i + ord('A'))
        half += chr(i + ord('A')) * (cnt[i] // 2)  # 절반씩`
                            },
                            {
                                title: '조립 + 출력',
                                desc: `앞절반 + 가운데 + 뒤집은절반 = 팰린드롬!
예: "AB" + "C" + "BA" = "ABCBA"`,
                                code: '    print(half + mid + half[::-1])  # 앞 + 중 + 뒤(뒤집기)'
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 + 빈도 세기',
                                desc: '각 대문자 알파벳의 빈도를 크기 26 배열로 셉니다.',
                                code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    int cnt[26] = {}; // A~Z 빈도
    for (char c : s) cnt[c - 'A']++;`
                            },
                            {
                                title: '홀수 개수 체크',
                                desc: `팰린드롬에서 홀수 빈도 문자는 최대 1개만 가능!
2개 이상이면 팰린드롬 불가능.`,
                                code: `    int odd = 0;
    for (int i = 0; i < 26; i++) if (cnt[i] % 2) odd++;
    if (odd > 1) { cout << "I'm Sorry Hansoo" << endl; return 0; }`
                            },
                            {
                                title: '팰린드롬 절반 구성',
                                desc: `각 문자를 절반(cnt/2)씩 배치.
홀수 빈도 문자는 가운데(mid)로.
i=0~25 순서 → 사전순 보장.`,
                                code: `    string half = "", mid = "";
    for (int i = 0; i < 26; i++) {
        if (cnt[i] % 2) mid = string(1, 'A' + i);  // 홀수 → 가운데
        half += string(cnt[i] / 2, 'A' + i);        // 절반씩
    }`
                            },
                            {
                                title: '조립 + 출력',
                                desc: `앞절반 + 가운데 + 뒤집은절반 = 팰린드롬!
"AB" + "C" + "BA" = "ABCBA"`,
                                code: `    string rev = half;
    reverse(rev.begin(), rev.end());
    cout << half + mid + rev << endl; // 앞 + 중 + 뒤
}`
                            }
                        ]
                    }
                },
                {
                    approach: 'Counter 활용',
                    description: 'collections.Counter로 빈도를 세고 Pythonic하게 팰린드롬 구성',
                    timeComplexity: 'O(n)',
                    spaceComplexity: 'O(n)',
                    templates: {
                        python: `from collections import Counter

name = input().strip()
counter = Counter(name)

odd_chars = [c for c, v in counter.items() if v % 2 != 0]
if len(odd_chars) > 1:
    print("I'm Sorry Hansoo")
else:
    half = ''
    mid = ''
    for c in sorted(counter):
        if counter[c] % 2 == 1:
            mid = c
        half += c * (counter[c] // 2)
    print(half + mid + half[::-1])`,
                        cpp: `#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    string name;
    cin >> name;

    // 빈도 세기 — map은 키 자동 정렬
    map<char, int> freq;
    for (char c : name) freq[c]++;

    // 홀수 빈도 문자가 2개 이상이면 팰린드롬 불가
    int oddCnt = 0;
    for (auto& [ch, cnt] : freq)
        if (cnt % 2 != 0) oddCnt++;

    if (oddCnt > 1) {
        cout << "I'm Sorry Hansoo" << endl;
    } else {
        string half = "", mid = "";
        for (auto& [ch, cnt] : freq) {
            if (cnt % 2 == 1) mid = ch;
            half += string(cnt / 2, ch); // 절반만 모으기
        }
        string rev = half;
        reverse(rev.begin(), rev.end());
        cout << half + mid + rev << endl;
    }
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'Counter란?',
                                desc: `Python의 빈도 카운팅 전용 클래스!
배열 대신 Counter를 쓰면 더 간결합니다.`,
                                code: '',
                                explanation: '<h4>Counter란?</h4><p>Python의 <code>collections</code> 모듈에 있는 <code>Counter</code> 클래스는 요소의 개수를 세어주는 딕셔너리의 하위 클래스입니다.</p><p style="margin:0.6rem 0;"><code>from collections import Counter</code></p><p style="margin:0.4rem 0;"><code>Counter("hello")</code> → <code>{\'l\': 2, \'h\': 1, \'e\': 1, \'o\': 1}</code></p><p style="margin-top:0.8rem;"><strong>주요 기능:</strong></p><ul><li><code>most_common(n)</code> — 빈도 높은 순서로 n개 반환</li><li><code>counter[key]</code> — 해당 키의 개수 (없으면 0)</li><li><code>counter.items()</code> — (요소, 개수) 쌍 순회</li></ul>'
                            },
                            {
                                title: 'Counter로 빈도 세기',
                                desc: `Counter(name) 한 줄로 {문자: 빈도} 완성!
배열 만들고 ord() 변환하는 과정이 사라집니다.`,
                                code: `from collections import Counter

name = input().strip()
counter = Counter(name)  # 한 줄로 빈도 카운팅!`
                            },
                            {
                                title: '홀수 체크',
                                desc: `홀수 빈도 문자가 2개 이상 → 팰린드롬 불가능.
리스트 컴프리헨션으로 홀수 빈도 문자를 추출합니다.`,
                                code: `odd_chars = [c for c, v in counter.items() if v % 2 != 0]
if len(odd_chars) > 1:  # 홀수 빈도 2개 이상 → 불가능
    print("I'm Sorry Hansoo")`
                            },
                            {
                                title: '조립 + 출력',
                                desc: `sorted(counter)로 사전순 정렬 보장.
절반 구성 후 앞 + 가운데 + 뒤집기 = 팰린드롬!`,
                                code: `else:
    half = ''
    mid = ''
    for c in sorted(counter):       # 사전순 보장
        if counter[c] % 2 == 1:
            mid = c                 # 홀수 → 가운데
        half += c * (counter[c] // 2)  # 절반씩
    print(half + mid + half[::-1])  # 앞 + 중 + 뒤`
                            }
                        ],
                        cpp: [
                            {
                                title: 'unordered_map 활용',
                                desc: `C++에서는 unordered_map<char,int>이
Python Counter와 같은 역할을 합니다.
빈도를 세는 방법은 동일!`,
                                code: '',
                                explanation: '<h4>Counter란?</h4><p>Python의 <code>collections</code> 모듈에 있는 <code>Counter</code> 클래스는 요소의 개수를 세어주는 딕셔너리의 하위 클래스입니다.</p><p style="margin:0.6rem 0;"><code>from collections import Counter</code></p><p style="margin:0.4rem 0;"><code>Counter("hello")</code> → <code>{\'l\': 2, \'h\': 1, \'e\': 1, \'o\': 1}</code></p><p style="margin-top:0.8rem;"><strong>주요 기능:</strong></p><ul><li><code>most_common(n)</code> — 빈도 높은 순서로 n개 반환</li><li><code>counter[key]</code> — 해당 키의 개수 (없으면 0)</li><li><code>counter.items()</code> — (요소, 개수) 쌍 순회</li></ul>'
                            },
                            {
                                title: 'map으로 빈도 세기',
                                desc: `map<char,int>으로 빈도 카운팅.
map은 키가 자동 정렬 → 사전순 보장!`,
                                code: `#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    string name;
    cin >> name;
    map<char, int> cnt;  // map: 키(문자) 자동 정렬!
    for (char c : name) cnt[c]++;`
                            },
                            {
                                title: '홀수 체크',
                                desc: `홀수 빈도 문자가 2개 이상이면 팰린드롬 불가능.
cnt를 순회하며 홀수 개수를 셉니다.`,
                                code: `    int odd = 0;
    for (auto& [ch, v] : cnt) if (v % 2) odd++;
    if (odd > 1) {
        cout << "I'm Sorry Hansoo" << endl;
        return 0;
    }`
                            },
                            {
                                title: '조립 + 출력',
                                desc: `map이 사전순이라 순서대로 절반 구성.
앞절반 + 가운데 + 뒤집은절반 = 팰린드롬!`,
                                code: `    string half = "", mid = "";
    for (auto& [ch, v] : cnt) {
        if (v % 2) mid = string(1, ch);  // 홀수 → 가운데
        half += string(v / 2, ch);       // 절반씩
    }
    string rev = half;
    reverse(rev.begin(), rev.end());
    cout << half + mid + rev << endl;  // 앞 + 중 + 뒤
}`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
