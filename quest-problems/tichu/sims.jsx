// Tichu (MCC 2023 P4) 용 시뮬 — 시즌 표준 (photoshoot25 / cowsplits / chipxchg 와 같은 방식).
//
// 원칙 (quest_problem_standard + pain_points):
//   · 학생이 주인공 — 학생 목소리(해요체), 관찰 → 추론
//   · 진짜 문제: 수 카드 + 와일드(아무 수). 연속 수열(run)을 가장 길게.
//   · 시뮬: 수직선(값 칸) 위에서 창을 잡고, 빠진 칸을 와일드로 메꾸고, 남는 와일드로 양끝 확장.

import { t } from "@/components/quest/theme";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#dc2626";
const RED = "#dc2626", REDBG = "#fef2f2";
const WILD = "#8b5cf6", WILDBG = "#f5f3ff";

/* cowsplits/sims.jsx 에서 가져온 공용 조각 (Tile / Say / Row / Caption) */
function Tile({ ch, size = 42, bg = "#fff", bd = "#e2e8f0", fg = "#1f2937", faded = false }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center",
      justifyContent: "center", borderRadius: 9, background: bg, border: `2px solid ${bd}`,
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: size * 0.5, color: fg,
      opacity: faded ? 0.3 : 1, transition: "all .15s" }}>
      {ch}
    </div>
  );
}
function Say({ children, tone = "go" }) {
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#f5f3ff", bd: "#c4b5fd", fg: "#5b21b6" }
          : { bg: "#fef2f2", bd: "#fca5a5", fg: "#7f1d1d" };
  return (
    <div style={{ maxWidth: 540, margin: "6px auto 16px", padding: "12px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
      fontSize: 13.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
      {children}
    </div>
  );
}
function Row({ children }) {
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, flexWrap: "wrap" }}>{children}</div>;
}
function Caption({ color, children }) {
  return <div style={{ textAlign: "center", marginTop: 13, fontSize: 13.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace", wordBreak: "keep-all" }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   TichuSim — [빈칸을 와일드로] 진짜 문제의 핵심을 수직선으로.
   손패 값 2,3,4,5,7,8,11,15 (중복 3은 한 번만) · 와일드 2장.
   창 2~8 에서 빠진 6을 와일드로 → 남은 와일드로 9까지 확장 → run 길이 8.
   ═══════════════════════════════════════════════════════════════ */
export function TichuSim({ E }) {
  const LO = 1, HI = 16;                              // 수직선 범위
  const present = new Set([2, 3, 4, 5, 7, 8, 11, 15]); // 서로 다른 손패 값 (중복 3은 한 번)
  const K = 2;                                        // 와일드 수

  const steps = [
    { kind: "hand" },                                       // 손패 값 + 와일드
    { kind: "window", lo: 2, hi: 8, wild: [6] },            // 창 2~8, 빠진 6을 와일드로
    { kind: "extend", lo: 2, hi: 9, wild: [6, 9] },         // 남은 와일드로 9까지
    { kind: "done",   lo: 2, hi: 9, wild: [6, 9] },         // 정리: run = 8
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const lo = s.lo ?? null, hi = s.hi ?? null;
  const wildSet = new Set(s.wild || []);
  const usedWild = wildSet.size;
  const runLen = lo != null ? hi - lo + 1 : 0;

  const say =
    s.kind === "hand" ? t(E, <>My hand's values: <b>2 3 4 5 7 8 11 15</b> (a duplicate <b>3</b> counts once). Plus <b>2 wildcards</b> — each can become <b>any number</b>. Longest run of consecutive numbers I can build?</>,
                           <>손패의 값: <b>2 3 4 5 7 8 11 15</b> (중복 <b>3</b>은 한 번만). 그리고 <b>와일드 2장</b> — 각각 <b>아무 수</b>나 될 수 있어요. 연속된 수를 가장 길게 이으면?</>)
    : s.kind === "window" ? t(E, <>Take the window <b>2~8</b>. It's almost a run — only <b>6 is missing</b>. Spend <b>1 wildcard</b> to fill the 6 → now <b>2 3 4 5 6 7 8</b>, length <b>7</b>.</>,
                              <>창 <b>2~8</b>을 잡아봐요. 거의 연속인데 <b>6 하나만 빠졌어요</b>. <b>와일드 1장</b>으로 6을 메꾸면 → <b>2 3 4 5 6 7 8</b>, 길이 <b>7</b>.</>)
    : s.kind === "extend" ? t(E, <>I still have <b>1 wildcard</b> left. Stick it on the end as a <b>9</b> → <b>2 … 9</b>, length <b>8</b>! (An unused wildcard is never wasted — extend an end.)</>,
                               <>아직 <b>와일드 1장</b>이 남았죠. 끝에 붙여 <b>9</b>로 만들면 → <b>2 … 9</b>, 길이 <b>8</b>! (남는 와일드는 낭비 없이 양끝을 늘려요.)</>)
    : t(E, <>Longest run = <b>8</b>. The far-off <b>11, 15</b> don't help — a run wants <b>consecutive</b> values.</>,
           <>가장 긴 run = <b>8</b>. 멀리 있는 <b>11, 15</b>는 소용없어요 — run은 <b>연속된</b> 값이라야 하니까요.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Fill the gaps with wildcards", "빈칸을 와일드로 메꾸기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "extend" || s.kind === "done" ? "aha" : s.kind === "window" ? "go" : "go"}>{say}</Say>

      {/* 와일드 토큰 표시 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#64748b" }}>{t(E, "wildcards", "와일드")}</span>
        {Array.from({ length: K }).map((_, i) => {
          const spent = i < usedWild;
          return (
            <div key={i} style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              background: spent ? "#f1f5f9" : WILDBG, border: `2px ${spent ? "solid #cbd5e1" : "dashed " + WILD}`,
              fontSize: 15, fontWeight: 800, color: spent ? "#94a3b8" : WILD, opacity: spent ? 0.55 : 1, transition: "all .15s" }}>
              {spent ? "·" : "★"}
            </div>
          );
        })}
        <span style={{ fontSize: 11, color: "#94a3b8" }}>
          {t(E, `${K - usedWild} left`, `${K - usedWild}장 남음`)}
        </span>
      </div>

      {/* 수직선 (값 칸) */}
      <div style={{ display: "flex", justifyContent: "center", overflowX: "auto", paddingBottom: 4 }}>
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: HI - LO + 1 }, (_, i) => LO + i).map((v) => {
            const isPresent = present.has(v);
            const isWild = wildSet.has(v);
            const inWin = lo != null && v >= lo && v <= hi;
            let bg = "#fff", bd = "#e2e8f0", fg = "#94a3b8", faded = false, weight = 600;
            if (isWild) { bg = WILD; bd = WILD; fg = "#fff"; weight = 800; }
            else if (isPresent && inWin) { bg = RED; bd = RED; fg = "#fff"; weight = 800; }
            else if (isPresent) { bg = REDBG; bd = "#fca5a5"; fg = RED; weight = 800; }
            else { faded = true; bd = "#e2e8f0"; fg = "#cbd5e1"; }
            return (
              <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: 26, height: 34, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                  background: bg, border: `2px ${isPresent || isWild ? "solid" : "dashed"} ${bd}`,
                  fontFamily: "'JetBrains Mono',monospace", fontWeight: weight, fontSize: 13, color: fg,
                  opacity: faded ? 0.5 : 1, transition: "all .15s" }}>
                  {isWild ? "★" : isPresent ? v : ""}
                </div>
                <div style={{ fontSize: 9, color: inWin ? "#334155" : "#cbd5e1", fontWeight: inWin ? 800 : 600,
                  fontFamily: "'JetBrains Mono',monospace" }}>{v}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 창 라벨 / 결과 */}
      {s.kind === "hand" && (
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "#64748b", wordBreak: "keep-all" }}>
          {t(E, "🔴 = a card I hold · dashed = missing value · ★ = wildcard",
               "🔴 = 가진 카드 · 점선 = 빠진 값 · ★ = 와일드")}
        </div>
      )}
      {s.kind === "window" && <Caption color={RED}>{t(E, "window 2~8 · fill 6 → run = 7", "창 2~8 · 6 메꿈 → run = 7")}</Caption>}
      {s.kind === "extend" && <Caption color={WILD}>{t(E, "extend to 9 → run = 8", "9까지 확장 → run = 8")}</Caption>}
      {s.kind === "done" && (
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <div style={{ display: "inline-block", background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10,
            padding: "8px 18px", fontSize: 16, fontWeight: 800, color: "#15803d", fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "answer = 8", "답 = 8")}
          </div>
        </div>
      )}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GapFormulaSim — 코드의 `c[j] - c[i] - (j - i) > k` 를 눈으로.
   선생님 2026-09-03: "c[j] - c[i] - (j - i) > k: 이걸 가시적으로 보여줘야지"
   전엔 "내부 빈칸 = 값차 − 개수차" 라고 말로만 있었음. 왜 그 식이 빈칸 개수인지 안 보였음.

   보이는 것: 창의 왼쪽~오른쪽이 몇 칸인지 세고, 가진 카드가 몇 장인지 세고,
   빼면 빈칸이 나온다. 그 다음 (칸수 − 카드수) 를 정리하면 +1 이 서로 지워져
   코드의 식이 그대로 나온다 — 사후 보정이 아니라 세어서 얻은 식.
   세 창(2~5, 2~8, 2~11)의 값은 전부 실제로 세어서 확인 (빈칸 0 / 1 / 3).
   ═══════════════════════════════════════════════════════════════ */
export function GapFormulaSim({ E }) {
  const C = [2, 3, 4, 5, 7, 8, 11, 15];   // 정렬·중복제거한 손패
  const K = 2;
  const WINDOWS = [[0, 5], [0, 6]];       // 보여줄 창: 빈칸 1 (OK), 빈칸 3 (초과)

  const steps = [
    { k: "win", w: 0 },      // 창 잡기
    { k: "span", w: 0 },     // 몇 칸인가
    { k: "have", w: 0 },     // 몇 장 가졌나
    { k: "gap", w: 0 },      // 빼면 빈칸
    { k: "algebra" },        // +1 이 지워져 코드의 식이 됨
    { k: "win", w: 1 },      // 창을 넓히면
    { k: "gap", w: 1 },      // 빈칸 3 > K → 못 씀
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const [i, j] = WINDOWS[s.w ?? 0];
  const lo = C[i], hi = C[j];
  const span = hi - lo + 1;            // 왼쪽부터 오른쪽까지 칸 수
  const have = j - i + 1;              // 그 안에 가진 카드 수
  const gap = span - have;             // 빈칸
  const inSet = new Set(C);
  const cells = [];
  for (let v = lo; v <= hi; v++) cells.push({ v, has: inSet.has(v) });
  const showSpan = s.k !== "win";
  const showHave = s.k === "have" || s.k === "gap";
  const showGap = s.k === "gap";

  const say =
    s.k === "win" ? (s.w === 0
      ? t(E, <>Take the window from <b>{lo}</b> to <b>{hi}</b>.<br />How many wildcards would it need?</>,
            <>창을 <b>{lo}</b> 부터 <b>{hi}</b> 까지 잡아봐요.<br />와일드가 몇 장 필요할까요?</>)
      : t(E, <>Now widen the window to <b>{hi}</b>.<br />Does it still work with <b>{K}</b> wildcards?</>,
            <>이번엔 창을 <b>{hi}</b> 까지 넓혀봐요.<br />와일드 <b>{K}장</b>으로 아직 될까요?</>))
    : s.k === "span" ? t(E,
        <>From <b>{lo}</b> to <b>{hi}</b> there are <b>{span}</b> slots.<br />That is <b>{hi} − {lo} + 1</b>.</>,
        <><b>{lo}</b> 부터 <b>{hi}</b> 까지는 <b>{span}칸</b>이에요.<br /><b>{hi} − {lo} + 1</b> 이죠.</>)
    : s.k === "have" ? t(E,
        <>Of those slots I already hold <b>{have}</b> cards.<br />That is <b>j − i + 1</b>.</>,
        <>그 칸들 중에 내가 가진 카드는 <b>{have}장</b>이에요.<br /><b>j − i + 1</b> 이죠.</>)
    : s.k === "gap" ? (gap <= K
        ? t(E, <>Slots minus cards = <b>{span} − {have} = {gap}</b> empty.<br />I have <b>{K}</b> wildcards, so <b style={{ color: "#15803d" }}>this window works</b>.</>,
              <>칸 수에서 카드 수를 빼면 빈칸이에요.<br /><b>{span} − {have} = {gap}</b> 칸이 비었어요.<br />와일드가 <b>{K}장</b>이니 <b style={{ color: "#15803d" }}>이 창은 돼요</b>.</>)
        : t(E, <>Now <b>{span} − {have} = {gap}</b> slots are empty.<br /><b style={{ color: RED }}>{gap} &gt; {K}</b>, so the wildcards run out —<br />the code shrinks the window from the left.</>,
              <>이번엔 <b>{span} − {have} = {gap}</b> 칸이 비었어요.<br /><b style={{ color: RED }}>{gap} &gt; {K}</b> 라 와일드가 모자라요.<br />그래서 코드는 왼쪽 i 를 좁혀요.</>))
    : t(E,
        <>Write it out: <b>(hi − lo + 1) − (j − i + 1)</b>.<br />The two <b>+1</b> cancel, leaving <b>hi − lo − (j − i)</b>.<br />That is exactly the line in the code.</>,
        <>식으로 써 봐요. <b>(칸 수) − (카드 수)</b> 예요.<br /><b>(hi − lo + 1) − (j − i + 1)</b> 인데<br /><b>+1</b> 두 개가 서로 지워져요.<br />남는 게 <b>hi − lo − (j − i)</b> — 코드의 그 줄이에요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why that line counts the gaps", "그 식이 왜 빈칸 개수일까요")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.k === "algebra" ? "aha" : s.k === "gap" && gap > K ? "stuck" : "go"}>{say}</Say>

      {s.k !== "algebra" && (
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
            {cells.map(({ v, has }) => (
              <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: 34, height: 40, borderRadius: 7,
                  border: `2px ${has ? "solid" : "dashed"} ${has ? RED : (showGap ? WILD : "#cbd5e1")}`,
                  background: has ? REDBG : (showGap ? WILDBG : "#fff"),
                  color: has ? RED : (showGap ? WILD : "#cbd5e1"),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 15 }}>
                  {has ? v : (showGap ? "★" : "")}
                </div>
                <div style={{ fontSize: 9.5, fontWeight: 800, color: "#cbd5e1" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 430, margin: "10px auto 0", display: "grid", gap: 5, fontSize: 12.5 }}>
            {showSpan && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 13px",
                borderRadius: 9, border: "1.5px solid #e2e8f0", background: "#fff", wordBreak: "keep-all" }}>
                <span style={{ color: "#475569", fontWeight: 700 }}>{t(E, `slots ${lo} … ${hi}`, `${lo} … ${hi} 칸 수`)}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#334155" }}>
                  {hi} − {lo} + 1 = {span}
                </span>
              </div>
            )}
            {showHave && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 13px",
                borderRadius: 9, border: `1.5px solid ${RED}`, background: REDBG, wordBreak: "keep-all" }}>
                <span style={{ color: "#7f1d1d", fontWeight: 700 }}>{t(E, "cards I hold", "가진 카드")}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: RED }}>
                  {j} − {i} + 1 = {have}
                </span>
              </div>
            )}
            {showGap && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 13px",
                borderRadius: 9, border: `2px solid ${gap <= K ? "#86efac" : RED}`,
                background: gap <= K ? "#f0fdf4" : REDBG, wordBreak: "keep-all" }}>
                <span style={{ fontWeight: 800, color: gap <= K ? "#15803d" : RED }}>
                  {t(E, "empty slots", "빈칸")} ★
                </span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
                  color: gap <= K ? "#15803d" : RED }}>
                  {span} − {have} = {gap}  {gap <= K ? `≤ ${K} ✓` : `> ${K} ✗`}
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {s.k === "algebra" && (
        <div style={{ maxWidth: 460, margin: "0 auto", padding: "14px 16px", borderRadius: 12,
          background: "#f5f3ff", border: "1.5px solid #c4b5fd", color: "#5b21b6",
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5, lineHeight: 2.1, textAlign: "center" }}>
          <div>({t(E, "slots", "칸 수")}) − ({t(E, "cards", "카드 수")})</div>
          <div>= (c[j] − c[i] + 1) − (j − i + 1)</div>
          <div style={{ color: "#94a3b8", fontSize: 12 }}>{t(E, "the two +1 cancel", "+1 두 개가 서로 지워져요")}</div>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#7c3aed" }}>= c[j] − c[i] − (j − i)</div>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}
