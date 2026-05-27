import type { PracticeCluster } from "./types"

export const sortingContestCluster: PracticeCluster = {
  id: "algo-sorting-contest",
  title: "정렬 문제 풀이",
  emoji: "🏆",
  description: "백준 Silver / LeetCode Medium 급 — 단순 sort() 한 줄 넘어 사고력 필요",
  unlockAfter: "algo-sorting",
  en: {
    title: "Sorting Practice",
    description: "BOJ Silver / LeetCode Medium — beyond one-line sort()",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. K번째 작은 수 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-001",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "보통",
      title: "K번째 작은 수",
      description: `N개의 정수와 K가 주어진다. 정렬했을 때 K번째(1-based)로 작은 값을 출력하라.

중복이 있어도 자리 그대로 센다. 예를 들어 \`[1, 1, 3]\` 의 2번째 작은 수는 1.

출처: LeetCode 215 (Kth Largest Element) paraphrased — k번째 작은 쪽으로 변형`,
      constraints: "1 ≤ K ≤ N ≤ 100,000, -1,000,000,000 ≤ 각 정수 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5 3\n5 3 1 4 2", expectedOutput: "3", label: "기본" },
        { stdin: "1 1\n42", expectedOutput: "42", label: "원소 1개" },
        { stdin: "5 1\n5 3 1 4 2", expectedOutput: "1", label: "최솟값 (K=1)" },
        { stdin: "5 5\n5 3 1 4 2", expectedOutput: "5", label: "최댓값 (K=N)" },
        { stdin: "6 2\n7 7 3 3 1 1", expectedOutput: "1", label: "중복 — 같은 값 두 번 셈" },
        { stdin: "10 7\n-3 5 -1 0 5 -3 8 1 2 4", expectedOutput: "4", label: "음수 + 중복" },
      ],
      hints: [
        "K번째 작은 수는 오름차순 정렬 후 0-based 인덱스 K-1에 있다.",
        "중복도 그대로 자리를 차지한다 — `unique` 같은 건 쓰면 안 된다.",
        "N이 10만이지만 O(N log N) sort 면 충분히 빠르다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    vector<long long> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    cout << v[k - 1] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "오름차순 정렬 후 v[K-1] 이 K번째 작은 값. nth_element 로 O(N) 도 가능하지만 sort 가 더 직관적이고 N≤10만이면 충분히 빠르다.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
v = list(map(int, input().split()))
v.sort()
print(v[k - 1])
`,
      en: {
        title: "K-th Smallest Element",
        description: `Given N integers and K, print the K-th smallest value (1-based) after sorting.

Duplicates count toward the position. For example, the 2nd smallest of \`[1, 1, 3]\` is 1.

Source: LeetCode 215 (Kth Largest Element) paraphrased — flipped to smallest`,
        constraints: "1 ≤ K ≤ N ≤ 100,000, -1,000,000,000 ≤ each integer ≤ 1,000,000,000",
        hints: [
          "After sorting ascending, the K-th smallest is at 0-based index K-1.",
          "Duplicates still take up positions — do not deduplicate.",
          "N up to 100,000 — O(N log N) sort is plenty fast.",
        ],
        solutionExplanation:
          "Sort ascending, then v[K-1] is the answer. nth_element gives O(N) but sort is more intuitive and fast enough for N ≤ 100,000.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 단어 정렬 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-002",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "보통",
      title: "단어 정렬",
      description: `N개의 단어를 다음 규칙으로 정렬해 출력하라.

1. 짧은 길이가 먼저
2. 길이가 같으면 사전순(알파벳 오름차순)
3. **같은 단어는 중복 제거**

각 단어를 한 줄에 하나씩 출력.

출처: BOJ 1181 paraphrased`,
      constraints: "1 ≤ N ≤ 20,000, 각 단어는 영문 소문자 1-50자",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\nim\nno\nnim\ngo\nim",
          expectedOutput: "go\nim\nno\nnim",
          label: "기본 — 길이 같으면 사전순",
        },
        {
          stdin: "1\nhello",
          expectedOutput: "hello",
          label: "단어 1개",
        },
        {
          stdin: "4\nz\nz\nz\nz",
          expectedOutput: "z",
          label: "전부 같음 — 1개만",
        },
        {
          stdin: "6\nabc\nab\na\nabcd\nab\nbc",
          expectedOutput: "a\nab\nbc\nabc\nabcd",
          label: "여러 길이 + 중복",
        },
        {
          stdin: "3\nbb\nab\nb",
          expectedOutput: "b\nab\nbb",
          label: "길이 우선 검증",
        },
      ],
      hints: [
        "comparator 두 단계: 길이 다르면 길이 비교, 같으면 문자열 비교.",
        "중복 제거는 `sort` 후 `unique` + `erase` 패턴.",
        "또는 처음부터 `set<string>` 에 넣고 vector 로 옮긴 뒤 custom sort.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<string> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end(), [](const string& a, const string& b) {
        if (a.size() != b.size()) return a.size() < b.size();
        return a < b;
    });
    v.erase(unique(v.begin(), v.end()), v.end());
    for (auto& s : v) cout << s << "\\n";
    return 0;
}`,
      solutionExplanation:
        "comparator 로 (길이, 사전순) 두 키 정렬. 정렬된 상태에서 `unique` + `erase` 로 중복 제거 (정렬된 인접 중복만 제거하므로 sort 가 먼저).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
words = set()
for _ in range(n):
    words.add(input().strip())
result = sorted(words, key=lambda s: (len(s), s))
sys.stdout.write("\\n".join(result) + "\\n")
`,
      en: {
        title: "Word Sort",
        description: `Sort N words by:

1. Shorter length first
2. Same length → alphabetical (ascending)
3. **Remove duplicates**

Print each word on its own line.

Source: BOJ 1181 paraphrased`,
        constraints: "1 ≤ N ≤ 20,000, each word is lowercase English 1-50 chars",
        hints: [
          "Two-stage comparator: compare lengths first, then strings.",
          "Dedup with `sort` + `unique` + `erase`.",
          "Alternative: insert into `set<string>` then move to vector and sort.",
        ],
        solutionExplanation:
          "Two-key comparator (length, then lex). After sorting, `unique` + `erase` removes adjacent duplicates — works because sorting puts equal strings next to each other.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 두 배열 공통 원소 개수 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-003",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "보통",
      title: "두 배열의 공통 원소",
      description: `두 배열 A (크기 N), B (크기 M) 가 주어진다. A 와 B 양쪽에 모두 등장하는 **서로 다른 값** 의 개수를 출력하라.

각 배열 내에는 중복이 있을 수 있지만, 결과에서는 같은 값을 한 번만 센다.

출처: 원본 (two-pointer 연습용)`,
      constraints: "1 ≤ N, M ≤ 100,000, -1,000,000,000 ≤ 각 정수 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 3 4 5\n3\n3 5 7", expectedOutput: "2", label: "기본" },
        { stdin: "4\n1 1 2 2\n3\n1 2 3", expectedOutput: "2", label: "양쪽 모두 중복" },
        { stdin: "3\n1 2 3\n3\n4 5 6", expectedOutput: "0", label: "공통 없음" },
        { stdin: "1\n7\n1\n7", expectedOutput: "1", label: "양쪽 모두 1개" },
        { stdin: "5\n5 5 5 5 5\n3\n5 5 5", expectedOutput: "1", label: "전부 같은 값" },
        { stdin: "4\n-3 0 3 3\n5\n-5 -3 0 3 9", expectedOutput: "3", label: "음수 + 중복" },
      ],
      hints: [
        "두 배열 모두 정렬 후 two-pointer 로 한 번에 훑으면 O(N + M).",
        "같은 값을 발견하면 카운트 1 증가 후, 양쪽에서 그 값을 모두 건너뛰어야 중복 카운트 방지.",
        "또는 둘 다 `set<int>` 에 넣고 교집합 크기를 세는 방법도 가능 (O((N+M) log N)).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cin >> m;
    vector<long long> b(m);
    for (int i = 0; i < m; i++) cin >> b[i];
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
    int i = 0, j = 0, cnt = 0;
    while (i < n && j < m) {
        if (a[i] == b[j]) {
            cnt++;
            long long val = a[i];
            while (i < n && a[i] == val) i++;
            while (j < m && b[j] == val) j++;
        } else if (a[i] < b[j]) i++;
        else j++;
    }
    cout << cnt << "\\n";
    return 0;
}`,
      solutionExplanation:
        "정렬 + two-pointer 패턴. 양쪽에서 같은 값을 만나면 카운트 후 양쪽에서 그 값 전체를 건너뛴다 — 중복 카운트 방지. 크기가 다를 때도 한 쪽이 끝나면 자동 종료.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = set(map(int, input().split()))
m = int(input())
b = set(map(int, input().split()))
print(len(a & b))
`,
      en: {
        title: "Common Elements of Two Arrays",
        description: `Given two arrays A (size N) and B (size M), print the number of **distinct values** that appear in both.

Each array may contain duplicates, but each shared value is counted once.

Source: original (two-pointer practice)`,
        constraints: "1 ≤ N, M ≤ 100,000, -1,000,000,000 ≤ each integer ≤ 1,000,000,000",
        hints: [
          "Sort both arrays, then walk with two pointers in O(N + M).",
          "On match, skip all copies of that value on both sides — prevents double-counting.",
          "Alternative: insert both into `set<int>`, intersect (O((N+M) log N)).",
        ],
        solutionExplanation:
          "Classic sort + two-pointer pattern. When equal values are found, increment count and skip over all copies on both sides to avoid double-counting.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 트림드 합 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-004",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "보통",
      title: "양극 K개 제외한 합",
      description: `N개의 정수와 K가 주어진다. 정렬한 뒤 **가장 작은 K개와 가장 큰 K개를 제외**하고 나머지 원소들의 합을 출력하라.

이런 식의 "양극 잘라내고 평균/합 구하기" 는 통계에서 **트림드 평균(trimmed mean)** 이라 부른다.

출처: 원본 (LC 1491 류의 단순화)`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ K, N > 2K, -10,000 ≤ 각 정수 ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5 1\n10 20 30 40 50", expectedOutput: "90", label: "기본 — 10, 50 제외" },
        { stdin: "6 2\n1 2 3 4 5 6", expectedOutput: "7", label: "K=2 — 1,2,5,6 제외 → 3+4" },
        { stdin: "3 0\n1 2 3", expectedOutput: "6", label: "K=0 — 전체 합" },
        { stdin: "4 1\n100 100 100 100", expectedOutput: "200", label: "전부 같은 값" },
        { stdin: "7 3\n7 1 3 5 2 6 4", expectedOutput: "4", label: "1,2,3 + 5,6,7 제외 → 4" },
      ],
      hints: [
        "정렬 후 인덱스 K 부터 N-K-1 까지가 살아남는 원소.",
        "for 루프로 v[K] ~ v[N-K-1] 합산.",
        "합이 음수일 수도 있으니 int 로 충분하지만 안전하게 long long.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    long long sum = 0;
    for (int i = k; i < n - k; i++) sum += v[i];
    cout << sum << "\\n";
    return 0;
}`,
      solutionExplanation:
        "정렬 후 양쪽 K개씩 잘라내고 가운데만 합산. 인덱스 [K, N-K-1] 범위가 살아남는 원소이고, for 루프 시작과 종료 조건만 잘 맞추면 끝.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
v = sorted(map(int, input().split()))
print(sum(v[k:n - k]))
`,
      en: {
        title: "Trimmed Sum (Drop K from Each End)",
        description: `Given N integers and K, sort them, **drop the K smallest and K largest**, and print the sum of the remaining elements.

In statistics this is the basis of the **trimmed mean**.

Source: original (simplified LC 1491-style)`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ K, N > 2K, -10,000 ≤ each integer ≤ 10,000",
        hints: [
          "After sorting, indices [K, N-K-1] survive.",
          "Loop from K to N-K-1 (inclusive) and accumulate.",
          "Use long long for safety even though int suffices for these bounds.",
        ],
        solutionExplanation:
          "Sort, drop K from each end, sum the middle. The only trick is getting the loop bounds [K, N-K-1] right.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 빈도수 정렬 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-005",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "어려움",
      title: "빈도수 정렬",
      description: `N개의 정수가 주어진다. 각 **서로 다른 값** 을 다음 순서로 출력하라.

1. 등장 횟수 **내림차순**
2. 횟수가 같으면 **값 오름차순**

각 줄에 \`값 등장횟수\` 형식으로 출력. 같은 값을 두 번 출력하지 않는다.

출처: 원본 (LC 451 paraphrased — 문자→정수)`,
      constraints: "1 ≤ N ≤ 100,000, -1,000,000 ≤ 각 정수 ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n1 2 2 3 3",
          expectedOutput: "2 2\n3 2\n1 1",
          label: "기본 — 2와 3 동률, 값 작은 게 먼저",
        },
        { stdin: "1\n7", expectedOutput: "7 1", label: "원소 1개" },
        {
          stdin: "6\n1 1 1 2 2 3",
          expectedOutput: "1 3\n2 2\n3 1",
          label: "빈도수 모두 다름",
        },
        { stdin: "4\n5 5 5 5", expectedOutput: "5 4", label: "전부 같은 값" },
        {
          stdin: "7\n-1 -1 -1 0 0 0 1",
          expectedOutput: "-1 3\n0 3\n1 1",
          label: "음수 + 동률",
        },
      ],
      hints: [
        "`map<int,int>` 로 빈도수를 센다.",
        "map 의 entry 들을 `vector<pair<int,int>>` 로 옮긴 뒤 custom comparator 로 정렬.",
        "comparator: 빈도수 다르면 빈도수 내림차순, 같으면 값 오름차순.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    map<int, int> freq;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        freq[x]++;
    }
    vector<pair<int,int>> v(freq.begin(), freq.end()); // (값, 빈도수)
    sort(v.begin(), v.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
        if (a.second != b.second) return a.second > b.second; // 빈도수 내림차순
        return a.first < b.first; // 값 오름차순
    });
    for (auto& [val, cnt] : v)
        cout << val << " " << cnt << "\\n";
    return 0;
}`,
      solutionExplanation:
        "두 단계 패턴: (1) `map` 으로 빈도수 집계, (2) entries 를 vector 로 옮겨 custom comparator 정렬. 다중 기준 정렬은 'A 다르면 A 기준, 같으면 B 기준' 분기로 깔끔하게 작성.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
from collections import Counter
input = sys.stdin.readline

n = int(input())
nums = list(map(int, input().split()))
freq = Counter(nums)
# (빈도수 내림차순, 값 오름차순)
items = sorted(freq.items(), key=lambda x: (-x[1], x[0]))
out = []
for val, cnt in items:
    out.append(f"{val} {cnt}")
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Frequency Sort",
        description: `Given N integers, print each **distinct value** in this order:

1. By count, **descending**
2. Ties broken by value, **ascending**

Each line: \`value count\`. Each value appears at most once in output.

Source: LC 451 paraphrased (chars → integers)`,
        constraints: "1 ≤ N ≤ 100,000, -1,000,000 ≤ each integer ≤ 1,000,000",
        hints: [
          "Count frequencies with `map<int,int>`.",
          "Move entries to `vector<pair<int,int>>` and sort with a custom comparator.",
          "Comparator: by count desc, ties by value asc.",
        ],
        solutionExplanation:
          "Two-step pattern: (1) `map` counts frequencies, (2) move entries to a vector and sort by custom comparator. Multi-key sort uses the standard 'if A differs, compare A; else compare B' branch.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 상위 K 빈도 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-006",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "어려움",
      title: "가장 자주 등장하는 K개 원소",
      description: `N개의 정수와 K가 주어진다. 가장 자주 등장하는 **서로 다른** 값 K개를 골라 **값 오름차순** 으로 출력하라.

빈도수 동률일 때는 **값이 작은 쪽** 이 우선 선택된다.

출력은 한 줄에 K개 값을 공백으로 구분.

출처: LeetCode 347 (Top K Frequent Elements) paraphrased`,
      constraints: "1 ≤ K ≤ 서로 다른 값의 수 ≤ N ≤ 100,000, -1,000,000 ≤ 각 정수 ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "6 2\n1 1 2 2 2 3",
          expectedOutput: "1 2",
          label: "기본 — 상위 2개는 {1,2}, 정렬해서 출력",
        },
        { stdin: "5 1\n4 4 4 4 4", expectedOutput: "4", label: "값 1개만 존재" },
        {
          stdin: "6 3\n1 2 3 4 5 6",
          expectedOutput: "1 2 3",
          label: "모두 빈도수 1 — 값 작은 3개",
        },
        {
          stdin: "7 2\n5 5 1 1 9 9 3",
          expectedOutput: "1 5",
          label: "1,5,9 모두 빈도 2 — 값 작은 2개",
        },
        {
          stdin: "8 3\n10 20 20 30 30 30 40 40",
          expectedOutput: "20 30 40",
          label: "상위 3개를 값 오름차순으로",
        },
      ],
      hints: [
        "1) `map<int,int>` 로 빈도수 세기.",
        "2) entries 를 (빈도수 내림차순, 값 오름차순) 으로 정렬해 상위 K 개 선택.",
        "3) 선택된 K 개 값을 다시 **값 오름차순** 으로 정렬해 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    map<int, int> freq;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        freq[x]++;
    }
    vector<pair<int,int>> v(freq.begin(), freq.end()); // (값, 빈도수)
    sort(v.begin(), v.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });
    vector<int> top;
    for (int i = 0; i < k; i++) top.push_back(v[i].first);
    sort(top.begin(), top.end());
    for (int i = 0; i < (int)top.size(); i++) {
        if (i > 0) cout << ' ';
        cout << top[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "3 단계: (1) map 으로 빈도수, (2) 빈도수 내림/값 오름 정렬 후 상위 K 개 추출, (3) 추출한 값을 다시 오름차순 정렬해 출력. **두 번 정렬** 이 핵심 — 동률 처리는 첫 정렬에서, 출력 순서는 두 번째 정렬에서.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
from collections import Counter
input = sys.stdin.readline

n, k = map(int, input().split())
nums = list(map(int, input().split()))
freq = Counter(nums)
# (빈도수 내림차순, 값 오름차순) 으로 정렬 후 상위 K 개
items = sorted(freq.items(), key=lambda x: (-x[1], x[0]))
top = sorted([val for val, _ in items[:k]])
print(" ".join(map(str, top)))
`,
      en: {
        title: "Top K Frequent Elements",
        description: `Given N integers and K, find the K most frequent **distinct** values and print them in **ascending order of value**.

When frequencies tie, prefer the smaller value.

Output one line with K space-separated values.

Source: LeetCode 347 paraphrased`,
        constraints:
          "1 ≤ K ≤ distinct count ≤ N ≤ 100,000, -1,000,000 ≤ each integer ≤ 1,000,000",
        hints: [
          "1) Count frequencies with `map<int,int>`.",
          "2) Sort entries by (freq desc, value asc) and take the top K.",
          "3) Re-sort the chosen K values in ascending order for output.",
        ],
        solutionExplanation:
          "Three steps: (1) `map` for frequencies, (2) sort by (freq desc, value asc), take top K, (3) re-sort the chosen K values ascending. **Two sorts** is the trick — first sort handles tie-breaking, second handles output order.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 분수 정렬 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-007",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "어려움",
      title: "분수 정렬 (나눗셈 없이)",
      description: `N개의 분수 \`a/b\` (a는 분자, b는 분모) 가 주어진다. 값이 작은 순으로 정렬해 한 줄에 하나씩 \`a b\` 형식으로 출력하라.

**제약**: 부동소수점 오차 때문에 \`(double)a/b\` 직접 비교는 금지. **교차 곱셈** (a/b < c/d ⇔ a*d < c*b) 으로 비교.

값이 같으면 분자 오름차순.

출처: 원본 (CodeForces Div2 A 류 — comparator 사고력)`,
      constraints: "1 ≤ N ≤ 1000, 1 ≤ a, b ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3\n1 2\n2 3\n1 4",
          expectedOutput: "1 4\n1 2\n2 3",
          label: "기본 — 0.25, 0.5, 0.667",
        },
        {
          stdin: "2\n3 4\n6 8",
          expectedOutput: "3 4\n6 8",
          label: "같은 값 (3/4 = 6/8) — 분자 작은 게 먼저",
        },
        { stdin: "1\n5 7", expectedOutput: "5 7", label: "1개" },
        {
          stdin: "4\n1 3\n2 6\n1 2\n3 9",
          expectedOutput: "1 3\n2 6\n3 9\n1 2",
          label: "1/3 동률 3개 후 1/2",
        },
        {
          stdin: "5\n1 1\n1 2\n2 1\n1 3\n3 1",
          expectedOutput: "1 3\n1 2\n1 1\n2 1\n3 1",
          label: "넓은 범위",
        },
      ],
      hints: [
        "double 로 비교하면 같은 값을 다르다고 판단할 수 있다 (예: 1/3 vs 2/6).",
        "comparator: `a.first * b.second < b.first * a.second` (교차 곱셈, b 가 분모이므로 양수 보장).",
        "값이 같으면 (`a*d == c*b`) 분자 오름차순으로 tiebreak.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<pair<int,int>> v(n); // (분자, 분모)
    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;
    sort(v.begin(), v.end(), [](const pair<int,int>& A, const pair<int,int>& B) {
        // A = (a, b), B = (c, d). a/b < c/d ⇔ a*d < c*b (b,d > 0)
        long long left = (long long)A.first * B.second;
        long long right = (long long)B.first * A.second;
        if (left != right) return left < right;
        return A.first < B.first; // 동률 시 분자 오름차순
    });
    for (auto& [a, b] : v) cout << a << " " << b << "\\n";
    return 0;
}`,
      solutionExplanation:
        "분수 비교에서 부동소수점은 1/3 = 2/6 같은 동등 분수를 다르게 볼 위험이 있다. 교차 곱셈 `a*d vs c*b` 로 정수 비교. b, d 가 양수라 부호 뒤집힘 걱정 없음. 곱이 최대 10^6 이므로 long long 으로 안전.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
from fractions import Fraction
input = sys.stdin.readline

n = int(input())
v = []
for _ in range(n):
    a, b = map(int, input().split())
    v.append((a, b))
# 값(Fraction) 으로 정확 비교, 동률은 분자 오름차순
v.sort(key=lambda p: (Fraction(p[0], p[1]), p[0]))
out = []
for a, b in v:
    out.append(f"{a} {b}")
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Fraction Sort (No Division)",
        description: `Given N fractions \`a/b\` (a = numerator, b = denominator), sort by value ascending and print as \`a b\` one per line.

**Constraint**: floating-point comparison is forbidden — use **cross-multiplication** (a/b < c/d ⇔ a*d < c*b).

Ties broken by numerator ascending.

Source: original (CF Div2 A-style — comparator thinking)`,
        constraints: "1 ≤ N ≤ 1000, 1 ≤ a, b ≤ 1000",
        hints: [
          "Floating-point can flag equal fractions (1/3 vs 2/6) as different — avoid.",
          "Comparator: `a.first * b.second < b.first * a.second` (cross-multiply; denominators positive).",
          "On equality (`a*d == c*b`), break by numerator ascending.",
        ],
        solutionExplanation:
          "Floating-point can split equal fractions (1/3 vs 2/6). Use integer cross-multiplication. Denominators are positive so no sign-flip worry. Use long long since products fit in 10^6.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 막대 합치기 최소 비용 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-008",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "어려움",
      title: "막대 합치기 — 최소 비용",
      description: `N개의 막대 길이가 주어진다. 두 막대를 합칠 때 비용은 **두 막대 길이의 합** 이고, 합친 결과는 다시 막대가 된다. 모든 막대를 1개로 합칠 때까지 (N-1번 합침) 들어가는 **총 비용의 최솟값** 을 출력하라.

핵심 통찰: 가장 짧은 두 막대를 먼저 합치는 게 항상 유리하다 (허프만 코딩 원리). 매번 가장 작은 두 개를 골라야 하므로 **min-heap (priority_queue)** 가 자연스럽다.

N = 1 이면 합칠 게 없으므로 0 출력.

출처: 원본 (Huffman / 백준 1715 paraphrased)`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ 각 막대 길이 ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "4\n10 20 40 30",
          expectedOutput: "190",
          label: "기본: 10+20=30, 30+30=60, 40+60=100, 합 30+60+100=190",
        },
        { stdin: "1\n10", expectedOutput: "0", label: "1개 — 합칠 게 없음" },
        { stdin: "2\n5 7", expectedOutput: "12", label: "2개" },
        {
          stdin: "3\n1 2 3",
          expectedOutput: "9",
          label: "1+2=3 (cost 3), 3+3=6 (cost 6), 총 9",
        },
        {
          stdin: "5\n1 1 1 1 1",
          expectedOutput: "12",
          label: "1+1=2, 1+1=2, 1+2=3, 2+3=5 → 비용 2+2+3+5=12",
        },
        { stdin: "4\n1 1 1 1", expectedOutput: "8", label: "1+1=2, 1+1=2, 2+2=4 → 비용 2+2+4=8" },
      ],
      hints: [
        "매번 가장 작은 두 개를 꺼내 합치고 결과를 다시 넣는다 → min-heap 자료구조.",
        "C++ 에서는 `priority_queue<int, vector<int>, greater<int>>` 가 min-heap.",
        "전체 시간 복잡도 O(N log N).",
        "**정렬만 한 번 하고 끝나지 않는다** — 합친 결과가 어디 끼어들지 모르기 때문에 매번 두 개를 새로 골라야 한다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        pq.push(x);
    }
    long long cost = 0;
    while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        cost += a + b;
        pq.push(a + b);
    }
    cout << cost << "\\n";
    return 0;
}`,
      solutionExplanation:
        "허프만 코딩 원리: 가장 작은 두 개를 먼저 합치면 총 비용 최소. min-heap 으로 매번 작은 두 개를 O(log N) 에 꺼낸다. **단순 정렬 한 번으로는 안 됨** — 합친 결과가 중간에 끼어들 수 있어서.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
import heapq
input = sys.stdin.readline

n = int(input())
sticks = list(map(int, input().split()))
heapq.heapify(sticks)
cost = 0
while len(sticks) > 1:
    a = heapq.heappop(sticks)
    b = heapq.heappop(sticks)
    cost += a + b
    heapq.heappush(sticks, a + b)
print(cost)
`,
      en: {
        title: "Combine Sticks — Minimum Cost",
        description: `Given N stick lengths, merging two sticks costs **the sum of their lengths** and produces a new stick of that combined length. Merge until one stick remains (N-1 merges). Print the **minimum total cost**.

Key insight: always merge the two shortest sticks (Huffman-coding principle). Because we keep needing the smallest two, a **min-heap (priority_queue)** is natural.

If N = 1, no merge is needed — output 0.

Source: original (Huffman / BOJ 1715 paraphrased)`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ each length ≤ 1000",
        hints: [
          "Repeatedly take the two smallest, merge, push back → min-heap.",
          "In C++: `priority_queue<int, vector<int>, greater<int>>`.",
          "Overall O(N log N).",
          "**One sort is not enough** — after merging, the result has to be reinserted in the right place.",
        ],
        solutionExplanation:
          "Huffman principle: always merging the smallest two minimizes total cost. A min-heap pulls the smallest two in O(log N) each. A single sort is insufficient because merged sticks can end up anywhere.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 순위 매기기 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-009",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "보통",
      title: "순위 매기기 (동점은 같은 순위, 다음 순위 건너뜀)",
      description: `N명의 학생 점수가 입력 순서대로 주어진다. 각 학생의 **순위** 를 입력 순서대로 한 줄에 공백으로 구분해 출력하라.

순위 규칙 (스포츠 랭킹 방식):
- 점수가 높을수록 순위가 높다 (1등이 최상위)
- **동점은 같은 순위** 를 받는다
- 동점자 다음 순위는 **건너뛴다**. 예: 1등이 3명이면 다음 순위는 4등

예시: 점수 \`[90, 85, 90, 70, 60]\` → 순위 \`[1, 3, 1, 4, 5]\`

출처: 원본 (CodeForces 800-rating 류)`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ 각 점수 ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "5\n90 85 90 70 60",
          expectedOutput: "1 3 1 4 5",
          label: "기본 — 90 동률, 2등 건너뜀",
        },
        { stdin: "3\n100 100 100", expectedOutput: "1 1 1", label: "전부 동률" },
        {
          stdin: "4\n50 60 70 80",
          expectedOutput: "4 3 2 1",
          label: "입력 순서 반대 — 출력 1234",
        },
        { stdin: "1\n42", expectedOutput: "1", label: "한 명" },
        {
          stdin: "6\n70 70 70 50 50 30",
          expectedOutput: "1 1 1 4 4 6",
          label: "다단계 동률 — 2,3등과 5등 건너뜀",
        },
      ],
      hints: [
        "1) (점수, 원래인덱스) 쌍으로 만들어 점수 **내림차순** 정렬.",
        "2) 정렬된 배열을 순회하며 등수 부여 — 이전 점수와 같으면 같은 등수, 다르면 (현재 위치+1)등.",
        "3) 원래 인덱스에 등수를 기록 후 입력 순서대로 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<pair<int,int>> v(n); // (점수, 원래 인덱스)
    for (int i = 0; i < n; i++) {
        cin >> v[i].first;
        v[i].second = i;
    }
    sort(v.begin(), v.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
        if (a.first != b.first) return a.first > b.first; // 점수 내림차순
        return a.second < b.second; // 동률은 원래 인덱스 기준 (안정성)
    });
    vector<int> rank(n);
    rank[v[0].second] = 1;
    for (int i = 1; i < n; i++) {
        if (v[i].first == v[i-1].first)
            rank[v[i].second] = rank[v[i-1].second]; // 동률 → 같은 등수
        else
            rank[v[i].second] = i + 1; // 새 등수 = 현재 위치+1
    }
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << rank[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "포인트는 '동률 다음 순위 건너뛰기'. 정렬 후 새 등수는 항상 (현재 위치+1) 로 매기면 건너뛰기가 자동 처리된다 — 동률 그룹이 N 명이면 다음 등수는 자동으로 +N 만큼 점프.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
scores = list(map(int, input().split()))
# (점수 내림차순, 원래 인덱스 오름차순)
order = sorted(range(n), key=lambda i: (-scores[i], i))
rank = [0] * n
rank[order[0]] = 1
for i in range(1, n):
    if scores[order[i]] == scores[order[i - 1]]:
        rank[order[i]] = rank[order[i - 1]]
    else:
        rank[order[i]] = i + 1
print(" ".join(map(str, rank)))
`,
      en: {
        title: "Rank Assignment (Ties Share, Next Rank Skips)",
        description: `N student scores are given in input order. Print each student's **rank** in input order, space-separated.

Ranking rules (sports-style):
- Higher score → higher rank (rank 1 is best)
- **Equal scores share a rank**
- After a tie group, the **next rank is skipped**. e.g., three #1s → next rank is 4.

Example: scores \`[90, 85, 90, 70, 60]\` → ranks \`[1, 3, 1, 4, 5]\`.

Source: original (CodeForces 800-rating-style)`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ each score ≤ 1,000,000",
        hints: [
          "1) Pack (score, original_index) and sort by score descending.",
          "2) Walk the sorted array — same score as previous → same rank, otherwise rank = (current position + 1).",
          "3) Write ranks back to original-index slots and print in input order.",
        ],
        solutionExplanation:
          "Key idea: setting new ranks to (current position + 1) automatically handles the 'skip after tie' rule — a tie group of N people jumps the next rank by N.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 최소 회의실 수 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-010",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "어려움",
      title: "최소 회의실 수",
      description: `N개의 회의 (시작 시간, 끝 시간) 가 주어진다. 모든 회의를 진행하려면 **최소 몇 개의 회의실** 이 필요한지 출력하라.

한 회의가 끝나는 시각에 다른 회의가 시작하면 **같은 회의실 재사용 가능**.

핵심 통찰: 각 시작/끝 시각을 이벤트로 보고 시간순으로 처리. 시작=+1, 끝=-1 누적하면서 동시 사용 회의실 수의 **최댓값** 이 답.

출처: LeetCode 253 (Meeting Rooms II) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ 시작 < 끝 ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "3\n0 30\n5 10\n15 20",
          expectedOutput: "2",
          label: "기본 — 0-30 동안 5-10, 15-20 겹침",
        },
        { stdin: "2\n7 10\n2 4", expectedOutput: "1", label: "겹치지 않음" },
        { stdin: "3\n1 5\n2 6\n3 7", expectedOutput: "3", label: "모두 겹침" },
        {
          stdin: "2\n1 10\n10 20",
          expectedOutput: "1",
          label: "경계값 — 끝나는 순간 새 회의 시작 OK",
        },
        { stdin: "1\n0 100", expectedOutput: "1", label: "1개 회의" },
        {
          stdin: "5\n1 4\n2 5\n3 6\n7 8\n7 10",
          expectedOutput: "3",
          label: "최대 동시 = 3 (시각 3 무렵)",
        },
      ],
      hints: [
        "각 회의를 두 개의 이벤트로 분리: (시작시각, +1), (끝시각, -1).",
        "이벤트를 **시각 오름차순** 으로 정렬. 같은 시각이면 **끝(-1) 이벤트 먼저** — 끝나는 회의실을 재사용할 수 있도록.",
        "정렬된 이벤트를 차례로 처리하며 동시 사용 회의실 수의 최댓값을 추적.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<pair<int,int>> events; // (시각, +1 시작 / -1 끝)
    for (int i = 0; i < n; i++) {
        int s, e; cin >> s >> e;
        events.push_back({s, +1});
        events.push_back({e, -1});
    }
    sort(events.begin(), events.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
        if (a.first != b.first) return a.first < b.first;
        return a.second < b.second; // -1 (끝) 이 +1 (시작) 보다 먼저
    });
    int cur = 0, ans = 0;
    for (auto& [t, d] : events) {
        cur += d;
        ans = max(ans, cur);
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "line sweep / event-based 패턴. 시작=+1, 끝=-1 이벤트로 분해하고 시간순 정렬. 같은 시각이면 -1 먼저 처리해서 '회의 끝나자마자 같은 시각 시작' 시 회의실 재사용. cur 의 최댓값이 답.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
events = []
for _ in range(n):
    s, e = map(int, input().split())
    events.append((s, 1))
    events.append((e, -1))
# 시각 오름차순, 같은 시각이면 -1(끝) 먼저
events.sort(key=lambda x: (x[0], x[1]))
cur = 0
ans = 0
for _, d in events:
    cur += d
    if cur > ans:
        ans = cur
print(ans)
`,
      en: {
        title: "Minimum Meeting Rooms",
        description: `Given N meetings with (start, end) times, find the **minimum number of rooms** needed to host all of them.

If one meeting ends at the exact moment another starts, the room can be reused.

Key insight: treat each start/end as an event in chronological order. Use +1 for start and -1 for end; the **max running sum** is the answer.

Source: LeetCode 253 (Meeting Rooms II) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ start < end ≤ 1,000,000",
        hints: [
          "Split each meeting into two events: (start, +1), (end, -1).",
          "Sort events by **time ascending**; on ties **process end (-1) before start (+1)** so rooms get reused.",
          "Walk events tracking the running count and its maximum.",
        ],
        solutionExplanation:
          "Line-sweep / event pattern. Split into start (+1) and end (-1) events, sort by time. Ties: -1 first so a room ending at time T is available for a meeting starting at T. The max running sum is the answer.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 중복 제거 후 K번째 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-011",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "보통",
      title: "중복 제거 후 K번째 작은 값",
      description: `N개의 정수와 K가 주어진다. **중복을 제거한 후** 오름차순으로 정렬했을 때 K번째(1-based) 값을 출력하라.

예: \`[1, 2, 2, 3, 3]\` → 중복 제거 → \`[1, 2, 3]\` → 2번째 = 2

K는 항상 중복 제거 후 원소 수 이하로 주어진다 (즉, 답이 존재함).

출처: 원본 (정렬 + unique 결합 연습)`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ 서로 다른 값 수, -1,000,000 ≤ 각 정수 ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5 2\n1 2 2 3 3", expectedOutput: "2", label: "기본" },
        { stdin: "4 1\n5 5 5 5", expectedOutput: "5", label: "전부 같음 — K=1 만 가능" },
        {
          stdin: "6 3\n3 1 4 1 5 9",
          expectedOutput: "4",
          label: "중복 제거 → [1,3,4,5,9], 3번째 = 4",
        },
        { stdin: "5 5\n10 20 30 40 50", expectedOutput: "50", label: "중복 없음 — 그냥 K번째" },
        {
          stdin: "7 2\n-3 0 -3 5 0 5 1",
          expectedOutput: "0",
          label: "음수 + 중복 → [-3,0,1,5], 2번째 = 0",
        },
      ],
      hints: [
        "sort + unique + erase 패턴으로 중복 제거.",
        "정렬 후 unique 는 인접한 중복만 합치므로 sort 가 먼저.",
        "중복 제거 후 v[K-1] 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());
    cout << v[k - 1] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "벡터에서 중복 제거의 관용적 방법: sort → unique → erase. unique 는 인접한 중복만 제거하므로 반드시 sort 가 먼저여야 한다.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
v = sorted(set(map(int, input().split())))
print(v[k - 1])
`,
      en: {
        title: "K-th Smallest After Dedup",
        description: `Given N integers and K, **remove duplicates** then print the K-th smallest (1-based) value.

Example: \`[1, 2, 2, 3, 3]\` → dedup → \`[1, 2, 3]\` → 2nd = 2

K is guaranteed to be ≤ the count of distinct values.

Source: original (sort + unique combo practice)`,
        constraints:
          "1 ≤ N ≤ 100,000, 1 ≤ K ≤ #distinct values, -1,000,000 ≤ each integer ≤ 1,000,000",
        hints: [
          "Idiomatic dedup: sort → unique → erase.",
          "unique only collapses adjacent duplicates, so sort must come first.",
          "After dedup, print v[K-1].",
        ],
        solutionExplanation:
          "The idiomatic vector dedup is sort → unique → erase. unique only collapses adjacent duplicates, so sorting must come first.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 아나그램 그룹 정렬 출력 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "asort-012",
      cluster: "algo-sorting-contest",
      unlockAfter: "algo-sorting",
      difficulty: "어려움",
      title: "아나그램 그룹 정렬 출력",
      description: `N개의 영문 소문자 단어가 주어진다. **아나그램(글자 구성이 같은 단어)** 끼리 묶어 다음 규칙으로 출력하라.

- 그룹 개수를 첫 줄에 출력
- 그 다음 그룹들을 **크기 내림차순** 으로 출력. 크기 동률은 **그룹 내 가장 작은 사전순 단어** 기준 오름차순.
- 각 그룹은 **그룹 내 사전순 오름차순** 으로 단어를 공백으로 이어 한 줄에 출력.

예: \`{eat, tea, tan, ate, nat, bat}\` → 그룹 \`{ate eat tea}\`, \`{ant nat tan}\` 잠깐, "tan" 의 정렬은 "ant" 가 됨. 그룹 키는 \`aet\`, \`ant\`, \`abt\`. → 세 그룹: \`{ate eat tea}\` (3개), \`{nat tan}\` (2개), \`{bat}\` (1개).

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
          expectedOutput: "3\nate eat tea\nnat tan\nbat",
          label: "기본 — 3개 그룹, 크기 3/2/1",
        },
        { stdin: "1\nhello", expectedOutput: "1\nhello", label: "단어 1개" },
        {
          stdin: "3\nabc\ndef\nghi",
          expectedOutput: "3\nabc\ndef\nghi",
          label: "아나그램 없음 — 3개 그룹, 크기 동률, 사전순",
        },
        {
          stdin: "4\nlisten\nsilent\nenlist\ntinsel",
          expectedOutput: "1\nenlist listen silent tinsel",
          label: "모두 같은 아나그램",
        },
        {
          stdin: "5\nabc\ncba\nbac\nxyz\nzyx",
          expectedOutput: "2\nabc bac cba\nxyz zyx",
          label: "두 그룹 — 첫 그룹이 더 큼",
        },
        {
          stdin: "4\nab\nba\ncd\ndc",
          expectedOutput: "2\nab ba\ncd dc",
          label: "두 그룹 크기 동률 — 그룹 내 사전순(ab vs cd) 기준",
        },
      ],
      hints: [
        "각 단어의 글자를 정렬한 문자열이 아나그램 그룹의 **키**.",
        "`map<string, vector<string>>` 으로 키→단어들 묶음.",
        "각 그룹 내부를 사전순 정렬 후, 그룹들을 (크기 내림차순, 첫 단어 사전순) 으로 다시 정렬.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    map<string, vector<string>> groups;
    for (int i = 0; i < n; i++) {
        string w; cin >> w;
        string key = w;
        sort(key.begin(), key.end());
        groups[key].push_back(w);
    }
    // 그룹 내부 정렬
    vector<vector<string>> gs;
    for (auto& [k, words] : groups) {
        sort(words.begin(), words.end());
        gs.push_back(words);
    }
    // 그룹 간 정렬: 크기 내림차순, 동률은 첫 단어 사전순
    sort(gs.begin(), gs.end(), [](const vector<string>& a, const vector<string>& b) {
        if (a.size() != b.size()) return a.size() > b.size();
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
      solutionExplanation:
        "아나그램 그룹화의 표준 패턴: 단어의 글자를 정렬한 문자열을 키로 사용. 그 다음 두 단계 정렬 — 각 그룹 내부를 사전순으로, 그룹들을 (크기 내림, 첫 단어 사전순) 으로. 정렬을 **여러 층** 으로 쓰는 게 핵심.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성
`,
      pySolutionCode: `import sys
from collections import defaultdict
input = sys.stdin.readline

n = int(input())
groups = defaultdict(list)
for _ in range(n):
    w = input().strip()
    key = "".join(sorted(w))
    groups[key].append(w)
# 그룹 내부 사전순 정렬
gs = [sorted(words) for words in groups.values()]
# 그룹 간: 크기 내림차순, 동률은 첫 단어 사전순
gs.sort(key=lambda g: (-len(g), g[0]))
out = [str(len(gs))]
for g in gs:
    out.append(" ".join(g))
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Anagram Groups — Sorted Output",
        description: `Given N lowercase English words, group **anagrams** (same letter multiset) together and print them:

- First line: number of groups
- Then each group on its own line, in order: **groups by size descending**, ties broken by the **smallest word in the group** (lex ascending).
- Within each group, print words in **lex ascending** order, space-separated.

Source: LeetCode 49 (Group Anagrams) paraphrased`,
        constraints: "1 ≤ N ≤ 10,000, each word is lowercase English 1-100 chars",
        hints: [
          "The sorted-letter string of each word is the **anagram key**.",
          "Use `map<string, vector<string>>` to bucket words by key.",
          "Sort within each group, then sort groups by (size desc, first word asc).",
        ],
        solutionExplanation:
          "Standard anagram-grouping pattern: sort each word's letters to form its key. Then **two layers** of sorting — words within each group lex-ascending, groups by (size desc, first word asc).",
      },
    },
  ],
}
