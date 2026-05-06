import { C, t } from "@/components/quest/theme";
import { getMcc15BahasaSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "def translate(word):",
  "    vowels = set('aeiouAEIOU')",
  "    result = []",
  "    i = 0",
  "    while i < len(word):",
  "        if word[i] not in vowels:",
  "            # consonant: replace with 'f'",
  "            result.append('f')",
  "            i += 1",
  "        else:",
  "            # vowel: keep as is",
  "            result.append(word[i])",
  "            i += 1",
  "    return ''.join(result)",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    word = input().strip()",
  "    print(translate(word))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15BahasaCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bahasa F is a language: every CONSONANT in a word becomes the letter 'f'; vowels (a, e, i, o, u) stay the same.\nGiven a word, print its Bahasa F translation.",
        "Bahasa F 라는 언어가 있어요: 단어의 모든 자음이 'f' 가 되고, 모음 (a, e, i, o, u) 은 그대로 유지돼요.\n단어가 주어지면 Bahasa F 번역을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udde3\ufe0f"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Bahasa F</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P3</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "In ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "Bahasa F", "Bahasa F")}</b>
                  {t(E, ", every consonant in a word becomes ", " 에서는 단어의 모든 자음이 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>'f'</code>
                  {t(E, ".", " 가 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Vowels ", "모음 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "(a, e, i, o, u) stay unchanged", "(a, e, i, o, u) 은 그대로 유지")}</b>
                  {t(E, ".", " 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "Bahasa F translation of the input word", "입력 단어의 Bahasa F 번역")}</b>
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
        "Consonants are letters that are NOT vowels.\nThe vowels are a, e, i, o, u.\nIs 'b' a consonant?", "자음은 모음이 아닌 글자예요. 모음은 a, e, i, o, u. 'b'는 자음일까요?"),
      question: t(E,
        "Vowels are a, e, i, o, u. Is 'b' a consonant? (1=Yes, 0=No)",
        "모음은 a, e, i, o, u. 'b'는 자음인가? (1=예, 0=아니오)"),
      options: [
        t(E, "Yes (1) - 'b' is not a vowel", "예 (1) - 'b'는 모음이 아니야"),
        t(E, "No (0) - 'b' is a vowel", "아니오 (0) - 'b'는 모음이야"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 'b' is not in {a, e, i, o, u}, so it's a consonant and gets replaced with 'f'.",
        "맞아! 'b'는 {a, e, i, o, u}에 없으니까 자음이고 'f'로 교체돼요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Is 'b' a consonant? Enter 1 for Yes, 0 for No.", "'b'는 자음인가? 예는 1, 아니오는 0을 입력해요."),
      question: t(E,
        "Is 'b' a consonant? (1=Yes, 0=No)",
        "'b'는 자음인가? (1=예, 0=아니오)"),
      hint: t(E,
        "'b' is not a vowel (a,e,i,o,u), so it IS a consonant. Answer: 1",
        "'b'는 모음(a,e,i,o,u)이 아니니까 자음이에요. 답: 1"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15BahasaCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Scan each character; if it's a vowel keep it, otherwise replace with 'f'.",
        "각 문자를 스캔; 모음이면 유지, 아니면 'f' 로 교체."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Define vowels", "모음 정의"), code: "vowels = set('aeiou')", color: "#dc2626" },
              { n: 2, label: t(E, "Scan word characters", "단어 문자 스캔"), code: "for c in word:", color: "#7c3aed" },
              { n: 3, label: t(E, "Keep vowels, else 'f'", "모음 유지, 그 외 'f'"), code: "output += c if c in vowels else 'f'", color: "#0891b2" },
              { n: 4, label: t(E, "Print result", "결과 출력"), code: "print(output)", color: "#16a34a" },
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
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single linear scan over the word", "단어 한 번 선형 스캔")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc15BahasaSections(E),
    },
  ];
}
