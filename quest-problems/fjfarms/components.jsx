// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 4/12 (1 WA + 7 TLE, O(N^2) too slow)
//   C++:    4/13 (1 WA + 8 TLE)
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "T = int(input())",
  "",
  "# t[i] is how many OTHER plants must end up strictly taller than plant i.",
  "# The judge guarantees t is a permutation of 0..N-1 — one plant per rank.",
  "# rank_to_index[r] = which plant should sit at rank r (r=0 is the tallest).",
  "def solve(N, h, a, t):",
  "    rank_to_index = [0] * N",
  "    for i in range(N):",
  "        rank_to_index[t[i]] = i",
  "",
  "    # Walk ranks from the shortest pair up to the tallest pair.",
  "    # For each neighboring pair, grow `days` only as much as needed",
  "    # so the taller-ranked plant is strictly ahead of the shorter one.",
  "    days = 0",
  "    for i in range(N - 2, -1, -1):",
  "        small_idx = rank_to_index[i + 1]",
  "        big_idx = rank_to_index[i]",
  "        small_height = h[small_idx] + a[small_idx] * days",
  "        big_height = h[big_idx] + a[big_idx] * days",
  "        if small_height >= big_height:",
  "            growth_diff = a[big_idx] - a[small_idx]",
  "            if growth_diff <= 0:",
  "                return -1",
  "            height_diff = small_height - big_height",
  "            days += (height_diff + 1 + growth_diff - 1) // growth_diff",
  "",
  "    # Growing `days` for a later pair can undo an earlier pair — recheck all.",
  "    for i in range(N - 2, -1, -1):",
  "        big_idx = rank_to_index[i]",
  "        small_idx = rank_to_index[i + 1]",
  "        big_height = h[big_idx] + a[big_idx] * days",
  "        small_height = h[small_idx] + a[small_idx] * days",
  "        if small_height >= big_height:",
  "            return -1",
  "",
  "    return days",
  "",
  "out = []",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    a = list(map(int, input().split()))",
  "    t = list(map(int, input().split()))",
  "    out.append(str(solve(N, h, a, t)))",
  "",
  "print('\\n'.join(out))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "// t[i] is how many OTHER plants must end up strictly taller than plant i.",
  "// The judge guarantees t is a permutation of 0..N-1 — one plant per rank.",
  "// rankToIndex[r] = which plant should sit at rank r (r=0 is the tallest).",
  "long long solve(int N, vector<long long>& h, vector<long long>& a, vector<int>& t) {",
  "    vector<int> rankToIndex(N);",
  "    for (int i = 0; i < N; i++) {",
  "        rankToIndex[t[i]] = i;",
  "    }",
  "",
  "    long long days = 0;",
  "    for (int i = N - 2; i >= 0; i--) {",
  "        int smallIdx = rankToIndex[i + 1];",
  "        int bigIdx = rankToIndex[i];",
  "        long long smallHeight = h[smallIdx] + a[smallIdx] * days;",
  "        long long bigHeight = h[bigIdx] + a[bigIdx] * days;",
  "        if (smallHeight >= bigHeight) {",
  "            long long growthDiff = a[bigIdx] - a[smallIdx];",
  "            if (growthDiff <= 0) {",
  "                return -1;",
  "            }",
  "            long long heightDiff = smallHeight - bigHeight;",
  "            days += (heightDiff + 1 + growthDiff - 1) / growthDiff;",
  "        }",
  "    }",
  "",
  "    for (int i = N - 2; i >= 0; i--) {",
  "        int bigIdx = rankToIndex[i];",
  "        int smallIdx = rankToIndex[i + 1];",
  "        long long bigHeight = h[bigIdx] + a[bigIdx] * days;",
  "        long long smallHeight = h[smallIdx] + a[smallIdx] * days;",
  "        if (smallHeight >= bigHeight) {",
  "            return -1;",
  "        }",
  "    }",
  "",
  "    return days;",
  "}",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int tc = 0; tc < T; tc++) {",
  "        int N;",
  "        cin >> N;",
  "        vector<long long> h(N), a(N);",
  "        vector<int> t(N);",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> h[i];",
  "        }",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> a[i];",
  "        }",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> t[i];",
  "        }",
  "        cout << solve(N, h, a, t) << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getFjFarmsSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we need? The smallest day x where every t[i] matches\n(or -1 if none does).",
            "무엇을 내놓아야 하나요? t[i] 가 전부 맞아떨어지는 가장 이른 날 x 예요.\n(그런 날이 없으면 -1)"),
        t(E, "What does t tell us? t[i] is how many plants must end up taller\nthan plant i. No two are the same, so the height order is already fixed.\nLine the plants up in that order first.",
            "t 는 무엇을 말해 주나요? t[i] 는 «나보다 커야 하는 식물 수» 예요.\n겹치는 값이 없으니 키 순서가 이미 정해진 셈이에요.\n먼저 그 순서대로 줄을 세워요."),
        t(E, "Now walk the line from the short end, two neighbors at a time.\nIf the one that should be shorter is still taller, push the day forward\njust enough — and if it grows no faster, no day ever works, so answer -1.",
            "이제 작은 쪽부터 이웃한 두 그루씩 봐요.\n작아야 할 쪽이 아직 더 크면, 날짜를 딱 필요한 만큼만 밀어요.\n더 빨리 자라지도 않으면 영영 안 되니까 -1 이에요."),
        t(E, "One more pass at the end: pushing the day for a later pair can undo\na pair we already fixed. So we check every neighbor once more.",
            "마지막에 한 번 더 훑어요. 뒤쪽 짝 때문에 날짜를 밀면\n앞에서 맞춰 둔 짝이 도로 뒤집힐 수 있거든요.\n그래서 이웃을 전부 한 번 더 확인해요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "A helper function solve(...) keeps main() short and readable.",
            "도우미 함수 solve(...) 로 나누면 main() 이 짧아서 읽기 좋아요."),
        t(E, "Heights use long long: a plant can start at 10^9 and keep growing,\nso plain int would overflow.",
            "키는 long long 으로 담아요. 처음부터 10억까지 갈 수 있고\n거기서 계속 자라서, int 로는 넘쳐요."),
      ],
    },
  ];
}

export function FjFarmsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). FULL_PY / FULL_CPP 는 🔒 USACO_VERIFIED 풀이의 표시용 배열이다 — 내용은
   절대 바꾸지 않고, 그대로 가져와 beats(설명 말풍선)만 덧붙인다. ── */
export function getFjFarmsWalk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: [
        { v: "rankToIndex", ko: "순위마다 어느 식물인지", en: "which plant sits at each rank" },
        { v: "days", ko: "지금까지 밀어 둔 날짜", en: "days pushed forward so far" },
      ],
      beats: [
        { hi: [0, 6], bubble: t(E,
          "What do we need to find? The earliest day x where every t[i] holds (or -1 if none does). t[i] is how many plants must end up taller than plant i — since no two are the same, the height order is already fixed.",
          "무엇을 찾아야 하나요? t[i] 가 전부 맞아떨어지는 가장 이른 날 x 예요(없으면 -1).\nt[i] 는 «나보다 커야 하는 식물 수» — 겹치는 값이 없으니 키 순서가 이미 정해져 있어요.") },
        { hi: [7, 11], bubble: t(E,
          "So build a helper solve(...) that first records that order: rankToIndex[r] = which plant belongs at rank r.",
          "그래서 도우미 함수 solve(...) 를 만들어요. 먼저 rankToIndex[r] 에\n순위 r 자리에 올 식물이 누군지 저장해요.") },
        { hi: [13, 27], bubble: t(E,
          "Walk the line from the shortest pair up. If the one that should be shorter is still taller (or equal), push days forward just enough — and if it grows no faster, no day ever works, so return -1.",
          "짧은 쪽부터 이웃한 두 그루씩 봐요. 작아야 할 쪽이 아직 크거나 같으면,\ndays 를 딱 필요한 만큼만 밀어요. 더 빨리 자라지도 않으면 영영 안 되니 -1 이에요.") },
        { hi: [29, 37], bubble: t(E,
          "Pushing days for a later pair can undo a pair we already fixed. So check every neighbor once more.",
          "뒤쪽 짝 때문에 days 를 밀면 앞에서 맞춰 둔 짝이 도로 뒤집힐 수 있어요.\n그래서 이웃을 전부 한 번 더 확인해요.") },
        { hi: [39, 40], bubble: t(E,
          "If nothing broke, return the day we landed on.",
          "아무것도 안 깨졌으면 지금까지 밀어 둔 날짜를 돌려줘요.") },
        { hi: [42, 58], bubble: t(E,
          "For each of T cases, read N, then the starting heights h, growth rates a, and target ranks t.",
          "T 케이스마다 N 을 읽고, 시작 키 h, 하루 성장량 a, 목표 순위 t 를 읽어요.") },
        { hi: [59, 62], bubble: t(E,
          "Call solve on this case and print the answer, then move to the next case.",
          "이 케이스로 solve 를 불러 답을 출력하고, 다음 케이스로 넘어가요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: [
      { v: "rank_to_index", ko: "순위마다 어느 식물인지", en: "which plant sits at each rank" },
      { v: "days", ko: "지금까지 밀어 둔 날짜", en: "days pushed forward so far" },
    ],
    beats: [
      { hi: [0, 0], bubble: t(E,
        "What do we need to find? The earliest day x where every t[i] holds (or -1 if none does). There are several cases, so read T first.",
        "무엇을 찾아야 하나요? t[i] 가 전부 맞아떨어지는 가장 이른 날 x 예요(없으면 -1).\n케이스가 여러 개라 먼저 T 를 읽어요.") },
      { hi: [2, 9], bubble: t(E,
        "What does t tell us? t[i] is how many plants must end up taller than plant i — since no two are the same, the height order is already fixed. rank_to_index[r] records who belongs at rank r.",
        "t 는 무엇을 말해 주나요? t[i] 는 «나보다 커야 하는 식물 수» —\n겹치는 값이 없으니 키 순서가 이미 정해져 있어요.\nrank_to_index[r] 에 순위 r 자리에 올 식물을 저장해요.") },
      { hi: [10, 24], bubble: t(E,
        "Walk the line from the shortest pair up. If the one that should be shorter is still taller (or equal), push days forward just enough — and if it grows no faster, no day ever works, so return -1.",
          "짧은 쪽부터 이웃한 두 그루씩 봐요. 작아야 할 쪽이 아직 크거나 같으면,\ndays 를 딱 필요한 만큼만 밀어요. 더 빨리 자라지도 않으면 영영 안 되니 -1 이에요.") },
      { hi: [26, 33], bubble: t(E,
        "Pushing days for a later pair can undo a pair we already fixed. So check every neighbor once more.",
        "뒤쪽 짝 때문에 days 를 밀면 앞에서 맞춰 둔 짝이 도로 뒤집힐 수 있어요.\n그래서 이웃을 전부 한 번 더 확인해요.") },
      { hi: [35, 35], bubble: t(E,
        "If nothing broke, return the day we landed on.",
        "아무것도 안 깨졌으면 지금까지 밀어 둔 날짜를 돌려줘요.") },
      { hi: [37, 45], bubble: t(E,
        "For each of T cases, read N, h, a, t, call solve, and collect the answer — then print them all at once.",
        "T 케이스마다 N, h, a, t 를 읽고 solve 를 불러 답을 모은 뒤,\n마지막에 한 번에 출력해요.") },
    ],
  };
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


export function downloadFjFarmsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혀 있어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "FjFarms — Full Study Guide", "FjFarms — 종합 풀이 노트");
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

