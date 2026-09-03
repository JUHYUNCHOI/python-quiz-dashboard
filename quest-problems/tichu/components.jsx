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
  "i = 0",
  "for j in range(m):",
  "    while c[j] - c[i] - (j - i) > k:",
  "        i += 1",
  "    win = max(win, j - i + 1)",
  "print(min(n, win + k))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    long long N, K; cin >> N >> K;",
  "    int cnt = N - K;",
  "    vector<long long> c(cnt);",
  "    for (auto& x : c) cin >> x;",
  "    sort(c.begin(), c.end());",
  "    c.erase(unique(c.begin(), c.end()), c.end());   // 중복 제거",
  "    int M = c.size();",
  "",
  "    long long win = 0;",
  "    int i = 0;",
  "    for (int j = 0; j < M; j++) {",
  "        while (c[j] - c[i] - (j - i) > K) i++;",
  "        win = max(win, (long long)(j - i + 1));",
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
            "같은 값 중복은 run에 쓸모없어요 — 먼저 정렬 + 중복 제거 (sorted(set(...)))."),
        t(E, "Two pointers: keep the widest window [i..j] whose inner gap (value-diff − count-diff) ≤ k.",
            "투포인터: 내부 빈칸 (값차 − 개수차) ≤ k 인 가장 넓은 창 [i..j] 을 유지."),
        t(E, "Answer = window size + k (fill inner gaps, extend the ends), capped at n.",
            "답 = 창 크기 + k (내부 빈칸 메꾸고 양끝 확장), 최대 n."),
      ],
      pyOnly: [
        t(E, "sorted(set(...)) sorts and dedupes in one line — perfect for the distinct values.",
            "sorted(set(...)) 한 줄로 정렬 + 중복 제거 — 서로 다른 값 만들기에 딱."),
      ],
      cppOnly: [
        t(E, "sort then erase(unique(...)) is the C++ way to get distinct sorted values.",
            "C++ 에선 sort 후 erase(unique(...)) 로 서로 다른 값을 정렬해 얻어요."),
        t(E, "Cᵢ can reach 10⁹ and N up to 10⁵ — use long long to be safe.",
            "Cᵢ 는 10⁹, N 은 최대 10⁵ — 안전하게 long long."),
      ],
    },
  ];
}

/* CodeWalk 용 — 정답 코드 + 말풍선(beats). Ch2 에서 사용. */
const _TICHU_VARS = [
  { v: "c", ko: "정렬·중복제거한 값들", en: "sorted distinct values" },
  { v: "k", ko: "와일드 수", en: "# wildcards" },
  { v: "win", ko: "최대 창 크기", en: "biggest window" },
  { v: "i / j", ko: "투포인터", en: "two pointers" },
];

export function getTichuWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _TICHU_VARS, beats: [
      { hi: [5, 12], bubble: t(E,
        "Read N and K, read the N-K numbered cards, then sort and dedupe them — duplicates never help a run.",
        "N 과 K 를 읽고, 수 카드 N-K개를 읽어요. 그다음 정렬 + 중복 제거 — 중복은 run에 소용없어요.") },
      { hi: [14, 15], bubble: t(E,
        "win = biggest window found so far. i = left end of the sliding window.",
        "win = 지금까지 찾은 최대 창 크기. i = 슬라이딩 창의 왼쪽 끝.") },
      { hi: [16, 19], bubble: t(E,
        "Slide j to the right.\nThe inner gap of window [i..j] is (value diff) − (count diff),\nthat is c[j]−c[i] − (j−i).\nIf it exceeds K we cannot fill it, so shrink from the left.\nKeep the biggest window size.",
        "j 를 오른쪽으로 밀어요.\n창 [i..j] 의 내부 빈칸은 (값차) − (개수차) 예요.\n즉 c[j]−c[i] − (j−i) 예요.\nK 를 넘으면 못 메꾸니 왼쪽 i 를 좁혀요.\n제일 큰 창 크기를 계속 갱신해요.") },
      { hi: [20, 20], bubble: t(E,
        "Answer = window + K (fill inner gaps, spend leftover wildcards on the ends), capped at N.",
        "답 = 창 + K (내부 빈칸 메꾸고, 남는 와일드는 양끝에). 최대 N.") },
    ] };
  }
  return { code: FULL_PY, vars: _TICHU_VARS, beats: [
    { hi: [0, 1], bubble: t(E,
      "Read N and K on the first line.\nOn the second line, read the numbered cards.\nUse set(...) to drop duplicates and sorted(...) to sort.\nDuplicates never help a run.",
      "첫 줄에서 N 과 K 를 읽어요.\n둘째 줄의 수 카드를 읽어요.\nset(...) 으로 중복을 없애고 sorted(...) 로 정렬해요.\n중복은 run 을 늘리는 데 도움이 안 되거든요.") },
    { hi: [2, 4], bubble: t(E,
      "m = how many distinct values there are.\nwin = the biggest window so far.\ni = the left end of the window.",
      "m = 서로 다른 값 개수. win = 지금까지 최대 창, i = 창의 왼쪽 끝.") },
    { hi: [5, 8], bubble: t(E,
      "Slide j to the right.\nThe inner gap of window [i..j] is c[j]−c[i] − (j−i).\nIf k wildcards cannot fill it, shrink from the left (i += 1).\nTrack the biggest window size j−i+1.",
      "j 를 오른쪽으로 밀어요.\n창 [i..j] 의 내부 빈칸은 c[j]−c[i] − (j−i) 예요.\n와일드 k개로 못 메꿀 만큼 크면 왼쪽을 좁혀요.\n제일 큰 창 크기를 기록해요.") },
    { hi: [9, 9], bubble: t(E,
      "Answer = window + k.\nFill the inner gaps, then spend leftover wildcards on the ends.\nIt can never exceed the card count n.",
      "답 = 창 + k 예요.\n내부 빈칸을 메꾸고 남는 와일드로 양끝을 늘려요.\n단, 카드 수 n 을 넘을 순 없어요.") },
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
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
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
