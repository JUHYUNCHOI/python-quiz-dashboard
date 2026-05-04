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
        "Bessie has N alphabet blocks; each block has a word printed on its FRONT face and a word on its BACK face. To 'spell' a word using a block, the block must contain enough letter cubes for that word.\nFor each letter A..Z, find the minimum number of letter cubes Bessie needs so that she can spell EITHER the front or back word of every block — the answer is one count per letter.",
        "베시에게 N개의 알파벳 판이 있고, 각 판의 앞면과 뒷면에 각각 단어가 적혀있어요. 어떤 단어를 만들려면 그 글자만큼의 글자 큐브가 필요해요.\n각 알파벳 A..Z 에 대해, 베시가 모든 판의 앞면 또는 뒷면 단어 중 하나를 만들 수 있도록 보유해야 할 글자 큐브의 최소 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\udde9"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Block Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2016 Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has ", "베시에게 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "N alphabet blocks", "N개의 알파벳 판")}</b>
                  {t(E, " — each block has a word on its FRONT and a word on its BACK.",
                        " 가 있어요 — 각 판의 앞면과 뒷면에 각각 단어가 적혀있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She wants enough ", "그녀는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "letter cubes", "글자 큐브")}</b>
                  {t(E, " (one cube per letter occurrence) so she can spell ", " (글자 1개당 큐브 1개) 를 가지고 있어서, 각 판마다 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "either side's word", "앞면 또는 뒷면 단어")}</b>
                  {t(E, " for every block.", " 중 하나를 만들 수 있어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print, for each letter A..Z, the ", "각 알파벳 A..Z 에 대해, ")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of cubes of that letter required", "필요한 그 알파벳 큐브의 최소 개수")}</b>
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
        "1 board: front = 'AB', back = 'CD'.\nWe need blocks for either AB or CD.\nFor front: A=1, B=1.\nFor back: C=1, D=1.\nMax per letter: A=1, B=1, C=1, D=1.\nBut we only see one side!\nSo we need max(2 blocks for AB, 2 blocks for CD) = 2 total blocks.", "판 1개: 앞 = 'AB', 뒤 = 'CD'.\nAB 또는 CD용 블록이 필요해요.\n앞: A=1, B=1.\n뒤: C=1, D=1.\n글자별 최대: A=1, B=1, C=1, D=1.\n하지만 한 면만 보여요!\nmax(AB용 2블록, CD용 2블록) = 총 2블록."),
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
        "맞아! 한 면만 보이니까 AB 또는 CD에 충분한 블록이 필요해요. max(2,2) = 2블록이예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For 1 board with 'AB' on front and 'CD' on back, how many total blocks are needed?", "앞면 'AB', 뒷면 'CD'인 판 1개에 총 몇 개 블록이 필요해요?"),
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
        "For each board, count letters in both words and take the max per letter.\nSum all maxes across boards.\nO(N * L) where L is word length.", "각 판에서 양면 단어의 글자를 세고 글자별 최댓값을 취해요. 모든 판의 최댓값을 합산. O(N * L), L은 단어 길이."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N * L)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Use Counter for each word.\nFor each board, take max(front_count, back_count) per letter and add to global needs. Final answer is sum of all global needs.",
              "각 단어에 Counter 사용.\n각 판에서 글자별 max(앞면 개수, 뒷면 개수)를 구해 전역 필요량에 더해요.\n최종 답은 전역 필요량의 합.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBlockGameSections(E),
    },
  ];
}
