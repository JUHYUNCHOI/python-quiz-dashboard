import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const FULL_PY = [
  "def count_kitty_div3(N):",
  "    # keep only remainders mod 3 of Kitty_1..5",
  "    r = [11 % 3, 9 % 3, 20 % 3, 20 % 3, 25 % 3]",
  "    seen = {}",
  "    start = period = None",
  "    k = 1",
  "    # grow the list until a 5-window repeats",
  "    while True:",
  "        while len(r) < k + 4:",
  "            r.append(sum(r[-5:]) % 3)",
  "        st = tuple(r[k-1:k+4])          # the 5-window at position k",
  "        if st in seen:",
  "            start = seen[st]",
  "            period = k - start",
  "            break",
  "        seen[st] = k",
  "        k += 1",
  "",
  "    # make sure we have the tail + one full cycle",
  "    needed = start - 1 + period",
  "    while len(r) < needed:",
  "        r.append(sum(r[-5:]) % 3)",
  "    tail = r[:start-1]",
  "    cycle = r[start-1:start-1+period]",
  "",
  "    # count the zeros (terms divisible by 3)",
  "    if N <= start - 1:",
  "        return sum(1 for x in r[:N] if x == 0)",
  "    tail_zeros = sum(1 for x in tail if x == 0)",
  "    remaining = N - (start - 1)",
  "    full = remaining // period",
  "    partial = remaining % period",
  "    cycle_zeros = sum(1 for x in cycle if x == 0)",
  "    partial_zeros = sum(1 for x in cycle[:partial] if x == 0)",
  "    return tail_zeros + full * cycle_zeros + partial_zeros",
  "",
  "N = int(input())",
  "print(count_kitty_div3(N))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    long long N;",
  "    cin >> N;",
  "",
  "    // keep only remainders mod 3 of Kitty_1..5",
  "    vector<int> r = {11 % 3, 9 % 3, 20 % 3, 20 % 3, 25 % 3};",
  "    map<vector<int>, long long> seen;",
  "    long long start = 0;",
  "    long long period = 0;",
  "    long long k = 1;",
  "    while (true) {",
  "        while ((long long)r.size() < k + 4) {",
  "            int s = 0;",
  "            for (int j = 1; j <= 5; j++) {",
  "                s += r[r.size() - j];",
  "            }",
  "            r.push_back(s % 3);",
  "        }",
  "        vector<int> st(r.begin() + (k - 1), r.begin() + (k + 4));",
  "        if (seen.count(st)) {",
  "            start = seen[st];",
  "            period = k - start;",
  "            break;",
  "        }",
  "        seen[st] = k;",
  "        k++;",
  "    }",
  "",
  "    long long needed = start - 1 + period;",
  "    while ((long long)r.size() < needed) {",
  "        int s = 0;",
  "        for (int j = 1; j <= 5; j++) {",
  "            s += r[r.size() - j];",
  "        }",
  "        r.push_back(s % 3);",
  "    }",
  "",
  "    long long ans = 0;",
  "    if (N <= start - 1) {",
  "        for (long long i = 0; i < N; i++) {",
  "            if (r[i] == 0) {",
  "                ans++;",
  "            }",
  "        }",
  "        cout << ans << \"\\n\";",
  "        return 0;",
  "    }",
  "    long long tail_zeros = 0;",
  "    for (long long i = 0; i < start - 1; i++) {",
  "        if (r[i] == 0) {",
  "            tail_zeros++;",
  "        }",
  "    }",
  "    long long remaining = N - (start - 1);",
  "    long long full = remaining / period;",
  "    long long partial = remaining % period;",
  "    long long cycle_zeros = 0;",
  "    long long partial_zeros = 0;",
  "    for (long long i = 0; i < period; i++) {",
  "        if (r[start-1+i] == 0) {",
  "            cycle_zeros++;",
  "        }",
  "    }",
  "    for (long long i = 0; i < partial; i++) {",
  "        if (r[start-1+i] == 0) {",
  "            partial_zeros++;",
  "        }",
  "    }",
  "    ans = tail_zeros + full * cycle_zeros + partial_zeros;",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc20KittySections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        /* 2026-09-17: 두 줄 다 화면에서 93·123 자가 한 덩어리였다.
           ⚠️ ProgressiveCodeStepper 는 why 줄을 pre-line 없이 그린다 — 문자열 안의 \n 은
           공백으로 뭉개진다. 그래서 \n 을 넣지 말고 **항목을 나눠서** 줄을 만든다. */
        t(E, "We only care about divisibility by 3, so we keep just each term's remainder (0/1/2).",
            "우리는 3 의 배수인지만 궁금해요. 그래서 각 항의 나머지 0/1/2 만 들고 다녀요."),
        t(E, "A new remainder = the previous five remainders added up, mod 3. The giant numbers never appear.",
            "새 나머지는 바로 앞 다섯 나머지를 더해서 3 으로 나눈 나머지예요. 거대한 숫자는 아예 안 나와요."),
        t(E, "A 5-window of remainders has only 3×3×3×3×3 = 243 possible patterns (each of the 5 slots is 0, 1, or 2), so the sequence has to start repeating.",
            "나머지 5 칸 창은 모양이 3×3×3×3×3 = 243 가지뿐이에요(자리마다 0/1/2 중 하나, 5 자리). 그래서 수열이 반드시 되풀이되기 시작해요."),
        t(E, "We find where it repeats, then count the zeros as tail + (whole loops × zeros per loop) + leftover.",
            "어디서 되풀이되는지 찾은 뒤, 0 의 개수를 앞쪽 조각 + (한 바퀴의 0 × 바퀴 수) + 남는 조각 으로 세요."),
        t(E, "That is instant even for N = 10^15.",
            "N 이 10^15 이어도 바로 끝나요."),
      ],
      pyOnly: [
        t(E, "tuple(r[k-1:k+4]) makes the 5-window hashable so it can be a dict key in `seen`.",
            "tuple(r[k-1:k+4]) 는 5칸 창을 해시 가능하게 만들어 dict `seen` 의 key 로 써요."),
        t(E, "sum(1 for x in cycle if x == 0) counts the zeros (divisible-by-3 terms) in one pass.",
            "sum(1 for x in cycle if x == 0) 은 한 번 훑어 0(3의 배수 항)의 개수를 세요."),
      ],
      cppOnly: [
        t(E, "N and the count can exceed 2×10^9, so use long long everywhere for N, start, period, and the answer.",
            "N 과 개수는 2×10^9 를 넘을 수 있으니, N·start·period·정답 모두 long long 을 써요."),
        t(E, "map<vector<int>, long long> lets a whole 5-window vector be a lookup key, mirroring Python's tuple-keyed dict.",
            "map<vector<int>, long long> 은 5칸 창 벡터 전체를 조회 key 로 써요 — Python 의 tuple key dict 와 같은 방식."),
      ],
    },
  ];
}

export function Mcc20KittyProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
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


export function downloadMcc20KittyPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20Kitty — Full Study Guide", "Mcc20Kitty — 종합 풀이 노트");
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

