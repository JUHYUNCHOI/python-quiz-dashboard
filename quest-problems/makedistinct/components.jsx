// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 13/13 PASS
//   C++:    13/13 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "import sys",
  "from collections import defaultdict",
  "input = sys.stdin.readline",
  "",
  "def solve():",
  "    n, k = map(int, input().split())",
  "    a = list(map(int, input().split()))",
  "    m = abs(k)",
  "",
  "    # Group indices by residue mod |K| (a += K never changes residue)",
  "    groups = defaultdict(list)",
  "    for x in a:",
  "        groups[x % m].append(x)",
  "",
  "    total = 0",
  "    for vals in groups.values():",
  "        # K > 0 → sort ascending; K < 0 → sort descending",
  "        vals.sort(reverse=(k < 0))",
  "        cur = vals[0]            # first slot stays put",
  "        for i in range(1, len(vals)):",
  "            # If next value already past cur, keep it; else push cur + K",
  "            if (k > 0 and vals[i] > cur) or (k < 0 and vals[i] < cur):",
  "                cur = vals[i]",
  "            else:",
  "                cur = cur + k",
  "                total += (cur - vals[i]) // k    # distance from vals[i] to cur, divided by K = pushes",
  "    print(total)",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    solve()",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <map>",
  "#include <algorithm>",
  "#include <cstdlib>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        long long n, k;",
  "        cin >> n >> k;",
  "        vector<long long> a(n);",
  "        for (int i = 0; i < n; i++) {",
  "            cin >> a[i];",
  "        }",
  "        long long m = llabs(k);",
  "",
  "        // Group by residue mod |K|",
  "        map<long long, vector<long long>> groups;",
  "        for (int i = 0; i < n; i++) {",
  "            long long x = a[i];",
  "            groups[((x % m) + m) % m].push_back(x);",
  "        }",
  "",
  "        long long total = 0;",
  "        for (auto &kv : groups) {",
  "            vector<long long> &vals = kv.second;",
  "            if (k > 0) {",
  "                sort(vals.begin(), vals.end());",
  "            } else {",
  "                sort(vals.begin(), vals.end(), greater<long long>());",
  "            }",
  "",
  "            long long cur = vals[0];",
  "            for (int i = 1; i < (int)vals.size(); i++) {",
  "                bool past;",
  "                if (k > 0) {",
  "                    past = (vals[i] > cur);",
  "                } else {",
  "                    past = (vals[i] < cur);",
  "                }",
  "                if (past) {",
  "                    cur = vals[i];",
  "                } else {",
  "                    cur = cur + k;",
  "                    total += (cur - vals[i]) / k;   // distance from vals[i] to cur, divided by K = pushes",
  "                }",
  "            }",
  "        }",
  "        cout << total << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

// CodeWalk — 코드 위 '왜 이렇게?' 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙).
// 검증본 코드(FULL_PY/CPP)는 그대로, 표시만 CodeWalk 로.
const _MD_VARS = [
  { v: "k", ko: "더하는 값", en: "the step" },
  { v: "m", ko: "K 크기 (항상 양수)", en: "size of K (always positive)" },
  { v: "groups", ko: "나머지별 묶음", en: "same-remainder groups" },
  { v: "vals", ko: "지금 보는 묶음의 값들", en: "this group's values" },
  { v: "cur", ko: "직전에 놓은 값", en: "last placed" },
];
export function getMakeDistinctWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _MD_VARS, beats: [
      { hi: [7, 17],  bubble: t(E, "What are we solving for? One number per test — the fewest operations needed.\ncin >> T reads the test count, then the loop runs once per test.\nn and k are long long — values can pass 2 billion, too big for int.\nLike the constraint on page 2, N can be up to 200,000 —\nif many numbers pile up, one may be pushed almost that far,\nand with many such numbers the total easily passes 2 billion.\nvector<long long> a(n) makes the array, and cin >> a[i] fills it one by one.\nllabs(k) is just abs() for long long — we need it because k can be negative.", "무엇을 구해야 하나요? 테스트마다 최소 횟수 하나예요.\ncin >> T 로 테스트 개수를 받고, 테스트마다 돌아요.\nn, k 는 long long 타입이에요 — 값이 20억을 넘을 수 있어 int 로는 부족해요.\n2쪽 제약처럼 N 이 최대 200,000 인데,\n같은 수가 몰리면 하나가 그 근처까지 밀릴 수 있고,\n그런 수가 여럿이면 답이 20억을 훌쩍 넘어요.\nvector<long long> a(n) 으로 배열을 만들고 cin >> a[i] 로 하나씩 채워요.\nllabs(k) 는 long long 용 abs() 예요 — k 가 음수일 수 있어서 절댓값이 필요해요.") },
      { hi: [19, 24], bubble: t(E, "Key insight: adding K never changes a value's remainder when divided by m.\nRemember page 5? With K = 2,\nodd/even was exactly that remainder —\nremainder 1 (the three 3s) and remainder 0 (the 4).\nSo group values by that remainder — groups never interact!\nC++'s % can return a negative number for negative input,\nso ((x % m) + m) % m nudges it back to 0..m-1.", "핵심: K 를 더해도 m 으로 나눈 나머지는 안 바뀌어요.\n5쪽에서 홀수·짝수로 갈랐죠? K = 2 일 때 그게 바로 나머지예요.\n나머지 1 묶음(홀수: 3, 3, 3)과 나머지 0 묶음(짝수: 4)이었어요.\n그래서 나머지가 같은 값끼리 묶으면, 묶음끼리는 서로 부딪히지 않아요!\nC++ 의 % 는 음수가 들어오면 음수를 돌려줄 수 있어서,\n((x % m) + m) % m 으로 한 번 더 보정해 0 이상으로 맞춰요.") },
      { hi: [26, 35], bubble: t(E, "total starts at 0 — every push adds to it.\nfor (auto &kv : groups) pulls out one group at a time —\nkv.second is that group's list of values (vals).\nFor K>0, sort ascending;\nfor K<0, sort(…, greater<long long>()) sorts descending.\nThe first value stays put as cur.\nvals.begin() and vals.end() just mark the start and end of the range to sort.", "total 은 0 에서 시작해요 — 밀 때마다 여기 더해요.\nfor (auto &kv : groups) 로 묶음을 하나씩 꺼내요 —\nkv.second 가 그 묶음의 값들(vals)이에요.\nK>0 이면 오름차순,\nK<0 이면 sort(…, greater<long long>()) 로 내림차순 정렬해요.\n첫 값은 그대로 두고 cur 로 삼아요.\nvals.begin(), vals.end() 는 정렬할 범위의 시작과 끝을 가리켜요.") },
      { hi: [36, 42], bubble: t(E, "past just answers one question: is this value already ahead of cur?\nFor K>0 that means greater; for K<0 (sorted the other way) it means smaller.", "past 는 딱 하나만 물어요 — 이 값이 이미 cur 보다 앞서 있는가.\nK 가 양수면 '더 크다', 음수면(반대로 정렬했으니) '더 작다' 로 정해요.") },
      { hi: [43, 44], bubble: t(E, "When past is true, there's no collision —\ncur = vals[i] simply becomes the new cur,\nand total doesn't change.", "past 가 true 면 부딪히지 않아요 —\ncur = vals[i] 로 그 값이 바로 새 cur 가 돼요.\ntotal 은 그대로예요.") },
      { hi: [45, 50], bubble: t(E, "cur = cur + k moves to the next free spot.\ncur was already pushed ahead by earlier values,\nso vals[i] leaps straight to cur in one jump.\ntotal += (cur - vals[i]) / k adds that count.\nC++'s / is integer division — it divides evenly here.\ntotal is long long, so it stays correct at scale.", "cur = cur + k 로 다음 빈 자리로 밀어요.\ncur 는 앞 반복들에서 이미 여러 번 밀려 있어서,\nvals[i] 는 한 번에 cur 까지 건너뛰어요.\ntotal += (cur - vals[i]) / k 로 그 횟수를 더해요.\nC++ 의 / 는 정수 나눗셈이라 나머지 없이 딱 떨어져요.\ntotal 이 long long 이라 값이 커져도 안전해요.") },
      { hi: [51, 51], bubble: t(E, "cout << total << \"\\n\" prints this test's answer — \"\\n\" instead of endl keeps it fast.", "cout << total << \"\\n\" 로 이 테스트의 답을 출력해요. endl 대신 \"\\n\" 을 써서 더 빨라요.") },
    ] };
  }
  return { code: FULL_PY, vars: _MD_VARS, beats: [
    { hi: [0, 2],   bubble: t(E, "What are we solving for? One number per test — the fewest operations needed.\nAll the N values added together can reach 1,000,000, so read fast first.\nWe swap the name input for a faster reader.", "무엇을 구해야 하나요?\n테스트마다 최소 횟수 하나예요.\nN 을 다 더하면 1,000,000 까지라 입력부터 빠르게 받아요.\ninput 이라는 이름에 더 빠른 읽기를 대신 넣어 두는 거예요.") },
    { hi: [4, 7],   bubble: t(E, "solve() handles ONE test: read n, k, the array.\nK can be negative, so the grouping size takes its absolute value: m = abs(k).\nabs strips the sign — abs(-2) is 2.", "solve() 는 테스트 하나를 맡아요. n, k, 배열을 읽어요.\nK 가 음수일 수도 있어서, 묶을 때 쓸 크기는 절댓값으로 잡아요: m = abs(k)\nabs 는 부호를 떼는 것 — abs(-2) 는 2 예요.") },
    { hi: [9, 12],  bubble: t(E, "Key insight: adding K never changes a value's remainder when divided by m.\nRemember page 5? With K = 2,\nodd/even was exactly that remainder —\nremainder 1 (the three 3s) and remainder 0 (the 4).\nSo group values by that remainder — groups never interact!\ndefaultdict(list) makes an empty list on its own\nthe first time a new remainder shows up.\nSo groups[x % m].append(x) just works —\nno need to check first whether that list exists.", "핵심: K 를 더해도 m 으로 나눈 나머지는 안 바뀌어요.\n5쪽에서 홀수·짝수로 갈랐죠? K = 2 일 때 그게 바로 나머지예요.\n나머지 1 묶음(홀수: 3, 3, 3)과 나머지 0 묶음(짝수: 4)이었어요.\n그래서 나머지가 같은 값끼리 묶으면, 묶음끼리는 서로 부딪히지 않아요!\ndefaultdict(list) 는 처음 보는 나머지가 나오면\n빈 리스트를 스스로 만들어 둬요.\n그래서 groups[x % m].append(x) 를 바로 쓸 수 있어요 —\n그 묶음이 이미 있는지 먼저 확인 안 해도 돼요.") },
    { hi: [14, 18], bubble: t(E, "total starts at 0 — every push adds to it.\nFor each group: sort (K>0 ascending, K<0 descending), then the first value stays put as cur.", "total 은 0 에서 시작해요 — 밀 때마다 여기 더해요.\n묶음마다 정렬해요 (K>0 은 오름차순, K<0 은 내림차순). 첫 값은 그대로 두고 cur 로 삼아요.") },
    { hi: [19, 22], bubble: t(E, "Walk through the rest of the group.\ncur is not how many times we pushed — it is the spot already taken.\nIf the next value is already past cur, it's safe: it becomes the new cur, no push needed.", "묶음의 나머지를 하나씩 봐요.\ncur 는 몇 번 밀었는지가 아니라 이미 차지한 자리예요.\n다음 값이 이미 cur 를 지나 있으면 안전해요 — 밀 필요 없이 그 값이 새 cur 가 돼요.") },
    { hi: [23, 25], bubble: t(E, "On collision, push to cur + K, the next free spot.\ncur isn't just the value we last compared —\nit's already been pushed several times by earlier steps.\nSo vals[i] leaps straight to cur in one jump.\nSame remainder means that gap is a multiple of K,\nso dividing it gives the exact push count.", "부딪히면 cur + K, 다음 빈 자리로 밀어요.\ncur 는 방금 비교한 그 값이 아니라,\n앞선 반복들에서 이미 여러 번 밀린 값이에요.\n그래서 vals[i] 는 한 번에 cur 까지 건너뛰어요.\n나머지가 같으면 그 거리는 K 의 배수라서,\n나누면 민 횟수가 그대로 나와요.") },
    { hi: [26, 26], bubble: t(E, "Print this test's answer.", "이 테스트의 답을 출력해요.") },
    { hi: [28, 30], bubble: t(E, "Run solve() for all T tests.\n_ is just a name for a value we don't use.", "T 개 테스트를 solve() 로 반복해요.\n_ 는 그 값을 안 쓸 때 쓰는 이름이에요.") },
  ] };
}

export function getMakeDistinctSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Adding K never changes residue mod |K|, so groups are independent.",
            "K 를 더해도 |K| 로 나눈 나머지는 변하지 않아요. 그래서 나머지가 같은 것끼리 묶으면 묶음끼리 서로 영향이 없어요."),
        t(E, "Within a group, sort then greedy: each element either stays or jumps to the next free slot.",
            "한 묶음 안에서는 정렬한 뒤 앞에서부터 봐요. 그대로 두거나 다음 빈 칸으로 밀어요."),
        t(E, "K > 0 sort ascending; K < 0 sort descending — same logic, mirrored direction.",
            "K > 0 이면 오름차순, K < 0 이면 내림차순으로 정렬해요. 방법은 같고 방향만 반대예요."),
      ],
      pyOnly: [
        t(E, "collections.defaultdict(list) auto-creates a fresh list for each new remainder, so grouping needs no existence check.",
            "collections.defaultdict(list) 를 쓰면 새 나머지마다 리스트를 자동으로 만들어 줘서, 묶을 때 있는지 확인하는 코드가 필요 없어요."),
        t(E, "Python big ints handle answer overflow automatically.",
            "Python 은 정수가 아무리 커져도 알아서 처리해 줘요."),
      ],
      cppOnly: [
        t(E, "N can be up to 200,000 (page 2) — if many numbers pile up, the answer can pass 2 billion, which int cannot hold, so long long is required.",
            "N 이 최대 200,000 이에요(2쪽 제약). 같은 수가 몰리면 답이 20억을 넘을 수 있어요. int 에는 안 들어가니 long long 을 꼭 써야 해요."),
        t(E, "((x % m) + m) % m gives a non-negative residue even for negative inputs (defensive).",
            "((x % m) + m) % m 으로 구하면 음수가 들어와도 나머지가 0 이상으로 나와요."),
      ],
    },
  ];
}

export function MakeDistinctProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadMakeDistinctPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Make All Distinct — Full Study Guide", "Make All Distinct — 종합 풀이 노트");
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
