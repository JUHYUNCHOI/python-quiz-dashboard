import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "S = \"ctej\"",
  "K = 2",
  "A = \"zyxwvutsrqponmlkjihgfedcba\"",
  "B = \"cbafedihglkjonmrqputsxwvzy\"",
  "",
  "# 규칙을 한 번 쓰면 A[i] 가 B[i] 로 바뀌어요",
  "step = {}",
  "for i in range(26):",
  "    step[A[i]] = B[i]",
  "",
  "# K 번 쓰고 나면 글자마다 어디로 가나요?",
  "after = {}",
  "for c in 'abcdefghijklmnopqrstuvwxyz':",
  "    x = c",
  "    for _ in range(K):",
  "        x = step[x]",
  "    after[c] = x",
  "",
  "# 메시지를 한 번만 훑으며 새로 써요",
  "print(''.join(after[c] for c in S))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "    string S = \"ctej\";",
  "    int K = 2;",
  "    string A = \"zyxwvutsrqponmlkjihgfedcba\";",
  "    string B = \"cbafedihglkjonmrqputsxwvzy\";",
  "",
  "    // 규칙을 한 번 쓰면 A[i] 가 B[i] 로 바뀌어요",
  "    int step[26];",
  "    for (int i = 0; i < 26; i++) {",
  "        step[A[i] - 'a'] = B[i] - 'a';",
  "    }",
  "",
  "    // K 번 쓰고 나면 글자마다 어디로 가나요?",
  "    int after[26];",
  "    for (int c = 0; c < 26; c++) {",
  "        int x = c;",
  "        for (int j = 0; j < K; j++) {",
  "            x = step[x];",
  "        }",
  "        after[c] = x;",
  "    }",
  "",
  "    // 메시지를 한 번만 훑으며 새로 써요",
  "    for (char &ch : S) {",
  "        ch = 'a' + after[ch - 'a'];",
  "    }",
  "    cout << S << \"\\n\";",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY 는 위 배열을 그대로 쓴다 — 한 글자도 안 바꿨다.
   getMcc20CipherSections() 는 PDF 다운로드가 계속 쓰므로 그대로 둔다.
   MCC 는 C++ 이 필요 없다(선생님 "MCC는 c++ 다 없애줘") — 파이썬만 보여준다. */
export function getMcc20CipherWalk(E) {
  return {
    code: FULL_PY,
    vars: [
      { v: "step", ko: "규칙을 한 번 적용한 표", en: "table for one application of the rule" },
      { v: "after", ko: "K 번 적용한 뒤의 표", en: "table after K applications" },
    ],
    beats: [
      { hi: [0, 4], bubble: t(E,
        "What should we output? The message after applying the shuffle K times. This contest has no fixed input format — S, K, and the shuffle rule (A turns into B) are given as fixed values.",
        "무엇을 출력해야 하나요? 규칙을 K 번 적용한 메시지예요.\n이 대회는 입력 형식이 따로 없어요 — S, K, 뒤섞는 규칙(A 가 B 로 바뀜)이 값으로 주어져요.") },
      { hi: [6, 9], bubble: t(E,
        "step[A[i]] = B[i] stores one application of the rule as a lookup table.",
        "step[A[i]] = B[i] 는 규칙을 한 번 적용한 결과를 표 하나에 적어 둬요.") },
      { hi: [11, 17], bubble: t(E,
        "Rewriting the whole message K times would be slow. Instead, ask each of the 26 letters where it lands after K hops, and build the 'after' table once.",
        "메시지를 K 번 다시 쓰면 느려요.\n대신 26 글자마다 'K 번 뛰면 어디에 도착하나?' 를 물어 'after' 표를 한 번만 만들어요.") },
      { hi: [19, 20], bubble: t(E,
        "Then rewrite S in a single pass using that table.",
        "그 표로 S 를 한 번만 훑어 바꿔요.") },
    ],
  };
}

export function getMcc20CipherSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "step[A[i]] = B[i] stores ONE application of the rule as a lookup table.",
            "step[A[i]] = B[i] 는 규칙을 한 번 적용한 결과를 표 하나에 적어 둬요."),
        /* 2026-09-17: 96 자가 한 덩어리였다. Stepper 는 \n 을 뭉개니 항목을 나눈다. */
        t(E, "The trick: don't rewrite the long message K times.",
            "긴 메시지를 K 번 다시 쓰지 않아요."),
        t(E, "Ask each of the 26 letters where it lands after K hops, and build the 'after' table once.",
            "대신 26 글자마다 'K 번 뛰면 어디에 도착하나?' 를 물어 'after' 표를 한 번만 만들어요."),
        t(E, "Then rewrite S in a single pass.",
            "그다음 S 를 한 번만 훑어 바꿔요."),
      ],
      pyOnly: [
        t(E, "''.join(after[c] for c in S) rewrites the whole message in one line.",
            "''.join(after[c] for c in S) 로 메시지 전체를 한 줄에 다시 써요."),
      ],
      cppOnly: [
        t(E, "Map letters to indices with A[i] - 'a' (0–25) so the table is a plain int[26].",
            "A[i] - 'a' (0–25) 로 글자를 자리 번호로 바꾸면 표를 int[26] 하나로 쓸 수 있어요."),
        t(E, "for (char &ch : S) edits S in place — the & means we change each character.",
            "for (char &ch : S) 는 S 를 그 자리에서 고쳐요. & 가 각 글자를 바꾼다는 뜻이에요."),
      ],
    },
  ];
}

export function Mcc20CipherProgressiveCode(props) {
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


export function downloadMcc20CipherPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20Cipher — Full Study Guide", "Mcc20Cipher — 종합 풀이 노트");
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

