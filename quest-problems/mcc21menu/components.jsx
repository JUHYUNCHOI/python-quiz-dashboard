import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "MOD = 10**9 + 7",
  "",
  "N = int(input())",
  "layers = list(map(int, input().split()))",
  "",
  "# smallest layer first keeps the running product small (exchange argument)",
  "order = sorted(layers)",
  "",
  "# total lines = sum of prefix products",
  "total = 0",
  "prod = 1",
  "for x in order:",
  "    prod = (prod * x) % MOD",
  "    total = (total + prod) % MOD",
  "",
  "print(total)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "const long long MOD = 1000000007;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<long long> layers(N);",
  "    for (int i = 0; i < N; i++) cin >> layers[i];",
  "",
  "    // smallest layer first keeps the running product small",
  "    sort(layers.begin(), layers.end());",
  "",
  "    // total lines = sum of prefix products (keep everything mod MOD)",
  "    long long total = 0, prod = 1;",
  "    for (long long x : layers) {",
  "        prod = (prod * x) % MOD;",
  "        total = (total + prod) % MOD;",
  "    }",
  "",
  "    cout << total << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc21MenuSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read the layer sizes", "1️⃣ 층 크기 읽기"),
      color: A,
      py: [
        "MOD = 10**9 + 7",
        "",
        "N = int(input())",
        "layers = list(map(int, input().split()))",
      ],
      cpp: [
        "#include <iostream>",
        "#include <vector>",
        "#include <algorithm>",
        "using namespace std;",
        "const long long MOD = 1000000007;",
        "",
        "int main() {",
        "    int N;",
        "    cin >> N;",
        "    vector<long long> layers(N);",
        "    for (int i = 0; i < N; i++) cin >> layers[i];",
      ],
      why: [
        t(E, "Read N and the N layer sizes into a list. That's all the input — the whole problem is just deciding their order.",
            "N 과 N 개의 층 크기를 리스트로 읽어요. 입력은 이게 전부 — 문제는 이 순서를 정하는 것뿐이에요."),
        t(E, "MOD = 1e9+7: the line count can get huge (up to 10^4 multiplied 30 times), so the answer is asked modulo 1e9+7.",
            "MOD = 1e9+7: 줄 수는 엄청 커질 수 있어요 (10^4 을 30번 곱함), 그래서 답을 1e9+7 로 나눈 나머지로 구해요."),
      ],
      cppOnly: [
        t(E, "Use long long so the products don't overflow before we take the remainder.",
            "나머지를 취하기 전에 곱이 넘치지 않도록 long long 을 써요."),
      ],
    },
    {
      label: t(E, "2️⃣ Sort ascending — smallest layer first", "2️⃣ 오름차순 정렬 — 작은 층 먼저"),
      color: A,
      py: [
        "# smallest layer first keeps the running product small",
        "order = sorted(layers)",
      ],
      cpp: [
        "    // smallest layer first keeps the running product small",
        "    sort(layers.begin(), layers.end());",
      ],
      why: [
        t(E, "The exchange argument: for two neighbours a and b (with product P before them), a-first adds P·a + P·a·b, b-first adds P·b + P·b·a. The P·a·b part is equal, so we only compare P·a vs P·b — put the smaller size first.",
            "교환 논증: 이웃한 a, b (앞 곱 P) 에서 a 먼저면 P·a + P·a·b, b 먼저면 P·b + P·b·a 를 더해요. P·a·b 는 같으니 P·a 와 P·b 만 비교 — 더 작은 크기를 먼저 둬요."),
        t(E, "Applied to every pair, that means the whole list should be sorted ascending. Sorting once gives the optimal order.",
            "모든 쌍에 적용하면, 전체 리스트를 오름차순 정렬해야 한다는 뜻이에요. 한 번 정렬하면 최적 순서가 나와요."),
      ],
    },
    {
      label: t(E, "3️⃣ Sum the prefix products (mod)", "3️⃣ 앞부분 곱들의 합 (mod)"),
      color: A,
      py: [
        "# total lines = sum of prefix products",
        "total = 0",
        "prod = 1",
        "for x in order:",
        "    prod = (prod * x) % MOD",
        "    total = (total + prod) % MOD",
        "",
        "print(total)",
      ],
      cpp: [
        "    // total lines = sum of prefix products (keep everything mod MOD)",
        "    long long total = 0, prod = 1;",
        "    for (long long x : layers) {",
        "        prod = (prod * x) % MOD;",
        "        total = (total + prod) % MOD;",
        "    }",
        "",
        "    cout << total << \"\\n\";",
        "    return 0;",
        "}",
      ],
      why: [
        t(E, "Each layer copies every existing line by its size, so after k layers the menu has (size1 × size2 × … × sizek) lines. That's the running product 'prod'; the total lines is the sum of prod after each layer.",
            "각 층은 지금 모든 줄을 자기 크기만큼 복사하니, k 개 층 뒤엔 (크기1 × 크기2 × … × 크기k) 줄이 돼요. 그게 누적 곱 'prod'; 총 줄 수는 각 층 뒤 prod 들의 합이에요."),
        t(E, "We take % MOD after every multiply and add — because (a+b)%m = ((a%m)+(b%m))%m and (a·b)%m = ((a%m)·(b%m))%m, the modded running values give the same final remainder as the true huge numbers.",
            "곱하고 더할 때마다 % MOD 를 취해요 — (a+b)%m = ((a%m)+(b%m))%m 이고 (a·b)%m = ((a%m)·(b%m))%m 이라서, 나머지로 계산해도 진짜 큰 수와 최종 나머지가 같아요."),
      ],
    },
  ];
}

export function Mcc21MenuProgressiveCode(props) {
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


export function downloadMcc21MenuPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21Menu — Full Study Guide", "Mcc21Menu — 종합 풀이 노트");
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

