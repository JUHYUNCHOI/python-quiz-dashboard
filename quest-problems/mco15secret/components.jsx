import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "b = list(map(int, input().split()))",
  "",
  "# Check if b is a rotation of a",
  "# Classic trick: b is rotation of a iff",
  "# b appears as a subarray in a + a",
  "",
  "if len(a) != len(b):",
  "    print('NO')",
  "else:",
  "    doubled = a + a",
  "    found = False",
  "    for i in range(N):",
  "        if doubled[i:i+N] == b:",
  "            found = True",
  "            break",
  "    if found:",
  "        print('YES')",
  "    else:",
  "        print('NO')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <sstream>",
  "#include <string>",
  "#include <vector>",
  "using namespace std;",
  "",
  "// Read one line and split it into integers",
  "vector<int> readInts() {",
  "    string line;",
  "    getline(cin, line);",
  "    istringstream ss(line);",
  "    vector<int> v;",
  "    int x;",
  "    while (ss >> x) {",
  "        v.push_back(x);",
  "    }",
  "    return v;",
  "}",
  "",
  "int main() {",
  "    string firstLine;",
  "    getline(cin, firstLine);",
  "    int N = stoi(firstLine);",
  "    vector<int> a = readInts();",
  "    vector<int> b = readInts();",
  "",
  "    // Check if b is a rotation of a",
  "    // Classic trick: b is rotation of a iff",
  "    // b appears as a subarray in a + a",
  "",
  "    if (a.size() != b.size()) {",
  "        cout << \"NO\" << \"\\n\";",
  "    } else {",
  "        vector<int> doubled = a;                    // a + a",
  "        for (int j = 0; j < (int)a.size(); j++) {",
  "            doubled.push_back(a[j]);",
  "        }",
  "        bool found = false;",
  "        for (int i = 0; i < N; i++) {",
  "            bool same = true;                       // does the window at i match b?",
  "            for (int j = 0; j < N; j++) {",
  "                if (doubled[i + j] != b[j]) {",
  "                    same = false;",
  "                    break;",
  "                }",
  "            }",
  "            if (same) {",
  "                found = true;",
  "                break;",
  "            }",
  "        }",
  "        if (found) {",
  "            cout << \"YES\" << \"\\n\";",
  "        } else {",
  "            cout << \"NO\" << \"\\n\";",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

/* 2026-09-17: 섹션이 1 개인데 why 는 "코드를 한 부분씩 읽어 봐요" 라고 했다 —
   한 부분씩 읽을 데가 없었고, 같은 문장이 다섯 quest 에 그대로 복붙돼 있었다.
   파이썬 21 줄이라 세 걸음으로 쪼갠다. 코드 배열은 slice 만 한다 — 한 글자도 안 바뀐다. */
export function getSecretSections(E) {
  return [
    {
      label: t(E, "① Read a and b", "① a 와 b 읽기"),
      color: A,
      py: FULL_PY.slice(0, 8), cpp: FULL_CPP.slice(0, 30),
      why: [
        t(E, "Three lines come in: the length N, then a, then b. Each of a and b becomes a list of numbers.",
            "세 줄이 들어와요 — 길이 N, 그다음 a, 그다음 b.\na 와 b 는 각각 숫자 목록이 돼요."),
      ],
      pyOnly: [
        t(E, "list(map(int, input().split())) turns one line of text into a list of numbers.",
            "list(map(int, input().split())) 는 글자 한 줄을 숫자 목록으로 바꿔 줘요."),
      ],
      cppOnly: [
        t(E, "readInts is pulled out as its own function because the same work happens twice — once for a, once for b.",
            "readInts 를 따로 함수로 뺀 건 같은 일을 두 번 하기 때문이에요 — a 한 번, b 한 번."),
      ],
    },
    {
      label: t(E, "② Lay a down twice", "② a 를 두 번 이어 놓기"),
      color: A,
      py: FULL_PY.slice(8, 13), cpp: FULL_CPP.slice(30, 38),
      why: [
        t(E, "Rotating a means cutting it somewhere and swapping the two pieces. Write a twice in a row and every one of those cuts is already sitting there, side by side.",
            "a 를 돌린다는 건 어딘가에서 잘라 앞뒤를 바꾼다는 뜻이에요.\na 를 두 번 이어 적어 두면, 그 잘린 모양들이 이미 나란히 놓여 있어요."),
        t(E, "If the lengths differ there is nothing to rotate into — answer NO right away.",
            "길이가 다르면 아무리 돌려도 같아질 수 없어요. 바로 NO 예요."),
      ],
    },
    {
      label: t(E, "③ Slide the window, then answer", "③ 창을 밀며 찾고 답 내기"),
      color: A,
      py: FULL_PY.slice(13, 21), cpp: FULL_CPP.slice(38, 59),
      why: [
        t(E, "Take a window of length N on a+a and compare it with b. Slide it one step at a time.",
            "a+a 위에 길이 N 짜리 창을 놓고 b 와 견줘요. 한 칸씩 밀어요."),
        t(E, "N slides is enough. Sliding N steps brings the window back to where it started, so anything further only repeats.",
            "N 번만 밀면 충분해요.\nN 칸을 밀면 창이 처음 자리로 돌아오니, 더 밀어 봐야 같은 것만 또 나와요."),
        t(E, "The moment one window matches, we are done — break out and print YES. If none of them match, print NO.",
            "한 자리에서 같아지는 순간 끝이에요. 빠져나와서 YES 를 적어요.\n끝까지 한 자리도 안 같으면 NO 예요."),
      ],
      pyOnly: [
        t(E, "doubled[i:i+N] cuts out the window, and == compares the whole list at once.",
            "doubled[i:i+N] 이 창을 잘라 내고, == 가 목록 전체를 한 번에 견줘요."),
      ],
      cppOnly: [
        t(E, "C++ has no list-to-list ==, so the inner loop compares the numbers one by one and gives up early on the first mismatch.",
            "C++ 에는 목록끼리 == 로 견주는 게 없어서 안쪽 for 문이 하나씩 견줘요.\n하나라도 다르면 그 자리에서 바로 그만둬요."),
      ],
    },
  ];
}

export function SecretProgressiveCode(props) {
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


export function downloadSecretPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Secret — Full Study Guide", "Secret — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장'을 선택해요.")}</div>
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

