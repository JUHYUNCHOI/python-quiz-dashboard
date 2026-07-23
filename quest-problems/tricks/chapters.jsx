import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "from collections import Counter",
  "from itertools import combinations",
  "",
  "N = int(input())",
  "packs = []",
  "for _ in range(N):",
  "    a, b = map(int, input().split())",
  "    packs.append((min(a,b), max(a,b)))",
  "",
  "pair_count = Counter(packs)",
  "",
  "colors = set()",
  "for a, b in packs:",
  "    colors.add(a)",
  "    colors.add(b)",
  "",
  "answer = 0",
  "for x, y in combinations(sorted(colors), 2):",
  "    A = pair_count.get((x, x), 0)",
  "    B = pair_count.get((y, y), 0)",
  "    C = pair_count.get((x, y), 0)",
  "    answer += A * B * C",
  "    answer += C * (C-1) * (C-2) // 6",
  "",
  "print(answer)",
];

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
      const baseColor = isHl ? "#fdba74" : "#e2e8f0";
      const tokens = pyHighlight(l, baseColor);
      return (
        <div key={i} style={{
          display: "flex", minHeight: 20,
          background: isHl ? "rgba(249,115,22,.15)" : "transparent",
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


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (7 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTricksCh1(E) {
  const O = "#f97316", P = "#a855f7", G = "#22c55e";
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "It's Halloween! 🎃 Let's go trick-or-treating.", "할로윈이에요! 🎃 사탕 받으러 가볼까?"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>🎃</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Trick or Treat</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2025 P3</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N bags (2 candies each) → pick 3 bags → 6 candies → success if exactly 2 colors, 3 each.\nHow many ways can you succeed?",
              "봉지 N개 (각 2개씩) → 3개 고르기 → 사탕 6개 → 2가지 색 × 3개씩이면 성공!\n성공하는 방법이 몇 가지일까?")}
          </div>
        </div>),
    },
    // 1-2: Pack concept
    {
      type: "reveal",
      narr: t(E,
        "Each bag has exactly 2 candies inside.\nSometimes both are the same color, sometimes different!", "봉지를 열면 사탕 2개가 나와요. 둘이 같은 색일 수도 있고, 서로 다른 색일 수도 있어요!"),
      content: (() => {
        const packs = [
          { a: O, b: P, la: "1", lb: "2", label: "(1,2)" },
          { a: O, b: O, la: "1", lb: "1", label: "(1,1)" },
          { a: P, b: P, la: "2", lb: "2", label: "(2,2)" },
          { a: O, b: G, la: "1", lb: "3", label: "(1,3)" },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {packs.map((p, i) => (
                <div key={i} style={{
                  background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12,
                  padding: "10px 12px", textAlign: "center", minWidth: 70,
                }}>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.a, border: `1px solid ${p.a}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{p.la}</div>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.b, border: `1px solid ${p.b}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{p.lb}</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#f97316", fontFamily: "'JetBrains Mono',monospace" }}>{p.label}</div>
                  <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>
                    {p.a === p.b ? t(E, "Same", "같은 색") : t(E, "Mixed", "다른 색")}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 10, background: "#fef3c7", borderRadius: 8, padding: "6px 10px",
              border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
              fontWeight: 700, textAlign: "center",
            }}>
              💡 {t(E,
                "1 bag = 2 candies. Pick 3 bags = 6 candies total!",
                "봉지 1개 = 사탕 2개. 봉지 3개를 고르면 = 사탕 총 6개!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: 입출력 형식 + 제약 (MCC 2025 P3 원문 그대로)
    // 봉지 개념을 잡은 직후 "그래서 데이터가 어떻게 들어오는데?" 를 못박아 준다.
    // (선생님 2026-07-22: quest 검토 — fans 처럼 입출력이 앞에 없었음)
    {
      type: "reveal",
      narr: t(E,
        "Now — how does the data arrive?\nFirst N (how many bags), then N lines: the 2 candy colours in each bag.\nOutput: how many valid ways to pick 3 bags.",
        "그럼 데이터는 어떻게 들어올까?\n먼저 N (봉지 개수), 그 다음 N 줄에 각 봉지의 두 사탕 색.\n출력: 3봉지를 성공으로 고르는 방법이 몇 가지인지."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(first line) — number of bags", "(첫 줄) — 봉지 개수")}</span></div>
              <div style={{ marginTop: 6, paddingLeft: 10, borderLeft: `2px solid #fde68a` }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>a<sub>i</sub> b<sub>i</sub></span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the 2 candy colours in bag i", "— i번 봉지 두 사탕의 색")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "A single integer — the number of valid ways to choose 3 bags.",
                  "정수 하나 — 3봉지를 고르는 성공 방법의 개수.")}
            </div>
          </div>
          {/* 제약 */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 200,000 (= 2 × 10⁵)</div>
              <div>1 ≤ a<sub>i</sub>, b<sub>i</sub> ≤ 1,000,000,000 (= 10⁹)</div>
            </div>
          </div>
          {/* 샘플 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.55, color: "#f8fafc" }}>
                <div>9</div>
                <div>1 2</div><div>1 3</div><div>2 1</div><div>1 1</div><div>2 2</div>
                <div>1 3</div><div>3 1</div><div>1 1</div><div>1 1</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#86efac" }}>
                <div>7</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, wordBreak: "keep-all" }}>
            {t(E, "There are exactly 7 ways to pick 3 bags whose 6 candies split into two colours, 3 each.",
                "6개 사탕이 두 색으로 3개씩 나뉘게 3봉지를 고르는 방법이 딱 7가지예요.")}
          </div>
        </div>),
    },
    // 1-4: Quiz — valid selection
    {
      type: "quiz",
      narr: t(E,
        "Try this — count colors in the chosen bags and decide.",
        "직접 — 고른 봉지에서 색을 세어 보고 판단해 봐."),
      question: t(E,
        "Bags (1,2), (1,1), (2,2) → colors: 1×3, 2×3. Success?",
        "봉지 (1,2), (1,1), (2,2)를 골랐어. 사탕을 꺼내보면 색1이 3개, 색2가 3개. 성공일까요?"),
      options: [
        t(E, "No, all 6 must be different colors", "아니, 6개 다 다른 색이어야 해"),
        t(E, "Yes! Exactly 2 colors, 3 each", "맞아! 딱 2색, 3개씩"),
        t(E, "No, need at least 3 colors", "아니, 3가지 이상 필요해"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Color 1 appears 3 times, color 2 appears 3 times. That's exactly what we need!",
        "정답! 색1이 3개, 색2가 3개. 이게 바로 우리가 원하는 거예요!"),
    },
    // 1-4: Pack type classification
    {
      type: "reveal",
      narr: t(E,
        "Here's the trick!\nPick two colors x and y.\nEvery bag falls into one of 3 groups based on what's inside.", "여기가 핵심이에요! 색깔 2개를 골라서 x, y라고 부르자. 그러면 모든 봉지를 안에 든 사탕에 따라 3가지 그룹으로 나눌 수 있어요."),
      content: (() => {
        const types = [
          { label: "Type A", emoji: "🟠🟠", desc_en: "(x,x) → x color ×2", desc_ko: "(x,x) → x색 사탕만 2개", color: O, bg: "#fff7ed", bd: "#fdba74" },
          { label: "Type B", emoji: "🟣🟣", desc_en: "(y,y) → y color ×2", desc_ko: "(y,y) → y색 사탕만 2개", color: P, bg: "#faf5ff", bd: "#d8b4fe" },
          { label: "Type C", emoji: "🟠🟣", desc_en: "(x,y) → 1x + 1y", desc_ko: "(x,y) → x색 1개 + y색 1개", color: G, bg: "#ecfdf5", bd: "#6ee7b7" },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#f97316", marginBottom: 8, textAlign: "center" }}>
              {t(E, "Bag types for color pair (x, y)", "색 쌍 (x, y)로 봉지를 분류하면")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {types.map((tp, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: tp.bg, borderRadius: 10, padding: "8px 12px",
                  border: `1px solid ${tp.bd}`,
                }}>
                  <div style={{ fontSize: 20, flexShrink: 0 }}>{tp.emoji}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: tp.color }}>{tp.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
                      {E ? tp.desc_en : tp.desc_ko}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 10, background: "#fef3c7", borderRadius: 8, padding: "6px 10px",
              border: "1.5px solid #fbbf24", fontSize: 12, color: "#92400e",
              fontWeight: 700, textAlign: "center", lineHeight: 1.6,
            }}>
              {t(E,
                "We need x=3, y=3 from exactly 3 bags!",
                "봉지 3개를 열었을 때, x색 3개 + y색 3개가 나와야 해요!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-5: Quiz — which combos work
    {
      type: "quiz",
      narr: t(E,
        "A = 2x, B = 2y, C = 1x+1y. Which 3-bag combos make exactly 3x and 3y?",
        "A = 2x, B = 2y, C = 1x+1y. 봉지 3개로 x 3개·y 3개를 만들려면 어떤 조합?"),
      question: t(E,
        "Which combos of 3 bags give exactly 3x and 3y?",
        "봉지 3개를 어떻게 조합해야 x 3개, y 3개가 될까요?"),
      options: [
        t(E, "Only: 1A + 1B + 1C", "1A + 1B + 1C만"),
        t(E, "Only: 3C", "3C만"),
        t(E, "Both: (1A+1B+1C) and (3C)", "둘 다: (1A+1B+1C)과 (3C)"),
      ],
      correct: 2,
      explain: t(E,
        "Both work! 1A+1B+1C: 2+0+1=3x, 0+2+1=3y ✓. 3C: 1+1+1=3x, 1+1+1=3y ✓. No other combos give 3+3!",
        "둘 다 돼요! A+B+C 하나씩: x가 2+0+1=3, y가 0+2+1=3 ✓. C 3개: x가 1+1+1=3, y가 1+1+1=3 ✓. 이 두 가지만 가능해요!"),
    },
    // 1-5b: Deep audit sim — verify combos candy by candy
    {
      type: "deepAudit",
      narr: t(E,
        "Reveal candies one by one — watch the tally. 🔍",
        "사탕을 하나씩 열어 개수가 쌓이는 걸 봐요. 🔍"),
    },
    // 1-6: Counting formula
    {
      type: "reveal",
      narr: t(E,
        "So the plan is: for each pair of colors (x,y), count A, B, C bags, apply two simple formulas, and add it all up!", "그래서 이렇게 풀어! 색깔 쌍 (x,y)마다 → A, B, C 봉지 몇 개인지 세고 → 공식 2개를 적용하고 → 전부 더하면 답이에요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{
            background: "#fff7ed", borderRadius: 12, padding: 14,
            border: "1px solid #fdba74",
          }}>
            {/* 범례 — countA/B/C 가 뭔지 바로 그 자리에서 (선생님 2026-07-22: "이게 뭘 말하는건지 모르겠어") */}
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.9, marginBottom: 12, background: "#fff", borderRadius: 8, padding: "8px 12px", border: "1px solid #fde68a", wordBreak: "keep-all" }}>
              <div style={{ fontWeight: 700, color: C.dim, fontSize: 11, marginBottom: 4, textAlign: "center" }}>
                {t(E, "for the current color pair (x, y):", "지금 보는 색 쌍 (x, y) 에서:")}
              </div>
              <div><span style={{ color: "#f97316", fontWeight: 800 }}>countA</span> = {t(E, "# of A-bags (x,x)", "A봉지 (x,x) 개수")} <span style={{ color: C.dim }}>· 🟠🟠</span></div>
              <div><span style={{ color: "#a855f7", fontWeight: 800 }}>countB</span> = {t(E, "# of B-bags (y,y)", "B봉지 (y,y) 개수")} <span style={{ color: C.dim }}>· 🟣🟣</span></div>
              <div><span style={{ color: "#22c55e", fontWeight: 800 }}>countC</span> = {t(E, "# of C-bags (x,y)", "C봉지 (x,y) 개수")} <span style={{ color: C.dim }}>· 🟠🟣</span></div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f97316", marginBottom: 10, textAlign: "center" }}>
              {t(E, "The Formula", "공식")}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
              fontWeight: 700, color: C.text, lineHeight: 2.2, textAlign: "center",
            }}>
              <div style={{ background: "#fef3c7", borderRadius: 6, padding: "4px 8px", marginBottom: 4 }}>
                <span style={{ color: "#f97316" }}>Case 1:</span> countA × countB × countC
              </div>
              <div style={{ background: "#fef3c7", borderRadius: 6, padding: "4px 8px", marginBottom: 4 }}>
                <span style={{ color: "#a855f7" }}>Case 2:</span> C(countC, 3) = <span style={{ fontSize: 11 }}>countC×(countC-1)×(countC-2)/6</span>
              </div>
              {/* Case 2 공식이 왜 이렇게 나오는지 — 구체 예시로 (선생님 2026-07-22 "이 공식이 이해가 안가") */}
              <div style={{ background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 8, padding: "8px 10px", marginBottom: 8, fontSize: 11.5, fontWeight: 400, color: C.text, lineHeight: 1.85, textAlign: "left", fontFamily: "inherit", wordBreak: "keep-all" }}>
                <div style={{ fontWeight: 700, color: "#a855f7", marginBottom: 2 }}>
                  {t(E, "Case 2 = choose 3 C-bags out of countC", "Case 2 = C봉지 countC개 중에서 3개 고르기")}
                </div>
                <div>
                  {t(E, "1st pick: countC ways · 2nd: countC−1 · 3rd: countC−2. But the same 3 bags get counted 3×2×1 = 6 times (order doesn't matter), so divide by 6.",
                      "첫째: countC가지 · 둘째: countC−1 · 셋째: countC−2. 그런데 같은 3개를 3×2×1 = 6번 세니까(순서는 상관없음) 6으로 나눠.")}
                </div>
                <div style={{ marginTop: 4, color: "#7c3aed", fontWeight: 700 }}>
                  {t(E, "e.g. countC = 4 → 4×3×2 ÷ 6 = 4 ways", "예: C봉지가 4개면 → 4×3×2 ÷ 6 = 4가지")}
                </div>
              </div>
              <div style={{ background: "#f0fdf4", borderRadius: 6, padding: "6px 8px", border: "1.5px solid #6ee7b7", fontSize: 14 }}>
                <span style={{ color: "#059669", fontWeight: 700 }}>{t(E, "answer", "답")}</span> = {t(E, <span style={{ fontSize: 11 }}>sum over all pairs</span>, <span style={{ fontSize: 11 }}>모든 색 쌍의 합</span>)} (Case1 + Case2)
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, lineHeight: 1.6, textAlign: "center" }}>
            {t(E,
              "For every pair of colors (x,y), classify the bags, apply formulas, and add up!",
              "모든 색 쌍 (x,y)에 대해 봉지를 분류하고, 공식을 적용해서 전부 더하면 끝!")}
          </div>
        </div>),
    },
    // 1-7: Input — apply formula
    {
      type: "input",
      narr: t(E,
        "Try calculating! If there are 2 A-bags, 1 B-bag, and 2 C-bags, what do you get?", "직접 계산해보자! A봉지 2개, B봉지 1개, C봉지 2개면 답은 얼마일까요?"),
      question: t(E,
        "A=2, B=1, C=2.\nA×B×C + C(2,3) = ?",
        "A=2, B=1, C=2.\nA×B×C + C(2,3) = ?"),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🎃 시뮬레이션 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTricksCh2(E) {
  return [
    // 2-1: Pack type classifier
    {
      type: "packTypeClassifier",
      narr: t(E,
        "Pick a color pair and watch the 9 sample bags get sorted into A, B, C types!\nTry different pairs.\n🎃", "색 쌍을 하나 골라봐요! 봉지 9개가 A, B, C 종류로 나뉘는 걸 볼 수 있어요. 다른 쌍도 눌러봐요! 🎃"),
    },
    // 2-2: Quiz — pack type
    {
      type: "quiz",
      narr: t(E,
        "Quick check!\nBag (1,1) has two candies, both color 1.\nIf we're looking at color pair (1,2), what type is this bag?", "퀴즈! 봉지 (1,1)에는 사탕이 둘 다 색1이에요. 색 쌍 (1,2)에서 이 봉지는 어떤 종류?"),
      question: t(E,
        "Bag (1,1) for pair (1,2) is...?",
        "봉지 (1,1)은 색 쌍 (1,2)에서 어떤 종류?"),
      options: [
        t(E, "Type A (both = x)", "A타입 (둘 다 x)"),
        t(E, "Type B (both = y)", "B타입 (둘 다 y)"),
        t(E, "Type C (mixed)", "C타입 (섞임)"),
      ],
      correct: 0,
      explain: t(E,
        "Bag (1,1) = both candies are color 1 = x. That's Type A: (x,x)!",
        "봉지 (1,1) = 사탕 둘 다 색1 = x색. 그래서 A종류(x,x)야!"),
    },
    // 2-3: Pack picker simulator
    {
      type: "packPickerSim",
      narr: t(E,
        "Now try picking 3 bags yourself!\nSee if you can get exactly 2 colors with 3 candies each.\n🎃", "이제 직접 봉지 3개를 골라봐요! 사탕 색이 딱 2가지 × 3개씩 나오는지 확인해보자! 🎃"),
    },
    // 2-4: Final answer input
    {
      type: "input",
      narr: t(E,
        "Now count it yourself — what's the total for the 9-bag sample?", "이제 직접 세어보자 — 봉지 9개짜리 예제의 최종 답은?"),
      question: t(E,
        "Total valid ways for the sample?",
        "예제에서 가능한 방법은 총 몇 가지?"),
      answer: 7,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTricksCh3(E) {
  return [
    // 3-1: Read + normalize
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code!\nFirst, read the bags and normalize: (2,1) → (1,2) so we don't double-count.", "코드를 짜보자! 먼저 봉지 정보를 읽고, (2,1)과 (1,2)를 같은 걸로 취급해서 중복을 없애."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f97316", marginBottom: 6 }}>
            {t(E, "Step 1: Read & normalize bags", "1단계: 봉지 읽기 & 정리")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "(2,1) and (1,2) are the same bag! min/max ensures consistent ordering.", "(2,1)과 (1,2)는 같은 봉지예요!\nmin/max로 항상 작은 수가 앞에 오게 정리해요.")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "packs = []",
              "for _ in range(N):",
              "    a, b = map(int, input().split())",
              "    packs.append((min(a,b), max(a,b)))",
            ]}
            highlight={[3, 4]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: "#f97316", fontWeight: 700, textAlign: "center" }}>
            (2,1) → min=1, max=2 → <span style={{ fontWeight: 700 }}>(1,2)</span> ✓
          </div>
        </div>),
    },
    // 3-2: Counter
    {
      type: "reveal",
      narr: t(E,
        "Count how many of each bag type using Counter.\nThis lets us quickly look up A, B, C counts!", "Counter로 같은 종류의 봉지가 몇 개인지 세. 이러면 A, B, C 개수를 바로 알 수 있어요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f97316", marginBottom: 6 }}>
            {t(E, "Step 2: Count bag types", "2단계: 봉지 종류별 개수 세기")}
          </div>
          <CodeSnippet
            lines={[
              "from collections import Counter",
              "pair_count = Counter(packs)",
            ]}
            highlight={[0, 1]}
          />
          <div style={{
            marginTop: 10, background: "#fff7ed", borderRadius: 10,
            padding: 10, border: "1px solid #fdba74",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f97316", marginBottom: 4 }}>
              {t(E, "Example result:", "예시 결과:")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.text, lineHeight: 1.8 }}>
              {"{"}<br />
              {"  (1,1): 3,  (1,2): 2,"}<br />
              {"  (1,3): 2,  (2,2): 1"}<br />
              {"}"}
            </div>
          </div>
        </div>),
    },
    // 3-3: Colors + combinations
    {
      type: "reveal",
      narr: t(E,
        "Collect all the colors that appear, then go through every pair of colors.", "나오는 색깔을 전부 모은 다음, 2개씩 짝을 지어 확인해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f97316", marginBottom: 6 }}>
            {t(E, "Step 3: Get color pairs", "3단계: 색 쌍 구하기")}
          </div>
          <CodeSnippet
            lines={[
              "from itertools import combinations",
              "",
              "colors = set()",
              "for a, b in packs:",
              "    colors.add(a)",
              "    colors.add(b)",
              "",
              "# combinations(sorted(colors), 2)",
              "# → (1,2), (1,3), (2,3)",
            ]}
            highlight={[2, 3, 4, 5]}
          />
          <div style={{
            display: "flex", justifyContent: "center", gap: 6, marginTop: 10,
          }}>
            {["(1,2)", "(1,3)", "(2,3)"].map((p, i) => (
              <div key={i} style={{
                padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                fontFamily: "'JetBrains Mono',monospace",
                background: "#fff7ed", border: "1px solid #fdba74", color: "#f97316",
              }}>{p}</div>
            ))}
          </div>
        </div>),
    },
    // 3-4: Main loop + formula
    {
      type: "reveal",
      narr: t(E,
        "The main loop!\nFor each pair (x,y), look up how many A, B, C bags exist, then apply the formulas.", "핵심 반복문! 색 쌍 (x,y)마다 A, B, C 봉지가 몇 개인지 찾고, 공식 두 개를 적용해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f97316", marginBottom: 6 }}>
            {t(E, "Step 4: Count valid ways!", "4단계: 가능한 방법 수 세기!")}
          </div>
          <CodeSnippet
            lines={[
              "answer = 0",
              "for x, y in combinations(sorted(colors), 2):",
              "    A = pair_count.get((x, x), 0)",
              "    B = pair_count.get((y, y), 0)",
              "    C = pair_count.get((x, y), 0)",
              "    answer += A * B * C",
              "    answer += C * (C-1) * (C-2) // 6",
              "",
              "print(answer)",
            ]}
            highlight={[5, 6]}
          />
          <div style={{
            marginTop: 10, background: "#d1fae5", borderRadius: 10,
            padding: "8px 12px", border: "1px solid #6ee7b7", textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>
              {t(E, "That's the complete algorithm! 🎉", "이게 전체 알고리즘! 🎉")}
            </div>
          </div>
        </div>),
    },
    // 3-5: Formula trace
    {
      type: "formulaTrace",
      narr: t(E,
        "Let's trace through the sample, pair by pair! See how each color pair adds to the answer.", "예제를 색 쌍별로 따라가보자! 각 색 쌍에서 답이 얼마나 늘어나는지 봐요."),
    },
    // 3-6: Full code reveal
    {
      type: "code",
      narr: t(E,
        "Here's the complete solution! Read bags → count types → check each color pair. 🎃", "전체 풀이 코드예요! 봉지 읽기 → 종류별 세기 → 색 쌍마다 공식 적용. 🎃"),
      code: SOLUTION_CODE,
      label: t(E, "Show complete code", "전체 코드 보기"),
    },
  ];
}
