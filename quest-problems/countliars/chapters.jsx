import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getCountLiarsSections } from "./components";

/* ------------------------------------------------------------------
   Deep-audit sim — drag Bessie's position, watch liars light up.
   Each cow makes a 'G x' or 'L x' claim. The bar above the line
   shows true (green) or lying (red) at the current Bessie position.
   ------------------------------------------------------------------ */
const LIARS_SIM_CLAIMS = [
  { typ: "G", val: 2, label: "Cow 1" },
  { typ: "L", val: 6, label: "Cow 2" },
  { typ: "G", val: 4, label: "Cow 3" },
  { typ: "L", val: 3, label: "Cow 4" },
  { typ: "G", val: 7, label: "Cow 5" },
];

function CountLiarsSim({ E }) {
  const [pos, setPos] = useState(4);
  const A = "#2563eb";
  const claims = LIARS_SIM_CLAIMS;
  const evals = claims.map(c => {
    const lying = (c.typ === "G" && pos < c.val) || (c.typ === "L" && pos > c.val);
    return { ...c, lying };
  });
  const liarCount = evals.filter(e => e.lying).length;

  // Number line 1..10
  const MIN = 1, MAX = 10;
  const span = MAX - MIN;
  const pct = (v) => ((v - MIN) / span) * 100;

  // Best position (min liars across MIN..MAX)
  let best = MIN, bestLiars = claims.length;
  for (let p = MIN; p <= MAX; p++) {
    let lc = 0;
    for (const c of claims) {
      if ((c.typ === "G" && p < c.val) || (c.typ === "L" && p > c.val)) lc++;
    }
    if (lc < bestLiars) { bestLiars = lc; best = p; }
  }

  return (
    <div style={{
      background: "#f8fafc",
      border: `1.5px solid ${A}`,
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 10,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: A, marginBottom: 8, letterSpacing: 0.3 }}>
        {t(E, "🔬 Try it — drag Bessie's position", "🔬 직접 해봐 — Bessie 위치를 옮겨봐")}
      </div>

      {/* Claims list with truth status */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 6, marginBottom: 12 }}>
        {evals.map((e, i) => (
          <div key={i} style={{
            background: e.lying ? "#fee2e2" : "#dcfce7",
            border: `1px solid ${e.lying ? "#dc2626" : "#15803d"}`,
            borderRadius: 7,
            padding: "5px 8px",
            fontSize: 11,
            color: e.lying ? "#991b1b" : "#14532d",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontWeight: 700 }}>
              {e.typ} {e.val}
            </span>
            <span style={{ fontSize: 14 }}>{e.lying ? "🤥" : "✅"}</span>
          </div>
        ))}
      </div>

      {/* Number line */}
      <div style={{ position: "relative", height: 56, margin: "0 6px" }}>
        <div style={{
          position: "absolute", top: 26, left: 0, right: 0, height: 3,
          background: "#cbd5e1", borderRadius: 2,
        }} />
        {/* tick marks */}
        {Array.from({ length: span + 1 }, (_, i) => MIN + i).map(v => (
          <div key={v} style={{
            position: "absolute",
            left: `${pct(v)}%`,
            top: 22,
            transform: "translateX(-50%)",
            width: 1, height: 11,
            background: "#94a3b8",
          }} />
        ))}
        {Array.from({ length: span + 1 }, (_, i) => MIN + i).map(v => (
          <div key={`l-${v}`} style={{
            position: "absolute",
            left: `${pct(v)}%`,
            top: 36,
            transform: "translateX(-50%)",
            fontSize: 10, color: "#64748b",
          }}>{v}</div>
        ))}
        {/* Bessie marker */}
        <div style={{
          position: "absolute",
          left: `${pct(pos)}%`,
          top: 0,
          transform: "translateX(-50%)",
          fontSize: 20,
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
          pointerEvents: "none",
        }}>🐄</div>
        <div style={{
          position: "absolute",
          left: `${pct(pos)}%`,
          top: 21,
          transform: "translateX(-50%)",
          width: 3, height: 13, background: A, borderRadius: 1,
        }} />
      </div>

      <input
        type="range"
        min={MIN}
        max={MAX}
        value={pos}
        onChange={e => setPos(parseInt(e.target.value))}
        style={{ width: "100%", accentColor: A, marginTop: 6 }}
      />

      {/* Live count */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: 8, fontSize: 12, flexWrap: "wrap", gap: 6,
      }}>
        <div style={{ color: C.text }}>
          {t(E, "Bessie at ", "Bessie 위치 ")}
          <b style={{ color: A }}>{pos}</b>
          {t(E, " → liars: ", " → 거짓말쟁이: ")}
          <b style={{ color: liarCount === bestLiars ? "#15803d" : "#dc2626" }}>{liarCount}</b>
        </div>
        <div style={{ color: C.dim, fontSize: 11 }}>
          {liarCount === bestLiars
            ? t(E, "🏆 You found a best position!", "🏆 최적 위치를 찾았어!")
            : t(E, `Best so far: ${bestLiars} liars (try other positions)`, `최선: ${bestLiars}명 (다른 위치도 시도)`)}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "claims = []",
  "for _ in range(N):",
  "    parts = input().split()",
  "    claims.append((parts[0], int(parts[1])))",
  "",
  "# Try every possible position for Bessie",
  "# For each position p, count contradictions",
  "positions = sorted(set(c[1] for c in claims))",
  "",
  "min_liars = N",
  "for p in range(1, 1000001):",
  "    liars = 0",
  "    for typ, val in claims:",
  "        if typ == 'G' and p < val:",
  "            liars += 1",
  "        elif typ == 'L' and p > val:",
  "            liars += 1",
  "    min_liars = min(min_liars, liars)",
  "",
  "# Optimized: sort and use prefix sums",
  "# Try each claimed position as Bessie's position",
  "ans = N",
  "for p in [c[1] for c in claims]:",
  "    liars = 0",
  "    for typ, val in claims:",
  "        if typ == 'G' and p < val: liars += 1",
  "        elif typ == 'L' and p > val: liars += 1",
  "    ans = min(ans, liars)",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLiarsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows each claim where Bessie is on a number line. A 'G x' claim says Bessie is at position ≥ x; 'L x' says ≤ x. Bessie has ONE actual position.\nFind the MINIMUM number of cows who must be lying — i.e., pick Bessie's position to maximize the number of true claims.",
        "N마리 소가 각자 Bessie의 위치에 대해 주장을 해요. 'G x'는 Bessie 위치가 x 이상, 'L x'는 x 이하라는 뜻이에요. Bessie의 실제 위치는 하나예요.\nBessie의 위치를 잘 골라서 참인 주장 수를 최대화할 때, 거짓말쟁이의 최소 수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🤥"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Counting Liars</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2022 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of cows who must be lying — pick Bessie's position to maximize true claims.",
                "Bessie 의 위치를 가장 좋게 골랐을 때 거짓말쟁이가 될 수밖에 없는 소의 최소 수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has ", "Bessie의 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "a single position on a number line", "수직선 위 단 하나의 위치")}</b>
                  {t(E, ".", "가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each of ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N cows makes a claim", "N마리 소가 각자 주장")}</b>
                  {t(E, ":", " 을 해요:")}
                  <div style={{ marginTop: 4, marginLeft: 8, fontSize: 12, color: "#475569" }}>
                    <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace" }}>G x</code>
                    {t(E, " — Bessie's position ≥ x", " — Bessie 위치 ≥ x")}<br/>
                    <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace" }}>L x</code>
                    {t(E, " — Bessie's position ≤ x", " — Bessie 위치 ≤ x")}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Some cows might be ", "어떤 소들은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "lying", "거짓말")}</b>
                  {t(E, " — their claim is false for Bessie's actual position.",
                        "을 해요 — 그 주장이 Bessie의 실제 위치에 대해 거짓이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of liars", "거짓말쟁이의 최소 수")}</b>
                  {t(E, " over all possible positions for Bessie.",
                        "를 출력해요. Bessie의 위치를 가장 좋게 골랐을 때.")}
                </div>
              </div>
            </div>
          </div>

          <CountLiarsSim E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Claims: 'G 3' and 'L 5'. If Bessie is at position 4, how many liars?", "주장: 'G 3'과 'L 5'. Bessie가 위치 4에 있으면, 거짓말쟁이는 몇 명?"),
      question: t(E,
        "'G 3' (pos>=3) and 'L 5' (pos<=5). Bessie at 4. Liars?",
        "'G 3' (위치>=3)과 'L 5' (위치<=5). Bessie 위치 4. 거짓말쟁이?"),
      options: [
        t(E, "0 - both claims are true", "0 - 둘 다 참"),
        t(E, "1 - one claim is false", "1 - 하나가 거짓"),
        t(E, "2 - both claims are false", "2 - 둘 다 거짓"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 4 >= 3 (G 3 is true) and 4 <= 5 (L 5 is true). Zero liars!",
        "맞아! 4 >= 3 (G 3은 참)이고 4 <= 5 (L 5는 참). 거짓말쟁이 0명!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Try every Bessie position you can think of for 'G 3' and 'L 2'.  How many liars at the best position?",
        "'G 3' 과 'L 2' 에 대해 Bessie 의 가능한 위치들을 다 시도해 봐. 가장 좋은 위치에서 거짓말쟁이는?"),
      question: t(E,
        "'G 3' and 'L 2'. Min liars?",
        "'G 3'과 'L 2'. 최소 거짓말쟁이?"),
      hint: t(E,
        "Can both claims be true at any single position?  If not, at least how many lose?",
        "한 위치에서 두 주장 모두 참이 될 수 있어? 안 되면 최소 몇 개가 거짓?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLiarsCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in.
    {
      type: "progressive",
      narr: t(E,
        "Brute force: for each candidate position p (try the claim's x values), count contradicted claims.  Take the min.  Sections build it one piece at a time.",
        "완전탐색: 각 후보 위치 p (주장의 x 값들 시도) 마다 모순되는 주장 수 카운트. 최솟값이 답. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getCountLiarsSections(E),
    },
  ];
}
