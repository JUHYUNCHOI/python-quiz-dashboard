import { C, t } from "@/components/quest/theme";
import { getSubseqMedianSections, SubseqMedianSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* Re-export the solution code so anything importing it keeps working. */
export { SOLUTION_CODE } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (4 steps)
     1-1 title + 🎯Mission + 📖Problem
     1-2 📥Input + official sample card
     1-3 concept sim (median center explorer)
     1-4 understanding quiz
   ═══════════════════════════════════════════════════════════════ */
export function makeSubseqMedianCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "A 'good' subsequence is strictly increasing AND has odd length. Its median is the middle element.\nAdd up the medians of ALL good subsequences, mod 998244353.",
        "'좋은' 부분수열은 엄격히 증가(같은 값 없이 계속 커짐)하면서 길이가 홀수예요. 중앙값은 가운데 원소예요.\n모든 좋은 부분수열의 중앙값을 더해 998244353 으로 나눈 나머지를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📊"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#059669" }}>Increasing Subsequence Median Sum</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P6</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the sum of the medians of all good subsequences, mod 998244353.",
                "모든 좋은 부분수열의 중앙값 합을 998244353 으로 나눈 나머지를 출력해요.")}
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
                  {t(E, "A subsequence is ", "부분수열은 ")}
                  <b style={{ color: "#059669" }}>{t(E, "good", "좋은")}</b>
                  {t(E, " when it is ", " 것은 ")}
                  <b style={{ color: "#059669" }}>{t(E, "strictly increasing", "엄격히 증가")}</b>
                  {t(E, " and has ", " 하고 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "odd length", "홀수 길이")}</b>
                  {t(E, ".", " 일 때예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Its ", "그 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "median", "중앙값")}</b>
                  {t(E, " is the middle element (odd length → exactly one middle).", " 은 가운데 원소예요 (홀수 길이 → 가운데가 정확히 하나).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Add up the medians of ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "all good subsequences", "모든 좋은 부분수열의 중앙값")}</b>
                  {t(E, ", mod 998244353.", " 을 더해 998244353 으로 나눈 나머지.")}
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
        "Read the input format and the official example. A=[1,2,4,3] — there are 4 single elements plus [1,2,4] and [1,2,3], and their medians add to 14.",
        "입력 형식과 공식 예제를 봐요. A=[1,2,4,3] — 길이 1 짜리 4개에 [1,2,4], [1,2,3] 이 더해져 중앙값 합이 14 예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "line 1: ", "1번째 줄: ")}<b>N</b> — {t(E, "how many numbers", "숫자 개수")}</div>
              <div>• {t(E, "line 2: ", "2번째 줄: ")}<b>N</b> {t(E, "integers ", "개의 정수 ")}<b>A₀ … A_(N-1)</b></div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ N ≤ 8000, 1 ≤ A_i ≤ 10⁹.", "제약: 1 ≤ N ≤ 8000, 1 ≤ A_i ≤ 10⁹.")}
            </div>
            <div style={{ fontSize: 12.5, color: "#065f46", marginTop: 8, fontWeight: 700 }}>
              {t(E, "Output: the sum of medians, mod 998244353.", "출력: 중앙값의 합을 998244353 으로 나눈 나머지.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>4</div>
              <div>1 2 4 3</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>14</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.6, ...KA }}>
            {t(E,
              "Good subsequences of [1,2,4,3]: [1],[2],[4],[3] (medians 1,2,4,3) and [1,2,4],[1,2,3] (medians 2,2). Sum = 1+2+4+3+2+2 = 14.",
              "[1,2,4,3] 의 좋은 부분수열: [1],[2],[4],[3] (중앙값 1,2,4,3) 과 [1,2,4],[1,2,3] (중앙값 2,2). 합 = 1+2+4+3+2+2 = 14.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Here's the key trick: instead of listing every subsequence, look at each element as the MIDDLE. Pick a center, and count how it can be the median.",
        "핵심 요령이에요: 부분수열을 일일이 나열하는 대신, 각 원소를 '가운데'로 봐요. 가운데를 골라서, 그게 중앙값이 되는 경우를 세요."),
      content: <SubseqMedianSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "In a good (odd-length, strictly increasing) subsequence, the median is the middle element. For v to be that middle, you need the SAME count of increasing values below-and-before v as above-and-after v.",
        "좋은 부분수열(홀수 길이, 순증가)에서 중앙값은 가운데 원소예요. v 가 가운데가 되려면, v 보다 작고-앞선 증가값 개수와 v 보다 크고-뒤선 증가값 개수가 같아야 해요."),
      question: t(E,
        "For A[i]=v to be the median of a good subsequence, what must be true?",
        "A[i]=v 가 좋은 부분수열의 중앙값이 되려면 무엇이 참이어야 할까요?"),
      options: [
        t(E, "Equal numbers of increasing picks on each side: k smaller-before, k larger-after.",
             "양쪽에서 같은 개수의 증가값: 왼쪽(작은 값) k 개, 오른쪽(큰 값) k 개."),
        t(E, "All the other elements must be larger than v.",
             "나머지 원소가 모두 v 보다 커야 해요."),
        t(E, "v must appear at an even index in the array.",
             "v 가 배열에서 짝수 위치에 있어야 해요."),
      ],
      correct: 0,
      explain: t(E,
        "Right! k increasing values < v before it, and k increasing values > v after it, makes a strictly increasing subsequence of length 2k+1 with v exactly in the middle.",
        "맞아요! v 앞에 v 보다 작은 증가값 k 개, v 뒤에 v 보다 큰 증가값 k 개 → 길이 2k+1 의 순증가 부분수열, 가운데가 정확히 v 예요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
     2-1 plan — 🐢 brute limit → 🚀 Fenwick-DP (honest: small inputs only)
     2-2 progressive code
   ═══════════════════════════════════════════════════════════════ */
export function makeSubseqMedianCh2(E, lang = "py") {
  return [
    // 2-1: plan + honest scope note
    {
      type: "reveal",
      narr: t(E,
        "The brute way lists every subsequence — 2^N of them, hopeless past N≈25. The smarter way counts each element as a median with a Fenwick-tree DP. It's correct, but still only fast enough for the small subtasks — the full N=8000 needs a heavier method (out of scope).",
        "브루트포스는 모든 부분수열을 나열해요 — 2^N 개라 N≈25 만 넘어도 불가능. 더 똑똑한 방법은 각 원소를 중앙값으로 세는 펜윅 트리 DP 예요. 정답은 맞지만 작은 서브태스크만 통과할 만큼 빨라요 — 전체 N=8000 은 더 무거운 방법이 필요(범위 밖)."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Brute: list every subsequence", "느림: 모든 부분수열 나열")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "2^N subsequences, checking each for good + median. Fine to confirm small answers, but hopeless once N passes ~25.",
                      "2^N 개의 부분수열을 만들어 좋은지·중앙값을 확인. 작은 답 검증엔 좋지만 N 이 ~25 만 넘어도 불가능.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Smarter: count each element as the median (Fenwick DP)", "더 똑똑히: 각 원소를 중앙값으로 세기 (펜윅 DP)")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "For each v = A[i], count k increasing values < v before and k > v after (level by level with a Fenwick tree). Contribution = v · Σ_k L_k·R_k.",
                      "각 v = A[i] 마다, 앞쪽 v 보다 작은 증가값 k 개와 뒤쪽 v 보다 큰 증가값 k 개를 세요 (펜윅 트리로 레벨별). 기여 = v · Σ_k L_k·R_k.")}
              </div>
            </div>
          </div>

          {/* HONEST scope box — like the reach quest */}
          <div style={{ marginTop: 10, background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 10, padding: "10px 14px", ...KA }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#9a3412", marginBottom: 4 }}>
              ⚠️ {t(E, "Honest about speed", "속도에 대해 솔직히")}
            </div>
            <div style={{ fontSize: 12, color: "#9a3412", lineHeight: 1.6 }}>
              {t(E,
                "This Fenwick-DP is CORRECT, but its worst case is O(N² log N). It comfortably clears the small subtasks (N up to a few hundred), yet TIMES OUT at the full N = 8000.",
                "이 펜윅 DP 는 정답이 맞지만 최악의 경우 O(N² log N) 이에요. 작은 서브태스크(N 수백)는 넉넉히 통과하지만, 전체 N = 8000 에서는 시간 초과예요.")}
              <div style={{ marginTop: 4, fontWeight: 700 }}>
                💡 {t(E,
                  "The full-constraints solution needs CDQ divide-and-conquer + NTT — beyond this quest. Here we learn the correct idea and a correct implementation for small inputs.",
                  "전체 제약 만점 풀이는 CDQ 분할정복 + NTT 가 필요해요 — 이 퀘스트 범위 밖. 여기서는 올바른 아이디어와 작은 입력용 올바른 구현을 배워요.")}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the code, section by section.", "↓ 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. (Correct; small inputs only, as noted.)",
        "풀이 코드 — 부분별로 읽어봐요. (정답, 앞에서 말했듯 작은 입력용.)"),
      sections: getSubseqMedianSections(E),
    },
  ];
}
