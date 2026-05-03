import { C, t } from "@/components/quest/theme";
import { getSubseqMedianSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "MOD = 998244353",
  "N = int(input())",
  "A = list(map(int, input().split()))",
  "",
  "# Sort indices by value for easier DP",
  "# For each element A[i], count good subsequences",
  "# where A[i] is the median.",
  "# A good subseq is strictly increasing, odd length.",
  "# Median = middle element of sorted subseq.",
  "",
  "# Key idea: for element v = A[i],",
  "#   count pairs (L, R) where",
  "#   L = # elements < v chosen on the left,",
  "#   R = # elements > v chosen on the right,",
  "#   and L == R (so v is the median).",
  "",
  "# dp_left[i] = list where dp_left[i][k] = number of",
  "#   strictly increasing subsequences of length k",
  "#   ending before position i with all values < A[i]",
  "",
  "ans = 0",
  "",
  "for i in range(N):",
  "    v = A[i]",
  "    # Count increasing subseqs of length k",
  "    # from elements < v to the left",
  "    left = []  # left[k] = count of length-k inc subseqs",
  "    for j in range(i):",
  "        if A[j] < v:",
  "            # extend existing subsequences",
  "            new_left = [0] * (len(left) + 1)",
  "            new_left[0] = 1  # empty subseq",
  "            for k in range(len(left)):",
  "                new_left[k] = (new_left[k] + left[k]) % MOD",
  "                new_left[k+1] = (new_left[k+1] + left[k]) % MOD",
  "            left = new_left",
  "        # (skip elements >= v)",
  "    if not left:",
  "        left = [1]  # just the empty subsequence",
  "",
  "    # Similarly count on the right",
  "    right = []",
  "    for j in range(N - 1, i, -1):",
  "        if A[j] > v:",
  "            new_right = [0] * (len(right) + 1)",
  "            new_right[0] = 1",
  "            for k in range(len(right)):",
  "                new_right[k] = (new_right[k] + right[k]) % MOD",
  "                new_right[k+1] = (new_right[k+1] + right[k]) % MOD",
  "            right = new_right",
  "    if not right:",
  "        right = [1]",
  "",
  "    # Match: sum over k where left has k and right has k",
  "    max_k = min(len(left), len(right))",
  "    contrib = 0",
  "    for k in range(max_k):",
  "        contrib = (contrib + left[k] * right[k]) % MOD",
  "",
  "    ans = (ans + v * contrib) % MOD",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSubseqMedianCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given an array A, find the sum of medians of all 'good' subsequences modulo 998244353. A good subsequence is strictly increasing with odd length. The median is the middle element.",
        "배열 A가 주어질 때, 모든 '좋은' 부분수열의 중앙값의 합을 998244353으로 나눈 나머지를 구해. 좋은 부분수열은 순증가이고 길이가 홀수야. 중앙값은 가운데 원소야."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcca"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Increasing Subsequence Median Sum</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P6</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Example: A=[1,2,4,3]. Good subsequences: [1],[2],[4],[3] (medians 1,2,4,3), [1,2,4],[1,2,3] (medians 2,2). Sum = 1+2+4+3+2+2 = 14.",
              "예시: A=[1,2,4,3]. 좋은 부분수열: [1],[2],[4],[3] (중앙값 1,2,4,3), [1,2,4],[1,2,3] (중앙값 2,2). 합 = 1+2+4+3+2+2 = 14.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "A good subsequence must be strictly increasing AND have odd length. The median is the middle element. Which of these is NOT a good subsequence of [1,2,4,3]?",
        "좋은 부분수열은 순증가이면서 길이가 홀수여야 해. 중앙값은 가운데 원소야. [1,2,4,3]에서 좋은 부분수열이 아닌 것은?"),
      question: t(E,
        "Which is NOT a good subsequence of [1,2,4,3]?",
        "[1,2,4,3]에서 좋은 부분수열이 아닌 것은?"),
      options: [
        "[1,2,4]",
        "[1,2,3]",
        t(E, "[1,2] (even length!)", "[1,2] (짝수 길이!)"),
        "[3]",
      ],
      correct: 2,
      explain: t(E,
        "Correct! [1,2] has even length (2), so it's not a good subsequence. Good subsequences must have odd length.",
        "맞아! [1,2]는 길이가 2(짝수)이므로 좋은 부분수열이 아니야. 좋은 부분수열은 홀수 길이여야 해."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For A=[1,2,3], the good subsequences are: [1],[2],[3] (length 1) and [1,2,3] (length 3, median 2). What is the sum of all medians?",
        "A=[1,2,3]일 때, 좋은 부분수열: [1],[2],[3] (길이 1)과 [1,2,3] (길이 3, 중앙값 2). 모든 중앙값의 합은?"),
      question: t(E,
        "A=[1,2,3]. Sum of medians of all good subsequences?",
        "A=[1,2,3]. 모든 좋은 부분수열의 중앙값의 합은?"),
      hint: t(E,
        "Good subseqs: [1](median 1), [2](median 2), [3](median 3), [1,2,3](median 2). Sum = 1+2+3+2 = 8.",
        "좋은 부분수열: [1](중앙값 1), [2](중앙값 2), [3](중앙값 3), [1,2,3](중앙값 2). 합 = 1+2+3+2 = 8."),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSubseqMedianCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each element, count how many good subsequences have it as the median using DP. Match equal-length increasing subsequences on the left and right. O(N^2) or O(N^2 log N).",
        "각 원소에 대해 DP로 그 원소가 중앙값인 좋은 부분수열의 개수를 세. 왼쪽과 오른쪽에서 같은 길이의 증가 부분수열을 매칭해. O(N^2) 또는 O(N^2 log N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N\u00b2) DP</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each element v at index i: count strictly increasing subsequences of length k among elements < v to the left, and length k among elements > v to the right. Multiply and sum over all k to get v's contribution.",
              "각 원소 v(인덱스 i)에 대해: 왼쪽에서 v보다 작은 원소들의 길이 k 증가 부분수열 수, 오른쪽에서 v보다 큰 원소들의 길이 k 증가 부분수열 수를 세. k에 대해 곱하고 합하면 v의 기여도야.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getSubseqMedianSections(E),
    },
  ];
}
