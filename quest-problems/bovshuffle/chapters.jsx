import { C, t } from "@/components/quest/theme";
import { getBovShuffleSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "shuffle = list(map(int, input().split()))",
  "# Convert to 0-indexed",
  "shuffle = [s - 1 for s in shuffle]",
  "",
  "cows = list(map(int, input().split()))",
  "",
  "# Build inverse permutation",
  "inv = [0] * N",
  "for i in range(N):",
  "    inv[shuffle[i]] = i",
  "",
  "# Apply inverse permutation 3 times",
  "result = cows[:]",
  "for _ in range(3):",
  "    temp = [0] * N",
  "    for i in range(N):",
  "        temp[i] = result[inv[i]]",
  "    result = temp",
  "",
  "for x in result:",
  "    print(x)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeShuffleCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows stand in a line. A 'shuffle' is a permutation that moves each cow at position i to position shuffle[i]. The shuffle has been applied THREE times in a row, and we're given the final lineup.\nRecover the original lineup before any shuffles.",
        "한 줄로 선 N마리 소가 있어요. '셔플' 은 위치 i 의 소를 shuffle[i] 위치로 옮기는 순열이에요. 이 셔플이 연속으로 세 번 적용된 뒤의 줄이 주어져요.\n셔플이 일어나기 전 원래 줄을 복원해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd00"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>The Bovine Shuffle</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2017 Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#f97316" }}>{t(E, "N cows in a line", "한 줄로 선 N마리 소")}</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "shuffle permutation", "셔플 순열")}</b>
                  {t(E, " is given — it moves the cow at position i to position shuffle[i].",
                        " 가 주어져요 — 위치 i 의 소를 shuffle[i] 위치로 옮겨요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the lineup ", "주어지는 줄은 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "AFTER 3 shuffles", "셔플 3 번 후")}</b>
                  {t(E, ".", " 의 모습이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "original lineup before any shuffles", "셔플 전 원래 줄")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: quiz
    {
      type: "quiz",
      narr: t(E,
        "Permutation [2,1] is self-inverse: applying it once swaps positions 1 and 2.\nHow many times is the shuffle applied in this problem?", "순열 [2,1]은 자기역순열이야: 한 번 적용하면 위치 1과 2를 교환해요. 이 문제에서 셔플을 몇 번 적용해요?"),
      question: t(E,
        "How many times is the shuffle applied in the problem?",
        "문제에서 셔플을 몇 번 적용해요?"),
      options: [
        t(E, "3 times", "3번"),
        t(E, "1 time", "1번"),
        t(E, "N times", "N번"),
      ],
      correct: 0,
      explain: t(E,
        "The problem states the shuffle is applied exactly 3 times. So we undo it by applying the inverse 3 times.",
        "문제에서 셔플을 정확히 3번 적용한다고 해요. 그래서 역순열을 3번 적용해서 되돌려."),
    },
    // 1-3: input
    {
      type: "input",
      narr: t(E,
        "The shuffle is applied exactly how many times? Enter the number.", "셔플은 정확히 몇 번 적용돼요? 숫자를 입력해요."),
      question: t(E,
        "How many times is the shuffle applied?",
        "셔플은 몇 번 적용돼요?"),
      hint: t(E,
        "The problem says 3 times!",
        "문제에서 3번이라고 해요!"),
      answer: 3,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeShuffleCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "We're given the lineup AFTER 3 shuffles. To recover the original, build the INVERSE shuffle and apply it 3 times to the final lineup.",
        "셔플 3 번 후의 줄이 주어져요. 원래 줄을 복원하려면 역셔플을 만들고 최종 줄에 3 번 적용."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBovShuffleSections(E),
    },
  ];
}
