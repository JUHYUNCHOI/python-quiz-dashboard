import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc20MissingSections } from "./components";

const KA = { wordBreak: "keep-all" };
const A = "#f97316";

// Concept sim uses the official sample 1: N=5, a = [-1, 7, 4, 1]  → answer 4.
const SIM_N = 5;
const SIM_A = [-1, 7, 4, 1];

/* ─────────────────────────────────────────────────────────────
   Concept sim: pick a candidate K, subtract it back with |x−K|,
   and see whether the magnitudes are a valid leftover of 1..N.
   Teaches WHY only a few K are possible: the biggest magnitude
   must be N (or N−1) sitting at an extreme of the list.
   ───────────────────────────────────────────────────────────── */
function Mcc20MissingAnchorSim({ E }) {
  const N = SIM_N, a = SIM_A;
  const total = (N * (N + 1)) / 2;
  const mn = Math.min(...a), mx = Math.max(...a);
  // the 4 candidate K values (deduplicated, ascending)
  const candidates = Array.from(
    new Set([mn + N, mx - N, mn + (N - 1), mx - (N - 1)])
  ).sort((x, y) => x - y);

  const [K, setK] = useState(null);

  const mags = K == null ? [] : a.map((x) => Math.abs(x - K));
  const counts = {};
  mags.forEach((m) => { counts[m] = (counts[m] || 0) + 1; });
  const isBad = (m) => m < 1 || m > N || counts[m] > 1;
  const allGood = K != null && mags.every((m) => !isBad(m));
  const distinctInRange = allGood && new Set(mags).size === N - 1;
  const missing = distinctInRange ? total - mags.reduce((s, m) => s + m, 0) : null;

  const numChip = (val, kind) => (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 34, height: 34, padding: "0 6px", borderRadius: 8,
      fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800,
      border: kind === "good" ? "1.5px solid #16a34a" : kind === "bad" ? "1.5px solid #fca5a5" : "1.5px solid #fdba74",
      background: kind === "good" ? "#dcfce7" : kind === "bad" ? "#fef2f2" : "#fff7ed",
      color: kind === "good" ? "#15803d" : kind === "bad" ? "#b91c1c" : "#9a3412",
    }}>{val}</span>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 8 }}>
          ⚓ {t(E, "Grab the biggest number to pin down K", "가장 큰 수를 붙잡아 K 를 좁혀요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "We can't try every K. But the biggest ORIGINAL magnitude is N (or N−1 if N was discarded) — so after +K it must sit at the MAX or MIN of the list. That leaves only 4 possible K. Try each: subtract it back with |x−K| and check the result.",
            "K 를 전부 시도할 순 없어요. 그런데 원래 절대값이 가장 큰 수는 N (N 을 버렸으면 N−1) 이라, +K 한 뒤엔 목록의 MAX 나 MIN 자리에 놓여야 해요. 그래서 가능한 K 는 4개뿐. 각각 |x−K| 로 되돌려서 결과를 확인해봐요.")}
        </div>

        {/* given array */}
        <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 4 }}>
          {t(E, `given list a (N = ${N})`, `주어진 목록 a (N = ${N})`)}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 4 }}>
          {a.map((x, i) => (
            <span key={i} style={{ position: "relative" }}>
              {numChip(x, "neutral")}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginBottom: 12 }}>
          min = <b style={{ color: "#9a3412" }}>{mn}</b>, max = <b style={{ color: "#9a3412" }}>{mx}</b> ·{" "}
          {t(E, "sum of 1..N = ", "1..N 의 합 = ")}<b style={{ color: "#9a3412" }}>{total}</b>
        </div>

        {/* candidate K buttons */}
        <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "4 candidate K (min±N, max±(N−1) …) — pick one", "후보 K 4개 (min+N, max−N, min+(N−1), max−(N−1)) — 하나 골라요")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {candidates.map((c) => (
            <button key={c} onClick={() => setK(c)} style={{
              padding: "6px 12px", borderRadius: 8, cursor: "pointer",
              fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800,
              border: K === c ? "2px solid #ea580c" : "1px solid #fdba74",
              background: K === c ? "#ea580c" : "#fff", color: K === c ? "#fff" : "#9a3412",
            }}>K = {c}</button>
          ))}
        </div>

        {/* reconstruction */}
        {K != null && (
          <>
            <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 4 }}>
              {t(E, `subtract K back:  |x − ${K}|`, `K 되돌리기:  |x − ${K}|`)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 12 }}>
              {a.map((x, i) => {
                const m = mags[i];
                return (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4,
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.dim, whiteSpace: "nowrap" }}>
                    <span>|{x}−{K}|=</span>
                    {numChip(m, isBad(m) ? "bad" : "good")}
                  </span>
                );
              })}
            </div>

            <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
              fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, ...KA }}>
              {distinctInRange ? (
                <span>
                  ✅ {t(E, "valid — ", "유효 — ")}
                  <span style={{ color: "#6ee7b7" }}>
                    {N - 1} {t(E, "distinct magnitudes in [1,", "개 크기가 모두 다르고 [1,")}{N}]
                  </span><br />
                  {t(E, "missing = total − sum = ", "빠진 수 = total − 합 = ")}
                  <b style={{ color: "#fbbf24" }}>{total}</b> − <b style={{ color: "#fbbf24" }}>{mags.reduce((s, m) => s + m, 0)}</b> = <b style={{ color: "#34d399" }}>{missing}</b>
                </span>
              ) : (
                <span>
                  ❌ {t(E, "not valid — ", "유효하지 않음 — ")}
                  <span style={{ color: "#fca5a5" }}>
                    {t(E,
                      "some magnitude is out of [1,N] or repeats (red). This K can't have produced the list.",
                      "빨간 크기가 [1,N] 밖이거나 중복돼요. 이 K 로는 목록을 만들 수 없어요.")}
                  </span>
                </span>
              )}
            </div>
          </>
        )}

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            "Only K = 2 survives here → missing = 4. Sum the missing value over every valid K; different K can give different missing numbers (that's the second sample: 2 + 5 = 7).",
            "여기선 K = 2 만 살아남아요 → 빠진 수 = 4. 유효한 K 마다 빠진 수를 더해요; K 가 다르면 빠진 수도 달라질 수 있어요 (두 번째 예제가 그래요: 2 + 5 = 7).")}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE  (anchor the largest magnitude → only 4 K to test)
   VERIFIED: official samples N=5→4, N=6→7; 0/20000 vs brute (N≥2).
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "if N == 1:",
  "    print(1)",
  "else:",
  "    total = N * (N + 1) // 2   # sum of 1..N",
  "    mn, mx = min(a), max(a)",
  "    lim = 3 * N",
  "",
  "    # biggest magnitude is N (or N-1); after +K it lands at MAX or MIN",
  "    candidates = {mn + N, mx - N, mn + (N - 1), mx - (N - 1)}",
  "",
  "    ans = 0",
  "    for K in candidates:",
  "        if not (-lim <= K <= lim):",
  "            continue",
  "        mags = [abs(x - K) for x in a]",
  "        if all(1 <= m <= N for m in mags) and len(set(mags)) == N - 1:",
  "            ans += total - sum(mags)",
  "    print(ans)",
];

export function makeMcc20MissingCh1(E) {
  return [
    // 1-1: title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Start from a permutation of 1..N. One number is discarded, the rest are shuffled, some get negative signs, and a constant K is added to every number.\nGiven the N−1 results, print the sum of all possible missing numbers.",
        "1..N 의 순열에서 시작해요. 한 숫자를 버리고, 나머지를 섞고, 일부에 음수 부호를 붙이고, 모든 수에 상수 K 를 더해요.\n결과 N−1 개가 주어졌을 때, 가능한 모든 빠진 숫자의 합을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"❓"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: A }}>Missing Number</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P5</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Recover which numbers could be the missing one, and print their total.",
                "어떤 숫자가 빠진 것일 수 있는지 알아내서, 그 합을 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>①</span>
                <div>
                  {t(E, "Start from a ", "")}
                  <b style={{ color: A }}>{t(E, "permutation of 1..N", "1..N 의 순열")}</b>
                  {t(E, ", then discard one number.", " 에서 시작해, 한 숫자를 버려요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>②</span>
                <div>{t(E, "Shuffle the remaining N−1 numbers.", "남은 N−1 개를 뒤섞어요.")}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>③</span>
                <div>
                  {t(E, "Give ", "일부에 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "some (maybe zero) negative signs", "(0개일 수도) 음수 부호")}</b>
                  {t(E, ".", "를 붙여요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>④</span>
                <div>
                  {t(E, "Add a constant ", "모든 수에 상수 ")}
                  <b style={{ color: "#dc2626" }}>K</b>
                  {t(E, " to EVERY number (−3N ≤ K ≤ 3N).", " K 를 더해요 (−3N ≤ K ≤ 3N).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "sum of every possible missing number", "가능한 모든 빠진 숫자의 합")}</b>
                  {t(E, " — a repeat counts again for each valid K.", " — 유효한 K 마다 다시 세요.")}
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
        "Read the input format and the two official examples. Notice K is unknown — we only see the final numbers.",
        "입력 형식과 두 공식 예제를 봐요. K 는 우리에게 안 보여요 — 우리는 최종 숫자들만 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "line 1: ", "1번째 줄: ")}<b>N</b></div>
              <div>• {t(E, "line 2: the ", "2번째 줄: ")}<b>N−1</b> {t(E, "resulting integers", "개의 결과 정수")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ N ≤ 100000, −3N ≤ K ≤ 3N.", "제약: 1 ≤ N ≤ 100000, −3N ≤ K ≤ 3N.")}
            </div>
          </div>

          {/* sample 1 */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10, ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example 1 input", "예제 1 입력")}</div>
              <div>5</div>
              <div>-1 7 4 1</div>
            </div>
            <div style={{ background: "#0f172a", color: "#fdba74", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>4</div>
            </div>
          </div>

          {/* sample 2 */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example 2 input", "예제 2 입력")}</div>
              <div>6</div>
              <div>4 5 13 6 11</div>
            </div>
            <div style={{ background: "#0f172a", color: "#fdba74", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>7</div>
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "Example 2 has TWO valid K: K=10 makes the missing number 2, and K=7 makes it 5. The answer counts both: 2 + 5 = 7.",
              "예제 2 는 유효한 K 가 둘이에요: K=10 이면 빠진 수가 2, K=7 이면 5. 답은 둘 다 세요: 2 + 5 = 7.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the idea. Pick a candidate K, subtract it back with |x−K|, and see which K could have produced the list.",
        "아이디어를 직접 느껴봐요. 후보 K 를 골라 |x−K| 로 되돌리고, 어떤 K 가 목록을 만들 수 있었는지 봐요."),
      content: <Mcc20MissingAnchorSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "We started from a permutation of 1..N and discarded ONE number. Think about the largest value that could still be present.",
        "1..N 의 순열에서 한 개를 버렸어요. 아직 남아 있을 수 있는 가장 큰 값을 생각해봐요."),
      question: t(E,
        "Before signs and +K, what is the largest magnitude still in the list?",
        "부호와 +K 를 붙이기 전, 목록에 남은 가장 큰 크기는?"),
      options: [
        t(E, "N, or N−1 if N was the discarded one", "N, 버린 게 N 이면 N−1"),
        t(E, "always N", "항상 N"),
        t(E, "always N−1", "항상 N−1"),
      ],
      correct: 0,
      explain: t(E,
        "If N wasn't discarded the largest is N; if N was discarded it's N−1. After +K that biggest value sits at the MAX or MIN of the list — which pins K to just 4 candidates.",
        "N 을 안 버렸으면 N, N 을 버렸으면 N−1. +K 뒤 그 가장 큰 값은 목록의 MAX 나 MIN 에 놓여서 K 를 4개 후보로 좁혀줘요."),
    },
  ];
}

export function makeMcc20MissingCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → anchor idea
    {
      type: "reveal",
      narr: t(E,
        "The slow way tries every K in [−3N, 3N] and rebuilds the list each time. The fast way notices the biggest magnitude anchors K to only 4 candidates, so we test just those.",
        "느린 방법은 [−3N, 3N] 의 모든 K 를 시도하며 매번 목록을 재구성해요. 빠른 방법은 가장 큰 크기가 K 를 4개 후보로 묶어준다는 걸 눈치채, 그 4개만 확인해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every K in [−3N, 3N]", "느림: [−3N, 3N] 의 모든 K 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "About 6N candidate K, each needs an O(N) rebuild → ~6N² ≈ 6×10^10. Times out.", "K 후보가 약 6N 개, 각각 O(N) 재구성 → ~6N² ≈ 6×10^10. 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#9a3412", marginBottom: 4 }}>
                🚀 {t(E, "Fast: anchor the biggest magnitude → only 4 K", "빠름: 가장 큰 크기를 붙잡아 → K 는 4개뿐")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "The largest magnitude (N or N−1) must land on MAX or MIN, giving 4 candidate K. Check each in O(N). Total ≈ 4N.", "가장 큰 크기(N 또는 N−1)는 MAX 나 MIN 에 놓여야 해서 후보 K 는 4개. 각각 O(N) 확인. 합계 ≈ 4N.")}
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
      sections: getMcc20MissingSections(E),
    },
  ];
}
