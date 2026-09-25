// 🔒 USACO_VERIFIED — cpid=759, billboard (2017 Dec Bronze #1)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('billboard.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "# billboard 1, billboard 2, truck",
  "x1, y1, x2, y2 = map(int, lines[0].split())",
  "x3, y3, x4, y4 = map(int, lines[1].split())",
  "x5, y5, x6, y6 = map(int, lines[2].split())",
  "",
  "def rect_area(a1, b1, a2, b2):",
  "    w = a2 - a1",
  "    h = b2 - b1",
  "    if w < 0:",
  "        w = 0",
  "    if h < 0:",
  "        h = 0",
  "    return w * h",
  "",
  "def overlap(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2):",
  "    # 두 사각형의 교집합 면적",
  "    if bx1 > ax1:",
  "        ox1 = bx1",
  "    else:",
  "        ox1 = ax1",
  "    if by1 > ay1:",
  "        oy1 = by1",
  "    else:",
  "        oy1 = ay1",
  "    if bx2 < ax2:",
  "        ox2 = bx2",
  "    else:",
  "        ox2 = ax2",
  "    if by2 < ay2:",
  "        oy2 = by2",
  "    else:",
  "        oy2 = ay2",
  "    return rect_area(ox1, oy1, ox2, oy2)",
  "",
  "area1 = rect_area(x1, y1, x2, y2)",
  "area2 = rect_area(x3, y3, x4, y4)",
  "ov1 = overlap(x1, y1, x2, y2, x5, y5, x6, y6)",
  "ov2 = overlap(x3, y3, x4, y4, x5, y5, x6, y6)",
  "",
  "answer = (area1 - ov1) + (area2 - ov2)",
  "",
  "with open('billboard.out', 'w') as file:",
  "    file.write(str(answer) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "using namespace std;",
  "",
  "long long rect_area(long long a1, long long b1, long long a2, long long b2) {",
  "    long long w = a2 - a1;",
  "    long long h = b2 - b1;",
  "    if (w < 0) {",
  "        w = 0;",
  "    }",
  "    if (h < 0) {",
  "        h = 0;",
  "    }",
  "    return w * h;",
  "}",
  "",
  "long long overlap(long long ax1, long long ay1, long long ax2, long long ay2,",
  "                  long long bx1, long long by1, long long bx2, long long by2) {",
  "    long long ox1;",
  "    if (bx1 > ax1) {",
  "        ox1 = bx1;",
  "    } else {",
  "        ox1 = ax1;",
  "    }",
  "    long long oy1;",
  "    if (by1 > ay1) {",
  "        oy1 = by1;",
  "    } else {",
  "        oy1 = ay1;",
  "    }",
  "    long long ox2;",
  "    if (bx2 < ax2) {",
  "        ox2 = bx2;",
  "    } else {",
  "        ox2 = ax2;",
  "    }",
  "    long long oy2;",
  "    if (by2 < ay2) {",
  "        oy2 = by2;",
  "    } else {",
  "        oy2 = ay2;",
  "    }",
  "    return rect_area(ox1, oy1, ox2, oy2);",
  "}",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"billboard.in\");",
  "    ofstream fout(\"billboard.out\");",
  "",
  "    long long x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6;",
  "    fin >> x1 >> y1 >> x2 >> y2;",
  "    fin >> x3 >> y3 >> x4 >> y4;",
  "    fin >> x5 >> y5 >> x6 >> y6;",
  "",
  "    long long area1 = rect_area(x1, y1, x2, y2);",
  "    long long area2 = rect_area(x3, y3, x4, y4);",
  "    long long ov1 = overlap(x1, y1, x2, y2, x5, y5, x6, y6);",
  "    long long ov2 = overlap(x3, y3, x4, y4, x5, y5, x6, y6);",
  "",
  "    long long answer = (area1 - ov1) + (area2 - ov2);",
  "    fout << answer << \"\\n\";",
  "    return 0;",
  "}",
];

export function getBillboardSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
            "What should we output? The billboard area NOT hidden by the\ntruck. So first read the two billboards and the truck's corners.",
            "무엇을 출력해야 하나요? 트럭에 가려지지 않은 광고판 넓이예요.\n그러니 먼저 두 광고판과 트럭의 좌표를 읽어요."),
        t(E,
            "To subtract the hidden part, we need rect_area — the area two\nrectangles share. If they don't overlap, width or height goes\nnegative, so clamp it to 0.",
            "가려진 부분을 빼려면, 두 직사각형이 겹치는 넓이를 재는\nrect_area 가 필요해요. 안 겹치면 가로나 세로가 음수가\n되니 0 으로 막아요."),
        t(E,
            "So for each billboard, find how much the truck overlaps it\n(overlap), subtract that from its area, and add the two results.",
            "그래서 광고판마다 트럭과 겹치는 넓이(overlap)를 구해\n전체 넓이에서 빼고, 둘을 더하면 답이에요."),
      ],
      pyOnly: [
        t(E, "Python's map() makes the code shorter.",
            "Python 의 map() 을 쓰면 알고리즘이 짧아져요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 넣어요 (<iostream>, <vector>, ...). 그래야 코드가 뭘 쓰는지 한눈에 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "더하거나 곱한 값이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function BillboardProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 USACO_VERIFIED 풀이 그대로다 — 배열 내용은 절대
   바꾸지 않고, beats(설명 말풍선)만 덧붙인다. getBillboardSections() 는 PDF 다운로드가
   계속 쓰므로 그대로 둔다. ── */
export function getBillboardWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "rect_area", ko: "직사각형 하나의 넓이를 구하는 함수", en: "area of one rectangle" },
        { v: "overlap", ko: "두 직사각형이 겹치는 넓이를 구하는 함수", en: "area where two rectangles overlap" },
        { v: "answer", ko: "가려지지 않은 넓이의 합", en: "total uncovered area" },
      ],
      beats: [
        { hi: [4, 14], bubble: t(E,
          "First, a rectangle's area. If width or height would be negative — meaning no overlap — clamp it to 0.",
          "먼저 직사각형 하나의 넓이부터 구해요. 가로나 세로가 음수면(안 겹친다는 뜻) 0으로 막아요.") },
        { hi: [16, 43], bubble: t(E,
          "The overlap of two rectangles is itself a rectangle. Its left/bottom take the later start (max), its right/top take the earlier end (min) — then measure that rectangle with rect_area.",
          "두 직사각형이 겹치는 부분도 직사각형이에요. 왼쪽·아래는 더 늦게 시작하는 쪽(max), 오른쪽·위는 더 일찍 끝나는 쪽(min)을 골라, rect_area 로 넓이를 재요.") },
        { hi: [45, 53], bubble: t(E,
          "What should we hand back? The billboard area NOT covered by the truck. So read the two billboards' and the truck's corners.",
          "무엇을 출력해야 하나요? 트럭에 가려지지 않은 넓이예요. 그러니 광고판 두 개와 트럭의 좌표부터 읽어요.") },
        { hi: [55, 58], bubble: t(E,
          "Now find each billboard's own area, and how much the truck overlaps it.",
          "이제 광고판마다 자기 넓이와, 트럭과 겹치는 넓이를 구해요.") },
        { hi: [60, 63], bubble: t(E,
          "Each billboard's (area − overlap) adds up to the uncovered answer. Print it.",
          "광고판마다 (넓이 − 겹침)을 더하면 가려지지 않은 답이에요. 그 값을 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "rect_area", ko: "직사각형 하나의 넓이를 구하는 함수", en: "area of one rectangle" },
      { v: "overlap", ko: "두 직사각형이 겹치는 넓이를 구하는 함수", en: "area where two rectangles overlap" },
      { v: "answer", ko: "가려지지 않은 넓이의 합", en: "total uncovered area" },
    ],
    beats: [
      { hi: [0, 8], bubble: t(E,
        "What should we hand back? The billboard area NOT covered by the truck. So first read the two billboards' and the truck's corners.",
        "무엇을 출력해야 하나요? 트럭에 가려지지 않은 넓이예요. 그러니 먼저 광고판 두 개와 트럭의 좌표부터 읽어요.") },
      { hi: [9, 16], bubble: t(E,
        "First, a rectangle's area. If width or height would be negative — meaning no overlap — clamp it to 0.",
        "먼저 직사각형 하나의 넓이부터 구해요. 가로나 세로가 음수면(안 겹친다는 뜻) 0으로 막아요.") },
      { hi: [18, 36], bubble: t(E,
        "The overlap of two rectangles is itself a rectangle. Its left/bottom take the later start (max), its right/top take the earlier end (min) — then measure that rectangle with rect_area.",
        "두 직사각형이 겹치는 부분도 직사각형이에요. 왼쪽·아래는 더 늦게 시작하는 쪽(max), 오른쪽·위는 더 일찍 끝나는 쪽(min)을 골라, rect_area 로 넓이를 재요.") },
      { hi: [38, 41], bubble: t(E,
        "Now find each billboard's own area, and how much the truck overlaps it.",
        "이제 광고판마다 자기 넓이와, 트럭과 겹치는 넓이를 구해요.") },
      { hi: [43, 46], bubble: t(E,
        "Each billboard's (area − overlap) adds up to the uncovered answer. Write it.",
        "광고판마다 (넓이 − 겹침)을 더하면 가려지지 않은 답이에요. 그 값을 파일에 출력해요.") },
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


export function downloadBillboardPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Billboard — Full Study Guide", "Billboard — 종합 풀이 노트");
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

