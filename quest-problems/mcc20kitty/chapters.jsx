import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc20KittySections } from "./components";

const A = "#dc2626";
const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

// Kitty_1..5 = 11, 9, 20, 20, 25  → remainders mod 3
const BASE = [11, 9, 20, 20, 25];
const BASE_R = BASE.map((v) => v % 3); // [2, 0, 2, 2, 1]

/* ─── verified reference numbers (from the solution) ───
   pure cycle: starts at term 1, period 104, 35 zeros per cycle. */
const PERIOD = 104;
const ZEROS_PER_CYCLE = 35;

// build the remainder sequence up to `n` terms (1-indexed length n)
function remainders(n) {
  const r = [...BASE_R];
  while (r.length < n) {
    const s = r.slice(-5).reduce((x, y) => x + y, 0);
    r.push(s % 3);
  }
  return r.slice(0, n);
}

/* ═══════════════════════════════════════════════════════════════
   Concept sim: remainders mod 3, mark the zeros, feel the cycle
   ═══════════════════════════════════════════════════════════════ */
function KittyRemainderSim({ E }) {
  const [n, setN] = useState(7); // how many terms revealed (start at the sample's 7)
  /* 2026-09-17: 아래 마무리 문구가 "반복 길이는 104, 한 바퀴 안에 0 이 35개" 라는
     이 문제의 결론을, 학생이 +/− 를 누르기도 전에 항상 보여주고 있었다.
     mcc20cipher/chapters.jsx:27,109-118 이 같은 문제를 touched 로 이미 고쳤다 — 그 수법을 그대로. */
  const [touched, setTouched] = useState(false);
  const MIN = 5, MAX = 26;
  const r = remainders(n);
  const zeros = r.filter((x) => x === 0).length;

  const chip = (val, i) => {
    const isZero = val === 0;
    const inWindow = i >= n - 5; // last 5 = current "window"
    return (
      <span key={i} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <span style={{ fontSize: 9, color: C.dim, fontWeight: 700 }}>K{i + 1}</span>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 30, height: 30, borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800,
          background: isZero ? "#16a34a" : "#fff",
          color: isZero ? "#fff" : "#dc2626",
          border: inWindow ? "2px solid #dc2626" : `1.5px solid ${isZero ? "#16a34a" : "#fca5a5"}`,
        }}>{val}</span>
        <span style={{ fontSize: 10, minHeight: 12, color: "#16a34a", fontWeight: 800 }}>{isZero ? "✓" : ""}</span>
      </span>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
          🔁 {t(E, "Only the remainder (mod 3) matters", "나머지(mod 3)만 중요해요")}
        </div>
        {/* 2026-09-17: 이 문단이 줄바꿈 없이 148 자였다. 절 단위로 끊는다. */}
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12,
          whiteSpace: "pre-line", textWrap: "balance" }}>
          {t(E,
            "We only ask 'is this term divisible by 3?',\nso we throw the huge numbers away and keep just the remainder 0/1/2.\nA new term's remainder = the previous FIVE remainders added up, mod 3.\nA 0 (✓) means that term is divisible by 3.",
            "우리가 궁금한 건 '이 항이 3 의 배수인가?' 뿐이에요.\n그래서 거대한 숫자는 버리고 나머지 0/1/2 만 들고 다녀요.\n새 항의 나머지는 바로 앞 다섯 나머지를 더해서 3 으로 나눈 나머지예요.\n0 (✓) 인 항이 3 의 배수예요.")}
        </div>

        {/* chip row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, alignItems: "flex-start" }}>
          {r.map((v, i) => chip(v, i))}
        </div>

        {/* controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#7f1d1d", fontWeight: 700 }}>{t(E, "terms shown:", "보이는 항 수:")}</span>
          <button onClick={() => { setTouched(true); setN(Math.max(MIN, n - 1)); }} style={stepBtn}>−</button>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, color: A, minWidth: 24, textAlign: "center" }}>{n}</span>
          <button onClick={() => { setTouched(true); setN(Math.min(MAX, n + 1)); }} style={stepBtn}>+</button>
          <button onClick={() => setN(7)} style={{ ...stepBtn, width: "auto", padding: "0 10px", fontSize: 12 }}>{t(E, "reset", "처음으로")}</button>
        </div>

        {/* live counter */}
        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, ...KA }}>
          {t(E, "divisible by 3 so far (", "지금까지 3의 배수 (")}
          <b style={{ color: "#fbbf24" }}>K1…K{n}</b>
          {t(E, "): ", ") : ")}
          <b style={{ color: "#4ade80", fontSize: 15 }}>{zeros}</b>
          {t(E, "  ← count of ✓", "  ← ✓ 개수")}
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55,
          whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
          {
            touched
              ? t(E,
                  `A window of 5 remainders (the red-outlined chips) has only 3⁵ = 243 possible patterns.\nSo as we go on, some window MUST come back — and from there everything repeats forever.\nFor Kitty the repeat length is ${PERIOD}, with ${ZEROS_PER_CYCLE} zeros inside one loop.\nCount the zeros in one loop, multiply by how many loops fit in N, add the leftover — done, even for N up to 10¹⁵.`,
                  `나머지 5칸짜리 창(빨간 테두리 칩)은 경우의 수가 3⁵ = 243개뿐이에요.\n그러니 계속 가다 보면 어떤 창이 반드시 다시 나와요.\n그때부터는 영원히 똑같이 반복돼요.\nKitty 의 반복 길이는 ${PERIOD}, 한 바퀴 안에 0이 ${ZEROS_PER_CYCLE}개 들어 있어요.\n한 바퀴의 0 개수 × N 에 들어가는 바퀴 수 + 남는 조각 —\n이러면 N 이 10¹⁵ 이어도 끝나요.`)
              : t(E,
                  "Press + and watch the red-outlined window of 5.\nHow many different patterns can that window ever take?",
                  "+ 를 눌러 빨간 테두리 5칸이 어떻게 바뀌는지 봐요.\n그 5칸이 될 수 있는 모양은 모두 몇 가지일까요?")}
        </div>
      </div>
    </div>
  );
}
const stepBtn = {
  width: 28, height: 28, borderRadius: 8, border: `1.5px solid ${A}`, background: "#fff",
  color: A, fontSize: 16, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};

/* small reusable chip row for static displays */
function StaticChips({ vals, markZero = true }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
      {vals.map((v, i) => {
        const isZero = markZero && v % 3 === 0;
        return (
          <div key={i} style={{
            minWidth: 40, height: 40, padding: "0 8px", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800,
            background: isZero ? "#dcfce7" : "#fef2f2",
            border: `1.5px solid ${isZero ? "#16a34a" : "#fca5a5"}`,
            color: isZero ? "#15803d" : "#dc2626",
          }}>{v}</div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc20KittyCh1(E) {
  return [
    // 1-1 title + mission + problem
    {
      type: "reveal",
      /* 2026-09-17: 이 quest 는 17쪽 중 13쪽의 파란 바가 55자를 넘었다.
         가장 긴 quest 인데 파란 바까지 무거우면 체감 분량이 더 늘어난다.
         파란 바는 "지금 뭘 볼 차례" 한 문장만 — 숫자·근거는 아래 카드가 이미 다 말한다. */
      narr: t(E,
        "Count how many of the first N Kitty numbers are divisible by 3.",
        "Kitty 수 중 3의 배수가 몇 개인지 세는 문제예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐱</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: A }}>Kitty Numbers</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P3</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fef2f2", border: `1.5px solid ${A}`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Among the first N Kitty numbers, count how many are divisible by 3.",
                "처음 N개의 Kitty 수 중에서 3의 배수가 몇 개인지 세요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The first five Kitty numbers are given: ", "처음 다섯 Kitty 수가 주어져요: ")}
                  <b style={{ color: A }}>11, 9, 20, 20, 25</b>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Every next term is the ", "그다음 항은 모두 ")}
                  <b style={{ color: A }}>{t(E, "sum of the previous FIVE", "직전 다섯 항의 합")}</b>
                  {t(E, " terms.", " 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Count how many of ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "Kitty₁ … Kitty_N are divisible by 3", "Kitty₁ … Kitty_N 중 3의 배수의 개수")}</b>
                  {t(E, ".", "를 세요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2 input format + official sample
    {
      type: "reveal",
      narr: t(E,
        "The input is just N — but it can be as large as 10^15.",
        "입력은 N 하나뿐인데, 10^15 까지 커질 수 있어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
              📥 {t(E, "Input / Output", "입력 / 출력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>N</b> — {t(E, "how many Kitty numbers to look at", "살펴볼 Kitty 수의 개수")}</div>
              <div>• {t(E, "Output: the count divisible by 3.", "3의 배수인 항이 몇 개인지 출력해요.")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limit: 2 ≤ N ≤ 10^15.", "제약: 2 ≤ N ≤ 10^15.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, flex: 1, minWidth: 120 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div style={{ fontWeight: 800 }}>7</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>2</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55,
            whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
            {/* 2026-09-17: 형식 카드가 "9와 159 둘뿐 → 답은 2" 라고 세는 일까지 다 해버렸다.
                바로 다음 쪽이 항을 직접 만들어보는 자리다 — 답을 그쪽으로 미룬다. */}
            {t(E,
              "N = 7 means we look at the first 7 Kitty numbers. Why is the answer 2?\nThe next page builds those terms one by one.",
              "N = 7 은 처음 7개 Kitty 수를 본다는 뜻이에요. 왜 답이 2 일까요?\n다음 쪽에서 그 항들을 하나씩 만들어봐요.")}
          </div>
        </div>),
    },

    // 1-3 how the sequence is built
    {
      type: "reveal",
      narr: t(E,
        "Watch the window of five slide forward to make each new term.",
        "다섯 칸짜리 창이 앞으로 미끄러지며 새 항을 만들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6, textAlign: "center" }}>
              {t(E, "Kitty₁ … Kitty₇  (green = divisible by 3)", "Kitty₁ … Kitty₇  (초록 = 3의 배수)")}
            </div>
            <StaticChips vals={[11, 9, 20, 20, 25, 85, 159]} />
          </div>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: "#7f1d1d", lineHeight: 1.9, ...KA }}>
            <div>K6 = 11 + 9 + 20 + 20 + 25 = <b>85</b></div>
            <div>K7 = 9 + 20 + 20 + 25 + 85 = <b>159</b></div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", ...KA }}>
            {t(E, "Each new term uses only the last five — a sliding window of 5.", "새 항은 마지막 다섯 개만 써요 — 5칸 슬라이딩 창.")}
          </div>
        </div>),
    },

    // 1-4 concept sim
    {
      type: "reveal",
      narr: t(E,
        "Throw away the huge numbers and keep only the remainders.",
        "거대한 숫자는 버리고 나머지만 남겨볼 차례예요."),
      content: <KittyRemainderSim E={E} />,
    },

    // 1-5 understanding quiz
    {
      type: "quiz",
      /* 2026-09-17: narr 이 question 을 숫자까지 그대로 다시 말했고,
         정답 보기만 "(2+0+2+2+1 = 7, 7 mod 3 = 1)" 로 나머지 둘의 두 배가 넘게 길었다.
         길이로 찍히는 문제가 된다 — 계산은 explain 으로 내리고 보기는 셋 다 숫자 하나로. */
      narr: t(E,
        "Your turn: work out the next remainder.",
        "다음 나머지를 직접 구해볼 차례예요."),
      question: t(E,
        "Remainders so far: 2, 0, 2, 2, 1. What is the next remainder (mod 3)?",
        "지금까지 나머지는 2, 0, 2, 2, 1 이에요.\n다음 나머지(mod 3)는 무엇일까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "0", "0"),
        t(E, "2", "2"),
      ],
      correct: 0,
      explain: t(E,
        "2+0+2+2+1 = 7, and 7 mod 3 = 1. So K6's remainder is 1 — 85 is not divisible by 3.\nWorking in remainders keeps every number tiny.",
        "2+0+2+2+1 = 7 이고, 7 mod 3 = 1 이에요.\n그래서 K6 의 나머지는 1 — 85 는 3의 배수가 아니에요.\n나머지로만 다루면 모든 수가 작게 유지돼요."),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 📋 전략 — 느린 방법의 한계 → 사이클
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc20KittyCh2(E) {
  return [
    // 2-1 slow way and why it fails
    {
      type: "reveal",
      narr: t(E,
        "Why building every term up to N cannot work.",
        "모든 항을 만들며 세는 방법이 왜 안 되는지 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
              🐢 {t(E, "Slow: loop all the way to N", "느림: N까지 전부 반복")}
            </div>
            {/* 2026-09-17: 95 자가 한 줄로 이어져 있었다. 절 단위로 끊는다. */}
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6,
              whiteSpace: "pre-line", textWrap: "balance" }}>
              {t(E,
                "A computer does about 10^8–10^9 steps per second.\nN = 10^15 steps would take weeks.\nAnd each Kitty number grows so fast it soon has trillions of digits.",
                "컴퓨터는 1 초에 10^8–10^9 단계쯤 해요.\nN = 10^15 단계면 몇 주가 걸려요.\n게다가 Kitty 수는 너무 빨리 커져서 곧 자릿수가 조 단위예요.")}
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ so we need a shortcut that doesn't touch every term.", "↓ 그래서 모든 항을 건드리지 않는 지름길이 필요해요.")}
          </div>
        </div>),
    },

    // 2-2 insight 1: only remainders matter
    {
      type: "reveal",
      narr: t(E,
        "A term's remainder depends only on the sum of the previous five remainders, mod 3.",
        "첫 번째 열쇠예요. 3의 배수인지는 나머지에만 달렸어요.\n거대한 숫자는 버리고 0/1/2만 남겨요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ marginBottom: 10, textAlign: "center", fontSize: 11, fontWeight: 700, color: C.dim }}>
            {t(E, "the numbers …", "숫자 …")}
          </div>
          <StaticChips vals={[11, 9, 20, 20, 25, 85, 159]} />
          <div style={{ textAlign: "center", fontSize: 20, color: A, margin: "8px 0" }}>↓ mod 3</div>
          <div style={{ marginBottom: 6, textAlign: "center", fontSize: 11, fontWeight: 700, color: C.dim }}>
            {t(E, "… become just remainders (0 = divisible)", "… 나머지만 남아요 (0 = 3의 배수)")}
          </div>
          <StaticChips vals={[2, 0, 2, 2, 1, 1, 0]} />
        </div>),
    },

    // 2-3 insight 2: finite states → cycle
    {
      type: "reveal",
      narr: t(E,
        "Insight 2 — look at the 'window' made by the last five remainders.",
        "두 번째 열쇠 — 나머지 다섯 칸이 이루는 '창' 을 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", textAlign: "center", maxWidth: 360, ...KA }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#7f1d1d", marginBottom: 6 }}>
                {t(E, "a window = 5 remainders", "창 = 나머지 5칸")}
              </div>
              <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: A }}>
                3 × 3 × 3 × 3 × 3 = <span style={{ color: "#b91c1c" }}>243</span>
              </div>
              <div style={{ fontSize: 11.5, color: C.dim, marginTop: 4 }}>
                {t(E, "only 243 possible windows", "가능한 창은 243개뿐")}
              </div>
            </div>
            <div style={{ fontSize: 20, color: A, fontWeight: 700 }}>↓</div>
            <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 10, padding: "10px 14px", textAlign: "center", maxWidth: 360, ...KA }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#15803d", lineHeight: 1.5 }}>
                {t(E,
                  "A window must eventually repeat → the remainders cycle. For Kitty the cycle length is 104.",
                  "창은 언젠가 반드시 반복 → 나머지가 사이클을 이뤄요. Kitty의 사이클 길이는 104.")}
              </div>
            </div>
          </div>
        </div>),
    },

    // 2-4 quiz: why must it repeat
    {
      type: "quiz",
      narr: t(E,
        "Why must it repeat? Pick the reason.",
        "왜 반드시 반복될까요? 이유를 골라봐요."),
      question: t(E,
        "Why is the remainder sequence guaranteed to repeat?",
        "나머지 수열이 반드시 반복되는 이유는?"),
      /* 2026-09-17: 정답 보기만 오답 둘의 2.5배 길었다 — 이해 없이 길이로 찍힌다.
         정답을 줄이고, 오답도 비슷한 길이의 '그럴듯한 오해' 로 바꿨다.
         (전 오답 "Kitty 수가 항상 짝수라서" 는 짧은데다 한눈에 틀린 말이었다.) */
      options: [
        t(E, "Only 243 window-patterns exist, so one must come back.",
             "창 패턴이 243개뿐이라 언젠가 하나가 다시 나와서."),
        t(E, "Kitty numbers hit multiples of 3 more often as they grow.",
             "Kitty 수가 커질수록 3의 배수가 촘촘해져서."),
        t(E, "Because N is capped at 10^15, so it cannot run forever.",
             "N 이 10^15 까지로 정해져 있어서."),
      ],
      correct: 0,
      explain: t(E,
        "The next remainder depends only on the current 5-window. With just 243 windows, one repeats within 243 steps, and the same window always produces the same future — a cycle.",
        "다음 나머지는 현재 5칸 창에만 달려 있어요. 창이 243개뿐이니 243단계 안에 하나가 반복되고, 같은 창은 항상 같은 미래를 만들어요 — 사이클."),
    },

    // 2-5 insight 3: count via cycle
    {
      type: "reveal",
      narr: t(E,
        "Count the zeros in one cycle, then use full cycles plus the leftover partial cycle.",
        "세 번째 열쇠예요. 한 바퀴의 0만 세면 나머지는 곱셈과\n덧셈으로 끝나요. 큰 반복이 필요 없어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 12, padding: "14px 16px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.9, ...KA }}>
            <div><span style={{ color: "#8b949e" }}># zeros in one 104-cycle</span></div>
            <div>cycle_zeros = <b style={{ color: "#fbbf24" }}>35</b></div>
            <div style={{ marginTop: 6 }}><span style={{ color: "#8b949e" }}># split N into whole cycles + leftover</span></div>
            <div>full    = N // 104</div>
            <div>partial = N % 104</div>
            <div style={{ marginTop: 6 }}>answer = full × 35 + <span style={{ color: "#6ee7b7" }}>zeros_in(partial)</span></div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, textAlign: "center", ...KA }}>
            {t(E,
              "(Kitty's cycle starts right at term 1, so there's no leading 'tail' to add separately.)",
              "(Kitty의 사이클은 1번 항부터 바로 시작해서, 따로 더할 앞쪽 '꼬리'가 없어요.)")}
          </div>
        </div>),
    },

    // 2-6 quiz: apply the counting idea
    {
      type: "quiz",
      narr: t(E,
        "Your turn — use the counting formula.",
        "이번엔 세는 식을 직접 써볼 차례예요."),
      question: t(E,
        "Cycle length 10 with 4 zeros; N = 25; the first 5 terms of the cycle contain 2 zeros. Total count?",
        "사이클 길이는 10이고 그 안에 0이 4개예요.\nN = 25이고 사이클 앞 5항에는 0이 2개예요. 총 개수는?"),
      options: [
        t(E, "2 × 4 + 2 = 10", "2 × 4 + 2 = 10"),
        t(E, "25", "25"),
        t(E, "4", "4"),
      ],
      correct: 0,
      explain: t(E,
        /* ⚠️ 2026-09-21: `25 // 10` 이라고 적혀 있었다. 이 quest 는 C++ 도 보여주는데
           **C++ 에서 `//` 는 주석**이라 그쪽 학생에겐 식이 안 읽힌다. 말로 적는다. */
        "25 ÷ 10 = 2 full cycles, with 5 left over. answer = 2 × 4 (from the full cycles) + 2 (zeros in the leftover 5) = 10.",
        "25 ÷ 10 = 2, 온전한 사이클이 2번이고 5항이 남아요.\n답은 2 × 4 (온전한 사이클) + 2 (남는 5항의 0) = 10 이에요."),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc20KittyCh3(E, lang = "py") {
  return [
    // 3-1 phase 1: work in remainders
    {
      type: "reveal",
      narr: t(E,
        "Phase 1 — grow the list of remainders.",
        "1단계 — 나머지 리스트를 늘리는 코드예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5, lineHeight: 1.9 }}>
            <div><span style={{ color: "#e2e8f0" }}>r = [11%3, 9%3, 20%3, 20%3, 25%3]</span></div>
            <div><span style={{ color: "#6b7280" }}># r = [2, 0, 2, 2, 1]</span></div>
            <div>&nbsp;</div>
            <div><span style={{ color: "#e2e8f0" }}>nxt = </span><span style={{ color: "#c084fc" }}>sum</span><span style={{ color: "#e2e8f0" }}>(r[-5:]) % 3</span></div>
          </div>
        </div>),
    },

    // 3-2 phase 2: find the cycle
    {
      type: "reveal",
      /* 2026-09-09: 이 narr 이 답을 미리 계산해서 말하고 있었다.
         narr 은 질문과 무관하게 항상 먼저 뜬다 — 안 풀어도 읽기만 하면 답이 보였다.
         상황만 남기고 계산은 뺐다. 찾은 도구: scripts/check-quiz-spoiler.py */
      /* 2026-09-17: 80자였고, 학생용 글에 "dict" 라는 코드 용어가 그대로 있었다.
         파란 바는 짧게, 표(dict) 설명은 아래 코드 밑에 우리말로 붙인다. */
      narr: t(E,
        "Phase 2 — spot the window that comes back.",
        "2단계 — 다시 나오는 창을 찾아내요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
            <div><span style={{ color: "#e2e8f0" }}>seen = {"{}"}</span></div>
            <div><span style={{ color: "#c084fc" }}>while </span><span style={{ color: "#e2e8f0" }}>True:</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    st = </span><span style={{ color: "#c084fc" }}>tuple</span><span style={{ color: "#e2e8f0" }}>(r[k-1:k+4])</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    </span><span style={{ color: "#c084fc" }}>if </span><span style={{ color: "#e2e8f0" }}>st </span><span style={{ color: "#c084fc" }}>in </span><span style={{ color: "#e2e8f0" }}>seen:</span></div>
            <div><span style={{ color: "#e2e8f0" }}>        start = seen[st]; period = k - start</span></div>
            <div><span style={{ color: "#e2e8f0" }}>        </span><span style={{ color: "#c084fc" }}>break</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    seen[st] = k; k += 1</span></div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, textAlign: "center",
            lineHeight: 1.6, whiteSpace: "pre-line", ...KA }}>
            {t(E,
              "seen is a lookup table: each 5-window we have met, and the step it appeared at.\nFor Kitty this stops fast — start = 1, period = 104.",
              "seen 은 찾아보기 표예요. 만난 5칸 창과 그게 몇 번째였는지를 적어 둬요.\nKitty 에서는 금방 멈춰요 — start = 1, period = 104 예요.")}
          </div>
        </div>),
    },

    // 3-3 quiz: how far does the search go
    {
      type: "quiz",
      /* 2026-09-17: narr 이 "5칸 × 0·1·2" 라고 답을 만드는 식을 그대로 줬고,
         정답 보기만 "(= 3^5)" 라는 근거를 달고 있었다. 둘 다 explain 으로 내린다. */
      narr: t(E,
        "Your turn — count the windows.",
        "이번엔 창이 몇 가지인지 세어볼 차례예요."),
      question: t(E,
        "At most how many windows must we check before one is guaranteed to repeat?",
        "하나가 반드시 반복되기 전까지, 최대 몇 개의 창을 확인해야 하나요?"),
      options: [
        t(E, "243", "243"),
        t(E, "10^15", "10^15"),
        t(E, "104", "104"),
      ],
      correct: 0,
      explain: t(E,
        "A window is 5 remainders, each one of 0, 1, 2 — so 3 × 3 × 3 × 3 × 3 = 243 windows exist.\nBy the 244th window a repeat must have happened. Kitty's actual period (104) is well under that bound.",
        "창 하나는 나머지 5 개이고 나머지는 0·1·2 중 하나예요.\n그래서 3 × 3 × 3 × 3 × 3 = 243 가지뿐이에요.\n244번째 창에서는 반드시 반복이 일어나요.\nKitty 의 실제 주기(104)는 그 한계보다 훨씬 작아요."),
    },

    // 3-4 phase 3: count with arithmetic
    {
      type: "reveal",
      narr: t(E,
        "Phase 3: no big loop. Zeros in one cycle × number of whole cycles, plus zeros in the leftover. That gives the answer even for N = 10^15.",
        "3단계예요. 한 사이클의 0에 사이클 수를 곱하고\n남는 조각의 0을 더해요. 큰 반복은 필요 없어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
            <div><span style={{ color: "#e2e8f0" }}>remaining = N - (start - 1)</span></div>
            <div><span style={{ color: "#e2e8f0" }}>full    = remaining // period</span></div>
            <div><span style={{ color: "#e2e8f0" }}>partial = remaining % period</span></div>
            <div><span style={{ color: "#e2e8f0" }}>ans = full * cycle_zeros + partial_zeros</span></div>
            <div><span style={{ color: "#c084fc" }}>print</span><span style={{ color: "#e2e8f0" }}>(ans)</span></div>
          </div>
        </div>),
    },

    // 3-5 complexity
    {
      type: "reveal",
      narr: t(E,
        "How much work is this, really? It does not depend on N.",
        "이 방법이 얼마나 일하는지 봐요. N 과는 무관해요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ background: "#dbeafe", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2563eb" }}>{t(E, "Time", "시간")}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>~period</div>
              <div style={{ fontSize: 10, color: "#2563eb" }}>{t(E, "≈ 104, not N", "≈ 104, N 아님")}</div>
            </div>
            <div style={{ background: "#dcfce7", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a" }}>{t(E, "Space", "공간")}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#16a34a" }}>~period</div>
              <div style={{ fontSize: 10, color: "#16a34a" }}>{t(E, "one cycle of 0/1/2", "0/1/2 한 사이클")}</div>
            </div>
          </div>
          {/* 2026-09-17: 파란 바에서 내린 근거를 여기 카드로 옮겼다. */}
          <div style={{ marginTop: 12, fontSize: 11.5, color: C.dim, lineHeight: 1.6,
            whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
            {t(E,
              "We walk one cycle (~104 terms) to set up, then it is just a little arithmetic.\nSo N = 10 and N = 10^15 cost about the same.",
              "준비하느라 사이클 한 바퀴(약 104항)만 걷고,\n그다음은 곱셈과 덧셈 몇 번이 전부예요.\n그래서 N 이 10 이든 10^15 이든 드는 일이 거의 같아요.")}
          </div>
        </div>),
    },

    // 3-6 full code
    {
      type: "progressive",
      narr: t(E,
        "Here's the whole solution — read it part by part.",
        "전체 풀이예요 — 부분별로 읽어봐요."),
      sections: getMcc20KittySections(E),
    },
  ];
}

/* backward-compatible export used by chapters/App metadata */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */
