import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, T = map(int, input().split())",
  "events = []",
  "for _ in range(T):",
  "    t_i, a, b = map(int, input().split())",
  "    events.append((t_i, a, b))",
  "events.sort()",
  "",
  "infected_end = set()",
  "x = list(map(int, input().split()))  # final infected",
  "infected_end = set(x)",
  "",
  "# Try each cow as patient zero",
  "# Try each K from 0 to T",
  "results = []",
  "for pz in range(1, N + 1):",
  "    min_k = None",
  "    max_k = None",
  "    for K in range(T + 1):",
  "        sick = {pz}",
  "        count = {pz: 0}  # handshakes used",
  "        for t_i, a, b in events:",
  "            a_sick = a in sick",
  "            b_sick = b in sick",
  "            if a_sick and not b_sick:",
  "                if count.get(a, 0) < K:",
  "                    sick.add(b)",
  "                    count[b] = 0",
  "                    count[a] = count.get(a, 0) + 1",
  "            elif b_sick and not a_sick:",
  "                if count.get(b, 0) < K:",
  "                    sick.add(a)",
  "                    count[a] = 0",
  "                    count[b] = count.get(b, 0) + 1",
  "            elif a_sick and b_sick:",
  "                count[a] = count.get(a, 0) + 1",
  "                count[b] = count.get(b, 0) + 1",
  "        if sick == infected_end:",
  "            if min_k is None:",
  "                min_k = K",
  "            max_k = K",
  "    if min_k is not None:",
  "        results.append((pz, min_k, max_k))",
  "",
  "# Output",
  "print(len(results))",
  "for pz, mn, mx in results:",
  "    inf = 'Infinity' if mx >= T else str(mx)",
  "    print(pz, mn, inf)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false); cin.tie(nullptr);",
  "    int N, T; cin >> N >> T;",
  "    vector<tuple<int,int,int>> events(T);",
  "    for (auto& [t, a, b] : events) cin >> t >> a >> b;",
  "    sort(events.begin(), events.end());",
  "    int M; cin >> M;",
  "    set<int> infectedEnd;",
  "    while (M--) { int x; cin >> x; infectedEnd.insert(x); }",
  "    // Try each cow as patient-zero, simulate",
  "    int candidates = 0;",
  "    for (int pz = 1; pz <= N; pz++) {",
  "        set<int> inf = {pz};",
  "        for (auto& [_, a, b] : events) {",
  "            if (inf.count(a) || inf.count(b)) { inf.insert(a); inf.insert(b); }",
  "        }",
  "        if (inf == infectedEnd) candidates++;",
  "    }",
  "    cout << candidates << \"\n\";",
  "    return 0;",
  "}",
];

export function getCowntraceSections(E) {
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

export function CowntraceProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}


/* ───────────────────────────────────────────────────────────────
   CowntraceSim — pick patient-zero + K, replay handshake events,
   watch infection spread one event at a time.  Fully bilingual.
   ─────────────────────────────────────────────────────────────── */
const _CT_PRESETS = [
  {
    label: { en: "Tiny (N=4)", ko: "작은 예시 (N=4)" },
    N: 4,
    events: [
      // [time, a, b]
      [1, 1, 2],
      [2, 2, 3],
      [3, 3, 4],
    ],
    finalInfected: [1, 2, 3, 4],
  },
  {
    label: { en: "Branching (N=5)", ko: "가지형 (N=5)" },
    N: 5,
    events: [
      [1, 1, 2],
      [2, 1, 3],
      [3, 1, 4],
      [4, 4, 5],
    ],
    finalInfected: [1, 2, 3, 4, 5],
  },
  {
    label: { en: "Skip cow (N=4)", ko: "건너뛰기 (N=4)" },
    N: 4,
    events: [
      [1, 1, 2],
      [2, 3, 4],
    ],
    finalInfected: [1, 2],
  },
];

export function CowntraceSim({ E }) {
  const [pi, setPi] = useState(0);
  const preset = _CT_PRESETS[pi];
  const N = preset.N;
  const events = preset.events;
  const finalSet = new Set(preset.finalInfected);

  const [pz, setPz] = useState(1);
  const [K, setK] = useState(1);

  // Simulate the spread step-by-step for the chosen patient-zero + K
  const safePz = Math.min(Math.max(pz, 1), N);
  const safeK = Math.max(0, Math.min(K, events.length));

  const sick = new Set([safePz]);
  const count = new Map(); count.set(safePz, 0);
  const trace = [];
  for (const [t_i, a, b] of events) {
    const aSick = sick.has(a);
    const bSick = sick.has(b);
    let action = "skip";
    let infectedNow = null;
    if (aSick && !bSick) {
      if ((count.get(a) || 0) < safeK) {
        sick.add(b);
        count.set(b, 0);
        count.set(a, (count.get(a) || 0) + 1);
        action = "spread"; infectedNow = b;
      } else action = "blocked";
    } else if (bSick && !aSick) {
      if ((count.get(b) || 0) < safeK) {
        sick.add(a);
        count.set(a, 0);
        count.set(b, (count.get(b) || 0) + 1);
        action = "spread"; infectedNow = a;
      } else action = "blocked";
    } else if (aSick && bSick) {
      count.set(a, (count.get(a) || 0) + 1);
      count.set(b, (count.get(b) || 0) + 1);
      action = "both";
    }
    trace.push({ t_i, a, b, aSick, bSick, action, infectedNow, snapshot: new Set(sick) });
  }

  const finalSick = trace.length ? trace[trace.length - 1].snapshot : new Set([safePz]);
  const setsEqual = finalSick.size === finalSet.size && [...finalSick].every(x => finalSet.has(x));

  return (
    <div style={{ padding: 14 }}>
      {/* Preset switcher */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_CT_PRESETS.map((pr, i) => (
          <button key={i} onClick={() => { setPi(i); setPz(1); setK(1); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 11, fontWeight: 700, cursor: "pointer",
          }}>{t(E, pr.label.en, pr.label.ko)}</button>
        ))}
      </div>

      {/* Final-infected panel */}
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", marginBottom: 6 }}>
          🐄 {t(E, "Cows", "소")} (N = {N}) · {t(E, "Final infected (target)", "최종 감염 (목표)")}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {Array.from({ length: N }, (_, i) => i + 1).map(c => {
            const isFinal = finalSet.has(c);
            return (
              <span key={c} style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                minWidth: 28, padding: "3px 8px", borderRadius: 999,
                background: isFinal ? "#fee2e2" : "#fff",
                border: `1.5px solid ${isFinal ? "#ef4444" : "#cbd5e1"}`,
                color: isFinal ? "#991b1b" : C.dim,
                fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
              }}>{isFinal ? "🤒" : "🐄"} {c}</span>
            );
          })}
        </div>
      </div>

      {/* Pickers */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: C.dim }}>
          {t(E, "Patient zero:", "환자 제로:")}
          <select value={safePz} onChange={(e) => setPz(Number(e.target.value))} style={{
            marginLeft: 6, padding: "3px 6px", borderRadius: 6, border: `1px solid ${A}`,
            color: A, fontWeight: 700, fontSize: 11, background: "#fff",
          }}>
            {Array.from({ length: N }, (_, i) => i + 1).map(c => <option key={c} value={c}>{`Cow ${c}`}</option>)}
          </select>
        </label>
        <label style={{ fontSize: 11, fontWeight: 700, color: C.dim }}>
          {t(E, "K (max spreads/cow):", "K (소당 최대 전파):")}
          <select value={safeK} onChange={(e) => setK(Number(e.target.value))} style={{
            marginLeft: 6, padding: "3px 6px", borderRadius: 6, border: `1px solid ${A}`,
            color: A, fontWeight: 700, fontSize: 11, background: "#fff",
          }}>
            {Array.from({ length: events.length + 1 }, (_, i) => i).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </label>
      </div>

      {/* Event-by-event trace */}
      <div style={{ background: "#fff", border: `1.5px solid ${A}`, borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, marginBottom: 6, textAlign: "center" }}>
          🔍 {t(E, `Replaying ${events.length} hoof-shake event(s)`, `발굽-맞댐 이벤트 ${events.length}개 재생`)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {trace.map((r, i) => {
            const bg = r.action === "spread" ? "#fef3c7"
                      : r.action === "blocked" ? "#fee2e2"
                      : r.action === "both" ? "#e0e7ff"
                      : "#f1f5f9";
            const bd = r.action === "spread" ? "#fbbf24"
                      : r.action === "blocked" ? "#ef4444"
                      : r.action === "both" ? "#818cf8"
                      : "#cbd5e1";
            const tag = r.action === "spread" ? t(E, `→ infect ${r.infectedNow}`, `→ ${r.infectedNow} 감염`)
                       : r.action === "blocked" ? t(E, "blocked (K limit)", "차단 (K 한도)")
                       : r.action === "both" ? t(E, "both already sick", "둘 다 이미 감염")
                       : t(E, "skip (neither sick)", "건너뜀 (둘 다 건강)");
            return (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "5px 10px", borderRadius: 6, background: bg, border: `1.5px solid ${bd}`,
                fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
              }}>
                <span>t={r.t_i}: ({r.a}{r.aSick ? "🤒" : ""}, {r.b}{r.bSick ? "🤒" : ""})</span>
                <span style={{ color: bd === "#cbd5e1" ? C.dim : "#1f2937" }}>{tag}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final verdict */}
      <div style={{
        textAlign: "center", padding: "10px 12px", borderRadius: 10,
        background: setsEqual ? "#dcfce7" : "#fee2e2",
        border: `2px solid ${setsEqual ? "#16a34a" : "#dc2626"}`,
        fontSize: 12, fontWeight: 800, color: setsEqual ? "#15803d" : "#991b1b",
      }}>
        {t(E,
          `Sim infected = { ${[...finalSick].sort((a,b) => a-b).join(", ")} }`,
          `시뮬 감염 = { ${[...finalSick].sort((a,b) => a-b).join(", ")} }`)}
        <div style={{ marginTop: 4, fontSize: 11, fontWeight: 700 }}>
          {setsEqual
            ? t(E, `✓ Matches target → cow ${safePz} consistent with K=${safeK}`,
                  `✓ 목표 일치 → 소 ${safePz} 가 K=${safeK} 와 일관됨`)
            : t(E, `✗ Differs from target → cow ${safePz} not consistent with K=${safeK}`,
                  `✗ 목표와 불일치 → 소 ${safePz} 는 K=${safeK} 와 불가능`)}
        </div>
      </div>
    </div>
  );
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


export function downloadCowntracePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Cowntrace — Full Study Guide", "Cowntrace — 종합 풀이 노트");
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

