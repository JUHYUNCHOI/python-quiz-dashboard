import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getLeadersSections } from "./components";

/* ================================================================
   Eye-evident sim: line of cows + leader pair + validity check
   - Concrete example: breeds = "GHHG", E = [4, 4, 3, 4]
     positions: 0  1  2  3
     breeds:    G  H  H  G
     cover:    0-3 1-3 2-2 3-3
   - Student picks (G-leader, H-leader) from radios. Sees coverage spans
     and which validity rule (a) or (b) makes the pair work.
   ================================================================ */
function LeadersIntroSim({ E }) {
  const breeds = ["G", "H", "H", "G"];
  const ends   = [3, 3, 2, 3]; // 0-indexed end positions
  const N = breeds.length;
  const Gs = breeds.map((b, i) => ({ b, i })).filter(x => x.b === "G").map(x => x.i);
  const Hs = breeds.map((b, i) => ({ b, i })).filter(x => x.b === "H").map(x => x.i);
  const [g, setG] = useState(0);
  const [h, setH] = useState(1);

  const gEnd = ends[g], hEnd = ends[h];
  // (a): leader's range covers all own breed
  const gCoversAllG = Gs.every(j => j >= g && j <= gEnd);
  const hCoversAllH = Hs.every(j => j >= h && j <= hEnd);
  // (b): other leader inside this leader's range
  const gHasH = h >= g && h <= gEnd;
  const hHasG = g >= h && g <= hEnd;
  const gOK = gCoversAllG || gHasH;
  const hOK = hCoversAllH || hHasG;
  const valid = gOK && hOK;

  const G_COL = "#2563eb", H_COL = "#d97706";
  const cell = (i) => {
    const isG = breeds[i] === "G";
    const col = isG ? G_COL : H_COL;
    const isLeader = (isG && i === g) || (!isG && i === h);
    return (
      <div key={i} style={{
        width: 44, height: 44, borderRadius: 8,
        background: isLeader ? col : col + "22",
        color: isLeader ? "#fff" : col,
        border: `2px solid ${col}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, fontSize: 16, position: "relative",
      }}>
        {breeds[i]}
        <div style={{ position: "absolute", bottom: -16, fontSize: 10, color: C.dim, fontWeight: 600 }}>{i}</div>
        {isLeader && <div style={{ position: "absolute", top: -14, fontSize: 10, color: col, fontWeight: 800 }}>★</div>}
      </div>
    );
  };

  // Span bar from leader -> end
  const spanBar = (start, end, color, label) => {
    const left = start * 52;
    const w = (end - start + 1) * 52 - 8;
    return (
      <div style={{
        position: "absolute", left, top: 0, width: w, height: 10,
        background: color + "55", border: `1.5px solid ${color}`, borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9, fontWeight: 800, color,
      }}>
        {label}
      </div>
    );
  };

  return (
    <div style={{ background: "#fff", border: "1.5px dashed #cbd5e1", borderRadius: 10, padding: 14, marginTop: 6 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 8, letterSpacing: 0.4 }}>
        🐮 {t(E, "TRY: pick a leader pair", "직접 골라봐: 리더 쌍")}
      </div>

      {/* Row of cows */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 22, paddingTop: 6 }}>
        {breeds.map((_, i) => cell(i))}
      </div>

      {/* Span bars under cows */}
      <div style={{ position: "relative", height: 12, width: N * 52 - 8, margin: "0 auto 18px" }}>
        {spanBar(g, gEnd, G_COL, t(E, "G covers", "G 범위"))}
      </div>
      <div style={{ position: "relative", height: 12, width: N * 52 - 8, margin: "0 auto 14px" }}>
        {spanBar(h, hEnd, H_COL, t(E, "H covers", "H 범위"))}
      </div>

      {/* Picker */}
      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 12, fontSize: 12, flexWrap: "wrap" }}>
        <div>
          <span style={{ color: G_COL, fontWeight: 700, marginRight: 6 }}>{t(E, "G-leader:", "G 리더:")}</span>
          {Gs.map(i => (
            <button key={i} onClick={() => setG(i)} style={{
              marginRight: 4, padding: "3px 9px", borderRadius: 6,
              border: `1.5px solid ${G_COL}`,
              background: g === i ? G_COL : "#fff",
              color: g === i ? "#fff" : G_COL,
              fontWeight: 700, fontSize: 12, cursor: "pointer",
            }}>{i}</button>
          ))}
        </div>
        <div>
          <span style={{ color: H_COL, fontWeight: 700, marginRight: 6 }}>{t(E, "H-leader:", "H 리더:")}</span>
          {Hs.map(i => (
            <button key={i} onClick={() => setH(i)} style={{
              marginRight: 4, padding: "3px 9px", borderRadius: 6,
              border: `1.5px solid ${H_COL}`,
              background: h === i ? H_COL : "#fff",
              color: h === i ? "#fff" : H_COL,
              fontWeight: 700, fontSize: 12, cursor: "pointer",
            }}>{i}</button>
          ))}
        </div>
      </div>

      {/* Validity board */}
      <div style={{
        background: valid ? "#ecfdf5" : "#fef2f2",
        border: `1.5px solid ${valid ? "#10b981" : "#f87171"}`,
        borderRadius: 8, padding: 10, fontSize: 12, lineHeight: 1.6,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2px 8px" }}>
          <span style={{ color: G_COL, fontWeight: 700 }}>{t(E, "G-leader OK?", "G 리더 OK?")}</span>
          <span>
            (a) {t(E, "covers all G", "모든 G 커버")}: <b style={{ color: gCoversAllG ? "#059669" : "#dc2626" }}>{gCoversAllG ? "✓" : "✗"}</b>
            {" · "}
            (b) {t(E, "H-leader inside", "H 리더 안에")}: <b style={{ color: gHasH ? "#059669" : "#dc2626" }}>{gHasH ? "✓" : "✗"}</b>
          </span>
          <span style={{ color: H_COL, fontWeight: 700 }}>{t(E, "H-leader OK?", "H 리더 OK?")}</span>
          <span>
            (a) {t(E, "covers all H", "모든 H 커버")}: <b style={{ color: hCoversAllH ? "#059669" : "#dc2626" }}>{hCoversAllH ? "✓" : "✗"}</b>
            {" · "}
            (b) {t(E, "G-leader inside", "G 리더 안에")}: <b style={{ color: hHasG ? "#059669" : "#dc2626" }}>{hHasG ? "✓" : "✗"}</b>
          </span>
        </div>
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${valid ? "#10b98155" : "#f8717155"}`, fontWeight: 800, color: valid ? "#047857" : "#b91c1c", textAlign: "center" }}>
          {valid
            ? t(E, "✓ VALID pair — both leaders pass at least one rule.", "✓ 유효한 쌍 — 두 리더 모두 (a) 또는 (b) 통과.")
            : t(E, "✗ Not valid — one leader fails BOTH (a) and (b).", "✗ 유효하지 않음 — 어느 한 리더가 (a)/(b) 둘 다 실패.")}
        </div>
      </div>
      <div style={{ fontSize: 11, color: C.dim, marginTop: 8, textAlign: "center", fontStyle: "italic" }}>
        {t(E,
          "Example: breeds = \"GHHG\", end positions = [4, 4, 3, 4] (1-indexed) → [3, 3, 2, 3] (0-indexed).",
          "예: breeds = \"GHHG\", 끝 위치 = [4, 4, 3, 4] (1-indexed) → [3, 3, 2, 3] (0-indexed).")}
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "p = 0",
  "N = int(data[p])",
  "p += 1",
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

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of valid (G-leader, H-leader) pairs.",
                "유효한 (G리더, H리더) 쌍의 수를 출력.")}
            </div>
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

          <LeadersIntroSim E={E} />
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
        "Try each (G, H) pair and check whether condition (a) or (b) holds.",
        "각 (G, H) 쌍을 시도하면서 (a) 또는 (b) 조건이 성립하는지 확인해 봐."),
      answer: 1,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeLeadersCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Editorial trick: in any valid leader pair, at least one of the two is the EARLIEST cow of its breed AND has visited all of its breed. Scan once for earliest/latest, then count Case A (eG is true G-leader) + Case B (symmetric) + special (eG & eH together). Sections build it one piece at a time.",
        "Editorial 한 줄: 유효한 쌍에는 둘 중 적어도 하나가 자기 품종의 가장 앞 소이면서 그 품종 전체를 방문해야 함. 한 번 스캔으로 각 품종의 앞/뒤 찾고, Case A (eG 가 진짜 G-리더) + Case B (대칭) + 특수 (eG, eH 함께) 카운트. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getLeadersSections(E),
    },
  ];
}
