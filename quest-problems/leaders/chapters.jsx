import { C, t } from "@/components/quest/theme";
import { getLeadersSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "s = data[p]; p += 1                  # breed string (no spaces), e.g. 'GHHG'",
  "arr = [int(data[p + i]) for i in range(N)]",
  "arr = [x - 1 for x in arr]           # 1-indexed end → 0-indexed end",
  "",
  "# eG / eH = earliest position of each breed",
  "# lG / lH = latest position",
  "eG = eH = lG = lH = -1",
  "for i in range(N - 1, -1, -1):",
  "    if s[i] == 'G': eG = i",
  "    if s[i] == 'H': eH = i",
  "for i in range(N):",
  "    if s[i] == 'G': lG = i",
  "    if s[i] == 'H': lH = i",
  "",
  "# Per editorial: in any valid leader pair, at LEAST one of the two",
  "# leaders must be the EARLIEST cow of its breed AND have visited all of",
  "# its breed (range reaches to the latest one).",
  "",
  "ans = 0",
  "",
  "# Case A: eG is the true G-leader (visited all G).",
  "# Pair with any H cow (other than eH itself) whose range reaches back to eG.",
  "if eG != -1 and arr[eG] >= lG:",
  "    for i in range(eG):",
  "        if i == eH: continue",
  "        if s[i] == 'H' and arr[i] >= eG:",
  "            ans += 1",
  "",
  "# Case B: symmetric — eH is the true H-leader.",
  "if eH != -1 and arr[eH] >= lH:",
  "    for i in range(eH):",
  "        if i == eG: continue",
  "        if s[i] == 'G' and arr[i] >= eH:",
  "            ans += 1",
  "",
  "# Special case: eG and eH together as the leader pair.",
  "if eG != -1 and eH != -1:",
  "    if (arr[eG] >= lG or (eG <= eH and arr[eG] >= eH)) and \\",
  "       (arr[eH] >= lH or (eH <= eG and arr[eH] >= eG)):",
  "        ans += 1",
  "",
  "print(ans)",
];


/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeLeadersCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows of breed G or H stand in a line; each cow i 'covers' positions [i, E_i].\nWe pick ONE G-leader and ONE H-leader. The pair is VALID if either (a) the leader covers every cow of her own breed, OR (b) the OTHER leader sits inside her range.\nCount valid pairs.",
        "N마리 소가 G 또는 H 품종으로 한 줄에 서있고, i번 소는 위치 [i, E_i]를 '커버'해요.\nG 리더 1마리와 H 리더 1마리를 골라요. 그 쌍이 유효하려면, 그 리더가 같은 품종 소들을 모두 커버하거나, 상대 리더가 그 리더의 범위 안에 있어야 해요.\n유효한 (G리더, H리더) 쌍의 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc51"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Leaders</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2023 Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "N cows of breed ", "N마리 소가 품종 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "G or H", "G 또는 H")}</b>
                  {t(E, " stand in a line; cow i 'covers' positions ", "로 한 줄에 서있고, i번 소는 위치 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>[i, E_i]</code>
                  {t(E, ".", " 를 '커버'해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We pick ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "ONE G-leader and ONE H-leader", "G 리더 1명과 H 리더 1명")}</b>
                  {t(E, ".", " 을 골라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A pair is ", "쌍이 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "VALID", "유효")}</b>
                  {t(E, " if at least one of these holds:",
                        "하려면 다음 중 하나는 만족해야 해요:")}
                  <div style={{ marginTop: 6, marginLeft: 8, fontSize: 12, color: "#475569" }}>
                    {t(E, "(a) the leader's range covers every cow of her own breed", "(a) 리더의 범위가 자기 품종 소들을 모두 커버")}<br/>
                    {t(E, "(b) the OTHER leader is inside this leader's range", "(b) 상대 리더가 이 리더의 범위 안에 있음")}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of valid (G-leader, H-leader) pairs", "유효한 (G리더, H리더) 쌍의 수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If cow 1 is breed G and covers positions 1-4, and ALL G cows are within positions 1-4, is cow 1 a valid G leader?", "소 1이 G 품종이고 위치 1-4를 커버하는데, 모든 G 소가 위치 1-4 안에 있다면, 소 1은 유효한 G 리더일까요?"),
      question: t(E,
        "Cow 1 (G) covers positions 1-4. All G cows are in positions 1-4. Is cow 1 a valid G leader?",
        "소 1 (G)이 위치 1-4 커버. 모든 G 소가 1-4에 있음. 소 1은 유효한 G 리더?"),
      options: [
        t(E, "Yes, it covers all G cows", "맞아, 모든 G 소를 커버해"),
        t(E, "No, it must also cover H cows", "아니, H 소도 커버해야 해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! A leader only needs to cover all cows of its OWN breed. Cow 1 covers all G cows, so it's a valid G leader.",
        "맞아! 리더는 자기 품종의 모든 소만 커버하면 돼요. 소 1이 모든 G 소를 커버하니 유효한 G 리더예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "breeds = \"GH\", ranges = [2, 2].\nG is at position 0 (covers 0-1), H is at position 1 (covers 1-1).\nHow many valid leader pairs?", "breeds = \"GH\", ranges = [2, 2]. G는 위치 0 (0-1 커버), H는 위치 1 (1-1 커버). 유효한 리더 쌍은 몇 개?"),
      question: t(E,
        "breeds=\"GH\", E=[2,2]. How many valid leader pairs?",
        "breeds=\"GH\", E=[2,2]. 유효한 리더 쌍은 몇 개?"),
      hint: t(E,
        "G leader (cow 0) covers up to position 1. H leader (cow 1) covers up to position 1. Cow 0's range includes cow 1. That's 1 valid pair.",
        "G 리더 (소 0)는 위치 1까지 커버. H 리더 (소 1)는 위치 1까지 커버. 소 0의 범위가 소 1을 포함해요. 유효한 쌍 1개."),
      answer: 1,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeLeadersCh2(E, lang = "py") {
  return [
    // 2-1: Light intro — code first.
    {
      type: "reveal",
      narr: t(E,
        "Editorial trick: in any valid leader pair, AT LEAST one of the two leaders is the EARLIEST cow of its breed AND has visited all of its breed.",
        "Editorial 한 줄: 유효한 리더 쌍에는, 둘 중 적어도 하나는 자기 품종의 가장 앞 소이고 그 품종 전체를 방문해야 함."),
      content: (
        <div style={{ padding: 16, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
          {t(E,
            "So scan once to find earliest/latest of each breed.  Then: (Case A) eG is true G-leader → pair with H cows whose range reaches eG.  (Case B) symmetric.  (Special) eG and eH together as the pair.  Code section by section.",
            "한 번 스캔으로 각 품종의 가장 앞/뒤 위치 찾기. 그 다음: (A) eG 가 진짜 G-리더 → 범위가 eG 까지 닿는 H 소들과 쌍. (B) 대칭. (특수) eG, eH 가 함께 쌍. 코드 한 단락씩.")}
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getLeadersSections(E),
    },
  ];
}
