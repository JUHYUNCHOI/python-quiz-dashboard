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
      "4-cell mirror groups must be ONE color. Flip only the minority color — that's the fewest.",
      "묶음 4 칸이 다 같은 색이어야 대칭. 적은 쪽 색만 뒤집으면 최소예요."),
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
          ? t(E, `Already same color → +0`,
                `이미 같은 색 → +0`)
          : t(E, `Flip the minority (${contrib} cell${contrib === 1 ? "" : "s"}) → +${contrib}`,
                `적은 쪽 ${contrib} 칸만 뒤집기 → +${contrib}`),
      });
    }
  }
  steps.push({
    grp: null, k: null, contrib: null, total, final: true,
    bubble: t(E, `Sum of all groups = ${total} — that's the answer!`,
                `묶음마다 더하면 ${total} — 이게 답!`),
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

  // 말풍선 꼬리 위치: 현재 focus 칸의 열/행 중심
  const focusCol = st.focus ? st.focus[1] : null;
  const focusRow = st.focus ? st.focus[0] : null;
  const tailX = focusCol !== null ? focusCol * (CELL + GAP) + CELL / 2 : W / 2;
  const leaderH = (focusRow != null && focusRow > 0) ? focusRow * (CELL + GAP) - 4 : 0;
  const bubbleColor = st.done ? "#6ee7b7" : "#fbbf24";

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10 }}>
        🪞 {t(E, "The mirror rule — 4 cells move together", "거울 규칙 — 4칸이 같이 움직여요")}
      </div>

      {/* 말풍선 (꼬리는 그리드 컨테이너로 이동 — 정확한 열 정렬을 위해) */}
      <div style={{ maxWidth: 460, margin: "0 auto 6px" }}>
        <div style={{ background: st.done ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${bubbleColor}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.done ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
      </div>

      {/* 꼬리 + 그리드 — 같은 컨테이너(width: W)라서 열 위치 정확 */}
      <div style={{ position: "relative", width: W, margin: "0 auto 14px" }}>
        {/* 꼬리 (그리드 위) */}
        <div style={{ position: "absolute", left: tailX - 8, top: -9,
          width: 0, height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: `9px solid ${bubbleColor}`,
          transition: "left .3s ease-out",
          zIndex: 3,
        }} />
        {/* 세로 리더 선 — focus 칸까지 내려감 */}
        {leaderH > 0 && (
          <div style={{ position: "absolute", left: tailX - 1, top: 2,
            width: 0, height: leaderH,
            borderLeft: `2px dashed ${bubbleColor}`,
            transition: "left .3s ease-out, height .3s ease-out",
            pointerEvents: "none",
            zIndex: 3,
          }} />
        )}
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
  const CELL = 46, GAP = 5;
  const W = RN * CELL + (RN - 1) * GAP;

  // 말풍선 꼬리 위치: 뒤집힐 칸 쪽으로 (뒤집힐 게 없으면 묶음 anchor, 그룹 없으면 중앙)
  const focusCell = (st.flip && st.flip.length > 0)
    ? st.flip[0]
    : (st.grp ? st.grp[0] : null);
  const focusCol = focusCell ? focusCell[1] : null;
  const focusRow = focusCell ? focusCell[0] : null;
  const tailX = focusCol !== null ? focusCol * (CELL + GAP) + CELL / 2 : W / 2;
  const leaderH = (focusRow != null && focusRow > 0) ? focusRow * (CELL + GAP) - 4 : 0;
  const bubbleColor = st.final ? "#6ee7b7" : "#fbbf24";

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10 }}>
        🪞 {t(E, "Minimum flips, one mirror-group at a time", "거울 짝 묶음마다 최소 뒤집기 세기")}
      </div>

      {/* 말풍선 (꼬리는 그리드 컨테이너로) */}
      <div style={{ maxWidth: 460, margin: "0 auto 6px" }}>
        <div style={{ background: st.final ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${bubbleColor}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.final ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
      </div>

      {/* 꼬리 + 4×4 그리드 — 같은 컨테이너(width: W)라서 열 정렬 정확 */}
      <div style={{ position: "relative", width: W, margin: "0 auto 12px" }}>
        <div style={{ position: "absolute", left: tailX - 8, top: -9,
          width: 0, height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: `9px solid ${bubbleColor}`,
          transition: "left .3s ease-out",
          zIndex: 3,
        }} />
        {/* 세로 리더 선 — focus 칸까지 */}
        {leaderH > 0 && (
          <div style={{ position: "absolute", left: tailX - 1, top: 2,
            width: 0, height: leaderH,
            borderLeft: `2px dashed ${bubbleColor}`,
            transition: "left .3s ease-out, height .3s ease-out",
            pointerEvents: "none",
            zIndex: 3,
          }} />
        )}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${RN}, ${CELL}px)`, gap: GAP }}>
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
      </div>

      {/* 묶음 계산 한 줄 */}
      <div style={{ minHeight: 26, textAlign: "center", marginBottom: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800 }}>
        {st.grp && (
          <span>
            <span style={{ color: "#334155" }}># {st.k}</span> <span style={{ color: "#94a3b8" }}>· {4 - st.k}</span>
            <span style={{ color: C.dim, fontWeight: 600 }}>　→　{t(E, "all#", "다#")}:{4 - st.k} / {t(E, "all·", "다·")}:{st.k}　→　</span>
            <span style={{ color: st.contrib === 0 ? "#16a34a" : "#ea580c" }}>min = +{st.contrib}</span>
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
    kind: "init", phase: "init", fi: 0, grid: grid.map(r => r.join("")), toggle: null, group: null, total, delta: null, prev: null,
    bubble: t(E, `Find the first answer once: sum of each group's smaller side = ${total}. Now when a cell flips — only its ONE group changes.`,
                 `처음 답을 한 번만 구해요: 묶음마다 적은 쪽 합 = ${total}. 이제 칸이 바뀔 때마다 — 건드린 묶음 하나만 다시 보면 돼요.`),
  }];
  let fi = 0;
  _UPDATES.forEach(([r1, c1]) => {
    fi++;
    const r = r1 - 1, c = c1 - 1;
    const cells = [[r, c], [r, N - 1 - c], [N - 1 - r, c], [N - 1 - r, N - 1 - c]];
    const before = cntOf(cells), costB = cost(before);
    const wasPainted = grid[r][c] === "#";
    // ── 스텝 A: 바꾸기 직전 (옛 값 그대로, '이 칸 바꿀 거예요' 펄스) ──
    steps.push({
      kind: "upd", phase: "pre", grid: grid.map(rr => rr.join("")), toggle: [r, c], group: cells,
      fi, before, costB, total, delta: null, prev: null, wasPainted,
      bubble: t(E,
        `About to flip (${r1}, ${c1})${wasPainted ? " (erase #)" : " (paint #)"}. Right now this group is #${before}, cost ${costB}. Press ▶.`,
        `(${r1}, ${c1}) 칸을 바꿀 거예요${wasPainted ? " (# 지우기)" : " (# 칠하기)"}. 지금 이 묶음은 #${before}, 비용 ${costB}. ▶ 눌러봐요.`),
    });
    // ── 토글 ──
    grid[r][c] = wasPainted ? "." : "#";
    const after = cntOf(cells), costA = cost(after), delta = costA - costB, prev = total; total += delta;
    // ── 스텝 B: 바뀜 (새 값 + 펑! + 답 ±delta) ──
    steps.push({
      kind: "upd", phase: "post", grid: grid.map(rr => rr.join("")), toggle: [r, c], group: cells,
      fi, before, after, costB, costA, delta, total, prev,
      bubble: t(E,
        `Flipped! This group #${before}→${after}, cost ${costB}→${costA}. Answer ${prev} ${delta >= 0 ? "+" : "−"} ${Math.abs(delta)} = ${total}.`,
        `바뀌었어요! 이 묶음 #${before}→${after}, 비용 ${costB}→${costA}. 답 ${prev} ${delta >= 0 ? "+" : "−"} ${Math.abs(delta)} = ${total}.`),
    });
  });
  return steps;
}

export function ReflectionUpdateSim({ E }) {
  const steps = _buildUpdateSteps(E);
  const { idx, safe, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  // 답(최소 변경) 시퀀스: 처음 + 플립마다 = 4→3→2→1→0→1
  const ansSeq = [steps[0].total, ...steps.filter(s => s.phase === "post").map(s => s.total)];
  const tlShown = st.phase === "post" ? st.fi + 1 : (st.phase === "pre" ? st.fi : 1);
  const tlCur = st.phase === "post" ? st.fi : (st.phase === "pre" ? st.fi - 1 : 0);
  const CELL = 44, GAP = 5;
  const W = RN * CELL + (RN - 1) * GAP;
  const inGroup = (r, c) => st.group && st.group.some(([a, b]) => a === r && b === c);
  const isToggle = (r, c) => st.toggle && st.toggle[0] === r && st.toggle[1] === c;

  // 말풍선 꼬리 위치: 뒤집힌 칸의 열/행 중심 (init 스텝은 중앙)
  const focusCol = st.toggle ? st.toggle[1] : null;
  const focusRow = st.toggle ? st.toggle[0] : null;
  const tailX = focusCol !== null ? focusCol * (CELL + GAP) + CELL / 2 : W / 2;
  const leaderH = (focusRow != null && focusRow > 0) ? focusRow * (CELL + GAP) - 4 : 0;

  return (
    <div style={{ padding: 16 }}>
      <style>{`
        @keyframes reflPop { 0%{transform:scale(.55);} 55%{transform:scale(1.22);} 100%{transform:scale(1);} }
        @keyframes reflPulse { 0%,100%{box-shadow:0 0 0 3px rgba(245,158,11,.35);} 50%{box-shadow:0 0 0 7px rgba(245,158,11,.12);} }
      `}</style>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10 }}>
        ⚡ {t(E, "Each flip changes ONE group → answer ±1", "한 번 바꿀 때마다 한 묶음만 → 답 ±1")}
      </div>

      {/* 답(최소 변경) 타임라인 — 플립마다 채워짐: 4→3→2→1→0→1 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: C.dim, marginRight: 3, wordBreak: "keep-all" }}>{t(E, "min changes", "최소 변경")}</span>
        {ansSeq.map((v, i) => {
          const shown = i < tlShown, isCur = i === tlCur;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {i > 0 && <span style={{ color: shown ? A : "#cbd5e1", fontWeight: 800, fontSize: 12 }}>→</span>}
              <div style={{
                minWidth: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 14,
                background: isCur ? A : (shown ? "#ecfeff" : "#f8fafc"),
                color: isCur ? "#fff" : (shown ? "#0e7490" : "#cbd5e1"),
                border: `1.5px solid ${isCur ? A : (shown ? "#a5f3fc" : C.border)}`,
                boxShadow: isCur ? "0 0 0 3px rgba(8,145,178,.2)" : "none", transition: "all .2s",
              }}>{shown ? v : "·"}</div>
            </div>
          );
        })}
      </div>

      {/* 말풍선 (꼬리는 그리드 컨테이너로) */}
      <div style={{ maxWidth: 470, margin: "0 auto 6px" }}>
        <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 12, padding: "11px 14px", fontSize: 12.5, color: "#92400e", lineHeight: 1.6, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
      </div>

      {/* 꼬리 + 그리드 — 같은 컨테이너(width: W) */}
      <div style={{ position: "relative", width: W, margin: "0 auto 12px" }}>
        <div style={{ position: "absolute", left: tailX - 8, top: -9,
          width: 0, height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "9px solid #fbbf24",
          transition: "left .3s ease-out",
          zIndex: 3,
        }} />
        {/* 세로 리더 선 — focus 칸까지 */}
        {leaderH > 0 && (
          <div style={{ position: "absolute", left: tailX - 1, top: 2,
            width: 0, height: leaderH,
            borderLeft: "2px dashed #fbbf24",
            transition: "left .3s ease-out, height .3s ease-out",
            pointerEvents: "none",
            zIndex: 3,
          }} />
        )}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${RN}, ${CELL}px)`, gap: GAP }}>
        {st.grid.flatMap((row, r) => row.split("").map((v, c) => {
          const painted = v === "#", grp = inGroup(r, c), tog = isToggle(r, c);
          const pre = tog && st.phase === "pre";
          const post = tog && st.phase === "post";
          return (
            <div key={post ? `pop-${safe}-${r}-${c}` : `${r}-${c}`} style={{
              position: "relative",
              width: CELL, height: CELL, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 19,
              background: tog ? "#fef08a" : (painted ? "#334155" : "#f1f5f9"),
              color: tog ? "#92400e" : (painted ? "#fff" : "#cbd5e1"),
              border: `${(grp || tog) ? 3 : 1.5}px ${pre ? "dashed" : "solid"} ${tog ? "#f59e0b" : (grp ? "#ea580c" : (painted ? "#334155" : "#e2e8f0"))}`,
              boxShadow: (tog && !pre) ? "0 0 0 3px rgba(245,158,11,.3)" : (grp && !tog ? "0 0 0 3px rgba(234,88,12,.18)" : "none"),
              transition: "all .2s",
              animation: post ? "reflPop .4s ease-out" : (pre ? "reflPulse 1.1s ease-in-out infinite" : "none"),
            }}>
              {painted ? "#" : "·"}
              {post && <span style={{ position: "absolute", top: -9, right: -7, fontSize: 11, fontWeight: 900, background: "#f59e0b", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }}>↻</span>}
              {pre && <span style={{ position: "absolute", top: -11, right: -9, fontSize: 14 }}>✋</span>}
            </div>
          );
        }))}
        </div>
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

/* 브루트포스: 뒤집기 1번 → 4묶음 다 다시 세기 = 16칸 스캔. U번 반복 → 시간초과 (선생님 2026-07-02). */
function _buildBruteSteps(E) {
  // 샘플 (1,3) 뒤집기 = (r=0, c=2) 토글
  const before = RG.map(r => [...r]);
  const after = RG.map(r => [...r]);
  after[0][2] = after[0][2] === "#" ? "." : "#";
  // 4 거울 묶음 (좌상→우상→좌하→우하 순회)
  const groups = [];
  for (let r = 0; r < RN / 2; r++) {
    for (let c = 0; c < RN / 2; c++) {
      groups.push([[r, c], [r, RN - 1 - c], [RN - 1 - r, c], [RN - 1 - r, RN - 1 - c]]);
    }
  }
  const steps = [
    { phase: "before", grid: before, flipCell: null,
      bubble: t(E,
        "Original grid — we already found answer = 4 by counting the 4 groups.",
        "원래 그림 — 묶음 4 개를 세어 답 = 4 를 이미 구했어요.") },
    { phase: "flip", grid: after, flipCell: [0, 2],
      bubble: t(E,
        "Bessie flipped (1, 3). New answer = ? Brute force: recount every group from scratch.",
        "Bessie 가 (1, 3) 을 뒤집었어요. 새 답 = ? 브루트포스: 4 묶음 다 처음부터 다시 세요.") },
  ];
  let cumul = 0;
  groups.forEach((cells, gi) => {
    const k = cells.filter(([a, b]) => after[a][b] === "#").length;
    const contrib = Math.min(k, 4 - k);
    cumul += contrib;
    steps.push({
      phase: "scan", grid: after, flipCell: null,
      group: cells, gi, k, contrib, cumul, scanned: (gi + 1) * 4,
      bubble: t(E,
        `Group ${gi + 1}: #${k} · ${4 - k} → min = +${contrib}. (scanned ${(gi + 1) * 4}/16)`,
        `묶음 ${gi + 1}: #${k} · ${4 - k} → 최소 = +${contrib}. (다시 센 칸 ${(gi + 1) * 4}/16)`),
    });
  });
  steps.push({
    phase: "done", grid: after, flipCell: null, cumul, scanned: 16,
    bubble: t(E,
      `Answer = ${cumul}. But we re-scanned ALL 16 cells for just ONE flip. U = 200,000 × N² = 4,000,000 → 8×10¹¹ ops → time-limit exceeded.`,
      `답 = ${cumul}. 근데 뒤집기 1 번에 16 칸을 다 훑었어요. U = 200,000 × N² = 4,000,000 → 8×10¹¹ 연산 → 시간 초과.`),
  });
  return steps;
}

export function ReflectionBruteSim({ E }) {
  const steps = _buildBruteSteps(E);
  const { idx, safe, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const CELL = 46, GAP = 5;
  const W = RN * CELL + (RN - 1) * GAP;
  const inGroup = (r, c) => st.group && st.group.some(([a, b]) => a === r && b === c);
  const isFlip = (r, c) => st.flipCell && st.flipCell[0] === r && st.flipCell[1] === c;
  const isDone = st.phase === "done";
  const bubbleColor = isDone ? "#ef4444" : "#fbbf24";

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>
        🐌 {t(E, "Brute force — recount ALL groups every flip", "브루트포스 — 뒤집기마다 4 묶음 다시 세기")}
      </div>

      {/* 말풍선 */}
      <div style={{ maxWidth: 470, margin: "0 auto 6px" }}>
        <div style={{ background: isDone ? "#fef2f2" : "#fffbeb", border: `1.5px solid ${bubbleColor}`, borderRadius: 12, padding: "11px 14px", fontSize: 12.5, color: isDone ? "#7f1d1d" : "#92400e", lineHeight: 1.6, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
      </div>

      {/* 그리드 */}
      <div style={{ position: "relative", width: W, margin: "0 auto 12px" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${RN}, ${CELL}px)`, gap: GAP }}>
          {st.grid.flatMap((row, r) => row.map((v, c) => {
            const painted = v === "#", grp = inGroup(r, c), flip = isFlip(r, c);
            return (
              <div key={`${r}-${c}`} style={{
                position: "relative",
                width: CELL, height: CELL, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 20,
                background: flip ? "#fef08a" : (painted ? "#334155" : "#f1f5f9"),
                color: flip ? "#92400e" : (painted ? "#fff" : "#cbd5e1"),
                border: `${(grp || flip) ? 3 : 1.5}px solid ${flip ? "#f59e0b" : (grp ? "#ea580c" : (painted ? "#334155" : "#e2e8f0"))}`,
                boxShadow: grp ? "0 0 0 3px rgba(234,88,12,.25)" : (flip ? "0 0 0 3px rgba(245,158,11,.3)" : "none"),
                transition: "all .2s",
              }}>
                {painted ? "#" : "·"}
                {flip && <span style={{ position: "absolute", top: -9, right: -7, fontSize: 11, fontWeight: 900, background: "#f59e0b", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }}>↻</span>}
              </div>
            );
          }))}
        </div>
      </div>

      {/* 스캔 카운터 + 누적 답 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ background: "#fef2f2", border: `1.5px solid #ef4444`, color: "#991b1b", borderRadius: 999, padding: "4px 14px", fontSize: 12.5, fontWeight: 800 }}>
          🔁 {t(E, "cells re-scanned", "다시 센 칸")} <span style={{ fontSize: 16 }}>{st.scanned ?? 0}/16</span>
        </div>
        {(st.phase === "scan" || st.phase === "done") && (
          <div style={{ background: "#ecfeff", border: `1.5px solid ${A}`, color: "#0e7490", borderRadius: 999, padding: "4px 14px", fontSize: 12.5, fontWeight: 800 }}>
            {t(E, "sum", "합")} <span style={{ fontSize: 16 }}>{st.cumul ?? 0}</span>
          </div>
        )}
      </div>

      <SimNav idx={idx} total={tot} onIdx={setIdx} accent="#dc2626" showLabels isEn={E} />
    </div>
  );
}
