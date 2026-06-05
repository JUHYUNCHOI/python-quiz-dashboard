import type { PracticeCluster } from "./types"

export const bitManipulationContestCluster: PracticeCluster = {
  id: "algo-bitmanipulation-contest",
  title: "비트 조작 문제 풀이",
  emoji: "⚙️",
  description: "AND/OR/XOR/SHIFT — XOR 트릭, bitmask 부분집합, 비트 DP 입문",
  unlockAfter: "algo-bitmanipulation",
  en: {
    title: "Bit Manipulation Practice",
    description: "AND/OR/XOR/SHIFT — XOR tricks, bitmask subsets, intro bit DP",
  },
  problems: [
    // ═══════════ 쉬움 입문 (on-ramp) ═══════════
    {
      id: "abit-e01",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "쉬움",
      title: "켜진 비트 수 (popcount)",
      description: `정수 \`N\`이 주어집니다. \`N\`을 이진수로 나타냈을 때 **1의 개수**(켜진 비트 수)를 출력하세요.

예: \`13\`은 이진수로 \`1101\`이고 1이 3개이므로 답은 \`3\`.`,
      constraints: "0 ≤ N ≤ 10^18",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    // TODO: n의 이진수에서 1의 개수 출력
    return 0;
}`,
      pyInitialCode: `n = int(input())
# TODO: n의 이진수에서 1의 개수 출력`,
      testCases: [
        { stdin: "13", expectedOutput: "3" },
        { stdin: "0", expectedOutput: "0" },
        { stdin: "1", expectedOutput: "1" },
        { stdin: "255", expectedOutput: "8" },
        { stdin: "1023", expectedOutput: "10" },
      ],
      hints: [
        "n & 1로 마지막 비트를 보고 n >>= 1로 밀며 셀 수 있어요.",
        "C++ __builtin_popcountll(n), Python bin(n).count('1').",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    cout << __builtin_popcountll(n) << "\\n";
    return 0;
}`,
      pySolutionCode: `n = int(input())
print(bin(n).count('1'))`,
      solutionExplanation: "이진수의 1 개수를 셉니다. C++ __builtin_popcountll, Python bin(n).count('1'). 직접 세려면 n&1 확인 후 n>>=1.",
      en: {
        title: "Count Set Bits (popcount)",
        description: `Print the number of 1s in the binary form of N. e.g. 13 = 1101 → 3.`,
        constraints: "0 ≤ N ≤ 10^18",
        hints: ["Check n & 1, shift n >>= 1.", "C++ __builtin_popcountll; Python bin(n).count('1')."],
        solutionExplanation: "Count 1-bits via a library call or by checking the last bit and shifting.",
      },
    },
    {
      id: "abit-e02",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "쉬움",
      title: "2의 거듭제곱 판별",
      description: `정수 \`N\`이 주어집니다. \`N\`이 **2의 거듭제곱**이면 \`YES\`, 아니면 \`NO\`를 출력하세요.

2의 거듭제곱은 이진수로 1이 **딱 하나만** 켜진 수(1, 2, 4, 8, …)예요.`,
      constraints: "0 ≤ N ≤ 10^18",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    // TODO: 2의 거듭제곱이면 YES, 아니면 NO
    return 0;
}`,
      pyInitialCode: `n = int(input())
# TODO: 2의 거듭제곱이면 YES, 아니면 NO`,
      testCases: [
        { stdin: "16", expectedOutput: "YES" },
        { stdin: "1", expectedOutput: "YES" },
        { stdin: "6", expectedOutput: "NO" },
        { stdin: "1024", expectedOutput: "YES" },
        { stdin: "0", expectedOutput: "NO" },
      ],
      hints: [
        "2의 거듭제곱은 이진수에서 1이 딱 하나.",
        "n > 0 이고 (n & (n-1)) == 0 이면 2의 거듭제곱.",
        "0도 거짓이 되도록 n > 0 조건을 꼭 넣기.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    if (n > 0 && (n & (n - 1)) == 0) cout << "YES" << "\\n";
    else cout << "NO" << "\\n";
    return 0;
}`,
      pySolutionCode: `n = int(input())
if n > 0 and (n & (n - 1)) == 0:
    print("YES")
else:
    print("NO")`,
      solutionExplanation: "n & (n-1)은 가장 낮은 1비트를 지웁니다. 1이 하나뿐이면 0이 돼요. n=0은 따로 거르려고 n>0 조건을 함께 검사합니다.",
      en: {
        title: "Power of Two Check",
        description: `Print YES if N is a power of two (exactly one set bit), else NO.`,
        constraints: "0 ≤ N ≤ 10^18",
        hints: ["A power of two has one set bit.", "n>0 && (n&(n-1))==0.", "Keep n>0 so 0 is rejected."],
        solutionExplanation: "n & (n-1) clears the lowest set bit, giving 0 only for single-bit numbers; also require n>0.",
      },
    },
    {
      id: "abit-e03",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "쉬움",
      title: "k번째 비트 확인",
      description: `정수 \`N\`과 \`k\`가 공백으로 주어집니다. \`N\`의 \`k\`번째 비트(0-based, 최하위=0)가 **켜져 있으면 1**, 아니면 **0**을 출력하세요.

예: \`13\`은 \`1101\`. 0번=1, 1번=0, 2번=1. 그래서 \`13 0\` → \`1\`.`,
      constraints: "0 ≤ N ≤ 10^18, 0 ≤ k ≤ 62",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    int k;
    cin >> n >> k;
    // TODO: n의 k번째 비트가 켜졌으면 1, 아니면 0
    return 0;
}`,
      pyInitialCode: `n, k = map(int, input().split())
# TODO: n의 k번째 비트가 켜졌으면 1, 아니면 0`,
      testCases: [
        { stdin: "13 0", expectedOutput: "1" },
        { stdin: "13 1", expectedOutput: "0" },
        { stdin: "13 2", expectedOutput: "1" },
        { stdin: "13 3", expectedOutput: "1" },
        { stdin: "1024 10", expectedOutput: "1" },
      ],
      hints: [
        "n을 k칸 오른쪽으로 밀면 k번째 비트가 맨 아래로 와요.",
        "(n >> k) & 1 이 답.",
        "또는 마스크 (1LL << k)와 & 해서 0인지 확인.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    int k;
    cin >> n >> k;
    cout << ((n >> k) & 1) << "\\n";
    return 0;
}`,
      pySolutionCode: `n, k = map(int, input().split())
print((n >> k) & 1)`,
      solutionExplanation: "n을 k칸 오른쪽으로 밀면(n>>k) k번째 비트가 맨 아래로 오고, & 1로 그 비트만 0/1로 뽑아냅니다.",
      en: {
        title: "Check the k-th Bit",
        description: `Given N and k, print 1 if the k-th bit (0-based) of N is set, else 0. e.g. 13(1101), k=0 → 1.`,
        constraints: "0 ≤ N ≤ 10^18, 0 ≤ k ≤ 62",
        hints: ["Shift n right by k.", "(n >> k) & 1.", "Or AND with mask (1LL << k)."],
        solutionExplanation: "Shift right by k to bring the k-th bit to the bottom, then & 1.",
      },
    },
    // ─────────────────────────────────────────────────────────────────
    // 1. 짝 없는 원소 — 보통 (XOR)
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-001",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "보통",
      title: "짝 없는 원소 (XOR)",
      description: `N 개의 정수가 주어진다. 정확히 **한 원소만 1번**, 나머지는 **모두 2번씩** 나타난다. 짝 없는 그 원소를 출력하라.

핵심 트릭: \`x ^ x = 0\`, \`x ^ 0 = x\`. 모든 원소를 XOR 누적하면 짝 있는 것들은 서로 상쇄되고 짝 없는 하나만 남는다.

시간 O(N), 추가 메모리 O(1) — 정렬·해시 모두 필요 없음.

출처: LeetCode 136 (Single Number) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000 (N 은 홀수), 1 ≤ 각 원소 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n42", expectedOutput: "42", label: "원소 1개" },
        { stdin: "3\n4 1 4", expectedOutput: "1", label: "기본 — 1 이 짝 없음" },
        { stdin: "5\n2 2 3 3 7", expectedOutput: "7", label: "7 만 한 번" },
        { stdin: "7\n5 3 5 1 3 2 1", expectedOutput: "2", label: "순서 섞임" },
        { stdin: "5\n1000000000 1 1 7 7", expectedOutput: "1000000000", label: "큰 값" },
        { stdin: "3\n100 200 100", expectedOutput: "200", label: "200 짝 없음" },
      ],
      hints: [
        "x ^ x = 0 — 같은 수를 두 번 XOR 하면 사라진다.",
        "x ^ 0 = x — 0 과 XOR 해도 그대로.",
        "모든 원소를 0 부터 XOR 누적 → 짝 있는 것은 사라지고 짝 없는 하나만 남음.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        ans ^= x;     // XOR 누적 — 짝 있는 건 사라짐
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "XOR 의 두 성질 (x^x=0, x^0=x) + 교환·결합 법칙 덕분에 순서와 무관하게 짝 있는 모든 값은 사라지고 짝 없는 하나만 남는다. O(N) 시간, O(1) 메모리.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
arr = list(map(int, input().split()))
ans = 0
for x in arr:
    ans ^= x
print(ans)
`,
      en: {
        title: "Single Element (XOR)",
        description: `N integers are given. Exactly **one** element appears **once**, all others appear **twice**. Print the lonely one.

Key trick: \`x ^ x = 0\`, \`x ^ 0 = x\`. XOR-accumulate all elements — paired ones cancel, the lonely one remains.

O(N) time, O(1) memory — no sort or hashmap needed.

Source: LeetCode 136 (Single Number) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000 (N is odd), 1 ≤ each element ≤ 1,000,000,000",
        hints: [
          "x ^ x = 0 — XOR-ing the same number twice erases it.",
          "x ^ 0 = x — XOR with 0 is identity.",
          "Accumulate XOR from 0 over all elements — pairs vanish, lonely one survives.",
        ],
        solutionExplanation:
          "XOR's two laws (x^x=0, x^0=x) plus commutativity/associativity make all paired elements cancel regardless of order. O(N) time, O(1) memory.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 비트 카운트 (popcount) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-002",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "보통",
      title: "set bit 개수 (popcount)",
      description: `정수 x 가 주어진다. x 의 **이진수 표현에서 1 인 비트 개수** 를 출력하라.

방법 (3 가지):
1. \`x & 1\` 로 마지막 비트 보고 \`x >>= 1\` 반복.
2. Brian Kernighan: \`x &= (x - 1)\` 매번 가장 낮은 set bit 하나씩 끔.
3. C++ 내장: \`__builtin_popcountll(x)\`. Python: \`bin(x).count('1')\`.

출처: LeetCode 191 (Number of 1 Bits) paraphrased`,
      constraints: "0 ≤ x ≤ 10^18",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "0", expectedOutput: "0", label: "0 — set bit 없음" },
        { stdin: "1", expectedOutput: "1", label: "1 = 0b1" },
        { stdin: "7", expectedOutput: "3", label: "7 = 0b111" },
        { stdin: "8", expectedOutput: "1", label: "8 = 0b1000" },
        { stdin: "255", expectedOutput: "8", label: "255 = 0b11111111" },
        { stdin: "1023", expectedOutput: "10", label: "1023 = 10 비트 모두 1" },
        { stdin: "1000000000000000000", expectedOutput: "13", label: "10^18 큰 수" },
      ],
      hints: [
        "x & 1 → 마지막 비트. >>= 1 로 한 칸씩 밀기.",
        "또는 x &= (x - 1) — 매번 가장 낮은 1 비트가 사라짐 → set bit 수만큼만 반복.",
        "내장 함수: C++ __builtin_popcountll(x), Python bin(x).count('1').",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    unsigned long long x;
    cin >> x;
    cout << __builtin_popcountll(x) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "__builtin_popcountll 는 하드웨어 명령으로 O(1). 직접 구현하려면 x &= (x-1) 으로 set bit 만 돌면 O(popcount). 단순 shift 도 64 bit 이하라 O(1) 로 충분.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

x = int(input())
print(bin(x).count('1'))
`,
      en: {
        title: "Set Bit Count (popcount)",
        description: `Given integer x, print the **number of 1-bits in its binary representation**.

Three ways:
1. Loop: check \`x & 1\`, then \`x >>= 1\`.
2. Brian Kernighan: \`x &= (x - 1)\` clears the lowest set bit each iteration.
3. Built-ins: C++ \`__builtin_popcountll(x)\`; Python \`bin(x).count('1')\`.

Source: LeetCode 191 (Number of 1 Bits) paraphrased`,
        constraints: "0 ≤ x ≤ 10^18",
        hints: [
          "x & 1 → last bit. Shift right with >>= 1.",
          "Or: x &= (x - 1) — drops the lowest set bit each step.",
          "Built-in: C++ __builtin_popcountll(x), Python bin(x).count('1').",
        ],
        solutionExplanation:
          "__builtin_popcountll is a hardware instruction (O(1)). Hand-rolled with x &= (x-1) runs in O(popcount). Plain shifting is O(64) which is fine.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. swap without temp (XOR) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-003",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "보통",
      title: "두 수 swap (XOR — 임시 변수 없이)",
      description: `두 정수 a, b 가 주어진다. **임시 변수 없이 XOR 세 번** 으로 두 값을 교환한 뒤 \`a b\` 순서로 (한 줄, 공백 구분) 출력하라.

XOR swap 트릭:
\`\`\`
a = a ^ b
b = a ^ b    # 이제 b 는 원래 a
a = a ^ b    # 이제 a 는 원래 b
\`\`\`

직관: a^b 를 a 에 저장 → b 에 (a^b)^b = a 가 들어감 → a 에 (a^b)^(원래 a) = b 가 남음.

주의: 실제 코드에선 그냥 \`swap(a, b)\` 가 가독성·안전성 모두 우월. 이 문제는 XOR 의 성질을 손에 익히는 연습.

출처: 고전 — XOR swap (1980s)`,
      constraints: "0 ≤ a, b ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "3 7", expectedOutput: "7 3", label: "기본" },
        { stdin: "0 0", expectedOutput: "0 0", label: "둘 다 0" },
        { stdin: "1000000000 1", expectedOutput: "1 1000000000", label: "큰 값" },
        { stdin: "42 42", expectedOutput: "42 42", label: "같은 값 — 교환해도 그대로" },
        { stdin: "1 0", expectedOutput: "0 1", label: "0 과 교환" },
      ],
      hints: [
        "단순히 swap(a, b) 쓰지 말고 ^= 세 번으로.",
        "a ^= b; b ^= a; a ^= b; 순서 — 이 세 줄이면 a, b 교환.",
        "주의: a 와 b 가 같은 변수면 0 이 됨. 이 문제는 다른 두 변수이므로 안전.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    long long a, b;
    cin >> a >> b;
    a ^= b;
    b ^= a;     // b = (a^b) ^ b = 원래 a
    a ^= b;     // a = (a^b) ^ 원래 a = b
    cout << a << ' ' << b << "\\n";
    return 0;
}`,
      solutionExplanation:
        "XOR 세 번으로 임시 저장 없이 swap. 각 줄이 끝날 때마다 어느 변수가 무엇을 가지는지 종이에 적어보면 명확. 실무에선 swap(a,b) 가 정답 — 여기는 XOR 자성 익히는 연습.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

a, b = map(int, input().split())
a ^= b
b ^= a
a ^= b
print(a, b)
`,
      en: {
        title: "Swap without temp (XOR)",
        description: `Given two integers a, b, swap them **without a temporary variable** using XOR three times, then print \`a b\`.

XOR swap:
\`\`\`
a = a ^ b
b = a ^ b    # now b holds original a
a = a ^ b    # now a holds original b
\`\`\`

Intuition: store a^b in a → b becomes (a^b)^b = a → a becomes (a^b)^(orig a) = b.

Note: in real code \`swap(a, b)\` is clearer and safer. This problem builds XOR muscle.

Source: classical XOR swap (1980s)`,
        constraints: "0 ≤ a, b ≤ 1,000,000,000",
        hints: [
          "Don't use swap(a, b) — use ^= three times.",
          "a ^= b; b ^= a; a ^= b; — those three lines swap a and b.",
          "Caveat: if a and b alias the same memory the result is 0. Here they're different variables — safe.",
        ],
        solutionExplanation:
          "Three XORs swap without a temporary. Track which variable holds what after each line on paper. Real code should use swap(a,b); this is a XOR drill.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 2의 거듭제곱인가? — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-004",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "보통",
      title: "2의 거듭제곱인가?",
      description: `정수 x 가 주어진다. x 가 **2의 거듭제곱** (1, 2, 4, 8, 16, ...) 이면 \`YES\`, 아니면 \`NO\` 를 출력하라.

비트 트릭: 2의 거듭제곱은 이진수에서 **정확히 1 비트만 1**. 즉
\`x > 0 && (x & (x - 1)) == 0\`.

이유: 2^k = 0b1000...0. (2^k - 1) = 0b0111...1. AND 하면 0. 다른 수면 set bit 가 둘 이상이라 AND 가 0 이 아님.

\`x = 0\` 은 2의 거듭제곱 아님 — 0 이 아니라는 조건 꼭 추가.

출처: LeetCode 231 (Power of Two) paraphrased`,
      constraints: "0 ≤ x ≤ 10^18",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "YES", label: "1 = 2^0" },
        { stdin: "2", expectedOutput: "YES", label: "2 = 2^1" },
        { stdin: "4", expectedOutput: "YES", label: "4 = 2^2" },
        { stdin: "1024", expectedOutput: "YES", label: "1024 = 2^10" },
        { stdin: "0", expectedOutput: "NO", label: "0 은 거듭제곱 아님" },
        { stdin: "3", expectedOutput: "NO", label: "3 = 0b11 — 비트 2개" },
        { stdin: "6", expectedOutput: "NO", label: "6 = 0b110" },
        { stdin: "1152921504606846976", expectedOutput: "YES", label: "2^60" },
        { stdin: "1000000000000000000", expectedOutput: "NO", label: "10^18 ≠ 2^k" },
      ],
      hints: [
        "2의 거듭제곱 ⇔ 이진수에서 정확히 1 비트만 1.",
        "x & (x - 1) 은 가장 낮은 set bit 를 끄는 연산.",
        "set bit 가 정확히 1 개면 끄고 나면 0 → 조건: x > 0 && (x & (x - 1)) == 0.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    unsigned long long x;
    cin >> x;
    bool ok = (x > 0) && ((x & (x - 1)) == 0);
    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}`,
      solutionExplanation:
        "한 줄 트릭 — x > 0 이고 (x & (x-1)) == 0 이면 2의 거듭제곱. 0 예외 처리만 잊지 말기.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

x = int(input())
print("YES" if x > 0 and (x & (x - 1)) == 0 else "NO")
`,
      en: {
        title: "Power of Two?",
        description: `Given integer x, print \`YES\` if x is a **power of two** (1, 2, 4, 8, 16, ...), else \`NO\`.

Bit trick: a power of two has **exactly one set bit**, so
\`x > 0 && (x & (x - 1)) == 0\`.

Why: 2^k = 0b1000...0; (2^k - 1) = 0b0111...1; AND = 0. Anything with ≥ 2 set bits leaves something behind.

Don't forget: \`x = 0\` is NOT a power of two.

Source: LeetCode 231 (Power of Two) paraphrased`,
        constraints: "0 ≤ x ≤ 10^18",
        hints: [
          "Power of two ⇔ exactly one set bit.",
          "x & (x - 1) clears the lowest set bit.",
          "If exactly one bit was set, clearing it gives 0 — so test x > 0 && (x & (x - 1)) == 0.",
        ],
        solutionExplanation:
          "One-line trick — power of two iff x > 0 and (x & (x-1)) == 0. Just remember the x > 0 guard.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 부분집합 모두 출력 (bitmask) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-005",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "보통",
      title: "부분집합 모두 출력 (bitmask)",
      description: `N 개의 정수가 주어진다. 모든 부분집합 (공집합 포함) 을 **mask 사전순 (mask = 0, 1, 2, ..., 2^N - 1)** 으로 출력하라.

각 줄에 한 부분집합의 원소를 공백 구분으로 출력. **공집합은 빈 줄 한 줄.**

핵심 — bitmask 기법:
- N 개 원소의 부분집합은 정확히 2^N 개.
- 각 mask (0 ~ 2^N - 1) 의 비트 i 가 1 이면 원소 i 를 포함.
- \`for mask in 0..2^N-1: for i in 0..N-1: if mask & (1 << i): ...\`

N ≤ 12 → 2^12 = 4096 — 충분.

출처: 고전 (bitmask 입문)`,
      constraints: "1 ≤ N ≤ 12, 각 원소는 정수",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "2\n1 2",
          expectedOutput: "\n1\n2\n1 2",
          label: "N=2 — 4 개 부분집합",
        },
        {
          stdin: "3\n1 2 3",
          expectedOutput: "\n1\n2\n1 2\n3\n1 3\n2 3\n1 2 3",
          label: "N=3 — 8 개 부분집합",
        },
        {
          stdin: "1\n7",
          expectedOutput: "\n7",
          label: "N=1 — 공집합 + {7}",
        },
        {
          stdin: "4\n1 2 3 4",
          expectedOutput:
            "\n1\n2\n1 2\n3\n1 3\n2 3\n1 2 3\n4\n1 4\n2 4\n1 2 4\n3 4\n1 3 4\n2 3 4\n1 2 3 4",
          label: "N=4 — 16 개 부분집합",
        },
      ],
      hints: [
        "for mask = 0; mask < (1 << N); mask++ — 모든 부분집합 인덱스.",
        "각 mask 에 대해 비트 i 를 검사: if (mask >> i) & 1 → 원소 i 포함.",
        "비트 i 가 0 부터 N-1 까지 — 원소 순서대로 나오므로 출력도 자동 정렬.",
        "공집합 (mask=0) 은 출력할 게 없으므로 빈 줄 하나.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    string out;
    for (int mask = 0; mask < (1 << n); mask++) {
        bool first = true;
        for (int i = 0; i < n; i++) {
            if ((mask >> i) & 1) {
                if (!first) out += ' ';
                out += to_string(a[i]);
                first = false;
            }
        }
        out += '\\n';
    }
    cout << out;
    return 0;
}`,
      solutionExplanation:
        "bitmask 기법의 정석 — 외부 루프는 mask 0..2^N-1, 내부 루프는 비트 i 검사. 각 mask 가 하나의 부분집합. 시간 O(2^N · N). N ≤ 20 까지 실용.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))

out = []
for mask in range(1 << n):
    items = []
    for i in range(n):
        if (mask >> i) & 1:
            items.append(str(a[i]))
    out.append(" ".join(items))
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "All Subsets (bitmask)",
        description: `Given N integers, print every subset (including the empty set) in **mask order** (mask = 0, 1, ..., 2^N - 1).

One subset per line, space-separated. The empty subset is an empty line.

Bitmask key idea:
- A set of N elements has exactly 2^N subsets.
- For each mask in 0..2^N-1, bit i being 1 means element i is included.
- \`for mask in 0..2^N-1: for i in 0..N-1: if mask & (1 << i): include a[i]\`

N ≤ 12 → 2^12 = 4096 — plenty fast.

Source: classical (bitmask intro)`,
        constraints: "1 ≤ N ≤ 12, each element is an integer",
        hints: [
          "for mask = 0; mask < (1 << N); mask++ — all subset indices.",
          "For each mask, check bit i: (mask >> i) & 1 → include a[i].",
          "Bits iterated 0..N-1 → output is already in element order.",
          "Empty set (mask=0) yields an empty line.",
        ],
        solutionExplanation:
          "Standard bitmask enumeration — outer loop over masks, inner loop over bits. Each mask IS a subset. Time O(2^N · N). Practical up to N ≤ 20.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 두 수의 AND/OR/XOR — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-006",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "보통",
      title: "두 수의 AND / OR / XOR",
      description: `두 정수 a, b 가 주어진다. \`a & b\`, \`a | b\`, \`a ^ b\` 세 값을 한 줄에 하나씩 출력하라.

세 연산 의미:
- **AND (&)**: 두 비트 모두 1 일 때만 1 — '둘 다 켜진 것'.
- **OR (|)**: 한 쪽이라도 1 이면 1 — '둘 중 하나라도 켜진 것'.
- **XOR (^)**: 정확히 한 쪽만 1 일 때 1 — '엇갈린 것'.

출처: 원본 (기본 연산 손에 익히기)`,
      constraints: "0 ≤ a, b ≤ 10^18",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "12 10", expectedOutput: "8\n14\n6", label: "12=1100, 10=1010 → AND=1000=8, OR=1110=14, XOR=0110=6" },
        { stdin: "0 0", expectedOutput: "0\n0\n0", label: "둘 다 0" },
        { stdin: "0 7", expectedOutput: "0\n7\n7", label: "0 과 7 — AND=0, OR=7, XOR=7" },
        { stdin: "7 7", expectedOutput: "7\n7\n0", label: "같은 값 — AND=OR=7, XOR=0" },
        { stdin: "15 240", expectedOutput: "0\n255\n255", label: "겹치는 비트 없음" },
        { stdin: "1000000000 1000000000", expectedOutput: "1000000000\n1000000000\n0", label: "큰 값 같음" },
      ],
      hints: [
        "C++/Python 모두 & | ^ 연산자 그대로 사용.",
        "결과 한 줄씩 출력 — 순서는 AND, OR, XOR.",
        "값이 클 수 있으므로 long long 사용 (C++).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    long long a, b;
    cin >> a >> b;
    cout << (a & b) << "\\n";
    cout << (a | b) << "\\n";
    cout << (a ^ b) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "기본 연산자 그대로. 의미를 잊지 말기: AND = 교집합, OR = 합집합, XOR = 대칭차 (한 쪽에만 있는 비트).",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

a, b = map(int, input().split())
print(a & b)
print(a | b)
print(a ^ b)
`,
      en: {
        title: "AND / OR / XOR of Two Numbers",
        description: `Given integers a and b, print \`a & b\`, \`a | b\`, \`a ^ b\` — one per line.

Meaning:
- **AND (&)**: 1 only if both bits 1 — 'both on'.
- **OR (|)**: 1 if either is 1 — 'at least one on'.
- **XOR (^)**: 1 if exactly one is 1 — 'mismatched'.

Source: original (operator drill)`,
        constraints: "0 ≤ a, b ≤ 10^18",
        hints: [
          "Use & | ^ operators directly in C++/Python.",
          "Three lines — AND, then OR, then XOR.",
          "Use long long in C++ for large values.",
        ],
        solutionExplanation:
          "Direct operator use. AND = intersection of bits, OR = union, XOR = symmetric difference.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. 두 missing 원소 (LC 260) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-007",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "어려움",
      title: "두 짝 없는 원소 찾기 (LC 260)",
      description: `N 개의 정수가 주어진다. 정확히 **두 원소만 1번** 나타나고, 나머지는 모두 **2번씩** 나타난다. 짝 없는 그 두 수를 **오름차순** 으로 한 줄에 공백 구분으로 출력하라.

문제: \`abit-001\` 의 단순 XOR 누적은 두 수를 분리 못 함 (XOR 합 = a^b 가 됨).

해법 (XOR 분리 트릭):
1. 전체 XOR 누적 → \`x = a ^ b\`. a ≠ b 이므로 x ≠ 0.
2. x 의 **set bit 하나** (예: 가장 낮은 set bit) 를 골라 mask: \`m = x & -x\`.
3. 그 mask 비트로 모든 원소를 두 그룹으로 나눠 따로 XOR — 각 그룹엔 a, b 중 하나씩만 들어감.

결과: 두 그룹 XOR = a 와 b. 정렬해서 출력.

시간 O(N), 메모리 O(1).

출처: LeetCode 260 (Single Number III) paraphrased`,
      constraints: "2 ≤ N ≤ 100,000 (N 은 짝수), 1 ≤ 각 원소 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "2\n3 7", expectedOutput: "3 7", label: "최소 — 두 수만" },
        { stdin: "4\n1 2 1 3", expectedOutput: "2 3", label: "기본 — 2, 3 짝 없음" },
        { stdin: "6\n5 5 1 2 4 4", expectedOutput: "1 2", label: "1, 2 짝 없음" },
        { stdin: "8\n10 20 30 10 30 40 50 50", expectedOutput: "20 40", label: "20, 40 짝 없음" },
        { stdin: "4\n1 1000000000 1 999999999", expectedOutput: "999999999 1000000000", label: "큰 값" },
        { stdin: "6\n7 8 7 9 8 100", expectedOutput: "9 100", label: "더 큰 케이스" },
      ],
      hints: [
        "x = 모든 원소의 XOR. 짝 있는 건 사라지고 x = a ^ b (둘 다 짝 없는 두 수).",
        "a ≠ b 이므로 x 에 set bit 하나는 반드시 있음. m = x & -x → 가장 낮은 set bit 만 1.",
        "원소들을 'mask 비트 켜진 그룹' / '꺼진 그룹' 으로 나눠 XOR — 각 그룹에 a 또는 b 하나만 남음.",
        "마지막에 정렬해서 작은 거 먼저 출력.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<long long> v(n);
    long long x = 0;
    for (int i = 0; i < n; i++) {
        cin >> v[i];
        x ^= v[i];
    }
    // x = a ^ b, set bit 하나 골라서 그룹 분리
    long long mask = x & -x;
    long long a = 0, b = 0;
    for (long long y : v) {
        if (y & mask) a ^= y;
        else          b ^= y;
    }
    if (a > b) swap(a, b);
    cout << a << ' ' << b << "\\n";
    return 0;
}`,
      solutionExplanation:
        "XOR 분리 트릭 — 전체 XOR = a^b 의 set bit 하나로 a 와 b 를 다른 그룹에 배치. 짝 있는 원소들은 같은 그룹에서 서로 상쇄. 결과 두 그룹의 XOR 이 곧 a, b. O(N) 시간, O(1) 메모리.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
arr = list(map(int, input().split()))
x = 0
for v in arr:
    x ^= v

mask = x & -x   # 가장 낮은 set bit
a = b = 0
for v in arr:
    if v & mask:
        a ^= v
    else:
        b ^= v

if a > b:
    a, b = b, a
print(a, b)
`,
      en: {
        title: "Two Singletons (LC 260)",
        description: `N integers — exactly **two** appear **once**, all others appear **twice**. Print the two lonely numbers in **ascending order**, space-separated.

Naïve XOR (abit-001) doesn't separate the two: total XOR = a ^ b.

Trick (XOR partition):
1. Total XOR = \`x = a ^ b\`. Since a ≠ b, x ≠ 0.
2. Pick **one set bit** of x (e.g. lowest): \`m = x & -x\`.
3. Split the array into 'mask bit on' and 'mask bit off' groups; XOR each. Each group contains exactly one of a, b.

The two group-XORs are a and b. Sort and print.

O(N) time, O(1) memory.

Source: LeetCode 260 (Single Number III) paraphrased`,
        constraints: "2 ≤ N ≤ 100,000 (N even), 1 ≤ each element ≤ 1,000,000,000",
        hints: [
          "x = XOR of everything = a ^ b after pairs cancel.",
          "a ≠ b ⇒ x has at least one set bit. m = x & -x isolates the lowest.",
          "Partition by 'mask bit on/off' — a and b go to different groups; pairs stay together.",
          "Sort and print smaller first.",
        ],
        solutionExplanation:
          "XOR partition — use any set bit of (a^b) to put a and b in different buckets; pairs cancel within each bucket. The two bucket-XORs are a and b. O(N) time, O(1) memory.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. 비트 reverse (32-bit) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-008",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "어려움",
      title: "32-bit 비트 뒤집기 (reverse bits)",
      description: `0 이상 2^32 미만의 정수 x 가 주어진다. x 의 **32-bit 표현을 뒤집은 값** 을 십진수로 출력하라.

예: x = 1 (0b...0001) → reverse → 0b1000...0 = 2^31 = 2147483648.

방법: 32 번 반복하며 x 의 LSB 하나씩 떼서 결과의 LSB 로 push, 결과를 shift.
\`\`\`
res = 0
for i in 32:
    res = (res << 1) | (x & 1)
    x >>= 1
\`\`\`

\`unsigned\` 또는 \`uint64_t\` 사용 — signed 로 하면 shift 동작이 골치아픔.

출처: LeetCode 190 (Reverse Bits) paraphrased`,
      constraints: "0 ≤ x < 2^32 (= 4,294,967,296)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "0", expectedOutput: "0", label: "0 뒤집어도 0" },
        { stdin: "1", expectedOutput: "2147483648", label: "1 → 2^31" },
        { stdin: "2147483648", expectedOutput: "1", label: "2^31 → 1" },
        { stdin: "4294967295", expectedOutput: "4294967295", label: "0xFFFFFFFF 대칭" },
        { stdin: "43261596", expectedOutput: "964176192", label: "LC 190 예제 1" },
        { stdin: "4294967293", expectedOutput: "3221225471", label: "LC 190 예제 2" },
        { stdin: "16", expectedOutput: "134217728", label: "0b10000 → 0b1000...0000 (27번 0)" },
      ],
      hints: [
        "uint64_t (또는 unsigned long long) 사용 — signed 는 shift 동작 미정의 위험.",
        "32 번 반복: (res << 1) | (x & 1), 그리고 x >>= 1.",
        "마지막에 res 가 정확히 32 비트만 차지하도록 — 위 방법은 자동으로 그렇게 됨.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    unsigned long long x;
    cin >> x;
    unsigned long long res = 0;
    for (int i = 0; i < 32; i++) {
        res = (res << 1) | (x & 1ULL);
        x >>= 1;
    }
    cout << res << "\\n";
    return 0;
}`,
      solutionExplanation:
        "한 비트씩 옮겨담는 정석. res 에 한 칸 shift 후 x 의 LSB 를 끼우고, x 는 한 칸 shift 빼냄. 32 번 반복 끝나면 x 의 비트가 정확히 거꾸로 res 에 쌓임.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

x = int(input())
res = 0
for _ in range(32):
    res = (res << 1) | (x & 1)
    x >>= 1
print(res)
`,
      en: {
        title: "Reverse Bits (32-bit)",
        description: `Given 0 ≤ x < 2^32, print the value of x with its **32-bit representation reversed**.

Example: x = 1 (0b...0001) → reversed → 0b1000...0 = 2^31 = 2147483648.

Approach: loop 32 times, peel x's LSB, push it as res's LSB, shift.
\`\`\`
res = 0
for i in 32:
    res = (res << 1) | (x & 1)
    x >>= 1
\`\`\`

Use \`unsigned\` / \`uint64_t\` to avoid signed-shift pitfalls.

Source: LeetCode 190 (Reverse Bits) paraphrased`,
        constraints: "0 ≤ x < 2^32 (= 4,294,967,296)",
        hints: [
          "Use uint64_t / unsigned long long — signed shifts can be undefined.",
          "Loop 32 times: res = (res << 1) | (x & 1), then x >>= 1.",
          "After 32 iterations res holds exactly the reversed 32-bit pattern.",
        ],
        solutionExplanation:
          "Standard 'peel and push' — shift res, OR in x's LSB, shift x. 32 iterations leave x's bits reversed inside res.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 부분집합 합 = K 가지 수 (bitmask DP 입문) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-009",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "어려움",
      title: "부분집합 합 = K 인 부분집합 개수 (bitmask)",
      description: `N 개의 양의 정수와 목표값 K 가 주어진다. **합이 정확히 K** 가 되는 부분집합 (공집합 제외) 의 **개수** 를 출력하라.

bitmask 완전탐색:
- 전체 부분집합 수 = 2^N.
- 각 mask (1 ~ 2^N - 1) 마다 비트가 켜진 원소들의 합 계산.
- 합 == K 면 카운트 +1.

N ≤ 16 → 2^16 = 65,536 — 충분.

이 패턴이 그대로 'TSP 비트마스크 DP' 의 핵심 골격이 됨 — 작은 N 에서 '모든 부분집합 순회' 가 가능한 게 비트마스크의 힘.

출처: 원본 (bitmask 입문 + 부분집합 합 카운트)`,
      constraints: "1 ≤ N ≤ 16, 1 ≤ K ≤ 1,000,000, 1 ≤ 각 원소 ≤ 100,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1 5\n5", expectedOutput: "1", label: "{5}" },
        { stdin: "1 5\n3", expectedOutput: "0", label: "매치 없음" },
        { stdin: "4 5\n1 2 3 4", expectedOutput: "2", label: "{1,4}, {2,3}" },
        { stdin: "3 6\n1 2 3", expectedOutput: "1", label: "{1,2,3}" },
        { stdin: "5 10\n1 2 3 4 5", expectedOutput: "3", label: "{1,4,5}, {2,3,5}, {1,2,3,4}" },
        { stdin: "6 7\n1 1 1 1 1 2", expectedOutput: "1", label: "1+1+1+1+1+2 = 7 — 단 한 가지" },
        { stdin: "5 100\n10 20 30 40 50", expectedOutput: "3", label: "{10,20,30,40}, {20,30,50}, {10,40,50}" },
        { stdin: "5 30\n10 20 30 40 50", expectedOutput: "2", label: "{30}, {10,20}" },
      ],
      hints: [
        "for mask in 1..(1<<N)-1 — 공집합 제외.",
        "각 mask 의 비트를 돌며 켜진 자리의 원소 합 누적, 합 == K 면 카운트.",
        "시간 O(2^N · N) — N=16 에서 ~100 만 연산.",
        "C++ __builtin_popcount 나 sum 미리 계산 등 최적화도 가능하지만 N ≤ 16 에선 단순 루프 OK.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    long long k;
    cin >> n >> k;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    long long count = 0;
    for (int mask = 1; mask < (1 << n); mask++) {
        long long sum = 0;
        for (int i = 0; i < n; i++) {
            if ((mask >> i) & 1) sum += a[i];
        }
        if (sum == k) count++;
    }
    cout << count << "\\n";
    return 0;
}`,
      solutionExplanation:
        "bitmask 완전탐색 — 2^N 개 부분집합 모두 순회하며 합 == K 카운트. N ≤ 20 까지 실용. 이게 비트마스크 DP (TSP 등) 의 출발점.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n, k = map(int, input().split())
a = list(map(int, input().split()))

count = 0
for mask in range(1, 1 << n):
    s = 0
    for i in range(n):
        if (mask >> i) & 1:
            s += a[i]
    if s == k:
        count += 1
print(count)
`,
      en: {
        title: "Subsets with Sum = K (bitmask)",
        description: `Given N positive integers and target K, print the **count of subsets** (excluding empty) whose sum equals K.

Bitmask brute force:
- 2^N subsets total.
- For each mask 1..2^N-1, sum the elements at set bits; count if equal to K.

N ≤ 16 → 2^16 = 65,536 — feasible.

This pattern is the skeleton for bitmask DP (e.g. TSP) — 'iterate all subsets' is the bitmask superpower at small N.

Source: original (bitmask + subset sum counting)`,
        constraints: "1 ≤ N ≤ 16, 1 ≤ K ≤ 1,000,000, 1 ≤ each element ≤ 100,000",
        hints: [
          "for mask in 1..(1<<N)-1 — skip empty set.",
          "Sum elements at set bits; increment count when sum == K.",
          "Time O(2^N · N) — about 1M ops at N=16.",
          "Optimizations possible, but plain loop is fine for N ≤ 16.",
        ],
        solutionExplanation:
          "Bitmask brute-force — enumerate all 2^N subsets and count sum matches. Practical to N ≤ 20. The starting point for bitmask DP (TSP etc.).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. hamming distance 합 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-010",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "어려움",
      title: "Hamming distance 합 (LC 477)",
      description: `N 개의 정수가 주어진다. **모든 페어 (i, j), i < j** 에 대해 두 수의 Hamming distance (XOR 의 set bit 수) 의 **총합** 을 출력하라.

순진한 방법 O(N²): 모든 페어 XOR 후 popcount — N=10^4 에서 10^8 연산, 빠듯.

영리한 방법 O(N · 30):
- **각 비트 위치 b 마다 독립적으로** — N 개 수 중 비트 b 가 1 인 개수 cnt 와 0 인 개수 (N - cnt) 의 곱이 그 비트의 기여도.
- 정답 = Σ_b cnt_b * (N - cnt_b).

이유: Hamming distance = 비트별로 다른 자리 수. 비트 b 에서 두 수가 다르려면 한 쪽 1, 한 쪽 0 → cnt_b × (N - cnt_b) 쌍.

출처: LeetCode 477 (Total Hamming Distance) paraphrased`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ 각 원소 < 2^30",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n5", expectedOutput: "0", label: "원소 1개 — 페어 없음" },
        { stdin: "2\n1 4", expectedOutput: "2", label: "1=001, 4=100 → distance 2" },
        { stdin: "3\n4 14 2", expectedOutput: "6", label: "LC 477 예제 — (4,14)=2, (4,2)=2, (14,2)=2 → 합 6" },
        { stdin: "4\n0 0 0 0", expectedOutput: "0", label: "전부 같음 → 0" },
        { stdin: "4\n1 2 4 8", expectedOutput: "12", label: "각 페어 distance = 2 → 6쌍 × 2 = 12" },
        { stdin: "5\n0 1 2 3 4", expectedOutput: "16", label: "여러 비트 섞임" },
        { stdin: "3\n1000000000 1000000000 0", expectedOutput: "26", label: "큰 값 — 10^9 = 30 비트 중 13 비트 1" },
      ],
      hints: [
        "비트별 독립 — 비트 b 의 기여 = (1 인 개수) × (0 인 개수).",
        "30 개 비트 모두 돌며 합산 → O(N · 30).",
        "answer 는 N=10^5, 비트당 (N/2)² ≈ 2.5 × 10^9 — long long 필수.",
        "각 원소를 한 번씩만 본 후 비트별 cnt[] 누적해두면 두 번째 루프는 30 번만.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    long long ans = 0;
    for (int b = 0; b < 30; b++) {
        long long cnt = 0;
        for (int x : a) if ((x >> b) & 1) cnt++;
        ans += cnt * (long long)(n - cnt);
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "비트별로 분리해서 생각하는 것이 핵심 — Hamming distance 는 비트끼리 독립이므로 각 비트의 기여를 따로 세도 됨. 비트 b 에서 다른 쌍 수 = (1 인 개수) × (0 인 개수). O(N · 30) — N²·30 → N · 30 으로 대폭 감소.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))

ans = 0
for b in range(30):
    cnt = 0
    for x in a:
        if (x >> b) & 1:
            cnt += 1
    ans += cnt * (n - cnt)
print(ans)
`,
      en: {
        title: "Total Hamming Distance (LC 477)",
        description: `Given N integers, print the **sum** of Hamming distances over **all pairs (i, j), i < j**.

Naïve O(N²) (XOR + popcount per pair) struggles at N=10^4 already.

Smart O(N · 30):
- **Each bit position b independently** — if cnt_b numbers have bit b = 1, that bit contributes cnt_b × (N - cnt_b) pairs.
- Total = Σ_b cnt_b × (N - cnt_b).

Why: Hamming distance counts mismatched bits. Bit b mismatches between two numbers iff one is 1 and the other is 0 — exactly cnt_b × (N - cnt_b) such pairs.

Source: LeetCode 477 (Total Hamming Distance) paraphrased`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ each element < 2^30",
        hints: [
          "Bits are independent — bit b contributes (ones) × (zeros).",
          "Loop all 30 bits → O(N · 30).",
          "Answer can reach ~(N/2)² · 30 — use long long.",
          "Count once per bit, no inner pair enumeration needed.",
        ],
        solutionExplanation:
          "Decompose by bit position — Hamming distance is bitwise independent, so each bit's contribution can be counted alone: ones × zeros mismatched pairs. O(N · 30) instead of O(N² · 30).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. XOR 누적 — 부분 배열 XOR = K 개수 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-011",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "어려움",
      title: "부분 배열 XOR = K 인 구간 개수 (prefix XOR + hash)",
      description: `N 개의 정수와 목표값 K 가 주어진다. **연속 부분 배열 (i ≤ j) 의 XOR 합이 정확히 K** 인 구간의 개수를 출력하라.

prefix XOR 트릭 — 'prefix sum + hash' 의 XOR 버전:
- pref[i] = arr[0] ^ arr[1] ^ ... ^ arr[i-1], pref[0] = 0.
- 구간 [l, r] 의 XOR = pref[r+1] ^ pref[l].
- 이 값이 K 면 → pref[r+1] ^ pref[l] = K → pref[l] = pref[r+1] ^ K.
- 즉 각 r 에 대해, "지금까지 본 prefix 값들 중 (pref[r+1] ^ K) 와 같은 것의 개수" 만큼 답에 더함.

해시맵으로 prefix 빈도 카운트 → O(N).

출처: GeeksforGeeks / LeetCode 1442 변형`,
      constraints: "1 ≤ N ≤ 100,000, 0 ≤ K ≤ 10^9, 0 ≤ 각 원소 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "4 6\n4 2 2 6", expectedOutput: "3", label: "[4,2], [6], [2,2,6] — 3 개 (XOR 합 = 6)" },
        { stdin: "1 5\n5", expectedOutput: "1", label: "원소 1개 — 자기 자신" },
        { stdin: "1 5\n3", expectedOutput: "0", label: "매치 없음" },
        { stdin: "5 0\n0 0 0 0 0", expectedOutput: "15", label: "모두 0 — XOR 0 → C(5,2)+5=15" },
        { stdin: "3 6\n5 6 7", expectedOutput: "1", label: "[6] 만" },
        { stdin: "4 0\n3 5 3 5", expectedOutput: "1", label: "[3,5,3,5] 전체 XOR = 0" },
      ],
      hints: [
        "prefix XOR: pref[0]=0, pref[i+1] = pref[i] ^ arr[i].",
        "구간 [l, r] XOR = pref[r+1] ^ pref[l]. 이 값 = K 면 pref[l] = pref[r+1] ^ K.",
        "해시맵 cnt[v] = 지금까지 본 prefix 값 v 의 개수. 시작 시 cnt[0] = 1.",
        "각 step 마다 ans += cnt[pref ^ K], 그 후 cnt[pref]++.",
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
    cnt[0] = 1;     // 빈 prefix
    long long pref = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        pref ^= x;
        auto it = cnt.find(pref ^ k);
        if (it != cnt.end()) ans += it->second;
        cnt[pref]++;
    }
    cout << ans << "\\n";
    return 0;
}`,
      solutionExplanation:
        "prefix XOR + hash — prefix sum 의 XOR 버전. pref[r+1] ^ pref[l] = K 인 페어 (l, r) 의 개수를 해시맵으로 O(N) 에 세면 끝. cnt[0]=1 초기화는 '시작부터 매치되는 prefix' 포함.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline
from collections import defaultdict

n, k = map(int, input().split())
arr = list(map(int, input().split()))

cnt = defaultdict(int)
cnt[0] = 1
pref = 0
ans = 0
for x in arr:
    pref ^= x
    ans += cnt[pref ^ k]
    cnt[pref] += 1
print(ans)
`,
      en: {
        title: "Subarrays with XOR = K (prefix XOR + hash)",
        description: `Given N integers and target K, count the number of **contiguous subarrays** whose XOR equals K.

Prefix XOR trick — the XOR version of 'prefix sum + hash':
- pref[i] = arr[0] ^ ... ^ arr[i-1], pref[0] = 0.
- XOR of [l, r] = pref[r+1] ^ pref[l].
- = K  ⇒  pref[l] = pref[r+1] ^ K.
- For each r, add the number of previously seen prefixes equal to pref[r+1] ^ K.

Use a hashmap of prefix counts → O(N).

Source: GeeksforGeeks / LeetCode 1442 variant`,
        constraints: "1 ≤ N ≤ 100,000, 0 ≤ K ≤ 10^9, 0 ≤ each element ≤ 10^9",
        hints: [
          "prefix XOR: pref[0]=0, pref[i+1] = pref[i] ^ arr[i].",
          "Subarray XOR [l, r] = pref[r+1] ^ pref[l]; = K ⇒ pref[l] = pref[r+1] ^ K.",
          "Hashmap cnt[v]; initialize cnt[0] = 1 (empty prefix).",
          "Each step: ans += cnt[pref ^ K]; then cnt[pref]++.",
        ],
        solutionExplanation:
          "prefix XOR + hash — the XOR analogue of prefix sum + hash. Hash counts of prefixes find all (l, r) with pref[r+1] ^ pref[l] = K in O(N). The cnt[0]=1 init lets prefixes that match from index 0 count too.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. set bit count 누적 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "abit-012",
      cluster: "algo-bitmanipulation-contest",
      unlockAfter: "algo-bitmanipulation",
      difficulty: "어려움",
      title: "1..N set bit 총합 (LC 338 누적)",
      description: `정수 N 이 주어진다. **1 부터 N 까지** 모든 정수의 **set bit 수의 총합** 을 출력하라.

예: N=5 → 1(1) + 2(1) + 3(2) + 4(1) + 5(2) = 7.

방법 1 (간단, O(N · log N)): 1..N 모두 popcount 합산. N ≤ 10^7 까지 OK.

방법 2 (영리, O(N)): DP 점화식 \`bits[i] = bits[i >> 1] + (i & 1)\`.
- i 의 비트 = i/2 의 비트 + (i 의 마지막 비트).
- bits[] 배열 만들면서 누적.

방법 3 (수학, O(log N)): 비트 위치 b 마다 1..N 중 비트 b 가 1 인 개수를 계산 — \`(N+1) / 2^(b+1) * 2^b + max(0, (N+1) mod 2^(b+1) - 2^b)\`. 가장 빠르지만 구현 까다로움. 학습 단계에선 방법 1 또는 2 권장.

출처: LeetCode 338 (Counting Bits) cumulative variant — BOJ 1066 단순화`,
      constraints: "1 ≤ N ≤ 10,000,000 (10^7)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1", expectedOutput: "1", label: "1 (=1 비트)" },
        { stdin: "2", expectedOutput: "2", label: "1+1 = 2" },
        { stdin: "5", expectedOutput: "7", label: "1+1+2+1+2 = 7" },
        { stdin: "10", expectedOutput: "17", label: "1..10 set bit 누적" },
        { stdin: "16", expectedOutput: "33", label: "1..16" },
        { stdin: "100", expectedOutput: "319", label: "1..100" },
        { stdin: "1000", expectedOutput: "4938", label: "1..1000" },
        { stdin: "10000000", expectedOutput: "114434632", label: "10^7 — DP 또는 빠른 popcount 필요" },
      ],
      hints: [
        "방법 A (단순): 1..N 모두 __builtin_popcount 합 — N=10^7 에서도 충분히 빠름 (~100ms).",
        "방법 B (DP): bits[i] = bits[i >> 1] + (i & 1). 메모리 4N 바이트 (N=10^7 이면 40MB — int 로 충분).",
        "long long 누적 — N=10^7 에서 답이 ~10^8 이므로 long long 안전.",
        "방법 B 가 cache friendly 라 약간 더 빠를 수 있지만 둘 다 통과.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    // 방법 B — bits[i] = bits[i >> 1] + (i & 1)
    vector<int> bits(n + 1, 0);
    long long total = 0;
    for (int i = 1; i <= n; i++) {
        bits[i] = bits[i >> 1] + (i & 1);
        total += bits[i];
    }
    cout << total << "\\n";
    return 0;
}`,
      solutionExplanation:
        "DP 점화식 bits[i] = bits[i/2] + (i 의 LSB). i 의 비트 패턴 = i/2 의 비트 패턴 + 마지막 1 비트. 계산 O(N), popcount 호출 없이 한 번씩만. 누적합은 long long.",
      pyInitialCode: `import sys
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
input = sys.stdin.readline

n = int(input())
# 방법 A — 큰 N 에서도 Python 의 int.bit_count() 가 매우 빠름
total = 0
for i in range(1, n + 1):
    total += bin(i).count('1')
print(total)
`,
      en: {
        title: "Set Bits 1..N (cumulative)",
        description: `Given N, print the **total number of set bits** over **1, 2, ..., N**.

Example: N=5 → 1(1) + 2(1) + 3(2) + 4(1) + 5(2) = 7.

Method 1 (simple, O(N log N)): popcount every i. Fine up to N ≤ 10^7.

Method 2 (smart, O(N)): DP \`bits[i] = bits[i >> 1] + (i & 1)\`.
- The bits of i = bits of i/2 + i's last bit.

Method 3 (math, O(log N)): per-bit count formula. Fastest but trickiest; the two above are recommended at learning stage.

Source: LeetCode 338 (Counting Bits) cumulative — BOJ 1066 simplified`,
        constraints: "1 ≤ N ≤ 10,000,000 (10^7)",
        hints: [
          "Method A: sum __builtin_popcount(i) for i=1..N — fast enough at N=10^7.",
          "Method B (DP): bits[i] = bits[i >> 1] + (i & 1). ~40MB at N=10^7 (int array).",
          "Use long long for the running sum.",
          "Method B is a bit more cache-friendly; both pass.",
        ],
        solutionExplanation:
          "DP: bits[i] = bits[i/2] + last bit of i. Compute each value once, O(N). Sum into long long.",
      },
    },
  ],
}
