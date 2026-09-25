import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getHerdleSections } from "./components";

/* ──────────────────────────────────────────────────────────────
   Interactive Herdle simulator — type a 9-letter guess, watch
   the algorithm tag GREEN / YELLOW / GRAY one cell at a time.
   ────────────────────────────────────────────────────────────── */
function HerdleSim({ E }) {
  const ANSWER = ["A", "B", "C", "B", "A", "C", "C", "C", "A"];
  const [guess, setGuess] = useState(["A", "A", "C", "B", "B", "C", "C", "A", "A"]);
  const [step, setStep] = useState(0);

  const cellState = (i) => {
    if (step <= i) return "pending";
    if (guess[i] === ANSWER[i]) return "green";
    return "pass1-other";
  };

  let yellowSet = new Set();
  let greens = 0;
  if (step >= 10) {
    const remA = {};
    const otherIdx = [];
    for (let i = 0; i < 9; i++) {
      if (guess[i] === ANSWER[i]) greens++;
      else { remA[ANSWER[i]] = (remA[ANSWER[i]] || 0) + 1; otherIdx.push(i); }
    }
    const remainingA = { ...remA };
    for (const i of otherIdx) {
      const b = guess[i];
      if ((remainingA[b] || 0) > 0) { yellowSet.add(i); remainingA[b]--; }
    }
  } else {
    for (let i = 0; i < step; i++) if (guess[i] === ANSWER[i]) greens++;
  }
  const yellowCount = yellowSet.size;

  const tileBg = (i) => {
    const s = cellState(i);
    if (s === "green") return "#16a34a";
    if (yellowSet.has(i)) return "#ca8a04";
    if (step >= 10 && s === "pass1-other") return "#94a3b8";
    if (s === "pass1-other") return "#cbd5e1";
    return "#f1f5f9";
  };
  const tileColor = (i) => {
    const s = cellState(i);
    if (s === "green" || yellowSet.has(i) || (step >= 10 && s === "pass1-other")) return "#fff";
    return "#1e293b";
  };
  const tileBorder = (i) => {
    if (step >= 1 && step <= 9 && i === step - 1) return "3px solid #7c3aed";
    return "1.5px solid #cbd5e1";
  };

  const setCell = (i, v) => {
    const ch = (v || "").toUpperCase().slice(-1);
    if (!ch || /[A-Z]/.test(ch)) {
      const u = [...guess]; u[i] = ch || ""; setGuess(u); setStep(0);
    }
  };

  const stepLabel =
    step === 0 ? t(E, "Idle. Press ▶ Step to start Pass 1.", "기다리는 중이에요. ▶ 한 단계 를 눌러 1차 훑기를 시작해요.")
    : step <= 9 ? t(E,
        `Pass 1 · cell ${step}/9 — compare guess[${step - 1}]='${guess[step - 1] || "?"}' to answer[${step - 1}]='${ANSWER[step - 1]}' → ${guess[step - 1] === ANSWER[step - 1] ? "GREEN ✓" : "not green, save for pass 2"}`,
        `1차 훑기 · 칸 ${step}/9 — 추측[${step - 1}]='${guess[step - 1] || "?"}' 와 정답[${step - 1}]='${ANSWER[step - 1]}' 을 견줘요 → ${guess[step - 1] === ANSWER[step - 1] ? "GREEN ✓" : "초록이 아니라서 2차 훑기로"}`)
    : t(E,
        `Pass 2 done — yellow uses remaining counts. Result: ${greens} green, ${yellowCount} yellow.`,
        `2차 훑기까지 끝났어요 — 노랑은 남은 개수만큼만 줘요. 초록 ${greens}개, 노랑 ${yellowCount}개예요.`);

  const stepBtnLabel =
    step === 0 ? t(E, "▶ Step 1 (Pass 1)", "▶ 1단계 (1차 훑기)")
    : step < 9 ? t(E, `▶ Step ${step + 1} (Pass 1)`, `▶ ${step + 1}단계 (1차 훑기)`)
    : step === 9 ? t(E, "▶ Pass 2 (count yellows)", "▶ 2차 훑기 (노랑 세기)")
    : t(E, "✓ Done", "✓ 완료");

  return (
    <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: 14, marginTop: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", marginBottom: 8, letterSpacing: 0.4 }}>
        🧪 {t(E, "Try It — Interactive Herdle", "직접 해보기 — Herdle 시뮬")}
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 4, textAlign: "center" }}>
            {t(E, "Answer (secret)", "정답 (비밀)")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 36px)", gap: 4 }}>
            {ANSWER.map((v, i) => (
              <div key={i} style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                background: "#0891b2", color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 6,
              }}>{v}</div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 4, textAlign: "center" }}>
            {t(E, "Your guess (A/B/C)", "내 추측 (A/B/C)")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 36px)", gap: 4 }}>
            {guess.map((v, i) => (
              <input key={i} value={v} onChange={(e) => setCell(i, e.target.value)} maxLength={1}
                style={{
                  width: 36, height: 36, textAlign: "center", fontWeight: 800, fontSize: 16,
                  background: tileBg(i), color: tileColor(i), border: tileBorder(i),
                  borderRadius: 6, outline: "none", textTransform: "uppercase",
                  transition: "background .25s, color .25s",
                }} />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 120 }}>
          <div style={{ background: "#dcfce7", color: "#166534", borderRadius: 6, padding: "6px 10px", fontSize: 13, fontWeight: 700 }}>
            🟩 {t(E, "Green", "초록")}: {greens}
          </div>
          <div style={{ background: "#fef9c3", color: "#854d0e", borderRadius: 6, padding: "6px 10px", fontSize: 13, fontWeight: 700 }}>
            🟨 {t(E, "Yellow", "노랑")}: {yellowCount}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: C.text, lineHeight: 1.5, background: "#fff", border: "1px dashed #cbd5e1", borderRadius: 8, padding: "8px 10px" }}>
        {stepLabel}
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
        <button onClick={() => setStep((s) => Math.min(s + 1, 10))} disabled={step >= 10}
          style={{
            background: step >= 10 ? "#cbd5e1" : "#7c3aed", color: "#fff", border: "none",
            borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700,
            cursor: step >= 10 ? "default" : "pointer",
          }}>{stepBtnLabel}</button>
        <button onClick={() => setStep(0)}
          style={{
            background: "#fff", color: "#7c3aed", border: "1.5px solid #7c3aed",
            borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>{t(E, "↺ Reset steps", "↺ 단계 처음으로")}</button>
        <button onClick={() => { setGuess(["A","A","C","B","B","C","C","A","A"]); setStep(0); }}
          style={{
            background: "#fff", color: C.dim, border: "1.5px solid #cbd5e1",
            borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>{t(E, "↻ Sample guess", "↻ 예시 추측")}</button>
      </div>

      <div style={{ marginTop: 8, fontSize: 11, color: C.dim, lineHeight: 1.5 }}>
        {t(E,
          "Edit any guess cell to retry. Pass 1 walks 9 cells and locks GREEN matches; Pass 2 hands out YELLOWs based on remaining-count of each breed.",
          "추측 칸을 바꿔서 다시 해봐요. 1차 훑기는 9칸을 돌며 GREEN 을 확정해요.\n2차 훑기는 품종마다 남은 개수를 보고 YELLOW 를 나눠 줘요.")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHerdleCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "It's a Wordle game on cow breeds. Same spot, same breed is GREEN; elsewhere is YELLOW.",
        "3×3 격자에 소 품종을 적는 Wordle 게임이에요.\n정답 격자와 추측 격자를 견줘서, 같은 자리에 같은 품종이면 GREEN 이에요.\n아니지만 그 품종이 정답의 다른 칸에 남아 있으면 YELLOW 예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udfe9"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Herdle</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2022 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the count of GREEN cells, then YELLOW cells.",
                "GREEN 칸이 몇 개인지, YELLOW 칸이 몇 개인지 차례로 출력해요.")}
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
                  {t(E, "Two ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "3×3 grids of cow breeds (letters)", "3×3 소 품종 격자 (글자)")}</b>
                  {t(E, " are given — the secret ", " 두 개가 주어져요 — 정답 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "answer", "answer")}</b>
                  {t(E, " grid and the player's ", " 격자와 플레이어의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "guess", "guess")}</b>
                  {t(E, " grid.", " 격자예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#16a34a" }}>{t(E, "GREEN", "GREEN")}</b>
                  {t(E, ": guess cell exactly equals the same cell in the answer.",
                        " 은 추측 칸이 정답의 같은 칸과 똑같을 때예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#ca8a04" }}>{t(E, "YELLOW", "YELLOW")}</b>
                  {t(E, ": breed appears somewhere ELSE in the answer (not GREEN). Each answer-cell can supply at most one YELLOW.",
                        " 은 GREEN 은 아니지만 그 품종이 정답의 다른 칸에 있을 때예요.\n정답 칸 하나는 YELLOW 를 하나까지만 만들 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "the count of GREEN cells, then YELLOW cells", "GREEN 칸 개수와 YELLOW 칸 개수")}</b>
                  {t(E, ".", "를 차례로 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <HerdleSim E={E} />
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=1179) — 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? 3 lines for the answer, then 3 more for the guess.",
        "정답 격자 3줄, 그다음 추측 격자 3줄이 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>{t(E, "line 1~3", "1~3번째 줄")}</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the answer grid, one 3-letter row per line (A~Z)", "— 정답 격자, 한 줄에 3글자씩 (A~Z)")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>{t(E, "line 4~6", "4~6번째 줄")}</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the guess grid, same format", "— 추측 격자, 같은 형식")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "Two lines: the count of GREEN cells, then the count of YELLOW cells.",
                  "두 줄로 출력해요: GREEN 칸 수, 그다음 줄에 YELLOW 칸 수.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>{t(E, "grid size is always 3 x 3", "격자 크기는 항상 3 x 3")}</div>
              <div>{t(E, "each letter is one of A..Z (26 possible breeds)", "각 글자는 A~Z 중 하나 (품종 26가지)")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If the answer grid is all 'A' and the guess grid is also all 'A', every cell matches exactly!", "정답도 추측도 전부 'A' 라면 아홉 칸이 모두 딱 맞아요."),
      question: t(E,
        "Answer grid: all 'A'. Guess grid: all 'A'. How many green and yellow tiles?",
        "정답 격자도 전부 'A' 이고 추측 격자도 전부 'A' 예요.\n초록 칸과 노랑 칸은 각각 몇 개일까요?"),
      options: [
        t(E, "9 green, 0 yellow", "초록 9, 노랑 0"),
        t(E, "0 green, 9 yellow", "초록 0, 노랑 9"),
        t(E, "9 green, 9 yellow", "초록 9, 노랑 9"),
      ],
      correct: 0,
      explain: t(E,
        "All 9 positions match exactly, so 9 green, 0 yellow. Yellows only count non-green matches.",
        "아홉 자리가 모두 딱 맞으니 초록 9개, 노랑 0개예요.\n노랑은 초록이 아닌 것만 세거든요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Both grids are all 'A'. How many green tiles?", "두 격자가 모두 'A' 예요. 초록 칸은 몇 개일까요?"),
      question: t(E,
        "Answer=all 'A', Guess=all 'A'. Green count?",
        "정답도 추측도 전부 'A' 일 때 초록은 몇 개인가요?"),
      hint: t(E,
        "Compare each guess cell to the same answer cell — count exact matches.",
        "추측 칸을 같은 자리의 정답 칸과 하나씩 견줘 보면서 세어 봐요."),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHerdleCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "First pass: count GREEN and note leftover letters. Second pass: match leftovers for YELLOW.",
        "1차 훑기에서 GREEN 을 세고 남은 글자를 적어 둬요.\n2차 훑기에서 남은 글자끼리 짝을 지으면 YELLOW 개수가 나와요."),
      sections: getHerdleSections(E),
    },
  ];
}
