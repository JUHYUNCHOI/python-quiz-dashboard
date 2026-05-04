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
        "Rearrange cows to match a target order by moving cows to the left.\nFind the minimum number of moves!", "소를 왼쪽으로 이동시켜 목표 순서에 맞춰. 최소 이동 횟수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"📷"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Photoshoot 2</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2022 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Count inversions - cows not in the correct relative order need to be moved. Track the maximum position seen so far.",
              "핵심: 역전 세기 - 올바른 상대 순서가 아닌 소는 이동 필요. 지금까지 본 최대 위치 추적.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Current: [2,1], Target: [1,2]. Cow 1 needs to move left past cow 2. How many moves?", "현재: [2,1], 목표: [1,2]. 소1이 소2 왼쪽으로 이동해야 해. 이동 횟수는?"),
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
        "맞아! 소 1을 왼쪽으로 이동. 1번만 필요해."),
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
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Build position map for current order. Scan target order left to right, tracking max position. Any cow with position < max is an inversion and needs moving.",
              "현재 순서의 위치 맵 생성. 목표 순서를 왼쪽에서 오른쪽으로 스캔, 최대 위치 추적. 위치 < 최댓값인 소는 역전이라 이동 필요.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getPhotoshoot2Sections(E),
    },
  ];
}
