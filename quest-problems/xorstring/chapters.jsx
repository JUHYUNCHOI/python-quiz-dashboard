import { C, t } from "@/components/quest/theme";
import { getXorStringSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "S = input().strip()",
  "T = input().strip()",
  "",
  "# XOR two binary strings of equal length",
  "result = []",
  "for i in range(len(S)):",
  "    if S[i] == T[i]:",
  "        result.append('0')",
  "    else:",
  "        result.append('1')",
  "",
  "print(''.join(result))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeXorStringCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two binary strings A and B of EQUAL length are given.\nPrint the bitwise XOR — a string the same length where each position is 0 if A and B match there, else 1.",
        "같은 길이의 두 이진 문자열 A, B 가 주어져요.\n비트별 XOR — 같은 길이의 문자열로, 각 위치에서 A 와 B 가 같으면 0, 다르면 1 — 을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u2295"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>XOR The String</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P6</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two ", "두 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "binary strings A, B of equal length", "같은 길이의 이진 문자열 A, B")}</b>
                  {t(E, " are given.", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "bitwise XOR string", "비트별 XOR 문자열")}</b>
                  {t(E, " — same bits → 0, different bits → 1.",
                        " — 같은 비트는 0, 다른 비트는 1.")}
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
        "XOR basics: what is 1 XOR 1?", "XOR 기초: 1 XOR 1은?"),
      question: t(E,
        "What is 1 XOR 1?",
        "1 XOR 1은?"),
      options: [
        t(E, "0 (same bits = 0)", "0 (같은 비트 = 0)"),
        t(E, "1 (both are 1)", "1 (둘 다 1이니까)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! XOR of same bits is always 0. 1 XOR 1 = 0.",
        "맞아! 같은 비트의 XOR은 항상 0이예요. 1 XOR 1 = 0."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "What is 1 XOR 1? Enter the result.", "1 XOR 1은? 결과를 입력해요."),
      question: t(E,
        "1 XOR 1 = ?",
        "1 XOR 1 = ?"),
      hint: t(E,
        "Same bits XOR to 0.",
        "같은 비트의 XOR은 0."),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeXorStringCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Walk both strings in parallel: at each position, output '0' if A[i] == B[i] else '1'.",
        "두 문자열을 동시에 순회: 각 위치에서 A[i] == B[i] 면 '0', 아니면 '1' 출력."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read A, B", "A, B 읽기"), code: "A = input();  B = input()", color: "#2563eb" },
              { n: 2, label: t(E, "Walk in parallel", "동시 순회"), code: "result = ''", color: "#7c3aed" },
              { n: 3, label: t(E, "Per position: same → 0, diff → 1", "위치별: 같음 → 0, 다름 → 1"), code: "for a, b in zip(A, B): result += '0' if a == b else '1'", color: "#0891b2" },
              { n: 4, label: t(E, "Print result", "결과 출력"), code: "print(result)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#1e3a8a", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single linear pass", "선형 한 번")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getXorStringSections(E),
    },
  ];
}
