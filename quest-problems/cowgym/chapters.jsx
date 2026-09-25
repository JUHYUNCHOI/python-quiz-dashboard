import { C, t } from "@/components/quest/theme";
import { CowGymPairSim } from "./components";

/* Python syntax highlighter (shared across snippets) */
const PY_KW = new Set(["from","import","for","in","if","else","elif","def","return","and","or","not","while","break","continue","pass","class","with","as","try","except","finally","raise","yield","lambda","is","None","True","False","global","nonlocal"]);
const PY_BUILTIN = new Set(["print","input","range","len","sum","map","int","str","chr","ord","min","max","sorted","reversed","list","dict","set","tuple","enumerate","zip","abs","round","type","isinstance","open","filter","any","all","bool","float"]);

function pyHighlight(line, baseColor) {
  const tokens = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "'" || line[i] === '"') {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) { if (line[j] === "\\") j++; j++; }
      tokens.push({ text: line.slice(i, j + 1), color: "#a5d6a7" });
      i = j + 1;
    } else if (line[i] === "#") {
      tokens.push({ text: line.slice(i), color: "#6b7280" });
      i = line.length;
    } else if (/[0-9]/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>[\]:]/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#f9a825" });
      i = j;
    } else if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z_0-9]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (PY_KW.has(word)) tokens.push({ text: word, color: "#c792ea" });
      else if (PY_BUILTIN.has(word)) tokens.push({ text: word, color: "#82aaff" });
      else tokens.push({ text: word, color: baseColor });
      i = j;
    } else if ("=<>!+-*/%&|^~".includes(line[i])) {
      let j = i;
      while (j < line.length && "=<>!+-*/%&|^~".includes(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#89ddff" });
      i = j;
    } else {
      tokens.push({ text: line[i], color: baseColor });
      i++;
    }
  }
  return tokens;
}

/* Helper: code snippet box (token-highlighted Python) */
const CodeSnippet = ({ lines, highlight: hl }) => (
  <div style={{
    background: "#1e293b", borderRadius: 10, padding: "10px 8px",
    overflowX: "auto", fontSize: 12, lineHeight: 1.8,
    fontFamily: "'JetBrains Mono', monospace", marginTop: 8,
  }}>
    {lines.map((l, i) => {
      const isHl = hl && hl.includes(i);
      const baseColor = isHl ? "#fbbf24" : "#e2e8f0";
      const tokens = pyHighlight(l, baseColor);
      return (
        <div key={i} style={{
          display: "flex", minHeight: 20,
          background: isHl ? "rgba(217,119,6,.15)" : "transparent",
          borderRadius: 4, padding: "0 4px",
        }}>
          <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
          <span style={{ whiteSpace: "pre", wordBreak: "break-all" }}>
            {tokens.map((tk, j) => (
              <span key={j} style={{ color: tk.color }}>{tk.text}</span>
            ))}
          </span>
        </div>
      );
    })}
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
                color: cowColors[i % cowColors.length], fontWeight: 600,
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
        "Cows were ranked K times. How many pairs always kept the same order?",
        "소들을 K 번 줄 세웠어요.\n매번 앞뒤 순서가 같았던 소 두 마리는 몇 쌍일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🤸"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Cow Gymnastics</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2019 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of cow pairs (i, j) whose relative ranking is the same in every one of the K sessions.",
                "K 개 세션 모두에서 앞뒤 순서가 똑같은 소 쌍 (i, j) 이 몇 개인지 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "K gymnastics sessions", "K개의 체조 세션")}</b>
                  {t(E, " — each session ranks all N cows from best to worst (a permutation).",
                        " 이 있고, 세션마다 N 마리 소를 1등부터 N등까지 줄 세워요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A pair ", "두 소 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "(i, j) is 'consistent'", "(i, j) 가 '일관된 쌍'")}</b>
                  {t(E, " if one of them ranks higher than the other in EVERY session (same direction every time).",
                        " 이 되려면, 모든 세션에서 늘 같은 쪽이 다른 쪽보다 위에 있어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of consistent pairs", "일관된 쌍의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  K and N first, then K lines of rankings.",
        "입력은 K, N 다음에 순위가 K 줄로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>K N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of sessions, number of cows", "— 세션 개수, 소 마릿수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>c₁ c₂ … c_N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— cow numbers, best to worst", "— 소 번호를 성적순으로 나열 (앞이 더 잘함)")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats K times", "↑ 이 줄이 K 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The number of consistent pairs, on a single line.",
                  "일관된 쌍의 개수를 한 줄로 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ K ≤ 10</div>
              <div>1 ≤ N ≤ 20</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Ranking table visual
    {
      type: "reveal",
      narr: t(E,
        "Here's an example with 3 cows and 2 sessions.\nThe table shows each cow's rank (position) in each session.\nLower rank = better performance!", "소 3 마리에 세션 2 개인 예시예요.\n표는 소마다 세션에서 몇 번째 자리였는지 보여줘요.\n숫자가 작을수록 더 잘한 거예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
            {t(E, "Example: 3 cows, 2 sessions", "소 3 마리, 세션 2 개인 예시예요")}
          </div>
          <div style={{ marginBottom: 8, fontSize: 12, color: C.dim }}>
            {t(E,
              "Session 1 order: [1, 2, 3] → cow 1 is 1st, cow 2 is 2nd, cow 3 is 3rd",
              "세션 1 의 순서는 [1, 2, 3] 이에요 → 소 1 이 1등, 소 2 가 2등, 소 3 이 3등")}
          </div>
          <div style={{ marginBottom: 8, fontSize: 12, color: C.dim }}>
            {t(E,
              "Session 2 order: [1, 3, 2] → cow 1 is 1st, cow 3 is 2nd, cow 2 is 3rd",
              "세션 2 의 순서는 [1, 3, 2] 이에요 → 소 1 이 1등, 소 3 이 2등, 소 2 가 3등")}
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
            {t(E, "Rank 0 = best, higher = worse", "0 이 제일 잘한 거예요. 숫자가 클수록 못한 거예요")}
          </div>
        </div>),
    },
    // 1-3: What is a consistent pair?
    {
      type: "reveal",
      narr: t(E,
        "A consistent pair means the relative order NEVER changes across sessions.\nCow A always beats cow B, or cow B always beats cow A.", "일관된 쌍은 세션이 바뀌어도 앞뒤 순서가 절대 안 바뀌는 쌍이에요.\n소 A 가 늘 소 B 를 이기거나, 소 B 가 늘 소 A 를 이기거나 둘 중 하나예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
            {t(E, "Consistent vs Inconsistent", "일관 vs 비일관")}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {/* Consistent example */}
            <div style={{ flex: 1, minWidth: 140, background: "#dcfce7", borderRadius: 10, padding: 10, border: "1px solid #6ee7b7" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#059669", marginBottom: 6 }}>
                {t(E, "Consistent (1,2)", "일관된 쌍 (1,2)")} ✓
              </div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.8 }}>
                S1: 1 {">"} 2 ✓<br />
                S2: 1 {">"} 2 ✓
              </div>
              <div style={{ fontSize: 11, color: "#059669", fontWeight: 700, marginTop: 4 }}>
                {t(E, "1 ALWAYS beats 2", "1 이 항상 2 를 이겨요")}
              </div>
            </div>
            {/* Inconsistent example */}
            <div style={{ flex: 1, minWidth: 140, background: "#fef2f2", borderRadius: 10, padding: 10, border: "1px solid #fca5a5" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>
                {t(E, "Inconsistent (2,3)", "비일관 쌍 (2,3)")} ✗
              </div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.8 }}>
                S1: 2 {">"} 3 ✓<br />
                S2: 3 {">"} 2 ✗
              </div>
              <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 700, marginTop: 4 }}>
                {t(E, "Order flips!", "순서가 뒤바뀌었어요!")}
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-4: Quiz — is (A,B) consistent?
    {
      type: "quiz",
      narr: t(E,
        "Sessions: [A>B>C] and [A>C>B].\nIs pair (A,B) consistent?\nA is above B in both sessions, so yes!", "세션이 [A>B>C] 와 [A>C>B] 예요.\n쌍 (A,B) 는 일관된 쌍일까요?\nA 가 두 세션 모두에서 B 보다 위에 있으니 맞아요."),
      question: t(E,
        "Sessions [A>B>C] and [A>C>B]. Is (A,B) consistent?",
        "세션이 [A>B>C] 와 [A>C>B] 일 때, (A,B) 는 일관된 쌍일까요?"),
      options: [
        t(E, "Yes — A always beats B", "네 — A 가 항상 B 를 이겨요"),
        t(E, "No — order changes", "아니요 — 순서가 바뀌어요"),
        t(E, "Can't tell", "알 수 없음"),
      ],
      correct: 0,
      explain: t(E,
        "In S1, A is 1st, B is 2nd → A beats B. In S2, A is 1st, B is 3rd → A beats B. Consistent!",
        "S1 에서 A 는 1등, B 는 2등이라 A 가 이겨요. S2 에서도 A 는 1등, B 는 3등이라 A 가 이겨요. 그래서 일관된 쌍이에요."),
    },
    // 1-5: Quiz — count consistent pairs
    {
      type: "quiz",
      narr: t(E,
        "Sessions: [1,2,3] and [1,3,2].\nCheck all pairs: (1,2)✓ always 1 beats 2, (1,3)✓ always 1 beats 3, (2,3)✗ order changes.\nTotal: 2!", "세션이 [1,2,3] 과 [1,3,2] 예요.\n쌍을 모두 확인해요. (1,2) 는 항상 1 이 이기고, (1,3) 도 항상 1 이 이겨요.\n(2,3) 은 순서가 바뀌어요. 그래서 답은 2 예요."),
      question: t(E,
        "Rankings [1,2,3] and [1,3,2]. How many consistent pairs?",
        "순위가 [1,2,3] 과 [1,3,2] 예요. 일관된 쌍은 몇 개일까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Pairs (1,2) and (1,3) are consistent. Pair (2,3) is NOT because 2 beats 3 in S1 but 3 beats 2 in S2. Total: 2!",
        "쌍 (1,2) 와 (1,3) 은 일관돼요. 쌍 (2,3) 은 S1 에서 2 가 3 을 이기지만 S2 에서는 3 이 2 를 이겨서 비일관이에요. 그래서 답은 2 예요."),
    },
    // 1-6: Input practice
    {
      type: "input",
      narr: t(E,
        "With N=3 cows, how many total pairs do we need to check?\nWe check every unique pair (i, j) where i < j.", "소가 N=3 마리면 쌍을 몇 개나 확인해야 할까요?\ni < j 인 쌍 (i, j) 을 겹치지 않게 하나씩 확인해요."),
      question: t(E,
        "N=3 cows. How many unique pairs to check?",
        "소가 N=3 마리일 때 확인할 쌍은 몇 개일까요?"),
      hint: t(E,
        "Use the formula N·(N − 1) / 2 for unique unordered pairs.",
        "겹치지 않는 쌍의 개수는 N·(N − 1) / 2 로 구해요."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 알고리즘/시뮬레이션 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowGymCh2(E) {
  return [
    // 2-1: Convert order to rank
    {
      type: "reveal",
      narr: t(E,
        "First key insight: the input gives ORDER (who came 1st, 2nd, ...) but we need RANK (what position was cow X?).\nWe need to convert!", "여기가 첫 번째 고비예요.\n입력은 순서를 줘요 — 누가 1등이고 누가 2등인지요.\n그런데 우리가 알고 싶은 건 순위예요 — 소 X 가 몇 번째였는지요.\n그래서 바꿔 줘야 해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
            {t(E, "Order vs Rank", "순서 vs 순위")}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, background: "#fffbeb", borderRadius: 10, padding: 10, border: "1px solid #fcd34d" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#d97706", marginBottom: 4 }}>
                {t(E, "Input (order)", "입력 (순서)")}
              </div>
              <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.8, color: C.text }}>
                [3, 1, 2]<br />
                {t(E, "= pos0:cow3, pos1:cow1, pos2:cow2", "= 0위는 소3, 1위는 소1, 2위는 소2")}
              </div>
            </div>
            <div style={{ flex: 1, background: "#dcfce7", borderRadius: 10, padding: 10, border: "1px solid #6ee7b7" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#059669", marginBottom: 4 }}>
                {t(E, "We need (rank)", "필요한 것 (순위)")}
              </div>
              <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.8, color: C.text }}>
                rank[1]=1, rank[2]=2, rank[3]=0<br />
                {t(E, "= cow1 at pos1, cow2 at pos2, cow3 at pos0", "= 소1은 1위, 소2는 2위, 소3은 0위")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, fontStyle: "italic", textAlign: "center" }}>
            {t(E, "rank[cow] = position. Lower rank = better!", "rank[소] 는 그 소의 자리예요. 숫자가 낮을수록 잘한 거예요.")}
          </div>
        </div>),
    },
    // 2-2b: Deep audit sim — pick a pair, step through every session
    {
      type: "reveal",
      narr: t(E,
        "Pick a pair, then step through every session — watch who wins each round.",
        "이번엔 직접 해봐요. 쌍을 고르고 세션마다 한 칸씩 넘겨 보세요.\nrank 칸이 켜지면 그 세션의 승자를 확인해요.\n매번 같은 소가 이겼을 때만 일관된 쌍이에요."),
      content: (<CowGymPairSim E={E} />),
    },
    // 2-4: Complexity
    {
      type: "reveal",
      narr: t(E,
        "Check K sessions for each of N*(N-1)/2 pairs — at most 4000 operations. Fast.", "쌍 N*(N-1)/2 개마다 세션 K 개를 확인해요.\n많아야 4000 번이라 아주 빨라요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#d97706", fontFamily: "'JetBrains Mono',monospace" }}>
            {"O(K \u00b7 N\u00b2)"}
          </div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, "N \u2264 20 → pairs \u2264 190", "N \u2264 20 → 쌍 \u2264 190")}<br />
              {t(E, "K \u2264 10 → checks per pair \u2264 10", "K \u2264 10 → 쌍마다 확인 \u2264 10")}<br />
              {t(E, "Total \u2264 1,900 operations", "총 \u2264 1,900 번 계산")}
            </div>
          </div>
        </div>),
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
        "The answer is how many pairs stay consistent.\nFirst turn each order into a rank.", "답은 일관된 쌍의 개수예요.\n먼저 순서를 순위로 바꿔요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 1: Build rank arrays", "1단계: 순위 목록 만들기")}
          </div>
          <CodeSnippet
            lines={[
              "with open('gymnastics.in', 'r') as file:",
              "    lines = file.readlines()",
              "K, N = map(int, lines[0].split())",
              "",
              "rank = []",
              "for s in range(K):",
              "    order = list(map(int, lines[1 + s].split()))",
              "    r = [0] * (N + 1)",
              "    for pos in range(N):",
              "        r[order[pos]] = pos",
              "    rank.append(r)",
            ]}
            highlight={[7, 8, 9]}
          />
          <div style={{ marginTop: 8, background: "#fffbeb", borderRadius: 8, padding: 8, border: "1.5px solid #fcd34d", fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 600, color: "#d97706", marginBottom: 2 }}>
              {t(E, "Key conversion:", "이렇게 바꿔요")}
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
        "So check every pair (i, j):\ndoes their order agree in all K sessions?", "그래서 쌍 (i, j) 마다 확인해요.\n세션 K 개에서 순서가 다 같은가요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
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
            <div><span style={{ fontWeight: 600, color: "#d97706" }}>all()</span> = {t(E, "True only if condition holds for EVERY session", "모든 세션에서 조건이 맞을 때만 True 예요")}</div>
            <div><span style={{ fontWeight: 600, color: "#d97706" }}>i_wins or j_wins</span> = {t(E, "consistent in either direction", "어느 쪽이 이기든 일관된 쌍이에요")}</div>
          </div>
        </div>),
    },
    // 3-3: Quiz — why all()?
    {
      type: "quiz",
      narr: t(E,
        "We use all() to check every session. Why not any()? Think about what 'consistent' means!", "모든 세션을 확인하려고 all() 을 써요.\n왜 any() 가 아닐까요?\n'일관' 이 무슨 뜻이었는지 떠올려 보세요."),
      question: t(E,
        "Why all() instead of any() for checking consistency?",
        "일관성 확인에서 왜 any()가 아니라 all()일까요?"),
      options: [
        t(E, "any() is slower", "any() 가 더 느려서요"),
        t(E, "Consistent means EVERY session, not just some", "일관은 일부가 아니라 모든 세션에서 그래야 한다는 뜻이니까요"),
        t(E, "They give the same result", "같은 결과가 나와서요"),
      ],
      correct: 1,
      explain: t(E,
        "Consistent means i beats j in ALL sessions, not just some! If even one session disagrees, the pair is inconsistent. That's why we need all()!",
        "일관은 i 가 몇몇 세션이 아니라 모든 세션에서 j 를 이기는 거예요. 한 세션이라도 다르면 비일관이에요. 그래서 all() 이 필요해요."),
    },
    // 3-4: Why range starts at 1
    {
      type: "quiz",
      narr: t(E,
        "Look at the loop: range(1, N+1). Why start at 1, not 0? And why j starts at i+1?", "반복문을 봐요. range(1, N+1) 이에요.\n왜 0 이 아니라 1 에서 시작할까요?\nj 는 왜 i+1 부터일까요?"),
      question: t(E,
        "Why does j start at i+1 (not 1)?",
        "왜 j 가 1 이 아니라 i+1 부터 시작할까요?"),
      options: [
        t(E, "To avoid checking a cow with itself", "소 자기 자신과 비교하는 걸 피하려고요"),
        t(E, "To avoid counting (i,j) and (j,i) twice", "(i,j) 와 (j,i) 를 두 번 세는 걸 피하려고요"),
        t(E, "Both reasons above!", "위 두 가지 이유 모두예요"),
      ],
      correct: 2,
      explain: t(E,
        "Starting j at i+1 avoids both self-pairs (i,i) AND double-counting (1,2) vs (2,1). We only check each pair once!",
        "j 를 i+1 부터 시작하면 자기 자신과의 쌍 (i,i) 도, (1,2) 와 (2,1) 을 두 번 세는 것도 피해요. 쌍마다 딱 한 번씩만 확인해요."),
    },
    // 3-5: Complete code — CodeWalk (선생님 2026-07-14: 모든 quest 코드 이 방식)
    {
      type: "cowgym-codewalk",
      narr: t(E,
        "The full solution, start to finish — toggle Python ↔ C++ via the header.",
        "풀이 코드를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
  ];
}
