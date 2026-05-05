import { C, t } from "@/components/quest/theme";
import { getCowTipSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "grid = []",
  "for _ in range(N):",
  "    grid.append(list(map(int, list(input().strip()))))",
  "",
  "ans = 0",
  "# Process from bottom-right to top-left",
  "for i in range(N-1, -1, -1):",
  "    for j in range(N-1, -1, -1):",
  "        if grid[i][j] == 1:",
  "            ans += 1",
  "            # Toggle rectangle (0,0)-(i,j)",
  "            for r in range(i+1):",
  "                for c in range(j+1):",
  "                    grid[r][c] ^= 1",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowTipCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has an N×N grid of 0s and 1s — each cow is either upright (0) or tipped over (1). One operation: pick any cell (i, j) and FLIP every cell in the rectangle from (0, 0) to (i, j).\nFind the MINIMUM number of operations to turn the whole grid into all 0s.",
        "FJ에게 0과 1로 채워진 N×N 격자가 있어요 — 각 소는 서있거나(0) 쓰러진(1) 상태예요. 한 번의 연산: 칸 (i, j)를 골라 (0, 0)부터 (i, j)까지의 직사각형 전체를 뒤집기.\n격자를 모두 0으로 만드는 최소 연산 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Cow Tipping</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has an ", "FJ에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N×N grid of 0s and 1s", "0과 1로 채워진 N×N 격자")}</b>
                  {t(E, " — each cow is either upright (0) or tipped over (1).",
                        " 가 있어요 — 각 소는 서있거나(0) 쓰러진(1) 상태예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation: pick any cell ", "한 번의 연산: 칸 ")}
                  <b style={{ color: "#7c3aed" }}>(i, j)</b>
                  {t(E, " and ", "을 골라 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "FLIP every cell in the rectangle (0, 0) to (i, j)", "(0, 0) ~ (i, j) 의 직사각형 안 모든 칸을 뒤집기")}</b>
                  {t(E, " (0 ↔ 1).", " (0 ↔ 1).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "필요한 최소 연산 횟수")}</b>
                  {t(E, " to turn the whole grid into all 0s.",
                        " 를 출력해요. 격자를 모두 0으로 만드는 데.")}
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
        "Consider grid [[1,0],[0,1]].\nProcess (1,1): it's 1, toggle (0,0)-(1,1).\nThen (1,0) and (0,1) need fixing.\nHow many total operations?", "격자 [[1,0],[0,1]]을 생각해봐요. (1,1) 처리: 1이니까 (0,0)-(1,1) 토글. 그 다음 (1,0)과 (0,1)도 고쳐야 해요. 총 몇 번?"),
      question: t(E,
        "Grid [[1,0],[0,1]]: how many toggle operations needed?",
        "격자 [[1,0],[0,1]]: 토글 연산 몇 번 필요?"),
      options: [
        t(E, "2 operations", "2번"),
        t(E, "3 operations", "3번"),
        t(E, "4 operations", "4번"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Toggle (0,0)-(1,1), then (0,0)-(0,1), then (0,0)-(1,0). 3 operations total.",
        "맞아! (0,0)-(1,1) 토글, (0,0)-(0,1) 토글, (0,0)-(1,0) 토글. 총 3번이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For grid [[1,0],[0,1]], we showed 3 operations are needed. Enter that number.", "격자 [[1,0],[0,1]]에서 3번 연산이 필요하다고 했어. 그 숫자를 입력해요."),
      question: t(E,
        "Grid [[1,0],[0,1]]: minimum toggles?",
        "격자 [[1,0],[0,1]]: 최소 토글 횟수?"),
      hint: t(E,
        "Process bottom-right to top-left: (1,1) is 1 -> toggle, (1,0) becomes 1 -> toggle, (0,1) becomes 1 -> toggle.",
        "오른쪽 아래부터: (1,1)=1 -> 토글, (1,0)=1 -> 토글, (0,1)=1 -> 토글."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowTipCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Process cells from BOTTOM-RIGHT to TOP-LEFT. If a cell is 1, the only operation that can flip it without disturbing already-fixed cells is the toggle of the rectangle (0,0)–(i,j) — so we must do it. Count those forced operations.",
        "오른쪽 아래에서 왼쪽 위 순서로 처리해요. 어떤 칸이 1 이면, 이미 고정된 칸들을 건드리지 않고 그 칸을 뒤집을 수 있는 유일한 연산은 사각형 (0,0)~(i,j) 토글 — 따라서 무조건 해야 해요. 그렇게 강제되는 연산의 수를 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Iterate bottom-right → top-left", "오른쪽 아래 → 왼쪽 위 순회"), code: "for i in range(N-1, -1, -1):  for j in range(N-1, -1, -1): ...", color: "#059669" },
              { n: 2, label: t(E, "If cell is 1, toggle rect (0,0)-(i,j)", "칸이 1 이면 사각형 (0,0)-(i,j) 토글"), code: "if grid[i][j] == 1:", color: "#7c3aed" },
              { n: 3, label: t(E, "Flip every cell in that rect", "그 사각형 안 모든 칸 뒤집기"), code: "for r in range(i+1):  for c in range(j+1): grid[r][c] ^= 1", color: "#0891b2" },
              { n: 4, label: t(E, "Count operations", "연산 수 세기"), code: "ops += 1;  print(ops)", color: "#dc2626" },
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
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(N⁴)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N² cells × N² per toggle (N ≤ 10 so fast)", "N² 칸 × 토글당 N² (N ≤ 10 라 빠름)")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getCowTipSections(E),
    },
  ];
}
