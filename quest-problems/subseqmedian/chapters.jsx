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
        "Given an array A, find the sum of medians of all 'good' subsequences modulo 998244353.\nA good subsequence is strictly increasing with odd length.\nThe median is the middle element.", "배열 A가 주어질 때, 모든 '좋은' 부분수열의 중앙값의 합을 998244353으로 나눈 나머지를 구해요.\n좋은 부분수열은 엄격히 증가(같은 값 없이 계속 커짐)하고 길이가 홀수예요.\n중앙값은 가운데 원소예요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcca"}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Increasing Subsequence Median Sum</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P6</div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", margin: "12px 0", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the sum of medians of all good subsequences mod 998244353.",
                "모든 좋은 부분수열의 중앙값 합을 998244353 으로 나눈 나머지를 출력.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "Example: A=[1,2,4,3].\nGood subsequences: [1],[2],[4],[3] (medians 1,2,4,3), [1,2,4],[1,2,3] (medians 2,2). Sum = 1+2+4+3+2+2 = 14.",
              "예시: A=[1,2,4,3]. 좋은 부분수열: [1],[2],[4],[3] (중앙값 1,2,4,3),\n[1,2,4],[1,2,3] (중앙값 2,2). 합 = 1+2+4+3+2+2 = 14.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "A good subsequence must be strictly increasing AND have odd length.\nThe median is the middle element.\nWhich of these is NOT a good subsequence of [1,2,4,3]?", "좋은 부분수열은 순증가이면서 길이가 홀수여야 해요. 중앙값은 가운데 원소예요. [1,2,4,3]에서 좋은 부분수열이 아닌 것은?"),
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
        "맞아! [1,2]는 길이가 2(짝수)이므로 좋은 부분수열이 아니에요. 좋은 부분수열은 홀수 길이여야 해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For A=[1,2,3], the good subsequences are: [1],[2],[3] (length 1) and [1,2,3] (length 3, median 2).\nWhat is the sum of all medians?", "A=[1,2,3]일 때, 좋은 부분수열: [1],[2],[3] (길이 1)과 [1,2,3] (길이 3, 중앙값 2). 모든 중앙값의 합은?"),
      question: t(E,
        "A=[1,2,3]. Sum of medians of all good subsequences?",
        "A=[1,2,3]. 모든 좋은 부분수열의 중앙값의 합은?"),
      hint: t(E,
        "List the good subsequences and add up each median.",
        "좋은 부분수열을 모두 적어 보고 각 중앙값을 더해 봐."),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSubseqMedianCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "For each i, A[i] is the median when we pick equal-length increasing chains on both sides — k smaller-element chain on the left, k larger-element chain on the right. Sections build it one piece at a time.",
        "각 i 에서 A[i] 가 중앙값 = 양쪽에 같은 길이 증가 사슬 — 왼쪽 작은 값 k 사슬, 오른쪽 큰 값 k 사슬. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getSubseqMedianSections(E),
    },
  ];
}
