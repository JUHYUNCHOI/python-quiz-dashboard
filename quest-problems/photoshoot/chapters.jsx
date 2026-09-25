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
        "FJ has N cows (Guernsey/Holstein); maximize Gs at EVEN positions with even-length-prefix reversals — print the MINIMUM count needed.",
        "한 줄로 선 소들 중 짝수 자리에 건지(G)를 최대한 많이 두려고 해요.\n쓸 수 있는 동작은 앞쪽 짝수 마리를 통째로 뒤집는 것뿐이에요.\n최소 몇 번 뒤집어야 하는지 출력해요."),
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
                "짝수 위치에 건지를 가장 많이 두려면\n앞쪽을 최소 몇 번 뒤집어야 하는지 출력해요.")}
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
                        " 를 출력해요. 짝수 위치의 G 를 가장 많게 만드는 횟수예요.")}
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
                "앞 6마리를 뒤집으면 GGGHGH·HGHHHGHG → HGHGGG·HGHHHGHG 가 돼요.\n짝수 위치의 G가 4개에서 6개로 늘어나요. 이게 가능한 최대치라서 한 번이면 충분해요.")}
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=1227) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N, then the G/H string.",
        "입력은 N 다음 G/H 문자열로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of cows (N is even)", "— 소의 수 (N 은 짝수)")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>string</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— length N string of 'G' and 'H'", "— 길이 N 인 'G'와 'H' 문자열")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The minimum number of reversals needed on a single line.",
                  "필요한 최소 뒤집기 횟수를 한 줄로 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>2 ≤ N ≤ 200,000 <span style={{ color: C.dim, fontWeight: 400 }}>{t(E, "(= 2 × 10⁵), N is even", "(= 2 × 10⁵), N 은 짝수")}</span></div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "some subtasks: N ≤ 1000", "일부 서브태스크: N ≤ 1000")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's check: in \"GHHG\", how many G's are at even positions (1-indexed, even = 2,4)?", "\"GHHG\" 에서 짝수 자리(2번, 4번)에 G가 몇 개인지 세어 봐요."),
      question: t(E,
        "\"GHHG\": pos 2 is H, pos 4 is G. How many G at even positions?",
        "\"GHHG\" 는 2번이 H, 4번이 G예요. 짝수 위치의 G는 몇 개일까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "0", "0"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Position 2 has H, position 4 has G. Only 1 G at an even position.",
        "맞아요! 2번은 H이고 4번은 G라서, 짝수 위치의 G는 1개뿐이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "In \"GHHG\", how many G's are at even 1-indexed positions?", "\"GHHG\" 에서 짝수 자리에 G가 몇 개일까요?"),
      question: t(E,
        "\"GHHG\": How many G at even positions (2,4)?",
        "\"GHHG\" 의 짝수 위치(2, 4)에 G가 몇 개 있나요?"),
      hint: t(E,
        "Walk through positions 2 and 4 and tally the G's only.",
        "2번과 4번 자리만 보면서 G 의 개수를 세어 봐요."),
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
        "Scan the pairs from RIGHT to LEFT, keeping a flip flag: if the even slot already has a G, keep going; otherwise flip once when the other cow is a G.",
        "두 마리씩 짝지어 오른쪽에서 왼쪽으로 훑어요.\n짝수 칸에 이미 G가 있으면 그대로 두고, 없는데 짝꿍이 G면 한 번 뒤집어요."),
      sections: getPhotoshootSections(E),
    },
  ];
}
