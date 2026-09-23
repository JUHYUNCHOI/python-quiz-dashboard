import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "import math",
  "",
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "N = 4",
  "A = 10",
  "R = [1, 4, 2]",
  "",
  "b = sorted(R, reverse=True)   # known radii, largest first",
  "m = N - 1",
  "",
  "# prefix[i] = b1² - b2² + b3² - ...  (제곱을 번갈아 더하고 뺀 값)",
  "prefix = [0] * (m + 1)",
  "for i in range(1, m + 1):",
  "    if i % 2 == 1:",
  "        sign = 1",
  "    else:",
  "        sign = -1",
  "    prefix[i] = prefix[i - 1] + sign * b[i - 1] ** 2",
  "S = prefix[m]",
  "",
  "# 빠진 반지름이 들어갈 자리를 p (1 부터 N) 로 놓아요",
  "for p in range(1, N + 1):",
  "    pre = prefix[p - 1]",
  "    if p % 2 == 1:",
  "        x2 = A + S - 2 * pre",
  "    else:",
  "        x2 = 2 * pre - A - S",
  "    if x2 < 0:",
  "        continue",
  "    x = math.isqrt(x2)              # integer square root",
  "    if x * x != x2 or x <= 0:       # must be a positive perfect square",
  "        continue",
  "    if p - 1 >= 1:",
  "        upper = b[p - 2]",
  "    else:",
  "        upper = None",
  "    if p - 1 < m:",
  "        lower = b[p - 1]",
  "    else:",
  "        lower = 0",
  "    if upper is not None and x > upper:",
  "        continue",
  "    if x < lower:",
  "        continue",
  "    print(x)",
  "    break",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "#include <cmath>",
  "using namespace std;",
  "",
  "int main() {",
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "    int N = 4;",
  "    long long A = 10;",
  "    vector<long long> b = {1, 4, 2};",
  "    int m = N - 1;",
  "    sort(b.rbegin(), b.rend());          // largest first",
  "",
  "    // 제곱을 번갈아 더하고 뺀 값 (__int128 을 써요 — 합이 10^18 을 넘어요)",
  "    vector<__int128> prefix(m + 1, 0);",
  "    for (int i = 1; i <= m; i++) {",
  "        __int128 sq = (__int128)b[i - 1] * b[i - 1];",
  "        if (i % 2 == 1) {",
  "            prefix[i] = prefix[i - 1] + sq;",
  "        } else {",
  "            prefix[i] = prefix[i - 1] - sq;",
  "        }",
  "    }",
  "    __int128 S = prefix[m];",
  "",
  "    for (int p = 1; p <= N; p++) {",
  "        __int128 pre = prefix[p - 1];",
  "        __int128 x2;",
  "        if (p % 2 == 1) {",
  "            x2 = (__int128)A + S - 2 * pre;",
  "        } else {",
  "            x2 = 2 * pre - (__int128)A - S;",
  "        }",
  "        if (x2 < 0) {",
  "            continue;",
  "        }",
  "        long long x = (long long)sqrtl((long double)x2);   // integer sqrt",
  "        while ((__int128)(x + 1) * (x + 1) <= x2) {",
  "            x++;",
  "        }",
  "        while (x > 0 && (__int128)x * x > x2) {",
  "            x--;",
  "        }",
  "        if ((__int128)x * x != x2 || x <= 0) {",
  "            continue;",
  "        }",
  "        long long upper;",
  "        if (p - 1 >= 1) {",
  "            upper = b[p - 2];",
  "        } else {",
  "            upper = (long long)4e18;",
  "        }",
  "        long long lower;",
  "        if (p - 1 < m) {",
  "            lower = b[p - 1];",
  "        } else {",
  "            lower = 0;",
  "        }",
  "        if (x > upper || x < lower) {",
  "            continue;",
  "        }",
  "        cout << x << \"\\n\";",
  "        return 0;",
  "    }",
  "    return 0;",
  "}",
];

/* 2026-09-17: 여기가 섹션 **한 개**에 파이썬 47 줄·C++ 71 줄을 통째로 펼치고 있었다.
   이 묶음에서 수학이 제일 복잡한데 코드는 가장 안 쪼개져 있었다.
   서로 다른 다섯 단계(읽기·정렬 / prefix 만들기 / 자리마다 x² 풀기 /
   완전제곱 확인 / 양옆 확인·출력)로 나눈다.
   ⚠️ 코드 **내용**은 한 글자도 안 바꾼다 — 어디서 자르는지만 정한다.
   그래서 새 배열을 손으로 적지 않고 FULL_PY·FULL_CPP 를 slice 해서 쓴다.
   (본: mcc21simplemath 5 섹션 · mcc21menu) */
const PY_READ   = FULL_PY.slice(0, 9);
const PY_PREFIX = FULL_PY.slice(9, 19);
const PY_SLOT   = FULL_PY.slice(19, 28);
const PY_SQRT   = FULL_PY.slice(28, 31);
const PY_FIT    = FULL_PY.slice(31);

const CPP_READ   = FULL_CPP.slice(0, 17);
const CPP_PREFIX = FULL_CPP.slice(17, 29);
const CPP_SLOT   = FULL_CPP.slice(29, 40);
const CPP_SQRT   = FULL_CPP.slice(40, 50);
const CPP_FIT    = FULL_CPP.slice(50);

export function getMcc21GlassSections(E) {
  return [
    {
      label: t(E, "📥 1. Read input, sort largest-first", "📥 1. 입력 읽기 · 큰 것부터 줄 세우기"),
      color: A,
      py: PY_READ, cpp: CPP_READ,
      why: [
        t(E, "The alternating sum only makes sense once the radii are in order, so sort the known ones largest-first right away.",
            "번갈아 더하고 빼는 합은 반지름이 줄 서 있어야 뜻이 생겨요.\n그래서 아는 반지름부터 큰 것 → 작은 것 순으로 줄 세워요."),
        t(E, "m = N − 1 is how many radii we actually know — one of the N is broken.",
            "m = N − 1 은 우리가 아는 반지름의 개수예요.\nN 개 중 하나가 깨져서 하나가 비어 있으니까요."),
      ],
      pyOnly: [
        t(E, "sorted(R, reverse=True) gives a new list in descending order; R itself is left alone.",
            "sorted(R, reverse=True) 는 큰 것부터 담긴 새 리스트를 줘요.\nR 자체는 그대로 남아요."),
      ],
      cppOnly: [
        t(E, "sort(b.rbegin(), b.rend()) sorts descending. Read A as long long — it goes up to 10¹⁸ (a billion times a billion).",
            "sort(b.rbegin(), b.rend()) 는 큰 것부터 정렬해요.\nA 는 10¹⁸(10억×10억)까지라서 long long 으로 읽어요."),
      ],
    },
    {
      label: t(E, "🧮 2. Precompute the alternating sums", "🧮 2. 번갈아 더한 합 미리 만들기"),
      color: A,
      py: PY_PREFIX, cpp: CPP_PREFIX,
      why: [
        t(E, "prefix[i] = b1² − b2² + b3² − … : the alternating sum of the first i known radii. Signs flip because the answer alternates by position.",
            "prefix[i] = b1² − b2² + b3² − … 예요.\n앞에서부터 i 개까지 번갈아 더하고 뺀 합이에요.\n자리마다 부호가 번갈아 바뀌니까 sign 도 +1, −1 을 오가요."),
        t(E, "Computing it once means any prefix we need later is a quick O(1) lookup, not a recompute. S = prefix[m] is the whole alternating sum of the known radii.",
            "한 번만 만들어 두면 나중에 어느 앞부분이든 바로 꺼내 써요.\nS = prefix[m] 은 아는 반지름 전체의 번갈아 합이에요."),
      ],
      pyOnly: [
        t(E, "Python ints are unbounded, so b[i]² (up to 10¹⁸ — a billion times a billion, since b[i] itself reaches 10⁹) and their running sum never overflow — no big-integer setup needed.",
            "파이썬 정수는 크기 제한이 없어요.\n그래서 b[i] 가 최대 10⁹(10억)이라 b[i]² 은 10¹⁸(10억×10억)까지 가지만\n쌓아 온 합도 넘칠 걱정이 없어요."),
      ],
      cppOnly: [
        t(E, "Sums reach ~5·10⁴ (50,000) terms of 10¹⁸ each → far past long long. Use __int128 for prefix and S.",
            "10¹⁸(10억×10억)짜리 항이 5·10⁴(5만) 개쯤 더해지니까 long long 으로는 모자라요.\nprefix 와 S 는 __int128 에 담아요."),
      ],
    },
    {
      label: t(E, "🔍 3. Try each slot p, solve x²", "🔍 3. 자리 p 를 하나씩 놓아 보고 x² 풀기"),
      color: A,
      py: PY_SLOT, cpp: CPP_SLOT,
      why: [
        t(E, "The missing radius lands in ONE slot p. Radii above p keep their signs; every radius below p shifts one place, so all their signs flip.",
            "깨진 반지름은 줄 세운 순서의 어느 한 자리 p 에 들어가요.\np 보다 큰 반지름은 자리가 그대로라 부호도 그대로예요.\np 보다 작은 반지름은 한 칸씩 밀려서 부호가 전부 뒤집혀요."),
        t(E, "Once p is fixed, 'alternating sum = A' has only one unknown, so x² comes out immediately (O(1)): p odd → A+S−2·pre, p even → 2·pre−A−S.",
            "p 를 정하면 '번갈아 합 = A' 에 모르는 값이 x² 하나뿐이에요.\n그래서 p 가 홀수면 x² = A+S−2·pre,\n짝수면 x² = 2·pre−A−S 로 바로 나와요."),
        t(E, "A negative x² can't come from a real radius, so that slot is dropped at once.",
            "x² 가 음수면 그런 반지름은 세상에 없어요.\n그 자리는 바로 버리고 다음 자리로 가요."),
      ],
    },
    {
      label: t(E, "✅ 4. Is x² a perfect square?", "✅ 4. x² 가 완전제곱인지 확인"),
      color: A,
      py: PY_SQRT, cpp: CPP_SQRT,
      why: [
        t(E, "A radius is a whole number, so x² has to be a perfect square. Take the integer square root and square it back — if it doesn't return to x², this slot is out.",
            "반지름은 정수라서 x² 는 완전제곱이어야 해요.\n정수 제곱근을 구해 다시 제곱해 보고,\nx² 로 돌아오지 않으면 이 자리는 버려요."),
        t(E, "x ≤ 0 is rejected too — a circle of radius 0 or less isn't a radius.",
            "x 가 0 이하인 것도 버려요. 반지름이 0 이거나 음수일 수는 없으니까요."),
      ],
      pyOnly: [
        t(E, "math.isqrt(x2) is exact integer square root — no float rounding. Check x*x == x2 to confirm x2 is a perfect square.",
            "math.isqrt(x2) 는 정수 제곱근을 정확히 구해서\n소수점 반올림 때문에 틀릴 일이 없어요.\nx*x == x2 인지 보면 완전제곱인지 알 수 있어요."),
      ],
      cppOnly: [
        t(E, "There is no int128 sqrt, so seed with sqrtl then nudge x up/down until x*x == x2 exactly.",
            "__int128 에는 sqrt 가 없어요.\n그래서 sqrtl 로 대략 잡은 뒤\nx*x 가 x2 와 딱 같아질 때까지 x 를 한 칸씩 올리고 내려요."),
      ],
    },
    {
      label: t(E, "📏 5. Does x fit the slot? Print it", "📏 5. 양옆 사이에 들어가나 보고 출력"),
      color: A,
      py: PY_FIT, cpp: CPP_FIT,
      why: [
        t(E, "x was solved ASSUMING it sits at slot p, so it must really fit there: not bigger than the radius above it (upper), not smaller than the one below (lower).",
            "x 는 '자리 p 에 있다' 고 치고 푼 값이에요.\n그러니 진짜로 그 자리에 들어가야 해요.\n위 반지름(upper)보다 크면 안 되고, 아래 반지름(lower)보다 작아도 안 돼요."),
        t(E, "At the two ends there is no neighbour: slot 1 has nothing above it, and the last slot only needs x > 0, so lower is 0.",
            "양 끝자리에는 이웃이 없어요.\n첫 자리는 위쪽이 비어 있고,\n마지막 자리는 0 보다 크기만 하면 되니 lower 를 0 으로 둬요."),
        t(E, "The first slot that passes every check is a valid answer, so we print x and stop.",
            "모든 확인을 처음 통과한 자리의 x 가 답이에요.\n그래서 출력하고 바로 멈춰요."),
      ],
    },
  ];
}

export function Mcc21GlassProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}

/* CodeWalk — 코드 줄에 붙는 말풍선 (2026-09-23, PM 판정 ③의 3단계, mcc21menu 본떠 만듦).
   MCC 는 파이썬 전용이라(feedback_mcc_is_python_only.md) C++ beats 는 안 만든다.
   말풍선은 "지금 마주한 질문" 으로 연다 — 파일 순서를 읊지 않는다
   (check-codewalk-thinking-order.py). hi 경계는 기존 getMcc21GlassSections 의
   PY_READ/PY_PREFIX/PY_SLOT/PY_SQRT/PY_FIT 와 같은 코드 뜻 구간을 그대로 쓴다 —
   값만 CodeWalk 모양(질문형 말풍선)으로 바꿨다. */
const _GLASS_VARS = [
  { v: "b", ko: "아는 반지름 (큰 것부터)", en: "known radii, largest first" },
  { v: "prefix", ko: "앞부분까지 번갈아 더한 값", en: "alternating sum so far" },
  { v: "S", ko: "아는 반지름 전체의 번갈아 합", en: "full alternating sum" },
  { v: "p", ko: "깨진 반지름이 들어갈 자리", en: "slot for the missing radius" },
  { v: "x", ko: "깨진 반지름 후보", en: "candidate broken radius" },
];
export function getMcc21GlassWalk(E) {
  return { code: FULL_PY, vars: _GLASS_VARS, beats: [
    { hi: [0, 8], bubble: t(E,
        "What order do the radii need to be in before the alternating sum even makes sense?\nSort them largest-first (b) — that's the order the plates actually stack in.",
        "번갈아 더하려면 반지름이 어떤 순서로 있어야 할까요?\n큰 것부터 줄 세워요(b) — 판이 실제로 쌓이는 순서예요.") },
    { hi: [9, 18], bubble: t(E,
        "Redoing the alternating sum from scratch for every slot would be slow — what can we build once instead?\nprefix[i] stores the alternating sum of the first i known radii, so S = prefix[m] is ready right away.",
        "매번 처음부터 다시 더하면 느린데, 무엇을 미리 만들어 둘까요?\nprefix[i] 에 앞 i 개까지의 번갈아 합을 쌓아 두면 S = prefix[m] 을 바로 꺼내 써요.") },
    { hi: [19, 27], bubble: t(E,
        "We don't know which slot the broken radius sits in — so what do we try?\nEvery slot p, one at a time. Once p is fixed, only x² is unknown, so we solve it directly.",
        "깨진 반지름이 어느 자리에 들어갈지 모르는데 어떻게 하나요?\n자리 p 를 하나씩 다 넣어 봐요. p 가 정해지면 모르는 값이 x² 하나뿐이라 바로 풀려요.") },
    { hi: [28, 30], bubble: t(E,
        "The formula gave us x² — does that make it a real radius?\nOnly if x² is a positive perfect square. math.isqrt gives the exact integer root to check x*x == x2.",
        "식에서 x² 가 나왔다고 진짜 반지름이 될까요?\nx² 가 양의 완전제곱수일 때만이에요. math.isqrt 로 정수 제곱근을 구해 x*x == x2 인지 확인해요.") },
    { hi: [31, 45], bubble: t(E,
        "x² checks out as a perfect square — is that enough to accept x?\nNo — x still has to fit between its neighbours at slot p. The first p that passes everything wins, so print x and stop.",
        "x² 가 완전제곱이면 그걸로 충분할까요?\n아니요 — x 가 자리 p 의 양옆 사이에도 들어가야 해요.\n이걸 다 통과한 첫 p 에서 출력하고 멈춰요.") },
  ] };
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


export function downloadMcc21GlassPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21Glass — Full Study Guide", "Mcc21Glass — 종합 풀이 노트");
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

