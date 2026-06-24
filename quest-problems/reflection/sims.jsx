// Stepped speech-bubble sims for reflection — kept OUT of components.jsx so the
// 🔒 USACO_VERIFIED code there is never touched. Illustrative-only.
// (선생님 2026-06-24: '그림 따라보며 짧은 말풍선' — checkups 스타일.)

import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

const A = "#0891b2";
const RG = ["..#.", "##.#", "####", "..##"].map(r => r.split(""));   // 공식 샘플 4×4
const RN = 4;

/* 거울 짝 4칸 묶음마다 '적은 쪽'만 바꾸면 최소 — 한 묶음씩 말풍선으로 */
function _buildReflSteps(E) {
  const steps = [{
    grp: null, k: null, contrib: null, total: 0, final: false,
    bubble: t(E,
      "To be mirror-symmetric, each group of 4 mirror cells must be ALL the same color. Per group, change just the smaller side — that's the minimum.",
      "거울 대칭이 되려면, 거울로 짝지어진 4칸이 다 같은 색이어야 해요. 묶음마다 '적은 쪽'만 바꾸면 최소예요."),
  }];
  let total = 0;
  for (let r = 0; r < RN / 2; r++) {
    for (let c = 0; c < RN / 2; c++) {
      const cells = [[r, c], [r, RN - 1 - c], [RN - 1 - r, c], [RN - 1 - r, RN - 1 - c]];
      const k = cells.filter(([a, b]) => RG[a][b] === "#").length;   // 칠해진 칸 수
      const contrib = Math.min(k, 4 - k);
      total += contrib;
      const same = (k === 0 || k === 4);
      steps.push({
        grp: cells, k, contrib, total, final: false,
        bubble: same
          ? t(E, `These 4 mirror cells: ${k} '#', ${4 - k} '·' → already all the same! (+0)`,
                `이 거울 짝 4칸: # ${k}개, · ${4 - k}개 → 이미 다 같아요! (+0)`)
          : t(E, `These 4 mirror cells: ${k} '#', ${4 - k} '·' → flip the smaller side, ${contrib} cell(s). (+${contrib})`,
                `이 거울 짝 4칸: # ${k}개, · ${4 - k}개 → 적은 쪽 ${contrib}칸만 바꾸면 다 같아져요. (+${contrib})`),
      });
    }
  }
  steps.push({
    grp: null, k: null, contrib: null, total, final: true,
    bubble: t(E, `Add up every group: ${total} flips — that's the answer!`,
                `묶음마다 더하면 ${total}번 — 이게 답이에요!`),
  });
  return steps;
}

export function ReflectionGroupSim({ E }) {
  const steps = _buildReflSteps(E);
  const { idx, safe, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const inGrp = (r, c) => st.grp && st.grp.some(([a, b]) => a === r && b === c);
  const CELL = 46;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10 }}>
        🪞 {t(E, "Minimum flips, one mirror-group at a time", "거울 짝 묶음마다 최소 뒤집기 세기")}
      </div>

      {/* 말풍선 */}
      <div style={{ position: "relative", maxWidth: 460, margin: "0 auto 14px" }}>
        <div style={{ background: st.final ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.final ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.final ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.final ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      {/* 4×4 그리드 — 현재 묶음 4칸 주황 강조 */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${RN}, ${CELL}px)`, gap: 5, justifyContent: "center", marginBottom: 12 }}>
        {RG.flatMap((row, r) => row.map((v, c) => {
          const hi = inGrp(r, c), painted = v === "#";
          return (
            <div key={r + "-" + c} style={{
              width: CELL, height: CELL, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 20,
              background: painted ? "#334155" : "#f1f5f9", color: painted ? "#fff" : "#cbd5e1",
              border: `${hi ? 3 : 1.5}px solid ${hi ? "#ea580c" : (painted ? "#334155" : "#e2e8f0")}`,
              boxShadow: hi ? "0 0 0 3px rgba(234,88,12,.2)" : "none", transition: "all .2s",
            }}>{painted ? "#" : "·"}</div>
          );
        }))}
      </div>

      {/* 묶음 계산 한 줄 */}
      <div style={{ minHeight: 26, textAlign: "center", marginBottom: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800 }}>
        {st.grp && (
          <span>
            <span style={{ color: "#334155" }}># {st.k}</span>　<span style={{ color: "#94a3b8" }}>· {4 - st.k}</span>　→　<span style={{ color: st.contrib === 0 ? "#16a34a" : "#ea580c" }}>+{st.contrib}</span>
          </span>
        )}
      </div>

      {/* 누적 */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ background: "#ecfeff", border: `1.5px solid ${A}`, color: "#0e7490", borderRadius: 999, padding: "4px 16px", fontSize: 12.5, fontWeight: 800 }}>
          {t(E, "flips so far", "지금까지 뒤집기")} <span style={{ fontSize: 17 }}>{st.total}</span>
        </div>
      </div>

      <SimNav idx={idx} total={tot} onIdx={setIdx} accent={A} showLabels isEn={E} />
    </div>
  );
}
