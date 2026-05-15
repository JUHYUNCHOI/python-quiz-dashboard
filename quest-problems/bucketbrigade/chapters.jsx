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
        "On a 10×10 grid there's exactly one lake L, one barn B, and one rock R; every other cell is empty.\nCows stand on empty cells, holding hands in a chain that connects L to B (each adjacent step in the chain shares an edge — up/down/left/right). Cows can NOT stand on the rock.\nFind the MINIMUM number of cows needed.",
        "10×10 격자에 호수 L, 헛간 B, 바위 R 이 정확히 하나씩 있고 나머지 칸은 비어있어요.\n소들이 빈 칸에 서서 손을 잡고 L 과 B 를 이어요 (체인의 인접한 두 소는 상하좌우로 붙어있어야 함). 바위 위에는 설 수 없어요.\n필요한 소의 최소 수를 출력해요."),
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
              \ud83c\udfaf {t(E, "Mission", "\ubbf8\uc158")}
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
                  <b style={{ color: "#0891b2" }}>{t(E, "chain of empty cells from L to B", "L 과 B 를 잇는 빈 칸들의 체인")}</b>
                  {t(E, " (each adjacent pair in the chain shares an up/down/left/right edge).",
                        " 을 만들어요 (체인의 인접한 두 소는 상하좌우로 붙어있음).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cows ", "소는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "cannot stand on the rock", "바위 위에 설 수 없어요")}</b>
                  {t(E, " (and don't stand on L or B themselves).",
                        " (L, B 위에도 안 섬).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of cows", "필요한 최소 소 수")}</b>
                  {t(E, " in the chain.", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 🪣 Eye-evident grid simulator — additive to dense prose above */}
          <BucketBrigadeGrid E={E} />
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
        "10×10 격자에서 L 부터 B 까지 BFS, R 은 통과 불가. 최단 경로 길이 − 2 (L, B 는 소 아님). 아래 섹션이 한 단락씩 쌓아요."),
      sections: getBucketBrigadeSections(E),
    },
  ];
}
