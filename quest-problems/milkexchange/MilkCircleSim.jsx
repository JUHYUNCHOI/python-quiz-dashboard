import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";

/* ================================================================
   MilkCircleSim — interactive circular cow exchange
   - Student presses "▶ 1 minute" to advance one step.
   - Cows arranged on a circle; arrows show pass direction.
   - Overflow cells highlighted yellow when capped.
   - Total recomputed live.
   ================================================================ */
export default function MilkCircleSim({ E }) {
  // Tiny preset: 4 cows, RRLL, all cap 2, all start full.
  const N = 4;
  const cap = useMemo(() => [2, 2, 2, 2], []);
  const dirs = useMemo(() => ["R", "R", "L", "L"], []);
  const [cur, setCur] = useState([2, 2, 2, 2]);
  const [overflowSet, setOverflowSet] = useState(new Set());
  const [minute, setMinute] = useState(0);

  const stepOne = () => {
    const next = cur.slice();
    // pass
    for (let i = 0; i < N; i++) {
      if (next[i] > 0) {
        next[i] -= 1;
        const j = (i + (dirs[i] === "R" ? 1 : -1) + N) % N;
        next[j] += 1;
      }
    }
    // overflow
    const overs = new Set();
    for (let i = 0; i < N; i++) {
      if (next[i] > cap[i]) { overs.add(i); next[i] = cap[i]; }
    }
    setCur(next);
    setOverflowSet(overs);
    setMinute(m => m + 1);
  };

  const reset = () => {
    setCur(cap.slice());
    setOverflowSet(new Set());
    setMinute(0);
  };

  // Layout cows on a circle
  const R = 78; const cx = 130; const cy = 130;
  const positions = Array.from({ length: N }, (_, i) => {
    const a = (-Math.PI / 2) + (i * 2 * Math.PI) / N;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), a };
  });

  const total = cur.reduce((a, b) => a + b, 0);
  const maxTotal = cap.reduce((a, b) => a + b, 0);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 14, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", textAlign: "center", marginBottom: 8 }}>
          {t(E, "🎮 Try it: 4 cows, directions R R L L, caps all 2", "🎮 직접 해보기: 소 4 마리, 방향 R R L L, 용량 모두 2")}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <svg width={260} height={260} style={{ background: "#fff", border: "1px solid #6ee7b7", borderRadius: 12 }}>
            {/* arrows */}
            {positions.map((p, i) => {
              const j = (i + (dirs[i] === "R" ? 1 : -1) + N) % N;
              const q = positions[j];
              const dx = q.x - p.x, dy = q.y - p.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const ux = dx / len, uy = dy / len;
              const sx = p.x + ux * 22, sy = p.y + uy * 22;
              const ex = q.x - ux * 22, ey = q.y - uy * 22;
              const faded = cur[i] === 0;
              return (
                <g key={`arr-${i}`} opacity={faded ? 0.25 : 1}>
                  <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="#10b981" strokeWidth={2} markerEnd="url(#arrowhead)" />
                </g>
              );
            })}
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#10b981" />
              </marker>
            </defs>
            {/* cows */}
            {positions.map((p, i) => {
              const isOver = overflowSet.has(i);
              return (
                <g key={`cow-${i}`}>
                  <circle cx={p.x} cy={p.y} r={20}
                    fill={isOver ? "#fef3c7" : "#ffffff"}
                    stroke={isOver ? "#fbbf24" : "#059669"} strokeWidth={2} />
                  <text x={p.x} y={p.y - 2} textAnchor="middle" fontSize={11} fontWeight={700} fill="#065f46" fontFamily="'JetBrains Mono',monospace">{cur[i]}L</text>
                  <text x={p.x} y={p.y + 11} textAnchor="middle" fontSize={9} fill="#16a34a" fontWeight={700}>{dirs[i]}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 10 }}>
          <button onClick={stepOne} style={{
            background: "#059669", color: "#fff", border: "none", borderRadius: 8,
            padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>▶ {t(E, "1 minute", "1 분")}</button>
          <button onClick={reset} style={{
            background: "#fff", color: "#059669", border: "1.5px solid #059669", borderRadius: 8,
            padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>↺ {t(E, "Reset", "처음부터")}</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: C.text }}>
          <div style={{ background: "#fff", border: "1px solid #6ee7b7", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>{t(E, "Minute", "분")}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#065f46", fontFamily: "'JetBrains Mono',monospace" }}>{minute}</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #6ee7b7", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>{t(E, "Total milk", "총 우유")}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: total < maxTotal ? "#92400e" : "#065f46", fontFamily: "'JetBrains Mono',monospace" }}>{total} L</div>
          </div>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.text, lineHeight: 1.6, textAlign: "center" }}>
          {t(E,
            "Watch how the totals drop only when a cow goes over capacity (yellow). Once the flow stabilizes, the total stops shrinking.",
            "용량 초과 (노랑) 가 생긴 분에만 총 우유가 줄어요. 흐름이 안정되면 총합도 더 안 줄어요.")}
        </div>
      </div>
    </div>
  );
}
