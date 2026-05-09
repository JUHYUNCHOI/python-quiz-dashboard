import { C, t } from "@/components/quest/theme";
import { getReflectionSections, ReflectionGrid } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeReflectionCh1(E) {
  return [
    /* 1-1 — Problem statement, verbatim properties + constraints. */
    {
      type: "reveal",
      narr: t(E,
        "FJ has an N×N canvas (N even). A valid painting is symmetric across BOTH the horizontal and vertical center lines — every cell has 3 mirror twins, all four must agree. After Bessie's vandalism, find the MIN cells to flip to restore that symmetry. Updates toggle one cell at a time.",
        "FJ 의 N×N 캔버스 (N 짝수). 올바른 그림은 가로 + 세로 가운데 선 양쪽으로 대칭 — 모든 칸은 거울 짝 3 개를 가지고, 4 칸 모두 같은 색이어야 함. Bessie 가 망친 뒤 대칭 회복에 필요한 최소 칸 뒤집기. update 마다 한 칸씩 토글."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🪞</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#0891b2" }}>Reflection</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2025 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfeff", border: "1.5px solid #0891b2", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#155e75", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#155e75", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum cells to flip so the canvas is symmetric across both center lines — before any update, then after each of U updates (U+1 lines total).",
                "캔버스가 가로 + 세로 가운데 선 양쪽으로 대칭이 되는 최소 뒤집기 횟수를 출력 — update 전 + 각 update 후 (총 U+1 줄).")}
            </div>
          </div>

          <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#155e75", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E, "FJ has an ", "FJ 에게 ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontWeight: 600 }}>N × N</code>
              {t(E, " canvas (N is EVEN). A valid painting is built by painting the top-right quadrant and reflecting it across the horizontal and vertical center lines into the other three quadrants. Bessie vandalized it.",
                    " 캔버스가 있어요 (N 은 짝수). 올바른 그림은 우상단 사분면을 그린 뒤 가로/세로 가운데 선으로 다른 세 사분면에 반사. Bessie 가 망쳤어요.")}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.55 }}>
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #67e8f9", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#0891b2", fontWeight: 600, flexShrink: 0 }}>1.</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "Symmetry rule", "대칭 규칙")}</b>
                  {t(E, " — cell (r, c) must match cells (r, N+1−c), (N+1−r, c), (N+1−r, N+1−c). All FOUR must be the same color.",
                        " — 칸 (r, c) 는 (r, N+1−c), (N+1−r, c), (N+1−r, N+1−c) 와 같아야 함. 네 칸이 모두 같은 색.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #67e8f9", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#7c3aed", fontWeight: 600, flexShrink: 0 }}>2.</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Update format", "update 형식")}</b>
                  {t(E, " — U updates follow. Each gives (r, c) and TOGGLES that one cell (paint ↔ unpaint).",
                        " — U 개의 update. 각각 (r, c) 를 줘서 그 한 칸을 토글 (칠함 ↔ 안 칠함).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #67e8f9", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#16a34a", fontWeight: 600, flexShrink: 0 }}>3.</span>
                <div>
                  <b style={{ color: "#16a34a" }}>{t(E, "Output", "출력")}</b>
                  {t(E, " — U + 1 lines: minimum cells to flip BEFORE any update, then after each update.",
                        " — U + 1 줄: update 전 + 각 update 후의 최소 뒤집기 횟수.")}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>2 ≤ N ≤ 2000</code>{" "}({t(E, "N even", "N 짝수")}),{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>0 ≤ U ≤ 10⁵</code>
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample I/O verbatim + walkthrough. */
    {
      type: "reveal",
      narr: t(E,
        "Official sample: 4×4 canvas, 5 updates. Initial answer 4, then after each update: 3, 2, 1, 0, 1.",
        "공식 샘플: 4×4 캔버스, update 5 번. 처음 답 4, 그 다음 update 마다: 3, 2, 1, 0, 1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0891b2", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`4 5
..#.
##.#
####
..##
1 3
2 3
4 3
4 4
4 4`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`4
3
2
1
0
1`}
              </div>
            </div>
          </div>

          <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 600, color: "#155e75", marginBottom: 6 }}>
              🔍 {t(E, "Why initial answer = 4?", "왜 초기 답 = 4?")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "The canvas has 4×4/4 = 4 'mirror groups' of 4 cells each. For each group:",
                    "캔버스에는 (4×4)/4 = 4 개의 '거울 그룹' (각 4 칸). 그룹마다:")}
            </div>
            <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#5b21b6" }}>
              {t(E, "Corners group (1,1)(1,4)(4,1)(4,4) = . . . #  → 1 painted, flip 1.", "모서리 그룹 (1,1)(1,4)(4,1)(4,4) = . . . #  → 1 칠함, 1 뒤집기.")}
              <br/>
              {t(E, "Top row group (1,2)(1,3)(4,2)(4,3) = . # . # → 2 painted, flip 2.", "위 한 줄 그룹 (1,2)(1,3)(4,2)(4,3) = . # . # → 2 칠함, 2 뒤집기.")}
              <br/>
              {t(E, "Side columns (2,1)(2,4)(3,1)(3,4) = # # # # → 4 painted, flip 0.", "양옆 칸 (2,1)(2,4)(3,1)(3,4) = # # # # → 4 칠함, 0 뒤집기.")}
              <br/>
              {t(E, "Center group (2,2)(2,3)(3,2)(3,3) = # . # # → 3 painted, flip 1.", "가운데 그룹 (2,2)(2,3)(3,2)(3,3) = # . # # → 3 칠함, 1 뒤집기.")}
            </div>
            <div style={{ marginTop: 6, fontWeight: 600, color: "#15803d" }}>
              {t(E, "Total = 1 + 2 + 0 + 1 = 4.", "합계 = 1 + 2 + 0 + 1 = 4.")}
            </div>
          </div>
        </div>),
    },

    /* 1-3 — Interactive grid simulator. */
    {
      type: "reveal",
      narr: t(E,
        "Click any cell to toggle it. Watch how its 3 mirror twins move with it (same color group). Total ops at the bottom updates live.",
        "아무 칸이나 클릭해서 토글해봐요. 거울 짝 3 개가 같이 움직임 (같은 색 그룹). 아래 총 ops 가 실시간 갱신."),
      content: (<ReflectionGrid E={E} />),
    },

    /* 1-4 — Quiz: which cells form a group with (r, c)? */
    {
      type: "quiz",
      narr: t(E,
        "For N=6, cell (2, 5) belongs to a 4-cell group. Which 3 cells share the group?",
        "N=6 일 때 칸 (2, 5) 는 어느 3 칸과 같은 그룹?"),
      question: t(E,
        "N=6, cell (2, 5)'s mirror twins are?",
        "N=6, 칸 (2, 5) 의 거울 짝은?"),
      options: [
        "(2, 2), (5, 5), (5, 2)",
        "(2, 1), (5, 5), (5, 1)",
        "(5, 5), (2, 2), (1, 1)",
      ],
      correct: 0,
      explain: t(E,
        "Mirror across vertical center: c → N+1−c = 6+1−5 = 2 → (2, 2). Mirror across horizontal: r → N+1−r = 5 → (5, 5). Both: (5, 2). Group = {(2,5), (2,2), (5,5), (5,2)}.",
        "세로 가운데로 거울: c → N+1−c = 6+1−5 = 2 → (2, 2). 가로 거울: r → N+1−r = 5 → (5, 5). 둘 다: (5, 2). 그룹 = {(2,5), (2,2), (5,5), (5,2)}."),
    },

    /* 1-5 — Input quiz: tiny case. */
    {
      type: "input",
      narr: t(E,
        "2×2 grid \"#.\" / \"..\".  N=2, so all 4 cells are ONE mirror group.  Count what's painted, decide min flips.",
        "2×2 그리드 \"#.\" / \"..\". N=2 라 4 칸 모두 한 거울 그룹. 칠해진 거 세고 최소 뒤집기 정해."),
      question: t(E,
        "Min flips for 2×2 grid \"#.\" / \"..\"?",
        "2×2 그리드 \"#.\" / \"..\" 의 최소 뒤집기?"),
      hint: t(E,
        "Either everyone in the group becomes '.' or everyone becomes '#'.  Pick the cheaper.",
        "그룹 전체를 '.' 로 통일하거나 '#' 로 통일. 더 적게 뒤집는 쪽."),
      answer: 1,
    },
  ];
}

export function makeReflectionCh2(E, lang = "py") {
  return [
    /* 2-1..2-7 — sections directly. */
    ...getReflectionSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E,
            "Group every cell by its mirror identity, then for each group of 4 cells: flips = min(count, 4 − count).  Brute first, then maintain a running total to handle updates fast.",
            "모든 칸을 거울 정체로 묶고 — 4 칸 그룹마다 뒤집기 = min(count, 4 − count). brute 먼저, 그 다음 update 빠르게 처리하기 위해 running total 유지.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
