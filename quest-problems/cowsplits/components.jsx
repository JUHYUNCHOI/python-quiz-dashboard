import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
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
  "    half = n3 // 2",
  "    if S[:half] == S[half:]:",
  "        out.append('1')",
  "        out.append(' '.join(['1'] * n3))",
  "        continue",
  "    label = {'C': 1, 'O': 2, 'W': 3}",
  "    labels = [str(label[ch]) for ch in S]",
  "    out.append('3')",
  "    out.append(' '.join(labels))",
  "print('\\n'.join(out))",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int T, k; cin >> T >> k;",
  "    while (T--) {",
  "        int N; cin >> N;",
  "        string S; cin >> S;",
  "        int n3 = 3 * N;",
  "        if (N % 2 == 1) { cout << -1 << \"\\n\"; continue; }",
  "        int half = n3 / 2;",
  "        if (S.substr(0, half) == S.substr(half)) {",
  "            cout << 1 << \"\\n\";",
  "            for (int i = 0; i < n3; i++) cout << 1 << \" \\n\"[i == n3 - 1];",
  "            continue;",
  "        }",
  "        cout << 3 << \"\\n\";",
  "        for (int i = 0; i < n3; i++) {",
  "            int x = (S[i] == 'C') ? 1 : (S[i] == 'O') ? 2 : 3;",
  "            cout << x << \" \\n\"[i == n3 - 1];",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

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
        "#include <bits/stdc++.h>",
        "using namespace std;",
        "",
        "int main() {",
        "    ios::sync_with_stdio(false);",
        "    cin.tie(nullptr);",
        "    int T, k; cin >> T >> k;",
        "    while (T--) {",
        "        int N; cin >> N;",
        "        string S; cin >> S;",
        "        int n3 = 3 * N;",
        "        if (N % 2 == 1) { cout << -1 << \"\\n\"; continue; }",
      ],
      why: [
        t(E, "Each operation removes a square (even length). Total length 3N must be even, so N must be even.",
            "각 연산은 짝수 길이 사각 문자열을 제거. 총 길이 3N 도 짝수여야 하므로 N 이 짝수여야 함."),
        t(E, "If N is odd, immediately print -1 and skip to the next test case.",
            "N 이 홀수면 즉시 -1 을 출력하고 다음 테스트로 넘어감."),
      ],
      pyOnly: [
        t(E, "sys.stdin.readline speeds up reading when T can be up to 10^4.",
            "T 가 최대 10^4 라 sys.stdin.readline 으로 입력 가속."),
      ],
      cppOnly: [
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) for fast I/O.",
            "ios::sync_with_stdio(false) + cin.tie(nullptr) 로 빠른 입출력."),
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
        "            for (int i = 0; i < n3; i++) cout << 1 << \" \\n\"[i == n3 - 1];",
        "            continue;",
        "        }",
      ],
      why: [
        t(E, "M=1 means S itself is a square Y+Y. That happens iff first half == second half.",
            "M=1 은 S 자체가 사각 Y+Y 라는 뜻. 앞 절반 == 뒤 절반일 때 성립."),
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
      label: t(E, "🌈 Letter-Group Trick (M = 3)", "🌈 글자 그룹 트릭 (M = 3)"),
      color: A,
      py: [
        "    label = {'C': 1, 'O': 2, 'W': 3}",
        "    labels = [str(label[ch]) for ch in S]",
        "    out.append('3')",
        "    out.append(' '.join(labels))",
        "print('\\n'.join(out))",
      ],
      cpp: [
        "        cout << 3 << \"\\n\";",
        "        for (int i = 0; i < n3; i++) {",
        "            int x = (S[i] == 'C') ? 1 : (S[i] == 'O') ? 2 : 3;",
        "            cout << x << \" \\n\"[i == n3 - 1];",
        "        }",
        "    }",
        "    return 0;",
        "}",
      ],
      why: [
        t(E, "Each block has exactly one C, one O, one W → total counts are N, N, N.",
            "각 블록엔 C, O, W 가 하나씩 → 총 개수는 각각 N."),
        t(E, "When N is even, each letter count is even. The subsequence of all C's is C^N — a square (Y = C^(N/2)).",
            "N 이 짝수면 각 글자 개수도 짝수. 모든 C 의 부분수열은 C^N — 사각 (Y = C^(N/2))."),
        t(E, "Op 1 takes every C, Op 2 every O, Op 3 every W. Three valid square operations → M = 3.",
            "Op 1 은 모든 C, Op 2 는 모든 O, Op 3 은 모든 W. 사각 연산 3 개 → M = 3."),
        t(E, "M = 3 is at most min+1 (since min is 1 or 2 when N even), so this is accepted whenever k = 1.",
            "M = 3 은 항상 min+1 이하 (N 짝수일 때 min 은 1 또는 2), 그래서 k = 1 이면 항상 통과."),
      ],
      pyOnly: [
        t(E, "Dictionary lookup for letter→label is O(1) per character.",
            "글자→라벨 딕셔너리 조회는 글자당 O(1)."),
      ],
      cppOnly: [
        t(E, "Ternary chain (S[i]=='C'?1: ...) avoids a map and stays cache-friendly.",
            "삼항 연산자 체인으로 map 없이 빠르게 처리."),
      ],
    },
  ];
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
