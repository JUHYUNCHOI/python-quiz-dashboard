import { C, t } from "@/components/quest/theme";
import { getSleepyHerdSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "positions = sorted([int(input()) for _ in range(3)])",
  "a, b, c = positions",
  "",
  "# Gap between first two and last two",
  "gap1 = b - a  # gap between a and b",
  "gap2 = c - b  # gap between b and c",
  "",
  "# --- Maximum moves ---",
  "# Move the closer endpoint one step at a time",
  "# Max = (gap1 - 1) + (gap2 - 1) = total_span - 2",
  "max_moves = (c - a) - 2",
  "",
  "# --- Minimum moves ---",
  "if gap1 == 1 and gap2 == 1:",
  "    # Already consecutive",
  "    min_moves = 0",
  "elif gap1 <= 2 or gap2 <= 2:",
  "    # One gap is 1 or 2: can solve in 1 move",
  "    min_moves = 1",
  "else:",
  "    # Both gaps > 2: need 2 moves",
  "    min_moves = 2",
  "",
  "print(min_moves)",
  "print(max_moves)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepyHerdCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Three cows stand on a number line.\nYou can only move an endpoint cow to a position between the other two (not to the other end).\nFind the minimum and maximum number of moves to make them consecutive.", "세 마리 소가 수직선에 서 있어.\n끝에 있는 소만 다른 두 소 사이로 옮길 수 있어 (반대쪽 끝으로는 안 돼).\n연속된 위치로 만드는 최소/최대 이동 횟수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\ude34"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Sleepy Cow Herding</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2019 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Sort positions.\nMax = total_span - 2 (move one step at a time). Min depends on gaps: both gaps 1 -> 0, any gap <= 2 -> 1, otherwise 2.",
              "핵심: 위치 정렬.\n최대 = 전체범위 - 2 (한 칸씩 이동). 최소는 간격에 따라: 둘 다 1이면 0, 하나가 2 이하면 1, 아니면 2.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Positions [4, 7, 9]. Move 4 to 8, getting [7, 8, 9]. How many moves was that?", "위치 [4, 7, 9]. 4를 8로 옮기면 [7, 8, 9]. 몇 번 이동했을까?"),
      question: t(E,
        "Positions [4,7,9]. Min moves to make consecutive?",
        "위치 [4,7,9]. 연속으로 만드는 최소 이동 횟수?"),
      options: [
        t(E, "0", "0"),
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Move cow at 4 to position 8: [7,8,9] are consecutive. Just 1 move! Gap between 7 and 9 is 2, so min = 1.",
        "4에 있는 소를 8로 이동: [7,8,9] 연속. 1번만! 7과 9 사이 간격이 2라서 최소 = 1."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For positions [4,7,9], what is the minimum number of moves?", "위치 [4,7,9]에서 최소 이동 횟수는?"),
      question: t(E,
        "Positions [4,7,9]. Minimum moves?",
        "위치 [4,7,9]. 최소 이동 횟수?"),
      hint: t(E,
        "Gap 7-9 is 2, so we can place the cow at 4 into position 8 in one move.",
        "7-9 간격이 2이므로 4에 있는 소를 8로 1번에 옮길 수 있어."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepyHerdCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Just sort 3 numbers and compute gaps. O(1) time!", "3개 숫자 정렬하고 간격 계산. O(1) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Sort a, b, c.\nMax = (c-a)-2. Min: if both gaps are 1 -> 0; if either gap <= 2 -> 1; else 2.",
              "a, b, c 정렬.\n최대 = (c-a)-2. 최소: 두 간격 모두 1이면 0; 하나라도 2 이하면 1; 아니면 2.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getSleepyHerdSections(E),
    },
  ];
}
