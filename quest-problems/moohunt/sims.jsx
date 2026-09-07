"use client";

/* Moo Hunt (Jan 2026 Bronze #2) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
   건드리지 않고 여기에만.

   전엔 시뮬이 없어서 채점 과정이 한 화면에 표로 통째로 있었다
   (2026-08-18 감사 메모: "브루트 한계 1M×6840 스텝 + 개념 시뮬" 필요).

   ① ScoreBoardSim — 보드 MOOOM 을 무브마다 채점 (샘플 1 그대로, 답 4점)
   ② BruteLimitSim — 왜 완전탐색이 큰 케이스에서 시간초과인지 단계로
   ⑤ BruteRunSim  — 그 완전탐색을 **진짜로 돌려서** 느림을 체감 (숫자는 전부 실측)
   값은 전부 그 자리에서 계산 — 표와 어긋날 수 없다. */

import { Fragment, useEffect, useState, useRef } from "react";
import { t } from "@/components/quest/theme";
import { StepFade } from "@/components/quest/StepFade";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#8b5cf6";
const MCOL = "#dc2626", MBG = "#fef2f2";
const OCOL = "#2563eb", OBG = "#eff6ff";

/* 단계가 바뀌면 말풍선(과 그 아래 설명되는 줄)을 화면 안으로 데려온다.
   sticky 를 버린 대신 이것이 "설명이 화면 밖으로 나가는" 문제를 맡는다.
   block:"center" 라야 말풍선 **아래** 줄까지 같이 보인다 ("nearest" 는 말풍선만 걸친다). */
function useKeepInView(dep) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const q = el.getBoundingClientRect();
    // 이미 편하게 보이면 건드리지 않는다 — 멀쩡한 화면을 흔들지 않으려고.
    if (q.top > 60 && q.bottom < window.innerHeight - 180) return;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [dep]);
  return ref;
}

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
/* 말풍선.

   2026-09-07 선생님 (스크린샷과 함께):
     "막상 말풍선이 설명을 봐야할곳에 뜨지도 않고 보여야 하는 글자를 가리고 있어."
   그전에는 `position: sticky, top: 104` 였다. 표가 길어지면 설명이 화면 밖으로
   나가는 걸 막으려고 붙인 건데, 대신 두 가지가 망가졌다.
     ① 스크롤하면 말풍선이 아래로 미끄러져 **표 머리글(숫자·비트·보드)을 덮었다.**
     ② 설명하는 줄은 표 맨 아래(5번)인데 말풍선은 화면 맨 위에 떠 있었다.
        읽을 곳과 볼 곳이 따로 놀았다.

   그래서 sticky 를 버리고, **설명하는 줄 바로 위**에 끼워 넣는다.
   CodeWalk 이 이미 그렇게 한다 (선생님 2026-08-10: 말풍선을 위에 고정하지 말고
   진짜 설명되는 코드 줄 위에 띄우기). 화면 밖으로 나가는 문제는 sticky 가 아니라
   `scrollIntoView` 로 푼다 — 단계가 바뀌면 말풍선+그 줄을 화면 안으로 데려온다.
   ⚠️ 박스 안 스크롤은 쓰지 않는다 (quest_problem_standard.md:561 안티패턴). */
function Say({ children, tone = "go", inRow = false }) {
  /* inRow — 표의 '지금 설명하는 줄' 바로 위에 끼워 넣는 말풍선.

     2026-09-07 선생님: "너무 말풍선같지 않고 색도 같은 보라색인것 같은 생각이 드는데"
     맞다. 네모난 연보라 상자였는데 바로 아래 밝아진 줄도 연보라라, 말이 아니라
     **표의 한 줄**처럼 보였다.
     그래서 CodeWalk 이 쓰는 모양을 그대로 가져온다 (이미 선생님이 보신 모양이다):
       · 노란 바탕 — 아래 줄(보라)과 색이 갈린다
       · 💬 + 왼쪽 정렬 — 누가 말하는 것처럼
       · 아래를 가리키는 꼬리 — 어느 줄 얘기인지 손가락질한다
       · 그림자 — 표 위에 떠 있는 것으로 읽힌다
     결론이 난 단계(aha)만 초록. CodeWalk 과 같은 두 가지 상태다. */
  if (inRow) {
    const done = tone === "aha";
    const bd = done ? "#6ee7b7" : "#fbbf24";
    return (
      <div style={{ margin: "6px 2px 8px" }}>
        <div style={{
          background: done ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${bd}`,
          borderRadius: 12, padding: "9px 13px", fontSize: 13,
          color: done ? "#065f46" : "#92400e", lineHeight: 1.6, fontWeight: 600,
          wordBreak: "keep-all", textWrap: "balance",
          boxShadow: "0 6px 16px rgba(0,0,0,.16)",
        }}>💬 {children}</div>
        {/* 아래 줄을 가리키는 꼬리 */}
        <div style={{ width: 0, height: 0, marginLeft: 26,
          borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
          borderTop: `9px solid ${bd}` }} />
      </div>
    );
  }
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#f5f3ff", bd: "#c4b5fd", fg: "#5b21b6" };
  return (
    <div style={{
      maxWidth: 470, margin: "6px auto 14px", padding: "11px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg, fontSize: 13.5, fontWeight: 700,
      textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.75,
      boxShadow: "0 2px 10px rgba(0,0,0,.06)" }}>{children}</div>
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

  const sayRef = useKeepInView(ts.safe);
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
      {/* 무브를 다 본 마지막 단계는 특정 줄 얘기가 아니라 표 위에 둔다. */}
      {done && <div ref={sayRef}><Say tone="aha">{say}</Say></div>}

      <div style={{ display: "flex", gap: 7, justifyContent: "center", marginBottom: 14 }}>
        {BOARD.split("").map((c, i) => <Cell key={i} c={c} i={i} hl={hlOf(i)} />)}
      </div>

      <div style={{ maxWidth: 380, margin: "0 auto", display: "grid", gap: 4 }}>
        {MOVES.map((mv, i) => {
          const seen = i <= cur;
          const good = hit(mv);
          return (
            <Fragment key={i}>
            {!done && i === cur && (
              <div ref={sayRef}><Say inRow tone={ok ? "go" : "stuck"}>{say}</Say></div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 11px",
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
            </Fragment>
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
  /* 2026-09-07: 5단계 → 3단계.
     "보드 2^N 개" 와 "무브 6,840 개" 는 바로 앞 퀴즈(1-4)와 입력(1-5)에서
     학생이 직접 답한 수다. 여기서 또 한 단계씩 유도하면 같은 말을 세 번 하게 된다.
     이제 두 수를 한 번에 놓고 곱하기만 한다. */
  /* 2026-09-07: "다 해보자" 선언은 앞 페이지(1-3b)로 옮겼다. 여기 남기면 같은 말을 두 번 한다.
     이 시뮬은 이제 **재보는 일**만 한다: 곱하기 → 제한과 비교. */
  const steps = [{ k: "mult" }, { k: "limit" }];
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
  const upto = { mult: 3, limit: 3 }[s.k];
  const sayRef = useKeepInView(ts.safe);

  const say =
    s.k === "mult" ? t(E,
      <>You counted both numbers already.<br />Scoring one board means checking every move —<br />so the work is <b>1,000,000 × 6,840 ≈ 7×10⁹</b>.</>,
      <>두 수는 방금 직접 셌어요.<br />보드 하나를 채점하려면 무브를 다 봐야 하니까 —<br />일의 양은 <b>100만 × 6,840 ≈ 7×10⁹</b> 이에요.</>)
    : t(E,
      <>A computer does about <b>10⁸ ~ 10⁹</b> steps a second.<br /><b>7×10⁹</b> is more than that.<br />Is it really too slow? Let's run it and see.</>,
      <>컴퓨터는 1초에 <b>10⁸ ~ 10⁹</b> 번쯤 계산해요.<br /><b>7×10⁹</b> 은 그보다 많아요.<br />정말 느린지, 직접 돌려서 봐요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Will brute force finish in time?", "완전탐색, 시간 안에 끝날까요?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <div ref={sayRef}>
        <Say tone={s.k === "limit" ? "stuck" : "aha"}>{say}</Say>
      </div>

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
                 { k: "extract" }, { k: "shift" }, { k: "all" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const shown = s.k === "row" ? s.b : s.k === "why" ? -1 : (1 << N) - 1;
  const bubbleTone = s.k === "all" ? "aha" : s.k === "why" ? "stuck" : "go";
  const EX_B = 5, EX_I = 1;   // b=5 의 1번 칸을 꺼내는 예

  const say =
    s.k === "why" ? t(E,
      <>Each cell is <b>M</b> or <b>O</b> — two choices.<br />So write M as <b>1</b> and O as <b>0</b>.<br />Then a whole board is just <b>one number</b>.</>,
      <>칸마다 <b>M</b> 아니면 <b>O</b> — 둘 중 하나예요.<br />그럼 M 을 <b>1</b>, O 를 <b>0</b> 으로 쓰면요?<br />보드 하나가 <b>숫자 하나</b>가 돼요.<br /><span style={{ fontSize: 11.5, fontWeight: 700, opacity: .8 }}>(비트는 <b>0번 칸부터</b> 적을게요. 보드와 순서를 맞추려고요.)</span></>)
    : s.k === "row" ? t(E,
      <>Number <b>{s.b}</b> in binary is <b>{bin(s.b)}</b> → board <b>{chars(s.b).join("")}</b></>,
      <>숫자 <b>{s.b}</b> 를 2진수로 쓰면 <b>{bin(s.b)}</b> → 보드 <b>{chars(s.b).join("")}</b></>)
    : s.k === "extract" ? t(E,
      <>So how do we read just cell <b>{EX_I}</b> out of <b>b = {EX_B}</b> (= <b>{chars(EX_B).join("")}</b>)?<br />
        <b>①</b> <b>Drop</b> the first {EX_I} cell{EX_I > 1 ? "s" : ""} — now cell {EX_I} sits at the front.<br />
        <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>{chars(EX_B).join("")} → {chars(EX_B).slice(EX_I).join("")}</span> · that is <b>{EX_B} &gt;&gt; {EX_I}</b>.<br />
        <b>②</b> Now just look at the <b>front cell</b> — that is <b>&amp; 1</b>.<br />
        Answer: <b>{((EX_B >> EX_I) & 1) ? "M" : "O"}</b> — same as cell {EX_I} in the table above.</>,
      <>그럼 <b>b = {EX_B}</b>(= <b>{chars(EX_B).join("")}</b>) 에서 <b>{EX_I}</b>번 칸만 어떻게 꺼낼까요?<br />
        <b>①</b> 앞의 {EX_I}칸을 <b>버려요</b> — 그러면 {EX_I}번 칸이 맨 앞으로 와요.<br />
        <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>{chars(EX_B).join("")} → {chars(EX_B).slice(EX_I).join("")}</span> · 이게 <b>{EX_B} &gt;&gt; {EX_I}</b> 예요.<br />
        <b>②</b> 이제 <b>맨 앞 한 칸</b>만 보면 돼요 — 이게 <b>&amp; 1</b> 이에요.<br />
        답: <b>{((EX_B >> EX_I) & 1) ? "M" : "O"}</b> — 위 표의 {EX_I}번 칸과 같죠?</>)
    : s.k === "shift" ? t(E,
      <>One more sign: <b>&lt;&lt;</b>. It is <b>&gt;&gt;</b> the other way.<br />
        <b>&gt;&gt;</b> drops cells from the front; <b>&lt;&lt;</b> <b>adds empty cells at the front</b>.<br />
        <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>1 = M &nbsp;→&nbsp; 1 &lt;&lt; {N} = OOO<b>M</b> = {1 << N}</span><br />
        Each added cell doubles it, so <b>1 &lt;&lt; {N} = 2<sup>{N}</sup> = {1 << N}</b>.</>,
      <>기호 하나만 더요. <b>&lt;&lt;</b> 는 <b>&gt;&gt;</b> 를 뒤집은 거예요.<br />
        <b>&gt;&gt;</b> 는 앞 칸을 버리고, <b>&lt;&lt;</b> 는 <b>앞에 빈 칸을 붙여요.</b><br />
        <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>1 = M &nbsp;→&nbsp; 1 &lt;&lt; {N} = OOO<b>M</b> = {1 << N}</span><br />
        칸이 하나 붙을 때마다 두 배가 되니까 <b>1 &lt;&lt; {N} = 2<sup>{N}</sup> = {1 << N}</b> 이에요.</>)
    : t(E,
      <>With N = {N} there are <b>{1 << N}</b> boards — the numbers <b>0 … {(1 << N) - 1}</b>, all of them.<br />
        So the single line <b>for b in range(1 &lt;&lt; N)</b><br />means <b>"try every board"</b>.</>,
      <>N = {N} 이면 보드는 <b>{1 << N}</b>개. 숫자 <b>0 … {(1 << N) - 1}</b> 이 전부예요.<br />
        그래서 <b>for b in range(1 &lt;&lt; N)</b> 한 줄이<br /><b>"모든 보드를 다 해본다"</b> 가 돼요.</>);

  const rows = Array.from({ length: 1 << N }, (_, b) => b).filter((b) => b <= shown);
  /* 말풍선이 붙을 줄. "5를 2진수로 쓰면…" 은 5번 줄 위에 있어야 읽힌다.
     why/all 단계는 특정 줄 얘기가 아니라 표 위에 둔다. */
  const bubbleAt = s.k === "row" ? s.b : s.k === "extract" ? EX_B : null;
  // shift 단계는 특정 줄 얘기가 아니라 표 위에 둔다 (bubbleAt === null 경로)
  const sayRef = useKeepInView(ts.safe);

  return (
    <div style={{ padding: 16, paddingBottom: 90 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "One number = one board", "숫자 하나 = 보드 하나")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      {bubbleAt === null && (
        <div ref={sayRef}>
          <Say tone={bubbleTone}>{say}</Say>
        </div>
      )}

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
            <Fragment key={b}>
            {bubbleAt === b && (
              <div ref={sayRef}>
                <Say inRow tone={ex ? "aha" : "go"}>{say}</Say>
                {ex && (
                  <div style={{ maxWidth: 330, margin: "0 auto 8px", padding: "7px 11px", borderRadius: 9,
                    background: "#fffbeb", border: "1.5px solid #fbbf24", textAlign: "center",
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 800, color: "#92400e" }}>
                    (b &gt;&gt; i) &amp; 1 &nbsp;→&nbsp; ({EX_B} &gt;&gt; {EX_I}) &amp; 1 = {(EX_B >> EX_I) & 1}
                  </div>
                )}
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "42px 60px 1fr", gap: 8,
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
            </Fragment>
          );
        })}
      </div>

      </StepFade>
      <div style={{ marginTop: 18 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ③ FasterIdeaSim — 왜 더 빨라지는가 (2026-09-04 추가).
   pedagogy-reviewer 지적: "한계(결-b)까지만 있고 더 빠른 방법(결-c)이 없다."
   usaco.org 공식 답안(Jan 2026 Bronze #2, cpid 1564)의 핵심을 단계로 쪼갠 것.
   숫자는 전부 그 자리에서 계산 — 글과 어긋날 수 없다. */
export function FasterIdeaSim({ E }) {
  const steps = [{ k: "board" }, { k: "waste" }, { k: "order" }, { k: "only" }, { k: "gain" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  // 작은 보드 하나를 놓고 본다 — M O O O M (1번·5번이 M)
  const BOARD = "MOOOM";
  const N = BOARD.length;
  const mPos = [...BOARD].map((c, i) => (c === "M" ? i : -1)).filter((i) => i >= 0);
  const oPos = [...BOARD].map((c, i) => (c === "O" ? i : -1)).filter((i) => i >= 0);

  const allMoves = N * (N - 1) * (N - 2);                       // 60
  const pairs = (oPos.length * (oPos.length - 1)) / 2;          // C(3,2) = 3
  const canScore = mPos.length * pairs;                         // 2 × 3 = 6

  // N = 20 일 때 — 보드마다 평균 몇 개나 보나
  const BIG_ALL = 20 * 19 * 18;                                 // 6,840
  let acc = 0;
  for (let m = 0; m <= 20; m++) {
    const o = 20 - m;
    let c = 1;                                                  // C(20, m)
    for (let i = 0; i < m; i++) c = (c * (20 - i)) / (i + 1);
    acc += c * m * ((o * (o - 1)) / 2);
  }
  const BIG_AVG = Math.round(acc / Math.pow(2, 20));            // 428
  const gain = Math.round(BIG_ALL / BIG_AVG);

  const say =
    s.k === "board" ? t(E,
      <>Suppose the board is already decided — <b>M O O O M</b>.<br />Now score it.</>,
      <>보드가 이미 정해졌다고 해봐요 — <b>M O O O M</b>.<br />이제 이 보드를 채점해요.</>)
    : s.k === "waste" ? t(E,
      <>The brute force checks <b>all {allMoves}</b> moves.<br />But cell 1 is M — any move asking cell 1 to be O <b>cannot score</b>.<br />Most checks are wasted.</>,
      <>완전탐색은 무브 <b>{allMoves}개를 전부</b> 봐요.<br />그런데 1번 칸은 M 이에요. 1번이 O 여야 하는 무브는 <b>애초에 득점 못 해요</b>.<br />대부분이 헛수고예요.</>)
    : s.k === "order" ? t(E,
      <>First — y and z just both need to be O.<br />So <b>(1,2,3) and (1,3,2) are the same</b> for scoring.<br />Count them together.</>,
      <>먼저 — y 와 z 는 <b>둘 다 O 이기만</b> 하면 돼요.<br />그러니 <b>(1,2,3) 과 (1,3,2) 는 채점에선 같은 것</b>이에요.<br />묶어서 세면 돼요.</>)
    : s.k === "only" ? t(E,
      <>So don't look at every move. Look only at what <b>can</b> score:<br />one <b>M</b> cell + two <b>O</b> cells.<br />Here that is {mPos.length} × {pairs} = <b>{canScore}</b>, not {allMoves}.</>,
      <>그러니 무브를 다 보지 말고, <b>득점할 수 있는 것만</b> 봐요.<br /><b>M</b> 자리 하나 + <b>O</b> 자리 둘.<br />여기선 {mPos.length} × {pairs} = <b>{canScore}개</b>예요. {allMoves}개가 아니라요.</>)
    : t(E,
      <>At N = 20 the same trick cuts <b>{BIG_ALL.toLocaleString("en-US")}</b> down to about <b>{BIG_AVG}</b> per board.<br />Roughly <b>{gain}× less work</b> — and the answer is identical.</>,
      <>N = 20 에서도 똑같아요. 보드마다 <b>{BIG_ALL.toLocaleString("en-US")}개</b> 보던 걸 평균 <b>{BIG_AVG}개</b>만 봐요.<br />일이 <b>약 {gain}배</b> 줄어요. 답은 똑같고요.</>);

  const cellStyle = (c, dim) => ({
    width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 15,
    background: dim ? "#f8fafc" : c === "M" ? MBG : OBG,
    border: `2px solid ${dim ? "#e2e8f0" : c === "M" ? MCOL : OCOL}`,
    color: dim ? "#cbd5e1" : c === "M" ? MCOL : OCOL,
  });

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Can we check fewer moves?", "무브를 더 적게 볼 수 없을까?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.k === "waste" ? "stuck" : s.k === "gain" ? "aha" : "go"}>{say}</Say>

      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 14 }}>
        {[...BOARD].map((c, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={cellStyle(c, false)}>{c}</div>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#f59e0b" }}>{i + 1}</span>
          </div>
        ))}
      </div>

      {(s.k === "only" || s.k === "gain") && (
        <div style={{ maxWidth: 420, margin: "0 auto", display: "grid", gap: 6 }}>
          <Row E={E} ko="M 자리 (여기서 x 를 고름)" en="M cells (pick x here)"
               v={mPos.map((i) => i + 1).join(", ")} />
          <Row E={E} ko="O 자리 (여기서 y, z 를 고름)" en="O cells (pick y, z here)"
               v={oPos.map((i) => i + 1).join(", ")} />
          <Row E={E} ko="봐야 할 조합" en="combinations to check" v={`${canScore}`} good />
          <Row E={E} ko="완전탐색이 보던 것" en="brute force looked at" v={`${allMoves}`} bad />
        </div>
      )}
      {s.k === "gain" && (
        <div style={{ maxWidth: 420, margin: "10px auto 0", padding: "10px 14px", borderRadius: 10,
          background: "#ecfdf5", border: "1.5px solid #34d399", fontSize: 12.5, color: "#065f46",
          lineHeight: 1.85, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
          {t(E, <>N = 20 : <b>{BIG_ALL.toLocaleString("en-US")}</b> → about <b>{BIG_AVG}</b> per board</>,
                <>N = 20 : 보드마다 <b>{BIG_ALL.toLocaleString("en-US")}</b> → 약 <b>{BIG_AVG}</b></>)}
        </div>
      )}
      </StepFade>
      <div style={{ marginTop: 18 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

function Row({ E, ko, en, v, good, bad }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 13px", borderRadius: 9,
      border: `1.5px solid ${bad ? "#fca5a5" : good ? "#6ee7b7" : "#e2e8f0"}`,
      background: bad ? "#fef2f2" : good ? "#ecfdf5" : "#fff", fontSize: 12.5,
      wordBreak: "keep-all", textWrap: "balance" }}>
      <span style={{ flex: 1, color: "#475569", fontWeight: 700 }}>{t(E, en, ko)}</span>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
        color: bad ? "#dc2626" : good ? "#059669" : "#334155", whiteSpace: "nowrap" }}>{v}</span>
    </div>
  );
}

/* ═══ ⑤ BruteRunSim — 완전탐색을 진짜로 돌려본다 ═══════════════════
   왜 (2026-09-07): 한계를 숫자표로만 보여주고 있었다. 학생이 "7×10⁹" 을 읽어도
   그게 얼마나 오래인지는 안 와닿는다. quest_problem_standard.md:205 "체감하는 느림":
   async + live 진행 + Stop, 그리고 "실제 N 에서 얼마나 걸릴지" 추정.

   ⚠️ 여기 나오는 숫자는 전부 **이 브라우저에서 방금 잰 것**이다. 추정치도 잰 속도로
   나눈 값이고 화면에 "이 속도라면" 이라고 적는다. 지어낸 수치가 없어야 한다.

   돌리는 건 진짜 완전탐색이다 — 보드 2^N 개를 하나씩 만들어, 서로 다른 무브
   N(N-1)(N-2) 개를 전부 검사한다. 무브를 이미 중복 제거한 **가장 좋은** 완전탐색인데도
   N=20 에서 안 끝난다는 게 이 화면의 요점이다.
   무브 (x,y,z) 판정: x 칸이 M, y·z 칸이 O →  (b & need) === want.  */
const RUN_NS = [8, 12, 16, 20];
const RUN_MS = 4000;          // N=20 은 안 끝난다. 4초까지만 돌리고 멈춘다.

function buildMoves(n) {
  const need = [], want = [];
  for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) for (let z = 0; z < n; z++) {
    if (x === y || y === z || x === z) continue;
    need.push((1 << x) | (1 << y) | (1 << z));
    want.push(1 << x);
  }
  return { need: Int32Array.from(need), want: Int32Array.from(want) };
}

export function BruteRunSim({ E }) {
  const [n, setN] = useState(12);
  const [state, setState] = useState("idle");     // idle | running | done | stopped | timeout
  const [done, setDone] = useState(0);            // 채점 끝낸 보드 수
  const [best, setBest] = useState(0);
  const [ms, setMs] = useState(0);
  const stopRef = useRef(false);

  const totalBoards = 2 ** n;
  const moveCount = n * (n - 1) * (n - 2);
  const totalChecks = totalBoards * moveCount;
  const fmt = (v) => v.toLocaleString("en-US");

  const reset = () => { stopRef.current = true; setState("idle"); setDone(0); setBest(0); setMs(0); };
  const pick = (v) => { reset(); setN(v); };

  const run = () => {
    stopRef.current = false;
    setState("running"); setDone(0); setBest(0); setMs(0);
    const { need, want } = buildMoves(n);
    const M = need.length;
    const t0 = performance.now();
    let b = 0, hi = 0;

    const chunk = () => {
      if (stopRef.current) return;
      const slice0 = performance.now();
      // 30ms 씩만 돌고 화면에 제어를 돌려준다 — 안 그러면 브라우저가 얼어붙는다.
      while (b < totalBoards && performance.now() - slice0 < 30) {
        let sc = 0;
        for (let j = 0; j < M; j++) if ((b & need[j]) === want[j]) sc++;
        if (sc > hi) hi = sc;
        b++;
      }
      const el = performance.now() - t0;
      setDone(b); setBest(hi); setMs(el);
      if (b >= totalBoards) { setState("done"); return; }
      if (el > RUN_MS) { setState("timeout"); return; }
      setTimeout(chunk, 0);
    };
    setTimeout(chunk, 0);
  };

  const stop = () => { stopRef.current = true; setState("stopped"); };

  const pct = totalBoards ? (done / totalBoards) * 100 : 0;
  const rate = ms > 0 ? (done * moveCount) / (ms / 1000) : 0;      // 초당 검사 횟수 (실측)
  const eta = rate > 0 ? totalChecks / rate : 0;                    // 초
  const etaText = eta < 60 ? t(E, `about ${eta.toFixed(1)} s`, `약 ${eta.toFixed(1)}초`)
    : eta < 3600 ? t(E, `about ${(eta / 60).toFixed(1)} min`, `약 ${(eta / 60).toFixed(1)}분`)
    : t(E, `about ${(eta / 3600).toFixed(1)} h`, `약 ${(eta / 3600).toFixed(1)}시간`);

  const say =
    state === "idle" ? t(E,
      <>Pick an N and press <b>Run</b>.<br />It really builds every board and scores it, right here.</>,
      <>N 을 고르고 <b>돌리기</b> 를 눌러요.<br />여기서 진짜로 보드를 다 만들어 채점해요.</>)
    : state === "running" ? t(E,
      <>Running… <b>{pct.toFixed(pct < 1 ? 3 : 1)}%</b> of the boards done.</>,
      <>돌리는 중… 보드의 <b>{pct.toFixed(pct < 1 ? 3 : 1)}%</b> 를 봤어요.</>)
    : state === "done" ? t(E,
      <>Finished in <b>{(ms / 1000).toFixed(2)} s</b>. Best score <b>{best}</b>.<br />{ms < 2000 ? <>Inside the 2-second limit. Now try a bigger N.</> : <>Already past the 2-second limit.</>}</>,
      <>{(ms / 1000).toFixed(2)}초 만에 끝났어요. 최고 점수는 <b>{best}</b> 점이에요.<br />{ms < 2000 ? <>제한 시간 2초 안이에요. 이제 N 을 더 키워봐요.</> : <>벌써 제한 시간 2초를 넘었어요.</>}</>)
    : state === "timeout" ? t(E,
      <>Four seconds gone, and only <b>{pct.toFixed(3)}%</b> is done.<br />At this speed the whole thing takes <b>{etaText}</b>.<br />The contest gives us <b>2 seconds</b>.</>,
      <>4초가 지났는데 겨우 <b>{pct.toFixed(3)}%</b> 했어요.<br />이 속도면 끝까지 <b>{etaText}</b> 걸려요.<br />대회가 주는 시간은 <b>2초</b>예요.</>)
    : t(E,
      <>Stopped at <b>{pct.toFixed(pct < 1 ? 3 : 1)}%</b>.<br />At this speed the whole thing takes <b>{etaText}</b>.</>,
      <>{pct.toFixed(pct < 1 ? 3 : 1)}% 에서 멈췄어요.<br />이 속도면 끝까지 <b>{etaText}</b> 걸려요.</>);

  // 좁은 화면에서 N 네 개가 한 줄에 들어가게 — 줄이 넘어가면 그만큼 아래가 밀려서
  // 돌리기 버튼이 하단 고정 바 뒤로 내려간다 (모바일 375px 실측).
  const btn = (on) => ({
    padding: "7px 11px", borderRadius: 9, fontSize: 12.5, fontWeight: 800, cursor: "pointer",
    border: `1.5px solid ${on ? A : "#e2e8f0"}`, background: on ? A : "#fff",
    color: on ? "#fff" : "#475569", fontFamily: "inherit",
  });

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={0} total={1} isEn={E}
        title={t(E, "Run the brute force yourself", "완전탐색을 직접 돌려봐요")}
        subtitle={t(E, "every board, every move — for real", "보드도 무브도 전부 진짜로")} />

      <Say tone={state === "timeout" ? "stuck" : state === "done" ? "aha" : "go"}>{say}</Say>

      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
          {RUN_NS.map((v) => (
            <button key={v} onClick={() => pick(v)} style={btn(v === n)}>N = {v}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
          <button onClick={run} disabled={state === "running"}
            style={{ ...btn(state !== "running"), opacity: state === "running" ? 0.45 : 1 }}>
            ▶ {t(E, "Run", "돌리기")}
          </button>
          <button onClick={stop} disabled={state !== "running"}
            style={{ ...btn(false), opacity: state !== "running" ? 0.45 : 1 }}>
            ■ {t(E, "Stop", "멈추기")}
          </button>
          <button onClick={reset} style={btn(false)}>↺ {t(E, "Reset", "처음부터")}</button>
        </div>
        <div style={{ display: "grid", gap: 6, marginBottom: 10 }}>
          {[
            { l: t(E, "boards to make (2^N)", "만들 보드 (2^N)"), v: fmt(totalBoards) },
            { l: t(E, "distinct moves", "서로 다른 무브"), v: fmt(moveCount) },
            { l: t(E, "checks in total", "검사 횟수"), v: fmt(totalChecks), bad: totalChecks > 1e9 },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 13px",
              borderRadius: 9, border: `1.5px solid ${r.bad ? "#fca5a5" : "#e2e8f0"}`,
              background: r.bad ? "#fef2f2" : "#fff", fontSize: 12.5,
              wordBreak: "keep-all", textWrap: "balance" }}>
              <span style={{ flex: 1, color: "#475569", fontWeight: 700 }}>{r.l}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
                color: r.bad ? "#dc2626" : "#334155", whiteSpace: "nowrap" }}>{r.v}</span>
            </div>
          ))}
        </div>

        {/* 진행 막대 — 얼마나 갔는지 눈으로 */}
        <div style={{ height: 14, borderRadius: 999, background: "#f1f5f9",
          border: "1.5px solid #e2e8f0", overflow: "hidden", marginBottom: 6 }}>
          <div style={{ height: "100%", width: `${Math.max(pct, state === "idle" ? 0 : 0.4)}%`,
            background: state === "timeout" ? "#dc2626" : A, transition: "width .12s linear" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5,
          fontFamily: "'JetBrains Mono',monospace", color: "#64748b", marginBottom: 12 }}>
          <span>{fmt(done)} / {fmt(totalBoards)}</span>
          <span>{(ms / 1000).toFixed(2)}s{state !== "idle" && <> · {t(E, "best", "최고")} {best}</>}</span>
        </div>


        {(state === "timeout" || state === "stopped") && (
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "#fffbeb",
            border: "1.5px solid #fbbf24", fontSize: 12.5, color: "#92400e", lineHeight: 1.85,
            textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E, <>Measured right now, in your browser — with JavaScript.<br />The Python code on the last page is much slower still.<br />Try N = 12 again to feel the difference.</>,
                  <>지금 이 브라우저에서 잰 거예요. 자바스크립트 속도예요.<br />앞 페이지의 파이썬 코드는 이것보다 훨씬 더 느려요.<br />N = 12 를 다시 눌러보면 차이가 느껴져요.</>)}
          </div>
        )}
      </div>
    </div>
  );
}
