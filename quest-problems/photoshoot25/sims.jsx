// Photoshoot (Dec 2025 Bronze #3) 용 새 시뮬 — 🔒 USACO_VERIFIED 인 components.jsx 는
// 건드리지 않고 여기에만 둔다 (checkups / mooin3 와 같은 방식).
//
// 이 문제는 핵심이 통째로 '그림' 이라 글로 쓰면 손해다:
//   ① K×K 창을 밀면서 합을 보는 것
//   ② 한 칸이 커지면 *그 칸을 품은 창* 만 바뀐다는 것 (그 창들의 왼쪽위가 직사각형)
// 그래서 시뮬 두 개로 나눴다. (선생님 2026-07-30: Dec 2025 부터 mooin3 수준으로)

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#8b5cf6";

/* 격자 한 칸 크기 — 두 시뮬이 같은 값을 써야 눈이 안 헷갈린다. */
const CELL = 34, GAP = 3, PITCH = CELL + GAP;
const gridW = (n) => n * CELL + (n - 1) * GAP;

/* 말풍선 — 격자 위에 떠서 꼬리로 가리킨다. mooin3 와 같은 모양.
   (선생님: "우리 화면 위에 올라가 있는게 말풍선이지") */
function Bubble({ cx, rowW, bg, bd, fg, children, width = 320 }) {
  const left = Math.max(-30, Math.min(cx - width / 2, rowW - width + 30));
  const tail = cx - left;
  return (
    <div style={{ position: "absolute", bottom: 14, left, width }}>
      <div style={{
        padding: "8px 12px", borderRadius: 10, background: bg,
        border: `1.5px solid ${bd}`, color: fg, fontSize: 12, fontWeight: 700,
        textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6,
      }}>{children}</div>
      <div style={{
        position: "absolute", top: "100%", left: tail, transform: "translateX(-50%)",
        width: 0, height: 0, borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent", borderTop: `8px solid ${bd}`,
      }} />
      <div style={{
        position: "absolute", top: "100%", left: tail, transform: "translateX(-50%)",
        width: 0, height: 0, marginTop: -1.6, borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent", borderTop: `7px solid ${bg}`,
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PhotoWindowSim — "사진 한 장의 점수" 가 뭔지부터.
   5×5 격자에서 3×3 창을 왼쪽위부터 한 칸씩 밀며 합을 보여주고,
   지금까지의 최고를 들고 간다.  창이 (N−K+1)² 개라는 것도 여기서 몸으로.
   ═══════════════════════════════════════════════════════════════ */
export function PhotoWindowSim({ E }) {
  const N = 5, K = 3;
  const W = N - K + 1;                       // 한 변의 창 개수
  // 고정 예제 — 최고 창이 한눈에 안 보이게(오른쪽 아래) 배치
  const g = [
    [1, 0, 2, 0, 1],
    [0, 3, 0, 1, 0],
    [2, 0, 1, 0, 4],
    [0, 1, 0, 5, 0],
    [1, 0, 2, 0, 3],
  ];
  const sum = (i, j) => {
    let s = 0;
    for (let r = i; r < i + K; r++) for (let c = j; c < j + K; c++) s += g[r][c];
    return s;
  };

  const steps = [{ kind: "intro" }];
  let best = -1, bestAt = null;
  for (let i = 0; i < W; i++) {
    for (let j = 0; j < W; j++) {
      const v = sum(i, j);
      const isNew = v > best;
      if (isNew) { best = v; bestAt = [i, j]; }
      steps.push({ kind: "win", i, j, v, best, bestAt, isNew });
    }
  }
  steps.push({ kind: "final", best, bestAt });

  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const ROW_W = gridW(N);

  const inWin = (r, c) =>
    s.kind === "win" && r >= s.i && r < s.i + K && c >= s.j && c < s.j + K;
  const inBest = (r, c) => {
    const b = s.bestAt;
    return !!b && r >= b[0] && r < b[0] + K && c >= b[1] && c < b[1] + K;
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, `${N}×${N} field, ${K}×${K} photo`, `${N}×${N} 들판, ${K}×${K} 사진`)}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />

      {/* 말풍선 무대 */}
      <div style={{ position: "relative", width: ROW_W, height: 92, margin: "0 auto" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          {s.kind === "intro" && (
            <Bubble cx={ROW_W / 2} rowW={ROW_W} bg="#f5f3ff" bd="#c4b5fd" fg="#5b21b6">
              {t(E, <>A photo is any <b>{K}×{K}</b> square. Its score = sum inside. Slide it everywhere.</>,
                    <>사진은 아무 <b>{K}×{K}</b> 정사각형. 점수 = 안에 든 값의 합. 다 밀어봐요.</>)}
            </Bubble>
          )}
          {s.kind === "win" && (
            <Bubble cx={(s.j + K / 2) * PITCH - GAP / 2} rowW={ROW_W}
              bg={s.isNew ? "#ecfdf5" : "#f5f3ff"} bd={s.isNew ? "#86efac" : "#c4b5fd"}
              fg={s.isNew ? "#15803d" : "#5b21b6"}>
              {t(E, <>top-left ({s.i + 1}, {s.j + 1}) → score <b>{s.v}</b></>,
                    <>왼쪽위 ({s.i + 1}, {s.j + 1}) → 점수 <b>{s.v}</b></>)}
              <br />
              {s.isNew
                ? t(E, <>new best! <b>{s.best}</b></>, <>최고 기록! <b>{s.best}</b></>)
                : t(E, <>best stays <b>{s.best}</b></>, <>최고는 <b>{s.best}</b> 그대로</>)}
            </Bubble>
          )}
          {s.kind === "final" && (
            <Bubble cx={ROW_W / 2} rowW={ROW_W} bg="#ecfdf5" bd="#86efac" fg="#15803d">
              {t(E, <>Checked all <b>{W}×{W} = {W * W}</b> photos. Best = <b>{s.best}</b>.</>,
                    <>창 <b>{W}×{W} = {W * W}</b> 개를 다 봤어요. 최고 = <b>{s.best}</b>.</>)}
            </Bubble>
          )}
        </div>
      </div>

      {/* 격자 */}
      <div style={{ width: ROW_W, margin: "0 auto 10px" }}>
        {g.map((row, r) => (
          <div key={r} style={{ display: "flex", gap: GAP, marginBottom: GAP }}>
            {row.map((v, c) => {
              const cur = inWin(r, c), bst = inBest(r, c);
              return (
                <div key={c} style={{
                  width: CELL, height: CELL, display: "flex", alignItems: "center",
                  justifyContent: "center", borderRadius: 6,
                  fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 14,
                  background: cur ? "#ede9fe" : bst ? "#dcfce7" : "#fff",
                  border: `${cur ? 2 : 1}px solid ${cur ? A : bst ? "#86efac" : "#e2e8f0"}`,
                  color: v === 0 ? "#cbd5e1" : "#1f2937",
                  transition: "all .12s",
                }}>{v}</div>
              );
            })}
          </div>
        ))}
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PhotoUpdateSim — 이 문제의 진짜 핵심.
   한 칸이 커지면 *그 칸을 품은 창* 만 점수가 바뀐다.
   그리고 그 창들의 '왼쪽위 좌표' 가 마침 직사각형을 이룬다:
       max(1, r−K+1) ≤ i ≤ min(r, W)   (열도 같은 식)
   → 매번 전부 더할 필요 없이 그 직사각형만 += delta.
   ═══════════════════════════════════════════════════════════════ */
export function PhotoUpdateSim({ E }) {
  const N = 8, K = 3;
  const r = 4, c = 4;
  const FRAME = K * CELL + (K - 1) * GAP;

  const steps = [
    { kind: "intro" },
    { kind: "one" },     // 사진 하나: 소 담김 ✓
    { kind: "two" },     // 겹치는 두 사진이 소를 공유 → '한 장이 아니다'
    { kind: "miss" },    // 소 밖 → 안 바뀜 ✗
    { kind: "count" },   // 밀어도 소가 안 빠지는 자리 9곳 → 9장
    { kind: "done" },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const GREEN = "#16a34a", BLUE = "#2563eb", RED = "#dc2626";
  const tintOf = (col) => col === GREEN ? "#dcfce7" : col === BLUE ? "#dbeafe" : "#fee2e2";

  const frames =
    s.kind === "one"  ? [{ ti: 4, tj: 4, col: GREEN, label: t(E, "photo ✓", "사진 ✓") }]
  : s.kind === "two"  ? [{ ti: 2, tj: 2, col: GREEN, label: t(E, "photo 1", "사진 1") },
                         { ti: 4, tj: 4, col: BLUE,  label: t(E, "photo 2", "사진 2") }]
  : s.kind === "miss" ? [{ ti: 5, tj: 5, col: RED,   label: t(E, "photo ✗", "사진 ✗") }]
  : [];
  const isCount = s.kind === "count" || s.kind === "done";
  // 소를 담는 3×3 의 '가운데'가 될 수 있는 자리 = 세로 3..5, 가로 3..5 (소 둘레 9곳)
  const isCenter = (R, Cc) => isCount && R >= 3 && R <= 5 && Cc >= 3 && Cc <= 5;

  const ROW_W = gridW(N);
  const PAD_TOP = 96;

  const cellFrame = (R, Cc) => {
    for (const f of frames) if (R >= f.ti && R < f.ti + K && Cc >= f.tj && Cc < f.tj + K) return f;
    return null;
  };

  const bubble =
    s.kind === "intro" ? t(E,
        <>Cow <b>({r},{c})</b> got prettier. Only the <b>3×3 photos that contain it</b> change. How many is that?</>,
        <>소 <b>({r},{c})</b> 가 예뻐졌어요. <b>이 소가 담긴 3×3 사진</b>만 점수가 바뀝니다. 몇 장일까요?</>)
    : s.kind === "one" ? t(E,
        <>A photo is any <b>3×3 cut-out</b>. This one holds the cow → its score changes ✓</>,
        <>사진 = 아무 칸에서나 잘라낸 <b>3×3 조각</b>. 이 사진 안에 소가 있죠 → 이 사진 점수가 바뀝니다 ✓</>)
    : s.kind === "two" ? t(E,
        <>Photos <b>overlap</b>. The cow sits in <b>both</b> photo 1 and photo 2 (they overlap right on the cow!) → so more than one photo changes.</>,
        <>사진은 서로 <b>겹쳐요</b>. 소 하나가 <b>사진 1·사진 2 둘 다</b>에 들어있죠 (겹치는 칸이 바로 소!) → 그래서 바뀌는 사진이 한 장이 아니에요.</>)
    : s.kind === "miss" ? t(E,
        <>This 3×3 <b>misses the cow</b> → this photo stays the same ✗</>,
        <>이 3×3 은 <b>소를 못 담아요</b> → 이 사진은 그대로 ✗</>)
    : s.kind === "count" ? t(E,
        <>Center a 3×3 on the cow, or nudge it 1 step any way — the cow stays in. Those center spots: <b>3 × 3 = 9</b>. (not all {(N - K + 1) * (N - K + 1)}!)</>,
        <>3×3 의 <b>가운데</b>를 소에 두거나, 상하좌우로 한 칸씩 밀어도 소가 안에 남아요. 그 가운데 자리가 <b>3 × 3 = 9곳 = 9장</b>. (전체 {(N - K + 1) * (N - K + 1)}장이 아니라!)</>)
    : t(E,
        <>So one prettier cow → fix just <b>9 photos</b>, not all {(N - K + 1) * (N - K + 1)}. That's why it's fast.</>,
        <>그래서 소 하나 예뻐지면 → <b>9장만</b> 고치면 끝 (전체 {(N - K + 1) * (N - K + 1)}장 X). 그래서 빠름.</>);

  const tailX = frames.length === 1
    ? (frames[0].tj - 1) * PITCH + FRAME / 2
    : (c - 1) * PITCH + CELL / 2;
  const BW = 360;
  const bLeft = Math.max(-24, Math.min(tailX - BW / 2, ROW_W - BW + 24));
  const bTail = tailX - bLeft;

  const Cell = ({ children, style }) => (
    <div style={{
      width: CELL, height: CELL, display: "flex", alignItems: "center",
      justifyContent: "center", borderRadius: 6, fontSize: 15, fontWeight: 700,
      fontFamily: "'JetBrains Mono',monospace", transition: "all .12s", ...style,
    }}>{children}</div>
  );

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "How many 3×3 photos contain this cow?", "이 소가 담긴 3×3 사진은 몇 장?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />

      <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
        <div style={{ width: ROW_W, position: "relative", paddingTop: PAD_TOP }}>
          {/* 말풍선 */}
          <div style={{ position: "absolute", top: PAD_TOP - 8, left: bLeft, width: BW, transform: "translateY(-100%)", zIndex: 7 }}>
            <div style={{ padding: "9px 13px", borderRadius: 11, background: "#fff7ed", border: "1.5px solid #fdba74", color: "#9a3412", fontSize: 12.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.55, boxShadow: "0 5px 16px rgba(0,0,0,.14)" }}>{bubble}</div>
            <div style={{ position: "absolute", top: "100%", left: bTail, transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "9px solid #fdba74" }} />
            <div style={{ position: "absolute", top: "100%", left: bTail, transform: "translateX(-50%)", marginTop: -1.7, width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "8px solid #fff7ed" }} />
          </div>

          {/* 액자 오버레이 (1~2개) */}
          {frames.map((f, k) => (
            <div key={k} style={{ position: "absolute", zIndex: 4 + k, pointerEvents: "none",
              top: PAD_TOP + (f.ti - 1) * PITCH - 2, left: (f.tj - 1) * PITCH - 2,
              width: FRAME + 4, height: FRAME + 4,
              border: `3px solid ${f.col}`, borderRadius: 9, boxShadow: `0 0 0 3px ${f.col}22` }}>
              <div style={{ position: "absolute", top: -11, left: 6, fontSize: 10, fontWeight: 800,
                color: "#fff", background: f.col, borderRadius: 999, padding: "1px 7px", whiteSpace: "nowrap" }}>
                {f.label}
              </div>
            </div>
          ))}

          {Array.from({ length: N }).map((_, ri) => (
            <div key={ri} style={{ display: "flex", gap: GAP, marginBottom: GAP }}>
              {Array.from({ length: N }).map((_, ci) => {
                const R = ri + 1, Cc = ci + 1;
                const cow = R === r && Cc === c;
                const f = cellFrame(R, Cc);
                const ctr = isCenter(R, Cc);
                return (
                  <Cell key={ci} style={{
                    background: cow ? "#fb923c" : f ? tintOf(f.col) : ctr ? "#ede9fe" : "#fff",
                    border: `${cow ? 2 : 1}px solid ${cow ? "#ea580c" : f ? f.col : ctr ? "#a78bfa" : "#e2e8f0"}`,
                  }}>
                    {cow ? "🐄" : ctr ? <span style={{ width: 9, height: 9, borderRadius: 999, background: "#7c3aed", display: "block" }} /> : ""}
                  </Cell>
                );
              })}
            </div>
          ))}

          {isCount && (
            <div style={{ position: "absolute", top: PAD_TOP + 5 * PITCH + 6, left: 6 * PITCH + 8,
              padding: "7px 12px", borderRadius: 10, background: "#5b21b6", color: "#fff",
              fontSize: 13, fontWeight: 800, boxShadow: "0 4px 12px rgba(0,0,0,.2)", whiteSpace: "nowrap" }}>
              {t(E, "9 photos", "9장")}
            </div>
          )}
        </div>
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
