import { t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "n, k = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "for _ in range(k):",
  "    for i in range(n):",
  "        if a[i] % 2 == 0:",
  "            a[i] = a[i] // 2",
  "        else:",
  "            a[i] = 3 * a[i] + 1",
  "print(sum(a))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int n;",
  "    long long k;",
  "    cin >> n >> k;",
  "    vector<long long> a(n);",
  "    for (auto& x : a) {",
  "        cin >> x;",
  "    }",
  "",
  "    for (long long t = 0; t < k; t++)   // k번 반복",
  "        for (auto& x : a)               // 각 원소를",
  "            if (x % 2 == 0) {",
  "                x = x / 2;",
  "            } else {",
  "                x = 3 * x + 1;",
  "            }",
  "",
  "    long long sum = 0;",
  "    for (auto x : a) {",
  "        sum += x;",
  "    }",
  "    cout << sum << \"\\n\";",
  "}",
];

export function getCollatzSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What are we printing? The sum of the list after doing the flip-or-halve step exactly k times. So first read n, k, and the n numbers.",
            "무엇을 출력해야 하나요? 짝수면 반으로, 홀수면 3배+1 하는 걸 k번 다 돈 뒤의 리스트 합이에요.\n그러니 먼저 n, k, 숫자 n개를 읽어요."),
        t(E, "Why exactly k passes, not 'until it reaches 1'? Because the problem asks for exactly k. Each pass: even → divide by 2, odd → times 3 plus 1.",
            "왜 딱 k번만 돌까요? '1이 될 때까지' 가 아니에요.\n문제가 정확히 k번만 하라고 했으니, 숫자마다 짝수면 2로 나누고 홀수면 3배한 뒤 1을 더해요."),
        t(E, "So after all k passes, print the sum. n·k ≤ 10⁶, so a plain double loop is fast enough.",
            "그래서 k번을 다 돈 뒤 합을 출력해요.\nn·k ≤ 10⁶ 라서 이중 반복문만으로도 충분히 빨라요."),
      ],
      pyOnly: [
        t(E, "Update in place with a[i] = ... inside the k-loop; sum(a) gives the final answer.",
            "k번 도는 동안 a[i] = ... 로 그 자리에서 바꾸고, 마지막에 sum(a) 로 답을 구해요."),
      ],
      cppOnly: [
        t(E, "3·x + 1 can grow, so store the list as long long (not int) to stay safe.",
            "3·x + 1 로 값이 커질 수 있으니 리스트를 int 말고 long long 으로 저장해요."),
        t(E, "for (auto& x : a) with a reference lets you modify each element in place.",
            "for (auto& x : a) 처럼 참조로 돌면 각 원소를 그 자리에서 바꿀 수 있어요."),
      ],
    },
  ];
}

// CodeWalk — 코드 줄에 붙는 말풍선 (선생님 규칙: 코드 위 설명 벽 금지).
const _COLL_VARS = [
  { v: "n", ko: "숫자 개수", en: "# of numbers" },
  { v: "k", ko: "반복 횟수", en: "# of passes" },
  { v: "a", ko: "숫자 리스트", en: "the list of numbers" },
];
export function getCollatzWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _COLL_VARS, beats: [
      { hi: [0, 11],  bubble: t(E, "What are we printing?\nThe sum of the list after doing the flip-or-halve step k times.\nSo first read n, k, and the n numbers into a.\n3x+1 can grow, so a is long long.", "무엇을 출력해야 하나요?\n짝수면 반으로, 홀수면 3배+1 하는 걸 k번 다 돈 뒤의 리스트 합이에요.\n그러니 먼저 n, k, 숫자 n개를 리스트 a 에 읽어요.\n3·x+1 로 커질 수 있어 a 는 long long 으로 받아요.") },
      { hi: [13, 19], bubble: t(E, "Why exactly k passes, not 'until it reaches 1'?\nBecause the problem asks for exactly k — nothing more.\nEach pass: if even ÷2, if odd ×3+1.\nauto& x is a reference, so it changes right in place.", "왜 딱 k번만 돌까요? '1이 될 때까지'가 아니에요.\n문제가 정확히 k번만 하라고 했으니까요.\n바퀴마다 숫자가 짝수면 ÷2, 홀수면 ×3+1 로 바꿀 뿐이에요.\n참조(auto& x) 라서 그 자리에서 바로 바뀌어요.") },
      { hi: [21, 25], bubble: t(E, "After all k passes, add up the whole list and print the sum.\nn·k ≤ 10^6, so this plain double loop is fast enough.", "k번을 다 돌린 뒤 리스트 전체를 더해 합을 출력해요.\nn·k ≤ 10⁶ 라서 이렇게 그대로 돌려도 충분히 빨라요.") },
    ] };
  }
  return { code: FULL_PY, vars: _COLL_VARS, beats: [
    { hi: [0, 1], bubble: t(E, "What are we printing?\nThe sum of the list after doing the flip-or-halve step k times.\nSo read n and k on the first line,\nthen read the list a of n numbers on the next line.", "무엇을 출력해야 하나요?\n짝수면 반으로, 홀수면 3배+1 하는 걸 k번 다 돈 뒤의 리스트 합이에요.\n그러니 첫 줄에서 n 과 k 를 읽고,\n다음 줄에서 숫자 n 개 리스트 a 를 읽어요.") },
    { hi: [2, 7], bubble: t(E, "Why exactly k passes, not 'until it reaches 1'?\nBecause the problem asks for exactly k — nothing more.\nEach pass: if a[i] is even ÷2, if odd ×3+1.\nReplaced right in place.", "왜 딱 k번만 돌까요? '1이 될 때까지'가 아니에요.\n문제가 정확히 k번만 하라고 했으니까요.\n바퀴마다 a[i] 가 짝수면 ÷2, 홀수면 ×3+1 로 바꿀 뿐이에요.\n그 자리에서 바로 바꿔요.") },
    { hi: [8, 8], bubble: t(E, "After all k passes, print(sum(a)) — the sum of the final list.\nn·k ≤ 10^6, so this plain double loop is fast enough.", "k번을 다 돌린 뒤 print(sum(a)) 로 리스트 합을 출력해요.\nn·k ≤ 10⁶ 라서 이렇게 그대로 돌려도 충분히 빨라요.") },
  ] };
}

export function CollatzProgressiveCode(props) {
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


export function downloadCollatzPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Collatz — Full Study Guide", "Collatz — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 선택해요.")}</div>
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

