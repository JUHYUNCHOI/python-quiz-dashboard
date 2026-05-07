import { C, t } from "@/components/quest/theme";
import { getSleepySortSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "# Find longest sorted suffix",
  "# from the right, find where it stops being sorted",
  "k = N - 1",
  "while k > 0 and a[k - 1] < a[k]:",
  "    k -= 1",
  "",
  "# k is the first index of the sorted suffix",
  "# We need to move cows 0..k-1",
  "print(k)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepySortCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows stand in a line with distinct IDs. The only allowed move: take the FRONT cow and reinsert her anywhere later in the line.\nFind the MINIMUM number of such moves needed to make the IDs sorted in increasing order.",
        "한 줄로 선 N마리 소가 있고, 각자 서로 다른 ID를 가져요. 허용되는 움직임은 단 하나: 맨 앞 소를 빼서 줄의 더 뒤쪽 어딘가에 다시 끼워 넣기.\nID가 오름차순이 되도록 만드는 최소 움직임 횟수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"😴"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Sleepy Cow Sorting</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2019 Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N cows in a line", "한 줄로 선 N마리 소")}</b>
                  {t(E, ", each with a distinct ID.", "가 있고, ID는 서로 달라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each move: take the ", "한 번의 움직임: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "front cow and reinsert her anywhere later", "맨 앞 소를 빼서 더 뒤쪽 어디든 다시 끼워 넣기")}</b>
                  {t(E, " in the line.", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Goal: ", "목표: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "sort the line by ID in increasing order", "ID 오름차순으로 정렬")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of moves", "필요한 최소 움직임 횟수")}</b>
                  {t(E, " required.", "를 출력해요.")}
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
        "For [1, 2, 4, 3]: looking from the right, [3] is fine, but 4 > 3 breaks the order.\nThe sorted suffix has length 1.\nSo we move N - 1 = 3 cows.", "[1, 2, 4, 3]에서: 오른쪽부터 보면 [3]은 괜찮지만 4 > 3에서 순서가 깨져. 정렬된 접미사 길이는 1. 그래서 N - 1 = 3마리를 옮겨야 해요."),
      question: t(E,
        "For [2, 1, 3, 4]: what is the length of the longest sorted suffix from the right?",
        "[2, 1, 3, 4]에서: 오른쪽부터 가장 긴 정렬된 접미사 길이는?"),
      options: [
        t(E, "1 - only [4]", "1 - [4]만"),
        t(E, "2 - [3, 4]", "2 - [3, 4]"),
        t(E, "3 - [1, 3, 4]", "3 - [1, 3, 4]"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! From the right: 4 ok, 3 < 4 ok, 1 < 3 ok, but 2 > 1 breaks. So suffix [1, 3, 4] has length 3. Answer = 4 - 3 = 1.",
        "맞아! 오른쪽부터: 4 ok, 3 < 4 ok, 1 < 3 ok, 하지만 2 > 1에서 깨져. 접미사 [1, 3, 4] 길이는 3. 답 = 4 - 3 = 1."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If the array is already sorted [1, 2, 3, 4], the entire array is a sorted suffix.\nHow many moves?", "배열이 이미 정렬된 [1, 2, 3, 4]이면, 전체가 정렬된 접미사예요. 이동 횟수는?"),
      question: t(E,
        "[1, 2, 3, 4] already sorted. How many moves needed?",
        "[1, 2, 3, 4] 이미 정렬됨. 필요한 이동 횟수는?"),
      hint: t(E,
        "All cows are in order. Sorted suffix length = N. Answer = N - N = 0.",
        "모든 소가 순서대로예요. 정렬된 접미사 길이 = N. 답 = N - N = 0."),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepySortCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Cows in the longest already-sorted SUFFIX never need to move — they're already in their final relative order. Every cow in front of that suffix needs at least 1 move. Answer = N − (length of sorted suffix).",
        "이미 정렬된 가장 긴 SUFFIX (뒤쪽 부분) 의 소들은 움직일 필요 없어요 — 이미 올바른 상대 순서에 있어요. 그 SUFFIX 앞의 모든 소는 적어도 한 번 이동 필요. 답 = N − (정렬된 SUFFIX 길이)."),
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
      sections: getSleepySortSections(E),
    },
  ];
}
