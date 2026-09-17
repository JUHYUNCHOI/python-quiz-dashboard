// 🔒 USACO_VERIFIED (2026-05-13) — ⚠️ 구버전 재귀는 TLE 였음:
//   (old) Python: 5/14 (TLE, 메모이제이션 없는 지수 재귀) · C++: 8/9+ (TLE)
//   **2026-07-17 (선생님 "재귀는 힘들어 + 재귀 아니어도 되면 다 없애줘"): 재귀 완전 제거 + TLE 해결.
//     알고리즘 재설계 — 블록 정규화 c[i]=min(a[i], 2*c[i-1]) → 큰 블록 통당가 최저 →
//     'skip' 분기 불필요 → 쿼리당 분기 없는 O(N) (큰 블록부터: 올림-정지 후보 + 내림-이월).
//     검증: 구 재귀(정답, 느림)와 **전수 4142(N≤5) + 랜덤 9400(N≤14, 큰 값) 완전 일치, 불일치 0**,
//     PY==CPP 교차, 공식 샘플(x=6→45, x=7→55) 일치, clang++ 컴파일.
//     ⚠️ 알고리즘 자체가 바뀜(구버전은 애초에 TLE) → USACO 재제출로 만점(AC) 확인 필수.**
//   **2026-09-15: 블록 크기 계산 버그 둘 수정 (감사·QA·PM 판정). 알고리즘은 안 건드림.**
//     증상 — CPP: `1LL << i` 가 i=N-1 까지 돌아 N≥64 에서 UB (N=64 에 답 0, 무작위 200건 중 142건 오답).
//            PY : 같은 `1 << i` 가 3만 자리 거대 정수를 만들어 N=100,000·Q=100 에 **164초**.
//     원인 — 로컬 검증을 N≤14 까지만 돌렸다. 화면 제약은 1 ≤ N ≤ 100,000 이라 99.9% 가 미검증이었다.
//     고침 — x ≤ 10^9 < 2^30 이므로 30번보다 큰 블록은 하나로 다 덮여 볼 필요가 없다.
//            루프를 `min(N-1, 30)` 에서 시작하게 한 줄만 바꿨다 (PY·CPP 각 1줄).
//     검증 — 공식 샘플 일치 · 브루트포스 300케이스(1800쿼리) 불일치 0 · N=30~200 에서 PY==CPP ·
//            **N=100,000 Q=10,000 실제 실행: PY 0.18초 · CPP 0.15초** · 옛 코드가 맞던 N≤63 구간 200케이스 답 동일.
//     ✅ **2026-09-17 선생님이 제출해 파이썬·C++ 둘 다 통과 확인.** 지금 화면 코드 = 통과한 코드다.
//   **2026-09-15 (2): 한 줄에 문장 여러 개를 폈다. 선생님 "한줄에 여러개가 있고 읽기 싫던데" (두 번째 지적).**
//     CPP 4줄 — `for (...) cin >> a[i];` · `for (...) c[i] = ...;` · `ll x; cin >> x;` ·
//     `ll ans = INF, cost = 0, rem = x;` → 각각 폈다 (39줄 → 46줄). 동작은 그대로다.
//     ⚠️ 줄이 늘어서 CodeWalk `hi` 를 전부 다시 매겼다 —
//        [9,12]→[9,14] · [14,19]→[16,23] · [21,23]→[25,30] · [24,32]→[31,39] · [34,35]→[41,42].
//        말풍선 5개가 다 제자리에 붙는 것을 화면에서 눈으로 확인했다.
//     검증 5단계 재실행 전부 통과 (N=100,000 Q=10,000 실측 PY 0.18초 · CPP 0.16초).
//     새 검사기: `scripts/check-code-one-statement.py`
//   **2026-09-15 (3): 비트 시프트를 걷어냈다. 학생이 `1LL << i` 에서 "멈추고 싶었다" 고 했다.**
//     `/decide` 3라운드 — 기획·감사·python-qa·cpp-qa 에게 서로 안 보이게 묻고 PM 이 종합.
//     판정 근거: 화면은 이 문제를 **어디서도 `<<` 로 말하지 않는다** ("블록·두 배" 로만 말한다).
//       코드에서만 다른 기호로 다시 쓴 것 → **본질이 아니라 수단.** 그래서 코드를 바꾼다.
//       (부분집합 열거처럼 비트가 곧 아이디어인 quest 는 이 판정 밖이다 — aircond·feb23·
//        mcc21simplemath. 거긴 대체 표현이 없어서 커리큘럼 문제고, 선생님 판정으로 올렸다.)
//     PY : `size = 1 << i` → **`size = 2 ** i`** (`**` 는 파이썬 레슨 4 에서 가르친다)
//     CPP: `ll size = 1LL << i;` → **`blockSize[i]` 표** (C++ 엔 `**` 가 없다). 46 → 53줄.
//          이름을 `c` 와 안 겹치게 골랐다 — `c[i]` 는 값, `blockSize[i]` 는 통 수다.
//     ⚠️ CPP 가 7줄 늘어 `hi` 를 다시 매겼고 말풍선도 하나 늘렸다(표를 설명해야 해서) —
//        [25,30]=새 표 · [32,37] · [38,46] · [48,49]. 6개 다 제자리인 것을 화면에서 확인했다.
//     검증: PY 21,780쿼리 불일치 0 (python-qa) · CPP 무작위 500 + 브루트포스 200 불일치 0,
//        ASan/UBSan 클린 (cpp-qa) · 5단계 재실행 전부 통과 (상한 PY 0.19초 · CPP 0.15초).
//     남은 `<<` 는 `cout <<` 뿐 — 학생이 이미 아는 뜻이다.
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
  "# Normalize: c[i] = cheapest cost for a block of 1 doubled i times.",
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
  "    # biggest useful block down to the smallest (i = 0)",
  "    for i in range(min(N - 1, 30), -1, -1):   # 30 doublings already pass x",
  "        size = 2 ** i",
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
  "    for (int i = 0; i < N; i++) {",
  "        cin >> a[i];",
  "    }",
  "",
  "    // Normalize: c[i] = cheapest cost for a block of 1 doubled i times",
  "    // (buy deal i, or two smaller blocks). Then a bigger block is",
  "    // always cheaper PER BUCKET — use big blocks first, no recursion.",
  "    vector<ll> c(N);",
  "    c[0] = a[0];",
  "    for (int i = 1; i < N; i++) {",
  "        c[i] = min(a[i], 2 * c[i - 1]);",
  "    }",
  "",
  "    // blockSize[i] = how many buckets block i holds: 1 doubled i times",
  "    vector<ll> blockSize(31);   // blocks 0 through 30",
  "    blockSize[0] = 1;",
  "    for (int i = 1; i <= 30; i++) {",
  "        blockSize[i] = blockSize[i - 1] * 2;",
  "    }",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        ll x;",
  "        cin >> x;",
  "        ll ans = INF;      // best answer so far",
  "        ll cost = 0;       // cost locked in so far",
  "        ll rem = x;        // buckets still to cover",
  "        for (int i = min(N - 1, 30); i >= 0; i--) {   // 30 doublings already pass x",
  "            ll size = blockSize[i];",
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

// CodeWalk — 코드 위 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙). 검증본 코드 그대로.
const _BM_VARS = [
  { v: "a", ko: "거래 가격들", en: "deal prices" },
  { v: "c", ko: "묶음마다 제일 싼 값", en: "cheapest per block" },
  { v: "x", ko: "필요한 통 수", en: "buckets needed" },
  { v: "rem", ko: "남은 통", en: "buckets left" },
];
export function getBuyMilkWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _BM_VARS, beats: [
      { hi: [9, 14],   bubble: t(E, "Read N, Q and the prices a.\nDeal 1 in the problem is a[0] in the code.\nSo a[i] buys 1 doubled i times: 1, 2, 4, 8, ...", "N, Q 와 가격 a 를 읽어요.\n문제의 1번 거래가 코드에서는 a[0] 이에요.\n그래서 a[i] 는 1 을 i 번 두 배 한 만큼이에요 — 1, 2, 4, 8, ...") },
      { hi: [16, 23], bubble: t(E, "Normalize the deals.\nc[i] = the cheapest way to get that block:\nbuy deal i, or buy two smaller blocks.\nThen a bigger block is never worse per bucket,\nso we go big-to-small with no recursion.", "묶음마다 제일 싼 값을 미리 구해요.\nc[i] 는 그 묶음을 사는 가장 싼 값이에요.\n거래 i 를 사거나, 절반짜리 묶음 두 개를 사요.\n이렇게 하면 큰 묶음이 손해가 아니게 돼요.\n그래서 큰 것부터 훑으면 되고 재귀가 필요 없어요.") },
      { hi: [25, 30], bubble: t(E, "Write down how many buckets each block holds.\nStart at 1 and keep doubling: 1, 2, 4, 8, ...\nx is at most 1,000,000,000, and block 30 holds 1,073,741,824 — already past it.\nSo blocks 0 through 30 are enough, which is 31 slots.\nC++ has no ** operator, so we build the list once.", "묶음마다 몇 통인지 미리 적어둬요.\n1 에서 시작해서 계속 두 배예요 — 1, 2, 4, 8, ...\nx 는 많아야 10억인데 30번 묶음이 1,073,741,824 라 벌써 넘어요.\n그래서 0번부터 30번까지면 충분해요 — 칸이 31개예요.\nC++ 에는 ** 가 없어서 한 번 만들어 두고 써요.") },
      { hi: [32, 37], bubble: t(E, "Each query: need x buckets. Start ans, cost, rem.", "물음이 하나 올 때마다 x 통이 필요해요.\nans · cost · rem 을 처음 값으로 놓아요.") },
      { hi: [38, 46], bubble: t(E, "i never needs to go above 30 —\nthat is exactly why the table stopped there.\n(A) Round up with this block and stop, or\n(B) take the floor and cover the rest with smaller blocks.", "i 가 30보다 커질 일이 없어요 —\n표를 30번까지만 만든 게 그 이유예요.\n(A) 이 묶음으로 올려 사고 끝내거나,\n(B) 내려 사고 나머지는 더 작은 묶음으로 채워요.") },
      { hi: [48, 49], bubble: t(E, "Also the exact-cover case; print the cheapest answer.", "딱 맞게 산 경우도 후보예요.\n제일 싼 값을 출력해요.") },
    ] };
  }
  return { code: FULL_PY, vars: _BM_VARS, beats: [
    { hi: [0, 1],   bubble: t(E, "Fast input.", "입력을 빠르게 받아요.") },
    { hi: [3, 4],   bubble: t(E, "Read N, Q and the prices a.\nDeal 1 in the problem is a[0] in the code.\nSo a[i] buys 1 doubled i times: 1, 2, 4, 8, ...", "N, Q 와 가격 a 를 읽어요.\n문제의 1번 거래가 코드에서는 a[0] 이에요.\n그래서 a[i] 는 1 을 i 번 두 배 한 만큼이에요 — 1, 2, 4, 8, ...") },
    { hi: [6, 13],  bubble: t(E, "Normalize the deals.\nc[i] = the cheapest way to get that block:\nbuy deal i, or buy two smaller blocks.\nThen a bigger block is never worse per bucket,\nso we go big-to-small with no recursion.", "묶음마다 제일 싼 값을 미리 구해요.\nc[i] 는 그 묶음을 사는 가장 싼 값이에요.\n거래 i 를 사거나, 절반짜리 묶음 두 개를 사요.\n이렇게 하면 큰 묶음이 손해가 아니게 돼요.\n그래서 큰 것부터 훑으면 되고 재귀가 필요 없어요.") },
    { hi: [15, 20], bubble: t(E, "Each query: need x buckets. Start ans, cost, rem.", "물음이 하나 올 때마다 x 통이 필요해요.\nans · cost · rem 을 처음 값으로 놓아요.") },
    { hi: [22, 30], bubble: t(E, "x is at most 1,000,000,000.\nDoubling 30 times already passes it: 1,073,741,824.\nSo i never needs to go above 30.\n(A) Round up with this block and stop, or\n(B) take the floor and cover the rest with smaller blocks.", "x 는 많아야 10억이에요.\n2 를 30번 곱하면 벌써 넘어요 — 1,073,741,824.\n그래서 i 가 30보다 커질 일이 없어요.\n(A) 이 묶음으로 올려 사고 끝내거나,\n(B) 내려 사고 나머지는 더 작은 묶음으로 채워요.") },
    { hi: [31, 32], bubble: t(E, "Also the exact-cover case; save the cheapest answer.", "딱 맞게 산 경우도 후보예요.\n제일 싼 값을 저장해요.") },
    { hi: [34, 34], bubble: t(E, "Print all answers at once.", "답을 한 번에 출력해요.") },
  ] };
}

export function getBuyMilkSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Step 1 — normalize: c[i] = the cheapest way to get a 2^i-bucket block. Either buy deal i, or glue two of the (i-1) blocks: c[i] = min(a[i], 2*c[i-1]).",
            "1단계 — 묶음마다 제일 싼 값을 미리 구해요.\nc[i] 는 2^i 통짜리 묶음을 얻는 가장 싼 값이에요.\n거래 i 를 그냥 사거나, 절반짜리 묶음 두 개를 붙여요.\n그래서 c[i] = min(a[i], 2*c[i-1]) 이에요."),
        t(E, "The payoff: after normalizing, a BIGGER block is always cheaper per bucket. So we never need to 'skip' a big block for small ones — that's why no recursion is needed.",
            "이렇게 해 두면 큰 묶음일수록 한 통에 드는 값이 싸요.\n그래서 큰 묶음을 건너뛰고 작은 것만 쓸 이유가 없어요.\n재귀가 필요 없는 이유가 바로 이거예요."),
        t(E, "Step 2 — per query: go from the biggest block down. At each size, try (round UP here and stop = buy a bit extra), then take the floor and carry the remainder to smaller blocks. Keep the minimum. O(N) per query, no recursion.",
            "2단계 — 물음이 올 때마다 큰 묶음부터 내려가요.\n크기마다 '올려 사고 끝내기' 값을 후보로 넣어요.\n그다음 내려 산 만큼만 쓰고 나머지는 작은 묶음으로 넘겨요.\n제일 작은 값을 남겨요. 물음 하나에 O(N) 이고 재귀가 없어요."),
        t(E, "Why over-buy? One big cheap block can cover x while overshooting — sometimes cheaper than exact. That's the 'round UP and stop' option.",
            "왜 넉넉히 사나요?\n싼 큰 묶음 하나로 x 를 넘겨 덮는 게 딱 맞추기보다 쌀 때가 있어요.\n그게 '올려 사고 끝내기' 후보예요."),
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
