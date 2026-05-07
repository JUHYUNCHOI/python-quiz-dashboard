import { C, t } from "@/components/quest/theme";
import { getBlocksSections } from "./components";

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
        "FJ has 4 cubes; each cube has 6 letters (one per face).\nFor each query word, decide whether you can spell it by lining up the 4 cubes left-to-right, choosing which cube goes in each position and which face shows.\nFor each query, print YES or NO.",
        "FJ에게 4개의 큐브가 있고, 각 큐브의 6개 면에 글자가 한 개씩 있어요.\n각 단어 쿼리에 대해, 4개 큐브를 왼쪽부터 오른쪽으로 나란히 놓고 — 어느 큐브를 어디에, 어느 면을 위로 — 선택해서 그 단어를 만들 수 있는지 판단해요.\n각 쿼리마다 YES 또는 NO를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🧱"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Blocks</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2022 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "4 cubes", "4개의 큐브")}</b>
                  {t(E, " — each cube has ", "가 있어요 — 각 큐브는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "6 letters (one per face)", "6개 면에 글자가 1개씩")}</b>
                  {t(E, ".", " 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "To spell a 4-letter word, line up the 4 cubes ", "4글자 단어를 만들려면 큐브 4개를 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "left to right", "왼쪽부터 오른쪽")}</b>
                  {t(E, " — pick which cube sits in each position and which face is showing.",
                        "으로 나란히 놓고, 어느 큐브를 어디에 놓을지와 어느 면을 보일지 선택해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each cube can be used ", "각 큐브는 한 단어 안에서 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "at most once per word", "최대 한 번만")}</b>
                  {t(E, " (one block per position).",
                        " 사용해요 (한 위치에 한 큐브).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each query word, print ", "각 단어 쿼리에 대해 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "YES if it can be spelled, else NO", "만들 수 있으면 YES, 아니면 NO")}</b>
                  {t(E, ".", " 를 출력해요.")}
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
        "4 blocks, word length 3. Pick 3 blocks from 4 and arrange them. How many ways?", "4개 블록, 단어 길이 3. 4개 중 3개를 골라 배열. 몇 가지 방법?"),
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
        "Block 1 has faces \"COWMOO\" (C,O,W,M,O,O). Can it show the letter 'C'? Yes=1, No=0", "블록1의 면이 \"COWMOO\" (C,O,W,M,O,O). 글자 'C'를 보여줄 수 있어요? 예=1, 아니오=0"),
      question: t(E,
        "Block \"COWMOO\": can it show 'C'? (1=yes, 0=no)",
        "블록 \"COWMOO\": 'C'를 보여줄 수 있어요? (1=예, 0=아니오)"),
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
export function makeBlocksCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Only 4! = 24 ways to assign the 4 cubes to positions. For each query word, try every assignment and check that the required letter at each position exists on the assigned cube's faces.",
        "4 개 큐브를 위치에 배정하는 방법은 4! = 24 가지뿐. 각 단어 쿼리에 대해 모든 배정을 시도하고, 각 위치에 필요한 글자가 배정된 큐브의 면에 있는지 확인."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBlocksSections(E),
    },
  ];
}
