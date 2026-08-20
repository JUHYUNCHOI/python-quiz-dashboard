import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const FULL_PY = [
  "import sys",
  "def main():",
  "    data = sys.stdin.read().split()",
  "    idx = 0",
  "    n = int(data[idx]); idx += 1",
  "    pairs = []",
  "    for _ in range(n):",
  "        a = int(data[idx]); b = int(data[idx + 1]); idx += 2",
  "        pairs.append((a, b))",
  "",
  "    # sort so the biggest a+b pairs come first",
  "    pairs.sort(key=lambda p: -(p[0] + p[1]))",
  "",
  "    # turn 0,2,4,... = Evirir (+a) · turn 1,3,5,... = Rhae (-b)",
  "    res = 0",
  "    for t, (a, b) in enumerate(pairs):",
  "        res += a if t % 2 == 0 else -b",
  "    print(res)",
  "main()",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int n; cin >> n;",
  "    vector<pair<long long, long long>> pairs(n);",
  "    for (int i = 0; i < n; i++) cin >> pairs[i].first >> pairs[i].second;",
  "",
  "    // sort so the biggest a+b pairs come first",
  "    sort(pairs.begin(), pairs.end(), [](auto &x, auto &y) {",
  "        return x.first + x.second > y.first + y.second;",
  "    });",
  "",
  "    // turn 0,2,4,... = Evirir (+a) · turn 1,3,5,... = Rhae (-b)",
  "    long long res = 0;",
  "    for (int t = 0; t < n; t++)",
  "        res += (t % 2 == 0) ? pairs[t].first : -pairs[t].second;",
  "    cout << res << \"\\n\";",
  "    return 0;",
  "}",
];

export function getSimpleGameSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Read n, then read every pair (a, b) into a list.",
            "n 을 읽고, 모든 쌍 (a, b) 를 리스트에 담아요."),
        t(E, "Sort the pairs by a+b in DESCENDING order. This is the key move — see below for why.",
            "쌍들을 a+b 기준 내림차순으로 정렬해요. 이게 핵심 — 이유는 아래에 있어요."),
        t(E, "Why a+b? A pair is valuable to BOTH players: Evirir wants its a, Rhae wants to deny its b. Picking it early is worth a to Evirir OR saves b from Rhae — a total swing of a+b. So the pair with the largest a+b is the most fought-over, and both players grab from the top. Exchange argument: if two pairs were out of a+b order, swapping them back never hurts the player to move — so optimal play just walks the pairs in a+b order.",
            "왜 a+b 일까요? 한 쌍은 두 플레이어 모두에게 값져요: Evirir 는 그 a 를, Rhae 는 그 b 를 뺏기고 싶지 않아요. 그 쌍을 먼저 가져가면 Evirir 에겐 a 이득, 아니면 Rhae 의 b 를 막는 것 — 합쳐서 a+b 만큼의 차이를 만들어요. 그래서 a+b 가 가장 큰 쌍이 가장 치열하게 다투는 쌍이고, 두 사람 모두 위에서부터 집어요. 교환 논증: 두 쌍이 a+b 순서에서 어긋나 있으면 다시 제자리로 바꿔도 둘 자리 사람이 손해 보지 않아요 — 그러니 최적 플레이는 그냥 a+b 순서대로 훑는 것과 같아요."),
        t(E, "In that fixed order the turns alternate: turn 0,2,4,… is Evirir so we +a; turn 1,3,5,… is Rhae so we −b. The running total is exactly the final X−Y.",
            "그 정해진 순서에서 차례가 번갈아요: 0,2,4,… 번째는 Evirir 라 +a, 1,3,5,… 번째는 Rhae 라 −b. 누적 합이 바로 최종 X−Y 예요."),
      ],
      pyOnly: [
        t(E, "sort(key=lambda p: -(p[0]+p[1])) sorts by a+b descending in one line.",
            "sort(key=lambda p: -(p[0]+p[1])) 로 a+b 내림차순 정렬을 한 줄에 해요."),
        t(E, "enumerate(pairs) gives the turn index t, so t % 2 tells us whose turn it is.",
            "enumerate(pairs) 가 차례 번호 t 를 줘서, t % 2 로 누구 차례인지 알 수 있어요."),
      ],
      cppOnly: [
        t(E, "Use long long — a_i, b_i reach 1e9 and n reaches 1e4, so the sum can exceed a 32-bit int.",
            "long long 을 써요 — a_i, b_i 가 1e9, n 이 1e4 까지라 합이 32비트 int 를 넘을 수 있어요."),
        t(E, "The comparator returns x.first+x.second > y.first+y.second to sort by a+b descending.",
            "비교 함수가 x.first+x.second > y.first+y.second 를 반환해 a+b 내림차순으로 정렬해요."),
      ],
    },
  ];
}

export function SimpleGameProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
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


export function downloadSimpleGamePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SimpleGame — Full Study Guide", "SimpleGame — 종합 풀이 노트");
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

