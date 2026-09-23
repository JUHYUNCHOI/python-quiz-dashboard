// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 12/12 on cpid=1253
// 🔧 REWRITTEN 2026-06-15 — real problem: Reverse Engineering (2022 Dec Bronze 3, cpid 1253)
//   Both Python & C++ now use the correct greedy "peel a consistent (var,value) group" algorithm.
//   Local: compiles + matches official sample (OK/OK/LIE/LIE) exactly.
//   USACO re-submit PENDING. Prior scaffold echoed N (WA); prior Python only tried a single
//   decision variable (wrong for multi-if programs) — both replaced.

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "def read_line():",
  "    # The judge puts a blank line between test cases — skip it.",
  "    line = input()",
  "    while line.strip() == \"\":",
  "        line = input()",
  "    return line",
  "",
  "T = int(read_line())",
  "for _ in range(T):",
  "    N, M = map(int, read_line().split())",
  "    rows = []",
  "    for _ in range(M):",
  "        s, o = read_line().split()      # binary string, output digit",
  "        rows.append((s, int(o)))",
  "",
  "    # Greedy peel: a group of rows can become one if-statement only",
  "    # if EVERY row sharing some variable=value has the SAME output.",
  "    # Peel such groups off until none remain (OK) or stuck (LIE).",
  "    alive = [True] * M",
  "    remaining = M",
  "    progress = True",
  "    while remaining > 0 and progress:",
  "        progress = False",
  "        for pos in range(N):",
  "            for val in ('0', '1'):",
  "                idx = [i for i in range(M)",
  "                       if alive[i] and rows[i][0][pos] == val]",
  "                if not idx:",
  "                    continue",
  "                outs = set(rows[i][1] for i in idx)",
  "                if len(outs) == 1:        # all same output -> one if",
  "                    for i in idx:",
  "                        alive[i] = False",
  "                    remaining -= len(idx)",
  "                    progress = True",
  "",
  "    if remaining == 0:",
  "        print('OK')",
  "    else:",
  "        print('LIE')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int N, M;",
  "        cin >> N >> M;",
  "        vector<string> in(M);",
  "        vector<int> out(M);",
  "        for (int i = 0; i < M; i++) {",
  "            cin >> in[i] >> out[i];",
  "        }",
  "",
  "        vector<bool> alive(M, true);",
  "        int remaining = M;",
  "        bool progress = true;",
  "        while (remaining > 0 && progress) {",
  "            progress = false;",
  "            for (int pos = 0; pos < N; pos++) {",
  "                for (char val = '0'; val <= '1'; val++) {",
  "                    int cnt0 = 0;",
  "                    int cnt1 = 0;",
  "                    int total = 0;",
  "                    for (int i = 0; i < M; i++) {",
  "                        if (alive[i] && in[i][pos] == val) {",
  "                            total++;",
  "                            if (out[i] == 0) {",
  "                                cnt0++;",
  "                            } else {",
  "                                cnt1++;",
  "                            }",
  "                        }",
  "                    }",
  "                    if (total == 0) {",
  "                        continue;",
  "                    }",
  "                    if (cnt0 == 0 || cnt1 == 0) {   // all same output",
  "                        for (int i = 0; i < M; i++)",
  "                            if (alive[i] && in[i][pos] == val) {",
  "                                alive[i] = false;",
  "                                remaining--;",
  "                            }",
  "                        progress = true;",
  "                    }",
  "                }",
  "            }",
  "        }",
  "        const char* result;",
  "        if (remaining == 0) {",
  "            result = \"OK\";",
  "        } else {",
  "            result = \"LIE\";",
  "        }",
  "        cout << result << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getRevEngSections(E) {
  return [
    {
      /* 1️⃣ 입력 읽기 — T, 케이스마다 N M, 그리고 M 개의 (문자열, 출력) 행. */
      label: t(E, "1️⃣ Read the input", "1️⃣ 입력을 읽어요"),
      color: A,
      py: FULL_PY.slice(0, 14), cpp: FULL_CPP.slice(0, 16),
      why: [
        t(E,
          "What do we need for one test case? N (string length), M (row count), then M rows — each a length-N string with its claimed output.",
          "한 케이스에 뭐가 필요할까요? N(문자열 길이), M(줄 개수),\n그리고 길이 N 문자열과 그 출력이 짝지어진 줄 M 개예요."),
      ],
      pyOnly: [
        t(E, "s, o = input().split() reads one row's string and output digit at once.",
            "s, o = input().split() 로 한 줄의 문자열과 출력을 한 번에 읽어요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, <string>) — keeps code clear.",
            "필요한 헤더만 넣으면 (<iostream>, <vector>, <string>)\n코드가 무엇을 하려는지 더 잘 보여요."),
        t(E, "Reading the binary string with cin >> gives a std::string; index it with [pos].",
            "0 과 1 로 된 문자열을 cin >> 로 받으면 std::string 이 돼요.\n[pos] 로 한 글자씩 꺼내 보면 돼요."),
      ],
    },
    {
      /* 2️⃣ 떼어내기 반복 — 앞 시뮬(PeelSim/StuckSim)에서 본 것을 코드로. */
      label: t(E, "2️⃣ Peel rows off, one if at a time", "2️⃣ if 하나씩 만들며 줄을 떼어내요"),
      color: "#7c3aed",
      py: FULL_PY.slice(14), cpp: FULL_CPP.slice(16),
      why: [
        t(E,
          "The answer is OK or LIE — could such a program exist?\nAn if-statement on 'variable=value' only works if every\nremaining row matching it shares the same output.\nSo we find such a condition, peel those rows off, and\nrepeat on what's left. Everything peels away → OK;\nstuck → LIE.",
          "답은 OK 나 LIE 예요 — 그런 프로그램을 만들 수 있는지예요.\n'변수=값' 을 거는 if 문은, 그 조건에 맞는 남은 줄의\n출력이 전부 같을 때만 쓸 수 있어요.\n그래서 그런 조건을 찾아 그 줄들을 떼어내고, 남은 줄로\n다시 찾기를 되풀이해요. 다 떼어지면 OK, 막히면 LIE 예요."),
      ],
      pyOnly: [
        t(E, "Python's map() makes the code shorter.",
            "파이썬은 map() 덕분에 코드가 짧아져요."),
      ],
    },
  ];
}

export function RevEngProgressiveCode(props) {
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


export function downloadRevEngPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "RevEng — Full Study Guide", "RevEng — 종합 풀이 노트");
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

