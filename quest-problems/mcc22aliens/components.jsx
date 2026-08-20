import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";
const KA = { wordBreak: "keep-all" };

const FULL_PY = [
  "import sys",
  "def main():",
  "    data = sys.stdin.read().split()",
  "    idx = 0",
  "    T = int(data[idx]); idx += 1",
  "    out = []",
  "    for _ in range(T):",
  "        n = int(data[idx]); idx += 1",
  "        a = data[idx]; idx += 1",
  "        b = data[idx]; idx += 1",
  "        need_T = 0; have_T = 0",
  "        for i in range(n):",
  "            if a[i] == 'T':",
  "                have_T += 1",
  "                req = b[i]",
  "            else:",
  "                req = 'F' if b[i] == 'T' else 'T'",
  "            if req == 'T':",
  "                need_T += 1",
  "        out.append('YES' if need_T == have_T else 'NO')",
  "    print('\\n'.join(out))",
  "main()",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int n;",
  "        string a, b;",
  "        cin >> n >> a >> b;",
  "",
  "        // decode each claim to the type it DEMANDS,",
  "        // then compare demand for T with supply of T",
  "        int need_T = 0, have_T = 0;",
  "        for (int i = 0; i < n; i++) {",
  "            char req;",
  "            if (a[i] == 'T') {   // truth-teller: claim as-is",
  "                have_T++;",
  "                req = b[i];",
  "            } else {             // liar: flip the claim",
  "                req = (b[i] == 'T') ? 'F' : 'T';",
  "            }",
  "            if (req == 'T') need_T++;",
  "        }",
  "        cout << (need_T == have_T ? \"YES\" : \"NO\") << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getMcc22AliensSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Never search the n! orderings. Decode each claim into the single type it demands: a truth-teller (a[i]=='T') repeats the claim b[i] as-is; a liar flips it.",
            "n! 개의 순서를 뒤지지 않아요. 각 주장을 요구하는 타입 하나로 해독: 진실쟁이 (a[i]=='T') 는 주장 b[i] 를 그대로, 거짓말쟁이는 뒤집어요."),
        t(E, "A valid permutation exists exactly when supply equals demand: the count of demanded T's (need_T) must equal the count of real T's (have_T). One O(n) pass over the strings, no permutations.",
            "유효한 순열은 공급 = 수요일 때만 존재: 요구된 T 의 수 (need_T) 가 진짜 T 의 수 (have_T) 와 같아야 해요. 문자열을 O(n) 으로 한 번 훑을 뿐, 순열은 없음."),
      ],
      pyOnly: [
        t(E, "sys.stdin.read().split() grabs every token at once; idx walks through T, then each test's n, a, b.",
            "sys.stdin.read().split() 로 토큰을 한 번에 다 읽고, idx 로 T, 그다음 각 테스트의 n, a, b 를 훑어요."),
      ],
      cppOnly: [
        t(E, "cin >> n >> a >> b reads the count and two strings; while (T--) repeats for every test case.",
            "cin >> n >> a >> b 로 개수와 두 문자열을 읽고, while (T--) 로 매 테스트를 반복해요."),
        t(E, "req is a single char — the type this claim demands after decoding the speaker's honesty.",
            "req 는 문자 하나 — 말하는 이의 정직함을 해독한 뒤 이 주장이 요구하는 타입이에요."),
      ],
    },
  ];
}

export function Mcc22AliensProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}


/* ═══════════════════════════════════════════════════════════════
   AliensCountSim — the supply-vs-demand counting argument.
   Fixed real types a = T F T F. The student toggles each claim
   b[i]; the sim decodes it to the type it DEMANDS (truth-teller
   keeps it, liar flips it), counts demanded-T vs real-T, and the
   verdict banner turns green (YES) when the two counts match, red
   (NO) otherwise. Self-contained, no autoplay.
   ═══════════════════════════════════════════════════════════════ */
const SIM_A = ["T", "F", "T", "F"];   // fixed real types

export function AliensCountSim({ E }) {
  const [b, setB] = useState(["F", "T", "T", "F"]);   // sample 1 claims → YES

  const n = SIM_A.length;
  // decode claim b[i] to the type it demands
  const req = SIM_A.map((ai, i) => (ai === "T" ? b[i] : (b[i] === "T" ? "F" : "T")));
  const haveT = SIM_A.filter((x) => x === "T").length;      // supply (fixed = 2)
  const needT = req.filter((x) => x === "T").length;        // demand
  const ok = needT === haveT;

  const toggle = (i) => setB((prev) => prev.map((v, j) => (j === i ? (v === "T" ? "F" : "T") : v)));

  const chip = (typ, opts = {}) => {
    const isT = typ === "T";
    const faded = opts.faded;
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 30, height: 30, borderRadius: 8,
        background: faded ? "#f1f5f9" : (isT ? "#dcfce7" : "#fee2e2"),
        border: `1.5px solid ${faded ? "#cbd5e1" : (isT ? "#16a34a" : "#dc2626")}`,
        color: faded ? "#94a3b8" : (isT ? "#15803d" : "#991b1b"),
        fontWeight: 800, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
      }}>{typ}</span>
    );
  };

  const rowLabel = (txt) => (
    <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, minWidth: 96, textAlign: "right", paddingRight: 8, ...KA }}>{txt}</div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
          🧮 {t(E, "Supply vs demand of truth-tellers", "진실쟁이의 공급 vs 수요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 14 }}>
          {t(E,
            "Real types a are fixed. Tap a claim to flip it. A truth-teller (T) demands the claim as-is; a liar (F) demands the opposite. When demand for T equals supply of T, some order works → YES.",
            "진짜 타입 a 는 고정. 주장을 눌러 뒤집어요. 진실쟁이 (T) 는 주장 그대로, 거짓말쟁이 (F) 는 반대를 요구해요. T 의 수요가 T 의 공급과 같으면 어떤 순서가 통해요 → YES.")}
        </div>

        {/* index header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          {rowLabel("")}
          <div style={{ display: "flex", gap: 10 }}>
            {SIM_A.map((_, i) => (
              <div key={i} style={{ width: 30, textAlign: "center", fontSize: 10, color: C.dim, fontWeight: 700 }}>i={i}</div>
            ))}
          </div>
        </div>

        {/* real types a */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          {rowLabel(t(E, "type a[i]", "타입 a[i]"))}
          <div style={{ display: "flex", gap: 10 }}>
            {SIM_A.map((ai, i) => <div key={i}>{chip(ai)}</div>)}
          </div>
        </div>

        {/* claims b (clickable) */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          {rowLabel(t(E, "claim b[i]  ↺", "주장 b[i]  ↺"))}
          <div style={{ display: "flex", gap: 10 }}>
            {b.map((bi, i) => (
              <button key={i} onClick={() => toggle(i)} title={t(E, "flip", "뒤집기")} style={{
                width: 30, height: 30, borderRadius: 8, cursor: "pointer", padding: 0,
                background: bi === "T" ? "#dcfce7" : "#fee2e2",
                border: `2px solid ${bi === "T" ? "#16a34a" : "#dc2626"}`,
                color: bi === "T" ? "#15803d" : "#991b1b",
                fontWeight: 800, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
              }}>{bi}</button>
            ))}
          </div>
        </div>

        {/* decoded demand req */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4, paddingTop: 6, borderTop: "1px dashed #93c5fd" }}>
          {rowLabel(t(E, "demands →", "요구 →"))}
          <div style={{ display: "flex", gap: 10 }}>
            {req.map((r, i) => <div key={i}>{chip(r)}</div>)}
          </div>
        </div>
        <div style={{ fontSize: 10.5, color: C.dim, marginBottom: 12, ...KA, paddingLeft: 104 }}>
          {t(E, "a[i]=T keeps b[i]; a[i]=F flips it", "a[i]=T 는 b[i] 유지; a[i]=F 는 뒤집음")}
        </div>

        {/* counts */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <div style={{ flex: 1, minWidth: 120, background: "#fff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 2, ...KA }}>{t(E, "supply: real T's in a", "공급: a 의 진짜 T")}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1e3a8a", fontFamily: "'JetBrains Mono',monospace" }}>{haveT}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 20, fontWeight: 800, color: ok ? "#15803d" : "#991b1b" }}>{ok ? "=" : "≠"}</div>
          <div style={{ flex: 1, minWidth: 120, background: "#fff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 2, ...KA }}>{t(E, "demand: T's required", "수요: 요구된 T")}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#7c3aed", fontFamily: "'JetBrains Mono',monospace" }}>{needT}</div>
          </div>
        </div>

        {/* verdict */}
        <div style={{
          textAlign: "center", borderRadius: 10, padding: "10px 14px", fontWeight: 800, fontSize: 16,
          background: ok ? "#dcfce7" : "#fee2e2",
          border: `2px solid ${ok ? "#16a34a" : "#dc2626"}`,
          color: ok ? "#15803d" : "#991b1b",
        }}>
          {ok
            ? t(E, "✅ supply = demand → YES", "✅ 공급 = 수요 → YES")
            : t(E, "❌ supply ≠ demand → NO", "❌ 공급 ≠ 수요 → NO")}
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            "It's a counting/matching argument: each decoded claim asks for one T or one F alien. A perfect assignment (permutation) exists exactly when the T's asked for match the T's available — no ordering needs to be tried.",
            "이건 개수 세기/매칭 논증이에요: 해독된 각 주장은 T 하나 또는 F 하나를 요청해요. 완벽한 배정 (순열) 은 요청된 T 가 가진 T 와 맞을 때만 존재 — 순서를 하나도 시도할 필요 없어요.")}
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


export function downloadMcc22AliensPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22Aliens — Full Study Guide", "Mcc22Aliens — 종합 풀이 노트");
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
<div class="sub">MCC · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
