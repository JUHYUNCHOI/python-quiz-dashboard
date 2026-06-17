import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getAstralSections, AstralComposite, AstralChainDiscovery, AstralDpSim } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

/* ── 클릭형 궤도 시뮬레이터 ──────────────────────────────────────
   stepData: Array<{ cells: {letter,star,active}[], note: string, result?: string, ok?: boolean }>
   ─────────────────────────────────────────────────────────── */
function ChainStepSim({ stepData, E }) {
  const [si, setSi] = useState(0);
  const last = stepData.length - 1;
  const idx = si > last ? last : si < 0 ? 0 : si;  // guard: a reused instance may carry a stale index
  const cur = stepData[idx];
  const isFirst = idx === 0;
  const isLast = idx === last;

  const btn = (disabled, label, onClick) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 16px", borderRadius: 7, border: "none",
      fontSize: 12, fontWeight: 700,
      cursor: disabled ? "default" : "pointer",
      background: disabled ? "#f1f5f9" : "#3b82f6",
      color: disabled ? "#94a3b8" : "#fff",
    }}>{label}</button>
  );

  return (
    <div>
      {/* Cells */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 8, marginTop: 4 }}>
        {cur.cells.map((c, i) => (
          <div key={i} style={{
            width: 40, height: 50, borderRadius: 8, position: "relative",
            border: `2.5px solid ${c.active ? "#3b82f6" : c.star ? "#d97706" : "#e2e8f0"}`,
            background: c.active ? "#dbeafe" : c.star ? "#fef9c3" : "#f8fafc",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            transition: "background 0.15s, border-color 0.15s",
          }}>
            {c.star && (
              <div style={{ position: "absolute", top: -11, fontSize: 15, color: "#d97706", fontWeight: 800 }}>★</div>
            )}
            <div style={{ fontSize: 15, fontWeight: 800, color: c.active ? "#1e40af" : c.star ? "#92400e" : "#94a3b8" }}>
              {c.letter}
            </div>
            <div style={{ fontSize: 9.5, color: "#94a3b8", lineHeight: 1 }}>({i})</div>
          </div>
        ))}
      </div>
      {/* Step note */}
      <div style={{
        fontSize: 12, color: "#374151", textAlign: "center",
        minHeight: 38, lineHeight: 1.55, marginBottom: 8,
        padding: "7px 12px", background: "#f8fafc", borderRadius: 7,
        border: "1px solid #e2e8f0",
      }}>
        {cur.note}
      </div>
      {/* Result badge on last step */}
      {isLast && cur.result && (
        <div style={{
          borderRadius: 7, padding: "5px 10px", textAlign: "center", marginBottom: 8,
          background: cur.ok ? "#dcfce7" : "#fee2e2",
          border: `1.5px solid ${cur.ok ? "#86efac" : "#fca5a5"}`,
        }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: cur.ok ? "#15803d" : "#b91c1c" }}>
            {cur.result}
          </span>
        </div>
      )}
      {/* Prev / Next */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        {btn(isFirst, E ? "◀ Prev" : "◀ 이전", () => setSi(Math.max(0, idx - 1)))}
        <span style={{ fontSize: 11, color: "#64748b", minWidth: 44, textAlign: "center" }}>
          {idx + 1} / {stepData.length}
        </span>
        {btn(isLast, E ? "Next ▶" : "다음 ▶", () => setSi(Math.min(last, idx + 1)))}
      </div>
    </div>
  );
}

/* ── 2D 그리드 궤도 시뮬레이터 ──────────────────────────────────
   별이 그리드 위에서 ↘ 대각선으로 이동하는 궤도를 직접 보여줌.
   orbit: [[r,c]...] 궤도 칸 좌표 (별 가는 순서대로)
   stepData: ChainStepSim 과 동일 — cells[i] ↔ orbit[i]
   ─────────────────────────────────────────────────────────── */
function OrbitGridStepSim({ rows, cols, orbit, stepData, caption, E }) {
  const [si, setSi] = useState(0);
  const last = stepData.length - 1;
  const idx = si > last ? last : si < 0 ? 0 : si;  // guard: a reused instance may carry a stale index
  const cur = stepData[idx];
  const isFirst = idx === 0;
  const isLast = idx === last;
  const idxOf = {};
  orbit.forEach(([r, c], i) => { idxOf[`${r},${c}`] = i; });

  const btn = (disabled, label, onClick) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 16px", borderRadius: 7, border: "none",
      fontSize: 12, fontWeight: 700, cursor: disabled ? "default" : "pointer",
      background: disabled ? "#f1f5f9" : "#3b82f6", color: disabled ? "#94a3b8" : "#fff",
    }}>{label}</button>
  );

  const CELL = 40;
  const GAP = 6;
  const gridW = cols * CELL + (cols - 1) * GAP;
  const gridH = rows * CELL + (rows - 1) * GAP;
  const center = ([r, c]) => ({ x: c * (CELL + GAP) + CELL / 2, y: r * (CELL + GAP) + CELL / 2 });

  // The explanation pops up as a speech bubble RIGHT NEXT TO the active cell —
  // so "what's happening" and "why" appear exactly where the action is, on one screen.
  const BUB_W = 188;
  const SIDE = BUB_W + 20;          // horizontal room each side so the bubble never clips
  const VPAD = 26;                  // top breathing room
  const BOTTOM_ROOM = 128;          // room so a low bubble doesn't collide with the buttons
  const containerW = gridW + SIDE * 2;
  const containerH = VPAD + gridH + BOTTOM_ROOM;

  const activeIdxs = cur.cells.reduce((a, c, i) => (c.active ? [...a, i] : a), []);
  const fIdx = activeIdxs.length ? activeIdxs[activeIdxs.length - 1] : 0; // anchor to the cell the step is about (the last active one)
  const fCenter = center(orbit[fIdx]);
  const ax = SIDE + fCenter.x;      // active-cell centre, in container coords
  const ay = VPAD + fCenter.y;
  const focusCol = orbit[fIdx][1];
  const focusRow = orbit[fIdx][0];
  const placeRight = focusCol < cols / 2;   // bubble sits on the roomier side of the cell
  const anchorBottom = focusRow >= rows / 2; // low cells → bubble grows upward

  const failing = isLast && cur.result && !cur.ok;
  const passing = isLast && cur.result && cur.ok;
  const bubBg = failing ? "#fef2f2" : passing ? "#f0fdf4" : "#ffffff";
  const bubBorder = failing ? "#ef4444" : passing ? "#22c55e" : "#6366f1";
  const bubShadow = failing
    ? "0 10px 28px rgba(220,38,38,0.22)"
    : passing
      ? "0 10px 28px rgba(22,163,74,0.22)"
      : "0 10px 28px rgba(79,70,229,0.22)";
  const bubLeft = placeRight ? ax + CELL / 2 + 14 : ax - CELL / 2 - 14 - BUB_W;

  return (
    <div>
      {caption && (
        <div style={{ fontSize: 11, color: "#64748b", textAlign: "center", marginBottom: 8, lineHeight: 1.5 }}>
          {caption}
        </div>
      )}
      {/* Grid + floating explanation bubble anchored to the active cell */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, marginTop: 2 }}>
        <div style={{ position: "relative", width: containerW, height: containerH }}>
          {/* grid */}
          <div style={{ position: "absolute", left: SIDE, top: VPAD, width: gridW, height: gridH }}>
            {/* connecting arrows along the orbit */}
            <svg width={gridW} height={gridH} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", overflow: "visible" }}>
              <defs>
                <marker id="orbitArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#6366f1" />
                </marker>
              </defs>
              {orbit.slice(0, -1).map((_, i) => {
                const a = center(orbit[i]);
                const b = center(orbit[i + 1]);
                const dx = b.x - a.x, dy = b.y - a.y;
                const len = Math.hypot(dx, dy) || 1;
                const ux = dx / len, uy = dy / len;
                const pad = CELL / 2 + 2;
                return (
                  <line key={i}
                    x1={a.x + ux * pad} y1={a.y + uy * pad}
                    x2={b.x - ux * pad} y2={b.y - uy * pad}
                    stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3"
                    markerEnd="url(#orbitArrow)" />
                );
              })}
            </svg>
            {/* cells */}
            {Array.from({ length: rows }).map((_, r) => (
              Array.from({ length: cols }).map((_, c) => {
                const oi = idxOf[`${r},${c}`];
                const left = c * (CELL + GAP), top = r * (CELL + GAP);
                if (oi === undefined) {
                  return (
                    <div key={`${r}-${c}`} style={{
                      position: "absolute", left, top, width: CELL, height: CELL, borderRadius: 8,
                      border: "1.5px dashed #e5e7eb", background: "#fbfcfe",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 11, color: "#e2e8f0" }}>·</span>
                    </div>
                  );
                }
                const cell = cur.cells[oi];
                const isDone = cell.done && !cell.active;
                return (
                  <div key={`${r}-${c}`} style={{
                    position: "absolute", left, top, width: CELL, height: CELL, borderRadius: 8, zIndex: 1,
                    border: `2.5px solid ${cell.active ? "#3b82f6" : isDone ? "#16a34a" : cell.star ? "#d97706" : "#c7d2fe"}`,
                    background: cell.active ? "#dbeafe" : isDone ? "#dcfce7" : cell.star ? "#fef9c3" : "#eef2ff",
                    boxShadow: cell.active ? "0 0 0 4px rgba(59,130,246,0.18)" : "none",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s",
                  }}>
                    {cell.star && (
                      <div style={{ position: "absolute", top: -11, fontSize: 15, color: "#d97706", fontWeight: 800 }}>★</div>
                    )}
                    {isDone && (
                      <div style={{ position: "absolute", bottom: -9, right: -7, fontSize: 12, fontWeight: 900, color: "#16a34a" }}>✓</div>
                    )}
                    <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1, color: cell.active ? "#1e40af" : isDone ? "#15803d" : cell.star ? "#92400e" : "#6366f1" }}>
                      {cell.letter}
                    </div>
                    <div style={{ fontSize: 10, lineHeight: 1, marginTop: 2, color: "#94a3b8" }}>({oi})</div>
                  </div>
                );
              })
            ))}
          </div>

          {/* floating explanation bubble — pops up beside the active cell */}
          <div style={{
            position: "absolute", left: bubLeft, width: BUB_W,
            ...(anchorBottom ? { bottom: containerH - (ay + CELL / 2 + 6) } : { top: ay - 22 }),
            background: bubBg, border: `2px solid ${bubBorder}`, borderRadius: 11,
            padding: "10px 12px", boxShadow: bubShadow, zIndex: 5,
          }}>
            {/* pointer toward the active cell */}
            <div style={{
              position: "absolute",
              ...(anchorBottom ? { bottom: 13 } : { top: 13 }),
              ...(placeRight ? { left: -8 } : { right: -8 }),
              width: 0, height: 0,
              borderTop: "7px solid transparent", borderBottom: "7px solid transparent",
              ...(placeRight ? { borderRight: `8px solid ${bubBg}` } : { borderLeft: `8px solid ${bubBg}` }),
            }} />
            <div style={{ fontSize: 12.5, fontWeight: 500, color: "#1f2937", lineHeight: 1.55 }}>{cur.note}</div>
          </div>
        </div>
      </div>

      {/* result + reflection — rendered in a calm box BELOW the grid (never covers cells,
          never blows the bubble up). Only the short per-step note stays in the bubble. */}
      {((isLast && cur.result) || cur.why) && (
        <div style={{
          maxWidth: 560, margin: "0 auto 10px",
          background: failing ? "#fef2f2" : passing ? "#f0fdf4" : "#f8fafc",
          border: `1.5px solid ${bubBorder}`, borderRadius: 11, padding: "11px 14px",
        }}>
          {isLast && cur.result && (
            <div style={{ fontSize: 13, fontWeight: 800, color: cur.ok ? "#15803d" : "#b91c1c", marginBottom: cur.why ? 7 : 0 }}>
              {cur.result}
            </div>
          )}
          {cur.why && (
            <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {cur.why}
            </div>
          )}
        </div>
      )}
      {/* Prev / Next */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        {btn(isFirst, E ? "◀ Prev" : "◀ 이전", () => setSi(Math.max(0, idx - 1)))}
        <span style={{ fontSize: 11, color: "#64748b", minWidth: 44, textAlign: "center" }}>
          {idx + 1} / {stepData.length}
        </span>
        {btn(isLast, E ? "Next ▶" : "다음 ▶", () => setSi(Math.min(last, idx + 1)))}
      </div>
    </div>
  );
}

/* ── Sample 1 counter: walk WWB/BBB/GGG cell-by-cell, a speech bubble on the
   active cell explains its letter, and the star count adds up to 7.
   (Editable slide content — NOT a locked sim.) ── */
function Sample1Counter({ E }) {
  const grid = [["W", "W", "B"], ["B", "B", "B"], ["G", "G", "G"]];
  const order = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) order.push({ r, c, letter: grid[r][c] });
  const last = order.length; // final summary step
  const [si, setSi] = useState(0);
  const idx = Math.max(0, Math.min(si, last));
  const isFinal = idx === last;
  const active = isFinal ? null : order[idx];
  const upto = isFinal ? order.length - 1 : idx;
  let stars = 0;
  for (let k = 0; k <= upto; k++) if (order[k].letter !== "W") stars++;

  const S = 48, GAP = 6, P = S + GAP, gridW = 3 * S + 2 * GAP;
  const letterColor = (L) => L === "W" ? "#94a3b8" : L === "G" ? "#6366f1" : "#1e293b";
  const meaning = (L) => L === "W"
    ? t(E, "W = empty in both photos. 0 stars.", "W = 두 사진 다 비어. 별 0개.")
    : L === "G"
    ? t(E, "G = star in ONE photo → it was here, then left. Still 1 star! ⭐", "G = 한 사진에만 → 있다가 떠난 별. 그래도 1개! ⭐")
    : t(E, "B = star in BOTH photos → it stayed put. 1 star! ⭐", "B = 두 사진 다 → 안 떠나고 그대로 있던 별. 1개! ⭐");

  const btn = (disabled, label, onClick) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 16px", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700,
      cursor: disabled ? "default" : "pointer",
      background: disabled ? "#f1f5f9" : "#4f46e5", color: disabled ? "#94a3b8" : "#fff",
    }}>{label}</button>
  );

  return (
    <div style={{ padding: "4px 0" }}>
      <div style={{ position: "relative", width: gridW + 16 + 188, maxWidth: "100%", height: 3 * P, margin: "0 auto 10px" }}>
        {order.map((cell, i) => {
          const isAct = !isFinal && i === idx;
          const counted = i <= upto && cell.letter !== "W";
          return (
            <div key={i} style={{
              position: "absolute", left: cell.c * P, top: cell.r * P, width: S, height: S,
              borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono',monospace", fontSize: 19, fontWeight: 800,
              color: isAct ? "#fff" : letterColor(cell.letter),
              background: isAct ? "#4f46e5" : (counted ? "#eef2ff" : "#f8fafc"),
              border: `2.5px solid ${isAct ? "#4f46e5" : (counted ? "#a5b4fc" : "#e2e8f0")}`,
              boxShadow: isAct ? "0 0 0 4px rgba(79,70,229,.25)" : "none",
              transform: isAct ? "scale(1.08)" : "none", transition: "all .15s",
            }}>
              {cell.letter}
              {counted && !isAct && (
                <span style={{ position: "absolute", top: -9, right: -6, fontSize: 13, color: "#d97706" }}>★</span>
              )}
            </div>
          );
        })}
        {!isFinal && (
          <div style={{
            position: "absolute", left: gridW + 18, top: active.r * P - 2, width: 168,
            background: "#312e81", color: "#fff", borderRadius: 10, padding: "8px 11px",
            fontSize: 12, lineHeight: 1.5, fontWeight: 600,
          }}>
            <div style={{
              position: "absolute", left: -7, top: 15, width: 0, height: 0,
              borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderRight: "8px solid #312e81",
            }} />
            {meaning(active.letter)}
          </div>
        )}
        {isFinal && (
          <div style={{
            position: "absolute", left: gridW + 18, top: P, width: 168,
            background: "#dcfce7", color: "#14532d", border: "1.5px solid #16a34a",
            borderRadius: 10, padding: "8px 11px", fontSize: 12, lineHeight: 1.5, fontWeight: 700,
          }}>
            {t(E, "All done! G ×3 + B ×4 = 7 stars.", "다 셌어요! G 3개 + B 4개 = 별 7개!")}
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", marginBottom: 8, fontSize: 14, fontWeight: 800, color: "#4f46e5" }}>
        ⭐ {t(E, "stars so far", "지금까지 별")}: {stars}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        {btn(idx === 0, E ? "◀ Prev" : "◀ 이전", () => setSi(Math.max(0, idx - 1)))}
        <span style={{ fontSize: 11, color: "#64748b", minWidth: 44, textAlign: "center" }}>{idx + 1} / {last + 1}</span>
        {btn(isFinal, E ? "Next ▶" : "다음 ▶", () => setSi(Math.min(last, idx + 1)))}
      </div>
    </div>
  );
}

/* ── Rail walk: the cells (0,0)–(2,1)–(off grid) form ONE rail. A star hops just
   ONE notch (photo1 → photo2). TWO different stars share cell (2,1) — that is why
   the cells are linked into a rail and solved together. Editable slide content.
   Solid ★ = photo1 (original spot) · faint ★ = photo2 (one-notch-ahead image). ── */
function OrbitWalk({ E }) {
  const Ac = "#2563eb", AcG = "#93c5fd"; // star A (blue) solid / ghost
  const Bc = "#db2777", BcG = "#f9a8d4"; // star B (pink) solid / ghost
  const RAIL = "#d97706";
  // rail = (0,0) → (2,1) → (4,2 off-grid)
  const railHops = [[{ r:0,c:0 }, { r:2,c:1 }], [{ r:2,c:1 }, { r:4,c:2 }]];

  // each step: chips per cell { top, bottom } + active hop + gold-shared set + bubble
  const steps = [
    {
      tail: { r:0, c:0 }, hop: null, gold: new Set(), chips: {},
      bubble: t(E, "These cells are linked into ONE rail: (0,0) → (2,1) → off-grid. The arrow = where a star goes in photo 2 (one notch).",
                  "이 칸들은 한 '레일'로 이어져요: (0,0) → (2,1) → 사진 밖. 화살표 = 사진2에서 한 칸 가는 방향이에요."),
    },
    {
      tail: { r:0, c:0 }, hop: 0, gold: new Set(), bubble: t(E,
        "Star A: in photo 1 it's at (0,0). In photo 2 it moves ONE notch → (2,1). That's its only move.",
        "별 A: 사진1에선 (0,0). 사진2에선 딱 한 칸 가서 (2,1). 이게 유일한 이동이에요."),
      chips: { "0,0": { bottom: { s:"A", c:Ac } }, "2,1": { top: { s:"A", c:AcG } } },
    },
    {
      tail: { r:2, c:1 }, hop: 1, gold: new Set(), bubble: t(E,
        "A DIFFERENT star B: photo 1 at (2,1). Photo 2 → (4,2) = off the grid. It also moves just one notch.",
        "다른 별 B: 사진1에선 (2,1). 사진2는 (4,2) = 사진 밖. 얘도 딱 한 칸만 가요."),
      chips: { "2,1": { bottom: { s:"B", c:Bc } }, "4,2": { top: { s:"B", c:BcG } } },
    },
    {
      tail: { r:2, c:1 }, hop: null, gold: new Set(["2,1"]), bubble: t(E,
        "Look at (2,1): it's A's photo-2 spot AND B's photo-1 spot. Two stars share this one cell — that's why the cells are linked!",
        "(2,1)을 봐요: A의 '사진2 자리'이자 B의 '사진1 자리'예요. 한 칸을 두 별이 나눠 써요 — 그래서 칸들이 엮이는 거예요!"),
      chips: { "2,1": { top: { s:"A", c:AcG }, bottom: { s:"B", c:Bc } } },
    },
    {
      tail: null, final: true, hop: null, gold: new Set(), chips: {},
      bubble: t(E,
        "So we bundle (0,0)–(2,1)–… into one RAIL and solve it together. Many stars sit on a rail — each moves just one notch.",
        "그래서 (0,0)–(2,1)–… 를 한 '레일'로 묶어 같이 풀어요. 레일 위엔 여러 별, 각자 딱 한 칸씩만 이동!"),
    },
  ];

  const [si, setSi] = useState(0);
  const last = steps.length - 1;
  const idx = Math.max(0, Math.min(si, last));
  const cur = steps[idx];
  const S = 44, GAP = 6, P = S + GAP, gridW = 4 * S + 3 * GAP;

  const cx = (r, c) => c * P + S / 2, cy = (r, c) => r * P + S / 2;
  const line = (a, b, color, w, op, z) => {
    const x1 = cx(a.r, a.c), y1 = cy(a.r, a.c), x2 = cx(b.r, b.c), y2 = cy(b.r, b.c);
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
    return <div key={`${x1}-${y1}-${z}`} style={{
      position: "absolute", left: x1, top: y1 - w / 2, width: len, height: w,
      background: color, opacity: op, transformOrigin: "0 50%", transform: `rotate(${ang}deg)`,
      borderRadius: 2, zIndex: z,
    }} />;
  };

  const chipEl = (chip, ghost) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
      <span style={{ fontSize: ghost ? 14 : 17, color: chip.c, fontWeight: 800, opacity: ghost ? 0.85 : 1 }}>★</span>
      <span style={{ fontSize: 8, fontWeight: 800, color: chip.c }}>{chip.s}</span>
    </div>
  );

  const btn = (disabled, label, onClick) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 16px", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700,
      cursor: disabled ? "default" : "pointer",
      background: disabled ? "#f1f5f9" : "#4f46e5", color: disabled ? "#94a3b8" : "#fff",
    }}>{label}</button>
  );

  const railCells = new Set(["0,0", "2,1"]);

  return (
    <div style={{ padding: "4px 0" }}>
      <div style={{ position: "relative", width: gridW + 16 + 188, maxWidth: "100%", height: 5 * P + 6, margin: "0 auto 10px" }}>
        {/* faint full rail */}
        {railHops.map(([a, b], i) => line(a, b, RAIL, 3, 0.22, 0))}
        {/* active hop highlighted in the star's colour */}
        {cur.hop != null && line(railHops[cur.hop][0], railHops[cur.hop][1], cur.hop === 0 ? Ac : Bc, 3.5, 0.9, 1)}

        {/* 4×4 grid + off-grid cell (4,2) */}
        {[...[0,1,2,3].flatMap(r => [0,1,2,3].map(c => ({ r, c, off:false }))), { r:4, c:2, off:true }].map(({ r, c, off }) => {
          const key = `${r},${c}`;
          const chip = cur.chips[key];
          const onRail = railCells.has(key) || off;
          const isGold = cur.gold.has(key);
          return (
            <div key={key} style={{
              position: "absolute", left: c * P, top: r * P, width: S, height: S, borderRadius: 8, zIndex: 2,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
              background: off ? "#fafafa" : isGold ? "#fef3c7" : "#fff",
              border: isGold ? `2.5px solid ${RAIL}`
                : off ? "2px dashed #cbd5e1"
                : onRail ? `2px dashed ${RAIL}` : "2px solid #eef2f6",
              boxShadow: isGold ? "0 0 0 4px rgba(217,119,6,.18)" : "none",
              transition: "all .15s",
            }}>
              {chip?.top && chipEl(chip.top, true)}
              {chip?.bottom && chipEl(chip.bottom, false)}
              {!chip?.top && !chip?.bottom && (
                <span style={{ fontSize: 8, fontWeight: 700, color: off ? "#dc2626" : onRail ? RAIL : "#cbd5e1" }}>
                  {off ? "사진밖" : `(${r},${c})`}
                </span>
              )}
            </div>
          );
        })}

        {/* bubble */}
        <div style={{
          position: "absolute", left: gridW + 16,
          top: cur.tail ? Math.min(cur.tail.r * P, 3 * P) : 2 * P, width: 176,
          background: cur.final ? "#dcfce7" : "#1e3a8a", color: cur.final ? "#14532d" : "#fff",
          border: cur.final ? "1.5px solid #16a34a" : "none",
          borderRadius: 10, padding: "8px 11px", fontSize: 12, lineHeight: 1.5, fontWeight: 600, zIndex: 3,
        }}>
          {cur.tail && (
            <div style={{
              position: "absolute", left: -7, top: 15, width: 0, height: 0,
              borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderRight: "8px solid #1e3a8a",
            }} />
          )}
          {cur.bubble}
        </div>
      </div>

      {/* legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 8, fontSize: 10.5, color: "#64748b", flexWrap: "wrap" }}>
        <span><b style={{ color:"#1e293b" }}>진한 ★</b> = {t(E, "photo 1 (original)", "사진1 (원래 자리)")}</span>
        <span><b style={{ color:"#94a3b8" }}>흐린 ★</b> = {t(E, "photo 2 (one notch ahead)", "사진2 (한 칸 간 모습)")}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        {btn(idx === 0, E ? "◀ Prev" : "◀ 이전", () => setSi(Math.max(0, idx - 1)))}
        <span style={{ fontSize: 11, color: "#64748b", minWidth: 44, textAlign: "center" }}>{idx + 1} / {steps.length}</span>
        {btn(idx === last, E ? "Next ▶" : "다음 ▶", () => setSi(Math.min(last, idx + 1)))}
      </div>
    </div>
  );
}

/* ── Corner-G walk: 4×4 (phantom (-1,-1) + real grid). Step through why a corner
   G must be "a star that left" — bubble on the active cell. Editable content. ── */
function CornerGWalk({ E }) {
  const steps = [
    { focus: "g", bubble: t(E, "The corner (0,0) is G.", "모서리 칸 (0,0) 이 G 예요.") },
    { focus: "phantom", bubble: t(E, "To arrive at (0,0), a star must come from (-1,-1). But that's outside the photo — and there are NO stars outside the photo. ❌", "(0,0) 으로 별이 오려면 (-1,-1) 에서 와야 해요. 근데 거긴 사진 밖 — 사진 밖엔 별이 아예 없어요. ❌") },
    { focus: "g", bubble: t(E, "So there's no star to come in. Only ONE possibility left: a star was HERE in photo 1, then left.", "그러니 (0,0) 으로 들어올 별이 없어요. 남은 가능성은 딱 하나 — 원래 (0,0) 에 별이 있다가 떠난 것.") },
    { focus: "g", green: true, bubble: t(E, "Count this star — answer +1! ⭐", "이 별도 하나로 세요 — 답(별 개수) +1! ⭐") },
    { edge: true, bubble: t(E, "Not just the corner — EVERY cell whose 'one step back' lands off-grid is the same: the whole top row + the whole left column.", "모서리만이 아니에요 — '거꾸로 한 칸'이 사진 밖인 칸은 다 똑같아요: 맨 위 줄 + 맨 왼쪽 줄 전부 (노란 칸).") },
    { edge: true, green: true, bubble: t(E, "So none of these can be B. A B needs a star arriving from the cell behind it — but that's off-grid, so no star can come. ⛔", "그래서 이 칸들은 B 가 못 돼요. B 는 거꾸로 칸에서 별이 와줘야 하는데, 거긴 사진 밖이라 올 별이 없거든요. ⛔") },
  ];
  const [si, setSi] = useState(0);
  const last = steps.length - 1;
  const idx = Math.max(0, Math.min(si, last));
  const cur = steps[idx];
  const showStar = idx >= 2 && idx <= 3; // mark the original ★ during the corner-G beats (not the edge generalization)
  const S = 44, GAP = 4, P = S + GAP, gridW = 4 * S + 3 * GAP;
  const actDisp = (cur.green || cur.edge) ? null : (cur.focus === "phantom" ? { dr: 0, dc: 0 } : { dr: 1, dc: 1 });
  const bubbleRow = cur.edge ? 0 : actDisp ? actDisp.dr : 1;

  const btn = (disabled, label, onClick) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 16px", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700,
      cursor: disabled ? "default" : "pointer",
      background: disabled ? "#f1f5f9" : "#4f46e5", color: disabled ? "#94a3b8" : "#fff",
    }}>{label}</button>
  );

  return (
    <div style={{ padding: "4px 0" }}>
      <div style={{ position: "relative", width: gridW + 14 + 172, maxWidth: "100%", height: 4 * P, margin: "0 auto 10px" }}>
        {[0, 1, 2, 3].flatMap(dr => [0, 1, 2, 3].map(dc => {
          const isPhantom = dr === 0 && dc === 0;
          const isReal = dr >= 1 && dc >= 1;
          if (!isPhantom && !isReal) return null;
          const R = dr - 1, C = dc - 1;
          const isG = isReal && R === 0 && C === 0;
          const isAct = actDisp && actDisp.dr === dr && actDisp.dc === dc;
          const isEdge = cur.edge && isReal && (R === 0 || C === 0); // top row + left column
          return (
            <div key={`${dr},${dc}`} style={{
              position: "absolute", left: dc * P, top: dr * P, width: S, height: S, borderRadius: 6,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono',monospace",
              background: isPhantom ? "#fee2e2" : isAct ? "#4f46e5" : isEdge ? "#fef9c3" : isG ? "#cbd5e1" : "#f8fafc",
              border: isPhantom ? "2px dashed #dc2626" : `2px solid ${isAct ? "#4f46e5" : isEdge ? "#d97706" : isG ? "#94a3b8" : "#e2e8f0"}`,
              boxShadow: isAct ? "0 0 0 4px rgba(79,70,229,.25)" : "none",
              transform: isAct ? "scale(1.06)" : "none", transition: "all .15s",
            }}>
              {isPhantom ? (
                <>
                  <div style={{ fontSize: 16, lineHeight: 1, color: "#991b1b" }}>❌</div>
                  <div style={{ fontSize: 7.5, color: "#991b1b", fontWeight: 700 }}>(-1,-1)</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: isG ? 15 : 9, fontWeight: 800, color: isAct ? "#fff" : isG ? "#1e293b" : "#cbd5e1" }}>{isG ? "G" : "·"}</div>
                  <div style={{ fontSize: 7.5, color: isAct ? "#e0e7ff" : "#94a3b8" }}>({R},{C})</div>
                  {isG && showStar && (
                    <div style={{ position: "absolute", top: -10, right: -8, fontSize: 17, color: "#d97706", lineHeight: 1 }}>★</div>
                  )}
                </>
              )}
            </div>
          );
        }))}
        <div style={{
          position: "absolute", left: gridW + 14, top: bubbleRow * P, width: 168,
          background: cur.green ? "#dcfce7" : "#1e3a8a", color: cur.green ? "#14532d" : "#fff",
          border: cur.green ? "1.5px solid #16a34a" : "none",
          borderRadius: 10, padding: "8px 11px", fontSize: 12, lineHeight: 1.5, fontWeight: 600,
        }}>
          {!cur.green && !cur.edge && (
            <div style={{
              position: "absolute", left: -7, top: 15, width: 0, height: 0,
              borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderRight: "8px solid #1e3a8a",
            }} />
          )}
          {cur.bubble}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        {btn(idx === 0, E ? "◀ Prev" : "◀ 이전", () => setSi(Math.max(0, idx - 1)))}
        <span style={{ fontSize: 11, color: "#64748b", minWidth: 44, textAlign: "center" }}>{idx + 1} / {steps.length}</span>
        {btn(idx === last, E ? "Next ▶" : "다음 ▶", () => setSi(Math.min(last, idx + 1)))}
      </div>
    </div>
  );
}

/* ── Predecessor peek: a star at (2,2) → step back (up=down, left=right) → (1,1).
   Shows "the cell a star came from" with a bubble. Editable slide content. ── */
function PredecessorPeek({ E }) {
  const steps = [
    { focus: { r: 2, c: 2 }, pred: false, bubble: t(E, "In photo 2, a star sits at (2,2).", "사진 2 에서 별이 (2,2) 에 있어요.") },
    { focus: { r: 1, c: 1 }, pred: true, bubble: t(E, "Step back the same move (up 1, left 1) → (1,1). The star came from here!", "한 칸 거꾸로 (위 1, 왼 1) → (1,1). 별은 여기서 왔어요!") },
    { final: true, pred: true, bubble: t(E, "predecessor = (r − down, c − right) — the cell a star came from.", "직전 칸 = (r − down, c − right) — 별이 온 칸이에요.") },
  ];
  const [si, setSi] = useState(0);
  const last = steps.length - 1;
  const idx = Math.max(0, Math.min(si, last));
  const cur = steps[idx];
  const S = 46, GAP = 5, P = S + GAP, gridW = 3 * S + 2 * GAP;

  const btn = (disabled, label, onClick) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 16px", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700,
      cursor: disabled ? "default" : "pointer",
      background: disabled ? "#f1f5f9" : "#4f46e5", color: disabled ? "#94a3b8" : "#fff",
    }}>{label}</button>
  );

  return (
    <div style={{ padding: "4px 0" }}>
      <div style={{ position: "relative", width: gridW + 16 + 176, maxWidth: "100%", height: 3 * P, margin: "6px auto 10px" }}>
        {[0, 1, 2].flatMap(r => [0, 1, 2].map(c => {
          const isStar = r === 2 && c === 2;
          const isPred = r === 1 && c === 1 && cur.pred;
          const isAct = !cur.final && cur.focus.r === r && cur.focus.c === c;
          return (
            <div key={`${r},${c}`} style={{
              position: "absolute", left: c * P, top: r * P, width: S, height: S, borderRadius: 8,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              background: isAct ? "#4f46e5" : isPred ? "#fef9c3" : isStar ? "#eef2ff" : "#f8fafc",
              border: `2px solid ${isAct ? "#4f46e5" : isPred ? "#facc15" : isStar ? "#a5b4fc" : "#e2e8f0"}`,
              boxShadow: isAct ? "0 0 0 4px rgba(79,70,229,.25)" : "none",
              transform: isAct ? "scale(1.08)" : "none", transition: "all .15s",
            }}>
              {isStar && <div style={{ fontSize: 19, color: isAct ? "#fff" : "#d97706", lineHeight: 1 }}>★</div>}
              {isPred && !isStar && <div style={{ fontSize: 18, color: isAct ? "#fff" : "#a16207", lineHeight: 1 }}>↖</div>}
              <div style={{ fontSize: 8, fontWeight: 700, color: isAct ? "#e0e7ff" : "#94a3b8" }}>({r},{c})</div>
            </div>
          );
        }))}
        <div style={{
          position: "absolute", left: gridW + 16, top: cur.final ? P : cur.focus.r * P, width: 168,
          background: cur.final ? "#dcfce7" : "#1e3a8a", color: cur.final ? "#14532d" : "#fff",
          border: cur.final ? "1.5px solid #16a34a" : "none",
          borderRadius: 10, padding: "8px 11px", fontSize: 12, lineHeight: 1.5, fontWeight: 600,
        }}>
          {!cur.final && (
            <div style={{
              position: "absolute", left: -7, top: 15, width: 0, height: 0,
              borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderRight: "8px solid #1e3a8a",
            }} />
          )}
          {cur.bubble}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        {btn(idx === 0, E ? "◀ Prev" : "◀ 이전", () => setSi(Math.max(0, idx - 1)))}
        <span style={{ fontSize: 11, color: "#64748b", minWidth: 44, textAlign: "center" }}>{idx + 1} / {steps.length}</span>
        {btn(idx === last, E ? "Next ▶" : "다음 ▶", () => setSi(Math.min(last, idx + 1)))}
      </div>
    </div>
  );
}

export function makeAstralCh1(E) {
  return [
    /* 1-0 — Hook: visual story first (before any formal text). */
    {
      type: "reveal",
      narr: t(E,
        "First, watch ONE star move between two photos. Bessie the cow took a night-sky photo, waited, then took another. Stars either disappear OR slide right/down by a fixed amount. Try the toggles — see what the COMPOSITE looks like.",
        "먼저 그림으로 봐요. 별 한 개가 두 사진 사이에서 어떻게 움직이는지. Bessie 라는 소가 밤하늘을 두 번 찍었어요. 별은 사라지거나, 정해진 만큼 오른쪽·아래로 슬쩍 이동. 아래 토글 눌러보면서 합성이 어떻게 만들어지는지 봐요."),
      content: (
        <div>
          <div style={{ padding: "12px 16px 0", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 2 }}>🔭🐄</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#4f46e5" }}>
              {t(E, "Bessie's two telescope photos", "Bessie 의 두 망원경 사진")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "Toggle ★ move/disappear, switch (right, down) presets",
                    "★ 이동/사라짐 토글, (오른쪽, 아래) 프리셋 변경 가능")}
            </div>
          </div>
          <AstralChainDiscovery E={E} />
        </div>
      ),
    },

    /* 1-1 — Problem statement. */
    {
      type: "reveal",
      narr: t(E,
        "You just saw one star move. Now let's nail down the exact rules. 👇",
        "방금 별 하나가 움직이는 걸 봤죠. 이제 정확한 규칙을 정리해요 👇"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔭</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#4f46e5" }}>Astral Superposition</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2025 Bronze #1</div>
          </div>

          <div style={{ background: "#eef2ff", border: "1px solid #a5b4fc", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#312e81", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>

            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E, "Bessie took two photos of an N×N sky. Between the two photos, each star EITHER disappeared OR moved by a fixed amount (right by 'right' cells and down by 'down' cells). Stars that move off the grid are lost. The two photos are combined into one composite:",
                    "Bessie 가 N×N 하늘을 두 번 찍음. 두 사진 사이에 별마다 사라지거나, 정해진 만큼 오른쪽과 아래로 이동. 화면 밖으로 나간 별은 사라짐. 두 사진을 합쳐서:")}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8, marginBottom: 10 }}>
              <div style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
                <code style={{ background: "#fff", padding: "2px 8px", borderRadius: 3, fontWeight: 600, fontSize: 14, border: "1px solid #cbd5e1" }}>W</code>
                {t(E, " — empty in BOTH photos.", " — 둘 다 비어있음.")}
              </div>
              <div style={{ background: "#fff", border: "1px solid #94a3b8", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
                <code style={{ background: "#cbd5e1", padding: "2px 8px", borderRadius: 3, fontWeight: 600, fontSize: 14 }}>G</code>
                {t(E, " — star in EXACTLY ONE photo.", " — 정확히 한 사진에만.")}
              </div>
              <div style={{ background: "#fff", border: "1px solid #475569", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
                <code style={{ background: "#1e293b", color: "#fff", padding: "2px 8px", borderRadius: 3, fontWeight: 600, fontSize: 14 }}>B</code>
                {t(E, " — star in BOTH photos.", " — 두 사진 모두.")}
              </div>
            </div>

            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, padding: "8px 10px", background: "#fff", border: "1.5px solid #a5b4fc", borderRadius: 8 }}>
              <b style={{ color: "#312e81" }}>{t(E, "Goal", "목표")}:</b>{" "}
              {t(E, "Print the MINIMUM number of stars in the FIRST photo (the original sky) consistent with the composite. If no consistent assignment exists, print -1.",
                    "합친 그림과 맞아떨어지는 첫 사진 (원래 하늘) 의 별 가장 적은 개수를 답으로. 맞는 배치가 없으면 -1.")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}</b> {t(E, "(N = grid size, T = # of puzzles)", "(N = 사진 크기, T = 퍼즐 개수)")}:{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 1000</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>0 ≤ right, down ≤ N</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ T ≤ 1000</code>
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample 1 (A=B=0). */
    {
      type: "reveal",
      narr: t(E,
        "Now the rules are clear — let's warm up with the EASIEST case: stars don't move. Count the stars one cell at a time. 👇",
        "규칙을 알았으니 제일 쉬운 경우부터 — 별이 아예 안 움직이면? 아래에서 별을 한 칸씩 세어 봐요 👇"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#4f46e5", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — right = down = 0 (stars don't move)", "샘플 1 — right = down = 0 (별이 안 움직임)")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`1
3 0 0
WWB
BBB
GGG`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`7`}
              </div>
            </div>
          </div>

          <div style={{ background: "#eef2ff", border: "1px solid #a5b4fc", borderRadius: 10, padding: 12 }}>
            <div style={{ fontWeight: 600, color: "#312e81", marginBottom: 4, fontSize: 12.5 }}>
              🔍 {t(E, "Count the stars — one cell at a time", "별을 한 칸씩 세어봐요")}
            </div>
            <div style={{ fontSize: 11.5, color: C.dim, marginBottom: 6 }}>
              {t(E, "Stars don't move, so photo 2 = photo 1. Press 다음 ▶ and watch each cell.",
                    "별이 안 움직이니 사진 2 = 사진 1. 다음 ▶ 누르며 칸을 하나씩 봐요.")}
            </div>
            <Sample1Counter E={E} />
          </div>
        </div>),
    },

    /* 1-3.4a — Visual: corner G has no incoming source */
    {
      type: "reveal",
      narr: t(E,
        "Easy case done. Now stars MOVE — and a corner G gets tricky. Step through it below. 👇",
        "쉬운 경우는 끝. 이번엔 별이 움직여요 — 모서리 G 가 까다로워져요. 아래에서 한 칸씩 따라가 봐요 👇"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              📍 {t(E, "Corner G — predecessor off-grid", "모서리 G — 이전 칸 사진 밖")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "Star moves: right 1, down 1. The dashed cell is outside the grid.",
                    "별 이동: 오른쪽 1, 아래 1. 점선 칸은 사진 밖.")}
            </div>
          </div>

          <CornerGWalk E={E} />
        </div>
      ),
    },

    /* 1-3.4 — Off-grid insight: G at the corner forces case (a) */
    {
      type: "quiz",
      narr: t(E,
        "Now you pick the answer. 👇",
        "방금 본 거, 직접 골라봐요 👇"),
      question: t(E,
        "The corner (0,0) is G. How did it become G?",
        "모서리 칸 (0,0) 이 G 예요. 어떻게 G 가 됐을까요?"),
      options: [
        t(E, "A star was here at the start, then left.",
            "처음부터 이 칸에 별이 있었는데, 떠난 거."),
        t(E, "A star came from outside the grid.",
            "사진 밖에서 별이 들어옴."),
        t(E, "Impossible — this corner can't be G.",
            "불가능 — 이 모서리는 G 가 될 수 없어."),
      ],
      correct: 0,
      explain: t(E,
        "Yes! No star could come from outside the grid — so the ONLY way is a star was here at the start, then left.",
        "맞아요! 사진 밖에서 별이 들어올 수가 없으니까 — 가능한 건 처음부터 별이 있었다가 떠난 경우 뿐이에요."),
    },

    /* 1-2.5 + 1-2.6 MOVED to Ch2 (2026-06-16): the full-algorithm sim and the
       W/G/B rule summary belong after the methods + greedy win, not in the
       problem chapter. They now live in Ch2 right after 2-3.06, before 2-G0. */

    /* 1-3.0 — s/in playground REMOVED (2026-06-01) — was redundant with the visual summary
       above (1-2.6). The s/in formal notation is reintroduced in Ch2 where it is actually used. */


    /* 1-3.1/2/3 — W/B/G individual quizzes REMOVED (2026-06-01) — redundant after the
       visual summary table (1-2.6). The application quizzes that follow (corner G, when -1,
       tiny input) already verify understanding by *using* the W/B/G rules in new contexts. */

    /* 1-3.9 — REMOVED (2026-06-02): 3×3 grid with arrows was redundant with 1-3.4a
       (corner G visual). Same "거꾸로 가면 사진 밖" message. The 1-4 question now stands alone. */

    /* 1-4 — Quiz: when is -1? */
    {
      type: "quiz",
      narr: t(E,
        "Now you pick it. 👇",
        "직접 골라봐요 👇"),
      question: t(E,
        "Stars move right 1, down 1. Which cell can NEVER be B?",
        "별이 오른쪽 1, 아래 1 로 움직여요. 어느 칸이 절대 B 가 될 수 없을까요?"),
      options: [
        "(0, 0)",
        "(1, 1)",
        "(2, 2)",
      ],
      correct: 0,
      explain: t(E,
        "(0,0) would need a star from (-1,-1) — that's outside the grid. So no incoming star possible → B can't form. (1,1) and (2,2) have valid earlier cells in the grid, so B is fine there.",
        "(0,0) 는 (-1,-1) 에서 별이 와야 하는데 거긴 사진 밖. 그래서 들어올 별 없음 → B 못 만듦. (1,1) 과 (2,2) 는 거꾸로 간 자리가 사진 안이라 B 가능."),
    },

    /* 1-5 — REMOVED (2026-06-02): Tiny input quiz on the "stars don't move" case was
       redundant with slide 1-2 which already walks through Sample 1 (A=B=0, answer=7).
       Ch1 now ends with the corner-B quiz (1-4) which actively applies the W/B/G rules. */
  ];
}

export function makeAstralCh2(E, lang = "py") {
  const sections = getAstralSections(E);
  const sectionStep = (sec, narr = "") => ({
    type: "reveal",
    narr,
    content: (<CodeSectionView section={sec} lang={lang} E={E} />),
  });

  return [
    /* 2-0 — 궤도(chain)이 뭔지: 별 하나의 경로 (right=1, down=2 예시) */
    {
      type: "reveal",
      narr: t(E,
        "A star moves just ONE notch (photo 1 → photo 2).\nBut the cells line up like a rail — many stars ride it, one notch each. Watch below 👇",
        "별은 딱 한 칸만 움직여요 (사진1 → 사진2).\n그런데 칸들이 레일처럼 이어져서, 여러 별이 한 칸씩 올라타요. 아래에서 봐요 👇"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#1e3a8a", marginBottom: 2, textAlign: "center" }}>
            {t(E, "A rail of cells (right=1, down=2)", "칸들이 이어진 레일 (right=1, down=2)")}
          </div>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10, textAlign: "center" }}>
            {t(E, "Press 다음 ▶ — each star hops just one notch.", "다음 ▶ 누르며 별이 각자 한 칸씩만 가는 걸 봐요.")}
          </div>

          <OrbitWalk E={E} />
        </div>
      ),
    },

    /* 2-0a — 독립성: 궤도끼리 완전히 독립 */
    {
      type: "reveal",
      narr: t(E,
        "Each star stays on its OWN colour (orbit) — different colours never meet. So solve each colour, then add them up. 👇",
        "별은 자기 색(궤도)만 밟아요 — 다른 색끼리 절대 안 만나요. 그러니 색마다 따로 풀고 더하면 끝! 👇"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#1e3a8a", marginBottom: 12, textAlign: "center" }}>
            {t(E, "Every cell painted by its orbit", "칸마다 자기 궤도 색으로 칠하기")}
          </div>

          {/* All chains colored grid — right=1, down=2 */}
          {(() => {
            // right=1, down=2 in 4×4 grid → chain ID per cell
            // Chain 0: (0,0)↔(2,1)  Chain 1: (0,1)↔(2,2)  Chain 2: (0,2)↔(2,3)
            // Chain 3: (0,3) alone   Chain 4: (1,0)↔(3,1)  Chain 5: (1,1)↔(3,2)
            // Chain 6: (1,2)↔(3,3)  Chain 7: (1,3) alone   Chain 8: (2,0) alone  Chain 9: (3,0) alone
            const cid = [
              [0, 1, 2, 3],
              [4, 5, 6, 7],
              [8, 0, 1, 2],
              [9, 4, 5, 6],
            ];
            const CC = [
              { bg:"#dbeafe", bd:"#3b82f6" }, // 0 blue
              { bg:"#dcfce7", bd:"#16a34a" }, // 1 green
              { bg:"#fef9c3", bd:"#d97706" }, // 2 amber
              { bg:"#ede9fe", bd:"#8b5cf6" }, // 3 purple
              { bg:"#fce7f3", bd:"#ec4899" }, // 4 pink
              { bg:"#e0f2fe", bd:"#0891b2" }, // 5 cyan
              { bg:"#fff7ed", bd:"#f97316" }, // 6 orange
              { bg:"#fef2f2", bd:"#ef4444" }, // 7 red
              { bg:"#f0fdf4", bd:"#22c55e" }, // 8 lime
              { bg:"#f5f3ff", bd:"#7c3aed" }, // 9 violet
            ];
            // same-chain cells share color — shows independence visually
            return (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:10 }}>
                {cid.map((row, r) => (
                  <div key={r} style={{ display:"flex", gap:5, marginBottom:5 }}>
                    {row.map((ci, c) => (
                      <div key={c} style={{
                        width:50, height:50, borderRadius:8,
                        background: CC[ci].bg,
                        border: `2.5px solid ${CC[ci].bd}`,
                      }} />
                    ))}
                  </div>
                ))}
                <div style={{ fontSize:11.5, color:"#64748b", marginTop:6 }}>
                  {t(E,"each cell has exactly one color — no cell is in two orbits","칸마다 색이 딱 하나 — 두 궤도에 동시에 속하는 칸은 없어요")}
                </div>
              </div>
            );
          })()}

          {/* Concrete sum — solve each, then add */}
          <div style={{
            background:"#f0fdf4", border:"2px solid #16a34a", borderRadius:8,
            padding:"10px 14px", textAlign:"center",
          }}>
            <div style={{ fontSize:12.5, fontWeight:700, color:"#14532d", marginBottom:7 }}>
              {t(E,"So break the big puzzle into small ones, solve each, then add:",
                   "그래서 큰 문제를 작은 문제로 쪼개고, 하나씩 푼 다음 더해요:")}
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, flexWrap:"wrap", fontSize:12, fontWeight:800 }}>
              <span style={{ background:"#dbeafe", border:"2px solid #3b82f6", borderRadius:6, padding:"3px 8px", color:"#1e40af" }}>
                {t(E,"blue answer","파란 궤도 답")}
              </span>
              <span style={{ color:"#16a34a" }}>+</span>
              <span style={{ background:"#dcfce7", border:"2px solid #16a34a", borderRadius:6, padding:"3px 8px", color:"#14532d" }}>
                {t(E,"green answer","초록 궤도 답")}
              </span>
              <span style={{ color:"#16a34a" }}>+ … =</span>
              <span style={{ background:"#fef9c3", border:"2px solid #d97706", borderRadius:6, padding:"3px 8px", color:"#92400e" }}>
                {t(E,"whole answer","전체 답")}
              </span>
            </div>
          </div>

        </div>
      ),
    },

    /* 2-0b — 3가지 방법 로드맵 */
    {
      type: "reveal",
      narr: t(E,
        "OK — chains are independent, so we just need to solve ONE chain. How? 3 approaches.",
        "OK — 궤도끼리 독립이니까, 한 궤도만 풀면 돼요. 어떻게? 3 가지 방법이에요."),
      content: (
        <div style={{ padding: 14 }}>

          <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7 }}>
            {t(E, "3 ways to solve a single chain (next slides):", "한 궤도를 어떻게 풀까요? 3 가지 방법 (다음 슬라이드):")}
          </div>
          {[
            {
              num: "①", icon: "➡️",
              label: t(E, "Left → right (greedy)", "앞→뒤 그리디(greedy)"),
              desc: t(E, "Walk the orbit one cell at a time, start → end. Fast — but misses some cases.", "궤도를 한 칸씩 시작→끝으로. 빠르지만 가끔 틀려요."),
              badge: t(E, "✗ sometimes wrong", "✗ 가끔 틀림"),
              bg: "#fef2f2", border: "#fca5a5", tc: "#991b1b",
            },
            {
              num: "②", icon: "⬅️",
              label: t(E, "Right → left (greedy) — our solution", "뒤→앞 그리디(greedy) — 우리 풀이"),
              desc: t(E, "Flip direction — walk end → start. Always correct. This is the code we'll write. USACO 12/12 ✓", "방향 뒤집기 — 끝→시작. 항상 정답. 이게 우리가 짤 코드예요. USACO 12/12 ✓"),
              badge: t(E, "★ main", "★ 메인"),
              bg: "#f0fdf4", border: "#86efac", tc: "#14532d",
            },
            {
              num: "③", icon: "💡",
              label: t(E, "All combinations + DP (bonus)", "모든 경우 → DP (보너스)"),
              desc: t(E, "Optional. A different angle on the same problem — robust to harder variants.", "선택. 같은 문제를 다른 각도로 — 더 어려운 변형에 강해요."),
              badge: t(E, "optional", "선택"),
              bg: "#ede9fe", border: "#c4b5fd", tc: "#4c1d95",
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: item.bg, border: `1.5px solid ${item.border}`,
              borderRadius: 8, padding: "7px 11px", marginBottom: 6,
              display: "flex", gap: 10, alignItems: "flex-start",
            }}>
              <div style={{ fontSize: 14, marginTop: 1 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.tc, marginBottom: 2 }}>
                  {item.num} {item.label}
                </div>
                <div style={{ fontSize: 11.5, color: item.tc, opacity: 0.85, lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, color: item.tc,
                background: item.border, borderRadius: 6, padding: "2px 7px",
                whiteSpace: "nowrap", marginTop: 2, opacity: 0.8,
              }}>
                {item.badge}
              </div>
            </div>
          ))}
          {/* greedy 한 줄 설명 — 단어가 처음 나오는 자리라 간단히 (자세히는 다음 슬라이드) */}
          <div style={{ marginTop: 8, fontSize: 11.5, color: "#6b7280", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 11px", lineHeight: 1.6 }}>
            💡 {t(E,
              "Greedy (그리디) = decide by looking only at what's right in front of you, without thinking ahead. Details next slide.",
              "그리디(greedy) = 뒤는 안 보고 지금 눈앞만 보고 바로 정하는 방법. 자세한 건 다음 슬라이드에서.")}
          </div>
        </div>
      ),
    },


    /* 2-0.5 — Greedy 개념 설명: "욕심쟁이 방법이 뭔데?" */
    {
      type: "reveal",
      narr: t(E,
        "Before the simulations — what does 'greedy' mean? 👇",
        "시뮬 전에 — '그리디(greedy)'가 뭔지 알아봐요. 👇"),
      content: (
        <div style={{ padding: 14 }}>
          {/* Daily life example */}
          <div style={{ background: "#fef9c3", border: "2px solid #f59e0b", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>
              🪙 {t(E, "Example: making change with fewest coins", "예시: 동전 최소 개수로 거스름돈 주기")}
            </div>
            <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.7 }}>
              {t(E,
                "Need to give 380 won change. Greedy rule: 'use the biggest coin that fits right now!'",
                "380원을 거슬러줘야 해요. 그리디 규칙: '지금 쓸 수 있는 가장 큰 동전부터!'")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
              {[
                { coin: "500원", fits: false, note: t(E,"too big","너무 커") },
                { coin: "100원", fits: true,  note: "→ 280" },
                { coin: "100원", fits: true,  note: "→ 180" },
                { coin: "100원", fits: true,  note: "→ 80" },
                { coin: "50원",  fits: true,  note: "→ 30" },
                { coin: "10원",  fits: true,  note: "→ 20" },
                { coin: "10원",  fits: true,  note: "→ 10" },
                { coin: "10원",  fits: true,  note: "→ 0 ✓" },
              ].map((c, i) => (
                <div key={i} style={{
                  background: c.fits ? "#fef3c7" : "#f1f5f9",
                  border: `1.5px solid ${c.fits ? "#f59e0b" : "#e2e8f0"}`,
                  borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700,
                  color: c.fits ? "#92400e" : "#94a3b8",
                  textDecoration: c.fits ? "none" : "line-through",
                }}>
                  {c.coin} <span style={{ fontWeight: 400, fontSize: 10 }}>{c.note}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11.5, marginTop: 6, color: "#78350f", fontWeight: 700 }}>
              {t(E, "Result: 7 coins. Each step: just pick the biggest that fits. No planning ahead!",
                 "결과: 7개. 매 순간 '지금 쓸 수 있는 가장 큰 동전'만 골랐어요. 미래 계획 없음!")}
            </div>
          </div>

          {/* fast-but-sometimes-wrong — one line (teaser for next slide) */}
          <div style={{ fontSize: 12, color: "#44403c", lineHeight: 1.6, background: "#fafaf9", border: "1.5px solid #d6d3d1", borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
            ⚡ {t(E,
              "Fast and short to code — but it only looks at NOW, so it can be wrong. (We'll see that next. 👀)",
              "⚡ 빠르고 코드도 짧아요 — 근데 눈앞만 봐서 가끔 틀려요. (다음 슬라이드에서 봐요 👀)")}
          </div>

          {/* In this problem */}
          <div style={{ background: "#eff6ff", border: "2px solid #3b82f6", borderRadius: 10, padding: "10px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#1e3a8a", marginBottom: 6 }}>
              ⭐ {t(E, "Greedy in this problem", "이 문제에서 그리디")}
            </div>
            <div style={{ fontSize: 12, color: "#1e40af", lineHeight: 1.7 }}>
              {t(E,
                "Scan cells one by one. At each cell: look only at this cell's type and the neighboring star — then decide whether to place a star. No looking ahead at future cells.",
                "칸을 하나씩 봐요. 각 칸에서: 이 칸의 종류와 바로 옆 칸에 별이 있는지만 보고, 별을 놓을지 즉시 결정해요. 뒤에 뭐가 오는지는 안 봐요.")}
            </div>
          </div>

          {/* Closing line — leads into the hands-on simulations (no spoilers) */}
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#475569", textAlign: "center", marginTop: 4 }}>
            {t(E, "Now let's actually try it on an orbit, step by step →",
                 "이제 궤도에 직접 한 칸씩 적용해봐요 →")}
          </div>
        </div>
      ),
    },

    /* Structure (2026-06-02): Ch2 follows "overview → each method in detail → code".
       2-0 = method overview, 2-3.05~2-3.3 = each method's detail, THEN code starts. */

    /* 2-2 moved later — see right before 2-5 (full code). The edge case (stars don't move)
       comes AFTER the main algorithm so students see the interesting flow first. */

    /* 2-3.05 — Forward Greedy (smart rule) failing on G G B: B starves because forward locks in the earlier cell before seeing the B */
    {
      type: "reveal",
      narr: t(E,
        "First let's try the obvious order — front → back. Does it hold? 👇",
        "당연한 순서부터 해봐요 — 앞 → 뒤. 끝까지 잘 될까요? 👇"),
      content: (
        <div style={{ padding: 14 }}>
          {/* One-line plan banner — the per-step bubbles below carry the rule details */}
          <div style={{
            background: "#ecfeff", border: "1.5px solid #67e8f9", borderRadius: 999,
            padding: "8px 16px", marginBottom: 14, textAlign: "center",
            fontSize: 12.5, color: "#155e75", lineHeight: 1.5,
          }}>
            ➡️ <b>{t(E, "My plan", "내 작전")}:</b> {t(E,
              "front → back — at a G with no star arriving, drop ★ and pass it to the next cell. Will it hold?",
              "앞에서부터 — 별 안 오는 G엔 ★ 놓고 그 별을 다음 칸으로 보내기. 끝까지 잘 될까?")}
          </div>

          {/* Interactive 2D-grid simulation — star moves ↘ along the orbit */}
          <OrbitGridStepSim
            key="fwd-greedy" E={E}
            rows={5} cols={5} orbit={[[0,0],[2,1],[4,2]]}
            caption={t(E,
              "Follow just the blue-arrow line (one orbit). Gray cells = other orbits.",
              "파란 화살표 한 줄(= 궤도)만 따라가요. 회색 칸은 다른 궤도예요.")}
            stepData={[
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "Orbit G G B — no stars placed yet (G = star in ONE photo, B = star in BOTH). Start at cell (0) and follow the orbit to the end.", "궤도 G G B — 아직 별을 안 놓은 상태 (G = 한 사진에만 별, B = 두 사진 모두 별). 시작 칸 (0) 부터 끝 (2) 으로 별이 가는 방향을 따라가요.")
            },
            {
              cells: [{letter:"G",star:true,active:true},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "G(0): nothing arrives here (it's the start) → place ★. This star will travel to G(1) in photo 2.", "G(0): 여기엔 별이 안 와요 (시작 칸) → ★ 놓기. 이 별은 사진 2에서 G(1) 으로 가요.")
            },
            {
              cells: [{letter:"G",star:true,active:false,done:true},{letter:"G",star:false,active:true},{letter:"B",star:false,active:false}],
              note: t(E, "G(1): the star from G(0) arrives here in photo 2 → already satisfied → skip. (Looks efficient — one star covered two cells!)", "G(1): G(0) 별이 사진 2에서 여기로 와요 → 이미 OK → 통과. (별 하나로 두 칸 해결, 똑똑해 보이죠!)")
            },
            {
              cells: [{letter:"G",star:true,active:false,done:true},{letter:"G",star:false,active:true},{letter:"B",star:false,active:true}],
              note: t(E, "B(2): to fill photo 2, G(1) must SEND a star here. But G(1) was filled for free — it has no star to send. 💥", "B(2): 사진2 를 채우려면 G(1) 이 별을 보내줘야 해요. 그런데 G(1) 은 공짜로 때워서 보낼 별이 없어요. 💥"),
              why: t(E,
                "A B means: 'the cell right before me MUST hold a star.' But going front→back, we used up that cell (G(1)) for free before we ever met the B — so no star was left to send.\n→ To settle a B's demand first, we must sweep from the END, backward. (The puzzle is fine — 3 stars solve it, NOT -1.)",
                "B 는 '바로 앞 칸에 별이 꼭 있어야 한다'는 명령이에요. 그런데 앞에서부터 가면, B 를 만나기도 전에 그 앞 칸(G(1)) 을 공짜로 때워서 보낼 별이 안 남아요.\n→ 명령(B)부터 먼저 들어주려면 끝에서부터 거꾸로 가야 해요. (퍼즐은 멀쩡해요 — 별 3개면 풀려요, -1 아님.)"),
              result: t(E, "Stuck — the forward plan is wrong ✗ (the answer is NOT -1!)", "막혔어요 — 앞→뒤 작전이 틀렸어요 ✗ (답은 -1 아니에요!)"),
              ok: false,
            },
          ]} />
        </div>
      ),
    },

    /* 2-3.06 — Backward Greedy on same G G B: meets B first, gives it the star it pulls on → 3 stars ✓. Verified 12/12 USACO. */
    {
      type: "reveal",
      narr: t(E,
        "Same orbit — just flip the direction: end → start. This time it works. 👇",
        "같은 궤도인데 — 방향만 뒤집어요: 끝 → 시작. 이번엔 풀려요. 👇"),
      content: (
        <div style={{ padding: 14 }}>
          {/* One-line plan banner — the per-step bubbles below carry the rule details */}
          <div style={{
            background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 999,
            padding: "8px 16px", marginBottom: 14, textAlign: "center",
            fontSize: 12.5, color: "#14532d", lineHeight: 1.5,
          }}>
            ⬅️ <b>{t(E, "Backward plan", "거꾸로 작전")}:</b> {t(E,
              "end → start — the moment you hit a B, put ★ on the cell just before it. Does it still get stuck?",
              "끝에서부터 — B를 만나면 바로 앞 칸에 ★ 먼저 놓기. 이번엔 안 막힐까?")}
          </div>

          {/* 🔑 The one-liner that makes "why backward" click: B = forced, G = choice. */}
          <div style={{
            background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 10,
            padding: "10px 13px", marginBottom: 14, fontSize: 12.5, color: "#92400e", lineHeight: 1.65,
          }}>
            🔑 <b>{t(E, "Why backward? In one line:", "왜 거꾸로? 한 줄로:")}</b>{" "}
            {t(E,
              "B = forced (the cell before it MUST hold a star). G = a choice. Settle the forced B's first — and they point backward — so sweep from the end. Watch it below. 👇",
              "B = 강제 (앞 칸에 별이 반드시 있어야 함). G = 선택. 강제인 B 부터 정하는데 — 그건 뒤를 가리켜요 — 그러니 끝에서부터 훑어요. 아래에서 봐요 👇")}
          </div>

          {/* Interactive 2D-grid simulation — same orbit, walked end → start */}
          <OrbitGridStepSim
            key="bwd-greedy" E={E}
            rows={5} cols={5} orbit={[[0,0],[2,1],[4,2]]}
            caption={t(E,
              "Same orbit — but walk it backward, from the END (2) toward the start (0).",
              "같은 궤도인데 — 이번엔 거꾸로, 끝 (2) → 시작 (0) 방향으로 가요.")}
            stepData={[
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "Same orbit G G B — no stars placed yet. This time start at the end (2) and go back to (0).", "같은 궤도 G G B — 아직 별 안 놓음. 이번엔 끝 칸 (2) 부터 시작 (0) 으로 거꾸로 가요.")
            },
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:true,active:false},{letter:"B",star:true,active:true}],
              note: t(E, "B(2): B cell — ★ here AND ★ at the cell before it, G(1). Now G(1)'s star will travel to B(2) in photo 2 ✓", "B(2): B 칸 → 여기 ★ + 바로 앞 G(1)에도 ★. 이제 G(1) 별이 사진 2에서 B(2)로 와줘요 ✓")
            },
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:true,active:true},{letter:"B",star:true,active:false,done:true}],
              note: t(E, "G(1): already has ★ → skip, already satisfied.", "G(1): 이미 ★ 있음 → 통과, 조건 OK.")
            },
            {
              cells: [{letter:"G",star:true,active:true},{letter:"G",star:true,active:false,done:true},{letter:"B",star:true,active:false,done:true}],
              note: t(E, "G(0): no ★, and it's the start (no cell before it) → place ★ here directly.", "G(0): ★ 없음. 앞 칸이 없는 시작 칸 → 여기에 직접 ★.")
            },
            {
              cells: [{letter:"G",star:true,active:false,done:true},{letter:"G",star:true,active:false,done:true},{letter:"B",star:true,active:false,done:true}],
              note: t(E, "Done! G(0)★, G(1)★, B(2)★ = 3 stars. Every cell satisfied ✓", "완료! G(0)★, G(1)★, B(2)★ = 별 3개. 모든 칸 조건 OK ✓"),
              why: t(E,
                "Going from the end, we meet the B first and obey its demand right away — and that same star also covers G(1). Nothing to guess (the B forces it all), so we never get stuck.",
                "끝에서부터 가서 B 를 먼저 만났어요. 'B 앞 칸엔 무조건 별' 명령을 바로 들어주니, 그 별이 G(1)까지 같이 해결돼요. 고를 게 없어서(B 가 다 강제) 안 막혀요."),
              result: t(E, "3 stars — all conditions satisfied ✓", "별 3개 — 모든 조건 충족 ✓"),
              ok: true,
            },
          ]} />
        </div>
      ),
    },

    /* 1-2.5 — REMOVED (2026-06-17): AstralAlgoTrace "whole run" overview was redundant here —
       the 3-method roadmap (2-0b) + greedy derivation (2-3.05/06) already cover the picture,
       and the DP sim appears later. Teacher: it interrupted the flow after backward greedy. */

    /* 1-2.6 — REMOVED (2026-06-17): the W/G/B 7-row summary table was redundant —
       the rail sim, corner-G sim, and greedy derivation already teach every row.
       Teacher: the point didn't pop and it duplicated earlier sims. */

    /* ════════════════════════════════════════════════════════════════
       MAIN SOLUTION CODE = the backward greedy (teacher's verified approach).
       Concept was just shown in 2-3.06; now turn it into code, then the full
       program. The DP block below becomes an OPTIONAL "another method" appendix.
       ════════════════════════════════════════════════════════════════ */

    /* 2-G0 — Bridge: the backward rule → code (no chains, no DP table needed) */
    {
      type: "reveal",
      narr: t(E,
        "That backward rule IS the whole solution — let's turn it into code. 👇",
        "방금 그 거꾸로 규칙이 풀이 전부예요 — 코드로 옮겨요. 👇"),
      content: (
        <div style={{ padding: 14 }}>
          {/* predecessor concept as a bubble walk */}
          <div style={{ background: "#eef2ff", border: "1.5px solid #c7d2fe", borderRadius: 10, padding: "8px 12px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#3730a3", marginBottom: 2, textAlign: "center" }}>
              📍 {t(E, "\"The cell a star came FROM\" (predecessor)", "\"별이 온 칸\" (직전 칸)")}
            </div>
            <PredecessorPeek E={E} />
          </div>

          <div style={{
            background: "#f0fdfa", border: "2px solid #0d9488", borderRadius: 10,
            padding: "10px 14px", marginBottom: 12,
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#0f766e", marginBottom: 6, textAlign: "center" }}>
              ⬅️ {t(E, "The rule, as code", "규칙을 코드로")}
            </div>
            {[
              { k: "B", c: "#1e293b", fg: "#fff",
                txt: t(E, "FORCED. ★ here AND ★ on the cell it came from = (r−down, c−right). If that cell is W or off-grid → impossible → -1.",
                         "강제. 여기 ★ + 별이 온 칸 = (r−down, c−right) 에도 ★. 그 칸이 W 거나 사진 밖이면 → 불가능 → -1.") },
              { k: "G", c: "#cbd5e1", fg: "#1e293b",
                txt: t(E, "A CHOICE. Already starred (a B before it grabbed that cell)? skip — one star covers both. Else: ★ on the cell it came from if that cell can hold a star, otherwise ★ here.",
                         "선택. 이미 별 있음 (뒤쪽 B 가 그 칸을 찍어둠)? 통과 — 별 하나가 둘을 덮음. 아니면: 별이 온 칸이 별을 가질 수 있으면 거기 ★, 안 되면 여기 ★.") },
              { k: "W", c: "#fff", fg: "#94a3b8",
                txt: t(E, "Nothing — empty in both photos.", "아무것도 안 함 — 두 사진 다 비어있음.") },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                  background: row.c, color: row.fg, border: "1.5px solid #94a3b8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 13, fontFamily: "'JetBrains Mono',monospace",
                }}>{row.k}</div>
                <div style={{ fontSize: 11.5, color: "#0f172a", lineHeight: 1.5 }}>{row.txt}</div>
              </div>
            ))}
          </div>
          <div style={{
            background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: 8,
            padding: "9px 12px", fontSize: 11.5, color: "#1e40af", lineHeight: 1.6,
          }}>
            💡 {t(E,
              "Going backward means every B's pull on its predecessor is recorded BEFORE we reach that predecessor — so when we get to a G, we already know if a star is sitting there. No guessing, one pass. The answer = how many cells ended up in the set.",
              "거꾸로 가면 B 가 직전 칸을 당기는 게 그 칸에 닿기 전에 이미 기록돼요 — 그래서 G 에 도착하면 거기 별이 있는지 이미 알아요. 찍을 일 없이 한 번 훑기. 답 = set 에 모인 칸 개수.")}
          </div>
        </div>
      ),
    },

    /* 2-G1 — backward greedy core code */
    sectionStep(sections[6], t(E,
      "Here's the heart of it: two loops sweeping backward, a set called possibles, and the B / G / W branches you just saw. Read it slowly — every branch matches one line of the rule.",
      "핵심이에요: 거꾸로 도는 for 두 개, possibles 라는 set, 그리고 방금 본 B / G / W 갈래. 천천히 읽어봐요 — 각 갈래가 규칙 한 줄에 딱 대응해요.")),

    /* 2-G2 — full backward greedy program (teacher's verified code) */
    sectionStep(sections[7], t(E,
      "Now the complete program: read input → the 'stars don't move' shortcut → the backward greedy → print the count (or -1). This is the actual code that passed USACO 12/12.",
      "이제 전체 코드: 입력 받기 → '별 안 움직임' 지름길 → 뒤→앞 그리디 → 별 수 출력 (또는 -1). 이게 USACO 12/12 통과한 실제 코드예요.")),

    /* 2-G3 — confidence check + the -1 edge case */
    {
      type: "reveal",
      narr: t(E,
        "Let's run the code by hand on orbit G G B and watch 'possibles' fill up. 👇",
        "코드를 손으로 궤도 G G B 에 돌려보며 'possibles' 가 차는 걸 봐요. 👇"),
      content: (
        <div style={{ padding: 14 }}>
          {/* possibles trace table for G G B (down=1, right=1) */}
          <div style={{
            background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10,
            padding: "11px 13px", marginBottom: 10,
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#14532d", marginBottom: 8 }}>
              ✅ {t(E, "Sweep backward — trace the possibles set", "거꾸로 훑기 — possibles set 따라가기")}
            </div>
            <table style={{
              width: "100%", borderCollapse: "collapse",
              fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#166534",
            }}>
              <thead>
                <tr style={{ background: "#dcfce7", color: "#14532d" }}>
                  <th style={{ padding: "5px 6px", textAlign: "left", border: "1px solid #bbf7d0" }}>{t(E, "cell", "칸")}</th>
                  <th style={{ padding: "5px 6px", textAlign: "left", border: "1px solid #bbf7d0" }}>{t(E, "what happens", "하는 일")}</th>
                  <th style={{ padding: "5px 6px", textAlign: "left", border: "1px solid #bbf7d0" }}>possibles</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "5px 6px", border: "1px solid #bbf7d0", fontWeight: 800 }}>(2,2)=B</td>
                  <td style={{ padding: "5px 6px", border: "1px solid #bbf7d0" }}>{t(E, "forced. add (2,2); came-from (1,1) is G → add (1,1)", "강제. (2,2) 추가; 온 칸 (1,1) 은 G → (1,1) 추가")}</td>
                  <td style={{ padding: "5px 6px", border: "1px solid #bbf7d0" }}>{"{(1,1),(2,2)}"}</td>
                </tr>
                <tr style={{ background: "#f7fee7" }}>
                  <td style={{ padding: "5px 6px", border: "1px solid #bbf7d0", fontWeight: 800 }}>(1,1)=G</td>
                  <td style={{ padding: "5px 6px", border: "1px solid #bbf7d0" }}>{t(E, "already in possibles (the B pinned it) → skip", "이미 possibles 에 있음 (B 가 박아둠) → 통과")}</td>
                  <td style={{ padding: "5px 6px", border: "1px solid #bbf7d0" }}>{"{(1,1),(2,2)}"}</td>
                </tr>
                <tr>
                  <td style={{ padding: "5px 6px", border: "1px solid #bbf7d0", fontWeight: 800 }}>(0,0)=G</td>
                  <td style={{ padding: "5px 6px", border: "1px solid #bbf7d0" }}>{t(E, "came-from (−1,−1) off-grid → add (0,0)", "온 칸 (−1,−1) 사진 밖 → (0,0) 추가")}</td>
                  <td style={{ padding: "5px 6px", border: "1px solid #bbf7d0" }}>{"{(0,0),(1,1),(2,2)}"}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#15803d", marginTop: 8 }}>
              {t(E, "answer = len(possibles) = 3 ✓", "answer = len(possibles) = 3 ✓")}
            </div>
            <div style={{
              marginTop: 8, background: "#fef9c3", border: "1px solid #fde047",
              borderRadius: 8, padding: "8px 11px", fontSize: 12, color: "#854d0e", lineHeight: 1.55,
            }}>
              💡 {t(E,
                "The star the B forced at (1,1) ALSO satisfies the G at (1,1) — one star, two cells. That's why backward never gets stuck.",
                "B 가 (1,1) 에 강제로 박은 별이 (1,1) 의 G 도 동시에 해결해요 — 별 하나, 두 칸. 그래서 거꾸로 가면 절대 안 막혀요.")}
            </div>
          </div>
          <div style={{
            background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10,
            padding: "10px 14px", fontSize: 12, color: "#991b1b", lineHeight: 1.65,
          }}>
            <b>{t(E, "When is it -1? ", "언제 -1 이에요? ")}</b>
            {t(E,
              "Only a B can break the puzzle. A B needs a star at the cell before it. If that predecessor is off the grid, or it's a W (empty in both photos, so it can't hold a star), the B is impossible → answer -1.",
              "오직 B 만 퍼즐을 깨뜨려요. B 는 직전 칸에 별이 필요해요. 그 직전 칸이 격자 밖이거나, W (두 사진 다 비어 별 못 둠) 면 그 B 는 불가능 → 답 -1.")}
          </div>
        </div>
      ),
    },

    /* ════════════════════════════════════════════════════════════════
       OPTIONAL APPENDIX — "another method": brute force → DP.
       Kept because it proves WHY the minimum is right (no greedy-proof needed)
       and generalizes to weighted variants. Students can stop after 2-G3.
       ════════════════════════════════════════════════════════════════ */

    /* 2-DP-intro — frame the rest as an optional, variant-robust alternative */
    {
      type: "reveal",
      narr: t(E,
        "That's the full solution — you could stop here. Optional bonus below: the same problem solved a totally different way, with DP. 👇",
        "여기까지가 완성된 풀이예요 — 멈춰도 돼요. 아래는 선택 보너스: 같은 문제를 완전히 다른 각도, DP 로 푸는 법. 👇"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{
            background: "#faf5ff", border: "2px solid #a855f7", borderRadius: 10,
            padding: "12px 16px", marginBottom: 12, textAlign: "center",
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#6b21a8", marginBottom: 4 }}>
              📦 {t(E, "Optional — another method: DP", "선택 — 또 다른 방법: DP")}
            </div>
            <div style={{ fontSize: 11.5, color: "#7e22ce" }}>
              {t(E, "Already solved it with the greedy above. This is bonus understanding.",
                    "위 그리디로 이미 풀었어요. 이건 보너스 이해예요.")}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "9px 11px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "#14532d", marginBottom: 4 }}>⬅️ {t(E, "Greedy (what we coded)", "그리디 (방금 짠 거)")}</div>
              <div style={{ fontSize: 11, color: "#166534", lineHeight: 1.55 }}>
                {t(E, "One backward pass. Shortest code. You trust each step is forced — no guessing.",
                      "거꾸로 한 번 훑기. 코드 제일 짧음. 각 칸이 강제됨을 믿고 감 — 찍기 없음.")}
              </div>
            </div>
            <div style={{ background: "#faf5ff", borderRadius: 8, padding: "9px 11px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "#6b21a8", marginBottom: 4 }}>💡 {t(E, "DP (the bonus)", "DP (보너스)")}</div>
              <div style={{ fontSize: 11, color: "#7e22ce", lineHeight: 1.55 }}>
                {t(E, "Carry BOTH options at every cell, pick the smaller at the end. Always correct; bends to variants.",
                      "매 칸 두 경우 다 들고 가다 끝에서 작은 거. 항상 정확; 변형에 강함.")}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#64748b", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
            {t(E, "Next few slides build the DP from scratch: all-combinations → too slow → DP.",
                  "다음 몇 슬라이드에서 DP 를 처음부터 쌓아요: 모든 경우 → 너무 느림 → DP.")}
          </div>
        </div>
      ),
    },

    /* 2-3.1 — Brute force: try ALL choice combos on a short chain (G, G, G) */
    {
      type: "reveal",
      narr: t(E,
        "Not sure the greedy answer is really the smallest? Just try EVERY combination — then you know for sure. 👇",
        "거꾸로 그리디 답이 진짜 최소일까? 못 믿겠으면 — 모든 경우를 다 해보면 100% 확실해요. 👇"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{
            background: "#fef3c7",
            border: "2px solid #f59e0b",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 4 }}>
              🐢 {t(E, "Brute force — try all combinations", "단순 시도 — 모든 경우 다 해보기")}
            </div>
            <div style={{ fontSize: 12.5, color: "#78350f" }}>
              {t(E, "Goal: list every choice, pick the fewest stars → check the greedy answer is right.",
                    "목표: 모든 선택을 다 적고 → 별 제일 적은 걸 골라서 → 그리디 답이 맞는지 확인.")}
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, marginBottom: 8 }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", width: 40 }}>#</th>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>G(0)</th>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>G(1)</th>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "Stars", "별 수")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>1</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "★ new", "★ 새 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "★ new", "★ 새 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700 }}>2</td>
              </tr>
              <tr style={{ background: "#dcfce7" }}>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>2</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "★ new (→ next)", "★ 새 별 (→ 다음 칸)")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "↩ arrived", "↩ 이어온 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 800, color: "#15803d" }}>1 ✅</td>
              </tr>
              <tr style={{ color: "#94a3b8" }}>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>3</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "↩ arrived", "↩ 이어온 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "★ new", "★ 새 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>❌</td>
              </tr>
              <tr style={{ color: "#94a3b8" }}>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>4</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "↩ arrived", "↩ 이어온 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "↩ arrived", "↩ 이어온 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>❌</td>
              </tr>
            </tbody>
          </table>
          <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 6, lineHeight: 1.5 }}>
            <span style={{ background: "#f1f5f9", borderRadius: 4, padding: "1px 6px", fontWeight: 600, color: "#64748b" }}>
              {t(E, "↩ arrived", "↩ 이어온 별")}
            </span>
            {" "}
            {t(E,
              "= the star from the previous cell travels here in photo 2 (no extra star needed here)",
              "= 앞 칸에 있던 별이 사진 2에서 이 칸으로 이동해 온 것 (여기 새 별 불필요)")}
          </div>
          <div style={{ fontSize: 12, color: "#64748b", textAlign: "center", lineHeight: 1.55 }}>
            {t(E,
              "Rows 3-4 are ❌ — G(0) is the first cell, no previous cell to arrive from. Best valid = Row 2 with 1 star (one star moves G(0) → G(1)).",
              "3-4 번은 ❌ — G(0) 은 첫 칸이라 이전 칸이 없어요. 가능한 것 중 가장 적은 별 수 = 2 번 (별 1 개가 G(0)→G(1) 로 이동). 답은 1 별!")}
          </div>
        </div>
      ),
    },

    /* 2-3.2 — Brute force is too slow for long chains */
    {
      type: "reveal",
      narr: t(E,
        "Brute force always works — but watch it explode on long chains. 👇",
        "단순 시도는 항상 정답이지만 — 궤도가 길어지면 폭주해요. 👇"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{
            background: "#fee2e2",
            border: "2px solid #ef4444",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#991b1b" }}>
              ⏰ {t(E, "Too slow when chains are long", "궤도가 길어지면 폭주")}
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 10 }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "G cells in chain", "궤도의 G 칸 수")}</th>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "Combinations to try", "시도할 경우의 수")}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>2</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>4</td></tr>
              <tr><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>5</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>32</td></tr>
              <tr><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>10</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>1,024</td></tr>
              <tr><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>20</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>1,048,576</td></tr>
              <tr style={{ background: "#fef2f2" }}><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700 }}>50</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700, color: "#991b1b" }}>{t(E, "≈ 1 quadrillion", "약 1000 조")}</td></tr>
              <tr style={{ background: "#fef2f2" }}><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700 }}>100</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700, color: "#991b1b" }}>{t(E, "longer than universe age", "우주 나이보다 김")}</td></tr>
            </tbody>
          </table>
          <div style={{ fontSize: 12, color: "#64748b", textAlign: "center", lineHeight: 1.55 }}>
            {t(E,
              "Grids can have lines of 200+ cells. Brute force can't finish. We need a smarter way.",
              "한 궤도에 칸이 200 개 넘을 수도 있어요. 단순 시도로는 못 풀어요. 더 똑똑한 방법이 필요해요.")}
          </div>
        </div>
      ),
    },

    /* 2-3.3 — Bridge: DP = brute force with a memo */
    {
      type: "reveal",
      narr: t(E,
        "Same idea as brute force, but smarter — that's DP. 👇",
        "단순 시도와 같은 아이디어인데 더 똑똑한 방법 — 이게 DP예요. 👇"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{
            background: "#ede9fe",
            border: "2px solid #8b5cf6",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 4 }}>
              💡 {t(E, "DP = brute force with a memo", "DP = 단순 시도 + 손메모")}
            </div>
            <div style={{ fontSize: 12.5, color: "#4c1d95", lineHeight: 1.55 }}>
              {t(E,
                "For each cell, store the answer ONCE. Don't recompute when other combinations need it.",
                "칸마다 답을 한 번만 계산하고 적어두기. 다른 경우의 수가 와도 다시 안 계산.")}
            </div>
          </div>
          <div style={{
            background: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 10,
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#166534", marginBottom: 6 }}>
              📓 {t(E, "What to track per cell", "칸마다 뭘 들고 다니냐면")}
            </div>
            <div style={{ fontSize: 12, color: "#14532d", lineHeight: 1.7 }}>
              {t(E,
                "At each cell only ONE thing is unknown — is a star arriving here from the cell before? We can't tell which case is better until the end, so we carry the answer for BOTH cases:",
                "각 칸에서 모르는 건 딱 하나 — 앞 칸 별이 여기로 와 있나? 끝까지 가 봐야 어느 쪽이 이득인지 알아요. 그래서 두 경우의 답을 둘 다 들고 가요:")}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 7, flexWrap: "wrap" }}>
              {[
                { label: t(E, "① If NO star arrives", "① 별이 안 왔다면"), desc: t(E, "min stars up to here", "여기까지 별 최소 개수"), bg: "#dcfce7", bd: "#16a34a", tc: "#14532d" },
                { label: t(E, "② If a star DOES arrive", "② 별이 왔다면"), desc: t(E, "min stars up to here", "여기까지 별 최소 개수"), bg: "#dbeafe", bd: "#3b82f6", tc: "#1e40af" },
              ].map((item, i) => (
                <div key={i} style={{ background: item.bg, border: `1.5px solid ${item.bd}`, borderRadius: 7, padding: "6px 10px", flex: 1, minWidth: 110 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: item.tc }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: item.tc, opacity: 0.8 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: "#14532d", marginTop: 7, lineHeight: 1.6 }}>
              {t(E,
                "At the last cell, pick the smaller of the two = the answer! ⭐",
                "끝 칸에서 둘 중 작은 걸 골라요 = 정답! ⭐")}
            </div>
          </div>
          <div style={{
            background: "#fefce8",
            border: "1px solid #fde047",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 10,
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#854d0e", marginBottom: 4 }}>
              ⚡ {t(E, "Speed", "속도")}
            </div>
            <div style={{ fontSize: 12, color: "#713f12", lineHeight: 1.55 }}>
              {t(E,
                "Row of 200 cells: all combinations = 2²⁰⁰ (impossible). DP = 200 × 2 = 400 steps. Done.",
                "궤도 200 칸: 모든 경우 = 2²⁰⁰ (불가능). DP = 200 × 2 = 400 번만 계산하면 끝.")}
            </div>
          </div>

        </div>
      ),
    },

    /* 2-1 — Read input (moved here 2026-06-02: first piece of code, after all 3 methods
       were explored. Now Ch2 flows clean: overview → 3 methods detail → CODE starts here). */
    sectionStep(sections[0], t(E,
      "Let's code the DP version too (optional). It's 5 chunks: ① read input → ② handle 'stars don't move' shortcut → ③ group cells into chains → ④ DP each chain → ⑤ add up. (Reading input is the same as the greedy — shown again here so this appendix stands alone.) Starting with ①.",
      "DP 버전도 코드로 짜봐요 (선택). 5 덩어리예요: ① 입력 받기 → ② '별 안 움직임' 지름길 → ③ 별 길 묶기 → ④ 한 묶음씩 DP → ⑤ 합치기. (입력 읽기는 그리디와 똑같아요 — 부록이 따로 읽혀도 되게 다시 보여줘요.) ① 부터 시작.")),

    /* 2-3 — Walk chains code (groups cells into chains; per-chain DP comes next). */
    sectionStep(sections[2], t(E,
      "Next: walk every cell and find where each chain STARTS (a cell whose 'one step back' lands off the grid). The DP per chain comes after.",
      "다음: 모든 칸을 둘러보면서 묶음 (chain) 시작점만 찾기 (한 칸 거꾸로 가면 사진 밖인 칸). 묶음 안의 DP 계산은 그 다음 슬라이드부터.")),

    /* 2-3.4 — Predict: why DP tracks BOTH outcomes */
    {
      type: "quiz",
      narr: t(E,
        "Quick think: at a G cell, the star can either STAY or MOVE to the next cell. Greedy got tricked picking one too early. So what's the safe move?",
        "잠깐 생각: G 칸에선 별이 머무를지 다음 칸으로 갈지 두 갈래. Greedy 가 하나 일찍 골라서 틀렸어요. 안전한 방법은?"),
      question: t(E,
        "When we don't know which choice is better yet, what do we do?",
        "어느 게 좋은지 모를 땐 어떻게 할까요?"),
      options: [
        t(E, "Carry BOTH answers, pick the smaller at the very end.",
            "두 답 다 들고 가다가, 맨 끝에서 더 작은 거 고르기."),
        t(E, "Guess one and hope for the best.",
            "하나 찍고 잘 되길 기도하기."),
        t(E, "Always pick 'send' — moving stars uses less.",
            "무조건 '보내기' — 별 적게 들 거예요.")
      ],
      correct: 0,
      explain: t(E,
        "Right — that's why each cell stores TWO numbers (min_stars[0] and min_stars[1]): one for 'didn't send', one for 'sent'. The smaller of the two at the LAST cell is the path's answer.",
        "맞아요 — 그래서 칸마다 숫자 두 개 (min_stars[0], min_stars[1]) 를 들고 다녀요. 하나는 '안 보냄', 다른 하나는 '보냄'. 마지막 칸의 작은 쪽이 그 길의 답."),
    },

    /* 2-3.5 — DP intuition + live sim, now AFTER predict quiz */
    {
      type: "reveal",
      narr: t(E,
        "Now watch the DP carry both numbers per cell, live. ▶ 👇",
        "이제 DP 가 칸마다 숫자 두 개를 들고 가는 걸 직접 봐요. ▶ 👇"),
      content: (<AstralDpSim E={E} />),
    },

    /* 2-3.7 — Bridge: ❌ in sim ↔ EMPTY (a huge number) in code.
       MOVED here 2026-06-02 (was between STEP 1 and STEP 2). Now right after the sim
       so EMPTY is introduced while ❌ is fresh; STEP labels stay uninterrupted. */
    {
      type: "reveal",
      narr: t(E,
        "The ❌ from the sim is what the code calls EMPTY — a huge number. Why? 👇",
        "방금 시뮬의 ❌ 를 코드에선 EMPTY (엄청 큰 수) 라고 불러요. 왜일까요? 👇"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🔢 {t(E, "Sim shows ❌   ⟷   Code uses EMPTY = 99999999", "시뮬 ❌   ⟷   코드 EMPTY = 99999999")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 3 }}>
              {t(E, "Same meaning: 'this option can't be built'.",
                    "같은 의미: '이 경우 만들 수 없음'.")}
            </div>
          </div>

          {/* Example: min_stars = [3, ❌] */}
          <div style={{ background: "#eef2ff", border: "1.5px solid #a5b4fc", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: "#312e81", marginBottom: 6, fontWeight: 700 }}>
              {t(E, "Example: min_stars = [3, ❌]", "예: min_stars = [3, ❌]")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              • {t(E, "If this cell does NOT pass a star out: 3 stars. Works.",
                    "이 칸이 별 안 보낼 때: 3 개. 가능.")}<br/>
              • {t(E, "If this cell DOES pass a star out: ❌ — can't be made.",
                    "이 칸이 별 보낼 때: ❌ — 못 만듦.")}
            </div>
          </div>

          {/* NEW: Concrete min() examples to demystify why huge number auto-filters */}
          <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 6 }}>
              🎯 {t(E, "Why min(...) filters out automatically", "왜 min(...) 이 알아서 걸러내요")}
            </div>
            <div style={{ fontSize: 12.5, color: "#14532d", lineHeight: 1.7, fontFamily: "'JetBrains Mono',monospace" }}>
              min(3, 99999999) = <b style={{ color: "#16a34a" }}>3</b>     <span style={{ color: "#64748b", fontFamily: "system-ui" }}>{t(E, "← real wins", "← 진짜 답 이김")}</span><br/>
              min(99999999, 99999999) = <b style={{ color: "#dc2626" }}>99999999</b>  <span style={{ color: "#64748b", fontFamily: "system-ui" }}>{t(E, "← all fail → still huge", "← 둘 다 실패 → 여전히 큰 수")}</span>
            </div>
            <div style={{ fontSize: 11.5, color: "#166534", marginTop: 8, lineHeight: 1.55 }}>
              {t(E,
                "Huge number is always bigger than any real answer → min() picks the real one. If both are huge → answer stays huge → that path is impossible.",
                "큰 수는 어떤 진짜 답보다도 크니까 min() 이 진짜를 골라요. 둘 다 큰 수면 → 결과도 큰 수 → 그 길은 못 만듦. if 로 따로 걸러줄 필요 없음.")}
            </div>
          </div>

          {/* Code representation */}
          <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", color: "#f1f5f9", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.65 }}>
            <div style={{ color: "#94a3b8", marginBottom: 4 }}>// {t(E, "in code:", "코드에서는:")}</div>
            <div><span style={{ color: "#c4b5fd" }}>const int</span> EMPTY = <span style={{ color: "#fbbf24" }}>99999999</span>;  <span style={{ color: "#64748b" }}>// {t(E, "huge number — bigger than any real answer", "엄청 큰 수")}</span></div>
            <div style={{ marginTop: 4 }}><span style={{ color: "#94a3b8" }}>{t(E, "// Same idea in Python: EMPTY = 99999999", "// Python 도 똑같이: EMPTY = 99999999")}</span></div>
          </div>
        </div>
      ),
    },

    /* 2-3.5b — Mini-roadmap: 3 steps to compute one path's answer */
    {
      type: "reveal",
      narr: t(E,
        "Now let's break that sim down into 3 steps — that's what the next slides go through, in order.",
        "방금 그 시뮬을 3 단계로 쪼개서 볼 거예요 — 다음 슬라이드들이 차례로 다룰게요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🗺️ {t(E, "How the sim works — 3 steps", "시뮬이 어떻게 돌아가나 — 3 단계")}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, title: t(E, "Set up the FIRST cell's min_stars", "첫 칸의 min_stars 정하기"),
                why: t(E, "Why: DP needs a starting value. First cell has nothing before it, so its values are forced.",
                          "왜: DP 가 시작값이 있어야 굴러감. 첫 칸은 앞에 아무것도 없으니 값이 정해져 있음."),
                how: t(E, "How: look at the first letter (W/G/B) → fill min_stars[0]/min_stars[1].",
                          "방법: 첫 글자 (W/G/B) 보고 → min_stars[0]/min_stars[1] 채우기.") },
              { n: 2, title: t(E, "Walk the rest, one cell at a time", "나머지 칸 차례차례 처리"),
                why: t(E, "Why: each cell's value depends only on the PREVIOUS cell + this cell's letter. Walk left-to-right and chain it.",
                          "왜: 각 칸 값이 바로 이전 칸 값 + 이 칸 글자로만 결정됨. 그래서 왼쪽에서 오른쪽으로 한 칸씩 차례."),
                how: t(E, "How: previous min_stars + current letter → new min_stars (if-else on W/G/B).",
                          "방법: 이전 min_stars + 이 칸 글자 → 새 min_stars (W/G/B if-else).") },
              { n: 3, title: t(E, "Take the smaller at the LAST cell", "마지막 칸의 작은 숫자 = 답"),
                why: t(E, "Why: the last cell's star (if any) goes off-grid anyway. Both options are valid endings → pick the cheaper one.",
                          "왜: 마지막 칸이 보내든 안 보내든 어차피 사진 밖 → 둘 다 유효한 결말 → 더 적은 쪽 = 답."),
                how: t(E, "How: min(min_stars[0], min_stars[1]). ❌ → -1.",
                          "방법: min(min_stars[0], min_stars[1]). ❌ → -1.") },
            ].map(s => (
              <div key={s.n} style={{
                display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "center",
                background: "#f8fafc", border: "1.5px solid #cbd5e1", borderRadius: 10, padding: "10px 14px",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: "#4f46e5", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 800,
                }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 3, lineHeight: 1.45 }}>{s.why}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, lineHeight: 1.45 }}>{s.how}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#eef2ff", border: "1.5px solid #a5b4fc", borderRadius: 8, padding: "8px 12px", marginTop: 10, fontSize: 11.5, color: "#312e81", textAlign: "center" }}>
            💡 {t(E, "Each step gets its own slide ahead — look for the step number at the top.",
                    "각 단계마다 슬라이드 따로. 위에 표시되는 단계 번호 따라가면 돼.")}
          </div>
        </div>
      ),
    },

    /* 2-3.6 — First cell (k=0) forced cases. */
    {
      type: "reveal",
      narr: t(E,
        "🔹 STEP 1 — set up the FIRST cell. 👇",
        "🔹 1 단계 — 첫 칸 설정. 👇"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              📌 {t(E, "First cell — what min_stars[0] and min_stars[1] start as", "첫 칸 — min_stars[0], min_stars[1] 시작값")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "min_stars[0] = stars so far if this cell does NOT pass one out. min_stars[1] = stars so far if it DOES.",
                    "min_stars[0] = 이 칸이 별 안 보낼 때 지금까지 별 수. min_stars[1] = 보낼 때 지금까지 별 수.")}
            </div>
          </div>

          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#eef2ff", color: "#312e81" }}>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "letter", "글자")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>min_stars[0]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>min_stars[1]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "why", "이유")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fff" }}><b>W</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>❌</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 11 }}>
                    {t(E, "Empty cell → 0 stars. Can't pass on what's not there → ❌.",
                          "빈 칸 → 별 0 개. 없는 걸 보낼 순 없음 → ❌.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1" }}><b>G</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 11 }}>
                    {t(E, "Original ★ here → 1 star. Can keep it OR pass it on — both OK.",
                          "원래 별 → 1 개. 머무를 수도, 다음 칸에 보낼 수도 있음 — 둘 다 가능.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#1e293b", color: "#fff" }}><b>B</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>❌</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>❌</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 11 }}>
                    {t(E, "B needs incoming ★, but first cell has nothing before it → ❌.",
                          "B 는 들어온 별 필요한데, 첫 칸은 앞에 아무것도 없음 → ❌.")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: "#991b1b", lineHeight: 1.6 }}>
            ❌ {t(E,
              "If the first cell is B, the entire star path is broken (min_stars = [❌, ❌]) — nothing fixes it later. Answer = -1.",
              "별 길 첫 칸이 B 면 그 길 전체가 망함 (min_stars = [❌, ❌]) — 뒤로 어떻게 가도 못 살림. 답은 -1.")}
          </div>
        </div>),
    },

    /* 2-3.7 — MOVED to right after 2-3.5 (DP sim) 2026-06-02. STEP 1 → STEP 2 flow
       now uninterrupted; EMPTY introduced while ❌ from sim is still fresh. */

    /* 2-3.8 — Case → Code mapping table */
    {
      type: "reveal",
      narr: t(E,
        "🔹 STEP 2 — a cheat sheet for each next cell. 👇",
        "🔹 2 단계 — 다음 칸마다 적용할 치트시트. 👇"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🔗 {t(E, "Case → Code", "케이스 → 코드")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "prev_keep = prev min_stars[0], prev_pass = prev min_stars[1], new_min_stars = new min_stars",
                    "prev_keep = 이전 min_stars[0], prev_pass = 이전 min_stars[1], new_min_stars = 새 min_stars")}
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", fontSize: 11.5 }}>
              <thead>
                <tr style={{ background: "#eef2ff", color: "#312e81" }}>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "case", "케이스")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "needs incoming ★?", "들어온 별?")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "uses prev", "쓰는 prev")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "+ new ★?", "+ 새 별?")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "new min_stars", "새 min_stars")}</th>
                </tr>
              </thead>
              <tbody>
                {/* W */}
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fff", fontWeight: 800 }}>W</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>{t(E, "No", "아니")}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>prev_keep</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>—</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontFamily: "'JetBrains Mono',monospace", background: "#f8fafc", fontSize: 10.5 }}>new_min_stars[0] = prev_keep;<br/>new_min_stars[1] = ❌</td>
                </tr>
                {/* B */}
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#1e293b", color: "#fff", fontWeight: 800 }}>B</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", color: "#16a34a", fontWeight: 700 }}>{t(E, "Yes", "예")}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>prev_pass</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", color: "#dc2626", fontWeight: 700 }}>+1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontFamily: "'JetBrains Mono',monospace", background: "#f8fafc", fontSize: 10.5 }}>new_min_stars[0] =<br/>new_min_stars[1] = prev_pass+1</td>
                </tr>
                {/* G case (a) — original ★ here */}
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 800 }}>G (a)</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>{t(E, "No", "아니")}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>prev_keep</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", color: "#dc2626", fontWeight: 700 }}>+1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontFamily: "'JetBrains Mono',monospace", background: "#f8fafc", fontSize: 10.5 }}>new_min_stars[0] =<br/>new_min_stars[1] = prev_keep+1</td>
                </tr>
                {/* G case (b) — ★ moved in from predecessor */}
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 800 }}>G (b)</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", color: "#16a34a", fontWeight: 700 }}>{t(E, "Yes", "예")}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>prev_pass</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>—</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontFamily: "'JetBrains Mono',monospace", background: "#f8fafc", fontSize: 10.5 }}>new_min_stars[0] = min(<br/>  new_min_stars[0], prev_pass)<br/><span style={{ color: "#64748b" }}>{t(E, "// can't pass on", "// 보낼 수 없음")}</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#dcfce7", border: "1.5px solid #16a34a", borderRadius: 8, padding: "10px 12px", marginTop: 10, fontSize: 12, color: "#14532d", textAlign: "center", lineHeight: 1.6 }}>
            ✅ <b>{t(E,
              "The code on the next slide = if-else on this table. Nothing more.",
              "다음 슬라이드 코드 = 이 표를 그대로 if-else 로 쓴 것. 그게 전부.")}</b>
          </div>
        </div>
      ),
    },

    /* 2-4a — First cell init (split from old 2-4 for clarity). */
    sectionStep(sections[3], t(E,
      "🔹 STEP 1 in code — set up first cell's min_stars.",
      "🔹 1 단계 코드 — 첫 칸의 min_stars 설정.")),

    /* 2-4b — Main loop (split from old 2-4). */
    sectionStep(sections[4], t(E,
      "🔹 STEP 2 in code — walk the rest. For each cell: previous min_stars + current letter → new min_stars (the if-else over W/G/B is the cheat sheet you saw earlier).",
      "🔹 2 단계 코드 — 나머지 칸 차례차례. 매 칸: 이전 min_stars + 이 칸 글자 → 새 min_stars (W/G/B if-else 는 방금 본 치트시트 그대로).")),

    /* 2-4.5 — Why min(min_stars[0], min_stars[1]) is the chain answer. */
    {
      type: "reveal",
      narr: t(E,
        "🔹 STEP 3 — pick the answer from the LAST cell. 👇",
        "🔹 3 단계 — 마지막 칸에서 답 고르기. 👇"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🎯 {t(E, "Last cell: pick the smaller min_stars", "마지막 칸: 더 작은 min_stars 선택")}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "center", marginBottom: 10 }}>
            <div style={{ background: "#fff", border: "2px solid #a5b4fc", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{t(E, "min_stars[0]", "min_stars[0]")}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#312e81" }}>2</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>{t(E, "don't pass star out", "별 안 보냄")}</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#4f46e5" }}>vs</div>
            <div style={{ background: "#fff", border: "2px solid #a5b4fc", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{t(E, "min_stars[1]", "min_stars[1]")}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#312e81" }}>3</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>{t(E, "pass star out", "별 보냄")}</div>
            </div>
          </div>

          <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontSize: 14, fontWeight: 800, color: "#14532d", marginBottom: 8 }}>
            ✅ path_min = min(2, 3) = 2
          </div>

          <div style={{ background: "#fffbeb", border: "1px dashed #fbbf24", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: "#78350f", lineHeight: 1.6 }}>
            💡 {t(E,
              "Different paths don't share cells → total = sum of every path's path_min. If any path is ❌ → -1.",
              "별 길끼리 서로 칸 안 겹침 → 총 답 = 모든 별 길의 path_min 합. 한 길이라도 ❌ 면 → -1.")}
          </div>
        </div>),
    },

    /* 2-4.6 — Hand-trace example: chain G→W→G→G. */
    {
      type: "reveal",
      narr: t(E,
        "🎯 All 3 steps in action — hand-trace the path [G, W, G, G]. 👇",
        "🎯 1+2+3 단계를 한 별 길에 다 적용 — [G, W, G, G] 손으로 풀어보기. 👇"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              ✍️ {t(E, "Hand-trace: path [G, W, G, G]", "손-trace: 별 길 [G, W, G, G]")}
            </div>
          </div>

          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              <thead>
                <tr style={{ background: "#eef2ff", color: "#312e81" }}>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "step", "단계")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>letter</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>min_stars[0]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>min_stars[1]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "how", "방법")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "First cell. G → 1 original star here, can keep or pass on → min_stars=[1,1].",
                          "첫 칸. G → 원래 별 1 개, 안 보냄/보냄 둘 다 OK → min_stars=[1,1].")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fff", fontWeight: 700 }}>W</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>❌</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "W: no star, no incoming. Use prev 'don't pass' (=1) → new_min_stars[0]=1. W can't pass on → new_min_stars[1]=❌.",
                          "W: 별 없음, 들어온 별 없음. 이전 '안 보냄' (=1) 사용 → new_min_stars[0]=1. W 는 보낼 수 없음 → new_min_stars[1]=❌.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "G case (a) — original ★ here: prev 'don't pass'=1 → +1 star → new_min_stars=[2,2]. G case (b) — moved-in: prev 'pass'=❌ skip.",
                          "G 경우 (a) — 원래 별 있음: 이전 '안 보냄'=1 → +1 별 → new_min_stars=[2,2]. G 경우 (b) — 들어온 별: 이전 '보냄'=❌ 스킵.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>3</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>3</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "G case (a): prev 'don't pass'=2 → +1 = 3 → new_min_stars=[3,3]. G case (b): prev 'pass'=2 → no new ★ → new_min_stars[0]=min(3,2)=2. Final new_min_stars=[2,3].",
                          "G 경우 (a): 이전 '안 보냄'=2 → +1 = 3 → new_min_stars=[3,3]. G 경우 (b): 이전 '보냄'=2 → 새 별 없음 → new_min_stars[0]=min(3,2)=2. 최종 new_min_stars=[2,3].")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontSize: 14, fontWeight: 800, color: "#14532d" }}>
            ✅ {t(E, "Path answer = min(min_stars[0], min_stars[1]) = min(2, 3) = 2",
                    "별 길 답 = min(min_stars[0], min_stars[1]) = min(2, 3) = 2")}
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
            {t(E, "Scroll back to the live simulator (preset 'G→W→G→G') — values should match exactly.",
                  "위 시뮬 (프리셋 'G→W→G→G') 로 돌아가서 값이 정확히 같은지 확인해 봐요.")}
          </div>
        </div>),
    },

    /* 2-4.7 — PAYOFF: "what did the DP actually DO?" Trace G G B — the case where
       forward-greedy got trapped and had to go backward, but DP doesn't.
       This ties the appendix back to the backward-greedy main solution. Added 2026-06-14. */
    {
      type: "reveal",
      narr: t(E,
        "So — what did the DP actually DO? Watch it on the orbit that trapped forward greedy. 👇",
        "그래서 — DP 가 결국 뭘 한 거예요? 앞→뒤 그리디가 막혔던 그 궤도에서 봐요. 👇"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#7c3aed" }}>
              💡 {t(E, "What the DP \"did\" — orbit G G B", "DP 가 \"한 일\" — 궤도 G G B")}
            </div>
          </div>

          {/* Plain-language framing of the two columns */}
          <div style={{ background: "#faf5ff", border: "1.5px solid #d8b4fe", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, color: "#4c1d95", lineHeight: 1.65 }}>
            <b>keep</b> = {t(E, "doesn't pass a star on", "별을 다음 칸에 안 보냄")}. &nbsp;
            <b>pass</b> = {t(E, "passes an original star to the next cell", "원래 별을 다음 칸에 보냄")}.<br/>
            {t(E,
              "A G can be your OWN original star (then it can pass on) OR a star that slid in from before (free — but it can't pass on). Those are the two columns.",
              "G 는 내 원래 별일 수도 있고 (그럼 다음에 보낼 수 있음), 앞 칸에서 슬라이드해 들어온 별일 수도 있어요 (공짜 — 대신 다음에 못 보냄). 이게 두 칸(열)이에요.")}
          </div>

          {/* The trace table: k / cell / what happens / min_stars [keep, pass] */}
          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              <thead>
                <tr style={{ background: "#f3e8ff", color: "#5b21b6" }}>
                  <th style={{ padding: "6px 10px", border: "1px solid #d8b4fe" }}>k</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #d8b4fe" }}>{t(E, "cell", "칸")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #d8b4fe" }}>{t(E, "what happens", "무슨 일")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #d8b4fe" }}>min_stars [keep, pass]</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", textAlign: "center" }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", fontSize: 10.5, fontFamily: "system-ui" }}>
                    {t(E, "Start. Own original ★ is forced. Can keep it OR pass it on.",
                          "시작. 내 원래 별 강제. 머무를 수도, 보낼 수도.")}
                  </td>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", textAlign: "center", background: "#ede9fe", color: "#5b21b6", fontWeight: 700 }}>[1, 1]</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", textAlign: "center" }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", fontSize: 10.5, fontFamily: "system-ui" }}>
                    {t(E,
                      "⒜ star slid in from prev pass=1 → fills this G FREE, but can't pass on → keep=1.  ⒝ own new ★ from prev keep=1 → +1=2, can keep or pass → [2,2].",
                      "⒜ 앞의 pass=1 에서 별이 슬라이드해 들어옴 → 이 G 를 공짜로 채움, 대신 다음에 못 보냄 → keep=1.  ⒝ 앞의 keep=1 에서 내 새 별 → +1=2, 머무름/보냄 둘 다 → [2,2].")}
                  </td>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", textAlign: "center", background: "#ede9fe", color: "#5b21b6", fontWeight: 700 }}>[1, 2]</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", textAlign: "center" }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", textAlign: "center", background: "#1e293b", color: "#fff", fontWeight: 700 }}>B</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", fontSize: 10.5, fontFamily: "system-ui" }}>
                    {t(E,
                      "B NEEDS an arriving star → only the pass=2 branch can feed it; + its own ★ (+1) → [3, 3].",
                      "B 는 들어오는 별이 꼭 필요 → pass=2 가지만 먹여줄 수 있음; + 자기 별 (+1) → [3, 3].")}
                  </td>
                  <td style={{ padding: "6px 10px", border: "1px solid #d8b4fe", textAlign: "center", background: "#ede9fe", color: "#5b21b6", fontWeight: 700 }}>[3, 3]</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#ede9fe", border: "2px solid #7c3aed", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontSize: 14, fontWeight: 800, color: "#5b21b6", marginBottom: 12 }}>
            ✅ path_min = min(3, 3) = 3
          </div>

          {/* THE PUNCHLINE — tie to why greedy needed backward, DP doesn't */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 10, padding: "11px 13px", fontSize: 12, color: "#7c2d12", lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#c2410c", marginBottom: 5 }}>
              🎯 {t(E, "THIS is what the DP did", "바로 이게 DP 가 한 일")}
            </div>
            {t(E,
              "At the middle G the DP held BOTH futures: \"filled free, keep=1 but can't pass on\" AND \"own star, pass=2 but can keep going.\" The B can only be reached through the pass=2 branch → 2+1 = 3.",
              "가운데 G 에서 DP 는 두 미래를 동시에 들고 있었어요: \"공짜로 채움, keep=1 인데 다음에 못 보냄\" 그리고 \"내 별, pass=2 인데 계속 보낼 수 있음.\" B 는 pass=2 가지로만 닿을 수 있어요 → 2+1 = 3.")}
            <div style={{ marginTop: 7, paddingTop: 7, borderTop: "1px dashed #fdba74" }}>
              {t(E,
                "Forward greedy would grab the cheap keep=1 at that G and then get STUCK at the B — that's exactly why the main solution had to walk BACKWARD (let the B reach back and claim a star). The DP never picks early: it carries both states and takes the smaller at the end, so it finds 3 going forward — never trapped by direction.",
                "앞→뒤 그리디는 그 G 에서 싼 keep=1 을 덥석 잡고 → B 에서 막혀요. 이게 바로 메인 풀이가 '거꾸로' 가야 했던 이유 (B 가 뒤로 손 뻗어 별을 차지하게). DP 는 일찍 안 골라요 — 두 상태를 다 들고 가다 끝에서 작은 걸 골라서, 앞으로 가도 3 을 찾아요. 방향에 갇히지 않아요.")}
            </div>
          </div>
        </div>),
    },

    /* 2-5 — Full code. (Edge case for stars-don't-move appears inline as a brief `if` branch;
       no separate slide needed, similar to how we simplified EMPTY/❌.)
       Note: sections[5] = Full code, after sections were split (4 → 4a + 4b). */
    sectionStep(sections[5], t(E,
      "Everything stitched together. You'll spot a tiny `if right == 0 and down == 0:` branch near the top — that's the trivial 'stars don't move → just count G+B' shortcut.",
      "전부 합친 코드. 위쪽에 `if right == 0 and down == 0:` 짧은 분기 하나 — '별 안 움직이면 G+B 그냥 세기' 지름길.")),

    /* 2-6 — Sample 2 end-to-end walkthrough (general A,B case) */
    {
      type: "reveal",
      narr: t(E,
        "Final check: run the WHOLE algorithm on a fresh example, end to end. 👇",
        "마지막 확인: 새 예시로 알고리즘 전체를 처음부터 끝까지 돌려봐요. 👇"),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🔭 {t(E, "End-to-end: 3×3, stars move right 1, down 1", "전체 흐름: 3×3, 별 이동 오른쪽 1, 아래 1")}
            </div>
          </div>

          {/* Grid display */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 48px)", gap: 4 }}>
              {[
                ["G", "W", "W"],
                ["W", "G", "W"],
                ["W", "W", "G"],
              ].flatMap((row, r) => row.map((letter, c) => {
                const bg = letter === "W" ? "#fff" : letter === "G" ? "#cbd5e1" : "#1e293b";
                const fg = letter === "B" ? "#fff" : "#1e293b";
                return (
                  <div key={`${r}-${c}`} style={{
                    width: 48, height: 48, background: bg, color: fg,
                    border: `1.5px solid ${C.border}`, borderRadius: 6,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>{letter}</div>
                    <div style={{ fontSize: 9, color: letter === "B" ? "#cbd5e1" : "#64748b", marginTop: 1 }}>({r},{c})</div>
                  </div>
                );
              }))}
            </div>
          </div>

          {/* Steps table */}
          <div style={{ background: "#fff", border: "1.5px solid #cbd5e1", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, lineHeight: 1.6 }}>
            <div style={{ marginBottom: 6 }}>
              <b style={{ color: "#4f46e5" }}>{t(E, "Step 1-2", "1-2 단계")}:</b> {t(E, "Read input → stars do move → general case.", "입력 받기 → 별이 움직임 → 일반 경우로 진행.")}
            </div>
            <div style={{ marginBottom: 6 }}>
              <b style={{ color: "#4f46e5" }}>{t(E, "Step 3 (group cells):", "3 단계 (칸 묶기):")}</b> {t(E, "5 paths total. Starts: row 0 + col 0.", "총 5 별 길. 시작점: 0 행 + 0 열.")}
              <div style={{ paddingLeft: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#475569" }}>
                {t(E, "• (0,0) → (1,1) → (2,2)  = G G G", "• (0,0) → (1,1) → (2,2)  = G G G")}<br/>
                {t(E, "• (0,1) → (1,2)  = W W", "• (0,1) → (1,2)  = W W")}<br/>
                {t(E, "• (0,2)  = W", "• (0,2)  = W")}<br/>
                {t(E, "• (1,0) → (2,1)  = W W", "• (1,0) → (2,1)  = W W")}<br/>
                {t(E, "• (2,0)  = W", "• (2,0)  = W")}
              </div>
            </div>
            <div style={{ marginBottom: 6 }}>
              <b style={{ color: "#4f46e5" }}>{t(E, "Step 4 (count per group):", "4 단계 (묶음마다 별 세기):")}</b>
              <div style={{ paddingLeft: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#475569" }}>
                {t(E, "• G→G→G  →  path_min = 2  (one star travels 0→1→2)", "• G→G→G  →  path_min = 2  (별 1 개가 0→1→2 로 이동)")}<br/>
                {t(E, "• W→W  →  path_min = 0", "• W→W  →  path_min = 0")}<br/>
                {t(E, "• W  →  path_min = 0", "• W  →  path_min = 0")}<br/>
                {t(E, "• W→W  →  path_min = 0", "• W→W  →  path_min = 0")}<br/>
                {t(E, "• W  →  path_min = 0", "• W  →  path_min = 0")}
              </div>
            </div>
            <div style={{ background: "#dcfce7", borderRadius: 6, padding: "6px 10px", marginTop: 8 }}>
              <b style={{ color: "#14532d" }}>{t(E, "Step 5 (sum):", "5 단계 (합치기):")}</b>{" "}
              <span style={{ color: "#14532d" }}>{t(E, "2 + 0 + 0 + 0 + 0 = ", "2 + 0 + 0 + 0 + 0 = ")}</span>
              <b style={{ color: "#14532d", fontSize: 14 }}>2</b>
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px dashed #fbbf24", borderRadius: 8, padding: "8px 12px", marginTop: 8, fontSize: 11, color: "#78350f", textAlign: "center", lineHeight: 1.5 }}>
            💡 {t(E,
              "If ANY chain had been ❌ (e.g., B at a corner with off-grid predecessor), the total would be -1 instead.",
              "어느 한 묶음이라도 ❌ 였다면 (예: 모서리에 B 가 있었으면) 답이 -1 이 됐을 거예요.")}
          </div>
        </div>
      ),
    },
  ];
}
