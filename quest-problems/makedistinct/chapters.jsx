import { C, t } from "@/components/quest/theme";
import { getMakeDistinctSections, getMakeDistinctWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMakeDistinctCh1 (5 steps: reveal / reveal / reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeMakeDistinctCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Numbers, and one move: add K. Make them all different.",
        "수들에 K 를 더해서 전부 다르게 만드는 문제예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔢"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Make All Distinct</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2026 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 , wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "Print the minimum number of `+= K` operations to make every element distinct.",
                "모든 원소가 서로 달라지게 만드는 `+= K` 연산의 최소 횟수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given an array ", "배열 ")}
                  <b style={{ color: "#2563eb" }}>a[0..N-1]</b>
                  {t(E, " and an integer K (K can be negative, but K ≠ 0).",
                       " 와 정수 K 가 주어져요 (K 는 음수도 가능, 단 K ≠ 0).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "In one operation: pick any index i and do ", "한 연산으로 — 아무 인덱스 i 를 골라 ")}
                  <b style={{ color: "#0891b2" }}>a[i] += K</b>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You want every element to be ", "모든 원소가 서로 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "distinct (no duplicates)", "다르게 (중복 없이)")}</b>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "최소 연산 횟수")}</b>
                  {t(E, ".", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Here's one sample. N=4 numbers and K=1. Look at how the answer 2 comes from making the duplicates step apart.",
        "샘플 하나. N=4, K=1. 답 2 가 어떻게 중복을 떨어뜨리며 나오는지 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
            📥 {t(E, "Sample I/O", "샘플 입출력")}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontSize: 11, color: "#1e3a8a", fontWeight: 700, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#1f2937" }}>{`1
4 1
4 1 4 1`}</pre>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #86efac", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontSize: 11, color: "#15803d", fontWeight: 700, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#1f2937" }}>{`2`}</pre>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px dashed #93c5fd", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: C.text, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>Array [4, 1, 4, 1], K = 1.<br />The two 4s and the two 1s collide.<br />Push one 1 → 2, push one 4 → 5 → [4, 2, 5, 1], all distinct.<br />Total = 1 + 1 = 2.</>,
              <>배열 [4, 1, 4, 1]. K = 1.<br />4 두 개, 1 두 개가 겹쳐요.<br />1 하나를 → 2 로, 4 하나를 → 5 로 밀면 [4, 2, 5, 1] — 모두 달라요.<br />합 = 1 + 1 = 2 회.</>)}
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: C.dim }}>
            {t(E, "First line is T (number of test cases).", "첫 줄 T 는 테스트케이스 개수.")}
          </div>

          {/* 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화 */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 10</div>
              <div>1 ≤ N ≤ 200,000 (= 2 × 10⁵)</div>
              <div>−N ≤ K ≤ N,  K ≠ 0</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "array values in [1, N]  ·  sum of N ≤ 10⁶", "배열 값 [1, N]  ·  N 합 ≤ 10⁶")}</div>
            </div>
          </div>
        </div>
      ),
    },

    // 1-3: Worked example with residues
    {
      type: "reveal",
      narr: t(E,
        "Watch [4, 1, 4, 1] with K = 1, smallest first.",
        "[4, 1, 4, 1] 에 K = 1. 작은 수부터 따라가 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
            🔬 {t(E, "Walk through it", "직접 따라가요")}
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: C.text, lineHeight: 1.7 , wordBreak: "keep-all", textWrap: "balance" }}>
            <div><b>{t(E, "Step 1.", "1.")}</b> {t(E, "Sort the group: ", "그룹 정렬: ")}<code style={{ color: "#2563eb" }}>[1, 1, 4, 4]</code></div>
            <div><b>{t(E, "Step 2.", "2.")}</b> {t(E, "First slot stays: ", "첫 칸은 그대로: ")} <code>m₀ = 1</code> {t(E, " (0 ops)", " (0 회)")}</div>
            <div><b>{t(E, "Step 3.", "3.")}</b> {t(E, "Next is 1, not > 1, so push to ", "다음이 1, > 1 이 아니니 밀어요 → ")}<code>m₁ = 2</code> ({t(E, "1 op", "1 회")})</div>
            <div><b>{t(E, "Step 4.", "4.")}</b> {t(E, "Next is 4 > 2, keep it: ", "다음 4 > 2, 그대로: ")}<code>m₂ = 4</code> {t(E, " (0 ops)", " (0 회)")}</div>
            <div><b>{t(E, "Step 5.", "5.")}</b> {t(E, "Next is 4, not > 4, push to ", "다음 4, > 4 가 아니니 밀어요 → ")}<code>m₃ = 5</code> ({t(E, "1 op", "1 회")})</div>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #93c5fd" }}>
              <b style={{ color: "#15803d" }}>{t(E, "Total: 0 + 1 + 0 + 1 = 2 ops", "합계: 0 + 1 + 0 + 1 = 2 회")}</b>
            </div>
          </div>

          <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #93c5fd", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: C.dim, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>💡 Each value either stays, or moves up to (previous + K).<br />Sorting first makes this the best possible.</>,
              <>💡 각 값은 그대로 두거나 이전값 + K 로 밀려요.<br />정렬을 먼저 하면 이 방법이 항상 최적이에요.</>)}
          </div>
        </div>
      ),
    },

    // 1-4: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Now K = 2. Which numbers can ever collide?",
        "이번엔 K = 2 예요. 어떤 수끼리 부딪힐 수 있을까요?"),
      question: t(E,
        "a = [5, 3, 5, 4], K = 2. Minimum ops?",
        "a = [5, 3, 5, 4], K = 2. 최소 횟수는?"),
      options: [
        t(E, "0", "0"),
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Right — 1.\nAdding 2 keeps odd numbers odd and even numbers even.\nSo 4 can never collide with 5, 3, 5 — it is on its own.\nOnly [3, 5, 5] matters: push one 5 up to 7. That is 1 op.",
        "정답 — 1 회예요.\n2 를 더하면 홀수는 계속 홀수, 짝수는 계속 짝수예요.\n그래서 4 는 5, 3, 5 와 절대 안 부딪혀요. 혼자예요.\n볼 건 [3, 5, 5] 뿐이에요 — 5 하나를 7 로 밀면 끝. 1 회."),
    },

    // 1-5: Input — direction-only hint
    {
      type: "input",
      narr: t(E,
        "Now K is negative. Work it out yourself.",
        "이번엔 K 가 음수예요. 직접 풀어봐요."),
      question: t(E,
        "a = [1, 1, 2], K = -1. Minimum ops?",
        "a = [1, 1, 2], K = -1. 최소 횟수는?"),
      hint: t(E,
        "K is negative, so each push moves DOWN. Sort descending and walk left-to-right.",
        "K 가 음수라서 밀면 값이 작아져요. 내림차순으로 정렬하고 왼쪽부터 살펴봐요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeMakeDistinctCh2 (1 step: progressive)
   ═══════════════════════════════════════════════════════════════ */
export function makeMakeDistinctCh2(E, lang = "py") {
  return [
    /* 코드 위 '왜 이렇게?' 노트 벽 → 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getMakeDistinctWalk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "Group by residue, sort, greedy-push.  Each part lights up with a bubble — read them in order.",
          "나머지로 묶고, 정렬하고, 앞에서부터 하나씩 밀어요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#2563eb" />),
      };
    })(),
  ];
}
