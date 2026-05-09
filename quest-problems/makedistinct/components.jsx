import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "def solve():",
  "    n, k = map(int, input().split())",
  "    a = list(map(int, input().split()))",
  "    m = abs(k)",
  "",
  "    # Group indices by residue mod |K| (a += K never changes residue)",
  "    groups = {}",
  "    for x in a:",
  "        groups.setdefault(x % m, []).append(x)",
  "",
  "    total = 0",
  "    for vals in groups.values():",
  "        # K > 0 → sort ascending; K < 0 → sort descending",
  "        vals.sort(reverse=(k < 0))",
  "        cur = vals[0]            # first slot stays put",
  "        for i in range(1, len(vals)):",
  "            # If next value already past cur, keep it; else push cur + K",
  "            if (k > 0 and vals[i] > cur) or (k < 0 and vals[i] < cur):",
  "                cur = vals[i]",
  "            else:",
  "                cur = cur + k",
  "                total += (cur - vals[i]) // k",
  "    print(total)",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    solve()",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        long long n, k; cin >> n >> k;",
  "        vector<long long> a(n);",
  "        for (auto &x : a) cin >> x;",
  "        long long m = llabs(k);",
  "",
  "        // Group by residue mod |K|",
  "        map<long long, vector<long long>> groups;",
  "        for (auto x : a) groups[((x % m) + m) % m].push_back(x);",
  "",
  "        long long total = 0;",
  "        for (auto &kv : groups) {",
  "            auto &vals = kv.second;",
  "            if (k > 0) sort(vals.begin(), vals.end());",
  "            else       sort(vals.begin(), vals.end(), greater<long long>());",
  "",
  "            long long cur = vals[0];",
  "            for (size_t i = 1; i < vals.size(); i++) {",
  "                bool past = (k > 0) ? (vals[i] > cur) : (vals[i] < cur);",
  "                if (past) cur = vals[i];",
  "                else {",
  "                    cur = cur + k;",
  "                    total += (cur - vals[i]) / k;",
  "                }",
  "            }",
  "        }",
  "        cout << total << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getMakeDistinctSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Adding K never changes residue mod |K|, so groups are independent.",
            "K 를 더해도 |K| 로 나눈 나머지는 변하지 않아 — 그래서 잔여류끼리는 서로 독립."),
        t(E, "Within a group, sort then greedy: each element either stays or jumps to the next free slot.",
            "한 그룹 안에서는 정렬 후 그리디 — 그대로 두거나 다음 빈 칸으로 한 번에 밀어요."),
        t(E, "K > 0 sort ascending; K < 0 sort descending — same logic, mirrored direction.",
            "K > 0 이면 오름차순, K < 0 이면 내림차순 — 같은 논리, 방향만 반대."),
      ],
      pyOnly: [
        t(E, "dict.setdefault makes residue grouping a one-liner.",
            "dict.setdefault 로 잔여류 묶기가 한 줄."),
        t(E, "Python big ints handle answer overflow automatically.",
            "Python 의 큰 정수로 답이 커져도 자동 처리."),
      ],
      cppOnly: [
        t(E, "long long is required — answer can exceed 2^31.",
            "답이 2^31 을 넘을 수 있어 long long 필수."),
        t(E, "((x % m) + m) % m gives a non-negative residue even for negative inputs (defensive).",
            "((x % m) + m) % m 으로 음수 입력에도 안전한 잔여류 계산 (방어용)."),
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) speeds up I/O for big T.",
            "ios::sync_with_stdio(false) + cin.tie(nullptr) 로 큰 T 에 입출력 가속."),
      ],
    },
  ];
}

export function MakeDistinctProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadMakeDistinctPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Make All Distinct — Full Study Guide", "Make All Distinct — 종합 풀이 노트");
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
