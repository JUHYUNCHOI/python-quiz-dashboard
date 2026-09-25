import { useState } from "react";
import { C, t } from "@/components/quest/theme";

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
  /* 2026-09-17: 시뮬 상자가 클릭 전부터 "왜 후보 K 가 4 개뿐인지" 를 문단으로 다 말하고,
     맨 아래는 이 예제의 답(K=2 → 빠진 수 4)까지 미리 알려주고 있었다.
     '왜 4 개뿐인가' 는 다음 쪽 퀴즈에서 학생이 찾고, 그림 설명은 '더 빠르게' 쪽으로 옮겼다.
     여기서는 후보를 다 눌러 본 뒤에만 정리가 나온다. */
  const [tried, setTried] = useState([]);
  const pickK = (c) => {
    setK(c);
    setTried((prev) => (prev.includes(c) ? prev : [...prev, c]));
  };
  const triedAll = tried.length >= candidates.length;

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
          ⚓ {t(E, "Undo a candidate K and see what comes back", "후보 K 를 되돌려서 무엇이 나오는지 봐요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12, whiteSpace: "pre-line", ...KA }}>
          {t(E,
            "Pick a candidate K below and we subtract it back with |x−K|. The original numbers were all different and all in 1..N — so if any result repeats or falls outside 1..N, that K is impossible.",
            "아래 후보 K 를 하나 고르면 |x−K| 로 되돌려 볼게요.\n원래 수들은 모두 달랐고 전부 1..N 안에 있었어요.\n그러니 되돌린 값이 겹치거나 1..N 을 벗어나면\n그 K 로는 이 목록을 만들 수 없어요.")}
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
          {t(E, "candidate K — pick one", "후보 K — 하나 골라요")}
        </div>
        {/* 2026-09-17: 98 자가 한 줄로 이어져 있었다. 절 단위로 끊는다. */}
        <div style={{ fontSize: 11, color: C.dim, marginBottom: 6,
          whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
          {t(E,
            `Four formulas — min+N, max−N, min+(N−1), max−(N−1).\nTwo of them land on the same number here, so there are ${candidates.length} buttons.\nWhy only these? That is the next page.`,
            `식은 min+N, max−N, min+(N−1), max−(N−1) 네 개예요.\n여기서는 그중 둘이 같은 값이라 버튼이 ${candidates.length} 개예요.\n왜 이 식들만 보면 되는지는 다음 쪽에서 찾아봐요.`)}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {candidates.map((c) => (
            <button key={c} onClick={() => pickK(c)} style={{
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
                  ✅ {t(E, "valid — ", "맞아요 — ")}
                  <span style={{ color: "#6ee7b7" }}>
                    {N - 1} {t(E, "distinct magnitudes in [1,", "개 크기가 모두 다르고 [1,")}{N}]
                  </span><br />
                  {/* 2026-09-17: "total − 합" 에서 total 이 무엇인지 화면에 없었다 (⑤).
                      위 칸에 이미 "1..N 의 합" 이라고 적어 두었으니 같은 이름을 쓴다. */}
                  {t(E, "missing = (sum of 1..N) − (sum of the undone values) = ", "빠진 수 = (1..N 의 합) − (되돌린 값들의 합) = ")}
                  <b style={{ color: "#fbbf24" }}>{total}</b> − <b style={{ color: "#fbbf24" }}>{mags.reduce((s, m) => s + m, 0)}</b> = <b style={{ color: "#34d399" }}>{missing}</b>
                </span>
              ) : (
                <span>
                  ❌ {t(E, "not valid — ", "안 맞아요 — ")}
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

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
          {triedAll
            ? t(E,
                "Only one K survived here, so the answer is its missing number. When more than one K survives we add every one of their missing numbers together — that is what the second example does.",
                "여기서는 K 하나만 살아남았으니 그 K 의 빠진 수가 답이에요.\n살아남는 K 가 여럿이면 각각의 빠진 수를 모두 더해요.\n두 번째 예제가 바로 그런 경우예요.")
            : t(E,
                "Try every candidate. How many of them survive?",
                "후보를 하나씩 다 눌러 봐요. 몇 개가 살아남나요?")}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE  (anchor the largest magnitude → only 4 K to test)
   VERIFIED: official samples N=5→4, N=6→7; 0/20000 vs brute (N≥2).
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */

export function makeMcc20MissingCh1(E) {
  return [
    // 1-1: title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Find every number that could be the missing one, and add them up.",
        "빠진 숫자로 가능한 값을 모두 찾아 더해요."),
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
                  {t(E, " — a repeat counts again for each valid K.", " — 맞는 K 마다 다시 세어요.")}
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
        "입력 형식과 공식 예제 둘을 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            {/* 2026-09-17: 여기가 "1번째 줄 / 2번째 줄" 이라고 **원문에 없는 줄 형식**을 원문인 것처럼
                적어 두던 자리다. 원문(public/problems/mcc20missing.pdf)은
                N = 5 / Numbers = [-1, 7, 4, 1] 처럼 값을 변수로 준다. */}
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>N</b> — {t(E, "the permutation was 1..N", "원래 수는 1 부터 N 까지였어요")}</div>
              <div>• <b>Numbers</b> — {t(E, "the N−1 numbers that are left", "남아 있는 수 N−1 개")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ N ≤ 100000, −3N ≤ K ≤ 3N.", "제약: 1 ≤ N ≤ 100000, −3N ≤ K ≤ 3N.")}
            </div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
              {t(E,
                "The original problem hands the data over as values: N = 5 and Numbers = [-1, 7, 4, 1].\nOur code writes those same values down and starts from there.\nReading them line by line with input() shows up in the 2022 problems.",
                "원문은 N = 5, Numbers = [-1, 7, 4, 1] 처럼 값을 변수로 줘요.\n코드도 원문 그대로 값을 적어 두고 시작해요.\ninput() 으로 줄을 읽어 오는 법은 2022년 문제에서 만나요.")}
            </div>
          </div>

          {/* sample 1 */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10, ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example 1 input", "예제 1 입력")}</div>
              <div>N = 5</div>
              <div>Numbers = [-1, 7, 4, 1]</div>
            </div>
            <div style={{ background: "#0f172a", color: "#fdba74", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>4 <span style={{ color: "#fdba74", fontSize: 10.5, fontWeight: 400 }}>{t(E, "← sum", "← 합")}</span></div>
            </div>
          </div>

          {/* sample 2 */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example 2 input", "예제 2 입력")}</div>
              <div>N = 6</div>
              <div>Numbers = [4, 5, 13, 6, 11]</div>
            </div>
            <div style={{ background: "#0f172a", color: "#fdba74", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>7 <span style={{ color: "#fdba74", fontSize: 10.5, fontWeight: 400 }}>{t(E, "← sum", "← 합")}</span></div>
            </div>
          </div>

          {/* 2026-09-17: 72 자가 한 줄로 이어져 있었다. 절 단위로 끊는다. */}
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55,
            whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
            {t(E,
              "Example 2 has TWO valid K.\nK=10 makes the missing number 2, and K=7 makes it 5.\nThe answer counts both: 2 + 5 = 7.",
              "예제 2 는 맞는 K 가 둘이에요.\nK=10 이면 빠진 수가 2, K=7 이면 5 예요.\n둘 다 세니까 2 + 5 = 7 이에요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the idea. Pick a candidate K, subtract it back with |x−K|, and see which K could have produced the list.",
        "후보 K 를 골라 되돌려 보고 어떤 K 가 맞는지 봐요."),
      content: <Mcc20MissingAnchorSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Now find out why those few candidates are enough.",
        "후보가 왜 몇 개뿐인지 이제 직접 찾아봐요."),
      question: t(E,
        "Before signs and +K, what is the largest magnitude still in the list?",
        "부호와 +K 를 붙이기 전, 목록에 남은 가장 큰 크기는 얼마일까요?"),
      options: [
        t(E, "N or N−1", "N 또는 N−1"),
        t(E, "always N", "언제나 N"),
        t(E, "always N−1", "언제나 N−1"),
      ],
      correct: 0,
      explain: t(E,
        "If N wasn't discarded the largest is N; if N was discarded it's N−1. Adding the same K to everyone keeps the order, so that biggest one ends up at the MAX of the list when its sign was + and at the MIN when it was −. Two sizes × two signs = 4 candidate K.",
        "N 을 안 버렸으면 N, N 을 버렸으면 N−1 이에요. 모두에게 같은 K 를 더하면 순서가 그대로라, 가장 큰 그 수는 부호가 + 였으면 목록의 MAX 자리에, − 였으면 MIN 자리에 놓여요. 크기 2 가지 × 부호 2 가지 = 후보 K 4 개예요."),
    },
  ];
}

export function makeMcc20MissingCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → anchor idea
    {
      type: "reveal",
      narr: t(E,
        "Find out why only 4 values of K need checking, not all of them.",
        "K 를 전부 보지 않고 4개만 보면 되는 이유를 찾아봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every K in [−3N, 3N]", "느림: [−3N, 3N] 의 모든 K 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "About 6N candidate K, each needs rebuilding the whole array once (~N steps) → ~6N×N ≈ 6×10^10. Times out.", "K 후보가 약 6N 개이고 각각 배열을 통째로 한 번씩(약 N 번) 다시 만들어요 → ~6N×N ≈ 6×10^10 이라 시간 초과예요.")}
              </div>
            </div>
            <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#9a3412", marginBottom: 4 }}>
                🚀 {t(E, "Fast: anchor the biggest magnitude → only 4 K", "빠름: 가장 큰 크기를 붙잡아 → K 는 4개뿐")}
              </div>
              {/* 2026-09-17: 여기는 같은 결론이 세 번째로 되풀이되던 자리였다.
                  문장 대신 작은 예 하나를 그림으로 보여준다 — 학생이 "왜 그 자리에 놓이는지"
                  를 못 봤다고 했다. 크기 1·2·3 에 부호를 붙이고 K=10 을 더해 본다. */}
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55, marginBottom: 8, ...KA }}>
                {t(E, "A tiny example: magnitudes 1, 2, 3 with K = 10.", "작은 예로 봐요. 크기 1, 2, 3 에 K = 10 을 더해요.")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
                {[
                  { sign: "+", row: ["−1", "+2", "+3"], out: ["9", "12", "13"], hitIdx: 2, tag: t(E, "biggest is MAX", "가장 큰 수가 MAX"), eq: "13 = 3 + K" },
                  { sign: "−", row: ["−1", "+2", "−3"], out: ["9", "12", "7"], hitIdx: 2, tag: t(E, "biggest is MIN", "가장 큰 수가 MIN"), eq: "7 = −3 + K" },
                ].map((r) => (
                  <div key={r.sign} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
                    <span style={{ color: C.dim, minWidth: 70, whiteSpace: "nowrap", fontSize: 11 }}>
                      {t(E, "sign of 3: ", "3 의 부호: ")}<b style={{ color: "#9a3412" }}>{r.sign}</b>
                    </span>
                    <span style={{ color: C.dim }}>{r.row.join("  ")}</span>
                    <span style={{ color: "#9a3412" }}>+10 →</span>
                    {r.out.map((v, i) => (
                      <span key={i} style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        minWidth: 28, height: 24, borderRadius: 6, fontWeight: 800,
                        border: i === r.hitIdx ? "1.5px solid #ea580c" : "1px solid #fdba74",
                        background: i === r.hitIdx ? "#ea580c" : "#fff",
                        color: i === r.hitIdx ? "#fff" : "#9a3412",
                      }}>{v}</span>
                    ))}
                    <span style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, whiteSpace: "nowrap" }}>{r.tag}</span>
                    <span style={{ fontSize: 11, color: C.dim, whiteSpace: "nowrap" }}>{r.eq}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
                {t(E,
                  "Adding the same K to everyone keeps the order, so the biggest magnitude always ends up at one end. Solve each equation for K: 4 candidates, each checked with one pass through the array — about 4N steps in total.",
                  "모두에게 같은 K 를 더하면 순서가 바뀌지 않아요.\n그래서 가장 큰 크기는 늘 양 끝 중 한 곳에 놓여요.\n이 식을 K 에 대해 풀면 후보가 4 개 나와요.\n각각 배열을 한 번씩 훑어 확인하니 다 합쳐 약 4N 이에요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    // 2-2: code — CodeWalk (선생님 2026-07-14: 모든 quest 코드 이 방식)
    {
      type: "opt-codewalk",
      narr: t(E,
        "The full solution, start to finish.", "전체 풀이를 처음부터 끝까지 봐요."),
    },
  ];
}
