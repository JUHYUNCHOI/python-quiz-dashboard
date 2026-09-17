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
   Chapter 1: 📋 문제 이해 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBitcoinCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N bitcoin mining sites at integer points on a 2D plane.\nPrint the MAXIMUM squared Euclidean distance between any two sites — i.e., max (x1−x2)^2 + (y1−y2)^2.",
        "두 사이트 사이 거리의 제곱 중 가장 큰 값을 구해요."),
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
              {t(E, "Find the largest squared distance between any two mining sites.", "두 채굴 사이트 사이의 거리의 제곱 중 가장 큰 값을 찾아요.")}
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
                  <div style={{ marginTop: 6, fontSize: 12, color: C.dim, lineHeight: 1.6, wordBreak: "keep-all" }}>
                    {t(E, "(x1, y1) and (x2, y2) are the coordinates of the two sites in that pair.",
                          "(x1, y1) 과 (x2, y2) 는 그 쌍에 든 두 사이트의 좌표예요.")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    /* 1-2: 입출력 형식 (mcc19rect2 4-박스 표준)
       2026-09-17: 형식 카드가 없어서 학생이 코드까지 가서야 형식을 역추론했다. */
    {
      type: "reveal",
      narr: t(E,
        "N on the first line, then one site per line.",
        "첫 줄에 N, 그다음 줄마다 사이트 하나가 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#9a3412", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— how many sites", "— 사이트 개수")}</span></div>
              <div><span style={{ color: "#9a3412", fontWeight: 800 }}>x1 y1</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— site 1: its x and its y", "— 1 번 사이트의 x 좌표와 y 좌표")}</span></div>
              <div style={{ color: C.dim }}>…</div>
              <div><span style={{ color: "#9a3412", fontWeight: 800 }}>xN yN</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— site N", "— N 번 사이트")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: the largest squared distance found between two sites.",
                    "한 줄에, 두 사이트 사이에서 찾은 가장 큰 거리의 제곱을 적어요.")}
            </div>
          </div>
          {/* Sample */}
          <div style={{ marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#9a3412", marginBottom: 8 }}>🔍 {t(E, "Sample", "샘플")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
              <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9a3412", marginBottom: 4 }}>{t(E, "input", "입력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`4
1 1
5 2
2 6
6 5`}
                </div>
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>{`41`}</div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", fontStyle: "italic" }}>
              {t(E, "Which pair gives 41? — the sim on the next page uses these four sites.",
                    "어느 쌍이 41 일까? — 다음 쪽 시뮬이 이 네 사이트를 그대로 써요.")}
            </div>
          </div>
          {/* CONSTRAINTS */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {/* 2026-09-17: 원문 N·좌표 상한을 못 찾았다. 지어내지 않고 이 방법이
                  감당하는 크기를 적는다. N 범위를 모르면 "모든 쌍 보기" 가 최종
                  풀이인지도 판정할 수 없다 — 검토자가 남긴 말이다. */}
              {t(E, "Coordinates are whole numbers. We could not find the original limits on N or on the coordinates. What we can say: this method looks at every pair, and the number of pairs is N × (N − 1) ÷ 2 — about 2 million when N is 2000.",
                    "좌표는 정수예요.\n원문에서 N 과 좌표가 얼마까지인지는 찾지 못했어요.\n대신 이 방법이 감당하는 크기를 적어요 — 모든 쌍을 다 보고,\n쌍의 개수는 N × (N − 1) ÷ 2 예요. N 이 2000 이면 약 200 만 쌍이에요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Pair Inspector sim — feel the brute force
    {
      type: "reveal",
      narr: t(E,
        "These are the four sites from the sample. Find by hand which pair gives 41.",
        "앞 쪽 샘플의 네 사이트예요. 41 이 어느 쌍에서 나오는지 찾아봐요."),
      content: <BitcoinPairInspector E={E} />,
    },
    // 1-4: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Why do we use squared distance instead of regular distance?\nThink about what operations we can avoid.", "왜 그냥 거리 대신 거리의 제곱을 쓸까요?"),
      question: t(E,
        "Why use squared Euclidean distance instead of regular distance?",
        "왜 유클리드 거리 대신 거리의 제곱을 쓸까요?"),
      options: [
        t(E, "Avoids square root, preserves comparison order", "제곱근을 안 써도 되고, 큰 순서가 그대로예요"),
        t(E, "Squared distance is always smaller", "거리의 제곱이 언제나 더 작아요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! A bigger squared distance always means a bigger distance, so the pair with the largest squared distance is also the farthest pair. And the value stays a whole number, so there is no decimal error.",
        "맞아요! 제곱근(√)을 쓰지 않아도 돼요.\n거리가 클수록 거리의 제곱도 크니까,\n제곱이 가장 큰 쌍이 실제로도 가장 먼 쌍이에요.\n게다가 값이 정수로 남아서 소수점 오차도 안 생겨요."),
    },
    // 1-5: Input
    {
      type: "input",
      narr: t(E,
        "Points (0,0) and (3,4). What is their squared Euclidean distance?", "점 (0,0) 과 (3,4) 사이 거리의 제곱은 얼마일까요?"),
      question: t(E,
        "Squared distance between (0,0) and (3,4)?",
        "(0,0) 과 (3,4) 사이 거리의 제곱은 얼마일까요?"),
      hint: t(E,
        "dx = 3 − 0, dy = 4 − 0. Compute dx² + dy².",
        "dx = 3 − 0 이고 dy = 4 − 0 이에요. dx² + dy² 를 계산해 봐요."),
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
        "모든 쌍을 하나씩 다 재 보면서 가장 큰 값을 남겨요."),
      sections: getBitcoinSections(E),
    },
  ];
}
