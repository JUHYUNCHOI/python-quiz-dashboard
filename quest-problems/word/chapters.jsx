import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "from collections import Counter",
  "",
  "N, M = map(int, input().split())",
  "words = [input() for _ in range(N)]",
  "",
  "freqs = [Counter(w) for w in words]",
  "",
  "ans = [0] * 26",
  "for _ in range(M):",
  "    best_g, best_c = -1, 0",
  "    for c in range(26):",
  "        g = sum(1 for f in freqs",
  "                if f.get(chr(c+97),0) > ans[c])",
  "        if g > best_g:",
  "            best_g, best_c = g, c",
  "    ans[best_c] += 1",
  "",
  "result = ''",
  "for c in range(26):",
  "    result += chr(c+97) * ans[c]",
  "print(result)",
];

/* Simple Python syntax highlighter */
const PY_KW = new Set(["from","import","for","in","if","else","elif","def","return","and","or","not","while","break","continue","pass","class","with","as","try","except","finally","raise","yield","lambda","is","None","True","False"]);
const PY_BUILTIN = new Set(["print","input","range","len","sum","map","int","str","chr","ord","min","max","sorted","list","dict","set","enumerate","zip","abs","round","type","isinstance","open","get"]);

function pyHighlight(line, baseColor) {
  const tokens = [];
  let i = 0;
  while (i < line.length) {
    // String (single or double quote)
    if (line[i] === "'" || line[i] === '"') {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) { if (line[j] === "\\") j++; j++; }
      tokens.push({ text: line.slice(i, j + 1), color: "#a5d6a7" });
      i = j + 1;
    }
    // Comment
    else if (line[i] === "#") {
      tokens.push({ text: line.slice(i), color: "#6b7280" });
      i = line.length;
    }
    // Number
    else if (/[0-9]/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>[\]:]/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#f9a825" });
      i = j;
    }
    // Word (keyword / builtin / identifier)
    else if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z_0-9]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (PY_KW.has(word)) tokens.push({ text: word, color: "#c792ea" });
      else if (PY_BUILTIN.has(word)) tokens.push({ text: word, color: "#82aaff" });
      else tokens.push({ text: word, color: baseColor });
      i = j;
    }
    // Operators / punctuation
    else if ("=<>!+-*/%&|^~".includes(line[i])) {
      let j = i;
      while (j < line.length && "=<>!+-*/%&|^~".includes(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#89ddff" });
      i = j;
    }
    // Whitespace & other
    else {
      tokens.push({ text: line[i], color: baseColor });
      i++;
    }
  }
  return tokens;
}

/* Helper: code snippet box */
const CodeSnippet = ({ lines, highlight: hl }) => (
  <div style={{
    background: "#1e293b", borderRadius: 10, padding: "10px 8px",
    overflowX: "auto", fontSize: 12, lineHeight: 1.8,
    fontFamily: "'JetBrains Mono', monospace", marginTop: 8,
  }}>
    {lines.map((l, i) => {
      const isHl = hl && hl.includes(i);
      const baseColor = isHl ? "#93c5fd" : "#e2e8f0";
      const tokens = pyHighlight(l, baseColor);
      return (
        <div key={i} style={{
          display: "flex", minHeight: 20,
          background: isHl ? "rgba(59,130,246,.15)" : "transparent",
          borderRadius: 4, padding: "0 4px",
        }}>
          <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
          <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {tokens.map((tk, j) => (
              <span key={j} style={{ color: tk.color }}>{tk.text}</span>
            ))}
          </span>
        </div>
      );
    })}
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (7 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWordCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Word Distance: build a length-M word that shares as many letters as possible with all N words.", "단어 거리 문제예요!\n단어가 여러 개 있는데, 이 단어들 모두와 최대한 비슷한 새 단어 하나를 만들어야 해요.\n'비슷하다'는 건 같은 글자를 많이 갖고 있다는 뜻이에요!\n📝"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>📝</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#3b82f6" }}>Word Distance</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P4</div>

          {/* 🎯 Mission box */}
          <div style={{ marginTop: 12, background: "#eff6ff", border: "1.5px solid #3b82f6", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Make a length-M word that shares as many letters as possible with all N words. If several words tie, pick the one that comes first in abc (dictionary) order.",
                "모든 단어와 겹치는 글자가 가장 많은 길이 M 짜리 새 단어를 만들어요. 똑같이 좋은 답이 여러 개면 abc 순서(사전 순서)로 가장 앞선 걸 골라요.")}
            </div>
          </div>

          <div style={{ marginTop: 10, background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N words (length M each) → build one new word → share as many letters as possible → if tied, output the abc-first one!",
              "단어 N개 (길이 M) → 새 단어 하나 만들기 → 모든 단어와 겹치는 글자 최대한 많게 → 같은 답이 여러 개면 abc순으로 가장 앞선 것!")}
          </div>
        </div>),
    },
    // 1-2: 입출력 형식 + 제약 (MCC 2025 P4 원문 그대로)
    // 미션을 소개한 직후 "그래서 데이터가 어떻게 들어오는데?" 를 못박아 준다.
    {
      type: "reveal",
      narr: t(E,
        "Now — how does the data arrive?\nFirst N and M (how many words, and their length), then N lines: one word each.\nOutput: the best length-M word.",
        "그럼 자료는 어떻게 들어올까요?\n먼저 단어 개수 N 과 단어 길이 M 이 오고,\n그다음 N 줄에 단어가 하나씩 와요.\n길이 M 인 가장 좋은 단어를 출력해요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N M</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(first line) — number of words, word length", "(첫 줄) — 단어 개수, 단어 길이")}</span></div>
              <div style={{ marginTop: 6, paddingLeft: 10, borderLeft: `2px solid #fde68a` }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>word<sub>i</sub></span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— a string of length M (lowercase)", "— 길이 M 소문자 문자열")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One length-M word — the one that shares the most letters overall; if tied, the abc-first one.",
                  "길이 M 짜리 단어 하나 — 겹치는 글자가 가장 많은 것. 여러 개면 abc 순서로 가장 앞선 것.")}
            </div>
          </div>
          {/* 제약 */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N, M ≤ 10,000 (= 10⁴)</div>
              <div>1 ≤ N × M ≤ 100,000 (= 10⁵)</div>
              <div>{t(E, "words: lowercase letters only", "단어: 소문자 알파벳만")}</div>
            </div>
          </div>
          {/* 샘플 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.55, color: "#f8fafc" }}>
                <div>5 3</div>
                <div>adb</div><div>dez</div><div>zaf</div><div>aed</div><div>wxy</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#86efac" }}>
                <div>ade</div>
              </div>
            </div>
          </div>
          {/* 왜 ade 인지 — 예제 바로 옆에서 구체 계산 (선생님 2026-07-23 "여기 예제에서는 왜 ade야?") */}
          <div style={{ marginTop: 10, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 800, color: "#1e40af", marginBottom: 6 }}>
              {t(E, "Why \"ade\"? — fill each slot with the letter in the MOST words:",
                  "왜 \"ade\"? — 각 자리에 '가장 많은 단어에 든 글자'를 하나씩 넣어요:")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              <div><span style={{ color: "#2563eb", fontWeight: 800 }}>1) a</span> — {t(E, "in 3 words", "3개 단어")} (adb, zaf, aed) <span style={{ color: C.dim }}>← {t(E, "most", "최다")}</span></div>
              <div><span style={{ color: "#2563eb", fontWeight: 800 }}>2) d</span> — {t(E, "in 3 words", "3개 단어")} (adb, dez, aed) <span style={{ color: C.dim }}>← {t(E, "most", "최다")}</span></div>
              <div><span style={{ color: "#2563eb", fontWeight: 800 }}>3) e</span> — {t(E, "e and z tie (2 words each) → pick abc-first e", "e·z 동점 (각 2개 단어) → abc 앞선 e")}</div>
            </div>
            <div style={{ marginTop: 6, fontWeight: 700, color: "#166534" }}>
              {t(E, "→ letters a, d, e → sort abc → \"ade\"", "→ 글자 a, d, e → abc 정렬 → \"ade\"")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Distance concept
    {
      type: "reveal",
      narr: t(E,
        "The 'distance' between two words = how many letters you need to change in one word so they become identical.\nIt's all about counting shared letters!", "두 단어의 '거리' 는 글자를 몇 개 바꿔야 둘이 똑같아지는지예요.\n쉽게 말하면 같은 글자가 많을수록 거리가 가까워요!"),
      content: (() => {
        const ex = { a: "ade", b: "adb", shared: ["a", "d"], diff: 1 };
        return (
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 12 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 2 }}>{t(E, "Word 1", "단어 1")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: "#3b82f6", letterSpacing: 4 }}>ade</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 2 }}>{t(E, "Word 2", "단어 2")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: "#8b5cf6", letterSpacing: 4 }}>adb</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 8 }}>
              {["a", "d"].map((c, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#dcfce7", border: "1px solid #6ee7b7", fontWeight: 700, fontSize: 14, color: "#059669",
                  fontFamily: "'JetBrains Mono',monospace",
                }}>{c}</div>
              ))}
              <div style={{ fontSize: 11, color: C.dim, alignSelf: "center", fontWeight: 700 }}>
                {t(E, "shared", "공통")}
              </div>
            </div>
            <div style={{
              background: "#1e293b", borderRadius: 10, padding: "10px 14px",
              fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
              color: "#e2e8f0", lineHeight: 2, textAlign: "center",
            }}>
              <div>{t(E, "length", "길이")} M = 3</div>
              <div>{t(E, "shared letters", "공통 글자")} = 2 (a, d)</div>
              <div>{t(E, "distance", "거리")} = 3 - 2 = <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: 16 }}>1</span></div>
            </div>
            <div style={{
              marginTop: 10, background: "#eff6ff", borderRadius: 8, padding: "6px 10px",
              border: "1.5px solid #93c5fd", fontSize: 12, color: "#1e40af",
              fontWeight: 700, textAlign: "center",
            }}>
              {t(E,
                "distance = M − (shared letter count)",
                "거리 = M − (공통 글자 수)")}
            </div>
          </div>
        );
      })(),
    },
    // 1-4: Quiz — distance calculation
    {
      type: "quiz",
      narr: t(E,
        "Let's check! What's the distance between 'ade' and 'zaf'? Count the shared letters first.", "확인 퀴즈! 'ade'와 'zaf'에서 겹치는 글자를 먼저 찾아봐요.\n그 다음 거리를 구해요."),
      question: t(E,
        "What's the distance between 'ade' and 'zaf'?",
        "'ade'와 'zaf' 사이의 거리는 얼마일까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Right! Only 'a' is shared. Distance = 3 − 1 = 2.",
        "정답! 겹치는 글자가 'a' 하나뿐이니까 거리는 3 − 1 = 2야."),
    },
    // 1-5: Greedy idea
    {
      type: "reveal",
      narr: t(E,
        "To minimize total distance, fill each of the M slots with the letter shared by the most words.", "거리를 줄이려면 겹치는 글자를 최대한 많이 만들면 돼요!\n방법은 간단해요.\n빈칸 M 개에 글자를 하나씩 넣는데,\n'이 글자를 넣으면 몇 단어랑 겹칠까?' 를 세어 보고\n가장 많이 겹치는 글자를 골라요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6", marginBottom: 8, textAlign: "center" }}>
            {t(E, "Greedy Strategy", "그리디 전략")}
          </div>
          <div style={{
            background: "#eff6ff", borderRadius: 12, padding: 14,
            border: "1px solid #93c5fd",
          }}>
            <div style={{ fontSize: 13, lineHeight: 2, color: C.text }}>
              <div>1️⃣ {t(E,
                "Count each letter's frequency in every word",
                "각 단어에 어떤 글자가 몇 번 나오는지 세기")}</div>
              <div>2️⃣ {t(E,
                "Fill M slots one by one: pick the letter giving most overlap",
                "빈칸 M 개를 하나씩 채워요.\n'이걸 넣으면 몇 단어랑 겹칠까?' 를 따져서\n가장 많이 겹치는 글자를 골라요!")}</div>
              <div>3️⃣ {t(E,
                "If tied, pick earlier letter (a before b) for lex smallest",
                "겹치는 수가 같으면 알파벳 순으로 앞선 걸 골라 (a를 b보다 먼저)")}</div>
            </div>
          </div>
          <div style={{
            marginTop: 10, background: "#fef3c7", borderRadius: 8, padding: "6px 10px",
            border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
            fontWeight: 700, textAlign: "center",
          }}>
            💡 {t(E,
              "Marginal gain of letter c at count k = how many words have more than k of c",
              "예를 들어 'a' 를 아직 하나도 안 넣었다면,\n'a' 가 1개 이상 들어 있는 단어가 몇 개인지 세면 돼요!")}
          </div>
        </div>),
    },
    // 1-6: Marginal gain hands-on
    {
      type: "marginalGainSim",
      narr: t(E,
        "Tap a letter and watch its gain shrink — picking the highest gain each time is always safe.",
        "직접 해봐요!\n글자를 눌러서 추가하면 그 글자의 +N (새로 겹치는 수)이 줄어들어요.\n이게 핵심이에요 — 매번 가장 큰 +N을 고르면 항상 최선이에요!"),
    },
    // 1-7: Input — total distance
    {
      type: "input",
      narr: t(E,
        "The answer word is 'ade'. Distances: 1+1+2+0+3. What's the total?", "정답 단어는 'ade'예요. 각 단어와의 거리를 다 더해요!"),
      question: t(E,
        "Total distance of 'ade' to all 5 words?\n1 + 1 + 2 + 0 + 3 = ?",
        "'ade' 와 각 단어의 거리예요.\nadb→1, dez→1, zaf→2, aed→0, wxy→3\n다 더하면 얼마일까요?"),
      answer: 7,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 📝 시뮬레이션 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWordCh2(E) {
  return [
    // 2-1: Distance calculator
    {
      type: "distanceCalc",
      narr: t(E,
        "Try typing two words and see how their letter distance is calculated!\nWatch how shared letters are matched up.\n📝", "두 단어를 입력하면 겹치는 글자를 세어 거리를 계산해줘요."),
    },
    // 2-2: Word builder
    {
      type: "wordBuilder",
      narr: t(E,
        "Sort greedy's letter picks to build the final word.", "그리디가 고른 글자를 abc 순으로 이으면 단어가 완성돼요."),
    },
    // 2-3: Final answer input
    {
      type: "input",
      narr: t(E,
        "You just watched the letters combine into a word. What's the answer word for our sample?", "방금 글자들이 합쳐져 단어가 되는 걸 봤어요! 우리 예제의 정답 단어는 뭘까요?"),
      question: t(E,
        "Answer word = a(1) + d(1) + e(1) sorted = ?",
        "a 1개, d 1개, e 1개를 abc 순으로 이으면 뭐가 될까요?\n(소문자로 넣어 주세요)"),
      answer: "ade",
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWordCh3(E) {
  return [
    // 3-1: Read input + count frequencies
    {
      type: "reveal",
      narr: t(E,
        "Time to code it — what do we need before picking letters? Each word's letter counts.",
        "코드로 옮겨볼게요. 글자를 고르기 전에 뭐가 필요할까요?\n단어를 읽고 글자 수를 Counter로 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6", marginBottom: 6 }}>
            {t(E, "Step 1: Read & count frequencies", "1단계 — 입력을 읽고 글자가 몇 번 나오는지 세기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "Counter turns each word into a letter → count dictionary.", "Counter('adb')라고 하면 {'a':1,\n'd':1, 'b':1} 이런 식으로 글자별 개수를 세줘요.")}
          </div>
          <CodeSnippet
            lines={[
              "from collections import Counter",
              "",
              "N, M = map(int, input().split())",
              "words = [input() for _ in range(N)]",
              "",
              "freqs = [Counter(w) for w in words]",
            ]}
            highlight={[5]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: "#3b82f6", fontWeight: 700, textAlign: "center" }}>
            "adb" → {"{"}'a':1, 'd':1, 'b':1{"}"} ✓
          </div>
        </div>),
    },
    // 3-2: Greedy loop
    {
      type: "reveal",
      narr: t(E,
        "We have the counts — so for each slot, how do we pick the best letter? Try all 26 and keep the highest gain.",
        "글자 수는 세었어요. 빈칸마다 어떤 글자를 고를까요?\na~z 를 다 시도해 가장 많이 겹치는 글자를 골라요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6", marginBottom: 6 }}>
            {t(E, "Step 2: Greedy slot filling", "2단계: 그리디로 빈칸 채우기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "Marginal gain of 'c' = words where freq[c] > current count of c",
              "글자 'c'를 하나 더 넣을 때 새로 겹치게 되는 단어 수를 세는 거야")}
          </div>
          <CodeSnippet
            lines={[
              "ans = [0] * 26",
              "for _ in range(M):",
              "    best_g, best_c = -1, 0",
              "    for c in range(26):",
              "        g = sum(1 for f in freqs",
              "                if f.get(chr(c+97),0) > ans[c])",
              "        if g > best_g:",
              "            best_g, best_c = g, c",
              "    ans[best_c] += 1",
            ]}
            highlight={[4, 5, 8]}
          />
          <div style={{
            marginTop: 10, background: "#fef3c7", borderRadius: 8, padding: "6px 10px",
            border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
            fontWeight: 700, textAlign: "center",
          }}>
            💡 {t(E,
              "c in range(26) → tries a,b,c,...,z. Ties go to earlier letter!",
              "a부터 z까지 순서대로 확인하니까, 겹치는 수가 같으면 자동으로 앞 글자가 선택돼요!")}
          </div>
        </div>),
    },
    // 3-3: Build result
    {
      type: "reveal",
      narr: t(E,
        "We picked how many of each letter — so how do we turn that into the word? Line them up in order a→z.",
        "글자마다 몇 개 쓸지는 정했어요. 이걸 어떻게 단어로 만들까요?\na 부터 z 순서로 이어붙이면 정답이 나와요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6", marginBottom: 6 }}>
            {t(E, "Step 3: Build lex-smallest word", "3단계 — abc 순으로 가장 빠른 단어 만들기")}
          </div>
          <CodeSnippet
            lines={[
              "result = ''",
              "for c in range(26):",
              "    result += chr(c+97) * ans[c]",
              "print(result)",
            ]}
            highlight={[1, 2]}
          />
          <div style={{
            marginTop: 10, display: "flex", justifyContent: "center", gap: 4,
          }}>
            {["a", "d", "e"].map((c, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                background: "#eff6ff", border: "1px solid #93c5fd", fontWeight: 700, fontSize: 18, color: "#3b82f6",
                fontFamily: "'JetBrains Mono',monospace",
              }}>{c}</div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 6, fontSize: 12, color: C.dim, fontWeight: 700 }}>
            ans = [1,0,0,1,1,0,...] → "a" + "d" + "e" = "ade"
          </div>
        </div>),
    },
    // 3-4: Why greedy works
    {
      type: "reveal",
      narr: t(E,
        "Greedy works because each letter's gain is independent, so picking the best letter each slot is always optimal.", "왜 이렇게 하나씩 골라도 될까요?\n'a' 를 넣든 말든 'd' 가 겹치는 수는 그대로예요.\n글자끼리 서로 영향을 안 주니까,\n매번 가장 좋은 걸 고르면 전체도 가장 좋아져요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6", marginBottom: 8, textAlign: "center" }}>
            {t(E, "Why Greedy Works", "그리디가 되는 이유")}
          </div>
          <div style={{
            background: "#eff6ff", borderRadius: 12, padding: 14,
            border: "1px solid #93c5fd", fontSize: 13, lineHeight: 2, color: C.text,
          }}>
            <div>✅ {t(E,
              "Each letter's marginal gain is independent",
              "'a'를 넣어도 'b'의 겹침 수에 영향 없음 (독립!)")}</div>
            <div>✅ {t(E,
              "Marginal gain decreases as count increases",
              "같은 글자를 계속 넣으면 새로 겹치는 단어가 줄어듦")}</div>
            <div>✅ {t(E,
              "So greedy (pick highest gain) is optimal!",
              "그래서 매번 가장 많이 겹치는 글자를 고르면 제일 좋아요!")}</div>
          </div>
        </div>),
    },
    // 3-5: Formula trace
    {
      type: "greedyTrace",
      narr: t(E,
        "Let's trace the greedy algorithm on our sample, slot by slot!", "예제에서 빈칸을 하나씩 채우는 과정을 따라가 봐요."),
    },
    // 3-6: Full code reveal
    {
      type: "code",
      narr: t(E,
        "Here's the complete solution! Read → count → greedy fill → sort letters. 📝", "전체 풀이 코드예요!\n단어 읽기 → 글자 세기 → 빈칸 하나씩 채우기 → abc 순 정렬 순서예요. 📝"),
      code: SOLUTION_CODE,
      label: t(E, "Show complete code", "전체 코드 보기"),
    },
  ];
}
