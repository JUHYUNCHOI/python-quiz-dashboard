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
    { kind: "count" },   // 사진 9장 콘택트시트 (소가 9칸 중 어디에)
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
   PhotoTraceSim — 코드 변수가 실제로 도는 모습 (선생님 2026-08-11:
   "코드의 변수를 보여주면서 시뮬. 어떻게 그렇게 되는지 가시적으로").
   작은 예제(5×5, 3×3, W=3)로 beauty / S / delta / i_lo..j_hi / cur_max 가
   쿼리마다 변하는 걸 왼쪽(칸 값)·오른쪽(사진 점수 S)·변수 칩으로 동시에 보여줌.
   ═══════════════════════════════════════════════════════════════ */
export function PhotoTraceSim({ E }) {
  const N = 5, K = 3, W = N - K + 1; // 3
  const queries = [{ r: 2, c: 2, v: 5 }, { r: 4, c: 4, v: 3 }];

  const steps = [{ kind: "intro" }];
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
      beauty[qq.r][qq.c] = qq.v;
      steps.push(snap({ kind: "arrive", qi, q: qq, delta, old }));
      const iLo = Math.max(1, qq.r - K + 1), iHi = Math.min(qq.r, W);
      const jLo = Math.max(1, qq.c - K + 1), jHi = Math.min(qq.c, W);
      steps.push(snap({ kind: "range", qi, q: qq, delta, old, iLo, iHi, jLo, jHi }));
      for (let i = iLo; i <= iHi; i++) for (let j = jLo; j <= jHi; j++) { S[i][j] += delta; if (S[i][j] > curMax) curMax = S[i][j]; }
      out.push(curMax);
      steps.push(snap({ kind: "apply", qi, q: qq, delta, old, iLo, iHi, jLo, jHi }));
    });
    steps.push(snap({ kind: "done" }));
  }

  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const q = s.q;
  const hasRange = s.iLo != null;
  const curMax = s.curMax ?? 0;
  const showQ = s.kind === "arrive" || s.kind === "range" || s.kind === "apply";

  const FC = 30, SC = 40, gp = 3;
  const inRect = (i, j) => hasRange && i >= s.iLo && i <= s.iHi && j >= s.jLo && j <= s.jHi;

  const caption =
    s.kind === "intro" ? t(E,
        <>Watch the code run. Left = each cell's value (<b>beauty</b>), right = each photo's score (<b>S</b>). All 0 at first.</>,
        <>코드가 실제로 도는 모습이에요. 왼쪽 = 각 칸 값(<b>beauty</b>), 오른쪽 = 각 사진 점수(<b>S</b>). 처음엔 다 0.</>)
    : s.kind === "arrive" ? t(E,
        <>Query: set cell (<b>{q.r},{q.c}</b>) to <b>{q.v}</b>. <b>delta</b> = {q.v} − {s.old} = <b>{s.delta}</b> (the increase).</>,
        <>쿼리: 칸 (<b>{q.r},{q.c}</b>) 을 <b>{q.v}</b> 로. <b>delta</b> = {q.v} − {s.old} = <b>{s.delta}</b> (늘어난 만큼).</>)
    : s.kind === "range" ? t(E,
        <>Photos holding that cell: i <b>{s.iLo}~{s.iHi}</b>, j <b>{s.jLo}~{s.jHi}</b> → this rectangle in <b>S</b> (right).</>,
        <>그 칸을 품는 사진 범위: i <b>{s.iLo}~{s.iHi}</b>, j <b>{s.jLo}~{s.jHi}</b> → 오른쪽 <b>S</b> 의 이 사각형.</>)
    : s.kind === "apply" ? t(E,
        <>Add <b>{s.delta}</b> to each S cell in the rectangle. New best <b>cur_max = {curMax}</b> → print it.</>,
        <>사각형 S 칸마다 <b>+{s.delta}</b>. 최고값 <b>cur_max = {curMax}</b> → 출력.</>)
    : t(E,
        <>Each query touches only a <b>small rectangle</b> of S, then prints <b>cur_max</b>. That's the whole trick!</>,
        <>쿼리마다 S 의 <b>작은 사각형</b>만 건드리고 <b>cur_max</b> 출력. 이게 전부예요!</>);

  const Pill = ({ on, children }) => (
    <span style={{
      fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800,
      padding: "3px 9px", borderRadius: 7, whiteSpace: "nowrap",
      background: on ? "#0891b2" : "#f1f5f9", color: on ? "#fff" : "#94a3b8",
      border: `1px solid ${on ? "#0891b2" : "#e2e8f0"}`, transition: "all .15s",
    }}>{children}</span>
  );

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Watch the variables run", "변수가 도는 모습")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />

      {/* 설명 */}
      <div style={{ maxWidth: 500, margin: "4px auto 12px", padding: "9px 13px", borderRadius: 11,
        background: "#fff7ed", border: "1.5px solid #fdba74", color: "#9a3412",
        fontSize: 12.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.55 }}>
        {caption}
      </div>

      {/* 두 격자 */}
      <div style={{ display: "flex", gap: 30, justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* beauty */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#9a3412", textAlign: "center", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>
            beauty {t(E, "(cell values)", "(칸 값)")}
          </div>
          {Array.from({ length: N }).map((_, ri) => (
            <div key={ri} style={{ display: "flex", gap: gp, marginBottom: gp }}>
              {Array.from({ length: N }).map((_, ci) => {
                const R = ri + 1, Cc = ci + 1;
                const val = (s.beauty && s.beauty[R][Cc]) || 0;
                const hot = showQ && R === q.r && Cc === q.c;
                return (
                  <div key={ci} style={{ width: FC, height: FC, display: "flex", alignItems: "center",
                    justifyContent: "center", borderRadius: 5, fontFamily: "'JetBrains Mono',monospace",
                    fontWeight: 700, fontSize: 13, transition: "all .12s",
                    background: hot ? "#fb923c" : "#fff",
                    border: `${hot ? 2 : 1}px solid ${hot ? "#ea580c" : "#e2e8f0"}`,
                    color: hot ? "#fff" : val === 0 ? "#cbd5e1" : "#1f2937" }}>{val}</div>
                );
              })}
            </div>
          ))}
        </div>

        {/* S */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#5b21b6", textAlign: "center", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>
            S {t(E, "(photo scores)", "(사진 점수)")}
          </div>
          {Array.from({ length: W }).map((_, ii) => (
            <div key={ii} style={{ display: "flex", gap: gp, marginBottom: gp }}>
              {Array.from({ length: W }).map((_, jj) => {
                const I = ii + 1, J = jj + 1;
                const val = (s.S && s.S[I][J]) || 0;
                const rect = inRect(I, J);
                const isMax = (s.kind === "apply" || s.kind === "done") && val === curMax && val > 0;
                return (
                  <div key={jj} style={{ width: SC, height: SC, display: "flex", alignItems: "center",
                    justifyContent: "center", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace",
                    fontWeight: 800, fontSize: 15, transition: "all .12s", position: "relative",
                    background: rect ? "#ede9fe" : "#fff",
                    border: `${rect ? 2 : isMax ? 2 : 1}px solid ${rect ? "#7c3aed" : isMax ? "#16a34a" : "#e2e8f0"}`,
                    color: val === 0 ? "#cbd5e1" : "#4c1d95" }}>
                    {val}
                    {rect && s.kind === "range" && (
                      <span style={{ position: "absolute", bottom: -7, fontSize: 8.5, fontWeight: 800, color: "#7c3aed" }}>+{s.delta}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 변수 칩 */}
      <div style={{ display: "flex", gap: 7, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
        <Pill on={showQ}>{showQ ? `r=${q.r} c=${q.c} v=${q.v}` : "r=· c=· v=·"}</Pill>
        <Pill on={showQ}>delta = {showQ ? s.delta : "·"}</Pill>
        <Pill on={hasRange}>i_lo..i_hi = {hasRange ? `${s.iLo}..${s.iHi}` : "·"}</Pill>
        <Pill on={hasRange}>j_lo..j_hi = {hasRange ? `${s.jLo}..${s.jHi}` : "·"}</Pill>
        <Pill on={s.kind === "apply" || s.kind === "done"}>cur_max = {curMax}</Pill>
      </div>

      {/* 출력 */}
      <div style={{ textAlign: "center", marginTop: 10, fontSize: 12.5, color: "#334155", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, "output", "출력")}: <span style={{ color: "#0891b2", fontWeight: 800 }}>{(s.out && s.out.join("  ")) || "—"}</span>
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
