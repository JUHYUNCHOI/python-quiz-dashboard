import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    c = list(map(int, input().split()))",
  "    total = sum(c)",
  "    max_c = max(c)",
  "    rest = total - max_c",
  "    print(min(total, 2 * rest + 1))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (8 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFansCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Let's make a colorful fan!\nWe have sticks of different colors and need to line them up so no two same-color sticks touch.\nHow many can we use?\n🪭", "같은 색끼리 안 닿게 막대를 최대한 많이 줄 세워요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>🪭</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Fans</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P2</div>

          {/* 🎯 Mission box */}
          <div style={{ marginTop: 12, background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the maximum number of sticks usable in a row, given no two adjacent sticks may share a color.",
                "옆에 같은 색이 오지 않게 한 줄로 세울 때,\n막대를 최대 몇 개까지 쓸 수 있는지 출력해요.")}
            </div>
          </div>

          <div style={{ marginTop: 10, background: "#fffbeb", border: "1px solid #fbbf24", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N colors of sticks → line them up → no two adjacent same color → maximize length!",
              "N가지 색 막대 → 한 줄로 세우기 → 옆에 같은 색 금지 → 가장 길게!")}
          </div>
        </div>),
    },
    // 1-2: Rule explanation with visual
    {
      type: "reveal",
      narr: t(E,
        "The rule is simple: no two sticks next to each other can be the same color!\nLet's see what's OK and what's NOT.", "규칙은 간단해요. 옆에 같은 색 막대가 오면 안 돼요.\n뭐가 되고 뭐가 안 되는지 볼까요?"),
      content: (() => {
        const colors = ["#ef4444", "#3b82f6", "#ef4444", "#22c55e", "#3b82f6"];
        const bad = ["#ef4444", "#ef4444", "#3b82f6", "#22c55e", "#3b82f6"];
        const stickW = 28, stickH = 50, gap = 4;
        const renderSticks = (arr, label, ok) => (
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "center", gap, marginBottom: 4 }}>
              {arr.map((col, i) => (
                <div key={i} style={{
                  width: stickW, height: stickH, borderRadius: 6,
                  background: col, border: `1px solid ${col}`,
                  boxShadow: `0 2px 6px ${col}44`,
                }} />
              ))}
            </div>
            <div style={{
              fontSize: 12, fontWeight: 600,
              color: ok ? "#16a34a" : "#dc2626",
            }}>{ok ? "✅ " : "❌ "}{label}</div>
          </div>
        );
        return (
          <div style={{ padding: 16 }}>
            {renderSticks(colors, t(E, "OK! All neighbors differ", "좋아요! 옆 색이 다 달라요"), true)}
            {renderSticks(bad, t(E, "NO! Red-Red adjacent!", "안 돼요! 빨강이 나란히 있어요"), false)}
            <div style={{
              background: "#fef3c7", borderRadius: 8, padding: "8px 10px",
              border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
              fontWeight: 700, textAlign: "center",
            }}>
              💡 {t(E,
                "Adjacent = right next to each other. Same color neighbors are NOT allowed!",
                "인접 = 바로 옆. 같은 색이 옆에 오면 안 돼요!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: 입출력 형식 + 제약 (MCC 2025 P2 원문 그대로)
    // 규칙을 이해한 직후 "그래서 데이터가 어떻게 들어오는데?" 를 먼저 못박아 준다.
    // (선생님 2026-07-21: "인풋과 아웃풋이 어떤지 모르겠고")
    {
      type: "reveal",
      narr: t(E,
        "Now — how does the data actually arrive?\nFirst T (how many test cases), then each case gives N and the N counts.",
        "그럼 데이터는 어떻게 들어올까요?\n먼저 문제 개수 T 가 오고, 케이스마다 N 과 막대 개수가 이어져요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>T</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(first line) — number of test cases", "(첫 줄) — 문제 개수")}</span></div>
              <div style={{ marginTop: 6, paddingLeft: 10, borderLeft: `2px solid #fde68a` }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— how many colours", "— 색이 몇 가지")}</span></div>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>c₁ c₂ … c<sub>N</sub></span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— sticks of each colour", "— 색깔별 막대 개수")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ these 2 lines repeat T times", "↑ 이 두 줄이 T 번 되풀이돼요")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "T lines — for each case, the length of the longest row you can make.",
                  "케이스마다 한 줄씩, 만들 수 있는 가장 긴 줄의 길이를 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 10</div>
              <div>1 ≤ N ≤ 100,000 (= 10⁵)</div>
              <div>1 ≤ cᵢ ≤ 1,000,000,000 (= 10⁹)</div>
            </div>
          </div>
          {/* 샘플 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#f8fafc" }}>
                <div>2</div>
                <div>3</div>
                <div>3 7 2</div>
                <div>1</div>
                <div>4</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#86efac" }}>
                <div>11</div>
                <div>1</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, wordBreak: "keep-all" }}>
            {t(E, "First case: colours 3, 7, 2 → answer 11. Second: only one colour, so a 2nd stick would touch the same colour — you can place just 1.",
                "첫 케이스는 3, 7, 2 개라서 답이 11이에요.\n둘째는 색이 하나뿐이라 두 개만 놓아도 옆에 같은 색이 와요. 그래서 1개예요.")}
          </div>
        </div>),
    },
    // 1-4: Quiz — understanding the rule
    {
      type: "quiz",
      narr: t(E,
        "Quick check! Which arrangement follows the rule?", "어떤 줄이 규칙을 지키고 있을까요?"),
      question: t(E,
        "4 sticks: 2 red, 2 blue. Which is valid?",
        "막대 4개 중 빨강이 2개, 파랑이 2개예요. 어떤 게 맞을까요?"),
      options: [
        t(E, "Red Red Blue Blue", "빨빨파파"),
        t(E, "Red Blue Blue Red", "빨파파빨"),
        t(E, "Red Blue Red Blue", "빨파빨파"),
      ],
      correct: 2,
      explain: t(E,
        "Red Blue Red Blue — every neighbor is different! The other two have same-color neighbors.",
        "빨파빨파는 옆끼리 색이 다 달라요. 나머지 둘은 같은 색이 붙어 있어요."),
    },
    // 1-4: Hands-on — student places sticks themselves
    {
      type: "tryYourselfViz",
      narr: t(E,
        "Before we see the algorithm, YOU try first!\nTap colors to place sticks. Same-color neighbors are blocked.\nCan you reach the optimal length?", "풀이를 보기 전에 먼저 직접 해봐요.\n색을 눌러 막대를 놓아요. 가장 길게까지 갈 수 있을까요?"),
    },
    // 1-5: Three cases — watch sticks get placed one by one
    {
      type: "fanPlacementViz",
      narr: t(E,
        "Now let's watch the algorithm.\nWhen can we use all sticks? It depends on how many of the most common color we have!\nTry all three cases.", "언제 막대를 전부 쓸 수 있을까요?\n가장 많은 색이 나머지보다 얼마나 많은지에 달렸어요. 세 경우를 봐요."),
    },
    // 1-5: Why 2×rest+1?
    {
      type: "separatorBuildViz",
      narr: t(E,
        "Why 2×rest+1?\nAdd separators one by one and watch the pattern emerge!\nEach separator lets you place one more dominant stick.", "왜 2×rest+1 일까요? 사이 막대를 하나씩 늘려 봐요.\n하나 끼울 때마다 가장 많은 색을 하나 더 놓을 수 있어요."),
    },
    // 1-6: Quiz — apply the formula
    {
      type: "quiz",
      narr: t(E,
        "Let's verify! Counts = [3, 7, 2]. Total = 12, max = 7, rest = 5. What's the answer?", "개수가 [3, 7, 2] 예요. 합계는 12, 최대는 7, 나머지는 5예요. 답은 얼마일까요?"),
      question: t(E,
        "min(12, 2×5+1) = min(12, 11) = ?",
        "min(12, 2×5+1) = min(12, 11) = ?"),
      options: [
        t(E, "12 (use all)", "12 (전부 쓰기)"),
        t(E, "11", "11"),
        t(E, "10", "10"),
      ],
      correct: 1,
      explain: t(E,
        "min(12, 11) = 11! The dominant color (7) is too many — we can only use 11 sticks.",
        "min(12, 11) = 11 이에요. 나머지 5개로는 가장 많은 색 7개를 다 떼어 놓지 못해서 11개까지만 써요."),
    },
    // 1-7: Quiz — when all fit
    {
      type: "quiz",
      narr: t(E,
        "Another example! Counts = [3, 3, 3]. Total = 9, max = 3, rest = 6. Can we use all 9?", "이번엔 [3, 3, 3]이에요. 9개를 다 쓸 수 있을까요?"),
      question: t(E,
        "min(9, 2×6+1) = min(9, 13) = ?",
        "min(9, 2×6+1) = min(9, 13) = ?"),
      options: [
        t(E, "13", "13"),
        t(E, "9 (use all!)", "9 (전부 쓰기!)"),
        t(E, "7", "7"),
      ],
      correct: 1,
      explain: t(E,
        "min(9, 13) = 9! rest (6) is large enough, so all sticks fit. ABCABCABC works!",
        "min(9, 13) = 9 예요. 나머지 6개가 충분해서 ABCABCABC 처럼 다 떼어 놓을 수 있어요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🏗️ 시뮬레이션 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFansCh2(E) {
  return [
    // 2-1: Interactive stick arranger
    {
      type: "fanSimulator",
      narr: t(E,
        "Try it!\nAdjust the stick counts and see how the formula works.\nWatch the sticks arrange themselves!\n🪭", "막대 개수를 바꿔 가며 공식이 어떻게 맞아떨어지는지 봐요. 🪭"),
    },
    // 2-2: Observation quiz
    {
      type: "quiz",
      narr: t(E,
        "When the biggest group has fewer sticks than all other groups combined (plus 1), what happens?", "가장 큰 그룹이 나머지 그룹 합(+1)보다 적으면 어떻게 될까요?"),
      question: t(E,
        "If the biggest group's count is at most rest + 1, the answer is...?",
        "가장 큰 그룹의 개수가 나머지 합 + 1 보다 작거나 같으면 답은 무엇일까요?"),
      options: [
        t(E, "2 × rest + 1", "2 × rest + 1"),
        t(E, "the biggest group's count only", "가장 큰 그룹의 개수만"),
        t(E, "total (use everything!)", "total (전부 쓰기!)"),
      ],
      correct: 2,
      explain: t(E,
        "When the dominant color isn't too greedy, we can use ALL sticks! The rest provides enough separators.",
        "나머지 막대가 가장 많은 색 사이사이를 모두 갈라 줄 만큼 있어서, 막대를 전부 쓸 수 있어요."),
    },
    // 2-3: Hand calculation 1
    {
      type: "input",
      narr: t(E,
        "Try it yourself! Counts = [5, 1, 1]. Total = 7, max = 5, rest = 2.", "직접 해봐요. 개수는 [5, 1, 1] 이고 합계 7, 최대 5, 나머지 2예요."),
      question: t(E,
        "min(7, 2×2+1) = ?",
        "min(7, 2×2+1) = ?"),
      answer: 5,
    },
    // 2-4: Hand calculation 2
    {
      type: "input",
      narr: t(E,
        "One more! Counts = [4, 4, 4]. Total = 12, max = 4, rest = 8.", "하나 더 해봐요. 개수는 [4, 4, 4] 이고 합계 12, 최대 4, 나머지 8이에요."),
      question: t(E,
        "min(12, 2×8+1) = ?",
        "min(12, 2×8+1) = ?"),
      answer: 12,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 — step-by-step code building
   ═══════════════════════════════════════════════════════════════ */

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

export function makeFansCh3(E) {
  return [
    // 3-1: Read T and loop
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code! First, we have T test cases. We read T and loop through each one.", "코드를 만들어 봐요. 테스트 케이스가 T개니까 T를 읽고 T번 반복해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 1: Handle test cases", "1단계: 테스트 케이스 처리")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "Input starts with T (number of test cases). We loop T times.",
              "입력 첫 줄에 테스트 케이스 수 T 가 와요. 그래서 T번 반복해요.")}
          </div>
          <CodeSnippet
            lines={["T = int(input())", "for _ in range(T):"]}
            highlight={[0, 1]}
          />
          <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.5 }}>
            {t(E,
              "The _ means we don't need the loop variable — we just repeat T times.",
              "_ 는 반복 변수를 안 쓴다는 뜻이에요. 그냥 T번 반복하면 돼요.")}
          </div>
        </div>),
    },
    // 3-2: Read N and counts
    {
      type: "reveal",
      narr: t(E,
        "For each test case, read N (number of colors) and then the list of stick counts.", "케이스마다 색이 몇 가지인지(N)를 읽고, 색깔별 막대 개수를 읽어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 2: Read the data", "2단계: 데이터 읽기")}
          </div>
          <CodeSnippet
            lines={[
              "T = int(input())",
              "for _ in range(T):",
              "    N = int(input())",
              "    c = list(map(int, input().split()))",
            ]}
            highlight={[2, 3]}
          />
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 10 }}>
            {[3, 7, 2].map((v, i) => (
              <div key={i} style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 6, fontSize: 14, fontWeight: 700,
                fontFamily: "'JetBrains Mono',monospace",
                background: "#fffbeb", border: "1px solid #fbbf24", color: "#d97706",
              }}>{v}</div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 10, color: C.dim, marginTop: 4 }}>
            c = [3, 7, 2]
          </div>
        </div>),
    },
    // 3-3: Compute total, max, rest
    {
      type: "reveal",
      narr: t(E,
        "Now compute the three key values: total, max_c, and rest!", "이제 핵심 값 세 개를 구해요. total, max_c, rest 예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 3: The three key values", "3단계: 세 가지 핵심 값")}
          </div>
          <CodeSnippet
            lines={[
              "T = int(input())",
              "for _ in range(T):",
              "    N = int(input())",
              "    c = list(map(int, input().split()))",
              "    total = sum(c)",
              "    max_c = max(c)",
              "    rest = total - max_c",
            ]}
            highlight={[4, 5, 6]}
          />
          {/* Visual trace with [3,7,2] */}
          <div style={{
            marginTop: 10, background: "#fffbeb", borderRadius: 10,
            padding: 10, border: "1px solid #fbbf24",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#d97706", marginBottom: 4 }}>
              {t(E, "Example: c = [3, 7, 2]", "예시: c = [3, 7, 2]")}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
              fontWeight: 700, color: C.text, lineHeight: 2,
            }}>
              total = 3 + 7 + 2 = <span style={{ color: "#d97706", fontWeight: 700 }}>12</span><br />
              max_c = max(3, 7, 2) = <span style={{ color: "#dc2626", fontWeight: 700 }}>7</span><br />
              rest = 12 - 7 = <span style={{ color: "#059669", fontWeight: 700 }}>5</span>
            </div>
          </div>
        </div>),
    },
    // 3-4: The formula line
    {
      type: "reveal",
      narr: t(E,
        "Finally, apply the formula and print! Just one line: min(total, 2*rest+1).", "마지막으로 공식을 써서 출력해요. min(total, 2*rest+1) 한 줄이면 돼요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 4: Apply the formula!", "4단계: 공식 적용!")}
          </div>
          <CodeSnippet
            lines={[
              "T = int(input())",
              "for _ in range(T):",
              "    N = int(input())",
              "    c = list(map(int, input().split()))",
              "    total = sum(c)",
              "    max_c = max(c)",
              "    rest = total - max_c",
              "    print(min(total, 2 * rest + 1))",
            ]}
            highlight={[7]}
          />
          <div style={{
            marginTop: 10, background: "#d1fae5", borderRadius: 10,
            padding: "8px 12px", border: "1px solid #6ee7b7", textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>
              {t(E, "That's the complete code! Just 8 lines! 🎉", "이게 전체 코드예요. 딱 8줄이에요! 🎉")}
            </div>
          </div>
        </div>),
    },
    // 3-5: Walkthrough — formula visualizer
    {
      type: "formulaTrace",
      narr: t(E,
        "Let's trace through sample inputs step by step!\nWatch how the formula computes the answer.", "샘플 입력을 하나씩 따라가며 공식이 답을 어떻게 내는지 봐요."),
    },
    // 3-6: Full code reveal
    {
      type: "code",
      narr: t(E,
        "Here's the complete solution! Simple and elegant. 🎉", "전체 풀이 코드예요! 간단하고 깔끔해요. 🎉"),
      code: SOLUTION_CODE,
      label: t(E, "Show complete code", "전체 코드 보기"),
    },
  ];
}
