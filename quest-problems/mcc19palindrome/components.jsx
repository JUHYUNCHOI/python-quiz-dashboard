import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";
const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* ============================================================
   PalSim — drag K (digit count) and N (rank). Watch palindrome
   STRINGS line up by length first, then alphabetically. Leading
   zeros are allowed, so "0","00","010" are all valid. Each
   length L holds k^⌈L/2⌉ strings: choose the front ⌈L/2⌉ digits
   freely, then mirror. This is STRING order, not numeric value.
   ============================================================ */
function _ceilHalf(l) { return Math.floor((l + 1) / 2); }   // ceil(l/2)

// The N-th (1-indexed) palindrome STRING in Book k. Mirrors the
// verified Python solution exactly (count = k^ceil(l/2)).
function _nthPalStr(n, k) {
  let s = 0, c = 0;
  while (s < n) { c += 1; s += Math.pow(k, _ceilHalf(c)); }
  let r = n;
  for (let i = 1; i < c; i++) r -= Math.pow(k, _ceilHalf(i));
  r -= 1;                                   // 0-indexed within length c
  let half = "";
  let rr = r;
  if (rr === 0) half = "0";
  while (rr > 0) { half += String(rr % k); rr = Math.floor(rr / k); }
  while (half.length * 2 < c) half += "0";  // left-pad the front half
  half = half.split("").reverse().join("");  // most-significant first
  const rev = (str) => str.split("").reverse().join("");
  if (c % 2 === 0) return half + rev(half);
  return half + rev(half.slice(0, -1));
}

function _enumerateLengths(k, n) {
  // per-length rows up to and including the length that holds n
  const rows = [];
  let cum = 0, length = 0;
  while (true) {
    length += 1;
    const half = _ceilHalf(length);
    const count = Math.pow(k, half);
    cum += count;
    rows.push({ length, half, count, cumulative: cum });
    if (n <= cum) return rows;
    if (length > 14) return rows; // safety
  }
}

export function Mcc19PalSim({ E }) {
  const [K, setK] = useState(2);
  const [N, setN] = useState(6);

  const rows = _enumerateLengths(K, N);
  const hitRow = rows[rows.length - 1];
  const prevCum = rows.length >= 2 ? rows[rows.length - 2].cumulative : 0;
  const localRank = N - prevCum;                 // 1-indexed within hit length
  const answer = _nthPalStr(N, K);
  const half = _ceilHalf(answer.length);
  const frontHalf = answer.slice(0, half);       // the chosen front-half digits

  // ordered list of the first few palindrome strings (for the chip row)
  const listMax = Math.min(Math.max(N + 3, 8), 44);
  const list = [];
  for (let i = 1; i <= listMax; i++) list.push(_nthPalStr(i, K));

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 12, ...KA }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 4, textAlign: "center" }}>
          {t(E, "🔄 Palindrome Book — drag K (digits) and N (rank)",
                "🔄 회문 책 — K (숫자 개수) 와 N (순위) 을 움직여 봐요")}
        </div>
        <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 10, lineHeight: 1.5 }}>
          {t(E, "Digits 0…K−1 · leading zeros allowed · ordered by length, then alphabetically (string order, not numeric).",
                "숫자 0…K−1 · 앞자리 0 허용 · 길이 순, 같으면 사전 순 (문자열 순서, 숫자 값 아님).")}
        </div>

        {/* K and N sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 4px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: C.dim }}>{t(E, "digits K", "숫자 개수 K")}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>K = {K}</span>
            </div>
            <input type="range" min={2} max={5} step={1} value={K}
              onChange={e => setK(Number(e.target.value))}
              style={{ width: "100%", accentColor: A }} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: C.dim }}>{t(E, "rank N", "순위 N")}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>N = {N}</span>
            </div>
            <input type="range" min={1} max={40} step={1} value={N}
              onChange={e => setN(Number(e.target.value))}
              style={{ width: "100%", accentColor: A }} />
          </div>
        </div>
      </div>

      {/* Ordered list of palindrome STRINGS — N-th highlighted */}
      <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 10, marginBottom: 10, ...KA }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6, textAlign: "center", letterSpacing: 0.5 }}>
          {t(E, "BOOK ORDER (length → alphabetical)", "책 순서 (길이 → 사전 순)")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {list.map((s, i) => {
            const rank = i + 1;
            const isHit = rank === N;
            return (
              <span key={i} style={{ ...NW, display: "inline-flex", alignItems: "center", gap: 4,
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
                border: isHit ? `2px solid ${A}` : "1px solid #e5e7eb",
                background: isHit ? "#ede9fe" : "#fafafa", borderRadius: 6, padding: "2px 7px" }}>
                <span style={{ color: C.dim, fontSize: 10 }}>{rank}.</span>
                <b style={{ color: isHit ? A : "#5b21b6" }}>{s}</b>
              </span>
            );
          })}
        </div>
      </div>

      {/* Per-length count table — count = K^⌈L/2⌉, cumulative builds up */}
      <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 10, marginBottom: 10, ...KA }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6, textAlign: "center", letterSpacing: 0.5 }}>
          {t(E, "HOW MANY PER LENGTH", "길이별 개수")}
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
                <span style={{ width: 62, color: C.text, fontWeight: 700 }}>
                  L = {r.length}
                </span>
                <span style={{ flex: 1, color: C.dim }}>
                  K^⌈{r.length}/2⌉ = K^{r.half} = <b style={{ color: isHit ? A : C.text }}>{r.count}</b>
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
        borderRadius: 12, padding: "10px 14px", ...KA,
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
          {t(E, "front half (choose freely): ", "앞 절반 (자유롭게 고름): ")}
          <b style={{ color: A }}>{frontHalf}</b>
          {t(E, "  →  mirror  →  ", "  →  거울 대칭  →  ")}
          <b style={{ color: A }}>{answer}</b>
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#5b21b6", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "answer: ", "정답: ")}<span style={{ fontSize: 18, color: A }}>&quot;{answer}&quot;</span>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.5, ...KA }}>
        {t(E,
          "Subtract counts length-by-length until N fits → write the local rank in base K as the front half → mirror it to get the palindrome string.",
          "길이별 개수를 빼가며 N 이 들어가는 길이를 찾고 → 그 안 순위를 K 진법으로 적어 앞 절반을 만들고 → 거울 대칭으로 회문 문자열을 완성해요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import math",
  "",
  "def nth_palindrome(n, k):",
  "    # count of length-l palindromes = k ** ceil(l/2)",
  "    # walk lengths, adding counts, until we reach n",
  "    s, c = 0, 0",
  "    while s < n:",
  "        c += 1",
  "        s += k ** math.ceil(c / 2)",
  "",
  "    # find the 0-indexed rank r inside length c",
  "    r = n",
  "    for i in range(1, c):",
  "        r -= k ** math.ceil(i / 2)",
  "    r -= 1",
  "",
  "    # write r in base k -> the front half (least digit first)",
  "    half = ''",
  "    rr = r",
  "    if rr == 0:",
  "        half = '0'",
  "    while rr > 0:",
  "        half += str(rr % k); rr //= k",
  "",
  "    # left-pad to ceil(c/2) digits, then most-significant first",
  "    while len(half) * 2 < c:",
  "        half += '0'",
  "    half = half[::-1]",
  "",
  "    # mirror the front half to build the palindrome string",
  "    if c % 2 == 0:",
  "        return half + half[::-1]",
  "    else:",
  "        return half + half[-2::-1]",
  "",
  "N, K = map(int, input().split())",
  "print(nth_palindrome(N, K))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "long long ipow(long long base, int exp) {",
  "    long long r = 1;",
  "    for (int i = 0; i < exp; i++) r *= base;",
  "    return r;",
  "}",
  "",
  "int main() {",
  "    long long N, K;",
  "    cin >> N >> K;",
  "",
  "    // count of length-l palindromes = K^ceil(l/2)",
  "    // walk lengths, adding counts, until we reach N",
  "    long long s = 0;",
  "    int c = 0;",
  "    while (s < N) {",
  "        c++;",
  "        s += ipow(K, (c + 1) / 2);   // (c+1)/2 = ceil(c/2)",
  "    }",
  "",
  "    // find the 0-indexed rank r inside length c",
  "    long long r = N;",
  "    for (int i = 1; i < c; i++) r -= ipow(K, (i + 1) / 2);",
  "    r -= 1;",
  "",
  "    // write r in base K -> the front half (least digit first)",
  "    string half = \"\";",
  "    long long rr = r;",
  "    if (rr == 0) half = \"0\";",
  "    while (rr > 0) { half += char('0' + rr % K); rr /= K; }",
  "",
  "    // left-pad to ceil(c/2) digits, then most-significant first",
  "    while ((int)half.size() * 2 < c) half += '0';",
  "    reverse(half.begin(), half.end());",
  "",
  "    // mirror the front half to build the palindrome string",
  "    string ans;",
  "    if (c % 2 == 0) {",
  "        string rev = half; reverse(rev.begin(), rev.end());",
  "        ans = half + rev;",
  "    } else {",
  "        string rev = half.substr(0, half.size() - 1);",
  "        reverse(rev.begin(), rev.end());",
  "        ans = half + rev;",
  "    }",
  "    cout << ans << \"\\n\";",
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
        t(E, "Length L holds exactly K^⌈L/2⌉ palindromes — the front ⌈L/2⌉ digits are chosen freely, and the rest is their mirror. Add these counts length by length until you pass N; that tells you the answer's length c.",
            "길이 L 은 정확히 K^⌈L/2⌉ 개예요 — 앞 ⌈L/2⌉ 자리는 자유롭게 고르고, 나머지는 그 거울이에요. 이 개수를 길이별로 더해 N 을 넘기면, 그게 답의 길이 c 예요."),
        t(E, "Within length c, the 0-indexed rank r written in base K IS the front half. Left-pad it to ⌈c/2⌉ digits, then mirror to get the answer string — no need to list every palindrome.",
            "길이 c 안에서, 0-인덱스 순위 r 을 K 진법으로 적으면 그게 바로 앞 절반이에요. ⌈c/2⌉ 자리로 앞을 0 채운 뒤 거울 대칭하면 정답 문자열 — 모든 회문을 나열할 필요가 없어요."),
      ],
      pyOnly: [
        t(E, "half[::-1] reverses the front half; half[-2::-1] mirrors it while skipping the shared middle digit (for odd lengths).",
            "half[::-1] 는 앞 절반을 뒤집고, half[-2::-1] 는 홀수 길이일 때 가운데 공유 자리를 빼고 거울 대칭해요."),
        t(E, "Leading zeros are kept because we build a STRING, not a number — '000' stays '000'.",
            "숫자가 아니라 문자열을 만들기 때문에 앞자리 0 이 유지돼요 — '000' 은 그대로 '000'."),
      ],
      cppOnly: [
        t(E, "char('0' + digit) turns a digit 0…9 into its character; K ≤ 10 keeps every digit a single character.",
            "char('0' + 숫자) 로 0…9 숫자를 문자로 바꿔요; K ≤ 10 이라 모든 자리가 한 글자예요."),
        t(E, "reverse(half.begin(), half.end()) mirrors the front half in place — the same trick as Python's slicing.",
            "reverse(half.begin(), half.end()) 로 앞 절반을 그 자리에서 뒤집어요 — 파이썬 슬라이싱과 같은 방법."),
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

