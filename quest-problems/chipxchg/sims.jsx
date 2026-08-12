// Chip Exchange (Dec 2025 Bronze #1) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
// 건드리지 않고 여기에만 (mooin3 / photoshoot25 와 같은 방식).
//
// 원칙: 학생 목소리(해요체), 관찰→추론, 시뮬로 개념. 색: 빨강=A칩, 파랑=B칩.
//   ① ChipCountSim — 최종 A = A + (B // cB) × cA (묶음/자투리 시각)
//   ② AdversarySim — 심술쟁이가 파랑에 몰아 자투리 낭비 → 최악 분배

import { t } from "@/components/quest/theme";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#2563eb";
const RED = "#ef4444", REDBG = "#fef2f2";
const BLU = "#3b82f6", BLUBG = "#eff6ff";

function Chip({ color, size = 26, faded = false, label = null }) {
  const c = color === "red" ? RED : BLU;
  return (
    <div style={{ position: "relative", width: size, height: size, borderRadius: 999, background: color === "red" ? REDBG : BLUBG,
      border: `2.5px solid ${c}`, opacity: faded ? 0.3 : 1, transition: "all .15s", flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: c }}>
      {label}
    </div>
  );
}
function Say({ children, tone = "go" }) {
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#f0f9ff", bd: "#7dd3fc", fg: "#075985" };
  return (
    <div style={{ maxWidth: 540, margin: "6px auto 16px", padding: "12px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
      fontSize: 13.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>{children}</div>
  );
}
function Cap({ color, children }) {
  return <div style={{ textAlign: "center", marginTop: 12, fontSize: 13.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace", wordBreak: "keep-all" }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   ChipCountSim — 최종 A 칩 세기. 예: A=2, B=7, 환전 3파랑→1빨강.
   B 를 cB 씩 묶어 → 묶음마다 A cA 개, 자투리는 버림.
   ═══════════════════════════════════════════════════════════════ */
export function ChipCountSim({ E }) {
  const Anow = 2, Bnow = 7, cB = 3, cA = 1;
  const groups = Math.floor(Bnow / cB), left = Bnow % cB;
  const steps = [{ kind: "have" }, { kind: "group" }, { kind: "convert" }, { kind: "total" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const say =
    s.kind === "have" ? t(E, <>I'm holding <b style={{color:RED}}>2 red (A)</b> and <b style={{color:BLU}}>7 blue (B)</b>. Exchange: <b>3 blue → 1 red</b>. How many red can I end with?</>,
                           <>지금 <b style={{color:RED}}>빨강(A) 2개</b>, <b style={{color:BLU}}>파랑(B) 7개</b>. 환전: <b>파랑 3개 → 빨강 1개</b>. 빨강을 최대 몇 개까지?</>)
    : s.kind === "group" ? t(E, <>Group the blue in <b>3</b>s: <b>7 = 3 + 3 + 1</b> → <b>2 full groups</b>, and <b>1 leftover</b>.</>,
                              <>파랑을 <b>3개씩</b> 묶어요: <b>7 = 3 + 3 + 1</b> → <b>완성 묶음 2개</b>, <b>자투리 1개</b>.</>)
    : s.kind === "convert" ? t(E, <>Each full group → <b>1 red</b>. So +2 red. The <b>leftover can't convert</b> — it's stuck.</>,
                                <>완성 묶음마다 → <b>빨강 1개</b>. 그래서 +2 빨강. <b>자투리는 못 바꿔요</b> — 그냥 남아요.</>)
    : t(E, <>Final red = <b>2 + 2 = 4</b>. Rule: <b>final A = A + (B ÷ cB) × cA</b> (÷ = drop leftovers).</>,
           <>최종 빨강 = <b>2 + 2 = 4</b>. 공식: <b>최종 A = A + (B ÷ cB) × cA</b> (÷ = 자투리 버림).</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "How many red chips do I end with?", "빨강 칩 몇 개로 끝날까?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "total" ? "aha" : "go"}>{say}</Say>

      {/* 빨강(A) */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: RED, width: 60, textAlign: "right" }}>{t(E, "red (A)", "빨강 A")}</span>
        {Array.from({ length: Anow }).map((_, i) => <Chip key={i} color="red" />)}
        {s.kind === "convert" || s.kind === "total"
          ? Array.from({ length: groups }).map((_, i) => <Chip key={"g" + i} color="red" label="+" />)
          : null}
      </div>
      {/* 파랑(B) — group 스텝부터 묶음 표시 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap", rowGap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: BLU, width: 60, textAlign: "right" }}>{t(E, "blue (B)", "파랑 B")}</span>
        {s.kind === "have" ? (
          Array.from({ length: Bnow }).map((_, i) => <Chip key={i} color="blue" />)
        ) : (
          <>
            {Array.from({ length: groups }).map((_, g) => (
              <div key={g} style={{ display: "flex", gap: 6, padding: 5, borderRadius: 10, border: `2px dashed ${BLU}`, background: "#f8fbff" }}>
                {Array.from({ length: cB }).map((_, i) => <Chip key={i} color="blue" faded={s.kind === "convert" || s.kind === "total"} />)}
              </div>
            ))}
            {Array.from({ length: left }).map((_, i) => (
              <div key={"l" + i} style={{ display: "flex", gap: 6, padding: 5, borderRadius: 10, border: "2px dashed #cbd5e1" }}>
                <Chip color="blue" />
              </div>
            ))}
          </>
        )}
      </div>
      {s.kind === "group" && <Cap color={BLU}>{t(E, "2 groups + 1 leftover", "묶음 2개 + 자투리 1개")}</Cap>}
      {s.kind === "convert" && <Cap color={RED}>{t(E, "2 groups → +2 red · leftover stuck", "묶음 2개 → 빨강 +2 · 자투리 남음")}</Cap>}
      {s.kind === "total" && <Cap color="#15803d">final A = 2 + (7 ÷ 3)×1 = 4</Cap>}

      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AdversarySim — 한 x(=8)에서 심술쟁이가 나눌 수 있는 모든 분배를
   파랑 b=0,1,…,8 차례로 다 따져 최악(최소 최종빨강)을 찾음.
   최종 빨강 = a + (b // cB)×cA, a = 8-b. 심술쟁이는 이 값이 최소인 걸 고름.
   ═══════════════════════════════════════════════════════════════ */
export function AdversarySim({ E }) {
  const cA = 2, cB = 3, fA = 5, X = 8;
  const rows = Array.from({ length: X + 1 }, (_, b) => {
    const a = X - b, g = Math.floor(b / cB), w = b % cB;
    return { b, a, g, w, val: a + g * cA };
  });
  const steps = [{ kind: "intro" }, ...rows.map((r) => ({ kind: "b", b: r.b }))];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const curB = s.kind === "b" ? s.b : -1;
  const cur = curB >= 0 ? rows[curB] : null;
  // 지금까지(0..curB) 최솟값 = 심술쟁이가 노리는 최악
  const seen = curB >= 0 ? rows.slice(0, curB + 1) : [];
  const worstSoFar = seen.length ? Math.min(...seen.map((r) => r.val)) : null;
  const worstB = seen.length ? seen.reduce((mi, r) => (r.val < rows[mi].val ? r.b : mi), 0) : -1;
  const isNewMin = cur && cur.val === worstSoFar && (curB === 0 || cur.val < Math.min(...rows.slice(0, curB).map((r) => r.val)));
  const isLast = curB === X;

  const say =
    s.kind === "intro"
      ? t(E, <><b>x = 8</b> extra chips arrive. The <b>trickster</b> splits them: <b style={{color:RED}}>a red</b> + <b style={{color:BLU}}>b blue</b> (a+b=8). Which split hurts me most? Let's try <b>every b = 0…8</b> and count my final red.</>,
             <><b>추가 칩 8개</b>가 왔어요. <b>심술쟁이</b>가 나눠요: <b style={{color:RED}}>빨강 a개</b> + <b style={{color:BLU}}>파랑 b개</b> (a+b=8). 어느 분배가 제일 나쁠까요? <b>파랑 b = 0…8</b> 을 하나씩 넣어보며 최종 빨강을 세어봐요.</>)
      : isLast
      ? t(E, <><b>b = 8</b>: all blue = 3+3+<b>2 wasted</b> → 2 groups → <b style={{color:"#dc2626"}}>4 red</b>. This is the <b>worst</b>. 4 &lt; goal 5 → with x=8 the trickster wins <b>✗</b>.</>,
             <><b>b = 8</b>: 다 파랑 = 3+3+<b>자투리 2 낭비</b> → 묶음 2개 → <b style={{color:"#dc2626"}}>빨강 4개</b>. 이게 <b>최악</b>이에요. 4 &lt; 목표 5 → x=8 로는 심술쟁이가 이겨요 <b>✗</b>.</>)
      : t(E,
          <>b = {cur.b}: <b style={{color:BLU}}>{cur.b} blue</b> = {cur.g} group{cur.g!==1?"s":""} (+{cur.g*cA} red){cur.w?<>, {cur.w} wasted</>:null}, plus <b style={{color:RED}}>{cur.a} red</b> → final <b>{cur.val}</b>.{isNewMin?<> <b style={{color:"#dc2626"}}>worst so far 😈</b></>:null}</>,
          <>b = {cur.b}: <b style={{color:BLU}}>파랑 {cur.b}</b> = 묶음 {cur.g}개(+빨강 {cur.g*cA}){cur.w?<>, 자투리 {cur.w} 낭비</>:null}, 빨강 {cur.a}는 그대로 → 최종 <b>{cur.val}</b>.{isNewMin?<> <b style={{color:"#dc2626"}}>지금까지 최악 😈</b></>:null}</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Try every split — find the worst", "모든 분배 다 따지기 — 최악 찾기")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, "start A=0, B=0 · 3 blue → 2 red · goal 5 · extra x=8", "시작 A=0, B=0 · 파랑 3 → 빨강 2 · 목표 5 · 추가 x=8")}
      </div>
      <Say tone={isLast ? "stuck" : isNewMin ? "stuck" : "go"}>{say}</Say>

      {cur && (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {/* 현재 분배 그림: a 빨강 + b 파랑(3묶음, 자투리 낭비) */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap", minHeight: 40, marginBottom: 10 }}>
            {Array.from({ length: cur.a }).map((_, i) => <Chip key={"a" + i} color="red" size={18} />)}
            {cur.a > 0 && cur.b > 0 && <span style={{ color: "#94a3b8", fontWeight: 800 }}>+</span>}
            {Array.from({ length: cur.g }).map((_, g) => (
              <div key={g} style={{ display: "flex", gap: 4, padding: 4, borderRadius: 8, border: `2px dashed ${BLU}`, background: "#f8fbff" }}>
                {Array.from({ length: cB }).map((_, i) => <Chip key={i} color="blue" size={18} />)}
              </div>
            ))}
            {cur.w > 0 && (
              <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 8, border: "2px dashed #dc2626", background: "#fef2f2", alignItems: "center" }}>
                {Array.from({ length: cur.w }).map((_, i) => <Chip key={i} color="blue" size={18} faded />)}
                <span style={{ fontSize: 10, fontWeight: 800, color: "#dc2626" }}>{t(E, "waste", "낭비")}</span>
              </div>
            )}
          </div>
          <div style={{ textAlign: "center", fontSize: 13.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "#334155", marginBottom: 12 }}>
            {cur.a} + ({cur.b}÷{cB})×{cA} = <b style={{ color: cur.val === worstSoFar ? "#dc2626" : "#334155" }}>{cur.val}</b>
          </div>

          {/* b=0..8 결과 셀 — 지금까지 revealed, 최악 셀 😈 표시 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
            {rows.map((r) => {
              const shown = r.b <= curB;
              const isWorst = shown && r.val === worstSoFar && r.b === worstB;
              return (
                <div key={r.b} style={{ width: 40, textAlign: "center", opacity: shown ? 1 : 0.25, transition: "all .15s" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8" }}>b={r.b}</div>
                  <div style={{ marginTop: 2, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                    background: isWorst ? "#fee2e2" : shown ? "#f1f5f9" : "#f8fafc",
                    border: isWorst ? "2px solid #dc2626" : "1px solid #e2e8f0",
                    color: isWorst ? "#dc2626" : "#334155" }}>
                    {shown ? r.val : "·"}
                  </div>
                  {isWorst && <div style={{ fontSize: 12 }}>😈</div>}
                </div>
              );
            })}
          </div>
          {worstSoFar != null && (
            <div style={{ textAlign: "center", marginTop: 10, fontSize: 12.5, fontWeight: 800, wordBreak: "keep-all",
              color: isLast ? (worstSoFar >= fA ? "#15803d" : "#dc2626") : "#dc2626" }}>
              {t(E, "worst so far = ", "지금까지 최악 = ")}<b>{worstSoFar}</b>
              {isLast && <> {worstSoFar >= fA ? `≥ ${fA} ✓` : `< ${fA} ✗ ` + t(E, "(x=8 not enough)", "(x=8 부족)")}</>}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SearchSim — 바깥 루프: x = 0,1,2,… 를 차례로 훑으며 각 x 의 최악 f(x)
   (AdversarySim 이 한 x 에서 구한 그 값) 를 계단으로 쌓아, 목표에 처음 닿는 x 를 찾음.
   f(x) 는 안 줄어듦(계단) → 이분탐색으로 콕. 답 x=9.
   ═══════════════════════════════════════════════════════════════ */
export function SearchSim({ E }) {
  const cA = 2, cB = 3, fA = 5;
  const worst = (x) => { let m = Infinity; for (let b = 0; b <= x; b++) m = Math.min(m, (x - b) + Math.floor(b / cB) * cA); return m; };
  const XS = Array.from({ length: 10 }, (_, x) => ({ x, v: worst(x) })); // x=0..9
  const firstOk = XS.find((d) => d.v >= fA)?.x;               // 9
  const maxV = Math.max(fA, ...XS.map((d) => d.v)) + 1;        // headroom
  const steps = [{ kind: "intro" }, ...XS.map((d) => ({ kind: "x", x: d.x })), { kind: "search" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const curX = s.kind === "x" ? s.x : s.kind === "search" ? 9 : -1;
  const cur = curX >= 0 ? XS[curX] : null;
  const reached = cur && cur.v >= fA;
  const firstReach = s.kind === "x" && cur.x === firstOk;

  const say =
    s.kind === "intro"
      ? t(E, <>Now the real question: the <b>fewest x</b>. For each x, the trickster's worst gives <b>f(x)</b> (just like we counted). Sweep <b>x = 0, 1, 2, …</b> and watch where f(x) first reaches goal <b>{fA}</b>.</>,
             <>이제 진짜 질문 — <b>최소 x</b>. 각 x 마다 심술쟁이 최악이 <b>f(x)</b> 예요 (방금 센 그 값). <b>x = 0, 1, 2, …</b> 를 훑으며 f(x) 가 목표 <b>{fA}</b> 에 처음 닿는 곳을 봐요.</>)
      : s.kind === "search"
      ? t(E, <>Notice f(x) <b>never drops</b> — more chips can't hurt (dump extras on red). A <b>staircase ↗</b>. So we don't test every x — <b>binary search</b> jumps to the first one. Answer <b>x = {firstOk}</b>. (x can be up to ~10¹⁸)</>,
             <>보세요 — f(x) 는 <b>절대 안 줄어요</b> (칩 많아져 손해는 없으니, 남는 건 빨강에). <b>계단 ↗</b>. 그래서 모든 x 를 안 돌고 <b>이분탐색</b>으로 처음 닿는 x 를 콕 집어요. 답 <b>x = {firstOk}</b>. (x 는 최대 ~10¹⁸)</>)
      : firstReach
      ? t(E, <><b>x = {cur.x}</b>: worst f = <b style={{color:"#15803d"}}>{cur.v}</b> ≥ goal {fA} — <b style={{color:"#15803d"}}>reached ✓</b>. This is the first x that always wins.</>,
             <><b>x = {cur.x}</b>: 최악 f = <b style={{color:"#15803d"}}>{cur.v}</b> ≥ 목표 {fA} — <b style={{color:"#15803d"}}>도달 ✓</b>. 어떻게 나눠도 이기는 첫 x 예요.</>)
      : t(E, <>x = {cur.x}: worst f = <b>{cur.v}</b> {cur.v >= fA ? <>≥ {fA} ✓</> : <>&lt; {fA} — <b style={{color:"#dc2626"}}>still not enough ✗</b></>}</>,
             <>x = {cur.x}: 최악 f = <b>{cur.v}</b> {cur.v >= fA ? <>≥ {fA} ✓</> : <>&lt; {fA} — <b style={{color:"#dc2626"}}>아직 부족 ✗</b></>}</>);

  const H = 130;
  const showUpTo = s.kind === "search" ? 9 : curX;

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Sweep x — find the smallest that wins", "x 를 훑어 — 이기는 가장 작은 x")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, "3 blue → 2 red · goal 5 · f(x) = trickster's worst", "파랑 3 → 빨강 2 · 목표 5 · f(x) = 심술쟁이 최악")}
      </div>
      <Say tone={s.kind === "search" ? "aha" : firstReach ? "aha" : "go"}>{say}</Say>

      {/* f(x) 계단 막대 — x' <= showUpTo 만 노출 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 8, height: H + 24, position: "relative", maxWidth: 500, margin: "0 auto" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: (fA / maxV) * H + 20, borderTop: "2px dashed #dc2626", zIndex: 2 }}>
          <span style={{ position: "absolute", right: 0, top: -15, fontSize: 10, fontWeight: 800, color: "#dc2626" }}>{t(E, `goal ${fA}`, `목표 ${fA}`)}</span>
        </div>
        {XS.map((d) => {
          const shown = d.x <= showUpTo;
          const ok = d.v >= fA, first = d.x === firstOk;
          const isCur = s.kind === "x" && d.x === curX;
          return (
            <div key={d.x} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, opacity: shown ? 1 : 0.2, transition: "all .15s" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: shown ? (ok ? "#15803d" : "#64748b") : "#cbd5e1" }}>{shown ? d.v : ""}</div>
              <div style={{ width: 30, height: shown ? (d.v / maxV) * H + 2 : 2, borderRadius: "4px 4px 0 0",
                background: !shown ? "#e2e8f0" : first ? "#15803d" : ok ? "#86efac" : "#bfdbfe",
                boxShadow: isCur ? "0 0 0 3px #fde68a" : "none", transition: "all .18s" }} />
              <div style={{ fontSize: 11, fontWeight: (isCur || first) ? 800 : 600, color: first ? "#15803d" : isCur ? "#b45309" : "#94a3b8", fontFamily: "'JetBrains Mono',monospace" }}>{d.x}</div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 10.5, color: "#94a3b8", marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>x →</div>

      {s.kind === "search" && (
        <div style={{ maxWidth: 460, margin: "12px auto 0", background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 12.5, color: "#065f46", lineHeight: 1.7, wordBreak: "keep-all", textAlign: "center", fontWeight: 700 }}>
          {t(E, <>Staircase ↗ → <b>binary search</b> → answer <b>x = {firstOk}</b></>,
               <>계단 ↗ → <b>이분탐색</b> → 답 <b>x = {firstOk}</b></>)}
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GameBoardSim — "이 게임 한 판" 을 구체 그림으로 한 장면씩.
   예: 시작 빨강 2, 파랑 3 · 교환 파랑3→빨강2 · 목표 빨강 5.
   setup → exchange → goal(모자람) → 반전(심술쟁이) → 우리 질문
   ═══════════════════════════════════════════════════════════════ */
export function GameBoardSim({ E }) {
  const steps = [{ kind: "setup" }, { kind: "swap" }, { kind: "goal" }, { kind: "twist" }, { kind: "ask" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  // 파랑을 교환에 다 써버린 이후 상태 (빨강 =4, 파랑 흐림) — goal/twist/ask 공통
  const spent = s.kind === "goal" || s.kind === "twist" || s.kind === "ask";

  const say =
    s.kind === "setup" ? t(E, <>Bessie starts with <b style={{color:RED}}>2 red chips</b> and <b style={{color:BLU}}>3 blue chips</b>. That's her whole pile.</>,
                            <>베시는 <b style={{color:RED}}>빨강 칩 2개</b>, <b style={{color:BLU}}>파랑 칩 3개</b>로 시작해요. 이게 가진 전부예요.</>)
    : s.kind === "swap" ? t(E, <>There's an exchange booth: <b>hand in 3 blue → get 2 red</b>. One direction only (blue → red), as often as you like.</>,
                             <>교환소가 있어요: <b>파랑 3개를 내면 → 빨강 2개</b>. 한 방향만 (파랑 → 빨강), 몇 번이든.</>)
    : s.kind === "goal" ? t(E, <>Goal: reach <b style={{color:"#15803d"}}>5 red chips</b>. Best I can do now: 2 red + (swap 3 blue) 2 red = <b>4 red</b>. <b style={{color:"#dc2626"}}>1 short ✗</b>.</>,
                             <>목표: <b style={{color:"#15803d"}}>빨강 5개</b> 모으기. 지금 최선: 빨강 2 + (파랑 3 교환) 빨강 2 = <b>빨강 4개</b>. <b style={{color:"#dc2626"}}>1개 모자라 ✗</b>.</>)
    : s.kind === "twist" ? t(E, <>So I grab <b>extra chips</b>. The catch: <b>I can't pick their color</b> — a <b style={{color:"#dc2626"}}>trickster</b> paints each one red or blue, in the meanest way for me.</>,
                              <>그래서 <b>칩을 더 받아요</b>. 함정: <b>색은 내가 못 골라요</b> — <b style={{color:"#dc2626"}}>심술쟁이</b>가 하나씩 빨강·파랑으로 칠해요, 나한테 제일 나쁘게.</>)
    : t(E, <><b>Our question:</b> however the trickster paints them, I must still reach 5 red. <b>What's the fewest extra chips</b> that guarantees it? → that number is the answer.</>,
           <><b>우리 질문:</b> 심술쟁이가 어떻게 칠해도 빨강 5개는 채워야 해요. <b>그걸 보장하는 가장 적은 추가 칩 개수</b>는? → 그 개수가 답이에요.</>);

  return (
    <div style={{ padding: 16 }}>
      {/* 문제 제목 (정적 인트로 대신 여기 한 줄로) */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>🔵 Chip Exchange</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginTop: 2 }}>USACO Dec 2025 Bronze #1</div>
      </div>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "One round of the game", "이 게임 한 판")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "goal" ? "stuck" : s.kind === "ask" ? "aha" : "go"}>{say}</Say>

      {/* 내 칩 — 항상 표시 */}
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        {/* 빨강 줄 — goal 부터 교환으로 얻은 +2 를 붙여 =4 를 계속 보여줌 */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: RED, width: 56, textAlign: "right" }}>{t(E, "red", "빨강")}</span>
          {Array.from({ length: 2 }).map((_, i) => <Chip key={i} color="red" />)}
          {spent && <><span style={{ color: "#94a3b8", fontWeight: 800 }}>+</span>
            {Array.from({ length: 2 }).map((_, i) => <Chip key={"e" + i} color="red" label="+" />)}
            <span style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginLeft: 4, fontFamily: "'JetBrains Mono',monospace" }}>= 4</span></>}
        </div>
        {/* 파랑 줄 — swap 에서 교환, 이후엔 흐리게(소모됨) 유지 */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: BLU, width: 56, textAlign: "right" }}>{t(E, "blue", "파랑")}</span>
          {s.kind === "setup" ? (
            Array.from({ length: 3 }).map((_, i) => <Chip key={i} color="blue" />)
          ) : (
            <div style={{ display: "flex", gap: 3, padding: 4, borderRadius: 10, border: `2px dashed ${BLU}`, background: "#f8fbff" }}>
              {Array.from({ length: 3 }).map((_, i) => <Chip key={i} color="blue" faded={spent} />)}
            </div>
          )}
          {s.kind === "swap" && <><span style={{ color: "#94a3b8", fontWeight: 800 }}>→</span>
            {Array.from({ length: 2 }).map((_, i) => <Chip key={"r" + i} color="red" />)}
            <span style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", marginLeft: 2, wordBreak: "keep-all" }}>{t(E, "(2 more red)", "(빨강 2개 더)")}</span></>}
          {spent && <span style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", marginLeft: 2, wordBreak: "keep-all" }}>{t(E, "(spent)", "(다 씀)")}</span>}
        </div>

        {/* 교환소 규칙 배지 — setup 에선 숨김(아직 교환·목표 얘기 전) */}
        {s.kind !== "setup" && (
          <div style={{ textAlign: "center", fontSize: 11.5, fontWeight: 800, color: "#64748b", fontFamily: "'JetBrains Mono',monospace", marginTop: 6, wordBreak: "keep-all" }}>
            🔄 {t(E, "3 blue → 2 red", "파랑 3 → 빨강 2")} · 🎯 {t(E, "goal 5 red", "목표 빨강 5")}
          </div>
        )}

        {/* twist / ask — 심술쟁이 등장. 색·개수 미정 → 회색 ? 칩 */}
        {(s.kind === "twist" || s.kind === "ask") && (
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px dashed #e2e8f0", display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ fontSize: 28 }}>😈</div>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "extra chips", "추가 칩")}</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: 999, background: "#f1f5f9", border: "2px dashed #94a3b8",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#64748b" }}>?</div>
              ))}
              <span style={{ fontSize: 16, fontWeight: 800, color: "#94a3b8" }}>…</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "color = worst for me", "색은 나한테 최악")}</span>
          </div>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}
