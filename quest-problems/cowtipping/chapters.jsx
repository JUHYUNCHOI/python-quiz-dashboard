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
        "Given an N x N grid of 0s and 1s, you can toggle all cells in any upper-left rectangle (from (0,0) to (i,j)).\nFind the minimum number of toggles to make everything 0.", "N x N 격자에 0과 1이 있어요.\n(0,0)에서 (i,j)까지의 왼쪽 위 직사각형의 모든 셀을 토글할 수 있어요.\n모든 셀을 0으로 만드는 최소 토글 횟수를 구해요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Cow Tipping</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Process from bottom-right to top-left.\nIf cell (i,j) is 1, we MUST toggle rectangle (0,0)-(i,j). This greedy approach gives the minimum.",
              "핵심: 오른쪽 아래에서 왼쪽 위로 처리.\n셀 (i,j)가 1이면 직사각형 (0,0)-(i,j)를 반드시 토글해야 해요.\n이 그리디가 최솟값을 줘요.")}
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
        "맞아! (0,0)-(1,1) 토글, (0,0)-(0,1) 토글, (0,0)-(1,0) 토글. 총 3번이예요."),
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
        "Process each cell from bottom-right.\nIf it's 1, toggle the entire upper-left rectangle.\nO(N^4) in worst case but N <= 10 so it's fine.", "오른쪽 아래부터 각 셀을 처리. 1이면 왼쪽 위 전체 직사각형을 토글. 최악 O(N^4)이지만 N <= 10이라 괜찮아."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N^4)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Greedy from bottom-right: each cell determines if a toggle is needed.\nThe toggle affects O(N^2) cells. Total: O(N^2) cells x O(N^2) per toggle = O(N^4). N <= 10 makes this fast.",
              "오른쪽 아래에서 그리디: 각 셀이 토글 필요 여부 결정.\n토글은 O(N^2) 셀에 영향.\n총: O(N^2) 셀 x O(N^2) 토글 = O(N^4). N <= 10이라 빨라요.")}
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
