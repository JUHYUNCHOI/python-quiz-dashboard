import { C, t } from "@/components/quest/theme";
import { getCrossRoad3Sections, CrossRoad3Sim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCrossRd3Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows arrive at a single gate, each with an arrival time a[i] and a passage duration d[i]. The gate processes cows in arrival order (FIFO) — one at a time. If a cow arrives while the gate is busy, she queues; once it's her turn, she takes d[i] seconds to pass through.\nPrint the time the LAST cow finishes passing.",
        "문 하나로 소들이 한 마리씩 지나가요. 마지막 소는 언제 끝날까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udeaa"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Cross the Road III</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2017 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E, "Print the time the last cow finishes passing through the gate.", "마지막 소가 문을 통과해 끝나는 시각을 출력해요.")}
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
                  {t(E, "There are ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N cows arriving at a single gate", "한 개의 문에 도착하는 N마리 소")}</b>
                  {t(E, " — each with an arrival time ", " 가 있고, 도착 시각 ")}
                  <code style={{ background: "#ede9fe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[i]</code>
                  {t(E, " and a passage duration ", " 와 통과 시간 ")}
                  <code style={{ background: "#ede9fe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>d[i]</code>
                  {t(E, ".", " 을 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The gate processes cows ", "문은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "FIFO (first come, first served)", "FIFO (선착순)")}</b>
                  {t(E, " — one at a time, taking d[i] seconds for cow i.",
                        " 로 한 마리씩 보내요. i번 소는 지나가는 데 d[i] 초 걸려요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If a cow arrives while the gate is busy, she ", "문이 사용 중일 때 도착한 소는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "queues until her turn", "자기 차례까지 대기")}</b>
                  {t(E, ".", "해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "time the last cow finishes passing", "마지막 소가 통과를 끝내는 시각")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 🔍 Deep-audit sim — process each cow at the gate, step by step */}
          <div style={{ background: "#fff", border: `1.5px solid #c4b5fd`, borderRadius: 12, marginTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", padding: "10px 14px 0" }}>
              🔍 {t(E, "Walk each cow through the gate — see current_time grow",
                     "소를 한 마리씩 문에 통과시키며 current_time 이 어떻게 커지는지 봐요")}
            </div>
            <CrossRoad3Sim E={E} />
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Cow A arrives at t=0, takes 5 sec.\nCow B arrives at t=3, takes 2 sec.\nA finishes at t=5.\nB has to wait (arrived at 3 but gate busy until 5).\nWhen does B finish?", "소 A 는 t=0 에 도착해 5초가 걸려요.\n소 B 는 t=3 에 도착해 2초가 걸려요.\nA 는 t=5 에 끝나요.\nB 는 t=3 에 도착했지만 문이 t=5 까지 차 있어서 기다려요.\nB 는 언제 끝날까요?"),
      question: t(E,
        "A: arrive=0, dur=5. B: arrive=3, dur=2. When does B finish?",
        "A 는 도착 0 에 5초, B 는 도착 3 에 2초예요. B 는 언제 끝날까요?"),
      options: [
        t(E, "t=7 (waits until 5, then 2 sec)", "t=7 (5까지 기다렸다가 2초 걸려요)"),
        t(E, "t=5 (finishes with A)", "t=5 (A 와 같이 끝나요)"),
        t(E, "t=10", "t=10"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! B arrives at t=3 but the gate is busy until t=5. B starts at t=5, takes 2 sec, finishes at t=7.",
        "맞아요! B 는 t=3 에 도착하지만 문이 t=5 까지 차 있어요. 그래서 t=5 에 시작해 2초 걸려 t=7 에 끝나요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Same example: A(0,5), B(3,2). When does the last cow finish?", "같은 예시 A(0,5), B(3,2) 에서 마지막 소는 언제 끝날까요?"),
      question: t(E,
        "A arrives t=0, 5 sec. B arrives t=3, 2 sec. Last finish time?",
        "A 는 t=0 에 도착해 5초, B 는 t=3 에 도착해 2초예요. 마지막은 언제 끝날까요?"),
      hint: t(E,
        "When does A finish? B has to wait until then, then add B's duration.",
        "A 는 언제 끝날까요? B 는 그때까지 기다렸다가 자기 시간을 더하면 돼요."),
      answer: 7,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCrossRd3Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Sort cows by arrival time. Walk through them: track when the gate becomes free. If a cow arrives BEFORE the gate is free, she waits — gate-free advances by her duration. If after, she starts at her arrival. Sections build it one piece at a time.",
        "도착 순서대로 보면서 문이 비는 시각을 계속 따라가요."),
      sections: getCrossRoad3Sections(E),
    },
  ];
}
