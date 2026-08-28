// Chip Exchange (Dec 2025 Bronze #1) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
// 건드리지 않고 여기에만 (mooin3 / photoshoot25 와 같은 방식).
//
// 원칙: 학생 목소리(해요체), 관찰→추론, 시뮬로 개념. 색: A=A칩, B=B칩.
//   ① ChipCountSim — 최종 A = A + (B // cB) × cA (묶음/자투리 시각)
//   ② AdversarySim — B가 몰려 와서 자투리 낭비 → 최악 분배

import React from "react";
import { t } from "@/components/quest/theme";
import { StepFade } from "@/components/quest/StepFade";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#2563eb";
const RED = "#ef4444", REDBG = "#fef2f2";
const BLU = "#3b82f6", BLUBG = "#eff6ff";
const NW = { whiteSpace: "nowrap" }; // 수식·숫자단위 한 덩어리로 (읽기 좋은 줄바꿈)

/* 칩에는 늘 문제 원문의 이름(A / B)을 새김. 색은 구분용 보조. */
function Chip({ color, size = 26, faded = false, label = undefined }) {
  const c = color === "red" ? RED : BLU;
  const text = label === undefined ? (color === "red" ? "A" : "B") : label;
  return (
    <div style={{ position: "relative", width: size, height: size, borderRadius: 999, background: color === "red" ? REDBG : BLUBG,
      border: `2.5px solid ${c}`, opacity: faded ? 0.3 : 1, transition: "all .15s", flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: Math.max(8, Math.round(size * 0.46)), fontWeight: 800, color: c }}>
      {text}
    </div>
  );
}
function Say({ children, tone = "go" }) {
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#f0f9ff", bd: "#7dd3fc", fg: "#075985" };
  return (
    <div style={{ maxWidth: 460, margin: "6px auto 12px", padding: "10px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
      fontSize: 13.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.75 }}>{children}</div>
  );
}
function Cap({ color, children }) {
  return <div style={{ textAlign: "center", marginTop: 12, fontSize: 13.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace", wordBreak: "keep-all", textWrap: "balance" }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   ChipCountSim — 최종 A 칩 세기. 예: A=2, B=7, 환전 3B→1A.
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
                           <>지금 <b style={{color:RED,...NW}}>A 2개</b>, <b style={{color:BLU,...NW}}>B 7개</b>. 환전: <b style={NW}>B 3개 → A 2개</b>. A를 최대 몇 개까지?</>)
    : s.kind === "group" ? t(E, <>Group the blue in <b>3</b>s: <b style={NW}>7 = 3 + 3 + 1</b> → <b style={NW}>2 full groups</b>, and <b style={NW}>1 leftover</b>.</>,
                              <>B를 <b style={NW}>3개씩</b> 묶어요: <b style={NW}>7 = 3 + 3 + 1</b> → <b style={NW}>완성 묶음 2개</b>, <b style={NW}>자투리 1개</b>.</>)
    : s.kind === "convert" ? t(E, <>Each full group → <b style={NW}>2 red</b>. So <b style={NW}>+4 red</b>. The <b style={NW}>leftover can't convert</b> — it's stuck.</>,
                                <>완성 묶음마다 <b style={NW}>A 2개</b>가 나와요.<br />그래서 <b style={NW}>A가 4개</b> 늘어요.<br /><b style={NW}>자투리는 못 바꿔요.</b> 그냥 남아요.</>)
    : t(E, <>Final red = <b style={NW}>2 + 4 = 6</b>. Rule: <b style={NW}>final A = A + (B ÷ cB) × cA</b> (÷ = drop leftovers).</>,
           <>최종 A <b style={NW}>= 2 + 4 = 6</b>. 공식: <b style={NW}>최종 A = A + (B÷cB)×cA</b> <span style={NW}>(자투리 버림)</span>.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "How many red chips do I end with?", "A 칩은 몇 개가 될까요?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.kind === "total" ? "aha" : "go"}>{say}</Say>

      {/* A */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: RED, width: 60, textAlign: "right" }}>{t(E, "red (A)", "A")}</span>
        {Array.from({ length: Anow }).map((_, i) => <Chip key={i} color="red" />)}
        {s.kind === "convert" || s.kind === "total"
          ? Array.from({ length: gain }).map((_, i) => <Chip key={"g" + i} color="red" label="+" />)
          : null}
      </div>
      {/* B — group 스텝부터 묶음 표시 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap", rowGap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: BLU, width: 60, textAlign: "right" }}>{t(E, "blue (B)", "B")}</span>
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
      {s.kind === "group" && <Cap color={BLU}>{t(E, "2 groups + 1 leftover", "B 7개 = 묶음 2개 + 자투리 1개")}</Cap>}
      {s.kind === "convert" && <Cap color={RED}>{t(E, "2 groups → +4 red · leftover stuck", "묶음 2개를 바꿔서 A가 4개 늘었어요. 자투리 1개는 못 바꿔요.")}</Cap>}
      {s.kind === "total" && <Cap color="#15803d">final A = 2 + (7 ÷ 3)×2 = 6</Cap>}

      </StepFade>
      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AdversarySim — 한 x(=8)에서 최악의 경우 나눌 수 있는 모든 분배를
   B b=0,1,…,8 차례로 다 따져 최악(최소 최종A)을 찾음.
   최종 A = a + (b // cB)×cA, a = 8-b. 최악의 경우엔 이 값이 최소인 걸 고름.
   ═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   AllBlueWorstSim — 추가 칩이 전부 B로 오는 경우 → 자투리 버림 = 최악.
   슬라이드/분배 없음. 색 미정 → 다 B → 묶기 → 자투리 낭비 → 최악.
   ═══════════════════════════════════════════════════════════════ */
export function AllBlueWorstSim({ E }) {
  const cB = 3, cA = 2, X = 8;
  const groups = Math.floor(X / cB), left = X % cB, redFromSwap = groups * cA;
  const steps = [{ k: "give" }, { k: "allblue" }, { k: "group" }, { k: "waste" }, { k: "worst" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  const showGroups = s.k === "group" || s.k === "waste" || s.k === "worst";
  const wasted = s.k === "waste" || s.k === "worst";

  const say =
    s.k === "give"    ? t(E, <>Short of the goal, so I get <b>extra chips</b> — but the <b style={{color:"#dc2626"}}>I can't know each colour in advance</b> (red or blue).</>,
                           <>목표에 모자라서 <b>칩을 더</b> 받아요.<br />근데 <b style={{color:"#dc2626"}}>무슨 색이 올지는 알 수 없어요</b>.</>)
    : s.k === "allblue" ? t(E, <>The worst combination is <b style={{color:BLU}}>all blue</b> — blue needs 3 to convert, so it helps me the least.</>,
                           <>제일 나쁜 건 <b style={{color:BLU}}>전부 B</b>가 오는 경우예요.<br />B는 3개가 모여야 A가 되니까요.</>)
    : s.k === "group" ? t(E, <>Group the blue by 3 and swap: <span style={NW}><b>8 = 2 groups</b></span> → <b style={{color:RED}}>+4 red</b>. And what's left?</>,
                           <>B를 <b>3개씩</b> 묶어 환전: <span style={NW}><b>8 = 2묶음</b></span> → <b style={{color:RED}}>A 4개</b>. 남은 건?</>)
    : s.k === "waste" ? t(E, <>The leftover <b style={{color:BLU}}>2 blue</b> can't make a group of 3<br />→ <b style={{color:"#dc2626"}}>wasted</b>. We call that leftover 자투리.</>,
                           <>남은 <b style={{color:BLU}}>B 2개</b>는 3개가 안 돼서 못 묶어요 → <b style={{color:"#dc2626"}}>그냥 버려져요</b>. 이 남는 게 자투리예요.</>)
    : t(E, <><b>8 chips, but only 4 red!</b> Blue piles up and <b>wastes the leftover</b> — that's the worst that can happen.</>,
           <><b>8개나 받았는데 A는 4개뿐이에요!</b> B가 몰려 오면 <b>자투리가 버려져서</b> 이렇게 돼요.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "3 blue in → 2 red out: swapping LOSES (cA < cB)", "B 3개 내면 → A 2개: 바꾸면 손해 (cA < cB)")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, wordBreak: "keep-all" }}>
        {t(E, "extra chips = 8 · swap: 3 blue → 2 red", "추가 칩 = 8개 · 환전: B 3 → A 2")}
      </div>
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "worst" ? "stuck" : "go"}>{say}</Say>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap", minHeight: 48, marginTop: 8 }}>
        {!showGroups ? (
          Array.from({ length: X }).map((_, i) =>
            s.k === "allblue"
              ? <Chip key={i} color="blue" size={22} />
              : <div key={i} style={{ width: 22, height: 22, borderRadius: 999, border: "2px dashed #94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#94a3b8" }}>?</div>)
        ) : (
          <>
            {Array.from({ length: groups }).map((_, g) => (
              <div key={g} style={{ display: "flex", gap: 4, padding: 4, borderRadius: 8, border: `2px dashed ${BLU}`, background: "#f8fbff", opacity: wasted ? 0.5 : 1 }}>
                {Array.from({ length: cB }).map((_, i) => <Chip key={i} color="blue" size={20} faded={wasted} />)}
              </div>
            ))}
            <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 8, alignItems: "center",
              border: `2px dashed ${wasted ? "#dc2626" : "#cbd5e1"}`, background: wasted ? "#fef2f2" : "#fff" }}>
              {Array.from({ length: left }).map((_, i) => <Chip key={i} color="blue" size={20} />)}
              {wasted && <span style={{ fontSize: 10, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "waste", "낭비")}</span>}
            </div>
          </>
        )}
      </div>
      {showGroups && (
        <Cap color={wasted ? "#dc2626" : RED}>
          {wasted
            ? t(E, "2 groups → 4 red · 2 wasted → only 4 red", "묶음 2개로 A 4개. 자투리 B 2개는 버려져서 A는 4개뿐이에요.")
            : t(E, "2 groups → 4 red · 2 blue left over", "묶음 2개로 A 4개. B 2개가 남아요.")}
        </Cap>
      )}

      </StepFade>
      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AllRedWorstSim — 환전이 이득(cA ≥ cB)일 땐 최악의 경우 'A'을 줌 (B 아님).
   B를 주면 오히려 이득이라, A 1개씩 줘서 덜 도와줌. (공식의 cA≥cB 가지)
   ═══════════════════════════════════════════════════════════════ */
export function AllRedWorstSim({ E }) {
  const steps = [{ k: "rule" }, { k: "bluegood" }, { k: "givered" }, { k: "concl" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const say =
    s.k === "rule"    ? t(E, <>A different swap this time — <span style={NW}><b style={{color:BLU}}>2 blue</b> → <b style={{color:RED}}>3 red</b></span>. Here converting <b>gains</b> red!</>,
                           <>이번엔 환전이 달라요.<br /><span style={NW}><b style={{color:BLU}}>B 2개</b>가 <b style={{color:RED}}>A 3개</b></span>가 되니까<br />바꾸면 오히려 <b>이득</b>이에요!</>)
    : s.k === "bluegood" ? t(E, <>If they all came as <b style={{color:BLU}}>blue</b>, I'd <b>gain</b> (2 → 3 red). No way it does that.</>,
                           <>최악의 경우 <b style={{color:BLU}}>B</b>을 주면 나한텐 <b>이득</b> (2 → 3). 이럴 땐 B가 오는 게 오히려 나한테 이득이에요.</>)
    : s.k === "givered" ? t(E, <>So it gives <b style={{color:RED}}>red, 1 at a time</b> — one red chip is just one red, the <b>least help</b>.</>,
                           <>그래서 제일 나쁜 건 <b style={{color:RED}}>A가 하나씩</b> 오는 경우예요.<br />A 1개는 딱 1개로 끝이라 <b>제일 안 늘거든요</b>.</>)
    : t(E, <>So when swapping <b>pays</b> (cA ≥ cB) → the extra chips are <b style={{color:RED}}>all red</b>, no waste. <span style={{color:"#94a3b8"}}>(when it loses → all blue + waste, the step before)</span></>,
           <>환전이 <b>이득</b>(cA ≥ cB)이면 → 추가 칩은 <b style={{color:RED}}>다 A</b>, 낭비 없음. <span style={{color:"#94a3b8"}}>(손해면 반대 = B 낭비, 앞 스텝)</span></>);

  const showRed = s.k === "givered" || s.k === "concl";

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "2 blue in → 3 red out: swapping GAINS (cA ≥ cB)", "B 2개 내면 → A 3개: 바꾸면 이득 (cA ≥ cB)")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, wordBreak: "keep-all" }}>
        {t(E, "this example · swap: 2 blue → 3 red (cA ≥ cB)", "이 예시 · 환전: B 2 → A 3 (cA ≥ cB)")}
      </div>
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "concl" ? "aha" : "go"}>{say}</Say>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap", minHeight: 48, marginTop: 8 }}>
        {!showRed ? (
          <>
            <div style={{ display: "flex", gap: 5, padding: 5, borderRadius: 10, border: `2px dashed ${BLU}`, background: "#f8fbff" }}>
              {Array.from({ length: 2 }).map((_, i) => <Chip key={i} color="blue" size={22} />)}
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#15803d" }}>→</span>
            <div style={{ display: "flex", gap: 5 }}>
              {Array.from({ length: 3 }).map((_, i) => <Chip key={i} color="red" size={22} />)}
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#15803d", wordBreak: "keep-all" }}>{t(E, "(gain!)", "(이득!)")}</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: 24 }}>😈</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#94a3b8" }}>→</span>
            {Array.from({ length: 4 }).map((_, i) => <Chip key={i} color="red" size={22} />)}
            <span style={{ fontSize: 11.5, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "all red, 1 each", "전부 A로 줘요 — 칩 1개당 A 1개")}</span>
          </>
        )}
      </div>

      </StepFade>
      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

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
      ? t(E, <>How might the extra chips split? Say <b style={NW}>8 chips</b>. Slide <b>b</b> (blue) up — the more blue, the worse for me.</>,
             <>추가 칩이 어떻게 섞여 올까요? 예로 <b style={NW}>8개</b>. 아래 <b>b</b>(B)를 늘려봐요 — B에 몰수록 나한텐 나빠져요.</>)
      : isLast
      ? t(E, <><b style={NW}>b=8 (all blue):</b> <span style={NW}>2 groups → +4 red</span>, but <span style={NW}><b style={{color:"#dc2626"}}>2 blue wasted</b></span> → <b style={{color:"#dc2626",...NW}}>final 4</b> (the lowest). <b>The worst is blue piling up and the leftover going to waste.</b></>,
             <><b style={NW}>b=8 (다 B):</b> <span style={NW}>묶음 2 → +A 4</span>, 근데 <span style={NW}><b style={{color:"#dc2626"}}>B 2개 버림</b></span> → <b style={{color:"#dc2626",...NW}}>최종 4</b> (최저). <b>제일 나쁜 건 B가 몰려 오는 경우 자투리를 버려요.</b></>)
      : t(E,
          <><b style={NW}>b={cur.b} ({cur.b} blue):</b> <span style={NW}>swap → <b style={{color:cur.g?"#15803d":"#94a3b8"}}>+{cur.g*cA} red</b>{cur.w?` (${cur.w} wasted)`:""}</span>, <span style={NW}>{cur.a} red kept</span> → <b>final {cur.val}</b></>,
          <><b style={NW}>b={cur.b} (B {cur.b}개):</b> <span style={NW}>환전 → <b style={{color:cur.g?"#15803d":"#94a3b8"}}>+A {cur.g*cA}</b>{cur.w?` (자투리 ${cur.w} 버림)`:""}</span>, <span style={NW}>A {cur.a}개는 그대로</span> → <b>최종 {cur.val}</b></>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Try every split — find the worst", "모든 분배 다 따지기 — 최악 찾기")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E, "start A=0, B=0 · 3 blue → 2 red · goal 5 · extra x=8", "시작 A=0, B=0 · B 3 → A 2 · 목표 5 · 추가 x=8")}
      </div>
      <Say tone={isLast ? "stuck" : isNewMin ? "stuck" : "go"}>{say}</Say>

      {cur && (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {/* 현재 분배 그림: a A + b B(3묶음, 자투리 낭비) */}
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
              {isLast && <> {worstSoFar >= fA ? `≥ ${fA} ✓` : `< ${fA} ` + t(E, "(the worst)", "(최악의 경우)")}</>}
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
   FormulaDeriveSim — 브루트 표(최악의 경우)에서 O(1) 공식을 관찰→추론→공식 으로 유도.
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
             <><b>관찰:</b> <b>B 2개를 버릴 때</b>(자투리 cB−1 = 2) 값이 훅 낮아져요. 그런 b = <span style={NW}><b>2, 5, 8</b></span> — 최악 후보들.</>)
      : s.kind === "infer"
      ? t(E, <><b>Biggest of them = worst.</b> Blue loses <span style={NW}>(3 blue → 2 red)</span>, so bigger b → fewer red: <span style={NW}>b=2 → 6</span>, <span style={NW}>b=5 → 5</span>, <span style={NW}>b=8 → 4</span>. → worst <b>b = 8</b>. <span style={{color:"#2563eb"}}>Next: build the formula for it.</span></>,
             <><b>이 중 가장 큰 게 최악.</b> B는 손해라 <span style={NW}>(B 3 → A 2)</span> b 클수록 A가 줄어요: <span style={NW}>b=2 → 6</span>, <span style={NW}>b=5 → 5</span>, <span style={NW}>b=8 → 4</span>. → 최악 <b>b = 8</b>. <span style={{color:"#2563eb"}}>다음: 이 b 의 공식을 만들어요.</span></>)
      : t(E, <><b>As a formula:</b> get that worst <b>b = 8</b> directly — no brute loop. Steps <b>①②③</b> below are the calc.</>,
             <><b>공식으로:</b> 그 최악 <b>b = 8</b> 을 브루트 없이 바로 계산해요. 아래 <b>①②③</b> 이 그 계산이에요.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Find the worst b from the table", "표에서 최악 b 찾기")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, wordBreak: "keep-all", lineHeight: 1.5 }}>
        {t(E, "start red 0 · blue 0 · swap: 3 blue → 2 red · goal 5 · extra x=8", "시작 A 0 · B 0 · 환전: B 3 → A 2 · 목표 5 · 추가 x=8")}
        <br/>{t(E, "b = blue chips given · value = my final red (smaller = worse)", "b = B에 준 칩 · 값 = 그때 내 최종 A (작을수록 최악)")}
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

      {/* b=0..8 결과 표 — obs: 자투리최대 B / infer·formula: 최악 A */}
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
                                              <><b>①</b> B 2개 버리기 = 총 B를 <b>3으로 나눠 2 남기기</b>. 시작 B 0 → 처음 그런 <b style={{color:"#2563eb"}}>b = 2</b>.</>)}</div>
          <div style={{ marginBottom: 5 }}>{t(E, <><b>②</b> add <b>+3</b> each time — same remainder: <span style={NW}><b>2 → 5 → 8</b></span>.</>,
                                              <><b>②</b> <b>+3</b>씩 더하기 — 나머지 그대로: <span style={NW}><b>2 → 5 → 8</b></span>.</>)}</div>
          <div>{t(E, <><b>③</b> largest ≤ <span style={NW}>x = 8</span> → worst <b style={{color:"#dc2626"}}>b = 8</b>, final red <b style={{color:"#dc2626"}}>4</b>.</>,
                     <><b>③</b> <span style={NW}>x = 8</span> 이하 가장 큰 것 → 최악 <b style={{color:"#dc2626"}}>b = 8</b>, 최종 A <b style={{color:"#dc2626"}}>4</b>.</>)}</div>
          <div style={{ marginTop: 9, paddingTop: 9, borderTop: "1px dashed #93c5fd", fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 800, color: "#1e40af", wordBreak: "break-word" }}>
            r1 = (cB−1 − B%cB)%cB = (2−0)%3 = 2
          </div>
          <div style={{ marginTop: 3, fontSize: 11, color: "#475569", wordBreak: "keep-all" }}>
            {t(E, <>= “how many more blue to reach remainder 2?” (start blue 0 → 2). Then +cB up to x. No loop — <b>O(1)</b>.</>,
                  <>= “나머지 2 되려면 B 몇 개 더?” <span style={NW}>(시작 B 0 → 2)</span>. 그다음 x 까지 +cB. 반복 없이 — <b>O(1)</b>.</>)}
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
  const cB = 3, X = 8, target = cB - 1;   // 최대 자투리 = cB−1 = 2
  const steps = [
    { kind: "anchor" }, { kind: "formula" }, { kind: "whyB" },
    { kind: "wrap" }, { kind: "largest" }, { kind: "codemap" },
  ];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  // 트레이 상태: whyB 만 시작 B 4개 예시, 나머지는 샘플(시작 0)
  const B = s.kind === "whyB" ? 4 : 0;
  const added = { anchor: 0, formula: 2, whyB: 0, wrap: 2, largest: X, codemap: 0 }[s.kind];
  const total = B + added;
  const groups = Math.floor(total / cB);
  const left = total % cB;
  const hit = left === target && (s.kind === "formula" || s.kind === "largest");
  const showTarget = s.kind === "anchor";
  const showTray = ["anchor", "formula", "whyB", "largest"].includes(s.kind);

  const say =
    s.kind === "anchor"
      ? t(E, <>Beat the <b>worst case</b> and the rest follows. Worst = <b style={{color:"#dc2626"}}>most blue leftover</b> (blue that can't fill a group of 3) — <span style={NW}>at most <b>cB−1 = 2</b></span>. Let's get the <b>b</b> that makes it.</>,
             <>최악만 막으면 나머지는 저절로 풀려요. 최악 = <b style={{color:"#dc2626"}}>B 자투리</b>(3개로 못 묶어 버리는 나머지)<b>가 가장 많을 때</b> — <span style={NW}>최대 <b>cB−1 = 2</b>개</span>. 그걸 만드는 <b>b</b>를 공식으로 구해요.</>)
    : s.kind === "formula"
      ? t(E, <>Leftover = <span style={NW}>(total blue) mod cB</span>. To make it <b>2</b>: start blue is 0, so <span style={NW}>now-leftover <b>0</b></span> → give <span style={NW}><b>2 − 0 = 2</b></span>. That b is <b style={{color:"#2563eb"}}>r1</b>.</>,
             <>자투리 = <span style={NW}>(총 B) ÷ cB 나머지</span>. 이걸 <b>목표 2</b>로? 시작 B 0이라 <span style={NW}>지금 자투리 <b>0</b></span> → <span style={NW}><b>2 − 0 = 2</b>개</span> 주면 돼요. 이 b가 <b style={{color:"#2563eb"}}>r1</b>.</>)
    : s.kind === "whyB"
      ? t(E, <><b>What if start blue isn't 0?</b> Say <b>4</b>: <span style={NW}>4 = 3 + 1</span> → <span style={NW}>now-leftover <b>1</b></span>. To goal 2, only <span style={NW}><b>2 − 1 = 1</b></span>! <span style={NW}>→ that's the <b>− B%cB</b></span>.</>,
             <><b>시작 B가 0이 아니면?</b> 예로 <b>4개</b>: <span style={NW}>4 = 3 + 1</span> → <span style={NW}>지금 자투리 <b>1</b></span>. 목표 2까지 <span style={NW}><b>2 − 1 = 1</b></span>개만! <span style={NW}>→ 이게 <b>− B%cB</b></span> 예요.</>)
    : s.kind === "wrap"
      ? t(E, <>Code wraps the subtraction in <span style={NW}><b>(… % cB + cB) % cB</b></span> — a <b>safety net</b>: keep it a valid <span style={NW}>0…cB−1</span> remainder <span style={NW}>(C++ can give a negative mod)</span>. The meaning is still <b>'goal − now'</b>.</>,
             <>코드는 이 뺄셈을 <span style={NW}><b>(… % cB + cB) % cB</b></span> 로 감싸요 — <b>안전장치</b>예요. 나머지를 항상 <span style={NW}>0~cB−1</span> 로, <span style={NW}>C++는 음수 나머지</span>가 나올 수 있어서요. 뜻은 그대로 <b>'목표 − 지금'</b>.</>)
    : s.kind === "largest"
      ? t(E, <>From r1, <b>+cB (3)</b> keeps leftover 2: <span style={NW}>2 → 5 → 8</span>. <b>Largest ≤ x</b> = <span style={NW}>r1 + ((x−r1)÷cB)×cB</span> = <span style={NW}>2 + 6 = <b style={{color:"#dc2626"}}>8</b></span>.</>,
             <>r1 에서 <b>+cB(3)</b> 씩 더 줘도 자투리는 2 그대로: <span style={NW}>2 → 5 → 8</span>. <b>x 이하 가장 큰</b> b = <span style={NW}>r1 + ((x−r1)÷cB)×cB</span> = <span style={NW}>2 + 6 = <b style={{color:"#dc2626"}}>8</b></span>.</>)
    : t(E, <>That's the two code lines — everything we just built.</>,
           <>이게 코드 두 줄이에요 — 방금 만든 그대로.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Build the max-leftover formula", "자투리 최대 b 공식 만들기")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, wordBreak: "keep-all", lineHeight: 1.5 }}>
        {t(E, "leftover = total blue mod cB(3) · max = cB−1 = 2", "자투리 = 총 B를 cB(3)로 나눈 나머지 · 최대 = cB−1 = 2")}
      </div>
      <Say tone={hit ? "aha" : s.kind === "anchor" || s.kind === "wrap" ? "stuck" : "go"}>{say}</Say>

      {showTray && (
        <>
          {s.kind === "whyB" && (
            <div style={{ textAlign: "center", fontSize: 11, fontWeight: 800, color: "#b45309", marginBottom: 4, wordBreak: "keep-all" }}>
              {t(E, "side example — start blue = 4", "다른 예 — 시작 B = 4")}
            </div>
          )}
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
        </>
      )}

      {(s.kind === "formula" || s.kind === "whyB") && (
        <div style={{ maxWidth: 440, margin: "14px auto 0", background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", textAlign: "center", wordBreak: "keep-all" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a" }}>
            {t(E, "r1 = goal leftover (cB−1) − now leftover (B%cB)", "r1 = 목표 자투리(cB−1) − 지금 자투리(B%cB)")}
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1e3a8a", marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>
            {s.kind === "formula"
              ? <>= 2 − 0 = <b style={{ color: "#2563eb" }}>2</b></>
              : <>= 2 − <b style={{color:"#dc2626"}}>1</b> = <b style={{ color: "#2563eb" }}>1</b></>}
          </div>
        </div>
      )}
      {s.kind === "wrap" && (
        <div style={{ maxWidth: 460, margin: "14px auto 0", background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#92400e", wordBreak: "break-word" }}>
          r1 = ((cB−1 − B%cB) % cB + cB) % cB
          <div style={{ marginTop: 6, fontFamily: "inherit", fontSize: 11, fontWeight: 700, color: "#b45309", wordBreak: "keep-all" }}>
            {t(E, "(cB−1 − B%cB) = goal − now · the outer (…%cB+cB)%cB = safety wrap", "(cB−1 − B%cB) = 목표 − 지금 · 바깥 (…%cB+cB)%cB = 안전 감쌈")}
          </div>
        </div>
      )}
      {s.kind === "largest" && (
        <div style={{ maxWidth: 460, margin: "14px auto 0", background: "#f0fdf4", border: "1.5px solid #16a34a", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5, fontWeight: 800, color: "#065f46", wordBreak: "break-word" }}>
          r1 + ((x−r1) / cB) × cB = 2 + ((8−2)/3)×3 = <b style={{color:"#15803d"}}>8</b>
        </div>
      )}
      {s.kind === "codemap" && (
        <div style={{ maxWidth: 480, margin: "6px auto 0", background: "#0f172a", borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.9, color: "#e2e8f0", wordBreak: "break-word" }}>
          <div>maxWasteB = ((cB−1 − B%cB)%cB + cB)%cB<span style={{ color: "#64748b" }}>{t(E, "  // goal − now (+safe)", "  // 목표 − 지금 (+안전)")}</span></div>
          <div>maxWasteB + ((x−maxWasteB)/cB)*cB<span style={{ color: "#64748b" }}>{t(E, "  // largest ≤ x", "  // x 이하 최대")}</span></div>
          <div style={{ marginTop: 8, fontFamily: "inherit", fontSize: 11.5, fontWeight: 700, color: "#93c5fd", wordBreak: "keep-all" }}>
            {t(E, "Our sample: start blue 0 → r1 = 2 → b = 8.", "우리 샘플: 시작 B 0 → r1 = 2 → b = 8.")}
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
   CandidateSim — 브루트(b 다 재기) → 후보 몇 개만 재기 (O(1) 다리).
   최악은 늘 '자투리 최대' + 양끝 중 하나 → 후보 4개(0,2,6,8)만 계산 → 최소.
   (모듈러 공식 유도는 안 함 — 학생용. 식은 코드 챕터에 한 줄 설명으로만.)
   ═══════════════════════════════════════════════════════════════ */
export function CandidateSim({ E }) {
  const cA = 2, cB = 3, X = 8;
  const rows = Array.from({ length: X + 1 }, (_, b) => {
    const a = X - b, g = Math.floor(b / cB), w = b % cB;
    return { b, a, g, w, val: a + g * cA };
  });
  const candBs = [0, 2, 6, 8];
  const worstB = 8;
  const steps = [{ kind: "brute" }, { kind: "fast" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const say =
    s.kind === "brute"
      ? t(E, <>The brute tried <b>every b (0–8)</b>. The <b>worst</b> <span style={NW}>(my fewest red)</span> is <b style={{color:"#dc2626"}}>4</b>, at <span style={NW}>b=8</span> <span style={NW}>(all blue, tail wasted)</span>.</>,
             <>브루트는 <b>b 를 0~8 전부</b> 쟀어요. <b>최악</b> <span style={NW}>(내 A 최소)</span>은 <b style={{color:"#dc2626"}}>4</b>, <span style={NW}>b=8 에서</span> <span style={NW}>(다 B, 자투리 버림)</span>.</>)
      : t(E, <>If <span style={NW}>x is huge</span> we can't try every b. So the code checks only <b>a few likely spots</b> and gets the same <b style={{color:"#dc2626"}}>4</b> — no loop, <b>O(1)</b>.</>,
             <><span style={NW}>x 가 크면</span> b 를 전부는 못 재요. 그래서 코드는 <b>최악 될 만한 몇 군데</b>만 재서 똑같이 <b style={{color:"#dc2626"}}>4</b> 를 구해요 — 반복 없이 <b>O(1)</b>.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Brute → a few smart spots", "브루트 → 몇 군데만")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, wordBreak: "keep-all", lineHeight: 1.5 }}>
        {t(E, "x=8 · each cell = my final red for that split · the worst is the smallest", "x=8 · 칸 = 그 분배일 때 내 최종 A · 최악의 경우엔 최소를 노림")}
      </div>
      <Say tone={s.kind === "fast" ? "aha" : "stuck"}>{say}</Say>

      <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
        {rows.map((r) => {
          const isWorst = r.b === worstB;
          const isCand = candBs.includes(r.b);
          const dim = s.kind === "fast" && !isCand;
          const op = dim ? 0.2 : 1;
          const bg = isWorst ? "#fee2e2" : "#f1f5f9";
          const bd = isWorst ? "2px solid #dc2626" : "1px solid #e2e8f0";
          const fg = isWorst ? "#dc2626" : "#334155";
          return (
            <div key={r.b} style={{ width: 44, textAlign: "center", opacity: op, transition: "all .15s" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8" }}>b={r.b}</div>
              <div style={{ marginTop: 2, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", background: bg, border: bd, color: fg }}>{r.val}</div>
              {isWorst && <div style={{ fontSize: 11 }}>😈</div>}
              {s.kind === "fast" && isCand && !isWorst && <div style={{ fontSize: 8.5, fontWeight: 800, color: "#2563eb", marginTop: 1 }}>{t(E, "check", "재봄")}</div>}
            </div>
          );
        })}
      </div>

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
      ? t(E, <>First, the <b>top row</b> = the worst for each x. Read left→right: it <b>only stays or climbs — never drops</b>. (extra chips can never make my worst case smaller)</>,
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
   예: 시작 A 2, B 3 · 교환 B3→A2 · 목표 A 5.
   setup → exchange → goal(모자람) → 반전(최악의 경우) → 우리 질문
   ═══════════════════════════════════════════════════════════════ */
export function GameBoardSim({ E }) {
  const steps = [{ kind: "setup" }, { kind: "swap" }, { kind: "goal" }, { kind: "want" }, { kind: "block" }, { kind: "ask" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  // B를 교환에 다 써버린 이후 상태 (A =4, B 흐림)
  const spent = s.kind === "goal" || s.kind === "want" || s.kind === "block" || s.kind === "ask";

  const say =
    s.kind === "setup" ? t(E, <>Bessie starts with <b style={{color:RED}}>2 red chips</b> and <b style={{color:BLU}}>3 blue chips</b>. That's her whole pile.</>,
                            <>베시는 <b style={{color:RED}}>A 칩 2개</b>, <b style={{color:BLU}}>B 칩 3개</b>로 시작해요. 이게 가진 전부예요.</>)
    : s.kind === "swap" ? t(E, <>There's an exchange booth: <b>hand in 3 blue → get 2 red</b>. One direction only (blue → red), as often as you like.</>,
                             <>교환소가 있어요.<br /><b>B 3개를 내면 A 2개</b>를 줘요.<br />B → A 한 방향만 되고, 몇 번이든 할 수 있어요.</>)
    : s.kind === "goal" ? t(E, <>Goal: reach <b style={{color:"#15803d"}}>5 red chips</b>. Best I can do now: 2 red + (swap 3 blue) 2 red = <b>4 red</b>. <b style={{color:"#dc2626"}}>1 short ✗</b>.</>,
                             <>목표는 <b style={{color:"#15803d"}}>A 5개</b> 모으기.<br />지금 A가 2개 있고, B 3개를 바꾸면 A가 2개 더 늘어요.<br />그래도 <b>A 4개</b>라서 <b style={{color:"#dc2626"}}>1개가 모자라요 ✗</b></>)
    : s.kind === "want" ? t(E, <>Just <b style={{color:"#16a34a"}}>1 more red</b> and I hit 5! So I grab <b>1 extra chip</b>. If only I could take it as red…</>,
                             <>A가 <b style={{color:"#16a34a"}}>1개만 더</b> 있으면 5개예요!<br />그래서 <b>칩 1개</b>를 더 받아요.<br />그 1개를 A로 받을 수만 있다면…</>)
    : s.kind === "block" ? t(E, <>But <b>I can't choose the color</b> — the <b style={{color:"#dc2626"}}>worst case</b> makes it <b style={{color:BLU}}>blue</b>. <b>1 blue can't be exchanged</b> (needs 3) → still <b>4 red</b>, still short <b style={{color:"#dc2626"}}>✗</b>.</>,
                              <>근데 <b>색은 내가 못 골라요.</b><br />하필 <b style={{color:BLU}}>B</b>가 올 수도 있죠.<br /><b>B 1개는 못 바꿔요</b> (3개가 있어야 해요).<br />여전히 <b>A 4개</b>, 아직 부족 <b style={{color:"#dc2626"}}>✗</b></>)
    : t(E, <><b>Our question:</b> 1 chip wasn't enough. How many must I grab so that <b>no matter how he colors them</b>, I still reach 5 red? <b>That fewest count is the answer.</b></>,
           <><b>우리 질문:</b> 칩 1개론 안 됐어요.<br /><b>어떤 조합이 와도</b> A 5개를 채우려면 몇 개를 받아야 할까요?<br /><b>그 가장 적은 개수가 답이에요.</b></>);

  return (
    <div style={{ padding: 16 }}>
      {/* 문제 제목 (정적 인트로 대신 여기 한 줄로) */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>🔵 Chip Exchange</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginTop: 2 }}>USACO Dec 2025 Bronze #1</div>
      </div>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "One round of the game", "이 게임 한 판")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.kind === "goal" || s.kind === "block" ? "stuck" : s.kind === "ask" ? "aha" : "go"}>{say}</Say>

      {/* 내 칩 — 항상 표시 */}
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        {/* A 줄 — goal 부터 교환으로 얻은 +2 를 붙여 =4 를 계속 보여줌 */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: RED, width: 56, textAlign: "right" }}>{t(E, "red", "A")}</span>
          {Array.from({ length: 2 }).map((_, i) => <Chip key={i} color="red" />)}
          {spent && <><span style={{ color: "#94a3b8", fontWeight: 800 }}>+</span>
            {Array.from({ length: 2 }).map((_, i) => <Chip key={"e" + i} color="red" label="+" />)}
            <span style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginLeft: 4, fontFamily: "'JetBrains Mono',monospace" }}>= 4</span></>}
          {/* want: 원하는 A 1개(희망) */}
          {s.kind === "want" && <>
            <span style={{ color: "#16a34a", fontWeight: 800 }}>+</span>
            <div style={{ width: 26, height: 26, borderRadius: 999, background: "#f0fdf4", border: "2px dashed #16a34a",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#16a34a" }}>?</div>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#16a34a", marginLeft: 4, fontFamily: "'JetBrains Mono',monospace" }}>= 5?</span>
          </>}
        </div>
        {/* B 줄 — swap 에서 교환, 이후엔 흐리게(소모됨) 유지 */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: BLU, width: 56, textAlign: "right" }}>{t(E, "blue", "B")}</span>
          {s.kind === "setup" ? (
            Array.from({ length: 3 }).map((_, i) => <Chip key={i} color="blue" />)
          ) : (
            <div style={{ display: "flex", gap: 3, padding: 4, borderRadius: 10, border: `2px dashed ${BLU}`, background: "#f8fbff" }}>
              {Array.from({ length: 3 }).map((_, i) => <Chip key={i} color="blue" faded={spent} />)}
            </div>
          )}
          {s.kind === "swap" && <><span style={{ color: "#94a3b8", fontWeight: 800 }}>→</span>
            {Array.from({ length: 2 }).map((_, i) => <Chip key={"r" + i} color="red" />)}
            <span style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", marginLeft: 2, wordBreak: "keep-all" }}>{t(E, "(2 more red)", "(A 2개 더)")}</span></>}
          {spent && <span style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", marginLeft: 2, wordBreak: "keep-all" }}>{t(E, "(spent)", "(다 씀)")}</span>}
        </div>

        {/* 교환소 규칙 배지 — setup 에선 숨김(아직 교환·목표 얘기 전) */}
        {s.kind !== "setup" && (
          <div style={{ textAlign: "center", fontSize: 11.5, fontWeight: 800, color: "#64748b", fontFamily: "'JetBrains Mono',monospace", marginTop: 6, wordBreak: "keep-all" }}>
            🔄 {t(E, "3 blue → 2 red", "B 3 → A 2")} · 🎯 {t(E, "goal 5 red", "목표 A 5")}
          </div>
        )}

        {/* block — 최악의 경우 그 1개를 B로! 못 바꿈 → 여전히 부족 */}
        {s.kind === "block" && (
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px dashed #e2e8f0", display: "flex", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{ fontSize: 26 }}>😈</div>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#94a3b8" }}>→</span>
            <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 10, border: "2px dashed #dc2626", background: "#fef2f2", alignItems: "center" }}>
              <Chip color="blue" size={22} />
              <span style={{ fontSize: 10.5, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "1 blue — can't swap (needs 3)", "B가 1개뿐이라 못 바꿔요 (3개 있어야 해요)")}</span>
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: "#dc2626", fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "red still 4 ✗", "A는 4개 그대로 — 목표 5에 못 미쳐요 ✗")}</span>
          </div>
        )}

        {/* ask — 그럼 몇 개나? 색·개수 미정 → 회색 ? 칩 */}
        {s.kind === "ask" && (
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px dashed #e2e8f0", display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ fontSize: 28 }}>😈</div>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "in the worst combination I get extra chips —", "추가 칩을 받아요 —")}</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: 999, background: "#f1f5f9", border: "2px dashed #94a3b8",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#64748b" }}>?</div>
              ))}
              <span style={{ fontSize: 16, fontWeight: 800, color: "#94a3b8" }}>…</span>
            </div>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "how many are enough, no matter the colors?", "어떤 색이 와도 A 5개가 되려면 몇 개면 될까요?")}</span>
          </div>
        )}
      </div>

      </StepFade>
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
    t(E, "A. the final number of red chips", "A. 최종 A 칩 개수"),
    t(E, "B. the fewest extra chips that guarantee the goal", "B. 목표를 보장하는 가장 적은 추가 칩 개수"),
    t(E, "C. how many times we swap blue for red", "C. B를 A로 몇 번 바꾸는지"),
  ];
  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Quick check — did I get it?", "잠깐 확인 — 제대로 이해했나요?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.kind === "reveal" ? "aha" : "go"}>
        {s.kind === "ask"
          ? t(E, <>What number do we actually <b>print</b> for each test? Pick one, then flip.</>,
                 <>각 테스트에서 우리가 실제로 <b>출력</b>하는 숫자는 뭘까요? 하나 고르고 넘겨봐요.</>)
          : t(E, <>It's <b>B</b> — the fewest extra chips so that <b>whichever combination comes</b>, we still reach the goal. (Not the final red count!)</>,
                 <>정답은 <b>B</b> 예요.<br /><b>어떤 조합이 와도</b> 목표를 채우는 가장 적은 추가 칩 개수요.<br />최종 A 개수가 아니에요!</>)}
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
      </StepFade>
      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ ③ 전략 — 어떻게 풀지 큰 그림 + 두 하위 질문 ═══ */

/* ═══════════════════════════════════════════════════════════════
   WorstCaseWhySim — "왜 최악의 경우를 세나?" (선생님 2026-08-27 요청)
   1페이지의 그 예제 그대로: A 2 · B 3 · B3→A2 · 목표 5.
   칩을 1→2→3개 받아 가며 올 수 있는 조합을 전부 펼침. 답 3.
   숫자 전부 완전탐색 확인함 (칩1 최악4 ✗ · 칩2 최악4 ✗ · 칩3 최악5 ✓).
   ═══════════════════════════════════════════════════════════════ */
export function WorstCaseWhySim({ E }) {
  /* 선생님 2026-08-27: "언제 생겼는지 단계별로 가시적으로 보이지 않아"
     → 조합을 한 줄씩 밝히고, 지금 보는 조합은 칩 그림으로 풀어서 보여줌.
     숫자 전부 완전탐색 확인 (칩1 최악4 ✗ · 칩2 최악4 ✗ · 칩3 최악5 ✓). */
  const A0 = 2, B0 = 3, CA = 2, CB = 3, GOAL = 5;
  const mk = (x, i) => { const r = x - i, b = i, tot = B0 + b, g = Math.floor(tot / CB);
    return { x, i, r, b, tot, g, left: tot % CB, v: A0 + r + g * CA }; };
  const rows = (x) => Array.from({ length: x + 1 }).map((_, i) => mk(x, i));
  const worstOf = (x) => Math.min(...rows(x).map((o) => o.v));

  /* 조합을 한국어답게 부르기: "B 2개만 오면", "A 1개와 B 2개가 오면" */
  const comboKo = (r, b) =>
    r === 0 ? `B ${b}개만 오면`
    : b === 0 ? `A ${r}개만 오면`
    : `A ${r}개와 B ${b}개가 오면`;
  const comboEn = (r, b) =>
    r === 0 ? `if all ${b} come blue` : b === 0 ? `if all ${r} come red` : `if ${r} red and ${b} blue come`;

  const steps = [{ k: "now" }];
  [1, 2, 3].forEach((x) => rows(x).forEach((_, i) => steps.push({ k: "row", x, i })));
  steps.push({ k: "rule" });
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  const cur = s.k === "row" ? mk(s.x, s.i) : null;
  const firstOfX = cur && cur.i === 0;
  const lastOfX = cur && cur.i === cur.x;

  const say =
    s.k === "now" ? t(E,
        <>I start with <b style={{color:RED,...NW}}>2 A</b> and <b style={{color:BLU,...NW}}>3 B</b>.<br />Swapping the 3 B gives 2 more A → <b style={{color:RED,...NW}}>4 A</b>.<br />The goal is <b style={NW}>5</b>, so I'm <b>one short</b>.</>,
        <><b style={{color:RED,...NW}}>A 2개</b>, <b style={{color:BLU,...NW}}>B 3개</b>로 시작해요.<br />B 3개를 바꾸면 A가 2개 늘어서 <b style={{color:RED,...NW}}>4개</b>.<br />목표가 <b style={NW}>5개</b>니까 <b>하나가 모자라요.</b></>)
  : s.k === "rule" ? t(E,
        <><b>A 2개</b> like that would be lovely — but <b>I don't get to pick</b>.<br />A count works only once <b>the worst</b> reaches the goal.<br />That's why we always look at the worst one.</>,
        <><b>A 2개</b>처럼 좋은 게 오면 좋죠.<br />근데 <b>내가 고르는 게 아니에요.</b><br />그래서 <b>제일 나쁜 조합</b>에도 A 가 5개가 되어야 그 개수가 되는 거예요.<br />그래서 늘 제일 나쁜 경우를 봅니다.</>)
  : (() => {
      const head = firstOfX
        ? t(E, <>Now <b style={NW}>{cur.x} chip{cur.x > 1 ? "s" : ""}</b> — I can't know the colours, so let's try them all.<br /></>,
              <>이번엔 칩 <b style={NW}>{cur.x}개</b>를 받아요.<br />무슨 색이 올지 모르니 다 따져 봐요.<br /></>)
        : "";
      const isWorst = cur.v === worstOf(cur.x);
      const body = cur.v >= GOAL
        ? (isWorst
            ? t(E, <>{comboEn(cur.r, cur.b)} → <b style={{color:"#15803d",...NW}}>A {cur.v}</b> ✓<br /><b>Even this — the worst one — reaches the goal.</b></>,
                   <>{comboKo(cur.r, cur.b)} <b style={{color:"#15803d",...NW}}>A {cur.v}개</b> ✓<br /><b>제일 나쁜 이 경우도 A 가 5개예요.</b></>)
            : t(E, <>{comboEn(cur.r, cur.b)} → <b style={{color:"#15803d",...NW}}>A {cur.v}</b> ✓<br /><span style={{ color: "#94a3b8" }}>Lucky — but I can't choose this.</span></>,
                   <>{comboKo(cur.r, cur.b)} <b style={{color:"#15803d",...NW}}>A {cur.v}개</b> ✓<br /><span style={{ color: "#94a3b8" }}>운이 좋은 경우예요. 내가 고를 순 없죠.</span></>))
        : t(E, <><b>The worst one:</b> {comboEn(cur.r, cur.b)} → <b style={{color:RED,...NW}}>only A {cur.v}</b> ✗<br /><b>This one isn't solved → {cur.x} chip{cur.x > 1 ? "s aren't" : " isn't"} enough.</b></>,
               <><b>제일 나쁜 경우:</b> {comboKo(cur.r, cur.b)} <b style={{color:RED,...NW}}>A {cur.v}개뿐</b> ✗<br /><b>이게 해결이 안 돼요 → 칩 {cur.x}개로는 안 되겠네요.</b></>);
      const tail = lastOfX && worstOf(cur.x) >= GOAL
        ? t(E, <><br /><b style={{color:"#15803d"}}>→ The worst case is solved. {cur.x} chips it is.</b></>,
              <><br /><b style={{color:"#15803d"}}>→ 제일 나쁜 경우가 해결됐어요. 답은 칩 {cur.x}개.</b></>)
        : "";
      return <>{head}{body}{tail}</>;
    })();

  /* 지금 보는 조합을 칩 그림으로 풀어서 */
  const Detail = ({ o }) => {
    const arrow = <span style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8" }}>→</span>;
    const Line = ({ label, children }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", padding: "4px 0" }}>
        <span style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8", width: 62, textAlign: "right", flexShrink: 0 }}>{label}</span>
        {children}
      </div>
    );
    return (
      <div style={{ margin: "6px 0 8px 20px", padding: "8px 11px", borderRadius: 9,
        background: "#fff", border: `1.5px solid ${o.v >= GOAL ? "#86efac" : "#fca5a5"}` }}>
        <Line label={t(E, "chips I got", "받은 칩")}>
          <span style={{ display: "inline-flex", gap: 3 }}>
            {Array.from({ length: o.r }).map((_, k) => <Chip key={"r" + k} color="red" size={18} />)}
            {Array.from({ length: o.b }).map((_, k) => <Chip key={"b" + k} color="blue" size={18} />)}
          </span>
          {o.r + o.b === 0 && <span style={{ fontSize: 11, color: "#94a3b8" }}>—</span>}
        </Line>
        <Line label={t(E, "my blue", "내 B")}>
          {Array.from({ length: o.g }).map((_, k) => (
            <span key={"g" + k} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 5px",
              borderRadius: 7, border: `1.5px dashed ${BLU}`, background: "#f8fbff" }}>
              {Array.from({ length: CB }).map((_, q) => <Chip key={q} color="blue" size={13} faded />)}
              {arrow}
              {Array.from({ length: CA }).map((_, q) => <Chip key={"o" + q} color="red" size={16} />)}
            </span>
          ))}
          {o.left > 0 && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, opacity: 0.4 }}>
              {Array.from({ length: o.left }).map((_, q) => <Chip key={q} color="blue" size={13} />)}
              <span style={{ fontSize: 9.5, fontWeight: 800, color: "#94a3b8" }}>{t(E, "leftover", "자투리")}</span>
            </span>
          )}
        </Line>
        <div style={{ borderTop: "1px dashed #e2e8f0", marginTop: 3, paddingTop: 4 }}>
          <Line label={t(E, "my red", "내 A")}>
            <span style={{ display: "inline-flex", gap: 3 }}>
              {Array.from({ length: A0 }).map((_, k) => <Chip key={"s" + k} color="red" size={18} />)}
              {Array.from({ length: o.r }).map((_, k) => <Chip key={"gr" + k} color="red" size={18} />)}
              {Array.from({ length: o.g * CA }).map((_, k) => <Chip key={"c" + k} color="red" size={18} />)}
            </span>
            <span style={{ fontSize: 12, fontWeight: 800, color: o.v >= GOAL ? "#15803d" : "#dc2626", wordBreak: "keep-all" }}>
              {o.v >= GOAL ? t(E, `${o.v} — goal reached ✓`, `${o.v}개 — 목표 달성 ✓`)
                           : t(E, `${o.v} — ${GOAL - o.v} short ✗`, `${o.v}개 — 목표 ${GOAL}개에 ${GOAL - o.v}개 모자람 ✗`)}
            </span>
          </Line>
        </div>
      </div>
    );
  };

  const Table = ({ x, upto }) => {
    const rs = rows(x), done = upto >= x, w = worstOf(x), ok = w >= GOAL;
    return (
      <div style={{ maxWidth: 490, margin: "0 auto 10px", border: `2px solid ${done ? (ok ? "#15803d" : "#fca5a5") : "#e2e8f0"}`,
        borderRadius: 10, background: done ? (ok ? "#f0fdf4" : "#fef2f2") : "#fff", padding: "8px 10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5, flexWrap: "wrap", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#334155" }}>
            {t(E, `${x} chip${x > 1 ? "s" : ""} — ${rs.length} combinations`, `칩 ${x}개 — 올 수 있는 조합 ${rs.length}가지`)}
          </span>
          {done && (
            <span style={{ fontSize: 12.5, fontWeight: 800, color: ok ? "#15803d" : "#dc2626" }}>
              {t(E, `worst = red ${w}`, `제일 나쁜 경우 = A ${w}`)} {ok ? "✓" : "✗"}
            </span>
          )}
        </div>
        {rs.map((o, i) => {
          if (i > upto) return null;
          const cur2 = i === upto && !done ? true : i === upto;
          const good = o.v >= GOAL;
          return (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 7px", borderRadius: 6,
                minWidth: 0, ...NW, opacity: cur2 ? 1 : 0.55,
                background: cur2 ? "#fff" : "transparent",
                border: `${cur2 ? 2 : 1}px solid ${cur2 ? (good ? "#15803d" : "#dc2626") : "transparent"}`,
                fontSize: 10.5, fontWeight: 700, color: "#475569" }}>
                <span style={{ minWidth: 76, flexShrink: 0, display: "inline-flex", gap: 3 }}>
                  {Array.from({ length: o.r }).map((_, k) => <Chip key={"r" + k} color="red" size={14} />)}
                  {Array.from({ length: o.b }).map((_, k) => <Chip key={"b" + k} color="blue" size={14} />)}
                </span>
                <span style={{ flex: 1, fontFamily: "'JetBrains Mono',monospace", ...NW }}>
                  {t(E, `blue ${B0}+${o.b}=${o.tot} → ${o.g} group${o.g === 1 ? "" : "s"}`, `B ${B0}+${o.b}=${o.tot}개 → 묶음 ${o.g}개`)}
                </span>
                <span style={{ fontWeight: 800, flexShrink: 0, color: good ? "#15803d" : "#dc2626" }}>
                  {t(E, `red ${o.v}`, `A ${o.v}개`)} {good ? "✓" : "✗"}
                </span>
                <span style={{ width: 78, textAlign: "right", flexShrink: 0, fontSize: 10, fontWeight: 800,
                  color: o.v === worstOf(x) ? (good ? "#15803d" : "#dc2626") : "transparent" }}>
                  {o.v === worstOf(x) ? t(E, "← worst", "← 제일 나쁨") : ""}
                </span>
              </div>
              {cur2 && <Detail o={o} />}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ padding: 16, paddingBottom: 120 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why do we count the worst case?", "왜 제일 나쁜 경우를 셀까요?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "rule" ? "aha" : s.k === "now" ? "go" : (cur && cur.v >= GOAL ? "go" : "stuck")}>{say}</Say>

      {/* 목표는 늘 보이게 (선생님: "몇 개를 만드는 게 목표인데?") */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 7, marginBottom: 10,
        fontSize: 12, fontWeight: 800, color: "#15803d", wordBreak: "keep-all" }}>
        <span style={{ padding: "3px 10px", borderRadius: 999, background: "#f0fdf4", border: "1.5px solid #86efac" }}>
          🎯 {t(E, "goal", "목표")} {t(E, `${GOAL} red`, `A ${GOAL}개`)}
        </span>
        <span style={{ display: "inline-flex", gap: 3 }}>
          {Array.from({ length: GOAL }).map((_, i) => <Chip key={i} color="red" size={15} />)}
        </span>
      </div>

      {s.k === "now" && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap", fontSize: 12, fontWeight: 800 }}>
          <span style={{ display: "inline-flex", gap: 4 }}>
            {Array.from({ length: A0 }).map((_, i) => <Chip key={"a" + i} color="red" size={24} />)}
            {Array.from({ length: B0 }).map((_, i) => <Chip key={"b" + i} color="blue" size={24} />)}
          </span>
          <span style={{ color: "#94a3b8" }}>→</span>
          <span style={{ display: "inline-flex", gap: 4 }}>
            {Array.from({ length: 4 }).map((_, i) => <Chip key={"f" + i} color="red" size={24} />)}
          </span>
          <span style={{ color: "#dc2626" }}>{t(E, "red 4 — one short of 5 ✗", "A 4개 — 목표 5개에 하나 모자람 ✗")}</span>
        </div>
      )}
      {cur && <Table x={cur.x} upto={cur.i} />}
      {s.k === "rule" && (
        <div style={{ maxWidth: 470, margin: "0 auto", padding: "12px 14px", borderRadius: 10,
          background: "#f5f3ff", border: "2px solid #c4b5fd", textAlign: "center",
          fontSize: 13, fontWeight: 800, color: "#5b21b6", wordBreak: "keep-all", lineHeight: 1.8 }}>
          {t(E, <>answer = the fewest chips such that <b>even the worst combination</b> reaches the goal</>,
                <>답 = <b>제일 나쁜 조합이 와도</b> A 가 목표만큼 되는 가장 적은 칩 수</>)}
        </div>
      )}

      </StepFade>
      <div style={{ marginTop: 22 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ ③ 전략 — 어떻게 풀지 큰 그림 + 두 하위 질문 ═══ */
export function StrategySlide({ E }) {
  /* 선생님 2026-08-27: "첫 페이지부터 이 부분(−1/+1)이 이해가 잘 되도록".
     → 전략 페이지에서 풀이의 '모양'을 미리 심는다: 답 = 아직 목표에 못 닿을 수 있는 마지막 칩 + 1.
       그래야 도구④ 의 −1/+1 이 허공에서 튀어나오지 않음. */
  const steps = [{ kind: "two" }, { kind: "shape" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "How will we solve it?", "어떻게 풀까요?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.kind === "shape" ? "aha" : "go"}>
        {s.kind === "two"
          ? t(E, <>First check what I already have. Two cases.</>, <>먼저 지금 가진 걸 확인해요. 두 경우로 갈려요.</>)
          : t(E, <>How do we count case ②? Here is what the answer looks like.</>,
                 <>②는 어떻게 셀까요? 답이 <b>어떤 모양</b>인지 먼저 보여드릴게요.</>)}
      </Say>
      {s.kind === "two" ? (
        <div style={{ maxWidth: 470, margin: "0 auto" }}>
          <Slab n="①" color="#15803d" bg="#f0fdf4" title={t(E, "red_now ≥ goal", "red_now ≥ 목표")}>
            {t(E, <>My own blue, swapped, already reaches the goal → <b>the answer is 0.</b></>,
                  <>내 B를 환전한 것만으로 이미 목표만큼 돼요 → <b>답은 0이에요.</b></>)}
          </Slab>
          <Slab n="②" color="#2563eb" bg="#eff6ff" title={t(E, "red_now < goal", "red_now < 목표")}>
            {t(E, <>Short of the goal → I need extra chips. <b>How many?</b> That is the rest of this chapter.</>,
                  <>목표에 모자라요 → 칩을 더 받아야 해요. <b>몇 개?</b> 이게 이 챕터의 나머지예요.</>)}
          </Slab>
        </div>
      ) : (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 12px",
            marginBottom: 10, fontSize: 12.5, color: "#92400e", lineHeight: 1.8, wordBreak: "keep-all" }}>
            {t(E,
              <>The goal is <b>A 5</b>.<br />Even after chips arrive, A can stop at <b>4</b>.<br />Find the <b>largest chip count</b><br />that can still stop there.</>,
              <>목표는 <b>A 5개</b>예요.<br />칩을 받아도 <b>A가 4개까지밖에</b> 안 될 수 있어요.<br />그렇게 <b>안 될 수 있는 칩 수</b> 중에<br /><b>제일 큰 것</b>을 찾아요.</>)}
          </div>
          <div style={{ textAlign: "center", padding: "12px 10px", borderRadius: 10, background: "#f5f3ff",
            border: "2px solid #c4b5fd", fontSize: 13.5, fontWeight: 800, color: "#5b21b6",
            wordBreak: "keep-all", lineHeight: 1.8 }}>
            {t(E, <>answer = <span style={{ color: "#b45309" }}>last count that can still fall short</span> <span style={{ color: "#15803d" }}>+ 1</span></>,
                  <>답 = <span style={{ color: "#b45309" }}>안 될 수 있는 마지막 칩 수</span> <span style={{ color: "#15803d" }}>+ 1</span></>)}
          </div>
          <div style={{ marginTop: 9, fontSize: 11.5, color: "#64748b", textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
            {t(E, <>"Fails" means A ends below the goal.<br />So the <b>4</b> (one below 5) is the <b style={{ color: "#b45309" }}>− 1</b>,<br />and one chip past it is the <b style={{ color: "#15803d" }}>+ 1</b>.</>,
                  <>"안 된다" 는 A 가 목표보다 적다는 뜻이에요.<br />그래서 목표 5보다 하나 적은 <b>4</b> 가 식의 <b style={{ color: "#b45309" }}>− 1</b>,<br />거기서 칩 하나 더가 <b style={{ color: "#15803d" }}>+ 1</b> 이에요.</>)}
          </div>
        </div>
      )}
      </StepFade>
      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ 도구 ④ — 마지막 A는 묶음(손해) 말고 낱개로 (경우 ② 의 근거) ═══
   선생님 2026-08-26: −1/+1 트릭은 "뭔말인지는 알겠지만 이해가 안가" → if/elif/else 로 확정.
   이 페이지는 elif (묶음으로 딱 떨어질 때) 가 왜 묶음 하나를 빼는지:
   낱개 A = 칩 1개 < 묶음 (칩 cB개에 A cA개) → 마지막 묶음 대신 낱개 cA개.
   예: A 4개 필요 → 묶음 2개 통째 = 칩 6 vs 묶음1+낱개2 = 칩 5 ✓ */
/* ═══ 도구 ④ 공용 — 깔린 B 2개 상태에서, 최악의 경우 칩 x개를 A/B로 나눠 주는 경우 ═══ */
const T4 = { LAID: 2, CA: 2, CB: 3, GOAL: 4, MISSING: 4 };
const t4Blue = (n, sz=15) => Array.from({ length: n }).map((_, i) => <Chip key={"b"+i} color="blue" size={sz} />);
const t4Red  = (n, sz=15) => Array.from({ length: n }).map((_, i) => <Chip key={"r"+i} color="red" size={sz} />);
function t4Rows(x) {
  const rs = [];
  for (let r = x; r >= 0; r--) {
    const b = x - r, tot = T4.LAID + b, g = Math.floor(tot / T4.CB);
    rs.push({ r, b, tot, g, v: r + g * T4.CA });
  }
  return { rs, min: Math.min(...rs.map((o) => o.v)) };
}
/* 깔린 2개(점선) + 받은 칩 */
function T4Piles({ r, b, sz=15 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
      <span style={{ display: "inline-flex", gap: 2, padding: "1px 3px", borderRadius: 6,
        border: "1.5px dashed #dc2626", background: "#fff5f5" }}>{t4Blue(T4.LAID, sz - 2)}</span>
      <span style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8" }}>+</span>
      <span style={{ display: "inline-flex", gap: 2 }}>{t4Red(r, sz)}{t4Blue(b, sz)}</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BoundarySim — 도구④ (구 ④-1 + ④-2 를 하나로).
   선생님 2026-08-27: "전체적으로 처음부터 끝까지 이해되게",
     "우리가 A·B 가 몇 개인지 정확히 계산할 수 없기 때문에 −1 을 타겟으로 하고".
   전엔 ④-1 과 ④-2 가 같은 얘기를 두 번 하고, 예제도 서로 달랐음
   (④ 는 A4 필요 → 5, 코드 말풍선은 0 0 2 3 5 → 9). 예제를 공식 샘플로 통일.

   유도 전부 완전탐색 확인 (0 0 2 3 5):
     칩 8개 최악 A 4 (✗) · 칩 9개 최악 A 5 (✓) · 8 = wasted 2 + short_chips 6
   ═══════════════════════════════════════════════════════════════ */
export function LastOneWhySlide({ E }) {
  const A0 = 0, B0 = 0, CA = 2, CB = 3, GOAL = 5;
  const NEED = GOAL - 1;                       // 4 — '안 되는' 상태의 끝
  const WASTE = CB - 1;                        // 2 — 절대 묶이지 않는 B
  const SC = Math.floor(NEED / CA) * CB + (NEED % CA);   // 6
  const LAST = WASTE + SC;                     // 8 — 안 되는 마지막 칩
  /* 한 화면 = 새 정보 하나 (선생님 2026-08-27: "한 화면에서 너무 많은걸 보여주고 있어
     말풍선 올려도 되니까 더 단계적으로"). next → nextA/nextB, sym → sym1/sym2 로 쪼갬. */
  const steps = [{ k: "now" }, { k: "fail" }, { k: "waste" }, { k: "build" },
                 { k: "total" }, { k: "nextA" }, { k: "nextB" },
                 { k: "sym1" }, { k: "sym2" }, { k: "math" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  const res = (b, r) => A0 + r + Math.floor((B0 + b) / CB) * CA;

  const say =
    s.k === "now" ? t(E,
        <>I start with <b>nothing</b> — A 0, B 0. The goal is <b style={{color:RED,...NW}}>A 5</b>.<br />I have to receive chips, but <b>I can't choose how many are A.</b></>,
        <>가진 게 <b>하나도 없어요.</b> A 0개, B 0개.<br />목표는 <b style={{color:RED,...NW}}>A 5개</b>예요.<br />칩을 받아야 하는데, <b>몇 개가 A 로 올지는 내가 못 골라요.</b></>)
  : s.k === "fail" ? t(E,
        <>Counting up is out, so we look at the <b>failing side</b>.<br />There we can <b>build the worst case ourselves.</b><br />It fails when A ends at <b style={{color:RED,...NW}}>4 or fewer</b>. <b>4 = 5 − 1</b>.</>,
        <>세는 건 안 되니까 <b>안 되는 쪽</b>을 봐요.<br />안 되는 쪽은 제일 나쁜 경우를 <b>직접 만들 수</b> 있거든요.<br />안 되는 건 A 가 <b style={{color:RED,...NW}}>4개 이하</b>일 때. <b>4 = 5 − 1</b> 이에요.</>)
  : s.k === "waste" ? t(E,
        <>B only turns into A when <b style={NW}>3</b> of them gather.<br />So <b style={{color:BLU,...NW}}>2 B</b> can sit there giving me <b>nothing</b>.<br />That's <b style={NW}>2 chips</b> with <b style={{color:RED,...NW}}>A 0</b>.</>,
        <>B 는 <b style={NW}>3개</b>가 모여야 A 가 돼요.<br />그래서 <b style={{color:BLU,...NW}}>B 2개</b>는 받아도 <b>아무것도 안 돼요.</b><br />칩 <b style={NW}>2개</b>를 받고 <b style={{color:RED,...NW}}>A 는 0개</b>.</>)
  : s.k === "build" ? t(E,
        <>Now A <b style={{color:RED,...NW}}>4</b> more, using <b>as many chips as possible</b>:<br /><b style={NW}>2 swaps</b> — <b style={{color:BLU,...NW}}>B 6</b> turns into <b style={{color:RED,...NW}}>A 4</b>.<br />That is <b style={NW}>6 chips</b>.</>,
        <>이제 A <b style={{color:RED,...NW}}>4개</b>를 <b>칩을 최대한 많이 써서</b> 만들어요:<br /><b style={NW}>바꾸기 2번</b>이면 <b style={{color:BLU,...NW}}>B 6개</b>가 <b style={{color:RED,...NW}}>A 4개</b>가 돼요.<br />칩 <b style={NW}>6개</b>예요.</>)
  : s.k === "total" ? t(E,
        <><b style={NW}>2 + 6 = 8 chips</b>, and A is still <b style={{color:RED,...NW}}>4</b>.<br />So <b style={NW}>8</b> is the <b>last count that can still fail</b>.</>,
        <>합쳐서 <b style={NW}>칩 8개</b>, 그런데 A 는 아직 <b style={{color:RED,...NW}}>4개</b>.<br />그래서 <b style={NW}>8</b> 이 <b>안 될 수 있는 마지막 칩 수</b>예요.</>)
  : s.k === "nextA" ? t(E,
        <>Now the <b style={NW}>9th</b> chip.<br />If it comes as <b style={{color:RED,...NW}}>A</b> → A 5 ✓</>,
        <>이제 <b style={NW}>9번째</b> 칩.<br /><b style={{color:RED,...NW}}>A</b> 로 오면 → A 5개 ✓</>)
  : s.k === "nextB" ? t(E,
        <>And if it comes as <b style={{color:BLU,...NW}}>B</b> → a group completes → A 6 ✓<br /><b style={{color:"#15803d"}}>Either way it works. Answer = 8 + 1 = 9.</b></>,
        <><b style={{color:BLU,...NW}}>B</b> 로 와도 → 묶음이 완성돼서 → A 6개 ✓<br /><b style={{color:"#15803d"}}>어느 쪽이든 돼요. 답 = 8 + 1 = 9.</b></>)
  : s.k === "sym1" ? t(E,
        <>Now the letters — first, the three things we counted.</>,
        <>이제 글자로 써 볼게요.<br />먼저 방금 센 세 가지예요.</>)
  : s.k === "sym2" ? t(E,
        <>And the last two lines put them together.</>,
        <>마지막 두 줄이 그걸 합쳐요.</>)
  : t(E, <>Appendix — the official analysis writes the same thing with inequalities.</>,
         <>부록이에요.<br />공식 풀이는 같은 얘기를 부등식으로 씁니다.<br />답은 똑같아요.</>);

  /* 칩 줄: 받은 칩 그림 + 결과 A */
  const Line = ({ label, b, r, tone = "plain", note }) => {
    const tot = B0 + b, g = Math.floor(tot / CB), v = res(b, r);
    const col = tone === "good" ? "#15803d" : tone === "bad" ? "#dc2626" : "#334155";
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: "6px 10px",
        borderRadius: 9, marginBottom: 5,
        border: `${tone === "plain" ? 1 : 2}px solid ${tone === "plain" ? "#e2e8f0" : col}`,
        background: tone === "plain" ? "#fff" : tone === "good" ? "#f0fdf4" : "#fef2f2" }}>
        <span style={{ minWidth: 62, fontSize: 11.5, fontWeight: 800, color: "#334155", flexShrink: 0 }}>{label}</span>
        <span style={{ display: "inline-flex", gap: 3, flexWrap: "wrap", flexShrink: 0 }}>
          {Array.from({ length: b }).map((_, i) => <Chip key={"b" + i} color="blue" size={17} />)}
          {Array.from({ length: r }).map((_, i) => <Chip key={"r" + i} color="red" size={17} />)}
        </span>
        <span style={{ flex: 1, minWidth: 96, fontSize: 10.5, color: "#94a3b8",
          fontFamily: "'JetBrains Mono',monospace", ...NW }}>
          {t(E, `B ${tot} → ${g} grp`, `B ${tot}개 → 묶음 ${g}개`)}
        </span>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: col, flexShrink: 0 }}>
          {t(E, `A ${v}`, `A ${v}개`)}
        </span>
        {note && <span style={{ fontSize: 10.5, fontWeight: 800, color: col, flexShrink: 0 }}>{note}</span>}
      </div>
    );
  };

  return (
    <div style={{ padding: 16, paddingBottom: 120 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "How many chips guarantee A 5?", "칩 몇 개면 A 5개가 확실할까요?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "nextB" || s.k === "sym2" || s.k === "math" ? "aha" : s.k === "fail" || s.k === "total" ? "stuck" : "go"}>{say}</Say>

      {/* 목표 — 늘 보이게 */}
      {!s.k.startsWith("sym") && s.k !== "math" && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 7, marginBottom: 11,
          fontSize: 12, fontWeight: 800, color: "#15803d", wordBreak: "keep-all" }}>
          <span style={{ padding: "3px 10px", borderRadius: 999, background: "#f0fdf4", border: "1.5px solid #86efac" }}>
            🎯 {t(E, "goal  A 5", "목표 A 5개")}
          </span>
          <span style={{ display: "inline-flex", gap: 3 }}>
            {Array.from({ length: GOAL }).map((_, i) => <Chip key={i} color="red" size={15} />)}
          </span>
        </div>
      )}

      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        {s.k === "fail" && (
          <div style={{ padding: "10px 12px", borderRadius: 10, background: "#fef2f2", border: "2px solid #fca5a5",
            textAlign: "center", fontSize: 13, fontWeight: 800, color: "#7f1d1d", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.8 }}>
            {t(E, <>fails ⟺ A ends at <b>4 or fewer</b> &nbsp;·&nbsp; <b>4 = 5 − 1</b></>,
                  <>안 된다 ⟺ A 가 <b>4개 이하</b>로 끝난다 &nbsp;·&nbsp; <b>4 = 5 − 1</b></>)}
          </div>
        )}
        {s.k === "waste" && <Line label={t(E, "2 chips", "칩 2개")} b={WASTE} r={0} tone="bad" note={t(E, "← nothing", "← 아무것도 안 됨")} />}
        {s.k === "build" && (
          <Line label={t(E, "2 + 6 chips", "칩 2+6개")} b={WASTE + SC} r={0} tone="bad" note={t(E, "← now A 4", "← 이제 A 4개")} />
        )}
        {s.k === "total" && (
          <>
            <Line label={t(E, "8 chips", "칩 8개")} b={LAST} r={0} tone="bad" note={t(E, "← still fails", "← 아직 안 됨")} />
            <div style={{ marginTop: 6, textAlign: "center", fontSize: 12.5, fontWeight: 800, color: "#b45309" }}>
              {t(E, "2 (wasted) + 6 (to build A 4) = 8", "2 (버려짐) + 6 (A 4개 만들기) = 8")}
            </div>
          </>
        )}
        {s.k === "nextA" && (
          <Line label={t(E, "8 + A", "8 + A")} b={LAST} r={1} tone="good" note="✓" />
        )}
        {s.k === "nextB" && (
          <>
            <Line label={t(E, "8 + B", "8 + B")} b={LAST + 1} r={0} tone="good" note="✓" />
            <div style={{ marginTop: 6, textAlign: "center", fontSize: 13.5, fontWeight: 800, color: "#15803d" }}>
              {t(E, "answer = 8 + 1 = 9 chips", "답 = 8 + 1 = 칩 9개")}
            </div>
          </>
        )}
        {s.k.startsWith("sym") && (
          <div style={{ padding: "12px 14px", borderRadius: 10, background: "#f5f3ff", border: "1.5px solid #c4b5fd",
            display: "grid", gap: 9, fontSize: 12, color: "#475569", lineHeight: 1.75, wordBreak: "keep-all", textWrap: "balance" }}>
            <div><code style={{ color: "#5b21b6", fontWeight: 800 }}>red_now = 0</code><br />
              <span style={{ fontSize: 11.5, color: "#64748b" }}>{t(E, "A I can make right now", "지금 가진 걸로 만드는 A")}</span></div>
            <div><code style={{ color: "#5b21b6", fontWeight: 800 }}>wasted_blue = cB − 1 − B%cB = 2</code><br />
              <span style={{ fontSize: 11.5, color: "#64748b" }}>{t(E, "B that can never gather into a swap", "절대 묶이지 못하는 B")}</span></div>
            <div><code style={{ color: "#5b21b6", fontWeight: 800 }}>short_red = fA − 1 − red_now = 4</code><br />
              <span style={{ fontSize: 11.5, color: "#64748b" }}>{t(E, "still failing means A ≤ 4 — the −1", "안 된다 = A 4개 이하 — 여기가 −1")}</span></div>
            {s.k === "sym2" && (
              <>
                <div style={{ borderTop: "1px dashed #c4b5fd", paddingTop: 8 }}>
                  <code style={{ color: "#5b21b6", fontWeight: 800 }}>short_chips = 4//2×3 + 4%2 = 6</code><br />
                  <span style={{ fontSize: 11.5, color: "#64748b" }}>{t(E, "most chips it can take to reach A 4", "A 4개까지 가는 데 최대로 쓰는 칩")}</span></div>
                <div><code style={{ color: "#5b21b6", fontWeight: 800 }}>answer = 2 + 6 + 1 = 9</code><br />
                  <span style={{ fontSize: 11.5, color: "#64748b" }}>{t(E, "one past the last failing count — the +1", "안 되는 마지막(8) 다음 — 여기가 +1")}</span></div>
              </>
            )}
          </div>
        )}
        {s.k === "math" && (
          <div style={{ display: "grid", gap: 9, fontSize: 12, color: "#334155", lineHeight: 1.8, wordBreak: "keep-all", textWrap: "balance" }}>
            <div style={{ padding: "9px 12px", borderRadius: 9, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              {t(E, <>Receiving <b>n<sub>A</sub></b> of A and <b>n<sub>B</sub></b> of B,<br />it <b>still fails</b> exactly when</>,
                    <>A 를 <b>n<sub>A</sub></b>개, B 를 <b>n<sub>B</sub></b>개 받았을 때<br /><b>아직 안 되는</b> 경우는 정확히 이때예요:</>)}
              <div style={{ textAlign: "center", padding: "8px 0 2px", fontFamily: "'JetBrains Mono',monospace",
                fontSize: 12.5, fontWeight: 800, color: "#5b21b6" }}>
                ⌊(B + n<sub>B</sub>) / c<sub>B</sub>⌋ · c<sub>A</sub> + (A + n<sub>A</sub>) &lt; f<sub>A</sub>
              </div>
            </div>
            <div style={{ padding: "9px 12px", borderRadius: 9, background: "#fffbeb", border: "1.5px solid #fbbf24", color: "#92400e" }}>
              {t(E, <><b>y</b> = the largest <b>n<sub>A</sub> + n<sub>B</sub></b> among those — our <b>8</b>.<br />The answer is <b>y + 1</b>.</>,
                    <><b>y</b> = 그런 짝들 중 <b>n<sub>A</sub> + n<sub>B</sub></b> 가 제일 큰 값 — 우리의 <b>8</b>.<br />답은 <b>y + 1</b>.</>)}
            </div>
            <div style={{ padding: "9px 12px", borderRadius: 9, background: "#eff6ff", border: "1px solid #93c5fd", color: "#1e40af" }}>
              {t(E, <>At that largest pair the leftover is maxed:<br /><b>B + n<sub>B</sub> ≡ c<sub>B</sub> − 1 (mod c<sub>B</sub>)</b> → <code>wasted_blue</code>.<br />And <b>n<sub>A,0</sub> = f<sub>A</sub> − 1 − red_now</b> → <code>short_red</code>.</>,
                    <>그 최대 짝에서는 자투리가 꽉 차 있어요:<br /><b>B + n<sub>B</sub> ≡ c<sub>B</sub> − 1 (mod c<sub>B</sub>)</b> → <code>wasted_blue</code>.<br />그리고 <b>n<sub>A,0</sub> = f<sub>A</sub> − 1 − red_now</b> → <code>short_red</code>.</>)}
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center" }}>
              {t(E, "— from the official USACO analysis (Benjamin Qi)", "— USACO 공식 풀이 (Benjamin Qi) 의 유도")}
            </div>
          </div>
        )}
      </div>
      </StepFade>

      <div style={{ marginTop: 22 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ ④-b 하나씩 세어보기 — 되는 방법이지만 느리다 ═══
   선생님 2026-08-28: "언제까지 안되나를 셀수 있다는거는 언제 되나도 셀수 있는건데
   그렇게 하면 엄청 오래걸리는것 설명".
   전엔 '언제 되나 말고 언제까지 안 되나를 물어요' 라고 선언만 하고 넘어갔음.
   먼저 학생이 떠올릴 방법(칩 1개부터 넣어보기)을 실제로 끝까지 해서 답 9를 찾고,
   그 다음 fA 가 10^18 이라 그 방법이 무너지는 걸 보여준다 (기·승·전·결의 '한계').
   최악값은 하드코딩하지 않고 그 자리에서 완전탐색 — 표와 어긋날 수 없음. */
export function CountUpSim({ E }) {
  const CA = 2, CB = 3, GOAL = 5, MAXX = 9;
  /* 칩 x 개일 때 제일 나쁜 조합 (A 가 제일 적게 나오는 나눔) */
  const worst = (x) => {
    let best = null;
    for (let r = 0; r <= x; r++) {
      const v = r + Math.floor((x - r) / CB) * CA;
      if (!best || v < best.v) best = { v, r, b: x - r };
    }
    return best;
  };
  const steps = [{ k: "idea" }, ...Array.from({ length: MAXX }, (_, i) => ({ k: "x", x: i + 1 })), { k: "limit" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  const w = s.k === "x" ? worst(s.x) : null;

  const say =
    s.k === "idea" ? t(E,
        <>We can just <b>try chip counts one by one.</b><br />For each count, build its <b>worst split</b><br />and see if it still reaches <b style={{color:RED,...NW}}>A 5</b>.</>,
        <>칩 수를 <b>1개부터 하나씩 넣어 보면</b> 돼요.<br />칩 수마다 <b>제일 나쁜 조합</b>을 만들어서<br /><b style={{color:RED,...NW}}>A 5개</b>가 되는지 보는 거예요.</>)
  : s.k === "x" ? (w.v >= GOAL ? t(E,
        <><b style={NW}>{s.x} chips</b> — even the worst split gives <b style={{color:RED,...NW}}>A {w.v}</b>.<br /><b style={{color:"#15803d"}}>It works. The answer is {s.x}.</b></>,
        <><b style={NW}>칩 {s.x}개</b> — 제일 나쁜 조합도 <b style={{color:RED,...NW}}>A {w.v}개</b>.<br /><b style={{color:"#15803d"}}>됐어요. 답은 칩 {s.x}개예요.</b></>)
      : t(E,
        <><b style={NW}>{s.x} chips</b> — the worst split leaves <b style={{color:RED,...NW}}>A {w.v}</b>.<br />Not there yet.</>,
        <><b style={NW}>칩 {s.x}개</b> — 제일 나쁜 조합은 <b style={{color:RED,...NW}}>A {w.v}개</b>.<br />아직 안 돼요.</>))
  : t(E,
        <>The method is <b>right</b>. But <b style={{color:RED,...NW}}>f<sub>A</sub></b> goes up to <b style={NW}>10<sup>18</sup></b>.<br />Then we'd count not 9 times but that many.<br /><b>No computer finishes that.</b></>,
        <>이 방법은 <b>맞아요.</b> 그런데 목표 <b style={{color:RED,...NW}}>f<sub>A</sub></b> 는<br /><b style={NW}>10<sup>18</sup></b> 까지 갑니다.<br />그러면 9번이 아니라 그만큼 세야 해요.<br /><b>어떤 컴퓨터도 못 끝냅니다.</b></>);

  /* 지금까지 확인한 칩 수들이 쌓이는 표 */
  const shown = s.k === "x" ? s.x : s.k === "limit" ? MAXX : 0;

  return (
    <div style={{ padding: 16, paddingBottom: 120 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Just try every chip count?", "그냥 하나씩 세어보면 안 될까요?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "limit" ? "stuck" : s.k === "x" && w.v >= GOAL ? "aha" : "go"}>{say}</Say>

      {s.k !== "limit" && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 7, marginBottom: 11,
          fontSize: 12, fontWeight: 800, color: "#15803d", wordBreak: "keep-all" }}>
          <span style={{ padding: "3px 10px", borderRadius: 999, background: "#f0fdf4", border: "1.5px solid #86efac" }}>
            🎯 {t(E, "goal  A 5", "목표 A 5개")}
          </span>
          <span style={{ display: "inline-flex", gap: 3 }}>
            {Array.from({ length: GOAL }).map((_, i) => <Chip key={i} color="red" size={15} />)}
          </span>
        </div>
      )}

      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        {shown > 0 && (
          <div style={{ display: "grid", gap: 4 }}>
            {Array.from({ length: shown }, (_, i) => i + 1).map((x) => {
              const q = worst(x), ok = q.v >= GOAL, last = x === shown;
              const col = ok ? "#15803d" : "#dc2626";
              return (
                <div key={x} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
                  padding: "6px 10px", borderRadius: 9,
                  border: `${last ? 2 : 1}px solid ${last ? col : "#e2e8f0"}`,
                  background: last ? (ok ? "#f0fdf4" : "#fef2f2") : "#fff",
                  opacity: last ? 1 : 0.62 }}>
                  <span style={{ minWidth: 52, fontSize: 11.5, fontWeight: 800, color: "#334155", flexShrink: 0 }}>
                    {t(E, `${x} chips`, `칩 ${x}개`)}
                  </span>
                  <span style={{ display: "inline-flex", gap: 3, flexWrap: "wrap", flexShrink: 0 }}>
                    {Array.from({ length: q.b }).map((_, i) => <Chip key={"b" + i} color="blue" size={15} />)}
                    {Array.from({ length: q.r }).map((_, i) => <Chip key={"r" + i} color="red" size={15} />)}
                  </span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: col, flexShrink: 0, ...NW }}>
                    {t(E, `A ${q.v}`, `A ${q.v}개`)}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: col, flexShrink: 0 }}>{ok ? "✓" : "✗"}</span>
                </div>
              );
            })}
          </div>
        )}
        {s.k === "idea" && (
          <div style={{ padding: "11px 13px", borderRadius: 10, background: "#f0f9ff", border: "1.5px solid #7dd3fc",
            textAlign: "center", fontSize: 12.5, fontWeight: 700, color: "#075985",
            wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.85 }}>
            {t(E, <>1 chip? 2 chips? 3 chips? …<br />Stop at the first one that always works.</>,
                  <>칩 1개? 2개? 3개? …<br />처음으로 항상 되는 칩 수에서 멈추면 돼요.</>)}
          </div>
        )}
        {s.k === "limit" && (
          <div style={{ marginTop: 11, display: "grid", gap: 8 }}>
            <div style={{ padding: "10px 13px", borderRadius: 10, background: "#f0fdf4", border: "1.5px solid #86efac",
              fontSize: 12.5, fontWeight: 700, color: "#14532d", lineHeight: 1.85,
              wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>
              {t(E, <>goal <b>A 5</b> → we counted <b>9 times</b> ✓</>,
                    <>목표 <b>A 5개</b> → <b>9번</b> 세서 찾았어요 ✓</>)}
            </div>
            <div style={{ padding: "10px 13px", borderRadius: 10, background: "#fef2f2", border: "2px solid #fca5a5",
              fontSize: 12.5, fontWeight: 700, color: "#7f1d1d", lineHeight: 1.85,
              wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>
              {t(E, <>goal <b>A 10<sup>18</sup></b> → about <b>10<sup>18</sup> times</b> ✗<br />That is a billion billion.</>,
                    <>목표 <b>A 10<sup>18</sup>개</b> → 약 <b>10<sup>18</sup>번</b> ✗<br />100경 번이에요.</>)}
            </div>
            <div style={{ padding: "10px 13px", borderRadius: 10, background: "#eff6ff", border: "1.5px solid #93c5fd",
              fontSize: 12.5, fontWeight: 800, color: "#1e40af", lineHeight: 1.85,
              wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>
              {t(E, <>So we need to get the same 9<br /><b>without counting up to it.</b></>,
                    <>그래서 이 9를 <b>세지 않고</b><br />바로 구하는 방법이 필요해요.</>)}
            </div>
          </div>
        )}
      </div>
      </StepFade>

      <div style={{ marginTop: 22 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ ⑤-b 왜 목표를 그대로 계산하면 안 되나 ═══
   선생님 2026-08-28: "-1한 것에서 뭘 구한다는건 필요한 칩의 갯수를 구하는건데
   그건 정확하지 않은건가?" → "이에 대한 설명이 들어갔으면 좋겠네".
   말이 아니라 반례로 답한다: 목표를 바꿔가며 재면 직접 계산은 12개 중 6개에서 1 크게 나옴.
   표의 네 줄은 완전탐색으로 확인한 값 (아래 주석의 검증 코드와 일치). */
export function WhyNotGoalSim({ E }) {
  const CA = 2, CB = 3;
  const steps = [{ k: "ask" }, { k: "small" }, { k: "direct" }, { k: "real" },
                 { k: "safe" }, { k: "why" }, { k: "table" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  /* 완전탐색으로 확인한 값 — 목표 | 진짜 답 | 목표 그대로 | 목표−1 후 +1 */
  const rows = [
    { goal: 2, real: 4, direct: 5, ours: 4 },
    { goal: 3, real: 6, direct: 6, ours: 6 },
    { goal: 4, real: 7, direct: 8, ours: 7 },
    { goal: 5, real: 9, direct: 9, ours: 9 },
  ];

  const say =
    s.k === "ask" ? t(E,
        <>Wait — why not just count the chips<br />that <b>make A 5</b>, the goal itself?</>,
        <>그런데 목표 <b style={{color:RED,...NW}}>A 5개</b>를<br />그대로 계산하면 안 될까요?<br />A 5개 만드는 칩 수를 바로 세는 거예요.</>)
  : s.k === "small" ? t(E,
        <>Let's test it on a <b>smaller goal</b>.<br />Goal becomes <b style={{color:RED,...NW}}>A 2</b>. The swap stays the same.</>,
        <><b>작은 목표</b>로 시험해 볼게요.<br />목표를 <b style={{color:RED,...NW}}>A 2개</b>로 바꿉니다.<br />교환은 그대로 <b style={NW}>B 3개 → A 2개</b>예요.</>)
  : s.k === "direct" ? t(E,
        <>Counting the goal directly:<br /><b style={{color:BLU,...NW}}>2 B</b> that never gather, plus<br /><b style={{color:BLU,...NW}}>3 B</b> to make <b style={{color:RED,...NW}}>A 2</b>. That's <b style={NW}>5 chips</b>.</>,
        <>목표를 그대로 세면 이렇게 돼요.<br />묶이지 못하고 버려지는 <b style={{color:BLU,...NW}}>B 2개</b>,<br />거기에 <b style={{color:RED,...NW}}>A 2개</b>를 만들 <b style={{color:BLU,...NW}}>B 3개</b>.<br />합쳐서 <b style={NW}>칩 5개</b>.</>)
  : s.k === "real" ? t(E,
        <>But <b style={NW}>4 chips</b> already do it.<br /><b style={{color:BLU,...NW}}>B 4</b> → one group of 3, one left over.<br />That gives <b style={{color:RED,...NW}}>A 2</b>.</>,
        <>그런데 <b style={NW}>칩 4개</b>면 이미 됩니다.<br /><b style={{color:BLU,...NW}}>B 4개</b> → 3개로 묶음 하나, 남는 건 1개.<br /><b style={{color:RED,...NW}}>A 2개</b>가 나와요.</>)
  : s.k === "safe" ? t(E,
        <>And if some come as <b style={{color:RED,...NW}}>A</b>, A only grows.<br />So <b style={NW}>4 chips</b> is already <b>certain</b> — not 5.</>,
        <>그리고 <b style={{color:RED,...NW}}>A</b> 가 섞여 오면 A 는 더 늘기만 해요.<br />그래서 <b style={NW}>칩 4개</b>면 이미 <b>확실</b>해요. 5개가 아니라요.</>)
  : s.k === "why" ? t(E,
        <>The direct count assumed <b>two worsts at once</b>:<br />"2 B are wasted" <b>and</b> "a group is filled".<br />With 4 chips only <b style={NW}>1</b> is wasted.</>,
        <>직접 계산은 <b>최악을 두 번 겹쳐</b> 셌어요.<br />"B 2개가 버려진다" 와 "묶음을 꽉 채운다" 를<br />같이 일어나는 것처럼 본 거예요.<br />칩 4개일 땐 버려지는 게 <b style={NW}>1개</b>뿐이에요.</>)
  : t(E,
        <>Changing the goal, the direct count is<br /><b>right sometimes, wrong sometimes</b>.<br />So we can't use it.</>,
        <>목표를 바꿔가며 재 보면<br />직접 계산은 <b>맞을 때도 있고 틀릴 때도</b> 있어요.<br />그래서 쓸 수가 없어요.</>);

  /* 칩 한 줄 + 결과 */
  const Row = ({ b, r = 0, tone, note }) => {
    const g = Math.floor(b / CB), v = r + g * CA;
    const col = tone === "good" ? "#15803d" : "#dc2626";
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: "7px 11px",
        borderRadius: 9, marginBottom: 6, border: `2px solid ${col}`,
        background: tone === "good" ? "#f0fdf4" : "#fef2f2" }}>
        <span style={{ minWidth: 56, fontSize: 11.5, fontWeight: 800, color: "#334155", flexShrink: 0 }}>
          {t(E, `${b + r} chips`, `칩 ${b + r}개`)}
        </span>
        <span style={{ display: "inline-flex", gap: 3, flexWrap: "wrap", flexShrink: 0 }}>
          {Array.from({ length: b }).map((_, i) => <Chip key={"b" + i} color="blue" size={17} />)}
          {Array.from({ length: r }).map((_, i) => <Chip key={"r" + i} color="red" size={17} />)}
        </span>
        <span style={{ flex: 1, minWidth: 88, fontSize: 10.5, color: "#94a3b8",
          fontFamily: "'JetBrains Mono',monospace", ...NW }}>
          {t(E, `B ${b} → ${g} grp`, `B ${b}개 → 묶음 ${g}개`)}
        </span>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: col, flexShrink: 0 }}>
          {t(E, `A ${v}`, `A ${v}개`)}
        </span>
        {note && <span style={{ fontSize: 10.5, fontWeight: 800, color: col, flexShrink: 0 }}>{note}</span>}
      </div>
    );
  };

  return (
    <div style={{ padding: 16, paddingBottom: 120 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why not just count the goal itself?", "목표를 그대로 계산하면 안 될까요?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "ask" ? "stuck" : s.k === "why" || s.k === "table" ? "aha" : "go"}>{say}</Say>

      {/* 시험용 목표 배지 — 작은 목표로 바꾼 뒤부터 계속 */}
      {s.k !== "ask" && s.k !== "table" && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 7, marginBottom: 11,
          fontSize: 12, fontWeight: 800, color: "#15803d", wordBreak: "keep-all" }}>
          <span style={{ padding: "3px 10px", borderRadius: 999, background: "#f0fdf4", border: "1.5px solid #86efac" }}>
            🎯 {t(E, "test goal  A 2", "시험 목표 A 2개")}
          </span>
          <span style={{ display: "inline-flex", gap: 3 }}>
            <Chip color="red" size={15} /><Chip color="red" size={15} />
          </span>
        </div>
      )}

      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        {s.k === "direct" && (
          <div style={{ padding: "11px 13px", borderRadius: 10, background: "#fef2f2", border: "2px solid #fca5a5",
            textAlign: "center", fontSize: 12.5, fontWeight: 800, color: "#7f1d1d",
            wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.9 }}>
            {t(E, <>2 (wasted) + 3 (to make A 2) = <b style={{ fontSize: 15 }}>5 chips</b></>,
                  <>2 (버려짐) + 3 (A 2개 만들기) = <b style={{ fontSize: 15 }}>칩 5개</b></>)}
          </div>
        )}
        {s.k === "real" && <Row b={4} tone="good" note={t(E, "← already ✓", "← 벌써 됨 ✓")} />}
        {s.k === "safe" && (
          <>
            <Row b={4} tone="good" note="✓" />
            <Row b={3} r={1} tone="good" note="✓" />
            <Row b={2} r={2} tone="good" note="✓" />
            <div style={{ marginTop: 7, textAlign: "center", fontSize: 12.5, fontWeight: 800, color: "#15803d",
              wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E, "answer for goal A 2 = 4 chips, not 5", "목표 A 2개의 답 = 칩 4개. 5개가 아니에요.")}
            </div>
          </>
        )}
        {s.k === "why" && (
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ padding: "10px 12px", borderRadius: 10, background: "#fef2f2", border: "2px solid #fca5a5",
              fontSize: 12, fontWeight: 700, color: "#7f1d1d", lineHeight: 1.8,
              wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E, <><b>Direct count assumed</b><br />B B <span style={{ opacity: .55 }}>(wasted)</span> + B B B <span style={{ opacity: .55 }}>(full group)</span> = 5</>,
                    <><b>직접 계산이 가정한 것</b><br />B B <span style={{ opacity: .55 }}>(버려짐)</span> + B B B <span style={{ opacity: .55 }}>(꽉 찬 묶음)</span> = 5</>)}
            </div>
            <div style={{ padding: "10px 12px", borderRadius: 10, background: "#f0fdf4", border: "2px solid #86efac",
              fontSize: 12, fontWeight: 700, color: "#14532d", lineHeight: 1.8,
              wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E, <><b>What 4 chips really look like</b><br />B B B <span style={{ opacity: .55 }}>(group)</span> + B <span style={{ opacity: .55 }}>(only 1 wasted)</span> = 4</>,
                    <><b>칩 4개의 실제 모습</b><br />B B B <span style={{ opacity: .55 }}>(묶음)</span> + B <span style={{ opacity: .55 }}>(버려지는 건 1개뿐)</span> = 4</>)}
            </div>
          </div>
        )}
        {s.k === "table" && (
          <>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", margin: "0 auto", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {[t(E, "goal", "목표"), t(E, "true answer", "진짜 답"),
                      t(E, "goal directly", "목표 그대로"), t(E, "ours (−1, +1)", "우리 식 (−1, +1)")].map((h, i) => (
                      <th key={i} style={{ padding: "7px 11px", border: "1px solid #e2e8f0", fontSize: 11,
                        fontWeight: 800, color: "#475569", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const dOk = r.direct === r.real;
                    return (
                      <tr key={r.goal}>
                        <td style={{ padding: "7px 11px", border: "1px solid #e2e8f0", textAlign: "center",
                          fontWeight: 800, color: RED, ...NW }}>{t(E, `A ${r.goal}`, `A ${r.goal}개`)}</td>
                        <td style={{ padding: "7px 11px", border: "1px solid #e2e8f0", textAlign: "center",
                          fontWeight: 800, color: "#334155" }}>{r.real}</td>
                        <td style={{ padding: "7px 11px", border: "1px solid #e2e8f0", textAlign: "center",
                          fontWeight: 800, color: dOk ? "#15803d" : "#dc2626",
                          background: dOk ? "#f0fdf4" : "#fef2f2" }}>{r.direct} {dOk ? "✓" : "✗"}</td>
                        <td style={{ padding: "7px 11px", border: "1px solid #e2e8f0", textAlign: "center",
                          fontWeight: 800, color: "#15803d", background: "#f0fdf4" }}>{r.ours} ✓</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 11, padding: "10px 13px", borderRadius: 10, background: "#eff6ff",
              border: "1.5px solid #93c5fd", fontSize: 12.5, fontWeight: 700, color: "#1e40af",
              lineHeight: 1.85, wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>
              {t(E, <>"The last failing count" is something we <b>actually built</b>.<br />So it never double-counts the worst.<br /><b>answer = last failing count + 1</b></>,
                    <>"안 되는 마지막" 은 우리가 <b>직접 만들어 본</b> 거예요.<br />그래서 최악을 겹쳐 세는 일이 없어요.<br /><b>답 = 안 되는 마지막 + 1</b></>)}
            </div>
          </>
        )}
      </div>
      </StepFade>

      <div style={{ marginTop: 22 }}>
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
        {t(E, "We turn the formula into steps we can code.", "공식을 코드로 옮길 순서로 바꿔요.")}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <Slab n="1" color="#15803d" bg="#f0fdf4" title={<code>red_now = A + B//cB*cA</code>}>
          {t(E, <>red I can make now. If <b>red_now ≥ fA</b> → answer <b>0</b>.</>,
               <>지금 만드는 A. <b>red_now ≥ fA</b> 면 답 <b>0</b>.</>)}
        </Slab>
        <Slab n="2" color="#dc2626" bg="#fef2f2" title={<code>wasted_blue = cB−1 − B%cB</code>}>
          {t(E, <>blue that can't form a group is wasted first (leftover cB−1).</>,
               <>묶음이 안 되는 B가 먼저 버려져요 (자투리 cB−1).</>)}
        </Slab>
        <Slab n="3" color="#2563eb" bg="#eff6ff" title={t(E, "one short of the goal", "목표보다 하나 모자란 A")}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#334155", wordBreak: "break-word" }}>
            short_red = fA − 1 − red_now <span style={{ color: "#94a3b8" }}>{t(E, "  // the −1", "  // 여기가 −1")}</span>
          </div>
        </Slab>
        <Slab n="4" color="#7c3aed" bg="#f5f3ff" title={t(E, "how many chips can still fall short? — two cases", "거기서 버틸 수 있는 칩은? — 경우 둘")}>
          <div style={{ display: "grid", gap: 3, fontSize: 11.5, lineHeight: 1.55 }}>
            <div>① {t(E, <><b>cA ≥ cB</b> (swap pays) → red only · <code>short_chips = short_red</code></>,
                        <><b>cA ≥ cB</b> (환전 이득) → A만 와요 · <code>short_chips = short_red</code></>)}</div>
            <div>② {t(E, <><b>cA &lt; cB</b> (swap loses) → blue groups · <code>short_chips = short_red//cA*cB + short_red%cA</code> <span style={{ color: "#7c3aed" }}>(why? → previous page)</span></>,
                        <><b>cA &lt; cB</b> (환전 손해) → B 묶음으로<br /><code>short_chips = short_red//cA*cB + short_red%cA</code> <span style={{ color: "#7c3aed" }}>(왜? → 앞 페이지)</span></>)}</div>
            <div style={{ paddingLeft: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#5b21b6" }}>
              short_red = fA − 1 − red_now · 답 = wasted_blue + short_chips + 1
            </div>
          </div>
          <div style={{ marginTop: 5, paddingTop: 5, borderTop: "1px dashed #c4b5fd", fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#334155" }}>
            {t(E, "answer = wasted_blue + short_chips + 1", "답 = wasted_blue + short_chips + 1")}
            <span style={{ color: "#94a3b8", fontFamily: "system-ui" }}>{t(E, "  (64-bit — up to 10¹⁸)", "  (64비트 — 10¹⁸ 까지)")}</span>
          </div>
        </Slab>
      </div>
      <div style={{ marginTop: 12, textAlign: "center", fontSize: 12, fontWeight: 800, color: "#15803d", wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E, "→ Now the code (next chapter) is exactly these steps.", "→ 이제 코드(다음 챕터)는 이 순서 그대로예요.")}
      </div>
    </div>
  );
}
