import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#7c5cfc";

/* ─────────────────────────────────────────────────────────────
   InfectionSim — pick initial sources, watch the wave spread.
   Eye-evident proof: one connected run of 1s = exactly 1 source.
   ───────────────────────────────────────────────────────────── */
export function InfectionSim({ E }) {
  const N = 9;
  const [sources, setSources] = useState(() => Array(N).fill(false));
  const [day, setDay] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  // Compute infection state at given day
  const stateAt = (d) => {
    const out = sources.slice();
    for (let step = 0; step < d; step++) {
      const next = out.slice();
      for (let i = 0; i < N; i++) {
        if (out[i]) { if (i > 0) next[i - 1] = true; if (i + 1 < N) next[i + 1] = true; }
      }
      for (let i = 0; i < N; i++) out[i] = next[i];
    }
    return out;
  };

  const cur = stateAt(day);
  const sourceCount = sources.filter(Boolean).length;
  const sickCount = cur.filter(Boolean).length;
  const maxDay = N; // enough nights to cover any spread

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(() => {
      setDay((d) => {
        if (d >= maxDay) { setPlaying(false); return d; }
        return d + 1;
      });
    }, 700);
    return () => clearTimeout(timerRef.current);
  }, [playing, day, maxDay]);

  const reset = () => { setDay(0); setPlaying(false); };
  const toggleSource = (i) => {
    if (day !== 0) return; // only when at day 0
    const u = sources.slice(); u[i] = !u[i]; setSources(u); setPlaying(false);
  };
  const stepOnce = () => { if (day < maxDay) { setDay(day + 1); setPlaying(false); } };

  // Suggest two presets — eye-evident lessons
  const setPreset = (which) => {
    const u = Array(N).fill(false);
    if (which === "one") u[4] = true;                          // 1 source middle
    if (which === "split") { u[1] = true; u[6] = true; }       // 2 sources, gap
    setSources(u); setDay(0); setPlaying(false);
  };

  return (
    <div style={{ background: "#fff", border: `1.5px solid ${A}`, borderRadius: 12, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: A }}>
          🦠 {t(E, "Spread Simulator", "감염 시뮬레이터")}
        </div>
        <div style={{ fontSize: 11, color: C.dim }}>
          {t(E, "Click cows to mark Day 0 sources, then play.", "소를 눌러 0일차 감염 표시 후 재생.")}
        </div>
      </div>

      {/* Row of cows */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {cur.map((sick, i) => {
          const isSource = sources[i];
          const justInfected = sick && !isSource && day > 0 && !stateAt(day - 1)[i];
          return (
            <button
              key={i}
              onClick={() => toggleSource(i)}
              disabled={day !== 0}
              style={{
                width: 44, height: 52,
                borderRadius: 10,
                border: isSource ? "2.5px solid #dc2626" : sick ? "2px solid #f59e0b" : `1.5px solid ${C.border}`,
                background: isSource ? "#fee2e2" : sick ? "#fef3c7" : "#f8fafc",
                color: sick ? "#991b1b" : C.text,
                fontSize: 22,
                cursor: day === 0 ? "pointer" : "default",
                transition: "all 0.4s",
                transform: justInfected ? "scale(1.15)" : "scale(1)",
                position: "relative",
              }}
              title={isSource ? t(E, "Day 0 source", "0일차 감염원") : ""}
            >
              {sick ? "🐮" : "🐄"}
              <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, fontSize: 9, color: C.dim }}>{i}</div>
            </button>
          );
        })}
      </div>

      {/* Final state string */}
      <div style={{ textAlign: "center", fontFamily: "monospace", fontSize: 14, marginBottom: 10, color: C.text }}>
        {t(E, "State", "상태")}: <b style={{ color: A }}>"{cur.map(b => b ? "1" : "0").join("")}"</b>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", justifyContent: "space-around", gap: 8, marginBottom: 10, fontSize: 12 }}>
        <div style={{ background: "#fee2e2", padding: "4px 10px", borderRadius: 6, color: "#991b1b" }}>
          {t(E, "Day 0 sources", "0일차 감염")}: <b>{sourceCount}</b>
        </div>
        <div style={{ background: "#dbeafe", padding: "4px 10px", borderRadius: 6, color: "#1e40af" }}>
          {t(E, "Night", "밤")}: <b>{day}</b>
        </div>
        <div style={{ background: "#fef3c7", padding: "4px 10px", borderRadius: 6, color: "#92400e" }}>
          {t(E, "Sick now", "현재 감염")}: <b>{sickCount}</b>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => setPlaying(p => !p)} disabled={sourceCount === 0 || day >= maxDay}
          style={{ background: A, color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: sourceCount === 0 || day >= maxDay ? 0.4 : 1 }}>
          {playing ? `⏸ ${t(E, "Pause", "일시정지")}` : `▶ ${t(E, "Play", "재생")}`}
        </button>
        <button onClick={stepOnce} disabled={sourceCount === 0 || day >= maxDay}
          style={{ background: "#fff", color: A, border: `1.5px solid ${A}`, borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer", opacity: sourceCount === 0 || day >= maxDay ? 0.4 : 1 }}>
          ⏭ {t(E, "Step", "한 밤")}
        </button>
        <button onClick={reset}
          style={{ background: "#fff", color: C.dim, border: `1.5px solid ${C.border}`, borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          ↺ {t(E, "Reset", "리셋")}
        </button>
        <button onClick={() => setPreset("one")}
          style={{ background: "#f5f3ff", color: A, border: `1px dashed ${A}`, borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer" }}>
          {t(E, "Preset: 1 in middle", "예: 가운데 1개")}
        </button>
        <button onClick={() => setPreset("split")}
          style={{ background: "#f5f3ff", color: A, border: `1px dashed ${A}`, borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer" }}>
          {t(E, "Preset: 2 with gap", "예: 떨어진 2개")}
        </button>
      </div>

      {/* Insight callout */}
      {day > 0 && sourceCount > 0 && (
        <div style={{ marginTop: 10, padding: "8px 12px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, fontSize: 12, color: "#15803d" }}>
          💡 {t(E,
            `${sourceCount} source(s) → ${countRuns(cur)} connected run(s) of 1s. Each run = 1 source needed.`,
            `${sourceCount}개 감염원 → 1이 이어진 덩어리 ${countRuns(cur)}개. 덩어리 1개 = 감염원 1마리면 충분.`)}
        </div>
      )}
    </div>
  );
}

function countRuns(arr) {
  let n = 0, prev = false;
  for (const v of arr) { if (v && !prev) n++; prev = v; }
  return n;
}

/* ─────────────────────────────────────────────────────────────
   RunsViz — given a final-state string, highlight each run of 1s.
   Eye-evident: counting groups = the answer.
   ───────────────────────────────────────────────────────────── */
export function RunsViz({ E, str = "01110110" }) {
  const chars = str.split("");
  // Assign group id per run of 1s
  const groupColors = ["#7c5cfc", "#0d9488", "#dc2626", "#ea580c", "#2563eb"];
  let g = -1; let prev = "0";
  const groupOf = chars.map((c) => {
    if (c === "1" && prev !== "1") g++;
    prev = c;
    return c === "1" ? g : -1;
  });
  const numGroups = g + 1;

  return (
    <div style={{ background: "#fff", border: `1.5px solid ${A}`, borderRadius: 12, padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: A, marginBottom: 8 }}>
        🔍 {t(E, "Count the groups", "덩어리 세기")}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 10, flexWrap: "wrap" }}>
        {chars.map((c, i) => {
          const gi = groupOf[i];
          const color = gi >= 0 ? groupColors[gi % groupColors.length] : "#94a3b8";
          return (
            <div key={i} style={{
              width: 36, height: 44,
              borderRadius: 8,
              border: `2px solid ${gi >= 0 ? color : C.border}`,
              background: gi >= 0 ? `${color}15` : "#f8fafc",
              color: gi >= 0 ? color : C.dim,
              fontFamily: "monospace", fontWeight: 800, fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              {c}
              {gi >= 0 && (
                <div style={{ position: "absolute", top: -8, left: 0, right: 0, fontSize: 9, color, fontWeight: 700 }}>
                  G{gi + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: C.text }}>
        {t(E, "Groups of 1s", "1 덩어리 수")}: <b style={{ color: A, fontSize: 18 }}>{numGroups}</b>
        <span style={{ color: C.dim, fontSize: 11, marginLeft: 8 }}>
          {t(E, "← the answer", "← 정답")}
        </span>
      </div>
      <div style={{ marginTop: 8, padding: "6px 10px", background: "#f5f3ff", borderRadius: 6, fontSize: 11, color: "#5b21b6", textAlign: "center" }}>
        {t(E, "Each '0' breaks the chain. Count the colored groups.",
            "0 이 사슬을 끊어요. 색칠된 덩어리를 세요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "s = input()",
  "",
  "count = 0",
  "i = 0",
  "while i < N:",
  "    if s[i] == '1':",
  "        count += 1",
  "        while i < N and s[i] == '1':",
  "            i += 1",
  "    else:",
  "        i += 1",
  "",
  "print(count)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    string s;",
  "    cin >> s;",
  "    int count = 0;",
  "    int i = 0;",
  "    while (i < N) {",
  "        if (s[i] == '1') {",
  "            count++;",
  "            while (i < N && s[i] == '1') i++;",
  "        } else {",
  "            i++;",
  "        }",
  "    }",
  "    cout << count << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCowntactSections(E) {
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
        t(E, "Split #include into specific headers (iostream, string).",
            "#include 는 배운 헤더들로 (iostream, string) 나눠 적어."),
        t(E, "Inner while skips one whole run of 1s — outer while moves past one block at a time.",
            "안쪽 while 이 1 의 연속을 한꺼번에 건너뜀 — 바깥 while 은 한 블록씩 진행."),
      ],
    },
  ];
}

export function CowntactProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#7c5cfc" />;
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


export function downloadCowntactPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Cowntact — Full Study Guide", "Cowntact — 종합 풀이 노트");
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

