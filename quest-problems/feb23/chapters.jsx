import { C, t } from "@/components/quest/theme";
import { getFeb23Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0])      # length of the string",
  "s = data[1]           # the message itself",
  "",
  "# Find positions of every 'F' wildcard",
  "f_positions = [i for i, c in enumerate(s) if c == 'F']",
  "n_f = len(f_positions)",
  "",
  "# Try all 2^|F| ways to fill F's with B or E",
  "results = set()",
  "for mask in range(1 << n_f):",
  "    arr = list(s)",
  "    for j in range(n_f):",
  "        arr[f_positions[j]] = 'B' if (mask >> j) & 1 else 'E'",
  "    # excitement = count of adjacent same-letter pairs",
  "    excitement = 0",
  "    for i in range(len(arr) - 1):",
  "        if arr[i] == arr[i + 1]:",
  "            excitement += 1",
  "    results.add(excitement)",
  "",
  "# Output: count of distinct excitement values, then min, then max.",
  "print(len(results))",
  "print(min(results))",
  "print(max(results))",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeFebCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Bessie texts using only the letters B, E, and F. The 'excitement' of a message is the number of adjacent same-letter pairs (e.g., BBE has 1: the BB). Each F is a wildcard — it can become either B or E.\nFor a given message, print how many DISTINCT excitement values are possible across all ways of assigning F's.",
        "Bessie는 B, E, F 만 사용해 문자를 보내요. 메시지의 '흥분도' 는 인접한 같은 글자 쌍의 수예요 (예: BBE 의 흥분도는 1, BB 부분). 각 F 는 와일드카드 — B 또는 E 어느 쪽으로든 결정될 수 있어요.\n주어진 메시지에 대해 F 들의 모든 결정 방식에 걸쳐 만들어질 수 있는 서로 다른 흥분도 값의 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔤</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>FEB</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2023 Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie's message is a string over ", "Bessie의 메시지는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "{B, E, F}", "{B, E, F}")}</b>
                  {t(E, ".", " 문자열이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The ", "메시지의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "excitement", "흥분도")}</b>
                  {t(E, " is the number of ", " 는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "adjacent same-letter pairs", "인접한 같은 글자 쌍의 수")}</b>
                  {t(E, " (e.g., ", " (예: ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>BBE</code>
                  {t(E, " → 1).", " → 1).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each ", "")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>F</code>
                  {t(E, " is a ", " 은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "wildcard", "와일드카드")}</b>
                  {t(E, " — independently chooses to be B or E.",
                        " — 각자 B 또는 E 가 될 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Output 3 lines: ", "출력 3 줄: ")}
                  <b style={{ color: "#15803d" }}>{t(E, "count of distinct excitement values, then min, then max",
                                                            "서로 다른 흥분도 값의 개수, 그 다음 최솟값, 최댓값")}</b>
                  {t(E, " across all F-assignments.", " — 모든 F 결정 방식 기준.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input: N on line 1, string of length N on line 2.  Output: 3 lines (count, min, max).",
        "입력: 1 줄에 N, 2 줄에 길이 N 문자열. 출력: 3 줄 (개수, 최솟값, 최댓값)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fee2e2", border: "2px solid #fca5a5", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#7f1d1d", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7f1d1d", whiteSpace: "pre" }}>
{`4
BEEF`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`2
1
2`}
              </div>
            </div>
          </div>
          <div style={{ background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#7f1d1d", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — 'BEEF' has one F", "풀이 — 'BEEF' 의 F 한 개")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "F → B: 'BEEB' → adjacent (E,E) ✓ → excitement 1.",
                    "F → B: 'BEEB' → 인접 (E,E) ✓ → 흥분도 1.")}
              <br/>
              {t(E, "F → E: 'BEEE' → adjacent (E,E)(E,E) ✓✓ → excitement 2.",
                    "F → E: 'BEEE' → 인접 (E,E)(E,E) ✓✓ → 흥분도 2.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "Distinct values {1, 2} → count=2, min=1, max=2.",
                    "서로 다른 값 {1, 2} → 개수=2, 최솟=1, 최댓=2.")}
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "The excitement level is the number of positions where adjacent characters are the same.\nFor example, 'BEEB' has 1 pair (E,E at positions 2-3).", "흥분도는 인접한 문자가 같은 위치의 수예요. 예를 들어 'BEEB'은 1쌍 (위치 2-3의 E,E)이 있어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>
              {t(E, "Example: BEEB", "예시: BEEB")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 8 }}>
              {["B","E","E","B"].map((ch, i) => (
                <div key={i} style={{
                  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 800,
                  background: ch === "B" ? "#dbeafe" : "#dcfce7",
                  border: `2.5px solid ${ch === "B" ? "#93c5fd" : "#86efac"}`,
                  color: ch === "B" ? "#1d4ed8" : "#166534",
                }}>{ch}</div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "#059669" }}>
              {t(E, "Pairs: B≠E, E=E ✅, E≠B → excitement = 1", "쌍: B≠E, E=E ✅, E≠B → 흥분도 = 1")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Let's think about 'BEEF'.\nIf F→B, we get 'BEEB' (excitement 1).\nIf F→E, we get 'BEEE' (excitement 2).\nGot it?", "'BEEF'를 생각해보자. F→B이면 'BEEB' (흥분도 1). F→E이면 'BEEE' (흥분도 2). 이해했지?"),
      question: t(E, "What is the excitement of 'BEEE'?", "'BEEE'의 흥분도는?"),
      hint: t(E, "Count consecutive same pairs: B≠E, E=E, E=E", "연속 같은 쌍 세기: B≠E, E=E, E=E"),
      options: ["1", "2", "3"],
      correct: 1,
      explain: t(E, "B≠E, E=E ✅, E=E ✅ → 2 pairs!", "B≠E, E=E ✅, E=E ✅ → 2쌍!"),
    },
    {
      type: "input",
      narr: t(E,
        "Now try this: for the string 'BF', F can be B or E.\nIf F→B: 'BB' has 1 match.\nIf F→E: 'BE' has 0 matches.\nHow many distinct excitement levels?", "이제 해보자: 문자열 'BF'에서 F는 B 또는 E. F→B: 'BB'는 1쌍. F→E: 'BE'는 0쌍. 서로 다른 흥분도는 몇 개?"),
      question: t(E, "How many possible excitement levels for 'BF'?", "'BF'의 가능한 흥분도 개수는?"),
      hint: t(E, "F→B gives 1, F→E gives 0. Two distinct values!", "F→B는 1, F→E는 0. 서로 다른 값 2개!"),
      answer: 2,
    },
    {
      type: "reveal",
      narr: t(E,
        "The key insight: try all possible F assignments (2^count_of_F), compute excitement for each, then count distinct values!", "핵심: 가능한 모든 F 할당(2^F개수)을 시도하고, 각각의 흥분도를 계산한 후, 서로 다른 값의 개수를 세!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>
              {t(E, "Algorithm", "알고리즘")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2, whiteSpace: "pre-line" }}>
              {t(E,
                "1. Find all F positions\n2. Try all 2^abs(F) assignments (B or E)\n3. For each, count consecutive same pairs\n4. Collect distinct excitement values\n5. Answer = size of that set",
                "1. F 위치 찾기\n2. 모든 2^abs(F) 할당 시도 (B 또는 E)\n3. 각각에서 연속 같은 쌍 세기\n4. 서로 다른 흥분도 모으기\n5. 답 = 집합의 크기")}
            </div>
          </div>
        </div>),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeFebCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "An F can be B or E independently — but the excitement only depends on adjacent comparisons. So we DP: track distinct possible (last_letter, excitement_so_far) states as we scan left to right.",
        "F 는 B 또는 E 가 될 수 있고 — 흥분도는 인접한 비교에만 의존. 그래서 DP: 왼쪽부터 스캔하며 가능한 (마지막 글자, 누적 흥분도) 상태를 추적."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Initialize state set with first letter", "첫 글자로 상태 집합 초기화"), code: "states = {('B', 0)} or {('E', 0)} or both for F", color: "#dc2626" },
              { n: 2, label: t(E, "Scan letters i = 1..N-1", "i = 1..N-1 글자 스캔"), code: "for i in range(1, N): new_states = set()", color: "#7c3aed" },
              { n: 3, label: t(E, "For each (prev, ex), try B and E", "각 (prev, ex) 에 B, E 시도"), code: "for letter in possible_letters(s[i]): new_ex = ex + (letter == prev)", color: "#0891b2" },
              { n: 4, label: t(E, "Count distinct excitement values", "서로 다른 흥분도 개수 출력"), code: "print(len({ex for (_, ex) in states}))", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(N²)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N positions × O(N) excitement values", "N 위치 × O(N) 흥분도 값")}</div>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getFeb23Sections(E),
    },
    {
      type: "quiz",
      narr: t(E,
        "Quick check: what data structure do we use to collect distinct excitement levels?", "퀴즈: 서로 다른 흥분도를 모으는 데 어떤 자료구조를 쓸까?"),
      question: t(E, "Which data structure collects distinct values?", "서로 다른 값을 모으는 자료구조는?"),
      options: [t(E, "List", "리스트"), t(E, "Set", "집합"), t(E, "Dictionary", "딕셔너리")],
      correct: 1,
      explain: t(E, "A set automatically removes duplicates!", "집합은 자동으로 중복을 제거해요!"),
    },
    {
      type: "input",
      narr: t(E,
        "If the string has 3 F's, how many total assignments do we try?", "문자열에 F가 3개면, 총 몇 가지 할당을 시도할까?"),
      question: t(E, "2^3 = ?", "2^3 = ?"),
      hint: t(E, "Each F has 2 choices: B or E", "각 F는 2가지 선택: B 또는 E"),
      answer: 8,
    },
  ];
}
