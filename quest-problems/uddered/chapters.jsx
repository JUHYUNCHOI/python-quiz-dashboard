import { C, t } from "@/components/quest/theme";
import { getUdderedSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "order = input().strip()",
  "heard = input().strip()",
  "",
  "pos = {}",
  "for i, ch in enumerate(order):",
  "    pos[ch] = i",
  "",
  "cycles = 1",
  "for i in range(1, len(heard)):",
  "    if pos[heard[i]] <= pos[heard[i-1]]:",
  "        cycles += 1",
  "",
  "print(cycles)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (3 steps: reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeUdderedCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie has a custom 26-letter alphabet order. She hears a string S; each character must be read in order, but she has to FULLY recite the alphabet at least once between any two characters that move backward in her order (or stay the same).\nPrint the MINIMUM number of full alphabet recitations she needs to read all of S.",
        "Bessie에게 26 글자의 커스텀 알파벳 순서가 있어요. 문자열 S 를 들으면 각 문자를 순서대로 읽어야 해요. 다만 두 인접 문자가 그녀의 순서에서 뒤로 가거나 같으면, 그 사이에 알파벳 전체를 적어도 한 번 외워야 해요.\nS 를 모두 읽기 위해 필요한 최소 알파벳 외우기 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd24"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Uddered but not Herd</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2021 Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has a ", "Bessie에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "custom 26-letter alphabet order", "26 글자의 커스텀 알파벳 순서")}</b>
                  {t(E, " (a permutation of a..z).",
                        " (a..z 의 순열) 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She hears string S; she reads each letter in order. To read the next letter when it ", "S 문자열을 들으면 각 문자를 순서대로 읽어요. 다음 문자가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "comes before or equals the current letter in her order", "그녀의 순서에서 현재 문자보다 앞이거나 같으면")}</b>
                  {t(E, ", she must FULLY recite her alphabet first.",
                        " 먼저 알파벳을 전체 외워야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MINIMUM number of full alphabet recitations needed to read all of S", "S 를 모두 읽기 위한 최소 알파벳 외우기 횟수")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "If the alphabet order is \"abc\" and the heard string is \"ac\", how many cycles do we need?", "알파벳 순서가 \"abc\"이고 들은 문자열이 \"ac\"이면, 몇 사이클이 필요할까?"),
      question: t(E,
        "Alphabet: \"abc\", heard: \"ac\". How many cycles?",
        "알파벳: \"abc\", 들은 문자열: \"ac\". 몇 사이클?"),
      options: [
        t(E, "1 cycle (a before c in order)", "1 사이클 (a가 c보다 앞)"),
        t(E, "2 cycles", "2 사이클"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 'a' is at position 0, 'c' is at position 2. Since 2 > 0, no new cycle needed. Total: 1 cycle.",
        "맞아! 'a'는 위치 0, 'c'는 위치 2. 2 > 0이므로 새 사이클 불필요. 총: 1 사이클."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Alphabet order is \"abc\", heard string is \"ca\". How many cycles?", "알파벳 순서가 \"abc\", 들은 문자열이 \"ca\"야. 몇 사이클?"),
      question: t(E,
        "Alphabet: \"abc\", heard: \"ca\". How many cycles needed?",
        "알파벳: \"abc\", 들은 문자열: \"ca\". 몇 사이클 필요?"),
      hint: t(E,
        "'c' is at position 2, 'a' is at position 0. Since 0 <= 2, we need a new cycle. Total: 2.",
        "'c'는 위치 2, 'a'는 위치 0. 0 <= 2이므로 새 사이클 필요. 총: 2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeUdderedCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Map each letter to its position in Bessie's custom alphabet. Scan S; whenever next letter's custom-position ≤ current's, she must recite the alphabet again. Start with cycle = 1.",
        "각 글자를 Bessie의 커스텀 알파벳에서의 위치로 매핑. S 를 스캔; 다음 글자의 커스텀-위치 ≤ 현재 위치 일 때 알파벳을 다시 외워야 함. cycle = 1 부터 시작."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Build position map", "위치 맵 구축"), code: "pos = {letter: i for i, letter in enumerate(alphabet)}", color: "#dc2626" },
              { n: 2, label: t(E, "Init cycles = 1", "cycles = 1 초기화"), code: "cycles = 1", color: "#7c3aed" },
              { n: 3, label: t(E, "Scan S; bump on backward step", "S 스캔; 뒤로 가면 cycles +1"), code: "for i in range(1, len(S)): if pos[S[i]] <= pos[S[i-1]]: cycles += 1", color: "#0891b2" },
              { n: 4, label: t(E, "Print cycles", "cycles 출력"), code: "print(cycles)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single linear scan", "선형 한 번 스캔")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getUdderedSections(E),
    },
  ];
}
