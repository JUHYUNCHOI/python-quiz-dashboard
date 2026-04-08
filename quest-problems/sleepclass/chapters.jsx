import { C, t } from "@/components/quest/theme";

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
        "Merge adjacent class periods until all are equal length. Find the minimum number of merges!",
        "인접한 수업 시간을 합쳐서 모두 같은 길이로 만들어. 최소 합치기 횟수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"😴"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Sleeping in Class</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2022 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: The final equal value must be a divisor of the total sum. Try each divisor and check if we can partition into equal segments.",
              "핵심: 최종 동일 값은 총합의 약수여야 해. 각 약수를 시도하고 동일 구간으로 나눌 수 있는지 확인.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "[1,2,3,1,1,1] total=9. Target 3 means merge into [3,3,3]. How many merges?",
        "[1,2,3,1,1,1] 총합=9. 목표 3이면 [3,3,3]으로 합치기. 합치기 몇 번?"),
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
        "[2,2,3] total=7. Only divisor that works is 7 itself (merge all). How many merges?",
        "[2,2,3] 총합=7. 가능한 약수는 7뿐 (전부 합치기). 합치기 몇 번?"),
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
export function makeSleepCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Try each divisor of total sum. For each, scan array to check partition. O(N * d(S)) where d(S) = number of divisors.",
        "총합의 각 약수를 시도. 각각에 대해 배열 스캔으로 분할 확인. O(N * d(S)), d(S) = 약수 개수."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N * d(S))</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each divisor d of total sum S: greedily accumulate periods. If running sum equals d, start new segment. Count merges = N - segments.",
              "총합 S의 각 약수 d에 대해: 그리디로 시간 누적. 누적합이 d면 새 구간 시작. 합치기 = N - 구간 수.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the full solution!",
        "전체 풀이야!"),
      label: t(E, "Python Solution", "Python 풀이"),
      code: SOLUTION_CODE,
    },
  ];
}
