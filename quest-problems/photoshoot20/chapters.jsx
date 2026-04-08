import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "b = list(map(int, input().split()))",
  "",
  "for a0 in range(1, N + 1):",
  "    a = [a0]",
  "    valid = True",
  "    for i in range(N - 1):",
  "        a_next = b[i] - a[-1]",
  "        a.append(a_next)",
  "    # Check if valid permutation of 1..N",
  "    if sorted(a) == list(range(1, N + 1)):",
  "        print(' '.join(map(str, a)))",
  "        break",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhoto20Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given b[i] = a[i] + a[i+1] for a permutation a of 1..N, find the lexicographically smallest permutation a. Try each possible a[0] from 1 to N and derive the rest!",
        "순열 a의 b[i] = a[i] + a[i+1]이 주어질 때, 사전순으로 가장 작은 순열 a를 구해. a[0]을 1부터 N까지 시도하고 나머지를 유도해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"📸"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Photoshoot</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2020 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Try a[0] = 1, 2, ..., N. For each, compute a[i+1] = b[i] - a[i]. Check if result is a valid permutation of 1..N. First valid one is lex-smallest.",
              "핵심: a[0] = 1, 2, ..., N을 시도. 각각에 대해 a[i+1] = b[i] - a[i] 계산. 결과가 1..N의 유효한 순열인지 확인. 첫 번째 유효한 것이 사전순 최소.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Example: b = [3], N = 2. We need a[0] + a[1] = 3. If a[0] = 1, then a[1] = 2. Is [1, 2] a valid permutation of {1, 2}?",
        "예시: b = [3], N = 2. a[0] + a[1] = 3이 필요해. a[0] = 1이면, a[1] = 2. [1, 2]는 {1, 2}의 유효한 순열일까?"),
      question: t(E,
        "b = [3], N = 2. If a[0] = 1, a[1] = 2. Is [1, 2] valid?",
        "b = [3], N = 2. a[0] = 1이면, a[1] = 2. [1, 2]는 유효할까?"),
      options: [
        t(E, "Yes, it's a valid permutation", "맞아, 유효한 순열이야"),
        t(E, "No, it's not valid", "아니, 유효하지 않아"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! [1, 2] is a permutation of {1, 2} and a[0]+a[1] = 1+2 = 3 = b[0]. Valid!",
        "맞아! [1, 2]는 {1, 2}의 순열이고 a[0]+a[1] = 1+2 = 3 = b[0]. 유효해!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For b = [3], N = 2, what is a[0] in the lexicographically smallest permutation?",
        "b = [3], N = 2일 때, 사전순 최소 순열의 a[0]은?"),
      question: t(E,
        "b = [3], N = 2. a[0] for lex-smallest permutation?",
        "b = [3], N = 2. 사전순 최소 순열의 a[0]은?"),
      hint: t(E,
        "Try a[0] = 1: a[1] = 3 - 1 = 2. [1,2] is valid!",
        "a[0] = 1 시도: a[1] = 3 - 1 = 2. [1,2]는 유효해!"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhoto20Ch2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Try each a[0] from 1 to N, derive the rest in O(N). Total: O(N^2). For Bronze constraints, this is fast enough!",
        "a[0]을 1부터 N까지 시도하고 나머지를 O(N)에 유도. 총: O(N^2). 브론즈 제한에서는 충분히 빨라!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>{"O(N\u00b2)"}</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each candidate a[0], compute a[i+1] = b[i] - a[i]. Check if all values form a valid permutation (all in 1..N, no duplicates). Return the first valid one.",
              "각 후보 a[0]에 대해 a[i+1] = b[i] - a[i] 계산. 모든 값이 유효한 순열을 이루는지 확인 (1..N 내, 중복 없음). 첫 번째 유효한 것 반환.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the full brute-force solution!",
        "완전 탐색 전체 풀이야!"),
      label: t(E, "Python Solution", "Python 풀이"),
      code: SOLUTION_CODE,
    },
  ];
}
