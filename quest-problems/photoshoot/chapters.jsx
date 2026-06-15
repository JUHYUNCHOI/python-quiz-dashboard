import { C, t } from "@/components/quest/theme";
import { getPhotoshootSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhotoshootCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has a row of N cows (N even), each Guernsey (G) or Holstein (H). He wants as many Guernseys as possible at EVEN positions (positions 2, 4, 6, ...).\nHis only allowed move: reverse an EVEN-LENGTH prefix of the row. He must first reach the maximum possible number of G's at even positions.\nPrint the MINIMUM number of reversals needed to do that.",
        "FJ에게 한 줄로 선 N마리 소(N은 짝수)가 있고, 각 소는 건지(G) 또는 홀스타인(H)이에요. 짝수 위치(2, 4, 6, ...)에 건지를 최대한 많이 두고 싶어요.\nFJ가 쓸 수 있는 유일한 동작: 줄의 짝수 길이 접두사를 뒤집기. 먼저 짝수 위치 G 개수를 가능한 최대로 만들어야 해요.\n그렇게 하는 데 필요한 최소 뒤집기 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📸"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Photoshoot</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2022 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of even-length prefix reversals to put the most possible Guernseys at even positions.",
                "짝수 위치에 건지를 최대한 많이 두기 위한 짝수 길이 접두사 뒤집기 최소 횟수를 출력.")}
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
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N cows in a row", "한 줄로 선 N마리 소")}</b>
                  {t(E, ", each ", "가 있고, 각 소는 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>G</code>
                  {t(E, " (Guernsey) or ", " 또는 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>H</code>
                  {t(E, " (Holstein).", " (홀스타인) 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Goal: as many ", "목표: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "G's at EVEN positions", "짝수 위치의 G")}</b>
                  {t(E, " as possible (positions 2, 4, 6, ... are even; position 1 is odd).",
                        " 를 최대한 많이 (위치 2, 4, 6, ... 이 짝수, 위치 1은 홀수).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One move: ", "한 동작: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "reverse an EVEN-LENGTH prefix", "짝수 길이 접두사를 뒤집기")}</b>
                  {t(E, " (the first 2, 4, 6, ... cows).", " (앞에서부터 2, 4, 6, ... 마리).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of reversals", "최소 뒤집기 횟수")}</b>
                  {t(E, " to reach the maximum possible G's at even positions.",
                        " 를 출력해요. 짝수 위치 G 개수를 최대로 만드는 데 필요한.")}
                </div>
              </div>
            </div>
          </div>

          {/* I/O + official sample (static worked example).
              TODO: sim redesign — the old PhotoshootUnfoldSim animated a
              wrong-problem "guess a[0], unfold a[i+1]=b[i]-a[i]" model. */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 8 }}>
              🔎 {t(E, "Official sample", "공식 예제")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text, lineHeight: 1.7 }}>
              <div style={{ color: C.dim }}>{t(E, "Input:", "입력:")}</div>
              <div>14</div>
              <div>GGGHGHHGHHHGHG</div>
              <div style={{ color: C.dim, marginTop: 6 }}>{t(E, "Output:", "출력:")}</div>
              <div style={{ color: "#15803d", fontWeight: 700 }}>1</div>
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, marginTop: 8, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
              {t(E,
                "Reverse the first six cows: GGGHGH·HGHHHGHG → HGHGGG·HGHHHGHG. That lifts G's at even positions from 4 up to 6 — the most possible. So 1 reversal is enough.",
                "앞 6마리를 뒤집어요: GGGHGH·HGHHHGHG → HGHGGG·HGHHHGHG. 짝수 위치 G가 4개에서 6개로 — 가능한 최대치. 그래서 1번 뒤집기면 충분.")}
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's check: in \"GHHG\", how many G's are at even positions (1-indexed, even = 2,4)?", "확인해보자: \"GHHG\"에서 짝수 위치(1-인덱스, 짝수=2,4)에 G가 몇 개예요?"),
      question: t(E,
        "\"GHHG\": pos 2 is H, pos 4 is G. How many G at even positions?",
        "\"GHHG\": 위치2는 H, 위치4는 G. 짝수 위치의 G 개수는?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "0", "0"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Position 2 has H, position 4 has G. Only 1 G at an even position.",
        "맞아! 위치2는 H, 위치4는 G. 짝수 위치에 G는 1개뿐이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "In \"GHHG\", how many G's are at even 1-indexed positions?", "\"GHHG\"에서 1-인덱스 짝수 위치에 G가 몇 개예요?"),
      question: t(E,
        "\"GHHG\": How many G at even positions (2,4)?",
        "\"GHHG\": 짝수 위치(2,4)에 G가 몇 개?"),
      hint: t(E,
        "Walk through positions 2 and 4 and tally the G's only.",
        "위치 2 와 4 만 보면서 G 의 개수만 세어 봐."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhotoshootCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Scan the pairs from RIGHT to LEFT, keeping a flip flag. For each (odd-slot, even-slot) pair, the even slot's char is s[i] when flipped, else s[i+1]. If a G is already in the even slot, leave it; otherwise if the other cow is a G, do one reversal (count it and toggle flip). Sections build it one piece at a time.",
        "쌍을 오른쪽에서 왼쪽으로 훑으면서 flip 플래그를 유지해요. 각 (홀수칸, 짝수칸) 쌍에서 짝수칸의 글자는 flip이면 s[i], 아니면 s[i+1]. 짝수칸에 이미 G가 있으면 그대로 두고, 아니면 다른 소가 G일 때 한 번 뒤집어요(횟수 +1, flip 토글). 아래 섹션이 한 단락씩 쌓아요."),
      sections: getPhotoshootSections(E),
    },
  ];
}
