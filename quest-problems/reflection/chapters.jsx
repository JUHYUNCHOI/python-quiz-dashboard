import { C, t } from "@/components/quest/theme";
import { getReflectionSections, ReflectionGrid } from "./components";
import { ReflectionRuleSim, ReflectionGroupSim, ReflectionUpdateSim } from "./sims";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeReflectionCh1(E) {
  return [
    /* 1-1 — Problem statement, verbatim properties + constraints. */
    {
      type: "reveal",
      narr: t(E,
        "Make the picture mirror-symmetric — in the fewest changes.",
        "그림을 거울 대칭으로 — 최소 횟수로."),
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

    /* 1-1 형식 슬라이드 제거 (선생님 2026-06-24: 2·3페이지 합치기 — 추상 형식은 샘플 입출력이 라벨로 다 보여줌).
       1-1b('숫자로 먼저') 도 이미 제거(RuleSim index 중복). */

    /* 1-2 — Sample I/O (= 형식도 겸함) + 제약. */
    {
      type: "reveal",
      narr: t(E,
        "Official sample — input and output.",
        "공식 샘플 — 입력과 출력."),
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
              "입력 = 그림(첫 줄 N·U) + 바꿀 칸 (r, c) 들. 출력 = 처음 답 + 매번 바꾼 뒤 답. 처음 답이 왜 4인지는 — 바로 다음 그림으로 봐요 👇")}
          </div>
          <div style={{ marginTop: 8, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
            📐 <b>{t(E, "Limits", "제약")}:</b>{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>2 ≤ N ≤ 2000</code>{" "}({t(E, "N even", "N 짝수")}),{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>0 ≤ U ≤ 10⁵</code>
          </div>
        </div>),
    },

    /* 1-2b — 그림 따라 한 묶음씩 말풍선으로 최소 뒤집기 세기 (선생님 2026-06-24: 읽을 거 말고 시뮬+짧은 말풍선). */
    {
      type: "reveal",
      narr: t(E,
        "Count the min flips — one mirror-group at a time.",
        "묶음마다 최소 뒤집기 세기."),
      content: (<ReflectionGroupSim E={E} />),
    },

    /* 1-3 — Interactive grid simulator. (직접 아무 칸이나 토글) */
    {
      type: "reveal",
      narr: t(E,
        "Try it yourself — toggle a cell.",
        "직접 칸을 토글해봐요."),
      content: (<ReflectionGrid E={E} />),
    },

    /* 1-3b — update 마다 그 묶음만 ±1 → 시뮬로 (선생님 2026-06-24: 처음 답 구하고 바꿀 때 +1/−1 다 보여줘) */
    {
      type: "reveal",
      narr: t(E,
        "Each change touches one group → nudge the total ±1.",
        "바꿀 때마다 묶음 하나만 → 총합 ±1."),
      content: (<ReflectionUpdateSim E={E} />),
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
            "Each group's flips = min(painted, 4 − painted).",
            "그룹마다 뒤집기 = min(칠한 수, 4 − 칠한 수).")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
