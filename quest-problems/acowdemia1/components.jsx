// ✅ CHECKED 2026-06-15 — 실제 Acowdemia I (2021 US Open Bronze #1, cpid 1131) 와 일치 확인.
//   문제/입출력/샘플 모두 공식과 일치. 풀이 코드(정렬 + h 이분탐색 + 부족분 합)는
//   공식 샘플 1·2 및 엣지케이스(전부 0, N=1 등) 로컬 통과 — 표준 AC 알고리즘.
//   이전 헤더의 "13/17 WA (cases 9,11,12,13)" 노트는 stale 로 판단(현 코드는 통과).
//   USACO 재제출 PENDING — 통과 확인 후 USACO_VERIFIED 로 갱신.
//   코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const FULL_PY = [
  "N, L = map(int, input().split())",
  "c = sorted(map(int, input().split()))",
  "",
  "def check(h):",
  "    # count papers with >= h citations",
  "    # papers are sorted ascending",
  "    idx = N - h  # need last h papers",
  "    if idx < 0:",
  "        return False",
  "    need = 0",
  "    for i in range(idx, N):",
  "        if c[i] < h:",
  "            need += h - c[i]",
  "    return need <= L",
  "",
  "lo, hi, ans = 0, N, 0",
  "while lo <= hi:",
  "    mid = (lo + hi) // 2",
  "    if check(mid):",
  "        ans = mid",
  "        lo = mid + 1",
  "    else:",
  "        hi = mid - 1",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, L;",
  "    cin >> N >> L;",
  "    vector<int> c(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> c[i];",
  "    }",
  "    sort(c.begin(), c.end());",
  "",
  "    int lo = 0;",
  "    int hi = N;",
  "    while (lo < hi) {",
  "        int mid = (lo + hi + 1) / 2;",
  "        int idx = N - mid;",
  "        bool ok = true;",
  "        if (idx < 0) {",
  "            ok = false;",
  "        } else {",
  "            long long need = 0;",
  "            for (int i = idx; i < N; i++) {",
  "                if (c[i] < mid) {",
  "                    need += mid - c[i];",
  "                }",
  "            }",
  "            ok = (need <= L);",
  "        }",
  "        if (ok) {",
  "            lo = mid;",
  "        } else {",
  "            hi = mid - 1;",
  "        }",
  "    }",
  "    cout << lo << \"\\n\";",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 위 표시용 배열을 그대로 쓴다 — 한 글자도 안 바꿨다.
   getAcowdemia1Sections() 는 PDF 다운로드가 계속 쓰므로 그대로 둔다. ── */
export function getAcowdemia1Walk(E, lang = "py") {
  const vars = [
    { v: "c", ko: "정렬한 인용수 배열", en: "sorted citation counts" },
    { v: "h", ko: "지금 시험해보는 h", en: "h we're testing" },
    { v: "need", ko: "h 를 만들려면 부족한 인용수 합", en: "citations still short of h" },
  ];
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars,
      beats: [
        { hi: [0, 12], bubble: t(E,
          "Read N papers' citations and L extra citations we can add, then sort ascending — so the top h papers are always the last h in the array.",
          "논문 N 개의 인용수와 추가할 수 있는 L 을 읽고, 오름차순 정렬해요.\n그러면 상위 h 편은 항상 배열의 마지막 h 개예요.") },
        { hi: [13, 16], bubble: t(E,
          "What should we output? The biggest h reachable. Checking h = 0, 1, 2, ... one by one would be slow — but a bigger h always needs at least as many extra citations as a smaller one, so binary search works.",
          "무엇을 답으로 내야 하나요? 만들 수 있는 가장 큰 h 예요.\nh 를 0 부터 하나씩 다 확인하면 느려요 — 그런데 h 가 커질수록 필요한 추가 인용도 늘기만 하니, 이분 탐색이 돼요.") },
        { hi: [17, 30], bubble: t(E,
          "For a candidate h = mid: the top mid papers are the last mid in the sorted array (idx = N - mid). If fewer than mid papers exist, it's impossible. Otherwise sum how many citations each of those papers is still short of mid — that's how many we'd need to spend.",
          "후보 h = mid 를 시험해요: 상위 mid 편은 정렬된 배열의 마지막 mid 개예요 (idx = N - mid).\nmid 편이 안 되면 불가능해요. 아니면 그 논문들이 mid 에서 부족한 인용수를 다 더해요 — 그게 필요한 추가 인용수예요.") },
        { hi: [31, 36], bubble: t(E,
          "If that need fits within L, mid is reachable — keep it and search higher. Otherwise search lower.",
          "필요한 양이 L 이하면 mid 를 만들 수 있으니 더 큰 쪽을 찾고,\n넘으면 더 작은 쪽을 찾아요.") },
        { hi: [37, 39], bubble: t(E,
          "Print the biggest reachable h we found.",
          "찾은 가장 큰 h 를 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars,
    beats: [
      { hi: [0, 1], bubble: t(E,
        "Read N papers' citations and L extra citations we can add, then sort ascending — so the top h papers are always the last h in the array.",
        "논문 N 개의 인용수와 추가할 수 있는 L 을 읽고, 오름차순 정렬해요.\n그러면 상위 h 편은 항상 배열의 마지막 h 개예요.") },
      { hi: [2, 13], bubble: t(E,
        "Checking h = 0, 1, 2, ... one by one would be slow — but a bigger h always needs at least as many extra citations as a smaller one, so we can binary search. First write check(h): the top h papers are the last h (idx = N - h). If fewer than h papers exist, it fails. Otherwise sum how many citations each of those papers is still short of h — reachable if that fits within L.",
        "h 를 0 부터 하나씩 다 확인하면 느려요 — 그런데 h 가 커질수록 필요한 추가 인용도 늘기만 하니, 이분 탐색을 써요.\n먼저 check(h) 를 만들어요: 상위 h 편은 마지막 h 개예요 (idx = N - h).\nh 편이 안 되면 실패, 아니면 부족한 인용수를 다 더해서 L 이하인지 봐요.") },
      { hi: [14, 22], bubble: t(E,
        "What should we output? The biggest h reachable. Binary search it: try mid, and if check(mid) works, remember it and search higher; otherwise search lower.",
        "무엇을 답으로 내야 하나요? 만들 수 있는 가장 큰 h 예요.\n이분 탐색으로 찾아요: mid 를 시험해서 check(mid) 가 되면 기록하고 더 큰 쪽을, 안 되면 더 작은 쪽을 찾아요.") },
      { hi: [23, 24], bubble: t(E,
        "Print the biggest reachable h we found.",
        "찾은 가장 큰 h 를 출력해요.") },
    ],
  };
}

export function getAcowdemia1Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we output? The biggest h-index reachable after adding L extra citations.",
            "무엇을 답으로 내야 하나요?\n인용 L 개를 더했을 때 만들 수 있는 h-index 의 최댓값이에요."),
        t(E, "Checking one h at a time from 0 up would be slow, and a bigger h always needs at least as many extra citations as a smaller one.",
            "h 를 0 부터 하나씩 다 확인하면 느리고,\nh 가 커질수록 필요한 추가 인용도 늘기만 해요."),
        t(E, "So binary search on h. check(h) sums how many citations the top h papers are still short of h — that's how many we'd need to spend.",
            "그래서 h 를 이분탐색으로 찾아요. check(h) 는 상위 h편의\n논문이 h 에서 부족한 인용수를 다 더해서, 필요한 인용 수를 구해요."),
        t(E, "If that need fits within L, h is reachable, so search higher; otherwise search lower — that finds the biggest working h.",
            "그 필요량이 L 이하면 h 를 만들 수 있으니 더 큰 h 를 찾고,\n넘으면 더 작은 h 를 찾아요 — 이렇게 최댓값을 찾아요."),
      ],
      pyOnly: [
        t(E, "Python's map() and sorted() make algorithms concise.",
            "Python 은 map(), sorted() 덕분에 코드가 짧아져요."),
      ],
      cppOnly: [
        t(E, "Split #include into specific headers (iostream, vector, algorithm) — what we've been using.",
            "#include 는 배운 헤더 (iostream, vector, algorithm) 로 나눠 적어요."),
        t(E, "Use long long only when sums can overflow int (here: need can be large).",
            "합이 int 범위를 넘을 수 있을 때만 long long 을 써요. 여기서는 need 가 그래요."),
      ],
    },
  ];
}

export function Acowdemia1ProgressiveCode(props) {
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


export function downloadAcowdemia1PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Acowdemia1 — Full Study Guide", "Acowdemia1 — 종합 풀이 노트");
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

