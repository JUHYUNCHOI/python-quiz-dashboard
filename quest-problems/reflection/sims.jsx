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
      // 실제로 바뀌는(적은 쪽) 칸 — # 가 같거나 적으면 # 칸을, 아니면 · 칸을 바꿈
      const flip = cells.filter(([a, b]) => (k <= 4 - k) ? RG[a][b] === "#" : RG[a][b] === ".");
      steps.push({
        grp: cells, flip, k, contrib, total, final: false,
        bubble: same
          ? t(E, `These 4 mirror cells: ${k} '#', ${4 - k} '·' → already all the same! (+0)`,
                `이 거울 짝 4칸: # ${k}개, · ${4 - k}개 → 이미 다 같아요! (+0)`)
          : t(E, `These 4 mirror cells: ${k} '#', ${4 - k} '·' → flip the smaller side — the ${contrib} yellow ↻ cell(s). (+${contrib})`,
                `이 거울 짝 4칸: # ${k}개, · ${4 - k}개 → 적은 쪽, 노란 ↻ ${contrib}칸만 바꾸면 다 같아져요. (+${contrib})`),
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
      bubble: t(E, "Paint cell (1, 4) — top-right.",
                   "칸 (1, 4) 을 칠해요 — 오른쪽 위.") },
    { lit: [TR, TL], focus: TL,
      bubble: t(E, "Vertical mirror: column 4 ↔ column 1 → (1, 1) must match too.",
                   "세로 거울: 열 4 ↔ 열 1 → (1, 1) 도 같아야 해요.") },
    { lit: [TR, TL, BR], focus: BR,
      bubble: t(E, "Horizontal mirror: row 1 ↔ row 4 → (4, 4) too.",
                   "가로 거울: 행 1 ↔ 행 4 → (4, 4) 도.") },
    { lit: [TR, TL, BR, BL], focus: BL,
      bubble: t(E, "Both mirrors → (4, 1). So (1,4)·(1,1)·(4,4)·(4,1) are ONE group — all the same color!",
                   "둘 다 거울 → (4, 1). 그래서 (1,4)·(1,1)·(4,4)·(4,1) 이 한 묶음 — 다 같은 색이어야 해요!") },
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
                position: "relative",
                width: CELL, height: CELL, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 20,
                background: lit ? "#334155" : "#f1f5f9", color: lit ? "#fff" : "#cbd5e1",
                border: `${foc ? 3 : 1.5}px solid ${foc ? "#ea580c" : (lit ? "#334155" : "#e2e8f0")}`,
                boxShadow: foc ? "0 0 0 3px rgba(234,88,12,.25)" : "none", transition: "all .25s",
              }}>
                <span style={{ position: "absolute", top: 2, left: 4, fontSize: 8.5, fontWeight: 700, color: foc ? "#ea580c" : (lit ? "#94a3b8" : "#b6c2cf") }}>{r + 1},{c + 1}</span>
                {lit ? "#" : "·"}
              </div>
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
  const isFlip = (r, c) => st.flip && st.flip.some(([a, b]) => a === r && b === c);  // 바뀌는(적은 쪽) 칸
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
          const hi = inGrp(r, c), painted = v === "#", flip = isFlip(r, c);
          return (
            <div key={r + "-" + c} style={{
              position: "relative",
              width: CELL, height: CELL, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 20,
              background: flip ? "#fef08a" : (painted ? "#334155" : "#f1f5f9"),
              color: flip ? "#92400e" : (painted ? "#fff" : "#cbd5e1"),
              border: `${(hi || flip) ? 3 : 1.5}px solid ${flip ? "#f59e0b" : (hi ? "#ea580c" : (painted ? "#334155" : "#e2e8f0"))}`,
              boxShadow: flip ? "0 0 0 3px rgba(245,158,11,.3)" : (hi ? "0 0 0 3px rgba(234,88,12,.2)" : "none"), transition: "all .2s",
            }}>
              {painted ? "#" : "·"}
              {flip && <span style={{ position: "absolute", top: -9, right: -7, fontSize: 11, fontWeight: 900, background: "#f59e0b", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }}>↻</span>}
            </div>
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

/* update 마다 한 묶음만 ±1 — 빠른 풀이 핵심 (선생님 2026-06-24: 처음 답 구하고 바꿀 때 +1/−1).
   공식 샘플 update (1,3)(2,3)(4,3)(4,4)(4,4) → 답 4→3→2→1→0→1. */
const _UPDATES = [[1, 3], [2, 3], [4, 3], [4, 4], [4, 4]];

function _buildUpdateSteps(E) {
  const N = RN;
  const grid = RG.map(row => row.slice());   // 0-idx mutable (RG 는 이미 2D 문자배열)
  const cntOf = cells => cells.filter(([a, b]) => grid[a][b] === "#").length;
  const cost = k => Math.min(k, 4 - k);
  let total = 0;
  for (let r = 0; r < N / 2; r++) for (let c = 0; c < N / 2; c++) total += cost(cntOf([[r, c], [r, N - 1 - c], [N - 1 - r, c], [N - 1 - r, N - 1 - c]]));
  const steps = [{
    kind: "init", grid: grid.map(r => r.join("")), toggle: null, group: null, total, delta: null, prev: null,
    bubble: t(E, `Find the first answer once: sum of each group's smaller side = ${total}. Now when a cell flips — only its ONE group changes.`,
                 `처음 답을 한 번만 구해요: 묶음마다 적은 쪽 합 = ${total}. 이제 칸이 바뀔 때마다 — 건드린 묶음 하나만 다시 보면 돼요.`),
  }];
  _UPDATES.forEach(([r1, c1]) => {
    const r = r1 - 1, c = c1 - 1;
    const cells = [[r, c], [r, N - 1 - c], [N - 1 - r, c], [N - 1 - r, N - 1 - c]];
    const before = cntOf(cells), costB = cost(before);
    grid[r][c] = grid[r][c] === "#" ? "." : "#";   // 토글
    const after = cntOf(cells), costA = cost(after), delta = costA - costB; total += delta;
    steps.push({
      kind: "upd", grid: grid.map(rr => rr.join("")), toggle: [r, c], group: cells, before, after, costB, costA, delta, total, prev: total - delta,
      bubble: t(E,
        `Flip (${r1}, ${c1}) → its group goes #${before}→${after}, cost ${costB}→${costA}. Total ${total - delta} ${delta >= 0 ? "+" : "−"} ${Math.abs(delta)} = ${total}.`,
        `(${r1}, ${c1}) 칸을 바꿔요 → 그 묶음 #${before}→${after}, 비용 ${costB}→${costA}. 답 ${total - delta} ${delta >= 0 ? "+" : "−"} ${Math.abs(delta)} = ${total}.`),
    });
  });
  return steps;
}

export function ReflectionUpdateSim({ E }) {
  const steps = _buildUpdateSteps(E);
  const { idx, safe, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const CELL = 44;
  const inGroup = (r, c) => st.group && st.group.some(([a, b]) => a === r && b === c);
  const isToggle = (r, c) => st.toggle && st.toggle[0] === r && st.toggle[1] === c;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10 }}>
        ⚡ {t(E, "Each flip changes ONE group → answer ±1", "한 번 바꿀 때마다 한 묶음만 → 답 ±1")}
      </div>

      <div style={{ position: "relative", maxWidth: 470, margin: "0 auto 14px" }}>
        <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 12, padding: "11px 14px", fontSize: 12.5, color: "#92400e", lineHeight: 1.6, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "9px solid #fbbf24" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${RN}, ${CELL}px)`, gap: 5, justifyContent: "center", marginBottom: 12 }}>
        {st.grid.flatMap((row, r) => row.split("").map((v, c) => {
          const painted = v === "#", grp = inGroup(r, c), tog = isToggle(r, c);
          return (
            <div key={r + "-" + c} style={{
              position: "relative",
              width: CELL, height: CELL, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 19,
              background: tog ? "#fef08a" : (painted ? "#334155" : "#f1f5f9"),
              color: tog ? "#92400e" : (painted ? "#fff" : "#cbd5e1"),
              border: `${(grp || tog) ? 3 : 1.5}px solid ${tog ? "#f59e0b" : (grp ? "#ea580c" : (painted ? "#334155" : "#e2e8f0"))}`,
              boxShadow: tog ? "0 0 0 3px rgba(245,158,11,.3)" : (grp ? "0 0 0 3px rgba(234,88,12,.18)" : "none"), transition: "all .2s",
            }}>
              {painted ? "#" : "·"}
              {tog && <span style={{ position: "absolute", top: -9, right: -7, fontSize: 11, fontWeight: 900, background: "#f59e0b", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }}>↻</span>}
            </div>
          );
        }))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ background: "#fff7ed", border: `1.5px solid ${A}`, color: "#0e7490", borderRadius: 999, padding: "4px 16px", fontSize: 12.5, fontWeight: 800 }}>
          {t(E, "answer", "답")} <span style={{ fontSize: 17 }}>{st.total}</span>
          {st.delta != null && <span style={{ marginLeft: 7, color: st.delta > 0 ? "#16a34a" : "#dc2626" }}>({st.prev} {st.delta >= 0 ? "+" : "−"} {Math.abs(st.delta)})</span>}
        </div>
      </div>

      <SimNav idx={idx} total={tot} onIdx={setIdx} accent={A} showLabels isEn={E} />
    </div>
  );
}
