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
import { BRUTE_PY, BRUTE_CPP } from "./brute";
import { FAST_PY, FAST_CPP } from "./fast";

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
      { hi: [4, 6],   bubble: t(E, "What do we need to find? The best score among all boards, and how many boards reach it.\nWithout a smarter idea yet, we'll have to build every board and score it.\nFirst read N (cells) and K (moves).", "무엇을 구해야 하나요?\n가능한 보드 중 최고 점수와, 그 점수를 내는 보드 개수예요.\n더 똑똑한 방법이 아직 없으니 보드를 전부 만들어 점수를 매겨야 해요.\n먼저 N(칸 수)과 K(무브 수)를 읽어요.") },
      { hi: [8, 15],  bubble: t(E, "Scoring one move needs all three cells x, y, z.\nSo read all K moves first.\nCells are numbered from 1 in the input but from 0 in code, so subtract 1.", "무브 하나를 채점하려면 x·y·z 셋을 다 알아야 해요.\n그래서 먼저 K 개를 다 읽어 둬요.\n입력은 칸을 1번부터 세고 코드는 0번부터 세니까 1 을 빼요.") },
      { hi: [17, 21], bubble: t(E, "No smarter idea in sight, so try EVERY possible board (2^N of them).\nEach of N cells is M or O, so one bitmask spells out one whole board.\nSet up best and ways.", "더 똑똑한 방법이 안 보이니, 만들 수 있는 보드를 전부 해봐요 (2^N 개).\nN 개 칸마다 M 아니면 O 니까, 비트마스크 하나가 보드 하나예요.\nbest, ways 도 준비해요.") },
      { hi: [22, 31], bubble: t(E, "How do we score one board?\nFor each move, check by bit whether x is M and y, z are O — add 1 point if so.", "보드 하나를 어떻게 채점할까요?\n무브마다 x 가 M 이고 y·z 가 O 인지 비트로 확인해서, 맞으면 1점씩 더해요.") },
      { hi: [33, 38], bubble: t(E, "This board has a score. Compare it with the best so far.\nHigher → new best. Same → one more board reaches it.", "이 보드의 점수가 나왔어요. 지금까지 최고 점수와 견줘요.\n더 높으면 새 최고로 바꾸고, 같으면 보드 수를 하나 늘려요.") },
      { hi: [41, 41], bubble: t(E, "Every board has been checked. Print the best score and how many boards reach it.", "보드를 다 봤어요. 최고 점수와 그 보드 수를 출력해요.") },
    ] };
  }
  return { code: FULL_PY, vars: _MH_VARS, beats: [
    { hi: [3, 3],   bubble: t(E, "What do we need to find? The best score among all boards, and how many boards reach it.\nWithout a smarter idea yet, we'll have to build every board and score it.\nFirst read N (cells) and K (moves).", "무엇을 구해야 하나요?\n가능한 보드 중 최고 점수와, 그 점수를 내는 보드 개수예요.\n더 똑똑한 방법이 아직 없으니 보드를 전부 만들어 점수를 매겨야 해요.\n먼저 N(칸 수)과 K(무브 수)를 읽어요.") },
    { hi: [5, 9],   bubble: t(E, "Scoring one move needs all three cells x, y, z.\nSo read all K moves first into a list.\nCells are numbered from 1 in the input but from 0 in code, so subtract 1.", "무브 하나를 채점하려면 x·y·z 셋을 다 알아야 해요.\n그래서 먼저 K 개를 목록 하나에 다 읽어 둬요.\n입력은 칸을 1번부터 세고 코드는 0번부터 세니까 1 을 빼요.") },
    { hi: [11, 15], bubble: t(E, "No smarter idea in sight, so try EVERY possible board (2^N of them).\nEach of N cells is M or O, so one bitmask spells out one whole board.\nSet up best and ways.", "더 똑똑한 방법이 안 보이니, 만들 수 있는 보드를 전부 해봐요 (2^N 개).\nN 개 칸마다 M 아니면 O 니까, 비트마스크 하나가 보드 하나예요.\nbest, ways 도 준비해요.") },
    { hi: [16, 19], bubble: t(E, "How do we score one board?\nFor each move, check by bit whether x is M and y, z are O — add 1 point if so.", "보드 하나를 어떻게 채점할까요?\n무브마다 x 가 M 이고 y·z 가 O 인지 비트로 확인해서, 맞으면 1점씩 더해요.") },
    { hi: [21, 25], bubble: t(E, "This board has a score. Compare it with the best so far.\nHigher → new best. Same → one more board reaches it.", "이 보드의 점수가 나왔어요. 지금까지 최고 점수와 견줘요.\n더 높으면 새 최고로 바꾸고, 같으면 보드 수를 하나 늘려요.") },
    { hi: [27, 27], bubble: t(E, "Every board has been checked. Print the best score and how many boards reach it.", "보드를 다 봤어요. 최고 점수와 그 보드 수를 출력해요.") },
  ] };
}

export function getMooHuntSections(E) {
  /* ⚠️ 이건 **PDF 내려받기에만** 쓰인다 (MooHuntApp.jsx:121).
     화면 CodeWalk 은 첫 코드 = getMooHuntBruteWalk (brute.jsx),
                      최종 코드 = getMooHuntFastWalk (fast.jsx).
     둘을 따로 두면 **PDF 가 화면과 다른 코드를 준다** — 실제로 그랬다
     (2026-09-21: PDF 가 화면에서 이미 걷어낸 비트마스크를, 그것도 컴파일 안 되는
     조각으로 주고 있었다). 그래서 여기도 **같은 두 배열을 `.slice()` 로만** 잘라 쓴다.
     BRUTE_PY/BRUTE_CPP·FAST_PY/FAST_CPP 를 다시 타이핑하지 않는다 — 줄이 조용히
     사라질 수 없게. 🔒 FULL_PY/FULL_CPP(비트마스크, USACO_VERIFIED)는 이제 이 PDF가
     안 쓴다 — 화면이 2026-09-12 에 비트를 걷어냈기 때문이다. 한 글자도 안 건드렸다. */
  const F = "#059669"; // fast(더 빠른 풀이) 계열 색 — chapters.jsx 의 CodeWalk accent 와 동일
  return [
    // ── 1부 — 첫 코드: 비트 없는 완전탐색 (brute.jsx) ─────────────────────
    {
      label: t(E, "🐢 1️⃣ First code — read the moves", "🐢 1️⃣ 첫 코드 — 무브 읽기"),
      color: A,
      py: BRUTE_PY.slice(0, 10), cpp: BRUTE_CPP.slice(0, 16),
      why: [
        t(E, "What do we need to find? The best score, and how many boards reach it.\nWe don't have a fast trick yet, so we'll just build every board there is.\nStart by reading N (cells), K (moves), then the K moves — subtract 1 since code counts from 0.",
            "무엇을 구해야 하나요?\n최고 점수와, 그 점수를 내는 보드 개수예요.\n아직 빠른 방법을 모르니 만들 수 있는 보드를 전부 만들어 봐요.\n먼저 N·K 와 무브 K 개를 읽어요 — 코드는 0번부터 세니까 1 을 빼요."),
      ],
    },
    {
      label: t(E, "🐢 2️⃣ Score every board", "🐢 2️⃣ 보드를 하나씩 채점"),
      color: "#ea580c",
      py: BRUTE_PY.slice(10, 29), cpp: BRUTE_CPP.slice(16, 38),
      why: [
        t(E, "The board is just a list: 1 means M, 0 means O. Start from all O.\nScores are never negative, so 0 is a safe starting best.",
            "보드는 그냥 리스트예요 — 1 이면 M, 0 이면 O. 전부 O 에서 시작해요.\n점수는 0 보다 작을 수 없으니 best 를 0 에서 시작해도 돼요."),
        t(E, "Score this board: a move scores when x reads M and y, z read O. Walk all K of them.\nThen keep the best score, and how many boards reach it.",
            "이 보드를 채점해요. x 자리가 M, y·z 자리가 O 면 1점 — 무브 K 개를 다 훑어요.\n그리고 최고 점수와, 그 점수에 이르는 보드 개수를 남겨요."),
      ],
    },
    {
      label: t(E, "🐢 3️⃣ Next board, then print", "🐢 3️⃣ 다음 보드로, 그리고 출력"),
      color: "#b45309",
      py: BRUTE_PY.slice(29), cpp: BRUTE_CPP.slice(38),
      why: [
        t(E, "Move to the next board — adding 1, with cell 1 as the ones place.\nOnce every board has been tried, print the best score and how many boards reach it.",
            "다음 보드로 넘어가요 — 1번 칸을 일의 자리로 보고 1 을 더해요.\n보드를 다 봤으면 최고 점수와 그 보드 수를 출력해요."),
        t(E, "This works, but it tries every one of the 2^N boards and rescans all K moves each time — too slow for large N. The next code fixes that.",
            "이 코드는 맞지만 2^N 개 보드를 다 만들고 그때마다 무브 K 개를 다시 훑어요 — N 이 크면 너무 느려요. 다음 코드에서 이걸 고쳐요."),
      ],
    },
    // ── 2부 — 더 빠른 풀이: 표를 미리 만들어 두기 (fast.jsx) ──────────────
    {
      label: t(E, "🚀 4️⃣ Faster code — count moves once", "🚀 4️⃣ 더 빠른 코드 — 무브를 미리 세어 두기"),
      color: F,
      py: FAST_PY.slice(0, 15), cpp: FAST_CPP.slice(0, 20),
      why: [
        t(E, "Re-reading all K moves for every board is too slow.\nThe moves never change, so count them once, right here.\nThe key is (M cell, smaller O cell, larger O cell) — y and z only need to both be O, so order doesn't matter.",
            "보드마다 무브 K 개를 다시 훑으면 너무 느려요.\n무브는 바뀌지 않으니 여기서 한 번만 세어 둬요.\n열쇠는 (M 자리, 작은 O 자리, 큰 O 자리) 예요 — y·z 는 둘 다 O 면 되니 순서는 상관없어요."),
      ],
    },
    {
      label: t(E, "🚀 5️⃣ Split each board into M / O", "🚀 5️⃣ 보드를 M / O 로 가르기"),
      color: "#0d9488",
      py: FAST_PY.slice(15, 31), cpp: FAST_CPP.slice(20, 37),
      why: [
        t(E, "Each cell is either M or O, so a board is just 0s and 1s — start from all O.\nTo score it we first need to know which cells are M and which are O.",
            "칸마다 M 아니면 O 니까, 보드는 0 과 1 로 적으면 돼요 — 전부 O 에서 시작해요.\n점수를 내려면 먼저 어느 칸이 M 이고 어느 칸이 O 인지 갈라 놔야 해요."),
      ],
    },
    {
      label: t(E, "🚀 6️⃣ Look up the score, then finish", "🚀 6️⃣ 표에서 점수를 꺼내고 마무리"),
      color: "#047857",
      py: FAST_PY.slice(31), cpp: FAST_CPP.slice(37),
      why: [
        t(E, "Only 'one M cell + two O cells' can ever score — so ask the table for exactly those combinations instead of walking every move again.",
            "'M 한 자리 + O 두 자리' 조합만 득점할 수 있어요 — 그러니 무브를 다시 훑지 않고 그 조합만 표에서 꺼내요."),
        t(E, "Keep the best score and how many boards reach it, then move to the next board the same way as before, and print the answer when every board has been seen.",
            "최고 점수와 그 보드 수를 남기고, 앞서와 같은 방법으로 다음 보드로 넘어가요. 보드를 다 봤으면 답을 출력해요."),
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
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef2f2; border: 1px solid #dc2626; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #7f1d1d; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 고르세요.")}</div>
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
