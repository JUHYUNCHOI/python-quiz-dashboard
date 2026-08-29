"use client";

/* Moo Hunt (Jan 2026 Bronze #2) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
   건드리지 않고 여기에만.

   전엔 시뮬이 없어서 채점 과정이 한 화면에 표로 통째로 있었다
   (2026-08-18 감사 메모: "브루트 한계 1M×6840 스텝 + 개념 시뮬" 필요).

   ① ScoreBoardSim — 보드 MOOOM 을 무브마다 채점 (샘플 1 그대로, 답 4점)
   ② BruteLimitSim — 왜 완전탐색이 큰 케이스에서 시간초과인지 단계로
   값은 전부 그 자리에서 계산 — 표와 어긋날 수 없다. */

import { t } from "@/components/quest/theme";
import { StepFade } from "@/components/quest/StepFade";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#8b5cf6";
const MCOL = "#dc2626", MBG = "#fef2f2";
const OCOL = "#2563eb", OBG = "#eff6ff";

/* 샘플 1 — N=5, K=6. 보드 MOOOM 은 4점 (완전탐색으로 확인) */
const BOARD = "MOOOM";
const MOVES = [[1, 2, 3], [1, 2, 3], [1, 3, 5], [2, 3, 4], [5, 3, 2], [5, 2, 3]];

function Cell({ c, i, hl = null }) {
  const col = c === "M" ? MCOL : OCOL;
  const bg = c === "M" ? MBG : OBG;
  const ring = hl === "x" ? "#16a34a" : hl === "yz" ? "#f59e0b" : null;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <div style={{ width: 38, height: 38, borderRadius: 9, background: bg,
        border: `${ring ? 3 : 2}px solid ${ring || col}`, color: col,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 18 }}>{c}</div>
      <div style={{ fontSize: 10, fontWeight: 800, color: ring || "#cbd5e1" }}>{i + 1}</div>
    </div>
  );
}
function Say({ children, tone = "go" }) {
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#f5f3ff", bd: "#c4b5fd", fg: "#5b21b6" };
  return (
    <div style={{ maxWidth: 470, margin: "6px auto 14px", padding: "11px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg, fontSize: 13.5, fontWeight: 700,
      textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.75 }}>{children}</div>
  );
}

/* ═══ ① 보드 하나를 무브마다 채점 ═══ */
export function ScoreBoardSim({ E }) {
  const steps = MOVES.map((_, i) => ({ i })).concat([{ i: MOVES.length }]);
  const ts = useTraceStep(steps);
  const cur = steps[ts.safe].i;
  const done = cur >= MOVES.length;

  const hit = (m) => BOARD[m[0] - 1] === "M" && BOARD[m[1] - 1] === "O" && BOARD[m[2] - 1] === "O";
  const total = MOVES.slice(0, Math.min(cur + 1, MOVES.length)).filter(hit).length;
  const finalScore = MOVES.filter(hit).length;
  const m = done ? null : MOVES[cur];
  const ok = m ? hit(m) : false;

  const hlOf = (idx) => {
    if (!m) return null;
    if (idx === m[0] - 1) return "x";
    if (idx === m[1] - 1 || idx === m[2] - 1) return "yz";
    return null;
  };

  const say = done
    ? t(E, <>Every move checked. Board <b>{BOARD}</b> scores <b>{finalScore}</b>.<br />That is one board. There are many more to try.</>,
          <>무브를 다 봤어요. 보드 <b>{BOARD}</b> 은 <b>{finalScore}점</b>이에요.<br />이건 보드 하나예요. 아직 볼 보드가 많아요.</>)
    : ok
      ? t(E, <>Move <b>({m.join(", ")})</b>: cell {m[0]} is <b style={{ color: MCOL }}>M</b>, cells {m[1]} and {m[2]} are <b style={{ color: OCOL }}>O</b>.<br />That reads MOO → <b style={{ color: "#15803d" }}>+1 point</b>.</>,
            <>무브 <b>({m.join(", ")})</b> 예요. {m[0]}번 칸이 <b style={{ color: MCOL }}>M</b>, {m[1]}번과 {m[2]}번이 <b style={{ color: OCOL }}>O</b> 예요.<br />MOO 가 되니까 <b style={{ color: "#15803d" }}>1점</b>이에요.</>)
      : t(E, <>Move <b>({m.join(", ")})</b> reads <b>{[m[0], m[1], m[2]].map((p) => BOARD[p - 1]).join("·")}</b>.<br />That is not MOO → <b style={{ color: MCOL }}>no point</b>.</>,
            <>무브 <b>({m.join(", ")})</b> 는 <b>{[m[0], m[1], m[2]].map((p) => BOARD[p - 1]).join("·")}</b> 로 읽혀요.<br />MOO 가 아니라서 <b style={{ color: MCOL }}>점수가 없어요</b>.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, `Score the board ${BOARD}, move by move`, `보드 ${BOARD} 을 무브마다 채점해요`)}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={done ? "aha" : ok ? "go" : "stuck"}>{say}</Say>

      <div style={{ display: "flex", gap: 7, justifyContent: "center", marginBottom: 14 }}>
        {BOARD.split("").map((c, i) => <Cell key={i} c={c} i={i} hl={hlOf(i)} />)}
      </div>

      <div style={{ maxWidth: 380, margin: "0 auto", display: "grid", gap: 4 }}>
        {MOVES.map((mv, i) => {
          const seen = i <= cur;
          const good = hit(mv);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 11px",
              borderRadius: 8, fontSize: 12, fontFamily: "'JetBrains Mono',monospace",
              border: `${i === cur ? 2 : 1}px solid ${i === cur ? A : "#e2e8f0"}`,
              background: !seen ? "#fff" : good ? "#f0fdf4" : "#fef2f2",
              opacity: seen ? 1 : 0.35 }}>
              <span style={{ fontWeight: 800, color: "#334155", minWidth: 62 }}>({mv.join(",")})</span>
              <span style={{ flex: 1, color: "#64748b" }}>
                {seen ? mv.map((p) => BOARD[p - 1]).join("·") : "…"}
              </span>
              <span style={{ fontWeight: 800, color: good ? "#15803d" : "#dc2626" }}>
                {seen ? (good ? "+1" : "—") : ""}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 800, color: "#5b21b6" }}>
        {t(E, "score so far", "지금까지 점수")} {total}
      </div>
      </StepFade>
      <div style={{ marginTop: 18 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ═══ ② 완전탐색의 한계 — 왜 큰 케이스에서 시간이 모자라나 ═══ */
export function BruteLimitSim({ E }) {
  const steps = [{ k: "idea" }, { k: "boards" }, { k: "triples" }, { k: "mult" }, { k: "limit" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const BOARDS = 1 << 20;             // 1,048,576
  const TRIPLES = 20 * 19 * 18;       // 6,840
  const TOTAL = BOARDS * TRIPLES;     // 약 7.2×10⁹
  const fmt = (n) => n.toLocaleString("en-US");

  const rows = [
    { key: "boards", ko: "보드 개수 (2²⁰)", en: "boards (2²⁰)", v: fmt(BOARDS) },
    { key: "triples", ko: "서로 다른 삼중쌍 (20×19×18)", en: "distinct triples (20×19×18)", v: fmt(TRIPLES) },
    { key: "mult", ko: "곱하면 검사 횟수", en: "multiply → checks", v: "≈ 7×10⁹", bad: true },
  ];
  const upto = { idea: 0, boards: 1, triples: 2, mult: 3, limit: 3 }[s.k];

  const say =
    s.k === "idea" ? t(E,
      <>The plan is simple.<br />Make <b>every</b> board, score each one, keep the best.<br />Will it finish in time?</>,
      <>방법은 간단해요.<br /><b>모든</b> 보드를 만들어 하나씩 채점하고 제일 높은 걸 고르는 거예요.<br />시간 안에 끝날까요?</>)
    : s.k === "boards" ? t(E,
      <>Each cell is M or O, and N can be 20.<br />So there are <b>2²⁰ ≈ 1 million</b> boards.</>,
      <>칸마다 M 아니면 O 이고 N 은 20까지 가요.<br />그래서 보드는 <b>2²⁰ ≈ 100만</b> 개예요.</>)
    : s.k === "triples" ? t(E,
      <>K can be 200,000, but the same triple repeats.<br />Distinct ordered triples are only <b>20×19×18 = 6,840</b>.</>,
      <>K 는 20만까지지만 같은 삼중쌍이 반복돼요.<br />서로 다른 삼중쌍은 <b>20×19×18 = 6,840</b> 개뿐이에요.</>)
    : s.k === "mult" ? t(E,
      <>Scoring one board means checking every triple.<br />So the work is <b>1,000,000 × 6,840 ≈ 7×10⁹</b>.</>,
      <>보드 하나를 채점하려면 삼중쌍을 다 봐야 해요.<br />그러니 일의 양은 <b>100만 × 6,840 ≈ 7×10⁹</b> 이에요.</>)
    : t(E,
      <>A computer does roughly <b>10⁸ ~ 10⁹</b> simple steps per second.<br /><b>7×10⁹ does not fit in the time limit.</b><br />The idea is right; it is just too slow at N = 20.</>,
      <>컴퓨터는 1초에 대략 <b>10⁸ ~ 10⁹</b> 번 계산해요.<br /><b>7×10⁹ 는 제한 시간 안에 안 들어와요.</b><br />생각은 맞아요. N = 20 에서 너무 느릴 뿐이에요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Will brute force finish in time?", "완전탐색, 시간 안에 끝날까요?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "limit" ? "stuck" : s.k === "idea" ? "go" : "aha"}>{say}</Say>

      <div style={{ maxWidth: 420, margin: "0 auto", display: "grid", gap: 6 }}>
        {rows.slice(0, upto).map((r) => (
          <div key={r.key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 13px",
            borderRadius: 9, border: `1.5px solid ${r.bad ? "#fca5a5" : "#e2e8f0"}`,
            background: r.bad ? "#fef2f2" : "#fff", fontSize: 12.5,
            wordBreak: "keep-all", textWrap: "balance" }}>
            <span style={{ flex: 1, color: "#475569", fontWeight: 700 }}>{t(E, r.en, r.ko)}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
              color: r.bad ? "#dc2626" : "#334155", whiteSpace: "nowrap" }}>{r.v}</span>
          </div>
        ))}
        {s.k === "limit" && (
          <div style={{ marginTop: 6, padding: "10px 14px", borderRadius: 10, background: "#fffbeb",
            border: "1.5px solid #fbbf24", fontSize: 12.5, color: "#92400e", lineHeight: 1.85,
            textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E, <>1 second ≈ <b>10⁸ ~ 10⁹</b> steps<br />we need <b>7×10⁹</b> → too slow</>,
                  <>1초에 <b>10⁸ ~ 10⁹</b> 번<br />우리는 <b>7×10⁹</b> 번 필요 → 너무 느려요</>)}
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
