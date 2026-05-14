// 🔒 USACO_VERIFIED — cpid=832, milkorder (2018 Open Bronze #2, Milk Order)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('milkorder.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N, M, K = map(int, lines[0].split())",
  "hier = list(map(int, lines[1].split()))",
  "",
  "# K 고정 위치: cow -> position",
  "fixed_cow_to_pos = {}",
  "for k in range(K):",
  "    parts = lines[2 + k].split()",
  "    c = int(parts[0])",
  "    p = int(parts[1])",
  "    fixed_cow_to_pos[c] = p",
  "",
  "# 각 p (1..N) 에 대해 cow 1 이 거기 갈 수 있는지 검사",
  "# 1) 고정 위치 + cow 1 at p 로 position 배열 만듦",
  "# 2) hierarchy 를 순서대로 placement: 고정이면 그 위치 사용, 아니면 next 이후 가능한 위치 찾기",
  "answer = N",
  "for p in range(1, N + 1):",
  "    # cow 1 의 고정 위치가 있다면 그것과 일치해야 함",
  "    if 1 in fixed_cow_to_pos and fixed_cow_to_pos[1] != p:",
  "        continue",
  "    # pos_to_cow[q] = q 위치에 있는 cow (없으면 0)",
  "    pos_to_cow = [0] * (N + 2)",
  "    conflict = False",
  "    for c in fixed_cow_to_pos:",
  "        q = fixed_cow_to_pos[c]",
  "        if pos_to_cow[q] != 0 and pos_to_cow[q] != c:",
  "            conflict = True",
  "            break",
  "        pos_to_cow[q] = c",
  "    if conflict:",
  "        continue",
  "    if pos_to_cow[p] != 0 and pos_to_cow[p] != 1:",
  "        continue",
  "    pos_to_cow[p] = 1",
  "    # hierarchy 순서대로 placement",
  "    nxt = 1  # 다음 후보 위치",
  "    ok = True",
  "    for i in range(M):",
  "        h = hier[i]",
  "        # h 의 위치를 결정",
  "        if h in fixed_cow_to_pos:",
  "            q = fixed_cow_to_pos[h]",
  "            if q < nxt:",
  "                ok = False",
  "                break",
  "            nxt = q + 1",
  "        elif h == 1:",
  "            q = p",
  "            if q < nxt:",
  "                ok = False",
  "                break",
  "            nxt = q + 1",
  "        else:",
  "            # nxt 이후 비어있는 위치 찾기",
  "            found = False",
  "            q = nxt",
  "            while q <= N:",
  "                if pos_to_cow[q] == 0:",
  "                    pos_to_cow[q] = h",
  "                    nxt = q + 1",
  "                    found = True",
  "                    break",
  "                q += 1",
  "            if not found:",
  "                ok = False",
  "                break",
  "    if ok:",
  "        if p < answer:",
  "            answer = p",
  "            break  # smaller p means we're done",
  "",
  "with open('milkorder.out', 'w') as file:",
  "    file.write(str(answer) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"milkorder.in\");",
  "    ofstream fout(\"milkorder.out\");",
  "",
  "    int N, M, K;",
  "    fin >> N >> M >> K;",
  "    vector<int> hier(M);",
  "    for (int i = 0; i < M; i++) fin >> hier[i];",
  "    map<int, int> fixed_cow_to_pos;",
  "    for (int i = 0; i < K; i++) {",
  "        int c, p;",
  "        fin >> c >> p;",
  "        fixed_cow_to_pos[c] = p;",
  "    }",
  "    // 각 p 에 대해 cow 1 이 p 에 갈 수 있는지 검사",
  "    int answer = N;",
  "    for (int p = 1; p <= N; p++) {",
  "        if (fixed_cow_to_pos.count(1) && fixed_cow_to_pos[1] != p) continue;",
  "        vector<int> pos_to_cow(N + 2, 0);",
  "        bool conflict = false;",
  "        for (auto& kv : fixed_cow_to_pos) {",
  "            int q = kv.second;",
  "            int c = kv.first;",
  "            if (pos_to_cow[q] != 0 && pos_to_cow[q] != c) { conflict = true; break; }",
  "            pos_to_cow[q] = c;",
  "        }",
  "        if (conflict) continue;",
  "        if (pos_to_cow[p] != 0 && pos_to_cow[p] != 1) continue;",
  "        pos_to_cow[p] = 1;",
  "        // hierarchy 순서대로 placement",
  "        int nxt = 1;",
  "        bool ok = true;",
  "        for (int i = 0; i < M; i++) {",
  "            int h = hier[i];",
  "            int q;",
  "            if (fixed_cow_to_pos.count(h)) {",
  "                q = fixed_cow_to_pos[h];",
  "                if (q < nxt) { ok = false; break; }",
  "                nxt = q + 1;",
  "            } else if (h == 1) {",
  "                q = p;",
  "                if (q < nxt) { ok = false; break; }",
  "                nxt = q + 1;",
  "            } else {",
  "                bool found = false;",
  "                for (int qq = nxt; qq <= N; qq++) {",
  "                    if (pos_to_cow[qq] == 0) {",
  "                        pos_to_cow[qq] = h;",
  "                        nxt = qq + 1;",
  "                        found = true;",
  "                        break;",
  "                    }",
  "                }",
  "                if (!found) { ok = false; break; }",
  "            }",
  "        }",
  "        if (ok) {",
  "            if (p < answer) answer = p;",
  "            break;",
  "        }",
  "    }",
  "    fout << answer << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMilkOrderSections(E) {
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
        t(E, "map<int,int> for cow -> fixed position lookup — .count(key) checks existence.",
            "map<int,int> 로 소 -> 고정 위치 조회 — .count(key) 로 존재 확인."),
        t(E, "Brute force over every starting position — N, M ≤ 100 so plain int loops are plenty.",
            "모든 시작 위치를 완전 탐색 — N, M ≤ 100 이라 평범한 int 루프로 충분."),
      ],
    },
  ];
}

export function MilkOrderProgressiveCode(props) {
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


export function downloadMilkOrderPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MilkOrder — Full Study Guide", "MilkOrder — 종합 풀이 노트");
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

