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
        "Farmer John wants to go from position a to position b on a number line.\nThere's a teleporter between positions x and y.\nFind the minimum distance!", "농부 존이 수직선에서 위치 a에서 b로 가려 해. 위치 x와 y 사이에 텔레포터가 있어. 최소 거리를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf00"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Teleportation</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2018 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Compare 3 options: direct abs(a-b), via teleporter a->x then y->b, or a->y then x->b.\nTake the minimum!",
              "핵심: 3가지 비교: 직접 abs(a-b),\n텔레포터 경유 a->x에서 y->b,\n또는 a->y에서 x->b. 최솟값 선택!")}
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
        "Just compute 3 values and take the min. O(1) time!", "3개 값 계산하고 최솟값 선택. O(1) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26A1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Three paths: direct, a->x teleport y->b, a->y teleport x->b.\nJust compare absolute differences!",
              "세 경로: 직접, a->x 텔레포트 y->b, a->y 텔레포트 x->b.\n절댓값 차이만 비교!")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getTeleportSections(E),
    },
  ];
}
