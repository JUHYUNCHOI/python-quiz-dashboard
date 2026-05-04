import { C, t } from "@/components/quest/theme";
import { getWordProcSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "words = input().split()",
  "",
  "lines = []",
  "cur_line = []",
  "cur_len = 0",
  "",
  "for w in words:",
  "    wl = len(w)",
  "    if cur_len + wl > K and cur_line:",
  "        lines.append(' '.join(cur_line))",
  "        cur_line = []",
  "        cur_len = 0",
  "    cur_line.append(w)",
  "    cur_len += wl",
  "",
  "if cur_line:",
  "    lines.append(' '.join(cur_line))",
  "",
  "for line in lines:",
  "    print(line)",
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
        background: hl && hl.includes(i) ? "rgba(220,38,38,.12)" : "transparent",
        borderRadius: 4, padding: "0 4px",
      }}>
        <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
        <span style={{ whiteSpace: "pre", color: hl && hl.includes(i) ? "#fca5a5" : "#e2e8f0" }}>{l}</span>
      </div>
    ))}
  </div>
);

/* Helper: word box */
const WordBox = ({ word, color, size }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    padding: "4px 10px", borderRadius: 8, fontSize: 13, fontWeight: 700,
    fontFamily: "'JetBrains Mono',monospace",
    background: `${color}15`, border: `2px solid ${color}`,
    color, whiteSpace: "nowrap",
  }}>
    {word} <span style={{ fontSize: 10, color: C.dim, marginLeft: 4 }}>({size})</span>
  </div>
);

/* Helper: line visual */
const LineViz = ({ words, colors, K, lineNum, E: isE }) => {
  const totalLen = words.reduce((s, w) => s + w.length, 0);
  return (
    <div style={{
      background: "#f9fafb", borderRadius: 10, padding: "8px 10px",
      border: "1.5px solid #e5e7eb", marginBottom: 6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.dim }}>
          {isE ? `Line ${lineNum}` : `${lineNum}줄`}
        </div>
        <div style={{
          fontSize: 10, fontWeight: 800, color: totalLen <= K ? "#059669" : "#dc2626",
          fontFamily: "'JetBrains Mono',monospace",
        }}>
          {totalLen}/{K}
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {words.map((w, i) => (
          <WordBox key={i} word={w} color={colors[i % colors.length]} size={w.length} />
        ))}
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 문제 이해 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWordProcCh1(E) {
  const wColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "A word processor needs to format text into lines!\nEach line can hold at most K characters of words (spaces between words don't count toward the limit).", "워드 프로세서가 텍스트를 줄로 나눠야 해! 각 줄에 최대 K글자의 단어를 담을 수 있어 (단어 사이 공백은 제한에 포함되지 않아)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"📝"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Word Processor</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2020 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N words, max K characters per line. Fit as many words as possible on each line (greedy), then start a new line!",
              "N개 단어, 줄당 최대 K글자. 각 줄에 가능한 많은 단어를 넣고 (그리디), 그 다음 새 줄 시작!")}
          </div>
        </div>),
    },
    // 1-2: Rules explained with visual
    {
      type: "reveal",
      narr: t(E,
        "The rule: when adding the next word would push the total character count past K, start a new line.\nSpaces DON'T count!\nOnly the sum of word lengths matters.", "규칙: 다음 단어를 추가하면 총 글자 수가 K를 초과할 때 새 줄을 시작해. 공백은 세지 않아! 단어 길이의 합만 중요해."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>
            {t(E, "The Key Rule: Count Characters, Not Spaces!", "핵심 규칙: 글자만 세고, 공백은 안 세!")}
          </div>
          <div style={{ background: "#fef2f2", borderRadius: 10, padding: 12, border: "2px solid #fca5a5" }}>
            <div style={{ fontSize: 12, lineHeight: 2, color: C.text }}>
              {t(E, "Words: ", "단어: ")}
              {["hello", "my", "name"].map((w, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ color: "#dc2626", fontWeight: 800 }}> + </span>}
                  <WordBox word={w} color={wColors[i]} size={w.length} />
                </span>
              ))}
            </div>
            <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text }}>
              <div>{t(E, "K = 8 (max chars per line)", "K = 8 (줄당 최대 글자)")}</div>
              <div style={{ marginTop: 4 }}>
                <span style={{ color: "#3b82f6", fontWeight: 800 }}>5</span>
                {" + "}
                <span style={{ color: "#10b981", fontWeight: 800 }}>2</span>
                {" = 7 "}
                <span style={{ color: "#059669", fontWeight: 800 }}>{"<= 8 ✓"}</span>
              </div>
              <div>
                {"7 + "}
                <span style={{ color: "#f59e0b", fontWeight: 800 }}>4</span>
                {" = 11 "}
                <span style={{ color: "#dc2626", fontWeight: 800 }}>{"> 8 ✗"}</span>
                {t(E, " → new line!", " → 새 줄!")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <LineViz words={["hello", "my"]} colors={["#3b82f6", "#10b981"]} K={8} lineNum={1} E={E} />
            <LineViz words={["name"]} colors={["#f59e0b"]} K={8} lineNum={2} E={E} />
          </div>
        </div>),
    },
    // 1-3: Quiz — does space count?
    {
      type: "quiz",
      narr: t(E,
        "Important detail: when counting characters per line, do spaces between words count?", "중요한 세부사항: 줄당 글자 수를 셀 때, 단어 사이의 공백도 세나?"),
      question: t(E,
        "Do spaces between words count toward the K character limit?",
        "단어 사이의 공백이 K글자 제한에 포함되나?"),
      options: [
        t(E, "Yes, spaces count too", "네, 공백도 포함"),
        t(E, "No, only word characters count", "아니요, 단어 글자만 포함"),
        t(E, "Depends on the line", "줄에 따라 다름"),
      ],
      correct: 1,
      explain: t(E,
        "Only word characters count! The K limit is the sum of word lengths, NOT counting spaces. This is explicitly stated in the problem!",
        "단어 글자만 세! K 제한은 단어 길이의 합이고, 공백은 세지 않아. 이건 문제에서 명시적으로 나와 있어!"),
    },
    // 1-4: Line fitting example
    {
      type: "reveal",
      narr: t(E,
        "Let's trace a bigger example!\nWords: [\"ab\", \"cd\", \"ef\", \"gh\"], K=5.\nWe add words greedily until the next one doesn't fit.", "더 큰 예시를 추적해보자! 단어: [\"ab\", \"cd\", \"ef\", \"gh\"], K=5. 다음 단어가 안 들어갈 때까지 그리디하게 추가해."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 8 }}>
            {t(E, "Trace: K=5", "추적: K=5")}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              <thead>
                <tr style={{ background: "#fef2f2" }}>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626", textAlign: "left" }}>{t(E, "Word", "단어")}</th>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>len</th>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>cur+len</th>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>{t(E, "Fits?", "들어감?")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["ab", 2, "0+2=2", "2<=5 ✓"],
                  ["cd", 2, "2+2=4", "4<=5 ✓"],
                  ["ef", 2, "4+2=6", "6>5 ✗ new!"],
                  ["gh", 2, "2+2=4", "4<=5 ✓"],
                ].map(([w, len, calc, fits], i) => (
                  <tr key={i} style={{ background: fits.includes("✗") ? "#fef2f2" : "#fff" }}>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", fontWeight: 800, color: wColors[i] }}>{w}</td>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", textAlign: "center" }}>{len}</td>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", textAlign: "center" }}>{calc}</td>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", textAlign: "center", fontWeight: 800, color: fits.includes("✓") ? "#059669" : "#dc2626" }}>{fits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8 }}>
            <LineViz words={["ab", "cd"]} colors={["#3b82f6", "#10b981"]} K={5} lineNum={1} E={E} />
            <LineViz words={["ef", "gh"]} colors={["#f59e0b", "#8b5cf6"]} K={5} lineNum={2} E={E} />
          </div>
        </div>),
    },
    // 1-5: Quiz — count lines
    {
      type: "quiz",
      narr: t(E,
        "Words [\"ab\",\"cd\",\"ef\"], K=5.\nab(2)+cd(2)=4, fits.\n4+ef(2)=6>5, new line.\nSo 2 lines!", "단어 [\"ab\",\"cd\",\"ef\"], K=5. ab(2)+cd(2)=4, 들어감. 4+ef(2)=6>5, 새 줄. 그래서 2줄!"),
      question: t(E,
        "Words [\"ab\",\"cd\",\"ef\"], K=5. How many lines?",
        "단어 [\"ab\",\"cd\",\"ef\"], K=5. 몇 줄?"),
      options: [
        t(E, "1 line", "1줄"),
        t(E, "2 lines", "2줄"),
        t(E, "3 lines", "3줄"),
      ],
      correct: 1,
      explain: t(E,
        "ab(2)+cd(2)=4 <= 5. Add ef: 4+2=6 > 5, new line. Line 1: [ab, cd]. Line 2: [ef]. Total: 2 lines!",
        "ab(2)+cd(2)=4 <= 5. ef 추가: 4+2=6 > 5, 새 줄. 1줄: [ab, cd]. 2줄: [ef]. 총: 2줄!"),
    },
    // 1-6: Input practice
    {
      type: "input",
      narr: t(E,
        "Try it!\nWords [\"aaa\", \"bb\", \"cc\", \"d\"], K=4.\naaa(3) fits.\n3+bb(2)=5>4, new line.\nbb(2)+cc(2)=4<=4.\n4+d(1)=5>4, new line.\n3 lines!", "해봐!\n단어 [\"aaa\", \"bb\", \"cc\", \"d\"], K=4.\naaa(3) 들어감.\n3+bb(2)=5>4, 새 줄.\nbb(2)+cc(2)=4<=4.\n4+d(1)=5>4, 새 줄.\n3줄!"),
      question: t(E,
        "Words [\"aaa\",\"bb\",\"cc\",\"d\"], K=4. How many output lines?",
        "단어 [\"aaa\",\"bb\",\"cc\",\"d\"], K=4. 출력 줄 수?"),
      hint: t(E,
        "Line 1: aaa(3). Line 2: bb+cc(4). Line 3: d(1). → 3 lines",
        "1줄: aaa(3). 2줄: bb+cc(4). 3줄: d(1). → 3줄"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 알고리즘 시뮬레이션 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWordProcCh2(E) {
  const wColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];
  return [
    // 2-1: Greedy algorithm walkthrough
    {
      type: "reveal",
      narr: t(E,
        "The greedy strategy: scan words left to right.\nTrack cur_len (total chars on current line).\nIf adding the next word exceeds K, flush the current line and start fresh!", "그리디 전략: 단어를 왼쪽에서 오른쪽으로 스캔.\ncur_len (현재 줄의 총 글자 수)을 추적.\n다음 단어를 추가하면 K를 초과하면 현재 줄을 출력하고 새로 시작!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 8 }}>
            {t(E, "Greedy Algorithm", "그리디 알고리즘")}
          </div>
          <div style={{ background: "#fef2f2", borderRadius: 10, padding: 12, border: "2px solid #fca5a5" }}>
            <div style={{ fontSize: 12, lineHeight: 2.2, color: C.text }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#dc2626", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, flexShrink: 0 }}>1</span>
                {t(E, "Start with empty line (cur_len = 0)", "빈 줄로 시작 (cur_len = 0)")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#dc2626", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, flexShrink: 0 }}>2</span>
                {t(E, "For each word: check if cur_len + len(word) > K", "각 단어마다: cur_len + len(word) > K 확인")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#dc2626", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, flexShrink: 0 }}>3</span>
                {t(E, "If yes → flush current line, start new", "초과하면 → 현재 줄 출력, 새 줄 시작")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#dc2626", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, flexShrink: 0 }}>4</span>
                {t(E, "Add word to current line, cur_len += len(word)", "현재 줄에 단어 추가, cur_len += len(word)")}
              </div>
            </div>
          </div>
        </div>),
    },
    // 2-2: Detailed trace with state table
    {
      type: "reveal",
      narr: t(E,
        "Let's trace: words=[\"the\",\"dog\",\"is\",\"a\",\"good\",\"boy\"], K=6.", "추적해보자: words=[\"the\",\"dog\",\"is\",\"a\",\"good\",\"boy\"], K=6."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 8 }}>
            {t(E, "Trace: K=6", "추적: K=6")}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>
              <thead>
                <tr style={{ background: "#fef2f2" }}>
                  <th style={{ padding: "5px 4px", borderBottom: "2px solid #fca5a5", color: "#dc2626", textAlign: "left" }}>{t(E, "Word", "단어")}</th>
                  <th style={{ padding: "5px 4px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>len</th>
                  <th style={{ padding: "5px 4px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>cur+len</th>
                  <th style={{ padding: "5px 4px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>{t(E, ">K?", ">K?")}</th>
                  <th style={{ padding: "5px 4px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>{t(E, "Action", "동작")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["the", 3, "0+3=3", "3<=6", t(E, "add", "추가")],
                  ["dog", 3, "3+3=6", "6<=6", t(E, "add", "추가")],
                  ["is", 2, "6+2=8", "8>6", t(E, "flush! add", "출력! 추가")],
                  ["a", 1, "2+1=3", "3<=6", t(E, "add", "추가")],
                  ["good", 4, "3+4=7", "7>6", t(E, "flush! add", "출력! 추가")],
                  ["boy", 3, "4+3=7", "7>6", t(E, "flush! add", "출력! 추가")],
                ].map(([w, len, calc, cmp, act], i) => (
                  <tr key={i} style={{ background: act.includes("flush") ? "#fef2f2" : "#fff" }}>
                    <td style={{ padding: "4px 4px", borderBottom: "1px solid #fde2e2", fontWeight: 800, color: wColors[i] }}>{w}</td>
                    <td style={{ padding: "4px 4px", borderBottom: "1px solid #fde2e2", textAlign: "center" }}>{len}</td>
                    <td style={{ padding: "4px 4px", borderBottom: "1px solid #fde2e2", textAlign: "center" }}>{calc}</td>
                    <td style={{ padding: "4px 4px", borderBottom: "1px solid #fde2e2", textAlign: "center", color: cmp.includes(">") ? "#dc2626" : "#059669", fontWeight: 700 }}>{cmp}</td>
                    <td style={{ padding: "4px 4px", borderBottom: "1px solid #fde2e2", textAlign: "center", fontWeight: act.includes("flush") ? 800 : 400, color: act.includes("flush") ? "#dc2626" : C.text }}>{act}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 10 }}>
            <LineViz words={["the", "dog"]} colors={["#3b82f6", "#10b981"]} K={6} lineNum={1} E={E} />
            <LineViz words={["is", "a"]} colors={["#f59e0b", "#8b5cf6"]} K={6} lineNum={2} E={E} />
            <LineViz words={["good"]} colors={["#ec4899"]} K={6} lineNum={3} E={E} />
            <LineViz words={["boy"]} colors={["#06b6d4"]} K={6} lineNum={4} E={E} />
          </div>
        </div>),
    },
    // 2-3: Quiz on edge case
    {
      type: "quiz",
      narr: t(E,
        "Edge case: what if a single word is exactly K characters long?\nIt fills the entire line by itself!", "엣지 케이스: 단어 하나가 정확히 K글자라면? 혼자서 한 줄을 전부 채워!"),
      question: t(E,
        "Words [\"abcde\", \"fg\"], K=5. Word 1 is exactly 5 chars. What happens?",
        "단어 [\"abcde\", \"fg\"], K=5. 단어 1이 정확히 5글자. 무슨 일이 일어나?"),
      options: [
        t(E, "Both words on line 1", "두 단어 모두 1줄"),
        t(E, "abcde on line 1, fg on line 2", "abcde는 1줄, fg는 2줄"),
        t(E, "Error — word too long", "에러 — 단어가 너무 길어"),
      ],
      correct: 1,
      explain: t(E,
        "abcde(5)=5 <= 5, fits! Then 5+fg(2)=7 > 5, new line. Line 1: [abcde], Line 2: [fg].",
        "abcde(5)=5 <= 5, 들어감! 그다음 5+fg(2)=7 > 5, 새 줄. 1줄: [abcde], 2줄: [fg]."),
    },
    // 2-4: Practice input
    {
      type: "input",
      narr: t(E,
        "Words [\"aa\",\"bb\",\"cc\",\"dd\",\"ee\"], K=4.\naa(2)+bb(2)=4.\n4+cc(2)=6>4.\ncc(2)+dd(2)=4.\n4+ee(2)=6>4.\nLines: [aa,bb], [cc,dd], [ee].\n3 lines!", "단어 [\"aa\",\"bb\",\"cc\",\"dd\",\"ee\"], K=4.\naa(2)+bb(2)=4.\n4+cc(2)=6>4.\ncc(2)+dd(2)=4.\n4+ee(2)=6>4.\n줄: [aa,bb], [cc,dd], [ee].\n3줄!"),
      question: t(E,
        "Words [\"aa\",\"bb\",\"cc\",\"dd\",\"ee\"], K=4. How many lines?",
        "단어 [\"aa\",\"bb\",\"cc\",\"dd\",\"ee\"], K=4. 몇 줄?"),
      hint: t(E,
        "[aa,bb]=4, [cc,dd]=4, [ee]=2. Three lines!",
        "[aa,bb]=4, [cc,dd]=4, [ee]=2. 3줄!"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWordProcCh3(E, lang = "py") {
  return [
    // 3-1: Read input
    {
      type: "reveal",
      narr: t(E,
        "Step 1: Read N (word count) and K (max chars per line), then read all the words.", "1단계: N(단어 수)과 K(줄당 최대 글자)를 읽고, 모든 단어를 읽어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <CodeSnippet
            lines={[
              "N, K = map(int, input().split())",
              "words = input().split()",
            ]}
            highlight={[0, 1]}
          />
          <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.5 }}>
            {t(E,
              "All N words are on a single line, separated by spaces. split() breaks them apart.",
              "N개 단어가 한 줄에 공백으로 구분. split()으로 나눠.")}
          </div>
        </div>),
    },
    // 3-2: Initialize tracking variables
    {
      type: "reveal",
      narr: t(E,
        "Step 2: We need to track the current line (list of words) and its total character count.\nPlus a list to collect all finished lines.", "2단계: 현재 줄(단어 리스트)과 총 글자 수를 추적해야 해. 완성된 줄을 모을 리스트도 필요해."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 2: Initialize variables", "2단계: 변수 초기화")}
          </div>
          <CodeSnippet
            lines={[
              "N, K = map(int, input().split())",
              "words = input().split()",
              "",
              "lines = []",
              "cur_line = []",
              "cur_len = 0",
            ]}
            highlight={[3, 4, 5]}
          />
          <div style={{ marginTop: 8, background: "#fef2f2", borderRadius: 8, padding: 8, border: "1.5px solid #fca5a5", fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div><span style={{ fontWeight: 800, color: "#dc2626" }}>lines</span> = {t(E, "list of finished lines", "완성된 줄들의 리스트")}</div>
            <div><span style={{ fontWeight: 800, color: "#dc2626" }}>cur_line</span> = {t(E, "words on the current line", "현재 줄의 단어들")}</div>
            <div><span style={{ fontWeight: 800, color: "#dc2626" }}>cur_len</span> = {t(E, "total chars on current line", "현재 줄의 총 글자 수")}</div>
          </div>
        </div>),
    },
    // 3-3: Main loop
    {
      type: "reveal",
      narr: t(E,
        "Step 3: The main loop!\nFor each word: check if adding it would exceed K.\nIf so, flush the current line first.\nThen add the word.", "3단계: 메인 루프! 각 단어마다: 추가하면 K를 초과하는지 확인. 초과하면 현재 줄을 먼저 출력. 그 다음 단어를 추가."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 3: The greedy loop", "3단계: 그리디 루프")}
          </div>
          <CodeSnippet
            lines={[
              "for w in words:",
              "    wl = len(w)",
              "    if cur_len + wl > K and cur_line:",
              "        lines.append(' '.join(cur_line))",
              "        cur_line = []",
              "        cur_len = 0",
              "    cur_line.append(w)",
              "    cur_len += wl",
            ]}
            highlight={[0, 1, 2, 3, 4, 5, 6, 7]}
          />
          <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 800, color: "#dc2626", marginBottom: 4 }}>
              {t(E, "Key logic:", "핵심 로직:")}
            </div>
            <div>{t(E, "Check BEFORE adding: if overflow → flush", "추가 전에 확인: 초과하면 → 출력")}</div>
            <div>{t(E, "Then ALWAYS add the word to current line", "그 다음 항상 현재 줄에 단어 추가")}</div>
          </div>
        </div>),
    },
    // 3-4: Quiz on code logic
    {
      type: "quiz",
      narr: t(E,
        "Why do we check 'and cur_line' in the if condition? What if cur_line is empty?", "if 조건에서 'and cur_line'을 왜 확인할까? cur_line이 비어있으면?"),
      question: t(E,
        "Why 'and cur_line' in the overflow check?",
        "초과 확인에서 'and cur_line'이 왜 필요할까?"),
      options: [
        t(E, "No reason, just extra safety", "이유 없음, 그냥 추가 안전장치"),
        t(E, "Don't flush an empty line — always add at least one word", "빈 줄을 출력하지 않기 위해 — 최소 한 단어는 추가"),
        t(E, "To check if K is positive", "K가 양수인지 확인하려고"),
      ],
      correct: 1,
      explain: t(E,
        "If cur_line is empty, we haven't added any word yet. We must add the current word even if it alone exceeds K (guaranteed not to happen by constraints, but good practice)!",
        "cur_line이 비어있으면 아직 단어를 추가하지 않은 거야. 현재 단어를 반드시 추가해야 해!"),
    },
    // 3-5: Complete code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getWordProcSections(E),
    },
  ];
}
