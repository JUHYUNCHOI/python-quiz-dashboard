import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";

const A = "#8b5cf6";
const ABg = "#f5f3ff";
const ABd = "#c4b5fd";

/* ── Sample graph from the problem ── */
const NODES = [
  { id: 1, x: 60,  y: 50 },
  { id: 2, x: 200, y: 50 },
  { id: 3, x: 300, y: 150 },
  { id: 4, x: 200, y: 200 },
  { id: 5, x: 60,  y: 200 },
];
const EDGES = [
  { id: 1, u: 1, v: 2, w: 7,  damaged: true },
  { id: 2, u: 2, v: 3, w: 10, damaged: false },
  { id: 3, u: 4, v: 3, w: 8,  damaged: true },
  { id: 4, u: 4, v: 2, w: 5,  damaged: true },
  { id: 5, u: 1, v: 5, w: 18, damaged: false },
  { id: 6, u: 3, v: 5, w: 20, damaged: true },
];

function getNode(id) { return NODES.find(n => n.id === id); }

/* ── Dijkstra on the full graph (no apocalypse) ── */
function dijkstraFull() {
  const dist = {};
  NODES.forEach(n => dist[n.id] = Infinity);
  dist[1] = 0;
  const visited = new Set();
  for (let i = 0; i < NODES.length; i++) {
    let u = -1;
    for (const n of NODES) if (!visited.has(n.id) && (u === -1 || dist[n.id] < dist[u])) u = n.id;
    if (dist[u] === Infinity) break;
    visited.add(u);
    for (const e of EDGES) {
      const other = e.u === u ? e.v : (e.v === u ? e.u : null);
      if (other && dist[u] + e.w < dist[other]) dist[other] = dist[u] + e.w;
    }
  }
  return dist;
}

/* ── Dijkstra ignoring damaged roads (post-apocalypse only safe roads) ── */
function dijkstraSafe() {
  const dist = {};
  NODES.forEach(n => dist[n.id] = Infinity);
  dist[1] = 0;
  const visited = new Set();
  for (let i = 0; i < NODES.length; i++) {
    let u = -1;
    for (const n of NODES) if (!visited.has(n.id) && (u === -1 || dist[n.id] < dist[u])) u = n.id;
    if (dist[u] === Infinity) break;
    visited.add(u);
    for (const e of EDGES) {
      if (e.damaged) continue; // skip damaged roads
      const other = e.u === u ? e.v : (e.v === u ? e.u : null);
      if (other && dist[u] + e.w < dist[other]) dist[other] = dist[u] + e.w;
    }
  }
  return dist;
}

const DIST_FULL = dijkstraFull();
const DIST_SAFE = dijkstraSafe();

/* For each node, minimum time needed to reach it using damaged roads
   (= must arrive before K) */
function reachableCount(K) {
  // BFS/Dijkstra: can use safe roads anytime, damaged roads only if arrive < K
  // Modified: use Dijkstra with constraint on damaged edges
  const dist = {};
  NODES.forEach(n => dist[n.id] = Infinity);
  dist[1] = 0;
  const visited = new Set();
  for (let i = 0; i < NODES.length; i++) {
    let u = -1;
    for (const n of NODES) if (!visited.has(n.id) && (u === -1 || dist[n.id] < dist[u])) u = n.id;
    if (dist[u] === Infinity) break;
    visited.add(u);
    for (const e of EDGES) {
      const other = e.u === u ? e.v : (e.v === u ? e.u : null);
      if (!other) continue;
      const arriveTime = dist[u] + e.w;
      // If damaged: can only use if we start before K AND arrive <= K
      // "cannot travel on damaged roads starting K minutes"
      // "cannot travel if apocalypse happens while on the road"
      // "can finish at exactly K"
      if (e.damaged && !(dist[u] < K && arriveTime <= K)) continue;
      if (arriveTime < dist[other]) dist[other] = arriveTime;
    }
  }
  return NODES.filter(n => dist[n.id] < Infinity).length;
}

/* ═══════════════════════════════════════════════════════════════
   GraphViz — Interactive graph visualization
   ═══════════════════════════════════════════════════════════════ */
export function GraphViz({ E }) {
  const [hovered, setHovered] = useState(null);
  const W = 360, H = 260, pad = 20;

  const nodePos = (n) => ({ x: n.x + pad, y: n.y + pad });

  return (
    <div style={{ padding: "10px 6px" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", margin: "0 auto" }}>
        {/* Edges */}
        {EDGES.map(e => {
          const a = nodePos(getNode(e.u)), b = nodePos(getNode(e.v));
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          return (
            <g key={e.id}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={e.damaged ? "#ef4444" : "#6ee7b7"}
                strokeWidth={e.damaged ? 2.5 : 2}
                strokeDasharray={e.damaged ? "6,3" : "none"}
                opacity={0.7}
              />
              <rect x={mx - 12} y={my - 8} width={24} height={16} rx={4}
                fill={e.damaged ? "#fef2f2" : "#ecfdf5"}
                stroke={e.damaged ? "#fca5a5" : "#6ee7b7"}
                strokeWidth={1}
              />
              <text x={mx} y={my + 4} textAnchor="middle" fontSize={10} fontWeight={700}
                fill={e.damaged ? "#dc2626" : "#059669"}
                fontFamily="'JetBrains Mono',monospace"
              >{e.w}</text>
            </g>
          );
        })}
        {/* Nodes */}
        {NODES.map(n => {
          const p = nodePos(n);
          const isStart = n.id === 1;
          return (
            <g key={n.id}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={p.x} cy={p.y} r={isStart ? 18 : 15}
                fill={isStart ? A : (hovered === n.id ? ABg : "#fff")}
                stroke={isStart ? A : (hovered === n.id ? A : "#94a3b8")}
                strokeWidth={isStart ? 3 : 2}
              />
              <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={isStart ? 14 : 12}
                fontWeight={900} fill={isStart ? "#fff" : C.text}
                fontFamily="'JetBrains Mono',monospace"
              >{n.id}</text>
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 6, fontSize: 11, fontWeight: 700 }}>
        <span style={{ color: "#059669" }}>━━ {t(E, "safe road", "안전한 도로")}</span>
        <span style={{ color: "#ef4444" }}>╌╌ {t(E, "damaged road", "손상된 도로")}</span>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ReachSim — K slider to see which cities are reachable
   ═══════════════════════════════════════════════════════════════ */
export function ReachSim({ E }) {
  const [K, setK] = useState(6);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const QUERIES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25, 30];

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const autoPlay = () => {
    if (playing) { setPlaying(false); if (timerRef.current) clearInterval(timerRef.current); return; }
    setPlaying(true);
    let idx = 0;
    setK(QUERIES[0]);
    timerRef.current = setInterval(() => {
      idx++;
      if (idx >= QUERIES.length) { clearInterval(timerRef.current); setPlaying(false); return; }
      setK(QUERIES[idx]);
    }, 600);
  };

  const count = reachableCount(K);

  // Compute which cities reachable
  const reachable = new Set();
  {
    const dist = {};
    NODES.forEach(n => dist[n.id] = Infinity);
    dist[1] = 0;
    const visited = new Set();
    for (let i = 0; i < NODES.length; i++) {
      let u = -1;
      for (const n of NODES) if (!visited.has(n.id) && (u === -1 || dist[n.id] < dist[u])) u = n.id;
      if (dist[u] === Infinity) break;
      visited.add(u);
      reachable.add(u);
      for (const e of EDGES) {
        const other = e.u === u ? e.v : (e.v === u ? e.u : null);
        if (!other) continue;
        const arriveTime = dist[u] + e.w;
        if (e.damaged && !(dist[u] < K && arriveTime <= K)) continue;
        if (arriveTime < dist[other]) dist[other] = arriveTime;
      }
    }
    // Second pass to collect all reachable
    reachable.clear();
    NODES.forEach(n => { if (dist[n.id] < Infinity) reachable.add(n.id); });
  }

  const W = 360, H = 260, pad = 20;
  const nodePos = (n) => ({ x: n.x + pad, y: n.y + pad });

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* K slider */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: A, marginBottom: 4 }}>
          K = <span style={{ fontSize: 18, color: "#fbbf24" }}>{K}</span>
          {t(E, " minutes", "분")}
        </div>
        <input
          type="range" min={0} max={30} value={K}
          onChange={e => setK(Number(e.target.value))}
          style={{ width: "80%", accentColor: A }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", width: "80%", margin: "0 auto", fontSize: 9, color: C.dim }}>
          <span>0</span><span>10</span><span>20</span><span>30</span>
        </div>
      </div>

      {/* Graph */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", margin: "0 auto" }}>
        {EDGES.map(e => {
          const a = nodePos(getNode(e.u)), b = nodePos(getNode(e.v));
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          const usable = !e.damaged || (reachable.has(e.u) || reachable.has(e.v));
          const destroyed = e.damaged; // always show as damaged style
          return (
            <g key={e.id}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={destroyed ? "#ef4444" : "#6ee7b7"}
                strokeWidth={destroyed ? 2.5 : 2}
                strokeDasharray={destroyed ? "6,3" : "none"}
                opacity={0.6}
              />
              <rect x={mx - 12} y={my - 8} width={24} height={16} rx={4}
                fill={destroyed ? "#fef2f2" : "#ecfdf5"}
                stroke={destroyed ? "#fca5a5" : "#6ee7b7"} strokeWidth={1}
              />
              <text x={mx} y={my + 4} textAnchor="middle" fontSize={10} fontWeight={700}
                fill={destroyed ? "#dc2626" : "#059669"}
                fontFamily="'JetBrains Mono',monospace"
              >{e.w}</text>
            </g>
          );
        })}
        {NODES.map(n => {
          const p = nodePos(n);
          const isReach = reachable.has(n.id);
          const isStart = n.id === 1;
          return (
            <g key={n.id}>
              {isReach && <circle cx={p.x} cy={p.y} r={20} fill="none" stroke="#fbbf24" strokeWidth={2} opacity={0.6}>
                <animate attributeName="r" from="15" to="22" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
              </circle>}
              <circle cx={p.x} cy={p.y} r={isStart ? 18 : 15}
                fill={isReach ? (isStart ? A : "#dcfce7") : "#fee2e2"}
                stroke={isReach ? (isStart ? A : "#059669") : "#fca5a5"}
                strokeWidth={isStart ? 3 : 2}
              />
              <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={isStart ? 14 : 12}
                fontWeight={900} fill={isStart ? "#fff" : (isReach ? "#059669" : "#dc2626")}
                fontFamily="'JetBrains Mono',monospace"
              >{n.id}</text>
            </g>
          );
        })}
      </svg>

      {/* Result */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "8px 14px", marginTop: 8,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
        color: "#e2e8f0", textAlign: "center",
      }}>
        K={K}: <span style={{ color: "#fbbf24", fontWeight: 900, fontSize: 16 }}>{count}</span>
        {t(E, " cities reachable", "개 도시 도달 가능")}
      </div>

      {/* Auto play */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
        <button onClick={autoPlay} style={{
          padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 800,
          border: `2px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
        }}>{playing ? "⏸" : "⏭"} {t(E, playing ? "Pause" : "Auto", playing ? "정지" : "자동")}</button>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   DijkstraTrace — Step through Dijkstra
   ═══════════════════════════════════════════════════════════════ */
export function DijkstraTrace({ E }) {
  const [step, setStep] = useState(0);

  // Precompute Dijkstra steps on full graph
  const steps = (() => {
    const dist = {};
    NODES.forEach(n => dist[n.id] = Infinity);
    dist[1] = 0;
    const visited = new Set();
    const trace = [{ visited: new Set(), dist: { ...dist }, msg: t(E, "Start: dist[1]=0", "시작: dist[1]=0") }];

    for (let i = 0; i < NODES.length; i++) {
      let u = -1;
      for (const n of NODES) if (!visited.has(n.id) && (u === -1 || dist[n.id] < dist[u])) u = n.id;
      if (dist[u] === Infinity) break;
      visited.add(u);

      const updates = [];
      for (const e of EDGES) {
        const other = e.u === u ? e.v : (e.v === u ? e.u : null);
        if (!other) continue;
        if (dist[u] + e.w < dist[other]) {
          dist[other] = dist[u] + e.w;
          updates.push(`dist[${other}]=${dist[other]}`);
        }
      }
      trace.push({
        visited: new Set(visited),
        dist: { ...dist },
        node: u,
        msg: t(E,
          `Visit city ${u} (dist=${dist[u]}). ${updates.length ? "Update: " + updates.join(", ") : "No updates."}`,
          `도시 ${u} 방문 (거리=${dist[u]}). ${updates.length ? "갱신: " + updates.join(", ") : "갱신 없음."}`),
      });
    }
    return trace;
  })();

  const maxStep = steps.length - 1;
  const cur = steps[Math.min(step, maxStep)];

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* Distance table */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        {NODES.map(n => {
          const d = cur.dist[n.id];
          const isVisited = cur.visited.has(n.id);
          const isCurrent = cur.node === n.id;
          return (
            <div key={n.id} style={{
              padding: "4px 8px", borderRadius: 8, textAlign: "center", minWidth: 44,
              background: isCurrent ? "rgba(139,92,246,.15)" : (isVisited ? "#dcfce7" : ABg),
              border: `2px solid ${isCurrent ? A : (isVisited ? "#6ee7b7" : ABd)}`,
              fontFamily: "'JetBrains Mono',monospace", transition: "all .3s",
            }}>
              <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>
                {t(E, "city", "도시")} {n.id}
              </div>
              <div style={{
                fontSize: 14, fontWeight: 900,
                color: d === Infinity ? "#cbd5e1" : (isCurrent ? A : "#059669"),
              }}>
                {d === Infinity ? "∞" : d}
              </div>
            </div>
          );
        })}
      </div>

      {/* Step message */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "8px 12px", marginBottom: 8,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
        color: "#e2e8f0", textAlign: "center", lineHeight: 1.6,
      }}>
        {cur.msg}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {step <= maxStep ? (
          <button onClick={() => setStep(s => Math.min(s + 1, maxStep + 1))} style={{
            padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 900,
            border: "none", cursor: "pointer", color: "#fff",
            background: `linear-gradient(135deg,#6d28d9,${A})`,
            boxShadow: "0 3px 12px rgba(139,92,246,.3)",
          }}>▶ {t(E, "Next", "다음")}</button>
        ) : (
          <button onClick={() => setStep(0)} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 900,
            border: `2px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {t(E, "Restart", "처음부터")}</button>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 4, fontSize: 10, color: C.dim, fontWeight: 700 }}>
        {Math.min(step, maxStep + 1)}/{maxStep + 1}
      </div>
    </div>
  );
}
