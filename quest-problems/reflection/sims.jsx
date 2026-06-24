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

/* 도입: 대칭 규칙을 그림으로 — 한 칸 칠하면 거울로 3칸이 따라온다 (선생님 2026-06-24). */
function _buildRuleSteps(E) {
  // 네 귀퉁이가 한 거울 묶음 — 한 칸씩 켜며 보여줌 (TR→TL→BR→BL)
  const TR = [0, 3], TL = [0, 0], BR = [3, 3], BL = [3, 0];
  return [
    { lit: [], focus: null,
      bubble: t(E, "Split the canvas with a vertical + horizontal center line → 4 quadrants. Paint one quadrant; the rest must MIRROR it.",
                   "캔버스를 가로·세로 가운데 선으로 → 4분면으로 나눠요. 한 분면을 칠하면, 나머지는 거울처럼 따라와야 해요.") },
    { lit: [TR], focus: TR,
      bubble: t(E, "Paint one cell in the top-right quadrant…",
                   "오른쪽 위 분면에 한 칸을 칠하면…") },
    { lit: [TR, TL], focus: TL,
      bubble: t(E, "Vertical mirror → the top-LEFT twin must match too.",
                   "세로 가운데 선 거울 → 왼쪽 위 짝도 같아야 해요.") },
    { lit: [TR, TL, BR], focus: BR,
      bubble: t(E, "Horizontal mirror → the bottom-RIGHT twin too.",
                   "가로 가운데 선 거울 → 오른쪽 아래 짝도.") },
    { lit: [TR, TL, BR, BL], focus: BL,
      bubble: t(E, "Both mirrors → the bottom-LEFT twin. These 4 are ONE group — all must be the same color!",
                   "둘 다 거울 → 왼쪽 아래 짝까지. 이 4칸이 한 묶음 — 다 같은 색이어야 대칭이에요!") },
    { lit: [TR, TL, BR, BL], focus: null, done: true,
      bubble: t(E, "Bessie messed up some cells, so groups don't match. Goal: fix it with the FEWEST flips. (count next →)",
                   "Bessie 가 칸을 바꿔놔서 묶음이 안 맞을 수 있어요. 그걸 최소 횟수로 고치는 게 문제예요. (다음 화면에서 세요 →)") },
  ];
}

export function ReflectionRuleSim({ E }) {
  const steps = _buildRuleSteps(E);
  const { idx, safe, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const CELL = 46, GAP = 5;
  const isLit = (r, c) => st.lit.some(([a, b]) => a === r && b === c);
  const isFocus = (r, c) => st.focus && st.focus[0] === r && st.focus[1] === c;
  const W = RN * CELL + (RN - 1) * GAP;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10 }}>
        🪞 {t(E, "The mirror rule — 4 cells move together", "거울 규칙 — 4칸이 같이 움직여요")}
      </div>

      {/* 말풍선 */}
      <div style={{ position: "relative", maxWidth: 460, margin: "0 auto 14px" }}>
        <div style={{ background: st.done ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.done ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.done ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.done ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      {/* 그리드 + 가운데 거울 선 */}
      <div style={{ position: "relative", width: W, margin: "0 auto 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${RN}, ${CELL}px)`, gap: GAP }}>
          {Array.from({ length: RN }).flatMap((_, r) => Array.from({ length: RN }).map((__, c) => {
            const lit = isLit(r, c), foc = isFocus(r, c);
            return (
              <div key={r + "-" + c} style={{
                width: CELL, height: CELL, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 20,
                background: lit ? "#334155" : "#f1f5f9", color: lit ? "#fff" : "#cbd5e1",
                border: `${foc ? 3 : 1.5}px solid ${foc ? "#ea580c" : (lit ? "#334155" : "#e2e8f0")}`,
                boxShadow: foc ? "0 0 0 3px rgba(234,88,12,.25)" : "none", transition: "all .25s",
              }}>{lit ? "#" : "·"}</div>
            );
          }))}
        </div>
        {/* 세로·가로 가운데 거울 선 */}
        <div style={{ position: "absolute", left: "50%", top: -3, bottom: -3, width: 0, borderLeft: "2px dashed #22d3ee", transform: "translateX(-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: -3, right: -3, height: 0, borderTop: "2px dashed #22d3ee", transform: "translateY(-50%)", pointerEvents: "none" }} />
      </div>

      <SimNav idx={idx} total={tot} onIdx={setIdx} accent={A} showLabels isEn={E} />
    </div>
  );
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
