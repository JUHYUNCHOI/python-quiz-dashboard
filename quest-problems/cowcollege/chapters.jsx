import { C, t } from "@/components/quest/theme";
import { getCowCollegeSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "c = list(map(int, input().split()))",
  "",
  "c.sort()",
  "",
  "best_rev = 0",
  "best_tuition = c[0]",
  "",
  "for i in range(N):",
  "    tuition = c[i]",
  "    cows_paying = N - i",
  "    revenue = tuition * cows_paying",
  "    if revenue > best_rev:",
  "        best_rev = revenue",
  "        best_tuition = tuition",
  "",
  "print(best_rev, best_tuition)",
];


/* Helper: code snippet box */
const CodeSnippet = ({ lines, highlight: hl }) => (
  <div style={{
    background: "#1e293b", borderRadius: 10, padding: "10px 8px",
    overflowX: "auto", fontSize: 12, lineHeight: 1.8,
    fontFamily: "'JetBrains Mono', monospace", marginTop: 8,
  }}>
    {lines.map((l, i) => (
      <div key={i} style={{
        display: "flex", minHeight: 20,
        background: hl && hl.includes(i) ? "rgba(217,119,6,.15)" : "transparent",
        borderRadius: 4, padding: "0 4px",
      }}>
        <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
        <span style={{ whiteSpace: "pre", color: hl && hl.includes(i) ? "#fcd34d" : "#e2e8f0" }}>{l}</span>
      </div>
    ))}
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowCollegeCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Farmer John is setting tuition for cow college!\nEach cow has a maximum she can pay.\nSet one price to maximize total revenue.\nLet's figure it out!", "농부 존이 소 대학 등록금을 정해! 각 소가 낼 수 있는 최대 금액이 있어. 하나의 가격을 정해서 총 수입을 최대화해보자!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\uD83C\uDF93"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Cow College</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2022 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N cows, each with a max tuition. Set ONE tuition price. Revenue = price x (cows who can afford it). Maximize revenue!",
              "N마리의 소, 각각 최대 등록금. 등록금을 하나로 정해. 수입 = 가격 x (지불 가능한 소 수). 수입 최대화!")}
          </div>
        </div>),
    },
    // 1-2: Visual — cows with max tuition as bar chart
    {
      type: "reveal",
      narr: t(E,
        "Let's visualize!\nEach cow has a maximum tuition she can pay.\nUnsorted first, then we'll see why sorting helps.", "시각화해보자! 각 소가 낼 수 있는 최대 등록금이 있어. 먼저 정렬 전, 그다음 정렬이 왜 도움되는지 보자."),
      content: (() => {
        const unsorted = [6, 1, 6, 4];
        const colors = ["#d97706", "#059669", "#7c3aed", "#dc2626"];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
              {t(E, "4 cows with max tuitions", "4마리 소의 최대 등록금")}
            </div>
            {/* Cow icons with values */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 14 }}>
              {unsorted.map((v, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{"\uD83D\uDC2E"}</div>
                  <div style={{
                    width: 44, padding: "4px 0", borderRadius: 8,
                    background: `${colors[i]}20`, border: `2.5px solid ${colors[i]}`,
                    fontSize: 16, fontWeight: 900, color: colors[i],
                    fontFamily: "'JetBrains Mono', monospace", textAlign: "center",
                  }}>${v}</div>
                </div>
              ))}
            </div>
            {/* Revenue idea */}
            <div style={{
              background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 10,
              padding: 10, fontSize: 13, color: C.text, lineHeight: 1.8,
            }}>
              {t(E,
                "If we set tuition = $4, which cows can pay? Those with max >= 4: cows with $6, $6, $4. That's 3 cows. Revenue = 4 x 3 = 12.",
                "등록금 = $4로 정하면 누가 낼 수 있을까? 최대 >= 4인 소: $6, $6, $4. 3마리. 수입 = 4 x 3 = 12.")}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: Why sorting helps — visual
    {
      type: "reveal",
      narr: t(E,
        "If we SORT the tuitions, something magical happens!\nWhen we pick c[i] as tuition, all cows from index i onward can afford it!", "등록금을 정렬하면 마법이 일어나! c[i]를 등록금으로 정하면 인덱스 i부터 끝까지 모든 소가 지불 가능!"),
      content: (() => {
        const sorted = [1, 4, 6, 6];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
              {t(E, "After sorting: [1, 4, 6, 6]", "정렬 후: [1, 4, 6, 6]")}
            </div>
            {/* Sorted bar chart */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, alignItems: "flex-end", marginBottom: 12, height: 100 }}>
              {sorted.map((v, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 42, height: v * 14,
                    background: i >= 1 ? C.ok : "#e5e7eb",
                    border: `2px solid ${i >= 1 ? C.ok : C.dim}`,
                    borderRadius: "6px 6px 0 0",
                    display: "flex", alignItems: "flex-start", justifyContent: "center",
                    paddingTop: 2,
                  }}>
                    <span style={{
                      fontSize: 13, fontWeight: 900, color: i >= 1 ? "#fff" : C.dim,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>${v}</span>
                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 800, color: C.dim, marginTop: 2,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>i={i}</div>
                </div>
              ))}
            </div>
            {/* Explanation */}
            <div style={{
              background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 10,
              padding: 10, fontSize: 12, color: C.text, lineHeight: 1.8,
            }}>
              <div style={{ fontWeight: 800, color: C.ok, marginBottom: 4 }}>
                {t(E, "Tuition = c[1] = $4", "등록금 = c[1] = $4")}
              </div>
              {t(E,
                "Cows from index 1 onward (green bars) can all pay! Count = N - i = 4 - 1 = 3. Revenue = 4 x 3 = 12",
                "인덱스 1부터 끝까지(초록 막대) 모두 지불 가능! 수 = N - i = 4 - 1 = 3. 수입 = 4 x 3 = 12")}
            </div>
          </div>
        );
      })(),
    },
    // 1-4: Quiz — revenue calculation
    {
      type: "quiz",
      narr: t(E,
        "Sorted c = [1, 4, 6, 6].\nIf tuition = 6 (index 2), how many cows pay and what's the revenue?", "정렬된 c = [1, 4, 6, 6]. 등록금 = 6(인덱스 2)이면 몇 마리가 지불하고 수입은?"),
      question: t(E,
        "c = [1, 4, 6, 6]. Tuition = c[2] = 6. Revenue = ?",
        "c = [1, 4, 6, 6]. 등록금 = c[2] = 6. 수입 = ?"),
      options: [
        t(E, "6 x 2 = 12", "6 x 2 = 12"),
        t(E, "6 x 4 = 24", "6 x 4 = 24"),
        t(E, "6 x 1 = 6", "6 x 1 = 6"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Index 2, so cows_paying = N - i = 4 - 2 = 2. Revenue = 6 x 2 = 12.",
        "정답! 인덱스 2이므로 지불하는 소 = N - i = 4 - 2 = 2. 수입 = 6 x 2 = 12."),
    },
    // 1-5: Full revenue table
    {
      type: "reveal",
      narr: t(E,
        "Let's try EVERY possible tuition on sorted c = [1, 4, 6, 6] and see which gives the most revenue!", "정렬된 c = [1, 4, 6, 6]에서 가능한 모든 등록금을 시도해서 어느 것이 최대 수입인지 보자!"),
      content: (() => {
        const rows = [
          { i: 0, t: 1, cows: 4, rev: 4 },
          { i: 1, t: 4, cows: 3, rev: 12 },
          { i: 2, t: 6, cows: 2, rev: 12 },
          { i: 3, t: 6, cows: 1, rev: 6 },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
              {t(E, "Try each c[i] as tuition", "각 c[i]를 등록금으로 시도")}
            </div>
            <div style={{
              borderRadius: 10, overflow: "hidden", border: `2px solid ${C.border}`,
              fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "35px 60px 60px 80px",
                background: "#1e293b", color: "#e2e8f0", padding: "6px 8px", fontWeight: 800,
              }}>
                <span>i</span>
                <span>{t(E, "tuition", "등록금")}</span>
                <span>{t(E, "cows", "소 수")}</span>
                <span>{t(E, "revenue", "수입")}</span>
              </div>
              {rows.map((r, idx) => {
                const best = r.rev === 12;
                return (
                  <div key={idx} style={{
                    display: "grid", gridTemplateColumns: "35px 60px 60px 80px",
                    background: best ? C.okBg : "#fff",
                    padding: "6px 8px", borderBottom: idx < rows.length - 1 ? `1px solid ${C.border}` : "none",
                  }}>
                    <span style={{ color: C.accent, fontWeight: 800 }}>{r.i}</span>
                    <span style={{ color: C.text }}>${r.t}</span>
                    <span style={{ color: C.text }}>N-{r.i}={r.cows}</span>
                    <span style={{ fontWeight: 900, color: best ? C.ok : C.text }}>
                      {r.t}x{r.cows}=<span style={{ fontSize: best ? 16 : 12 }}>{r.rev}</span>
                      {best ? " ★" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{
              marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 900, color: C.ok,
            }}>
              {t(E, "Max revenue = 12 (tuition = $4)", "최대 수입 = 12 (등록금 = $4)")}
            </div>
          </div>
        );
      })(),
    },
    // 1-6: Input practice
    {
      type: "input",
      narr: t(E,
        "c = [1, 2, 3, 4, 5] (already sorted). Try each as tuition. What's the maximum revenue?", "c = [1, 2, 3, 4, 5] (이미 정렬). 각각을 등록금으로 시도해. 최대 수입은?"),
      question: t(E,
        "c = [1, 2, 3, 4, 5]. Max revenue = ?",
        "c = [1, 2, 3, 4, 5]. 최대 수입 = ?"),
      hint: t(E,
        "1x5=5, 2x4=8, 3x3=9, 4x2=8, 5x1=5. Max = 9 at tuition $3.",
        "1x5=5, 2x4=8, 3x3=9, 4x2=8, 5x1=5. 최대 = 9, 등록금 $3."),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 알고리즘 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowCollegeCh2(E) {
  return [
    // 2-1: Algorithm overview
    {
      type: "reveal",
      narr: t(E,
        "The algorithm: Sort the array.\nThen sweep through, trying each c[i] as the tuition.\nCount = N-i.\nTrack maximum revenue.", "알고리즘: 배열 정렬. 그다음 각 c[i]를 등록금으로 시도하며 스윕. 수 = N-i. 최대 수입 추적."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
            {t(E, "Sort + Sweep", "정렬 + 스윕")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { step: "1", desc: t(E, "Sort array c in ascending order", "배열 c를 오름차순 정렬"), icon: "↑" },
              { step: "2", desc: t(E, "For each index i from 0 to N-1", "인덱스 i를 0부터 N-1까지"), icon: "→" },
              { step: "3", desc: t(E, "tuition = c[i], cows = N - i", "등록금 = c[i], 소 수 = N - i"), icon: "=" },
              { step: "4", desc: t(E, "revenue = c[i] x (N - i)", "수입 = c[i] x (N - i)"), icon: "x" },
              { step: "5", desc: t(E, "Track maximum revenue", "최대 수입 추적"), icon: "★" },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#fffbeb", border: "1.5px solid #fcd34d",
                borderRadius: 8, padding: "6px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: "#d97706", color: "#fff", fontSize: 13, fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{s.step}</div>
                <span style={{ fontSize: 12, color: C.text, fontWeight: 700, flex: 1 }}>{s.desc}</span>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
              </div>
            ))}
          </div>
        </div>),
    },
    // 2-2: Trace with larger example
    {
      type: "reveal",
      narr: t(E,
        "Let's trace c = [2, 5, 3, 8, 1]. After sorting: [1, 2, 3, 5, 8].", "c = [2, 5, 3, 8, 1]을 추적해보자. 정렬 후: [1, 2, 3, 5, 8]."),
      content: (() => {
        const rows = [
          { i: 0, t: 1, cows: 5, rev: 5 },
          { i: 1, t: 2, cows: 4, rev: 8 },
          { i: 2, t: 3, cows: 3, rev: 9 },
          { i: 3, t: 5, cows: 2, rev: 10 },
          { i: 4, t: 8, cows: 1, rev: 8 },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
              {t(E, "Trace: sorted c = [1, 2, 3, 5, 8]", "추적: 정렬된 c = [1, 2, 3, 5, 8]")}
            </div>
            <div style={{
              borderRadius: 10, overflow: "hidden", border: `2px solid ${C.border}`,
              fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "30px 50px 55px 80px 40px",
                background: "#1e293b", color: "#e2e8f0", padding: "6px 6px", fontWeight: 800,
              }}>
                <span>i</span>
                <span>c[i]</span>
                <span>N-i</span>
                <span>{t(E, "rev", "수입")}</span>
                <span>{t(E, "best", "최고")}</span>
              </div>
              {rows.map((r, idx) => {
                const isBest = r.rev === 10;
                return (
                  <div key={idx} style={{
                    display: "grid", gridTemplateColumns: "30px 50px 55px 80px 40px",
                    background: isBest ? C.okBg : "#fff",
                    padding: "5px 6px", borderBottom: idx < rows.length - 1 ? `1px solid ${C.border}` : "none",
                  }}>
                    <span style={{ color: C.accent, fontWeight: 800 }}>{r.i}</span>
                    <span style={{ color: C.text }}>${r.t}</span>
                    <span style={{ color: C.text }}>{r.cows}</span>
                    <span style={{ fontWeight: 800, color: isBest ? C.ok : C.text }}>
                      {r.t}x{r.cows}={r.rev}{isBest ? " ★" : ""}
                    </span>
                    <span style={{ fontWeight: 900, color: "#d97706" }}>
                      {Math.max(...rows.slice(0, idx + 1).map(x => x.rev))}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{
              marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 900, color: C.ok,
            }}>
              {t(E, "Max revenue = 10 (tuition = $5)", "최대 수입 = 10 (등록금 = $5)")}
            </div>
          </div>
        );
      })(),
    },
    // 2-3: Complexity
    {
      type: "reveal",
      narr: t(E,
        "Time complexity: O(N log N) for sorting + O(N) for the sweep. Total: O(N log N).", "시간 복잡도: 정렬 O(N log N) + 스윕 O(N). 총: O(N log N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#d97706", fontFamily: "'JetBrains Mono', monospace" }}>
            O(N log N)
          </div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Sorting takes O(N log N). The single sweep is O(N). Since O(N log N) > O(N), total = O(N log N). For N up to 100,000, this runs instantly!",
              "정렬은 O(N log N). 스윕 한 번은 O(N). O(N log N) > O(N)이므로 총 = O(N log N). N이 100,000까지여도 즉시 실행!")}
          </div>
        </div>),
    },
    // 2-4: Hand calculation
    {
      type: "input",
      narr: t(E,
        "Try c = [3, 1, 2]. Sorted: [1, 2, 3]. Revenues: 1x3=3, 2x2=4, 3x1=3. What's the max?", "c = [3, 1, 2]를 해봐. 정렬: [1, 2, 3]. 수입: 1x3=3, 2x2=4, 3x1=3. 최대는?"),
      question: t(E,
        "c = [3, 1, 2]. Max revenue = ?",
        "c = [3, 1, 2]. 최대 수입 = ?"),
      hint: t(E,
        "Sorted: [1,2,3]. 1x3=3, 2x2=4, 3x1=3. Max = 4.",
        "정렬: [1,2,3]. 1x3=3, 2x2=4, 3x1=3. 최대 = 4."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowCollegeCh3(E, lang = "py") {
  return [
    // 3-1: Step 1 — Read input
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code! First, read N and the array of max tuitions.", "코드를 만들자! 먼저 N과 최대 등록금 배열을 읽어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "First line: N (number of cows). Second line: N max tuitions.",
              "첫 줄: N (소의 수). 둘째 줄: N개의 최대 등록금.")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "c = list(map(int, input().split()))",
            ]}
            highlight={[0, 1]}
          />
          <div style={{
            marginTop: 10, background: "#fffbeb", borderRadius: 8, padding: 8,
            border: "1.5px solid #fcd34d", fontSize: 12, color: C.text,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {t(E, "Example: N=4, c=[6, 1, 6, 4]", "예시: N=4, c=[6, 1, 6, 4]")}
          </div>
        </div>),
    },
    // 3-2: Step 2 — Sort
    {
      type: "reveal",
      narr: t(E,
        "Next, sort the array!\nThis is the key insight: after sorting, c[i] as tuition means N-i cows can pay.", "다음은 배열 정렬! 핵심 통찰: 정렬 후 c[i]를 등록금으로 하면 N-i마리가 지불 가능."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 2: Sort the array", "2단계: 배열 정렬")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "c = list(map(int, input().split()))",
              "",
              "c.sort()",
            ]}
            highlight={[3]}
          />
          {/* Before/After visual */}
          <div style={{ marginTop: 10, display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.dim, marginBottom: 4 }}>
                {t(E, "Before", "정렬 전")}
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {[6, 1, 6, 4].map((v, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: 6, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    background: C.noBg, border: `2px solid ${C.noBd}`,
                    fontSize: 13, fontWeight: 900, color: C.no,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{v}</div>
                ))}
              </div>
            </div>
            <span style={{ fontSize: 20, color: "#d97706" }}>→</span>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.dim, marginBottom: 4 }}>
                {t(E, "After", "정렬 후")}
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 4, 6, 6].map((v, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: 6, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    background: C.okBg, border: `2px solid ${C.okBd}`,
                    fontSize: 13, fontWeight: 900, color: C.ok,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{v}</div>
                ))}
              </div>
            </div>
          </div>
        </div>),
    },
    // 3-3: Step 3 — Sweep loop
    {
      type: "reveal",
      narr: t(E,
        "Now sweep through the sorted array.\nFor each index i, compute revenue = c[i] x (N-i) and track the best.", "이제 정렬된 배열을 스윕해. 각 인덱스 i에서 수입 = c[i] x (N-i) 계산하고 최고를 추적해."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 3: Sweep and track maximum", "3단계: 스윕하며 최대 추적")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "c = list(map(int, input().split()))",
              "",
              "c.sort()",
              "",
              "best_rev = 0",
              "best_tuition = c[0]",
              "",
              "for i in range(N):",
              "    tuition = c[i]",
              "    cows_paying = N - i",
              "    revenue = tuition * cows_paying",
              "    if revenue > best_rev:",
              "        best_rev = revenue",
              "        best_tuition = tuition",
            ]}
            highlight={[5, 6, 8, 9, 10, 11, 12, 13, 14]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "We track both the best revenue AND the corresponding tuition price, since the problem asks for both.",
              "문제가 둘 다 물어보니까 최고 수입과 해당 등록금을 모두 추적해.")}
          </div>
        </div>),
    },
    // 3-4: Quiz — why N-i?
    {
      type: "quiz",
      narr: t(E,
        "Quick check: in sorted array c, why does cows_paying = N - i?", "확인: 정렬된 배열 c에서 cows_paying = N - i인 이유는?"),
      question: t(E,
        "Why is cows_paying = N - i in sorted array?",
        "정렬된 배열에서 cows_paying = N - i인 이유는?"),
      options: [
        t(E, "Because c[i] is the largest value", "c[i]가 최댓값이니까"),
        t(E, "Because all cows at index i..N-1 have c[j] >= c[i]", "인덱스 i..N-1의 모든 소가 c[j] >= c[i]이니까"),
        t(E, "Because we skip the first i cows randomly", "처음 i마리를 무작위로 건너뛰니까"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Since the array is sorted in ascending order, all elements from index i to N-1 are >= c[i]. So N-i cows can afford tuition c[i].",
        "정답! 배열이 오름차순이라 인덱스 i부터 N-1까지 모든 원소가 >= c[i]. 그래서 N-i마리가 등록금 c[i]를 낼 수 있어."),
    },
    // 3-5: Step 4 — Print + full code
    {
      type: "reveal",
      narr: t(E,
        "Last step: print the best revenue and the tuition price. That's the complete solution!", "마지막 단계: 최고 수입과 등록금을 출력. 이게 전체 풀이야!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 4: Print the answer!", "4단계: 답 출력!")}
          </div>
          <CodeSnippet
            lines={SOLUTION_CODE}
            highlight={[22]}
          />
          <div style={{
            marginTop: 10, background: C.okBg, borderRadius: 10,
            padding: "8px 12px", border: `2px solid ${C.okBd}`, textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: C.ok }}>
              {t(E, "Complete code! Sort + sweep in O(N log N)!", "전체 코드 완성! 정렬 + 스윕 O(N log N)!")}
            </div>
          </div>
        </div>),
    },
  ];
}
