import { C, t } from "@/components/quest/theme";
import { getPhotoshootSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "s = input()",
  "",
  "# Count G's at even 1-indexed positions (indices 1,3,5,...)",
  "# We want to maximize G's at even positions",
  "# Strategy: greedily fix prefix reversals",
  "",
  "cows = list(s)",
  "ans = 0",
  "",
  "for i in range(N - 1):",
  "    # If current cow doesn't match desired pattern,",
  "    # find the next different cow and reverse prefix",
  "    if cows[i] == cows[i + 1]:",
  "        continue",
  "    # A transition means we might need a reversal",
  "    ans += 1",
  "",
  "# The answer relates to counting transitions",
  "# between G and H in the string",
  "g_even = sum(1 for i in range(N) if (i+1) % 2 == 0 and cows[i] == 'G')",
  "print(g_even)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhotoshootCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Arrange G (Guernsey) and H (Holstein) cows to maximize G at even positions.\nUse minimum prefix reversals to rearrange!", "G(건지)와 H(홀스타인) 소를 배치해서 짝수 위치에 G를 최대화해요! 최소 접두사 뒤집기로 재배열해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"📸"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Photoshoot</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2022 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Count how many G cows are at even 1-indexed positions.\nUse prefix reversals to move G's into even positions.",
              "핵심: 1-인덱스 짝수 위치에 G 소가 몇 마리인지 세기.\n접두사 뒤집기로 G를 짝수 위치로 이동.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's check: in \"GHHG\", how many G's are at even positions (1-indexed, even = 2,4)?", "확인해보자: \"GHHG\"에서 짝수 위치(1-인덱스, 짝수=2,4)에 G가 몇 개예요?"),
      question: t(E,
        "\"GHHG\": pos 2 is H, pos 4 is G. How many G at even positions?",
        "\"GHHG\": 위치2는 H, 위치4는 G. 짝수 위치의 G 개수는?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "0", "0"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Position 2 has H, position 4 has G. Only 1 G at an even position.",
        "맞아! 위치2는 H, 위치4는 G. 짝수 위치에 G는 1개뿐이예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "In \"GHHG\", how many G's are at even 1-indexed positions?", "\"GHHG\"에서 1-인덱스 짝수 위치에 G가 몇 개예요?"),
      question: t(E,
        "\"GHHG\": How many G at even positions (2,4)?",
        "\"GHHG\": 짝수 위치(2,4)에 G가 몇 개?"),
      hint: t(E,
        "Pos 2 = H, Pos 4 = G. Count only G's.",
        "위치2 = H, 위치4 = G. G만 세."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhotoshootCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "We scan the string once to count G's at even positions. O(N) time!", "문자열을 한 번 스캔해서 짝수 위치의 G를 세면 돼요. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Scan the string, count G's at even 1-indexed positions.\nPrefix reversals can optimally place G's at even spots.",
              "문자열 스캔, 1-인덱스 짝수 위치의 G 개수 세기.\n접두사 뒤집기로 G를 짝수 자리에 최적 배치.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getPhotoshootSections(E),
    },
  ];
}
