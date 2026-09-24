import { C, t } from "@/components/quest/theme";
import { getCowEvolutionSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeEvolutionCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Could an evolutionary tree have produced these populations?",
        "이 집단들을 만들 수 있는 진화 트리가 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\uddec"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Cow Evolution</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2019 Bronze #3</div>
          </div>

          {/* \ud83c\udfaf Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              {"\ud83c\udfaf"} {t(E, "Mission", "\ubbf8\uc158")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output 'yes' if a valid evolutionary tree could have produced these populations, else 'no'.",
                "\uc8fc\uc5b4\uc9c4 \uc9d1\ub2e8\ub4e4\uc744 \ub9cc\ub4e4 \uc218 \uc788\ub294 \uc720\ud6a8\ud55c \uc9c4\ud654 \ud2b8\ub9ac\uac00 \uc874\uc7ac\ud558\uba74 'yes', \uc544\ub2c8\uba74 'no' \ucd9c\ub825.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
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
        "Two populations: {fly} and {swim}. No shared characteristics. Is a valid tree possible?", "{fly} 와 {swim}, 두 집단이면 트리를 만들 수 있을까요?"),
      question: t(E,
        "Populations {fly} and {swim}. Valid evolutionary tree?",
        "집단이 {fly} 와 {swim} 일 때 진화 트리를 만들 수 있을까요?"),
      options: [
        t(E, "Yes", "예"),
        t(E, "No", "아니오"),
      ],
      correct: 0,
      explain: t(E,
        "No characteristics cross (fly and swim never appear together). A valid tree exists.",
        "fly 와 swim 을 함께 가진 집단이 없어서 두 특성이 겹치지 않아요. 그래서 트리를 만들 수 있어요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Same {fly} and {swim} populations — your answer (1=yes, 0=no).",
        "아까 그 {fly} 와 {swim} 집단을 다시 볼게요."),
      question: t(E,
        "Populations {fly}, {swim}. Valid tree? (1=yes, 0=no)",
        "집단 {fly}, {swim} 로 트리를 만들 수 있을까요? (1=예, 0=아니오)"),
      hint: t(E,
        "Do these two populations share any characteristics?",
        "두 집단이 같이 가진 특성이 있나요?"),
      answer: 1,
    },
    // 1-4: Deep-audit sim — pick a pair, watch the three flags light up.
    {
      type: "sim",
      narr: t(E,
        "Pick a pair (A, B) and check whether all three flags ever show up.",
        "쌍 (A, B) 를 골라 세 가지가 다 나오는지 살펴봐요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeEvolutionCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in.
    {
      type: "progressive",
      narr: t(E,
        "If A-only, B-only, and both ever appear for a pair, no valid tree exists — check every pair.",
        "A 만 · B 만 · 둘 다 가 모두 나오는 쌍이 하나라도 있으면 트리를 못 만들어요.\n그래서 모든 특성 쌍을 하나씩 확인해요."),
      sections: getCowEvolutionSections(E),
    },
  ];
}
