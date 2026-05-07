import { C, t } from "@/components/quest/theme";
import { getSocDist2Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "cows = []",
  "for _ in range(N):",
  "    x, s = input().split()",
  "    cows.append((int(x), int(s)))",
  "cows.sort()",
  "",
  "# Find max R from healthy cows",
  "sick = [x for x, s in cows if s == 1]",
  "healthy = [x for x, s in cows if s == 0]",
  "",
  "if not healthy:",
  "    # All sick: could be 1 initially infected",
  "    print(1)",
  "else:",
  "    # R must be < min distance from any healthy to nearest sick",
  "    max_R = float('inf')",
  "    for h in healthy:",
  "        for s in sick:",
  "            max_R = min(max_R, abs(h - s) - 1)",
  "    if max_R < 0:",
  "        max_R = 0",
  "",
  "    # Count clusters of sick cows with gaps > max_R",
  "    if not sick:",
  "        print(0)",
  "    else:",
  "        clusters = 1",
  "        for i in range(1, len(sick)):",
  "            if sick[i] - sick[i-1] > 2 * max_R:",
  "                clusters += 1",
  "        print(clusters)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeSocDist2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Cows stand at known positions on a number line; each is currently sick or healthy. Disease spreads from a sick cow to any cow within distance R (some unknown constant). FJ wants to know the MINIMUM number of cows that could have started infected to explain the current state.\nFind the largest valid R (so spread is consistent with healthy cows) and print the corresponding minimum initial-infection count.",
        "소들이 수직선의 정해진 위치에 있고, 지금 아프거나 건강한 상태예요. 병은 아픈 소한테서 거리 R 안에 있는 모든 소에게 옮았어요 (R 은 모르는 값). FJ 는 지금 상태가 나오게 하려면 처음에 몇 마리가 아팠어야 하는지 알고 싶어요.\n지금 상태와 안 맞지 않는 가장 큰 R 을 찾고, 그 R 일 때 처음 아팠던 소의 최소 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udda0"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Social Distancing II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2020 US Open Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cows stand at ", "소들이 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "known positions on a number line", "수직선 위 정해진 위치")}</b>
                  {t(E, "; each is currently SICK or HEALTHY.",
                        "에 있고, 현재 감염 또는 건강 상태예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The disease spreads from a sick cow to any cow ", "병은 감염된 소에서 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "within distance R (unknown)", "거리 R 이내 (R 은 미지수)")}</b>
                  {t(E, " — find the LARGEST R consistent with the data (no healthy cow within R of any sick cow).",
                        " 의 모든 소에게 전파됐어요 — 데이터와 일치하는 가장 큰 R 을 찾아요 (감염 소의 R 이내에 건강 소 없음).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of cows that could have started infected", "최초 감염 소의 최소 수")}</b>
                  {t(E, " under that R.", "를 출력해요 (그 R 기준).")}
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
        "If all cows are sick and there are no healthy cows, what's the minimum number of initially infected cows?", "모든 소가 감염되고 건강한 소가 없으면, 최초 감염 소의 최소 수는?"),
      question: t(E,
        "All cows sick, no healthy cows. Min initially infected?",
        "모든 소 감염, 건강한 소 없음. 최초 감염 최소 수?"),
      options: [
        t(E, "1 (one cow could infect all)", "1 (한 마리가 전부 감염 가능)"),
        t(E, "N (each cow was independently infected)", "N (각 소가 독립적으로 감염)"),
        t(E, "N/2", "N/2"),
      ],
      correct: 0,
      explain: t(E,
        "With no healthy cows, R can be arbitrarily large. One initially infected cow with huge R could infect everyone.",
        "건강한 소가 없으면 R이 무한대 가능. 큰 R을 가진 한 마리가 모두 감염 가능."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "All cows are sick with no healthy cows.\nWhat is the minimum number of initially infected cows?", "모든 소가 감염, 건강한 소 없음. 최초 감염 소의 최소 수는?"),
      question: t(E,
        "5 cows, all sick, 0 healthy. Min initially infected?",
        "소 5마리, 전부 감염, 건강 0마리. 최초 감염 최소 수?"),
      hint: t(E,
        "With no healthy cows to bound R, one cow with large enough R infects all.",
        "R을 제한할 건강한 소가 없으니, R이 충분히 큰 한 마리로 전부 감염."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeSocDist2Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort cows by position. The MAXIMUM valid R = (smallest distance from a healthy cow to a sick cow) − 1. Then count groups of sick cows where adjacent sick cows are within 2R of each other.",
        "소를 위치순 정렬. 가능한 최대 R = (건강한 소에서 가장 가까운 감염 소까지 거리) − 1. 그 R 로, 인접한 감염 소가 서로 2R 이내인 그룹 수를 세요."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getSocDist2Sections(E),
    },
  ];
}
