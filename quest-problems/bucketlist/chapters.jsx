import { C, t } from "@/components/quest/theme";
import { getBucketListSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "events = []",
  "for _ in range(N):",
  "    s, e, b = map(int, input().split())",
  "    events.append((s, b))     # cow starts",
  "    events.append((e + 1, -b))  # cow ends",
  "",
  "events.sort()",
  "",
  "cur = 0",
  "best = 0",
  "for time, delta in events:",
  "    cur += delta",
  "    best = max(best, cur)",
  "",
  "print(best)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBucketListCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows each need some buckets during a time interval.\nFind the minimum total buckets needed at any point in time.", "N마리 소가 각각 시간 구간 동안 양동이가 필요해요. 어느 시점에서든 필요한 최소 총 양동이 수를 구해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"🪣"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>The Bucket List</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2018 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Sweep line!\nAt each time point, sum up active cows' bucket needs. The answer is the maximum over all time points. Use events: +b at start, -b after end.",
              "핵심: 스위프 라인!\n각 시점에서 활성 소들의 양동이 필요량 합산.\n답은 모든 시점에서의 최대값.\n이벤트 사용: 시작에 +b, 끝 후에 -b.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Cow 1 needs 3 buckets from t=1-5, cow 2 needs 2 buckets from t=3-8.\nAt t=3, both are active: 3 + 2 = 5 buckets needed.", "소 1은 t=1-5에 양동이 3개, 소 2는 t=3-8에 양동이 2개 필요. t=3에 둘 다 활성: 3 + 2 = 5개 필요."),
      question: t(E,
        "Cow1: 3 buckets t=1-5, Cow2: 2 buckets t=3-8. Max buckets at any time?",
        "소1: 양동이3개 t=1-5, 소2: 양동이2개 t=3-8. 어느 시점에서 최대?"),
      options: [
        t(E, "3 - just cow 1", "3 - 소1만"),
        t(E, "5 - both overlap at t=3-5", "5 - t=3-5에서 겹침"),
        t(E, "8 - sum of all", "8 - 전부 합산"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! From t=3 to t=5, both cows need buckets: 3 + 2 = 5. That's the maximum.",
        "맞아! t=3부터 t=5까지 두 소 모두 양동이 필요: 3 + 2 = 5. 그게 최대값이예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Cow 1: 3 buckets t=1-5, Cow 2: 2 buckets t=3-8.\nWhat's the max buckets needed at any time?", "소 1: 양동이 3개 t=1-5, 소 2: 양동이 2개 t=3-8. 어느 시점에서 최대 양동이 수?"),
      question: t(E,
        "Max buckets needed at any time?",
        "어느 시점에서 최대 양동이 수?"),
      hint: t(E,
        "At t=3-5, both active: 3 + 2 = 5.",
        "t=3-5에서 둘 다 활성: 3 + 2 = 5."),
      answer: 5,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBucketListCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Create start/end events, sort them, sweep through. O(N log N) for sorting.", "시작/끝 이벤트 생성, 정렬, 스위프. 정렬에 O(N log N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "For each cow, add +b event at start time and -b event at end+1.\nSort all events by time, sweep through accumulating buckets, track the max.",
              "각 소에 대해 시작 시간에 +b 이벤트, 끝+1에 -b 이벤트 추가.\n시간순 정렬, 스위프하며 양동이 누적, 최대값 추적.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBucketListSections(E),
    },
  ];
}
