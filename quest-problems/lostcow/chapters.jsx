import { C, t } from "@/components/quest/theme";
import { getLostCowSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "x, y = map(int, input().split())",
  "",
  "pos = x",
  "direction = 1  # +1 right, -1 left",
  "step = 1",
  "total = 0",
  "",
  "while True:",
  "    target = x + direction * step",
  "    # Check if y is between pos and target",
  "    if direction == 1 and pos <= y <= target:",
  "        total += y - pos",
  "        break",
  "    if direction == -1 and target <= y <= pos:",
  "        total += pos - y",
  "        break",
  "    total += abs(target - pos)",
  "    pos = target",
  "    direction *= -1",
  "    step *= 2",
  "",
  "print(total)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLostCowCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ starts at position x and zigzags to find his cow at position y.\nHe walks right 1, then left 2, then right 4, then left 8...\ndoubling each time.\nFind the total distance walked!", "FJ는 위치 x에서 시작해서 위치 y에 있는 소를 찾으러 지그재그로 걸어.\n오른쪽 1, 왼쪽 2, 오른쪽 4, 왼쪽 8...\n매번 두 배로 늘어나.\n총 걸은 거리를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>The Lost Cow</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Open Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Simulate the zigzag. From x, go to x+1, then x-2, then x+4, then x-8... Stop when you pass y. Track total distance.",
              "핵심: 지그재그를 시뮬레이션해. x에서 x+1, x-2, x+4, x-8... y를 지나갈 때 멈춰. 총 거리를 추적해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "FJ is at x=3, cow at y=6.\nHe goes to 4 (dist 1), then to 1 (dist 3), then toward 7 but finds cow at 6.\nWhat's the total distance?", "FJ는 x=3, 소는 y=6. 4로 가고 (거리 1), 1로 가고 (거리 3), 7을 향해 가다 6에서 소를 찾아. 총 거리는?"),
      question: t(E,
        "x=3, y=6. FJ goes 3->4 (1), 4->1 (3), 1->6 (5). Total distance?",
        "x=3, y=6. FJ: 3->4 (1), 4->1 (3), 1->6 (5). 총 거리?"),
      options: [
        t(E, "9", "9"),
        t(E, "7", "7"),
        t(E, "6", "6"),
        t(E, "11", "11"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 3->4 (1) + 4->1 (3) + 1->6 (5) = 9. He walks past y=6 on the way from 1 to 7.",
        "맞아! 3->4 (1) + 4->1 (3) + 1->6 (5) = 9. 1에서 7으로 가는 도중 y=6을 지나가."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Try it yourself! x=3, y=6. What is the total distance FJ walks?", "직접 해봐! x=3, y=6. FJ가 걷는 총 거리는?"),
      question: t(E,
        "x=3, y=6. Total distance walked?",
        "x=3, y=6. 총 걸은 거리?"),
      hint: t(E,
        "3->4 (dist 1), 4->1 (dist 3), 1->6 (dist 5). Total = 1+3+5 = 9.",
        "3->4 (거리 1), 4->1 (거리 3), 1->6 (거리 5). 합 = 1+3+5 = 9."),
      answer: 9,
    },
    {
      type: "sim",
      narr: t(E,
        "Pick a (x, y) pair below and step through FJ's zigzag walk on the number line.", "아래에서 (x, y) 골라서 FJ의 지그재그 걷기를 한 다리씩 따라가봐."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLostCowCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Simulate the zigzag.\nEach step doubles, so we find y within O(log(|x-y|)) steps.\nVery fast!", "지그재그를 시뮬레이션해. 매 스텝마다 두 배로 커지니까 O(log(|x-y|)) 스텝 안에 y를 찾아. 매우 빠르지!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(log |x-y|)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Simulate: track position, direction, step size. Each iteration, check if y is between current position and target. If so, add |y - pos| and stop. Otherwise add full step distance and double.",
              "시뮬레이션: 위치, 방향, 스텝 크기를 추적해. 매 반복마다 y가 현재 위치와 목표 사이에 있는지 확인. 있으면 |y - pos|를 더하고 멈춰. 아니면 전체 스텝 거리를 더하고 두 배로.")}
          </div>
        </div>),
    },
    // 2-2: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Now build the zigzag simulation step by step.", "지그재그 시뮬레이션을 단계별로 만들자."),
      sections: getLostCowSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Run it yourself — enter x and y, watch the legs unfold.", "직접 실행 — x, y 입력하고 다리들이 펼쳐지는 걸 봐."),
    },
  ];
}
