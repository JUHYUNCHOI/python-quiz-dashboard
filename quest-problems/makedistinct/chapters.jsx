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
                "모든 원소가 서로 달라지게 만들려면 `+= K` 를 적어도 몇 번 해야 하는지 출력해요.")}
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
                  {t(E, " and an integer K — K may be negative, but it is never 0.",
                       " 와 정수 K 가 주어져요. K 는 음수여도 되지만 0 은 절대 아니에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "In one operation: pick any index i and do ", "한 번 할 때 — 아무 자리 i 를 골라 ")}
                  <b style={{ color: "#0891b2" }}>a[i] += K</b>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You want every element to be ", "모든 원소를 서로 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "distinct (no duplicates)", "다르게 만들어야 해요 (같은 값이 하나도 없게)")}</b>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "더하기를 한 가장 적은 횟수")}</b>
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
              <>Array [4, 1, 4, 1], K = 1.<br />The two 4s collide, and so do the two 1s.<br />Why the answer is 2 — that's the next page.</>,
              <>배열 [4, 1, 4, 1]. K = 1.<br />4 두 개가 겹치고, 1 두 개도 겹쳐요.<br />답이 왜 2 인지는 다음 쪽에서 봐요.</>)}
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
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "array values in [1, N]  ·  all N added together ≤ 1,000,000", "배열 값 [1, N]  ·  N 을 다 더해도 1,000,000 이하")}</div>
            </div>
          </div>
        </div>
      ),
    },

    // 1-3: Worked example with residues
    {
      type: "reveal",
      narr: t(E,
        "Watch [4, 1, 4, 4, 1] with K = 1, smallest first.",
        "[4, 1, 4, 4, 1] 에 K = 1. 작은 수부터 따라가 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
            🔬 {t(E, "Walk through it", "직접 따라가요")}
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: C.text, lineHeight: 1.7 , wordBreak: "keep-all", textWrap: "balance" }}>
            <div><b>{t(E, "Step 1.", "1.")}</b> {t(E, "Sort the group: ", "그룹 정렬: ")}<code style={{ color: "#2563eb" }}>[1, 1, 4, 4, 4]</code></div>
            <div><b>{t(E, "Step 2.", "2.")}</b> {t(E, "The first one stays where it is: ", "첫 값은 그 자리에 그대로 놓아요: ")} <code>1</code> {t(E, " (0 ops)", " (0 회)")}</div>
            <div><b>{t(E, "Step 3.", "3.")}</b> {t(E, "Next is 1, not past 1, so push it to ", "다음이 1, 방금 놓은 1 을 넘지 못하니 밀어요 → ")}<code>2</code> ({t(E, "1 op", "1 회")})</div>
            <div><b>{t(E, "Step 4.", "4.")}</b> {t(E, "Next is 4, already past 2, so keep it: ", "다음 4 는 방금 놓은 2 를 이미 넘었으니 그대로: ")}<code>4</code> {t(E, " (0 ops)", " (0 회)")}</div>
            <div><b>{t(E, "Step 5.", "5.")}</b> {t(E, "Next is 4, not past 4, so push it to ", "다음 4 는 방금 놓은 4 를 넘지 못하니 밀어요 → ")}<code>5</code> ({t(E, "1 op", "1 회")})</div>
            {/* 2026-09-21: 여기까지가 전부였다 — 밀 때마다 **항상 한 번**이었다.
                그래서 코드의 `(cur - vals[i]) // k` 나눗셈이 왜 필요한지 화면이
                한 번도 안 보여줬고, 학생이 그 조각에서 멈췄다 ("그만두고 싶었다").
                예제에 4 를 하나 더 붙여 **한 번에 두 번 미는 경우**를 눈으로 보게 했다. */}
            <div style={{ background: "#fef9c3", borderRadius: 6, padding: "3px 6px", margin: "3px -6px" }}>
              <b>{t(E, "Step 6.", "6.")}</b> {t(E, "Last 4 is not past 5 — one push only reaches 5, so it takes ", "마지막 4 는 방금 놓은 5 를 넘지 못해요. 한 번 밀면 5 라 아직 겹쳐요 → ")}
              <code>6</code> ({t(E, "2 ops at once", "한 번에 2 회")})
            </div>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #93c5fd" }}>
              <b style={{ color: "#15803d" }}>{t(E, "Total: 0 + 1 + 0 + 1 + 2 = 4 ops", "합계: 0 + 1 + 0 + 1 + 2 = 4 회")}</b>
            </div>
          </div>

          <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #93c5fd", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: C.dim, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              <>💡 Each value either stays, or moves just past the one before it.<br />Why start from the smallest? If you moved a bigger one first, the smaller one would still have to climb over it later — the same work, or more.</>,
              <>💡 각 값은 그대로 두거나, 바로 앞에 놓은 값을 막 넘을 만큼만 밀려요.<br />왜 작은 것부터 할까요? 큰 것을 먼저 옮겨 두면 작은 것이 나중에 그 위를 또 넘어야 해서, 일이 같거나 더 늘어나기 때문이에요.</>)}
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
        "a = [5, 3, 5, 4], K = 2. Which numbers can ever land on each other?",
        "a = [5, 3, 5, 4], K = 2. 어떤 수끼리 같은 값이 될 수 있을까요?"),
      options: [
        t(E, "Only 5, 3, 5 — the 4 is on its own", "5, 3, 5 끼리만. 4 는 혼자예요"),
        t(E, "4 and 5 can meet too", "4 와 5 도 만날 수 있어요"),
        t(E, "All four can meet each other", "네 수 모두 서로 만날 수 있어요"),
      ],
      correct: 0,
      explain: t(E,
        "Right.\nAdding 2 keeps odd numbers odd and even numbers even, so 4 can never become 5, 3 or 5.\nSame remainder when divided by 2 = they can meet. Different remainder = they never can.\nSo we split the numbers by that remainder and solve each pile on its own.",
        "맞아요.\n2 를 더하면 홀수는 계속 홀수, 짝수는 계속 짝수예요. 그래서 4 는 5·3·5 가 될 수 없어요.\n2 로 나눈 나머지가 같으면 만날 수 있고, 나머지가 다르면 영영 못 만나요.\n그래서 나머지끼리 따로 묶어서, 묶음마다 따로 풀면 돼요."),
    },

    // 1-5: Input — direction-only hint
    {
      type: "input",
      narr: t(E,
        "Now K is negative. Work it out yourself.",
        "이번엔 K 가 음수예요. 직접 풀어봐요."),
      question: t(E,
        "a = [3, 3, 4, 4], K = -2. Minimum ops?",
        "a = [3, 3, 4, 4], K = -2. 최소 횟수는?"),
      hint: t(E,
        "K is negative — which way does a push move a value? And which of these four can ever meet?",
        "K 가 음수면 밀 때 값이 어느 쪽으로 갈까요? 그리고 이 넷 중 어떤 수끼리 만날 수 있을까요?"),
      answer: 2,
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
