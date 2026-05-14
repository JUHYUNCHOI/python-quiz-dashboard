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
        🖱️ {t(E, "Drag the corners — overlap updates live", "꼭짓점을 드래그하면 겹침이 실시간으로 갱신돼요")}
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
        "도로변에 직사각형 광고판 2개가 있고, 그 앞에 트럭 1대가 주차되어 있어요. 모두 변이 축에 평행해요. 트럭이 광고판의 일부를 가릴 수 있어요.\n두 광고판은 서로 겹치지 않아요. 트럭에 가려지지 않고 보이는 광고판 면적의 합을 출력해요."),
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
                        " 을 출력해요 (트럭이 광고판의 일부를 가릴 수 있음).")}
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
                "두 광고판 면적 합에서 트럭과의 겹침을 뺀 보이는 면적의 합을 출력.")}
            </div>
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
        "Let's practice!\nA rectangle has lower-left corner (2, 3) and upper-right corner (7, 6).\nWhat is its area?", "연습해보자! 직사각형의 왼쪽 아래가 (2, 3)이고 오른쪽 위가 (7, 6)이에요. 면적은?"),
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
        "Now imagine: Billboard 1 (blue), Billboard 2 (green), and a Truck (red) blocking them.\nThe truck covers part of each billboard.\nWe need the visible area!", "이제 상상해봐: 광고판 1 (파란색), 광고판 2 (초록색), 그리고 트럭 (빨간색)이 가리고 있어요. 트럭이 각 광고판의 일부를 덮어. 보이는 면적이 필요해요!"),
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
        "각 광고판은 자기 면적에서 트럭과의 겹침을 뺀 게 보이는 면적. 두 개를 더하면 답."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, color: "#9a3412", textAlign: "center", lineHeight: 1.8, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "visible = (A₁ − overlap₁) + (A₂ − overlap₂)",
                  "보이는 면적 = (A₁ − 겹침₁) + (A₂ − 겹침₂)")}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "Next chapter: how to compute the overlap of two rectangles.",
                  "다음 챕터에서 두 직사각형의 겹침 면적을 계산하는 방법.")}
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
                "겹침도 직사각형이에요! 꼭짓점은:\n• 왼쪽 = max(A.왼쪽, B.왼쪽)\n• 아래 = max(A.아래, B.아래)\n• 오른쪽 = min(A.오른쪽, B.오른쪽)\n• 위 = min(A.위, B.위)")}
            </div>
          </div>
        </div>),
    },

    // 2-1.5: Interactive sim — drag rectangles, see overlap update
    {
      type: "reveal",
      narr: t(E,
        "Try it yourself! Drag any corner to resize the blue (A) and red (B) rectangles. The purple overlap and its formula update live — separate them completely and see the overlap snap to 0.",
        "직접 해보자! 꼭짓점을 드래그해서 파란 (A)와 빨간 (B) 직사각형 크기를 바꿔봐. 보라색 겹침과 공식이 실시간으로 갱신돼요. 완전히 떨어뜨려보면 겹침이 0이 되는 것도 확인!"),
      content: (
        <div style={{ padding: 16 }}>
          <OverlapSim E={E} />
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
        "What if the rectangles don't overlap at all?\nThen max(left) > min(right) or max(bottom) > min(top).\nThe formula gives a negative width or height!", "직사각형이 아예 안 겹치면? max(왼쪽) > min(오른쪽) 또는 max(아래) > min(위). 공식이 음수 가로 또는 세로를 줘요!"),
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
        "max(0, 가로) × max(0, 세로)를 써요. 음수면 겹침 없음 → 면적 = 0! 그래서 공식에 max(0, ...)가 있어 ✅"),
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
        "Let's build the code step by step!\nFirst, we need a function to compute rectangle area.\nRemember: max(0, ...) handles the no-overlap case!", "코드를 단계별로 만들자! 먼저 직사각형 면적을 구하는 함수가 필요해요. max(0, ...)가 겹침 없는 경우를 처리해요!"),
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
        "Next: the overlap function!\nIt finds the intersection rectangle using max/min, then calls rect_area.", "다음: 겹침 함수! max/min으로 교집합 직사각형을 찾고, rect_area를 호출해요."),
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
        "겹침은 두 직사각형이 모두 존재하는 곳에서만 가능해요. A는 x=2부터, B는 x=5부터. 겹침은 x=5 (더 늦은 쪽 = max)에서 시작. ✅"),
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
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBillboardSections(E),
    },
  ];
}
