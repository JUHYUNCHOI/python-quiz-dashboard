import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ================================================================
   Zodiac Circle Sim — visual aid for reveal step.
   Click an animal to set the target. Previous/Next sweeps Bessie's
   marker around the 12-year cycle, displaying the year delta live.
   ================================================================ */
const ZODIAC_EN = ["Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig","Rat"];
const ZODIAC_KO = ["소","호랑이","토끼","용","뱀","말","양","원숭이","닭","개","돼지","쥐"];
const ZODIAC_EMOJI = ["🐂","🐅","🐇","🐉","🐍","🐎","🐐","🐒","🐓","🐕","🐖","🐀"];

export function ZodiacCircleSim({ E }) {
  const [bessieIdx, setBessieIdx] = useState(0);   // current Bessie position on circle
  const [targetIdx, setTargetIdx] = useState(3);   // selected animal (Dragon)
  const [yearDelta, setYearDelta] = useState(0);   // accumulated year offset

  const cx = 140, cy = 140, R = 100;
  const labels = E ? ZODIAC_EN : ZODIAC_KO;

  const sweep = (direction) => {
    const cur = ((bessieIdx % 12) + 12) % 12;
    let diff;
    if (direction === "previous") {
      diff = (cur - targetIdx + 12) % 12;
      if (diff === 0) diff = 12;
      setYearDelta(d => d - diff);
    } else {
      diff = (targetIdx - cur + 12) % 12;
      if (diff === 0) diff = 12;
      setYearDelta(d => d + diff);
    }
    setBessieIdx(targetIdx);
  };

  const reset = () => { setBessieIdx(0); setYearDelta(0); };

  const angle = (i) => (i / 12) * 2 * Math.PI - Math.PI / 2;
  const px = (i, r) => cx + Math.cos(angle(i)) * r;
  const py = (i, r) => cy + Math.sin(angle(i)) * r;

  return (
    <div style={{ background: "#fff", border: "1.5px solid #fcd34d", borderRadius: 12, padding: 12, marginBottom: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 8, textAlign: "center" }}>
        🔮 {t(E, "Try it: click an animal, then Previous / Next", "동물을 누른 뒤 직전 / 직후 를 눌러 봐요")}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        <svg width="280" height="280" style={{ flexShrink: 0 }}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#fcd34d" strokeWidth="2" strokeDasharray="4 4" />
          {labels.map((lbl, i) => {
            const x = px(i, R), y = py(i, R);
            const isTarget = i === targetIdx;
            const isBessie = ((bessieIdx % 12) + 12) % 12 === i;
            return (
              <g key={i} style={{ cursor: "pointer" }} onClick={() => setTargetIdx(i)}>
                <circle cx={x} cy={y} r="20"
                  fill={isTarget ? "#0891b2" : "#fffbeb"}
                  stroke={isBessie ? "#7c3aed" : "#fcd34d"}
                  strokeWidth={isBessie ? 3 : 1.5} />
                <text x={x} y={y + 5} textAnchor="middle" fontSize="16">{ZODIAC_EMOJI[i]}</text>
                <text x={x} y={y + 32} textAnchor="middle" fontSize="9"
                  fill={isTarget ? "#0891b2" : "#92400e"} fontWeight={isTarget ? 700 : 400}>{lbl}</text>
              </g>
            );
          })}
          {/* Bessie marker (purple ring already on circle); draw arrow from center */}
          <line x1={cx} y1={cy}
            x2={px(((bessieIdx % 12) + 12) % 12, R - 22)}
            y2={py(((bessieIdx % 12) + 12) % 12, R - 22)}
            stroke="#7c3aed" strokeWidth="2.5"
            style={{ transition: "all 0.5s ease" }} />
          <circle cx={cx} cy={cy} r="6" fill="#7c3aed" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 140 }}>
          <div style={{ fontSize: 11, color: C.dim }}>
            {t(E, "Bessie now at:", "Bessie 위치:")}
            <div style={{ fontSize: 14, fontWeight: 700, color: "#7c3aed" }}>{labels[((bessieIdx % 12) + 12) % 12]}</div>
          </div>
          <div style={{ fontSize: 11, color: C.dim }}>
            {t(E, "Target:", "목표:")}
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0891b2" }}>{labels[targetIdx]}</div>
          </div>
          <div style={{ fontSize: 11, color: C.dim, borderTop: "1px dashed #fcd34d", paddingTop: 6 }}>
            {t(E, "Year delta:", "연도 차이:")}
            <div style={{ fontSize: 18, fontWeight: 800, color: "#15803d" }}>{yearDelta}</div>
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            <button onClick={() => sweep("previous")} style={{ flex: 1, background: "#fef3c7", border: "1.5px solid #d97706", color: "#92400e", borderRadius: 6, padding: "6px 4px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
              ← {t(E, "Prev", "직전")}
            </button>
            <button onClick={() => sweep("next")} style={{ flex: 1, background: "#fef3c7", border: "1.5px solid #d97706", color: "#92400e", borderRadius: 6, padding: "6px 4px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
              {t(E, "Next", "직후")} →
            </button>
          </div>
          <button onClick={reset} style={{ background: "#fff", border: "1px solid #d1d5db", color: C.dim, borderRadius: 6, padding: "4px", fontSize: 10, cursor: "pointer" }}>
            ↺ {t(E, "Reset", "처음으로")}
          </button>
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "# 십이지 동물 순서 (12년 주기)",
  "animals = ['Ox','Tiger','Rabbit','Dragon','Snake',",
  "           'Horse','Goat','Monkey','Rooster','Dog',",
  "           'Pig','Rat']",
  "",
  "N = int(input())",
  "year = {}",
  "year['Bessie'] = 0",
  "",
  "for _ in range(N):",
  "    line = input().split()",
  "    # 입력 예: \"Mildred born in previous Cow year from Bessie\"",
  "    name = line[0]",
  "    direction = line[3]  # 값은 'previous' 또는 'next'",
  "    animal = line[4]",
  "    other = line[-1]",
  "",
  "    other_year = year[other]",
  "    other_idx = other_year % 12",
  "    target_idx = animals.index(animal)",
  "",
  "    if direction == 'previous':",
  "        diff = (other_idx - target_idx) % 12",
  "        if diff == 0:",
  "            diff = 12",
  "        year[name] = other_year - diff",
  "    else:",
  "        diff = (target_idx - other_idx) % 12",
  "        if diff == 0:",
  "            diff = 12",
  "        year[name] = other_year + diff",
  "",
  "print(abs(year['Bessie'] - year['Elsie']))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <sstream>",
  "#include <vector>",
  "#include <algorithm>",
  "#include <map>",
  "#include <cmath>",
  "using namespace std;",
  "",
  "int main() {",
  "    vector<string> animals = {\"Ox\",\"Tiger\",\"Rabbit\",\"Dragon\",\"Snake\",\"Horse\",\"Goat\",\"Monkey\",\"Rooster\",\"Dog\",\"Pig\",\"Rat\"};",
  "    auto idx = [&](const string& a){ return (int)(find(animals.begin(), animals.end(), a) - animals.begin()); };",
  "    int N;",
  "    cin >> N;",
  "    cin.ignore();",
  "    map<string,int> year;",
  "    year[\"Bessie\"] = 0;",
  "    for (int _n = 0; _n < N; _n++) {",
  "        string line;",
  "        getline(cin, line);",
  "        // 입력 예: \"Mildred born in previous Cow year from Bessie\"",
  "        stringstream ss(line);",
  "        vector<string> tok;",
  "        string w;",
  "        while (ss >> w) {",
  "            tok.push_back(w);",
  "        }",
  "        // 토큰: 이름 \"born\" \"in\" 방향 동물 \"year\" \"from\" 다른이름",
  "        string name = tok[0];",
  "        string dir = tok[3];",
  "        string animal = tok[4];",
  "        string other = tok.back();",
  "        int oy = year[other];",
  "        int oa = ((oy % 12) + 12) % 12;",
  "        int ta = idx(animal);",
  "        int delta;",
  "        if (dir == \"previous\") {",
  "            delta = (oa - ta + 12) % 12;",
  "            if (delta == 0) {",
  "                delta = 12;",
  "            }",
  "            year[name] = oy - delta;",
  "        } else {",
  "            delta = (ta - oa + 12) % 12;",
  "            if (delta == 0) {",
  "                delta = 12;",
  "            }",
  "            year[name] = oy + delta;",
  "        }",
  "    }",
  "    cout << abs(year[\"Bessie\"] - year[\"Elsie\"]) << \"\\n\";",
  "    return 0;",
  "}",
];

export function getYearCowSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we print? How many years apart the query cow is from Bessie.\nEach statement gives a cow's animal year relative to a cow we already know.",
            "무엇을 출력해야 하나요?\nBessie 와 물어본 소 사이의 연도 차이예요.\n소들의 말은 이미 아는 소를 기준으로\n앞/뒤 동물해가 몇 걸음 떨어져 있는지 알려줘요."),
        t(E, "So we take the known cow's year, shift it by the animal's position in the 12-year cycle, and that becomes the new cow's year.",
            "그래서 아는 소의 연도에\n12가지 동물 순서 중 몇 걸음 차이인지를\n더하거나 빼서 새 소의 연도를 구해요."),
        t(E, "So the code reads statements in order, updates each new cow's year from an already-known one, then prints the absolute year gap.",
            "그래서 코드는 진술을 순서대로 읽으며\n이미 아는 연도를 기준으로 새 소의 연도를 구하고,\n마지막에 두 소의 연도차를 절댓값으로 출력해요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 넣어요 (<iostream>, <vector>, ...). 그래야 코드가 뭘 쓰는지 한눈에 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "더하거나 곱한 값이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function YearCowProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest
   코드 이 방식). ⚠️ 아래는 위 FULL_PY/FULL_CPP 를 **그대로** 쓴다 — 새 알고리즘 내용을
   추가하지 않는다. 절대 이 함수 안에서 `_PY`/`_CPP` 로 끝나는 새 변수를 만들지 마라
   (그 이름 패턴은 보호 변수로 간주된다). ── */
export function getYearCowWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "year", ko: "소마다 알아낸 연도", en: "each cow's year so far" },
        { v: "delta", ko: "두 동물 자리 사이 걸음 수", en: "steps between the two animal positions" },
      ],
      beats: [
        { hi: [0, 16], bubble: t(E,
          "What do we need to output? How many years apart Bessie and Elsie are. So list the 12 zodiac animals with a small idx() helper for their position, read how many statements there are, and start a year map with Bessie at 0.",
          "무엇을 출력해야 하나요? Bessie 와 Elsie 의 연도 차이예요.\n십이지 동물 12개와 자리를 찾는 idx() 를 준비하고, 진술 개수를 읽은 뒤, Bessie 를 0 으로 하는 연도 map 을 시작해요.") },
        { hi: [17, 26], bubble: t(E,
          "Each statement names a new cow, a direction, an animal, and an already-known cow — all on one line. So read the whole line and split it into tokens with a stringstream.",
          "진술 한 줄마다 새 소 이름, 방향, 동물, 이미 아는 소 이름이 한 줄에 들어 있어요.\n그러니 줄 전체를 읽어서 stringstream 으로 토큰을 나눠요.") },
        { hi: [27, 34], bubble: t(E,
          "The tokens always come in the same order, so pull out the four pieces we need, look up the known cow's year, and find both cows' positions in the 12-year cycle.",
          "토큰은 항상 같은 순서로 오니까 필요한 네 조각을 꺼내고,\n아는 소의 연도를 찾은 뒤, 두 자리(아는 소·목표 동물)를 12년 주기 안에서 구해요.") },
        { hi: [35, 48], bubble: t(E,
          "If the direction is 'previous', the known cow is that many steps after the target animal, so subtract the gap (wrapping with %12, using 12 for a full cycle). If it's 'next', add the gap instead.",
          "방향이 'previous' 면 아는 소가 목표 동물보다 그만큼 뒤에 있다는 뜻이라 차이를 빼요 (12 로 나눈 나머지, 0 이면 12 로 바꿔요).\n'next' 면 반대로 그만큼 더해요.") },
        { hi: [49, 52], bubble: t(E,
          "Once every statement is processed, print how many years apart Bessie and Elsie ended up.",
          "진술을 다 처리했으면, Bessie 와 Elsie 의 연도차를 절댓값으로 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "year", ko: "소마다 알아낸 연도", en: "each cow's year so far" },
      { v: "diff", ko: "두 동물 자리 사이 걸음 수", en: "steps between the two animal positions" },
    ],
    beats: [
      { hi: [0, 3], bubble: t(E,
        "What do we need to output? How many years apart Bessie and Elsie are. So first list the 12 zodiac animals in order — we'll need each one's position in the cycle.",
        "무엇을 출력해야 하나요? Bessie 와 Elsie 의 연도 차이예요.\n그러려면 먼저 십이지 동물 12개를 순서대로 적어 둬요 — 순서 안에서 각 동물의 자리(0~11)가 필요해요.") },
      { hi: [5, 7], bubble: t(E,
        "Read how many statements there are, and keep a dictionary of each cow's year — Bessie's is the reference point, so set it to 0.",
        "진술이 몇 개인지 읽고, 소마다 연도를 담을 딕셔너리를 만들어요.\nBessie 의 연도가 기준이니 0 으로 시작해요.") },
      { hi: [9, 15], bubble: t(E,
        "Each statement names a new cow, a direction (previous/next), an animal, and an already-known cow. So split the line and pull out those four pieces.",
        "진술 한 줄마다 새 소 이름, 방향(previous/next), 동물, 이미 아는 소 이름이 들어 있어요.\n그러니 줄을 나눠서 이 넷을 꺼내요.") },
      { hi: [17, 19], bubble: t(E,
        "We already know the reference cow's year, so look it up and find her position in the 12-year cycle, plus the target animal's position.",
        "이미 아는 소의 연도를 찾아서\n12년 주기 안 자리(0~11)를 구하고,\n목표 동물의 자리도 구해요.") },
      { hi: [21, 30], bubble: t(E,
        "If direction is 'previous', the known cow is that many steps after the target animal, so subtract the gap (wrapping with %12, using 12 instead of 0 for a full cycle). If it's 'next', the known cow is that many steps before it, so add the gap instead.",
        "direction 이 'previous' 면, 아는 소가 목표 동물보다 그만큼 뒤에 있다는 뜻이라 그 차이를 빼요 (12 로 나눈 나머지, 0 이면 12 로 바꿔요).\n'next' 면 반대로 그만큼 앞에 있다는 뜻이라 차이를 더해요.") },
      { hi: [32, 32], bubble: t(E,
        "Once every statement is processed, print how many years apart Bessie and Elsie ended up.",
        "진술을 다 처리했으면, Bessie 와 Elsie 의 연도차를 절댓값으로 출력해요.") },
    ],
  };
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


export function downloadYearCowPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "YearCow — Full Study Guide", "YearCow — 종합 풀이 노트");
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

