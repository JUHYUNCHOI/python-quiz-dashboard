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

/* 샘플 1 — N=5, K=6.
   ⚠️ 2026-09-11: 보드를 MOOOM → **MOOMM** 으로 바꿨다 (ScoreBoardSim 이 쓴다).
   2쪽 정적 표가 이미 MOOOM 을 무브 6개까지 다 펼쳐 4점을 보여주는데,
   이 시뮬이 **똑같은 보드·똑같은 무브**를 한 걸음씩 다시 밟고 있었다 (pedagogy·ux 둘 다 지적).
   2쪽은 "MOOMM 도 4점" 이라고 **말만 하고 안 보여준다** — 그게 답의 절반(보드 2개)인데.
   → 시뮬이 그 두 번째 보드를 맡는다. 중복이 새 정보가 된다.
   같은 무브 6개로 MOOMM 도 4점인 것을 파이썬으로 검산했다. */
const BOARD = "MOOMM";
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
      <>A computer does about <b>a billion simple steps</b> in one second — that is <b>10⁹</b>.<br /><b>7×10⁹</b> is <b>seven times</b> more.<br />Is it really too slow? Let's run it and see.</>,
      <>컴퓨터는 <b>간단한 계산 10억 번</b>에 1초쯤 걸려요 — 그게 <b>10⁹</b> 이에요.<br /><b>7×10⁹</b> 은 그보다 <b>일곱 배</b> 많아요.<br />정말 느린지, 직접 돌려서 봐요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 110 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Trying every board — in time?", "보드를 전부 해보기 — 시간 안에 될까요?")}
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

/* ③-0 EveryBoardSim — 보드를 하나도 빠짐없이 만드는 법. 2026-09-11 재작성.
   선생님: "왜 굳이 비트연산자로?" → 안 써도 된다. 그리고 **비트 없는 판본이 USACO 를 통과했다**
   (2026-09-11 선생님 제출. 최대 입력 1.44초 / 제한 2초 — 비트 판본 1.52초보다 오히려 빨랐다.
    시간을 먹는 건 안쪽 3중 반복이지 보드를 만드는 방식이 아니다).
   ⚠️ 전에는 비트 시뮬이 **9걸음**이었다(>> · &1 · 1<<N). 그 기호들이 이제 코드에 하나도 없다.
      도구에 핵심보다 많은 분량을 쓰고 있었다 — **4걸음**으로 줄이고,
      코드에 실제로 있는 "리스트에 1 더하기" 만 보여준다. */
export function EveryBoardSim({ E }) {
  const N = 3;
  const steps = [{ k: "why" }, { k: "first" }, { k: "add" }, { k: "all" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const sayRef = useKeepInView(ts.safe);

  /* 화면에 뿌릴 보드 — 리스트 [0/1] 그대로. 비트 연산은 여기 그리기용일 뿐 코드와 무관하다. */
  const show = (b) => Array.from({ length: N }, (_, i) => ((b >> i) & 1 ? "M" : "O"));
  const upTo = s.k === "why" ? -1 : s.k === "first" ? 0 : s.k === "add" ? 3 : (1 << N) - 1;

  const say =
    s.k === "why" ? t(E,
      /* ⚠️ 2026-09-13 학생: "3칸 → 8개 라고만 하고 2×2×2=8 을 안 보여줘서,
         왜 20칸이면 2 를 20번 곱하는지 스스로 이어붙이지 못했다." 곱셈을 화면에 적는다. */
      <>We must try <b>every</b> board — miss one and the answer can be wrong.<br />Each cell is M or O, so {N} cells give <b>{Array(N).fill(2).join(" × ")} = {1 << N}</b> boards.<br />How do we walk them all, in order?</>,
      <>보드를 <b>하나도 빠짐없이</b> 해봐야 해요 — 하나만 빠져도 답이 틀릴 수 있어요.<br />칸마다 M 아니면 O 니까, {N}칸이면 <b>{Array(N).fill(2).join(" × ")} = {1 << N}</b>개예요.<br />어떻게 하나씩, 빠짐없이 훑을까요?</>)
    : s.k === "first" ? t(E,
      /* ⚠️ 2026-09-13 학생: "'들고 다녀요' 가 무슨 뜻인지 모르겠다. 지어낸 비유 같다."
         비유를 지우면 더 쉬워지면 지운다 (memory/feedback_no_invented_terms.md). */
      <>The board is just a <b>list</b>: 1 means M, 0 means O.<br />Start from <b>all O</b> — that is the first board.</>,
      <>보드는 <b>리스트</b>로 나타내요 — 1 이면 M, 0 이면 O.<br /><b>전부 O</b> 에서 시작해요. 그게 첫 번째 보드예요.</>)
    : s.k === "add" ? t(E,
      /* ⚠️ 2026-09-13 학생이 **여기서 멈추고 싶었다**고 했다:
         "보통 숫자에 1 을 더할 땐 오른쪽(일의 자리)부터 하는데 여기는 왼쪽(앞)부터라니 왜 반대지?"
         → 이유를 한 줄로 적는다. 1번 칸을 **일의 자리로 쓰기로 정한 것**뿐이다.
         화면은 학생이 짐작하게 두면 안 된다. */
      /* ⚠️ 2026-09-13, **두 번째 학생이 같은 자리에서 또 걸렸다.**
         첫 학생: "왜 앞에서부터?" → 나는 "1번 칸이 일의 자리예요" 라고 적었다.
         둘째 학생: "**왜 1번 칸이 일의 자리인지는 설명이 없다.** 내가 알던 규칙을
                     뒤집어놓고 왜 뒤집었는지는 안 알려준 거다."
         맞는 말이다. 진짜 답은 **어느 쪽이든 상관없다** 는 것이다 —
         빠짐없이 한 번씩만 나오면 되니까. 그걸 적는다. 규칙을 정당화하려 들지 말고. */
      <>Next board = <b>add 1</b>, the way you add 1 to a number.<br />Either end can be the ones place — all that matters is that every board comes up <b>exactly once</b>. We picked <b>cell 1</b>, so we start at the front.<br />From the front: every <b>M</b> turns back to <b>O</b>, until you meet an <b>O</b> — make that one <b>M</b>.</>,
      <>다음 보드는 <b>1 을 더하는 것</b>과 같아요. 숫자에 1 더하듯이요.<br />어느 쪽을 일의 자리로 삼아도 괜찮아요 — <b>빠짐없이 한 번씩만</b> 나오면 되니까요. 우리는 <b>1번 칸</b>으로 정했고, 그래서 앞에서부터 해요.<br />앞에서부터 <b>M</b> 은 <b>O</b> 로 되돌리다가, <b>O</b> 를 만나면 그 자리를 <b>M</b> 으로 바꿔요.</>)
    : t(E,
      /* ⚠️ 2026-09-13 학생 B: "'비트 연산자' 가 뭔지 설명이 전혀 없다. 필요없다니까 그냥 넘어갔다."
         맞다 — 그 줄은 **우리끼리 하는 말**이었지 학생에게 하는 말이 아니었다. 뺀다.
         (memory/feedback_no_invented_terms.md — 정의 안 한 말은 쓰지 않는다.) */
      <>Keep adding 1 and you get <b>all {1 << N}</b> boards — none missed, none twice.<br />When every cell is M there is nothing left, so we stop.</>,
      <>계속 1 을 더하면 <b>{1 << N}개 전부</b>가 나와요. 빠지지도, 겹치지도 않아요.<br />전부 M 이 되면 더 갈 데가 없으니 멈춰요.</>);

  return (
    <div style={{ padding: 16, paddingBottom: 90 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Every board, one at a time", "보드를 하나씩, 빠짐없이")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
        <div ref={sayRef}><Say tone={s.k === "why" ? "stuck" : s.k === "all" ? "aha" : "go"}>{say}</Say></div>

        {upTo >= 0 && (
          <div style={{ maxWidth: 310, margin: "0 auto", display: "grid", gap: 5 }}>
            {Array.from({ length: upTo + 1 }, (_, b) => b).map((b) => {
              const cur = b === upTo;
              return (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 9,
                  padding: "6px 10px", borderRadius: 9,
                  border: `${cur ? 2 : 1}px solid ${cur ? A : "#e2e8f0"}`,
                  background: cur ? "#f5f3ff" : "#fff" }}>
                  <span style={{ width: 16, fontSize: 11, fontWeight: 800, color: "#94a3b8" }}>{b + 1}</span>
                  <span style={{ display: "flex", gap: 4 }}>
                    {show(b).map((c, i) => (
                      <span key={i} style={{ width: 26, height: 26, borderRadius: 6, display: "inline-flex",
                        alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace",
                        fontWeight: 800, fontSize: 13, background: c === "M" ? MBG : OBG,
                        border: `1.5px solid ${c === "M" ? MCOL : OCOL}`, color: c === "M" ? MCOL : OCOL }}>{c}</span>
                    ))}
                  </span>
                  <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 11.5, fontWeight: 700, color: cur ? "#6d28d9" : "#94a3b8" }}>
                    [{show(b).map((c) => (c === "M" ? 1 : 0)).join(", ")}]
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </StepFade>
      <div style={{ marginTop: 18 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}

/* ③-c WholeRunSim — **코드가 도는 순서 그대로** 답이 나오는 걸 끝까지 본다. 2026-09-11 신설.
   선생님: "아직 처음부터 차례대로 **코드가 동작하는 순서**정도로
            **어떻게 구할건지 눈에 안보여**"
   조각(한계·아이디어·isAt 표·비트)은 다 있는데, 그것들을 이어 **답이 나오는 장면**이 없었다.
   memory/usaco_quest_learning_flow.md 의 **"계획"** 단계가 바로 이 자리다 —
   이해 → 이해확인 → 전략 → 브루트한계 → 재전략 → **계획** → 코드.
   ⚠️ 화면의 숫자는 전부 **그 자리에서 계산한다.** 글과 어긋날 수 없다.
   공식 샘플 1 (N=5, K=6) 을 그대로 쓴다 — 답 4 2. */
export function WholeRunSim({ E }) {
  const N = 5;
  const RAW = [[1, 2, 3], [1, 2, 3], [1, 3, 5], [2, 3, 4], [5, 3, 2], [5, 2, 3]];
  const mv = RAW.map(([x, y, z]) => [x - 1, y - 1, z - 1]);

  /* 1) 표 만들기 */
  const isAt = Array.from({ length: N }, () => Array.from({ length: N }, () => Array(N).fill(0)));
  mv.forEach(([x, y, z]) => { isAt[x][Math.min(y, z)][Math.max(y, z)] += 1; });
  const filled = [];
  for (let x = 0; x < N; x++) for (let a = 0; a < N; a++) for (let b = 0; b < N; b++)
    if (isAt[x][a][b]) filled.push([x, a, b, isAt[x][a][b]]);

  /* 2) 보드 하나 채점 */
  const board = (b) => Array.from({ length: N }, (_, i) => ((b >> i) & 1 ? "M" : "O")).join("");
  const scoreOf = (b) => {
    const Ms = [], Os = [];
    for (let i = 0; i < N; i++) (((b >> i) & 1) ? Ms : Os).push(i);
    let sc = 0;
    Ms.forEach((m) => { for (let i = 0; i < Os.length; i++) for (let j = i + 1; j < Os.length; j++) sc += isAt[m][Os[i]][Os[j]]; });
    return { Ms, Os, sc };
  };

  /* 3) 전부 돌며 best·ways */
  let best = 0, ways = 0; const hits = [];
  for (let b = 0; b < (1 << N); b++) {
    const { sc } = scoreOf(b);
    if (sc > best) { best = sc; ways = 1; hits.length = 0; hits.push(b); }
    else if (sc === best) { ways++; hits.push(b); }
  }

  /* 화면에서 하나씩 짚어볼 보드 — 첫 보드 하나와, 최고 점수가 나온 둘.
     ⚠️ 2026-09-13: 전에는 [0, 1, 2, 최고점 둘] 이라 다섯이었다. **학생 둘이 이 쪽에서
        그만두고 싶다**고 했다 — "6·7쪽에서 이미 본 걸 또 8단계로 되풀이한다",
        "여기부터는 눈으로만 훑었다". 3라운드 판정도 "저점 보드를 줄여라" 였다.
        0, 1, 2 를 순서대로 밟는 건 이제 **4쪽(EveryBoardSim)이 하는 일**이라 여기선 필요 없다.
        첫 보드 하나만 남겨 "여기서 시작한다" 만 보이고, 나머지는 답이 나오는 보드다. */
  const WALK = [0, hits[0], hits[1]];
  const steps = [{ k: "read" }, { k: "table" },
                 ...WALK.map((b, i) => ({ k: "board", b, i })),
                 { k: "done" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const sayRef = useKeepInView(ts.safe);

  /* 지금까지 본 보드만으로 계산한 장부 — "그 순간의 값" 을 보여준다 */
  const seen = s.k === "board" ? WALK.slice(0, s.i + 1) : s.k === "done" ? WALK : [];
  let runBest = 0, runWays = 0;
  seen.forEach((b) => { const sc = scoreOf(b).sc; if (sc > runBest) { runBest = sc; runWays = 1; } else if (sc === runBest) runWays++; });

  const cur = s.k === "board" ? scoreOf(s.b) : null;
  /* 이 보드에서 실제로 꺼내 쓴 표 칸 — "표를 꺼내 더하면" 이 눈에 보이게 (2026-09-11).
     선생님: "이거 볼때는 **앞의 내용이 없어져서** 뭘 얘기하는지 모르겠어"
     2걸음에서 만든 표가 3걸음부터 사라져 있었다. feedback_screen_must_not_rely_on_memory. */
  const used = (x, a, b2) =>
    cur && cur.Ms.includes(x) && cur.Os.includes(a) && cur.Os.includes(b2);
  const say =
    s.k === "read" ? t(E,
      <><b>1.</b> Read the input — <b>{RAW.length} moves</b> on {N} cells.<br />This is the official sample. The answer should come out <b>{best} {ways}</b>.</>,
      <><b>1.</b> 입력을 읽어요 — 칸 {N}개에 <b>무브 {RAW.length}개</b>.<br />공식 샘플이에요. 끝까지 가면 답이 <b>{best} {ways}</b> 가 나와야 해요.</>)
    : s.k === "table" ? t(E,
      <><b>2.</b> Count the moves into the table — <b>once</b>.<br />Only {filled.length} squares end up non-zero.</>,
      <><b>2.</b> 무브를 표에 세어 넣어요 — <b>딱 한 번</b>.<br />0 이 아닌 칸은 {filled.length}개뿐이에요.</>)
    : s.k === "board" ? t(E,
      /* ⚠️ 2026-09-12 학생: "b 가 뭔지 화면이 설명해주지 않았다. 0,1,2 다음 갑자기 17, 25 로 뛴다."
         b 의 뜻은 **첫 걸음에 한 번만** 말하고, 건너뛴다는 것도 그 자리에서 말한다.
         (WALK = [0, 1, 2, 최고점 보드 둘] — 1,048,576개를 다 밟을 수는 없다.) */
      <><b>3.</b> Board <b>b = {s.b}</b> is <b>{board(s.b)}</b>.
        {s.i === 0 && <><br /><span style={{ opacity: .85 }}>b is just <b>which board</b> — we make them in order, b = 0, 1, 2, …</span></>}
        {s.i > 0 && <><br /><span style={{ opacity: .85 }}>{s.b} = {(() => { const t2 = []; let v = s.b, k = 1; while (v) { if (v & 1) t2.push(k); v >>= 1; k *= 2; } return t2.join(" + "); })()} → cells {board(s.b).split("").map((c, i2) => (c === "M" ? i2 + 1 : 0)).filter(Boolean).join(" · ")} are M (cell 1 is the ones place).</span></>}
        {s.i === 1 && <><br /><span style={{ opacity: .85 }}>Jumping ahead — these two are the <b>best-scoring</b> boards.</span></>}
        <br />M cells {cur.Ms.map((i) => i + 1).join("·") || "none"} / O cells {cur.Os.map((i) => i + 1).join("·")}<br />Read the table for every (M, O-pair) → <b>{cur.sc}</b> points.</>,
      <><b>3.</b> 보드 <b>b = {s.b}</b> 는 <b>{board(s.b)}</b> 예요.
        {s.i === 0 && <><br /><span style={{ opacity: .85 }}>b 는 <b>몇 번째 보드</b>인가예요 — 0, 1, 2 … 순서로 만들어요.</span></>}
        {/* ⚠️ 2026-09-13 학생 F 가 **여기서 그만뒀다**: "b=0 은 OOOOO 였다가 갑자기 b=17 인데,
               왜 17 이 MOOOM 인지 설명이 하나도 없다." 4쪽에서 정한 "1번 칸이 일의 자리" 로
               손으로 확인되게 적는다 — 17 = 1 + 16 → 1번·5번 칸이 M. */}
        {s.i > 0 && <><br /><span style={{ opacity: .85 }}>{s.b} = {(() => { const t2 = []; let v = s.b, k = 1; while (v) { if (v & 1) t2.push(k); v >>= 1; k *= 2; } return t2.join(" + "); })()} 이니까 {board(s.b).split("").map((c, i2) => (c === "M" ? i2 + 1 : 0)).filter(Boolean).join("번 · ")}번 칸이 M 이에요 (1번 칸이 일의 자리).</span></>}
        {s.i === 1 && <><br /><span style={{ opacity: .85 }}>여기서부터는 건너뛰어요 — 이 둘이 <b>최고 점수</b>가 나온 보드예요.</span></>}
        <br />M 자리 {cur.Ms.map((i) => i + 1).join("·") || "없음"} / O 자리 {cur.Os.map((i) => i + 1).join("·")}<br />(M 자리, O 짝) 마다 표를 꺼내 더하면 <b>{cur.sc}점</b>.</>)
    : t(E,
      <><b>4.</b> Do that for all <b>{1 << N}</b> boards and keep the best.<br />Answer: <b>{best} {ways}</b> — that is exactly what the code prints.</>,
      <><b>4.</b> 보드 <b>{1 << N}</b>개를 다 그렇게 하고 제일 좋은 걸 남겨요.<br />답: <b>{best} {ways}</b> — 코드가 출력하는 게 바로 이거예요.</>);

  const Row = ({ label, value, hot }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "6px 11px", borderRadius: 8, marginBottom: 4,
      background: hot ? "#ecfdf5" : "#f8fafc", border: `1.5px solid ${hot ? "#34d399" : "#e2e8f0"}` }}>
      <span style={{ fontSize: 11.5, fontWeight: 700, color: "#475569", wordBreak: "keep-all" }}>{label}</span>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13,
        color: hot ? "#047857" : "#334155" }}>{value}</span>
    </div>
  );

  return (
    <div style={{ padding: 16, paddingBottom: 90 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Start to finish, in code order", "처음부터 끝까지 — 코드 도는 순서로")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
        <div ref={sayRef}><Say tone={s.k === "done" ? "aha" : "go"}>{say}</Say></div>

        <div style={{ maxWidth: 330, margin: "0 auto" }}>
          {s.k === "read" && (
            <div style={{ display: "grid", gap: 4 }}>
              {RAW.map(([x, y, z], i) => (
                <div key={i} style={{ padding: "5px 11px", borderRadius: 8, background: "#f8fafc",
                  border: "1.5px solid #e2e8f0", fontFamily: "'JetBrains Mono',monospace",
                  fontWeight: 800, fontSize: 13, color: "#334155", textAlign: "center" }}>
                  {x} {y} {z}
                </div>
              ))}
            </div>
          )}

          {(s.k === "table" || s.k === "board") && (
            <div style={{ display: "grid", gap: 4, marginBottom: s.k === "board" ? 10 : 0 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textAlign: "center",
                marginBottom: 2, wordBreak: "keep-all" }}>
                {s.k === "table"
                  ? t(E, "the table we just built", "방금 만든 표")
                  : t(E, "the same table — green rows are the ones this board reads",
                       "아까 그 표 — 초록이 이 보드가 꺼내 쓰는 칸이에요")}
              </div>
              {filled.map(([x, a, b, v]) => {
                const on = s.k === "table" || used(x, a, b);
                return (
                  <div key={`${x}-${a}-${b}`} style={{ display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "6px 11px", borderRadius: 8,
                    opacity: on ? 1 : 0.4,
                    background: on ? "#ecfdf5" : "#f8fafc",
                    border: `1.5px solid ${on ? "#34d399" : "#e2e8f0"}` }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: "#475569", wordBreak: "keep-all" }}>
                      {t(E, <>x = {x + 1} (M) · O pair {a + 1}·{b + 1}</>,
                           <>x = {x + 1} (M 자리) · O 짝 {a + 1}·{b + 1}</>)}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13,
                      color: on ? "#047857" : "#94a3b8" }}>{v}</span>
                  </div>
                );
              })}
              {s.k === "board" && (
                <div style={{ fontSize: 11.5, fontWeight: 800, color: "#047857", textAlign: "center",
                  marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>
                  {filled.filter(([x, a, b]) => used(x, a, b)).map(([, , , v]) => v).join(" + ") || "0"}
                  {" = "}{cur.sc}
                </div>
              )}
            </div>
          )}

          {s.k === "board" && (
            <>
              <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 10 }}>
                {board(s.b).split("").map((c, i) => (
                  <span key={i} style={{ width: 30, height: 30, borderRadius: 7, display: "inline-flex",
                    alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace",
                    fontWeight: 800, fontSize: 13, background: c === "M" ? MBG : OBG,
                    border: `1.5px solid ${c === "M" ? MCOL : OCOL}`, color: c === "M" ? MCOL : OCOL }}>{c}</span>
                ))}
              </div>
              <Row label={t(E, "this board's score", "이 보드 점수")} value={cur.sc} hot={cur.sc === best} />
            </>
          )}

          {(s.k === "board" || s.k === "done") && (
            <div style={{ marginTop: 10, paddingTop: 9, borderTop: "1px dashed #cbd5e1" }}>
              <Row label={t(E, "best so far", "지금까지 최고 점수")} value={runBest} hot={s.k === "done"} />
              <Row label={t(E, "boards at that score", "그 점수인 보드 수")} value={runWays} hot={s.k === "done"} />
              {s.k === "done" && (
                <div style={{ marginTop: 8, padding: "9px 12px", borderRadius: 9, background: "#ecfdf5",
                  border: "2px solid #059669", textAlign: "center", fontFamily: "'JetBrains Mono',monospace",
                  fontWeight: 800, fontSize: 15, color: "#065f46" }}>
                  {best} {ways}
                </div>
              )}
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

/* ③-b IsAtTableSim — 12쪽(아이디어)과 13쪽(코드) 사이의 다리. 2026-09-11 신설.
   왜: student-algorithm 이 13쪽에서 **그만뒀다** —
     "isAt[x][a][b] 나오자마자 '이건 나 혼자 못 짜겠다' 는 생각이 들었다.
      앞의 시뮬에서는 'M칸 1개+O칸 2개만 세면 된다' 는 아이디어까지만 봤지,
      그걸 **미리 표로 저장해두는 방법은 코드에서 처음 봤다**."
   처방도 학생이 냈다 — "코드 나오기 전에 isAt 표가 뭘 저장하는지 손으로 채워보는 작은 표".
   ⚠️ 2차원 리스트를 가르치는 레슨이 0개다. 여기 isAt 는 **3차원**이다.
      그래서 한 번에 다 보여주지 않고 **x 를 하나 고정한 평면 한 장**만 그린다.
   걸음 목록은 pedagogy-reviewer 가 짜서 검토받은 것을 그대로 옮겼다. */
export function IsAtTableSim({ E }) {
  /* ⚠️ 2026-09-11 선생님: "저걸 보고 **그래서 어떻게 값을 구할수 있는건지도 모르겠어**"
     처음엔 표를 채우는 데서 끝냈다. 채우는 법만 보여주고 **쓰는 법**을 안 보여준 것이다.
     use·sum 두 걸음을 붙여 보드 하나를 실제로 채점해 점수를 내는 데까지 간다. */
  /* ⚠️ 2026-09-13: 뒤 두 걸음(use·sum)을 **잘라냈다.** 6 → 4.
     학생 셋(B·C·E)이 "7·8·9쪽이 표에서 꺼내 더하기를 세 번 되풀이한다" 고 했다.
     화면을 대조해 보니 사실이었다 — 여기 use·sum 이 **장난감 보드(OOOOM)** 로 보여주는
     그 동작을, 8쪽(WholeRunSim)이 **공식 샘플로 다시** 보여준다. 8쪽 쪽이 더 세다(진짜 답 4 2).
     ⚠️ use·sum 은 2026-09-11 선생님 지적("채우는 법만 보여주고 **쓰는 법**을 안 보여줬다")으로
        붙인 것이다. 지우는 게 아니라 **8쪽으로 넘긴다** — 8쪽이 그 뒤에 생겼고 더 잘 한다.
     이 쪽이 버는 것("무브는 맨 처음 한 번만 센다")은 마지막 걸음 말풍선에 남긴다. */
  const steps = [{ k: "ask" }, { k: "plan" }, { k: "fill" }, { k: "order" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const sayRef = useKeepInView(ts.safe);

  /* 1쪽 문제 설명에 이미 쓴 칸 5개·무브 두 개를 그대로 재사용한다 (새 그림을 안 만든다).
     화면에 적는 칸 번호는 **1번부터** — 문제와 같게. 표 안 첨자는 코드와 같게 0부터. */
  /* ⚠️ 2026-09-11: 처음엔 무브를 **지어내서** 썼는데, 1쪽 예제와 같은 보드 이름(MOOOO)이
     다른 점수로 나왔다 (1쪽 2점 / 여기 3점). pedagogy 가 잡았다.
     → **공식 샘플 1 을 그대로 쓴다.** 2쪽에서 학생이 이미 본 무브다.
     샘플 안에 (5,3,2) 와 (5,2,3) 이 있다 — **순서만 다른 짝**이라 지어낼 필요가 없었다.
     x = 5 평면을 쓰니 채점 보드는 OOOOM — 1쪽의 MOOOO 와 글자가 달라 안 헷갈린다. */
  const N = 5;
  const X = 4;                                   // 평면 한 장: x = 5번 칸이 M 인 경우
  const MOVES = [[4, 2, 1], [4, 1, 2]];          // (5,3,2) 와 (5,2,3) — 순서만 다른 짝
  const upTo = s.k === "ask" || s.k === "plan" ? 0 : s.k === "fill" ? 1 : 2;
  /* 채점 예시(SCORE_BOARD·oCells·oPairs)는 2026-09-13 에 8쪽으로 넘기며 지웠다. */

  /* isAt[X][a][b] — a < b 로 모아 센다 */
  const grid = Array.from({ length: N }, () => Array(N).fill(0));
  MOVES.slice(0, upTo).forEach(([x, y, z]) => {
    if (x === X) grid[Math.min(y, z)][Math.max(y, z)] += 1;
  });

  const say =
    s.k === "ask" ? t(E,
      /* ⚠️ 2026-09-13 학생 F: "6쪽에서 방금 한 얘기를 그대로 다시 하는 느낌." → 앞말을 뺀다. */
      <>Must we scan all <b>200,000</b> moves for every board?</>,
      <>그런데 보드마다 무브 <b>20만 개</b>를 매번 다 훑어야 할까요?</>)
    : s.k === "plan" ? t(E,
      /* ⚠️ 2026-09-13 학생 E: "'sheet' 를 왜 시트라고 부르는지 설명 없이 쓴다."
         정의 안 한 말은 안 쓴다 (memory/feedback_no_invented_terms.md). 그냥 "표" 다. */
      <>No — count the moves <b>once, up front</b>, into a table.<br />One square = <b>how many times that move appeared</b>.<br />One table per M cell; this one is for <b>x = cell 5</b>.</>,
      <>아니에요. 무브를 <b>미리 한 번만</b> 세서 표에 넣어두면 돼요.<br />표의 <b>한 칸 = 그 무브가 몇 번 나왔나</b> 예요.<br />M 자리마다 표 하나씩 — 이건 <b>x = 5번 칸</b> 표예요.</>)
    : s.k === "fill" ? t(E,
      <>Move <b>(5, 3, 2)</b> arrives: x = 5 is the M, the O cells are 3 and 2.<br />Store them <b>smaller first</b> → the (2, 3) square gets <b>1</b>.</>,
      <>무브 <b>(5, 3, 2)</b> 가 왔어요. x = 5 가 M 자리, O 자리는 3 과 2 예요.<br /><b>작은 쪽을 앞</b>으로 넣으면 → (2, 3) 칸이 <b>1</b> 이 돼요.</>)
    : t(E,
      /* 잘라낸 sum 걸음의 마무리를 여기로 옮겼다. 이 줄이 이 쪽이 버는 것이다 —
         2026-09-12 학생: "표로 미리 세도 보드마다 찾아보는 건 똑같잖아. 뭐가 다른데?" */
      <>Now <b>(5, 2, 3)</b> arrives — same two O cells, swapped.<br />y and z only need to be O, so order does not matter.<br />Smaller first again → it lands on (2, 3) once more: <b>2</b>.<br />Do that for every move and the table is done — the <b>200,000</b> moves are counted <b>once, at the very start</b>, not again for each of the <b>1,000,000</b> boards.</>,
      <>이번엔 <b>(5, 2, 3)</b> 가 왔어요 — O 자리 둘이 순서만 바뀐 거예요.<br />y·z 는 둘 다 O 이기만 하면 되니 순서는 상관없어요.<br />또 작은 쪽을 앞으로 넣으면 (2, 3) 칸에 <b>2</b> 가 돼요.<br />무브를 이렇게 하나씩 다 넣으면 표가 채워져요. 무브 <b>20만 개</b>를 <b>맨 처음 딱 한 번</b>만 세는 거예요 — 보드 <b>100만 개</b>마다 다시 훑지 않아요.</>);

  const justFilled = s.k === "fill" ? [[1, 2], [3, 4]] : s.k === "order" ? [[1, 2]] : [];
  const isNew = (a, b) => justFilled.some(([p, q]) => p === a && q === b);

  const cell = (a, b) => {
    const v = grid[a][b];
    const off = b <= a;                                  // a < b 만 쓴다 (아래쪽은 안 씀)
    return (
      <span key={`${a}-${b}`} style={{
        width: 34, height: 30, borderRadius: 7, display: "inline-flex",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13,
        background: off ? "#f8fafc" : isNew(a, b) ? "#ede9fe" : v ? "#f5f3ff" : "#fff",
        border: `${isNew(a, b) ? 2.5 : 1.5}px solid ${off ? "#f1f5f9" : isNew(a, b) ? A : v ? "#c4b5fd" : "#e2e8f0"}`,
        color: off ? "#e2e8f0" : v ? "#5b21b6" : "#cbd5e1",
      }}>{off ? "" : v}</span>
    );
  };

  return (
    <div style={{ padding: 16, paddingBottom: 90 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Count once, into a table", "한 번만 세서 표에 넣어두기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
        <div ref={sayRef}><Say tone={s.k === "ask" ? "stuck" : s.k === "order" ? "aha" : "go"}>{say}</Say></div>

        {s.k !== "ask" && (
          <div style={{ maxWidth: 320, margin: "0 auto" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#7c3aed", textAlign: "center",
              marginBottom: 4, wordBreak: "keep-all" }}>
              {t(E, "table for x = cell 5 (the M)", "x = 5번 칸 (M 자리) 의 표")}
            </div>
            {/* ⚠️ 축 설명이 표 **아래** 작은 회색 글씨였다. 선생님: "가로세로가 뭘 얘기하는 표야?"
                읽기 전에 보이게 위로 올리고, y·z 라는 이름을 같이 준다. */}
            <div style={{ maxWidth: 300, margin: "0 auto 9px", padding: "7px 10px", borderRadius: 8,
              background: "#faf5ff", border: "1px solid #ddd6fe", fontSize: 11.5, color: "#6d28d9",
              lineHeight: 1.7, wordBreak: "keep-all", textAlign: "center" }}>
              {t(E, <>rows ↓ = smaller <b>O</b> cell &nbsp;·&nbsp; columns → = larger <b>O</b> cell<br />(those are y and z)</>,
                   <>세로 ↓ = 작은 쪽 <b>O</b> 칸 &nbsp;·&nbsp; 가로 → = 큰 쪽 <b>O</b> 칸<br />(그 둘이 y, z 예요)</>)}
            </div>
            {/* 열 제목 — O 자리 두 개를 (작은 쪽, 큰 쪽) 으로 읽는다 */}
            <div style={{ display: "grid", gridTemplateColumns: "28px repeat(5, 34px)", gap: 4, justifyContent: "center" }}>
              <span />
              {Array.from({ length: N }, (_, b) => (
                <span key={b} style={{ textAlign: "center", fontSize: 11, fontWeight: 800, color: "#94a3b8" }}>{b + 1}</span>
              ))}
              {Array.from({ length: N }, (_, a) => (
                <Fragment key={a}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end",
                    fontSize: 11, fontWeight: 800, color: "#94a3b8", paddingRight: 4 }}>{a + 1}</span>
                  {Array.from({ length: N }, (_, b) => cell(a, b))}
                </Fragment>
              ))}
            </div>

            {s.k === "plan" && (
              <div style={{ maxWidth: 300, margin: "10px auto 0", padding: "9px 12px", borderRadius: 9,
                background: "#f5f3ff", border: `1.5px solid ${A}`, fontSize: 12, fontWeight: 700,
                color: "#5b21b6", lineHeight: 1.8, wordBreak: "keep-all", textAlign: "center" }}>
                {t(E, <>So the square at row <b>2</b>, column <b>3</b> means:<br />
                       "how many times did move <b>(5, 2, 3)</b> appear?"</>,
                     <>그러니까 세로 <b>2</b>, 가로 <b>3</b> 칸은 이런 뜻이에요:<br />
                       "무브 <b>(5, 2, 3)</b> 이 몇 번 나왔나?"</>)}
              </div>
            )}
          </div>
        )}
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

  /* N = 20 에서 보드마다 볼 조합 수 — **화면에는 안 쓴다.**
     2026-09-13: 학생 넷 중 셋이 이 수(428)에서 "짐작도 못 하고 그냥 믿었다" 고 했다.
     학생이 직접 셀 수 없는 수라서다. 화면은 손으로 확인되는 10 × 45 = 450 만 쓰고
     나머지는 "몇백 가지" 로 말한다. 근거는 여기 주석에만 남긴다:
       한 보드에 M 이 m 개면 볼 조합은 m × C(20−m, 2).
       모든 보드에 걸친 평균 = 20 × C(19,2) / 8 = 3,420 / 8 = 427.5
       (자리 하나가 실제로 쓰이려면 x=M · y=O · z=O 라 확률 1/8)
       최대는 m = 6 또는 7 일 때 546. 그래서 "몇백 가지" 가 맞는 말이다.
     ⚠️ 화면에 다시 쓰고 싶으면, 학생이 **손으로 확인할 수 있는 형태**인지 먼저 물어라. */

  const say =
    s.k === "board" ? t(E,
      <>Suppose the board is already decided — <b>M O O O M</b>.<br />Now score it.</>,
      <>보드가 이미 정해졌다고 해봐요 — <b>M O O O M</b>.<br />이제 이 보드를 채점해요.</>)
    : s.k === "waste" ? t(E,
      /* ⚠️ 2026-09-13 학생 B: "갑자기 60 이라는 숫자가 나와서 K 랑 무슨 관계인지 헷갈렸다.
         계산 과정이 화면에 없고 결과만 나와서 짐작해야 했다." → 곱셈을 적는다.
         (x, y, z 는 서로 다른 칸이라 5 × 4 × 3 이다.) */
      /* ⚠️ 2026-09-13 학생 D: "'완전탐색' 이 뭔지 앞에서 정해준 적이 없는데 갑자기 나온다."
         맞다. 앞 쪽에서 본 그 코드를 가리키는 말이니, **그렇게 부른다.** */
      <>Every possible move on {N} cells: <b>{N} × {N - 1} × {N - 2} = {allMoves}</b> — the code on the last page checks them all.<br />But cell 1 is M — any move asking cell 1 to be O <b>cannot score</b>.<br />Most checks are wasted.</>,
      <>칸 {N}개로 만들 수 있는 무브는 <b>{N} × {N - 1} × {N - 2} = {allMoves}개</b> — 앞 쪽 코드는 이걸 전부 봐요.<br />그런데 1번 칸은 M 이에요. 1번이 O 여야 하는 무브는 <b>애초에 득점 못 해요</b>.<br />대부분이 헛수고예요.</>)
    : s.k === "order" ? t(E,
      <>A move is <b>(x, y, z)</b> — x must read M, y and z must read O.<br />So y and z <b>just both need to be O</b>: <b>(1,2,3) and (1,3,2) score the same</b>.<br />Count them together.</>,
      <>무브는 <b>(x, y, z)</b> 예요 — x 자리가 M, y·z 자리가 O 여야 득점해요.<br />그러니 y 와 z 는 <b>둘 다 O 이기만</b> 하면 돼요.<br /><b>(1,2,3) 과 (1,3,2) 는 채점에선 같은 것</b>이에요. 묶어서 세요.</>)
    : s.k === "only" ? t(E,
      <>So don't look at every move. Look only at what <b>can</b> score:<br />a scoring <b>move</b> points at one <b>M</b> cell + two <b>O</b> cells.<br /><span style={{ fontSize: 11.5, fontWeight: 700, opacity: .85 }}>(That is about moves, not boards — a board may hold any number of M's.)</span><br />Here that is <b>{mPos.length}</b> M cells × <b>{pairs}</b> O-pairs = <b>{canScore}</b>, not {allMoves}.<br /><span style={{ fontSize: 11.5, fontWeight: 700, opacity: .85 }}>(the O cells are {oPos.map((i) => i + 1).join(", ")}, so the pairs are {oPos.flatMap((a, i) => oPos.slice(i + 1).map((b2) => `(${a + 1},${b2 + 1})`)).join(" ")})</span></>,
      <>그러니 무브를 다 보지 말고, <b>득점할 수 있는 것만</b> 봐요.<br />득점하는 <b>무브</b>는 <b>M</b> 자리 하나 + <b>O</b> 자리 둘을 가리켜요.<br /><span style={{ fontSize: 11.5, fontWeight: 700, opacity: .85 }}>(보드 얘기가 아니에요 — 보드엔 M 이 몇 개든 있어도 돼요.)</span><br />여기선 M 자리 <b>{mPos.length}개</b> × O 짝 <b>{pairs}가지</b> = <b>{canScore}개</b>예요. {allMoves}개가 아니라요.<br /><span style={{ fontSize: 11.5, fontWeight: 700, opacity: .85 }}>(O 칸이 {oPos.map((i) => i + 1).join("·")}번이니까 짝은 {oPos.flatMap((a, i) => oPos.slice(i + 1).map((b2) => `(${a + 1},${b2 + 1})`)).join(" ")} 이에요.)</span></>)
    : t(E,
      /* ⚠️ 2026-09-12: 기준을 6,840 에서 **20만**으로 바꿨다.
         앞 쪽(첫 코드)이 방금 "보드마다 무브 20만 개를 훑는다" 를 코드로 보여준다.
         그런데 여기서 갑자기 6,840 을 기준으로 삼으면 학생은 두 세계를 보게 된다 —
         ux·학생이 예전에 "K 는 20만이라며 왜 갑자기 6,840?" 이라고 걸린 그 자리다.
         6,840(서로 다른 무브의 최대 가짓수)은 이 이야기에 필요 없다. */
      /* ⚠️ 2026-09-13 학생 B: "428 이 어디서 나왔는지 계산 과정이 없어서 짐작도 못 했다."
         → 방금 한 것과 **같은 셈**이라고 적는다. 보드마다 M 개수가 달라 평균이라는 것도. */
      /* ⚠️ 2026-09-13 학생 셋 중 둘이 428 에서 "짐작도 못 하고 그냥 믿었다" 고 했다.
         숫자를 손으로 확인할 수 있게 **예를 하나** 준다 — M 이 10개인 보드.
         검산: O 가 10개면 짝은 10×9/2 = 45, M 10개 × 45 = 450. 보드마다 달라 평균은 427.5 ≈ 428. */
      /* ⚠️ 2026-09-13: **428 을 뺐다.** 학생 넷 중 셋이 "짐작도 못 하고 그냥 믿었다" 고 했다.
         "평균" 이라고 적어도, 예를 하나 붙여도 안 통했다 — 학생이 **직접 셀 수 없는 수**라서다.
         셀 수 없는 수를 화면에 두면 거기서 "그냥 믿고 가자" 모드로 바뀐다(학생 C·D 둘 다 그랬다).
         → 손으로 확인되는 예(10 × 45 = 450)만 남기고, 나머지는 "몇백 가지" 로 말한다.
         (참고: 실제 평균은 427.5, 최대는 546. 코드 주석에만 남긴다.) */
      <>With <b>N</b> cells the same idea works. At <b>N = 20</b> we do the same count — <b>M cells × O-pairs</b>.<br />Say a board has 10 M's and 10 O's: that is <b>10 × 45 = 450</b>. Other boards differ, but it stays in the <b>hundreds</b>.<br />Instead of walking all <b>200,000</b> moves per board. The answer is identical.</>,
      <>칸이 <b>N</b>개일 때도 같은 생각이에요. <b>N = 20</b>이면 방금과 똑같이 <b>M 자리 수 × O 짝 수</b>를 세요.<br />M 이 10개, O 가 10개인 보드라면 <b>10 × 45 = 450가지</b>예요. 다른 보드도 <b>몇백 가지</b>예요.<br />보드마다 무브 20만 개를 훑는 대신에요. 답은 똑같고요.</>);

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
          <Row E={E} ko="앞 쪽 코드가 보던 것" en="the last page's code looked at" v={`${allMoves}`} bad />
        </div>
      )}
      {s.k === "gain" && (
        <div style={{ maxWidth: 420, margin: "10px auto 0", padding: "10px 14px", borderRadius: 10,
          background: "#ecfdf5", border: "1.5px solid #34d399", fontSize: 12.5, color: "#065f46",
          lineHeight: 1.85, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
          {/* ⚠️ 말풍선만 고치고 이 카드를 안 고치면 한 화면에서 두 기준이 싸운다.
                 (내가 자주 내는 실수라 적어둔다 — 같은 걸음의 말풍선·카드는 늘 같이 본다.) */}
          {t(E, <>N = 20 : <b>200,000</b> moves → a few <b>hundred</b> combinations per board</>,
                <>N = 20 : 보드마다 무브 <b>20만</b> → 볼 조합은 <b>몇백 가지</b></>)}
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
            {t(E, <>Measured right now, in your browser — with JavaScript.<br />Written in Python it would be much slower still.<br />Try N = 12 again to feel the difference.</>,
                  <>지금 이 브라우저에서 잰 거예요. 자바스크립트 속도예요.<br />파이썬으로 짜면 이것보다 훨씬 더 느려요.<br />N = 12 를 다시 눌러보면 차이가 느껴져요.</>)}
          </div>
        )}
      </div>
    </div>
  );
}
