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
                                <>완성 묶음마다 → <b style={NW}>A 2개</b>. 그래서 <b style={NW}>+4 A</b>. <b style={NW}>자투리는 못 바꿔요</b> — 그냥 남아요.</>)
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
                           <>목표에 부족해서 <b>추가 칩</b>을 받아요 — 근데 <b style={{color:"#dc2626"}}>무슨 색이 올지는 알 수 없어요</b>.</>)
    : s.k === "allblue" ? t(E, <>The worst combination is <b style={{color:BLU}}>all blue</b> — blue needs 3 to convert, so it helps me the least.</>,
                           <>제일 나쁜 건 <b style={{color:BLU}}>전부 B</b>이 오는 경우예요 — B는 3개가 모여야 A가 되니까요.</>)
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
                           <>이번엔 환전이 달라요 — <span style={NW}><b style={{color:BLU}}>B 2개</b> → <b style={{color:RED}}>A 3개</b></span>. 환전하면 오히려 <b>이득</b>이에요!</>)
    : s.k === "bluegood" ? t(E, <>If they all came as <b style={{color:BLU}}>blue</b>, I'd <b>gain</b> (2 → 3 red). No way it does that.</>,
                           <>최악의 경우 <b style={{color:BLU}}>B</b>을 주면 나한텐 <b>이득</b> (2 → 3). 이럴 땐 B가 오는 게 오히려 나한테 이득이에요.</>)
    : s.k === "givered" ? t(E, <>So it gives <b style={{color:RED}}>red, 1 at a time</b> — one red chip is just one red, the <b>least help</b>.</>,
                           <>그래서 제일 나쁜 건 <b style={{color:RED}}>A가 하나씩</b> 오는 경우예요 — A 1개는 딱 1개로 끝이라 <b>제일 안 늘거든요</b>.</>)
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
                             <>교환소가 있어요: <b>B 3개를 내면 → A 2개</b>. 한 방향만 (B → A), 몇 번이든.</>)
    : s.kind === "goal" ? t(E, <>Goal: reach <b style={{color:"#15803d"}}>5 red chips</b>. Best I can do now: 2 red + (swap 3 blue) 2 red = <b>4 red</b>. <b style={{color:"#dc2626"}}>1 short ✗</b>.</>,
                             <>목표는 <b style={{color:"#15803d"}}>A 5개</b> 모으기.<br />지금 최선은 A 2개 + (B 3개 교환) A 2개 = <b>A 4개</b>.<br /><b style={{color:"#dc2626"}}>1개가 모자라요 ✗</b></>)
    : s.kind === "want" ? t(E, <>Just <b style={{color:"#16a34a"}}>1 more red</b> and I hit 5! So I grab <b>1 extra chip</b>. If only I could take it as red…</>,
                             <>A가 <b style={{color:"#16a34a"}}>1개만 더</b> 있으면 5개예요!<br />그래서 <b>칩 1개</b>를 더 받아요.<br />그 1개를 A로 받을 수만 있다면…</>)
    : s.kind === "block" ? t(E, <>But <b>I can't choose the color</b> — the <b style={{color:"#dc2626"}}>worst case</b> makes it <b style={{color:BLU}}>blue</b>. <b>1 blue can't be exchanged</b> (needs 3) → still <b>4 red</b>, still short <b style={{color:"#dc2626"}}>✗</b>.</>,
                              <>근데 <b>색은 내가 못 골라요</b> — 하필 <b style={{color:BLU}}>B</b>가 올 수도 있어요.<br /><b>B 1개는 못 바꿔요</b> (3개가 있어야 해요).<br />여전히 <b>A 4개</b>, 아직 부족 <b style={{color:"#dc2626"}}>✗</b></>)
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
            <span style={{ fontSize: 11.5, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "how many are enough, no matter the colors?", "색이 어떻게 나오든 목표에 닿으려면 몇 개면 될까요?")}</span>
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
                 <>정답은 <b>B</b> — <b>어떤 조합이 와도</b> 목표를 채우는 가장 적은 추가 칩 개수예요. (최종 A 개수가 아니에요!)</>)}
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
        <><b>A 2개</b>처럼 좋은 게 오면 좋죠 — 근데 <b>내가 고르는 게 아니에요.</b><br />그래서 <b>제일 나쁜 조합</b>까지 목표에 닿아야 그 개수가 되는 거예요.<br />그래서 늘 제일 나쁜 경우를 봅니다.</>)
  : (() => {
      const head = firstOfX
        ? t(E, <>Now <b style={NW}>{cur.x} chip{cur.x > 1 ? "s" : ""}</b> — I can't know the colours, so let's try them all.<br /></>,
              <>이번엔 칩 <b style={NW}>{cur.x}개</b> — 무슨 색이 올지 모르니 다 따져 봐요.<br /></>)
        : "";
      const isWorst = cur.v === worstOf(cur.x);
      const body = cur.v >= GOAL
        ? (isWorst
            ? t(E, <>{comboEn(cur.r, cur.b)} → <b style={{color:"#15803d",...NW}}>A {cur.v}</b> ✓<br /><b>Even this — the worst one — reaches the goal.</b></>,
                   <>{comboKo(cur.r, cur.b)} <b style={{color:"#15803d",...NW}}>A {cur.v}개</b> ✓<br /><b>제일 나쁜 이 경우까지 목표에 닿았어요.</b></>)
            : t(E, <>{comboEn(cur.r, cur.b)} → <b style={{color:"#15803d",...NW}}>A {cur.v}</b> ✓<br /><span style={{ color: "#94a3b8" }}>Lucky — but I can't choose this.</span></>,
                   <>{comboKo(cur.r, cur.b)} <b style={{color:"#15803d",...NW}}>A {cur.v}개</b> ✓<br /><span style={{ color: "#94a3b8" }}>운이 좋은 경우 — 내가 고를 순 없어요.</span></>))
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
                <>답 = <b>제일 나쁜 조합이 와도</b> 목표에 닿는 가장 적은 칩 수</>)}
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
                  <>내 B를 환전한 것만으로 이미 목표에 닿아요 → <b>답은 0이에요.</b></>)}
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
              <>The worst combination keeps me <b>one short</b> of the goal. It can do that up to some number of chips — and <b>one chip past that, it can't.</b></>,
              <>목표가 <b>A 4개</b>라고 해볼게요.<br />4개를 <b>다 만들 필요는 없어요.</b><br /><b>3개</b>까지만 만들면, 마지막 1개는<br />무슨 칩이 오든 <b>저절로 채워지거든요.</b></>)}
          </div>
          <div style={{ textAlign: "center", padding: "12px 10px", borderRadius: 10, background: "#f5f3ff",
            border: "2px solid #c4b5fd", fontSize: 13.5, fontWeight: 800, color: "#5b21b6",
            wordBreak: "keep-all", lineHeight: 1.8 }}>
            {t(E, <>answer = <span style={{ color: "#b45309" }}>chips to build 3 A</span> <span style={{ color: "#15803d" }}>+ 1</span></>,
                  <>답 = <span style={{ color: "#b45309" }}>A 3개를 만드는 칩 수</span> <span style={{ color: "#15803d" }}>+ 1</span></>)}
          </div>
          <div style={{ marginTop: 9, fontSize: 11.5, color: "#64748b", textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
            {t(E, <>The <b>3</b> (one below the goal) is the <b style={{ color: "#b45309" }}>− 1</b>;<br />the last chip is the <b style={{ color: "#15803d" }}>+ 1</b>.<br /><b>Why not count 4?</b> Then the last A would need<br />a whole group (3 chips) → <b>6 chips</b>, when 5 is enough.</>,
                  <>목표 4개보다 하나 적은 <b>3</b> 이 식의 <b style={{ color: "#b45309" }}>− 1</b>,<br />마지막 한 칩이 <b style={{ color: "#15803d" }}>+ 1</b> 이에요.<br /><b>4개로 세면 안 되나요?</b> 그럼 마지막 1개도<br />묶음(칩 3개)으로 사야 한다고 세서 <b>칩 6개</b>가 나와요 — 5개면 되는데요.</>)}
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

/* ═══ 도구 ④-1 (관찰) — 칩 몇 개부터 어떤 조합이 와도 A 4개가 되나?
   선생님 2026-08-27:
     "읽어야 할 순간에 말풍선이 떠야지"  → 한 번에 하나씩 (단계 시뮬)
     "설명을 봐야할 곳에 말풍선 아니잖아" → 말풍선을 그 줄 바로 밑에 (CodeWalk 와 동일)
   표의 숫자는 전부 완전탐색과 일치 (t4Rows). ═══ */
export function LastOneWhySlide({ E }) {
  const steps = [{ k: "intro" }, { k: "four" }, { k: "fourWorst" }, { k: "fourBlue" }, { k: "five" }, { k: "fiveWorst" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  const showFour = s.k !== "intro";
  const showFive = s.k === "five" || s.k === "fiveWorst";
  const focus4 = s.k === "fourWorst" ? 3 : s.k === "fourBlue" ? 4 : null;
  const focus5 = s.k === "fiveWorst" ? 5 : null;
  const noteRef = React.useRef(null);
  React.useEffect(() => {
    const id = setTimeout(() => { if (noteRef.current) noteRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" }); }, 80);
    return () => clearTimeout(id);
  }, [ts.safe]);

  /* 말풍선 — 설명하는 줄 바로 밑에 꼬리 달고 */
  const Bubble = ({ tone = "warn", tail = true, children }) => {
    const c = tone === "good" ? { bg: "#dcfce7", bd: "#15803d", fg: "#14532d" }
            : tone === "info" ? { bg: "#dbeafe", bd: "#3b82f6", fg: "#1e3a8a" }
            : tone === "plain" ? { bg: "#f0f9ff", bd: "#7dd3fc", fg: "#075985" }
            : { bg: "#fee2e2", bd: "#dc2626", fg: "#7f1d1d" };
    return (
      <div ref={noteRef} style={{ position: "relative", margin: tail ? "8px 0 8px 22px" : "0 auto 10px",
        maxWidth: 470, padding: "9px 13px", borderRadius: 10, scrollMarginBottom: 110, scrollMarginTop: 20,
        background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
        fontSize: 12.5, fontWeight: 700, lineHeight: 1.75, wordBreak: "keep-all", textWrap: "balance" }}>
        {tail && <span style={{ position: "absolute", top: -6, left: 18, width: 10, height: 10, background: c.bg,
          borderLeft: `1.5px solid ${c.bd}`, borderTop: `1.5px solid ${c.bd}`, transform: "rotate(45deg)" }} />}
        {children}
      </div>
    );
  };

  const NOTE = {
    intro: <Bubble tone="plain" tail={false}>{t(E,
      <>"Just take <b style={{color:RED,...NW}}>4 red chips</b> = 4 chips!" — that would be best. But <b>I choose how many chips; I can't choose how many of them are red.</b></>,
      <>"A 4개만 받으면 칩 4개로 끝이잖아!" — 그게 최고죠.<br />근데 <b>그중 몇 개가 A일지는 내가 못 골라요.</b></>)}</Bubble>,
    four: <Bubble tone="plain" tail={false}>{t(E,
      <>Try <b style={NW}>4 chips</b>. It can make <b style={{color:RED,...NW}}>4, 3, 2, 1 or 0</b> of them red — <b style={NW}>5 ways</b>. Here they all are.</>,
      <>먼저 칩 <b style={NW}>4개</b>. 그중 <b style={{color:RED,...NW}}>A</b>이 몇 개일지에 따라 <b style={NW}>5가지</b>가 있어요 (A 4·3·2·1·0개). 전부 세어 봤어요.</>)}</Bubble>,
    fourWorst: <Bubble tone="warn">{t(E,
      <>If I get <b style={{color:RED,...NW}}>1 red</b> and <b style={{color:BLU,...NW}}>3 blue</b>, I end with only <b style={{color:RED,...NW}}>3 red</b>. <b>So 4 chips is not enough.</b></>,
      <><b style={{color:RED,...NW}}>A 1개</b>와 <b style={{color:BLU,...NW}}>B 3개</b>를 받으면 A가 <b style={{color:RED,...NW}}>3개밖에</b> 안 돼요. <b>그래서 칩 4개로는 안 돼요.</b></>)}</Bubble>,
    fourBlue: <Bubble tone="info">{t(E,
      <>"Wouldn't <b>all blue</b> be meanest?" No — <b style={{color:BLU,...NW}}>4 blue</b> makes <b style={NW}>2 groups</b> → <b style={{color:RED,...NW}}>red 4</b>. Too much blue <b>finishes groups</b> and helps me. So it gives at most <b style={NW}>3 blue</b>.</>,
      <>"<b>B만</b> 오는 게 제일 나쁜 거 아니야?" 아니에요.<br /><b style={{color:BLU,...NW}}>B 4개</b>가 오면 <b style={NW}>묶음이 2개</b> 돼서 <b style={{color:RED,...NW}}>A 4개</b>가 돼요.<br />B가 많으면 <b>묶음이 채워져</b> 오히려 이득이에요.<br />그래서 제일 나쁜 건 <b style={NW}>B가 3개까지만</b> 오는 경우예요.</>)}</Bubble>,
    five: <Bubble tone="plain" tail={false}>{t(E,
      <>Now <b style={NW}>5 chips</b> — <b style={{color:RED,...NW}}>5, 4, 3, 2, 1 or 0</b> red, so <b style={NW}>6 ways</b>.</>,
      <>이번엔 칩 <b style={NW}>5개</b> — <b style={{color:RED,...NW}}>A</b>이 5·4·3·2·1·0개일 수 있으니 <b style={NW}>6가지</b>예요.</>)}</Bubble>,
    fiveWorst: <Bubble tone="good">{t(E,
      <>The two worst cases — <b style={{color:RED,...NW}}>2 red + </b><b style={{color:BLU,...NW}}>3 blue</b>, and <b style={{color:BLU,...NW}}>5 blue</b> — still give me <b style={{color:RED,...NW}}>4 red</b>.<br /><b style={{color:"#15803d", fontSize:13}}>→ So the answer is 5 chips.</b></>,
      <>제일 나쁜 두 경우 — <b style={{color:RED,...NW}}>A 2</b> + <b style={{color:BLU,...NW}}>B 3</b>, 그리고 <b style={{color:BLU,...NW}}>B 5</b> — 도 <b style={{color:RED,...NW}}>A 4개</b>예요.<br /><b style={{color:"#15803d", fontSize:13}}>→ 그래서 답은 칩 5개.</b></>)}</Bubble>,
  };

  const Table = ({ x, focus, topNote }) => {
    const { rs, min } = t4Rows(x);
    const ok = min >= T4.GOAL;
    return (
      <div style={{ border: `${ok ? 2 : 1.5}px solid ${ok ? "#15803d" : "#fca5a5"}`, borderRadius: 10,
        background: ok ? "#f0fdf4" : "#fef2f2", padding: "8px 10px", marginBottom: 10, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5, flexWrap: "wrap", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#334155" }}>
            {t(E, `${x} chips — all ${rs.length} possible combinations`, `칩 ${x}개 — 받을 수 있는 조합 ${rs.length}가지`)}
          </span>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: ok ? "#15803d" : "#dc2626" }}>
            {t(E, `worst = red ${min}`, `최악 = A ${min}`)} {ok ? "✓" : "✗"}
          </span>
        </div>
        {topNote}
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 7px 3px", fontSize: 9.5,
            fontWeight: 800, color: "#94a3b8", minWidth: 430, ...NW }}>
            <span style={{ minWidth: 140, flexShrink: 0 }}>
              <span style={{ color: "#dc2626" }}>{t(E, "already laid", "깔림")}</span>{" + "}{t(E, "what I got", "받은 것")}
            </span>
            <span style={{ flex: 1 }}>{t(E, "total blue → groups", "총 B → 묶음")}</span>
          </div>
          {rs.map((o, i) => {
            const worst = o.v === min;
            const lit = focus === null || focus === undefined ? true : focus === i;
            return (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "2px 7px", borderRadius: 6,
                  marginBottom: 1, minWidth: 430, ...NW,
                  opacity: lit ? 1 : 0.22, transition: "opacity .18s",
                  background: lit && focus != null ? "#fff" : worst && focus == null ? "#fff" : "transparent",
                  border: `${lit && focus != null ? 2 : 1}px solid ${(focus != null ? lit : worst) ? (ok ? "#15803d" : "#dc2626") : "transparent"}`,
                  fontSize: 10.5, fontWeight: 700, color: "#475569" }}>
                  <span style={{ minWidth: 140, flexShrink: 0 }}><T4Piles r={o.r} b={o.b} sz={12} /></span>
                  <span style={{ flex: 1, fontFamily: "'JetBrains Mono',monospace", ...NW }}>
                    {t(E, `blue ${T4.LAID}+${o.b}=${o.tot} → ${o.g} grp`, `B ${T4.LAID}+${o.b}=${o.tot} → 묶음 ${o.g}`)}
                  </span>
                  <span style={{ fontWeight: 800, color: worst ? (ok ? "#15803d" : "#dc2626") : "#94a3b8", flexShrink: 0 }}>
                    {t(E, `red ${o.v}`, `A ${o.v}`)}
                  </span>
                  <span style={{ width: 58, textAlign: "right", flexShrink: 0, color: ok ? "#15803d" : "#dc2626" }}>
                    {worst ? t(E, "← worst", "← 제일 나쁨") : ""}
                  </span>
                </div>
                {focus === i && NOTE[s.k]}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 16, paddingBottom: 140 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "I need 4 more red — how many chips?", "A 4개가 더 필요해요 — 칩을 몇 개 받아야 할까요?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>

      {s.k === "intro" && (
        <>
          {NOTE.intro}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 7, flexWrap: "wrap",
            marginTop: 4, fontSize: 11, fontWeight: 700, color: "#92400e", wordBreak: "keep-all" }}>
            <span style={{ display: "inline-flex", gap: 3, padding: "2px 4px", borderRadius: 7,
              border: "1.5px dashed #dc2626", background: "#fff5f5" }}>
              {Array.from({ length: T4.LAID }).map((_, i) => <Chip key={i} color="blue" size={17} />)}
            </span>
            <span>{t(E, "= the 2 blues thrown away in Tool ② — at the start of every row below",
                        "= 도구 ②에서 버려진 B 2개 — 아래 모든 줄 맨 앞에 있어요")}</span>
          </div>
        </>
      )}

      {showFour && <Table x={4} focus={focus4} topNote={s.k === "four" ? NOTE.four : null} />}
      {showFive && <Table x={5} focus={focus5} topNote={s.k === "five" ? NOTE.five : null} />}

      </StepFade>
      <div style={{ marginTop: 20 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WhyMinusPlusSim — 왜 −1 이고 왜 +1 인가 (선생님 요청: 시뮬로).
   말은 짧게, 계산은 그림으로. 선생님 문장을 그대로 씀(2026-08-27):
   "칩 4개로는 A가 3개밖에 안 되는 경우가 있다" — '막는다' 같은 흐린 말 금지.
   전부 완전탐색 대조함:
     B3+A1 → A 3 (칩 4개 최악)  ·  B4 → 묶음 2개 → A 4 (최악의 경우 손해)
     칩 5개는 어떻게 와도 A 4 이상
   ═══════════════════════════════════════════════════════════════ */
export function WhyMinusPlusSim({ E }) {
  const GOAL = 4, LINE = GOAL - 1, LAID = 2, CB = 3, CA = 2;
  const steps = [{ k: "line" }, { k: "give4" }, { k: "count4" }, { k: "why3" }, { k: "give5" }, { k: "plus" }, { k: "noMinus" }, { k: "whenSame" }, { k: "sym" }, { k: "math" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  const HAND = { give4: [3, 1], count4: [3, 1], why3: [4, 0], give5: [3, 2], noMinus: [6, 0] }[s.k] || null;
  const myRed = s.k === "count4" ? 3 : s.k === "why3" ? 4 : s.k === "give5" || s.k === "plus" || s.k === "noMinus" ? 4 : 0;
  const showResult = s.k === "count4" || s.k === "why3" || s.k === "give5" || s.k === "noMinus";

  const say =
    s.k === "line"   ? t(E, <>I want <b style={{color:RED,...NW}}>4 red</b>. The worst combination stops me at <b style={NW}>3</b> — one short of 4.<br /><b style={NW}>3 = 4 − 1</b> is the <b>most it can give</b>.</>,
                            <>나는 <b style={{color:RED,...NW}}>A 4개</b>가 필요해요. 그러니까 <b style={NW}>3개</b>까지만 와서는 아직 목표에 못 닿아요 — 4개가 되어야 끝나거든요.<br /><b style={NW}>3 = 4 − 1</b>, 최악의 경우 <b>줘도 되는 최대</b>예요.</>)
  : s.k === "give4"  ? t(E, <>I get <b style={{color:BLU,...NW}}>3 blue</b> and <b style={{color:RED,...NW}}>1 red</b> — <b style={NW}>4 chips</b> in all.</>,
                            <><b style={NW}>칩 4개</b>를 받았는데 <b style={{color:BLU,...NW}}>B 3개</b>, <b style={{color:RED,...NW}}>A 1개</b>로 왔어요. 모두 <b style={NW}>칩 4개</b>를 줬어요.</>)
  : s.k === "count4" ? t(E, <>Count it: <b style={{color:RED,...NW}}>red 3</b>. <b>So 4 chips can leave me with only 3 red.</b></>,
                            <>세어 보면 <b style={{color:RED,...NW}}>A 3개</b>. <b>칩 4개로는 A가 3개밖에 안 되는 경우가 있는 거예요.</b></>)
  : s.k === "why3"   ? t(E, <>Why not give <b style={NW}>4 blue</b>? Then it swaps <b style={NW}>twice</b> → <b style={{color:RED,...NW}}>red 4</b>, and I win. So 3 blue is as far as it goes.</>,
                            <>B가 <b style={NW}>4개</b> 오면 어떨까요?<br />두 번 바꿔져서 <b style={{color:RED,...NW}}>A 4개</b> — 목표에 닿아버려요.<br />그래서 이건 <b>제일 나쁜 경우가 아니에요</b>.</>)
  : s.k === "give5"  ? t(E, <>Now <b style={NW}>5 chips</b>. However it hands them over, I get <b style={{color:RED,...NW}}>4 red</b> — we checked all 6 ways last page.</>,
                            <>이번엔 <b style={NW}>칩 5개</b>를 받아요. 이제는 어떻게 섞여 와도 <b style={{color:RED,...NW}}>A가 4개</b>예요 — 앞 페이지에서 6가지를 전부 확인했죠.</>)
  : s.k === "plus"   ? t(E, <><b style={NW}>4 chips</b> can leave me at 3. <b style={NW}>5 chips</b> never can.<br /><b style={{color:"#15803d",...NW}}>So: 4 + 1 = 5.</b></>,
                            <>칩 <b style={NW}>4개</b>로는 A 3개인 경우가 있어요. 칩 <b style={NW}>5개</b>는 그런 경우가 없어요.<br /><b style={{color:"#15803d",...NW}}>그래서 답은 4 + 1 = 5.</b></>)
  : s.k === "noMinus" ? t(E, <>What if we skip the <b style={NW}>−1</b>? Then we'd count "make all <b style={{color:RED,...NW}}>4 red</b> the expensive way" = <b style={NW}>2 swaps = 6 chips</b>. But <b style={NW}>5 chips</b> already worked. <b>6 is not the fewest → wrong.</b></>,
                              <><b style={NW}>−1</b> 을 빼먹으면? <b style={{color:RED,...NW}}>A 4개</b>가 다 채워질 때까지 세게 돼요.<br />= 바꾸기 2번 = <b style={NW}>칩 6개</b>.<br />그런데 <b style={NW}>칩 5개</b>면 이미 됐잖아요 — <b>6은 최소가 아니라 오답이에요.</b></>)
  : s.k === "whenSame" ? t(E, <>But if I needed <b style={{color:RED,...NW}}>3 red</b>, both give <b style={NW}>4 chips</b> — the same! The last red arrives as <b style={{color:RED,...NW}}>one red chip</b>, so removing it and adding 1 back costs the same.<br /><b>It only splits when the red I need is a multiple of 2.</b></>,
                              <>그런데 <b style={{color:RED,...NW}}>A 3개</b>가 필요했다면 둘 다 <b style={NW}>칩 4개</b> — 똑같아요!<br />마지막 A가 <b style={{color:RED,...NW}}>A칩 하나</b>로 오니까,<br />하나 빼고 다시 하나 더하면 같은 칩 수거든요.<br /><b>필요한 A가 2의 배수일 때만 갈려요.</b></>)
  : s.k === "sym" ? t(E, <>The same two numbers, written with letters.</>, <>방금 그 두 숫자를 글자로 쓴 것뿐이에요.</>)
  : t(E, <>Appendix — the official analysis writes the same thing with inequalities.</>,
         <>부록 — 공식 풀이는 같은 얘기를 부등식으로 씁니다. 답은 똑같아요.</>);

  /* A 게이지 — 3 = 목표보다 하나 모자란 A, 4 = 내 목표 */
  const Gauge = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
      {[1, 2, 3, 4].map((n) => {
        const on = myRed >= n, isGoal = n === GOAL, isLine = n === LINE;
        return (
          <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 10, fontWeight: 800, height: 13,
              color: isGoal ? "#15803d" : isLine ? "#b45309" : "transparent" }}>
              {isGoal ? t(E, "my goal", "내 목표") : isLine ? t(E, "one short", "하나 모자람") : "·"}
            </span>
            <Chip color="red" size={26} faded={!on} />
            <div style={{ width: 26, height: 3, borderRadius: 2,
              background: isGoal ? "#15803d" : isLine ? "#f59e0b" : "transparent" }} />
          </div>
        );
      })}
    </div>
  );

  /* 받은 칩 → 내 A. 장부 없이 두 줄로. (선생님: "그냥 보여주면 되는걸") */
  const Convert = ({ b, r }) => {
    const tot = LAID + b, g = Math.floor(tot / CB), left = tot % CB, red = g * CA + r;
    const Row = ({ label, children }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", padding: "5px 0" }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", width: 62, textAlign: "right", flexShrink: 0 }}>{label}</span>
        {children}
      </div>
    );
    return (
      <div style={{ maxWidth: 470, margin: "0 auto 8px", padding: "8px 12px", borderRadius: 10,
        border: "1px solid #e2e8f0", background: "#fff" }}>
        {/* 1. 받은 것 (깔린 B 2개 포함) */}
        <Row label={t(E, "I got", "받은 칩")}>
          <span style={{ display: "inline-flex", gap: 3, padding: "2px 4px", borderRadius: 7,
            border: "1.5px dashed #dc2626", background: "#fff5f5" }}>
            {Array.from({ length: LAID }).map((_, i) => <Chip key={"l" + i} color="blue" size={17} />)}
          </span>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8" }}>+</span>
          <span style={{ display: "inline-flex", gap: 3 }}>
            {Array.from({ length: b }).map((_, i) => <Chip key={"b" + i} color="blue" size={20} />)}
            {Array.from({ length: r }).map((_, i) => <Chip key={"r" + i} color="red" size={20} />)}
          </span>
        </Row>
        {/* 2. 결과 — 묶음은 박스로, 남은 B는 흐리게, A칩은 그대로 */}
        {showResult && (
          <Row label={t(E, "my red", "내 A")}>
            {Array.from({ length: g }).map((_, i) => (
              <span key={"g" + i} style={{ display: "inline-flex", alignItems: "center", gap: 4,
                padding: "2px 5px", borderRadius: 8, border: `1.5px dashed ${BLU}`, background: "#f8fbff" }}>
                {Array.from({ length: CB }).map((_, k) => <Chip key={k} color="blue" size={14} faded />)}
                <span style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8" }}>→</span>
                {Array.from({ length: CA }).map((_, k) => <Chip key={"o" + k} color="red" size={19} />)}
              </span>
            ))}
            {Array.from({ length: r }).map((_, k) => <Chip key={"rr" + k} color="red" size={19} />)}
            {left > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 2, opacity: 0.35 }}>
                {Array.from({ length: left }).map((_, k) => <Chip key={k} color="blue" size={14} />)}
              </span>
            )}
            <span style={{ fontSize: 13, fontWeight: 800, color: red >= GOAL ? "#15803d" : "#b45309", marginLeft: 2 }}>
              = {t(E, `${red} red`, `A ${red}개`)}
            </span>
          </Row>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why minus 1, and why plus 1?", "왜 −1 이고, 왜 +1 일까요?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "plus" || s.k === "sym" ? "aha" : s.k === "why3" || s.k === "give5" ? "go" : "stuck"}>{say}</Say>

      {s.k !== "sym" && s.k !== "whenSame" && s.k !== "math" && <Gauge />}
      {HAND && <Convert b={HAND[0]} r={HAND[1]} />}

      {s.k === "line"   && <Cap color="#b45309">{t(E, "one short of the goal = 4 − 1 = 3", "하나 모자란 A = 4 − 1 = 3")}</Cap>}
      {s.k === "count4" && <Cap color="#b45309">{t(E, "4 chips can leave me at red 3", "칩 4개 → A가 3개인 경우가 있어요")}</Cap>}
      {s.k === "why3"   && <Cap color="#dc2626">{t(E, "4 blue → red 4 · not the worst", "B 4개 → A 4개 · 제일 나쁜 경우가 아님")}</Cap>}
      {s.k === "give5"  && <Cap color="#15803d">{t(E, "5 chips → red 4 every time", "칩 5개 → 어떻게 와도 A 4개")}</Cap>}
      {s.k === "plus"   && <Cap color="#15803d">{t(E, "answer = 4 + 1 = 5 chips", "답 = 4 + 1 = 칩 5개")}</Cap>}
      {s.k === "noMinus" && <Cap color="#dc2626">{t(E, "no −1 → 6 chips · but 5 already works", "−1 안 하면 칩 6개 · 그런데 5개면 이미 돼요")}</Cap>}
      {s.k === "whenSame" && (
        <div style={{ maxWidth: 420, margin: "0 auto", border: "1.5px solid #cbd5e1", borderRadius: 10, background: "#fff", padding: "9px 11px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 8px", fontSize: 11.5, textAlign: "center" }}>
            <div style={{ fontWeight: 800, color: "#64748b", paddingBottom: 4 }}>{t(E, "red I need", "필요한 A")}</div>
            <div style={{ fontWeight: 800, color: "#15803d", paddingBottom: 4 }}>{t(E, "with −1", "−1 함")}</div>
            <div style={{ fontWeight: 800, color: "#dc2626", paddingBottom: 4 }}>{t(E, "without −1", "−1 안 함")}</div>
            {[[1,1,1],[2,2,3],[3,4,4],[4,5,6],[5,7,7],[6,8,9]].map(([m,w,wo]) => {
              const diff = w !== wo;
              return (
                <React.Fragment key={m}>
                  <div style={{ padding: "2px 0", fontWeight: 800, color: diff ? "#b45309" : "#94a3b8",
                    fontFamily: "'JetBrains Mono',monospace" }}>{m}{t(E, "", "개")}</div>
                  <div style={{ padding: "2px 0", fontWeight: 800, color: "#15803d", fontFamily: "'JetBrains Mono',monospace" }}>{w}</div>
                  <div style={{ padding: "2px 0", fontWeight: 800, color: diff ? "#dc2626" : "#94a3b8",
                    fontFamily: "'JetBrains Mono',monospace" }}>{wo}{diff ? " ✗" : ""}</div>
                </React.Fragment>
              );
            })}
          </div>
          <div style={{ marginTop: 7, paddingTop: 6, borderTop: "1px dashed #cbd5e1", fontSize: 11, fontWeight: 700,
            color: "#b45309", textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
            {t(E, "2, 4, 6 → different. 1, 3, 5 → same. That's why skipping the −1 sometimes still passes.",
                 "2·4·6 은 다르고, 1·3·5 는 같아요. 그래서 −1 을 빼먹어도 가끔 통과되는 거예요.")}
          </div>
        </div>
      )}

      {s.k === "sym" && (
        <div style={{ maxWidth: 460, margin: "0 auto", padding: "12px 14px", borderRadius: 10,
          background: "#f5f3ff", border: "1.5px solid #c4b5fd", display: "grid", gap: 9,
          fontSize: 12, color: "#475569", lineHeight: 1.7, wordBreak: "keep-all" }}>
          <div>
            <code style={{ color: "#5b21b6", fontWeight: 800, fontSize: 12.5 }}>short_red = fA − 1 − red_now</code>
            <span style={{ color: "#94a3b8" }}> = 4 − 1 = 3</span><br />
            <span style={{ fontSize: 11.5, color: "#64748b" }}>{t(E, "one short of the goal — the −1", "목표보다 하나 모자란 A — 여기가 −1")}</span>
          </div>
          <div>
            <code style={{ color: "#5b21b6", fontWeight: 800, fontSize: 12.5 }}>short_chips = 3 // 2 × 3 + 3 % 2</code>
            <span style={{ color: "#94a3b8" }}> = 3 + 1 = 4</span><br />
            <span style={{ fontSize: 11.5, color: "#64748b" }}>
              {t(E, <>chips to make those 3 red: <b>3//2 = 1</b> swap (blue 3) + <b>3%2 = 1</b> red chip</>,
                   <>A 3개를 만드는 데 드는 칩: 바꾸기 <b>3//2 = 1</b>번(B 3개) + A칩 <b>3%2 = 1</b>개</>)}
            </span>
          </div>
          <div>
            <code style={{ color: "#5b21b6", fontWeight: 800, fontSize: 12.5 }}>answer = wasted_blue + short_chips + 1</code>
            <span style={{ color: "#94a3b8" }}> = 4 + 1 = 5</span><br />
            <span style={{ fontSize: 11.5, color: "#64748b" }}>{t(E, "one more chip than that — the +1", "거기서 칩 하나 더 — 여기가 +1")}</span>
          </div>
        </div>
      )}

      {s.k === "math" && (
        <div style={{ maxWidth: 500, margin: "0 auto", display: "grid", gap: 9,
          fontSize: 12, color: "#334155", lineHeight: 1.8, wordBreak: "keep-all" }}>
          <div style={{ padding: "9px 12px", borderRadius: 9, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
            {t(E, <>Say I receive <b>n<sub>A</sub></b> chips of type A and <b>n<sub>B</sub></b> of type B. I <b>still fall short</b> exactly when</>,
                  <>A 칩을 <b>n<sub>A</sub></b>개, B 칩을 <b>n<sub>B</sub></b>개 받았다고 해요. <b>아직 모자란</b> 경우는 정확히 이때예요:</>)}
            <div style={{ textAlign: "center", padding: "8px 0 2px", fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12.5, fontWeight: 800, color: "#5b21b6" }}>
              ⌊(B + n<sub>B</sub>) / c<sub>B</sub>⌋ · c<sub>A</sub> + (A + n<sub>A</sub>) &lt; f<sub>A</sub>
            </div>
          </div>
          <div style={{ padding: "9px 12px", borderRadius: 9, background: "#fffbeb", border: "1.5px solid #fbbf24", color: "#92400e" }}>
            {t(E, <><b>y</b> = the largest <b>n<sub>A</sub> + n<sub>B</sub></b> among all pairs that still fall short. Such a pair always exists — <b>(0, 0)</b> is one, since we already know red_now &lt; f<sub>A</sub>. The answer is <b>y + 1</b> — that is the +1.</>,
                  <><b>y</b> = 아직 모자란 짝들 중 <b>n<sub>A</sub> + n<sub>B</sub></b> 가 제일 큰 값. 그런 짝은 반드시 있어요 — <b>(0, 0)</b> 이 그 하나거든요 (여기까지 왔다는 건 red_now &lt; f<sub>A</sub> 라는 뜻이니까). 답은 <b>y + 1</b> — 이게 그 +1 이에요.</>)}
          </div>
          <div style={{ padding: "9px 12px", borderRadius: 9, background: "#eff6ff", border: "1px solid #93c5fd", color: "#1e40af" }}>
            {t(E, <>At that largest pair the leftover must be maxed: <b>B + n<sub>B</sub> ≡ c<sub>B</sub> − 1 (mod c<sub>B</sub>)</b> — otherwise one more B chip would give a bigger sum that still falls short. So <b>n<sub>B,0</sub> = c<sub>B</sub> − 1 − (B mod c<sub>B</sub>)</b> = our <code>wasted_blue</code>.</>,
                  <>그 최대 짝에서는 자투리가 꽉 차 있어야 해요: <b>B + n<sub>B</sub> ≡ c<sub>B</sub> − 1 (mod c<sub>B</sub>)</b> — 안 그러면 B 를 하나 더 받아도 여전히 모자라서 합이 더 커지거든요. 그래서 <b>n<sub>B,0</sub> = c<sub>B</sub> − 1 − (B mod c<sub>B</sub>)</b>, 우리 코드의 <code>wasted_blue</code> 예요.</>)}
          </div>
          <div style={{ padding: "9px 12px", borderRadius: 9, background: "#f0fdf4", border: "1px solid #86efac", color: "#166534" }}>
            {t(E, <>And <b>n<sub>A,0</sub> = f<sub>A</sub> − 1 − red_now</b> = our <code>short_red</code> — the <b>− 1</b>. With <b>n<sub>B</sub> = n<sub>B,0</sub> + i·c<sub>B</sub></b> we get <b>n<sub>A</sub> = n<sub>A,0</sub> − c<sub>A</sub>·i</b>, so the sum is largest at <b>i = 0</b> when c<sub>A</sub> ≥ c<sub>B</sub>, else at <b>i = ⌊n<sub>A,0</sub> / c<sub>A</sub>⌋</b> — exactly our two branches.</>,
                  <>그리고 <b>n<sub>A,0</sub> = f<sub>A</sub> − 1 − red_now</b>, 우리 코드의 <code>short_red</code> 예요 — 이게 <b>− 1</b>. <b>n<sub>B</sub> = n<sub>B,0</sub> + i·c<sub>B</sub></b> 로 두면 <b>n<sub>A</sub> = n<sub>A,0</sub> − c<sub>A</sub>·i</b> 가 되고, 합이 최대가 되는 건 c<sub>A</sub> ≥ c<sub>B</sub> 일 때 <b>i = 0</b>, 아니면 <b>i = ⌊n<sub>A,0</sub> / c<sub>A</sub>⌋</b> — 우리 코드의 두 갈래 그대로예요.</>)}
          </div>
          <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center" }}>
            {t(E, "— from the official USACO analysis (Benjamin Qi)", "— USACO 공식 풀이 (Benjamin Qi) 의 유도")}
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
