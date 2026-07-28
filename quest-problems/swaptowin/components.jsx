// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 0/1 (WA: print empty join produces extra newline)
//   C++:    12/12 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

export const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N, M = map(int, input().split())",
  "    target = input().strip()",
  "    s = [list(input().strip()) for _ in range(N)]",
  "",
  "    ops = []",
  "    # Fix s[0] one position at a time, left to right.",
  "    for k in range(M):",
  "        if s[0][k] == target[k]:",
  "            continue",
  "",
  "        # Try to find target[k] later in s[0] -> 1 op suffices.",
  "        found = False",
  "        for p in range(k + 1, M):",
  "            if s[0][p] == target[k]:",
  "                # op type 1: swap within s_1 (1-indexed string and positions)",
  "                ops.append(f\"1 1 {k+1} {p+1}\")",
  "                s[0][k], s[0][p] = s[0][p], s[0][k]",
  "                found = True",
  "                break",
  "        if found:",
  "            continue",
  "",
  "        # Otherwise borrow from another string s_y (y >= 1) -> at most 2 ops.",
  "        for y in range(1, N):",
  "            pos = -1",
  "            for q in range(M):",
  "                if s[y][q] == target[k]:",
  "                    pos = q",
  "                    break",
  "            if pos == -1:",
  "                continue",
  "",
  "            # Move target[k] inside s_y to column k (if not already there).",
  "            if pos != k:",
  "                ops.append(f\"1 {y+1} {pos+1} {k+1}\")",
  "                s[y][pos], s[y][k] = s[y][k], s[y][pos]",
  "",
  "            # Swap column k between s_1 and s_y.",
  "            ops.append(f\"2 1 {y+1} {k+1}\")",
  "            s[0][k], s[y][k] = s[y][k], s[0][k]",
  "            break",
  "",
  "    print(len(ops))",
  "    print(\"\\n\".join(ops))",
];

export const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N, M; cin >> N >> M;",
  "        string target; cin >> target;",
  "        vector<string> s(N);",
  "        for (int i = 0; i < N; i++) cin >> s[i];",
  "",
  "        vector<string> ops;",
  "        for (int k = 0; k < M; k++) {",
  "            if (s[0][k] == target[k]) {",
  "                continue;",
  "            }",
  "",
  "            // Look ahead inside s_1 first: 1 op only.",
  "            int p = -1;",
  "            for (int j = k + 1; j < M; j++) {",
  "                if (s[0][j] == target[k]) {",
  "                    p = j;",
  "                    break;",
  "                }",
  "            }",
  "            if (p != -1) {",
  "                ops.push_back(\"1 1 \" + to_string(k+1) + \" \" + to_string(p+1));",
  "                swap(s[0][k], s[0][p]);",
  "                continue;",
  "            }",
  "",
  "            // Borrow from another string: at most 2 ops.",
  "            for (int y = 1; y < N; y++) {",
  "                int q = -1;",
  "                for (int j = 0; j < M; j++) {",
  "                    if (s[y][j] == target[k]) {",
  "                        q = j;",
  "                        break;",
  "                    }",
  "                }",
  "                if (q == -1) {",
  "                    continue;",
  "                }",
  "                if (q != k) {",
  "                    ops.push_back(\"1 \" + to_string(y+1) + \" \" + to_string(q+1) + \" \" + to_string(k+1));",
  "                    swap(s[y][q], s[y][k]);",
  "                }",
  "                ops.push_back(\"2 1 \" + to_string(y+1) + \" \" + to_string(k+1));",
  "                swap(s[0][k], s[y][k]);",
  "                break;",
  "            }",
  "        }",
  "",
  "        cout << ops.size() << \"\\n\";",
  "        for (int i = 0; i < (int)ops.size(); i++) {",
  "            cout << ops[i] << \"\\n\";",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

const SECTION_READ_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N, M = map(int, input().split())",
  "    target = input().strip()",
  "    s = [list(input().strip()) for _ in range(N)]",
];
const SECTION_READ_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N, M; cin >> N >> M;",
  "        string target; cin >> target;",
  "        vector<string> s(N);",
  "        for (int i = 0; i < N; i++) cin >> s[i];",
  "    }",
  "}",
];

const SECTION_SAME_PY = [
  "ops = []",
  "for k in range(M):",
  "    if s[0][k] == target[k]:",
  "        continue",
  "    # Case 1: target[k] sits later in s[0]. One swap fixes it.",
  "    for p in range(k + 1, M):",
  "        if s[0][p] == target[k]:",
  "            ops.append(f\"1 1 {k+1} {p+1}\")",
  "            s[0][k], s[0][p] = s[0][p], s[0][k]",
  "            break",
];
const SECTION_SAME_CPP = [
  "vector<string> ops;",
  "for (int k = 0; k < M; k++) {",
  "    if (s[0][k] == target[k]) {",
  "        continue;",
  "    }",
  "    int p = -1;",
  "    for (int j = k + 1; j < M; j++) {",
  "        if (s[0][j] == target[k]) {",
  "            p = j;",
  "            break;",
  "        }",
  "    }",
  "    if (p != -1) {",
  "        ops.push_back(\"1 1 \" + to_string(k+1) + \" \" + to_string(p+1));",
  "        swap(s[0][k], s[0][p]);",
  "        continue;",
  "    }",
  "}",
];

const SECTION_BORROW_PY = [
  "# Case 2: not in s[0] anymore. Borrow from some s_y.",
  "for y in range(1, N):",
  "    pos = -1",
  "    for q in range(M):",
  "        if s[y][q] == target[k]:",
  "            pos = q",
  "            break",
  "    if pos == -1:",
  "        continue",
  "    # Step A: bring target[k] to column k inside s_y (if needed).",
  "    if pos != k:",
  "        ops.append(f\"1 {y+1} {pos+1} {k+1}\")",
  "        s[y][pos], s[y][k] = s[y][k], s[y][pos]",
  "    # Step B: swap column k between s_1 and s_y.",
  "    ops.append(f\"2 1 {y+1} {k+1}\")",
  "    s[0][k], s[y][k] = s[y][k], s[0][k]",
  "    break",
];
const SECTION_BORROW_CPP = [
  "for (int y = 1; y < N; y++) {",
  "    int q = -1;",
  "    for (int j = 0; j < M; j++) {",
  "        if (s[y][j] == target[k]) {",
  "            q = j;",
  "            break;",
  "        }",
  "    }",
  "    if (q == -1) {",
  "        continue;",
  "    }",
  "    if (q != k) {",
  "        ops.push_back(\"1 \" + to_string(y+1) + \" \" + to_string(q+1) + \" \" + to_string(k+1));",
  "        swap(s[y][q], s[y][k]);",
  "    }",
  "    ops.push_back(\"2 1 \" + to_string(y+1) + \" \" + to_string(k+1));",
  "    swap(s[0][k], s[y][k]);",
  "    break;",
  "}",
];

const SECTION_OUT_PY = [
  "print(len(ops))",
  "print(\"\\n\".join(ops))",
];
const SECTION_OUT_CPP = [
  "cout << ops.size() << \"\\n\";",
  "for (int i = 0; i < (int)ops.size(); i++) {",
  "    cout << ops[i] << \"\\n\";",
  "}",
];

// CodeWalk — 코드 위 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙). 검증본 코드 그대로.
const _SW_VARS = [
  { v: "target", ko: "목표 문자열", en: "the target" },
  { v: "s", ko: "문자열들", en: "the strings" },
  { v: "ops", ko: "조작 목록", en: "the operations" },
  { v: "k", ko: "고치는 자리", en: "position to fix" },
];
export function getSwapToWinWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _SW_VARS, beats: [
      { hi: [5, 11],  bubble: t(E, "Each test: read N, M, the target string, and the N strings s.", "테스트마다: N, M, 목표 문자열 target, 문자열 N개 s 읽기.") },
      { hi: [13, 17], bubble: t(E, "Fix s[0] one position at a time, left to right. If it already matches target, skip.", "s[0] 를 왼쪽부터 한 칸씩 target 에 맞춰요. 이미 맞으면 넘어감.") },
      { hi: [19, 31], bubble: t(E, "Case 1: if target[k] sits further right in s[0], one swap fixes it (1 op).", "Case 1: target[k] 가 s[0] 뒤쪽에 있으면 → 한 번 스왑으로 해결 (1 op).") },
      { hi: [33, 52], bubble: t(E, "Case 2: not in s[0] — borrow it from another string s_y (at most 2 ops: line it up, then swap the column).", "Case 2: s[0] 에 없으면 다른 문자열 s_y 에서 빌려옴 (최대 2 op: 자리 맞추고 열 스왑).") },
      { hi: [55, 58], bubble: t(E, "Print how many operations, then the operations.", "조작 횟수 출력 후, 조작들 출력.") },
    ] };
  }
  return { code: FULL_PY, vars: _SW_VARS, beats: [
    { hi: [0, 1],   bubble: t(E, "Fast input.", "빠른 입력.") },
    { hi: [3, 9],   bubble: t(E, "Each test: read N, M, the target string, the N strings s. ops = list of moves.", "테스트마다: N, M, 목표 문자열 target, 문자열 N개 s. ops = 조작 목록.") },
    { hi: [10, 13], bubble: t(E, "Fix s[0] one position at a time, left to right. If it already matches, skip.", "s[0] 를 왼쪽부터 한 칸씩 target 에 맞춰요. 이미 맞으면 넘어감.") },
    { hi: [15, 25], bubble: t(E, "Case 1: if target[k] sits further right in s[0], one swap fixes it (1 op).", "Case 1: target[k] 가 s[0] 뒤쪽에 있으면 → 한 번 스왑으로 해결 (1 op).") },
    { hi: [27, 45], bubble: t(E, "Case 2: not in s[0] — borrow it from another string s_y (at most 2 ops: line it up, then swap the column).", "Case 2: s[0] 에 없으면 다른 문자열 s_y 에서 빌려옴 (최대 2 op: 자리 맞추고 열 스왑).") },
    { hi: [47, 48], bubble: t(E, "Print how many operations, then the operations.", "조작 횟수 출력 후, 조작들 출력.") },
  ] };
}

export function getSwapToWinSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read input", "1️⃣ 입력 읽기"),
      color: A,
      py: SECTION_READ_PY, cpp: SECTION_READ_CPP,
      why: [
        t(E, "Multiple test cases — wrap everything in a loop over T.",
            "테스트 케이스 여러 개 — 전체를 T 반복 안에 넣어요."),
        t(E, "Store strings as lists of characters so we can swap in place.",
            "문자열은 글자 리스트로 저장 — 제자리에서 swap 하기 위함."),
      ],
      pyOnly: [
        t(E, "list(input()) turns a string into a mutable char list.",
            "list(input()) 으로 문자열을 수정 가능한 리스트로 변환."),
      ],
      cppOnly: [
        t(E, "std::string is already mutable — index it directly with s[i][j].",
            "std::string 은 이미 변경 가능 — s[i][j] 로 바로 접근."),
      ],
    },
    {
      label: t(E, "2️⃣ Same-string fix (1 op)", "2️⃣ 같은 줄에서 해결 (1 op)"),
      color: A,
      py: SECTION_SAME_PY, cpp: SECTION_SAME_CPP,
      why: [
        t(E, "Walk position k from 0 to M-1. If s_1 already matches there, skip.",
            "k 를 0부터 M-1 까지 훑어요. 이미 맞으면 건너뜀."),
        t(E, "If the wanted letter exists later inside s_1 itself, one within-string swap is enough.",
            "필요한 글자가 s_1 의 뒤쪽에 있다면 같은 줄 안에서 한 번만 swap 하면 끝."),
      ],
    },
    {
      label: t(E, "3️⃣ Borrow from another string (≤ 2 ops)", "3️⃣ 다른 줄에서 빌려오기 (≤ 2 ops)"),
      color: A,
      py: SECTION_BORROW_PY, cpp: SECTION_BORROW_CPP,
      why: [
        t(E, "If s_1 has none left, look in s_2, s_3, … for the wanted letter.",
            "s_1 에 더 이상 없으면 s_2, s_3, … 에서 글자를 찾아요."),
        t(E, "Step A: shuffle that letter to column k inside its own string.",
            "Step A: 그 글자를 자기 줄 안에서 k 번째 칸으로 옮겨요."),
        t(E, "Step B: type-2 swap exchanges column k between s_1 and s_y.",
            "Step B: type-2 swap 으로 s_1 과 s_y 의 k 번째 칸을 교환."),
        t(E, "Worst case 2 ops per position × M positions = 2M total. ✓",
            "최악 한 자리당 2 ops × M 자리 = 2M 개. ✓"),
      ],
    },
    {
      label: t(E, "4️⃣ Output", "4️⃣ 출력"),
      color: A,
      py: SECTION_OUT_PY, cpp: SECTION_OUT_CPP,
      why: [
        t(E, "Print K first, then each operation line.",
            "먼저 K, 그 다음 연산을 줄마다 출력."),
        t(E, "Operations were collected in order; just print them as-is.",
            "연산은 순서대로 모았으니 그대로 출력."),
      ],
    },
  ];
}

export function SwapToWinProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","swap","to_string"];
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


export function downloadSwapToWinPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Swap to Win — Full Study Guide", "Swap to Win — 종합 풀이 노트");
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
  .hint { background: #ecfdf5; border: 1px solid #34d399; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #065f46; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2026 Third Contest, Bronze #3 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
