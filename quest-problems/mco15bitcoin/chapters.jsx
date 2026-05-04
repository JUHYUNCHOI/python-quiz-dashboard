import { C, t } from "@/components/quest/theme";
import { getBitcoinSections } from "./components";

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
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBitcoinCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N bitcoin mining sites at integer points on a 2D plane.\nPrint the MAXIMUM squared Euclidean distance between any two sites — i.e., max (x1−x2)^2 + (y1−y2)^2.",
        "정수 좌표의 2D 평면에 있는 N 개의 비트코인 채굴 사이트.\n임의 두 사이트 사이 유클리드 거리의 제곱 (x1−x2)^2 + (y1−y2)^2 의 최댓값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u20bf"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Bitcoin</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P3</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#f97316" }}>{t(E, "N bitcoin sites at integer points on a 2D plane", "정수 좌표의 2D 평면 위 N 개 비트코인 사이트")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
    // 1-2: Quiz
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
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Points (0,0) and (3,4). What is their squared Euclidean distance?", "점 (0,0)과 (3,4). 유클리드 거리의 제곱은?"),
      question: t(E,
        "Squared distance between (0,0) and (3,4)?",
        "(0,0)과 (3,4) 사이의 제곱 거리?"),
      hint: t(E,
        "(3-0)^2 + (4-0)^2 = 9 + 16 = 25",
        "(3-0)^2 + (4-0)^2 = 9 + 16 = 25"),
      answer: 25,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBitcoinCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Brute force: check all N*(N-1)/2 pairs and track the maximum squared distance.\nO(N^2) time.", "브루트포스: 모든 N*(N-1)/2 쌍을 확인하고 최대 제곱 거리를 추적. O(N^2) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N\u00b2)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "For each pair (i, j), compute dx^2 + dy^2 and keep the maximum.\nSimple nested loop over all pairs.",
              "각 쌍 (i, j)에 대해 dx^2 + dy^2을 계산하고 최대값 유지.\n모든 쌍에 대한 간단한 이중 루프.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBitcoinSections(E),
    },
  ];
}
