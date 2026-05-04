import { C, t } from "@/components/quest/theme";
import { getPhotoshoot2Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "target = list(map(int, input().split()))",
  "current = list(map(int, input().split()))",
  "",
  "# Build position map: where each cow is in current",
  "pos = {}",
  "for i, cow in enumerate(current):",
  "    pos[cow] = i",
  "",
  "# Count inversions: cows not in correct relative order",
  "# A cow needs to move left if it appears after",
  "# a cow that should come after it in target",
  "ans = 0",
  "max_pos = -1",
  "for cow in target:",
  "    # Position of this cow in current arrangement",
  "    p = pos[cow]",
  "    if p < max_pos:",
  "        # This cow is to the left of a cow that",
  "        # should come before it -> needs moving",
  "        ans += 1",
  "    else:",
  "        max_pos = p",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhoto2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie has N cows in some current order, and a target order. The only allowed move: pick ONE cow and move her to ANY position farther LEFT in the line.\nPrint the MINIMUM number of moves to transform the current order into the target order.",
        "베시에게 N 마리 소가 어떤 현재 순서로 있고, 목표 순서가 주어져요. 허용된 동작은 단 하나: 한 소를 골라 줄에서 더 왼쪽 어디든 옮기기.\n현재 순서를 목표 순서로 만드는 최소 동작 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"📷"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Photoshoot 2</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2022 Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has ", "베시에게 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "N cows in a current line and a target order", "N 마리 소의 현재 줄과 목표 순서")}</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One move: pick a cow and ", "한 번의 동작: 소를 골라 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "move her to any position farther LEFT", "줄에서 더 왼쪽 어디든 옮기기")}</b>
                  {t(E, " in the line.", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of moves to reach the target order", "목표 순서에 도달하기 위한 최소 동작 수")}</b>
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
        "Current: [2,1], Target: [1,2]. Cow 1 needs to move left past cow 2. How many moves?", "현재: [2,1], 목표: [1,2]. 소1이 소2 왼쪽으로 이동해야 해요. 이동 횟수는?"),
      question: t(E,
        "[2,1] -> [1,2]. How many moves?",
        "[2,1] -> [1,2]. 이동 몇 번?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "0", "0"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Move cow 1 to the left. Only 1 move needed.",
        "맞아! 소 1을 왼쪽으로 이동. 1번만 필요해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Current: [2,1], Target: [1,2]. How many moves to rearrange?", "현재: [2,1], 목표: [1,2]. 재배열하는 이동 횟수는?"),
      question: t(E,
        "[2,1] -> [1,2]. Min moves?",
        "[2,1] -> [1,2]. 최소 이동?"),
      hint: t(E,
        "Only cow 1 is out of place. Move it left once.",
        "소 1만 위치가 틀려. 왼쪽으로 한 번 이동."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhoto2Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Scan target order, track max position in current.\nIf a cow's position is less than max, it needs moving.\nO(N)!", "목표 순서를 스캔, 현재 배열의 최대 위치 추적. 소 위치가 최댓값보다 작으면 이동 필요. O(N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Build position map for current order.\nScan target order left to right, tracking max position. Any cow with position < max is an inversion and needs moving.",
              "현재 순서의 위치 맵 생성.\n목표 순서를 왼쪽에서 오른쪽으로 스캔, 최대 위치 추적.\n위치 < 최댓값인 소는 역전이라 이동 필요.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getPhotoshoot2Sections(E),
    },
  ];
}
