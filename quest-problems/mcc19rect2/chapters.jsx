import { C, t } from "@/components/quest/theme";
import { getMcc19Rect2Sections, Mcc19Rect2AuditSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "x1, y1 = map(int, input().split())",
  "x2, y2 = map(int, input().split())",
  "x3, y3 = map(int, input().split())",
  "",
  "# 세 x 좌표 중 둘은 같아요. 짝 없는 하나가 네 번째 점의 x 예요.",
  "if x1 == x2:",
  "    x4 = x3",
  "elif x1 == x3:",
  "    x4 = x2",
  "else:",
  "    x4 = x1",
  "",
  "# y 도 똑같이 해요.",
  "if y1 == y2:",
  "    y4 = y3",
  "elif y1 == y3:",
  "    y4 = y2",
  "else:",
  "    y4 = y1",
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
              {/* 2026-09-09: 여기 불릿이 "각 x 좌표는 4 꼭짓점 중 정확히 2 번 나온다" 는
                  **핵심 관찰**을 도입에서 통째로 말해버렸다. 그게 이 문제의 전부다.
                  6쪽(코드)에서 같은 문장을 또 반복할 뿐, 학생이 스스로 눈치챌 자리가 없었다. */}
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
                    "왜 2 3 일까? — 아래 시뮬이 하나씩 짚어줘요.")}
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
        "Corners: (5,1), (5,4), (2,1). Where must the 4th one be?",
        "꼭짓점: (5,1), (5,4), (2,1). 4 번째는 어디에 있어야 할까요?"),
      question: t(E,
        "3 corners: (5,1), (5,4), (2,1). 4th corner?",
        "3개 꼭짓점: (5,1), (5,4), (2,1). 4번째 꼭짓점은?"),
      options: [
        t(E, "(2, 4)", "(2, 4)"),
        t(E, "(5, 4)", "(5, 4)"),
        t(E, "(4, 2)", "(4, 2)"),
      ],
      correct: 0,
      explain: t(E,
        "The x values are 5, 5, 2 — the 5 appears twice, so the lonely 2 is the missing x. The y values are 1, 4, 1 — so the missing y is 4. The 4th corner is (2, 4).",
        "x 값은 5, 5, 2 예요 — 5 가 두 번 나오니 짝이 없는 2 가 빠진 x 예요.\ny 값은 1, 4, 1 이니 빠진 y 는 4 고요.\n4 번째 꼭짓점은 (2, 4) 예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Corners: (7,2), (3,2), (3,6). What is the x-coordinate of the 4th corner?", "꼭짓점: (7,2), (3,2), (3,6). 4번째 꼭짓점의 x좌표는?"),
      question: t(E,
        "4th corner x-coordinate = ?",
        "4번째 꼭짓점의 x좌표 = ?"),
      /* 2026-09-09: 힌트에 "x4 = 0 XOR 2 XOR 0 = 2" 라고 **답이 그대로** 있었다.
         NumInput 은 힌트를 버튼 뒤가 아니라 입력칸 밑에 **항상** 그린다
         (components/quest/shared.tsx). 그러니 힌트에 답 자체를 넣으면 안 된다. */
      hint: t(E,
        "Three x values are given. Which one has no partner?",
        "x 값이 셋 있어요. 그중 짝 없는 값은 무엇일까요?"),
      answer: 7,
    },
    // 1-4: 숨은 꼭짓점 찾기 시뮬
    {
      type: "reveal",
      narr: t(E,
        "Pick a rectangle, look at the three corners you know, and find the fourth.",
        "직사각형을 골라 아는 세 꼭짓점을 보고, 네 번째를 찾아봐요."),
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
        "Three x values: two of them pair up, and the one left without a partner is the answer. Same for y.",
        "x 값 셋 중 짝 없는 하나가 답이에요. y 도 똑같고요."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc19Rect2Sections(E),
    },
  ];
}
