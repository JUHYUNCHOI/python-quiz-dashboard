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
        "Simulate T steps. Each step: tentative move (x + dx, y + dy). If would cross a wall, flip the corresponding component before applying.",
        "T 단계 시뮬레이션. 매 단계: 가상 이동 (x + dx, y + dy). 벽을 넘어가면 해당 성분을 먼저 부호 반전 후 적용."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init position and velocity", "위치와 속도 초기화"), code: "x, y = start;  dx, dy = ±1, ±1", color: "#d97706" },
              { n: 2, label: t(E, "For T steps, attempt move", "T 단계 동안 이동 시도"), code: "for _ in range(T):", color: "#7c3aed" },
              { n: 3, label: t(E, "Bounce off walls", "벽에서 튕기기"), code: "if x+dx out of [0,W-1]: dx = -dx;  same for dy", color: "#0891b2" },
              { n: 4, label: t(E, "Apply move; print final", "이동 적용; 최종 출력"), code: "x += dx; y += dy;  print(x, y)", color: "#16a34a" },
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
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(T)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "T simulation steps", "T 단계 시뮬레이션")}</div>
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
