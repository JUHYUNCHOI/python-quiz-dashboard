import { C, t } from "@/components/quest/theme";
import { getCowntactSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "s = input()",
  "",
  "count = 0",
  "i = 0",
  "while i < N:",
  "    if s[i] == '1':",
  "        count += 1",
  "        while i < N and s[i] == '1':",
  "            i += 1",
  "    else:",
  "        i += 1",
  "",
  "print(count)",
];


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
        "FJ에게 한 줄로 선 N마리 소가 있어요. 0일차에 어떤 소들이 처음 감염됐고, 매일 밤 감염된 소가 양옆 이웃에게 병을 옮겨요.\n며칠이 지난 뒤의 최종 감염 상태(0과 1로 된 문자열)가 주어지면, 0일차에 감염됐던 소의 최소 수는 몇 마리일까요?"),
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
                "이 최종 상태를 만들 수 있는 0 일차 감염 소의 최소 수를 출력.")}
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
    // 1-2: Quiz — single segment
    {
      type: "quiz",
      narr: t(E,
        "Picture the spread in reverse — if 5 cows are sick now, how few could have started it?",
        "거꾸로 상상해 봐 — 지금 5 마리가 감염이라면, 시작은 최소 몇 마리?"),
      question: t(E,
        "\"11111\" — what is the minimum number initially infected?",
        "\"11111\" — 처음에 감염된 최소 수는?"),
      options: [
        t(E, "5 (all of them)", "5 (전부)"),
        t(E, "1 (one in the middle)", "1 (가운데 하나)"),
        t(E, "2 (both ends)", "2 (양쪽 끝)"),
      ],
      correct: 1,
      explain: t(E,
        "One cow in the middle can spread outward to infect all 5! A single continuous group needs only 1 initial source.",
        "가운데 한 마리가 양옆으로 퍼져서 5마리 모두 감염시킬 수 있어요! 연속된 하나의 그룹은 초기 감염 1마리면 돼요."),
    },
    // 1-3: Input — multiple segments
    {
      type: "input",
      narr: t(E,
        "0s split the row.  Look at \"01110110\" and find the runs of 1s.",
        "0 이 줄을 끊어. \"01110110\" 에서 1 이 이어지는 구간을 세 봐."),
      question: t(E,
        "\"01110110\"\nHow many separate infected groups?",
        "\"01110110\"\n감염된 그룹이 몇 개예요?"),
      hint: t(E,
        "Each '0' breaks the chain.  Count how many separate runs of 1s appear.",
        "0 은 끊어주는 역할. 1 이 연속된 덩어리가 몇 개?"),
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
        "문자열을 한 번 훑으며 1 의 연속 구간 개수를 세요. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getCowntactSections(E),
    },
  ];
}
