import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

const FULL_PY = [
  "a, b, c = map(int, input().split())",
  "",
  "def check(x, op, y, z):      # x op y == z 인가?",
  "    if op == \"+\": return x + y == z",
  "    if op == \"-\": return x - y == z",
  "    if op == \"*\": return x * y == z",
  "    return x == y * z        # x / y == z  ⟺  x == y * z",
  "",
  "for op in \"+-*/\":",
  "    if check(a, op, b, c):",
  "        print(str(a) + op + str(b) + \"=\" + str(c))",
  "        break",
  "    if check(b, op, c, a):",
  "        print(str(a) + \"=\" + str(b) + op + str(c))",
  "        break",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "// x op y == z 인가?  (나눗셈은 x / y == z  ⟺  x == y * z 로 확인)",
  "bool check(long long x, char op, long long y, long long z) {",
  "    if (op == '+') return x + y == z;",
  "    if (op == '-') return x - y == z;",
  "    if (op == '*') return x * y == z;",
  "    return x == y * z;",
  "}",
  "",
  "int main() {",
  "    long long a, b, c;",
  "    cin >> a >> b >> c;",
  "    string ops = \"+-*/\";",
  "    for (char op : ops) {",
  "        if (check(a, op, b, c)) { cout << a << op << b << \"=\" << c << \"\\n\"; break; }",
  "        if (check(b, op, c, a)) { cout << a << \"=\" << b << op << c << \"\\n\"; break; }",
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
        t(E, "There are only 8 candidates — '=' in the first gap or the second gap, times 4 operators — so trying every one of them is the surest way. The problem guarantees the answer is unique, so we stop at the first match.",
            "경우가 8가지뿐이라 — '=' 가 앞칸이냐 뒷칸이냐 2가지 × 연산자 4가지 — 전부 해보는 게 가장 확실해요. 답은 하나뿐이라고 문제가 보장하니까 처음 맞는 데서 멈춰요."),
        t(E, "One check function handles all four operators, and the same function is reused for both places the '=' can go: check(a, op, b, c) tests a op b = c, and check(b, op, c, a) tests a = b op c.",
            "check 함수 하나로 네 연산을 다 처리하고, 같은 함수를 '=' 위치 두 가지에 재사용해요. check(a, op, b, c) 는 a op b = c 를, check(b, op, c, a) 는 a = b op c 를 확인해요."),
        t(E, "Division is turned into multiplication: x / y == z is rewritten as x == y * z. '/' is real division here, so comparing decimals could be off by a tiny amount — this way the whole check stays between whole numbers.",
            "나눗셈은 곱셈으로 뒤집어요: x / y == z 를 x == y * z 로 바꿔요. 여기서 '/' 는 실수 나눗셈이라 소수로 비교하면 아주 작은 오차가 날 수 있는데, 이렇게 하면 확인이 전부 정수끼리 이뤄져요."),
        t(E, "That same rule explains why 3/2=1 is not a valid equation: 3/2 is 1.5, and 1.5 is not 1.",
            "3/2=1 이 올바른 등식이 아닌 이유도 같은 맥락이에요: 3/2 는 1.5 이고, 1.5 는 1 이 아니니까요."),
      ],
      pyOnly: [
        t(E, "for op in \"+-*/\" walks a string one character at a time, so op becomes '+', then '-', then '*', then '/'.",
            "for op in \"+-*/\" 는 문자열을 한 글자씩 순회해요. op 가 '+', '-', '*', '/' 순서로 들어와요."),
        t(E, "str(a) + op + str(b) + \"=\" + str(c) glues the numbers and symbols into one string with no spaces, exactly as the output format asks.",
            "str(a) + op + str(b) + \"=\" + str(c) 로 숫자와 기호를 공백 없이 하나의 문자열로 이어 붙여요. 출력 형식이 요구하는 그대로예요."),
      ],
      cppOnly: [
        t(E, "Values go up to 1,000,000, so x * y can reach 10^12 — too big for int. Use long long.",
            "값이 10^6 까지라 x * y 가 10^12 → int 로는 넘쳐요. long long 을 써요."),
        t(E, "cout << a << op << b << \"=\" << c prints the pieces back to back, so no spaces sneak in.",
            "cout << a << op << b << \"=\" << c 는 조각들을 연달아 출력해서 공백이 끼지 않아요."),
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

