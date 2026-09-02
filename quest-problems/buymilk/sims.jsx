"use client";

/* Purchasing Milk (Jan 2026 Bronze #3) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
   건드리지 않고 여기에만.

   문제였던 것: 챕터1 에 시뮬이 하나도 없고, 핵심 두 가지가 **코드 말풍선 안에만** 있었음.
     · 정규화 c[i] = min(a[i], 2·c[i-1])  — 왜 필요한지 페이지에 없었음
     · 큰 블록부터 올림/내림 두 갈래 그리디 — 역시 코드에서 처음 만남
   학생이 핵심을 코드 안에서 처음 보는 건 순서가 뒤집힌 것.

   ① NormalizeSim — 딜 값을 블록 최저가로 바꾸면 "큰 블록이 통당 항상 싸다" 가 됨
   ② GreedySim    — 그래서 큰 블록부터 훑으며 올림/내림만 비교하면 됨

   예제: a = [10, 15, 20, 45] (블록 1·2·4·8통) → c = [10, 15, 20, 40]. x = 5 → 30, x = 7 → 40.
   모든 값은 그 자리에서 계산 (하드코딩 아님). 실제 풀이와 브루트포스 대조 완료. */

import { t } from "@/components/quest/theme";
import { StepFade } from "@/components/quest/StepFade";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#0891b2";
const DEALS = [10, 15, 20, 45];          // 딜 가격 a[i]
// ⚠️ 이 값을 바꾸면 chapters.jsx 의 input 스텝(x=9 → 50)과 힌트의 블록 값도 같이 고칠 것.
//    고른 이유: 정규화에서 '교체'(8통 45→40)와 '유지'(2·4통) 가 모두 나오고,
//    x=7 에서 '올림해서 사고 끝내기' 가 실제로 이긴다(40 < 45) — 바로 앞 퀴즈에서 배운 것.
const N = DEALS.length;

/* c[i] = min(a[i], 2·c[i-1]) — 블록 2^i 통의 최저가 */
function normalize() {
  const c = [DEALS[0]];
  for (let i = 1; i < N; i++) c.push(Math.min(DEALS[i], 2 * c[i - 1]));
  return c;
}
const C = normalize();

function Say({ children, tone = "go" }) {
  const s = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#ecfeff", bd: "#67e8f9", fg: "#155e75" };
  return (
    <div style={{ maxWidth: 470, margin: "6px auto 14px", padding: "11px 16px", borderRadius: 12,
      background: s.bg, border: `1.5px solid ${s.bd}`, color: s.fg, fontSize: 13.5, fontWeight: 700,
      textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.75 }}>{children}</div>
  );
}
const mono = { fontFamily: "'JetBrains Mono',monospace" };

/* ═══ ① 정규화 — 딜 값을 '블록 최저가' 로 ═══ */
export function NormalizeSim({ E }) {
  const steps = [{ k: "why" }, ...DEALS.map((_, i) => ({ k: "row", i })), { k: "unit" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const upto = s.k === "row" ? s.i + 1 : s.k === "unit" ? N : 0;

  const say =
    s.k === "why" ? t(E,
      <>Prices only go up, but block sizes <b>double</b>.<br />So a big deal might be a bad deal.<br />First, find the <b>cheapest way</b> to get each block.</>,
      <>가격은 오르기만 하는데 블록 크기는 <b>두 배씩</b> 커져요.<br />그래서 큰 딜이 손해일 수도 있어요.<br />먼저 블록마다 <b>가장 싸게 얻는 값</b>을 구해요.</>)
    : s.k === "row" ? (() => {
        const i = s.i, size = 1 << i;
        if (i === 0) return t(E,
          <>The <b>1-bucket</b> block has only one way to buy it: <b>{DEALS[0]}</b>.</>,
          <><b>1통</b> 블록은 사는 방법이 하나뿐이에요. <b>{DEALS[0]}</b> 이에요.</>);
        const two = 2 * C[i - 1], cheaper = two < DEALS[i];
        return cheaper
          ? t(E, <>The <b>{size}-bucket</b> deal costs <b>{DEALS[i]}</b>,<br />but two {size / 2}-bucket blocks cost <b>{two}</b> — cheaper!<br />So this block is really worth <b>{C[i]}</b>.</>,
                <><b>{size}통</b> 딜은 <b>{DEALS[i]}</b> 인데<br />{size / 2}통 블록 두 개면 <b>{two}</b> 예요. 더 싸요!<br />그래서 이 블록의 값은 <b>{C[i]}</b> 이에요.</>)
          : t(E, <>The <b>{size}-bucket</b> deal costs <b>{DEALS[i]}</b>,<br />and two {size / 2}-bucket blocks cost <b>{two}</b>.<br />The deal wins, so it stays <b>{C[i]}</b>.</>,
                <><b>{size}통</b> 딜은 <b>{DEALS[i]}</b> 이고<br />{size / 2}통 블록 두 개는 <b>{two}</b> 예요.<br />딜이 더 싸니 그대로 <b>{C[i]}</b> 예요.</>);
      })()
    : t(E,
      <>Now look at the <b>price per bucket</b>.<br />It never goes up as blocks get bigger.<br /><b>So bigger blocks are always at least as good.</b></>,
      <>이제 <b>통당 단가</b>를 봐요.<br />블록이 커져도 단가가 올라가지 않아요.<br /><b>그래서 큰 블록이 항상 손해가 아니에요.</b></>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Turn deals into block prices", "딜 값을 블록 최저가로 바꿔요")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "unit" ? "aha" : s.k === "why" ? "go" : "go"}>{say}</Say>

      <div style={{ maxWidth: 460, margin: "0 auto", display: "grid", gap: 5 }}>
        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 1fr 1fr", gap: 8,
          fontSize: 10.5, fontWeight: 800, color: "#94a3b8", padding: "0 11px" }}>
          <span>{t(E, "block", "블록")}</span>
          <span>{t(E, "deal a[i]", "딜 a[i]")}</span>
          <span>{t(E, "two halves", "반쪽 두 개")}</span>
          <span>{t(E, "cheapest c[i]", "최저가 c[i]")}</span>
        </div>
        {DEALS.map((d, i) => {
          const shown = i < upto, size = 1 << i;
          const two = i === 0 ? null : 2 * C[i - 1];
          const swapped = two != null && two < d;
          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "70px 1fr 1fr 1fr", gap: 8,
              alignItems: "center", padding: "8px 11px", borderRadius: 9, fontSize: 12.5, ...mono,
              border: `${s.k === "row" && s.i === i ? 2 : 1}px solid ${s.k === "row" && s.i === i ? A : "#e2e8f0"}`,
              background: shown ? (swapped ? "#fff7ed" : "#fff") : "#fff", opacity: shown ? 1 : 0.3 }}>
              <span style={{ fontWeight: 800, color: "#334155" }}>{size}{t(E, "", "통")}</span>
              <span style={{ color: swapped ? "#cbd5e1" : "#334155",
                textDecoration: swapped ? "line-through" : "none" }}>{d}</span>
              <span style={{ color: "#94a3b8" }}>{two == null ? "—" : two}</span>
              <span style={{ fontWeight: 800, color: shown ? (swapped ? "#ea580c" : "#0e7490") : "#cbd5e1" }}>
                {shown ? C[i] : "?"}
              </span>
            </div>
          );
        })}
        {s.k === "unit" && (
          <div style={{ marginTop: 8, padding: "10px 14px", borderRadius: 10, background: "#ecfeff",
            border: "1.5px solid #67e8f9", fontSize: 12.5, color: "#155e75", lineHeight: 1.9,
            textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>{t(E, "price per bucket", "통당 단가")}</div>
            <div style={mono}>
              {C.map((v, i) => `${1 << i}${t(E, "", "통")} ${(v / (1 << i)).toFixed(2)}`).join("  ·  ")}
            </div>
          </div>
        )}
      </div>
      </StepFade>
      <div style={{ marginTop: 18 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ ② 그리디 — 큰 블록부터 올림/내림 두 갈래만 ═══ */
export function GreedySim({ E, x = 5 }) {
  const X = x;
  /* 실제 풀이 그대로 돌려서 단계 기록 */
  const trace = [];
  let best = Infinity, cost = 0, rem = X;
  for (let i = N - 1; i >= 0; i--) {
    const size = 1 << i;
    const need = Math.ceil(rem / size);
    const cand = cost + need * C[i];
    const take = Math.floor(rem / size);
    trace.push({ i, size, rem, need, cand, take, costBefore: cost });
    best = Math.min(best, cand);
    cost += take * C[i];
    rem -= take * size;
  }
  const exact = cost;
  best = Math.min(best, exact);

  const steps = [{ k: "why" }, ...trace.map((_, n) => ({ k: "row", n })), { k: "done" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const cur = s.k === "row" ? trace[s.n] : null;
  // 'why' 단계에선 아직 아무 줄도 안 봤으니 답을 보여주면 안 됨 (미리 새던 것 수정)
  const bestSoFar = s.k === "why" ? Infinity
    : s.k === "row" ? Math.min(...trace.slice(0, s.n + 1).map((r) => r.cand))
    : best;

  const say =
    s.k === "why" ? t(E,
      <>We need <b>at least {X}</b> buckets.<br />Bigger blocks are never worse, so start big.<br />At each block there are only <b>two</b> choices.</>,
      <><b>{X}통 이상</b>이 필요해요.<br />큰 블록이 손해가 아니니 큰 것부터 봐요.<br />블록마다 고를 수 있는 건 <b>두 가지</b>뿐이에요.</>)
    : s.k === "row" ? t(E,
      <>Block <b>{cur.size}</b>: <b>{cur.rem}</b> buckets still needed.<br />Round <b>up</b> → buy {cur.need} and stop → <b>{cur.cand}</b>.<br />Or take <b>{cur.take}</b> and carry <b>{cur.rem - cur.take * cur.size}</b> to smaller blocks.</>,
      <><b>{cur.size}통</b> 블록이에요. 아직 <b>{cur.rem}통</b> 필요해요.<br /><b>올림</b>하면 {cur.need}개 사고 끝 → <b>{cur.cand}</b>.<br />아니면 <b>{cur.take}개</b>만 쓰고 <b>{cur.rem - cur.take * cur.size}통</b>을 작은 블록으로 넘겨요.</>)
    : best < exact ? t(E,
      <>The cheapest is <b>{best}</b> — and it <b>over-buys</b>.<br />Buying exactly {X} costs <b>{exact}</b>. Rounding up wins.<br />One pass from big to small — no searching.</>,
      <>제일 싼 게 <b>{best}</b> 인데, <b>{X}통을 넘겨 사는</b> 쪽이에요.<br />딱 {X}통만 사면 <b>{exact}</b>. 올림이 이겼어요.<br />큰 것부터 한 번만 훑었어요. 탐색이 없어요.</>)
    : t(E,
      <>Every block checked, and the cheapest is <b>{best}</b>.<br />That is <b>one pass</b> from big to small — no searching.</>,
      <>블록을 다 봤고 제일 싼 게 <b>{best}</b> 예요.<br />큰 것부터 <b>한 번만</b> 훑었어요. 탐색이 없어요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, `Buy at least ${X} buckets, as cheap as possible`, `${X}통 이상을 제일 싸게 사요`)}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "done" ? "aha" : "go"}>{say}</Say>

      <div style={{ maxWidth: 470, margin: "0 auto", display: "grid", gap: 5 }}>
        <div style={{ display: "grid", gridTemplateColumns: "62px 1fr 1fr 1fr", gap: 8,
          fontSize: 10.5, fontWeight: 800, color: "#94a3b8", padding: "0 11px" }}>
          <span>{t(E, "block", "블록")}</span>
          <span>{t(E, "still need", "남은 통")}</span>
          <span>{t(E, "round up → cost", "올림하면 값")}</span>
          <span>{t(E, "take / carry", "내림 / 넘김")}</span>
        </div>
        {trace.map((r, n) => {
          const shown = s.k === "done" || (s.k === "row" && n <= s.n);
          const isCur = s.k === "row" && n === s.n;
          const isBest = shown && r.cand === best;
          return (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "62px 1fr 1fr 1fr", gap: 8,
              alignItems: "center", padding: "8px 11px", borderRadius: 9, fontSize: 12.5, ...mono,
              border: `${isCur ? 2 : 1}px solid ${isCur ? A : isBest ? "#86efac" : "#e2e8f0"}`,
              background: isBest ? "#f0fdf4" : "#fff", opacity: shown ? 1 : 0.3 }}>
              <span style={{ fontWeight: 800, color: "#334155" }}>{r.size}{t(E, "", "통")}</span>
              <span style={{ color: "#64748b" }}>{shown ? r.rem : "?"}</span>
              <span style={{ fontWeight: 800, color: isBest ? "#15803d" : "#0e7490" }}>
                {shown ? `${r.need}×${C[r.i]} = ${r.cand}` : "?"}
              </span>
              <span style={{ color: "#94a3b8" }}>
                {shown ? `${r.take} / ${r.rem - r.take * r.size}` : "?"}
              </span>
            </div>
          );
        })}
        <div style={{ marginTop: 6, textAlign: "center", fontSize: 13.5, fontWeight: 800,
          color: s.k === "done" ? "#15803d" : "#0e7490" }}>
          {t(E, "cheapest so far", "지금까지 제일 싼 값")} {Number.isFinite(bestSoFar) ? bestSoFar : "—"}
        </div>
      </div>
      </StepFade>
      <div style={{ marginTop: 18 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}
