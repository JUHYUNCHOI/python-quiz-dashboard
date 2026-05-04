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
        "Two barns each have 10 buckets of milk (1000 gallons total per barn). Over 4 days, FJ and his sister alternate carrying ONE bucket between barns: day 1 FJ moves one from barn 1 → 2, day 2 sister moves one from barn 2 → 1, day 3 FJ again, day 4 sister.\nCount the number of DISTINCT possible total milk amounts in barn 1 after the 4 days.",
        "두 헛간에 각각 10개의 우유 양동이가 있어요 (헛간당 총 1000 갤런). 4일 동안 FJ 와 동생이 번갈아 양동이를 1개씩 옮겨요: 1일차 FJ 가 헛간 1 → 2 로 1개, 2일차 동생이 헛간 2 → 1 로 1개, 3일차 FJ, 4일차 동생.\n4일 후 헛간 1 에 남은 가능한 우유 총량의 서로 다른 값의 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"🔄"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Back and Forth</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2018 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two barns each have ", "두 헛간에 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "10 buckets of milk", "각 10개의 우유 양동이")}</b>
                  {t(E, " (1000 gallons total per barn). Each bucket has its own amount.",
                        " 가 있어요 (헛간당 총 1000 갤런). 양동이마다 양이 정해져 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Over ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "4 days, FJ and his sister alternate", "4일 동안 FJ 와 동생이 번갈아")}</b>
                  {t(E, ": day 1 FJ moves a bucket 1→2, day 2 sister moves one 2→1, day 3 FJ, day 4 sister.",
                        ": 1일차 FJ 가 양동이 1개 1→2, 2일차 동생이 1개 2→1, 3일차 FJ, 4일차 동생.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of distinct possible total milk amounts in barn 1 after 4 days", "4일 후 헛간 1 의 가능한 우유 총량 (서로 다른 값) 의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If all 10 buckets in each barn have the same amount s, then every day we transfer exactly s.\nAfter 4 days (2 out, 2 back), barn 1 = 1000 - s + s - s + s = 1000.\nOnly 1 outcome!", "각 헛간의 10개 양동이가 모두 같은 양 s이면, 매일 정확히 s를 이동해요.\n4일 후 (2번 보내고 2번 받으면), 헛간1 = 1000 - s + s - s + s = 1000.\n결과 1개!"),
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
        "All buckets have the same amount. How many distinct final amounts for barn 1?", "모든 양동이가 같은 양이예요. 헛간 1의 고유 최종 우유량은 몇 가지?"),
      question: t(E,
        "All identical buckets. Distinct outcomes for barn 1?",
        "모든 양동이 동일. 헛간 1의 고유 결과 수?"),
      hint: t(E,
        "Same bucket sizes means same transfer every time. Always returns to 1000.",
        "같은 크기 양동이 = 매번 같은 이동량. 항상 1000으로 돌아와요."),
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
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Day 1: 10 choices from barn1.\nDay 2: 11 choices from barn2 (got 1 extra). Day 3: 11 from barn1. Day 4: 11 from barn2. Total ~13,310 combinations.",
              "1일차: 헛간1에서 10개 선택.\n2일차: 헛간2에서 11개 (1개 추가). 3일차: 헛간1에서 11개.\n4일차: 헛간2에서 11개.\n총 ~13,310 조합.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBackForthSections(E),
    },
  ];
}
