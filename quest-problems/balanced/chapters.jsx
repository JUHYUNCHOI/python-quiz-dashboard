import { C, t } from "@/components/quest/theme";
import { getBalancedSections } from "./components";

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
        "Given N opening brackets followed by M closing brackets — find the longest balanced subsequence we can pull out.",
        "N개의 여는 괄호 뒤에 M개의 닫는 괄호 — 그 안에서 뽑아낼 수 있는 가장 긴 균형 부분수열을 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔗</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Balanced Subsequences</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>Bronze warm-up</div>
          </div>

          {/* 🎯 Mission box — what the student must figure out on this quest */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7c2d12", lineHeight: 1.5 }}>
              {t(E,
                "Given N opening brackets followed by M closing brackets, find the LONGEST balanced subsequence length.",
                "여는 괄호 N 개 + 닫는 괄호 M 개 — 그 안에서 만들 수 있는 가장 긴 균형 부분수열의 길이.")}
            </div>
          </div>

          {/* Problem — bullet facts */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You're given a string: N copies of ", "주어지는 문자열: ")}
                  <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontWeight: 600 }}>(</code>
                  {t(E, " followed by M copies of ", " N개 + ")}
                  <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontWeight: 600 }}>)</code>
                  {t(E, ".", " M개. (모든 여는 괄호 → 모든 닫는 괄호 순서)")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#f97316" }}>{t(E, "subsequence", "부분수열")}</b>
                  {t(E, " keeps some characters in order — you can ", "은 원래 순서를 유지하며 ")}
                  <b>{t(E, "skip", "건너뛰기")}</b>
                  {t(E, " any.", " 가능.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A string is ", "문자열이 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "balanced", "균형")}</b>
                  {t(E, " if every ", "이려면 모든 ")}
                  <code>(</code>
                  {t(E, " has a matching ", "에 짝이 되는 ")}
                  <code>)</code>
                  {t(E, " AFTER it. e.g. ", "이 뒤에 있어야 해요. 예: ")}
                  <code style={{ background: "#dcfce7", padding: "1px 5px", borderRadius: 3, color: "#15803d", fontWeight: 600 }}>{`(())`}</code>{" "}
                  {t(E, "balanced, ", "균형, ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 3, color: "#991b1b", fontWeight: 600 }}>{`(()`}</code>{" "}
                  {t(E, "not.", "아님.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Find the LENGTH of the longest balanced subsequence you can form.",
                        "이 문자열에서 만들 수 있는 가장 긴 균형 부분수열의 길이를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    /* [승] — Sample input/output format */
    {
      type: "reveal",
      narr: t(E,
        "Input: T test cases. Each is one line of N M. Output: one line per test case.",
        "입력: T 개 케이스. 한 케이스는 N M 한 줄. 출력: 케이스마다 한 줄."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.55, color: "#7c2d12", whiteSpace: "pre" }}>
{`3
5 3
1 5
100 42`}
              </div>
              <div style={{ fontSize: 10.5, color: "#9a3412", marginTop: 6, lineHeight: 1.5 }}>
                {t(E, "Line 1: T = 3 cases. Then T lines of 'N M'.", "1 줄: T = 3 케이스. 그 다음 T 줄에 'N M'.")}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.55, color: "#166534", whiteSpace: "pre" }}>
{`6
2
84`}
              </div>
              <div style={{ fontSize: 10.5, color: "#15803d", marginTop: 6, lineHeight: 1.5 }}>
                {t(E, "One length per test case.", "케이스마다 균형 부분수열 길이 한 줄.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center" }}>
            {t(E, "→ The next page walks through how the first answer (6) actually comes out.",
                  "→ 다음 페이지에서 첫 답 (6) 이 어떻게 나오는지 자세히 봐요.")}
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Two worked cases — see which brackets find a partner and which don't.",
        "두 케이스 따라가 봐 — 어떤 괄호가 짝을 찾고 어떤 게 못 찾는지."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Two side-by-side example cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {[
              { N: 3, M: 2, matched: [1, 2, 3, 4], len: 4 },     // ((()) — match indices 1,2 with 3,4
              { N: 1, M: 5, matched: [0, 1], len: 2 },           // ()))))) — match index 0 with 1
            ].map((ex, i) => {
              const chars = "(".repeat(ex.N) + ")".repeat(ex.M);
              const matchedSet = new Set(ex.matched);
              return (
                <div key={i} style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#9a3412", marginBottom: 8, textAlign: "center" }}>
                    N={ex.N}, M={ex.M}
                  </div>
                  {/* Bracket visualization */}
                  <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 8 }}>
                    {chars.split("").map((ch, idx) => {
                      const isMatched = matchedSet.has(idx);
                      const isOpen = ch === "(";
                      return (
                        <div key={idx} style={{
                          width: 22, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                          borderRadius: 5, fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                          background: isMatched ? (isOpen ? "#fef3c7" : "#dbeafe") : "#f3f4f6",
                          border: `1px solid ${isMatched ? (isOpen ? "#f59e0b" : "#3b82f6") : "#cbd5e1"}`,
                          color: isMatched ? (isOpen ? "#92400e" : "#1e3a8a") : "#9ca3af",
                        }}>{ch}</div>
                      );
                    })}
                  </div>
                  {/* Result */}
                  <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 4 }}>
                    {t(E, `matched = ${ex.matched.length} brackets`, `매칭 = ${ex.matched.length}개`)}
                  </div>
                  <div style={{ textAlign: "center", fontSize: 14, fontWeight: 700, color: "#16a34a", fontFamily: "'JetBrains Mono',monospace" }}>
                    {t(E, `length = ${ex.len}`, `길이 = ${ex.len}`)}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center" }}>
            {t(E, "🟡 = matched '('  ·  🔵 = matched ')'  ·  ⬜ = leftover (skipped)",
                  "🟡 = 매칭된 '('  ·  🔵 = 매칭된 ')'  ·  ⬜ = 남는 것 (건너뜀)")}
          </div>
        </div>),
    },
    {
      type: "auditSim",
      narr: t(E,
        "Your turn — tap brackets to skip them and audit the subsequence yourself.\nCan you make a balanced one as long as possible?",
        "직접 — 괄호 탭해서 건너뛰고 부분수열을 감사해 봐.\n가장 긴 균형 부분수열을 만들 수 있어?"),
    },
    {
      type: "quiz",
      narr: t(E,
        "Try this — sketch out the brackets in your head and count how many pairs you can really form.",
        "직접 — 머릿속에 괄호 그려보고 실제로 몇 쌍이 만들어지는지 세 봐."),
      question: t(E,
        "For N=5, M=3, what's the longest balanced subsequence length?",
        "N=5, M=3이면, 가장 긴 균형 부분수열 길이는?"),
      options: ["5", "6", "8", "3"],
      correct: 1,
      explain: t(E,
        "5 '(' but only 3 ')' → can pair only 3 of each = 3 pairs = 6 characters total.",
        "'(' 5 개 인데 ')' 는 3 개 → 3 쌍밖에 못 만들어요. 3 쌍 × 2 = 6 글자."),
    },
    {
      type: "input",
      narr: t(E,
        "Same idea on a bigger case. Which side runs out first?",
        "같은 아이디어 더 큰 케이스. 어느 쪽이 먼저 떨어져?"),
      question: t(E, "N=100, M=42. Answer?", "N=100, M=42. 답은?"),
      hint: t(E,
        "The shorter side limits the pair count.",
        "짧은 쪽이 쌍 개수의 한계."),
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
        "Look at the two cases below. Which brackets get a partner — and which get left over?",
        "아래 두 케이스 봐. 어떤 괄호가 짝을 찾고 — 어떤 게 남아?"),
      content: (
        <div style={{ padding: 16 }}>
          {/* Bottleneck visualization: 2 cases */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {[
              { N: 5, M: 3, label: t(E, "More '(' than ')'", "'(' 가 ')' 보다 많음") },
              { N: 2, M: 6, label: t(E, "More ')' than '('", "')' 가 '(' 보다 많음") },
            ].map((ex, i) => {
              const pairs = Math.min(ex.N, ex.M);
              return (
                <div key={i} style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", textAlign: "center", marginBottom: 6 }}>
                    N={ex.N}, M={ex.M}
                  </div>
                  {/* opens row */}
                  <div style={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: 4 }}>
                    {Array.from({ length: ex.N }).map((_, j) => {
                      const matched = j >= ex.N - pairs;
                      return (
                        <div key={`o${j}`} style={{
                          width: 18, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
                          borderRadius: 4, fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                          background: matched ? "#fef3c7" : "#f3f4f6",
                          border: `1.5px solid ${matched ? "#f59e0b" : "#cbd5e1"}`,
                          color: matched ? "#92400e" : "#9ca3af",
                        }}>(</div>
                      );
                    })}
                  </div>
                  {/* closes row */}
                  <div style={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: 6 }}>
                    {Array.from({ length: ex.M }).map((_, j) => {
                      const matched = j < pairs;
                      return (
                        <div key={`c${j}`} style={{
                          width: 18, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
                          borderRadius: 4, fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                          background: matched ? "#dbeafe" : "#f3f4f6",
                          border: `1.5px solid ${matched ? "#3b82f6" : "#cbd5e1"}`,
                          color: matched ? "#1e3a8a" : "#9ca3af",
                        }}>)</div>
                      );
                    })}
                  </div>
                  <div style={{ textAlign: "center", fontSize: 10, color: "#9a3412", marginTop: 2 }}>
                    {ex.label}
                  </div>
                  <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "#16a34a", marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>
                    pairs = min({ex.N},{ex.M}) = {pairs}<br/>
                    <span style={{ fontSize: 15 }}>length = {2 * pairs}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center" }}>
            {t(E, "Greyed = leftover (no partner)", "회색 = 남는 것 (짝 없음)")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "What if the string were mixed like '())((' instead of all '(' first?\nWould the answer still be 2×min(N,M)?", "만약 문자열이 '()((' 처럼 섞여있다면? 답이 여전히 2×min(N,M)일까요?"),
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
        "'))((': 모든 ')'가 먼저 와요! '('가 ')' 앞에 없어서 매칭 불가. 순서가 중요해 — 우리 문제는 모든 '('가 먼저!"),
    },
    {
      type: "input",
      narr: t(E,
        "N=0, M=100. All closing brackets, no opening ones. Answer?", "N=0, M=100. 닫는 괄호만, 여는 괄호 없음. 답은?"),
      question: t(E, "2 × min(0, 100) = ?", "2 × min(0, 100) = ?"),
      answer: 0,
    },
    {
      type: "sim",
      narr: t(E,
        "Try different (N, M).\nColoured brackets show which ones get matched.\nGreyed-out are leftovers.", "다양한 (N, M) 시도. 색깔 괄호 = 매칭됨. 회색 = 남는 것."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드
   ═══════════════════════════════════════════════════════════════ */
export function makeBalancedCh3(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Read T, then for each test case read N, M and print 2 × min(N, M). Sections build it line by line.",
        "T 읽고, 매 케이스마다 N, M 받아 2 × min(N, M) 출력. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getBalancedSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Run it on your own test cases. Format: T on line 1, then T lines of 'N M'.",
        "직접 테스트 — 1 줄에 T, 그 다음 T 줄에 'N M'."),
    },
  ];
}
