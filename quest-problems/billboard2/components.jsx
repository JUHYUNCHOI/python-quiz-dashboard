// 🔒 USACO_VERIFIED — cpid=783, billboard2 (2018 Jan Bronze #1, Mowing the Field)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('billboard.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "# 첫 줄: billboard 좌표, 둘째 줄: feed (tarp) 좌표",
  "x1, y1, x2, y2 = map(int, lines[0].split())",
  "x3, y3, x4, y4 = map(int, lines[1].split())",
  "",
  "bw = x2 - x1  # billboard 너비",
  "bh = y2 - y1  # billboard 높이",
  "area = bw * bh",
  "",
  "# cow feed 가 billboard 의 전 너비를 덮고, 위/아래 한쪽 edge 까지 닿는 경우",
  "if x3 <= x1 and x4 >= x2 and (y3 <= y1 or y4 >= y2):",
  "    top = min(y2, y4)",
  "    bot = max(y1, y3)",
  "    overlap = top - bot",
  "    if overlap < 0:",
  "        overlap = 0",
  "    answer = bw * (bh - overlap)",
  "# cow feed 가 billboard 의 전 높이를 덮고, 좌/우 한쪽 edge 까지 닿는 경우",
  "elif y3 <= y1 and y4 >= y2 and (x3 <= x1 or x4 >= x2):",
  "    right = min(x2, x4)",
  "    left = max(x1, x3)",
  "    overlap = right - left",
  "    if overlap < 0:",
  "        overlap = 0",
  "    answer = bh * (bw - overlap)",
  "# 그 외: bounding box 가 전체 billboard → 전체 면적",
  "else:",
  "    answer = area",
  "",
  "with open('billboard.out', 'w') as file:",
  "    file.write(str(answer) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"billboard.in\");",
  "    ofstream fout(\"billboard.out\");",
  "",
  "    long long x1, y1, x2, y2, x3, y3, x4, y4;",
  "    fin >> x1 >> y1 >> x2 >> y2;",
  "    fin >> x3 >> y3 >> x4 >> y4;",
  "    long long bw = x2 - x1;",
  "    long long bh = y2 - y1;",
  "    long long area = bw * bh;",
  "    long long answer;",
  "    if (x3 <= x1 && x4 >= x2 && (y3 <= y1 || y4 >= y2)) {",
  "        // cow feed 가 billboard 의 전 너비 + 위/아래 한쪽 edge 까지 닿음",
  "        long long top;",
  "        if (y2 < y4) {",
  "            top = y2;",
  "        } else {",
  "            top = y4;",
  "        }",
  "        long long bot;",
  "        if (y1 > y3) {",
  "            bot = y1;",
  "        } else {",
  "            bot = y3;",
  "        }",
  "        long long overlap = top - bot;",
  "        if (overlap < 0) {",
  "            overlap = 0;",
  "        }",
  "        answer = bw * (bh - overlap);",
  "    } else if (y3 <= y1 && y4 >= y2 && (x3 <= x1 || x4 >= x2)) {",
  "        // cow feed 가 billboard 의 전 높이 + 좌/우 한쪽 edge 까지 닿음",
  "        long long right;",
  "        if (x2 < x4) {",
  "            right = x2;",
  "        } else {",
  "            right = x4;",
  "        }",
  "        long long left;",
  "        if (x1 > x3) {",
  "            left = x1;",
  "        } else {",
  "            left = x3;",
  "        }",
  "        long long overlap = right - left;",
  "        if (overlap < 0) {",
  "            overlap = 0;",
  "        }",
  "        answer = bh * (bw - overlap);",
  "    } else {",
  "        answer = area;",
  "    }",
  "    fout << answer << \"\\n\";",
  "    return 0;",
  "}",
];

export function getBillboard2Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "What should we print? The smallest tarp's area.\nThe tarp is one rectangle, so an L-shaped gap is a problem.\nSo check: does the feed span a full side, touching one edge?\nThen only a strip is left.\nOtherwise the gap is L-shaped, so cover the whole billboard.",
          "무엇을 출력해야 하나요? 가장 작은 타프의 넓이예요.\n타프는 직사각형 하나뿐이라 L자 모양의 빈틈이 곤란해요.\n그래서 확인해요 — 사료 광고판이 한쪽 끝까지 덮고 한 변 전체를 가리나요?\n그러면 남는 부분이 띠 모양이에요.\n아니면 빈틈이 L자라서 광고판 전체를 다 덮어야 해요."),
      ],
      pyOnly: [
        t(E, "Python's map() makes the code shorter.",
            "파이썬의 map() 덕분에 코드가 짧아요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 넣어요 (<iostream>, <vector>, …). 그래야 코드가 뭘 하려는지 잘 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "더한 값이나 곱한 값이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function Billboard2ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 USACO_VERIFIED 풀이의 표시용 사본이다 — 배열 내용은
   절대 바꾸지 않고, 그대로 가져와 beats(설명 말풍선)만 덧붙인다. getBillboard2Sections() 는
   PDF 다운로드가 계속 쓰므로 그대로 둔다. ── */
export function getBillboard2Walk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "bw/bh/area", ko: "광고판 너비·높이·전체 면적", en: "billboard width/height/full area" },
        { v: "overlap", ko: "사료가 덮는 띠의 두께", en: "how thick the feed's strip is" },
        { v: "answer", ko: "타프 면적", en: "the tarp's area" },
      ],
      beats: [
        { hi: [4, 11], bubble: t(E,
          "What do we need? The smallest tarp area. Read the billboard's corners and the feed's corners.",
          "무엇을 내놔야 하나요? 가장 작은 타프의 면적이에요. 광고판 모서리와 사료 모서리를 읽어요.") },
        { hi: [12, 15], bubble: t(E,
          "Start from the worst case: the tarp covers the whole billboard.",
          "가장 나쁜 경우부터 시작해요 — 타프가 광고판 전체를 덮는 경우예요.") },
        { hi: [16, 34], bubble: t(E,
          "If the feed spans the FULL width and touches the top or bottom edge, only a horizontal strip is left uncovered — shrink the height by that strip's thickness.",
          "사료가 너비 전체를 덮고 위나 아래 변에 닿으면, 가로 띠만 안 덮인 채 남아요 — 그 띠 두께만큼 높이를 줄여요.") },
        { hi: [35, 53], bubble: t(E,
          "If instead the feed spans the FULL height and touches the left or right edge, only a vertical strip is left — shrink the width by that strip's thickness.",
          "이번엔 사료가 높이 전체를 덮고 왼쪽이나 오른쪽 변에 닿으면, 세로 띠만 남아요 — 그 띠 두께만큼 너비를 줄여요.") },
        { hi: [54, 56], bubble: t(E,
          "Otherwise the uncovered gap is ㄴ-shaped — one rectangle can't match that shape, so the tarp has to cover the whole billboard.",
          "그 외엔 안 덮인 부분이 ㄴ자예요 — 직사각형 하나로는 그 모양을 딱 맞출 수 없어서, 타프가 광고판 전체를 덮어야 해요.") },
        { hi: [57, 59], bubble: t(E,
          "Write the tarp's area.",
          "타프의 면적을 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "bw/bh/area", ko: "광고판 너비·높이·전체 면적", en: "billboard width/height/full area" },
      { v: "overlap", ko: "사료가 덮는 띠의 두께", en: "how thick the feed's strip is" },
      { v: "answer", ko: "타프 면적", en: "the tarp's area" },
    ],
    beats: [
      { hi: [0, 6], bubble: t(E,
        "What do we need? The smallest tarp area. Read the billboard's corners and the feed's corners.",
        "무엇을 내놔야 하나요? 가장 작은 타프의 면적이에요. 광고판 모서리와 사료 모서리를 읽어요.") },
      { hi: [8, 10], bubble: t(E,
        "Compute the billboard's width, height, and full area — the worst case.",
        "광고판의 너비·높이·전체 면적을 구해요 — 가장 나쁜 경우예요.") },
      { hi: [12, 19], bubble: t(E,
        "If the feed spans the FULL width and touches the top or bottom edge, only a horizontal strip is left uncovered — shrink the height by that strip's thickness.",
        "사료가 너비 전체를 덮고 위나 아래 변에 닿으면, 가로 띠만 안 덮인 채 남아요 — 그 띠 두께만큼 높이를 줄여요.") },
      { hi: [20, 27], bubble: t(E,
        "If instead the feed spans the FULL height and touches the left or right edge, only a vertical strip is left — shrink the width by that strip's thickness.",
        "이번엔 사료가 높이 전체를 덮고 왼쪽이나 오른쪽 변에 닿으면, 세로 띠만 남아요 — 그 띠 두께만큼 너비를 줄여요.") },
      { hi: [28, 30], bubble: t(E,
        "Otherwise the uncovered gap is ㄴ-shaped — one rectangle can't match that shape, so the tarp has to cover the whole billboard.",
        "그 외엔 안 덮인 부분이 ㄴ자예요 — 직사각형 하나로는 그 모양을 딱 맞출 수 없어서, 타프가 광고판 전체를 덮어야 해요.") },
      { hi: [32, 33], bubble: t(E,
        "Write the tarp's area.",
        "타프의 면적을 출력해요.") },
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


export function downloadBillboard2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Billboard2 — Full Study Guide", "Billboard2 — 종합 풀이 노트");
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

