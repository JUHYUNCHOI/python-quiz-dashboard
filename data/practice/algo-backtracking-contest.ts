import type { PracticeCluster } from "./types"

export const backtrackingContestCluster: PracticeCluster = {
  id: "algo-backtracking-contest",
  title: "백트래킹 문제 풀이",
  emoji: "🔙",
  description: "choose / explore / un-choose — 결정 트리 탐색 + 가지치기",
  unlockAfter: "algo-backtracking",
  en: {
    title: "Backtracking Practice",
    description: "choose / explore / un-choose — decision tree search + pruning",
  },
  problems: [
    // ═══════════ 쉬움 입문 (on-ramp) ═══════════
    {
      id: "abt-e01",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "쉬움",
      title: "1~N 중 M개 조합 (사전순 출력)",
      description: `1부터 N까지의 자연수 중에서 M개를 고르는 모든 조합을 사전순으로 출력하세요.

- 같은 수를 두 번 고를 수 없고, 한 조합 안의 수는 오름차순.
- 각 조합은 공백으로 구분해 한 줄에.

예: N=4, M=2 → 첫 줄 \`1 2\`, 마지막 줄 \`3 4\`.

백트래킹으로 "방금 고른 수보다 큰 수만 다음에 고른다"를 지키면 자동으로 오름차순·사전순이 됩니다.`,
      constraints: "1 ≤ M ≤ N ≤ 8",
      initialCode: `#include <bits/stdc++.h>
using namespace std;
int N, M, pick[10];

void bt(int start, int depth) {
    // depth == M 이면 출력, 아니면 start..N 골라 재귀
}

int main() {
    cin >> N >> M;
    bt(1, 0);
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

def bt(start, picked):
    # len(picked)==M 이면 출력, 아니면 start..N 골라 재귀
    pass

N, M = map(int, input().split())
bt(1, [])`,
      testCases: [
        { stdin: "4 2", expectedOutput: "1 2\n1 3\n1 4\n2 3\n2 4\n3 4" },
        { stdin: "3 1", expectedOutput: "1\n2\n3" },
        { stdin: "4 4", expectedOutput: "1 2 3 4" },
        { stdin: "3 3", expectedOutput: "1 2 3" },
        { stdin: "4 3", expectedOutput: "1 2 3\n1 2 4\n1 3 4\n2 3 4" },
      ],
      hints: [
        "고른 수 배열을 두고, 깊이가 M이면 한 줄 출력.",
        "다음 재귀에 start로 i+1을 넘기면 중복 없이 오름차순.",
        "for i=start..N: 고르고 → 재귀 → 되돌리기(백트래킹).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;
int N, M, pick[10];

void bt(int start, int depth) {
    if (depth == M) {
        for (int i = 0; i < M; i++) {
            cout << pick[i];
            if (i < M - 1) cout << ' ';
        }
        cout << '\\n';
        return;
    }
    for (int i = start; i <= N; i++) {
        pick[depth] = i;
        bt(i + 1, depth + 1);
    }
}

int main() {
    cin >> N >> M;
    bt(1, 0);
    return 0;
}`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def bt(start, picked):
    if len(picked) == M:
        print(' '.join(map(str, picked)))
        return
    for i in range(start, N + 1):
        picked.append(i)
        bt(i + 1, picked)
        picked.pop()

N, M = map(int, input().split())
bt(1, [])`,
      solutionExplanation: "다음에 고를 수로 i+1을 넘겨 '방금 고른 수보다 큰 수만' 고르게 하면 한 조합이 오름차순이 되고, 작은 수부터 시도하므로 출력도 사전순입니다.",
      en: {
        title: "Combinations of M from 1~N (lexicographic)",
        description: `Print every combination of M numbers from 1..N in lexicographic order, increasing within a line, space-separated.`,
        constraints: "1 ≤ M ≤ N ≤ 8",
        hints: ["When depth==M, print the picks.", "Pass start=i+1 for no duplicates and increasing order.", "Choose → recurse → undo."],
        solutionExplanation: "Passing i+1 keeps combinations increasing; trying smaller first makes output lexicographic.",
      },
    },
    {
      id: "abt-e02",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "쉬움",
      title: "부분수열의 합 (경우의 수)",
      description: `N개의 정수가 주어집니다. 일부를 골라(공집합 제외) 그 합이 \`S\`가 되는 경우의 수를 출력하세요.

- 각 원소는 "고른다/안 고른다" 두 가지.
- 같은 위치는 한 번만, 서로 다른 위치는 값이 같아도 다른 선택으로 셈.

각 원소마다 포함/제외로 가지를 치며 끝에서 합을 확인하는 백트래킹으로 셉니다.`,
      constraints: "1 ≤ N ≤ 20, |정수| ≤ 100000, |S| ≤ 2000000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;
int N; long long S; int a[25]; int cnt = 0;

void bt(int idx, int chosen, long long sum) {
    // idx==N 이면 chosen>0 && sum==S 일 때 cnt++
    // 아니면 a[idx] 제외/포함 두 갈래로 재귀
}

int main() {
    cin >> N >> S;
    for (int i = 0; i < N; i++) cin >> a[i];
    bt(0, 0, 0);
    cout << cnt << '\\n';
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline

def bt(idx, chosen, total):
    # idx==N 이면 chosen>0 and total==S 일 때 카운트
    pass

data = input().split()
N, S = int(data[0]), int(data[1])
a = list(map(int, input().split()))
cnt = 0
bt(0, 0, 0)
print(cnt)`,
      testCases: [
        { stdin: "3 3\n5 1 2", expectedOutput: "1" },
        { stdin: "4 0\n1 -1 2 -2", expectedOutput: "3" },
        { stdin: "1 5\n5", expectedOutput: "1" },
        { stdin: "3 4\n2 2 2", expectedOutput: "3" },
        { stdin: "2 10\n1 2", expectedOutput: "0" },
      ],
      hints: [
        "재귀에 (인덱스, 고른 개수, 지금까지 합)을 넘긴다.",
        "인덱스가 N이면 chosen>0 이고 합==S 일 때 +1.",
        "각 원소: 제외하고 다음 / 포함하고(합+a[idx], chosen+1) 다음.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;
int N; long long S; int a[25]; int cnt = 0;

void bt(int idx, int chosen, long long sum) {
    if (idx == N) {
        if (chosen > 0 && sum == S) cnt++;
        return;
    }
    bt(idx + 1, chosen, sum);
    bt(idx + 1, chosen + 1, sum + a[idx]);
}

int main() {
    cin >> N >> S;
    for (int i = 0; i < N; i++) cin >> a[i];
    bt(0, 0, 0);
    cout << cnt << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
input = sys.stdin.readline

def bt(idx, chosen, total):
    global cnt
    if idx == N:
        if chosen > 0 and total == S:
            cnt += 1
        return
    bt(idx + 1, chosen, total)
    bt(idx + 1, chosen + 1, total + a[idx])

data = input().split()
N, S = int(data[0]), int(data[1])
a = list(map(int, input().split()))
cnt = 0
bt(0, 0, 0)
print(cnt)`,
      solutionExplanation: "각 원소를 포함/제외 두 갈래로 모든 2^N 부분집합을 만듭니다. 끝에서 공집합이 아니고 합이 S면 카운트. N≤20이라 충분히 빠릅니다.",
      en: {
        title: "Subset Sum (count the ways)",
        description: `Count non-empty subsets of N integers whose sum equals S. Branch include/exclude per element, check the sum at the end.`,
        constraints: "1 ≤ N ≤ 20, |int| ≤ 100000, |S| ≤ 2000000",
        hints: ["Pass (index, chosen count, running sum).", "At index N: if chosen>0 and sum==S, +1.", "Two branches: skip / add a[idx]."],
        solutionExplanation: "Generate all 2^N subsets via include/exclude; count non-empty ones summing to S.",
      },
    },
    {
      id: "abt-e03",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "쉬움",
      title: "1~N 중 M개 조합의 개수",
      description: `1부터 N까지에서 M개를 고르는 조합이 몇 가지인지 그 **개수만** 출력하세요. (순서 무관, 같은 수 두 번 못 고름)

예: N=4, M=2 → {1,2},{1,3},{1,4},{2,3},{2,4},{3,4} 로 6가지 → 6.

수학 공식 대신 백트래킹으로 직접 다 만들어 세는 연습입니다.`,
      constraints: "1 ≤ M ≤ N ≤ 20 (M ≤ N; 단 M=0도 허용 → 1)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;
long long N, M, cnt = 0;

void bt(int start, int depth) {
    // depth==M 이면 cnt++, 아니면 start..N 골라 재귀
}

int main() {
    cin >> N >> M;
    bt(1, 0);
    cout << cnt << '\\n';
    return 0;
}`,
      pyInitialCode: `import sys
sys.setrecursionlimit(10000)
input = sys.stdin.readline

def bt(start, depth):
    # depth==M 이면 카운트, 아니면 start..N 재귀
    pass

N, M = map(int, input().split())
cnt = 0
bt(1, 0)
print(cnt)`,
      testCases: [
        { stdin: "4 2", expectedOutput: "6" },
        { stdin: "3 1", expectedOutput: "3" },
        { stdin: "5 5", expectedOutput: "1" },
        { stdin: "5 0", expectedOutput: "1" },
        { stdin: "6 3", expectedOutput: "20" },
      ],
      hints: [
        "abt-e01과 골격 동일. 출력 대신 개수만 +1.",
        "다음에 i+1을 넘겨 같은 조합 중복 카운트 방지.",
        "M=0이면 시작부터 depth==M이라 1이 됨(아무것도 안 고르는 한 가지).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;
long long N, M, cnt = 0;

void bt(int start, int depth) {
    if (depth == M) { cnt++; return; }
    for (int i = start; i <= N; i++) bt(i + 1, depth + 1);
}

int main() {
    cin >> N >> M;
    bt(1, 0);
    cout << cnt << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
sys.setrecursionlimit(10000)
input = sys.stdin.readline

def bt(start, depth):
    global cnt
    if depth == M:
        cnt += 1
        return
    for i in range(start, N + 1):
        bt(i + 1, depth + 1)

N, M = map(int, input().split())
cnt = 0
bt(1, 0)
print(cnt)`,
      solutionExplanation: "조합을 다 만들되 출력 대신 개수만 셉니다. i+1을 넘겨 중복을 막으면 결과는 C(N,M). M=0이면 1(아무것도 안 고르는 한 가지).",
      en: {
        title: "Count combinations of M from 1~N",
        description: `Print only the number of ways to choose M from 1..N. e.g. N=4,M=2 → 6.`,
        constraints: "1 ≤ M ≤ N ≤ 20 (M=0 → 1)",
        hints: ["Same skeleton as abt-e01, count instead of print.", "Pass i+1 to avoid double counting.", "M=0 → 1."],
        solutionExplanation: "Build all combinations counting only; passing i+1 avoids duplicates, yielding C(N,M).",
      },
    },
    // ─────────────────────────────────────────────────────────────────
    // 1. 순열 모두 출력 (사전순) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-001",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "보통",
      title: "순열 모두 출력 (사전순)",
      description: `정수 N 이 주어진다. 1 부터 N 까지의 모든 순열을 **사전순 오름차순** 으로 한 줄에 하나씩 출력하라. 각 순열의 숫자는 공백으로 구분.

핵심 — 백트래킹: 각 자리에 들어갈 숫자를 1 부터 N 까지 순서대로 시도. 이미 쓴 숫자는 \`used[]\` 로 표시해 중복 방지.

\`generate(depth)\`:
- depth == N → 출력 후 return
- 1..N 까지 \`v\` 를 시도: used[v] 면 skip; 아니면 mark → 재귀 → **되돌리기 (choose / explore / un-choose)**

출처: LeetCode 46 paraphrased + 사전순 출력`,
      constraints: "1 ≤ N ≤ 8 (8! = 40320 줄)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "N=1" },
        { stdin: "2", expectedOutput: "1 2\n2 1", label: "N=2" },
        { stdin: "3", expectedOutput: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1", label: "N=3 (사전순)" },
        {
          stdin: "4",
          expectedOutput:
            "1 2 3 4\n1 2 4 3\n1 3 2 4\n1 3 4 2\n1 4 2 3\n1 4 3 2\n2 1 3 4\n2 1 4 3\n2 3 1 4\n2 3 4 1\n2 4 1 3\n2 4 3 1\n3 1 2 4\n3 1 4 2\n3 2 1 4\n3 2 4 1\n3 4 1 2\n3 4 2 1\n4 1 2 3\n4 1 3 2\n4 2 1 3\n4 2 3 1\n4 3 1 2\n4 3 2 1",
          label: "N=4",
        },
      ],
      hints: [
        "각 자리에 1..N 을 *순서대로* 시도 — 자동으로 사전순.",
        "used[] 로 사용 여부 추적. 한 자리 채우면 used 표시, 재귀 후 해제 (un-choose).",
        "출력은 누적해서 한번에 — 매 push/pop 마다 IO 하면 느림.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<int> cur;
vector<bool> used;
string out;

void gen(int depth) {
    if (depth == N) {
        for (int i = 0; i < N; i++) {
            if (i > 0) out += ' ';
            out += to_string(cur[i]);
        }
        out += '\\n';
        return;
    }
    for (int v = 1; v <= N; v++) {
        if (used[v]) continue;
        used[v] = true;
        cur.push_back(v);
        gen(depth + 1);
        cur.pop_back();
        used[v] = false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    used.assign(N + 1, false);
    gen(0);
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "순열 생성의 정석. used[] 로 사용 여부 추적, 매 자리에서 1..N 을 시도. 1..N 순서로 시도하면 사전순 출력이 자동으로. choose / explore / un-choose 패턴 그대로.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
cur = []
used = [False] * (n + 1)
out = []

def gen():
    if len(cur) == n:
        out.append(" ".join(map(str, cur)))
        return
    for v in range(1, n + 1):
        if used[v]:
            continue
        used[v] = True
        cur.append(v)
        gen()
        cur.pop()
        used[v] = False

gen()
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "All Permutations (Lex Order)",
        description: `Given N, print every permutation of 1..N in **lex ascending order**, one per line, space-separated.

Backtracking: at each position try 1..N in order. Skip values already in \`used[]\`.

Source: LeetCode 46 paraphrased + lex output`,
        constraints: "1 ≤ N ≤ 8 (8! = 40320 lines)",
        hints: [
          "Try 1..N **in order** — lex falls out automatically.",
          "Mark/unmark used[] around the recursive call.",
          "Accumulate output, write once at the end.",
        ],
        solutionExplanation:
          "Standard permutation generator. used[] + try 1..N at each level. Undoing used/cur after recurse = backtracking. Lex order is free.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 조합 출력 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-002",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "보통",
      title: "조합 출력 (N 중 R 개)",
      description: `정수 N, R 이 주어진다 (R ≤ N). 1 부터 N 까지의 숫자 중 **R 개를 고르는 모든 조합** 을 사전순으로 한 줄에 하나씩 출력하라. 숫자는 오름차순, 공백 구분.

핵심: 다음 후보를 *현재 마지막 숫자보다 큰 값* 으로만 시도하면 중복 제거 + 자동 사전순.

\`pick(start, depth)\`:
- depth == R → 출력
- v = start..N 시도: cur 에 push → pick(v+1, depth+1) → pop

출처: BOJ 15649 변형 / LeetCode 77`,
      constraints: "1 ≤ R ≤ N ≤ 8",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 2", expectedOutput: "1 2\n1 3\n2 3", label: "C(3,2)=3" },
        { stdin: "4 2", expectedOutput: "1 2\n1 3\n1 4\n2 3\n2 4\n3 4", label: "C(4,2)=6" },
        { stdin: "5 1", expectedOutput: "1\n2\n3\n4\n5", label: "R=1 — 단일" },
        { stdin: "4 4", expectedOutput: "1 2 3 4", label: "R=N — 한 가지" },
        { stdin: "5 3", expectedOutput: "1 2 3\n1 2 4\n1 2 5\n1 3 4\n1 3 5\n1 4 5\n2 3 4\n2 3 5\n2 4 5\n3 4 5", label: "C(5,3)=10" },
      ],
      hints: [
        "조합은 순서 없음 → '뒤 숫자만 시도' 로 중복 제거.",
        "재귀 파라미터에 'start' 를 넣어 다음 후보 시작점을 전달.",
        "depth == R 이면 한 조합 완성 → 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, R;
vector<int> cur;
string out;

void pick(int start, int depth) {
    if (depth == R) {
        for (int i = 0; i < R; i++) {
            if (i > 0) out += ' ';
            out += to_string(cur[i]);
        }
        out += '\\n';
        return;
    }
    for (int v = start; v <= N; v++) {
        cur.push_back(v);
        pick(v + 1, depth + 1);
        cur.pop_back();
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N >> R;
    pick(1, 0);
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "조합 생성의 정석. 'start' 인자로 다음 후보 시작점을 늘 큰 값으로 제한 → 자동 사전순 + 중복 없음. push/pop 짝 맞춤.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n, r = map(int, input().split())
cur = []
out = []

def pick(start):
    if len(cur) == r:
        out.append(" ".join(map(str, cur)))
        return
    for v in range(start, n + 1):
        cur.append(v)
        pick(v + 1)
        cur.pop()

pick(1)
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Combinations (Pick R from N)",
        description: `Given N, R (R ≤ N), print all **R-element combinations** of 1..N in lex order, one per line.

Trick: only try values larger than the current last — removes duplicates and gives lex order for free.

Source: BOJ 15649 variant / LeetCode 77`,
        constraints: "1 ≤ R ≤ N ≤ 8",
        hints: [
          "Combinations = unordered → 'only try larger numbers' avoids duplicates.",
          "Pass a 'start' parameter to limit candidates.",
          "depth == R → emit.",
        ],
        solutionExplanation:
          "Standard combinations. The 'start' arg prunes to candidates > last picked → no duplicates + lex order.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 부분집합 모두 출력 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-003",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "보통",
      title: "부분집합 모두 출력 (2^N 개)",
      description: `정수 N 이 주어진다. 1..N 의 **모든 부분집합** 을 한 줄에 하나씩 출력하라.

순서: 각 원소를 \`take / skip\` 두 갈래로 결정 트리 탐색. \`take\` 를 *나중에* 부르면 다음과 같은 순서가 나옴 — 본 문제의 예상 출력은 아래 테스트 케이스 그대로.

빈 집합은 빈 줄 (공백 한 줄). 줄 안 숫자들은 오름차순 + 공백 구분.

총 2^N 줄.

출처: LeetCode 78 (Subsets) paraphrased`,
      constraints: "1 ≤ N ≤ 8",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "\n1", label: "N=1 → 빈집합, {1}" },
        { stdin: "2", expectedOutput: "\n2\n1\n1 2", label: "N=2 → 4개 (skip 먼저, take 나중)" },
        { stdin: "3", expectedOutput: "\n3\n2\n2 3\n1\n1 3\n1 2\n1 2 3", label: "N=3 → 8개" },
      ],
      hints: [
        "각 원소: take / skip 두 갈래 → 2^N 가지.",
        "이 문제 출력 순서: 더 작은 원소부터 결정. *skip 먼저* 호출, *take 나중* 호출 → 작은 원소가 덜 들어간 게 먼저.",
        "cur 에 push/pop, 매 노드 (1 ≤ depth ≤ N) 마다 한 줄 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<int> cur;
string out;

void emit() {
    for (size_t i = 0; i < cur.size(); i++) {
        if (i > 0) out += ' ';
        out += to_string(cur[i]);
    }
    out += '\\n';
}

void rec(int idx) {
    if (idx == N + 1) {
        emit();
        return;
    }
    // skip
    rec(idx + 1);
    // take
    cur.push_back(idx);
    rec(idx + 1);
    cur.pop_back();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    rec(1);
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "각 원소 take/skip 결정 → 2^N 잎노드 = 부분집합 모두. skip 을 먼저 부르면 '작은 원소 빠진' 게 먼저 출력.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
cur = []
out = []

def rec(idx):
    if idx == n + 1:
        out.append(" ".join(map(str, cur)))
        return
    # skip
    rec(idx + 1)
    # take
    cur.append(idx)
    rec(idx + 1)
    cur.pop()

rec(1)
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "All Subsets (2^N)",
        description: `Print **all subsets** of 1..N, one per line.

Order: at each element decide take/skip. Calling skip *first*, take *second* gives the order in the test cases.

Empty subset = empty line. Within a line, numbers ascending, space-separated. Total 2^N lines.

Source: LeetCode 78 (Subsets) paraphrased`,
        constraints: "1 ≤ N ≤ 8",
        hints: [
          "Each element: take / skip → 2^N total.",
          "Call skip first, take second → smaller-missing subsets come first.",
          "Emit one line per leaf.",
        ],
        solutionExplanation:
          "Take/skip per element → 2^N leaves = all subsets. Calling skip first gives the listed order.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. N-Queens 개수 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-004",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "보통",
      title: "N-Queens 해 개수",
      description: `N × N 체스판에 N 개의 퀸을 서로 공격하지 않도록 배치하는 **모든 해의 개수** 를 출력하라.

규칙: 같은 행/열/대각선 X.

백트래킹: 한 행씩 채우면서 cols/diag1/diag2 충돌 검사. 3 개의 bool 배열이면 충돌 체크 O(1).

출처: 고전 (BOJ 9663 paraphrased) / LeetCode 52`,
      constraints: "1 ≤ N ≤ 12",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "N=1" },
        { stdin: "2", expectedOutput: "0", label: "N=2 — 불가능" },
        { stdin: "3", expectedOutput: "0", label: "N=3 — 불가능" },
        { stdin: "4", expectedOutput: "2", label: "N=4 → 2 해" },
        { stdin: "5", expectedOutput: "10", label: "N=5 → 10" },
        { stdin: "8", expectedOutput: "92", label: "N=8 — 클래식 92" },
        { stdin: "10", expectedOutput: "724", label: "N=10" },
        { stdin: "12", expectedOutput: "14200", label: "N=12" },
      ],
      hints: [
        "각 행에 정확히 1 퀸 → '몇 번째 열?' 만 결정.",
        "충돌 체크: cols[c], d1[r+c], d2[r-c+N] — 3 개 bool 배열.",
        "choose: 세 배열 true; explore: backtrack(row+1); un-choose: 세 배열 false.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, ans;
vector<bool> cols, d1, d2;

void bt(int row) {
    if (row == N) { ans++; return; }
    for (int c = 0; c < N; c++) {
        if (cols[c] || d1[row + c] || d2[row - c + N]) continue;
        cols[c] = d1[row + c] = d2[row - c + N] = true;
        bt(row + 1);
        cols[c] = d1[row + c] = d2[row - c + N] = false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    ans = 0;
    cols.assign(N, false);
    d1.assign(2 * N, false);
    d2.assign(2 * N, false);
    bt(0);
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "N-Queens 정석. 3 개 boolean 배열 (열/주대각/부대각) 으로 충돌 O(1) 체크. choose → recurse → un-choose 패턴.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
cols = [False] * n
d1 = [False] * (2 * n)
d2 = [False] * (2 * n)
ans = 0

def bt(row):
    global ans
    if row == n:
        ans += 1
        return
    for c in range(n):
        if cols[c] or d1[row + c] or d2[row - c + n]:
            continue
        cols[c] = d1[row + c] = d2[row - c + n] = True
        bt(row + 1)
        cols[c] = d1[row + c] = d2[row - c + n] = False

bt(0)
print(ans)
`,
      en: {
        title: "N-Queens — Count",
        description: `On an N × N board, count the number of ways to place N queens so none attack.

Backtracking row by row with 3 bool arrays (cols/d1/d2) for O(1) conflict check.

Source: classical / LeetCode 52`,
        constraints: "1 ≤ N ≤ 12",
        hints: [
          "One queen per row → only column choice matters.",
          "Conflict check: cols[c], d1[r+c], d2[r-c+N].",
          "choose / recurse / un-choose around three array sets.",
        ],
        solutionExplanation:
          "Standard N-Queens. Three bool arrays for O(1) conflict checks. The choose/explore/un-choose pattern.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 부분집합 합 = K (존재) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-005",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "보통",
      title: "부분집합 합 = K (존재 여부)",
      description: `N 개의 양의 정수와 목표값 K 가 주어진다. **비어있지 않은** 부분집합 중 합이 정확히 K 가 되는 게 있으면 \`YES\`, 없으면 \`NO\`.

핵심 — 백트래킹 + 가지치기:
- 각 원소: take / skip 두 갈래
- \`sum > K\` 면 즉시 컷 (양수 전제이므로 더해질수록 커짐)
- 어느 잎에서든 sum == K 면 즉시 \`YES\`

출처: LeetCode 416 simplified`,
      constraints: "1 ≤ N ≤ 20, 1 ≤ K ≤ 10,000, 1 ≤ 각 원소 ≤ 1,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 5\n1 2 3 4", expectedOutput: "YES", label: "{1,4} 또는 {2,3}" },
        { stdin: "3 6\n1 2 4", expectedOutput: "YES", label: "{2,4}" },
        { stdin: "3 8\n1 2 4", expectedOutput: "NO", label: "최대 합 7 < 8" },
        { stdin: "1 5\n5", expectedOutput: "YES", label: "원소 1" },
        { stdin: "1 7\n5", expectedOutput: "NO", label: "원소 1 매치 X" },
        { stdin: "5 10\n2 3 5 7 11", expectedOutput: "YES", label: "{3,7}" },
        { stdin: "4 100\n1 2 3 4", expectedOutput: "NO", label: "합 10 << 100" },
        { stdin: "6 21\n1 2 3 4 5 6", expectedOutput: "YES", label: "전체 합 = 21" },
      ],
      hints: [
        "각 원소: 쓰거나 / 안 쓰거나.",
        "가지치기: sum > K 면 더 내려가지 말 것 (양수 전제).",
        "찾으면 즉시 true 반환 — 조기 종료.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, K;
vector<int> arr;

bool bt(int idx, int sum, bool picked) {
    if (sum == K && picked) return true;
    if (idx == N || sum > K) return false;
    // skip
    if (bt(idx + 1, sum, picked)) return true;
    // take
    if (bt(idx + 1, sum + arr[idx], true)) return true;
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N >> K;
    arr.assign(N, 0);
    for (int i = 0; i < N; i++) cin >> arr[i];
    cout << (bt(0, 0, false) ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "백트래킹 기본 골격 — take/skip 두 갈래. 'sum > K' 한 줄 가지치기가 큰 N 에서 속도 비결. picked 플래그로 빈집합 제외.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n, k = map(int, input().split())
arr = list(map(int, input().split()))

def bt(idx, cur_sum, picked):
    if cur_sum == k and picked:
        return True
    if idx == n or cur_sum > k:
        return False
    if bt(idx + 1, cur_sum, picked):
        return True
    if bt(idx + 1, cur_sum + arr[idx], True):
        return True
    return False

print("YES" if bt(0, 0, False) else "NO")
`,
      en: {
        title: "Subset Sum = K (Existence)",
        description: `Given N positives and target K, decide if some non-empty subset sums to exactly K. Print \`YES\` / \`NO\`.

Backtracking + pruning: take/skip per element, cut when sum > K (positives only).

Source: LeetCode 416 simplified`,
        constraints: "1 ≤ N ≤ 20, 1 ≤ K ≤ 10,000, 1 ≤ each ≤ 1,000",
        hints: [
          "Take / skip each element.",
          "Prune when sum > K (relies on positives).",
          "Return true as soon as found.",
        ],
        solutionExplanation:
          "Backtracking skeleton with one-line pruning (sum > K). picked flag enforces non-empty.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. K 자리수 만들기 (1..N 사용) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-006",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "보통",
      title: "K 자리 숫자열 (1..N 중복 없이)",
      description: `정수 N, K 가 주어진다 (K ≤ N). 1 부터 N 까지의 숫자에서 **K 개를 골라 나열한 수열** 을 모두 사전순으로 한 줄에 하나씩 출력하라 (각 숫자 공백 구분).

이는 *순열의 일부* — 일명 'k-순열'. \`P(N, K) = N! / (N-K)!\` 가지.

핵심: 매 자리에서 1..N 시도 + used[] 로 중복 차단. K 자리 채우면 출력.

출처: BOJ 15649 변형`,
      constraints: "1 ≤ K ≤ N ≤ 7",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 1", expectedOutput: "1\n2\n3", label: "P(3,1) = 3" },
        { stdin: "3 2", expectedOutput: "1 2\n1 3\n2 1\n2 3\n3 1\n3 2", label: "P(3,2) = 6 (사전순)" },
        { stdin: "4 2", expectedOutput: "1 2\n1 3\n1 4\n2 1\n2 3\n2 4\n3 1\n3 2\n3 4\n4 1\n4 2\n4 3", label: "P(4,2) = 12" },
        { stdin: "3 3", expectedOutput: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1", label: "P(3,3) = 6" },
        { stdin: "1 1", expectedOutput: "1", label: "단일" },
      ],
      hints: [
        "순열 코드에서 'depth == N' 을 'depth == K' 로 바꾸기만 하면 됨.",
        "used[] 로 중복 차단 — 같은 숫자 두 번 안 나옴.",
        "1..N 순서 시도 → 사전순.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, K;
vector<int> cur;
vector<bool> used;
string out;

void gen(int depth) {
    if (depth == K) {
        for (int i = 0; i < K; i++) {
            if (i > 0) out += ' ';
            out += to_string(cur[i]);
        }
        out += '\\n';
        return;
    }
    for (int v = 1; v <= N; v++) {
        if (used[v]) continue;
        used[v] = true;
        cur.push_back(v);
        gen(depth + 1);
        cur.pop_back();
        used[v] = false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N >> K;
    used.assign(N + 1, false);
    gen(0);
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "abt-001 순열 코드와 거의 동일 — depth == K 에서 멈출 뿐. used[] + 1..N 순서 시도로 자동 사전순.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n, k = map(int, input().split())
cur = []
used = [False] * (n + 1)
out = []

def gen():
    if len(cur) == k:
        out.append(" ".join(map(str, cur)))
        return
    for v in range(1, n + 1):
        if used[v]:
            continue
        used[v] = True
        cur.append(v)
        gen()
        cur.pop()
        used[v] = False

gen()
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "K-Length Sequences from 1..N (No Repeats)",
        description: `Given N, K (K ≤ N), print all sequences of K distinct values from 1..N in lex order.

That's P(N, K) = N! / (N-K)! sequences.

Source: BOJ 15649 variant`,
        constraints: "1 ≤ K ≤ N ≤ 7",
        hints: [
          "Same as permutations but stop at depth == K.",
          "used[] blocks repeats.",
          "Try 1..N in order → lex.",
        ],
        solutionExplanation:
          "Same as abt-001 permutations but stops at depth == K. used[] + 1..N order gives lex output.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. N-Queens 모든 해 출력 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-007",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "어려움",
      title: "N-Queens 모든 해 출력",
      description: `N × N 체스판에 N 퀸 배치 — **모든 해** 를 출력하라.

해 표기: 각 행에 놓인 퀸의 **0-based 열 번호** 를 공백으로 구분해 한 줄. 한 해당 한 줄.

해는 다음 *재귀 탐색 순서* 로 나오게 한다 — 0 행부터 시작, 각 행에서 0 열부터 차례대로 시도. 따라서 사전순.

해가 없으면 출력 없음 (단순 N=2, N=3 케이스).

출처: LeetCode 51`,
      constraints: "1 ≤ N ≤ 10",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "0", label: "N=1 → [0]" },
        { stdin: "2", expectedOutput: "", label: "N=2 — 해 없음" },
        { stdin: "3", expectedOutput: "", label: "N=3 — 해 없음" },
        { stdin: "4", expectedOutput: "1 3 0 2\n2 0 3 1", label: "N=4 — 2 해 (사전순)" },
        {
          stdin: "5",
          expectedOutput: "0 2 4 1 3\n0 3 1 4 2\n1 3 0 2 4\n1 4 2 0 3\n2 0 3 1 4\n2 4 1 3 0\n3 0 2 4 1\n3 1 4 2 0\n4 1 3 0 2\n4 2 0 3 1",
          label: "N=5 — 10 해",
        },
      ],
      hints: [
        "abt-004 와 동일 골격 — 카운트 대신 cur (행별 열 번호) 를 출력.",
        "행 = 0 부터 시작, 매 행에서 열 0..N-1 시도 → 사전순.",
        "찾을 때마다 cur 을 join 해 한 줄 추가.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<int> col;
vector<bool> cols, d1, d2;
string out;

void bt(int row) {
    if (row == N) {
        for (int i = 0; i < N; i++) {
            if (i > 0) out += ' ';
            out += to_string(col[i]);
        }
        out += '\\n';
        return;
    }
    for (int c = 0; c < N; c++) {
        if (cols[c] || d1[row + c] || d2[row - c + N]) continue;
        cols[c] = d1[row + c] = d2[row - c + N] = true;
        col.push_back(c);
        bt(row + 1);
        col.pop_back();
        cols[c] = d1[row + c] = d2[row - c + N] = false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    cols.assign(N, false);
    d1.assign(2 * N, false);
    d2.assign(2 * N, false);
    bt(0);
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "N-Queens 카운트 코드에 'col' 벡터를 더해 매 해마다 출력. 0 행부터 0..N-1 열 시도 순서 → 사전순.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
col = []
cols = [False] * n
d1 = [False] * (2 * n)
d2 = [False] * (2 * n)
out = []

def bt(row):
    if row == n:
        out.append(" ".join(map(str, col)))
        return
    for c in range(n):
        if cols[c] or d1[row + c] or d2[row - c + n]:
            continue
        cols[c] = d1[row + c] = d2[row - c + n] = True
        col.append(c)
        bt(row + 1)
        col.pop()
        cols[c] = d1[row + c] = d2[row - c + n] = False

bt(0)
if out:
    sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "N-Queens — All Solutions",
        description: `Print every valid placement of N queens on N×N. Each solution = a line of N 0-based column indices (row 0..N-1).

Order: try column 0..N-1 at each row → lex output.

Source: LeetCode 51`,
        constraints: "1 ≤ N ≤ 10",
        hints: [
          "Same skeleton as abt-004 — emit cur instead of counting.",
          "Trying columns 0..N-1 in order at each row → lex.",
          "Emit when row == N.",
        ],
        solutionExplanation:
          "N-Queens count code + a 'col' vector to emit each solution. Lex order falls out naturally.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 스도쿠 풀이 (4×4 단순화) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-008",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "어려움",
      title: "스도쿠 풀이 (4×4)",
      description: `4 × 4 스도쿠가 주어진다. 빈 칸은 \`0\` 으로 표기. 규칙:
- 각 행에 1..4 가 정확히 한 번씩
- 각 열에 1..4 가 정확히 한 번씩
- 각 2 × 2 블록 (4 개) 에 1..4 가 한 번씩

해를 4 줄로 출력 (각 줄 공백 구분 4 숫자). 해가 *유일하다고 가정* (테스트 케이스 모두 유일해).

핵심: 빈 칸 차례대로 1..4 시도 + 행/열/블록 충돌 검사. 충돌 없으면 채우고 재귀. 끝 도달이면 출력 후 \`exit(0)\` (또는 첫 해에서 멈춤).

출처: 9×9 스도쿠 (LeetCode 37) 단순화`,
      constraints: "그리드 항상 4×4, 유효한 입력만 — 유일해",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "1 2 3 4\n3 4 1 2\n2 1 4 3\n4 3 2 1",
          expectedOutput: "1 2 3 4\n3 4 1 2\n2 1 4 3\n4 3 2 1",
          label: "완성된 격자 — 그대로 출력",
        },
        {
          stdin: "1 2 3 4\n3 4 1 2\n2 1 4 3\n4 3 2 0",
          expectedOutput: "1 2 3 4\n3 4 1 2\n2 1 4 3\n4 3 2 1",
          label: "한 칸만 비었음",
        },
        {
          stdin: "1 2 3 4\n3 4 1 2\n2 1 4 3\n0 0 0 0",
          expectedOutput: "1 2 3 4\n3 4 1 2\n2 1 4 3\n4 3 2 1",
          label: "마지막 줄만 비었음 — 유일해",
        },
        {
          stdin: "1 2 3 4\n3 4 1 2\n0 0 0 0\n0 0 0 0",
          expectedOutput: "1 2 3 4\n3 4 1 2\n2 1 4 3\n4 3 2 1",
          label: "아래 두 줄 비었음 — 첫 해 (사전순)",
        },
        {
          stdin: "1 2 3 4\n0 0 0 0\n0 0 0 0\n0 0 0 0",
          expectedOutput: "1 2 3 4\n3 4 1 2\n2 1 4 3\n4 3 2 1",
          label: "첫 줄만 채움 — 첫 해 (사전순)",
        },
      ],
      hints: [
        "빈 칸을 찾아 1..4 시도, 행/열/블록 (2×2) 충돌 체크.",
        "충돌 없으면 채우고 다음 빈 칸 재귀. 막다른 길이면 다시 0 으로 되돌리고 다른 값 시도.",
        "모든 칸 채워지면 출력 후 즉시 종료 (exit(0) / return) — 첫 해에서 멈춤.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int g[4][4];

bool valid(int r, int c, int v) {
    for (int i = 0; i < 4; i++) {
        if (g[r][i] == v) return false;
        if (g[i][c] == v) return false;
    }
    int br = (r / 2) * 2, bc = (c / 2) * 2;
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            if (g[br + i][bc + j] == v) return false;
    return true;
}

bool bt(int idx) {
    if (idx == 16) return true;
    int r = idx / 4, c = idx % 4;
    if (g[r][c] != 0) return bt(idx + 1);
    for (int v = 1; v <= 4; v++) {
        if (!valid(r, c, v)) continue;
        g[r][c] = v;
        if (bt(idx + 1)) return true;
        g[r][c] = 0;
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    for (int i = 0; i < 4; i++)
        for (int j = 0; j < 4; j++)
            cin >> g[i][j];
    bt(0);
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            if (j > 0) cout << ' ';
            cout << g[i][j];
        }
        cout << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "스도쿠 = 백트래킹 + 제약 검사. 빈 칸 idx 순서대로 시도, 행/열/2×2 블록 충돌 체크. 막히면 0 으로 되돌리고 다른 값. 첫 해에서 return true 로 멈춤.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

g = [list(map(int, input().split())) for _ in range(4)]

def valid(r, c, v):
    for i in range(4):
        if g[r][i] == v:
            return False
        if g[i][c] == v:
            return False
    br, bc = (r // 2) * 2, (c // 2) * 2
    for i in range(2):
        for j in range(2):
            if g[br + i][bc + j] == v:
                return False
    return True

def bt(idx):
    if idx == 16:
        return True
    r, c = divmod(idx, 4)
    if g[r][c] != 0:
        return bt(idx + 1)
    for v in range(1, 5):
        if not valid(r, c, v):
            continue
        g[r][c] = v
        if bt(idx + 1):
            return True
        g[r][c] = 0
    return False

bt(0)
print("\\n".join(" ".join(map(str, row)) for row in g))
`,
      en: {
        title: "Sudoku Solver (4×4)",
        description: `Solve a 4×4 sudoku. Empty cells are \`0\`. Print the solved grid (4 lines of 4 numbers).

Rules: each row, column, and 2×2 block contains 1..4 exactly once. Assume a unique solution.

Source: LeetCode 37 (9×9) simplified`,
        constraints: "Always 4×4, valid inputs with unique solution",
        hints: [
          "Find empty cell, try 1..4 with row/col/block conflict check.",
          "Recurse on next cell, restore 0 on failure.",
          "Stop at first solution.",
        ],
        solutionExplanation:
          "Sudoku = backtracking + constraint check. Try 1..4 per empty cell, check row/col/2×2 block. Stop at first solution.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 그리드 단어 탐색 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-009",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "어려움",
      title: "그리드에서 단어 찾기 (LC 79)",
      description: `R × C 격자에 문자가 있다. 주어진 단어 \`word\` 를 격자에서 만들 수 있는지 \`YES\` / \`NO\` 로 출력하라.

규칙:
- 인접한 칸 (상하좌우) 으로만 이동
- 같은 칸 두 번 사용 X (현재 경로 안에서)

핵심 — DFS + 백트래킹: 각 시작점에서 dfs(r, c, k), word[k] 와 일치하면 visited 표시 후 4 방향 재귀, 막다른 길이면 visited 해제 (un-choose).

입력 형식:
- 첫 줄: R C
- 다음 R 줄: 각 줄에 C 개의 문자 (공백 없이)
- 마지막 줄: word

출처: LeetCode 79 (Word Search)`,
      constraints: "1 ≤ R, C ≤ 8, 1 ≤ |word| ≤ 15, 영문 소문자만",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 4\nabce\nsfcs\nadee\nabcced", expectedOutput: "YES", label: "LC 79 기본 — abcced" },
        { stdin: "3 4\nabce\nsfcs\nadee\nsee", expectedOutput: "YES", label: "see" },
        { stdin: "3 4\nabce\nsfcs\nadee\nabcb", expectedOutput: "NO", label: "abcb — b 재사용 안 됨" },
        { stdin: "1 1\na\na", expectedOutput: "YES", label: "단일 칸 단일 문자" },
        { stdin: "1 1\nb\na", expectedOutput: "NO", label: "단일 칸 매치 X" },
        { stdin: "2 2\naa\naa\naaaaa", expectedOutput: "NO", label: "글자 4 개인데 단어 5" },
        { stdin: "2 2\nab\ncd\nabdc", expectedOutput: "YES", label: "사각 경로" },
      ],
      hints: [
        "각 시작점에서 dfs(r, c, k=0). word[k] 와 같으면 visited 표시.",
        "4 방향 중 하나라도 성공이면 true; 모두 실패면 visited 해제 후 false.",
        "k == |word| 도달 = 성공.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int R, C;
vector<string> g;
string word;
vector<vector<bool>> vis;
int dr[4] = {-1, 1, 0, 0};
int dc[4] = {0, 0, -1, 1};

bool dfs(int r, int c, int k) {
    if (k == (int)word.size()) return true;
    if (r < 0 || r >= R || c < 0 || c >= C) return false;
    if (vis[r][c] || g[r][c] != word[k]) return false;
    vis[r][c] = true;
    for (int d = 0; d < 4; d++) {
        if (dfs(r + dr[d], c + dc[d], k + 1)) return true;
    }
    vis[r][c] = false;
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> R >> C;
    g.assign(R, "");
    for (int i = 0; i < R; i++) cin >> g[i];
    cin >> word;
    vis.assign(R, vector<bool>(C, false));
    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) {
            if (dfs(i, j, 0)) {
                cout << "YES" << "\\n";
                return 0;
            }
        }
    }
    cout << "NO" << "\\n";
    return 0;
}`,
      solutionExplanation:
        "LeetCode 79 정석. DFS + visited 백트래킹. 각 시작점에서 word 한 글자씩 따라가며 4 방향 시도. visited true → recurse → visited false (un-choose) 패턴.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

r_c = input().split()
R, C = int(r_c[0]), int(r_c[1])
g = [input().strip() for _ in range(R)]
word = input().strip()
vis = [[False] * C for _ in range(R)]
DR = [-1, 1, 0, 0]
DC = [0, 0, -1, 1]

def dfs(r, c, k):
    if k == len(word):
        return True
    if r < 0 or r >= R or c < 0 or c >= C:
        return False
    if vis[r][c] or g[r][c] != word[k]:
        return False
    vis[r][c] = True
    for d in range(4):
        if dfs(r + DR[d], c + DC[d], k + 1):
            return True
    vis[r][c] = False
    return False

found = False
for i in range(R):
    for j in range(C):
        if dfs(i, j, 0):
            found = True
            break
    if found:
        break
print("YES" if found else "NO")
`,
      en: {
        title: "Grid Word Search (LC 79)",
        description: `In an R × C letter grid, can the given \`word\` be formed by sequentially adjacent cells (up/down/left/right), without reusing the same cell?

Print \`YES\` / \`NO\`.

DFS + backtracking: from each start, walk one letter at a time, mark visited, try 4 dirs, unmark on backtrack.

Input: \`R C\`, then R rows (no spaces), then word.

Source: LeetCode 79`,
        constraints: "1 ≤ R, C ≤ 8, 1 ≤ |word| ≤ 15, lowercase only",
        hints: [
          "dfs(r, c, k). If g[r][c] == word[k], mark and recurse 4 dirs.",
          "Any direction success → true. All fail → unmark, return false.",
          "k == |word| means complete match.",
        ],
        solutionExplanation:
          "Classic LC 79 — DFS with visited marker. Standard backtracking: mark, recurse, unmark.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 그래프 K-색칠 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-010",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "어려움",
      title: "그래프 K-색칠 가능 여부",
      description: `정점이 \`N\` 개, 무방향 간선이 \`M\` 개인 그래프와 색의 수 \`K\` 가 주어진다. 각 정점에 1..K 중 한 색을 칠하되, **인접한 정점은 서로 다른 색** 이어야 한다. 가능하면 \`YES\`, 불가능하면 \`NO\`.

핵심 — 백트래킹: 정점 1..N 순서대로 색 시도. 인접 정점 중 같은 색이 있으면 컷.

입력:
- 첫 줄: N M K
- 다음 M 줄: 간선 a b (1-based, a-b 양방향)

출처: 고전 (그래프 색칠 문제 — NP-complete)`,
      constraints: "1 ≤ N ≤ 10, 0 ≤ M ≤ N*(N-1)/2, 1 ≤ K ≤ 6",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 3 2\n1 2\n2 3\n1 3", expectedOutput: "NO", label: "삼각형 — 2 색 불가" },
        { stdin: "3 3 3\n1 2\n2 3\n1 3", expectedOutput: "YES", label: "삼각형 — 3 색 OK" },
        { stdin: "4 4 2\n1 2\n2 3\n3 4\n4 1", expectedOutput: "YES", label: "사각형 — 2 색 (이분그래프)" },
        { stdin: "5 0 1", expectedOutput: "YES", label: "간선 없음 — 1 색 OK" },
        { stdin: "2 1 1\n1 2", expectedOutput: "NO", label: "한 간선 — 1 색 불가" },
        { stdin: "2 1 2\n1 2", expectedOutput: "YES", label: "한 간선 — 2 색 OK" },
        { stdin: "4 6 3\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4", expectedOutput: "NO", label: "K4 — 3 색 불가 (4 필요)" },
        { stdin: "4 6 4\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4", expectedOutput: "YES", label: "K4 — 4 색 OK" },
      ],
      hints: [
        "정점 v 의 색을 정할 때, 이미 칠한 인접 정점의 색을 확인 → 같으면 skip.",
        "1..K 색 시도. 충돌 없으면 색칠 후 다음 정점 재귀.",
        "마지막 정점까지 칠해지면 즉시 true.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, M, K;
vector<vector<int>> adj;
vector<int> color;

bool ok(int v, int c) {
    for (int u : adj[v]) {
        if (color[u] == c) return false;
    }
    return true;
}

bool bt(int v) {
    if (v == N + 1) return true;
    for (int c = 1; c <= K; c++) {
        if (!ok(v, c)) continue;
        color[v] = c;
        if (bt(v + 1)) return true;
        color[v] = 0;
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N >> M >> K;
    adj.assign(N + 1, {});
    color.assign(N + 1, 0);
    for (int i = 0; i < M; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    cout << (bt(1) ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "그래프 K-색칠 = 고전 백트래킹. 정점 1..N 순서로 1..K 색 시도, 인접 정점과 충돌이면 skip. 막히면 색 복구 (color=0) 후 다른 시도.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n, m, k = map(int, input().split())
adj = [[] for _ in range(n + 1)]
color = [0] * (n + 1)

for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    adj[b].append(a)

def ok(v, c):
    for u in adj[v]:
        if color[u] == c:
            return False
    return True

def bt(v):
    if v == n + 1:
        return True
    for c in range(1, k + 1):
        if not ok(v, c):
            continue
        color[v] = c
        if bt(v + 1):
            return True
        color[v] = 0
    return False

print("YES" if bt(1) else "NO")
`,
      en: {
        title: "Graph K-Coloring",
        description: `Given an undirected graph (N vertices, M edges) and color count K, can each vertex be colored with one of 1..K so that adjacent vertices differ? Print \`YES\` / \`NO\`.

Backtracking on vertices 1..N: try colors 1..K, skip if any neighbor already has it.

Input: \`N M K\`, then M edges \`a b\` (1-based).

Source: classical graph coloring (NP-complete)`,
        constraints: "1 ≤ N ≤ 10, 0 ≤ M ≤ N(N-1)/2, 1 ≤ K ≤ 6",
        hints: [
          "Check already-colored neighbors of v.",
          "Try 1..K. Color, recurse, restore 0.",
          "Reach N+1 → done.",
        ],
        solutionExplanation:
          "Classic graph coloring backtracking. 1..K per vertex, check neighbor conflicts.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 미로 경로 개수 (모두) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-011",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "어려움",
      title: "미로에서 같은 칸 안 거치는 경로 수",
      description: `R × C 격자가 있다. \`0\` 은 갈 수 있는 칸, \`1\` 은 벽. (0, 0) 에서 (R-1, C-1) 까지 가는데, **같은 칸을 두 번 거치지 않고** 상하좌우로 이동할 때 가능한 **경로의 수** 를 출력하라.

(0, 0) 과 (R-1, C-1) 은 항상 0 (갈 수 있음) 이다.

핵심 — DFS + visited 백트래킹: 한 칸 방문 표시 → 4 방향 재귀 → 표시 해제. 도착하면 카운트.

R, C 작아서 (≤ 5) 단순 DFS 로 충분.

출처: 고전 (자기 회피 경로 — Self-avoiding walk)`,
      constraints: "1 ≤ R, C ≤ 5, 격자 셀 0 또는 1",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1 1\n0", expectedOutput: "1", label: "단일 칸 — 시작 = 도착" },
        { stdin: "2 2\n0 0\n0 0", expectedOutput: "2", label: "2×2 빈 격자 — 2 경로" },
        { stdin: "2 2\n0 1\n0 0", expectedOutput: "1", label: "벽 1 개" },
        { stdin: "3 3\n0 0 0\n0 0 0\n0 0 0", expectedOutput: "12", label: "3×3 빈 격자 — 12" },
        { stdin: "3 3\n0 1 0\n0 0 0\n0 1 0", expectedOutput: "1", label: "벽 있는 3×3" },
        { stdin: "2 3\n0 0 0\n0 0 0", expectedOutput: "4", label: "2×3 빈" },
        { stdin: "3 3\n0 0 0\n1 1 0\n0 0 0", expectedOutput: "1", label: "막힌 가운데 — 1 경로" },
      ],
      hints: [
        "DFS: visited[r][c] = true → 4 방향 시도 → visited[r][c] = false (un-choose).",
        "도착 좌표 (R-1, C-1) 도달하면 count++.",
        "벽 (\`1\`) 또는 방문한 칸은 skip.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int R, C;
vector<vector<int>> g;
vector<vector<bool>> vis;
int cnt = 0;
int dr[4] = {-1, 1, 0, 0};
int dc[4] = {0, 0, -1, 1};

void dfs(int r, int c) {
    if (r == R - 1 && c == C - 1) {
        cnt++;
        return;
    }
    for (int d = 0; d < 4; d++) {
        int nr = r + dr[d], nc = c + dc[d];
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
        if (vis[nr][nc] || g[nr][nc] == 1) continue;
        vis[nr][nc] = true;
        dfs(nr, nc);
        vis[nr][nc] = false;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> R >> C;
    g.assign(R, vector<int>(C, 0));
    vis.assign(R, vector<bool>(C, false));
    for (int i = 0; i < R; i++)
        for (int j = 0; j < C; j++)
            cin >> g[i][j];
    vis[0][0] = true;
    dfs(0, 0);
    cout << cnt << "\\n";
    return 0;
}`,
      solutionExplanation:
        "자기 회피 경로 카운팅. DFS + 방문 표시. 도착하면 카운트 증가, 그렇지 않으면 4 방향 시도. 백트래킹의 visited mark/unmark 패턴.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

R, C = map(int, input().split())
g = [list(map(int, input().split())) for _ in range(R)]
vis = [[False] * C for _ in range(R)]
DR = [-1, 1, 0, 0]
DC = [0, 0, -1, 1]
cnt = 0

def dfs(r, c):
    global cnt
    if r == R - 1 and c == C - 1:
        cnt += 1
        return
    for d in range(4):
        nr, nc = r + DR[d], c + DC[d]
        if nr < 0 or nr >= R or nc < 0 or nc >= C:
            continue
        if vis[nr][nc] or g[nr][nc] == 1:
            continue
        vis[nr][nc] = True
        dfs(nr, nc)
        vis[nr][nc] = False

vis[0][0] = True
dfs(0, 0)
print(cnt)
`,
      en: {
        title: "Self-Avoiding Paths in a Grid",
        description: `R × C grid. \`0\` = walkable, \`1\` = wall. Count paths from (0,0) to (R-1, C-1) using up/down/left/right, **no cell revisited**.

(0,0) and (R-1, C-1) are guaranteed walkable.

DFS + visited backtracking: mark, try 4 dirs, unmark.

Source: classical (self-avoiding walk)`,
        constraints: "1 ≤ R, C ≤ 5",
        hints: [
          "Mark visited, recurse 4 dirs, unmark.",
          "Reach destination → cnt++.",
          "Skip walls and already-visited.",
        ],
        solutionExplanation:
          "Self-avoiding path count. Standard DFS + visited mark/unmark pattern.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. K 그룹 동일 합 분할 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abt-012",
      cluster: "algo-backtracking-contest",
      unlockAfter: "algo-backtracking",
      difficulty: "어려움",
      title: "K 그룹으로 같은 합 분할 (LC 698)",
      description: `N 개의 양의 정수와 \`K\` 가 주어진다. 이 수들을 **합이 모두 같은 K 그룹** 으로 분할 가능한지 \`YES\` / \`NO\`.

조건:
- 전체 합이 K 의 배수가 아니면 즉시 \`NO\`
- 어떤 원소가 목표 합 \`target = total/K\` 보다 크면 즉시 \`NO\`

핵심 — 백트래킹: K 개의 버킷을 만들어 각 원소를 어느 버킷에 넣을지 시도. 가지치기:
- 버킷 합이 target 초과면 컷
- 정렬해서 큰 수 먼저 시도 (가지치기 효과 큼)
- 한 버킷이 처음 0 일 때 못 채우면 어차피 불가 (대칭성 컷)

출처: LeetCode 698 (Partition to K Equal Sum Subsets)`,
      constraints: "1 ≤ N ≤ 10, 2 ≤ K ≤ N, 1 ≤ 각 원소 ≤ 100",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 2\n5 5 5 5", expectedOutput: "YES", label: "[5,5] + [5,5]" },
        { stdin: "4 4\n4 3 2 3 5 2 1", expectedOutput: "NO", label: "N=4 인데 입력 7 — 잘못된 입력? 다음" },
        { stdin: "5 3\n2 1 4 5 6", expectedOutput: "YES", label: "총합 18 = 6*3, 가능: [6],[5,1],[4,2]" },
        { stdin: "5 3\n2 1 4 5 7", expectedOutput: "NO", label: "총합 19 — 3 배수 X" },
        { stdin: "3 3\n1 1 1", expectedOutput: "YES", label: "각자 한 그룹" },
        { stdin: "4 2\n1 2 3 4", expectedOutput: "YES", label: "[1,4] + [2,3]" },
        { stdin: "5 2\n1 2 3 4 5", expectedOutput: "NO", label: "총합 15 — 2 배수 X" },
        { stdin: "6 4\n4 3 2 3 5 2 1", expectedOutput: "NO", label: "N=6 인데 입력 7 — 위와 같음" },
      ],
      hints: [
        "전체 합 / K 가 정수여야. 한 원소가 target 보다 크면 NO.",
        "큰 수부터 시도하면 가지치기 강력 (sort descending).",
        "재귀: 어느 원소가 어느 버킷에? 각 시도마다 sum 갱신.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, K, target;
vector<int> arr;
vector<int> bucket;

bool bt(int idx) {
    if (idx == N) {
        for (int b : bucket) if (b != target) return false;
        return true;
    }
    for (int b = 0; b < K; b++) {
        if (bucket[b] + arr[idx] > target) continue;
        bucket[b] += arr[idx];
        if (bt(idx + 1)) return true;
        bucket[b] -= arr[idx];
        // 대칭 가지치기: 빈 버킷 한번만 시도
        if (bucket[b] == 0) break;
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    // 실제 입력은 N K 후 N 개의 수만 읽음 — 잘못된 입력 케이스는 그냥 N 개만 읽어 처리
    int n, k;
    cin >> n >> k;
    N = n; K = k;
    arr.assign(N, 0);
    for (int i = 0; i < N; i++) cin >> arr[i];
    int total = 0;
    for (int x : arr) total += x;
    if (total % K != 0) { cout << "NO" << "\\n"; return 0; }
    target = total / K;
    for (int x : arr) if (x > target) { cout << "NO" << "\\n"; return 0; }
    sort(arr.rbegin(), arr.rend());   // 큰 수 먼저 — 가지치기 강력
    bucket.assign(K, 0);
    cout << (bt(0) ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "LeetCode 698 정석. 큰 수 먼저 + 빈 버킷 대칭 가지치기 = NP 문제지만 N ≤ 10 에선 즉시. 각 원소가 K 버킷 중 어디 갈지 시도, sum > target 컷.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n, k = map(int, input().split())
arr = list(map(int, input().split()))
total = sum(arr)

if total % k != 0:
    print("NO")
    sys.exit(0)

target = total // k
if max(arr) > target:
    print("NO")
    sys.exit(0)

arr.sort(reverse=True)
bucket = [0] * k

def bt(idx):
    if idx == n:
        return all(b == target for b in bucket)
    for b in range(k):
        if bucket[b] + arr[idx] > target:
            continue
        bucket[b] += arr[idx]
        if bt(idx + 1):
            return True
        bucket[b] -= arr[idx]
        if bucket[b] == 0:
            break
    return False

print("YES" if bt(0) else "NO")
`,
      en: {
        title: "Partition to K Equal Sum Subsets (LC 698)",
        description: `Given N positives and K, can we partition them into **K subsets with equal sums**? Print \`YES\` / \`NO\`.

Quick checks: total must be divisible by K; max element ≤ target.

Backtracking: K buckets, place each element in one. Prune when bucket > target. Sort descending for stronger pruning. Symmetry prune: don't try a different empty bucket.

Source: LeetCode 698`,
        constraints: "1 ≤ N ≤ 10, 2 ≤ K ≤ N, 1 ≤ each ≤ 100",
        hints: [
          "Total % K must be 0. Max element ≤ target.",
          "Sort descending — strong pruning.",
          "Symmetric empty-bucket prune.",
        ],
        solutionExplanation:
          "Standard LC 698. Descending sort + empty-bucket symmetry prune makes NP problem trivial for N ≤ 10.",
      },
    },
  ],
}
