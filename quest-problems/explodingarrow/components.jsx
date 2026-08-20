import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

const FULL_PY = [
  "import sys",
  "from math import isqrt",
  "",
  "def solve(N, M, K, a):",
  "    # X 가 커질수록 쉬워짐 → 정답 X 를 이분 탐색",
  "    hi = 1",
  "    for j in range(N):",
  "        need = (a[j] + j*j + M - 1) // M   # j 를 혼자 없앨 최소 X",
  "        if need > hi:",
  "            hi = need",
  "    lo = 1",
  "",
  "    def feasible(X):                       # 화살 K 개로 X 가 될까?",
  "        MX = M * X",
  "        L = isqrt(MX - 1)                  # 데미지가 닿는 최대 거리 (d*d < M*X)",
  "        if L > N - 1:",
  "            L = N - 1",
  "        VAL = [0]*(N+1); D1 = [0]*(N+1); D2 = [0]*(N+1)",
  "        val = 0; slope = 0; accel = 0; used = 0",
  "        for x in range(N):",
  "            if x > 0:",
  "                val += slope; slope += accel",
  "            val += VAL[x]; slope += D1[x]; accel += D2[x]",
  "            deficit = a[x] - val           # 아직 남은 체력",
  "            if deficit > 0:",
  "                c = (deficit + MX - 1) // MX   # 여기서 쏠 화살 수",
  "                used += c",
  "                if used > K:",
  "                    return False",
  "                val += c*MX; slope += -c; accel += -2*c",
  "                p = x + L + 1              # 이 포물선이 끝나는 위치",
  "                if p <= N - 1:",
  "                    VAL[p] += c*((L+1)*(L+1) - MX)",
  "                    D1[p]  += c*(2*L + 3)",
  "                    D2[p]  += 2*c",
  "        return True",
  "",
  "    while lo < hi:                         # 이분 탐색: 가능한 가장 작은 X",
  "        mid = (lo + hi) // 2",
  "        if feasible(mid):",
  "            hi = mid",
  "        else:",
  "            lo = mid + 1",
  "    return lo",
  "",
  "data = sys.stdin.read().split()",
  "N, M, K = int(data[0]), int(data[1]), int(data[2])",
  "a = [int(x) for x in data[3:3+N]]",
  "print(solve(N, M, K, a))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <cmath>",
  "using namespace std;",
  "",
  "int N; long long M, K;",
  "vector<long long> a;",
  "",
  "long long isqrtll(long long v) {          // 정수 제곱근",
  "    long long r = (long long)sqrtl((long double)v);",
  "    while (r > 0 && r*r > v) r--;",
  "    while ((r+1)*(r+1) <= v) r++;",
  "    return r;",
  "}",
  "",
  "bool feasible(long long X) {               // 화살 K 개로 X 가 될까?",
  "    long long MX = M * X;",
  "    long long L = isqrtll(MX - 1);         // 데미지가 닿는 최대 거리",
  "    if (L > N - 1) L = N - 1;",
  "    vector<long long> VAL(N+1,0), D1(N+1,0), D2(N+1,0);",
  "    long long val=0, slope=0, accel=0, used=0;",
  "    for (int x = 0; x < N; x++) {",
  "        if (x > 0) { val += slope; slope += accel; }",
  "        val += VAL[x]; slope += D1[x]; accel += D2[x];",
  "        long long deficit = a[x] - val;    // 아직 남은 체력",
  "        if (deficit > 0) {",
  "            long long c = (deficit + MX - 1) / MX;  // 여기서 쏠 화살 수",
  "            used += c;",
  "            if (used > K) return false;",
  "            val += c*MX; slope += -c; accel += -2*c;",
  "            long long p = x + L + 1;        // 이 포물선이 끝나는 위치",
  "            if (p <= N - 1) {",
  "                VAL[p] += c*((L+1)*(L+1) - MX);",
  "                D1[p]  += c*(2*L + 3);",
  "                D2[p]  += 2*c;",
  "            }",
  "        }",
  "    }",
  "    return true;",
  "}",
  "",
  "int main() {",
  "    cin >> N >> M >> K;",
  "    a.resize(N);",
  "    long long hi = 1;",
  "    for (int j = 0; j < N; j++) {",
  "        cin >> a[j];",
  "        long long need = (a[j] + (long long)j*j + M - 1) / M;",
  "        if (need > hi) hi = need;",
  "    }",
  "    long long lo = 1;",
  "    while (lo < hi) {                       // 이분 탐색: 가능한 가장 작은 X",
  "        long long mid = (lo + hi) / 2;",
  "        if (feasible(mid)) hi = mid;",
  "        else lo = mid + 1;",
  "    }",
  "    cout << lo << \"\\n\";",
  "    return 0;",
  "}",
];

const SEC1_PY = [
  "import sys",
  "from math import isqrt",
  "",
  "def solve(N, M, K, a):",
  "    # X 가 커질수록 쉬워짐 → 정답 X 를 이분 탐색",
  "    hi = 1",
  "    for j in range(N):",
  "        need = (a[j] + j*j + M - 1) // M   # j 를 혼자 없앨 최소 X",
  "        if need > hi:",
  "            hi = need",
  "    lo = 1",
  "",
  "    # ... feasible(X) 는 아래 ② 에서 ...",
  "",
  "    while lo < hi:                         # 이분 탐색: 가능한 가장 작은 X",
  "        mid = (lo + hi) // 2",
  "        if feasible(mid):",
  "            hi = mid",
  "        else:",
  "            lo = mid + 1",
  "    return lo",
  "",
  "data = sys.stdin.read().split()",
  "N, M, K = int(data[0]), int(data[1]), int(data[2])",
  "a = [int(x) for x in data[3:3+N]]",
  "print(solve(N, M, K, a))",
];

const SEC2_PY = [
  "    def feasible(X):                       # 화살 K 개로 X 가 될까?",
  "        MX = M * X",
  "        L = isqrt(MX - 1)                  # 데미지가 닿는 최대 거리 (d*d < M*X)",
  "        if L > N - 1:",
  "            L = N - 1",
  "        VAL = [0]*(N+1); D1 = [0]*(N+1); D2 = [0]*(N+1)",
  "        val = 0; slope = 0; accel = 0; used = 0",
  "        for x in range(N):",
  "            if x > 0:",
  "                val += slope; slope += accel",
  "            val += VAL[x]; slope += D1[x]; accel += D2[x]",
  "            deficit = a[x] - val           # 아직 남은 체력",
  "            if deficit > 0:",
  "                c = (deficit + MX - 1) // MX   # 여기서 쏠 화살 수",
  "                used += c",
  "                if used > K:",
  "                    return False",
  "                val += c*MX; slope += -c; accel += -2*c",
  "                p = x + L + 1              # 이 포물선이 끝나는 위치",
  "                if p <= N - 1:",
  "                    VAL[p] += c*((L+1)*(L+1) - MX)",
  "                    D1[p]  += c*(2*L + 3)",
  "                    D2[p]  += 2*c",
  "        return True",
];

const SEC1_CPP = [
  "int N; long long M, K;",
  "vector<long long> a;",
  "",
  "// feasible(X) 는 아래 ② 에서 정의",
  "bool feasible(long long X);",
  "",
  "int main() {",
  "    cin >> N >> M >> K;",
  "    a.resize(N);",
  "    long long hi = 1;",
  "    for (int j = 0; j < N; j++) {",
  "        cin >> a[j];",
  "        long long need = (a[j] + (long long)j*j + M - 1) / M;",
  "        if (need > hi) hi = need;",
  "    }",
  "    long long lo = 1;",
  "    while (lo < hi) {                       // 이분 탐색: 가능한 가장 작은 X",
  "        long long mid = (lo + hi) / 2;",
  "        if (feasible(mid)) hi = mid;",
  "        else lo = mid + 1;",
  "    }",
  "    cout << lo << \"\\n\";",
  "    return 0;",
  "}",
];

const SEC2_CPP = [
  "bool feasible(long long X) {               // 화살 K 개로 X 가 될까?",
  "    long long MX = M * X;",
  "    long long L = isqrtll(MX - 1);         // 데미지가 닿는 최대 거리",
  "    if (L > N - 1) L = N - 1;",
  "    vector<long long> VAL(N+1,0), D1(N+1,0), D2(N+1,0);",
  "    long long val=0, slope=0, accel=0, used=0;",
  "    for (int x = 0; x < N; x++) {",
  "        if (x > 0) { val += slope; slope += accel; }",
  "        val += VAL[x]; slope += D1[x]; accel += D2[x];",
  "        long long deficit = a[x] - val;    // 아직 남은 체력",
  "        if (deficit > 0) {",
  "            long long c = (deficit + MX - 1) / MX;  // 여기서 쏠 화살 수",
  "            used += c;",
  "            if (used > K) return false;",
  "            val += c*MX; slope += -c; accel += -2*c;",
  "            long long p = x + L + 1;        // 이 포물선이 끝나는 위치",
  "            if (p <= N - 1) {",
  "                VAL[p] += c*((L+1)*(L+1) - MX);",
  "                D1[p]  += c*(2*L + 3);",
  "                D2[p]  += 2*c;",
  "            }",
  "        }",
  "    }",
  "    return true;",
  "}",
];

export function getExplodingArrowSections(E) {
  return [
    {
      label: t(E, "① Binary-search the answer X", "① 정답 X 를 이분 탐색"),
      color: A,
      py: SEC1_PY, cpp: SEC1_CPP,
      why: [
        t(E, "We don't test damage — we test the ANSWER. 'Can arrows of power X finish the job with ≤ K arrows?' is easier: bigger X → easier, so the yes/no flips exactly once. Binary-search that boundary.",
            "데미지를 시험하는 게 아니라 정답 X 를 시험해요. '힘 X 짜리 화살로 K 개 안에 다 끝낼 수 있나?' 는 판단이 쉬워요 — X 가 커질수록 쉬워지니 '예/아니오' 가 딱 한 번 뒤집혀요. 그 경계를 이분 탐색해요."),
        t(E, "hi starts big enough: (a[j] + j*j + M - 1)//M is the smallest X that could kill target j all by itself — the true answer never exceeds the largest of these.",
            "hi 는 충분히 크게: (a[j] + j*j + M - 1)//M 은 j 를 혼자서 없앨 최소 X 예요 — 정답은 이 값들 중 최댓값을 넘지 않아요."),
      ],
      pyOnly: [
        t(E, "feasible(mid) True → the answer is ≤ mid, so pull hi down; False → push lo up. lo == hi is the smallest feasible X.",
            "feasible(mid) 가 True 면 정답 ≤ mid 이니 hi 를 내리고, False 면 lo 를 올려요. lo == hi 가 가능한 가장 작은 X."),
      ],
      cppOnly: [
        t(E, "long long everywhere: M, K, a[i] reach 1e9 and M*X can overflow 32-bit ints.",
            "전부 long long: M, K, a[i] 가 1e9 까지라 M*X 는 32비트를 넘칠 수 있어요."),
      ],
    },
    {
      label: t(E, "② feasible(X) in O(N): greedy + difference array", "② feasible(X) 를 O(N) 로: 그리디 + 차분 배열"),
      color: "#7c3aed",
      py: SEC2_PY, cpp: SEC2_CPP,
      why: [
        t(E, "Sweep left to right. A target still alive here MUST be finished by an arrow fired at or before it — and firing right HERE reaches the farthest to the right, so it's never worse. Fire exactly ⌈deficit / (M·X)⌉ arrows on the spot.",
            "왼쪽부터 훑어요. 지금 살아있는 표적은 반드시 여기(또는 그 전)에서 쏜 화살로 끝내야 해요 — 그런데 바로 여기서 쏘면 오른쪽으로 가장 멀리 닿으니 절대 손해가 아니에요. 그 자리에서 정확히 ⌈deficit / (M·X)⌉ 발을 쏴요."),
        t(E, "An arrow's damage max(0, M·X − d²) is a parabola in the distance d. Adding a parabola to a range is O(1) with a 2nd-order difference array: val/slope/accel roll it forward, and one cancellation event at p = x+L+1 clamps the tail to 0. Whole check: O(N).",
            "화살의 데미지 max(0, M·X − d²) 는 거리 d 에 대한 포물선이에요. 포물선을 구간에 더하는 건 2차 차분 배열로 O(1): val/slope/accel 이 앞으로 굴려주고, p = x+L+1 에서 취소 이벤트 하나로 꼬리를 0 으로 잘라요. 검사 전체가 O(N)."),
      ],
      pyOnly: [
        t(E, "used > K means even this greedy (which is optimal) can't do it → X is too small, return False.",
            "used > K 면 최적인 이 그리디로도 안 된다는 뜻 → X 가 너무 작아요, False 반환."),
      ],
      cppOnly: [
        t(E, "isqrtll gives L = ⌊√(M·X−1)⌋, the largest distance where M·X − d² is still positive.",
            "isqrtll 이 L = ⌊√(M·X−1)⌋ 을 줘요 — M·X − d² 이 아직 양수인 가장 먼 거리예요."),
      ],
    },
  ];
}

export function ExplodingArrowProgressiveCode(props) {
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


export function downloadExplodingArrowPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "ExplodingArrow — Full Study Guide", "ExplodingArrow — 종합 풀이 노트");
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

