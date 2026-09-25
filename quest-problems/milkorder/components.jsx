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
  "    for (int i = 0; i < M; i++) {",
  "        fin >> hier[i];",
  "    }",
  "    map<int, int> fixed_cow_to_pos;",
  "    for (int i = 0; i < K; i++) {",
  "        int c, p;",
  "        fin >> c >> p;",
  "        fixed_cow_to_pos[c] = p;",
  "    }",
  "    // 각 p 에 대해 cow 1 이 p 에 갈 수 있는지 검사",
  "    int answer = N;",
  "    for (int p = 1; p <= N; p++) {",
  "        if (fixed_cow_to_pos.count(1) && fixed_cow_to_pos[1] != p) {",
  "            continue;",
  "        }",
  "        vector<int> pos_to_cow(N + 2, 0);",
  "        bool conflict = false;",
  "        for (auto& kv : fixed_cow_to_pos) {",
  "            int q = kv.second;",
  "            int c = kv.first;",
  "            if (pos_to_cow[q] != 0 && pos_to_cow[q] != c) {",
  "                conflict = true;",
  "                break;",
  "            }",
  "            pos_to_cow[q] = c;",
  "        }",
  "        if (conflict) {",
  "            continue;",
  "        }",
  "        if (pos_to_cow[p] != 0 && pos_to_cow[p] != 1) {",
  "            continue;",
  "        }",
  "        pos_to_cow[p] = 1;",
  "        // hierarchy 순서대로 placement",
  "        int nxt = 1;",
  "        bool ok = true;",
  "        for (int i = 0; i < M; i++) {",
  "            int h = hier[i];",
  "            int q;",
  "            if (fixed_cow_to_pos.count(h)) {",
  "                q = fixed_cow_to_pos[h];",
  "                if (q < nxt) {",
  "                    ok = false;",
  "                    break;",
  "                }",
  "                nxt = q + 1;",
  "            } else if (h == 1) {",
  "                q = p;",
  "                if (q < nxt) {",
  "                    ok = false;",
  "                    break;",
  "                }",
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
  "                if (!found) {",
  "                    ok = false;",
  "                    break;",
  "                }",
  "            }",
  "        }",
  "        if (ok) {",
  "            if (p < answer) {",
  "                answer = p;",
  "            }",
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
        t(E,
          "What should we print? The earliest position cow 1 can take.\nA position must satisfy both the fixed spots and the hierarchy order.\nSo try p = 1, 2, 3, ... in order — place the fixed cows, then lay\nout the hierarchy from the front, and stop at the first p that works.",
          "무엇을 출력해야 하나요? 1번 소가 설 수 있는 가장 이른 자리예요.\n한 자리가 되려면 고정 위치와 순서 규칙을 둘 다 만족해야 해요.\n그래서 p 를 1부터 차례로 시도해요 — 고정 위치를 먼저 놓고,\n순서 규칙대로 소들을 앞에서부터 채워 처음 맞는 p 에서 멈춰요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map) make algorithms concise.",
            "Python 의 list, map 덕분에 알고리즘이 짧아져요."),
      ],
      cppOnly: [
        t(E, "map<int,int> for cow -> fixed position lookup — .count(key) checks existence.",
            "map<int,int> 로 소의 고정 위치를 찾아요 — .count(key) 로 있는지 확인해요."),
        t(E, "Brute force over every starting position — N, M ≤ 100 so plain int loops are plenty.",
            "모든 시작 위치를 완전 탐색해요 — N, M ≤ 100 이라 보통 int 반복문으로 충분해요."),
      ],
    },
  ];
}

export function MilkOrderProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 🔒 USACO_VERIFIED 최적화 풀이 배열이다 — 절대 안 바꾸고
   beats(설명 말풍선)만 덧붙인다. getMilkOrderSections() 는 PDF 다운로드가 계속 쓰므로 그대로 둔다. ── */
export function getMilkOrderWalk(E, lang = "py") {
  const vars = [
    { v: "fixed_cow_to_pos", ko: "소 번호 → 고정 자리", en: "cow number → its fixed slot" },
    { v: "pos_to_cow", ko: "이번 p 후보에서, 각 자리에 있는 소", en: "for this candidate p, which cow sits at each slot" },
    { v: "nxt", ko: "다음에 놓을 수 있는 가장 앞자리", en: "the earliest slot still free to place a cow" },
  ];
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars,
      beats: [
        { hi: [0, 16], bubble: t(E,
          "What do we need to know first? The hierarchy order and the fixed spots. So read N, M, K and the hierarchy list hier.",
          "무엇을 먼저 알아야 하나요? 소들의 순서(hier)와 고정 자리들이에요. 그래서 N, M, K 와 순서 목록 hier 를 읽어요.") },
        { hi: [17, 22], bubble: t(E,
          "We'll need to look up a fixed spot by cow number, over and over. So store it once in a map: cow -> slot.",
          "고정 자리를 소 번호로 계속 찾아봐야 해요. 그래서 map<int,int> 에 소 번호 → 자리로 한 번 저장해 둬요.") },
        { hi: [23, 25], bubble: t(E,
          "Which is the earliest slot cow 1 can take? Try p = 1, 2, 3, ... in order — the first one that works is the answer.",
          "1번 소가 설 수 있는 가장 이른 자리는 몇 번일까요? p = 1, 2, 3, ... 순서로 시도해서, 처음 되는 자리가 답이에요.") },
        { hi: [26, 46], bubble: t(E,
          "For this p to even be possible: it must not clash with cow 1's own fixed spot, and the fixed cows must not overlap each other. If both check out, place cow 1 at p.",
          "이 p 가 되려면 — 1번 소의 고정 자리와 안 맞으면 넘어가고(continue), 고정된 소들끼리 자리가 겹쳐도(conflict) 넘어가요. 둘 다 괜찮으면 1번 소를 p 에 놓아요.") },
        { hi: [47, 82], bubble: t(E,
          "Now lay the hierarchy out from the front: a fixed cow uses its own slot, cow 1 uses p, everyone else takes the next free slot (nxt). If any slot lands before nxt, the order is broken — this p fails.",
          "이제 순서 목록(hier)을 앞에서부터 채워요 — 고정된 소면 그 자리, 1번 소면 p, 나머지는 nxt 이후 첫 빈 자리예요. 자리가 nxt 보다 앞이면 순서가 깨지니 이 p 는 실패예요.") },
        { hi: [83, 89], bubble: t(E,
          "If we made it through the whole hierarchy (ok), this p works — and since we tried p from small to large, this is already the smallest one. Stop right away.",
          "끝까지 순서대로 놓을 수 있었으면(ok) 이 p 가 답이에요 — 작은 p 부터 봤으니 더 볼 것도 없이 바로 멈춰요.") },
        { hi: [90, 92], bubble: t(E,
          "Write the answer to the output file.",
          "찾은 답을 파일에 써요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars,
    beats: [
      { hi: [0, 5], bubble: t(E,
        "What do we need to know first? The hierarchy order and the fixed spots. So read N, M, K and the hierarchy list hier. (This old-style USACO contest uses file I/O.)",
        "무엇을 먼저 알아야 하나요? 소들의 순서(hier)와 고정 자리들이에요. 그래서 N, M, K 와 순서 목록 hier 를 읽어요. (옛날 USACO 방식이라 파일에서 읽어요.)") },
      { hi: [7, 13], bubble: t(E,
        "We'll need to look up a fixed spot by cow number, over and over. So store it once in a dict: cow -> slot.",
        "고정 자리를 소 번호로 계속 찾아봐야 해요. 그래서 딕셔너리에 소 번호 → 자리로 한 번 저장해 둬요.") },
      { hi: [15, 19], bubble: t(E,
        "Which is the earliest slot cow 1 can take? Try p = 1, 2, 3, ... in order — the first one that works is the answer.",
        "1번 소가 설 수 있는 가장 이른 자리는 몇 번일까요? p = 1, 2, 3, ... 순서로 시도해서, 처음 되는 자리가 답이에요.") },
      { hi: [20, 36], bubble: t(E,
        "For this p to even be possible: it must not clash with cow 1's own fixed spot, and the fixed cows must not overlap each other. If both check out, place cow 1 at p.",
        "이 p 가 되려면 — 1번 소의 고정 자리와 안 맞으면 넘어가고(continue), 고정된 소들끼리 자리가 겹쳐도(conflict) 넘어가요. 둘 다 괜찮으면 1번 소를 p 에 놓아요.") },
      { hi: [37, 68], bubble: t(E,
        "Now lay the hierarchy out from the front: a fixed cow uses its own slot, cow 1 uses p, everyone else takes the next free slot (nxt). If any slot lands before nxt, the order is broken — this p fails.",
        "이제 순서 목록(hier)을 앞에서부터 채워요 — 고정된 소면 그 자리, 1번 소면 p, 나머지는 nxt 이후 첫 빈 자리예요. 자리가 nxt 보다 앞이면 순서가 깨지니 이 p 는 실패예요.") },
      { hi: [69, 72], bubble: t(E,
        "If we made it through the whole hierarchy (ok), this p works — and since we tried p from small to large, this is already the smallest one. Stop right away.",
        "끝까지 순서대로 놓을 수 있었으면(ok) 이 p 가 답이에요 — 작은 p 부터 봤으니 더 볼 것도 없이 바로 멈춰요.") },
      { hi: [74, 75], bubble: t(E,
        "Write the answer to the output file.",
        "찾은 답을 파일에 써요.") },
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


export function downloadMilkOrderPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
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

