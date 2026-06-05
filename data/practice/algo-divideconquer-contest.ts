import type { PracticeCluster } from "./types"

export const divideConquerContestCluster: PracticeCluster = {
  id: "algo-divideconquer-contest",
  title: "분할 정복 문제 풀이",
  emoji: "✂️",
  description: "Divide → Conquer → Combine — 머지 소트, 빠른 거듭제곱, 쿼드트리 등",
  unlockAfter: "algo-divideconquer",
  en: {
    title: "Divide & Conquer Practice",
    description: "Divide → Conquer → Combine — merge sort, fast power, quadtree, and more",
  },
  problems: [
    // ═══════════ 쉬움 입문 (on-ramp) ═══════════
    {
      id: "adc-e01",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "쉬움",
      title: "빠른 거듭제곱 (A^B mod M)",
      description: `정수 A, B, M이 주어집니다. \`A^B\`를 \`M\`으로 나눈 나머지를 출력하세요.

B가 최대 10억까지 커질 수 있어 A를 B번 곱하면 느립니다. **분할정복(이진 거듭제곱)**:
- B 짝수: \`A^B = (A^(B/2))^2\`
- B 홀수: \`A^B = A × A^(B-1)\`

곱셈 횟수가 B번 → 약 log₂(B)번으로 줄어요. 입력: \`A B M\`. 예: \`2 10 1000\` → 24.`,
      constraints: "0 ≤ A ≤ 1,000,000  /  0 ≤ B ≤ 1,000,000,000  /  1 ≤ M ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long A, B, M;
    cin >> A >> B >> M;
    // TODO: 이진 거듭제곱으로 A^B mod M (곱할 때마다 % M)
    return 0;
}`,
      pyInitialCode: `A, B, M = map(int, input().split())
# TODO: 이진 거듭제곱으로 A^B mod M`,
      testCases: [
        { stdin: "2 10 1000", expectedOutput: "24" },
        { stdin: "3 4 100", expectedOutput: "81" },
        { stdin: "5 0 7", expectedOutput: "1" },
        { stdin: "7 3 5", expectedOutput: "3" },
        { stdin: "10 9 1000000000", expectedOutput: "0" },
      ],
      hints: [
        "half = power(A, B/2, M) 를 먼저 구하면, 짝수일 때 답은 half*half % M.",
        "홀수면 half*half 에 A를 한 번 더 곱한다.",
        "곱할 때마다 % M (half < M < 10^9 이라 half*half < 10^18, long long 안전).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long power(long long a, long long b, long long m) {
    a %= m;
    if (b == 0) return 1 % m;
    long long half = power(a, b / 2, m);
    long long sq = (half * half) % m;
    if (b % 2 == 1) sq = (sq * a) % m;
    return sq;
}

int main() {
    long long A, B, M;
    cin >> A >> B >> M;
    cout << power(A, B, M) << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
sys.setrecursionlimit(100)

def power(a, b, m):
    a %= m
    if b == 0:
        return 1 % m
    half = power(a, b // 2, m)
    sq = (half * half) % m
    if b % 2 == 1:
        sq = (sq * a) % m
    return sq

A, B, M = map(int, input().split())
print(power(A, B, M))`,
      solutionExplanation: "지수를 절반으로 쪼개 곱셈을 log₂(B)번으로 줄입니다. 짝수면 절반의 제곱, 홀수면 거기에 A를 한 번 더. 매 곱셈마다 %M.",
      en: {
        title: "Fast Exponentiation (A^B mod M)",
        description: `Output A^B mod M with binary exponentiation: even → (A^(B/2))^2, odd → A × A^(B-1). ~log₂(B) multiplies. e.g. 2 10 1000 → 24.`,
        constraints: "0 ≤ A ≤ 1e6, 0 ≤ B ≤ 1e9, 1 ≤ M ≤ 1e9",
        hints: ["Compute half=power(A,B/2,M) first.", "Odd → multiply by A once more.", "Mod after each multiply."],
        solutionExplanation: "Halve the exponent; square the half, multiply once more if odd, mod each step.",
      },
    },
    {
      id: "adc-e02",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "쉬움",
      title: "분할정복으로 배열 최댓값",
      description: `정수 N개의 **최댓값**을 출력하세요. 반복문 대신 **분할정복**으로 연습합니다.

구간 [l,r]의 최댓값 = 절반으로 나눠 왼쪽 최댓값, 오른쪽 최댓값을 재귀로 구한 뒤 둘 중 큰 값. 길이 1이면(l==r) 그 원소가 답.

입력: 첫 줄 N, 둘째 줄 정수 N개.`,
      constraints: "1 ≤ N ≤ 100,000  /  |각 정수| ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;
int a[100005];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    // TODO: solve(0, n-1) 분할정복 최댓값
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(300000)
n = int(input())
a = list(map(int, input().split()))
# TODO: 분할정복 최댓값`,
      testCases: [
        { stdin: "5\n3 7 2 9 4", expectedOutput: "9" },
        { stdin: "1\n42", expectedOutput: "42" },
        { stdin: "4\n-5 -2 -8 -1", expectedOutput: "-1" },
        { stdin: "6\n10 10 10 10 10 10", expectedOutput: "10" },
        { stdin: "3\n1000000000 -1000000000 0", expectedOutput: "1000000000" },
      ],
      hints: [
        "solve(l, r): l==r 이면 a[l] 반환.",
        "mid=(l+r)/2, max(solve(l,mid), solve(mid+1,r)).",
        "base case에서 원소를 반환하면 음수만 있어도 안전.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;
int a[100005];

int solve(int l, int r) {
    if (l == r) return a[l];
    int mid = (l + r) / 2;
    return max(solve(l, mid), solve(mid + 1, r));
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << solve(0, n - 1) << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(300000)

def solve(l, r):
    if l == r:
        return a[l]
    mid = (l + r) // 2
    return max(solve(l, mid), solve(mid + 1, r))

n = int(input())
a = list(map(int, input().split()))
print(solve(0, n - 1))`,
      solutionExplanation: "구간을 절반으로 나눠 각 절반의 최댓값을 재귀로 구하고 큰 쪽을 반환합니다. base case가 원소 자체라 음수만 있어도 정확합니다.",
      en: {
        title: "Array Maximum by Divide and Conquer",
        description: `Print the max of N integers using divide and conquer: split at mid, max of both halves; length-1 returns the element.`,
        constraints: "1 ≤ N ≤ 100,000, |int| ≤ 1e9",
        hints: ["solve(l,r): l==r → a[l].", "mid split, max of halves.", "Base case returns the element (handles negatives)."],
        solutionExplanation: "Recurse on halves and take the larger; base case returns the single element.",
      },
    },
    {
      id: "adc-e03",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "쉬움",
      title: "분할정복으로 합 구하기",
      description: `정수 N개의 **합**을 출력하세요. 반복문 대신 **분할정복**으로 좌/우를 나눠 더합니다.

구간 [l,r]의 합 = 절반으로 나눠 왼쪽 합 + 오른쪽 합. 길이 1이면 그 원소가 합.

입력: 첫 줄 N, 둘째 줄 정수 N개. (합은 커질 수 있어 long long 필요)`,
      constraints: "1 ≤ N ≤ 100,000  /  |각 정수| ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;
long long a[100005];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    // TODO: 분할정복 합 (long long!)
    return 0;
}`,
      pyInitialCode: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(300000)
n = int(input())
a = list(map(int, input().split()))
# TODO: 분할정복 합`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "15" },
        { stdin: "1\n7", expectedOutput: "7" },
        { stdin: "4\n-1 -2 -3 -4", expectedOutput: "-10" },
        { stdin: "3\n1000000000 1000000000 1000000000", expectedOutput: "3000000000" },
        { stdin: "6\n0 0 0 0 0 0", expectedOutput: "0" },
      ],
      hints: [
        "solve(l, r): l==r 이면 a[l].",
        "mid 로 나눠 solve(l,mid)+solve(mid+1,r).",
        "합이 10^14까지 커지니 long long 사용(파이썬은 자동).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;
long long a[100005];

long long solve(int l, int r) {
    if (l == r) return a[l];
    int mid = (l + r) / 2;
    return solve(l, mid) + solve(mid + 1, r);
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << solve(0, n - 1) << '\\n';
    return 0;
}`,
      pySolutionCode: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(300000)

def solve(l, r):
    if l == r:
        return a[l]
    mid = (l + r) // 2
    return solve(l, mid) + solve(mid + 1, r)

n = int(input())
a = list(map(int, input().split()))
print(solve(0, n - 1))`,
      solutionExplanation: "구간을 절반으로 나눠 두 합을 재귀로 구해 더합니다. 합이 10^14까지 커질 수 있어 long long을 씁니다.",
      en: {
        title: "Sum by Divide and Conquer",
        description: `Print the sum of N integers via divide and conquer (split, sum both halves). Use long long (sum up to 1e14).`,
        constraints: "1 ≤ N ≤ 100,000, |int| ≤ 1e9",
        hints: ["solve(l,r): l==r → a[l].", "Add the two halves.", "long long for the sum."],
        solutionExplanation: "Recurse on halves and add; long long avoids overflow.",
      },
    },
    // ─────────────────────────────────────────────────────────────────
    // 1. 머지 소트 구현 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-001",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "보통",
      title: "머지 소트 직접 구현",
      description: `N 개의 정수가 주어진다. **\`sort\` 같은 내장 정렬을 쓰지 말고 머지 소트를 직접 구현해** 오름차순으로 출력하라.

핵심:
- 배열을 반으로 잘라 각각 재귀 정렬
- 두 정렬된 절반을 \`merge\` 로 합치기 (앞만 비교)
- 베이스: 길이 ≤ 1 → 이미 정렬됨

출처: 원본 (머지 소트 직접 구현 — 분할 정복 기초)`,
      constraints: "1 ≤ N ≤ 1000, -1,000,000 ≤ 각 원소 ≤ 1,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "6\n5 2 8 1 9 3", expectedOutput: "1 2 3 5 8 9", label: "기본" },
        { stdin: "1\n42", expectedOutput: "42", label: "원소 1개" },
        { stdin: "5\n5 4 3 2 1", expectedOutput: "1 2 3 4 5", label: "역순" },
        { stdin: "5\n1 2 3 4 5", expectedOutput: "1 2 3 4 5", label: "이미 정렬" },
        { stdin: "4\n3 3 3 3", expectedOutput: "3 3 3 3", label: "중복" },
        { stdin: "6\n-1 -5 3 0 -2 4", expectedOutput: "-5 -2 -1 0 3 4", label: "음수 포함" },
        { stdin: "2\n7 7", expectedOutput: "7 7", label: "같은 두 원소" },
      ],
      hints: [
        "재귀 함수 `mergeSort(arr)` — 길이 ≤ 1 이면 그대로 반환.",
        "mid = len // 2. left = mergeSort(앞쪽), right = mergeSort(뒤쪽).",
        "merge(left, right): 인덱스 두 개를 앞에서부터 비교하며 작은 쪽을 결과에 추가.",
        "한 쪽이 다 끝나면 다른 쪽 남은 거 통째로 붙임.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> mergeTwo(const vector<int>& a, const vector<int>& b) {
    vector<int> res;
    res.reserve(a.size() + b.size());
    int i = 0, j = 0;
    while (i < (int)a.size() && j < (int)b.size()) {
        if (a[i] <= b[j]) res.push_back(a[i++]);
        else              res.push_back(b[j++]);
    }
    while (i < (int)a.size()) res.push_back(a[i++]);
    while (j < (int)b.size()) res.push_back(b[j++]);
    return res;
}

vector<int> mergeSort(vector<int> arr) {
    if (arr.size() <= 1) return arr;
    int mid = arr.size() / 2;
    vector<int> left(arr.begin(), arr.begin() + mid);
    vector<int> right(arr.begin() + mid, arr.end());
    left = mergeSort(left);
    right = mergeSort(right);
    return mergeTwo(left, right);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    auto sorted = mergeSort(arr);
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << ' ';
        cout << sorted[i];
    }
    cout << "\\n";
    return 0;
}`,
      solutionExplanation:
        "머지 소트의 3 단계 그대로 — Divide (반으로) → Conquer (재귀) → Combine (merge). merge 는 두 정렬 배열의 앞만 비교하며 작은 쪽을 결과에 추가하는 O(N) 작업. 전체 O(N log N), 어떤 입력이든 보장.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

def merge_two(a, b):
    res = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            res.append(a[i]); i += 1
        else:
            res.append(b[j]); j += 1
    res.extend(a[i:])
    res.extend(b[j:])
    return res

def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge_two(left, right)

n = int(input())
arr = list(map(int, input().split()))
print(" ".join(map(str, merge_sort(arr))))
`,
      en: {
        title: "Implement Merge Sort",
        description: `Given N integers, **implement merge sort yourself** (no built-in sort) and print them in ascending order.

Core idea:
- Halve the array, recursively sort each half
- Merge two sorted halves with \`merge\` (compare fronts)
- Base: length ≤ 1 → already sorted

Source: original (hand-rolled merge sort — D&C basics)`,
        constraints: "1 ≤ N ≤ 1000, -1,000,000 ≤ each element ≤ 1,000,000",
        hints: [
          "Recursive `mergeSort(arr)` — if length ≤ 1, return as-is.",
          "mid = len // 2. left = mergeSort(first half), right = mergeSort(second half).",
          "merge(left, right): two pointers, advance whichever is smaller, add to result.",
          "When one side ends, append the rest of the other side.",
        ],
        solutionExplanation:
          "Direct 3-step merge sort — Divide → Conquer → Combine. Merge compares fronts of two sorted arrays, O(N). Total O(N log N), guaranteed for any input.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 2. 거듭제곱 mod M — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-002",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "보통",
      title: "거듭제곱 빠르게 (mod M)",
      description: `세 정수 \`A\`, \`B\`, \`M\` 이 주어진다. \`A^B mod M\` 을 **O(log B)** 분할 정복으로 계산해 출력하라.

핵심:
- B 가 짝수: \`A^B = (A^(B/2))^2\` — half 한 번만 계산해서 제곱!
- B 가 홀수: \`A^B = A · A^(B-1)\`
- 베이스: \`B = 0\` → \`1 mod M\`

매 곱셈마다 \`mod M\` 적용해 오버플로우 방지. \`(10^9)^2 = 10^18\` 까지 가니 long long 필수.

출처: BOJ 1629 (곱셈) paraphrased`,
      constraints: "1 ≤ A, B, M ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "10 11 12", expectedOutput: "4", label: "10^11 mod 12 = 4" },
        { stdin: "2 10 1000", expectedOutput: "24", label: "2^10 = 1024, mod 1000 = 24" },
        { stdin: "3 5 1000000", expectedOutput: "243", label: "3^5 = 243" },
        { stdin: "5 0 7", expectedOutput: "1", label: "베이스 B=0 → 1" },
        { stdin: "7 1 100", expectedOutput: "7", label: "B=1" },
        { stdin: "2 30 1000000", expectedOutput: "741824", label: "2^30 mod 10^6" },
        { stdin: "1 1000000000 999999999", expectedOutput: "1", label: "1 의 거듭제곱 = 1" },
        { stdin: "1000000000 1000000000 1000000000", expectedOutput: "0", label: "큰 입력 — A mod M = 0" },
      ],
      hints: [
        "재귀 `powMod(a, b, m)` — base: b == 0 → 1 % m.",
        "짝수: `half = powMod(a, b/2, m); return half * half % m;` — half 두 번 호출 X.",
        "홀수: `return (a % m) * powMod(a, b-1, m) % m;` (또는 b/2 + 한 번 곱)",
        "곱이 10^18 까지 가능 → 모든 변수 long long.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long powMod(long long a, long long b, long long m) {
    if (b == 0) return 1 % m;
    if (b % 2 == 0) {
        long long half = powMod(a, b / 2, m);
        return half * half % m;
    } else {
        return a % m * powMod(a, b - 1, m) % m;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    long long a, b, m;
    cin >> a >> b >> m;
    cout << powMod(a, b, m) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "분할 정복의 대표 예 — B 를 반으로 줄이며 재귀하면 O(log B). half 를 변수에 저장해 한 번만 호출 (두 번 호출하면 다시 O(B)). 매 곱셈마다 mod 로 오버플로우 차단.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

def pow_mod(a, b, m):
    if b == 0:
        return 1 % m
    if b % 2 == 0:
        half = pow_mod(a, b // 2, m)
        return half * half % m
    return a % m * pow_mod(a, b - 1, m) % m

a, b, m = map(int, input().split())
print(pow_mod(a, b, m))
`,
      en: {
        title: "Fast Power (mod M)",
        description: `Given \`A\`, \`B\`, \`M\`, compute \`A^B mod M\` in **O(log B)** via divide-and-conquer.

Core:
- B even: \`A^B = (A^(B/2))^2\` — compute half ONCE and square!
- B odd: \`A^B = A · A^(B-1)\`
- Base: \`B = 0\` → \`1 mod M\`

Apply \`mod M\` every multiplication. Products reach \`(10^9)^2 = 10^18\` — long long required.

Source: BOJ 1629 paraphrased`,
        constraints: "1 ≤ A, B, M ≤ 1,000,000,000",
        hints: [
          "Recursive `powMod(a, b, m)` — base: b == 0 → 1 % m.",
          "Even: `half = powMod(a, b/2, m); return half * half % m;` — don't call half twice.",
          "Odd: `return (a % m) * powMod(a, b-1, m) % m;`",
          "Products can reach 10^18 — all variables long long.",
        ],
        solutionExplanation:
          "Halve B each call → O(log B). Save half in a variable (calling it twice degrades to O(B)). Mod after every multiplication to prevent overflow.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 3. 행렬 거듭제곱 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-003",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "보통",
      title: "2×2 행렬 거듭제곱 (mod 1000)",
      description: `2×2 정수 행렬 \`A\` 와 거듭제곱 횟수 \`B\` 가 주어진다. \`A^B mod 1000\` 의 각 원소를 출력하라.

입력:
- 첫 줄: B
- 다음 두 줄: 2×2 행렬 (각 줄에 두 정수)

출력:
- 2 줄, 각 줄에 두 정수 (공백 구분) — 행렬 거듭제곱 결과 mod 1000

핵심 — 숫자 거듭제곱과 똑같은 분할 정복:
- B 짝수: \`A^B = (A^(B/2))^2\` (행렬 곱)
- B 홀수: \`A^B = A · A^(B-1)\`
- 베이스: B = 0 → 단위 행렬 \`[[1,0],[0,1]]\`

2×2 행렬 곱은 직접 4 개 원소 계산. 매 곱셈마다 mod 적용.

출처: BOJ 10830 (행렬 제곱) simplified to 2×2 with fixed mod`,
      constraints: "1 ≤ B ≤ 100,000,000,000 (10^11), 행렬 원소 ≤ 1000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n1 1\n1 0", expectedOutput: "1 1\n1 0", label: "B=1 — 그대로" },
        { stdin: "2\n1 1\n1 0", expectedOutput: "2 1\n1 1", label: "피보나치 행렬 ^2" },
        { stdin: "5\n1 1\n1 0", expectedOutput: "8 5\n5 3", label: "피보나치 행렬 ^5 → fib(6)=8, fib(5)=5" },
        { stdin: "0\n7 7\n7 7", expectedOutput: "1 0\n0 1", label: "B=0 — 단위 행렬" },
        { stdin: "3\n2 0\n0 2", expectedOutput: "8 0\n0 8", label: "대각 행렬" },
        { stdin: "10\n1 1\n1 0", expectedOutput: "89 55\n55 34", label: "fib(11)=89, fib(10)=55" },
        { stdin: "100\n1 1\n1 0", expectedOutput: "101 75\n75 26", label: "fib(101), fib(100), fib(99) mod 1000" },
      ],
      hints: [
        "행렬 곱 함수 `mul(A, B)` — 결과 C[i][j] = sum(A[i][k]*B[k][j]). 2×2 면 8 곱 4 합.",
        "분할 정복: 숫자 거듭제곱이랑 똑같은 구조, 곱하기를 행렬 곱으로 바꾸기만.",
        "베이스 B=0 → 단위행렬 ((1,0),(0,1)).",
        "모든 행렬 곱 결과에 % 1000 적용.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000;

typedef vector<vector<long long>> Mat;

Mat mul(const Mat& A, const Mat& B) {
    Mat C(2, vector<long long>(2, 0));
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
    return C;
}

Mat matPow(Mat A, long long b) {
    if (b == 0) return {{1, 0}, {0, 1}};   // 단위 행렬
    if (b % 2 == 0) {
        Mat half = matPow(A, b / 2);
        return mul(half, half);
    }
    return mul(A, matPow(A, b - 1));
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    long long b;
    cin >> b;
    Mat A(2, vector<long long>(2, 0));
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            cin >> A[i][j];
    // 입력 행렬도 mod 적용
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            A[i][j] %= MOD;
    Mat R = matPow(A, b);
    cout << R[0][0] << ' ' << R[0][1] << "\\n";
    cout << R[1][0] << ' ' << R[1][1] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "숫자 거듭제곱과 *완전히 같은 구조* — 곱하기를 행렬 곱으로 바꾸기만. 베이스는 단위 행렬, 짝수면 half² (mul(half, half)), 홀수면 A × A^(B-1). 매 곱셈마다 mod. 피보나치 등 점화식을 행렬로 표현하면 O(log N) 으로 가속.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

MOD = 1000

def mul(A, B):
    C = [[0, 0], [0, 0]]
    for i in range(2):
        for j in range(2):
            for k in range(2):
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD
    return C

def mat_pow(A, b):
    if b == 0:
        return [[1, 0], [0, 1]]
    if b % 2 == 0:
        half = mat_pow(A, b // 2)
        return mul(half, half)
    return mul(A, mat_pow(A, b - 1))

b = int(input())
A = [list(map(int, input().split())) for _ in range(2)]
for i in range(2):
    for j in range(2):
        A[i][j] %= MOD
R = mat_pow(A, b)
print(R[0][0], R[0][1])
print(R[1][0], R[1][1])
`,
      en: {
        title: "2×2 Matrix Power (mod 1000)",
        description: `Given a 2×2 integer matrix \`A\` and exponent \`B\`, print \`A^B mod 1000\`.

Input:
- Line 1: B
- Lines 2-3: 2×2 matrix (two ints per line)

Output:
- 2 lines, two ints each — \`A^B mod 1000\`

Same D&C pattern as scalar power:
- B even: \`A^B = (A^(B/2))^2\` (matrix multiplication)
- B odd: \`A^B = A · A^(B-1)\`
- Base: B = 0 → identity \`[[1,0],[0,1]]\`

Compute 2×2 matrix products directly. Mod after every product.

Source: BOJ 10830 simplified to 2×2 with fixed mod`,
        constraints: "1 ≤ B ≤ 10^11, matrix elements ≤ 1000",
        hints: [
          "`mul(A, B)` — C[i][j] = sum(A[i][k]*B[k][j]). For 2×2, 8 mults + 4 adds.",
          "D&C: exactly the scalar power structure, just swap mult for matmul.",
          "Base B=0 → identity ((1,0),(0,1)).",
          "Apply % 1000 after every matrix multiplication.",
        ],
        solutionExplanation:
          "Identical to scalar fast power, just with matrix multiplication. Base = identity. Even: mul(half, half). Odd: mul(A, A^(B-1)). Mod after every product. Linear recurrences (like Fibonacci) accelerate to O(log N) via this trick.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 4. 최대 부분합 (분할 정복) — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-004",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "보통",
      title: "최대 부분합 (분할 정복)",
      description: `N 개의 정수가 주어진다. 연속한 부분배열의 합이 최대가 되는 값을 **분할 정복** 으로 계산해 출력하라. (Kadane O(N) 으로도 풀 수 있지만 여기서는 분할 정복 패턴 연습)

핵심 — 3 가지 경우:
1. 최대 부분합이 *왼쪽 절반* 안 → 재귀
2. 최대 부분합이 *오른쪽 절반* 안 → 재귀
3. 최대 부분합이 *가운데 가로지름* → 직접 계산 (가운데에서 왼쪽으로 누적 최대 + 오른쪽으로 누적 최대)

답 = 세 후보 중 최대값.

T(N) = 2T(N/2) + N → O(N log N).

원소가 모두 음수면 답은 가장 큰 음수 원소 (빈 부분배열 X — 최소 한 개 골라야 함).

출처: LeetCode 53 (Maximum Subarray) — D&C 풀이`,
      constraints: "1 ≤ N ≤ 1000, -10,000 ≤ 각 원소 ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "9\n-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6", label: "고전 — [4,-1,2,1] = 6" },
        { stdin: "1\n5", expectedOutput: "5", label: "원소 1개 — 양수" },
        { stdin: "1\n-7", expectedOutput: "-7", label: "원소 1개 — 음수" },
        { stdin: "5\n-1 -2 -3 -4 -5", expectedOutput: "-1", label: "전부 음수 — 가장 큰 음수" },
        { stdin: "5\n1 2 3 4 5", expectedOutput: "15", label: "전부 양수 — 전체 합" },
        { stdin: "6\n5 -1 5 -1 5 -1", expectedOutput: "13", label: "패턴 — [5,-1,5,-1,5]" },
        { stdin: "4\n10 -100 10 10", expectedOutput: "20", label: "큰 음수가 갈라놓음" },
      ],
      hints: [
        "함수 `solve(l, r)` — [l, r] 구간의 최대 부분합 반환.",
        "베이스: l == r → arr[l].",
        "재귀: mid = (l+r)/2. leftMax = solve(l, mid). rightMax = solve(mid+1, r).",
        "Cross: mid 에서 왼쪽으로 누적 최대 + mid+1 에서 오른쪽으로 누적 최대.",
        "답 = max(leftMax, rightMax, crossMax).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> arr;

int solve(int l, int r) {
    if (l == r) return arr[l];
    int mid = (l + r) / 2;
    int leftMax = solve(l, mid);
    int rightMax = solve(mid + 1, r);

    // Cross: mid 에서 왼쪽으로 누적 최대
    int sum = 0, leftCross = INT_MIN;
    for (int i = mid; i >= l; i--) {
        sum += arr[i];
        leftCross = max(leftCross, sum);
    }
    // mid+1 에서 오른쪽으로
    sum = 0;
    int rightCross = INT_MIN;
    for (int i = mid + 1; i <= r; i++) {
        sum += arr[i];
        rightCross = max(rightCross, sum);
    }
    int crossMax = leftCross + rightCross;

    return max({leftMax, rightMax, crossMax});
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    arr.assign(n, 0);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << solve(0, n - 1) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "분할 정복의 'combine' 단계가 핵심 — 가운데를 가로지르는 최대 부분합은 mid 에서 양쪽으로 펼치며 누적 최대를 구함. O(N) 의 cross 계산 × log N 단계 = O(N log N). Kadane 의 O(N) 보다 느리지만 분할 정복 사고 연습.",
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

def solve(l, r):
    if l == r:
        return arr[l]
    mid = (l + r) // 2
    left_max = solve(l, mid)
    right_max = solve(mid + 1, r)
    s = 0
    left_cross = -10**18
    for i in range(mid, l - 1, -1):
        s += arr[i]
        if s > left_cross:
            left_cross = s
    s = 0
    right_cross = -10**18
    for i in range(mid + 1, r + 1):
        s += arr[i]
        if s > right_cross:
            right_cross = s
    return max(left_max, right_max, left_cross + right_cross)

print(solve(0, n - 1))
`,
      en: {
        title: "Maximum Subarray (Divide & Conquer)",
        description: `Given N integers, find the maximum sum of any contiguous non-empty subarray using **divide & conquer**. (Kadane is O(N), but practice D&C here.)

Three cases:
1. Max subarray is in the *left half* → recurse.
2. Max subarray is in the *right half* → recurse.
3. Max subarray *crosses the middle* → compute directly (max prefix sum ending at mid + max prefix sum starting at mid+1).

Answer = max of the three.

T(N) = 2T(N/2) + N → O(N log N).

If all negative, answer is the largest (least negative) single element (subarray must be non-empty).

Source: LeetCode 53 D&C variant`,
        constraints: "1 ≤ N ≤ 1000, -10,000 ≤ each element ≤ 10,000",
        hints: [
          "`solve(l, r)` — max subarray sum on [l, r].",
          "Base: l == r → arr[l].",
          "Recurse: mid = (l+r)/2; leftMax = solve(l, mid); rightMax = solve(mid+1, r).",
          "Cross: max-suffix-from-mid (going left) + max-prefix-from-mid+1 (going right).",
          "Answer = max(left, right, cross).",
        ],
        solutionExplanation:
          "The 'combine' step is the heart — cross-mid maximum fans out from the middle accumulating max sums. O(N) cross × log N levels = O(N log N). Slower than Kadane's O(N) but great D&C practice.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 5. 색종이 만들기 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-005",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "보통",
      title: "색종이 만들기 (N×N 분할)",
      description: `N×N 격자가 \`0\` (하양) 또는 \`1\` (파랑) 으로 채워져 있다. N 은 2 의 거듭제곱.

규칙:
- 격자 안 모든 칸이 *같은 색* 이면 → 색종이 하나
- 아니면 → 격자를 정확히 4 등분하고 각 부분에 같은 규칙 재귀 적용

만들어지는 **하양 색종이 개수** 와 **파랑 색종이 개수** 를 두 줄로 출력하라.

입력:
- 첫 줄: N
- 다음 N 줄: 각 줄에 N 개의 공백 구분 정수 (0 또는 1)

출력:
- 첫 줄: 하양 개수
- 둘째 줄: 파랑 개수

출처: BOJ 2630 (색종이 만들기)`,
      constraints: "N 은 1, 2, 4, 8, 16, ..., 128 중 하나 (2 의 거듭제곱)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n0", expectedOutput: "1\n0", label: "1×1 하양" },
        { stdin: "1\n1", expectedOutput: "0\n1", label: "1×1 파랑" },
        { stdin: "2\n0 0\n0 0", expectedOutput: "1\n0", label: "2×2 모두 하양" },
        { stdin: "2\n1 0\n0 1", expectedOutput: "2\n2", label: "2×2 섞임 — 각 칸 1 개씩" },
        {
          stdin: "4\n1 1 0 0\n1 1 0 0\n0 0 1 1\n0 0 1 1",
          expectedOutput: "2\n2",
          label: "4×4 — 사분면별로 단색",
        },
        {
          stdin:
            "8\n1 1 0 0 0 0 1 1\n1 1 0 0 0 0 1 1\n0 0 0 0 1 1 0 0\n0 0 0 0 1 1 0 0\n1 0 0 0 1 1 1 1\n0 1 0 0 1 1 1 1\n0 0 1 1 1 1 1 1\n0 0 1 1 1 1 1 1",
          expectedOutput: "9\n7",
          label: "BOJ 2630 샘플",
        },
      ],
      hints: [
        "재귀 `solve(r, c, size)` — (r, c) 에서 시작하는 size × size 영역 처리.",
        "먼저 모두 같은 색인지 확인 (이중 for 로 첫 원소와 비교).",
        "같으면 white++ or blue++ 하고 종료.",
        "아니면 size/2 로 4 등분: (r, c), (r, c+s/2), (r+s/2, c), (r+s/2, c+s/2) 에 재귀.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> grid;
int white = 0, blue = 0;

void solve(int r, int c, int sz) {
    int first = grid[r][c];
    bool same = true;
    for (int i = r; i < r + sz && same; i++)
        for (int j = c; j < c + sz && same; j++)
            if (grid[i][j] != first) same = false;

    if (same) {
        if (first == 0) white++;
        else            blue++;
        return;
    }
    int h = sz / 2;
    solve(r,     c,     h);
    solve(r,     c + h, h);
    solve(r + h, c,     h);
    solve(r + h, c + h, h);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    grid.assign(N, vector<int>(N, 0));
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            cin >> grid[i][j];
    solve(0, 0, N);
    cout << white << "\\n" << blue << "\\n";
    return 0;
}`,
      solutionExplanation:
        "분할 정복의 전형적인 격자 적용 — 모두 같으면 답 누적, 아니면 4 등분으로 재귀. 사이즈 1 에서 자연스럽게 베이스 (한 칸은 항상 같은 색). T(N²) = 4T(N²/4) + N² → O(N² log N) 최악.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
grid = [list(map(int, input().split())) for _ in range(n)]
counts = [0, 0]   # [white, blue]

def solve(r, c, sz):
    first = grid[r][c]
    same = True
    for i in range(r, r + sz):
        for j in range(c, c + sz):
            if grid[i][j] != first:
                same = False
                break
        if not same:
            break
    if same:
        counts[first] += 1
        return
    h = sz // 2
    solve(r, c, h)
    solve(r, c + h, h)
    solve(r + h, c, h)
    solve(r + h, c + h, h)

solve(0, 0, n)
print(counts[0])
print(counts[1])
`,
      en: {
        title: "Color Paper (N×N Split)",
        description: `An N×N grid is filled with \`0\` (white) or \`1\` (blue). N is a power of 2.

Rules:
- If all cells in a region are the *same color* → it's one paper.
- Otherwise → split into 4 equal quadrants and recurse.

Print the count of **white papers** and **blue papers** on two lines.

Input:
- Line 1: N
- Next N lines: N space-separated values (0 or 1)

Output:
- Line 1: white count
- Line 2: blue count

Source: BOJ 2630 (Color Paper)`,
        constraints: "N is a power of 2, N ≤ 128",
        hints: [
          "`solve(r, c, size)` — the size×size region starting at (r, c).",
          "Check if all cells equal the first one (double for).",
          "If same → bump white/blue and return.",
          "Else split into 4 size/2 quadrants and recurse.",
        ],
        solutionExplanation:
          "Classic D&C on grids — same-color → count, else 4-way split and recurse. Size 1 naturally hits the base. Worst case O(N² log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 6. 쿼드트리 — 보통
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-006",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "보통",
      title: "쿼드트리 압축",
      description: `N×N 이진 격자 (각 칸 \`0\` 또는 \`1\`, 줄바꿈으로 구분된 N×N 문자) 가 주어진다. N 은 2 의 거듭제곱.

규칙:
- 모두 같은 색 → 그 숫자만 출력
- 아니면 → \`(\` + 왼쪽 위 + 오른쪽 위 + 왼쪽 아래 + 오른쪽 아래 + \`)\` 순서로 재귀

입력:
- 첫 줄: N
- 다음 N 줄: 각 줄에 N 개의 문자 (\`0\` 또는 \`1\`, 공백 없음)

출력: 압축된 쿼드트리 문자열 (한 줄)

출처: BOJ 1992 (쿼드트리)`,
      constraints: "N 은 1, 2, 4, 8, 16, 32, 64 중 하나",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n0", expectedOutput: "0", label: "1×1 검정" },
        { stdin: "1\n1", expectedOutput: "1", label: "1×1 흰색" },
        { stdin: "2\n00\n00", expectedOutput: "0", label: "2×2 단색" },
        { stdin: "2\n10\n01", expectedOutput: "(1001)", label: "2×2 모두 다름" },
        {
          stdin: "4\n0000\n0000\n0011\n0011",
          expectedOutput: "(0001)",
          label: "4×4 — 한 사분면만 다름",
        },
        {
          stdin: "4\n1111\n1111\n0000\n0000",
          expectedOutput: "(1100)",
          label: "4×4 — 위쪽 1, 아래쪽 0",
        },
        {
          stdin:
            "8\n11110000\n11110000\n00011100\n00011100\n11110000\n11110000\n11110011\n11110011",
          expectedOutput: "((110(0101))(0010)1(0001))",
          label: "BOJ 1992 샘플",
        },
      ],
      hints: [
        "재귀 `quad(r, c, size)` 가 압축 문자열을 반환.",
        "모두 같으면 → 그 문자 하나 반환.",
        "아니면 → `\"(\" + 왼위 + 오위 + 왼아래 + 오아래 + \")\"`.",
        "출력 순서 주의 — 왼위 / 오위 / 왼아래 / 오아래.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<string> grid;

string quad(int r, int c, int sz) {
    char first = grid[r][c];
    bool same = true;
    for (int i = r; i < r + sz && same; i++)
        for (int j = c; j < c + sz && same; j++)
            if (grid[i][j] != first) same = false;
    if (same) return string(1, first);
    int h = sz / 2;
    return "(" + quad(r, c, h) + quad(r, c + h, h)
              + quad(r + h, c, h) + quad(r + h, c + h, h) + ")";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    grid.assign(N, "");
    for (int i = 0; i < N; i++) cin >> grid[i];
    cout << quad(0, 0, N) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "분할 정복으로 *문자열 자체* 를 합치는 패턴. 단색이면 글자 하나, 아니면 네 사분면을 재귀로 푼 뒤 괄호로 감싸 이어 붙임. 'Combine' 단계가 단순 문자열 연결이라 직관적.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
grid = [input().strip() for _ in range(n)]

def quad(r, c, sz):
    first = grid[r][c]
    same = True
    for i in range(r, r + sz):
        for j in range(c, c + sz):
            if grid[i][j] != first:
                same = False
                break
        if not same:
            break
    if same:
        return first
    h = sz // 2
    return "(" + quad(r, c, h) + quad(r, c + h, h) + quad(r + h, c, h) + quad(r + h, c + h, h) + ")"

print(quad(0, 0, n))
`,
      en: {
        title: "Quadtree Compression",
        description: `An N×N binary grid (each cell \`0\` or \`1\`, N characters per line). N is a power of 2.

Rules:
- All same → output that digit
- Else → \`(\` + top-left + top-right + bottom-left + bottom-right + \`)\`, recursively

Input:
- Line 1: N
- Next N lines: N characters each (\`0\` or \`1\`, no spaces)

Output: the compressed string on one line.

Source: BOJ 1992 (Quadtree)`,
        constraints: "N is a power of 2, N ≤ 64",
        hints: [
          "`quad(r, c, size)` returns the compressed string.",
          "All same → return the single char.",
          "Else → `\"(\" + topL + topR + botL + botR + \")\"`.",
          "Mind the quadrant order: top-left, top-right, bottom-left, bottom-right.",
        ],
        solutionExplanation:
          "D&C that combines *strings*. Solid → one char. Else recurse on 4 quadrants and wrap in parentheses. The combine is plain string concatenation.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 7. inversion count — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-007",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "어려움",
      title: "역순쌍 개수 (Inversion Count)",
      description: `N 개의 정수가 주어진다. \`i < j\` 인데 \`arr[i] > arr[j]\` 인 쌍의 개수를 출력하라.

단순 O(N²) 도 N ≤ 5000 에선 통과. 하지만 **머지 소트 응용 O(N log N)** 으로 풀어보자.

핵심 — merge 단계에 한 줄 추가:
- 왼쪽 / 오른쪽 두 정렬 배열을 합칠 때
- 오른쪽 원소 \`b[j]\` 를 결과에 넣는 순간 — 왼쪽에 *남아 있는* 원소들은 모두 \`b[j]\` 보다 크므로 모두 역순쌍 형성
- 그 개수 \`len(a) - i\` 만큼 카운트 더하기

출처: 고전 (머지 소트 응용)`,
      constraints: "1 ≤ N ≤ 50,000, 1 ≤ 각 원소 ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5\n1 2 3 4 5", expectedOutput: "0", label: "정렬됨 — 0 개" },
        { stdin: "5\n5 4 3 2 1", expectedOutput: "10", label: "역순 — C(5,2) = 10" },
        { stdin: "5\n2 4 1 3 5", expectedOutput: "3", label: "(2,1),(4,1),(4,3)" },
        { stdin: "1\n42", expectedOutput: "0", label: "원소 1 개" },
        { stdin: "4\n5 1 5 1", expectedOutput: "3", label: "중복" },
        { stdin: "6\n3 1 4 1 5 9", expectedOutput: "3", label: "(3,1),(3,1),(4,1)" },
        { stdin: "7\n7 6 5 4 3 2 1", expectedOutput: "21", label: "전부 역순 — C(7,2)" },
      ],
      hints: [
        "머지 소트와 거의 같은 코드 — merge 단계에 카운트만 추가.",
        "merge: i, j 인덱스. a[i] <= b[j] 면 그냥 (역순 X), 아니면 카운트 += `len(a) - i`.",
        "답이 N(N-1)/2 까지 가능 → N=50,000 이면 ~12 억 → long long 필수.",
        "단순 O(N²) 로도 N=50,000 은 25 억 비교 → 시간 초과. 반드시 O(N log N).",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long invCount = 0;

void mergeAndCount(vector<long long>& arr, int l, int m, int r) {
    vector<long long> tmp;
    tmp.reserve(r - l + 1);
    int i = l, j = m + 1;
    while (i <= m && j <= r) {
        if (arr[i] <= arr[j]) {
            tmp.push_back(arr[i++]);
        } else {
            tmp.push_back(arr[j++]);
            invCount += (m - i + 1);   // 왼쪽 남은 원소 수
        }
    }
    while (i <= m) tmp.push_back(arr[i++]);
    while (j <= r) tmp.push_back(arr[j++]);
    for (int k = 0; k < (int)tmp.size(); k++) arr[l + k] = tmp[k];
}

void mergeSort(vector<long long>& arr, int l, int r) {
    if (l >= r) return;
    int m = (l + r) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    mergeAndCount(arr, l, m, r);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    mergeSort(arr, 0, n - 1);
    cout << invCount << "\\n";
    return 0;
}`,
      solutionExplanation:
        "머지 소트 살짝 변형 — 합치는 단계에서 *오른쪽 원소를 가져올 때마다* 왼쪽에 남아있는 원소 수만큼 역순쌍이 형성됨 (왼쪽 남은 것들은 정렬되어 있으므로 모두 그 원소보다 큼). 이 한 줄이 본질. O(N log N).",
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
inv = 0

def merge_sort(l, r):
    global inv
    if l >= r:
        return
    m = (l + r) // 2
    merge_sort(l, m)
    merge_sort(m + 1, r)
    tmp = []
    i, j = l, m + 1
    while i <= m and j <= r:
        if arr[i] <= arr[j]:
            tmp.append(arr[i]); i += 1
        else:
            tmp.append(arr[j]); j += 1
            inv += (m - i + 1)
    while i <= m:
        tmp.append(arr[i]); i += 1
    while j <= r:
        tmp.append(arr[j]); j += 1
    for k in range(len(tmp)):
        arr[l + k] = tmp[k]

merge_sort(0, n - 1)
print(inv)
`,
      en: {
        title: "Inversion Count",
        description: `Given N integers, count pairs \`i < j\` with \`arr[i] > arr[j]\`.

Brute O(N²) works for tiny N. Here use **merge-sort based O(N log N)**.

Key — add ONE line in merge:
- When merging left and right (both sorted)
- The moment we pull from the right (\`b[j]\` is smaller), all elements still in left are larger → each forms an inversion
- Add \`len(a) - i\` to the counter

Source: classical (merge-sort application)`,
        constraints: "1 ≤ N ≤ 50,000, 1 ≤ each element ≤ 10^9",
        hints: [
          "Almost identical to merge sort — only the count line is new.",
          "In merge: if a[i] <= b[j], normal; else count += len(a) - i and take b[j].",
          "Answer can reach N(N-1)/2 ~ 1.2B for N=50,000 — long long required.",
          "O(N²) at N=50,000 is 2.5B comparisons → TLE. Must be O(N log N).",
        ],
        solutionExplanation:
          "Merge sort with one extra line — every time we pull from the right, the count goes up by the number of unprocessed left elements (all of which are larger). O(N log N).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 8. K번째 원소 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-008",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "어려움",
      title: "K번째 작은 수 (Quickselect)",
      description: `N 개의 정수와 K 가 주어진다. K 번째 *작은* 수를 출력하라 (1-indexed).

전체 정렬 O(N log N) 도 가능하지만 — **퀵 소트의 분할 정복 아이디어** 만 가져와 평균 O(N) 으로 풀자.

핵심 (Quickselect):
- 피벗을 골라 partition → 피벗의 *최종 위치 idx* 가 결정됨
- idx + 1 == K → 피벗이 답
- idx + 1 > K → 왼쪽 (피벗보다 작은 쪽) 에 답 있음 → 거기서 재귀
- idx + 1 < K → 오른쪽에 답 있음 → 거기서 재귀 (단, K 를 적절히 조정)

즉, *한쪽만* 재귀하므로 평균 O(N) (퀵 소트는 양쪽 모두 → O(N log N)).

출처: CLRS Chapter 9 (Selection)`,
      constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ N, -10^9 ≤ 각 원소 ≤ 10^9",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "5 1\n3 1 4 1 5", expectedOutput: "1", label: "1번째 (최솟값)" },
        { stdin: "5 5\n3 1 4 1 5", expectedOutput: "5", label: "5번째 (최댓값)" },
        { stdin: "5 3\n3 1 4 1 5", expectedOutput: "3", label: "중앙값" },
        { stdin: "1 1\n42", expectedOutput: "42", label: "원소 1 개" },
        { stdin: "7 4\n7 6 5 4 3 2 1", expectedOutput: "4", label: "역순 입력, 중간값" },
        { stdin: "5 2\n5 5 5 5 5", expectedOutput: "5", label: "전부 같음" },
        { stdin: "6 3\n-3 -1 -2 0 1 2", expectedOutput: "-1", label: "음수 포함" },
      ],
      hints: [
        "partition(arr, l, r, pivotIdx): 피벗을 끝으로 옮긴 뒤 작은 것 / 큰 것 가르고 피벗 최종 위치 반환.",
        "select(l, r, k): partition 후 비교 — 답이 왼쪽에 있으면 select(l, p-1, k), 오른쪽이면 select(p+1, r, k).",
        "최악 O(N²) 이지만 평균 O(N). 랜덤 피벗으로 평균에 가까이 갈 수 있음.",
        "K 는 입력에서 1-indexed 라는 점 주의 — 내부적으로 0-indexed 로 변환.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> arr;

int partition(int l, int r, int pivotIdx) {
    int pivot = arr[pivotIdx];
    swap(arr[pivotIdx], arr[r]);   // 피벗을 끝으로
    int store = l;
    for (int i = l; i < r; i++) {
        if (arr[i] < pivot) {
            swap(arr[store], arr[i]);
            store++;
        }
    }
    swap(arr[store], arr[r]);
    return store;
}

int select_kth(int l, int r, int k) {
    if (l == r) return arr[l];
    int pivotIdx = l + (r - l) / 2;   // 가운데 피벗 (간단)
    int p = partition(l, r, pivotIdx);
    if (p == k) return arr[p];
    if (k < p) return select_kth(l, p - 1, k);
    return select_kth(p + 1, r, k);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;
    arr.assign(n, 0);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << select_kth(0, n - 1, k - 1) << "\\n";   // 1-indexed → 0-indexed
    return 0;
}`,
      solutionExplanation:
        "퀵 소트와 같은 partition 을 쓰되 — 답이 있는 쪽만 재귀. 양쪽 다 재귀하는 퀵 소트는 O(N log N), 한쪽만 재귀하는 quickselect 는 평균 O(N). 분할 정복의 변형 — '필요한 쪽만 conquer'.",
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

def partition(l, r, pivot_idx):
    pivot = arr[pivot_idx]
    arr[pivot_idx], arr[r] = arr[r], arr[pivot_idx]
    store = l
    for i in range(l, r):
        if arr[i] < pivot:
            arr[store], arr[i] = arr[i], arr[store]
            store += 1
    arr[store], arr[r] = arr[r], arr[store]
    return store

def select_kth(l, r, k):
    if l == r:
        return arr[l]
    pivot_idx = l + (r - l) // 2
    p = partition(l, r, pivot_idx)
    if p == k:
        return arr[p]
    if k < p:
        return select_kth(l, p - 1, k)
    return select_kth(p + 1, r, k)

print(select_kth(0, n - 1, k - 1))
`,
      en: {
        title: "Kth Smallest (Quickselect)",
        description: `Given N integers and K, print the K-th *smallest* (1-indexed).

Full sort O(N log N) works, but here use **quickselect** for average O(N).

Idea:
- Partition around a pivot → pivot lands at its final position \`idx\`.
- idx + 1 == K → pivot is the answer.
- idx + 1 > K → recurse left.
- idx + 1 < K → recurse right (with adjusted K).

Only ONE side recurses — average O(N) (quick sort recurses both → O(N log N)).

Source: CLRS Chapter 9 (Selection)`,
        constraints: "1 ≤ N ≤ 100,000, 1 ≤ K ≤ N, -10^9 ≤ each element ≤ 10^9",
        hints: [
          "partition(l, r, pivotIdx): pivot to end, split less/greater, return final pivot position.",
          "select(l, r, k): partition, compare; recurse on the side containing k.",
          "Worst O(N²) but average O(N). Random pivot gets you close to average.",
          "K is 1-indexed in input — convert to 0-indexed internally.",
        ],
        solutionExplanation:
          "Same partition as quick sort, but only recurse on the side containing the answer. Quick sort recurses both sides (O(N log N)); quickselect only one (avg O(N)). D&C variant — 'conquer only the needed side'.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 9. 가장 가까운 두 점 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-009",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "어려움",
      title: "가장 가까운 두 점 (거리 제곱)",
      description: `2 차원 평면 위 N 개의 점이 주어진다. 가장 가까운 두 점 사이의 **거리 제곱** 을 출력하라 (\`(x1-x2)² + (y1-y2)²\`).

여기서는 N ≤ 1000 이므로 **단순 O(N²)** 으로도 통과한다. 본격 분할 정복 O(N log² N) 구현은 너무 복잡 — 먼저 단순 비교로 답 맞추는 게 우선.

심화 (선택): 모든 쌍 O(N²) → 정렬 + 분할 정복으로 O(N log² N). 챕터 책 참고.

거리 자체 (실수) 대신 거리 *제곱* (정수) 으로 답해 부동소수점 오차 회피.

출처: BOJ 2261 (가장 가까운 두 점) simplified to N ≤ 1000`,
      constraints: "2 ≤ N ≤ 1000, -10,000 ≤ x, y ≤ 10,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "2\n0 0\n3 4", expectedOutput: "25", label: "두 점 — 거리 5, 제곱 25" },
        { stdin: "3\n0 0\n1 0\n5 5", expectedOutput: "1", label: "(0,0) 과 (1,0)" },
        { stdin: "4\n0 0\n100 100\n0 1\n100 99", expectedOutput: "1", label: "여러 점 중 최소" },
        { stdin: "2\n-5 -5\n-5 -3", expectedOutput: "4", label: "음수 좌표" },
        { stdin: "3\n0 0\n3 0\n0 4", expectedOutput: "9", label: "직각 삼각형 변 중 짧은 것의 제곱" },
        { stdin: "5\n10 10\n20 20\n10 11\n30 30\n40 40", expectedOutput: "1", label: "5점 — (10,10),(10,11)" },
        { stdin: "4\n0 0\n0 0\n100 100\n200 200", expectedOutput: "0", label: "같은 점 있음" },
      ],
      hints: [
        "단순 O(N²) — 모든 쌍 (i, j), i < j 에 대해 (x[i]-x[j])² + (y[i]-y[j])² 의 최솟값.",
        "**거리 제곱** 이 출력 — sqrt 쓸 필요 X, 정수로 비교.",
        "N=1000 이면 ~50 만 쌍 — 1 초 안에 충분.",
        "같은 점이 있을 수 있음 → 답이 0 일 수 있다.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];

    long long best = LLONG_MAX;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            long long dx = x[i] - x[j];
            long long dy = y[i] - y[j];
            long long d = dx * dx + dy * dy;
            if (d < best) best = d;
        }
    }
    cout << best << "\\n";
    return 0;
}`,
      solutionExplanation:
        "N ≤ 1000 이라 모든 쌍 비교 O(N²) 만으로 충분 — 약 50 만 쌍. 본격 분할 정복 (x 정렬 후 중앙선 양옆 처리) 은 N=100,000 같이 클 때 의미. 여기서는 거리 *제곱* 으로 정수 비교해 부동소수점 오차 피하는 게 중요한 포인트.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
pts = [tuple(map(int, input().split())) for _ in range(n)]

best = 10**18
for i in range(n):
    for j in range(i + 1, n):
        dx = pts[i][0] - pts[j][0]
        dy = pts[i][1] - pts[j][1]
        d = dx * dx + dy * dy
        if d < best:
            best = d

print(best)
`,
      en: {
        title: "Closest Pair of Points (Squared Distance)",
        description: `Given N points on the 2D plane, print the **squared distance** between the closest pair (\`(x1-x2)² + (y1-y2)²\`).

With N ≤ 1000, **brute force O(N²)** passes. The full D&C O(N log² N) version is harder — focus on correctness first.

Squared distance (integer) avoids floating-point errors.

Source: BOJ 2261 simplified to N ≤ 1000`,
        constraints: "2 ≤ N ≤ 1000, -10,000 ≤ x, y ≤ 10,000",
        hints: [
          "Brute O(N²) — over all pairs (i, j), i < j, take min of (xi-xj)² + (yi-yj)².",
          "Output is **squared distance** — no sqrt needed, integer comparisons.",
          "N=1000 → ~500K pairs, fine in 1 second.",
          "Duplicate points allowed → answer can be 0.",
        ],
        solutionExplanation:
          "N ≤ 1000 makes O(N²) ~500K pair checks adequate. The full D&C (sort by x, conquer halves, handle strip across the median) matters for huge N. Key takeaway here: compare *squared* distances to keep everything integer.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 10. 행렬 곱셈 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-010",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "어려움",
      title: "행렬 곱셈 (O(N³))",
      description: `두 N×N 정수 행렬 \`A\`, \`B\` 가 주어진다. \`C = A · B\` 의 각 원소를 출력하라.

여기서는 **표준 O(N³) 알고리즘** 만 구현 (Strassen O(N^2.81) 같은 분할 정복 변형은 다루지 않는다 — 분할 정복 사고를 행렬에 적용하는 *입문* 단계).

입력:
- 첫 줄: N
- 다음 N 줄: 행렬 A (각 줄에 N 정수, 공백 구분)
- 그 다음 N 줄: 행렬 B

출력: 행렬 C (N 줄, 각 줄 N 정수, 공백 구분)

\`C[i][j] = sum_k(A[i][k] · B[k][j])\` for k = 0..N-1.

심화: Strassen 알고리즘은 행렬을 4 사분면으로 나눠 7 번 곱셈으로 처리 (8 번 → 7 번) — 분할 정복의 대표적 trick. 여기서는 기본 곱만.

출처: 고전 (선형대수 + adc-003 행렬 거듭제곱의 보조 연산)`,
      constraints: "1 ≤ N ≤ 100, -1000 ≤ 각 원소 ≤ 1000 (결과 long long 사용 권장)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        {
          stdin: "1\n5\n7",
          expectedOutput: "35",
          label: "1×1 — 5·7 = 35",
        },
        {
          stdin: "2\n1 2\n3 4\n5 6\n7 8",
          expectedOutput: "19 22\n43 50",
          label: "2×2 기본",
        },
        {
          stdin: "2\n1 0\n0 1\n9 8\n7 6",
          expectedOutput: "9 8\n7 6",
          label: "단위 행렬 곱 — 그대로",
        },
        {
          stdin: "3\n1 2 3\n4 5 6\n7 8 9\n1 0 0\n0 1 0\n0 0 1",
          expectedOutput: "1 2 3\n4 5 6\n7 8 9",
          label: "3×3 단위 행렬",
        },
        {
          stdin: "2\n0 0\n0 0\n1 2\n3 4",
          expectedOutput: "0 0\n0 0",
          label: "영 행렬",
        },
        {
          stdin: "2\n-1 2\n3 -4\n5 -6\n-7 8",
          expectedOutput: "-19 22\n43 -50",
          label: "음수 원소",
        },
      ],
      hints: [
        "삼중 for 루프: i (행), j (열), k (내적 합).",
        "C[i][j] = sum_k(A[i][k] * B[k][j]).",
        "원소가 1000 까지, N=100 이면 곱의 합이 ~10^8 → int 로도 가능하지만 long long 안전.",
        "출력 형식 주의 — 각 행은 공백 구분, 행끼리 줄바꿈.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    vector<vector<long long>> A(n, vector<long long>(n));
    vector<vector<long long>> B(n, vector<long long>(n));
    vector<vector<long long>> C(n, vector<long long>(n, 0));

    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> A[i][j];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> B[i][j];

    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            for (int k = 0; k < n; k++)
                C[i][j] += A[i][k] * B[k][j];

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j > 0) cout << ' ';
            cout << C[i][j];
        }
        cout << "\\n";
    }
    return 0;
}`,
      solutionExplanation:
        "표준 O(N³) 행렬 곱 — 삼중 for. adc-003 행렬 거듭제곱의 보조 연산이기도 함. Strassen O(N^2.81) 은 행렬을 사분면으로 나눠 7 곱으로 줄이는 분할 정복인데 — 본격 다루려면 별도 토픽. 여기서는 *행렬 곱 자체* 를 정확히 구현하는 게 목표.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
A = [list(map(int, input().split())) for _ in range(n)]
B = [list(map(int, input().split())) for _ in range(n)]
C = [[0] * n for _ in range(n)]

for i in range(n):
    for j in range(n):
        s = 0
        for k in range(n):
            s += A[i][k] * B[k][j]
        C[i][j] = s

out = []
for i in range(n):
    out.append(" ".join(map(str, C[i])))
sys.stdout.write("\\n".join(out) + "\\n")
`,
      en: {
        title: "Matrix Multiplication (O(N³))",
        description: `Given two N×N integer matrices \`A\` and \`B\`, print \`C = A · B\`.

Use the **standard O(N³) algorithm** (Strassen and other D&C accelerations are out of scope — this is a sanity-check building block for adc-003).

Input:
- Line 1: N
- N lines: matrix A (N ints each)
- N lines: matrix B

Output: matrix C, N lines, N ints each.

\`C[i][j] = sum_k(A[i][k] · B[k][j])\`.

Strassen (a notable D&C variant) reduces 8 mults to 7 by splitting matrices into quadrants — a poster-child D&C trick — but we don't implement it here.

Source: classical (linear algebra + companion to adc-003)`,
        constraints: "1 ≤ N ≤ 100, -1000 ≤ each element ≤ 1000 (use long long)",
        hints: [
          "Triple loop: i (row), j (col), k (inner product).",
          "C[i][j] = sum_k(A[i][k] * B[k][j]).",
          "With N=100 and elements up to 1000, sums reach ~10^8 — long long is safe.",
          "Output: space-separated within a row, newline between rows.",
        ],
        solutionExplanation:
          "Standard O(N³) — triple for. Companion routine for adc-003 (matrix power). Strassen O(N^2.81) splits each matrix into quadrants and uses 7 multiplications, a famous D&C trick — its own topic. Here we just nail the basic mult.",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 11. 분할 정복 GCD (Stein's algorithm) — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-011",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "어려움",
      title: "이진 GCD (Stein's algorithm, 단순화)",
      description: `두 양의 정수 \`a\`, \`b\` 의 최대공약수를 **나눗셈 없이 / 2 와 빼기만** 으로 구해 출력하라. (Stein's algorithm / 이진 GCD)

규칙 4 가지:
1. \`gcd(a, a) = a\` (또는 \`b = 0\` 이면 \`a\`)
2. \`a, b 둘 다 짝수\` → \`gcd(a/2, b/2) · 2\`
3. \`하나만 짝수\` (예: a 짝수, b 홀수) → \`gcd(a/2, b)\`
4. \`둘 다 홀수\` → \`a ≥ b\` 면 \`gcd((a-b)/2, b)\`, 그 외 대칭

핵심 — 일반 유클리드 호제법 (\`a % b\`) 은 *나눗셈* 을 쓰는데, Stein 은 *이진 시프트 (÷2) 와 빼기* 만 쓴다. 하드웨어 친화적 (옛날 컴퓨터에서 빠름).

출처: Stein's algorithm (1967, 이진 GCD)`,
      constraints: "1 ≤ a, b ≤ 1,000,000,000",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "48 18", expectedOutput: "6", label: "gcd(48, 18) = 6" },
        { stdin: "100 75", expectedOutput: "25", label: "gcd(100, 75) = 25" },
        { stdin: "17 13", expectedOutput: "1", label: "서로소" },
        { stdin: "1024 256", expectedOutput: "256", label: "둘 다 2 의 거듭제곱" },
        { stdin: "7 7", expectedOutput: "7", label: "두 수 같음" },
        { stdin: "1 999999999", expectedOutput: "1", label: "한 쪽이 1" },
        { stdin: "999999999 999999998", expectedOutput: "1", label: "큰 수 — 연속 두 수는 서로소" },
        { stdin: "1000000000 500000000", expectedOutput: "500000000", label: "한 쪽이 다른 쪽의 배수" },
      ],
      hints: [
        "재귀 함수로 4 가지 규칙 그대로 옮기기.",
        "베이스: b == 0 → a 반환.",
        "짝수 체크: a % 2 == 0.",
        "둘 다 홀수에서 (a - b) 는 항상 짝수 → 다음 단계에서 자동으로 ÷ 2.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

long long stein(long long a, long long b) {
    if (b == 0) return a;
    if (a == 0) return b;
    if (a % 2 == 0 && b % 2 == 0) return stein(a / 2, b / 2) * 2;
    if (a % 2 == 0) return stein(a / 2, b);
    if (b % 2 == 0) return stein(a, b / 2);
    // 둘 다 홀수
    if (a >= b) return stein((a - b) / 2, b);
    return stein((b - a) / 2, a);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    long long a, b;
    cin >> a >> b;
    cout << stein(a, b) << "\\n";
    return 0;
}`,
      solutionExplanation:
        "Stein's algorithm — 일반 유클리드와 달리 나눗셈 / 나머지 연산 없이 2 로 나누기와 빼기만 사용. 둘 다 짝수면 2 를 빼고 답에 *2, 홀짝이면 짝수 쪽만 /2, 둘 다 홀수면 (큰 것 - 작은 것) 도 짝수가 되니 /2. 시간복잡도는 일반 유클리드와 비슷한 O(log²(min(a,b))).",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

def stein(a, b):
    if b == 0:
        return a
    if a == 0:
        return b
    if a % 2 == 0 and b % 2 == 0:
        return stein(a // 2, b // 2) * 2
    if a % 2 == 0:
        return stein(a // 2, b)
    if b % 2 == 0:
        return stein(a, b // 2)
    if a >= b:
        return stein((a - b) // 2, b)
    return stein((b - a) // 2, a)

a, b = map(int, input().split())
print(stein(a, b))
`,
      en: {
        title: "Binary GCD (Stein's Algorithm, Simplified)",
        description: `Compute \`gcd(a, b)\` **without division — only halving and subtraction** (Stein's algorithm / binary GCD).

Four rules:
1. \`gcd(a, 0) = a\`
2. Both even → \`gcd(a/2, b/2) · 2\`
3. Exactly one even → halve the even one
4. Both odd → \`a ≥ b\` ? \`gcd((a-b)/2, b)\` : symmetric

Standard Euclidean uses \`a % b\` (division). Stein uses only bit-shifts and subtraction — hardware-friendly on old CPUs.

Source: Stein's algorithm (1967, binary GCD)`,
        constraints: "1 ≤ a, b ≤ 1,000,000,000",
        hints: [
          "Recursive function translating all 4 rules directly.",
          "Base: b == 0 → return a.",
          "Even check: a % 2 == 0.",
          "When both odd, (a - b) is always even → next step halves it.",
        ],
        solutionExplanation:
          "Stein's algorithm replaces modulo with halving and subtraction. Both even → pull out 2 and multiply back. One even → halve that one. Both odd → (larger - smaller) is even, then halve. Similar complexity to Euclidean: O(log² min(a,b)).",
      },
    },

    // ─────────────────────────────────────────────────────────────────
    // 12. 종이의 개수 — 어려움
    // ─────────────────────────────────────────────────────────────────
    {
      id: "adc-012",
      cluster: "algo-divideconquer-contest",
      unlockAfter: "algo-divideconquer",
      difficulty: "어려움",
      title: "종이의 개수 (3진 분할)",
      description: `N×N 격자가 \`-1\`, \`0\`, \`1\` 중 하나로 채워져 있다. N 은 3 의 거듭제곱.

규칙:
- 모두 같은 값 → 종이 하나
- 아니면 → 격자를 **9 등분** (3×3 으로) 하고 각 부분에 같은 규칙 재귀

\`-1\` 종이, \`0\` 종이, \`1\` 종이의 개수를 **세 줄** 로 출력하라.

입력:
- 첫 줄: N
- 다음 N 줄: 각 줄에 N 개의 정수 (\`-1\`, \`0\`, \`1\`)

출력:
- 첫 줄: \`-1\` 종이 개수
- 둘째 줄: \`0\` 종이 개수
- 셋째 줄: \`1\` 종이 개수

출처: BOJ 1780 (종이의 개수)`,
      constraints: "N 은 1, 3, 9, 27, 81 중 하나 (3 의 거듭제곱)",
      initialCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    return 0;
}`,
      testCases: [
        { stdin: "1\n-1", expectedOutput: "1\n0\n0", label: "1×1 -1" },
        { stdin: "1\n0", expectedOutput: "0\n1\n0", label: "1×1 0" },
        { stdin: "1\n1", expectedOutput: "0\n0\n1", label: "1×1 1" },
        { stdin: "3\n0 0 0\n0 0 0\n0 0 0", expectedOutput: "0\n1\n0", label: "3×3 단색" },
        {
          stdin: "3\n-1 0 1\n-1 0 1\n-1 0 1",
          expectedOutput: "3\n3\n3",
          label: "3×3 줄무늬 — 9 칸 모두 분리",
        },
        {
          stdin:
            "9\n0 0 0 1 1 1 -1 -1 -1\n0 0 0 1 1 1 -1 -1 -1\n0 0 0 1 1 1 -1 -1 -1\n1 1 1 0 0 0 0 0 0\n1 1 1 0 0 0 0 0 0\n1 1 1 0 0 0 0 0 0\n0 1 -1 0 1 -1 0 1 -1\n0 1 -1 0 1 -1 0 1 -1\n0 1 -1 0 1 -1 0 1 -1",
          expectedOutput: "10\n12\n11",
          label: "9×9 — 6 구역 단색 + 3 구역 줄무늬가 9 분할",
        },
      ],
      hints: [
        "재귀 `solve(r, c, size)` — 격자 (r, c) 시작 size × size.",
        "단색 체크 — 다 같으면 카운트 +1 후 종료.",
        "아니면 size/3 으로 9 등분 → 3×3 중첩 for 로 9 번 재귀.",
        "출력 순서 주의 — -1, 0, 1 순.",
      ],
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> grid;
int cnt[3] = {0, 0, 0};   // cnt[0]=-1, cnt[1]=0, cnt[2]=1

void solve(int r, int c, int sz) {
    int first = grid[r][c];
    bool same = true;
    for (int i = r; i < r + sz && same; i++)
        for (int j = c; j < c + sz && same; j++)
            if (grid[i][j] != first) same = false;
    if (same) {
        cnt[first + 1]++;
        return;
    }
    int t = sz / 3;
    for (int dr = 0; dr < 3; dr++)
        for (int dc = 0; dc < 3; dc++)
            solve(r + dr * t, c + dc * t, t);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;
    grid.assign(N, vector<int>(N, 0));
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            cin >> grid[i][j];
    solve(0, 0, N);
    cout << cnt[0] << "\\n" << cnt[1] << "\\n" << cnt[2] << "\\n";
    return 0;
}`,
      solutionExplanation:
        "색종이 만들기 (4 분할) 의 3×3 = 9 분할 버전 — 분할 정복은 *어떻게* 나누느냐가 다양함. 단색 체크 → 단색 카운트, 아니면 9 등분 재귀. cnt 배열 인덱스 시프트 (`first + 1`) 로 -1, 0, 1 매핑.",
      pyInitialCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline
# 여기에 풀이 작성

`,
      pySolutionCode: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
grid = [list(map(int, input().split())) for _ in range(n)]
cnt = [0, 0, 0]   # -1, 0, 1

def solve(r, c, sz):
    first = grid[r][c]
    same = True
    for i in range(r, r + sz):
        for j in range(c, c + sz):
            if grid[i][j] != first:
                same = False
                break
        if not same:
            break
    if same:
        cnt[first + 1] += 1
        return
    t = sz // 3
    for dr in range(3):
        for dc in range(3):
            solve(r + dr * t, c + dc * t, t)

solve(0, 0, n)
print(cnt[0])
print(cnt[1])
print(cnt[2])
`,
      en: {
        title: "Paper Count (Ternary Split)",
        description: `An N×N grid filled with \`-1\`, \`0\`, or \`1\`. N is a power of 3.

Rules:
- All same → one paper.
- Else → split into **9 equal parts** (3×3) and recurse.

Print three lines: count of \`-1\`, \`0\`, \`1\` papers.

Input:
- Line 1: N
- N lines: N integers each

Output: three lines (counts of -1, 0, 1).

Source: BOJ 1780 (Paper Count)`,
        constraints: "N is a power of 3, N ≤ 81",
        hints: [
          "`solve(r, c, size)` — region at (r, c) of size × size.",
          "Solid check — all same → bump count and return.",
          "Else split into 9 sz/3-squares; 3×3 nested for to recurse.",
          "Print -1, 0, 1 counts in that order.",
        ],
        solutionExplanation:
          "The 9-way analog of color paper. D&C is flexible about *how* to split. Solid → count. Else 9-way recurse. Index shift (`first + 1`) maps -1/0/1 to cnt[0]/cnt[1]/cnt[2].",
      },
    },
  ],
}
