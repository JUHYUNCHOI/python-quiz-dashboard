import { C, t } from "@/components/quest/theme";
import { getBucketListSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBucketListCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Each cow needs buckets for a different stretch of days. What's the fewest buckets needed?",
        "소마다 양동이가 필요한 기간이 달라요.\n양동이는 몇 개만 있으면 될까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🪣"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>The Bucket List</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2018 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of buckets FJ must own to cover every cow on every day.",
                "모든 소가 매일 쓸 수 있는 양동이의 최소 개수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "Buckets can be reused across cows", "양동이는 소끼리 다시 쓸 수 있어요")}</b>
                  {t(E, " whose active intervals don't overlap (a cow that's done releases her buckets for someone else).",
                        " — 쓰는 기간이 겹치지 않을 때만요. 먼저 끝난 소가 내려놓은 양동이를 다음 소가 쓰거든요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "Cow 1 needs 3 buckets from t=1-5, cow 2 needs 2 buckets from t=3-8.\nAt t=3, both are active: 3 + 2 = 5 buckets needed.", "소 1 은 t=1~5 에 양동이 3개가, 소 2 는 t=3~8 에 2개가 필요해요.\nt=3 에는 둘 다 쓰고 있어요."),
      question: t(E,
        "Cow1: 3 buckets t=1-5, Cow2: 2 buckets t=3-8. Max buckets at any time?",
        "소1 은 t=1~5 에 3개, 소2 는 t=3~8 에 2개가 필요해요. 한 시점에 가장 많이 쓰는 양동이는 몇 개일까요?"),
      options: [
        t(E, "3 - just cow 1", "3개 — 소1 만 쓸 때"),
        t(E, "5 - both overlap at t=3-5", "5개 — t=3~5 에 둘이 겹칠 때"),
        t(E, "8 - sum of all", "8개 — 전부 더한 값"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! From t=3 to t=5, both cows need buckets: 3 + 2 = 5. That's the maximum.",
        "맞아요! t=3 부터 t=5 까지는 두 소가 함께 쓰니 3 + 2 = 5 개가 필요해요.\n그게 가장 큰 값이에요."),
    },
    // 1-3: Sim — drag the timeline, see active cows + bucket total live
    {
      type: "sim",
      narr: t(E,
        "Drag the slider to see buckets needed at that moment — the peak is the answer.",
        "슬라이더를 움직이면 그 시점에 필요한 양동이 수가 보여요.\n그중 가장 큰 값이 정답이에요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Cow 1: 3 buckets t=1-5, Cow 2: 2 buckets t=3-8.\nWhat's the max buckets needed at any time?", "소 1 은 t=1~5 에 3개, 소 2 는 t=3~8 에 2개예요.\n한 시점에 필요한 양동이는 최대 몇 개일까요?"),
      question: t(E,
        "Max buckets needed at any time?",
        "한 시점에 필요한 양동이는 최대 몇 개일까요?"),
      hint: t(E,
        "Find the time window where both cows overlap, then sum their buckets.",
        "두 소가 함께 쓰는 기간을 찾아 양동이 수를 더해 봐요."),
      answer: 5,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBucketListCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Mark +b at each interval's start, −b the day after it ends, then track the running max.",
        "구간마다 시작에 +b, 끝난 다음 날에 −b 를 적어요.\n시간순으로 더해 가며 가장 큰 값을 기억해요."),
      sections: getBucketListSections(E),
    },
  ];
}
