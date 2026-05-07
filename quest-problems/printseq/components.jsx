import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

const A = "#16a34a";

const PSQ_SAMPLE = ["2", "1 1", "1", "4 1", "1 1 1 1"];

/* ════════════════════════════════════════════════════════════════════
   PrintseqExplorer — pick a sequence + K, see YES/NO live.
   ════════════════════════════════════════════════════════════════════ */
const PSQ_PRESETS = [
  { name: "[1] K=1", seq: [1], K: 1 },
  { name: "[1,1,1,1] K=1", seq: [1, 1, 1, 1], K: 1 },
  { name: "[1,2,1,2] K=2", seq: [1, 2, 1, 2], K: 2 },
  { name: "[1,1,2,2] K=2", seq: [1, 1, 2, 2], K: 2 },
  { name: "[1,2,3] K=2", seq: [1, 2, 3], K: 2 },
  { name: "[1,2,3] K=3", seq: [1, 2, 3], K: 3 },
];

// JS port of the recursive checker (small inputs, plain memo).
function canProduce(seq, k, memo) {
  const key = seq.join(",") + "|" + k;
  if (memo.has(key)) return memo.get(key);
  if (seq.length === 0 || k <= 0) { memo.set(key, false); return false; }
  // A: all same → 1 PRINT
  if (seq.every(x => x === seq[0]) && k >= 1) { memo.set(key, true); return true; }
  const n = seq.length;
  // B: repeating block (m ≥ 2 copies, block_len = n/m)
  for (let m = 2; m <= n; m++) {
    if (n % m !== 0) continue;
    const bl = n / m;
    let ok = true;
    for (let i = 0; i < n && ok; i++) if (seq[i] !== seq[i % bl]) ok = false;
    if (ok) {
      if (canProduce(seq.slice(0, bl), k, memo)) { memo.set(key, true); return true; }
    }
  }
  // C: split + budget split
  for (let split = 1; split < n; split++) {
    for (let k1 = 1; k1 < k; k1++) {
      if (canProduce(seq.slice(0, split), k1, memo) &&
          canProduce(seq.slice(split), k - k1, memo)) {
        memo.set(key, true); return true;
      }
    }
  }
  memo.set(key, false); return false;
}

export function PrintseqExplorer({ E }) {
  const [pi, setPi] = useState(0);
  const preset = PSQ_PRESETS[pi];
  const result = canProduce(preset.seq, preset.K, new Map());

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 6, marginBottom: 14 }}>
        {PSQ_PRESETS.map((p, i) => (
          <button key={i} onClick={() => setPi(i)} style={{
            padding: "5px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${pi === i ? A : C.border}`,
            background: pi === i ? "#dcfce7" : "#fff", color: pi === i ? A : C.text, cursor: "pointer",
          }}>{p.name}</button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
        {preset.seq.map((v, i) => (
          <div key={i} style={{
            width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 8, fontWeight: 900, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
            background: "#fff", border: `2px solid ${C.border}`, color: C.text,
          }}>{v}</div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", marginBottom: 12, fontSize: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>K = {preset.K}</span>
        <span style={{ color: C.dim }}>·</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>N = {preset.seq.length}</span>
      </div>

      <div style={{
        background: result ? "#dcfce7" : "#fee2e2",
        border: `2.5px solid ${result ? "#16a34a" : "#ef4444"}`,
        borderRadius: 10, padding: "12px 14px", textAlign: "center",
        fontSize: 18, fontWeight: 900,
        color: result ? "#15803d" : "#7f1d1d",
      }}>
        {result ? "✅ YES" : "❌ NO"}
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, lineHeight: 1.55 }}>
        {t(E,
          "Try each preset. Notice K=1 only handles all-same sequences. K=2 covers blocks like (a^x)(b^y) or alternating (ab)·m. K=3 adds more flexibility.",
          "각 preset 시도. K=1 은 모두 같은 수열만. K=2 는 (a^x)(b^y) 또는 (ab)·m 같은 블록. K=3 부터 더 자유.")}
      </div>
    </div>
  );
}

export function PrintseqSim({ E }) { return <PrintseqExplorer E={E} />; }
export function PrintseqRunner({ E }) {
  return <div style={{ padding: 14, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
    {t(E, "Use the explorer above.", "위 explorer 사용.")}
  </div>;
}

/* ════════════════════════════════════════════════════════════════════
   Progressive code: 5 sections.
   1. Input loop                — read T, then per case
   2. Define recursive can()    — base cases (empty, k<=0)
   3. Option A — all same       — k ≥ 1 → True
   4. Options B + C             — repeating block + split
   5. Memoize + full code       — lru_cache, output YES/NO
   ════════════════════════════════════════════════════════════════════ */

const PSQ_S1_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "T = int(data[p]); p += 1",
  "for _ in range(T):",
  "    N = int(data[p]); p += 1",
  "    K = int(data[p]); p += 1",
  "    a = tuple(int(x) for x in data[p:p+N])",
  "    p += N",
  "    # solve case (next steps)",
];
const PSQ_S1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int N, K;",
  "        cin >> N >> K;",
  "        vector<int> a(N);",
  "        for (int i = 0; i < N; i++) cin >> a[i];",
  "        // solve case (next steps)",
  "    }",
];

const PSQ_S2_PY = [
  "# can(seq, k): is `seq` producible with at most k PRINTs?",
  "def can(seq, k):",
  "    # Base: empty seq cannot be produced; budget exhausted.",
  "    if len(seq) == 0:",
  "        return False",
  "    if k <= 0:",
  "        return False",
  "    # ... (cases A, B, C in next steps)",
  "    return False",
];
const PSQ_S2_CPP = [
  "// pseudo (full code uses memoization in step 5):",
  "//   bool can(vector<int> seq, int k) {",
  "//       if (seq.empty()) return false;",
  "//       if (k <= 0) return false;",
  "//       // ... cases A, B, C ...",
  "//   }",
];

const PSQ_S3_PY = [
  "def can(seq, k):",
  "    if len(seq) == 0 or k <= 0:",
  "        return False",
  "    # OPTION A: every element identical → 1 PRINT inside any tower of REPs.",
  "    if all(x == seq[0] for x in seq) and k >= 1:",
  "        return True",
  "    return False  # (cases B, C come next)",
];
const PSQ_S3_CPP = [
  "// 옵션 A — 모든 원소 같음:",
  "// bool same = true;",
  "// for (int i = 1; i < (int)seq.size(); i++)",
  "//     if (seq[i] != seq[0]) { same = false; break; }",
  "// if (same && k >= 1) return true;",
];

const PSQ_S4_PY = [
  "def can(seq, k):",
  "    if len(seq) == 0 or k <= 0: return False",
  "    if all(x == seq[0] for x in seq) and k >= 1: return True",
  "    n = len(seq)",
  "",
  "    # OPTION B: seq is the SAME block repeated m times (m ≥ 2). Solve the block.",
  "    for m in range(2, n + 1):",
  "        if n % m == 0:",
  "            bl = n // m",
  "            block = seq[:bl]",
  "            if all(seq[i] == block[i % bl] for i in range(n)):",
  "                if can(block, k):",
  "                    return True",
  "",
  "    # OPTION C: split seq into two parts, give each a budget slice.",
  "    for split in range(1, n):",
  "        for k1 in range(1, k):",
  "            if can(seq[:split], k1) and can(seq[split:], k - k1):",
  "                return True",
  "",
  "    return False",
];
const PSQ_S4_CPP = [
  "// 옵션 B (반복 블록):",
  "//   for m = 2..n: if (n % m == 0) check seq is m copies of seq[0..n/m-1];",
  "//     if so, recurse on the block with same k.",
  "// 옵션 C (이어붙이기 분할):",
  "//   for split = 1..n-1, for k1 = 1..k-1:",
  "//     if (can(left, k1) && can(right, k - k1)) return true;",
];

const PSQ_FAST_PY = [
  "import sys",
  "from functools import lru_cache",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "T = int(data[p]); p += 1",
  "for _ in range(T):",
  "    N = int(data[p]); p += 1",
  "    K = int(data[p]); p += 1",
  "    a = tuple(int(x) for x in data[p:p+N])",
  "    p += N",
  "",
  "    # lru_cache memoizes (seq, k) so identical subproblems aren't re-solved.",
  "    @lru_cache(maxsize=None)",
  "    def can(seq, k):",
  "        if len(seq) == 0 or k <= 0:",
  "            return False",
  "        if all(x == seq[0] for x in seq) and k >= 1:",
  "            return True",
  "        n = len(seq)",
  "        # B: repeating block",
  "        for m in range(2, n + 1):",
  "            if n % m == 0:",
  "                bl = n // m",
  "                block = seq[:bl]",
  "                if all(seq[i] == block[i % bl] for i in range(n)):",
  "                    if can(block, k):",
  "                        return True",
  "        # C: split",
  "        for split in range(1, n):",
  "            for k1 in range(1, k):",
  "                if can(seq[:split], k1) and can(seq[split:], k - k1):",
  "                    return True",
  "        return False",
  "",
  "    print('YES' if can(a, K) else 'NO')",
  "    can.cache_clear()   # clear before next test case",
];
const PSQ_FAST_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int N, K;",
  "        cin >> N >> K;",
  "        vector<int> a(N);",
  "        for (int i = 0; i < N; i++) cin >> a[i];",
  "",
  "        // memo[(seq, k)] = true/false; using map<pair<vector<int>, int>, bool>",
  "        map<pair<vector<int>, int>, bool> memo;",
  "",
  "        // Recursive helper",
  "        function<bool(vector<int>, int)> can = [&](vector<int> seq, int k) -> bool {",
  "            auto key = make_pair(seq, k);",
  "            auto it = memo.find(key);",
  "            if (it != memo.end()) return it->second;",
  "            int n = seq.size();",
  "            if (n == 0 || k <= 0) return memo[key] = false;",
  "",
  "            bool same = true;",
  "            for (int i = 1; i < n; i++) if (seq[i] != seq[0]) { same = false; break; }",
  "            if (same && k >= 1) return memo[key] = true;",
  "",
  "            // B: repeating block",
  "            for (int m = 2; m <= n; m++) {",
  "                if (n % m != 0) continue;",
  "                int bl = n / m;",
  "                bool ok = true;",
  "                for (int i = 0; i < n && ok; i++)",
  "                    if (seq[i] != seq[i % bl]) ok = false;",
  "                if (ok) {",
  "                    vector<int> block(seq.begin(), seq.begin() + bl);",
  "                    if (can(block, k)) return memo[key] = true;",
  "                }",
  "            }",
  "",
  "            // C: split",
  "            for (int split = 1; split < n; split++) {",
  "                for (int k1 = 1; k1 < k; k1++) {",
  "                    vector<int> left (seq.begin(), seq.begin() + split);",
  "                    vector<int> right(seq.begin() + split, seq.end());",
  "                    if (can(left, k1) && can(right, k - k1))",
  "                        return memo[key] = true;",
  "                }",
  "            }",
  "            return memo[key] = false;",
  "        };",
  "",
  "        cout << (can(a, K) ? \"YES\" : \"NO\") << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getPrintseqSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read T, then each case (N, K, sequence)", "1️⃣ T 읽고, 각 케이스 (N, K, 수열)"),
      color: A,
      py: PSQ_S1_PY, cpp: PSQ_S1_CPP,
      why: [
        t(E, "T test cases. For each: read N (length), K (PRINT budget), then N values.",
            "T 케이스. 각각: N (길이), K (PRINT 예산), 그 다음 N 개 값."),
        t(E, "Use a tuple (Python) so it's hashable for memoization later.",
            "tuple (Python) 로 받기 — 나중 메모이제이션 위해 hashable 필요."),
      ],
      aside: <SampleInputAside E={E} sample={PSQ_SAMPLE} highlight={[0, 1, 2]} note={t(E,
        "First lines: \"2\" (T=2), then case 1 = \"1 1\" + \"1\" (N=1, K=1, [1]).",
        "처음: \"2\" (T=2), 그 다음 케이스 1 = \"1 1\" + \"1\" (N=1, K=1, [1]).")} />,
    },
    {
      label: t(E, "2️⃣ Recursive can(seq, k) — base cases", "2️⃣ 재귀 can(seq, k) — 베이스"),
      color: "#0891b2",
      py: PSQ_S2_PY, cpp: PSQ_FAST_CPP,
      why: [
        t(E, "Empty sequence cannot be produced (we need at least the original PRINT).",
            "빈 수열은 만들 수 없음 (최소 PRINT 1 개 필요)."),
        t(E, "Budget exhausted (k ≤ 0) means no more PRINTs available — impossible.",
            "예산 소진 (k ≤ 0) → PRINT 더 못 씀 → 불가능."),
      ],
    },
    {
      label: t(E, "3️⃣ Option A — all same value, 1 PRINT does it", "3️⃣ 옵션 A — 모두 같은 값, PRINT 1 개"),
      color: "#dc2626",
      py: PSQ_S3_PY, cpp: PSQ_FAST_CPP,
      why: [
        t(E, "If every element is the same value v, one PRINT v wrapped in REPs (towers if needed) outputs v any number of times.",
            "모두 같은 값 v 면, PRINT v 를 REP 로 (필요시 다중으로) 감싸서 원하는 개수만큼."),
        t(E, "So this case needs only 1 PRINT — return True if budget k ≥ 1.",
            "그래서 이 경우 PRINT 1 개면 충분 — k ≥ 1 이면 True."),
      ],
    },
    {
      label: t(E, "4️⃣ Options B + C — repeating block & split", "4️⃣ 옵션 B + C — 반복 블록 & 분할"),
      color: "#7c3aed",
      py: PSQ_S4_PY, cpp: PSQ_FAST_CPP,
      why: [
        t(E, "Option B: if seq is a smaller block REPEATED m times (m ≥ 2), wrap that block in REP m. Cost = whatever the block costs (REPs are free).",
            "옵션 B: seq 가 더 작은 블록을 m 번 (m ≥ 2) 반복이면 REP m 로 감쌈. 비용 = 블록 비용 (REP 는 공짜)."),
        t(E, "Option C: split seq at position `split`. Left half uses k1 PRINTs, right half uses k − k1. Try all valid splits.",
            "옵션 C: position `split` 에서 자르기. 왼쪽 k1 개, 오른쪽 k − k1 개. 모든 유효 분할 시도."),
        t(E, "Together with option A, these cover every way to compose programs in this language.",
            "옵션 A 와 함께 이 언어로 만들 수 있는 모든 프로그램 형태를 커버."),
      ],
    },
    {
      label: t(E, "5️⃣ Memoize + full code", "5️⃣ 메모이제이션 + 전체 코드"),
      color: "#15803d",
      py: PSQ_FAST_PY, cpp: PSQ_FAST_CPP,
      why: [
        t(E, "Without memoization, options B and C call can() on the same (seq, k) many times → exponential blowup.",
            "메모이제이션 없으면 옵션 B, C 가 같은 (seq, k) 를 여러 번 → 지수 폭발."),
        t(E, "Python: @lru_cache on a tuple key. C++: map<pair<vector<int>, int>, bool>.",
            "Python: tuple 키 + @lru_cache. C++: map<pair<vector<int>, int>, bool>."),
        t(E, "With N ≤ 100 and K ≤ 3, the state space is small enough that memoized recursion finishes well under the time limit.",
            "N ≤ 100, K ≤ 3 라 상태 공간이 작아 메모이제이션 재귀가 시간 안에."),
        t(E, "Clear the cache between test cases (each case has its own seq, but the cache key includes seq so it's safe; clearing just frees memory).",
            "케이스 사이 캐시 클리어 (케이스마다 seq 가 다른데 캐시 키에 seq 가 있어 충돌은 없음 — 메모리 정리용)."),
      ],
    },
  ];
}

export function PrintseqProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* ─── PDF helpers ─── */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sum","tuple"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","map","pair","function"];
function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  let out = ""; let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) { out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`; work = work.slice(ppm[0].length); }
  }
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok)) out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok)) out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok)) out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadPrintseqPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Printing Sequences — Full Study Guide", "🖨️ Printing Sequences — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A}; color: white; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO February 2025 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
<h2>${t(E, "Code (5 sections)", "코드 (5 섹션)")}</h2>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
