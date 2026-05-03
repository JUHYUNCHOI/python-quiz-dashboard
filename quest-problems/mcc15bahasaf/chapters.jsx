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
        "Bahasa F is a language where every consonant in a word is replaced with the letter 'f'. Vowels (a, e, i, o, u) remain unchanged. Simple string processing!",
        "Bahasa F는 단어의 모든 자음을 'f'로 바꾸는 언어야. 모음(a, e, i, o, u)은 그대로 유지돼. 간단한 문자열 처리!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udde3\ufe0f"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Bahasa F</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P3</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Iterate through each character. If it's a consonant (not a vowel), replace it with 'f'. Vowels are a, e, i, o, u.",
              "핵심: 각 문자를 순회해. 자음이면 (모음이 아니면) 'f'로 교체. 모음은 a, e, i, o, u.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Consonants are letters that are NOT vowels. The vowels are a, e, i, o, u. Is 'b' a consonant?",
        "자음은 모음이 아닌 글자야. 모음은 a, e, i, o, u. 'b'는 자음일까?"),
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
        "맞아! 'b'는 {a, e, i, o, u}에 없으니까 자음이고 'f'로 교체돼."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Is 'b' a consonant? Enter 1 for Yes, 0 for No.",
        "'b'는 자음인가? 예는 1, 아니오는 0을 입력해."),
      question: t(E,
        "Is 'b' a consonant? (1=Yes, 0=No)",
        "'b'는 자음인가? (1=예, 0=아니오)"),
      hint: t(E,
        "'b' is not a vowel (a,e,i,o,u), so it IS a consonant. Answer: 1",
        "'b'는 모음(a,e,i,o,u)이 아니니까 자음이야. 답: 1"),
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
        "We scan each character once, so it's O(N) where N is the length of the word.",
        "각 문자를 한 번씩 보니까 단어 길이 N에 대해 O(N)이야."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each character, check if it's a vowel. If not, replace with 'f'. Simple linear scan.",
              "각 문자마다 모음인지 확인. 아니면 'f'로 교체. 간단한 선형 스캔.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc15BahasaSections(E),
    },
  ];
}
