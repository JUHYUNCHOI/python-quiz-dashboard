import { C, t } from "@/components/quest/theme";
import { getMcc22BirthdaySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    N = int(input_data[idx]); idx += 1  # cats",
  "    T = int(input_data[idx]); idx += 1  # time slots",
  "",
  "    # Each cat has a set of available time slots",
  "    avail = []",
  "    for i in range(N):",
  "        k = int(input_data[idx]); idx += 1",
  "        slots = set()",
  "        for _ in range(k):",
  "            slots.add(int(input_data[idx])); idx += 1",
  "        avail.append(slots)",
  "",
  "    # Greedy: pick the time slot that accommodates most cats",
  "    best = 0",
  "    for slot in range(1, T + 1):",
  "        count = sum(1 for i in range(N) if slot in avail[i])",
  "        best = max(best, count)",
  "",
  "    print(best)",
  "",
  "solve()",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22BirthdayCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Plan a cat's birthday party!\nN cats each have availability for certain time slots.\nFind the time slot where the maximum number of cats can attend!", "고양이 생일 파티를 계획해! N마리 고양이는 각각 특정 시간대에 참석 가능해. 최대한 많은 고양이가 참석할 수 있는 시간대를 찾아!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf82"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Cats' Birthday</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P4</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: For each time slot, count how many cats are available. The answer is the maximum count across all slots. Simple counting / scheduling problem.",
              "핵심: 각 시간대별로 참석 가능한 고양이 수를 세어. 모든 시간대 중 최대 수가 답. 간단한 카운팅 / 스케줄링 문제.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "3 cats, 2 time slots.\nCat 1: slot 1 only.\nCat 2: slots 1 and 2.\nCat 3: slot 2 only.\nWhich slot has the most cats?", "고양이 3마리, 시간대 2개. 고양이 1: 시간대 1만. 고양이 2: 시간대 1, 2 모두. 고양이 3: 시간대 2만. 어느 시간대에 가장 많은 고양이?"),
      question: t(E,
        "Slot 1: cats 1,2 (2 cats). Slot 2: cats 2,3 (2 cats). Max attendance?",
        "시간대 1: 고양이 1,2 (2마리). 시간대 2: 고양이 2,3 (2마리). 최대 참석수?"),
      options: [
        t(E, "2 cats", "2마리"),
        t(E, "3 cats", "3마리"),
        t(E, "1 cat", "1마리"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Both slots have 2 cats each, so the max is 2.",
        "맞아! 두 시간대 모두 2마리씩이니까 최대는 2."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "What is the maximum number of cats that can attend in the above scenario?", "위 시나리오에서 최대 참석 가능한 고양이 수는?"),
      question: t(E,
        "3 cats, 2 slots. Max cats in one slot?",
        "고양이 3마리, 시간대 2개. 한 시간대 최대 고양이 수?"),
      hint: t(E,
        "Slot 1 has cats 1,2. Slot 2 has cats 2,3. Both have 2.",
        "시간대 1에 고양이 1,2. 시간대 2에 고양이 2,3. 둘 다 2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22BirthdayCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each time slot, count available cats. O(N * T) total.", "각 시간대별 가능한 고양이 수 세기. 총 O(N * T)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N * T)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Iterate over all time slots, for each count how many cats list it as available. Track the maximum. Could also use a frequency array for O(N + T).",
              "모든 시간대를 순회하며 각 시간대에 참석 가능한 고양이 수 세기. 최대값 추적. 빈도 배열을 쓰면 O(N + T)도 가능.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc22BirthdaySections(E),
    },
  ];
}
