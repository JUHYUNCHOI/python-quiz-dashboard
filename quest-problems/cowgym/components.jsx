import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ═══════════════════════════════════════════════════════════════
   CowGymPairSim — Pick a pair (i, j), step through K sessions,
   see per-session winner accumulate to a final verdict.
   ═══════════════════════════════════════════════════════════════ */
const _CG_PRESETS = [
  {
    // K=3, N=4 — pair (1,2) consistent, pair (2,3) inconsistent
    sessionsOrder: [
      [1, 2, 3, 4], // S1
      [1, 4, 2, 3], // S2
      [4, 1, 2, 3], // S3
    ],
    N: 4,
  },
  {
    // K=2, N=3 — classic
    sessionsOrder: [
      [1, 2, 3],
      [1, 3, 2],
    ],
    N: 3,
  },
];

export function CowGymPairSim({ E }) {
  const [pi, setPi] = useState(0);
  const [pairIdx, setPairIdx] = useState(0);
  const [step, setStep] = useState(0); // 0..K-1: per-session check, K = verdict
  const preset = _CG_PRESETS[pi];
  const { sessionsOrder, N } = preset;
  const K = sessionsOrder.length;

  // Build rank[s][cow]: position of cow in session s
  const rank = sessionsOrder.map(order => {
    const r = new Array(N + 1).fill(0);
    for (let pos = 0; pos < N; pos++) r[order[pos]] = pos;
    return r;
  });

  // All unique pairs (i, j), i < j
  const pairs = [];
  for (let i = 1; i <= N; i++) for (let j = i + 1; j <= N; j++) pairs.push([i, j]);
  const [ci, cj] = pairs[pairIdx % pairs.length];

  // Per-session: who wins (i wins → 'i', j wins → 'j')
  const winners = rank.map(r => r[ci] < r[cj] ? "i" : "j");
  const visible = winners.slice(0, step);
  const allI = visible.length > 0 && visible.every(w => w === "i");
  const allJ = visible.length > 0 && visible.every(w => w === "j");
  const verdict = step >= K ? (allI || allJ ? "consistent" : "inconsistent") : null;

  const cowColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

  const newPair = () => { setPairIdx(p => (p + 1) % pairs.length); setStep(0); };
  const newCase = () => { setPi(p => (p + 1) % _CG_PRESETS.length); setPairIdx(0); setStep(0); };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, marginBottom: 8, textAlign: "center" }}>
        {t(E, "🤸 Try a pair — step through every session", "🤸 쌍을 골라서 — 세션마다 한 칸씩")}
      </div>

      {/* Case + pair pickers */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={newCase} style={{
          padding: "4px 10px", borderRadius: 8, border: `1px solid ${A}`,
          background: "#fff", color: A, fontSize: 11, fontWeight: 700, cursor: "pointer",
        }}>{t(E, `Case ${pi + 1}/${_CG_PRESETS.length}`, `예제 ${pi + 1}/${_CG_PRESETS.length}`)}</button>
        <button onClick={newPair} style={{
          padding: "4px 10px", borderRadius: 8, border: `1px solid ${A}`,
          background: A, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer",
        }}>{t(E, `Pair (${ci},${cj}) — next`, `쌍 (${ci},${cj}) — 다음`)}</button>
      </div>

      {/* Rank table — highlight ci, cj columns */}
      <div style={{ overflowX: "auto", marginBottom: 10 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
          <thead>
            <tr style={{ background: "#fffbeb" }}>
              <th style={{ padding: "6px 8px", borderBottom: `2px solid #fcd34d`, color: A, textAlign: "left" }}>
                {t(E, "Session", "세션")}
              </th>
              {Array.from({ length: N }, (_, k) => {
                const cow = k + 1;
                const isPair = cow === ci || cow === cj;
                return (
                  <th key={k} style={{
                    padding: "6px 8px", borderBottom: `2px solid #fcd34d`,
                    color: cowColors[k % cowColors.length],
                    fontWeight: isPair ? 900 : 600,
                    background: isPair ? "#fef3c7" : "transparent",
                  }}>{t(E, `Cow ${cow}`, `소 ${cow}`)}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rank.map((r, s) => {
              const active = s < step;
              return (
                <tr key={s} style={{ background: active ? "#fff7ed" : (s % 2 === 0 ? "#fff" : "#fffbeb") }}>
                  <td style={{ padding: "5px 8px", borderBottom: "1px solid #fde68a", fontWeight: 700 }}>S{s + 1}</td>
                  {Array.from({ length: N }, (_, k) => {
                    const cow = k + 1;
                    const isPair = cow === ci || cow === cj;
                    return (
                      <td key={k} style={{
                        padding: "5px 8px", borderBottom: "1px solid #fde68a", textAlign: "center",
                        fontWeight: isPair ? 900 : 600,
                        color: isPair ? A : C.text,
                        background: isPair && active ? "#fde68a" : (isPair ? "#fef3c7" : "transparent"),
                      }}>{r[cow]}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Per-session check log */}
      <div style={{ background: "#fffbeb", border: `1.5px solid #fcd34d`, borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.8, color: C.text, minHeight: 60 }}>
        {step === 0 && (
          <span style={{ color: C.dim }}>
            {t(E, `Press → to check session-by-session if cow ${ci} stays above cow ${cj}.`,
                  `→ 를 눌러 소 ${ci} 가 소 ${cj} 위에 계속 있는지 세션마다 확인.`)}
          </span>
        )}
        {visible.map((w, s) => {
          const ri = rank[s][ci], rj = rank[s][cj];
          const sign = ri < rj ? "<" : ">";
          const winner = w === "i" ? ci : cj;
          return (
            <div key={s}>
              S{s + 1}: rank[{ci}]={ri} {sign} rank[{cj}]={rj} →{" "}
              <b style={{ color: w === "i" ? cowColors[(ci - 1) % cowColors.length] : cowColors[(cj - 1) % cowColors.length] }}>
                {t(E, `cow ${winner} wins`, `소 ${winner} 승`)}
              </b>
            </div>
          );
        })}
        {verdict && (
          <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #fcd34d", fontWeight: 800, color: verdict === "consistent" ? "#059669" : "#dc2626" }}>
            {verdict === "consistent"
              ? t(E, `✓ Consistent — same winner every session (ans += 1)`,
                       `✓ 일관 — 매 세션 같은 승자 (ans += 1)`)
              : t(E, `✗ Inconsistent — winner flipped, skip`,
                       `✗ 비일관 — 승자가 바뀜, 건너뜀`)}
          </div>
        )}
      </div>

      {/* Step controls */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
          background: step === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${step === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: step === 0 ? "#b0b5c3" : A, cursor: step === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
          {step} / {K}
        </span>
        <button onClick={() => setStep(Math.min(K, step + 1))} disabled={step >= K} style={{
          background: step >= K ? "#e5e7eb" : A, border: `1px solid ${step >= K ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: step >= K ? "#b0b5c3" : "#fff", cursor: step >= K ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "K, N = map(int, input().split())",
  "",
  "# rank[s][c] = position of cow c in session s",
  "rank = []",
  "for _ in range(K):",
  "    order = list(map(int, input().split()))",
  "    r = [0] * (N + 1)",
  "    for pos in range(N):",
  "        r[order[pos]] = pos",
  "    rank.append(r)",
  "",
  "ans = 0",
  "for i in range(1, N + 1):",
  "    for j in range(i + 1, N + 1):",
  "        # Check if i always beats j or j always beats i",
  "        i_wins = all(rank[s][i] < rank[s][j] for s in range(K))",
  "        j_wins = all(rank[s][j] < rank[s][i] for s in range(K))",
  "        if i_wins or j_wins:",
  "            ans += 1",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int K, N;",
  "    cin >> K >> N;",
  "    vector<vector<int>> rank(K, vector<int>(N + 1, 0));",
  "    for (int s = 0; s < K; s++) {",
  "        for (int p = 0; p < N; p++) {",
  "            int c;",
  "            cin >> c;",
  "            rank[s][c] = p;",
  "        }",
  "    }",
  "    long long ans = 0;",
  "    for (int a = 1; a <= N; a++) {",
  "        for (int b = a + 1; b <= N; b++) {",
  "            int aFirst = 0;",
  "            for (int s = 0; s < K; s++) {",
  "                if (rank[s][a] < rank[s][b]) aFirst++;",
  "            }",
  "            if (aFirst == 0 || aFirst == K) ans++;",
  "        }",
  "    }",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCowGymSections(E) {
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
        t(E, "Split #include into specific headers (iostream, vector).",
            "#include 는 배운 헤더들로 (iostream, vector) 나눠 적어."),
        t(E, "ans is a pair count — up to N*(N-1)/2 — use long long when N is large.",
            "ans 는 쌍 개수 (N*(N-1)/2) — N 이 크면 long long 안전."),
      ],
    },
  ];
}

export function CowGymProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadCowGymPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CowGym — Full Study Guide", "CowGym — 종합 풀이 노트");
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

