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
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2017 Bronze #1</div>
          </div>

          {/* \ud83c\udfaf Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              \ud83c\udfaf {t(E, "Mission", "\ubbf8\uc158")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the total distance FJ walks during his zigzag (+1, \u22122, +4, \u2026) before passing through y.",
                "FJ \uac00 \uc9c0\uadf8\uc7ac\uadf8 (+1, \u22122, +4, \u2026) \ub85c \uac77\ub2e4\uac00 y \ub97c \uc9c0\ub098\uac00\uae30\uae4c\uc9c0\uc758 \ucd1d \uac70\ub9ac\ub97c \ucd9c\ub825.")}
            </div>
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
        "Trace the zigzag yourself for x=3, y=6.  Add up each leg until you reach (or pass) y.",
        "x=3, y=6 에서 지그재그를 직접 따라가. y 에 닿거나 지나갈 때까지 각 다리의 거리 합."),
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
        "Now you do it on your own — write down each leg, sum the distances.",
        "이번엔 혼자서 — 다리 하나씩 적어보고 거리 다 더해."),
      question: t(E,
        "x=3, y=6. Total distance walked?",
        "x=3, y=6. 총 걸은 거리?"),
      hint: t(E,
        "Each leg's distance is the doubling pattern (1, 2, 4, 8, …).  Stop when you've passed y.",
        "다리마다 거리는 두 배씩 (1, 2, 4, 8, …). y 를 지난 다리까지 합산."),
      answer: 9,
    },
    {
      type: "doubling",
      narr: t(E,
        "Before walking, feel the leg sizes: 1, 2, 4, 8, 16…  Each one twice the last.  Add legs and watch the bars and total grow.",
        "걷기 전에 다리 길이부터 느껴 봐: 1, 2, 4, 8, 16…  매번 두 배.  다리를 추가하며 막대와 합계가 커지는 걸 관찰."),
    },
    {
      type: "sim",
      narr: t(E,
        "Pick a (x, y) and walk FJ through one leg at a time on the number line below.",
        "아래에서 (x, y) 골라 FJ 의 지그재그를 한 다리씩 직접 걸어 봐."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLostCowCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in.
    {
      type: "progressive",
      narr: t(E,
        "Simulate the zigzag — each leg doubles, alternates direction, stops the moment y is between current and next position.  Sections build it one piece at a time.",
        "지그재그 시뮬 — 다리마다 두 배, 방향 교대, y 가 현재와 다음 사이에 있으면 거기서 멈춤. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getLostCowSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Run it yourself — enter x and y, watch the legs unfold.", "직접 실행 — x, y 입력하고 다리들이 펼쳐지는 걸 봐요."),
    },
  ];
}
