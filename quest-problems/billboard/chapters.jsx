import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getBillboardSections } from "./components";

/* ================================================================
   Interactive overlap simulator — drag rectangle corners,
   see overlap area computed live with max/min formula.
   ================================================================ */
function OverlapSim({ E }) {
  // Coordinate space: 0..12 on both axes; 1 unit = CELL px.
  const CELL = 28;
  const GRID = 12;
  const SVG = GRID * CELL;
  const [A, setA] = useState({ x1: 1, y1: 1, x2: 6, y2: 5 });
  const [B, setB] = useState({ x1: 4, y1: 3, x2: 10, y2: 7 });
  const [drag, setDrag] = useState(null); // { rect: 'A'|'B', corner: 'tl'|'tr'|'bl'|'br' }

  const clamp = (v) => Math.max(0, Math.min(GRID, Math.round(v)));
  const onMove = (e) => {
    if (!drag) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / CELL;
    const py = GRID - (e.clientY - rect.top) / CELL; // flip: bottom-left origin
    const x = clamp(px), y = clamp(py);
    const setter = drag.rect === "A" ? setA : setB;
    setter((r) => {
      const next = { ...r };
      if (drag.corner.includes("l")) next.x1 = Math.min(x, r.x2 - 1);
      else next.x2 = Math.max(x, r.x1 + 1);
      if (drag.corner.includes("b")) next.y1 = Math.min(y, r.y2 - 1);
      else next.y2 = Math.max(y, r.y1 + 1);
      return next;
    });
  };
  const stop = () => setDrag(null);

  // Convert a rect (data coords) to SVG attributes (top-left origin).
  const toSvg = (r) => ({
    x: r.x1 * CELL,
    y: SVG - r.y2 * CELL,
    w: (r.x2 - r.x1) * CELL,
    h: (r.y2 - r.y1) * CELL,
  });

  // Overlap rectangle (max of lefts/bottoms, min of rights/tops).
  const ox1 = Math.max(A.x1, B.x1);
  const oy1 = Math.max(A.y1, B.y1);
  const ox2 = Math.min(A.x2, B.x2);
  const oy2 = Math.min(A.y2, B.y2);
  const ow = Math.max(0, ox2 - ox1);
  const oh = Math.max(0, oy2 - oy1);
  const overlapArea = ow * oh;
  const aArea = (A.x2 - A.x1) * (A.y2 - A.y1);
  const bArea = (B.x2 - B.x1) * (B.y2 - B.y1);

  const sa = toSvg(A), sb = toSvg(B);
  const so = overlapArea > 0 ? toSvg({ x1: ox1, y1: oy1, x2: ox2, y2: oy2 }) : null;

  const corner = (rect, cornerName, cx, cy, color) => (
    <circle
      cx={cx} cy={cy} r={7}
      fill="#fff" stroke={color} strokeWidth={2.5}
      style={{ cursor: "grab" }}
      onMouseDown={(e) => { e.preventDefault(); setDrag({ rect, corner: cornerName }); }}
    />
  );

  const rectCorners = (r, color, name) => {
    const s = toSvg(r);
    return (
      <g>
        {corner(name, "bl", s.x,       s.y + s.h, color)}
        {corner(name, "br", s.x + s.w, s.y + s.h, color)}
        {corner(name, "tl", s.x,       s.y,       color)}
        {corner(name, "tr", s.x + s.w, s.y,       color)}
      </g>
    );
  };

  return (
    <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", marginBottom: 8, textAlign: "center" }}>
        🖱️ {t(E, "Drag the corners — overlap updates live", "꼭짓점을 끌어 보면 겹침이 바로바로 바뀌어요")}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg
          width={SVG} height={SVG}
          onMouseMove={onMove} onMouseUp={stop} onMouseLeave={stop}
          style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: 8, touchAction: "none", userSelect: "none" }}
        >
          {/* Grid */}
          {Array.from({ length: GRID + 1 }).map((_, i) => (
            <g key={i}>
              <line x1={i * CELL} y1={0} x2={i * CELL} y2={SVG} stroke="#fde68a" strokeWidth={1} />
              <line x1={0} y1={i * CELL} x2={SVG} y2={i * CELL} stroke="#fde68a" strokeWidth={1} />
            </g>
          ))}
          {/* Rect A (blue) */}
          <rect x={sa.x} y={sa.y} width={sa.w} height={sa.h} fill="rgba(59,130,246,0.18)" stroke="#3b82f6" strokeWidth={2} />
          <text x={sa.x + 4} y={sa.y + 14} fontSize={12} fontWeight={700} fill="#1d4ed8">A</text>
          {/* Rect B (red) */}
          <rect x={sb.x} y={sb.y} width={sb.w} height={sb.h} fill="rgba(239,68,68,0.18)" stroke="#ef4444" strokeWidth={2} />
          <text x={sb.x + sb.w - 14} y={sb.y + 14} fontSize={12} fontWeight={700} fill="#b91c1c">B</text>
          {/* Overlap */}
          {so && (
            <g>
              <rect x={so.x} y={so.y} width={so.w} height={so.h} fill="rgba(168,85,247,0.40)" stroke="#7c3aed" strokeWidth={2} strokeDasharray="4 3" />
              <text x={so.x + so.w / 2} y={so.y + so.h / 2 + 4} fontSize={11} fontWeight={800} fill="#5b21b6" textAnchor="middle">
                {ow}×{oh}={overlapArea}
              </text>
            </g>
          )}
          {/* Corners on top */}
          {rectCorners(A, "#3b82f6", "A")}
          {rectCorners(B, "#ef4444", "B")}
        </svg>
      </div>
      {/* Live readout */}
      <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>
        <div style={{ background: "#dbeafe", border: "1px solid #93c5fd", borderRadius: 6, padding: "6px 8px", color: "#1d4ed8" }}>
          A: ({A.x1},{A.y1})→({A.x2},{A.y2})<br/>area = {aArea}
        </div>
        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 6, padding: "6px 8px", color: "#b91c1c" }}>
          B: ({B.x1},{B.y1})→({B.x2},{B.y2})<br/>area = {bArea}
        </div>
        <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 6, padding: "6px 8px", color: "#5b21b6" }}>
          {t(E, "overlap", "겹침")}: {overlapArea === 0 ? t(E, "none", "없음") : `${ow}×${oh}=${overlapArea}`}
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#5b21b6", textAlign: "center", lineHeight: 1.6 }}>
        ox1 = max({A.x1},{B.x1}) = {ox1} &nbsp;·&nbsp; oy1 = max({A.y1},{B.y1}) = {oy1}<br/>
        ox2 = min({A.x2},{B.x2}) = {ox2} &nbsp;·&nbsp; oy2 = min({A.y2},{B.y2}) = {oy2}<br/>
        w = max(0, {ox2}−{ox1}) = {ow} &nbsp;·&nbsp; h = max(0, {oy2}−{oy1}) = {oh}
      </div>
    </div>
  );
}

/* Helper: draw a rectangle on a coordinate grid */
function RectBox({ x1, y1, x2, y2, color, label, opacity = 0.3 }) {
  const w = x2 - x1, h = y2 - y1;
  return (
    <div style={{ position: "absolute", left: x1 * 30, bottom: y1 * 30, width: w * 30, height: h * 30,
      background: color, opacity, border: `1px solid ${color}`, borderRadius: 4,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, fontWeight: 600, color: "#fff",
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
        "Along a road there are TWO axis-aligned rectangular billboards, plus ONE axis-aligned truck parked in front. The truck may cover parts of one or both billboards.\nThe billboards do NOT overlap each other. Print the TOTAL visible billboard area (sum across both billboards).",
        "트럭에 가려지지 않고 보이는 광고판 면적의 합을 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🪧</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Blocked Billboard</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2017 Bronze #1</div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "two axis-aligned rectangular billboards", "축에 평행한 직사각형 광고판 2개")}</b>
                  {t(E, " along a road, plus ", "와, 그 앞에 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "one axis-aligned truck", "축에 평행한 트럭 1대")}</b>
                  {t(E, " parked in front.", "가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each rectangle is given as ", "각 사각형은 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>(x1, y1, x2, y2)</code>
                  {t(E, ".", " 좌표로 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The two billboards ", "두 광고판은 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "do NOT overlap each other", "서로 겹치지 않아요")}</b>
                  {t(E, ".", ". 트럭만 광고판을 가릴 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "total visible billboard area", "보이는 광고판 면적의 합")}</b>
                  {t(E, " (truck blocks may subtract from one or both billboards).",
                        " 을 출력해요 (트럭이 광고판의 일부를 가릴 수 있어요).")}
                </div>
              </div>
            </div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginTop: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Output the total visible billboard area (sum of two billboards minus their overlaps with the truck).",
                "두 광고판 면적을 더한 뒤, 트럭에 가려진 부분을 빼서 출력해요.")}
            </div>
          </div>
        </div>),
    },

    // 1-2: What is a rectangle on a coordinate plane?
    {
      type: "reveal",
      narr: t(E,
        "Each rectangle is defined by two corners: lower-left (x1, y1) and upper-right (x2, y2).\nThe area is width × height = (x2-x1) × (y2-y1)!", "직사각형은 왼쪽 아래와 오른쪽 위, 두 꼭짓점으로 정해져요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
              {t(E, "📐 Rectangle = Two Corners", "📐 직사각형 = 두 꼭짓점")}
            </div>
            {/* Visual rectangle with labeled corners */}
            <div style={{ position: "relative", height: 150, margin: "0 auto", width: 200, background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 8 }}>
              <div style={{ position: "absolute", left: -4, bottom: -20, fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>
                (1, 1)
              </div>
              <div style={{ position: "absolute", right: -4, top: -20, fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>
                (5, 4)
              </div>
              {/* Width label */}
              <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)", fontSize: 12, fontWeight: 600, color: C.accent }}>
                {t(E, "width = 5-1 = 4", "가로 = 5-1 = 4")}
              </div>
              {/* Height label */}
              <div style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", fontSize: 12, fontWeight: 600, color: C.accent }}>
                {t(E, "height = 4-1 = 3", "세로 = 4-1 = 3")}
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 36, fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>
              {t(E, "Area = 4 × 3 = 12", "면적 = 4 × 3 = 12")}
            </div>
          </div>
        </div>),
    },

    // 1-3: Quiz — area calculation
    {
      type: "quiz",
      narr: t(E,
        "Let's practice!\nA rectangle has lower-left corner (2, 3) and upper-right corner (7, 6).\nWhat is its area?", "왼쪽 아래가 (2, 3), 오른쪽 위가 (7, 6) 인 직사각형의 면적은 얼마일까요?"),
      question: t(E,
        "Rectangle (2,3) to (7,6). Width = 7-2 = 5, Height = 6-3 = 3. Area = ?",
        "직사각형 (2,3)에서 (7,6) 이에요. 가로 = 7-2 = 5, 세로 = 6-3 = 3. 면적은 얼마일까요?"),
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
        "Now imagine: Billboard 1 (blue), Billboard 2 (green), and a Truck (red) blocking them.\nThe truck covers part of each billboard.\nWe need the visible area!", "트럭이 두 광고판의 일부를 가려요. 보이는 면적은 얼마일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10, textAlign: "center" }}>
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
                  <div style={{ width: r.w * 25, height: r.h * 25, background: r.bg, border: `1.5px solid ${r.color}`, borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: r.color }}>
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
        "Each visible billboard is its area minus its overlap with the truck — sum the two.",
        "광고판마다 겹친 부분을 빼고, 둘을 더하면 답이 나와요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, color: "#9a3412", textAlign: "center", lineHeight: 1.8, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "visible = (A₁ − overlap₁) + (A₂ − overlap₂)",
                  "보이는 면적 = (A₁ − 겹침₁) + (A₂ − 겹침₂)")}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "Next chapter: how to compute the overlap of two rectangles.",
                  "두 직사각형의 겹침 면적을 구하는 법은 다음 챕터에서 봐요.")}
          </div>
        </div>),
    },

    // 1-6: Quiz — apply formula
    {
      type: "quiz",
      narr: t(E,
        "Billboard 1 area = 20, overlap with truck = 6.\nBillboard 2 area = 15, overlap with truck = 0 (no overlap).\nWhat's the total visible area?", "광고판1 은 면적 20 에 겹침 6, 광고판2 는 면적 15 에 겹침 0 이에요."),
      question: t(E,
        "A₁=20, O₁=6, A₂=15, O₂=0. Visible = ?",
        "A₁=20, O₁=6, A₂=15, O₂=0 이에요. 보이는 면적은 얼마일까요?"),
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
        "Billboard 1: (1,2) to (5,5) → area = 4×3 = 12.\nBillboard 2: (8,1) to (10,4) → area = 2×3 = 6.\nTruck overlaps 4 with billboard 1, 0 with billboard 2.\nVisible?", "광고판1 은 (1,2)에서 (5,5) 라 면적이 4×3 = 12 예요.\n광고판2 는 (8,1)에서 (10,4) 라 면적이 2×3 = 6 이에요.\n트럭은 광고판1 과 4 만큼 겹치고, 광고판2 와는 안 겹쳐요.\n보이는 면적은 얼마일까요?"),
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
        "The hardest part: how do we compute the overlap area of two rectangles?\nLet's learn the overlap formula step by step!", "두 직사각형의 겹침 면적은 어떻게 구할까요? 여기가 제일 어려워요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.accentBg, border: `1px solid ${C.accentBd}`, borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.accent, marginBottom: 10 }}>
              {t(E, "🔍 Rectangle Overlap", "🔍 직사각형 겹침")}
            </div>
            {/* Two overlapping rectangles */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <div style={{ position: "relative", width: 220, height: 120 }}>
                {/* Rect A */}
                <div style={{ position: "absolute", left: 0, top: 20, width: 140, height: 80, background: "rgba(59,130,246,0.2)", border: "1px solid #3b82f6", borderRadius: 4 }}>
                  <span style={{ position: "absolute", top: 2, left: 4, fontSize: 10, fontWeight: 600, color: "#3b82f6" }}>A</span>
                </div>
                {/* Rect B */}
                <div style={{ position: "absolute", left: 80, top: 0, width: 140, height: 80, background: "rgba(239,68,68,0.2)", border: "1px solid #ef4444", borderRadius: 4 }}>
                  <span style={{ position: "absolute", top: 2, right: 4, fontSize: 10, fontWeight: 600, color: "#ef4444" }}>B</span>
                </div>
                {/* Overlap area */}
                <div style={{ position: "absolute", left: 80, top: 20, width: 60, height: 60, background: "rgba(168,85,247,0.3)", border: "2px dashed #7c3aed", borderRadius: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    {t(E, "overlap!", "겹침!")}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {t(E,
                "The overlap is itself a rectangle! Its corners are:\n• left = max(A.left, B.left)\n• bottom = max(A.bottom, B.bottom)\n• right = min(A.right, B.right)\n• top = min(A.top, B.top)",
                "겹침도 직사각형이에요! 꼭짓점은 이렇게 구해요.\n• 왼쪽 = max(A.왼쪽, B.왼쪽)\n• 아래 = max(A.아래, B.아래)\n• 오른쪽 = min(A.오른쪽, B.오른쪽)\n• 위 = min(A.위, B.위)")}
            </div>
          </div>
        </div>),
    },

    // 2-1.5: Interactive sim — drag rectangles, see overlap update
    {
      type: "reveal",
      narr: t(E,
        "Try it yourself! Drag any corner to resize the blue (A) and red (B) rectangles. The purple overlap and its formula update live — separate them completely and see the overlap snap to 0.",
        "꼭짓점을 끌어서 두 직사각형 크기를 바꿔 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <OverlapSim E={E} />
        </div>),
    },

    // 2-2: Concrete example trace
    {
      type: "reveal",
      narr: t(E,
        "Let's trace!\nA = (1,1)→(6,4), B = (3,2)→(8,5).\nOverlap left = max(1,3) = 3, right = min(6,8) = 6, bottom = max(1,2) = 2, top = min(4,5) = 4.", "한 번 따라가 봐요.\nA = (1,1)→(6,4), B = (3,2)→(8,5) 예요.\n겹침 왼쪽 = max(1,3) = 3, 오른쪽 = min(6,8) = 6,\n아래 = max(1,2) = 2, 위 = min(4,5) = 4 예요."),
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
                <span style={{ fontWeight: 600, color: s.color }}>{s.step}</span>
                <span style={{ color: C.text }}>{s.desc}</span>
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 15, fontWeight: 700, color: "#7c3aed", fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, "Overlap = (3,2)→(6,4) = 3×2 = 6", "겹침 = (3,2)→(6,4) = 3×2 = 6")}
            </div>
          </div>
        </div>),
    },

    // 2-3: Quiz — what if no overlap?
    {
      type: "quiz",
      narr: t(E,
        "What if the rectangles don't overlap at all?\nThen max(left) > min(right) or max(bottom) > min(top).\nThe formula gives a negative width or height!", "직사각형이 아예 안 겹치면 공식이 음수 가로나 세로를 내놓아요."),
      question: t(E,
        "A = (0,0)→(2,2), B = (5,5)→(7,7). Overlap right = min(2,7) = 2, left = max(0,5) = 5. Width = 2-5 = -3. What should the overlap area be?",
        "A = (0,0)→(2,2), B = (5,5)→(7,7) 이에요. 겹침 오른쪽 = min(2,7) = 2, 왼쪽 = max(0,5) = 5 라 가로가 2-5 = -3 이에요. 겹침 면적은 얼마일까요?"),
      options: [
        t(E, "0 (no overlap)", "0 (겹침 없음)"),
        t(E, "-3 (negative)", "-3 (음수)"),
        t(E, "3 (absolute value)", "3 (절댓값)"),
      ],
      correct: 0,
      explain: t(E,
        "We use max(0, width) × max(0, height). Negative means no overlap → area = 0! That's why the formula has max(0, ...) ✅",
        "max(0, 가로) × max(0, 세로) 를 써요. 음수면 겹치지 않는다는 뜻이라 면적이 0 이에요. 그래서 공식에 max(0, ...) 가 있어요 ✅"),
    },

    // 2-4: Input — compute overlap
    {
      type: "input",
      narr: t(E,
        "Your turn!\nA = (2,1)→(6,5), B = (4,3)→(8,7).\nOverlap: left=max(2,4)=4, right=min(6,8)=6, bottom=max(1,3)=3, top=min(5,7)=5.\nWidth=2, Height=2.\nOverlap area?", "이번엔 직접 해봐요.\nA = (2,1)→(6,5), B = (4,3)→(8,7) 이에요.\n왼쪽=max(2,4)=4, 오른쪽=min(6,8)=6,\n아래=max(1,3)=3, 위=min(5,7)=5 라 가로도 2, 세로도 2 예요.\n겹침 면적은 얼마일까요?"),
      question: t(E, "Overlap width=2, height=2. Area?", "겹침 가로가 2, 세로가 2 예요. 면적은 얼마일까요?"),
      answer: 4,
    },

    // 2-5: Full example
    {
      type: "input",
      narr: t(E,
        "Complete problem!\nBillboard1 (1,2)→(4,5), area=9.\nBillboard2 (6,0)→(10,4), area=16.\nTruck (3,1)→(7,3).\nOverlap1 = (3,2)→(4,3) = 1×1 = 1.\nOverlap2 = (6,1)→(7,3) = 1×2 = 2.\nVisible?", "이제 문제 전체를 풀어봐요.\n광고판1 (1,2)→(4,5) 는 면적이 9 예요.\n광고판2 (6,0)→(10,4) 는 면적이 16 이에요.\n트럭은 (3,1)→(7,3) 이에요.\n겹침1 = (3,2)→(4,3) = 1×1 = 1,\n겹침2 = (6,1)→(7,3) = 1×2 = 2 예요.\n보이는 면적은 얼마일까요?"),
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
        "Let's build the code step by step!\nFirst, we need a function to compute rectangle area.\nRemember: max(0, ...) handles the no-overlap case!", "먼저 직사각형 면적을 구하는 함수부터 만들어요."),
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
              "가로나 세로가 음수면 두 직사각형이 안 겹친다는 뜻이에요. max(0, ...) 가 그럴 때 면적을 0 으로 만들어 줘요.")}
          </div>
        </div>),
    },

    // 3-2: Step 2 — overlap function
    {
      type: "reveal",
      narr: t(E,
        "Next: the overlap function!\nIt finds the intersection rectangle using max/min, then calls rect_area.", "다음은 겹침 함수예요. max/min 으로 겹치는 직사각형을 찾아요."),
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
            {t(E, "max() for left/bottom, min() for right/top!", "왼쪽과 아래는 max(), 오른쪽과 위는 min() 을 써요!")}
          </div>
        </div>),
    },

    // 3-3: Quiz — why max for left?
    {
      type: "quiz",
      narr: t(E,
        "Why do we use max() for the left edge of overlap?\nBecause the overlap starts where BOTH rectangles have started — the later (larger) left edge!", "겹침의 왼쪽에는 왜 max() 를 쓸까요? 둘 다 시작한 뒤라야 겹치니까요."),
      question: t(E,
        "Rectangle A starts at x=2, Rectangle B starts at x=5. Where does the overlap start?",
        "직사각형 A 는 x=2 에서, B 는 x=5 에서 시작해요. 겹침은 어디서 시작할까요?"),
      options: [
        "x = 5 (max)",
        "x = 2 (min)",
        "x = 3.5 (average)",
      ],
      correct: 0,
      explain: t(E,
        "The overlap can only exist where BOTH rectangles exist. A hasn't started until x=2, B hasn't started until x=5. So overlap starts at x=5 (the later one = max). ✅",
        "겹침은 두 직사각형이 모두 있는 곳에만 생겨요. A 는 x=2 부터, B 는 x=5 부터 있어요. x=2 와 x=5 사이에는 A 만 있으니 겹침은 더 늦은 x=5 에서 시작해요. 그래서 max 예요 ✅"),
    },

    // 3-4: Step 3 — main code
    {
      type: "reveal",
      narr: t(E,
        "Finally: read the three rectangles, compute areas and overlaps, print the answer!", "마지막으로 세 직사각형을 읽고 면적과 겹침을 구해 답을 써요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.8 }}>
            <div style={{ color: "#6b7280" }}># Read 3 rectangles (USACO 파일 I/O)</div>
            <div style={{ color: "#e2e8f0" }}>with open('billboard.in') as file:</div>
            <div style={{ color: "#e2e8f0" }}>{"    "}lines = file.readlines()</div>
            <div style={{ color: "#e2e8f0" }}>x1,y1,x2,y2 = map(int, lines[0].split()) <span style={{ color: "#6b7280" }}># billboard 1</span></div>
            <div style={{ color: "#e2e8f0" }}>x3,y3,x4,y4 = map(int, lines[1].split()) <span style={{ color: "#6b7280" }}># billboard 2</span></div>
            <div style={{ color: "#e2e8f0" }}>x5,y5,x6,y6 = map(int, lines[2].split()) <span style={{ color: "#6b7280" }}># truck</span></div>
            <div style={{ color: "#e2e8f0", marginTop: 8 }}>area1 = rect_area(x1,y1,x2,y2)</div>
            <div style={{ color: "#e2e8f0" }}>area2 = rect_area(x3,y3,x4,y4)</div>
            <div style={{ color: "#e2e8f0", marginTop: 8 }}>ov1 = overlap(x1,y1,x2,y2, x5,y5,x6,y6)</div>
            <div style={{ color: "#e2e8f0" }}>ov2 = overlap(x3,y3,x4,y4, x5,y5,x6,y6)</div>
            <div style={{ color: "#e2e8f0", marginTop: 8 }}>with open('billboard.out', 'w') as file:</div>
            <div style={{ color: "#e2e8f0" }}>{"    "}file.write(str(<span style={{ color: "#fbbf24" }}>area1 - ov1 + area2 - ov2</span>) + '\n')</div>
          </div>
        </div>),
    },

    // 3-5: Complete code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드를 한 부분씩 읽어봐요. 위에서 Python ↔ C++ 을 바꿔 볼 수 있어요."),
      sections: getBillboardSections(E),
    },
  ];
}
