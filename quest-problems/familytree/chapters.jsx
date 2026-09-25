import { C, t } from "@/components/quest/theme";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFamilyTreeCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A family tree links mothers to children. Given cows X and Y, find their relationship.",
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
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=833) — 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "This one reads from a file, not the keyboard. N and the two names come first, then N mother-child lines.",
        "이 문제는 파일에서 읽어요. N, 두 이름, 그리고 엄마-자식 줄이 와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 8 }}>
            {t(E, "📁 This problem uses FILE input/output: read from family.in, write to family.out.",
                "📁 이 문제는 파일로 입출력해요: family.in 을 읽고, family.out 에 써요.")}
          </div>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT (family.in)", "입력 (family.in)")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N X Y</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of mother-child lines, then the two cows to compare", "— 엄마-자식 줄의 개수, 그다음 관계를 물어볼 두 소 이름")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>{t(E, "mom child", "엄마 자식")}</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— mom is the mother of child", "— 엄마가 자식의 어머니라는 뜻")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT (family.out)", "출력 (family.out)")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line describing the relationship between X and Y.",
                  "X 와 Y 의 관계를 한 줄로 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "each cow name is at most 10 uppercase letters (A..Z)", "소 이름은 대문자 A~Z 로만, 최대 10글자")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sim — pick two cows, watch LCA + classification live
    {
      type: "sim",
      narr: t(E,
        "Pick X and Y — both climb to their first shared ancestor. How far up decides the relationship.",
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
    // 2-1: CodeWalk — 선생님 2026-07-14: "앞으로 코드는 모두 이런식으로"
    {
      type: "familytree-codewalk",
      narr: t(E,
        "The full solution, start to finish — toggle Python ↔ C++ via the header.",
        "전체 풀이를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
  ];
}
