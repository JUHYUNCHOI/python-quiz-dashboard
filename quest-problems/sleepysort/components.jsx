// 🔒 USACO_VERIFIED — cpid=892, sleepysort (2019 Jan Bronze #2)
// py 12/12 PASS · cpp 12/12 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('sleepy.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "a = list(map(int, lines[1].split()))",
  "",
  "# 오른쪽부터 정렬되어 있는 가장 긴 suffix 찾기",
  "k = N - 1",
  "while k > 0 and a[k - 1] < a[k]:",
  "    k -= 1",
  "",
  "# k = 옮겨야 할 소의 수 (앞쪽 0..k-1)",
  "with open('sleepy.out', 'w') as file:",
  "    file.write(str(k) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"sleepy.in\");",
  "    ofstream fout(\"sleepy.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<int> a(N);",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> a[i];",
  "    }",
  "",
  "    // 오른쪽부터 정렬되어 있는 가장 긴 suffix 찾기",
  "    int k = N - 1;",
  "    while (k > 0 && a[k - 1] < a[k]) {",
  "        k--;",
  "    }",
  "",
  "    // k = 옮겨야 할 소의 수",
  "    fout << k << \"\\n\";",
  "    return 0;",
  "}",
];

export function getSleepySortSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we print? The fewest front-pulls needed to sort the line by ID. So first read N and the list of IDs.",
            "무엇을 출력해야 하나요? 줄을 ID 순으로 만드는 데 필요한 최소 앞당김 횟수예요.\n그러니 먼저 N 과 ID 목록을 읽어요."),
        t(E, "Cows already sitting in a rising run at the back never need to move — only the ones in front of that run do.",
            "뒤쪽에서부터 이미 오름차순으로 이어진 소들은 움직일 필요가 없어요.\n그 앞에 있는 소들만 옮겨야 해요."),
        t(E, "So scan from the right and find how far that sorted suffix reaches; the answer is how many cows sit before it.",
            "그래서 오른쪽부터 훑어서 그 정렬된 접미사가 어디까지 이어지는지 찾아요.\n그 앞에 남은 소의 수가 곧 답이에요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map) make algorithms concise.",
            "Python 의 list, map 덕분에 코드가 짧아져요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더(<iostream>, <vector>, ...)만 적으면 코드가 무엇을 쓰는지 한눈에 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 🔒 USACO_VERIFIED 최적화 풀이의 표시용 사본이다 —
   배열 내용은 절대 바꾸지 않고, 그대로 가져와 beats(설명 말풍선)만 덧붙인다. ── */
export function getSleepySortWalk(E, lang = "py") {
  const vars = [
    { v: "a", ko: "소들의 ID 줄", en: "the line of cow IDs" },
    { v: "k", ko: "이미 정렬된 뒷부분 바로 앞의 경계", en: "the boundary just before the sorted tail" },
  ];
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars,
      beats: [
        { hi: [0, 15], bubble: t(E,
          "Same target in C++ — the same k. So open the files and read N IDs into a vector.",
          "C++ 도 목표는 같아요 — 똑같이 k 를 구해요.\n그러니 파일을 열고 ID N 개를 벡터에 읽어요.") },
        { hi: [17, 21], bubble: t(E,
          "Same rule: walk left from the end while it's still an increasing run — k stops where the streak breaks.",
          "규칙은 같아요.\n맨 뒤부터 왼쪽으로 가며 오름차순이 이어지는 동안 계속 가요.\n끊기는 자리가 k 예요.") },
        { hi: [23, 24], bubble: t(E,
          "Print k.",
          "k 를 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars,
    beats: [
      { hi: [0, 5], bubble: t(E,
        "What do we need to produce? How many cows (from the front) must be pulled out and re-inserted to sort the line by ID. First read N and the IDs.",
        "무엇을 내놓아야 하나요?\n줄을 ID 순으로 만들려면 앞쪽 몇 마리를 빼서 다시 끼워야 하는지예요.\n먼저 N 과 ID 들을 읽어요.") },
      { hi: [7, 10], bubble: t(E,
        "Start at the last cow and walk left as long as each cow is smaller than the one after it — that's the already-sorted tail. k stops where that streak breaks.",
        "맨 뒤 소부터 왼쪽으로 가면서, 바로 다음 소보다 작을 때까지 계속 가요 — 그게 이미 정렬된 뒷부분이에요.\n연속이 끊기는 자리가 k 예요.") },
      { hi: [12, 14], bubble: t(E,
        "k is exactly how many cows sit in front of that sorted tail — write it.",
        "k 가 곧 정렬된 뒷부분 앞에 남은 소의 수예요 — 그대로 적어요.") },
    ],
  };
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


export function downloadSleepySortPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SleepySort — Full Study Guide", "SleepySort — 종합 풀이 노트");
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

