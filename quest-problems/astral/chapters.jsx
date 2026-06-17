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
   별이 그리드 위에서 ↘ 대각선으로 이동하는 줄을 직접 보여줌.
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
            {cur.result && (
              <div style={{ marginTop: 7, paddingTop: 7, borderTop: "1px dashed rgba(0,0,0,0.12)", fontSize: 12.5, fontWeight: 800, color: cur.ok ? "#15803d" : "#b91c1c" }}>
                {cur.result}
              </div>
            )}
          </div>
        </div>
      </div>
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

/* ── AstralDpWalk: step the DP across ONE line [G,W,G,G], one cell per click, with a
   plain-language bubble each step. Two numbers per cell = "no star rolled in (A)" /
   "a star rolled in (B)". Values come straight from the verified AstralDpSim machine:
   [1,1] → [1,❌] → [2,2] → [2,3], answer = min(2,3) = 2. Editable slide content.
   (A/B framing = min_stars[0]/min_stars[1] in the solution code — index = "did a
   star arrive into this cell". ❌ = EMPTY = impossible.) ── */
function AstralDpWalk({ E }) {
  // ONE box per step, so 안 보냄 / 보냄 are filled separately and slowly.
  // letters G W G G ; 안 보냄=[1,1,2,2] 보냄=[1,❌,2,3] ; verified, answer 2.
  const X = "❌";
  const letters = ["G", "W", "G", "G"];
  const aVals = ["1", "1", "2", "2"];   // 안 보냄
  const bVals = ["1", X, "2", "3"];     // 보냄
  const steps = [
    { c: 0, box: "A", bubble: t(E,
      "First cell G.\nNothing arrives from before,\nso we must place 1 star here.\n(number = total placed so far)\nIf it does NOT move on → still 1\n→ don't-send = 1.",
      "첫 칸 G.\n맨 앞이라 앞에서 온 별이 없어요.\n→ 여기 별 1 개를 꼭 놔요.\n(밑 숫자 = 여기까지 놓은 별 합계)\n이 별을 '안 보내면' → 1 개\n→ 안 보냄 = 1.") },
    { c: 0, box: "B", bubble: t(E,
      "Same first cell.\nEven if this star moves on,\nit was placed right here (photo 1).\nMoving is just how photo 2 looks.\nPhoto 1 still had 1 star here\n→ send = 1.",
      "같은 첫 칸.\n이 별을 옆으로 '보내도',\n그 별은 원래 이 자리(사진1)에 놨던 거예요.\n보낸 건 사진2에서 옆 칸으로 간 모습일 뿐.\n사진1엔 여기 별 1 개 있었던 거죠\n→ 보냄 = 1.") },
    { c: 1, box: "A", bubble: t(E,
      "Next cell W = both photos empty.\nWe place NO star here\n→ total doesn't grow → stays 1\n→ don't-send = 1.",
      "다음 칸 W = 두 사진 다 빈 칸.\n여기엔 별을 안 놓아요\n→ 합계 안 늘어 그대로 1\n→ 안 보냄 = 1.") },
    { c: 1, box: "B", bubble: t(E,
      "Same W.\n'Send' = move THIS cell's star on.\nBut W has no star to send\n→ impossible ❌.",
      "같은 W 칸.\n'보냄'은 이 칸 별을 다음으로 보내는 건데,\nW엔 보낼 별이 없어요\n→ 불가능 ❌.") },
    { c: 2, box: "A", bubble: t(E,
      "Next cell G.\nThe cell before (W) sent nothing\n→ no star arrived\n→ place a new star here (1+1 = 2).\nDon't move it on\n→ don't-send = 2.",
      "다음 칸 G.\n앞 칸(W)이 보낸 별이 없어요.\n→ 옮겨온 별 없음\n→ 여기 새 별 1 개 놔야 해요 (1+1 = 2).\n안 보내면\n→ 안 보냄 = 2.") },
    { c: 2, box: "B", bubble: t(E,
      "Same G.\nOnly 1 star is sent.\nBut this 2 is NOT how many are sent —\nit's the TOTAL placed so far:\n1 (cell 1) + 1 (here) = 2.\n→ send = 2.",
      "같은 G 칸.\n보내는 별은 1 개예요.\n근데 이 숫자 2 는 '보낸 개수'가 아니라\n'여기까지 놓은 별 합계' —\n1 번 칸 1 개 + 이 칸 1 개 = 2.\n→ 보냄 = 2.") },
    { c: 3, box: "A", bubble: t(E,
      "Last cell G. Two ways to fill it:\n① the previous star CAME here\n  → it makes this G, no new star = 2.\n② it did NOT come (vanished / none)\n  → place a new star here = 2+1 = 3.\nUse fewer → the smaller, 2.\n→ don't-send = 2.\n(So 1,1,2,2 — NOT 3!)",
      "마지막 칸 G. 채우는 길은 둘:\n① 앞 별이 여기로 '왔으면'\n  → 그 별이 이 G → 새 별 안 놔도 됨 = 2.\n② 앞 별이 '안 왔으면'(사라졌거나 없거나)\n  → 여기 새 별 = 2+1 = 3.\n별 더 적게! 더 작은 2.\n→ 안 보냄 = 2.\n(그래서 1,1,2,2 — 3 아니에요!)") },
    { c: 3, box: "B", final: true, bubble: t(E,
      "'Send' = 3\n(place a new star here and move it on).\nLast cell, nothing left to send.\n→ answer = the smaller of the two = 2! 🔑",
      "'보냄' = 3\n(여기 새 별 놓고 다음으로 보내는 경우).\n마지막 칸이라 더 보낼 데 없으니,\n→ 답 = 두 칸 중 작은 2! 🔑") },
  ];
  const [si, setSi] = useState(0);
  const last = steps.length - 1;
  const idx = Math.max(0, Math.min(si, last));
  const cur = steps[idx];
  const S = 56, GAP = 34, P = S + GAP, gridW = letters.length * S + (letters.length - 1) * GAP;
  const stepOf = (ci, b) => 2 * ci + (b === "B" ? 1 : 0);
  const shown = (ci, b) => stepOf(ci, b) <= idx;

  const compColors = { W: { bg: "#fff", bd: "#e2e8f0", fg: "#94a3b8" }, G: { bg: "#cbd5e1", bd: "#94a3b8", fg: "#1e293b" }, B: { bg: "#1e293b", bd: "#0f172a", fg: "#fff" } };
  const box = (label, val, active) => {
    const isX = val === X;
    return (
      <div style={{
        minWidth: 38, textAlign: "center", padding: "2px 5px", borderRadius: 6,
        fontSize: 13, fontWeight: 800, lineHeight: 1.2,
        background: active ? (isX ? "#fee2e2" : "#dcfce7") : "#f8fafc",
        color: isX ? "#dc2626" : active ? "#15803d" : "#94a3b8",
        border: active ? `1.5px solid ${isX ? "#fca5a5" : "#86efac"}` : "1.5px solid #eef2f6",
      }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: active ? "#64748b" : "#cbd5e1", whiteSpace: "nowrap" }}>{label}</div>
        {val}
      </div>
    );
  };

  const btn = (disabled, label, onClick) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 16px", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700,
      cursor: disabled ? "default" : "pointer",
      background: disabled ? "#f1f5f9" : "#4f46e5", color: disabled ? "#94a3b8" : "#fff",
    }}>{label}</button>
  );

  return (
    <div style={{ padding: "4px 0" }}>
      <div style={{ position: "relative", width: gridW + 16 + 380, maxWidth: "100%", minHeight: 175, margin: "0 auto 8px" }}>
        {/* row of cells; each cell's two boxes (안 보냄 / 보냄) fill ONE per step */}
        {letters.map((L, i) => {
          const active = i === cur.c;
          const seen = i <= cur.c;
          const cc = compColors[L];
          const ph = (
            <div style={{ minWidth: 38, padding: "2px 5px", borderRadius: 6, border: "1.5px dashed #eef2f6", fontSize: 13, fontWeight: 800, lineHeight: 1.2, textAlign: "center", color: "#e2e8f0" }}>
              <div style={{ fontSize: 9 }}>·</div>·
            </div>
          );
          return (
            <div key={i} style={{ position: "absolute", left: i * P, top: 18, width: S, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{
                width: S, height: S, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 900, transition: "all .15s",
                background: seen ? cc.bg : "#f8fafc", color: seen ? cc.fg : "#cbd5e1",
                border: active ? "3px solid #4f46e5" : `2px solid ${seen ? cc.bd : "#eef2f6"}`,
                boxShadow: active ? "0 0 0 4px rgba(79,70,229,.18)" : "none",
              }}>{L}</div>
              <div style={{ display: "flex", gap: 3 }}>
                {shown(i, "A") ? box(t(E, "don't send", "안 보냄"), aVals[i], active && cur.box === "A") : ph}
                {shown(i, "B") ? box(t(E, "send", "보냄"), bVals[i], active && cur.box === "B") : ph}
              </div>
            </div>
          );
        })}
        {/* bubble — right of the grid; width fits the text so only intended line breaks show */}
        <div style={{
          position: "absolute", left: gridW + 16, top: 4,
          width: "max-content", maxWidth: 360,
          background: cur.final ? "#dcfce7" : "#1e3a8a", color: cur.final ? "#14532d" : "#fff",
          border: cur.final ? "1.5px solid #16a34a" : "none",
          borderRadius: 10, padding: "10px 13px", fontSize: 12.5, lineHeight: 1.65, fontWeight: 600, zIndex: 3, whiteSpace: "pre-line",
        }}>
          <div style={{
            position: "absolute", left: -7, top: 18, width: 0, height: 0,
            borderTop: "7px solid transparent", borderBottom: "7px solid transparent",
            borderRight: `8px solid ${cur.final ? "#dcfce7" : "#1e3a8a"}`,
          }} />
          {cur.bubble}
        </div>
      </div>

      {/* legend */}
      <div style={{ textAlign: "center", marginBottom: 4, fontSize: 11, fontWeight: 700, color: "#4f46e5" }}>
        {t(E, "the number = TOTAL stars placed so far (NOT how many are sent)",
              "숫자 = 여기까지 놓은 별 총합 (보낸 개수가 아니에요)")}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 8, fontSize: 10.5, color: "#64748b", flexWrap: "wrap" }}>
        <span><b style={{ color: "#15803d" }}>{t(E, "don't send", "안 보냄")}</b> / <b style={{ color: "#15803d" }}>{t(E, "send", "보냄")}</b> = {t(E, "the case where this cell does/doesn't send a star on", "이 칸이 다음으로 별을 안 보내는 / 보내는 경우")}</span>
        <span><b style={{ color: "#dc2626" }}>❌</b> = {t(E, "impossible", "불가능")}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        {btn(idx === 0, E ? "◀ Prev" : "◀ 이전", () => setSi(Math.max(0, idx - 1)))}
        <span style={{ fontSize: 11, color: "#64748b", minWidth: 44, textAlign: "center" }}>{idx + 1} / {steps.length}</span>
        {btn(idx === last, E ? "Next ▶" : "다음 ▶", () => setSi(Math.min(last, idx + 1)))}
      </div>
    </div>
  );
}

/* ── Rail walk: the cells (0,0)–(2,1)–(off grid) form ONE rail. A star hops just
   ONE notch (photo1 → photo2). TWO different stars share cell (2,1) — that is why
   the cells are linked into a rail and solved together. Editable slide content.
   Solid ★ = photo1 (original spot) · faint ★ = photo2 (one-notch-ahead image). ── */
function OrbitWalk({ E }) {
  // ONE concrete idea: a star moves exactly one step (photo1 → photo2). So to read
  // any cell, look "one step back". No chains/rails — the main greedy never needs them.
  const Ac = "#2563eb", AcG = "#93c5fd"; // solid (photo1) / ghost (photo2)
  const P1 = { r: 0, c: 0 }, P2 = { r: 2, c: 1 };
  const steps = [
    { p1: P1, p2: null, arrow: false, tail: P1,
      bubble: t(E, "Photo 1 — one star sits at (0,0).", "사진1 — 별 하나가 (0,0) 에 있어요.") },
    { p1: P1, p2: P2, arrow: true, tail: P2,
      bubble: t(E, "Photo 2 — that star moves just ONE step (right 1, down 2) → (2,1).",
                   "사진2 — 그 별이 딱 한 칸 움직여요 (오른쪽 1, 아래 2) → (2,1).") },
    { p1: P1, p2: P2, arrow: true, tail: P1, gFocus: P1,
      bubble: t(E, "Look at (0,0): a star in photo 1, but NONE in photo 2 (it left). A star in only ONE photo = G!",
                   "(0,0) 을 봐요: 사진1엔 별, 사진2엔 없어요 (떠났으니까). 한 사진에만 별 = G!") },
    { p1: P1, p2: P2, arrow: true, tail: P2, gFocus: P2,
      bubble: t(E, "Look at (2,1): NONE in photo 1, a star in photo 2 (it arrived). Also one photo only = G! So a G means a star LEFT, or a star ARRIVED.",
                   "(2,1) 을 봐요: 사진1엔 없고, 사진2에만 별 (들어왔으니까). 이것도 한 사진에만 = G! → G 는 별이 '떠난 자리' 또는 '들어온 자리'예요.") },
    { p1: P1, p2: P2, arrow: true, tail: P2, final: true,
      bubble: t(E, "And a star seen at (2,1) came from '(2,1) minus one step' = (0,0). Whatever cell you look at, just check 'one step back'! 🔑",
                   "그리고 (2,1) 에 보이는 별은 '거꾸로 한 칸'인 (0,0) 에서 온 거예요. 어떤 칸이든 '거꾸로 한 칸'만 보면 돼요! 🔑") },
  ];
  const [si, setSi] = useState(0);
  const last = steps.length - 1;
  const idx = Math.max(0, Math.min(si, last));
  const cur = steps[idx];
  const S = 46, GAP = 6, P = S + GAP, gridW = 4 * S + 3 * GAP;
  const cx = (cell) => cell.c * P + S / 2, cy = (cell) => cell.r * P + S / 2;
  const key = (cell) => `${cell.r},${cell.c}`;

  const btn = (disabled, label, onClick) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 16px", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 700,
      cursor: disabled ? "default" : "pointer",
      background: disabled ? "#f1f5f9" : "#4f46e5", color: disabled ? "#94a3b8" : "#fff",
    }}>{label}</button>
  );

  return (
    <div style={{ padding: "4px 0" }}>
      <div style={{ position: "relative", width: gridW + 16 + 192, maxWidth: "100%", height: 4 * P + 6, margin: "0 auto 10px" }}>
        {/* one-step arrow (0,0) → (2,1) */}
        {cur.arrow && (() => {
          const x1 = cx(P1), y1 = cy(P1), x2 = cx(P2), y2 = cy(P2);
          const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
          return <div style={{
            position: "absolute", left: x1, top: y1 - 1.5, width: len, height: 3,
            background: Ac, opacity: 0.5, transformOrigin: "0 50%", transform: `rotate(${ang}deg)`,
            borderRadius: 2, zIndex: 1,
          }} />;
        })()}
        {/* 4×4 grid */}
        {[0,1,2,3].flatMap(r => [0,1,2,3].map(c => {
          const cell = { r, c }, k = key(cell);
          const isP1 = k === key(cur.p1);
          const isP2 = cur.p2 && k === key(cur.p2);
          const isG = cur.gFocus && k === key(cur.gFocus);
          return (
            <div key={k} style={{
              position: "absolute", left: c * P, top: r * P, width: S, height: S, borderRadius: 8, zIndex: isG ? 4 : 2,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
              background: isG ? "#fef9c3" : isP1 ? "#dbeafe" : isP2 ? "#eff6ff" : "#fff",
              border: isG ? "2.5px solid #d97706" : isP1 ? `2.5px solid ${Ac}` : isP2 ? `2px dashed ${Ac}` : "2px solid #eef2f6",
              boxShadow: isG ? "0 0 0 4px rgba(217,119,6,.2)" : isP1 ? `0 0 0 4px rgba(37,99,235,.15)` : "none", transition: "all .15s",
            }}>
              {isG && <div style={{ position: "absolute", top: -10, right: -8, fontSize: 12, fontWeight: 900, color: "#d97706" }}>G</div>}
              {isP1 ? (
                <><span style={{ fontSize: 18, color: Ac, fontWeight: 900, lineHeight: 1 }}>★</span>
                  <span style={{ fontSize: 8, fontWeight: 800, color: Ac }}>{t(E, "photo1", "사진1")}</span></>
              ) : isP2 ? (
                <><span style={{ fontSize: 16, color: AcG, fontWeight: 900, lineHeight: 1 }}>★</span>
                  <span style={{ fontSize: 8, fontWeight: 800, color: "#60a5fa" }}>{t(E, "photo2", "사진2")}</span></>
              ) : (
                <span style={{ fontSize: 8, fontWeight: 700, color: "#cbd5e1" }}>({r},{c})</span>
              )}
            </div>
          );
        }))}
        {/* bubble */}
        <div style={{
          position: "absolute", left: gridW + 16, top: Math.min(cur.tail.r * P, 2 * P), width: 184,
          background: cur.final ? "#dcfce7" : "#1e3a8a", color: cur.final ? "#14532d" : "#fff",
          border: cur.final ? "1.5px solid #16a34a" : "none",
          borderRadius: 10, padding: "8px 11px", fontSize: 12, lineHeight: 1.55, fontWeight: 600, zIndex: 3,
        }}>
          <div style={{
            position: "absolute", left: -7, top: 15, width: 0, height: 0,
            borderTop: "7px solid transparent", borderBottom: "7px solid transparent",
            borderRight: `8px solid ${cur.final ? "#dcfce7" : "#1e3a8a"}`,
          }} />
          {cur.bubble}
        </div>
      </div>

      {/* legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 8, fontSize: 10.5, color: "#64748b", flexWrap: "wrap" }}>
        <span><b style={{ color: Ac }}>진한 ★</b> = {t(E, "photo 1 (original spot)", "사진1 (원래 자리)")}</span>
        <span><b style={{ color: "#93c5fd" }}>흐린 ★</b> = {t(E, "photo 2 (one step later)", "사진2 (한 칸 뒤 모습)")}</span>
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

          <div style={{ marginBottom: 10 }}>
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

          <Sample1Counter E={E} />
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
    /* 2-0 — the one mechanic the whole solution rests on: a star moves ONE step,
       so any cell's photo-2 came from "one step back". (No chains/rails — not needed.) */
    {
      type: "reveal",
      narr: t(E,
        "Just one thing to know: a star moves exactly ONE step (photo 1 → photo 2). Watch below 👇",
        "딱 하나만 알면 돼요: 별은 정확히 한 칸 움직여요 (사진1 → 사진2). 아래에서 봐요 👇"),
      content: (
        <div style={{ padding: 14 }}>
          <OrbitWalk E={E} />
        </div>
      ),
    },

    /* 2-0a (독립성/체인 색칠) MOVED to the DP section (2026-06-17): the chain/independence
       idea is only needed for DP, not the main greedy. Teacher: "DP 설명은 DP 쪽으로." */

    /* 2-0b — 3가지 방법 로드맵 */
    {
      type: "reveal",
      narr: t(E,
        "How do we actually decide each cell? There are 3 ways — let's see them one by one.",
        "그럼 칸을 실제로 어떻게 정할까요? 방법이 3 가지예요 — 하나씩 봐요."),
      content: (
        <div style={{ padding: 14 }}>

          <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7 }}>
            {t(E, "3 ways to decide the cells (next slides):", "칸을 정하는 3 가지 방법 (다음 슬라이드):")}
          </div>
          {[
            {
              num: "①", icon: "➡️",
              label: t(E, "Left → right (greedy)", "앞→뒤 그리디(greedy)"),
              desc: t(E, "Walk the orbit one cell at a time, start → end. Fast — but misses some cases.", "줄을 한 칸씩 시작→끝으로. 빠르지만 가끔 틀려요."),
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
                { coin: "…",     fits: true,  note: t(E,"keep picking biggest","큰 것부터 계속") },
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
              {t(E, "→ 7 coins. Every step: just pick the biggest. No planning ahead!",
                 "→ 7개. 매번 '제일 큰 것'만 골랐어요. 미래 계획 없음!")}
            </div>
          </div>

          {/* fast-but-sometimes-wrong — one line (teaser for next slide) */}
          <div style={{ fontSize: 12, color: "#44403c", lineHeight: 1.6, background: "#fafaf9", border: "1.5px solid #d6d3d1", borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
            ⚡ {t(E,
              "Fast and short to code — but it only looks at NOW, so it can be wrong. (We'll see that next. 👀)",
              "⚡ 빠르고 코드도 짧아요 — 근데 눈앞만 봐서 가끔 틀려요. (다음 슬라이드에서 봐요 👀)")}
          </div>

          {/* Closing line — leads into the hands-on simulations (no spoilers) */}
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#475569", textAlign: "center", marginTop: 4 }}>
            {t(E, "Now let's actually try it on an orbit, step by step →",
                 "이제 줄에 직접 한 칸씩 적용해봐요 →")}
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
              "Follow just the blue-arrow line. Gray cells = other lines.",
              "파란 화살표 한 줄만 따라가요. 회색 칸은 다른 줄이에요.")}
            stepData={[
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "Orbit G G B — no stars placed yet (G = star in ONE photo, B = star in BOTH). Start at cell (0) and follow the orbit to the end.", "줄 G G B — 아직 별을 안 놓은 상태 (G = 한 사진에만 별, B = 두 사진 모두 별). 시작 칸 (0) 부터 끝 (2) 으로 별이 가는 방향을 따라가요.")
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
              cells: [{letter:"G",star:true,active:false,done:true},{letter:"G",star:false,active:false},{letter:"B",star:false,active:true}],
              note: t(E, "B(2): for this to be a B, the cell before it — G(1) — must SEND a star here. But none comes. 💥", "B(2): 여기가 B 가 되려면, 앞 칸 G(1) 이 별을 보내줘야 해요. 그런데 안 와요. 💥"),
            },
            {
              cells: [{letter:"G",star:true,active:false,done:true},{letter:"G",star:false,active:true},{letter:"B",star:false,active:false}],
              note: t(E, "A B is a COMMAND: 'the cell before me (G(1)) MUST hold a star.'", "B 는 명령이에요: '바로 앞 칸 G(1) 에 별이 꼭 있어야 해.'"),
            },
            {
              cells: [{letter:"G",star:true,active:false,done:true},{letter:"G",star:false,active:true},{letter:"B",star:false,active:false}],
              note: t(E, "But going forward, G(1) was already filled by G(0)'s star — so it placed NO star of its own → nothing to send.", "근데 앞에서부터 오면서 G(1) 은 G(0) 별로 이미 채워져서 → 자기 별을 안 놨어요. 그래서 보낼 게 없어요."),
            },
            {
              cells: [{letter:"G",star:true,active:false,done:true},{letter:"G",star:false,active:false},{letter:"B",star:false,active:true}],
              note: t(E, "So the forward plan gets stuck.", "그래서 앞→뒤 작전은 막혀요."),
              result: t(E, "→ Stuck here, but it's not unsolvable. Go from the END instead — next slide!", "→ 여기선 막혔지만 못 푸는 건 아니에요. 끝에서부터 거꾸로 가볼게요 — 다음 슬라이드!"),
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
        "같은 줄인데 — 방향만 뒤집어요: 끝 → 시작. 이번엔 풀려요. 👇"),
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

          {/* "Why backward" now lives in the sim's first bubble (step 0), not a separate box. */}

          {/* Interactive 2D-grid simulation — same orbit, walked end → start */}
          <OrbitGridStepSim
            key="bwd-greedy" E={E}
            rows={5} cols={5} orbit={[[0,0],[2,1],[4,2]]}
            caption={t(E,
              "Same orbit — but walk it backward, from the END (2) toward the start (0).",
              "같은 줄인데 — 이번엔 거꾸로, 끝 (2) → 시작 (0) 방향으로 가요.")}
            stepData={[
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "Why from the end? A B is a COMMAND: 'the cell before me MUST have a star.' Going from the end, we meet the B first → so we can put that star right away. (Going forward, we used that cell up before meeting the B → stuck.) So: end (2) → back.",
                         "왜 끝부터냐고요? B 는 '내 앞 칸에 별이 꼭 있어야 해' 하는 명령이에요. 끝부터 가면 B 를 먼저 만나서 → 그 앞 칸에 별을 바로 놓아줄 수 있어요. (앞에서 가면 그 칸을 B 만나기도 전에 써버려 막혔죠.) 그래서 끝 (2) 부터 거꾸로!")
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
              note: t(E, "Done! We met the B first and obeyed it right away — and that same star also covered G(1). Nothing to guess, so we never get stuck.", "완료! B 를 먼저 만나 명령을 바로 들어주니, 그 별이 G(1)까지 같이 해결됐어요. 고를 게 없어서 안 막혀요."),
              result: t(E, "3 stars — all satisfied ✓", "별 3개 — 모든 조건 충족 ✓"),
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

    /* 2-G0 — REMOVED (2026-06-17): predecessor sim duplicated 2-0 ("거꾸로 한 칸"); the
       B/G/W rule box + tip were walls the code slides' comments already cover.
       Teacher: "이 페이지 필요한가? 밑에 칸 읽기 싫은데." Backward sim → code now flows directly. */

    /* 2-G1 — backward greedy core code */
    sectionStep(sections[6], t(E,
      "Here's the heart of it: two loops sweeping backward, a set called possibles, and the B / G / W branches you just saw. Read it slowly — every branch matches one line of the rule.",
      "핵심이에요: 거꾸로 도는 for 두 개, possibles 라는 set, 그리고 방금 본 B / G / W 갈래. 천천히 읽어봐요 — 각 갈래가 규칙 한 줄에 딱 대응해요.")),

    /* 2-G2 — full backward greedy program (teacher's verified code) */
    sectionStep(sections[7], t(E,
      "Now the complete program: read input → the backward greedy → print the count (or -1). This is the actual code that passed USACO 12/12.",
      "이제 전체 코드: 입력 받기 → 뒤→앞 그리디 → 별 수 출력 (또는 -1). 이게 USACO 12/12 통과한 실제 코드예요.")),

    /* 2-G3 — confidence check + the -1 edge case */
    {
      type: "reveal",
      narr: t(E,
        "Let's run the code by hand on orbit G G B and watch 'possibles' fill up. 👇",
        "코드를 손으로 줄 G G B 에 돌려보며 'possibles' 가 차는 걸 봐요. 👇"),
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
            {t(E, "Next: see what DP does — keep both choices per cell, pick the smaller at the end.",
                  "다음에서 DP 가 뭘 하는지 봐요 — 칸마다 두 경우 들고 가다 끝에서 작은 것 고르기.")}
          </div>
        </div>
      ),
    },

    /* 2-3.3 — "What DP is + DP on THIS problem" — no analogy, built on the brute/greedy the
       student already saw (teacher: analogy too hard, explain plainly). */
    {
      type: "reveal",
      narr: t(E,
        "What's DP? Just go cell by cell from the left, counting how few stars were in photo 1. 👇",
        "DP가 뭐냐면 — 왼쪽부터 한 칸씩 가면서, 사진 1에 별이 몇 개 있었는지 세는 거예요. 👇"),
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
            <div style={{ fontSize: 14, fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              💡 {t(E, "DP = go cell by cell from the left, counting how many stars were in photo 1", "DP = 왼쪽부터 한 칸씩 가며, 사진 1에 별이 몇 개였나 세기")}
            </div>
            <div style={{ fontSize: 13, color: "#4c1d95", lineHeight: 1.6 }}>
              {t(E, "The fewest is the answer.", "가장 적게 나오는 게 답이에요.")}
            </div>
          </div>
          <div style={{ background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 10, padding: "11px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 13, color: "#6b21a8", lineHeight: 1.7 }}>
              {t(E,
                "Words are hard — let's just do it. Next, count the line [G, W, G, G] one cell at a time, with an easy bubble at each cell. 👉",
                "글로는 어려우니 — 다음에서 그냥 한 칸씩 직접 세 봐요. [G, W, G, G] 줄을 한 칸씩, 칸마다 쉬운 말풍선으로 짚어줄게요. 👉")}
            </div>
          </div>

        </div>
      ),
    },

    /* 2-3.45 — Step through ONE line [G,W,G,G] cell-by-cell, plain-language bubbles,
       BEFORE the free-play toggle sim. Builds the "two boxes A/B" idea slowly. */
    {
      type: "reveal",
      narr: t(E,
        "Goal: fewest stars we PLACE to make line [G, W, G, G]. Walk it one cell at a time — each cell keeps two numbers ('don't send' / 'send'). Read each bubble. Next ▶ 👇",
        "목표: 줄 [G, W, G, G]을 만드는 데 우리가 놓는 별이 최소 몇 개. 한 칸씩 걸어가며 칸마다 숫자 두 개('안 보냄'/'보냄')를 채워요. 말풍선을 읽어요. 다음 ▶ 👇"),
      content: (<AstralDpWalk E={E} />),
    },

  ];
}
