import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "S = input().strip()",
  "T = input().strip()",
  "",
  "# XOR two binary strings of equal length",
  "result = []",
  "for i in range(len(S)):",
  "    if S[i] == T[i]:",
  "        result.append('0')",
  "    else:",
  "        result.append('1')",
  "",
  "print(''.join(result))",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    string S, T; cin >> S >> T;",
  "    string out;",
  "    for (size_t i = 0; i < S.size(); i++) out += (S[i] == T[i] ? '0' : '1');",
  "    cout << out << \"\n\";",
  "    return 0;",
  "}",
];

export function getXorStringSections(E) {
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

export function XorStringProgressiveCode(props) {
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


/* ================================================================
   XOR Walker Simulator
   Bit-by-bit interactive lab. Edit A and B, step/play to walk
   the position pointer left-to-right; result builds char by char.
   ================================================================ */
const SAME_BG = "#dcfce7";   // green-100
const SAME_FG = "#15803d";   // green-700
const DIFF_BG = "#fee2e2";   // red-100
const DIFF_FG = "#b91c1c";   // red-700
const BLUE_BG = "#eff6ff";
const BLUE_BD = "#93c5fd";
const BLUE_FG = "#2563eb";

function sanitizeBits(s, len) {
  const cleaned = String(s).replace(/[^01]/g, "").slice(0, len);
  return cleaned.padEnd(len, "0");
}

export function XorWalkerSim({ E }) {
  const LEN = 8;
  const [a, setA] = useState("10110100");
  const [b, setB] = useState("11010001");
  const [pos, setPos] = useState(0);   // next index to compute (0..LEN); LEN means done
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const result = [];
  for (let i = 0; i < pos; i++) result.push(a[i] === b[i] ? "0" : "1");

  useEffect(() => {
    if (!playing) return;
    if (pos >= LEN) { setPlaying(false); return; }
    timerRef.current = setTimeout(() => setPos(p => p + 1), 650);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, pos]);

  // Reset pointer when inputs change
  useEffect(() => { setPos(0); setPlaying(false); }, [a, b]);

  const reset = () => { setPlaying(false); setPos(0); };
  const step = () => { setPlaying(false); if (pos < LEN) setPos(pos + 1); };
  const togglePlay = () => {
    if (pos >= LEN) { setPos(0); setPlaying(true); return; }
    setPlaying(p => !p);
  };

  const cellBase = {
    width: 36, height: 40, display: "inline-flex",
    alignItems: "center", justifyContent: "center",
    borderRadius: 6, border: "1.5px solid #cbd5e1",
    fontFamily: "JetBrains Mono, monospace", fontSize: 18, fontWeight: 700,
    background: "#fff", color: "#0f172a",
  };

  const renderRow = (label, bits, isResult = false) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{ width: 56, fontSize: 13, fontWeight: 700, color: BLUE_FG, textAlign: "right" }}>{label}</div>
      <div style={{ display: "flex", gap: 4 }}>
        {Array.from({ length: LEN }).map((_, i) => {
          const isCur = i === pos && pos < LEN;
          const isDone = i < pos;
          let bg = "#fff", fg = "#0f172a", bd = "#cbd5e1";
          if (isResult) {
            if (i < pos) {
              const same = a[i] === b[i];
              bg = same ? SAME_BG : DIFF_BG;
              fg = same ? SAME_FG : DIFF_FG;
              bd = same ? SAME_FG : DIFF_FG;
            } else {
              return (
                <div key={i} style={{ ...cellBase, background: "#f1f5f9", color: "#94a3b8", borderStyle: "dashed" }}>·</div>
              );
            }
          } else {
            if (isCur) { bg = "#fef3c7"; bd = "#f59e0b"; }
            else if (isDone) {
              const same = a[i] === b[i];
              bg = same ? SAME_BG : DIFF_BG;
              bd = same ? SAME_FG : DIFF_FG;
            }
          }
          const ch = isResult ? result[i] : bits[i];
          return (
            <div key={i} style={{
              ...cellBase, background: bg, color: fg, borderColor: bd,
              transform: isCur && !isResult ? "translateY(-2px)" : "none",
              boxShadow: isCur && !isResult ? "0 4px 10px rgba(245,158,11,.35)" : "none",
              transition: "all .25s ease",
            }}>{ch}</div>
          );
        })}
      </div>
    </div>
  );

  // Index ruler
  const ruler = (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <div style={{ width: 56 }} />
      <div style={{ display: "flex", gap: 4 }}>
        {Array.from({ length: LEN }).map((_, i) => (
          <div key={i} style={{
            width: 36, textAlign: "center", fontSize: 11, color: i === pos && pos < LEN ? "#b45309" : "#64748b",
            fontWeight: i === pos && pos < LEN ? 700 : 500,
          }}>{i}</div>
        ))}
      </div>
    </div>
  );

  const inputStyle = {
    fontFamily: "JetBrains Mono, monospace", fontSize: 15, fontWeight: 700,
    padding: "6px 8px", border: `1.5px solid ${BLUE_BD}`, borderRadius: 6,
    width: 140, letterSpacing: 1, color: "#0f172a", background: "#fff",
  };

  const btnStyle = (filled) => ({
    padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
    borderRadius: 6, border: `1.5px solid ${BLUE_FG}`,
    background: filled ? BLUE_FG : "#fff", color: filled ? "#fff" : BLUE_FG,
  });

  const done = pos >= LEN;
  const cur = pos < LEN ? pos : null;
  const curSame = cur != null ? a[cur] === b[cur] : null;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: BLUE_BG, border: `1.5px solid ${BLUE_FG}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
          🧪 {t(E, "XOR Truth Walker", "XOR 워커 실험")}
        </div>
        <div style={{ fontSize: 12, color: "#1e3a8a", lineHeight: 1.5 }}>
          {t(E,
            "Edit A and B (only 0/1, length 8). Step or Play to walk the pointer.",
            "A 와 B 를 바꿔 봐 (0/1 만, 길이 8). Step 또는 Play 로 포인터를 움직여.")}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 12, justifyContent: "center" }}>
        <label style={{ fontSize: 12, color: "#1e3a8a", fontWeight: 700 }}>A</label>
        <input value={a} onChange={e => setA(sanitizeBits(e.target.value, LEN))} style={inputStyle} />
        <label style={{ fontSize: 12, color: "#1e3a8a", fontWeight: 700 }}>B</label>
        <input value={b} onChange={e => setB(sanitizeBits(e.target.value, LEN))} style={inputStyle} />
      </div>

      <div style={{ background: "#fff", border: `1px solid ${BLUE_BD}`, borderRadius: 10, padding: 14, marginBottom: 12, overflowX: "auto" }}>
        {ruler}
        {renderRow("A", a)}
        {renderRow("B", b)}
        <div style={{ height: 1, background: "#e2e8f0", margin: "8px 0 8px 64px" }} />
        {renderRow(t(E, "A⊕B", "A⊕B"), null, true)}
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={togglePlay} style={btnStyle(true)}>
          {done ? t(E, "🔁 Replay", "🔁 다시") : (playing ? t(E, "⏸ Pause", "⏸ 일시정지") : t(E, "▶ Play", "▶ 재생"))}
        </button>
        <button onClick={step} style={btnStyle(false)} disabled={done}>
          {t(E, "Step ▸", "한 칸 ▸")}
        </button>
        <button onClick={reset} style={btnStyle(false)}>
          {t(E, "Reset", "초기화")}
        </button>
      </div>

      <div style={{ fontSize: 12, color: C.text, textAlign: "center", lineHeight: 1.6, padding: "0 8px" }}>
        {done ? (
          <span>
            ✅ {t(E, "Done — final XOR string: ", "완료 — 최종 XOR 문자열: ")}
            <b style={{ fontFamily: "JetBrains Mono, monospace", color: BLUE_FG }}>{result.join("")}</b>
          </span>
        ) : cur != null ? (
          <span>
            {t(E, "At position ", "위치 ")}<b>{cur}</b>{t(E, ": A[", " 에서: A[")}{cur}{t(E, "]=", "]=")}<b>{a[cur]}</b>{t(E, ", B[", ", B[")}{cur}{t(E, "]=", "]=")}<b>{b[cur]}</b>{" → "}
            {curSame
              ? <b style={{ color: SAME_FG }}>{t(E, "same → 0", "같음 → 0")}</b>
              : <b style={{ color: DIFF_FG }}>{t(E, "different → 1", "다름 → 1")}</b>}
          </span>
        ) : (
          <span>{t(E, "Press Play or Step to begin.", "Play 또는 Step 을 눌러 시작.")}</span>
        )}
      </div>
    </div>
  );
}


export function downloadXorStringPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "XorString — Full Study Guide", "XorString — 종합 풀이 노트");
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

