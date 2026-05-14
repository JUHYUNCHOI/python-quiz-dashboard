// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 5/12 (TLE 6-12, brute too slow)
//   C++:    10/12 (TLE - brute)
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const FULL_PY = [
  "from collections import Counter",
  "",
  "N, K = map(int, input().split())",
  "",
  "# Group identical moves so we don't recount duplicates.",
  "cnt = Counter()",
  "for _ in range(K):",
  "    x, y, z = map(int, input().split())",
  "    cnt[(x - 1, y - 1, z - 1)] += 1",
  "triples = list(cnt.items())",
  "",
  "best = -1",
  "ways = 0",
  "",
  "# Try every possible board: bit = 1 means M, bit = 0 means O.",
  "for b in range(1 << N):",
  "    score = 0",
  "    for (x, y, z), c in triples:",
  "        if (b >> x) & 1 and not ((b >> y) & 1) and not ((b >> z) & 1):",
  "            score += c",
  "    if score > best:",
  "        best = score",
  "        ways = 1",
  "    elif score == best:",
  "        ways += 1",
  "",
  "print(best, ways)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <map>",
  "#include <tuple>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K;",
  "    cin >> N >> K;",
  "",
  "    // Group identical moves into a count map.",
  "    map<tuple<int,int,int>, int> cnt;",
  "    for (int i = 0; i < K; i++) {",
  "        int x, y, z;",
  "        cin >> x >> y >> z;",
  "        cnt[make_tuple(x - 1, y - 1, z - 1)] += 1;",
  "    }",
  "    vector<tuple<int,int,int,int>> triples;",
  "    for (map<tuple<int,int,int>, int>::iterator it = cnt.begin(); it != cnt.end(); ++it) {",
  "        int x = get<0>(it->first);",
  "        int y = get<1>(it->first);",
  "        int z = get<2>(it->first);",
  "        triples.push_back(make_tuple(x, y, z, it->second));",
  "    }",
  "",
  "    int best = -1;",
  "    int ways = 0;",
  "    for (int b = 0; b < (1 << N); b++) {",
  "        int score = 0;",
  "        for (int i = 0; i < (int)triples.size(); i++) {",
  "            int x = get<0>(triples[i]);",
  "            int y = get<1>(triples[i]);",
  "            int z = get<2>(triples[i]);",
  "            int c = get<3>(triples[i]);",
  "            if (((b >> x) & 1) && !((b >> y) & 1) && !((b >> z) & 1)) {",
  "                score += c;",
  "            }",
  "        }",
  "        if (score > best) {",
  "            best = score;",
  "            ways = 1;",
  "        } else if (score == best) {",
  "            ways++;",
  "        }",
  "    }",
  "    cout << best << \" \" << ways << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMooHuntSections(E) {
  return [
    {
      label: t(E, "🔢 Step 1 — Read & Group Moves", "🔢 1단계 — 입력 읽고 무브 묶기"),
      color: A,
      py: [
        "from collections import Counter",
        "",
        "N, K = map(int, input().split())",
        "cnt = Counter()",
        "for _ in range(K):",
        "    x, y, z = map(int, input().split())",
        "    cnt[(x - 1, y - 1, z - 1)] += 1",
        "triples = list(cnt.items())",
      ],
      cpp: [
        "int N, K;",
        "cin >> N >> K;",
        "map<tuple<int,int,int>, int> cnt;",
        "for (int i = 0; i < K; i++) {",
        "    int x, y, z;",
        "    cin >> x >> y >> z;",
        "    cnt[make_tuple(x - 1, y - 1, z - 1)] += 1;",
        "}",
      ],
      why: [
        t(E, "K can be up to 200,000, but distinct (x,y,z) triples are at most 20*19*18 = 6840.",
            "K 는 최대 20 만, 그러나 서로 다른 (x,y,z) 조합은 20*19*18 = 6840 개뿐."),
        t(E, "Group identical moves into a count map so we evaluate each unique triple once per board.",
            "같은 무브를 묶어 카운트 — 같은 보드에서 같은 무브를 여러 번 검사하지 않기."),
        t(E, "Switch to 0-based indices for easy bitmask use later.",
            "비트마스크 사용을 위해 0-based 로 변환."),
      ],
      pyOnly: [
        t(E, "Counter from collections gives an O(1) increment with default 0.",
            "collections.Counter 로 기본값 0 짜리 카운트."),
      ],
      cppOnly: [
        t(E, "std::map<tuple<int,int,int>, int> auto-default-initializes to 0.",
            "std::map<tuple<int,int,int>, int> 은 기본 0 으로 초기화."),
      ],
    },
    {
      label: t(E, "🧮 Step 2 — Try Every Board (bitmask)", "🧮 2단계 — 모든 보드 시도 (비트마스크)"),
      color: A,
      py: [
        "best = -1",
        "ways = 0",
        "for b in range(1 << N):",
        "    score = 0",
        "    for (x, y, z), c in triples:",
        "        if (b >> x) & 1 and not ((b >> y) & 1) and not ((b >> z) & 1):",
        "            score += c",
        "    if score > best:",
        "        best = score",
        "        ways = 1",
        "    elif score == best:",
        "        ways += 1",
      ],
      cpp: [
        "int best = -1;",
        "int ways = 0;",
        "for (int b = 0; b < (1 << N); b++) {",
        "    int score = 0;",
        "    for (int i = 0; i < (int)triples.size(); i++) {",
        "        int x = get<0>(triples[i]);",
        "        int y = get<1>(triples[i]);",
        "        int z = get<2>(triples[i]);",
        "        int c = get<3>(triples[i]);",
        "        if (((b >> x) & 1) && !((b >> y) & 1) && !((b >> z) & 1)) {",
        "            score += c;",
        "        }",
        "    }",
        "    if (score > best) {",
        "        best = score;",
        "        ways = 1;",
        "    } else if (score == best) {",
        "        ways++;",
        "    }",
        "}",
      ],
      why: [
        t(E, "Each cell is either M or O — that's a binary choice, perfectly suited to a bitmask.",
            "각 칸이 M 또는 O — 이진 선택이라 비트마스크에 딱."),
        t(E, "Bit i = 1 means cell i+1 is 'M'; bit i = 0 means 'O'.",
            "비트 i = 1 은 칸 i+1 이 'M', 0 은 'O'."),
        t(E, "A move (x,y,z) scores when cell x is M and cells y, z are O — three bit checks.",
            "무브 (x,y,z) 는 x 가 M, y 와 z 가 O 일 때 득점 — 세 번의 비트 검사."),
        t(E, "N ≤ 20, so 2^N ≤ ~1,000,000 boards — feasible to brute force.",
            "N ≤ 20 이라 2^N ≤ 약 100 만 보드 — 전수 탐색 가능."),
      ],
      pyOnly: [
        t(E, "(b >> i) & 1 extracts bit i. Use 'not' to flip 0/1 truthiness for the O cells.",
            "(b >> i) & 1 로 i 번째 비트 추출. O 칸은 'not' 으로 반전."),
      ],
      cppOnly: [
        t(E, "get<0>(tup), get<1>(tup) … pull each field out of the tuple (taught in cpp-15).",
            "get<0>(tup), get<1>(tup) … 로 튜플에서 필드를 꺼내요 (cpp-15 에서 배움)."),
      ],
    },
    {
      label: t(E, "🏁 Step 3 — Print Best and Count", "🏁 3단계 — 최고 점수와 보드 수 출력"),
      color: A,
      py: ["print(best, ways)"],
      cpp: ["cout << best << \" \" << ways << \"\\n\";"],
      why: [
        t(E, "First number = the maximum score reachable. Second = how many boards reach it.",
            "첫 숫자 = 도달 가능한 최고 점수. 둘째 = 그 점수에 도달한 보드 개수."),
        t(E, "We tracked both with a simple max + tie-counter pattern in the loop.",
            "루프 안에서 max + 동점 카운터 패턴으로 동시에 추적."),
      ],
    },
  ];
}

export function MooHuntProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","tuple"];
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


export function downloadMooHuntPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Moo Hunt — Full Study Guide", "무 헌트 — 종합 풀이 노트");
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
  .hint { background: #fef2f2; border: 1px solid #dc2626; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #7f1d1d; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2026 Second Contest, Bronze #2 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
