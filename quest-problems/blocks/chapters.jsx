import { C, t } from "@/components/quest/theme";
import BlockLetterSim from "./BlockLetterSim";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBlocksCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Can you spell the word by lining up 4 cubes?",
        "큐브 4개를 늘어놓아 그 단어를 만들 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🧱"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Blocks</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2022 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "For each query word, print YES if it can be spelled with the 4 cubes, else NO.",
                "단어마다 큐브 4개로 만들 수 있으면 YES, 없으면 NO 를 출력해요.")}
            </div>
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
                  {t(E, "For each query word, print ", "단어마다 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "YES if it can be spelled, else NO", "만들 수 있으면 YES, 아니면 NO")}</b>
                  {t(E, ".", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Official I/O format + verbatim sample
    {
      type: "reveal",
      narr: t(E,
        "Here is the exact input/output format and the official sample. Read it once — your program must reproduce this output exactly.",
        "입력과 출력이 어떤 모양인지 확인해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10, fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>📥 {t(E, "Input", "입력")}</div>
            <div>{t(E, "Line 1: N (1 ≤ N ≤ 10), the number of words.", "1번째 줄: 단어 개수 N (1 ≤ N ≤ 10).")}</div>
            <div>{t(E, "Next 4 lines: each is 6 uppercase letters — the faces of one block.", "다음 4줄: 각 줄에 대문자 6개 — 블록 하나의 여섯 면이에요.")}</div>
            <div>{t(E, "Next N lines: a word (1–4 letters) to try to spell.", "다음 N줄: 만들어볼 단어 (1~4글자).")}</div>
            <div style={{ fontWeight: 700, color: "#5b21b6", margin: "8px 0 6px" }}>📤 {t(E, "Output", "출력")}</div>
            <div>{t(E, "For each word, print YES if it can be spelled, else NO.", "단어마다 만들 수 있으면 YES, 없으면 NO 를 출력해요.")}</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Sample Input", "예제 입력")}</div>
              <pre style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>{`6
MOOOOO
OOOOOO
ABCDEF
UVWXYZ
COW
MOO
ZOO
MOVE
CODE
FARM`}</pre>
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Sample Output", "예제 출력")}</div>
              <pre style={{ background: "#0f172a", color: "#86efac", borderRadius: 8, padding: 10, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>{`YES
NO
YES
YES
NO
NO`}</pre>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 10, lineHeight: 1.6 }}>
            💡 {t(E,
              "MOO is NO: M lives only on block 1, and O lives only on blocks 1 and 2, so the two O's would have to use blocks 1 and 2 — but block 1 is already taken by the M. CODE is NO: C, D, E all live on the same block (ABCDEF), and one block shows only one face.",
              "MOO 는 왜 NO 일까요. M 은 블록 1 에만 있고, O 는 블록 1 과 2 에만 있어요. O 두 개가 블록 1 과 2 를 써야 하는데, 블록 1 은 이미 M 이 차지했어요. CODE 도 NO 예요. C, D, E 가 모두 같은 블록(ABCDEF)에 있는데 한 블록은 한 면만 보여줄 수 있어요.")}
          </div>
        </div>
      ),
    },
    // 1-3: Interactive sim — assign cubes to positions and watch ✓/✗ live.
    {
      type: "reveal",
      narr: t(E,
        "Pick cubes yourself and try to spell a word.",
        "직접 큐브를 골라 단어를 만들어 봐요."),
      content: <BlockLetterSim E={E} />,
    },
    // 1-4: Quiz
    {
      type: "quiz",
      narr: t(E,
        "4 blocks, word length 3. Pick 3 blocks from 4 and arrange them. How many ways?", "블록 4개 중 3개를 골라 늘어놓는 방법은 몇 가지일까요?"),
      question: t(E,
        "C(4,3) * 3! = how many permutations?",
        "C(4,3) * 3! 은 몇 가지일까요?"),
      options: [
        t(E, "24", "24"),
        t(E, "12", "12"),
        t(E, "6", "6"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! C(4,3)=4 ways to choose 3 blocks, times 3!=6 arrangements = 24 total.",
        "블록 3개를 고르는 방법이 C(4,3)=4 가지, 늘어놓는 방법이 3!=6 가지예요. 4 × 6 = 24 가지예요."),
    },
    // 1-5: Input
    {
      type: "input",
      narr: t(E,
        "Block 1 has faces \"COWMOO\" (C,O,W,M,O,O). Can it show the letter 'C'? Yes=1, No=0", "블록 \"COWMOO\" 가 글자 'C' 를 보여줄 수 있을까요?"),
      question: t(E,
        "Block \"COWMOO\": can it show 'C'? (1=yes, 0=no)",
        "블록 \"COWMOO\": 'C'를 보여줄 수 있어요? (1=예, 0=아니오)"),
      hint: t(E,
        "Scan the 6 faces of \"COWMOO\" — does any face show 'C'?",
        "\"COWMOO\" 의 여섯 면을 하나씩 봐요. 'C' 가 있는 면이 있나요?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBlocksCh2(E, lang = "py") {
  return [
    // 2-1: Code — CodeWalk (선생님 2026-07-14: 모든 quest 코드 이 방식)
    {
      type: "opt-codewalk",
      narr: t(E,
        "The full solution, start to finish — toggle Python ↔ C++ via the header.",
        "전체 풀이를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
  ];
}
