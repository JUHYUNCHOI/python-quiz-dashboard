import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

export function getSumKSections(E) {
  return [
    {
      label: t(E, "📥 Read input + binomials C(t,j)", "📥 입력 읽기 + 이항계수 C(t,j)"),
      color: A,
      py: [
        "MOD = 998244353",
        "n, K = map(int, input().split())",
        "A = list(map(int, input().split()))",
        "# 이항계수 C[t][j] 미리 계산 (파스칼의 삼각형)",
        "C = [[0]*(K+1) for _ in range(K+1)]",
        "for t in range(K+1):",
        "    C[t][0] = 1",
        "    for j in range(1, t+1):",
        "        C[t][j] = (C[t-1][j-1] + C[t-1][j]) % MOD",
      ],
      cpp: [
        "#include <iostream>",
        "#include <vector>",
        "using namespace std;",
        "const long long MOD = 998244353;",
        "",
        "int main() {",
        "    long long N, K;",
        "    cin >> N >> K;",
        "    // 이항계수 C[t][j]",
        "    vector<vector<long long>> C(K+1, vector<long long>(K+1, 0));",
        "    for (int t = 0; t <= K; t++) {",
        "        C[t][0] = 1;",
        "        for (int j = 1; j <= t; j++)",
        "            C[t][j] = (C[t-1][j-1] + C[t-1][j]) % MOD;",
        "    }",
      ],
      why: [
        t(E, "Answers get huge, so everything is done modulo 998244353 (% MOD on every step).",
            "답이 매우 커질 수 있어서 모든 계산을 998244353 로 나눈 나머지로 해요. 매 단계마다 % MOD 를 붙여요."),
        t(E, "Precompute binomial coefficients C(t,j) with Pascal's triangle — we need them to expand (old sum + a)^t.",
            "이항계수 C(t,j) 를 파스칼의 삼각형으로 미리 계산해 둬요. (옛합 + a)^t 를 펼칠 때 필요하거든요."),
      ],
      pyOnly: [
        t(E, "A 2-D list holds the C table; slicing/indexing keeps it readable.",
            "2차원 리스트로 C 표를 만들어요 — 자리를 찾는 모양이 그대로 읽혀요."),
      ],
      cppOnly: [
        t(E, "vector<vector<long long>> for the C table; long long avoids overflow before the mod.",
            "vector<vector<long long>> 로 C 표를 만들어요. long long 이라 나머지를 구하기 전에 값이 넘치지 않아요."),
      ],
    },
    {
      label: t(E, "🎒 Keep P[t]", "🎒 P[t] 유지"),
      color: A,
      py: [
        "# P[t] = 지금까지 부분집합들의 (합)^t 합 (공집합 포함)",
        "P = [0]*(K+1)",
        "P[0] = 1",
      ],
      cpp: [
        "    vector<long long> P(K+1, 0);",
        "    P[0] = 1;                 // 원소 0개 = 공집합만",
      ],
      why: [
        t(E, "P[t] = the sum of (subset sum)^t over every subset made so far. Getting this definition exactly right is the whole trick.",
            "P[t] 는 지금까지 만든 모든 부분집합의 (합)^t 를 더한 값이에요. 이 뜻을 정확히 잡는 게 핵심이에요."),
        t(E, "With zero elements there's only the empty subset (sum 0). Treat zero to the zeroth power as 1, so P[0] = 1 to start.",
            "원소가 0개면 공집합 하나뿐이고 그 합은 0 이에요. 0의 0제곱은 1로 보고 P[0] = 1 로 시작해요."),
      ],
      pyOnly: [
        t(E, "A flat list of size K+1 is all the state we ever carry.",
            "크기 K+1 짜리 리스트 하나가 우리가 적어 두는 것 전부예요."),
      ],
      cppOnly: [
        t(E, "One vector<long long> of size K+1 — tiny memory even for big N.",
            "크기 K+1 짜리 vector<long long> 하나뿐이라, N 이 커도 메모리를 아주 조금만 써요."),
      ],
    },
    {
      label: t(E, "➕ Update per element (binomial theorem)", "➕ 원소마다 새로 고치기 (이항정리)"),
      color: A,
      py: [
        "for a in A:",
        "    a %= MOD",
        "    pw = [1]*(K+1)              # a^0 .. a^K",
        "    for t in range(1, K+1):",
        "        pw[t] = pw[t-1]*a % MOD",
        "    np = [0]*(K+1)",
        "    for t in range(K+1):",
        "        with_a = 0             # a 를 넣은 부분집합의 기여",
        "        for j in range(t+1):",
        "            with_a = (with_a + C[t][j]*pw[t-j] % MOD * P[j]) % MOD",
        "        np[t] = (P[t] + with_a) % MOD",
        "    P = np",
      ],
      cpp: [
        "    for (int e = 0; e < N; e++) {",
        "        long long a;",
        "        cin >> a;",
        "        a %= MOD;",
        "        vector<long long> pw(K+1);   // a^0..a^K",
        "        pw[0] = 1;",
        "        for (int t = 1; t <= K; t++)",
        "            pw[t] = pw[t-1] * a % MOD;",
        "        vector<long long> np(K+1);",
        "        for (int t = 0; t <= K; t++) {",
        "            long long with_a = 0;",
        "            for (int j = 0; j <= t; j++)",
        "                with_a = (with_a + C[t][j] * pw[t-j] % MOD * P[j]) % MOD;",
        "            np[t] = (P[t] + with_a) % MOD;",
        "        }",
        "        P = np;",
        "    }",
      ],
      why: [
        t(E, "Add one element a. Each existing subset splits two ways: without a (old P[t] stays) or with a (its sum becomes old sum + a).",
            "원소 a 를 하나 넣어요. 기존 부분집합은 'a 없이'(옛 P[t] 그대로) 와 'a 포함'(합이 옛합+a) 두 갈래로 갈려요."),
        /* 2026-09-10 학생: "Σ (시그마) 기호가 여기서 처음 나오는데, 이게 반복해서 더하라는
           뜻이라고 아무도 안 알려줬다. 짐작으로 넘어감." — 안 배운 기호다. 말로 푼다. */
        t(E, "Expand (old sum + a)^t the way we split (1+2)² by hand. Run j from 0 to t and add up every piece C(t,j)·a^(t-j)·P[j].",
            "(옛합+a)^t 를 아까 (1+2)² 펼치던 것처럼 갈라요. j 를 0부터 t 까지 바꿔가며 조각 C(t,j)·a^(t-j)·P[j] 를 다 더해요."),
        t(E, "So new P[t] = old P[t] + (contribution of subsets that include a). Take % MOD on every product.",
            "그래서 새 P[t] 는 옛 P[t] 에 'a 를 포함한 부분집합' 몫을 더한 값이에요. 곱할 때마다 % MOD 를 해요."),
      ],
      pyOnly: [
        t(E, "pw caches a^0 … a^K so the inner loop just reuses them.",
            "pw 에 a^0 … a^K 를 미리 계산해 두고 안쪽 반복문에서 다시 써요."),
      ],
      cppOnly: [
        t(E, "Three factors are multiplied in with_a, so mod in the middle even with long long.",
            "with_a 에서 곱이 세 개라, long long 이라도 중간에 % MOD 를 꼭 해야 해요."),
      ],
    },
    {
      label: t(E, "🏁 Print P[K]", "🏁 P[K] 출력"),
      color: A,
      py: [
        "print(P[K] % MOD)",
      ],
      cpp: [
        "    cout << P[K] % MOD << \"\\n\";",
        "    return 0;",
        "}",
      ],
      why: [
        t(E, "After adding all N elements, P[K] is the answer.",
            "N 개 원소를 다 넣고 나면 P[K] 가 정답이에요."),
        t(E, "For K ≥ 1 the empty subset scores zero to the Kth power, which is 0, so it drops out of the total on its own.",
            "K 가 1 이상이면 공집합 점수는 0의 K제곱, 즉 0 이라, 따로 빼지 않아도 답에 안 들어가요."),
        t(E, "Complexity O(N·K²) — fits both subtasks (N up to 10⁵ with small K, or N,K up to 200).",
            "복잡도는 O(N·K²) 라 두 서브태스크 모두 넉넉해요 (N 최대 10⁵ 에 K 가 작거나, N·K 가 최대 200)."),
      ],
      pyOnly: [
        t(E, "One final print — no extra formatting needed.",
            "마지막 print 한 줄이면 끝이에요. 모양을 따로 맞출 필요가 없어요."),
      ],
      cppOnly: [
        t(E, "One cout with a trailing newline; return 0.",
            "cout 한 줄에 줄바꿈을 붙이고 return 0 으로 끝내요."),
      ],
    },
  ];
}

// CodeWalk — 코드 위 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙).
// 4섹션이 하나의 연속 프로그램이라 그대로 이어 붙임. 코드 문자열은 그대로.
const _SK_VARS = [
  { v: "n", ko: "원소 개수", en: "how many numbers" },
  { v: "K", ko: "거듭제곱 지수", en: "the exponent" },
  { v: "P", ko: "부분집합 (합)^t 합", en: "subset power-sums" },
  { v: "C", ko: "이항계수", en: "binomial coeffs" },
];
export function getSumkWalk(E, lang = "py") {
  const s = getSumKSections(E);
  if (lang === "cpp") {
    const code = [...s[0].cpp, ...s[1].cpp, ...s[2].cpp, ...s[3].cpp];
    // s0=15 (0-14), s1=2 (15-16), s2=14 (17-30), s3=3 (31-33)
    return { code, vars: _SK_VARS, beats: [
      { hi: [0, 7],   bubble: t(E, "What must we hand back? The sum of (subset sum)^K over every subset,\nmod 998244353. There are 2ᴺ subsets — too many to list — so we grow\nthe answer one number at a time instead. Fix MOD, then read N and K.", "무엇을 내놓아야 하나요?\n부분집합마다 (합)^K 를 더해 998244353 로 나눈 값이에요.\n2ᴺ 개라 나열은 못 하니, 숫자를 하나씩 담으며 답을 키워요.\n먼저 MOD 를 정하고 N, K 를 읽어요.") },
      { hi: [8, 14],  bubble: t(E, "We'll need C(t,j) later to expand with the binomial theorem.\nBuild it now with Pascal's triangle —\neach cell is the two cells above it, added.", "이따가 이항정리로 펼칠 때 C(t,j) 가 필요해요.\n미리 파스칼의 삼각형으로 만들어 둬요.\n한 칸은 바로 위 두 칸을 더한 값이에요.") },
      { hi: [15, 16], bubble: t(E, "Define P[t] = the sum of (subset sum)^t over every subset made\nso far — the answer we want in the end is P[K].\nWith zero elements only the empty subset exists (sum 0; zero to the zeroth power is 1),\nso start with P[0] = 1.", "P[t] 를 지금까지 담은 부분집합들의 (합)^t 합으로 정해요.\n우리가 구할 답은 결국 P[K] 예요.\n원소가 0개면 공집합(합 0)뿐이고 0의 0제곱은 1이라, P[0] = 1 로 시작해요.") },
      { hi: [17, 33], bubble: t(E, "Add one element a at a time. Subsets split two ways —\nwithout a (old P[t] stays), with a (sum becomes old sum + a).\nExpand (old sum + a)^t via the binomial theorem: add every\npiece C(t,j)·a^(t-j)·P[j] for j = 0..t (pw caches a's powers).", "원소 a 를 하나씩 담아요. 부분집합은 두 갈래로 갈려요.\na 를 안 담은 쪽은 옛 P[t] 그대로, 담은 쪽은 합이 옛합+a 예요.\n(옛합+a)^t 를 이항정리로 펼쳐 j=0..t 조각을 다 더해요.\npw 로 a 의 거듭제곱을 미리 구해두고, 두 쪽을 합치면 새 P[t].") },
      { hi: [34, 36], bubble: t(E, "After all N elements are in, P[K] is the answer.\nFor K ≥ 1 the empty subset scores zero to the Kth power, which is 0, so it drops out on its own.", "N 개를 다 담으면 P[K] 가 답이에요.\nK 가 1 이상이면 공집합(0의 K제곱, 즉 0)은 저절로 빠져요.") },
    ] };
  }
  const code = [...s[0].py, ...s[1].py, ...s[2].py, ...s[3].py];
  // s0=9 (0-8), s1=3 (9-11), s2=12 (12-23), s3=1 (24)
  return { code, vars: _SK_VARS, beats: [
    { hi: [0, 2],   bubble: t(E, "What must we hand back? The sum of (subset sum)^K over every subset,\nmod 998244353. There are 2ᴺ subsets — too many to list — so we grow\nthe answer one number at a time instead. Fix MOD, then read n, K, the array.", "무엇을 내놓아야 하나요?\n부분집합마다 (합)^K 를 더해 998244353 로 나눈 값이에요.\n2ᴺ 개라 나열은 못 하니, 숫자를 하나씩 담으며 답을 키워요.\n먼저 MOD 를 정하고 n, K, 배열을 읽어요.") },
    { hi: [3, 8],   bubble: t(E, "We'll need C(t,j) later to expand with the binomial theorem.\nBuild it now with Pascal's triangle —\neach cell is the two cells above it, added.", "이따가 이항정리로 펼칠 때 C(t,j) 가 필요해요.\n미리 파스칼의 삼각형으로 만들어 둬요.\n한 칸은 바로 위 두 칸을 더한 값이에요.") },
    { hi: [9, 11],  bubble: t(E, "Define P[t] = the sum of (subset sum)^t over every subset made\nso far — the answer we want in the end is P[K].\nWith zero elements only the empty subset exists (sum 0; zero to the zeroth power is 1),\nso start with P[0] = 1.", "P[t] 를 지금까지 담은 부분집합들의 (합)^t 합으로 정해요.\n우리가 구할 답은 결국 P[K] 예요.\n원소가 0개면 공집합(합 0)뿐이고 0의 0제곱은 1이라, P[0] = 1 로 시작해요.") },
    { hi: [12, 23], bubble: t(E, "Add one element a at a time. Subsets split two ways —\nwithout a (old P[t] stays), with a (sum becomes old sum + a).\nExpand (old sum + a)^t via the binomial theorem: add every\npiece C(t,j)·a^(t-j)·P[j] for j = 0..t (pw caches a's powers).", "원소 a 를 하나씩 담아요. 부분집합은 두 갈래로 갈려요.\na 를 안 담은 쪽은 옛 P[t] 그대로, 담은 쪽은 합이 옛합+a 예요.\n(옛합+a)^t 를 이항정리로 펼쳐 j=0..t 조각을 다 더해요.\npw 로 a 의 거듭제곱을 미리 구해두고, 두 쪽을 합치면 새 P[t].") },
    { hi: [24, 24], bubble: t(E, "After all n elements are in, P[K] is the answer.\nFor K ≥ 1 the empty subset scores zero to the Kth power, which is 0, so it drops out on its own.", "n 개를 다 담으면 P[K] 가 답이에요.\nK 가 1 이상이면 공집합(0의 K제곱, 즉 0)은 저절로 빠져요.") },
  ] };
}

export function SumKProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
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


export function downloadSumKPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SumK — Full Study Guide", "SumK — 종합 풀이 노트");
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

