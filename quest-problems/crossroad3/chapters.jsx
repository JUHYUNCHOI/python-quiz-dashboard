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
        "N cows arrive at a gate, each with an arrival time and a duration to pass through.\nProcess them FIFO (first come, first served).\nFind when the last cow finishes!", "N마리 소가 문에 도착해, 각각 도착 시간과 통과 시간이 있어요. FIFO (선착순)로 처리해요. 마지막 소가 끝나는 시간을 구해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udeaa"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Cross the Road III</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Feb Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Sort by arrival time.\nTrack when the gate becomes free. If a cow arrives after the gate is free, start immediately. Otherwise, wait in queue.",
              "핵심: 도착 시간으로 정렬해요.\n문이 비는 시간을 추적해요.\n소가 문이 빈 후에 도착하면 바로 시작.\n아니면 대기열에서 기다려.")}
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
        "Sort cows by arrival time, then simulate the queue in one pass. O(N log N) for sorting!", "도착 시간으로 소를 정렬하고, 한 번 순회로 큐를 시뮬레이션해요. 정렬에 O(N log N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Sort by arrival.\nTrack current_time (when gate becomes free). For each cow: if current_time < arrival, jump to arrival. Then add duration. Final current_time is the answer.",
              "도착순 정렬.\ncurrent_time (문이 비는 시간)을 추적해요.\n각 소: current_time < 도착이면 도착으로 점프.\n그 다음 소요시간 추가.\n최종 current_time이 답.")}
          </div>
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
