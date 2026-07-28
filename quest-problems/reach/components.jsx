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

/* ── Dijkstra on the full graph (all roads still usable) ── */
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

/* ── Dijkstra ignoring damaged roads (after they break, only safe roads) ── */
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
      // "cannot travel if the road breaks while on it"
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
        <div style={{ fontSize: 12, fontWeight: 600, color: A, marginBottom: 4 }}>
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
        K={K}: <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: 16 }}>{count}</span>
        {t(E, " cities reachable", "개 도시 도달 가능")}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   DijkstraKAudit — Deep audit of modified Dijkstra with K constraint.
   Students pick K, then step edge-by-edge to see which damaged edges
   get accepted vs blocked, building intuition for the runtime check
   `if not(d < K and arrive <= K): continue`.
   ═══════════════════════════════════════════════════════════════ */
export function DijkstraKAudit({ E }) {
  const K_PRESETS = [6, 11, 12];
  const [K, setK] = useState(11);
  const [step, setStep] = useState(0);

  // Precompute every edge-relaxation event for chosen K.
  const events = (() => {
    const dist = {};
    NODES.forEach(n => dist[n.id] = Infinity);
    dist[1] = 0;
    const visited = new Set();
    const trace = [{
      kind: "init", visited: new Set(), dist: { ...dist }, edge: null,
      msg: t(E, `Init: dist[1]=0, K=${K}`, `초기화: dist[1]=0, K=${K}`),
    }];

    for (let i = 0; i < NODES.length; i++) {
      let u = -1;
      for (const n of NODES) if (!visited.has(n.id) && (u === -1 || dist[n.id] < dist[u])) u = n.id;
      if (u === -1 || dist[u] === Infinity) break;
      visited.add(u);
      trace.push({
        kind: "pop", visited: new Set(visited), dist: { ...dist }, node: u, edge: null,
        msg: t(E,
          `Pop city ${u} (d=${dist[u]}). Scan its edges...`,
          `도시 ${u} 꺼내기 (d=${dist[u]}). 이 도시의 도로들 검사...`),
      });

      for (const e of EDGES) {
        const other = e.u === u ? e.v : (e.v === u ? e.u : null);
        if (!other) continue;
        const arrive = dist[u] + e.w;
        const dmg = e.damaged;
        const blocked = dmg && !(dist[u] < K && arrive <= K);
        let status, msg;
        if (blocked) {
          status = "blocked";
          msg = t(E,
            `Edge ${u}↔${other} (damaged, w=${e.w}): start=${dist[u]}, arrive=${arrive}. Need start<${K} AND arrive<=${K}. BLOCKED.`,
            `도로 ${u}↔${other} (손상, w=${e.w}): 출발=${dist[u]}, 도착=${arrive}. 조건 출발<${K} AND 도착<=${K} 필요. 차단.`);
        } else if (arrive < dist[other]) {
          dist[other] = arrive;
          status = "relax";
          msg = t(E,
            `Edge ${u}↔${other} ${dmg ? "(damaged, OK: " + dist[u] + "<" + K + " AND " + arrive + "<=" + K + ")" : "(safe)"}: dist[${other}] = ${arrive}.`,
            `도로 ${u}↔${other} ${dmg ? "(손상, 통과: " + dist[u] + "<" + K + " AND " + arrive + "<=" + K + ")" : "(안전)"}: dist[${other}] = ${arrive}.`);
        } else {
          status = "skip";
          msg = t(E,
            `Edge ${u}↔${other} ${dmg ? "(damaged, OK)" : "(safe)"}: arrive=${arrive} >= dist[${other}]=${dist[other] === Infinity ? "∞" : dist[other]}. No update.`,
            `도로 ${u}↔${other} ${dmg ? "(손상, 통과)" : "(안전)"}: 도착=${arrive} >= dist[${other}]=${dist[other] === Infinity ? "∞" : dist[other]}. 갱신 없음.`);
        }
        trace.push({
          kind: "edge", visited: new Set(visited), dist: { ...dist },
          node: u, edge: e, other, arrive, status, msg,
        });
      }
    }

    const reach = NODES.filter(n => dist[n.id] < Infinity).length;
    trace.push({
      kind: "done", visited: new Set(visited), dist: { ...dist }, edge: null,
      msg: t(E,
        `Done. Reachable cities: ${reach}.`,
        `종료. 도달 가능 도시: ${reach}개.`),
    });
    return trace;
  })();

  const maxStep = events.length - 1;
  const idx = Math.min(step, maxStep);
  const cur = events[idx];

  const W = 360, H = 260, pad = 20;
  const nodePos = (n) => ({ x: n.x + pad, y: n.y + pad });

  const statusColor = {
    blocked: "#dc2626",
    relax: "#059669",
    skip: "#94a3b8",
  }[cur.status] || "#94a3b8";

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* K preset buttons */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
          {t(E, "Pick K and audit each edge", "K 고르고 도로별로 점검")}
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          {K_PRESETS.map(kv => (
            <button key={kv}
              onClick={() => { setK(kv); setStep(0); }}
              style={{
                padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                border: `1.5px solid ${K === kv ? A : ABd}`,
                background: K === kv ? A : "#fff",
                color: K === kv ? "#fff" : A,
                cursor: "pointer",
              }}>K={kv}</button>
          ))}
        </div>
      </div>

      {/* Distance table */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 6, flexWrap: "wrap" }}>
        {NODES.map(n => {
          const d = cur.dist[n.id];
          const isVisited = cur.visited.has(n.id);
          const isCurrent = cur.node === n.id;
          return (
            <div key={n.id} style={{
              padding: "3px 8px", borderRadius: 8, textAlign: "center", minWidth: 42,
              background: isCurrent ? "rgba(139,92,246,.15)" : (isVisited ? "#dcfce7" : ABg),
              border: `1px solid ${isCurrent ? A : (isVisited ? "#6ee7b7" : ABd)}`,
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>
                {t(E, "city", "도시")} {n.id}
              </div>
              <div style={{
                fontSize: 13, fontWeight: 700,
                color: d === Infinity ? "#cbd5e1" : (isCurrent ? A : "#059669"),
              }}>
                {d === Infinity ? "∞" : d}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini graph with current edge highlighted */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", margin: "0 auto" }}>
        {EDGES.map(e => {
          const a = nodePos(getNode(e.u)), b = nodePos(getNode(e.v));
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          const isCurEdge = cur.edge && cur.edge.id === e.id;
          const stroke = isCurEdge ? statusColor : (e.damaged ? "#ef4444" : "#6ee7b7");
          return (
            <g key={e.id}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={stroke}
                strokeWidth={isCurEdge ? 4 : (e.damaged ? 2.5 : 2)}
                strokeDasharray={e.damaged ? "6,3" : "none"}
                opacity={isCurEdge ? 1 : 0.45}
              />
              <rect x={mx - 12} y={my - 8} width={24} height={16} rx={4}
                fill={e.damaged ? "#fef2f2" : "#ecfdf5"}
                stroke={isCurEdge ? statusColor : (e.damaged ? "#fca5a5" : "#6ee7b7")}
                strokeWidth={isCurEdge ? 2 : 1}
              />
              <text x={mx} y={my + 4} textAnchor="middle" fontSize={10} fontWeight={700}
                fill={e.damaged ? "#dc2626" : "#059669"}
                fontFamily="'JetBrains Mono',monospace"
              >{e.w}</text>
            </g>
          );
        })}
        {NODES.map(n => {
          const p = nodePos(n);
          const isStart = n.id === 1;
          const isVisited = cur.visited.has(n.id);
          const isCurrent = cur.node === n.id;
          return (
            <g key={n.id}>
              <circle cx={p.x} cy={p.y} r={isStart ? 18 : 15}
                fill={isStart ? A : (isCurrent ? "#fef3c7" : (isVisited ? "#dcfce7" : "#fff"))}
                stroke={isCurrent ? "#fbbf24" : (isVisited ? "#059669" : "#94a3b8")}
                strokeWidth={isStart || isCurrent ? 3 : 2}
              />
              <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={isStart ? 14 : 12}
                fontWeight={900} fill={isStart ? "#fff" : C.text}
                fontFamily="'JetBrains Mono',monospace"
              >{n.id}</text>
            </g>
          );
        })}
      </svg>

      {/* Step message */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "8px 12px", marginTop: 6,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
        color: cur.status === "blocked" ? "#fca5a5" : (cur.status === "relax" ? "#86efac" : "#e2e8f0"),
        textAlign: "center", lineHeight: 1.6, minHeight: 36,
      }}>
        {cur.msg}
      </div>

      {/* Status legend (only for edge events) */}
      {cur.kind === "edge" && (
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 6, fontSize: 10, fontWeight: 700 }}>
          <span style={{ color: "#059669" }}>✓ {t(E, "relax", "갱신")}</span>
          <span style={{ color: "#dc2626" }}>✗ {t(E, "blocked (K)", "차단(K)")}</span>
          <span style={{ color: "#94a3b8" }}>– {t(E, "no update", "갱신 없음")}</span>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={idx === 0}
          style={{
            padding: "7px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
            border: `1px solid ${ABd}`,
            background: idx === 0 ? "#f1f5f9" : ABg,
            color: idx === 0 ? "#cbd5e1" : A,
            cursor: idx === 0 ? "default" : "pointer",
          }}>◀ {t(E, "Back", "이전")}</button>
        {idx < maxStep ? (
          <button onClick={() => setStep(s => Math.min(s + 1, maxStep))} style={{
            padding: "7px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: "none", cursor: "pointer", color: "#fff",
            background: `linear-gradient(135deg,#6d28d9,${A})`,
            boxShadow: "0 3px 12px rgba(139,92,246,.3)",
          }}>▶ {t(E, "Next", "다음")}</button>
        ) : (
          <button onClick={() => setStep(0)} style={{
            padding: "7px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {t(E, "Restart", "처음부터")}</button>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 4, fontSize: 10, color: C.dim, fontWeight: 700 }}>
        {idx + 1}/{maxStep + 1}
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
              border: `1px solid ${isCurrent ? A : (isVisited ? "#6ee7b7" : ABd)}`,
              fontFamily: "'JetBrains Mono',monospace", transition: "all .3s",
            }}>
              <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>
                {t(E, "city", "도시")} {n.id}
              </div>
              <div style={{
                fontSize: 14, fontWeight: 700,
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
            padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: "none", cursor: "pointer", color: "#fff",
            background: `linear-gradient(135deg,#6d28d9,${A})`,
            boxShadow: "0 3px 12px rgba(139,92,246,.3)",
          }}>▶ {t(E, "Next", "다음")}</button>
        ) : (
          <button onClick={() => setStep(0)} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {t(E, "Restart", "처음부터")}</button>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 4, fontSize: 10, color: C.dim, fontWeight: 700 }}>
        {Math.min(step, maxStep + 1)}/{maxStep + 1}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ReachSpreadSim — pick K (6/11/12), then step through the cities
   being reached ONE AT A TIME with plain-language bubbles, so the
   student SEES why K = 6/11/12 → 2/4/5.
   (선생님 2026-07-28: "시뮬로 각 입력값에 따라 어떻게 되는건지")
   ═══════════════════════════════════════════════════════════════ */
const SPREAD_ORDER = [
  { city: 1, kind: "start",     path: [1] },
  { city: 5, kind: "safe",      path: [1, 5],    cond: () => true },
  { city: 2, kind: "damaged",   path: [1, 2],    cond: (K) => 7 <= K },
  { city: 3, kind: "safeAfter", path: [1, 2, 3], cond: (K) => 7 <= K },
  { city: 4, kind: "damaged2",  path: [1, 2, 4], cond: (K) => 12 <= K },
];

function findEdge(a, b) {
  return EDGES.find(e => (e.u === a && e.v === b) || (e.u === b && e.v === a));
}

export function ReachSpreadSim({ E }) {
  const K_PRESETS = [6, 11, 12];
  const [K, setK] = useState(6);
  const [step, setStep] = useState(0);

  const trace = (() => {
    const reached = new Set([1]);
    const tr = [{
      city: 1, status: "start", path: [1], reached: new Set([1]),
      msg: t(E, `Start at city 1 (0 min). K = ${K}.`, `도시 1 에서 출발 (0분). K = ${K}.`),
    }];
    for (const s of SPREAD_ORDER.slice(1)) {
      const ok = s.cond(K);
      if (ok) reached.add(s.city);
      let msg;
      if (s.kind === "safe") {
        msg = t(E,
          `City ${s.city}: safe road 1–5 (18 min). Safe roads ignore K → always reachable ✓`,
          `도시 ${s.city}: 안전 도로 1–5 (18분). 안전 도로는 K 와 무관 → 항상 도달 ✓`);
      } else if (s.kind === "damaged") {
        msg = ok
          ? t(E, `City ${s.city}: damaged road 1→2 arrives at 7. 7 ≤ K(${K}) ✓ → reachable`,
                 `도시 ${s.city}: 손상 도로 1→2, 7분 도착. 7 ≤ K(${K}) ✓ → 도달`)
          : t(E, `City ${s.city}: damaged road 1→2 takes 7, but 7 > K(${K}) ✗ → blocked`,
                 `도시 ${s.city}: 손상 도로 1→2 는 7분인데 7 > K(${K}) ✗ → 못 감`);
      } else if (s.kind === "safeAfter") {
        msg = ok
          ? t(E, `City ${s.city}: from city 2 via SAFE road 2→3 (arrive 17). The damaged part (1→2, 7) already passed → reachable ✓`,
                 `도시 ${s.city}: 도시 2 에서 안전 도로 2→3 (17분 도착). 손상 도로(1→2, 7분)는 이미 건넜음 → 도달 ✓`)
          : t(E, `City ${s.city}: city 2 was blocked (K < 7), so city 3 is too ✗`,
                 `도시 ${s.city}: 도시 2 에 못 가서(K < 7) 여기도 ✗`);
      } else { // damaged2 — city 4
        const exact = K === 12;
        msg = ok
          ? t(E, `City ${s.city}: 1→2→4, damaged road 2→4 arrives at 12. 12 ≤ K(${K})${exact ? " — exactly K, still OK!" : ""} ✓ → reachable`,
                 `도시 ${s.city}: 1→2→4, 손상 도로 2→4 는 12분. 12 ≤ K(${K})${exact ? " — 딱 K! 그래도 OK!" : ""} ✓ → 도달`)
          : t(E, `City ${s.city}: 1→2→4 arrives at 12, but 12 > K(${K}) ✗ → blocked`,
                 `도시 ${s.city}: 1→2→4 는 12분인데 12 > K(${K}) ✗ → 못 감`);
      }
      tr.push({ city: s.city, status: ok ? "reach" : "block", path: s.path, reached: new Set(reached), msg });
    }
    tr.push({
      city: null, status: "done", path: [], reached: new Set(reached),
      msg: t(E, `K = ${K} → ${reached.size} cities reachable.`, `K = ${K} → ${reached.size}개 도시 도달.`),
    });
    return tr;
  })();

  const maxStep = trace.length - 1;
  const idx = Math.min(step, maxStep);
  const cur = trace[idx];

  const W = 360, H = 260, pad = 20;
  const nodePos = (n) => ({ x: n.x + pad, y: n.y + pad });
  const pathEdges = new Set();
  for (let i = 0; i + 1 < (cur.path?.length || 0); i++) {
    const e = findEdge(cur.path[i], cur.path[i + 1]);
    if (e) pathEdges.add(e.id);
  }

  const statusColor = { reach: "#059669", block: "#dc2626", start: A, done: A }[cur.status] || A;

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* K preset buttons */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
          {t(E, "Pick K, then step ▶ through the cities", "K 고르고 ▶ 로 도시 하나씩")}
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          {K_PRESETS.map(kv => (
            <button key={kv}
              onClick={() => { setK(kv); setStep(0); }}
              style={{
                padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                border: `1.5px solid ${K === kv ? A : ABd}`,
                background: K === kv ? A : "#fff",
                color: K === kv ? "#fff" : A, cursor: "pointer",
              }}>K={kv}</button>
          ))}
        </div>
      </div>

      {/* Reached counter */}
      <div style={{ textAlign: "center", marginBottom: 6, fontSize: 12, fontWeight: 700, color: "#059669" }}>
        {t(E, "Reached", "도달")}: <span style={{ fontSize: 16 }}>{cur.reached.size}</span>
      </div>

      {/* Graph */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", margin: "0 auto" }}>
        {EDGES.map(e => {
          const a = nodePos(getNode(e.u)), b = nodePos(getNode(e.v));
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          const onPath = pathEdges.has(e.id);
          return (
            <g key={e.id}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={onPath ? statusColor : (e.damaged ? "#ef4444" : "#6ee7b7")}
                strokeWidth={onPath ? 4 : (e.damaged ? 2.5 : 2)}
                strokeDasharray={e.damaged ? "6,3" : "none"}
                opacity={onPath ? 1 : 0.4}
              />
              <rect x={mx - 12} y={my - 8} width={24} height={16} rx={4}
                fill={e.damaged ? "#fef2f2" : "#ecfdf5"}
                stroke={onPath ? statusColor : (e.damaged ? "#fca5a5" : "#6ee7b7")}
                strokeWidth={onPath ? 2 : 1}
              />
              <text x={mx} y={my + 4} textAnchor="middle" fontSize={10} fontWeight={700}
                fill={e.damaged ? "#dc2626" : "#059669"}
                fontFamily="'JetBrains Mono',monospace"
              >{e.w}</text>
            </g>
          );
        })}
        {NODES.map(n => {
          const p = nodePos(n);
          const isStart = n.id === 1;
          const isReached = cur.reached.has(n.id);
          const isCurrent = cur.city === n.id;
          const isBlocked = isCurrent && cur.status === "block";
          return (
            <g key={n.id}>
              {isCurrent && (
                <circle cx={p.x} cy={p.y} r={22} fill="none" stroke={statusColor} strokeWidth={2} opacity={0.7} />
              )}
              <circle cx={p.x} cy={p.y} r={isStart ? 18 : 15}
                fill={isStart ? A : (isBlocked ? "#fee2e2" : (isReached ? "#dcfce7" : "#fff"))}
                stroke={isBlocked ? "#dc2626" : (isReached ? "#059669" : "#94a3b8")}
                strokeWidth={isStart || isCurrent ? 3 : 2}
              />
              <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={isStart ? 14 : 12}
                fontWeight={900} fill={isStart ? "#fff" : (isBlocked ? "#dc2626" : (isReached ? "#059669" : C.text))}
                fontFamily="'JetBrains Mono',monospace"
              >{n.id}</text>
            </g>
          );
        })}
      </svg>

      {/* Step message bubble */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "8px 12px", marginTop: 6,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
        color: cur.status === "block" ? "#fca5a5" : (cur.status === "reach" ? "#86efac" : "#e2e8f0"),
        textAlign: "center", lineHeight: 1.6, minHeight: 36,
      }}>
        {cur.msg}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={idx === 0}
          style={{
            padding: "7px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
            border: `1px solid ${ABd}`,
            background: idx === 0 ? "#f1f5f9" : ABg,
            color: idx === 0 ? "#cbd5e1" : A,
            cursor: idx === 0 ? "default" : "pointer",
          }}>◀ {t(E, "Back", "이전")}</button>
        {idx < maxStep ? (
          <button onClick={() => setStep(s => Math.min(s + 1, maxStep))} style={{
            padding: "7px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: "none", cursor: "pointer", color: "#fff",
            background: `linear-gradient(135deg,#6d28d9,${A})`,
            boxShadow: "0 3px 12px rgba(139,92,246,.3)",
          }}>▶ {t(E, "Next", "다음")}</button>
        ) : (
          <button onClick={() => setStep(0)} style={{
            padding: "7px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {t(E, "Restart", "처음부터")}</button>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 4, fontSize: 10, color: C.dim, fontWeight: 700 }}>
        {idx + 1}/{maxStep + 1}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   GraphBuildSim — step through the sample INPUT line by line and
   DRAW the graph as each road is read, then mark the damaged roads
   and show the K queries.  The student sees the graph appear FROM
   the input values.  (선생님 2026-07-28: "입력값에 따라 그래프 그려지는걸 시뮬로")
   ═══════════════════════════════════════════════════════════════ */
export function GraphBuildSim({ E }) {
  const STEPS = [
    { line: "5 6", upto: 0, damaged: [], hi: null, q: false,
      ko: "첫 줄 「5 6」 → 도시 5개, 도로 6개. 도시 5개를 먼저 놓아요.",
      en: "First line “5 6” → 5 cities, 6 roads. Place the 5 cities first." },
    { line: "① road 1:  1 2 7", upto: 1, damaged: [], hi: 1, q: false,
      ko: "도로 ① 「1 2 7」 → 도시 1 ↔ 2, 길이 7. (각 도로엔 번호가 있어요)",
      en: "Road ① “1 2 7” → city 1 ↔ 2, length 7. (each road has a number)" },
    { line: "② road 2:  2 3 10", upto: 2, damaged: [], hi: 2, q: false,
      ko: "도로 ② 「2 3 10」 → 도시 2 ↔ 3, 길이 10.",
      en: "Road ② “2 3 10” → city 2 ↔ 3, length 10." },
    { line: "③ road 3:  4 3 8", upto: 3, damaged: [], hi: 3, q: false,
      ko: "도로 ③ 「4 3 8」 → 도시 4 ↔ 3, 길이 8.",
      en: "Road ③ “4 3 8” → city 4 ↔ 3, length 8." },
    { line: "④ road 4:  4 2 5", upto: 4, damaged: [], hi: 4, q: false,
      ko: "도로 ④ 「4 2 5」 → 도시 4 ↔ 2, 길이 5.",
      en: "Road ④ “4 2 5” → city 4 ↔ 2, length 5." },
    { line: "⑤ road 5:  1 5 18", upto: 5, damaged: [], hi: 5, q: false,
      ko: "도로 ⑤ 「1 5 18」 → 도시 1 ↔ 5, 길이 18.",
      en: "Road ⑤ “1 5 18” → city 1 ↔ 5, length 18." },
    { line: "⑥ road 6:  3 5 20", upto: 6, damaged: [], hi: 6, q: false,
      ko: "도로 ⑥ 「3 5 20」 → 도시 3 ↔ 5, 길이 20. 도로 6개 완성! 각 도로 번호 ①~⑥ 을 기억해요.",
      en: "Road ⑥ “3 5 20” → city 3 ↔ 5, length 20. All 6 roads done! Note each road's number ①–⑥." },
    { line: "4  →  1 3 4 6", upto: 6, damaged: [], hi: null, q: false,
      ko: "「4」 = 약한 도로 4개. 번호는 「1 3 4 6」. 지금은 쓸 수 있지만 K분에 무너질 도로예요. 어느 도로인지 하나씩 표시할게요 →",
      en: "“4” = 4 weak roads, numbered “1 3 4 6”. They still work now, but will collapse at minute K. Let's mark which roads they are, one at a time →" },
    { line: "damaged 1  →  road ① (1↔2)", upto: 6, damaged: [1], hi: 1, q: false,
      ko: "번호 1 → 도로 ① = 도시 1 ↔ 2 (7). 이게 그 약한 도로예요 🔴 (K분에 무너짐, 지금은 OK).",
      en: "Number 1 → road ① = city 1 ↔ 2 (7). This is one of the weak roads 🔴 (collapses at K, fine for now)." },
    { line: "damaged 3  →  road ③ (4↔3)", upto: 6, damaged: [1, 3], hi: 3, q: false,
      ko: "번호 3 → 도로 ③ = 도시 4 ↔ 3 (8). 약한 도로 🔴",
      en: "Number 3 → road ③ = city 4 ↔ 3 (8). Weak road 🔴" },
    { line: "damaged 4  →  road ④ (4↔2)", upto: 6, damaged: [1, 3, 4], hi: 4, q: false,
      ko: "번호 4 → 도로 ④ = 도시 4 ↔ 2 (5). 약한 도로 🔴",
      en: "Number 4 → road ④ = city 4 ↔ 2 (5). Weak road 🔴" },
    { line: "damaged 6  →  road ⑥ (3↔5)", upto: 6, damaged: [1, 3, 4, 6], hi: 6, q: false,
      ko: "번호 6 → 도로 ⑥ = 도시 3 ↔ 5 (20). 약한 도로 🔴  이제 약한 도로 4개(①③④⑥) 완성. 나머지 ②⑤ 는 튼튼(안 무너짐).",
      en: "Number 6 → road ⑥ = city 3 ↔ 5 (20). Weak road 🔴  All 4 weak roads (①③④⑥) marked; ②⑤ are sturdy (never collapse)." },
    { line: "3  →  6 · 11 · 12", upto: 6, damaged: [1, 3, 4, 6], hi: null, q: true,
      ko: "「3」 그리고 「6 · 11 · 12」 → 쿼리 3개. K 마다 도달 도시 수를 물어요. (답은 다음 시뮬에서!)",
      en: "“3” then “6 · 11 · 12” → 3 queries. For each K, how many cities are reachable? (answer in the next sim!)" },
  ];
  const [step, setStep] = useState(0);
  const maxStep = STEPS.length - 1;
  const idx = Math.min(step, maxStep);
  const cur = STEPS[idx];

  const W = 360, H = 260, pad = 20;
  const nodePos = (n) => ({ x: n.x + pad, y: n.y + pad });

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* current input line */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 700, marginBottom: 3 }}>
          {t(E, "Reading input, line by line", "입력을 한 줄씩 읽는 중")}
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800,
          color: "#f8fafc", background: "#0f172a", padding: "4px 12px", borderRadius: 6,
          display: "inline-block", letterSpacing: 0.5,
        }}>{cur.line}</span>
      </div>

      {/* Graph — nodes always, edges drawn up to cur.upto */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", margin: "0 auto" }}>
        {EDGES.filter(e => e.id <= cur.upto).map(e => {
          const a = nodePos(getNode(e.u)), b = nodePos(getNode(e.v));
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          const isDmg = (cur.damaged || []).includes(e.id);
          const isHi = cur.hi === e.id;
          // road-number badge, placed ~27% along the edge (away from the weight box)
          const bx = a.x + 0.27 * (b.x - a.x), by = a.y + 0.27 * (b.y - a.y);
          return (
            <g key={e.id}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={isHi ? A : (isDmg ? "#ef4444" : "#6ee7b7")}
                strokeWidth={isHi ? 4 : (isDmg ? 2.5 : 2)}
                strokeDasharray={isDmg ? "6,3" : "none"}
                opacity={isHi ? 1 : 0.75}
              />
              <rect x={mx - 12} y={my - 8} width={24} height={16} rx={4}
                fill={isDmg ? "#fef2f2" : "#ecfdf5"}
                stroke={isHi ? A : (isDmg ? "#fca5a5" : "#6ee7b7")}
                strokeWidth={isHi ? 2 : 1}
              />
              <text x={mx} y={my + 4} textAnchor="middle" fontSize={10} fontWeight={700}
                fill={isDmg ? "#dc2626" : "#059669"}
                fontFamily="'JetBrains Mono',monospace"
              >{e.w}</text>
              {/* road-number badge (red once damaged, purple otherwise) */}
              <circle cx={bx} cy={by} r={8}
                fill={isDmg ? "#dc2626" : "#8b5cf6"}
                stroke="#fff" strokeWidth={1.5}
                opacity={isHi || isDmg ? 1 : 0.85}
              />
              <text x={bx} y={by + 3.5} textAnchor="middle" fontSize={10} fontWeight={800}
                fill="#fff" fontFamily="'JetBrains Mono',monospace"
              >{e.id}</text>
            </g>
          );
        })}
        {NODES.map(n => {
          const p = nodePos(n);
          const isStart = n.id === 1;
          return (
            <g key={n.id}>
              <circle cx={p.x} cy={p.y} r={isStart ? 18 : 15}
                fill={isStart ? A : "#fff"}
                stroke={isStart ? A : "#94a3b8"} strokeWidth={isStart ? 3 : 2}
              />
              <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={isStart ? 14 : 12}
                fontWeight={900} fill={isStart ? "#fff" : C.text}
                fontFamily="'JetBrains Mono',monospace"
              >{n.id}</text>
            </g>
          );
        })}
      </svg>

      {/* K query chips + what each K means (only at the queries step) */}
      {cur.q && (
        <div style={{ marginTop: 6 }}>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {[6, 11, 12].map(k => (
              <span key={k} style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800,
                color: "#92400e", background: "#fef3c7", border: "1.5px solid #fbbf24",
                padding: "2px 10px", borderRadius: 6,
              }}>K={k}</span>
            ))}
          </div>
          <div style={{
            marginTop: 6, background: "#fffbeb", border: "1.5px solid #fde68a",
            borderRadius: 8, padding: "9px 11px", fontSize: 11.5, color: "#92400e",
            lineHeight: 1.65, wordBreak: "keep-all",
          }}>
            <div style={{ marginBottom: 5 }}>
              {t(E, <>Red roads (①③④⑥) = <b>weak roads</b>: usable now, but <b>ALL collapse together at minute K</b>.</>,
                    <>빨간 도로(①③④⑥) = <b>약한 도로</b>. 지금은 건널 수 있지만, <b>K분에 전부 한꺼번에 무너져요.</b></>)}
            </div>
            <div style={{ marginBottom: 5 }}>
              {t(E, <><b>6, 11, 12 = the collapse TIME (minutes)</b> — same “minutes” as road lengths (7, 10, 8…). Not one road — the time they all fall.</>,
                    <><b>6, 11, 12 = 무너지는 시각(분)</b> — 도로 길이(7·10·8…)랑 같은 ‘분’ 단위. 특정 도로가 아니라, 다 무너지는 시각이에요.</>)}
            </div>
            <div style={{ marginBottom: 5 }}>
              {t(E, <>So the 3 questions = <b>“what if they collapse at 6? at 11? at 12?”</b> — for each, how many cities can you reach before then. (Exactly as you said!)</>,
                    <>그래서 질문 3개 = <b>“6분에 무너지면? 11분에 무너지면? 12분에 무너지면?”</b> — 각 경우에 무너지기 전 몇 곳 갈 수 있나. (선생님 말씀 그대로예요!)</>)}
            </div>
            <div>
              {t(E, <>Later collapse (bigger K) = weak roads usable longer = more cities. (answer in the next sim!)</>,
                    <>늦게 무너질수록(K 큼) = 약한 도로를 더 오래 씀 = 더 많은 도시. (답은 다음 시뮬!)</>)}
            </div>
          </div>
        </div>
      )}

      {/* explanation bubble */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "8px 12px", marginTop: 8,
        fontSize: 11.5, color: "#e2e8f0", textAlign: "center", lineHeight: 1.6,
        minHeight: 34, wordBreak: "keep-all",
      }}>
        {t(E, cur.en, cur.ko)}
      </div>

      {/* legend */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 6, fontSize: 10.5, fontWeight: 700 }}>
        <span style={{ color: "#059669" }}>━━ {t(E, "road", "도로")}</span>
        <span style={{ color: "#ef4444" }}>╌╌ {t(E, "weak (collapses at K)", "약한 도로(K분에 무너짐)")}</span>
        <span style={{ color: "#8b5cf6" }}>{t(E, "①–⑥ = road number", "①–⑥ = 도로 번호")}</span>
      </div>

      {/* controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={idx === 0}
          style={{
            padding: "7px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
            border: `1px solid ${ABd}`,
            background: idx === 0 ? "#f1f5f9" : ABg,
            color: idx === 0 ? "#cbd5e1" : A,
            cursor: idx === 0 ? "default" : "pointer",
          }}>◀ {t(E, "Back", "이전")}</button>
        {idx < maxStep ? (
          <button onClick={() => setStep(s => Math.min(s + 1, maxStep))} style={{
            padding: "7px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: "none", cursor: "pointer", color: "#fff",
            background: `linear-gradient(135deg,#6d28d9,${A})`,
            boxShadow: "0 3px 12px rgba(139,92,246,.3)",
          }}>▶ {t(E, "Next", "다음")}</button>
        ) : (
          <button onClick={() => setStep(0)} style={{
            padding: "7px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {t(E, "Restart", "처음부터")}</button>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 4, fontSize: 10, color: C.dim, fontWeight: 700 }}>
        {idx + 1}/{maxStep + 1}
      </div>
    </div>
  );
}
