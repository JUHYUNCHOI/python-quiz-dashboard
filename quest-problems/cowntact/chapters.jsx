import { C, t } from "@/components/quest/theme";
import { getCowntactSections, InfectionSim, RunsViz } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowntactCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N cows in a row. Some unknown cows started sick on day 0; each night, every sick cow infects her immediate neighbors.\nGiven the final state of who's sick (a string of 0s and 1s) after some number of nights, what's the SMALLEST number of cows that could have been sick on day 0?",
        "0일차에 감염됐던 소가 최소 몇 마리였을지 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🦠</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#7c5cfc" }}>Cowntact Tracing 2</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2023 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #7c5cfc", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output the smallest possible number of cows that could have been sick on day 0 to produce this final state.",
                "이 최종 상태가 나오려면 0일차에 몇 마리가 감염돼 있어야 했을까요? 그 최소 수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#7c5cfc", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#7c5cfc" }}>{t(E, "N cows in a row", "한 줄로 선 N마리 소")}</b>
                  {t(E, ". Some cows were sick on day 0 — we don't know which.",
                        "가 있어요. 0일차에 어떤 소들이 감염됐는지 우리는 몰라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#7c5cfc", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each night, every sick cow ", "매일 밤, 모든 감염된 소가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "infects her immediate neighbors", "양옆 이웃에게 병을 옮겨요")}</b>
                  {t(E, " (left and right). Once sick, always sick.",
                        " (왼쪽과 오른쪽). 한 번 감염된 소는 계속 감염 상태예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#7c5cfc", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "final state", "최종 상태")}</b>
                  {t(E, " — a string of 0s (healthy) and 1s (sick) — after some unknown number of nights.",
                        " — 0(건강)과 1(감염)으로 된 문자열 — 이 며칠 후의 모습으로 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of cows that could have been sick on day 0", "0일차에 감염됐을 수 있는 소의 최소 수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Spread simulator — see infection wave with your eyes
    {
      type: "reveal",
      narr: t(E,
        "Try it: pick Day-0 sources, press Play, watch the wave. Notice — one source can fill a whole connected stretch.",
        "0일차 감염원을 고르고 재생해서 어떻게 퍼지는지 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <InfectionSim E={E} />
          <div style={{ marginTop: 10, padding: "8px 12px", background: "#fff7ed", border: "1px dashed #fdba74", borderRadius: 8, fontSize: 12, color: "#9a3412" }}>
            🔑 {t(E,
              "Key observation: no matter how long a connected run of 1s is, ONE source in the middle can produce it. And a 0 in between was never reached, so one source can never cover two runs. So we just need to count separate runs.",
              "핵심 관찰: 1 이 연속된 덩어리가 아무리 길어도, 가운데 한 마리만 있으면 만들 수 있어요. 반대로 사이에 있는 0 에는 병이 닿은 적이 없으니, 한 마리가 두 덩어리를 채울 수는 없어요. 그래서 떨어진 덩어리 개수만 세면 돼요.")}
          </div>
        </div>),
    },
    // 1-3: Quiz — single segment
    {
      type: "quiz",
      narr: t(E,
        "Picture the spread in reverse — if 5 cows are sick now, how few could have started it?",
        "지금 5 마리가 감염이라면 처음엔 최소 몇 마리였을까요?"),
      question: t(E,
        "\"11111\" — what is the minimum number initially infected?",
        "\"11111\" 이 되려면 처음에 감염된 소는 최소 몇 마리일까요?"),
      options: [
        t(E, "5 (all of them)", "5 (전부)"),
        t(E, "1 (one in the middle)", "1 (가운데 하나)"),
        t(E, "2 (both ends)", "2 (양쪽 끝)"),
      ],
      correct: 1,
      explain: t(E,
        "One cow in the middle can spread outward to infect all 5! A single continuous group needs only 1 initial source.",
        "가운데 한 마리가 양옆으로 퍼져서 5마리를 모두 감염시킬 수 있어요! 이어진 덩어리 하나는 처음 감염 1마리면 돼요."),
    },
    // 1-4: Visualize runs — eye-evident counting
    {
      type: "reveal",
      narr: t(E,
        "Each '0' is a wall. Look at \"01110110\" — colored groups show the answer at a glance.",
        "0 이 벽이 돼서 덩어리를 갈라 놓아요."),
      content: (
        <div style={{ padding: 16 }}>
          <RunsViz E={E} str="01110110" />
        </div>),
    },
    // 1-5: Input — multiple segments
    {
      type: "input",
      narr: t(E,
        "0s split the row.  Look at \"01110110\" and find the runs of 1s.",
        "0 이 줄을 끊어요. \"01110110\" 에서 1 이 이어진 덩어리를 세 보세요."),
      question: t(E,
        "\"01110110\"\nHow many separate infected groups?",
        "\"01110110\"\n감염된 덩어리가 몇 개일까요?"),
      hint: t(E,
        "Each '0' breaks the chain.  Count how many separate runs of 1s appear.",
        "0 이 줄을 끊어 줘요. 1 이 이어진 덩어리가 몇 개일까요?"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowntactCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — answer = number of runs of 1s.
    {
      type: "progressive",
      narr: t(E,
        "Walk the string once and count runs of 1s.  Sections build the loop one piece at a time.",
        "문자열을 한 번 훑으며 1 이 이어진 덩어리 수를 세요."),
      sections: getCowntactSections(E),
    },
  ];
}
