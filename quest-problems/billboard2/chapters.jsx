import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getBillboard2Sections } from "./components";

/* ================================================================
   Deep-audit sim: drag the feed billboard, watch the tarp area
   recompute live. The case label changes between
   "no overlap → full area", "covers full side → strip remains",
   "covers entire billboard → 0", and "L-shape → full area".
   Bilingual via E (English) prop.
   ================================================================ */
function TarpAuditSim({ E }) {
  const CELL = 26;
  const GRID = 12;
  const SVG = GRID * CELL;
  // Billboard fixed at (1,1)→(8,7) — the lawnmower billboard
  const B = { x1: 1, y1: 1, x2: 8, y2: 7 };
  // Feed billboard — draggable corners
  const [F, setF] = useState({ x1: 4, y1: 3, x2: 10, y2: 9 });
  const [drag, setDrag] = useState(null); // 'tl' | 'tr' | 'bl' | 'br' | 'move'
  const [dragOff, setDragOff] = useState({ dx: 0, dy: 0 });

  const clamp = (v) => Math.max(-2, Math.min(GRID + 2, Math.round(v)));
  const onMove = (e) => {
    if (!drag) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / CELL;
    const py = GRID - (e.clientY - rect.top) / CELL; // flip
    const x = clamp(px), y = clamp(py);
    if (drag === "move") {
      setF((r) => {
        const w = r.x2 - r.x1, h = r.y2 - r.y1;
        const nx1 = clamp(x - dragOff.dx), ny1 = clamp(y - dragOff.dy);
        return { x1: nx1, y1: ny1, x2: nx1 + w, y2: ny1 + h };
      });
      return;
    }
    setF((r) => {
      const next = { ...r };
      if (drag.includes("l")) next.x1 = Math.min(x, r.x2 - 1);
      else next.x2 = Math.max(x, r.x1 + 1);
      if (drag.includes("b")) next.y1 = Math.min(y, r.y2 - 1);
      else next.y2 = Math.max(y, r.y1 + 1);
      return next;
    });
  };
  const stop = () => setDrag(null);

  // Convert to SVG (top-left origin)
  const toSvg = (r) => ({
    x: r.x1 * CELL,
    y: SVG - r.y2 * CELL,
    w: (r.x2 - r.x1) * CELL,
    h: (r.y2 - r.y1) * CELL,
  });

  // Clamp feed to billboard bounds
  const cx1 = Math.max(B.x1, F.x1);
  const cy1 = Math.max(B.y1, F.y1);
  const cx2 = Math.min(B.x2, F.x2);
  const cy2 = Math.min(B.y2, F.y2);

  const bw = B.x2 - B.x1, bh = B.y2 - B.y1, area = bw * bh;
  const noOverlap = cx1 >= cx2 || cy1 >= cy2;
  const fullCover = !noOverlap && cx1 <= B.x1 && cx2 >= B.x2 && cy1 <= B.y1 && cy2 >= B.y2;
  const fullLeft = !noOverlap && !fullCover && cx1 <= B.x1 && cy1 <= B.y1 && cy2 >= B.y2;
  const fullRight = !noOverlap && !fullCover && cx2 >= B.x2 && cy1 <= B.y1 && cy2 >= B.y2;
  const fullTop = !noOverlap && !fullCover && cy2 >= B.y2 && cx1 <= B.x1 && cx2 >= B.x2;
  const fullBottom = !noOverlap && !fullCover && cy1 <= B.y1 && cx1 <= B.x1 && cx2 >= B.x2;

  let tarp = area;
  let caseKey = "fullArea";
  let tarpRect = { x1: B.x1, y1: B.y1, x2: B.x2, y2: B.y2 };
  if (fullCover) { tarp = 0; caseKey = "fullCover"; tarpRect = null; }
  else if (fullLeft) { tarp = (B.x2 - cx2) * bh; caseKey = "leftStrip"; tarpRect = { x1: cx2, y1: B.y1, x2: B.x2, y2: B.y2 }; }
  else if (fullRight) { tarp = (cx1 - B.x1) * bh; caseKey = "rightStrip"; tarpRect = { x1: B.x1, y1: B.y1, x2: cx1, y2: B.y2 }; }
  else if (fullTop) { tarp = bw * (cy1 - B.y1); caseKey = "topStrip"; tarpRect = { x1: B.x1, y1: B.y1, x2: B.x2, y2: cy1 }; }
  else if (fullBottom) { tarp = bw * (B.y2 - cy2); caseKey = "bottomStrip"; tarpRect = { x1: B.x1, y1: cy2, x2: B.x2, y2: B.y2 }; }
  else if (noOverlap) { caseKey = "noOverlap"; }

  const caseLabel = {
    noOverlap: t(E, "No overlap → tarp = full billboard", "겹침 없음 → 타프 = 전체 광고판"),
    fullCover: t(E, "Feed covers entire billboard → tarp = 0", "사료가 전체를 덮음 → 타프 = 0"),
    leftStrip: t(E, "Feed covers FULL left side → strip on right", "사료가 왼쪽 변 전체를 덮음 → 오른쪽 띠"),
    rightStrip: t(E, "Feed covers FULL right side → strip on left", "사료가 오른쪽 변 전체를 덮음 → 왼쪽 띠"),
    topStrip: t(E, "Feed covers FULL top side → strip on bottom", "사료가 윗변 전체를 덮음 → 아래쪽 띠"),
    bottomStrip: t(E, "Feed covers FULL bottom side → strip on top", "사료가 아랫변 전체를 덮음 → 위쪽 띠"),
    fullArea: t(E, "Visible part is L-shaped → tarp = full billboard", "보이는 부분이 ㄴ자 → 타프 = 전체 광고판"),
  }[caseKey];

  const sb = toSvg(B), sf = toSvg(F);
  const st = tarpRect ? toSvg(tarpRect) : null;

  const corner = (cornerName, cx, cy) => (
    <circle
      cx={cx} cy={cy} r={7}
      fill="#fff" stroke="#0891b2" strokeWidth={2.5}
      style={{ cursor: "grab" }}
      onMouseDown={(e) => { e.preventDefault(); setDrag(cornerName); }}
    />
  );

  return (
    <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", marginBottom: 8, textAlign: "center" }}>
        🖱️ {t(E, "Drag the cyan feed billboard — tarp updates live",
                  "사이안 사료 광고판을 드래그 — 타프가 실시간으로 갱신돼요")}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg
          width={SVG} height={SVG}
          onMouseMove={onMove} onMouseUp={stop} onMouseLeave={stop}
          style={{ background: "#fff", border: "1px solid #fecaca", borderRadius: 8, touchAction: "none", userSelect: "none" }}
        >
          {/* Grid */}
          {Array.from({ length: GRID + 1 }).map((_, i) => (
            <g key={i}>
              <line x1={i * CELL} y1={0} x2={i * CELL} y2={SVG} stroke="#fee2e2" strokeWidth={1} />
              <line x1={0} y1={i * CELL} x2={SVG} y2={i * CELL} stroke="#fee2e2" strokeWidth={1} />
            </g>
          ))}
          {/* Billboard (red) — fixed */}
          <rect x={sb.x} y={sb.y} width={sb.w} height={sb.h}
            fill="rgba(220,38,38,0.18)" stroke="#dc2626" strokeWidth={2} />
          <text x={sb.x + 4} y={sb.y + 14} fontSize={11} fontWeight={700} fill="#7f1d1d">
            {t(E, "Billboard", "광고판")}
          </text>
          {/* Feed (cyan) — draggable */}
          <rect x={sf.x} y={sf.y} width={sf.w} height={sf.h}
            fill="rgba(8,145,178,0.18)" stroke="#0891b2" strokeWidth={2}
            style={{ cursor: drag === "move" ? "grabbing" : "grab" }}
            onMouseDown={(e) => {
              e.preventDefault();
              const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
              const px = (e.clientX - rect.left) / CELL;
              const py = GRID - (e.clientY - rect.top) / CELL;
              setDragOff({ dx: clamp(px) - F.x1, dy: clamp(py) - F.y1 });
              setDrag("move");
            }}
          />
          <text x={sf.x + sf.w - 30} y={sf.y + 14} fontSize={11} fontWeight={700} fill="#0e7490">
            {t(E, "Feed", "사료")}
          </text>
          {/* Tarp (purple) */}
          {st && (
            <rect x={st.x + 2} y={st.y + 2} width={Math.max(0, st.w - 4)} height={Math.max(0, st.h - 4)}
              fill="none" stroke="#7c3aed" strokeWidth={2.5} strokeDasharray="5 3" />
          )}
          {/* Corners on top */}
          {corner("bl", sf.x,         sf.y + sf.h)}
          {corner("br", sf.x + sf.w,  sf.y + sf.h)}
          {corner("tl", sf.x,         sf.y)}
          {corner("tr", sf.x + sf.w,  sf.y)}
        </svg>
      </div>
      {/* Live readout */}
      <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>
        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 6, padding: "6px 8px", color: "#7f1d1d" }}>
          {t(E, "Billboard", "광고판")}: ({B.x1},{B.y1})→({B.x2},{B.y2})<br/>
          {t(E, "area", "면적")} = {area}
        </div>
        <div style={{ background: "#cffafe", border: "1px solid #67e8f9", borderRadius: 6, padding: "6px 8px", color: "#0e7490" }}>
          {t(E, "Feed", "사료")}: ({F.x1},{F.y1})→({F.x2},{F.y2})
        </div>
        <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 6, padding: "6px 8px", color: "#5b21b6" }}>
          {t(E, "Tarp area", "타프 면적")} = <b>{tarp}</b>
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: "#7c3aed", textAlign: "center" }}>
        {caseLabel}
      </div>
      <div style={{ marginTop: 6, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#5b21b6", textAlign: "center", lineHeight: 1.6 }}>
        cx1 = max({B.x1},{F.x1}) = {cx1} &nbsp;·&nbsp; cy1 = max({B.y1},{F.y1}) = {cy1}<br/>
        cx2 = min({B.x2},{F.x2}) = {cx2} &nbsp;·&nbsp; cy2 = min({B.y2},{F.y2}) = {cy2}
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "# Read billboard and feed billboard coordinates",
  "x1, y1, x2, y2 = map(int, input().split())",
  "x3, y3, x4, y4 = map(int, input().split())",
  "",
  "# Billboard dimensions",
  "bw = x2 - x1",
  "bh = y2 - y1",
  "area = bw * bh",
  "",
  "# Clamp feed billboard to billboard bounds",
  "cx1 = max(x1, x3)",
  "cy1 = max(y1, y3)",
  "cx2 = min(x2, x4)",
  "cy2 = min(y2, y4)",
  "",
  "# No overlap",
  "if cx1 >= cx2 or cy1 >= cy2:",
  "    print(area)",
  "# Feed covers entire billboard",
  "elif cx1 <= x1 and cx2 >= x2 and cy1 <= y1 and cy2 >= y2:",
  "    print(0)",
  "# Feed covers full left side",
  "elif cx1 <= x1 and cy1 <= y1 and cy2 >= y2:",
  "    print((x2 - cx2) * bh)",
  "# Feed covers full right side",
  "elif cx2 >= x2 and cy1 <= y1 and cy2 >= y2:",
  "    print((cx1 - x1) * bh)",
  "# Feed covers full top side",
  "elif cy2 >= y2 and cx1 <= x1 and cx2 >= x2:",
  "    print(bw * (cy1 - y1))",
  "# Feed covers full bottom side",
  "elif cy1 <= y1 and cx1 <= x1 and cx2 >= x2:",
  "    print(bw * (y2 - cy2))",
  "# Otherwise tarp = entire billboard",
  "else:",
  "    print(area)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeBillboard2Ch1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "There's a lawnmower billboard (an axis-aligned rectangle) and a cow-feed billboard (also axis-aligned) that may cover part of it.\nFind the area of the SMALLEST axis-aligned rectangle (a tarp) that covers every part of the lawnmower billboard NOT already hidden by the feed billboard.",
        "잔디깎이 광고판과 소 사료 광고판이 있어요. 둘 다 변이 축에 평행한 직사각형이에요. 사료 광고판이 잔디깎이 광고판의 일부를 가릴 수 있어요.\n잔디깎이 광고판에서 가려지지 않은 모든 부분을 덮을 수 있는 가장 작은 직사각형 타프의 면적을 출력해요. 타프도 변이 축에 평행해야 해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udea7"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Blocked Billboard II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2018 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the area of the smallest axis-aligned tarp covering the visible part of the lawnmower billboard.",
                "잔디깎이 광고판에서 보이는 부분을 덮는 가장 작은 축에 평행한 타프의 면적을 출력.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There's a ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "lawnmower billboard", "잔디깎이 광고판")}</b>
                  {t(E, " (axis-aligned rectangle) and a ", " (축에 평행한 직사각형) 과 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "cow-feed billboard", "소 사료 광고판")}</b>
                  {t(E, " that may cover part of it.", " 이 있어요. 사료 광고판이 잔디깎이의 일부를 가릴 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We need a ", "잔디깎이 광고판 중 가려지지 않은 모든 부분을 덮는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "tarp — an axis-aligned rectangle", "타프 — 축에 평행한 직사각형")}</b>
                  {t(E, " — that covers every part of the lawnmower billboard NOT hidden by the feed billboard.",
                        " 가 필요해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "area of the SMALLEST such tarp", "가장 작은 타프의 면적")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: quiz
    {
      type: "quiz",
      narr: t(E,
        "A 10x10 billboard (area 100).\nThe feed billboard covers the top half entirely.\nWhat is the tarp area?", "10x10 광고판(면적 100). 사료 광고판이 윗부분 절반을 완전히 덮어. 타프 면적은?"),
      question: t(E,
        "Billboard 10x10=100. Feed covers the entire top half. Tarp area?",
        "광고판 10x10=100. 사료가 윗절반 전체를 덮음. 타프 면적은?"),
      options: [
        t(E, "50 (bottom half rectangle)", "50 (아래 절반 직사각형)"),
        t(E, "100 (entire billboard)", "100 (전체 광고판)"),
        t(E, "0 (fully covered)", "0 (완전히 덮임)"),
      ],
      correct: 0,
      explain: t(E,
        "The feed covers the entire top side, so the exposed bottom half is a rectangle. Tarp = 10x5 = 50.",
        "사료가 윗면 전체를 덮으니 노출된 아랫절반이 직사각형이에요. 타프 = 10x5 = 50."),
    },
    // 1-3: input
    {
      type: "input",
      narr: t(E,
        "Billboard is 6 wide, 3 tall (area 18).\nThe feed billboard does NOT overlap at all.\nWhat is the tarp area?", "광고판이 가로 6, 세로 3 (면적 18). 사료 광고판이 전혀 겹치지 않아. 타프 면적은?"),
      question: t(E,
        "Billboard 6x3=18, no overlap with feed. Tarp area?",
        "광고판 6x3=18, 사료와 겹침 없음. 타프 면적은?"),
      hint: t(E,
        "If nothing's covered, the tarp must cover the whole billboard.",
        "가려진 게 없으면 타프가 광고판 전체를 덮어야 해."),
      answer: 18,
    },
    // 1-4: deep-audit sim — drag feed, watch tarp & case label
    {
      type: "reveal",
      narr: t(E,
        "Audit every case yourself. Drag the cyan feed corners (or the body) and watch the tarp area + case label change. Find: full cover, full-side strip (left/right/top/bottom), no overlap, and the tricky L-shape that forces tarp = full billboard.",
        "모든 경우를 직접 감사해보자. 사이안 사료 광고판의 꼭짓점(또는 본체)을 드래그하면서 타프 면적과 경우 라벨이 어떻게 변하는지 봐. 전체 덮음, 한 변 전체 덮음 (왼/오른/위/아래), 겹침 없음, 그리고 타프=전체 광고판이 되는 까다로운 ㄴ자까지 모두 찾아봐."),
      content: (
        <div style={{ padding: 16 }}>
          <TarpAuditSim E={E} />
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, lineHeight: 1.6, textAlign: "center" }}>
            {t(E,
              "Key insight: tarp shrinks ONLY when the feed covers a FULL side (left, right, top, or bottom edge of the billboard). Otherwise, the visible region is L-shaped or hole-shaped and the smallest covering rectangle is the entire billboard.",
              "핵심: 사료가 광고판의 한 변 전체 (왼쪽/오른쪽/위/아래)를 덮을 때만 타프가 줄어들어요. 그 외엔 보이는 부분이 ㄴ자 또는 구멍 모양이라 덮는 최소 직사각형이 전체 광고판이 돼요.")}
          </div>
        </div>),
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeBillboard2Ch2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Visible part is rectangular ONLY if the feed billboard fully covers one full side (left/right/top/bottom strip). Otherwise it's L-shaped/hole → smallest covering rectangle is the whole billboard. Sections build it one piece at a time.",
        "보이는 부분이 직사각형 = 사료가 한 쪽 변 전체를 덮을 때뿐. 그 외엔 L 자/구멍 → 덮는 최소 직사각형은 전체 광고판. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getBillboard2Sections(E),
    },
  ];
}
