import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc21CarrotsSections } from "./components";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* ─────────────────────────────────────────────────────────────
   Concept sim: split baskets into ODD and EVEN piles.
   Teaches: a sum of 3 numbers is ODD in exactly two recipes —
     🟠🟠🟠  three odds
     🟠⚪⚪  one odd + two evens
   So we never pick triples; we just count odds and evens and
   check whether either recipe can be built.
   ───────────────────────────────────────────────────────────── */
const PRESETS = [
  { label: "① 3 5 2", vals: [3, 5, 2] },
  { label: "② 4 6 2 3", vals: [4, 6, 2, 3] },
  { label: "③ 4 8 10 5 2", vals: [4, 8, 10, 5, 2] },
];

function OddEvenPileSim({ E }) {
  const [vals, setVals] = useState([3, 5, 2]);

  const oddIdx = vals.map((v, i) => (v % 2 === 1 ? i : -1)).filter((i) => i >= 0);
  const evenIdx = vals.map((v, i) => (v % 2 === 0 ? i : -1)).filter((i) => i >= 0);
  const oddN = oddIdx.length;
  const evenN = evenIdx.length;

  const recipeA = oddN >= 3;                    // 🟠🟠🟠
  const recipeB = oddN >= 1 && evenN >= 2;       // 🟠⚪⚪
  const verdict = recipeA || recipeB;

  // click a basket → +1 carrot, flipping its parity so the piles move
  const bump = (i) => setVals((prev) => prev.map((v, j) => (j === i ? v + 1 : v)));

  const basketChip = (v, i, odd) => (
    <button
      key={i}
      onClick={() => bump(i)}
      title={t(E, "click: +1 carrot", "클릭: 당근 +1")}
      style={{
        ...NW, cursor: "pointer",
        display: "inline-flex", flexDirection: "column", alignItems: "center",
        width: 52, padding: "6px 4px", borderRadius: 8,
        border: `2px solid ${odd ? "#059669" : "#94a3b8"}`,
        background: odd ? "#d1fae5" : "#f1f5f9",
      }}>
      <span style={{ fontSize: 16 }}>🥕</span>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800, color: odd ? "#065f46" : "#475569" }}>{v}</span>
      <span style={{ fontSize: 9.5, fontWeight: 700, color: odd ? "#059669" : "#64748b" }}>{odd ? (E ? "odd" : "홀") : (E ? "even" : "짝")}</span>
    </button>
  );

  const recipeRow = (chips, on, label) => (
    <div style={{
      ...KA, display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
      borderRadius: 10, marginBottom: 8,
      border: `1.5px solid ${on ? "#059669" : "#e2e8f0"}`,
      background: on ? "#ecfdf5" : "#f8fafc", opacity: on ? 1 : 0.65,
    }}>
      <span style={{ fontSize: 18, ...NW }}>{chips}</span>
      <span style={{ fontSize: 12, color: on ? "#065f46" : C.dim, fontWeight: 600, flex: 1 }}>{label}</span>
      <span style={{ ...NW, fontSize: 12, fontWeight: 800, color: on ? "#059669" : "#94a3b8" }}>
        {on ? (E ? "✓ can build" : "✓ 만들 수 있어요") : (E ? "✗ not enough" : "✗ 부족")}
      </span>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
          🟠⚪ {t(E, "Split into ODD and EVEN piles", "홀수·짝수 더미로 나누기")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "A sum of 3 numbers is ODD in only two recipes: three odds, or one odd + two evens. So forget picking triples — just count odds and evens.",
            "세 수의 합이 홀수가 되는 방법은 딱 두 가지뿐이에요: 홀수 3개, 또는 홀수 1개 + 짝수 2개. 그러니 조합을 고르지 말고 홀수·짝수 개수만 세면 돼요.")}
        </div>

        {/* preset picker */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 11.5, color: "#065f46", fontWeight: 700 }}>{t(E, "example:", "예제:")}</span>
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setVals([...p.vals])} style={{
              ...NW, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700,
              cursor: "pointer", padding: "3px 8px", borderRadius: 6,
              border: "1px solid #a7f3d0", background: "#fff", color: "#065f46",
            }}>{p.label}</button>
          ))}
        </div>

        {/* the two piles */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <div style={{ flex: 1, minWidth: 150, border: "1.5px solid #6ee7b7", borderRadius: 10, padding: 10, background: "#f0fdf4" }}>
            <div style={{ ...NW, fontSize: 11.5, fontWeight: 800, color: "#059669", marginBottom: 6 }}>
              🟠 {t(E, "ODD pile", "홀수 더미")} · {oddN}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", minHeight: 62 }}>
              {oddIdx.length ? oddIdx.map((i) => basketChip(vals[i], i, true)) : <span style={{ fontSize: 11.5, color: C.dim }}>{t(E, "(empty)", "(비었어요)")}</span>}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 150, border: "1.5px solid #cbd5e1", borderRadius: 10, padding: 10, background: "#f8fafc" }}>
            <div style={{ ...NW, fontSize: 11.5, fontWeight: 800, color: "#475569", marginBottom: 6 }}>
              ⚪ {t(E, "EVEN pile", "짝수 더미")} · {evenN}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", minHeight: 62 }}>
              {evenIdx.length ? evenIdx.map((i) => basketChip(vals[i], i, false)) : <span style={{ fontSize: 11.5, color: C.dim }}>{t(E, "(empty)", "(비었어요)")}</span>}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 10.5, color: C.dim, marginBottom: 12, ...KA }}>
          {t(E, "Tip: click any basket to add 1 carrot and watch it hop piles.", "팁: 바구니를 누르면 당근이 1개 늘어 더미를 옮겨 다녀요.")}
        </div>

        {/* the two winning recipes */}
        {recipeRow("🟠🟠🟠", recipeA, t(E, "three odds  (odd+odd+odd = odd)", "홀수 3개  (홀+홀+홀 = 홀)"))}
        {recipeRow("🟠⚪⚪", recipeB, t(E, "one odd + two evens  (odd+even+even = odd)", "홀수 1개 + 짝수 2개  (홀+짝+짝 = 홀)"))}

        {/* verdict */}
        <div style={{
          marginTop: 4, background: "#0f172a", color: "#f8fafc", padding: "10px 14px", borderRadius: 8,
          fontSize: 13.5, fontWeight: 800, textAlign: "center", ...KA,
        }}>
          {t(E, "verdict: ", "결과: ")}
          <span style={{ color: verdict ? "#34d399" : "#fb7185" }}>{verdict ? "YES" : "NO"}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginLeft: 8 }}>
            {verdict
              ? t(E, "(a recipe fits)", "(레시피 하나가 맞아요)")
              : t(E, "(neither recipe fits)", "(두 레시피 다 안 맞아요)")}
          </span>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            "Only the counts matter, never the exact baskets — so one scan to count odds and evens answers each test case.",
            "정확히 어떤 바구니인지는 중요하지 않고, 홀수·짝수 개수만 중요해요 — 그래서 한 번 훑어 개수만 세면 각 테스트를 답할 수 있어요.")}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE  (fast: count odds & evens, check two recipes)
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "data = sys.stdin.buffer.read().split()",
  "idx = 0",
  "T = int(data[idx]); idx += 1",
  "out = []",
  "for _ in range(T):",
  "    N = int(data[idx]); idx += 1",
  "    odd = even = 0",
  "    for _ in range(N):",
  "        if int(data[idx]) % 2 == 1:",
  "            odd += 1",
  "        else:",
  "            even += 1",
  "        idx += 1",
  "    # odd sum of 3 = (3 odds) or (1 odd + 2 evens)",
  "    if odd >= 3 or (odd >= 1 and even >= 2):",
  "        out.append('YES')",
  "    else:",
  "        out.append('NO')",
  "print('\\n'.join(out))",
];

export function makeMcc21CarrotsCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Kenneth the rabbit has N baskets, basket i holding C[i] carrots. Can he pick 3 baskets whose carrot total is ODD?\nFor each of T test cases, print YES or NO.",
        "토끼 케네스에게 N 개의 바구니가 있고, i 번 바구니엔 C[i] 개의 당근이 있어요. 합이 홀수가 되는 바구니 3 개를 고를 수 있을까요?\nT 개의 테스트마다 YES 또는 NO 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🥕"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#059669" }}>Carrots</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P1</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "For each test case, decide whether SOME 3 baskets can sum to an odd total. Print YES or NO.",
                "각 테스트마다 어떤 바구니 3 개의 합이 홀수가 될 수 있는지 판단해요. YES 또는 NO 를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Kenneth has ", "케네스에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N baskets", "N 개의 바구니")}</b>
                  {t(E, "; basket i holds ", "가 있고, i 번 바구니엔 ")}
                  <b style={{ color: "#059669" }}>C[i]</b>
                  {t(E, " carrots.", " 개의 당근이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "He wants to pick ", "그는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "any 3 baskets whose total is ODD", "합이 홀수인 아무 바구니 3 개")}</b>
                  {t(E, ". Is that possible?", "를 고르고 싶어요. 가능할까요?")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "테스트는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "T test cases", "T 개")}</b>
                  {t(E, " to answer.", " 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each test case, print ", "각 테스트마다 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "YES or NO", "YES 또는 NO")}</b>
                  {t(E, " on its own line.", "를 한 줄씩 출력해요.")}
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
        "Read the input format and the official example. The first line is T; then each test case is a line with N followed by a line of N carrot counts.",
        "입력 형식과 공식 예제를 봐요. 첫 줄은 T, 그다음 각 테스트는 N 한 줄과 당근 N 개가 담긴 한 줄로 이루어져요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>T</b> — {t(E, "number of test cases", "테스트 케이스 개수")}</div>
              <div>• {t(E, "for each test case: a line with ", "각 테스트마다: ")}<b>N</b>{t(E, ", then a line of N carrot counts C[i]", " 한 줄, 그다음 당근 N 개 C[i] 한 줄")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ T ≤ 200, 3 ≤ N ≤ 100000, 1 ≤ C[i] ≤ 10^9.", "제약: 1 ≤ T ≤ 200, 3 ≤ N ≤ 100000, 1 ≤ C[i] ≤ 10^9.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>3</div>
              <div>3</div>
              <div>3 5 2</div>
              <div>4</div>
              <div>4 6 2 3</div>
              <div>5</div>
              <div>4 8 10 5 2</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>NO</div>
              <div style={{ fontWeight: 800 }}>YES</div>
              <div style={{ fontWeight: 800 }}>YES</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "Test 1 has only [3, 5, 2] — the sole triple sums to 10, even → NO. Test 2: 4+6+3 = 13 is odd → YES. Test 3: 8+5+2 = 15 is odd → YES.",
              "테스트 1 은 [3, 5, 2] 뿐 — 유일한 조합의 합이 10 으로 짝수 → NO. 테스트 2: 4+6+3 = 13 은 홀수 → YES. 테스트 3: 8+5+2 = 15 는 홀수 → YES.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the idea. Split the baskets into an ODD pile and an EVEN pile, and watch which winning recipe can be built.",
        "아이디어를 직접 느껴봐요. 바구니를 홀수 더미와 짝수 더미로 나누고, 어떤 레시피를 만들 수 있는지 봐요."),
      content: <OddEvenPileSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "odd+odd = even, and even+odd = odd. Build the parity up one step at a time and each combo's total parity is fixed.",
        "홀+홀 = 짝, 짝+홀 = 홀. 한 단계씩 홀짝을 쌓아 보면 각 조합의 합의 홀짝이 정해져요."),
      question: t(E,
        "A sum of 3 numbers is ODD in exactly two cases. Which mix is NOT one of them?",
        "세 수의 합이 홀수가 되는 경우는 딱 두 가지예요. 다음 중 그 두 가지가 아닌 것은?"),
      options: [
        t(E, "three odds", "홀수 3개"),
        t(E, "one odd + two evens", "홀수 1개 + 짝수 2개"),
        t(E, "two odds + one even", "홀수 2개 + 짝수 1개"),
      ],
      correct: 2,
      explain: t(E,
        "two odds + one even = odd+odd+even = even+even = EVEN, so it can't make an odd sum. The two odd-sum recipes are three odds and one odd + two evens.",
        "홀수 2개 + 짝수 1개 = 홀+홀+짝 = 짝+짝 = 짝수예요. 그래서 홀수 합을 못 만들어요. 홀수 합 레시피는 '홀수 3개' 와 '홀수 1개 + 짝수 2개' 두 가지뿐이에요."),
    },
  ];
}

export function makeMcc21CarrotsCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The slow way tries every triple of baskets: about C(N,3) ≈ N³/6 checks — with N up to 100000 that is astronomically slow. The fast way uses parity: count odds and evens once, then check the two recipes.",
        "느린 방법은 바구니 3 개 조합을 모두 시도해요: 약 C(N,3) ≈ N³/6 번 — N 이 최대 100000 이면 천문학적으로 느려요. 빠른 방법은 홀짝을 써요: 홀수·짝수를 한 번만 세고 두 레시피만 확인해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every triple of baskets", "느림: 바구니 3 개 조합을 모두 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "C(N,3) ≈ N³/6 triples. With N = 100000 that is ~10^14 — times out badly.", "C(N,3) ≈ N³/6 개 조합. N = 100000 이면 약 10^14 — 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: count odds & evens, check two recipes", "빠름: 홀수·짝수 세고 두 레시피 확인")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "One pass counts odd and even. YES if (odd ≥ 3) or (odd ≥ 1 and even ≥ 2). Just O(N) per test.", "한 번 훑어 홀수·짝수를 세요. (홀수 ≥ 3) 또는 (홀수 ≥ 1 이고 짝수 ≥ 2) 이면 YES. 테스트당 O(N).")}
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
      sections: getMcc21CarrotsSections(E),
    },
  ];
}
