import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getShellGameSections } from "./components";

/* Python syntax highlighter (shared across snippets) */
const PY_KW = new Set(["from","import","for","in","if","else","elif","def","return","and","or","not","while","break","continue","pass","class","with","as","try","except","finally","raise","yield","lambda","is","None","True","False","global","nonlocal"]);
const PY_BUILTIN = new Set(["print","input","range","len","sum","map","int","str","chr","ord","min","max","sorted","reversed","list","dict","set","tuple","enumerate","zip","abs","round","type","isinstance","open","filter","any","all","bool","float"]);

function pyHighlight(line, baseColor) {
  const tokens = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "'" || line[i] === '"') {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) { if (line[j] === "\\") j++; j++; }
      tokens.push({ text: line.slice(i, j + 1), color: "#a5d6a7" });
      i = j + 1;
    } else if (line[i] === "#") {
      tokens.push({ text: line.slice(i), color: "#6b7280" });
      i = line.length;
    } else if (/[0-9]/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>[\]:]/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#f9a825" });
      i = j;
    } else if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z_0-9]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (PY_KW.has(word)) tokens.push({ text: word, color: "#c792ea" });
      else if (PY_BUILTIN.has(word)) tokens.push({ text: word, color: "#82aaff" });
      else tokens.push({ text: word, color: baseColor });
      i = j;
    } else if ("=<>!+-*/%&|^~".includes(line[i])) {
      let j = i;
      while (j < line.length && "=<>!+-*/%&|^~".includes(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#89ddff" });
      i = j;
    } else {
      tokens.push({ text: line[i], color: baseColor });
      i++;
    }
  }
  return tokens;
}

/* Helper: code snippet box (token-highlighted Python) */
const CodeSnippet = ({ lines, highlight: hl }) => (
  <div style={{
    background: "#1e293b", borderRadius: 10, padding: "10px 8px",
    overflowX: "auto", fontSize: 12, lineHeight: 1.8,
    fontFamily: "'JetBrains Mono', monospace", marginTop: 8,
  }}>
    {lines.map((l, i) => {
      const isHl = hl && hl.includes(i);
      const baseColor = isHl ? "#fca5a5" : "#e2e8f0";
      const tokens = pyHighlight(l, baseColor);
      return (
        <div key={i} style={{
          display: "flex", minHeight: 20,
          background: isHl ? "rgba(220,38,38,.12)" : "transparent",
          borderRadius: 4, padding: "0 4px",
        }}>
          <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
          <span style={{ whiteSpace: "pre", wordBreak: "break-all" }}>
            {tokens.map((tk, j) => (
              <span key={j} style={{ color: tk.color }}>{tk.text}</span>
            ))}
          </span>
        </div>
      );
    })}
  </div>
);

/* Helper: shell visual */
const ShellRow = ({ shells, pebble, guess, label, E: isE }) => {
  const colors = ["#6366f1", "#10b981", "#f59e0b"];
  return (
    <div style={{ marginBottom: 6 }}>
      {label && <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>}
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {[1, 2, 3].map(pos => {
          const hasPebble = pebble === pos;
          const isGuess = guess === pos;
          return (
            <div key={pos} style={{
              width: 56, height: 56, borderRadius: 12,
              background: hasPebble ? "#fef3c7" : "#f3f4f6",
              border: `3px solid ${isGuess ? "#dc2626" : hasPebble ? "#f59e0b" : "#d1d5db"}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: isGuess ? "0 0 8px rgba(220,38,38,.25)" : "none",
              position: "relative",
            }}>
              <div style={{ fontSize: 22 }}>{"🐚"}</div>
              {hasPebble && (
                <div style={{
                  position: "absolute", bottom: -9, width: 14, height: 14, borderRadius: "50%",
                  background: "#fff", border: "1.5px solid #f59e0b",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, lineHeight: 1, boxShadow: "0 1px 3px rgba(0,0,0,.15)",
                }}>{"⚪"}</div>
              )}
              {isGuess && <div style={{
                position: "absolute", top: -8, right: -8, fontSize: 10,
                background: "#dc2626", color: "#fff", borderRadius: 10, padding: "1px 5px", fontWeight: 600,
              }}>{isE ? "G" : "추"}</div>}
              <div style={{ position: "absolute", top: -16, fontSize: 10, color: C.dim, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>{pos}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


/* Interactive: 3-shell pebble tracker
   Steps through a fixed swap sequence; tracks pebble + score for all 3 starts. */
const SIM_SWAPS = [
  { a: 1, b: 2, g: 1 },
  { a: 3, b: 2, g: 1 },
  { a: 1, b: 3, g: 1 },
];

function tracePebble(start, swaps, upTo) {
  let pos = start;
  let score = 0;
  for (let i = 0; i < upTo; i++) {
    const { a, b, g } = swaps[i];
    if (pos === a) pos = b;
    else if (pos === b) pos = a;
    if (pos === g) score++;
  }
  return { pos, score };
}

function ShellSim({ E: isE }) {
  const [step, setStep] = useState(0); // 0 = init, 1..N after each swap
  const N = SIM_SWAPS.length;
  const traces = [1, 2, 3].map(s => tracePebble(s, SIM_SWAPS, step));
  const lastSwap = step > 0 ? SIM_SWAPS[step - 1] : null;
  const colors = ["#3b82f6", "#10b981", "#f59e0b"];

  const next = () => setStep(s => Math.min(N, s + 1));
  const reset = () => setStep(0);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
        {t(isE, "🎮 Try It: 3-Shell Tracker", "🎮 직접 해 보기 — 컵 세 개 따라가기")}
      </div>
      <div style={{
        background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10,
        padding: "8px 12px", marginBottom: 10, fontSize: 12, color: "#7c2d12", lineHeight: 1.6,
      }}>
        {t(isE,
          "Press Next to apply each swap to all 3 starts. Watch which start collects the most correct guesses.",
          "Next 를 누르면 시작 위치 세 곳에 같은 바꾸기가 한 번씩 적용돼요. 어느 시작이 가장 많이 맞히는지 보세요.")}
      </div>

      {/* Swap timeline */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 }}>
        {SIM_SWAPS.map((sw, i) => {
          const done = i < step;
          const cur = i === step - 1;
          return (
            <div key={i} style={{
              fontSize: 11, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
              padding: "4px 8px", borderRadius: 8,
              background: cur ? "#dc2626" : done ? "#fee2e2" : "#f3f4f6",
              color: cur ? "#fff" : done ? "#b91c1c" : C.dim,
              border: `1px solid ${cur ? "#dc2626" : done ? "#fca5a5" : "#e5e7eb"}`,
            }}>
              {`(${sw.a},${sw.b},${sw.g})`}
            </div>
          );
        })}
      </div>

      {/* Status */}
      <div style={{
        textAlign: "center", fontSize: 12, color: C.dim, marginBottom: 8,
        fontFamily: "'JetBrains Mono',monospace",
      }}>
        {step === 0
          ? t(isE, "Round 0 — initial positions", "라운드 0 — 시작 상태")
          : t(isE,
              `Round ${step}/${N} — swapped ${lastSwap.a}↔${lastSwap.b}, guess=${lastSwap.g}`,
              `라운드 ${step}/${N} — ${lastSwap.a}↔${lastSwap.b} 스왑, 추측=${lastSwap.g}`)}
      </div>

      {/* Three rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[1, 2, 3].map(start => {
          const { pos, score } = traces[start - 1];
          return (
            <div key={start} style={{
              padding: "10px 10px 6px",
              borderRadius: 10,
              background: `${colors[start - 1]}10`,
              border: `1px solid ${colors[start - 1]}40`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: colors[start - 1] }}>
                  {t(isE, `Start = ${start}`, `시작 = ${start}`)}
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 800,
                  color: score > 0 ? "#059669" : C.dim,
                  fontFamily: "'JetBrains Mono',monospace",
                }}>
                  {t(isE, `score: ${score}`, `점수: ${score}`)}
                </div>
              </div>
              <div style={{ paddingTop: 14 }}>
                <ShellRow
                  shells={[1, 2, 3]}
                  pebble={pos}
                  guess={step > 0 ? lastSwap.g : null}
                  E={isE}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14 }}>
        <button
          onClick={next}
          disabled={step >= N}
          style={{
            background: step >= N ? "#e5e7eb" : "#dc2626",
            color: step >= N ? "#9ca3af" : "#fff",
            border: "none", borderRadius: 8, padding: "6px 16px",
            fontSize: 13, fontWeight: 700,
            cursor: step >= N ? "not-allowed" : "pointer",
          }}
        >
          {t(isE, "Next swap ▶", "다음 스왑 ▶")}
        </button>
        <button
          onClick={reset}
          style={{
            background: "#fff", color: "#dc2626",
            border: "1.5px solid #dc2626", borderRadius: 8, padding: "6px 16px",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}
        >
          {t(isE, "↺ Reset", "↺ 처음")}
        </button>
      </div>

      {step >= N && (
        <div style={{
          marginTop: 12, textAlign: "center", fontSize: 13, fontWeight: 700,
          color: "#dc2626", background: "#fef2f2", border: "1px solid #fca5a5",
          borderRadius: 8, padding: "8px 10px",
        }}>
          {t(isE,
            `Best = max(${traces[0].score}, ${traces[1].score}, ${traces[2].score}) = ${Math.max(traces[0].score, traces[1].score, traces[2].score)}`,
            `최대 = max(${traces[0].score}, ${traces[1].score}, ${traces[2].score}) = ${Math.max(traces[0].score, traces[1].score, traces[2].score)}`)}
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 문제 이해 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeShellCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "The classic shell game — N rounds each swap two shells then guess one. Print the MAXIMUM correct guesses over all 3 possible starting shells.",
        "Elsie 가 가장 많이 맞히려면 조약돌이 어디서 시작해야 할까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🐚"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Shell Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2019 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the maximum possible number of correct Elsie guesses, taken over all 3 starting positions.",
                "시작 위치 세 가지를 모두 해 보고, Elsie 가 가장 많이 맞힌 횟수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A pebble hides under ", "조약돌이 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "one of 3 shells (positions 1, 2, 3)", "3개 컵 중 하나 (위치 1, 2, 3)")}</b>
                  {t(E, ".", " 아래 숨겨져 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "N rounds", "N개의 라운드")}</b>
                  {t(E, " — each round gives ", "가 있고, 각 라운드는 ")}
                  <b style={{ color: "#7c3aed" }}>(a, b, g)</b>
                  {t(E, ": Bessie swaps shells a and b, then Elsie guesses shell g.",
                        " — Bessie가 컵 a와 b를 바꾸고, Elsie가 컵 g라고 추측해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The pebble's ", "조약돌의 ")}
                  <b style={{ color: "#16a34a" }}>{t(E, "starting position is unknown", "시작 위치는 알 수 없어요")}</b>
                  {t(E, ".", "")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Try all 3 starting positions; print the ", "3가지 시작 위치를 모두 시도해서, ")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum number of correct Elsie guesses", "Elsie가 가장 많이 맞히는 경우의 정답 수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: What is a swap?
    {
      type: "reveal",
      narr: t(E,
        "A swap exchanges the positions of two shells.\nIf the pebble is under one of the swapped shells, it moves!\nIf not, it stays put.", "스왑은 두 컵의 위치를 바꿔. 조약돌이 교환되는 컵 중 하나 아래에 있으면 이동해요! 아니면 그대로 있어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 10 }}>
            {t(E, "How Swaps Work", "스왑 작동 방식")}
          </div>
          <div style={{ marginBottom: 14, paddingTop: 16 }}>
            <ShellRow shells={[1, 2, 3]} pebble={2} label={t(E, "Before: pebble at 2", "이전: 조약돌 2번")} E={E} />
          </div>
          <div style={{ textAlign: "center", fontSize: 14, fontWeight: 600, color: "#dc2626", margin: "8px 0" }}>
            {t(E, "Swap 1 ↔ 3", "스왑 1 ↔ 3")}
          </div>
          <div style={{ paddingTop: 16 }}>
            <ShellRow shells={[1, 2, 3]} pebble={2} label={t(E, "After: pebble STILL at 2!", "이후: 조약돌 여전히 2번!")} E={E} />
          </div>
          <div style={{ marginTop: 10, background: "#fef2f2", borderRadius: 10, padding: 10, border: "1px solid #fca5a5", fontSize: 12, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "The pebble was at 2.\nWe swapped 1 and 3. Since the pebble wasn't under 1 or 3, it doesn't move!", "조약돌은 2 번에 있었어요.\n바꾼 건 1 번과 3 번이에요. 조약돌이 있던 2 번은 건드리지 않았으니 그대로예요!")}
          </div>
        </div>),
    },
    // 1-3: Quiz — swap understanding
    {
      type: "quiz",
      narr: t(E,
        "Now a case where the pebble IS under one of the swapped shells.\nPebble at 1, swap 1 and 3.\nWhere does it go?", "이번엔 조약돌이 있는 컵을 바꿔요. 1 번과 3 번을 바꿉니다."),
      question: t(E,
        "Pebble at shell 1. Swap shells 1 ↔ 3. Where is the pebble now?",
        "조약돌이 1번 컵. 1번 ↔ 3번 스왑. 조약돌은 이제 어디?"),
      options: [
        t(E, "Still at 1", "여전히 1번"),
        t(E, "At 2", "2번"),
        t(E, "At 3", "3번"),
      ],
      correct: 2,
      explain: t(E,
        "The pebble was at 1. We swapped 1 and 3, so the pebble moves from 1 to 3!",
        "조약돌이 1번에 있었어요. 1번과 3번을 바꿨으니 조약돌은 3번으로 가요!"),
    },
    // 1-4: Quiz — number of starting positions
    {
      type: "quiz",
      narr: t(E,
        "Since there are exactly 3 shells, how many starting positions do we need to try?", "컵이 세 개니까 시작 위치를 몇 가지 해 봐야 할까요?"),
      question: t(E,
        "How many possible starting positions for the pebble?",
        "조약돌이 시작할 수 있는 자리는 몇 가지일까요?"),
      options: [
        t(E, "1 — just pick the middle", "1 — 가운데만 골라요"),
        t(E, "3 — try all shell positions", "3 — 컵 세 자리를 다 해 봐요"),
        t(E, "N — depends on swap count", "N — 바꾼 횟수에 따라 달라요"),
      ],
      correct: 1,
      explain: t(E,
        "Only 3 shells, so only 3 possible starts. Try each, simulate, take the max!",
        "컵이 세 개니 시작 위치도 세 가지예요. 각각 해 보고 제일 큰 값을 고르면 끝이에요!"),
    },
    // 1-5: Input practice
    {
      type: "input",
      narr: t(E,
        "Quick check — picture the swap and see where the pebble lands.",
        "직접 — 스왑을 머릿속에 그려보고 조약돌이 어디로 가는지 확인."),
      question: t(E,
        "Pebble at 2. Swap 2↔3. Now pebble is at position...?",
        "조약돌 2번. 2↔3 스왑. 이제 조약돌 위치는...?"),
      hint: t(E,
        "Swapping 2 ↔ 3 moves whatever's at 2 over to 3 (and vice versa).",
        "2 ↔ 3 스왑은 2 에 있던 게 3 으로 옮겨가 (반대도)."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 시뮬레이션 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeShellCh2(E) {
  return [
    // 2-1: Trace all 3 starting positions
    {
      type: "reveal",
      narr: t(E,
        "Let's trace an example! 3 swaps: (1,2,guess=1), (3,2,guess=1), (1,3,guess=1).\nWe'll follow all 3 starting positions through them.", "예제로 시작 위치 1, 2, 3을 모두 따라가며 점수를 비교해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
            {t(E, "All 3 starting positions", "3가지 시작 위치 모두")}
          </div>
          {/* Compact summary for each start */}
          {[
            { start: 1, trace: ["1→2", "2→3", "3→1"], matches: [false, false, true], score: 1 },
            { start: 2, trace: ["2→2", "2→3", "3→3"], matches: [false, false, false], score: 0 },
            { start: 3, trace: ["3→3", "3→2", "2→2"], matches: [false, false, false], score: 0 },
          ].map(({ start, trace, matches, score }) => {
            const cols = ["#3b82f6", "#10b981", "#f59e0b"];
            return (
              <div key={start} style={{
                marginBottom: 8, padding: "8px 12px", borderRadius: 10,
                background: score > 0 ? "#dcfce7" : "#f9fafb",
                border: `1px solid ${score > 0 ? "#6ee7b7" : "#e5e7eb"}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: cols[start - 1] }}>
                    {t(E, `Start = ${start}`, `시작 = ${start}`)}
                  </div>
                  <div style={{
                    fontSize: 14, fontWeight: 700,
                    color: score > 0 ? "#059669" : C.dim,
                    fontFamily: "'JetBrains Mono',monospace",
                  }}>
                    {t(E, `score = ${score}`, `점수 = ${score}`)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  {trace.map((t2, i) => (
                    <div key={i} style={{
                      fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
                      color: matches[i] ? "#059669" : C.dim, fontWeight: matches[i] ? 800 : 400,
                    }}>
                      {t2}{matches[i] ? " ✓" : " ✗"}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 8, textAlign: "center", fontSize: 14, fontWeight: 700, color: "#dc2626" }}>
            {t(E, "Answer = max(1, 0, 0) = 1", "답 = max(1, 0, 0) = 1")}
          </div>
        </div>),
    },
    // 2-2: Interactive — try the simulation yourself
    {
      type: "reveal",
      narr: t(E,
        "Now try it yourself! Step through the swaps and watch all 3 starting positions in parallel.\nWhich one wins?",
        "한 단계씩 넘기면서 시작 위치 세 곳을 같이 봐요."),
      content: <ShellSim E={E} />,
    },
    // 2-3: Quiz on simulation logic
    {
      type: "quiz",
      narr: t(E,
        "When we swap shells A and B, what happens to the pebble position (pos)?", "컵 A 와 B 를 바꾸면 조약돌 위치 pos 는 어떻게 될까요?"),
      question: t(E,
        "Swap A↔B. If pos==A, then pos becomes...?",
        "A↔B 스왑. pos==A이면 pos는...?"),
      options: [
        t(E, "pos stays at A", "pos는 A에 그대로"),
        t(E, "pos becomes B", "pos가 B가 됨"),
        t(E, "pos becomes 0", "pos가 0이 됨"),
      ],
      correct: 1,
      explain: t(E,
        "If the pebble is at A and we swap A↔B, the pebble moves to B! If pos==B, it moves to A. Otherwise, no change.",
        "조약돌이 A 에 있을 때 A↔B 를 바꾸면 B 로 가요. pos 가 B 면 A 로 가고, 아니면 그대로예요."),
    },
    // 2-4: Complexity input
    {
      type: "input",
      narr: t(E,
        "We try 3 starting positions, each simulating N swaps.\nWhat's the total number of operations?", "시작 위치 세 가지를 각각 N 번씩 따라가 봐요."),
      question: t(E,
        "3 starts × N swaps each. If N=5, total operations?",
        "시작 세 가지 × 바꾸기 N 번이에요. N=5 면 계산은 모두 몇 번일까요?"),
      hint: t(E,
        "Multiply the number of starts by the number of swaps per start.",
        "시작 위치 수에 한 번당 바꾸는 횟수를 곱해 봐요."),
      answer: 15,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeShellCh3(E, lang = "py") {
  return [
    // 3-1: Read input
    {
      type: "reveal",
      narr: t(E,
        "The answer is the most guesses right, over all 3 starts. So first, read N and the swaps.", "답은 세 시작 위치 중 가장 많이 맞힌 값이에요. 먼저 N 과 바꾸기 정보를 읽어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <CodeSnippet
            lines={[
              "with open('shell.in') as file:",
              "    lines = file.readlines()",
              "N = int(lines[0])",
              "swaps = []",
              "for i in range(N):",
              "    parts = lines[1 + i].split()",
              "    a, b, g = int(parts[0]), int(parts[1]), int(parts[2])",
              "    swaps.append((a, b, g))",
            ]}
            highlight={[0, 1, 2, 3, 4, 5, 6, 7]}
          />
          <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.5, whiteSpace: "pre-line" }}>
            {t(E,
              "Store all swaps as tuples (a, b, g) in a list.\nWe'll replay these for each starting position.", "바꾸기를 모두 튜플 (a, b, g) 로 리스트에 담아요.\n시작 위치마다 이걸 처음부터 다시 돌려 볼 거예요.")}
          </div>
        </div>),
    },
    // 3-2: Outer loop — try all 3 starts
    {
      type: "reveal",
      narr: t(E,
        "We don't know the true start, so try all 3 and keep the best score.", "시작 위치를 모르니까, 셋 다 해보고 제일 좋은 값을 골라요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 2: Try all starting positions", "2단계: 시작 위치를 모두 해 보기")}
          </div>
          <CodeSnippet
            lines={[
              "best = 0",
              "for start in range(1, 4):       # try shell 1, 2, 3",
              "    pos = start                  # ball starts here",
              "    score = 0",
            ]}
            highlight={[0, 1, 2, 3]}
          />
          <div style={{ marginTop: 8, background: "#fef2f2", borderRadius: 8, padding: 8, border: "1.5px solid #fca5a5", fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div><span style={{ fontWeight: 600, color: "#dc2626" }}>range(1, 4)</span> = {t(E, "gives 1, 2, 3", "1, 2, 3을 생성")}</div>
            <div><span style={{ fontWeight: 600, color: "#dc2626" }}>pos</span> = {t(E, "current pebble location", "현재 조약돌 위치")}</div>
            <div><span style={{ fontWeight: 600, color: "#dc2626" }}>score</span> = {t(E, "correct guesses for this start", "이 시작 위치의 정답 수")}</div>
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "Earlier we wrote max(...) — here best starts at 0 and updates one comparison at a time. Same result.",
              "앞서는 max(...) 로 썼지만, 여기서는 best = 0 부터 시작해서 한 번씩 비교하며 갱신해요. 결과는 같아요.")}
          </div>
        </div>),
    },
    // 3-3: Inner loop — simulate swaps
    {
      type: "reveal",
      narr: t(E,
        "For each start, move the pebble first — then check the guess against its new spot.", "조약돌 자리를 먼저 옮기고, 그 자리로 추측을 확인해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 3: Simulate each swap", "3단계: 각 스왑 시뮬레이션")}
          </div>
          <CodeSnippet
            lines={[
              "    for a, b, g in swaps:",
              "        if pos == a:",
              "            pos = b",
              "        elif pos == b:",
              "            pos = a",
              "        if pos == g:",
              "            score += 1",
            ]}
            highlight={[0, 1, 2, 3, 4, 5, 6]}
          />
          <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 600, color: "#dc2626", marginBottom: 4 }}>
              {t(E, "Two-part logic:", "두 단계로 나뉘어요")}
            </div>
            <div>1. {t(E, "Update pos: if pebble is at a, move to b (and vice versa)", "조약돌이 a 에 있으면 b 로 옮겨요 (반대도 마찬가지예요)")}</div>
            <div>2. {t(E, "Check: if pos matches guess g, increment score", "옮긴 pos 가 추측 g 와 같으면 점수를 1 올려요")}</div>
          </div>
        </div>),
    },
    // 3-4: Quiz — why separate if statements
    {
      type: "quiz",
      narr: t(E,
        "Notice: the swap uses if/elif, but the guess check is a SEPARATE if.\nWhy not elif for the guess check?", "자리 옮기기는 if/elif 인데 추측 확인만 따로 if 예요."),
      question: t(E,
        "Why is 'if pos == g' separate from the swap if/elif?",
        "'if pos == g' 는 왜 위의 if/elif 와 따로 떨어져 있을까요?"),
      options: [
        t(E, "No reason, just style", "이유는 없고 그냥 모양이에요"),
        t(E, "Guess check must happen AFTER the swap, using updated pos", "자리를 옮긴 뒤의 pos 로 확인해야 하니까요"),
        t(E, "To save time", "시간을 아끼려고요"),
      ],
      correct: 1,
      explain: t(E,
        "The swap updates pos first. THEN we check the guess against the NEW pos. If it were elif, the guess check might be skipped!",
        "먼저 pos 를 옮기고, 그 다음 새 pos 로 추측을 확인해요. elif 로 두면 확인을 건너뛸 수 있어요!"),
    },
    // 3-5: Complete code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드를 한 부분씩 읽어 봐요."),
      sections: getShellGameSections(E),
    },
  ];
}
