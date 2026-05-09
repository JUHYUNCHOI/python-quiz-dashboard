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
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udca1"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Innovation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P3</div>
          </div>

          {/* \ud83c\udfaf Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              \ud83c\udfaf {t(E, "Mission", "\ubbf8\uc158")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Output the maximum number of tasks completable within H hours total.",
                "\ucd1d H \uc2dc\uac04 \uc548\uc5d0 \uc644\ub8cc \uac00\ub2a5\ud55c \uc791\uc5c5\uc758 \ucd5c\ub300 \uac1c\uc218\ub97c \ucd9c\ub825.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A task counts as completed only if you spend its ", "작업을 완료하려면 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "FULL duration on it", "그 시간 전체")}</b>
                  {t(E, ".", "를 써야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "5 tasks need [2, 3, 1, 4, 2] hours, 8 hours total.  Which tasks should you pick to fit the most?",
        "5 개 작업 [2, 3, 1, 4, 2] 시간, 총 8 시간. 가장 많이 끝내려면 어떤 작업들?"),
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
    // 1-3: Sim — slide K, watch the time bar fill, find the greedy peak
    {
      type: "sim",
      narr: t(E,
        "Tasks already sorted shortest → longest. Slide K — bars light up as you take them, the time bar fills toward H. The biggest K that stays green is the greedy answer.",
        "작업은 짧은 순 → 긴 순으로 정렬됨. K 를 움직여봐 — 선택한 작업 막대가 진해지고, 시간 막대가 H 까지 차요. 초록색을 유지하는 가장 큰 K 가 그리디 정답이에요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Pick tasks yourself for [2, 3, 1, 4, 2], H = 8.  How many fit?",
        "[2, 3, 1, 4, 2], H = 8 — 직접 골라봐. 몇 개 들어가?"),
      question: t(E,
        "Tasks=[2,3,1,4,2], H=8. Enter max tasks:",
        "작업=[2,3,1,4,2], H=8. 최대 작업 수 입력:"),
      hint: t(E,
        "If you pick the shortest tasks first, how many fit before time runs out?",
        "가장 짧은 작업부터 골랐을 때, 시간 다 떨어지기 전까지 몇 개 들어가?"),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeInnovationCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in.
    {
      type: "progressive",
      narr: t(E,
        "Sort durations ascending, accumulate, count how many fit before the running total exceeds H.  Sections build it one piece at a time.",
        "소요시간 오름차순 정렬, 누적, 합이 H 를 넘기 전까지 들어가는 개수. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getInnovationSections(E),
    },
  ];
}
