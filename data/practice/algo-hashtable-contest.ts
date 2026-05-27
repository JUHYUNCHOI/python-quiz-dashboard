import type { PracticeCluster } from "./types"

export const hashTableContestCluster: PracticeCluster = {
  id: "algo-hashtable-contest",
  title: "해시테이블 문제 풀이",
  emoji: "🏆",
  description: "two-sum 변형, 부분 합 = K, 아나그램 그룹 — map/set 활용 패턴",
  unlockAfter: "algo-hashtable",
  en: {
    title: "Hash Table Practice",
    description: "two-sum variants, subarray sum = K, anagram groups",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. 두 수의 합 — 보통 (LC 1 Two Sum)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-001",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "보통",
      title: "두 수의 합",
      description: `N개의 정수와 목표값 T가 주어진다. 두 원소의 합이 정확히 T가 되는 **서로 다른 인덱스 쌍** \`(i, j)\` (0-based, \`i < j\`) 를 찾아 한 줄에 \`i j\` 형식으로 출력하라.

답이 여러 개면 **왼쪽부터 훑을 때 가장 먼저 짝이 완성되는 쌍** (즉, j 가 가장 작은 쌍) 을 출력. 답은 항상 존재한다고 가정.

핵심: O(N²) 이중 루프 대신 \`unordered_map\` 으로 **한 번 훑으면서** "T - 현재값" 이 이미 본 적 있는지 조회 — O(N).

출처: LeetCode 1 (Two Sum) paraphrased`,
      constraints: "2 ≤ N ≤ 100,000, -1,000,000,000 ≤ 각 정수, T ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 9\n2 7 11 15", expectedOutput: "0 1", label: "기본 — 2+7=9" },
        { stdin: "3 6\n3 2 4", expectedOutput: "1 2", label: "첫 원소는 답 아님" },
        { stdin: "2 6\n3 3", expectedOutput: "0 1", label: "같은 값 두 개" },
        { stdin: "5 0\n-3 4 3 90 1", expectedOutput: "0 2", label: "음수 + 양수" },
        { stdin: "5 10\n1 5 5 5 9", expectedOutput: "1 2", label: "여러 답 중 j 가장 먼저 완성되는 쌍" },
        { stdin: "4 -8\n-5 -3 -10 2", expectedOutput: "0 1", label: "음수 합" },
      ],
      hints: [
        "이중 루프는 O(N²) — N=10만이면 10^10번. TLE.",
        "각 원소 x 를 보면서 'T - x' 를 본 적이 있는지 확인하면 한 번 훑기로 충분.",
        "`unordered_map<long long, int>` 에 (값 → 인덱스) 저장. 현재 x 의 짝꿍 \`T-x\` 가 map 에 있으면 답.",
        "주의: 자기 자신을 짝꿍으로 쓰면 안 됨 — map 에 넣기 **전** 에 조회.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    long long t;
    cin >> n >> t;
    unordered_map<long long, int> seen; // 값 → 인덱스
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        long long need = t - x;
        auto it = seen.find(need);
        if (it != seen.end()) {
            cout << it->second << " " << i << "\\n";
            return 0;
        }
        // 처음 보는 값만 저장 (i 가 더 작은 인덱스 보존)
        if (!seen.count(x)) seen[x] = i;
    }
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, t = map(int, input().split())
arr = list(map(int, input().split()))
seen = {}  # 값 → 인덱스
for i, x in enumerate(arr):
    need = t - x
    if need in seen:
        print(seen[need], i)
        break
    if x not in seen:
        seen[x] = i
`,
      solutionExplanation:
        "two-sum 의 정석: 짝꿍 (T-x) 을 map 에 미리 저장한 인덱스에서 찾는다. 현재 원소를 map 에 넣기 **전** 에 조회 — 자기 자신을 짝꿍 삼는 실수 방지. 왼쪽부터 훑으며 처음 만나는 짝이 'j 가장 작은 쌍' 이라 자동으로 조건 만족.",
      en: {
        title: "Two Sum",
        description: `Given N integers and a target T, find a pair of **distinct indices** \`(i, j)\` (0-based, \`i < j\`) whose values sum to T. Print as \`i j\`.

If multiple pairs exist, print the one **whose second index j is smallest** (i.e., the first pair completed while scanning left to right). A solution is guaranteed.

Key: instead of O(N²) double loop, use \`unordered_map\` and look up "T - current" in one pass — O(N).

Source: LeetCode 1 (Two Sum) paraphrased`,
        constraints: "2 ≤ N ≤ 100,000, -1,000,000,000 ≤ each integer, T ≤ 1,000,000,000",
        hints: [
          "Double loop is O(N²) — 10^10 ops for N=100k. TLE.",
          "While scanning each x, check whether 'T - x' has been seen.",
          "Use `unordered_map<long long, int>` (value → index). If \`T-x\` is in the map, you've found the pair.",
          "Important: query the map **before** inserting x, so you can't pair x with itself.",
        ],
        solutionExplanation:
          "Classic two-sum: look up the complement (T-x) in a map of values seen so far. Query before insert so an element can't pair with itself. Scanning left to right naturally yields the pair with smallest j.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 부분 배열 합 = K — 어려움 (LC 560)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-002",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "어려움",
      title: "부분 배열 합 = K",
      description: `N개의 정수 배열과 K가 주어진다. **연속된 부분 배열** 의 합이 정확히 K가 되는 경우의 수를 출력하라.

예: \`[1, 1, 1]\`, K=2 → \`[1,1](앞)\`, \`[1,1](뒤)\` 두 가지 → 답 \`2\`.

핵심 통찰: 누적합 \`pre[i]\` 를 만들면 부분 합 = \`pre[j] - pre[i]\`. 따라서 \`pre[j] - K\` 가 이전에 몇 번 등장했는지 세면 j 에서 끝나는 답의 수. **누적합 등장 횟수를 hash map** 으로 추적.

음수가 있을 수 있어서 단순 슬라이딩 윈도우로는 안 됨 — hash 가 본질.

출처: LeetCode 560 (Subarray Sum Equals K) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ 각 정수 ≤ 10,000, -1,000,000,000 ≤ K ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 2\n1 1 1", expectedOutput: "2", label: "기본 — [1,1] 두 가지" },
        { stdin: "4 3\n1 2 3 4", expectedOutput: "2", label: "[1,2], [3]" },
        { stdin: "1 5\n5", expectedOutput: "1", label: "원소 1개 — 자기 자신" },
        { stdin: "1 5\n7", expectedOutput: "0", label: "답 없음" },
        { stdin: "5 0\n1 -1 1 -1 1", expectedOutput: "6", label: "음수 — 슬라이딩 윈도우 불가" },
        { stdin: "4 0\n0 0 0 0", expectedOutput: "10", label: "모두 0, K=0 → C(5,2) = 10 (시작점 0~4, 끝점 0~4 중 끝>=시작)" },
        { stdin: "5 7\n3 4 7 2 -3", expectedOutput: "2", label: "[3,4]=7, [7]=7 — 2개" },
      ],
      hints: [
        "부분 합 = pre[j] - pre[i] (단, i ≤ j, pre[-1]=0).",
        "각 j 에서 'pre[j] - K' 가 이전에 등장한 횟수만큼 답이 늘어난다.",
        "`unordered_map<long long, int>` 에 (누적합 → 등장 횟수) 저장. 시작 전에 \`map[0] = 1\` (빈 prefix).",
        "음수 원소가 있으니 슬라이딩 윈도우는 안 됨 — hash 가 본질적 도구.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    long long k;
    cin >> n >> k;
    unordered_map<long long, long long> cnt;
    cnt[0] = 1; // 빈 prefix
    long long pre = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        pre += x;
        auto it = cnt.find(pre - k);
        if (it != cnt.end()) ans += it->second;
        cnt[pre]++;
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
from collections import defaultdict
input = sys.stdin.readline

n, k = map(int, input().split())
arr = list(map(int, input().split()))
cnt = defaultdict(int)
cnt[0] = 1  # 빈 prefix
pre = 0
ans = 0
for x in arr:
    pre += x
    ans += cnt[pre - k]
    cnt[pre] += 1
print(ans)
`,
      solutionExplanation:
        "prefix sum + hash map 의 정석. 누적합 pre 의 등장 횟수를 추적. 현재 위치 j 에서 답이 늘어나는 건 'pre[j] - K' 와 같은 prefix 가 이전에 몇 번 있었는지. \`cnt[0]=1\` 초기화는 '0번째 prefix(빈 배열)' 처리 — 부분 배열이 0번부터 시작하는 경우.",
      en: {
        title: "Subarray Sum Equals K",
        description: `Given an array of N integers and K, count the number of **contiguous subarrays** whose sum equals K.

Example: \`[1, 1, 1]\`, K=2 → two subarrays \`[1,1]\` → answer 2.

Key insight: with prefix sums \`pre[i]\`, subarray sum = \`pre[j] - pre[i]\`. So at index j, the answer grows by the count of times \`pre[j] - K\` appeared before. Track **prefix-sum counts in a hash map**.

Because integers can be negative, sliding window doesn't work — hashing is essential.

Source: LeetCode 560 (Subarray Sum Equals K) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, -10,000 ≤ each integer ≤ 10,000, -1,000,000,000 ≤ K ≤ 1,000,000,000",
        hints: [
          "Subarray sum = pre[j] - pre[i] (i ≤ j, pre[-1]=0).",
          "At each j, the answer grows by the number of prior occurrences of 'pre[j] - K'.",
          "Use `unordered_map<long long, int>` of (prefix-sum → count). Initialize with `map[0] = 1` (empty prefix).",
          "With possibly negative values, sliding window is invalid — hashing is the right tool.",
        ],
        solutionExplanation:
          "Prefix sum + hash map. Track how many times each prefix sum has occurred. At position j, the answer grows by the count of 'pre[j] - K'. Initializing cnt[0]=1 covers subarrays starting at index 0.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 아나그램 그룹화 — 어려움 (LC 49)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-003",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "어려움",
      title: "아나그램 그룹화",
      description: `N개의 영문 소문자 단어가 주어진다. **아나그램(글자 구성이 같은 단어)** 끼리 묶어 그룹 개수를 첫 줄에, 그 다음 각 그룹을 한 줄씩 출력하라.

각 그룹 안의 단어는 **사전순 오름차순**, 그룹들 사이의 순서는 **그룹 내 첫 단어의 사전순 오름차순**.

핵심: 단어의 글자를 정렬한 문자열을 **map 의 키** 로 사용. 같은 키를 가진 단어들이 한 그룹.

출처: LeetCode 49 (Group Anagrams) paraphrased`,
      constraints: "1 ≤ N ≤ 10,000, 각 단어는 영문 소문자 1-100자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "6\neat\ntea\ntan\nate\nnat\nbat",
          expectedOutput: "3\nate eat tea\nbat\nnat tan",
          label: "기본 — 그룹 첫 단어 사전순: ate < bat < nat",
        },
        { stdin: "1\nhello", expectedOutput: "1\nhello", label: "단어 1개" },
        {
          stdin: "3\nabc\ndef\nghi",
          expectedOutput: "3\nabc\ndef\nghi",
          label: "아나그램 없음 — 첫 단어 사전순",
        },
        {
          stdin: "4\nlisten\nsilent\nenlist\ntinsel",
          expectedOutput: "1\nenlist listen silent tinsel",
          label: "모두 같은 아나그램",
        },
        {
          stdin: "5\nabc\ncba\nbac\nxyz\nzyx",
          expectedOutput: "2\nabc bac cba\nxyz zyx",
          label: "두 그룹",
        },
        {
          stdin: "4\nba\nab\ndc\ncd",
          expectedOutput: "2\nab ba\ncd dc",
          label: "키 정렬 효과 확인",
        },
      ],
      hints: [
        "각 단어를 글자 오름차순으로 정렬한 문자열이 **그룹 키**.",
        "`map<string, vector<string>>` 으로 키 → 단어 묶음. (`map` 은 키 자동 정렬, `unordered_map` 도 가능)",
        "그룹 내부를 사전순 정렬한 뒤, 그룹들을 **첫 단어** 기준으로 정렬해 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    unordered_map<string, vector<string>> groups;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        string key = w;
        sort(key.begin(), key.end());
        groups[key].push_back(w);
    }
    vector<vector<string>> gs;
    for (auto& [k, words] : groups) {
        sort(words.begin(), words.end());
        gs.push_back(words);
    }
    // 그룹 간 정렬: 그룹 내 첫 단어 사전순
    sort(gs.begin(), gs.end(), [](const vector<string>& a, const vector<string>& b) {
        return a[0] < b[0];
    });
    cout << gs.size() << "\\n";
    for (auto& group : gs) {
        for (int i = 0; i < (int)group.size(); i++) {
            if (i > 0) cout << ' ';
            cout << group[i];
        }
        cout << "\\n";
    }
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
from collections import defaultdict
input = sys.stdin.readline

n = int(input())
groups = defaultdict(list)
for _ in range(n):
    w = input().strip()
    key = ''.join(sorted(w))  # 글자 정렬한 문자열이 그룹 키
    groups[key].append(w)

gs = [sorted(words) for words in groups.values()]
# 그룹 간 정렬: 그룹 내 첫 단어 사전순
gs.sort(key=lambda g: g[0])

out = [str(len(gs))]
for g in gs:
    out.append(' '.join(g))
sys.stdout.write('\\n'.join(out) + '\\n')
`,
      solutionExplanation:
        "단어의 글자를 정렬한 문자열이 **아나그램 식별자(키)**. 같은 키 = 같은 그룹. 그 다음 두 단계 정렬: 그룹 내부 사전순, 그룹들 사이는 첫 단어 사전순. \`unordered_map\` 으로 그룹 만든 뒤 vector 로 옮겨 정렬.",
      en: {
        title: "Group Anagrams",
        description: `Given N lowercase English words, group **anagrams** (same letter multiset) together. Print the number of groups on the first line, then each group on its own line.

Within each group, words are **lex ascending**. Groups are ordered by **first word lex ascending**.

Key: the sorted-letter form of a word is its **map key**. Same key → same group.

Source: LeetCode 49 (Group Anagrams) paraphrased`,
        constraints: "1 ≤ N ≤ 10,000, each word is lowercase English 1-100 chars",
        hints: [
          "The sorted-letter string of each word is the **group key**.",
          "Use `unordered_map<string, vector<string>>` (key → words).",
          "Sort within each group, then sort groups by **first word ascending**.",
        ],
        solutionExplanation:
          "Sorted-letter form is the anagram identifier. Same key, same group. Then two layers of sorting: within-group lex ascending, between-groups by first word.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 첫 반복 글자 — 보통 (LC 387 paraphrased)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-004",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "보통",
      title: "첫 반복 글자",
      description: `영문 소문자 문자열 \`s\` 가 주어진다. 두 번 이상 등장하는 글자 중 **가장 먼저 두 번째로 등장한** 글자의 0-based 인덱스를 출력하라. 그런 글자가 없으면 \`-1\` 출력.

예: \`"abcdba"\` → \`b\` 가 1, 4 등장 — 두 번째 등장은 인덱스 4. \`a\` 는 0, 5 등장 — 두 번째는 5. → 4 가 먼저이므로 답 \`4\`.

핵심: \`map<char, int>\` 로 글자별 등장 횟수를 세면서, 어떤 글자의 count 가 처음으로 2 가 되는 순간의 인덱스가 답.

출처: BOJ 5052 simplified / LC 387 paraphrased`,
      constraints: "1 ≤ |s| ≤ 100,000, s 는 영문 소문자만",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "abcdba", expectedOutput: "4", label: "기본 — b 가 인덱스 4 에서 두 번째 등장" },
        { stdin: "abcdef", expectedOutput: "-1", label: "반복 없음" },
        { stdin: "aa", expectedOutput: "1", label: "최소 케이스" },
        { stdin: "abcabc", expectedOutput: "3", label: "a 가 3 에서 두 번째" },
        { stdin: "z", expectedOutput: "-1", label: "1글자" },
        { stdin: "abcdefghijklmnopqrstuvwxyzz", expectedOutput: "26", label: "마지막에서 처음 반복" },
      ],
      hints: [
        "글자별 등장 횟수를 세는 `unordered_map<char, int>` 또는 \`int cnt[26]\`.",
        "왼쪽부터 훑으면서 어떤 글자의 카운트가 1 → 2 가 되는 순간 즉시 답.",
        "끝까지 그런 일이 없으면 -1.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    int cnt[26] = {0};
    for (int i = 0; i < (int)s.size(); i++) {
        int c = s[i] - 'a';
        cnt[c]++;
        if (cnt[c] == 2) {
            cout << i << "\\n";
            return 0;
        }
    }
    cout << -1 << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

s = input().rstrip('\\n')
cnt = {}
for i, c in enumerate(s):
    cnt[c] = cnt.get(c, 0) + 1
    if cnt[c] == 2:
        print(i)
        sys.exit()
print(-1)
`,
      solutionExplanation:
        "각 글자의 누적 등장 횟수를 추적. 어떤 글자의 카운트가 처음으로 2 가 되는 순간의 인덱스가 답. 영문 소문자 26 종이므로 길이 26 배열로 충분 — `unordered_map` 도 똑같이 OK.",
      en: {
        title: "First Repeating Character",
        description: `Given a lowercase English string \`s\`, print the 0-based index where a character **becomes the first to be seen twice**. If no character repeats, print \`-1\`.

Example: \`"abcdba"\` → \`b\` appears at 1, 4 — its second occurrence is at index 4. \`a\` appears at 0, 5 — second at 5. So 4 wins.

Key: track per-character counts; the first time any count hits 2 is the answer.

Source: BOJ 5052 simplified / LC 387 paraphrased`,
        constraints: "1 ≤ |s| ≤ 100,000, lowercase English only",
        hints: [
          "Use `unordered_map<char, int>` or `int cnt[26]`.",
          "Walk left-to-right; the moment a count goes 1 → 2, return the current index.",
          "If never, print -1.",
        ],
        solutionExplanation:
          "Track per-character cumulative counts. The first time a count reaches 2 is the answer. Since alphabet is 26, an int[26] suffices — `unordered_map` works equivalently.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 중복 없는 가장 긴 부분 문자열 — 어려움 (LC 3)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-005",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "어려움",
      title: "중복 없는 가장 긴 부분 문자열",
      description: `영문 + 숫자로 이루어진 문자열 \`s\` 가 주어진다. **모든 글자가 서로 다른** 연속 부분 문자열 중 가장 긴 것의 **길이** 를 출력하라.

예: \`"abcabcbb"\` → 가장 긴 건 \`"abc"\` — 길이 3.

핵심: **슬라이딩 윈도우 + hash set**. 오른쪽 포인터를 한 칸씩 이동하며 set 에 추가. 중복이 생기면 왼쪽 포인터를 옮겨 중복 제거. 매 단계 \`right - left + 1\` 의 최댓값이 답.

출처: LeetCode 3 (Longest Substring Without Repeating Characters) paraphrased`,
      constraints: "0 ≤ |s| ≤ 100,000, s 는 영문 대소문자 + 숫자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "abcabcbb", expectedOutput: "3", label: "기본 — abc" },
        { stdin: "bbbbb", expectedOutput: "1", label: "전부 같은 글자" },
        { stdin: "pwwkew", expectedOutput: "3", label: "wke (kew 도 답이지만 길이만)" },
        { stdin: "", expectedOutput: "0", label: "빈 문자열" },
        { stdin: "a", expectedOutput: "1", label: "1글자" },
        { stdin: "dvdf", expectedOutput: "3", label: "vdf — left 포인터 한 번 이상 이동" },
        { stdin: "abcdefghij", expectedOutput: "10", label: "전부 다름 — 전체 길이" },
      ],
      hints: [
        "두 포인터 left, right. right 가 한 칸씩 오른쪽으로 이동.",
        "`unordered_set<char>` 에 현재 윈도우 안의 글자들 저장.",
        "s[right] 가 set 에 있으면, set 에서 s[left] 를 제거하고 left++ 를 **그 중복이 사라질 때까지** 반복.",
        "매 step 마다 right - left + 1 의 최댓값 갱신.",
        "빈 문자열 → getline 으로 읽거나 cin >> s 후 길이 0 처리.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    getline(cin, s);
    unordered_set<char> seen;
    int left = 0, ans = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        while (seen.count(s[right])) {
            seen.erase(s[left]);
            left++;
        }
        seen.insert(s[right]);
        ans = max(ans, right - left + 1);
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

s = input().rstrip('\\n')
seen = set()
left = 0
ans = 0
for right, ch in enumerate(s):
    while ch in seen:
        seen.discard(s[left])
        left += 1
    seen.add(ch)
    if right - left + 1 > ans:
        ans = right - left + 1
print(ans)
`,
      solutionExplanation:
        "슬라이딩 윈도우의 정석. 윈도우 내용을 \`unordered_set\` 으로 추적. 새로 들어오는 글자가 이미 있으면 왼쪽에서 한 칸씩 빼며 중복이 없어질 때까지 줄임. left, right 각각 최대 N 번씩만 움직이므로 O(N).",
      en: {
        title: "Longest Substring Without Repeating Characters",
        description: `Given a string \`s\` of letters/digits, print the **length** of the longest contiguous substring with **all distinct characters**.

Example: \`"abcabcbb"\` → longest is \`"abc"\`, length 3.

Key: **sliding window + hash set**. Move right one step at a time, adding to the set. When a duplicate appears, advance left until the duplicate is gone. Max window size is the answer.

Source: LeetCode 3 (Longest Substring Without Repeating Characters) paraphrased`,
        constraints: "0 ≤ |s| ≤ 100,000, letters and digits only",
        hints: [
          "Two pointers left, right. Move right one step each iteration.",
          "Use `unordered_set<char>` to track characters currently in the window.",
          "If s[right] is already in the set, remove s[left] and advance left **until the duplicate is gone**.",
          "Track max of (right - left + 1).",
          "Use getline so empty input is handled.",
        ],
        solutionExplanation:
          "Classic sliding window. The window contents are tracked in an `unordered_set`. When a new char clashes, shrink from the left until the clash disappears. Each pointer moves at most N times — O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. K 번 등장한 원소 수 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-006",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "보통",
      title: "정확히 K번 등장한 값의 수",
      description: `N개의 정수와 K가 주어진다. **정확히 K번** 등장하는 **서로 다른 값** 의 개수를 출력하라.

예: \`[1, 2, 2, 3, 3, 3]\`, K=2 → \`2\` 만 정확히 2번 등장 → 답 1.

핵심: \`unordered_map\` 으로 빈도수 집계 후, 값이 K인 것의 개수를 카운트.

출처: 원본 (LC 387 류, 카운팅 변형)`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ N, -1,000,000,000 ≤ 각 정수 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "6 2\n1 2 2 3 3 3", expectedOutput: "1", label: "기본 — 2 만" },
        { stdin: "6 1\n1 2 2 3 3 3", expectedOutput: "1", label: "K=1 — 1 만 정확히 1번" },
        { stdin: "6 3\n1 2 2 3 3 3", expectedOutput: "1", label: "K=3 — 3 만" },
        { stdin: "5 5\n7 7 7 7 7", expectedOutput: "1", label: "전부 같은 값" },
        { stdin: "5 2\n7 7 7 7 7", expectedOutput: "0", label: "조건에 맞는 값 없음" },
        { stdin: "8 2\n1 1 2 2 3 3 4 4", expectedOutput: "4", label: "모두 정확히 2번" },
        { stdin: "6 1\n-3 -3 0 5 5 -3", expectedOutput: "1", label: "음수 포함 — 0 만 정확히 1번" },
      ],
      hints: [
        "1차 패스: `unordered_map<long long, int>` 으로 (값 → 등장 횟수) 집계.",
        "2차: map 을 훑으며 횟수가 K 인 entry 의 개수.",
        "또는 STL `count_if` 로 한 줄 처리도 가능.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    unordered_map<long long, int> freq;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        freq[x]++;
    }
    int ans = 0;
    for (auto& [v, c] : freq) {
        if (c == k) ans++;
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
from collections import Counter
input = sys.stdin.readline

n, k = map(int, input().split())
arr = list(map(int, input().split()))
freq = Counter(arr)
print(sum(1 for v in freq.values() if v == k))
`,
      solutionExplanation:
        "전형적인 두 단계 패턴: (1) hash map 으로 빈도수 집계, (2) 조건을 만족하는 키 개수 카운트. \`unordered_map\` 이 \`map\` 보다 약간 빠르지만 N=10만 정도면 둘 다 OK.",
      en: {
        title: "Values Appearing Exactly K Times",
        description: `Given N integers and K, print the number of **distinct values** that appear **exactly K times**.

Example: \`[1, 2, 2, 3, 3, 3]\`, K=2 → only \`2\` appears exactly twice → answer 1.

Key: count frequencies in an \`unordered_map\`, then count keys whose value is K.

Source: original (LC 387-style counting variant)`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ N, -1,000,000,000 ≤ each integer ≤ 1,000,000,000",
        hints: [
          "Pass 1: `unordered_map<long long, int>` of (value → count).",
          "Pass 2: scan the map and count entries with count == K.",
          "Or use STL `count_if` for a one-liner.",
        ],
        solutionExplanation:
          "Two-phase: (1) hash map for frequencies, (2) count keys whose value equals K. `unordered_map` is slightly faster than `map`; both work fine for N=100k.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 두 배열 교집합 II — 보통 (LC 350)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-007",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "보통",
      title: "두 배열의 교집합 (중복 포함)",
      description: `두 배열 A (크기 N), B (크기 M) 이 주어진다. **두 배열 모두에 등장하는 원소들을 중복도 함께** 출력하라 — 즉 어떤 값 x 가 A 에 3 번, B 에 2 번 나오면 결과에 2 번 등장한다 (min(3,2)=2).

결과는 **오름차순** 으로 한 줄에 공백 구분.

핵심: 한 쪽 배열을 \`unordered_map<int,int>\` 로 빈도수 집계, 다른 쪽을 훑으며 cnt > 0 이면 출력 리스트에 추가 + cnt 감소.

출처: LeetCode 350 (Intersection of Two Arrays II) paraphrased`,
      constraints: "1 ≤ N, M ≤ 100,000, -1,000,000,000 ≤ 각 정수 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3\n1 2 2\n4\n2 2 3 1",
          expectedOutput: "1 2 2",
          label: "기본 — 2 가 양쪽에 2 번 이상 → 2 두 번",
        },
        {
          stdin: "4\n4 9 5 4\n3\n9 4 9",
          expectedOutput: "4 9",
          label: "4 는 A 에 2 번 B 에 1 번 → 1 번",
        },
        { stdin: "3\n1 2 3\n3\n4 5 6", expectedOutput: "", label: "교집합 없음 — 빈 줄" },
        { stdin: "1\n7\n1\n7", expectedOutput: "7", label: "양쪽 1개" },
        {
          stdin: "5\n5 5 5 5 5\n3\n5 5 5",
          expectedOutput: "5 5 5",
          label: "min(5, 3) = 3 번",
        },
        {
          stdin: "4\n-3 0 3 3\n5\n-5 -3 0 3 9",
          expectedOutput: "-3 0 3",
          label: "음수 + 중복",
        },
      ],
      hints: [
        "한 쪽(예: A) 을 `unordered_map<long long, int>` 으로 빈도수 집계.",
        "다른 쪽(B) 을 훑으며 cnt > 0 이면 결과에 추가하고 cnt 1 감소.",
        "결과를 정렬해 출력. 빈 결과는 빈 줄.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n;
    unordered_map<long long, int> cnt;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        cnt[x]++;
    }
    cin >> m;
    vector<long long> result;
    for (int i = 0; i < m; i++) {
        long long x;
        cin >> x;
        auto it = cnt.find(x);
        if (it != cnt.end() && it->second > 0) {
            result.push_back(x);
            it->second--;
        }
    }
    sort(result.begin(), result.end());
    for (int i = 0; i < (int)result.size(); i++) {
        if (i > 0) cout << ' ';
        cout << result[i];
    }
    cout << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
from collections import Counter
input = sys.stdin.readline

n = int(input())
A = list(map(int, input().split()))
m = int(input())
B = list(map(int, input().split()))

cnt = Counter(A)  # 한 쪽을 빈도수 집계
result = []
for x in B:
    if cnt[x] > 0:
        result.append(x)
        cnt[x] -= 1  # 재사용 방지
result.sort()
print(' '.join(map(str, result)))
`,
      solutionExplanation:
        "multiset 교집합 패턴: 한 쪽을 hash map 으로 빈도 집계, 다른 쪽을 훑으며 cnt 가 양수일 때만 매칭 + cnt-- (재사용 방지). 양쪽 다 정렬 후 two-pointer 로도 가능하지만 hash 가 더 직관적.",
      en: {
        title: "Intersection of Two Arrays (with multiplicity)",
        description: `Given arrays A (size N) and B (size M), print elements that appear in both, **with multiplicity** — if x appears 3× in A and 2× in B, it appears 2× in the result (min count).

Output is **ascending**, space-separated.

Key: count one side in an \`unordered_map<int,int>\`; walk the other side and emit + decrement whenever the count is positive.

Source: LeetCode 350 (Intersection of Two Arrays II) paraphrased`,
        constraints: "1 ≤ N, M ≤ 100,000, -1,000,000,000 ≤ each integer ≤ 1,000,000,000",
        hints: [
          "Count one side (say A) in `unordered_map<long long, int>`.",
          "Walk B; whenever cnt > 0, append to the result and decrement cnt.",
          "Sort the result. Empty result is an empty line.",
        ],
        solutionExplanation:
          "Multiset intersection pattern: hash-count one side, then walk the other side emitting + decrementing on positive count. Two-pointer-after-sort works too; hashing is more direct.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 같은 글자 빈도 부분 문자열 쌍 — 어려움 (signature hash)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-008",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "어려움",
      title: "글자 구성이 같은 부분 문자열 쌍",
      description: `영문 소문자 문자열 \`s\` 와 길이 \`L\` 이 주어진다. 길이가 정확히 \`L\` 인 모든 부분 문자열 중에서, **글자 구성(아나그램)** 이 같은 **서로 다른 위치의 쌍** \`(i, j)\` (\`i < j\`) 의 개수를 출력하라.

예: \`s = "abab"\`, L=2 → 부분 문자열들: "ab", "ba", "ab". 글자 구성 \`{a,b}\` 가 모두 같음 → 쌍은 (0,1), (0,2), (1,2) — 3쌍.

핵심: 각 길이-L 윈도우의 **글자 빈도 시그니처(sorted 26-tuple)** 를 키로 \`unordered_map<string,int>\` 에 등장 횟수 기록. 그룹 크기가 k 이면 \`k*(k-1)/2\` 쌍 기여.

시그니처는 길이 26 string 으로 표현하면 빠르고 안전.

출처: 원본 (LC 1224 류 단순화, signature hash 연습)`,
      constraints: "1 ≤ L ≤ |s| ≤ 100,000, s 는 영문 소문자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "abab\n2", expectedOutput: "3", label: "기본 — ab/ba/ab 동일 시그니처, C(3,2)=3" },
        { stdin: "abcd\n1", expectedOutput: "0", label: "전부 다른 글자, 길이 1 — 0 쌍" },
        { stdin: "aaaa\n2", expectedOutput: "3", label: "aa 가 3 번 — C(3,2)=3" },
        { stdin: "abcabc\n3", expectedOutput: "6", label: "윈도우 4개 모두 {a,b,c} 시그니처 동일 → C(4,2)=6" },
        { stdin: "ab\n2", expectedOutput: "0", label: "윈도우 1개 — 쌍 없음" },
        { stdin: "aabbaa\n2", expectedOutput: "2", label: "윈도우: aa,ab,bb,ba,aa — aa×2(쌍1), ab/ba 시그동일×2(쌍1) → 합 2" },
        { stdin: "abcba\n3", expectedOutput: "1", label: "abc, bcb, cba: abc 와 cba 시그니처 동일 → 1 쌍" },
      ],
      hints: [
        "각 길이-L 윈도우의 글자별 카운트를 26 길이 배열로 — 슬라이딩 윈도우로 O(N).",
        "그 배열을 string 으로 변환하면 hash map 의 키가 된다 (문자 그대로 string 비교).",
        "`unordered_map<string,int>` 에 시그니처 등장 횟수 집계.",
        "마지막에 각 그룹의 \`k*(k-1)/2\` 합산.",
        "오버플로우 주의 — k 최대 10만 → \`k*(k-1)/2\` 최대 5*10^9, long long 필요.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    int L;
    cin >> s >> L;
    int n = s.size();
    unordered_map<string, long long> cnt;
    if (L > n) { cout << 0 << "\\n"; return 0; }

    int freq[26] = {0};
    for (int i = 0; i < L; i++) freq[s[i] - 'a']++;

    auto sig = [&]() {
        string r(26, '\\0');
        for (int c = 0; c < 26; c++) r[c] = (char)freq[c];
        return r;
    };

    cnt[sig()]++;
    for (int i = L; i < n; i++) {
        freq[s[i] - 'a']++;
        freq[s[i - L] - 'a']--;
        cnt[sig()]++;
    }
    long long ans = 0;
    for (auto& [k, v] : cnt) ans += v * (v - 1) / 2;
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
from collections import defaultdict
input = sys.stdin.readline

s = input().strip()
L = int(input())
n = len(s)
if L > n:
    print(0)
    sys.exit()

freq = [0] * 26
for i in range(L):
    freq[ord(s[i]) - 97] += 1

cnt = defaultdict(int)
cnt[tuple(freq)] += 1  # tuple 을 dict 키로 사용 (26 길이 시그니처)
for i in range(L, n):
    freq[ord(s[i]) - 97] += 1
    freq[ord(s[i - L]) - 97] -= 1
    cnt[tuple(freq)] += 1

ans = 0
for v in cnt.values():
    ans += v * (v - 1) // 2
print(ans)
`,
      solutionExplanation:
        "슬라이딩 윈도우 + signature hash 패턴. (1) 길이 L 첫 윈도우의 글자 빈도 26-array 구성. (2) 한 칸씩 밀며 양 끝만 갱신 — O(N). (3) 매 윈도우의 빈도 배열을 26 글자 string 으로 직렬화해 hash key 로 사용. 같은 시그니처 그룹 k 개 → \`k(k-1)/2\` 쌍. \`signature()\` 마다 string 새로 만드는 비용은 O(26) 상수.",
      en: {
        title: "Equal-Character-Frequency Substring Pairs",
        description: `Given a lowercase string \`s\` and length \`L\`, count the number of **pairs of distinct positions** \`(i, j)\` (\`i < j\`) such that the length-L substrings at those positions are **anagrams** of each other.

Example: \`s = "abab"\`, L=2 → substrings "ab", "ba", "ab". All have the same letter multiset → 3 pairs.

Key: each window's **letter-frequency signature** (a 26-byte string) is a hash key. If a signature appears k times, it contributes \`k*(k-1)/2\` pairs.

Source: original (LC 1224-style, signature-hash practice)`,
        constraints: "1 ≤ L ≤ |s| ≤ 100,000, lowercase English",
        hints: [
          "Maintain a length-26 frequency array via sliding window — O(N).",
          "Convert that array into a string and use it as a hash key.",
          "Aggregate signature counts in `unordered_map<string,int>`.",
          "Sum `k*(k-1)/2` over all signature groups.",
          "Use long long — k can reach 10^5 so the sum can hit 5×10^9.",
        ],
        solutionExplanation:
          "Sliding window + signature hash. (1) Build the 26-array for the first window. (2) Slide one step at a time updating only the entering/leaving char — O(N). (3) Serialize the array to a 26-byte string and bucket counts. For each group of size k, add k(k-1)/2.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 유효한 스도쿠 — 어려움 (LC 36)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-009",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "어려움",
      title: "유효한 스도쿠 보드",
      description: `9×9 스도쿠 보드가 주어진다 (한 칸은 \`1\`-\`9\` 또는 빈칸 \`.\`). 다음 세 조건을 모두 만족하면 \`YES\`, 하나라도 어기면 \`NO\` 출력.

1. 각 행에 1-9 가 중복 없이
2. 각 열에 1-9 가 중복 없이
3. 9 개의 3×3 박스 각각에 1-9 가 중복 없이

빈칸은 무시. 완성 여부는 검사 안 함 — **현재까지 채워진 숫자에 모순이 없는지** 만 본다.

핵심: 행/열/박스 각각 9 개씩 27 개의 \`unordered_set<char>\` — 새 숫자를 넣을 때 이미 있으면 NO.

입력: 9 줄, 각 줄에 9 글자 (공백 없음).

출처: LeetCode 36 (Valid Sudoku) paraphrased`,
      constraints: "9×9 보드, 각 칸은 '1'~'9' 또는 '.'",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79",
          expectedOutput: "YES",
          label: "기본 — LC 36 예제 (유효)",
        },
        {
          stdin: "83..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79",
          expectedOutput: "NO",
          label: "왼쪽 위 박스에 8 중복",
        },
        {
          stdin: ".........\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........",
          expectedOutput: "YES",
          label: "전부 빈칸",
        },
        {
          stdin: "1........\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n........1",
          expectedOutput: "YES",
          label: "두 1 이 다른 행/열/박스",
        },
        {
          stdin: "1........\n1........\n.........\n.........\n.........\n.........\n.........\n.........\n.........",
          expectedOutput: "NO",
          label: "같은 열에 1 중복",
        },
        {
          stdin: "11.......\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........",
          expectedOutput: "NO",
          label: "같은 행에 1 중복",
        },
      ],
      hints: [
        "행/열/박스 각각 9개의 `unordered_set<char>` — 총 27개 set.",
        "박스 인덱스: `(r/3) * 3 + (c/3)`.",
        "각 칸 (r, c) 의 문자 d 가 1-9 면 row[r], col[c], box[boxId] 셋에 모두 `insert`. 중복 발견 즉시 NO.",
        "set 대신 `bool seen[9][9]` 3 개로도 가능 (메모리 절약).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    vector<string> board(9);
    for (int i = 0; i < 9; i++) cin >> board[i];

    unordered_set<char> rows[9], cols[9], boxes[9];
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            char d = board[r][c];
            if (d == '.') continue;
            int b = (r / 3) * 3 + (c / 3);
            if (rows[r].count(d) || cols[c].count(d) || boxes[b].count(d)) {
                cout << "NO\\n";
                return 0;
            }
            rows[r].insert(d);
            cols[c].insert(d);
            boxes[b].insert(d);
        }
    }
    cout << "YES\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

board = [input().rstrip('\\n') for _ in range(9)]
rows = [set() for _ in range(9)]
cols = [set() for _ in range(9)]
boxes = [set() for _ in range(9)]

for r in range(9):
    for c in range(9):
        d = board[r][c]
        if d == '.':
            continue
        b = (r // 3) * 3 + (c // 3)
        if d in rows[r] or d in cols[c] or d in boxes[b]:
            print("NO")
            sys.exit()
        rows[r].add(d)
        cols[c].add(d)
        boxes[b].add(d)
print("YES")
`,
      solutionExplanation:
        "각 행/열/박스에 들어간 숫자를 27 개의 hash set 으로 추적. 어느 set 에 이미 있는 숫자가 또 들어오면 모순 → NO. 박스 인덱스는 `(r/3)*3 + (c/3)` 정수 공식. 빈칸 `.` 은 그냥 skip.",
      en: {
        title: "Valid Sudoku",
        description: `Given a 9×9 Sudoku board (each cell is \`1\`-\`9\` or \`.\` for empty), print \`YES\` iff:

1. Each row contains 1-9 with no repeats
2. Each column contains 1-9 with no repeats
3. Each of the nine 3×3 boxes contains 1-9 with no repeats

Empty cells are ignored. We don't check completeness — only that filled cells are consistent.

Key: 27 \`unordered_set<char>\` (9 rows + 9 cols + 9 boxes). Inserting a digit twice into any of them → NO.

Input: 9 lines, each with 9 characters (no spaces).

Source: LeetCode 36 (Valid Sudoku) paraphrased`,
        constraints: "9×9 board, each cell is '1'-'9' or '.'",
        hints: [
          "Nine sets per axis (rows/cols/boxes) — 27 sets total.",
          "Box index: `(r/3) * 3 + (c/3)`.",
          "For each digit cell, insert into row, col, and box sets. Any collision → NO.",
          "`bool seen[9][9]` arrays also work.",
        ],
        solutionExplanation:
          "Track digits seen in each row/col/box with 27 hash sets. A re-insertion is a contradiction. Box index `(r/3)*3 + (c/3)`. Skip `.`",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 숫자 카드 게임 — 보통 (BOJ 10816 paraphrased)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-010",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "보통",
      title: "숫자 카드 — 빈도수 조회",
      description: `N장의 카드(정수)와 M개의 질문이 주어진다. 각 질문 카드 x 가 N장 중 **정확히 몇 번** 등장하는지 한 줄에 공백으로 구분해 출력하라.

이중 루프(질문 × 카드)는 N*M 최대 10^10 으로 TLE. \`unordered_map\` 으로 미리 빈도수를 모은 뒤 각 질문을 O(1) 조회.

출처: BOJ 10816 paraphrased`,
      constraints: "1 ≤ N, M ≤ 500,000, -10,000,000 ≤ 각 정수 ≤ 10,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "10\n6 3 2 10 10 10 -10 -10 7 3\n8\n10 9 -5 2 3 4 5 -10",
          expectedOutput: "3 0 0 1 2 0 0 2",
          label: "기본 — BOJ 10816 예제",
        },
        { stdin: "1\n5\n1\n5", expectedOutput: "1", label: "1장 1질문" },
        { stdin: "1\n5\n1\n3", expectedOutput: "0", label: "찾을 카드 없음" },
        {
          stdin: "5\n7 7 7 7 7\n3\n7 8 7",
          expectedOutput: "5 0 5",
          label: "전부 같은 값",
        },
        {
          stdin: "5\n-1 0 1 -1 0\n3\n0 -1 1",
          expectedOutput: "2 2 1",
          label: "음수 + 0",
        },
      ],
      hints: [
        "이중 루프 금지 — \`unordered_map<long long, int>\` 으로 빈도수 먼저 집계.",
        "각 질문 x 에 대해 map 조회 — 없으면 0, 있으면 그 값.",
        "출력 buffer 크기 신경 — \`ios::sync_with_stdio(false)\` 권장.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    unordered_map<long long, int> cnt;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        cnt[x]++;
    }
    int m;
    cin >> m;
    for (int i = 0; i < m; i++) {
        long long q;
        cin >> q;
        if (i > 0) cout << ' ';
        auto it = cnt.find(q);
        cout << (it != cnt.end() ? it->second : 0);
    }
    cout << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
from collections import Counter
input = sys.stdin.readline

n = int(input())
cards = list(map(int, input().split()))
m = int(input())
queries = list(map(int, input().split()))

cnt = Counter(cards)  # 빈도수 먼저 집계
print(' '.join(str(cnt.get(q, 0)) for q in queries))
`,
      solutionExplanation:
        "정석적인 hash map 활용: 한 번 빈도수 집계 후 각 질문 O(1) 조회. N*M = 2.5×10^11 짜리 이중 루프를 N+M 으로 줄이는 게 hash map 의 진가.",
      en: {
        title: "Number Card — Frequency Queries",
        description: `Given N cards (integers) and M queries, print how many times each queried value appears among the N cards, space-separated.

A double loop is N*M up to 10^10 — TLE. Build an \`unordered_map\` of counts up front, then answer each query in O(1).

Source: BOJ 10816 paraphrased`,
        constraints: "1 ≤ N, M ≤ 500,000, -10,000,000 ≤ each integer ≤ 10,000,000",
        hints: [
          "Avoid the double loop — build `unordered_map<long long, int>` of counts first.",
          "Each query: look up in the map (0 if missing).",
          "Use fast I/O.",
        ],
        solutionExplanation:
          "Classic hash-map use: count once, then O(1) lookups. Turns a 2.5×10^11 double loop into N+M.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 포켓몬 마스터 — 보통 (BOJ 1620 paraphrased)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-011",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "보통",
      title: "포켓몬 도감 — 양방향 조회",
      description: `N마리의 포켓몬 이름이 1번부터 N번까지 순서대로 주어진다. 그 후 M개의 질문이 주어진다.

각 질문은:
- **정수** 면: 해당 번호의 포켓몬 이름 출력
- **문자열** 이면: 해당 이름의 포켓몬 번호 출력

핵심: 단방향이 아닌 **양방향** 조회. \`unordered_map<string,int>\` (이름→번호) + \`vector<string>\` (번호→이름) 두 가지 자료구조 동시 사용.

질문이 숫자인지 문자열인지 구분은 첫 글자가 숫자인지로 판단 (이름은 알파벳 시작 보장).

출처: BOJ 1620 paraphrased`,
      constraints: "1 ≤ N, M ≤ 100,000, 이름은 알파벳 1-20자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "26 5\nBulbasaur\nIvysaur\nVenusaur\nCharmander\nCharmeleon\nCharizard\nSquirtle\nWartortle\nBlastoise\nCaterpie\nMetapod\nButterfree\nWeedle\nKakuna\nBeedrill\nPidgey\nPidgeotto\nPidgeot\nRattata\nRaticate\nSpearow\nFearow\nEkans\nArbok\nPikachu\nRaichu\n25\nRaichu\n3\n1\nBulbasaur",
          expectedOutput: "Pikachu\n26\nVenusaur\nBulbasaur\n1",
          label: "기본 — BOJ 1620 예제",
        },
        {
          stdin: "1 2\nMew\n1\nMew",
          expectedOutput: "Mew\n1",
          label: "1마리, 양방향 1번씩",
        },
        {
          stdin: "3 3\nAaa\nBbb\nCcc\n2\n3\nAaa",
          expectedOutput: "Bbb\nCcc\n1",
          label: "기본 조회",
        },
        {
          stdin: "2 4\nApple\nBanana\nApple\n2\n1\nBanana",
          expectedOutput: "1\nBanana\nApple\n2",
          label: "다양한 순서",
        },
      ],
      hints: [
        "양방향 → 두 자료구조: `vector<string>` (인덱스 0=1번 → 이름), `unordered_map<string,int>` (이름 → 번호).",
        "질문이 숫자인지 문자열인지: `isdigit(q[0])` 로 구분.",
        "숫자라면 `stoi(q) - 1` 로 vector 조회, 문자열이면 map 조회.",
        "출력 끝마다 `\\n` — 한 질문당 한 줄.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;
    vector<string> idxToName(n);
    unordered_map<string, int> nameToIdx;
    for (int i = 0; i < n; i++) {
        cin >> idxToName[i];
        nameToIdx[idxToName[i]] = i + 1; // 1-based
    }
    for (int i = 0; i < m; i++) {
        string q;
        cin >> q;
        if (isdigit(q[0])) {
            int idx = stoi(q) - 1;
            cout << idxToName[idx] << "\\n";
        } else {
            cout << nameToIdx[q] << "\\n";
        }
    }
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
idx_to_name = []
name_to_idx = {}
for i in range(n):
    name = input().strip()
    idx_to_name.append(name)
    name_to_idx[name] = i + 1  # 1-based

out = []
for _ in range(m):
    q = input().strip()
    if q[0].isdigit():
        out.append(idx_to_name[int(q) - 1])
    else:
        out.append(str(name_to_idx[q]))
sys.stdout.write('\\n'.join(out) + '\\n')
`,
      solutionExplanation:
        "양방향 조회는 **두 개의 자료구조** — vector (번호→이름) 와 map (이름→번호) — 를 함께 유지하는 게 정석. \`isdigit\` 한 글자로 질문 유형 분기. 두 자료구조 모두 O(1) 조회.",
      en: {
        title: "Pokémon Dex — Two-Way Lookup",
        description: `N Pokémon names are given for indices 1..N. Then M queries follow.

Each query is either:
- An **integer** → print the name at that index
- A **string** → print the index of that name

Key: **two-way** lookup, so keep both \`unordered_map<string,int>\` (name→idx) and \`vector<string>\` (idx→name).

Distinguish numeric vs string queries by checking the first character (names guaranteed to start with a letter).

Source: BOJ 1620 paraphrased`,
        constraints: "1 ≤ N, M ≤ 100,000, names are alphabetic 1-20 chars",
        hints: [
          "Two-way lookup needs two structures: `vector<string>` and `unordered_map<string,int>`.",
          "Use `isdigit(q[0])` to branch.",
          "Numeric → `stoi(q) - 1` into the vector. String → map lookup.",
          "Print one answer per line.",
        ],
        solutionExplanation:
          "Two-way lookup = vector (idx→name) + map (name→idx). `isdigit` on the first char branches the query type. O(1) lookups both ways.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 두 합이 0 인 쌍 카운트 — 어려움 (LC 1 변형)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "ahash-012",
      cluster: "algo-hashtable-contest",
      unlockAfter: "algo-hashtable",
      difficulty: "어려움",
      title: "두 수의 합이 0 — 모든 쌍 개수",
      description: `N개의 정수가 주어진다. **인덱스 \`i < j\`** 이고 \`v[i] + v[j] == 0\` 인 쌍의 **개수** 를 출력하라.

예: \`[1, -1, 2, -2, 0, 0]\` → (1,-1) 1쌍, (2,-2) 1쌍, (0,0) 1쌍 = 3 쌍.

핵심 (LC 1 의 카운팅 변형):
- 값 → 등장 횟수 \`unordered_map\` 으로 집계.
- 양수 v 에 대해 \`-v\` 의 등장 횟수만큼 쌍 추가 (단, 한 쪽만 훑기 — 중복 카운트 방지).
- 0 은 특별 처리 — \`cnt[0]\` 이 k 면 \`k*(k-1)/2\` 쌍 기여.

오버플로우: 답은 \`N*(N-1)/2\` 이하 = 5×10^9 — \`long long\` 필수.

출처: LC 1 (Two Sum) 변형 (pair counting)`,
      constraints: "1 ≤ N ≤ 100,000, -1,000,000,000 ≤ 각 정수 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "6\n1 -1 2 -2 0 0", expectedOutput: "3", label: "기본 — 3쌍" },
        { stdin: "1\n0", expectedOutput: "0", label: "1개 — 쌍 불가" },
        { stdin: "4\n0 0 0 0", expectedOutput: "6", label: "0 4개 → C(4,2)=6" },
        { stdin: "2\n1 1", expectedOutput: "0", label: "쌍 없음" },
        { stdin: "5\n3 -3 3 -3 3", expectedOutput: "6", label: "3 이 3 번, -3 이 2 번 → 3*2=6" },
        { stdin: "4\n5 5 -5 -5", expectedOutput: "4", label: "5 두 번, -5 두 번 → 2*2=4" },
        { stdin: "5\n-2 -1 0 1 2", expectedOutput: "2", label: "(-2,2), (-1,1)" },
      ],
      hints: [
        "1차: `unordered_map<long long, long long>` 으로 각 값의 등장 횟수 집계.",
        "0 그룹: cnt[0] 이 k 면 \`k*(k-1)/2\` 쌍.",
        "양수 v > 0: \`cnt[v] * cnt[-v]\` 쌍. (음수 v 까지 또 세면 두 번 카운트 — v>0 만 훑기)",
        "답 최대 \`N*(N-1)/2\` = 5×10^9 — long long 필수.",
        "\`v[i]+v[j]==0\` 의 두 값이 같으려면 0 뿐 — 따라서 \`v*-v\` 곱셈 방식이 깔끔.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    unordered_map<long long, long long> cnt;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        cnt[x]++;
    }
    long long ans = 0;
    // 0 끼리는 C(k, 2)
    auto it0 = cnt.find(0);
    if (it0 != cnt.end()) {
        long long k = it0->second;
        ans += k * (k - 1) / 2;
    }
    // 양수 v 와 -v 는 v>0 쪽만 훑어 곱셈
    for (auto& [v, c] : cnt) {
        if (v <= 0) continue;
        auto it = cnt.find(-v);
        if (it != cnt.end()) ans += c * it->second;
    }
    cout << ans << "\\n";
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

`,
      pySolutionCode: `import sys
from collections import Counter
input = sys.stdin.readline

n = int(input())
arr = list(map(int, input().split()))
cnt = Counter(arr)

ans = 0
# 0 끼리는 C(k, 2) — Python int 는 자동 big int, 오버플로우 걱정 없음
if 0 in cnt:
    k = cnt[0]
    ans += k * (k - 1) // 2
# 양수 v 와 -v 는 v>0 쪽만 훑어 곱셈 (중복 카운트 방지)
for v, c in cnt.items():
    if v <= 0:
        continue
    if -v in cnt:
        ans += c * cnt[-v]
print(ans)
`,
      solutionExplanation:
        "two-sum 의 **카운팅** 변형: 인덱스 쌍이 아니라 개수를 구함. 핵심 트릭은 (1) 0 은 자기 자신과 짝이므로 C(k,2), (2) 양수 v 와 음수 -v 는 곱셈 한 번씩만 — \`v>0\` 만 훑어서 중복 카운트 방지. long long 잊으면 5×10^9 에서 오버플로우.",
      en: {
        title: "Two-Sum-to-Zero — Pair Count",
        description: `Given N integers, count the pairs of indices \`i < j\` with \`v[i] + v[j] == 0\`.

Example: \`[1, -1, 2, -2, 0, 0]\` → 1 pair of (1,-1), 1 of (2,-2), 1 of (0,0) = 3 pairs.

Key (counting variant of LC 1):
- Hash-count values in \`unordered_map\`.
- Zero is special — \`cnt[0]\` of k contributes \`k*(k-1)/2\`.
- For each v > 0, add \`cnt[v] * cnt[-v]\` (scan only positives to avoid double-counting).

Overflow: answer can reach \`N*(N-1)/2\` = 5×10^9 — \`long long\` required.

Source: LC 1 (Two Sum) variant (pair counting)`,
        constraints: "1 ≤ N ≤ 100,000, -1,000,000,000 ≤ each integer ≤ 1,000,000,000",
        hints: [
          "Count values in `unordered_map<long long, long long>`.",
          "Zeros contribute `k*(k-1)/2` pairs.",
          "For v > 0, add `cnt[v] * cnt[-v]`.",
          "Use long long — answer up to 5×10^9.",
          "Equal pair v == -v only happens at v=0; that's why we special-case zero.",
        ],
        solutionExplanation:
          "Pair-counting twist on two-sum. Special-case zero with C(k,2). For each positive v, multiply cnt[v] * cnt[-v]. Scanning only positives avoids double counting. long long mandatory.",
      },
    },
  ],
}
