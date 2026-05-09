import { C, t } from "@/components/quest/theme";
import { getBitcoinSections, BitcoinPairInspector } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "sites = []",
  "for _ in range(N):",
  "    x, y = map(int, input().split())",
  "    sites.append((x, y))",
  "",
  "max_dist = 0",
  "",
  "for i in range(N):",
  "    for j in range(i + 1, N):",
  "        dx = sites[i][0] - sites[j][0]",
  "        dy = sites[i][1] - sites[j][1]",
  "        dist_sq = dx * dx + dy * dy",
  "        max_dist = max(max_dist, dist_sq)",
  "",
  "print(max_dist)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBitcoinCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N bitcoin mining sites at integer points on a 2D plane.\nPrint the MAXIMUM squared Euclidean distance between any two sites — i.e., max (x1−x2)^2 + (y1−y2)^2.",
        "정수 좌표의 평면 위에 있는 N 개의 비트코인 채굴 사이트.\n임의 두 사이트 사이 유클리드 거리의 제곱 (x1−x2)^2 + (y1−y2)^2 의 최댓값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u20bf"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Bitcoin</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E, "Find the largest squared distance between any two mining sites.", "두 채굴 사이트 사이의 제곱 거리 중 최댓값을 찾아요.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#f97316" }}>{t(E, "N bitcoin sites at integer points on a 2D plane", "정수 좌표의 평면 위 N 개 비트코인 사이트")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MAXIMUM (x1−x2)^2 + (y1−y2)^2 over all pairs", "모든 쌍 중 (x1−x2)^2 + (y1−y2)^2 의 최댓값")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Pair Inspector sim — feel the brute force
    {
      type: "reveal",
      narr: t(E,
        "Before writing code, let's feel the brute force by hand. Pick any two sites, see dx² + dy², and watch the running max climb.",
        "코드를 짜기 전에 완전 탐색을 손으로 느껴봐요. 두 사이트를 골라 dx² + dy² 를 보고, 최댓값이 올라가는 걸 확인해봐요."),
      content: <BitcoinPairInspector E={E} />,
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Why do we use squared distance instead of regular distance?\nThink about what operations we can avoid.", "왜 일반 거리 대신 거리의 제곱을 사용할까? 어떤 연산을 피할 수 있는지 생각해봐요."),
      question: t(E,
        "Why use squared Euclidean distance instead of regular distance?",
        "왜 일반 유클리드 거리 대신 제곱 거리를 사용하나?"),
      options: [
        t(E, "Avoids square root, preserves comparison order", "제곱근을 피하고, 비교 순서가 유지돼"),
        t(E, "Squared distance is always smaller", "제곱 거리가 항상 더 작아"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! sqrt is monotonic, so max squared distance corresponds to max distance. We avoid floating point issues.",
        "맞아! sqrt는 단조함수라서 최대 제곱 거리가 최대 거리에 대응해요. 부동소수점 문제도 피할 수 있어요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Points (0,0) and (3,4). What is their squared Euclidean distance?", "점 (0,0)과 (3,4). 유클리드 거리의 제곱은?"),
      question: t(E,
        "Squared distance between (0,0) and (3,4)?",
        "(0,0)과 (3,4) 사이의 제곱 거리?"),
      hint: t(E,
        "dx = 3 − 0, dy = 4 − 0. Compute dx² + dy².",
        "dx = 3 − 0, dy = 4 − 0. dx² + dy² 를 계산해봐요."),
      answer: 25,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBitcoinCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Brute force: for every pair of sites (i, j), compute (xi − xj)² + (yi − yj)² and keep the running max. Sections build it one piece at a time.",
        "완전 탐색: 모든 사이트 쌍 (i, j) 에 대해 (xi − xj)² + (yi − yj)² 계산, 최댓값 유지. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getBitcoinSections(E),
    },
  ];
}
