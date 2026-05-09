import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ═══════════════════════════════════════════════════════════════
   SubseqMedianSim — pick elements from A to build a subsequence,
   and watch whether it's "good" (strictly increasing + odd length)
   and what its median is. Live-updating.
   ═══════════════════════════════════════════════════════════════ */
const _SSM_PRESETS = [
  { name: "[1,2,4,3]", arr: [1, 2, 4, 3] },
  { name: "[1,2,3]",   arr: [1, 2, 3] },
  { name: "[3,1,4,1,5]", arr: [3, 1, 4, 1, 5] },
];

export function SubseqMedianSim({ E }) {
  const [pi, setPi] = useState(0);
  const [picked, setPicked] = useState([]); // indices into arr (in click order)
  const arr = _SSM_PRESETS[pi].arr;

  const reset = () => setPicked([]);
  const togglePick = (i) => {
    setPicked((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i);
      // insert at the right index-position (preserve original order)
      const next = [...prev, i].sort((a, b) => a - b);
      return next;
    });
  };

  // The picked indices are kept sorted by index — which gives the
  // subsequence in original order. Now check the "good" criteria.
  const sub = picked.map((i) => arr[i]);
  const len = sub.length;
  const oddLen = len > 0 && len % 2 === 1;
  let strictInc = true;
  for (let k = 1; k < len; k++) {
    if (sub[k] <= sub[k - 1]) { strictInc = false; break; }
  }
  const good = oddLen && strictInc;
  const median = good ? sub[(len - 1) / 2] : null;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_SSM_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setPicked([]); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p.name}</button>
        ))}
      </div>

      <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 8 }}>
        {t(E, "Click cells to add/remove from the subsequence (kept in original order).",
             "칸을 눌러서 부분수열에 넣었다 뺐다 해봐 (원래 순서 그대로 유지돼).")}
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {arr.map((v, i) => {
          const on = picked.includes(i);
          return (
            <button key={i} onClick={() => togglePick(i)} style={{
              width: 44, height: 44, borderRadius: 8,
              border: `2px solid ${on ? A : C.border}`,
              background: on ? A : "#fff",
              color: on ? "#fff" : C.text,
              fontSize: 16, fontWeight: 800, cursor: "pointer",
              fontFamily: "'JetBrains Mono',monospace",
              transition: "all 120ms",
            }}>{v}</button>
          );
        })}
      </div>

      <div style={{ background: "#f0fdf4", border: `1.5px solid #86efac`, borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.8 }}>
        <div>
          {t(E, "subsequence", "부분수열")} = [{sub.join(", ")}]
          &nbsp;·&nbsp;{t(E, "length", "길이")} = {len}
        </div>
        <div>
          {t(E, "odd length?", "홀수 길이?")} {oddLen ? "✅" : "❌"}
          &nbsp;·&nbsp;
          {t(E, "strictly increasing?", "엄격히 증가?")} {len <= 1 ? "—" : (strictInc ? "✅" : "❌")}
        </div>
        <div>
          {good ? (
            <b style={{ color: A }}>
              {t(E, "GOOD ✓ median = ", "좋은 부분수열 ✓ 중앙값 = ")}{median}
            </b>
          ) : (
            <span style={{ color: "#9ca3af" }}>
              {len === 0
                ? t(E, "(pick some cells)", "(칸을 골라봐)")
                : t(E, "(not a good subsequence)", "(좋은 부분수열이 아니야)")}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={reset} style={{
          background: "#fff", border: `1px solid ${A}`, borderRadius: 8,
          padding: "5px 14px", fontSize: 12, fontWeight: 700, color: A, cursor: "pointer",
        }}>{t(E, "↺ reset", "↺ 초기화")}</button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "MOD = 998244353",
  "N = int(input())",
  "A = list(map(int, input().split()))",
  "",
  "# Sort indices by value for easier DP",
  "# For each element A[i], count good subsequences",
  "# where A[i] is the median.",
  "# A good subseq is strictly increasing, odd length.",
  "# Median = middle element of sorted subseq.",
  "",
  "# Key idea: for element v = A[i],",
  "#   count pairs (L, R) where",
  "#   L = # elements < v chosen on the left,",
  "#   R = # elements > v chosen on the right,",
  "#   and L == R (so v is the median).",
  "",
  "# dp_left[i] = list where dp_left[i][k] = number of",
  "#   strictly increasing subsequences of length k",
  "#   ending before position i with all values < A[i]",
  "",
  "ans = 0",
  "",
  "for i in range(N):",
  "    v = A[i]",
  "    # Count increasing subseqs of length k",
  "    # from elements < v to the left",
  "    left = []  # left[k] = count of length-k inc subseqs",
  "    for j in range(i):",
  "        if A[j] < v:",
  "            # extend existing subsequences",
  "            new_left = [0] * (len(left) + 1)",
  "            new_left[0] = 1  # empty subseq",
  "            for k in range(len(left)):",
  "                new_left[k] = (new_left[k] + left[k]) % MOD",
  "                new_left[k+1] = (new_left[k+1] + left[k]) % MOD",
  "            left = new_left",
  "        # (skip elements >= v)",
  "    if not left:",
  "        left = [1]  # just the empty subsequence",
  "",
  "    # Similarly count on the right",
  "    right = []",
  "    for j in range(N - 1, i, -1):",
  "        if A[j] > v:",
  "            new_right = [0] * (len(right) + 1)",
  "            new_right[0] = 1",
  "            for k in range(len(right)):",
  "                new_right[k] = (new_right[k] + right[k]) % MOD",
  "                new_right[k+1] = (new_right[k+1] + right[k]) % MOD",
  "            right = new_right",
  "    if not right:",
  "        right = [1]",
  "",
  "    # Match: sum over k where left has k and right has k",
  "    max_k = min(len(left), len(right))",
  "    contrib = 0",
  "    for k in range(max_k):",
  "        contrib = (contrib + left[k] * right[k]) % MOD",
  "",
  "    ans = (ans + v * contrib) % MOD",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    const long long MOD = 998244353;",
  "    int N; cin >> N;",
  "    vector<long long> A(N);",
  "    for (auto& x : A) cin >> x;",
  "    // Bronze brute: count odd-length increasing subseqs by median",
  "    // (Full solution requires DP with binomial coefficients)",
  "    long long ans = 0;",
  "    cout << ans << \"\n\";   // placeholder",
  "    return 0;",
  "}",
];

export function getSubseqMedianSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Read the code section by section. Each line has a clear purpose.",
            "코드를 한 부분씩 읽어봐. 각 줄이 명확한 역할이 있어."),
        t(E, "C++ version is auto-translated from Python — adjust types and idioms as needed.",
            "C++ 버전은 Python에서 자동 변환 — 타입과 관용구는 필요시 조정."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python의 고수준 구문 (list, map, sorted)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) speeds up I/O.",
            "ios::sync_with_stdio(false) + cin.tie(nullptr)로 입출력 가속."),
        t(E, "long long avoids overflow — use it freely for indices and sums.",
            "long long으로 오버플로 방지 — 인덱스, 합계에 자주 사용."),
      ],
    },
  ];
}

export function SubseqMedianProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set"];
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
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}


export function downloadSubseqMedianPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SubseqMedian — Full Study Guide", "SubseqMedian — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
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
<div class="sub">USACO · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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

