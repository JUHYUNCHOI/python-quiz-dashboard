// Stepped intro sim for printseq — 학생 눈이 말풍선을 따라가며 문제를 이해하도록
// (선생님 2026-07-13: "눈이 말풍선을 따라가며 보게 해달라니까. K? 어떻게 입력되는데? 그래서 뭐?")

import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimShell } from "@/components/quest/TraceStepper";

const A = "#16a34a";
const TARGET = [1, 1, 1, 1];
const N = TARGET.length;
const K = 1;

/* PrintseqIntroSim — 첫 페이지 (선생님 2026-07-13 재설계).
   핵심 오해 해소: "REP 4 (PRINT 1) 은 결국 4 번 찍는데 왜 K=1?"
   → 📝 프로그램(적는 곳) 과 🖥 화면(찍히는 곳) 을 나란히 두고,
   K 는 '적힌 PRINT 줄 수' 만 센다는 걸 눈으로 확인.
   중복 안내문구 제거 — 말풍선 하나가 이야기 전부를 끌고 감. 8 스텝. */
function _buildIntroSteps(E) {
  return [
    { focus: "target",
      bubble: t(E,
        "This is what must appear on screen:\n1 1 1 1 — four numbers.",
        "우리가 화면에 찍어내야 할 것:\n1 1 1 1 — 숫자 4 개예요.") },
    { focus: "N",
      bubble: t(E,
        "N = 4.\nJust the length of the target.",
        "N = 4.\n목표의 길이 (숫자 4 개) 예요.") },
    { focus: "K",
      bubble: t(E,
        "K = 1.\nThe program may have only ONE written PRINT line.\nRemember this word: WRITTEN.",
        "K = 1.\n프로그램에 '적을 수 있는' PRINT 줄이 딱 1 개.\n이 말 기억해요: '적힌' 줄 수!") },
    { focus: "commands",
      bubble: t(E,
        "To build the target we can use just 2 commands.\nHere they are 👇",
        "목표를 만드는 데 쓸 수 있는 명령은 딱 2 개.\n아래에서 봐요 👇") },
    { focus: "naive",
      bubble: t(E,
        "First try — write PRINT 1 four times.\nLook at the program: 4 written PRINT lines.\nBut K = 1 → over budget ❌",
        "일단 그냥 — PRINT 1 을 네 줄 적어봐요.\n프로그램을 보면: 적힌 PRINT 가 4 줄.\n근데 K = 1 → 예산 초과 ❌") },
    { focus: "write",
      bubble: t(E,
        "Now with REP: write PRINT 1 only ONCE,\nwrapped in REP 4.\nThe program has just 1 written PRINT line.",
        "이번엔 REP: PRINT 1 을 딱 한 줄만 적고\nREP 4 로 감싸요.\n프로그램에 적힌 PRINT 는 1 줄뿐.") },
    { focus: "run",
      bubble: t(E,
        "Run it ▶ — REP spins that one line 4 times.\nWatch the screen: 1 1 1 1 appears. Target complete!",
        "실행하면? REP 가 그 한 줄을 4 번 돌려요.\n화면을 봐요: 1 1 1 1 이 찍혔어요. 목표 완성!") },
    { focus: "verdict",
      bubble: t(E,
        "\"But it printed 4 numbers — isn't that 4 PRINTs?\"\nNo! K counts the WRITTEN lines, not the screen.\nWritten = 1 ≤ K = 1 → YES ✓",
        "\"어? 4 개나 찍혔는데 PRINT 4 개 아니에요?\"\n아니요! K 는 화면이 아니라 '적힌 줄 수' 를 세요.\n적힌 PRINT = 1 ≤ K = 1 → YES ✓") },
  ];
}

export function PrintseqIntroSim({ E }) {
  const steps = _buildIntroSteps(E);
  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(idx, steps.length - 1)];
  const foc = (name) => st.focus === name;

  const ORDER = ["target", "N", "K", "commands", "naive", "write", "run", "verdict"];
  const stage = ORDER.indexOf(st.focus);
  const showPanels = stage >= 4;                    // naive 부터 프로그램|화면 2단
  const isNaive = st.focus === "naive";
  const smartProgram = stage >= 5;                  // write 부터 REP 버전
  const showOutput = stage >= 6;                    // run 부터 화면에 숫자
  const isVerdict = st.focus === "verdict";

  const bColor = isVerdict ? "#6ee7b7" : "#fbbf24";

  // 말풍선 — 초반엔 상단, 패널 단계엔 패널 바로 위에 렌더 (시선 분산 방지, 선생님 2026-07-13)
  const bubble = (
    <div style={{ maxWidth: 520, margin: "0 auto 12px", position: "relative", zIndex: 5 }}>
      <div style={{ background: isVerdict ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${bColor}`, borderRadius: 12, padding: "12px 15px", fontSize: 13, color: isVerdict ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", boxShadow: "0 4px 14px rgba(0,0,0,.08)" }}>
        💬 {st.bubble}
      </div>
      <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: `10px solid ${bColor}` }} />
    </div>
  );

  return (
    <SimShell idx={idx} total={tot} onIdx={setIdx} accent={A} isEn={E}>
      {/* 초반(목표·N·K·명령): 말풍선이 위, 그 아래 바로 주인공 */}
      {!showPanels && bubble}

      {showPanels ? (
        /* 패널 단계: 목표·N·K 를 한 줄 요약으로 접어 위에 두고, 말풍선은 패널 바로 위로 */
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12, fontSize: 11.5, color: C.dim }}>
          <span style={{ fontWeight: 700 }}>🎯 {t(E, "target", "목표")}</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#5b21b6", background: "#f5f3ff", padding: "2px 8px", borderRadius: 6, border: "1px solid #c4b5fd" }}>{TARGET.join(" ")}</span>
          <span style={{ color: "#cbd5e1" }}>·</span>
          <span style={{ fontWeight: 700 }}>N = <b style={{ color: "#0f172a" }}>{N}</b></span>
          <span style={{ color: "#cbd5e1" }}>·</span>
          <span style={{ fontWeight: 700 }}>K = <b style={{ color: "#b45309" }}>{K}</b> <span style={{ fontWeight: 600 }}>{t(E, "(written PRINTs)", "(적힌 PRINT)")}</span></span>
        </div>
      ) : (
        <>
          {/* 목표 수열 (full) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: foc("target") ? "#15803d" : C.dim, fontWeight: 700, transition: "color .2s" }}>
              🎯 {t(E, "target (what the screen must show)", "목표 (화면에 찍혀야 할 것)")}
            </div>
            <div style={{ display: "flex", gap: 6, padding: foc("target") ? 6 : 0, borderRadius: 10, background: foc("target") ? "#dcfce7" : "transparent", border: foc("target") ? "2px solid #16a34a" : "2px solid transparent", boxShadow: foc("target") ? "0 0 0 4px rgba(34,197,94,.15)" : "none", transition: "all .25s" }}>
              {TARGET.map((v, i) => (
                <div key={i} style={{
                  width: 42, height: 42, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 17,
                  background: "#f5f3ff", color: "#5b21b6", border: "1.5px solid #c4b5fd",
                }}>{v}</div>
              ))}
            </div>
          </div>

          {/* N · K 카드 (full) */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            {[
              { key: "N", val: N, label: t(E, "length", "길이"), hot: "#16a34a", hotBg: "#dcfce7", glow: "rgba(34,197,94,.18)" },
              { key: "K", val: K, label: t(E, "written-PRINT budget", "적을 수 있는 PRINT 줄"), hot: "#f59e0b", hotBg: "#fef3c7", glow: "rgba(245,158,11,.22)" },
            ].map(c => (
              <div key={c.key} style={{
                padding: "9px 16px", borderRadius: 12,
                background: foc(c.key) ? c.hotBg : "#f8fafc",
                border: `2px solid ${foc(c.key) ? c.hot : "#e2e8f0"}`,
                boxShadow: foc(c.key) ? `0 0 0 4px ${c.glow}` : "none",
                transform: foc(c.key) ? "scale(1.05)" : "none",
                transition: "all .28s cubic-bezier(.4,0,.2,1)",
                minWidth: 96, textAlign: "center",
              }}>
                <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 700, letterSpacing: 0.5 }}>{c.key}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 21, fontWeight: 800, color: "#0f172a" }}>{c.val}</div>
                <div style={{ fontSize: 9.5, color: C.dim, marginTop: 1, wordBreak: "keep-all" }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* 명령 소개 — commands 스텝에만 */}
          {foc("commands") && (
            <div style={{ maxWidth: 440, margin: "0 auto 12px", background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 14px", fontSize: 12.5, color: "#92400e", lineHeight: 1.8, wordBreak: "keep-all", boxShadow: "0 0 0 4px rgba(245,158,11,.12)" }}>
              <div>
                <code style={{ background: "#fef3c7", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>PRINT c</code>
                {" — "}
                {t(E, <>print number <b>c</b>. <span style={{ color: "#991b1b", fontWeight: 700 }}>Each written line counts.</span></>,
                      <>숫자 <b>c</b> 찍기. <span style={{ color: "#991b1b", fontWeight: 700 }}>적힌 줄마다 1 개.</span></>)}
              </div>
              <div>
                <code style={{ background: "#fef3c7", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>REP n ( … ) END</code>
                {" — "}
                {t(E, <>repeat inside <b>n</b> times. <span style={{ color: "#15803d", fontWeight: 700 }}>Free.</span></>,
                      <>안쪽 <b>n</b> 번 반복. <span style={{ color: "#15803d", fontWeight: 700 }}>공짜.</span></>)}
              </div>
            </div>
          )}
        </>
      )}

      {/* 패널 단계: 말풍선을 패널 바로 위에 (시선이 말풍선 → 패널로 자연스럽게) */}
      {showPanels && bubble}

      {/* 📝 프로그램 | 🖥 화면 — 적힌 것과 찍힌 것을 나란히 (naive 부터) */}
      {showPanels && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, maxWidth: 520, margin: "0 auto 10px" }}>
          {/* 프로그램 패널 */}
          <div style={{
            background: isNaive ? "#fef2f2" : "#f8fafc",
            border: `1.5px solid ${isNaive ? "#fca5a5" : (smartProgram ? "#6ee7b7" : "#e2e8f0")}`,
            borderRadius: 10, padding: 12,
            boxShadow: (isNaive || st.focus === "write") ? `0 0 0 4px ${isNaive ? "rgba(248,113,113,.15)" : "rgba(110,231,183,.18)"}` : "none",
            transition: "all .3s",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#334155", marginBottom: 8 }}>
              📝 {t(E, "PROGRAM (what we write)", "프로그램 (우리가 적는 것)")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5, fontWeight: 700, color: "#0f172a", lineHeight: 1.8, background: "#fff", padding: "9px 12px", borderRadius: 8, minHeight: 96 }}>
              {isNaive ? (
                <>
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} style={{ background: "#fee2e2", borderRadius: 4, padding: "0 6px", marginBottom: 2 }}>PRINT 1</div>
                  ))}
                </>
              ) : (
                <>
                  <div>REP 4 (</div>
                  <div style={{ background: "#dcfce7", borderRadius: 4, padding: "0 6px", margin: "2px 0 2px 16px", display: "inline-block" }}>PRINT 1</div>
                  <div>) END</div>
                </>
              )}
            </div>
            <div style={{ marginTop: 8, textAlign: "center", fontSize: 12, fontWeight: 800, color: isNaive ? "#dc2626" : "#15803d" }}>
              {t(E, "written PRINT lines", "적힌 PRINT")}: {isNaive ? 4 : 1}
              {isNaive && <span> {">"} K = 1 ❌</span>}
            </div>
          </div>

          {/* 화면 패널 */}
          <div style={{
            background: "#f8fafc", border: `1.5px solid ${showOutput ? "#c4b5fd" : "#e2e8f0"}`,
            borderRadius: 10, padding: 12,
            boxShadow: st.focus === "run" ? "0 0 0 4px rgba(196,181,253,.25)" : "none",
            transition: "all .3s",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#334155", marginBottom: 8 }}>
              🖥 {t(E, "SCREEN (what gets printed)", "화면 (찍히는 것)")}
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center", background: "#fff", padding: "9px 12px", borderRadius: 8, minHeight: 96 }}>
              {showOutput ? TARGET.map((v, i) => (
                <div key={i} style={{
                  width: 38, height: 38, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 16,
                  background: "#ede9fe", color: "#5b21b6", border: "1.5px solid #c4b5fd",
                }}>{v}</div>
              )) : (
                <span style={{ fontSize: 11.5, color: C.dim }}>{t(E, "(nothing yet — not run)", "(아직 실행 전 — 비어 있음)")}</span>
              )}
            </div>
            <div style={{ marginTop: 8, textAlign: "center", fontSize: 12, fontWeight: 800, color: showOutput ? "#7c3aed" : C.dim }}>
              {showOutput
                ? <>{t(E, "numbers on screen", "찍힌 숫자")}: 4 {t(E, "(doesn't count toward K!)", "(K 랑 상관없음!)")}</>
                : t(E, "run to see", "실행하면 나와요")}
            </div>
          </div>
        </div>
      )}

      {/* verdict 뱃지 — 마지막 스텝만 */}
      {isVerdict && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <div style={{ background: "#ecfdf5", border: "2px solid #16a34a", color: "#065f46", borderRadius: 999, padding: "6px 20px", fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace" }}>
            1 ≤ K=1 → YES ✓
          </div>
        </div>
      )}

    </SimShell>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PrintseqShapesSim — '수열 셋, 모양 셋' 텍스트 벽 대체 (선생님 2026-07-13:
   "눈의 움직임대로 읽어나가다가 뭔말인지 바로 알 수 있도록").
   한 수열씩: 보여주기 → "어떻게 만들까?" → 프로그램 공개 → 비용.
   마지막에 세 모양 정리. 9 스텝.
   ════════════════════════════════════════════════════════════════════ */
const SHAPES = [
  { seq: [2, 2, 2], color: "#16a34a", bg: "#dcfce7", bd: "#86efac",
    prog: "REP 3 (PRINT 2) END", cost: 1 },
  { seq: [1, 2, 1, 2], color: "#1d4ed8", bg: "#dbeafe", bd: "#93c5fd",
    prog: "REP 2 (PRINT 1; PRINT 2) END", cost: 2 },
  { seq: [1, 1, 2, 2], color: "#b91c1c", bg: "#fee2e2", bd: "#fca5a5",
    prog: null, cost: 2 },
];

function _buildShapeSteps(E) {
  return [
    /* 수열 1: [2,2,2] */
    { si: 0, show: "seq",
      bubble: t(E,
        "Sequence #1: 2 2 2.\nHow would you build this?\nLook — every number is the SAME.",
        "수열 1번: 2 2 2.\n이건 어떻게 만들까요?\n잘 보면 — 숫자가 전부 같아요.") },
    { si: 0, show: "prog",
      bubble: t(E,
        "All same → write PRINT 2 once, wrap it in REP 3.\nPRINT count = 1. Cheapest possible!",
        "다 같으면 → PRINT 2 를 한 번만 쓰고, REP 3 로 감싸요.\nPRINT 개수 = 1. 제일 싸게 끝!") },
    /* 수열 2: [1,2,1,2] */
    { si: 1, show: "seq",
      bubble: t(E,
        "Sequence #2: 1 2 1 2.\nNot all same… but look closer.\nThe pair (1 2) appears twice!",
        "수열 2번: 1 2 1 2.\n다 같진 않은데… 자세히 봐요.\n(1 2) 짝이 두 번 반복돼요!") },
    { si: 1, show: "prog",
      bubble: t(E,
        "A repeating block → write the block ONCE (PRINT 1; PRINT 2), wrap in REP 2.\nPRINT count = 2.",
        "블록이 반복되면 → 블록을 한 번만 쓰고 (PRINT 1; PRINT 2), REP 2 로 감싸요.\nPRINT 개수 = 2.") },
    /* 수열 3: [1,1,2,2] */
    { si: 2, show: "seq",
      bubble: t(E,
        "Sequence #3: 1 1 2 2.\nAll same? No (1≠2).\nOne block repeating? No — (1 1) then (2 2), different.",
        "수열 3번: 1 1 2 2.\n다 같나? 아니요 (1≠2).\n한 블록 반복인가? 아니요 — (1 1) 다음 (2 2), 서로 달라요.") },
    { si: 2, show: "cut",
      bubble: t(E,
        "Neither trick works on the WHOLE thing…\nso CUT it in two: [1 1] and [2 2].\nNow each piece is 'all same' — we know how to do that!",
        "통째로는 두 방법 다 안 되니까…\n둘로 잘라요: [1 1] 과 [2 2].\n이제 조각마다 '다 같음' — 우리가 아는 모양!") },
    { si: 2, show: "prog",
      bubble: t(E,
        "Left piece: REP 2 (PRINT 1) → 1 PRINT.\nRight piece: REP 2 (PRINT 2) → 1 PRINT.\nTotal = 2 PRINTs.",
        "왼쪽 조각: REP 2 (PRINT 1) → PRINT 1 개.\n오른쪽 조각: REP 2 (PRINT 2) → PRINT 1 개.\n합계 = PRINT 2 개.") },
    /* 정리 */
    { si: -1, show: "recap",
      bubble: t(E,
        "That's ALL the moves!\nEvery sequence is one of 3 shapes:\n① all same ② repeating block ③ cut in two.\nOur code will simply try these three.",
        "이게 전부예요!\n모든 수열은 3 가지 모양 중 하나:\n① 다 같음 ② 블록 반복 ③ 둘로 자르기.\n코드는 이 셋을 차례로 시도하면 돼요.") },
  ];
}

export function PrintseqShapesSim({ E }) {
  const steps = _buildShapeSteps(E);
  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(idx, steps.length - 1)];
  const isRecap = st.show === "recap";
  const sh = st.si >= 0 ? SHAPES[st.si] : null;
  const showProg = st.show === "prog";
  const showCut = st.show === "cut" || (st.si === 2 && st.show === "prog");

  const bColor = isRecap ? "#6ee7b7" : "#fbbf24";

  const cell = (v, i, color, bg, bd, dim) => (
    <div key={i} style={{
      width: 42, height: 42, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 17,
      background: dim ? "#f8fafc" : bg, color: dim ? "#cbd5e1" : color,
      border: `1.5px solid ${dim ? "#e2e8f0" : bd}`, transition: "all .25s",
    }}>{v}</div>
  );

  return (
    <SimShell idx={idx} total={tot} onIdx={setIdx} accent="#16a34a" isEn={E}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#16a34a", marginBottom: 12 }}>
        🔎 {t(E, "Three sequences — find the trick for each", "수열 세 개 — 각각 만드는 요령 찾기")}
      </div>

      {/* 말풍선 */}
      <div style={{ maxWidth: 520, margin: "0 auto 16px", position: "relative", zIndex: 5 }}>
        <div style={{ background: isRecap ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${bColor}`, borderRadius: 12, padding: "12px 15px", fontSize: 13, color: isRecap ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", boxShadow: "0 4px 14px rgba(0,0,0,.08)" }}>
          💬 {st.bubble}
        </div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: `10px solid ${bColor}` }} />
      </div>

      {/* 수열 3 개 — 현재 것만 진하게, 지나간/미래 것 흐리게 */}
      {!isRecap && SHAPES.map((s, k) => {
        const active = k === st.si;
        const past = k < st.si;
        if (!active && !past) return null;   // 아직 안 나온 수열은 숨김
        return (
          <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, marginBottom: 12, opacity: active ? 1 : 0.38, transition: "opacity .3s" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: active ? s.color : C.dim }}>
              {t(E, `sequence #${k + 1}`, `수열 ${k + 1}번`)}
            </div>
            {/* 자르기 시각화: 3번 수열 + cut 이후 → 두 조각 사이 가위 갭 */}
            {k === 2 && active && showCut ? (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ display: "flex", gap: 4, padding: 5, borderRadius: 9, border: `2px dashed ${s.bd}` }}>
                  {s.seq.slice(0, 2).map((v, i) => cell(v, i, s.color, s.bg, s.bd))}
                </div>
                <div style={{ fontSize: 16, padding: "0 2px" }}>✂️</div>
                <div style={{ display: "flex", gap: 4, padding: 5, borderRadius: 9, border: `2px dashed ${s.bd}` }}>
                  {s.seq.slice(2).map((v, i) => cell(v, i, s.color, s.bg, s.bd))}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 4 }}>
                {s.seq.map((v, i) => cell(v, i, s.color, s.bg, s.bd, !active))}
              </div>
            )}
            {/* 프로그램 + 비용 (prog 스텝) */}
            {active && showProg && (
              <div style={{ marginTop: 4, textAlign: "center" }}>
                {st.si === 2 ? (
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 700, color: "#0f172a", background: "#fff", border: `1.5px solid ${s.bd}`, borderRadius: 8, padding: "8px 12px", lineHeight: 1.7 }}>
                    REP 2 (PRINT 1) END<br />REP 2 (PRINT 2) END
                  </div>
                ) : (
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 700, color: "#0f172a", background: "#fff", border: `1.5px solid ${s.bd}`, borderRadius: 8, padding: "8px 12px" }}>
                    {s.prog}
                  </div>
                )}
                <div style={{ marginTop: 6, fontSize: 12.5, fontWeight: 800, color: s.color }}>
                  🖨 PRINT {t(E, "count", "개수")} = {s.cost}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* 정리 카드 */}
      {isRecap && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 420, margin: "0 auto 4px" }}>
          {[
            { icon: "①", ko: "다 같음 → PRINT 하나 + REP", en: "all same → one PRINT + REP", c: SHAPES[0] },
            { icon: "②", ko: "블록 반복 → 블록 한 번 + REP", en: "repeating block → block once + REP", c: SHAPES[1] },
            { icon: "③", ko: "둘 다 아니면 → 둘로 잘라 각각 풀기", en: "neither → cut in two, solve each", c: SHAPES[2] },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: r.c.bg, border: `1.5px solid ${r.c.bd}`, borderRadius: 10, padding: "9px 13px" }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: r.c.color }}>{r.icon}</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: r.c.color, wordBreak: "keep-all" }}>{t(E, r.en, r.ko)}</span>
            </div>
          ))}
        </div>
      )}

    </SimShell>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PrintseqPlanSim — 코드 챕터 도입 (선생님 2026-07-13: "코드를 보여주기 전에
   어떻게 하겠다는걸 시뮬로 하나씩").
   can([1 1 2 2], 2) 가 요령 ①→②→③ 을 차례로 시도하고, 자른 조각에
   '같은 질문'을 다시 묻는(재귀) 과정을 트리로 한 단계씩. 8 스텝.
   ════════════════════════════════════════════════════════════════════ */
function _buildPlanSteps(E) {
  return [
    { root: "ask", kids: null,
      bubble: t(E,
        "Before writing code — the plan.\nWe'll build ONE function: can(sequence, budget).\nIt answers: \"can this sequence be made with ≤ budget written PRINTs?\"",
        "코드를 적기 전에 — 계획부터.\n만들 함수는 딱 하나: can(수열, 예산).\n\"이 수열을 적힌 PRINT 예산 개 이하로 만들 수 있나?\" 에 YES/NO 로 답해요.") },
    { root: "no1", kids: null,
      bubble: t(E,
        "can([1 1 2 2], 2) — try trick ① first.\nAll same? No (1 ≠ 2). Next trick.",
        "can([1 1 2 2], 2) — 먼저 요령 ① 검사.\n다 같아? 아니요 (1 ≠ 2). 다음 요령으로.") },
    { root: "no2", kids: null,
      bubble: t(E,
        "Trick ② — one block repeating?\nNo — (1 1) then (2 2), different blocks. Next trick.",
        "요령 ② — 한 블록의 반복이야?\n아니요 — (1 1) 다음 (2 2), 서로 다른 블록. 다음 요령.") },
    { root: "no2", kids: "ask",
      bubble: t(E,
        "Trick ③ — CUT!\n[1 1] and [2 2]. The budget 2 also splits: 1 + 1.\nNow each piece is its own little question.",
        "요령 ③ — 잘라요!\n[1 1] 과 [2 2]. 예산 2 도 나눠요: 1 + 1.\n이제 조각마다 작은 질문이 하나씩 생겼어요.") },
    { root: "no2", kids: "ask", focusKid: 0,
      bubble: t(E,
        "Look at the left piece: \"can [1 1] be made with budget 1?\"\nWait — that's the SAME SHAPE of question as before!\nSo just call the same function can() again. That's recursion.",
        "왼쪽 조각을 봐요: \"[1 1] 을 예산 1 로 만들 수 있나?\"\n어? 아까랑 똑같은 모양의 질문이에요!\n그러니 같은 함수 can 을 그대로 또 부르면 돼요. 이게 재귀.") },
    { root: "no2", kids: "left", focusKid: 0,
      bubble: t(E,
        "can([1 1], 1): all same → trick ① → YES ✓",
        "can([1 1], 1): 다 같음 → 요령 ① → YES ✓") },
    { root: "no2", kids: "both", focusKid: 1,
      bubble: t(E,
        "can([2 2], 1): all same → trick ① → YES ✓",
        "can([2 2], 1): 다 같음 → 요령 ① → YES ✓") },
    { root: "yes", kids: "both",
      bubble: t(E,
        "Both pieces YES → the original question is YES! ✓",
        "양쪽 다 YES → 원래 질문도 YES! ✓") },
    { root: "yes", kids: "both", memo: true,
      bubble: t(E,
        "Here's the catch: trying ALL cut points, the SAME small question — like can([1 1], 1) — comes up over and over.\nPlain recursion re-solves it EVERY time → slow.\nStore each answer once, reuse it → fast. = MEMOIZATION (top-down DP). 👇",
        "여기서 문제 — 자를 곳을 전부 시도하다 보면 같은 작은 질문(예: can([1 1], 1))이 자꾸자꾸 나와요.\n그냥 재귀면 그때마다 처음부터 다시 풀어요 → 느림.\n한 번 푼 답을 저장해두고 재사용하면 → 빠름. = 메모이제이션 (top-down DP). 👇") },
  ];
}

export function PrintseqPlanSim({ E }) {
  const steps = _buildPlanSteps(E);
  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(idx, steps.length - 1)];
  const isFinal = st.root === "yes";
  const bColor = isFinal ? "#6ee7b7" : "#fbbf24";

  // 노드 상태 뱃지
  const rootBadge = st.root === "ask" ? { txt: "?", bg: "#f1f5f9", fg: "#64748b" }
    : st.root === "no1" ? { txt: t(E, "①✗ not all same", "①✗ 다 같지 않음"), bg: "#fee2e2", fg: "#b91c1c" }
    : st.root === "no2" ? { txt: t(E, "①✗ ②✗ → cut!", "①✗ ②✗ → 자르자!"), bg: "#fef3c7", fg: "#b45309" }
    : { txt: "YES ✓", bg: "#dcfce7", fg: "#15803d" };

  const kidState = (i) => {
    if (!st.kids) return null;
    if (st.kids === "ask") return { txt: "?", bg: "#f1f5f9", fg: "#64748b" };
    if (st.kids === "left") return i === 0 ? { txt: "YES ✓ (①)", bg: "#dcfce7", fg: "#15803d" } : { txt: "?", bg: "#f1f5f9", fg: "#64748b" };
    return { txt: "YES ✓ (①)", bg: "#dcfce7", fg: "#15803d" };
  };

  const node = (label, badge, hot, w) => (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      background: "#fff", border: `2px solid ${hot ? "#0891b2" : "#e2e8f0"}`,
      borderRadius: 12, padding: "9px 14px", minWidth: w,
      boxShadow: hot ? "0 0 0 4px rgba(8,145,178,.15)" : "0 1px 4px rgba(0,0,0,.05)",
      transform: hot ? "scale(1.04)" : "none",
      transition: "all .3s cubic-bezier(.4,0,.2,1)",
    }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>{label}</div>
      {badge && <div style={{ fontSize: 11, fontWeight: 800, padding: "2px 10px", borderRadius: 999, background: badge.bg, color: badge.fg, whiteSpace: "nowrap" }}>{badge.txt}</div>}
    </div>
  );

  return (
    /* SimShell = 스텝마다 내용 높이가 달라도 버튼이 위아래로 안 튀는 공통 프레임
       (제일 큰 스텝에 맞춰 잠그고 SimNav 는 바닥 고정). 선생님 2026-07-16. */
    <SimShell idx={idx} total={tot} onIdx={setIdx} accent="#16a34a" isEn={E}>
      {/* 말풍선 */}
      <div style={{ maxWidth: 520, margin: "0 auto 14px", position: "relative", zIndex: 5 }}>
        <div style={{ background: isFinal ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${bColor}`, borderRadius: 12, padding: "12px 15px", fontSize: 13, color: isFinal ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", boxShadow: "0 4px 14px rgba(0,0,0,.08)" }}>
          💬 {st.bubble}
        </div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: `10px solid ${bColor}` }} />
      </div>

      {/* 재귀 트리 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        {node("can([1 1 2 2], 2)", rootBadge, st.kids == null && st.root !== "yes", 190)}

        {st.kids && (
          <>
            {/* 연결선 */}
            <div style={{ display: "flex", justifyContent: "center", gap: 90, height: 22, marginTop: 2 }}>
              <div style={{ width: 2, background: "#cbd5e1", transform: "rotate(24deg)", transformOrigin: "top" }} />
              <div style={{ width: 2, background: "#cbd5e1", transform: "rotate(-24deg)", transformOrigin: "top" }} />
            </div>
            <div style={{ display: "flex", gap: 26, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                {node("can([1 1], 1)", kidState(0), st.focusKid === 0, 140)}
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>{t(E, "budget 1", "예산 1")}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                {node("can([2 2], 1)", kidState(1), st.focusKid === 1, 140)}
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>{t(E, "budget 1", "예산 1")}</div>
              </div>
            </div>
          </>
        )}

        {/* 메모 카드 — ④ 겹친 질문(느림)을 눈으로 → ⑤ memo(빠름) */}
        {st.memo && (
          <div style={{ marginTop: 14, background: "#f5f3ff", border: "1.5px dashed #c4b5fd", borderRadius: 10, padding: "10px 14px", wordBreak: "keep-all", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#6d28d9", fontWeight: 700, marginBottom: 6 }}>
              {t(E, "Across the full search, the SAME question repeats:", "전체 탐색에서 같은 질문이 자꾸자꾸 나와요:")}
            </div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 800, color: "#0f172a", background: "#fff", border: "1.5px solid #c4b5fd", borderRadius: 8, padding: "4px 9px" }}>
                  can([1 1], 1)
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <div style={{ fontSize: 11, color: "#b91c1c", background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "5px 10px", fontWeight: 700 }}>
                🐢 {t(E, "plain recursion: re-solve each time → slow", "그냥 재귀: 매번 다시 풀기 → 느림")}
              </div>
              <div style={{ fontSize: 11, color: "#15803d", background: "#dcfce7", border: "1px solid #86efac", borderRadius: 8, padding: "5px 10px", fontWeight: 700 }}>
                ⚡ {t(E, "memo: solve once, reuse → fast", "memo: 한 번만 풀고 재사용 → 빠름")}
              </div>
            </div>
            <div style={{ fontSize: 10.5, color: "#5b21b6", fontWeight: 600, marginTop: 8 }}>
              📓 {t(E, "answer store: { ([1 1],1): YES,  ([2 2],1): YES,  ([1 1 2 2],2): YES }",
                      "답 저장소: { ([1 1],1): YES,  ([2 2],1): YES,  ([1 1 2 2],2): YES }")}
            </div>
          </div>
        )}
      </div>
    </SimShell>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PrintseqBlockSim — 요령② '블록 반복' 탐지를 구체 숫자로 (선생님 2026-07-13:
   "저 코드가 머릿속에서 안 그려짐"). [1,2,1,2,1,2] 로: 블록 크기 바꿔가며
   → 블록을 늘어놓고 → 목표와 한 칸씩 비교. copies=2 ✗ → copies=3 ✓.
   ════════════════════════════════════════════════════════════════════ */
const _BLK_SEQ = [1, 2, 1, 2, 1, 2];   // n=6

function _blockRepeat(seq, copies) {
  // seq 가 앞 block_len 개(block)가 copies 번 반복인지. 비교 결과 배열 반환.
  const n = seq.length, blockLen = n / copies;
  const block = seq.slice(0, blockLen);
  const cmp = seq.map((v, i) => v === block[i % blockLen]);   // 각 칸 일치 여부
  return { blockLen, block, cmp, ok: cmp.every(Boolean) };
}

function _buildBlockSteps(E) {
  const n = _BLK_SEQ.length;
  return [
    { copies: null, bubble: t(E,
      "Target = 1 2 1 2 1 2 (length 6).\nIs it a small block repeated? Let's try block sizes.",
      "목표 = 1 2 1 2 1 2 (길이 6).\n작은 블록의 반복일까? 블록 크기를 바꿔가며 해봐요.") },
    { copies: 2, phase: "lay", bubble: t(E,
      "copies = 2 → block length 6 ÷ 2 = 3. Block = 1 2 1.\nLay it out twice under the target 👇",
      "copies = 2 → 블록 길이 6 ÷ 2 = 3. 블록 = 1 2 1.\n목표 아래에 두 번 늘어놔요 👇") },
    { copies: 2, phase: "cmp", bubble: t(E,
      "Compare spot by spot… spot 4: target 2 vs block 1 → MISMATCH ✗.\nNot this block size.",
      "한 칸씩 비교… 4번 칸: 목표 2 vs 블록 1 → 안 맞음 ✗.\n이 블록 크기는 아니에요.") },
    { copies: 3, phase: "lay", bubble: t(E,
      "copies = 3 → block length 6 ÷ 3 = 2. Block = 1 2.\nLay it out three times 👇",
      "copies = 3 → 블록 길이 6 ÷ 3 = 2. 블록 = 1 2.\n세 번 늘어놔요 👇") },
    { copies: 3, phase: "cmp", bubble: t(E,
      "Compare spot by spot… every spot MATCHES ✓✓✓✓✓✓!\nSo 1 2 1 2 1 2 = block (1 2) repeated 3 times.",
      "한 칸씩 비교… 전부 맞아요 ✓✓✓✓✓✓!\n그러니 1 2 1 2 1 2 = 블록 (1 2) 이 3 번 반복.") },
    { copies: 3, phase: "done", bubble: t(E,
      "So wrap it: REP 3 ( … block … ) END.\nWe only need to solve the block (1 2) — that's the recursion in trick ②!",
      "그러니 감싸요: REP 3 ( … 블록 … ) END.\n블록 (1 2) 만 풀면 돼요 — 이게 요령 ②의 재귀예요!") },
  ];
}

export function PrintseqBlockSim({ E }) {
  const steps = _buildBlockSteps(E);
  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(idx, steps.length - 1)];
  const n = _BLK_SEQ.length;
  const CELL = 46, GAP = 6;
  const info = st.copies ? _blockRepeat(_BLK_SEQ, st.copies) : null;
  const showLay = st.phase === "lay" || st.phase === "cmp" || st.phase === "done";
  const showCmp = st.phase === "cmp" || st.phase === "done";
  const done = st.phase === "done";
  const bColor = done ? "#6ee7b7" : "#fbbf24";

  const cell = (v, opts = {}) => (
    <div style={{
      width: CELL, height: CELL, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 18,
      background: opts.bg || "#f5f3ff", color: opts.fg || "#5b21b6",
      border: `${opts.thick ? 2.5 : 1.5}px solid ${opts.bd || "#c4b5fd"}`,
      position: "relative", transition: "all .2s",
    }}>{v}{opts.mark && <span style={{ position: "absolute", top: -10, right: -6, fontSize: 13 }}>{opts.mark}</span>}</div>
  );

  return (
    <SimShell idx={idx} total={tot} onIdx={setIdx} accent={A} isEn={E}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10 }}>
        🔁 {t(E, "Trick ② — is it a repeated block?", "요령 ② — 블록의 반복일까?")}
      </div>

      {/* 말풍선 */}
      <div style={{ maxWidth: 520, margin: "0 auto 16px", position: "relative", zIndex: 5 }}>
        <div style={{ background: done ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${bColor}`, borderRadius: 12, padding: "12px 15px", fontSize: 13, color: done ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", boxShadow: "0 4px 14px rgba(0,0,0,.08)" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: `10px solid ${bColor}` }} />
      </div>

      <div style={{ width: "fit-content", margin: "0 auto" }}>
        {/* 목표 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 62, textAlign: "right", fontSize: 11, fontWeight: 700, color: "#5b21b6" }}>{t(E, "target", "목표")}</div>
          <div style={{ display: "flex", gap: GAP }}>
            {_BLK_SEQ.map((v, i) => {
              const mism = showCmp && info && !info.cmp[i];
              const match = showCmp && info && info.cmp[i];
              return <div key={i}>{cell(v, {
                bg: mism ? "#fee2e2" : match ? "#dcfce7" : "#f5f3ff",
                fg: mism ? "#b91c1c" : match ? "#15803d" : "#5b21b6",
                bd: mism ? "#f87171" : match ? "#86efac" : "#c4b5fd",
                thick: showCmp, mark: mism ? "✗" : match ? "✓" : null,
              })}</div>;
            })}
          </div>
        </div>

        {/* 블록을 copies 번 늘어놓기 */}
        {showLay && info && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 62, textAlign: "right", fontSize: 11, fontWeight: 700, color: "#0e7490", wordBreak: "keep-all" }}>
              {t(E, `block ×${st.copies}`, `블록 ×${st.copies}`)}
            </div>
            <div style={{ display: "flex", gap: GAP }}>
              {_BLK_SEQ.map((v, i) => {
                const bv = info.block[i % info.blockLen];
                const isBlockStart = i % info.blockLen === 0;
                return <div key={i} style={{ position: "relative" }}>
                  {isBlockStart && i > 0 && <div style={{ position: "absolute", left: -GAP/2 - 1, top: -2, bottom: -2, width: 0, borderLeft: "2px dashed #22d3ee" }} />}
                  {cell(bv, { bg: "#ecfeff", fg: "#0e7490", bd: "#67e8f9" })}
                </div>;
              })}
            </div>
          </div>
        )}
        {/* 블록 표시 (아직 안 늘어놓은 첫 스텝) */}
        {!showLay && (
          <div style={{ height: CELL + 8 }} />
        )}
      </div>

    </SimShell>
  );
}
