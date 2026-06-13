import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getAstralSections, AstralComposite, AstralChainDiscovery, AstralAlgoTrace, AstralDpSim } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

/* ── 클릭형 궤도 시뮬레이터 ──────────────────────────────────────
   stepData: Array<{ cells: {letter,star,active}[], note: string, result?: string, ok?: boolean }>
   ─────────────────────────────────────────────────────────── */
function ChainStepSim({ stepData }) {
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
        {btn(isFirst, "◀ 이전", () => setSi(Math.max(0, idx - 1)))}
        <span style={{ fontSize: 11, color: "#64748b", minWidth: 44, textAlign: "center" }}>
          {idx + 1} / {stepData.length}
        </span>
        {btn(isLast, "다음 ▶", () => setSi(Math.min(last, idx + 1)))}
      </div>
    </div>
  );
}

/* ── 2D 그리드 궤도 시뮬레이터 ──────────────────────────────────
   별이 그리드 위에서 ↘ 대각선으로 이동하는 궤도를 직접 보여줌.
   orbit: [[r,c]...] 궤도 칸 좌표 (별 가는 순서대로)
   stepData: ChainStepSim 과 동일 — cells[i] ↔ orbit[i]
   ─────────────────────────────────────────────────────────── */
function OrbitGridStepSim({ rows, cols, orbit, stepData, caption }) {
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
                return (
                  <div key={`${r}-${c}`} style={{
                    position: "absolute", left, top, width: CELL, height: CELL, borderRadius: 8, zIndex: 1,
                    border: `2.5px solid ${cell.active ? "#3b82f6" : cell.star ? "#d97706" : "#c7d2fe"}`,
                    background: cell.active ? "#dbeafe" : cell.star ? "#fef9c3" : "#eef2ff",
                    boxShadow: cell.active ? "0 0 0 4px rgba(59,130,246,0.18)" : "none",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s",
                  }}>
                    {cell.star && (
                      <div style={{ position: "absolute", top: -11, fontSize: 15, color: "#d97706", fontWeight: 800 }}>★</div>
                    )}
                    <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1, color: cell.active ? "#1e40af" : cell.star ? "#92400e" : "#6366f1" }}>
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
            {cur.why && (
              <div style={{ marginTop: 7, paddingTop: 7, borderTop: "1px dashed #e2e8f0", fontSize: 11.5, color: "#6b7280", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                {cur.why}
              </div>
            )}
            {isLast && cur.result && (
              <div style={{ marginTop: 7, fontSize: 12, fontWeight: 800, color: cur.ok ? "#15803d" : "#b91c1c" }}>
                {cur.result}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Prev / Next */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        {btn(isFirst, "◀ 이전", () => setSi(Math.max(0, idx - 1)))}
        <span style={{ fontSize: 11, color: "#64748b", minWidth: 44, textAlign: "center" }}>
          {idx + 1} / {stepData.length}
        </span>
        {btn(isLast, "다음 ▶", () => setSi(Math.min(last, idx + 1)))}
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
        "Now the formal rules. We see the COMPOSITE (the merged picture): W (empty in both photos), G (star in exactly one), B (star in both). Find the minimum stars in the original photo, or -1 if impossible.",
        "이제 정확한 규칙. 합성 (두 사진 합친 그림) 의 각 칸: W (둘 다 없음), G (한 사진에만), B (둘 다). 처음 사진에 별이 가장 적게 몇 개인지 답으로 써요, 안 되면 -1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔭</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#4f46e5" }}>Astral Superposition</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2025 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eef2ff", border: "1.5px solid #4f46e5", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#312e81", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#312e81", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum stars in the original photo that match the composite — or -1 if no consistent original exists.",
                "합친 그림과 맞아떨어지는 원본 사진의 별 가장 적은 개수를 답으로 — 맞는 원본이 없으면 -1.")}
            </div>
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
        "Sample 1: stars don't move at all (right=0, down=0). Each G is a star that disappeared, each B is a star that stayed. So min stars = (G count) + (B count) = 7.",
        "샘플 1: 별이 아예 안 움직임 (right=0, down=0). G 는 사라진 별, B 는 그대로 있는 별. 별 가장 적게 = G 칸 수 + B 칸 수 = 7."),
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

          <div style={{ background: "#eef2ff", border: "1px solid #a5b4fc", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 600, color: "#312e81", marginBottom: 6 }}>
              🔍 {t(E, "Why so simple when stars don't move?", "별이 안 움직이면 왜 이렇게 간단할까?")}
            </div>
            <div>
              {t(E, "If a star doesn't move, photo 2 looks the SAME as photo 1. So:",
                    "별이 안 움직이면 사진 2 가 사진 1 이랑 똑같아요. 그래서:")}
            </div>
            <div style={{ marginTop: 6, lineHeight: 1.7 }}>
              • <b>W</b> = {t(E, "no star in either photo", "두 사진 다 비어")} → 0 stars<br/>
              • <b>G</b> = {t(E, "star showed up in only ONE of the photos — must be a star that disappeared",
                                "한 사진에만 보였음 → 사라진 별")} → 1 star<br/>
              • <b>B</b> = {t(E, "star in both photos — star stayed", "두 사진 다 별 → 그대로 있던 별")} → 1 star
            </div>
            <div style={{ marginTop: 8, color: "#15803d", fontWeight: 700 }}>
              {t(E, "So min stars = (G count) + (B count) = 3 + 4 = 7.",
                    "그래서 별 가장 적게 = G 칸 수 + B 칸 수 = 3 + 4 = 7.")}
            </div>
          </div>
        </div>),
    },

    /* 1-3.4a — Visual: corner G has no incoming source */
    {
      type: "reveal",
      narr: t(E,
        "Look — corner cell (0,0) is G. Star moves: right 1, down 1. For a star to arrive HERE, it would have come from up 1, left 1 = (-1,-1). That's outside the grid — no star can ever arrive at (0,0).",
        "봐요 — 모서리 칸 (0,0) 이 G. 별 이동: 오른쪽 1, 아래 1. 별이 여기로 들어오려면 위 1, 왼쪽 1 = (-1,-1) 에서 와야 해요. 근데 그건 사진 밖. 그래서 (0,0) 에 별이 들어올 길 자체가 없어요."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Bridge: Sample 1 was easy (no move). Now stars move → G becomes ambiguous. */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "9px 13px", marginBottom: 12, fontSize: 12, color: "#92400e", lineHeight: 1.6 }}>
            💡 {t(E,
              "Sample 1 was easy because stars didn't move — a G could only be a star that left. Now stars MOVE, and that makes G tricky: a G could be a star that left, OR a star that slid in from another cell.",
              "Sample 1은 별이 안 움직여서 쉬웠어요 — G는 '떠난 별'일 수밖에 없었거든요. 이제 별이 움직이면 G가 까다로워져요: G는 '떠난 별'일 수도, '옆 칸에서 슬쩍 들어온 별'일 수도 있어요.")}
          </div>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              📍 {t(E, "Corner G — predecessor off-grid", "모서리 G — 이전 칸 사진 밖")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "Star moves: right 1, down 1. The dashed cell is outside the grid.",
                    "별 이동: 오른쪽 1, 아래 1. 점선 칸은 사진 밖.")}
            </div>
          </div>

          {/* 4x4 layout: phantom (-1,-1) at top-left + real 3x3 grid bottom-right */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 56px)", gridTemplateRows: "repeat(4, 56px)", gap: 4 }}>
              {/* Row -1: phantom (-1,-1) + empty */}
              <div style={{ background: "#fee2e2", border: "2px dashed #dc2626", borderRadius: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#991b1b", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700 }}>
                <div style={{ fontSize: 22, lineHeight: 1 }}>❌</div>
                <div style={{ fontSize: 9, marginTop: 2 }}>(-1,-1)</div>
              </div>
              <div></div><div></div><div></div>
              {/* Row 0 */}
              <div></div>
              <div style={{ background: "#cbd5e1", border: "2.5px solid #4f46e5", borderRadius: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#1e293b", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>
                <div style={{ fontSize: 18 }}>G</div>
                <div style={{ fontSize: 9, color: C.dim, marginTop: 1 }}>(0,0)</div>
              </div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(0,1)</div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(0,2)</div>
              {/* Row 1 */}
              <div></div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(1,0)</div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(1,1)</div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(1,2)</div>
              {/* Row 2 */}
              <div></div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(2,0)</div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(2,1)</div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(2,2)</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, color: "#92400e", fontWeight: 600, lineHeight: 1.6, textAlign: "center" }}>
              {t(E,
                "For a star to ARRIVE at (0,0), it would have come from (-1,-1) — but that cell is OUTSIDE the grid. So no star can arrive here.",
                "(0,0) 에 별이 들어오려면 (-1,-1) 에서 와야 했어요 — 근데 그 칸은 사진 밖. 그래서 별이 못 들어와요.")}
            </div>
          </div>

          {/* ✅ The only remaining possibility — shown as two photos taken at different times */}
          <div style={{ background: "#f0fdf4", border: "2px solid #16a34a", borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#14532d", marginBottom: 12, textAlign: "center" }}>
              ✅ {t(E, "Then the ONLY story that fits:",
                       "그럼 가능한 단 하나의 이야기:")}
            </div>

            {/* Two photos taken at different times → composite */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              {/* Photo 1 */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
                  📷 {t(E, "Photo 1 (first)", "사진 1 (먼저 찍음)")}
                </div>
                <div style={{ width: 54, height: 54, background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#d97706", fontWeight: 800 }}>★</div>
                <div style={{ fontSize: 10, color: "#92400e", marginTop: 3, fontWeight: 700 }}>{t(E, "star at (0,0)", "(0,0) 에 별")}</div>
              </div>

              {/* Time arrow */}
              <div style={{ textAlign: "center", padding: "0 4px" }}>
                <div style={{ fontSize: 18, color: "#15803d", fontWeight: 800 }}>⏰</div>
                <div style={{ fontSize: 10, color: "#15803d", fontWeight: 700 }}>{t(E, "time passes", "시간 지남")}</div>
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>{t(E, "(star leaves: moved or vanished)", "(별이 떠남: 이동했거나 사라짐)")}</div>
              </div>

              {/* Photo 2 */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
                  📷 {t(E, "Photo 2 (later)", "사진 2 (나중에 찍음)")}
                </div>
                <div style={{ width: 54, height: 54, background: "#fff", border: `2px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}></div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 3, fontWeight: 700 }}>{t(E, "(0,0) empty", "(0,0) 비어있음")}</div>
              </div>

              <div style={{ fontSize: 22, color: "#15803d", fontWeight: 800, padding: "0 4px" }}>=</div>

              {/* Composite */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#16a34a", fontWeight: 700, marginBottom: 4 }}>{t(E, "Composite", "합성 (둘 합침)")}</div>
                <div style={{ width: 54, height: 54, background: "#cbd5e1", border: "2.5px solid #16a34a", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#1e293b", fontWeight: 800 }}>G</div>
                <div style={{ fontSize: 10, color: "#15803d", marginTop: 3, fontWeight: 700 }}>{t(E, "star in 1 photo only", "한 사진에만 별")}</div>
              </div>
            </div>

            <div style={{ background: "#dcfce7", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: "#14532d", textAlign: "center", lineHeight: 1.55 }}>
              💡 <b>{t(E,
                "(0,0) is G → an original star WAS here, but it left before photo 2.  → count this star: +1.",
                "(0,0) 가 G → 원래 별이 있었는데 사진 2 찍기 전에 떠남.  → 이 별 1 개 셈: +1.")}</b>
            </div>
          </div>
        </div>
      ),
    },

    /* 1-3.4 — Off-grid insight: G at the corner forces case (a) */
    {
      type: "quiz",
      narr: t(E,
        "You just saw: this corner cell has nothing up-left of it. So a star couldn't have come from there. Lock it in.",
        "방금 봤죠: 이 모서리 칸은 왼쪽 위에 아무 칸도 없어요. 그러니까 거기서 별이 들어올 수가 없어요. 다시 한 번 확인."),
      question: t(E,
        "The corner cell is G, but no star could come from up-left (no cell there). So how did this become G?",
        "모서리 칸이 G 인데, 왼쪽 위에 칸이 없어서 별이 들어올 수가 없어요. 그럼 어떻게 G 가 됐을까요?"),
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

    /* 1-2.5 — Algorithm sim FIRST: see the whole picture (moved from Ch2) */
    {
      type: "reveal",
      narr: t(E,
        "This sim DRAWS ★ on cells where stars exist — that's the answer we're computing. Cells on the SAME line (the line a star travels along) share a background color = one star's path. Different lines don't interact, so we can solve each line alone. ▶ Press start.",
        "이 시뮬은 별이 있는 칸에 ★ 를 그려줘요 — 그게 우리가 구하려는 답. 한 별이 지나는 같은 궤도 위 칸들은 배경 색도 같음 = 한 별의 길. 궤도끼리 서로 영향 X → 한 궤도씩 따로 풀 수 있어요. ▶ 시작 눌러봐요."),
      content: (<AstralAlgoTrace E={E} />),
    },

    /* 1-2.6 — Visual summary: 5 scenes (W, G×2, B×2) using actual cell graphics */
    {
      type: "reveal",
      narr: t(E,
        "Five possible scenes — one peek and you know.",
        "다섯 가지 장면. 한번 보면 머리에 들어와."),
      content: (() => {
        // Reusable mini cell graphic — same look as the sim
        const Cell = ({ letter, hasStar, outside, dim, label }) => (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 7,
              background: outside ? "transparent" : (dim ? "#f1f5f9" : "#fff"),
              border: outside ? "2px dashed #cbd5e1" : `2px solid ${letter === "B" ? "#1e293b" : letter === "G" ? "#a78bfa" : "#cbd5e1"}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              {outside ? (
                <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 700 }}>{t(E, "off-grid", "밖")}</div>
              ) : (
                <>
                  {hasStar && <div style={{ fontSize: 18, lineHeight: 1, color: "#d97706", fontWeight: 900 }}>★</div>}
                  {!hasStar && letter && <div style={{ fontSize: 14, fontWeight: 800, color: dim ? "#94a3b8" : "#475569", lineHeight: 1 }}>{letter}</div>}
                  {!hasStar && !letter && <div style={{ fontSize: 14, color: "#cbd5e1" }}>·</div>}
                </>
              )}
            </div>
            {label && <div style={{ fontSize: 9.5, color: "#64748b", fontWeight: 600 }}>{label}</div>}
          </div>
        );

        const Arrow = () => (
          <div style={{ fontSize: 18, color: "#94a3b8", margin: "0 4px", marginTop: -10 }}>↖</div>
        );

        const SceneRow = ({ predCell, currentCell, verdict, verdictColor, bg, border }) => (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: bg, border: `2px solid ${border}`, borderRadius: 10,
            padding: "8px 12px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2, minWidth: 130 }}>
              {predCell}
              <Arrow />
              {currentCell}
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: verdictColor, flex: 1, lineHeight: 1.35 }}>
              {verdict}
            </div>
          </div>
        );

        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "0 4px" }}>
            {/* W scene — just one cell, no trace */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#f8fafc", border: "2px solid #cbd5e1", borderRadius: 10,
              padding: "8px 12px",
            }}>
              <div style={{ display: "flex", alignItems: "center", minWidth: 130, paddingLeft: 78 }}>
                <Cell letter="W" hasStar={false} dim />
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0f766e", flex: 1 }}>
                {t(E, "W → just skip ✓", "W → 그냥 다음 ✓")}
              </div>
            </div>

            {/* G scene 1 — predecessor has star → moved-in */}
            <SceneRow
              predCell={<Cell hasStar={true} label={t(E, "one step back", "거꾸로")} />}
              currentCell={<Cell letter="G" hasStar={true} label={t(E, "here", "여기")} />}
              verdict={t(E, "G — moved-in ✨", "G → 들어온 별 ✨")}
              verdictColor="#7c3aed"
              bg="#faf5ff"
              border="#c4b5fd"
            />

            {/* G scene 2 — predecessor outside grid → original here */}
            <SceneRow
              predCell={<Cell outside label={t(E, "one step back", "거꾸로")} />}
              currentCell={<Cell letter="G" hasStar={true} label={t(E, "here", "여기")} />}
              verdict={t(E, "G — original here 🌱", "G → 원래 여기 별 🌱")}
              verdictColor="#7c3aed"
              bg="#faf5ff"
              border="#c4b5fd"
            />

            {/* G scene 3 — predecessor inside grid but W (empty) → also original here */}
            <SceneRow
              predCell={<Cell letter="W" hasStar={false} dim label={t(E, "one step back", "거꾸로")} />}
              currentCell={<Cell letter="G" hasStar={true} label={t(E, "here", "여기")} />}
              verdict={t(E, "G — also original here 🌱", "G → 똑같이 원래 여기 별 🌱")}
              verdictColor="#7c3aed"
              bg="#faf5ff"
              border="#c4b5fd"
            />

            {/* B scene — both have star → OK */}
            <SceneRow
              predCell={<Cell hasStar={true} label={t(E, "one step back", "거꾸로")} />}
              currentCell={<Cell letter="B" hasStar={true} label={t(E, "here", "여기")} />}
              verdict={t(E, "B — both ★ ✓ OK", "B → 양쪽 다 별 ✓ OK")}
              verdictColor="#16a34a"
              bg="#f0fdf4"
              border="#86efac"
            />

            {/* B scene invalid — pred outside grid → EMPTY */}
            <SceneRow
              predCell={<Cell outside label={t(E, "one step back", "거꾸로")} />}
              currentCell={<Cell letter="B" hasStar={true} label={t(E, "here", "여기")} />}
              verdict={t(E, "B — pred ★ missing ❌", "B → 거꾸로 별 없음 ❌")}
              verdictColor="#dc2626"
              bg="#fef2f2"
              border="#fca5a5"
            />

            {/* B scene invalid — pred W (empty) → also EMPTY */}
            <SceneRow
              predCell={<Cell letter="W" hasStar={false} dim label={t(E, "one step back", "거꾸로")} />}
              currentCell={<Cell letter="B" hasStar={true} label={t(E, "here", "여기")} />}
              verdict={t(E, "B — pred is W, still ★ missing ❌", "B → 거꾸로 W 라도 별 없음 ❌")}
              verdictColor="#dc2626"
              bg="#fef2f2"
              border="#fca5a5"
            />
          </div>
        );
      })(),
    },

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
      question: t(E,
        "3×3 grid, stars move right 1 down 1. For a cell to be B, a star must arrive from its top-left neighbor (one step back). Which cell can NEVER be B?",
        "3×3 사진, 별 이동: 오른쪽 1·아래 1. B 가 되려면 왼쪽 위 칸 (한 칸 거꾸로) 에서 별이 와야 해요. 어느 칸은 그 자리가 사진 밖이라서 절대 B 가 될 수 없을까?"),
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
        "Each star shifts the same way every photo. Here: right=1, down=2. So (0,0) → (2,1) → (4,2) → off the grid.\nWe call this path an orbit.",
        "별은 사진마다 똑같이 움직여요. 예시: right=1, down=2. (0,0) → (2,1) → (4,2) → 사진 밖.\n이 경로를 궤도라고 해요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#1e3a8a", marginBottom: 5, textAlign: "center" }}>
            {t(E, "Example: right=1, down=2 — trace one star", "예시: right=1, down=2 — 별 하나 따라가기")}
          </div>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 12, textAlign: "center" }}>
            {t(E, "right = move right →,  down = move down ↓", "right = 오른쪽으로 →,  down = 아래로 ↓")}
          </div>

          {/* 4×4 grid — chain: (0,0) and (2,1) highlighted, arrow between them */}
          {(() => {
            // For right=1, down=2: star at (0,0) moves to (2,1), then off grid
            const chain = new Set(["0,0", "2,1"]);
            return (
              <div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:10 }}>
                  {[0,1,2,3].map(r => (
                    <div key={r} style={{ display:"flex", gap:5, marginBottom:5 }}>
                      {[0,1,2,3].map(c => {
                        const on = chain.has(`${r},${c}`);
                        const isFirst = r===0 && c===0;
                        const isSecond = r===2 && c===1;
                        return (
                          <div key={c} style={{
                            width:52, height:52, borderRadius:8,
                            background: on ? "#dbeafe" : "#f8fafc",
                            border: on ? "2.5px solid #3b82f6" : "1.5px solid #e2e8f0",
                            display:"flex", flexDirection:"column",
                            alignItems:"center", justifyContent:"center", gap:1,
                            position:"relative",
                          }}>
                            <div style={{ fontSize: on ? 20 : 14, color: on ? "#2563eb" : "#e2e8f0", lineHeight:1 }}>
                              {on ? "★" : "·"}
                            </div>
                            {on && (
                              <div style={{ fontSize:9, color:"#93c5fd", fontWeight:700 }}>({r},{c})</div>
                            )}
                            {isFirst && (
                              <div style={{
                                position:"absolute", top:-9, right:-9,
                                background:"#2563eb", color:"#fff",
                                fontSize:8, fontWeight:800, borderRadius:4, padding:"1px 4px",
                              }}>START</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Step-by-step calculation */}
                <div style={{ background:"#eff6ff", border:"1.5px solid #93c5fd", borderRadius:9, padding:"10px 14px", marginBottom:10 }}>
                  <div style={{ fontSize:12, fontWeight:800, color:"#1e3a8a", marginBottom:8 }}>
                    {t(E, "How to calculate next position:", "다음 칸 계산 방법:")}
                  </div>
                  {[
                    {
                      from:"(0,0)", calc: t(E,"row 0+2=2, col 0+1=1","행 0+2=2, 열 0+1=1"), to:"(2,1)", ok:true,
                    },
                    {
                      from:"(2,1)", calc: t(E,"row 2+2=4, col 1+1=2","행 2+2=4, 열 1+1=2"), to: t(E,"(4,2) off grid → chain ends","(4,2) 밖 → 여기서 궤도 끝"), ok:false,
                    },
                  ].map((step,i) => (
                    <div key={i} style={{
                      display:"flex", alignItems:"center", gap:8, marginBottom: i===0 ? 6:0,
                      fontFamily:"monospace", fontSize:12,
                    }}>
                      <span style={{
                        background:"#dbeafe", border:"2px solid #3b82f6", borderRadius:6,
                        padding:"4px 9px", fontWeight:800, color:"#1e40af",
                      }}>{step.from}</span>
                      <span style={{ color:"#64748b", fontSize:11 }}>+right=1, +down=2</span>
                      <span style={{ color:"#94a3b8" }}>→</span>
                      <span style={{
                        background: step.ok ? "#dbeafe" : "#f1f5f9",
                        border: `2px solid ${step.ok ? "#3b82f6" : "#cbd5e1"}`,
                        borderRadius:6, padding:"4px 9px", fontWeight:800,
                        color: step.ok ? "#1e40af" : "#64748b",
                      }}>{step.to}</span>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize:12, color:"#374151", textAlign:"center", lineHeight:1.7 }}>
                  {t(E,
                    "Chain = [(0,0) → (2,1)]. Only 2 cells — that's just where the orbit ends. (A star going off-grid simply vanishes; it doesn't affect the answer.)",
                    "궤도 = [(0,0) → (2,1)]. 2칸짜리 궤도예요 — 밖으로 나가면 그냥 거기서 궤도가 끝나는 것. (나간 별은 사라질 뿐, 답 계산엔 안 들어가요.)")}
                </div>
              </div>
            );
          })()}
        </div>
      ),
    },

    /* 2-0a — 독립성: 궤도끼리 완전히 독립 */
    {
      type: "reveal",
      narr: t(E,
        "A star never leaves its own orbit — blue stars only touch blue cells, green only green. So orbits never bump into each other, like trains on separate tracks.\nThat means we can solve one orbit at a time, then add the answers up.",
        "별은 자기 궤도 밖으로 못 나가요. 파란 별은 파란 칸만, 초록 별은 초록 칸만 밟아요. 그래서 궤도끼리 절대 안 부딪혀요 — 선로가 다른 기차들처럼요.\n그러니까 궤도를 하나씩 따로 풀고, 답을 더하면 끝!"),
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

          {/* Why independent — the reason, in kid terms */}
          <div style={{
            background:"#eff6ff", border:"1.5px solid #93c5fd", borderRadius:8,
            padding:"9px 13px", marginBottom:10, fontSize:12, color:"#1e3a8a", lineHeight:1.7,
          }}>
            {t(E,
              "A blue star can never land on a green cell. So whatever happens in the blue orbit doesn't change the green orbit at all. They don't touch → they're independent.",
              "파란 별은 초록 칸에 갈 일이 없어요. 그러니 파란 궤도에서 무슨 일이 생겨도 초록 궤도엔 아무 영향 없어요. 서로 안 만나니까 → 독립이에요.")}
          </div>

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
        "Before the simulations — what does 'greedy' mean? Greedy = pick by looking only at what's in front of you.\nLook only at the current cell and decide immediately, without thinking about what comes next.",
        "시뮬 전에 — '그리디(greedy)' 방법이 뭔지 알아봐요. 그리디 = 눈앞만 보고 고르기.\n지금 내 눈앞에 있는 칸만 보고, 뒤에 뭐가 오는지 생각하지 않고 즉시 결정하는 방법이에요."),
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

          {/* When to use + pros/cons */}
          <div style={{ background: "#fafaf9", border: "2px solid #d6d3d1", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#44403c", marginBottom: 7 }}>
              🤔 {t(E, "When is greedy good — and when is it risky?", "그리디는 언제 좋고, 언제 위험할까?")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
              <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 8, padding: "7px 10px" }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: "#14532d", marginBottom: 3 }}>👍 {t(E,"Good","장점")}</div>
                <div style={{ fontSize: 11, color: "#166534", lineHeight: 1.5 }}>
                  {t(E,"Fast and the code is short — just pick the best-looking choice right now.","빠르고 코드가 짧아요 — 그냥 '지금 제일 좋아 보이는 것'만 고르면 되니까.")}
                </div>
              </div>
              <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "7px 10px" }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: "#991b1b", marginBottom: 3 }}>👎 {t(E,"Risk","단점")}</div>
                <div style={{ fontSize: 11, color: "#b91c1c", lineHeight: 1.5 }}>
                  {t(E,"Looks only at now, so it's sometimes wrong — good now can mean a loss later.","눈앞만 봐서 가끔 틀려요 — 지금 좋아 보여도 나중에 손해일 수 있어요.")}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: "#44403c", lineHeight: 1.6, background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: 7, padding: "7px 10px" }}>
              {t(E,
                "Use it when 'pick the best each step' is guaranteed to give the best total (like making change). So with greedy you must always ask: 'Is this really always correct?'",
                "✅ 언제 써요? '매 순간 제일 좋은 걸 고르면 전체도 최선'인 게 확실할 때만 (거스름돈처럼!). 그래서 그리디는 항상 '이게 정말 맞나?' 확인이 필요해요.")}
            </div>
            <a
              href="/algo/greedy"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 5, marginTop: 9,
                fontSize: 11.5, fontWeight: 700, color: "#7c3aed",
                background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 7,
                padding: "5px 11px", textDecoration: "none",
              }}
            >
              {t(E, "Still curious? Learn greedy in depth", "그리디가 더 궁금하면 → 그리디 알고리즘 제대로 배우기")}
              <span style={{ fontSize: 10, opacity: 0.7 }}>{t(E, "(new tab) ↗", "(새 탭) ↗")}</span>
            </a>
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
        "① Where should I put stars? Let me just try the most natural thing — scan the orbit start → end, one cell at a time, and place a star wherever it seems needed.\nWhen a G has no star arriving into it, place a star there; that star travels to the next cell in photo 2.\nTry it on orbit G G B. It seems to work… until the very end!",
        "① 별을 어디에 놓지? 일단 가장 자연스러운 대로 해볼게요 — 궤도 시작부터 끝까지 한 칸씩 보면서, 필요해 보이는 칸에 별을 놓는 거예요.\n앞에서 별이 안 오는 G 엔 별을 놓고 — 그 별은 사진 2에서 다음 칸으로 가요.\n궤도 G G B 로 해봐요. 잘 되는 것 같다가… 맨 끝에서 무슨 일이?"),
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
            key="fwd-greedy"
            rows={5} cols={5} orbit={[[0,0],[2,1],[4,2]]}
            caption={t(E,
              "Follow just the blue-arrow line (one orbit). Gray cells = other orbits.",
              "파란 화살표 한 줄(= 궤도)만 따라가요. 회색 칸은 다른 궤도예요.")}
            stepData={[
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "Orbit G G B — all empty. Start at cell (0) and follow the orbit to the end.", "궤도 G G B 시작. 시작 칸 (0) 부터 끝 (2) 으로 별이 가는 방향을 따라가요.")
            },
            {
              cells: [{letter:"G",star:true,active:true},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "G(0): nothing arrives here (it's the start) → place ★. This star will travel to G(1) in photo 2.", "G(0): 여기엔 별이 안 와요 (시작 칸) → ★ 놓기. 이 별은 사진 2에서 G(1) 으로 가요.")
            },
            {
              cells: [{letter:"G",star:true,active:false},{letter:"G",star:false,active:true},{letter:"B",star:false,active:false}],
              note: t(E, "G(1): the star from G(0) arrives here in photo 2 → already satisfied → skip. (Looks efficient — one star covered two cells!)", "G(1): G(0) 별이 사진 2에서 여기로 와요 → 이미 OK → 통과. (별 하나로 두 칸 해결, 똑똑해 보이죠!)")
            },
            {
              cells: [{letter:"G",star:true,active:false},{letter:"G",star:false,active:true},{letter:"B",star:false,active:true}],
              note: t(E, "B(2): to fill photo 2, G(1) must SEND a star here. But G(1) was filled for free — it has no star to send. 💥", "B(2): 사진2 를 채우려면 G(1) 이 별을 보내줘야 해요. 그런데 G(1) 은 공짜로 때워서 보낼 별이 없어요. 💥"),
              why: t(E,
                "This orbit is NOT impossible — it solves with 3 stars! Forward handed G(0)'s star to G(1) too early, so the B never got the star it needed.\n→ Walk it backward and you'll see it.",
                "이 궤도, 사실 불가능이 아니에요 — 별 3개로 풀려요! 앞→뒤가 G(0) 의 별을 G(1) 한테 미리 줘버려서, 정작 B 가 필요한 별을 못 받은 거예요.\n→ 거꾸로 가보면 보여요."),
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
        "② End → start: just flip the direction! Same orbit G G B, but this time we start at the END and walk back to the start. So B is the very first cell we hit — we handle its demand BEFORE deciding the earlier cells. (Speed: one quick pass per orbit — easily inside USACO's 4-second limit.)",
        "② 뒤→앞: 방향만 뒤집어봐요! 같은 궤도 G G B 인데, 이번엔 궤도의 끝에서 시작 쪽으로 거꾸로 가요. 그러면 B 를 제일 먼저 만나요 — 앞 칸을 정하기 *전에* B 의 요구부터 들어주는 거예요. (속도: 각 궤도를 한 번만 훑으면 끝 — USACO 4초 제한 여유롭게 통과.)"),
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

          {/* Interactive 2D-grid simulation — same orbit, walked end → start */}
          <OrbitGridStepSim
            key="bwd-greedy"
            rows={5} cols={5} orbit={[[0,0],[2,1],[4,2]]}
            caption={t(E,
              "Same orbit — but walk it backward, from the END (2) toward the start (0).",
              "같은 궤도인데 — 이번엔 거꾸로, 끝 (2) → 시작 (0) 방향으로 가요.")}
            stepData={[
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "Same orbit G G B — all empty. This time start at the end (2) and go back to (0).", "같은 궤도 G G B. 이번엔 끝 칸 (2) 부터 시작 (0) 으로 거꾸로 가요.")
            },
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:true,active:false},{letter:"B",star:true,active:true}],
              note: t(E, "B(2): B cell — ★ here AND ★ at the cell before it, G(1). Now G(1)'s star will travel to B(2) in photo 2 ✓", "B(2): B 칸 → 여기 ★ + 바로 앞 G(1)에도 ★. 이제 G(1) 별이 사진 2에서 B(2)로 와줘요 ✓")
            },
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:true,active:true},{letter:"B",star:true,active:false}],
              note: t(E, "G(1): already has ★ → skip, already satisfied.", "G(1): 이미 ★ 있음 → 통과, 조건 OK.")
            },
            {
              cells: [{letter:"G",star:true,active:true},{letter:"G",star:true,active:false},{letter:"B",star:true,active:false}],
              note: t(E, "G(0): no ★, and it's the start (no cell before it) → place ★ here directly.", "G(0): ★ 없음. 앞 칸이 없는 시작 칸 → 여기에 직접 ★.")
            },
            {
              cells: [{letter:"G",star:true,active:false},{letter:"G",star:true,active:false},{letter:"B",star:true,active:true}],
              note: t(E, "Done! G(0)★, G(1)★, B(2)★ = 3 stars. Every cell satisfied ✓", "완료! G(0)★, G(1)★, B(2)★ = 별 3개. 모든 칸 조건 OK ✓"),
              why: t(E,
                "We met B first and handled its demand — 'the cell before a B must have a star' — up front, and that same star covers G(1). Nothing to guess here (the B forced it all), so we never get stuck.",
                "B 를 먼저 만나서 'B 앞 칸엔 무조건 별' 명령부터 처리했어요 — 그 별이 G(1)도 같이 해결. 여기선 고를 것도 없었어요(B 가 다 강제). 그래서 안 막혀요."),
              result: t(E, "3 stars — all conditions satisfied ✓", "별 3개 — 모든 조건 충족 ✓"),
              ok: true,
            },
          ]} />
        </div>
      ),
    },

    /* ════════════════════════════════════════════════════════════════
       MAIN SOLUTION CODE = the backward greedy (teacher's verified approach).
       Concept was just shown in 2-3.06; now turn it into code, then the full
       program. The DP block below becomes an OPTIONAL "another method" appendix.
       ════════════════════════════════════════════════════════════════ */

    /* 2-G0 — Bridge: the backward rule → code (no chains, no DP table needed) */
    {
      type: "reveal",
      narr: t(E,
        "That backward rule is the whole solution — let's turn it straight into code. The nice surprise: we don't even need to group cells into orbits first. We just sweep the WHOLE grid from the bottom-right corner to the top-left, and keep a set of cells that MUST hold an original star.",
        "방금 그 뒤→앞 규칙이 사실 풀이 전부예요 — 그대로 코드로 옮겨봐요. 놀라운 점: 칸을 궤도별로 묶을 필요도 없어요. 그냥 격자 전체를 오른쪽-아래 끝에서 왼쪽-위로 한 번 훑으면서, '원래 별이 꼭 있어야 하는 칸'만 set 에 모으면 돼요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{
            background: "#f0fdfa", border: "2px solid #0d9488", borderRadius: 10,
            padding: "10px 14px", marginBottom: 12,
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#0f766e", marginBottom: 6, textAlign: "center" }}>
              ⬅️ {t(E, "The rule, as code", "규칙을 코드로")}
            </div>
            {[
              { k: "B", c: "#1e293b", fg: "#fff",
                txt: t(E, "★ here AND ★ at the predecessor (r-down, c-right). If that cell is W or off-grid → -1.",
                         "여기 ★ + 직전 칸 (r-down, c-right) 에도 ★. 그 칸이 W 거나 사진 밖이면 → -1.") },
              { k: "G", c: "#cbd5e1", fg: "#1e293b",
                txt: t(E, "Already starred (a later B grabbed it)? skip. Else: ★ at predecessor if it can hold one, otherwise ★ here.",
                         "이미 별 있음 (뒤쪽 B 가 찍어둠)? 통과. 아니면: 직전 칸이 별 가능하면 거기 ★, 안 되면 여기 ★.") },
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
        "Quick confidence check on orbit G G B again — and the one case that returns -1.",
        "궤도 G G B 로 다시 한번 확인 — 그리고 -1 이 나오는 단 하나의 경우."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{
            background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10,
            padding: "10px 14px", marginBottom: 10,
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#14532d", marginBottom: 6 }}>
              ✅ {t(E, "Trace on G G B (sweeping backward)", "G G B 거꾸로 훑기")}
            </div>
            <div style={{ fontSize: 12, color: "#166534", lineHeight: 1.8, fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, "B(2) → add (2) and its predecessor (1)   → possibles = {1, 2}", "B(2) → (2) 와 직전 칸 (1) 추가   → possibles = {1, 2}")}<br/>
              {t(E, "G(1) → already in possibles → skip", "G(1) → 이미 possibles 에 있음 → 통과")}<br/>
              {t(E, "G(0) → not in set, no predecessor → add (0)   → possibles = {0, 1, 2}", "G(0) → set 에 없고 직전 칸 없음 → (0) 추가   → possibles = {0, 1, 2}")}
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#15803d", marginTop: 6 }}>
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
        "That's the full solution — you could stop here. But here's an optional bonus: a totally different way to think about the same problem, using DP. It's worth knowing because it's 'safe' (you don't have to prove the greedy is always minimum) and it bends easily to harder variants — like 'each star costs a different amount'.",
        "여기까지가 완성된 풀이예요 — 여기서 멈춰도 돼요. 근데 선택 보너스: 같은 문제를 완전히 다른 각도, DP 로 푸는 법. 알아두면 좋은 이유 — '안전하고' (그리디가 항상 최소인지 증명 안 해도 됨), 더 어려운 변형에도 잘 휘어져요 (예: '별마다 비용이 다르다')."),
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
        "To really understand why the minimum is what it is, let's try a completely different approach: test every possible combination! Each G cell has two choices — place a brand-new star here, OR let a star from the previous cell travel here in photo 2.",
        "왜 그 값이 최솟값인지 제대로 이해하려면 완전히 다른 방법으로 봐요: 모든 경우를 다 시도해보기! 각 G 칸은 두 가지 선택 — 여기 새 별을 놓거나, 아니면 앞 칸 별이 사진 2에서 이 칸으로 이동해 오거나."),
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
              {t(E, "Chain: G → G (2 cells along the star line)", "궤도: G → G (별 한 궤도에 G 가 2 개)")}
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
        "Brute force works but explodes. Each G doubles the options. A chain with k G cells = 2^k combinations.",
        "단순 시도는 항상 정답인데 너무 느려요. G 칸이 하나 늘어날 때마다 경우의 수가 2 배. G 가 k 개면 2^k 가지."),
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
        "Key insight: anywhere in a row, only ONE thing from the past matters — 'is a star arriving here?' That's just 2 states. Carry both options forward at every cell, pick the smaller at the very end. Same correctness as trying everything — but way, way faster. That's DP.",
        "핵심 발견: 궤도 어느 지점에서든, 앞에서 중요한 정보는 딱 하나 — '별이 이리 오고 있나?' 상태가 딱 2 가지예요. 매 칸에서 두 경우를 다 들고 가다가 끝에서 작은 거 고르면 돼요. 모든 경우를 다 해보는 것만큼 정확하고, 훨씬 빠른 방법 — 이게 바로 DP예요."),
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
                "At every cell, there's only ONE thing we don't know yet: 'is a star arriving here from the previous cell?' Yes or No. So we carry TWO numbers side by side:",
                "각 칸에서 모르는 게 딱 하나예요: '앞 칸 별이 여기로 이동해 오고 있나?' 예/아니오. 그래서 두 숫자를 나란히 들고 가요:")}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 7, flexWrap: "wrap" }}>
              {[
                { label: t(E, "No star arriving →", "별 안 왔을 때 →"), desc: t(E, "min stars so far", "지금까지 별 수 최솟값"), bg: "#dcfce7", bd: "#16a34a", tc: "#14532d" },
                { label: t(E, "Star IS arriving →", "별 왔을 때 →"), desc: t(E, "min stars so far", "지금까지 별 수 최솟값"), bg: "#dbeafe", bd: "#3b82f6", tc: "#1e40af" },
              ].map((item, i) => (
                <div key={i} style={{ background: item.bg, border: `1.5px solid ${item.bd}`, borderRadius: 7, padding: "6px 10px", flex: 1, minWidth: 110 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: item.tc }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: item.tc, opacity: 0.8 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: "#14532d", marginTop: 7, lineHeight: 1.6 }}>
              {t(E,
                "At the last cell, just pick the smaller of the two. Done!",
                "마지막 칸에서 두 숫자 중 작은 걸 고르면 그게 정답이에요!")}
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

          {/* Backward Greedy vs DP — the two winners */}
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            padding: "10px 14px",
          }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#374151", marginBottom: 8, textAlign: "center" }}>
              {t(E, "The two winners compared:", "두 정답 방법 비교:")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#14532d", marginBottom: 4 }}>⬅️ {t(E,"Right→left greedy","뒤→앞 그리디(greedy)")}</div>
                <div style={{ fontSize: 11, color: "#166534", lineHeight: 1.55 }}>
                  {t(E,
                    "\"B cells grab first.\" Simple to code, passes USACO. Works by intuition — why it's always minimum is less obvious.",
                    "\"B 칸 먼저 처리.\" 코드 간단, USACO 통과. 직관적으로 작동하는데 왜 항상 최솟값인지는 설명하기 어려워요.")}
                </div>
              </div>
              <div style={{ background: "#eef2ff", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#3730a3", marginBottom: 4 }}>💡 DP</div>
                <div style={{ fontSize: 11, color: "#3730a3", lineHeight: 1.55 }}>
                  {t(E,
                    "Carry both options at every cell, pick the smaller at the end. Always correct — no guessing needed.",
                    "매 칸에서 두 경우를 나란히 들고 가다가 끝에서 작은 거 선택. 항상 정확 — 운에 의존 안 해요.")}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 10.5, color: "#64748b", textAlign: "center", marginTop: 6, lineHeight: 1.5 }}>
              {t(E,
                "Both are equally fast. We already coded the greedy above; this appendix codes the DP — always correct, and it bends to variants.",
                "둘 다 속도는 같아요. 그리디는 위에서 이미 짰고, 이 부록에선 DP 를 짜봐요 — 항상 정확하고, 변형에도 강해요.")}
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
        "Why TWO numbers per cell? At a G cell, the star can either keep or pass out — we can't pick the better option yet (depends on what comes later). So we carry BOTH options forward: min_stars[0] = stars if this cell does NOT pass; min_stars[1] = stars if it DOES. The LAST cell's smaller number = the path's answer.",
        "왜 칸마다 숫자가 두 개? G 칸에선 별을 머무를지 보낼지 두 가지 선택 가능 — 지금 못 골라요 (뒤에 뭐 오는지 봐야). 그래서 두 옵션 다 들고 가는 거: min_stars[0] = 안 보낼 때 별 수, min_stars[1] = 보낼 때 별 수. 마지막 칸의 작은 숫자 = 답. ❌ 나오면 그 길은 못 만들어요."),
      content: (<AstralDpSim E={E} />),
    },

    /* 2-3.7 — Bridge: ❌ in sim ↔ EMPTY (a huge number) in code.
       MOVED here 2026-06-02 (was between STEP 1 and STEP 2). Now right after the sim
       so EMPTY is introduced while ❌ is fresh; STEP labels stay uninterrupted. */
    {
      type: "reveal",
      narr: t(E,
        "Quick bridge — the ❌ you just saw in the sim is what the CODE calls EMPTY (a huge number). Why a number and not a 'fail' flag? Because of one min(...) trick.",
        "잠깐 다리 — 방금 시뮬에 보인 ❌ 를 코드에선 EMPTY (엄청 큰 수) 라고 불러요. 왜 그냥 '실패' 표시 안 쓰고 큰 수? min(...) 한 줄 요령 때문이에요."),
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
        "🔹 STEP 1 — Set up the FIRST cell. It has nothing before it (no incoming star). So min_stars[0]/min_stars[1] are forced by the letter.",
        "🔹 1 단계 — 첫 칸 설정. 앞에 아무것도 없으니 들어올 별 X. 첫 칸의 min_stars[0]/min_stars[1] 은 글자 보고 바로 결정."),
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
        "🔹 STEP 2 — cheat sheet for each next cell. Given the letter (W/G/B), how to compute new min_stars from previous min_stars. Just a few lines of code.",
        "🔹 2 단계 — 다음 칸마다 적용할 치트시트. 글자 (W/G/B) 보고, 이전 min_stars 에서 새 min_stars 어떻게 계산하는지. 코드 몇 줄로 끝."),
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
        "🔹 STEP 3 — pick the answer from the LAST cell. Whatever star this cell would 'pass on' goes off the grid anyway, so both options are valid. Take the smaller. If even the smaller is ❌, the whole path is impossible (-1).",
        "🔹 3 단계 — 마지막 칸에서 답 고르기. 마지막 칸이 별을 보내든 말든 어차피 사진 밖이라 상관없음. 그러니 두 옵션 다 OK, 더 작은 쪽 = 답. 그것마저 ❌ 면 이 별 길은 못 만듦 (-1)."),
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
        "🎯 All 3 steps in action — hand-trace the path [G, W, G, G]. You can replay each row in the live sim above (preset 'G→W→G→G'). Final answer = 2.",
        "🎯 1+2+3 단계를 한 별 길에 다 적용 — [G, W, G, G] 손으로 풀어보기. 위 시뮬에서 프리셋 'G→W→G→G' 로 궤도마다 확인 가능. 답 = 2."),
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
        "Final check: let's run the WHOLE algorithm on a fresh example, end to end. 3×3 grid, stars move right 1, down 1. Watch how the 5 steps come together into one final answer.",
        "마지막 확인: 새 예시로 알고리즘 전체를 처음부터 끝까지 돌려봐요. 3×3 사진, 별 이동: 오른쪽 1, 아래 1. 5 단계가 어떻게 모여서 답 하나 나오는지 봐요."),
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
