import { C, t } from "@/components/quest/theme";

export const SOLUTION_CODE = [
  "T = int(input())",
  "for _ in range(T):",
  "    N, M = map(int, input().split())",
  "    # N opening brackets, M closing brackets",
  "    # Balanced = min(N, M) pairs = 2 * min(N, M)",
  "    # But we need longest balanced subsequence of",
  "    # the string '(' * N + ')' * M",
  "    # Since all '(' come before all ')',",
  "    # max balanced = 2 * min(N, M)",
  "    print(2 * min(N, M))",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makeBalancedCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "We have a string of N '(' followed by M ')'. Find the longest balanced subsequence! 🔗",
        "N개의 '(' 뒤에 M개의 ')'가 오는 문자열에서 가장 긴 균형 잡힌 부분수열을 찾자! 🔗"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔗</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Balanced Subsequences</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2025 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "String = '(' × N + ')' × M. Find the length of the longest balanced bracket subsequence!",
              "문자열 = '(' × N + ')' × M. 가장 긴 균형 괄호 부분수열의 길이를 구해!")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "A balanced bracket string has matching pairs. '(())' is balanced, '(()' is not. A subsequence can skip characters!",
        "균형 괄호 문자열은 쌍이 맞아야 해. '(())'는 균형, '(()'는 아님. 부분수열은 문자를 건너뛸 수 있어!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#f97316", marginBottom: 10 }}>
              {t(E, "Examples", "예시")}
            </div>
            <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono',monospace", lineHeight: 2.2, color: C.text }}>
              <div>N=3, M=2: <span style={{ color: C.accent, fontWeight: 800 }}>"((())"</span></div>
              <div>{t(E, "→ Balanced subseq: ", "→ 균형 부분수열: ")}
                <span style={{ color: C.ok, fontWeight: 800 }}>"(())"</span>
                {t(E, " length = 4", " 길이 = 4")}
              </div>
              <div style={{ marginTop: 8 }}>N=1, M=5: <span style={{ color: C.accent, fontWeight: 800 }}>"())))))"</span></div>
              <div>{t(E, "→ Balanced subseq: ", "→ 균형 부분수열: ")}
                <span style={{ color: C.ok, fontWeight: 800 }}>"()"</span>
                {t(E, " length = 2", " 길이 = 2")}
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Since ALL '(' come before ALL ')', every '(' can be matched with a ')'. We just need enough of each!",
        "모든 '('가 모든 ')' 앞에 오니까, 모든 '('는 ')'와 매칭할 수 있어. 각각 충분히 있기만 하면 돼!"),
      question: t(E,
        "For N=5, M=3, what's the longest balanced subsequence length?",
        "N=5, M=3이면, 가장 긴 균형 부분수열 길이는?"),
      options: ["5", "6", "8", "3"],
      correct: 1,
      explain: t(E,
        "min(5,3) = 3 pairs → 2×3 = 6. We match 3 '(' with 3 ')'!",
        "min(5,3) = 3쌍 → 2×3 = 6. 3개의 '('를 3개의 ')'와 매칭!"),
    },
    {
      type: "input",
      narr: t(E,
        "The answer is simply 2 × min(N, M). Since all opening brackets are before closing ones, we can always match min(N,M) pairs!",
        "답은 간단히 2 × min(N, M). 여는 괄호가 모두 닫는 괄호 앞에 있으니, 항상 min(N,M)쌍을 매칭할 수 있어!"),
      question: t(E, "N=100, M=42. Answer?", "N=100, M=42. 답은?"),
      answer: 84,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 💡 핵심 관찰
   ═══════════════════════════════════════════════════════════════ */
export function makeBalancedCh2(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Why is the answer 2×min(N,M)? Key insight: in '(((...))', every '(' appears before every ')'. So any subset of k '(' and k ')' forms a balanced string!",
        "왜 답이 2×min(N,M)일까? 핵심: '(((...))'에서 모든 '('가 모든 ')' 앞에 와. 그래서 k개의 '('와 k개의 ')'를 아무거나 골라도 균형 문자열이 돼!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.ok, marginBottom: 6 }}>
              {t(E, "💡 Key Insight", "💡 핵심 관찰")}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.8, color: C.text }}>
              {t(E,
                "All '(' are BEFORE all ')' → any k '(' matched with k ')' is automatically balanced! → max k = min(N, M)",
                "모든 '('가 모든 ')' 앞에 → k개의 '('와 k개의 ')'를 매칭하면 자동으로 균형! → 최대 k = min(N, M)")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "What if the string were mixed like '())((' instead of all '(' first? Would the answer still be 2×min(N,M)?",
        "만약 문자열이 '()((' 처럼 섞여있다면? 답이 여전히 2×min(N,M)일까?"),
      question: t(E,
        "For the string '))((' (N=2 open, M=2 close but mixed), is the longest balanced subseq still 4?",
        "문자열 '))((' (N=2 열림, M=2 닫힘이지만 섞임)에서 가장 긴 균형 부분수열이 여전히 4?"),
      options: [
        t(E, "No, it's 0 — can't match any", "아니, 0 — 매칭 불가"),
        t(E, "Yes, still 4", "맞아, 여전히 4"),
        t(E, "It's 2", "2야"),
      ],
      correct: 0,
      explain: t(E,
        "'))((': all ')' come first! No '(' is before any ')' so no matching possible. The ORDER matters — our problem guarantees all '(' first!",
        "'))((': 모든 ')'가 먼저 와! '('가 ')' 앞에 없어서 매칭 불가. 순서가 중요해 — 우리 문제는 모든 '('가 먼저!"),
    },
    {
      type: "input",
      narr: t(E,
        "N=0, M=100. All closing brackets, no opening ones. Answer?",
        "N=0, M=100. 닫는 괄호만, 여는 괄호 없음. 답은?"),
      question: t(E, "2 × min(0, 100) = ?", "2 × min(0, 100) = ?"),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드
   ═══════════════════════════════════════════════════════════════ */
export function makeBalancedCh3(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "The code is beautifully simple — just print 2 × min(N, M) for each test case. O(1) per query!",
        "코드가 아름답게 간단해 — 테스트 케이스마다 2 × min(N, M)만 출력. 쿼리당 O(1)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#f97316", marginBottom: 8 }}>
            {t(E, "⏱️ Complexity", "⏱️ 복잡도")}
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>
            O(1)
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>
            {t(E, "per test case! Just min + multiply", "테스트 케이스당! min + 곱셈만")}
          </div>
        </div>),
    },
    {
      type: "code",
      narr: t(E,
        "The simplest USACO solution you'll ever see! 😄",
        "가장 간단한 USACO 솔루션! 😄"),
      label: t(E, "💻 Complete Solution", "💻 전체 솔루션"),
      code: SOLUTION_CODE,
    },
  ];
}
