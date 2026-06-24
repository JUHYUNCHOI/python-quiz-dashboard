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
        "FJ's picture should be mirror-symmetric across the center lines — paint one cell and its 3 mirror twins must match. Fix Bessie's mess in the fewest flips, and re-answer after each one-cell change.",
        "FJ 그림은 가운데 선으로 거울 대칭이어야 해요 — 한 칸 칠하면 거울 짝 3칸도 같은 색. Bessie 가 망친 걸 최소 횟수로 고치고, 한 칸씩 바꿀 때마다 다시 답해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🪞</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#0891b2" }}>Reflection</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2025 Bronze #1</div>
          </div>

          {/* 🎯 Mission box — 쉬운 말 */}
          <div style={{ background: "#ecfeff", border: "1.5px solid #0891b2", borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#155e75", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#155e75", lineHeight: 1.55, wordBreak: "keep-all" }}>
              {t(E,
                "Make the picture mirror-symmetric with the FEWEST cell changes. Bessie flips one cell at a time — answer again after each.",
                "그림을 거울 대칭으로 만드는 데 칸을 최소 몇 번 바꿔야 할까요? Bessie 가 한 칸씩 바꿀 때마다 다시 답해요.")}
            </div>
          </div>

          {/* 규칙은 그림(시뮬)으로 — 페이지엔 미션 + 시뮬만 (선생님 2026-06-24: 한 페이지에 너무 많다) */}
          <ReflectionRuleSim E={E} />
        </div>),
    },

    /* 1-1 — 입출력 형식 + 제약 (분리: 문제 페이지는 미션+시뮬만 두려고) */
    {
      type: "reveal",
      narr: t(E,
        "How the input and output look — short version.",
        "입력·출력이 어떻게 생겼는지 — 짧게."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", border: "1.5px solid #67e8f9", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: C.text, lineHeight: 1.85, wordBreak: "keep-all" }}>
            📥 <b>{t(E, "Input", "입력")}</b> {t(E, ": N and U → the N-row picture → U lines, each a cell (r, c) to flip (paint ↔ erase).", ": N·U → 그림 N줄 → 바꾼 칸 (r, c) U줄 (칠함 ↔ 지움).")}<br />
            📤 <b>{t(E, "Output", "출력")}</b> {t(E, ": U+1 lines — fewest changes at the start, then after each flip.", ": U+1 줄 — 처음 + 매번 바꾼 뒤의 최소 바꾸기 수.")}
          </div>
          <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
            📐 <b>{t(E, "Limits", "제약")}:</b>{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>2 ≤ N ≤ 2000</code>{" "}({t(E, "N even", "N 짝수")}),{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>0 ≤ U ≤ 10⁵</code>
          </div>
        </div>),
    },

    /* 1-1b 제거 (선생님 2026-06-24: 거울 짝을 글로 다시 설명 — 1-1 RuleSim 이 index 라벨로 이미 보여줌. 중복). */

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

          <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: C.text, lineHeight: 1.65, wordBreak: "keep-all" }}>
            {t(E,
              "Input = the picture, then the cells to flip. Output = the first answer, then after each flip. Why the first answer is 4 — see it on the next picture 👇",
              "입력 = 그림 + 바꿀 칸들. 출력 = 처음 답 + 매번 바꾼 뒤 답. 처음 답이 왜 4인지는 — 바로 다음 그림으로 봐요 👇")}
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
