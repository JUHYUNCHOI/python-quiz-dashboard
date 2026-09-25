import { C, t } from "@/components/quest/theme";
import { getStuckInRutSections, StuckInRutGridSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (4 steps: reveal / sim / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeStuckCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows move north or east forever — until they cross another cow's path.",
        "소들이 북쪽이나 동쪽으로 영원히 움직여요 — 다른 소의 길을 밟을 때까지."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Stuck in a Rut</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2020 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "For each cow, output the number of cells she grazes (or 'Infinity' if she never stops).",
                "각 소가 먹은 칸 수 (멈추지 않으면 'Infinity') 를 출력.")}
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
    // 1-1b: 입출력 형식 + 제약 (USACO 원문 cpid=1061) — 시즌 표준(photoshoot25) 형식
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N, then N lines of direction and position.",
        "입력은 소의 수 N, 그다음 방향과 위치가 N번 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of cows", "— 소의 수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>dir x y</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— direction ('N' or 'E'), starting position", "— 방향('N' 또는 'E'), 시작 위치")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "N lines — the number of cells each cow eats, or \"Infinity\" if she never stops.",
                  "N 줄 — 각 소가 먹은 칸 수를 출력해요. 멈추지 않으면 \"Infinity\".")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 50</div>
              <div>0 ≤ x, y ≤ 10⁹ {t(E, "(= 1 billion)", "(= 10억)")}</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "all x's are distinct, and separately all y's are distinct", "x좌표는 서로 다 다르고, y좌표도 서로 다 달라요")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Grid simulator — see the rule in motion
    {
      type: "reveal",
      narr: t(E,
        "Before reading code, watch the rule live. Press play. N-cows go up, E-cows go right. Whoever crosses someone else's earlier trail stops.",
        "코드를 보기 전에 규칙을 직접 봐요.\n재생을 눌러요 — N 소는 위로, E 소는 오른쪽으로 움직여요.\n먼저 지나간 자취를 밟은 소가 멈춰요."),
      content: (
        <div>
          <StuckInRutGridSim E={E} />
        </div>),
    },
    // 1-3: Quiz
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
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "How many possible directions are there in this problem?", "이 문제에서 가능한 방향은 몇 가지예요?"),
      question: t(E,
        "How many movement directions exist in this problem?",
        "이 문제에서 이동 방향은 몇 가지?"),
      hint: t(E,
        "Re-read the problem statement — count the listed directions.",
        "문제를 다시 읽어 봐 — 적힌 방향의 수를 세어 봐."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeStuckCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Enumerate every N-cow / E-cow pair and sort the collision times.",
        "모든 N / E 소 쌍의 충돌 시각을 계산해 시간순으로 정렬해요."),
      sections: getStuckInRutSections(E),
    },
  ];
}
