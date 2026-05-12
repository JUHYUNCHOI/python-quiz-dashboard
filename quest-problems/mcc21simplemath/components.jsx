import { useState, useRef, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

const FULL_PY = [
  "N, P = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "if P == 1:",
  "    # Sum with addition",
  "    ans = sum(a)",
  "elif P == 2:",
  "    # Product",
  "    ans = 1",
  "    for x in a:",
  "        ans *= x",
  "elif P == 3:",
  "    # Sequential floor division",
  "    ans = a[0]",
  "    for i in range(1, N):",
  "        ans = ans // a[i]",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, P; cin >> N >> P;",
  "    vector<int> a; { int _x; while (cin >> _x) a.push_back(_x); if (!cin) cin.clear(); } // adapt: read N values",
  "",
  "    if (P == 1) {",
  "        // Sum with addition",
  "        auto ans = sum(a);",
  "    else if (P == 2) {",
  "        // Product",
  "        auto ans = 1;",
  "        // for x in a:",
  "            ans *= x;",
  "    else if (P == 3) {",
  "        // Sequential floor division",
  "        auto ans = a[0];",
  "        for (int i = 1; i < N; i++) {",
  "            auto ans = ans // a[i];",
  "",
  "    cout << ans << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc21SimpleMathSections(E) {
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
        t(E, "Split #include into specific headers you've learned (iostream, vector, string).",
            "#include 는 배운 헤더들로 (iostream, vector, string) 나눠 적어."),
        t(E, "Use int for sums and indices — only switch to a bigger type when sums exceed ~2×10^9.",
            "합계·인덱스는 int 로 충분 — 2×10^9 넘는 큰 합계만 더 큰 타입 고려."),
      ],
    },
  ];
}

export function Mcc21SimpleMathProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


/* ═══════════════════════════════════════════════════════════════
   Mcc21SimpleMathOpSim — Pick P (1/2/3) and watch the operation
   roll left-to-right across A. Live running value + step trail.
   ═══════════════════════════════════════════════════════════════ */
export function Mcc21SimpleMathOpSim({ E }) {
  const [arrText, setArrText] = useState("8 4 2");
  const [P, setP] = useState(1);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);     // 0 .. arr.length (0 = before start)
  const [trail, setTrail] = useState([]);  // [{idx, before, op, val, after}]
  const alive = useRef(false);

  const parseArr = () => {
    const parts = arrText.trim().split(/\s+/).map(Number);
    if (parts.some(isNaN) || parts.length === 0) return null;
    if (P === 3 && parts.slice(1).some(v => v === 0)) return null; // floor-div by 0
    return parts;
  };
  const arr = parseArr();
  const valid = arr !== null;

  const opSymbol = P === 1 ? "+" : P === 2 ? "×" : "//";
  const opLabel = P === 1
    ? t(E, "Sum (P=1)", "합 (P=1)")
    : P === 2
      ? t(E, "Product (P=2)", "곱 (P=2)")
      : t(E, "Floor-div (P=3)", "정수 나눗셈 (P=3)");

  const initial = (a) => P === 1 ? 0 : P === 2 ? 1 : a[0];
  const apply = (acc, v) => P === 1 ? acc + v : P === 2 ? acc * v : Math.trunc(acc / v);

  const reset = () => { alive.current = false; setRunning(false); setStep(0); setTrail([]); };

  useEffect(() => { reset(); /* eslint-disable-next-line */ }, [arrText, P]);

  const run = () => {
    if (!valid) return;
    alive.current = true;
    setRunning(true);
    setTrail([]);
    // For P=3 we start from a[0], so first "applied" index is 1.
    const startIdx = P === 3 ? 1 : 0;
    let acc = initial(arr);
    setStep(P === 3 ? 1 : 0);
    let i = startIdx;
    const localTrail = [];
    const tick = () => {
      if (!alive.current) { setRunning(false); return; }
      if (i >= arr.length) { setRunning(false); return; }
      const before = acc;
      const v = arr[i];
      acc = apply(acc, v);
      localTrail.push({ idx: i, before, op: opSymbol, val: v, after: acc });
      setTrail([...localTrail]);
      setStep(i + 1);
      i++;
      setTimeout(tick, 650);
    };
    setTimeout(tick, 400);
  };
  const stop = () => { alive.current = false; setRunning(false); };

  const finalValue = trail.length > 0 ? trail[trail.length - 1].after : (valid ? initial(arr) : null);
  const done = !running && trail.length > 0 && step >= (arr ? arr.length : 0);

  return (
    <div style={{ padding: 14 }}>
      {/* Inputs row */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
        <div>
          <label style={{ fontSize: 11, color: C.dim, fontWeight: 700, display: "block", marginBottom: 4 }}>
            {t(E, "Array A (space-separated)", "배열 A (공백으로 구분)")}
          </label>
          <input
            value={arrText}
            onChange={e => setArrText(e.target.value)}
            disabled={running}
            placeholder="8 4 2"
            style={{
              width: "100%", padding: "8px 10px", borderRadius: 8,
              border: `1px solid ${C.border}`, fontSize: 14,
              fontFamily: "'JetBrains Mono',monospace", color: A,
              boxSizing: "border-box",
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, color: C.dim, fontWeight: 700, display: "block", marginBottom: 4 }}>
            {t(E, "Pick operation P", "연산 P 선택")}
          </label>
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3].map(p => (
              <button
                key={p}
                onClick={() => setP(p)}
                disabled={running}
                style={{
                  flex: 1, padding: "8px 0", borderRadius: 8,
                  border: P === p ? `2px solid ${A}` : `1px solid ${C.border}`,
                  background: P === p ? "#fff7ed" : "#fff",
                  color: P === p ? "#9a3412" : C.text,
                  fontSize: 12, fontWeight: 700, cursor: running ? "not-allowed" : "pointer",
                }}
              >
                {p === 1 ? t(E, `P=1 (+)`, `P=1 (+)`) : p === 2 ? t(E, `P=2 (×)`, `P=2 (×)`) : t(E, `P=3 (//)`, `P=3 (//)`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Run / Stop / Reset */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <button
          onClick={running ? stop : run}
          disabled={!valid}
          style={{
            flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
            cursor: valid ? "pointer" : "not-allowed",
            fontSize: 14, fontWeight: 700,
            background: !valid ? "#cbd5e1" : running ? "#dc2626" : A, color: "#fff",
          }}
        >
          {running ? t(E, "⏹ Stop", "⏹ 중지") : t(E, "▶ Run", "▶ 실행")}
        </button>
        <button
          onClick={reset}
          disabled={running}
          style={{
            padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${A}`,
            background: "#fff", color: A, fontSize: 13, fontWeight: 700,
            cursor: running ? "not-allowed" : "pointer",
          }}
        >
          {t(E, "↺ Reset", "↺ 초기화")}
        </button>
      </div>

      {!valid && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#b91c1c", marginBottom: 10 }}>
          {P === 3
            ? t(E, "Numbers only — and no zeros after the first (P=3 divides).", "숫자만 입력 — 그리고 첫 값 이후 0 금지 (P=3 은 나눗셈).")
            : t(E, "Numbers only, separated by spaces.", "공백으로 구분된 숫자만 입력.")}
        </div>
      )}

      {/* Array visualization */}
      {valid && (
        <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 8 }}>
            {opLabel} — {t(E, "left-to-right walk", "왼쪽→오른쪽 진행")}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
            {arr.map((v, i) => {
              const consumed = i < step;
              const cursor = i === step && running;
              return (
                <div key={i} style={{
                  minWidth: 36, padding: "8px 10px", borderRadius: 8,
                  border: cursor ? `2px solid ${A}` : `1px solid ${consumed ? "#fdba74" : C.border}`,
                  background: consumed ? "#fed7aa" : cursor ? "#fff" : "#fff",
                  color: consumed ? "#9a3412" : C.text,
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700,
                  textAlign: "center",
                  boxShadow: cursor ? `0 0 0 3px ${A}33` : "none",
                  transition: "all 200ms",
                }}>
                  {v}
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 12, color: C.dim }}>
            {t(E, "Running value: ", "현재 값: ")}
            <span style={{ color: A, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace" }}>
              {finalValue ?? "—"}
            </span>
          </div>
        </div>
      )}

      {/* Trail */}
      {trail.length > 0 && (
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6 }}>
            {t(E, "Step trail:", "단계 기록:")}
          </div>
          {trail.map((s, i) => (
            <div key={i} style={{
              fontSize: 13, fontFamily: "'JetBrains Mono',monospace",
              color: A, fontWeight: 600, lineHeight: 1.7,
            }}>
              {`step ${i + 1}: ${s.before} ${s.op} ${s.val} = ${s.after}`}
            </div>
          ))}
          {done && (
            <div style={{ marginTop: 6, fontSize: 12, color: "#15803d", fontWeight: 700 }}>
              {t(E, `✅ Final answer: ${finalValue}`, `✅ 최종 답: ${finalValue}`)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function downloadMcc21SimpleMathPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21SimpleMath — Full Study Guide", "Mcc21SimpleMath — 종합 풀이 노트");
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

