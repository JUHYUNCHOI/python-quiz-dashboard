import { C, t } from "@/components/quest/theme";
import { getBillboardSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "def rect_area(x1, y1, x2, y2):",
  "    return max(0, x2 - x1) * max(0, y2 - y1)",
  "",
  "def overlap(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2):",
  "    ox1 = max(ax1, bx1)",
  "    oy1 = max(ay1, by1)",
  "    ox2 = min(ax2, bx2)",
  "    oy2 = min(ay2, by2)",
  "    return rect_area(ox1, oy1, ox2, oy2)",
  "",
  "# Billboard 1",
  "x1, y1, x2, y2 = map(int, input().split())",
  "# Billboard 2",
  "x3, y3, x4, y4 = map(int, input().split())",
  "# Truck",
  "x5, y5, x6, y6 = map(int, input().split())",
  "",
  "area1 = rect_area(x1, y1, x2, y2)",
  "area2 = rect_area(x3, y3, x4, y4)",
  "",
  "ov1 = overlap(x1, y1, x2, y2, x5, y5, x6, y6)",
  "ov2 = overlap(x3, y3, x4, y4, x5, y5, x6, y6)",
  "",
  "print(area1 - ov1 + area2 - ov2)",
];

/* Helper: draw a rectangle on a coordinate grid */
function RectBox({ x1, y1, x2, y2, color, label, opacity = 0.3 }) {
  const w = x2 - x1, h = y2 - y1;
  return (
    <div style={{ position: "absolute", left: x1 * 30, bottom: y1 * 30, width: w * 30, height: h * 30,
      background: color, opacity, border: `2px solid ${color}`, borderRadius: 4,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, fontWeight: 800, color: "#fff",
    }}>{label}</div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (7 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBillboardCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Two billboards stand along a road, but a truck is parked in front — blocking parts of them!\nHow much billboard area is still visible?\n🪧", "도로에 광고판 두 개가 서 있는데, 트럭이 앞에 주차해서 일부를 가려! 아직 보이는 광고판 면적은 얼마일까? 🪧"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🪧</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Blocked Billboard</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2017 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, textAlign: "left" , whiteSpace: "pre-line" }}>
            {t(E,
              "Given: Two rectangular billboards + one rectangular truck.\nAll rectangles have sides parallel to axes. Find: Total visible billboard area.",
              "주어진 것: 직사각형 광고판 2개 + 직사각형 트럭 1개.\n모두 축에 평행.\n구할 것: 보이는 총 광고판 면적.")}
          </div>
        </div>),
    },

    // 1-2: What is a rectangle on a coordinate plane?
    {
      type: "reveal",
      narr: t(E,
        "Each rectangle is defined by two corners: lower-left (x1, y1) and upper-right (x2, y2).\nThe area is width × height = (x2-x1) × (y2-y1)!", "각 직사각형은 두 꼭짓점으로 정의돼: 왼쪽 아래 (x1, y1)과 오른쪽 위 (x2, y2). 면적 = 가로 × 세로 = (x2-x1) × (y2-y1)!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
              {t(E, "📐 Rectangle = Two Corners", "📐 직사각형 = 두 꼭짓점")}
            </div>
            {/* Visual rectangle with labeled corners */}
            <div style={{ position: "relative", height: 150, margin: "0 auto", width: 200, background: "#fef3c7", border: "2px solid #f59e0b", borderRadius: 8 }}>
              <div style={{ position: "absolute", left: -4, bottom: -20, fontSize: 11, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>
                (1, 1)
              </div>
              <div style={{ position: "absolute", right: -4, top: -20, fontSize: 11, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>
                (5, 4)
              </div>
              {/* Width label */}
              <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)", fontSize: 12, fontWeight: 800, color: C.accent }}>
                {t(E, "width = 5-1 = 4", "가로 = 5-1 = 4")}
              </div>
              {/* Height label */}
              <div style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", fontSize: 12, fontWeight: 800, color: C.accent }}>
                {t(E, "height = 4-1 = 3", "세로 = 4-1 = 3")}
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 36, fontSize: 16, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>
              {t(E, "Area = 4 × 3 = 12", "면적 = 4 × 3 = 12")}
            </div>
          </div>
        </div>),
    },

    // 1-3: Quiz — area calculation
    {
      type: "quiz",
      narr: t(E,
        "Let's practice!\nA rectangle has lower-left corner (2, 3) and upper-right corner (7, 6).\nWhat is its area?", "연습해보자! 직사각형의 왼쪽 아래가 (2, 3)이고 오른쪽 위가 (7, 6)이야. 면적은?"),
      question: t(E,
        "Rectangle (2,3) to (7,6). Width = 7-2 = 5, Height = 6-3 = 3. Area = ?",
        "직사각형 (2,3)에서 (7,6). 가로 = 7-2 = 5, 세로 = 6-3 = 3. 면적 = ?"),
      options: ["15", "12", "20", "10"],
      correct: 0,
      explain: t(E,
        "Width = 5, Height = 3. Area = 5 × 3 = 15. ✅",
        "가로 = 5, 세로 = 3. 면적 = 5 × 3 = 15. ✅"),
    },

    // 1-4: The problem scenario — visual with 3 rectangles
    {
      type: "reveal",
      narr: t(E,
        "Now imagine: Billboard 1 (blue), Billboard 2 (green), and a Truck (red) blocking them.\nThe truck covers part of each billboard.\nWe need the visible area!", "이제 상상해봐: 광고판 1 (파란색), 광고판 2 (초록색), 그리고 트럭 (빨간색)이 가리고 있어. 트럭이 각 광고판의 일부를 덮어. 보이는 면적이 필요해!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f8fafc", border: "2px solid #e2e8f0", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 10, textAlign: "center" }}>
              {t(E, "Example Scenario", "예시 상황")}
            </div>
            {/* Three rectangles visualized */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: t(E, "Billboard 1", "광고판 1"), w: 4, h: 3, color: "#3b82f6", bg: "#dbeafe" },
                { label: t(E, "Truck", "트럭"), w: 3, h: 5, color: "#ef4444", bg: "#fee2e2" },
                { label: t(E, "Billboard 2", "광고판 2"), w: 3, h: 2, color: "#22c55e", bg: "#dcfce7" },
              ].map((r, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: r.w * 25, height: r.h * 25, background: r.bg, border: `2.5px solid ${r.color}`, borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: r.color }}>
                    {r.w}×{r.h}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: r.color, marginTop: 4 }}>{r.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, textAlign: "center", fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {t(E,
                "Billboard 1: area = 4×3 = 12\nBillboard 2: area = 3×2 = 6\nTotal without truck = 18",
                "광고판 1: 면적 = 4×3 = 12\n광고판 2: 면적 = 3×2 = 6\n트럭 없이 합계 = 18")}
            </div>
          </div>
        </div>),
    },

    // 1-5: Key insight — subtract overlap
    {
      type: "reveal",
      narr: t(E,
        "The key formula: Visible = (Billboard1 area - overlap with truck) + (Billboard2 area - overlap with truck).\nWe compute each overlap separately!", "핵심 공식: 보이는 면적 = (광고판1 면적 - 트럭과 겹침) + (광고판2 면적 - 트럭과 겹침). 각 겹침을 따로 계산해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.ok, marginBottom: 8 }}>
              {t(E, "💡 Key Formula", "💡 핵심 공식")}
            </div>
            <div style={{ fontSize: 15, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 2 }}>
              visible = (A₁ - O₁) + (A₂ - O₂)
            </div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 8, lineHeight: 1.6 }}>
              A₁ = {t(E, "billboard 1 area", "광고판1 면적")}<br/>
              O₁ = {t(E, "overlap of billboard 1 with truck", "광고판1과 트럭의 겹침")}<br/>
              A₂ = {t(E, "billboard 2 area", "광고판2 면적")}<br/>
              O₂ = {t(E, "overlap of billboard 2 with truck", "광고판2과 트럭의 겹침")}
            </div>
          </div>
        </div>),
    },

    // 1-6: Quiz — apply formula
    {
      type: "quiz",
      narr: t(E,
        "Billboard 1 area = 20, overlap with truck = 6.\nBillboard 2 area = 15, overlap with truck = 0 (no overlap).\nWhat's the total visible area?", "광고판1 면적 = 20, 트럭과 겹침 = 6. 광고판2 면적 = 15, 트럭과 겹침 = 0 (겹침 없음). 총 보이는 면적은?"),
      question: t(E,
        "A₁=20, O₁=6, A₂=15, O₂=0. Visible = ?",
        "A₁=20, O₁=6, A₂=15, O₂=0. 보이는 면적 = ?"),
      options: ["29", "35", "14", "21"],
      correct: 0,
      explain: t(E,
        "(20-6) + (15-0) = 14 + 15 = 29 ✅",
        "(20-6) + (15-0) = 14 + 15 = 29 ✅"),
    },

    // 1-7: Input — calculate area
    {
      type: "input",
      narr: t(E,
        "Billboard 1: (1,2) to (5,5) → area = 4×3 = 12.\nBillboard 2: (8,1) to (10,4) → area = 2×3 = 6.\nTruck overlaps 4 with billboard 1, 0 with billboard 2.\nVisible?", "광고판1: (1,2)에서 (5,5) → 면적 = 4×3 = 12.\n광고판2: (8,1)에서 (10,4) → 면적 = 2×3 = 6.\n트럭이 광고판1과 4만큼 겹침, 광고판2와 0.\n보이는 면적?"),
      question: t(E, "12 - 4 + 6 - 0 = ?", "12 - 4 + 6 - 0 = ?"),
      hint: t(E, "8 + 6 = ?", "8 + 6 = ?"),
      answer: 14,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 겹침 계산법 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBillboardCh2(E) {
  return [
    // 2-1: How to compute overlap
    {
      type: "reveal",
      narr: t(E,
        "The hardest part: how do we compute the overlap area of two rectangles?\nLet's learn the overlap formula step by step!", "가장 어려운 부분: 두 직사각형의 겹침 면적을 어떻게 구할까? 겹침 공식을 단계별로 배우자!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.accent, marginBottom: 10 }}>
              {t(E, "🔍 Rectangle Overlap", "🔍 직사각형 겹침")}
            </div>
            {/* Two overlapping rectangles */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <div style={{ position: "relative", width: 220, height: 120 }}>
                {/* Rect A */}
                <div style={{ position: "absolute", left: 0, top: 20, width: 140, height: 80, background: "rgba(59,130,246,0.2)", border: "2px solid #3b82f6", borderRadius: 4 }}>
                  <span style={{ position: "absolute", top: 2, left: 4, fontSize: 10, fontWeight: 800, color: "#3b82f6" }}>A</span>
                </div>
                {/* Rect B */}
                <div style={{ position: "absolute", left: 80, top: 0, width: 140, height: 80, background: "rgba(239,68,68,0.2)", border: "2px solid #ef4444", borderRadius: 4 }}>
                  <span style={{ position: "absolute", top: 2, right: 4, fontSize: 10, fontWeight: 800, color: "#ef4444" }}>B</span>
                </div>
                {/* Overlap area */}
                <div style={{ position: "absolute", left: 80, top: 20, width: 60, height: 60, background: "rgba(168,85,247,0.3)", border: "2px dashed #7c3aed", borderRadius: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 900, color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    {t(E, "overlap!", "겹침!")}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {t(E,
                "The overlap is itself a rectangle! Its corners are:\n• left = max(A.left, B.left)\n• bottom = max(A.bottom, B.bottom)\n• right = min(A.right, B.right)\n• top = min(A.top, B.top)",
                "겹침도 직사각형이야! 꼭짓점은:\n• 왼쪽 = max(A.왼쪽, B.왼쪽)\n• 아래 = max(A.아래, B.아래)\n• 오른쪽 = min(A.오른쪽, B.오른쪽)\n• 위 = min(A.위, B.위)")}
            </div>
          </div>
        </div>),
    },

    // 2-2: Concrete example trace
    {
      type: "reveal",
      narr: t(E,
        "Let's trace!\nA = (1,1)→(6,4), B = (3,2)→(8,5).\nOverlap left = max(1,3) = 3, right = min(6,8) = 6, bottom = max(1,2) = 2, top = min(4,5) = 4.", "추적해보자!\nA = (1,1)→(6,4), B = (3,2)→(8,5).\n겹침 왼쪽 = max(1,3) = 3, 오른쪽 = min(6,8) = 6, 아래 = max(1,2) = 2, 위 = min(4,5) = 4."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { step: t(E, "A", "A"), desc: "(1,1) → (6,4)", color: "#3b82f6" },
              { step: t(E, "B", "B"), desc: "(3,2) → (8,5)", color: "#ef4444" },
              { step: t(E, "left", "왼쪽"), desc: "max(1, 3) = 3", color: "#7c3aed" },
              { step: t(E, "bottom", "아래"), desc: "max(1, 2) = 2", color: "#7c3aed" },
              { step: t(E, "right", "오른쪽"), desc: "min(6, 8) = 6", color: "#7c3aed" },
              { step: t(E, "top", "위"), desc: "min(4, 5) = 4", color: "#7c3aed" },
            ].map((s, i) => (
              <div key={i} style={{
                background: i < 2 ? "#f8fafc" : "#ede9fe", border: `1.5px solid ${i < 2 ? C.border : "#c4b5fd"}`,
                borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between",
                fontSize: 13, fontFamily: "'JetBrains Mono',monospace",
              }}>
                <span style={{ fontWeight: 800, color: s.color }}>{s.step}</span>
                <span style={{ color: C.text }}>{s.desc}</span>
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 15, fontWeight: 900, color: "#7c3aed", fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, "Overlap = (3,2)→(6,4) = 3×2 = 6", "겹침 = (3,2)→(6,4) = 3×2 = 6")}
            </div>
          </div>
        </div>),
    },

    // 2-3: Quiz — what if no overlap?
    {
      type: "quiz",
      narr: t(E,
        "What if the rectangles don't overlap at all?\nThen max(left) > min(right) or max(bottom) > min(top).\nThe formula gives a negative width or height!", "직사각형이 아예 안 겹치면? max(왼쪽) > min(오른쪽) 또는 max(아래) > min(위). 공식이 음수 가로 또는 세로를 줘!"),
      question: t(E,
        "A = (0,0)→(2,2), B = (5,5)→(7,7). Overlap right = min(2,7) = 2, left = max(0,5) = 5. Width = 2-5 = -3. What should the overlap area be?",
        "A = (0,0)→(2,2), B = (5,5)→(7,7). 겹침 오른쪽 = min(2,7) = 2, 왼쪽 = max(0,5) = 5. 가로 = 2-5 = -3. 겹침 면적은?"),
      options: [
        t(E, "0 (no overlap)", "0 (겹침 없음)"),
        t(E, "-3 (negative)", "-3 (음수)"),
        t(E, "3 (absolute value)", "3 (절댓값)"),
      ],
      correct: 0,
      explain: t(E,
        "We use max(0, width) × max(0, height). Negative means no overlap → area = 0! That's why the formula has max(0, ...) ✅",
        "max(0, 가로) × max(0, 세로)를 써. 음수면 겹침 없음 → 면적 = 0! 그래서 공식에 max(0, ...)가 있어 ✅"),
    },

    // 2-4: Input — compute overlap
    {
      type: "input",
      narr: t(E,
        "Your turn!\nA = (2,1)→(6,5), B = (4,3)→(8,7).\nOverlap: left=max(2,4)=4, right=min(6,8)=6, bottom=max(1,3)=3, top=min(5,7)=5.\nWidth=2, Height=2.\nOverlap area?", "네 차례!\nA = (2,1)→(6,5), B = (4,3)→(8,7).\n겹침: 왼쪽=max(2,4)=4, 오른쪽=min(6,8)=6, 아래=max(1,3)=3, 위=min(5,7)=5.\n가로=2, 세로=2.\n겹침 면적?"),
      question: t(E, "Overlap width=2, height=2. Area?", "겹침 가로=2, 세로=2. 면적?"),
      answer: 4,
    },

    // 2-5: Full example
    {
      type: "input",
      narr: t(E,
        "Complete problem!\nBillboard1 (1,2)→(4,5), area=9.\nBillboard2 (6,0)→(10,4), area=16.\nTruck (3,1)→(7,3).\nOverlap1 = (3,2)→(4,3) = 1×1 = 1.\nOverlap2 = (6,1)→(7,3) = 1×2 = 2.\nVisible?", "완전한 문제!\n광고판1 (1,2)→(4,5), 면적=9.\n광고판2 (6,0)→(10,4), 면적=16.\n트럭 (3,1)→(7,3).\n겹침1 = (3,2)→(4,3) = 1×1 = 1.\n겹침2 = (6,1)→(7,3) = 1×2 = 2.\n보이는 면적?"),
      question: t(E, "(9-1) + (16-2) = ?", "(9-1) + (16-2) = ?"),
      hint: t(E, "8 + 14 = ?", "8 + 14 = ?"),
      answer: 22,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBillboardCh3(E, lang = "py") {
  return [
    // 3-1: Step 1 — area function
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code step by step!\nFirst, we need a function to compute rectangle area.\nRemember: max(0, ...) handles the no-overlap case!", "코드를 단계별로 만들자! 먼저 직사각형 면적을 구하는 함수가 필요해. max(0, ...)가 겹침 없는 경우를 처리해!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ color: "#c084fc" }}>def</div>
            <div style={{ color: "#e2e8f0" }}> rect_area(x1, y1, x2, y2):</div>
            <div style={{ color: "#e2e8f0" }}>    <span style={{ color: "#c084fc" }}>return</span> max(0, x2-x1) * max(0, y2-y1)</div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "max(0, ...) ensures: if width or height is negative (no overlap), area = 0.",
              "max(0, ...)의 의미: 가로나 세로가 음수면 (겹침 없음) 면적 = 0.")}
          </div>
        </div>),
    },

    // 3-2: Step 2 — overlap function
    {
      type: "reveal",
      narr: t(E,
        "Next: the overlap function!\nIt finds the intersection rectangle using max/min, then calls rect_area.", "다음: 겹침 함수! max/min으로 교집합 직사각형을 찾고, rect_area를 호출해."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.8 }}>
            <div style={{ color: "#c084fc" }}>def <span style={{ color: "#e2e8f0" }}>overlap</span>(ax1,ay1,ax2,ay2, bx1,by1,bx2,by2):</div>
            <div style={{ color: "#6b7280", fontStyle: "italic" }}>    # Intersection rectangle</div>
            <div style={{ color: "#e2e8f0" }}>    ox1 = <span style={{ color: "#fbbf24" }}>max</span>(ax1, bx1)  <span style={{ color: "#6b7280" }}># left edge</span></div>
            <div style={{ color: "#e2e8f0" }}>    oy1 = <span style={{ color: "#fbbf24" }}>max</span>(ay1, by1)  <span style={{ color: "#6b7280" }}># bottom edge</span></div>
            <div style={{ color: "#e2e8f0" }}>    ox2 = <span style={{ color: "#fbbf24" }}>min</span>(ax2, bx2)  <span style={{ color: "#6b7280" }}># right edge</span></div>
            <div style={{ color: "#e2e8f0" }}>    oy2 = <span style={{ color: "#fbbf24" }}>min</span>(ay2, by2)  <span style={{ color: "#6b7280" }}># top edge</span></div>
            <div style={{ color: "#c084fc" }}>    return <span style={{ color: "#e2e8f0" }}>rect_area(ox1, oy1, ox2, oy2)</span></div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.ok, fontWeight: 700, textAlign: "center" }}>
            {t(E, "max() for left/bottom, min() for right/top!", "왼쪽/아래는 max(), 오른쪽/위는 min()!")}
          </div>
        </div>),
    },

    // 3-3: Quiz — why max for left?
    {
      type: "quiz",
      narr: t(E,
        "Why do we use max() for the left edge of overlap?\nBecause the overlap starts where BOTH rectangles have started — the later (larger) left edge!", "왜 겹침의 왼쪽에 max()를 쓸까? 겹침은 두 직사각형이 모두 시작한 곳 — 더 늦은 (큰) 왼쪽 끝에서 시작하니까!"),
      question: t(E,
        "Rectangle A starts at x=2, Rectangle B starts at x=5. Where does the overlap start?",
        "직사각형 A가 x=2에서 시작, B가 x=5에서 시작. 겹침은 어디서 시작?"),
      options: [
        "x = 5 (max)",
        "x = 2 (min)",
        "x = 3.5 (average)",
      ],
      correct: 0,
      explain: t(E,
        "The overlap can only exist where BOTH rectangles exist. A hasn't started until x=2, B hasn't started until x=5. So overlap starts at x=5 (the later one = max). ✅",
        "겹침은 두 직사각형이 모두 존재하는 곳에서만 가능해. A는 x=2부터, B는 x=5부터. 겹침은 x=5 (더 늦은 쪽 = max)에서 시작. ✅"),
    },

    // 3-4: Step 3 — main code
    {
      type: "reveal",
      narr: t(E,
        "Finally: read the three rectangles, compute areas and overlaps, print the answer!", "마지막: 세 직사각형을 읽고, 면적과 겹침을 계산하고, 답을 출력!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.8 }}>
            <div style={{ color: "#6b7280" }}># Read 3 rectangles</div>
            <div style={{ color: "#e2e8f0" }}>x1,y1,x2,y2 = map(int, input().split()) <span style={{ color: "#6b7280" }}># billboard 1</span></div>
            <div style={{ color: "#e2e8f0" }}>x3,y3,x4,y4 = map(int, input().split()) <span style={{ color: "#6b7280" }}># billboard 2</span></div>
            <div style={{ color: "#e2e8f0" }}>x5,y5,x6,y6 = map(int, input().split()) <span style={{ color: "#6b7280" }}># truck</span></div>
            <div style={{ color: "#e2e8f0", marginTop: 8 }}>area1 = rect_area(x1,y1,x2,y2)</div>
            <div style={{ color: "#e2e8f0" }}>area2 = rect_area(x3,y3,x4,y4)</div>
            <div style={{ color: "#e2e8f0", marginTop: 8 }}>ov1 = overlap(x1,y1,x2,y2, x5,y5,x6,y6)</div>
            <div style={{ color: "#e2e8f0" }}>ov2 = overlap(x3,y3,x4,y4, x5,y5,x6,y6)</div>
            <div style={{ color: "#e2e8f0", marginTop: 8 }}>print(<span style={{ color: "#fbbf24" }}>area1 - ov1 + area2 - ov2</span>)</div>
          </div>
        </div>),
    },

    // 3-5: Complete code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getBillboardSections(E),
    },
  ];
}
