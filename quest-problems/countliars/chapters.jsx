import { C, t } from "@/components/quest/theme";
import { getCountLiarsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "claims = []",
  "for _ in range(N):",
  "    parts = input().split()",
  "    claims.append((parts[0], int(parts[1])))",
  "",
  "# Try every possible position for Bessie",
  "# For each position p, count contradictions",
  "positions = sorted(set(c[1] for c in claims))",
  "",
  "min_liars = N",
  "for p in range(1, 1000001):",
  "    liars = 0",
  "    for typ, val in claims:",
  "        if typ == 'G' and p < val:",
  "            liars += 1",
  "        elif typ == 'L' and p > val:",
  "            liars += 1",
  "    min_liars = min(min_liars, liars)",
  "",
  "# Optimized: sort and use prefix sums",
  "# Try each claimed position as Bessie's position",
  "ans = N",
  "for p in [c[1] for c in claims]:",
  "    liars = 0",
  "    for typ, val in claims:",
  "        if typ == 'G' and p < val: liars += 1",
  "        elif typ == 'L' and p > val: liars += 1",
  "    ans = min(ans, liars)",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLiarsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows make claims about Bessie's position: 'G x' means position >= x, 'L x' means position <= x.\nFind the minimum number of liars!", "N마리 소가 베시 위치를 주장해: 'G x'는 위치 >= x, 'L x'는 위치 <= x. 최소 거짓말쟁이 수를 구해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"🤥"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Counting Liars</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2022 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Try each possible position for Bessie.\nCount how many claims are contradicted. The minimum across all positions is the answer.",
              "핵심: 베시의 가능한 각 위치를 시도.\n모순되는 주장 수 세기. 모든 위치 중 최솟값이 답.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Claims: 'G 3' and 'L 5'. If Bessie is at position 4, how many liars?", "주장: 'G 3'과 'L 5'. 베시가 위치 4에 있으면, 거짓말쟁이는 몇 명?"),
      question: t(E,
        "'G 3' (pos>=3) and 'L 5' (pos<=5). Bessie at 4. Liars?",
        "'G 3' (위치>=3)과 'L 5' (위치<=5). 베시 위치 4. 거짓말쟁이?"),
      options: [
        t(E, "0 - both claims are true", "0 - 둘 다 참"),
        t(E, "1 - one claim is false", "1 - 하나가 거짓"),
        t(E, "2 - both claims are false", "2 - 둘 다 거짓"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 4 >= 3 (G 3 is true) and 4 <= 5 (L 5 is true). Zero liars!",
        "맞아! 4 >= 3 (G 3은 참)이고 4 <= 5 (L 5는 참). 거짓말쟁이 0명!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Claims: 'G 3' and 'L 2'. What's the minimum number of liars?", "주장: 'G 3'과 'L 2'. 최소 거짓말쟁이 수는?"),
      question: t(E,
        "'G 3' and 'L 2'. Min liars?",
        "'G 3'과 'L 2'. 최소 거짓말쟁이?"),
      hint: t(E,
        "If p=3: G 3 true, L 2 false (3>2). If p=2: G 3 false (2<3), L 2 true. Either way, 1 liar.",
        "p=3이면: G 3 참, L 2 거짓(3>2). p=2이면: G 3 거짓(2<3), L 2 참. 어느 쪽이든 거짓말쟁이 1명."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLiarsCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Try each claimed position, count contradictions. With sorting + prefix sums: O(N log N)!", "각 주장 위치를 시도하고 모순 세기. 정렬 + 누적합: O(N log N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Sort claims by position.\nUse prefix sums to quickly count contradictions for each candidate position.",
              "주장을 위치별로 정렬. 누적합으로 각 후보 위치의 모순을 빠르게 계산.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getCountLiarsSections(E),
    },
  ];
}
