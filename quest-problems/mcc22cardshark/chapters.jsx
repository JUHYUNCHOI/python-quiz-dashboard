import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc22CardSharkSections } from "./components";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* ─────────────────────────────────────────────────────────────
   Demo stacks for the concept sim.
   Each stack is given TOP → BOTTOM. Its alternating sum is
     D = c1 − c2 + c3 − c4 + …
   ───────────────────────────────────────────────────────────── */
const DEMO_STACKS = [
  { name: "A", cards: [3, 1] },      // even length → D = 3 − 1 = +2
  { name: "B", cards: [9] },         // odd length  → D = 9
  { name: "C", cards: [4, 1, 2] },   // odd length  → D = 4 − 1 + 2 = +5
];
function altSum(cards) {
  let d = 0, sign = 1;
  for (const c of cards) { d += sign * c; sign = -sign; }
  return d;
}

/* ─────────────────────────────────────────────────────────────
   Concept sim: reorder the stacks, watch the big pile get dealt
   1→P1, 2→P2, 3→P1, … and see score1 − score2.
   Teaches: each stack contributes +D or −D depending on whether
   it STARTS on an odd (→P1) or even (→P2) global position.
   ───────────────────────────────────────────────────────────── */
function StackOrderSim({ E }) {
  // order = permutation of indices into DEMO_STACKS
  const [order, setOrder] = useState([0, 1, 2]);

  const move = (pos, dir) => {
    const np = pos + dir;
    if (np < 0 || np >= order.length) return;
    const o = [...order];
    [o[pos], o[np]] = [o[np], o[pos]];
    setOrder(o);
  };

  // Build the concatenated pile with global 1-based positions.
  const pile = [];
  let g = 1;
  const perStack = [];
  for (const si of order) {
    const st = DEMO_STACKS[si];
    const startG = g;
    for (const c of st.cards) {
      pile.push({ val: c, g, player: g % 2 === 1 ? 1 : 2, stack: si });
      g++;
    }
    const D = altSum(st.cards);
    const startsOdd = startG % 2 === 1;
    perStack.push({ si, D, startG, contribution: startsOdd ? D : -D });
  }
  const diff = pile.reduce((s, c) => s + (c.player === 1 ? c.val : -c.val), 0);

  const stackColor = (si) =>
    si === 0 ? "#0891b2" : si === 1 ? "#7c3aed" : "#059669";

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
          🃏 {t(E, "Reorder the stacks and watch the deal", "스택 순서를 바꿔가며 카드 나눠주기를 봐요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "You pick the ORDER of the stacks, glue them into one big pile (each stack keeps its own order), then deal from the top: 1st→P1, 2nd→P2, 3rd→P1, … We want score1 − score2 as big as possible.",
            "스택들의 순서를 골라 하나의 큰 더미로 붙여요 (각 스택 안 순서는 그대로). 그다음 맨 위부터 나눠줘요: 1번째→P1, 2번째→P2, 3번째→P1, … score1 − score2 를 최대한 크게 만들고 싶어요.")}
        </div>

        {/* each stack + its alternating sum D */}
        <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "each stack's alternating sum  D = c1 − c2 + c3 − …", "각 스택의 교대 합  D = c1 − c2 + c3 − …")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {DEMO_STACKS.map((st, si) => {
            const D = altSum(st.cards);
            const parity = st.cards.length % 2 === 0 ? t(E, "even", "짝수") : t(E, "odd", "홀수");
            return (
              <div key={si} style={{ ...NW, border: `1.5px solid ${stackColor(si)}`, borderRadius: 8, padding: "6px 8px", background: "#fff", fontSize: 11.5 }}>
                <div style={{ fontWeight: 800, color: stackColor(si), marginBottom: 2 }}>{t(E, "stack ", "스택 ")}{st.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", color: C.text }}>[{st.cards.join(", ")}]</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", color: stackColor(si), marginTop: 2 }}>D = {D}</div>
                <div style={{ color: C.dim, fontSize: 10.5, marginTop: 1 }}>{t(E, "length ", "길이 ")}{st.cards.length} · {parity}</div>
              </div>
            );
          })}
        </div>

        {/* order controls */}
        <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "your chosen order", "고른 순서")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 14 }}>
          {order.map((si, pos) => (
            <span key={pos} style={{ ...NW, display: "inline-flex", alignItems: "center", gap: 4 }}>
              <button onClick={() => move(pos, -1)} disabled={pos === 0} style={arrowBtn(pos === 0)}>◀</button>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                minWidth: 34, height: 30, borderRadius: 8, padding: "0 8px",
                border: `2px solid ${stackColor(si)}`, background: "#fff",
                color: stackColor(si), fontWeight: 800, fontSize: 13,
              }}>{DEMO_STACKS[si].name}</span>
              <button onClick={() => move(pos, +1)} disabled={pos === order.length - 1} style={arrowBtn(pos === order.length - 1)}>▶</button>
              {pos < order.length - 1 && <span style={{ color: C.dim, margin: "0 2px" }}>+</span>}
            </span>
          ))}
        </div>

        {/* the concatenated pile, dealt alternately */}
        <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 6 }}>
          {t(E, "the big pile, dealt from the top", "큰 더미를 맨 위부터 나눠줌")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
          {pile.map((c, i) => {
            const isP1 = c.player === 1;
            return (
              <div key={i} style={{
                width: 44, height: 58, borderRadius: 8,
                border: `2px solid ${isP1 ? "#d97706" : "#7c3aed"}`,
                background: isP1 ? "#fffbeb" : "#f5f3ff",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}>
                <div style={{ position: "absolute", top: 2, left: 4, fontSize: 9, color: C.dim, fontWeight: 700 }}>#{c.g}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: isP1 ? "#92400e" : "#5b21b6", fontFamily: "'JetBrains Mono',monospace" }}>{c.val}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: isP1 ? "#d97706" : "#7c3aed" }}>{isP1 ? "P1 +" : "P2 −"}</div>
              </div>
            );
          })}
        </div>

        {/* per-stack contribution readout */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {perStack.map((ps, i) => (
            <span key={i} style={{ ...NW, fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
              border: `1px solid ${stackColor(ps.si)}`, borderRadius: 6, padding: "3px 7px", background: "#fff", color: C.text }}>
              <b style={{ color: stackColor(ps.si) }}>{DEMO_STACKS[ps.si].name}</b>{" "}
              {t(E, "starts @", "시작 위치 ")}{ps.startG} ({ps.startG % 2 === 1 ? "P1" : "P2"}) →{" "}
              <b style={{ color: ps.contribution >= 0 ? "#059669" : "#dc2626" }}>{ps.contribution >= 0 ? "+" : ""}{ps.contribution}</b>
            </span>
          ))}
        </div>

        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, ...KA }}>
          score1 − score2 = <b style={{ color: diff >= 0 ? "#34d399" : "#f87171" }}>{diff}</b>
          <span style={{ color: "#8b949e", fontSize: 11 }}>  ({t(E, "best possible = 6", "가능한 최댓값 = 6")})</span>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            "Notice each stack contributes exactly +D or −D — plus if it STARTS on an odd position (its first card goes to P1), minus if it starts on an even one. An even-length stack keeps the position parity after it, so it can slot in either way (take +|D|). Odd-length stacks flip the parity, so along the arrangement they alternate + , − , + , … — sort their D from big to small and give + to the top half.",
            "각 스택은 정확히 +D 또는 −D 를 기여해요 — 홀수 위치에서 시작하면 (첫 카드가 P1 로) +, 짝수 위치에서 시작하면 −. 길이가 짝수인 스택은 뒤 위치의 홀짝을 그대로 두어서 어느 쪽으로도 끼울 수 있어요 (+|D| 를 챙김). 길이가 홀수인 스택은 홀짝을 뒤집어서, 배열을 따라 + , − , + , … 로 번갈아요 — D 를 큰 것부터 정렬해 위쪽 절반에 + 를 줘요.")}
        </div>
      </div>
    </div>
  );
}
const arrowBtn = (disabled) => ({
  width: 24, height: 24, borderRadius: 6, border: "1px solid #fcd34d",
  background: disabled ? "#f3f4f6" : "#fff", color: disabled ? "#d1d5db" : "#92400e",
  fontSize: 11, fontWeight: 800, cursor: disabled ? "default" : "pointer", lineHeight: 1,
});

/* ================================================================
   SOLUTION CODE  (fast: per-stack alternating sum + greedy split)
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "def solve():",
  "    data = sys.stdin.buffer.read().split()",
  "    idx = 0",
  "    T = int(data[idx]); idx += 1",
  "    out = []",
  "    for _ in range(T):",
  "        n = int(data[idx]); idx += 1",
  "        even_D = []",
  "        odd_D = []",
  "        for _ in range(n):",
  "            m = int(data[idx]); idx += 1",
  "            D = 0",
  "            sign = 1",
  "            for j in range(m):",
  "                D += sign * int(data[idx + j])",
  "                sign = -sign",
  "            idx += m",
  "            if m % 2 == 0:",
  "                even_D.append(D)",
  "            else:",
  "                odd_D.append(D)",
  "        if odd_D:",
  "            ans = sum(abs(x) for x in even_D)",
  "            odd_D.sort(reverse=True)",
  "            plus = (len(odd_D) + 1) // 2",
  "            for i, d in enumerate(odd_D):",
  "                ans += d if i < plus else -d",
  "        else:",
  "            ans = sum(even_D)",
  "        out.append(str(ans))",
  "    print('\\n'.join(out))",
  "solve()",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22CardSharkCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "There are n small stacks of cards. You glue them into one big pile in ANY order (each stack keeps its internal order), then deal from the top alternately: 1st card→P1, 2nd→P2, 3rd→P1, …\nMaximize score1 − score2.",
        "카드 스택이 n 개 있어요. 원하는 순서로 하나의 큰 더미로 붙여요 (각 스택 안의 순서는 그대로). 그다음 맨 위부터 번갈아 나눠줘요: 1번째 카드→P1, 2번째→P2, 3번째→P1, …\nscore1 − score2 를 최대로 만들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🃏"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#d97706" }}>Card Shark</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P5</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E, "Order the stacks to maximize score1 − score2, then print that maximum.", "score1 − score2 가 최대가 되도록 스택 순서를 정하고, 그 최댓값을 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "카드 스택이 ")}<b style={{ color: "#d97706" }}>{t(E, "n small stacks", "n 개")}</b>
                  {t(E, ". Stack i has ", " 있어요. 스택 i 는 ")}<b>m_i</b>{t(E, " cards, listed top → bottom.", " 장이고, 위 → 아래 순으로 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Choose a ", "스택들의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "permutation of the stacks", "순서 (순열)")}</b>
                  {t(E, " and concatenate them into one big pile — each stack keeps its own internal order.",
                        " 를 골라 하나의 큰 더미로 이어 붙여요 — 각 스택 안의 순서는 그대로 유지돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Deal from the top alternately: card 1 → ", "맨 위부터 번갈아 나눠줘요: 1번째 카드 → ")}
                  <b style={{ color: "#d97706" }}>P1</b>{t(E, ", card 2 → ", ", 2번째 → ")}<b style={{ color: "#7c3aed" }}>P2</b>
                  {t(E, ", card 3 → ", ", 3번째 → ")}<b style={{ color: "#d97706" }}>P1</b>{t(E, ", … score_i = sum of the cards player i receives.", ", … score_i = 플레이어 i 가 받은 카드 값의 합.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum possible score1 − score2", "가능한 score1 − score2 의 최댓값")}</b>
                  {t(E, " over all orderings.", "을 모든 순서 중에서 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. There are T test cases; each stack line is 'm c1 c2 … c_m' with the cards top → bottom.",
        "입력 형식과 공식 예제를 봐요. 테스트 케이스가 T 개예요. 각 스택 줄은 'm c1 c2 … c_m' 이고, 카드는 위 → 아래 순이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>T</b> — {t(E, "number of test cases", "테스트 케이스 수")}</div>
              <div>• {t(E, "per test: a line with ", "케이스마다: ")}<b>n</b>{t(E, " (number of stacks)", " (스택 수) 한 줄")}</div>
              <div>• {t(E, "then n stack lines: ", "그다음 n 개의 스택 줄: ")}<b>m c1 c2 … c_m</b> {t(E, "(top → bottom)", "(위 → 아래)")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: T ≤ 10, n ≤ 10^5, |c| ≤ 10^9, total cards ≤ 2·10^5. Use 64-bit sums.", "제약: T ≤ 10, n ≤ 10^5, |c| ≤ 10^9, 전체 카드 수 ≤ 2·10^5. 합계는 64비트.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input (1st test case)", "예제 입력 (첫 번째 케이스)")}</div>
              <div>4          <span style={{ color: "#8b949e" }}>{t(E, "# n = 4 stacks", "# n = 4 스택")}</span></div>
              <div>2 4 5</div>
              <div>3 6 2 3</div>
              <div>1 8</div>
              <div>4 1 2 5 0</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>6</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "One optimal ordering deals [8, 5, 2, 1, 5] to P1 (score1 = 21) and [4, 6, 3, 2, 0] to P2 (score2 = 15), so score1 − score2 = 6 — the best possible.",
              "한 최적 순서에서 P1 이 [8, 5, 2, 1, 5] (score1 = 21), P2 가 [4, 6, 3, 2, 0] (score2 = 15) 을 받아 score1 − score2 = 6 — 가능한 최댓값이에요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the mechanism. Reorder the stacks and watch how each one contributes +D or −D to score1 − score2.",
        "원리를 직접 느껴봐요. 스택 순서를 바꾸면서 각 스택이 score1 − score2 에 +D 또는 −D 로 어떻게 기여하는지 봐요."),
      content: <StackOrderSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "A stack's alternating sum is D = c1 − c2 + c3 − c4 + …, using the cards top → bottom. It is the ± amount that whole stack contributes.",
        "스택의 교대 합은 D = c1 − c2 + c3 − c4 + … 예요 (카드는 위 → 아래). 그 스택 전체가 기여하는 ± 양이에요."),
      question: t(E,
        "Stack (top → bottom) = [6, 2, 3]. Its alternating sum D = 6 − 2 + 3 = ?",
        "스택 (위 → 아래) = [6, 2, 3]. 교대 합 D = 6 − 2 + 3 = ?"),
      options: [
        t(E, "7", "7"),
        t(E, "11", "11"),
        t(E, "1", "1"),
      ],
      correct: 0,
      explain: t(E,
        "6 − 2 + 3 = 7. Signs alternate +, −, +, … from the top card. Each stack collapses to this single number D.",
        "6 − 2 + 3 = 7. 맨 위 카드부터 부호가 +, −, +, … 로 번갈아요. 각 스택은 이 하나의 수 D 로 줄어들어요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22CardSharkCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The slow way tries every ordering of the stacks: n! permutations — hopeless past n ≈ 11. The fast way collapses each stack to one number D, then decides its sign greedily.",
        "느린 방법은 스택의 모든 순서를 다 해봐요: n! 가지 순열 — n ≈ 11 만 넘어도 불가능. 빠른 방법은 각 스택을 하나의 수 D 로 줄이고, 부호를 그리디하게 정해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every ordering of the stacks", "느림: 스택의 모든 순서를 다 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "n! permutations. Even n = 15 is over 10^12 orderings. Times out.", "n! 가지 순열. n = 15 만 해도 10^12 개가 넘어요. 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: one number D per stack, then a greedy split", "빠름: 스택마다 수 D 하나, 그다음 그리디 부호 배분")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Each stack contributes ±D. Even-length stacks can take +|D| freely; odd-length stacks alternate sign, so sort their D and give + to the top half. O(total cards + n log n).", "각 스택은 ±D 를 기여. 짝수 길이는 +|D| 를 자유롭게 챙기고, 홀수 길이는 부호가 번갈으니 D 를 정렬해 위쪽 절반에 +. O(전체 카드 + n log n).")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc22CardSharkSections(E),
    },
  ];
}
