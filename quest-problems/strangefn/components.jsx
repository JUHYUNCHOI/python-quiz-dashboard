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
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        string s;",
  "        cin >> s;",
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
  "                if (d % 2) {",
  "                    s[i] = '1';",
  "                } else {",
  "                    s[i] = '0';",
  "                }",
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
  { v: "ops", ko: "홀짝으로 바꾼 횟수(0 또는 1)", en: "times flipped by parity (0 or 1)" },
  { v: "g", ko: "floor(3n/2) 의 값 (mod 10⁹+7)", en: "floor(3n/2) (mod 10⁹+7)" },
];
export function getStrangeFnWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _SF_VARS, beats: [
      { hi: [4, 12],  bubble: t(E, "What do we need? For each x, how many times f applies until\nit hits 0 — mod 10⁹+7, since x can be astronomically large.\nSet up MOD and INV2 (what INV2 means comes in step 3), then\nread T tests, each x as a string s.", "무엇을 구해야 하나요?\nf 를 몇 번 써야 x 가 0 이 되는지, 10⁹+7 로 나눈 나머지예요.\nx 가 엄청 커서 문자열로 다뤄요.\nMOD 와 INV2 를 둬요 (INV2 가 뭔지는 3단계에서 알려드려요).\n그다음 T 개 테스트와 s 를 읽어요.") },
      { hi: [14, 33], bubble: t(E, "Step 1 — why flip by parity? f only does x−1 while x is pure 0/1.\nAny other digit needs one parity swap first: odd→1, even→0,\nand that swap costs ops = 1.", "1단계 — 왜 홀짝으로 바꿀까요?\nx 가 0/1 만 있어야 f 가 x−1 로 움직여요.\n다른 자리가 있으면 홀수→1, 짝수→0 으로 한 번 바꾸고\nops = 1 을 지불해요.") },
      { hi: [36, 40], bubble: t(E, "Step 2: s is now 0/1 only — read it as a binary number n.\nEach digit doubles what we have so far and adds the new\ndigit — that's how binary is read. n can be huge, so mod\nat every digit.", "2단계 — 이제 s 는 0/1 만 있으니 이진수 n 으로 읽어요.\n자리를 하나 볼 때마다 지금까지 값이 두 배가 되고\n새 자리를 더해요 — 그게 이진수를 읽는 방법이에요.\nn 이 거대할 수 있어서 자릿수마다 mod 를 해요.") },
      { hi: [42, 43], bubble: t(E, "Step 3 — we need floor(3n/2).\nMultiplying an even number by anything keeps it even, so if n\nis even, 3n is even too and last = 0.\nOdd times odd is always odd, so if n\nis odd, 3n is odd too, and we subtract last = 1.\nEither way, 3n − last is always even as a whole number.", "3단계 — floor(3n/2) 를 구해야 해요.\n짝수에 무엇을 곱해도 짝수라서,\nn 이 짝수면 3n 도 짝수이고 last = 0이에요.\n홀수끼리 곱하면 홀수라서,\nn 이 홀수면 3n 도 홀수이고 last = 1이에요.\n그래서 3n − last 는 항상 짝수가 돼요.") },
      { hi: [44, 44], bubble: t(E, "Even as a whole number — but it's reduced mod 10⁹+7,\nso it may not be even now (1000000008 becomes 1).\nSo we can't just divide by 2 here.\nTry a tiny example: mod 5, value 8. 8 mod 5 = 3, which is\nodd — but 8/2 = 4, and 4 mod 5 = 4. Multiply 3 by 3 (since\n2×3 = 6 ≡ 1 mod 5) and you get 9 ≡ 4 mod 5 — same answer.\nThat 3 is the \"modular inverse\" of 2 under mod 5.\n500000004 is that same idea, precomputed for mod 10⁹+7.\nThe (... + MOD) guards against a negative.", "정수로는 짝수였죠. 그런데 10⁹+7 로 줄인 값이라\n짝수가 아닐 수도 있어요 (1000000008 → 1).\n그래서 2 로 그냥 못 나눠요.\n작은 예로 확인해봐요. mod 5, 값 8 이라고 해요.\n8 mod 5 = 3, 홀수죠. 그런데 8÷2 = 4 이고, 4 mod 5 = 4 예요.\n3 에 3 을 곱하면 (2×3 = 6 ≡ 1 mod 5 이니까) 9 ≡ 4 mod 5,\n똑같이 4 가 나와요. 이 3 이 mod 5 에서 2 의 '모듈러 역원'이에요.\n500000004 도 같은 원리로, mod 10⁹+7 에서 미리 구해 둔 값이에요.\n(... + MOD)는 음수를 막아요.") },
      { hi: [46, 46], bubble: t(E, "Answer = ops + g, mod MOD: the parity-flip cost plus the formula's result, added together.", "답은 (ops + g) 를 MOD 로 나눈 나머지예요. 홀짝 변환 비용과 공식 결과를 더한 값이에요.") },
    ] };
  }
  return { code: FULL_PY, vars: _SF_VARS, beats: [
    { hi: [0, 4],   bubble: t(E, "What do we need? For each x, how many times f applies until\nit hits 0 — mod 10⁹+7. Read input fast (x can be huge),\nand set up MOD and INV2 (what INV2 means comes in step 3).", "무엇을 구해야 하나요?\nf 를 몇 번 써야 x 가 0 이 되는지, 10⁹+7 로 나눈 나머지예요.\nx 가 커서 입력을 빠르게 받고,\nMOD 와 INV2 를 먼저 둬요 (INV2 가 뭔지는 3단계에서 알려드려요).") },
    { hi: [6, 8],   bubble: t(E, "T tests; read each number x as a STRING (x can be astronomically large).", "테스트를 T 개 읽어요. 각 x 는 문자열 s 로 받아요 (x 가 엄청 커서).") },
    { hi: [10, 14], bubble: t(E, "Step 1 — why flip by parity? f only does x−1 while x is pure 0/1.\nAny other digit needs one parity swap first: odd→1, even→0,\nand that swap costs ops = 1.", "1단계 — 왜 홀짝으로 바꿀까요?\nx 가 0/1 만 있어야 f 가 x−1 로 움직여요.\n다른 자리가 있으면 홀수→1, 짝수→0 으로 한 번 바꾸고\nops = 1 을 지불해요.") },
    { hi: [16, 19], bubble: t(E, "Step 2: s is now 0/1 only — read it as a binary number n.\nEach digit doubles what we have so far and adds the new\ndigit — that's how binary is read. n can be huge, so mod\nat every digit.", "2단계 — 이제 s 는 0/1 만 있으니 이진수 n 으로 읽어요.\n자리를 하나 볼 때마다 지금까지 값이 두 배가 되고\n새 자리를 더해요 — 그게 이진수를 읽는 방법이에요.\nn 이 거대할 수 있어서 자릿수마다 mod 를 해요.") },
    { hi: [21, 23], bubble: t(E, "Step 3 — we need floor(3n/2).\nMultiplying an even number by anything keeps it even, so if n\nis even, 3n is even too and last = 0.\nOdd times odd is always odd, so if n\nis odd, 3n is odd too, and we subtract last = 1.\nEither way, 3n − last is always even as a whole number.", "3단계 — floor(3n/2) 를 구해야 해요.\n짝수에 무엇을 곱해도 짝수라서,\nn 이 짝수면 3n 도 짝수이고 last = 0이에요.\n홀수끼리 곱하면 홀수라서,\nn 이 홀수면 3n 도 홀수이고 last = 1이에요.\n그래서 3n − last 는 항상 짝수가 돼요.") },
    { hi: [24, 24], bubble: t(E, "Even as a whole number — but it's reduced mod 10⁹+7,\nso it may not be even now (1000000008 becomes 1).\nSo we can't just divide by 2 here.\nTry a tiny example: mod 5, value 8. 8 mod 5 = 3, which is\nodd — but 8/2 = 4, and 4 mod 5 = 4. Multiply 3 by 3 (since\n2×3 = 6 ≡ 1 mod 5) and you get 9 ≡ 4 mod 5 — same answer.\nThat 3 is the \"modular inverse\" of 2 under mod 5.\npow(2, MOD-2, MOD) computes that same idea for mod 10⁹+7.", "정수로는 짝수였죠. 그런데 10⁹+7 로 줄인 값이라\n짝수가 아닐 수도 있어요 (1000000008 → 1).\n그래서 2 로 그냥 못 나눠요.\n작은 예로 확인해봐요. mod 5, 값 8 이라고 해요.\n8 mod 5 = 3, 홀수죠. 그런데 8÷2 = 4 이고, 4 mod 5 = 4 예요.\n3 에 3 을 곱하면 (2×3 = 6 ≡ 1 mod 5 이니까) 9 ≡ 4 mod 5,\n똑같이 4 가 나와요. 이 3 이 mod 5 에서 2 의 '모듈러 역원'이에요.\npow(2, MOD-2, MOD) 가 mod 10⁹+7 에서 그 값을 구해줘요.") },
    { hi: [26, 26], bubble: t(E, "Answer = ops + g, mod MOD: the parity-flip cost plus the formula's result, added together.", "답은 (ops + g) 를 MOD 로 나눈 나머지예요. 홀짝 변환 비용과 공식 결과를 더한 값이에요.") },
  ] };
}

export function getStrangeFnSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What are we finding? How many times f applies until x hits 0, mod 10⁹+7. There are two phases. If needed, do the parity flip first (1 op), then apply the formula g(n) = floor(3n/2).",
            "무엇을 구해야 하나요? f 를 몇 번 써야 x 가 0 이 되는지를 mod 10⁹+7 로 구해요.\n단계는 둘이에요. 필요하면 먼저 홀짝 변환(1번)을 하고,\n그다음 공식을 써요."),
        t(E, "Why flip by parity first? f only steps x → x−1 while x is pure 0/1 — any other digit forces one parity-flip pass. And n can grow up to 10^200000, so we keep it mod 10⁹+7 while reading digits.",
            "왜 홀짝 변환이 먼저 필요할까요? f 는 x 가 0/1 로만 있을 때만 x−1 로 움직여요.\n다른 자리가 있으면 한 번 홀짝으로 바꿔야 해요.\nn 은 최대 10^200000 까지 커질 수 있어서 자릿수를 읽으며 mod 10⁹+7 로 계속 줄여요."),
        t(E, "So how do we compute floor(3n/2)? Under a prime mod, dividing by 2 becomes multiplying by the modular inverse of 2.",
            "그럼 floor(3n/2) 는 어떻게 계산할까요?\n소수 mod 에서 나누기 2 는 2 의 모듈러 역원을 곱하는 것과 같아요."),
      ],
      pyOnly: [
        t(E, "pow(2, MOD-2, MOD) gives the modular inverse via Fermat's little theorem.",
            "pow(2, MOD-2, MOD) 로 역원을 구해요. 페르마의 소정리를 쓴 거예요."),
        t(E, "Python ints have unlimited size, but we still mod to keep arithmetic O(1).",
            "Python 정수는 크기 제한이 없지만, mod 를 써야 계산 한 번이 O(1) 로 남아요."),
      ],
      cppOnly: [
        t(E, "INV2 = 500000004 is precomputed (inverse of 2 modulo 10⁹+7).",
            "INV2 = 500000004 은 미리 계산해 둔 값이에요 (10⁹+7 에서 2 의 역원)."),
        t(E, "((3*n - last) % MOD + MOD) % MOD guards against negative remainders.",
            "((3*n - last) % MOD + MOD) % MOD 로 음수 나머지를 막아요."),
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
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
