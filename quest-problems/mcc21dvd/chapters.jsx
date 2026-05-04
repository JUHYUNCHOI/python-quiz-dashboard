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
        "W × H 화면에 DVD 로고가 정해진 위치에서 시작하고 속도 (dx, dy) 를 가져요 (dx, dy ∈ {−1, +1}). 매 단계 (dx, dy) 만큼 이동, 벽을 넘어가면 해당 성분이 부호 반전 (튕김).\nT 단계 후 로고의 위치를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcc0"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>DVD Screensaver</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P2</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "DVD logo on a W × H screen", "W × H 화면의 DVD 로고")}</b>
                  {t(E, " starts at a known position with velocity (dx, dy), each ∈ {−1, +1}.",
                        " 가 정해진 위치에서 시작하고, 속도 (dx, dy) 가 각각 ∈ {−1, +1} 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each step, the logo moves by (dx, dy); if it'd exit the screen, that component ", "매 단계 (dx, dy) 만큼 이동. 벽을 넘어가면 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "flips sign (bounces)", "해당 성분이 부호 반전 (튕김)")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
      hint: t(E, "x = 0 + 5*1 = 5", "x = 0 + 5*1 = 5"),
      answer: 5,
    },
  ];
}

export function makeMcc21DvdCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Simulate each step. Check wall collisions and reverse direction. O(T) time.", "각 단계를 시뮬레이션해요. 벽 충돌 확인하고 방향 반전. O(T) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(T)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Loop T times.\nEach step: move position, check boundaries, flip direction if needed.",
              "T번 반복. 매 단계: 위치 이동, 경계 확인, 필요하면 방향 반전.")}
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc21DvdSections(E),
    },
  ];
}
