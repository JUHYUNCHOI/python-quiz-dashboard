import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ── Section 1: read each stack and collapse it to its alternating sum D ── */
const SEC1_PY = [
  "def solve():",
  "    T = int(input())",
  "    out = []",
  "    for _ in range(T):",
  "        n = int(input())",
  "        even_D, odd_D = [], []",
  "        for _ in range(n):              # 묶음마다",
  "            stack = list(map(int, input().split()))",
  "            m = stack[0]",
  "            cards = stack[1:]",
  "            D = 0",
  "            sign = 1",
  "            for c in cards:              # D = c1 − c2 + c3 − …",
  "                D += sign * c",
  "                sign = -sign",
  "            if m % 2 == 0:",
  "                even_D.append(D)",
  "            else:",
  "                odd_D.append(D)",
];

const SEC1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int n;",
  "        cin >> n;",
  "        vector<long long> evenD, oddD;",
  "        for (int s = 0; s < n; s++) {      // 묶음마다",
  "            int m;",
  "            cin >> m;",
  "            long long D = 0;",
  "            int sign = 1;",
  "            for (int j = 0; j < m; j++) {  // D = c1 − c2 + c3 − …",
  "                long long c;",
  "                cin >> c;",
  "                D += sign * c;",
  "                sign = -sign;",
  "            }",
  "            if (m % 2 == 0) {",
  "                evenD.push_back(D);",
  "            } else {",
  "                oddD.push_back(D);",
  "            }",
  "        }",
];

/* ── Section 2: decide each stack's sign, then output ── */
const SEC2_PY = [
  "        if odd_D:",
  "            # 짝수 묶음은 자유롭게 뒤집을 수 있어요 → |D| 를 가져가요",
  "            ans = sum(abs(x) for x in even_D)",
  "            # 홀수 묶음은 부호가 번갈아요 → 정렬해서 위쪽 절반에 +",
  "            odd_D.sort(reverse=True)",
  "            plus = (len(odd_D) + 1) // 2",
  "            for i, d in enumerate(odd_D):",
  "                if i < plus:",
  "                    ans += d",
  "                else:",
  "                    ans += -d",
  "        else:",
  "            # 홀수 묶음이 없으면 → 부호가 정해져요, D 를 그대로 더해요",
  "            ans = sum(even_D)",
  "        out.append(str(ans))",
  "    print('\\n'.join(out))",
  "solve()",
];

const SEC2_CPP = [
  "        long long ans = 0;",
  "        if (!oddD.empty()) {",
  "            // 짝수 묶음은 자유롭게 뒤집을 수 있어요 → |D| 를 가져가요",
  "            for (long long d : evenD) {",
  "                if (d < 0) {",
  "                    ans += -d;",
  "                } else {",
  "                    ans += d;",
  "                }",
  "            }",
  "            // 홀수 묶음은 부호가 번갈아요 → 정렬해서 위쪽 절반에 +",
  "            sort(oddD.rbegin(), oddD.rend());",
  "            int plus = (oddD.size() + 1) / 2;",
  "            for (int i = 0; i < (int)oddD.size(); i++)",
  "                if (i < plus) {",
  "                    ans += oddD[i];",
  "                } else {",
  "                    ans += -oddD[i];",
  "                }",
  "        } else {",
  "            // 홀수 묶음이 없으면 → 부호가 정해져요, D 를 그대로 더해요",
  "            for (long long d : evenD) {",
  "                ans += d;",
  "            }",
  "        }",
  "        cout << ans << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getMcc22CardSharkSections(E) {
  return [
    {
      label: t(E, "① Collapse each stack to D", "① 각 묶음을 D 로 줄이기"),
      color: A,
      py: SEC1_PY, cpp: SEC1_CPP,
      why: [
        t(E, "A stack keeps its internal order, so the only thing left to choose is its sign: the stack adds either +D or −D, where D is the cards added from the top with the signs +, −, +, … (the alternating sum).",
            "묶음은 안의 카드 순서가 그대로예요. 그래서 고를 수 있는 건 부호 하나뿐이에요. 묶음 하나는 +D 아니면 −D 를 더해요. D 는 맨 위 카드부터 +, −, +, … 로 번갈아 더한 값이에요."),
        t(E, "Split stacks by length parity: even-length and odd-length behave differently, because odd-length stacks FLIP the position parity of everything placed after them.",
            "묶음을 길이의 홀짝으로 나눠요. 길이가 홀수인 묶음은 뒤에 오는 모든 카드의 위치 홀짝을 뒤집어요. 그래서 길이가 짝수인 묶음과 다르게 다뤄야 해요."),
      ],
      pyOnly: [
        t(E, "list(map(int, input().split())) turns one line into a list of ints — the first is m, the rest are the cards.",
            "list(map(int, input().split())) 는 한 줄을 정수 리스트로 바꿔요. 첫 번째가 m 이고, 나머지가 카드예요."),
      ],
      cppOnly: [
        t(E, "Cards can be ±10^9 and there can be 2·10^5 of them — keep D and the answer in long long.",
            "카드 값이 ±10^9 까지 가고 카드 수도 2·10^5 까지라서, D 와 정답은 long long 에 담아요."),
      ],
    },
    {
      label: t(E, "② Pick signs & output", "② 부호 정하고 출력하기"),
      color: A,
      py: SEC2_PY, cpp: SEC2_CPP,
      why: [
        t(E, "A stack adds +D when it starts on an odd position (P1) and −D when it starts on an even one (P2). If any odd-length stack exists, you can move an even-length stack before or after it and land on either kind of position — so every even-length stack takes whichever of D and −D is the bigger one.",
            "묶음은 홀수 자리(P1)에서 시작하면 +D 를, 짝수 자리(P2)에서 시작하면 −D 를 더해요. 길이가 홀수인 묶음이 하나라도 있으면, 길이가 짝수인 묶음을 그 앞이나 뒤로 옮겨서 두 자리 중 어느 쪽에서든 시작하게 만들 수 있어요. 그래서 길이가 짝수인 묶음은 D 와 −D 중 큰 쪽을 골라 챙겨요."),
        t(E, "Odd-length stacks flip odd into even, so reading them in order their signs come out +, −, +, … If there are k of them, exactly (k+1)//2 get a +. So sort their D from biggest to smallest and hand the + to the first (k+1)//2 of them.",
            "길이가 홀수인 묶음은 홀짝을 뒤집어요. 그래서 이 묶음들만 순서대로 보면 부호가 +, −, +, … 로 번갈아 나와요. 이런 묶음이 k 개면 그중 (k+1)//2 개가 + 를 받아요. 그러니 D 를 큰 것부터 줄 세우고, 앞쪽 (k+1)//2 개에 + 를 주면 돼요."),
        t(E, "Edge case: if NO stack is odd-length, every stack is forced to start on an odd position → all contribute +D, so just sum the D's.",
            "길이가 홀수인 묶음이 하나도 없을 때가 예외예요. 이때는 모든 묶음이 홀수 위치에서 시작할 수밖에 없어요. 그래서 전부 +D 가 되고, D 를 그냥 다 더하면 돼요."),
      ],
      pyOnly: [
        t(E, "Printing '\\n'.join(out) once at the end is faster than printing inside the loop.",
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
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
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

