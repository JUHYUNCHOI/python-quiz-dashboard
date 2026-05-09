import { C, t } from "@/components/quest/theme";
import { getMcc21DvdSections } from "./components";

export const SOLUTION_CODE = [
  "W, H = map(int, input().split())",
  "x, y = map(int, input().split())",
  "dx, dy = 1, 1",
  "T = int(input())",
  "",
  "for _ in range(T):",
  "    x += dx",
  "    y += dy",
  "    if x <= 0 or x >= W - 1:",
  "        dx = -dx",
  "    if y <= 0 or y >= H - 1:",
  "        dy = -dy",
  "",
  "print(x, y)",
];

export function makeMcc21DvdCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A DVD logo starts on a W × H screen at a known position with velocity (dx, dy) where dx, dy ∈ {−1, +1}. Each step it moves by (dx, dy); if it would go past a wall, that component flips sign (it bounces).\nPrint the logo's position after T steps.",
        "W × H 화면에 DVD 로고가 정해진 위치에서 시작하고 속도 (dx, dy) 를 가져요 (dx, dy ∈ {−1, +1}). 매 단계 (dx, dy) 만큼 이동, 벽을 넘어가면 그 방향이 반대로 바뀌어 (튕김).\nT 단계 후 로고의 위치를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcc0"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>DVD Screensaver</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E, "Track a bouncing DVD logo and print where it lands after T steps.", "튕기는 DVD 로고를 따라가서 T 단계 후 어디 있는지 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "DVD logo on a W × H screen", "W × H 화면의 DVD 로고")}</b>
                  {t(E, " starts at a known position with velocity (dx, dy), each ∈ {−1, +1}.",
                        " 가 정해진 위치에서 시작하고, 속도 (dx, dy) 가 각각 ∈ {−1, +1} 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each step, the logo moves by (dx, dy); if it'd exit the screen, that component ", "매 단계 (dx, dy) 만큼 이동. 벽을 넘어가면 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "flips sign (bounces)", "방향이 반대로 바뀌어요 (튕김)")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "logo's position after T steps", "T 단계 후 로고의 위치")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Screen 10x10, logo at (0,0) moving right-down. After 1 step, where is it?", "화면 10x10, 로고 (0,0)에서 오른쪽-아래로 이동. 1단계 후 어디에 있어요?"),
      question: t(E,
        "Screen 10x10, start (0,0), direction (1,1). Position after 1 step?",
        "화면 10x10, 시작 (0,0), 방향 (1,1). 1단계 후 위치?"),
      options: [
        t(E, "(1, 1)", "(1, 1)"),
        t(E, "(0, 1)", "(0, 1)"),
        t(E, "(2, 2)", "(2, 2)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Moving (1,1) from (0,0) gives (1,1). No walls hit yet.",
        "맞아! (0,0)에서 (1,1) 이동하면 (1,1). 아직 벽에 안 부딪혀."),
    },
    {
      type: "input",
      narr: t(E,
        "If no walls are hit, after 5 steps from (0,0) going (1,1), what is the x-coordinate?", "벽에 안 부딪히면, (0,0)에서 (1,1) 방향으로 5단계 후 x좌표는?"),
      question: t(E,
        "Start (0,0), direction (1,1), no walls. X-coordinate after 5 steps?",
        "시작 (0,0), 방향 (1,1), 벽 없음. 5단계 후 x좌표?"),
      hint: t(E, "Each step adds dx (=1) to x. After 5 steps?", "매 단계 x 에 dx(=1) 가 더해져. 5단계 후엔?"),
      answer: 5,
    },
  ];
}

export function makeMcc21DvdCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Simulate T steps. Each step: tentative move (x + dx, y + dy). If would cross a wall, flip the corresponding component before applying. Sections build it one piece at a time.",
        "T 단계 시뮬레이션. 매 단계: 가상 이동 (x + dx, y + dy). 벽을 넘어가면 해당 성분을 먼저 부호 반전 후 적용. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc21DvdSections(E),
    },
  ];
}
