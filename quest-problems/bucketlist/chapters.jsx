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
        "FJ has N cows. Cow i needs b[i] buckets each day during her time interval [s, t]. Buckets are SHARED between cows whose intervals don't overlap.\nPrint the MINIMUM number of buckets FJ must own to cover every cow on every day.",
        "FJ 에게 N마리 소가 있어요. i번 소는 자기 시간 구간 [s, t] 동안 매일 b[i] 개의 양동이가 필요해요. 시간 구간이 겹치지 않는 소들끼리는 양동이를 공유할 수 있어요.\n모든 소를 매일 만족시키는 데 FJ 가 가져야 할 양동이의 최소 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"🪣"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>The Bucket List</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2018 Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "N cows", "N마리 소")}</b>
                  {t(E, ". Cow i is active during day interval ", "가 있어요. i번 소는 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>[s, t]</code>
                  {t(E, " and needs ", " 동안 매일 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>b</code>
                  {t(E, " buckets each of those days.", " 개의 양동이가 필요해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "Buckets can be reused across cows", "양동이는 소들 사이에 재사용 가능")}</b>
                  {t(E, " whose active intervals don't overlap (a cow that's done releases her buckets for someone else).",
                        " — 활성 시간이 겹치지 않으면 (먼저 끝난 소의 양동이를 다음 소가 씀).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of buckets", "양동이의 최소 수")}</b>
                  {t(E, " FJ must own.", " 를 출력해요.")}
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
        "맞아! t=3부터 t=5까지 두 소 모두 양동이 필요: 3 + 2 = 5. 그게 최대값이에요."),
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
        "Convert each cow's interval into two events: at day s add +b buckets, at day t+1 subtract b. Sort all events by time, sweep through accumulating active buckets, and track the running maximum.",
        "각 소의 구간을 두 이벤트로 변환: s 일에 +b 양동이, t+1 일에 −b. 모든 이벤트를 시간순 정렬, 활성 양동이 누적하면서 스윕, 누적 최댓값 추적."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Create +b / −b events", "+b / −b 이벤트 생성"), code: "events += [(s, +b), (t+1, -b) for each cow]", color: "#f97316" },
              { n: 2, label: t(E, "Sort by time", "시간순 정렬"), code: "events.sort()", color: "#0891b2" },
              { n: 3, label: t(E, "Sweep, accumulate", "스윕, 누적"), code: "cur = 0;  for time, delta in events: cur += delta", color: "#7c3aed" },
              { n: 4, label: t(E, "Track running max", "최댓값 추적"), code: "best = max(best, cur);  print(best)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#f97316" }}>O(N log N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "sort 2N events + linear sweep", "2N 이벤트 정렬 + 선형 스윕")}</div>
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
