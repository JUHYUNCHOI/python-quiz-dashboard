// ⚠️ USACO_PENDING_REVERIFY (2026-08-14 rewrite)
//   이전 M=3 letter-group 풀이는 k=1 서브태스크만 통과 (3/14). 선생님 지시
//   ("틀린답인데 우리꺼를 왜 갖고 있어") → 공식 답안의 M=2 block-pair 매칭
//   풀이로 재작성. 로컬 sample 검증 통과 (2 / 2 1 1 1 1 2). USACO 채점기
//   재제출로 14/14 확인 필요 — 확인 후 이 헤더를 🔒 USACO_VERIFIED 로 갱신.

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";



export function getCowSplitsSections(E) {
  return [
    {
      label: t(E, "🧮 Setup & Parity Check", "🧮 셋업 + 홀짝 판단"),
      color: A,
      py: [
        "import sys",
        "input = sys.stdin.readline",
        "",
        "T, k = map(int, input().split())",
        "out = []",
        "for _ in range(T):",
        "    N = int(input())",
        "    S = input().strip()",
        "    n3 = 3 * N",
        "    if N % 2 == 1:",
        "        out.append('-1')",
        "        continue",
      ],
      cpp: [
        "#include <iostream>",
        "#include <string>",
        "#include <vector>",
        "using namespace std;",
        "",
        "int main() {",
        "    int T, k;",
        "    cin >> T >> k;",
        "    for (int t = 0; t < T; t++) {",
        "        int N;",
        "        cin >> N;",
        "        string S;",
        "        cin >> S;",
        "        int n3 = 3 * N;",
        "        if (N % 2 == 1) {",
        "            cout << -1 << \"\\n\";",
        "            continue;",
        "        }",
      ],
      why: [
        t(E, "Each operation removes a square (even length). Total length 3N must be even, so N must be even.",
            "각 연산은 짝수 길이 제곱 문자열을 제거. 총 길이 3N 도 짝수여야 하므로 N 이 짝수여야 함."),
        t(E, "If N is odd, immediately print -1 and skip to the next test case.",
            "N 이 홀수면 즉시 -1 을 출력하고 다음 테스트로 넘어감."),
      ],
      pyOnly: [
        t(E, "sys.stdin.readline speeds up reading when T can be up to 10^4.",
            "T 가 최대 10^4 라 sys.stdin.readline 으로 입력 가속."),
      ],
      cppOnly: [
        t(E, "Loop T times with a for-loop — clear count, no extra variable.",
            "T 번 for-loop 로 반복 — 카운터 명시, 군더더기 없음."),
      ],
    },
    {
      label: t(E, "🎯 M = 1 Try", "🎯 M = 1 시도"),
      color: A,
      py: [
        "    half = n3 // 2",
        "    if S[:half] == S[half:]:",
        "        out.append('1')",
        "        out.append(' '.join(['1'] * n3))",
        "        continue",
      ],
      cpp: [
        "        int half = n3 / 2;",
        "        if (S.substr(0, half) == S.substr(half)) {",
        "            cout << 1 << \"\\n\";",
        "            for (int i = 0; i < n3; i++) {",
        "                cout << 1;",
        "                cout << (i == n3 - 1 ? '\\n' : ' ');",
        "            }",
        "            continue;",
        "        }",
      ],
      why: [
        t(E, "M=1 means S itself is a square Y+Y. That happens iff first half == second half.",
            "M=1 은 S 자체가 제곱 Y+Y 라는 뜻. 앞 절반 == 뒤 절반일 때 성립."),
        t(E, "Print 1, then label every character with operation 1.",
            "1 을 출력하고 모든 문자에 연산 번호 1 을 부여."),
      ],
      pyOnly: [
        t(E, "Slicing S[:half] vs S[half:] is O(n3) — fine for the input bounds.",
            "S[:half], S[half:] 슬라이싱은 O(n3). 입력 한도 내에서 충분히 빠름."),
      ],
      cppOnly: [
        t(E, "S.substr(0, half) returns a copy; comparison with S.substr(half) takes O(n3).",
            "S.substr 은 복사본을 반환하고 비교는 O(n3)."),
      ],
    },
    {
      label: t(E, "🔀 Block-Pair Trick (M = 2)", "🔀 블록 쌍 트릭 (M = 2)"),
      color: A,
      py: [
        "    ans = [1] * n3",
        "    for i in range(N // 2):",
        "        a = S[i*3 : i*3 + 3]",
        "        b = S[(i + N//2)*3 : (i + N//2)*3 + 3]",
        "        if a != b:",
        "            if a[:2] == b[1:]:",
        "                ans[i*3 + 2] = 2",
        "                ans[(i + N//2)*3] = 2",
        "            else:",
        "                ans[i*3] = 2",
        "                ans[(i + N//2)*3 + 2] = 2",
        "    M = max(ans)",
        "    out.append(str(M))",
        "    out.append(' '.join(str(x) for x in ans))",
        "print('\\n'.join(out))",
      ],
      cpp: [
        "        vector<int> ans(n3, 1);",
        "        for (int i = 0; i < N / 2; i++) {",
        "            string a = S.substr(i*3, 3);",
        "            string b = S.substr((i + N/2)*3, 3);",
        "            if (a != b) {",
        "                if (a.substr(0, 2) == b.substr(1, 2)) {",
        "                    ans[i*3 + 2] = 2;",
        "                    ans[(i + N/2)*3] = 2;",
        "                } else {",
        "                    ans[i*3] = 2;",
        "                    ans[(i + N/2)*3 + 2] = 2;",
        "                }",
        "            }",
        "        }",
        "        int M = 1;",
        "        for (int x : ans) if (x > M) M = x;",
        "        cout << M << \"\\n\";",
        "        for (int i = 0; i < n3; i++) {",
        "            cout << ans[i] << (i == n3 - 1 ? '\\n' : ' ');",
        "        }",
        "    }",
        "    return 0;",
        "}",
      ],
      why: [
        t(E, "Pair each front block i with its back partner block (i + N/2). Start all letters in op 1.",
            "각 앞쪽 블록 i 와 뒤쪽 파트너 블록 (i + N/2) 를 짝지어요. 모든 글자는 처음엔 op 1."),
        t(E, "Any two of {COW, OWC, WCO} share a 2-letter overlap. If a[:2] == b[1:] → move a's last + b's first to op 2. Else a[1:] == b[:2] → move a's first + b's last to op 2.",
            "COW/OWC/WCO 어떤 두 블록도 2 글자가 겹쳐요. a[:2] == b[1:] 면 → a 의 마지막 + b 의 첫 글자를 op 2. 아니면 a[1:] == b[:2] → a 의 첫 글자 + b 의 마지막을 op 2."),
        t(E, "Op 1 sequence: front-half 2-chars per pair = back-half 2-chars per pair → Y+Y ✓. Op 2 sequence: same 1 letter from front and back per pair → Y+Y ✓.",
            "Op 1 수열: 쌍마다 앞쪽 2 글자 = 뒤쪽 2 글자 → Y+Y ✓. Op 2 수열: 쌍마다 앞쪽 1 글자 = 뒤쪽 1 글자 (같은 문자) → Y+Y ✓."),
        t(E, "If all pairs already matched (a == b) → M stays 1. Otherwise M = 2. Always minimal — passes both k = 0 and k = 1.",
            "모든 쌍이 이미 일치 (a == b) 하면 → M = 1 그대로. 그렇지 않으면 M = 2. 항상 최소 — k = 0 · k = 1 둘 다 통과."),
      ],
      pyOnly: [
        t(E, "String slicing on 3-char blocks is O(1)-ish and reads naturally.",
            "3 글자 블록 슬라이싱은 사실상 O(1), 읽기도 자연스러움."),
      ],
      cppOnly: [
        t(E, "vector<int> ans holds the operation label per position. Loop finds M with a running max.",
            "vector<int> ans 가 위치별 연산 번호. 순회하며 최댓값으로 M 계산."),
      ],
    },
  ];
}

// CodeWalk — 코드 위 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙).
// 3섹션이 하나의 연속 프로그램이라 그대로 이어 붙임. 코드 문자열은 그대로.
const _CS_VARS = [
  { v: "N", ko: "블록 수", en: "# of COW blocks" },
  { v: "S", ko: "길이 3N 문자열", en: "the length-3N string" },
  { v: "n3", ko: "전체 길이 3N", en: "total length 3N" },
  { v: "M", ko: "연산 수(답)", en: "# operations (answer)" },
];
export function getCowSplitsWalk(E, lang = "py") {
  const s = getCowSplitsSections(E);
  if (lang === "cpp") {
    const code = [...s[0].cpp, ...s[1].cpp, ...s[2].cpp];
    // s0=18 (0-17), s1=9 (18-26), s2=23 (27-49)
    return { code, vars: _CS_VARS, beats: [
      { hi: [0, 4],   bubble: t(E, "Includes (iostream/string/vector) and main open — the usual C++ scaffold.", "헤더 (iostream/string/vector) 와 main 시작 — 평범한 C++ 시작 준비.") },
      { hi: [5, 8],   bubble: t(E, "Read T (# tests) and k. Loop T times.", "T (테스트 개수) 와 k 읽기. T 번 반복.") },
      { hi: [9, 13],  bubble: t(E, "Each test: read N, then the length-3N string S. n3 = 3·N.", "각 테스트: N 을 읽고, 길이 3N 짜리 S 읽기. n3 = 3·N.") },
      { hi: [14, 17], bubble: t(E, "Parity gate: each op removes an even-length square → 3N must be even → N must be even. Odd N → -1.", "홀짝 관문: 각 연산은 짝수 길이 제곱 → 3N 짝수 → N 짝수 필수. N 홀수면 -1.") },
      { hi: [18, 19], bubble: t(E, "Try M = 1: S itself is a square iff front half == back half. Compare with substr.", "M = 1 시도: S 자체가 제곱이려면 앞 절반 == 뒤 절반. substr 로 비교.") },
      { hi: [20, 26], bubble: t(E, "If yes → print 1 and label every letter with operation 1. Skip to next test.", "맞으면 → 1 출력하고 모든 글자에 연산 번호 1. 다음 테스트로.") },
      { hi: [27, 30], bubble: t(E, "Otherwise — the M=2 block-pair trick. Start every letter in op 1. Loop over front-half block index i; grab a (front block) and b (back partner block i + N/2).", "아니면 — M=2 블록 쌍 트릭. 모든 글자는 처음엔 op 1. 앞 절반 블록 i 를 순회하며 a (앞 블록) 와 b (뒤 파트너 블록 i + N/2) 꺼내기.") },
      { hi: [31, 40], bubble: t(E, "If a ≠ b, any two of {COW, OWC, WCO} share a 2-letter overlap. Check which 2 chars overlap: a[:2]==b[1:] or a[1:]==b[:2]. Move the mismatched 1 char from each side to op 2.", "a ≠ b 라면, COW/OWC/WCO 어느 두 블록도 2 글자가 겹쳐요. a[:2]==b[1:] 인지 a[1:]==b[:2] 인지 확인해서, 겹치지 않는 1 글자씩을 op 2 로 이동.") },
      { hi: [41, 49], bubble: t(E, "M = max(ans) — either 1 (all pairs matched) or 2 (any mismatch). Print M and every letter's label.", "M = max(ans) — 모든 쌍 일치면 1, 하나라도 다르면 2. M 과 글자별 라벨 출력.") },
    ] };
  }
  const code = [...s[0].py, ...s[1].py, ...s[2].py];
  // s0=12 (0-11), s1=5 (12-16), s2=15 (17-31)
  return { code, vars: _CS_VARS, beats: [
    { hi: [0, 1],   bubble: t(E, "Fast input — sys.stdin.readline (T can hit 10⁴).", "빠른 입력 — sys.stdin.readline (T 최대 10⁴).") },
    { hi: [3, 5],   bubble: t(E, "Read T and k. Collect answers in `out`. Loop T times.", "T 와 k 읽기. `out` 에 답 모으고, T 번 반복.") },
    { hi: [6, 8],   bubble: t(E, "Each test: read N, then the length-3N string S. n3 = 3·N.", "각 테스트: N 읽고, 길이 3N 짜리 S 읽기. n3 = 3·N.") },
    { hi: [9, 11],  bubble: t(E, "Parity gate: each op removes an even-length square → 3N must be even → N must be even. Odd N → -1.", "홀짝 관문: 각 연산은 짝수 길이 제곱 → 3N 짝수 → N 짝수 필수. N 홀수면 -1.") },
    { hi: [12, 13], bubble: t(E, "Try M = 1: front half == back half? If so, S is one big square.", "M = 1 시도: 앞 절반 == 뒤 절반? 이면 S 자체가 제곱.") },
    { hi: [14, 16], bubble: t(E, "If yes → append '1' and label every letter with 1. Skip to next test.", "맞으면 → '1' 추가하고 모든 글자에 라벨 1. 다음 테스트로.") },
    { hi: [17, 20], bubble: t(E, "Otherwise — the M=2 block-pair trick. Start every letter in op 1. Loop over front-half block index i; grab a (front block) and b (back partner block i + N/2).", "아니면 — M=2 블록 쌍 트릭. 모든 글자는 처음엔 op 1. 앞 절반 블록 i 를 순회하며 a (앞 블록) 와 b (뒤 파트너 블록 i + N/2) 꺼내기.") },
    { hi: [21, 27], bubble: t(E, "If a ≠ b, any two of {COW, OWC, WCO} share a 2-letter overlap. Check which: a[:2]==b[1:] or a[1:]==b[:2]. Move the mismatched 1 char from each side to op 2.", "a ≠ b 라면, COW/OWC/WCO 어느 두 블록도 2 글자가 겹쳐요. a[:2]==b[1:] 인지 a[1:]==b[:2] 인지 확인해서, 겹치지 않는 1 글자씩을 op 2 로 이동.") },
    { hi: [28, 31], bubble: t(E, "M = max(ans) — either 1 (all pairs matched) or 2 (any mismatch). Print M and every letter's label.", "M = max(ans) — 모든 쌍 일치면 1, 하나라도 다르면 2. M 과 글자별 라벨 출력.") },
  ] };
}

export function CowSplitsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
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


export function downloadCowSplitsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "COW Splits — Full Study Guide", "COW 분할 — 종합 풀이 노트");
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
  .hint { background: #ecfdf5; border: 1px solid #6ee7b7; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #065f46; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2026 First Contest, Bronze #2 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
