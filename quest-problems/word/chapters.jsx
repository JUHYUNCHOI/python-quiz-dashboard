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
        "Word Distance! You have N words, all length M. Find a new word that is 'closest' to all of them combined. But distance here isn't about spelling — it's about having the same letters! 📝",
        "단어 거리 문제야! 단어가 여러 개 있는데, 이 단어들 모두와 최대한 비슷한 새 단어 하나를 만들어야 해. '비슷하다'는 건 같은 글자를 많이 갖고 있다는 뜻이야! 📝"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📝</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#3b82f6" }}>Word Distance</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P4</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N words (length M each) → find a word → minimize total 'anagram distance' → output lex smallest!",
              "단어 N개 (길이 M) → 새 단어 하나 만들기 → 모든 단어와 겹치는 글자 최대한 많게 → 같은 답이 여러 개면 abc순으로 가장 앞선 것!")}
          </div>
        </div>),
    },
    // 1-2: Anagram concept
    {
      type: "reveal",
      narr: t(E,
        "First, what's an anagram? Two words are anagrams if they use the exact same letters, just in different order. 'ade' and 'aed' are anagrams!",
        "먼저 '애너그램'을 알아보자. 글자를 섞어서 똑같이 만들 수 있으면 애너그램이야. 예를 들어 'ade'의 글자를 섞으면 'aed'가 되지? 둘은 애너그램!"),
      content: (() => {
        const pairs = [
          { a: "ade", b: "aed", ok: true },
          { a: "aab", b: "aba", ok: true },
          { a: "abc", b: "abd", ok: false },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#3b82f6", marginBottom: 8, textAlign: "center" }}>
              {t(E, "Anagram examples", "애너그램 예시")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {pairs.map((p, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: p.ok ? "#ecfdf5" : "#fef2f2", borderRadius: 10, padding: "8px 12px",
                  border: `2px solid ${p.ok ? "#6ee7b7" : "#fca5a5"}`,
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, color: "#3b82f6" }}>{p.a}</span>
                  <span style={{ fontSize: 12, color: C.dim }}>↔</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>{p.b}</span>
                  <span style={{ fontSize: 14, fontWeight: 900 }}>{p.ok ? "✅" : "❌"}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 10, background: "#fef3c7", borderRadius: 8, padding: "6px 10px",
              border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
              fontWeight: 700, textAlign: "center",
            }}>
              💡 {t(E,
                "Anagram = same letters, any order!",
                "애너그램 = 같은 글자들을 쓰되, 순서만 다른 것!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: Distance concept
    {
      type: "reveal",
      narr: t(E,
        "The 'distance' between two words = how many letters you need to change in one word so they become anagrams. It's all about counting shared letters!",
        "두 단어의 '거리'란, 글자를 몇 개 바꿔야 둘이 애너그램이 되는지야. 쉽게 말하면: 같은 글자가 많을수록 거리가 가까운 거야!"),
      content: (() => {
        const ex = { a: "ade", b: "adb", shared: ["a", "d"], diff: 1 };
        return (
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 12 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 2 }}>{t(E, "Word 1", "단어 1")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 900, color: "#3b82f6", letterSpacing: 4 }}>ade</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 2 }}>{t(E, "Word 2", "단어 2")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 900, color: "#8b5cf6", letterSpacing: 4 }}>adb</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 8 }}>
              {["a", "d"].map((c, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#dcfce7", border: "2px solid #6ee7b7", fontWeight: 900, fontSize: 14, color: "#059669",
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
              <div>{t(E, "distance", "거리")} = 3 - 2 = <span style={{ color: "#fbbf24", fontWeight: 900, fontSize: 16 }}>1</span></div>
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
        "Let's check! What's the distance between 'ade' and 'zaf'? Count the shared letters first.",
        "확인 퀴즈! 'ade'와 'zaf'에서 겹치는 글자를 먼저 찾아봐. 그 다음 거리를 구해보자."),
      question: t(E,
        "'ade' vs 'zaf': shared letter = 'a' (1). Distance = 3 − 1 = ?",
        "'ade'와 'zaf'에서 겹치는 글자는 'a' 하나뿐이야.\n거리 = 글자 수 3 − 겹치는 수 1 = ?"),
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
        "To minimize total distance, we maximize total shared letters. Think of it as: we have M slots to fill with letters. Each slot, pick the letter that is shared with the most words!",
        "거리를 줄이려면 겹치는 글자를 최대한 많이 만들면 돼! 방법은 간단해: 빈칸 M개에 글자를 하나씩 넣는데, 매번 '이 글자를 넣으면 몇 개 단어랑 겹칠까?' 세보고 가장 많이 겹치는 글자를 골라!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#3b82f6", marginBottom: 8, textAlign: "center" }}>
            {t(E, "Greedy Strategy", "그리디 전략")}
          </div>
          <div style={{
            background: "#eff6ff", borderRadius: 12, padding: 14,
            border: "2px solid #93c5fd",
          }}>
            <div style={{ fontSize: 13, lineHeight: 2, color: C.text }}>
              <div>1️⃣ {t(E,
                "Count each letter's frequency in every word",
                "각 단어에 어떤 글자가 몇 번 나오는지 세기")}</div>
              <div>2️⃣ {t(E,
                "Fill M slots one by one: pick the letter giving most overlap",
                "빈칸 M개를 하나씩 채우기: '이걸 넣으면 몇 단어랑 겹칠까?' 따져서 가장 많이 겹치는 글자 선택!")}</div>
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
              "예: 'a'를 아직 0개 넣었다면, 'a'가 1개 이상인 단어가 몇 개인지 세면 돼!")}
          </div>
        </div>),
    },
    // 1-6: Quiz — greedy pick
    {
      type: "quiz",
      narr: t(E,
        "Sample: 5 words 'adb, dez, zaf, aed, wxy'. Letter 'a' appears in 3 words, 'd' in 3 words, 'e' in 2. First slot: which letter?",
        "예제: 단어 5개 'adb, dez, zaf, aed, wxy'가 있어. 'a'가 들어있는 단어는 3개, 'd'도 3개, 'e'는 2개야. 첫 번째 빈칸에 뭘 넣으면 좋을까?"),
      question: t(E,
        "Slot 1: 'a' → gain 3, 'd' → gain 3, 'e' → gain 2. Which letter?",
        "첫 빈칸에 'a'를 넣으면 3개 단어와 겹쳐.\n'd'를 넣어도 3개 단어와 겹쳐.\n'e'는 2개. 어떤 글자를 넣을까?"),
      options: [
        t(E, "'a' (gain 3, comes first alphabetically)", "'a' (3개 겹침, abc순으로 먼저)"),
        t(E, "'d' (gain 3, just pick any)", "'d' (3개 겹침, 아무거나 고르기)"),
        t(E, "'e' (gain 2)", "'e' (2개 겹침)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 'a' and 'd' both have gain 3, but 'a' comes first alphabetically. So we pick 'a'!",
        "정답! 'a'와 'd' 둘 다 3개 단어와 겹치지만, 같을 땐 abc순으로 앞인 'a'를 골라!"),
    },
    // 1-7: Input — total distance
    {
      type: "input",
      narr: t(E,
        "The answer word is 'ade'. Distances: 1+1+2+0+3. What's the total?",
        "정답 단어는 'ade'야. 각 단어와의 거리를 다 더해보자!"),
      question: t(E,
        "Total distance of 'ade' to all 5 words?\n1 + 1 + 2 + 0 + 3 = ?",
        "'ade'와 각 단어의 거리:\nadb→1, dez→1, zaf→2, aed→0, wxy→3\n다 더하면?"),
      answer: 7,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 📝 시뮬레이션 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWordCh2(E) {
  return [
    // 2-1: Distance calculator
    {
      type: "distanceCalc",
      narr: t(E,
        "Try typing two words and see how their anagram distance is calculated! Watch how shared letters are matched up. 📝",
        "두 단어를 직접 입력해봐! 각 글자가 몇 번 나오는지 세고, 겹치는 글자를 찾아서 거리를 계산하는 과정을 보여줄게. 📝"),
    },
    // 2-2: Quiz — shared letters
    {
      type: "quiz",
      narr: t(E,
        "Quick check! 'aab' and 'abb' — how many letters do they share?",
        "퀴즈! 'aab'와 'abb'에서 겹치는 글자는 몇 개일까?"),
      question: t(E,
        "'aab' has a:2,b:1. 'abb' has a:1,b:2. How many letters overlap?",
        "'aab'에는 a가 2개, b가 1개.\n'abb'에는 a가 1개, b가 2개.\n겹치는 글자는 총 몇 개?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Right! min(2,1) = 1 for 'a', min(1,2) = 1 for 'b'. Total shared = 2. Distance = 3 − 2 = 1.",
        "정답! a는 둘 중 적은 쪽인 1개, b도 1개 겹쳐서 총 2개. 거리 = 3 − 2 = 1!"),
    },
    // 2-3: Greedy simulator
    {
      type: "greedySim",
      narr: t(E,
        "Watch the greedy algorithm fill M slots one by one! Each word is shown as a fixed dictionary — count how many words have each letter to find the best pick!",
        "이제 직접 보자! 각 단어를 딕셔너리(글자별 개수)로 보여줄게. ▶ 버튼을 누르면 어떤 글자가 가장 많이 겹치는지 세는 과정이 나와!"),
    },
    // 2-4: Word builder
    {
      type: "wordBuilder",
      narr: t(E,
        "Now build the final answer! Once we know the letter frequencies, sort them to get the lexicographically smallest word.",
        "그리디로 골라서 a 1개, d 1개, e 1개를 넣었어. 이걸 abc 순으로 줄 세우면 정답 단어가 나와! 아래에서 각 단어와의 거리도 확인해봐."),
    },
    // 2-5: Final answer input
    {
      type: "input",
      narr: t(E,
        "You saw the whole process! What's the answer word for our sample?",
        "전체 과정을 다 봤어! 이제 정답 단어를 직접 입력해봐."),
      question: t(E,
        "Answer word = a(1) + d(1) + e(1) sorted = ?",
        "a 1개, d 1개, e 1개를 abc순으로 이으면?\n(소문자로 입력해)"),
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
        "Let's code it! First, read the words and count each word's letter frequencies using Counter.",
        "코드를 짜보자! 먼저 단어들을 읽고, 각 단어에 어떤 글자가 몇 번 나오는지 세. 파이썬의 Counter가 이걸 한 줄로 해줘!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#3b82f6", marginBottom: 6 }}>
            {t(E, "Step 1: Read & count frequencies", "1단계: 입력 읽기 & 글자 빈도 세기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "Counter turns each word into a letter → count dictionary.",
              "Counter('adb')라고 하면 {'a':1, 'd':1, 'b':1} 이런 식으로 글자별 개수를 세줘.")}
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
        "The core: fill M slots greedily. For each slot, try all 26 letters and pick the one with highest marginal gain.",
        "핵심 부분이야! 빈칸 M개를 하나씩 채우는데, 매번 a~z 26개를 다 시도해봐. '이걸 넣으면 새로 몇 개 단어랑 겹칠까?' 세서 가장 큰 걸 골라!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#3b82f6", marginBottom: 6 }}>
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
              "a부터 z까지 순서대로 확인하니까, 겹치는 수가 같으면 자동으로 앞 글자가 선택돼!")}
          </div>
        </div>),
    },
    // 3-3: Build result
    {
      type: "reveal",
      narr: t(E,
        "Finally, build the word! Just line up the letters in alphabetical order — that's automatically the lexicographically smallest.",
        "마지막으로 글자들을 abc순으로 이어붙이면 끝! 이렇게 하면 자동으로 사전에서 가장 앞에 오는 단어가 돼."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#3b82f6", marginBottom: 6 }}>
            {t(E, "Step 3: Build lex-smallest word", "3단계: 사전순 최소 단어 만들기")}
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
                background: "#eff6ff", border: "2px solid #93c5fd", fontWeight: 900, fontSize: 18, color: "#3b82f6",
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
        "Why does greedy work? Because each letter is independent! Adding one more 'a' doesn't affect the gain from 'b'. So we can pick optimally one slot at a time.",
        "왜 이렇게 하나씩 고르면 최적이 될까? 'a'를 넣든 말든 'd'가 겹치는 수는 안 변하거든! 글자끼리 서로 영향을 안 주니까, 매번 가장 좋은 걸 고르면 전체도 최적이야."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#3b82f6", marginBottom: 8, textAlign: "center" }}>
            {t(E, "Why Greedy Works", "그리디가 되는 이유")}
          </div>
          <div style={{
            background: "#eff6ff", borderRadius: 12, padding: 14,
            border: "2px solid #93c5fd", fontSize: 13, lineHeight: 2, color: C.text,
          }}>
            <div>✅ {t(E,
              "Each letter's marginal gain is independent",
              "'a'를 넣어도 'b'의 겹침 수에 영향 없음 (독립!)")}</div>
            <div>✅ {t(E,
              "Marginal gain decreases as count increases",
              "같은 글자를 계속 넣으면 새로 겹치는 단어가 줄어듦")}</div>
            <div>✅ {t(E,
              "So greedy (pick highest gain) is optimal!",
              "그래서 매번 가장 많이 겹치는 글자를 고르면 최적!")}</div>
          </div>
        </div>),
    },
    // 3-5: Formula trace
    {
      type: "greedyTrace",
      narr: t(E,
        "Let's trace the greedy algorithm on our sample, slot by slot!",
        "예제에서 빈칸을 하나씩 채우는 과정을 따라가보자! 매 칸마다 어떤 글자가 몇 개 단어와 겹치는지 보여줄게."),
    },
    // 3-6: Full code reveal
    {
      type: "code",
      narr: t(E,
        "Here's the complete solution! Read → count → greedy fill → sort letters. 📝",
        "전체 풀이 코드야! 순서: 단어 읽기 → 글자 세기 → 빈칸 하나씩 채우기 → abc순 정렬. 📝"),
      code: SOLUTION_CODE,
      label: t(E, "Show complete code", "전체 코드 보기"),
    },
  ];
}
