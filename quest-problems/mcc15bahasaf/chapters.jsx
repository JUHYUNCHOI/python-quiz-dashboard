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
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Bahasa F</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Print the Bahasa F translation of the input word.",
                "입력 단어의 Bahasa F 번역을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "In ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "Bahasa F", "Bahasa F")}</b>
                  {t(E, ", every consonant in a word becomes ", " 에서는 단어의 모든 자음이 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>'f'</code>
                  {t(E, ".", " 가 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Vowels ", "모음 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "(a, e, i, o, u) stay unchanged", "(a, e, i, o, u) 은 그대로 유지")}</b>
                  {t(E, ".", " 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
    // 1-1b: Deep-audit sim — trace each letter of "bahasa"
    {
      type: "reveal",
      narr: t(E,
        "Let's walk through 'bahasa' letter by letter. For each letter, ask: vowel or consonant? Vowels stay, consonants become 'f'.",
        "'bahasa'를 한 글자씩 따라가요. 각 글자마다 물어봐요: 모음이야, 자음이야? 모음은 그대로, 자음은 'f'로 변해요."),
      content: (() => {
        const word = "bahasa";
        const vowels = new Set("aeiou");
        const trace = word.split("").map((ch, idx) => {
          const isVowel = vowels.has(ch);
          return { idx, ch, isVowel, out: isVowel ? ch : "f" };
        });
        const result = trace.map(r => r.out).join("");
        return (
          <div style={{ padding: 16 }}>
            <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
                🔬 {t(E, "Deep Audit", "꼼꼼히 살펴보기")}
              </div>
              <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
                {t(E,
                  "Trace 'bahasa' one letter at a time.",
                  "'bahasa'를 한 글자씩 따라가요.")}
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 700 }}>
                {trace.map(r => (
                  <span key={`in-${r.idx}`} style={{
                    display: "inline-block", minWidth: 28, textAlign: "center",
                    padding: "4px 6px", borderRadius: 6,
                    background: r.isVowel ? "#ede9fe" : "#fee2e2",
                    color: r.isVowel ? "#7c3aed" : "#dc2626",
                    border: `1.5px solid ${r.isVowel ? "#c4b5fd" : "#fca5a5"}`,
                  }}>{r.ch}</span>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: C.text, marginBottom: 12 }}>
                {trace.map(r => (
                  <div key={`row-${r.idx}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", background: r.isVowel ? "#faf5ff" : "#fef2f2", borderRadius: 6 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: r.isVowel ? "#7c3aed" : "#dc2626", minWidth: 20 }}>{r.ch}</span>
                    <span style={{ color: C.dim }}>→</span>
                    <span style={{ fontSize: 11, color: r.isVowel ? "#7c3aed" : "#dc2626", fontWeight: 600 }}>
                      {r.isVowel
                        ? t(E, "vowel · keep", "모음 · 유지")
                        : t(E, "consonant · → 'f'", "자음 · → 'f'")}
                    </span>
                    <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: r.isVowel ? "#7c3aed" : "#dc2626" }}>{r.out}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, paddingTop: 10, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ fontSize: 11, color: C.dim, fontWeight: 600 }}>{t(E, "Result", "결과")}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 800, color: "#15803d", background: "#f0fdf4", padding: "4px 10px", borderRadius: 6, border: "1.5px solid #86efac" }}>
                  {result}
                </span>
              </div>
            </div>

            <div style={{ fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
              {t(E,
                "Same loop runs for every letter — check the vowel set, then append.",
                "모든 글자에 같은 로직 — 모음 집합을 확인하고, 결과에 추가.")}
            </div>
          </div>
        );
      })(),
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
        "Check if 'b' appears in the vowel set {a, e, i, o, u}. If not, it's a consonant.",
        "'b'가 모음 집합 {a, e, i, o, u}에 있는지 확인해봐요. 없으면 자음이에요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15BahasaCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Scan each character; if it's a vowel keep it, otherwise replace with 'f'. Sections build it one piece at a time.",
        "각 문자를 스캔; 모음이면 유지, 아니면 'f' 로 교체. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc15BahasaSections(E),
    },
  ];
}
