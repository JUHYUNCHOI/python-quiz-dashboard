// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 5/12 (TLE 6-12, brute too slow)
//   C++:    10/12 (TLE - brute)
//   2026-09-03: 코드 안 영어 주석을 한국어로 (선생님 "주석은 수정해도 돼").
//     ⚠️ 주석만 바꿨고 실행 코드는 한 글자도 안 건드림 → 샘플 "4 2" 동일 확인.
//     동작이 안 바뀌므로 USACO 재제출 불필요.
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md
//
//   ⚠️ 2026-09-04: 내가 라벨을 'Feb 2026' 으로 잘못 바꿨다가 되돌렸다. 'Jan 2026' 이 맞다.
//     usaco.org 는 이 대회를 'season26 second contest' 라고만 부르는데,
//     USACO 는 **12월이 1차**다 → 2차 = 1월. contest 1(Chip Exchange·COW Splits·Photoshoot)이
//     우리 저장소에서 Dec 2025 인 것으로 교차 확인됨. cpid 1563·1565 도 Jan 2026 으로 적혀 있다.
//   2026-09-04: 더 빠른 공식 풀이를 ./fast.jsx 에 **따로** 추가했다.
//     이 파일의 FULL_PY / FULL_CPP 는 한 글자도 안 건드렸다 → 재제출 불필요.

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, K = map(int, input().split())",
  "",
  "# 무브를 그냥 목록에 담아요. 칸 번호는 0번부터 세니까 1씩 빼요.",
  "moves = []",
  "for _ in range(K):",
  "    x, y, z = map(int, input().split())",
  "    moves.append((x - 1, y - 1, z - 1))",
  "",
  "best = 0",
  "ways = 0",
  "",
  "# 만들 수 있는 보드를 전부 해봐요. 비트가 1 이면 M, 0 이면 O 예요.",
  "for b in range(1 << N):",
  "    score = 0",
  "    for x, y, z in moves:",
  "        if (b >> x) & 1 and not (b >> y) & 1 and not (b >> z) & 1:",
  "            score += 1",
  "",
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
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K;",
  "    cin >> N >> K;",
  "",
  "    // 무브를 그냥 목록에 담아요. 칸 번호는 0번부터 세니까 1씩 빼요.",
  "    vector<int> mx(K), my(K), mz(K);",
  "    for (int i = 0; i < K; i++) {",
  "        cin >> mx[i] >> my[i] >> mz[i];",
  "        mx[i]--;",
  "        my[i]--;",
  "        mz[i]--;",
  "    }",
  "",
  "    int best = 0;",
  "    int ways = 0;",
  "",
  "    // 만들 수 있는 보드를 전부 해봐요. 비트가 1 이면 M, 0 이면 O 예요.",
  "    for (int b = 0; b < (1 << N); b++) {",
  "        int score = 0;",
  "        for (int i = 0; i < K; i++) {",
  "            bool xIsM = (b >> mx[i]) & 1;",
  "            bool yIsO = !((b >> my[i]) & 1);",
  "            bool zIsO = !((b >> mz[i]) & 1);",
  "            if (xIsM && yIsO && zIsO) {",
  "                score++;",
  "            }",
  "        }",
  "",
  "        if (score > best) {",
  "            best = score;",
  "            ways = 1;",
  "        } else if (score == best) {",
  "            ways++;",
  "        }",
  "    }",
  "",
  "    cout << best << \" \" << ways << \"\\n\";",
  "    return 0;",
  "}",
];

// CodeWalk — 코드 위 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙). 검증본 코드 그대로.
const _MH_VARS = [
  { v: "N", ko: "칸 수", en: "cells" },
  { v: "triples", ko: "무브(개수)", en: "moves (count)" },
  { v: "b", ko: "보드(비트마스크)", en: "board (bitmask)" },
  { v: "best", ko: "최고 점수", en: "best score" },
  { v: "ways", ko: "보드 수", en: "# of boards" },
];
export function getMooHuntWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _MH_VARS, beats: [
      { hi: [4, 6],   bubble: t(E, "Read N (cells) and K (moves).", "N (칸 수) 와 K (무브 수) 읽기.") },
      { hi: [8, 15],  bubble: t(E, "Read the K moves into three lists.\nCells are numbered from 1 in the input but from 0 in code, so subtract 1.", "무브 K 개를 목록 셋에 담아요.\n입력은 칸을 1번부터 세고 코드는 0번부터 세니까 1 을 빼요.") },
      { hi: [17, 21], bubble: t(E, "Start best & ways, then try EVERY board (2^N of them).", "best, ways 를 두고, 만들 수 있는 보드를 전부 해봐요 (2^N 개).") },
      { hi: [22, 31], bubble: t(E, "Score one board.\nBit 1 means M, bit 0 means O.\nA move scores when x is M and y, z are O.", "보드 하나를 채점해요.\n비트 1 은 M, 0 은 O 예요.\n무브의 x 가 M 이고 y·z 가 O 면 1 점이에요.") },
      { hi: [33, 38], bubble: t(E, "Keep the best score, and count how many boards reach it.", "최고 점수를 갱신하고, 그 점수가 되는 보드 수를 세요.") },
      { hi: [41, 41], bubble: t(E, "Print the best score and the count.", "최고 점수와 보드 수를 출력해요.") },
    ] };
  }
  return { code: FULL_PY, vars: _MH_VARS, beats: [
    { hi: [3, 3],   bubble: t(E, "Read N (cells) and K (moves).", "N (칸 수) 와 K (무브 수) 읽기.") },
    { hi: [5, 9],   bubble: t(E, "Read the K moves into a list.\nCells are numbered from 1 in the input but from 0 in code, so subtract 1.", "무브 K 개를 목록에 담아요.\n입력은 칸을 1번부터 세고 코드는 0번부터 세니까 1 을 빼요.") },
    { hi: [11, 15], bubble: t(E, "Start best & ways, then try EVERY board (2^N of them).", "best, ways 를 두고, 만들 수 있는 보드를 전부 해봐요 (2^N 개).") },
    { hi: [16, 19], bubble: t(E, "Score one board.\nBit 1 means M, bit 0 means O.\nA move scores when x is M and y, z are O.", "보드 하나를 채점해요.\n비트 1 은 M, 0 은 O 예요.\n무브의 x 가 M 이고 y·z 가 O 면 1 점이에요.") },
    { hi: [21, 25], bubble: t(E, "Keep the best score, and count how many boards reach it.", "최고 점수를 갱신하고, 그 점수가 되는 보드 수를 세요.") },
    { hi: [27, 27], bubble: t(E, "Print the best score and the count.", "최고 점수와 보드 수를 출력해요.") },
  ] };
}

export function getMooHuntSections(E) {
  /* ⚠️ 이건 **PDF 내려받기에만** 쓰인다 (MooHuntApp.jsx:121). 화면 CodeWalk 은 getMooHuntWalk 다.
     2026-09-11: 화면 코드를 usaco.org 공식 Subtask 모양으로 바꾸면서 여기도 같이 맞췄다.
     둘을 따로 두면 **PDF 가 화면과 다른 코드를 준다.** 실제로 그럴 뻔했다. */
  return [
    {
      label: t(E, "🔢 Step 1 — Read the moves", "🔢 1단계 — 무브 읽기"),
      color: A,
      py: [
        "import sys",
        "input = sys.stdin.readline",
        "",
        "N, K = map(int, input().split())",
        "",
        "moves = []",
        "for _ in range(K):",
        "    x, y, z = map(int, input().split())",
        "    moves.append((x - 1, y - 1, z - 1))",
      ],
      cpp: [
        "int N, K;",
        "cin >> N >> K;",
        "",
        "vector<int> mx(K), my(K), mz(K);",
        "for (int i = 0; i < K; i++) {",
        "    cin >> mx[i] >> my[i] >> mz[i];",
        "    mx[i]--;",
        "    my[i]--;",
        "    mz[i]--;",
        "}",
      ],
      why: [
        t(E, "Just keep the K moves as they come — no extra table.",
            "무브 K 개를 들어온 그대로 담아둬요. 따로 만들 표가 없어요."),
        t(E, "The input numbers cells from 1, but the code counts from 0, so subtract 1.",
            "입력은 칸을 1번부터 세고 코드는 0번부터 세요. 그래서 1 을 빼요."),
      ],
    },
    {
      label: t(E, "🧮 Step 2 — Try every board (bitmask)", "🧮 2단계 — 보드를 전부 해보기 (비트마스크)"),
      color: A,
      py: [
        "best = 0",
        "ways = 0",
        "",
        "for b in range(1 << N):",
        "    score = 0",
        "    for x, y, z in moves:",
        "        if (b >> x) & 1 and not (b >> y) & 1 and not (b >> z) & 1:",
        "            score += 1",
        "",
        "    if score > best:",
        "        best = score",
        "        ways = 1",
        "    elif score == best:",
        "        ways += 1",
        "",
        "print(best, ways)",
      ],
      cpp: [
        "int best = 0;",
        "int ways = 0;",
        "",
        "for (int b = 0; b < (1 << N); b++) {",
        "    int score = 0;",
        "    for (int i = 0; i < K; i++) {",
        "        bool xIsM = (b >> mx[i]) & 1;",
        "        bool yIsO = !((b >> my[i]) & 1);",
        "        bool zIsO = !((b >> mz[i]) & 1);",
        "        if (xIsM && yIsO && zIsO) {",
        "            score++;",
        "        }",
        "    }",
        "",
        "    if (score > best) {",
        "        best = score;",
        "        ways = 1;",
        "    } else if (score == best) {",
        "        ways++;",
        "    }",
        "}",
        "",
        "cout << best << \" \" << ways << \"\\n\";",
      ],
      why: [
        t(E, "Bit 1 means that cell reads M, bit 0 means O — so b is one whole board.",
            "비트 1 은 그 칸이 M, 0 은 O 예요. 그래서 b 하나가 보드 하나예요."),
        t(E, "A move scores when x is M and both y and z are O.",
            "무브는 x 가 M 이고 y·z 가 둘 다 O 일 때 1 점이에요."),
        t(E, "Keep the best score, and count how many boards reach it — the answer is both.",
            "최고 점수를 갱신하고, 그 점수가 되는 보드 수를 세요. 답이 그 둘이에요."),
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
