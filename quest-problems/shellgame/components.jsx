// 🔒 USACO_VERIFIED — cpid=891, shellgame (2019 Jan Bronze #1)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('shell.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "# 각 swap: (a, b, g) — a 와 b 컵 바꾸고 g 컵 추측",
  "a_list = []",
  "b_list = []",
  "g_list = []",
  "for i in range(N):",
  "    parts = lines[1 + i].split()",
  "    a_list.append(int(parts[0]))",
  "    b_list.append(int(parts[1]))",
  "    g_list.append(int(parts[2]))",
  "",
  "# 시작 위치 1, 2, 3 다 시도해서 최대 점수 찾기",
  "best = 0",
  "for start in range(1, 4):",
  "    pos = start",
  "    score = 0",
  "    for i in range(N):",
  "        a = a_list[i]",
  "        b = b_list[i]",
  "        g = g_list[i]",
  "        if pos == a:",
  "            pos = b",
  "        elif pos == b:",
  "            pos = a",
  "        if pos == g:",
  "            score += 1",
  "    if score > best:",
  "        best = score",
  "",
  "with open('shell.out', 'w') as file:",
  "    file.write(str(best) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"shell.in\");",
  "    ofstream fout(\"shell.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<int> a_arr(N), b_arr(N), g_arr(N);",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> a_arr[i] >> b_arr[i] >> g_arr[i];",
  "    }",
  "    // 시작 위치 1, 2, 3 다 시도해서 최대 점수",
  "    int best = 0;",
  "    for (int start = 1; start <= 3; start++) {",
  "        int pos = start;",
  "        int score = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            int a = a_arr[i];",
  "            int b = b_arr[i];",
  "            int g = g_arr[i];",
  "            if (pos == a) {",
  "                pos = b;",
  "            } else if (pos == b) {",
  "                pos = a;",
  "            }",
  "            if (pos == g) {",
  "                score++;",
  "            }",
  "        }",
  "        if (score > best) {",
  "            best = score;",
  "        }",
  "    }",
  "    fout << best << \"\\n\";",
  "    return 0;",
  "}",
];

export function getShellGameSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Here, a, b, g are each stored in their own list (not tuples in a `swaps` list like before) — same job, different container.",
            "여기서는 a, b, g 를 각각 따로 리스트에 담아요(앞서 본 swaps 튜플 대신) — 하는 일은 같아요."),
        t(E, "What should we print? The best possible number of correct guesses, over all 3 choices of where the shell truly started. So first read N and the N swaps (a, b, guess).",
            "무엇을 출력해야 하나요? 조개가 실제로 어디서 시작했든, 가장 많이 맞힐 수 있는 정답 수예요.\n그러니 먼저 N 과 N 번의 (a, b, 추측) 을 읽어요."),
        t(E, "We don't know which cup is real, so try all 3 starting positions separately and replay the same swaps for each — the guesses might match a different number of times.",
            "실제 조개가 어디 있었는지 모르니, 시작 위치 1, 2, 3 을 각각 가정해요.\n같은 뒤섞기를 그대로 따라가면서 추측이 맞은 횟수를 세요."),
        t(E, "So for each start, track the shell's position through every swap, count matching guesses, and keep the best score across all 3 starts.",
            "그래서 시작마다 조개 위치를 뒤섞기 순서대로 따라가며 추측이 맞은 횟수를 세고,\n세 시작 중 가장 좋은 점수를 남겨요."),
      ],
      pyOnly: [
        t(E, "Python lists grow with .append() — no fixed size to declare upfront.",
            "파이썬 리스트는 .append() 로 늘어나요 — 크기를 미리 정하지 않아도 돼요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "헤더는 필요한 것만 적어요 (<iostream>, <vector> …). 그래야 읽기 쉬워요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "더하거나 곱한 값이 2×10^9 를 넘을 것 같으면 long long 을 써요."),
      ],
    },
  ];
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 🔒 USACO_VERIFIED 최적화 풀이의 표시용 사본이다 —
   배열 내용은 절대 바꾸지 않고, 그대로 가져와 beats(설명 말풍선)만 덧붙인다. ── */
export function getShellGameWalk(E, lang = "py") {
  const vars = [
    { v: "a_list / b_list / g_list", ko: "뒤섞기마다의 a, b, 추측", en: "each swap's a, b, guess" },
    { v: "pos", ko: "지금 조개(컵)의 위치", en: "the shell's current position" },
    { v: "score / best", ko: "이번 시작의 점수 / 지금까지 최고 점수", en: "this start's score / the best score so far" },
  ];
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars,
      beats: [
        { hi: [0, 15], bubble: t(E,
          "Same target in C++ — the same best score. So open the files and read N swaps into three parallel vectors: a_arr[i], b_arr[i], g_arr[i] are one swap.",
          "C++ 도 목표는 같아요 — 똑같이 최고 점수를 구해요.\n그러니 파일을 열고 N 번의 뒤섞기를 통 셋(a_arr, b_arr, g_arr)에 나란히 읽어요.") },
        { hi: [16, 20], bubble: t(E,
          "Try all three starting positions, resetting pos and score each time.",
          "세 시작 위치를 다 시도해요.\n시도할 때마다 pos 와 score 를 다시 시작해요.") },
        { hi: [21, 36], bubble: t(E,
          "Replay every swap: move pos if it matches one of the two cups, THEN check it against the guess. After all swaps, keep this start's score if it's the best so far.",
          "뒤섞기를 순서대로 따라가요.\npos 가 두 컵 중 하나면 옮기고, 그다음 추측과 비교해요.\n다 끝나면 이번 점수가 최고면 best 를 갱신해요.") },
        { hi: [38, 38], bubble: t(E,
          "Print the best score.",
          "최고 점수를 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars,
    beats: [
      { hi: [0, 13], bubble: t(E,
        "What are we heading toward? The best score across all 3 possible starting positions, once we replay the same swaps. First read N swaps — each one's (a, b, guess) — into three lists.",
        "무엇을 향해 가나요?\n세 시작 위치 중 같은 뒤섞기를 그대로 따라갔을 때 가장 좋은 점수예요.\n먼저 N 번의 (a, b, 추측) 을 리스트 셋에 읽어요.") },
      { hi: [15, 19], bubble: t(E,
        "We don't know which cup the shell truly started under, so try all three — start = 1, then 2, then 3 — resetting the position and score each time.",
        "조개가 실제로 어디서 시작했는지 모르니, 1·2·3 을 다 시도해요.\n시도할 때마다 위치와 점수를 다시 0 부터 시작해요.") },
      { hi: [20, 31], bubble: t(E,
        "Replay every swap in order: move pos if it's one of the two swapped cups, THEN check if pos now matches the guess. After all swaps, keep this start's score if it beats the best so far.",
        "뒤섞기를 순서대로 따라가요.\npos 가 바뀐 두 컵 중 하나면 옮기고, 그다음 pos 가 추측과 같은지 봐요.\n다 끝나면 이번 점수가 지금까지 최고보다 크면 best 를 갱신해요.") },
      { hi: [33, 34], bubble: t(E,
        "Write the best score.",
        "최고 점수를 적어요.") },
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


export function downloadShellGamePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혀 있어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "ShellGame — Full Study Guide", "ShellGame — 종합 풀이 노트");
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

