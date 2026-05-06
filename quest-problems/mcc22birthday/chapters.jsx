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
        "We're planning a cat's birthday party. N cats each list which TIME SLOTS they're available for.\nPrint the MAXIMUM number of cats that can attend a single time slot (over all slots).",
        "고양이 생일 파티를 계획해요. N 마리 고양이가 각자 참석 가능한 시간대 목록을 제출해요.\n모든 시간대 중에서 한 시간대에 가장 많은 고양이가 참석할 수 있는 인원을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf82"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Cats' Birthday</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P4</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Plan a party for ", "")}
                  <b style={{ color: "#f97316" }}>{t(E, "N cats; each lists time slots she's available", "N 마리 고양이; 각자 참석 가능한 시간대 목록")}</b>
                  {t(E, ".", " 을 제출해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MAX number of cats that can attend a single time slot", "한 시간대에 참석할 수 있는 최대 고양이 수")}</b>
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
        "For each time slot, count cats that listed it as available. The maximum count across all slots is the answer.",
        "각 시간대별로 참석 가능 표시한 고양이 수 카운트. 모든 시간대 중 최댓값이 답."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init slot frequency map", "시간대 빈도 맵 초기화"), code: "freq = defaultdict(int)", color: "#f97316" },
              { n: 2, label: t(E, "Add each cat's availability", "각 고양이의 가능 시간 추가"), code: "for cat in cats: for slot in cat.slots: freq[slot] += 1", color: "#7c3aed" },
              { n: 3, label: t(E, "Find max count", "최댓값 찾기"), code: "best = max(freq.values())", color: "#0891b2" },
              { n: 4, label: t(E, "Print best", "best 출력"), code: "print(best)", color: "#16a34a" },
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
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#f97316" }}>O(N + T)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "linear scan over availability", "가능 시간 선형 스캔")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc22BirthdaySections(E),
    },
  ];
}
