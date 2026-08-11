import { C, t } from "@/components/quest/theme";
import { getSumkWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { SumkSim } from "./sims";

const A = "#8b5cf6";

/* 샘플 입출력 — 시즌 표준 모양 (구체 숫자 INPUT/OUTPUT + 한 줄씩). */
function SumKSample({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`3 2
1 2 3`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`100`}
          </div>
        </div>
      </div>

      <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>3 2</code> — {t(E, "N = 3 numbers, K = 2 (the exponent)", "N = 3 (숫자 3개), K = 2 (거듭제곱 지수)")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 2 3</code> — {t(E, "the array A", "다음 줄 = 배열 A")}</div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #c4b5fd" }}>
          {t(E, "Output ", "출력 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>100</code>
          {t(E, " = the sum of (subset sum)^K over every non-empty subset, mod 998244353.",
               " = 모든 비어있지 않은 부분집합의 (합)^K 를 다 더한 값, mod 998244353.")}
        </div>
      </div>

      {/* 출력 의미 시각화: 7개 부분집합의 점수 */}
      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #c4b5fd", borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#5b21b6", marginBottom: 8, textAlign: "center", wordBreak: "keep-all" }}>
          {t(E, "Every non-empty subset scores (its sum)² — add them all:", "각 부분집합의 점수 = (합)² — 다 더해요:")}
        </div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {[["{1}", 1], ["{2}", 4], ["{3}", 9], ["{1,2}", 9], ["{1,3}", 16], ["{2,3}", 25], ["{1,2,3}", 36]].map(([lab, sc], i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 999,
              background: "#f5f3ff", border: "1px solid #c4b5fd", fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700 }}>
              <span style={{ color: "#5b21b6" }}>{lab}</span>
              <span style={{ color: "#94a3b8" }}>→</span>
              <span style={{ color: "#7c3aed" }}>{sc}</span>
            </span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#166534", textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>
          1+4+9+9+16+25+36 = 100 ✓
        </div>
      </div>

      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #c4b5fd", borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.6, wordBreak: "keep-all" }}>
        <b style={{ color: "#5b21b6" }}>{t(E, "Another test", "다른 테스트")}</b> {t(E, ": ", ": ")}<code style={{ background: "#f5f3ff", padding: "1px 5px", borderRadius: 3 }}>2 1 / 3 3</code>
        {t(E, " → subsets {3},{3},{3,3}: 3+3+6 = ", " → 부분집합 {3},{3},{3,3}: 3+3+6 = ")}<b style={{ color: "#15803d" }}>12</b>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
        {t(E, "📌 Constraints: N up to 10⁵ with small K, or N and K up to 200. Answer is taken mod 998244353.",
             "📌 제약: N 은 최대 10⁵ (K 작음), 또는 N·K 최대 200. 답은 998244353 로 나눈 나머지.")}
      </div>
    </div>
  );
}

/* 왜 DP? — 정리 카드. */
function SumKWhyDP({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#5b21b6", textAlign: "center", marginBottom: 6 }}>
        🤔 {t(E, "7 subsets was easy — but N up to 10⁵?", "7개는 쉬웠죠 — 근데 N 이 10⁵ 이면?")}
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto 14px", fontSize: 12.5, color: C.text, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
        {t(E, "There are ", "부분집합은 ")}<b style={{ color: "#dc2626" }}>2ᴺ</b>
        {t(E, " subsets — for N = 60 that's already more than all the atoms we could count. We can't list them one by one.",
             " 개예요 — N = 60 만 돼도 온 우주 원자보다 많아요. 하나씩 나열은 불가능.")}
      </div>

      <div style={{ maxWidth: 500, margin: "0 auto", display: "grid", gap: 10 }}>
        <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 10, padding: "11px 14px", fontSize: 12.5, color: "#5b21b6", lineHeight: 1.7, wordBreak: "keep-all" }}>
          <b>💡 {t(E, "The trick", "핵심 아이디어")}</b><br />
          {t(E, "Add the elements one at a time. Keep ", "원소를 하나씩 넣어요. 그리고 ")}
          <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 4 }}>P[t]</code>
          {t(E, " = the sum of (subset sum)ᵗ over all subsets so far, for every t = 0..K.",
               " = 지금까지 부분집합들의 (합)ᵗ 합 을 t = 0..K 마다 유지해요.")}
        </div>
        <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "11px 14px", fontSize: 12.5, color: "#1e3a8a", lineHeight: 1.7, wordBreak: "keep-all" }}>
          <b>➕ {t(E, "Adding element a", "새 원소 a 넣기")}</b><br />
          {t(E, "A subset either skips a (old P[t] stays) or includes a → its sum becomes (old sum + a). Expand ",
               "부분집합은 a 를 빼거나(옛 P[t] 그대로) 넣거나 → 합이 (옛합 + a) 가 돼요. ")}
          <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 4 }}>(old + a)ᵗ</code>
          {t(E, " with the binomial theorem to update all P[t] at once.",
               " 를 이항정리로 펼치면 모든 P[t] 를 한 번에 갱신할 수 있어요.")}
        </div>
        <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "11px 14px", fontSize: 12.5, color: "#065f46", lineHeight: 1.7, wordBreak: "keep-all", textAlign: "center" }}>
          🏁 {t(E, "The answer is ", "답은 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 4 }}>P[K]</code>
          {t(E, ". (For K ≥ 1 the empty subset scores 0ᴷ = 0, so it drops out on its own.)",
               ". (K ≥ 1 이면 공집합은 0ᴷ = 0 이라 저절로 빠져요.)")}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's read the code that does exactly this →", "이제 이걸 그대로 하는 코드를 봐요 →")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeSumKCh1 — 시즌 표준 (라벨 + 구체 샘플 + 시뮬 + 정리)
   문제(도입) → 샘플 입출력 → 작은 예로 직접 → 왜 DP?
   ═══════════════════════════════════════════════════════════════ */
export function makeSumKCh1(E) {
  return [
    // [기] 문제 (도입)
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "Given an array A of N integers and a number K, look at EVERY non-empty subset. Each subset scores (its sum) raised to the K-th power. Add up all those scores (mod 998244353).",
        "N 개 정수 배열 A 와 숫자 K 가 주어져요. 모든 비어있지 않은 부분집합을 봐요. 각 부분집합의 점수 = (원소 합)의 K 제곱. 그 점수들을 다 더해요 (mod 998244353)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"∑"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>{"Sum^K"}</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P6</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5, wordBreak: "keep-all" }}>
              {t(E,
                "Add up (subset sum)^K over ALL non-empty subsets of A, and print it modulo 998244353.",
                "A 의 모든 비어있지 않은 부분집합에 대해 (합)^K 을 더한 값을 998244353 로 나눈 나머지로 출력.")}
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
                  {t(E, "You're given an ", "주어지는 것: ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "array A of N integers", "정수 N 개짜리 배열 A")}</b>
                  {t(E, " and a number ", " 와 숫자 ")}
                  <b style={{ color: "#7c3aed" }}>K</b>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "한 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "subset", "부분집합")}</b>
                  {t(E, " picks any of the elements. Its ", " 은 원소를 골라 담은 것. 그 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "score", "점수")}</b>
                  {t(E, " = (sum of chosen elements)", " = (고른 원소들의 합)")}
                  <sup>K</sup>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Look at ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "every non-empty subset", "모든 비어있지 않은 부분집합")}</b>
                  {t(E, " — there are 2ᴺ − 1 of them.", " — 총 2ᴺ − 1 개.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "total of all scores", "모든 점수의 총합")}</b>
                  {t(E, ", taken modulo 998244353.", " 을 998244353 로 나눈 나머지로 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // [승] 샘플 입출력
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E, "A concrete example — one array, and the answer we must print.",
                 "구체적인 예 하나 — 배열 하나와, 우리가 출력할 답."),
      content: (<SumKSample E={E} />),
    },

    // [전] 작은 예로 직접 — 7개 부분집합 시뮬
    {
      type: "reveal",
      label: t(E, "Try a small case", "작은 예로 직접"),
      narr: t(E, "Let's actually count it for [1, 2, 3], K = 2: enumerate all 7 subsets and add each (sum)².",
                 "[1, 2, 3], K = 2 로 직접 세어봐요: 7개 부분집합을 다 나열해 각 (합)² 을 더해요."),
      content: (<SumkSim E={E} />),
    },

    // [결] 왜 DP?
    {
      type: "reveal",
      label: t(E, "Why DP?", "왜 DP?"),
      narr: t(E, "Listing 2ᴺ subsets is impossible for big N. Here's the idea that avoids it entirely.",
                 "N 이 크면 2ᴺ 개 나열은 불가능해요. 그걸 아예 피하는 아이디어예요."),
      content: (<SumKWhyDP E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeSumKCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeSumKCh2(E, lang = "py") {
  const w = getSumkWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: read input, build binomials, keep P[t], update per element with the binomial theorem, print P[K].",
        "코드를 위에서 아래로 읽어봐요 — 말풍선이 설명하는 줄에 붙어 있어요: 입력 읽기 → 이항계수 → P[t] 유지 → 원소마다 이항정리로 갱신 → P[K] 출력."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#8b5cf6" />
      ),
    },
  ];
}
