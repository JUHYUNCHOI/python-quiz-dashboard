import { C, t } from "@/components/quest/theme";
import { getHoofballSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "pos = sorted(list(map(int, input().split())))",
  "",
  "# For each cow, determine who it passes to",
  "# (nearest neighbor; ties go left)",
  "target = [0] * N",
  "for i in range(N):",
  "    if i == 0:",
  "        target[i] = 1",
  "    elif i == N - 1:",
  "        target[i] = N - 2",
  "    else:",
  "        left_dist = pos[i] - pos[i-1]",
  "        right_dist = pos[i+1] - pos[i]",
  "        if left_dist <= right_dist:",
  "            target[i] = i - 1",
  "        else:",
  "            target[i] = i + 1",
  "",
  "# Count how many cows pass to each cow",
  "received = [0] * N",
  "for i in range(N):",
  "    received[target[i]] += 1",
  "",
  "# Sources = cows that nobody passes to",
  "# But also handle 'sinks' (mutual passing)",
  "ans = 0",
  "for i in range(N):",
  "    if received[i] == 0:",
  "        ans += 1",
  "",
  "# Edge case: two adjacent cows passing to each other",
  "# forms a sink; need at least 1 ball there",
  "for i in range(N - 1):",
  "    if target[i] == i + 1 and target[i+1] == i:",
  "        if received[i] == 1 and received[i+1] == 1:",
  "            ans += 1",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoofballCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows stand on a number line at distinct positions. When a cow has a ball, she immediately passes it to her closest neighbor (ties → pass right). Once a ball reaches a cow, she'll keep passing it forever.\nWe need to give out balls so EVERY cow eventually touches one. Print the MINIMUM number of starting balls needed.",
        "N마리 소가 수직선 위 서로 다른 위치에 서있어요. 공을 가진 소는 즉시 가장 가까운 이웃에게 패스해요 (거리 같으면 오른쪽). 공이 어떤 소에 도달하면, 그 소도 영원히 패스를 이어가요.\n모든 소가 결국 공을 만지도록 처음에 공을 나눠줘요. 필요한 시작 공의 최소 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u26BD"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Hoofball</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2018 Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#f97316" }}>{t(E, "N cows stand on a number line", "N마리 소가 수직선 위에 서있어요")}</b>
                  {t(E, " at distinct positions.", " (서로 다른 위치).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If a cow holds a ball, she ", "공을 가진 소는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "passes it to her CLOSEST neighbor", "가장 가까운 이웃에게 즉시 패스")}</b>
                  {t(E, " (tie → right). Cows keep passing forever.",
                        " (거리 같으면 오른쪽). 한 번 받은 소도 계속 패스해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of starting balls", "필요한 시작 공의 최소 개수")}</b>
                  {t(E, " so every cow eventually touches one.",
                        " 를 출력해요. 모든 소가 결국 공을 만지도록.")}
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
        "3 cows at positions [1, 5, 10].\nCow at 5 passes to 1 (dist 4 < 5).\nCow at 10 passes to 5 (dist 5).\nCow at 1 passes to 5 (dist 4).\nWho never receives a pass?", "3마리 소 위치 [1, 5, 10].\n5의 소는 1로 패스 (거리 4 < 5).\n10의 소는 5로 패스 (거리 5).\n1의 소는 5로 패스 (거리 4).\n패스를 안 받는 소는?"),
      question: t(E,
        "Positions [1,5,10]. How many balls needed?",
        "위치 [1,5,10]. 필요한 공 수는?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Cow at 1 and cow at 10 never receive passes (they are sources). Need 2 balls!",
        "위치 1과 10의 소는 패스를 안 받아 (소스). 공 2개 필요!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Positions [1, 5, 10]. How many balls are needed?", "위치 [1, 5, 10]. 필요한 공 수는?"),
      question: t(E,
        "3 cows at [1, 5, 10]. Min balls needed?",
        "3마리 소 [1, 5, 10]. 최소 공 수?"),
      hint: t(E,
        "Cow 1 and cow 10 are sources (no one passes to them). Each needs a ball.",
        "소 1과 소 10이 소스 (아무도 패스 안 함). 각각 공 필요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoofballCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort cow positions. Each cow's pass target is her closest neighbor. A cow is a 'source' if no other cow targets her. Each source needs its own ball. Also +1 ball for each pair of mutually-passing cows that's not already counted.",
        "소 위치 정렬. 각 소의 패스 대상은 가장 가까운 이웃. 다른 소가 타겟하지 않는 소가 '소스' — 각자 공이 필요. 또 상호 패스 쌍 (이미 안 세어진) 마다 공 1 개 추가."),
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
      sections: getHoofballSections(E),
    },
  ];
}
