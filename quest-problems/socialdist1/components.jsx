import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ----------------------------------------------------------------
   SocDist1Sim — bilingual deep-audit sim for the title page
   Sample: N=5 cows, segments [(0,2),(4,7),(9,9)] (length 12 number line).
   Student picks D (1..6). Greedy places cows segment by segment:
   in each segment, first slot at max(a, last+D), then keep stepping +D ≤ b.
   Shows: segments, placed cows, count vs N, verdict (✓ feasible / ✗ too far).
   Big idea: as D grows, fewer cows fit. Largest D with count ≥ N = answer.
   --------------------------------------------------------------- */
export function SocDist1Sim({ E }) {
  const N = 5;
  const segments = [[0, 2], [4, 7], [9, 9]]; // length 0..9
  const MAX_X = 9;
  const [D, setD] = useState(2);

  // Greedy placement for the current D
  const placements = [];
  let last = -1e9;
  for (const [a, b] of segments) {
    let x = Math.max(a, last + D);
    while (x <= b) {
      placements.push(x);
      last = x;
      x += D;
    }
  }
  const fits = placements.length >= N;
  const shown = placements.slice(0, N); // never draw more than N cow icons

  // Find the true answer by scanning D = 1..MAX_X
  const answer = (() => {
    let best = 1;
    for (let d = 1; d <= MAX_X; d++) {
      let cnt = 0; let lst = -1e9;
      for (const [a, b] of segments) {
        let x = Math.max(a, lst + d);
        while (x <= b) { cnt++; lst = x; x += d; if (cnt >= N) break; }
        if (cnt >= N) break;
      }
      if (cnt >= N) best = d;
    }
    return best;
  })();
  const isAnswer = D === answer;

  // Layout: each unit on the number line = ~40px wide
  const U = 40;
  const totalW = (MAX_X + 1) * U;

  return (
    <div style={{ padding: "10px 8px" }}>
      <div style={{ textAlign: "center", marginBottom: 8, fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E,
          "Try it · N = 5 cows, segments = [0,2] ∪ [4,7] ∪ [9,9]",
          "직접 해봐 · N = 5 마리, 구간 = [0,2] ∪ [4,7] ∪ [9,9]")}
      </div>

      {/* Status row */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#7f1d1d", fontFamily: "'JetBrains Mono',monospace" }}>
          D = <b>{D}</b>
        </div>
        <div style={{
          background: fits ? "#dcfce7" : "#fee2e2",
          border: `1px solid ${fits ? "#16a34a" : "#dc2626"}`,
          borderRadius: 8, padding: "4px 10px", fontSize: 11,
          color: fits ? "#166534" : "#7f1d1d",
          fontFamily: "'JetBrains Mono',monospace",
        }}>
          {t(E, "placed", "배치")} = <b>{placements.length}</b> / {N} {fits ? "✓" : "✗"}
        </div>
        {isAnswer && (
          <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#92400e", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>
            {t(E, "★ best D", "★ 최적 D")}
          </div>
        )}
      </div>

      {/* Number line stage */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "16px 10px", marginBottom: 10, overflowX: "auto" }}>
        <div style={{ position: "relative", width: totalW, height: 90, margin: "0 auto" }}>
          {/* Base axis */}
          <div style={{ position: "absolute", left: U / 2, right: U / 2, top: 50, height: 2, background: C.border }} />

          {/* Segments (where cows MAY stand) */}
          {segments.map(([a, b], si) => (
            <div key={`seg-${si}`} style={{
              position: "absolute",
              left: a * U + U / 2 - 14,
              top: 38,
              width: (b - a) * U + 28,
              height: 26,
              background: "linear-gradient(180deg, #fee2e2, #fecaca)",
              border: "1.5px solid #fca5a5",
              borderRadius: 14,
              boxShadow: "inset 0 0 0 1px #fff",
            }} />
          ))}

          {/* Tick marks + numbers */}
          {Array.from({ length: MAX_X + 1 }, (_, i) => (
            <div key={`tick-${i}`} style={{
              position: "absolute",
              left: i * U + U / 2 - 8,
              top: 64,
              width: 16,
              textAlign: "center",
              fontSize: 10,
              color: C.dim,
              fontFamily: "'JetBrains Mono',monospace",
            }}>{i}</div>
          ))}

          {/* Cows */}
          {shown.map((pos, ci) => (
            <div key={`cow-${ci}`} style={{
              position: "absolute",
              left: pos * U + U / 2 - 14,
              top: 14,
              width: 28,
              fontSize: 22,
              textAlign: "center",
              transition: "left .25s ease-out",
            }}>
              <div>{"🐄"}</div>
              <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", marginTop: -2 }}>
                {pos}
              </div>
            </div>
          ))}

          {/* Missing cow markers if not all N fit */}
          {!fits && Array.from({ length: N - placements.length }, (_, mi) => (
            <div key={`miss-${mi}`} style={{
              position: "absolute",
              right: 4 + mi * 22,
              top: 0,
              fontSize: 16,
              opacity: 0.55,
            }}>{"🐄"}<span style={{ position: "absolute", left: 0, top: 0, fontSize: 18, color: "#dc2626" }}>✗</span></div>
          ))}
        </div>

        {/* Gaps row */}
        {placements.length >= 2 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.dim, flexWrap: "wrap" }}>
            <span>{t(E, "gaps:", "간격:")}</span>
            {placements.slice(1).map((p, i) => {
              const g = p - placements[i];
              return (
                <span key={i} style={{ color: g >= D ? "#16a34a" : "#dc2626", fontWeight: 700 }}>
                  {g}{i < placements.length - 2 ? "," : ""}
                </span>
              );
            })}
            <span style={{ color: C.dim }}>· min ≥ D? {Math.min(...placements.slice(1).map((p, i) => p - placements[i])) >= D ? "✓" : "✗"}</span>
          </div>
        )}
      </div>

      {/* D slider */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "Drag to change minimum gap D", "최소 간격 D 를 바꿔봐")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, color: C.dim }}>1</span>
          <input
            type="range" min={1} max={MAX_X} value={D}
            onChange={(e) => setD(parseInt(e.target.value, 10))}
            style={{ width: 220, accentColor: A }}
          />
          <span style={{ fontSize: 11, color: C.dim }}>{MAX_X}</span>
        </div>
      </div>

      {/* Insight box */}
      <div style={{ marginTop: 10, background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.55 }}>
        <b style={{ color: A }}>{t(E, "Why binary search?", "왜 이분 탐색?")}</b>{" "}
        {t(E,
          "Bigger D → fewer cows fit. So {D : N cows fit} is a downward-true range. The biggest such D is the answer — perfect for binary search.",
          "D 가 커질수록 들어가는 소가 줄어요. 즉 {D : N 마리 들어감} 은 작은 쪽이 다 참인 구간. 그 중 가장 큰 D 가 답 — 이분 탐색에 딱 맞아요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, M = map(int, input().split())",
  "stalls = []",
  "for _ in range(N):",
  "    a, b = map(int, input().split())",
  "    stalls.append((a, b))",
  "stalls.sort()",
  "",
  "# Flatten all stall positions",
  "positions = []",
  "for a, b in stalls:",
  "    positions.extend(range(a, b + 1))",
  "",
  "occupied = [positions[i] for i in range(len(positions)) if i < M]",
  "# Actually: read occupied positions separately",
  "",
  "# Binary search on minimum distance D",
  "def can_place(D, positions, occupied, cows_to_place):",
  "    all_pos = sorted(set(positions))",
  "    occ = set(occupied)",
  "    placed = sorted(occupied)",
  "    need = cows_to_place",
  "    for p in all_pos:",
  "        if p in occ:",
  "            continue",
  "        # Check if p is at least D from all placed",
  "        ok = True",
  "        for q in placed:",
  "            if abs(p - q) < D:",
  "                ok = False",
  "                break",
  "        if ok:",
  "            placed.append(p)",
  "            placed.sort()",
  "            need -= 1",
  "            if need == 0:",
  "                return True",
  "    return need <= 0",
  "",
  "lo, hi = 1, positions[-1] - positions[0]",
  "ans = 0",
  "while lo <= hi:",
  "    mid = (lo + hi) // 2",
  "    if can_place(mid, positions, occupied, M):",
  "        ans = mid",
  "        lo = mid + 1",
  "    else:",
  "        hi = mid - 1",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "#include <utility>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M; cin >> N >> M;",
  "    vector<pair<long long,long long>> stalls(N);",
  "    for (auto& [a, b] : stalls) cin >> a >> b;",
  "    sort(stalls.begin(), stalls.end());",
  "    long long lo = 1, hi = 1e18;",
  "    while (lo < hi) {",
  "        long long mid = lo + (hi - lo + 1) / 2;",
  "        // Greedy: place cows with min gap mid",
  "        long long placed = 1;",
  "        long long lastPos = stalls[0].first;",
  "        for (auto& [a, b] : stalls) {",
  "            long long pos = max(a, lastPos + mid);",
  "            while (pos <= b) {",
  "                placed++; lastPos = pos;",
  "                pos += mid;",
  "            }",
  "        }",
  "        if (placed >= M) lo = mid; else hi = mid - 1;",
  "    }",
  "    cout << lo << \"\\n\";",
  "    return 0;",
  "}",
];

export function getSocDist1Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Read the code section by section. Each line has a clear purpose.",
            "코드를 한 부분씩 읽어봐. 각 줄이 명확한 역할이 있어."),
        t(E, "C++ version is auto-translated from Python — adjust types and idioms as needed.",
            "C++ 버전은 Python에서 자동 변환 — 타입과 관용구는 필요시 조정."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python의 고수준 구문 (list, map, sorted)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) — 코드 의도가 명확해져."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합/곱이 약 2×10^9를 넘을 수 있으면 long long 사용."),
      ],
    },
  ];
}

export function SocDist1ProgressiveCode(props) {
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


export function downloadSocDist1PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SocDist1 — Full Study Guide", "SocDist1 — 종합 풀이 노트");
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

