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
    { key: "triples", ko: "서로 다른 무브 (20×19×18)", en: "distinct moves (20×19×18)", v: fmt(TRIPLES) },
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
      <>K 는 20만까지지만 같은 무브가 여러 번 나와요.<br />서로 다른 무브는 <b>20×19×18 = 6,840</b> 개뿐이에요.</>)
    : s.k === "mult" ? t(E,
      <>Scoring one board means checking every triple.<br />So the work is <b>1,000,000 × 6,840 ≈ 7×10⁹</b>.</>,
      <>보드 하나를 채점하려면 무브를 다 봐야 해요.<br />그러니 일의 양은 <b>100만 × 6,840 ≈ 7×10⁹</b> 이에요.</>)
    : t(E,
      <>A computer does roughly <b>10⁸ ~ 10⁹</b> simple steps per second.<br /><b>7×10⁹ does not fit in the time limit.</b><br />The idea is right; it is just too slow at N = 20.</>,
      <>컴퓨터는 1초에 대략 <b>10⁸ ~ 10⁹</b> 번 계산해요.<br /><b>7×10⁹</b> 은 아슬아슬해요 — 빠듯한 숫자예요.<br />그래서 같은 무브를 묶어 줄이고 <b>C++</b> 로 짜면 통과해요.<br />파이썬은 시간이 모자라 부분 점수예요.</>);

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
                  <>1초에 <b>10⁸ ~ 10⁹</b> 번<br />우리는 <b>7×10⁹</b> 번 → 아슬아슬</>)}
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

/* ═══ ③ 숫자 하나 = 보드 하나 (비트마스크 다리) ═══
   student-algorithm 이 실제로 풀어보고 막힌 자리 (2026-09-03):
     "정수 하나(b=5)가 어떻게 이진수로 쪼개져서 각 칸의 M/O 가 되는지를 숫자로 본 적이 없다.
      1-4 에서 '비트마스크' 단어만 한 번 나오고, 코드에 오니 >> 랑 & 가 뭔지부터 막혔다."
   그래서 작은 N=3 으로 숫자 → 칸 을 눈으로 보여준 뒤 >> 와 & 를 그 위에서 설명한다. */
export function BitBoardSim({ E }) {
  const N = 3;
  const bits = (b) => Array.from({ length: N }, (_, i) => (b >> i) & 1);
  const chars = (b) => bits(b).map((v) => (v ? "M" : "O"));
  /* ⚠️ 보통 2진수는 '큰 자리부터' 쓰지만 (b=1 → "001"),
     보드는 0번 칸이 왼쪽이다 (코드가 (b >> i) & 1 로 i번 칸 = i번 비트를 쓰니까).
     그대로 나란히 놓으면 b=1 이 "001" 인데 보드는 "MOO" 라 눈에 어긋나 보인다.
     실제로 8줄 중 4줄이 어긋났다 (student-algorithm 2026-09-04 가 잡음).
     → 여기서는 비트도 **0번 칸부터** 적어서 보드와 방향을 맞춘다. */
  const bin = (b) => bits(b).join("");

  const steps = [{ k: "why" }, ...Array.from({ length: 1 << N }, (_, b) => ({ k: "row", b })),
                 { k: "extract" }, { k: "all" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const shown = s.k === "row" ? s.b : s.k === "why" ? -1 : (1 << N) - 1;
  const EX_B = 5, EX_I = 1;   // b=5 의 1번 칸을 꺼내는 예

  const say =
    s.k === "why" ? t(E,
      <>Each cell is <b>M</b> or <b>O</b> — two choices.<br />So write M as <b>1</b> and O as <b>0</b>.<br />Then a whole board is just <b>one number</b>.</>,
      <>칸마다 <b>M</b> 아니면 <b>O</b> — 둘 중 하나예요.<br />그럼 M 을 <b>1</b>, O 를 <b>0</b> 으로 쓰면요?<br />보드 하나가 <b>숫자 하나</b>가 돼요.<br /><span style={{ fontSize: 11.5, fontWeight: 700, opacity: .8 }}>(비트는 <b>0번 칸부터</b> 적을게요. 보드와 순서를 맞추려고요.)</span></>)
    : s.k === "row" ? t(E,
      <>Number <b>{s.b}</b> in binary is <b>{bin(s.b)}</b> → board <b>{chars(s.b).join("")}</b></>,
      <>숫자 <b>{s.b}</b> 를 2진수로 쓰면 <b>{bin(s.b)}</b> → 보드 <b>{chars(s.b).join("")}</b></>)
    : s.k === "extract" ? t(E,
      <>So how do we read just cell <b>{EX_I}</b> out of <b>b = {EX_B}</b>?<br />
        Push it right {EX_I} step{EX_I > 1 ? "s" : ""}: <b>{EX_B} &gt;&gt; {EX_I}</b> = {EX_B >> EX_I} (binary {(EX_B >> EX_I).toString(2)})<br />
        then keep only the last digit: <b>&amp; 1</b> → <b>{(EX_B >> EX_I) & 1}</b> = {((EX_B >> EX_I) & 1) ? "M" : "O"}</>,
      <>그럼 <b>b = {EX_B}</b> 에서 <b>{EX_I}</b>번 칸만 어떻게 꺼낼까요?<br />
        오른쪽으로 {EX_I}칸 밀어요 — <b>{EX_B} &gt;&gt; {EX_I}</b> = {EX_B >> EX_I} (2진수 {(EX_B >> EX_I).toString(2)})<br />
        그리고 맨 끝자리만 남겨요 — <b>&amp; 1</b> → <b>{(EX_B >> EX_I) & 1}</b> 이니까 {((EX_B >> EX_I) & 1) ? "M" : "O"}</>)
    : t(E,
      <>N = {N} 이면 보드는 <b>{1 << N}</b>개. 숫자 <b>0 … {(1 << N) - 1}</b> 이 전부예요.<br />
        그래서 <b>for b in range(1 &lt;&lt; N)</b> 한 줄이<br /><b>"모든 보드를 다 해본다"</b> 가 돼요.</>,
      <>N = {N} 이면 보드는 <b>{1 << N}</b>개. 숫자 <b>0 … {(1 << N) - 1}</b> 이 전부예요.<br />
        그래서 <b>for b in range(1 &lt;&lt; N)</b> 한 줄이<br /><b>"모든 보드를 다 해본다"</b> 가 돼요.</>);

  const rows = Array.from({ length: 1 << N }, (_, b) => b).filter((b) => b <= shown);

  return (
    <div style={{ padding: 16, paddingBottom: 90 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "One number = one board", "숫자 하나 = 보드 하나")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "all" ? "aha" : s.k === "why" ? "stuck" : "go"}>{say}</Say>

      <div style={{ maxWidth: 330, margin: "0 auto", display: "grid", gap: 5 }}>
        <div style={{ display: "grid", gridTemplateColumns: "42px 60px 1fr", gap: 8,
          fontSize: 10.5, fontWeight: 800, color: "#94a3b8", padding: "0 8px" }}>
          <span>{t(E, "number", "숫자")}</span>
          <span>{t(E, "bits (cell 0 first)", "비트 (0번 칸부터)")}</span>
          <span>{t(E, "board", "보드")}</span>
        </div>
        {rows.map((b) => {
          const cur = s.k === "row" && b === s.b;
          const ex = s.k === "extract" && b === EX_B;
          return (
            <div key={b} style={{ display: "grid", gridTemplateColumns: "42px 60px 1fr", gap: 8,
              alignItems: "center", padding: "5px 8px", borderRadius: 9,
              border: `${cur || ex ? 2 : 1}px solid ${cur ? A : ex ? "#f59e0b" : "#e2e8f0"}`,
              background: cur ? "#f5f3ff" : ex ? "#fffbeb" : "#fff" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 14, color: "#334155" }}>{b}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13, color: "#7c3aed" }}>{bin(b)}</span>
              <span style={{ display: "flex", gap: 3 }}>
                {chars(b).map((c, i) => (
                  <span key={i} style={{ width: 24, height: 24, borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13,
                    background: c === "M" ? MBG : OBG,
                    border: `${ex && i === EX_I ? 2.5 : 1.5}px solid ${ex && i === EX_I ? "#f59e0b" : (c === "M" ? MCOL : OCOL)}`,
                    color: c === "M" ? MCOL : OCOL }}>{c}</span>
                ))}
              </span>
            </div>
          );
        })}
      </div>

      {s.k === "extract" && (
        <div style={{ maxWidth: 330, margin: "12px auto 0", padding: "8px 11px", borderRadius: 9,
          background: "#fffbeb", border: "1.5px solid #fbbf24", textAlign: "center",
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 800, color: "#92400e" }}>
          (b &gt;&gt; i) &amp; 1 &nbsp;→&nbsp; ({EX_B} &gt;&gt; {EX_I}) &amp; 1 = {(EX_B >> EX_I) & 1}
        </div>
      )}
      </StepFade>
      <div style={{ marginTop: 18 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}
