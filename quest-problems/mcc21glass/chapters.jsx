import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc21GlassSections } from "./components";

const KA = { wordBreak: "keep-all" };
const A = "#2563eb";
const BLACK = "#1f2937";
const CLEAR = "#f1f5f9";

// Reference solution (Python) — kept exported for consistency with other quests.
export const SOLUTION_CODE = [
  "import sys, math",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0])",
  "A = int(data[1])",
  "R = list(map(int, data[2:2 + (N - 1)]))",
  "",
  "b = sorted(R, reverse=True)   # known radii, largest first",
  "m = N - 1",
  "",
  "# prefix[i] = b1^2 - b2^2 + b3^2 - ...  (alternating)",
  "prefix = [0] * (m + 1)",
  "for i in range(1, m + 1):",
  "    sign = 1 if i % 2 == 1 else -1",
  "    prefix[i] = prefix[i - 1] + sign * b[i - 1] ** 2",
  "S = prefix[m]",
  "",
  "for p in range(1, N + 1):        # try each slot for the missing radius",
  "    pre = prefix[p - 1]",
  "    x2 = (A + S - 2 * pre) if p % 2 == 1 else (2 * pre - A - S)",
  "    if x2 < 0:",
  "        continue",
  "    x = math.isqrt(x2)",
  "    if x * x != x2 or x <= 0:",
  "        continue",
  "    upper = b[p - 2] if p - 1 >= 1 else None",
  "    lower = b[p - 1] if p - 1 < m else 0",
  "    if upper is not None and x > upper:",
  "        continue",
  "    if x < lower:",
  "        continue",
  "    print(x)",
  "    break",
];

/* ─────────────────────────────────────────────────────────────
   Concept sim 1 (Ch1): the stacked plates.
   Nested circles (largest at bottom → smallest on top). A ring is
   BLACK when an ODD number of plates cover it, colorless when EVEN.
   From the outside in the rings alternate black / colorless, so the
   total black area telescopes to r1² − r2² + r3² − r4² + … (×π).
   ───────────────────────────────────────────────────────────── */
function GlassStackSim({ E }) {
  const ALL = [4, 3, 2, 1];          // demo radii, largest first
  const [n, setN] = useState(4);
  const radii = ALL.slice(0, n);
  const size = 200, cx = size / 2, cy = size / 2, scale = 78 / ALL[0];

  let sum = 0;
  const terms = radii.map((r, i) => {
    const sign = i % 2 === 0 ? 1 : -1;   // +,−,+,− … from the outside in
    sum += sign * r * r;
    return { r, sign, black: sign === 1 };
  });

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
          🥛 {t(E, "Stack the plates and watch the black area", "유리판을 쌓으며 검은 넓이를 봐요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "All plates share the same center; the biggest sits at the bottom. A spot is BLACK when an ODD number of plates cover it, colorless when EVEN. So the rings flip black / colorless from the outside in.",
            "모든 유리판은 중심이 같고, 제일 큰 판이 맨 아래예요. 한 지점을 덮는 판이 홀수 개면 검은색, 짝수 개면 무색이에요. 그래서 바깥부터 안으로 고리가 검정 / 무색으로 번갈아 바뀌어요.")}
        </div>

        {/* plate-count selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10 }}>
          {[1, 2, 3, 4].map((v) => (
            <button key={v} onClick={() => setN(v)} style={{
              padding: "4px 12px", borderRadius: 6,
              background: n === v ? A : "#fff", color: n === v ? "#fff" : A,
              border: `1.5px solid ${A}`, fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}>{v} {t(E, "plates", "판")}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 14, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          {/* the picture */}
          <svg width={size} height={size} style={{ display: "block", flexShrink: 0 }}>
            <rect x="0" y="0" width={size} height={size} rx="12" fill="#fff" stroke="#dbeafe" />
            {radii.map((r, i) => (
              <circle key={i} cx={cx} cy={cy} r={scale * r}
                fill={i % 2 === 0 ? BLACK : CLEAR}
                stroke="#94a3b8" strokeWidth="1" />
            ))}
            {/* radius labels down the right */}
            {radii.map((r, i) => (
              <text key={"L" + i} x={cx + scale * r - 2} y={cy - 3} textAnchor="end"
                style={{ fontSize: 9, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                  fill: i % 2 === 0 ? "#e2e8f0" : "#334155" }}>
                {r}
              </text>
            ))}
          </svg>

          {/* the alternating sum */}
          <div style={{ minWidth: 150 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", marginBottom: 6 }}>
              {t(E, "black area (in π):", "검은 넓이 (π 단위):")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 3,
              fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800, marginBottom: 8 }}>
              {terms.map((tm, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                  {i > 0 && <span style={{ color: tm.sign === 1 ? "#16a34a" : "#dc2626" }}>{tm.sign === 1 ? "+" : "−"}</span>}
                  <span style={{ color: tm.black ? BLACK : "#94a3b8" }}>{tm.r}²</span>
                </span>
              ))}
            </div>
            <div style={{ background: "#0f172a", color: "#f8fafc", padding: "8px 12px", borderRadius: 8,
              fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800, textAlign: "center" }}>
              = <span style={{ color: "#6ee7b7" }}>{sum}</span> π
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, lineHeight: 1.5, ...KA }}>
              {t(E,
                "Each black ring is (outer² − inner²)π. The colorless rings cancel the middle terms, so only the plain alternating sum survives.",
                "검은 고리 하나는 (바깥² − 안²)π 예요. 무색 고리가 가운데 항을 지워서, 결국 번갈아 더하고 빼는 합만 남아요.")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Concept sim 2 (Ch2): find the missing radius.
   Known radii are fixed; the student sets x. The full multiset is
   sorted descending, the alternating sum is shown live, and it lights
   up green when the sum hits the target A.
   ───────────────────────────────────────────────────────────── */
function MissingRadiusSim({ E }) {
  const known = [4, 2, 1];      // sample 1: R = [1,4,2]
  const target = 10;            // A = 10  → answer x = 3
  const [x, setX] = useState(2);

  const items = known.map((r) => ({ r, isX: false }))
    .concat([{ r: x, isX: true }])
    .sort((a, b) => b.r - a.r);
  let sum = 0;
  items.forEach((it, i) => { it.sign = i % 2 === 0 ? 1 : -1; sum += it.sign * it.r * it.r; });
  const ok = sum === target && x > 0;

  const chip = (it, i) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {i > 0 && <span style={{ color: it.sign === 1 ? "#16a34a" : "#dc2626", fontWeight: 800 }}>{it.sign === 1 ? "+" : "−"}</span>}
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        minWidth: 34, height: 34, borderRadius: 8, fontFamily: "'JetBrains Mono',monospace",
        fontSize: 14, fontWeight: 800, padding: "0 6px",
        border: it.isX ? `2px solid ${A}` : "1.5px solid #cbd5e1",
        background: it.isX ? "#dbeafe" : "#fff", color: it.isX ? "#1e3a8a" : "#334155",
      }}>{it.r}²</span>
    </span>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
          🔧 {t(E, "One plate is broken — find its radius", "판 하나가 깨졌어요 — 그 반지름을 찾아요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "We know three radii: 4, 2, 1. The black area must be 10π. Slide the broken plate's radius x — the whole set is re-sorted (largest first) and the alternating sum updates. Make it equal 10.",
            "우리가 아는 반지름은 4, 2, 1 이에요. 검은 넓이는 10π 여야 해요. 깨진 판의 반지름 x 를 바꾸면 전체가 다시 정렬(큰 것부터)되고 번갈아 합이 갱신돼요. 10 이 되게 만들어봐요.")}
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: "#1e3a8a", fontWeight: 700 }}>x =</span>
          <button onClick={() => setX(Math.max(1, x - 1))} style={pmBtn}>−</button>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 800, color: A, minWidth: 22, textAlign: "center" }}>{x}</span>
          <button onClick={() => setX(Math.min(6, x + 1))} style={pmBtn}>+</button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
          {items.map((it, i) => chip(it, i))}
        </div>

        <div style={{
          padding: "10px 12px", borderRadius: 8, textAlign: "center",
          fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800,
          background: ok ? "#dcfce7" : "#fff7ed",
          border: `1.5px solid ${ok ? "#16a34a" : "#fdba74"}`,
          color: ok ? "#166534" : "#9a3412",
        }}>
          {t(E, "black area = ", "검은 넓이 = ")}<span>{sum}</span>π {ok ? "= 10π ✅" : `(≠ ${target}π)`}
        </div>
        {ok && (
          <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: "#16a34a", textAlign: "center", ...KA }}>
            {t(E, "x = 3 works! Radii 4,3,2,1 → 16−9+4−1 = 10.", "x = 3 이 정답! 반지름 4,3,2,1 → 16−9+4−1 = 10.")}
          </div>
        )}
      </div>
    </div>
  );
}
const pmBtn = {
  width: 30, height: 30, borderRadius: 8, border: `1.5px solid ${A}`, background: "#fff",
  color: A, fontSize: 18, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc21GlassCh1(E) {
  return [
    // 1-1 title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "A dragon stacks N glass plates by their center, biggest at the bottom. A spot turns black only when an ODD number of plates cover it. One plate broke — find its radius.",
        "용이 유리판 N 개를 중심을 맞춰 큰 것부터 아래로 쌓아요. 한 지점은 그 위를 덮는 판이 홀수 개일 때만 검게 보여요. 판 하나가 깨졌어요 — 그 반지름을 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🥛</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: A }}>Round Glass</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P4</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#eff6ff", border: `1.5px solid ${A}`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Given the N−1 known radii and the black area A·π, output any valid integer radius for the broken plate.",
                "아는 반지름 N−1 개와 검은 넓이 A·π 가 주어지면, 깨진 판의 유효한 정수 반지름 하나를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "N glass plates share one center, stacked ", "유리판 N 개가 중심을 공유하며 ")}
                  <b style={{ color: A }}>{t(E, "biggest radius at the bottom", "큰 반지름이 아래")}</b>
                  {t(E, ", smallest on top.", ", 작은 반지름이 위로 쌓여요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A region is ", "한 영역은 ")}
                  <b style={{ color: BLACK }}>{t(E, "black if an ODD", "홀수 개가 덮으면 검정")}</b>
                  {t(E, " number of plates cover it, ", ", ")}
                  <b style={{ color: "#64748b" }}>{t(E, "colorless if EVEN", "짝수 개면 무색")}</b>
                  {t(E, ".", " 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One plate broke; its radius is unknown. The total black area is ", "판 하나가 깨져 반지름을 몰라요. 전체 검은 넓이는 ")}
                  <b style={{ color: A }}>A·π</b>
                  {t(E, ". All radii are positive integers.", " 이고, 모든 반지름은 양의 정수예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Output ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "any valid radius for the broken plate", "깨진 판의 유효한 반지름 하나")}</b>
                  {t(E, " (at least one is guaranteed).", "를 출력해요 (하나 이상 존재함이 보장돼요).")}
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
        "Read N and A, then the N−1 known radii. Study the official sample: with 4,2,1 known and A=10, the broken radius is 3.",
        "N 과 A 를 읽고, 이어서 아는 반지름 N−1 개를 읽어요. 공식 예제를 봐요: 아는 값 4,2,1 과 A=10 이면 깨진 반지름은 3 이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0f9ff", border: "1px solid #7dd3fc", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#075985", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>N</b> — {t(E, "total number of plates", "판의 전체 개수")}</div>
              <div>• <b>A</b> — {t(E, "black area is A·π (read A, not the area)", "검은 넓이는 A·π (넓이가 아니라 A 를 읽어요)")}</div>
              <div>• <b>R</b> — {t(E, "the N−1 known radii", "아는 반지름 N−1 개")}</div>
            </div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: N ≤ 5·10⁴, A ≤ 10¹⁸, Rᵢ ≤ 10⁹ → squares overflow 32-bit; use big integers.",
                   "제약: N ≤ 5·10⁴, A ≤ 10¹⁸, Rᵢ ≤ 10⁹ → 제곱이 32비트를 넘어요; 큰 정수를 써요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>N = 4</div>
              <div>A = 10</div>
              <div>R = [1, 4, 2]</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>3</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "With the broken radius 3, all four radii sorted are 4,3,2,1. Black area = (4²−3²+2²−1²)π = 10π. ✅",
              "깨진 반지름이 3 이면 네 반지름은 4,3,2,1 로 정렬돼요. 검은 넓이 = (4²−3²+2²−1²)π = 10π. ✅")}
          </div>
        </div>),
    },

    // 1-3 concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the stack. Add plates one at a time and watch which rings turn black — and how the black area becomes an alternating sum of squares.",
        "쌓기를 직접 느껴봐요. 판을 하나씩 더하며 어느 고리가 검게 되는지, 그리고 검은 넓이가 어떻게 '번갈아 더하고 빼는 제곱의 합'이 되는지 봐요."),
      content: <GlassStackSim E={E} />,
    },

    // 1-4 understanding quiz
    {
      type: "quiz",
      narr: t(E,
        "A point covered by an ODD number of plates is black. The outermost ring is covered by just 1 plate → odd → black.",
        "홀수 개의 판이 덮는 지점은 검정이에요. 가장 바깥 고리는 판 1 개만 덮으니 → 홀수 → 검정."),
      question: t(E,
        "Radii sorted 5,3,2. The ring between 3 and 2 is covered by how many plates, and is it black?",
        "반지름 정렬 5,3,2. 3 과 2 사이 고리는 몇 개의 판이 덮고, 검은색인가요?"),
      options: [
        t(E, "2 plates → even → colorless", "2 개 → 짝수 → 무색"),
        t(E, "1 plate → odd → black", "1 개 → 홀수 → 검정"),
        t(E, "3 plates → odd → black", "3 개 → 홀수 → 검정"),
      ],
      correct: 0,
      explain: t(E,
        "That ring lies inside radius 5 and radius 3, but outside radius 2 → covered by 2 plates → even → colorless.",
        "그 고리는 반지름 5 와 3 안쪽, 2 바깥쪽이에요 → 2 개가 덮음 → 짝수 → 무색."),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 📋 핵심 아이디어 (alternating sum → missing radius)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc21GlassCh2(E) {
  return [
    // 2-1 the alternating sum, telescoped
    {
      type: "reveal",
      narr: t(E,
        "Sort every radius largest first. Each black ring is (outer² − inner²)π, and because black / colorless alternate, the middle terms cancel — the black area is just r1² − r2² + r3² − r4² + … (×π).",
        "모든 반지름을 큰 것부터 정렬해요. 검은 고리 하나는 (바깥² − 안²)π 이고, 검정 / 무색이 번갈아 나오니 가운데 항이 서로 지워져요 — 검은 넓이는 그냥 r1² − r2² + r3² − r4² + … (×π) 예요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: C.dim, marginBottom: 8 }}>
              {t(E, "radii sorted largest → smallest", "반지름을 큰 것부터 작은 것까지 정렬")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 800, letterSpacing: 1, marginBottom: 12 }}>
              <span style={{ color: "#16a34a" }}>+r₁²</span>{" "}
              <span style={{ color: "#dc2626" }}>−r₂²</span>{" "}
              <span style={{ color: "#16a34a" }}>+r₃²</span>{" "}
              <span style={{ color: "#dc2626" }}>−r₄²</span>{" "}
              <span style={{ color: C.dim }}>…</span>
            </div>
            <div style={{ display: "inline-block", background: "#0f172a", color: "#f8fafc", padding: "8px 16px", borderRadius: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800 }}>
              {t(E, "black area = (that sum) × π", "검은 넓이 = (그 합) × π")}
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 12.5, color: C.text, lineHeight: 1.6 }}>
            {t(E,
              "Why the signs? The outermost ring is covered by 1 plate (black, +). The next by 2 (colorless, skipped). The next by 3 (black, +)… Adding each black ring's (outer²−inner²) and lining them up gives the plain alternating pattern above.",
              "왜 부호가 그럴까요? 가장 바깥 고리는 판 1 개가 덮어요 (검정, +). 다음은 2 개 (무색, 건너뜀). 다음은 3 개 (검정, +)… 검은 고리마다 (바깥²−안²) 을 더해 나란히 쓰면 위의 번갈아 패턴이 그대로 나와요.")}
          </div>
        </div>),
    },

    // 2-2 missing-radius interactive
    {
      type: "reveal",
      narr: t(E,
        "Now the twist: one radius is missing. Choose x so that, once everything is re-sorted, the alternating sum lands exactly on A.",
        "이제 반전: 반지름 하나가 비어 있어요. 모두 다시 정렬했을 때 번갈아 합이 정확히 A 가 되도록 x 를 골라봐요."),
      content: <MissingRadiusSim E={E} />,
    },

    // 2-3 the closed-form idea
    {
      type: "reveal",
      narr: t(E,
        "We can't guess x forever (it may be up to 10⁹). Instead: the missing radius slots into ONE position p in the sorted order. Fix p, and the equation 'alternating sum = A' has a single unknown x², which we solve directly.",
        "x 를 무한정 추측할 순 없어요 (최대 10⁹). 대신: 깨진 반지름은 정렬된 순서에서 어떤 위치 p 하나에 들어가요. p 를 정하면 '번갈아 합 = A' 는 미지수가 x² 하나뿐인 식이라 바로 풀려요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
                1️⃣ {t(E, "Split the known radii by position p", "위치 p 로 아는 반지름을 나눠요")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "The p−1 larger known radii keep their signs (a prefix sum). The ones below x all sit one slot later, so every one of their signs flips.",
                  "x 보다 큰 아는 반지름 p−1 개는 부호를 유지해요 (앞부분 합). x 아래에 있는 것들은 한 칸씩 밀려서 부호가 모두 뒤집혀요.")}
              </div>
            </div>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
                2️⃣ {t(E, "Solve for x² in O(1)", "x² 를 O(1) 로 풀어요")}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
                {t(E, "p odd  → x² = A + S − 2·pre", "p 홀수  → x² = A + S − 2·pre")}<br/>
                {t(E, "p even → x² = 2·pre − A − S", "p 짝수 → x² = 2·pre − A − S")}
              </div>
              <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6, lineHeight: 1.5 }}>
                {t(E, "S = full alternating sum of known radii, pre = prefix up to p−1.",
                     "S = 아는 반지름의 전체 번갈아 합, pre = p−1 까지의 앞부분 합.")}
              </div>
            </div>
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#166534", marginBottom: 4 }}>
                3️⃣ {t(E, "Accept x only if it's a real radius", "진짜 반지름일 때만 x 를 받아요")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "x² ≥ 0, x must be a perfect square's root (integer), positive, and fit between its neighbors at slot p. First p that passes → answer.",
                  "x² ≥ 0, x 는 완전제곱근(정수)이고 양수여야 하며, 슬롯 p 의 이웃들 사이에 들어맞아야 해요. 통과하는 첫 p → 정답.")}
              </div>
            </div>
          </div>
        </div>),
    },

    // 2-4 quiz on the perfect-square check
    {
      type: "quiz",
      narr: t(E,
        "For a chosen position the formula might give x² = 20. Since 20 is not a perfect square, no integer radius fits there — we move to the next position.",
        "어떤 위치에서 식이 x² = 20 을 줄 수 있어요. 20 은 완전제곱수가 아니라 그 자리에 맞는 정수 반지름이 없어요 — 다음 위치로 넘어가요."),
      question: t(E,
        "A position gives x² = 49. What do we do?",
        "어떤 위치에서 x² = 49 가 나왔어요. 어떻게 하나요?"),
      options: [
        t(E, "x = 7 (perfect square) — check it fits between neighbors, then accept", "x = 7 (완전제곱) — 이웃 사이에 맞는지 확인 후 채택"),
        t(E, "Reject: 49 is too big", "거부: 49 는 너무 커요"),
        t(E, "x = 49", "x = 49"),
      ],
      correct: 0,
      explain: t(E,
        "√49 = 7 is an integer, so x = 7 is a candidate. If it also lies between its neighbors in the sorted order, it's a valid answer.",
        "√49 = 7 은 정수라 x = 7 이 후보예요. 정렬 순서에서 이웃 사이에도 들어가면 유효한 정답이에요."),
    },

    // 2-5 practice input (sample 2)
    {
      type: "input",
      narr: t(E,
        "Sample 2: known radii 2,3,6 with A = 16. Sorted with the answer they become 6,5,3,2 → 36−25+9−4 = 16. What is the broken radius?",
        "예제 2: 아는 반지름 2,3,6 과 A = 16. 정답과 함께 정렬하면 6,5,3,2 → 36−25+9−4 = 16. 깨진 반지름은?"),
      question: t(E, "Broken radius for R=[2,3,6], A=16 = ?", "R=[2,3,6], A=16 일 때 깨진 반지름 = ?"),
      answer: 5,
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc21GlassCh3(E, lang = "py") {
  return [
    // 3-1 slow vs fast plan
    {
      type: "reveal",
      narr: t(E,
        "The slow way tries every possible x (up to 10⁹) and re-checks — far too slow. The fast way tests each of the N slots the missing radius could occupy, solving x² directly in O(1) each.",
        "느린 방법은 가능한 x 를 전부(최대 10⁹) 넣어보고 다시 확인해요 — 너무 느려요. 빠른 방법은 깨진 반지름이 들어갈 수 있는 N 개의 자리마다 x² 를 O(1) 로 바로 풀어요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every radius x", "느림: 가능한 반지름 x 를 전부 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "x can be up to 10⁹, each try re-sorts / re-sums → far past the time limit.",
                     "x 는 최대 10⁹, 매 시도마다 다시 정렬 / 합산 → 제한 시간을 크게 초과.")}
              </div>
            </div>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
                🚀 {t(E, "Fast: one closed-form per slot", "빠름: 자리마다 닫힌 식 하나")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Sort once (N log N), build a prefix of the alternating sum, then O(1) per slot → O(N log N) total.",
                     "한 번 정렬(N log N)하고 번갈아 합의 앞부분을 만든 뒤, 자리당 O(1) → 전체 O(N log N).")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },

    // 3-2 progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc21GlassSections(E),
    },
  ];
}
