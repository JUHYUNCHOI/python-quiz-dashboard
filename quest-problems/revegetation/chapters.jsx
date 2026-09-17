import { C, t } from "@/components/quest/theme";
import { getRevegSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeRevegCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "There are N pastures (1..N), each gets ONE of 4 grass types. M cow pairs each have two favorite pastures and they require those two pastures to have DIFFERENT grass types.\nPrint the LEXICOGRAPHICALLY SMALLEST valid grass-type assignment as a string of digits 1..4.",
        "목초지마다 잔디 1~4 중 하나를 심어요.\n규칙을 지키면서 사전순으로 가장 작게 심어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf31"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>The Great Revegetation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2019 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Output the lexicographically smallest valid grass-type assignment as a string of digits 1..4.",
                "규칙을 지키는 배색 중 사전순으로 가장 작은 것을 1~4 숫자 문자열로 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#f97316" }}>{t(E, "N pastures (1..N)", "N 개의 목초지 (1..N)")}</b>
                  {t(E, " — each must be planted with one of ", " 가 있고, 각자 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "4 grass types (1, 2, 3, 4)", "4 가지 잔디 종류 (1, 2, 3, 4)")}</b>
                  {t(E, ".", " 중 하나를 심어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "M cow pairs each have ", "M 쌍의 소가 각자 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "two favorite pastures", "두 개의 좋아하는 목초지")}</b>
                  {t(E, " — those two must have DIFFERENT grass types.",
                        " 를 가지고 있고, 그 두 목초지는 서로 다른 잔디 종류여야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "lexicographically smallest valid assignment", "사전순으로 가장 작은 유효 배색")}</b>
                  {t(E, " as a string of digits 1..4.", " 을 1..4 숫자 문자열로 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Interactive sim — click pastures, watch violations live
    {
      type: "sim",
      narr: t(E,
        "5 pastures, 5 cow constraints. Click a pasture to cycle its grass type 1→2→3→4. Red edges = same color on both ends = violation. Aim for the lexicographically smallest valid string, then press 'Greedy auto' to compare.",
        "목초지를 눌러 잔디 종류를 바꿔 봐요.\n선이 빨개지면 규칙을 어긴 거예요."),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "With 4 colors available and no constraints on pasture 1, what color does it get?", "색이 4가지 있고 목초지 1 에는 지켜야 할 규칙이 없어요.\n어떤 색을 심게 될까요?"),
      question: t(E,
        "Pasture 1, no constraints. Which color (1-4)?",
        "목초지 1 에 규칙이 없다면 어떤 색을 심을까요? (1~4)"),
      options: [
        t(E, "1 (smallest available)", "1 — 쓸 수 있는 것 중 가장 작아요"),
        t(E, "4 (largest available)", "4 — 쓸 수 있는 것 중 가장 커요"),
        t(E, "Random choice", "아무거나 골라요"),
        t(E, "Depends on other pastures", "다른 목초지에 따라 달라요"),
      ],
      correct: 0,
      explain: t(E,
        "Greedy assigns the smallest available color. With no constraints, that's 1.",
        "그리디는 가장 작은 사용 가능한 색을 배정해요. 제약이 없으면 1이에요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "What color does pasture 1 get when there are no constraints?", "지켜야 할 규칙이 없을 때 목초지 1 에는 어떤 색을 심을까요?"),
      question: t(E,
        "Smallest available color for unconstrained pasture?",
        "규칙이 없는 목초지에 심을 수 있는 가장 작은 색은 얼마일까요?"),
      hint: t(E,
        "With no neighbors fixed yet, what color minimizes lexicographic order?",
        "이웃 색이 아직 정해지지 않았다면, 사전순을 가장 작게 만드는 색은 무엇일까요?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeRevegCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Greedy: process pastures 1..N in order. For each, look at colors already taken by colored neighbors and pick the smallest in {1,2,3,4} not in that set. Sections build it one piece at a time.",
        "1번 목초지부터 차례로 색을 정해요.\n이웃이 이미 쓴 색을 빼고 남은 것 중 가장 작은 색을 골라요."),
      sections: getRevegSections(E),
    },
  ];
}
