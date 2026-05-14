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
        "N 개의 목초지 (1..N) 가 있고, 각각 4 가지 잔디 종류 중 하나를 심어요. M 쌍의 소 각각이 두 좋아하는 목초지를 가지고 있고, 그 두 목초지는 서로 다른 잔디 종류여야 해요.\n사전순으로 가장 작은 유효 배색을 1..4 의 숫자 문자열로 출력해요."),
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
                "사전순 가장 작은 유효 배색을 1..4 숫자 문자열로 출력.")}
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
        "목초지 5 개, 소 제약 5 개. 목초지를 클릭해서 잔디 종류를 1→2→3→4 로 순환. 빨간 간선 = 양 끝 같은 색 = 위반. 사전순 가장 작은 유효 문자열을 직접 만들어보고 '그리디 자동' 으로 비교."),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "With 4 colors available and no constraints on pasture 1, what color does it get?", "4가지 색이 있고 목초지 1에 제약이 없으면 어떤 색을 받을까?"),
      question: t(E,
        "Pasture 1, no constraints. Which color (1-4)?",
        "목초지 1, 제약 없음. 어떤 색 (1-4)?"),
      options: [
        t(E, "1 (smallest available)", "1 (가장 작은 것)"),
        t(E, "4 (largest available)", "4 (가장 큰 것)"),
        t(E, "Random choice", "랜덤 선택"),
        t(E, "Depends on other pastures", "다른 목초지에 따라 다름"),
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
        "What color does pasture 1 get when there are no constraints?", "제약이 없을 때 목초지 1의 색은?"),
      question: t(E,
        "Smallest available color for unconstrained pasture?",
        "제약 없는 목초지에 배정되는 가장 작은 색?"),
      hint: t(E,
        "With no neighbors fixed yet, what color minimizes lexicographic order?",
        "이웃 색이 아직 정해지지 않았다면 사전순을 가장 작게 만드는 색은?"),
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
        "그리디: 1..N 순서. 각 목초지마다 이미 색칠된 이웃 색을 확인하고 {1,2,3,4} 중 그 집합에 없는 가장 작은 색 선택. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getRevegSections(E),
    },
  ];
}
