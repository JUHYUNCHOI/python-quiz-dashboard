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
  const PAD_TOP = 84;   // 말풍선이 맨 윗줄 창 위에 뜰 공간

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

      {/* 격자 + 말풍선 오버레이 — 말풍선이 '지금 그 창' 바로 위에 떠서 꼬리로 지목.
          (선생님: 풍선은 고정이 아니라 설명하는 그 부분 위에.) */}
      <div style={{ position: "relative", width: ROW_W, margin: "0 auto 10px", paddingTop: PAD_TOP }}>
        {(() => {
          const isWin = s.kind === "win";
          const cx = isWin ? (s.j + K / 2) * PITCH - GAP / 2 : ROW_W / 2;
          const winTopY = PAD_TOP + (isWin ? s.i * PITCH : 0);   // 창 top (container 좌표)
          const good = s.kind === "final" || (isWin && s.isNew);
          const bg = good ? "#ecfdf5" : "#f5f3ff";
          const bd = good ? "#86efac" : "#c4b5fd";
          const fg = good ? "#15803d" : "#5b21b6";
          const BW = 232;
          const left = Math.max(-46, Math.min(cx - BW / 2, ROW_W - BW + 46));
          const tail = cx - left;
          return (
            <div style={{ position: "absolute", top: winTopY, left, width: BW, transform: "translateY(calc(-100% - 9px))", zIndex: 5 }}>
              <div style={{
                padding: "8px 12px", borderRadius: 10, background: bg, border: `1.5px solid ${bd}`,
                color: fg, fontSize: 12, fontWeight: 700, textAlign: "center", wordBreak: "keep-all",
                lineHeight: 1.55, boxShadow: "0 5px 16px rgba(0,0,0,.14)",
              }}>
                {s.kind === "intro" && t(E, <>A photo is any <b>{K}×{K}</b> square. Its score = sum inside. Slide it everywhere.</>,
                      <>사진은 아무 <b>{K}×{K}</b> 정사각형. 점수 = 안에 든 값의 합. 다 밀어봐요.</>)}
                {isWin && <>
                  {t(E, <>top-left ({s.i + 1}, {s.j + 1}) → score <b>{s.v}</b></>, <>왼쪽위 ({s.i + 1}, {s.j + 1}) → 점수 <b>{s.v}</b></>)}
                  <br />
                  {s.isNew ? t(E, <>new best! <b>{s.best}</b></>, <>최고 기록! <b>{s.best}</b></>)
                           : t(E, <>best stays <b>{s.best}</b></>, <>최고는 <b>{s.best}</b> 그대로</>)}
                </>}
                {s.kind === "final" && t(E, <>Checked all <b>{W}×{W} = {W * W}</b> photos. Best = <b>{s.best}</b>.</>,
                      <>창 <b>{W}×{W} = {W * W}</b> 개를 다 봤어요. 최고 = <b>{s.best}</b>.</>)}
              </div>
              {/* 꼬리 ▼ — 아래 창을 가리킴 */}
              <div style={{ position: "absolute", top: "100%", left: tail, transform: "translateX(-50%)",
                width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: `8px solid ${bd}` }} />
              <div style={{ position: "absolute", top: "100%", left: tail, transform: "translateX(-50%)", marginTop: -1.6,
                width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `7px solid ${bg}` }} />
            </div>
          );
        })()}

        {/* 격자 */}
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
  // N 은 K 보다 넉넉히 커야 "몇 장만 바뀐다" 이득이 보인다. N=8,K=3 → 전체 36 중 최대 9.
  const N = 8, K = 3;
  const W = N - K + 1;                        // 6 → 36 장
  const r = 4, c = 4;                         // 고정 예제 소 (1-indexed, 지문과 같게)
  const iLo = Math.max(1, r - K + 1), iHi = Math.min(r, W);  // 2..4
  const jLo = Math.max(1, c - K + 1), jHi = Math.min(c, W);  // 2..4
  const hit = (iHi - iLo + 1) * (jHi - jLo + 1);             // 9

  // 관찰 → 추론, 한 스텝씩: 소 → 이 사진이 품네(예시) → 저것도 → 직사각형 → 개수 → 결론
  const steps = [
    { kind: "intro" },
    { kind: "one", ti: iLo, tj: jLo },        // 예시 사진 1 (왼쪽위)
    { kind: "one", ti: iHi, tj: jHi },        // 예시 사진 2
    { kind: "rect" },                          // 품는 사진 전체 = 직사각형
    { kind: "count" },                         // 개수 세기
    { kind: "done" },                          // 결론
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const ROW_W = gridW(N);
  const PAD_TOP2 = 78;                         // 말풍선이 맨 윗줄 위에 뜰 공간
  const rectSteps = s.kind === "rect" || s.kind === "count" || s.kind === "done";

  // 오른쪽 '사진' 표에서 지금 켤 칸
  const photoOn = (I, J) =>
    s.kind === "one" ? (I === s.ti && J === s.tj)
    : rectSteps ? (I >= iLo && I <= iHi && J >= jLo && J <= jHi)
    : false;
  // 왼쪽 '들판' 에서 강조할 K×K 영역 (one: 그 사진 창 / rect: 합집합)
  const fieldOn = (R, Cc) =>
    s.kind === "one" ? (R >= s.ti && R < s.ti + K && Cc >= s.tj && Cc < s.tj + K)
    : rectSteps ? (R >= iLo && R <= iHi + K - 1 && Cc >= jLo && Cc <= jHi + K - 1)
    : false;

  const Cell = ({ children, style }) => (
    <div style={{
      width: CELL, height: CELL, display: "flex", alignItems: "center",
      justifyContent: "center", borderRadius: 6, fontSize: 13, fontWeight: 700,
      fontFamily: "'JetBrains Mono',monospace", transition: "all .12s", ...style,
    }}>{children}</div>
  );

  const bubble =
    s.kind === "intro" ? t(E, <>Cow <b>({r},{c})</b> got prettier. Only photos that <b>contain her</b> change. Which ones?</>,
                              <>소 <b>({r},{c})</b> 가 예뻐졌어요. <b>그 소가 든</b> 사진만 점수가 바뀌어요. 어떤 사진들일까요?</>)
    : s.kind === "one" ? t(E, <>e.g. photo top-left <b>({s.ti},{s.tj})</b> — its 3×3 covers ({r},{c}) → this one changes.</>,
                             <>예: 왼쪽위 <b>({s.ti},{s.tj})</b> 사진 — 그 3×3 안에 ({r},{c}) 가 있죠 → 이 사진 바뀜.</>)
    : s.kind === "rect" ? t(E, <>All photos covering ({r},{c}): their top-lefts form <b>this rectangle</b>.</>,
                              <>({r},{c}) 를 품는 사진들: 왼쪽위가 <b>이 직사각형</b> 을 이뤄요.</>)
    : s.kind === "count" ? t(E, <>How many? <b>{iHi - iLo + 1}×{jHi - jLo + 1} = {hit}</b> — not all {W * W}!</>,
                               <>몇 장? <b>{iHi - iLo + 1}×{jHi - jLo + 1} = {hit}</b> 장 — 전체 {W * W} 장이 아니라!</>)
    : t(E, <>So don't recompute everything — just <b>+Δ</b> to these <b>{hit}</b> photos.</>,
           <>그러니 전부 다시 더하지 말고, 이 <b>{hit}</b> 장만 <b>+Δ</b> 하면 돼요.</>);

  const cxx = (c - 0.5) * PITCH - GAP / 2;
  const cowTopY = PAD_TOP2 + (r - 1) * PITCH;
  const BW = 252;
  const bLeft = Math.max(-30, Math.min(cxx - BW / 2, ROW_W - BW + 30));
  const bTail = cxx - bLeft;

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "One cow gets prettier → which photos change?", "소 한 마리가 예뻐지면 → 어떤 사진이 바뀔까?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />

      <div style={{ display: "flex", gap: 26, justifyContent: "center", flexWrap: "wrap", marginTop: 6 }}>
        {/* 왼쪽 — 들판 (소 + 지금 보는 사진의 K×K 영역) */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#9a3412", textAlign: "center", marginBottom: 6 }}>
            {t(E, `field ${N}×${N}`, `들판 ${N}×${N}`)}
          </div>
          <div style={{ width: ROW_W, position: "relative", paddingTop: PAD_TOP2 }}>
            {/* 말풍선 — 소 바로 위에서 지목 */}
            <div style={{ position: "absolute", top: cowTopY, left: bLeft, width: BW, transform: "translateY(calc(-100% - 9px))", zIndex: 5 }}>
              <div style={{
                padding: "8px 12px", borderRadius: 10, background: "#fff7ed", border: "1.5px solid #fdba74",
                color: "#9a3412", fontSize: 12, fontWeight: 700, textAlign: "center", wordBreak: "keep-all",
                lineHeight: 1.55, boxShadow: "0 5px 16px rgba(0,0,0,.14)",
              }}>{bubble}</div>
              <div style={{ position: "absolute", top: "100%", left: bTail, transform: "translateX(-50%)",
                width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "8px solid #fdba74" }} />
              <div style={{ position: "absolute", top: "100%", left: bTail, transform: "translateX(-50%)", marginTop: -1.6,
                width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "7px solid #fff7ed" }} />
            </div>
            {Array.from({ length: N }).map((_, ri) => (
              <div key={ri} style={{ display: "flex", gap: GAP, marginBottom: GAP }}>
                {Array.from({ length: N }).map((_, ci) => {
                  const R = ri + 1, Cc = ci + 1;
                  const picked = R === r && Cc === c;
                  const cov = fieldOn(R, Cc);
                  return (
                    <Cell key={ci} style={{
                      background: picked ? "#fb923c" : cov ? "#ffedd5" : "#fff",
                      border: `${picked ? 2 : 1}px solid ${picked ? "#ea580c" : cov ? "#fdba74" : "#e2e8f0"}`,
                      color: picked ? "#fff" : "#9a3412",
                    }}>{picked ? "🐄" : ""}</Cell>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 — 사진(창) 표. 왼쪽위 좌표 하나 = 사진 한 장 */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#5b21b6", textAlign: "center", marginBottom: 6 }}>
            {t(E, `photos ${W}×${W} (by top-left)`, `사진 ${W}×${W} 장 (왼쪽위 기준)`)}
          </div>
          <div style={{ width: gridW(W), paddingTop: PAD_TOP2 }}>
            {Array.from({ length: W }).map((_, ii) => (
              <div key={ii} style={{ display: "flex", gap: GAP, marginBottom: GAP }}>
                {Array.from({ length: W }).map((_, jj) => {
                  const I = ii + 1, J = jj + 1;
                  const on = photoOn(I, J);
                  return (
                    <Cell key={jj} style={{
                      background: on ? "#ede9fe" : "#f8fafc",
                      border: `${on ? 2 : 1}px solid ${on ? A : "#e2e8f0"}`,
                      color: on ? "#5b21b6" : "#cbd5e1", fontSize: 11,
                    }}>{on ? "+Δ" : "·"}</Cell>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 범위 식 — 개수 세는 단계부터만 (코드의 네 줄과 같은 수) */}
      {(s.kind === "count" || s.kind === "done") && (
        <div style={{
          maxWidth: 430, margin: "12px auto 0", padding: "9px 13px", borderRadius: 10,
          background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: 11.5,
          fontFamily: "'JetBrains Mono',monospace", color: "#334155", lineHeight: 1.75,
        }}>
          <div>i_lo = max(1, {r}−{K}+1) = <b>{iLo}</b> · i_hi = min({r}, {W}) = <b>{iHi}</b></div>
          <div>j_lo = max(1, {c}−{K}+1) = <b>{jLo}</b> · j_hi = min({c}, {W}) = <b>{jHi}</b></div>
          <div style={{ marginTop: 4, color: "#5b21b6", fontWeight: 800 }}>
            → {t(E, "photos to update", "고칠 사진")} = {iHi - iLo + 1} × {jHi - jLo + 1} = {hit}
            <span style={{ color: C.dim, fontWeight: 600 }}>  ({t(E, "not", "전부")} {W * W}{t(E, "", " 장이 아니라")})</span>
          </div>
        </div>
      )}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
