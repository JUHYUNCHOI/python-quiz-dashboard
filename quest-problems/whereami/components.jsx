// 🔒 USACO_VERIFIED — cpid=964, whereami (2019 Dec Bronze #2)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('whereami.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "s = lines[1].strip()",
  "",
  "# K = 1, 2, ... 차례로 시도 — 모든 길이 K 부분문자열이 서로 다르면 그게 답",
  "answer = N",
  "for K in range(1, N + 1):",
  "    seen = set()",
  "    unique = True",
  "    for i in range(N - K + 1):",
  "        sub = s[i:i+K]",
  "        if sub in seen:",
  "            unique = False",
  "            break",
  "        seen.add(sub)",
  "    if unique:",
  "        answer = K",
  "        break",
  "",
  "with open('whereami.out', 'w') as file:",
  "    file.write(str(answer) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <string>",
  "#include <set>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"whereami.in\");",
  "    ofstream fout(\"whereami.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    string s;",
  "    fin >> s;",
  "    // K = 1, 2, ... 차례로 시도",
  "    int answer = N;",
  "    for (int K = 1; K <= N; K++) {",
  "        set<string> seen;",
  "        bool unique = true;",
  "        for (int i = 0; i + K <= N; i++) {",
  "            string sub = s.substr(i, K);",
  "            if (seen.count(sub)) {",
  "                unique = false;",
  "                break;",
  "            }",
  "            seen.insert(sub);",
  "        }",
  "        if (unique) {",
  "            answer = K;",
  "            break;",
  "        }",
  "    }",
  "    fout << answer << \"\\n\";",
  "    return 0;",
  "}",
];

export function getWhereAmISections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "What do we need? The smallest K where every window\n"
          + "of K letters is unique.\n"
          + "A smaller K means Bessie needs to see fewer boxes,\n"
          + "so we try K = 1, 2, 3, ... in order and stop at the\n"
          + "first one that works.\n"
          + "For each K, we collect every length-K window; if two\n"
          + "windows match, that K isn't enough yet.",
          "무엇을 내놔야 하나요? 어느 K 개짜리 창을 봐도\n"
          + "겹치지 않는 가장 작은 K예요.\n"
          + "K 가 작을수록 우편함을 덜 보고도 위치를 알 수 있으니\n"
          + "K = 1 부터 하나씩 늘려가며 확인해요.\n"
          + "각 K 마다 길이 K 인 부분문자열을 전부 모아서,\n"
          + "똑같은 게 하나라도 있으면 그 K 는 아직 부족한 거예요.\n"
          + "처음으로 다 다른 K 가 나오면 그게 답이에요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 넣어요 (<iostream>, <vector> …).\n그래야 코드가 무엇을 하려는지 잘 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 2×10^9 을 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function WhereAmIProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY 는 USACO_VERIFIED 풀이의 표시용 사본이다 — 배열 내용은 절대 바꾸지
   않고, 그대로 가져와 beats(설명 말풍선)만 덧붙인다.
   이 quest 는 파이썬만 쓴다(pythonOnly:true, app/quest/[problemId]/data.ts) — C++ 분기는
   안 만든다. */
export function getWhereAmIWalk(E) {
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "K", ko: "지금 시도하는 윈도우 크기", en: "the window size we're trying" },
      { v: "seen", ko: "이 K 에서 이미 나온 부분문자열들", en: "substrings already seen at this K" },
      { v: "unique", ko: "이 K 가 되는지 (겹침이 없는지)", en: "whether this K has no duplicates" },
    ],
    beats: [
      { hi: [0, 5], bubble: t(E,
        "What do we need? The smallest K with no repeats. So first read N and the mailbox string s.",
        "무엇을 내놔야 하나요? 겹치지 않는 가장 작은 K예요.\n먼저 N 과 우편함 문자열 s 를 읽어요.") },
      { hi: [7, 11], bubble: t(E,
        "A smaller K is better, so try K = 1, 2, 3, ... in order. For each K, start a fresh set and assume it's unique until proven otherwise.",
        "K 가 작을수록 좋으니 K = 1, 2, 3, ... 을 차례로 시도해요.\nK 마다 빈 집합을 새로 만들고, 겹치는 게 나올 때까지는 unique 를 True 로 둬요.") },
      { hi: [12, 17], bubble: t(E,
        "To check this K, look at every length-K window. If we've already seen it, this K fails — otherwise remember it.",
        "이 K 가 되는지 보려면 길이 K 인 부분문자열을 하나씩 확인해요.\n이미 본 거면(집합에 있으면) 이 K 는 실패, 아니면 집합에 기억해 둬요.") },
      { hi: [18, 20], bubble: t(E,
        "If we made it through with no duplicates, this K works — save it and stop (smaller K's are checked first, so the first hit is the answer).",
        "끝까지 겹치는 게 안 나왔으면 이 K 가 되는 거예요 — 저장하고 멈춰요.\n작은 K 부터 확인했으니 처음 성공한 K 가 바로 답이에요.") },
      { hi: [22, 23], bubble: t(E,
        "Write the answer to the output file.",
        "답을 파일에 출력해요.") },
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


export function downloadWhereAmIPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "WhereAmI — Full Study Guide", "WhereAmI — 종합 풀이 노트");
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

