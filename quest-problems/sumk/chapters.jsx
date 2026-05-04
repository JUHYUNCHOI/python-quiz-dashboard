import { C, t } from "@/components/quest/theme";
import { getSumKSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "# Compute sum of each element raised to power K",
  "result = 0",
  "for x in a:",
  "    result += x ** K",
  "",
  "print(result)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSumKCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given an array of N numbers a[0..N−1] and an integer K, compute Σ a[i]^K — the sum of every element raised to the K-th power.",
        "N 개의 숫자 배열 a[0..N−1] 와 정수 K 가 주어져요. 각 원소를 K 제곱한 값들의 총합 Σ a[i]^K 를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u2211"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>{"Sum^K"}</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P6</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given an ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "array of N numbers a[0..N−1]", "N 개의 숫자 배열 a[0..N−1]")}</b>
                  {t(E, " and an integer ", " 와 정수 ")}
                  <b style={{ color: "#7c3aed" }}>K</b>
                  {t(E, ".", " 이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "a[0]^K + a[1]^K + … + a[N−1]^K", "a[0]^K + a[1]^K + … + a[N−1]^K")}</b>
                  {t(E, ".", " 를 출력해요.")}
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
        "Array = [1, 2, 3], K = 2. Sum of squares: 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14.", "배열 = [1, 2, 3], K = 2. 제곱의 합: 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14."),
      question: t(E,
        "Array=[1,2,3], K=2. What is the sum of squares?",
        "배열=[1,2,3], K=2. 제곱의 합은?"),
      options: [
        t(E, "6", "6"),
        t(E, "14", "14"),
        t(E, "36", "36"),
        t(E, "9", "9"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14.",
        "맞아! 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Calculate sum of squares for [1, 2, 3]!", "[1, 2, 3]의 제곱의 합을 계산해봐요!"),
      question: t(E,
        "Array=[1,2,3], K=2. Enter the sum:",
        "배열=[1,2,3], K=2. 합을 입력해:"),
      hint: t(E,
        "1^2 + 2^2 + 3^2 = 1 + 4 + 9.",
        "1^2 + 2^2 + 3^2 = 1 + 4 + 9."),
      answer: 14,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSumKCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Iterate the array; for each element x, add x**K to the running total. Python's ** uses fast exponentiation.",
        "배열을 순회; 각 원소 x 마다 x**K 를 누적. Python 의 ** 는 빠른 거듭제곱 사용."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N, K, array", "N, K, 배열 읽기"), code: "N, K = ...; A = list(...)", color: "#8b5cf6" },
              { n: 2, label: t(E, "Init total = 0", "total = 0 초기화"), code: "total = 0", color: "#7c3aed" },
              { n: 3, label: t(E, "For each x, add x**K", "각 x 마다 x**K 누적"), code: "for x in A: total += x ** K", color: "#0891b2" },
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
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#8b5cf6" }}>O(N · log K)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "fast exponentiation per element", "원소마다 빠른 거듭제곱")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getSumKSections(E),
    },
  ];
}
