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
  /* 2026-09-17: 처음 순서가 A→B→C 였는데 그게 하필 **최댓값 6 인 순서**였다.
     "어떤 순서가 가장 크게 만드나요?" 라고 물어놓고, 누르기도 전에 이미 답을
     보여주고 있었다 (화살표를 눌러봐야 점수가 내려가기만 한다).
     C→B→A 로 열면 −2 에서 시작하니, 눌러서 6 을 찾아낼 수 있다. */
  const [order, setOrder] = useState([2, 1, 0]);
  /* 2026-09-17: 시뮬 맨 아래가 **화살표를 한 번도 누르기 전부터** 최종 그리디 해법을
     통째로 말하고 있었다 ("D 를 정렬해 위쪽 절반에 + 를 줘라"). 같은 말이 Ch2 계획과
     코드 why 에서 세 번 더 나온다. 여기서는 **관찰까지만** 남기고, 정렬 결론은
     Ch2 에서 한 번만 말한다. (mcc20cipher · mcc21carrots 와 같은 수법) */
  const [touched, setTouched] = useState(false);

  const move = (pos, dir) => {
    const np = pos + dir;
    if (np < 0 || np >= order.length) return;
    setTouched(true);
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
          🃏 {t(E, "Reorder the stacks and watch the deal", "묶음 순서를 바꿔 보고, 카드가 어떻게 나눠지는지 봐요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "Here you find out how much the ORDER alone can change the gap. Press ◀ ▶ to move a stack: the big pile is glued together again (each stack keeps its own order) and dealt from the top — 1st→P1, 2nd→P2, 3rd→P1, …",
            "순서만 바꿔도 점수 차이가 얼마나 달라지는지 여기서 직접 알아봐요. ◀ ▶ 로 묶음을 옮기면 큰 더미가 다시 만들어져요. 묶음 안의 카드 순서는 그대로예요. 그다음 맨 위부터 번갈아 나눠줘요. 1번째→P1, 2번째→P2, 3번째→P1, … 이렇게요.")}
        </div>

        {/* each stack + its alternating sum D */}
        <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "D = add the cards from the top with the signs +, −, +, … (the stack's alternating sum)", "D = 맨 위 카드부터 +, −, +, … 로 번갈아 더한 값 (이걸 묶음의 교대 합이라고 불러요)")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {DEMO_STACKS.map((st, si) => {
            const D = altSum(st.cards);
            const parity = st.cards.length % 2 === 0 ? t(E, "even", "짝수") : t(E, "odd", "홀수");
            return (
              <div key={si} style={{ ...NW, border: `1.5px solid ${stackColor(si)}`, borderRadius: 8, padding: "6px 8px", background: "#fff", fontSize: 11.5 }}>
                <div style={{ fontWeight: 800, color: stackColor(si), marginBottom: 2 }}>{t(E, "stack ", "묶음 ")}{st.name}</div>
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
          {t(E, "the big pile, dealt from the top", "큰 더미를 맨 위부터 나눠줘요")}
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
          <span style={{ color: "#8b949e", fontSize: 11 }}>  ({t(E, "the best these three stacks can reach = 6", "이 세 묶음으로 낼 수 있는 가장 큰 값 = 6")})</span>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
          {
            touched
              ? t(E,
                  "Look at the row above: every stack contributed exactly +D or −D — nothing in between.\nCompare each stack's starting position with the sign it got.\nWhich starting positions give +, and which give −?",
                  "바로 위 줄을 봐요. 어느 묶음도 +D 아니면 −D 만 더했어요.\n그 사이 값은 없어요.\n묶음마다 시작 위치와 부호를 나란히 비교해 봐요.\n어떤 시작 위치가 + 를 받고, 어떤 위치가 − 를 받나요?")
              : t(E,
                  "Move the stacks with ◀ ▶ and watch the bottom number change.\nWhich order makes score1 − score2 the biggest?",
                  "◀ ▶ 로 묶음 순서를 바꾸면서 맨 아래 수가 어떻게 변하는지 봐요.\n어떤 순서가 score1 − score2 를 가장 크게 만드나요?")}
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
  "    T = int(data[idx])",
  "    idx += 1",
  "    out = []",
  "    for _ in range(T):",
  "        n = int(data[idx])",
  "        idx += 1",
  "        even_D = []",
  "        odd_D = []",
  "        for _ in range(n):",
  "            m = int(data[idx])",
  "            idx += 1",
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
  "                if i < plus:",
  "                    ans += d",
  "                else:",
  "                    ans += -d",
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
        /* 2026-09-17: 원래 여기 다섯 줄(82자)이 문제 설명 전부를 미리 말했다.
           파란 내레이션은 55자 한 문장이고, 자세한 것은 바로 아래 미션·문제 카드가 한다. */
        "Deal the cards so player 1 beats player 2 by as much as possible.",
        "카드를 나눠줄 때 1번이 2번보다 가장 많이 앞서게 해요."),
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
              {t(E, "Two players are dealt the cards one after the other. Order the stacks so player 1 beats player 2 by as much as possible, then print that gap, score1 − score2.", "카드를 두 사람에게 번갈아 나눠줘요. 1번이 2번보다 가장 많이 앞서도록 묶음 순서를 정하고, 그 점수 차이 score1 − score2 를 출력해요.")}
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
                  {t(E, "There are ", "카드 묶음이 ")}<b style={{ color: "#d97706" }}>{t(E, "n small stacks", "n 개")}</b>
                  {t(E, ". Stack i has ", " 있어요. i 번 묶음은 카드가 ")}<b>m_i</b>{t(E, " cards. Every card has one number written on it, and that number can be negative. The cards are listed top → bottom.", " 장이에요. 카드마다 수가 하나씩 적혀 있고, 그 수는 음수일 수도 있어요. 카드는 위 → 아래 순으로 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Choose a ", "묶음들의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "permutation of the stacks", "순서 (순열)")}</b>
                  {t(E, " and concatenate them into one big pile — each stack keeps its own internal order.",
                        " 를 골라 하나의 큰 더미로 이어 붙여요. 묶음 안의 카드 순서는 그대로예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Deal from the top alternately: card 1 → ", "맨 위부터 번갈아 나눠줘요. 1번째 카드 → ")}
                  <b style={{ color: "#d97706" }}>P1</b>{t(E, ", card 2 → ", ", 2번째 → ")}<b style={{ color: "#7c3aed" }}>P2</b>
                  {t(E, ", card 3 → ", ", 3번째 → ")}<b style={{ color: "#d97706" }}>P1</b>{t(E, ", … score_i = sum of the cards player i receives.", ", … 이렇게요. score_i 는 플레이어 i 가 받은 카드 값을 모두 더한 것이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "모든 순서 중에서 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum possible score1 − score2", "가능한 score1 − score2 의 최댓값")}</b>
                  {t(E, " over all orderings.", "을 찾아 출력해요.")}
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
        "Read the input format, then the official example.",
        "입력 형식을 보고, 공식 예제를 따라가 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>T</b> — {t(E, "number of test cases", "테스트 케이스 수")}</div>
              <div>• {t(E, "per test: a line with ", "케이스마다 ")}<b>n</b>{t(E, " (number of stacks)", " 이 한 줄 — 묶음이 몇 개인지예요")}</div>
              <div>• {t(E, "then n stack lines: ", "그다음 묶음마다 한 줄씩 n 줄 — ")}<b>m c1 c2 … c_m</b> {t(E, "(top → bottom)", "(위 → 아래)")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: at most T = 10 test cases, at most n = 10^5 stacks. Each card's number is between −10^9 and 10^9, and all the test cases together hold at most 2·10^5 cards.", "제약은 이래요. 테스트 케이스는 T ≤ 10 개, 묶음은 n ≤ 10^5 개예요. 카드에 적힌 수는 −10^9 부터 10^9 까지예요. 모든 케이스의 카드를 합쳐도 2·10^5 장을 넘지 않아요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input (1st test case)", "예제 입력 (첫 번째 케이스)")}</div>
              <div>4          <span style={{ color: "#8b949e" }}>{t(E, "# n = 4 stacks", "# 묶음이 n = 4 개")}</span></div>
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
              "Stack them in this order: [8] → [4, 5] → [6, 2, 3] → [1, 2, 5, 0]. The big pile becomes 8, 4, 5, 6, 2, 3, 1, 2, 5, 0. Dealing from the top, P1 gets 8, 5, 2, 1, 5 so score1 = 21, and P2 gets 4, 6, 3, 2, 0 so score2 = 15. So score1 − score2 = 6, and that is the best you can do.",
              "묶음을 [8] → [4, 5] → [6, 2, 3] → [1, 2, 5, 0] 순으로 이어 붙여 봐요. 큰 더미는 8, 4, 5, 6, 2, 3, 1, 2, 5, 0 이 돼요. 맨 위부터 번갈아 나눠주면 P1 은 8, 5, 2, 1, 5 를 받아 score1 = 21 이고, P2 는 4, 6, 3, 2, 0 을 받아 score2 = 15 예요. 그래서 score1 − score2 = 6 이고, 이게 낼 수 있는 가장 큰 값이에요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Reorder the stacks and watch what happens to score1 − score2.",
        "묶음 순서를 바꾸면서 점수 차이가 어떻게 변하는지 봐요."),
      content: <StackOrderSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Now work out one stack's D by hand.",
        "이번엔 묶음 하나의 D 를 직접 구해 봐요."),
      question: t(E,
        "Stack (top → bottom) = [6, 2, 3]. Adding from the top with +, −, +: D = 6 − 2 + 3 = ?",
        "묶음 (위 → 아래) = [6, 2, 3]. 맨 위부터 +, −, + 로 더하면 D = 6 − 2 + 3 = ?"),
      options: [
        t(E, "7", "7"),
        t(E, "11", "11"),
        t(E, "1", "1"),
      ],
      correct: 0,
      explain: t(E,
        "6 − 2 + 3 = 7. Signs alternate +, −, +, … from the top card. Each stack collapses to this single number D.",
        "6 − 2 + 3 = 7. 맨 위 카드부터 부호가 +, −, +, … 로 번갈아요. 묶음 하나는 이렇게 수 D 하나로 줄어들어요."),
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
        "Why trying every ordering is hopeless, and what to do instead.",
        "모든 순서를 다 해보면 왜 안 되는지, 대신 뭘 할지 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow way — try every ordering of the stacks", "느린 방법 — 묶음의 모든 순서를 다 해 보기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "n! permutations. Even n = 15 is over 10^12 orderings. Times out.", "순서가 n! 가지예요. n = 15 만 해도 10^12 개가 넘어요. 그래서 시간 초과가 나요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast way — shrink each stack to one number D, then pick its sign", "빠른 방법 — 묶음마다 수 D 하나로 줄이고, 그다음 부호를 골라주기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "A stack adds either +D or −D to the gap, and which one depends on the position it starts at. An odd-length stack pushes everything after it along by one place, so it flips odd into even. That means if even one odd-length stack exists, an even-length stack can be moved before or after it to choose its own sign — so it always takes the adding side. Among the odd-length stacks the signs come out +, −, +, … in a row, so give + to the biggest D's. This reads every card once and sorts just the odd-length stacks — no nested loops.", "묶음 하나는 점수 차이에 +D 아니면 −D 를 더해요. 어느 쪽이 될지는 그 묶음이 몇 번째 자리에서 시작하느냐가 정해요. 길이가 홀수인 묶음은 뒤에 오는 카드의 자리를 한 칸씩 밀어서 홀짝을 뒤집어요. 그래서 그런 묶음이 하나라도 있으면, 길이가 짝수인 묶음은 그 앞이나 뒤로 옮겨 부호를 골라잡을 수 있어요. 그러니 늘 더하는 쪽을 챙겨요. 길이가 홀수인 묶음끼리는 부호가 +, −, +, … 로 번갈아 나와요. 그러니 D 가 큰 것부터 + 를 줘요. 카드를 한 번씩만 읽고 홀수 묶음만 정렬하면 끝나요 — 반복을 겹쳐 돌지 않아요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
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
