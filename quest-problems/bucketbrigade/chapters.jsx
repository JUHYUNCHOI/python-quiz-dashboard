import { C, t } from "@/components/quest/theme";
import { getBucketBrigadeSections, BucketBrigadeGrid } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBrigadeCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "How many cows are needed to hold hands and connect L to B?",
        "소들이 손을 잡고 L 과 B 를 이으려면 몇 마리가 필요할까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udea3"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Bucket Brigade</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2019 Bronze #1</div>
          </div>

          {/* \ud83c\udfaf Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              {"\ud83c\udfaf"} {t(E, "Mission", "\ubbf8\uc158")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of cows needed to form a chain from L to B on the 10\u00d710 grid (cows can't stand on R).",
                "10\u00d710 \uaca9\uc790\uc5d0\uc11c L \ubd80\ud130 B \uae4c\uc9c0 \uccb4\uc778\uc744 \ub9cc\ub4dc\ub294 \ub370 \ud544\uc694\ud55c \ucd5c\uc18c \uc18c \uc218\ub97c \ucd9c\ub825 (\uc18c\ub294 R \uc704 X).")}
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
                  {t(E, "A ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "10×10 grid", "10×10 격자")}</b>
                  {t(E, " contains exactly one ", "에 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>L</code>
                  {t(E, " (lake), one ", " (호수), ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>B</code>
                  {t(E, " (barn), and one ", " (헛간), ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>R</code>
                  {t(E, " (rock).", " (바위) 가 정확히 하나씩 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cows form a ", "소들이 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "chain of empty cells from L to B", "L 과 B 를 잇는 빈 칸들의 줄")}</b>
                  {t(E, " (each adjacent pair in the chain shares an up/down/left/right edge).",
                        " 을 만들어요 (줄에서 이웃한 두 소는 상하좌우로 붙어 있어야 해요).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cows ", "소는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "cannot stand on the rock", "바위 위에 설 수 없어요")}</b>
                  {t(E, " (and don't stand on L or B themselves).",
                        " (L 과 B 위에도 서지 않아요).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of cows", "줄에 필요한 소의 최소 마릿수")}</b>
                  {t(E, " in the chain.", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 🪣 Eye-evident grid simulator — additive to dense prose above */}
          <BucketBrigadeGrid E={E} />
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=939) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  Exactly 10 rows of 10 characters.",
        "입력은 10개의 줄, 각 줄이 10개의 글자로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>row</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— 10 characters: '.', 'L', 'B', or 'R'", "— 10글자: '.', 'L', 'B', 'R' 중 하나")}</span></div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats exactly 10 times", "↑ 이 줄이 정확히 10번 반복")}</div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The minimum number of cows needed to form a chain from the lake to the barn.",
                  "호수에서 헛간까지 줄을 만드는 데 필요한 소의 최소 마릿수를 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>{t(E, "grid size is always fixed: 10 × 10", "격자 크기는 항상 고정: 10 × 10")}</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "exactly one L, one B, one R  ·  the barn and lake are never adjacent", "L, B, R 이 정확히 하나씩  ·  헛간과 호수는 서로 붙어 있지 않음")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "The grid is a fixed size. What are its dimensions?", "격자는 고정 크기예요. 크기가 얼마일까요?"),
      question: t(E,
        "What is the grid size in Bucket Brigade?",
        "Bucket Brigade에서 격자의 크기는?"),
      options: [
        t(E, "5x5", "5x5"),
        t(E, "10x10", "10x10"),
        t(E, "100x100", "100x100"),
        t(E, "NxN (variable)", "NxN (가변)"),
      ],
      correct: 1,
      explain: t(E,
        "The grid is always 10x10 in this problem.",
        "이 문제에서 격자는 항상 10x10이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "What is the grid size (one dimension)?", "격자의 한 변의 크기는?"),
      question: t(E,
        "The grid is NxN. What is N?",
        "격자가 NxN이에요. N은?"),
      hint: t(E,
        "The grid is always 10x10.",
        "격자는 항상 10x10이에요."),
      answer: 10,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBrigadeCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in.
    {
      type: "progressive",
      narr: t(E,
        "BFS from L to B on the 10×10 grid, blocking R.  Shortest path length minus 2 (L and B don't count as cows).  Sections build it one piece at a time.",
        "10×10 격자에서 L→B 최단 경로 칸 수(L·B 제외)가 소의 마릿수예요."),
      sections: getBucketBrigadeSections(E),
    },
  ];
}
