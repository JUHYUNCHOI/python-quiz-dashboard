import { C, t } from "@/components/quest/theme";
import { getMagicOrbsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "vals = list(map(int, input().split()))",
  "",
  "# Sort values in descending order",
  "vals.sort(reverse=True)",
  "",
  "# Pick the top K orbs for maximum sum",
  "ans = sum(vals[:K])",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMagicOrbsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "There are N magical orbs, each with a power value p[i]. You may pick AT MOST K orbs.\nPrint the MAXIMUM total power achievable.",
        "N 개의 마법 구슬이 있고, 각자 파워 p[i] 를 가져요. 최대 K 개를 고를 수 있어요.\n달성 가능한 총 파워의 최댓값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd2e"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Magical Orbs</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P3</div>
          </div>

          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N magical orbs", "N 개의 마법 구슬")}</b>
                  {t(E, " with powers ", " 이 있고, 파워 ")}
                  <code style={{ background: "#ede9fe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>p[i]</code>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You may pick ", "최대 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "AT MOST K orbs", "K 개의 구슬")}</b>
                  {t(E, ".", " 을 고를 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum total power achievable", "총 파워의 최댓값")}</b>
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
        "Orbs with values [5, 3, 4], pick 2. Which two should you pick?", "구슬 값이 [5, 3, 4]이고 2개를 골라야 해요. 어떤 두 개를 골라야 할까?"),
      question: t(E,
        "Values [5, 3, 4], pick 2. Best choice?",
        "값 [5, 3, 4], 2개 선택. 최선의 선택은?"),
      options: [
        t(E, "5 and 3 (sum = 8)", "5와 3 (합 = 8)"),
        t(E, "5 and 4 (sum = 9)", "5와 4 (합 = 9)"),
        t(E, "3 and 4 (sum = 7)", "3과 4 (합 = 7)"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Pick the two largest values: 5 + 4 = 9.",
        "맞아! 가장 큰 두 값을 골라: 5 + 4 = 9."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Orbs: [5, 3, 4], pick 2. What is the maximum sum?", "구슬: [5, 3, 4], 2개 선택. 최대 합은?"),
      question: t(E,
        "Values [5, 3, 4], K=2. Maximum total power?",
        "값 [5, 3, 4], K=2. 최대 총 파워?"),
      hint: t(E,
        "Sort descending: [5, 4, 3]. Take first 2: 5 + 4 = 9.",
        "내림차순 정렬: [5, 4, 3]. 처음 2개: 5 + 4 = 9."),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMagicOrbsCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Greedy: pick the K orbs with the LARGEST powers. Sort descending and sum the first K.",
        "그리디: 파워가 가장 큰 K 개의 구슬 선택. 내림차순 정렬 후 처음 K 개 합산."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N, K, powers", "N, K, 파워 읽기"), code: "powers = list(map(int, input().split()))", color: "#8b5cf6" },
              { n: 2, label: t(E, "Sort descending", "내림차순 정렬"), code: "powers.sort(reverse=True)", color: "#7c3aed" },
              { n: 3, label: t(E, "Sum top K", "상위 K 합산"), code: "total = sum(powers[:K])", color: "#0891b2" },
              { n: 4, label: t(E, "Print total", "total 출력"), code: "print(total)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#8b5cf6" }}>O(N log N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "sort dominates", "정렬이 지배적")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMagicOrbsSections(E),
    },
  ];
}
