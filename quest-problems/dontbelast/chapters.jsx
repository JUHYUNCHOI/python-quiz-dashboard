import { C, t } from "@/components/quest/theme";
import { getDontBeLastSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "cows = ['Bessie','Elsie','Daisy','Gertie','Annabelle','Maggie','Henrietta']",
  "milk = {c: 0 for c in cows}",
  "",
  "N = int(input())",
  "for _ in range(N):",
  "    parts = input().split()",
  "    name = parts[0]",
  "    amt = int(parts[1])",
  "    milk[name] += amt",
  "",
  "vals = sorted(set(milk.values()))",
  "if len(vals) < 2:",
  "    print('Tie')",
  "else:",
  "    second = vals[1]",
  "    winners = [c for c in cows if milk[c] == second]",
  "    if len(winners) == 1:",
  "        print(winners[0])",
  "    else:",
  "        print('Tie')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDontBeLastCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Seven cows produce milk.\nGiven a log of milk entries, find the cow with the second-lowest total production.\nIf there's a tie for second-lowest, output 'Tie'.", "일곱 마리 소가 우유를 생산해. 우유 기록 로그가 주어지면, 총 생산량이 두 번째로 적은 소를 찾아. 두 번째로 적은 양이 동률이면 'Tie'를 출력해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\udd5b"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Don't Be Last!</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Sum each cow's milk, sort unique totals, find the second-smallest value, then check if exactly one cow has that amount.",
              "핵심: 각 소의 우유 합산,\n고유 합계 정렬,\n두 번째로 작은 값 찾기, 그 양을 가진 소가 정확히 한 마리인지 확인.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "All 7 cows produce 0 milk except Bessie who produces 5.\nThe minimum is 0 (six cows).\nThe second-lowest distinct value is 5.\nOnly Bessie has 5.\nWhat's the answer?", "베시만 5를 생산하고 나머지 6마리는 0이야. 최솟값은 0 (6마리). 두 번째로 작은 고유값은 5. 베시만 5를 가져. 답은?"),
      question: t(E,
        "6 cows produce 0, Bessie produces 5. Who is second-lowest?",
        "6마리는 0, 베시는 5. 두 번째로 적은 소는?"),
      options: [
        t(E, "Tie (6 cows at 0)", "Tie (0인 소 6마리)"),
        t(E, "Bessie", "Bessie (베시)"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Min=0, second distinct value=5. Only Bessie has 5, so the answer is Bessie.",
        "맞아! 최솟값=0, 두 번째 고유값=5. 베시만 5이므로 답은 Bessie야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "The problem always uses exactly 7 named cows. How many cows are there in total?", "이 문제에서는 항상 정확히 7마리의 이름 있는 소를 사용해. 총 몇 마리야?"),
      question: t(E,
        "How many named cows are in this problem?",
        "이 문제에서 이름 있는 소는 총 몇 마리?"),
      hint: t(E,
        "Bessie, Elsie, Daisy, Gertie, Annabelle, Maggie, Henrietta.",
        "Bessie, Elsie, Daisy, Gertie, Annabelle, Maggie, Henrietta."),
      answer: 7,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDontBeLastCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "With only 7 cows, just sum each cow's milk, find unique sorted totals, and check the second value.\nO(N) where N is number of log entries.", "소가 7마리뿐이니까, 각 소의 우유를 합산하고, 고유 합계를 정렬하고, 두 번째 값을 확인하면 돼. 로그 개수 N에 대해 O(N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Sum milk per cow using a dictionary.\nGet sorted unique totals. If fewer than 2 unique values, output 'Tie'. Otherwise check if exactly one cow has the second value.",
              "딕셔너리로 소별 우유 합산.\n고유 합계 정렬.\n고유값이 2개 미만이면 'Tie'. 아니면 두 번째 값을 가진 소가 정확히 1마리인지 확인.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getDontBeLastSections(E),
    },
  ];
}
