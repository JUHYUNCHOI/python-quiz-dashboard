import type { AlgoTopic } from '../types'

export const trieTopic: AlgoTopic = {
    id: 'trie',
    title: '트라이',
    icon: '🔠',
    category: '심화 (Gold~Platinum)',
    order: 18,
    description: '문자열을 효율적으로 저장하고 검색하는 트리 자료구조',
    track: 'cpp',
    stages: [
        {
            num: 1,
            title: '접두사와 문자열 집합',
            problemIds: [
                'lc-14',
                'boj-14425'
            ],
            desc: '공통 접두사, 문자열 집합 확인 (Easy~Silver)'
        },
        {
            num: 2,
            title: '트라이 구현과 응용',
            problemIds: [
                'lc-208',
                'boj-5052'
            ],
            desc: '트라이 직접 구현, 접두사 관계 판별 (Medium~Gold)'
        }
    ],
    problems: [
        {
            id: 'lc-14',
            title: 'LeetCode 14 - Longest Common Prefix',
            difficulty: 'easy',
            link: 'https://leetcode.com/problems/longest-common-prefix/',
            simIntro: '문자열을 세로로 비교하여 공통 접두사를 찾는 과정을 관찰하세요.',
            sim: {
                type: 'lCP'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>문자열 배열에서 가장 긴 공통 접두사(prefix)를 찾으세요. 공통 접두사가 없으면 빈 문자열 ""을 반환합니다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>strs = ["flower","flow","flight"]</pre></div>
                    <div><strong>출력</strong><pre>"fl"</pre></div>
                </div></div>
                <div class="problem-example"><h4>예제 2</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>strs = ["dog","racecar","car"]</pre></div>
                    <div><strong>출력</strong><pre>""</pre></div>
                </div><p class="example-explain">공통 접두사가 없습니다.</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ strs.length ≤ 200</li>
                    <li>0 ≤ strs[i].length ≤ 200</li>
                    <li>strs[i]는 영어 소문자로만 구성</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 생각: 첫 문자열과 하나씩 비교',
                    content: '첫 번째 문자열을 기준으로 나머지와 <strong>한 글자씩</strong> 비교하면 어떨까요?<br>i번째 글자를 모든 문자열에서 확인하고, 다른 글자가 나오면 거기까지가 공통 접두사!<br>이 방법은 O(S) (S = 전체 문자 수)로 충분히 빠릅니다.'
                },
                {
                    title: '더 효율적인 방법은?',
                    content: '문자열 배열을 <strong>사전순 정렬</strong>하면, <strong>첫 번째</strong>와 <strong>마지막</strong> 문자열만 비교하면 돼요!<br>사전순으로 가장 다른 두 문자열의 공통 접두사 = 전체 공통 접두사이기 때문이죠.<br><span class="lang-py">Python: <code>min(strs)</code>와 <code>max(strs)</code>가 사전순 양 끝을 바로 줍니다!</span><span class="lang-cpp">C++: <code>*min_element(strs.begin(), strs.end())</code>와 <code>*max_element(...)</code>로 사전순 양 끝을 구합니다!</span>'
                },
                {
                    title: '트라이 활용',
                    content: '모든 문자열을 트라이에 넣고, 루트에서 출발합니다.<br><strong>자식이 1개뿐이고 is_end가 아닌</strong> 노드를 따라 쭉 내려가면 — 분기점이나 is_end를 만나는 지점까지가 공통 접두사!<br><br><div style="display:flex;flex-direction:column;align-items:center;gap:2px;margin:10px 0;padding:10px;background:var(--bg2);border-radius:10px;font-size:0.82rem;"><div style="padding:3px 8px;border-radius:12px;border:2px solid var(--green);background:var(--green)15;font-weight:700;color:var(--green);">f</div><div style="width:2px;height:8px;background:var(--green);"></div><div style="padding:3px 8px;border-radius:12px;border:2px solid var(--green);background:var(--green)15;font-weight:700;color:var(--green);">l</div><div style="font-size:0.65rem;color:var(--green);font-weight:600;">↑ 공통 접두사 "fl"</div><div style="display:flex;gap:20px;margin-top:4px;"><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="width:2px;height:8px;background:var(--text2);"></div><div style="padding:3px 8px;border-radius:12px;border:1.5px solid var(--accent);font-weight:600;">o</div><div style="font-size:0.6rem;color:var(--text2);">flower, flow</div></div><div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="width:2px;height:8px;background:var(--text2);"></div><div style="padding:3px 8px;border-radius:12px;border:1.5px solid var(--accent);font-weight:600;">i</div><div style="font-size:0.6rem;color:var(--text2);">flight</div></div></div><div style="font-size:0.65rem;color:var(--red);font-weight:600;margin-top:4px;">자식 2개 → 여기서 멈춤!</div></div>트라이가 공통 접두사를 "구조적으로" 보여주는 좋은 예시입니다.'
                }
            ],
            templates: {
                python: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""
        for i in range(len(strs[0])):
            ch = strs[0][i]
            for s in strs[1:]:
                if i >= len(s) or s[i] != ch:
                    return strs[0][:i]
        return strs[0]`,
                cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        string prefix = strs[0];
        for (int i = 1; i < strs.size(); i++) {
            while (strs[i].find(prefix) != 0) {
                prefix = prefix.substr(0, prefix.size() - 1);
                if (prefix.empty()) return "";
            }
        }
        return prefix;
    }
};`
            },
            solutions: [
                {
                    approach: '세로 스캔',
                    description: '첫 번째 문자열의 각 위치를 기준으로 모든 문자열과 비교합니다.',
                    timeComplexity: 'O(S) (S = 전체 문자 수)',
                    spaceComplexity: 'O(1)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """삽입하면서 접두사 관계 확인. 문제 있으면 False 반환"""
        node = self.root
        prefix_found = False
        for ch in word:
            if node.is_end:
                prefix_found = True
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True
        if len(node.children) > 0:
            prefix_found = True
        return not prefix_found

t = int(input())
for _ in range(t):
    n = int(input())
    trie = Trie()
    numbers = [input().strip() for _ in range(n)]
    consistent = True
    for num in numbers:
        if not trie.insert(num):
            consistent = False
    print("YES" if consistent else "NO")`,
                        cpp: `#include <cstdio>
#include <cstring>
#include <string>
#include <vector>
using namespace std;

struct TrieNode {
    TrieNode* children[10] = {};
    bool is_end = false;
};

bool insert(TrieNode* root, const string& s) {
    TrieNode* node = root;
    bool ok = true;
    for (char ch : s) {
        int idx = ch - '0';
        if (node->is_end) ok = false;
        if (!node->children[idx])
            node->children[idx] = new TrieNode();
        node = node->children[idx];
    }
    node->is_end = true;
    for (int i = 0; i < 10; i++)
        if (node->children[i]) ok = false;
    return ok;
}

void deleteTrie(TrieNode* node) {
    for (int i = 0; i < 10; i++)
        if (node->children[i]) deleteTrie(node->children[i]);
    delete node;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        TrieNode* root = new TrieNode();
        vector<string> nums(n);
        bool ok = true;
        for (int i = 0; i < n; i++) {
            char buf[11];
            scanf("%s", buf);
            nums[i] = buf;
        }
        for (auto& s : nums) {
            if (!insert(root, s)) ok = false;
        }
        puts(ok ? "YES" : "NO");
        deleteTrie(root);
    }
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '예외 처리',
                                desc: '빈 배열이면 공통 접두사가 없으므로 빈 문자열을 반환합니다.',
                                code: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""`
                            },
                            {
                                title: '세로 스캔',
                                desc: `첫 문자열의 i번째 글자를 기준으로 나머지와 비교합니다.
글자가 다르거나 문자열이 짧으면 그 지점까지가 공통 접두사입니다.`,
                                code: `        for i in range(len(strs[0])):
            ch = strs[0][i]
            for s in strs[1:]:
                if i >= len(s) or s[i] != ch:
                    return strs[0][:i]`
                            },
                            {
                                title: '전체 일치 시',
                                desc: '루프를 끝까지 돌았다면 첫 문자열 전체가 공통 접두사입니다.',
                                code: '        return strs[0]'
                            }
                        ],
                        cpp: [
                            {
                                title: '예외 처리',
                                desc: '빈 벡터면 빈 문자열을 즉시 반환합니다.',
                                code: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";`
                            },
                            {
                                title: '접두사 축소법',
                                desc: `첫 문자열을 prefix로 시작.
각 문자열과 비교하며 안 맞으면 prefix를 줄임.`,
                                code: `        string prefix = strs[0];
        for (int i = 1; i < strs.size(); i++) {
            while (strs[i].find(prefix) != 0) {
                prefix = prefix.substr(0, prefix.size() - 1);
                if (prefix.empty()) return "";
            }
        }`
                            },
                            {
                                title: '결과 반환',
                                desc: '모든 문자열과 매칭된 최종 prefix를 반환합니다.',
                                code: `        return prefix;
    }
};`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-14425',
            title: 'BOJ 14425 - 문자열 집합',
            difficulty: 'silver',
            link: 'https://www.acmicpc.net/problem/14425',
            simIntro: '트라이에 문자열을 넣고 검색하여 집합 포함 여부를 확인하는 과정을 관찰하세요.',
            sim: {
                type: 'stringSet'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>총 N개의 문자열로 이루어진 집합 S가 주어진다. 입력으로 주어지는 M개의 문자열 중에서 집합 S에 포함되어 있는 것이 총 몇 개인지 구하는 프로그램을 작성하시오.</p>
                <h4>입력</h4>
                <p>첫째 줄에 문자열의 개수 N과 M (1 &le; N &le; 10,000, 1 &le; M &le; 10,000)이 주어진다. 다음 N개의 줄에는 집합 S에 포함되어 있는 문자열들이 주어진다. 다음 M개의 줄에는 검사해야 하는 문자열들이 주어진다. 입력으로 주어지는 문자열은 알파벳 소문자로만 이루어져 있으며, 길이는 500을 넘지 않는다. 집합 S에 같은 문자열이 여러 번 주어지는 경우는 없다.</p>
                <h4>출력</h4>
                <p>첫째 줄에 M개의 문자열 중에 총 몇 개가 집합 S에 포함되어 있는지 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>5 11
baekjoononlinejudge
startlink
codeplus
sundaycoding
codingsh
baekjoononlinejudge
codeplus
codeminus
startlink
starlink
sundaycoding
codingsh
codingho
lucky
judge</pre></div>
                    <div><strong>출력</strong><pre>4</pre></div>
                </div><p class="example-explain">집합 S = {baekjoononlinejudge, startlink, codeplus, sundaycoding, codingsh}이고, 검사할 11개 문자열 중 baekjoononlinejudge, codeplus, startlink, sundaycoding의 4개가 S에 포함됩니다.</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ N, M ≤ 10,000</li>
                    <li>문자열 길이 ≤ 500</li>
                    <li>문자열은 소문자로만 구성</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 생각: 하나씩 비교',
                    content: 'M개 문자열마다 N개 문자열과 하나씩 비교하면 되겠죠?<br>근데 이러면 <strong>O(N × M × L)</strong>이에요. N, M이 각각 10,000이고 문자열이 길면... 꽤 느릴 수 있어요!<br><br><div style="display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap;margin:8px 0;padding:10px 14px;background:var(--bg2);border-radius:8px;"><div style="text-align:center;"><div style="width:28px;height:90px;background:var(--red)40;border:1.5px solid var(--red);border-radius:4px 4px 0 0;"></div><div style="font-size:0.7rem;font-weight:600;color:var(--red);margin-top:4px;">브루트포스</div><div style="font-size:0.6rem;color:var(--text2);">N×M×L</div></div><div style="text-align:center;"><div style="width:28px;height:25px;background:var(--green)40;border:1.5px solid var(--green);border-radius:4px 4px 0 0;"></div><div style="font-size:0.7rem;font-weight:600;color:var(--green);margin-top:4px;">set/trie</div><div style="font-size:0.6rem;color:var(--text2);">(N+M)×L</div></div></div>'
                },
                {
                    title: '집합(set)으로 O(1) 검색',
                    content: '<span class="lang-py">Python: <code>set()</code>에 N개 문자열을 넣으면 <code>in</code> 연산이 평균 O(L)!</span><span class="lang-cpp">C++: <code>unordered_set</code>에 넣으면 <code>find</code>가 평균 O(L)!</span><br>M개를 검사해도 <strong>O((N+M) × L)</strong>로 충분히 빠릅니다. 간단하고 효율적!'
                },
                {
                    title: '트라이로도 가능',
                    content: '이 문제는 set으로 간단히 풀 수 있지만, <strong>트라이 구현 연습</strong>에 아주 좋은 문제입니다!<br>N개 문자열을 트라이에 <code>insert</code>한 뒤, M개를 <code>search</code>하여 True인 개수를 세면 됩니다.<br>접두사 활용은 없지만, 기본 insert/search 구현을 확실히 익힐 수 있어요.'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

# 방법 1: set 사용 (간단)
N, M = map(int, input().split())
S = set(input().strip() for _ in range(N))
count = sum(1 for _ in range(M) if input().strip() in S)
print(count)`,
                cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool is_end = false;
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }

    void insert(const string& word) {
        TrieNode* node = root;
        for (char ch : word) {
            if (!node->children.count(ch))
                node->children[ch] = new TrieNode();
            node = node->children[ch];
        }
        node->is_end = true;
    }

    bool search(const string& word) {
        TrieNode* node = root;
        for (char ch : word) {
            if (!node->children.count(ch)) return false;
            node = node->children[ch];
        }
        return node->is_end;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    Trie trie;
    string s;
    for (int i = 0; i < N; i++) {
        cin >> s;
        trie.insert(s);
    }

    int count = 0;
    for (int i = 0; i < M; i++) {
        cin >> s;
        if (trie.search(s)) count++;
    }
    cout << count << endl;
}`
            },
            solutions: [
                {
                    approach: 'set 또는 트라이',
                    description: 'set에 집합 S를 넣고 M개를 검사하거나, 트라이로 insert/search합니다.',
                    timeComplexity: 'O((N+M) × L)',
                    spaceComplexity: 'O(N × L)',
                    templates: {
                        python: `import sys
input = sys.stdin.readline

# 방법 1: set 사용 (간단)
N, M = map(int, input().split())
S = set(input().strip() for _ in range(N))
count = sum(1 for _ in range(M) if input().strip() in S)
print(count)`,
                        cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool is_end = false;
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }

    void insert(const string& word) {
        TrieNode* node = root;
        for (char ch : word) {
            if (!node->children.count(ch))
                node->children[ch] = new TrieNode();
            node = node->children[ch];
        }
        node->is_end = true;
    }

    bool search(const string& word) {
        TrieNode* node = root;
        for (char ch : word) {
            if (!node->children.count(ch)) return false;
            node = node->children[ch];
        }
        return node->is_end;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    Trie trie;
    string s;
    for (int i = 0; i < N; i++) {
        cin >> s;
        trie.insert(s);
    }

    int count = 0;
    for (int i = 0; i < M; i++) {
        cin >> s;
        if (trie.search(s)) count++;
    }
    cout << count << endl;
}`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: '입력',
                                desc: `sys.stdin.readline으로 빠른 입력을 받습니다.
N개는 집합, M개는 검사할 문자열입니다.`,
                                code: `import sys
input = sys.stdin.readline

N, M = map(int, input().split())`
                            },
                            {
                                title: '집합 생성',
                                desc: `set에 N개를 넣으면 in 연산이 평균 O(1)입니다.
트라이보다 간결하지만 원리 학습에는 트라이가 유용합니다.`,
                                code: 'S = set(input().strip() for _ in range(N))'
                            },
                            {
                                title: '검사 및 출력',
                                desc: `M개를 하나씩 집합에 있는지 확인하여 카운트합니다.
sum + 제너레이터로 간결하게 처리합니다.`,
                                code: `count = sum(1 for _ in range(M) if input().strip() in S)
print(count)`
                            }
                        ],
                        cpp: [
                            {
                                title: '입력 + 트라이 준비',
                                desc: 'C++에서는 트라이로 직접 구현하는 연습!',
                                code: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool is_end = false;
};

int main() {
    int N, M;
    scanf("%d %d", &N, &M);`
                            },
                            {
                                title: '트라이 삽입',
                                desc: `N개의 문자열을 트라이에 insert합니다.
char 배열 + buf[j]로 한 글자씩 순회합니다.`,
                                code: `    TrieNode* root = new TrieNode();
    char buf[501];
    for (int i = 0; i < N; i++) {
        scanf("%s", buf);
        TrieNode* node = root;
        for (int j = 0; buf[j]; j++) {
            if (!node->children.count(buf[j]))
                node->children[buf[j]] = new TrieNode();
            node = node->children[buf[j]];
        }
        node->is_end = true;
    }`
                            },
                            {
                                title: '검색 및 출력',
                                desc: `M개를 트라이에서 search하여 is_end인 것만 카운트합니다.
경로가 끊기면 바로 break하여 불필요한 탐색을 줄입니다.`,
                                code: `    int count = 0;
    for (int i = 0; i < M; i++) {
        scanf("%s", buf);
        TrieNode* node = root;
        bool found = true;
        for (int j = 0; buf[j]; j++) {
            if (!node->children.count(buf[j])) { found = false; break; }
            node = node->children[buf[j]];
        }
        if (found && node->is_end) count++;
    }
    printf("%d\\n", count);
}`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lc-208',
            title: 'LeetCode 208 - Implement Trie',
            difficulty: 'medium',
            link: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
            simIntro: '트라이에 단어를 삽입하고 search/startsWith가 어떻게 동작하는지 확인하세요.',
            sim: {
                type: 'implement'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>트라이(접두사 트리)를 구현하세요. Trie 클래스에는 다음 메서드가 있습니다:</p>
                <ul>
                    <li><code>Trie()</code> - 트라이 객체를 초기화합니다.</li>
                    <li><code>void insert(String word)</code> - 문자열 word를 트라이에 삽입합니다.</li>
                    <li><code>boolean search(String word)</code> - 문자열 word가 트라이에 있으면 true, 없으면 false를 반환합니다.</li>
                    <li><code>boolean startsWith(String prefix)</code> - 이전에 삽입된 문자열 중 접두사 prefix를 가진 것이 있으면 true를 반환합니다.</li>
                </ul>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]</pre></div>
                    <div><strong>출력</strong><pre>[null, null, true, false, true, null, true]</pre></div>
                </div><p class="example-explain">insert("apple") → search("apple") = true, search("app") = false (app은 삽입된 적 없음), startsWith("app") = true (apple이 app으로 시작), insert("app") → search("app") = true</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ word.length, prefix.length ≤ 2,000</li>
                    <li>word와 prefix는 영어 소문자로만 구성</li>
                    <li>insert, search, startsWith 호출은 합쳐서 최대 3 × 10<sup>4</sup>번</li>
                </ul>
            `,
            hints: [
                {
                    title: '가장 단순한 방법: 리스트에 저장',
                    content: '일단 모든 단어를 <strong>리스트</strong>에 저장하면 어떨까요?<br><code>search</code>는 리스트에서 <code>in</code> 연산으로 찾고, <code>startsWith</code>는 for문으로 하나씩 접두사를 비교하면 되겠죠.<br>근데... 단어가 수만 개 쌓이면? search는 O(N), startsWith는 매번 모든 단어를 순회하니까 점점 느려져요!'
                },
                {
                    title: '접두사를 빠르게 찾으려면?',
                    content: '트라이는 <strong>글자 하나씩 노드로 내려가는 트리 구조</strong>입니다.<br>"apple"과 "app"을 넣으면 "a→p→p" 경로를 <strong>공유</strong>해요.<br><br><div style="display:flex;flex-direction:column;align-items:center;gap:4px;margin:10px 0;padding:12px;background:var(--bg2);border-radius:10px;"><div style="display:flex;align-items:center;gap:0;"><div style="width:30px;height:30px;border-radius:50%;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;background:var(--accent)15;">root</div></div><div style="width:2px;height:10px;background:var(--text2);"></div><div style="display:flex;align-items:center;gap:0;"><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--green);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;background:var(--green)15;color:var(--green);">a</div></div><div style="width:2px;height:10px;background:var(--text2);"></div><div style="display:flex;align-items:center;gap:0;"><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--green);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;background:var(--green)15;color:var(--green);">p</div></div><div style="width:2px;height:10px;background:var(--text2);"></div><div style="display:flex;align-items:center;gap:0;"><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--yellow);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;background:var(--yellow)20;box-shadow:0 0 6px var(--yellow);">p</div><span style="font-size:0.65rem;color:var(--yellow);font-weight:600;margin-left:6px;">isEnd (app)</span></div><div style="width:2px;height:10px;background:var(--text2);"></div><div style="display:flex;align-items:center;gap:0;"><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;background:var(--accent)10;">l</div></div><div style="width:2px;height:10px;background:var(--text2);"></div><div style="display:flex;align-items:center;gap:0;"><div style="width:28px;height:28px;border-radius:50%;border:2px solid var(--yellow);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;background:var(--yellow)20;box-shadow:0 0 6px var(--yellow);">e</div><span style="font-size:0.65rem;color:var(--yellow);font-weight:600;margin-left:6px;">isEnd (apple)</span></div></div>공통 접두사를 공유하니까 메모리도 절약되고, 탐색도 <strong>O(L)</strong> (L = 단어 길이)로 끝나요!<br><div style="display:flex;gap:12px;flex-wrap:wrap;margin:8px 0;"><div style="padding:6px 10px;background:var(--red)12;border:1.5px solid var(--red);border-radius:6px;font-size:0.82rem;text-align:center;"><div style="color:var(--red);font-weight:600;">리스트</div>O(N) 탐색</div><div style="padding:6px 10px;background:var(--green)12;border:1.5px solid var(--green);border-radius:6px;font-size:0.82rem;text-align:center;"><div style="color:var(--green);font-weight:600;">트라이</div>O(L) 탐색</div></div>'
                },
                {
                    title: '노드 구조 설계',
                    content: '각 노드에는 두 가지가 필요합니다:<br>① <strong>children</strong> — 자식 노드를 저장하는 공간 (다음 글자로 가는 길)<br>② <strong>isEnd</strong> — 이 노드에서 단어가 끝나는지 표시하는 플래그<br><span class="lang-py">Python: <code>children = {}</code> 딕셔너리로 자식 관리. 글자를 키로 사용하면 유연해요.</span><span class="lang-cpp">C++: <code>unordered_map&lt;char, Node*&gt;</code> 또는 <code>Node* children[26]</code> 배열로 자식 관리. 배열이 더 빠르지만, map이 더 유연합니다.</span>'
                }
            ],
            templates: {
                python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_end

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True`,
                cpp: `class Trie {
    struct Node {
        unordered_map<char, Node*> children;
        bool is_end = false;
    };
    Node* root;
public:
    Trie() { root = new Node(); }

    void insert(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->children.count(ch))
                node->children[ch] = new Node();
            node = node->children[ch];
        }
        node->is_end = true;
    }

    bool search(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->children.count(ch)) return false;
            node = node->children[ch];
        }
        return node->is_end;
    }

    bool startsWith(string prefix) {
        Node* node = root;
        for (char ch : prefix) {
            if (!node->children.count(ch)) return false;
            node = node->children[ch];
        }
        return true;
    }
};`
            },
            solutions: [
                {
                    approach: '트라이 직접 구현',
                    description: 'TrieNode에 children 맵과 is_end 플래그를 두고 insert/search/startsWith를 구현합니다.',
                    timeComplexity: 'O(L) per operation',
                    spaceComplexity: 'O(총 문자 수)',
                    templates: {
                        python: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""
        for i in range(len(strs[0])):
            ch = strs[0][i]
            for s in strs[1:]:
                if i >= len(s) or s[i] != ch:
                    return strs[0][:i]
        return strs[0]`,
                        cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        string prefix = strs[0];
        for (int i = 1; i < strs.size(); i++) {
            while (strs[i].find(prefix) != 0) {
                prefix = prefix.substr(0, prefix.size() - 1);
                if (prefix.empty()) return "";
            }
        }
        return prefix;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'TrieNode 정의',
                                desc: `children 딕셔너리로 자식 노드를 저장합니다.
is_end 플래그로 단어의 끝을 표시합니다.`,
                                code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False`
                            },
                            {
                                title: 'Trie 초기화',
                                desc: `빈 루트 노드를 생성합니다.
모든 삽입/검색은 루트에서 시작합니다.`,
                                code: `class Trie:
    def __init__(self):
        self.root = TrieNode()`
                            },
                            {
                                title: 'insert 구현',
                                desc: `한 글자씩 따라가며 없는 노드는 새로 생성합니다.
마지막 노드에 is_end = True로 단어 끝을 표시합니다.`,
                                code: `    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True`
                            },
                            {
                                title: 'search / startsWith',
                                desc: `search는 경로 끝에서 is_end를 확인합니다.
startsWith는 경로 존재만 확인하므로 is_end 무관합니다.`,
                                code: `    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_end

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True`
                            }
                        ],
                        cpp: [
                            {
                                title: 'Node 구조체 정의',
                                desc: `unordered_map으로 자식 관리.
Python dict와 동일한 역할.`,
                                code: `class Trie {
    struct Node {
        unordered_map<char, Node*> children;
        bool is_end = false;
    };
    Node* root;`
                            },
                            {
                                title: 'Trie 초기화',
                                desc: `new Node()로 빈 루트 생성.
Python의 self.root = TrieNode()과 동일합니다.`,
                                code: `public:
    Trie() { root = new Node(); }`
                            },
                            {
                                title: 'insert 구현',
                                desc: `count()로 키 존재 확인 → 없으면 new Node().
->로 포인터 멤버 접근.`,
                                code: `    void insert(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->children.count(ch))
                node->children[ch] = new Node();
            node = node->children[ch];
        }
        node->is_end = true;
    }`
                            },
                            {
                                title: 'search / startsWith',
                                desc: 'search는 is_end 확인, startsWith는 경로만 확인.',
                                code: `    bool search(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->children.count(ch)) return false;
            node = node->children[ch];
        }
        return node->is_end;
    }

    bool startsWith(string prefix) {
        Node* node = root;
        for (char ch : prefix) {
            if (!node->children.count(ch)) return false;
            node = node->children[ch];
        }
        return true;
    }
};`
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boj-5052',
            title: 'BOJ 5052 - 전화번호 목록',
            difficulty: 'gold',
            link: 'https://www.acmicpc.net/problem/5052',
            simIntro: '트라이에 전화번호를 넣으며 접두사 관계를 탐지하는 과정을 관찰하세요.',
            sim: {
                type: 'phoneBook'
            },
            descriptionHTML: `
                <h3>문제</h3>
                <p>전화번호 목록이 주어진다. 이때, 이 목록이 일관성이 있는지 없는지를 구해야 한다.</p>
                <p>전화번호 목록이 일관성을 유지하려면, 한 번호가 다른 번호의 접두어인 경우가 없어야 한다. 예를 들어, 긴급전화가 911이고, 선영이의 집 전화번호가 91125426이면 선영이에게 전화를 걸 수 없다. 911을 누르는 순간 긴급전화가 걸리기 때문이다.</p>
                <h4>입력</h4>
                <p>첫째 줄에 테스트 케이스의 수 t(1 &le; t &le; 50)가 주어진다. 각 테스트 케이스의 첫째 줄에는 전화번호의 수 n(1 &le; n &le; 10,000)이 주어진다. 다음 n개의 줄에는 목록에 포함되어 있는 전화번호가 하나씩 주어진다. 전화번호의 길이는 최대 10자리이며, 목록에 같은 전화번호가 중복해서 들어있는 경우는 없다.</p>
                <h4>출력</h4>
                <p>각 테스트 케이스에 대해서, 일관성 있는 목록인 경우에는 "YES", 그렇지 않은 경우에는 "NO"를 출력한다.</p>
                <div class="problem-example"><h4>예제 1</h4><div class="example-grid">
                    <div><strong>입력</strong><pre>2
3
911
97625999
91125426
5
113
12340
123440
12345
98346</pre></div>
                    <div><strong>출력</strong><pre>NO
YES</pre></div>
                </div><p class="example-explain">첫 번째 케이스: 911이 91125426의 접두어이므로 일관성 없음(NO). 두 번째 케이스: 어떤 번호도 다른 번호의 접두어가 아니므로 일관성 있음(YES).</p></div>
                <h4>제약 조건</h4>
                <ul>
                    <li>1 ≤ t ≤ 50 (테스트 케이스 수)</li>
                    <li>1 ≤ n ≤ 10,000 (전화번호 수)</li>
                    <li>전화번호 길이 ≤ 10</li>
                    <li>전화번호는 숫자로만 구성</li>
                </ul>
            `,
            hints: [
                {
                    title: '처음 생각: 모든 쌍 비교',
                    content: 'N개 번호 중 하나가 다른 것의 접두어인지 확인하려면... 모든 쌍을 비교하면 되겠죠?<br>근데 이러면 <strong>O(N<sup>2</sup> × L)</strong>이에요. N이 10,000이면 1억 번 비교... 느려요!'
                },
                {
                    title: '정렬하면 인접한 것만 비교!',
                    content: '<strong>사전순 정렬</strong>하면 접두어 관계는 반드시 <strong>인접한 번호 사이</strong>에만 존재합니다!<br>예: ["911", "91125426", "97625999"] → 911과 91125426이 나란히 오죠.<br>정렬 후 이웃한 쌍만 비교하면 <strong>O(N log N × L)</strong>로 해결!'
                },
                {
                    title: '트라이로 접두어 판별',
                    content: '번호를 하나씩 트라이에 삽입하면서 접두어 관계를 바로 탐지할 수 있어요!<br><br><div style="display:flex;gap:16px;flex-wrap:wrap;margin:10px 0;"><div style="flex:1;min-width:140px;padding:10px;border:2px solid var(--red);border-radius:8px;background:var(--red)06;"><div style="font-size:0.75rem;font-weight:700;color:var(--red);margin-bottom:6px;">① 경로에 isEnd 발견</div><div style="display:flex;align-items:center;gap:4px;font-size:0.8rem;"><span style="padding:3px 6px;border-radius:4px;border:1.5px solid var(--green);background:var(--green)15;font-weight:600;">9</span><span>→</span><span style="padding:3px 6px;border-radius:4px;border:1.5px solid var(--green);background:var(--green)15;font-weight:600;">1</span><span>→</span><span style="padding:3px 6px;border-radius:4px;border:2px solid var(--yellow);background:var(--yellow)25;font-weight:700;box-shadow:0 0 4px var(--yellow);">1</span><span>→</span><span style="padding:3px 6px;border-radius:4px;border:1.5px dashed var(--text2);color:var(--text2);">2...</span></div><div style="font-size:0.68rem;color:var(--red);margin-top:4px;">911이 91125426의 접두어!</div></div><div style="flex:1;min-width:140px;padding:10px;border:2px solid var(--red);border-radius:8px;background:var(--red)06;"><div style="font-size:0.75rem;font-weight:700;color:var(--red);margin-bottom:6px;">② 끝 노드에 자식 존재</div><div style="display:flex;align-items:center;gap:4px;font-size:0.8rem;"><span style="padding:3px 6px;border-radius:4px;border:1.5px solid var(--green);background:var(--green)15;font-weight:600;">9</span><span>→</span><span style="padding:3px 6px;border-radius:4px;border:1.5px solid var(--green);background:var(--green)15;font-weight:600;">1</span><span>→</span><span style="padding:3px 6px;border-radius:4px;border:2px solid var(--yellow);background:var(--yellow)25;font-weight:700;box-shadow:0 0 4px var(--yellow);">1</span></div><div style="font-size:0.68rem;color:var(--red);margin-top:4px;">자식(2,5...)이 있으면 접두어!</div></div></div>두 방향 모두 체크하는 게 핵심입니다.'
                }
            ],
            templates: {
                python: `import sys
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """삽입하면서 접두사 관계 확인. 문제 있으면 False 반환"""
        node = self.root
        prefix_found = False
        for ch in word:
            if node.is_end:
                prefix_found = True
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True
        if len(node.children) > 0:
            prefix_found = True
        return not prefix_found

t = int(input())
for _ in range(t):
    n = int(input())
    trie = Trie()
    numbers = [input().strip() for _ in range(n)]
    consistent = True
    for num in numbers:
        if not trie.insert(num):
            consistent = False
    print("YES" if consistent else "NO")`,
                cpp: `#include <cstdio>
#include <cstring>
#include <string>
#include <vector>
using namespace std;

struct TrieNode {
    TrieNode* children[10] = {};
    bool is_end = false;
};

bool insert(TrieNode* root, const string& s) {
    TrieNode* node = root;
    bool ok = true;
    for (char ch : s) {
        int idx = ch - '0';
        if (node->is_end) ok = false;
        if (!node->children[idx])
            node->children[idx] = new TrieNode();
        node = node->children[idx];
    }
    node->is_end = true;
    for (int i = 0; i < 10; i++)
        if (node->children[i]) ok = false;
    return ok;
}

void deleteTrie(TrieNode* node) {
    for (int i = 0; i < 10; i++)
        if (node->children[i]) deleteTrie(node->children[i]);
    delete node;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        TrieNode* root = new TrieNode();
        vector<string> nums(n);
        bool ok = true;
        for (int i = 0; i < n; i++) {
            char buf[11];
            scanf("%s", buf);
            nums[i] = buf;
        }
        for (auto& s : nums) {
            if (!insert(root, s)) ok = false;
        }
        puts(ok ? "YES" : "NO");
        deleteTrie(root);
    }
}`
            },
            solutions: [
                {
                    approach: '트라이 삽입 + 접두사 체크',
                    description: '삽입 중 is_end 노드를 만나거나 삽입 후 자식이 있으면 접두사 관계입니다.',
                    timeComplexity: 'O(N × L)',
                    spaceComplexity: 'O(N × L)',
                    templates: {
                        python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_end

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True`,
                        cpp: `class Trie {
    struct Node {
        unordered_map<char, Node*> children;
        bool is_end = false;
    };
    Node* root;
public:
    Trie() { root = new Node(); }

    void insert(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->children.count(ch))
                node->children[ch] = new Node();
            node = node->children[ch];
        }
        node->is_end = true;
    }

    bool search(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->children.count(ch)) return false;
            node = node->children[ch];
        }
        return node->is_end;
    }

    bool startsWith(string prefix) {
        Node* node = root;
        for (char ch : prefix) {
            if (!node->children.count(ch)) return false;
            node = node->children[ch];
        }
        return true;
    }
};`
                    },
                    codeSteps: {
                        python: [
                            {
                                title: 'TrieNode + Trie 정의',
                                desc: `기본 트라이 구조를 정의합니다.
insert 시 접두사 관계를 동시에 탐지하는 것이 핵심입니다.`,
                                code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()`
                            },
                            {
                                title: 'insert + 접두사 판별',
                                desc: `경로 중간에 is_end를 만나면 기존 번호가 접두사입니다.
삽입 후 자식이 있으면 현재 번호가 다른 번호의 접두사입니다.`,
                                code: `    def insert(self, word):
        node = self.root
        prefix_found = False
        for ch in word:
            if node.is_end:
                prefix_found = True
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True
        if len(node.children) > 0:
            prefix_found = True
        return not prefix_found`
                            },
                            {
                                title: '테스트 케이스 처리',
                                desc: `각 테스트 케이스마다 새 트라이를 만들어 번호를 삽입합니다.
하나라도 접두사 관계가 발견되면 NO를 출력합니다.`,
                                code: `t = int(input())
for _ in range(t):
    n = int(input())
    trie = Trie()
    numbers = [input().strip() for _ in range(n)]
    consistent = True
    for num in numbers:
        if not trie.insert(num):
            consistent = False
    print("YES" if consistent else "NO")`
                            }
                        ],
                        cpp: [
                            {
                                title: 'TrieNode 정의',
                                desc: `숫자 0~9만 → children[10] 배열로 충분.
map 대신 배열이라 더 빠름!`,
                                code: `struct TrieNode {
    TrieNode* children[10] = {};
    bool is_end = false;
};`
                            },
                            {
                                title: 'insert + 접두사 판별',
                                desc: `경로 중 is_end 발견 → 접두사 관계.
삽입 후 자식 존재 → 현재가 접두사.`,
                                code: `bool insert(TrieNode* root, const string& s) {
    TrieNode* node = root;
    bool ok = true;
    for (char ch : s) {
        int idx = ch - '0';
        if (node->is_end) ok = false;  // 경로 중간에 끝 표시!
        if (!node->children[idx])
            node->children[idx] = new TrieNode();
        node = node->children[idx];
    }
    node->is_end = true;
    for (int i = 0; i < 10; i++)
        if (node->children[i]) ok = false;  // 자식 있으면 내가 접두사!
    return ok;
}`
                            },
                            {
                                title: '테스트 케이스 처리',
                                desc: `테스트 케이스마다 새 루트를 생성하여 독립적으로 처리합니다.
insert가 false를 반환하면 접두사 관계가 존재합니다.`,
                                code: `int main() {
    int t; scanf("%d", &t);
    while (t--) {
        int n; scanf("%d", &n);
        TrieNode* root = new TrieNode();
        bool ok = true;
        for (int i = 0; i < n; i++) {
            char buf[11]; scanf("%s", buf);
            if (!insert(root, string(buf))) ok = false;
        }
        puts(ok ? "YES" : "NO");
    }
}`
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
