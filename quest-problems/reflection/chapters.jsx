import { C, t } from "@/components/quest/theme";
import { getReflectionSections, ReflectionGrid } from "./components";
import { ReflectionRuleSim, ReflectionGroupSim } from "./sims";
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

    /* 1-0b — 규칙을 그림으로: 한 칸 칠하면 거울 짝 3칸이 따라온다 (선생님 2026-06-24: 읽지 말고 시뮬). */
    {
      type: "reveal",
      narr: t(E,
        "The rule, as a picture — paint one cell and watch its 3 mirror twins light up.",
        "규칙을 그림으로 — 한 칸 칠하면 거울 짝 3칸이 따라 켜지는 걸 봐요."),
      content: (<ReflectionRuleSim E={E} />),
    },

    /* 1-1b — Numbers-first warm-up: make the mirror-twins + cost concrete before formulas. */
    {
      type: "reveal",
      narr: t(E,
        "Before the (r,c) formulas, let's find the mirror twins with real numbers on a 4×4 grid.",
        "(r,c) 공식 전에, 4×4 격자에서 거울 짝을 실제 숫자로 먼저 찾아봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfeff", border: "1.5px solid #0891b2", borderRadius: 10, padding: 14, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, color: "#155e75", marginBottom: 8 }}>
              🔢 {t(E, "Mirror twins, with numbers first", "거울 짝, 숫자로 먼저")}
            </div>
            <div style={{ marginBottom: 8 }}>
              {t(E, "Take a ", "")}<b>{t(E, "4×4 grid (N=4)", "4×4 격자 (N=4)")}</b>
              {t(E, " and look at cell ", " 에서 칸 ")}<b style={{ color: "#0891b2" }}>(1, 2)</b>
              {t(E, ". Its 3 mirror twins:", " 하나를 봐요. 거울 짝 3개:")}
            </div>
            <div style={{ paddingLeft: 8, borderLeft: "3px solid #67e8f9", display: "flex", flexDirection: "column", gap: 4 }}>
              <div>{t(E, "Left↔right: ", "좌우 뒤집기: ")}<b>(1, N+1−2) = (1, 3)</b></div>
              <div>{t(E, "Top↔bottom: ", "상하 뒤집기: ")}<b>(N+1−1, 2) = (4, 2)</b></div>
              <div>{t(E, "Both: ", "둘 다: ")}<b>(4, 3)</b></div>
            </div>
            <div style={{ marginTop: 8 }}>
              {t(E, "So ", "즉 ")}<b style={{ color: "#0891b2" }}>(1,2) · (1,3) · (4,2) · (4,3)</b>
              {t(E, " must always be the SAME color.", " 네 칸은 늘 같은 색이어야 해요.")}
            </div>
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #67e8f9" }}>
              {t(E, "If 3 of those 4 are painted? Paint the 1 leftover → all match → ", "그 4칸 중 3칸이 칠해졌다면? 남은 1칸만 칠하면 다 같아져요 → ")}
              <b style={{ color: "#16a34a" }}>{t(E, "1 flip", "1번")}</b>
              <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>
                👉 {t(E, "For a group with p painted of 4: min flips = min(p, 4−p). Answer = sum over all mirror groups.",
                       "한 그룹에 4칸 중 p칸 칠해짐 → 최소 뒤집기 = min(p, 4−p). 답 = 모든 거울 그룹의 합.")}
              </div>
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

    /* 1-2b — 그림 따라 한 묶음씩 말풍선으로 최소 뒤집기 세기 (선생님 2026-06-24: 읽을 거 말고 시뮬+짧은 말풍선). */
    {
      type: "reveal",
      narr: t(E,
        "Follow the picture — count the minimum flips one mirror-group at a time. Short bubbles explain each step.",
        "그림 따라가 봐요 — 거울 짝 묶음마다 최소 뒤집기를 세요. 각 단계는 짧은 말풍선이 설명해요."),
      content: (<ReflectionGroupSim E={E} />),
    },

    /* 1-3 — Interactive grid simulator. (직접 아무 칸이나 토글) */
    {
      type: "reveal",
      narr: t(E,
        "Now try it yourself — click any cell to toggle it; its 3 mirror twins move together. Total updates live.",
        "이제 직접 — 아무 칸이나 클릭해서 토글해봐요. 거울 짝 3개가 같이 움직이고, 아래 총합이 실시간 갱신."),
      content: (<ReflectionGrid E={E} />),
    },

    /* 1-3b — Trace the FIRST official update "1 3" through the formula → total 4→3. */
    {
      type: "reveal",
      narr: t(E,
        "Now trace the FIRST official update \"1 3\" — it toggles cell (1,3). Watch ONE group's cost change move the total from 4 to 3.",
        "이제 첫 공식 update \"1 3\" 을 따라가요 — 칸 (1,3) 을 토글. 한 그룹의 비용 변화가 총합을 4 → 3 으로 옮기는 걸 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0891b2", textAlign: "center", marginBottom: 10 }}>
            🔄 {t(E, "Update \"1 3\" — toggle cell (1, 3)", "Update \"1 3\" — 칸 (1, 3) 토글")}
          </div>

          <div style={{ background: "#ecfeff", border: "1.5px solid #0891b2", borderRadius: 10, padding: "10px 14px", marginBottom: 10, fontSize: 12.5, color: C.text, lineHeight: 1.6 }}>
            {t(E, "Cell (1, 3) belongs to the ", "칸 (1, 3) 은 ")}
            <b style={{ color: "#0891b2" }}>{t(E, "top-row group", "위 한 줄 그룹")}</b>
            {t(E, ": (1,2) (1,3) (4,2) (4,3).  Toggling (1,3) only changes THIS group's count — nothing else.",
                  " 에 속해요: (1,2) (1,3) (4,2) (4,3). (1,3) 토글은 이 그룹의 개수만 바꿔요 — 나머지는 그대로.")}
          </div>

          {/* Before / After group state */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            {/* BEFORE */}
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 8, textAlign: "center" }}>{t(E, "BEFORE", "전")}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 8 }}>
                {[["(1,2)", false], ["(1,3)", true], ["(4,2)", false], ["(4,3)", true]].map(([lbl, painted], k) => (
                  <div key={k} style={{ textAlign: "center" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 6, border: "1.5px solid #fbbf24", background: painted ? "#7c2d12" : "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center", color: painted ? "#fff" : "#d97706", fontWeight: 700, fontSize: 14 }}>
                      {painted ? "#" : "."}
                    </div>
                    <div style={{ fontSize: 9, color: "#92400e", marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#7c2d12", textAlign: "center" }}>
                {t(E, "cnt = 2 → cost min(2, 2) = ", "cnt = 2 → 비용 min(2, 2) = ")}<b>2</b>
              </div>
            </div>
            {/* AFTER */}
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 8, textAlign: "center" }}>{t(E, "AFTER toggle (1,3)", "(1,3) 토글 후")}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 8 }}>
                {[["(1,2)", false], ["(1,3)", false], ["(4,2)", false], ["(4,3)", true]].map(([lbl, painted], k) => (
                  <div key={k} style={{ textAlign: "center" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 6, border: k === 1 ? "2px solid #16a34a" : "1.5px solid #86efac", background: painted ? "#166534" : "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", color: painted ? "#fff" : "#16a34a", fontWeight: 700, fontSize: 14 }}>
                      {painted ? "#" : "."}
                    </div>
                    <div style={{ fontSize: 9, color: "#15803d", marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#166534", textAlign: "center" }}>
                {t(E, "cnt = 1 → cost min(1, 3) = ", "cnt = 1 → 비용 min(1, 3) = ")}<b>1</b>
              </div>
            </div>
          </div>

          {/* Total arithmetic */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", fontSize: 13, color: "#5b21b6", lineHeight: 1.6 }}>
            {t(E, "This group's cost: ", "이 그룹 비용: ")}<b>2 → 1</b>{t(E, " (down 1).  ", " (1 감소). ")}
            <br/>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5 }}>
              total = 4 − cost<sub>old</sub>(2) + cost<sub>new</sub>(1) = 4 − 2 + 1 = <b style={{ color: "#15803d" }}>3</b>
            </span>
            <div style={{ fontSize: 11.5, color: "#6d28d9", marginTop: 4 }}>
              {t(E, "→ matches the first output line: ", "→ 첫 출력 줄과 일치: ")}<b style={{ color: "#15803d" }}>3</b> ✅
            </div>
          </div>

          <div style={{ background: "#ecfeff", border: "1px dashed #67e8f9", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#155e75", lineHeight: 1.6, textAlign: "center" }}>
            👉 {t(E,
              "Only THIS one group's number changed — every other group is untouched. That's why each update is O(1): recompute one group, nudge the total.",
              "이 한 그룹의 숫자만 바뀌었어요 — 나머지 그룹은 전혀 안 건드림. 그래서 update 1 번이 O(1): 한 그룹만 다시 계산하고 총합만 살짝 옮기면 끝.")}
          </div>
        </div>),
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
