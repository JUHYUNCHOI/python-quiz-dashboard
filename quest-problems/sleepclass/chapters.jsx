import { C, t } from "@/components/quest/theme";
import { getSleepClassSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    a = list(map(int, input().split()))",
  "    total = sum(a)",
  "",
  "    best = N - 1  # worst case: merge all into one",
  "",
  "    # Try each divisor of total as target period length",
  "    for d in range(1, total + 1):",
  "        if total % d != 0:",
  "            continue",
  "        target = d",
  "        # Try to partition into segments summing to target",
  "        merges = 0",
  "        curr = 0",
  "        for x in a:",
  "            curr += x",
  "            if curr == target:",
  "                curr = 0",
  "            elif curr > target:",
  "                break",
  "        else:",
  "            if curr == 0:",
  "                # Number of merges = N - (total // target)",
  "                merges = N - (total // target)",
  "                best = min(best, merges)",
  "",
  "    print(best)",
];


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
        "Bessie가 N 개의 수업을 들어야 하는데, 각 수업의 길이는 a[i] 예요. 허용된 연산: 인접한 두 시간을 골라 길이의 합으로 합치기. 반복해서 모든 남은 시간이 같은 길이가 되도록 만들어요.\n각 테스트 케이스마다 필요한 최소 합치기 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"😴"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Sleeping in Class</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2022 Bronze #1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has ", "Bessie가 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N class periods of lengths a[1..N]", "길이 a[1..N] 의 N 개 수업")}</b>
                  {t(E, ".", "을 들어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation: ", "한 번의 연산: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "merge two ADJACENT periods", "인접한 두 시간을 합치기")}</b>
                  {t(E, " into one whose length is the sum.",
                        " — 길이가 둘의 합인 한 시간으로.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Goal: ", "목표: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "every remaining period has the SAME length", "모든 남은 시간이 같은 길이가 되도록")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
        "[1,2,3,1,1,1] total=9. Target 3 means merge into [3,3,3]. How many merges?", "[1,2,3,1,1,1] 총합=9. 목표 3이면 [3,3,3]으로 합치기. 합치기 몇 번?"),
      question: t(E,
        "[1,2,3,1,1,1] -> [3,3,3]. Merges needed?",
        "[1,2,3,1,1,1] -> [3,3,3]. 합치기 횟수?"),
      options: [
        t(E, "3 (6 periods -> 3 periods = 3 merges)", "3 (6개 -> 3개 = 3번 합치기)"),
        t(E, "2", "2"),
        t(E, "4", "4"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 6 periods become 3 periods. Each merge reduces count by 1, so 3 merges.",
        "맞아! 6개가 3개로. 합치기 한 번에 개수가 1 줄어드니까 3번."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "[2,2,3] total=7. Only divisor that works is 7 itself (merge all). How many merges?", "[2,2,3] 총합=7. 가능한 약수는 7뿐 (전부 합치기). 합치기 몇 번?"),
      question: t(E,
        "[2,2,3] total=7. Min merges?",
        "[2,2,3] 총합=7. 최소 합치기?"),
      hint: t(E,
        "7 is prime. Only target is 7 (one big period). 3 periods -> 1 = 2 merges.",
        "7은 소수. 목표는 7만 가능 (하나로 합침). 3개 -> 1개 = 2번 합치기."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "The final equal value MUST divide the total sum S. For each divisor d of S, greedily walk the array accumulating; whenever running sum == d, start a new segment. The smallest 'merges = N − segments' wins.",
        "최종 동일 값은 총합 S 의 약수여야 함. S 의 각 약수 d 에 대해, 배열을 누적하며 그리디 — 누적 == d 가 되면 새 구간 시작. 가장 작은 '합치기 = N − 구간 수' 가 답."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Compute total S", "총합 S 계산"), code: "S = sum(a)", color: "#059669" },
              { n: 2, label: t(E, "For each divisor d of S", "S 의 각 약수 d"), code: "for d in divisors(S):", color: "#7c3aed" },
              { n: 3, label: t(E, "Greedy partition", "그리디 분할"), code: "cur = 0; segs = 0;  for x in a: cur += x; if cur == d: segs += 1; cur = 0; elif cur > d: invalid", color: "#0891b2" },
              { n: 4, label: t(E, "Min merges = N − max segments", "최소 합치기 = N − 최대 구간"), code: "print(N - best_segs)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(N · d(S))</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "scan for each divisor of total", "총합 약수마다 스캔")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getSleepClassSections(E),
    },
  ];
}
