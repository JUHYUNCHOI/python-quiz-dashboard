import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ============================================================
   MooOpsLab — eye-evident scan of candidate 'MOO' windows.
   Shown in Ch1 to ground the algorithm before code.
   Student picks i with arrows; sees window highlighted, middle
   check, left-delete + right-delete + flip cost breakdown.
   ============================================================ */
export function MooOpsLab({ E }) {
  const PRESETS = [
    { s: "MOOO", label: "MOOO" },
    { s: "MMOO", label: "MMOO" },
    { s: "OOOM", label: "OOOM" },
    { s: "MOMOO", label: "MOMOO" },
  ];
  const [pIdx, setPIdx] = useState(0);
  const s = PRESETS[pIdx].s;
  const n = s.length;
  const maxI = Math.max(0, n - 3);
  const [i, setI] = useState(0);

  // Reset i on preset change.
  const switchPreset = (idx) => {
    setPIdx(idx);
    setI(0);
  };

  const inRange = i + 2 < n;
  const c0 = inRange ? s[i] : "";
  const c1 = inRange ? s[i + 1] : "";
  const c2 = inRange ? s[i + 2] : "";
  const middleOk = c1 === "O";
  const leftDel = i;
  const rightDel = n - i - 3;
  const flipFirst = c0 !== "M" ? 1 : 0;
  const flipLast = c2 !== "O" ? 1 : 0;
  const total = middleOk ? leftDel + rightDel + flipFirst + flipLast : null;

  // Compute best across all valid i for the current string.
  let best = null;
  for (let k = 0; k + 2 < n; k++) {
    if (s[k + 1] !== "O") continue;
    const cost = k + (n - k - 3) + (s[k] !== "M" ? 1 : 0) + (s[k + 2] !== "O" ? 1 : 0);
    if (best == null || cost < best) best = cost;
  }

  const charBox = (ch, mode) => {
    const styles = {
      base: { background: "#fff", color: C.text, border: `2px solid ${C.border}` },
      window: { background: "#ecfdf5", color: "#065f46", border: `2px solid ${A}` },
      bad: { background: "#fee2e2", color: "#991b1b", border: "2px solid #dc2626" },
      del: { background: "#f1f5f9", color: "#94a3b8", border: "2px dashed #cbd5e1", textDecoration: "line-through" },
    }[mode];
    return (
      <div style={{
        width: 38, height: 44, borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, fontSize: 20, fontFamily: "JetBrains Mono, monospace",
        ...styles,
      }}>{ch}</div>
    );
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: A, marginBottom: 6 }}>
        {t(E, "🧪 Lab — Pick i (start of candidate MOO window)", "🧪 실험실 — i (후보 MOO 창 시작 위치) 선택")}
      </div>

      {/* Preset picker */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {PRESETS.map((p, idx) => (
          <button key={p.s} onClick={() => switchPreset(idx)} style={{
            padding: "4px 10px", fontSize: 12, fontWeight: 700,
            border: `1.5px solid ${pIdx === idx ? A : C.border}`,
            background: pIdx === idx ? A : "#fff",
            color: pIdx === idx ? "#fff" : C.text,
            borderRadius: 6, cursor: "pointer", fontFamily: "JetBrains Mono, monospace",
          }}>{p.label}</button>
        ))}
      </div>

      {/* String display with window */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 6, flexWrap: "wrap" }}>
        {s.split("").map((ch, k) => {
          let mode = "base";
          if (k < i) mode = "del";
          else if (k > i + 2) mode = "del";
          else if (k === i + 1) mode = middleOk ? "window" : "bad";
          else mode = "window";
          return <div key={k}>{charBox(ch, mode)}</div>;
        })}
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, fontSize: 10, color: C.dim, fontFamily: "JetBrains Mono, monospace" }}>
        {s.split("").map((_, k) => (
          <div key={k} style={{ width: 38, textAlign: "center", fontWeight: k === i ? 800 : 400, color: k === i ? A : C.dim }}>
            {k}{k === i ? "←i" : ""}
          </div>
        ))}
      </div>

      {/* i slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={{
          padding: "4px 10px", fontSize: 14, fontWeight: 800, cursor: i === 0 ? "default" : "pointer",
          border: `1.5px solid ${C.border}`, background: "#fff", color: A, borderRadius: 6,
          opacity: i === 0 ? 0.4 : 1,
        }}>◀</button>
        <div style={{ flex: 1, fontSize: 12, textAlign: "center", color: C.text }}>
          i = <b style={{ color: A, fontFamily: "JetBrains Mono, monospace" }}>{i}</b>
          <span style={{ color: C.dim }}> / max {maxI}</span>
        </div>
        <button onClick={() => setI(Math.min(maxI, i + 1))} disabled={i === maxI} style={{
          padding: "4px 10px", fontSize: 14, fontWeight: 800, cursor: i === maxI ? "default" : "pointer",
          border: `1.5px solid ${C.border}`, background: "#fff", color: A, borderRadius: 6,
          opacity: i === maxI ? 0.4 : 1,
        }}>▶</button>
      </div>

      {/* Cost breakdown */}
      <div style={{ background: middleOk ? "#ecfdf5" : "#fef2f2", border: `1.5px solid ${middleOk ? "#6ee7b7" : "#fca5a5"}`, borderRadius: 10, padding: 10, fontSize: 12, lineHeight: 1.7 }}>
        {!middleOk ? (
          <div style={{ color: "#991b1b" }}>
            <b>{t(E, "Middle char", "가운데 문자")} s[i+1] = '{c1}'</b> ≠ 'O' →{" "}
            {t(E, "skip (middle can't be flipped).", "건너뜀 (가운데는 뒤집기 불가).")}
          </div>
        ) : (
          <div style={{ color: "#065f46", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
            <div>{t(E, "left delete", "왼쪽 삭제")} = i = <b>{leftDel}</b></div>
            <div>{t(E, "right delete", "오른쪽 삭제")} = n − i − 3 = {n} − {i} − 3 = <b>{rightDel}</b></div>
            <div>{t(E, "flip s[i]", "s[i] 뒤집기")} ('{c0}' {c0 === "M" ? "= 'M' ✓" : "≠ 'M'"}) = <b>{flipFirst}</b></div>
            <div>{t(E, "flip s[i+2]", "s[i+2] 뒤집기")} ('{c2}' {c2 === "O" ? "= 'O' ✓" : "≠ 'O'"}) = <b>{flipLast}</b></div>
            <div style={{ marginTop: 4, paddingTop: 4, borderTop: "1px dashed #6ee7b7" }}>
              {t(E, "total cost", "총 비용")} = <b style={{ color: A, fontSize: 14 }}>{total}</b>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center" }}>
        {t(E, "Best across all valid i for this string", "이 문자열에서 모든 유효 i 중 최솟값")}{" : "}
        <b style={{ color: A, fontFamily: "JetBrains Mono, monospace" }}>{best == null ? "-1" : best}</b>
      </div>
    </div>
  );
}

const FULL_PY = [
  "Q = int(input())",
  "for _ in range(Q):",
  "    s = input().strip()",
  "    n = len(s)",
  "    best = -1",
  "",
  "    # Try each position i as start of 'MOO'",
  "    # Final string is 'MOO' (length 3)",
  "    # Delete chars before i: cost = i",
  "    # Delete chars after i+2: cost = n - (i+3)",
  "    # Flip first char if s[i] != 'M': cost 1",
  "    # Middle char must be 'O' (can't flip middle)",
  "    # Flip last char if s[i+2] != 'O': cost 1",
  "    for i in range(n - 2):",
  "        # middle must be 'O'",
  "        if s[i + 1] != 'O':",
  "            continue",
  "        cost = i + (n - i - 3)  # deletions",
  "        if s[i] != 'M':",
  "            cost += 1",
  "        if s[i + 2] != 'O':",
  "            cost += 1",
  "        if best == -1 or cost < best:",
  "            best = cost",
  "",
  "    print(best)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false); cin.tie(nullptr);",
  "    int Q; cin >> Q;",
  "    while (Q--) {",
  "        string s; cin >> s;",
  "        int n = s.size();",
  "        int best = INT_MAX;",
  "        for (int i = 0; i + 2 < n; i++) {",
  "            if (s[i+1] != 'O') continue;",
  "            int cost = i + (n - i - 3);",
  "            if (s[i] != 'M') cost++;",
  "            if (s[i+2] != 'O') cost++;",
  "            best = min(best, cost);",
  "        }",
  "        cout << (best == INT_MAX ? -1 : best) << \"\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getMooOpsSections(E) {
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

export function MooOpsProgressiveCode(props) {
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


export function downloadMooOpsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MooOps — Full Study Guide", "MooOps — 종합 풀이 노트");
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

