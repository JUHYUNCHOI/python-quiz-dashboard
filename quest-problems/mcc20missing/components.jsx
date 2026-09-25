import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ================================================================
   SOLUTION CODE  (anchor the largest magnitude → only 4 K to test)
   VERIFIED: both official samples (N=5→4, N=6→7) pass, and
   0/20000 mismatches vs an exhaustive brute over all K in [−3N,3N].
   ================================================================ */
const FULL_PY = [
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "N = 5",
  "a = [-1, 7, 4, 1]",
  "",
  "if N == 1:",
  "    print(1)",
  "else:",
  "    total = N * (N + 1) // 2   # sum of 1..N",
  "    mn, mx = min(a), max(a)",
  "    lim = 3 * N",
  "",
  "    # 원래 값 중 제일 큰 크기는 N 이에요 (N 이 버려졌으면 N-1),",
  "    # 거기에 K 를 더하면 목록의 제일 큰 값이나 제일 작은 값 자리에 와요.",
  "    # 그래서 K 는 이 넷 중 하나예요:",
  "    candidates = {mn + N, mx - N, mn + (N - 1), mx - (N - 1)}",
  "",
  "    ans = 0",
  "    for K in candidates:",
  "        if not (-lim <= K <= lim):   # K must stay in [-3N, 3N]",
  "            continue",
  "        mags = [abs(x - K) for x in a]   # undo the +K",
  "        # 맞는 경우 — 크기가 서로 다른 N-1 개이고 전부 1 부터 N 사이예요",
  "        if all(1 <= m <= N for m in mags) and len(set(mags)) == N - 1:",
  "            ans += total - sum(mags)     # the one value of 1..N left out",
  "    print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <set>",
  "#include <cstdlib>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "    int N = 5;",
  "    if (N == 1) {",
  "        cout << 1 << \"\\n\";",
  "        return 0;",
  "    }",
  "",
  "    vector<long long> a = {-1, 7, 4, 1};",
  "",
  "    long long total = (long long)N * (N + 1) / 2;   // sum of 1..N",
  "    long long mn = a[0];",
  "    long long mx = a[0];",
  "    for (long long x : a) {",
  "        mn = min(mn, x);",
  "        mx = max(mx, x);",
  "    }",
  "    long long lim = 3LL * N;",
  "",
  "    // 원래 값 중 제일 큰 크기는 N (또는 N-1) 이고, K 를 더하면",
  "    // 목록의 제일 큰 값이나 제일 작은 값 자리에 와요 — 그래서 K 후보는 넷뿐이에요",
  "    long long cands[4] = { mn + N, mx - N, mn + (N - 1), mx - (N - 1) };",
  "",
  "    long long ans = 0;",
  "    set<long long> seenK;",
  "    for (long long K : cands) {",
  "        if (!seenK.insert(K).second) {",
  "            continue;   // skip duplicate K",
  "        }",
  "        if (K < -lim || K > lim) {",
  "            continue;        // K in [-3N, 3N]",
  "        }",
  "        set<long long> mags;",
  "        long long magSum = 0;",
  "        bool ok = true;",
  "        for (long long x : a) {",
  "            long long m = llabs(x - K);",
  "            if (m < 1 || m > N) {",
  "                ok = false;",
  "                break;",
  "            }",
  "            mags.insert(m);",
  "            magSum += m;",
  "        }",
  "        // 맞는 경우 — 크기가 서로 다른 N-1 개이고 전부 1 부터 N 사이예요",
  "        if (ok && (int)mags.size() == N - 1)",
  "            ans += total - magSum;",
  "    }",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY 는 위 배열을 그대로 쓴다 — 한 글자도 안 바꿨다.
   getMcc20MissingSections() 는 PDF 다운로드가 계속 쓰므로 그대로 둔다.
   MCC 는 C++ 이 필요 없다(선생님 "MCC는 c++ 다 없애줘") — 파이썬만 보여준다. */
export function getMcc20MissingWalk(E) {
  return {
    code: FULL_PY,
    vars: [
      { v: "candidates", ko: "시험해 볼 K 후보 네 개", en: "the four K candidates to test" },
      { v: "mags", ko: "K 를 되돌려 복원한 크기들", en: "magnitudes recovered by undoing K" },
      { v: "ans", ko: "찾은 빠진 값들의 합", en: "sum of missing values found" },
    ],
    beats: [
      { hi: [0, 3], bubble: t(E,
        "What should we output? The number erased before shuffling. This contest has no fixed input format — N and the shuffled array a are given as fixed values.",
        "무엇을 출력해야 하나요? 뒤섞이기 전 지워진 수예요.\n이 대회는 입력 형식이 따로 없어요 — N 과 뒤섞인 배열 a 가 값으로 주어져요.") },
      { hi: [4, 9], bubble: t(E,
        "If N is 1 there's nothing to compare — the missing number must be 1. Otherwise get ready: total is the sum of 1..N, mn/mx are the array's smallest/largest values, and lim is the range K can fall in.",
        "N 이 1 이면 비교할 것도 없이 빠진 수는 1 이에요.\n아니면 준비해요 — total 은 1..N 의 합, mn/mx 는 배열의 최소·최대값, lim 은 K 가 가질 수 있는 범위예요.") },
      { hi: [11, 14], bubble: t(E,
        "The four candidate K we worked out on the previous page become one line: {mn+N, mx−N, mn+(N−1), mx−(N−1)}. Instead of testing all 6N+1 values of K, we test just these four.",
        "앞 쪽에서 찾은 후보 네 개가 코드에서는 한 줄이에요 — {mn+N, mx−N, mn+(N−1), mx−(N−1)}.\nK 를 6N+1 개 다 보는 대신 이 넷만 확인해요.") },
      { hi: [16, 23], bubble: t(E,
        "For each candidate K (staying inside [−3N, 3N]), undo it with |x−K| to recover the original magnitudes. It's a valid reconstruction only if the N−1 magnitudes are all different and all inside [1, N] — then the missing value is total − sum(mags), added into the answer.",
        "후보 K 마다(단 [−3N, 3N] 안에서만) |x−K| 로 되돌려 원래 크기들을 복원해요.\nN−1 개가 모두 서로 다르고 전부 [1, N] 안에 있어야만 올바른 복원이고, 그때 빠진 값은 total − sum(mags) 예요 — 이걸 답에 더해요.") },
      { hi: [24, 24], bubble: t(E,
        "Print the total found across every valid K.",
        "찾은 값들을 다 더한 걸 출력해요.") },
    ],
  };
}

export function getMcc20MissingSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        /* 2026-09-17: 앞 쪽에서 그림으로 유도한 것을 여기서 다시 글로 풀어 쓰고 있었다.
           같은 결론이 네 번째였다. 여기서는 그 결론을 코드 한 줄로만 가리킨다. */
        t(E,
          "The four candidate K we worked out on the previous page become one line: {mn+N, mx−N, mn+(N−1), mx−(N−1)}.",
          "앞 쪽에서 찾은 후보 네 개가 코드에서는 한 줄이에요. {mn+N, mx−N, mn+(N−1), mx−(N−1)} 이에요."),
        /* 2026-09-17: 98·80 자가 한 덩어리였다. Stepper 는 \n 을 뭉개니 항목을 나눈다. */
        t(E,
          "Instead of all 6N+1 values of K, we test just these four.",
          "K 를 6N+1 개 다 보는 대신 이 넷만 확인해요."),
        t(E,
          "For a candidate K, undo it with |x−K| to recover the original magnitudes.",
          "후보 K 마다 |x−K| 로 되돌려 원래 크기들을 복원해요."),
        t(E,
          "It is a valid reconstruction only if the N−1 magnitudes are all different and all inside [1, N].",
          "N−1 개가 모두 서로 다르고, 전부 [1, N] 안에 있어야만 올바른 복원이에요."),
        /* 2026-09-17: 109 자가 한 덩어리였다 + "total" 이 무엇인지 안 말했다. 항목을 나눈다. */
        t(E,
          "When valid, the one value of 1..N not among those magnitudes is the missing number.",
          "복원이 맞으면, 1..N 중 그 크기들에 없는 하나가 바로 빠진 숫자예요."),
        t(E,
          "We get it as (sum of 1..N) − (sum of the recovered magnitudes) = total − sum(mags).",
          "그 수는 (1..N 의 합) − (되돌린 크기들의 합) 이에요. 코드에서는 total − sum(mags) 예요."),
        t(E,
          "Add it up over every valid K — a repeated missing value counts again for each K.",
          "맞는 K 마다 이 값을 더해요. 같은 값이라도 K 가 다르면 다시 세어요."),
        t(E,
          "Guard: K must stay in [−3N, 3N]; skip any candidate outside that range.",
          "한 가지 더 확인해요. K 는 반드시 [−3N, 3N] 안에 있어야 하고, 벗어난 후보는 건너뛰어요."),
      ],
      pyOnly: [
        t(E, "len(set(mags)) == N − 1 checks 'all distinct' in one line; sum(mags) recovers the leftover value.",
            "len(set(mags)) == N − 1 로 '모두 다름' 을 한 줄에 확인하고, sum(mags) 로 남은 값을 되찾아요."),
      ],
      cppOnly: [
        t(E, "A set<long long> gives both distinctness (size == N−1) and lets llabs(x − K) fill it; use long long since values reach ~4N.",
            "set<long long> 하나로 '서로 다름'(size == N−1) 을 확인하고 llabs(x − K) 로 채워요. 값이 ~4N 까지 가니 long long 을 써요."),
      ],
    },
  ];
}

export function Mcc20MissingProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadMcc20MissingPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20Missing — Full Study Guide", "Mcc20Missing — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 선택해요.")}</div>
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
