import { C, t } from "@/components/quest/theme";

/* ================================================================
   CODE BLOCK
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "count = [0] * M  # dots per column",
  "",
  "for i in range(N):",
  "    row = input()",
  "    for j in range(M):",
  "        if row[j] == '.':",
  "            count[j] += 1",
  "",
  "print(min(count))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFencesCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Pick one column to make entirely fence, and find the cheapest way to do it.",
        "열 하나를 골라 그 열을 전부 울타리로 바꿔요.\n가장 싸게 드는 값은 얼마일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🏗️</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Building Fences</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N × M grid", "N × M 격자")}</b>
                  {t(E, " of ", " 가 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>.</code>
                  {t(E, " (grass) and ", " (풀) 와 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>#</code>
                  {t(E, " (fence).", " (울타리) 로 채워져 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ picks ", "FJ 가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "ONE column", "한 개의 열")}</b>
                  {t(E, " and converts every cell in that column to a fence (#).",
                        " 을 골라 그 열의 모든 칸을 울타리 (#) 로 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each ", "각 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "grass-to-fence conversion costs 1", "풀 → 울타리 변환은 비용 1")}</b>
                  {t(E, " (already-fence cells cost 0).",
                        " (이미 울타리인 칸은 비용 0).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum total cost over all column choices", "어떤 열을 골랐을 때 드는 최소 총 비용")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Grid explanation — full grid with animated pink column trace
    {
      type: "reveal",
      narr: t(E,
        "The field is an N-by-M grid where each cell is grass (.) or fence (#).", "밭은 N행 M열 그리드이고, 칸은 풀(.)이거나 울타리(#)예요."),
      content: (() => {
        const demo = [
          [".",".","#","."],
          [".","#",".","."],
          [".",".","#","."],
        ];
        const hiliteCol = 3;
        /* 2026-09-09: 학생이 "분홍으로 칠했길래 이게 정답 열인가 했다" 고 걸렸다.
           실제로 이 그리드의 열별 비용은 [3, 2, 1, 3] 이라 hiliteCol=3(C4)은 비용 3 —
           제일 싼 열이 아니다(C3 이 1). 이 쪽은 비용 개념이 나오기 전, "열이 뭔지" 만
           보여주는 자리다. 그리드는 안 건드리고 캡션 한 줄로 오해만 막는다. */
        return (
          <div style={{ padding: 16 }}>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#059669", marginBottom: 10 }}>
                {t(E, "📋 What's Given", "📋 주어진 것")}
              </div>
              {/* Column labels */}
              <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 2 }}>
                {demo[0].map((_, c) => (
                  <div key={c} style={{
                    width: 36, textAlign: "center", fontSize: 10, fontWeight: 600,
                    fontFamily: "'JetBrains Mono',monospace",
                    color: c === hiliteCol ? "#fff" : "#9ca3af",
                    background: c === hiliteCol ? "#ec4899" : "transparent",
                    borderRadius: 4, padding: "1px 0",
                    animation: c === hiliteCol ? "popIn .4s ease both" : "none",
                    animationDelay: c === hiliteCol ? ".2s" : "0s",
                  }}>{t(E, `C${c+1}`, `${c+1}열`)}</div>
                ))}
              </div>
              {/* Grid rows */}
              {demo.map((row, r) => (
                <div key={r} style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 4 }}>
                  {row.map((ch, c) => {
                    const isFence = ch === "#";
                    const isHilite = c === hiliteCol;
                    return (
                      <div key={c} style={{
                        width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 600,
                        background: isFence ? "#374151" : "#bbf7d0",
                        border: `1.5px solid ${isFence ? "#6b7280" : "#4ade80"}`,
                        color: isFence ? "#fff" : "#166534",
                        animation: isHilite ? "colTrace .5s ease both" : "none",
                        animationDelay: isHilite ? `${0.4 + r * 0.35}s` : "0s",
                      }}>{ch}</div>
                    );
                  })}
                </div>
              ))}
              {/* Arrow + label — appears after cells animate */}
              <div style={{
                textAlign: "center", marginTop: 6, fontSize: 12, fontWeight: 600, color: "#ec4899",
                animation: "fadeIn .4s ease both", animationDelay: "1.6s",
              }}>
                ↑ {t(E, "This is one column (vertical!)", "이게 열 하나예요 (세로줄!)")}
              </div>
              <div style={{
                fontSize: 12, color: "#059669", fontWeight: 700, textAlign: "center", marginTop: 8,
                animation: "fadeIn .4s ease both", animationDelay: "2s",
              }}>
                {t(E, "Make all 3 cells in this column → #", "이 열의 3칸을 전부 → # 으로 바꿔요!")}
              </div>
              <div style={{ marginTop: 10, fontSize: 13, color: C.text, lineHeight: 1.8, textAlign: "center" }}>
                <span style={{ background: "#bbf7d0", borderRadius: 4, padding: "2px 6px", fontWeight: 700, color: "#166534" }}>.</span>
                {t(E, " = grass (need to convert) ", " = 풀 (변환 필요) ")}
                <span style={{ background: "#374151", borderRadius: 4, padding: "2px 6px", fontWeight: 700, color: "#fff" }}>#</span>
                {t(E, " = fence (already done!)", " = 울타리 (이미 완료!)")}
              </div>
              {/* 2026-09-09: 학생이 "분홍으로 칠했길래 이게 정답 열인가 했다" 고 걸렸다. */}
              <div style={{ marginTop: 8, textAlign: "center", fontSize: 11, color: "#9333ea", wordBreak: "keep-all", lineHeight: 1.6 }}>
                {t(E, "(The pink one is just an example column — which column is cheapest comes later.)",
                      "(분홍색은 그냥 예시로 고른 열이에요 — 어느 열이 제일 싼지는 뒤에서 알아봐요.)")}
              </div>
            </div>
          </div>
        );
      })(),
    },
    // 1-2b: 입출력 형식 + 제약 (MCC 2025 P1 원문 그대로)
    // 그리드 개념을 잡은 직후 "그래서 데이터가 어떻게 들어오는데?" 를 못박아 준다.
    {
      type: "reveal",
      narr: t(E,
        "Now, how does the input and output actually look?",
        "그럼 자료는 어떻게 들어올까요?\n첫 줄에 행 수 N 과 열 수 M 이 와요.\n그다음 N 줄에 격자가 오는데, 한 줄은 '.' 과 '#' 로 돼 있어요.\n세로 울타리를 끝까지 만드는 가장 싼 값을 정수 하나로 출력해요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N M</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(first line) — rows, columns", "(첫 줄) — 행 수, 열 수")}</span></div>
              <div style={{ marginTop: 6, paddingLeft: 10, borderLeft: `2px solid #fde68a` }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>row</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— M chars of '.' (grass) or '#' (fence)", "— '.' (풀) 또는 '#' (울타리) M 글자")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "A single integer — the minimum number of fences to build.",
                  "정수 하나 — 만들어야 할 최소 울타리 수.")}
            </div>
          </div>
          {/* 제약 */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N, M ≤ 800</div>
              <div style={{ color: C.dim, fontSize: 11 }}>{t(E, "grid contains only '.' and '#'", "격자는 '.' 과 '#' 로만 구성")}</div>
            </div>
          </div>
          {/* 샘플 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.55, color: "#f8fafc" }}>
                <div>4 5</div>
                <div>.....</div><div>...#.</div><div>.##..</div><div>...#.</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#86efac" }}>
                <div>2</div>
              </div>
            </div>
          </div>
          {/* 2026-09-09: 여기에 "가장 작은 값이 2 → 그 열이 제일 싸요" 까지 적혀 있었다.
              원문(ioimalaysia MCC 2025 P1)에 있는 문장은 맞지만 **위치가 다르다** —
              원문은 이걸 Sample 다음의 별도 Explanation 섹션에 둔다. 학생이 스스로
              풀어본 뒤에 보는 자리다. 우리는 형식 카드 안에 넣어서 만져보기도 전에 답을 줬다.
              이 한 줄이 뒤따르는 여섯 스텝을 전부 "발견" 이 아니라 "재확인" 으로 만들었다.
              숫자는 남기고 결론만 질문으로 돌린다. */}
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, wordBreak: "keep-all", lineHeight: 1.7 }}>
            {t(E, "Grass ('.') per column: 4, 3, 3, 2, 4. Which column is cheapest to wall off? Let's find it one step at a time.",
                "열마다 풀('.') 이 4, 3, 3, 2, 4 개씩 있어요.\n어느 열을 막는 게 제일 쌀까요? 아래에서 하나씩 확인해 봐요.")}
          </div>
        </div>),
    },
    // 1-4: Cost concept — shown as a vertical column
    {
      type: "reveal",
      narr: t(E,
        "Converting grass to fence costs 1; already-fence cells are free.", "풀을 울타리로 바꾸면 비용 1, 이미 울타리면 공짜예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, alignItems: "flex-start" }}>
            {/* Vertical column cells */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#059669", fontFamily: "'JetBrains Mono',monospace", marginBottom: 2 }}>
                {t(E, "1 column", "열 1개")}
              </div>
              {[[".", true], ["#", false], [".", true], [".", true]].map(([ch, needWork], i) => (
                <div key={i} style={{
                  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 6, fontSize: 18, fontWeight: 700,
                  fontFamily: "'JetBrains Mono',monospace",
                  background: needWork ? "#fef3c7" : "#d1fae5",
                  border: `1.5px solid ${needWork ? "#fbbf24" : "#6ee7b7"}`,
                  color: needWork ? "#92400e" : "#059669",
                }}>{ch}</div>
              ))}
            </div>
            {/* Cost explanation */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 190 }}>
              <div style={{ fontSize: 13, color: "#92400e", fontWeight: 600, marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>
                <span style={{ background: "#fef3c7", borderRadius: 4, padding: "2px 6px", border: "1.5px solid #fbbf24" }}>.</span>
                {t(E, " → convert! +1", " → 변환! +1")}
              </div>
              <div style={{ fontSize: 13, color: "#059669", fontWeight: 600, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>
                <span style={{ background: "#d1fae5", borderRadius: 4, padding: "2px 6px", border: "1.5px solid #6ee7b7" }}>#</span>
                {t(E, " → free! +0", " → 공짜! +0")}
              </div>
              <div style={{ background: "#ecfdf5", borderRadius: 10, padding: "8px 12px", border: "1px solid #6ee7b7", textAlign: "center" }}>
                <div style={{ fontSize: 12, color: C.dim, fontWeight: 700, marginBottom: 2 }}>
                  {t(E, "Cost for this column", "이 열의 비용")}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: "#059669" }}>
                  3 × "." → "#" = <span style={{ fontSize: 22 }}>3</span>
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-4b: Deep audit — student clicks each column, watches cost build up
    {
      type: "columnCostAuditor",
      narr: t(E,
        "Now YOU audit each column!\nClick a column header to walk through it cell-by-cell.\nEvery '.' adds 1 to the cost. Audit them all to find the cheapest!",
        "이제 네가 직접 감사해봐!\n열 머리글을 누르면 그 열을 한 칸씩 따라가면서 비용이 쌓여요.\n'.' 한 개당 비용 +1. 전부 감사해서 가장 싼 열을 찾아내!"),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🏗️ 시뮬레이션 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFencesCh2(E) {
  return [
    // 2-2: Observation quiz
    {
      type: "quiz",
      narr: t(E,
        "Now put it in words: what exactly are we printing?", "이제 말로 옮겨봐요 — 우리가 출력하는 건 정확히 뭘까요?"),
      question: t(E,
        "What is the answer to this problem?",
        "이 문제의 답은 뭐예요?"),
      options: [
        t(E, "The total '.' count in the whole grid", "그리드 전체 '.' 합계"),
        t(E, "The number of columns with at least one '#'", "'#'이 하나라도 있는 열의 수"),
        t(E, "The minimum '.' count in any column", "열별 '.' 개수의 최솟값"),
      ],
      correct: 2,
      explain: t(E,
        "Count '.' per column, take the minimum. That's the entire algorithm!",
        "열별 '.' 수를 세고 최솟값을 구하면 끝!"),
    },
    // 2-3: Hand calculation 1
    {
      type: "input",
      narr: t(E,
        "By hand! 3x4 grid — grass (.) per column: 2, 4, 1, 3. What is the minimum cost?", "직접 해봐요! 3×4 격자에서 열마다 풀이 2, 4, 1, 3 개예요.\n가장 싼 값은 얼마일까요?"),
      question: t(E,
        "Grass per column: 2, 4, 1, 3\nMin cost = ?",
        "열마다 풀이 2, 4, 1, 3 개예요\n가장 싼 값은?"),
      answer: 1,
    },
    // 2-4: Hand calculation 2
    {
      type: "input",
      narr: t(E,
        "Another one! 3×3 grid — dots (.) per column: 1, 1, 3. What's the minimum cost?", "하나 더! 3×3 격자에서 열마다 풀이 1, 1, 3 개예요.\n가장 싼 값은 얼마일까요?"),
      question: t(E,
        "Dots per column: 1, 1, 3\nMin cost = ?",
        "열마다 풀이 1, 1, 3 개예요\n가장 싼 값은?"),
      answer: 1,
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
      const baseColor = isHl ? "#6ee7b7" : "#e2e8f0";
      const tokens = pyHighlight(l, baseColor);
      return (
        <div key={i} style={{
          display: "flex", minHeight: 20,
          background: isHl ? "rgba(5,150,105,.15)" : "transparent",
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

export function makeFencesCh3(E) {
  return [
    // 3-1: Step 1 — Read N, M
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code step by step, starting by reading N and M.", "코드를 한 줄씩 만들자! 먼저 입력 첫 줄에서 N과 M을 읽어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", marginBottom: 6 }}>
            {t(E, "Step 1: Read the grid size", "1단계: 그리드 크기 읽기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "Input first line: \"4 5\" means 4 rows, 5 columns",
              "입력 첫 줄: \"4 5\" → 4행, 5열")}
          </div>
          <CodeSnippet lines={["N, M = map(int, input().split())"]} highlight={[0]} />
          <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.5 }}>
            {t(E,
              "input().split() reads \"4 5\" → [\"4\",\n\"5\"], map(int, ...) makes them numbers.", "input().split()은 \"4 5\" → [\"4\",\n\"5\"]로 나누고, map(int, ...)로 숫자로 바꿔.")}
          </div>
        </div>),
    },
    // 3-2: Step 2 — Prepare count list
    {
      type: "reveal",
      narr: t(E,
        "We need to count dots per column.\nSo we make a list with M zeros — one slot for each column!", "열마다 풀을 세야 하니까, M개의 0이 들어간 리스트를 만들어요 — 열마다 자리 하나!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", marginBottom: 6 }}>
            {t(E, "Step 2: Prepare the count list", "2단계: 카운트 리스트 준비")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6, whiteSpace: "pre-line" }}>
            {t(E,
              "5 columns → count = [0, 0, 0, 0, 0].\nEach slot will store how much grass that column has.", "5열이면 → count = [0, 0, 0, 0, 0].\n각 칸에 그 열의 풀 수를 저장할 거예요.")}
          </div>
          <CodeSnippet
            lines={["N, M = map(int, input().split())", "count = [0] * M"]}
            highlight={[1]}
          />
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 10 }}>
            {[0,0,0,0,0].map((v, i) => (
              <div key={i} style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 6, fontSize: 14, fontWeight: 700,
                fontFamily: "'JetBrains Mono',monospace",
                background: "#ecfdf5", border: "1px solid #6ee7b7", color: "#059669",
              }}>{v}</div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 10, color: C.dim, marginTop: 4 }}>
            {t(E, "count = [0, 0, 0, 0, 0]  (one per column)", "count = [0, 0, 0, 0, 0]  (열마다 하나)")}
          </div>
        </div>),
    },
    // 3-3: Interactive row-to-column visualization
    {
      type: "rowColumnFillViz",
      narr: t(E,
        "Watch how the code fills the column counters, row by row.", "코드가 행마다 열 카운터를 채우는 과정을 한 스텝씩 봐요."),
    },
    // 3-4: Step 3 quiz — understanding the loop
    {
      type: "quiz",
      /* 2026-09-09: 두 가지를 고쳤다.
         ① 정답 보기만 23자로 유독 길고 설명형이라, 몰라도 "제일 긴 걸" 찍으면 맞았다
            (나머지는 11자·7자). 세 보기 길이를 비슷하게 맞췄다.
         ② 반말이 섞여 있었다 — "읽어", "크니까", "상관없어". 해요체로 고쳤다. */
      narr: t(E,
        "Quick check — why is the outer loop over rows (N)?", "확인해봐요 — 바깥 반복문이 행(N)인 이유는 뭘까요?"),
      question: t(E,
        "Why is the OUTER loop over rows (N)?",
        "바깥 반복문이 행(N)인 이유는?"),
      options: [
        t(E, "Rows are always bigger than columns", "행이 항상 열보다 많아서요"),
        t(E, "Input arrives one row per line", "입력이 한 줄에 한 행씩 와서요"),
        t(E, "Either order works the same", "어느 쪽이든 똑같아서요"),
      ],
      correct: 1,
      explain: t(E,
        "Input gives us one row per line! So we MUST read row by row. Inside each row, we check all columns.",
        "입력이 한 줄에 한 행씩 오니까 행 단위로 읽어야 해요! 각 행 안에서 모든 열을 확인하는 거예요."),
    },
    // 3-5: Step 4 — Print the answer
    {
      type: "reveal",
      narr: t(E,
        "After counting all grass per column, just print the minimum!\nPython's min() does this in one line.", "모든 열의 풀을 다 세고 나면, 최솟값만 출력하면 끝! Python의 min()이 한 줄로 해줘요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", marginBottom: 6 }}>
            {t(E, "Step 4: Print the answer!", "4단계: 답 출력!")}
          </div>
          <CodeSnippet
            lines={[
              "N, M = map(int, input().split())",
              "count = [0] * M",
              "",
              "for i in range(N):",
              "    row = input()",
              "    for j in range(M):",
              "        if row[j] == '.':",
              "            count[j] += 1",
              "",
              "print(min(count))",
            ]}
            highlight={[9]}
          />
          <div style={{
            marginTop: 10, background: "#d1fae5", borderRadius: 10,
            padding: "8px 12px", border: "1px solid #6ee7b7", textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>
              {t(E, "That's the complete code! Just 8 lines! 🎉", "이게 전체 코드! 단 8줄! 🎉")}
            </div>
          </div>
        </div>),
    },
    // 3-6: Final — full code reveal
    {
      type: "code",
      narr: t(E,
        "Here's the complete solution again. You built every line yourself! 🎉", "전체 풀이 코드예요. 모든 줄을 직접 만들었어! 🎉"),
      code: SOLUTION_CODE,
      label: t(E, "Show complete code", "전체 코드 보기"),
    },
  ];
}
