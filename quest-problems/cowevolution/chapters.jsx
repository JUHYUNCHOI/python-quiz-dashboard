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
        "There are N cow sub-populations, each with a set of characteristics. We want to know whether a valid evolutionary tree could have produced these populations — meaning each characteristic appeared exactly ONCE on the tree (every population that has it descends from that single appearance).\nPrint 'yes' if such a tree could exist, else 'no'.",
        "N개의 소 하위 집단이 있고, 각 집단이 가진 특성들이 주어져요. 이 집단들을 만들 수 있는 진화 트리가 있을까요?\n조건은 이래요: 각 특성은 트리 위에서 딱 한 노드에서만 나타나야 해요. 그리고 그 특성을 가진 모든 집단은 그 노드의 후손이어야 해요. 가능하면 'yes', 불가능하면 'no'를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\uddec"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Cow Evolution</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2019 Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N sub-populations of cows", "N개의 소 하위 집단")}</b>
                  {t(E, ", each with a known ", "이 있고, 각자 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "set of characteristics", "특성 집합")}</b>
                  {t(E, ".", " 을 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "evolutionary tree", "진화 트리")}</b>
                  {t(E, " is valid if each characteristic appears at exactly ONE node — all populations that have it must descend from that node.",
                        "가 유효하려면 각 특성이 트리에서 정확히 한 노드에만 등장해야 해요. 그리고 그 특성을 가진 모든 집단이 그 노드의 후손이어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "'yes' if a valid tree exists, else 'no'", "유효한 트리가 가능하면 'yes', 아니면 'no'")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "Two populations: {fly} and {swim}. No shared characteristics. Is a valid tree possible?", "두 집단: {fly}와 {swim}. 공유 특성 없음. 유효한 트리가 가능할까?"),
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
        "교차하는 특성이 없어 (fly와 swim이 함께 나타나지 않아). 유효한 트리가 존재해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For 2 populations with no crossing characteristics, the answer is 'yes'.\nEncode: yes=1, no=0.\nWhat is the answer?", "교차 특성이 없는 2개 집단의 답은 'yes'야. yes=1, no=0으로 인코딩. 답은?"),
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
        "Two characteristics A, B 'cross' (preventing a valid tree) if some population has just {A}, another has just {B}, and another has both {A, B}. Brute-force check every pair of characteristics.",
        "두 특성 A, B 가 '교차' 하면 (유효한 트리 불가) — 어떤 집단은 {A 만}, 어떤 집단은 {B 만}, 어떤 집단은 {A, B} 둘 다. 모든 특성 쌍을 완전 탐색."),
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
      sections: getCowEvolutionSections(E),
    },
  ];
}
