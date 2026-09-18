// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 12/12 on cpid=1133
// 🔒 USACO_VERIFIED (2026-05-13) — superseded by local fix below
//   2026-06-15: 알고리즘 교체 (overcount 버그 수정). 같은 소 한 쌍이
//   풀 칸 두 개에 인접하면 우정은 1번만 — set 으로 중복 제거 + 풀 칸이
//   소 3마리 이상이면 (반대편) 자동 +1. 공식 샘플 (4 5 .../4) 로컬 일치.
//     Python: 로컬 PASS (sample → 4)
//     C++:    로컬 PASS (sample → 4)
//   ⚠️ USACO 재제출로 full-test 검증 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "N, M = map(int, input().split())",
  "grid = [input() for _ in range(N)]",
  "",
  "dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]",
  "",
  "answer = 0          # 풀 칸에 소 3마리 이상 (반대편 쌍) → 바로 +1",
  "pairs = set()       # 풀 칸에 소 정확히 2마리 → 그 소 쌍을 기록 (중복 제거)",
  "",
  "for r in range(N):",
  "    for c in range(M):",
  "        if grid[r][c] != 'G':",
  "            continue",
  "        cows = []",
  "        for dr, dc in dirs:",
  "            nr, nc = r + dr, c + dc",
  "            if 0 <= nr < N and 0 <= nc < M and grid[nr][nc] == 'C':",
  "                cows.append((nr, nc))",
  "        if len(cows) <= 1:",
  "            continue            # 소 0~1마리면 우정 불가",
  "        if len(cows) > 2:",
  "            answer += 1         # 3마리 이상이면 반대편 한 쌍 → 바로 친구",
  "        else:",
  "            a, b = sorted(cows)",
  "            pairs.add((a, b))   # 같은 쌍이 두 번 나와도 set 이 1번만",
  "",
  "print(answer + len(pairs))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <set>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M;",
  "    cin >> N >> M;",
  "    vector<string> grid(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> grid[i];",
  "    }",
  "",
  "    int dr[] = {-1, 1, 0, 0};",
  "    int dc[] = {0, 0, -1, 1};",
  "",
  "    int answer = 0;  // 풀 칸에 소 3마리+ (반대편 쌍) → 바로 +1",
  "    set<pair<pair<int,int>, pair<int,int>>> pairs;  // 소 2마리 쌍 (중복 제거)",
  "",
  "    for (int r = 0; r < N; r++) {",
  "        for (int c = 0; c < M; c++) {",
  "            if (grid[r][c] != 'G') {",
  "                continue;",
  "            }",
  "            vector<pair<int,int>> cows;",
  "            for (int k = 0; k < 4; k++) {",
  "                int nr = r + dr[k];",
  "                int nc = c + dc[k];",
  "                if (nr < 0 || nr >= N || nc < 0 || nc >= M) {",
  "                    continue;",
  "                }",
  "                if (grid[nr][nc] == 'C') {",
  "                    cows.push_back({nr, nc});",
  "                }",
  "            }",
  "            if (cows.size() <= 1) {",
  "                continue;        // 소 0~1마리 → 우정 불가",
  "            }",
  "            if (cows.size() > 2) {",
  "                answer++;                          // 3마리+ → 반대편 한 쌍",
  "            } else {",
  "                pair<int,int> a = cows[0];",
  "                pair<int,int> b = cows[1];",
  "                if (b < a) {",
  "                    pair<int,int> tmp = a;",
  "                    a = b;",
  "                    b = tmp;",
  "                }",
  "                pairs.insert({a, b});              // 같은 쌍은 1번만",
  "            }",
  "        }",
  "    }",
  "    cout << answer + (int)pairs.size() << \"\\n\";",
  "    return 0;",
  "}",
];

export function getAcowdemia3Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we need to count? Every friendship — but if the SAME two cows border two different grass cells, they still count only ONCE. So we keep cow pairs in a set to drop duplicates.",
            "무엇을 세야 하나요? 친구가 된 소 쌍의 개수예요.\n그런데 같은 두 소가 풀 칸 두 개에 나란히 붙을 수 있어요.\n그래도 친구가 되는 건 한 번뿐이라, 소 쌍을 set 에 넣어 겹치는 걸 지워요."),
        t(E, "A grass cell can touch up to 4 cows — why is 3+ special? Directions come in opposite pairs, so 3 present forces one full opposite pair. That pair can never repeat at another cell, so we add 1 for it right away, skipping the set.",
            "풀 칸은 소를 최대 4마리까지 붙일 수 있어요. 그럼 3마리 이상은 왜 특별할까요?\n방향은 위아래·양옆으로 짝을 이루니, 3마리가 있으면 그중 반드시 마주 보는 한 쌍이 생겨요.\n이 쌍은 다른 풀 칸이 다시 만들 수 없으니, set 을 거치지 않고 바로 1을 더해요."),
        t(E, "So the answer = (opposite-side count) + (number of unique 2-cow pairs).",
            "그래서 정답은 마주 본 쌍의 개수에, set 에 남은 겹치지 않는 두 소 쌍의 개수를 더한 값이에요."),
      ],
      pyOnly: [
        t(E, "A set of sorted (cow, cow) tuples removes duplicate pairs automatically.",
            "(소, 소) 를 순서대로 담은 튜플을 set 에 넣으면 겹치는 쌍이 저절로 하나만 남아요."),
      ],
      cppOnly: [
        t(E, "Split #include into specific headers (iostream, vector, string, set).",
            "#include 는 배운 헤더(iostream, vector, string, set)를 하나씩 나눠 적어요."),
        t(E, "set<pair<pair<int,int>,pair<int,int>>> stores a cow pair as ((r1,c1),(r2,c2)); sort the two so duplicates collapse.",
            "set<pair<pair<int,int>,pair<int,int>>> 로 소 쌍을 ((r1,c1),(r2,c2)) 로 담아요.\n두 소를 순서대로 넣어야 같은 쌍이 하나로 합쳐져요."),
      ],
    },
  ];
}

export function Acowdemia3ProgressiveCode(props) {
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


export function downloadAcowdemia3PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Acowdemia3 — Full Study Guide", "Acowdemia3 — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장'을 선택해요.")}</div>
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

