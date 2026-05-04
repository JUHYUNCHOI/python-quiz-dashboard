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
        "Cows are getting sick!\nInfection spreads to adjacent cows each night.\nGiven the final state, find the minimum number of cows that were initially infected!\n🦠", "소들이 아프고 있어! 감염이 매일 밤 옆 소에게 퍼져. 최종 상태가 주어지면, 처음에 감염된 소의 최소 수를 찾아! 🦠"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🦠</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#7c5cfc" }}>Cowntact Tracing 2</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2023 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N cows in a line. Infection spreads to adjacent each night. Given final state (0s and 1s), find min initially infected.",
              "N마리 소가 줄 서 있어. 감염이 매일 밤 양옆으로 퍼져. 최종 상태(0과 1)가 주어지면 처음 감염된 최소 수를 찾아.")}
          </div>
        </div>),
    },
    // 1-2: Quiz — single segment
    {
      type: "quiz",
      narr: t(E,
        "Consider the string \"11111\".\nAll 5 cows are infected.\nCould they all have come from just 1 cow in the middle?\nYes!\nThe center cow infects outward over time.", "문자열 \"11111\"을 생각해봐. 5마리 모두 감염됐어. 가운데 1마리에서 시작했을 수 있을까? 그렇지! 가운데 소가 시간이 지나면서 양옆으로 퍼져."),
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
        "가운데 한 마리가 양옆으로 퍼져서 5마리 모두 감염시킬 수 있어! 연속된 하나의 그룹은 초기 감염 1마리면 돼."),
    },
    // 1-3: Input — multiple segments
    {
      type: "input",
      narr: t(E,
        "Now consider \"01110110\".\nThe 0s break the infected cows into separate groups.\nGroup 1: positions 1-3 (\"111\"), Group 2: positions 5-6 (\"11\").\nEach group needs at least 1 initial source!", "이제 \"01110110\"을 봐.\n0이 감염된 소들을 별도 그룹으로 나눠.\n그룹1: 위치 1-3 (\"111\"), 그룹2: 위치 5-6 (\"11\").\n각 그룹은 최소 1마리 초기 감염이 필요해!"),
      question: t(E,
        "\"01110110\"\nHow many separate infected groups?",
        "\"01110110\"\n감염된 그룹이 몇 개야?"),
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
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#7c5cfc", marginBottom: 8 }}>
            {t(E, "Approach: Count Segments", "접근법: 세그먼트 세기")}
          </div>
          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Scan left to right:\n• When you hit a '1', increment count\n• Skip all consecutive '1's (same group)\n• When you hit a '0', just move on\n\nEach group of 1s = 1 initial infection\nAnswer = total number of groups",
              "왼쪽에서 오른쪽으로 스캔:\n• '1'을 만나면 카운트 +1\n• 연속된 '1'은 모두 건너뛰기 (같은 그룹)\n• '0'을 만나면 그냥 넘어가기\n\n1의 각 그룹 = 초기 감염 1마리\n답 = 총 그룹 수")}
          </div>
          <div style={{
            marginTop: 10, background: "#f5f3ff", borderRadius: 10,
            padding: 10, border: "2px solid #c4b5fd",
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#7c5cfc", marginBottom: 4 }}>
              {t(E, "Example: \"01110110\"", "예시: \"01110110\"")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 6 }}>
              {"01110110".split("").map((ch, i) => (
                <div key={i} style={{
                  width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 6, fontSize: 14, fontWeight: 900,
                  fontFamily: "'JetBrains Mono',monospace",
                  background: ch === "1" ? "#c4b5fd" : "#e5e7eb",
                  border: `2px solid ${ch === "1" ? "#7c5cfc" : "#d1d5db"}`,
                  color: ch === "1" ? "#4c1d95" : "#9ca3af",
                }}>{ch}</div>
              ))}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
              fontWeight: 700, color: C.text, textAlign: "center",
            }}>
              {t(E, "2 groups of 1s → answer = 2", "1의 그룹 2개 → 답 = 2")}
            </div>
          </div>
        </div>),
    },
    // 2-2: Full code reveal
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getCowntactSections(E),
    },
  ];
}
