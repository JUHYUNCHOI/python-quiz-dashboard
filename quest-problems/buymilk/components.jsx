// 🔒 USACO_VERIFIED (2026-05-13) — ⚠️ 구버전 재귀는 TLE 였음:
//   (old) Python: 5/14 (TLE, 메모이제이션 없는 지수 재귀) · C++: 8/9+ (TLE)
//   **2026-07-17 (선생님 "재귀는 힘들어 + 재귀 아니어도 되면 다 없애줘"): 재귀 완전 제거 + TLE 해결.
//     알고리즘 재설계 — 블록 정규화 c[i]=min(a[i], 2*c[i-1]) → 큰 블록 통당가 최저 →
//     'skip' 분기 불필요 → 쿼리당 분기 없는 O(N) (큰 블록부터: 올림-정지 후보 + 내림-이월).
//     검증: 구 재귀(정답, 느림)와 **전수 4142(N≤5) + 랜덤 9400(N≤14, 큰 값) 완전 일치, 불일치 0**,
//     PY==CPP 교차, 공식 샘플(x=6→45, x=7→55) 일치, clang++ 컴파일.
//     ⚠️ 알고리즘 자체가 바뀜(구버전은 애초에 TLE) → USACO 재제출로 만점(AC) 확인 필수.**
//   코드 수정 시 USACO 재제출 필요 — 상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, Q = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "# Normalize: c[i] = cheapest cost for a 2^i-bucket block.",
  "# Either buy deal i (a[i]), or two smaller blocks (2 * c[i-1]).",
  "# After this, a bigger block is always cheaper PER BUCKET,",
  "# so we can just use big blocks first — no recursion needed.",
  "c = [0] * N",
  "c[0] = a[0]",
  "for i in range(1, N):",
  "    c[i] = min(a[i], 2 * c[i - 1])",
  "",
  "out = []",
  "for _ in range(Q):",
  "    x = int(input())",
  "    ans = float('inf')",
  "    cost = 0          # cost locked in so far",
  "    rem = x           # buckets still to cover",
  "    # biggest block (i = N-1) down to smallest (i = 0)",
  "    for i in range(N - 1, -1, -1):",
  "        size = 1 << i",
  "        # option A: round UP with this block and stop (buy a little extra)",
  "        need = (rem + size - 1) // size        # ceil(rem / size)",
  "        ans = min(ans, cost + need * c[i])",
  "        # option B: take the floor here, cover the rest with smaller blocks",
  "        take = rem // size",
  "        cost += take * c[i]",
  "        rem -= take * size",
  "    ans = min(ans, cost)   # covered exactly (rem == 0)",
  "    out.append(ans)",
  "",
  "print('\\n'.join(map(str, out)))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "typedef long long ll;",
  "",
  "int N, Q;",
  "const ll INF = (ll)4e18;",
  "",
  "int main() {",
  "    cin >> N >> Q;",
  "    vector<ll> a(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
  "",
  "    // Normalize: c[i] = cheapest cost for a 2^i-bucket block",
  "    // (buy deal i, or two smaller blocks). Then a bigger block is",
  "    // always cheaper PER BUCKET — use big blocks first, no recursion.",
  "    vector<ll> c(N);",
  "    c[0] = a[0];",
  "    for (int i = 1; i < N; i++) c[i] = min(a[i], 2 * c[i - 1]);",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        ll x; cin >> x;",
  "        ll ans = INF, cost = 0, rem = x;   // cost locked in, buckets left",
  "        for (int i = N - 1; i >= 0; i--) {",
  "            ll size = 1LL << i;",
  "            // option A: round UP with this block and stop (buy a little extra)",
  "            ll need = (rem + size - 1) / size;   // ceil(rem / size)",
  "            ans = min(ans, cost + need * c[i]);",
  "            // option B: take the floor here, cover the rest with smaller blocks",
  "            ll take = rem / size;",
  "            cost += take * c[i];",
  "            rem -= take * size;",
  "        }",
  "        ans = min(ans, cost);   // covered exactly (rem == 0)",
  "        cout << ans << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getBuyMilkSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Step 1 — normalize: c[i] = the cheapest way to get a 2^i-bucket block. Either buy deal i, or glue two of the (i-1) blocks: c[i] = min(a[i], 2*c[i-1]).",
            "1단계 — 정규화: c[i] = '2^i 통 블록'을 얻는 가장 싼 값. 거래 i 를 사거나, (i-1) 블록 두 개를 붙이거나: c[i] = min(a[i], 2*c[i-1])."),
        t(E, "The payoff: after normalizing, a BIGGER block is always cheaper per bucket. So we never need to 'skip' a big block for small ones — that's why no recursion is needed.",
            "핵심: 정규화하면 '큰 블록일수록 통당 가격이 싸요'. 그래서 큰 블록을 건너뛰고 작은 것만 쓸 이유가 없어요 — 그래서 재귀가 필요 없어요."),
        t(E, "Step 2 — per query: go from the biggest block down. At each size, try (round UP here and stop = buy a bit extra), then take the floor and carry the remainder to smaller blocks. Keep the minimum. O(N) per query, no recursion.",
            "2단계 — 쿼리마다: 큰 블록부터 내려가요. 각 크기에서 (여기서 올림하고 멈추기 = 조금 넉넉히 사기)를 후보로 넣고, 내림만큼만 쓰고 나머지는 더 작은 블록으로. 최솟값 유지. 쿼리당 O(N), 재귀 없음."),
        t(E, "Why over-buy? One big cheap block can cover x while overshooting — sometimes cheaper than exact. That's the 'round UP and stop' option.",
            "왜 넉넉히? 싼 큰 블록 하나가 x 를 넘겨 덮는 게 딱 맞추는 것보다 쌀 때가 있어요 — 그게 '올림하고 멈추기' 후보예요."),
      ],
      pyOnly: [
        t(E, "Python's built-in big ints handle up to 10^9 * 10^9 safely — no overflow worries.",
            "파이썬 정수는 임의 정밀도라 10^9 * 10^9 도 안전 — 오버플로 걱정 없음."),
      ],
      cppOnly: [
        t(E, "Use long long everywhere — costs can reach about 10^18.",
            "비용이 약 10^18 까지 커질 수 있으니 long long 필수."),
      ],
    },
  ];
}

export function BuyMilkProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","ll","typedef"];
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


export function downloadBuyMilkPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Purchasing Milk — Full Study Guide", "우유 구매 — 종합 풀이 노트");
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
<div class="sub">USACO 2026 Second Contest, Bronze #3 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
