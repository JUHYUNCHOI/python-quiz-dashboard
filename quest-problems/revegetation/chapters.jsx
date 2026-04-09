import { C, t } from "@/components/quest/theme";

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
        "N pastures need grass from 4 types. Some cow pairs need different grass on their favorite pastures. Find the lexicographically smallest valid coloring.",
        "N개의 목초지에 4종류 잔디 중 하나를 심어야 해. 일부 소 쌍은 좋아하는 목초지의 잔디가 달라야 해. 사전순으로 가장 작은 유효 배색을 찾아!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf31"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>The Great Revegetation</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2019 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Greedy graph coloring. Process pastures 1 to N, assign the smallest color (1-4) not used by constrained neighbors.",
              "핵심: 그리디 그래프 색칠. 목초지 1부터 N까지 처리하며, 제약된 이웃이 쓰지 않는 가장 작은 색(1-4)을 배정.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "With 4 colors available and no constraints on pasture 1, what color does it get?",
        "4가지 색이 있고 목초지 1에 제약이 없으면 어떤 색을 받을까?"),
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
        "그리디는 가장 작은 사용 가능한 색을 배정해. 제약이 없으면 1이야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "What color does pasture 1 get when there are no constraints?",
        "제약이 없을 때 목초지 1의 색은?"),
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
export function makeRevegCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Greedy coloring: for each pasture, check its constraints. O(N * M) in the worst case.",
        "그리디 색칠: 각 목초지의 제약을 확인. 최악의 경우 O(N * M)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>{"O(N \u00d7 M)"}</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Process pastures in order 1..N. For each, find colors used by already-colored neighbors, pick the smallest unused. Since there are 4 colors and the graph is sparse, this always works.",
              "목초지를 1..N 순서로 처리. 이미 색칠된 이웃의 색을 확인하고 안 쓴 가장 작은 색 선택. 4색이고 그래프가 희소해서 항상 가능.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the greedy coloring solution!",
        "그리디 색칠 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
