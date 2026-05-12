import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, Q = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "# bestSuffix[i] = cheapest single deal among deals i..N-1",
  "INF = float('inf')",
  "bestSuffix = [INF] * (N + 1)",
  "for i in range(N - 1, -1, -1):",
  "    bestSuffix[i] = min(bestSuffix[i + 1], a[i])",
  "",
  "def solve(x, i):",
  "    # min cost for >= x buckets using deals 0..i (deal j gives 2^j buckets)",
  "    if x <= 0:",
  "        return 0",
  "    if i < 0:",
  "        return INF",
  "    size = 1 << i",
  "    k = x // size",
  "    r = x - k * size",
  "    # use k copies of deal i, then handle remainder with smaller deals",
  "    opt1 = a[i] * k + (solve(r, i - 1) if r > 0 else 0)",
  "    # over-buy: use k+1 copies of deal i, done",
  "    opt2 = a[i] * (k + 1)",
  "    # skip deal i entirely",
  "    opt3 = solve(x, i - 1)",
  "    return min(opt1, opt2, opt3)",
  "",
  "out = []",
  "for _ in range(Q):",
  "    x = int(input())",
  "    # cheapest single bulk that already gives >= x",
  "    big = INF",
  "    for i in range(N):",
  "        if (1 << i) >= x:",
  "            big = a[i]  # a is increasing, first one is cheapest",
  "            break",
  "    top = min(N - 1, x.bit_length())",
  "    out.append(min(big, solve(x, top)))",
  "",
  "print('\\n'.join(map(str, out)))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "typedef long long ll;",
  "",
  "int N, Q;",
  "vector<ll> a;",
  "const ll INF = (ll)1e18;",
  "",
  "ll solve(ll x, int i) {",
  "    if (x <= 0) return 0;",
  "    if (i < 0) return INF;",
  "    ll size = 1LL << i;",
  "    ll k = x / size;",
  "    ll r = x - k * size;",
  "    ll rest = (r > 0) ? solve(r, i - 1) : 0;",
  "    ll opt1 = a[i] * k + rest;",
  "    ll opt2 = a[i] * (k + 1);",
  "    ll opt3 = solve(x, i - 1);",
  "    return min(opt1, min(opt2, opt3));",
  "}",
  "",
  "int main() {",
  "    cin >> N >> Q;",
  "    a.resize(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
  "    for (int q = 0; q < Q; q++) {",
  "        ll x; cin >> x;",
  "        ll big = INF;",
  "        for (int i = 0; i < N; i++) {",
  "            if ((1LL << i) >= x) {",
  "                big = a[i];",
  "                break;",
  "            }",
  "        }",
  "        // bit_length of x: smallest top so 2^top >= x is enough",
  "        int top = 0;",
  "        ll p = 1;",
  "        while (p < x && top < N - 1) {",
  "            p *= 2;",
  "            top++;",
  "        }",
  "        cout << min(big, solve(x, top)) << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getBuyMilkSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Deal i sells 2^(i-1) buckets, and prices are strictly increasing. Bigger deals can be cheaper per bucket.",
            "거래 i 는 2^(i-1) 통, 가격은 엄격 증가. 큰 거래가 통당 단가는 더 쌀 수 있어."),
        t(E, "For each query x, we recurse top-down: at deal i, try (use k copies + recurse on remainder) or (use k+1 copies and stop) or (skip this deal).",
            "각 쿼리 x 에 대해 위에서 아래로 재귀: 거래 i 에서 (k 개 + 나머지 재귀) / (k+1 개로 끝) / (이 거래 건너뜀) 중 최솟값."),
        t(E, "Plus one extra option: just buy one copy of the smallest deal whose size already covers x.",
            "추가 옵션: x 를 한 번에 덮을 수 있는 가장 작은 거래 하나를 사는 것."),
      ],
      pyOnly: [
        t(E, "Python's built-in big ints handle up to 10^9 * 10^9 safely — no overflow worries.",
            "파이썬 정수는 임의 정밀도라 10^9 * 10^9 도 안전 — 오버플로 걱정 없음."),
      ],
      cppOnly: [
        t(E, "Use long long everywhere — costs can reach about 10^18.",
            "비용이 약 10^18 까지 커질 수 있으니 long long 필수."),
      ],
    },
  ];
}

export function BuyMilkProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","ll","typedef"];
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


export function downloadBuyMilkPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Purchasing Milk — Full Study Guide", "우유 구매 — 종합 풀이 노트");
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
<div class="sub">USACO 2026 Second Contest, Bronze #3 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
