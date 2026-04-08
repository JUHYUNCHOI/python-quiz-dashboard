import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "from itertools import permutations",
  "",
  "N = int(input())",
  "blocks = []",
  "for _ in range(4):",
  "    blocks.append(input().strip())",
  "",
  "# Each block has 6 faces (characters)",
  "# Try all assignments of blocks to positions",
  "# and all face choices",
  "",
  "words = []",
  "for _ in range(N):",
  "    words.append(input().strip())",
  "",
  "ans = 0",
  "for word in words:",
  "    L = len(word)",
  "    found = False",
  "    # Try all permutations of L blocks from 4",
  "    for perm in permutations(range(4), L):",
  "        ok = True",
  "        for i, bi in enumerate(perm):",
  "            if word[i] not in blocks[bi]:",
  "                ok = False",
  "                break",
  "        if ok:",
  "            found = True",
  "            break",
  "    if found:",
  "        ans += 1",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBlocksCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "4 cubes with 6 letters each. Spell words by choosing which block goes where and which face shows. Try all permutations!",
        "4개의 큐브에 각 6개 글자. 어떤 블록을 어디에 놓고 어떤 면을 보여줄지 선택해서 단어를 만들어. 모든 순열을 시도!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"🧱"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Blocks</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2022 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Try all permutations of blocks to positions (4! = 24). For each, check if the required letter exists on that block's faces.",
              "핵심: 블록을 위치에 배치하는 모든 순열 시도 (4! = 24). 각각에 대해 필요한 글자가 블록 면에 있는지 확인.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "4 blocks, word length 3. Pick 3 blocks from 4 and arrange them. How many ways?",
        "4개 블록, 단어 길이 3. 4개 중 3개를 골라 배열. 몇 가지 방법?"),
      question: t(E,
        "C(4,3) * 3! = how many permutations?",
        "C(4,3) * 3! = 몇 가지 순열?"),
      options: [
        t(E, "24", "24"),
        t(E, "12", "12"),
        t(E, "6", "6"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! C(4,3)=4 ways to choose 3 blocks, times 3!=6 arrangements = 24 total.",
        "맞아! C(4,3)=4가지로 3개 블록 선택, 곱하기 3!=6 배열 = 총 24가지."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Block 1 has faces \"COWMOO\" (C,O,W,M,O,O). Can it show the letter 'C'? Yes=1, No=0",
        "블록1의 면이 \"COWMOO\" (C,O,W,M,O,O). 글자 'C'를 보여줄 수 있어? 예=1, 아니오=0"),
      question: t(E,
        "Block \"COWMOO\": can it show 'C'? (1=yes, 0=no)",
        "블록 \"COWMOO\": 'C'를 보여줄 수 있어? (1=예, 0=아니오)"),
      hint: t(E,
        "'C' is the first character of \"COWMOO\". Yes!",
        "'C'는 \"COWMOO\"의 첫 글자. 당연히 가능!"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBlocksCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "4! permutations * 6 faces each = small constant. For each word, brute force all block assignments. O(N * 4! * L).",
        "4! 순열 * 각 6면 = 작은 상수. 각 단어에 대해 모든 블록 배치를 전수조사. O(N * 4! * L)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N * 24 * L)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each word: try all permutations of 4 blocks. For each permutation, check if position i's required letter exists on the assigned block. Early exit on mismatch.",
              "각 단어: 4개 블록의 모든 순열 시도. 각 순열에서 위치 i에 필요한 글자가 배정된 블록에 있는지 확인. 불일치 시 조기 종료.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the full brute-force solution!",
        "전수조사 전체 풀이야!"),
      label: t(E, "Python Solution", "Python 풀이"),
      code: SOLUTION_CODE,
    },
  ];
}
