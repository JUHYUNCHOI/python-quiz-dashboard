import { C, t } from "@/components/quest/theme";
import { getFamilyTreeSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFamilyTreeCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ tracks cow mother-child relationships. Given two specific cows X and Y, classify their relationship from the family tree:\nmother / grand-mother / great-...-grand-mother (and the reverse: daughter / grand-daughter / great-...-grand-daughter), siblings, cousins, or unrelated.",
        "엄마와 자식 관계가 죽 이어진 가계도가 있어요.\n소 두 마리 X 와 Y 가 주어지면 둘이 어떤 사이인지 알아내요.\n엄마·할머니·딸·손녀·자매·사촌 중 하나이거나, 아예 남남일 수도 있어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf33"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Family Tree</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2018 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the family relationship between cows X and Y from the tree.",
                "가계도를 보고 소 X 와 Y 가 어떤 사이인지 출력해요.")}
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
                  {t(E, "FJ has a list of ", "FJ 에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "mother → child relationships", "엄마 → 자식 관계 목록")}</b>
                  {t(E, " among cows (a forest of family trees).",
                        " 이 있어요 (가계도들의 숲).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given two cows ", "두 소 ")}
                  <b style={{ color: "#7c3aed" }}>X, Y</b>
                  {t(E, " — figure out their family relationship.",
                        " 가 주어져요 — 둘의 가계 관계를 분류해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print one of: ", "다음 중 하나를 출력해요 — ")}
                  <b style={{ color: "#15803d" }}>{t(E, "(great-)mother / (great-)daughter / siblings / cousins / NOT_RELATED", "(great-)엄마 / (great-)딸 / 자매 / 사촌 / NOT_RELATED")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sim — pick two cows, watch LCA + classification live
    {
      type: "sim",
      narr: t(E,
        "Tiny family tree. Pick X and Y — both walk up to their first common ancestor (LCA). Depths from each side decide the label: mother / grand-mother / siblings / cousins / unrelated. Try Tilly vs Rosie, Lola vs Mabel, Bessie vs Mildred, then Tilly vs Daisy.",
        "X 와 Y 를 고르면 둘 다 위로 올라가 처음 만나는 공통 조상을 찾아요.\n거기까지 몇 칸 올라갔는지로 사이가 정해져요.\nTilly 와 Rosie 부터 차례로 눌러 봐요."),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If A is B's mother, how many generations are between them?", "A 가 B 의 엄마라면 둘은 몇 세대 차이일까요?"),
      question: t(E,
        "A is B's mother. How many generations between them?",
        "A 가 B 의 엄마예요. 둘은 몇 세대 차이일까요?"),
      options: [
        t(E, "0", "0"),
        t(E, "1", "1"),
        t(E, "2", "2"),
      ],
      correct: 1,
      explain: t(E,
        "Mother and child are exactly 1 generation apart!",
        "엄마와 자식은 딱 한 세대 차이예요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "How many generations between a mother and her child?", "엄마와 자식은 몇 세대 차이일까요?"),
      question: t(E,
        "Generations between mother and child?",
        "엄마와 자식은 몇 세대 차이인가요?"),
      hint: t(E,
        "Re-read the relationship — how many family levels separate parent and child?",
        "관계를 다시 읽어 봐요. 엄마와 자식은 가계도에서 몇 칸 떨어져 있나요?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFamilyTreeCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Build A's ancestor chain with depths. Walk up from B — first ancestor that's also in A's chain is the LCA. Compare depths to decide: ancestor / descendant / siblings / cousins / unrelated. Sections build it one piece at a time.",
        "먼저 A 의 조상을 위로 죽 적어 둬요. 그다음 B 에서 위로 올라가다가\n처음 만나는 A 의 조상이 둘의 공통 조상이에요.\n거기까지 몇 칸씩 올라갔는지를 견줘서 사이를 정해요."),
      sections: getFamilyTreeSections(E),
    },
  ];
}
