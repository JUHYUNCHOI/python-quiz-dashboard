import { C, t } from "@/components/quest/theme";
import { getFeb23Sections, Feb23DeepAuditSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeFebCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "If each F becomes B or E, how many distinct excitement values are possible?",
        "F 를 B 나 E 로 바꿔 보면 흥분도는 몇 가지가 될까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔤</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>FEB</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2023 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E, "Print 3 lines: count of distinct excitement values, then min, then max — across all F-assignments.",
                    "F 를 정하는 모든 방법에서 나오는 흥분도를 모아요. 서로 다른 값의 개수, 최솟값, 최댓값을 세 줄로 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie's message is a string over ", "Bessie의 메시지는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "{B, E, F}", "{B, E, F}")}</b>
                  {t(E, ".", " 문자열이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "첫 줄에 N, 둘째 줄에 길이 N 인 문자열이 들어와요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7f1d1d" }}>
                <div>4 <span style={{ fontSize: 10.5, color: "#7f1d1d", opacity: 0.65 }}>← {t(E, "N (message length)", "N (메시지 길이)")}</span></div>
                <div>BEEF <span style={{ fontSize: 10.5, color: "#7f1d1d", opacity: 0.65 }}>← {t(E, "the message", "메시지")}</span></div>
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534" }}>
                <div>2 <span style={{ fontSize: 10.5, color: "#166534", opacity: 0.65 }}>← {t(E, "distinct values count", "서로 다른 값 개수")}</span></div>
                <div>1 <span style={{ fontSize: 10.5, color: "#166534", opacity: 0.65 }}>← {t(E, "min", "최솟값")}</span></div>
                <div>2 <span style={{ fontSize: 10.5, color: "#166534", opacity: 0.65 }}>← {t(E, "max", "최댓값")}</span></div>
              </div>
            </div>
          </div>
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>
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
        "The excitement level is the number of positions where adjacent characters are the same.\nFor example, 'BEEB' has 1 pair (E,E at positions 2-3).", "흥분도는 옆에 붙은 두 글자가 같은 자리의 개수예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#dc2626", marginBottom: 10 }}>
              {t(E, "Example: BEEB", "예시: BEEB")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 8 }}>
              {["B","E","E","B"].map((ch, i) => (
                <div key={i} style={{
                  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 600,
                  background: ch === "B" ? "#dbeafe" : "#dcfce7",
                  border: `1.5px solid ${ch === "B" ? "#93c5fd" : "#86efac"}`,
                  color: ch === "B" ? "#1d4ed8" : "#166534",
                }}>{ch}</div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "#059669" }}>
              {t(E, "Pairs: B≠E (different), E=E (same) ✅, E≠B (different) → excitement = 1", "쌍: B≠E(다른 글자), E=E(같은 글자) ✅, E≠B(다른 글자) → 흥분도 = 1")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Let's think about 'BEEF'.\nIf F→B, we get 'BEEB' (excitement 1).\nIf F→E, we get 'BEEE' (excitement 2).\nGot it?", "'BEEF' 의 F 를 E 로 바꾸면 'BEEE' 가 돼요."),
      question: t(E, "What is the excitement of 'BEEE'?", "'BEEE'의 흥분도는?"),
      hint: t(E, "Count consecutive same pairs: B≠E, E=E, E=E", "옆끼리 같은지 하나씩 세어 봐요. B≠E, E=E, E=E"),
      options: ["1", "2", "3"],
      correct: 1,
      explain: t(E, "B≠E, E=E ✅, E=E ✅ → 2 pairs!", "B≠E, E=E ✅, E=E ✅ → 2쌍!"),
    },
    {
      type: "input",
      narr: t(E,
        "Now try this: for the string 'BF', F can be B or E.\nIf F→B: 'BB' has 1 match.\nIf F→E: 'BE' has 0 matches.\nHow many distinct excitement levels?", "'BF' 의 F 는 B 도 될 수 있고 E 도 될 수 있어요."),
      question: t(E, "How many possible excitement levels for 'BF'?", "'BF'의 가능한 흥분도 개수는?"),
      hint: t(E, "Compute excitement for each F choice, then count how many distinct values appear.", "F 를 B 로 둘 때와 E 로 둘 때의 흥분도를 각각 구해 봐요."),
      answer: 2,
    },
    {
      type: "reveal",
      narr: t(E,
        "The key insight: try every way to fill in the F's with B or E, compute excitement for each, then count distinct values!", "F 를 정하는 모든 방법을 다 해 보고 흥분도를 모아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#dc2626", marginBottom: 10 }}>
              {t(E, "Algorithm", "알고리즘")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2, whiteSpace: "pre-line" }}>
              {t(E,
                "1. Find all F positions\n2. Try every B/E combination for those F's\n3. For each, count consecutive same pairs\n4. Collect distinct excitement values\n5. Answer = size of that set",
                "1. F 가 어디에 있는지 찾아요\n2. F 자리마다 B 또는 E 로 채우는 모든 조합을 다 해 봐요\n3. 각각에서 옆끼리 같은 쌍을 세어요\n4. 나온 흥분도를 모아요\n5. 답은 집합의 크기예요")}
            </div>
          </div>
        </div>),
    },
    // Hands-on: enumerate all F-assignments and watch the distinct set form
    {
      type: "reveal",
      narr: t(E,
        "Flip each F yourself and watch the excitement value change.",
        "F 를 직접 바꿔 보면서 흥분도가 어떻게 변하는지 봐요."),
      content: (
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#dc2626", textAlign: "center", marginBottom: 6 }}>
            🔍 {t(E, "Deep Audit — try every F-assignment", "심층 점검 — 모든 F 할당 펼쳐 보기")}
          </div>
          <Feb23DeepAuditSim E={E} />
        </div>),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeFebCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Build the code piece by piece to count every case.",
        "코드를 한 단락씩 쌓으면서 모든 경우를 세어 볼게요."),
      sections: getFeb23Sections(E),
    },
    {
      type: "quiz",
      narr: t(E,
        "Quick check: what data structure do we use to collect distinct excitement levels?", "서로 다른 흥분도를 모으려면 무엇을 쓰면 좋을까요?"),
      question: t(E, "Which data structure collects distinct values?", "서로 다른 값을 모으는 자료구조는?"),
      options: [t(E, "List", "리스트"), t(E, "Set", "집합"), t(E, "Dictionary", "딕셔너리")],
      correct: 1,
      explain: t(E, "A set automatically removes duplicates!", "집합은 자동으로 중복을 제거해요!"),
    },
    {
      type: "input",
      narr: t(E,
        "If the string has 3 F's, how many total assignments do we try?", "문자열에 F 가 3 개면 몇 가지를 해 봐야 할까요?"),
      question: t(E, "2^3 = ?", "2^3 = ?"),
      hint: t(E, "Each F has 2 choices: B or E", "F 하나마다 B 아니면 E, 두 가지예요."),
      answer: 8,
    },
  ];
}
