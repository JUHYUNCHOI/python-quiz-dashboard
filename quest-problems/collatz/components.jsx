import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ─────────────────────────────────────────────
   CollatzTrajectorySim — bilingual interactive
   pick N (1..50), animate trajectory, bar chart,
   step counter, max value reached.
   ───────────────────────────────────────────── */
export function CollatzTrajectorySim({ E }) {
  const [n, setN] = useState(7);
  const [traj, setTraj] = useState([7]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  // Compute full trajectory whenever n changes
  useEffect(() => {
    const seq = [n];
    let cur = n;
    let guard = 0;
    while (cur !== 1 && guard < 500) {
      cur = cur % 2 === 0 ? cur / 2 : 3 * cur + 1;
      seq.push(cur);
      guard++;
    }
    setTraj(seq);
    setIdx(0);
    setPlaying(false);
  }, [n]);

  // Auto-advance when playing
  useEffect(() => {
    if (!playing) {
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
      return;
    }
    if (idx >= traj.length - 1) { setPlaying(false); return; }
    timerRef.current = setTimeout(() => setIdx(i => Math.min(i + 1, traj.length - 1)), 450);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, idx, traj]);

  const visible = traj.slice(0, idx + 1);
  const maxVal = Math.max(...visible);
  const reached = traj[idx] === 1;
  const peak = Math.max(...traj);

  const handlePlay = () => {
    if (idx >= traj.length - 1) { setIdx(0); setPlaying(true); }
    else setPlaying(p => !p);
  };
  const handleStep = () => {
    setPlaying(false);
    setIdx(i => Math.min(i + 1, traj.length - 1));
  };
  const handleReset = () => { setPlaying(false); setIdx(0); };

  const stepLabel = reached
    ? t(E, "✅ Reached 1!", "✅ 1 도달!")
    : t(E, "Running…", "진행 중…");

  return (
    <div style={{ padding: 16 }}>
      <div style={{
        background: "#ecfdf5", border: `1.5px solid ${A}`, borderRadius: 12,
        padding: "10px 14px", marginBottom: 12, textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5 }}>
          🎮 {t(E, "Trajectory Sim", "추적 시뮬")}
        </div>
        <div style={{ fontSize: 12, color: "#065f46", marginTop: 4 }}>
          {t(E, "Pick N. Watch the sequence climb and crash to 1.",
                "N 을 골라봐. 수열이 오르내리며 1 까지 떨어지는 걸 확인.")}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
          N = <span style={{ color: A, fontSize: 16 }}>{n}</span>
        </label>
        <input
          type="range" min={1} max={50} value={n}
          onChange={(e) => setN(parseInt(e.target.value, 10))}
          style={{ flex: 1, minWidth: 140, accentColor: A }}
        />
        <input
          type="number" min={1} max={50} value={n}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v) && v >= 1 && v <= 50) setN(v);
          }}
          style={{
            width: 60, padding: "4px 6px", fontSize: 13, fontWeight: 700,
            border: `1.5px solid ${A}`, borderRadius: 6, color: A, textAlign: "center",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        <button onClick={handlePlay} style={btn(A, true)}>
          {playing ? "⏸ " + t(E, "Pause", "일시정지") : "▶ " + t(E, "Play", "재생")}
        </button>
        <button onClick={handleStep} style={btn(A, false)} disabled={idx >= traj.length - 1}>
          {t(E, "Step", "한 단계")}
        </button>
        <button onClick={handleReset} style={btn(A, false)}>
          {t(E, "Reset", "리셋")}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
        <Stat label={t(E, "Step", "단계")} value={idx} color={A} />
        <Stat label={t(E, "Current", "현재")} value={traj[idx]} color="#0d9488" />
        <Stat label={t(E, "Max so far", "최댓값")} value={maxVal} color="#ea580c" />
      </div>

      {/* Bar chart */}
      <div style={{
        background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "12px 10px", minHeight: 160,
      }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 130, overflowX: "auto" }}>
          {traj.map((v, i) => {
            const isPast = i <= idx;
            const isCur = i === idx;
            const h = Math.max(4, (v / peak) * 120);
            return (
              <div key={i} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                minWidth: 22, opacity: isPast ? 1 : 0.18,
                transition: "opacity 0.25s",
              }}>
                <div style={{
                  fontSize: 9, fontWeight: 700, color: isCur ? A : C.dim,
                  marginBottom: 2,
                }}>{v}</div>
                <div style={{
                  width: 18, height: h,
                  background: isCur ? A : isPast ? "#6ee7b7" : "#cbd5e1",
                  borderRadius: "3px 3px 0 0",
                  transition: "height 0.3s, background 0.2s",
                  boxShadow: isCur ? `0 0 8px ${A}` : "none",
                }} />
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center" }}>
          {t(E, "Total steps to reach 1: ", "1 까지 총 단계: ")}
          <b style={{ color: A }}>{traj.length - 1}</b>
          {" · "}
          <span>{stepLabel}</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{
      background: "#fff", border: `1.5px solid ${color}`, borderRadius: 8,
      padding: "6px 8px", textAlign: "center",
    }}>
      <div style={{ fontSize: 10, color, fontWeight: 700, letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>{value}</div>
    </div>
  );
}

function btn(accent, primary) {
  return {
    background: primary ? accent : "#fff",
    color: primary ? "#fff" : accent,
    border: `1.5px solid ${accent}`,
    borderRadius: 8,
    padding: "5px 12px",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
  };
}

const FULL_PY = [
  "N = int(input())",
  "",
  "steps = 0",
  "while N != 1:",
  "    if N % 2 == 0:",
  "        N = N // 2",
  "    else:",
  "        N = 3 * N + 1",
  "    steps += 1",
  "",
  "print(steps)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    long long N; cin >> N;",
  "    long long steps = 0;",
  "    while (N != 1) {",
  "        if (N % 2 == 0) N /= 2;",
  "        else N = 3 * N + 1;",
  "        steps++;",
  "    }",
  "    cout << steps << \"\n\";",
  "    return 0;",
  "}",
];

export function getCollatzSections(E) {
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

export function CollatzProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
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


export function downloadCollatzPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Collatz — Full Study Guide", "Collatz — 종합 풀이 노트");
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

