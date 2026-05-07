import { C, t } from "@/components/quest/theme";
import { getCheckupsSections, ReverseSim } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

/* ====================================================================
   Shared visual language for the checkups quest — reused across the
   1-1 mini-visual, the 1-5 sample-3 walkthrough, and the ReverseSim.
   Keeping these in one place means a tweak applies everywhere.
   ==================================================================== */
const SPECIES = {
  1: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },  // amber
  2: { bg: "#dbeafe", text: "#1e3a8a", border: "#93c5fd" },  // blue
  3: { bg: "#fce7f3", text: "#9d174d", border: "#f9a8d4" },  // pink
  4: { bg: "#dcfce7", text: "#14532d", border: "#86efac" },  // green
  5: { bg: "#ede9fe", text: "#5b21b6", border: "#a78bfa" },  // purple
};

function SpeciesCell({ v, swapped, matched, size = 52 }) {
  const sp = SPECIES[v] || SPECIES[1];
  return (
    <div style={{
      width: size, height: size, borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono',monospace", fontSize: Math.round(size * 0.42), fontWeight: 700,
      background: sp.bg, color: sp.text,
      border: `${swapped ? 1.5 : 1}px ${swapped ? "dashed" : "solid"} ${swapped ? "#3b82f6" : sp.border}`,
      boxShadow: matched ? "0 0 0 2px #22c55e inset" : "none",
    }}>{v}</div>
  );
}

function CowRow({ label, sub, cells, withSwap, matches, size = 52 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <div style={{ width: 130, fontSize: 12, fontWeight: 600, color: "#7f1d1d", textAlign: "right", lineHeight: 1.25 }}>
        {label}
        {sub && <div style={{ fontSize: 10, color: C.dim, fontWeight: 400 }}>{sub}</div>}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {cells.map((c, i) => (
          <SpeciesCell key={i} v={c.v} swapped={withSwap && c.swapped} matched={matches?.[i]} size={size} />
        ))}
      </div>
    </div>
  );
}

function TreatedRow({ matches, size = 52 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
      <div style={{ width: 130, fontSize: 12, fontWeight: 600, color: "#15803d", textAlign: "right" }}>
        💉 치료?
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {matches.map((m, i) => (
          <div key={i} style={{
            width: size, height: Math.round(size * 0.6), borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: Math.round(size * 0.36), fontWeight: 600,
            background: m ? "#22c55e" : "transparent",
            color: m ? "#fff" : "#cbd5e1",
          }}>{m ? "✓" : "—"}</div>
        ))}
      </div>
    </div>
  );
}

function PositionRow({ n, size = 52 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
      <div style={{ width: 130 }} />
      <div style={{ display: "flex", gap: 6 }}>
        {Array.from({ length: n }, (_, i) => (
          <div key={i} style={{ width: size, fontSize: 10, color: C.dim, textAlign: "center", fontWeight: 400 }}>{i + 1}</div>
        ))}
      </div>
    </div>
  );
}

// Reference solution — full O(N²) version (matches `solution_py` in quest-meta).
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "a = [0] + [int(data[p+i]) for i in range(N)]; p += N",
  "b = [0] + [int(data[p+i]) for i in range(N)]; p += N",
  "",
  "# baseline prefix: P[i] = matches a[k]==b[k] in [1..i]",
  "P = [0] * (N + 1)",
  "for i in range(1, N + 1):",
  "    P[i] = P[i-1] + (1 if a[i] == b[i] else 0)",
  "",
  "counts = [0] * (N + 1)",
  "# diagonal s = l + r — for fixed s, all (l, r) pairs share Q",
  "for s in range(2, 2*N + 1):",
  "    Q = [0] * (N + 2)",
  "    for k in range(1, N + 1):",
  "        j = s - k",
  "        inc = 1 if (1 <= j <= N and a[j] == b[k]) else 0",
  "        Q[k] = Q[k-1] + inc",
  "    l_min = max(1, s - N)",
  "    l_max = s // 2",
  "    for l in range(l_min, l_max + 1):",
  "        r = s - l",
  "        inside = Q[r] - Q[l-1]",
  "        outside = P[l-1] + (P[N] - P[r])",
  "        counts[inside + outside] += 1",
  "",
  "for c in counts:",
  "    print(c)",
];

export function makeCheckupsCh1(E) {
  return [
    /* 1-1 — Problem rules straight from the official statement. */
    {
      type: "reveal",
      narr: t(E,
        "FJ has N cows in a line. The vet checks cow i ONLY if its species matches b[i]. FJ performs ONE operation — reverse the subarray [l, r]. For every c=0..N, count how many (l, r) operations leave EXACTLY c cows checked.",
        "FJ 에 N 마리 소가 줄 서 있어요. 수의사는 i 번째 소의 종이 b[i] 와 같을 때만 검진. FJ 가 딱 한 번 [l, r] 부분 배열을 뒤집어요. c = 0..N 각각에 대해 정확히 c 마리가 검진되는 (l, r) 쌍의 개수를 출력."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐮</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Cow Checkups</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO January 2025 Bronze #3</div>
          </div>

          {/* Mini-visual: concrete example with labelled rows so a/b is unambiguous. */}
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#7f1d1d", textAlign: "center", marginBottom: 10 }}>
              {t(E, "Tiny example: 4 cows lined up. Each cow has a species, and the vet has a target species for each spot.",
                    "작은 예: 소 4 마리가 줄 서 있음. 각 자리마다 소가 가진 종 / 수의사가 원하는 종.")}
            </div>

            {/* Step 1: no reversal */}
            <div style={{ background: "#fff", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
                {t(E, "1. Without any reversal", "1. 뒤집기 없이")}
              </div>
              <CowRow
                label={t(E, "🐄 has", "🐄 가진 종")}
                sub="a"
                cells={[{v:1},{v:2},{v:1},{v:3}]}
                matches={[true, false, true, false]}
              />
              <CowRow
                label={t(E, "📋 vet wants", "📋 원하는 종")}
                sub="b"
                cells={[{v:1},{v:1},{v:1},{v:1}]}
                matches={[true, false, true, false]}
              />
              <TreatedRow matches={[true, false, true, false]} />
              <PositionRow n={4} />
              <div style={{ marginTop: 8, textAlign: "center", fontSize: 13, color: "#15803d", fontWeight: 600 }}>
                {t(E, "→ 2 cows treated (positions 1 and 3).", "→ 2 마리 치료 (1, 3 번 자리).")}
              </div>
            </div>

            {/* Step 2: one reversal */}
            <div style={{ background: "#fff", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
                {t(E, "2. Pick (l, r) = (2, 3) → reverse a[2..3] (blue dashed = swapped)",
                      "2. (l, r) = (2, 3) 골라 a[2..3] 뒤집기 (파랑 점선 = 교환된 칸)")}
              </div>
              <CowRow
                label={t(E, "🐄 has (after swap)", "🐄 가진 종 (뒤집기 후)")}
                sub="a'"
                cells={[
                  {v:1, swapped:false},
                  {v:1, swapped:true},
                  {v:2, swapped:true},
                  {v:3, swapped:false},
                ]}
                matches={[true, true, false, false]}
                withSwap
              />
              <CowRow
                label={t(E, "📋 vet wants", "📋 원하는 종")}
                sub="b"
                cells={[{v:1},{v:1},{v:1},{v:1}]}
                matches={[true, true, false, false]}
              />
              <TreatedRow matches={[true, true, false, false]} />
              <PositionRow n={4} />
              <div style={{ marginTop: 8, textAlign: "center", fontSize: 13, color: "#15803d", fontWeight: 600 }}>
                {t(E, "→ still 2 treated, but DIFFERENT cows (positions 1, 2 instead of 1, 3).",
                      "→ 여전히 2 마리 — 다른 소들 (1, 3 자리 → 1, 2 자리).")}
              </div>
            </div>

            {/* Step 3: try ALL (l, r) and tally */}
            <div style={{ background: "#fff", border: "1.5px solid #fca5a5", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>
                {t(E, "3. Try EVERY (l, r) — N=4 has 4·5/2 = 10 of them — and tally how many give 0, 1, 2, 3, 4 checkups.",
                      "3. 모든 (l, r) 시도 — N=4 면 4·5/2 = 10 개 — 검진 수 0, 1, 2, 3, 4 별로 몇 개 나오는지 집계.")}
              </div>
              <div style={{ fontSize: 11, color: C.text, lineHeight: 1.7 }}>
                {t(E, "Output: one line per check count.  E.g. '4' means 4 of the 10 operations leave that many cows checked.",
                      "출력: 검진 수 별 한 줄. 예 '4' 는 10 개 연산 중 4 개가 그 검진 수를 만든다는 뜻.")}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 6, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
            📐 <span style={{ fontWeight: 600 }}>{t(E, "Constraints", "제약")}:</span>{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace", fontWeight: 400 }}>1 ≤ N ≤ 7500</code>,{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace", fontWeight: 400 }}>1 ≤ a[i], b[i] ≤ N</code>
          </div>
        </div>),
    },

    /* 1-2 — Sample 1 verbatim with all 4 output lines explained. */
    {
      type: "reveal",
      narr: t(E,
        "Official sample 1: N=3 cows. There are 6 possible (l, r) pairs. Three leave 0 cows checked, three leave exactly 1 — so the answer is 3, 3, 0, 0.",
        "공식 샘플 1: N=3. (l, r) 쌍 6 개. 3 개는 검진 0, 3 개는 정확히 1 → 답 3, 3, 0, 0."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`3
1 3 2
3 2 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`3
3
0
0`}
              </div>
            </div>
          </div>

          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
              🔍 {t(E, "All 6 operations enumerated", "6 개 연산 모두")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, lineHeight: 1.7 }}>
              <div>a = [1, 3, 2], b = [3, 2, 1]</div>
              <div style={{ marginTop: 4, color: "#7f1d1d" }}>
                {t(E, "Length-1 (no actual reversal):", "길이 1 (사실상 그대로):")}
              </div>
              <div>(l=1, r=1): a → [1, 3, 2] · check = <b>0</b></div>
              <div>(l=2, r=2): a → [1, 3, 2] · check = <b>0</b></div>
              <div>(l=3, r=3): a → [1, 3, 2] · check = <b>0</b></div>
              <div style={{ marginTop: 4, color: "#15803d" }}>
                {t(E, "Length ≥ 2 (real reversal):", "길이 ≥ 2 (진짜 뒤집기):")}
              </div>
              <div>(l=1, r=2): a → [3, 1, 2] · check = <b>1</b> (pos 1: 3=3)</div>
              <div>(l=2, r=3): a → [1, 2, 3] · check = <b>1</b> (pos 2: 2=2)</div>
              <div>(l=1, r=3): a → [2, 3, 1] · check = <b>1</b> (pos 3: 1=1)</div>
            </div>
            <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #c4b5fd" }}>
              <b>{t(E, "Tally:", "집계:")}</b>{" "}
              {t(E, "c=0: 3 ops · c=1: 3 ops · c=2: 0 · c=3: 0 → output ", "c=0: 3 · c=1: 3 · c=2: 0 · c=3: 0 → 출력 ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>3 3 0 0</code>
            </div>
          </div>
        </div>),
    },

    /* 1-3 — Interactive simulator: drag (l, r), see reversed array + checkup count. */
    {
      type: "reveal",
      narr: t(E,
        "Drag the l and r sliders to pick a reversal. The top row is a (after reverse), the bottom is b. Green cells = vet checks.",
        "l, r 슬라이더 드래그해서 뒤집기 선택. 위 줄 = a (뒤집은 후), 아래 줄 = b. 초록 칸 = 수의사 검진."),
      content: (<ReverseSim E={E} />),
    },

    /* 1-4 — Quiz on understanding the operation. */
    {
      type: "quiz",
      narr: t(E,
        "Reverse a[2..4] in [5, 1, 2, 3, 4] gives [5, 4, 3, 2, 1]? No — only positions 2..4 reverse, leaving [5, 4, 3, 2, 4]. Wait, we lose the 4 at the end! Actually positions 2..4 are values 1, 2, 3 — reversed they become 3, 2, 1. Result: [5, 3, 2, 1, 4].",
        "[5, 1, 2, 3, 4] 의 a[2..4] 뒤집기? 위치 2..4 의 값 1, 2, 3 만 뒤집혀서 3, 2, 1 → 결과 [5, 3, 2, 1, 4]. 위치 1 과 5 는 그대로."),
      question: t(E,
        "After reversing a[2..4] of a=[5, 1, 2, 3, 4], what is a[3]?",
        "a=[5, 1, 2, 3, 4] 의 a[2..4] 를 뒤집은 후, a[3] 의 값은?"),
      options: ["1", "2", "3", "4"],
      correct: 1,
      explain: t(E,
        "Positions 2..4 hold values [1, 2, 3]. Reversed → [3, 2, 1]. So new a = [5, 3, 2, 1, 4], and a[3] = 2.",
        "위치 2..4 의 값 [1, 2, 3] 을 뒤집으면 [3, 2, 1]. 새 a = [5, 3, 2, 1, 4], a[3] = 2."),
    },

    /* 1-5 — Sample 3 walkthrough — pinpoint a high-yield reversal. */
    {
      type: "reveal",
      narr: t(E,
        "Sample 3: N=7. The two operations that yield 4 checkups are (l=4, r=5) and (l=5, r=7). One worked example below — verify by hand.",
        "샘플 3: N=7. 검진 4 개를 내는 연산은 (l=4, r=5) 와 (l=5, r=7). 아래 손 풀이로 확인."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — Sample 3, pick (l=4, r=5)", "풀이 — 샘플 3, (l=4, r=5)")}
            </div>
            <div style={{ marginBottom: 10, fontSize: 12, lineHeight: 1.6 }}>
              {t(E, "N=7. Reverse positions 4..5 of a (the values 2, 1 swap to 1, 2).  Same colour above & below ⇒ vet treats that cow.",
                    "N=7. a 의 4..5 위치 뒤집기 (값 2, 1 ↔ 1, 2). 위아래 같은 색 ⇒ 그 자리 치료.")}
            </div>

            {(() => {
              // Sample 3 data: a = [1, 3, 2, 2, 1, 3, 2], b = [3, 2, 2, 1, 2, 3, 1].
              // After reversing a[4..5]: a' = [1, 3, 2, 1, 2, 3, 2].
              const aOriginal = [1, 3, 2, 2, 1, 3, 2];
              const aPrime    = [1, 3, 2, 1, 2, 3, 2];
              const b         = [3, 2, 2, 1, 2, 3, 1];
              const swapped   = [false, false, false, true, true, false, false];
              const matches   = aPrime.map((v, i) => v === b[i]);
              const N = 7;
              return (
                <>
                  <CowRow
                    label={t(E, "🐄 original", "🐄 원래")}
                    sub="a"
                    cells={aOriginal.map(v => ({ v }))}
                    size={42}
                  />
                  <CowRow
                    label={t(E, "🐄 after swap", "🐄 뒤집기 후")}
                    sub="a'"
                    cells={aPrime.map((v, i) => ({ v, swapped: swapped[i] }))}
                    matches={matches}
                    withSwap
                    size={42}
                  />
                  <CowRow
                    label={t(E, "📋 vet wants", "📋 원하는 종")}
                    sub="b"
                    cells={b.map(v => ({ v }))}
                    matches={matches}
                    size={42}
                  />
                  <TreatedRow matches={matches} size={42} />
                  <PositionRow n={N} size={42} />
                </>
              );
            })()}

            <div style={{ marginTop: 8, textAlign: "center", color: "#15803d", fontWeight: 600, fontSize: 13 }}>
              {t(E, "→ 4 cows treated (positions 3, 4, 5, 6).", "→ 4 마리 치료 (3, 4, 5, 6 번 자리).")}
            </div>
          </div>
        </div>),
    },

    /* 1-6 — Input quiz on a tiny example. */
    {
      type: "input",
      narr: t(E,
        "Tiny case: a=[1, 2], b=[2, 1]. After reversing a[1..2] we get a'=[2, 1]. How many checkups?",
        "작은 예: a=[1, 2], b=[2, 1]. a[1..2] 뒤집기 후 a'=[2, 1]. 검진 수?"),
      question: t(E,
        "Checkups after reversing a[1..2] of a=[1, 2] vs b=[2, 1]?",
        "a=[1, 2] 의 a[1..2] 뒤집기 후 b=[2, 1] 와 비교 시 검진 수?"),
      hint: t(E,
        "a' = [2, 1]. Compare to b = [2, 1]: position 1 → 2=2 ✓, position 2 → 1=1 ✓. Both match!",
        "a' = [2, 1]. b = [2, 1] 비교: 위치 1 → 2=2 ✓, 위치 2 → 1=1 ✓. 둘 다."),
      answer: 2,
    },
  ];
}

export function makeCheckupsCh2(E, lang = "py") {
  return [
    /* 2-1 — Light, narrative intro instead of a planning grid + complexity badge. */
    {
      type: "reveal",
      narr: t(E,
        "Just write the obvious thing first.  Try every (l, r), reverse, count matches.  Read the code section by section.",
        "일단 눈에 보이는 대로 짜요. (l, r) 다 돌려보고, 뒤집고, 일치 수 세기. 코드를 한 단락씩 읽어요."),
      content: (
        <div style={{ padding: 16, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
          {t(E,
            "We have a small N. The straight-forward solution is fine for partial credit and reads as a 1:1 translation of the problem statement. Sections below build it line by line — read the code as you'd read a story.",
            "N 이 크지 않아요. 가장 직접적인 풀이로 부분점수 받기에 충분하고, 코드도 문제 설명을 그대로 옮긴 모양이에요. 아래 섹션들이 한 단락씩 코드 쌓아가요 — 그냥 코드를 이야기 읽듯 읽어보세요.")}
        </div>),
    },

    /* 2-2..2-N — Code sections. */
    ...getCheckupsSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Build the code step by step. Brute (1–4) for partial credit, prefix-sum upgrade (5–7) for full credit.",
              "단계별 코드. brute (1–4) 로 부분점수, prefix-sum 업그레이드 (5–7) 로 풀점수.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
