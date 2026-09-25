import { useState } from "react";
import { C, t } from "@/components/quest/theme";

const PURPLE = "#8b5cf6";
const KA = { wordBreak: "keep-all" };
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
          "글자를 눌러 a→b→…→z 로 바꿔봐요. 칸을 눌러 부분수열에 골라요. 이웃한 두 글자가 위아래로 번갈아 가면 화살표가 켜져요.")}
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
          ⟲ {t(E, "Reset", "처음부터")}
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
          {t(E, "Your candidate (sorted by index)", "선택한 부분수열 (자리 순)")}
        </div>
        {candidate.length === 0 ? (
          <div style={{ fontSize: 12, color: C.dim, fontStyle: "italic" }}>
            {t(E, "Click slots above to pick.", "위의 칸을 눌러 골라요.")}
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

/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */

export function makeMcc20ZigzagCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Count how many length-K zig-zag subsequences the string contains.",
        "길이 K 인 지그재그가 몇 개인지 세어요."),
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
              {t(E, "Print the count of length-K zig-zag subsequences of the given string, modulo 1000.", "주어진 문자열에서 길이 K 인 지그재그 부분수열의 개수를 1000 으로 나눈 나머지를 출력해요.")}
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
                  <b style={{ color: "#8b5cf6" }}>{t(E, "sequence of characters and an integer K", "글자 수열과 정수 K")}</b>
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
                  <b style={{ color: "#15803d" }}>{t(E, "count of length-K zig-zag subsequences, modulo 1000", "길이 K 지그재그 부분수열의 개수 (1000 으로 나눈 나머지)")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 입력 형식이 없으면 샘플의 숫자가 무슨 뜻인지 알 수가 없다.
              근거: memory/feedback_problem_statement_readable.md */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
                {/* 2026-09-17: 여기가 "첫 줄 / 둘째 줄" 이라고 **원문에 없는 줄 형식**을 적어 두던
                    자리다. 원문(public/problems/mcc20zigzag.pdf)은 S = "bcade" / K = 3 처럼
                    값을 변수로 준다. 값의 이름만 남긴다. */}
                {t(E,
                  <>S — the string (lowercase)<br/>K — the subsequence length</>,
                  <>S — 문자열 (소문자)<br/>K — 뽑을 길이</>)}
              </div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
                {t(E,
                  <>Count of length-K zig-zag<br/>subsequences, mod 1000</>,
                  <>길이 K 지그재그 부분수열<br/>개수를 1000으로 나눈 나머지</>)}
              </div>
            </div>
          </div>

          {/* Constraints + official sample */}
          <div style={{ background: "#faf5ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10, wordBreak: "keep-all" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 8 }}>
              📐 {t(E, "Limits & sample", "제약 & 예시")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• 1 ≤ |S| ≤ 20000, {t(E, "lowercase letters", "소문자")}</div>
              <div>• 1 ≤ K ≤ 100</div>
              <div>• {t(E, "answer printed modulo 1000", "정답은 1000 으로 나눈 나머지로 출력해요")}</div>
            </div>
            {/* 2026-09-17: 원문(public/problems/mcc20zigzag.pdf)은 S = "bcade" / K = 3 처럼
                값을 변수로 준다. 아래 예시 상자의 두 줄은 우리 연습 방식이라고 밝힌다. */}
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
              {t(E,
                "The original problem hands the data over as values: S = \"bcade\" and K = 3.\nOur code writes those same values down and starts from there.\nReading them line by line with input() shows up in the 2022 problems.",
                "원문은 S = \"bcade\", K = 3 처럼 값을 변수로 줘요.\n코드도 원문 그대로 값을 적어 두고 시작해요.\ninput() 으로 줄을 읽어 오는 법은 2022년 문제에서 만나요.")}
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap", fontSize: 12.5 }}>
              <div style={{ background: "#fff", border: "1px solid #e9d5ff", borderRadius: 8, padding: "6px 10px", fontFamily: "monospace" }}>
                <div style={{ color: C.dim, fontSize: 11 }}>{t(E, "input", "입력")}</div>
                <div>S = &quot;bcade&quot;</div>
                <div>K = 3</div>
              </div>
              <div style={{ background: "#fff", border: "1px solid #e9d5ff", borderRadius: 8, padding: "6px 10px", fontFamily: "monospace" }}>
                <div style={{ color: C.dim, fontSize: 11 }}>{t(E, "output", "출력")}</div>
                <div>5 <span style={{ color: C.dim, fontSize: 10 }}>{t(E, "← count", "← 개수")}</span></div>
              </div>
              <div style={{ flex: 1, minWidth: 140, color: C.dim, fontSize: 11.5, lineHeight: 1.5, alignSelf: "center" }}>
                {t(E, "bca, bad, bae, cad, cae — 5 length-3 zig-zags.", "bca, bad, bae, cad, cae — 길이 3 지그재그가 5 개예요.")}
              </div>
            </div>
          </div>
        </div>),
    },
    // Interactive zig-zag simulator (additive, bilingual)
    {
      type: "reveal",
      /* 2026-09-09: 이 narr 이 답을 미리 계산해서 말하고 있었다.
         narr 은 질문과 무관하게 항상 먼저 뜬다 — 안 풀어도 읽기만 하면 답이 보였다.
         상황만 남기고 계산은 뺐다. 찾은 도구: scripts/check-quiz-spoiler.py */
      narr: t(E,
        "Tweak the string and pick letters to feel what makes a subsequence zig-zag.",
        "지그재그가 무엇인지 직접 만들어 보며 느껴봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <ZigzagSim E={E} />
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "From the string 'abc', pick two letters keeping their order.", "문자열 'abc' 에서 글자 두 개를 순서대로 골라봐요."),
      question: t(E,
        "String 'abc'. How many subsequences of length 2?",
        "문자열 'abc' 의 길이 2 부분수열은 몇 개일까요?"),
      options: [
        t(E, "3", "3"),
        t(E, "2", "2"),
        t(E, "6", "6"),
      ],
      correct: 0,
      explain: t(E,
        "ab, ac, bc — three of them. Note this counts every pick, zig-zag or not.",
        "ab, ac, bc 세 개예요. 지그재그인지는 아직 따지지 않고, 고르는 방법을 전부 센 거예요."),
    },
    /* 2026-09-17: 여기가 C(n, k) = n! / (k!(n−k)!) 를 정의 없이 던지던 자리였다.
       앞 세 쪽이 모두 '직접 세기' 인데 여기서만 갑자기 공식으로 뛰어서
       초6 학생이 막혔다. 글자 수만 하나 늘려 '직접 세기' 를 그대로 잇는다. */
    {
      type: "input",
      narr: t(E,
        "One more letter — now count them yourself.", "글자를 하나 늘려서 직접 세어 봐요."),
      question: t(E,
        "String 'abcd'. How many ways to pick 2 letters in order?",
        "문자열 'abcd' 에서 글자 두 개를 순서대로 고르는 방법은 몇 가지일까요?"),
      hint: t(E, "Group them by the first letter: the ones starting with a, then b, then c.",
                 "첫 글자로 나눠서 세어 봐요. a 로 시작하는 것, b 로 시작하는 것, c 로 시작하는 것."),
      answer: 6,
    },
  ];
}

export function makeMcc20ZigzagCh2(E, lang = "py") {
  return [
    /* 2026-09-17: 이 쪽이 통째로 없었다. 앞 세 쪽은 손으로 세는 이야기인데
       다음 쪽이 바로 up/dn 표였다 — 초6 학생이 "세 쪽이 서로 다른 얘기 같다" 고 했다.
       형제 quest(mcc21dvd·mcc20missing·mcc20knight)에는 다 있는 '느림 → 빠름' 다리를 놓는다. */
    {
      type: "reveal",
      narr: t(E,
        "Why counting them one by one cannot work, and what to do instead.",
        "하나씩 세면 왜 안 되는지, 대신 무엇을 할지 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: make every pick and check it", "느림: 고를 수 있는 것을 다 만들어서 확인하기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55, whiteSpace: "pre-line" }}>
                {t(E,
                  "That is what we just did by hand, and it works for 'abcd'. But the string can be 20000 letters long and K can be 100. Picking 100 letters out of 20000 is a number with hundreds of digits — we could not finish writing them down, let alone check them.",
                  "방금 손으로 한 방법이에요. 'abcd' 처럼 짧으면 잘 돼요.\n그런데 문자열은 20000 글자까지, K 는 100 까지 커져요.\n20000 글자에서 100 글자를 고르는 방법은 자릿수가 수백 개인 수예요.\n확인은커녕 적어 내려가는 것조차 끝낼 수 없어요.")}
              </div>
            </div>
            <div style={{ background: "#f5f3ff", border: `1px solid ${PURPLE_BD}`, borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: PURPLE_DARK, marginBottom: 4 }}>
                🚀 {t(E, "Fast: count without making them", "빠름: 만들지 않고 개수만 세기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55, whiteSpace: "pre-line" }}>
                {t(E,
                  "We never write a zig-zag down. For each letter we only remember two numbers: how many zig-zags of each length end here going up, and how many end here going down. A longer one is then made by gluing one letter onto a number we already have.",
                  "지그재그를 하나도 적지 않아요.\n글자마다 숫자 두 개만 기억해요.\n여기서 끝나면서 마지막이 오름인 것이 몇 개인지,\n여기서 끝나면서 마지막이 내림인 것이 몇 개인지예요.\n더 긴 것은 이미 가진 그 숫자에 글자 하나를 붙여서 만들어요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the code, section by section.", "↓ 다음 쪽에서 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    {
      type: "mcc20zigzag-codewalk",
      narr: t(E,
        "The full solution, start to finish.", "풀이 코드를 처음부터 끝까지 봐요."),
    },
  ];
}
