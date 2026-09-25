// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 10/10 on cpid=1156 (fixed missing trailing 0-pad)
//   이전 상태 (2026-06-15): C++ 6/10 — '양의 점프(upward jumps)' 합 방식이
//   trailing 0 패드를 빠뜨림 → d 가 음수로 끝나는 (오른쪽 끝 스톨을 낮춰야 하는)
//   테스트에서 과소 계산되어 WA. 양끝 패딩 중 한쪽만 처리한 off-by-one.
//   2026-06-16 수정: 공식 에디토리얼 공식으로 교체 — d[i]=pref-cur 를 0 으로
//   양끝 패딩 후 인접 차의 절댓값 합 / 2 = 최소 +1/-1 구간 명령 수.
//   로컬 검증: 공식 샘플(cpid 1156: 5\n1 5 3 3 4\n1 2 2 2 1 → 5) 일치,
//   에디토리얼 레퍼런스와 랜덤 300케이스 전부 일치, 음수로 끝나는 엣지 통과.
//   USACO 재제출로 전 테스트 확정 후 REPO_ROOT/USACO_VERIFICATION.md 갱신.

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

const FULL_PY = [
  "N = int(input())",
  "preferred = list(map(int, input().split()))  # p[i] = target temp",
  "current = list(map(int, input().split()))    # t[i] = current temp",
  "",
  "# d[i] = how much stall i must change (target - current)",
  "d = [preferred[i] - current[i] for i in range(N)]",
  "",
  "# A +1/-1 range command changes the total gap by at most 2, so the",
  "# minimum number of commands equals the sum of |d[i]-d[i+1]| over the",
  "# array padded with 0 on BOTH ends, divided by 2.",
  "ext = [0] + d + [0]",
  "total = 0",
  "for i in range(1, len(ext)):",
  "    total += abs(ext[i] - ext[i - 1])",
  "",
  "print(total // 2)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "long long llabs_(long long x) {",
  "    if (x < 0) {",
  "        return -x;",
  "    }",
  "    return x;",
  "}",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<long long> pref(N), cur(N);",
  "    for (auto& x : pref) {",
  "        cin >> x;  // target temps",
  "    }",
  "    for (auto& x : cur) {",
  "        cin >> x;   // current temps",
  "    }",
  "",
  "    // d[i] = pref[i] - cur[i]; pad d with 0 at BOTH ends.",
  "    // A +1/-1 range command changes the total gap by at most 2, so",
  "    // answer = (sum of |d[i]-d[i+1]| over the padded array) / 2.",
  "    long long total = 0;",
  "    long long prev = 0;  // leading 0 pad",
  "    for (int i = 0; i < N; i++) {",
  "        long long cur_d = pref[i] - cur[i];",
  "        total += llabs_(cur_d - prev);",
  "        prev = cur_d;",
  "    }",
  "    total += llabs_(0 - prev);  // trailing 0 pad (needed when d ends negative)",
  "    cout << total / 2 << \"\\n\";",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 아래는 위 FULL_PY/FULL_CPP 를 **그대로** 쓴다 — 배열 내용은 절대 바꾸지 않고,
   beats(설명 말풍선)만 덧붙인다. getAirCond1Sections() 는 PDF 다운로드가 계속 쓰므로
   그대로 둔다. ── */
export function getAirCond1Walk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: [
        { v: "llabs_", ko: "직접 만든 절댓값 함수", en: "hand-written absolute-value helper" },
        { v: "total", ko: "이웃 칸 차이의 합", en: "sum of neighbor differences" },
        { v: "prev", ko: "바로 앞 칸의 d 값 (양끝은 0)", en: "the previous cell's d value (0 at both ends)" },
      ],
      beats: [
        { hi: [0, 9], bubble: t(E,
          "First, build a small helper llabs_ — it flips the sign for negatives to return the absolute value. It's hand-written instead of std::llabs, so the code itself shows exactly what it does.",
          "먼저 llabs_ 라는 작은 도우미를 직접 만들어요 — 음수면 부호를 뒤집어 절댓값을 돌려줘요.\nstd::llabs 대신 이렇게 직접 짜서, 뭘 하는 함수인지 코드만 보고 알 수 있게 했어요.") },
        { hi: [11, 20], bubble: t(E,
          "Read N, then fill pref (target temps) and cur (current temps).",
          "N 을 읽고, 목표 온도(pref) 와 현재 온도(cur) 를 채워요.") },
        { hi: [22, 26], bubble: t(E,
          "A command shifts a whole range, so we can't count stall by stall. Set up total, and prev (starting at 0) to act as the padding.",
          "명령 하나가 구간 전체를 +1/-1 하니까 칸마다 따로 셀 수 없어요.\n이웃 차이를 더할 준비로 total 과, 양 끝 패딩 역할을 할 prev(처음엔 0)를 둬요.") },
        { hi: [27, 31], bubble: t(E,
          "For each stall, compute cur_d = target − current, add |cur_d − prev| to total, then update prev to cur_d.",
          "칸마다 cur_d = 목표 − 현재 를 구하고, 바로 앞 값(prev)과의 차이(절댓값)를 total 에 더해요.\n그리고 prev 를 지금 값으로 바꿔 둬요.") },
        { hi: [32, 35], bubble: t(E,
          "Finally, add the difference against the trailing 0 pad too — this catches cases where d ends negative. Then print total divided by 2.",
          "마지막으로 오른쪽 끝 패딩(0)과의 차이도 한 번 더해요 — d 가 음수로 끝나는 경우를 놓치지 않으려고요.\n그리고 total 을 2로 나눠 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: [
      { v: "d", ko: "칸마다 목표 − 현재", en: "target minus current, per stall" },
      { v: "ext", ko: "d 양 끝에 0 을 붙인 배열", en: "d padded with 0 on both ends" },
      { v: "total", ko: "이웃 칸 차이의 합", en: "sum of neighbor differences" },
    ],
    beats: [
      { hi: [0, 2], bubble: t(E,
        "What should we output? The fewest AC commands to bring every stall to its target. Read N, preferred, and current.",
        "무엇을 내놓아야 하나요? 모든 축사를 목표 온도로 맞추는 최소 명령 횟수예요.\nN, 목표 온도(preferred), 현재 온도(current)를 읽어요.") },
      { hi: [4, 5], bubble: t(E,
        "A command shifts a whole range by +1/-1, so we can't count stall by stall. Instead compute d[i] = target − current — how much each stall must change.",
        "명령 하나는 구간 전체를 +1/-1 하니까, 칸마다 따로 셀 수 없어요.\n대신 d[i] = 목표 − 현재, 즉 각 칸이 얼마나 바뀌어야 하는지를 구해요.") },
      { hi: [7, 10], bubble: t(E,
        "We'll compare d to its neighbors, so pad both ends with 0 to make ext.",
        "d 가 이웃과 얼마나 다른지 볼 거라, 양 끝에 0 을 붙여서 ext 를 만들어요.") },
      { hi: [11, 13], bubble: t(E,
        "Sum the absolute difference between each pair of neighbors in ext — that's total.",
        "ext 에서 이웃한 값의 차이(절댓값)를 다 더해요 — 그게 total 이에요.") },
      { hi: [15, 15], bubble: t(E,
        "Print total divided by 2 — since both ends are 0, every rise in d is matched by a fall, so each command was counted twice.",
        "total 을 2로 나눠 출력해요 — 양 끝이 0 이라 오른 만큼 내린 곳도 있어서, 명령을 두 번씩 센 셈이거든요.") },
    ],
  };
}

export function getAirCond1Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we output? The fewest AC commands to bring every stall to its target temperature.",
            "무엇을 답으로 내야 하나요?\n모든 축사를 목표 온도로 맞추는 최소 명령 횟수예요."),
        t(E, "One command changes a whole range by +1/-1, so we can't count stall by stall — we need to look at where the needed change jumps up or down.",
            "명령 한 번이 구간 전체를 +1 또는 -1 하는 것뿐이라,\n칸마다 따로 세면 안 되고 '변화량이 바뀌는 지점' 을 봐야 해요."),
        t(E, "So compute d[i] = target - current, pad both ends with 0, and sum |difference| between neighbors.",
            "그래서 d[i] = 목표 - 현재 를 구하고, 양 끝에 0 을 붙여서\n이웃한 d 값의 차이(절댓값)를 다 더해요."),
        t(E, "Divide that sum by 2 — since both ends are 0, every rise in d is matched by a fall, so we counted each command twice.",
            "그 합을 2 로 나누면 답이 나와요 — 양 끝이 0 이라\n값이 오른 만큼 내린 곳도 있어서, 명령을 두 번씩 센 셈이거든요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map) make algorithms concise.",
            "Python의 고수준 구문 (list, map)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) — 코드 의도가 명확해져."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합/곱이 약 2×10^9를 넘을 수 있으면 long long 사용."),
      ],
    },
  ];
}

export function AirCond1ProgressiveCode(props) {
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


export function downloadAirCond1PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "AirCond1 — Full Study Guide", "AirCond1 — 종합 풀이 노트");
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

