import { C, t } from "@/components/quest/theme";
import { getDroughtSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "# Try all possible target values t",
  "# t must have same parity constraints",
  "# Process left to right: feed pairs to reduce",
  "",
  "def solve(a, target):",
  "    n = len(a)",
  "    d = [x - target for x in a]",
  "    if any(x < 0 for x in d):",
  "        return -1",
  "    ops = 0",
  "    for i in range(n - 1):",
  "        if d[i] < 0:",
  "            return -1",
  "        # feed pair (i, i+1) d[i] times",
  "        ops += d[i]",
  "        d[i+1] -= d[i]",
  "        d[i] = 0",
  "    if d[n-1] != 0:",
  "        return -1",
  "    return ops",
  "",
  "best = -1",
  "for target in range(min(a) + 1):",
  "    # Check parity",
  "    res = solve(a[:], target)",
  "    if res != -1:",
  "        if best == -1 or res < best:",
  "            best = res",
  "",
  "print(best)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDroughtCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows in a line.\nYou can feed adjacent pairs: both decrease by 1.\nMake all cows equal with minimum operations, or report impossible.", "N마리 소가 줄 서 있어요. 인접한 쌍에게 먹이를 줄 수 있어: 둘 다 1 감소. 최소 횟수로 모든 소를 같게 만들거나, 불가능하면 보고해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udfdc\ufe0f"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Drought</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2022 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Process left to right.\nFor each target value, greedily reduce from left. The leftmost cow determines how many times to feed pair (0,1), which affects cow 1, and so on.",
              "핵심: 왼쪽에서 오른쪽으로 처리.\n각 목표값에 대해 왼쪽부터 그리디하게 줄여.\n맨 왼쪽 소가 쌍(0,1)의 먹이 횟수를 결정하고, 이것이 소 1에 영향을 줘요.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's think about [2, 2].\nWe can feed pair (0,1) to decrease both.\nTarget 0 needs 2 feeds.", "[2, 2]를 생각해보자. 쌍(0,1)에 먹이를 줘서 둘 다 줄일 수 있어요. 목표 0이면 2번 먹이를 줘야 해요."),
      question: t(E,
        "[2, 2]: feeding pair (0,1) twice gives [0, 0]. How many operations?",
        "[2, 2]: 쌍(0,1)에 2번 먹이 주면 [0, 0]. 몇 번의 연산?"),
      options: [
        t(E, "2 operations", "2번"),
        t(E, "4 operations", "4번"),
        t(E, "1 operation", "1번"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Each feed of pair (0,1) is one operation. We need 2 to reach [0,0].",
        "맞아! 쌍(0,1)에 먹이 주는 것이 1번 연산. [0,0]에 도달하려면 2번 필요해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "[2, 2] needs how many operations to make all equal?", "[2, 2]를 모두 같게 만드는 최소 연산 횟수는?"),
      question: t(E,
        "a = [2, 2]. Min operations to make all equal?",
        "a = [2, 2]. 모두 같게 만드는 최소 연산 횟수?"),
      hint: t(E,
        "Feed pair (0,1) twice: [2,2] -> [1,1] -> [0,0]. Answer: 2.",
        "쌍(0,1)에 2번 먹이: [2,2] -> [1,1] -> [0,0]. 답: 2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDroughtCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Try all possible target values (0 to min).\nFor each, greedily process left to right.\nO(N * max_value).", "가능한 모든 목표값(0부터 최솟값까지) 시도. 각각 왼쪽에서 오른쪽으로 그리디 처리. O(N * 최댓값)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(N * max_val)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "For each target t, compute d[i] = a[i] - t.\nProcess left to right: feed pair (i, i+1) exactly d[i] times, then d[i+1] -= d[i]. If any d goes negative or last d != 0, impossible.",
              "각 목표 t에 대해 d[i] = a[i] - t 계산.\n왼→오 처리: 쌍(i, i+1)에 d[i]번 먹이, d[i+1] -= d[i]. d가 음수가 되거나 마지막 d != 0이면 불가능.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getDroughtSections(E),
    },
  ];
}
