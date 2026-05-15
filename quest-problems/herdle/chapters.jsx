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
    step === 0 ? t(E, "Idle. Press ▶ Step to start Pass 1.", "대기 중. ▶ 한 단계 를 눌러 1차 패스 시작.")
    : step <= 9 ? t(E,
        `Pass 1 · cell ${step}/9 — compare guess[${step - 1}]='${guess[step - 1] || "?"}' to answer[${step - 1}]='${ANSWER[step - 1]}' → ${guess[step - 1] === ANSWER[step - 1] ? "GREEN ✓" : "not green, save for pass 2"}`,
        `1차 패스 · 칸 ${step}/9 — 추측[${step - 1}]='${guess[step - 1] || "?"}' 와 정답[${step - 1}]='${ANSWER[step - 1]}' 비교 → ${guess[step - 1] === ANSWER[step - 1] ? "GREEN ✓" : "초록 아님, 2차 패스로"}`)
    : t(E,
        `Pass 2 done — yellow uses remaining counts. Result: ${greens} green, ${yellowCount} yellow.`,
        `2차 패스 완료 — 노랑은 남은 개수로 매칭. 결과: 초록 ${greens}, 노랑 ${yellowCount}.`);

  const stepBtnLabel =
    step === 0 ? t(E, "▶ Step 1 (Pass 1)", "▶ 1단계 (1차 패스)")
    : step < 9 ? t(E, `▶ Step ${step + 1} (Pass 1)`, `▶ ${step + 1}단계 (1차 패스)`)
    : step === 9 ? t(E, "▶ Pass 2 (count yellows)", "▶ 2차 패스 (노랑 세기)")
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
          }}>{t(E, "↺ Reset steps", "↺ 단계 초기화")}</button>
        <button onClick={() => { setGuess(["A","A","C","B","B","C","C","A","A"]); setStep(0); }}
          style={{
            background: "#fff", color: C.dim, border: "1.5px solid #cbd5e1",
            borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>{t(E, "↻ Sample guess", "↻ 예시 추측")}</button>
      </div>

      <div style={{ marginTop: 8, fontSize: 11, color: C.dim, lineHeight: 1.5 }}>
        {t(E,
          "Edit any guess cell to retry. Pass 1 walks 9 cells and locks GREEN matches; Pass 2 hands out YELLOWs based on remaining-count of each breed.",
          "추측 칸을 수정해서 다시 해봐. 1차 패스는 9칸을 돌면서 GREEN을 확정하고, 2차 패스는 각 품종 남은 개수를 보고 YELLOW를 분배해.")}
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
        "A Wordle-style game on a 3×3 grid of cow breeds. You're given the secret answer grid AND the player's guess grid.\nFor each guess cell: GREEN if the breed matches the same cell in the answer; otherwise YELLOW if that breed appears elsewhere in the answer (limited by remaining count).\nCount GREEN cells and YELLOW cells.",
        "3×3 소 품종 그리드로 하는 Wordle 게임이에요. 비밀 정답 그리드와 플레이어의 추측 그리드가 주어져요.\n각 추측 칸에 대해: 같은 위치의 정답과 같으면 GREEN, 아니라면 그 품종이 정답 다른 곳에 남아있으면 YELLOW (남은 개수만큼만).\nGREEN 칸과 YELLOW 칸의 수를 세요."),
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
                "GREEN 칸 개수와 YELLOW 칸 개수를 차례로 출력.")}
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
                  <b style={{ color: "#059669" }}>{t(E, "3×3 grids of cow breeds (letters)", "3×3 소 품종 그리드 (문자)")}</b>
                  {t(E, " are given — the secret ", " 두 개가 주어져요 — 정답 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "answer", "answer")}</b>
                  {t(E, " grid and the player's ", " 그리드와 플레이어의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "guess", "guess")}</b>
                  {t(E, " grid.", " 그리드.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#16a34a" }}>{t(E, "GREEN", "GREEN")}</b>
                  {t(E, ": guess cell exactly equals the same cell in the answer.",
                        ": 추측 칸이 정답의 같은 칸과 정확히 같음.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#ca8a04" }}>{t(E, "YELLOW", "YELLOW")}</b>
                  {t(E, ": breed appears somewhere ELSE in the answer (not GREEN). Each answer-cell can supply at most one YELLOW.",
                        ": 그 품종이 정답의 다른 칸에 있음 (GREEN 아님). 정답 칸 하나는 최대 1개의 YELLOW만 만들 수 있어요.")}
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
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If the answer grid is all 'A' and the guess grid is also all 'A', every cell matches exactly!", "정답 그리드가 전부 'A'이고 추측 그리드도 전부 'A'이면, 모든 셀이 정확히 일치해요!"),
      question: t(E,
        "Answer grid: all 'A'. Guess grid: all 'A'. How many green and yellow tiles?",
        "정답 그리드: 전부 'A'. 추측 그리드: 전부 'A'. 초록과 노란 타일 수는?"),
      options: [
        t(E, "9 green, 0 yellow", "초록 9, 노랑 0"),
        t(E, "0 green, 9 yellow", "초록 0, 노랑 9"),
        t(E, "9 green, 9 yellow", "초록 9, 노랑 9"),
      ],
      correct: 0,
      explain: t(E,
        "All 9 positions match exactly, so 9 green, 0 yellow. Yellows only count non-green matches.",
        "9개 위치 모두 정확히 일치하므로 초록 9, 노랑 0. 노랑은 초록이 아닌 매칭만 세."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Both grids are all 'A'. How many green tiles?", "두 그리드가 모두 'A'야. 초록 타일은 몇 개?"),
      question: t(E,
        "Answer=all 'A', Guess=all 'A'. Green count?",
        "정답=전부 'A', 추측=전부 'A'. 초록 개수?"),
      hint: t(E,
        "Compare each guess cell to the same answer cell — count exact matches.",
        "각 추측 칸을 같은 위치 정답 칸과 비교 — 정확한 일치를 세어 봐."),
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
        "First pass: count GREEN (exact matches) and record remaining guess / answer letters. Second pass: match remaining guess letters with remaining answer letters → YELLOW count. Sections build it one piece at a time.",
        "첫 패스: GREEN 카운트하고 남은 추측 / 정답 글자 기록. 두 번째 패스: 남은 추측을 남은 정답과 매칭 → YELLOW. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getHerdleSections(E),
    },
  ];
}
