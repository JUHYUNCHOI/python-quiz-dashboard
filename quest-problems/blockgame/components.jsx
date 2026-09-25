// 🔒 USACO_VERIFIED — cpid=664, blockgame (2016 Dec Bronze #2)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('blocks.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "# 각 글자 (a-z) 마다 필요한 블록 수 계산",
  "# 어느 면이 보여도 spell 가능해야 하므로",
  "# = sum over boards of max(front_count, back_count)",
  "need = [0] * 26  # 인덱스 0 = 'a', 25 = 'z'",
  "for i in range(N):",
  "    parts = lines[1 + i].split()",
  "    front = parts[0]",
  "    back = parts[1]",
  "    for ci in range(26):",
  "        ch = chr(ord('a') + ci)",
  "        cf = 0",
  "        for ch2 in front:",
  "            if ch2 == ch:",
  "                cf += 1",
  "        cb = 0",
  "        for ch2 in back:",
  "            if ch2 == ch:",
  "                cb += 1",
  "        if cf > cb:",
  "            need[ci] += cf",
  "        else:",
  "            need[ci] += cb",
  "",
  "with open('blocks.out', 'w') as file:",
  "    for v in need:",
  "        file.write(str(v) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"blocks.in\");",
  "    ofstream fout(\"blocks.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    int need[26];",
  "    for (int i = 0; i < 26; i++) {",
  "        need[i] = 0;",
  "    }",
  "    for (int n = 0; n < N; n++) {",
  "        string a, b;",
  "        fin >> a >> b;",
  "        int ca[26], cb[26];",
  "        for (int i = 0; i < 26; i++) {",
  "            ca[i] = 0;",
  "            cb[i] = 0;",
  "        }",
  "        for (int i = 0; i < (int)a.size(); i++) {",
  "            ca[a[i] - 'a']++;",
  "        }",
  "        for (int i = 0; i < (int)b.size(); i++) {",
  "            cb[b[i] - 'a']++;",
  "        }",
  "        // 각 글자마다 max(front, back) 누적",
  "        for (int i = 0; i < 26; i++) {",
  "            int more;",
  "            if (ca[i] > cb[i]) {",
  "                more = ca[i];",
  "            } else {",
  "                more = cb[i];",
  "            }",
  "            need[i] += more;",
  "        }",
  "    }",
  "    for (int i = 0; i < 26; i++) {",
  "        fout << need[i] << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getBlockGameSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we output? The minimum cubes needed for each letter A..Z.",
            "무엇을 내놓아야 하나요? 알파벳 A~Z 마다 필요한 최소 큐브 수예요."),
        t(E, "We don't know if a board will show its front or back word.",
            "판마다 앞면과 뒷면 중 어느 쪽이 보일지 몰라요."),
        t(E, "So for each letter, each board, take max(front count, back count) and add it up.",
            "그래서 글자마다, 판마다 앞면·뒷면 개수 중 큰 쪽을 더해요.\n어느 쪽이 보여도 부족하지 않게요."),
      ],
      pyOnly: [],
      cppOnly: [
        /* ⚠️ 2026-09-25: 이 두 줄이 **코드에 없는 것**을 설명하고 있었다 —
           헤더로 `map`·`algorithm` 을 적어 뒀는데 🔒 `FULL_CPP` 가 넣는 건
           `iostream`·`fstream`·`string` 뿐이고, `map<char,int>` 는 **0번**이다.
           실제로는 `int need[26]` 과 `a[i] - 'a'` 로 센다. */
        t(E, "Split #include into just the headers this code needs — iostream, fstream, string.",
            "#include 는 이 코드가 쓰는 것만 나눠 적어요 (iostream, fstream, string)."),
        t(E, "26 counters, one per letter — subtracting 'a' turns a letter into its slot number.",
            "글자마다 칸 하나인 통 26개를 써요.\n글자에서 'a' 를 빼면 a→0, b→1 처럼 번호가 돼요."),
      ],
    },
  ];
}

export function BlockGameProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 USACO_VERIFIED 풀이의 표시용 사본이다 — 배열 내용은
   절대 바꾸지 않고, 그대로 가져와 beats(설명 말풍선)만 덧붙인다. getBlockGameSections() 는
   PDF 다운로드가 계속 쓰므로 그대로 둔다.
   ⚠️ `chr(ord('a')+ci)`(파이썬)·`a[i]-'a'`(C++) 는 안 가르친 글자↔숫자 변환이다 — 처음
   나오는 말풍선에서 한 줄로 뜻을 밝힌다(2026-09-25 판정). ── */
export function getBlockGameWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "need[26]", ko: "글자마다(a~z) 필요한 최소 블록 수", en: "min blocks needed, per letter a..z" },
        { v: "ca[26] / cb[26]", ko: "이번 판 앞면·뒷면에서 글자별 개수", en: "this board's front/back letter counts" },
      ],
      beats: [
        { hi: [0, 15], bubble: t(E,
          "What do we need? The minimum blocks needed for each letter. Start need[26] at 0 — index 0 is 'a', 25 is 'z'.",
          "무엇이 필요한가요? 글자마다(a~z) 필요한 최소 블록 수예요.\nneed[26] 을 0으로 시작해요 — 인덱스 0이 'a', 25가 'z'예요.") },
        { hi: [16, 29], bubble: t(E,
          "Read this board's front and back word, and count each letter in both. Subtracting 'a' turns a letter into its slot number, so a[i]-'a' means 0 for 'a', 1 for 'b', and so on.",
          "이번 판의 앞면·뒷면 단어를 읽고, 각각 글자별로 세요.\n글자에서 'a' 를 빼면 그 글자의 번호가 돼요 — a[i]-'a' 는 'a' 면 0, 'b' 면 1이 돼요.") },
        { hi: [30, 39], bubble: t(E,
          "We don't know which side will show, so for each letter add the larger of front-count and back-count.",
          "어느 면이 보일지 모르니, 글자마다 앞면·뒷면 개수 중 큰 쪽을 더해요.") },
        { hi: [40, 45], bubble: t(E,
          "Print the total for every letter, a through z.",
          "글자마다(a~z) 총합을 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "need[26]", ko: "글자마다(a~z) 필요한 최소 블록 수", en: "min blocks needed, per letter a..z" },
      { v: "front / back", ko: "이번 판의 앞면·뒷면 글자들", en: "this board's front/back letters" },
    ],
    beats: [
      { hi: [0, 8], bubble: t(E,
        "What do we need? The minimum blocks needed for each letter. Start need with 26 zeros — index 0 is 'a', 25 is 'z'.",
        "무엇이 필요한가요? 글자마다(a~z) 필요한 최소 블록 수예요.\nneed 를 0이 26개인 배열로 시작해요 — 인덱스 0이 'a', 25가 'z'예요.") },
      { hi: [9, 12], bubble: t(E,
        "Read this board's front and back word.",
        "이번 판의 앞면·뒷면 단어를 읽어요.") },
      { hi: [13, 26], bubble: t(E,
        "For each letter (ci from 0 to 25), count how many times it appears on the front and on the back. ord('a')+ci is that letter's code number, and chr() turns it back into the letter. We don't know which side will show, so add the larger count.",
        "글자마다(ci 는 0부터 25까지) 앞면·뒷면에 몇 번 나오는지 세요.\nord('a')+ci 는 그 글자의 코드번호, chr() 는 그걸 다시 글자로 바꿔요.\n어느 면이 보일지 모르니 큰 쪽을 더해요.") },
      { hi: [28, 30], bubble: t(E,
        "Write the total for every letter, a through z.",
        "글자마다(a~z) 총합을 출력 파일에 써요.") },
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


export function downloadBlockGamePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "BlockGame — Full Study Guide", "BlockGame — 종합 풀이 노트");
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

