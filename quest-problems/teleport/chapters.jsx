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
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Teleportation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2018 Bronze #1</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ travels from position ", "FJ 가 수직선의 위치 ")}
                  <b style={{ color: "#d97706" }}>a</b>
                  {t(E, " to position ", " 에서 ")}
                  <b style={{ color: "#d97706" }}>b</b>
                  {t(E, " on a number line.", " 로 가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There's a ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "two-way teleporter linking x and y", "x 와 y 를 잇는 양방향 텔레포터")}</b>
                  {t(E, " — using it costs ZERO walking distance.",
                        " 가 있어요 — 사용하면 걷는 거리 0.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
        "Direct: 10. Via 3->8: 3+2=5. Via 8->3: 8+7=15. Min is 5.",
        "직접: 10. 3->8 경유: 3+2=5. 8->3 경유: 8+7=15. 최소 5."),
      answer: 5,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTeleportCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Three possible routes from a to b: 1) direct walk |a − b|; 2) a → x via walking, then teleport to y, then walk to b: |a − x| + |y − b|; 3) the reverse: |a − y| + |x − b|. Take min.",
        "a 에서 b 까지 가능한 경로 3 개: 1) 직접 |a − b|; 2) a → x 걸어가서 텔레포트로 y, 그리고 b 로 |a − x| + |y − b|; 3) 반대 |a − y| + |x − b|. 최솟값."),
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
      sections: getTeleportSections(E),
    },
  ];
}
