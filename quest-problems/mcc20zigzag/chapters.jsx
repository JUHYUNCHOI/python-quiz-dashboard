import { C, t } from "@/components/quest/theme";
import { getMcc20ZigzagSections } from "./components";

export const SOLUTION_CODE = [
  "s = input().strip()",
  "K = int(input())",
  "N = len(s)",
  "",
  "if K > N:",
  "    print(0)",
  "else:",
  "    # DP: dp[i][j] = number of zig-zag subsequences",
  "    # of length j ending at index i",
  "    dp = [[0] * (K + 1) for _ in range(N)]",
  "",
  "    for i in range(N):",
  "        dp[i][1] = 1  # single char subsequence",
  "",
  "    for j in range(2, K + 1):",
  "        for i in range(j - 1, N):",
  "            for p in range(j - 2, i):",
  "                if (j % 2 == 0 and s[p] < s[i]) or \\",
  "                   (j % 2 == 1 and s[p] > s[i]):",
  "                    dp[i][j] += dp[p][j - 1]",
  "",
  "    ans = sum(dp[i][K] for i in range(N))",
  "    print(ans)",
];

export function makeMcc20ZigzagCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Count zig-zag subsequences of length K in a string.\nA zig-zag alternates between increasing and decreasing.\nUse DP!", "문자열에서 길이 K의 지그재그 부분수열을 세. 지그재그는 증가와 감소를 번갈아. DP 사용!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Zig-zag</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P6</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: DP where dp[i][j] = count of zig-zag subsequences of length j ending at position i.\nTransition depends on zig-zag direction.",
              "핵심: dp[i][j] = 위치 i에서 끝나는 길이 j의 지그재그 부분수열 수.\n전이는 지그재그 방향에 따라.")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "String 'abc', how many subsequences of length 2? C(3,2) = 3: ab, ac, bc.", "문자열 'abc', 길이 2 부분수열 몇 개? C(3,2) = 3: ab, ac, bc."),
      question: t(E,
        "String 'abc'. How many subsequences of length 2?",
        "문자열 'abc'. 길이 2 부분수열 몇 개?"),
      options: [
        t(E, "3", "3"),
        t(E, "2", "2"),
        t(E, "6", "6"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! C(3,2) = 3 subsequences: ab, ac, bc.",
        "맞아! C(3,2) = 3개 부분수열: ab, ac, bc."),
    },
    {
      type: "input",
      narr: t(E,
        "How many length-2 subsequences of 'abc'?", "'abc'의 길이 2 부분수열 개수?"),
      question: t(E,
        "C(3, 2) = ?",
        "C(3, 2) = ?"),
      hint: t(E, "3! / (2! * 1!) = 3", "3! / (2! * 1!) = 3"),
      answer: 3,
    },
  ];
}

export function makeMcc20ZigzagCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "DP on subsequences with zig-zag condition. O(N^2 * K) time.", "지그재그 조건의 부분수열 DP. O(N^2 * K) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N^2 * K)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "dp[i][j] counts zig-zag subsequences of length j ending at i.\nCheck direction (up/down) based on j parity. Sum dp[i][K] for answer.",
              "dp[i][j]는 i에서 끝나는 길이 j의 지그재그 부분수열 수.\nj의 홀짝에 따라 방향(상승/하강) 확인.\ndp[i][K] 합이 답.")}
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc20ZigzagSections(E),
    },
  ];
}
