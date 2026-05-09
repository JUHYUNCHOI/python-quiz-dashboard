import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ----------------------------------------------------------------
   SocDist2Sim — bilingual deep-audit sim for the title page
   Sample: sick = [3, 5, 12, 14], healthy = [8]. Number line 0..16.
   Student picks R (0..6). Sim shows:
   - Each sick cow with infection range [x-R, x+R]
   - If any healthy cow falls inside any range → invalid (R too big)
   - When valid, count clusters: adjacent sick gap > 2R → new cluster
   Big idea: largest R with no healthy hit + cluster count = answer.
   --------------------------------------------------------------- */
export function SocDist2Sim({ E }) {
  const sick = [3, 5, 12, 14];
  const healthy = [8];
  const MAX_X = 16;
  const MAX_R = 6;
  const [R, setR] = useState(1);

  // Validity: no healthy cow within R of any sick cow
  const conflicts = healthy.filter(h => sick.some(s => Math.abs(h - s) <= R));
  const valid = conflicts.length === 0;

  // True best R: min |h - s| - 1, clamped at 0
  const bestR = Math.max(0, Math.min(
    ...healthy.flatMap(h => sick.map(s => Math.abs(h - s) - 1))
  ));
  const isBest = R === bestR;

  // Cluster count (only meaningful when valid)
  const sortedSick = [...sick].sort((a, b) => a - b);
  let clusters = sortedSick.length > 0 ? 1 : 0;
  for (let i = 1; i < sortedSick.length; i++) {
    if (sortedSick[i] - sortedSick[i - 1] > 2 * R) clusters++;
  }

  const U = 26;
  const totalW = (MAX_X + 1) * U;

  return (
    <div style={{ padding: "10px 8px" }}>
      <div style={{ textAlign: "center", marginBottom: 8, fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E,
          "Try it · sick = {3,5,12,14}, healthy = {8}",
          "직접 해봐 · 감염 = {3,5,12,14}, 건강 = {8}")}
      </div>

      {/* Status row */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#1e3a8a", fontFamily: "'JetBrains Mono',monospace" }}>
          R = <b>{R}</b>
        </div>
        <div style={{
          background: valid ? "#dcfce7" : "#fee2e2",
          border: `1px solid ${valid ? "#16a34a" : "#dc2626"}`,
          borderRadius: 8, padding: "4px 10px", fontSize: 11,
          color: valid ? "#166534" : "#7f1d1d",
          fontFamily: "'JetBrains Mono',monospace",
        }}>
          {valid
            ? t(E, "valid ✓", "유효 ✓")
            : t(E, "healthy hit ✗", "건강 소 감염 ✗")}
        </div>
        {valid && (
          <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#92400e", fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "clusters", "클러스터")} = <b>{clusters}</b>
          </div>
        )}
        {isBest && (
          <div style={{ background: "#fce7f3", border: "1px solid #db2777", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#9d174d", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>
            {t(E, "★ best R", "★ 최적 R")}
          </div>
        )}
      </div>

      {/* Number line stage */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "16px 10px", marginBottom: 10, overflowX: "auto" }}>
        <div style={{ position: "relative", width: totalW, height: 96, margin: "0 auto" }}>
          {/* Base axis */}
          <div style={{ position: "absolute", left: U / 2, right: U / 2, top: 56, height: 2, background: C.border }} />

          {/* Infection ranges around each sick cow */}
          {sick.map((s, si) => {
            const lo = Math.max(0, s - R);
            const hi = Math.min(MAX_X, s + R);
            return (
              <div key={`range-${si}`} style={{
                position: "absolute",
                left: lo * U + U / 2 - 10,
                top: 44,
                width: (hi - lo) * U + 20,
                height: 26,
                background: valid ? "rgba(220, 38, 38, 0.15)" : "rgba(220, 38, 38, 0.30)",
                border: `1.5px ${valid ? "dashed" : "solid"} #dc2626`,
                borderRadius: 14,
                transition: "all .2s ease-out",
              }} />
            );
          })}

          {/* Tick marks */}
          {Array.from({ length: MAX_X + 1 }, (_, i) => (
            <div key={`tick-${i}`} style={{
              position: "absolute",
              left: i * U + U / 2 - 8,
              top: 70,
              width: 16,
              textAlign: "center",
              fontSize: 9,
              color: C.dim,
              fontFamily: "'JetBrains Mono',monospace",
            }}>{i}</div>
          ))}

          {/* Sick cows */}
          {sick.map((pos, ci) => (
            <div key={`sick-${ci}`} style={{
              position: "absolute",
              left: pos * U + U / 2 - 12,
              top: 22,
              width: 24,
              fontSize: 18,
              textAlign: "center",
            }}>
              <div>{"🦠"}</div>
              <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", marginTop: -4 }}>
                {pos}
              </div>
            </div>
          ))}

          {/* Healthy cows */}
          {healthy.map((pos, ci) => {
            const hit = sick.some(s => Math.abs(pos - s) <= R);
            return (
              <div key={`hlt-${ci}`} style={{
                position: "absolute",
                left: pos * U + U / 2 - 12,
                top: 22,
                width: 24,
                fontSize: 18,
                textAlign: "center",
              }}>
                <div style={{ filter: hit ? "none" : "hue-rotate(80deg) saturate(2)" }}>{"🐄"}</div>
                <div style={{ fontSize: 9, color: hit ? "#dc2626" : "#16a34a", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", marginTop: -4 }}>
                  {pos}{hit ? " ✗" : " ✓"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cluster gap row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.dim, flexWrap: "wrap" }}>
          <span>{t(E, "sick gaps:", "감염 간격:")}</span>
          {sortedSick.slice(1).map((p, i) => {
            const g = p - sortedSick[i];
            const newCluster = g > 2 * R;
            return (
              <span key={i} style={{ color: newCluster ? "#db2777" : "#16a34a", fontWeight: 700 }}>
                {g}{newCluster ? " ▶" : ""}{i < sortedSick.length - 2 ? "," : ""}
              </span>
            );
          })}
          <span style={{ color: C.dim }}>· {t(E, "gap > 2R = new cluster", "간격 > 2R = 새 클러스터")}</span>
        </div>
      </div>

      {/* R slider */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "Drag to change spread radius R", "전파 반경 R 을 바꿔봐")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, color: C.dim }}>0</span>
          <input
            type="range" min={0} max={MAX_R} value={R}
            onChange={(e) => setR(parseInt(e.target.value, 10))}
            style={{ width: 220, accentColor: A }}
          />
          <span style={{ fontSize: 11, color: C.dim }}>{MAX_R}</span>
        </div>
      </div>

      {/* Insight box */}
      <div style={{ marginTop: 10, background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.55 }}>
        <b style={{ color: A }}>{t(E, "Two questions, one answer", "질문 둘, 답 하나")}</b>{" "}
        {t(E,
          "Bigger R → infection rings reach healthy cows (invalid). Smaller R → sick cows fall into separate clusters (more seeds). The largest valid R minimises the cluster count.",
          "R 이 커지면 감염 범위가 건강 소까지 닿음 (무효). R 이 작으면 감염 소들이 다른 클러스터로 갈라져요 (씨앗 ↑). 유효한 가장 큰 R 이 클러스터 (= 최초 감염) 최소.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "cows = []",
  "for _ in range(N):",
  "    x, s = input().split()",
  "    cows.append((int(x), int(s)))",
  "cows.sort()",
  "",
  "# Find max R from healthy cows",
  "sick = [x for x, s in cows if s == 1]",
  "healthy = [x for x, s in cows if s == 0]",
  "",
  "if not healthy:",
  "    # All sick: could be 1 initially infected",
  "    print(1)",
  "else:",
  "    # R must be < min distance from any healthy to nearest sick",
  "    max_R = float('inf')",
  "    for h in healthy:",
  "        for s in sick:",
  "            max_R = min(max_R, abs(h - s) - 1)",
  "    if max_R < 0:",
  "        max_R = 0",
  "",
  "    # Count clusters of sick cows with gaps > max_R",
  "    if not sick:",
  "        print(0)",
  "    else:",
  "        clusters = 1",
  "        for i in range(1, len(sick)):",
  "            if sick[i] - sick[i-1] > 2 * max_R:",
  "                clusters += 1",
  "        print(clusters)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<pair<long long,int>> cows(N);",
  "    for (auto& [x, s] : cows) cin >> x >> s;",
  "    sort(cows.begin(), cows.end());",
  "    int infected = 0;",
  "    for (int i = 0; i < N; i++) if (cows[i].second == 1) {",
  "        infected++;",
  "        // Check spread to neighbors within distance R (problem-specific)",
  "    }",
  "    cout << infected << \"\n\";",
  "    return 0;",
  "}",
];

export function getSocDist2Sections(E) {
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
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) speeds up I/O.",
            "ios::sync_with_stdio(false) + cin.tie(nullptr)로 입출력 가속."),
        t(E, "long long avoids overflow — use it freely for indices and sums.",
            "long long으로 오버플로 방지 — 인덱스, 합계에 자주 사용."),
      ],
    },
  ];
}

export function SocDist2ProgressiveCode(props) {
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


export function downloadSocDist2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SocDist2 — Full Study Guide", "SocDist2 — 종합 풀이 노트");
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

