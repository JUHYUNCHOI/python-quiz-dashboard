import { C, t } from "@/components/quest/theme";
import { getCountLiarsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "claims = []",
  "for _ in range(N):",
  "    parts = input().split()",
  "    claims.append((parts[0], int(parts[1])))",
  "",
  "# Try every possible position for Bessie",
  "# For each position p, count contradictions",
  "positions = sorted(set(c[1] for c in claims))",
  "",
  "min_liars = N",
  "for p in range(1, 1000001):",
  "    liars = 0",
  "    for typ, val in claims:",
  "        if typ == 'G' and p < val:",
  "            liars += 1",
  "        elif typ == 'L' and p > val:",
  "            liars += 1",
  "    min_liars = min(min_liars, liars)",
  "",
  "# Optimized: sort and use prefix sums",
  "# Try each claimed position as Bessie's position",
  "ans = N",
  "for p in [c[1] for c in claims]:",
  "    liars = 0",
  "    for typ, val in claims:",
  "        if typ == 'G' and p < val: liars += 1",
  "        elif typ == 'L' and p > val: liars += 1",
  "    ans = min(ans, liars)",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLiarsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows each claim where Bessie is on a number line. A 'G x' claim says Bessie is at position ≥ x; 'L x' says ≤ x. Bessie has ONE actual position.\nFind the MINIMUM number of cows who must be lying — i.e., pick Bessie's position to maximize the number of true claims.",
        "N마리 소가 각자 Bessie의 위치에 대해 주장을 해요. 'G x'는 Bessie 위치가 x 이상, 'L x'는 x 이하라는 뜻이에요. Bessie의 실제 위치는 하나예요.\nBessie의 위치를 잘 골라서 참인 주장 수를 최대화할 때, 거짓말쟁이의 최소 수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🤥"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Counting Liars</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2022 Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has ", "Bessie의 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "a single position on a number line", "수직선 위 단 하나의 위치")}</b>
                  {t(E, ".", "가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each of ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N cows makes a claim", "N마리 소가 각자 주장")}</b>
                  {t(E, ":", " 을 해요:")}
                  <div style={{ marginTop: 4, marginLeft: 8, fontSize: 12, color: "#475569" }}>
                    <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace" }}>G x</code>
                    {t(E, " — Bessie's position ≥ x", " — Bessie 위치 ≥ x")}<br/>
                    <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace" }}>L x</code>
                    {t(E, " — Bessie's position ≤ x", " — Bessie 위치 ≤ x")}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Some cows might be ", "어떤 소들은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "lying", "거짓말")}</b>
                  {t(E, " — their claim is false for Bessie's actual position.",
                        "을 해요 — 그 주장이 Bessie의 실제 위치에 대해 거짓이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of liars", "거짓말쟁이의 최소 수")}</b>
                  {t(E, " over all possible positions for Bessie.",
                        "를 출력해요. Bessie의 위치를 가장 좋게 골랐을 때.")}
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
        "Claims: 'G 3' and 'L 5'. If Bessie is at position 4, how many liars?", "주장: 'G 3'과 'L 5'. Bessie가 위치 4에 있으면, 거짓말쟁이는 몇 명?"),
      question: t(E,
        "'G 3' (pos>=3) and 'L 5' (pos<=5). Bessie at 4. Liars?",
        "'G 3' (위치>=3)과 'L 5' (위치<=5). Bessie 위치 4. 거짓말쟁이?"),
      options: [
        t(E, "0 - both claims are true", "0 - 둘 다 참"),
        t(E, "1 - one claim is false", "1 - 하나가 거짓"),
        t(E, "2 - both claims are false", "2 - 둘 다 거짓"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 4 >= 3 (G 3 is true) and 4 <= 5 (L 5 is true). Zero liars!",
        "맞아! 4 >= 3 (G 3은 참)이고 4 <= 5 (L 5는 참). 거짓말쟁이 0명!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Claims: 'G 3' and 'L 2'. What's the minimum number of liars?", "주장: 'G 3'과 'L 2'. 최소 거짓말쟁이 수는?"),
      question: t(E,
        "'G 3' and 'L 2'. Min liars?",
        "'G 3'과 'L 2'. 최소 거짓말쟁이?"),
      hint: t(E,
        "If p=3: G 3 true, L 2 false (3>2). If p=2: G 3 false (2<3), L 2 true. Either way, 1 liar.",
        "p=3이면: G 3 참, L 2 거짓(3>2). p=2이면: G 3 거짓(2<3), L 2 참. 어느 쪽이든 거짓말쟁이 1명."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLiarsCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "The optimal Bessie position is somewhere among the claim x values. Brute force: for each candidate position p, count how many claims are CONTRADICTED. The minimum count is the answer (number of liars).",
        "Bessie의 최적 위치는 주장된 x 값 중 하나예요. 완전탐색: 각 후보 위치 p 마다, 모순되는 주장 수를 셈. 최솟값이 답 (거짓말쟁이 수)."),
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
      sections: getCountLiarsSections(E),
    },
  ];
}
