import { C, t } from "@/components/quest/theme";
import { getCowEvolutionSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "populations = []",
  "for _ in range(N):",
  "    K = int(input())",
  "    chars = set()",
  "    for _ in range(K):",
  "        chars.add(input().strip())",
  "    populations.append(chars)",
  "",
  "# Check if any two characteristics 'cross'",
  "# Chars A and B cross if there exist populations with:",
  "#   {A, not B}, {B, not A}, {A, B}",
  "# If any pair crosses, no valid tree exists",
  "",
  "all_chars = set()",
  "for p in populations:",
  "    all_chars |= p",
  "",
  "valid = True",
  "chars = list(all_chars)",
  "for i in range(len(chars)):",
  "    for j in range(i+1, len(chars)):",
  "        a, b = chars[i], chars[j]",
  "        has_a_only = has_b_only = has_both = False",
  "        for p in populations:",
  "            ha, hb = a in p, b in p",
  "            if ha and not hb: has_a_only = True",
  "            if hb and not ha: has_b_only = True",
  "            if ha and hb: has_both = True",
  "        if has_a_only and has_b_only and has_both:",
  "            valid = False",
  "            break",
  "    if not valid: break",
  "",
  "print('yes' if valid else 'no')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeEvolutionCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given N sub-populations each with a set of characteristics, determine if a valid evolutionary tree exists. A characteristic should evolve only once (not independently in separate branches).",
        "N개의 하위 집단이 각각 특성 집합을 가지고 있어. 유효한 진화 트리가 존재하는지 판별해. 특성은 한 번만 진화해야 해 (별도 가지에서 독립적으로 진화하면 안 돼)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\uddec"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Cow Evolution</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2019 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Two characteristics 'cross' if there exist populations with {A only}, {B only}, and {A and B}. If any pair crosses, the answer is 'no'.",
              "핵심: 두 특성이 '교차'하려면 {A만}, {B만}, {A와 B} 모두 가진 집단이 존재해야 해. 교차하는 쌍이 있으면 답은 'no'.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Two populations: {fly} and {swim}. No shared characteristics. Is a valid tree possible?",
        "두 집단: {fly}와 {swim}. 공유 특성 없음. 유효한 트리가 가능할까?"),
      question: t(E,
        "Populations {fly} and {swim}. Valid evolutionary tree?",
        "집단 {fly}와 {swim}. 유효한 진화 트리?"),
      options: [
        t(E, "Yes", "예"),
        t(E, "No", "아니오"),
      ],
      correct: 0,
      explain: t(E,
        "No characteristics cross (fly and swim never appear together). A valid tree exists.",
        "교차하는 특성이 없어 (fly와 swim이 함께 나타나지 않아). 유효한 트리가 존재해."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For 2 populations with no crossing characteristics, the answer is 'yes'. Encode: yes=1, no=0. What is the answer?",
        "교차 특성이 없는 2개 집단의 답은 'yes'야. yes=1, no=0으로 인코딩. 답은?"),
      question: t(E,
        "Populations {fly}, {swim}. Valid tree? (1=yes, 0=no)",
        "집단 {fly}, {swim}. 유효한 트리? (1=yes, 0=no)"),
      hint: t(E,
        "No crossing pair exists, so the answer is yes = 1.",
        "교차하는 쌍이 없으니 답은 yes = 1."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeEvolutionCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Check all pairs of characteristics against all populations. O(C^2 * N) where C = total characteristics.",
        "모든 특성 쌍을 모든 집단에 대해 확인. O(C^2 * N), C = 전체 특성 수."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>{"O(C\u00b2 \u00d7 N)"}</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each pair of characteristics (A, B), check if populations with {A only}, {B only}, and {A,B} all exist. If any such triple exists, output 'no'.",
              "각 특성 쌍 (A, B)에 대해 {A만}, {B만}, {A,B} 모두 가진 집단이 존재하는지 확인. 그런 쌍이 있으면 'no' 출력.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getCowEvolutionSections(E),
    },
  ];
}
