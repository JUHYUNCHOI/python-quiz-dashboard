import { C, t } from "@/components/quest/theme";
import { getCrossRoad3Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "cows = []",
  "for _ in range(N):",
  "    a, d = map(int, input().split())",
  "    cows.append((a, d))",
  "",
  "# Sort by arrival time",
  "cows.sort()",
  "",
  "current_time = 0",
  "for arrival, duration in cows:",
  "    # If gate is free before cow arrives, wait for cow",
  "    if current_time < arrival:",
  "        current_time = arrival",
  "    current_time += duration",
  "",
  "print(current_time)",
];


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
        "N마리 소가 한 개의 문에 도착해요. 각자 도착 시각 a[i] 와 통과 시간 d[i] 를 가져요. 문은 도착 순서 (FIFO) 로 한 마리씩 처리해요. 문이 사용 중일 때 도착한 소는 줄을 서고, 자기 차례에 d[i] 초 걸려 통과해요.\n마지막 소가 통과를 끝내는 시각을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udeaa"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Cross the Road III</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Feb Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The gate processes cows ", "문은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "FIFO (first come, first served)", "FIFO (선착순)")}</b>
                  {t(E, " — one at a time, taking d[i] seconds for cow i.",
                        " 로 한 마리씩 처리, i번 소는 d[i] 초 걸려요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If a cow arrives while the gate is busy, she ", "문이 사용 중일 때 도착한 소는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "queues until her turn", "자기 차례까지 대기")}</b>
                  {t(E, ".", "해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "time the last cow finishes passing", "마지막 소가 통과를 끝내는 시각")}</b>
                  {t(E, ".", "을 출력해요.")}
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
        "Cow A arrives at t=0, takes 5 sec.\nCow B arrives at t=3, takes 2 sec.\nA finishes at t=5.\nB has to wait (arrived at 3 but gate busy until 5).\nWhen does B finish?", "소 A는 t=0에 도착, 5초 소요.\n소 B는 t=3에 도착, 2초 소요.\nA는 t=5에 끝나.\nB는 기다려야 해 (3에 도착했지만 문은 5까지 사용 중).\nB는 언제 끝나?"),
      question: t(E,
        "A: arrive=0, dur=5. B: arrive=3, dur=2. When does B finish?",
        "A: 도착=0, 소요=5. B: 도착=3, 소요=2. B는 언제 끝나?"),
      options: [
        t(E, "t=7 (waits until 5, then 2 sec)", "t=7 (5까지 기다리고, 그 다음 2초)"),
        t(E, "t=5 (finishes with A)", "t=5 (A와 함께 끝남)"),
        t(E, "t=10", "t=10"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! B arrives at t=3 but the gate is busy until t=5. B starts at t=5, takes 2 sec, finishes at t=7.",
        "맞아! B는 t=3에 도착하지만 문은 t=5까지 사용 중. B는 t=5에 시작해서 2초 걸려 t=7에 끝나."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Same example: A(0,5), B(3,2). When does the last cow finish?", "같은 예시: A(0,5), B(3,2). 마지막 소가 끝나는 시간?"),
      question: t(E,
        "A arrives t=0, 5 sec. B arrives t=3, 2 sec. Last finish time?",
        "A 도착 t=0, 5초. B 도착 t=3, 2초. 마지막 끝나는 시간?"),
      hint: t(E,
        "A finishes at 5. B waits, starts at 5, finishes at 7. Answer: 7.",
        "A는 5에 끝나. B는 기다리다 5에 시작, 7에 끝나. 답: 7."),
      answer: 7,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCrossRd3Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort cows by arrival time. Walk through them: track when the gate becomes free. If a cow arrives BEFORE the gate is free, she waits — gate-free advances by her duration. If after, she starts at her arrival.",
        "도착 시간 순으로 정렬. 순회: 문이 비는 시간을 추적. 소가 문이 빈 시간 전에 도착하면 대기 — 문 비는 시간이 그녀의 소요시간 만큼 진행. 후에 도착하면 도착 시각에 시작."),
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
      sections: getCrossRoad3Sections(E),
    },
  ];
}
