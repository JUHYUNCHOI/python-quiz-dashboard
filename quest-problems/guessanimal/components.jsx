// 🔒 USACO_VERIFIED — cpid=893, guessanimal (2019 Jan Bronze #3)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('guess.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "animals = []  # 각 동물의 특성 set",
  "idx = 1",
  "for i in range(N):",
  "    # name K trait1 trait2 ... traitK (한 줄)",
  "    parts = lines[idx].split()",
  "    K = int(parts[1])",
  "    traits = set()",
  "    for k in range(K):",
  "        traits.add(parts[2 + k])",
  "    animals.append(traits)",
  "    idx += 1",
  "",
  "# 두 동물에 대해 공통 특성 수 + 1 (한 개 차이 나는 질문)",
  "best = 0",
  "for i in range(N):",
  "    for j in range(i + 1, N):",
  "        shared = 0",
  "        for trait in animals[i]:",
  "            if trait in animals[j]:",
  "                shared += 1",
  "        candidate = shared + 1",
  "        if candidate > best:",
  "            best = candidate",
  "",
  "with open('guess.out', 'w') as file:",
  "    file.write(str(best) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "#include <set>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"guess.in\");",
  "    ofstream fout(\"guess.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<set<string>> animals(N);",
  "    for (int i = 0; i < N; i++) {",
  "        string name;",
  "        int K;",
  "        fin >> name >> K;",
  "        for (int k = 0; k < K; k++) {",
  "            string trait;",
  "            fin >> trait;",
  "            animals[i].insert(trait);",
  "        }",
  "    }",
  "    // 두 동물에 대해 공통 특성 수 + 1",
  "    int best = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        for (int j = i + 1; j < N; j++) {",
  "            int shared = 0;",
  "            for (const string& trait : animals[i]) {",
  "                if (animals[j].count(trait)) {",
  "                    shared++;",
  "                }",
  "            }",
  "            int candidate = shared + 1;",
  "            if (candidate > best) {",
  "                best = candidate;",
  "            }",
  "        }",
  "    }",
  "    fout << best << \"\\n\";",
  "    return 0;",
  "}",
];

export function getGuessAnimalSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we print? The most 'yes' answers Bessie could give before you must know the animal. So first read each animal's trait set.",
            "무엇을 출력해야 하나요? 동물을 확실히 알기 전까지 나올 수 있는 최대 '예' 답변 수예요.\n그러니 먼저 동물마다 특성 집합을 읽어요."),
        t(E, "Two animals only stay confused as long as their traits overlap — so the worst case is the largest shared-trait count between any two animals.",
            "두 동물은 특성이 겹치는 동안만 구분이 안 돼요.\n그러니 최악의 경우는 어떤 두 동물 사이의 공통 특성 수 중 가장 큰 값이에요."),
        t(E, "So for every pair, count shared traits and add 1 for the question that finally tells them apart — then keep the largest.",
            "그래서 모든 동물 쌍의 공통 특성 수를 세고, 마지막에 구별해 주는 질문 1 개를 더해요.\n그중 가장 큰 값을 답으로 남겨요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "vector<set<string>> stores each animal's traits as a set.",
            "vector<set<string>> 로 동물마다 특성을 set 에 담아요."),
        t(E, "Nested for-loops compare every pair of animals.",
            "for 문을 두 겹으로 써서 모든 동물 쌍을 비교해요."),
      ],
    },
  ];
}

export function GuessAnimalProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}

/* ── CodeWalk (선생님 2026-07-14: "앞으로 코드는 모두 이런식으로") ──
   FULL_PY / FULL_CPP 는 위에서 한 글자도 안 바뀐다 — beats 는 그 배열의
   줄 번호(hi:[lo,hi], 0-based, 양끝 포함)만 가리킨다. */
export function getGuessAnimalWalk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: [
        { v: "best", ko: "지금까지 최댓값(정답 후보)", en: "best answer so far" },
        { v: "shared", ko: "두 동물이 공유하는 특성 수", en: "traits shared between two animals" },
        { v: "candidate", ko: "이 쌍에서 나올 수 있는 '예' 횟수", en: "yes-count for this pair" },
      ],
      beats: [
        { hi: [0, 13], bubble: t(E,
          "What should we print? The most 'yes' answers Bessie could give before you must know the animal.\nRead the animal count N from the file.",
          "무엇을 출력해야 하나요? 동물을 확실히 알기 전까지 나올 수 있는 최대 '예' 답변 수예요.\n파일에서 동물 수 N을 읽어요.") },
        { hi: [14, 24], bubble: t(E,
          "To compare animals later we need to count overlapping traits, so store each animal's traits as a set.",
          "나중에 동물끼리 겹치는 특성을 세려면 집합(set)에 담아 둬야 쉬워요.\nvector<set<string>>에 이름 뒤 특성들을 담아요.") },
        { hi: [25, 29], bubble: t(E,
          "Two animals only stay confused as long as their traits overlap. So check every pair, and start counting the traits they share.",
          "두 동물은 특성이 겹치는 동안만 구분이 안 돼요.\n그러니 모든 두 동물 쌍마다 공통 특성 수를 세어봐요.") },
        { hi: [30, 34], bubble: t(E,
          "Walk animal i's traits and count how many also appear in animal j's set.",
          "동물 i의 특성을 하나씩 보면서, 동물 j의 집합에도 있으면 shared를 늘려요.") },
        { hi: [35, 38], bubble: t(E,
          "Add 1 for the question that finally tells them apart, then keep the largest candidate seen so far.",
          "마지막으로 구별해 주는 질문 1개를 더한 값이 candidate예요.\n지금까지의 최댓값 best와 비교해 더 크면 갱신해요.") },
        { hi: [41, 43], bubble: t(E,
          "Write the answer to the output file.",
          "답을 출력 파일에 써요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: [
      { v: "best", ko: "지금까지 최댓값(정답 후보)", en: "best answer so far" },
      { v: "shared", ko: "두 동물이 공유하는 특성 수", en: "traits shared between two animals" },
      { v: "candidate", ko: "이 쌍에서 나올 수 있는 '예' 횟수", en: "yes-count for this pair" },
    ],
    beats: [
      { hi: [0, 4], bubble: t(E,
        "What should we print? The most 'yes' answers Bessie could give before you must know the animal.\nRead the animal count N from the file.",
        "무엇을 출력해야 하나요? 동물을 확실히 알기 전까지 나올 수 있는 최대 '예' 답변 수예요.\n파일에서 동물 수 N을 읽어요.") },
      { hi: [5, 16], bubble: t(E,
        "To compare animals later we need to count overlapping traits, so store each animal's traits as a set — read each line's name, count K, then that many traits.",
        "나중에 동물끼리 겹치는 특성을 세려면 집합(set)에 담아 둬야 쉬워요.\n줄마다 이름과 특성 개수 K를 읽고, 특성 K개를 traits 집합에 모아요.") },
        { hi: [17, 21], bubble: t(E,
          "Two animals only stay confused as long as their traits overlap. So check every pair, and start counting the traits they share.",
          "두 동물은 특성이 겹치는 동안만 구분이 안 돼요.\n그러니 모든 두 동물 쌍마다 공통 특성 수를 세어봐요.") },
      { hi: [22, 24], bubble: t(E,
        "Walk animal i's traits and count how many also appear in animal j's set.",
        "동물 i의 특성을 하나씩 보면서, 동물 j의 집합에도 있으면 shared를 늘려요.") },
      { hi: [25, 27], bubble: t(E,
        "Add 1 for the question that finally tells them apart, then keep the largest candidate seen so far.",
        "마지막으로 구별해 주는 질문 1개를 더한 값이 candidate예요.\n지금까지의 최댓값 best와 비교해 더 크면 갱신해요.") },
      { hi: [29, 30], bubble: t(E,
        "Write the answer to the output file.",
        "답을 출력 파일에 써요.") },
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


export function downloadGuessAnimalPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "GuessAnimal — Full Study Guide", "GuessAnimal — 종합 풀이 노트");
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

