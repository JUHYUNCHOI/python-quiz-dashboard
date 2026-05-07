import { C, t } from "@/components/quest/theme";
import { getOutOfPlaceSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = []",
  "for _ in range(N):",
  "    a.append(int(input()))",
  "",
  "b = sorted(a)",
  "",
  "# Count positions where a and sorted differ",
  "diff = 0",
  "for i in range(N):",
  "    if a[i] != b[i]:",
  "        diff += 1",
  "",
  "# One misplaced cow: swapping fixes 2 positions",
  "# Answer = diff - 1 (number of adjacent swaps)",
  "# But since exactly one cow is out of place,",
  "# the answer is diff - 1",
  "print(max(0, diff - 1))",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeOutOfPlaceCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ had cows in a row, sorted by height. ONE cow was secretly moved out of her sorted position to a new spot — pushing the cows in between by 1.\nFind the MINIMUM number of adjacent-swaps needed to put the row back into sorted order.",
        "FJ에게 키 순으로 정렬된 소 한 줄이 있었어요. 단 한 마리가 몰래 다른 위치로 옮겨졌고, 그 사이 소들은 한 칸씩 밀려났어요.\n다시 정렬된 상태로 만들기 위한 최소 인접 스왑 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd00"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Out of Place</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2018 Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ originally had ", "FJ에게 처음에는 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N cows in a row, sorted by height", "한 줄로 키 순 정렬된 N마리 소")}</b>
                  {t(E, ".", " 가 있었어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie secretly ", "Bessie가 몰래 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "moved exactly one cow to a different position", "정확히 1마리를 다른 위치로 옮겼어요")}</b>
                  {t(E, " — the cows in between shifted by 1.",
                        " — 그 사이 소들이 한 칸씩 밀려났어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of adjacent swaps", "필요한 최소 인접 스왑 횟수")}</b>
                  {t(E, " to restore the sorted order.", " 를 출력해요. 정렬 상태로 되돌리기 위한.")}
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
        "Array [1, 3, 2]. Sorted = [1, 2, 3]. Positions 1 and 2 differ. How many swaps?", "배열 [1, 3, 2]. 정렬 = [1, 2, 3]. 위치 1과 2가 달라요. 스왑 몇 번?"),
      question: t(E,
        "[1, 3, 2] -> sorted [1, 2, 3]. How many adjacent swaps needed?",
        "[1, 3, 2] -> 정렬 [1, 2, 3]. 인접 스왑 몇 번 필요?"),
      options: [
        t(E, "1 swap (swap 3 and 2)", "1번 스왑 (3과 2를 교환)"),
        t(E, "2 swaps", "2번 스왑"),
        t(E, "0 swaps", "0번 스왑"),
      ],
      correct: 0,
      explain: t(E,
        "2 positions differ, so answer = 2 - 1 = 1. Swap indices 1 and 2 to get [1, 2, 3].",
        "2개 위치가 다르니 답 = 2 - 1 = 1. 인덱스 1과 2를 교환하면 [1, 2, 3]."),
    },
    // 1-3: input
    {
      type: "input",
      narr: t(E,
        "[1, 3, 2] needs how many adjacent swaps to sort?", "[1, 3, 2]를 정렬하려면 인접 스왑이 몇 번 필요해요?"),
      question: t(E,
        "Min adjacent swaps to sort [1, 3, 2]?",
        "[1, 3, 2] 정렬에 필요한 최소 인접 스왑 수?"),
      hint: t(E,
        "Diff positions = 2. Answer = 2 - 1 = 1.",
        "다른 위치 = 2. 답 = 2 - 1 = 1."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeOutOfPlaceCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort a copy of the array. Compare to the original — the moved cow creates a CONTIGUOUS block of mismatches. The number of adjacent swaps to fix is (block length − 1).",
        "배열의 사본을 정렬하고 원본과 비교 — 옮겨진 소 때문에 연속된 불일치 블록이 생겨요. 필요한 인접 스왑 수 = (블록 길이 − 1)."),
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
      sections: getOutOfPlaceSections(E),
    },
  ];
}
