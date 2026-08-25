import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "import sys",
  "data = sys.stdin.read().split()",
  "N = int(data[0])",
  "K = int(data[1])",
  "H = list(map(int, data[2:2+N]))",
  "",
  "# 왼쪽으로 계속 내려가는 길이 / 계속 올라가는 길이",
  "downL = [0] * N",
  "upL   = [0] * N",
  "for i in range(1, N):",
  "    downL[i] = downL[i-1] + 1 if H[i] > H[i-1] else 0",
  "    upL[i]   = upL[i-1]   + 1 if H[i] < H[i-1] else 0",
  "",
  "# 오른쪽 방향은 뒤에서부터 똑같이",
  "downR = [0] * N",
  "upR   = [0] * N",
  "for i in range(N-2, -1, -1):",
  "    downR[i] = downR[i+1] + 1 if H[i] > H[i+1] else 0",
  "    upR[i]   = upR[i+1]   + 1 if H[i] < H[i+1] else 0",
  "",
  "count = 0",
  "for i in range(N):",
  "    if downL[i] >= K and downR[i] >= K:      # order-K 봉우리",
  "        count += 1",
  "    elif upL[i] >= K and upR[i] >= K:        # order-K 골짜기",
  "        count += 1",
  "",
  "print(count)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false); cin.tie(nullptr);",
  "    int N, K;",
  "    cin >> N >> K;",
  "    vector<int> H(N);",
  "    for (int i = 0; i < N; i++) cin >> H[i];",
  "",
  "    vector<int> downL(N, 0), upL(N, 0), downR(N, 0), upR(N, 0);",
  "    for (int i = 1; i < N; i++) {",
  "        downL[i] = (H[i] > H[i-1]) ? downL[i-1] + 1 : 0;",
  "        upL[i]   = (H[i] < H[i-1]) ? upL[i-1]   + 1 : 0;",
  "    }",
  "    for (int i = N - 2; i >= 0; i--) {",
  "        downR[i] = (H[i] > H[i+1]) ? downR[i+1] + 1 : 0;",
  "        upR[i]   = (H[i] < H[i+1]) ? upR[i+1]   + 1 : 0;",
  "    }",
  "",
  "    int count = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        if (downL[i] >= K && downR[i] >= K) count++;",
  "        else if (upL[i] >= K && upR[i] >= K) count++;",
  "    }",
  "    cout << count << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc15IsthmusSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "downL[i] = downL[i-1] + 1 is the whole trick. The left neighbour already knows how far the descent runs, so we never count the same stretch twice.",
            "downL[i] = downL[i-1] + 1 이 핵심이에요. 왼쪽 이웃이 이미 답을 알고 있으니 세는 걸 반복하지 않아요."),
        t(E, "The right-hand lengths (downR, upR) are the same idea run from the back of the array.",
            "오른쪽 길이(downR, upR)는 같은 생각을 배열 뒤에서부터 돌린 것뿐이에요."),
        t(E, "The rule \"at least K pieces of land on both sides\" needs no separate check — if the land runs out, the run length simply cannot reach K.",
            "양쪽에 K칸이 있어야 한다는 조건은 따로 확인할 필요가 없어요 — 칸이 모자라면 길이가 K 에 못 미치니까요."),
        t(E, "elif, not a second if: one piece of land can never be a peak and a valley at the same time, so it must not be counted twice.",
            "if 를 하나 더 쓰지 않고 elif 인 이유: 한 위치가 봉우리이면서 동시에 골짜기일 수는 없어요. 두 번 세면 안 돼요."),
      ],
      pyOnly: [
        t(E, "N can be 1,000,000, so calling input() many times is slow. sys.stdin.read().split() grabs everything at once.",
            "N 이 100만이라 input() 을 여러 번 부르면 느려요. sys.stdin.read() 로 한 번에 읽어요."),
        t(E, "data[0] is N and data[1] is K because the input puts them on their own lines — split() flattens all three lines into one list of tokens.",
            "입력이 N, K, 배열을 각각 다른 줄에 주는데 split() 이 세 줄을 토큰 하나의 리스트로 펼치니 data[0] 이 N, data[1] 이 K 예요."),
      ],
      cppOnly: [
        t(E, "ios::sync_with_stdio(false) speeds cin up — we have to read up to a million numbers.",
            "ios::sync_with_stdio(false) 로 입력 속도를 올려요 — 100만 개를 읽어야 하니까요."),
        t(E, "cin >> skips whitespace and newlines alike, so reading N, then K, then the N heights just works with the three-line format.",
            "cin >> 는 공백과 줄바꿈을 똑같이 건너뛰어요. 그래서 N, K, 높이 N개를 차례로 읽으면 세 줄짜리 형식이 그대로 처리돼요."),
        t(E, "int is enough everywhere: heights are at most 1,000,000 and the count is at most N.",
            "전부 int 로 충분해요. 높이는 최대 1,000,000, 개수는 최대 N 이에요."),
      ],
    },
  ];
}

export function Mcc15IsthmusProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadMcc15IsthmusPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc15Isthmus — Full Study Guide", "Mcc15Isthmus — 종합 풀이 노트");
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

