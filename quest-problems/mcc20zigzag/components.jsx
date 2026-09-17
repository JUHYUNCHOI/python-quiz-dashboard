import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "s = \"bcade\"",
  "K = 3",
  "N = len(s)",
  "MOD = 1000   # answer is printed modulo 1000",
  "",
  "if K > N:",
  "    print(0)",
  "elif K == 1:",
  "    print(N % MOD)",
  "else:",
  "    # up[i][j] · dn[i][j] = i 에서 끝나는 길이 j 짜리 지그재그 개수",
  "    # 마지막 걸음이 올라간 것 · 내려간 것. 시작 방향은 둘 다 세요.",
  "    up = [[0] * (K + 1) for _ in range(N)]",
  "    dn = [[0] * (K + 1) for _ in range(N)]",
  "",
  "    for j in range(2, K + 1):",
  "        for i in range(N):",
  "            for p in range(i):",
  "                if j == 2:",
  "                    if s[p] < s[i]:",
  "                        up[i][j] += 1",
  "                    if s[p] > s[i]:",
  "                        dn[i][j] += 1",
  "                else:",
  "                    if s[p] < s[i]:",
  "                        up[i][j] += dn[p][j - 1]",
  "                    if s[p] > s[i]:",
  "                        dn[i][j] += up[p][j - 1]",
  "            up[i][j] %= MOD",
  "            dn[i][j] %= MOD",
  "",
  "    ans = sum(up[i][K] + dn[i][K] for i in range(N)) % MOD",
  "    print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "    string s = \"bcade\";",
  "    int K = 3;",
  "    int N = s.size();",
  "    const long long MOD = 1000;   // answer is printed modulo 1000",
  "",
  "    if (K > N) {",
  "        cout << 0 << \"\\n\";",
  "        return 0;",
  "    }",
  "    if (K == 1) {",
  "        cout << N % MOD << \"\\n\";",
  "        return 0;",
  "    }",
  "",
  "    // up[i][j] · dn[i][j] — i 에서 끝나는 길이 j 짜리, 마지막 걸음이 위 · 아래",
  "    vector<vector<long long>> up(N, vector<long long>(K + 1, 0));",
  "    vector<vector<long long>> dn(N, vector<long long>(K + 1, 0));",
  "",
  "    for (int j = 2; j <= K; j++)",
  "        for (int i = 0; i < N; i++) {",
  "            for (int p = 0; p < i; p++) {",
  "                if (j == 2) {",
  "                    if (s[p] < s[i]) {",
  "                        up[i][j] += 1;",
  "                    }",
  "                    if (s[p] > s[i]) {",
  "                        dn[i][j] += 1;",
  "                    }",
  "                } else {",
  "                    if (s[p] < s[i]) {",
  "                        up[i][j] += dn[p][j - 1];",
  "                    }",
  "                    if (s[p] > s[i]) {",
  "                        dn[i][j] += up[p][j - 1];",
  "                    }",
  "                }",
  "            }",
  "            up[i][j] %= MOD;",
  "            dn[i][j] %= MOD;",
  "        }",
  "",
  "    long long ans = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        ans = (ans + up[i][K] + dn[i][K]) % MOD;",
  "    }",
  "    cout << ans << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

/* 2026-09-17: 섹션이 1 개였다. why 는 "한 부분씩 읽어 봐요" 한 줄뿐인데
   정작 쪼갤 부분이 없어서 말과 화면이 어긋났다. 게다가 up/dn 표가 무엇을
   세는지 아무 데도 안 적혀 있어서 학생이 여기서 그만뒀다.
   코드 글자는 한 자도 안 바꾸고 FULL_PY / FULL_CPP 를 잘라 쓴다. */
const PY_READ = FULL_PY.slice(0, 9);    // 입력 + 바로 답이 나오는 경우
const PY_TABLE = FULL_PY.slice(9, 14);  // up / dn 표 만들기
const PY_FILL = FULL_PY.slice(15, 30);  // 표 채우기
const PY_SUM = FULL_PY.slice(31, 33);   // 답 모으기

const CPP_READ = FULL_CPP.slice(0, 21);
const CPP_TABLE = FULL_CPP.slice(22, 25);
const CPP_FILL = FULL_CPP.slice(26, 48);
const CPP_SUM = FULL_CPP.slice(49, 57);

export function getMcc20ZigzagSections(E) {
  return [
    {
      label: t(E, "① Read the input, answer the easy cases", "① 입력 읽기 · 바로 답이 나오는 경우"),
      color: "#0891b2",
      py: PY_READ, cpp: CPP_READ,
      why: [
        t(E, "If K is longer than the string there is nothing to pick, so the answer is 0. If K is 1 every single letter is a zig-zag by itself, so the answer is N.",
            "고를 글자 수 K 가 문자열보다 길면 만들 수 없으니 답은 0 이에요. K 가 1 이면 글자 하나하나가 그대로 답이 되니까 N 개예요."),
        t(E, "The answer is printed modulo 1000, so we keep every count small as we go.",
            "답은 1000 으로 나눈 나머지만 쓰면 되니까, 세는 동안 수를 계속 작게 줄여 둬요."),
      ],
      cppOnly: [
        t(E, "Split #include into specific headers you've learned (iostream, vector, string).",
            "#include 는 배운 것들로 (iostream, vector, string) 나눠 적어요."),
      ],
    },
    {
      label: t(E, "② Two tables: last step up, last step down", "② 표 두 개 — 마지막이 오름 / 마지막이 내림"),
      color: "#8b5cf6",
      why: [
        t(E, "up[i][j] = how many zig-zags of length j end at letter i with the last step going UP. dn[i][j] is the same but the last step went DOWN.",
            "up[i][j] 는 i 번째 글자에서 끝나는 길이 j 짜리 지그재그 중에서 마지막 걸음이 '오름' 인 것의 개수예요. dn[i][j] 는 마지막 걸음이 '내림' 인 것의 개수예요."),
        t(E, "Why two tables instead of one? Because zig-zag means the next step must go the opposite way. To know what is allowed next, we have to know which way the last step went.",
            "왜 표를 두 개로 나눌까요. 지그재그는 다음 걸음이 반드시 반대 방향이어야 해요. 그러니 다음에 무엇이 되는지 알려면 마지막 걸음이 어느 쪽이었는지를 알아야 해요. 개수만 세면 그걸 잃어버려요."),
        t(E, "The two numbers i and j are different things: i is a place in the string, j is how many letters we have picked so far.",
            "i 와 j 는 서로 다른 것을 가리켜요. i 는 문자열에서 몇 번째 글자인지이고, j 는 지금까지 몇 글자를 골랐는지예요."),
      ],
      py: PY_TABLE, cpp: CPP_TABLE,
    },
    {
      label: t(E, "③ Fill the tables, short ones first", "③ 짧은 것부터 표 채우기"),
      color: "#d97706",
      py: PY_FILL, cpp: CPP_FILL,
      why: [
        t(E, "Length 2 is the starting point: any earlier letter p smaller than s[i] makes one up-ending pair, any bigger one makes one down-ending pair.",
            "길이 2 가 출발점이에요. 앞쪽 글자 p 가 s[i] 보다 작으면 오름으로 끝나는 짝이 하나 생기고, 크면 내림으로 끝나는 짝이 하나 생겨요."),
        t(E, "For longer ones we glue a new letter onto something already counted. If s[p] < s[i] the new step goes up, so what came before it must have ended going down — that is exactly dn[p][j−1].",
            "더 긴 것은 이미 세어 둔 것에 글자 하나를 이어 붙여 만들어요. s[p] < s[i] 면 새 걸음은 오름이니까, 그 앞은 내림으로 끝났어야 해요. 그게 바로 dn[p][j−1] 이에요."),
        t(E, "This is why we never look back past p: dn[p][j−1] already counts every way to reach p. We add one number instead of walking the whole string again.",
            "그래서 p 보다 앞을 다시 들여다보지 않아요. dn[p][j−1] 안에 p 까지 오는 모든 방법이 이미 다 세어져 있거든요. 문자열을 처음부터 다시 훑는 대신 그 수 하나만 더해요."),
        t(E, "We fill j from small to large, so everything a longer one needs is already finished.",
            "j 를 작은 것부터 채워 나가요. 그러면 긴 것을 만들 때 필요한 값이 이미 다 구해져 있어요."),
      ],
    },
    {
      label: t(E, "④ Add up every ending place", "④ 끝나는 자리를 모두 더하기"),
      color: "#15803d",
      py: PY_SUM, cpp: CPP_SUM,
      why: [
        t(E, "A length-K zig-zag has to end somewhere, and its last step went either up or down. So the answer is the sum of up[i][K] + dn[i][K] over every i — no zig-zag is counted twice.",
            "길이 K 짜리 지그재그는 어딘가에서 끝나고, 마지막 걸음은 오름이거나 내림이거나 둘 중 하나예요. 그러니 모든 i 에 대해 up[i][K] + dn[i][K] 를 더하면 돼요. 같은 것을 두 번 세는 일은 없어요."),
      ],
      cppOnly: [
        t(E, "Use long long for the running sum so the additions before the modulo cannot overflow.",
            "더해 나가는 합은 long long 으로 둬요. 나머지를 취하기 전 덧셈에서 넘치지 않게요."),
      ],
    },
  ];
}

export function Mcc20ZigzagProgressiveCode(props) {
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


export function downloadMcc20ZigzagPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20Zigzag — Full Study Guide", "Mcc20Zigzag — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 선택해요.")}</div>
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

