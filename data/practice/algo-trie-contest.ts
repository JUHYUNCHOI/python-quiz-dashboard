import type { PracticeCluster } from "./types"

export const trieContestCluster: PracticeCluster = {
  id: "algo-trie-contest",
  title: "트라이 문제 풀이",
  emoji: "🔤",
  description: "문자열 검색에 특화된 트리 — 삽입/검색/prefix/자동완성/wildcard/XOR",
  unlockAfter: "algo-trie",
  en: {
    title: "Trie Practice",
    description: "String-specialized tree — insert/search/prefix/autocomplete/wildcard/XOR",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. 트라이 기본 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-001",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "보통",
      title: "트라이 기본 — 단어 사전 검색",
      description: `N 개의 영문 소문자 단어를 사전에 등록한다. 이후 Q 개의 질의 단어가 주어지면 각 단어가 사전에 있으면 \`YES\`, 없으면 \`NO\` 를 한 줄씩 출력하라.

**트라이로 풀어야 함.** set 으로도 풀리지만, 여기서는 TrieNode 구조를 직접 구현해 익히자.

입력 형식:
- 첫 줄: N Q
- 다음 N 줄: 등록할 단어
- 다음 Q 줄: 질의 단어

출처: 원본 (트라이 입문)`,
      constraints: "1 ≤ N, Q ≤ 10,000, 단어 길이 ≤ 50, 영문 소문자만",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 3\ncat\ncar\ncard\ncat\ncars\ncard", expectedOutput: "YES\nNO\nYES", label: "기본 — cat O, cars X, card O" },
        { stdin: "1 2\napple\napple\napp", expectedOutput: "YES\nNO", label: "prefix 만으로는 매치 X" },
        { stdin: "2 3\nab\nabc\na\nab\nabc", expectedOutput: "NO\nYES\nYES", label: "짧은 단어 검색" },
        { stdin: "1 1\nhello\nhello", expectedOutput: "YES", label: "단일 단어" },
        { stdin: "4 2\nfoo\nbar\nbaz\nqux\nfoo\nfox", expectedOutput: "YES\nNO", label: "다양한 단어" },
        { stdin: "2 2\na\nab\na\nab", expectedOutput: "YES\nYES", label: "두 단어가 prefix 관계" },
      ],
      hints: [
        "TrieNode 구조: children (dict 또는 int[26]) + is_end 플래그.",
        "insert: 글자마다 자식 노드 따라가며 없으면 생성. 마지막 노드의 is_end=true.",
        "search: 글자마다 자식 따라가다 없으면 false. 끝까지 가면 is_end 확인.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[26] = {nullptr};
    bool is_end = false;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) cur->children[i] = new Trie();
        cur = cur->children[i];
    }
    cur->is_end = true;
}

bool search(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) return false;
        cur = cur->children[i];
    }
    return cur->is_end;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, Q;
    cin >> N >> Q;
    Trie* root = new Trie();
    for (int i = 0; i < N; i++) {
        string w; cin >> w;
        insert(root, w);
    }
    for (int i = 0; i < Q; i++) {
        string w; cin >> w;
        cout << (search(root, w) ? "YES" : "NO") << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "트라이의 기본 — 각 노드는 26 개 자식 + 단어 끝 플래그. insert/search 모두 O(L) (L = 단어 길이). set 이 더 짧지만 트라이는 prefix 처리에 강하다.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.is_end = True

def search(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            return False
        cur = cur.children[c]
    return cur.is_end

N, Q = map(int, input().split())
root = TrieNode()
for _ in range(N):
    insert(root, input().strip())
out = []
for _ in range(Q):
    out.append("YES" if search(root, input().strip()) else "NO")
print("\\n".join(out))
`,
      en: {
        title: "Trie Basics — Word Dictionary",
        description: `Insert N lowercase words into a dictionary, then for each of Q queries print \`YES\` if the word is in the dictionary, \`NO\` otherwise.

**Use a trie.** You could use a set, but here we implement the TrieNode structure to learn it.

Input:
- Line 1: N Q
- Next N lines: words to insert
- Next Q lines: query words

Source: original (trie introduction)`,
        constraints: "1 ≤ N, Q ≤ 10,000, word length ≤ 50, lowercase only",
        hints: [
          "TrieNode: children (dict or int[26]) + is_end flag.",
          "insert: walk char-by-char, create missing children; mark is_end on the last node.",
          "search: walk char-by-char; if any child missing return false; at the end check is_end.",
        ],
        solutionExplanation:
          "Trie basics — each node has 26 children + an end flag. insert/search both O(L). A set is shorter but a trie shines on prefix operations.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. prefix 매칭 카운트 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-002",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "보통",
      title: "Prefix 매칭 — 등록 단어가 query 의 prefix?",
      description: `N 개의 단어를 트라이에 넣는다. Q 개의 query 문자열이 주어지면, 각 query 에 대해 **등록된 단어 중 query 의 prefix 인 것의 개수** 를 출력하라.

예: 등록 {"a", "ab", "abc"}. query "abcd" → "a", "ab", "abc" 모두 prefix → 3.

방법: query 를 한 글자씩 따라 내려가며 is_end 마다 카운트 +1.

출처: 원본 (트라이 응용 — 한 방향 prefix)`,
      constraints: "1 ≤ N, Q ≤ 10,000, 단어/query 길이 ≤ 100",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 1\na\nab\nabc\nabcd", expectedOutput: "3", label: "a, ab, abc 모두 prefix" },
        { stdin: "3 2\ncat\ncar\ncard\ncatch\ncards", expectedOutput: "1\n2", label: "catch → cat 만 / cards → car, card" },
        { stdin: "2 1\nhello\nworld\nhelp", expectedOutput: "0", label: "공통 prefix 없음" },
        { stdin: "1 1\nabc\nabc", expectedOutput: "1", label: "정확히 일치 — 자기 자신도 prefix" },
        { stdin: "4 1\na\nab\nabc\nabcd\nabcdef", expectedOutput: "4", label: "다 prefix" },
        { stdin: "2 1\nab\nabcd\nabc", expectedOutput: "1", label: "abcd 는 abc 의 prefix 아님" },
      ],
      hints: [
        "트라이 insert 는 기본과 동일.",
        "각 query 마다: root 부터 글자 하나씩 내려가며 is_end == true 인 노드 만날 때마다 count++.",
        "자식이 없으면 즉시 멈춤. 끝까지 가도 됨.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[26] = {nullptr};
    bool is_end = false;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) cur->children[i] = new Trie();
        cur = cur->children[i];
    }
    cur->is_end = true;
}

int countPrefix(Trie* root, const string& q) {
    Trie* cur = root;
    int cnt = 0;
    for (char c : q) {
        int i = c - 'a';
        if (!cur->children[i]) break;
        cur = cur->children[i];
        if (cur->is_end) cnt++;
    }
    return cnt;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, Q;
    cin >> N >> Q;
    Trie* root = new Trie();
    for (int i = 0; i < N; i++) {
        string w; cin >> w;
        insert(root, w);
    }
    for (int i = 0; i < Q; i++) {
        string q; cin >> q;
        cout << countPrefix(root, q) << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "query 를 트라이에서 따라 내려가다 is_end 만날 때마다 +1. O(|query|) per query. 등록 단어 수와 무관하게 빠름.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.is_end = True

def count_prefix(root, q):
    cur = root
    cnt = 0
    for c in q:
        if c not in cur.children:
            break
        cur = cur.children[c]
        if cur.is_end:
            cnt += 1
    return cnt

N, Q = map(int, input().split())
root = TrieNode()
for _ in range(N):
    insert(root, input().strip())
out = []
for _ in range(Q):
    out.append(str(count_prefix(root, input().strip())))
print("\\n".join(out))
`,
      en: {
        title: "Prefix Match — Registered Words as Prefix of Query",
        description: `Insert N words. For each of Q queries, print the number of registered words that are a **prefix of the query**.

E.g. dictionary {"a", "ab", "abc"}, query "abcd" → all three are prefixes → 3.

Method: walk the query down the trie one char at a time; whenever you land on an is_end node, increment count.

Source: original (trie application — one-direction prefix)`,
        constraints: "1 ≤ N, Q ≤ 10,000, word/query length ≤ 100",
        hints: [
          "Insert is standard.",
          "For each query: walk from root char-by-char; whenever cur.is_end is true, count++.",
          "Stop if a child is missing.",
        ],
        solutionExplanation:
          "Walk query in the trie, count is_end along the way. O(|query|) per query.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 가장 긴 공통 prefix — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-003",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "보통",
      title: "가장 긴 공통 prefix (LCP)",
      description: `N 개의 영문 소문자 단어가 주어진다. 모든 단어가 공통으로 가지는 **가장 긴 prefix** 의 길이를 출력하라. 공통 prefix 가 없으면 \`0\`.

트라이 활용: 모든 단어를 삽입한 뒤, root 부터 내려가며 **자식이 정확히 1 개** 이고 **is_end 가 아닌** 동안 깊이 +1.

예: {"flower", "flow", "flight"} → "fl" → 길이 2.

출처: LeetCode 14 (Longest Common Prefix) paraphrased + 트라이 풀이`,
      constraints: "1 ≤ N ≤ 1,000, 단어 길이 ≤ 200, 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\nflower\nflow\nflight", expectedOutput: "2", label: "fl" },
        { stdin: "3\ndog\nracecar\ncar", expectedOutput: "0", label: "공통 없음" },
        { stdin: "1\nhello", expectedOutput: "5", label: "단어 1개 → 자기 길이" },
        { stdin: "2\nabc\nabcdef", expectedOutput: "3", label: "한 쪽이 prefix" },
        { stdin: "3\nabab\nabac\nabad", expectedOutput: "3", label: "aba" },
        { stdin: "2\na\nab", expectedOutput: "1", label: "짧은 단어가 is_end" },
        { stdin: "4\nprogress\nprogram\nproblem\nprovide", expectedOutput: "3", label: "pro" },
      ],
      hints: [
        "모든 단어를 트라이에 삽입.",
        "root 부터 내려가며: 자식이 정확히 1 개 AND 현재 노드가 is_end 가 아닌 동안 깊이 증가.",
        "자식이 2 개 이상이면 분기 → 멈춤. is_end 이면 더 짧은 단어로 인해 prefix 끝남.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[26] = {nullptr};
    bool is_end = false;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) cur->children[i] = new Trie();
        cur = cur->children[i];
    }
    cur->is_end = true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N; cin >> N;
    Trie* root = new Trie();
    for (int i = 0; i < N; i++) {
        string w; cin >> w;
        insert(root, w);
    }
    int depth = 0;
    Trie* cur = root;
    while (true) {
        if (cur->is_end) break;
        int cnt = 0, idx = -1;
        for (int i = 0; i < 26; i++) {
            if (cur->children[i]) { cnt++; idx = i; }
        }
        if (cnt != 1) break;
        cur = cur->children[idx];
        depth++;
    }
    cout << depth << "\\n";
    return 0;
}`,
      solutionExplanation:
        "공통 prefix = 트라이에서 분기 없는 길. 자식이 1 개일 때만 내려가고, 어떤 단어가 끝났으면 (is_end) 더 못 감.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.is_end = True

N = int(input())
root = TrieNode()
for _ in range(N):
    insert(root, input().strip())

depth = 0
cur = root
while True:
    if cur.is_end:
        break
    if len(cur.children) != 1:
        break
    cur = next(iter(cur.children.values()))
    depth += 1

print(depth)
`,
      en: {
        title: "Longest Common Prefix (LCP)",
        description: `Given N lowercase words, print the length of their **longest common prefix**. Print \`0\` if none.

Trie approach: insert all words; walk down from root while the current node has **exactly one child** and is **not is_end**.

E.g. {"flower", "flow", "flight"} → "fl" → length 2.

Source: LeetCode 14 (Longest Common Prefix) paraphrased + trie solution`,
        constraints: "1 ≤ N ≤ 1,000, word length ≤ 200, lowercase",
        hints: [
          "Insert all words into the trie.",
          "Walk down while the node has exactly 1 child AND is not is_end.",
          "Stop at a branching node (≥2 children) or when some word ends here.",
        ],
        solutionExplanation:
          "Common prefix = the non-branching path in the trie. Descend only when there's a single child, stop on is_end.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 자동완성 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-004",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "보통",
      title: "자동완성 — prefix 로 시작하는 단어 개수",
      description: `N 개의 단어를 트라이에 넣는다. Q 개의 prefix 가 주어지면, 각 prefix 로 시작하는 **사전 등록 단어의 개수** 를 출력하라.

방법: 각 노드에 \`count\` (이 노드를 지나는 단어 수) 를 같이 저장. insert 마다 따라가는 노드의 count++. query 는 prefix 따라 내려간 뒤 도착 노드의 count 출력.

자동완성 시스템의 핵심.

출처: 자동완성 응용 (LeetCode 208 변형)`,
      constraints: "1 ≤ N, Q ≤ 10,000, 단어/prefix 길이 ≤ 50",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5 3\napple\napp\napricot\nbanana\nbat\nap\napp\nb", expectedOutput: "3\n2\n2", label: "ap → apple/app/apricot, app → apple/app, b → banana/bat" },
        { stdin: "3 1\ncat\ncar\ncard\nca", expectedOutput: "3", label: "ca → 모두" },
        { stdin: "2 1\nhello\nworld\nx", expectedOutput: "0", label: "매치 없음" },
        { stdin: "1 1\nhello\nhello", expectedOutput: "1", label: "정확히 일치" },
        { stdin: "4 2\nfoo\nfoot\nfood\nbar\nfoo\nfo", expectedOutput: "3\n3", label: "foo, fo 모두 3" },
        { stdin: "3 2\na\nab\nabc\na\nab", expectedOutput: "3\n2", label: "a → 3, ab → 2" },
      ],
      hints: [
        "각 TrieNode 에 int count 필드 추가.",
        "insert 시 따라가는 모든 노드에서 count++.",
        "query 시 prefix 따라 끝까지 간 노드의 count 가 답. 가다 자식 없으면 0.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[26] = {nullptr};
    int count = 0;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) cur->children[i] = new Trie();
        cur = cur->children[i];
        cur->count++;
    }
}

int countWithPrefix(Trie* root, const string& p) {
    Trie* cur = root;
    for (char c : p) {
        int i = c - 'a';
        if (!cur->children[i]) return 0;
        cur = cur->children[i];
    }
    return cur->count;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, Q;
    cin >> N >> Q;
    Trie* root = new Trie();
    for (int i = 0; i < N; i++) {
        string w; cin >> w;
        insert(root, w);
    }
    for (int i = 0; i < Q; i++) {
        string p; cin >> p;
        cout << countWithPrefix(root, p) << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "각 노드에 'pass-through count' 저장 — insert 때 노드마다 +1. 자동완성 시스템은 이 카운트를 prefix 끝에서 읽기만 하면 됨. O(L) per op.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.count = 0

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
        cur.count += 1

def count_prefix(root, p):
    cur = root
    for c in p:
        if c not in cur.children:
            return 0
        cur = cur.children[c]
    return cur.count

N, Q = map(int, input().split())
root = TrieNode()
for _ in range(N):
    insert(root, input().strip())
out = []
for _ in range(Q):
    out.append(str(count_prefix(root, input().strip())))
print("\\n".join(out))
`,
      en: {
        title: "Autocomplete — Count Words Starting With Prefix",
        description: `Insert N words. For each of Q prefixes, print the number of registered words **starting with that prefix**.

Method: store \`count\` on each node (how many words pass through). insert bumps count on each visited node; query walks the prefix and reads the count at the end.

Core of an autocomplete engine.

Source: autocomplete application (LeetCode 208 variant)`,
        constraints: "1 ≤ N, Q ≤ 10,000, word/prefix length ≤ 50",
        hints: [
          "Add an int count field to each TrieNode.",
          "insert: count++ on every visited node.",
          "query: walk prefix; if a child is missing return 0; else return cur.count.",
        ],
        solutionExplanation:
          "Pass-through counter per node. O(L) per insert/query — independent of dictionary size.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. case-sensitive 사전 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-005",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "보통",
      title: "단어 사전 — 대소문자 구분",
      description: `N 개의 단어를 사전에 등록한다. 단어에는 **대문자와 소문자가 모두** 포함된다. 이후 Q 개의 query 에 대해 **대소문자까지 정확히 일치** 하면 \`YES\`, 아니면 \`NO\` 를 출력하라.

대소문자 구분 → 자식 배열을 26 칸이 아니라 dict (또는 52 칸 배열) 로.

\`Apple\` ≠ \`apple\`.

출처: 원본 (트라이 — dict children 패턴)`,
      constraints: "1 ≤ N, Q ≤ 10,000, 단어 길이 ≤ 50, A-Z + a-z",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 4\nApple\napple\nBanana\nApple\napple\nAPPLE\nBanana", expectedOutput: "YES\nYES\nNO\nYES", label: "대소문자 구분" },
        { stdin: "1 2\nHello\nHello\nhello", expectedOutput: "YES\nNO", label: "case sensitive" },
        { stdin: "2 2\nabc\nABC\nabc\nABC", expectedOutput: "YES\nYES", label: "둘 다 등록" },
        { stdin: "1 1\nMixedCase\nMixedCase", expectedOutput: "YES", label: "정확 일치" },
        { stdin: "1 1\nMixedCase\nmixedcase", expectedOutput: "NO", label: "전부 소문자 — 매치 X" },
        { stdin: "2 1\nA\na\nA", expectedOutput: "YES", label: "한 글자" },
      ],
      hints: [
        "고정 크기 자식 배열 (26 칸) 대신 dict 또는 52 칸 (대소문자) 배열을 사용.",
        "C++ unordered_map<char, Trie*> 가 가장 깔끔.",
        "Python 은 그냥 dict 면 자연스럽게 모든 문자 지원.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    unordered_map<char, Trie*> children;
    bool is_end = false;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        if (!cur->children.count(c)) cur->children[c] = new Trie();
        cur = cur->children[c];
    }
    cur->is_end = true;
}

bool search(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        auto it = cur->children.find(c);
        if (it == cur->children.end()) return false;
        cur = it->second;
    }
    return cur->is_end;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, Q;
    cin >> N >> Q;
    Trie* root = new Trie();
    for (int i = 0; i < N; i++) {
        string w; cin >> w;
        insert(root, w);
    }
    for (int i = 0; i < Q; i++) {
        string w; cin >> w;
        cout << (search(root, w) ? "YES" : "NO") << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "26 칸 고정 배열은 알파벳 한 종류만 지원. dict (unordered_map) 으로 바꾸면 어떤 문자도 OK. 약간 느리지만 유연.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.is_end = True

def search(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            return False
        cur = cur.children[c]
    return cur.is_end

N, Q = map(int, input().split())
root = TrieNode()
for _ in range(N):
    insert(root, input().strip())
out = []
for _ in range(Q):
    out.append("YES" if search(root, input().strip()) else "NO")
print("\\n".join(out))
`,
      en: {
        title: "Word Dictionary — Case Sensitive",
        description: `Insert N words (may contain uppercase and lowercase). For each of Q queries print \`YES\` if it matches **exactly (case-sensitive)**, else \`NO\`.

Case-sensitive → use a dict (or 52-slot array) for children instead of fixed 26-slot.

\`Apple\` ≠ \`apple\`.

Source: original (trie — dict children pattern)`,
        constraints: "1 ≤ N, Q ≤ 10,000, word length ≤ 50, A-Z + a-z",
        hints: [
          "Use a dict or 52-slot array for children, not 26.",
          "C++: unordered_map<char, Trie*> is cleanest.",
          "Python: a plain dict supports any character naturally.",
        ],
        solutionExplanation:
          "Fixed-26 array only handles one case; dict children handle any character. Slightly slower but flexible.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. prefix 관계 단어 개수 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-006",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "보통",
      title: "다른 단어의 prefix 인 단어 개수",
      description: `N 개의 영문 소문자 단어가 주어진다. **다른 단어의 진짜 prefix (자기 자신 제외)** 인 단어가 몇 개인지 출력하라.

예: {"a", "ab", "abc"} → "a" 는 "ab" 의 prefix, "ab" 는 "abc" 의 prefix → 답 2 (자기 자신은 제외).

방법: 트라이에 모두 삽입. 각 단어를 다시 탐색하여 **단어 끝 노드 이후에도 자식이 더 있는지** 확인. 자식이 있다면 다른 단어가 이 단어를 prefix 로 가짐.

출처: 원본 (트라이 — 두 번 순회 패턴)`,
      constraints: "1 ≤ N ≤ 10,000, 단어 길이 ≤ 50, 단어 중복 없음",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\na\nab\nabc", expectedOutput: "2", label: "a, ab 가 다른 것의 prefix" },
        { stdin: "3\ncat\ndog\nfish", expectedOutput: "0", label: "공통 prefix 없음" },
        { stdin: "4\ncat\ncar\ncard\ncards", expectedOutput: "2", label: "car 와 card 가 prefix" },
        { stdin: "1\nhello", expectedOutput: "0", label: "단어 1개" },
        { stdin: "2\nab\nabc", expectedOutput: "1", label: "ab 만" },
        { stdin: "5\na\nb\nc\nab\nbc", expectedOutput: "2", label: "a (→ab), b (→bc)" },
        { stdin: "3\napple\napp\nape", expectedOutput: "1", label: "app 만 apple 의 prefix" },
      ],
      hints: [
        "모두 삽입 후, 각 단어를 다시 트라이에서 따라가면서 끝 노드 도달.",
        "끝 노드의 자식이 1 개라도 있으면 → 누군가 이 단어를 prefix 로 가짐 → 카운트++.",
        "자기 자신은 제외 — 위 조건만 만족하면 됨 (자식이 있다는 건 더 긴 단어가 있다는 뜻).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[26] = {nullptr};
    bool is_end = false;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) cur->children[i] = new Trie();
        cur = cur->children[i];
    }
    cur->is_end = true;
}

bool hasChild(Trie* node) {
    for (int i = 0; i < 26; i++) if (node->children[i]) return true;
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N; cin >> N;
    vector<string> words(N);
    Trie* root = new Trie();
    for (int i = 0; i < N; i++) {
        cin >> words[i];
        insert(root, words[i]);
    }
    int cnt = 0;
    for (const string& w : words) {
        Trie* cur = root;
        for (char c : w) cur = cur->children[c - 'a'];
        if (hasChild(cur)) cnt++;
    }
    cout << cnt << "\\n";
    return 0;
}`,
      solutionExplanation:
        "단어 끝 노드에 자식이 존재 ⇔ 더 긴 단어가 이 단어를 prefix 로 가짐. 두 번 순회: 한 번은 insert, 한 번은 'has-child?' 검사. 각각 O(총 단어 길이).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.is_end = True

N = int(input())
words = [input().strip() for _ in range(N)]
root = TrieNode()
for w in words:
    insert(root, w)

cnt = 0
for w in words:
    cur = root
    for c in w:
        cur = cur.children[c]
    if cur.children:
        cnt += 1

print(cnt)
`,
      en: {
        title: "Count Words That Are Prefixes of Others",
        description: `Given N lowercase words (no duplicates), count how many words are a **strict prefix** of some other word.

E.g. {"a", "ab", "abc"} → "a" is prefix of "ab"; "ab" is prefix of "abc" → answer 2.

Method: insert all; for each word, walk to its end node — if it has any child, some longer word has it as a prefix.

Source: original (trie — two-pass pattern)`,
        constraints: "1 ≤ N ≤ 10,000, length ≤ 50, no duplicates",
        hints: [
          "Insert all words, then re-walk each word to its end.",
          "If the end node has any child → some longer word extends this one → count++.",
          "No need to handle 'self' — having a child means a strictly longer word exists.",
        ],
        solutionExplanation:
          "End-node-has-child ⇔ some longer word has this as a prefix. Two passes, both O(total length).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 트라이 + 부분 문자열 (Implement Trie, LC 208) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-007",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "어려움",
      title: "트라이 통합 검색 (insert / search / startsWith)",
      description: `세 가지 명령을 처리하는 트라이를 구현하라.

- \`I w\` — 단어 \`w\` 를 삽입.
- \`S w\` — 단어 \`w\` 가 정확히 등록되어 있으면 \`YES\` 아니면 \`NO\` 출력.
- \`P w\` — 등록 단어 중 \`w\` 를 prefix 로 가지는 것이 있으면 \`YES\` 아니면 \`NO\` 출력.

총 N 개의 명령이 주어진다.

핵심 — \`S\` (search) 는 끝까지 가서 is_end 확인, \`P\` (startsWith) 는 끝까지 갈 수 있으면 그걸로 충분.

출처: LeetCode 208 (Implement Trie) paraphrased`,
      constraints: "1 ≤ N ≤ 50,000, 단어 길이 ≤ 50, 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\nI apple\nS apple\nS app\nP app\nI app",
          expectedOutput: "YES\nNO\nYES",
          label: "기본 — 단어 vs prefix 구분",
        },
        {
          stdin: "7\nI apple\nI app\nS app\nP appl\nP apx\nS apple\nS apply",
          expectedOutput: "YES\nYES\nNO\nYES\nNO",
          label: "여러 단어 + prefix 검색",
        },
        {
          stdin: "3\nP a\nI a\nP a",
          expectedOutput: "NO\nYES",
          label: "빈 트라이 → prefix 도 NO",
        },
        {
          stdin: "4\nI hello\nI help\nP hel\nS hel",
          expectedOutput: "YES\nNO",
          label: "공통 prefix 만 있고 단어는 없는 경우",
        },
        {
          stdin: "2\nI a\nP a",
          expectedOutput: "YES",
          label: "한 글자",
        },
      ],
      hints: [
        "TrieNode: children[26] + is_end.",
        "S: 끝까지 갈 수 있고 마지막 노드 is_end == true 일 때만 YES.",
        "P: 끝까지 갈 수 있으면 (is_end 무관) YES.",
        "도중에 자식 없으면 둘 다 NO.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[26] = {nullptr};
    bool is_end = false;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) cur->children[i] = new Trie();
        cur = cur->children[i];
    }
    cur->is_end = true;
}

Trie* walk(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) return nullptr;
        cur = cur->children[i];
    }
    return cur;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N; cin >> N;
    Trie* root = new Trie();
    string out;
    for (int i = 0; i < N; i++) {
        char op; string w;
        cin >> op >> w;
        if (op == 'I') {
            insert(root, w);
        } else if (op == 'S') {
            Trie* node = walk(root, w);
            out += (node && node->is_end) ? "YES\\n" : "NO\\n";
        } else {
            Trie* node = walk(root, w);
            out += node ? "YES\\n" : "NO\\n";
        }
    }
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "walk() 함수 하나로 search 와 startsWith 를 공유. 차이는 단 한 줄 — search 는 is_end 추가 검사, startsWith 는 노드 도달만으로 충분.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.is_end = True

def walk(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            return None
        cur = cur.children[c]
    return cur

N = int(input())
root = TrieNode()
out = []
for _ in range(N):
    parts = input().split()
    op, w = parts[0], parts[1]
    if op == 'I':
        insert(root, w)
    elif op == 'S':
        node = walk(root, w)
        out.append("YES" if (node and node.is_end) else "NO")
    else:
        out.append("YES" if walk(root, w) else "NO")

print("\\n".join(out))
`,
      en: {
        title: "Implement Trie (insert / search / startsWith)",
        description: `Implement a trie that handles three commands.

- \`I w\` — insert word \`w\`.
- \`S w\` — print \`YES\` if \`w\` is in the trie, else \`NO\`.
- \`P w\` — print \`YES\` if any inserted word starts with prefix \`w\`, else \`NO\`.

Total N commands.

Key — \`S\` requires reaching the end AND is_end == true; \`P\` only needs to reach the end.

Source: LeetCode 208 (Implement Trie) paraphrased`,
        constraints: "1 ≤ N ≤ 50,000, length ≤ 50, lowercase",
        hints: [
          "TrieNode: children[26] + is_end.",
          "S: reach end + is_end true.",
          "P: reach end (is_end irrelevant).",
          "If a child is missing midway, both fail.",
        ],
        solutionExplanation:
          "Share a walk() helper between S and P. The only difference is the final is_end check.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 와일드카드 단어 검색 (LC 211) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-008",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "어려움",
      title: "와일드카드 검색 (\".\" 은 한 글자 매치)",
      description: `다음 두 가지 명령을 처리하라.

- \`I w\` — 단어 \`w\` 를 삽입 (영문 소문자만).
- \`S q\` — \`q\` 를 검색. \`q\` 에는 영문 소문자와 \`.\` 가 섞여 있으며, \`.\` 는 **어떤 한 글자와도 매치** 한다. 등록 단어 중 매치되는 게 있으면 \`YES\`, 없으면 \`NO\` 출력.

핵심 — \`.\` 를 만나면 **모든 자식으로 분기 (DFS)** 해서 하나라도 성공하면 true. 일반 문자는 그대로 따라감.

총 N 개의 명령.

출처: LeetCode 211 (Design Add and Search Words Data Structure)`,
      constraints: "1 ≤ N ≤ 10,000, 단어/query 길이 ≤ 25, 영문 소문자 + \".\"",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\nI bad\nI dad\nI mad\nS pad\nS .ad",
          expectedOutput: "NO\nYES",
          label: "기본 — .ad 는 bad/dad/mad 와 매치",
        },
        {
          stdin: "5\nI bad\nI dad\nI mad\nS b..\nS .a.",
          expectedOutput: "YES\nYES",
          label: "여러 .",
        },
        {
          stdin: "3\nI hello\nS he...\nS he.lo",
          expectedOutput: "YES\nYES",
          label: "중간에 .",
        },
        {
          stdin: "3\nI a\nS .\nS ..",
          expectedOutput: "YES\nNO",
          label: "길이도 정확히 맞아야 함",
        },
        {
          stdin: "3\nI cat\nS ...",
          expectedOutput: "YES",
          label: "전부 와일드카드",
        },
        {
          stdin: "4\nI cat\nI car\nS ca.\nS c.t",
          expectedOutput: "YES\nYES",
          label: "여러 매치 가능",
        },
        {
          stdin: "2\nI ab\nS .b.",
          expectedOutput: "NO",
          label: "길이 mismatch",
        },
      ],
      hints: [
        "S 가 일반 문자: 한 자식만 시도.",
        "S 가 . : 모든 자식으로 분기 (DFS) — 하나라도 매치되면 true.",
        "끝에 도달했을 때 is_end == true 여야 매치.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[26] = {nullptr};
    bool is_end = false;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) cur->children[i] = new Trie();
        cur = cur->children[i];
    }
    cur->is_end = true;
}

bool searchDFS(Trie* node, const string& q, int idx) {
    if (!node) return false;
    if (idx == (int)q.size()) return node->is_end;
    char c = q[idx];
    if (c == '.') {
        for (int i = 0; i < 26; i++) {
            if (node->children[i] && searchDFS(node->children[i], q, idx + 1)) return true;
        }
        return false;
    } else {
        int i = c - 'a';
        if (!node->children[i]) return false;
        return searchDFS(node->children[i], q, idx + 1);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N; cin >> N;
    Trie* root = new Trie();
    string out;
    for (int i = 0; i < N; i++) {
        char op; string w;
        cin >> op >> w;
        if (op == 'I') {
            insert(root, w);
        } else {
            out += searchDFS(root, w, 0) ? "YES\\n" : "NO\\n";
        }
    }
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "와일드카드 = DFS 분기. 일반 문자는 한 자식만, '.' 는 26 자식 모두 시도 — 하나라도 끝까지 매치 + is_end 이면 true. 최악 O(26^|q|) 이지만 실전에선 빠름.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.is_end = True

def search_dfs(node, q, idx):
    if node is None:
        return False
    if idx == len(q):
        return node.is_end
    c = q[idx]
    if c == '.':
        for child in node.children.values():
            if search_dfs(child, q, idx + 1):
                return True
        return False
    if c not in node.children:
        return False
    return search_dfs(node.children[c], q, idx + 1)

N = int(input())
root = TrieNode()
out = []
for _ in range(N):
    parts = input().split()
    op, w = parts[0], parts[1]
    if op == 'I':
        insert(root, w)
    else:
        out.append("YES" if search_dfs(root, w, 0) else "NO")

print("\\n".join(out))
`,
      en: {
        title: "Wildcard Word Search (\".\" matches any letter)",
        description: `Handle two commands.

- \`I w\` — insert word \`w\` (lowercase).
- \`S q\` — \`q\` may contain lowercase letters and \`.\` (matches any single letter). Print \`YES\` if any inserted word matches, else \`NO\`.

Key — on \`.\`, **branch to all children (DFS)**; on a normal letter, follow that single child.

Total N commands.

Source: LeetCode 211 (Design Add and Search Words Data Structure)`,
        constraints: "1 ≤ N ≤ 10,000, length ≤ 25, lowercase + \".\"",
        hints: [
          "Normal letter: take one child.",
          ".: branch into every child (DFS); return true if any branch succeeds.",
          "At end-of-query, the node must be is_end.",
        ],
        solutionExplanation:
          "Wildcard = DFS branching. Worst case O(26^|q|) but fast in practice with sparse children.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. XOR 최대 (binary trie) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-009",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "어려움",
      title: "두 수의 최대 XOR (Binary Trie)",
      description: `N 개의 0 이상 정수가 주어진다. 그 중 **두 수를 골라 XOR 한 최댓값** 을 출력하라.

핵심 — **이진 트라이 (자식 0, 1 두 개)** 사용:
1. 각 수를 16-bit 이진수로 트라이에 삽입 (높은 비트부터).
2. 각 수에 대해 트라이를 다시 따라가며 **반대 비트 자식이 있으면 그쪽으로** — XOR 결과의 비트가 1 이 되도록 탐욕적으로 결정.
3. 모든 수의 결과 중 최댓값.

\`A_i ≤ 65535\` 이므로 16 비트면 충분.

출처: LeetCode 421 (Maximum XOR of Two Numbers) simplified`,
      constraints: "2 ≤ N ≤ 100,000, 0 ≤ A_i ≤ 65535 (16 비트)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3\n3 10 5", expectedOutput: "15", label: "5 ^ 10 = 15" },
        { stdin: "2\n1 2", expectedOutput: "3", label: "1 ^ 2 = 3" },
        { stdin: "5\n3 10 5 25 2", expectedOutput: "28", label: "5 ^ 25 = 28" },
        { stdin: "2\n0 65535", expectedOutput: "65535", label: "최대값" },
        { stdin: "4\n0 0 0 0", expectedOutput: "0", label: "모두 0" },
        { stdin: "3\n7 7 7", expectedOutput: "0", label: "같은 수만" },
        { stdin: "2\n1 1", expectedOutput: "0", label: "같은 수 두 개" },
      ],
      hints: [
        "16 비트 이진 트라이 (자식 0, 1 두 개).",
        "수를 (1 << 15) 부터 (1 << 0) 까지 비트 분리해 삽입.",
        "각 수에 대해 트라이를 따라가며: 현재 비트가 b 면 반대 비트 (1-b) 자식이 있는지 먼저 확인 → XOR 비트 1 확보.",
        "없으면 같은 비트 자식으로. 모든 16 비트 처리 후 누적된 XOR 값이 후보.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[2] = {nullptr, nullptr};
};

const int BITS = 16;

void insert(Trie* root, int x) {
    Trie* cur = root;
    for (int i = BITS - 1; i >= 0; i--) {
        int b = (x >> i) & 1;
        if (!cur->children[b]) cur->children[b] = new Trie();
        cur = cur->children[b];
    }
}

int maxXor(Trie* root, int x) {
    Trie* cur = root;
    int res = 0;
    for (int i = BITS - 1; i >= 0; i--) {
        int b = (x >> i) & 1;
        int want = 1 - b;
        if (cur->children[want]) {
            res |= (1 << i);
            cur = cur->children[want];
        } else {
            cur = cur->children[b];
        }
    }
    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N; cin >> N;
    vector<int> a(N);
    Trie* root = new Trie();
    for (int i = 0; i < N; i++) {
        cin >> a[i];
        insert(root, a[i]);
    }
    int ans = 0;
    for (int x : a) ans = max(ans, maxXor(root, x));
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "탐욕 + binary trie — 각 비트를 높은 자리부터 결정. 반대 비트 자식이 있다면 XOR 1 을 확보하고 그쪽으로. O(N * BITS).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

class TrieNode:
    __slots__ = ('c0', 'c1')
    def __init__(self):
        self.c0 = None
        self.c1 = None

BITS = 16

def insert(root, x):
    cur = root
    for i in range(BITS - 1, -1, -1):
        b = (x >> i) & 1
        if b == 0:
            if cur.c0 is None:
                cur.c0 = TrieNode()
            cur = cur.c0
        else:
            if cur.c1 is None:
                cur.c1 = TrieNode()
            cur = cur.c1

def max_xor(root, x):
    cur = root
    res = 0
    for i in range(BITS - 1, -1, -1):
        b = (x >> i) & 1
        if b == 0:
            if cur.c1 is not None:
                res |= (1 << i)
                cur = cur.c1
            else:
                cur = cur.c0
        else:
            if cur.c0 is not None:
                res |= (1 << i)
                cur = cur.c0
            else:
                cur = cur.c1
    return res

N = int(input())
a = list(map(int, input().split()))
root = TrieNode()
for x in a:
    insert(root, x)

ans = 0
for x in a:
    v = max_xor(root, x)
    if v > ans:
        ans = v
print(ans)
`,
      en: {
        title: "Maximum XOR of Two Numbers (Binary Trie)",
        description: `Given N non-negative integers, print the **maximum XOR over any two**.

Approach — **binary trie** (children 0 and 1):
1. Insert each number bit-by-bit (high to low) into the trie.
2. For each number, walk the trie greedily preferring the **opposite** bit at each step — that makes the XOR bit 1.
3. Track the maximum.

\`A_i ≤ 65535\` so 16 bits suffice.

Source: LeetCode 421 (Maximum XOR of Two Numbers) simplified`,
        constraints: "2 ≤ N ≤ 100,000, 0 ≤ A_i ≤ 65535",
        hints: [
          "16-bit binary trie, children = [c0, c1].",
          "Insert each x from bit 15 down to 0.",
          "Query: at each bit, prefer the opposite-bit child (gives XOR=1). Fall back to same-bit if missing.",
        ],
        solutionExplanation:
          "Greedy bit-by-bit using a binary trie. O(N * BITS).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 동음이의어 처리 (case-insensitive count) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-010",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "어려움",
      title: "동음이의어 — 소문자 변환 후 카운트",
      description: `N 개의 단어가 주어진다. 대소문자가 섞여 있을 수 있다. **소문자로 통일했을 때 같은 단어** 가 등장한 횟수를 트라이에 저장한 뒤, Q 개의 query 단어 (대소문자 무관) 가 사전에 등장한 횟수를 출력하라.

예: 입력 {"Apple", "apple", "APPLE", "Banana"} → "apple" 3 회, "banana" 1 회. query "apple" → 3, query "BANANA" → 1, query "cat" → 0.

방법: insert/search 전에 모두 소문자로 변환. TrieNode 에 \`count\` 저장 (그 단어로 끝나는 횟수).

출처: 원본 (트라이 + 카운트 + normalization)`,
      constraints: "1 ≤ N, Q ≤ 10,000, 단어 길이 ≤ 50, A-Z + a-z",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 3\nApple\napple\nAPPLE\nBanana\napple\nBANANA\ncat", expectedOutput: "3\n1\n0", label: "기본" },
        { stdin: "3 2\nHello\nWORLD\nhello\nhello\nworld", expectedOutput: "2\n1", label: "각각 2 회 / 1 회" },
        { stdin: "1 1\nFoo\nFOO", expectedOutput: "1", label: "단일 단어" },
        { stdin: "5 1\na\nA\na\nA\na\nA", expectedOutput: "5", label: "동일 한 글자" },
        { stdin: "3 1\nABC\nabc\nXyz\nxyz", expectedOutput: "1", label: "xyz 만 1 회" },
        { stdin: "2 1\nfoo\nbar\nFOOBAR", expectedOutput: "0", label: "다른 단어" },
      ],
      hints: [
        "모든 입력 단어를 lowercase 로 변환 후 트라이에 삽입.",
        "TrieNode 에 int count (그 단어로 끝나는 횟수) 추가. insert 시 마지막 노드 count++.",
        "query 도 lowercase 로 변환 후 검색. 끝 노드의 count 가 답. 없으면 0.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[26] = {nullptr};
    int count = 0;
};

string toLower(string s) {
    for (char& c : s) c = tolower(c);
    return s;
}

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) cur->children[i] = new Trie();
        cur = cur->children[i];
    }
    cur->count++;
}

int searchCount(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) return 0;
        cur = cur->children[i];
    }
    return cur->count;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, Q;
    cin >> N >> Q;
    Trie* root = new Trie();
    for (int i = 0; i < N; i++) {
        string w; cin >> w;
        insert(root, toLower(w));
    }
    string out;
    for (int i = 0; i < Q; i++) {
        string w; cin >> w;
        out += to_string(searchCount(root, toLower(w))) + "\\n";
    }
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "정규화 (lowercase) + 빈도 카운트. 트라이의 count 가 set+map 보다 깔끔한 이유는 prefix 작업이 같이 쉬워지기 때문.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.count = 0

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.count += 1

def search_count(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            return 0
        cur = cur.children[c]
    return cur.count

N, Q = map(int, input().split())
root = TrieNode()
for _ in range(N):
    insert(root, input().strip().lower())
out = []
for _ in range(Q):
    out.append(str(search_count(root, input().strip().lower())))
print("\\n".join(out))
`,
      en: {
        title: "Homophones — Case-Insensitive Count",
        description: `Given N words (mixed case). Treat them as equal when lowercased. After inserting, answer Q queries (case-insensitive): how many times did this word appear?

E.g. {"Apple", "apple", "APPLE", "Banana"} → "apple" 3, "banana" 1.

Method: lowercase before insert/search. Store count on end-nodes.

Source: original (trie + count + normalization)`,
        constraints: "1 ≤ N, Q ≤ 10,000, length ≤ 50, A-Z + a-z",
        hints: [
          "Lowercase the word before inserting.",
          "Store int count on each end-node; insert bumps it.",
          "Query: lowercase then walk; the end-node count is the answer.",
        ],
        solutionExplanation:
          "Normalization (lowercase) + end-node count. Trie shines when prefix queries also need handling.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 같은 prefix 단어 그룹 개수 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-011",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "어려움",
      title: "길이 K prefix 로 그룹 — 그룹 개수",
      description: `N 개의 영문 소문자 단어와 정수 K 가 주어진다. **각 단어의 처음 K 글자** 로 그룹을 만들었을 때 (길이 < K 인 단어는 그 단어 자체가 그룹 이름) 서로 다른 그룹이 몇 개인지 출력하라.

방법 — 트라이 활용:
- 모든 단어를 트라이에 삽입.
- DFS 로 트라이를 순회: 깊이 == K 인 노드를 만나면 (그 아래는 더 안 봐도 됨) 그룹 +1.
- 깊이 < K 에서 is_end (단어 종료) 가 있고 그 노드의 자식이 없으면 → 그 단어 자체가 그룹 → +1.

예: N=5, K=3, 단어 {"apple", "app", "apricot", "banana", "ban"} → 그룹 "app", "apr", "ban" → 3.

출처: 원본 (트라이 DFS)`,
      constraints: "1 ≤ N ≤ 10,000, 1 ≤ K ≤ 50, 단어 길이 ≤ 50",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5 3\napple\napp\napricot\nbanana\nban", expectedOutput: "3", label: "app, apr, ban" },
        { stdin: "4 2\ncat\ncar\ndog\nbat", expectedOutput: "3", label: "ca, do, ba" },
        { stdin: "3 5\nhi\nhello\nworld", expectedOutput: "3", label: "단어 자체가 그룹 (hi 는 짧음)" },
        { stdin: "5 1\napple\nant\nbat\ncat\ndog", expectedOutput: "4", label: "첫 글자 a, b, c, d" },
        { stdin: "3 3\nabc\nabd\nabe", expectedOutput: "3", label: "abc, abd, abe" },
        { stdin: "4 4\nabcd\nabcd\nabcde\nabcdef", expectedOutput: "1", label: "모두 abcd 로 시작" },
        { stdin: "2 10\nshort\nlong", expectedOutput: "2", label: "둘 다 길이 < K → 각자 그룹" },
      ],
      hints: [
        "트라이에 모두 삽입 — is_end 플래그 표시.",
        "DFS (root, depth=0): depth == K → +1, 더 안 내려감.",
        "depth < K 에서 노드가 is_end 이고 자식 없음 → 단어 자체가 그룹 → +1.",
        "그 외엔 모든 자식으로 DFS 계속.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[26] = {nullptr};
    bool is_end = false;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) cur->children[i] = new Trie();
        cur = cur->children[i];
    }
    cur->is_end = true;
}

int K;

int dfs(Trie* node, int depth) {
    if (!node) return 0;
    if (depth == K) return 1;
    bool hasChild = false;
    int sum = 0;
    for (int i = 0; i < 26; i++) {
        if (node->children[i]) {
            hasChild = true;
            sum += dfs(node->children[i], depth + 1);
        }
    }
    if (node->is_end && !hasChild && depth < K) return 1;
    return sum;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N;
    cin >> N >> K;
    Trie* root = new Trie();
    for (int i = 0; i < N; i++) {
        string w; cin >> w;
        insert(root, w);
    }
    cout << dfs(root, 0) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "트라이 DFS — 깊이 K 도달 시 한 그룹 카운트 (그 아래 단어가 몇 개든 동일 prefix). 짧은 단어는 자기 자신이 그룹. 시간 O(전체 단어 길이).",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.is_end = True

N, K = map(int, input().split())
root = TrieNode()
for _ in range(N):
    insert(root, input().strip())

def dfs(node, depth):
    if depth == K:
        return 1
    has_child = bool(node.children)
    total = 0
    for child in node.children.values():
        total += dfs(child, depth + 1)
    if node.is_end and not has_child and depth < K:
        return 1
    return total

print(dfs(root, 0))
`,
      en: {
        title: "Group Words by Length-K Prefix — Count Groups",
        description: `Given N lowercase words and integer K, group words by their **first K characters** (words shorter than K become their own group). Print the number of distinct groups.

Method:
- Insert all into a trie.
- DFS the trie: hitting depth K = one group (don't descend further).
- At depth < K, an is_end node with no children = standalone group.

E.g. K=3, {"apple", "app", "apricot", "banana", "ban"} → "app", "apr", "ban" → 3.

Source: original (trie DFS)`,
        constraints: "1 ≤ N ≤ 10,000, 1 ≤ K ≤ 50, length ≤ 50",
        hints: [
          "Insert with is_end flag.",
          "DFS(node, depth): depth == K → +1, return.",
          "depth < K AND is_end AND no children → +1.",
          "Else recurse into all children.",
        ],
        solutionExplanation:
          "Trie DFS — at depth K, all descendants share the prefix and count as one group. Short words are their own group.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 가장 빈도 높은 prefix — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "atrie-012",
      cluster: "algo-trie-contest",
      unlockAfter: "algo-trie",
      difficulty: "어려움",
      title: "가장 많이 등장하는 prefix (점수 = 길이 × 등장 횟수)",
      description: `N 개의 영문 소문자 단어가 주어진다. 어떤 비어있지 않은 prefix \`p\` 의 점수를 **\`(p 의 길이) × (p 를 prefix 로 가지는 단어 수)\`** 라 정의한다. 모든 가능한 prefix 중 **점수의 최댓값** 을 출력하라.

방법:
- 트라이 삽입 시 각 노드에 \`count\` (지나가는 단어 수).
- DFS 로 트라이 전체 순회 — 각 노드에서 \`depth × count\` 최댓값 갱신 (root 제외, depth ≥ 1).

예: {"abc", "abd", "abe", "x"} → "a", "ab" 모두 3 회 → 점수 1×3=3, 2×3=6. "ab" 가 최댓값 6.

출처: 원본 (트라이 + 노드 가중치)`,
      constraints: "1 ≤ N ≤ 10,000, 단어 길이 ≤ 100, 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4\nabc\nabd\nabe\nx", expectedOutput: "6", label: "ab × 3 = 6" },
        { stdin: "3\nhello\nhelp\nheight", expectedOutput: "6", label: "he × 3 = 6 (hel × 2 = 6 동률)" },
        { stdin: "1\nhello", expectedOutput: "5", label: "단일 — 자기 자신 길이" },
        { stdin: "3\ncat\ndog\nfish", expectedOutput: "4", label: "공통 prefix 없음 — fish 자체가 1×4=4" },
        { stdin: "5\naa\naa\naa\naa\naa", expectedOutput: "10", label: "같은 단어 5번 → aa × 5 = 10" },
        { stdin: "4\nabcd\nabcd\nabc\nabc", expectedOutput: "12", label: "abc × 4 = 12 (4 단어 모두 abc 로 시작)" },
        { stdin: "2\nabcdef\nabcdef", expectedOutput: "12", label: "abcdef × 2 = 12" },
      ],
      hints: [
        "각 TrieNode 에 count (지나가는 단어 수) 저장. insert 시 따라가는 노드마다 count++.",
        "DFS 로 트라이 전체 순회. 각 노드에서 depth × count 계산 → 최댓값 갱신.",
        "root (depth=0) 은 제외 (모든 단어 카운트 되지만 길이 0).",
        "답은 long long 안전 (100 × 10,000 = 1,000,000, int 도 OK).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct Trie {
    Trie* children[26] = {nullptr};
    int count = 0;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        int i = c - 'a';
        if (!cur->children[i]) cur->children[i] = new Trie();
        cur = cur->children[i];
        cur->count++;
    }
}

long long best = 0;

void dfs(Trie* node, int depth) {
    if (!node) return;
    if (depth > 0) {
        long long score = (long long)depth * node->count;
        if (score > best) best = score;
    }
    for (int i = 0; i < 26; i++) {
        if (node->children[i]) dfs(node->children[i], depth + 1);
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N; cin >> N;
    Trie* root = new Trie();
    for (int i = 0; i < N; i++) {
        string w; cin >> w;
        insert(root, w);
    }
    dfs(root, 0);
    cout << best << "\\n";
    return 0;
}`,
      solutionExplanation:
        "각 노드 = 어떤 prefix. 점수는 depth × count — 트라이를 한 번 순회하며 모든 prefix 의 점수를 즉시 계산할 수 있다는 게 트라이의 묘미.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

class TrieNode:
    def __init__(self):
        self.children = {}
        self.count = 0

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
        cur.count += 1

N = int(input())
root = TrieNode()
for _ in range(N):
    insert(root, input().strip())

best = 0

def dfs(node, depth):
    global best
    if depth > 0:
        score = depth * node.count
        if score > best:
            best = score
    for child in node.children.values():
        dfs(child, depth + 1)

dfs(root, 0)
print(best)
`,
      en: {
        title: "Highest-Score Prefix (length × occurrence)",
        description: `Given N lowercase words, define the score of a non-empty prefix \`p\` as \`(length of p) × (number of words having p as prefix)\`. Print the **maximum score**.

Method:
- Insert with pass-through count on each node.
- DFS the trie; at each node (depth ≥ 1) update max with depth × count.

E.g. {"abc", "abd", "abe", "x"} → "ab" appears 3 times → 2×3 = 6.

Source: original (trie + node weight)`,
        constraints: "1 ≤ N ≤ 10,000, length ≤ 100, lowercase",
        hints: [
          "Pass-through count per node.",
          "DFS the trie; for each node compute depth × count.",
          "Skip root (depth 0).",
        ],
        solutionExplanation:
          "Each node represents a prefix; trie DFS computes every prefix's score in one pass.",
      },
    },
  ],
}
