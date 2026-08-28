// ⚠️ USACO_PENDING_REVERIFY (2026-08-14 rewrite · 2026-08-27 로컬 검증 보강)
//   이전 M=3 letter-group 풀이는 k=1 서브태스크만 통과 (3/14). 선생님 지시
//   ("틀린답인데 우리꺼를 왜 갖고 있어") → 공식 답안의 M=2 block-pair 매칭 풀이로 재작성.
//
//   2026-08-27 로컬 검증 (M 값뿐 아니라 '출력한 배정이 실제로 정사각(YY)을 이루는지'까지):
//     · N=2 전수 9개 · N=4 전수 81개 — M 이 최소이고 배정도 전부 유효 (불일치 0)
//     · 랜덤 300,000건 (N 최대 100) — 배정 전부 유효, M=1 판정 오류 0
//     · 샘플 COWOWC → 2 / 2 1 1 1 1 2  (그룹1 OWOW, 그룹2 CC — 둘 다 정사각)
//   → 알고리즘 정확성은 확인됨. 다만 USACO 채점기 재제출은 아직이라 헤더는 PENDING 유지.
//     재제출로 14/14 확인 후 🔒 USACO_VERIFIED 로 갱신할 것.
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
        t(E, "Each operation removes Y+Y (even length). Total length 3N must be even, so N must be even.",
            "각 연산은 Y+Y (같은 덩어리 두 번, 짝수 길이) 를 제거. 총 길이 3N 도 짝수여야 하므로 N 이 짝수여야 함."),
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
        t(E, "M=1 means S itself is already Y+Y. That happens iff first half == second half.",
            "M=1 은 S 자체가 이미 Y+Y (같은 덩어리 두 번) 이라는 뜻. 앞 절반 == 뒤 절반일 때 성립."),
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
  { v: "ans", ko: "글자별 지우기 번호", en: "each letter's move #" },
  { v: "a, b", ko: "짝지은 앞·뒤 블록", en: "paired front / back block" },
  { v: "M", ko: "지우기 횟수(답)", en: "# moves (answer)" },
];
export function getCowSplitsWalk(E, lang = "py") {
  const s = getCowSplitsSections(E);
  if (lang === "cpp") {
    const code = [...s[0].cpp, ...s[1].cpp, ...s[2].cpp];
    // s0=18 (0-17), s1=9 (18-26), s2=23 (27-49)
    return { code, vars: _CS_VARS, beats: [
      { hi: [0, 4],   bubble: t(E, "Headers + main — the usual C++ start.", "헤더 + main 시작 — 평범한 C++ 준비.") },
      { hi: [5, 8],   bubble: t(E, "Read T tests and mode k (k we can ignore). Loop T times.", "테스트 T개와 모드 k 읽기 (k는 신경 안 써도 됨). T번 반복.") },
      { hi: [9, 13],  bubble: t(E, "Each test: read N and the length-3N string S. n3 = 3·N.", "각 테스트: N과 길이 3N 문자열 S 읽기. n3 = 3·N (전체 길이).") },
      { hi: [14, 17], bubble: t(E, "If N is odd, 3N is odd too — but each move erases an even number, so we can never empty it → −1.", "N이 홀수면 3N도 홀수예요. 한 번에 짝수 개씩만 지워서 끝까지 못 비워요 → −1.") },
      { hi: [18, 19], bubble: t(E, "First, can 1 move do it? Only if S is already a square — front half == back half.", "먼저 1번으로 될까? S가 통째로 제곱(앞 절반 == 뒤 절반)일 때만 돼요.") },
      { hi: [20, 26], bubble: t(E, "If so → M = 1, mark every letter as move 1, next test.", "그러면 → M = 1, 모든 글자를 1번으로 찍고 다음 테스트로.") },
      { hi: [27, 30], bubble: t(E, "Otherwise it's 2. Pair each front block a with its back partner b (the block pairs from the sim). Start every letter as move 1 (ans).", "아니면 2번이에요. 앞 블록 a와 뒤 파트너 블록 b를 짝지어요 (시뮬의 블록쌍). 일단 모든 글자를 1번으로 시작 — ans.") },
      { hi: [31, 40], bubble: t(E, "Paired blocks always share 2 letters (e.g. COW·OWC → OW). Keep the shared 2 as move 1 (OW·OW); move the leftover 1 letter each side to move 2 (C·C). The a[:2]/b[1:] check just finds which side overlaps.", "짝지은 두 블록은 늘 2글자가 겹쳐요 (예: COW·OWC의 OW). 겹치는 2글자는 1번에 그대로 두고(OW·OW), 남는 1글자씩만 2번으로 옮겨요(C·C). a[:2]/b[1:]는 어느 쪽이 겹치는지 확인하는 거예요.") },
      { hi: [41, 49], bubble: t(E, "The biggest move number is M (1 or 2). Print M, then each letter's move → e.g. 2 then 2 1 1 1 1 2.", "지우기 번호 중 가장 큰 게 M (1 또는 2). M과 글자별 번호를 출력 → 예: 2, 그리고 2 1 1 1 1 2.") },
    ] };
  }
  const code = [...s[0].py, ...s[1].py, ...s[2].py];
  // s0=12 (0-11), s1=5 (12-16), s2=15 (17-31)
  return { code, vars: _CS_VARS, beats: [
    { hi: [0, 1],   bubble: t(E, "Fast input — sys.stdin.readline (T can hit 10⁴).", "빠른 입력 — sys.stdin.readline (T 최대 10⁴).") },
    { hi: [3, 5],   bubble: t(E, "Read T tests and mode k (k we can ignore). Collect answers in out; loop T times.", "테스트 T개와 모드 k 읽기 (k는 신경 안 써도 됨). 답은 out에 모으고 T번 반복.") },
    { hi: [6, 8],   bubble: t(E, "Each test: read N and the length-3N string S. n3 = 3·N.", "각 테스트: N과 길이 3N 문자열 S 읽기. n3 = 3·N (전체 길이).") },
    { hi: [9, 11],  bubble: t(E, "If N is odd, 3N is odd too — but each move erases an even number, so we can never empty it → −1.", "N이 홀수면 3N도 홀수예요. 한 번에 짝수 개씩만 지워서 끝까지 못 비워요 → −1.") },
    { hi: [12, 13], bubble: t(E, "First, can 1 move do it? Only if S is already a square — front half == back half.", "먼저 1번으로 될까? S가 통째로 제곱(앞 절반 == 뒤 절반)일 때만 돼요.") },
    { hi: [14, 16], bubble: t(E, "If so → M = 1, mark every letter as move 1, next test.", "그러면 → M = 1, 모든 글자를 1번으로 찍고 다음 테스트로.") },
    { hi: [17, 20], bubble: t(E, "Otherwise it's 2. Pair each front block a with its back partner b (the block pairs from the sim). Start every letter as move 1 (ans).", "아니면 2번이에요. 앞 블록 a와 뒤 파트너 블록 b를 짝지어요 (시뮬의 블록쌍). 일단 모든 글자를 1번으로 시작 — ans.") },
    { hi: [21, 27], bubble: t(E, "Paired blocks always share 2 letters (e.g. COW·OWC → OW). Keep the shared 2 as move 1 (OW·OW); move the leftover 1 letter each side to move 2 (C·C). The a[:2]/b[1:] check just finds which side overlaps.", "짝지은 두 블록은 늘 2글자가 겹쳐요 (예: COW·OWC의 OW). 겹치는 2글자는 1번에 그대로 두고(OW·OW), 남는 1글자씩만 2번으로 옮겨요(C·C). a[:2]/b[1:]는 어느 쪽이 겹치는지 확인하는 거예요.") },
    { hi: [28, 31], bubble: t(E, "The biggest move number is M (1 or 2). Print M, then each letter's move → e.g. 2 then 2 1 1 1 1 2.", "지우기 번호 중 가장 큰 게 M (1 또는 2). M과 글자별 번호를 출력 → 예: 2, 그리고 2 1 1 1 1 2.") },
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
