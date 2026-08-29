"use client";

/* It's Mooin' Time IV (Jan 2026 Bronze #1) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
   건드리지 않고 여기에만 (chipxchg / cowsplits 와 같은 방식).

   전엔 시뮬이 아예 없어서 타이핑 과정도 핵심 알고리즘도 한 화면에 통째로 박혀 있었다.
   (2026-08-18 감사 메모: "뒤→앞 재구성/패리티 통찰 스텝 + 트레이스 시뮬" 필요)

   ① TypeTraceSim   — MOOMO 를 한 글자씩 쳐서 화면이 변하는 걸 단계로
   ② BackwardSim    — S 에서 거꾸로 친 키를 복원 (이게 곧 코드)
   두 시뮬의 값은 전부 그 자리에서 계산 — 표와 어긋날 수 없다.
   (길이 1~12 전수 8,190개로 복원 알고리즘 검증 완료) */

import { t } from "@/components/quest/theme";
import { StepFade } from "@/components/quest/StepFade";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#ea580c";
const MCOL = "#0891b2", MBG = "#ecfeff";
const OCOL = "#ea580c", OBG = "#fff7ed";

const flipStr = (s) => s.split("").map((c) => (c === "M" ? "O" : "M")).join("");
const flipCh = (c, times) => (times % 2 === 0 ? c : c === "M" ? "O" : "M");

function Ch({ c, size = 34, dim = false, ring = null }) {
  const col = c === "M" ? MCOL : OCOL;
  const bg = c === "M" ? MBG : OBG;
  return (
    <div style={{ width: size, height: size, borderRadius: 8, background: dim ? "#f8fafc" : bg,
      border: `2px solid ${ring || (dim ? "#e2e8f0" : col)}`, color: dim ? "#cbd5e1" : col,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: size * 0.5 }}>{c}</div>
  );
}
function Word({ s, size = 30, dimFrom = null, ringAt = null }) {
  if (!s) return <span style={{ fontSize: 12, color: "#94a3b8" }}>(빈 화면)</span>;
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
      {s.split("").map((c, i) => (
        <Ch key={i} c={c} size={size}
          dim={dimFrom != null && i >= dimFrom}
          ring={ringAt === i ? "#7c3aed" : null} />
      ))}
    </div>
  );
}
function Say({ children, tone = "go" }) {
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#fff7ed", bd: "#fdba74", fg: "#9a3412" };
  return (
    <div style={{ maxWidth: 470, margin: "6px auto 14px", padding: "11px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg, fontSize: 13.5, fontWeight: 700,
      textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.75 }}>{children}</div>
  );
}
function Label({ children, color = "#94a3b8" }) {
  return <div style={{ fontSize: 10.5, fontWeight: 800, color, textAlign: "center", marginBottom: 4 }}>{children}</div>;
}

/* ═══ ① MOOMO 를 한 글자씩 — 화면이 어떻게 변하나 ═══ */
export function TypeTraceSim({ E }) {
  const KEYS = "MOOMO".split("");
  const steps = KEYS.map((_, i) => ({ i }));
  const ts = useTraceStep(steps);
  const cur = steps[ts.safe].i;

  /* 그 자리에서 계산 — 하드코딩한 표가 아니라 규칙을 그대로 돌린 결과 */
  let scr = "";
  const rows = KEYS.map((k) => {
    const before = scr;
    const flipped = k === "O" ? flipStr(scr) : null;
    scr = (flipped != null ? flipped : scr) + k;
    return { k, before, flipped, after: scr };
  });
  const r = rows[cur];

  const say = r.k === "O"
    ? t(E,
        <>Key <b>{cur + 1}</b> is <b style={{ color: OCOL }}>O</b>.<br />Everything on screen flips first (M↔O),<br />then the O is appended.</>,
        <><b>{cur + 1}</b>번째 키는 <b style={{ color: OCOL }}>O</b> 예요.<br />화면에 있던 글자가 먼저 다 뒤집히고 (M↔O),<br />그 뒤에 O 가 붙어요.</>)
    : t(E,
        <>Key <b>{cur + 1}</b> is <b style={{ color: MCOL }}>M</b>.<br />M appends without flipping anything.</>,
        <><b>{cur + 1}</b>번째 키는 <b style={{ color: MCOL }}>M</b> 이에요.<br />M 은 아무것도 안 뒤집고 그냥 뒤에 붙어요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Type MOOMO, one key at a time", "MOOMO 를 한 글자씩 쳐봐요")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={r.k === "O" ? "aha" : "go"}>{say}</Say>

      {/* 지금까지 친 키 — 현재 키만 진하게 */}
      <Label>{t(E, "keys typed so far", "지금까지 친 키")}</Label>
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 14 }}>
        {KEYS.map((k, i) => <Ch key={i} c={k} size={26} dim={i > cur} ring={i === cur ? "#7c3aed" : null} />)}
      </div>

      <div style={{ maxWidth: 420, margin: "0 auto", display: "grid", gap: 10 }}>
        <div>
          <Label>{t(E, "screen before", "치기 전 화면")}</Label>
          <Word s={r.before} size={28} />
        </div>
        {r.flipped != null && (
          <div>
            <Label color={OCOL}>{t(E, "everything flips (M↔O)", "전부 뒤집힘 (M↔O)")}</Label>
            <Word s={r.flipped} size={28} />
          </div>
        )}
        <div>
          <Label color="#15803d">{t(E, "screen after", "치고 난 화면")}</Label>
          <Word s={r.after} size={30} />
        </div>
      </div>

      {cur === KEYS.length - 1 && (
        <div style={{ maxWidth: 460, margin: "14px auto 0", padding: "10px 14px", background: "#ecfdf5",
          border: "1.5px solid #86efac", borderRadius: 10, fontSize: 12.5, color: "#166534",
          lineHeight: 1.8, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
          {t(E, <>Typing <b>MOOMO</b> ends up showing <b>{r.after}</b>.<br />The keys you press and what you see are <b>different</b>.</>,
                <><b>MOOMO</b> 를 치면 화면엔 <b>{r.after}</b> 가 나와요.<br />내가 누른 키와 보이는 글자가 <b>달라요</b>.</>)}
        </div>
      )}
      </StepFade>
      <div style={{ marginTop: 20 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ ② 거꾸로 복원 — S 를 보고 친 키를 알아내기 (= 코드) ═══ */
export function BackwardSim({ E }) {
  const S = "OOMOO";
  const N = S.length;
  /* 뒤에서 앞으로: flips = 뒤쪽에 있는 O 개수의 홀짝 */
  const trace = [];
  let flips = 0;
  for (let i = N - 1; i >= 0; i--) {
    const key = flipCh(S[i], flips);
    trace.push({ i, seen: S[i], flips, key, becameO: key === "O" });
    if (key === "O") flips ^= 1;
  }
  const steps = [{ k: "why" }, ...trace.map((_, n) => ({ k: "step", n })), { k: "check" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const done = s.k === "step" ? s.n + 1 : s.k === "check" ? N : 0;
  const keys = Array(N).fill(null);
  trace.slice(0, done).forEach((x) => { keys[x.i] = x.key; });
  const cur = s.k === "step" ? trace[s.n] : null;

  const say =
    s.k === "why" ? t(E,
      <>Now the other direction.<br />We are <b>given S</b> and want the keys.<br />Nothing flips after the <b>last</b> key,<br />so that one key is safe to read straight off S.</>,
      <>이번엔 반대 방향이에요.<br /><b>S 를 받고</b> 친 키를 알아내야 해요.<br /><b>마지막</b> 키 뒤에는 뒤집힘이 없어요.<br />그래서 그 키만은 S 에서 바로 읽어도 돼요.</>)
    : s.k === "step" ? (
      cur.flips === 0
        ? t(E,
            <>Position <b>{cur.i}</b>: no O typed after it yet,<br />so what we see <b>is</b> what was typed → <b>{cur.key}</b>.{cur.becameO ? <><br />It is an O, so from now on later letters are flipped.</> : null}</>,
            <><b>{cur.i}</b>번 자리예요. 뒤쪽에 O 가 아직 짝수 개라<br />보이는 글자가 <b>그대로</b> 친 키예요 → <b>{cur.key}</b>.{cur.becameO ? <><br />이게 O 니까 앞쪽 글자들은 이제 뒤집혀 보여요.</> : null}</>)
        : t(E,
            <>Position <b>{cur.i}</b>: an odd number of O's come after it,<br />so the screen shows it flipped.<br />Un-flip <b>{cur.seen}</b> → the real key is <b>{cur.key}</b>.{cur.becameO ? <><br />That is an O too, so the parity flips back.</> : null}</>,
            /* M 은 받침이 있어 "을", O 는 "를" — 글자가 바뀌니 조사도 같이 */
            <><b>{cur.i}</b>번 자리예요. 뒤쪽 O 가 홀수 개라<br />화면엔 뒤집혀 보여요.<br /><b>{cur.seen}</b>{cur.seen === "M" ? " 을" : " 를"} 되돌리면 진짜 친 키는 <b>{cur.key}</b>.{cur.becameO ? <><br />이것도 O 라 홀짝이 다시 바뀌어요.</> : null}</>))
    : t(E,
      <>All keys recovered: <b>{keys.join("")}</b>.<br />We only ever needed <b>one pass from the back</b>,<br />counting whether the O's so far are odd or even.</>,
      <>친 키를 다 찾았어요. <b>{keys.join("")}</b> 예요.<br /><b>뒤에서 앞으로 한 번</b> 훑기만 하면 돼요.<br />지금까지 본 O 가 홀수인지 짝수인지만 세면서요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Read S backwards to recover the keys", "S 를 거꾸로 읽어 친 키 찾기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "check" ? "aha" : s.k === "why" ? "stuck" : "go"}>{say}</Say>

      <div style={{ maxWidth: 440, margin: "0 auto", display: "grid", gap: 12 }}>
        <div>
          <Label>{t(E, "S — what we see on screen", "S — 화면에 보이는 것")}</Label>
          <Word s={S} size={30} ringAt={cur ? cur.i : null} />
        </div>
        <div>
          <Label color="#7c3aed">{t(E, "keys we recovered", "찾아낸 친 키")}</Label>
          <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
            {keys.map((k, i) => k
              ? <Ch key={i} c={k} size={30} ring={cur && cur.i === i ? "#7c3aed" : null} />
              : <div key={i} style={{ width: 30, height: 30, borderRadius: 8, border: "2px dashed #cbd5e1",
                  color: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>?</div>)}
          </div>
        </div>
        {cur && (
          <div style={{ padding: "9px 13px", borderRadius: 10, background: "#f5f3ff",
            border: "1.5px solid #c4b5fd", fontSize: 12.5, color: "#5b21b6", lineHeight: 1.8,
            textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E, <>O's typed after this spot: <b>{cur.flips === 0 ? "even" : "odd"}</b><br />screen shows <b>{cur.seen}</b> → real key <b>{cur.key}</b></>,
                  <>이 자리보다 뒤에 있는 O 의 개수: <b>{cur.flips === 0 ? "짝수" : "홀수"}</b><br />화면엔 <b>{cur.seen}</b>, 실제로 친 키는 <b>{cur.key}</b></>)}
          </div>
        )}
      </div>
      </StepFade>
      <div style={{ marginTop: 20 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}
