import { C, t } from "@/components/quest/theme";
import { getTeleportSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "a, b, x, y = map(int, input().split())",
  "",
  "# Direct distance",
  "direct = abs(a - b)",
  "",
  "# Via teleporter: a->x, teleport to y, y->b",
  "via1 = abs(a - x) + abs(y - b)",
  "",
  "# Via teleporter: a->y, teleport to x, x->b",
  "via2 = abs(a - y) + abs(x - b)",
  "",
  "print(min(direct, via1, via2))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTeleportCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ wants to go from position a to position b on a number line. There's a two-way teleporter linking positions x and y — using it instantly moves you between x and y at no walking cost.\nPrint the minimum total walking distance.",
        "FJ 가 수직선의 위치 a 에서 b 로 가고 싶어요. 위치 x 와 y 를 잇는 양방향 텔레포터가 있어요 — 사용하면 걷는 거리 없이 즉시 x ↔ y 이동.\n걷는 거리의 최솟값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf00"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Teleportation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2018 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum total walking distance from a to b.",
                "a 에서 b 까지 걷는 거리의 최솟값을 출력.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ travels from position ", "FJ 가 수직선의 위치 ")}
                  <b style={{ color: "#d97706" }}>a</b>
                  {t(E, " to position ", " 에서 ")}
                  <b style={{ color: "#d97706" }}>b</b>
                  {t(E, " on a number line.", " 로 가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There's a ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "two-way teleporter linking x and y", "x 와 y 를 잇는 양방향 텔레포터")}</b>
                  {t(E, " — using it costs ZERO walking distance.",
                        " 가 있어요 — 사용하면 걷는 거리 0.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum total walking distance from a to b", "a 에서 b 까지 걷는 거리의 최솟값")}</b>
                  {t(E, ".", "을 출력해요.")}
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
        "a=0, b=10, teleporter 3<->8.\nDirect distance is 10.\nVia teleporter: 0->3 teleport->8->10 = 3+2=5.\nWhich is shorter?", "a=0, b=10, 텔레포터 3<->8. 직접 거리는 10. 텔레포터 경유: 0->3 텔레포트->8->10 = 3+2=5. 어느 게 짧아?"),
      question: t(E,
        "a=0, b=10, teleporter 3<->8. Min distance?",
        "a=0, b=10, 텔레포터 3<->8. 최소 거리는?"),
      options: [
        t(E, "10 (direct)", "10 (직접)"),
        t(E, "5 (via teleporter)", "5 (텔레포터 경유)"),
        t(E, "7", "7"),
      ],
      correct: 1,
      explain: t(E,
        "Via teleporter: |0-3| + |8-10| = 3 + 2 = 5, which is less than direct 10!",
        "텔레포터 경유: |0-3| + |8-10| = 3 + 2 = 5, 직접 10보다 작아!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "a=0, b=10, teleporter 3<->8. What's the minimum distance?", "a=0, b=10, 텔레포터 3<->8. 최소 거리는?"),
      question: t(E,
        "a=0, b=10, teleporter 3<->8. Minimum distance?",
        "a=0, b=10, 텔레포터 3<->8. 최소 거리?"),
      hint: t(E,
        "Compare three options: direct, teleport x→y, teleport y→x.",
        "세 경로 비교 — 직접, x→y 텔레포트, y→x 텔레포트."),
      answer: 5,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTeleportCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Three routes from a to b: 1) direct |a − b|, 2) |a − x| + |y − b|, 3) |a − y| + |x − b|. Take the min. Sections build it one piece at a time.",
        "a → b 경로 3 가지: 1) 직접 |a − b|, 2) |a − x| + |y − b|, 3) |a − y| + |x − b|. 최솟값. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getTeleportSections(E),
    },
  ];
}
