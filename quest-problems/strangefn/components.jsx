// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 12/12 PASS
//   C++:    12/12 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "MOD = 10**9 + 7",
  "INV2 = pow(2, MOD - 2, MOD)  # modular inverse of 2",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    s = input().strip()",
  "",
  "    # Step 1: if any digit is not 0/1, binarize (costs 1 op).",
  "    ops = 0",
  "    if any(c not in '01' for c in s):",
  "        s = ''.join('1' if int(c) % 2 else '0' for c in s)",
  "        ops = 1",
  "",
  "    # Step 2: read s as a binary number n, mod MOD.",
  "    n = 0",
  "    for c in s:",
  "        n = (n * 2 + int(c)) % MOD",
  "",
  "    # Step 3: g(n) = floor(3*n / 2)",
  "    #          = (3*n - (n mod 2)) / 2",
  "    last = int(s[-1]) if s else 0  # n's parity = last bit",
  "    g = (3 * n - last) % MOD * INV2 % MOD",
  "",
  "    print((ops + g) % MOD)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "const long long MOD  = 1000000007LL;",
  "const long long INV2 = 500000004LL;  // modular inverse of 2",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        string s; cin >> s;",
  "",
  "        // Step 1: if any digit is not 0/1, binarize (1 op).",
  "        long long ops = 0;",
  "        bool needBinarize = false;",
  "        for (int i = 0; i < (int)s.size(); i++) {",
  "            char c = s[i];",
  "            if (c != '0' && c != '1') {",
  "                needBinarize = true;",
  "                break;",
  "            }",
  "        }",
  "        if (needBinarize) {",
  "            for (int i = 0; i < (int)s.size(); i++) {",
  "                int d = s[i] - '0';",
  "                s[i] = (d % 2) ? '1' : '0';",
  "            }",
  "            ops = 1;",
  "        }",
  "",
  "        // Step 2: read s as a binary number n mod MOD.",
  "        long long n = 0;",
  "        for (int i = 0; i < (int)s.size(); i++) {",
  "            n = (n * 2 + (s[i] - '0')) % MOD;",
  "        }",
  "",
  "        // Step 3: g = floor(3n/2) = (3n - last_bit) * inv2 mod MOD",
  "        long long last = s.back() - '0';",
  "        long long g = ((3 * n - last) % MOD + MOD) % MOD * INV2 % MOD;",
  "",
  "        cout << (ops + g) % MOD << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

// CodeWalk — 코드 위 '왜 이렇게?' 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙).
const _SF_VARS = [
  { v: "s", ko: "입력 숫자(문자열)", en: "the number (string)" },
  { v: "n", ko: "이진수로 읽은 값 (mod 10⁹+7)", en: "value read as binary (mod 10⁹+7)" },
  { v: "ops", ko: "이진화 비용", en: "binarize cost" },
  { v: "g", ko: "floor(3n/2) 의 값 (mod 10⁹+7)", en: "floor(3n/2) (mod 10⁹+7)" },
];
export function getStrangeFnWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _SF_VARS, beats: [
      { hi: [4, 10],  bubble: t(E, "Constants: MOD = 10⁹+7, INV2 = inverse of 2. Read T tests, each number x as a string (x can be astronomically large).", "상수: MOD = 10⁹+7, INV2 = 2 의 역원. T 테스트, 각 x 를 문자열 s 로 읽기 (x 가 엄청 커서).") },
      { hi: [12, 28], bubble: t(E, "Step 1: if any digit isn't 0/1, binarize it (odd→1, even→0) — that costs 1 op.", "1단계: 0/1 이 아닌 자리가 있으면 이진화 (홀수→1, 짝수→0) — 1회 비용.") },
      { hi: [30, 34], bubble: t(E, "Step 2: read s as a binary number n, taking mod at every digit (n is huge).", "2단계: s 를 2진수 n 으로 읽되 자릿수마다 mod (n 이 거대해서).") },
      { hi: [36, 38], bubble: t(E, "Step 3: g = floor(3n/2) = (3n − last bit) × INV2 mod MOD.", "3단계: g = floor(3n/2) = (3n − 마지막 비트) × INV2 mod MOD.") },
      { hi: [40, 40], bubble: t(E, "Answer = (ops + g) mod MOD.", "답 = (ops + g) mod MOD 출력.") },
    ] };
  }
  return { code: FULL_PY, vars: _SF_VARS, beats: [
    { hi: [0, 4],   bubble: t(E, "Fast input + constants: MOD = 10⁹+7, INV2 = the modular inverse of 2.", "빠른 입력 + 상수: MOD = 10⁹+7, INV2 = 2 의 모듈러 역원.") },
    { hi: [6, 8],   bubble: t(E, "T tests; read each number x as a STRING (x can be astronomically large).", "T 테스트; 각 x 를 문자열 s 로 읽기 (x 가 엄청 커서).") },
    { hi: [10, 14], bubble: t(E, "Step 1: if any digit isn't 0/1, binarize it (odd→1, even→0) — that costs 1 op.", "1단계: 0/1 이 아닌 자리가 있으면 이진화 (홀수→1, 짝수→0) — 1회 비용.") },
    { hi: [16, 19], bubble: t(E, "Step 2: read s as a binary number n, taking mod at every digit (n is huge).", "2단계: s 를 2진수 n 으로 읽되 자릿수마다 mod (n 이 거대해서).") },
    { hi: [21, 24], bubble: t(E, "Step 3: g = floor(3n/2) = (3n − last bit) × INV2 mod MOD.", "3단계: g = floor(3n/2) = (3n − 마지막 비트) × INV2 mod MOD.") },
    { hi: [26, 26], bubble: t(E, "Answer = (ops + g) mod MOD.", "답 = (ops + g) mod MOD 출력.") },
  ] };
}

export function getStrangeFnSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Two phases: optional binarize (1 op), then closed form g(n) = floor(3n/2).",
            "두 단계: 필요하면 이진화 (1 op), 그 다음 닫힌 식 g(n) = floor(3n/2)."),
        t(E, "n can be huge (up to 10^100000), so we keep n mod 10⁹+7 while reading digits.",
            "n 은 엄청 클 수 있어서 (최대 10^100000) 자릿수를 읽으며 mod 10⁹+7 로 유지."),
        t(E, "floor(3n/2) under a prime mod uses the modular inverse of 2.",
            "소수 mod 에서 floor(3n/2) 는 2 의 모듈러 역원을 써요."),
      ],
      pyOnly: [
        t(E, "pow(2, MOD-2, MOD) gives the modular inverse via Fermat's little theorem.",
            "pow(2, MOD-2, MOD) 로 페르마의 소정리 기반 역원."),
        t(E, "Python ints have unlimited size, but we still mod to keep arithmetic O(1).",
            "Python 정수는 크기 제한 없지만 mod 로 산술을 O(1) 로 유지."),
      ],
      cppOnly: [
        t(E, "INV2 = 500000004 is precomputed (inverse of 2 modulo 10⁹+7).",
            "INV2 = 500000004 은 미리 계산된 값 (10⁹+7 에서 2 의 역원)."),
        t(E, "((3*n - last) % MOD + MOD) % MOD guards against negative remainders.",
            "((3*n - last) % MOD + MOD) % MOD 로 음수 나머지 방지."),
      ],
    },
  ];
}

export function StrangeFnProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs","pow","any"];
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


export function downloadStrangeFnPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Strange Function — Full Study Guide", "Strange Function — 종합 풀이 노트");
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
  .hint { background: #f5f3ff; border: 1px solid #8b5cf6; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #5b21b6; }
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
