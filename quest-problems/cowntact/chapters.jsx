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
        "Consider the string \"11111\".\nAll 5 cows are infected.\nCould they all have come from just 1 cow in the middle?\nYes!\nThe center cow infects outward over time.", "문자열 \"11111\"을 생각해봐요. 5마리 모두 감염됐어. 가운데 1마리에서 시작했을 수 있을까? 그렇지! 가운데 소가 시간이 지나면서 양옆으로 퍼져."),
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
        "Now consider \"01110110\".\nThe 0s break the infected cows into separate groups.\nGroup 1: positions 1-3 (\"111\"), Group 2: positions 5-6 (\"11\").\nEach group needs at least 1 initial source!", "이제 \"01110110\"을 봐요.\n0이 감염된 소들을 별도 그룹으로 나눠.\n그룹1: 위치 1-3 (\"111\"), 그룹2: 위치 5-6 (\"11\").\n각 그룹은 최소 1마리 초기 감염이 필요해요!"),
      question: t(E,
        "\"01110110\"\nHow many separate infected groups?",
        "\"01110110\"\n감염된 그룹이 몇 개예요?"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowntactCh2(E, lang = "py") {
  return [
    // 2-1: Approach reveal
    {
      type: "reveal",
      narr: t(E,
        "The key insight: each consecutive segment of 1s can be explained by a single initial infection.\nSo the answer = number of separate groups of consecutive 1s!", "핵심 통찰: 연속된 1의 각 세그먼트는 하나의 초기 감염으로 설명 가능. 답 = 연속된 1 그룹의 수!"),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Full code reveal
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getCowntactSections(E),
    },
  ];
}
