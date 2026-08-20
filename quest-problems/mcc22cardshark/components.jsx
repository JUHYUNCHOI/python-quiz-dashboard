import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ── Section 1: read each stack and collapse it to its alternating sum D ── */
const SEC1_PY = [
  "import sys",
  "def solve():",
  "    data = sys.stdin.buffer.read().split()",
  "    idx = 0",
  "    T = int(data[idx]); idx += 1",
  "    out = []",
  "    for _ in range(T):",
  "        n = int(data[idx]); idx += 1",
  "        even_D, odd_D = [], []",
  "        for _ in range(n):              # each stack →",
  "            m = int(data[idx]); idx += 1",
  "            D = 0; sign = 1",
  "            for j in range(m):          # D = c1 − c2 + c3 − …",
  "                D += sign * int(data[idx + j]); sign = -sign",
  "            idx += m",
  "            (even_D if m % 2 == 0 else odd_D).append(D)",
];

const SEC1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "int main() {",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        int n; cin >> n;",
  "        vector<long long> evenD, oddD;",
  "        for (int s = 0; s < n; s++) {      // each stack →",
  "            int m; cin >> m;",
  "            long long D = 0; int sign = 1;",
  "            for (int j = 0; j < m; j++) {  // D = c1 − c2 + c3 − …",
  "                long long c; cin >> c;",
  "                D += sign * c; sign = -sign;",
  "            }",
  "            if (m % 2 == 0) evenD.push_back(D);",
  "            else oddD.push_back(D);",
  "        }",
];

/* ── Section 2: decide each stack's sign, then output ── */
const SEC2_PY = [
  "        if odd_D:",
  "            # even stacks can flip freely → take |D|",
  "            ans = sum(abs(x) for x in even_D)",
  "            # odd stacks alternate sign → sort, + to the top half",
  "            odd_D.sort(reverse=True)",
  "            plus = (len(odd_D) + 1) // 2",
  "            for i, d in enumerate(odd_D):",
  "                ans += d if i < plus else -d",
  "        else:",
  "            # no odd stack → signs are forced, sum D directly",
  "            ans = sum(even_D)",
  "        out.append(str(ans))",
  "    print('\\n'.join(out))",
  "solve()",
];

const SEC2_CPP = [
  "        long long ans = 0;",
  "        if (!oddD.empty()) {",
  "            // even stacks can flip freely → take |D|",
  "            for (long long d : evenD) ans += (d < 0 ? -d : d);",
  "            // odd stacks alternate sign → sort, + to the top half",
  "            sort(oddD.rbegin(), oddD.rend());",
  "            int plus = (oddD.size() + 1) / 2;",
  "            for (int i = 0; i < (int)oddD.size(); i++)",
  "                ans += (i < plus) ? oddD[i] : -oddD[i];",
  "        } else {",
  "            // no odd stack → signs forced, sum D directly",
  "            for (long long d : evenD) ans += d;",
  "        }",
  "        cout << ans << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getMcc22CardSharkSections(E) {
  return [
    {
      label: t(E, "① Collapse each stack to D", "① 각 스택을 D 로 줄이기"),
      color: A,
      py: SEC1_PY, cpp: SEC1_CPP,
      why: [
        t(E, "A whole stack keeps its internal order, so its effect on score1 − score2 is fixed up to a sign: the alternating sum D = c1 − c2 + c3 − … (cards top → bottom).",
            "스택은 내부 순서가 그대로라, score1 − score2 에 주는 효과는 부호만 빼면 정해져 있어요: 교대 합 D = c1 − c2 + c3 − … (카드는 위 → 아래)."),
        t(E, "Split stacks by length parity: even-length and odd-length behave differently, because odd-length stacks FLIP the position parity of everything placed after them.",
            "길이의 홀짝으로 스택을 나눠요: 홀수 길이 스택은 뒤에 오는 모든 카드의 위치 홀짝을 뒤집기 때문에, 짝수 길이와 다르게 다뤄야 해요."),
      ],
      pyOnly: [
        t(E, "(even_D if m % 2 == 0 else odd_D).append(D) picks the right bucket in one line.",
            "(even_D if m % 2 == 0 else odd_D).append(D) 로 한 줄에 알맞은 통에 넣어요."),
      ],
      cppOnly: [
        t(E, "Cards can be ±10^9 and there can be 2·10^5 of them — keep D and the answer in long long.",
            "카드가 ±10^9, 개수가 2·10^5 까지라 D 와 정답은 long long 으로 둬요."),
      ],
    },
    {
      label: t(E, "② Pick signs & output", "② 부호 정하고 출력"),
      color: A,
      py: SEC2_PY, cpp: SEC2_CPP,
      why: [
        t(E, "Each stack contributes +D (if it starts on an odd, P1 position) or −D (even, P2). If any odd-length stack exists, both parities are reachable, so every EVEN stack can grab +|D|.",
            "각 스택은 +D (홀수·P1 위치에서 시작) 또는 −D (짝수·P2) 를 기여해요. 홀수 길이 스택이 하나라도 있으면 두 홀짝을 다 만들 수 있어, 모든 짝수 스택은 +|D| 를 챙길 수 있어요."),
        t(E, "Odd-length stacks flip the parity, so along the order their signs alternate +, −, +, … — exactly ceil(k/2) get +. Sort their D descending and give + to the top half to maximize.",
            "홀수 길이 스택은 홀짝을 뒤집어서 순서를 따라 부호가 +, −, +, … 로 번갈아요 — 정확히 ceil(k/2) 개가 +. D 를 내림차순 정렬해 위쪽 절반에 + 를 줘 최댓값을 만들어요."),
        t(E, "Edge case: if NO stack is odd-length, every stack is forced to start on an odd position → all contribute +D, so just sum the D's.",
            "예외: 홀수 길이 스택이 하나도 없으면 모든 스택이 홀수 위치에서 시작하도록 강제돼요 → 전부 +D, 그래서 D 를 그냥 다 더해요."),
      ],
      pyOnly: [
        t(E, "sum('\\n'.join(out)) once at the end is faster than printing inside the loop.",
            "마지막에 '\\n'.join(out) 로 한 번에 출력하는 게 반복문 안에서 print 하는 것보다 빨라요."),
      ],
      cppOnly: [
        t(E, "sort(oddD.rbegin(), oddD.rend()) sorts descending using reverse iterators.",
            "sort(oddD.rbegin(), oddD.rend()) 는 역방향 반복자로 내림차순 정렬해요."),
      ],
    },
  ];
}

export function Mcc22CardSharkProgressiveCode(props) {
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


export function downloadMcc22CardSharkPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22CardShark — Full Study Guide", "Mcc22CardShark — 종합 풀이 노트");
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

