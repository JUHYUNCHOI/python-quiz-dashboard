import { t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";

const A = "#dc2626";

/* ================================================================
   정답 코드 — 정렬 + 중복제거 + 투포인터 (와일드카드 채우기)
   run 길이 = (값차 − 개수차) ≤ K 인 최대 창 + K   (최대 N)
   ================================================================ */
const FULL_PY = [
  "n, k = map(int, input().split())",
  "c = sorted(set(map(int, input().split())))",
  "m = len(c)",
  "win = 0",
  "left = 0",
  "for right in range(m):",
  "    while c[right] - c[left] - (right - left) > k:",
  "        left += 1",
  "    win = max(win, right - left + 1)",
  "print(min(n, win + k))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    long long N, K;",
  "    cin >> N >> K;",
  "    int cnt = N - K;",
  "    vector<long long> c(cnt);",
  "    for (auto& x : c) {",
  "        cin >> x;",
  "    }",
  "    sort(c.begin(), c.end());",
  "    c.erase(unique(c.begin(), c.end()), c.end());   // 중복 제거",
  "    int M = c.size();",
  "",
  "    long long win = 0;",
  "    int left = 0;",
  "    for (int right = 0; right < M; right++) {",
  "        while (c[right] - c[left] - (right - left) > K) {",
  "            left++;",
  "        }",
  "        win = max(win, (long long)(right - left + 1));",
  "    }",
  "    cout << min(N, win + K) << \"\\n\";",
  "}",
];

export function getTichuSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Duplicate values are useless in a run — sort and dedupe first (sorted(set(...))).",
            "같은 값이 두 장 있어도 run 은 안 길어져요. 그래서 먼저 정렬하고 중복을 없애요."),
        t(E, "Two pointers: keep the widest window [left..right]\nwhose inner gap (value diff − count diff) ≤ k.",
            "투포인터로 훑어요.\n안쪽 빈칸(값차 − 개수차)이 k 를 넘지 않는\n가장 넓은 창 [left..right] 을 잡아요."),
        t(E, "Answer = window size + k (fill inner gaps, extend the ends), capped at n.",
            "답은 창 크기 + k 예요. 안쪽 빈칸을 메꾸고 남는 와일드로 양끝을 늘리는데, n 을 넘을 순 없어요."),
      ],
      pyOnly: [
        t(E, "sorted(set(...)) sorts and dedupes in one line — perfect for the distinct values.",
            "sorted(set(...)) 한 줄이면 정렬과 중복 제거가 같이 돼요."),
      ],
      cppOnly: [
        t(E, "sort then erase(unique(...)) is the C++ way to get distinct sorted values.",
            "C++ 에선 sort 후 erase(unique(...)) 로 서로 다른 값을 정렬해 얻어요."),
        t(E, "Cᵢ can reach 10⁹ and N up to 10⁵ — use long long to be safe.",
            "Cᵢ 가 10⁹ 까지, N 이 10⁵ 까지라서 long long 을 써요."),
      ],
    },
  ];
}

/* CodeWalk 용 — 정답 코드 + 말풍선(beats). Ch2 에서 사용. */
const _TICHU_VARS = [
  { v: "c", ko: "정렬·중복제거한 값들", en: "sorted distinct values" },
  { v: "k", ko: "와일드 수", en: "# wildcards" },
  { v: "win", ko: "최대 창 크기", en: "biggest window" },
  { v: "left / right", ko: "창의 왼쪽 · 오른쪽 끝", en: "left & right end of the window" },
];

export function getTichuWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _TICHU_VARS, beats: [
      { hi: [5, 15], bubble: t(E,
        "What are we looking for? The longest run of consecutive integers\nwe can build using wildcards. Duplicate values never help a run,\nso read N and K, then sort and erase(unique(...)) to dedupe.",
        "무엇을 찾아야 하나요?\n와일드로 메꿔 만들 수 있는 가장 긴 연속 run 이에요.\n같은 값은 run 에 소용없으니,\nN·K 를 읽고 정렬 후 erase(unique(...)) 로 중복을 없애요.") },
      { hi: [17, 18], bubble: t(E,
        "We'll slide a window over these values and track the widest one.\nwin = biggest window so far, left = its left end.",
        "이 값들 위에서 창을 움직이며 가장 넓은 걸 찾을 거예요.\nwin = 지금까지 최대 창, left = 창의 왼쪽 끝이에요.") },
      { hi: [19, 24], bubble: t(E,
        "Slide right to extend the window.\nThe window's holes = (value gap) − (count gap)\n= c[right]−c[left] − (right−left).\nIf K wildcards can't fill it, shrink from the left. Track the biggest window.",
        "right 를 오른쪽으로 밀며 창을 넓혀요.\n창의 빈칸 수는 (값차) − (개수차)\n= c[right]−c[left] − (right−left) 예요.\nK 개로 못 메우면 left 를 옮겨 창을 줄여요. 제일 큰 창 크기를 기록해요.") },
      { hi: [25, 25], bubble: t(E,
        "Fill the window's holes with K wildcards, then use whatever's left\nto extend the ends. The answer is win + K, capped at N cards.",
        "창 안의 빈칸을 K 로 메우고 남는 와일드는 양끝에 붙여요.\n답은 win + K, 단 카드 수 N 을 넘을 순 없어요.") },
    ] };
  }
  return { code: FULL_PY, vars: _TICHU_VARS, beats: [
    { hi: [0, 1], bubble: t(E,
      "What are we looking for? The longest run of consecutive integers\nwe can build using wildcards. Duplicate values never help a run,\nso read N and K, then sort and dedupe the values.",
      "무엇을 찾아야 하나요?\n와일드로 메꿔 만들 수 있는 가장 긴 연속 run 이에요.\n같은 값은 run 에 소용없으니, N·K 를 읽고 값을 정렬+중복제거해요.") },
    { hi: [2, 4], bubble: t(E,
      "We'll slide a window over these values and track the widest one.\nm = distinct value count, win = biggest window so far, left = its left end.",
      "이 값들 위에서 창을 움직이며 가장 넓은 걸 찾을 거예요.\nm = 서로 다른 값 개수, win = 지금까지 최대 창, left = 창의 왼쪽 끝이에요.") },
    { hi: [5, 8], bubble: t(E,
      "Slide right to extend the window.\nThe window's holes = (value gap) − (count gap)\n= c[right]−c[left] − (right−left).\nIf K wildcards can't fill it, shrink from the left. Track the biggest window.",
      "right 를 오른쪽으로 밀며 창을 넓혀요.\n창의 빈칸 수는 (값차) − (개수차)\n= c[right]−c[left] − (right−left) 예요.\nK 개로 못 메우면 left 를 옮겨 창을 줄여요. 제일 큰 창 크기를 기록해요.") },
    { hi: [9, 9], bubble: t(E,
      "Fill the window's holes with K wildcards, then use whatever's left\nto extend the ends. The answer is win + k, capped at n cards.",
      "창 안의 빈칸을 k 로 메우고 남는 와일드는 양끝에 붙여요.\n답은 win + k, 단 카드 수 n 을 넘을 순 없어요.") },
  ] };
}

export function TichuProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","unique","erase","begin","end"];
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


export function downloadTichuPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혀 있어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Tichu — Full Study Guide", "Tichu — 종합 풀이 노트");
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
  .hint { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #7f1d1d; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">MCC 2023 P4 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
