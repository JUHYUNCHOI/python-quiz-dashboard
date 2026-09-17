import { C, t } from "@/components/quest/theme";
import { getSleepClassSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie has N class periods, each of some length a[i]. The only allowed operation: pick two ADJACENT periods and merge them into one whose length is the SUM. Repeat to reach a state where every remaining period has the SAME length.\nFor each test case, print the MINIMUM number of merges.",
        "옆에 붙은 수업을 합쳐서 길이를 모두 똑같이 만들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"😴"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Sleeping in Class</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2022 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "For each test case, output the minimum number of adjacent merges to make all periods equal length.",
                "모든 수업을 같은 길이로 만드는 데 드는 최소 합치기 횟수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has ", "Bessie가 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N class periods of lengths a[1..N]", "길이 a[1..N] 의 N 개 수업")}</b>
                  {t(E, ".", "을 들어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation: ", "한 번에 할 수 있는 건 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "merge two ADJACENT periods", "인접한 두 시간을 합치는 것")}</b>
                  {t(E, " into one whose length is the sum.",
                        " 하나예요. 새 길이는 둘을 더한 값이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Goal: ", "목표: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "every remaining period has the SAME length", "모든 남은 시간이 같은 길이가 되도록")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of merges", "필요한 최소 합치기 횟수")}</b>
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
        "[1,2,3,1,1,1] total=9. Target 3 means merge into [3,3,3]. How many merges?", "[1,2,3,1,1,1] 을 [3,3,3] 으로 만들려면 몇 번 합칠까요?"),
      question: t(E,
        "[1,2,3,1,1,1] -> [3,3,3]. Merges needed?",
        "[1,2,3,1,1,1] → [3,3,3]. 몇 번 합칠까요?"),
      options: [
        t(E, "3 (6 periods -> 3 periods = 3 merges)", "3 (6개 → 3개 = 3번 합치기)"),
        t(E, "2", "2"),
        t(E, "4", "4"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 6 periods become 3 periods. Each merge reduces count by 1, so 3 merges.",
        "맞아요! 6개가 3개가 됐어요.\n한 번 합칠 때마다 1개씩 줄어드니까 3번이에요."),
    },
    // 1-3: Sim — divisor + greedy partition
    {
      type: "sim",
      narr: t(E,
        "Try a divisor d of the total. Walk left→right, accumulate; close a segment when sum = d. If you ever overshoot, that d fails.\nMerges = N − number of segments. Smallest across all working d is the answer.",
        "총합의 약수 d 를 골라 왼쪽부터 d 씩 묶어 봐요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "[2,2,3] total=7. Only divisor that works is 7 itself (merge all). How many merges?", "[2,2,3] 은 총합이 7 이라 약수가 7 뿐이에요. 몇 번 합칠까요?"),
      question: t(E,
        "[2,2,3] total=7. Min merges?",
        "[2,2,3] 총합=7. 최소 몇 번 합칠까요?"),
      hint: t(E,
        "Which target lengths divide the total sum cleanly?",
        "총합을 딱 나누어떨어지게 하는 길이는 뭐가 있을까요?"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Final equal value must divide total sum S. For each divisor d of S, greedily walk the array accumulating — start a new segment when running sum == d. Smallest 'N − segments' wins. Sections build it one piece at a time.",
        "마지막에 남는 길이는 총합 S 의 약수예요."),
      sections: getSleepClassSections(E),
    },
  ];
}
