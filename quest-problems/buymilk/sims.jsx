/* ⚠️ 2026-09-18 선생님: *"아직 갑자기 읽으면 뭔말인가해"*
   화면을 차갑게 읽어 보니 첫 네 줄이 **서로 다른 네 가지**를 말하고 있었다 —
   파란 줄은 '넉넉히 사도 된다', 제목은 '묶음마다 제일 싼 값', 노란 상자는 '새 예제',
   말풍선은 '적힌 값이 진짜 값이 아니다'. 넷 다 맞는 말인데 **이어지지 않는다.**
   그리고 **문제 챕터인데 `deal_price` · `block_cost` 라는 코드 이름이 먼저 나온다.**
   (이 세션에서 코드 변수를 고치며 그 이름을 화면까지 밀어 넣은 게 원인이다.
    코드 이름은 9쪽 Plan 카드에서 처음 만나야 한다 — 거기가 이름을 붙이는 자리다.) */
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

/* PER[i] = 2^i 통 묶음에서 **한 통에 드는 값**. 10 · 7.5 · 5 · 5.
   ⚠️ 2026-09-18 선생님: *"아까전에는 1통씩 계산하더니 왜 갑자기 큰 묶음이 손해가
      아니니 큰것부터 봐요라고 그러는거지?"* → 고친 뒤에도 *"위에 적힌? 아직도 뭔말인지 모르겠어"*.
   두 번 걸린 자리다. 배운 것 둘 —
   ① **"위에 적힌" 처럼 가리키지 마라.** 가리킬 것이 화면에 있어도 학생은 못 찾는다.
      숫자를 그 문장 안에 그대로 써라.
   ② **`10 → 7.5 → 5 → 5` 처럼 값만 늘어놓지 마라.** 무엇의 값인지 이름표를 붙여야
      읽힌다 — `1통 묶음 10 · 2통 묶음 7.5 · …`.
   앞 시뮬 마지막 걸음이 이 값을 구해 놓고 "그래서 큰 묶음부터 사도 손해 볼 일이 없어요"
   로 끝나는데, 쪽을 넘기면 그 근거가 사라졌다.
   memory/feedback_screen_must_not_rely_on_memory.md · feedback_sentence_must_follow.md */
const PER = C.map((v, i) => +(v / (1 << i)).toFixed(2));

function Say({ children, tone = "go" }) {
  const s = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#ecfeff", bd: "#67e8f9", fg: "#155e75" };
  return (
    /* ⚠️ 2026-09-18 선생님: *"원래 강조할때는 색을 다르게 하거나 bold를 안해서 그런가? 안읽혀"*
       말풍선 **전체가 fontWeight 700** 이었다. 그래서 글쓴이가 `<b>` 로 짚어 둔 자리가
       주변과 똑같아 보였다 — **다 굵으면 아무것도 강조가 아니다.**
       본문을 보통 굵기로 내리고, `<b>` 만 굵게·진한 색으로 튀게 한다. */
    <div style={{ maxWidth: 470, margin: "6px auto 14px", padding: "11px 16px", borderRadius: 12,
      background: s.bg, border: `1.5px solid ${s.bd}`, color: s.fg, fontSize: 13.5, fontWeight: 500,
      textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.75 }}>
      <style>{`.qsay b{font-weight:800;color:${s.fg};filter:brightness(.72)}`}</style>
      <span className="qsay">{children}</span>
    </div>
  );
}
const mono = { fontFamily: "'JetBrains Mono',monospace" };

/* 📌 지금 쓰는 예제를 늘 띄워 둔다.
   ⚠️ 2026-09-15 ux-reviewer: 예제 1 은 a = [10, 15] 라 x=7 → 55 인데, 여기서는
   a = [10, 15, 20, 45] 로 **통째로 바뀌는데** 앞 두 값이 똑같아서 학생은 같은 예제로 본다.
   그리고 여기선 같은 x=7 이 40 이다. "예제가 바뀌었다" 를 화면이 말해야 한다.
   근거: memory/feedback_screen_must_not_rely_on_memory.md */
function Carry({ E, children }) {
  return (
    <div style={{ maxWidth: 470, margin: "0 auto 10px", padding: "8px 12px", borderRadius: 9,
      background: "#fffbeb", border: "1px solid #fcd34d", fontSize: 12, color: "#92400e",
      lineHeight: 1.75, wordBreak: "keep-all", textWrap: "balance", textAlign: "center" }}>
      {children}
    </div>
  );
}

/* ═══ ① 정규화 — 딜 값을 '블록 최저가' 로 ═══ */
export function NormalizeSim({ E }) {
  const steps = [{ k: "why" }, ...DEALS.map((_, i) => ({ k: "row", i })), { k: "unit" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const upto = s.k === "row" ? s.i + 1 : s.k === "unit" ? N : 0;

  const say =
    s.k === "why" ? t(E,
      <>Same 8 buckets, two ways to buy them.<br />One 8-pack costs <b>45</b>. Two 4-packs cost <b>40</b>.<br />For each size we keep the cheaper way. Let's go from 1 bucket up.</>,
      <>같은 8통이어도 사는 방법이 둘이에요.<br />8통 묶음을 한 번 사면 <b>45</b>, 4통 묶음을 두 번 사면 <b>40</b>.<br />묶음마다 이렇게 싼 쪽을 골라 둘게요. 1통부터 차례로요.</>)
    : s.k === "row" ? (() => {
        const i = s.i, size = 1 << i;
        if (i === 0) return t(E,
          <>The <b>1-bucket</b> block has only one way to buy it: <b>{DEALS[0]}</b>.</>,
          <><b>1통</b> 묶음은 사는 방법이 하나뿐이에요. <b>{DEALS[0]}</b> 이에요.</>);
        const two = 2 * C[i - 1], cheaper = two < DEALS[i];
        return cheaper
          ? t(E, <>The <b>{size}-bucket</b> deal costs <b>{DEALS[i]}</b>,<br />but two {size / 2}-bucket blocks cost <b>{two}</b> — cheaper!<br />So this block is really worth <b>{C[i]}</b>.</>,
                <>{size / 2}통 묶음을 <b>두 번</b> 사면 {size}통이 돼요.<br />{size}통 묶음을 한 번에 살 수도 있어요 — 거래값 <b>{DEALS[i]}</b>.<br />그런데 두 번 사면 <b>{two}</b> 이라 더 싸요!<br />그래서 {size}통은 <b>{C[i]}</b> 에 살 수 있어요.</>)
          : t(E, <>The <b>{size}-bucket</b> deal costs <b>{DEALS[i]}</b>,<br />and two {size / 2}-bucket blocks cost <b>{two}</b>.<br />The deal wins, so it stays <b>{C[i]}</b>.</>,
                <>{size / 2}통 묶음을 <b>두 번</b> 사면 {size}통이 되는데 <b>{two}</b> 이에요.<br />{size}통 묶음을 한 번에 사면 <b>{DEALS[i]}</b> 이에요.<br />이번엔 한 번에 사는 쪽이 싸요. 그대로 <b>{C[i]}</b> 예요.</>);
      })()
    : t(E,
      <><b>Can we just grab the biggest packs first?</b><br />The bigger the pack, the cheaper one bucket — <b>10, 7.5, 5, 5</b>.<br />So taking the big ones first is fine.</>,
      <><b>큰 묶음부터 집어도 될까요?</b><br />묶음이 클수록 한 통이 싸요. <b>10, 7.5, 5, 5</b> 이렇게요.<br />그러니 큰 걸 먼저 집어도 괜찮아요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Turn deals into block prices", "묶음마다 제일 싼 값을 구해요")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Carry E={E}>
        {t(E, <>A new, bigger example — <b>4 deals</b> now: 10, 15, 20, 45.<br />
                 (Sample 1 back on page 2 had only two: [10, 15].)</>,
             <>새 예제예요. 이제 <b>거래가 4개</b>예요 — 10, 15, 20, 45<br />
               (2쪽 예제 1 은 두 개였어요. [10, 15])</>)}
      </Carry>
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "unit" ? "aha" : s.k === "why" ? "go" : "go"}>{say}</Say>

      <div style={{ maxWidth: 460, margin: "0 auto", display: "grid", gap: 5 }}>
        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 1fr 1fr", gap: 8,
          fontSize: 10.5, fontWeight: 800, color: "#94a3b8", padding: "0 11px" }}>
          <span>{t(E, "block", "묶음")}</span>
          <span>{t(E, "listed price", "거래값")}</span>
          <span>{t(E, "two halves", "작은 묶음 두 번")}</span>
          <span>{t(E, "cheaper way", "싼 쪽")}</span>
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
            {/* ⚠️ 2026-09-18 선생님: *"자연스러운 말이라면 **한통 묶음 살때의 가격 10,
                2통 묶음 살때 한통 가격은 7.5**.. 뭐 이래야 한국말 아닌가?"*
                `10 ÷ 1통 = 10.00` 처럼 식만 늘어놓으면 **한국말이 아니다.** 문장으로 쓴다.
                그리고 넷을 한 줄에 `·` 로 이어 붙이면 **줄바꿈이 낱말 가운데를 자른다**
                (선생님: *"다음줄로 가얒"*) — 한 줄에 하나씩 놓는다. */}
            <div style={{ fontWeight: 800, marginBottom: 6 }}>{t(E, "What one bucket costs", "한 통에 얼마씩인가")}</div>
            <div style={{ display: "grid", gap: 3, justifyItems: "center" }}>
              {C.map((v, i) => (
                <div key={i} style={{ whiteSpace: "nowrap" }}>
                  {t(E, <>Buying the {1 << i}-pack, one bucket costs <b style={mono}>{+(v / (1 << i)).toFixed(2)}</b></>,
                        <>{1 << i}통 묶음을 사면 한 통에 <b style={mono}>{+(v / (1 << i)).toFixed(2)}</b></>)}
                </div>
              ))}
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
      <>Big packs are cheaper per bucket, so we look at the big ones first.<br />At each pack there are only two moves — <b>buy enough and stop</b>, or <b>buy less and leave the rest to smaller packs</b>.<br />We just have to reach <b>at least {X}</b> buckets.</>,
      <>큰 묶음일수록 한 통이 싸니까 큰 것부터 봐요.<br />묶음마다 할 수 있는 건 둘뿐이에요 — <b>넉넉히 사고 끝내거나</b>, <b>모자라게 사고 남은 통을 작은 묶음에 넘기거나</b>.<br /><b>{X}통 이상</b>만 채우면 돼요.</>)
    : s.k === "row" ? t(E,
      <>Block <b>{cur.size}</b>: <b>{cur.rem}</b> buckets still needed.<br />Round <b>up</b> → buy {cur.need} and stop → <b>{cur.cand}</b>.<br />Or take <b>{cur.take}</b> and carry <b>{cur.rem - cur.take * cur.size}</b> to smaller blocks.</>,
      <><b>{cur.size}통</b> 묶음이에요. 아직 <b>{cur.rem}통</b> 필요해요.<br /><b>넉넉히</b> 사면 {cur.need}개로 끝나요 → <b>{cur.cand}</b>.<br />아니면 <b>{cur.take}개</b>만 사고 남은 <b>{cur.rem - cur.take * cur.size}통</b>은 작은 묶음에 맡겨요.</>)
    : best < exact ? t(E,
      <>The cheapest is <b>{best}</b> — and it <b>over-buys</b>.<br />Buying exactly {X} costs <b>{exact}</b>. Rounding up wins.<br />One pass from big to small — no searching.</>,
      <>제일 싼 게 <b>{best}</b> 인데, <b>{X}통보다 많이 사는</b> 쪽이에요.<br />딱 {X}통만 사면 <b>{exact}</b> 이라, 넉넉히 산 쪽이 이겼어요.<br />큰 것부터 한 번만 훑었어요. 찾아 헤매지 않았어요.</>)
    : t(E,
      <>Every block checked, and the cheapest is <b>{best}</b>.<br />That is <b>one pass</b> from big to small — no searching.</>,
      <>묶음을 다 봤고 제일 싼 게 <b>{best}</b> 예요.<br />큰 것부터 <b>한 번만</b> 훑었어요. 찾아 헤매지 않았어요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, `Buy at least ${X} buckets, as cheap as possible`, `${X}통 이상을 제일 싸게 사요`)}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Carry E={E}>
        {/* ⚠️ 2026-09-18 선생님: *"아까전에는 1통씩 계산하더니 왜 갑자기
            큰 묶음이 손해가 아니니 큰것부터 봐요라고 그러는거지?"*
            앞 시뮬 마지막 걸음이 '한 통에 얼마' 를 10 → 7.5 → 5 → 5 로 보여주고
            "그래서 큰 묶음부터 사도 손해 볼 일이 없어요" 로 끝난다. 그런데 **쪽을 넘기면
            그 근거가 사라지고** 여기서는 결론만 다시 주장하고 있었다.
            근거를 이 화면으로 가져온다 — memory/feedback_screen_must_not_rely_on_memory.md */}
        {t(E, <>Same 4 deals: 10, 15, 20, 45.<br />
                 The cheaper way for each pack: {C.join(", ")}</>,
             <>같은 거래 4개예요 — 10, 15, 20, 45<br />
               묶음마다 고른 싼 값은 {C.join(", ")} 이에요.</>)}
      </Carry>
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "done" ? "aha" : "go"}>{say}</Say>

      <div style={{ maxWidth: 470, margin: "0 auto", display: "grid", gap: 5 }}>
        <div style={{ display: "grid", gridTemplateColumns: "62px 1fr 1fr 1fr", gap: 8,
          fontSize: 10.5, fontWeight: 800, color: "#94a3b8", padding: "0 11px" }}>
          <span>{t(E, "block", "묶음")}</span>
          <span>{t(E, "still need", "남은 통")}</span>
          <span>{t(E, "round up → cost", "넉넉히 사면")}</span>
          <span>{t(E, "take / carry", "모자라게 사고 남은 통")}</span>
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
                {/* ⚠️ 2026-09-17 학생이 잡았다 — 전엔 `1×15 = 35` 처럼 **식이 안 맞았다.**
                    `cand = costBefore + need×C[i]` 인데 화면은 뒷항만 보여줬다.
                    학생: *"1×15는 15지 35가 아니다. 식이 안 맞아 보여서 못 믿게 됐다."*
                    → **앞에서 쓴 돈을 식에 같이 보여준다.** 첫 줄(0원)은 군더더기라 뺀다. */}
                {shown
                  ? (r.costBefore > 0
                      ? `${r.costBefore} + ${r.need}×${C[r.i]} = ${r.cand}`
                      : `${r.need}×${C[r.i]} = ${r.cand}`)
                  : "?"}
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
