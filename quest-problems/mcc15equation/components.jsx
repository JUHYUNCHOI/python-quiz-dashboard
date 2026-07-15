import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

const FULL_PY = [
  "T = int(input())",
  "ops = ['+', '-', '*', '/']",
  "",
  "def evaluate(a, b, c, op1, op2):",
  "    # Build expression and evaluate",
  "    expr = f'{a}{op1}{b}{op2}{c}'",
  "    try:",
  "        result = eval(expr)",
  "        return result == int(result)",
  "    except:",
  "        return False",
  "",
  "for _ in range(T):",
  "    a, b, c, target = map(int, input().split())",
  "    found = False",
  "    for op1 in ops:",
  "        for op2 in ops:",
  "            expr = f'{a}{op1}{b}{op2}{c}'",
  "            try:",
  "                if eval(expr) == target:",
  "                    print(f'{a}{op1}{b}{op2}{c}={target}')",
  "                    found = True",
  "                    break",
  "            except: pass",
  "        if found: break",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <cmath>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    string ops = \"+-*/\";",
  "",
  "    for (int t = 0; t < T; t++) {",
  "        long long a, b, c, target;",
  "        cin >> a >> b >> c >> target;",
  "        bool found = false;",
  "",
  "        for (char op1 : ops) {              // 첫 번째 연산자",
  "            for (char op2 : ops) {          // 두 번째 연산자",
  "                bool op1Mul = (op1 == '*' || op1 == '/');",
  "                bool op2Mul = (op2 == '*' || op2 == '/');",
  "                double result; bool valid = true;",
  "",
  "                // 곱셈·나눗셈을 먼저 계산 (연산자 우선순위)",
  "                if (!op1Mul && op2Mul) {        // a op1 (b op2 c)",
  "                    double bc;",
  "                    if (op2 == '*') bc = (double)b * c;",
  "                    else if (c == 0) valid = false;   // 0 으로 나누기 → 건너뜀",
  "                    else bc = (double)b / c;",
  "                    if (valid) result = (op1 == '+') ? a + bc : a - bc;",
  "                } else {                       // (a op1 b) op2 c",
  "                    double ab;",
  "                    if (op1 == '+') ab = a + b;",
  "                    else if (op1 == '-') ab = a - b;",
  "                    else if (op1 == '*') ab = (double)a * b;",
  "                    else if (b == 0) valid = false;",
  "                    else ab = (double)a / b;",
  "                    if (valid) {",
  "                        if (op2 == '+') result = ab + c;",
  "                        else if (op2 == '-') result = ab - c;",
  "                        else if (op2 == '*') result = ab * c;",
  "                        else if (c == 0) valid = false;",
  "                        else result = ab / c;",
  "                    }",
  "                }",
  "",
  "                // target 과 같으면 출력 (정수 target → 오차 허용 비교)",
  "                if (valid && fabs(result - (double)target) < 1e-9) {",
  "                    cout << a << op1 << b << op2 << c << \"=\" << target << \"\\n\";",
  "                    found = true;",
  "                    break;",
  "                }",
  "            }",
  "            if (found) break;",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

export function getMcc15EqSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Try all 4×4 = 16 operator pairs (op1, op2). For each, compute a op1 b op2 c and check if it equals the target; print the first match.",
            "연산자 짝 4×4 = 16가지를 다 시도. 각각 a op1 b op2 c 를 계산해 target 과 같은지 보고, 처음 맞는 걸 출력."),
        t(E, "Multiply/divide bind tighter than add/subtract — handle that precedence, and skip division by zero.",
            "곱하기·나누기가 더하기·빼기보다 먼저 (우선순위) — 그걸 처리하고, 0 으로 나누기는 건너뜀."),
      ],
      pyOnly: [
        t(E, "Python's eval() computes the expression string directly (respecting precedence).",
            "Python은 eval() 로 식 문자열을 바로 계산 (우선순위 지켜서)."),
      ],
      cppOnly: [
        t(E, "No eval() in C++ — compute each expression by hand, doing ×/ before +−.",
            "C++엔 eval() 이 없어 — 식을 직접 계산하되 ×/ 를 +− 보다 먼저."),
        t(E, "for (char op : ops) loops over the operator characters; double handles division cleanly.",
            "for (char op : ops) 로 연산자 문자를 순회; 나눗셈은 double 로 깔끔하게."),
      ],
    },
  ];
}

export function Mcc15EqProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadMcc15EqPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc15Eq — Full Study Guide", "Mcc15Eq — 종합 풀이 노트");
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

