// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 16/16 PASS
//   C++:    16/16 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState, useEffect, useRef } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

/* ================================================================
   RodFitSim — Ch1 의 '4 케이스 정적 표' 를 인터랙티브로 대체
   학생이 직접 cheese 셀 클릭 → 빼고 → 막대 통과 시각 확인
   ================================================================ */
export function RodFitSim({ E }) {
  const N = 3;
  // cells[i] = true → cheese, false → empty
  const [cells, setCells] = useState([true, true, true]);
  // 매번 토글 시 막대 다시 슬라이드 (key 갱신용)
  const [animKey, setAnimKey] = useState(0);

  const toggle = (i) => {
    setCells(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
    setAnimKey(k => k + 1);
  };

  const reset = (fill) => {
    setCells(Array(N).fill(fill));
    setAnimKey(k => k + 1);
  };

  const allEmpty = cells.every(c => !c);
  const firstCheeseIdx = cells.findIndex(c => c);
  const emptyCount = cells.filter(c => !c).length;

  const CELL_SIZE = 52;
  const CELL_GAP = 6;
  const rowWidth = N * CELL_SIZE + (N - 1) * CELL_GAP;
  // 막대 정지 위치 (% 단위): all empty 면 100%, 아니면 첫 cheese 직전까지
  const rodEndPct = allEmpty
    ? 100
    : ((firstCheeseIdx * (CELL_SIZE + CELL_GAP)) / rowWidth) * 100;

  return (
    <div style={{ padding: 12 }}>
      <div style={{
        background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12,
        padding: 16,
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, textAlign: "center", marginBottom: 10, letterSpacing: 0.3 }}>
          {t(E, "👆 Click cells to toggle 🧀 ↔ empty. Watch the rod try to pass.",
                "👆 칸을 누르면 🧀 와 빈 칸이 바뀌어요.\n막대가 지나갈 수 있는지 봐요.")}
        </div>

        {/* Cell row + rod (stacked) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          {/* Cells */}
          <div style={{ display: "flex", gap: CELL_GAP }}>
            {cells.map((cheese, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                style={{
                  width: CELL_SIZE, height: CELL_SIZE,
                  borderRadius: 8,
                  background: cheese ? "#fde047" : "#fff",
                  border: `2.5px solid ${cheese ? "#ca8a04" : "#cbd5e1"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, cursor: "pointer",
                  transition: "all .15s",
                }}
                title={cheese ? t(E, "Click to carve out", "클릭해서 제거") : t(E, "Click to add cheese", "클릭해서 치즈 추가")}
              >
                {cheese ? "🧀" : ""}
              </button>
            ))}
          </div>

          {/* Rod track */}
          <div style={{ position: "relative", width: rowWidth, height: 22 }}>
            {/* track background */}
            <div style={{
              position: "absolute", inset: 0,
              background: "#f1f5f9",
              borderRadius: 4,
              border: `1px dashed ${C.border}`,
            }} />
            {/* rod — width animated by key */}
            <div
              key={animKey}
              style={{
                position: "absolute", top: 4, bottom: 4, left: 0,
                width: `${rodEndPct}%`,
                background: allEmpty
                  ? "linear-gradient(90deg, #6ee7b7, #10b981)"
                  : "linear-gradient(90deg, #94a3b8, #64748b)",
                borderRadius: 3,
                animation: "rodSlide .4s cubic-bezier(.34,1.56,.64,1)",
              }}
            />
          </div>

          {/* Status badge */}
          <div style={{
            padding: "8px 16px", borderRadius: 10,
            background: allEmpty ? "#ecfdf5" : "#fef2f2",
            border: `2px solid ${allEmpty ? "#6ee7b7" : "#fca5a5"}`,
            color: allEmpty ? "#065f46" : "#991b1b",
            fontSize: 14, fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
            display: "flex", alignItems: "center", gap: 8,
            transition: "all .15s",
          }}>
            <span style={{ fontSize: 18 }}>{allEmpty ? "✓" : "✗"}</span>
            <span>
              {allEmpty
                ? t(E, "Rod fits! Row is clear.", "막대 통과! 줄이 비어 있어요.")
                : t(E, `Blocked at cell #${firstCheeseIdx + 1} (🧀 still there).`,
                       `${firstCheeseIdx + 1}번 칸에서 막힘 (🧀 가 아직 있음).`)}
            </span>
          </div>

          {/* Empty counter */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12, color: C.dim, fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
          }}>
            <span>{t(E, "Empty:", "빈 칸:")}</span>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontWeight: 900,
              color: emptyCount === N ? "#10b981" : C.text,
              fontSize: 14,
            }}>{emptyCount} / {N}</span>
            {emptyCount === N && (
              <span style={{ color: "#10b981", fontWeight: 800 }}>
                ← {t(E, "all clear!", "전부 빔!")}
              </span>
            )}
          </div>

          {/* Reset shortcuts */}
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            <button
              onClick={() => reset(true)}
              style={{
                padding: "4px 10px",
                background: "#fffbeb", color: "#92400e",
                border: "1.5px solid #fde68a",
                borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: "pointer",
              }}
            >🧀 {t(E, "All cheese", "전부 치즈")}</button>
            <button
              onClick={() => reset(false)}
              style={{
                padding: "4px 10px",
                background: "#ecfdf5", color: "#065f46",
                border: "1.5px solid #6ee7b7",
                borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: "pointer",
              }}
            >⬜ {t(E, "All empty", "전부 빔")}</button>
          </div>
        </div>
      </div>

      {/* Hint after exploration */}
      <div style={{
        marginTop: 10, padding: "10px 12px",
        background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 8,
        fontSize: 13, color: "#92400e", lineHeight: 1.7, fontWeight: 700, textAlign: "center",
      }}>
        🤔 {t(E,
          "Try removing 1 block, then 2. The rod still gets blocked! Only ALL N empty lets it through.",
          "1 칸만 빼봐요, 2 칸 빼봐요. 막대는 여전히 막혀요! N 칸 *전부* 비어야 통과.")}
      </div>

      <style>{`
        @keyframes rodSlide {
          from { width: 0%; }
        }
      `}</style>
    </div>
  );
}

export function Cube3D({ N, carved, E }) {
  const [rotX, setRotX] = useState(-30);
  const [rotY, setRotY] = useState(40);
  const dragRef = useRef(null);

  const onPD = (e) => {
    e.preventDefault();
    dragRef.current = { x: e.clientX, y: e.clientY, rx: rotX, ry: rotY };
  };

  useEffect(() => {
    const mv = (e) => {
      if (!dragRef.current) return;
      setRotY(dragRef.current.ry + (e.clientX - dragRef.current.x) * 0.5);
      setRotX(Math.max(-80, Math.min(10, dragRef.current.rx - (e.clientY - dragRef.current.y) * 0.5)));
    };
    const up = () => { dragRef.current = null; };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
  }, []);

  const S = 52, gap = 3, unit = S + gap, half = S / 2;
  const total = N * unit;
  const isC = (x, y, z) => carved.some(c => c[0] === x && c[1] === y && c[2] === z);

  const cells = [];
  for (let x = 0; x < N; x++)
    for (let y = 0; y < N; y++)
      for (let z = 0; z < N; z++)
        cells.push([x, y, z]);

  // Label shown on all 6 faces
  const mkLabel = (x, y, z, color) => (
    <span style={{
      fontSize: 10, fontWeight: 700,
      fontFamily: "'JetBrains Mono',monospace",
      color, pointerEvents: "none",
    }}>{x},{y},{z}</span>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 8 }}>
      <div onPointerDown={onPD} style={{
        perspective: 600, width: total * 2.4, height: total * 2.4,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "grab", touchAction: "none",
      }}>
        <div style={{
          width: total, height: total, position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        }}>
          {cells.map(([x, y, z], i) => {
            if (isC(x, y, z)) return null;

            // Mapping: x→CSS-X, y→CSS-Z(depth), z→CSS-Y(up, flipped)
            const cx = x * unit + half;
            const cy = (N - 1 - z) * unit + half;
            const cz = y * unit + half;

            const topC = "#fde047", frC = "#eab308", sideC = "#ca8a04";
            const brd = "1px solid rgba(120,80,0,0.25)", txtC = "#78510a";

            const lbl = mkLabel(x, y, z, txtC);

            // Each face: S×S div, centered on the cube via wrapper translate3d
            // Then offset from center by ±half in the appropriate axis
            const face = (bg, transform) => (
              <div style={{
                position: "absolute", width: S, height: S,
                left: -half, top: -half,
                background: bg, border: brd, borderRadius: 2,
                display: "flex", alignItems: "center", justifyContent: "center",
                backfaceVisibility: "hidden",
                transform,
              }}>{lbl}</div>
            );

            return (
              <div key={i} style={{
                position: "absolute",
                transformStyle: "preserve-3d",
                // Move wrapper to the CENTER of this unit cube in 3D space
                transform: `translate3d(${cx}px, ${cy}px, ${cz}px)`,
              }}>
                {face(frC, `translateZ(${half}px)`)}
                {face(frC, `translateZ(${-half}px) rotateY(180deg)`)}
                {face(topC, `translateY(${-half}px) rotateX(90deg)`)}
                {face(sideC, `translateY(${half}px) rotateX(-90deg)`)}
                {face(sideC, `translateX(${half}px) rotateY(90deg)`)}
                {face(sideC, `translateX(${-half}px) rotateY(-90deg)`)}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ fontSize: 11, color: C.dim }}>{"🖱️"} {E ? "Drag to rotate" : "드래그로 회전"}</div>
    </div>
  );
}

/* --- Brute Force Runner — async per-query + live + stop preserves --- */
export function CheeseBruteRunner({ E }) {
  const [N, setN] = useState(3);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  // 라이브 표시
  const [liveQ, setLiveQ] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const alive = useRef(false);
  const startTimeRef = useRef(0);

  // 시간/숫자 포맷
  const fmtTime = (sec) => {
    if (sec < 1) return `${(sec * 1000).toFixed(0)}ms`;
    if (sec < 60) return `${sec.toFixed(1)}s`;
    if (sec < 3600) return `${(sec / 60).toFixed(1)}${E ? "min" : "분"}`;
    if (sec < 86400) return `${(sec / 3600).toFixed(1)}${E ? "h" : "시간"}`;
    return `${(sec / 86400).toFixed(1)}${E ? "d" : "일"}`;
  };
  // USACO 추정: 쿼리당 O(N³) × Q
  const estimateUSACO = (N, Q) => {
    const opsPerQuery = 3 * N * N * N;       // 3 방향 × N² 줄 × N 칸
    const totalOps = opsPerQuery * Q;
    return totalOps / 1e8;                   // C++ 1억 ops/sec
  };

  const run = () => {
    if (N < 2 || N > 50) return;
    setRunning(true); setResult(null); setProgress(0);
    setLiveQ(0); setLiveCount(0);
    alive.current = true;
    startTimeRef.current = performance.now();

    // Q = 모든 셀의 30% 정도 제거 (작은 N 에서도 의미 있고, 큰 N 에서는 충분히 느림)
    const Q = Math.min(Math.max(Math.floor(N * N * N * 0.3), 5), 200);

    // 모든 셀 셔플
    const allCells = [];
    for (let x = 0; x < N; x++)
      for (let y = 0; y < N; y++)
        for (let z = 0; z < N; z++) allCells.push([x,y,z]);
    for (let i = allCells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCells[i], allCells[j]] = [allCells[j], allCells[i]];
    }

    const answers = [];
    const isC = new Set();
    let q = 0;

    const finish = (partial) => {
      const elapsed = performance.now() - startTimeRef.current;
      setRunning(false);
      setResult({
        N, Q, completedQ: q, answers,
        lastAnswer: answers.length > 0 ? answers[answers.length - 1] : 0,
        elapsedMs: elapsed, partial,
      });
      alive.current = false;
    };

    const tick = () => {
      if (!alive.current) { finish(true); return; }

      // 한 쿼리 처리 (실제 brute 일 작업)
      const [x,y,z] = allCells[q];
      isC.add(`${x},${y},${z}`);
      let count = 0;
      for (let a = 0; a < N; a++)
        for (let b = 0; b < N; b++) {
          let ok = true;
          for (let c = 0; c < N; c++) if (!isC.has(`${a},${b},${c}`)) { ok = false; break; }
          if (ok) count++;
        }
      for (let b = 0; b < N; b++)
        for (let c = 0; c < N; c++) {
          let ok = true;
          for (let a = 0; a < N; a++) if (!isC.has(`${a},${b},${c}`)) { ok = false; break; }
          if (ok) count++;
        }
      for (let a = 0; a < N; a++)
        for (let c = 0; c < N; c++) {
          let ok = true;
          for (let b = 0; b < N; b++) if (!isC.has(`${a},${b},${c}`)) { ok = false; break; }
          if (ok) count++;
        }
      answers.push(count);
      q++;
      setLiveQ(q); setLiveCount(count); setProgress(Math.floor(q / Q * 100));

      if (q >= Q) { finish(false); return; }
      // 쿼리 사이 16ms 딜레이 — 학생이 진행 체감
      setTimeout(tick, 16);
    };
    setTimeout(tick, 50);
  };
  const stop = () => { alive.current = false; };

  return (
    <div style={{ padding: "12px 8px" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.dim }}>N =</span>
        <input type="number" min={2} max={50} value={N}
          onChange={e => { setN(+e.target.value); setResult(null); }}
          disabled={running}
          style={{ width: 60, padding: "6px 8px", borderRadius: 8, border: `2px solid ${C.border}`,
            fontSize: 16, fontWeight: 800, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }} />
        <button
          onClick={running ? stop : run}
          disabled={!running && (N < 2 || N > 50)}
          style={{
            padding: "8px 20px", borderRadius: 10, border: "none",
            background: running ? "#dc2626" : "linear-gradient(135deg,#fbbf24,#d97706)",
            color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer",
          }}>
          {running ? (E ? "⏹ Stop" : "⏹ 중지") : (E ? "▶ Run Brute" : "▶ 브루트 실행")}
        </button>
      </div>

      {N > 20 && <div style={{ textAlign: "center", fontSize: 12, color: C.carry, fontWeight: 700, marginBottom: 8 }}>
        {E ? "⚠️ N>20 will be slow — that's the point! Try Stop midway." : "⚠️ N>20 이면 느려져 — 그게 포인트! 중간에 Stop 눌러봐."}
      </div>}

      {/* 실행 중 라이브 표시 */}
      {running && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "#d97706", borderRadius: 4, width: `${progress}%`, transition: "width .1s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.dim, fontWeight: 700 }}>
            <span>{t(E, "query", "쿼리")} <span style={{ color: "#d97706", fontWeight: 900 }}>{liveQ}</span></span>
            <span>{t(E, "current count", "현재 답")}: <span style={{ color: "#d97706", fontWeight: 900 }}>{liveCount}</span></span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {/* 결과 */}
      {result && (
        <div>
          <div style={{ textAlign: "center", padding: "12px 0", marginBottom: 10 }}>
            {result.partial ? (
              <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 800, letterSpacing: 0.5 }}>
                ⏸ {t(E, `STOPPED at query ${result.completedQ} of ${result.Q}`,
                       `${result.completedQ} / ${result.Q} 번째 쿼리에서 중지`)}
              </div>
            ) : (
              <div style={{ fontSize: 11, color: "#10b981", fontWeight: 800 }}>
                ✓ {t(E, `${result.Q} queries completed`, `${result.Q} 쿼리 전부 완료`)}
              </div>
            )}
            <div style={{ fontSize: 32, fontWeight: 900, color: "#d97706", fontFamily: "'JetBrains Mono',monospace", marginTop: 4 }}>
              {result.lastAnswer}
            </div>
            <div style={{ fontSize: 11, color: C.dim }}>{t(E, "last answer (rods that fit)", "마지막 답 (들어가는 막대 수)")}</div>
          </div>

          {/* 실제 브라우저 시간 */}
          <div style={{
            background: "#fff", border: `2px solid ${result.elapsedMs > 500 ? "#dc2626" : "#10b981"}`, borderRadius: 10,
            padding: "10px 14px", marginBottom: 10,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.dim, letterSpacing: 0.5 }}>
                ⏱️ {t(E, "BROWSER TIME", "브라우저 측정 시간")}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: result.elapsedMs > 500 ? "#dc2626" : "#10b981", fontFamily: "'JetBrains Mono',monospace" }}>
                {fmtTime(result.elapsedMs / 1000)}
              </div>
            </div>
            <div style={{ fontSize: 10, color: C.dim, textAlign: "right", lineHeight: 1.5, maxWidth: 180 }}>
              {t(E, "Includes 16ms/query animation. Pure brute is faster but still O(QN³).",
                  "한 번 물을 때마다 16ms 짜리 움직임이 들어 있어요.\n움직임을 빼면 더 빠르지만, 그래도 O(QN³) 이에요.")}
            </div>
          </div>

          {/* USACO 추정 */}
          <div style={{
            background: "linear-gradient(135deg, #fef2f2, #fff)", border: `2px solid #dc2626`, borderRadius: 10,
            padding: "10px 14px", marginBottom: 10,
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#dc2626", letterSpacing: 0.5, marginBottom: 6 }}>
              🏆 {t(E, "ON USACO JUDGE — REAL ESTIMATE", "USACO 채점기 — 실제 추정")}
            </div>
            <table style={{ width: "100%", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  { N: result.N, Q: result.Q, label: t(E, "your run", "지금 실행") },
                  { N: 100, Q: 200000, label: "N=100 max Q" },
                  { N: 1000, Q: 200000, label: "N=1000 (max!)" },
                ].map((row, i) => {
                  const sec = estimateUSACO(row.N, row.Q);
                  const tle = sec > 2;
                  return (
                    <tr key={i} style={{ borderTop: i > 0 ? "1px solid #fee2e2" : "none" }}>
                      <td style={{ padding: "4px 0", fontWeight: 700, color: C.dim }}>N={row.N} · Q={row.Q.toLocaleString()}</td>
                      <td style={{ padding: "4px 6px", fontSize: 10, color: C.dim }}>{row.label}</td>
                      <td style={{ padding: "4px 0", textAlign: "right", fontWeight: 800, color: tle ? "#dc2626" : "#10b981" }}>
                        {fmtTime(sec)}
                      </td>
                      <td style={{ padding: "4px 0 4px 6px", textAlign: "right", fontWeight: 800, color: tle ? "#dc2626" : "#10b981", minWidth: 32 }}>
                        {tle ? "TLE" : "✓"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ marginTop: 6, fontSize: 10, color: C.dim, lineHeight: 1.5 }}>
              {t(E,
                "Estimate: 3N³ ops per query × Q / 10⁸ ops/sec (C++).",
                "한 번 물을 때 3N³ 번 계산하고, 그게 Q 번이에요.\n1초에 1억 번 계산하는 C++ 기준으로 어림잡은 값이에요.")}
            </div>
          </div>

          {result.partial && (
            <div style={{ padding: "10px 12px", background: C.carryBg, borderRadius: 8, fontSize: 12, color: C.carry, fontWeight: 700, textAlign: "center" }}>
              {t(E,
                "Felt slow? On the real judge it'd be way slower. We need a smarter approach!",
                "느렸지? 실제 채점기에선 훨씬 느려. 더 똑똑한 방법 필요!")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* --- Interactive Simulator --- */
export function CheeseSim2({ E }) {
  const N = 2;
  // 샘플 input: 2 5 / 0 0 0 / 1 1 1 / 0 1 0 / 1 0 0 / 1 1 0
  const order = [[0,0,0],[1,1,1],[0,1,0],[1,0,0],[1,1,0]];
  const expectedAns = [0,0,1,2,5];   // 샘플 output

  // mkGrid: [N x N], 시작값 N (그 줄에 남은 블록 수)
  const mkGrid = () => Array.from({length:N}, ()=>Array(N).fill(N));
  const initState = () => ({
    step: 0, xy: mkGrid(), yz: mkGrid(), xz: mkGrid(),
    total: 0, history: [], carved: [], lastCarved: null,
    lastTouched: { xy: null, yz: null, xz: null },
  });

  const [state, setState] = useState(initState);

  const doCarve = () => {
    if (state.step >= order.length) return;
    const [x,y,z] = order[state.step];
    const xy = state.xy.map(r=>[...r]);
    const yz = state.yz.map(r=>[...r]);
    const xz = state.xz.map(r=>[...r]);
    let newHits = 0;
    xy[x][y] -= 1; if (xy[x][y] === 0) newHits++;
    yz[y][z] -= 1; if (yz[y][z] === 0) newHits++;
    xz[x][z] -= 1; if (xz[x][z] === 0) newHits++;
    const newTotal = state.total + newHits;
    setState({
      step: state.step + 1, xy, yz, xz, total: newTotal,
      history: [...state.history, { coord: [x,y,z], hits: newHits, total: newTotal }],
      carved: [...state.carved, [x,y,z]], lastCarved: [x,y,z],
      lastTouched: { xy: [x, y], yz: [y, z], xz: [x, z] },
    });
  };

  const reset = () => setState(initState());
  const cur = state.step < order.length ? order[state.step] : null;
  const matches = state.step > 0 && state.total === expectedAns[state.step - 1];

  // 미니 격자 — N×N counter visualization
  const renderGrid = (grid, label, axis, color, touched) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 10, fontWeight: 800, color, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
      <div style={{ display: "inline-grid", gridTemplateColumns: `repeat(${N}, 28px)`, gap: 2 }}>
        {grid.flatMap((row, i) => row.map((v, j) => {
          const isTouch = touched && touched[0] === i && touched[1] === j;
          const isHit  = v === 0;
          return (
            <div key={`${i}-${j}`} style={{
              width: 28, height: 28, borderRadius: 5,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 800,
              fontFamily: "'JetBrains Mono',monospace",
              background: isHit ? "#10b98120" : (isTouch ? `${color}30` : "#f8f9fc"),
              border: `1.5px solid ${isHit ? "#10b981" : (isTouch ? color : C.border)}`,
              color: isHit ? "#10b981" : (isTouch ? color : C.text),
              transition: "all .2s",
            }}>{v}</div>
          );
        }))}
      </div>
      <div style={{ fontSize: 9, color: C.dim, marginTop: 3, fontFamily: "'JetBrains Mono',monospace" }}>{axis}</div>
    </div>
  );

  return (
    <div style={{ padding: "12px 8px" }}>
      <Cube3D N={N} carved={state.carved} E={E} />

      {/* Answer + Sample I/O 매칭 표시 */}
      {state.step > 0 && (
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: C.dim, fontWeight: 600, marginBottom: 2 }}>
            {E ? "Rods that fit:" : "들어갈 수 있는 막대:"}
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: matches ? "#10b981" : C.accent }}>
            {state.total}
          </div>
          {matches && (
            <div style={{ fontSize: 11, color: "#10b981", fontWeight: 700, marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>
              ✓ {t(E, `matches sample output line ${state.step}`, `샘플 출력 ${state.step}번째 줄과 일치`)}
            </div>
          )}
        </div>
      )}

      {/* 카운터 3 격자 — 코드의 xy/yz/xz 값을 눈으로 */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 8px", marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.dim, textAlign: "center", marginBottom: 8, letterSpacing: 0.5 }}>
          {t(E, "ROW BLOCKS REMAINING (3 directions)", "각 줄의 남은 블록 수 (3 방향)")}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {renderGrid(state.xy, "xy", "z-axis", "#ef4444", state.lastTouched.xy)}
          {renderGrid(state.yz, "yz", "x-axis", "#22c55e", state.lastTouched.yz)}
          {renderGrid(state.xz, "xz", "y-axis", "#3b82f6", state.lastTouched.xz)}
        </div>
        <div style={{ fontSize: 10, color: C.dim, textAlign: "center", marginTop: 6, lineHeight: 1.5 }}>
          {t(E,
            "Each cell = blocks left in that row. Reaches 0 → row is empty → +1 to total!",
            "각 칸 = 그 줄에 남은 블록 수. 0이 되면 → 줄이 빔 → 총합 +1!")}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 14 }}>
        {cur && (
          <div style={{ fontSize: 14, color: C.text, marginBottom: 8, fontWeight: 700 }}>
            {state.step + 1}/5: ({cur[0]},{cur[1]},{cur[2]}) {E ? "to remove" : "제거 예정"}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {state.step < order.length ? (
            <button onClick={doCarve} style={{
              padding: "12px 28px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg,#fbbf24,#d97706)",
              color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer",
              boxShadow: "0 3px 12px #fbbf2440",
            }}>{"🧀"} {E ? "Carve!" : "제거!"}</button>
          ) : (
            <div style={{ fontSize: 16, fontWeight: 800, color: "#10b981" }}>
              {"🎉"} {E ? "All 5 outputs match the sample!" : "5개 전부 샘플 출력과 일치!"}
            </div>
          )}
          <button onClick={reset} style={{
            padding: "12px 16px", borderRadius: 10,
            border: `2px solid ${C.border}`, background: C.card,
            fontSize: 13, fontWeight: 700, cursor: "pointer", color: C.dim,
          }}>{"↻"}</button>
        </div>
      </div>
    </div>
  );
}


/* ================================================================
   ProgressiveCode — 인터랙티브 코드 뷰어
   섹션 버튼 + Python/C++ 토글 + "왜 이렇게?" + PDF 다운로드 (위젯 내부)
   ================================================================ */
/* ProgressiveCode — 수직 스택 (위→아래 step by step). lang prop from header. */
export function CheeseProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#7c5cfc" />;
}


/* ================================================================
   getCheeseBruteSections — 첫 아이디어 (3D 배열 + 매 query 다 검사)
   ================================================================ */

const CB_INPUT_PY = (E) => [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, Q = map(int, input().split())",
  "",
  t(E, "# 3D cube: cheese[x][y][z] = True means a block is there",
       "# 3D 큐브: cheese[x][y][z] = True 면 거기 블록 있음"),
  "cheese = [[[True]*N for _ in range(N)] for _ in range(N)]",
];
const CB_INPUT_CPP = (E) => [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "",
  t(E, "    // 3D cube: cheese[x][y][z] = true means a block is there",
       "    // 3D 큐브: cheese[x][y][z] = true 면 거기 블록 있음"),
  "    vector<vector<vector<bool>>> cheese(N,",
  "        vector<vector<bool>>(N, vector<bool>(N, true)));",
];

const CB_CARVE_PY = (E) => [
  "for _ in range(Q):",
  "    x, y, z = map(int, input().split())",
  t(E, "    cheese[x][y][z] = False   # remove the block",
       "    cheese[x][y][z] = False   # 블록 빼기"),
  "    count = 0",
];
const CB_CARVE_CPP = (E) => [
  "    for (int q = 0; q < Q; q++) {",
  "        int x, y, z;",
  "        cin >> x >> y >> z;",
  t(E, "        cheese[x][y][z] = false;   // remove the block",
       "        cheese[x][y][z] = false;   // 블록 빼기"),
  "        int count = 0;",
];

const CB_SCAN_PY = (E) => [
  t(E, "    # 🐌 3 dirs × N² rows × N cells = O(N³) per query — TLE source!",
       "    # 🐌 3 방향 × N² 줄 × N 칸 = O(N³) per query — TLE 원인!"),
  "",
  t(E, "    # z-direction: (x,y) fixed, z varies",
       "    # z-방향: (x,y) 고정, z 변함"),
  "    for x_ in range(N):",
  "        for y_ in range(N):",
  "            if all(not cheese[x_][y_][z_] for z_ in range(N)):",
  "                count += 1",
  "",
  t(E, "    # x-direction: (y,z) fixed, x varies",
       "    # x-방향: (y,z) 고정, x 변함"),
  "    for y_ in range(N):",
  "        for z_ in range(N):",
  "            if all(not cheese[x_][y_][z_] for x_ in range(N)):",
  "                count += 1",
  "",
  t(E, "    # y-direction: (x,z) fixed, y varies",
       "    # y-방향: (x,z) 고정, y 변함"),
  "    for x_ in range(N):",
  "        for z_ in range(N):",
  "            if all(not cheese[x_][y_][z_] for y_ in range(N)):",
  "                count += 1",
];
const CB_SCAN_CPP = (E) => [
  t(E, "        // 🐌 3 dirs × N² rows × N cells = O(N³) per query — TLE source!",
       "        // 🐌 3 방향 × N² 줄 × N 칸 = O(N³) per query — TLE 원인!"),
  "",
  t(E, "        // z-direction: (x,y) fixed, z varies",
       "        // z-방향: (x,y) 고정, z 변함"),
  "        for (int x_ = 0; x_ < N; x_++)",
  "            for (int y_ = 0; y_ < N; y_++) {",
  "                bool empty = true;",
  "                for (int z_ = 0; z_ < N; z_++)",
  "                    if (cheese[x_][y_][z_]) { empty = false; break; }",
  "                if (empty) count++;",
  "            }",
  "",
  t(E, "        // x-direction, y-direction same (omitted — same pattern repeats)",
       "        // x-방향, y-방향도 똑같이 (생략 — 같은 패턴 반복)"),
  "        // ...",
];

const CB_OUTPUT_PY = [
  "    print(count)",
];
const CB_OUTPUT_CPP = [
  "        cout << count << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getCheeseBruteSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + 3D Cube Init", "📦 1. 입력 받고 3D 큐브 만들기"),
      color: "#94a3b8",
      py: CB_INPUT_PY(E), cpp: CB_INPUT_CPP(E),
      why: [
        t(E, "N = cube size, Q = number of carve queries.", "N 은 큐브 크기이고, Q 는 블록을 빼는 횟수예요."),
        t(E, "3D array of bool: cheese[x][y][z] tracks if block exists. All start True.", "cheese[x][y][z] 는 그 자리에 블록이 있는지를 담아요.\n처음엔 모두 True 예요."),
      ],
      pyOnly: [
        t(E, "Triple list comprehension creates N×N×N array. Memory: N³ booleans.",
            "목록 만들기를 세 번 겹쳐서 N×N×N 칸을 만들어요.\n메모리는 참/거짓 N³ 개만큼 써요."),
      ],
      cppOnly: [
        t(E, "vector<vector<vector<bool>>> — packed 1 bit/bool, but 2D would be enough if we use flags differently.",
            "vector<vector<vector<bool>>> — bool 당 1 비트 packed. 2D 로도 가능."),
        t(E, "N=1000 → 10⁹ bits = 125MB. Tight! May need to use vector<vector<int>> or different structure.",
            "N=1000 → 10⁹ 비트 = 125MB. 빡빡함! vector<vector<int>> 등 다른 구조 필요할 수도."),
      ],
    },
    {
      label: t(E, "🍰 2. Per-Query: Carve One Block", "🍰 2. 한 번 물을 때마다 블록 하나 빼기"),
      color: "#0891b2",
      py: CB_CARVE_PY(E), cpp: CB_CARVE_CPP(E),
      why: [
        t(E, "Read (x, y, z) for the block to carve. Set cheese[x][y][z] = false.", "뺄 블록의 (x, y, z) 를 읽고\ncheese[x][y][z] 를 false 로 바꿔요."),
        t(E, "Reset count = 0 because we're recomputing from scratch every query (the brute approach).", "count 를 0 으로 되돌려요.\n물을 때마다 처음부터 다시 세는 게 이 느린 방법의 방식이에요."),
        t(E, "This is the WASTE — only 1 block changed, but we throw away all previous knowledge.", "여기가 낭비예요.\n블록 하나만 바뀌었는데 앞에서 안 것을 다 버려요."),
      ],
    },
    {
      label: t(E, "🐌 3. Brute Scan (THE TLE)", "🐌 3. 전수 검사 (TLE 원인!)"),
      color: "#dc2626",
      py: CB_SCAN_PY(E), cpp: CB_SCAN_CPP(E),
      why: [
        t(E, "For each query, scan 3 × N² rows × N cells each → 3N³ ops per query.",
            "한 번 물을 때 3 × N² 줄을 보고, 줄마다 N 칸을 봐요.\n그래서 한 번에 3N³ 번 계산해요."),
        t(E, "Q=200K, N=1000 → 6×10¹⁴ ops → ~70 days. Need to skip the inner-N scan.",
            "Q=20만, N=1000 이면 6×10¹⁴ 번이라 약 70 일이 걸려요.\n줄 안쪽을 N 칸씩 훑는 것을 없애야 해요."),
      ],
      pyOnly: [
        t(E, "all(not cheese[...] for z_ in range(N)) — Python idiom for 'all False'.", "all(not cheese[...] for z_ in range(N)) — '모두 False' 의 Python idiom."),
      ],
      cppOnly: [
        t(E, "Manual inner loop with early break — slightly faster than scanning all N cells if first one is non-empty.", "안쪽 반복을 손으로 쓰고 중간에 끊어요.\n첫 칸이 안 비었으면 N 칸을 다 볼 필요가 없어요."),
      ],
    },
    {
      label: t(E, "📤 4. Output", "📤 4. 출력"),
      color: "#94a3b8",
      py: CB_OUTPUT_PY, cpp: CB_OUTPUT_CPP,
      why: [
        t(E, "Output count after each carve — problem requires Q lines, one per query.", "블록을 뺄 때마다 count 를 출력해요.\n문제가 한 번에 한 줄씩, 모두 Q 줄을 내라고 했어요."),
      ],
    },
  ];
}


/* ================================================================
   getCheeseSections — Python/C++ 코드 + 설명 (인앱 + PDF 공용)
   ================================================================ */

const CHEESE_INPUT_PY = [
  "import sys",
  "from collections import defaultdict",
  "input = sys.stdin.readline",
  "",
  "N, Q = map(int, input().split())",
];
const CHEESE_INPUT_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
];

const CHEESE_COUNTERS_PY = (E) => [
  t(E, "xy = defaultdict(int)  # z-direction: (x,y) pair",
       "xy = defaultdict(int)  # z-방향: (x,y) 쌍"),
  t(E, "yz = defaultdict(int)  # x-direction: (y,z) pair",
       "yz = defaultdict(int)  # x-방향: (y,z) 쌍"),
  t(E, "xz = defaultdict(int)  # y-direction: (x,z) pair",
       "xz = defaultdict(int)  # y-방향: (x,z) 쌍"),
];
const CHEESE_COUNTERS_CPP = (E) => [
  t(E, "    // N×N grids — counters per row in z/x/y directions",
       "    // N×N 격자 — z/x/y 방향 줄별 카운터"),
  "    vector<vector<int>> xy(N, vector<int>(N, 0));",
  "    vector<vector<int>> yz(N, vector<int>(N, 0));",
  "    vector<vector<int>> xz(N, vector<int>(N, 0));",
];

const CHEESE_LOOP_PY = [
  "count = 0",
  "for _ in range(Q):",
  "    x, y, z = map(int, input().split())",
  "",
  "    # z-direction row: (x, y)",
  "    xy[(x, y)] += 1",
  "    if xy[(x, y)] == N:",
  "        count += 1",
  "",
  "    # x-direction row: (y, z)",
  "    yz[(y, z)] += 1",
  "    if yz[(y, z)] == N:",
  "        count += 1",
  "",
  "    # y-direction row: (x, z)",
  "    xz[(x, z)] += 1",
  "    if xz[(x, z)] == N:",
  "        count += 1",
  "",
  "    print(count)",
];
const CHEESE_LOOP_CPP = [
  "    int count = 0;",
  "    for (int q = 0; q < Q; q++) {",
  "        int x, y, z;",
  "        cin >> x >> y >> z;",
  "",
  "        // z-direction row: (x, y)",
  "        xy[x][y]++;",
  "        if (xy[x][y] == N) {",
  "            count++;",
  "        }",
  "",
  "        // x-direction row: (y, z)",
  "        yz[y][z]++;",
  "        if (yz[y][z] == N) {",
  "            count++;",
  "        }",
  "",
  "        // y-direction row: (x, z)",
  "        xz[x][z]++;",
  "        if (xz[x][z] == N) {",
  "            count++;",
  "        }",
  "",
  "        cout << count << \"\\n\";",
  "    }",
];

const CHEESE_FULL_PY = (E) => [
  ...CHEESE_INPUT_PY,
  "",
  ...CHEESE_COUNTERS_PY(E),
  "",
  ...CHEESE_LOOP_PY,
];
const CHEESE_FULL_CPP = (E) => [
  ...CHEESE_INPUT_CPP,
  "",
  ...CHEESE_COUNTERS_CPP(E),
  "",
  ...CHEESE_LOOP_CPP,
  "    return 0;",
  "}",
];

export function getCheeseSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: "#d97706",
      py: CHEESE_INPUT_PY, cpp: CHEESE_INPUT_CPP,
      why: [
        t(E,
          "N = cube size, Q = number of removals.",
          "N = 큐브 크기, Q = 제거 횟수."),
        t(E,
          "Python uses sys.stdin.readline to read many lines fast (Q can be 200,000).",
          "Python 은 sys.stdin.readline 로 빠르게 읽기 (Q 가 20 만까지 갈 수 있음)."),
      ],
    },
    {
      label: t(E, "📊 2. Three Counters", "📊 2. 세는 숫자 3 개"),
      color: "#0891b2",
      py: CHEESE_COUNTERS_PY(E), cpp: CHEESE_COUNTERS_CPP(E),
      why: [
        t(E, "One counter per row direction. xy → z-axis rows. yz → x-axis. xz → y-axis.",
            "방향당 세는 숫자 1 개. xy → z-축 줄. yz → x-축. xz → y-축."),
        t(E, "Why three? A block sits on exactly 3 rows (one per direction). Update = 3 increments.",
            "왜 3 개? 블록 1 개가 정확히 3 줄에 걸침 (방향당 1). 업데이트 = +1 세 번."),
      ],
      pyOnly: [
        t(E, "defaultdict(int): keys auto-init to 0 — clean syntax 'mydict[(x,y)] += 1'.",
            "defaultdict(int) 는 없는 자리를 저절로 0 으로 만들어요.\n그래서 mydict[(x,y)] += 1 을 바로 쓸 수 있어요."),
        t(E, "Tuple keys (x,y) — Python dicts handle tuple keys natively.",
            "튜플 키 (x,y) — Python dict 가 튜플 키 native 지원."),
      ],
      cppOnly: [
        t(E, "2D vector(N, vector<int>(N, 0)) — fixed N×N grid, faster than map<pair<int,int>>.",
            "2D vector(N, vector<int>(N, 0)) — 고정 N×N 격자, map<pair<int,int>> 보다 빠름."),
        t(E, "Memory: N=1000 → 1M ints × 3 = 12MB. Fits comfortably.",
            "N=1000 이면 정수 100만 개짜리 표가 3개라 12MB 예요.\n넉넉하게 들어가요."),
      ],
    },
    {
      label: t(E, "🔄 3. Update Loop", "🔄 3. 숫자를 고치는 반복"),
      color: "#16a34a",
      py: CHEESE_LOOP_PY, cpp: CHEESE_LOOP_CPP,
      why: [
        t(E, "Per query (x,y,z): bump 3 counters; if any just hit N, that row is now fully open → count += 1.",
            "(x,y,z) 가 올 때마다 세는 숫자 3개를 1씩 올려요.\n그중 하나가 막 N 이 됐다면 그 줄이 뚫린 거예요.\n그럴 때 count 를 1 올려요."),
        t(E, "Print count after EACH query (problem requires per-step answer). O(1) per query.",
            "한 번 물을 때마다 count 를 출력해요. 문제가 그렇게 하라고 했어요.\n한 번에 O(1) 이에요."),
      ],
      pyOnly: [
        t(E, "Three explicit blocks (one per direction) — increment first, then check == N. Easy to read.",
            "방향당 한 블록씩 명시 — 먼저 +1, 그 다음 == N 체크. 읽기 쉬움."),
      ],
      cppOnly: [
        t(E, "Three explicit blocks (one per direction) — increment first, then check == N.",
            "방향당 한 블록씩 명시 — 먼저 +1, 그 다음 == N 체크."),
        t(E, "Plain int for-loop with q counter — no while(Q--) tricks needed.",
            "평범한 int for 반복이에요. q 로 세요.\nwhile(Q--) 같은 줄임 표현은 안 써요."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#d97706",
      py: CHEESE_FULL_PY(E), cpp: CHEESE_FULL_CPP(E),
      why: [
        t(E,
          "Per query: O(1) — three counter updates and three N-checks. Total: O(Q).",
          "한 번에 O(1) 이에요 — 숫자를 3번 올리고 3번 확인해요.\n다 합쳐도 O(Q) 예요."),
        t(E,
          "Brute was O(QN³). For N=1000, Q=200,000: brute = 2×10¹⁴ ops. Smart = 6×10⁵. Speedup ~10⁹×.",
          "느린 방법은 O(QN³) 이에요.\nN=1000, Q=20만이면 느린 쪽이 2×10¹⁴ 번, 이 방법은 6×10⁵ 번이에요.\n10억 배쯤 차이가 나요."),
        t(E,
          "Insight: 'don't recompute everything — only track what changes'. The 3-counters trick.",
          "핵심은 하나예요.\n전부 다시 세지 말고, 바뀌는 것만 따라가요.\n한 번 뺄 때 세는 숫자 3개만 고치면 돼요."),
      ],
    },
  ];
}


/* ================================================================
   downloadCheesePDF — 종합 풀이 노트
   ================================================================ */

const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","to_string","size","include","vector","unordered_map","map","pair"];

function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;

  let comment = "";
  let rest = line;
  if (lang === "py") {
    const i = rest.indexOf("#");
    if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); }
  } else {
    const i = rest.indexOf("//");
    if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); }
  }

  let out = "";
  let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) {
      out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`;
      work = work.slice(ppm[0].length);
    }
  }

  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok))
      out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok))
      out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok))
      out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else
      out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment)
    out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}

function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadCheesePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) {
    alert(t(E, "Pop-up blocked. Allow pop-ups and try again.", "팝업 차단됨. 허용 후 재시도."));
    return;
  }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Cheese Block — Full Study Guide", "🧀 Cheese Block — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);

  const BRUTE_PY = [
    "import sys",
    "input = sys.stdin.readline",
    "",
    "N, Q = map(int, input().split())",
    "cheese = [[[True]*N for _ in range(N)] for _ in range(N)]",
    "",
    "for _ in range(Q):",
    "    x, y, z = map(int, input().split())",
    "    cheese[x][y][z] = False",
    "    count = 0",
    t(E, "    # Check every N² rows × N cells each → O(N³) per query",
         "    # 모든 N² 줄을 N 칸씩 확인 → O(N³) per query"),
    "    for a in range(N):",
    "        for b in range(N):",
    "            if all(not cheese[a][b][c] for c in range(N)):",
    "                count += 1",
    "    for b in range(N):",
    "        for c in range(N):",
    "            if all(not cheese[a][b][c] for a in range(N)):",
    "                count += 1",
    "    for a in range(N):",
    "        for c in range(N):",
    "            if all(not cheese[a][b][c] for b in range(N)):",
    "                count += 1",
    "    print(count)",
  ];
  const BRUTE_CPP = [
    "#include <iostream>",
    "#include <vector>",
    "using namespace std;",
    "",
    "int main() {",
    "    int N, Q;",
    "    cin >> N >> Q;",
    "    vector<vector<vector<bool>>> cheese(N, vector<vector<bool>>(N, vector<bool>(N, true)));",
    "",
    "    for (int q = 0; q < Q; q++) {",
    "        int x, y, z;",
    "        cin >> x >> y >> z;",
    "        cheese[x][y][z] = false;",
    "        int count = 0;",
    "        // O(N³) per query",
    "        for (int a = 0; a < N; a++) {",
    "            for (int b = 0; b < N; b++) {",
    "                bool ok = true;",
    "                for (int c = 0; c < N; c++) {",
    "                    if (cheese[a][b][c]) {",
    "                        ok = false;",
    "                        break;",
    "                    }",
    "                }",
    "                if (ok) {",
    "                    count++;",
    "                }",
    "            }",
    "        }",
    "        // ... + same for x-direction and y-direction",
    "        cout << count << \"\\n\";",
    "    }",
    "}",
  ];
  const bruteCode = lang === "py" ? BRUTE_PY : BRUTE_CPP;

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
         color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: #d97706; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px;
       background: #d97706; color: white; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: #d97706; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px;
         margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: #d97706; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  .why li { margin-bottom: 3px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px;
        font-family: "JetBrains Mono", Consolas, monospace; font-size: 11.5px;
        overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid;
        margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: #d97706; color: white;
              padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px;
              vertical-align: middle; font-weight: 800; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 12px;
          page-break-inside: avoid; }
  th, td { border: 1px solid #e5e7eb; padding: 5px 8px; text-align: left; }
  th { background: #fef3c7; color: #92400e; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px;
          margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 8px;
         padding: 10px 12px; margin: 8px 0; }
  .box.ok { background: #ecfdf5; border-color: #6ee7b7; }
  .box.no { background: #fef2f2; border-color: #fca5a5; }
  .box.warn { background: #fef3c7; border-color: #fbbf24; }
  code.inline { background: #f1f5f9; padding: 1px 5px; border-radius: 3px;
                font-family: "JetBrains Mono", monospace; font-size: 12px; color: #d97706; }
  .toc { background: #fffbeb; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; }
  .toc b { color: #d97706; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>

<div class="hint">📄 ${t(E,
  "In the print dialog, choose 'Save as PDF' as the destination to download.",
  "인쇄 창에서 '대상' / 'Destination' 을 'PDF로 저장' / 'Save as PDF' 로 선택하면 다운로드됩니다.")}</div>

<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2024 December Bronze · ${t(E, "Self-contained walkthrough — no app needed", "독립 학습용 — 앱 없이 처음부터 이해 가능")}</div>

<div class="toc">
  <b>${t(E, "Contents", "목차")}:</b>
  1. ${t(E, "Problem", "문제")} ·
  2. ${t(E, "Worked Example", "예제 풀이")} ·
  3. ${t(E, "Brute Force", "브루트 포스")} ·
  4. ${t(E, "Pattern (Counter Trick)", "'줄마다 세기'")} ·
  5. ${t(E, "Optimal Code", "제일 빠른 코드")}
</div>

<!-- 1. 문제 -->
<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "An N×N×N cheese cube. Q removals — each removes one block at (x,y,z). After each removal, count how many 1×1×N rows are now completely empty (a 1×1×N rod can fit through).",
  "N×N×N 치즈 큐브. Q 번 제거 — 각 제거는 (x,y,z) 의 블록 하나를 뺌. 제거 후, 1×1×N 줄 중 전부 비어 있는 줄이 몇 개인지 (막대가 통과할 수 있는 줄) 출력.")}</p>

<div class="box">
  <b>📏 ${t(E, "Rod condition", "막대 조건")}</b>:
  ${t(E, "A row of N cells must be ENTIRELY empty. Even one block left = no fit.",
        "N 칸 한 줄이 전부 비어야 함. 1 개라도 남으면 못 들어감.")}
</div>

<h3>${t(E, "How many rows are there?", "줄은 몇 개?")}</h3>
<p>${t(E, "3 directions × N² rows each = 3N² total rows.", "3 방향 × 방향당 N² 줄 = 총 3N² 줄.")}</p>
<table>
  <tr><th>${t(E, "Direction", "방향")}</th><th>${t(E, "Fixed", "고정 자리")}</th><th>${t(E, "Varies", "변화 자리")}</th><th>${t(E, "Count", "개수")}</th></tr>
  <tr><td>z-axis</td><td>(x, y)</td><td>z = 0..N-1</td><td>N²</td></tr>
  <tr><td>x-axis</td><td>(y, z)</td><td>x = 0..N-1</td><td>N²</td></tr>
  <tr><td>y-axis</td><td>(x, z)</td><td>y = 0..N-1</td><td>N²</td></tr>
</table>

<h3>${t(E, "Constraints", "제약")}</h3>
<p>N ≤ 1000, Q ≤ 200,000. ${t(E, "Brute O(QN³) ≈ 2×10¹⁴ → way TLE. Need O(Q).", "브루트 O(QN³) ≈ 2×10¹⁴ → 무조건 TLE. O(Q) 필요.")}</p>

<!-- 2. 예제 -->
<h2>2. ${t(E, "Worked Example (N=2)", "예제 풀이 (N=2)")}</h2>
<p>${t(E,
  "N=2 has 12 rows total (3 directions × 4 each). Watch what happens as we remove 5 blocks:",
  "N=2 에서는 총 12 줄 (3 방향 × 4 개씩). 5 개 블록 제거하면서 어떻게 변하는지:")}</p>
<table>
  <tr><th>${t(E, "Step", "단계")}</th><th>${t(E, "Removed", "제거")}</th><th>${t(E, "Open rows", "뚫린 줄")}</th><th>${t(E, "Change", "변화")}</th><th>${t(E, "Why?", "왜?")}</th></tr>
  <tr><td>1</td><td>(0,0,0)</td><td>0</td><td>+0</td><td>${t(E, "All 3 rows still have 1 block left", "3 개 줄 모두 아직 1 블록 남음")}</td></tr>
  <tr><td>2</td><td>(1,1,1)</td><td>0</td><td>+0</td><td>${t(E, "Same — different rows, all still half-full", "마찬가지 — 다른 줄, 모두 반쯤 참")}</td></tr>
  <tr><td>3</td><td>(0,1,0)</td><td>1</td><td>+1</td><td>${t(E, "y-row (0,_,0) now empty (had (0,0,0) and (0,1,0))", "y-줄 (0,_,0) 가 빔 ((0,0,0) + (0,1,0) 다 제거)")}</td></tr>
  <tr><td>4</td><td>(1,0,0)</td><td>2</td><td>+1</td><td>${t(E, "x-row (_,0,0) opens", "x-줄 (_,0,0) 뚫림")}</td></tr>
  <tr><td>5</td><td>(1,1,0)</td><td><b>5</b></td><td><b>+3 🤯</b></td><td>${t(E, "This block was the LAST on 3 rows simultaneously!", "이 블록이 3 줄의 마지막 블록!")}</td></tr>
</table>

<div class="box ok">
  <b>💡 ${t(E, "The surprise", "놀라움 포인트")}</b>:
  ${t(E,
    "One block can be on 3 different rows. When it's the LAST block on multiple rows, removing it opens them all at once — could be +1, +2, or +3.",
    "블록 1 개가 3 줄에 동시에 걸침. 여러 줄의 마지막 블록일 때, 빼면 동시에 다 뚫림 — +1, +2, +3 가능.")}
</div>

<!-- 3. 브루트 -->
<h2>3. ${t(E, "Brute Force (TLE)", "브루트 포스 (TLE)")}</h2>
<p>${t(E,
  "Direct approach: after each removal, scan all 3N² rows and check each cell. Time complexity O(QN³).",
  "그대로 푸는 방법은 블록을 뺄 때마다 3N² 줄을 다 훑고 칸을 하나씩 확인해요.\n시간은 O(QN³) 이에요.")}</p>

${codeBlock(bruteCode)}

<div class="box no">
  <b>${t(E, "Why TLE?", "왜 TLE?")}</b>
  ${t(E,
    "N=1000, Q=200,000: 200,000 × 3 × 10⁶ × 10³ = 6×10¹⁴ ops. Even 1B ops/sec would take 600,000 seconds = 7 days.",
    "N=1000, Q=20만이면 20만 × 3 × 10⁶ × 10³ = 6×10¹⁴ 번 계산해요.\n1초에 10억 번 계산하는 컴퓨터로도 60만 초, 그러니까 7 일이 걸려요.")}
</div>

<!-- 4. 패턴 -->
<h2>4. ${t(E, "Pattern: The Counter Trick", "'줄마다 세기' 라는 방법")}</h2>
<h3>${t(E, "Key insight", "핵심 통찰")}</h3>
<div class="box ok">
  ${t(E,
    "Removing 1 block can affect AT MOST 3 rows (one per direction). The other 3N²−3 rows don't change at all. So why scan all of them every time?",
    "블록 1 개를 빼도 영향받는 줄은 최대 3 개 (방향당 1). 나머지 3N²−3 개 줄은 전혀 안 바뀜. 매번 다 훑을 필요 없음.")}
</div>

<h3>${t(E, "Solution: tally counters per row", "줄마다 숫자를 하나씩 두면 돼요")}</h3>
<p>${t(E, "For each row, keep a counter of how many blocks have been removed.", "줄마다 블록이 몇 개 빠졌는지를 세어 둬요.")}</p>
<ul>
  <li>${t(E, "Counter starts at 0.", "세는 숫자는 0 에서 시작해요.")}</li>
  <li>${t(E, "Block removed → that row's counter += 1.", "블록을 빼면 그 줄의 세는 숫자를 1 올려요.")}</li>
  <li>${t(E, "Counter == N → row fully empty → rod fits!", "세는 숫자가 N 이 되면 그 줄이 다 비어서 막대가 들어가요!")}</li>
</ul>

<h3>${t(E, "Why 3 counters per removal?", "왜 한 번 뺄 때 세는 숫자가 3개일까?")}</h3>
<p>${t(E,
  "Block (x,y,z) sits on:",
  "블록 (x,y,z) 가 걸린 줄:")}</p>
<ul>
  <li>z-axis row at (x, y) — ${t(E, "every cell with these (x,y) and any z", "이 (x,y) 와 z 가 변하는 모든 칸")}</li>
  <li>x-axis row at (y, z) — ${t(E, "every cell with these (y,z) and any x", "이 (y,z) 와 x 가 변하는 모든 칸")}</li>
  <li>y-axis row at (x, z) — ${t(E, "every cell with these (x,z) and any y", "이 (x,z) 와 y 가 변하는 모든 칸")}</li>
</ul>

<div class="box">
  <b>${t(E, "Time complexity", "시간복잡도")}:</b>
  ${t(E, "O(1) per query (3 increments, 3 checks). Total O(Q). Even Q=200,000 is instant.",
        "한 번에 O(1) 이에요. 3번 올리고 3번 확인해요.\n다 합쳐도 O(Q) 라서 Q=20만도 순식간이에요.")}
</div>

<!-- 5. 제일 빠른 코드 -->
<h2>5. ${t(E, "Optimal Code (4 sections)", "제일 빠른 코드 (4 부분)")}</h2>

${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why">
    <b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b>
    <ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
  </div>
  ${sectionCode(s)}
`).join("")}

<div class="box warn">
  <b>📝 ${t(E, "Self-check", "자가 점검")}</b>
  <ol style="margin:6px 0 0;padding-left:20px;font-size:12px;">
    <li>${t(E, "N=2, removals: (0,0,1), (1,1,1), (0,1,1), (1,0,1). What's the answer after each?",
              "N=2 에서 (0,0,1), (1,1,1), (0,1,1), (1,0,1) 순서로 빼요.\n단계마다 답은 얼마일까요?")}</li>
    <li>${t(E, "Why use 3 counters and not just one?",
              "왜 세는 숫자를 3 개나 쓸까? 1 개로 안 될까?")}</li>
    <li>${t(E, "Can a removal ever DECREASE the answer? Why or why not?",
              "제거가 답을 줄일 수 있을까? 이유는?")}</li>
  </ol>
  <div style="font-size:11px;color:#94a3b8;margin-top:6px;font-style:italic;">
    ${t(E,
      "Answers: 1) After (0,0,1): xy[0][0]=1, yz[0][1]=1, xz[0][1]=1, all <N=2 → 0. After (1,1,1): xy[1][1]=1, yz[1][1]=1, xz[1][1]=1, all <2 → 0. After (0,1,1): xy[0][1]=1, yz[1][1]=2 (HIT! +1), xz[0][1]=2 (HIT! +1) → 2. After (1,0,1): xy[1][0]=1, yz[0][1]=2 (HIT! +1), xz[1][1]=2 (HIT! +1) → 4. 2) Each block sits on 3 rows (one per direction). One counter would only track one direction. 3) No — once a row is empty it stays empty. count is monotonically non-decreasing.",
      "답이에요.\n1) (0,0,1) 을 빼면 셋 다 1 이라 2 보다 작아서 0 이에요.\n(1,1,1) 뒤에도 셋 다 1 이라 0 이에요.\n(0,1,1) 뒤에는 yz[1][1] 과 xz[0][1] 이 2 가 돼서 2 예요.\n(1,0,1) 뒤에는 yz[0][1] 과 xz[1][1] 이 2 가 돼서 4 예요.\n2) 블록 하나는 줄 3개에 걸쳐 있어요. 숫자가 하나면 한 방향밖에 못 봐요.\n3) 줄일 수 없어요. 한 번 뚫린 줄은 계속 뚫려 있어서 답은 줄지 않아요.")}
  </div>
</div>

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">
  © Coderin · 코드린 · ${t(E, "Generated for offline study", "오프라인 학습용 출력")}
</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
