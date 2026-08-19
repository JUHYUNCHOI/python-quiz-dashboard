import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ================================================================
   SOLUTION CODE  (anchor the largest magnitude → only 4 K to test)
   VERIFIED: both official samples (N=5→4, N=6→7) pass, and
   0/20000 mismatches vs an exhaustive brute over all K in [−3N,3N].
   ================================================================ */
const FULL_PY = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "if N == 1:",
  "    print(1)",
  "else:",
  "    total = N * (N + 1) // 2   # sum of 1..N",
  "    mn, mx = min(a), max(a)",
  "    lim = 3 * N",
  "",
  "    # the biggest original magnitude is N (or N-1 if N was discarded),",
  "    # and after +K it sits at the MAX or MIN of the list.",
  "    # so K can only be one of these 4 values:",
  "    candidates = {mn + N, mx - N, mn + (N - 1), mx - (N - 1)}",
  "",
  "    ans = 0",
  "    for K in candidates:",
  "        if not (-lim <= K <= lim):   # K must stay in [-3N, 3N]",
  "            continue",
  "        mags = [abs(x - K) for x in a]   # undo the +K",
  "        # valid: N-1 distinct magnitudes, all in [1, N]",
  "        if all(1 <= m <= N for m in mags) and len(set(mags)) == N - 1:",
  "            ans += total - sum(mags)     # the one value of 1..N left out",
  "    print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <set>",
  "#include <cstdlib>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    if (N == 1) { cout << 1 << \"\\n\"; return 0; }",
  "",
  "    vector<long long> a(N - 1);",
  "    for (int i = 0; i < N - 1; i++) cin >> a[i];",
  "",
  "    long long total = (long long)N * (N + 1) / 2;   // sum of 1..N",
  "    long long mn = a[0], mx = a[0];",
  "    for (long long x : a) { mn = min(mn, x); mx = max(mx, x); }",
  "    long long lim = 3LL * N;",
  "",
  "    // biggest original magnitude is N (or N-1); after +K it sits at",
  "    // the MAX or MIN of the list -> only 4 candidate K values.",
  "    long long cands[4] = { mn + N, mx - N, mn + (N - 1), mx - (N - 1) };",
  "",
  "    long long ans = 0;",
  "    set<long long> seenK;",
  "    for (long long K : cands) {",
  "        if (!seenK.insert(K).second) continue;   // skip duplicate K",
  "        if (K < -lim || K > lim) continue;        // K in [-3N, 3N]",
  "        set<long long> mags;",
  "        long long magSum = 0;",
  "        bool ok = true;",
  "        for (long long x : a) {",
  "            long long m = llabs(x - K);",
  "            if (m < 1 || m > N) { ok = false; break; }",
  "            mags.insert(m);",
  "            magSum += m;",
  "        }",
  "        // valid: N-1 distinct magnitudes, all in [1, N]",
  "        if (ok && (int)mags.size() == N - 1)",
  "            ans += total - magSum;",
  "    }",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc20MissingSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "The biggest MAGNITUDE among the numbers is N (or N−1 if N itself was the discarded one). Before +K that element was ±(that value), so AFTER +K it lands on the MAX (if it was positive) or the MIN (if it was negative) of the list.",
          "주어진 수들 중 절대값이 가장 큰 것은 N 이에요 (버려진 게 N 이면 N−1). +K 하기 전에 그 값은 ±(그 값) 이었으니, +K 한 뒤에는 목록의 MAX (양수였다면) 또는 MIN (음수였다면) 자리에 놓여요."),
        t(E,
          "That pins K to just 4 possibilities: min+N, max−N, min+(N−1), max−(N−1). We test each instead of all 6N+1 values of K.",
          "그래서 K 는 딱 4가지로 좁혀져요: min+N, max−N, min+(N−1), max−(N−1). 6N+1 개의 K 를 전부 보는 대신 이 4개만 확인해요."),
        t(E,
          "For a candidate K, undo it with |x−K| to recover the original magnitudes. It's a valid reconstruction only if we get N−1 DISTINCT magnitudes, all inside [1, N].",
          "후보 K 마다 |x−K| 로 되돌려 원래 크기들을 복원해요. N−1 개가 모두 서로 다르고, 전부 [1, N] 안에 있어야만 올바른 복원이에요."),
        t(E,
          "When valid, the one value of 1..N not among those magnitudes is the missing number: total − sum(mags). Add it up over every valid K (a repeat missing value counts again per K).",
          "복원이 맞으면, 1..N 중 그 크기들에 없는 하나가 바로 빠진 숫자예요: total − sum(mags). 유효한 K 마다 이 값을 더해요 (같은 빠진 값이라도 K 가 다르면 다시 세요)."),
        t(E,
          "Guard: K must stay in [−3N, 3N]; skip any candidate outside that range.",
          "안전장치: K 는 반드시 [−3N, 3N] 안에 있어야 해요. 벗어난 후보는 건너뛰어요."),
      ],
      pyOnly: [
        t(E, "len(set(mags)) == N − 1 checks 'all distinct' in one line; sum(mags) recovers the leftover value.",
            "len(set(mags)) == N − 1 로 '모두 다름' 을 한 줄에 확인하고, sum(mags) 로 남은 값을 되찾아요."),
      ],
      cppOnly: [
        t(E, "A set<long long> gives both distinctness (size == N−1) and lets llabs(x − K) fill it; use long long since values reach ~4N.",
            "set<long long> 하나로 '서로 다름'(size == N−1) 을 확인하고 llabs(x − K) 로 채워요; 값이 ~4N 까지 가니 long long 을 써요."),
      ],
    },
  ];
}

export function Mcc20MissingProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadMcc20MissingPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20Missing — Full Study Guide", "Mcc20Missing — 종합 풀이 노트");
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
