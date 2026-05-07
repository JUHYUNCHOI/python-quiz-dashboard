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
        "FJ stands at position x on a number line. His cow is at position y, but he doesn't know which side.\nHe zigzags: 1 step right, 2 steps left, 4 steps right, 8 steps left... doubling each time.\nHow far does he walk before reaching y?",
        "FJ가 수직선 위 위치 x에 있어요. 소는 위치 y에 있지만 어느 방향인지 몰라요.\n그래서 지그재그로 걸어요: 오른쪽 1, 왼쪽 2, 오른쪽 4, 왼쪽 8... 매번 두 배씩.\ny에 도달할 때까지 총 몇 칸을 걸을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>The Lost Cow</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Open Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ starts at position ", "FJ가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "x on a number line", "수직선 위 위치 x")}</b>
                  {t(E, ". His cow is at position ", "에서 시작해요. 소는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "y", "위치 y")}</b>
                  {t(E, " — he doesn't know which side.",
                        "에 있어요 — FJ는 어느 방향인지 몰라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "He walks in a ", "그래서 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "zigzag pattern", "지그재그")}</b>
                  {t(E, ": +1, −2, +4, −8, +16, ... — doubling and switching direction each time.",
                        "로 걸어요: +1, −2, +4, −8, +16, ... — 매번 두 배로 커지고 방향이 바뀌어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "He stops the moment ", "걷는 도중 ")}
                  <b style={{ color: "#16a34a" }}>{t(E, "he passes through y", "y를 지나가는 순간")}</b>
                  {t(E, " (mid-segment counts).",
                        " 멈춰요 (구간 중간에 도달해도 됨).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "total distance walked", "걸은 총 거리")}</b>
                  {t(E, " before reaching y.", "를 출력해요.")}
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
        "FJ is at x=3, cow at y=6.\nHe goes to 4 (dist 1), then to 1 (dist 3), then toward 7 but finds cow at 6.\nWhat's the total distance?", "FJ는 x=3, 소는 y=6. 4로 가고 (거리 1), 1로 가고 (거리 3), 7을 향해 가다 6에서 소를 찾아요. 총 거리는?"),
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
        "Try it yourself! x=3, y=6. What is the total distance FJ walks?", "직접 해봐요! x=3, y=6. FJ가 걷는 총 거리는?"),
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
        "Pick a (x, y) pair below and step through FJ's zigzag walk on the number line.", "아래에서 (x, y) 골라서 FJ의 지그재그 걷기를 한 다리씩 따라가봐요."),
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
        "Simulate the zigzag.\nEach step doubles, so we find y within O(log(abs(x-y))) steps.\nVery fast!", "지그재그를 시뮬레이션해요. 매 스텝마다 두 배로 커지니까 O(log(abs(x-y))) 스텝 안에 y를 찾아요. 매우 빠르지!"),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
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
        "Run it yourself — enter x and y, watch the legs unfold.", "직접 실행 — x, y 입력하고 다리들이 펼쳐지는 걸 봐요."),
    },
  ];
}
