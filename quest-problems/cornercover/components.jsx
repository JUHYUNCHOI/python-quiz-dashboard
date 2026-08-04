import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ⚠️ 2026-07-30 전면 교체 — 이 파일에 있던 코드는 *다른 문제* 를 풀고 있었다.
   옛 내용: "N×M 격자의 꼭짓점 칸 개수" → print(1/2/4).
   진짜 MCC 2024 P1: T 케이스마다 n m A B 를 읽어, A×B(또는 B×A) 부분격자로
   코너 칸 2 개 이상을 덮을 수 있는지 YES/NO.
   (선생님이 원문 PDF 를 주셔서 확인. Statements 3/statement-en.pdf p.1-2) */

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    n, m, A, B = map(int, input().split())",
  "",
  "    ok = False",
  "    for h, w in ((A, B), (B, A)):      # 눕혀서 놓는 것도 허용",
  "        if h <= n and w <= m:          # ① 격자 안에 들어가나",
  "            if h == n or w == m:       # ② 한 방향을 끝까지 꽉 채우나",
  "                ok = True",
  "",
  "    print(\"YES\" if ok else \"NO\")",
];

/* C++ 코드는 2026-07-30 삭제 — MCC quest 는 App 에서 codeLang="py" 로 고정돼
   학생에게 C++ 이 아예 안 보인다 (선생님: "MCC는 c++ 다 없애줘").
   안 보이는 코드를 유지하면 검증 대상만 늘고 학생에겐 도움이 0. */

export function getCornerCoverSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY,
      /* 규칙(들어가나·꽉 채우나)은 앞 슬라이드가 이미 말했다. 여기서는 *코드가 그걸
         어떻게 담았는지* 만 — 안 그러면 같은 말이 세 번 나온다.
         (선생님 2026-07-30: "반복된건 없는지") */
      why: [
        t(E, "for h, w in ((A, B), (B, A)) is the 'you may lay it on its side' part — one loop tries both orientations.",
            "for h, w in ((A, B), (B, A)) 이 '눕혀도 된다' 를 담아요 — 반복문 한 번으로 두 방향을 다 시도해요."),
        t(E, "The two ifs are nested on purpose: the outer one asks 'does it fit', the inner one 'does it span'. Reading top to bottom follows the same order you checked in the sim.",
            "if 두 개를 일부러 겹쳐 놨어요 — 바깥이 '들어가나', 안쪽이 '꽉 채우나'. 위에서 아래로 읽으면 시뮬에서 확인한 순서 그대로예요."),
        t(E, "ok starts False and only ever turns True — one working placement is enough, so we never need to undo it.",
            "ok 는 False 로 시작해서 True 로만 바뀌어요 — 되는 배치가 하나만 있으면 되니까, 되돌릴 일이 없어요."),
      ],
      pyOnly: [
        t(E, "Python ints are arbitrary precision — n, m, A, B up to 10^18 need no special care.",
            "파이썬 정수는 크기 제한이 없어서 10^18 이 와도 그냥 돼요."),
      ],
    },
  ];
}

export function CornerCoverProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
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


export function downloadCornerCoverPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CornerCover — Full Study Guide", "CornerCover — 종합 풀이 노트");
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

