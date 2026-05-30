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
const DP_PRESETS = [
  { name: "G→W→G→G", chain: ["G", "W", "G", "G"] },
  { name: "G→B→G→W", chain: ["G", "B", "G", "W"] },
  { name: "W→B (불가)", chain: ["W", "B"] },
  { name: "G→B→B→G", chain: ["G", "B", "B", "G"] },
  { name: "W→W→W→W", chain: ["W", "W", "W", "W"] },
];

function dpRun(chain) {
  const INF = Infinity;
  const trace = [];
  let state = [INF, INF];
  const c0 = chain[0];
  if (c0 === "W") state = [0, INF];
  else if (c0 === "G") state = [1, 1];
  // B 일 때 state 그대로 [INF, INF] — 첫 칸 in=0 이라 B 불가
  trace.push({ comp: c0, state: [...state], note: c0 === "W" ? "in=0, s=0, out=0" : c0 === "G" ? "s=1, out 자유" : "❌ in=0 이라 B 불가" });

  for (let k = 1; k < chain.length; k++) {
    const c = chain[k];
    const ns = [INF, INF];
    const s0 = state[0], s1 = state[1];
    let note = "";
    if (c === "W") {
      if (s0 !== INF) ns[0] = s0;
      note = "in=0 필요 → state[0]만 이어짐";
    } else if (c === "B") {
      if (s1 !== INF) { ns[0] = s1 + 1; ns[1] = s1 + 1; }
      note = "in=1 필요 (이전 out=1) → +1 별";
    } else {
      if (s0 !== INF) { ns[0] = Math.min(ns[0], s0 + 1); ns[1] = Math.min(ns[1], s0 + 1); }
      if (s1 !== INF) { ns[0] = Math.min(ns[0], s1); }
      note = "in=0면 새 별(+1), in=1면 그대로";
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

  const { trace, final } = dpRun(chain);
  const impossible = final === Infinity;

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
        {DP_PRESETS.map((p, i) => (
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
        t(E, "T test cases. Each: N (size), A (right shift), B (down shift), then N rows of W/G/B.",
            "T 케이스. 각각: N (크기), A (오른쪽 이동), B (아래 이동), 그 다음 W/G/B N 줄."),
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
        t(E, "If A=B=0 the 'shift' lands on the same cell. So composite directly tells us each cell's state: W → no star, G → star that disappeared, B → star that stayed.",
            "A=B=0 면 '이동' 도 같은 자리. 합성이 칸 상태를 직접: W → 별 없음, G → 사라진 별, B → 그대로 별."),
        t(E, "No -1 case here. Just count G and B cells.",
            "여기선 -1 없음. 그냥 G 와 B 개수만."),
      ],
    },
    {
      label: t(E, "3️⃣ Walk chains in direction (B, A)", "3️⃣ (B, A) 방향으로 체인 걷기"),
      color: "#7c3aed",
      py: AST_S3_PY, cpp: AST_S3_CPP,
      why: [
        t(E, "A star at (r, c) can only travel to (r+B, c+A) in photo 2. So cells along that direction form CHAINS.",
            "(r, c) 별은 사진 2 의 (r+B, c+A) 로만 갈 수 있음. 그 방향 칸들이 체인 형성."),
        t(E, "Chain start: (r, c) where the predecessor (r-B, c-A) is OUT of grid. From a start, walk by (B, A) until off-grid.",
            "체인 시작: 이전 칸 (r-B, c-A) 가 격자 밖인 (r, c). 시작점에서 (B, A) 만큼씩 격자 밖까지 진행."),
        t(E, "Each cell is visited exactly once across all chains.",
            "모든 칸은 정확히 한 체인에 속함."),
      ],
    },
    {
      label: t(E, "4️⃣ Per-chain DP — state = outgoing pin", "4️⃣ 체인별 DP — 상태 = 나가는 pin"),
      color: "#0891b2",
      py: AST_S4_PY, cpp: AST_S4_CPP,
      why: [
        t(E, "Each cell has 'incoming pin' (1 = star arrives from previous cell, 0 = nothing arrives) and 'outgoing pin' (1 = this cell's star moves to next cell). Composite + pin tells us s and constraints.",
            "각 칸엔 '들어오는 pin' (1 = 이전 칸 별 도착, 0 = 안 옴) 과 '나가는 pin' (1 = 이 칸 별이 다음으로 이동). 합성 + pin 이 s 와 제약 결정."),
        t(E, "DP state: state[0] = min stars with outgoing pin 0; state[1] = with outgoing pin 1.",
            "DP 상태: state[0] = 나가는 pin 0 일 때 최소; state[1] = pin 1 일 때."),
        t(E, "Transition rules per composite handle W/G/B cases — see code.",
            "합성별 전이 규칙 — 코드 참고."),
      ],
    },
    {
      label: t(E, "5️⃣ Full code — sum chains, output -1 or total", "5️⃣ 전체 코드 — 체인 합산, -1 또는 총합 출력"),
      color: "#dc2626",
      py: AST_FULL_PY, cpp: AST_FULL_CPP,
      why: [
        t(E, "After DP, take min(state[0], state[1]) as chain min. If INF → -1 for the whole test case.",
            "DP 후 min(state[0], state[1]) 가 체인 최소. INF 면 케이스 전체 -1."),
        t(E, "Sum chain minimums across all chains. Output the total (or -1 if any chain failed).",
            "모든 체인 최소 합산. 총합 출력 (체인 하나라도 실패하면 -1)."),
        t(E, "Total: O(N²) per test case (each cell visited once + O(1) DP per cell). Sum over cases: O(Σ N²) ≤ 10⁷.",
            "총: 케이스당 O(N²) (각 칸 한 번 방문 + O(1) DP). 케이스 합: O(Σ N²) ≤ 10⁷."),
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
