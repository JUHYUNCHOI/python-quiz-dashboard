import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "import sys",
  "data = sys.stdin.buffer.read().split()",
  "idx = 0",
  "T = int(data[idx]); idx += 1        # 테스트 케이스 개수",
  "out = []",
  "for _ in range(T):",
  "    N = int(data[idx]); idx += 1",
  "    odd = even = 0                   # 홀수·짝수 바구니 개수",
  "    for _ in range(N):",
  "        if int(data[idx]) % 2 == 1:",
  "            odd += 1",
  "        else:",
  "            even += 1",
  "        idx += 1",
  "    # 세 수의 합이 홀수 = (홀 3개) 또는 (홀 1개 + 짝 2개)",
  "    if odd >= 3 or (odd >= 1 and even >= 2):",
  "        out.append('YES')",
  "    else:",
  "        out.append('NO')",
  "print('\\n'.join(out))",
];

const FULL_CPP = [
  "#include <iostream>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false); cin.tie(nullptr);",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        int N; cin >> N;",
  "        long long odd = 0, even = 0;   // 홀수·짝수 바구니 개수",
  "        for (int i = 0; i < N; i++) {",
  "            long long x; cin >> x;",
  "            if (x % 2 == 1) odd++;",
  "            else even++;",
  "        }",
  "        // 세 수의 합이 홀수 = (홀 3개) 또는 (홀 1개 + 짝 2개)",
  "        bool ok = (odd >= 3) || (odd >= 1 && even >= 2);",
  "        cout << (ok ? \"YES\" : \"NO\") << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getMcc21CarrotsSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Key insight: a sum of three numbers is ODD only two ways — three odds, or one odd + two evens. Every other mix gives an even sum.",
            "핵심 통찰: 세 수의 합이 홀수가 되는 건 딱 두 가지예요 — 홀수 3개, 또는 홀수 1개 + 짝수 2개. 나머지 조합은 모두 짝수 합이에요."),
        t(E, "So the exact carrot counts don't matter — only how many are ODD and how many are EVEN. One pass counts them.",
            "그래서 정확한 당근 수는 중요하지 않고, 홀수가 몇 개·짝수가 몇 개인지만 중요해요. 한 번 훑어 개수만 세요."),
        t(E, "Answer YES when odd ≥ 3 (recipe 🟠🟠🟠) or when odd ≥ 1 and even ≥ 2 (recipe 🟠⚪⚪). This is O(N) per test — no triples.",
            "홀수 ≥ 3 (레시피 🟠🟠🟠) 이거나 홀수 ≥ 1 이고 짝수 ≥ 2 (레시피 🟠⚪⚪) 이면 YES 예요. 테스트당 O(N) — 조합을 돌지 않아요."),
      ],
      pyOnly: [
        t(E, "Reading all tokens at once with sys.stdin.buffer.read().split() and walking an index handles the T test cases fast.",
            "sys.stdin.buffer.read().split() 로 토큰을 한 번에 읽고 인덱스를 옮기면 T 개의 테스트를 빠르게 처리해요."),
        t(E, "x % 2 == 1 checks oddness; collect answers in a list and join with '\\n' so printing happens once.",
            "x % 2 == 1 로 홀수를 확인해요. 답을 리스트에 모아 '\\n' 로 이어 붙여 한 번에 출력해요."),
      ],
      cppOnly: [
        t(E, "ios::sync_with_stdio(false) with cin.tie(nullptr) speeds up cin — useful when N reaches 100000.",
            "ios::sync_with_stdio(false) 와 cin.tie(nullptr) 로 cin 을 빠르게 해요 — N 이 100000 까지 갈 때 도움돼요."),
        t(E, "while (T--) loops over the test cases; the count fits in int, but long long is a safe habit.",
            "while (T--) 로 테스트를 반복해요. 개수는 int 로도 되지만 long long 이 안전한 습관이에요."),
      ],
    },
  ];
}

export function Mcc21CarrotsProgressiveCode(props) {
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


export function downloadMcc21CarrotsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21Carrots — Full Study Guide", "Mcc21Carrots — 종합 풀이 노트");
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

