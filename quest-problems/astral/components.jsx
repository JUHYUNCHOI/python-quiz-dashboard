// ✅ USACO_VERIFIED — locally re-verified 2026-06-14 (greedy ≡ 12/12 DP + brute oracle + official samples)
//   Last full verification: 2026-05-13 (Python 12/12 PASS, C++ 12/12 PASS) — DP solution.
//   2026-06-01: Renamed A → right, B → down for student readability.
//     Algorithm unchanged. Must resubmit to USACO to confirm before main deploy.
//   2026-06-03: Added BACKWARD-GREEDY as the MAIN solution (teacher's own verified
//     approach). AST_GREEDY_FULL_PY is the teacher's actual USACO-accepted Python
//     submission (logic verbatim; only input-reading switched to the fast
//     sys.stdin pattern to match section 1). AST_GREEDY_FULL_CPP is a faithful
//     C++ translation — LOCALLY VERIFIED 2026-06-14: identical outputs to the
//     12/12 DP on 4000 random cases + an independent brute-force oracle on 3000
//     random cases + both official samples; worst case (N=1000 × 10) 1.86s (< 4s).
//     The DP constants below are kept as an OPTIONAL "another method" appendix.
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState, useEffect } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

const A_COLOR = "#4f46e5";

const AST_SAMPLE = ["1", "3 0 0", "WWB", "BBB", "GGG"];

/* ════════════════════════════════════════════════════════════════════
   AstralComposite — show the composite + a chain trace overlay.
   ════════════════════════════════════════════════════════════════════ */
const AST_PRESETS = [
  { name: "S1: right=down=0", N: 3, right: 0, down: 0, grid: ["WWB", "BBB", "GGG"] },
  { name: "S2-1: right=1 down=2", N: 5, right: 1, down: 2, grid: ["GWGWW", "WGWWW", "WBWGW", "WWWWW", "WWGWW"] },
  { name: "S2-2: impossible", N: 3, right: 1, down: 1, grid: ["WWW", "WBW", "WWW"] },
  { name: "S2-3: right=1 down=0", N: 3, right: 1, down: 0, grid: ["GGB", "GGW", "WWW"] },
];

export function AstralComposite({ E }) {
  const [pi, setPi] = useState(0);
  const preset = AST_PRESETS[pi];
  const { N, right, down, grid } = preset;
  const [hi, setHi] = useState(null); // [r, c] of last clicked cell

  // Build chain through (r0, c0) — walk forward AND backward to find both ends.
  let chainCells = [];
  if (hi && (right !== 0 || down !== 0)) {
    let [r, c] = hi;
    // walk back to start
    while (r - down >= 0 && c - right >= 0) { r -= down; c -= right; }
    // walk forward
    while (r >= 0 && c >= 0 && r < N && c < N) {
      chainCells.push([r, c]);
      r += down; c += right;
    }
  }

  const cellSize = N <= 3 ? 50 : 38;
  const inChain = new Set(chainCells.map(([r, c]) => `${r},${c}`));

  const colorFor = (ch) => {
    if (ch === "W") return { bg: "#fff", fg: "#cbd5e1", border: C.border };
    if (ch === "G") return { bg: "#cbd5e1", fg: "#1e293b", border: "#94a3b8" };
    return { bg: "#1e293b", fg: "#fff", border: "#0f172a" };  // B
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {AST_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setHi(null); }} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${pi === i ? A_COLOR : C.border}`,
            background: pi === i ? "#e0e7ff" : "#fff", color: pi === i ? A_COLOR : C.text, cursor: "pointer",
          }}>{p.name}</button>
        ))}
      </div>

      <div style={{ fontSize: 12, color: C.dim, marginBottom: 8, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
        N = {N},  right = {right},  down = {down}
        {(right !== 0 || down !== 0) && <span> · {t(E, "click a cell to trace its star path", "칸 클릭해서 별 길 따라가기")}</span>}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div style={{ display: "grid", gap: 2, gridTemplateColumns: `repeat(${N}, ${cellSize}px)` }}>
          {grid.map((row, ri) => row.split("").map((ch, ci) => {
            const c = colorFor(ch);
            const inThis = inChain.has(`${ri},${ci}`);
            return (
              <button key={`${ri}-${ci}`} onClick={() => setHi([ri, ci])} style={{
                width: cellSize, height: cellSize, fontSize: cellSize * 0.4, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                background: c.bg, color: c.fg,
                border: inThis ? `3px solid ${A_COLOR}` : `1px solid ${c.border}`,
                borderRadius: 4, cursor: "pointer", padding: 0,
              }}>{ch}</button>
            );
          }))}
        </div>
      </div>

      {hi && chainCells.length > 0 && (
        <div style={{ background: "#eef2ff", border: `1.5px solid ${A_COLOR}`, borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#312e81", marginBottom: 8, lineHeight: 1.55 }}>
          <b>{t(E, "Chain", "별 길")}:</b>{" "}
          {chainCells.map(([r, c], i) => (
            <code key={i} style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, marginRight: 4, fontFamily: "'JetBrains Mono',monospace" }}>
              ({r + 1},{c + 1})={grid[r][c]}
            </code>
          ))}
        </div>
      )}

      {/* Caption removed — chain visualization (border highlight + chain cells list) is self-evident
          once the student clicks a cell.  Concept (chain = (r,c)→(r+down,c+right)) lives in the chapter narration. */}
    </div>
  );
}

export function AstralSim({ E }) { return <AstralComposite E={E} />; }
export function AstralRunner() { return null; }

/* ════════════════════════════════════════════════════════════════════
   AstralDpSim — chain DP min_stars machine live visualizer.
   체인을 W/G/B 로 토글하면서 min_stars[0], min_stars[1] 이 어떻게 갱신되는지 본다.
   EMPTY (불가능) 은 빨간색. 마지막 답은 min(min_stars[0], min_stars[1]).
   ════════════════════════════════════════════════════════════════════ */
const dpPresets = (E) => [
  { name: "G→W→G→G", chain: ["G", "W", "G", "G"] },
  { name: "G→B→G→W", chain: ["G", "B", "G", "W"] },
  { name: t(E, "W→B (impossible)", "W→B (불가)"), chain: ["W", "B"] },
  { name: "G→B→B→G", chain: ["G", "B", "B", "G"] },
  { name: "W→W→W→W", chain: ["W", "W", "W", "W"] },
];

function dpRun(chain, E) {
  const EMPTY = Infinity;
  const trace = [];
  let min_stars = [EMPTY, EMPTY];
  const c0 = chain[0];
  if (c0 === "W") min_stars = [0, EMPTY];
  else if (c0 === "G") min_stars = [1, 1];
  // B 일 때 min_stars 그대로 [EMPTY, EMPTY] — 첫 칸 in=0 이라 B 불가
  trace.push({
    comp: c0,
    min_stars: [...min_stars],
    note: c0 === "W"
      ? t(E, "W: no star, no pass-out", "W: 별 없음, 보낼 것도 없음")
      : c0 === "G"
        ? t(E, "G: 1 ★ here, can keep OR pass on", "G: 별 1 개, 안 보냄/보냄 둘 다 가능")
        : t(E, "❌ B as first cell needs an incoming ★, but none exists", "❌ B 가 첫 칸 — 들어온 별이 필요한데 없음")
  });

  for (let k = 1; k < chain.length; k++) {
    const c = chain[k];
    const ns = [EMPTY, EMPTY];
    const s0 = min_stars[0], s1 = min_stars[1];
    let note = "";
    if (c === "W") {
      if (s0 !== EMPTY) ns[0] = s0;
      note = t(E, "W = empty here → no incoming star possible → only min_stars[0] carries forward.",
                  "W = 여기 빈 칸 → 들어온 별 못 받음 → min_stars[0] 만 이어짐.");
    } else if (c === "B") {
      if (s1 !== EMPTY) { ns[0] = s1 + 1; ns[1] = s1 + 1; }
      note = t(E, "B = ★ here AND must receive an incoming ★ → +1 star.",
                  "B = 여기 별 + 들어온 별 둘 다 있어야 → 별 +1.");
    } else {
      if (s0 !== EMPTY) { ns[0] = Math.min(ns[0], s0 + 1); ns[1] = Math.min(ns[1], s0 + 1); }
      if (s1 !== EMPTY) { ns[0] = Math.min(ns[0], s1); }
      note = t(E, "G = star in one photo. Two cases — original here (+1), or moved-in (no new ★).",
                  "G = 한 사진에만 별. 두 갈래 — 원래 별이면 +1, 들어온 별이면 그대로.");
    }
    min_stars = ns;
    trace.push({ comp: c, min_stars: [...min_stars], note });
  }
  return { trace, final: Math.min(min_stars[0], min_stars[1]) };
}

// Display "impossible" as ❌ instead of math's ∞ — friendlier for elementary students.
// (The actual code/variable is still called EMPTY; the symbol shown here is purely visual.)
const dpFmt = (v) => v === Infinity ? "❌" : String(v);

export function AstralDpSim({ E }) {
  const [chain, setChain] = useState(["G", "W", "G", "G"]);
  const cycle = (i) => {
    const nx = { W: "G", G: "B", B: "W" };
    setChain(chain.map((c, j) => j === i ? nx[c] : c));
  };
  const addCell = () => chain.length < 6 && setChain([...chain, "W"]);
  const popCell = () => chain.length > 2 && setChain(chain.slice(0, -1));

  const { trace, final } = dpRun(chain, E);
  const impossible = final === Infinity;
  const presets = dpPresets(E);

  const cellColor = (ch) => {
    if (ch === "W") return { bg: "#fff", fg: "#cbd5e1", border: C.border };
    if (ch === "G") return { bg: "#cbd5e1", fg: "#1e293b", border: "#94a3b8" };
    return { bg: "#1e293b", fg: "#fff", border: "#0f172a" };
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 8, textAlign: "center" }}>
        {t(E, "👇 Click cells to change W/G/B.",
              "👇 칸 클릭해서 W/G/B 바꿔봐요.")}
      </div>

      {/* 프리셋 */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
        {presets.map((p, i) => (
          <button key={i} onClick={() => setChain([...p.chain])} style={{
            padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600,
            border: `1.5px solid ${C.border}`, background: "#fff", color: C.text, cursor: "pointer",
            fontFamily: "'JetBrains Mono',monospace",
          }}>{p.name}</button>
        ))}
        <button onClick={addCell} disabled={chain.length >= 6} style={{
          padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
          border: `1.5px solid ${A_COLOR}`, background: "#fff", color: A_COLOR, cursor: "pointer",
          opacity: chain.length >= 6 ? 0.4 : 1,
        }}>＋ {t(E, "cell", "칸")}</button>
        <button onClick={popCell} disabled={chain.length <= 2} style={{
          padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
          border: `1.5px solid ${C.border}`, background: "#fff", color: C.text, cursor: "pointer",
          opacity: chain.length <= 2 ? 0.4 : 1,
        }}>－</button>
      </div>

      {/* 체인 가로 + DP 표 */}
      <div style={{ overflowX: "auto", marginBottom: 12 }}>
        <table style={{ margin: "0 auto", borderCollapse: "separate", borderSpacing: 4, fontFamily: "'JetBrains Mono',monospace" }}>
          <tbody>
            {/* 칸 인덱스 */}
            <tr>
              <td style={{ width: 70, fontSize: 11, color: C.dim, textAlign: "right", padding: "2px 6px" }}>{t(E, "position", "위치")}</td>
              {chain.map((_, i) => (
                <td key={i} style={{ width: 64, textAlign: "center", fontSize: 11, color: C.dim }}>
                  {i + 1}{t(E, "st", "번째")}
                </td>
              ))}
            </tr>
            {/* 합성 (클릭) */}
            <tr>
              <td style={{ fontSize: 11, color: C.dim, textAlign: "right", padding: "2px 6px" }}>{t(E, "composite", "합성")}</td>
              {chain.map((ch, i) => {
                const c = cellColor(ch);
                return (
                  <td key={i} style={{ textAlign: "center" }}>
                    <button onClick={() => cycle(i)} style={{
                      width: 50, height: 50, fontSize: 22, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                      background: c.bg, color: c.fg, border: `2px solid ${c.border}`,
                      borderRadius: 6, cursor: "pointer", padding: 0,
                    }}>{ch}</button>
                  </td>
                );
              })}
            </tr>
            {/* min_stars[0] */}
            <tr>
              <td style={{ fontSize: 11, color: C.dim, textAlign: "right", padding: "2px 6px" }}>min_stars[0]</td>
              {trace.map((tr, i) => {
                const v = tr.min_stars[0];
                const inf = v === Infinity;
                return (
                  <td key={i} style={{
                    textAlign: "center", padding: "8px 4px", fontSize: 14, fontWeight: 700,
                    background: inf ? "#fee2e2" : "#dcfce7", color: inf ? "#dc2626" : "#15803d",
                    border: `1px solid ${inf ? "#fca5a5" : "#86efac"}`, borderRadius: 4,
                  }}>{dpFmt(v)}</td>
                );
              })}
            </tr>
            {/* min_stars[1] */}
            <tr>
              <td style={{ fontSize: 11, color: C.dim, textAlign: "right", padding: "2px 6px" }}>min_stars[1]</td>
              {trace.map((tr, i) => {
                const v = tr.min_stars[1];
                const inf = v === Infinity;
                return (
                  <td key={i} style={{
                    textAlign: "center", padding: "8px 4px", fontSize: 14, fontWeight: 700,
                    background: inf ? "#fee2e2" : "#dcfce7", color: inf ? "#dc2626" : "#15803d",
                    border: `1px solid ${inf ? "#fca5a5" : "#86efac"}`, borderRadius: 4,
                  }}>{dpFmt(v)}</td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* 마지막 칸 설명 */}
      <div style={{ background: "#eef2ff", border: `1.5px solid ${A_COLOR}`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#312e81", marginBottom: 10, lineHeight: 1.6 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>
          📌 {t(E, `Last cell — letter ${trace[trace.length - 1].comp}`, `마지막 칸 — 글자 ${trace[trace.length - 1].comp}`)}
        </div>
        <div style={{ fontSize: 11.5 }}>{trace[trace.length - 1].note}</div>
      </div>

      {/* 마지막 답 */}
      <div style={{
        textAlign: "center", padding: "10px 14px", borderRadius: 10, fontSize: 14, fontWeight: 800,
        background: impossible ? "#fee2e2" : "#dcfce7",
        color: impossible ? "#991b1b" : "#14532d",
        border: `2px solid ${impossible ? "#dc2626" : "#16a34a"}`,
      }}>
        {impossible
          ? t(E, "❌ Path min = ❌ (impossible) → can't be made (-1)", "❌ 별 길 가장 적은 = ❌ (못 만듦) → -1")
          : t(E, `✅ Chain min = min(min_stars[0], min_stars[1]) = ${final}`, `✅ 별 길 가장 적은 = min(min_stars[0], min_stars[1]) = ${final}`)}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   AstralChainDiscovery — small 3×3 demo showing how (right, down) shift
   creates a chain.  Shows photo 1 → photo 2 → composite for 1 star.
   ════════════════════════════════════════════════════════════════════ */
const CD_PRESETS = [
  { name: "right=1 down=0", right: 1, down: 0 },
  { name: "right=0 down=1", right: 0, down: 1 },
  { name: "right=1 down=1", right: 1, down: 1 },
];
export function AstralChainDiscovery({ E }) {
  const [pi, setPi] = useState(0);
  const [moves, setMoves] = useState(true); // true: 별이 이동, false: 사라짐
  const { right, down } = CD_PRESETS[pi];
  const N = 3;
  const startR = 0, startC = 0;
  const endR = startR + down, endC = startC + right;
  const inside = endR >= 0 && endR < N && endC >= 0 && endC < N;

  const cellSize = 44;
  const makeGrid = (markers) => (
    <div style={{ display: "grid", gap: 2, gridTemplateColumns: `repeat(${N}, ${cellSize}px)` }}>
      {Array.from({ length: N * N }).map((_, idx) => {
        const r = Math.floor(idx / N), c = idx % N;
        const mk = markers[`${r},${c}`];
        return (
          <div key={idx} style={{
            width: cellSize, height: cellSize,
            background: mk ? mk.bg : "#fff", color: mk ? mk.fg : "#cbd5e1",
            border: `${mk?.bold ? 2 : 1}px solid ${mk ? mk.border : C.border}`,
            borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{mk?.label ?? ""}</div>
        );
      })}
    </div>
  );

  // Photo 1: star at (0,0)
  const ph1 = { [`${startR},${startC}`]: { label: "★", bg: "#fef3c7", fg: "#d97706", border: "#fbbf24", bold: true } };
  // Photo 2: star at (endR, endC) if moves and inside, else nothing
  const ph2 = (moves && inside)
    ? { [`${endR},${endC}`]: { label: "★", bg: "#fef3c7", fg: "#d97706", border: "#fbbf24", bold: true } }
    : {};
  // Composite
  const comp = {};
  comp[`${startR},${startC}`] = (moves && inside)
    ? { label: "G", bg: "#cbd5e1", fg: "#1e293b", border: "#94a3b8", bold: true }
    : (moves && !inside)
      ? { label: "G", bg: "#cbd5e1", fg: "#1e293b", border: "#94a3b8", bold: true }
      : { label: "G", bg: "#cbd5e1", fg: "#1e293b", border: "#94a3b8", bold: true };
  if (moves && inside) comp[`${endR},${endC}`] = { label: "G", bg: "#cbd5e1", fg: "#1e293b", border: "#94a3b8", bold: true };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 10 }}>
        {CD_PRESETS.map((p, i) => (
          <button key={i} onClick={() => setPi(i)} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${pi === i ? A_COLOR : C.border}`,
            background: pi === i ? "#e0e7ff" : "#fff", color: pi === i ? A_COLOR : C.text, cursor: "pointer",
            fontFamily: "'JetBrains Mono',monospace",
          }}>{p.name}</button>
        ))}
        <button onClick={() => setMoves(!moves)} style={{
          padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
          border: `1.5px solid #d97706`, background: moves ? "#fef3c7" : "#fff",
          color: "#92400e", cursor: "pointer",
        }}>
          {moves ? t(E, "★ moves", "★ 이동") : t(E, "★ disappears", "★ 사라짐")}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, alignItems: "start" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6 }}>{t(E, "Photo 1", "사진 1")}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>{makeGrid(ph1)}</div>
          <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>★ (0,0)</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6 }}>{t(E, "Photo 2", "사진 2")}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>{makeGrid(ph2)}</div>
          <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>
            {moves ? (inside ? `★ (${endR},${endC})` : t(E, "★ off-grid (lost)", "★ 격자 밖 (사라짐)")) : t(E, "(empty)", "(없음)")}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: A_COLOR, marginBottom: 6 }}>{t(E, "Composite", "합성")}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>{makeGrid(comp)}</div>
          <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>
            {moves && inside
              ? t(E, "2 G cells linked", "G 두 칸이 연결")
              : t(E, "1 G cell", "G 1 칸")}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, background: "#eef2ff", border: `1.5px solid ${A_COLOR}`, borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#312e81", lineHeight: 1.6 }}>
        {moves && inside ? (
          <>
            <b>🔗 {t(E, "Chain discovery", "별 길 찾기")}:</b>{" "}
            {t(E, `Star at (0,0) lands at (${endR},${endC}) in photo 2. The composite has G at BOTH (0,0) and (${endR},${endC}) — these two cells are linked by the star's movement (right ${right}, down ${down}). Following that link repeatedly traces a path.`,
                  `(0,0) 의 별이 사진 2 의 (${endR},${endC}) 로 옮겨감. 합성은 (0,0) 과 (${endR},${endC}) 둘 다 G — 이 두 칸이 별 이동 (오른쪽 ${right}, 아래 ${down}) 으로 연결돼. 계속 따라가면 한 별 길.`)}
          </>
        ) : moves && !inside ? (
          <>
            <b>{t(E, "Star lost off-grid", "별이 격자 밖으로")}:</b>{" "}
            {t(E, "Composite only shows G at the source — single isolated cell, no path link.",
                  "합성은 출발지에만 G — 외톨이 칸, 별 길 이어짐 없음.")}
          </>
        ) : (
          <>
            <b>{t(E, "Star disappeared", "별 사라짐")}:</b>{" "}
            {t(E, "Composite shows G only at the source — no star path.",
                  "합성은 출발지에만 G — 별 길 없음.")}
          </>
        )}
      </div>

      <div style={{ marginTop: 8, padding: "8px 12px", background: "#fffbeb", border: "1px dashed #fbbf24", borderRadius: 8, fontSize: 11.5, color: "#78350f", lineHeight: 1.55 }}>
        💡 {t(E,
          "When stars don't move (right 0, down 0), each star stays in its own cell — cells don't affect each other → just count G + B. When stars DO move, a star visits one cell, then the next, then the next … so those cells along the path affect each other → handle one path at a time.",
          "별이 안 움직이면 (오른쪽 0, 아래 0) 각 별이 자기 자리에 → 칸끼리 영향 없음 → 그냥 G+B 셈. 별이 움직이면 한 별이 칸을 차례차례 지나가니까, 그 길의 칸들끼리 서로 영향 → 별 길 하나씩 처리.")}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   AstralCellPlayground — toggle (s, in) for a single cell and watch
   the photo1 / photo2 / composite / star-count update live. Let the
   student DERIVE the W/G/B mapping by playing with all 4 combos before
   answering the W/B/G case quizzes.
   ════════════════════════════════════════════════════════════════════ */

function compositeOf(s, inb) {
  if (!s && !inb) return "W";
  if (s && inb) return "B";
  return "G"; // exactly one of s, inb
}

export function AstralCellPlayground({ E }) {
  const [s, setS] = useState(false);   // 원래 별?
  const [inb, setInb] = useState(false); // 들어온 별?

  const comp = compositeOf(s, inb);
  const stars = s ? 1 : 0; // 별 수 = 원래 있던 별 (s) 만 셈

  // Visual: photo1 has star if s; photo2 has star if (s && stayed) || inb.
  // But we abstracted "stayed vs left" — photo2 star = if inb (something arrives).
  // For W: s=0 in=0 → photo1 empty, photo2 empty
  // For G(a): s=1 in=0 → photo1 ★, photo2 empty (original star, then left)
  // For G(b): s=0 in=1 → photo1 empty, photo2 ★ (arrived from elsewhere)
  // For B:   s=1 in=1 → photo1 ★, photo2 ★ (original + arrived = both photos)
  const photo1Star = s;
  const photo2Star = inb;

  const compColors = {
    W: { bg: "#fff", border: C.border, fg: C.text },
    G: { bg: "#cbd5e1", border: "#94a3b8", fg: "#1e293b" },
    B: { bg: "#1e293b", border: "#0f172a", fg: "#fff" },
  };
  const cc = compColors[comp];

  const photoBox = (hasStar) => (
    <div style={{
      width: 60, height: 60, background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 28, color: "#d97706", fontWeight: 800,
    }}>{hasStar ? "★" : ""}</div>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
          🔬 {t(E, "One cell — try every combination", "한 칸 — 모든 조합 시도해봐")}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
          {t(E, "👇 Click the two switches below to flip ON/OFF",
                "👇 아래 스위치 두 개 눌러서 켜기/끄기")}
        </div>
      </div>

      {/* Switch-style toggles — visually obvious they're clickable */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
        {/* s switch */}
        <div style={{
          background: s ? "#fef3c7" : "#f8fafc",
          border: `2px solid ${s ? "#d97706" : "#cbd5e1"}`,
          borderRadius: 12, padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 10,
          minWidth: 200,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: s ? "#92400e" : C.text }}>
              {t(E, "Had a star originally? (s)", "원래 별 있었나? (s)")}
            </div>
            <div style={{ fontSize: 10, color: s ? "#92400e" : C.dim, marginTop: 2 }}>
              {s ? t(E, "✓ Yes — original star", "✓ 응 — 원래 있음") : t(E, "✗ No", "✗ 없음")}
            </div>
          </div>
          {/* Slider */}
          <button onClick={() => setS(!s)} style={{
            width: 44, height: 24, borderRadius: 12,
            background: s ? "#d97706" : "#cbd5e1",
            border: "none", cursor: "pointer", padding: 0, position: "relative",
            transition: "background 0.15s",
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%", background: "#fff",
              position: "absolute", top: 3, left: s ? 23 : 3,
              transition: "left 0.15s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}></div>
          </button>
        </div>

        {/* in switch */}
        <div style={{
          background: inb ? "#cffafe" : "#f8fafc",
          border: `2px solid ${inb ? "#0891b2" : "#cbd5e1"}`,
          borderRadius: 12, padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 10,
          minWidth: 200,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: inb ? "#155e75" : C.text }}>
              {t(E, "Came in from elsewhere? (in)", "다른 곳에서 들어왔나? (in)")}
            </div>
            <div style={{ fontSize: 10, color: inb ? "#155e75" : C.dim, marginTop: 2 }}>
              {inb ? t(E, "✓ Yes — arrived", "✓ 응 — 들어옴") : t(E, "✗ No", "✗ 없음")}
            </div>
          </div>
          <button onClick={() => setInb(!inb)} style={{
            width: 44, height: 24, borderRadius: 12,
            background: inb ? "#0891b2" : "#cbd5e1",
            border: "none", cursor: "pointer", padding: 0, position: "relative",
            transition: "background 0.15s",
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%", background: "#fff",
              position: "absolute", top: 3, left: inb ? 23 : 3,
              transition: "left 0.15s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}></div>
          </button>
        </div>
      </div>

      {/* Three boxes: photo 1, photo 2, composite */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, marginBottom: 14 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Photo 1", "사진 1")}</div>
          {photoBox(photo1Star)}
          <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>
            {photo1Star ? t(E, "(has star)", "(별 있음)") : t(E, "(empty)", "(비어있음)")}
          </div>
        </div>
        <div style={{ fontSize: 22, color: C.dim }}>+</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Photo 2", "사진 2")}</div>
          {photoBox(photo2Star)}
          <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>
            {photo2Star ? t(E, "(has star)", "(별 있음)") : t(E, "(empty)", "(비어있음)")}
          </div>
        </div>
        <div style={{ fontSize: 22, color: C.dim }}>=</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#4f46e5", marginBottom: 4 }}>{t(E, "Composite", "합성")}</div>
          <div style={{
            width: 60, height: 60, background: cc.bg, border: `2.5px solid ${cc.border}`, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, color: cc.fg, fontWeight: 800,
          }}>{comp}</div>
          <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>
            {comp === "W" ? t(E, "no star here", "별 없음")
              : comp === "G" ? t(E, "star in 1 photo", "한 사진에만")
              : t(E, "star in both", "두 사진 모두")}
          </div>
        </div>
      </div>

      {/* Star count */}
      <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 8, padding: "8px 14px", fontSize: 12, color: "#78350f", textAlign: "center", marginBottom: 10 }}>
        ⭐ {t(E, "Stars in original photo here:", "이 칸의 원래 별 수:")} <b style={{ fontSize: 15, color: "#92400e" }}>{stars}</b>
        {" "}<span style={{ color: C.dim }}>(= s)</span>
      </div>

      {/* Hint to try all 4 */}
      <div style={{ background: "#eef2ff", border: "1.5px solid #a5b4fc", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#312e81", lineHeight: 1.65, textAlign: "center" }}>
        💡 {t(E,
          "Try all 4 combinations: (s=0, in=0), (s=1, in=0), (s=0, in=1), (s=1, in=1). You'll see W appears once, G appears twice, B appears once.",
          "조합 4 가지 다 시도: (s=0, in=0), (s=1, in=0), (s=0, in=1), (s=1, in=1). W 1 번, G 2 번, B 1 번 나타나는 것 보일 거예요.")}
      </div>
    </div>
  );
}


/* ════════════════════════════════════════════════════════════════════
   AstralAlgoTrace — auto-animation of the "look back, then walk forward"
   algorithm. For each cell in row-major order:
   • If already discovered → skip (already painted in some color).
   • Else look BACK (up B, left A): in-grid → not a start → mark gray.
                                     off-grid → start! → walk forward,
                                       painting cells one by one until off-grid.
   Shows the student exactly what the code does, with no jargon.
   ════════════════════════════════════════════════════════════════════ */

const ALGO_PALETTE = [
  { bg: "#fef3c7", border: "#d97706" },
  { bg: "#dbeafe", border: "#3b82f6" },
  { bg: "#dcfce7", border: "#16a34a" },
  { bg: "#fce7f3", border: "#db2777" },
  { bg: "#e0e7ff", border: "#6366f1" },
  { bg: "#fed7aa", border: "#ea580c" },
  { bg: "#a7f3d0", border: "#0d9488" },
  { bg: "#c7d2fe", border: "#4f46e5" },
];

// Sample 4x4 grid — VALID for A=1, B=2 movement.
// B at (r,c) requires (r-2, c-1) inside grid AND has photo1 star (=G or B with original).
// Verified by chain enumeration:
//   (0,0)G → (2,1)B    (0,1)W → (2,2)G    (0,2)G → (2,3)G    (0,3)G single
//   (1,0)G → (3,1)G    (1,1)W → (3,2)W    (1,2)G → (3,3)B    (1,3)W single
//   (2,0)G single      (3,0)W single
// Final: 7 distinct star paths.
const ALGO_TRACE_GRID = [
  ["G", "W", "G", "G"],
  ["G", "W", "G", "W"],
  ["G", "B", "G", "G"],
  ["W", "G", "W", "B"],
];

export function AstralAlgoTrace({ E }) {
  const N = 4, A = 1, B = 2;
  const total = N * N;
  const cellLetter = (r, c) => ALGO_TRACE_GRID[r][c];
  // Each painted cell: { idx: chainColorIdx }
  const [marks, setMarks] = useState({});
  const [step, setStep] = useState(-1);          // current row-major cell index
  const [chainCount, setChainCount] = useState(0);
  const [phase, setPhase] = useState("idle");    // "idle" | "checking" | "tracing" | "done"
  const [tracer, setTracer] = useState(null);    // ghost marker during back-trace
  const [history, setHistory] = useState([]);    // snapshots for "이전" (back) button

  const reset = () => {
    setMarks({}); setStep(-1); setChainCount(0); setPhase("idle"); setTracer(null);
    setHistory([]);
  };

  // Restore the most recent snapshot
  const goBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setMarks(prev.marks);
    setStep(prev.step);
    setChainCount(prev.chainCount);
    setPhase(prev.phase);
    setTracer(prev.tracer);
    setHistory(h => h.slice(0, -1));
  };

  // Snapshot the current min_stars into history (called at the start of advance)
  const snapshot = () => {
    setHistory(h => [...h, { marks, step, chainCount, phase, tracer }]);
  };

  // Fully manual stepping — every "다음 →" click advances exactly ONE min_stars
  const advance = () => {
    if (phase === "done") return;
    snapshot();   // save current min_stars so 이전 can restore it
    if (phase === "idle") { setStep(0); setPhase("checking"); return; }
    if (phase === "checking") {
      if (step >= total) { setPhase("done"); return; }
      const r = Math.floor(step / N), c = step % N;
      const letter = cellLetter(r, c);
      // W cells = empty (no star) → skip directly, no backward trace
      if (letter === "W") {
        setMarks(m => ({ ...m, [`${r},${c}`]: { kind: "skip" } }));
        setStep(s => s + 1);
        return;
      }
      // G or B → start tracing AND do the first move immediately
      // (so the bubble describes the move that JUST happened, not the next one)
      if (B > 0) {
        setTracer({ r: r - 1, c, upLeft: B - 1, leftLeft: A, lastAction: "up" });
      } else if (A > 0) {
        setTracer({ r, c: c - 1, upLeft: 0, leftLeft: A - 1, lastAction: "left" });
      } else {
        setTracer({ r, c, upLeft: 0, leftLeft: 0, lastAction: "up" });
      }
      setPhase("tracing");
      return;
    }
    if (phase === "tracing" && tracer) {
      const { r, c, upLeft, leftLeft } = tracer;
      // Each click does ONE move (and the bubble describes that move)
      if (upLeft > 0) { setTracer({ r: r - 1, c, upLeft: upLeft - 1, leftLeft, lastAction: "up" }); return; }
      if (leftLeft > 0) { setTracer({ r, c: c - 1, upLeft: 0, leftLeft: leftLeft - 1, lastAction: "left" }); return; }
      // Commit mark — but stay on "result" phase so the freshly-placed star is visible
      const origR = Math.floor(step / N), origC = step % N;
      const origKey = `${origR},${origC}`;
      const inGrid = r >= 0 && r < N && c >= 0 && c < N;
      const predMark = inGrid ? marks[`${r},${c}`] : null;
      if (inGrid && predMark?.kind === "chain") {
        setMarks(m => ({ ...m, [origKey]: { kind: "chain", idx: predMark.idx } }));
      } else {
        setMarks(m => ({ ...m, [origKey]: { kind: "chain", idx: chainCount } }));
        setChainCount(cc => cc + 1);
      }
      setPhase("result");   // tracer preserved so result bubble knows in/out
      return;
    }
    if (phase === "result") {
      // Student saw the star appear — now move to the next cell
      setStep(s => s + 1);
      setPhase("checking");
      setTracer(null);
      return;
    }
  };

  const cellSize = 56;
  // Highlight the "original cell we're checking" during checking + tracing + result phases
  const currentCell = ((phase === "checking" || phase === "tracing" || phase === "result") && step >= 0 && step < total)
    ? [Math.floor(step / N), step % N] : null;

  const cellStyle = (r, c) => {
    const key = `${r},${c}`;
    const mark = marks[key];
    const isCurrent = currentCell && currentCell[0] === r && currentCell[1] === c;
    if (mark?.kind === "chain") {
      const col = ALGO_PALETTE[mark.idx % ALGO_PALETTE.length];
      return { bg: col.bg, border: col.border, fg: "#1e293b", solid: true };
    }
    if (mark?.kind === "middle" || mark?.kind === "skip") {
      return { bg: "#f1f5f9", border: "#cbd5e1", fg: "#94a3b8", solid: true };
    }
    if (isCurrent) return { bg: "#fef3c7", border: "#d97706", fg: "#92400e", solid: true, glow: true };
    return { bg: "#fff", border: C.border, fg: C.dim, solid: true };
  };

  // Per-letter thinking prompt — what to think about when seeing this letter
  const letterPrompt = (letter) => {
    if (letter === "W") return t(E, "W = empty — no star here at all.", "W = 빈 칸. 아예 별 없음.");
    if (letter === "G") return t(E, "G = star in ONE of the two photos. Two ways this could happen.", "G = 두 사진 중 하나에만 별. 만들어지는 길이 두 가지.");
    return t(E, "B = star in BOTH photos. Needs original star AND an arriving star.", "B = 두 사진 모두 별. 처음 별 + 들어온 별 둘 다 있어야.");
  };

  // Bubble STACK — derives the chronological list of bubbles for the CURRENT cell
  // from current phase / tracer min_stars. New bubbles get appended; old ones stay visible
  // so the student can re-read previous steps.
  const bubbleStack = () => {
    if (!currentCell) return [];
    const [r, c] = currentCell;
    const letter = cellLetter(r, c);
    const list = [];

    // First bubble — always: what cell are we checking?
    const checkColor = letter === "W" ? "#64748b" : letter === "G" ? "#7c3aed" : "#1e293b";
    list.push({
      key: `cell-${r},${c}`,
      color: checkColor,
      head: letter === "W" ? t(E, "W → empty", "W → 빈 칸")
          : letter === "G" ? t(E, "G → ★ in one photo", "G → 한 사진에만 별")
          : t(E, "B → ★ in BOTH photos", "B → 두 사진 모두 별"),
      sub: letter === "W"
        ? t(E, "just skip ▶", "그냥 다음 →")
        : letter === "G"
          ? t(E, "Original ★? Moved-in ★? ↖ check", "원래 별? 들어온 별? ↖ 살펴!")
          // B → photo1 star at THIS cell AND photo1 star at predecessor (so it moves IN to form photo2 star)
          : t(E, "Need ★ HERE and ★ at ↖ trace-back spot",
                 "여기 별 있어야 + 거꾸로 간 자리에도 별 있어야!"),
    });

    if (letter === "W") return list;
    if (phase === "checking") return list;

    // Helper — describes the destination of a move: outside / star here / empty here
    const describeDest = (destR, destC) => {
      const insideGrid = destR >= 0 && destR < N && destC >= 0 && destC < N;
      if (!insideGrid) return { kind: "outside", text: t(E, "Outside!", "밖이야!") };
      const m = marks[`${destR},${destC}`];
      if (m?.kind === "chain") return { kind: "star", text: t(E, "Star here! ✨", "여기 별 있어! ✨") };
      return { kind: "empty", text: t(E, "Empty here — no star", "여기 별 없어 (빈 칸)") };
    };

    if (tracer) {
      const upMovesDone = B - tracer.upLeft;
      const leftMovesDone = A - tracer.leftLeft;
      for (let i = 1; i <= upMovesDone; i++) {
        const destR = r - i, destC = c;
        // Is this the final move? Only if no left moves needed (A=0) and i=B
        const isFinal = (i === B && A === 0);
        list.push({
          key: `up-${r},${c}-${i}`,
          color: "#4f46e5",
          head: t(E, `Up 1 ↑ → (${destR},${destC})`, `위로 한 칸 ↑ → (${destR},${destC})`),
          sub: isFinal ? describeDest(destR, destC).text : null,
        });
      }
      for (let i = 1; i <= leftMovesDone; i++) {
        const destR = r - B, destC = c - i;
        const isFinal = (i === A);
        list.push({
          key: `left-${r},${c}-${i}`,
          color: "#4f46e5",
          head: t(E, `Left 1 ← → (${destR},${destC})`, `왼쪽 한 칸 ← → (${destR},${destC})`),
          sub: isFinal ? describeDest(destR, destC).text : null,
        });
      }
    }

    if (phase === "result" && tracer) {
      const dest = describeDest(tracer.r, tracer.c);
      const isB = letter === "B";
      const predCoord = `(${tracer.r},${tracer.c})`;
      if (dest.kind === "star") {
        // Predecessor has a star → incoming → same chain
        if (isB) {
          list.push({
            key: `result-${r},${c}`,
            color: "#16a34a",
            head: t(E, "★★ Both confirmed!", "★★ 둘 다 확인!"),
            sub: t(E, `★ here at (${r},${c}) ✓ + ★ at ${predCoord} ✓ → same star path 🌟`,
                     `여기 (${r},${c}) 별 있음 ✓ + 거기 ${predCoord} 도 별 있음 ✓ → 같은 별 길 🌟`),
            note: t(E, `If EITHER spot had no star, this B would be EMPTY!`,
                       `둘 중 하나라도 별 없었으면 이 B 는 불가능했음!`),
          });
        } else {
          list.push({
            key: `result-${r},${c}`,
            color: "#16a34a",
            head: t(E, "★ Star moved in here!", "★ 별이 여기로 옴!"),
            sub: t(E, `Star came IN from ${predCoord} → same star path 🌟`,
                     `${predCoord} 에서 별이 들어옴 → 같은 별 길 🌟`),
            note: t(E, `If ${predCoord} had no star, this G would be the ORIGINAL star here.`,
                       `만약 ${predCoord} 에 별 없었으면 이 G 는 원래 여기 있던 별이었을 거야.`),
          });
        }
      } else if (dest.kind === "outside") {
        if (isB) {
          // B with predecessor outside grid → impossible
          list.push({
            key: `result-${r},${c}`,
            color: "#dc2626",
            head: t(E, "❌ Impossible!", "❌ 불가능한 입력!"),
            sub: t(E, `B needs ★ at BOTH spots, but ${predCoord} is OUTSIDE the grid`,
                     `B 는 양쪽 다 별 있어야 하는데 ${predCoord} 는 격자 밖!`),
            note: t(E, "No way for a star to move IN here → contradiction",
                       "별이 여기로 옮겨올 방법 없음 → 모순"),
          });
        } else {
          list.push({
            key: `result-${r},${c}`,
            color: "#dc2626",
            head: t(E, "★ Original star here", "★ 원래 여기 있던 별"),
            sub: t(E, "Outside → no star came in → NEW star path ✨",
                     "밖이라 들어온 별 없음 → 새 별 길 ✨"),
            note: t(E, "If it had been inside the grid with a star, this G would be a MOVED-IN star.",
                       "만약 격자 안이고 거기 별 있었으면 이 G 는 들어온 별이었을 거야."),
          });
        }
      } else { // empty there (inside grid but predecessor W)
        if (isB) {
          list.push({
            key: `result-${r},${c}`,
            color: "#dc2626",
            head: t(E, "❌ Impossible!", "❌ 불가능한 입력!"),
            sub: t(E, `B needs ★ at BOTH spots, but ${predCoord} is empty (W)`,
                     `B 는 양쪽 다 별 있어야 하는데 ${predCoord} 는 빈 칸!`),
            note: t(E, "No star to move IN here → contradiction",
                       "여기로 옮겨올 별이 없음 → 모순"),
          });
        } else {
          list.push({
            key: `result-${r},${c}`,
            color: "#dc2626",
            head: t(E, "★ Original star here", "★ 원래 여기 있던 별"),
            sub: t(E, "Empty there → no star came in → NEW star path ✨",
                     "거기 빈 칸이라 들어온 별 없음 → 새 별 길 ✨"),
            note: t(E, `If ${predCoord} had a star, this G would be a MOVED-IN star.`,
                       `만약 ${predCoord} 에 별 있었으면 이 G 는 들어온 별이었을 거야.`),
          });
        }
      }
    }

    return list;
  };

  const bubbles = bubbleStack();

  const statusText = () => {
    if (step === -1) return t(E, "Press ▶ to start, then 'Next' for each cell.", "▶ 눌러서 시작, 그 다음 '다음' 으로 한 칸씩.");
    if (phase === "done") return t(E, `Done — ${chainCount} different star paths in this ${N}×${N} grid.`,
                                         `끝 — 이 ${N}×${N} 격자에 별 길 ${chainCount} 개.`);
    if (phase === "tracing" && tracer) {
      const origR = Math.floor(step / N), origC = step % N;
      const origLetter = cellLetter(origR, origC);
      if (tracer.upLeft > 0) {
        return t(E, `(${origR},${origC}) is ${origLetter}. Peeking back, up 1... now at (${tracer.r}, ${tracer.c})`,
                    `(${origR},${origC}) 는 ${origLetter} 칸. 거꾸로 위로 한 칸... 지금 (${tracer.r}, ${tracer.c})`);
      }
      if (tracer.leftLeft > 0) {
        return t(E, `(${origR},${origC}) is ${origLetter}. Now left 1... at (${tracer.r}, ${tracer.c})`,
                    `(${origR},${origC}) 는 ${origLetter} 칸. 이제 왼쪽 한 칸... (${tracer.r}, ${tracer.c})`);
      }
      const inGrid = tracer.r >= 0 && tracer.r < N && tracer.c >= 0 && tracer.c < N;
      if (inGrid) {
        return t(E, `Arrived at (${tracer.r},${tracer.c}) — inside! So this ${origLetter} cell continues the same star's path.`,
                    `(${tracer.r},${tracer.c}) 도착 — 격자 안! 그러니까 이 ${origLetter} 칸은 위 별 길에 이어져.`);
      }
      return t(E, `Arrived at (${tracer.r},${tracer.c}) — outside! This ${origLetter} cell is the start of a NEW star path.`,
                  `(${tracer.r},${tracer.c}) 도착 — 격자 밖! 이 ${origLetter} 칸이 새 별 길의 시작점.`);
    }
    if (!currentCell) return "";
    const [r, c] = currentCell;
    const letter = cellLetter(r, c);
    return t(E, `Next: (${r},${c}) = ${letter}. ${letterPrompt(letter)}`,
                `다음: (${r},${c}) = ${letter}. ${letterPrompt(letter)}`);
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
          🎬 {t(E, "Same color = same star's path", "같은 색깔 = 한 별의 길")}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
          {t(E, "Star moves right 1, down 2. ▶ Press start to color the grid one cell at a time.",
                "별은 오른쪽 1, 아래 2 로 움직여. ▶ 누르면 한 칸씩 색깔이 칠해져.")}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 10 }}>
        <button onClick={goBack} disabled={history.length === 0} style={{
          padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700,
          border: `2px solid ${history.length === 0 ? C.border : "#7c3aed"}`,
          background: "#fff",
          color: history.length === 0 ? C.dim : "#7c3aed",
          cursor: history.length === 0 ? "default" : "pointer",
          opacity: history.length === 0 ? 0.45 : 1,
        }}>
          {t(E, "← Back", "← 이전")}
        </button>
        <button onClick={advance} disabled={phase === "done"} style={{
          padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700,
          border: `2px solid ${A_COLOR}`,
          background: phase === "done" ? "#e0e7ff" : A_COLOR,
          color: phase === "done" ? A_COLOR : "#fff",
          cursor: phase === "done" ? "default" : "pointer", opacity: phase === "done" ? 0.5 : 1,
        }}>
          {phase === "idle" ? t(E, "▶ Start", "▶ 시작")
           : phase === "done" ? t(E, "✓ Done", "✓ 끝")
           : t(E, "Next →", "다음 →")}
        </button>
        <button onClick={reset} style={{
          padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
          border: `2px solid ${C.border}`, background: "#fff", color: C.dim, cursor: "pointer",
        }}>
          ↺ {t(E, "Reset", "초기화")}
        </button>
      </div>

      {/* Grid wrapper — symmetric padding so the grid is visually centered.
          padding-top holds the tracer ghost when it goes above (r<0).
          padding-right holds the speech bubble in a fixed dock so it never covers grid cells. */}
      {(() => {
        const pitch = cellSize + 5;
        const padTop = B * pitch + 20;     // room for tracer ghost up to r=-B
        const bubbleDockWidth = 190;        // bubble dock area on the right
        const padSide = Math.max(A * pitch + 14, bubbleDockWidth);  // symmetric L/R for centering
        return (
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{
          position: "relative",
          paddingTop: padTop,
          paddingLeft: padSide,
          paddingRight: padSide,
          paddingBottom: 6,
        }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${N}, ${cellSize}px)`, gap: 5 }}>
          {Array.from({ length: total }).map((_, idx) => {
            const r = Math.floor(idx / N), c = idx % N;
            const s = cellStyle(r, c);
            const mark = marks[`${r},${c}`];
            const isChainCell = mark?.kind === "chain";
            const isCurrent = currentCell && currentCell[0] === r && currentCell[1] === c;
            return (
              <div key={idx} style={{
                width: cellSize, height: cellSize,
                background: s.bg, color: s.fg,
                border: `${s.glow ? 3 : 2}px solid ${s.border}`,
                borderRadius: 7,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700,
                transition: "all 0.2s",
                boxShadow: s.glow ? "0 0 0 4px rgba(217,119,6,0.25)" : "none",
              }}>
                {(() => {
                  const letter = cellLetter(r, c);
                  const isProcessed = !!marks[`${r},${c}`];
                  // After processing: G/B turn into ★, W stays empty-looking
                  if (isProcessed) {
                    if (letter === "W") {
                      return (
                        <>
                          <div style={{ fontSize: 16, color: "#cbd5e1", lineHeight: 1 }}>·</div>
                          <div style={{ fontSize: 9, marginTop: 2, color: "#64748b" }}>({r},{c})</div>
                        </>
                      );
                    }
                    // G/B → 별. 단 G인데 predecessor(r-B, c-A)에 이미 별이 있으면
                    // '옮겨온 별'(원본 사진엔 없음, 위에서 내려옴) → ★ 대신 흐린 ↘ 로 (세는 별 아님).
                    // (B 는 두 사진 모두 별 = 여기 원본 별이 있으니 항상 ★)
                    const starColor = letter === "B" ? "#1e293b" : "#475569";
                    const pr = r - B, pc = c - A;
                    const movedIn = letter === "G" && pr >= 0 && pc >= 0 && pr < N && pc < N
                      && marks[`${pr},${pc}`]?.kind === "chain";
                    if (movedIn) {
                      return (
                        <>
                          <div style={{ fontSize: 17, lineHeight: 1, color: "#cbd5e1", fontWeight: 900 }}
                               title={t(E, "moved in from up-left — not an original star", "위에서 내려온 별 — 원본 아님")}>↘</div>
                          <div style={{ fontSize: 9, marginTop: 1, color: starColor, fontWeight: 700 }}>{letter} ({r},{c})</div>
                        </>
                      );
                    }
                    return (
                      <>
                        <div style={{ fontSize: 20, lineHeight: 1, color: "#d97706", fontWeight: 900 }}>★</div>
                        <div style={{ fontSize: 9, marginTop: 1, color: starColor, fontWeight: 700 }}>{letter} ({r},{c})</div>
                      </>
                    );
                  }
                  // Before processing: show the letter
                  const letterStyle = letter === "W" ? { color: "#94a3b8" }
                                    : letter === "G" ? { color: "#475569" }
                                    : { color: "#1e293b", fontWeight: 900 };
                  return (
                    <>
                      <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, ...letterStyle }}>{letter}</div>
                      <div style={{ fontSize: 9, marginTop: 2, color: "#64748b" }}>({r},{c})</div>
                    </>
                  );
                })()}
              </div>
            );
          })}
        </div>
          {/* Tracer ghost — positioned with grid offset so r<0/c<0 sits in the padding area */}
          {tracer && (
            <div style={{
              position: "absolute",
              width: cellSize, height: cellSize,
              left: padSide + tracer.c * pitch,
              top: padTop + tracer.r * pitch,
              borderRadius: 7,
              border: "3px dashed #4f46e5",
              background: "rgba(79, 70, 229, 0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, fontWeight: 900, color: "#4f46e5",
              transition: "all 0.35s ease",
              pointerEvents: "none",
              boxShadow: "0 0 0 4px rgba(79,70,229,0.2)",
            }}>👀</div>
          )}
          {/* Speech bubble STACK — fixed dock on the right side.
              Each step appends a new bubble below the previous, so student can re-read history. */}
          {bubbles.length > 0 && (
            <div style={{
              position: "absolute",
              top: 4,
              right: 8,
              width: bubbleDockWidth - 16,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              pointerEvents: "none",
              zIndex: 5,
            }}>
              {bubbles.map((b, idx) => {
                const isLatest = idx === bubbles.length - 1;
                return (
                  <div key={b.key} style={{
                    background: "#fff",
                    border: `${isLatest ? 3 : 2}px solid ${b.color}`,
                    borderRadius: 12,
                    padding: isLatest ? "8px 10px" : "6px 9px",
                    color: b.color,
                    textAlign: "center",
                    boxShadow: isLatest
                      ? `0 4px 14px ${b.color}40, 0 0 0 4px ${b.color}20`
                      : `0 1px 4px ${b.color}25`,
                    opacity: isLatest ? 1 : 0.65,
                    animation: "astralBubblePop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transition: "opacity 0.2s, border-width 0.2s, padding 0.2s",
                  }}>
                    <div style={{
                      fontSize: isLatest ? 13 : 11,
                      fontWeight: 800,
                      lineHeight: 1.2,
                    }}>
                      {b.head}
                    </div>
                    {b.sub && (
                      <div style={{
                        fontSize: isLatest ? 11 : 10,
                        fontWeight: 700,
                        opacity: 0.78,
                        marginTop: 2,
                        lineHeight: 1.2,
                      }}>
                        {b.sub}
                      </div>
                    )}
                    {b.note && (
                      <div style={{
                        fontSize: isLatest ? 10 : 9,
                        fontWeight: 600,
                        opacity: 0.6,
                        marginTop: 5,
                        lineHeight: 1.25,
                        fontStyle: "italic",
                        borderTop: `1px dashed ${b.color}55`,
                        paddingTop: 4,
                      }}>
                        💭 {b.note}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
        );
      })()}
      <style>{`
        @keyframes astralBubblePop {
          0%   { transform: scale(0.3) translateX(-6px); opacity: 0; }
          50%  { transform: scale(1.12) translateX(2px); opacity: 1; }
          75%  { transform: scale(0.96); }
          100% { transform: scale(1) translateX(0); opacity: 1; }
        }
      `}</style>

      <div style={{
        background: phase === "done" ? "#dcfce7" : "#f8fafc",
        border: `1px solid ${phase === "done" ? "#16a34a" : "#e2e8f0"}`,
        borderRadius: 8, padding: "6px 10px",
        fontSize: 11, fontWeight: 500,
        color: phase === "done" ? "#14532d" : "#64748b",
        textAlign: "center", lineHeight: 1.5, minHeight: 24,
      }}>
        {statusText()}
      </div>
    </div>
  );
}


/* ════════════════════════════════════════════════════════════════════
   Progressive code: 5 sections.
   ════════════════════════════════════════════════════════════════════ */

const AST_S1_PY = [
  "import sys",
  "",
  "# 모든 입력을 단어 리스트로 한 번에 받기 (입력 빠름)",
  "data = sys.stdin.read().split()",
  "p = 0                       # p = 지금 읽을 단어 위치",
  "",
  "T = int(data[p])            # T = 퍼즐 개수 (T 번 풀어야 함)",
  "p += 1",
  "",
  "for _ in range(T):          # 퍼즐 하나씩 처리",
  "    N = int(data[p])        # N = 격자 한 변 크기 (N × N)",
  "    p += 1",
  "    right = int(data[p])    # right = 별이 오른쪽으로 몇 칸",
  "    p += 1",
  "    down = int(data[p])     # down = 별이 아래로 몇 칸",
  "    p += 1",
  "    grid = [data[p + r] for r in range(N)]   # N 줄 모아서 grid",
  "    p += N",
  "    # ↓ 다음: 이 퍼즐 풀기",
];
const AST_S1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;                  // T = 퍼즐 개수",
  "    cin >> T;",
  "",
  "    for (int t = 0; t < T; t++) {   // 퍼즐 하나씩 처리",
  "        int N, right, down;",
  "        // N = 격자 크기, right/down = 별 이동량",
  "        cin >> N >> right >> down;",
  "",
  "        vector<string> grid(N);     // N × N 격자",
  "        for (int r = 0; r < N; r++) {",
  "            cin >> grid[r];",
  "        }",
  "        // ↓ 다음: 이 퍼즐 풀기",
  "    }",
];

const AST_S2_PY = [
  "# Special case: right = down = 0 (stars don't move)",
  "# Each cell tells us directly:",
  "#   W cell → no star",
  "#   G cell → star existed but disappeared",
  "#   B cell → star existed and stayed",
  "# Min total = #G + #B.",
  "if right == 0 and down == 0:",
  "    ans = 0",
  "    for r in range(N):",
  "        for c in range(N):",
  "            if grid[r][c] in ('G', 'B'):",
  "                ans += 1",
  "    print(ans)",
  "    continue",
];
const AST_S2_CPP = [
  "        if (right == 0 && down == 0) {",
  "            int ans = 0;",
  "            for (int r = 0; r < N; r++) {",
  "                for (int c = 0; c < N; c++) {",
  "                    if (grid[r][c] == 'G' || grid[r][c] == 'B') {",
  "                        ans++;",
  "                    }",
  "                }",
  "            }",
  "            cout << ans << '\\n';",
  "            continue;",
  "        }",
];

const AST_S3_PY = [
  "# 별 길은 (아래 down, 오른쪽 right) 방향으로 칸을 잇는 선.",
  "# 시작점 = 거꾸로 한 칸 (r-down, c-right) 가 격자 밖인 칸.",
  "",
  "EMPTY = 99999999           # 진짜 답보다 큰 수 = '못 만듦' 표시",
  "visited = [[False] * N for _ in range(N)]   # 칸 이미 처리했는지 표시 (중복 방지)",
  "total = 0                  # 전체 답 — 모든 별 길 답을 합칠 곳",
  "impossible = False         # 한 길이라도 못 만들면 True → 답 -1",
  "",
  "for r0 in range(N):                  # 격자 모든 칸 돌면서",
  "    if impossible: break",
  "    for c0 in range(N):",
  "        if visited[r0][c0]: continue       # 이미 처리한 칸이면 패스",
  "        # 시작점 판별: 거꾸로 한 칸이 격자 안이면 시작점 아님",
  "        if r0 - down >= 0 and c0 - right >= 0:",
  "            continue",
  "",
  "        # 시작점 찾음! 이 별 길의 칸 글자들 모으기",
  "        path = []          # 이 별 길의 칸 글자들 (W/G/B)",
  "        r, c = r0, c0      # 지금 따라가는 위치",
  "        while 0 <= r < N and 0 <= c < N:",
  "            path.append(grid[r][c])",
  "            visited[r][c] = True",
  "            r += down      # 아래로 down 칸",
  "            c += right     # 오른쪽으로 right 칸",
  "        # ↓ 다음 슬라이드: 이 path 로 별 최소 수 계산 (DP)",
];
const AST_S3_CPP = [
  "        const int EMPTY = 99999999;   // 진짜 답보다 큰 수 = '못 만듦' 표시",
  "        vector<vector<bool>> visited(N, vector<bool>(N, false));   // 칸 이미 처리?",
  "        int total = 0;          // 전체 답 — 모든 별 길 답 합칠 곳",
  "        bool impossible = false; // 한 길이라도 못 만들면 true → 답 -1",
  "",
  "        for (int r0 = 0; r0 < N && !impossible; r0++) {   // 격자 모든 칸 돌기",
  "            for (int c0 = 0; c0 < N; c0++) {",
  "                if (visited[r0][c0]) continue;  // 이미 처리 → 패스",
  "                // 시작점 판별: 거꾸로 한 칸이 격자 안이면 시작점 아님",
  "                if (r0 - down >= 0 && c0 - right >= 0) continue;",
  "",
  "                // 시작점! 별 길 따라가며 칸 글자 모으기",
  "                vector<char> path;       // 이 별 길의 칸 글자들",
  "                int r = r0, c = c0;      // 지금 따라가는 위치",
  "                while (0 <= r && r < N && 0 <= c && c < N) {",
  "                    path.push_back(grid[r][c]);",
  "                    visited[r][c] = true;",
  "                    r += down;           // 아래로",
  "                    c += right;          // 오른쪽으로",
  "                }",
  "                // ↓ 다음 슬라이드: 이 path 로 별 최소 수 계산",
  "            }",
  "        }",
];

// Section 4a — First cell setup (smaller chunk for elementary clarity)
const AST_S4A_PY = [
  "# min_stars[0] = min stars so far, when this cell does NOT pass a star out",
  "# min_stars[1] = min stars so far, when this cell DOES pass a star out",
  "",
  "# First cell of the path — nothing came from before",
  "min_stars = [EMPTY, EMPTY]",
  "first_letter = path[0]",
  "if first_letter == 'W':",
  "    min_stars[0] = 0       # W: no star, no pass-out",
  "elif first_letter == 'G':",
  "    min_stars[0] = 1       # G: 1 star here, keep OR pass — both OK",
  "    min_stars[1] = 1",
  "# 'B' impossible as first cell → min_stars stays [EMPTY, EMPTY]",
];
const AST_S4A_CPP = [
  "                // min_stars[0] = min stars when this cell does NOT pass a star out",
  "                // min_stars[1] = min stars when this cell DOES pass a star out",
  "                int min_stars[2] = { EMPTY, EMPTY };",
  "                char first_letter = path[0];",
  "                if (first_letter == 'W') {",
  "                    min_stars[0] = 0;",
  "                } else if (first_letter == 'G') {",
  "                    min_stars[0] = 1;",
  "                    min_stars[1] = 1;",
  "                }",
  "                // 'B' impossible as first cell",
];

// Section 4b — Main loop (each next cell of the path)
const AST_S4B_PY = [
  "# Walk the rest of the path, one cell at a time",
  "for k in range(1, len(path)):",
  "    letter = path[k]",
  "    new_min_stars = [EMPTY, EMPTY]",
  "    prev_keep = min_stars[0]    # 이전 칸: 별 안 보냄",
  "    prev_pass = min_stars[1]    # 이전 칸: 별 보냄",
  "",
  "    if letter == 'W':",
  "        if prev_keep != EMPTY: new_min_stars[0] = prev_keep",
  "    elif letter == 'B':",
  "        if prev_pass != EMPTY:",
  "            new_min_stars[0] = prev_pass + 1   # +1 별 (여기 원래 별)",
  "            new_min_stars[1] = prev_pass + 1",
  "    else:  # G — two cases",
  "        if prev_keep != EMPTY:              # (a) original ★ here → +1",
  "            new_min_stars[0] = min(new_min_stars[0], prev_keep + 1)",
  "            new_min_stars[1] = min(new_min_stars[1], prev_keep + 1)",
  "        if prev_pass != EMPTY:              # (b) ★ moved in → no new ★",
  "            new_min_stars[0] = min(new_min_stars[0], prev_pass)",
  "",
  "    min_stars = new_min_stars",
];
const AST_S4B_CPP = [
  "                for (int k = 1; k < (int)path.size(); k++) {",
  "                    char letter = path[k];",
  "                    int new_min_stars[2] = { EMPTY, EMPTY };",
  "                    int prev_keep = min_stars[0];   // 이전 칸: 별 안 보냄",
  "                    int prev_pass = min_stars[1];   // 이전 칸: 별 보냄",
  "",
  "                    if (letter == 'W') {",
  "                        if (prev_keep != EMPTY) new_min_stars[0] = prev_keep;",
  "                    } else if (letter == 'B') {",
  "                        if (prev_pass != EMPTY) {",
  "                            new_min_stars[0] = prev_pass + 1;",
  "                            new_min_stars[1] = prev_pass + 1;",
  "                        }",
  "                    } else {  // G — two cases",
  "                        if (prev_keep != EMPTY) {  // (a) original ★ → +1",
  "                            new_min_stars[0] = min(new_min_stars[0], prev_keep + 1);",
  "                            new_min_stars[1] = min(new_min_stars[1], prev_keep + 1);",
  "                        }",
  "                        if (prev_pass != EMPTY) {  // (b) ★ moved in",
  "                            new_min_stars[0] = min(new_min_stars[0], prev_pass);",
  "                        }",
  "                    }",
  "                    min_stars[0] = new_min_stars[0];",
  "                    min_stars[1] = new_min_stars[1];",
  "                }",
];

// Backwards compatibility: keep AST_S4_PY/CPP as the union
const AST_S4_PY = [...AST_S4A_PY, "", ...AST_S4B_PY];
const AST_S4_CPP = [...AST_S4A_CPP, ...AST_S4B_CPP];

const AST_FULL_PY = [
  "import sys",
  "",
  "def main():",
  "    data = sys.stdin.read().split()",
  "    p = 0",
  "    T = int(data[p])",
  "    p += 1",
  "    out = []",
  "    EMPTY = 99999999    # 진짜 답보다 큰 수 (= '못 만듦' 표시)",
  "    for _ in range(T):",
  "        N = int(data[p])",
  "        p += 1",
  "        right = int(data[p])    # 별이 오른쪽으로 몇 칸 이동",
  "        p += 1",
  "        down = int(data[p])     # 별이 아래로 몇 칸 이동",
  "        p += 1",
  "        grid = [data[p + r] for r in range(N)]",
  "        p += N",
  "",
  "        # Special case: stars don't move",
  "        if right == 0 and down == 0:",
  "            ans = 0",
  "            for r in range(N):",
  "                for c in range(N):",
  "                    if grid[r][c] in ('G', 'B'):",
  "                        ans += 1",
  "            out.append(str(ans))",
  "            continue",
  "",
  "        visited = [[False] * N for _ in range(N)]",
  "        total = 0",
  "        impossible = False",
  "        for r0 in range(N):",
  "            if impossible: break",
  "            for c0 in range(N):",
  "                if visited[r0][c0]: continue",
  "                if r0 - down >= 0 and c0 - right >= 0:",
  "                    continue",
  "                # Walk one star path",
  "                path = []",
  "                r, c = r0, c0",
  "                while 0 <= r < N and 0 <= c < N:",
  "                    path.append(grid[r][c])",
  "                    visited[r][c] = True",
  "                    r += down",
  "                    c += right",
  "",
  "                # DP on this path",
  "                min_stars = [EMPTY, EMPTY]",
  "                first_letter = path[0]",
  "                if first_letter == 'W':",
  "                    min_stars[0] = 0",
  "                elif first_letter == 'G':",
  "                    min_stars[0] = 1; min_stars[1] = 1",
  "",
  "                for k in range(1, len(path)):",
  "                    letter = path[k]",
  "                    new_min_stars = [EMPTY, EMPTY]",
  "                    prev_keep, prev_pass = min_stars[0], min_stars[1]",
  "                    if letter == 'W':",
  "                        if prev_keep != EMPTY: new_min_stars[0] = prev_keep",
  "                    elif letter == 'B':",
  "                        if prev_pass != EMPTY:",
  "                            new_min_stars[0] = prev_pass + 1",
  "                            new_min_stars[1] = prev_pass + 1",
  "                    else:  # G",
  "                        if prev_keep != EMPTY:",
  "                            new_min_stars[0] = min(new_min_stars[0], prev_keep + 1)",
  "                            new_min_stars[1] = min(new_min_stars[1], prev_keep + 1)",
  "                        if prev_pass != EMPTY:",
  "                            new_min_stars[0] = min(new_min_stars[0], prev_pass)",
  "                    min_stars = new_min_stars",
  "",
  "                path_min = min(min_stars[0], min_stars[1])",
  "                if path_min == EMPTY:",
  "                    impossible = True",
  "                    break",
  "                total += path_min",
  "",
  "        out.append('-1' if impossible else str(total))",
  "    print('\\n'.join(out))",
  "",
  "main()",
];
const AST_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N, right, down;   // right = 별이 오른쪽 이동, down = 별이 아래 이동",
  "        cin >> N >> right >> down;",
  "        vector<string> grid(N);",
  "        for (int r = 0; r < N; r++) {",
  "            cin >> grid[r];",
  "        }",
  "",
  "        if (right == 0 && down == 0) {",
  "            int ans = 0;",
  "            for (int r = 0; r < N; r++) {",
  "                for (int c = 0; c < N; c++) {",
  "                    if (grid[r][c] == 'G' || grid[r][c] == 'B') {",
  "                        ans++;",
  "                    }",
  "                }",
  "            }",
  "            cout << ans << '\\n';",
  "            continue;",
  "        }",
  "",
  "        const int EMPTY = 99999999;   // 진짜 답보다 큰 수 (= '못 만듦' 표시)",
  "        vector<vector<bool>> visited(N, vector<bool>(N, false));",
  "        int total = 0;",
  "        bool impossible = false;",
  "",
  "        for (int r0 = 0; r0 < N && !impossible; r0++) {",
  "            for (int c0 = 0; c0 < N; c0++) {",
  "                if (visited[r0][c0]) {",
  "                    continue;",
  "                }",
  "                if (r0 - down >= 0 && c0 - right >= 0) {",
  "                    continue;",
  "                }",
  "                vector<char> path;",
  "                int r = r0, c = c0;",
  "                while (0 <= r && r < N && 0 <= c && c < N) {",
  "                    path.push_back(grid[r][c]);",
  "                    visited[r][c] = true;",
  "                    r += down;",
  "                    c += right;",
  "                }",
  "",
  "                int min_stars[2] = { EMPTY, EMPTY };",
  "                char first_letter = path[0];",
  "                if (first_letter == 'W') {",
  "                    min_stars[0] = 0;",
  "                } else if (first_letter == 'G') {",
  "                    min_stars[0] = 1;",
  "                    min_stars[1] = 1;",
  "                }",
  "",
  "                for (int k = 1; k < (int)path.size(); k++) {",
  "                    char letter = path[k];",
  "                    int new_min_stars[2] = { EMPTY, EMPTY };",
  "                    int prev_keep = min_stars[0];",
  "                    int prev_pass = min_stars[1];",
  "                    if (letter == 'W') {",
  "                        if (prev_keep != EMPTY) {",
  "                            new_min_stars[0] = prev_keep;",
  "                        }",
  "                    } else if (letter == 'B') {",
  "                        if (prev_pass != EMPTY) {",
  "                            new_min_stars[0] = prev_pass + 1;",
  "                            new_min_stars[1] = prev_pass + 1;",
  "                        }",
  "                    } else {",
  "                        if (prev_keep != EMPTY) {",
  "                            new_min_stars[0] = min(new_min_stars[0], prev_keep + 1);",
  "                            new_min_stars[1] = min(new_min_stars[1], prev_keep + 1);",
  "                        }",
  "                        if (prev_pass != EMPTY) {",
  "                            new_min_stars[0] = min(new_min_stars[0], prev_pass);",
  "                        }",
  "                    }",
  "                    min_stars[0] = new_min_stars[0];",
  "                    min_stars[1] = new_min_stars[1];",
  "                }",
  "",
  "                int path_min = min(min_stars[0], min_stars[1]);",
  "                if (path_min == EMPTY) {",
  "                    impossible = true;",
  "                    break;",
  "                }",
  "                total += path_min;",
  "            }",
  "        }",
  "",
  "        cout << (impossible ? -1 : total) << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* ════════════════════════════════════════════════════════════════════
   BACKWARD GREEDY — the MAIN solution (teacher's own verified approach).
   Scan the grid bottom-right → top-left. Going backward, any B's demand for
   a predecessor star is already met BEFORE we decide the predecessor, so there
   is nothing to guess. `possibles` = the set of cells that MUST hold an
   original star. Answer = how many such cells (or -1 if a B can't be satisfied).
   ════════════════════════════════════════════════════════════════════ */
const AST_GREEDY_CORE_PY = [
  "# possibles = 원래 별이 있어야 하는 칸들 (set → 중복은 알아서 하나로)",
  "possibles = set()",
  "impossible = False",
  "",
  "# 격자를 오른쪽-아래 끝에서 → 왼쪽-위로 거꾸로 훑기",
  "for r in range(N - 1, -1, -1):",
  "    if impossible: break",
  "    for c in range(N - 1, -1, -1):",
  "        star = grid[r][c]",
  "",
  "        if star == 'B':              # 두 사진 다 별 → 여기 + 직전 칸 둘 다 별",
  "            possibles.add((r, c))",
  "            if r - down >= 0 and c - right >= 0:    # 직전 칸이 사진 안?",
  "                aa = grid[r - down][c - right]",
  "                if aa == 'G' or aa == 'B':",
  "                    possibles.add((r - down, c - right))   # 직전 칸에 별",
  "                else:                # 직전 칸이 W → B 못 만듦",
  "                    impossible = True",
  "                    break",
  "            else:                    # 직전 칸이 사진 밖 → B 못 만듦",
  "                impossible = True",
  "                break",
  "",
  "        elif star == 'G':            # 한 사진에만 별",
  "            if (r, c) in possibles:  # 뒤에서 B 가 이미 별 찍어둠 → 끝",
  "                continue",
  "            if r - down < 0 or c - right < 0:",
  "                possibles.add((r, c))             # 직전 칸 사진 밖 → 여기 별",
  "            elif grid[r - down][c - right] in ('G', 'B'):",
  "                possibles.add((r - down, c - right))   # 직전 칸과 별 공유",
  "            else:",
  "                possibles.add((r, c))             # 직전 칸 W → 여기 별",
  "        # W → 아무것도 안 함",
  "",
  "answer = -1 if impossible else len(possibles)   # 이 퍼즐 답",
];
const AST_GREEDY_CORE_CPP = [
  "// possibles = 원래 별이 있어야 하는 칸들 (set → 중복은 알아서 하나로)",
  "set<pair<int,int>> possibles;",
  "bool impossible = false;",
  "",
  "// 격자를 오른쪽-아래 끝에서 → 왼쪽-위로 거꾸로 훑기",
  "for (int r = N - 1; r >= 0 && !impossible; r--) {",
  "    for (int c = N - 1; c >= 0; c--) {",
  "        char star = grid[r][c];",
  "",
  "        if (star == 'B') {           // 두 사진 다 별 → 여기 + 직전 칸 둘 다",
  "            possibles.insert({r, c});",
  "            if (r - down >= 0 && c - right >= 0) {   // 직전 칸이 사진 안?",
  "                char aa = grid[r - down][c - right];",
  "                if (aa == 'G' || aa == 'B')",
  "                    possibles.insert({r - down, c - right});  // 직전 칸 별",
  "                else { impossible = true; break; }   // 직전 W → 못 만듦",
  "            } else { impossible = true; break; }     // 직전 밖 → 못 만듦",
  "        }",
  "        else if (star == 'G') {      // 한 사진에만 별",
  "            if (possibles.count({r, c})) continue;   // 이미 별 → 끝",
  "            if (r - down < 0 || c - right < 0)",
  "                possibles.insert({r, c});            // 직전 밖 → 여기 별",
  "            else if (grid[r-down][c-right] == 'G' || grid[r-down][c-right] == 'B')",
  "                possibles.insert({r - down, c - right});  // 직전과 별 공유",
  "            else",
  "                possibles.insert({r, c});            // 직전 W → 여기 별",
  "        }",
  "        // W → 아무것도 안 함",
  "    }",
  "}",
  "",
  "int answer = impossible ? -1 : (int)possibles.size();   // 이 퍼즐 답",
];

const AST_GREEDY_FULL_PY = [
  "import sys",
  "",
  "def main():",
  "    data = sys.stdin.read().split()",
  "    p = 0",
  "    T = int(data[p]); p += 1",
  "    out = []",
  "    for _ in range(T):",
  "        N = int(data[p]); p += 1",
  "        right = int(data[p]); p += 1     # 별이 오른쪽으로 몇 칸",
  "        down = int(data[p]); p += 1      # 별이 아래로 몇 칸",
  "        grid = [data[p + r] for r in range(N)]; p += N",
  "",
  "        # 별이 안 움직이면 → G, B 칸 그냥 세기",
  "        if right == 0 and down == 0:",
  "            cnt = sum(1 for r in range(N) for c in range(N)",
  "                      if grid[r][c] in ('G', 'B'))",
  "            out.append(str(cnt))",
  "            continue",
  "",
  "        possibles = set()       # 원래 별이 있어야 하는 칸 (중복 자동 제거)",
  "        impossible = False",
  "        for r in range(N - 1, -1, -1):       # 끝에서부터 거꾸로",
  "            if impossible: break",
  "            for c in range(N - 1, -1, -1):",
  "                star = grid[r][c]",
  "                if star == 'B':              # 두 사진 다 별",
  "                    possibles.add((r, c))",
  "                    if r - down >= 0 and c - right >= 0:",
  "                        aa = grid[r - down][c - right]",
  "                        if aa == 'G' or aa == 'B':",
  "                            possibles.add((r - down, c - right))",
  "                        else:",
  "                            impossible = True",
  "                            break",
  "                    else:",
  "                        impossible = True",
  "                        break",
  "                elif star == 'G':            # 한 사진에만 별",
  "                    if (r, c) in possibles:  # 이미 별 있음",
  "                        continue",
  "                    if r - down < 0 or c - right < 0:",
  "                        possibles.add((r, c))",
  "                    elif grid[r - down][c - right] in ('G', 'B'):",
  "                        possibles.add((r - down, c - right))",
  "                    else:",
  "                        possibles.add((r, c))",
  "                # W → 아무것도 안 함",
  "",
  "        out.append('-1' if impossible else str(len(possibles)))",
  "    print('\\n'.join(out))",
  "",
  "main()",
];
const AST_GREEDY_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <set>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N, right, down;   // right = 오른쪽 이동, down = 아래 이동",
  "        cin >> N >> right >> down;",
  "        vector<string> grid(N);",
  "        for (int r = 0; r < N; r++) cin >> grid[r];",
  "",
  "        // 별이 안 움직이면 → G, B 칸 그냥 세기",
  "        if (right == 0 && down == 0) {",
  "            int cnt = 0;",
  "            for (int r = 0; r < N; r++)",
  "                for (int c = 0; c < N; c++)",
  "                    if (grid[r][c] == 'G' || grid[r][c] == 'B') cnt++;",
  "            cout << cnt << '\\n';",
  "            continue;",
  "        }",
  "",
  "        set<pair<int,int>> possibles;   // 원래 별이 있어야 하는 칸",
  "        bool impossible = false;",
  "        for (int r = N - 1; r >= 0 && !impossible; r--) {",
  "            for (int c = N - 1; c >= 0; c--) {",
  "                char star = grid[r][c];",
  "                if (star == 'B') {              // 두 사진 다 별",
  "                    possibles.insert({r, c});",
  "                    if (r - down >= 0 && c - right >= 0) {",
  "                        char aa = grid[r - down][c - right];",
  "                        if (aa == 'G' || aa == 'B')",
  "                            possibles.insert({r - down, c - right});",
  "                        else { impossible = true; break; }",
  "                    } else { impossible = true; break; }",
  "                }",
  "                else if (star == 'G') {         // 한 사진에만 별",
  "                    if (possibles.count({r, c})) continue;",
  "                    if (r - down < 0 || c - right < 0)",
  "                        possibles.insert({r, c});",
  "                    else if (grid[r-down][c-right] == 'G' || grid[r-down][c-right] == 'B')",
  "                        possibles.insert({r - down, c - right});",
  "                    else",
  "                        possibles.insert({r, c});",
  "                }",
  "                // W → 아무것도 안 함",
  "            }",
  "        }",
  "        cout << (impossible ? -1 : (int)possibles.size()) << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getAstralSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read T, then per case (size, right-shift, down-shift, grid)", "1️⃣ T 읽고, 각 케이스 (격자 크기, 오른쪽 이동, 아래 이동, 격자)"),
      color: A_COLOR,
      py: AST_S1_PY, cpp: AST_S1_CPP,
      why: [
        t(E, "First line: how many puzzles (T). Each puzzle then gives:",
            "맨 첫 줄에 퍼즐 몇 개인지 (T). 각 퍼즐마다 차례로:"),
        t(E, "• N = grid side length (so the grid is N×N)",
            "• N = 격자 한 변 크기 (격자는 N × N)"),
        t(E, "• right = how far the star moves right",
            "• right = 별이 오른쪽으로 몇 칸 가는지"),
        t(E, "• down = how far the star moves down",
            "• down = 별이 아래로 몇 칸 가는지"),
        t(E, "• then N lines of W/G/B characters — the grid itself",
            "• 그 다음 W/G/B 문자로 된 N 줄 — 격자 내용"),
      ],
      pyOnly: [
        t(E, "sys.stdin.read().split() + pointer p — faster than input() at Σ N² ≤ 10⁷.",
            "sys.stdin.read().split() + 포인터 p — Σ N² ≤ 10⁷ 에선 input() 보다 빠름."),
      ],
      cppOnly: [],
      aside: <SampleInputAside E={E} sample={AST_SAMPLE} highlight={[0, 1, 2, 3, 4]} note={t(E,
        "Sample 1: \"1\" (1 puzzle), \"3 0 0\" (3×3 grid, stars don't move), then 3 grid rows.",
        "샘플 1: \"1\" (퍼즐 1 개), \"3 0 0\" (3×3 격자, 별 안 움직임), 그 다음 격자 3 줄.")} />,
    },
    {
      label: t(E, "2️⃣ Easy case: stars don't move", "2️⃣ 쉬운 경우: 별이 안 움직일 때"),
      color: "#16a34a",
      py: AST_S2_PY, cpp: AST_S2_CPP,
      why: [
        t(E, "Stars don't move → every cell stands alone. Each G and B contributes exactly 1 star.",
            "별 이동량 둘 다 0 → 모든 칸이 따로따로. G 와 B 한 칸마다 별 1 개씩."),
        t(E, "Answer = count(G) + count(B). Never -1.",
            "답 = G 개수 + B 개수. -1 절대 없음."),
      ],
      pyOnly: [],
      cppOnly: [],
    },
    {
      label: t(E, "3️⃣ Look back to find the start, then color the path", "3️⃣ 거꾸로 가서 시작점 찾고, 별 길 색칠"),
      color: "#7c3aed",
      py: AST_S3_PY, cpp: AST_S3_CPP,
      why: [
        t(E, "📖 How to read this code — just 4 chunks:",
            "📖 코드 읽는 법 — 네 덩어리로 나눠서 봐:"),
        t(E, "Lines 1-4 — get our tools ready: visited grid (so we don't process a cell twice), running total, 'impossible' flag.",
            "1-4 줄: 도구 꺼내기. visited 격자 (같은 칸 두 번 안 보려고), 합계 total, '망함' 표시 impossible."),
        t(E, "Lines 5-9 — walk every cell with two for-loops. Already touched? Skip.",
            "5-9 줄: for 두 개로 모든 칸 한 번씩 둘러보기. 이미 손댔으면 그냥 넘김."),
        t(E, "Lines 10-12 — look BACK (up `down`, left `right`). If THAT cell is in-grid, this isn't the start — skip. Only the cells whose 'look back' falls off-grid are real starts.",
            "10-12 줄: 거꾸로 위로 down, 왼쪽으로 right 가봐. 그 칸이 격자 안이면 여기는 시작점 아님 → 스킵. 거꾸로 갔을 때 격자 밖 나가는 칸만 진짜 시작점."),
        t(E, "Lines 13-20 — from the start, keep going (+ down rows, + right cols) — store each cell into `path` until we fall off the grid. One star path is done.",
            "13-20 줄: 시작점에서 (아래 down, 오른쪽 right) 로 한 칸씩 가면서 path 에 담기. 격자 밖 나가면 끝. 별 길 하나 다 봤음."),
      ],
      pyOnly: [],
      cppOnly: [],
    },
    {
      label: t(E, "4a. First cell — set the starting min_stars", "4a. 첫 칸 — min_stars 시작값 정하기"),
      color: "#0891b2",
      py: AST_S4A_PY, cpp: AST_S4A_CPP,
      why: [
        t(E, "Look at the first letter (W or G). Fill min_stars[0] / min_stars[1] using the 'first cell' table.",
            "첫 글자 (W 또는 G) 보고, '첫 칸 정해진 경우' 표 그대로 min_stars[0] / min_stars[1] 적기."),
        t(E, "W → min_stars = [0, EMPTY]. G → min_stars = [1, 1]. B as first cell is impossible, min_stars stays [EMPTY, EMPTY].",
            "W → min_stars = [0, EMPTY]. G → min_stars = [1, 1]. B 가 첫 칸이면 불가 → min_stars 그대로 [EMPTY, EMPTY]."),
      ],
      pyOnly: [],
      cppOnly: [],
    },
    {
      label: t(E, "4b. Walk the rest — one cell at a time", "4b. 나머지 칸 — 한 칸씩 처리"),
      color: "#0891b2",
      py: AST_S4B_PY, cpp: AST_S4B_CPP,
      why: [
        t(E, "Each step: read prev_keep, prev_pass + this letter → compute new_min_stars[0], new_min_stars[1].",
            "매 칸: 이전 칸의 prev_keep, prev_pass + 이 칸 글자 → 새 new_min_stars[0], new_min_stars[1] 계산."),
        t(E, "Inside the loop the if-else for W / G / B is literally the cheat-sheet table from earlier.",
            "루프 안의 if-else (W / G / B) — 앞에서 본 치트시트 표를 그대로 옮긴 거."),
      ],
      pyOnly: [],
      cppOnly: [],
    },
    {
      label: t(E, "5️⃣ Full code — sum path answers; output -1 or total", "5️⃣ 전체 코드 — 별 길 답 합치기, -1 또는 총합 출력"),
      color: "#dc2626",
      py: AST_FULL_PY, cpp: AST_FULL_CPP,
      why: [
        t(E, "📖 Putting it all together — same chunks you've seen, now stitched into one main():",
            "📖 전부 합치기 — 방금까지 본 덩어리들을 main() 하나에 이어 붙인 거야:"),
        t(E, "(a) Read input → (b) 'stars don't move' shortcut → (c) walk every star path → (d) per path: if-else min_stars update → (e) min(min_stars[0], min_stars[1]) = that path's answer.",
            "(a) 입력 받기 → (b) '별 안 움직이면' 분기 → (c) 별 길마다 걷기 → (d) 한 길당: if-else 로 min_stars 업데이트 → (e) min(min_stars[0], min_stars[1]) = 그 길의 답."),
        t(E, "Sum all path answers = total. If any path's answer is EMPTY → print -1 instead.",
            "별 길 답들 다 더하면 total. 한 별 길이라도 EMPTY 면 total 대신 -1 출력."),
        t(E, "Speed-wise: each cell is visited once + O(1) work → O(N²) per case. With Σ N² ≤ 10⁷, plenty of headroom.",
            "속도: 칸당 한 번 + O(1) 작업 → 케이스당 O(N²). 전체 Σ N² ≤ 10⁷ 라 여유 있음."),
      ],
      pyOnly: [
        t(E, "Buffer outputs in a list and print('\\n'.join(out)) once at the end — faster than T prints.",
            "케이스 답을 list 에 모아 마지막에 print('\\n'.join(out)) — T 번 print 보다 빠름."),
      ],
      cppOnly: [],
    },
    /* ── index 6: BACKWARD GREEDY core (main solution heart) ── */
    {
      label: t(E, "★ Backward greedy — scan back, mark where stars MUST be", "★ 뒤→앞 그리디 — 거꾸로 훑으며 별 위치 확정"),
      color: "#0d9488",
      py: AST_GREEDY_CORE_PY, cpp: AST_GREEDY_CORE_CPP,
      why: [
        t(E, "📖 The whole idea in one pass — no chain-grouping, no DP table:",
            "📖 한 번 훑기로 끝 — 별 길 묶기도, DP 표도 필요 없어:"),
        t(E, "Walk every cell from the bottom-right corner toward the top-left.",
            "오른쪽-아래 끝 칸에서 왼쪽-위로, 모든 칸을 거꾸로 한 번씩 봐."),
        t(E, "B → this cell AND its predecessor (one step back) both need an original star. If that predecessor is W or off-grid, B is impossible → -1.",
            "B → 이 칸 + 직전 칸 (거꾸로 한 칸) 둘 다 원래 별 필요. 직전 칸이 W 거나 사진 밖이면 B 못 만듦 → -1."),
        t(E, "G → if this cell already got a star (a later B demanded it), done. Otherwise put one original star at the predecessor (share it) when possible, else here.",
            "G → 이 칸에 이미 별이 찍혔으면 (뒤쪽 B 가 시켜둠) 끝. 아니면 가능하면 직전 칸에 별 하나 (공유), 안 되면 여기."),
        t(E, "Why backward works: going end → start, every B's demand is already recorded BEFORE we reach the predecessor. No guessing — so a one-pass greedy is exact.",
            "거꾸로가 되는 이유: 끝 → 시작으로 가면 B 의 요구가 직전 칸에 닿기 전에 이미 기록돼 있어. 찍을 일이 없으니 한 번 훑기 그리디가 정확해."),
        t(E, "possibles is a set, so adding the same cell twice counts once. answer = len(possibles).",
            "possibles 는 set 이라 같은 칸 두 번 넣어도 하나로 셈. answer = len(possibles)."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "set<pair<int,int>> mirrors the Python set. {r, c} inserts a coordinate; .count({r,c}) checks membership.",
            "set<pair<int,int>> 가 파이썬 set 역할. {r, c} 로 좌표 넣고, .count({r,c}) 로 들어있는지 확인."),
      ],
      aside: <SampleInputAside E={E} sample={AST_SAMPLE} highlight={[]} note={t(E,
        "Tip: a 'predecessor' = the cell one star-step back: (r - down, c - right).",
        "팁: '직전 칸' = 별 한 걸음 거꾸로 간 칸: (r - down, c - right).")} />,
    },
    /* ── index 7: full backward-greedy program (teacher's verified Python) ── */
    {
      label: t(E, "★ Full backward-greedy program", "★ 뒤→앞 그리디 전체 코드"),
      color: "#dc2626",
      py: AST_GREEDY_FULL_PY, cpp: AST_GREEDY_FULL_CPP,
      why: [
        t(E, "📖 Everything stitched together — read input → 'stars don't move' shortcut → the backward greedy → print the count (or -1).",
            "📖 전부 합치기 — 입력 받기 → '별 안 움직임' 지름길 → 뒤→앞 그리디 → 별 수 출력 (또는 -1)."),
        t(E, "Notice there's no chain list and no min_stars table — the set possibles does all the bookkeeping.",
            "별 길 리스트도, min_stars 표도 없는 거 봐 — set possibles 하나가 다 기억해 줘."),
        t(E, "Speed: each cell visited once + O(log) set work → about O(N² log N) per case. Comfortably inside the time limit.",
            "속도: 칸당 한 번 + set O(log) → 케이스당 약 O(N² log N). 제한 시간 안에 여유."),
      ],
      pyOnly: [
        t(E, "This is the teacher's actual USACO-accepted Python (logic verbatim; input switched to the fast sys.stdin read).",
            "선생님이 USACO 통과시킨 실제 파이썬 (로직 그대로, 입력만 빠른 sys.stdin 으로)."),
      ],
      cppOnly: [],
    },
  ];
}

export function AstralProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A_COLOR} />;
}

/* PDF helpers (template — same shape as other quests) */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sum"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","map","pair"];
function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  let out = ""; let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) { out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`; work = work.slice(ppm[0].length); }
  }
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok)) out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok)) out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok)) out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadAstralPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Astral Superposition — Full Study Guide", "🔭 Astral Superposition — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A_COLOR}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A_COLOR}; color: white; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A_COLOR}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A_COLOR}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A_COLOR}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO January 2025 Bronze · ${t(E, "Self-contained walkthrough", "혼자서도 볼 수 있는 풀이")}</div>
<h2>${t(E, "Code (5 sections)", "코드 (5 섹션)")}</h2>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
