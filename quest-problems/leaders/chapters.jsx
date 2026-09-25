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
            (a) {t(E, "covers all G", "모든 G 를 덮나")}: <b style={{ color: gCoversAllG ? "#059669" : "#dc2626" }}>{gCoversAllG ? "✓" : "✗"}</b>
            {" · "}
            (b) {t(E, "H-leader inside", "H 리더가 안에 있나")}: <b style={{ color: gHasH ? "#059669" : "#dc2626" }}>{gHasH ? "✓" : "✗"}</b>
          </span>
          <span style={{ color: H_COL, fontWeight: 700 }}>{t(E, "H-leader OK?", "H 리더 OK?")}</span>
          <span>
            (a) {t(E, "covers all H", "모든 H 를 덮나")}: <b style={{ color: hCoversAllH ? "#059669" : "#dc2626" }}>{hCoversAllH ? "✓" : "✗"}</b>
            {" · "}
            (b) {t(E, "G-leader inside", "G 리더가 안에 있나")}: <b style={{ color: hHasG ? "#059669" : "#dc2626" }}>{hHasG ? "✓" : "✗"}</b>
          </span>
        </div>
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${valid ? "#10b98155" : "#f8717155"}`, fontWeight: 800, color: valid ? "#047857" : "#b91c1c", textAlign: "center" }}>
          {valid
            ? t(E, "✓ VALID pair — both leaders pass at least one rule.", "✓ 되는 쌍이에요 — 두 리더 모두 (a) 나 (b) 를 통과했어요.")
            : t(E, "✗ Not valid — one leader fails BOTH (a) and (b).", "✗ 안 되는 쌍이에요 — 한쪽 리더가 (a) 와 (b) 를 둘 다 못 넘었어요.")}
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

/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeLeadersCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Pick one G-leader and one H-leader. How many valid pairs are there?",
        "G 리더와 H 리더를 하나씩 골라요. 되는 짝은 몇 가지일까요?"),
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
                "유효한 (G리더, H리더) 쌍이 몇 개인지 세어서 출력해요.")}
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
                        "하려면 다음 중 하나는 맞아야 해요.")}
                  <div style={{ marginTop: 6, marginLeft: 8, fontSize: 12, color: "#475569" }}>
                    {t(E, "(a) the leader's range covers every cow of her own breed", "(a) 리더의 범위가 자기 품종 소들을 모두 덮어요")}<br/>
                    {t(E, "(b) the OTHER leader is inside this leader's range", "(b) 상대 리더가 이 리더의 범위 안에 있어요")}
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
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=1275) — 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? N, then the breed string, then each cow's E_i.",
        "N 다음, 품종 문자열, 그다음 소마다 E_i 가 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of cows", "— 소의 수")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>s</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— length-N string, i-th char is 'G' or 'H' (cow i's breed)", "— 길이 N 문자열, i번째 글자가 i번 소의 품종 (G 또는 H)")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>E₁ E₂ ... Eₙ</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— N integers on one line, cow i's list reaches up to Eᵢ", "— 한 줄에 N개, i번 소의 목록이 Eᵢ 까지 이어져요")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: the number of valid leader pairs.",
                  "유효한 리더 짝의 수를 한 줄로 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>2 ≤ N ≤ 10⁵ (10만)</div>
              <div>i ≤ Eᵢ ≤ N</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "at least one G and one H are guaranteed  ·  at least one valid pair is guaranteed", "G 와 H 가 각각 하나 이상 있음이 보장돼요  ·  유효한 짝이 하나 이상 있음이 보장돼요")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If cow 1 is breed G and covers positions 1-4, and ALL G cows are within positions 1-4, is cow 1 a valid G leader?", "소 1 은 G 품종이고 위치 1-4 를 덮어요. 모든 G 소가 그 안에 있어요."),
      question: t(E,
        "Cow 1 (G) covers positions 1-4. All G cows are in positions 1-4. Is cow 1 a valid G leader?",
        "소 1 (G) 이 위치 1-4 를 덮고 모든 G 소가 1-4 안에 있어요. 소 1 은 유효한 G 리더일까요?"),
      options: [
        t(E, "Yes, it covers all G cows", "네, 모든 G 소를 덮어요"),
        t(E, "No, it must also cover H cows", "아니요, H 소도 덮어야 해요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! A leader only needs to cover all cows of its OWN breed. Cow 1 covers all G cows, so it's a valid G leader.",
        "맞아요! 규칙 (a) 는 자기 품종만 말해요. 소 1 이 모든 G 소를 덮으니 유효한 G 리더예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "breeds = \"GH\", ranges = [2, 2].\nG is at position 0 (covers 0-1), H is at position 1 (covers 1-1).\nHow many valid leader pairs?", "breeds = \"GH\", ranges = [2, 2] 예요.\nG 는 위치 0 에서 0-1 을, H 는 위치 1 에서 1-1 을 덮어요.\n유효한 리더 쌍은 몇 개일까요?"),
      question: t(E,
        "breeds=\"GH\", E=[2,2]. How many valid leader pairs?",
        "breeds=\"GH\", E=[2,2] 예요. 유효한 리더 쌍은 몇 개일까요?"),
      hint: t(E,
        "Try each (G, H) pair and check whether condition (a) or (b) holds.",
        "(G, H) 쌍을 하나씩 놓고 (a) 나 (b) 가 맞는지 따져 봐요."),
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
      type: "opt-codewalk",
      narr: t(E,
        "Every valid pair always includes the very first cow of some breed.",
        "되는 쌍에는 늘 '자기 품종의 맨 앞 소' 가 한 마리는 끼어 있어요."),
    },
  ];
}
