import type { PracticeCluster } from "./types"

export const recursionContestCluster: PracticeCluster = {
  id: "algo-recursion-contest",
  title: "재귀 문제 풀이",
  emoji: "🔄",
  description: "베이스 + 재귀 호출 — 분할 정복, 백트래킹, 메모이제이션 패턴",
  unlockAfter: "algo-recursion",
  en: {
    title: "Recursion Practice",
    description: "Base + recurse — divide&conquer, backtracking, memoization",
  },
  problems: [
    // ─────────────────────────────────────────────────────────────────
    // 1. 팩토리얼 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-001",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "보통",
      title: "팩토리얼 (재귀)",
      description: `정수 N이 주어지면 N! = 1 × 2 × ... × N 을 출력하라. 단, **재귀로 작성** 하라.

\`0! = 1\` 로 정의한다.

출처: 원본 (재귀 첫 입문 — base case 한 줄, recurse 한 줄)`,
      constraints: "0 ≤ N ≤ 12 (int 범위 안전)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "0", expectedOutput: "1", label: "base case — 0! = 1" },
        { stdin: "1", expectedOutput: "1", label: "1! = 1" },
        { stdin: "5", expectedOutput: "120", label: "5! = 120" },
        { stdin: "10", expectedOutput: "3628800", label: "10! = 3,628,800" },
        { stdin: "12", expectedOutput: "479001600", label: "12! = 479,001,600 (int 한계)" },
      ],
      hints: [
        "base case: N=0 이면 1 반환.",
        "재귀 호출: factorial(N) = N * factorial(N-1).",
        "재귀 함수는 main 밖에 따로 정의하는 게 깔끔하다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long factorial(int n) {
    if (n == 0) return 1;       // base case
    return (long long)n * factorial(n - 1);  // recurse
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    cout << factorial(n) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "재귀의 기본 골격: base case + recursive case. N=0 에서 멈추고, 그 외에는 N * factorial(N-1) 로 더 작은 문제로 줄인다.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

n = int(input())
print(factorial(n))
`,
      en: {
        title: "Factorial (Recursion)",
        description: `Given N, print N! = 1 × 2 × ... × N. **Use recursion.**

By definition \`0! = 1\`.

Source: original (recursion entry — one base case line, one recurse line)`,
        constraints: "0 ≤ N ≤ 12 (fits in int)",
        hints: [
          "Base case: if N=0 return 1.",
          "Recursive case: factorial(N) = N * factorial(N-1).",
          "Define the recursive function outside main for clarity.",
        ],
        solutionExplanation:
          "Classic recursion skeleton: base case + recursive case. Stop at N=0; otherwise reduce to N * factorial(N-1).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 거듭제곱 (단순 재귀) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-002",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "보통",
      title: "거듭제곱 (단순 재귀)",
      description: `정수 \`base\` 와 \`n\` 이 주어진다. \`base^n\` 을 **재귀로 계산** 해 출력하라.

여기서는 단순 재귀 (O(N)) 만 쓴다. 빠른 거듭제곱은 \`arec-007\` 에서 다룬다.

\`base^0 = 1\` (n=0 이어도 OK).

출처: 원본 (선형 재귀 + base case 둘)`,
      constraints: "1 ≤ base ≤ 10, 0 ≤ n ≤ 18 (long long 안전)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "2 10", expectedOutput: "1024", label: "2^10" },
        { stdin: "3 4", expectedOutput: "81", label: "3^4" },
        { stdin: "5 0", expectedOutput: "1", label: "base case — 어떤 수^0 = 1" },
        { stdin: "7 1", expectedOutput: "7", label: "7^1 = 7" },
        { stdin: "10 18", expectedOutput: "1000000000000000000", label: "10^18 (long long 한계)" },
        { stdin: "1 17", expectedOutput: "1", label: "1^17 = 1" },
      ],
      hints: [
        "base case: n=0 이면 1 반환.",
        "재귀 호출: power(base, n) = base * power(base, n-1).",
        "결과가 큰 수가 될 수 있으니 long long 사용.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long power(long long base, int n) {
    if (n == 0) return 1;
    return base * power(base, n - 1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    long long base;
    int n;
    cin >> base >> n;
    cout << power(base, n) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "팩토리얼과 똑같은 골격 — base case (n=0 → 1) + 한 단계 줄이는 재귀 (base * power(base, n-1)). O(N) 재귀.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

def power(base, n):
    if n == 0:
        return 1
    return base * power(base, n - 1)

base, n = map(int, input().split())
print(power(base, n))
`,
      en: {
        title: "Power (Simple Recursion)",
        description: `Given \`base\` and \`n\`, compute \`base^n\` **recursively**.

Use simple O(N) recursion here. Fast exponentiation comes in \`arec-007\`.

\`base^0 = 1\` (n=0 is fine).

Source: original (linear recursion with base case)`,
        constraints: "1 ≤ base ≤ 10, 0 ≤ n ≤ 18 (fits in long long)",
        hints: [
          "Base case: n=0 returns 1.",
          "Recursive case: power(base, n) = base * power(base, n-1).",
          "Use long long since results can be huge.",
        ],
        solutionExplanation:
          "Same skeleton as factorial — base case (n=0 → 1) + recurse with smaller n. O(N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 배열 합 (재귀) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-003",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "보통",
      title: "배열 합 (재귀)",
      description: `N개의 정수가 주어진다. **반복문 없이 재귀** 로 합을 구해 출력하라.

함수 시그니처 예: \`sum(arr, idx)\` — idx 부터 끝까지의 합. base case 는 idx == N (빈 구간 → 0).

출처: 원본 (재귀로 반복 흉내내기 — 다음 단계 사고의 디딤돌)`,
      constraints: "1 ≤ N ≤ 1000, -10,000 ≤ 각 원소 ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "15", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42", label: "원소 1개" },
        { stdin: "3\n-1 -2 -3", expectedOutput: "-6", label: "음수만" },
        { stdin: "4\n10 -5 3 -8", expectedOutput: "0", label: "합이 0" },
        { stdin: "6\n100 200 300 400 500 600", expectedOutput: "2100", label: "큰 값" },
      ],
      hints: [
        "함수 인자에 '현재 인덱스' 를 넣어 한 칸씩 진행.",
        "base case: idx == N 이면 0 반환 (빈 구간 합 = 0).",
        "재귀: sum(idx) = arr[idx] + sum(idx + 1).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> arr;
int N;

long long sumFrom(int idx) {
    if (idx == N) return 0;          // base case
    return arr[idx] + sumFrom(idx + 1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    arr.assign(N, 0);
    for (int i = 0; i < N; i++) cin >> arr[i];
    cout << sumFrom(0) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "반복문을 '인덱스 늘리는 재귀' 로 바꾼 패턴. 한 원소를 처리하고 나머지를 재귀에 맡긴다. 이 사고가 나중에 분할 정복·백트래킹으로 확장된다.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
arr = list(map(int, input().split()))

def sum_from(idx):
    if idx == n:
        return 0
    return arr[idx] + sum_from(idx + 1)

print(sum_from(0))
`,
      en: {
        title: "Array Sum (Recursion)",
        description: `Given N integers, compute their sum **using recursion only — no loops**.

Suggested signature: \`sum(arr, idx)\` — sum from idx to end. Base case: idx == N (empty range → 0).

Source: original (recursion mimicking iteration — stepping stone for later)`,
        constraints: "1 ≤ N ≤ 1000, -10,000 ≤ each element ≤ 10,000",
        hints: [
          "Pass a 'current index' into the function and advance one step at a time.",
          "Base case: if idx == N return 0.",
          "Recurse: sum(idx) = arr[idx] + sum(idx + 1).",
        ],
        solutionExplanation:
          "A for-loop rewritten as 'index-advancing recursion'. Handle one element, delegate the rest. This thinking generalizes to divide-and-conquer and backtracking.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 회문 검사 (재귀) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-004",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "보통",
      title: "회문 검사 (재귀)",
      description: `영문 소문자 문자열이 주어진다. **재귀** 로 회문 (앞뒤가 같은 단어) 인지 검사해 \`YES\` / \`NO\` 를 출력하라.

방법: 두 포인터 \`l\`, \`r\` 을 양 끝에 두고 한 칸씩 안쪽으로 좁혀가며 비교.

base case 두 개:
- \`l >= r\` → 모두 통과, \`YES\`
- \`s[l] != s[r]\` → 즉시 \`NO\`

그 외 → 안쪽으로 재귀.

출처: 원본 (two-pointer 재귀 — 백트래킹 사고의 워밍업)`,
      constraints: "1 ≤ |s| ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "racecar", expectedOutput: "YES", label: "회문 (홀수 길이)" },
        { stdin: "abba", expectedOutput: "YES", label: "회문 (짝수 길이)" },
        { stdin: "hello", expectedOutput: "NO", label: "회문 아님" },
        { stdin: "a", expectedOutput: "YES", label: "글자 1개 — 항상 회문" },
        { stdin: "ab", expectedOutput: "NO", label: "글자 2개 — 다르면 NO" },
        { stdin: "aa", expectedOutput: "YES", label: "글자 2개 — 같으면 YES" },
        { stdin: "abcba", expectedOutput: "YES", label: "5글자 회문" },
      ],
      hints: [
        "함수 시그니처: \`bool isPalin(const string& s, int l, int r)\`.",
        "base case 우선 처리: l >= r → 모두 통과 → true.",
        "현재 단계 검사: s[l] != s[r] → false. 같으면 안쪽 (l+1, r-1) 으로 재귀.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

bool isPalin(const string& s, int l, int r) {
    if (l >= r) return true;              // base: 가운데 만남
    if (s[l] != s[r]) return false;       // 한 쌍이라도 다르면 끝
    return isPalin(s, l + 1, r - 1);      // 안쪽으로
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;
    cout << (isPalin(s, 0, (int)s.size() - 1) ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "두 포인터 재귀 패턴 — 양 끝에서 안쪽으로 좁혀간다. base case 두 개를 먼저 검사 (만났는지 / 달랐는지), 통과하면 한 칸씩 좁혀 재귀.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

def is_palin(s, l, r):
    if l >= r:
        return True
    if s[l] != s[r]:
        return False
    return is_palin(s, l + 1, r - 1)

s = input().strip()
print("YES" if is_palin(s, 0, len(s) - 1) else "NO")
`,
      en: {
        title: "Palindrome Check (Recursion)",
        description: `Given a lowercase English string, use **recursion** to check whether it's a palindrome. Print \`YES\` or \`NO\`.

Approach: two pointers \`l\`, \`r\` at each end, walk inward.

Two base cases:
- \`l >= r\` → all matched → \`YES\`
- \`s[l] != s[r]\` → immediate \`NO\`

Otherwise recurse inward.

Source: original (two-pointer recursion — backtracking warm-up)`,
        constraints: "1 ≤ |s| ≤ 1000",
        hints: [
          "Signature: \`bool isPalin(const string& s, int l, int r)\`.",
          "Check base cases first: l >= r → true.",
          "Step check: s[l] != s[r] → false; otherwise recurse on (l+1, r-1).",
        ],
        solutionExplanation:
          "Two-pointer recursion — close in from both ends. Check the two base cases first (met in middle / mismatch), otherwise step in by one and recurse.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 거꾸로 출력 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-005",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "보통",
      title: "1부터 N까지 거꾸로 출력 (재귀)",
      description: `정수 N이 주어진다. **재귀** 로 N, N-1, ..., 2, 1 을 한 줄에 공백으로 구분해 출력하라.

핵심: 출력을 **재귀 호출 전에** 할지 후에 할지에 따라 순서가 뒤바뀐다. 거꾸로 출력하려면 **호출 전** 에 현재 값을 출력하면 된다.

비교: 같은 함수에서 출력을 호출 후로 옮기면 1, 2, ..., N (정방향) 이 된다 — 직접 실험해보면 재귀 흐름이 보인다.

출처: 원본 (recursion 호출 순서 사고력)`,
      constraints: "1 ≤ N ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5", expectedOutput: "5 4 3 2 1", label: "기본" },
        { stdin: "1", expectedOutput: "1", label: "N=1" },
        { stdin: "10", expectedOutput: "10 9 8 7 6 5 4 3 2 1", label: "N=10" },
        { stdin: "3", expectedOutput: "3 2 1", label: "작은 N" },
      ],
      hints: [
        "함수 \`printDown(k)\`: k 부터 1 까지 출력.",
        "base case: k < 1 이면 끝.",
        "현재 값을 먼저 출력하고 재귀 — 호출 전 출력이 거꾸로의 비결.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

void printDown(int k, bool first) {
    if (k < 1) return;
    if (!first) cout << ' ';
    cout << k;
    printDown(k - 1, false);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    printDown(n, true);
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "재귀 호출 전에 출력하면 큰 값부터, 후에 출력하면 작은 값부터 — 호출 순서와 출력 순서의 관계가 이 문제의 핵심.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

out = []

def print_down(k):
    if k < 1:
        return
    out.append(str(k))
    print_down(k - 1)

n = int(input())
print_down(n)
print(" ".join(out))
`,
      en: {
        title: "Print N down to 1 (Recursion)",
        description: `Given N, use **recursion** to print N, N-1, ..., 2, 1 on a single line separated by spaces.

Key idea: whether you print **before** or **after** the recursive call flips the order. To go from large to small, print **before** the call.

Compare: moving the print to after the call gives 1, 2, ..., N — try it to feel the recursion flow.

Source: original (recursion call-order thinking)`,
        constraints: "1 ≤ N ≤ 1000",
        hints: [
          "Function \`printDown(k)\`: prints k down to 1.",
          "Base case: if k < 1 return.",
          "Print current value first, then recurse — the 'before' is what reverses the order.",
        ],
        solutionExplanation:
          "Printing before the recursive call gives large→small; printing after gives small→large. The order of operations relative to the recursive call is the lesson.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. GCD (유클리드 호제법) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-006",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "보통",
      title: "최대공약수 (유클리드 호제법)",
      description: `두 정수 \`a\`, \`b\` 가 주어진다. **재귀로 유클리드 호제법** 을 구현해 최대공약수 GCD(a, b) 를 출력하라.

핵심 정리: \`gcd(a, b) = gcd(b, a % b)\`. \`b\` 가 \`0\` 이 되는 순간 \`a\` 가 답.

증명 직관: a 와 b 의 공약수는 b 와 (a mod b) 의 공약수와 정확히 같다.

출처: 고전 (유클리드 알고리즘 — BC 300 년)`,
      constraints: "1 ≤ a, b ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "48 18", expectedOutput: "6", label: "기본 — gcd(48, 18) = 6" },
        { stdin: "100 75", expectedOutput: "25", label: "gcd(100, 75) = 25" },
        { stdin: "17 13", expectedOutput: "1", label: "서로소" },
        { stdin: "1000000000 2", expectedOutput: "2", label: "큰 수" },
        { stdin: "12 36", expectedOutput: "12", label: "한 쪽이 배수" },
        { stdin: "7 7", expectedOutput: "7", label: "두 수가 같음" },
        { stdin: "1 999999999", expectedOutput: "1", label: "한 쪽이 1" },
      ],
      hints: [
        "base case: b == 0 이면 a 반환.",
        "재귀: gcd(a, b) = gcd(b, a % b). 매 호출마다 b 가 절반 이하로 줄어드는 게 보장됨 (수렴 빠름).",
        "int 로 충분하지만 10^9 까지 가니 안전하게 long long 도 OK.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long gcd(long long a, long long b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    long long a, b;
    cin >> a >> b;
    cout << gcd(a, b) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "유클리드 호제법은 재귀의 가장 우아한 예 — 단 두 줄. b 가 0 이 되면 a 가 답이고, 그 외에는 (b, a mod b) 로 재귀. O(log(min(a,b))) 만에 끝난다.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

a, b = map(int, input().split())
print(gcd(a, b))
`,
      en: {
        title: "GCD (Euclidean Algorithm)",
        description: `Given \`a\` and \`b\`, implement **Euclid's algorithm recursively** and print GCD(a, b).

The identity: \`gcd(a, b) = gcd(b, a % b)\`. When \`b\` becomes \`0\`, \`a\` is the answer.

Intuition: the common divisors of (a, b) are exactly the common divisors of (b, a mod b).

Source: classical (Euclid, ~300 BC)`,
        constraints: "1 ≤ a, b ≤ 1,000,000,000",
        hints: [
          "Base case: b == 0 → return a.",
          "Recurse: gcd(a, b) = gcd(b, a % b). b halves rapidly so it converges fast.",
          "long long is safe (a, b up to 10^9).",
        ],
        solutionExplanation:
          "Euclid's algorithm is recursion at its most elegant — two lines. Stop when b=0, otherwise recurse on (b, a%b). Runs in O(log min(a,b)).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 빠른 거듭제곱 (분할 정복) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-007",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "어려움",
      title: "빠른 거듭제곱 (분할 정복, mod M)",
      description: `정수 \`base\`, \`n\`, \`M\` 이 주어진다. \`base^n mod M\` 을 **O(log N)** 분할 정복으로 계산해 출력하라.

핵심 아이디어:
- n 이 짝수: \`base^n = (base^(n/2))^2\`
- n 이 홀수: \`base^n = base * base^(n-1)\`
- base case: \`n = 0\` → \`1 mod M\`

\`arec-002\` 의 단순 재귀는 n=10^9 에 못 닿지만, 이 방식이면 30 단계면 끝.

모든 곱셈은 \`mod M\` 을 즉시 적용해 오버플로우 방지.

출처: LeetCode 50 (Pow(x, n)) paraphrased + mod`,
      constraints: "1 ≤ base ≤ 1,000,000,000, 0 ≤ n ≤ 1,000,000,000, 2 ≤ M ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "2 10 1000", expectedOutput: "24", label: "2^10 = 1024, mod 1000 = 24" },
        { stdin: "3 4 100", expectedOutput: "81", label: "3^4 = 81, mod 100 = 81" },
        { stdin: "5 0 7", expectedOutput: "1", label: "base case — n=0" },
        { stdin: "2 30 1000000", expectedOutput: "741824", label: "2^30 mod 10^6 = 741824" },
        { stdin: "7 13 17", expectedOutput: "6", label: "7^13 mod 17 = 6 (페르마 소정리 검증)" },
        { stdin: "10 9 1000000007", expectedOutput: "1000000000", label: "10^9 mod (10^9+7) = 10^9" },
        { stdin: "1 1000000000 999999999", expectedOutput: "1", label: "1 의 거듭제곱은 항상 1" },
      ],
      hints: [
        "n 을 절반으로 줄이며 재귀 → O(log N).",
        "n 짝수: half = pow(base, n/2). 답 = half * half % M.",
        "n 홀수: 답 = base * pow(base, n-1) % M. (또는 n/2 와 한 번 더 곱하기.)",
        "곱이 (10^9)^2 = 10^18 까지 가니 반드시 long long.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long powMod(long long base, long long n, long long M) {
    if (n == 0) return 1 % M;
    if (n % 2 == 0) {
        long long half = powMod(base, n / 2, M);
        return half * half % M;
    } else {
        return base % M * powMod(base, n - 1, M) % M;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    long long base, n, M;
    cin >> base >> n >> M;
    cout << powMod(base, n, M) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "분할 정복의 대표 예시 — n 을 절반씩 줄이면 O(log N). 짝수면 half² 한 번이면 되고 (half 를 두 번 계산하지 않게 변수로 저장!), 홀수면 base 한 번 곱하기. 모든 곱셈마다 mod 적용해 오버플로우 방지.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

def pow_mod(base, n, M):
    if n == 0:
        return 1 % M
    if n % 2 == 0:
        half = pow_mod(base, n // 2, M)
        return half * half % M
    return base % M * pow_mod(base, n - 1, M) % M

base, n, M = map(int, input().split())
print(pow_mod(base, n, M))
`,
      en: {
        title: "Fast Power (Divide & Conquer, mod M)",
        description: `Given \`base\`, \`n\`, \`M\`, compute \`base^n mod M\` in **O(log N)** via divide-and-conquer.

Key idea:
- n even: \`base^n = (base^(n/2))^2\`
- n odd: \`base^n = base * base^(n-1)\`
- Base case: \`n = 0\` → \`1 mod M\`

The simple recursion from \`arec-002\` can't handle n=10^9; this finishes in ~30 steps.

Apply \`mod M\` at every multiplication to prevent overflow.

Source: LeetCode 50 (Pow(x, n)) paraphrased + mod`,
        constraints: "1 ≤ base ≤ 10^9, 0 ≤ n ≤ 10^9, 2 ≤ M ≤ 10^9",
        hints: [
          "Halve n each recursion → O(log N).",
          "n even: half = pow(base, n/2); answer = half * half % M.",
          "n odd: answer = base * pow(base, n-1) % M.",
          "Products can reach (10^9)^2 = 10^18 — long long required.",
        ],
        solutionExplanation:
          "Classic divide-and-conquer — halve n for O(log N). Even: square the half (store it in a variable, don't recurse twice!). Odd: multiply by base once. Apply mod after every multiplication to avoid overflow.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 하노이 탑 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-008",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "어려움",
      title: "하노이 탑 — 이동 횟수",
      description: `N 개의 원반이 1 번 기둥에 큰 것이 아래, 작은 것이 위로 쌓여 있다. 다음 규칙으로 모두 3 번 기둥으로 옮길 때 **최소 이동 횟수** 를 출력하라.

1. 한 번에 한 원반만 옮긴다.
2. 큰 원반을 작은 원반 위에 놓을 수 없다.

핵심 통찰 (재귀 풀이):
- N-1 개를 1 → 2 (보조 기둥) 로 옮긴다 — 재귀
- 가장 큰 원반을 1 → 3 으로 옮긴다 — 1 번
- N-1 개를 2 → 3 으로 옮긴다 — 재귀

따라서 \`f(N) = 2 * f(N-1) + 1\`, \`f(0) = 0\` → \`f(N) = 2^N - 1\`.

출처: BOJ 11729 / 1914 paraphrased`,
      constraints: "1 ≤ N ≤ 60 (long long 안전)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "N=1 → 1 회" },
        { stdin: "2", expectedOutput: "3", label: "N=2 → 3 회" },
        { stdin: "3", expectedOutput: "7", label: "N=3 → 7 회" },
        { stdin: "4", expectedOutput: "15", label: "N=4 → 15 회" },
        { stdin: "10", expectedOutput: "1023", label: "N=10 → 1023 회" },
        { stdin: "20", expectedOutput: "1048575", label: "N=20 → 2^20 - 1" },
        { stdin: "60", expectedOutput: "1152921504606846975", label: "N=60 → 2^60 - 1 (long long 안전)" },
      ],
      hints: [
        "재귀 점화식 \`f(N) = 2 * f(N-1) + 1\` 을 그대로 코드로.",
        "base case: f(0) = 0 (또는 f(1) = 1).",
        "N=60 까지 — 2^60 - 1 은 long long 범위 안전 (long long 최대 ~9.2 * 10^18).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long hanoi(int n) {
    if (n == 0) return 0;
    return 2 * hanoi(n - 1) + 1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    cout << hanoi(n) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "하노이 탑의 재귀 점화식 \`T(N) = 2 T(N-1) + 1\` 을 그대로 옮기면 끝. N-1 개를 옆으로, 가장 큰 거 한 번, N-1 개를 다시 — 이게 어떤 N 에서도 똑같이 작동한다는 것이 재귀의 힘.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

def hanoi(n):
    if n == 0:
        return 0
    return 2 * hanoi(n - 1) + 1

n = int(input())
print(hanoi(n))
`,
      en: {
        title: "Tower of Hanoi — Move Count",
        description: `N disks are stacked on peg 1, largest at the bottom. Move all to peg 3 following these rules and print the **minimum number of moves**.

1. Move one disk at a time.
2. Never place a larger disk on a smaller one.

Recursive insight:
- Move N-1 disks 1 → 2 (auxiliary) — recursion
- Move the largest disk 1 → 3 — one move
- Move N-1 disks 2 → 3 — recursion

So \`f(N) = 2 * f(N-1) + 1\`, \`f(0) = 0\` → \`f(N) = 2^N - 1\`.

Source: BOJ 11729 / 1914 paraphrased`,
        constraints: "1 ≤ N ≤ 60 (fits in long long)",
        hints: [
          "Translate \`f(N) = 2 f(N-1) + 1\` directly into code.",
          "Base case: f(0) = 0 (or f(1) = 1).",
          "2^60 - 1 fits in long long (max ~9.2 × 10^18).",
        ],
        solutionExplanation:
          "Just code the recurrence \`T(N) = 2 T(N-1) + 1\`. The fact that the same 'move N-1, move biggest, move N-1' template works for any N is the power of recursion.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 부분집합 합 (백트래킹) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-009",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "어려움",
      title: "부분집합 합 존재 여부 (백트래킹)",
      description: `N 개의 양의 정수와 목표값 K 가 주어진다. **어떤 부분집합 (비어있지 않음)** 의 합이 정확히 K 가 되는 경우가 있는지 \`YES\` / \`NO\` 로 출력하라.

핵심 아이디어 — 백트래킹: 각 원소마다 **포함 / 미포함** 두 갈래로 재귀. 어느 가지에서든 합 == K 가 나오면 즉시 \`YES\`.

\`backtrack(idx, curSum)\`:
- base case: \`idx == N\` → \`curSum == K\` 이고 적어도 하나 골랐으면 true
- 안 고름: \`backtrack(idx+1, curSum)\`
- 고름: \`backtrack(idx+1, curSum + arr[idx])\`
- 둘 중 하나라도 true 면 true

N ≤ 20 이므로 2^N ≤ 약 100 만 — 충분.

출처: LeetCode 416 (Partition Equal Subset Sum) simplified`,
      constraints: "1 ≤ N ≤ 20, 1 ≤ K ≤ 10,000, 1 ≤ 각 원소 ≤ 1,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 5\n1 2 3 4", expectedOutput: "YES", label: "{1,4} 또는 {2,3} = 5" },
        { stdin: "3 6\n1 2 4", expectedOutput: "YES", label: "{2,4} = 6" },
        { stdin: "3 8\n1 2 4", expectedOutput: "NO", label: "최대 합 7 < 8" },
        { stdin: "1 5\n5", expectedOutput: "YES", label: "원소 1개 — 자기 자신" },
        { stdin: "1 7\n5", expectedOutput: "NO", label: "원소 1개 — 매치 안 됨" },
        { stdin: "5 10\n2 3 5 7 11", expectedOutput: "YES", label: "{3,7} 또는 {2,3,5} = 10" },
        { stdin: "4 100\n1 2 3 4", expectedOutput: "NO", label: "최대 합 10 << 100" },
        { stdin: "6 21\n1 2 3 4 5 6", expectedOutput: "YES", label: "전체 합 = 21" },
      ],
      hints: [
        "각 원소마다 '쓴다 / 안 쓴다' 두 가지 → 2^N 갈래의 결정 트리.",
        "백트래킹 함수 \`bool solve(idx, sum, picked)\` — picked 는 '최소 하나 골랐나' 표시.",
        "찾으면 즉시 true 반환 — 더 안 뒤져도 됨 (조기 종료).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, K;
vector<int> arr;

bool solve(int idx, long long sum, bool picked) {
    if (idx == N) return picked && sum == K;
    // 안 고름
    if (solve(idx + 1, sum, picked)) return true;
    // 고름
    if (solve(idx + 1, sum + arr[idx], true)) return true;
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N >> K;
    arr.assign(N, 0);
    for (int i = 0; i < N; i++) cin >> arr[i];
    cout << (solve(0, 0, false) ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "백트래킹의 기본 골격 — 각 결정마다 '쓴다 / 안 쓴다' 두 갈래로 재귀, 어느 잎에서든 조건 충족이면 즉시 true 반환. 비어있지 않은 부분집합 조건은 'picked' 플래그로 추적.",
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

def solve(idx, cur_sum, picked):
    if idx == n:
        return picked and cur_sum == k
    if solve(idx + 1, cur_sum, picked):
        return True
    if solve(idx + 1, cur_sum + arr[idx], True):
        return True
    return False

print("YES" if solve(0, 0, False) else "NO")
`,
      en: {
        title: "Subset Sum Existence (Backtracking)",
        description: `Given N positive integers and target K, decide whether **some non-empty subset** sums to exactly K. Print \`YES\` / \`NO\`.

Backtracking idea: for each element, branch on **include / skip**. If any leaf reaches sum == K (with at least one element picked), answer is \`YES\`.

\`backtrack(idx, curSum)\`:
- Base: \`idx == N\` → return curSum == K and at least one picked.
- Skip: \`backtrack(idx+1, curSum)\`
- Take: \`backtrack(idx+1, curSum + arr[idx])\`
- Either true → true.

N ≤ 20 so 2^N ≤ ~1M — feasible.

Source: LeetCode 416 (Partition Equal Subset Sum) simplified`,
        constraints: "1 ≤ N ≤ 20, 1 ≤ K ≤ 10,000, 1 ≤ each element ≤ 1,000",
        hints: [
          "Each element: 'take / skip' → 2^N decision tree.",
          "\`bool solve(idx, sum, picked)\` — picked tracks whether at least one element was used.",
          "Return true as soon as a match is found (early termination).",
        ],
        solutionExplanation:
          "Backtracking skeleton — branch on take/skip, return true as soon as any leaf matches. Track 'picked' to enforce the non-empty rule.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 순열 생성 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-010",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "어려움",
      title: "순열 모두 생성 (사전순)",
      description: `정수 N 이 주어진다. 1 부터 N 까지의 모든 순열을 **사전순 오름차순** 으로 한 줄에 하나씩 출력하라. 각 순열의 숫자는 공백으로 구분.

핵심 — 백트래킹: 각 자리에 들어갈 숫자를 1 부터 N 까지 순서대로 시도. 이미 쓴 숫자는 \`used[]\` 로 표시해 중복 방지. N 자리가 다 채워지면 출력.

\`generate(depth)\`:
- depth == N → 출력 후 return
- 1..N 까지 \`v\` 를 시도: used[v] 면 skip; 아니면 used 표시 후 cur 에 추가 → 재귀 → **되돌리기 (백트래킹의 핵심)**.

출처: LeetCode 46 (Permutations) paraphrased + 사전순 출력`,
      constraints: "1 ≤ N ≤ 8 (8! = 40320 줄, 출력량 ~250KB 안전)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "N=1 → 1개" },
        { stdin: "2", expectedOutput: "1 2\n2 1", label: "N=2 → 2개" },
        { stdin: "3", expectedOutput: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1", label: "N=3 → 6개 (사전순)" },
        {
          stdin: "4",
          expectedOutput:
            "1 2 3 4\n1 2 4 3\n1 3 2 4\n1 3 4 2\n1 4 2 3\n1 4 3 2\n2 1 3 4\n2 1 4 3\n2 3 1 4\n2 3 4 1\n2 4 1 3\n2 4 3 1\n3 1 2 4\n3 1 4 2\n3 2 1 4\n3 2 4 1\n3 4 1 2\n3 4 2 1\n4 1 2 3\n4 1 3 2\n4 2 1 3\n4 2 3 1\n4 3 1 2\n4 3 2 1",
          label: "N=4 → 24개",
        },
      ],
      hints: [
        "현재 자리에 들어갈 숫자를 **1 부터 N 까지 순서대로** 시도 — 자동으로 사전순.",
        "\`used[]\` 로 이미 쓴 숫자 추적. 한 자리 채우면 used 표시, 백트래킹 시 해제.",
        "출력은 \`vector<int>\` 누적 후 \"\\n\" 추가 — 매 push/pop 마다 IO 하면 느림.",
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
        "순열 생성의 정석 — used[] 로 사용 여부 추적하고 매 자리에서 1..N 을 시도. **재귀 후 used 와 cur 을 원상복구** 하는 게 백트래킹의 핵심. 1..N 순서로 시도하면 사전순 출력이 자동으로 얻어진다.",
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
        description: `Given N, print every permutation of 1..N in **lexicographic ascending order**, one per line, space-separated.

Backtracking: at each position try 1..N in order. Skip values already used (\`used[]\` array). When N positions are filled, emit the line.

\`generate(depth)\`:
- depth == N → output, return.
- For v in 1..N: skip if used[v]; else mark used, push v, recurse, then **undo (the backtracking step)**.

Source: LeetCode 46 (Permutations) paraphrased + lex output`,
        constraints: "1 ≤ N ≤ 8 (8! = 40320 lines, ~250KB output)",
        hints: [
          "Try 1..N **in order** at each position — lex order falls out automatically.",
          "Track used numbers with a \`used[]\` array. Mark/unmark around the recursive call.",
          "Accumulate output into a string and write once at the end — line-by-line IO is slow.",
        ],
        solutionExplanation:
          "Standard permutation generator — \`used[]\` tracks used numbers; try 1..N at each level. **Undoing used/cur after the recursive call** is the heart of backtracking. Trying values in 1..N order gives lex output for free.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 피보나치 (메모이제이션) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-011",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "어려움",
      title: "피보나치 (메모이제이션)",
      description: `정수 N 이 주어지면 피보나치 수열의 N 번째 값 \`fib(N)\` 을 출력하라.

정의: \`fib(0) = 0\`, \`fib(1) = 1\`, \`fib(n) = fib(n-1) + fib(n-2)\` (n ≥ 2).

**그냥 재귀** 하면 \`fib(50)\` 도 몇 초 — 같은 \`fib(k)\` 를 지수번 호출. **메모이제이션** 으로 한 번 계산한 값은 캐시에 저장 → O(N).

\`fib(90)\` 까지 long long 안전 (약 2.88 × 10^18 < 9.2 × 10^18).

출처: 고전 + LeetCode 509 paraphrased`,
      constraints: "0 ≤ N ≤ 90",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "0", expectedOutput: "0", label: "fib(0) = 0" },
        { stdin: "1", expectedOutput: "1", label: "fib(1) = 1" },
        { stdin: "2", expectedOutput: "1", label: "fib(2) = 1" },
        { stdin: "10", expectedOutput: "55", label: "fib(10) = 55" },
        { stdin: "20", expectedOutput: "6765", label: "fib(20) = 6,765" },
        { stdin: "50", expectedOutput: "12586269025", label: "fib(50) — 단순 재귀로 못 닿음" },
        { stdin: "90", expectedOutput: "2880067194370816120", label: "fib(90) — long long 한계 직전" },
      ],
      hints: [
        "캐시 배열 \`memo[N+1]\` 을 -1 로 초기화.",
        "재귀 안에서 첫 줄: memo[n] 이 이미 계산되어 있으면 그걸 반환 (재계산 방지).",
        "계산 결과를 반환 전에 memo[n] 에 저장.",
        "메모 없이 그냥 재귀하면 fib(50) 도 멈춤 — 캐시가 본질.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long memo[95];

long long fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];   // 캐시 적중
    return memo[n] = fib(n - 1) + fib(n - 2);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    memset(memo, -1, sizeof(memo));
    int n;
    cin >> n;
    cout << fib(n) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "메모이제이션의 정석: 캐시 적중 검사 → 없으면 계산해서 저장 후 반환. fib(50) 단순 재귀가 2^50 호출 (10조) 인 반면 메모이제이션은 단 51 번 — 캐시 한 줄이 본질이다.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
from functools import lru_cache
input = sys.stdin.readline

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

n = int(input())
print(fib(n))
`,
      en: {
        title: "Fibonacci (Memoization)",
        description: `Given N, print \`fib(N)\`.

Definition: \`fib(0) = 0\`, \`fib(1) = 1\`, \`fib(n) = fib(n-1) + fib(n-2)\` for n ≥ 2.

**Plain recursion** is exponential — \`fib(50)\` already takes seconds because the same \`fib(k)\` is computed many times. **Memoization** caches each value → O(N).

\`fib(90)\` fits in long long (~2.88 × 10^18 < 9.2 × 10^18).

Source: classical + LeetCode 509 paraphrased`,
        constraints: "0 ≤ N ≤ 90",
        hints: [
          "Cache array \`memo[N+1]\`, initialized to -1.",
          "First line of the function: if memo[n] is already computed, return it (avoid recomputation).",
          "Store the result in memo[n] before returning.",
          "Without memoization, even fib(50) stalls — the cache is the whole point.",
        ],
        solutionExplanation:
          "Memoization template: check cache → if miss, compute, store, return. Plain recursion does ~2^50 calls for fib(50); memoization does ~51. The single cache line is the entire algorithm.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 미로 경로 수 (재귀 + 메모이제이션) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "arec-012",
      cluster: "algo-recursion-contest",
      unlockAfter: "algo-recursion",
      difficulty: "어려움",
      title: "격자 경로 수 (재귀 + 메모이제이션)",
      description: `N × M 격자가 있다. 왼쪽 위 (0, 0) 에서 오른쪽 아래 (N-1, M-1) 까지 가는데, **오른쪽 또는 아래** 로만 한 칸씩 이동할 수 있다. 가능한 **서로 다른 경로의 수** 를 출력하라.

재귀 정의:
- \`paths(r, c)\` = (r, c) 에서 (N-1, M-1) 까지의 경로 수
- base case: r == N-1 이고 c == M-1 → 1
- 격자 밖: 0
- 그 외: \`paths(r+1, c) + paths(r, c+1)\`

순수 재귀는 지수적이지만 **2D 메모이제이션** (\`memo[r][c]\`) 으로 O(N × M).

답은 수학적으로 \`C(N+M-2, N-1)\` 와 같지만 여기서는 재귀로 푼다.

출처: LeetCode 62 (Unique Paths) paraphrased`,
      constraints: "1 ≤ N, M ≤ 20 (long long 안전, C(38,19) ≈ 1.77 × 10^10)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1 1", expectedOutput: "1", label: "1×1 — 출발 = 도착" },
        { stdin: "2 2", expectedOutput: "2", label: "2×2 → 오른오아 or 아오 → 2 경로" },
        { stdin: "3 3", expectedOutput: "6", label: "3×3 — C(4,2) = 6" },
        { stdin: "3 7", expectedOutput: "28", label: "3×7 — C(8,2) = 28" },
        { stdin: "7 3", expectedOutput: "28", label: "대칭성 — N, M 바꿔도 같음" },
        { stdin: "1 10", expectedOutput: "1", label: "한 줄 격자 — 오른쪽만 — 경로 1" },
        { stdin: "10 1", expectedOutput: "1", label: "한 열 격자 — 아래만 — 경로 1" },
        { stdin: "20 20", expectedOutput: "35345263800", label: "20×20 — C(38,19)" },
      ],
      hints: [
        "재귀 \`paths(r, c)\` — base: 도착이면 1, 격자 밖이면 0, 그 외에는 아래 + 오른쪽.",
        "\`memo[r][c]\` 2D 배열로 캐싱. -1 로 초기화해서 '아직 계산 안 함' 표시.",
        "20 × 20 에서 답이 약 350 억 → long long 필수.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N, M;
long long memo[25][25];

long long paths(int r, int c) {
    if (r >= N || c >= M) return 0;
    if (r == N - 1 && c == M - 1) return 1;
    if (memo[r][c] != -1) return memo[r][c];
    return memo[r][c] = paths(r + 1, c) + paths(r, c + 1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N >> M;
    for (int i = 0; i < 25; i++)
        for (int j = 0; j < 25; j++)
            memo[i][j] = -1;
    cout << paths(0, 0) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "DP 사고의 입문 — 재귀 정의 + 메모이제이션 = top-down DP. paths(r,c) = paths(아래) + paths(오른쪽), base 두 개 (도착 / 격자 밖), 캐시로 중복 호출 차단. 시간 O(N×M).",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
from functools import lru_cache
input = sys.stdin.readline

n, m = map(int, input().split())

@lru_cache(maxsize=None)
def paths(r, c):
    if r >= n or c >= m:
        return 0
    if r == n - 1 and c == m - 1:
        return 1
    return paths(r + 1, c) + paths(r, c + 1)

print(paths(0, 0))
`,
      en: {
        title: "Grid Paths (Recursion + Memoization)",
        description: `On an N × M grid, count distinct paths from top-left (0, 0) to bottom-right (N-1, M-1), moving only **right or down** one cell at a time.

Recursive definition:
- \`paths(r, c)\` = number of paths from (r, c) to (N-1, M-1)
- Base: r == N-1 and c == M-1 → 1
- Off-grid: 0
- Else: \`paths(r+1, c) + paths(r, c+1)\`

Pure recursion is exponential, but **2D memoization** (\`memo[r][c]\`) brings it to O(N × M).

Mathematically the answer is \`C(N+M-2, N-1)\` but we solve via recursion here.

Source: LeetCode 62 (Unique Paths) paraphrased`,
        constraints: "1 ≤ N, M ≤ 20 (fits in long long; C(38,19) ≈ 1.77 × 10^10)",
        hints: [
          "Recurse on \`paths(r, c)\` — base: at destination return 1, off-grid return 0, else down + right.",
          "Use a 2D \`memo[r][c]\` cache, initialized to -1 (uncomputed).",
          "Answer can reach ~35 billion for 20×20 — long long required.",
        ],
        solutionExplanation:
          "Gateway to DP — recursive definition + memoization = top-down DP. paths(r,c) = paths(down) + paths(right), two base cases (target / off-grid), cache to avoid repeats. Time O(N × M).",
      },
    },
  ],
}
