import { C, t } from "@/components/quest/theme";
import { getBackForthSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "barn1 = list(map(int, input().split()))",
  "barn2 = list(map(int, input().split()))",
  "",
  "# Day 1: barn1 -> barn2 (pick one of 10 buckets from barn1)",
  "# Day 2: barn2 -> barn1 (pick one of 10 buckets from barn2)",
  "# Day 3: barn1 -> barn2 (pick one of 10 buckets from barn1)",
  "# Day 4: barn2 -> barn1 (pick one of 10 buckets from barn2)",
  "",
  "def solve(b1, b2):",
  "    # Try all 10^4 combos with sets",
  "    # After day1: move bucket from b1 to b2",
  "    states = set()",
  "    for i in range(10):            # day 1: b1[i] to barn2",
  "        nb1 = list(b1); nb2 = list(b2)",
  "        v = nb1.pop(i); nb2.append(v)",
  "        for j in range(11):        # day 2: nb2[j] to barn1",
  "            nb1b = list(nb1); nb2b = list(nb2)",
  "            v2 = nb2b.pop(j); nb1b.append(v2)",
  "            for k in range(11):    # day 3: nb1b[k] to barn2",
  "                nb1c = list(nb1b); nb2c = list(nb2b)",
  "                v3 = nb1c.pop(k); nb2c.append(v3)",
  "                for l in range(11):  # day 4: nb2c[l] to barn1",
  "                    nb1d = list(nb1c); nb2d = list(nb2c)",
  "                    v4 = nb2d.pop(l); nb1d.append(v4)",
  "                    states.add(sum(nb1d))",
  "    return len(states)",
  "",
  "print(solve(barn1, barn2))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBackForthCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "2 barns with 10 buckets each (1000 total milk per barn).\nOver 4 days, alternate carrying one bucket between barns.\nCount distinct possible final amounts in barn 1.", "각 10개 양동이를 가진 2개의 헛간 (헛간당 총 우유 1000). 4일 동안 번갈아 양동이 하나를 옮겨. 헛간 1의 가능한 최종 우유량의 수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"🔄"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Back and Forth</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2018 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Enumerate all possible choices! 10 choices per day, 4 days. But bucket counts change each day. Use brute force / recursion with sets to track distinct outcomes.",
              "핵심: 가능한 모든 선택을 열거해! 하루 10개 선택, 4일. 하지만 양동이 수가 매일 변해. 브루트 포스 / 재귀 + set으로 고유한 결과 추적.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If all 10 buckets in each barn have the same amount s, then every day we transfer exactly s.\nAfter 4 days (2 out, 2 back), barn 1 = 1000 - s + s - s + s = 1000.\nOnly 1 outcome!", "각 헛간의 10개 양동이가 모두 같은 양 s이면, 매일 정확히 s를 이동해.\n4일 후 (2번 보내고 2번 받으면), 헛간1 = 1000 - s + s - s + s = 1000.\n결과 1개!"),
      question: t(E,
        "All buckets same size s. After 4 days of back and forth, how many distinct outcomes for barn 1?",
        "모든 양동이 크기 같으면 s. 4일간 왕복 후 헛간 1의 고유 결과 수?"),
      options: [
        t(E, "1 - always back to 1000", "1 - 항상 1000으로 돌아와"),
        t(E, "4 - one per day", "4 - 하루에 하나"),
        t(E, "10 - one per bucket", "10 - 양동이당 하나"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! If all buckets are identical, every transfer moves the same amount. Barn 1 always ends at 1000. Only 1 distinct outcome.",
        "맞아! 모든 양동이가 동일하면 매번 같은 양을 옮겨. 헛간 1은 항상 1000으로 끝나. 고유 결과 1개."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "All buckets have the same amount. How many distinct final amounts for barn 1?", "모든 양동이가 같은 양이야. 헛간 1의 고유 최종 우유량은 몇 가지?"),
      question: t(E,
        "All identical buckets. Distinct outcomes for barn 1?",
        "모든 양동이 동일. 헛간 1의 고유 결과 수?"),
      hint: t(E,
        "Same bucket sizes means same transfer every time. Always returns to 1000.",
        "같은 크기 양동이 = 매번 같은 이동량. 항상 1000으로 돌아와."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBackForthCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Brute force all 10 * 11 * 11 * 11 possibilities (bucket count grows each day).\nUse a set to collect distinct barn 1 totals.", "10 * 11 * 11 * 11가지 가능성을 브루트 포스. 매일 양동이 수가 증가. set으로 헛간 1 총량의 고유값 수집."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>{"O(10 \u00B7 11\u00B3)"}</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Day 1: 10 choices from barn1. Day 2: 11 choices from barn2 (got 1 extra). Day 3: 11 from barn1. Day 4: 11 from barn2. Total ~13,310 combinations.",
              "1일차: 헛간1에서 10개 선택. 2일차: 헛간2에서 11개 (1개 추가). 3일차: 헛간1에서 11개. 4일차: 헛간2에서 11개. 총 ~13,310 조합.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getBackForthSections(E),
    },
  ];
}
