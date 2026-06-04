import { C, t } from "@/components/quest/theme";
import { getCheckupsSections, ReverseSim, DiagonalSim, MatchUpToSim, DiagPrefixSim } from "./components";
import { CheckupsBruteRunner } from "./sims";
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
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2025 Bronze #3</div>
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
        "Official sample 1: N=3 cows.  Take a look — input is 3 lines, output is 4 lines (one per checkup count 0..N).",
        "공식 샘플 1: N=3. 입력 3 줄, 출력 4 줄 (검진 수 0..N 각각)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`3
1 3 2
3 2 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`3
3
0
0`}
              </div>
            </div>
          </div>

          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
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
        "Quick check on what a reversal does — only positions [l, r] flip, the rest stay put.",
        "뒤집기가 뭘 바꾸는지 확인 — [l, r] 위치만 뒤집히고 나머지는 그대로."),
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
        "Sample 3: a bigger case — N=7.  Walk through one specific reversal and count cows by hand.",
        "샘플 3: 더 큰 케이스 — N=7. 뒤집기 하나 골라 직접 손으로 검진 수 세 보자."),
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
        "Your turn — count checkups on a tiny case.",
        "직접 — 작은 케이스에서 검진 수 세 봐."),
      question: t(E,
        "Checkups after reversing a[1..2] of a=[1, 2] vs b=[2, 1]?",
        "a=[1, 2] 의 a[1..2] 뒤집기 후 b=[2, 1] 와 비교 시 검진 수?"),
      hint: t(E,
        "Reverse a[1..2] in your head, then compare each spot to b position by position.",
        "머릿속으로 a[1..2] 를 뒤집어 본 뒤, b 와 자리별로 하나씩 비교해 봐."),
      answer: 2,
    },
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Chapter 2 — 🐢 First Try (brute force).
   The obvious O(N³): try every (l, r), reverse, count. Build it section by
   section, RUN it live (feel it crawl), then see why N = 7500 times out.
   ════════════════════════════════════════════════════════════════════ */
export function makeCheckupsCh2(E, lang = "py") {
  return [
    /* 2-1 — Light, narrative intro. */
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

    /* 2-2..2-5 — Brute code sections (1️⃣..4️⃣) [결-a]. */
    ...getCheckupsSections(E).slice(0, 4).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Build brute step by step (1️⃣–4️⃣). It's the literal translation of the problem statement — fine for partial credit.",
              "brute 를 한 단락씩 (1️⃣–4️⃣). 문제 그대로 옮긴 모양 — 부분점수에 충분.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),

    /* 2-6 — RUN the brute force live: feel it crawl as N grows. */
    {
      type: "reveal",
      narr: t(E,
        "Now RUN it.  Try N = 50, then 200, then 600 — watch the time jump.  Three nested loops means triple the trouble.",
        "이제 직접 돌려봐요. N = 50 → 200 → 600 순서로 — 시간이 어떻게 뛰는지 봐요. 루프 세 겹 = 세 배의 고통."),
      content: (<CheckupsBruteRunner E={E} />),
    },

    /* 2-7 — predict quiz: how does the work grow? (active step) */
    {
      type: "quiz",
      narr: t(E,
        "You just watched it slow down.  Predict the pattern before reading on.",
        "방금 느려지는 걸 봤죠. 다음으로 넘어가기 전에 패턴을 예측해 봐요."),
      question: t(E,
        "If N doubles (say 300 → 600), roughly how much MORE work does the brute force do?",
        "N 이 두 배가 되면 (예: 300 → 600), brute 가 하는 일은 대략 몇 배로 늘까요?"),
      options: [
        t(E, "About 2× (twice the work)", "약 2 배"),
        t(E, "About 4× (squared)", "약 4 배 (제곱)"),
        t(E, "About 8× (cubed)", "약 8 배 (세제곱)"),
        t(E, "No change", "변화 없음"),
      ],
      correct: 2,
      explain: t(E,
        "Three nested loops → O(N³).  Doubling N multiplies work by 2³ = 8.  That's why 600 felt so much slower than 300.",
        "루프 세 겹 → O(N³). N 을 두 배로 하면 일은 2³ = 8 배. 그래서 600 이 300 보다 훨씬 느렸어요."),
    },

    /* 2-8 — [결-b 한계] why brute times out on N=7500. */
    {
      type: "reveal",
      narr: t(E,
        "Submit brute — small inputs pass, big ones time out.  Here's the math behind what you just felt.",
        "brute 제출 — 작은 입력은 통과, 큰 입력은 시간 초과. 방금 느낀 걸 숫자로 확인해 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#991b1b", textAlign: "center", marginBottom: 12 }}>
              🚨 {t(E, "Why brute fails", "brute 가 왜 무너지는가")}
            </div>

            <div style={{ background: "#fff", border: "1px solid #fecaca", borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>
                {t(E, "Per (l, r) brute does:", "(l, r) 마다 brute 는:")}
              </div>
              <div style={{ marginLeft: 12, fontSize: 12.5 }}>
                · {t(E, "Up to N reversed-position lookups + N comparisons → ", "뒤집은 위치 조회 + 비교 최대 N 번 → ")}
                <code style={{ background: "#fef3c7", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>O(N)</code>
              </div>
              <div style={{ marginLeft: 12, fontSize: 12.5, marginTop: 4 }}>
                · {t(E, "Pairs (l, r): N(N+1)/2 ≈ N² / 2 → ", "쌍 (l, r): N(N+1)/2 ≈ N² / 2 → ")}
                <code style={{ background: "#fef3c7", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>O(N²)</code>
              </div>
              <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fca5a5", textAlign: "center", fontWeight: 700, color: "#991b1b" }}>
                = O(N³) {t(E, "total", "총합")}
              </div>
            </div>

            {/* Concrete numbers grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
              {[
                { n: "100",   ops: "10⁶",     ms: "~10ms",   ok: true,  label: t(E, "tiny",   "작음") },
                { n: "1,000", ops: "10⁹",     ms: "~10s",    ok: false, label: t(E, "borderline", "경계") },
                { n: "7,500", ops: "≈4·10¹¹", ms: "~hours",  ok: false, label: t(E, "TLE",    "TLE") },
              ].map((row) => (
                <div key={row.n} style={{
                  background: row.ok ? "#dcfce7" : "#fee2e2",
                  border: `1.5px solid ${row.ok ? "#86efac" : "#fca5a5"}`,
                  borderRadius: 8, padding: 8, textAlign: "center",
                }}>
                  <div style={{ fontSize: 11, color: row.ok ? "#15803d" : "#991b1b", fontWeight: 600, marginBottom: 2 }}>
                    N = {row.n}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: row.ok ? "#166534" : "#7f1d1d" }}>
                    {row.ops}
                  </div>
                  <div style={{ fontSize: 11, color: row.ok ? "#166534" : "#7f1d1d", marginTop: 2 }}>
                    {row.ms}
                  </div>
                  <div style={{ fontSize: 10, color: row.ok ? "#15803d" : "#991b1b", marginTop: 2, fontWeight: 600 }}>
                    {row.ok ? "✓" : "✗"} {row.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff7ed", border: "1px dashed #fdba74", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: "#7c2d12", lineHeight: 1.6 }}>
              💡 {t(E,
                "Constraint says N ≤ 7,500.  We need to drop one factor of N — turn O(N) per pair into O(1).  Next chapter: a key observation that lets us do exactly that.",
                "제약: N ≤ 7,500. N 한 겹을 빼야 — 쌍당 O(N) 을 O(1) 로. 다음 챕터: 그게 가능한 핵심 관찰.")}
            </div>
          </div>
        </div>),
    },
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Chapter 3 — 💡 Fast Idea.
   The "same diagonal, same comparison" observation, taught entirely through
   three interactive sims. No walls of pseudo-code — the visuals carry it.
   ════════════════════════════════════════════════════════════════════ */
export function makeCheckupsCh3(E) {
  return [
    /* 3-1 — the big idea, in plain words (own lines so it stands out). */
    {
      type: "reveal",
      narr: t(E,
        "One picture unlocks everything.  Look at what stays the same as (l, r) changes.",
        "그림 하나가 전부를 풀어줘요. (l, r) 이 바뀔 때 무엇이 그대로인지 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 12, padding: 16, fontSize: 13, color: C.text, lineHeight: 1.75 }}>
            <div style={{ fontWeight: 700, color: "#0e7490", marginBottom: 10, fontSize: 14 }}>
              🔑 {t(E, "The key observation", "핵심 관찰")}
            </div>
            <div style={{ marginBottom: 10 }}>
              {t(E,
                "When you reverse a[l..r], the cell that lands on position i is the value that was at l + r − i.",
                "a[l..r] 를 뒤집으면, 위치 i 에 오는 값은 원래 l + r − i 자리에 있던 값이에요.")}
            </div>
            <div style={{ background: "#fff", border: "1px dashed #67e8f9", borderRadius: 8, padding: "10px 12px", marginBottom: 10, textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#0e7490", fontWeight: 700 }}>
              {t(E, "that index depends ONLY on s = l + r", "그 인덱스는 s = l + r 에만 달려 있어요")}
            </div>
            <div>
              {t(E,
                "So every (l, r) pair with the same sum s asks the EXACT same comparison questions inside the window.  Group them by s — that's the 'diagonal'.  The three sims below build the idea up one layer at a time.",
                "그래서 합 s 가 같은 모든 (l, r) 쌍은 윈도우 안에서 완전히 같은 비교를 해요. s 별로 묶으면 — 그게 '대각선'. 아래 시뮬 세 개가 한 겹씩 쌓아가요.")}
            </div>
          </div>
        </div>),
    },

    /* 3-2 — DiagonalSim: drag two (l, r) windows; same s → same colour. */
    {
      type: "reveal",
      narr: t(E,
        "Drag two (l, r) windows.  When their l + r matches, inside cells share a colour: same diagonal, same comparison.",
        "두 (l, r) 윈도우를 드래그해 봐요. l + r 가 같으면 안쪽 셀이 같은 색 — 같은 대각선이면 같은 비교."),
      content: (<DiagonalSim E={E} />),
    },

    /* 3-3 — quiz on the diagonal idea (active step). */
    {
      type: "quiz",
      narr: t(E,
        "Quick check on what 'same diagonal' means.",
        "'같은 대각선' 이 뭔지 확인해 봐요."),
      question: t(E,
        "Which pair (l, r) lands on the SAME diagonal as (l=2, r=5)?",
        "(l=2, r=5) 와 같은 대각선에 있는 쌍은 어느 것일까요?"),
      options: [
        "(l=3, r=4)",
        "(l=1, r=5)",
        "(l=2, r=6)",
        "(l=4, r=4)",
      ],
      correct: 0,
      explain: t(E,
        "Same diagonal means same s = l + r.  Here s = 2 + 5 = 7.  (l=3, r=4) gives 3 + 4 = 7 — same diagonal.  The others give 6, 8, 8.",
        "같은 대각선 = 같은 s = l + r. 여기선 s = 2 + 5 = 7. (l=3, r=4) 는 3 + 4 = 7 — 같은 대각선. 나머지는 6, 8, 8."),
    },

    /* 3-4 — MatchUpToSim: outside-window matches via a prefix built once. */
    {
      type: "reveal",
      narr: t(E,
        "Outside the window, nothing moves.  Build matchUpTo once (left-to-right), then drag (l, r) — outside matches drop out instantly.",
        "윈도우 바깥은 안 움직여요. matchUpTo 를 왼쪽부터 한 번만 만들고, (l, r) 드래그 — 바깥 일치 수가 바로 떨어져요."),
      content: (<MatchUpToSim E={E} />),
    },

    /* 3-5 — DiagPrefixSim: inside-window matches via per-diagonal prefix. */
    {
      type: "reveal",
      narr: t(E,
        "Inside the window: pick a diagonal s, count ✓ per position to get diag[k].  Any (l, r) on this s reads inside matches as diag[r] − diag[l−1].",
        "윈도우 안: 대각선 s 를 골라 자리마다 ✓ 를 세면 diag[k]. 이 s 의 (l, r) 안쪽 일치는 diag[r] − diag[l−1] 로 바로 읽어요."),
      content: (<DiagPrefixSim E={E} />),
    },

    /* 3-6 — closing input: the two-piece formula in one number (active step). */
    {
      type: "input",
      narr: t(E,
        "Put the two prefixes together for one (l, r).",
        "한 (l, r) 에 대해 두 prefix 를 합쳐 봐요."),
      question: t(E,
        "For some (l, r): outside matches = 3, inside matches = diag[r] − diag[l−1] = 5 − 2.  Total checkups for this pair?",
        "어떤 (l, r): 바깥 일치 = 3, 안쪽 일치 = diag[r] − diag[l−1] = 5 − 2. 이 쌍의 총 검진 수는?"),
      hint: t(E,
        "Total = outside + inside.  inside = 5 − 2 = 3.",
        "총합 = 바깥 + 안쪽. 안쪽 = 5 − 2 = 3."),
      answer: 6,
    },
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Chapter 4 — ⚡ Code.
   Now that the idea is clear from the sims, see the actual O(N²) code:
   the idea recap, both prefixes, the combine loop, and the full program.
   ════════════════════════════════════════════════════════════════════ */
export function makeCheckupsCh4(E, lang = "py") {
  // Smart sections: slice(4) = [5️⃣ idea, 6️⃣ matchUpTo, 7️⃣ diag, 8️⃣ combine, 9️⃣ full].
  const smart = getCheckupsSections(E).slice(4);
  return [
    ...smart.map((sec, i) => ({
      type: "reveal",
      narr:
        i === 0
          ? t(E, "Here's the idea as code — the outside comparison is fixed, the inside one depends only on s = l + r.",
                "아이디어를 코드로 — 바깥 비교는 고정, 안쪽은 s = l + r 에만 의존.")
          : i === 1
          ? t(E, "matchUpTo — built once with a left-to-right sweep.  Outside-window matches come straight from it.",
                "matchUpTo — 왼쪽부터 한 번에. 바깥 일치는 여기서 바로 나와요.")
          : i === 2
          ? t(E, "diag — rebuilt for each diagonal s.  Inside-window matches = diag[r] − diag[l−1].",
                "diag — 대각선 s 마다 새로. 안쪽 일치 = diag[r] − diag[l−1].")
          : i === 3
          ? t(E, "Combine the two prefixes for every (l, r) on the diagonal, then print the tally.",
                "대각선 위 모든 (l, r) 에 대해 두 prefix 합치고, 집계를 출력.")
          : t(E, "All five pieces wired together — variable names match the sections above.  Read top to bottom.",
                "다섯 조각이 한 군데에 — 변수 이름은 위 섹션 그대로. 위에서 아래로 읽어요."),
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
