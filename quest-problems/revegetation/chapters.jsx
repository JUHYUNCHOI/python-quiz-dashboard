import { C, t } from "@/components/quest/theme";
import { getRevegSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "",
  "# constraints[i] = set of pastures that must differ from i",
  "constraints = [set() for _ in range(N+1)]",
  "for _ in range(M):",
  "    a, b = map(int, input().split())",
  "    constraints[a].add(b)",
  "    constraints[b].add(a)",
  "",
  "# Greedy: assign smallest color (1-4) to each pasture",
  "color = [0] * (N+1)",
  "for i in range(1, N+1):",
  "    used = set()",
  "    for j in constraints[i]:",
  "        if color[j] != 0:",
  "            used.add(color[j])",
  "    for c in range(1, 5):",
  "        if c not in used:",
  "            color[i] = c",
  "            break",
  "",
  "print(''.join(str(color[i]) for i in range(1, N+1)))",
];


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

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
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
    // 1-2: Quiz
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
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "What color does pasture 1 get when there are no constraints?", "제약이 없을 때 목초지 1의 색은?"),
      question: t(E,
        "Smallest available color for unconstrained pasture?",
        "제약 없는 목초지에 배정되는 가장 작은 색?"),
      hint: t(E,
        "Colors are 1, 2, 3, 4. Smallest is 1.",
        "색은 1, 2, 3, 4. 가장 작은 건 1."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeRevegCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Greedy: process pastures 1, 2, …, N in order. For each, look at the colors already used by ALREADY-colored neighbors, and pick the SMALLEST color in {1,2,3,4} that's not in that set.",
        "그리디: 목초지를 1, 2, …, N 순서로 처리. 각 목초지에서, 이미 색칠된 이웃의 색을 확인하고 그 집합에 없는 {1,2,3,4} 중 가장 작은 색 선택."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getRevegSections(E),
    },
  ];
}
