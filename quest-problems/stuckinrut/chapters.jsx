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
        "N cows stand on a 2D grid. Each cow moves forever in a single direction — either NORTH (+y) or EAST (+x) — at speed 1.\nWhen a moving cow steps onto a cell already grazed (visited) by ANOTHER cow's path, that arriving cow stops; the cow whose path she stepped onto keeps going.\nPrint the number of cells each cow ends up grazing (Infinity if she never stops).",
        "2D 격자 위에 N 마리 소가 있어요. 각 소는 한 방향 — 북쪽 (위) 또는 동쪽 (오른쪽) — 으로 속도 1로 영원히 움직여요.\n움직이는 소가 다른 소의 경로에 이미 들렸던 칸에 도착하면 멈춰요. 그 칸의 원래 주인 소는 계속 움직여요.\n각 소가 먹은 칸의 수를 출력해요 (영원히 멈추지 않으면 무한대)."),
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
    // 1-2: Grid simulator — see the rule in motion
    {
      type: "reveal",
      narr: t(E,
        "Before reading code, watch the rule live. Press play. N-cows go up, E-cows go right. Whoever crosses someone else's earlier trail stops.",
        "코드를 보기 전에 규칙을 직접 봐. 재생을 눌러 — N 소는 위로, E 소는 오른쪽으로. 누군가의 먼저 지나간 자취를 밟은 소가 멈춰."),
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
        "Enumerate every N-cow / E-cow pair, compute potential collision time, sort events. Process: a cow already stopped doesn't trigger; the later arriver stops. Sections build it one piece at a time.",
        "모든 N / E 소 쌍의 잠재 충돌 시각 계산, 시간순 정렬. 처리 — 이미 멈춘 소는 발동 X, 더 늦게 도착한 소가 멈춤. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getStuckInRutSections(E),
    },
  ];
}
