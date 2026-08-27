// Chip Exchange (Dec 2025 Bronze #1) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
// 건드리지 않고 여기에만 (mooin3 / photoshoot25 와 같은 방식).
//
// 원칙: 학생 목소리(해요체), 관찰→추론, 시뮬로 개념. 색: 빨강=A칩, 파랑=B칩.
//   ① ChipCountSim — 최종 A = A + (B // cB) × cA (묶음/자투리 시각)
//   ② AdversarySim — 심술쟁이가 파랑에 몰아 자투리 낭비 → 최악 분배

import React from "react";
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
        title={t(E, "How many red chips do I end with?", "빨강 칩은 몇 개가 될까요?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
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
      {s.kind === "group" && <Cap color={BLU}>{t(E, "2 groups + 1 leftover", "파랑 7개 = 묶음 2개 + 자투리 1개")}</Cap>}
      {s.kind === "convert" && <Cap color={RED}>{t(E, "2 groups → +4 red · leftover stuck", "묶음 2개를 바꿔서 빨강이 4개 늘었어요. 자투리 1개는 못 바꿔요.")}</Cap>}
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
/* ═══════════════════════════════════════════════════════════════
   TricksterWaseSim — 심술쟁이가 추가 칩을 '색칠'(다 파랑) → 자투리 버림 = 최악.
   슬라이드/분배 없음. 색 미정 → 다 파랑 → 묶기 → 자투리 낭비 → 최악.
   ═══════════════════════════════════════════════════════════════ */
export function TricksterWasteSim({ E }) {
  const cB = 3, cA = 2, X = 8;
  const groups = Math.floor(X / cB), left = X % cB, redFromSwap = groups * cA;
  const steps = [{ k: "give" }, { k: "allblue" }, { k: "group" }, { k: "waste" }, { k: "worst" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  const showGroups = s.k === "group" || s.k === "waste" || s.k === "worst";
  const wasted = s.k === "waste" || s.k === "worst";

  const say =
    s.k === "give"    ? t(E, <>Short of the goal, so I get <b>extra chips</b> — but the <b style={{color:"#dc2626"}}>trickster picks each color</b> (red or blue).</>,
                           <>목표에 부족해서 <b>추가 칩</b>을 받아요 — 근데 <b style={{color:"#dc2626"}}>색(빨강·파랑)은 심술쟁이가 정해요</b>.</>)
    : s.k === "allblue" ? t(E, <>The trickster makes them <b style={{color:BLU}}>all blue</b> — blue needs 3 to convert, so it helps me the least.</>,
                           <>심술쟁이는 <b style={{color:BLU}}>전부 파랑</b>으로 색칠해요 — 파랑은 3개 모여야 빨강 되니, 나한텐 제일 손해거든요.</>)
    : s.k === "group" ? t(E, <>Group the blue by 3 and swap: <span style={NW}><b>8 = 2 groups</b></span> → <b style={{color:RED}}>+4 red</b>. And what's left?</>,
                           <>파랑을 <b>3개씩</b> 묶어 환전: <span style={NW}><b>8 = 2묶음</b></span> → <b style={{color:RED}}>빨강 4개</b>. 남은 건?</>)
    : s.k === "waste" ? t(E, <>The leftover <b style={{color:BLU}}>2 blue</b> can't make a group of 3 → <b style={{color:"#dc2626"}}>wasted</b>. That leftover is the 자투리.</>,
                           <>남은 <b style={{color:BLU}}>파랑 2개</b>는 3개가 안 돼서 못 묶어요 → <b style={{color:"#dc2626"}}>그냥 버려져요</b>. 이 남는 게 자투리예요.</>)
    : t(E, <><b>8 chips, but only 4 red!</b> The trickster piles blue and <b>wastes the leftover</b> — that's my worst case.</>,
           <><b>8개나 받아도 빨강은 4개뿐!</b> 심술쟁이는 파랑에 몰아 <b>자투리를 버리게</b> 해서 나를 최악으로 만들어요.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "3 blue in → 2 red out: swapping LOSES (cA < cB)", "파랑 3개 내면 → 빨강 2개: 바꾸면 손해 (cA < cB)")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, wordBreak: "keep-all" }}>
        {t(E, "extra chips = 8 · swap: 3 blue → 2 red", "추가 칩 = 8개 · 환전: 파랑 3 → 빨강 2")}
      </div>
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
            ? t(E, "2 groups → 4 red · 2 wasted → only 4 red", "묶음 2개로 빨강 4개. 자투리 파랑 2개는 버려져서 빨강은 4개뿐이에요.")
            : t(E, "2 groups → 4 red · 2 blue left over", "묶음 2개로 빨강 4개. 파랑 2개가 남아요.")}
        </Cap>
      )}

      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TricksterRedSim — 환전이 이득(cA ≥ cB)일 땐 심술쟁이가 '빨강'을 줌 (파랑 아님).
   파랑을 주면 오히려 이득이라, 빨강 1개씩 줘서 덜 도와줌. (공식의 cA≥cB 가지)
   ═══════════════════════════════════════════════════════════════ */
export function TricksterRedSim({ E }) {
  const steps = [{ k: "rule" }, { k: "bluegood" }, { k: "givered" }, { k: "concl" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  const say =
    s.k === "rule"    ? t(E, <>A different swap this time — <span style={NW}><b style={{color:BLU}}>2 blue</b> → <b style={{color:RED}}>3 red</b></span>. Here converting <b>gains</b> red!</>,
                           <>이번엔 환전이 달라요 — <span style={NW}><b style={{color:BLU}}>파랑 2개</b> → <b style={{color:RED}}>빨강 3개</b></span>. 환전하면 오히려 <b>이득</b>이에요!</>)
    : s.k === "bluegood" ? t(E, <>If the trickster gave me <b style={{color:BLU}}>blue</b>, I'd <b>gain</b> (2 → 3 red). No way it does that.</>,
                           <>심술쟁이가 <b style={{color:BLU}}>파랑</b>을 주면 나한텐 <b>이득</b> (2 → 3). 심술쟁이가 그럴 리 없죠.</>)
    : s.k === "givered" ? t(E, <>So it gives <b style={{color:RED}}>red, 1 at a time</b> — one red chip is just one red, the <b>least help</b>.</>,
                           <>그래서 <b style={{color:RED}}>빨강을 1개씩</b>만 줘요 — 빨강 1개는 딱 1개, 나를 <b>제일 덜</b> 도와주니까.</>)
    : t(E, <>So when swapping <b>pays</b> (cA ≥ cB) → the extra chips are <b style={{color:RED}}>all red</b>, no waste. <span style={{color:"#94a3b8"}}>(when it loses → all blue + waste, the step before)</span></>,
           <>환전이 <b>이득</b>(cA ≥ cB)이면 → 추가 칩은 <b style={{color:RED}}>다 빨강</b>, 낭비 없음. <span style={{color:"#94a3b8"}}>(손해면 반대 = 파랑 낭비, 앞 스텝)</span></>);

  const showRed = s.k === "givered" || s.k === "concl";

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "2 blue in → 3 red out: swapping GAINS (cA ≥ cB)", "파랑 2개 내면 → 빨강 3개: 바꾸면 이득 (cA ≥ cB)")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, wordBreak: "keep-all" }}>
        {t(E, "this example · swap: 2 blue → 3 red (cA ≥ cB)", "이 예시 · 환전: 파랑 2 → 빨강 3 (cA ≥ cB)")}
      </div>
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
            <span style={{ fontSize: 11.5, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "all red, 1 each", "전부 빨강으로 줘요 — 칩 1개당 빨강 1개")}</span>
          </>
        )}
      </div>

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
      ? t(E, <>How does the trickster split the extra chips? Say <b style={NW}>8 chips</b>. Slide <b>b</b> (blue) up — the more blue, the worse for me.</>,
             <>심술쟁이는 추가 칩을 어떻게 나눌까? 예로 <b style={NW}>8개</b>. 아래 <b>b</b>(파랑)를 늘려봐요 — 파랑에 몰수록 나한텐 나빠져요.</>)
      : isLast
      ? t(E, <><b style={NW}>b=8 (all blue):</b> <span style={NW}>2 groups → +4 red</span>, but <span style={NW}><b style={{color:"#dc2626"}}>2 blue wasted</b></span> → <b style={{color:"#dc2626",...NW}}>final 4</b> (the lowest). <b>The trickster piles blue and wastes the leftover.</b></>,
             <><b style={NW}>b=8 (다 파랑):</b> <span style={NW}>묶음 2 → +빨강 4</span>, 근데 <span style={NW}><b style={{color:"#dc2626"}}>파랑 2개 버림</b></span> → <b style={{color:"#dc2626",...NW}}>최종 4</b> (최저). <b>심술쟁이는 파랑에 몰아 자투리를 버려요.</b></>)
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
              {isLast && <> {worstSoFar >= fA ? `≥ ${fA} ✓` : `< ${fA} ` + t(E, "(trickster's worst)", "(심술쟁이 최악)")}</>}
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
  const cB = 3, X = 8, target = cB - 1;   // 최대 자투리 = cB−1 = 2
  const steps = [
    { kind: "anchor" }, { kind: "formula" }, { kind: "whyB" },
    { kind: "wrap" }, { kind: "largest" }, { kind: "codemap" },
  ];
  const ts = useTraceStep(steps); const s = steps[ts.safe];

  // 트레이 상태: whyB 만 시작 파랑 4개 예시, 나머지는 샘플(시작 0)
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
             <>최악만 막으면 나머지는 저절로 풀려요. 최악 = <b style={{color:"#dc2626"}}>파랑 자투리</b>(3개로 못 묶어 버리는 나머지)<b>가 가장 많을 때</b> — <span style={NW}>최대 <b>cB−1 = 2</b>개</span>. 그걸 만드는 <b>b</b>를 공식으로 구해요.</>)
    : s.kind === "formula"
      ? t(E, <>Leftover = <span style={NW}>(total blue) mod cB</span>. To make it <b>2</b>: start blue is 0, so <span style={NW}>now-leftover <b>0</b></span> → give <span style={NW}><b>2 − 0 = 2</b></span>. That b is <b style={{color:"#2563eb"}}>r1</b>.</>,
             <>자투리 = <span style={NW}>(총 파랑) ÷ cB 나머지</span>. 이걸 <b>목표 2</b>로? 시작 파랑 0이라 <span style={NW}>지금 자투리 <b>0</b></span> → <span style={NW}><b>2 − 0 = 2</b>개</span> 주면 돼요. 이 b가 <b style={{color:"#2563eb"}}>r1</b>.</>)
    : s.kind === "whyB"
      ? t(E, <><b>What if start blue isn't 0?</b> Say <b>4</b>: <span style={NW}>4 = 3 + 1</span> → <span style={NW}>now-leftover <b>1</b></span>. To goal 2, only <span style={NW}><b>2 − 1 = 1</b></span>! <span style={NW}>→ that's the <b>− B%cB</b></span>.</>,
             <><b>시작 파랑이 0이 아니면?</b> 예로 <b>4개</b>: <span style={NW}>4 = 3 + 1</span> → <span style={NW}>지금 자투리 <b>1</b></span>. 목표 2까지 <span style={NW}><b>2 − 1 = 1</b></span>개만! <span style={NW}>→ 이게 <b>− B%cB</b></span> 예요.</>)
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
        {t(E, "leftover = total blue mod cB(3) · max = cB−1 = 2", "자투리 = 총 파랑을 cB(3)로 나눈 나머지 · 최대 = cB−1 = 2")}
      </div>
      <Say tone={hit ? "aha" : s.kind === "anchor" || s.kind === "wrap" ? "stuck" : "go"}>{say}</Say>

      {showTray && (
        <>
          {s.kind === "whyB" && (
            <div style={{ textAlign: "center", fontSize: 11, fontWeight: 800, color: "#b45309", marginBottom: 4, wordBreak: "keep-all" }}>
              {t(E, "side example — start blue = 4", "다른 예 — 시작 파랑 = 4")}
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
            {t(E, "Our sample: start blue 0 → r1 = 2 → b = 8.", "우리 샘플: 시작 파랑 0 → r1 = 2 → b = 8.")}
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
             <>브루트는 <b>b 를 0~8 전부</b> 쟀어요. <b>최악</b> <span style={NW}>(내 빨강 최소)</span>은 <b style={{color:"#dc2626"}}>4</b>, <span style={NW}>b=8 에서</span> <span style={NW}>(다 파랑, 자투리 버림)</span>.</>)
      : t(E, <>If <span style={NW}>x is huge</span> we can't try every b. So the code checks only <b>a few likely spots</b> and gets the same <b style={{color:"#dc2626"}}>4</b> — no loop, <b>O(1)</b>.</>,
             <><span style={NW}>x 가 크면</span> b 를 전부는 못 재요. 그래서 코드는 <b>최악 될 만한 몇 군데</b>만 재서 똑같이 <b style={{color:"#dc2626"}}>4</b> 를 구해요 — 반복 없이 <b>O(1)</b>.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Brute → a few smart spots", "브루트 → 몇 군데만")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, wordBreak: "keep-all", lineHeight: 1.5 }}>
        {t(E, "x=8 · each cell = my final red for that split · trickster wants the smallest", "x=8 · 칸 = 그 분배일 때 내 최종 빨강 · 심술쟁이는 최소를 노림")}
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
              <span style={{ fontSize: 10.5, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "1 blue — can't swap (needs 3)", "파랑이 1개뿐이라 못 바꿔요 (3개 있어야 해요)")}</span>
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: "#dc2626", fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "red still 4 ✗", "빨강은 4개 그대로 — 목표 5에 못 미쳐요 ✗")}</span>
          </div>
        )}

        {/* ask — 그럼 몇 개나? 색·개수 미정 → 회색 ? 칩 */}
        {s.kind === "ask" && (
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px dashed #e2e8f0", display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ fontSize: 28 }}>😈</div>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#dc2626", wordBreak: "keep-all" }}>{t(E, "the trickster hands me extra chips —", "심술쟁이가 추가 칩을 줘요 —")}</span>
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
        title={t(E, "Quick check — did I get it?", "잠깐 확인 — 제대로 이해했나요?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "reveal" ? "aha" : "go"}>
        {s.kind === "ask"
          ? t(E, <>What number do we actually <b>print</b> for each test? Pick one, then flip.</>,
                 <>각 테스트에서 우리가 실제로 <b>출력</b>하는 숫자는 뭘까요? 하나 고르고 넘겨봐요.</>)
          : t(E, <>It's <b>B</b> — the fewest extra chips so that <b>however the trickster colors them</b>, we still reach the goal. (Not the final red count!)</>,
                 <>정답은 <b>B</b> — <b>심술쟁이가 어떻게 색칠해도</b> 목표를 채우는 가장 적은 추가 칩 개수예요. (최종 빨강 개수가 아니에요!)</>)}
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
        title={t(E, "How will we solve it?", "어떻게 풀까요?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say>
        {s.kind === "plan"
          ? t(E, <>No search needed — we <b>compute the answer directly</b>. It splits into two cases.</>,
                 <>탐색 필요 없어요 — 답을 <b>바로 계산</b>해요. 두 경우로 갈려요.</>)
          : t(E, <>Just <b>two cases</b>:</>, <>딱 <b>두 경우</b>예요:</>)}
      </Say>
      {s.kind === "plan" ? (
        <div style={{ maxWidth: 470, margin: "0 auto" }}>
          <Slab n="1" color="#15803d" bg="#f0fdf4">{t(E, <>How many red can I make <b>right now</b> (convert my blue)? Call it <b>red_now</b>.</>, <>지금 가진 걸로 빨강 몇 개(내 파랑 환전)? 이걸 <b>red_now</b> 라 해요.</>)}</Slab>
          <Slab n="2" color="#2563eb" bg="#eff6ff">{t(E, <>If <b>init &lt; goal</b>, count the fewest extra chips — assuming the <b>trickster colors them worst</b>.</>, <><b>init 이 목표보다 작으면</b>, 심술쟁이가 <b>최악으로 색칠할 때</b> 필요한 최소 추가 칩을 세요.</>)}</Slab>
        </div>
      ) : (
        <div style={{ maxWidth: 470, margin: "0 auto" }}>
          <Slab n="①" color="#15803d" bg="#f0fdf4" title={t(E, "red_now ≥ goal", "red_now ≥ 목표")}>
            {t(E, "→ already there, the answer is 0.", "→ 이미 목표에 닿았으니 답은 0이에요.")}
          </Slab>
          <Slab n="②" color="#2563eb" bg="#eff6ff" title={t(E, "red_now < goal", "red_now < 목표")}>
            {t(E, "→ count the extra chips with a few lines of arithmetic (next tools). No search, no loop.", "→ 추가 칩이 몇 개인지 산수 몇 줄로 바로 셀 수 있어요 (다음 도구들). 하나씩 넣어보며 찾지 않아도 돼요.")}
          </Slab>
        </div>
      )}
      <div style={{ marginTop: 24 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ 도구 ④ — 마지막 빨강은 묶음(손해) 말고 낱개로 (경우 ② 의 근거) ═══
   선생님 2026-08-26: −1/+1 트릭은 "뭔말인지는 알겠지만 이해가 안가" → if/elif/else 로 확정.
   이 페이지는 elif (묶음으로 딱 떨어질 때) 가 왜 묶음 하나를 빼는지:
   낱개 빨강 = 칩 1개 < 묶음 (칩 cB개에 빨강 cA개) → 마지막 묶음 대신 낱개 cA개.
   예: 빨강 4개 필요 → 묶음 2개 통째 = 칩 6 vs 묶음1+낱개2 = 칩 5 ✓ */
/* ═══ 도구 ④ 공용 — 깔린 파랑 2개 상태에서 칩 x개를 심술쟁이가 색칠 ═══ */
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

/* ═══ 도구 ④-1 (관찰) — 칩 몇 개면 심술쟁이가 못 막나? ═══ */
export function LastOneWhySlide({ E }) {
  const AllColorings = ({ x }) => {
    const { rs, min } = t4Rows(x);
    const ok = min >= T4.GOAL;
    return (
      <div style={{ border: `${ok ? 2 : 1.5}px solid ${ok ? "#15803d" : "#fca5a5"}`, borderRadius: 10,
        background: ok ? "#f0fdf4" : "#fef2f2", padding: "9px 11px", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5, flexWrap: "wrap", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#334155" }}>
            {t(E, `Get ${x} chips — all ${rs.length} colorings`, `칩 ${x}개 — 색칠 ${rs.length}가지 전부`)}
          </span>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: ok ? "#15803d" : "#dc2626" }}>
            {t(E, `worst = red ${min}`, `최악 = 빨강 ${min}`)} {ok ? "✓" : "✗"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 7px 3px", fontSize: 9.5, fontWeight: 800, color: "#94a3b8" }}>
          <span style={{ minWidth: 150 }}>
            <span style={{ color: "#dc2626" }}>{t(E, "already laid", "깔림")}</span>{" + "}{t(E, "what I got", "받은 것")}
          </span>
          <span style={{ flex: 1 }}>{t(E, "total blue → groups", "총 파랑 → 묶음")}</span>
        </div>
        <div style={{ display: "grid", gap: 2 }}>
          {rs.map((o, i) => {
            const worst = o.v === min;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "2px 7px", borderRadius: 6,
                background: worst ? "#fff" : "transparent",
                border: `1px solid ${worst ? (ok ? "#15803d" : "#dc2626") : "transparent"}`,
                fontSize: 10.5, fontWeight: 700, color: "#475569", wordBreak: "keep-all" }}>
                <span style={{ minWidth: 150 }}><T4Piles r={o.r} b={o.b} sz={13} /></span>
                <span style={{ flex: 1, fontFamily: "'JetBrains Mono',monospace" }}>
                  {t(E, `blue ${T4.LAID}+${o.b}=${o.tot} → ${o.g} grp`, `파랑 ${T4.LAID}+${o.b}=${o.tot} → 묶음 ${o.g}`)}
                </span>
                <span style={{ fontWeight: 800, color: worst ? (ok ? "#15803d" : "#dc2626") : "#94a3b8", flexShrink: 0 }}>
                  {t(E, `red ${o.v}`, `빨강 ${o.v}`)}
                </span>
                <span style={{ width: 58, textAlign: "right", flexShrink: 0, color: ok ? "#15803d" : "#dc2626" }}>
                  {worst ? t(E, "← worst", "← 제일 나쁨") : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 16, maxWidth: 560, margin: "0 auto", fontSize: 12.5, color: "#334155", lineHeight: 1.65, wordBreak: "keep-all" }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#7c3aed", textAlign: "center", marginBottom: 2 }}>
        📦 {t(E, "I need 4 more red — how many chips?", "빨강 4개가 더 필요해요 — 칩을 몇 개 받아야 할까요?")}
      </div>
      <div style={{ fontSize: 11.5, color: "#64748b", textAlign: "center", marginBottom: 12 }}>
        {t(E, "I pick the count. The trickster picks the colors.", "개수는 내가, 색은 심술쟁이가 정해요.")}
      </div>

      <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 8, padding: "8px 11px",
        marginBottom: 10, fontSize: 12, color: "#92400e", lineHeight: 1.65 }}>
        {t(E,
          <>"Just take 4 red chips = 4 chips!" — that would be best. But <b>the trickster picks the colors</b>, so it hands red as little as it can.</>,
          <>"빨강 4개만 받으면 칩 4개로 끝이잖아!" — 그게 최고죠. 근데 <b>색은 심술쟁이가 정해요</b>. 빨강을 최대한 안 줍니다.</>)}
      </div>

      <div style={{ fontSize: 11.5, color: "#475569", marginBottom: 8 }}>
        <b style={{ color: "#dc2626" }}>{t(E, "From ② :", "앞의 도구 ② 에서 :")}</b>{" "}
        {t(E, "2 wasted blues are already sitting there — 1 short of a group of 3. They are the red-dashed pair at the start of every row below.",
             "버려진 파랑 2개가 이미 깔려 있어요 — 묶음 3개에 1개 모자란 상태. 아래 모든 줄 맨 앞의 빨간 점선이 그 2개예요.")}
      </div>

      <AllColorings x={4} />

      <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 8, padding: "8px 11px",
        marginBottom: 10, fontSize: 11.5, color: "#1e40af", lineHeight: 1.7 }}>
        {t(E,
          <><b>"Wouldn't all-blue be meanest?"</b> Look at the bottom row: <b>4 blue → 2+4 = 6 → 2 whole groups → red 4</b>. Too many blues <b>complete groups</b> and help me! So the trickster stops at <b>3 blue</b> (leftover 2, thrown away) and gives 1 red.</>,
          <><b>"파랑만 주는 게 제일 못된 거 아니야?"</b> 맨 아래 줄을 보세요: <b>파랑 4개 → 2+4 = 6 → 묶음 2개 완성 → 빨강 4</b>. 파랑을 많이 주면 <b>묶음이 완성돼</b> 오히려 나를 도와줘요! 그래서 심술쟁이는 <b>파랑 3개</b>만 주고 (자투리 2개 버려짐) 빨강 1개를 줘요.</>)}
      </div>

      <AllColorings x={5} />

      <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 8, padding: "9px 11px",
        fontSize: 12.5, fontWeight: 700, color: "#15803d", lineHeight: 1.7 }}>
        {t(E,
          <>4 chips — the trickster still holds me at 3. <b>From 5 chips it can't:</b> every coloring reaches 4.<br />
            <b style={{ fontSize: 13.5 }}>→ So the answer here is 5 chips. Next: turn that into a formula.</b></>,
          <>칩 4개까진 심술쟁이가 빨강 3개로 막아요. <b>5개부터는 못 막아요</b> — 어떤 색칠이든 4개가 돼요.<br />
            <b style={{ fontSize: 13.5 }}>→ 그래서 답은 칩 5개. 다음 페이지에서 이걸 식으로 바꿔요.</b></>)}
      </div>
    </div>
  );
}

/* ═══ 도구 ④-2 (유도) — 그 결과를 식으로. −1 을 뺐을 때와 대비해서 차이를 보임 ═══
   선생님 2026-08-26: "−1을 하지 않는 것과의 차이를 모르겠는데" → 6 vs 5 를 나란히. */
/* ═══════════════════════════════════════════════════════════════
   WhyMinusPlusSim — 왜 −1 이고 왜 +1 인가. 선생님 요청(2026-08-27)으로 시뮬로.
   −1 = 심술쟁이의 방어선(목표보다 하나 적은 빨강)
   +1 = 그 방어선을 지킬 수 있는 마지막 칩 수 다음 칩
   주장 전부 완전탐색으로 확인함: 칩4 최악=빨강3, 칩5 최악=빨강4,
   칩4 의 심술쟁이 최선 = 파랑3+빨강1 (파랑 4개면 묶음 2개 되어 자기 손해).
   ═══════════════════════════════════════════════════════════════ */
export function WhyMinusPlusSim({ E }) {
  const GOAL = 4, LINE = GOAL - 1, LAID = 2;
  const steps = [{ k: "line" }, { k: "four" }, { k: "five" }, { k: "plus" }, { k: "hold" }, { k: "sym" }];
  const ts = useTraceStep(steps); const s = steps[ts.safe];
  const myRed = s.k === "four" || s.k === "hold" ? 3 : s.k === "five" || s.k === "plus" ? 4 : 0;

  const say =
    s.k === "line" ? t(E, <>My goal is <b style={{color:RED,...NW}}>4 red</b>. So the trickster wins as long as it keeps me at <b style={NW}>3 or fewer</b>. <b style={NW}>3 = 4 − 1</b> — that's its line.</>,
                        <>내 목표는 <b style={{color:RED,...NW}}>빨강 4개</b>. 그러니까 심술쟁이는 나를 <b style={NW}>3개 이하</b>로만 붙잡아 두면 이겨요. <b style={NW}>3 = 4 − 1</b> — 이게 심술쟁이의 <b>방어선</b>이에요.</>)
  : s.k === "four" ? t(E, <>I hand over <b style={NW}>4 chips</b>. The trickster colours <b style={{color:BLU,...NW}}>3 blue</b> + <b style={{color:RED,...NW}}>1 red</b>: the blue makes <b style={NW}>one swap (red 2)</b>, plus the red chip → <b style={{color:RED,...NW}}>red 3</b>. <b>Line held.</b></>,
                          <>칩 <b style={NW}>4개</b>를 줬어요. 심술쟁이는 <b style={{color:BLU,...NW}}>파랑 3</b> + <b style={{color:RED,...NW}}>빨강 1</b> 로 칠해요. 파랑은 <b style={NW}>한 번 바꿔서 빨강 2개</b>, 거기에 빨강칩 1개 → <b style={{color:RED,...NW}}>빨강 3개</b>. <b>방어선 지킴.</b></>)
  : s.k === "five" ? t(E, <>Now <b style={NW}>5 chips</b>. On the previous page we checked <b>every</b> colouring of 5 — the smallest is <b style={{color:RED,...NW}}>red 4</b>. <b>The line breaks.</b></>,
                          <>이번엔 칩 <b style={NW}>5개</b>. 앞 페이지에서 5개의 색칠을 <b>전부</b> 확인했죠 — 제일 작은 게 <b style={{color:RED,...NW}}>빨강 4개</b>였어요. <b>방어선이 무너져요.</b></>)
  : s.k === "plus" ? t(E, <><b style={NW}>4 chips</b> — held. <b style={NW}>5 chips</b> — broken. So the answer is the last chip count it can hold, <b style={NW}>plus 1</b>. <b style={{color:"#15803d",...NW}}>4 + 1 = 5</b>.</>,
                          <>칩 <b style={NW}>4개</b> — 지켜냄. 칩 <b style={NW}>5개</b> — 무너짐. 그러니까 답은 심술쟁이가 지켜내는 <b>마지막 칩 수에 하나 더</b>. <b style={{color:"#15803d",...NW}}>4 + 1 = 5</b>.</>)
  : s.k === "hold" ? t(E, <>Where did that <b style={NW}>4</b> come from? To sit exactly on the line (<b style={NW}>red 3</b>) it uses <b style={{color:BLU,...NW}}>3 blue</b> (one swap → red 2) and <b style={{color:RED,...NW}}>1 red chip</b> (red 1). One more blue and a <b>second</b> swap would hand me 4 — so 3 blue is its limit. <b style={NW}>3 + 1 = 4 chips</b>.</>,
                          <>그 <b style={NW}>4</b>는 어디서 나왔을까요? 방어선(<b style={NW}>빨강 3</b>)에 딱 맞추려면 <b style={{color:BLU,...NW}}>파랑 3개</b>(한 번 바꿔 빨강 2)와 <b style={{color:RED,...NW}}>빨강칩 1개</b>(빨강 1)를 써요. 파랑을 하나 더 파랑으로 칠하면 <b>두 번째</b> 묶음이 생겨 나한테 빨강 4개를 줘버려요 — 그래서 파랑은 3개가 한계. <b style={NW}>3 + 1 = 칩 4개</b>.</>)
  : t(E, <>Same story with symbols — nothing new.</>, <>같은 이야기를 기호로 쓴 것뿐이에요.</>);

  /* 방어선 게이지 */
  const Gauge = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 5, marginBottom: 6, flexWrap: "wrap" }}>
      {Array.from({ length: GOAL + 1 }).slice(1).map((_, i) => {
        const n = i + 1, on = myRed >= n, isGoal = n === GOAL, isLine = n === LINE;
        return (
          <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 10, fontWeight: 800, height: 13,
              color: isGoal ? "#15803d" : isLine ? "#b45309" : "transparent" }}>
              {isGoal ? t(E, "goal", "목표") : isLine ? t(E, "line", "방어선") : "·"}
            </span>
            <Chip color="red" size={26} faded={!on} />
            <span style={{ fontSize: 9.5, fontWeight: 800, color: "#94a3b8" }}>{n}</span>
            <div style={{ width: 26, height: 3, borderRadius: 2,
              background: isGoal ? "#15803d" : isLine ? "#f59e0b" : "transparent" }} />
          </div>
        );
      })}
    </div>
  );

  const Hand = ({ b, r }) => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
      <span style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8", marginRight: 2 }}>{t(E, "already thrown away", "이미 버려진 파랑")}</span>
      <span style={{ display: "inline-flex", gap: 3, padding: "2px 4px", borderRadius: 7, border: "1.5px dashed #dc2626", background: "#fff5f5" }}>
        {Array.from({ length: LAID }).map((_, i) => <Chip key={"l" + i} color="blue" size={18} />)}
      </span>
      <span style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8" }}>+</span>
      <span style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8" }}>{t(E, "the chips I gave", "내가 준 칩")}</span>
      <span style={{ display: "inline-flex", gap: 3 }}>
        {Array.from({ length: b }).map((_, i) => <Chip key={"b" + i} color="blue" size={22} />)}
        {Array.from({ length: r }).map((_, i) => <Chip key={"r" + i} color="red" size={22} />)}
      </span>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why minus 1, and why plus 1?", "왜 −1 이고, 왜 +1 일까요?")} subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.k === "plus" || s.k === "sym" ? "aha" : s.k === "five" ? "go" : "stuck"}>{say}</Say>

      {s.k !== "sym" && <Gauge />}
      {(s.k === "four" || s.k === "hold") && <Hand b={3} r={1} />}
      {s.k === "five" && <Hand b={3} r={2} />}

      {s.k === "line" && <Cap color="#b45309">{t(E, "trickster's line = 4 − 1 = 3", "심술쟁이 방어선 = 4 − 1 = 3")}</Cap>}
      {s.k === "four" && <Cap color="#b45309">{t(E, "4 chips → red 3 · line held", "칩 4개 → 빨강 3 · 방어선 지킴")}</Cap>}
      {s.k === "five" && <Cap color="#15803d">{t(E, "5 chips → red 4 · line broken", "칩 5개 → 빨강 4 · 방어선 무너짐")}</Cap>}
      {s.k === "plus" && <Cap color="#15803d">{t(E, "answer = 4 + 1 = 5 chips", "답 = 4 + 1 = 칩 5개")}</Cap>}
      {s.k === "hold" && <Cap color="#b45309">{t(E, "blue 3 (red 2) + red chip 1 (red 1) = 4 chips", "파랑 3 (빨강 2) + 빨강칩 1 (빨강 1) = 칩 4개")}</Cap>}

      {s.k === "sym" && (
        <div style={{ maxWidth: 470, margin: "0 auto", padding: "12px 14px", borderRadius: 10,
          background: "#f5f3ff", border: "1.5px solid #c4b5fd", display: "grid", gap: 8,
          fontSize: 12, color: "#475569", lineHeight: 1.75, wordBreak: "keep-all" }}>
          <div>
            <code style={{ color: "#5b21b6", fontWeight: 800 }}>hold_red = missing − 1 = 3</code><br />
            <span style={{ fontSize: 11.5, color: "#64748b" }}>{t(E, "the trickster's line", "심술쟁이의 방어선")}</span>
          </div>
          <div>
            <code style={{ color: "#5b21b6", fontWeight: 800 }}>hold = 3 // 2 × 3 + 3 % 2 = 4</code><br />
            <span style={{ fontSize: 11.5, color: "#64748b" }}>
              {t(E, <>chips it needs to sit on the line: <b>3//2 = 1</b> swap (3 blue) + <b>3%2 = 1</b> red chip</>,
                   <>방어선에 딱 맞추는 데 드는 칩: 바꾸기 <b>3//2 = 1</b>번 (파랑 3개) + 빨강칩 <b>3%2 = 1</b>개</>)}
            </span>
          </div>
          <div>
            <code style={{ color: "#5b21b6", fontWeight: 800 }}>to_fill = hold + 1 = 5</code><br />
            <span style={{ fontSize: 11.5, color: "#64748b" }}>{t(E, "one chip past the line", "방어선을 넘기는 칩 하나 더")}</span>
          </div>
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
        {t(E, "We turn the formula into steps we can code.", "공식을 코드로 옮길 순서로 바꿔요.")}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <Slab n="1" color="#15803d" bg="#f0fdf4" title={<code>red_now = A + B//cB*cA</code>}>
          {t(E, <>red I can make now. If <b>red_now ≥ fA</b> → answer <b>0</b>.</>,
               <>지금 만드는 빨강. <b>red_now ≥ fA</b> 면 답 <b>0</b>.</>)}
        </Slab>
        <Slab n="2" color="#dc2626" bg="#fef2f2" title={<code>wasted_blue = cB−1 − B%cB</code>}>
          {t(E, <>the trickster wastes blue first (leftover cB−1).</>,
               <>심술쟁이가 먼저 파랑을 버림 (자투리 cB−1).</>)}
        </Slab>
        <Slab n="3" color="#2563eb" bg="#eff6ff" title={t(E, "how many are missing?", "빨강이 몇 개 모자랄까요?")}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#334155", wordBreak: "break-word" }}>
            missing = fA − red_now <span style={{ color: "#94a3b8" }}>{t(E, "  // goal − now", "  // 목표 − 지금")}</span>
          </div>
        </Slab>
        <Slab n="4" color="#7c3aed" bg="#f5f3ff" title={t(E, "who fills them? — two cases", "그 모자란 빨강은 누가 채워줄까요? — 경우 둘")}>
          <div style={{ display: "grid", gap: 3, fontSize: 11.5, lineHeight: 1.55 }}>
            <div>① {t(E, <><b>cA ≥ cB</b> (swap pays) → red, 1 each · <code>to_fill = missing</code></>,
                        <><b>cA ≥ cB</b> (환전 이득) → 빨강 1개씩 · <code>to_fill = missing</code></>)}</div>
            <div>② {t(E, <><b>cA &lt; cB</b> (swap loses) → it sends blue — count the chips it can hold out for (<code>hold</code>), then +1 <span style={{ color: "#7c3aed" }}>(why? → previous page)</span></>,
                        <><b>cA &lt; cB</b> (환전 손해) → 파랑 묶음으로 끌기, 묶음마다 칩 <code>cB−cA</code> 개 먹힘 <span style={{ color: "#7c3aed" }}>(왜? → 앞 페이지)</span></>)}</div>
            <div style={{ paddingLeft: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#5b21b6" }}>
              hold_red = missing − 1 · hold = hold_red//cA*cB + hold_red%cA · to_fill = hold + 1
            </div>
          </div>
          <div style={{ marginTop: 5, paddingTop: 5, borderTop: "1px dashed #c4b5fd", fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#334155" }}>
            {t(E, "answer = wasted_blue + to_fill", "답 = wasted_blue + to_fill")}
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
