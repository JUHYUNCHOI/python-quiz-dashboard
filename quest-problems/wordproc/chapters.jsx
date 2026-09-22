import { C, t } from "@/components/quest/theme";
import { getWordProcSections, WordProcLineWrapSim } from "./components";

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
      const baseColor = isHl ? "#fca5a5" : "#e2e8f0";
      const tokens = pyHighlight(l, baseColor);
      return (
        <div key={i} style={{
          display: "flex", minHeight: 20,
          background: isHl ? "rgba(220,38,38,.12)" : "transparent",
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

/* Helper: word box */
const WordBox = ({ word, color, size }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    padding: "4px 10px", borderRadius: 8, fontSize: 13, fontWeight: 700,
    fontFamily: "'JetBrains Mono',monospace",
    background: `${color}15`, border: `1px solid ${color}`,
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
        <div style={{ fontSize: 10, fontWeight: 600, color: C.dim }}>
          {isE ? `Line ${lineNum}` : `${lineNum}줄`}
        </div>
        <div style={{
          fontSize: 10, fontWeight: 600, color: totalLen <= K ? "#059669" : "#dc2626",
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
      /* 2026-09-22, PM 판정 ⑤: 영어 narr 이 287자 4문장 — 아래 미션·문제 카드와
         내용이 거의 그대로 겹쳤다. 한국어(24자 요약)와 같은 길이로 맞췄다. */
      narr: t(E,
        "Words go into a line; overflow starts a new one.",
        "단어를 순서대로 줄에 담다가 넘치면 새 줄로 넘어가요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📝"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Word Processor</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2020 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Print the resulting document — each line at most K letters of words, words separated by single spaces.",
                "각 줄의 글자 수 합이 K 를 넘지 않게 문서를 출력해요.")}
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
                  {t(E, "You're given ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N words in order", "순서대로 N개의 단어")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each line holds at most ", "각 줄에 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "K letters total", "글자 수 합이 최대 K")}</b>
                  {t(E, " (spaces between words don't count).",
                        " 까지 들어가요 (단어 사이 공백은 안 셈).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Process words in order: each word ", "단어를 순서대로: 각 단어가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "joins the current line if it still fits", "현재 줄에 들어가면 그 줄에 추가")}</b>
                  {t(E, ", otherwise it starts a NEW line.",
                        ", 안 들어가면 새 줄을 시작해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the resulting document, ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "one line per row, words separated by single spaces", "한 줄씩, 단어 사이 공백 1개")}</b>
                  {t(E, ".", " 로 결과 문서를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    /* 1-2: 입출력 형식 + 제약 카드 (2026-09-22, PM 판정 ②)
       auditor·pedagogy·student 셋이 따로 짚었다 — 제약이 화면 어디에도 없고,
       진짜 파일 형식(word.in/word.out)이 12쪽 코드에서야 처음 나오고, 최종 코드
       주석 "단어 길이 합이 K 이하" 를 이해할 자리가 없었다.
       예제는 auditor 가 usaco.org(cpid=987) 원문에서 확인한 진짜 샘플이다 —
       words=[hello,my,name,is,Bessie,and,this,is,my,essay], N=10, K=7 →
       그리디로 손으로 짚어도 6줄이 나온다(hello my / name is / Bessie /
       and this / is my / essay). 우리가 지어낸 예제가 아니다.
       형제(moohunt) 의 INPUT/OUTPUT 2박스 + makedistinct 의 CONSTRAINTS 박스를
       그대로 복사했다 — 새로 발명하지 않았다. */
    {
      type: "reveal",
      narr: t(E,
        "File I/O: word.in has N, K, then the words.",
        "파일로 입출력해요 — word.in 에 N, K, 단어들."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
            📥 {t(E, "Sample I/O (word.in / word.out)", "샘플 입출력 (word.in / word.out)")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.6 }}>
              <div style={{ color: "#94a3b8", marginBottom: 4 }}>word.in</div>
              <div>10 7</div>
              <div style={{ wordBreak: "break-all" }}>hello my name is Bessie and this is my essay</div>
            </div>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.6 }}>
              <div style={{ color: "#94a3b8", marginBottom: 4 }}>word.out</div>
              <div>hello my</div>
              <div>name is</div>
              <div>Bessie</div>
              <div>and this</div>
              <div>is my</div>
              <div>essay</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
                {t(E, <>First line: <b>N K</b> — word count, then max letters per line.<br />Second line: all <b>N</b> words, separated by spaces.</>,
                     <>첫 줄: <b>N K</b> — 단어 개수, 그리고 한 줄 최대 글자 수.<br />둘째 줄: <b>N</b>개 단어가 공백으로 이어져요.</>)}
              </div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
                {t(E, <>The document, <b>one line per row</b>.</>,
                     <>문서를 <b>한 줄씩</b> 출력해요.</>)}
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100</div>
              <div>1 ≤ K ≤ 80</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "each word: 1–15 letters, English letters only", "단어 하나: 1~15자, 영문자만")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-3: Rules explained with visual
    {
      type: "reveal",
      /* 2026-09-22, PM 판정 ⑤: 영어 156자 3문장 — 카드 제목·본문과 겹쳤다. */
      narr: t(E,
        "Spaces don't count — only word lengths matter.",
        "공백은 세지 않아요. 단어 글자 수의 합만 보면 돼요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 10 }}>
            {t(E, "The Key Rule: Count Characters, Not Spaces!", "핵심 규칙: 글자만 세고 공백은 세지 않아요")}
          </div>
          <div style={{ background: "#fef2f2", borderRadius: 10, padding: 12, border: "1px solid #fca5a5" }}>
            <div style={{ fontSize: 12, lineHeight: 2, color: C.text }}>
              {t(E, "Words: ", "단어: ")}
              {["hello", "my", "name"].map((w, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ color: "#dc2626", fontWeight: 600 }}> + </span>}
                  <WordBox word={w} color={wColors[i]} size={w.length} />
                </span>
              ))}
            </div>
            <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text }}>
              <div>{t(E, "K = 8 (max chars per line)", "K = 8 (줄당 최대 글자)")}</div>
              <div style={{ marginTop: 4 }}>
                <span style={{ color: "#3b82f6", fontWeight: 600 }}>5</span>
                {" + "}
                <span style={{ color: "#10b981", fontWeight: 600 }}>2</span>
                {" = 7 "}
                <span style={{ color: "#059669", fontWeight: 600 }}>{"<= 8 ✓"}</span>
              </div>
              <div>
                {"7 + "}
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>4</span>
                {" = 11 "}
                <span style={{ color: "#dc2626", fontWeight: 600 }}>{"> 8 ✗"}</span>
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
    // 1-4: Quiz — does space count?
    {
      type: "quiz",
      narr: t(E,
        "Important detail: when counting characters per line, do spaces between words count?", "한 줄의 글자 수를 셀 때 공백도 같이 셀까요?"),
      question: t(E,
        "Do spaces between words count toward the K character limit?",
        "단어 사이의 공백도 K 에 포함될까요?"),
      options: [
        t(E, "Yes, spaces count too", "네, 공백도 세요"),
        t(E, "No, only word characters count", "아니요, 단어 글자만 세요"),
        t(E, "Depends on the line", "줄에 따라 달라요"),
      ],
      correct: 1,
      explain: t(E,
        "Only word characters count! The K limit is the sum of word lengths, NOT counting spaces. This is explicitly stated in the problem!",
        "단어 글자만 세요. K 는 단어 길이의 합이고 공백은 빼요.\n문제에 그렇게 적혀 있어요."),
    },
    // 1-5: Line fitting example
    {
      type: "reveal",
      /* 2026-09-09: 이 narr 이 답을 미리 계산해서 말하고 있었다.
         narr 은 질문과 무관하게 항상 먼저 뜬다 — 안 풀어도 읽기만 하면 답이 보였다.
         상황만 남기고 계산은 뺐다. 찾은 도구: scripts/check-quiz-spoiler.py */
      narr: t(E,
        "Let's trace a bigger example!\nWords: [\"ab\", \"cd\", \"ef\", \"gh\"], K=5.\nWe add words greedily until the next one doesn't fit.", "단어 네 개를 K=5 로 한 줄씩 담아 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
            {t(E, "Trace: K=5", "추적: K=5")}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              <thead>
                <tr style={{ background: "#fef2f2" }}>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626", textAlign: "left" }}>{t(E, "Word", "단어")}</th>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>len</th>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>cur+len</th>
                  <th style={{ padding: "6px 6px", borderBottom: "2px solid #fca5a5", color: "#dc2626" }}>{t(E, "Fits?", "들어가요?")}</th>
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
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", fontWeight: 600, color: wColors[i] }}>{w}</td>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", textAlign: "center" }}>{len}</td>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", textAlign: "center" }}>{calc}</td>
                    <td style={{ padding: "5px 6px", borderBottom: "1px solid #fde2e2", textAlign: "center", fontWeight: 600, color: fits.includes("✓") ? "#059669" : "#dc2626" }}>{fits}</td>
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
    // 1-6: Quiz — count lines
    {
      type: "quiz",
      narr: t(E,
        "Words [\"ab\",\"cd\",\"ef\"], K=5. Fill a line from the front.", "단어 [\"ab\",\"cd\",\"ef\"], K=5. 앞에서부터 한 줄에 담아봐요."),
      question: t(E,
        "Words [\"ab\",\"cd\",\"ef\"], K=5. How many lines?",
        "단어 [\"ab\",\"cd\",\"ef\"], K=5 면 몇 줄이 될까요?"),
      options: [
        t(E, "1 line", "1줄"),
        t(E, "2 lines", "2줄"),
        t(E, "3 lines", "3줄"),
      ],
      correct: 1,
      explain: t(E,
        "ab(2)+cd(2)=4 <= 5. Add ef: 4+2=6 > 5, new line. Line 1: [ab, cd]. Line 2: [ef]. Total: 2 lines!",
        "ab(2)+cd(2)=4 라서 5 안에 들어가요.\nef 를 더하면 6 이 되어 넘치니 새 줄이에요. 그래서 2줄이에요."),
    },
    // 1-7: Input practice
    {
      type: "input",
      narr: t(E,
        "Walk through the words yourself, packing each into the current line until it overflows.",
        "현재 줄에 넣다가 K 를 넘으면 새 줄로 가요."),
      question: t(E,
        "Words [\"aaa\",\"bb\",\"cc\",\"d\"], K=4. How many output lines?",
        "단어 [\"aaa\",\"bb\",\"cc\",\"d\"], K=4 면 몇 줄이 나올까요?"),
      hint: t(E,
        "Try adding each word in order. When the running sum would pass K, start a new line.",
        "단어를 순서대로 더해요. 합이 K 를 넘으면 새 줄이에요."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 알고리즘 시뮬레이션 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWordProcCh2(E) {
  return [
    // 2-1: Greedy algorithm walkthrough
    {
      type: "reveal",
      /* 2026-09-22, PM 판정 ⑤: 영어 166자 3문장 — 아래 4단계 목록과 겹쳤다. */
      narr: t(E,
        "Scan left to right, tracking the current line's length.",
        "현재 줄의 글자 수만 들고 왼쪽부터 하나씩 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
            {t(E, "Greedy Algorithm", "그리디 알고리즘")}
          </div>
          <div style={{ background: "#fef2f2", borderRadius: 10, padding: 12, border: "1px solid #fca5a5" }}>
            {/* 2026-09-22, pedagogy 승인 문구 (그대로 씀 — 고쳐 쓰지 않는다).
                "그리디" 가 이 quest 전체에서 처음 등장하는 자리라 정의 한 줄을 붙인다.
                reverseeng/sims.jsx:126-127 의 문구와 일부러 맞췄다. */}
            <div style={{ fontSize: 12.5, color: "#7f1d1d", lineHeight: 1.7, marginBottom: 10, wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "If the word we're looking at fits, we add it right now and never reconsider later. This is called a greedy method — you'll meet that name again in the code.",
                "지금 보는 단어가 줄에 들어가면 바로 넣고, 나중에 다시 고민하지 않아요. 이런 방법을 탐욕적(그리디) 방법이라고 불러요 — 코드에서도 이 이름을 다시 만나요.")}
            </div>
            <div style={{ fontSize: 12, lineHeight: 2.2, color: C.text }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#dc2626", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>1</span>
                {t(E, "Start with empty line (cur_len = 0)", "빈 줄로 시작 (cur_len = 0)")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#dc2626", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>2</span>
                {t(E, "For each word: check if cur_len + len(word) > K", "단어마다 cur_len + len(word) > K 인지 확인해요")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#dc2626", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>3</span>
                {t(E, "If yes → flush current line, start new", "넘치면 현재 줄을 출력하고 새 줄을 시작해요")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#dc2626", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>4</span>
                {t(E, "Add word to current line, cur_len += len(word)", "현재 줄에 단어 추가, cur_len += len(word)")}
              </div>
            </div>
          </div>
        </div>),
    },
    /* 2-2, 2-3, 2-4: 옛 "8쪽 트레이스 표" 를 지우고 그 자리에 시뮬을 당겼다.
       (2026-09-22, PM 판정 ③) pedagogy·student 가 각자 짚었다 — 4쪽(Ch1) 과
       이 표가 포맷만 다르고 같은 정보를 두 번, 시뮬(당시 9쪽)에 닿을 때는 이미
       답을 세 번 본 뒤라 시뮬이 발견이 아니라 검산이었다.
       pedagogy 가 준 걸음 목록대로 셋으로 쪼갰다 — ①고정 예시 ②하나 더 추가해
       넘치는 것까지 ③그다음에 자유 편집. 예시는 **새로 안 만들고** 1-3쪽(Ch1,
       "핵심 규칙" 카드)에서 이미 쓴 hello/my/name, K=8 을 그대로 재사용한다 —
       같은 숫자를 새로 보여주는 게 아니라 이미 본 것을 되짚어 다음으로 잇는다. */
    // 2-2: Step 1 — hello + my fit
    {
      type: "reveal",
      narr: t(E,
        "We added hello and my — still under 8.", "hello 와 my 를 넣었어요 — 아직 8 이하예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
            {t(E, "Step 1: hello + my", "1단계: hello + my")}
          </div>
          <LineViz words={["hello", "my"]} colors={["#3b82f6", "#10b981"]} K={8} lineNum={1} E={E} />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "5 + 2 = 7  ≤  8, still fits.", "5 + 2 = 7, 8 이하라 들어가요.")}
          </div>
        </div>),
    },
    // 2-3: Step 2 — add name, overflow
    {
      type: "reveal",
      narr: t(E,
        "Adding name makes 11 — over 8, so it starts a new line.", "name 을 더하면 11이 되어 8을 넘겨서 새 줄로 가요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
            {t(E, "Step 2: add name", "2단계: name 을 더하면")}
          </div>
          <div style={{ marginBottom: 8, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "7 + 4 = 11  >  8  →  overflow, new line", "7 + 4 = 11 > 8 → 넘쳐서 새 줄")}
          </div>
          <LineViz words={["hello", "my"]} colors={["#3b82f6", "#10b981"]} K={8} lineNum={1} E={E} />
          <LineViz words={["name"]} colors={["#f59e0b"]} K={8} lineNum={2} E={E} />
        </div>),
    },
    // 2-4: Step 3 — free-edit sim, starting from the same example
    {
      type: "reveal",
      narr: t(E,
        "Now change K and the words yourself.", "이제 K 와 단어를 직접 바꿔 봐요."),
      content: <WordProcLineWrapSim E={E} />,
    },
    // 2-5: Quiz on edge case
    {
      type: "quiz",
      narr: t(E,
        "Edge case: what if a single word is exactly K characters long?\nIt fills the entire line by itself!", "단어 하나가 딱 K 글자면 어떻게 될까요?"),
      question: t(E,
        "Words [\"abcde\", \"fg\"], K=5. Word 1 is exactly 5 chars. What happens?",
        "단어 [\"abcde\", \"fg\"], K=5 예요. 첫 단어가 딱 5글자면 어떻게 될까요?"),
      options: [
        t(E, "Both words on line 1", "두 단어 모두 1줄"),
        t(E, "abcde on line 1, fg on line 2", "abcde는 1줄, fg는 2줄"),
        t(E, "Error — word too long", "에러 — 단어가 너무 길어요"),
      ],
      correct: 1,
      explain: t(E,
        "abcde(5)=5 <= 5, fits! Then 5+fg(2)=7 > 5, new line. Line 1: [abcde], Line 2: [fg].",
        "abcde 는 5글자라서 딱 들어가요.\n여기에 fg 를 더하면 7 이 되어 넘치니 fg 는 새 줄이에요."),
    },
    // 2-6: Practice input
    {
      type: "input",
      narr: t(E,
        "Try this packing yourself.  How many words fit per line, and how many lines total?",
        "한 줄에 몇 단어가 들어가는지 세어 봐요."),
      question: t(E,
        "Words [\"aa\",\"bb\",\"cc\",\"dd\",\"ee\"], K=4. How many lines?",
        "단어 [\"aa\",\"bb\",\"cc\",\"dd\",\"ee\"], K=4 면 몇 줄이 될까요?"),
      hint: t(E,
        "Each word is 2 letters; line cap is 4.  How many fit per line?",
        "단어마다 2 글자이고 한 줄 한도는 4 예요.\n한 줄에 몇 개가 들어갈까요?"),
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
        "The answer is the document, filled line by line. So first, read N, K and the words.", "답은 줄마다 채운 문서예요. 먼저 N, K 와 단어들을 읽어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <CodeSnippet
            lines={[
              "with open('word.in') as file:",
              "    file_lines = file.readlines()",
              "N, K = map(int, file_lines[0].split())",
              "words = file_lines[1].split()",
            ]}
            highlight={[0, 1, 2, 3]}
          />
          <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.5 }}>
            {t(E,
              "All N words are on a single line, separated by spaces. split() breaks them apart.",
              "N 개 단어가 한 줄에 공백으로 붙어 와요. split() 으로 나눠요.")}
          </div>
        </div>),
    },
    // 3-2: Initialize tracking variables
    {
      type: "reveal",
      narr: t(E,
        "We need to remember the line so far, so set up three tracking variables.", "줄 상태를 저장해야 하니까, 변수 셋을 만들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 2: Initialize variables", "2단계: 변수를 처음 값으로")}
          </div>
          <CodeSnippet
            lines={[
              "with open('word.in') as file:",
              "    file_lines = file.readlines()",
              "N, K = map(int, file_lines[0].split())",
              "words = file_lines[1].split()",
              "",
              "lines = []",
              "cur_line = []",
              "cur_len = 0",
            ]}
            highlight={[5, 6, 7]}
          />
          <div style={{ marginTop: 8, background: "#fef2f2", borderRadius: 8, padding: 8, border: "1.5px solid #fca5a5", fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div><span style={{ fontWeight: 600, color: "#dc2626" }}>lines</span> = {t(E, "list of finished lines", "완성된 줄들의 리스트")}</div>
            <div><span style={{ fontWeight: 600, color: "#dc2626" }}>cur_line</span> = {t(E, "words on the current line", "현재 줄의 단어들")}</div>
            <div><span style={{ fontWeight: 600, color: "#dc2626" }}>cur_len</span> = {t(E, "total chars on current line", "현재 줄의 총 글자 수")}</div>
          </div>
        </div>),
    },
    // 3-3: Main loop
    {
      type: "reveal",
      narr: t(E,
        "Before adding each word, check if it would overflow — if so, flush the line first.", "단어를 넣기 전에 규칙대로 넘치는지부터 확인해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>
            {t(E, "Step 3: The greedy loop", "3단계: 그리디 반복")}
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
          {/* 2026-09-22, pedagogy 승인. 바로 앞 쪽(3-2) 의 "이름 = 뜻" 박스를
              그대로 복제했다 — 새 스타일을 발명하지 않는다.
              ⚠️ "and cur_line" 은 여기서 설명하지 않는다 — 바로 다음 쪽 퀴즈가
              그 질문을 묻는다. 여기서 답하면 퀴즈를 스포일한다(pedagogy 판정). */}
          <div style={{ marginTop: 8, background: "#fef2f2", borderRadius: 8, padding: 8, border: "1.5px solid #fca5a5", fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div><span style={{ fontWeight: 600, color: "#dc2626" }}>wl</span> = {t(E, "this word's letter count (short for \"word length\")", "이 단어의 글자 수 (word length 줄임말)")}</div>
            <div><span style={{ fontWeight: 600, color: "#dc2626" }}>{"' '.join(cur_line)"}</span> = {t(E, "the join from Lesson 18 — glues cur_line's words together with spaces", "레슨 18 join — cur_line 단어들을 공백으로 이어 붙여 문자열 하나로 만들어요")}</div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 600, color: "#dc2626", marginBottom: 4 }}>
              {t(E, "Key logic:", "핵심 방법:")}
            </div>
            <div>{t(E, "Check BEFORE adding: if overflow → flush", "넣기 전에 확인하고, 넘치면 줄을 출력해요")}</div>
            <div>{t(E, "Then ALWAYS add the word to current line", "그 다음에는 언제나 현재 줄에 단어를 넣어요")}</div>
          </div>
        </div>),
    },
    /* 3-4: Quiz on code logic (2026-09-22, PM 판정 ④)
       학생: "정답은 맞췄지만 이 쪽엔 if문 코드 자체가 안 보였다 — 14쪽 코드를
       기억해서 풀어야 했다." → hint 에 그 줄을 그대로 붙여, 앞 쪽 기억에
       기대지 않게 한다 (memory/feedback_screen_must_not_rely_on_memory.md).
       pedagogy: "정답 해설이 스스로 '이 문제에선 안 일어난다' 고 인정한다.
       학생은 '그럼 왜 물어본 거지' 가 된다." — 영어 explain 의 자기모순
       괄호("guaranteed not to happen... but good practice")를 뺐다.
       한국어는 원래 그 말이 없었다 — 한영이 다른 말을 하고 있었다. */
    {
      type: "quiz",
      narr: t(E,
        "Why do we check 'and cur_line' in the if condition? What if cur_line is empty?", "if 조건에 'and cur_line' 이 왜 붙어 있을까요?"),
      question: t(E,
        "Why 'and cur_line' in the overflow check?",
        "넘침을 확인할 때 'and cur_line' 이 왜 필요할까요?"),
      hint: t(E,
        "The line in question: `if cur_len + wl > K and cur_line:`",
        "지금 보는 줄: `if cur_len + wl > K and cur_line:`"),
      options: [
        t(E, "No reason, just extra safety", "이유 없어요, 그냥 안전장치예요"),
        t(E, "Don't flush an empty line — always add at least one word", "빈 줄을 출력하지 않으려고 — 한 단어는 꼭 넣어요"),
        t(E, "To check if K is positive", "K 가 양수인지 확인하려고요"),
      ],
      correct: 1,
      explain: t(E,
        "If cur_line is empty, we haven't added any word yet. We must add the current word no matter what.",
        "cur_line 이 비어 있으면 아직 아무 단어도 안 넣은 거예요.\n그럴 때는 지금 단어를 꼭 넣어야 해요."),
    },
    // 3-5: Complete code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드를 한 부분씩 읽어 봐요."),
      sections: getWordProcSections(E),
    },
  ];
}
