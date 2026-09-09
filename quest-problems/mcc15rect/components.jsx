import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "x1, y1 = map(int, input().split())",
  "x2, y2 = map(int, input().split())",
  "x3, y3 = map(int, input().split())",
  "",
  "# 축에 평행한 직사각형 → x 좌표는 왼쪽 변에 2번, 오른쪽 변에 2번 등장해요.",
  "# 주어진 3개 중 짝이 있는 두 개를 빼면, 짝 없는 하나가 답이에요.",
  "if x1 == x2:",
  "    x4 = x3",
  "elif x1 == x3:",
  "    x4 = x2",
  "else:",
  "    x4 = x1",
  "",
  "if y1 == y2:",
  "    y4 = y3",
  "elif y1 == y3:",
  "    y4 = y2",
  "else:",
  "    y4 = y1",
  "",
  "print(x4, y4)",
];

const FULL_CPP = [
  "#include <iostream>",
  "using namespace std;",
  "",
  "int main() {",
  "    int x1, y1, x2, y2, x3, y3;",
  "    cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;",
  "",
  "    int x4, y4;",
  "    if (x1 == x2) x4 = x3;",
  "    else if (x1 == x3) x4 = x2;",
  "    else x4 = x1;",
  "",
  "    if (y1 == y2) y4 = y3;",
  "    else if (y1 == y3) y4 = y2;",
  "    else y4 = y1;",
  "",
  "    cout << x4 << \" \" << y4 << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc15RectSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Because the rectangle is parallel to the axes, only two different x values exist in it (left side and right side) — and only two different y values.",
            "직사각형이 축에 평행하니까 x 좌표는 딱 두 종류(왼쪽 변·오른쪽 변)뿐이에요. y 도 아래쪽·위쪽 두 종류뿐이고요."),
        t(E, "Each value is shared by two corners, so among the 3 given x's exactly two match and one is left without a partner — that lonely x is the answer's x. Same for y.",
            "값 하나를 꼭짓점 두 개가 나눠 쓰니, 주어진 x 3개 중 두 개는 같고 하나는 짝이 없어요 — 그 짝 없는 x 가 답의 x 예요. y 도 똑같아요."),
        t(E, "Negative coordinates work exactly the same — we never compare sizes, only whether two values are equal.",
            "좌표가 음수여도 그대로 동작해요 — 크기 비교가 아니라 같은지만 보니까요."),
        t(E, "The order of the 3 given corners does not matter: whichever two share an x, the remaining one is the lonely one.",
            "주어진 꼭짓점 3개의 순서는 상관없어요. 어느 둘이 x 를 공유하든, 남는 하나가 짝 없는 값이에요."),
      ],
      pyOnly: [
        t(E, "map(int, input().split()) reads x and y from one line at once and turns both into numbers.",
            "map(int, input().split()) 로 한 줄에서 x, y 를 한 번에 받아 숫자로 바꿔요."),
        /* 2026-09-09: 여기서 "짧은 본문은 콜론 뒤에 한 줄로 써도 돼요" 라며
           압축 스타일을 **정답처럼 가르치고 있었다.** 선생님(2026-09-08):
           "코드 보기 좋게 해줘 한줄에 여러개 쓰지 말고". 코드도 같이 폈다. */
        t(E, "if / elif / else picks exactly one of the three — the two that match are skipped, and the odd one out is the answer.",
            "if / elif / else 는 셋 중 하나만 골라요. 짝이 맞는 둘은 건너뛰고, 짝 없는 하나가 답이 돼요."),
        t(E, "print(x4, y4) already puts a space between the two numbers, which is exactly the required output format.",
            "print(x4, y4) 는 두 숫자 사이에 공백을 알아서 넣어줘요 — 요구하는 출력 형식 그대로예요."),
      ],
      cppOnly: [
        t(E, "cin >> x1 >> y1 >> ... skips spaces and newlines on its own, so all 3 lines can be read in one statement.",
            "cin >> x1 >> y1 >> ... 는 줄바꿈·공백을 알아서 건너뛰어요 — 3줄을 한 문장으로 읽어도 괜찮아요."),
        t(E, "int is plenty here: coordinates stay within −1,000 to 1,000.",
            "좌표가 −1,000 ~ 1,000 이라 int 로 충분해요."),
        t(E, "Print the space yourself: cout << x4 << \" \" << y4 — C++ does not insert one for you.",
            "공백은 직접 넣어요: cout << x4 << \" \" << y4 — C++ 는 자동으로 넣어주지 않아요."),
      ],
    },
  ];
}

export function Mcc15RectProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}

/* ═══════════════════════════════════════════════════════════════
   getMcc15RectWalk — CodeWalk 용 {code, vars, beats}

   말풍선을 설명하는 코드 줄에 붙인다 (memory/feedback_quest_code_codewalk.md,
   선생님 2026-07-14 "코드 위 설명은 안 읽힘. 앞으로 코드는 모두 이런식으로.").
   전에는 코드 **위에** why 4줄 + pyOnly 3 + cppOnly 3 이 얹혀 있었다.
   형제 quest mcc19rect2 를 본떠 CodeWalk 로 바꾼다 (2026-09-09, 파일럿).

   ⚠️ hi 는 **0부터 세는 줄 번호**다 (화면에 보이는 번호는 +1).
   FULL_PY 는 21 줄(인덱스 0~20), FULL_CPP 는 19 줄(인덱스 0~18) — 기계로 대조함.
   ═══════════════════════════════════════════════════════════════ */
const _RECT_VARS = [
  { v: "x4", ko: "짝 없는 x → 4번째 꼭짓점의 x", en: "the lonely x → 4th corner's x" },
  { v: "y4", ko: "짝 없는 y → 4번째 꼭짓점의 y", en: "the lonely y → 4th corner's y" },
];

export function getMcc15RectWalk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP, vars: _RECT_VARS, beats: [
        { hi: [3, 5], bubble: t(E,
          "Declare the three known corners and read them all with one cin statement.",
          "알고 있는 꼭짓점 셋을 선언하고, cin 한 줄로 다 읽어요.") },
        { hi: [7, 10], bubble: t(E,
          "int is enough — coordinates stay within ±1,000. if / else if / else picks whichever x has no partner among the three.",
          "좌표가 ±1,000 이라 int 로 충분해요.\nif / else if / else 가 셋 중 짝 없는 x 를 골라요.") },
        { hi: [12, 14], bubble: t(E,
          "Same idea for y.",
          "y 도 똑같이 해요.") },
        { hi: [16, 18], bubble: t(E,
          "Print the space yourself with cout — C++ does not insert one automatically.",
          "공백은 cout 에서 직접 넣어요 — C++ 는 자동으로 안 넣어줘요.") },
      ],
    };
  }
  return {
    code: FULL_PY, vars: _RECT_VARS, beats: [
      { hi: [0, 2], bubble: t(E,
        "Read the three known corners: (x1,y1), (x2,y2), (x3,y3).",
        "알고 있는 꼭짓점 셋을 읽어요.\n(x1,y1), (x2,y2), (x3,y3).") },
      { hi: [4, 11], bubble: t(E,
        "The sides are parallel to the axes, so each x value belongs to two corners. Among the three x's, two match and one has no partner — that lonely x becomes x4.",
        "변이 축에 평행하니 x 값 하나는 꼭짓점 두 개가 나눠 써요.\nx 셋 중 둘은 같고 하나는 짝이 없어요 — 그 짝 없는 값이 x4예요.") },
      { hi: [13, 18], bubble: t(E,
        "Same idea for y — the y with no partner among the three becomes y4.",
        "y 도 똑같아요.\n셋 중 짝 없는 y 가 y4가 돼요.") },
      { hi: [20, 20], bubble: t(E,
        "print(x4, y4) puts a space between the two numbers automatically — exactly the format we need.",
        "print(x4, y4) 는 두 수 사이에 공백을 자동으로 넣어요.\n필요한 출력 형식 그대로예요.") },
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


export function downloadMcc15RectPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc15Rect — Full Study Guide", "Mcc15Rect — 종합 풀이 노트");
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

