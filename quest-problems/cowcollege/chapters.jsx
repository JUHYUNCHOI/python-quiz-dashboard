import { C, t } from "@/components/quest/theme";
import { getCowCollegeSections, TuitionSlider } from "./components";

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
      const baseColor = isHl ? "#fcd34d" : "#e2e8f0";
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


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowCollegeCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Pick one tuition price to maximize total revenue.",
        "등록금을 하나만 정해서 수입을 가장 크게 만들어 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\uD83C\uDF93"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Cow College</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2022 Bronze #1</div>
          </div>

          {/* \uD83C\uDFAF Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              {"\uD83C\uDFAF"} {t(E, "Mission", "\uBBF8\uC158")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the maximum total revenue and a price P that achieves it.",
                "\uCD5C\uB300 \uCD1D \uC218\uC785\uACFC \uADF8 \uC218\uC785\uC744 \uB9CC\uB4DC\uB294 \uAC00\uACA9 P \uB97C \uCD9C\uB825\uD574\uC694.")}
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
                  <b style={{ color: "#d97706" }}>{t(E, "N cows", "N마리 소")}</b>
                  {t(E, ", each with a maximum tuition ", " 가 있고, 각자 최대 등록금 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>c[i]</code>
                  {t(E, " she's willing to pay.", " 를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ picks ", "FJ 가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "ONE tuition price P", "단 하나의 등록금 P")}</b>
                  {t(E, " — every cow with c[i] ≥ P pays P, the rest pay 0.",
                        " 를 정하면, c[i] ≥ P 인 소만 P 를 내고 나머지 소는 한 푼도 안 내요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum total revenue and a price P that achieves it", "최대 총 수입과 그 수입을 만드는 가격 P")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문 cpid=1251) — 시즌 표준(photoshoot25) 형식
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N, then one line of N tuition caps.",
        "입력은 소의 수 N, 그다음 최대 등록금이 한 줄로 와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of cows", "— 소의 수")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>c₁ c₂ … cₙ</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— each cow's max tuition, one line", "— 각 소의 최대 등록금, 한 줄")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "Two numbers on one line — the maximum revenue, and the price P that achieves it (smallest P if there's a tie).",
                  "한 줄에 숫자 2개 — 최대 수입과 그 수입을 만드는 가격 P (여럿이면 가장 작은 P) 를 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 10⁵ {t(E, "(= 100,000)", "(= 10만)")}</div>
              <div>1 ≤ c ≤ 10⁶ {t(E, "(= 1 million)", "(= 100만)")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Visual — cows with max tuition as bar chart
    {
      type: "reveal",
      narr: t(E,
        "Let's visualize!\nEach cow has a maximum tuition she can pay.\nUnsorted first, then we'll see why sorting helps.", "소마다 낼 수 있는 최대 등록금이 얼마인지 그림으로 봐요."),
      content: (() => {
        const unsorted = [6, 1, 6, 4];
        const colors = ["#d97706", "#059669", "#7c3aed", "#dc2626"];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
              {t(E, "4 cows with max tuitions", "4마리 소의 최대 등록금")}
            </div>
            {/* Cow icons with values */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 14 }}>
              {unsorted.map((v, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{"\uD83D\uDC2E"}</div>
                  <div style={{
                    width: 44, padding: "4px 0", borderRadius: 8,
                    background: `${colors[i]}20`, border: `1.5px solid ${colors[i]}`,
                    fontSize: 16, fontWeight: 700, color: colors[i],
                    fontFamily: "'JetBrains Mono', monospace", textAlign: "center",
                  }}>${v}</div>
                </div>
              ))}
            </div>
            {/* Revenue idea */}
            <div style={{
              background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10,
              padding: 10, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {t(E,
                "If we set tuition = $4, which cows can pay?\nThose with max >= 4: cows with $6, $6, $4. That's 3 cows. Revenue = 4 x 3 = 12.", "등록금을 $4 로 정하면 누가 낼 수 있을까요?\n최대가 4 이상인 소는 $6, $6, $4 로 세 마리예요.\n수입 = 4 x 3 = 12 이에요.")}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: Why sorting helps — visual
    {
      type: "reveal",
      narr: t(E,
        "If we SORT the tuitions, something magical happens!\nWhen we pick c[i] as tuition, all cows from index i onward can afford it!", "등록금을 정렬하면 i 번 자리부터 뒤쪽 소가 모두 낼 수 있어요."),
      content: (() => {
        const sorted = [1, 4, 6, 6];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
              {t(E, "After sorting: [1, 4, 6, 6]", "정렬 후: [1, 4, 6, 6]")}
            </div>
            {/* Sorted bar chart */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, alignItems: "flex-end", marginBottom: 12, height: 100 }}>
              {sorted.map((v, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 42, height: v * 14,
                    background: i >= 1 ? C.ok : "#e5e7eb",
                    border: `1px solid ${i >= 1 ? C.ok : C.dim}`,
                    borderRadius: "6px 6px 0 0",
                    display: "flex", alignItems: "flex-start", justifyContent: "center",
                    paddingTop: 2,
                  }}>
                    <span style={{
                      fontSize: 13, fontWeight: 700, color: i >= 1 ? "#fff" : C.dim,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>${v}</span>
                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 600, color: C.dim, marginTop: 2,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>i={i}</div>
                </div>
              ))}
            </div>
            {/* Explanation */}
            <div style={{
              background: C.okBg, border: `1px solid ${C.okBd}`, borderRadius: 10,
              padding: 10, fontSize: 12, color: C.text, lineHeight: 1.8,
            }}>
              <div style={{ fontWeight: 600, color: C.ok, marginBottom: 4 }}>
                {t(E, "Tuition = c[1] = $4", "등록금 = c[1] = $4")}
              </div>
              {t(E,
                "Sorted, so everything from index 1 onward is at least 4 — the green bars can all pay!\nCount = N - i = 4 - 1 = 3. Revenue = 4 x 3 = 12", "정렬했으니 1 번 자리부터 뒤는 모두 4 이상이에요.\n그래서 초록 막대 소들은 다 낼 수 있어요.\n소 수 = N - i = 4 - 1 = 3. 수입 = 4 x 3 = 12")}
            </div>
          </div>
        );
      })(),
    },
    // 1-4: Quiz — revenue calculation
    {
      type: "quiz",
      narr: t(E,
        "Sorted c = [1, 4, 6, 6].\nIf tuition = 6 (index 2), how many cows pay and what's the revenue?", "등록금을 2 번 자리의 6 으로 정하면 수입은 얼마일까요?"),
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
        "정답이에요! 2 번 자리라서 내는 소는 N - i = 4 - 2 = 2 마리예요.\n수입은 6 x 2 = 12 이에요."),
    },
    // 1-5: Full revenue table
    {
      type: "reveal",
      narr: t(E,
        "Let's try EVERY possible tuition on sorted c = [1, 4, 6, 6] and see which gives the most revenue!", "등록금 후보를 하나씩 다 넣어 보고 수입을 비교해요."),
      content: (() => {
        const rows = [
          { i: 0, t: 1, cows: 4, rev: 4 },
          { i: 1, t: 4, cows: 3, rev: 12 },
          { i: 2, t: 6, cows: 2, rev: 12 },
          { i: 3, t: 6, cows: 1, rev: 6 },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
              {t(E, "Try each c[i] as tuition", "각 c[i]를 등록금으로 시도")}
            </div>
            <div style={{
              borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}`,
              fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "35px 60px 60px 80px",
                background: "#1e293b", color: "#e2e8f0", padding: "6px 8px", fontWeight: 600,
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
                    <span style={{ color: C.accent, fontWeight: 600 }}>{r.i}</span>
                    <span style={{ color: C.text }}>${r.t}</span>
                    <span style={{ color: C.text }}>N-{r.i}={r.cows}</span>
                    <span style={{ fontWeight: 700, color: best ? C.ok : C.text }}>
                      {r.t}x{r.cows}=<span style={{ fontSize: best ? 16 : 12 }}>{r.rev}</span>
                      {best ? " ★" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{
              marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 700, color: C.ok,
            }}>
              {t(E, "Max revenue = 12 (tuition = $4)", "최대 수입 = 12 (등록금 = $4)")}
            </div>
          </div>
        );
      })(),
    },
    // 1-6: Interactive slider — drag price, see revenue live
    {
      type: "reveal",
      narr: t(E,
        "Your turn — drag the price slider. Watch which cows pay (green) and which skip (gray). Find the price that maxes revenue!",
        "슬라이더를 움직여서 수입이 가장 큰 가격을 찾아봐요."),
      content: <TuitionSlider E={E} sorted={[1, 2, 3, 4, 5]} />,
    },
    // 1-7: Input practice (same dataset as the slider above)
    {
      type: "input",
      narr: t(E,
        "Now lock in your answer. After playing with the slider, what's the max revenue?",
        "슬라이더로 해 봤으니 이제 최대 수입을 적어 봐요."),
      question: t(E,
        "c = [1, 2, 3, 4, 5]. Max revenue = ?",
        "c = [1, 2, 3, 4, 5]. 최대 수입 = ?"),
      hint: t(E,
        "Revenue = price × (cows able to pay).  Try every choice of price.",
        "수입 = 가격 × (낼 수 있는 소 수) 예요.\n가격 후보를 하나씩 다 넣어 봐요."),
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
        "The algorithm: Sort the array.\nThen sweep through, trying each c[i] as the tuition.\nCount = N-i.\nTrack maximum revenue.", "정렬한 뒤 c[i] 를 하나씩 등록금으로 넣어 보며 비교해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
            {t(E, "Sort + Sweep", "정렬하고 훑기")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { step: "1", desc: t(E, "Sort array c in ascending order", "배열 c 를 오름차순으로 정렬해요"), icon: "↑" },
              { step: "2", desc: t(E, "For each index i from 0 to N-1", "자리 i 를 0부터 N-1까지 돌아요"), icon: "→" },
              { step: "3", desc: t(E, "tuition = c[i], cows = N - i", "등록금 = c[i], 소 수 = N - i"), icon: "=" },
              { step: "4", desc: t(E, "revenue = c[i] x (N - i)", "수입 = c[i] x (N - i)"), icon: "x" },
              { step: "5", desc: t(E, "Track maximum revenue", "가장 큰 수입을 기억해요"), icon: "★" },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#fffbeb", border: "1.5px solid #fcd34d",
                borderRadius: 8, padding: "6px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: "#d97706", color: "#fff", fontSize: 13, fontWeight: 700,
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
        "Let's trace c = [2, 5, 3, 8, 1]. After sorting: [1, 2, 3, 5, 8].", "c = [2, 5, 3, 8, 1] 을 정렬해서 하나씩 따라가 봐요."),
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
            <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
              {t(E, "Trace: sorted c = [1, 2, 3, 5, 8]", "추적: 정렬된 c = [1, 2, 3, 5, 8]")}
            </div>
            <div style={{
              borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}`,
              fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "30px 50px 55px 80px 40px",
                background: "#1e293b", color: "#e2e8f0", padding: "6px 6px", fontWeight: 600,
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
                    <span style={{ color: C.accent, fontWeight: 600 }}>{r.i}</span>
                    <span style={{ color: C.text }}>${r.t}</span>
                    <span style={{ color: C.text }}>{r.cows}</span>
                    <span style={{ fontWeight: 600, color: isBest ? C.ok : C.text }}>
                      {r.t}x{r.cows}={r.rev}{isBest ? " ★" : ""}
                    </span>
                    <span style={{ fontWeight: 700, color: "#d97706" }}>
                      {Math.max(...rows.slice(0, idx + 1).map(x => x.rev))}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{
              marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 700, color: C.ok,
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
        "Time complexity: O(N log N) for sorting + O(N) for the sweep. Total: O(N log N).", "정렬이 O(N log N), 훑기가 O(N) 이라 전체는 O(N log N) 이에요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#d97706", fontFamily: "'JetBrains Mono', monospace" }}>
            O(N log N)
          </div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Sorting takes O(N log N).\nThe single sweep is O(N). Since O(N log N) > O(N), total = O(N log N). For N up to 100,000, this runs instantly!",
              "정렬은 O(N log N) 이고 한 번 훑는 건 O(N) 이에요.\nO(N log N) 이 더 크니까 전체도 O(N log N) 이에요.\nN 이 100,000 까지 커져도 바로 끝나요!")}
          </div>
        </div>),
    },
    // 2-4: Hand calculation
    {
      type: "input",
      narr: t(E,
        "Sort first, then try each entry as the tuition.",
        "정렬한 뒤 각 값을 등록금으로 넣어 봐요."),
      question: t(E,
        "c = [3, 1, 2]. Max revenue = ?",
        "c = [3, 1, 2]. 최대 수입 = ?"),
      hint: t(E,
        "After sorting, count cows able to pay each price and multiply.",
        "정렬한 뒤 가격마다 낼 수 있는 소 수를 세어 곱해 봐요."),
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
        "The answer is the max revenue and its tuition.\nFirst read the values.", "답은 최고 수입과 그때 등록금이에요.\n먼저 값부터 읽어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "First line: N (number of cows). Second line: N max tuitions.",
              "첫 줄에는 소의 수 N 이 있고, 둘째 줄에는 최대 등록금 N 개가 있어요.")}
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
        "How fast can we count how many cows afford each price?", "가격마다 낼 수 있는 소 수를 어떻게 빠르게 셀까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 2: Sort the array", "2단계: 배열 정렬")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "Checking every cow for every price is slow — O(N^2).\nSorting fixes that: cows that can pay c[i] all sit after index i.",
              "후보마다 모든 소를 다시 세면 느려요 (O(N²)).\n정렬해두면 c[i] 를 낼 수 있는 소가 i 번 뒤에 모여요.")}
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
              <div style={{ fontSize: 10, fontWeight: 600, color: C.dim, marginBottom: 4 }}>
                {t(E, "Before", "정렬 전")}
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {[6, 1, 6, 4].map((v, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: 6, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    background: C.noBg, border: `1px solid ${C.noBd}`,
                    fontSize: 13, fontWeight: 700, color: C.no,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{v}</div>
                ))}
              </div>
            </div>
            <span style={{ fontSize: 20, color: "#d97706" }}>→</span>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: C.dim, marginBottom: 4 }}>
                {t(E, "After", "정렬 후")}
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 4, 6, 6].map((v, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: 6, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    background: C.okBg, border: `1px solid ${C.okBd}`,
                    fontSize: 13, fontWeight: 700, color: C.ok,
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
        "So sweep the sorted array:\nrevenue = c[i] x (N-i) at each i, track the best.", "그래서 정렬된 배열을 훑어요.\n수입 = c[i] x (N-i) 를 구해 최댓값을 기억해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 3: Sweep and track maximum", "3단계: 훑으며 가장 큰 값 찾기")}
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
              "문제가 둘 다 물어보니까 최고 수입과 해당 등록금을 모두 추적해요.")}
          </div>
        </div>),
    },
    // 3-4: Quiz — why N-i?
    {
      type: "quiz",
      narr: t(E,
        "Quick check: in sorted array c, why does cows_paying = N - i?", "정렬된 배열 c 에서 cows_paying = N - i 인 이유가 뭘까요?"),
      question: t(E,
        "Why is cows_paying = N - i in sorted array?",
        "정렬된 배열에서 cows_paying = N - i인 이유는?"),
      options: [
        t(E, "Because c[i] is the largest value", "c[i]가 최댓값이니까"),
        t(E, "Because all cows at index i..N-1 have c[j] >= c[i]", "i..N-1 자리의 모든 소가 c[j] >= c[i] 니까"),
        t(E, "Because we skip the first i cows randomly", "처음 i마리를 무작위로 건너뛰니까"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Since the array is sorted in ascending order, all elements from index i to N-1 are >= c[i]. So N-i cows can afford tuition c[i].",
        "정답이에요! 배열이 오름차순이라 i 번 자리부터 끝까지\n모든 값이 c[i] 보다 크거나 같아요.\n그래서 N-i 마리가 등록금 c[i] 를 낼 수 있어요."),
    },
    // 3-5: Step 4 — Print + full code
    {
      type: "reveal",
      narr: t(E,
        "Last step: print the best revenue and the tuition price. That's the complete solution!", "마지막으로 가장 큰 수입과 그때의 등록금을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 4: Print the answer!", "4단계: 답 출력!")}
          </div>
          <CodeSnippet
            lines={SOLUTION_CODE}
            highlight={[22]}
          />
          <div style={{
            marginTop: 10, background: C.okBg, borderRadius: 10,
            padding: "8px 12px", border: `1px solid ${C.okBd}`, textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>
              {t(E, "Complete code! Sort + sweep in O(N log N)!", "전체 코드 완성! 정렬하고 훑기로 O(N log N) 이에요!")}
            </div>
          </div>
        </div>),
    },
  ];
}
