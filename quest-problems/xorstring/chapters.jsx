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
        "같은 길이의 두 이진 문자열 A, B 가 주어져요.\n비트별 XOR 을 출력해요. 결과는 같은 길이의 문자열이고, 각 위치에서 A 와 B 가 같으면 0, 다르면 1 이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u2295"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>XOR The String</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P6</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two ", "두 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "binary strings A, B of equal length", "같은 길이의 이진 문자열 A, B")}</b>
                  {t(E, " are given.", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "맞아! 같은 비트의 XOR은 항상 0이에요. 1 XOR 1 = 0."),
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
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
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
