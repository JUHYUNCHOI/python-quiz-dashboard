import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";
const KA = { wordBreak: "keep-all" };

/* ============================================================
   Mcc22GrammarSim — the grammar is FIXED (given in the problem,
   not read from input). Pick a sentence and step through it one
   WORD at a time. Each new word can fail two ways:
     ① it is not one of the 5 valid words  (unknown word)
     ② there is no arrow from the previous word to it  (no edge)
   The verdict turns YES only when every word survives both checks.
   ============================================================ */

// The fixed grammar: adj[x] = the words allowed right after x.
const _ADJ = {
  WE:   ["DONT", "KNOW"],
  THEY: ["DONT", "KNOW"],
  DONT: ["KNOW"],
  KNOW: ["WE", "THEY", "THAT"],
  THAT: ["WE", "THEY"],
};
const _EDGES = [];
for (const u of Object.keys(_ADJ)) for (const v of _ADJ[u]) _EDGES.push([u, v]);
const _EDGE_SET = new Set(_EDGES.map(([a, b]) => `${a}|${b}`));
const _KNOWN = new Set(Object.keys(_ADJ));

// The four official sample sentences.
const _SENTENCES = [
  ["WE", "KNOW"],
  ["THEY", "KNOW", "WE", "DONT", "KNOW"],
  ["WE", "THEY"],
  ["I", "KNEW", "THAT", "THEY", "KNOW"],
];

// Node layout for the 5 words.
const _POS = {
  WE:   { cx: 55,  cy: 45 },
  THEY: { cx: 55,  cy: 150 },
  DONT: { cx: 200, cy: 45 },
  KNOW: { cx: 200, cy: 150 },
  THAT: { cx: 345, cy: 98 },
};
const _SVG_W = 400, _SVG_H = 200;

// Find the first word that breaks the sentence, and why.
function _analyze(words) {
  for (let i = 0; i < words.length; i++) {
    if (!_KNOWN.has(words[i])) return { bad: i, kind: "unknown" };
    if (i > 0 && !_EDGE_SET.has(`${words[i - 1]}|${words[i]}`)) return { bad: i, kind: "noedge" };
  }
  return { bad: -1, kind: null };
}

// Geometry for one directed edge, nudged to the perpendicular so that
// two opposite arrows (WE↔KNOW, THEY↔KNOW) don't overlap.
function _edgeGeom(u, v) {
  const a = _POS[u], b = _POS[v];
  const dx = b.cx - a.cx, dy = b.cy - a.cy;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const px = -uy, py = ux;         // perpendicular (left of travel)
  const off = 7;
  const ox = ux * 28, oy = uy * 15;
  return {
    x1: a.cx + ox + px * off, y1: a.cy + oy + py * off,
    x2: b.cx - ox + px * off, y2: b.cy - oy + py * off,
  };
}

export function Mcc22GrammarSim({ E }) {
  const [sIdx, setSIdx] = useState(0);
  const [step, setStep] = useState(0);

  const sentence = _SENTENCES[sIdx];
  const n = sentence.length;
  const checked = Math.min(step, n);   // how many words examined
  const doneAll = checked >= n;

  const { bad, kind } = useMemo(() => _analyze(sentence), [sIdx, sentence]);

  const pick = (i) => { setSIdx(i); setStep(0); };
  const stepNext = () => setStep(s => Math.min(s + 1, n));
  const stepReset = () => setStep(0);

  // Which word is under the spotlight right now?
  const curIdx = doneAll && bad !== -1 ? bad : checked - 1;   // last examined, or the failure
  const fromW = curIdx > 0 ? sentence[curIdx - 1] : null;
  const toW   = curIdx >= 0 ? sentence[curIdx] : null;
  const edgeKey = fromW && toW ? `${fromW}|${toW}` : null;
  const edgeExists = edgeKey ? _EDGE_SET.has(edgeKey) : false;
  const toKnown = toW ? _KNOWN.has(toW) : true;

  const isValid = bad === -1;
  const verdict = !doneAll
    ? t(E, "checking…", "확인 중…")
    : isValid
      ? "YES"
      : "NO";

  const reason = (doneAll && !isValid)
    ? (kind === "unknown"
        ? t(E, `"${sentence[bad]}" is not one of the 5 grammar words`, `"${sentence[bad]}" 는 문법의 5개 단어에 없어요`)
        : t(E, `no arrow ${sentence[bad - 1]} → ${sentence[bad]} in the grammar`, `문법에 ${sentence[bad - 1]} → ${sentence[bad]} 화살표가 없어요`))
    : null;

  return (
    <div style={{ padding: 14 }}>
      {/* Two-failure-mode bubble */}
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 12, ...KA }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", marginBottom: 8, textAlign: "center" }}>
          {t(E, "🔎 Pick a sentence — check it one word at a time", "🔎 문장을 골라 — 한 단어씩 확인해요")}
        </div>
        <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 10 }}>
          {t(E,
            "The grammar is fixed (below) — the 5 words and the arrows never change. A sentence is YES only if every word survives two checks: ",
            "문법은 아래로 고정돼 있어요 — 5개 단어와 화살표는 변하지 않아요. 문장이 YES 이려면 모든 단어가 두 가지 검사를 통과해야 해요: ")}
          <b style={{ color: "#dc2626" }}>①</b> {t(E, "the word is one of the 5", "5개 단어 중 하나")}
          {t(E, ", ", ", ")}
          <b style={{ color: "#dc2626" }}>②</b> {t(E, "there is an arrow from the word before it", "바로 앞 단어에서 오는 화살표가 있음")}
          {t(E, ".", ".")}
        </div>

        {/* Sentence pickers */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
          {_SENTENCES.map((s, i) => (
            <button key={i} onClick={() => pick(i)} style={{
              background: i === sIdx ? A : "#fff",
              color: i === sIdx ? "#fff" : A,
              border: `1.5px solid ${A}`,
              borderRadius: 8, padding: "4px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {s.join(" ")}
            </button>
          ))}
        </div>

        {/* SVG grammar graph */}
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #6ee7b7", padding: 4, overflowX: "auto" }}>
          <svg width={_SVG_W} height={_SVG_H} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }}>
            <defs>
              <marker id="arr-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
              </marker>
              <marker id="arr-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={A} />
              </marker>
              <marker id="arr-bad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
              </marker>
            </defs>

            {/* Fixed grammar edges */}
            {_EDGES.map(([u, v]) => {
              const g = _edgeGeom(u, v);
              const isActive = edgeKey === `${u}|${v}`;
              const stroke = isActive ? A : "#cbd5e1";
              const marker = isActive ? "arr-ok" : "arr-dim";
              const sw = isActive ? 3 : 1.2;
              return (
                <line key={`${u}-${v}`}
                  x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2}
                  stroke={stroke} strokeWidth={sw}
                  markerEnd={`url(#${marker})`} />
              );
            })}

            {/* No-edge attempt: both words are known but no arrow exists → dashed red */}
            {edgeKey && !edgeExists && fromW && toW && _POS[fromW] && _POS[toW] && (() => {
              const g = _edgeGeom(fromW, toW);
              return (
                <line
                  x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2}
                  stroke="#dc2626" strokeWidth={2.5} strokeDasharray="5,4"
                  markerEnd="url(#arr-bad)" />
              );
            })()}

            {/* Nodes */}
            {Object.keys(_ADJ).map(w => {
              const p = _POS[w];
              const isFrom = edgeKey && fromW === w;
              const isTo   = toKnown && toW === w;
              const fill = isFrom ? "#7c3aed" : isTo ? "#0891b2" : "#fff";
              const stroke = isFrom ? "#7c3aed" : isTo ? "#0891b2" : A;
              const textColor = isFrom || isTo ? "#fff" : "#065f46";
              return (
                <g key={w}>
                  <rect x={p.cx - 28} y={p.cy - 15} width={56} height={30} rx={8}
                    fill={fill} stroke={stroke} strokeWidth={2} />
                  <text x={p.cx} y={p.cy + 4} textAnchor="middle"
                    style={{ fontSize: 11, fontWeight: 800, fill: textColor, fontFamily: "system-ui, sans-serif" }}>
                    {w}
                  </text>
                </g>
              );
            })}

            {/* Unknown word floating near the graph */}
            {toW && !toKnown && (
              <g>
                <rect x={_SVG_W / 2 - 42} y={_SVG_H - 30} width={84} height={24} rx={7}
                  fill="#dc2626" stroke="#dc2626" strokeWidth={2} />
                <text x={_SVG_W / 2} y={_SVG_H - 13} textAnchor="middle"
                  style={{ fontSize: 11, fontWeight: 800, fill: "#fff", fontFamily: "system-ui, sans-serif" }}>
                  {toW} ?
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 6, flexWrap: "wrap", fontSize: 11, color: "#065f46" }}>
          <span><b style={{ color: "#7c3aed" }}>■</b> {t(E, "prev word", "앞 단어")}</span>
          <span><b style={{ color: "#0891b2" }}>■</b> {t(E, "this word", "이 단어")}</span>
          <span><b style={{ color: A }}>→</b> {t(E, "arrow exists", "화살표 있음")}</span>
          <span><b style={{ color: "#dc2626" }}>⇢</b> {t(E, "no arrow / unknown word", "화살표 없음 / 없는 단어")}</span>
        </div>
      </div>

      {/* Sentence with per-word status */}
      <div style={{
        background: "#fff", border: `1.5px solid ${A}`, borderRadius: 12, padding: "10px 14px", marginBottom: 10,
        textAlign: "center", fontFamily: "'JetBrains Mono', monospace",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 6 }}>
          {t(E, "Sentence", "문장")} · {checked} / {n} {t(E, "words checked", "단어 확인됨")}
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: A, lineHeight: 1.7 }}>
          {sentence.map((w, i) => {
            const seen = i < checked;
            const isFailWord = doneAll && bad === i;
            const afterFail = doneAll && bad !== -1 && i > bad;
            const isSpotlight = !doneAll && i === checked - 1;
            let color = "#cbd5e1";               // not yet checked
            if (seen && !doneAll) color = isSpotlight ? "#7c3aed" : A;
            if (doneAll) color = bad === -1 ? A : (i < bad ? A : isFailWord ? "#dc2626" : "#94a3b8");
            return (
              <span key={i}>
                <span style={{ color, textDecoration: isFailWord || afterFail ? "line-through" : "none" }}>{w}</span>
                {i < n - 1 && (() => {
                  const bothKnown = _KNOWN.has(sentence[i]) && _KNOWN.has(sentence[i + 1]);
                  const ok = bothKnown && _EDGE_SET.has(`${sentence[i]}|${sentence[i + 1]}`);
                  const pairDone = i + 1 < checked || (doneAll);
                  const sym = !pairDone ? "·" : ok ? "→" : "✗";
                  const c = !pairDone ? "#cbd5e1" : ok ? A : "#dc2626";
                  return <span style={{ color: c, margin: "0 6px" }}>{sym}</span>;
                })()}
              </span>
            );
          })}
        </div>
      </div>

      {/* Step controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
        <button onClick={stepReset} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`,
          borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>
          ⟲ {t(E, "Reset", "처음")}
        </button>
        <button onClick={stepNext} disabled={doneAll} style={{
          background: doneAll ? "#d1d5db" : A,
          color: "#fff",
          border: `1.5px solid ${doneAll ? "#d1d5db" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 800,
          cursor: doneAll ? "not-allowed" : "pointer",
        }}>
          {t(E, "Check next word ▶", "다음 단어 확인 ▶")}
        </button>
      </div>

      {/* Verdict card */}
      <div style={{
        background: "#fff", border: `2px solid ${doneAll ? (isValid ? A : "#dc2626") : "#cbd5e1"}`,
        borderRadius: 12, padding: "12px 14px", textAlign: "center", ...KA,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 6 }}>
          🎯 {t(E, "Verdict", "판정")}
        </div>
        <div style={{
          fontSize: 18, fontWeight: 800,
          color: doneAll ? (isValid ? A : "#dc2626") : C.dim,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {verdict}
        </div>
        {reason && (
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6 }}>
            {reason}
          </div>
        )}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "",
  "# The grammar is FIXED — it is given in the problem, NOT read from input.",
  "# adj[x] = the set of words allowed right after x.",
  "adj = {",
  "    'WE':   {'DONT', 'KNOW'},",
  "    'THEY': {'DONT', 'KNOW'},",
  "    'DONT': {'KNOW'},",
  "    'KNOW': {'WE', 'THEY', 'THAT'},",
  "    'THAT': {'WE', 'THEY'},",
  "}",
  "",
  "data = sys.stdin.read().split('\\n')",
  "idx = 0",
  "T = int(data[idx]); idx += 1",
  "out = []",
  "for _ in range(T):",
  "    n = int(data[idx]); idx += 1",
  "    words = data[idx].split(); idx += 1",
  "",
  "    ok = True",
  "    # check ①: every word must be one of the 5 valid words",
  "    for w in words:",
  "        if w not in adj:",
  "            ok = False",
  "            break",
  "    # check ②: every consecutive pair must have an arrow",
  "    if ok:",
  "        for i in range(len(words) - 1):",
  "            if words[i + 1] not in adj[words[i]]:",
  "                ok = False",
  "                break",
  "",
  "    out.append('YES' if ok else 'NO')",
  "",
  "print('\\n'.join(out))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <map>",
  "#include <set>",
  "using namespace std;",
  "",
  "int main() {",
  "    // The grammar is FIXED — given in the problem, not read from input.",
  "    // adj[x] = the words allowed right after x.",
  "    map<string, set<string>> adj;",
  "    adj[\"WE\"]   = {\"DONT\", \"KNOW\"};",
  "    adj[\"THEY\"] = {\"DONT\", \"KNOW\"};",
  "    adj[\"DONT\"] = {\"KNOW\"};",
  "    adj[\"KNOW\"] = {\"WE\", \"THEY\", \"THAT\"};",
  "    adj[\"THAT\"] = {\"WE\", \"THEY\"};",
  "",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int n;",
  "        cin >> n;",
  "        vector<string> words(n);",
  "        for (int i = 0; i < n; i++) cin >> words[i];",
  "",
  "        bool ok = true;",
  "        // check ①: every word must be one of the 5 valid words",
  "        for (int i = 0; i < n && ok; i++)",
  "            if (adj.find(words[i]) == adj.end()) ok = false;",
  "        // check ②: every consecutive pair must have an arrow",
  "        for (int i = 0; i + 1 < n && ok; i++)",
  "            if (adj[words[i]].count(words[i + 1]) == 0) ok = false;",
  "",
  "        cout << (ok ? \"YES\" : \"NO\") << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getMcc22GrammarSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "The grammar never changes, so we hard-code adj[x] = the set of words allowed after x. Membership in a set/map is one instant lookup — no scanning a list of edges each time.",
            "문법은 변하지 않으니 adj[x] = x 다음에 올 수 있는 단어 집합 을 코드에 그대로 적어둬요. 집합/맵 조회는 한 번에 끝나요 — 매번 간선 목록을 훑을 필요가 없어요."),
        t(E, "Two failure checks: ① every word must be a key of adj (one of the 5), and ② for each neighbor pair, words[i+1] must be in adj[words[i]]. Fail either one → NO.",
            "실패 검사 두 가지: ① 모든 단어가 adj 의 키 (5개 중 하나) 여야 하고, ② 이웃한 쌍마다 words[i+1] 이 adj[words[i]] 안에 있어야 해요. 하나라도 어기면 → NO."),
        t(E, "The C++ version uses map<string,set<string>> for the same instant lookup; cin >> reads T, then n and n words per test.",
            "C++ 버전은 같은 즉시 조회를 위해 map<string,set<string>> 를 써요; cin >> 로 T 를 읽고, 테스트마다 n 과 n 개 단어를 읽어요."),
      ],
      pyOnly: [
        t(E, "'w in adj' checks the keys (the 5 words); 'words[i+1] in adj[words[i]]' checks the arrow — both are O(1) set lookups.",
            "'w in adj' 는 키 (5개 단어) 를, 'words[i+1] in adj[words[i]]' 는 화살표를 확인해요 — 둘 다 O(1) 집합 조회예요."),
      ],
      cppOnly: [
        t(E, "adj.find(w) == adj.end() means the word is not a key — an unknown word (check ①).",
            "adj.find(w) == adj.end() 는 그 단어가 키에 없다는 뜻 — 없는 단어예요 (검사 ①)."),
        t(E, "adj[words[i]].count(words[i+1]) == 0 means there is no arrow between the pair (check ②).",
            "adj[words[i]].count(words[i+1]) == 0 은 그 쌍 사이에 화살표가 없다는 뜻이에요 (검사 ②)."),
      ],
    },
  ];
}

export function Mcc22GrammarProgressiveCode(props) {
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


export function downloadMcc22GrammarPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22Grammar — Full Study Guide", "Mcc22Grammar — 종합 풀이 노트");
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
