import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ═══════════════════════════════════════════════════════════════
   ClockFenceDeepAuditSim — pick a fence path, step through every
   consecutive direction pair, watch (next - cur) mod 4 classify
   each transition (right / left / straight / U-turn), tally
   rights vs lefts, and let the verdict (CW / CCW) emerge.
   ═══════════════════════════════════════════════════════════════ */
const _CF_PRESETS = [
  { s: "NESW",     label: "NESW (square, CW)" },
  { s: "NWSE",     label: "NWSE (square, CCW)" },
  { s: "NENESWSW", label: "NENESWSW (L-shape)" },
  { s: "NNEESSWW", label: "NNEESSWW (rectangle)" },
];

const _DIR_MAP = { N: 0, E: 1, S: 2, W: 3 };
const _DIR_ARROW = { N: "↑", E: "→", S: "↓", W: "←" };
const _DIR_LABEL = { N: "N", E: "E", S: "S", W: "W" };
const _DIR_COLOR = { N: "#0ea5e9", E: "#16a34a", S: "#dc2626", W: "#f59e0b" };

function _classify(cur, nxt) {
  const diff = ((nxt - cur) % 4 + 4) % 4;
  if (diff === 1) return { kind: "R", diff };  // right
  if (diff === 3) return { kind: "L", diff };  // left
  if (diff === 2) return { kind: "U", diff };  // U-turn
  return { kind: "S", diff };                  // straight
}

export function ClockFenceDeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const { s } = _CF_PRESETS[pi];
  const [step, setStep] = useState(0);     // how many transitions revealed
  const [audited, setAudited] = useState(false);

  const switchPreset = (newPi) => {
    setPi(newPi);
    setStep(0);
    setAudited(false);
  };

  const n = s.length;
  const transitions = [];
  for (let i = 0; i < n; i++) {
    const cur = _DIR_MAP[s[i]];
    const nxt = _DIR_MAP[s[(i + 1) % n]];
    transitions.push({ i, cur, nxt, ...(_classify(cur, nxt)) });
  }

  // Tally based on revealed-so-far step
  let rights = 0, lefts = 0;
  for (let k = 0; k < step; k++) {
    if (transitions[k].kind === "R") rights++;
    else if (transitions[k].kind === "L") lefts++;
  }
  const totalRights = transitions.filter(x => x.kind === "R").length;
  const totalLefts  = transitions.filter(x => x.kind === "L").length;
  const verdict = totalRights > totalLefts ? "CW" : "CCW";

  const advance = () => {
    if (step < n) setStep(step + 1);
    else setAudited(true);
  };
  const reset = () => { setStep(0); setAudited(false); };

  const kindBg = { R: "#dcfce7", L: "#fee2e2", U: "#fef3c7", S: "#e0e7ff" };
  const kindBd = { R: "#86efac", L: "#fca5a5", U: "#fde68a", S: "#a5b4fc" };
  const kindCol = { R: "#166534", L: "#991b1b", U: "#92400e", S: "#3730a3" };
  const kindTxt = (k) => k === "R" ? t(E, "right", "오른쪽")
                       : k === "L" ? t(E, "left",  "왼쪽")
                       : k === "U" ? t(E, "U-turn","U턴")
                       :              t(E, "straight","직진");

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_CF_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8 }}>
        {t(E,
          "Step through each consecutive pair. Watch (next − cur) mod 4 decide right / left / straight / U-turn.",
          "연속한 쌍을 한 단계씩 살펴봐. (다음 − 현재) mod 4 가 오른쪽 / 왼쪽 / 직진 / U턴 을 결정해.")}
      </div>

      {/* direction row with arrow icons */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        {s.split("").map((ch, i) => {
          const active = i === step % n && step < n;
          const consumed = i < step;
          return (
            <div key={i} style={{
              width: 40, height: 50, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              borderRadius: 8,
              background: consumed ? "#f5f3ff" : (active ? "#ede9fe" : "#fff"),
              border: `1.5px solid ${active ? A : C.border}`,
              color: _DIR_COLOR[ch],
              boxShadow: active ? `0 0 0 2px ${A}33` : "none",
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{_DIR_ARROW[ch]}</div>
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>{_DIR_LABEL[ch]}</div>
            </div>
          );
        })}
      </div>

      {/* index row showing (next-cur) mod 4 calc, only for revealed steps */}
      <div style={{
        background: "#fafafa", border: "1px solid #e5e7eb", borderRadius: 10,
        padding: "8px 10px", marginBottom: 10, fontSize: 12,
        fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.7,
      }}>
        <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 4, fontFamily: "inherit" }}>
          {t(E, "Transitions revealed", "공개된 전환")} ({Math.min(step, n)} / {n})
        </div>
        {step === 0 && (
          <div style={{ color: C.dim, fontStyle: "italic" }}>
            {t(E, "Tap 'Next step' to reveal the first transition.",
                  "'다음 단계' 를 눌러 첫 전환을 공개해.")}
          </div>
        )}
        {transitions.slice(0, step).map((tr, k) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ color: C.dim, minWidth: 22 }}>#{k + 1}</span>
            <span style={{ color: _DIR_COLOR[s[tr.i]], fontWeight: 700 }}>{s[tr.i]}({tr.cur})</span>
            <span style={{ color: C.dim }}>→</span>
            <span style={{ color: _DIR_COLOR[s[(tr.i + 1) % n]], fontWeight: 700 }}>{s[(tr.i + 1) % n]}({tr.nxt})</span>
            <span style={{ color: C.dim }}>:</span>
            <span>({tr.nxt} − {tr.cur}) mod 4 = {tr.diff}</span>
            <span style={{
              padding: "1px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              background: kindBg[tr.kind], border: `1px solid ${kindBd[tr.kind]}`, color: kindCol[tr.kind],
            }}>
              {kindTxt(tr.kind)}
            </span>
          </div>
        ))}
      </div>

      {/* tally */}
      <div style={{
        background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "right", "오른쪽")} = {rights} &nbsp; {t(E, "left", "왼쪽")} = {lefts}
        </div>
        <div style={{ fontSize: 12, color: "#5b21b6" }}>
          {step < n
            ? t(E, "more to go…", "아직 남았어…")
            : t(E, "all pairs counted ✓", "모든 쌍 세기 완료 ✓")}
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={advance} disabled={audited} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${A}`,
          background: audited ? "#e5e7eb" : A, color: audited ? "#9ca3af" : "#fff",
          fontSize: 12, fontWeight: 700, cursor: audited ? "default" : "pointer",
        }}>
          {step < n
            ? t(E, "▶ Next step", "▶ 다음 단계")
            : t(E, "🔍 Reveal verdict", "🔍 판정 공개")}
        </button>
        <button onClick={reset} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          {t(E, "↻ Reset", "↻ 초기화")}
        </button>
      </div>

      {/* verdict */}
      {audited && (
        <div style={{
          background: verdict === "CW" ? "#ecfdf5" : "#eff6ff",
          border: `1px solid ${verdict === "CW" ? "#6ee7b7" : "#93c5fd"}`,
          borderRadius: 10, padding: "10px 14px",
          color: verdict === "CW" ? "#065f46" : "#1e3a8a",
          fontSize: 13, lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 800, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
            rights ({totalRights}) {totalRights > totalLefts ? ">" : "≤"} lefts ({totalLefts}) → {verdict}
          </div>
          <div style={{ fontSize: 12 }}>
            {verdict === "CW"
              ? t(E, "More right turns than left → fence is traced CLOCKWISE.",
                    "오른쪽 회전이 왼쪽보다 많아 → 시계 방향(CW) 으로 그려졌어.")
              : t(E, "More (or equal) left turns than right → fence is traced COUNTER-CLOCKWISE.",
                    "왼쪽 회전이 오른쪽보다 많아 (또는 같아) → 반시계 방향(CCW) 으로 그려졌어.")}
          </div>
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "s = input().strip()",
  "",
  "# Direction mapping: N=0, E=1, S=2, W=3",
  "dir_map = {'N': 0, 'E': 1, 'S': 2, 'W': 3}",
  "",
  "right_turns = 0",
  "left_turns = 0",
  "",
  "for i in range(len(s)):",
  "    cur = dir_map[s[i]]",
  "    nxt = dir_map[s[(i+1) % len(s)]]",
  "    diff = (nxt - cur) % 4",
  "    if diff == 1:",
  "        right_turns += 1",
  "    elif diff == 3:",
  "        left_turns += 1",
  "    # diff == 2 means U-turn, diff == 0 means straight",
  "",
  "if right_turns > left_turns:",
  "    print('CW')",
  "else:",
  "    print('CCW')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    string s; cin >> s;",
  "    map<char,int> dirMap = {{'N',0},{'E',1},{'S',2},{'W',3}};",
  "    int rights = 0, lefts = 0;",
  "    for (int i = 0; i < (int)s.size(); i++) {",
  "        int cur = dirMap[s[i]];",
  "        int next = dirMap[s[(i + 1) % s.size()]];",
  "        int diff = (next - cur + 4) % 4;",
  "        if (diff == 1) rights++;",
  "        else if (diff == 3) lefts++;",
  "    }",
  "    cout << rights << \" \" << lefts << \"\\n\";",
  "    return 0;",
  "}",
];

export function getClockFenceSections(E) {
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

export function ClockFenceProgressiveCode(props) {
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


export function downloadClockFencePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "ClockFence — Full Study Guide", "ClockFence — 종합 풀이 노트");
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

