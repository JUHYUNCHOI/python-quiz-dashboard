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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: RED, width: 60, textAlign: "right" }}>{t(E, "red (A)", "빨강 A")}</span>
        {Array.from({ length: Anow }).map((_, i) => <Chip key={i} color="red" />)}
        {s.kind === "convert" || s.kind === "total"
          ? Array.from({ length: groups }).map((_, i) => <Chip key={"g" + i} color="red" label="+" />)
          : null}
      </div>
      {/* 파랑(B) — group 스텝부터 묶음 표시 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: BLU, width: 60, textAlign: "right" }}>{t(E, "blue (B)", "파랑 B")}</span>
        {s.kind === "have" ? (
          Array.from({ length: Bnow }).map((_, i) => <Chip key={i} color="blue" />)
        ) : (
          <>
            {Array.from({ length: groups }).map((_, g) => (
              <div key={g} style={{ display: "flex", gap: 4, padding: 4, borderRadius: 10, border: `2px dashed ${BLU}`, background: "#f8fbff" }}>
                {Array.from({ length: cB }).map((_, i) => <Chip key={i} color="blue" faded={s.kind === "convert" || s.kind === "total"} />)}
              </div>
            ))}
            {Array.from({ length: left }).map((_, i) => (
              <div key={"l" + i} style={{ display: "flex", gap: 4, padding: 4, borderRadius: 10, border: "2px dashed #cbd5e1" }}>
                <Chip color="blue" />
              </div>
            ))}
          </>
        )}
      </div>
      {s.kind === "group" && <Cap color={BLU}>{t(E, "2 groups + 1 leftover", "묶음 2개 + 자투리 1개")}</Cap>}
      {s.kind === "convert" && <Cap color={RED}>{t(E, "2 groups → +2 red · leftover stuck", "묶음 2개 → 빨강 +2 · 자투리 남음")}</Cap>}
      {s.kind === "total" && <Cap color="#15803d">final A = 2 + (7 ÷ 3)×1 = 4</Cap>}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AdversarySim — 심술쟁이가 최악으로 분배.
   예: A=0, B=0, cA=2, cB=3, 목표 fA=5. 추가 x개를 빨강 a·파랑 b 로 나눔.
   최종 A = a + (b // 3)×2. 심술쟁이는 이걸 최소로. → 파랑에 몰아 자투리 낭비.
   ═══════════════════════════════════════════════════════════════ */
export function AdversarySim({ E }) {
  const cA = 2, cB = 3, fA = 5;
  const finalA = (a, b) => a + Math.floor(b / cB) * cA;
  const minOver = (x) => { let m = Infinity, bb = 0; for (let b = 0; b <= x; b++) { const v = finalA(x - b, b); if (v < m) { m = v; bb = b; } } return { m, b: bb, a: x - bb }; };
  const steps = [{ kind: "who" }, { kind: "worse" }, { kind: "x8" }, { kind: "x9" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const say =
    s.kind === "who" ? t(E, <>Extra chips come, but a <b>trickster</b> splits them: <b style={{color:RED}}>a red</b> + <b style={{color:BLU}}>b blue</b>. They pick the split that makes my <b>final red as SMALL as possible</b>.</>,
                          <>추가 칩이 오는데 <b>심술쟁이</b>가 나눠요: <b style={{color:RED}}>빨강 a개</b> + <b style={{color:BLU}}>파랑 b개</b>. 내 <b>최종 빨강이 최소</b>가 되게 골라요.</>)
    : s.kind === "worse" ? t(E, <><b>Blue is worse for me</b>: 1 red chip = 1 red, but 3 blue = only 2 red (and leftovers waste). So the trickster <b>dumps onto blue</b>, just below a group of 3.</>,
                              <><b>파랑이 나한테 손해</b>예요: 빨강 1개 = 빨강 1, 근데 파랑 3개 = 빨강 2개뿐 (자투리는 낭비). 그래서 심술쟁이는 <b>파랑에 몰아요</b>, 3 묶음 바로 아래에 멈춰서.</>)
    : s.kind === "x8" ? t(E, <><b>x = 8</b>: worst split → all 8 blue = 3+3+<b>2 wasted</b> → 2 groups → <b>4 red</b>. Goal is 5 → <b>not enough ✗</b>.</>,
                           <><b>x = 8</b>: 최악 분배 → 8개 다 파랑 = 3+3+<b>자투리 2</b> → 묶음 2개 → <b>빨강 4개</b>. 목표 5 → <b>부족 ✗</b>.</>)
    : t(E, <><b>x = 9</b>: even the trickster's best is <b>5 red</b> (e.g. 1 red + 8 blue → 1+4). Goal reached <b>no matter what ✓</b>. So answer = <b>9</b>.</>,
           <><b>x = 9</b>: 심술쟁이가 최선을 다해도 <b>빨강 5개</b> (예: 빨강 1 + 파랑 8 → 1+4). 어떻게 나눠도 목표 달성 <b>✓</b>. 답 = <b>9</b>.</>);

  const showX = s.kind === "x8" ? 8 : s.kind === "x9" ? 9 : null;
  const res = showX != null ? minOver(showX) : null;

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "The trickster splits for the worst", "심술쟁이의 최악 분배")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, "start A=0, B=0 · 3 blue → 2 red · goal 5 red", "시작 A=0, B=0 · 파랑 3 → 빨강 2 · 목표 빨강 5")}
      </div>
      <Say tone={s.kind === "x8" ? "stuck" : s.kind === "x9" ? "aha" : "go"}>{say}</Say>

      {showX != null && (
        <div style={{ maxWidth: 460, margin: "0 auto" }}>
          {/* 최악 분배 그림: a 빨강 + b 파랑 (묶음) */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
            {Array.from({ length: res.a }).map((_, i) => <Chip key={"a" + i} color="red" />)}
            {res.a > 0 && <span style={{ color: "#94a3b8", fontWeight: 800 }}>+</span>}
            {Array.from({ length: Math.floor(res.b / cB) }).map((_, g) => (
              <div key={g} style={{ display: "flex", gap: 3, padding: 3, borderRadius: 8, border: `2px dashed ${BLU}` }}>
                {Array.from({ length: cB }).map((_, i) => <Chip key={i} color="blue" size={22} />)}
              </div>
            ))}
            {res.b % cB > 0 && (
              <div style={{ display: "flex", gap: 3, padding: 3, borderRadius: 8, border: "2px dashed #dc2626", background: "#fef2f2" }}>
                {Array.from({ length: res.b % cB }).map((_, i) => <Chip key={i} color="blue" size={22} />)}
                <span style={{ fontSize: 10, fontWeight: 800, color: "#dc2626", alignSelf: "center" }}>{t(E, "waste", "낭비")}</span>
              </div>
            )}
          </div>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
            color: res.m >= fA ? "#15803d" : "#dc2626" }}>
            {t(E, "final red = ", "최종 빨강 = ")}{res.a} + ({res.b}÷{cB})×{cA} = <b>{res.m}</b> {res.m >= fA ? `≥ ${fA} ✓` : `< ${fA} ✗`}
          </div>
        </div>
      )}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
