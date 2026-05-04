import { C, t } from "@/components/quest/theme";
import { getCowGymSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "K, N = map(int, input().split())",
  "",
  "# rank[s][c] = position of cow c in session s",
  "rank = []",
  "for _ in range(K):",
  "    order = list(map(int, input().split()))",
  "    r = [0] * (N + 1)",
  "    for pos in range(N):",
  "        r[order[pos]] = pos",
  "    rank.append(r)",
  "",
  "ans = 0",
  "for i in range(1, N + 1):",
  "    for j in range(i + 1, N + 1):",
  "        # Check if i always beats j or j always beats i",
  "        i_wins = all(rank[s][i] < rank[s][j] for s in range(K))",
  "        j_wins = all(rank[s][j] < rank[s][i] for s in range(K))",
  "        if i_wins or j_wins:",
  "            ans += 1",
  "",
  "print(ans)",
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
        <span style={{ whiteSpace: "pre", color: hl && hl.includes(i) ? "#fbbf24" : "#e2e8f0" }}>{l}</span>
      </div>
    ))}
  </div>
);

/* Helper: ranking table */
const RankTable = ({ sessions, N, highlight, E: isE }) => {
  const cowColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
        <thead>
          <tr style={{ background: "#fffbeb" }}>
            <th style={{ padding: "6px 8px", borderBottom: "2px solid #fcd34d", color: "#d97706", textAlign: "left" }}>
              {isE ? "Session" : "세션"}
            </th>
            {Array.from({ length: N }, (_, i) => (
              <th key={i} style={{
                padding: "6px 8px", borderBottom: "2px solid #fcd34d",
                color: cowColors[i % cowColors.length], fontWeight: 800,
              }}>
                {isE ? `Cow ${i + 1}` : `소 ${i + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((ranks, s) => (
            <tr key={s} style={{ background: s % 2 === 0 ? "#fff" : "#fffbeb" }}>
              <td style={{ padding: "5px 8px", borderBottom: "1px solid #fde68a", fontWeight: 700 }}>S{s + 1}</td>
              {ranks.map((rank, c) => {
                const isHl = highlight && highlight.some(([ci, cj]) => c === ci || c === cj);
                return (
                  <td key={c} style={{
                    padding: "5px 8px", borderBottom: "1px solid #fde68a", textAlign: "center",
                    fontWeight: isHl ? 900 : 600,
                    color: isHl ? "#d97706" : C.text,
                    background: isHl ? "#fef3c7" : "transparent",
                  }}>{rank}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 문제 이해 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowGymCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "K gymnastics sessions!\nIn each, N cows are ranked from best to worst.\nWe need to find pairs of cows where one ALWAYS beats the other in EVERY session.", "K번의 체조 세션! 각 세션에서 N마리 소가 순위를 매겨져. 모든 세션에서 한 소가 항상 다른 소를 이기는 쌍을 찾아야 해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"🤸"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Cow Gymnastics</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2019 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "A 'consistent pair' (i, j) means cow i ALWAYS ranks above cow j (or vice versa) in ALL K sessions. Count all such pairs!",
              "'일관된 쌍' (i, j)은 소 i가 모든 K세션에서 항상 소 j보다 위(또는 반대)인 것. 그런 쌍을 모두 세!")}
          </div>
        </div>),
    },
    // 1-2: Ranking table visual
    {
      type: "reveal",
      narr: t(E,
        "Here's an example with 3 cows and 2 sessions.\nThe table shows each cow's rank (position) in each session.\nLower rank = better performance!", "3마리 소와 2개 세션 예시야. 표는 각 소의 세션별 순위(위치)를 보여줘. 낮은 순위 = 더 좋은 성적!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
            {t(E, "Example: 3 cows, 2 sessions", "예시: 3마리 소, 2개 세션")}
          </div>
          <div style={{ marginBottom: 8, fontSize: 12, color: C.dim }}>
            {t(E,
              "Session 1 order: [1, 2, 3] → cow 1 is 1st, cow 2 is 2nd, cow 3 is 3rd",
              "세션 1 순서: [1, 2, 3] → 소 1이 1등, 소 2가 2등, 소 3이 3등")}
          </div>
          <div style={{ marginBottom: 8, fontSize: 12, color: C.dim }}>
            {t(E,
              "Session 2 order: [1, 3, 2] → cow 1 is 1st, cow 3 is 2nd, cow 2 is 3rd",
              "세션 2 순서: [1, 3, 2] → 소 1이 1등, 소 3이 2등, 소 2가 3등")}
          </div>
          {/* Rank positions (0-indexed) for each cow */}
          <RankTable
            sessions={[
              [0, 1, 2],  // S1: cow1=0th, cow2=1st, cow3=2nd
              [0, 2, 1],  // S2: cow1=0th, cow2=2nd, cow3=1st
            ]}
            N={3}
            E={E}
          />
          <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center" }}>
            {t(E, "Rank 0 = best, higher = worse", "순위 0 = 최고, 높을수록 나쁨")}
          </div>
        </div>),
    },
    // 1-3: What is a consistent pair?
    {
      type: "reveal",
      narr: t(E,
        "A consistent pair means the relative order NEVER changes across sessions.\nCow A always beats cow B, or cow B always beats cow A.", "일관된 쌍은 상대적 순서가 세션 간에 절대 바뀌지 않는 것. 소 A가 항상 소 B를 이기거나, 소 B가 항상 소 A를 이기거나."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
            {t(E, "Consistent vs Inconsistent", "일관 vs 비일관")}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {/* Consistent example */}
            <div style={{ flex: 1, minWidth: 140, background: "#dcfce7", borderRadius: 10, padding: 10, border: "2px solid #6ee7b7" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#059669", marginBottom: 6 }}>
                {t(E, "Consistent (1,2)", "일관된 쌍 (1,2)")} ✓
              </div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.8 }}>
                S1: 1 {">"} 2 ✓<br />
                S2: 1 {">"} 2 ✓
              </div>
              <div style={{ fontSize: 11, color: "#059669", fontWeight: 700, marginTop: 4 }}>
                {t(E, "1 ALWAYS beats 2", "1이 항상 2를 이김")}
              </div>
            </div>
            {/* Inconsistent example */}
            <div style={{ flex: 1, minWidth: 140, background: "#fef2f2", borderRadius: 10, padding: 10, border: "2px solid #fca5a5" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>
                {t(E, "Inconsistent (2,3)", "비일관 쌍 (2,3)")} ✗
              </div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.8 }}>
                S1: 2 {">"} 3 ✓<br />
                S2: 3 {">"} 2 ✗
              </div>
              <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 700, marginTop: 4 }}>
                {t(E, "Order flips!", "순서가 뒤바뀜!")}
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-4: Quiz — is (A,B) consistent?
    {
      type: "quiz",
      narr: t(E,
        "Sessions: [A>B>C] and [A>C>B].\nIs pair (A,B) consistent?\nA is above B in both sessions, so yes!", "세션: [A>B>C]과 [A>C>B]. 쌍 (A,B)는 일관된가? A가 두 세션 모두에서 B보다 위이니 맞아!"),
      question: t(E,
        "Sessions [A>B>C] and [A>C>B]. Is (A,B) consistent?",
        "세션 [A>B>C]과 [A>C>B]. (A,B)는 일관된 쌍?"),
      options: [
        t(E, "Yes — A always beats B", "예 — A가 항상 B를 이김"),
        t(E, "No — order changes", "아니오 — 순서가 바뀜"),
        t(E, "Can't tell", "알 수 없음"),
      ],
      correct: 0,
      explain: t(E,
        "In S1, A is 1st, B is 2nd → A beats B. In S2, A is 1st, B is 3rd → A beats B. Consistent!",
        "S1에서 A는 1등, B는 2등 → A가 B를 이김. S2에서 A는 1등, B는 3등 → A가 B를 이김. 일관!"),
    },
    // 1-5: Quiz — count consistent pairs
    {
      type: "quiz",
      narr: t(E,
        "Sessions: [1,2,3] and [1,3,2].\nCheck all pairs: (1,2)✓ always 1 beats 2, (1,3)✓ always 1 beats 3, (2,3)✗ order changes.\nTotal: 2!", "세션: [1,2,3]과 [1,3,2].\n모든 쌍 확인: (1,2)✓ 항상 1이 2를 이김, (1,3)✓ 항상 1이 3을 이김, (2,3)✗ 순서 변경.\n총: 2!"),
      question: t(E,
        "Rankings [1,2,3] and [1,3,2]. How many consistent pairs?",
        "순위 [1,2,3]과 [1,3,2]. 일관된 쌍은 몇 개?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Pairs (1,2) and (1,3) are consistent. Pair (2,3) is NOT because 2 beats 3 in S1 but 3 beats 2 in S2. Total: 2!",
        "쌍 (1,2)와 (1,3)이 일관. 쌍 (2,3)은 S1에서 2가 3을 이기지만 S2에서 3이 2를 이기므로 비일관. 총: 2!"),
    },
    // 1-6: Input practice
    {
      type: "input",
      narr: t(E,
        "With N=3 cows, how many total pairs do we need to check?\nWe check every unique pair (i, j) where i < j.", "N=3마리 소가 있으면, 총 몇 개의 쌍을 확인해야 할까? i < j인 모든 유일한 쌍 (i, j)을 확인해."),
      question: t(E,
        "N=3 cows. How many unique pairs to check?",
        "N=3마리 소. 확인할 유일한 쌍의 수?"),
      hint: t(E,
        "N*(N-1)/2 = 3*2/2 = 3 pairs: (1,2), (1,3), (2,3).",
        "N*(N-1)/2 = 3*2/2 = 3쌍: (1,2), (1,3), (2,3)."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 알고리즘/시뮬레이션 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowGymCh2(E) {
  return [
    // 2-1: Convert order to rank
    {
      type: "reveal",
      narr: t(E,
        "First key insight: the input gives ORDER (who came 1st, 2nd, ...) but we need RANK (what position was cow X?).\nWe need to convert!", "첫 번째 핵심: 입력은 순서(누가 1등, 2등...)를 주지만 우리는 순위(소 X의 위치?)가 필요해. 변환해야 해!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
            {t(E, "Order vs Rank", "순서 vs 순위")}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, background: "#fffbeb", borderRadius: 10, padding: 10, border: "2px solid #fcd34d" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#d97706", marginBottom: 4 }}>
                {t(E, "Input (order)", "입력 (순서)")}
              </div>
              <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.8, color: C.text }}>
                [3, 1, 2]<br />
                {t(E, "= pos0:cow3, pos1:cow1, pos2:cow2", "= 0위:소3, 1위:소1, 2위:소2")}
              </div>
            </div>
            <div style={{ flex: 1, background: "#dcfce7", borderRadius: 10, padding: 10, border: "2px solid #6ee7b7" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#059669", marginBottom: 4 }}>
                {t(E, "We need (rank)", "필요한 것 (순위)")}
              </div>
              <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.8, color: C.text }}>
                rank[1]=1, rank[2]=2, rank[3]=0<br />
                {t(E, "= cow1 at pos1, cow2 at pos2, cow3 at pos0", "= 소1은 1위, 소2는 2위, 소3은 0위")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, fontStyle: "italic", textAlign: "center" }}>
            {t(E, "rank[cow] = position. Lower rank = better!", "rank[소] = 위치. 낮을수록 좋아!")}
          </div>
        </div>),
    },
    // 2-2: Check all pairs visually
    {
      type: "reveal",
      narr: t(E,
        "Then for each pair (i, j), check ALL K sessions: is rank[s][i] < rank[s][j] for every s?\nOr the reverse?\nIf either holds, it's consistent!", "그 다음 각 쌍 (i, j)에 대해 모든 K 세션을 확인: 모든 s에서 rank[s][i] < rank[s][j]인가?\n또는 반대?\n둘 중 하나가 성립하면 일관!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 8 }}>
            {t(E, "Checking all pairs systematically", "모든 쌍을 체계적으로 확인")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 8 }}>
            {t(E, "Sessions: [1,2,3] and [1,3,2]. Ranks:", "세션: [1,2,3]과 [1,3,2]. 순위:")}
          </div>
          <RankTable
            sessions={[
              [0, 1, 2],
              [0, 2, 1],
            ]}
            N={3}
            E={E}
          />
          <div style={{ marginTop: 10 }}>
            {[
              { pair: "(1,2)", checks: ["0<1 ✓", "0<2 ✓"], result: true, why: t(E, "1 always beats 2", "1이 항상 2를 이김") },
              { pair: "(1,3)", checks: ["0<2 ✓", "0<1 ✓"], result: true, why: t(E, "1 always beats 3", "1이 항상 3을 이김") },
              { pair: "(2,3)", checks: ["1<2 ✓", "2>1 ✗"], result: false, why: t(E, "order changes!", "순서가 바뀜!") },
            ].map(({ pair, checks, result, why }, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 10px", marginBottom: 4, borderRadius: 8,
                background: result ? "#dcfce7" : "#fef2f2",
                border: `1.5px solid ${result ? "#6ee7b7" : "#fca5a5"}`,
              }}>
                <span style={{ fontWeight: 800, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#d97706", minWidth: 36 }}>{pair}</span>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.dim, flex: 1 }}>{checks.join(", ")}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: result ? "#059669" : "#dc2626" }}>{result ? "✓" : "✗"}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 6, textAlign: "center", fontSize: 14, fontWeight: 900, color: "#d97706" }}>
            {t(E, "Answer: 2 consistent pairs", "답: 2개의 일관된 쌍")}
          </div>
        </div>),
    },
    // 2-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "For N cows, how many unique pairs are there? This determines our algorithm's complexity!", "N마리 소에 대해 유일한 쌍은 몇 개? 이것이 알고리즘의 복잡도를 결정해!"),
      question: t(E,
        "N=4 cows. How many unique pairs?",
        "N=4마리 소. 유일한 쌍의 수?"),
      options: [
        t(E, "4", "4"),
        t(E, "6", "6"),
        t(E, "8", "8"),
      ],
      correct: 1,
      explain: t(E,
        "N*(N-1)/2 = 4*3/2 = 6 pairs: (1,2), (1,3), (1,4), (2,3), (2,4), (3,4).",
        "N*(N-1)/2 = 4*3/2 = 6쌍: (1,2), (1,3), (1,4), (2,3), (2,4), (3,4)."),
    },
    // 2-4: Complexity
    {
      type: "reveal",
      narr: t(E,
        "For each of the N*(N-1)/2 pairs, we check all K sessions.\nTotal: O(K * N^2).\nWith N<=20 and K<=10 from constraints, this is at most 10*400 = 4000 operations.\nVery fast!", "N*(N-1)/2개 쌍 각각에 대해 K개 세션을 확인.\n총: O(K * N^2).\n제약조건 N<=20, K<=10이면 최대 10*400 = 4000 연산.\n매우 빨라!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#d97706", fontFamily: "'JetBrains Mono',monospace" }}>
            {"O(K \u00b7 N\u00b2)"}
          </div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, "N \u2264 20 → pairs \u2264 190", "N \u2264 20 → 쌍 \u2264 190")}<br />
              {t(E, "K \u2264 10 → checks per pair \u2264 10", "K \u2264 10 → 쌍당 확인 \u2264 10")}<br />
              {t(E, "Total \u2264 1,900 operations", "총 \u2264 1,900 연산")}
            </div>
          </div>
        </div>),
    },
    // 2-5: Input practice
    {
      type: "input",
      narr: t(E,
        "With N=5 cows, how many unique pairs must we check?", "N=5마리 소에 대해 몇 개의 유일한 쌍을 확인해야 할까?"),
      question: t(E,
        "N=5 cows. N*(N-1)/2 = ?",
        "N=5마리 소. N*(N-1)/2 = ?"),
      hint: t(E,
        "5 * 4 / 2 = 10",
        "5 * 4 / 2 = 10"),
      answer: 10,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowGymCh3(E, lang = "py") {
  return [
    // 3-1: Read input and build rank array
    {
      type: "reveal",
      narr: t(E,
        "Step 1: Read K sessions.\nFor each, convert the order list into a rank array.\nrank[s][cow] = position of cow in session s.", "1단계: K개 세션 읽기. 각각 순서 리스트를 순위 배열로 변환. rank[s][cow] = 세션 s에서 소의 위치."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 1: Build rank arrays", "1단계: 순위 배열 만들기")}
          </div>
          <CodeSnippet
            lines={[
              "K, N = map(int, input().split())",
              "",
              "rank = []",
              "for _ in range(K):",
              "    order = list(map(int, input().split()))",
              "    r = [0] * (N + 1)",
              "    for pos in range(N):",
              "        r[order[pos]] = pos",
              "    rank.append(r)",
            ]}
            highlight={[5, 6, 7]}
          />
          <div style={{ marginTop: 8, background: "#fffbeb", borderRadius: 8, padding: 8, border: "1.5px solid #fcd34d", fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 800, color: "#d97706", marginBottom: 2 }}>
              {t(E, "Key conversion:", "핵심 변환:")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              order = [3, 1, 2]<br />
              r[3] = 0, r[1] = 1, r[2] = 2
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
              {t(E, "order[pos] = cow → r[cow] = pos", "order[pos] = 소 → r[소] = pos")}
            </div>
          </div>
        </div>),
    },
    // 3-2: Double loop over pairs
    {
      type: "reveal",
      narr: t(E,
        "Step 2: Check all pairs (i, j) where i < j.\nFor each pair, verify if the relative order is consistent across all K sessions.", "2단계: i < j인 모든 쌍 (i, j) 확인. 각 쌍에 대해 상대적 순서가 모든 K세션에서 일관되는지 검증."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 2: Check all pairs", "2단계: 모든 쌍 확인")}
          </div>
          <CodeSnippet
            lines={[
              "ans = 0",
              "for i in range(1, N + 1):",
              "    for j in range(i + 1, N + 1):",
              "        i_wins = all(rank[s][i] < rank[s][j] for s in range(K))",
              "        j_wins = all(rank[s][j] < rank[s][i] for s in range(K))",
              "        if i_wins or j_wins:",
              "            ans += 1",
            ]}
            highlight={[1, 2, 3, 4, 5, 6]}
          />
          <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div><span style={{ fontWeight: 800, color: "#d97706" }}>all()</span> = {t(E, "True only if condition holds for EVERY session", "모든 세션에서 조건이 성립할 때만 True")}</div>
            <div><span style={{ fontWeight: 800, color: "#d97706" }}>i_wins or j_wins</span> = {t(E, "consistent in either direction", "어느 방향이든 일관")}</div>
          </div>
        </div>),
    },
    // 3-3: Quiz — why all()?
    {
      type: "quiz",
      narr: t(E,
        "We use all() to check every session. Why not any()? Think about what 'consistent' means!", "모든 세션을 확인하기 위해 all()을 사용해. 왜 any()가 아닐까? '일관'의 의미를 생각해봐!"),
      question: t(E,
        "Why all() instead of any() for checking consistency?",
        "일관성 확인에서 왜 any()가 아니라 all()일까?"),
      options: [
        t(E, "any() is slower", "any()가 더 느려서"),
        t(E, "Consistent means EVERY session, not just some", "일관은 일부가 아니라 모든 세션에서를 의미하니까"),
        t(E, "They give the same result", "같은 결과를 줘서"),
      ],
      correct: 1,
      explain: t(E,
        "Consistent means i beats j in ALL sessions, not just some! If even one session disagrees, the pair is inconsistent. That's why we need all()!",
        "일관은 i가 일부가 아니라 모든 세션에서 j를 이기는 것! 한 세션이라도 다르면 비일관. 그래서 all()이 필요해!"),
    },
    // 3-4: Why range starts at 1
    {
      type: "quiz",
      narr: t(E,
        "Look at the loop: range(1, N+1). Why start at 1, not 0? And why j starts at i+1?", "루프를 봐: range(1, N+1). 왜 0이 아니라 1에서 시작? j는 왜 i+1부터?"),
      question: t(E,
        "Why does j start at i+1 (not 1)?",
        "왜 j가 1이 아니라 i+1부터 시작할까?"),
      options: [
        t(E, "To avoid checking a cow with itself", "소 자신과 비교하는 것을 피하려고"),
        t(E, "To avoid counting (i,j) and (j,i) twice", "(i,j)와 (j,i)를 두 번 세는 것을 피하려고"),
        t(E, "Both reasons above!", "위 두 가지 이유 모두!"),
      ],
      correct: 2,
      explain: t(E,
        "Starting j at i+1 avoids both self-pairs (i,i) AND double-counting (1,2) vs (2,1). We only check each pair once!",
        "j를 i+1부터 시작하면 자기 자신과의 쌍 (i,i)과 중복 (1,2) vs (2,1)을 모두 피해. 각 쌍을 한 번만 확인!"),
    },
    // 3-5: Complete code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getCowGymSections(E),
    },
  ];
}
