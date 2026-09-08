import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc19BakerySections } from "./components";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* ─────────────────────────────────────────────────────────────
   Concept sim: the deque greedy on the official sample.
   prices = [3,2,6,8,10,1,7,9]  → sorted asc [1,2,3,6,7,8,9,10]
   Each round: pay the two most-expensive, the next is FREE,
   then pay the CHEAPEST remaining. Total lands on 35.
   A small contrast card shows why naive "chop into blocks" (36)
   loses to pairing the cheapest with the expensive ones (35).
   ───────────────────────────────────────────────────────────── */
const SAMPLE = [3, 2, 6, 8, 10, 1, 7, 9];
const SORTED = [...SAMPLE].sort((a, b) => a - b); // [1,2,3,6,7,8,9,10]

// Precompute the deque greedy round-by-round on SORTED.
function buildRounds(sortedAsc) {
  const dq = [...sortedAsc];
  const rounds = [];
  while (dq.length) {
    const e1 = dq.pop();      // most expensive  -> pay
    const e2 = dq.pop();      // 2nd expensive   -> pay
    const free = dq.pop();    // 3rd expensive   -> FREE
    const cheap = dq.shift(); // cheapest left   -> pay
    rounds.push([
      { v: e1, role: "pay" },
      { v: e2, role: "pay" },
      { v: free, role: "free" },
      { v: cheap, role: "cheap" },
    ]);
  }
  return rounds;
}
const ROUNDS = buildRounds(SORTED); // 2 rounds for the sample

function BakeryGreedySim({ E }) {
  // step 0 = nothing revealed, step k = first k rounds revealed
  const [step, setStep] = useState(0);
  const shown = ROUNDS.slice(0, step);

  // running total after the shown rounds
  let paid = 0, freed = 0;
  shown.forEach((r) =>
    r.forEach((p) => (p.role === "free" ? (freed += p.v) : (paid += p.v)))
  );

  // which values are already used (to dim them in the sorted strip)
  const used = {};
  shown.forEach((r) => r.forEach((p) => (used[p.v] = (used[p.v] || 0) + 1)));
  const usedCopy = { ...used };
  const roleOf = {};
  shown.forEach((r, ri) => r.forEach((p) => { roleOf[`${ri}:${p.v}`] = p.role; }));

  const done = step >= ROUNDS.length;

  const chip = (v, kind) => {
    const map = {
      pay: { bg: "#fff", bd: "#fcd34d", fg: "#92400e", strike: false },
      cheap: { bg: "#fef3c7", bd: "#d97706", fg: "#9a3412", strike: false },
      free: { bg: "#dcfce7", bd: "#15803d", fg: "#15803d", strike: true },
      dim: { bg: "#f8fafc", bd: "#e2e8f0", fg: "#cbd5e1", strike: false },
      idle: { bg: "#fff", bd: "#fcd34d", fg: "#92400e", strike: false },
    };
    const s = map[kind];
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        minWidth: 30, height: 30, padding: "0 6px", borderRadius: 8,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800,
        border: `1.5px solid ${s.bd}`, background: s.bg, color: s.fg,
        textDecoration: s.strike ? "line-through" : "none",
      }}>{v}</span>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 8 }}>
          🥖 {t(E, "Greedy on the official sample", "공식 예제로 그리디 따라가기")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7, marginBottom: 8, textWrap: "balance" }}>
          {t(E,
            "Sort the prices small→big. Each round: pay the two most-expensive, let the next one be FREE, then pay the cheapest that's left.",
            "가격을 작은→큰 순으로 정렬해요.\n한 라운드마다 제일 비싼 두 개를 지불하고, 그다음 하나를 무료로 받고,\n남은 것 중 제일 싼 것을 지불해요.")}
        </div>
        {/* 2026-09-08 화면 담당: 미션은 "2번째로 싼 빵이 무료" 라고 하고
            여기선 "3번째로 비싼 것" 이라고 한다. 4개 묶음에선 같은 자리인데
            (메인이 2000개 묶음으로 검산 — 전부 일치) 화면이 그 말을 한 번도 안 했다.
            학생 눈엔 "2번째로 싼 거라며, 왜 3번째로 비싼 거지?" 가 된다. */}
        <div style={{
          fontSize: 11.5, color: "#92400e", lineHeight: 1.65, marginBottom: 12,
          background: "#fff", border: "1px dashed #fcd34d", borderRadius: 8,
          padding: "7px 10px", textWrap: "balance", ...KA,
        }}>
          {t(E,
            "In a batch of 4, the 3rd-most-expensive IS the 2nd-cheapest — the same slot, counted from the other end.",
            "4 개 묶음에서 '3 번째로 비싼 것' 은 '2 번째로 싼 것' 과 같은 자리예요.\n반대쪽에서 셌을 뿐이에요.")}
        </div>

        {/* sorted strip */}
        <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "sorted prices (small → big)", "정렬된 가격 (작은 → 큰)")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {SORTED.map((v, i) => {
            let kind = "idle";
            if (usedCopy[v] > 0) { usedCopy[v] -= 1; kind = "dim"; }
            return <span key={i}>{chip(v, kind)}</span>;
          })}
        </div>

        {/* controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={navBtn(step === 0)}>◀ {t(E, "back", "이전")}</button>
          <button onClick={() => setStep(Math.min(ROUNDS.length, step + 1))} disabled={done} style={navBtn(done)}>{t(E, "next round", "다음 라운드")} ▶</button>
          <span style={{ fontSize: 12, color: "#92400e", fontWeight: 700 }}>
            {t(E, "round ", "라운드 ")}{step}/{ROUNDS.length}
          </span>
        </div>

        {/* revealed rounds */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
          {shown.map((r, ri) => (
            <div key={ri} style={{ background: "#fff", border: "1px solid #fcd34d", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", marginBottom: 6 }}>
                {t(E, "round ", "라운드 ")}{ri + 1}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                {r.map((p, pi) => (
                  <span key={pi} style={{ ...NW, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {chip(p.v, p.role)}
                    <span style={{ fontSize: 10.5, color: p.role === "free" ? "#15803d" : "#92400e", fontWeight: 700 }}>
                      {p.role === "free"
                        ? t(E, "FREE", "무료")
                        : p.role === "cheap"
                          ? t(E, "pay (cheapest)", "지불 (제일 싼 것)")
                          : t(E, "pay", "지불")}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* running total */}
        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, ...KA }}>
          {t(E, "saved (free): ", "절약 (무료): ")}<b style={{ color: "#6ee7b7" }}>{freed}</b>
          {"   "}·{"   "}
          {t(E, "pay: ", "지불: ")}<b style={{ color: "#fbbf24" }}>{paid}</b>
          {done && <span> {"  "}✅ {t(E, "final total = ", "최종 총액 = ")}<b style={{ color: "#fbbf24" }}>{paid}</b></span>}
        </div>

        {/* 2026-09-08: 이 대조 카드는 **시뮬을 끝까지 눌러야만** 나왔다.
            즉 답(35)이 확정된 뒤에 반례를 보여주는 사후 정당화였다.
            학생: "딱 한 가지 다른 방법과만 비교한 거라 '진짜 제일 싸다' 는 증명은 아니었다.
            조금은 '그렇다니까' 였다."
            그래서 **묻는 자리를 앞으로** 옮긴다 — 누르기 전에 먼저 추측하게 한다.
            (새 증명 장치를 만들지 않는다. 위치만 바꾼다.) */}
        {!done && (
          <div style={{ marginTop: 12, background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "10px 12px", ...KA }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#1d4ed8", marginBottom: 6 }}>
              🤔 {t(E, "Guess first: which way is cheaper?", "먼저 추측해봐요 — 어느 쪽이 더 쌀까요?")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, textWrap: "balance" }}>
              {t(E,
                "(A) Chop the big→small list into blocks: [10,9,8,7] and [6,3,2,1].\n(B) Put the cheap ones together with expensive ones, as the steps above do.\nPress through and see which total comes out smaller.",
                "(A) 큰→작은 순으로 그냥 잘라 묶기: [10,9,8,7] 과 [6,3,2,1].\n(B) 싼 것을 비싼 것들과 함께 묶기 — 위 단계가 하는 방법.\n눌러서 어느 쪽 총액이 더 작게 나오는지 봐요.")}
            </div>
          </div>
        )}

        {/* 끝까지 누른 뒤 — 숫자로 답 맞추기 */}
        {done && (
          <div style={{ marginTop: 12, background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 12px", ...KA }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#b91c1c", marginBottom: 6 }}>
              🤔 {t(E, "Why not just chop into blocks of 4?", "왜 그냥 4개씩 잘라 묶으면 안 될까?")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "(A) blocks [10,9,8,7] and [6,3,2,1] free 8 and 2 → saves 10 → pay 36.",
                "(A) [10,9,8,7] 과 [6,3,2,1] 로 자르면 8 과 2 가 무료 → 10 절약 → 36 지불.")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginTop: 6 }}>
              {t(E,
                "(B) pairs the cheap 1 and 2 with expensive items, so it frees 8 and 3 → saves 11 → pay 35.\nA cheap bread is worth little as the free one — better to let it be one you pay for.",
                "(B) 는 싼 1 과 2 를 비싼 것들과 짝지어 8 과 3 을 무료로 만들어요 → 11 절약 → 35 지불.\n싼 빵을 공짜로 받으면 얼마 못 아껴요. 공짜 자리는 비싼 빵에 주는 게 이득이에요.")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function navBtn(disabled) {
  return {
    padding: "5px 12px", borderRadius: 8, border: "1px solid #d97706",
    background: disabled ? "#f1f5f9" : "#d97706", color: disabled ? "#94a3b8" : "#fff",
    fontSize: 12, fontWeight: 800, cursor: disabled ? "default" : "pointer",
  };
}

/* ================================================================
   SOLUTION CODE  (deque greedy — kept for any external reference)
   ================================================================ */
export const SOLUTION_CODE = [
  "import collections",
  "N = int(input())",
  "prices = list(map(int, input().split()))",
  "prices.sort()",
  "dq = collections.deque(prices)",
  "pay = 0",
  "while dq:",
  "    pay += dq.pop()      # most expensive",
  "    pay += dq.pop()      # 2nd most expensive",
  "    dq.pop()             # 3rd most expensive -> FREE",
  "    pay += dq.popleft()  # cheapest remaining",
  "print(pay)",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19BakeryCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Buy all N breads. In each batch of 4, the 2nd-cheapest is free.",
        "빵을 4 개씩 묶어 사면 그중 2 번째로 싼 것이 공짜예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🥖</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#d97706" }}>Bakery</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P2</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Group the breads into batches of 4 to make the total cost as small as possible.",
                "빵을 4 개씩 묶는 방법을 골라 총 비용을 최소로 만들어요.")}
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
                  {t(E, "There are ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "N breads (N is a multiple of 4) with given prices", "가격이 주어진 N 개의 빵 (N 은 4 의 배수)")}</b>
                  {t(E, ", and you must buy all of them.", " 이 있고, 전부 사야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You split them into ", "빵을 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "batches of exactly 4, grouped any way you like", "정확히 4 개씩, 원하는 대로 자유롭게")}</b>
                  {t(E, ". In each batch, ", " 묶어요. 각 묶음에서 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "the 2nd-cheapest bread is FREE", "2 번째로 싼 빵이 무료")}</b>
                  {t(E, ".", " 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum total cost", "최소 총 비용")}</b>
                  {t(E, " over all ways to group them.", " 을 출력해요 (모든 묶는 방법 중에서).")}
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
        "The input format and the official example.",
        "입력 형식과 공식 예제를 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "line 1: ", "1줄: ")}<b>N</b> — {t(E, "number of breads (a multiple of 4)", "빵 개수 (4 의 배수)")}</div>
              <div>• {t(E, "line 2: ", "2줄: ")}<b>{t(E, "N prices", "N 개의 가격")}</b></div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Output: the minimum total cost.", "출력: 최소 총 비용.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>8</div>
              <div style={{ overflowX: "auto" }}>3 2 6 8 10 1 7 9</div>
            </div>
            <div style={{ background: "#0f172a", color: "#fbbf24", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>35</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "8 breads make two batches of 4. The best grouping frees breads worth 8 and 3 (saving 11), so you pay 46 − 11 = 35.",
              "빵 8 개는 4 개짜리 묶음 두 개예요. 가장 좋은 묶음은 8 과 3 짜리 빵을 무료로 만들어 (11 절약), 46 − 11 = 35 를 지불해요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Now try the other way and see which one wins.",
        "이제 다른 방법과 견줘봐요. 어느 쪽이 더 쌀까요?"),
      content: <BakeryGreedySim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "One question before the code.",
        "코드 전에 하나만 확인해요."),
      question: t(E,
        "In a single batch of 4 breads, which one is free?",
        "빵 4 개짜리 한 묶음에서 무료가 되는 것은?"),
      options: [
        t(E, "The cheapest", "제일 싼 것"),
        t(E, "The 2nd-cheapest", "2 번째로 싼 것"),
        t(E, "The most expensive", "제일 비싼 것"),
      ],
      correct: 1,
      explain: t(E,
        "Only the 2nd-cheapest of each batch is free. The greedy pairs the two globally-cheapest breads into pay-slots so the free slot lands on a pricier bread.",
        "각 묶음의 2 번째로 싼 것만 무료예요. 그리디는 전체에서 제일 싼 두 빵을 지불 자리에 넣어, 무료 자리가 더 비싼 빵에 떨어지게 해요."),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19BakeryCh2(E, lang = "py") {
  return [
    // 2-1: plan — slow vs fast
    {
      type: "reveal",
      narr: t(E,
        "Slow way vs fast way — why they differ.",
        "느린 방법과 빠른 방법, 무엇이 다른지 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every grouping", "느림: 모든 묶음 방법 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "The number of ways to split N breads into batches of 4 blows up — impossible to check them all.", "N 개를 4 개씩 나누는 방법의 수가 폭발해요 — 전부 확인 불가능.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: sort, then greedy with a deque", "빠름: 정렬 후 덱으로 그리디")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Sort once (N log N), then each round takes O(1) from both ends. Free the 3rd-most-expensive, pair the cheapest as a pay-slot.", "한 번 정렬 (N log N) 후, 라운드마다 양끝에서 O(1). 세 번째로 비싼 것을 무료로, 제일 싼 것을 지불 자리로 짝지어요.")}
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
      sections: getMcc19BakerySections(E),
    },
  ];
}
