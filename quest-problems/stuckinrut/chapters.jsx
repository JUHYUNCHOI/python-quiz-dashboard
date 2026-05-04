import { C, t } from "@/components/quest/theme";
import { getStuckInRutSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "cows = []",
  "for _ in range(N):",
  "    d, x, y = input().split()",
  "    cows.append((d, int(x), int(y)))",
  "",
  "north = [(x, y, i) for i, (d, x, y) in enumerate(cows) if d == 'N']",
  "east  = [(x, y, i) for i, (d, x, y) in enumerate(cows) if d == 'E']",
  "",
  "stopped = [False] * N",
  "grazed  = [0] * N  # 0 means Infinity",
  "",
  "# For each pair (N-cow, E-cow), check if they intersect",
  "events = []",
  "for nx, ny, ni in north:",
  "    for ex, ey, ei in east:",
  "        # N-cow at (nx, ny) going north, E-cow at (ex, ey) going east",
  "        # They meet at (nx, ey+dx) where dx = nx - ex (E-cow travel)",
  "        # N-cow reaches row ey at time ey - ny (if ey > ny)",
  "        # E-cow reaches col nx at time nx - ex (if nx > ex)",
  "        if nx > ex and ey > ny:",
  "            tn = ey - ny  # time for N-cow to reach intersection row",
  "            te = nx - ex  # time for E-cow to reach intersection col",
  "            if tn < te:",
  "                events.append((te, ei, ni))  # E-cow stopped by N-cow",
  "            elif te < tn:",
  "                events.append((tn, ni, ei))  # N-cow stopped by E-cow",
  "",
  "# Sort events by time, process them",
  "events.sort()",
  "for time, victim, blocker in events:",
  "    if not stopped[victim] and not stopped[blocker]:",
  "        stopped[victim] = True",
  "        d, x, y = cows[victim]",
  "        grazed[victim] = time",
  "",
  "for g in grazed:",
  "    print(g if g > 0 else 'Infinity')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (3 steps: reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeStuckCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Cows on a 2D grid move either North or East forever.\nWhen a cow reaches a cell already grazed by another, it stops.\nFind how many cells each cow grazes!", "2D 격자 위의 소들이 북쪽 또는 동쪽으로 영원히 이동해요. 다른 소가 이미 먹은 셀에 도달하면 멈춰요. 각 소가 먹는 셀 수를 구해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Stuck in a Rut</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2020 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: For each N-cow and E-cow pair, compute intersection time.\nProcess events in time order. A stopped cow can't stop others.",
              "핵심: 각 북쪽/동쪽 소 쌍에 대해 교차 시간 계산.\n시간순으로 이벤트 처리.\n멈춘 소는 다른 소를 멈출 수 없어요.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "In this problem, cows can only move in two directions. What are they?", "이 문제에서 소는 두 방향으로만 이동할 수 있어요. 어떤 방향?"),
      question: t(E,
        "What two directions can cows move in this problem?",
        "이 문제에서 소가 이동할 수 있는 두 방향은?"),
      options: [
        t(E, "North and East", "북쪽과 동쪽"),
        t(E, "North and South", "북쪽과 남쪽"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Cows move either North (up) or East (right), never stopping unless blocked.",
        "맞아! 소는 북쪽(위) 또는 동쪽(오른쪽)으로만 이동하고 막히지 않으면 멈추지 않아."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "How many possible directions are there in this problem?", "이 문제에서 가능한 방향은 몇 가지예요?"),
      question: t(E,
        "How many movement directions exist in this problem?",
        "이 문제에서 이동 방향은 몇 가지?"),
      hint: t(E,
        "North and East. That's 2 directions.",
        "북쪽과 동쪽. 2가지 방향이예요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeStuckCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Check all N-cow vs E-cow pairs for intersections.\nSort events by time.\nO(N^2 log N) total!", "모든 북쪽/동쪽 소 쌍의 교차를 확인. 이벤트를 시간순 정렬. 총 O(N^2 log N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N\u00b2 log N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Enumerate all N-cow/E-cow pairs to find intersections.\nSort by time. Process in order: first collision wins, stopped cows are ignored.",
              "모든 북쪽/동쪽 소 쌍을 열거해 교차점을 찾아요.\n시간순 정렬.\n순서대로 처리: 먼저 충돌한 것이 이기고 멈춘 소는 무시.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getStuckInRutSections(E),
    },
  ];
}
