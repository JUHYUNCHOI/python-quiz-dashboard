import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ============================================================
   PalSim — drag K (base) and N (rank). Watch palindromes
   enumerate length-by-length: count per length L equals
   (K−1)·K^(⌈L/2⌉−1). When the running total covers N, that
   length holds the answer; decode the front half digits in
   base K, mirror, and print the full palindrome.
   ============================================================ */
function _baseKDigits(val, k) {
  if (val === 0) return [0];
  const out = [];
  let v = val;
  while (v > 0) { out.push(v % k); v = Math.floor(v / k); }
  return out.reverse();
}

function _nthPalindromeBaseK(k, n) {
  // 1..k-1 single digits
  if (n <= k - 1) return _baseKDigits(n, k);
  let m = n - (k - 1);
  let length = 2;
  while (true) {
    const half = Math.floor((length + 1) / 2);
    const count = (k - 1) * Math.pow(k, half - 1);
    if (m <= count) {
      m -= 1;
      const digits = [];
      for (let i = 0; i < half; i++) {
        let d;
        if (i === 0) d = Math.floor(m / Math.pow(k, half - 1)) + 1;
        else d = Math.floor(m / Math.pow(k, half - 1 - i)) % k;
        digits.push(d);
      }
      const tail = digits.slice(0, Math.floor(length / 2)).reverse();
      return digits.concat(tail);
    }
    m -= count;
    length += 1;
  }
}

function _enumerateLengths(k, n) {
  // Build per-length info up to and including the length holding n
  const rows = [];
  // Length 1
  const len1 = k - 1;
  rows.push({ length: 1, half: 1, count: len1, cumulative: len1 });
  if (n <= len1) return rows;
  let cum = len1;
  let length = 2;
  while (true) {
    const half = Math.floor((length + 1) / 2);
    const count = (k - 1) * Math.pow(k, half - 1);
    cum += count;
    rows.push({ length, half, count, cumulative: cum });
    if (n <= cum) return rows;
    length += 1;
    if (length > 12) return rows; // safety
  }
}

export function Mcc19PalSim({ E }) {
  const [K, setK] = useState(3);
  const [N, setN] = useState(8);

  const rows = _enumerateLengths(K, N);
  const hitRow = rows[rows.length - 1];
  const prevCum = rows.length >= 2 ? rows[rows.length - 2].cumulative : 0;
  const localRank = N - prevCum; // 1-indexed within hit length
  const digits = _nthPalindromeBaseK(K, N);
  const baseKStr = digits.join("");
  let base10 = 0;
  for (const d of digits) base10 = base10 * K + d;
  const halfDigits = digits.slice(0, Math.ceil(digits.length / 2));

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 10, textAlign: "center" }}>
          {t(E, "🔄 Palindrome Counter — drag K (base) and N (rank)",
                "🔄 회문 카운터 — K (진법) 와 N (순위) 를 움직여 봐")}
        </div>

        {/* K and N sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 4px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: C.dim }}>{t(E, "base K", "진법 K")}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>K = {K}</span>
            </div>
            <input type="range" min={2} max={10} step={1} value={K}
              onChange={e => setK(Number(e.target.value))}
              style={{ width: "100%", accentColor: A }} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: C.dim }}>{t(E, "rank N", "순위 N")}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>N = {N}</span>
            </div>
            <input type="range" min={1} max={50} step={1} value={N}
              onChange={e => setN(Number(e.target.value))}
              style={{ width: "100%", accentColor: A }} />
          </div>
        </div>
      </div>

      {/* Per-length table — count = (K-1)*K^(half-1), cumulative builds up */}
      <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6, textAlign: "center", letterSpacing: 0.5 }}>
          {t(E, "PALINDROMES BY LENGTH", "길이별 회문 개수")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {rows.map((r, i) => {
            const isHit = i === rows.length - 1;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 10px", borderRadius: 8,
                background: isHit ? "#ede9fe" : "#fafafa",
                border: isHit ? `2px solid ${A}` : `1px solid ${C.border}`,
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
              }}>
                <span style={{ width: 70, color: C.text, fontWeight: 700 }}>
                  L = {r.length}
                </span>
                <span style={{ flex: 1, color: C.dim }}>
                  (K−1)·K^({r.half}−1) = <b style={{ color: isHit ? A : C.text }}>{r.count}</b>
                </span>
                <span style={{ color: isHit ? A : C.dim, fontWeight: isHit ? 800 : 500 }}>
                  Σ = {r.cumulative}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live answer card */}
      <div style={{
        background: "#ede9fe", border: `2px solid ${A}`,
        borderRadius: 12, padding: "10px 14px",
      }}>
        <div style={{ fontSize: 12, color: "#5b21b6", marginBottom: 6 }}>
          <b>N = {N}</b>{" · "}
          {t(E, "lives in length L = ", "들어있는 길이 L = ")}
          <b style={{ color: A }}>{hitRow.length}</b>
          {" · "}
          {t(E, "local rank = ", "그 안의 순위 = ")}
          <b style={{ color: A }}>{localRank}</b>
        </div>
        <div style={{ fontSize: 12, color: "#5b21b6", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "front half digits (base K): ", "앞 절반 자릿수 (K 진법): ")}
          <b style={{ color: A }}>[{halfDigits.join(", ")}]</b>
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#5b21b6", fontFamily: "'JetBrains Mono',monospace", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span>{t(E, "answer (base K):", "정답 (K 진법):")} <span style={{ fontSize: 18, color: A }}>{baseKStr}</span></span>
          <span style={{ color: C.dim, fontWeight: 600 }}>{t(E, "= ", "= ")}{base10}<span style={{ fontSize: 11 }}>{t(E, " (base 10)", " (10진법)")}</span></span>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          "Subtract counts length-by-length until N fits → decode the front half in base K → mirror to get the full palindrome.",
          "길이별 개수를 빼가며 N 이 들어가는 길이를 찾고 → 앞 절반을 K 진법으로 디코드 → 거울 대칭으로 회문 완성.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "K, N = map(int, input().split())",
  "",
  "def get_nth_palindrome(k, n):",
  "    # Generate palindromes in base k in order",
  "    # Single digit palindromes: 1..k-1 (n=1..k-1)",
  "    if n <= k - 1:",
  "        return n",
  "    ",
  "    # For longer palindromes, enumerate by length",
  "    n -= (k - 1)  # skip single digits",
  "    length = 2",
  "    while True:",
  "        half = (length + 1) // 2",
  "        # First digit: 1..k-1, rest: 0..k-1",
  "        count = (k - 1) * (k ** (half - 1))",
  "        if n <= count:",
  "            # Build the n-th palindrome of this length",
  "            n -= 1  # 0-indexed",
  "            digits = []",
  "            for i in range(half):",
  "                if i == 0:",
  "                    d = n // (k ** (half - 1)) + 1",
  "                else:",
  "                    d = (n // (k ** (half - 1 - i))) % k",
  "                digits.append(d)",
  "            # Mirror to form full palindrome",
  "            full = digits + digits[:(length // 2)][::-1]",
  "            # Convert to base 10",
  "            val = 0",
  "            for d in full:",
  "                val = val * k + d",
  "            return val",
  "        n -= count",
  "        length += 1",
  "",
  "print(get_nth_palindrome(K, N))",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    long long K, N; cin >> K >> N;",
  "",
  "    auto get_nth_palindrome = [&](k, n) {   // TODO: type args",
  "        // Generate palindromes in base k in order",
  "        // Single digit palindromes: 1..k-1 (n=1..k-1)",
  "        if (n <= k - 1) {",
  "            return n;",
  "",
  "        // For longer palindromes, enumerate by length",
  "        n -= (k - 1)  # skip single digits;",
  "        auto length = 2;",
  "        while (True) {",
  "            auto half = (length + 1) // 2;",
  "            // First digit: 1..k-1, rest: 0..k-1",
  "            auto count = (k - 1) * (k ** (half - 1));",
  "            if (n <= count) {",
  "                // Build the n-th palindrome of this length",
  "                n -= 1  # 0-indexed;",
  "                auto digits = [];",
  "                for (long long i = 0; i < half; i++) {",
  "                    if (i == 0) {",
  "                        auto d = n // (k ** (half - 1)) + 1;",
  "                    else {",
  "                        auto d = (n // (k ** (half - 1 - i))) % k;",
  "                    // digits.append(d)",
  "                // Mirror to form full palindrome",
  "                auto full = digits + digits[:(length // 2)][::-1];",
  "                // Convert to base 10",
  "                auto val = 0;",
  "                // for d in full:",
  "                    auto val = val * k + d;",
  "                return val;",
  "            n -= count;",
  "            length += 1;",
  "",
  "    cout << get_nth_palindrome(K, N) << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc19PalSections(E) {
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

export function Mcc19PalProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
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


export function downloadMcc19PalPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc19Pal — Full Study Guide", "Mcc19Pal — 종합 풀이 노트");
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

