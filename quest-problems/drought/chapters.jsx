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
        "FJ has N cows in a row, each with some hunger level.\nIn one operation, you pick a pair of adjacent cows and reduce BOTH of their hunger levels by 1 (only if both ≥ 1).\nYou want every cow to end at hunger 0 — find the minimum number of operations, or print -1 if impossible.",
        "FJ에게 한 줄로 선 N마리 소가 있고, 각 소는 배고픔 수치를 가져요.\n한 번의 연산으로 인접한 두 소를 골라 둘의 배고픔을 동시에 1씩 줄여요 (둘 다 ≥ 1일 때만).\n모든 소를 배고픔 0으로 만드는 최소 연산 횟수를 출력해요. 불가능하면 -1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfdc\ufe0f"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Drought</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2022 Bronze #3</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "N cows in a row", "한 줄로 선 N마리 소")}</b>
                  {t(E, ", each with a hunger value ", "가 있고, 각 소는 배고픔 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h[i]</code>
                  {t(E, ".", " 를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation: pick ", "한 번의 연산: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "two adjacent cows i, i+1", "인접한 두 소 i, i+1")}</b>
                  {t(E, " and reduce ", "을 골라 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "both hungers by 1", "둘의 배고픔을 1씩 감소")}</b>
                  {t(E, " (allowed only if both are ≥ 1).",
                        " (둘 다 ≥ 1 일 때만 가능).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Goal: ", "목표: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "make every cow's hunger equal 0", "모든 소의 배고픔을 0으로 만들기")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "최소 연산 횟수")}</b>
                  {t(E, ", or ", " 를 출력해요. 불가능하면 ")}
                  <b style={{ color: "#dc2626" }}>-1</b>
                  {t(E, " if impossible.", ".")}
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
        "For each candidate final value t (0 to min(a)), compute d[i] = a[i] − t. Walk left to right: pair (i, i+1) MUST be fed exactly d[i] times to zero a[i], so d[i+1] -= d[i]. If any d goes negative or last d ≠ 0, this t is impossible.",
        "가능한 최종 값 t (0 부터 min(a)) 마다 d[i] = a[i] − t 계산. 왼쪽부터 오른쪽: 쌍 (i, i+1) 은 a[i] 를 0 으로 만들기 위해 정확히 d[i] 번 먹여야 하니 d[i+1] -= d[i]. d 가 음수가 되거나 마지막 d ≠ 0 이면 그 t 는 불가능."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Try every target t in 0..min(a)", "가능한 t 마다 시도 (0..min(a))"), code: "for t in range(min(a)+1): ...", color: "#d97706" },
              { n: 2, label: t(E, "Compute initial deficits", "초기 부족분 계산"), code: "d = [a[i] − t for i in range(N)]", color: "#0891b2" },
              { n: 3, label: t(E, "Greedy left → right", "왼→오 그리디"), code: "for i in range(N−1): if d[i]<0: fail; ops += d[i]; d[i+1] −= d[i]", color: "#7c3aed" },
              { n: 4, label: t(E, "Check final, take min ops", "마지막 검사, 최소 ops 채택"), code: "if d[N−1] == 0: best = min(best, ops)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(N · max_val)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "for each candidate t, scan N cows", "t 후보마다 N마리 스캔")}</div>
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
