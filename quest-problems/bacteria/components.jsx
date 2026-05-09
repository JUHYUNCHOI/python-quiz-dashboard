import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";


/* ════════════════════════════════════════════════════════════════
   BacteriaTrickSim — eye-evident "diff-of-diff" visualization
   ────────────────────────────────────────────────────────────────
   Student clicks "type-1 walk at h=k" or "type-2 walk at h=k".
   THREE rows update live: a, diff(a), diff(diff(a)).
   The bottom row (dd) changes EXACTLY ONE cell by ±1 — that's the
   whole trick.  Reset button.  No prose required to see it.
   ════════════════════════════════════════════════════════════════ */
function diffArr(arr) {
  const out = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) out[i] = i === 0 ? arr[0] : arr[i] - arr[i - 1];
  return out;
}
function applyWalk(a, h, sign) {
  // h is 1-based.  add sign*(1,2,3,...) to a[h..N]
  const out = a.slice();
  for (let i = h - 1, k = 1; i < a.length; i++, k++) out[i] += sign * k;
  return out;
}

export function BacteriaTrickSim({ E }) {
  const N = 5;
  const [a, setA] = useState([0, 0, 0, 0, 0]);
  const [highlightDd, setHighlightDd] = useState(null); // {idx, sign}
  const [history, setHistory] = useState([]);

  const d1 = diffArr(a);
  const dd = diffArr(d1);

  const doWalk = (h, sign) => {
    setA(applyWalk(a, h, sign));
    // The trick: dd at index (h-1) changes by sign.  (h must be >= 1; dd[0] also flips when h=1.)
    setHighlightDd({ idx: h - 1, sign });
    setHistory(prev => [...prev, { h, sign }].slice(-6));
    setTimeout(() => setHighlightDd(null), 1100);
  };
  const reset = () => { setA([0, 0, 0, 0, 0]); setHighlightDd(null); setHistory([]); };

  const cellBase = {
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: 14, fontWeight: 700, textAlign: "center",
    padding: "8px 0", border: "1px solid #d1d5db", background: "#fff",
    transition: "background .35s, color .35s, transform .35s",
  };
  const headStyle = { fontSize: 11, fontWeight: 700, color: "#065f46", textAlign: "right", paddingRight: 8 };

  const ddCell = (v, i) => {
    const lit = highlightDd && highlightDd.idx === i;
    const bg = lit ? (highlightDd.sign > 0 ? "#bbf7d0" : "#fecaca") : "#fff";
    const col = lit ? (highlightDd.sign > 0 ? "#15803d" : "#b91c1c") : (v === 0 ? "#9ca3af" : "#0f172a");
    return (
      <div key={i} style={{ ...cellBase, background: bg, color: col, transform: lit ? "scale(1.1)" : "scale(1)" }}>
        {v > 0 ? `+${v}` : v}
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 12, padding: 14, marginBottom: 12, textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#065f46", marginBottom: 4 }}>
          {t(E, "🔬 Try a walk — watch what changes", "🔬 워크 한 번 — 무엇이 바뀌는지 봐")}
        </div>
        <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.5 }}>
          {t(E,
            "Click a button. The top row a updates by a ramp. But look at the BOTTOM row diff(diff(a)) — only ONE cell flickers, by exactly ±1.",
            "버튼을 눌러봐. 위쪽 a 는 ramp 만큼 바뀌어. 그런데 맨 아래 diff(diff(a)) 는 — 딱 한 칸만 ±1 만큼 깜빡여.")}
        </div>
      </div>

      {/* THREE rows: a, diff, diff(diff) */}
      <div style={{ display: "grid", gridTemplateColumns: "auto repeat(5, 1fr)", gap: 4, marginBottom: 14, alignItems: "center" }}>
        <div style={headStyle}>a</div>
        {a.map((v, i) => (
          <div key={`a${i}`} style={{ ...cellBase, color: v === 0 ? "#9ca3af" : "#0f172a" }}>
            {v > 0 ? `+${v}` : v}
          </div>
        ))}
        <div style={headStyle}>diff(a)</div>
        {d1.map((v, i) => (
          <div key={`d${i}`} style={{ ...cellBase, background: "#f9fafb", color: v === 0 ? "#9ca3af" : "#374151" }}>
            {v > 0 ? `+${v}` : v}
          </div>
        ))}
        <div style={{ ...headStyle, color: "#059669" }}>{t(E, "diff(diff(a)) ⭐", "diff(diff(a)) ⭐")}</div>
        {dd.map((v, i) => ddCell(v, i))}
      </div>

      {/* Buttons: type-1 / type-2 at each h */}
      <div style={{ background: "#fff", border: "1px solid #d1fae5", borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", marginBottom: 6, textAlign: "center" }}>
          {t(E, "Type-1 walk (add ramp)", "타입 1 워크 (ramp 더하기)")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, marginBottom: 10 }}>
          {[1, 2, 3, 4, 5].map(h => (
            <button key={`p${h}`} onClick={() => doWalk(h, +1)} style={{
              background: "#16a34a", color: "#fff", border: "none", borderRadius: 8,
              padding: "6px 0", cursor: "pointer", fontSize: 11.5, fontWeight: 700,
            }}>+ h={h}</button>
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#7c2d12", marginBottom: 6, textAlign: "center" }}>
          {t(E, "Type-2 walk (subtract ramp)", "타입 2 워크 (ramp 빼기)")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
          {[1, 2, 3, 4, 5].map(h => (
            <button key={`m${h}`} onClick={() => doWalk(h, -1)} style={{
              background: "#dc2626", color: "#fff", border: "none", borderRadius: 8,
              padding: "6px 0", cursor: "pointer", fontSize: 11.5, fontWeight: 700,
            }}>− h={h}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.5, flex: 1 }}>
          {history.length === 0
            ? t(E, "No walks yet — click a button above.", "아직 워크 없음 — 위 버튼을 눌러.")
            : (
              <span>
                <b>{t(E, "Walks: ", "워크: ")}</b>
                {history.map((w, i) => (
                  <span key={i} style={{ color: w.sign > 0 ? "#15803d" : "#b91c1c", fontWeight: 700, marginRight: 6 }}>
                    {w.sign > 0 ? "+" : "−"}h{w.h}
                  </span>
                ))}
                <span style={{ color: "#065f46", fontWeight: 700, marginLeft: 4 }}>
                  ({history.length} {t(E, "ops", "회")})
                </span>
              </span>
            )}
        </div>
        <button onClick={reset} style={{
          background: "#fff", color: "#059669", border: "1.5px solid #059669",
          borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 11.5, fontWeight: 700,
        }}>↺ {t(E, "Reset", "초기화")}</button>
      </div>

      <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10, fontSize: 11.5, color: "#92400e", lineHeight: 1.6 }}>
        💡 <b>{t(E, "What you see:", "관찰:")}</b>{" "}
        {t(E,
          "One walk = one ±1 change in diff(diff(a)).  So the minimum number of walks to make diff(diff(a)) all zero (= a all zero) is the sum of |diff(diff(a))_i| for the input.",
          "워크 1 회 = diff(diff(a)) 의 ±1 변화 1 회. 그러니까 diff(diff(a)) 를 전부 0 (= a 를 전부 0) 으로 만드는 최소 횟수 = |diff(diff(a))_i| 의 합.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0])",
  "a = [int(data[1 + i]) for i in range(N)]",
  "",
  "def diff(arr):",
  "    # First-order difference: [a0, a1-a0, a2-a1, ...]",
  "    return [arr[0]] + [arr[i] - arr[i - 1] for i in range(1, len(arr))]",
  "",
  "dd = diff(diff(a))           # second-order difference",
  "ans = sum(abs(x) for x in dd)",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "using ll = long long;",
  "",
  "vector<ll> diff(const vector<ll>& a) {",
  "    vector<ll> b(a.size());",
  "    for (size_t i = 0; i < a.size(); i++) {",
  "        b[i] = a[i];",
  "        if (i > 0) b[i] -= a[i - 1];",
  "    }",
  "    return b;",
  "}",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N; cin >> N;",
  "    vector<ll> a(N);",
  "    for (auto& x : a) cin >> x;",
  "",
  "    vector<ll> dd = diff(diff(a));",
  "    ll ans = 0;",
  "    for (ll x : dd) ans += abs(x);",
  "",
  "    cout << ans << '\\n';",
  "    return 0;",
  "}",
];

export function getBacteriaSections(E) {
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

export function BacteriaProgressiveCode(props) {
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


export function downloadBacteriaPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Bacteria — Full Study Guide", "Bacteria — 종합 풀이 노트");
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

