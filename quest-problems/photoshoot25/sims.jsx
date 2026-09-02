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
  const FRAME = K * CELL + (K - 1) * GAP;

  const steps = [
    { kind: "intro" },
    { kind: "one" },     // 사진 하나: 소 담김 ✓
    { kind: "two" },     // 겹치는 두 사진이 소를 공유 → '한 장이 아니다'
    { kind: "miss" },    // 소 밖 → 안 바뀜 ✗
    { kind: "count" },   // 사진 9장 콘택트시트 (소가 9칸 중 어디에)
    { kind: "edge" },    // 가장자리 소 — K*K 장이 아니다. 코드의 max/min 이 여기서 나옴
    { kind: "done" },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  /* 소 위치 — edge 스텝만 모서리로 옮겨서 "K×K 장" 이 안 되는 걸 보게 함
     (선생님 2026-08-30: 코드의 max/min 이 왜 있는지 알 근거가 없었음) */
  const isEdge = s.kind === "edge";
  const r = isEdge ? 1 : 4, c = isEdge ? 1 : 4;

  const GREEN = "#16a34a", BLUE = "#2563eb", RED = "#dc2626";
  const tintOf = (col) => col === GREEN ? "#dcfce7" : col === BLUE ? "#dbeafe" : "#fee2e2";

  const frames =
    s.kind === "one"  ? [{ ti: 4, tj: 4, col: GREEN, label: t(E, "photo ✓", "사진 ✓") }]
  : s.kind === "two"  ? [{ ti: 2, tj: 2, col: GREEN, label: t(E, "photo 1", "사진 1") },
                         { ti: 4, tj: 4, col: BLUE,  label: t(E, "photo 2", "사진 2") }]
  : s.kind === "miss" ? [{ ti: 5, tj: 5, col: RED,   label: t(E, "photo ✗", "사진 ✗") }]
  : s.kind === "edge" ? [{ ti: 1, tj: 1, col: GREEN, label: t(E, "the only one", "이거 하나뿐") }]
  : [];
  const isCount = s.kind === "count" || s.kind === "done";

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
    : s.kind === "edge" ? t(E,
        <>Careful — that was a cow in the <b>middle</b>. Move it to a <b>corner</b>: some of those 9 photos would stick out past the field, so they don't exist. Only <b>1</b> photo actually holds it.</>,
        <>조심 — 방금은 <b>한가운데</b> 소였어요. <b>모서리</b>로 옮기면요? 9장 중 몇 장은 들판 밖으로 삐져나가서 <b>있을 수가 없어요</b>. 실제로 담는 사진은 <b>1장</b>뿐이에요.</>)
    : s.kind === "count" ? t(E,
        <>Here are all the photos holding the cow: the cow can be in <b>any of a photo's 9 cells</b> → <b>9 photos</b>. Not all {(N - K + 1) * (N - K + 1)}!</>,
        <>소를 담는 사진을 다 모으면: 소가 <b>사진 속 9칸 중 어디</b>에 있어도 소가 담긴 사진 → <b>9장</b>. 전체 {(N - K + 1) * (N - K + 1)}장이 아니에요!</>)
    : t(E,
        <>So one prettier cow → fix just these <b>9 photos</b>, not all {(N - K + 1) * (N - K + 1)}. That's why it's fast.</>,
        <>그래서 소 하나 예뻐지면 → 이 <b>9장만</b> 고치면 끝 (전체 {(N - K + 1) * (N - K + 1)}장 X). 그래서 빠름.</>);

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

  // 콘택트시트용 미니 사진 (3×3), 소가 (mr,mc) 칸
  const MC = 19, MG = 2, MW = 3 * MC + 2 * MG, SHEET_GAP = 15;
  const MiniPhoto = ({ mr, mc }) => (
    <div style={{ border: "2.5px solid #7c3aed", borderRadius: 8, padding: 3, background: "#faf5ff" }}>
      {[0, 1, 2].map((pr) => (
        <div key={pr} style={{ display: "flex", gap: MG, marginBottom: pr < 2 ? MG : 0 }}>
          {[0, 1, 2].map((pc) => {
            const isCow = pr === mr && pc === mc;
            return (
              <div key={pc} style={{ width: MC, height: MC, borderRadius: 3, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 12,
                background: isCow ? "#fb923c" : "#fff", border: `1px solid ${isCow ? "#ea580c" : "#e9d5ff"}` }}>
                {isCow ? "🐄" : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "How many 3×3 photos contain this cow?", "이 소가 담긴 3×3 사진은 몇 장?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />

      {!isCount ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
          <div style={{ width: ROW_W, position: "relative", paddingTop: PAD_TOP }}>
            {/* 말풍선 */}
            <div style={{ position: "absolute", top: PAD_TOP - 8, left: bLeft, width: BW, transform: "translateY(-100%)", zIndex: 7 }}>
              <div style={{ padding: "9px 13px", borderRadius: 11, background: "#fff7ed", border: "1.5px solid #fdba74", color: "#9a3412", fontSize: 12.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.55, boxShadow: "0 5px 16px rgba(0,0,0,.14)" }}>{bubble}</div>
              <div style={{ position: "absolute", top: "100%", left: bTail, transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "9px solid #fdba74" }} />
              <div style={{ position: "absolute", top: "100%", left: bTail, transform: "translateX(-50%)", marginTop: -1.7, width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "8px solid #fff7ed" }} />
            </div>

            {/* 액자 오버레이 */}
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
                  return (
                    <Cell key={ci} style={{
                      background: cow ? "#fb923c" : f ? tintOf(f.col) : "#fff",
                      border: `${cow ? 2 : 1}px solid ${cow ? "#ea580c" : f ? f.col : "#e2e8f0"}`,
                    }}>{cow ? "🐄" : ""}</Cell>
                  );
                })}
              </div>
            ))}

            {/* edge 스텝 — 위치마다 장수가 다르다는 표. 코드의 max/min 이 여기서 나옴. */}
            {isEdge && (() => {
              const W = N - K + 1;
              const cnt = (rr, cc) =>
                Math.max(0, Math.min(rr, W) - Math.max(1, rr - K + 1) + 1) *
                Math.max(0, Math.min(cc, W) - Math.max(1, cc - K + 1) + 1);
              const rows = [[4, 4], [2, 4], [1, 4], [1, 1]];
              return (
                <div style={{ marginTop: 14, padding: "11px 13px", background: "#fff7ed",
                  border: "1.5px solid #fdba74", borderRadius: 11 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: "#9a3412", marginBottom: 7, textAlign: "center" }}>
                    {t(E, "the count depends on where the cow is", "소가 어디 있냐에 따라 장수가 달라져요")}
                  </div>
                  {rows.map(([rr, cc]) => (
                    <div key={`${rr}-${cc}`} style={{ display: "flex", justifyContent: "space-between",
                      fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#7c2d12", padding: "1px 4px" }}>
                      <span>{t(E, "cow", "소")} ({rr},{cc})</span>
                      <span style={{ fontWeight: 800 }}>{cnt(rr, cc)}{t(E, " photos", "장")}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #fdba74",
                    fontSize: 11.5, color: "#7c2d12", lineHeight: 1.75, wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>
                    {t(E,
                      <>So we can't just say "K×K photos". We clamp the range to the field:<br />
                        <code style={{ fontFamily: "'JetBrains Mono',monospace", background: "#fff", padding: "1px 5px", borderRadius: 4 }}>max(1, r−K+1)</code>
                        {" … "}
                        <code style={{ fontFamily: "'JetBrains Mono',monospace", background: "#fff", padding: "1px 5px", borderRadius: 4 }}>min(r, W)</code>
                        <br />That's exactly the <b>max</b> and <b>min</b> you'll see in the code.</>,
                      <>그래서 "K×K 장" 이라고 못 박을 수 없어요. 범위를 들판 안으로 잘라야 해요:<br />
                        <code style={{ fontFamily: "'JetBrains Mono',monospace", background: "#fff", padding: "1px 5px", borderRadius: 4 }}>max(1, r−K+1)</code>
                        {" … "}
                        <code style={{ fontFamily: "'JetBrains Mono',monospace", background: "#fff", padding: "1px 5px", borderRadius: 4 }}>min(r, W)</code>
                        <br />코드에 나오는 그 <b>max</b> 와 <b>min</b> 이 바로 이것이에요.</>)}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 540, margin: "8px auto 0" }}>
          {/* 말풍선 */}
          <div style={{ maxWidth: 430, margin: "0 auto 16px", padding: "10px 14px", borderRadius: 12, background: "#fff7ed", border: "1.5px solid #fdba74", color: "#9a3412", fontSize: 12.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6, boxShadow: "0 5px 16px rgba(0,0,0,.14)" }}>{bubble}</div>
          {/* 사진 9장 — 소가 9칸 중 어디에 */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(3, ${MW}px)`, gap: SHEET_GAP, justifyContent: "center" }}>
            {Array.from({ length: 9 }).map((_, idx) => (
              <MiniPhoto key={idx} mr={Math.floor(idx / 3)} mc={idx % 3} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 13, fontSize: 14, fontWeight: 800, color: "#5b21b6" }}>
            {t(E, "= 9 photos", "= 사진 9장")}
            <span style={{ color: "#94a3b8", fontWeight: 600, marginLeft: 6 }}>({t(E, "not", "전체")} {(N - K + 1) * (N - K + 1)})</span>
          </div>
        </div>
      )}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PhotoMonotoneSim — [왜 '바뀐 사진만' 비교해도 되나]
   선생님 2026-08-30: quest 에서 이게 Ch2 계획 카드의 불릿 한 줄뿐이었음.
   "값은 커지기만 → 최고는 줄지 않는다" 는 이 풀이에서 제일 미묘한 단계인데
   결론만 있고 왜가 없었다. 학생 머릿속 질문: "다른 사진이 최고였으면 어떡하지?"
   ═══════════════════════════════════════════════════════════════ */
export function PhotoMonotoneSim({ E }) {
  /* 사진 4장의 점수가 업데이트마다 어떻게 변하는지. 바뀌는 건 늘 일부. */
  const FRAMES = [
    { scores: [3, 7, 5, 2], changed: [],     note: "start" },
    { scores: [3, 9, 5, 2], changed: [1],    note: "u1" },
    { scores: [8, 9, 5, 2], changed: [0],    note: "u2" },
    { scores: [8, 9, 5, 6], changed: [3],    note: "u3" },
  ];
  const steps = [{ kind: "intro" }, { kind: "u1" }, { kind: "u2" }, { kind: "u3" }, { kind: "why" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const fi = s.kind === "intro" ? 0 : s.kind === "why" ? 3 : ["u1", "u2", "u3"].indexOf(s.kind) + 1;
  const f = FRAMES[fi];
  const best = Math.max(...f.scores);
  const prevBest = fi === 0 ? null : Math.max(...FRAMES[fi - 1].scores);

  const say =
    s.kind === "intro" ? t(E,
      <>Four photos, with their scores. The best right now is <b>{best}</b>.<br />Watch what happens to the best as updates come in.</>,
      <>사진 4장과 그 점수예요. 지금 최고는 <b>{best}</b>.<br />업데이트가 들어올 때 최고가 어떻게 되는지 봐요.</>)
    : s.kind === "why" ? t(E,
      <>Every score only ever <b>went up</b> — never down. Beauty only increases, so a photo's sum can't shrink.<br />So the new best is either the <b>old best</b>, or one of the <b>photos that just changed</b>.<br />Nothing else can sneak into first place. That's why we only compare the changed ones.</>,
      <>점수는 전부 <b>올라가기만</b> 했어요 — 내려간 적이 없죠. 아름다움이 커지기만 하니 사진 합도 줄 수가 없어요.<br />그러니 새 최고는 <b>예전 최고</b>이거나, <b>방금 바뀐 사진</b> 중 하나예요.<br />다른 사진이 갑자기 1등이 될 수는 없어요. 그래서 바뀐 것만 견줘도 되는 거예요.</>)
    : t(E,
      <>Photo <b>{f.changed[0] + 1}</b> went up. Best: <b>{prevBest}</b> → <b>{best}</b>.<br />The untouched photos didn't move at all.</>,
      <><b>{f.changed[0] + 1}번</b> 사진이 올라갔어요. 최고: <b>{prevBest}</b> → <b>{best}</b>.<br />손대지 않은 사진들은 꿈쩍도 안 했죠.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why compare only the photos that changed?", "왜 '바뀐 사진'만 견줘도 될까?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ maxWidth: 430, margin: "0 auto 16px", padding: "10px 14px", borderRadius: 12,
        background: "#fff7ed", border: "1.5px solid #fdba74", color: "#9a3412", fontSize: 12.5,
        fontWeight: 700, textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.7 }}>{say}</div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        {f.scores.map((v, i) => {
          const isBest = v === best;
          const justChanged = f.changed.includes(i);
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 58, height: 58, borderRadius: 11, display: "flex", alignItems: "center",
                justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 21,
                background: justChanged ? "#fed7aa" : isBest ? "#dcfce7" : "#fff",
                border: `2.5px solid ${justChanged ? "#ea580c" : isBest ? "#16a34a" : "#e2e8f0"}`,
                color: "#1f2937", transition: "all .15s" }}>{v}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: justChanged ? "#ea580c" : isBest ? "#16a34a" : "#94a3b8" }}>
                {justChanged ? t(E, "changed", "바뀜") : isBest ? t(E, "best", "최고") : `${i + 1}`}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: "#16a34a",
        fontFamily: "'JetBrains Mono',monospace" }}>
        cur_max = {best}
        {prevBest != null && prevBest !== best && (
          <span style={{ color: "#94a3b8", fontWeight: 600, marginLeft: 8, fontSize: 12 }}>({prevBest} → {best})</span>
        )}
      </div>

      {s.kind === "why" && (
        <div style={{ maxWidth: 460, margin: "14px auto 0", padding: "10px 14px", background: "#ecfdf5",
          border: "1.5px solid #6ee7b7", borderRadius: 10, fontSize: 12.5, color: "#065f46",
          lineHeight: 1.8, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
          {t(E, <>If beauty could <b>drop</b>, this would break — the old best might fall and some untouched photo would take over, so we'd have to re-check everything.</>,
                <>만약 아름다움이 <b>줄 수도</b> 있었다면 이 방법은 깨져요 — 옛 최고가 내려앉고 손 안 댄 사진이 1등이 될 수 있으니, 매번 전부 다시 봐야 하거든요.</>)}
        </div>
      )}

      <div style={{ height: 16 }} />
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PhotoTraceSim — 코드 변수가 실제로 도는 모습 (선생님 2026-08-11:
   "코드의 변수를 보여주면서 시뮬. 어떻게 그렇게 되는지 가시적으로").
   작은 예제(5×5, 3×3, W=3)로 beauty / S / delta / i_lo..j_hi / cur_max 가
   쿼리마다 변하는 걸 왼쪽(칸 값)·오른쪽(사진 점수 S)·변수 칩으로 동시에 보여줌.
   ═══════════════════════════════════════════════════════════════ */
export function PhotoTraceSim({ E }) {
  const N = 5, K = 3, W = N - K + 1; // 3
  /* 3번째 쿼리는 (2,2) 를 5 → 9 로 다시 올린다.
     앞 두 개는 0 에서 시작하는 칸이라 delta 가 v 와 같아서 "그냥 v 를 더하면 되잖아?" 로 보인다.
     (선생님 2026-09-02: "delta가 이해가 안돼. 그냥 5에 3을 더하면 되는거 아닌가")
     이미 값이 있는 칸을 한 번 겪어야 delta 가 왜 필요한지 보인다. */
  const queries = [{ r: 2, c: 2, v: 5 }, { r: 4, c: 4, v: 3 }, { r: 2, c: 2, v: 9 }];

  // 한 쿼리를 5단계로: ①읽기 ②delta계산+저장 ③S 꺼내 +delta 저장 ④cur_max 비교+저장 ⑤꺼내 출력
  const steps = [{ kind: "intro", wr: [], rd: [] }];
  {
    const beauty = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
    const S = Array.from({ length: W + 1 }, () => Array(W + 1).fill(0));
    let curMax = 0; const out = [];
    const snap = (extra) => ({
      beauty: beauty.map((row) => row.slice()),
      S: S.map((row) => row.slice()),
      curMax, out: out.slice(), ...extra,
    });
    queries.forEach((qq, qi) => {
      const old = beauty[qq.r][qq.c];
      const delta = qq.v - old;
      const iLo = Math.max(1, qq.r - K + 1), iHi = Math.min(qq.r, W);
      const jLo = Math.max(1, qq.c - K + 1), jHi = Math.min(qq.c, W);
      const base = { qi, q: qq, old, delta, iLo, iHi, jLo, jHi };
      // ① 읽기: r,c,v 저장 + beauty[r][c] 꺼내기
      steps.push(snap({ kind: "read", ...base, wr: ["r", "c", "v"], rd: ["beauty"], hasDelta: false, hasMax: false }));
      // ② delta 저장 + beauty[r][c] = v
      beauty[qq.r][qq.c] = qq.v;
      steps.push(snap({ kind: "delta", ...base, wr: ["delta", "beauty"], rd: ["v"], hasDelta: true, hasMax: false }));
      // ②-b 어느 사진들을 고칠지 — 범위를 실제 숫자로 계산 (선생님 2026-09-02 요청)
      steps.push(snap({ kind: "range", ...base, wr: [], rd: [], hasDelta: true, hasMax: false }));
      // ③ S 꺼내 +delta 저장
      for (let i = iLo; i <= iHi; i++) for (let j = jLo; j <= jHi; j++) S[i][j] += delta;
      steps.push(snap({ kind: "storeS", ...base, wr: ["S"], rd: ["S", "delta"], hasDelta: true, hasMax: false }));
      // ④ cur_max 비교 + 저장
      for (let i = iLo; i <= iHi; i++) for (let j = jLo; j <= jHi; j++) if (S[i][j] > curMax) curMax = S[i][j];
      steps.push(snap({ kind: "max", ...base, wr: ["cur_max"], rd: ["S"], hasDelta: true, hasMax: true }));
      // ⑤ 꺼내서 출력
      out.push(curMax);
      steps.push(snap({ kind: "out", ...base, wr: [], rd: ["cur_max"], hasDelta: true, hasMax: true }));
    });
    steps.push(snap({ kind: "done", wr: [], rd: [], hasDelta: false, hasMax: false }));
  }

  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const q = s.q;
  const curMax = s.curMax ?? 0;
  const inQuery = s.kind !== "intro" && s.kind !== "done";
  const sActive = s.kind === "storeS" || s.kind === "max" || s.kind === "range";
  const beautyHot = s.kind === "read" || s.kind === "delta";
  const inRect = (i, j) => sActive && i >= s.iLo && i <= s.iHi && j >= s.jLo && j <= s.jHi;
  const wr = (n) => (s.wr || []).includes(n);
  const rd = (n) => (s.rd || []).includes(n);
  // beauty·S 도 이 단계에 저장(초록)/꺼냄(파랑) 되는지 태그
  const gridTag = (n) => wr(n) ? { txt: t(E, "← store", "← 저장"), c: "#16a34a" }
                        : rd(n) ? { txt: t(E, "read →", "꺼냄 →"), c: "#2563eb" } : null;
  const bTag = gridTag("beauty"), sTag = gridTag("S");

  const FC = 30, SC = 46, gp = 3, sgp = 9;

  const caption =
    s.kind === "intro" ? t(E,
        <>See <b>which variable stores what</b>, and how it's read back — one step at a time. Left = <b>beauty</b>, right = <b>S</b>. All 0.</>,
        <>값을 <b>어느 변수에 저장하고</b> 어떻게 꺼내 쓰는지 한 단계씩 봐요. 왼쪽 = <b>beauty</b>, 오른쪽 = <b>S</b>. 처음 다 0.</>)
    : s.kind === "read" ? t(E,
        <><b>①</b> Read the query into <b>r, c, v</b>. And read the old value out of beauty[{q.r}][{q.c}] = <b>{s.old}</b>.</>,
        <><b>①</b> 쿼리를 읽어 <b>r·c·v</b> 에 저장. 그리고 beauty[{q.r}][{q.c}] 에서 옛 값 <b>{s.old}</b> 을 꺼내요.</>)
    : s.kind === "delta" ? t(E,
        <><b>②</b> <b>delta</b> = v − old = {q.v} − {s.old} = <b>{s.delta}</b> — how much it <i>grew</i>.
          {s.old > 0
            ? <><br />The photo sums already include the old <b>{s.old}</b>. Adding <b>{q.v}</b> would count it twice — add only the <b>{s.delta}</b> it grew by.</>
            : <><br />(This cell was 0, so delta happens to equal v. Watch a cell that already has a value.)</>}</>,
        <><b>②</b> <b>delta</b> = v − 옛값 = {q.v} − {s.old} = <b>{s.delta}</b> — <i>얼마나 늘었나</i>.
          {s.old > 0
            ? <><br />사진 점수엔 옛값 <b>{s.old}</b> 이 이미 들어 있어요. <b>{q.v}</b> 를 더하면 두 번 세는 셈이라, <b>늘어난 {s.delta}</b> 만 더해야 해요.</>
            : <><br />(이 칸은 0 이라 delta 가 v 와 같아요. 이미 값이 있는 칸에서 다시 봐요.)</>}</>)
    : s.kind === "range" ? t(E,
        <><b>②-b</b> Which photos hold this cow? Clamp the range to the field:<br />
          i: max(1, {q.r}−{K}+1) … min({q.r}, {W}) = <b>{s.iLo} … {s.iHi}</b> &nbsp;·&nbsp;
          j: max(1, {q.c}−{K}+1) … min({q.c}, {W}) = <b>{s.jLo} … {s.jHi}</b></>,
        <><b>②-b</b> 어느 사진을 고쳐야 할까요? 범위를 들판 안으로 잘라요:<br />
          i: max(1, {q.r}−{K}+1) … min({q.r}, {W}) = <b>{s.iLo} … {s.iHi}</b> &nbsp;·&nbsp;
          j: max(1, {q.c}−{K}+1) … min({q.c}, {W}) = <b>{s.jLo} … {s.jHi}</b></>)
    : s.kind === "storeS" ? t(E,
        <><b>③</b> For the cow's photos: read <b>S</b> out, add <b>{s.delta}</b>, store it back into <b>S</b> (green cells).</>,
        <><b>③</b> 소를 품는 사진들: <b>S</b> 에서 값을 꺼내 <b>+{s.delta}</b> 해서 다시 <b>S</b> 에 저장 (초록 칸).</>)
    : s.kind === "max" ? t(E,
        <><b>④</b> Compare those to <b>cur_max</b>; if bigger, store it into cur_max → <b>{curMax}</b>.</>,
        <><b>④</b> 그 사진 점수를 <b>cur_max</b> 와 비교 → 더 크면 cur_max 에 저장 → <b>{curMax}</b>.</>)
    : s.kind === "out" ? t(E,
        <><b>⑤</b> Read <b>cur_max</b> back out and print it → <b>{curMax}</b>.</>,
        <><b>⑤</b> <b>cur_max</b> 를 꺼내서 출력 → <b>{curMax}</b>.</>)
    : t(E,
        <>Store into variables, read them back — that's how each query is handled, touching only the cow's photos.</>,
        <>값을 변수에 저장하고 다시 꺼내 쓰며 각 쿼리를 처리해요. 딱 소를 품는 사진만!</>);

  // 변수 상자 (저장=초록 ← / 꺼냄=파랑 →)
  const VarBox = ({ name, val, show }) => {
    const state = wr(name) ? "w" : rd(name) ? "r" : null;
    const bg = state === "w" ? "#dcfce7" : state === "r" ? "#dbeafe" : "#f8fafc";
    const bd = state === "w" ? "#16a34a" : state === "r" ? "#2563eb" : "#e2e8f0";
    const fg = state === "w" ? "#15803d" : state === "r" ? "#1d4ed8" : "#94a3b8";
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 58,
        padding: "6px 10px", borderRadius: 10, background: bg, border: `2px solid ${bd}`, transition: "all .15s" }}>
        <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: fg }}>
          {name} = {show ? val : "·"}
        </div>
        <div style={{ fontSize: 9.5, fontWeight: 800, height: 12, color: fg }}>
          {state === "w" ? t(E, "← store", "← 저장") : state === "r" ? t(E, "read →", "꺼냄 →") : ""}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Store & read the variables", "변수에 저장하고 꺼내 쓰기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />

      {/* 설명 */}
      <div style={{ maxWidth: 540, margin: "4px auto 16px", padding: "12px 16px", borderRadius: 11,
        background: "#fff7ed", border: "1.5px solid #fdba74", color: "#9a3412",
        fontSize: 13, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.75 }}>
        {caption}
      </div>

      {/* 변수 상자 */}
      <div style={{ display: "flex", gap: 9, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 }}>
        <VarBox name="r" val={q ? q.r : "·"} show={inQuery} />
        <VarBox name="c" val={q ? q.c : "·"} show={inQuery} />
        <VarBox name="v" val={q ? q.v : "·"} show={inQuery} />
        <VarBox name="delta" val={s.delta} show={s.hasDelta} />
        <VarBox name="cur_max" val={curMax} show={true} />
      </div>

      {/* 두 격자 */}
      <div style={{ display: "flex", gap: 44, justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* beauty */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ height: 44, display: "flex", flexDirection: "column", justifyContent: "flex-end", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#9a3412", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
              beauty {t(E, "(cell values)", "(칸 값)")}
            </div>
            <div style={{ fontSize: 10.5, fontWeight: 800, textAlign: "center", marginTop: 4, height: 13,
              color: bTag ? bTag.c : "#c2833f" }}>
              {bTag ? bTag.txt : t(E, "field 5×5", "들판 5×5")}
            </div>
          </div>
          {Array.from({ length: N }).map((_, ri) => (
            <div key={ri} style={{ display: "flex", gap: gp, marginBottom: gp }}>
              {Array.from({ length: N }).map((_, ci) => {
                const R = ri + 1, Cc = ci + 1;
                const val = (s.beauty && s.beauty[R][Cc]) || 0;
                const hot = beautyHot && q && R === q.r && Cc === q.c;
                const hotW = hot && s.kind === "delta";   // 저장(초록) vs 꺼냄(파랑)
                return (
                  <div key={ci} style={{ width: FC, height: FC, display: "flex", alignItems: "center",
                    justifyContent: "center", borderRadius: 5, fontFamily: "'JetBrains Mono',monospace",
                    fontWeight: 700, fontSize: 13, transition: "all .12s", position: "relative",
                    background: hot ? (hotW ? "#16a34a" : "#2563eb") : "#fff",
                    border: `${hot ? 2 : 1}px solid ${hot ? (hotW ? "#15803d" : "#1d4ed8") : "#e2e8f0"}`,
                    color: hot ? "#fff" : val === 0 ? "#94a3b8" : "#1f2937" }}>
                    {val}
                    {hotW && (
                      <span style={{ position: "absolute", top: -8, right: -7, fontSize: 9.5, fontWeight: 800,
                        color: "#fff", background: "#15803d", borderRadius: 999, padding: "0 5px", whiteSpace: "nowrap" }}>
                        {s.old}→{q.v}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* S */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ height: 44, display: "flex", flexDirection: "column", justifyContent: "flex-end", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#5b21b6", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
              S {t(E, "(photo scores)", "(사진 점수)")}
            </div>
            <div style={{ fontSize: 10.5, fontWeight: 800, textAlign: "center", marginTop: 4, height: 13, wordBreak: "keep-all",
              color: sTag ? sTag.c : "#7c3aed" }}>
              {sTag ? sTag.txt : t(E, "9 photos · 1 cell = 1", "사진 9장 · 한 칸 = 1장")}
            </div>
          </div>
          {Array.from({ length: W }).map((_, ii) => (
            <div key={ii} style={{ display: "flex", gap: sgp, marginBottom: sgp }}>
              {Array.from({ length: W }).map((_, jj) => {
                const I = ii + 1, J = jj + 1;
                const val = (s.S && s.S[I][J]) || 0;
                const rect = inRect(I, J);
                const writing = s.kind === "storeS" && rect;   // 저장(초록)
                const reading = s.kind === "max" && rect;       // 꺼냄(파랑 테두리)
                const isMax = s.hasMax && val === curMax && val > 0;
                const filled = val > 0;
                return (
                  <div key={jj} style={{ width: SC, height: SC, display: "flex", alignItems: "center",
                    justifyContent: "center", borderRadius: 8, fontFamily: "'JetBrains Mono',monospace",
                    fontWeight: 800, fontSize: 23, transition: "all .12s", position: "relative",
                    background: writing ? "#16a34a" : isMax ? "#16a34a" : filled ? "#7c3aed" : "#f8fafc",
                    boxShadow: (isMax || filled || writing) ? "0 3px 9px rgba(124,58,237,.35)" : "0 1px 2px rgba(0,0,0,.04)",
                    border: reading ? "3px solid #2563eb" : writing ? "2.5px solid #15803d" : (isMax || filled) ? "2px solid transparent" : "1.5px solid #e5e7eb",
                    color: (isMax || filled || writing) ? "#fff" : "#cbd5e1" }}>
                    {val}
                    {writing && (
                      <span style={{ position: "absolute", top: -9, right: -8, fontSize: 11.5, fontWeight: 800,
                        color: "#fff", background: "#ea580c", borderRadius: 999, padding: "1px 6px",
                        boxShadow: "0 2px 5px rgba(0,0,0,.2)", whiteSpace: "nowrap" }}>+{s.delta}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 출력 */}
      <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#334155", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, "output", "출력")}: <span style={{ color: "#0891b2", fontWeight: 800, fontSize: 15 }}>{(s.out && s.out.join("  ")) || "—"}</span>
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
