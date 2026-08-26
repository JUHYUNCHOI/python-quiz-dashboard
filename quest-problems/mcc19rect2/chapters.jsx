import { C, t } from "@/components/quest/theme";
import { getMcc19Rect2Sections, Mcc19Rect2AuditSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "# Given 3 corners of a rectangle, find the 4th",
  "x1, y1 = map(int, input().split())",
  "x2, y2 = map(int, input().split())",
  "x3, y3 = map(int, input().split())",
  "",
  "# XOR trick: x4 = x1 ^ x2 ^ x3, y4 = y1 ^ y2 ^ y3",
  "# Works because in a rectangle, each coordinate",
  "# appears exactly twice among the 4 corners",
  "x4 = x1 ^ x2 ^ x3",
  "y4 = y1 ^ y2 ^ y3",
  "",
  "print(x4, y4)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19Rect2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "An axis-aligned rectangle has 4 corners; 3 are given.\nPrint the COORDINATES of the 4th (missing) corner.",
        "축에 평행한 직사각형의 꼭짓점 4 개 중 3 개가 주어져요.\n누락된 4 번째 꼭짓점의 좌표를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>▭</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Rectangle 2</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P7</div>
          </div>

          {/* 🎯 Mission box — photoshoot25 표준 */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Given 3 corners of an axis-aligned rectangle, print the 4th (missing) corner.",
                "축에 평행한 직사각형의 꼭짓점 3 개가 주어졌을 때, 4 번째 (누락) 꼭짓점을 출력.")}
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
                  {t(E, "Given ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "3 corners of an axis-aligned rectangle", "축에 평행한 직사각형의 꼭짓점 3 개")}</b>
                  {t(E, " (sides parallel to the x and y axes).",
                        " 가 주어져요 (변이 x, y 축에 평행).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E,
                    "In a rectangle, each x-coordinate appears exactly twice among the 4 corners, and the same for y.",
                    "직사각형에서 각 x 좌표는 4 꼭짓점 중 정확히 2 번, y 좌표도 마찬가지.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "coordinates of the 4th (missing) corner", "누락된 4 번째 꼭짓점의 좌표")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: 입출력 형식 (photoshoot25 3-박스 스타일) — 선생님 2026-08-26 THIN 카드 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? 3 lines of (x y) coordinates. Print the 4th corner as x y.",
        "데이터는 어떻게 들어올까? (x y) 좌표 3 줄. 4 번째 꼭짓점을 x y 로 출력."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>x1 y1</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— 1st corner", "— 1 번째 꼭짓점")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>x2 y2</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— 2nd corner", "— 2 번째 꼭짓점")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>x3 y3</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— 3rd corner", "— 3 번째 꼭짓점")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: the 4th corner's coordinates x y (space-separated).",
                    "한 줄: 4 번째 꼭짓점의 좌표 x y (공백으로 구분).")}
            </div>
          </div>
          {/* Sample */}
          <div style={{ marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#065f46", marginBottom: 8 }}>🔍 {t(E, "Sample", "샘플")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>{t(E, "input", "입력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`0 0
2 0
0 3`}
                </div>
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>{`2 3`}</div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", fontStyle: "italic" }}>
              {t(E, "Why 2 3? — the sim below reveals it bit by bit.",
                    "왜 2 3 일까? — 아래 시뮬이 비트 단위로 밝혀요.")}
            </div>
          </div>
          {/* CONSTRAINTS */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>0 ≤ x, y ≤ 10⁹</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "The 3 corners uniquely determine a rectangle with sides parallel to axes.", "3 꼭짓점은 축에 평행한 직사각형을 유일하게 결정.")}</div>
            </div>
          </div>
        </div>),
    },

    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Corners: (0,0), (2,0), (0,3).\nThe rectangle has x-values {0,2} and y-values {0,3}.\nWhat's the 4th corner?", "꼭짓점: (0,0), (2,0), (0,3). 직사각형의 x값은 {0,2}, y값은 {0,3}. 4번째 꼭짓점은?"),
      question: t(E,
        "3 corners: (0,0), (2,0), (0,3). 4th corner?",
        "3개 꼭짓점: (0,0), (2,0), (0,3). 4번째 꼭짓점은?"),
      options: [
        t(E, "(2, 3)", "(2, 3)"),
        t(E, "(0, 0)", "(0, 0)"),
        t(E, "(3, 2)", "(3, 2)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! x4 = 0 XOR 2 XOR 0 = 2, y4 = 0 XOR 0 XOR 3 = 3. The 4th corner is (2, 3).",
        "맞아! x4 = 0 XOR 2 XOR 0 = 2, y4 = 0 XOR 0 XOR 3 = 3. 4번째 꼭짓점은 (2, 3)."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Corners: (0,0), (2,0), (0,3). What is the x-coordinate of the 4th corner?", "꼭짓점: (0,0), (2,0), (0,3). 4번째 꼭짓점의 x좌표는?"),
      question: t(E,
        "4th corner x-coordinate = ?",
        "4번째 꼭짓점의 x좌표 = ?"),
      hint: t(E,
        "x4 = 0 XOR 2 XOR 0 = 2.",
        "x4 = 0 XOR 2 XOR 0 = 2."),
      answer: 2,
    },
    // 1-4: Deep-audit sim (XOR bit inspector)
    {
      type: "reveal",
      narr: t(E,
        "Deep-audit sim: pick a preset, see the 3 known corners, then run XOR bit-by-bit on x and y to reveal the missing 4th corner.",
        "정밀 감사 시뮬: 프리셋을 골라 알려진 3 꼭짓점을 보고, x 와 y 각각 비트 단위 XOR 로 빠진 4 번째 꼭짓점을 공개해요."),
      content: <Mcc19Rect2AuditSim E={E} />,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19Rect2Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Each x coord appears exactly twice in a rectangle's 4 corners; same for y. XOR of all 4 x's = 0, so XOR of the 3 given x's gives the missing one.",
        "직사각형 4 꼭짓점에서 각 x 좌표는 정확히 2 번 등장; y 도 동일. 4 개 x 의 XOR = 0 이므로, 주어진 3 개 x 의 XOR 이 빠진 1 개."),
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
      sections: getMcc19Rect2Sections(E),
    },
  ];
}
