import { C, t } from "@/components/quest/theme";
import { getMadSciSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "A = input().strip()",
  "B = input().strip()",
  "",
  "# Count contiguous blocks where A[i] != B[i]",
  "flips = 0",
  "in_diff = False",
  "for i in range(N):",
  "    if A[i] != B[i]:",
  "        if not in_diff:",
  "            flips += 1",
  "            in_diff = True",
  "    else:",
  "        in_diff = False",
  "",
  "print(flips)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeMadSciCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two strings A and B of H's and G's. One flip operation reverses a contiguous substring of B (swaps all H<->G in that range). Find the minimum flips to make B equal A.",
        "H와 G로 된 두 문자열 A, B. 한 번의 뒤집기로 B의 연속 부분 문자열의 H<->G를 교환. B를 A로 만드는 최소 뒤집기 수를 구해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\uddea"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Mad Scientist</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2020 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Count the number of contiguous blocks where A and B differ. Each block needs exactly one flip.",
              "핵심: A와 B가 다른 연속 블록의 수를 세. 각 블록은 정확히 한 번의 뒤집기가 필요.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "A = \"HH\", B = \"GG\". Both positions differ, forming 1 contiguous block. How many flips?",
        "A = \"HH\", B = \"GG\". 두 위치 모두 달라서 1개의 연속 블록. 뒤집기 몇 번?"),
      question: t(E,
        "A = \"HH\", B = \"GG\". Min flips to make B equal A?",
        "A = \"HH\", B = \"GG\". B를 A로 만드는 최소 뒤집기 수?"),
      options: [
        t(E, "1 (flip entire B)", "1 (B 전체를 뒤집기)"),
        t(E, "2 (flip each character)", "2 (각 문자를 뒤집기)"),
        t(E, "0 (already equal)", "0 (이미 같음)"),
      ],
      correct: 0,
      explain: t(E,
        "Both positions differ and form one contiguous block. One flip of the entire string fixes it.",
        "두 위치가 모두 달라서 하나의 연속 블록. 전체 문자열을 한 번 뒤집으면 해결."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "A = \"HGH\", B = \"GHG\". All 3 positions differ. They form 1 contiguous block of differences. How many flips?",
        "A = \"HGH\", B = \"GHG\". 3개 위치 모두 달라. 1개의 연속 차이 블록. 뒤집기 몇 번?"),
      question: t(E,
        "A = \"HGH\", B = \"GHG\". Min flips?",
        "A = \"HGH\", B = \"GHG\". 최소 뒤집기 수?"),
      hint: t(E,
        "All 3 positions differ, forming 1 contiguous block. Flip all of B: GHG -> HGH = A. Answer: 1.",
        "3개 위치 모두 달라 1개 블록. B 전체 뒤집기: GHG -> HGH = A. 답: 1."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeMadSciCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Just scan once and count contiguous differing blocks. O(N) time!",
        "한 번 스캔해서 연속 차이 블록을 세면 돼. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Scan A and B in parallel. Each time we enter a new block where A[i] != B[i], increment the counter. That's the answer!",
              "A와 B를 동시에 스캔. A[i] != B[i]인 새로운 블록에 들어갈 때마다 카운터 증가. 그게 답!")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMadSciSections(E),
    },
  ];
}
