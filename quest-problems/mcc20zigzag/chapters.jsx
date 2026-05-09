import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc20ZigzagSections } from "./components";

const PURPLE = "#8b5cf6";
const PURPLE_DARK = "#5b21b6";
const PURPLE_BG = "#f5f3ff";
const PURPLE_BD = "#c4b5fd";

/* ---------- Zig-zag Simulator ----------
   Additive bilingual interactive sim. Student edits a small string, picks
   indices to build a candidate subsequence, watches up/down arrows light up
   in real time, and sees the total count of length-K zig-zag subsequences. */
function ZigzagSim({ E }) {
  const [chars, setChars] = useState(["a", "b", "a", "c", "b"]);
  const [K, setK] = useState(3);
  const [picked, setPicked] = useState([]); // indices into chars

  const N = chars.length;
  const Keff = Math.min(K, N);

  // Count all length-K zig-zag subsequences via brute enumeration.
  // Pattern: index 0->1 must go DOWN, 1->2 UP, 2->3 DOWN, ... (alternating).
  // Equivalently: at step t (1-indexed), even t means current > previous (UP),
  // odd t means current < previous (DOWN). The first step (t=1) must be DOWN
  // to match the canonical "down-up-down..." zig-zag.
  // We accept BOTH starting directions as zig-zag (down-up-down OR up-down-up).
  const isZigzag = (seq) => {
    if (seq.length < 2) return seq.length === 1;
    let dir = null; // +1 up, -1 down
    for (let i = 1; i < seq.length; i++) {
      const a = seq[i - 1], b = seq[i];
      if (a === b) return false;
      const d = b > a ? 1 : -1;
      if (dir === null) dir = d;
      else { if (d === dir) return false; dir = d; }
    }
    return true;
  };

  const countZigzag = () => {
    if (Keff < 1 || Keff > N) return 0;
    let total = 0;
    const idx = [];
    const rec = (start, depth) => {
      if (depth === Keff) {
        const seq = idx.map(i => chars[i]);
        if (isZigzag(seq)) total++;
        return;
      }
      for (let i = start; i < N; i++) {
        idx.push(i);
        rec(i + 1, depth + 1);
        idx.pop();
      }
    };
    rec(0, 0);
    return total;
  };
  const total = countZigzag();

  const candidate = picked.slice().sort((a, b) => a - b).map(i => chars[i]);
  const candValid = candidate.length === Keff && isZigzag(candidate);
  const candHasDup = picked.length !== new Set(picked).size;

  const cycleChar = (i, d) => {
    const next = [...chars];
    const code = next[i].charCodeAt(0);
    let nc = code + d;
    if (nc < 97) nc = 122; if (nc > 122) nc = 97;
    next[i] = String.fromCharCode(nc);
    setChars(next);
    setPicked([]);
  };
  const addCol = () => { if (chars.length < 7) { setChars([...chars, "a"]); setPicked([]); } };
  const delCol = () => { if (chars.length > 2) { setChars(chars.slice(0, -1)); setPicked([]); } };
  const togglePick = (i) => {
    setPicked(prev => prev.includes(i) ? prev.filter(x => x !== i) : (prev.length < Keff ? [...prev, i] : prev));
  };
  const reset = () => { setChars(["a", "b", "a", "c", "b"]); setK(3); setPicked([]); };

  // Build arrow display for the sorted picked candidate.
  const sortedPicked = picked.slice().sort((a, b) => a - b);

  return (
    <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: PURPLE, marginBottom: 8, letterSpacing: 0.4 }}>
        🧪 {t(E, "Try it: Zig-zag Builder", "직접 해보기: 지그재그 만들기")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, lineHeight: 1.5 }}>
        {t(E,
          "Tap letters to cycle a→b→…→z. Click a slot to pick it for the subsequence. The arrows light up if neighbors strictly alternate up/down.",
          "글자를 눌러 a→b→…→z 로 바꿔봐요. 슬롯을 클릭해 부분수열에 골라요. 인접 두 항이 엄격히 위/아래를 번갈아 가면 화살표가 켜져요.")}
      </div>

      {/* String row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 10 }}>
        {chars.map((ch, i) => {
          const isPicked = picked.includes(i);
          const order = sortedPicked.indexOf(i);
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <button onClick={() => cycleChar(i, +1)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, width: 28, height: 18, cursor: "pointer", fontSize: 10, fontWeight: 700, color: C.dim }}>▲</button>
              <button onClick={() => togglePick(i)} style={{
                width: 36, height: 40,
                background: isPicked ? PURPLE_BG : "#fff",
                border: `2px solid ${isPicked ? PURPLE : C.border}`,
                borderRadius: 6, cursor: "pointer",
                fontSize: 18, fontWeight: 800,
                color: isPicked ? PURPLE_DARK : C.text,
                fontFamily: "monospace",
                position: "relative",
              }}>
                {ch}
                {isPicked && (
                  <span style={{ position: "absolute", top: -8, right: -8, background: PURPLE, color: "#fff", fontSize: 9, fontWeight: 800, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {order + 1}
                  </span>
                )}
              </button>
              <button onClick={() => cycleChar(i, -1)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, width: 28, height: 18, cursor: "pointer", fontSize: 10, fontWeight: 700, color: C.dim }}>▼</button>
              <div style={{ fontSize: 9, color: C.dim }}>i={i}</div>
            </div>
          );
        })}
      </div>

      {/* Add / del / reset */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 }}>
        <button onClick={addCol} disabled={chars.length >= 7} style={{ background: PURPLE_BG, border: `1px solid ${PURPLE_BD}`, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: PURPLE_DARK, cursor: chars.length >= 7 ? "not-allowed" : "pointer", opacity: chars.length >= 7 ? 0.5 : 1 }}>
          +{t(E, " char", " 글자")}
        </button>
        <button onClick={delCol} disabled={chars.length <= 2} style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: "#b91c1c", cursor: chars.length <= 2 ? "not-allowed" : "pointer", opacity: chars.length <= 2 ? 0.5 : 1 }}>
          −{t(E, " char", " 글자")}
        </button>
        <button onClick={() => setPicked([])} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: C.dim, cursor: "pointer" }}>
          {t(E, "Clear pick", "선택 비우기")}
        </button>
        <button onClick={reset} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: C.dim, cursor: "pointer" }}>
          ⟲ {t(E, "Reset", "초기화")}
        </button>
      </div>

      {/* K slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 10px", background: PURPLE_BG, border: `1px solid ${PURPLE_BD}`, borderRadius: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: PURPLE_DARK, minWidth: 56 }}>
          K = {Keff}
        </span>
        <input type="range" min={2} max={Math.min(6, N)} value={Keff} onChange={e => { setK(Number(e.target.value)); setPicked([]); }} style={{ flex: 1, accentColor: PURPLE }} />
        <span style={{ fontSize: 10, color: C.dim, minWidth: 88, textAlign: "right" }}>
          {t(E, "subseq length", "부분수열 길이")}
        </span>
      </div>

      {/* Candidate display */}
      <div style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
          {t(E, "Your candidate (sorted by index)", "선택한 부분수열 (인덱스 순)")}
        </div>
        {candidate.length === 0 ? (
          <div style={{ fontSize: 12, color: C.dim, fontStyle: "italic" }}>
            {t(E, "Click slots above to pick.", "위 슬롯을 클릭해 골라요.")}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
            {candidate.map((ch, i) => {
              const arrow = i === 0 ? null : (candidate[i] > candidate[i - 1] ? "↑" : candidate[i] < candidate[i - 1] ? "↓" : "=");
              const prevA = i >= 2 ? (candidate[i - 1] > candidate[i - 2] ? "↑" : candidate[i - 1] < candidate[i - 2] ? "↓" : "=") : null;
              const ok = arrow !== "=" && (prevA === null || arrow !== prevA);
              return (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {arrow && (
                    <span style={{ fontSize: 16, fontWeight: 800, color: ok ? "#15803d" : "#b91c1c" }}>{arrow}</span>
                  )}
                  <span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 800, color: PURPLE_DARK, background: PURPLE_BG, border: `1.5px solid ${PURPLE_BD}`, borderRadius: 4, padding: "2px 6px" }}>{ch}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Verdict + total */}
      <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
        <div style={{ flex: 1, background: candidate.length === Keff ? (candValid ? "#dcfce7" : "#fee2e2") : C.bg, border: `1.5px solid ${candidate.length === Keff ? (candValid ? "#86efac" : "#fca5a5") : C.border}`, borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 2 }}>
            {t(E, "Your pick", "이 선택")}
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: candidate.length !== Keff ? C.dim : (candValid ? "#15803d" : "#b91c1c") }}>
            {candHasDup ? t(E, "—", "—") :
              candidate.length < Keff ? t(E, `pick ${Keff - candidate.length} more`, `${Keff - candidate.length}개 더 골라요`) :
              candValid ? t(E, "Zig-zag ✓", "지그재그 ✓") : t(E, "Not zig-zag ✗", "지그재그 아님 ✗")}
          </div>
        </div>
        <div style={{ flex: 1, background: PURPLE_BG, border: `1.5px solid ${PURPLE_BD}`, borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ fontSize: 10, color: PURPLE_DARK, fontWeight: 700, marginBottom: 2 }}>
            {t(E, `Total length-${Keff} zig-zags`, `길이 ${Keff} 지그재그 총 개수`)}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: PURPLE_DARK }}>{total}</div>
        </div>
      </div>
    </div>
  );
}

export const SOLUTION_CODE = [
  "s = input().strip()",
  "K = int(input())",
  "N = len(s)",
  "",
  "if K > N:",
  "    print(0)",
  "else:",
  "    # DP: dp[i][j] = number of zig-zag subsequences",
  "    # of length j ending at index i",
  "    dp = [[0] * (K + 1) for _ in range(N)]",
  "",
  "    for i in range(N):",
  "        dp[i][1] = 1  # single char subsequence",
  "",
  "    for j in range(2, K + 1):",
  "        for i in range(j - 1, N):",
  "            for p in range(j - 2, i):",
  "                if (j % 2 == 0 and s[p] < s[i]) or \\",
  "                   (j % 2 == 1 and s[p] > s[i]):",
  "                    dp[i][j] += dp[p][j - 1]",
  "",
  "    ans = sum(dp[i][K] for i in range(N))",
  "    print(ans)",
];

export function makeMcc20ZigzagCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Given a sequence of characters and an integer K, count the number of length-K subsequences that 'zig-zag' — values strictly alternating between going UP and going DOWN at each consecutive step.\nPrint the count.",
        "문자 수열과 정수 K 가 주어져요. 길이 K 의 부분수열 중 인접한 두 항이 매번 한 번 올라갔다 한 번 내려갔다 하며 엄격하게 번갈아 가는 '지그재그' 의 개수를 세요.\n그 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u26a1"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Zig-zag</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P6</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E, "Print the count of length-K zig-zag subsequences of the given string.", "주어진 문자열에서 길이 K 인 지그재그 부분수열의 개수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "sequence of characters and an integer K", "문자 수열과 정수 K")}</b>
                  {t(E, " are given.", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "zig-zag subsequence of length K", "길이 K 의 지그재그 부분수열")}</b>
                  {t(E, " has consecutive values strictly alternating up/down/up/down...",
                        " 은 인접 두 항이 매번 한 번 올라갔다 한 번 내려갔다 하며 엄격하게 번갈아 가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "count of length-K zig-zag subsequences", "길이 K 지그재그 부분수열의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // Interactive zig-zag simulator (additive, bilingual)
    {
      type: "reveal",
      narr: t(E,
        "Tweak the string and slide K to feel zig-zag in your bones. Pick slots in order to test a candidate — green arrows mean each step flips direction; red means two same-direction steps in a row, so it isn't zig-zag.",
        "문자열을 바꾸고 K 를 옮겨가며 지그재그를 직접 느껴봐요. 슬롯을 골라 후보를 만들어보면, 매 칸 방향이 뒤집히면 초록 화살표 — 같은 방향이 두 번 나오면 빨강이라 지그재그가 아니에요."),
      content: (
        <div style={{ padding: 16 }}>
          <ZigzagSim E={E} />
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "String 'abc', how many subsequences of length 2? C(3,2) = 3: ab, ac, bc.", "문자열 'abc', 길이 2 부분수열 몇 개? C(3,2) = 3: ab, ac, bc."),
      question: t(E,
        "String 'abc'. How many subsequences of length 2?",
        "문자열 'abc'. 길이 2 부분수열 몇 개?"),
      options: [
        t(E, "3", "3"),
        t(E, "2", "2"),
        t(E, "6", "6"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! C(3,2) = 3 subsequences: ab, ac, bc.",
        "맞아! C(3,2) = 3개 부분수열: ab, ac, bc."),
    },
    {
      type: "input",
      narr: t(E,
        "How many length-2 subsequences of 'abc'?", "'abc'의 길이 2 부분수열 개수?"),
      question: t(E,
        "C(3, 2) = ?",
        "C(3, 2) = ?"),
      hint: t(E, "C(n, k) = n! / (k! · (n−k)!).", "C(n, k) = n! / (k! · (n−k)!)."),
      answer: 3,
    },
  ];
}

export function makeMcc20ZigzagCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "DP: dp[i][j] = number of zig-zag subsequences of length j ending at position i. Transition: extend from earlier i' with the right comparison (up if j is even, down if j is odd, or vice versa). Sections build it one piece at a time.",
        "DP: dp[i][j] = 위치 i 에서 끝나는 길이 j 의 지그재그 부분수열 수. 전이: 이전 i' 에서 적절한 비교 (j 홀짝에 따라 상승/하강) 로 확장. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc20ZigzagSections(E),
    },
  ];
}
