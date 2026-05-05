import { C, t } from "@/components/quest/theme";
import { getLeadersSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "breed = input().split()",
  "E = []",
  "for i in range(N):",
  "    E.append(int(input()))",
  "",
  "# For each breed, find first and last occurrence",
  "first = {'G': N, 'H': N}",
  "last  = {'G': -1, 'H': -1}",
  "for i in range(N):",
  "    b = breed[i]",
  "    first[b] = min(first[b], i)",
  "    last[b]  = max(last[b], i)",
  "",
  "# A cow i is a leader for breed b if E[i] >= last[b]",
  "# Valid pair: one from G, one from H",
  "# Constraint: one leader must contain the other",
  "ans = 0",
  "g_leaders = []",
  "h_leaders = []",
  "for i in range(N):",
  "    if breed[i] == 'G' and E[i] >= last['G']:",
  "        g_leaders.append(i)",
  "    if breed[i] == 'H' and E[i] >= last['H']:",
  "        h_leaders.append(i)",
  "",
  "for g in g_leaders:",
  "    for h in h_leaders:",
  "        # one must cover the other leader",
  "        if E[g] >= h or E[h] >= g:",
  "            ans += 1",
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
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc51"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Leaders</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2023 Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "N cows of breed ", "N마리 소가 품종 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "G or H", "G 또는 H")}</b>
                  {t(E, " stand in a line; cow i 'covers' positions ", "로 한 줄에 서있고, i번 소는 위치 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>[i, E_i]</code>
                  {t(E, ".", " 를 '커버'해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We pick ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "ONE G-leader and ONE H-leader", "G 리더 1명과 H 리더 1명")}</b>
                  {t(E, ".", " 을 골라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Find each breed's first and last position. A 'big leader' covers her breed's full span. Then count pairs: (a) pairs of two big leaders, plus (b) pairs where one big leader contains the other breed's first cow.",
        "각 품종의 첫 위치와 마지막 위치를 찾아요. '큰 리더' 는 자기 품종 전체를 커버하는 소. 쌍 세기: (a) 큰 리더 두 마리 쌍 + (b) 큰 리더 한 마리가 상대 품종의 첫 소를 자기 범위에 담은 쌍."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "First / last of each breed", "각 품종의 첫/마지막 위치"), code: "first[G], last[G], first[H], last[H]", color: "#dc2626" },
              { n: 2, label: t(E, "Find big leaders", "큰 리더 찾기"), code: "big_G = cows whose range covers [first[G], last[G]]", color: "#7c3aed" },
              { n: 3, label: t(E, "Count both-big pairs", "양쪽 모두 큰 리더 쌍 세기"), code: "both_count = len(big_G) × len(big_H)", color: "#0891b2" },
              { n: 4, label: t(E, "Add one-side covers-other pairs", "한쪽이 상대를 덮는 쌍 추가"), code: "add cows whose range covers other breed's first cow", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "constant work per cow after one scan", "한 번 스캔 후 소당 상수 시간")}</div>
          </div>
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
