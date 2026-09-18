import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "MOD = 10**9 + 7",
  "",
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "N = 2",
  "layers = [3, 2]",
  "",
  "# 작은 층을 먼저 놓으면 곱이 작게 유지돼요 (둘을 바꿔 보면 알 수 있어요)",
  "order = sorted(layers)",
  "",
  "# 총 줄 수 = 앞에서부터 곱한 값들을 다 더한 것",
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
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "    int N = 2;",
  "    vector<long long> layers = {3, 2};",
  "",
  "    // 작은 층을 먼저 놓으면 곱이 작게 유지돼요",
  "    sort(layers.begin(), layers.end());",
  "",
  "    // 총 줄 수 = 앞에서부터 곱한 값들을 다 더한 것 (계속 MOD 로 나눈 나머지만 들고 있어요)",
  "    long long total = 0;",
  "    long long prod = 1;",
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
        "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
        "N = 2",
        "layers = [3, 2]",
      ],
      cpp: [
        "#include <iostream>",
        "#include <vector>",
        "#include <algorithm>",
        "using namespace std;",
        "const long long MOD = 1000000007;",
        "",
        "int main() {",
        "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
        "    int N = 2;",
        "    vector<long long> layers(N);",
        "    layers = {3, 2};",
      ],
      why: [
        t(E, "What do we need to produce? The minimum number of lines after choosing the best order for the layers.\nTo even start, we need every layer's size — so read N and the N layer sizes into a list first.",
            "무엇을 구해야 할까요? 층을 가장 좋은 순서로 쌓았을 때 나오는 최소 줄 수예요.\n그러려면 먼저 층이 몇 개(N)이고 크기가 얼마인지 알아야 해요.\n그래서 N 과 층 크기 리스트부터 읽어요."),
        t(E, "MOD = 1e9+7: the line count can get huge (up to 10^4 multiplied 30 times), so the answer is asked modulo 1e9+7.",
            "줄 수는 엄청 커질 수 있어요. 10^4 을 30번까지 곱하니까요.\n그래서 답은 MOD = 1e9+7 로 나눈 나머지로 구해요."),
      ],
      cppOnly: [
        t(E, "Use long long so the products don't overflow before we take the remainder.",
            "나머지를 구하기 전에 곱이 넘치지 않도록 long long 을 써요."),
      ],
    },
    {
      label: t(E, "2️⃣ Sort ascending — smallest layer first", "2️⃣ 오름차순 정렬 — 작은 층 먼저"),
      color: A,
      py: [
        "# 작은 층을 먼저 놓으면 곱이 작게 유지돼요",
        "order = sorted(layers)",
      ],
      cpp: [
        "    // 작은 층을 먼저 놓으면 곱이 작게 유지돼요",
        "    sort(layers.begin(), layers.end());",
      ],
      why: [
        t(E, "The exchange argument: for two neighbours a and b (with product P before them), a-first adds P·a + P·a·b, b-first adds P·b + P·b·a. The P·a·b part is equal, so we only compare P·a vs P·b — put the smaller size first.",
            "이웃한 두 층 a, b 를 봐요. 그 앞 층들의 곱을 P 라고 할게요.\na 를 먼저 두면 P·a + P·a·b 가 늘고, b 를 먼저 두면 P·b + P·b·a 가 늘어요.\nP·a·b 는 어느 쪽이든 같으니 P·a 와 P·b 만 견주면 돼요.\n그래서 더 작은 크기를 먼저 둬요. 이걸 교환 논증이라고 불러요."),
        t(E, "Applied to every pair, that means the whole list should be sorted ascending. Sorting once gives the optimal order.",
            "모든 짝에 이걸 적용하면 리스트 전체를 오름차순으로 정렬해야 한다는 뜻이 돼요.\n한 번 정렬하면 제일 좋은 순서가 나와요."),
      ],
    },
    {
      label: t(E, "3️⃣ Sum the prefix products (mod)", "3️⃣ 앞부분 곱들의 합 (mod)"),
      color: A,
      py: [
        "# 총 줄 수 = 앞에서부터 곱한 값들을 다 더한 것",
        "total = 0",
        "prod = 1",
        "for x in order:",
        "    prod = (prod * x) % MOD",
        "    total = (total + prod) % MOD",
        "",
        "print(total)",
      ],
      cpp: [
        "    // 총 줄 수 = 앞에서부터 곱한 값들을 다 더한 것 (계속 MOD 로 나눈 나머지만 들고 있어요)",
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
            "각 층은 지금 있는 모든 줄을 자기 크기만큼 복사해요.\n그래서 층을 k 개 쌓으면 (크기1 × 크기2 × … × 크기k) 줄이 돼요.\n그게 쌓아 온 곱 prod 예요.\n총 줄 수는 층마다의 prod 를 전부 더한 값이에요."),
        t(E, "We take % MOD after every multiply and add — because (a+b)%m = ((a%m)+(b%m))%m and (a·b)%m = ((a%m)·(b%m))%m, the modded running values give the same final remainder as the true huge numbers.",
            "곱하고 더할 때마다 % MOD 를 해 둬요.\n(a+b)%m = ((a%m)+(b%m))%m 이고 (a·b)%m = ((a%m)·(b%m))%m 이거든요.\n그래서 나머지로만 계산해도 진짜 큰 수와 마지막 나머지가 같아요."),
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
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 고르세요.")}</div>
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

