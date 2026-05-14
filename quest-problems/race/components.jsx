// 🔒 USACO_VERIFIED — cpid=989, race (2020 Jan Bronze #3)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('race.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "K, N = map(int, lines[0].split())",
  "",
  "# 전략:",
  "# - 최고 속도 p 까지 가속 → 정속 cruise → X 까지 감속",
  "# - p <= X: 가속만 (끝 속도 = p, 그래도 X 이하면 OK)",
  "# - p > X: 가속 + cruise + 감속 (끝 속도 = X)",
  "# 거리 공식: base_dist(p, X) = p*p - X*(X-1)//2  (p > X 경우)",
  "# 시간 공식: base_time = 2p - X  + cruise",
  "# 최적 p 는 sqrt(K + X(X-1)/2) 근처 → 그 주변만 시도",
  "results = []",
  "for q in range(1, N + 1):",
  "    X = int(lines[q])",
  "    half = X * (X + 1) // 2  # 0+1+2+...+X",
  "    half_minus = X * (X - 1) // 2  # 0+1+...+(X-1)",
  "    # Case 1: 최고 속도 p <= X (가속만 + cruise)",
  "    # 최적은 p = X (속도 최대). 단, X(X+1)/2 >= K 면 더 작은 t 가능",
  "    if half >= K:",
  "        # 가장 작은 t 찾기: t(t+1)/2 >= K, t <= X",
  "        t = int((1 + 8 * K) ** 0.5 / 2)",
  "        while t * (t + 1) // 2 < K:",
  "            t += 1",
  "        best = t",
  "    else:",
  "        # p = X 로 가속 후 cruise",
  "        cruise = (K - half + X - 1) // X  # ceiling",
  "        best = X + cruise",
  "    # Case 2: p > X (가속 + cruise + 감속)",
  "    opt = int((K + half_minus) ** 0.5)",
  "    for p in range(max(X + 1, opt - 10), opt + 11):",
  "        base_dist = p * p - half_minus",
  "        if base_dist >= K:",
  "            time = 2 * p - X",
  "        else:",
  "            cruise = (K - base_dist + p - 1) // p",
  "            time = 2 * p - X + cruise",
  "        if time < best:",
  "            best = time",
  "    results.append(best)",
  "",
  "with open('race.out', 'w') as file:",
  "    for r in results:",
  "        file.write(str(r) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"race.in\");",
  "    ofstream fout(\"race.out\");",
  "",
  "    long long K, N;",
  "    fin >> K >> N;",
  "    for (long long q = 0; q < N; q++) {",
  "        long long X;",
  "        fin >> X;",
  "        // 각 peak 속도 p 마다 최소 time 계산",
  "        long long best = -1;",
  "        for (long long p = 1; p <= 50000; p++) {",
  "            long long base_dist, base_time;",
  "            if (p <= X) {",
  "                base_dist = p * (p + 1) / 2;",
  "                base_time = p;",
  "            } else {",
  "                base_dist = p * (p + 1) / 2 + (p + X - 1) * (p - X) / 2;",
  "                base_time = 2 * p - X;",
  "            }",
  "            long long time;",
  "            if (base_dist >= K) {",
  "                time = base_time;",
  "            } else {",
  "                long long need = K - base_dist;",
  "                long long k = (need + p - 1) / p;  // ceiling",
  "                time = base_time + k;",
  "            }",
  "            if (best == -1 || time < best) best = time;",
  "        }",
  "        fout << best << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getRaceSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Read the code section by section. Each line has a clear purpose.",
            "코드를 한 부분씩 읽어봐. 각 줄이 명확한 역할이 있어."),
        t(E, "C++ version is auto-translated from Python — adjust types and idioms as needed.",
            "C++ 버전은 Python에서 자동 변환 — 타입과 관용구는 필요시 조정."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python의 고수준 구문 (list, map, sorted)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "long long for distances and times — partial sums like peak*(peak+1)/2 grow fast.",
            "거리/시간은 long long — peak*(peak+1)/2 같은 부분합이 빠르게 커짐."),
        t(E, "LLONG_MAX from <climits> initializes bestT before the first comparison.",
            "<climits> 의 LLONG_MAX 로 bestT 초기화."),
      ],
    },
  ];
}

export function RaceProgressiveCode(props) {
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


export function downloadRacePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Race — Full Study Guide", "Race — 종합 풀이 노트");
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

