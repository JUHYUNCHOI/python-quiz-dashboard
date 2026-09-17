import { C, t } from "@/components/quest/theme";
import { CodeWalk } from "@/components/quest/CodeWalk";

// CodeWalk 코드 — 설명은 코드 주석 대신 '밝아진 줄 위 말풍선' 으로 (선생님 스타일).
const BAL_WALK_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N, M = map(int, input().split())",
  "    print(2 * min(N, M))",
];
const BAL_WALK_CPP = [
  "#include <iostream>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int tc = 0; tc < T; tc++) {",
  "        long long N, M;",
  "        cin >> N >> M;",
  "        cout << 2 * min(N, M) << endl;",
  "    }",
  "    return 0;",
  "}",
];
function getBalancedWalk(E, lang) {
  if (lang === "cpp") {
    return { code: BAL_WALK_CPP, beats: [
      { hi: [5, 6],   bubble: t(E, "Read T — how many test cases.", "풀 문제가 몇 개인지 T 를 읽어요.") },
      { hi: [7, 7],   bubble: t(E, "Repeat for each test case.", "문제 하나마다 이걸 반복해요.") },
      { hi: [8, 9],   bubble: t(E, "Read N (open '(') and M (close ')').  long long — the answer can get big.", "여는 괄호 수 N 과 닫는 괄호 수 M 을 읽어요.\n답이 커질 수 있어서 long long 으로 받아요.") },
      { hi: [10, 10], bubble: t(E, "Pairs = the smaller side = min(N,M). Each pair = 2 chars → print 2 × min(N,M).", "짝은 적은 쪽만큼만 만들 수 있으니 min(N,M) 개예요.\n한 짝이 글자 2 개라서 2 × min(N,M) 을 출력해요.") },
    ] };
  }
  return { code: BAL_WALK_PY, beats: [
    { hi: [0, 1], bubble: t(E, "Fast input (there can be many test cases).", "문제가 많을 수 있어서 입력을 빠르게 받아요.") },
    { hi: [3, 3], bubble: t(E, "Read T — how many test cases.", "풀 문제가 몇 개인지 T 를 읽어요.") },
    { hi: [4, 4], bubble: t(E, "Repeat for each test case.", "문제 하나마다 이걸 반복해요.") },
    { hi: [5, 5], bubble: t(E, "Read N (open '(') and M (close ')').", "여는 괄호 수 N 과 닫는 괄호 수 M 을 읽어요.") },
    { hi: [6, 6], bubble: t(E, "Pairs = the smaller side = min(N,M). Each pair = 2 chars → print 2 × min(N,M).", "짝은 적은 쪽만큼만 만들 수 있으니 min(N,M) 개예요.\n한 짝이 글자 2 개라서 2 × min(N,M) 을 출력해요.") },
  ] };
}

/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makeBalancedCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Given N opening brackets followed by M closing brackets — find the longest balanced subsequence we can pull out.",
        "여는 괄호와 닫는 괄호로 짝을 최대 몇 개 만들 수 있을까요?"),
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
                "여는 괄호 N 개 뒤에 닫는 괄호 M 개가 붙어 있어요. 여기서 만들 수 있는 가장 긴 균형 부분수열의 길이를 출력해요.")}
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
                  {t(E, " keeps some characters in order — you can ", "은 원래 순서를 그대로 두고 아무 글자나 ")}
                  <b>{t(E, "skip", "건너뛴")}</b>
                  {t(E, " any.", " 것이에요.")}
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
                  {t(E, "balanced, ", "는 균형이고, ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 3, color: "#991b1b", fontWeight: 600 }}>{`(()`}</code>{" "}
                  {t(E, "not.", "는 아니에요.")}
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
        "문제 하나가 N M 한 줄이고, 답도 한 줄씩 내보내요."),
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
                {t(E, "Line 1: T = 3 cases. Then T lines of 'N M'.", "첫 줄의 T = 3 은 문제가 세 개라는 뜻이에요. 그 아래 세 줄이 'N M' 이에요.")}
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
                {t(E, "One length per test case.", "문제마다 균형 부분수열의 길이를 한 줄씩 적어요.")}
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
        "괄호를 눌러 건너뛰면서 가장 긴 균형을 만들어 봐요."),
    },
    {
      type: "quiz",
      narr: t(E,
        "Try this — sketch out the brackets in your head and count how many pairs you can really form.",
        "괄호를 그려 보고 몇 쌍이 만들어지는지 세어 봐요."),
      question: t(E,
        "For N=5, M=3, what's the longest balanced subsequence length?",
        "N=5, M=3 이면 가장 긴 균형 부분수열의 길이는 얼마일까요?"),
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
        "같은 생각으로 더 큰 수를 풀어 봐요. 어느 쪽이 먼저 모자랄까요?"),
      question: t(E, "N=100, M=42. Answer?", "N=100, M=42 일 때 답은 얼마일까요?"),
      hint: t(E,
        "The shorter side limits the pair count.",
        "적은 쪽 개수만큼만 짝을 지을 수 있어요."),
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
        "어떤 괄호가 짝을 찾고 어떤 괄호가 남는지 볼게요."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Bottleneck visualization: 2 cases */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {[
              { N: 5, M: 3, label: t(E, "More '(' than ')'", "'(' 가 ')' 보다 많아요") },
              { N: 2, M: 6, label: t(E, "More ')' than '('", "')' 가 '(' 보다 많아요") },
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
        "What if the string were mixed like '))((' instead of all '(' first?\nWould the answer still be 2×min(N,M)?", "'(' 가 먼저 오지 않고 '))((' 처럼 섞여 있다면 어떨까요?"),
      question: t(E,
        "For the string '))((' (N=2 open, M=2 close but mixed), is the longest balanced subseq still 4?",
        "'))((' 은 여는 괄호 2 개, 닫는 괄호 2 개예요. 가장 긴 균형 부분수열이 그래도 4 일까요?"),
      options: [
        t(E, "No, it's 0 — can't match any", "아니에요, 0 이에요. 짝을 하나도 못 지어요"),
        t(E, "Yes, still 4", "맞아요, 그래도 4 예요"),
        t(E, "It's 2", "2 예요"),
      ],
      correct: 0,
      explain: t(E,
        "'))((': all ')' come first! No '(' is before any ')' so no matching possible. The ORDER matters — our problem guarantees all '(' first!",
        "'))((' 은 ')' 가 먼저 나와요. 짝이 되려면 '(' 가 ')' 앞에 있어야 하는데 그런 자리가 없어요. 그래서 순서가 중요해요. 우리 문제는 '(' 가 모두 앞에 있어요."),
    },
    {
      type: "input",
      narr: t(E,
        "N=0, M=100. All closing brackets, no opening ones. Answer?", "여는 괄호가 하나도 없고 닫는 괄호만 100 개예요."),
      question: t(E, "2 × min(0, 100) = ?", "2 × min(0, 100) = ?"),
      answer: 0,
    },
    {
      type: "sim",
      narr: t(E,
        "Try different (N, M).\nColoured brackets show which ones get matched.\nGreyed-out are leftovers.", "(N, M) 을 바꿔 가며 어떤 괄호가 짝을 찾는지 봐요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드
   ═══════════════════════════════════════════════════════════════ */
export function makeBalancedCh3(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "The whole solution is short — each part lights up with a note right above it.",
        "풀이가 짧아요. 줄마다 설명 말풍선이 붙어 있어요."),
      content: (() => {
        const w = getBalancedWalk(E, lang);
        return <CodeWalk E={E} lang={lang} code={w.code} beats={w.beats} accent="#f97316" />;
      })(),
    },
    {
      type: "runner",
      narr: t(E,
        "Run it on your own test cases. Format: T on line 1, then T lines of 'N M'.",
        "직접 넣어 봐요. 첫 줄에 T, 그 아래 T 줄에 'N M' 이에요."),
    },
  ];
}
