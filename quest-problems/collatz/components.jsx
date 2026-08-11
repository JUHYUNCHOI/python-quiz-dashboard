import { t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "n, k = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "for _ in range(k):",
  "    for i in range(n):",
  "        a[i] = a[i] // 2 if a[i] % 2 == 0 else 3 * a[i] + 1",
  "print(sum(a))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int n; long long k;",
  "    cin >> n >> k;",
  "    vector<long long> a(n);",
  "    for (auto& x : a) cin >> x;",
  "",
  "    for (long long t = 0; t < k; t++)   // k번 반복",
  "        for (auto& x : a)               // 각 원소를",
  "            x = (x % 2 == 0) ? x / 2 : 3 * x + 1;",
  "",
  "    long long sum = 0;",
  "    for (auto x : a) sum += x;",
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
        t(E, "Just simulate: repeat the whole pass exactly k times (not 'until it reaches 1'), then print the sum.",
            "그냥 시뮬: 한 바퀴 전체를 정확히 k번 반복 ('1이 될 때까지'가 아님) 하고 합을 출력."),
        t(E, "For each number: even → divide by 2, odd → times 3 plus 1.",
            "각 숫자마다: 짝수 → 2로 나눔, 홀수 → 3배하고 1을 더함."),
        t(E, "n·k ≤ 10⁶, so a plain double loop is fast enough.",
            "n·k ≤ 10⁶ 라서 그냥 이중 반복문으로 충분히 빠름."),
      ],
      pyOnly: [
        t(E, "Update in place with a[i] = ... inside the k-loop; sum(a) gives the final answer.",
            "k 반복 안에서 a[i] = ... 로 제자리 갱신하고, 마지막에 sum(a) 로 답."),
      ],
      cppOnly: [
        t(E, "3·x + 1 can grow, so store the list as long long (not int) to stay safe.",
            "3·x + 1 로 값이 커질 수 있으니 리스트를 int 말고 long long 으로 저장."),
        t(E, "for (auto& x : a) with a reference lets you modify each element in place.",
            "for (auto& x : a) 처럼 참조로 돌면 각 원소를 제자리에서 수정 가능."),
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
      { hi: [0, 8],   bubble: t(E, "Read n and k, then read the n numbers into the list a (long long — 3·x+1 can grow).", "n과 k를 읽고, 숫자 n개를 리스트 a에 읽어와요 (3·x+1로 커질 수 있어 long long).") },
      { hi: [10, 12], bubble: t(E, "Repeat the whole pass exactly k times. Each pass: for every number, if even ÷2, if odd ×3+1 — updated in place (auto& x is a reference).", "한 바퀴 전체를 정확히 k번 반복. 매 바퀴: 숫자마다 짝수면 ÷2, 홀수면 ×3+1 — 참조(auto& x)로 제자리 수정.") },
      { hi: [14, 16], bubble: t(E, "After all k passes, add up the whole list and print the sum. That's the answer.", "k번을 다 돌린 뒤 리스트 전체를 더해 합을 출력. 그게 답이에요.") },
    ] };
  }
  return { code: FULL_PY, vars: _COLL_VARS, beats: [
    { hi: [0, 1], bubble: t(E, "Read n and k on the first line, then read the list a of n numbers.", "첫 줄에서 n과 k를 읽고, 다음 줄에서 숫자 n개 리스트 a를 읽어요.") },
    { hi: [2, 4], bubble: t(E, "Repeat the whole pass exactly k times. Each pass: for every index i, if a[i] is even ÷2, if odd ×3+1 — replaced in place.", "한 바퀴 전체를 정확히 k번 반복. 매 바퀴: 각 i마다 a[i]가 짝수면 ÷2, 홀수면 ×3+1 — 제자리 교체.") },
    { hi: [5, 5], bubble: t(E, "After all k passes, print(sum(a)) — the sum of the final list. Done.", "k번을 다 돌린 뒤 print(sum(a)) — 최종 리스트의 합. 끝이에요.") },
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
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
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

