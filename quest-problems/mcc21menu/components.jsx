import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "import sys",
  "from collections import defaultdict",
  "",
  "input = sys.stdin.readline",
  "children = defaultdict(list)",
  "",
  "def count(node):",
  "    total = 1  # count self",
  "    for c in children[node]:",
  "        total += count(c)",
  "    return total",
  "",
  "N = int(input())",
  "for _ in range(N):",
  "    line = input().split()",
  "    parent = line[0]",
  "    child = line[1]",
  "    children[parent].append(child)",
  "",
  "print(count('root'))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <unordered_map>",
  "using namespace std;",
  "",
  "unordered_map<string, vector<string>> children;",
  "",
  "int count_items(const string& node) {",
  "    int total = 1;  // count self",
  "    for (const string& c : children[node]) {",
  "        total += count_items(c);",
  "    }",
  "    return total;",
  "}",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    for (int i = 0; i < N; i++) {",
  "        string parent, child;",
  "        cin >> parent >> child;",
  "        children[parent].push_back(child);",
  "    }",
  "    cout << count_items(\"root\") << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc21MenuSections(E) {
  return [
    {
      label: t(E, "1️⃣ Setup — data structure for the tree", "1️⃣ 준비 — 트리를 담을 자료구조"),
      color: A,
      py: [
        "import sys",
        "from collections import defaultdict",
        "",
        "input = sys.stdin.readline",
        "children = defaultdict(list)",
      ],
      cpp: [
        "#include <iostream>",
        "#include <vector>",
        "#include <string>",
        "#include <unordered_map>",
        "using namespace std;",
        "",
        "unordered_map<string, vector<string>> children;",
      ],
      why: [
        t(E, "We need to remember 'who are the children of each parent'. That's a map from parent name → list of child names.",
            "각 부모의 자식 목록을 기억해야 해요. 부모 이름 → 자식 이름 리스트 의 맵이 필요해요."),
        t(E, "Python: defaultdict(list) auto-creates an empty list the first time a new parent is mentioned.",
            "Python: defaultdict(list) 는 새 부모가 처음 등장할 때 자동으로 빈 리스트를 만들어줘요."),
      ],
      cppOnly: [
        t(E, "unordered_map<string, vector<string>> behaves the same — accessing a missing key auto-creates an empty vector.",
            "unordered_map<string, vector<string>> 도 같은 식 — 없는 키 접근하면 빈 vector 자동 생성."),
      ],
    },
    {
      label: t(E, "2️⃣ The tool — recursive count function", "2️⃣ 도구 — 재귀로 세는 함수"),
      color: A,
      py: [
        "def count(node):",
        "    total = 1  # count self",
        "    for c in children[node]:",
        "        total += count(c)",
        "    return total",
      ],
      cpp: [
        "int count_items(const string& node) {",
        "    int total = 1;  // count self",
        "    for (const string& c : children[node]) {",
        "        total += count_items(c);",
        "    }",
        "    return total;",
        "}",
      ],
      why: [
        t(E, "Count this node as 1 (itself), then add the count of every subtree below it. The recursion does the same thing on each child.",
            "이 노드 자신을 1 로 세고, 자식들 각각의 서브트리 개수를 모두 더해요. 재귀가 각 자식에게 똑같은 일을 시켜요."),
        t(E, "Leaf nodes (no children) just return 1 — the for-loop doesn't execute. That's the natural base case.",
            "잎 노드 (자식 없음) 는 그냥 1 반환 — for 루프 안 돌아요. 자연스럽게 baseline 됨."),
      ],
    },
    {
      label: t(E, "3️⃣ Main — read input, then call the tool", "3️⃣ 메인 — 입력 받고 도구 호출"),
      color: A,
      py: [
        "N = int(input())",
        "for _ in range(N):",
        "    line = input().split()",
        "    parent = line[0]",
        "    child = line[1]",
        "    children[parent].append(child)",
        "",
        "print(count('root'))",
      ],
      cpp: [
        "int main() {",
        "    int N;",
        "    cin >> N;",
        "    for (int i = 0; i < N; i++) {",
        "        string parent, child;",
        "        cin >> parent >> child;",
        "        children[parent].push_back(child);",
        "    }",
        "    cout << count_items(\"root\") << \"\\n\";",
        "    return 0;",
        "}",
      ],
      why: [
        t(E, "Read each 'parent child' pair and append to children[parent]. After all N ops, the tree is built.",
            "각 'parent child' 쌍을 읽어서 children[parent] 에 추가. N 번 다 끝나면 트리 완성."),
        t(E, "Then just call count('root') — the function walks the whole tree and returns the total.",
            "그리고 count('root') 한 번 호출 — 함수가 트리 전체를 훑어 총 개수를 돌려줘요."),
      ],
    },
  ];
}

export function Mcc21MenuProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
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


export function downloadMcc21MenuPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21Menu — Full Study Guide", "Mcc21Menu — 종합 풀이 노트");
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

