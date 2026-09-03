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
  let flips = 0, oAfter = 0;   // oAfter = 이 자리보다 뒤에서 친 O 의 개수
  for (let i = N - 1; i >= 0; i--) {
    const key = flipCh(S[i], flips);
    trace.push({ i, seen: S[i], flips, oAfter, key, becameO: key === "O" });
    if (key === "O") { flips ^= 1; oAfter += 1; }
  }
  /* 한 자리를 여러 판으로 쪼갠다 — 한 화면에 한 줄만 남기려고
     (선생님 2026-09-03: "시뮬스텝을 올려서라도 더 짧게 써줘") */
  const steps = [{ k: "why" }, { k: "why2" }];
  trace.forEach((x, n) => {
    steps.push({ k: "look", n });                    // 이 자리 뒤쪽 O 의 홀짝
    steps.push({ k: "take", n });                    // 그래서 친 키는?
    if (x.becameO) steps.push({ k: "flip", n });     // O 를 쳤으니 앞쪽이 뒤집힘
  });
  steps.push({ k: "check" });

  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  // 'take' 부터 그 자리의 키가 채워진다
  const filled = s.n == null ? 0 : s.k === "look" ? s.n : s.n + 1;
  const done = s.k === "check" ? N : filled;
  const keys = Array(N).fill(null);
  trace.slice(0, done).forEach((x) => { keys[x.i] = x.key; });
  const cur = s.n == null ? null : trace[s.n];
  const even = cur && cur.flips === 0;

  const say =
    s.k === "why" ? t(E,
      <>Now the other direction —<br />we see <b>S</b> and want the keys.</>,
      <>이번엔 반대 방향이에요.<br /><b>S</b> 를 보고 친 키를 알아내요.</>)
    : s.k === "why2" ? t(E,
      <>A letter only flips when an <b>O</b> is typed <b>after</b> it.<br />Nothing comes after the last key.<br />→ The last letter of S <b>is</b> the last key.</>,
      <>글자는 <b>그 뒤에 O 를 칠 때만</b> 뒤집혀요.<br />마지막 키 뒤에는 친 키가 없죠.<br />→ S 의 마지막 글자가 곧 마지막에 친 키예요.</>)
    : s.k === "look" ? t(E,
      <>Position <b>{cur.i}</b> — O's typed after it: <b>{cur.oAfter}</b> → <b>{even ? "even" : "odd"}</b></>,
      <><b>{cur.i}</b>번 자리 — 뒤쪽에서 친 O 가 <b>{cur.oAfter}개</b> → <b>{even ? "짝수" : "홀수"}</b></>)
    : s.k === "take" ? (even
      ? t(E, <>Even → what we see is the key → <b>{cur.key}</b></>,
             <>짝수니까 보이는 그대로 → 친 키는 <b>{cur.key}</b></>)
      : t(E, <>Odd → un-flip <b>{cur.seen}</b> → <b>{cur.key}</b></>,
             <>홀수니까 <b>{cur.seen}</b>{cur.seen === "M" ? " 을" : " 를"} 되돌려서 → 친 키는 <b>{cur.key}</b></>))
    : s.k === "flip" ? t(E,
      <>That key was <b>O</b> → everything before it now shows flipped ↺</>,
      <>이 키가 <b>O</b> 예요 → 앞쪽 글자들은 이제 뒤집혀 보여요 ↺</>)
    : t(E,
      <>All keys recovered: <b>{keys.join("")}</b><br />One pass from the back, counting O's odd/even.</>,
      <>친 키를 다 찾았어요. <b>{keys.join("")}</b><br />뒤에서 앞으로 한 번, O 홀짝만 세면 끝이에요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Read S backwards to recover the keys", "S 를 거꾸로 읽어 친 키 찾기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "check" ? "aha" : (s.k === "why" || s.k === "why2") ? "stuck" : "go"}>{say}</Say>

      <div style={{ maxWidth: 440, margin: "0 auto", display: "grid", gap: 12 }}>
        <div>
          <Label>{t(E, "S — what we see on screen", "S — 화면에 보이는 것")}</Label>
          <Word s={S} size={30} ringAt={cur ? cur.i : s.k === "why2" ? N - 1 : null} />
        </div>
        {cur && (
          <div style={{ display: "flex", justifyContent: "center", gap: 7, alignItems: "center",
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800 }}>
            <span style={{ color: "#94a3b8" }}>{t(E, "O's typed after here", "뒤쪽에서 친 O")}</span>
            <span style={{ padding: "2px 9px", borderRadius: 7,
              background: even ? "#f0fdf4" : "#fef2f2",
              border: `1.5px solid ${even ? "#86efac" : "#fca5a5"}`,
              color: even ? "#15803d" : "#b91c1c" }}>
              {cur.oAfter}{t(E, "", "개")} · {even ? t(E, "even", "짝수") : t(E, "odd", "홀수")}
            </span>
          </div>
        )}
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
      </div>
      </StepFade>
      <div style={{ marginTop: 20 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}
