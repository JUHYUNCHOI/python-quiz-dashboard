// 🔒 USACO_VERIFIED — cpid=688, hps17 (2017 Jan Bronze #2, Hoof Paper Scissors)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('hps.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "a_list = []  # 소1 의 gesture (1/2/3)",
  "b_list = []  # 소2 의 gesture",
  "for i in range(N):",
  "    parts = lines[1 + i].split()",
  "    a_list.append(int(parts[0]))",
  "    b_list.append(int(parts[1]))",
  "",
  "# {1, 2, 3} 을 (Hoof, Paper, Scissors) 에 배정하는 6 가지 순열",
  "# 각 순열마다 cow1 이 이긴 게임 수 세기",
  "# H beats S, P beats H, S beats P → cow1 wins if (a, b) ∈ {(H,S), (P,H), (S,P)}",
  "perms = [",
  "    [1, 2, 3], [1, 3, 2], [2, 1, 3],",
  "    [2, 3, 1], [3, 1, 2], [3, 2, 1]",
  "]",
  "best = 0",
  "for perm in perms:",
  "    H = perm[0]",
  "    P = perm[1]",
  "    S = perm[2]",
  "    wins = 0",
  "    for i in range(N):",
  "        a = a_list[i]",
  "        b = b_list[i]",
  "        if a == H and b == S:",
  "            wins += 1",
  "        elif a == P and b == H:",
  "            wins += 1",
  "        elif a == S and b == P:",
  "            wins += 1",
  "    if wins > best:",
  "        best = wins",
  "",
  "with open('hps.out', 'w') as file:",
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
  "    ifstream fin(\"hps.in\");",
  "    ofstream fout(\"hps.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<int> a_list(N), b_list(N);",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> a_list[i] >> b_list[i];",
  "    }",
  "    // {1, 2, 3} → (H, P, S) 6 가지 순열",
  "    int perms[6][3] = {",
  "        {1, 2, 3}, {1, 3, 2}, {2, 1, 3},",
  "        {2, 3, 1}, {3, 1, 2}, {3, 2, 1}",
  "    };",
  "    // H beats S, P beats H, S beats P → cow1 wins (a,b) ∈ {(H,S),(P,H),(S,P)}",
  "    int best = 0;",
  "    for (int p = 0; p < 6; p++) {",
  "        int H = perms[p][0];",
  "        int P = perms[p][1];",
  "        int S = perms[p][2];",
  "        int wins = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            int a = a_list[i];",
  "            int b = b_list[i];",
  "            if (a == H && b == S) {",
  "                wins++;",
  "            }",
  "            else if (a == P && b == H) wins++;",
  "            else if (a == S && b == P) wins++;",
  "        }",
  "        if (wins > best) {",
  "            best = wins;",
  "        }",
  "    }",
  "    fout << best << \"\\n\";",
  "    return 0;",
  "}",
];

export function getHps17Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we output? Cow 1's max wins over N rounds.",
            "무엇을 내놓아야 하나요? cow 1 의 최대 승수예요."),
        t(E, "We don't know which of 1, 2, 3 is H, P, S — only 6 assignments exist.",
            "1, 2, 3 중 뭐가 H, P, S 인지 몰라요.\n그래도 배정은 6 가지뿐이에요."),
        t(E, "So try all 6, count cow 1's wins each time, and keep the biggest.",
            "그래서 6 가지를 다 해 보고,\n매번 cow 1 이 이긴 수를 세서 가장 큰 값을 남겨요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더(<iostream>, <vector>, ...)만 적으면 코드가 무엇을 쓰는지 한눈에 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function Hps17ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). FULL_PY / FULL_CPP 는 🔒 USACO_VERIFIED 풀이의 표시용 배열이다 — 내용은
   절대 바꾸지 않고, 그대로 가져와 beats(설명 말풍선)만 덧붙인다. ── */
export function getHps17Walk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: [
        { v: "H/P/S", ko: "이번 순열에서 1·2·3 이 뭔지", en: "what 1/2/3 mean under this permutation" },
        { v: "best", ko: "지금까지 가장 큰 승수", en: "biggest win count so far" },
      ],
      beats: [
        { hi: [0, 15], bubble: t(E,
          "What do we need to find? Cow 1's max wins over N rounds — but we don't know which of 1, 2, 3 is Hoof, Paper, Scissors. Older contests use file I/O, so read hps.in.",
          "무엇을 찾아야 하나요? N 라운드에서 cow 1 의 최대 승수예요 — 그런데 1, 2, 3 중\n뭐가 Hoof·Paper·Scissors 인지 몰라요. 이전 대회는 파일 입출력을 쓰니\nhps.in 에서 N 과 라운드들을 읽어요.") },
        { hi: [16, 21], bubble: t(E,
          "Only 6 ways exist to assign {1,2,3} to (H,P,S). List them, and remember the win rule: H beats S, P beats H, S beats P.",
          "{1,2,3} 을 (H,P,S) 에 배정하는 방법은 6가지뿐이에요. 그 6가지를 다 적어 둬요.\n이기는 규칙도 기억해요 — H 는 S 를, P 는 H 를, S 는 P 를 이겨요.") },
        { hi: [22, 26], bubble: t(E,
          "Try each of the 6 permutations in turn. Pull out what H, P, S mean under this one.",
          "6 가지 순열을 하나씩 시도해요. 이번 순열에서 H, P, S 가 각각 뭔지 꺼내요.") },
        { hi: [27, 36], bubble: t(E,
          "For every round, compare cow 1's move (a) with cow 2's (b) — if it matches one of the three winning pairs, count a win.",
          "라운드마다 cow 1 의 손(a)과 cow 2 의 손(b)을 비교해요.\n셋 중 하나의 이기는 조합과 같으면 승리를 세어요.") },
        { hi: [37, 40], bubble: t(E,
          "If this permutation's win count beats the best so far, remember it.",
          "이번 순열의 승수가 지금까지 최댓값보다 크면 갱신해요.") },
        { hi: [41, 43], bubble: t(E,
          "Once all 6 permutations are tried, write the best count to hps.out.",
          "6 가지를 다 해 봤으면 최댓값을 hps.out 에 써요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: [
      { v: "H/P/S", ko: "이번 순열에서 1·2·3 이 뭔지", en: "what 1/2/3 mean under this permutation" },
      { v: "best", ko: "지금까지 가장 큰 승수", en: "biggest win count so far" },
    ],
    beats: [
      { hi: [0, 10], bubble: t(E,
        "What do we need to find? Cow 1's max wins over N rounds — but we don't know which of 1, 2, 3 is Hoof, Paper, Scissors. Older contests use file I/O, so read hps.in.",
        "무엇을 찾아야 하나요? N 라운드에서 cow 1 의 최대 승수예요 — 그런데 1, 2, 3 중\n뭐가 Hoof·Paper·Scissors 인지 몰라요. 이전 대회는 파일 입출력을 쓰니\nhps.in 에서 N 과 라운드들을 읽어요.") },
      { hi: [12, 18], bubble: t(E,
        "Only 6 ways exist to assign {1,2,3} to (H,P,S). List them, and remember the win rule: H beats S, P beats H, S beats P.",
        "{1,2,3} 을 (H,P,S) 에 배정하는 방법은 6가지뿐이에요. 그 6가지를 다 적어 둬요.\n이기는 규칙도 기억해요 — H 는 S 를, P 는 H 를, S 는 P 를 이겨요.") },
      { hi: [19, 23], bubble: t(E,
        "Try each of the 6 permutations in turn. Pull out what H, P, S mean under this one.",
        "6 가지 순열을 하나씩 시도해요. 이번 순열에서 H, P, S 가 각각 뭔지 꺼내요.") },
      { hi: [24, 33], bubble: t(E,
        "For every round, compare cow 1's move (a) with cow 2's (b) — if it matches one of the three winning pairs, count a win.",
        "라운드마다 cow 1 의 손(a)과 cow 2 의 손(b)을 비교해요.\n셋 중 하나의 이기는 조합과 같으면 승리를 세어요.") },
      { hi: [34, 35], bubble: t(E,
        "If this permutation's win count beats the best so far, remember it.",
        "이번 순열의 승수가 지금까지 최댓값보다 크면 갱신해요.") },
      { hi: [37, 38], bubble: t(E,
        "Once all 6 permutations are tried, write the best count to hps.out.",
        "6 가지를 다 해 봤으면 최댓값을 hps.out 에 써요.") },
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


export function downloadHps17PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Hps17 — Full Study Guide", "Hps17 — 종합 풀이 노트");
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

