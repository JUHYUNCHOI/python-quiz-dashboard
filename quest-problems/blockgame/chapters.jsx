import { C, t } from "@/components/quest/theme";
import { getBlockGameSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "from collections import Counter",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "need = Counter()",
  "",
  "for _ in range(N):",
  "    front = input().strip()",
  "    back = input().strip()",
  "    cf = Counter(front)",
  "    cb = Counter(back)",
  "    # For each letter, we need max of front count and back count",
  "    all_letters = set(cf.keys()) | set(cb.keys())",
  "    for ch in all_letters:",
  "        need[ch] += max(cf[ch], cb[ch])",
  "",
  "print(sum(need.values()))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBlockGameCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie has N boards, each with a word on front and back.\nShe needs letter blocks to spell any visible configuration.\nFor each board, she sees either the front or back word.\nFind the minimum total blocks needed.", "베시에게 N개의 판이 있고, 각 판의 앞뒤에 단어가 있어.\n어떤 구성이든 철자를 만들 수 있는 글자 블록이 필요해.\n각 판에서 앞면 또는 뒷면 단어를 봐.\n필요한 최소 총 블록 수를 구해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\udde9"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Block Game</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2016 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: For each board, count letters in front and back words.\nTake max per letter. Sum across all boards for the total blocks needed.",
              "핵심: 각 판에서 앞면과 뒷면 단어의 글자 수를 세.\n글자별 최댓값을 취해.\n모든 판에 대해 합산하면 필요한 총 블록 수야.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "1 board: front = 'AB', back = 'CD'.\nWe need blocks for either AB or CD.\nFor front: A=1, B=1.\nFor back: C=1, D=1.\nMax per letter: A=1, B=1, C=1, D=1.\nBut we only see one side!\nSo we need max(2 blocks for AB, 2 blocks for CD) = 2 total blocks.", "판 1개: 앞 = 'AB', 뒤 = 'CD'.\nAB 또는 CD용 블록이 필요해.\n앞: A=1, B=1.\n뒤: C=1, D=1.\n글자별 최대: A=1, B=1, C=1, D=1.\n하지만 한 면만 보여!\nmax(AB용 2블록, CD용 2블록) = 총 2블록."),
      question: t(E,
        "1 board with 'AB' front and 'CD' back. How many total blocks needed?",
        "앞면 'AB', 뒷면 'CD'인 판 1개. 총 몇 개 블록 필요?"),
      options: [
        t(E, "2 blocks", "2개"),
        t(E, "4 blocks", "4개"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! We need max(front needs, back needs) per letter. Since AB and CD share no letters, we need max(1,0) for each = 1 each for A,B,C,D. Wait - we only see ONE side. So we need enough for AB OR CD. That's max(2,2) = 2 blocks.",
        "맞아! 한 면만 보이니까 AB 또는 CD에 충분한 블록이 필요해. max(2,2) = 2블록이야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For 1 board with 'AB' on front and 'CD' on back, how many total blocks are needed?", "앞면 'AB', 뒷면 'CD'인 판 1개에 총 몇 개 블록이 필요해?"),
      question: t(E,
        "Total blocks for 1 board: front='AB', back='CD'?",
        "판 1개 총 블록 수: 앞='AB', 뒤='CD'?"),
      hint: t(E,
        "max(abs(AB), abs(CD)) = max(2, 2) = 2.",
        "max(abs(AB), abs(CD)) = max(2, 2) = 2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBlockGameCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each board, count letters in both words and take the max per letter.\nSum all maxes across boards.\nO(N * L) where L is word length.", "각 판에서 양면 단어의 글자를 세고 글자별 최댓값을 취해. 모든 판의 최댓값을 합산. O(N * L), L은 단어 길이."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N * L)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Use Counter for each word.\nFor each board, take max(front_count, back_count) per letter and add to global needs. Final answer is sum of all global needs.",
              "각 단어에 Counter 사용.\n각 판에서 글자별 max(앞면 개수, 뒷면 개수)를 구해 전역 필요량에 더해.\n최종 답은 전역 필요량의 합.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getBlockGameSections(E),
    },
  ];
}
