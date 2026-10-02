// 🔒 USACO_VERIFIED (2026-09-30) — **새 코드로 재제출 완료**
//   Python-3.6.9: 12/12 PASS  (최대 907ms)
//   C++17:        12/12 PASS  (최대 112ms — 옛 코드보다 빠르다)
//   cpid=1588 · USACO 2026 Third Contest, Bronze, Problem 2
//
//   2026-09-30 에 선생님 지시("바꿔")로 3단계를 바꾸고 그 자리에서 재제출해 통과했다.
//      바꾼 것 — `floor(3n/2)` 를 구하는 방법.
//        옛: 곱셈 상수를 미리 만들어 두고 곱한다(정수론이 필요한 방법).
//        새: `g(n) = n + (n 의 절반)`. 그 절반은 이진수를 한 자리씩 읽는 루프가
//            **한 자리 전 값으로 이미 갖고 있다.** 변수 `half` 하나면 끝난다.
//      → 나눗셈·음수 방지가 통째로 사라졌다. Python 34→31줄.
//      왜: 학생 **여섯**이 옛 3단계에서 막혔다. 마지막 학생 —
//          *"「정수론이 필요하니 그냥 외워 쓰라」는 말이라 이해를 포기했다."*
//   ⛔ 옛 방법의 이름을 이 파일에 다시 적지 마라 — `count-quests.py --list untaught` 가
//      **낱말로** 찾아서, 적으면 이 quest 가 「안 가르친 개념」 목록에 영원히 남는다.
//      경위 전문은 커밋 메시지와 `.claude/WORK.md` 에 있다.
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "",
  "MOD = 10**9 + 7",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    s = input().strip()",
  "",
  "    # Step 1: if any digit is not 0/1, binarize (costs 1 op).",
  "    ops = 0",
  "    if any(c not in '01' for c in s):",
  "        new_s = []",
  "        for c in s:",
  "            if int(c) % 2:",
  "                new_s.append('1')",
  "            else:",
  "                new_s.append('0')",
  "        s = ''.join(new_s)",
  "        ops = 1",
  "",
  "    # Step 2: read s as a binary number n, mod MOD.",
  "    #   half keeps the value from one digit earlier = n // 2.",
  "    n = 0",
  "    half = 0",
  "    for c in s:",
  "        half = n",
  "        n = (n * 2 + int(c)) % MOD",
  "",
  "    # Step 3: g(n) = floor(3*n / 2) = n + n // 2",
  "    g = (n + half) % MOD",
  "",
  "    print((ops + g) % MOD)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "const long long MOD = 1000000007LL;",
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
  "        //   half keeps the value from one digit earlier = n / 2.",
  "        long long n = 0;",
  "        long long half = 0;",
  "        for (int i = 0; i < (int)s.size(); i++) {",
  "            half = n;",
  "            n = (n * 2 + (s[i] - '0')) % MOD;",
  "        }",
  "",
  "        // Step 3: g = floor(3n/2) = n + n/2",
  "        long long g = (n + half) % MOD;",
  "",
  "        cout << (ops + g) % MOD << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

// CodeWalk — 코드 위 '왜 이렇게?' 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙).
/* ⭐ 2026-09-28 ux: MOD 는 **1쪽 미션 박스에서만** 뜻이 밝혀지는데 코드 쪽은 한참 뒤
   **다른 장**이다. 범례에 없으면 학생이 앞 쪽 기억에 기댄다
   (`feedback_screen_must_not_rely_on_memory`). 새 글이 아니라 **자리 이동**이다. */
const _SF_VARS = [
  { v: "MOD", ko: "10⁹+7 = 1,000,000,007", en: "10⁹+7 = 1,000,000,007" },
  { v: "s", ko: "입력 숫자(문자열)", en: "the number (string)" },
  { v: "n", ko: "이진수로 읽은 값 (mod 10⁹+7)", en: "value read as binary (mod 10⁹+7)" },
  { v: "ops", ko: "0 과 1 로 바꾼 횟수(0 또는 1)", en: "times changed to 0s and 1s (0 or 1)" },
  { v: "half", ko: "한 자리 전 값 = n 의 절반", en: "value one digit earlier = half of n" },
  { v: "g", ko: "n + (n 의 절반) = floor(3n/2)", en: "n + (half of n) = floor(3n/2)" },
];
/* ⭐ 2026-09-30 — 🔒 코드를 바꿨다(선생님 지시 "바꿔"). **나눗셈이 통째로 사라졌다.**
   왜: 학생 여섯이 옛 3단계에서 막혔고, 오늘 학생은 *"「정수론이 필요하니 그냥 외워
   쓰라」는 말이라 이해를 포기했다"* 고 했다. 그런데 `g(n) = n + (n 의 절반)` 이고
   **그 절반은 이진수에서 마지막 자리를 뗀 값**이라, 코드가 이미 계산하고 있었다.
   변수 하나(`half`)만 더 들면 옛 상수와 음수 방지가 통째로 없어진다.
   ⛔ 옛 방식의 이름을 여기 다시 적지 마라 — `count-quests.py --list untaught` 가
      **낱말로** 찾아서, 주석에 적으면 이 quest 가 영원히 그 목록에 남는다.
      경위는 커밋 `strangefn` 과 `.claude/WORK.md` 에 있다.
   ⛔ **말풍선 번호가 전부 밀렸다** — 코드 줄을 바꾸면 `hi` 를 다시 매기고 화면으로 확인해야 한다
      (`feedback_code_one_statement_per_line` 의 경고).
   ⚠️ 이 코드는 **USACO 재제출 대기** 상태다 — 헤더 참조. */
export function getStrangeFnWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _SF_VARS, beats: [
      { hi: [4, 11], bubble: t(E, "What do we need? For each x, how many times f applies until\nit hits 0 — mod 10\u2079+7, since x can be astronomically large.\nSo we read each x as a string s.", "무엇을 구해야 하나요?\nf 를 몇 번 써야 x 가 0 이 되는지, 10\u2079+7 로 나눈 나머지예요.\nx 가 엄청 커서 문자열 s 로 받아요.") },
      { hi: [13, 33], bubble: t(E, "Step 1 — why change to 0s and 1s first? f only does x\u22121 while x is pure 0/1.\nAny other digit needs one such change first: odd\u21921, even\u21920,\nand that change costs ops = 1.", "1단계 — 왜 0 과 1 로 먼저 바꿀까요?\nx 가 0/1 만 있어야 f 가 x\u22121 로 움직여요.\n다른 숫자가 있으면 홀수\u21921, 짝수\u21920 으로 한 번 바꾸고\nops = 1 을 지불해요.") },
      { hi: [35, 42], bubble: t(E, "Step 2: s is now 0/1 only — read it as a binary number n.\nEach digit doubles what we have and adds the new digit.\nhalf keeps the value from one digit earlier — that is n / 2.\n(Same as 137 \u2192 13 being 137 / 10 in base ten.)", "2단계 — 이제 s 는 0/1 만 있으니 이진수 n 으로 읽어요.\n자리를 볼 때마다 두 배 하고 새 자리를 더해요.\nhalf 에는 「한 자리 전 값」을 남겨요 — 그게 n 의 절반이에요.\n(10 진수에서 137 \u2192 13 이 137 \u00f7 10 인 것과 같아요.)") },
      { hi: [44, 45], bubble: t(E, "Step 3 — we need floor(3n/2), and that is just n + (half of n).\nIf n is even, 3n/2 = n + n/2. If n is odd, n + (n/2 rounded down)\nlands on the same answer.\nThe half is already sitting in half — no division needed.", "3단계 — 구할 것은 floor(3n/2) 인데, 그건 「n + (n 의 절반)」 과 같아요.\nn 이 짝수면 3n/2 = n + n/2 예요.\nn 이 홀수여도 절반을 버림하면 답이 맞아요.\n그 절반은 이미 half 에 들어 있어요 — 나눗셈이 필요 없어요.") },
      { hi: [47, 47], bubble: t(E, "Answer = ops + g, mod MOD: the cost of the 0-and-1 change plus the formula's result.", "답은 (ops + g) 를 MOD 로 나눈 나머지예요. 0 과 1 로 바꾼 횟수에 공식 결과를 더한 값이에요.") },
    ] };
  }
  return { code: FULL_PY, vars: _SF_VARS, beats: [
    { hi: [1, 1], bubble: t(E, "What do we need? For each x, how many times f applies until\nit hits 0 — mod 10\u2079+7, because the count can get huge.", "무엇을 구해야 하나요?\nf 를 몇 번 써야 x 가 0 이 되는지, 10\u2079+7 로 나눈 나머지예요.\n횟수가 아주 커질 수 있어서예요.") },
    { hi: [3, 5], bubble: t(E, "T tests; read each number x as a STRING (x can be astronomically large).", "테스트를 T 개 읽어요. 각 x 는 문자열 s 로 받아요 (x 가 엄청 커서).") },
    /* 2026-09-23 학생 검증: `any(...)` 를 **짐작**하고 넘어갔다 —
       *"`any(...)` 자체를 처음 본다. 확신 없다."* 레슨 전체에 `any(` 가 0건이다.
       ⚠️ **C++ 쪽에는 안 넣는다** — 거긴 `bool needBinarize` + for 문이라 `any` 가 없다. */
    { hi: [7, 17], bubble: t(E, "any(… for c in s) checks the letters of s one by one — True if it holds even once.\nStep 1 — why change to 0s and 1s first? f only does x\u22121 while x is pure 0/1.\nAny other digit needs one such change first: odd\u21921, even\u21920,\nand that change costs ops = 1.", "any(조건 for c in s) 는 s 의 글자를 하나씩 보다가\n조건이 한 번이라도 맞으면 True 예요.\n1단계 — 왜 0 과 1 로 먼저 바꿀까요?\nx 가 0/1 만 있어야 f 가 x\u22121 로 움직여요.\n다른 숫자가 있으면 홀수\u21921, 짝수\u21920 으로 한 번 바꾸고\nops = 1 을 지불해요.") },
    { hi: [19, 25], bubble: t(E, "Step 2: s is now 0/1 only — read it as a binary number n.\nEach digit doubles what we have and adds the new digit.\nhalf keeps the value from one digit earlier — that is n // 2.\n(Same as 137 \u2192 13 being 137 // 10 in base ten.)", "2단계 — 이제 s 는 0/1 만 있으니 이진수 n 으로 읽어요.\n자리를 볼 때마다 두 배 하고 새 자리를 더해요.\nhalf 에는 「한 자리 전 값」을 남겨요 — 그게 n 의 절반이에요.\n(10 진수에서 137 \u2192 13 이 137 \u00f7 10 인 것과 같아요.)") },
    { hi: [27, 28], bubble: t(E, "Step 3 — we need floor(3n/2), and that is just n + (half of n).\nIf n is even, 3n/2 = n + n/2. If n is odd, n + (n/2 rounded down)\nlands on the same answer.\nThe half is already sitting in half — no division needed.", "3단계 — 구할 것은 floor(3n/2) 인데, 그건 「n + (n 의 절반)」 과 같아요.\nn 이 짝수면 3n/2 = n + n/2 예요.\nn 이 홀수여도 절반을 버림하면 답이 맞아요.\n그 절반은 이미 half 에 들어 있어요 — 나눗셈이 필요 없어요.") },
    { hi: [30, 30], bubble: t(E, "Answer = ops + g, mod MOD: the cost of the 0-and-1 change plus the formula's result.", "답은 (ops + g) 를 MOD 로 나눈 나머지예요. 0 과 1 로 바꾼 횟수에 공식 결과를 더한 값이에요.") },
  ] };
}

export function getStrangeFnSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What are we finding? How many times f applies until x hits 0, mod 10⁹+7. There are two phases. If needed, change to 0s and 1s first (1 op), then apply the formula g(n) = floor(3n/2).",
            "무엇을 구해야 하나요? f 를 몇 번 써야 x 가 0 이 되는지를 mod 10⁹+7 로 구해요.\n단계는 둘이에요. 필요하면 먼저 0 과 1 로 한 번 바꾸고,\n그다음 공식을 써요."),
        t(E, "Why change to 0s and 1s first? f only steps x → x−1 while x is pure 0/1 — any other digit forces one such change first. And n can grow up to 10^200000, so we keep it mod 10⁹+7 while reading digits.",
            "왜 0 과 1 로 먼저 바꿔야 할까요? f 는 x 가 0/1 로만 있을 때만 x−1 로 움직여요.\n다른 숫자가 있으면 먼저 0 과 1 로 바꿔야 해요.\nn 은 최대 10^200000 까지 커질 수 있어서 자리를 하나씩 읽으며 mod 10⁹+7 로 계속 줄여요."),
        t(E, "So how do we compute floor(3n/2)? It is just n + (half of n) — and the half is already there. Reading binary one digit at a time, the value from one digit earlier IS half, so no division is needed.",
            "그럼 floor(3n/2) 는 어떻게 계산할까요?\n그건 n + (n 의 절반) 과 같아요. 그리고 그 절반은 이미 갖고 있어요.\n이진수를 한 자리씩 읽을 때 «한 자리 전 값» 이 바로 절반이라\n나눗셈이 필요 없어요."),
      ],
      pyOnly: [
        t(E, "Nothing here needs division, so there is no negative value to guard against either.",
            "여기엔 나눗셈이 아예 없어서, 음수를 막는 처리도 필요 없어요."),
        t(E, "Python ints have unlimited size, but we still mod to keep arithmetic O(1).",
            "Python 정수는 크기 제한이 없지만, mod 를 써야 계산 한 번이 O(1) 로 남아요."),
      ],
      cppOnly: [
        t(E, "n and half both stay below MOD, so n*2 and n+half never come close to long long's limit.",
            "n 과 half 는 늘 MOD 보다 작아서, n*2 나 n+half 가 long long 한계에 안 닿아요."),
        /* 2026-09-30: 「((3*n - last) % MOD + MOD) % MOD 로 음수 나머지를 막아요」 를 지웠다.
           오늘 나눗셈을 걷어낸 새 코드엔 `last` 도, 음수 가드도 **없다** — 죽은 설명이었고
           바로 위 파이썬 문장(「나눗셈이 없어서 음수 방지도 필요 없다」)과 모순이었다.
           📄 PDF 로 학생에게 나가는 글이다. quest-auditor 가 찾았다.
           ⚠️ `check-prose-vs-final-code.py` 는 **원리상 못 잡는다**(자료구조 이름만 본다). */
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
