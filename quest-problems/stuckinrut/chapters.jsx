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
        "N cows stand on a 2D grid. Each cow moves forever in a single direction — either NORTH (+y) or EAST (+x) — at speed 1.\nWhen a moving cow steps onto a cell already grazed (visited) by ANOTHER cow's path, that arriving cow stops; the cow whose path she stepped onto keeps going.\nPrint the number of cells each cow ends up grazing (Infinity if she never stops).",
        "2D 격자 위에 N 마리 소가 있어요. 각 소는 한 방향 — 북쪽 (위) 또는 동쪽 (오른쪽) — 으로 속도 1로 영원히 움직여요.\n움직이는 소가 다른 소의 경로에 이미 들렸던 칸에 도착하면 멈춰요. 그 칸의 원래 주인 소는 계속 움직여요.\n각 소가 먹은 칸의 수를 출력해요 (영원히 멈추지 않으면 무한대)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Stuck in a Rut</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2020 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N cows on a 2D grid", "2D 격자 위 N 마리 소")}</b>
                  {t(E, " — each moves in one direction at speed 1: ", " — 각자 속도 1 로 한 방향: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "NORTH (+y) or EAST (+x), forever", "북쪽 (위) 또는 동쪽 (오른쪽), 영원히")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If a moving cow steps onto a cell ", "움직이는 소가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "already visited by ANOTHER cow's path", "다른 소의 경로에 이미 들렀던 칸")}</b>
                  {t(E, ", the arriving cow stops; the original cow keeps going.",
                        " 에 도착하면, 도착한 소는 멈춰요. 원래 주인 소는 계속 움직여요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of cells each cow grazes (or Infinity)", "각 소가 먹은 칸 수 (혹은 무한대)")}</b>
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
        "북쪽과 동쪽. 2가지 방향이에요."),
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
        "Enumerate every N-cow / E-cow pair and compute their potential collision time. Sort events by time. Process: a cow that's already stopped doesn't trigger; the other is the one who arrives later — she stops.",
        "모든 N-소 / E-소 쌍을 열거해 잠재적 충돌 시각 계산. 시간순 정렬. 처리: 이미 멈춘 소는 발동 X; 다른 한 마리 (더 늦게 도착) 가 멈춤."),
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
      sections: getStuckInRutSections(E),
    },
  ];
}
