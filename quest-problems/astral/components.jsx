// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 12/12 PASS
//   C++:    12/12 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

const A_COLOR = "#4f46e5";

const AST_SAMPLE = ["1", "3 0 0", "WWB", "BBB", "GGG"];

/* ════════════════════════════════════════════════════════════════════
   AstralComposite — show the composite + a chain trace overlay.
   ════════════════════════════════════════════════════════════════════ */
const AST_PRESETS = [
  { name: "S1: A=B=0", N: 3, A: 0, B: 0, grid: ["WWB", "BBB", "GGG"] },
  { name: "S2-1: A=1 B=2", N: 5, A: 1, B: 2, grid: ["GWGWW", "WGWWW", "WBWGW", "WWWWW", "WWGWW"] },
  { name: "S2-2: impossible", N: 3, A: 1, B: 1, grid: ["WWW", "WBW", "WWW"] },
  { name: "S2-3: A=1 B=0", N: 3, A: 1, B: 0, grid: ["GGB", "GGW", "WWW"] },
];

export function AstralComposite({ E }) {
  const [pi, setPi] = useState(0);
  const preset = AST_PRESETS[pi];
  const { N, A, B, grid } = preset;
  const [hi, setHi] = useState(null); // [r, c] of last clicked cell

  // Build chain through (r0, c0) — walk forward AND backward to find both ends.
  let chainCells = [];
  if (hi && (A !== 0 || B !== 0)) {
    let [r, c] = hi;
    // walk back to start
    while (r - B >= 0 && c - A >= 0) { r -= B; c -= A; }
    // walk forward
    while (r >= 0 && c >= 0 && r < N && c < N) {
      chainCells.push([r, c]);
      r += B; c += A;
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
        N = {N},  A = {A},  B = {B}
        {(A !== 0 || B !== 0) && <span> · {t(E, "click a cell to trace its chain", "칸 클릭해서 체인 추적")}</span>}
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
          <b>{t(E, "Chain", "체인")}:</b>{" "}
          {chainCells.map(([r, c], i) => (
            <code key={i} style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, marginRight: 4, fontFamily: "'JetBrains Mono',monospace" }}>
              ({r + 1},{c + 1})={grid[r][c]}
            </code>
          ))}
        </div>
      )}

      {/* Caption removed — chain visualization (border highlight + chain cells list) is self-evident
          once the student clicks a cell.  Concept (chain = (r,c)→(r+B,c+A)) lives in the chapter narration. */}
    </div>
  );
}

export function AstralSim({ E }) { return <AstralComposite E={E} />; }
export function AstralRunner() { return null; }

/* ════════════════════════════════════════════════════════════════════
   AstralDpSim — chain DP state machine live visualizer.
   체인을 W/G/B 로 토글하면서 state[0], state[1] 이 어떻게 갱신되는지 본다.
   INF (불가능) 은 빨간색. 최종 답은 min(state[0], state[1]).
   ════════════════════════════════════════════════════════════════════ */
const dpPresets = (E) => [
  { name: "G→W→G→G", chain: ["G", "W", "G", "G"] },
  { name: "G→B→G→W", chain: ["G", "B", "G", "W"] },
  { name: t(E, "W→B (impossible)", "W→B (불가)"), chain: ["W", "B"] },
  { name: "G→B→B→G", chain: ["G", "B", "B", "G"] },
  { name: "W→W→W→W", chain: ["W", "W", "W", "W"] },
];

function dpRun(chain, E) {
  const INF = Infinity;
  const trace = [];
  let state = [INF, INF];
  const c0 = chain[0];
  if (c0 === "W") state = [0, INF];
  else if (c0 === "G") state = [1, 1];
  // B 일 때 state 그대로 [INF, INF] — 첫 칸 in=0 이라 B 불가
  trace.push({
    comp: c0,
    state: [...state],
    note: c0 === "W"
      ? t(E, "in=0, s=0, out=0", "in=0, s=0, out=0")
      : c0 === "G"
        ? t(E, "s=1, out free (0 or 1)", "s=1, out 자유")
        : t(E, "❌ in=0 here → B impossible", "❌ in=0 이라 B 불가")
  });

  for (let k = 1; k < chain.length; k++) {
    const c = chain[k];
    const ns = [INF, INF];
    const s0 = state[0], s1 = state[1];
    let note = "";
    if (c === "W") {
      if (s0 !== INF) ns[0] = s0;
      note = t(E, "Needs in=0 → only state[0] carries forward", "in=0 필요 → state[0]만 이어짐");
    } else if (c === "B") {
      if (s1 !== INF) { ns[0] = s1 + 1; ns[1] = s1 + 1; }
      note = t(E, "Needs in=1 (prev out=1) → +1 star", "in=1 필요 (이전 out=1) → +1 별");
    } else {
      if (s0 !== INF) { ns[0] = Math.min(ns[0], s0 + 1); ns[1] = Math.min(ns[1], s0 + 1); }
      if (s1 !== INF) { ns[0] = Math.min(ns[0], s1); }
      note = t(E, "in=0 → new star (+1); in=1 → no new star", "in=0면 새 별(+1), in=1면 그대로");
    }
    state = ns;
    trace.push({ comp: c, state: [...state], note });
  }
  return { trace, final: Math.min(state[0], state[1]) };
}

const dpFmt = (v) => v === Infinity ? "∞" : String(v);

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
        {t(E, "Click cells to cycle W → G → B. Watch state[0] / state[1] update live.",
              "칸 클릭하면 W → G → B 순환. state[0] / state[1] 이 어떻게 갱신되는지 보세요.")}
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
              <td style={{ width: 70, fontSize: 11, color: C.dim, textAlign: "right", padding: "2px 6px" }}>cell</td>
              {chain.map((_, i) => (
                <td key={i} style={{ width: 64, textAlign: "center", fontSize: 11, color: C.dim }}>k={i}</td>
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
            {/* state[0] */}
            <tr>
              <td style={{ fontSize: 11, color: C.dim, textAlign: "right", padding: "2px 6px" }}>state[0]</td>
              {trace.map((tr, i) => {
                const v = tr.state[0];
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
            {/* state[1] */}
            <tr>
              <td style={{ fontSize: 11, color: C.dim, textAlign: "right", padding: "2px 6px" }}>state[1]</td>
              {trace.map((tr, i) => {
                const v = tr.state[1];
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
          📌 {t(E, "Last cell", "마지막 칸")} (k={trace.length - 1}, comp={trace[trace.length - 1].comp})
        </div>
        <div style={{ fontSize: 11.5 }}>{trace[trace.length - 1].note}</div>
      </div>

      {/* 최종 답 */}
      <div style={{
        textAlign: "center", padding: "10px 14px", borderRadius: 10, fontSize: 14, fontWeight: 800,
        background: impossible ? "#fee2e2" : "#dcfce7",
        color: impossible ? "#991b1b" : "#14532d",
        border: `2px solid ${impossible ? "#dc2626" : "#16a34a"}`,
      }}>
        {impossible
          ? t(E, "❌ Chain min = ∞ → IMPOSSIBLE (-1)", "❌ 체인 최소 = ∞ → 불가능 (-1)")
          : t(E, `✅ Chain min = min(state[0], state[1]) = ${final}`, `✅ 체인 최소 = min(state[0], state[1]) = ${final}`)}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   AstralChainDiscovery — small 3×3 demo showing how (A, B) shift
   creates a chain.  Shows photo 1 → photo 2 → composite for 1 star.
   ════════════════════════════════════════════════════════════════════ */
const CD_PRESETS = [
  { name: "A=1 B=0", A: 1, B: 0 },
  { name: "A=0 B=1", A: 0, B: 1 },
  { name: "A=1 B=1", A: 1, B: 1 },
];
export function AstralChainDiscovery({ E }) {
  const [pi, setPi] = useState(0);
  const [moves, setMoves] = useState(true); // true: 별이 이동, false: 사라짐
  const { A, B } = CD_PRESETS[pi];
  const N = 3;
  const startR = 0, startC = 0;
  const endR = startR + B, endC = startC + A;
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
            <b>🔗 {t(E, "Chain discovery", "체인 발견")}:</b>{" "}
            {t(E, `Star at (0,0) lands at (${endR},${endC}) in photo 2. The composite has G at BOTH (0,0) and (${endR},${endC}) — these two cells are LINKED by (A=${A}, B=${B}). Following the link repeatedly forms a CHAIN.`,
                  `(0,0) 의 별이 사진 2 의 (${endR},${endC}) 로 옮겨감. 합성은 (0,0) 과 (${endR},${endC}) 둘 다 G — 이 두 칸이 (A=${A}, B=${B}) 로 연결됨. 계속 따라가면 체인.`)}
          </>
        ) : moves && !inside ? (
          <>
            <b>{t(E, "Star lost off-grid", "별이 격자 밖으로")}:</b>{" "}
            {t(E, "Composite only shows G at the source — single isolated cell, no chain link.",
                  "합성은 출발지에만 G — 외톨이 칸, 체인 연결 없음.")}
          </>
        ) : (
          <>
            <b>{t(E, "Star disappeared", "별 사라짐")}:</b>{" "}
            {t(E, "Composite shows G only at the source — no chain.",
                  "합성은 출발지에만 G — 체인 없음.")}
          </>
        )}
      </div>

      <div style={{ marginTop: 8, padding: "8px 12px", background: "#fffbeb", border: "1px dashed #fbbf24", borderRadius: 8, fontSize: 11.5, color: "#78350f", lineHeight: 1.55 }}>
        💡 {t(E,
          "When A=B=0, every star 'shifts' to its own cell → no link → cells are independent → just count G + B. But when (A,B)≠(0,0), cells form chains → DP along each chain.",
          "A=B=0 면 '이동' 도 같은 자리 → 연결 없음 → 칸 독립 → 그냥 G+B 카운트. 하지만 (A,B)≠(0,0) 이면 칸들이 체인 → 체인별 DP 필요.")}
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
  "data = sys.stdin.read().split()",
  "p = 0",
  "T = int(data[p])",
  "p += 1",
  "for _ in range(T):",
  "    N = int(data[p])",
  "    p += 1",
  "    A = int(data[p])",
  "    p += 1",
  "    B = int(data[p])",
  "    p += 1",
  "    grid = [data[p + r] for r in range(N)]",
  "    p += N",
  "    # solve below",
];
const AST_S1_CPP = [
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
  "        int N, A, B;",
  "        cin >> N >> A >> B;",
  "        vector<string> grid(N);",
  "        for (int r = 0; r < N; r++) {",
  "            cin >> grid[r];",
  "        }",
  "        // solve below",
  "    }",
];

const AST_S2_PY = [
  "# Special case: A = B = 0",
  "# Stars don't move. Composite directly tells us each cell:",
  "#   W → no star (s = 0)",
  "#   G → star existed but disappeared (s = 1)",
  "#   B → star existed and stayed (s = 1)",
  "# Min total = #G + #B.",
  "if A == 0 and B == 0:",
  "    ans = 0",
  "    for r in range(N):",
  "        for c in range(N):",
  "            if grid[r][c] in ('G', 'B'):",
  "                ans += 1",
  "    print(ans)",
  "    continue",
];
const AST_S2_CPP = [
  "        if (A == 0 && B == 0) {",
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
  "# General case (A, B) != (0, 0): walk chains in direction (B, A).",
  "# A chain STARTS at (r, c) where (r-B, c-A) is OUT of grid.",
  "# Walk forward (r += B, c += A) until off-grid.",
  "INF = float('inf')",
  "visited = [[False] * N for _ in range(N)]",
  "total = 0",
  "impossible = False",
  "",
  "for r0 in range(N):",
  "    if impossible: break",
  "    for c0 in range(N):",
  "        if visited[r0][c0]: continue",
  "        # Chain start ⇔ predecessor out of grid",
  "        if r0 - B >= 0 and c0 - A >= 0:",
  "            continue",
  "        # Walk this chain",
  "        chain = []",
  "        r, c = r0, c0",
  "        while 0 <= r < N and 0 <= c < N:",
  "            chain.append(grid[r][c])",
  "            visited[r][c] = True",
  "            r += B",
  "            c += A",
  "        # ... DP on chain (next step)",
];
const AST_S3_CPP = [
  "        const int INF = 1e9;",
  "        vector<vector<bool>> visited(N, vector<bool>(N, false));",
  "        int total = 0;",
  "        bool impossible = false;",
  "        for (int r0 = 0; r0 < N && !impossible; r0++) {",
  "            for (int c0 = 0; c0 < N; c0++) {",
  "                if (visited[r0][c0]) {",
  "                    continue;",
  "                }",
  "                if (r0 - B >= 0 && c0 - A >= 0) {",
  "                    continue;  // not a chain start",
  "                }",
  "                vector<char> chain;",
  "                int r = r0, c = c0;",
  "                while (0 <= r && r < N && 0 <= c && c < N) {",
  "                    chain.push_back(grid[r][c]);",
  "                    visited[r][c] = true;",
  "                    r += B;",
  "                    c += A;",
  "                }",
  "                // ... DP on chain (next step)",
  "            }",
  "        }",
];

const AST_S4_PY = [
  "# Per-chain DP. State[out_pin] = min stars in chain so far,",
  "# given that the LAST cell's outgoing pin is out_pin.",
  "# Composite rules per cell:",
  "#   W: requires in=0, s=0, out=0",
  "#   B: requires in=1, s=1, out free (we choose m)",
  "#   G with in=0: s=1, out free",
  "#   G with in=1: s=0, out=0",
  "",
  "# First cell: in = 0 (no predecessor).",
  "state = [INF, INF]   # state[0], state[1]",
  "comp0 = chain[0]",
  "if comp0 == 'W':",
  "    state[0] = 0",
  "elif comp0 == 'G':",
  "    state[0] = 1; state[1] = 1   # s=1 here, out free",
  "# B impossible from in=0",
  "",
  "for k in range(1, len(chain)):",
  "    comp = chain[k]",
  "    new_state = [INF, INF]",
  "    s_in0, s_in1 = state[0], state[1]",
  "    if comp == 'W':",
  "        if s_in0 != INF: new_state[0] = s_in0",
  "    elif comp == 'B':",
  "        if s_in1 != INF:",
  "            new_state[0] = s_in1 + 1",
  "            new_state[1] = s_in1 + 1",
  "    else:  # G",
  "        if s_in0 != INF:",
  "            new_state[0] = min(new_state[0], s_in0 + 1)",
  "            new_state[1] = min(new_state[1], s_in0 + 1)",
  "        if s_in1 != INF:",
  "            new_state[0] = min(new_state[0], s_in1)",
  "    state = new_state",
];
const AST_S4_CPP = [
  "                // Per-chain DP",
  "                int state[2] = { INF, INF };",
  "                char c0 = chain[0];",
  "                if (c0 == 'W') {",
  "                    state[0] = 0;",
  "                } else if (c0 == 'G') {",
  "                    state[0] = 1;",
  "                    state[1] = 1;",
  "                }",
  "                // 'B' impossible from in=0",
  "                for (int k = 1; k < (int)chain.size(); k++) {",
  "                    char comp = chain[k];",
  "                    int ns[2] = { INF, INF };",
  "                    int s0 = state[0];",
  "                    int s1 = state[1];",
  "                    if (comp == 'W') {",
  "                        if (s0 != INF) {",
  "                            ns[0] = s0;",
  "                        }",
  "                    } else if (comp == 'B') {",
  "                        if (s1 != INF) {",
  "                            ns[0] = s1 + 1;",
  "                            ns[1] = s1 + 1;",
  "                        }",
  "                    } else {  // G",
  "                        if (s0 != INF) {",
  "                            ns[0] = min(ns[0], s0 + 1);",
  "                            ns[1] = min(ns[1], s0 + 1);",
  "                        }",
  "                        if (s1 != INF) {",
  "                            ns[0] = min(ns[0], s1);",
  "                        }",
  "                    }",
  "                    state[0] = ns[0];",
  "                    state[1] = ns[1];",
  "                }",
];

const AST_FULL_PY = [
  "import sys",
  "",
  "def main():",
  "    data = sys.stdin.read().split()",
  "    p = 0",
  "    T = int(data[p])",
  "    p += 1",
  "    out = []",
  "    INF = float('inf')",
  "    for _ in range(T):",
  "        N = int(data[p])",
  "        p += 1",
  "        A = int(data[p])",
  "        p += 1",
  "        B = int(data[p])",
  "        p += 1",
  "        grid = [data[p + r] for r in range(N)]",
  "        p += N",
  "",
  "        # Special case A = B = 0",
  "        if A == 0 and B == 0:",
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
  "                if r0 - B >= 0 and c0 - A >= 0:",
  "                    continue",
  "                # Walk chain",
  "                chain = []",
  "                r, c = r0, c0",
  "                while 0 <= r < N and 0 <= c < N:",
  "                    chain.append(grid[r][c])",
  "                    visited[r][c] = True",
  "                    r += B",
  "                    c += A",
  "",
  "                # DP",
  "                state = [INF, INF]",
  "                comp = chain[0]",
  "                if comp == 'W':",
  "                    state[0] = 0",
  "                elif comp == 'G':",
  "                    state[0] = 1; state[1] = 1",
  "",
  "                for k in range(1, len(chain)):",
  "                    comp = chain[k]",
  "                    ns = [INF, INF]",
  "                    s0, s1 = state[0], state[1]",
  "                    if comp == 'W':",
  "                        if s0 != INF: ns[0] = s0",
  "                    elif comp == 'B':",
  "                        if s1 != INF:",
  "                            ns[0] = s1 + 1",
  "                            ns[1] = s1 + 1",
  "                    else:  # G",
  "                        if s0 != INF:",
  "                            ns[0] = min(ns[0], s0 + 1)",
  "                            ns[1] = min(ns[1], s0 + 1)",
  "                        if s1 != INF:",
  "                            ns[0] = min(ns[0], s1)",
  "                    state = ns",
  "",
  "                chain_min = min(state[0], state[1])",
  "                if chain_min == INF:",
  "                    impossible = True",
  "                    break",
  "                total += chain_min",
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
  "        int N, A, B;",
  "        cin >> N >> A >> B;",
  "        vector<string> grid(N);",
  "        for (int r = 0; r < N; r++) {",
  "            cin >> grid[r];",
  "        }",
  "",
  "        if (A == 0 && B == 0) {",
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
  "        const int INF = 1e9;",
  "        vector<vector<bool>> visited(N, vector<bool>(N, false));",
  "        int total = 0;",
  "        bool impossible = false;",
  "",
  "        for (int r0 = 0; r0 < N && !impossible; r0++) {",
  "            for (int c0 = 0; c0 < N; c0++) {",
  "                if (visited[r0][c0]) {",
  "                    continue;",
  "                }",
  "                if (r0 - B >= 0 && c0 - A >= 0) {",
  "                    continue;",
  "                }",
  "                vector<char> chain;",
  "                int r = r0, c = c0;",
  "                while (0 <= r && r < N && 0 <= c && c < N) {",
  "                    chain.push_back(grid[r][c]);",
  "                    visited[r][c] = true;",
  "                    r += B;",
  "                    c += A;",
  "                }",
  "",
  "                int state[2] = { INF, INF };",
  "                char c0c = chain[0];",
  "                if (c0c == 'W') {",
  "                    state[0] = 0;",
  "                } else if (c0c == 'G') {",
  "                    state[0] = 1;",
  "                    state[1] = 1;",
  "                }",
  "",
  "                for (int k = 1; k < (int)chain.size(); k++) {",
  "                    char comp = chain[k];",
  "                    int ns[2] = { INF, INF };",
  "                    int s0 = state[0];",
  "                    int s1 = state[1];",
  "                    if (comp == 'W') {",
  "                        if (s0 != INF) {",
  "                            ns[0] = s0;",
  "                        }",
  "                    } else if (comp == 'B') {",
  "                        if (s1 != INF) {",
  "                            ns[0] = s1 + 1;",
  "                            ns[1] = s1 + 1;",
  "                        }",
  "                    } else {",
  "                        if (s0 != INF) {",
  "                            ns[0] = min(ns[0], s0 + 1);",
  "                            ns[1] = min(ns[1], s0 + 1);",
  "                        }",
  "                        if (s1 != INF) {",
  "                            ns[0] = min(ns[0], s1);",
  "                        }",
  "                    }",
  "                    state[0] = ns[0];",
  "                    state[1] = ns[1];",
  "                }",
  "",
  "                int chain_min = min(state[0], state[1]);",
  "                if (chain_min == INF) {",
  "                    impossible = true;",
  "                    break;",
  "                }",
  "                total += chain_min;",
  "            }",
  "        }",
  "",
  "        cout << (impossible ? -1 : total) << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getAstralSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read T, then per case (N, A, B, grid)", "1️⃣ T 읽고, 각 케이스 (N, A, B, grid)"),
      color: A_COLOR,
      py: AST_S1_PY, cpp: AST_S1_CPP,
      why: [
        t(E, "T = number of test cases (1 ≤ T ≤ 1000). Outer loop runs T times — each iteration is a fresh independent puzzle.",
            "T = 테스트 케이스 수 (1 ≤ T ≤ 1000). 바깥 for 가 T 번 — 매 반복은 독립된 새 퍼즐."),
        t(E, "Per case: N (grid size, 1 ≤ N ≤ 1000), A (column shift = how far right a star slides), B (row shift = how far down).",
            "케이스당: N (격자 크기, 1 ≤ N ≤ 1000), A (열 이동 = 별이 오른쪽으로 가는 칸 수), B (행 이동 = 아래쪽 칸 수)."),
        t(E, "Then N strings of length N each — composite rows top-to-bottom. grid[r] is the r-th row, grid[r][c] is the cell at row r col c.",
            "그 다음 길이 N 의 문자열 N 개 — 합성의 위→아래 행. grid[r] 가 r 번째 행, grid[r][c] 가 (r,c) 칸."),
        t(E, "Python uses sys.stdin.read().split() + pointer p — much faster than input() for large grids (Σ N² ≤ 10⁷).",
            "Python 은 sys.stdin.read().split() + 포인터 p 사용 — 큰 격자 (Σ N² ≤ 10⁷) 에선 input() 보다 훨씬 빠름."),
      ],
      aside: <SampleInputAside E={E} sample={AST_SAMPLE} highlight={[0, 1, 2, 3, 4]} note={t(E,
        "Sample 1: \"1\" (T=1), \"3 0 0\" (N=3, A=0, B=0), then 3 grid rows.",
        "샘플 1: \"1\" (T=1), \"3 0 0\" (N=3, A=0, B=0), 그 다음 3 줄.")} />,
    },
    {
      label: t(E, "2️⃣ Special case: A = B = 0", "2️⃣ 특수: A = B = 0"),
      color: "#16a34a",
      py: AST_S2_PY, cpp: AST_S2_CPP,
      why: [
        t(E, "If A=B=0 the 'shift' lands on the same cell. Every cell is its own 1-cell chain — no link to anywhere else, so we can decide each cell on its own.",
            "A=B=0 면 '이동' 도 같은 자리. 모든 칸이 자기 자신만의 1 칸 체인 — 다른 칸과 연결 없음, 그래서 칸마다 따로 결정."),
        t(E, "Per cell: W → no star (s=0); G → star existed but disappeared (s=1, m=0); B → star existed and stayed (s=1, m=1). Each G and B contributes exactly 1 star.",
            "칸별: W → 별 없음 (s=0); G → 원래 별, 사라짐 (s=1, m=0); B → 원래 별, 그대로 (s=1, m=1). G 와 B 는 별 1 개씩."),
        t(E, "No -1 case possible — every composite is consistent. Just total = count of G + count of B.",
            "-1 불가능 — 어떤 합성이든 valid. 그냥 총합 = G 개수 + B 개수."),
        t(E, "'continue' jumps to the next test case (next iteration of outer for-T) — skipping the chain-DP code below.",
            "'continue' 는 다음 테스트 케이스로 점프 (바깥 for-T 의 다음 반복) — 아래 체인 DP 코드 건너뜀."),
      ],
    },
    {
      label: t(E, "3️⃣ Walk chains in direction (B, A)", "3️⃣ (B, A) 방향으로 체인 걷기"),
      color: "#7c3aed",
      py: AST_S3_PY, cpp: AST_S3_CPP,
      why: [
        t(E, "A star at (r, c) can only travel to (r+B, c+A) in photo 2. So cells along that direction form CHAINS — and only neighbours within a chain can affect each other.",
            "(r, c) 별은 사진 2 의 (r+B, c+A) 로만 감. 그 방향 칸들이 체인을 이룸 — 같은 체인 안에서만 서로 영향."),
        t(E, "visited[r][c]: marks cells already absorbed into some chain. Without it, we'd revisit and double-count cells.",
            "visited[r][c]: 이미 어느 체인에 들어간 칸 표시. 없으면 같은 칸 두 번 방문해 중복 처리됨."),
        t(E, "Chain-start test: r0-B < 0 OR c0-A < 0 → predecessor (r0-B, c0-A) is off-grid → no one can flow INTO this cell. Otherwise it's mid-chain — skip (will be reached from its real start).",
            "체인 시작 판정: r0-B < 0 또는 c0-A < 0 → 이전 칸 (r0-B, c0-A) 가 격자 밖 → 아무도 이 칸으로 못 흘러옴. 아니면 체인 중간 — 스킵 (진짜 시작에서 도달함)."),
        t(E, "While loop: from chain start, append grid[r][c], mark visited, then r += B; c += A. Stops when (r, c) goes off-grid. This list 'chain' is what the DP runs on next.",
            "while: 시작점에서 grid[r][c] 추가, visited 표시, 그 다음 r += B; c += A. (r, c) 가 격자 밖이면 종료. 이 'chain' 리스트가 다음 DP 입력."),
      ],
    },
    {
      label: t(E, "4️⃣ Per-chain DP — state = outgoing pin", "4️⃣ 체인별 DP — 상태 = 나가는 pin"),
      color: "#0891b2",
      py: AST_S4_PY, cpp: AST_S4_CPP,
      why: [
        t(E, "state[out] = min stars in this chain up to here, given current cell's outgoing pin = out. Two values per cell. INF means 'unreachable / impossible so far'.",
            "state[out] = 현재까지 체인에서 별 최소 수 (현재 칸 나가는 pin = out 일 때). 칸마다 두 값. INF = '여기까진 도달 불가'."),
        t(E, "First cell (k=0): in=0 forced (nothing before). W → state=[0,∞]. G → state=[1,1] (s=1, out free). B → state=[∞,∞] (B needs in=1, contradiction).",
            "첫 칸 (k=0): in=0 강제 (앞에 없음). W → state=[0,∞]. G → state=[1,1] (s=1, out 자유). B → state=[∞,∞] (B 는 in=1 필요, 모순)."),
        t(E, "Transitions read 'prev out becomes my in'. So s_in0 = prev state[0]; s_in1 = prev state[1].",
            "전이는 '이전 out 이 내 in'. 그래서 s_in0 = 이전 state[0]; s_in1 = 이전 state[1]."),
        t(E, "W: needs in=0 → only s_in0 path works → new_state[0] = s_in0 (no star added, no out=1).",
            "W: in=0 필요 → s_in0 경로만 가능 → new_state[0] = s_in0 (별 추가 X, out=1 X)."),
        t(E, "B: needs in=1 → only s_in1 path → +1 star (s=1) → new_state[0] = s_in1+1, new_state[1] = s_in1+1 (out free).",
            "B: in=1 필요 → s_in1 경로만 → 별 +1 (s=1) → new_state[0] = s_in1+1, new_state[1] = s_in1+1 (out 자유)."),
        t(E, "G with in=0: s=1 (original star here), +1 → new_state[0/1] = s_in0+1. G with in=1: s=0 (arriving star covers it), no add, but cell's outgoing must be 0 → new_state[0] = s_in1.",
            "G + in=0: s=1 (원래 별), +1 → new_state[0/1] = s_in0+1. G + in=1: s=0 (들어온 별로 충당), 추가 X, 단 나가는 pin = 0 강제 → new_state[0] = s_in1."),
      ],
    },
    {
      label: t(E, "5️⃣ Full code — sum chains, output -1 or total", "5️⃣ 전체 코드 — 체인 합산, -1 또는 총합 출력"),
      color: "#dc2626",
      py: AST_FULL_PY, cpp: AST_FULL_CPP,
      why: [
        t(E, "chain_min = min(state[0], state[1]) after the last cell. Last cell's outgoing pin points off-grid so both out=0 and out=1 are valid endings — take the smaller.",
            "마지막 칸 처리 후 chain_min = min(state[0], state[1]). 마지막 칸의 나가는 pin 은 격자 밖 → out=0 과 out=1 둘 다 valid 종료 → 작은 값 선택."),
        t(E, "impossible flag: if any chain's chain_min == INF, set impossible = True and break out — no need to process remaining chains.",
            "impossible 플래그: 어느 체인이든 chain_min == INF 면 impossible = True 후 break — 남은 체인 안 봐도 됨."),
        t(E, "Chains are independent (no cell is in two chains thanks to visited[]). So total += chain_min accumulates across all chains.",
            "체인끼리 독립 (visited[] 덕분에 어떤 칸도 두 체인에 속하지 않음). 그래서 total += chain_min 으로 누적."),
        t(E, "out.append(str(...)): we collect per-test-case answers, then print('\\n'.join(out)) at the end. Single big print is faster than T separate prints for T=1000.",
            "out.append(str(...)): 케이스별 답을 모아두고 마지막에 print('\\n'.join(out)). T=1000 일 때 T 번 print 하는 것보다 한 번에 출력이 빠름."),
        t(E, "Final per-case output: '-1' if impossible else str(total). Print order matches input order.",
            "케이스 출력: impossible 이면 '-1', 아니면 str(total). 입력 순서대로 출력."),
        t(E, "Complexity: O(N²) per case (each cell visited once + O(1) DP per cell). Sum over cases: O(Σ N²) ≤ 10⁷ — well within limits.",
            "복잡도: 케이스당 O(N²) (각 칸 한 번 방문 + O(1) DP). 케이스 합: O(Σ N²) ≤ 10⁷ — 제한 내."),
      ],
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
<div class="sub">USACO January 2025 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
