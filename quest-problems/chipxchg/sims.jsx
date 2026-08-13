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
const NW = { whiteSpace: "nowrap" }; // 수식·숫자단위 한 덩어리로 (읽기 좋은 줄바꿈)

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
    <div style={{ maxWidth: 460, margin: "6px auto 16px", padding: "12px 18px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
      fontSize: 13.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.75 }}>{children}</div>
  );
}
function Cap({ color, children }) {
  return <div style={{ textAlign: "center", marginTop: 12, fontSize: 13.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace", wordBreak: "keep-all", textWrap: "balance" }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   ChipCountSim — 최종 A 칩 세기. 예: A=2, B=7, 환전 3파랑→1빨강.
   B 를 cB 씩 묶어 → 묶음마다 A cA 개, 자투리는 버림.
   ═══════════════════════════════════════════════════════════════ */
export function ChipCountSim({ E }) {
  const Anow = 2, Bnow = 7, cB = 3, cA = 2;
  const groups = Math.floor(Bnow / cB), left = Bnow % cB;
  const gain = groups * cA, total = Anow + gain;
  const steps = [{ kind: "have" }, { kind: "group" }, { kind: "convert" }, { kind: "total" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const say =
    s.kind === "have" ? t(E, <>I'm holding <b style={{color:RED,...NW}}>2 red (A)</b> and <b style={{color:BLU,...NW}}>7 blue (B)</b>. Exchange: <b style={NW}>3 blue → 2 red</b>. How many red can I end with?</>,
                           <>지금 <b style={{color:RED,...NW}}>빨강(A) 2개</b>, <b style={{color:BLU,...NW}}>파랑(B) 7개</b>. 환전: <b style={NW}>파랑 3개 → 빨강 2개</b>. 빨강을 최대 몇 개까지?</>)
    : s.kind === "group" ? t(E, <>Group the blue in <b>3</b>s: <b style={NW}>7 = 3 + 3 + 1</b> → <b style={NW}>2 full groups</b>, and <b style={NW}>1 leftover</b>.</>,
                              <>파랑을 <b style={NW}>3개씩</b> 묶어요: <b style={NW}>7 = 3 + 3 + 1</b> → <b style={NW}>완성 묶음 2개</b>, <b style={NW}>자투리 1개</b>.</>)
    : s.kind === "convert" ? t(E, <>Each full group → <b style={NW}>2 red</b>. So <b style={NW}>+4 red</b>. The <b style={NW}>leftover can't convert</b> — it's stuck.</>,
                                <>완성 묶음마다 → <b style={NW}>빨강 2개</b>. 그래서 <b style={NW}>+4 빨강</b>. <b style={NW}>자투리는 못 바꿔요</b> — 그냥 남아요.</>)
    : t(E, <>Final red = <b style={NW}>2 + 4 = 6</b>. Rule: <b style={NW}>final A = A + (B ÷ cB) × cA</b> (÷ = drop leftovers).</>,
           <>최종 빨강 <b style={NW}>= 2 + 4 = 6</b>. 공식: <b style={NW}>최종 A = A + (B÷cB)×cA</b> <span style={NW}>(자투리 버림)</span>.</>);

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
          ? Array.from({ length: gain }).map((_, i) => <Chip key={"g" + i} color="red" label="+" />)
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
      {s.kind === "convert" && <Cap color={RED}>{t(E, "2 groups → +4 red · leftover stuck", "묶음 2개 → 빨강 +4 · 자투리 남음")}</Cap>}
      {s.kind === "total" && <Cap color="#15803d">final A = 2 + (7 ÷ 3)×2 = 6</Cap>}

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
  // 브루트: b = 0…X 를 다 따져 최악(최소) 찾기. (공식 유도는 다음 단계로 분리)
  const steps = [{ kind: "intro" }, ...rows.map((r) => ({ kind: "b", b: r.b }))];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const curB = s.kind === "b" ? s.b : -1;
  const cur = curB >= 0 ? rows[curB] : null;
  const seen = curB >= 0 ? rows.slice(0, curB + 1) : [];
  const worstSoFar = seen.length ? Math.min(...seen.map((r) => r.val)) : null;
  const worstB = seen.length ? seen.reduce((mi, r) => (r.val < rows[mi].val ? r.b : mi), 0) : -1;
  const isNewMin = cur && cur.val === worstSoFar && (curB === 0 || cur.val < Math.min(...rows.slice(0, curB).map((r) => r.val)));
  const isLast = s.kind === "b" && curB === X;

  const say =
    s.kind === "intro"
      ? t(E, <>Let's test one candidate from the strategy — say <b style={NW}>x = 8</b>. What's the trickster's <b>worst</b> split? Slide <b>b</b> (blue) from 0 up.</>,
             <>전략에서 말한 <b>후보 하나</b>를 시험해요 — 예로 <b style={NW}>x = 8</b>. 심술쟁이의 <b>최악 분배</b>는? 아래 <b>b</b>(파랑)를 0부터 늘려봐요.</>)
      : isLast
      ? t(E, <><b style={NW}>b=8 (all blue):</b> <span style={NW}>2 groups → +4 red</span>, <span style={NW}>2 wasted</span> → <b style={{color:"#dc2626",...NW}}>final 4</b>. <span style={NW}>4 &lt; goal 5</span> → <b style={NW}>x=8 not enough ✗</b></>,
             <><b style={NW}>b=8 (다 파랑):</b> <span style={NW}>묶음 2 → +빨강 4</span>, <span style={NW}>자투리 2 버림</span> → <b style={{color:"#dc2626",...NW}}>최종 4</b>. <span style={NW}>4 &lt; 목표 5</span> → <b style={NW}>x=8 부족 ✗</b></>)
      : t(E,
          <><b style={NW}>b={cur.b} ({cur.b} blue):</b> <span style={NW}>swap → <b style={{color:cur.g?"#15803d":"#94a3b8"}}>+{cur.g*cA} red</b>{cur.w?` (${cur.w} wasted)`:""}</span>, <span style={NW}>{cur.a} red kept</span> → <b>final {cur.val}</b></>,
          <><b style={NW}>b={cur.b} (파랑 {cur.b}개):</b> <span style={NW}>환전 → <b style={{color:cur.g?"#15803d":"#94a3b8"}}>+빨강 {cur.g*cA}</b>{cur.w?` (자투리 ${cur.w} 버림)`:""}</span>, <span style={NW}>빨강 {cur.a}개는 그대로</span> → <b>최종 {cur.val}</b></>);

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

          {/* b=0..8 결과 셀 — 지금까지 revealed, 최악 셀 😈 */}
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
   FormulaDeriveSim — 브루트 표(심술쟁이)에서 O(1) 공식을 관찰→추론→공식 으로 유도.
   why(브루트 한계) → obs(최악 = 자투리 최대) → infer(가장 큰 것) → formula(r1)
   ═══════════════════════════════════════════════════════════════ */
export function FormulaDeriveSim({ E }) {
  const cA = 2, cB = 3, X = 8;
  const rows = Array.from({ length: X + 1 }, (_, b) => {
    const a = X - b, g = Math.floor(b / cB), w = b % cB;
    return { b, a, g, w, val: a + g * cA };
  });
  const worstB = rows.reduce((mi, r) => (r.val < rows[mi].val ? r.b : mi), 0);
  const steps = [{ kind: "why" }, { kind: "obs" }, { kind: "infer" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const worst = rows[worstB];
  const say =
    s.kind === "why"
      ? t(E, <>The same table we built. <span style={NW}>If x hits 10¹⁸</span> we can't scan all b — <span style={NW}>let's find the pattern.</span></>,
             <>앞에서 만든 그 표예요. <span style={NW}>x 가 10¹⁸ 면</span> <span style={NW}>b 다 못 봐</span> → <span style={NW}>규칙을 찾아요.</span></>)
      : s.kind === "obs"
      ? t(E, <><b>Observe:</b> the value dips hardest where a split <b>wastes 2 blue</b> (leftover cB−1 = 2). Those b = <span style={NW}><b>2, 5, 8</b></span> — the candidates for worst.</>,
             <><b>관찰:</b> <b>파랑 2개를 버릴 때</b>(자투리 cB−1 = 2) 값이 훅 낮아져요. 그런 b = <span style={NW}><b>2, 5, 8</b></span> — 최악 후보들.</>)
      : s.kind === "infer"
      ? t(E, <><b>Biggest of them = worst.</b> Blue loses <span style={NW}>(3 blue → 2 red)</span>, so bigger b → fewer red: <span style={NW}>b=2 → 6</span>, <span style={NW}>b=5 → 5</span>, <span style={NW}>b=8 → 4</span>. → worst <b>b = 8</b>. <span style={{color:"#2563eb"}}>Next: build the formula for it.</span></>,
             <><b>이 중 가장 큰 게 최악.</b> 파랑은 손해라 <span style={NW}>(파랑 3 → 빨강 2)</span> b 클수록 빨강이 줄어요: <span style={NW}>b=2 → 6</span>, <span style={NW}>b=5 → 5</span>, <span style={NW}>b=8 → 4</span>. → 최악 <b>b = 8</b>. <span style={{color:"#2563eb"}}>다음: 이 b 의 공식을 만들어요.</span></>)
      : t(E, <><b>As a formula:</b> get that worst <b>b = 8</b> directly — no brute loop. Steps <b>①②③</b> below are the calc.</>,
             <><b>공식으로:</b> 그 최악 <b>b = 8</b> 을 브루트 없이 바로 계산해요. 아래 <b>①②③</b> 이 그 계산이에요.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Find the worst b from the table", "표에서 최악 b 찾기")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, wordBreak: "keep-all", lineHeight: 1.5 }}>
        {t(E, "start red 0 · blue 0 · swap: 3 blue → 2 red · goal 5 · extra x=8", "시작 빨강 0 · 파랑 0 · 환전: 파랑 3 → 빨강 2 · 목표 5 · 추가 x=8")}
        <br/>{t(E, "b = blue chips given · value = my final red (smaller = worse)", "b = 파랑에 준 칩 · 값 = 그때 내 최종 빨강 (작을수록 최악)")}
      </div>
      <Say tone={s.kind === "infer" ? "aha" : "stuck"}>{say}</Say>

      {/* why: 앞에서 본 칩 분배 그림 하나 복습 (예: 최악 b=8) */}
      {s.kind === "why" && (
        <div style={{ maxWidth: 460, margin: "0 auto 12px", background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: 10, padding: "8px 12px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6 }}>{t(E, `e.g. b=${worst.b} split:`, `예: b=${worst.b} 분배`)}</div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {Array.from({ length: worst.a }).map((_, i) => <Chip key={"a" + i} color="red" size={16} />)}
            {Array.from({ length: worst.g }).map((_, g) => (
              <div key={g} style={{ display: "flex", gap: 3, padding: 3, borderRadius: 7, border: `2px dashed ${BLU}`, background: "#f8fbff" }}>
                {Array.from({ length: cB }).map((_, i) => <Chip key={i} color="blue" size={16} />)}
              </div>
            ))}
            {worst.w > 0 && (
              <div style={{ display: "flex", gap: 3, padding: 3, borderRadius: 7, border: "2px dashed #dc2626", background: "#fef2f2", alignItems: "center" }}>
                {Array.from({ length: worst.w }).map((_, i) => <Chip key={i} color="blue" size={16} faded />)}
                <span style={{ fontSize: 9, fontWeight: 800, color: "#dc2626" }}>{t(E, "waste", "낭비")}</span>
              </div>
            )}
            <span style={{ fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "#334155", marginLeft: 4 }}>= <b style={{ color: "#dc2626" }}>{worst.val}</b></span>
          </div>
        </div>
      )}

      {/* b=0..8 결과 표 — obs: 자투리최대 파랑 / infer·formula: 최악 빨강 */}
      <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
        {rows.map((r) => {
          const isMaxLeft = r.w === cB - 1;
          const isWorst = r.b === worstB;
          let op, mark;
          if (s.kind === "obs") { op = isMaxLeft ? 1 : 0.3; mark = isMaxLeft ? "maxleft" : null; }
          else if (s.kind === "infer") { op = isWorst ? 1 : 0.3; mark = isWorst ? "worst" : null; }
          else if (s.kind === "formula") { op = (isMaxLeft || isWorst) ? 1 : 0.25; mark = isWorst ? "worst" : isMaxLeft ? "maxleft" : null; }
          else { op = 1; mark = null; }
          const bg = mark === "worst" ? "#fee2e2" : mark === "maxleft" ? "#dbeafe" : "#f1f5f9";
          const bd = mark === "worst" ? "2px solid #dc2626" : mark === "maxleft" ? "2px solid #2563eb" : "1px solid #e2e8f0";
          const fg = mark === "worst" ? "#dc2626" : mark === "maxleft" ? "#1e40af" : "#334155";
          return (
            <div key={r.b} style={{ width: 40, textAlign: "center", opacity: op, transition: "all .15s" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8" }}>b={r.b}</div>
              <div style={{ marginTop: 2, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", background: bg, border: bd, color: fg }}>{r.val}</div>
              {mark === "worst" && <div style={{ fontSize: 12 }}>😈</div>}
              {mark === "maxleft" && <div style={{ fontSize: 8.5, fontWeight: 800, color: "#2563eb" }}>{t(E, "waste 2", "자투리2")}</div>}
            </div>
          );
        })}
      </div>

      {s.kind === "formula" && (
        <div style={{ maxWidth: 480, margin: "14px auto 0", background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "12px 16px", fontSize: 12.5, color: "#1e3a8a", lineHeight: 1.7, wordBreak: "keep-all", textAlign: "left" }}>
          <div style={{ marginBottom: 5 }}>{t(E, <><b>①</b> waste 2 = total blue leaves <b>remainder 2</b> (÷3). Start blue 0 → first such <b style={{color:"#2563eb"}}>b = 2</b>.</>,
                                              <><b>①</b> 파랑 2개 버리기 = 총 파랑을 <b>3으로 나눠 2 남기기</b>. 시작 파랑 0 → 처음 그런 <b style={{color:"#2563eb"}}>b = 2</b>.</>)}</div>
          <div style={{ marginBottom: 5 }}>{t(E, <><b>②</b> add <b>+3</b> each time — same remainder: <span style={NW}><b>2 → 5 → 8</b></span>.</>,
                                              <><b>②</b> <b>+3</b>씩 더하기 — 나머지 그대로: <span style={NW}><b>2 → 5 → 8</b></span>.</>)}</div>
          <div>{t(E, <><b>③</b> largest ≤ <span style={NW}>x = 8</span> → worst <b style={{color:"#dc2626"}}>b = 8</b>, final red <b style={{color:"#dc2626"}}>4</b>.</>,
                     <><b>③</b> <span style={NW}>x = 8</span> 이하 가장 큰 것 → 최악 <b style={{color:"#dc2626"}}>b = 8</b>, 최종 빨강 <b style={{color:"#dc2626"}}>4</b>.</>)}</div>
          <div style={{ marginTop: 9, paddingTop: 9, borderTop: "1px dashed #93c5fd", fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 800, color: "#1e40af", wordBreak: "break-word" }}>
            r1 = (cB−1 − B%cB)%cB = (2−0)%3 = 2
          </div>
          <div style={{ marginTop: 3, fontSize: 11, color: "#475569", wordBreak: "keep-all" }}>
            {t(E, <>= “how many more blue to reach remainder 2?” (start blue 0 → 2). Then +cB up to x. No loop — <b>O(1)</b>.</>,
                  <>= “나머지 2 되려면 파랑 몇 개 더?” <span style={NW}>(시작 파랑 0 → 2)</span>. 그다음 x 까지 +cB. 반복 없이 — <b>O(1)</b>.</>)}
          </div>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FormulaBuildSim — r1 공식을 '자투리 트레이'로 하나씩 유도.
   what(자투리 뜻) → goal(최대 cB−1) → start(B=0) → +1 → +1(도착) →
   formula(r1 식) → other(B≠0 예로 −B%cB 이유) → extend(+cB: 2→5→8, x이하 최대)
   ═══════════════════════════════════════════════════════════════ */
export function FormulaBuildSim({ E }) {
  const cB = 3, X = 8, target = cB - 1;
  const steps = [
    { kind: "rule" }, { kind: "add1" }, { kind: "add2" },
    { kind: "formula" }, { kind: "other" }, { kind: "extend" },
  ];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const addedByKind = { rule: 0, add1: 1, add2: 2, formula: 2, other: 0, extend: X };
  const B = s.kind === "other" ? 4 : 0;
  const added = addedByKind[s.kind];
  const total = B + added;
  const groups = Math.floor(total / cB);
  const left = total % cB;
  const hit = left === target;
  const showTarget = s.kind === "rule";

  const say =
    s.kind === "rule"
      ? t(E, <>Blue swaps in <b>3s</b>. Whatever can't fill a group is <b style={{color:"#dc2626"}}>leftover</b> — wasted. The trickster wants <span style={NW}><b>2 leftover</b> (the max)</span>.</>,
             <>파랑은 <b>3개</b> 모여야 교환돼요. 못 채운 나머지 = <b style={{color:"#dc2626"}}>자투리</b>, 버려져요. 심술쟁이는 <span style={NW}>이걸 <b>최대 2개</b></span> 만들고 싶어요.</>)
    : s.kind === "add1"
      ? t(E, <>Give blue one at a time from <b>0</b>: <span style={NW}>1 → leftover <b>1</b></span>. Not 2 yet.</>,
             <>0개에서 하나씩 줘봐요: <span style={NW}>1개 → 자투리 <b>1</b></span>. 아직 2 아니에요.</>)
    : s.kind === "add2"
      ? t(E, <><span style={NW}>1 more → leftover <b style={{color:"#15803d"}}>2</b></span> ✓ that's the max! <span style={NW}>We gave <b>2</b>.</span></>,
             <><span style={NW}>1개 더 → 자투리 <b style={{color:"#15803d"}}>2</b></span> ✓ 최대예요! <span style={NW}>준 파랑 = <b>2개</b>.</span></>)
    : s.kind === "formula"
      ? t(E, <>That <b>2</b> is the answer — call it <b style={{color:"#2563eb"}}>r1</b>. It's just <span style={NW}><b>max leftover 2 − start leftover 0</b></span>.</>,
             <>그 <b>2</b> 가 답이에요 — 이름은 <b style={{color:"#2563eb"}}>r1</b>. <span style={NW}><b>최대자투리 2 − 시작자투리 0</b></span> 이에요.</>)
    : s.kind === "other"
      ? t(E, <>What if we <b>start with 4 blue</b>? <span style={NW}>4 = 3 + 1</span> → <span style={NW}>already <b>1</b> leftover</span>. Only <b>1 more</b> needed → <span style={NW}>r1 = 2 − 1 = <b>1</b></span>.</>,
             <>만약 <b>파랑 4개로 시작</b>하면? <span style={NW}>4 = 3 + 1</span> → <span style={NW}>이미 자투리 <b>1</b></span>. <b>1개만</b> 더 주면 돼요 → <span style={NW}>r1 = 2 − 1 = <b>1</b></span>.</>)
    : t(E, <>From r1, add <b>+3</b> to keep leftover 2: <span style={NW}>2 → 5 → 8</span>. <span style={NW}>Largest ≤ 8 = <b>8</b></span> → worst <b style={{color:"#dc2626"}}>b = 8</b>.</>,
           <>r1 에서 <b>3개씩</b> 더 주면 자투리 2 그대로: <span style={NW}>2 → 5 → 8</span>. <span style={NW}>8 이하 최대 = <b>8</b></span> → 최악 <b style={{color:"#dc2626"}}>b = 8</b>.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Build the r1 formula, one step at a time", "r1 공식을 하나씩 만들기")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, wordBreak: "keep-all", lineHeight: 1.5 }}>
        {t(E, "leftover = blue that can't fill a group of 3 (wasted) · max leftover = 2", "자투리 = 3개 못 채운 나머지 파랑(버려짐) · 최대 자투리 = 2")}
      </div>
      <Say tone={hit ? "aha" : s.kind === "rule" ? "stuck" : "go"}>{say}</Say>

      {/* 자투리 트레이: 완성 묶음(교환됨) + cB 슬롯의 자투리 */}
      <div style={{ maxWidth: 470, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center", minHeight: 60 }}>
        {groups > 0 && (
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {Array.from({ length: groups }).map((_, g) => (
              <div key={g} style={{ display: "flex", gap: 3, padding: 4, borderRadius: 8, border: `2px solid ${BLU}`, background: "#eff6ff", opacity: 0.5 }}>
                {Array.from({ length: cB }).map((_, i) => <Chip key={i} color="blue" size={16} faded />)}
              </div>
            ))}
            <span style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8", wordBreak: "keep-all" }}>{t(E, `${groups} full`, `완성 ${groups}묶음`)}</span>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ display: "flex", gap: 4, padding: 5, borderRadius: 10,
            border: `2px dashed ${hit ? "#16a34a" : showTarget ? "#dc2626" : "#94a3b8"}`,
            background: hit ? "#f0fdf4" : "#fff" }}>
            {Array.from({ length: cB }).map((_, i) => (
              i < left
                ? <Chip key={i} color="blue" size={18} />
                : <div key={i} style={{ width: 18, height: 18, borderRadius: 999, border: "2px dashed #cbd5e1" }} />
            ))}
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8" }}>{t(E, "leftover", "자투리")}</div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: hit ? "#15803d" : "#334155", whiteSpace: "nowrap" }}>
          = {left}{hit ? " ✓" : ""}{showTarget ? ` (${t(E, "want", "목표")} ${target})` : ""}
        </div>
      </div>

      {(s.kind === "formula" || s.kind === "other") && (
        <div style={{ maxWidth: 440, margin: "14px auto 0", background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", textAlign: "center", wordBreak: "keep-all" }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: "#1e3a8a" }}>
            {t(E, "r1 = max leftover − start leftover", "r1 = 최대자투리 − 시작자투리")}
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1e3a8a", marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>
            {s.kind === "formula"
              ? <>= 2 − 0 = <b style={{ color: "#2563eb" }}>2</b></>
              : <>= 2 − <b style={{color:"#dc2626"}}>1</b> = <b style={{ color: "#2563eb" }}>1</b></>}
          </div>
          <div style={{ marginTop: 7, fontSize: 10.5, color: "#94a3b8", fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "in code: (cB−1) − (B%cB)", "코드에선: (cB−1) − (B%cB)")}
          </div>
        </div>
      )}
      {s.kind === "extend" && (
        <div style={{ maxWidth: 440, margin: "14px auto 0", background: "#f0fdf4", border: "1.5px solid #16a34a", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontSize: 14, fontWeight: 800, color: "#065f46", wordBreak: "keep-all", lineHeight: 1.6 }}>
          {t(E, <><span style={NW}>2 → 5 → 8</span> <span style={{fontSize:11,color:"#16a34a"}}>(+3 each)</span> · <span style={NW}>largest ≤ 8 = <b style={{color:"#15803d"}}>8</b></span></>,
                <><span style={NW}>2 → 5 → 8</span> <span style={{fontSize:11,color:"#16a34a"}}>(3개씩)</span> · <span style={NW}>8 이하 최대 = <b style={{color:"#15803d"}}>8</b></span></>)}
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SearchSim — 실제 해법: 이분탐색. worst(x) 가 계단(안 줄어듦)이라
   범위 [lo,hi] 를 mid 로 반씩 줄여 목표에 처음 닿는 x 를 콕. (다 안 봄)
   ═══════════════════════════════════════════════════════════════ */
export function SearchSim({ E }) {
  const cA = 2, cB = 3, fA = 5, HI0 = 12;
  const worst = (x) => { let m = Infinity; for (let b = 0; b <= x; b++) m = Math.min(m, (x - b) + Math.floor(b / cB) * cA); return m; };
  const XS = Array.from({ length: HI0 + 1 }, (_, x) => ({ x, v: worst(x) }));
  // 이분탐색 발자취 (worst(x) ≥ fA 인 가장 작은 x)
  const trace = []; { let lo = 0, hi = HI0; while (lo < hi) { const mid = Math.floor((lo + hi) / 2); const v = worst(mid); const ok = v >= fA; trace.push({ lo, hi, mid, v, ok }); if (ok) hi = mid; else lo = mid + 1; } }
  let _lo = 0, _hi = HI0; while (_lo < _hi) { const mid = Math.floor((_lo + _hi) / 2); if (worst(mid) >= fA) _hi = mid; else _lo = mid + 1; } const ANS = _lo;

  const steps = [{ kind: "obs" }, { kind: "why" }, ...trace.map((_, i) => ({ kind: "probe", i })), { kind: "done" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const pr = s.kind === "probe" ? trace[s.i] : null;
  const lo = pr ? pr.lo : (s.kind === "done" ? ANS : 0);
  const hi = pr ? pr.hi : (s.kind === "done" ? ANS : HI0);
  const mid = pr ? pr.mid : -1;
  const H = 96;
  const maxV = Math.max(...XS.map((d) => d.v)) + 1;

  const say =
    s.kind === "obs"
      ? t(E, <>First, the <b>top row</b> = the worst for each x. Read left→right: it <b>only stays or climbs — never drops</b>. (extra chips can't shrink my worst case)</>,
             <>먼저 <b>맨 윗줄</b> = 각 x 의 최악이에요. 왼→오로 읽으면 <b>계속 같거나 오르기만 — 절대 안 내려가요</b>. (칩이 늘어도 최악은 안 작아짐)</>)
      : s.kind === "why"
      ? t(E, <>So goal <b>5</b> is first hit at <b style={{color:"#15803d",...NW}}>x=9</b>: before it all <b style={{color:"#475569"}}>✗</b>, after all <b style={{color:"#15803d"}}>✓</b> — <span style={NW}>one boundary</span>. To find it we don't test every x — we <b>halve the range</b> = binary search. <span style={NW}>(x reaches 10¹⁸)</span></>,
             <>그래서 목표 <b>5</b> 에 처음 닿는 <b style={{color:"#15803d",...NW}}>x=9</b> 앞은 다 <b style={{color:"#475569"}}>✗</b>, 뒤는 다 <b style={{color:"#15803d"}}>✓</b> — <span style={NW}>경계가 딱 하나</span>. 이걸 찾을 때 x 를 하나씩 안 보고 <b>범위를 반씩</b> 줄여요 = 이분탐색. <span style={NW}>(x 는 10¹⁸까지)</span></>)
      : s.kind === "done"
      ? t(E, <>Range shrank to one — <b style={{color:"#15803d"}}>answer x = {ANS}</b>, in just <b>{trace.length} checks</b>. Matches <b style={{color:"#15803d"}}>sample test 2's output 9 ✓</b> — this is the real solution.</>,
             <>범위가 하나로 좁혀졌어요 — <b style={{color:"#15803d"}}>답 x = {ANS}</b>, <b>{trace.length}번</b> 확인으로. <b style={{color:"#15803d"}}>샘플 테스트 2의 정답 9 와 일치 ✓</b> — 이게 진짜 해법이에요.</>)
      : t(E,
          <>Range <b>[{pr.lo} … {pr.hi}]</b>. Check middle <b>mid={pr.mid}</b>: worst={pr.v} {pr.ok
            ? <><span style={NW}>≥ {fA} ✓</span> → answer is here or left, <b>hi={pr.mid}</b></>
            : <><span style={NW}>&lt; {fA} ✗</span> → answer is to the right, <b>lo={pr.mid + 1}</b></>}.</>,
          <>범위 <b>[{pr.lo} … {pr.hi}]</b>. 가운데 <b>mid={pr.mid}</b> 확인: worst={pr.v} {pr.ok
            ? <><span style={NW}>≥ {fA} ✓</span> → 답은 여기거나 왼쪽, <b>hi={pr.mid}</b></>
            : <><span style={NW}>&lt; {fA} ✗</span> → 답은 오른쪽, <b>lo={pr.mid + 1}</b></>}.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Binary-search the smallest x", "가장 작은 x 를 이분탐색")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace", wordBreak: "keep-all" }}>
        {t(E, "sample test 2: 0 0 2 3 5 · goal 5 · ✓ = worst ≥ 5", "샘플 테스트 2: 0 0 2 3 5 · 목표 5 · ✓ = worst ≥ 5")}
      </div>
      <Say tone={s.kind === "done" ? "aha" : (s.kind === "obs" || s.kind === "why") ? "go" : (pr && pr.ok ? "aha" : "stuck")}>{say}</Say>

      {/* 숫자 줄 0..12 — 범위 [lo,hi] 안만 진하게, mid 강조, worst 값 위에 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 2, maxWidth: 490, margin: "0 auto", flexWrap: "nowrap" }}>
        {XS.map((d) => {
          const inRange = d.x >= lo && d.x <= hi;
          const isMid = d.x === mid;
          const isAns = s.kind === "done" && d.x === ANS;
          const ok = d.v >= fA;
          return (
            <div key={d.x} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: 34, opacity: inRange ? 1 : 0.25, transition: "all .15s" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: ok ? "#15803d" : "#94a3b8" }}>{d.v}</div>
              <div style={{ width: 26, height: 26, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                background: isAns ? "#15803d" : isMid ? "#fef3c7" : ok ? "#dcfce7" : "#eff6ff",
                border: isAns ? "2px solid #15803d" : isMid ? "2px solid #d97706" : "1px solid #e2e8f0",
                color: isAns ? "#fff" : isMid ? "#b45309" : ok ? "#15803d" : "#475569" }}>{d.x}</div>
              <div style={{ height: 26 }}>
                {isMid && <div style={{ fontSize: 9, fontWeight: 800, color: "#b45309", textAlign: "center" }}>▲<br/>mid</div>}
                {!isMid && d.x === lo && s.kind !== "done" && <div style={{ fontSize: 9, fontWeight: 800, color: "#2563eb" }}>lo</div>}
                {!isMid && d.x === hi && d.x !== lo && s.kind !== "done" && <div style={{ fontSize: 9, fontWeight: 800, color: "#2563eb" }}>hi</div>}
              </div>
            </div>
          );
        })}
      </div>

      {s.kind === "why" && (
        <div style={{ maxWidth: 440, margin: "12px auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 12, fontWeight: 800, wordBreak: "keep-all" }}>
          <span style={{ color: "#64748b" }}>{t(E, "✗ short", "✗ 부족")}</span>
          <span style={{ flex: "0 0 auto", padding: "2px 8px", borderRadius: 999, background: "#fef3c7", border: "1.5px solid #d97706", color: "#b45309", fontSize: 11 }}>{t(E, "one boundary", "경계 딱 1개")}</span>
          <span style={{ color: "#15803d" }}>{t(E, "reached ✓", "도달 ✓")}</span>
        </div>
      )}

      {s.kind === "done" && (
        <div style={{ maxWidth: 460, margin: "16px auto 0", background: "#ecfdf5", border: "1.5px solid #16a34a", borderRadius: 10, padding: "10px 14px", fontSize: 12.5, color: "#065f46", lineHeight: 1.6, wordBreak: "keep-all", textWrap: "balance", textAlign: "center", fontWeight: 800 }}>
          {t(E, <>✅ Our answer <b>x = {ANS}</b> = sample test 2's output <b>9</b>. Same binary search as the verified solution (12/12 pass).</>,
               <>✅ 우리 답 <b>x = {ANS}</b> = 샘플 테스트 2 정답 <b>9</b>. 검증된 풀이(12/12 통과)와 같은 이분탐색이에요.</>)}
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
  const steps = [{ kind: "setup" }, { kind: "swap" }, { kind: "goal" }, { kind: "want" }, { kind: "block" }, { kind: "ask" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  // 파랑을 교환에 다 써버린 이후 상태 (빨강 =4, 파랑 흐림)
  const spent = s.kind === "goal" || s.kind === "want" || s.kind === "block" || s.kind === "ask";

  const say =
    s.kind === "setup" ? t(E, <>Bessie starts with <b style={{color:RED}}>2 red chips</b> and <b style={{color:BLU}}>3 blue chips</b>. That's her whole pile.</>,
                            <>베시는 <b style={{color:RED}}>빨강 칩 2개</b>, <b style={{color:BLU}}>파랑 칩 3개</b>로 시작해요. 이게 가진 전부예요.</>)
    : s.kind === "swap" ? t(E, <>There's an exchange booth: <b>hand in 3 blue → get 2 red</b>. One direction only (blue → red), as often as you like.</>,
                             <>교환소가 있어요: <b>파랑 3개를 내면 → 빨강 2개</b>. 한 방향만 (파랑 → 빨강), 몇 번이든.</>)
    : s.kind === "goal" ? t(E, <>Goal: reach <b style={{color:"#15803d"}}>5 red chips</b>. Best I can do now: 2 red + (swap 3 blue) 2 red = <b>4 red</b>. <b style={{color:"#dc2626"}}>1 short ✗</b>.</>,
                             <>목표: <b style={{color:"#15803d"}}>빨강{" "}5개</b> 모으기. 지금 최선: 빨강{" "}2 + (파랑{" "}3 교환) 빨강{" "}2 = <b>빨강{" "}4개</b>. <b style={{color:"#dc2626"}}>1개{" "}모자라 ✗</b>.</>)
    : s.kind === "want" ? t(E, <>Just <b style={{color:"#16a34a"}}>1 more red</b> and I hit 5! So I grab <b>1 extra chip</b>. If only I could take it as red…</>,
                             <>빨강 <b style={{color:"#16a34a"}}>1개만 더</b> 있으면 5예요! 그래서 <b>칩{" "}1개</b>를 더 받아요. 그{" "}1개를 빨강으로 받을 수만 있다면…</>)
    : s.kind === "block" ? t(E, <>But <b>I can't choose the color</b> — the <b style={{color:"#dc2626"}}>trickster</b> makes it <b style={{color:BLU}}>blue</b>. <b>1 blue can't be exchanged</b> (needs 3) → still <b>4 red</b>, still short <b style={{color:"#dc2626"}}>✗</b>.</>,
                              <>근데 <b>색은 내가 못 골라요</b> — <b style={{color:"#dc2626"}}>심술쟁이</b>가 <b style={{color:BLU}}>파랑</b>으로 줘버려요. <b>파랑{" "}1개는 못{" "}바꿔요</b> (3개 필요) → 여전히 <b>빨강{" "}4</b>, 아직 부족 <b style={{color:"#dc2626"}}>✗</b>.</>)
    : t(E, <><b>Our question:</b> 1 chip wasn't enough. How many must I grab so that <b>no matter how he colors them</b>, I still reach 5 red? <b>That fewest count is the answer.</b></>,
           <><b>우리 질문:</b> 1개론 안 됐어요. 심술쟁이가 <b>어떻게 색칠해도</b> 빨강{" "}5를 채우려면 몇{" "}개를 받아야 할까요? <b>그 최소{" "}개수가 답이에요.</b></>);

  return (
    <div style={{ padding: 16 }}>
      {/* 문제 제목 (정적 인트로 대신 여기 한 줄로) */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>🔵 Chip Exchange</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginTop: 2 }}>USACO Dec 2025 Bronze #1</div>
      </div>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "One round of the game", "이 게임 한 판")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "goal" || s.kind === "block" ? "stuck" : s.kind === "ask" ? "aha" : "go"}>{say}</Say>

      {/* 내 칩 — 항상 표시 */}
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        {/* 빨강 줄 — goal 부터 교환으로 얻은 +2 를 붙여 =4 를 계속 보여줌 */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: RED, width: 56, textAlign: "right" }}>{t(E, "red", "빨강")}</span>
          {Array.from({ length: 2 }).map((_, i) => <Chip key={i} color="red" />)}
          {spent && <><span style={{ color: "#94a3b8", fontWeight: 800 }}>+</span>
            {Array.from({ length: 2 }).map((_, i) => <Chip key={"e" + i} color="red" label="+" />)}
            <span style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginLeft: 4, fontFamily: "'JetBrains Mono',monospace" }}>= 4</span></>}
          {/* want: 원하는 빨강 1개(희망) */}
          {s.kind === "want" && <>
            <span style={{ color: "#16a34a", fontWeight: 800 }}>+</span>
            <div style={{ width: 26, height: 26, borderRadius: 999, background: "#f0fdf4", border: "2px dashed #16a34a",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#16a34a" }}>?</div>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#16a34a", marginLeft: 4, fontFamily: "'JetBrains Mono',monospace" }}>= 5?</span>
          </>}
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

        {/* block — 심술쟁이가 그 1개를 파랑으로! 못 바꿈 → 여전히 부족 */}
        {s.kind === "block" && (
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px dashed #e2e8f0", display: "flex", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{ fontSize: 26 }}>😈</div>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#94a3b8" }}>→</span>
            <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 10, border: "2px dashed #dc2626", background: "#fef2f2", alignItems: "center" }}>
              <Chip color="blue" size={22} />
              <span style={{ fontSize: 10.5, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "1 blue — can't swap (needs 3)", "파랑 1개 — 못 바꿈 (3개 필요)")}</span>
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: "#dc2626", fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "red still 4 ✗", "빨강 그대로 4 ✗")}</span>
          </div>
        )}

        {/* ask — 그럼 몇 개나? 색·개수 미정 → 회색 ? 칩 */}
        {s.kind === "ask" && (
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
            <span style={{ fontSize: 11, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "how many?", "몇 개?")}</span>
          </div>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* 작은 카드(전략/계획 슬라이드용) */
function Slab({ n, color, bg, title, children }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: bg, border: `1.5px solid ${color}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
      {n != null && <div style={{ flexShrink: 0, minWidth: 26, height: 26, padding: "0 6px", borderRadius: 999, background: color, color: "#fff", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>}
      <div style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.6, wordBreak: "keep-all", textWrap: "balance" }}>
        {title && <div style={{ fontWeight: 800, color, marginBottom: 3 }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

/* ═══ ② 이해 확인 — '우리가 뭘 구하는가'를 스스로 확인 (predict→reveal) ═══ */
export function CheckSim({ E }) {
  const steps = [{ kind: "ask" }, { kind: "reveal" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  const opts = [
    t(E, "A. the final number of red chips", "A. 최종 빨강 칩 개수"),
    t(E, "B. the fewest extra chips that guarantee the goal", "B. 목표를 보장하는 가장 적은 추가 칩 개수"),
    t(E, "C. how many times we swap blue for red", "C. 파랑을 빨강으로 몇 번 바꾸는지"),
  ];
  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Quick check — did I get it?", "잠깐 확인 — 제대로 이해했나?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "reveal" ? "aha" : "go"}>
        {s.kind === "ask"
          ? t(E, <>What number do we actually <b>print</b> for each test? Pick one, then flip.</>,
                 <>각 테스트에서 우리가 실제로 <b>출력</b>하는 숫자는 뭘까요? 하나 고르고 넘겨봐요.</>)
          : t(E, <>It's <b>B</b> — the fewest extra chips so that <b>however the trickster splits them</b>, we still reach the goal. (Not the final red count!)</>,
                 <>정답은 <b>B</b> — <b>심술쟁이가 어떻게 나눠도</b> 목표를 채우는 가장 적은 추가 칩 개수예요. (최종 빨강 개수가 아니에요!)</>)}
      </Say>
      <div style={{ maxWidth: 440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
        {opts.map((o, i) => {
          const isB = i === 1, lit = s.kind === "reveal" && isB;
          return (
            <div key={i} style={{ padding: "10px 14px", borderRadius: 10, fontSize: 12.5, fontWeight: 700, wordBreak: "keep-all",
              background: lit ? "#dcfce7" : "#f8fafc", border: lit ? "2px solid #16a34a" : "1px solid #e2e8f0",
              color: lit ? "#15803d" : "#475569" }}>{o}{lit ? "  ✓" : ""}</div>
          );
        })}
      </div>
      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ ③ 전략 — 어떻게 풀지 큰 그림 + 두 하위 질문 ═══ */
export function StrategySlide({ E }) {
  const steps = [{ kind: "plan" }, { kind: "two" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "How will we solve it?", "어떻게 풀까?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say>
        {s.kind === "plan"
          ? t(E, <>We can't read off the answer. So we <b>test a candidate</b> count x.</>,
                 <>답을 바로 못 읽어내요. 그러니 후보 개수 x 를 <b>하나 정해서 시험</b>해요.</>)
          : t(E, <>The whole plan needs just <b>two things</b>:</>, <>이 계획은 딱 <b>두 가지</b>만 해결하면 돼요:</>)}
      </Say>
      {s.kind === "plan" ? (
        <div style={{ maxWidth: 470, margin: "0 auto" }}>
          <Slab n="1" color="#2563eb" bg="#eff6ff">{t(E, <>Pick an extra-chip count <b>x</b>.</>, <>추가 칩 개수 <b>x</b> 를 하나 정해요.</>)}</Slab>
          <Slab n="2" color="#dc2626" bg="#fef2f2">{t(E, <>Let the trickster split those x chips the <b>worst</b> way → count my final red.</>, <>심술쟁이가 그 x 개를 <b>최악</b>으로 나눴을 때 최종 빨강을 세요.</>)}</Slab>
          <Slab n="3" color="#15803d" bg="#f0fdf4">{t(E, <>Does it still reach the goal? The <b>smallest x</b> that does = the answer.</>, <>그래도 목표를 넘나요? 넘는 <b>가장 작은 x</b> = 답.</>)}</Slab>
        </div>
      ) : (
        <div style={{ maxWidth: 470, margin: "0 auto" }}>
          <Slab n="①" color="#dc2626" bg="#fef2f2" title={t(E, "For one x, what's the trickster's WORST?", "한 x 에서 심술쟁이 '최악'은?")}>
            {t(E, "→ next: count a pile (Counting red) + the trickster (Worst split).", "→ 다음: 환전 세기 + 심술쟁이 시뮬로 구해요.")}
          </Slab>
          <Slab n="②" color="#2563eb" bg="#eff6ff" title={t(E, "How to find that x FAST?", "그 x 를 어떻게 빨리 찾지?")}>
            {t(E, "→ next: sweep x, spot the staircase, binary-search (Find x).", "→ 다음: x 를 훑어 계단을 발견 → 이분탐색 (답 찾기).")}
          </Slab>
        </div>
      )}
      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ ⑥ 계획 — 코드 짜는 순서 (코드 전에 말로) ═══ */
export function PlanSlide({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#1e3a8a", textAlign: "center", marginBottom: 4 }}>
        📝 {t(E, "The plan — before any code", "계획 — 코드 짜기 전에 말로")}
      </div>
      <div style={{ fontSize: 11.5, color: "#64748b", textAlign: "center", marginBottom: 12, wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, "We turn the strategy into steps we can code.", "전략을 코드로 옮길 순서로 바꿔요.")}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <Slab n="1" color="#dc2626" bg="#fef2f2" title={<code>worst(x)</code>}>
          {t(E, <>final red when the trickster splits x chips the worst way (dump into blue, waste leftovers).</>,
               <>추가 x 개를 심술쟁이가 최악으로 나눴을 때 최종 빨강 (파랑에 몰아 자투리 낭비).</>)}
        </Slab>
        <Slab n="2" color="#15803d" bg="#f0fdf4" title={<code>ok(x) = worst(x) ≥ f_A ?</code>}>
          {t(E, <>true once x is big enough — and it stays true (staircase).</>,
               <>x 가 충분히 크면 참 — 한 번 참이면 계속 참 (계단).</>)}
        </Slab>
        <Slab n="3" color="#2563eb" bg="#eff6ff" title={t(E, "binary-search the smallest x with ok(x)", "ok(x) 가 처음 참 되는 가장 작은 x 이분탐색")}>
          {t(E, <>jump straight to the answer instead of trying all x.</>, <>모든 x 를 안 돌고 답으로 바로 점프.</>)}
        </Slab>
        <Slab n="4" color="#7c3aed" bg="#f5f3ff" title={t(E, "print that x for each test", "테스트마다 그 x 를 출력")}>
          {t(E, <>use 64-bit — the answer can reach 10¹⁸.</>, <>64비트 쓰기 — 답이 10¹⁸ 까지.</>)}
        </Slab>
      </div>
      <div style={{ marginTop: 12, textAlign: "center", fontSize: 12, fontWeight: 800, color: "#15803d", wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, "→ Now the code (next chapter) follows exactly these 4 steps.", "→ 이제 코드(다음 챕터)는 이 4 단계 그대로예요.")}
      </div>
    </div>
  );
}
