import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";

/* ================================================================
   Deep-Audit Sim: step through an A/B string, watch the state machine
   ================================================================ */
/* `afterFirstGame` 는 **한 게임이 실제로 끝난 뒤에만** 나온다.
   2026-09-17: 정리 문단이 시뮬 아래에 늘 떠 있어서, 학생이 한 번도 안 눌러 보고
   "21 점이면 0 으로 돌아간다" 를 먼저 읽었다. 시뮬이 보여줄 것을 글이 먼저 말하면
   시뮬을 누를 이유가 없어진다 (mcc20cipher·mcc21carrots 가 쓰는 touched 방식). */
function RallyAuditSim({ E, afterFirstGame }) {
  const PRESETS = [
    { id: "short", label: t(E, "The sample (42 A's)", "앞쪽 샘플 (A 가 42 개)"), s: "A".repeat(42) },
    { id: "mix",   label: t(E, "A wins 2-1", "A 가 2-1 로 이겨요"),
      s: "B".repeat(21) + "A".repeat(21) + "BABABABABABABABABABABA".slice(0, 41) },
    { id: "tight", label: t(E, "B wins 2-1", "B 가 2-1 로 이겨요"),
      s: "A".repeat(21) + "B".repeat(21) + "B".repeat(21) },
  ];
  /* 2026-09-17: 앞 쪽이 "왜 점수 줄이 두 개뿐일까 — 다음 쪽에서 따라가 보자" 로 끝나는데
     시뮬은 엉뚱하게 'B 2-1 접전' 으로 열려 있었다. 약속한 그 기록으로 열어 준다. */
  const [presetId, setPresetId] = useState("short");
  const preset = PRESETS.find(p => p.id === presetId) || PRESETS[0];
  const scores = preset.s;

  // Pre-compute every state-machine snapshot (after each char processed)
  const trace = useMemo(() => {
    const out = [{ i: 0, ch: null, ga: 0, gb: 0, wa: 0, wb: 0, results: [], event: null, done: false }];
    let ga = 0, gb = 0, wa = 0, wb = 0; const results = []; let done = false;
    for (let i = 0; i < scores.length; i++) {
      if (done) break;
      const ch = scores[i];
      if (ch === "A") ga += 1; else gb += 1;
      let event = null;
      if (ga === 21 || gb === 21) {
        results.push([ga, gb]);
        if (ga === 21) wa += 1; else wb += 1;
        event = ga === 21 ? "A21" : "B21";
        ga = 0; gb = 0;
        if (wa === 2 || wb === 2) { event = wa === 2 ? "Awin" : "Bwin"; done = true; }
      }
      out.push({ i: i + 1, ch, ga, gb, wa, wb, results: results.map(r => [...r]), event, done });
    }
    return out;
  }, [scores]);

  const [step, setStep] = useState(0);
  const cur = trace[Math.min(step, trace.length - 1)];
  const safeStep = Math.min(step, trace.length - 1);

  const reset = () => setStep(0);
  const back = () => setStep(s => Math.max(0, s - 1));
  const fwd = () => setStep(s => Math.min(trace.length - 1, s + 1));
  const jumpEvent = () => {
    // jump to next state with event != null
    for (let k = safeStep + 1; k < trace.length; k++) {
      if (trace[k].event) { setStep(k); return; }
    }
    setStep(trace.length - 1);
  };
  const finish = () => setStep(trace.length - 1);

  // Render the rally string with cursor
  const ralliesWindow = () => {
    const W = 41;
    const half = Math.floor(W / 2);
    const start = Math.max(0, Math.min(scores.length - W, cur.i - half));
    const end = Math.min(scores.length, start + W);
    const slice = scores.slice(start, end);
    return (
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, letterSpacing: 1, background: "#0f172a", color: "#cbd5e1", padding: "8px 10px", borderRadius: 8, overflowX: "auto", whiteSpace: "nowrap" }}>
        {start > 0 && <span style={{ color: "#475569" }}>…</span>}
        {[...slice].map((c, idx) => {
          const realIdx = start + idx;
          const isCursor = realIdx === cur.i - 1 && cur.i > 0;
          const isFuture = realIdx >= cur.i;
          return (
            <span key={realIdx} style={{
              padding: "2px 3px",
              color: isFuture ? "#475569" : (c === "A" ? "#34d399" : "#f472b6"),
              background: isCursor ? "#fde68a" : "transparent",
              borderRadius: 3,
              fontWeight: isCursor ? 800 : 500,
              boxShadow: isCursor ? "0 0 0 1.5px #f59e0b" : "none",
            }}>{c}</span>
          );
        })}
        {end < scores.length && <span style={{ color: "#475569" }}>…</span>}
      </div>
    );
  };

  const eventBadge = () => {
    if (!cur.event) return null;
    const map = {
      A21: { bg: "#d1fae5", fg: "#065f46", txt: t(E, "Game! A reached 21 → score saved, reset", "게임! A 21 점 → 점수 저장, 리셋") },
      B21: { bg: "#fce7f3", fg: "#9d174d", txt: t(E, "Game! B reached 21 → score saved, reset", "게임! B 21 점 → 점수 저장, 리셋") },
      Awin: { bg: "#059669", fg: "#fff", txt: t(E, "🏆 Match over — A wins 2 games", "🏆 매치 종료 — A 가 2 게임 승") },
      Bwin: { bg: "#db2777", fg: "#fff", txt: t(E, "🏆 Match over — B wins 2 games", "🏆 매치 종료 — B 가 2 게임 승") },
    };
    const m = map[cur.event];
    return (
      <div style={{ background: m.bg, color: m.fg, borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 700, marginTop: 6 }}>
        {m.txt}
      </div>
    );
  };

  const cellStyle = (active) => ({
    background: active ? "#ecfdf5" : "#fff",
    border: `1.5px solid ${active ? "#10b981" : "#d1d5db"}`,
    borderRadius: 8, padding: "6px 8px", fontSize: 12, textAlign: "center", flex: 1, minWidth: 0,
  });

  const btn = (label, onClick, primary = false, disabled = false) => (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? "#e5e7eb" : (primary ? "#059669" : "#fff"),
      color: disabled ? "#9ca3af" : (primary ? "#fff" : "#059669"),
      border: `1.5px solid ${disabled ? "#e5e7eb" : "#059669"}`,
      borderRadius: 7, padding: "5px 10px", fontSize: 12, fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer",
    }}>{label}</button>
  );

  return (
    <div style={{ background: "#f0fdf4", border: "1.5px dashed #10b981", borderRadius: 12, padding: 12, marginTop: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
        🔬 {t(E, "Deep audit — step through the rally string", "자세히 보기 — 랠리 문자열을 한 칸씩 따라가요")}
      </div>

      {/* Preset chooser */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
        {PRESETS.map(p => (
          <button key={p.id} onClick={() => { setPresetId(p.id); setStep(0); }} style={{
            background: p.id === presetId ? "#059669" : "#fff",
            color: p.id === presetId ? "#fff" : "#065f46",
            border: "1.5px solid #059669", borderRadius: 7,
            padding: "4px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer",
          }}>{p.label}</button>
        ))}
      </div>

      {/* Rally tape */}
      {ralliesWindow()}
      <div style={{ fontSize: 11, color: C.dim, marginTop: 4, textAlign: "center" }}>
        {t(E, "char ", "글자 ")}<b>{cur.i}</b>{t(E, " of ", " / ")}<b>{scores.length}</b>
        {cur.ch && <> · {t(E, "just read: ", "방금 읽음: ")}<b style={{ color: cur.ch === "A" ? "#059669" : "#db2777" }}>{cur.ch}</b></>}
      </div>

      {/* State boxes */}
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <div style={cellStyle(cur.ch === "A")}>
          <div style={{ fontSize: 10, color: C.dim }}>game_a</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#059669" }}>{cur.ga}</div>
        </div>
        <div style={cellStyle(cur.ch === "B")}>
          <div style={{ fontSize: 10, color: C.dim }}>game_b</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#db2777" }}>{cur.gb}</div>
        </div>
        <div style={cellStyle(false)}>
          <div style={{ fontSize: 10, color: C.dim }}>wins_a</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#059669" }}>{cur.wa}</div>
        </div>
        <div style={cellStyle(false)}>
          <div style={{ fontSize: 10, color: C.dim }}>wins_b</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#db2777" }}>{cur.wb}</div>
        </div>
      </div>

      {/* Event banner */}
      {eventBadge()}

      {/* Results so far */}
      <div style={{ marginTop: 8, background: "#fff", border: "1px solid #d1fae5", borderRadius: 8, padding: "6px 10px", fontSize: 12 }}>
        <span style={{ color: C.dim, fontSize: 11, marginRight: 6 }}>{t(E, "results", "결과")}:</span>
        {cur.results.length === 0
          ? <span style={{ color: C.dim, fontStyle: "italic" }}>{t(E, "(empty)", "(없음)")}</span>
          : cur.results.map((r, idx) => (
              <span key={idx} style={{
                display: "inline-block", margin: "0 4px 0 0", padding: "2px 7px",
                background: r[0] === 21 ? "#d1fae5" : "#fce7f3",
                color: r[0] === 21 ? "#065f46" : "#9d174d",
                borderRadius: 12, fontWeight: 700, fontSize: 11,
              }}>{r[0]}-{r[1]}</span>
            ))}
        {cur.done && <span style={{ marginLeft: 6, color: "#059669", fontWeight: 800 }}>· {t(E, "match end", "매치 종료")}</span>}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
        {btn(t(E, "⏮ Reset", "⏮ 처음으로"), reset, false, safeStep === 0)}
        {btn(t(E, "◀ Back", "◀ 뒤로"), back, false, safeStep === 0)}
        {btn(t(E, "Step ▶", "한 칸 ▶"), fwd, true, safeStep === trace.length - 1)}
        {btn(t(E, "⏭ Next event", "⏭ 다음 이벤트"), jumpEvent, false, safeStep === trace.length - 1)}
        {btn(t(E, "Finish ⏭⏭", "끝까지 ⏭⏭"), finish, false, safeStep === trace.length - 1)}
      </div>

      {cur.results.length > 0 && afterFirstGame}
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBadmintonCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Read the match record, then work out each game's score and the winner.",
        "경기 기록을 보고 게임 점수와 매치 승자를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udff8"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Badminton</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Print each game's final score and the overall match winner.",
                "각 게임의 최종 점수와 매치 최종 승자를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#059669" }}>{t(E, "Two players A and B play badminton", "두 선수 A 와 B 가 배드민턴")}</b>
                  {t(E, " — best-of-3 games. Whoever wins 2 games wins the match. A game goes to the first to ", "을 쳐요. 2 게임을 먼저 이긴 쪽이 매치 승자예요. 한 게임은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "21 points", "21 점")}</b>
                  {t(E, " — 20-20 does not need a 2-point lead; 21 ends it.", "을 먼저 낸 쪽이 이겨요 — 20-20 이 돼도 21 점이면 바로 끝나요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One point being scored is called one rally. For every rally we're given the winner as a ", "한 점이 나는 것을 랠리 한 번이라고 해요. 랠리마다 이긴 사람을 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "string of A/B characters in order", "순서대로 A/B 문자열")}</b>
                  {t(E, ".", "로 줘요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "each game's final score and the overall match winner", "각 게임의 최종 점수와 매치 최종 승자")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    /* 1-2: 입출력 형식 (mcc19rect2 4-박스 표준)
       2026-09-17: 이 quest 는 **출력 모양을 한 번도 안 보여줬다.** 시뮬은 결과 칩
       (21-0)만 띄우고, 학생은 코드의 print 를 보고서야 "아, 21-0 을 줄마다 찍고
       마지막에 승자를 찍는구나" 를 알았다. 샘플로 그 모양을 먼저 보여준다. */
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive — and what should come out?",
        "무엇이 들어오고, 무엇을 내보내야 할까요?"),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#065f46", fontWeight: 800 }}>ABBA…</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— one line of A/B letters, in rally order", "— 한 줄에 A/B 글자, 랠리 순서대로")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {t(E, "One line per game: A's points, a dash, then B's points.\nThen one more line with the match winner's letter.",
                    "게임마다 한 줄씩, A 의 점수와 B 의 점수를 - 로 이어 적어요.\n마지막 한 줄엔 매치를 이긴 선수의 글자를 적어요.")}
            </div>
          </div>
          {/* Sample */}
          <div style={{ marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#065f46", marginBottom: 8 }}>🔍 {t(E, "Sample", "샘플")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
              <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>{t(E, "input", "입력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#14532d", wordBreak: "break-all" }}>
                  AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                </div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>{t(E, "42 A's, all on one line", "A 가 42 개, 한 줄이에요")}</div>
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`21-0
21-0
A`}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", fontStyle: "italic" }}>
              {t(E, "Why only two lines of score? — step through it on the next page.",
                    "왜 점수 줄이 두 개뿐일까? — 다음 쪽에서 한 칸씩 따라가 봐요.")}
            </div>
          </div>
          {/* CONSTRAINTS */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {/* 2026-09-17: 원문 길이 상한을 못 찾았다. 지어내지 않고 이 방법이 감당하는 크기를 적는다. */}
              {t(E, "The line holds only the letters A and B. We could not find the original limit on its length. What we can say: this method reads each letter once and stops as soon as the match is decided, so even a very long record is fine.",
                    "줄에는 A 와 B 글자만 들어 있어요.\n기록이 길어야 몇 글자까지인지는 원문에서 확인하지 못했어요.\n대신 이 방법이 감당하는 크기를 적어요 — 글자를 한 번씩만 읽고,\n매치가 끝나면 남은 글자는 아예 안 봐요. 기록이 아무리 길어도 괜찮아요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Deep audit sim — step through the state machine
    {
      type: "reveal",
      narr: t(E,
        "Feed one rally at a time and watch the scores change.",
        "랠리를 한 개씩 넣으면서 점수가 어떻게 변하는지 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 6 }}>
            🔬 {t(E, "State-machine deep audit", "상태 기계를 한 글자씩 자세히 보기")}
          </div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 8, wordBreak: "keep-all" }}>
            {t(E,
              "Let's find out why the sample printed only two score lines. We watch four counters: ",
              "앞쪽 샘플이 왜 점수 줄을 두 개만 찍었는지 여기서 확인해요. 보는 값은 네 개예요 — ")}
            <b style={{ color: "#059669" }}>game_a</b>, <b style={{ color: "#db2777" }}>game_b</b>
            {t(E, " are the points in the game being played, ", " 는 지금 하는 게임의 점수, ")}
            <b style={{ color: "#059669" }}>wins_a</b>, <b style={{ color: "#db2777" }}>wins_b</b>
            {t(E, " are the games each player has won. The yellow ", " 는 이긴 게임 수예요. 노란 ")}
            <b>{t(E, "cursor", "커서")}</b>
            {t(E, " is the letter being read right now.", "가 지금 읽고 있는 글자예요.")}
          </div>
          <RallyAuditSim E={E} afterFirstGame={
            <div style={{ fontSize: 11, color: C.dim, marginTop: 8, lineHeight: 1.5, wordBreak: "keep-all" }}>
              💡 {t(E,
                "What just happened: at 21 both game scores went back to 0, but wins_a/wins_b stayed. So the match-end check only has to run right after a game ends — not on every letter.",
                "방금 본 것 — 21 점이 되자 두 게임 점수가 0 으로 돌아갔어요. 그런데 wins_a/wins_b 는 그대로 남았어요. 그래서 매치가 끝났는지는 글자마다 볼 필요가 없어요. 게임이 끝난 직후에만 보면 돼요.")}
            </div>
          } />
        </div>
      ),
    },
    // 1-4: Quiz
    {
      type: "quiz",
      /* 2026-09-17: 퀴즈·입력칸이 시뮬 **앞**에 있었다. 시뮬이 보여주는 것을
         글로 먼저 다 말하는 순서였다. 형제 quest(mcc19rect2)처럼 시뮬 뒤로 옮긴다. */
      narr: t(E,
        "Now answer it yourself.",
        "이번엔 직접 답해 볼 차례예요."),
      question: t(E,
        "A wins first 2 games. Is a 3rd game played?",
        "A 가 처음 2 게임을 이겼어요. 3 번째 게임을 할까요?"),
      options: [
        t(E, "No, A already won the match", "아니요, A 가 이미 매치를 이겼어요"),
        t(E, "Yes, all 3 must be played", "네, 3 게임을 모두 해야 해요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Once a player reaches 2 wins, the match is over immediately.",
        "맞아요! 한 선수가 2 승을 하면 매치는 바로 끝나요."),
    },
    // 1-5: Input
    {
      type: "input",
      narr: t(E,
        "Count the games in the sample record.",
        "샘플 기록에서 게임이 몇 번인지 세어 봐요."),
      question: t(E,
        "Input: 42 A's in a row. How many games are played total?",
        "A 가 42 개 연속으로 들어와요. 게임은 모두 몇 번 할까요?"),
      hint: t(E,
        "Each game ends at 21 points. When does the match stop?",
        "각 게임은 21 점에서 끝나요. 매치는 언제 멈출까요?"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBadmintonCh2(E, lang = "py") {
  return [
    // 2-1: CodeWalk — solution code, explained line by line in thinking order.
    {
      type: "badminton-walk",
      narr: t(E,
        "Read the solution code piece by piece.",
        "풀이 코드를 한 단락씩 읽어 봐요."),
    },
  ];
}
