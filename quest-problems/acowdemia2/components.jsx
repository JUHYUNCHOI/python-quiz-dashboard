// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 10/10 on cpid=1132
// ⚠️ REWRITTEN 2026-06-15 — 이전 quest 는 made-up 문제(저자 ID 정수, 개수 출력)였음.
//   실제 Acowdemia II (2021 US Open Bronze #2, cpid 1132) 로 재작성.
//   샘플 1·2 로컬 통과 (C++ g++ -std=c++17 / Python3, exact match).
//   USACO 재제출 PENDING — 통과 확인 후 USACO_VERIFIED 로 갱신.

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "K, N = map(int, input().split())",
  "names = input().split()",
  "idx = {nm: i for i, nm in enumerate(names)}",
  "",
  "# senior[i][j] = i is DEFINITELY more senior than j",
  "senior = [[False] * N for _ in range(N)]",
  "",
  "for _ in range(K):",
  "    pub = input().split()   # decreasing effort order",
  "    for x in range(N):",
  "        broke = False",
  "        for y in range(x + 1, N):",
  "            if pub[y] < pub[y - 1]:",
  "                broke = True       # real effort gap (not just a tie)",
  "            if broke:",
  "                # pub[y] has less effort => pub[y] is senior to pub[x]",
  "                senior[idx[pub[y]]][idx[pub[x]]] = True",
  "",
  "for i in range(N):",
  "    row = []",
  "    for j in range(N):",
  "        if i == j:",
  "            row.append('B')",
  "        elif senior[i][j]:",
  "            row.append('1')",
  "        elif senior[j][i]:",
  "            row.append('0')",
  "        else:",
  "            row.append('?')",
  "    print(''.join(row))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    int K, N;",
  "    cin >> K >> N;",
  "    vector<string> names(N);",
  "    map<string, int> idx;",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> names[i];",
  "        idx[names[i]] = i;",
  "    }",
  "",
  "    // senior[i][j] = i is definitely more senior than j",
  "    vector<vector<bool> > senior(N, vector<bool>(N, false));",
  "",
  "    for (int k = 0; k < K; k++) {",
  "        vector<string> pub(N);                 // decreasing effort order",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> pub[i];",
  "        }",
  "        for (int x = 0; x < N; x++) {",
  "            bool broke = false;",
  "            for (int y = x + 1; y < N; y++) {",
  "                if (pub[y] < pub[y - 1]) {",
  "                    broke = true;  // real effort gap",
  "                }",
  "                if (broke) {",
  "                    // pub[y] has less effort => senior to pub[x]",
  "                    senior[idx[pub[y]]][idx[pub[x]]] = true;",
  "                }",
  "            }",
  "        }",
  "    }",
  "",
  "    for (int i = 0; i < N; i++) {",
  "        string row = \"\";",
  "        for (int j = 0; j < N; j++) {",
  "            if (i == j) {",
  "                row += 'B';",
  "            } else if (senior[i][j]) {",
  "                row += '1';",
  "            } else if (senior[j][i]) {",
  "                row += '0';",
  "            } else {",
  "                row += '?';",
  "            }",
  "        }",
  "        cout << row << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 🔒 검증된 위 배열을 그대로 쓴다 — 한 글자도 안 바꿨다.
   getAcowdemia2Sections() 는 PDF 다운로드가 계속 쓰므로 그대로 둔다. ── */
export function getAcowdemia2Walk(E, lang = "py") {
  const vars = [
    { v: "senior[i][j]", ko: "i 가 j 보다 선임이란 증거", en: "proof i is senior to j" },
    { v: "pub", ko: "이번 논문의 저자 순서", en: "this paper's author order" },
    { v: "broke", ko: "알파벳 순서가 깨졌나", en: "did alphabetical order break" },
  ];
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars,
      beats: [
        { hi: [0, 17], bubble: t(E,
          "Read K publications' worth of N names, and set up an N×N senior grid. What should we output? For every pair, mark senior / junior / unknown.",
          "논문 K 편 분의 저자 이름 N 개를 읽고, N×N senior 표를 만들어요.\n무엇을 답으로 내야 하나요? 모든 쌍마다 선임/후임/판단불가를 표시해요.") },
        { hi: [18, 36], bubble: t(E,
          "Names could just be tied in effort and happen to be alphabetical, so order alone doesn't prove a gap. For each publication, walk left to right: once alphabetical order breaks, that's proof of a real effort gap — and everyone after that point is senior to everyone before it.",
          "이름이 알파벳순인 건 노력이 같아서일 수도 있어서,\n순서만 보고는 노력이 진짜 다른지 알 수 없어요.\n그래서 논문마다 왼쪽부터 훑어요 — 알파벳 순서가 깨지는 지점이 진짜 노력 차이의 증거고,\n그 뒤에 온 사람은 전부 그 앞사람보다 선임이에요.") },
        { hi: [37, 54], bubble: t(E,
          "Once we've read every publication, fill the grid from what we recorded and print it row by row.",
          "논문을 다 훑었으면, 기록해 둔 것으로 표를 채워서 한 줄씩 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars,
    beats: [
      { hi: [0, 5], bubble: t(E,
        "Read K publications' worth of N names, and set up an N×N senior grid. What should we output? For every pair, mark senior / junior / unknown.",
        "논문 K 편 분의 저자 이름 N 개를 읽고, N×N senior 표를 만들어요.\n무엇을 답으로 내야 하나요? 모든 쌍마다 선임/후임/판단불가를 표시해요.") },
      { hi: [6, 16], bubble: t(E,
        "Names could just be tied in effort and happen to be alphabetical, so order alone doesn't prove a gap. For each publication, walk left to right: once alphabetical order breaks, that's proof of a real effort gap — and everyone after that point is senior to everyone before it.",
        "이름이 알파벳순인 건 노력이 같아서일 수도 있어서,\n순서만 보고는 노력이 진짜 다른지 알 수 없어요.\n그래서 논문마다 왼쪽부터 훑어요 — 알파벳 순서가 깨지는 지점이 진짜 노력 차이의 증거고,\n그 뒤에 온 사람은 전부 그 앞사람보다 선임이에요.") },
      { hi: [17, 29], bubble: t(E,
        "Once we've read every publication, fill the grid from what we recorded and print it row by row.",
        "논문을 다 훑었으면, 기록해 둔 것으로 표를 채워서 한 줄씩 출력해요.") },
    ],
  };
}

export function getAcowdemia2Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we output? An N×N grid marking, for every pair, who is definitely senior.",
            "무엇을 답으로 내야 하나요?\n두 연구원마다 선임(1)·후임(0)·판단 불가(?) 를 적은 N×N 격자예요."),
        t(E, "Names could just be listed alphabetically because effort was tied, so order alone doesn't prove a real effort gap.",
            "이름이 알파벳순으로 나열된 건 노력이 같아서일 수도 있어서,\n순서만 보고는 노력이 진짜 다른지 알 수 없어요."),
        t(E, "So look for the point where the order breaks alphabetically — that's proof of a real gap, and everyone after it is more senior than the one before.",
            "그래서 순서가 알파벳을 깨는 지점을 찾아요 — 그건 노력이\n진짜 다르다는 증거고, 그 뒤에 온 사람은 더 선임이에요."),
        t(E, "Once it breaks, everyone further right is also senior to x — record that for every publication, then fill the grid from what we've learned.",
            "한 번 깨진 뒤로는 그 뒤 사람 전부가 x 보다 선임이라\n기록하고, 논문 K 편에서 알아낸 걸 다 모아 표를 채워요."),
      ],
      pyOnly: [
        t(E, "Python's map() makes the code shorter.",
            "Python 은 map() 덕분에 알고리즘을 짧게 쓸 수 있어요."),
      ],
      cppOnly: [
        t(E, "Split #include into specific headers (iostream, vector, string, map) — what we've been using.",
            "#include 는 배운 헤더(iostream, vector, string, map)만 하나씩 나눠 적어요."),
        t(E, "Names are strings — store them in vector<string> and use a map<string,int> for the index.",
            "이름은 문자열이라 vector<string> 에 담고, 번호는 map<string,int> 로 찾아요."),
      ],
    },
  ];
}

export function Acowdemia2ProgressiveCode(props) {
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


export function downloadAcowdemia2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Acowdemia2 — Full Study Guide", "Acowdemia2 — 종합 풀이 노트");
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

