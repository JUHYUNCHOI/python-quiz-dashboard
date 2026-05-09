import { C, t } from "@/components/quest/theme";
import { getDaisyChainsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "p = list(map(int, input().split()))",
  "",
  "count = 0",
  "for i in range(N):",
  "    s = 0",
  "    for j in range(i, N):",
  "        s += p[j]",
  "        length = j - i + 1",
  "        if s % length == 0:",
  "            avg = s // length",
  "            if avg in p[i:j+1]:",
  "                count += 1",
  "",
  "print(count)",
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
   Chapter 1: 📋 문제 이해 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDaisyCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Bessie has N flowers in a row, each with a petal count p[i]. For every contiguous subarray, compute the average petal count; the subarray is 'photogenic' if at least one flower in it has petal count exactly equal to the average.\nCount how many of the N·(N+1)/2 contiguous subarrays are photogenic.",
        "Bessie에게 한 줄로 놓인 N개의 꽃이 있고, 각 꽃의 꽃잎 수 p[i]가 주어져요. 연속한 부분 배열을 고를 때마다 그 안의 평균 꽃잎 수를 계산해요. 그 부분 배열에 평균과 정확히 같은 꽃잎 수의 꽃이 1개라도 있으면 '예쁜' 부분 배열이에요.\nN·(N+1)/2 개의 연속 부분 배열 중 예쁜 것의 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\uD83C\uDF3C"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.carry }}>Daisy Chains</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2020 Bronze #2</div>
          </div>

          {/* \uD83C\uDFAF Mission box */}
          <div style={{ background: C.carryBg, border: `1.5px solid ${C.carry}`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.carry, letterSpacing: 0.5, marginBottom: 4 }}>
              \uD83C\uDFAF {t(E, "Mission", "\uBBF8\uC158")}
            </div>
            <div style={{ fontSize: 13, color: C.carry, lineHeight: 1.5 }}>
              {t(E,
                "Output the number of contiguous subarrays whose average petal count exactly equals at least one flower in that subarray.",
                "\uC5F0\uC18D \uBD80\uBD84 \uBC30\uC5F4 \uC911 \u2014 \uD3C9\uADE0 \uAF43\uC78E \uC218\uAC00 \uADF8 \uC548\uC758 \uC5B4\uB5A4 \uAF43\uC758 \uAF43\uC78E \uC218\uC640 \uC815\uD655\uD788 \uAC19\uC740 \u2014 \uBD80\uBD84 \uBC30\uC5F4 \uAC1C\uC218 \uCD9C\uB825.")}
            </div>
          </div>

          <div style={{ background: C.carryBg, border: `1px solid ${C.carryBd}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: C.carry, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has ", "Bessie에게 ")}
                  <b style={{ color: C.carry }}>{t(E, "N flowers in a row", "한 줄로 놓인 N개의 꽃")}</b>
                  {t(E, ", each with petal count ", "이 있고, 각 꽃의 꽃잎 수 ")}
                  <code style={{ background: "#f1f5f9", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>p[i]</code>
                  {t(E, ".", "이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: C.carry, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "For each ", "각 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "contiguous subarray", "연속 부분 배열")}</b>
                  {t(E, ", compute the ", " 마다 평균 꽃잎 수를 계산해요. 그 부분 배열에 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "average petal count", "평균과 정확히 같은 꽃잎 수")}</b>
                  {t(E, " — the subarray is 'photogenic' if any flower in it has petal count equal to that average.",
                        "의 꽃이 1개라도 있으면 그 부분 배열은 '예쁜' 부분 배열이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: `1px dashed ${C.carryBd}` }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of photogenic contiguous subarrays", "예쁜 연속 부분 배열의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: What is average? Visual with flowers
    {
      type: "reveal",
      narr: t(E,
        "The average of a group is the sum divided by the count.\nFor example, flowers [2, 4, 6]: sum=12, count=3, average=4.", "그룹의 평균은 합을 개수로 나눈 거예요. 예: 꽃 [2, 4, 6]: 합=12, 개수=3, 평균=4."),
      content: (() => {
        const petals = [2, 4, 6];
        const colors = [C.bessie, C.carry, C.accent];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 10 }}>
              {t(E, "What is an average?", "평균이란?")}
            </div>
            {/* Flowers as circles */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
              {petals.map((p, i) => (
                <div key={i} style={{
                  width: 54, height: 54, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${colors[i]}15`, border: `3px solid ${colors[i]}`,
                  fontSize: 20, fontWeight: 700, color: colors[i],
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{p}</div>
              ))}
            </div>
            {/* Calculation */}
            <div style={{
              background: C.carryBg, borderRadius: 10, padding: 10,
              border: `1px solid ${C.carryBd}`, textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: C.text,
            }}>
              <div style={{ marginBottom: 4 }}>
                {t(E, "sum", "합")} = 2 + 4 + 6 = <span style={{ fontWeight: 700, color: C.carry }}>12</span>
              </div>
              <div style={{ marginBottom: 4 }}>
                {t(E, "count", "개수")} = <span style={{ fontWeight: 700, color: C.carry }}>3</span>
              </div>
              <div>
                {t(E, "average", "평균")} = 12 / 3 = <span style={{ fontWeight: 700, color: C.ok, fontSize: 18 }}>4</span>
              </div>
            </div>
            <div style={{
              marginTop: 8, textAlign: "center", fontSize: 13, fontWeight: 600, color: C.ok,
            }}>
              {t(E, "Flower with 4 petals exists! Valid subarray!", "꽃잎 4개인 꽃이 있어요! 유효한 부분 배열!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: Valid vs invalid example — visual
    {
      type: "reveal",
      narr: t(E,
        "Not every subarray works!\nThe average must be an integer AND some flower must have exactly that many petals.", "모든 부분 배열이 되는 건 아니에요! 평균이 정수여야 하고 그 개수의 꽃잎을 가진 꽃이 있어야 해요."),
      content: (() => {
        const flowers = [1, 1, 2];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 10 }}>
              {t(E, "Flowers: [1, 1, 2]", "꽃: [1, 1, 2]")}
            </div>
            {/* Full flower row */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 14 }}>
              {flowers.map((p, i) => (
                <div key={i} style={{
                  width: 48, height: 48, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: C.carryBg, border: `3px solid ${C.carryBd}`,
                  fontSize: 20, fontWeight: 700, color: C.carry,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{p}</div>
              ))}
            </div>
            {/* Valid example */}
            <div style={{
              background: C.okBg, border: `1px solid ${C.okBd}`, borderRadius: 10,
              padding: 10, marginBottom: 8,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.ok, marginBottom: 4 }}>
                ✅ {t(E, "Subarray [1, 1]: avg = 1", "부분 배열 [1, 1]: 평균 = 1")}
              </div>
              <div style={{ fontSize: 12, color: C.text }}>
                {t(E, "Any flower = 1? YES (both flowers!)", "꽃잎 = 1인 꽃? YES (둘 다!)")}
              </div>
            </div>
            {/* Invalid example */}
            <div style={{
              background: C.noBg, border: `1px solid ${C.noBd}`, borderRadius: 10,
              padding: 10,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.no, marginBottom: 4 }}>
                ❌ {t(E, "Subarray [1, 3]: avg = 2", "부분 배열 [1, 3]: 평균 = 2")}
              </div>
              <div style={{ fontSize: 12, color: C.text }}>
                {t(E, "Any flower = 2? NO! Neither 1 nor 3 equals 2.", "꽃잎 = 2인 꽃? NO! 1도 3도 2가 아니에요.")}
              </div>
            </div>
          </div>
        );
      })(),
    },
    // 1-4: Quiz — check a subarray
    {
      type: "quiz",
      narr: t(E,
        "Let's check: flowers [1, 1, 2]. The subarray [1, 1] has average 1. Is this valid?", "확인해보자: 꽃 [1, 1, 2]. 부분 배열 [1, 1]의 평균은 1. 유효할까?"),
      question: t(E,
        "Flowers [1, 1, 2]. Subarray [1, 1]: avg = 1. Valid?",
        "꽃 [1, 1, 2]. 부분 배열 [1, 1]: 평균 = 1. 유효?"),
      options: [
        t(E, "Yes! Both flowers have 1 petal = the average", "예! 두 꽃 모두 꽃잎 1개 = 평균"),
        t(E, "No, average must be non-integer", "아니오, 평균이 정수가 아니어야 해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! avg = (1+1)/2 = 1, and both flowers have 1 petal. This subarray is valid!",
        "정답! 평균 = (1+1)/2 = 1이고 두 꽃 모두 꽃잎이 1개. 유효한 부분 배열이에요!"),
    },
    // 1-5: Complete enumeration visual
    {
      type: "reveal",
      narr: t(E,
        "Let's enumerate ALL subarrays of [1, 1, 2] and check each one!", "[1, 1, 2]의 모든 부분 배열을 나열하고 각각 확인해보자!"),
      content: (() => {
        const checks = [
          { sub: "[1]",     sum: 1, len: 1, avg: "1", has: true },
          { sub: "[1]",     sum: 1, len: 1, avg: "1", has: true },
          { sub: "[2]",     sum: 2, len: 1, avg: "2", has: true },
          { sub: "[1,1]",   sum: 2, len: 2, avg: "1", has: true },
          { sub: "[1,2]",   sum: 3, len: 2, avg: "1.5", has: false },
          { sub: "[1,1,2]", sum: 4, len: 3, avg: "1.33", has: false },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 10 }}>
              {t(E, "All subarrays of [1, 1, 2]", "[1, 1, 2]의 모든 부분 배열")}
            </div>
            <div style={{
              borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}`,
              fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
            }}>
              {/* Header */}
              <div style={{
                display: "grid", gridTemplateColumns: "70px 40px 40px 50px 50px",
                background: "#1e293b", color: "#e2e8f0", padding: "6px 6px", fontWeight: 600,
              }}>
                <span>{t(E, "Sub", "부분")}</span>
                <span>{t(E, "Sum", "합")}</span>
                <span>{t(E, "Len", "길이")}</span>
                <span>{t(E, "Avg", "평균")}</span>
                <span>{t(E, "Valid", "유효")}</span>
              </div>
              {checks.map((c, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "70px 40px 40px 50px 50px",
                  background: c.has ? C.okBg : C.noBg,
                  padding: "5px 6px", borderBottom: i < checks.length - 1 ? `1px solid ${C.border}` : "none",
                }}>
                  <span style={{ color: C.text, fontWeight: 700 }}>{c.sub}</span>
                  <span style={{ color: C.text }}>{c.sum}</span>
                  <span style={{ color: C.text }}>{c.len}</span>
                  <span style={{ color: c.has ? C.ok : C.no, fontWeight: 600 }}>{c.avg}</span>
                  <span style={{ fontWeight: 600 }}>{c.has ? "✅" : "❌"}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 700, color: C.ok,
            }}>
              {t(E, "4 valid subarrays out of 6 total!", "총 6개 중 4개 유효!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-6: Input — count valid subarrays
    {
      type: "input",
      narr: t(E,
        "List every contiguous subarray of [1, 1].  For each, compare the average to the petal counts.",
        "[1, 1] 의 모든 연속 부분 배열을 나열해. 각각 평균과 꽃잎 수를 비교."),
      question: t(E,
        "Flowers = [1, 1]. Count of valid subarrays?",
        "꽃 = [1, 1]. 유효한 부분 배열 수?"),
      hint: t(E,
        "There are 3 contiguous subarrays.  Check each — does any flower equal the subarray average?",
        "연속 부분 배열은 3 개. 각각 — 평균과 같은 꽃잎 수의 꽃이 있나?"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 알고리즘 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDaisyCh2(E) {
  return [
    // 2-1: Algorithm overview
    {
      type: "reveal",
      narr: t(E,
        "The algorithm: enumerate all subarrays using two nested loops.\nFor each, compute the sum and check the condition.", "알고리즘: 이중 반복문으로 모든 부분 배열 열거. 각각 합을 계산하고 조건 확인."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 10 }}>
            {t(E, "Enumerate all subarrays (i, j)", "모든 부분 배열 (i, j) 열거")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { step: "1", desc: t(E, "Fix start index i", "시작 인덱스 i 고정") },
              { step: "2", desc: t(E, "Extend end index j from i to N-1", "끝 인덱스 j를 i부터 N-1까지") },
              { step: "3", desc: t(E, "Accumulate sum as j extends", "j가 늘어나며 합 누적") },
              { step: "4", desc: t(E, "Check: is sum divisible by length?", "확인: 합이 길이로 나누어지나?") },
              { step: "5", desc: t(E, "If yes, does any flower = average?", "그렇다면 평균과 같은 꽃이 있나?") },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: C.carryBg, border: `1.5px solid ${C.carryBd}`,
                borderRadius: 8, padding: "6px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: C.carry, color: "#fff", fontSize: 13, fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{s.step}</div>
                <span style={{ fontSize: 12, color: C.text, fontWeight: 700 }}>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>),
    },
    // 2-2: Trace walkthrough with [1, 1, 2]
    {
      type: "reveal",
      narr: t(E,
        "Let's trace through [1, 1, 2] step by step. Watch how i and j sweep through all pairs!", "[1, 1, 2]을 단계별로 추적해보자. i와 j가 모든 쌍을 어떻게 탐색하는지 봐요!"),
      content: (() => {
        const rows = [
          { i: 0, j: 0, sub: "p[0:1]=[1]",    s: 1, l: 1, avg: "1",    chk: "1 in [1]?", ok: true },
          { i: 0, j: 1, sub: "p[0:2]=[1,1]",   s: 2, l: 2, avg: "1",    chk: "1 in [1,1]?", ok: true },
          { i: 0, j: 2, sub: "p[0:3]=[1,1,2]", s: 4, l: 3, avg: "1.33", chk: "not int",    ok: false },
          { i: 1, j: 1, sub: "p[1:2]=[1]",     s: 1, l: 1, avg: "1",    chk: "1 in [1]?",  ok: true },
          { i: 1, j: 2, sub: "p[1:3]=[1,2]",   s: 3, l: 2, avg: "1.5",  chk: "not int",    ok: false },
          { i: 2, j: 2, sub: "p[2:3]=[2]",     s: 2, l: 1, avg: "2",    chk: "2 in [2]?",  ok: true },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 10 }}>
              {t(E, "Trace: [1, 1, 2]", "추적: [1, 1, 2]")}
            </div>
            <div style={{
              borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}`,
              fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "22px 22px 55px 28px 28px 45px",
                background: "#1e293b", color: "#e2e8f0", padding: "5px 4px", fontWeight: 600, gap: 4,
              }}>
                <span>i</span><span>j</span><span>{t(E, "sum", "합")}</span>
                <span>{t(E, "len", "길이")}</span><span>{t(E, "avg", "평균")}</span><span>{t(E, "valid", "유효")}</span>
              </div>
              {rows.map((r, idx) => (
                <div key={idx} style={{
                  display: "grid", gridTemplateColumns: "22px 22px 55px 28px 28px 45px",
                  background: r.ok ? C.okBg : C.noBg,
                  padding: "4px 4px", borderBottom: idx < rows.length - 1 ? `1px solid ${C.border}` : "none",
                  gap: 4,
                }}>
                  <span style={{ color: C.accent, fontWeight: 600 }}>{r.i}</span>
                  <span style={{ color: C.accent, fontWeight: 600 }}>{r.j}</span>
                  <span style={{ color: C.text }}>{r.s}</span>
                  <span style={{ color: C.text }}>{r.l}</span>
                  <span style={{ color: r.ok ? C.ok : C.no, fontWeight: 600 }}>{r.avg}</span>
                  <span>{r.ok ? "✅" : "❌"}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 700, color: C.ok,
            }}>
              count = <span style={{ fontSize: 18 }}>4</span>
            </div>
          </div>
        );
      })(),
    },
    // 2-3: (key optimization trick — running sum — explained inline in Ch3 code sections)
    // 2-4: Practice — hand calculation
    {
      type: "input",
      narr: t(E,
        "Try it on [2, 2] yourself.  Walk through every contiguous subarray.",
        "[2, 2] 직접 — 모든 연속 부분 배열 따라가."),
      question: t(E,
        "Flowers = [2, 2]. Count of valid subarrays?",
        "꽃 = [2, 2]. 유효한 부분 배열 수?"),
      hint: t(E,
        "Compute each subarray's average and check it appears in the subarray.",
        "각 부분 배열의 평균을 계산하고 그 평균과 같은 꽃잎 수가 있는지 확인."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDaisyCh3(E, lang = "py") {
  return [
    // 3-1: Step 1 — Read input
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code! First, read N and the petal counts.", "코드를 만들자! 먼저 N과 꽃잎 수를 읽어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "First line: N. Second line: N petal counts separated by spaces.",
              "첫 줄: N. 둘째 줄: 공백으로 구분된 N개의 꽃잎 수.")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "p = list(map(int, input().split()))",
            ]}
            highlight={[0, 1]}
          />
          <div style={{
            marginTop: 10, background: C.carryBg, borderRadius: 8, padding: 8,
            border: `1.5px solid ${C.carryBd}`, fontSize: 12, color: C.text,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {t(E, "Example: N=3, p=[1, 1, 2]", "예시: N=3, p=[1, 1, 2]")}
          </div>
        </div>),
    },
    // 3-2: Step 2 — Outer loop + running sum
    {
      type: "reveal",
      narr: t(E,
        "Now the outer loop fixes start index i.\nFor each i, we reset the running sum to 0 and extend j forward.", "이제 바깥 반복이 시작 인덱스 i를 고정해요. 각 i에서 러닝 합을 0으로 초기화하고 j를 앞으로 확장해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 2: Outer loop + running sum", "2단계: 바깥 반복 + 러닝 합")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "p = list(map(int, input().split()))",
              "",
              "count = 0",
              "for i in range(N):",
              "    s = 0",
              "    for j in range(i, N):",
              "        s += p[j]",
            ]}
            highlight={[3, 4, 5, 6, 7]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6, whiteSpace: "pre-line" }}>
            {t(E,
              "count tracks valid subarrays. s accumulates the sum as we extend j.\nNo need to recompute from scratch!", "count는 유효한 부분 배열 수.\ns는 j를 확장하며 합을 누적. 처음부터 다시 계산할 필요 없어요!")}
          </div>
        </div>),
    },
    // 3-3: Step 3 — Check condition
    {
      type: "reveal",
      narr: t(E,
        "For each (i, j) pair: length = j-i+1.\nIf sum is divisible by length, the average is an integer.\nThen check if any flower in the range equals the average.", "각 (i, j) 쌍에서: 길이 = j-i+1. 합이 길이로 나누어지면 평균이 정수. 그다음 범위 내 꽃 중 평균과 같은 것이 있는지 확인."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 3: Check the condition", "3단계: 조건 확인")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "p = list(map(int, input().split()))",
              "",
              "count = 0",
              "for i in range(N):",
              "    s = 0",
              "    for j in range(i, N):",
              "        s += p[j]",
              "        length = j - i + 1",
              "        if s % length == 0:",
              "            avg = s // length",
              "            if avg in p[i:j+1]:",
              "                count += 1",
            ]}
            highlight={[8, 9, 10, 11, 12]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "s % length == 0 checks if avg is an integer. avg in p[i:j+1] checks if any flower in the subarray has that petal count.", "s % length == 0으로 평균이 정수인지 확인.\navg in p[i:j+1]로 부분 배열 내 꽃이 그 꽃잎 수를 가지는지 확인.")}
          </div>
        </div>),
    },
    // 3-4: Quiz — why check s % length?
    {
      type: "quiz",
      narr: t(E,
        "Quick check: why do we check `s % length == 0` before computing the average?", "확인: 평균을 계산하기 전에 왜 `s % length == 0`을 확인할까?"),
      question: t(E,
        "Why check s % length == 0?",
        "s % length == 0을 왜 확인해요?"),
      options: [
        t(E, "To make the code run faster", "코드를 빠르게 하려고"),
        t(E, "Because avg must be integer (petal counts are integers)", "평균이 정수여야 하니까 (꽃잎 수가 정수)"),
        t(E, "It's not necessary, just extra safety", "필요 없고 그냥 안전장치"),
      ],
      correct: 1,
      explain: t(E,
        "Right! Petal counts are integers, so the average must be an integer to match any flower. If sum isn't divisible by length, the average is a fraction and no flower can match!",
        "맞아! 꽃잎 수가 정수니까 평균도 정수여야 어떤 꽃과 일치할 수 있어요. 합이 길이로 나누어지지 않으면 평균이 분수라 일치하는 꽃이 없어요!"),
    },
    // 3-5: Step 4 — Print + full code
    {
      type: "reveal",
      narr: t(E,
        "Finally, print the count. That's the complete solution!", "마지막으로 count를 출력해요. 이게 전체 풀이에요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 4: Print the answer!", "4단계: 답 출력!")}
          </div>
          <CodeSnippet
            lines={SOLUTION_CODE}
            highlight={[20]}
          />
          <div style={{
            marginTop: 10, background: C.okBg, borderRadius: 10,
            padding: "8px 12px", border: `1px solid ${C.okBd}`, textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>
              {t(E, "Complete solution! O(N^2) with running sum!", "전체 풀이 완성! 러닝 합으로 O(N^2)!")}
            </div>
          </div>
        </div>),
    },
  ];
}
