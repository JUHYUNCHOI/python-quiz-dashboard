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
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "We only ask 'is this term divisible by 3?', so we can throw away the huge numbers and keep just their remainder 0/1/2. A new term's remainder = (sum of the previous FIVE remainders) mod 3. Zeros (✓) are the terms divisible by 3.",
            "우리가 궁금한 건 '이 항이 3의 배수인가?' 뿐이에요. 그래서 거대한 숫자는 버리고 나머지 0/1/2만 들고 다녀요. 새 항의 나머지 = (직전 다섯 나머지의 합) mod 3. 0(✓)인 항이 3의 배수예요.")}
        </div>

        {/* chip row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, alignItems: "flex-start" }}>
          {r.map((v, i) => chip(v, i))}
        </div>

        {/* controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#7f1d1d", fontWeight: 700 }}>{t(E, "terms shown:", "보이는 항 수:")}</span>
          <button onClick={() => setN(Math.max(MIN, n - 1))} style={stepBtn}>−</button>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, color: A, minWidth: 24, textAlign: "center" }}>{n}</span>
          <button onClick={() => setN(Math.min(MAX, n + 1))} style={stepBtn}>+</button>
          <button onClick={() => setN(7)} style={{ ...stepBtn, width: "auto", padding: "0 10px", fontSize: 12 }}>{t(E, "reset", "초기화")}</button>
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

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            `A window of 5 remainders (the red-outlined chips) has only 3⁵ = 243 possible patterns. So as we go on, some window MUST come back — and from there everything repeats forever. For Kitty the repeat length is ${PERIOD}, with ${ZEROS_PER_CYCLE} zeros inside one loop. Count zeros in one loop, multiply by how many loops fit in N, add the leftover — done, even for N up to 10¹⁵.`,
            `나머지 5칸짜리 창(빨간 테두리 칩)은 경우의 수가 3⁵ = 243개뿐이에요. 그러니 계속 가다 보면 어떤 창이 반드시 다시 나오고, 그때부터 영원히 똑같이 반복돼요. Kitty의 반복 길이는 ${PERIOD}, 한 바퀴 안에 0이 ${ZEROS_PER_CYCLE}개 들어 있어요. 한 바퀴의 0 개수 × N에 들어가는 바퀴 수 + 남는 조각 — 이러면 N이 10¹⁵이어도 끝나요.`)}
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
      narr: t(E,
        "Kitty numbers grow by adding the previous FIVE terms. Your job isn't to print a term — it's to count how many of the first N are divisible by 3.",
        "Kitty 수는 직전 다섯 항을 더해서 커져요. 우리 일은 항을 출력하는 게 아니라, 처음 N개 중 3의 배수가 몇 개인지 세는 거예요."),
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
        "The input is just one number N — but it can be enormous, up to 10^15. Read the official example carefully.",
        "입력은 숫자 N 하나뿐이에요 — 그런데 최대 10^15까지, 아주 커질 수 있어요. 공식 예제를 잘 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
              📥 {t(E, "Input / Output", "입력 / 출력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>N</b> — {t(E, "how many Kitty numbers to look at", "살펴볼 Kitty 수의 개수")}</div>
              <div>• {t(E, "Output: the count divisible by 3.", "출력: 3의 배수인 항의 개수.")}</div>
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
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "The first 7 Kitty numbers are 11, 9, 20, 20, 25, 85, 159. Only 9 and 159 are divisible by 3 → the answer is 2.",
              "처음 7개 Kitty 수는 11, 9, 20, 20, 25, 85, 159. 이 중 3의 배수는 9와 159 둘뿐 → 답은 2.")}
          </div>
        </div>),
    },

    // 1-3 how the sequence is built
    {
      type: "reveal",
      narr: t(E,
        "Let's build a couple of terms. K6 = 11+9+20+20+25 = 85. K7 = 9+20+20+25+85 = 159. The window of five just slides forward.",
        "몇 항을 직접 만들어봐요. K6 = 11+9+20+20+25 = 85. K7 = 9+20+20+25+85 = 159. 다섯 칸짜리 창이 앞으로 미끄러질 뿐이에요."),
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
        "Now the key trick. Since we only care about divisibility by 3, keep just the remainders. Step out more terms and watch the zeros.",
        "이제 핵심 트릭이에요. 3으로 나누어지는지만 궁금하니, 나머지만 남겨요. 항을 더 펼쳐 보며 0(3의 배수)을 관찰해요."),
      content: <KittyRemainderSim E={E} />,
    },

    // 1-5 understanding quiz
    {
      type: "quiz",
      narr: t(E,
        "Remainders of 11,9,20,20,25 are 2,0,2,2,1. The next remainder = (2+0+2+2+1) mod 3.",
        "11,9,20,20,25의 나머지는 2,0,2,2,1. 다음 나머지 = (2+0+2+2+1) mod 3."),
      question: t(E,
        "Remainders so far: 2, 0, 2, 2, 1. What is the next remainder (mod 3)?",
        "지금까지 나머지: 2, 0, 2, 2, 1. 다음 나머지(mod 3)는?"),
      options: [
        t(E, "1  (2+0+2+2+1 = 7, 7 mod 3 = 1)", "1  (2+0+2+2+1 = 7, 7 mod 3 = 1)"),
        t(E, "0", "0"),
        t(E, "2", "2"),
      ],
      correct: 0,
      explain: t(E,
        "7 mod 3 = 1, so K6's remainder is 1 (85 is not divisible by 3). Working in remainders keeps every number tiny.",
        "7 mod 3 = 1, 그래서 K6의 나머지는 1 (85는 3의 배수가 아니에요). 나머지로만 다루면 모든 수가 작게 유지돼요."),
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
        "The obvious way: build every term up to N and count. But N can be 10^15 — no computer finishes that loop, and the real numbers would have trillions of digits.",
        "당연한 방법: N까지 모든 항을 만들며 세기. 하지만 N이 10^15까지 가요 — 그 루프는 어떤 컴퓨터도 못 끝내고, 진짜 숫자는 자릿수가 조 단위가 돼요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
              🐢 {t(E, "Slow: loop all the way to N", "느림: N까지 전부 반복")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "A computer does ~10^8–10^9 steps per second. N = 10^15 steps would take weeks — and each Kitty number grows so fast it soon has trillions of digits. Impossible.",
                "컴퓨터는 초당 약 10^8–10^9 단계를 해요. N = 10^15 단계면 몇 주가 걸려요 — 게다가 Kitty 수는 너무 빨리 커져서 곧 자릿수가 조 단위예요. 불가능.")}
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
        "Insight 1: divisible-by-3 depends only on remainders. And a term's remainder = (sum of previous five remainders) mod 3. So drop the giant numbers entirely — keep only 0/1/2.",
        "통찰 1: 3의 배수 여부는 나머지에만 달렸어요. 그리고 한 항의 나머지 = (직전 다섯 나머지의 합) mod 3. 그러니 거대한 숫자는 통째로 버리고 0/1/2만 남겨요."),
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
        "Insight 2: the last five remainders form a 'window'. A window has only 3^5 = 243 possible patterns. With finitely many patterns, some window MUST repeat — and once a window repeats, everything after it repeats too. The sequence is eventually periodic.",
        "통찰 2: 마지막 다섯 나머지가 '창'을 이뤄요. 창의 경우의 수는 3^5 = 243개뿐. 경우의 수가 유한하니 어떤 창이 반드시 다시 나오고, 창이 반복되면 그 뒤도 전부 똑같이 반복돼요. 수열은 결국 주기적이에요."),
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
        "This is the pigeonhole idea: more steps than possible window-patterns means a pattern has to reappear.",
        "이건 비둘기집 원리예요: 가능한 창 패턴 수보다 단계가 많아지면, 어떤 패턴은 반드시 다시 나와요."),
      question: t(E,
        "Why is the remainder sequence guaranteed to repeat?",
        "나머지 수열이 반드시 반복되는 이유는?"),
      options: [
        t(E, "Only 243 window-patterns exist, so one must come back — then it loops forever.",
             "창 패턴이 243개뿐이라 하나가 반드시 다시 나오고, 그때부터 영원히 반복돼요."),
        t(E, "Because the Kitty numbers are always even.", "Kitty 수가 항상 짝수라서."),
        t(E, "Because N is at most 10^15.", "N이 최대 10^15이라서."),
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
        "Insight 3: counting becomes arithmetic. Count the zeros in ONE cycle (35 of them). Then full cycles = N ÷ 104, and add the zeros in the leftover partial cycle. No giant loop needed.",
        "통찰 3: 세기가 산수로 바뀌어요. 한 사이클 안의 0을 세요 (35개). 그다음 온전한 사이클 수 = N ÷ 104, 여기에 남는 조각 안의 0을 더해요. 거대한 루프가 필요 없어요."),
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
        "Suppose a cycle of length 10 has 4 zeros, and N = 25. That's 2 full cycles (20 terms) plus 5 leftover terms.",
        "길이 10짜리 사이클에 0이 4개 있고 N = 25라고 해봐요. 온전한 사이클 2개(20항)에 남는 5항이에요."),
      question: t(E,
        "Cycle length 10 with 4 zeros; N = 25; the first 5 terms of the cycle contain 2 zeros. Total count?",
        "사이클 길이 10, 0이 4개; N = 25; 사이클 앞 5항에 0이 2개. 총 개수는?"),
      options: [
        t(E, "2 × 4 + 2 = 10", "2 × 4 + 2 = 10"),
        t(E, "25", "25"),
        t(E, "4", "4"),
      ],
      correct: 0,
      explain: t(E,
        "full = 25 // 10 = 2, partial = 5. answer = 2 × 4 (full cycles) + 2 (zeros in the leftover 5) = 10.",
        "full = 25 // 10 = 2, partial = 5. answer = 2 × 4 (온전한 사이클) + 2 (남는 5항의 0) = 10."),
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
        "Phase 1: start from the five base remainders, and grow the list by (sum of last five) mod 3. Every value stays 0, 1, or 2.",
        "1단계: 다섯 개의 기저 나머지로 시작해서, (마지막 다섯의 합) mod 3으로 리스트를 늘려요. 모든 값이 0, 1, 2로만 유지돼요."),
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
      narr: t(E,
        "Phase 2: remember every 5-window we've seen with a dict. The first time a window comes back, we've found where the cycle starts and how long it is.",
        "2단계: 지금까지 본 5칸 창을 dict에 기억해요. 어떤 창이 처음으로 다시 나오는 순간, 사이클이 어디서 시작하고 길이가 얼마인지 알아내요."),
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
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, textAlign: "center", ...KA }}>
            {t(E, "For Kitty this stops fast: start = 1, period = 104.", "Kitty에서는 금방 멈춰요: start = 1, period = 104.")}
          </div>
        </div>),
    },

    // 3-3 quiz: how far does the search go
    {
      type: "quiz",
      narr: t(E,
        "There are only 243 possible windows, so a repeat is guaranteed within 243 steps — the search can never run away.",
        "가능한 창이 243개뿐이라, 243단계 안에 반복이 보장돼요 — 탐색이 폭주할 일이 없어요."),
      question: t(E,
        "At most how many windows must we check before one is guaranteed to repeat?",
        "하나가 반드시 반복되기 전까지, 최대 몇 개의 창을 확인해야 하나요?"),
      options: [
        t(E, "243 (= 3^5)", "243 (= 3^5)"),
        t(E, "10^15", "10^15"),
        t(E, "104", "104"),
      ],
      correct: 0,
      explain: t(E,
        "With 243 distinct windows, by the 244th window a repeat must have occurred. Kitty's actual period (104) is well under that bound.",
        "서로 다른 창이 243개이므로, 244번째 창에서는 반드시 반복이 일어나요. Kitty의 실제 주기(104)는 그 한계보다 훨씬 작아요."),
    },

    // 3-4 phase 3: count with arithmetic
    {
      type: "reveal",
      narr: t(E,
        "Phase 3: no big loop. Zeros in one cycle × number of whole cycles, plus zeros in the leftover. That gives the answer even for N = 10^15.",
        "3단계: 큰 루프 없이. 한 사이클의 0 × 온전한 사이클 수, 거기에 남는 조각의 0을 더해요. N = 10^15이어도 답이 나와요."),
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
        "The cost has nothing to do with N. We only walk one cycle (~104 terms) to set up, then do a little arithmetic. Constant-ish, regardless of how huge N is.",
        "비용은 N과 무관해요. 준비하려고 사이클 한 바퀴(~104항)만 걷고, 그다음은 약간의 산수뿐. N이 아무리 커도 거의 상수예요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ background: "#dbeafe", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2563eb" }}>{t(E, "Time", "시간")}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>O(period)</div>
              <div style={{ fontSize: 10, color: "#2563eb" }}>{t(E, "≈ 104, not N", "≈ 104, N 아님")}</div>
            </div>
            <div style={{ background: "#dcfce7", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a" }}>{t(E, "Space", "공간")}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#16a34a" }}>O(period)</div>
              <div style={{ fontSize: 10, color: "#16a34a" }}>{t(E, "one cycle of 0/1/2", "0/1/2 한 사이클")}</div>
            </div>
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
export const SOLUTION_CODE = [
  "def count_kitty_div3(N):",
  "    r = [11 % 3, 9 % 3, 20 % 3, 20 % 3, 25 % 3]  # remainders of Kitty_1..5",
  "    seen = {}",
  "    start = period = None",
  "    k = 1",
  "    while True:",
  "        while len(r) < k + 4:",
  "            r.append(sum(r[-5:]) % 3)",
  "        st = tuple(r[k-1:k+4])",
  "        if st in seen:",
  "            start = seen[st]; period = k - start; break",
  "        seen[st] = k; k += 1",
  "    needed = start - 1 + period",
  "    while len(r) < needed:",
  "        r.append(sum(r[-5:]) % 3)",
  "    tail = r[:start-1]",
  "    cycle = r[start-1:start-1+period]",
  "    if N <= start - 1:",
  "        return sum(1 for x in r[:N] if x == 0)",
  "    tail_zeros = sum(1 for x in tail if x == 0)",
  "    remaining = N - (start - 1)",
  "    full = remaining // period",
  "    partial = remaining % period",
  "    cycle_zeros = sum(1 for x in cycle if x == 0)",
  "    partial_zeros = sum(1 for x in cycle[:partial] if x == 0)",
  "    return tail_zeros + full * cycle_zeros + partial_zeros",
  "",
  "N = int(input())",
  "print(count_kitty_div3(N))",
];
