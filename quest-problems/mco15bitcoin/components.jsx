import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ================================================================
   Pair Inspector Sim — deep-audit the brute-force pairing
   Student clicks any two of 4 fixed mining sites and sees
   dx, dy, dx²+dy² computed live, plus the running max across
   all visited pairs. Bilingual via E flag.
   ================================================================ */
const PI_SITES = [
  { id: 0, x: 1, y: 1, name: "A" },
  { id: 1, x: 5, y: 2, name: "B" },
  { id: 2, x: 2, y: 6, name: "C" },
  { id: 3, x: 6, y: 5, name: "D" },
];

export function BitcoinPairInspector({ E }) {
  const [picked, setPicked] = useState([]); // up to 2 ids
  const [seenMax, setSeenMax] = useState(0);

  const click = (id) => {
    let np;
    if (picked.length === 2) np = [id];
    else if (picked.includes(id)) np = picked.filter((p) => p !== id);
    else np = [...picked, id];
    setPicked(np);
    if (np.length === 2) {
      const a = PI_SITES[np[0]], b = PI_SITES[np[1]];
      const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      setSeenMax((m) => Math.max(m, d));
    }
  };

  const reset = () => { setPicked([]); setSeenMax(0); };

  // grid: 0..7 in both axes, 36px per unit
  const U = 34, PAD = 22, GRID = 7;
  const SVG = PAD * 2 + U * GRID;
  const px = (x) => PAD + x * U;
  const py = (y) => PAD + (GRID - y) * U; // flip y so up = +y

  const a = picked[0] != null ? PI_SITES[picked[0]] : null;
  const b = picked[1] != null ? PI_SITES[picked[1]] : null;
  const dx = a && b ? a.x - b.x : null;
  const dy = a && b ? a.y - b.y : null;
  const distSq = a && b ? dx * dx + dy * dy : null;

  return (
    <div style={{ padding: 14 }}>
      <div style={{
        background: "#fff7ed", border: `1.5px solid ${A}`, borderRadius: 10,
        padding: "8px 12px", marginBottom: 10, fontSize: 12, color: "#9a3412", lineHeight: 1.6,
        wordBreak: "keep-all", whiteSpace: "pre-line", textWrap: "balance",
      }}>
        <b>{t(E, "🔍 Pair Inspector", "🔍 쌍 검사기")}</b> — {t(E,
          "From four sites there are 6 pairs to pick.\nClick two sites to see that pair's squared distance, then try all 6.",
          "네 사이트에서 고를 수 있는 쌍은 모두 6개예요.\n두 사이트를 누르면 그 쌍의 거리의 제곱이 나와요. 6개를 다 눌러 봐요.")}
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
        <svg width={SVG} height={SVG} style={{ background: "#fffaf3", border: `1px solid #fdba74`, borderRadius: 10 }}>
          {/* grid lines */}
          {Array.from({ length: GRID + 1 }).map((_, i) => (
            <g key={`g${i}`}>
              <line x1={px(i)} y1={py(0)} x2={px(i)} y2={py(GRID)} stroke="#fde4c4" strokeWidth={1} />
              <line x1={px(0)} y1={py(i)} x2={px(GRID)} y2={py(i)} stroke="#fde4c4" strokeWidth={1} />
            </g>
          ))}
          {/* axes */}
          <line x1={px(0)} y1={py(0)} x2={px(GRID)} y2={py(0)} stroke="#9a3412" strokeWidth={1.5} />
          <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(GRID)} stroke="#9a3412" strokeWidth={1.5} />
          {/* connecting line if 2 picked */}
          {a && b && (
            <line x1={px(a.x)} y1={py(a.y)} x2={px(b.x)} y2={py(b.y)} stroke={A} strokeWidth={2.5} strokeDasharray="5 4" />
          )}
          {/* dx / dy guides */}
          {a && b && (
            <>
              <line x1={px(a.x)} y1={py(a.y)} x2={px(b.x)} y2={py(a.y)} stroke="#fbbf24" strokeWidth={1.5} />
              <line x1={px(b.x)} y1={py(a.y)} x2={px(b.x)} y2={py(b.y)} stroke="#fbbf24" strokeWidth={1.5} />
            </>
          )}
          {/* points */}
          {PI_SITES.map((s) => {
            const sel = picked.includes(s.id);
            return (
              <g key={s.id} onClick={() => click(s.id)} style={{ cursor: "pointer" }}>
                <circle cx={px(s.x)} cy={py(s.y)} r={sel ? 11 : 8}
                  fill={sel ? A : "#fff"} stroke={A} strokeWidth={2} />
                <text x={px(s.x)} y={py(s.y) + 4} textAnchor="middle"
                  fontSize={11} fontWeight={800}
                  fill={sel ? "#fff" : A}>{s.name}</text>
                <text x={px(s.x) + 12} y={py(s.y) - 10} fontSize={10} fill="#9a3412">
                  ({s.x},{s.y})
                </text>
              </g>
            );
          })}
        </svg>

        <div style={{ flex: "1 1 220px", minWidth: 220 }}>
          <div style={{
            background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10,
            padding: 10, fontSize: 12, color: C.text, marginBottom: 8,
          }}>
            <div style={{ fontWeight: 700, color: A, marginBottom: 6 }}>
              {t(E, "Picked", "선택")}: {a ? a.name : "·"} , {b ? b.name : "·"}
            </div>
            {a && b ? (
              <div style={{ fontFamily: "ui-monospace, monospace", lineHeight: 1.7 }}>
                <div>dx = {a.x} − {b.x} = <b style={{ color: A }}>{dx}</b></div>
                <div>dy = {a.y} − {b.y} = <b style={{ color: A }}>{dy}</b></div>
                <div>dx² + dy² = {dx * dx} + {dy * dy} = <b style={{ color: "#15803d" }}>{distSq}</b></div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.6, wordBreak: "keep-all" }}>
                  {t(E, "dx is the two x's subtracted, dy the two y's. dx² + dy² is this pair's squared distance.",
                        "dx 는 x 좌표끼리, dy 는 y 좌표끼리 뺀 값이에요. dx² + dy² 가 이 쌍의 거리의 제곱이에요.")}
                </div>
              </div>
            ) : (
              <div style={{ color: C.dim }}>
                {t(E, "Click two sites on the grid.", "격자에서 두 사이트를 클릭하세요.")}
              </div>
            )}
          </div>
          <div style={{
            background: "#dcfce7", border: "1px solid #86efac", borderRadius: 10,
            padding: 10, fontSize: 12, color: "#15803d",
          }}>
            <b>{t(E, "Biggest squared distance so far", "지금까지 가장 큰 거리의 제곱")}:</b> {seenMax}
            <div style={{ fontSize: 11, color: "#166534", marginTop: 4, lineHeight: 1.6, wordBreak: "keep-all" }}>
              {t(E, "Only the biggest of the pairs you have clicked stays here. Click all 6 and 41 is what is left — later the code keeps it in max_dist.",
                  "지금까지 누른 쌍 중 가장 큰 것만 여기 남아요. 6개를 다 누르면 41 이 남고, 나중에 코드에서는 max_dist 가 이 값을 들고 있어요.")}
            </div>
          </div>
          <button onClick={reset} style={{
            marginTop: 8, background: "#fff", color: A, border: `1.5px solid ${A}`,
            borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>
            {t(E, "Reset", "다시 처음부터")}
          </button>
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "sites = []",
  "for _ in range(N):",
  "    x, y = map(int, input().split())",
  "    sites.append((x, y))",
  "",
  "max_dist = 0",
  "",
  "for i in range(N):",
  "    for j in range(i + 1, N):",
  "        dx = sites[i][0] - sites[j][0]",
  "        dy = sites[i][1] - sites[j][1]",
  "        dist_sq = dx * dx + dy * dy",
  "        max_dist = max(max_dist, dist_sq)",
  "",
  "print(max_dist)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <utility>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<pair<long long, long long>> sites;",
  "    for (int i = 0; i < N; i++) {",
  "        long long x, y;",
  "        cin >> x >> y;",
  "        sites.push_back(make_pair(x, y));",
  "    }",
  "",
  "    long long max_dist = 0;",
  "",
  "    for (int i = 0; i < N; i++) {",
  "        for (int j = i + 1; j < N; j++) {",
  "            long long dx = sites[i].first - sites[j].first;",
  "            long long dy = sites[i].second - sites[j].second;",
  "            long long dist_sq = dx * dx + dy * dy;",
  "            max_dist = max(max_dist, dist_sq);",
  "        }",
  "    }",
  "",
  "    cout << max_dist << \"\\n\";",
  "    return 0;",
  "}",
];

/* 2026-09-17: 섹션이 1 개인데 why 는 "코드를 한 부분씩 읽어 봐요" 라고 했다 —
   한 부분씩 읽을 데가 없었고, 같은 문장이 다섯 quest 에 그대로 복붙돼 있었다.
   파이썬 16 줄이라 두 걸음으로 쪼갠다. 코드 배열은 slice 만 한다 — 한 글자도 안 바뀐다. */
export function getBitcoinSections(E) {
  return [
    {
      label: t(E, "① Read the sites", "① 사이트 읽어 두기"),
      color: A,
      py: FULL_PY.slice(0, 8), cpp: FULL_CPP.slice(0, 18),
      why: [
        t(E, "Every pair has to be compared with every other, so the sites have to stay around — read them all into a list first.",
            "모든 쌍을 서로 견줘야 해서 사이트가 계속 남아 있어야 해요.\n그래서 먼저 전부 목록에 담아 둬요."),
        t(E, "max_dist starts at 0. A squared distance is never negative, so 0 is a safe 'nothing found yet'.",
            "max_dist 는 0 에서 시작해요.\n거리의 제곱은 음수가 될 수 없어서, 0 은 '아직 아무것도 못 찾음' 자리로 안전해요."),
      ],
      cppOnly: [
        t(E, "A Python tuple (x, y) becomes a pair — read the two values with .first and .second.",
            "Python 의 튜플 (x, y) 은 pair 가 돼요. 두 값은 .first 와 .second 로 꺼내요."),
      ],
    },
    {
      label: t(E, "② Measure every pair", "② 모든 쌍을 재 보기"),
      color: A,
      py: FULL_PY.slice(8, 16), cpp: FULL_CPP.slice(18, 30),
      why: [
        t(E, "j starts at i + 1, not at 0. That way each pair is measured once instead of twice, and a site is never compared with itself.",
            "j 를 0 이 아니라 i + 1 에서 시작해요.\n그래야 쌍마다 한 번씩만 재고, 자기 자신과 견주는 일도 없어요."),
        t(E, "We keep dx² + dy² and never take a square root. The pair with the biggest squared distance is also the pair that is farthest apart, so the answer is the same — and it stays a whole number, with no decimal error.",
            "dx² + dy² 만 쓰고 제곱근은 쓰지 않아요.\n거리가 클수록 거리의 제곱도 커요.\n그래서 제곱이 가장 큰 쌍이 실제로도 가장 먼 쌍이라 답이 같아요.\n게다가 값이 정수로 남아서 소수점 오차가 아예 없어요."),
        t(E, "max_dist just remembers the biggest one seen so far, so when the loops end it already holds the answer.",
            "max_dist 는 지금까지 본 것 중 가장 큰 값만 기억해요.\n그래서 반복이 끝나면 이미 답이 들어 있어요."),
      ],
      cppOnly: [
        t(E, "Include only the headers you actually use: iostream for cin/cout, vector and utility for vector<pair<...>>, algorithm for max.",
            "쓰는 헤더만 적어요. cin/cout 은 iostream, vector<pair<...>> 는 vector 와 utility, max 는 algorithm."),
        t(E, "dx and dy are long long, so dx * dx cannot overflow. In int, a squared distance past 2×10^9 would wrap around and give a wrong answer.",
            "dx 와 dy 를 long long 으로 두면 dx * dx 가 넘치지 않아요.\nint 였다면 거리의 제곱이 2×10^9 을 넘는 순간 값이 뒤집혀 오답이 돼요."),
      ],
    },
  ];
}

export function BitcoinProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadBitcoinPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Bitcoin — Full Study Guide", "Bitcoin — 종합 풀이 노트");
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

