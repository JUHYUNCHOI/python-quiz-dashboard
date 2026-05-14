// 🔒 USACO_VERIFIED — cpid=987, wordproc (2020 Jan Bronze #1)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ================================================================
   WordProcLineWrapSim — interactive: edit word lengths + K, see
   how words wrap onto numbered lines.
   ================================================================ */
const WRAP_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#ef4444", "#14b8a6"];

function packLines(lengths, K) {
  const lines = [];
  let cur = [];
  let curLen = 0;
  lengths.forEach((wl, idx) => {
    if (curLen + wl > K && cur.length > 0) {
      lines.push(cur);
      cur = [];
      curLen = 0;
    }
    cur.push({ idx, wl });
    curLen += wl;
  });
  if (cur.length > 0) lines.push(cur);
  return lines;
}

export function WordProcLineWrapSim({ E }) {
  const [lengths, setLengths] = useState([3, 3, 2, 1, 4, 3]);
  const [K, setK] = useState(6);

  const lines = packLines(lengths, K);

  const updateLen = (i, v) => {
    const n = Math.max(1, Math.min(20, parseInt(v) || 1));
    setLengths(prev => prev.map((x, j) => (j === i ? n : x)));
  };
  const addWord = () => {
    if (lengths.length >= 8) return;
    setLengths(prev => [...prev, 2]);
  };
  const removeWord = (i) => {
    if (lengths.length <= 1) return;
    setLengths(prev => prev.filter((_, j) => j !== i));
  };

  const labelStyle = { fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.4 };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: 10, marginBottom: 10, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 2 }}>
          🎮 {t(E, "Try it — Line Wrap Sim", "직접 — 줄 바꿈 시뮬")}
        </div>
        <div style={{ fontSize: 12, color: "#7f1d1d", lineHeight: 1.5 }}>
          {t(E,
            "Change word lengths and K — watch lines re-pack live.",
            "단어 길이와 K 를 바꿔봐 — 줄이 즉시 다시 묶여요.")}
        </div>
      </div>

      {/* K slider */}
      <div style={{ background: "#fff", border: "1.5px solid #fca5a5", borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={labelStyle}>K {t(E, "(max chars per line)", "(줄당 최대 글자)")}</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#dc2626", fontSize: 14 }}>{K}</span>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          value={K}
          onChange={e => setK(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: "#dc2626" }}
        />
      </div>

      {/* Word length editor */}
      <div style={{ background: "#fff", border: "1.5px solid #fca5a5", borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={labelStyle}>{t(E, "Word lengths", "단어 길이들")}</span>
          <button
            onClick={addWord}
            disabled={lengths.length >= 8}
            style={{
              background: lengths.length >= 8 ? "#fca5a5" : "#dc2626",
              color: "#fff", border: "none", borderRadius: 6,
              padding: "3px 10px", fontSize: 11, fontWeight: 800,
              cursor: lengths.length >= 8 ? "not-allowed" : "pointer",
            }}
          >
            + {t(E, "add", "추가")}
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {lengths.map((len, i) => (
            <div key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              background: `${WRAP_COLORS[i % WRAP_COLORS.length]}15`,
              border: `1.5px solid ${WRAP_COLORS[i % WRAP_COLORS.length]}`,
              borderRadius: 8, padding: "3px 6px",
            }}>
              <span style={{ fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>w{i + 1}</span>
              <input
                type="number"
                min={1}
                max={20}
                value={len}
                onChange={e => updateLen(i, e.target.value)}
                style={{
                  width: 38, border: "none", background: "transparent",
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700,
                  color: WRAP_COLORS[i % WRAP_COLORS.length], textAlign: "center", outline: "none",
                }}
              />
              <button
                onClick={() => removeWord(i)}
                disabled={lengths.length <= 1}
                title={t(E, "remove", "삭제")}
                style={{
                  background: "transparent", border: "none",
                  color: WRAP_COLORS[i % WRAP_COLORS.length],
                  cursor: lengths.length <= 1 ? "not-allowed" : "pointer",
                  fontSize: 12, fontWeight: 800, padding: "0 2px",
                  opacity: lengths.length <= 1 ? 0.4 : 1,
                }}
              >×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Result lines */}
      <div style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={labelStyle}>{t(E, "Result", "결과")}</span>
          <span style={{ fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "lines", "줄")}: <b style={{ color: "#dc2626" }}>{lines.length}</b>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {lines.map((line, li) => {
            const total = line.reduce((s, w) => s + w.wl, 0);
            return (
              <div key={li} style={{
                background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 8,
                padding: "6px 8px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.dim }}>
                    {E ? `Line ${li + 1}` : `${li + 1}줄`}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    color: total <= K ? "#059669" : "#dc2626",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}>
                    {total}/{K}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {line.map(({ idx, wl }) => (
                    <span key={idx} style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      padding: "3px 8px", borderRadius: 6,
                      background: `${WRAP_COLORS[idx % WRAP_COLORS.length]}15`,
                      border: `1px solid ${WRAP_COLORS[idx % WRAP_COLORS.length]}`,
                      color: WRAP_COLORS[idx % WRAP_COLORS.length],
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 11, fontWeight: 700,
                    }}>
                      w{idx + 1}
                      <span style={{ fontSize: 9, color: C.dim, marginLeft: 3 }}>({wl})</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('word.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N, K = map(int, lines[0].split())",
  "words = lines[1].split()",
  "",
  "# 단어 길이 합이 K 이하 (공백은 안 세는 USACO 문제)",
  "result = []",
  "cur_line = []",
  "cur_len = 0",
  "",
  "for w in words:",
  "    wl = len(w)",
  "    if cur_len + wl > K and cur_line:",
  "        result.append(' '.join(cur_line))",
  "        cur_line = []",
  "        cur_len = 0",
  "    cur_line.append(w)",
  "    cur_len += wl",
  "",
  "if cur_line:",
  "    result.append(' '.join(cur_line))",
  "",
  "with open('word.out', 'w') as file:",
  "    for line in result:",
  "        file.write(line + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <string>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"word.in\");",
  "    ofstream fout(\"word.out\");",
  "",
  "    int N, K;",
  "    fin >> N >> K;",
  "    vector<string> words(N);",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> words[i];",
  "    }",
  "    // 단어 길이 합이 K 이하 (공백은 안 세는 USACO 문제)",
  "    string cur = \"\";",
  "    int cur_len = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        int wl = words[i].size();",
  "        if (cur_len + wl > K && cur_len > 0) {",
  "            fout << cur << \"\\n\";",
  "            cur = \"\";",
  "            cur_len = 0;",
  "        }",
  "        if (cur_len > 0) cur += \" \";",
  "        cur += words[i];",
  "        cur_len += wl;",
  "    }",
  "    if (cur_len > 0) fout << cur << \"\\n\";",
  "    return 0;",
  "}",
];

export function getWordProcSections(E) {
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

export function WordProcProgressiveCode(props) {
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


export function downloadWordProcPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "WordProc — Full Study Guide", "WordProc — 종합 풀이 노트");
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

