import { C, t } from "@/components/quest/theme";
import { getInnovationSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, H = map(int, input().split())",
  "tasks = list(map(int, input().split()))",
  "",
  "# Sort tasks by duration (greedy)",
  "tasks.sort()",
  "",
  "count = 0",
  "time_left = H",
  "for dur in tasks:",
  "    if time_left >= dur:",
  "        time_left -= dur",
  "        count += 1",
  "    else:",
  "        break",
  "",
  "print(count)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeInnovationCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "You have H hours total and N tasks; task i takes t[i] hours. You may complete a task only if you spend its full duration on it.\nPrint the MAXIMUM number of tasks you can complete within H hours (any subset, in any order).",
        "총 H 시간이 있고 N 개의 작업이 있어요. i번 작업은 t[i] 시간이 걸려요. 작업을 완료하려면 그 시간 전부를 써야 해요.\nH 시간 안에 완료할 수 있는 작업의 최대 개수를 출력해요 (어떤 부분집합이든, 순서 무관)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udca1"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Innovation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P3</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You have ", "총 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "H hours total", "H 시간")}</b>
                  {t(E, " and ", " 가 있고, ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N tasks", "N 개의 작업")}</b>
                  {t(E, " — task i takes ", " — i번 작업은 ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>t[i]</code>
                  {t(E, " hours.", " 시간 걸려요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A task counts as completed only if you spend its ", "작업을 완료하려면 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "FULL duration on it", "그 시간 전체")}</b>
                  {t(E, ".", "를 써야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum number of tasks completable within H hours", "H 시간 안에 완료할 수 있는 작업의 최대 개수")}</b>
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
        "5 tasks need [2,3,1,4,2] hours.\nYou have 8 hours.\nSort: [1,2,2,3,4].\nTake 1+2+2+3=8.\nHow many tasks?", "5개 작업이 [2,3,1,4,2]시간 필요해요. 8시간 있어요. 정렬: [1,2,2,3,4]. 1+2+2+3=8. 몇 개?"),
      question: t(E,
        "Tasks=[2,3,1,4,2], H=8. Max tasks completed?",
        "작업=[2,3,1,4,2], H=8. 최대 완료 작업 수?"),
      options: [
        t(E, "3 tasks", "3개"),
        t(E, "4 tasks", "4개"),
        t(E, "5 tasks", "5개"),
        t(E, "2 tasks", "2개"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Sorted: [1,2,2,3,4]. Take 1+2+2+3=8 hours, fitting 4 tasks.",
        "맞아! 정렬: [1,2,2,3,4]. 1+2+2+3=8시간, 4개 작업이 들어가요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Try it! Tasks=[2,3,1,4,2], H=8. How many tasks can you complete?", "해보자! 작업=[2,3,1,4,2], H=8. 몇 개 작업을 완료할 수 있어요?"),
      question: t(E,
        "Tasks=[2,3,1,4,2], H=8. Enter max tasks:",
        "작업=[2,3,1,4,2], H=8. 최대 작업 수 입력:"),
      hint: t(E,
        "Sort ascending: [1,2,2,3,4]. Greedily pick: 1+2+2+3=8.",
        "오름차순 정렬: [1,2,2,3,4]. 그리디: 1+2+2+3=8."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeInnovationCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort the tasks (O(N log N)), then greedily pick from shortest. Total: O(N log N).", "작업 정렬 (O(N log N)), 그리고 가장 짧은 것부터 그리디로 선택. 총: O(N log N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Sort tasks by duration.\nIterate and accumulate durations. Stop when time budget is exceeded.",
              "작업을 소요 시간으로 정렬.\n순회하며 시간을 누적. 시간 예산을 초과하면 중단.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getInnovationSections(E),
    },
  ];
}
