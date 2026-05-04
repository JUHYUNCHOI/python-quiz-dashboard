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
        "Bessie hears a string of letters.\nShe knows the custom alphabet order.\nEach time the next letter comes before or at the current letter in the alphabet, she needs a new cycle.\nCount the minimum full cycles!", "Bessie가 글자 문자열을 들어. 커스텀 알파벳 순서를 알고 있어. 다음 글자가 현재 글자보다 앞에 있으면 새 사이클이 필요해. 최소 사이클 수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd24"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Uddered but not Herd</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2021 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Scan through the heard string.\nTrack position in the custom alphabet. When the next letter's position is <= current letter's position, start a new cycle.",
              "핵심: 들은 문자열을 스캔해.\n커스텀 알파벳에서의 위치를 추적해.\n다음 글자 위치가 현재 위치 이하이면 새 사이클을 시작해.")}
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
        "Scan once through the string.\nEach time next letter is before or at current in order, increment cycle count.\nO(N) time!", "문자열을 한 번 스캔해. 다음 글자가 현재 이하 위치면 사이클 카운트 증가. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Map each letter to its position in the custom alphabet.\nScan the heard string: if next position <= current position, start a new cycle.",
              "각 글자를 커스텀 알파벳에서의 위치로 매핑해.\n들은 문자열 스캔: 다음 위치 <= 현재 위치면 새 사이클 시작.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getUdderedSections(E),
    },
  ];
}
