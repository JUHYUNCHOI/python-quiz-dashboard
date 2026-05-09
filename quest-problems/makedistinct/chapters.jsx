import { C, t } from "@/components/quest/theme";
import { getMakeDistinctSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "def solve():",
  "    n, k = map(int, input().split())",
  "    a = list(map(int, input().split()))",
  "    m = abs(k)",
  "    groups = {}",
  "    for x in a:",
  "        groups.setdefault(x % m, []).append(x)",
  "    total = 0",
  "    for vals in groups.values():",
  "        vals.sort(reverse=(k < 0))",
  "        cur = vals[0]",
  "        for i in range(1, len(vals)):",
  "            if (k > 0 and vals[i] > cur) or (k < 0 and vals[i] < cur):",
  "                cur = vals[i]",
  "            else:",
  "                cur = cur + k",
  "                total += (cur - vals[i]) // k",
  "    print(total)",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    solve()",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMakeDistinctCh1 (5 steps: reveal / reveal / reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeMakeDistinctCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "You have N numbers. In one move you pick any element and add K to it (K can be negative). Find the minimum number of moves so that all N elements are distinct.",
        "수 N 개가 있어요. 한 번에 아무 원소나 골라 K 를 더할 수 있어요 (K 는 음수도 가능). 모든 원소가 서로 달라지게 하는 최소 횟수를 구해요."),
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
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Print the minimum number of `+= K` operations to make every element distinct.",
                "모든 원소가 서로 달라지게 만드는 `+= K` 연산의 최소 횟수를 출력.")}
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

          <div style={{ background: "#fff", border: "1px dashed #93c5fd", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: C.text, lineHeight: 1.6 }}>
            {t(E,
              "Array [4, 1, 4, 1]. K = 1. The two 4s and the two 1s collide. Push one 1 → 2 (1 op) and push one 4 → 5 (1 op). Now [4, 2, 5, 1] is distinct. Total = 2.",
              "배열 [4, 1, 4, 1]. K = 1. 4 두 개, 1 두 개가 겹쳐요. 1 하나를 → 2 로 (1 회), 4 하나를 → 5 로 (1 회) 밀면 [4, 2, 5, 1] 로 모두 달라요. 합 = 2.")}
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: C.dim }}>
            {t(E, "First line is T (number of test cases).", "첫 줄 T 는 테스트케이스 개수.")}
          </div>
        </div>
      ),
    },

    // 1-3: Worked example with residues
    {
      type: "reveal",
      narr: t(E,
        "Watch [4, 1, 4, 1] with K=1. Adding 1 never changes oddness — so all four numbers are 'in the same family' and have to share consecutive slots starting from the smallest.",
        "[4, 1, 4, 1] 에 K=1 을 적용해 봐요. 1 을 더해도 짝/홀이 안 바뀌어요 — 그래서 네 수가 같은 '가족' 이고, 가장 작은 수부터 한 칸씩 채워야 해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
            🔬 {t(E, "Walk through it", "직접 따라가요")}
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
            <div><b>{t(E, "Step 1.", "1.")}</b> {t(E, "Sort the group: ", "그룹 정렬: ")}<code style={{ color: "#2563eb" }}>[1, 1, 4, 4]</code></div>
            <div><b>{t(E, "Step 2.", "2.")}</b> {t(E, "First slot stays: ", "첫 칸은 그대로: ")} <code>m₀ = 1</code> {t(E, " (0 ops)", " (0 회)")}</div>
            <div><b>{t(E, "Step 3.", "3.")}</b> {t(E, "Next is 1, not > 1, so push to ", "다음이 1, > 1 이 아니니 밀어요 → ")}<code>m₁ = 2</code> ({t(E, "1 op", "1 회")})</div>
            <div><b>{t(E, "Step 4.", "4.")}</b> {t(E, "Next is 4 > 2, keep it: ", "다음 4 > 2, 그대로: ")}<code>m₂ = 4</code> {t(E, " (0 ops)", " (0 회)")}</div>
            <div><b>{t(E, "Step 5.", "5.")}</b> {t(E, "Next is 4, not > 4, push to ", "다음 4, > 4 가 아니니 밀어요 → ")}<code>m₃ = 5</code> ({t(E, "1 op", "1 회")})</div>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #93c5fd" }}>
              <b style={{ color: "#15803d" }}>{t(E, "Total: 0 + 1 + 0 + 1 = 2 ops", "합계: 0 + 1 + 0 + 1 = 2 회")}</b>
            </div>
          </div>

          <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #93c5fd", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "💡 Each value either stays or gets bumped to (previous + K). Sorting first makes the greedy obviously optimal.",
              "💡 각 값은 그대로 두거나 (이전값 + K) 로 한 번에 밀어요. 정렬을 먼저 하면 그리디가 자연스럽게 최적이에요.")}
          </div>
        </div>
      ),
    },

    // 1-4: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Same trick: a = [4, 1, 4, 1], K = 1. After sorting → [1, 1, 4, 4]. How many ops to make them distinct?",
        "같은 방식: a = [4, 1, 4, 1], K = 1. 정렬 → [1, 1, 4, 4]. 모두 다르게 하려면 몇 회?"),
      question: t(E,
        "a = [4, 1, 4, 1], K = 1. Minimum ops?",
        "a = [4, 1, 4, 1], K = 1. 최소 횟수는?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
        t(E, "4", "4"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Push one 1 → 2, push one 4 → 5. Total = 2.",
        "정답! 1 하나를 → 2 로, 4 하나를 → 5 로 밀면 합 = 2."),
    },

    // 1-5: Input — direction-only hint
    {
      type: "input",
      narr: t(E,
        "Try K negative. a = [1, 1, 2], K = -1. After grouping (all share residue 0 mod 1), sort descending → [2, 1, 1]. How many ops?",
        "K 가 음수일 때. a = [1, 1, 2], K = -1. 잔여류로 묶고 (모두 1 로 나눈 나머지 0) 내림차순 정렬 → [2, 1, 1]. 몇 회?"),
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
    {
      type: "progressive",
      narr: t(E,
        "Group by residue mod |K|, sort, greedy push to next valid slot. Sections build it one piece at a time.",
        "잔여류로 묶고, 정렬, 한 칸씩 다음 빈 자리로 밀어. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMakeDistinctSections(E),
    },
  ];
}
