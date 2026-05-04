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
        "Given two binary strings of equal length, compute their XOR.\nXOR returns 1 when bits differ, 0 when they match.", "같은 길이의 두 이진 문자열이 주어졌을 때 XOR을 계산해. XOR은 비트가 다르면 1, 같으면 0을 반환해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u2295"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>XOR The String</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P6</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: XOR truth table: 0^0=0, 0^1=1, 1^0=1, 1^1=0.\nSame bits give 0, different bits give 1.",
              "핵심: XOR 진리표: 0^0=0, 0^1=1, 1^0=1, 1^1=0. 같은 비트는 0,\n다른 비트는 1.")}
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
        "맞아! 같은 비트의 XOR은 항상 0이야. 1 XOR 1 = 0."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "What is 1 XOR 1? Enter the result.", "1 XOR 1은? 결과를 입력해."),
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
        "Simply iterate through both strings and XOR each pair of characters. O(N) time!", "두 문자열을 순회하며 각 문자 쌍을 XOR하면 돼. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Compare characters at each position.\nIf they match, output '0'. If they differ, output '1'. Linear scan.",
              "각 위치의 문자를 비교해.\n같으면 '0', 다르면 '1'을 출력. 선형 스캔.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getXorStringSections(E),
    },
  ];
}
