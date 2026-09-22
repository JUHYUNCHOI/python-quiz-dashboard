// 🔒 USACO_VERIFIED — cpid=760, bovshuffle (2017 Dec Bronze #2, Bovine Shuffle)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('shuffle.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "# shuffle: i 번째 위치 → 어디로 가는지 (1-indexed → 0-indexed 변환)",
  "shuffle = list(map(int, lines[1].split()))",
  "for i in range(N):",
  "    shuffle[i] = shuffle[i] - 1",
  "",
  "cows = list(map(int, lines[2].split()))",
  "",
  "# shuffle: 위치 i 에 있던 cow 가 shuffle[i] 위치로 감",
  "# → NEW[shuffle[i]] = OLD[i], OLD[i] = NEW[shuffle[i]]",
  "# 역방향 한 step: temp[i] = result[shuffle[i]]",
  "# AFTER 3 shuffles 로부터 BEFORE 를 얻기 위해 역방향 3 번",
  "result = []",
  "for x in cows:",
  "    result.append(x)",
  "for rep in range(3):",
  "    temp = [0] * N",
  "    for i in range(N):",
  "        temp[i] = result[shuffle[i]]",
  "    result = temp",
  "",
  "with open('shuffle.out', 'w') as file:",
  "    for x in result:",
  "        file.write(str(x) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"shuffle.in\");",
  "    ofstream fout(\"shuffle.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<int> shuf(N), cows(N);",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> shuf[i];",
  "        shuf[i]--;",
  "    }",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> cows[i];",
  "    }",
  "    // 역방향 한 step: temp[i] = result[shuffle[i]]",
  "    // AFTER 3 shuffles 로부터 BEFORE 를 얻기 위해 역방향 3 번",
  "    for (int rep = 0; rep < 3; rep++) {",
  "        vector<int> nxt(N);",
  "        for (int i = 0; i < N; i++) {",
  "            nxt[i] = cows[shuf[i]];",
  "        }",
  "        cows = nxt;",
  "    }",
  "    for (int i = 0; i < N; i++) {",
  "        fout << cows[i] << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getBovShuffleSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
            "What should we output? The lineup BEFORE 3 shuffles happened.\nSo first read the shuffle rule and the lineup we see now.",
            "무엇을 출력해야 하나요? 셔플을 3번 하기 전의 원래 줄이에요.\n그러니 먼저 셔플 규칙과 지금(after) 줄을 읽어요."),
        t(E,
            "The rule moves forward: the cow at spot i goes to spot\nshuffle[i]. To undo it, follow that arrow backward one step —\ntemp[i] = result[shuffle[i]].",
            "규칙은 앞으로만 알려줘요: 자리 i 의 소가 shuffle[i] 자리로\n가요. 되돌리려면 이 화살표를 거꾸로 따라가야 해요 —\ntemp[i] = result[shuffle[i]] 로 한 칸 되돌려요."),
        t(E,
            "The lineup we're given is after 3 shuffles, so undoing it\n3 times in a row gets back to the original lineup.",
            "지금 줄은 셔플을 3번 한 결과라서, 되돌리기도 3번\n반복하면 원래 줄이 나와요."),
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

export function BovShuffleProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadBovShufflePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "BovShuffle — Full Study Guide", "BovShuffle — 종합 풀이 노트");
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

