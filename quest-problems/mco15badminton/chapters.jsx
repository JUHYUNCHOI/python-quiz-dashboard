import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { getBadmintonSections } from "./components";

/* ================================================================
   Deep-Audit Sim: step through an A/B string, watch the state machine
   ================================================================ */
function RallyAuditSim({ E }) {
  const PRESETS = [
    { id: "short", label: t(E, "Short (A 21-0, A 21-0)", "짧음 (A 21-0, A 21-0)"), s: "A".repeat(42) },
    { id: "mix",   label: t(E, "Mixed: A wins 2-1", "혼합: A 2-1 승"),
      s: "B".repeat(21) + "A".repeat(21) + "BABABABABABABABABABABA".slice(0, 41) },
    { id: "tight", label: t(E, "B wins 2-1 tight", "B 2-1 접전"),
      s: "A".repeat(21) + "B".repeat(21) + "B".repeat(21) },
  ];
  const [presetId, setPresetId] = useState("tight");
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
        🔬 {t(E, "Deep audit — step through the rally string", "딥 오딧 — 랠리 문자열 한 칸씩 따라가기")}
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
        {t(E, "char ", "문자 ")}<b>{cur.i}</b>{t(E, " of ", " / ")}<b>{scores.length}</b>
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
        {btn(t(E, "⏮ Reset", "⏮ 초기화"), reset, false, safeStep === 0)}
        {btn(t(E, "◀ Back", "◀ 뒤로"), back, false, safeStep === 0)}
        {btn(t(E, "Step ▶", "한 칸 ▶"), fwd, true, safeStep === trace.length - 1)}
        {btn(t(E, "⏭ Next event", "⏭ 다음 이벤트"), jumpEvent, false, safeStep === trace.length - 1)}
        {btn(t(E, "Finish ⏭⏭", "끝까지 ⏭⏭"), finish, false, safeStep === trace.length - 1)}
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "scores = input()  # string of A/B",
  "",
  "game_a, game_b = 0, 0  # points in current game",
  "wins_a, wins_b = 0, 0  # games won",
  "results = []",
  "",
  "for ch in scores:",
  "    if ch == 'A':",
  "        game_a += 1",
  "    else:",
  "        game_b += 1",
  "",
  "    if game_a == 21 or game_b == 21:",
  "        results.append((game_a, game_b))",
  "        if game_a == 21:",
  "            wins_a += 1",
  "        else:",
  "            wins_b += 1",
  "        game_a, game_b = 0, 0",
  "        if wins_a == 2 or wins_b == 2:",
  "            break",
  "",
  "for ga, gb in results:",
  "    print(f'{ga}-{gb}')",
  "print('A' if wins_a > wins_b else 'B')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBadmintonCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two players A and B play badminton: best-of-3 games, each game won by the first to 21 points. You're given a string of A/B characters in order — each character is who won that rally.\nPrint each game's final score and the overall match winner.",
        "두 선수 A 와 B 가 배드민턴: 3전 2선승제, 각 게임은 21 점 먼저 따면 승. 랠리 순서대로 A/B 가 적힌 문자열이 주어져요 — 각 문자는 그 랠리의 승자.\n각 게임의 최종 점수와 매치의 최종 승자를 출력해요."),
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
                  {t(E, " — best-of-3 games; each game won by the first to ", " — 3전 2선승제; 각 게임은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "21 points", "21 점")}</b>
                  {t(E, " (no win-by-2).", " 먼저 (2 점 차 규칙 없음).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the rally winners as a ", "랠리 승자가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "string of A/B characters in order", "순서대로 A/B 문자열")}</b>
                  {t(E, ".", " 로 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "each game's final score and the overall match winner", "각 게임의 최종 점수와 매치 최종 승자")}</b>
                  {t(E, ".", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "In best-of-3, one player needs to win 2 games to win the match.\nIf Player A wins the first two games, is a third game played?", "3전 2선승제에서 한 선수가 매치를 이기려면 2게임을 이겨야 해요. A가 처음 두 게임을 이기면 세 번째 게임을 하나?"),
      question: t(E,
        "A wins first 2 games. Is a 3rd game played?",
        "A가 처음 2게임을 이김. 3번째 게임을 하나?"),
      options: [
        t(E, "No, A already won the match", "아니, A가 이미 매치를 이겼어"),
        t(E, "Yes, all 3 must be played", "응, 3게임 모두 해야 해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Once a player reaches 2 wins, the match is over immediately.",
        "맞아! 한 선수가 2승에 도달하면 매치는 즉시 끝나."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If 42 consecutive A's are scored ('AAA...A'), A wins 21-0 twice.\nHow many games are played?", "42개의 연속 A가 입력되면 ('AAA...A'), A가 21-0으로 두 번 이겨. 총 몇 게임이 진행될까요?"),
      question: t(E,
        "Input: 42 A's in a row. How many games are played total?",
        "입력: A가 42개 연속. 총 몇 게임이 진행되나?"),
      hint: t(E,
        "Each game ends at 21 points. How many full games of 21 A's fit, and when does the match end?",
        "각 게임은 21 점에서 끝나. 21 개씩 끊어서 몇 게임이 들어가고, 매치는 언제 끝나는지 생각해봐."),
      answer: 2,
    },
    // 1-4: Deep audit sim — step through the state machine
    {
      type: "reveal",
      narr: t(E,
        "Now let's audit the whole state machine — char by char.\nPick a preset, then press Step ▶ to feed one rally at a time. Watch game_a / game_b climb, and see when a 21 triggers a save+reset, when wins_a or wins_b hits 2, and how the loop should stop.",
        "이제 상태 기계를 한 글자씩 감사해보자.\n프리셋을 고르고 'Step ▶' 으로 랠리를 한 개씩 먹여봐. game_a / game_b 가 올라가다가 21 이 되면 저장+리셋, wins_a 나 wins_b 가 2 되면 루프가 멈춰야 하는 순간을 직접 봐."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 6 }}>
            🔬 {t(E, "State-machine deep audit", "상태 기계 딥 오딧")}
          </div>
          <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 8 }}>
            {t(E,
              "Four counters tell the whole story: ",
              "4 개의 카운터가 모든 걸 말해줘: ")}
            <b style={{ color: "#059669" }}>game_a</b>, <b style={{ color: "#db2777" }}>game_b</b>
            {t(E, " (current game), ", " (현재 게임), ")}
            <b style={{ color: "#059669" }}>wins_a</b>, <b style={{ color: "#db2777" }}>wins_b</b>
            {t(E, " (games won). The ", " (이긴 게임 수). 노란 ")}
            <b>{t(E, "yellow cursor", "커서")}</b>
            {t(E, " is the char being processed.", " 가 지금 처리 중인 문자야.")}
          </div>
          <RallyAuditSim E={E} />
          <div style={{ fontSize: 11, color: C.dim, marginTop: 8, lineHeight: 1.5 }}>
            💡 {t(E,
              "Notice: after a 21, both game scores reset to 0 — but wins_a/wins_b carry over. The match-end check happens right after a game ends, not on every char.",
              "관찰: 21 점 후 두 게임 점수는 0 으로 리셋 — 하지만 wins_a/wins_b 는 그대로 유지. 매치 종료 체크는 매 문자마다가 아니라 게임이 끝난 직후에만 일어나.")}
          </div>
        </div>
      ),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBadmintonCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Walk through the rally string char by char, tracking each game's score. When one player hits 21, save the score, reset, and bump that player's game count. Stop at 2 game wins. Sections build it one piece at a time.",
        "랠리 문자열을 한 글자씩 순회하며 각 게임 점수 추적. 한 쪽이 21 점 도달 시 점수 저장, 초기화, 그 쪽 게임 승수 증가. 2 게임 승 달성 시 종료. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getBadmintonSections(E),
    },
  ];
}
