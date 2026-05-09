import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";
import { SimNav, useTraceStep, StepHeader, NarrativePanel } from "@/components/quest/TraceStepper";

const A = "#2563eb";

const FULL_PY = [
  "import sys",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    N = int(input_data[idx])",
  "    idx += 1",
  "    types = []",
  "    claims = []",
  "    for i in range(N):",
  "        ti = input_data[idx]",
  "        idx += 1",
  "        pi = int(input_data[idx]) - 1",
  "        idx += 1",
  "        bi = input_data[idx]",
  "        idx += 1",
  "        types.append(ti)",
  "        claims.append((pi, bi))",
  "",
  "    # Check consistency:",
  "    # T-type alien tells truth, F-type lies",
  "    # If alien i is T and says 'alien p is b',",
  "    #   then alien p must be type b",
  "    # If alien i is F and says 'alien p is b',",
  "    #   then alien p must NOT be type b",
  "    consistent = True",
  "    for i in range(N):",
  "        pi, bi = claims[i]",
  "        if types[i] == 'T':",
  "            if types[pi] != bi:",
  "                consistent = False; break",
  "        else:",
  "            if types[pi] == bi:",
  "                consistent = False; break",
  "",
  "    print('YES' if consistent else 'NO')",
  "",
  "solve()",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "",
  "    auto solve = [&]() {   // TODO: type args",
  "        auto input_data = sys.stdin.read().split();",
  "        auto idx = 0;",
  "        auto N = int(input_data[idx]); idx += 1;",
  "        auto types = [];",
  "        auto claims = [];",
  "        for (long long i = 0; i < N; i++) {",
  "            auto ti = input_data[idx]; idx += 1;",
  "            auto pi = int(input_data[idx]) - 1; idx += 1;",
  "            auto bi = input_data[idx]; idx += 1;",
  "            // types.append(ti)",
  "            // claims.append((pi, bi))",
  "",
  "        // Check consistency:",
  "        // T-type alien tells truth, F-type lies",
  "        // If alien i is T and says 'alien p is b',",
  "        // then alien p must be type b",
  "        // If alien i is F and says 'alien p is b',",
  "        // then alien p must NOT be type b",
  "        auto consistent = True;",
  "        for (long long i = 0; i < N; i++) {",
  "            // pi, bi = claims[i]",
  "            if (types[i] == 'T') {",
  "                if (types[pi] != bi) {",
  "                    auto consistent = False; break;",
  "            else {",
  "                if (types[pi] == bi) {",
  "                    auto consistent = False; break;",
  "",
  "        cout << 'YES' if consistent else 'NO' << \"\\n\";",
  "",
  "    // solve()",
  "",
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

export function Mcc22AliensProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}


/* ═══════════════════════════════════════════════════════════════
   DeepAuditSim — pick a scenario, walk every alien's claim, and
   audit it against the T/F rule one alien at a time. Students see
   exactly which claim breaks consistency (or that all pass).
   Three scenarios over the same N=4 type vector [T, F, T, F]:
     • "consistent" — every claim is honest-T / lying-F  → YES
     • "T-fails"    — alien 0 (T) says alien 2 is F (wrong)
     • "F-fails"    — alien 1 (F) says alien 0 is T (true → lied=false)
   ═══════════════════════════════════════════════════════════════ */
function buildAliensAuditTrace(types, claims) {
  const N = types.length;
  const trace = [{
    sub: "init", i: -1, ok: null, consistent: true, done: false, failedAt: null,
  }];
  let consistent = true;
  let failedAt = null;
  for (let i = 0; i < N; i++) {
    const [pi, bi] = claims[i];
    // 1) read claim
    trace.push({
      sub: "read", i, pi, bi, types_i: types[i], types_pi: types[pi],
      consistent, failedAt: null,
    });
    // 2) judge
    let ok;
    if (types[i] === "T") ok = (types[pi] === bi);
    else                  ok = (types[pi] !== bi);
    if (ok) {
      trace.push({
        sub: "pass", i, pi, bi, types_i: types[i], types_pi: types[pi],
        consistent: true, failedAt: null,
      });
    } else {
      consistent = false;
      failedAt = i;
      trace.push({
        sub: "fail", i, pi, bi, types_i: types[i], types_pi: types[pi],
        consistent: false, failedAt,
      });
      break;
    }
  }
  trace.push({
    sub: "done", consistent, failedAt, done: true, i: -1,
  });
  return trace;
}

const ALIEN_SCENARIOS = [
  {
    key: "consistent",
    types: ["T", "F", "T", "F"],
    // each tuple = [pi (0-indexed target), bi ('T' or 'F')]
    claims: [[2, "T"], [0, "F"], [3, "F"], [2, "T"]],
    label: { en: "All consistent → YES",      ko: "모두 일관 → YES" },
  },
  {
    key: "T-fails",
    types: ["T", "F", "T", "F"],
    // alien 0 (T) lies about alien 2 → fails immediately
    claims: [[2, "F"], [0, "F"], [3, "F"], [2, "T"]],
    label: { en: "T-type lies → fails at i=0", ko: "T 가 거짓말 → i=0 에서 실패" },
  },
  {
    key: "F-fails",
    types: ["T", "F", "T", "F"],
    // alien 1 (F) tells the truth about alien 0 → fails at i=1
    claims: [[2, "T"], [0, "T"], [3, "F"], [2, "T"]],
    label: { en: "F-type tells truth → fails at i=1", ko: "F 가 진실 발설 → i=1 에서 실패" },
  },
];

export function DeepAuditSim({ E }) {
  const [scKey, setScKey] = useState("consistent");
  const sc = ALIEN_SCENARIOS.find(s => s.key === scKey) || ALIEN_SCENARIOS[0];
  const trace = buildAliensAuditTrace(sc.types, sc.claims);
  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];

  const N = sc.types.length;

  const typeBadge = (typ, opts = {}) => {
    const isT = typ === "T";
    const dim = opts.dim;
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 22, height: 22, borderRadius: 6,
        background: dim ? "#f1f5f9" : (isT ? "#dcfce7" : "#fee2e2"),
        border: `1.5px solid ${dim ? "#cbd5e1" : (isT ? "#16a34a" : "#dc2626")}`,
        color: dim ? "#94a3b8" : (isT ? "#15803d" : "#991b1b"),
        fontWeight: 800, fontSize: 12, fontFamily: "'JetBrains Mono',monospace",
      }}>{typ}</span>
    );
  };

  const renderAlienCell = (typ, idx) => {
    const isCurrent = (s.sub === "read" || s.sub === "pass" || s.sub === "fail") && s.i === idx;
    const isTarget = (s.sub === "read" || s.sub === "pass" || s.sub === "fail") && s.pi === idx;
    const isPassedRow = s.sub === "done" && s.consistent;
    const isFailRow = s.sub === "fail" || (s.sub === "done" && s.failedAt === idx);
    const bg = isFailRow && (isCurrent || isTarget) ? "#fee2e2"
             : isPassedRow ? "#dcfce7"
             : isCurrent ? "#fef3c7"
             : isTarget ? "#dbeafe"
             : "#fff";
    const bd = isFailRow && (isCurrent || isTarget) ? "#dc2626"
             : isPassedRow ? "#16a34a"
             : isCurrent ? "#f59e0b"
             : isTarget ? A
             : "#cbd5e1";
    return (
      <div key={idx} style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
        padding: "6px 4px", borderRadius: 8,
        background: bg, border: `2px solid ${bd}`, minWidth: 50,
      }}>
        <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>i={idx}</div>
        <div style={{ fontSize: 18 }}>{"👽"}</div>
        {typeBadge(typ)}
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, "Deep audit: walk each alien's claim against the T/F rule",
                    "딥 오딧: 각 외계인의 주장을 T/F 규칙과 한 명씩 대조")}
        subtitle={t(E, `Pick a scenario, then ▶ to audit claim by claim. (${safe + 1} / ${trace.length})`,
                       `시나리오를 고른 뒤 ▶ 으로 한 주장씩 검증. (${safe + 1} / ${trace.length})`)}
      />

      {/* Scenario picker */}
      <div style={{
        background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6 }}>
          🧪 {t(E, "Scenario", "시나리오")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {ALIEN_SCENARIOS.map(c => (
            <label key={c.key} style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 12,
              cursor: "pointer", padding: "4px 6px", borderRadius: 6,
              background: scKey === c.key ? "#dbeafe" : "transparent",
              color: scKey === c.key ? "#1e3a8a" : C.text,
              fontWeight: scKey === c.key ? 700 : 500,
            }}>
              <input
                type="radio"
                name="mcc22aliens-audit-sc"
                value={c.key}
                checked={scKey === c.key}
                onChange={() => { setScKey(c.key); ts.setIdx(0); }}
                style={{ accentColor: A }}
              />
              <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                {E ? c.label.en : c.label.ko}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Aliens row with types */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10 }}>
        {sc.types.map((typ, idx) => renderAlienCell(typ, idx))}
      </div>

      {/* Claims table */}
      <div style={{
        background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8,
        padding: "8px 10px", marginBottom: 10, fontSize: 12,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6 }}>
          📋 {t(E, "Claims", "주장 목록")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {sc.claims.map((cl, idx) => {
            const [pi, bi] = cl;
            const isCurrent = (s.sub === "read" || s.sub === "pass" || s.sub === "fail") && s.i === idx;
            const isPast = s.sub === "done" || (s.i > idx && s.i >= 0);
            const isFail = s.sub === "fail" && s.i === idx;
            return (
              <div key={idx} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "4px 8px", borderRadius: 6,
                background: isFail ? "#fee2e2" : isCurrent ? "#fef3c7" : isPast ? "#f0fdf4" : "#f8fafc",
                border: `1.5px solid ${isFail ? "#dc2626" : isCurrent ? "#f59e0b" : isPast ? "#86efac" : C.border}`,
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
              }}>
                <span style={{ color: C.dim, minWidth: 28 }}>i={idx}</span>
                <span>{typeBadge(sc.types[idx], { dim: !isCurrent && !isFail && !isPast })}</span>
                <span style={{ color: C.dim }}>{t(E, "says alien", "왈 외계인")} {pi}</span>
                <span>{t(E, "is", "는")}</span>
                <span>{typeBadge(bi, { dim: !isCurrent && !isFail && !isPast })}</span>
                {isPast && !isFail && <span style={{ marginLeft: "auto", color: "#15803d", fontWeight: 700 }}>✅</span>}
                {isFail && <span style={{ marginLeft: "auto", color: "#991b1b", fontWeight: 700 }}>❌</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step explanation */}
      <NarrativePanel minHeight={92} stepKey={ts.safe}>
        {s.sub === "init" && (
          <>
            <div style={{ fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
              📦 {t(E, "Initial state", "초기 상태")}
            </div>
            <div>{t(E,
              `N = ${N}, types = [${sc.types.join(", ")}]. Press ▶ to audit each claim against the T/F rule.`,
              `N = ${N}, types = [${sc.types.join(", ")}]. ▶ 눌러서 각 주장을 T/F 규칙과 대조.`)}</div>
          </>
        )}
        {s.sub === "read" && (
          <>
            <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
              1️⃣ {t(E, `Step i=${s.i}: read the claim`, `i=${s.i} 단계: 주장 읽기`)}
            </div>
            <div>
              {t(E, "Alien ", "외계인 ")}<b>{s.i}</b>{t(E, " is type ", " 의 타입은 ")}
              <b style={{ color: s.types_i === "T" ? "#15803d" : "#991b1b" }}>{s.types_i}</b>
              {t(E, " and claims alien ", " 이고, 외계인 ")}<b>{s.pi}</b>{t(E, " is ", " 는 ")}
              <b style={{ color: s.bi === "T" ? "#15803d" : "#991b1b" }}>{s.bi}</b>.
              {" "}
              {t(E, `Actually alien ${s.pi} is type `, `실제로 외계인 ${s.pi} 는 `)}
              <b style={{ color: s.types_pi === "T" ? "#15803d" : "#991b1b" }}>{s.types_pi}</b>.
              {" "}
              {t(E, "(▶ to judge.)", "(▶ 눌러서 판정.)")}
            </div>
          </>
        )}
        {s.sub === "pass" && (
          <>
            <div style={{ fontWeight: 700, color: "#15803d", marginBottom: 4 }}>
              ✅ {t(E, `Claim ${s.i} is consistent`, `주장 ${s.i} 일관`)}
            </div>
            <div>
              {s.types_i === "T"
                ? t(E, `T-type told truth: alien ${s.pi} really is ${s.bi}.`,
                       `T 가 진실 발설: 외계인 ${s.pi} 는 정말 ${s.bi}.`)
                : t(E, `F-type lied: alien ${s.pi} is actually ${s.types_pi}, not ${s.bi}.`,
                       `F 가 거짓말: 외계인 ${s.pi} 는 실제로 ${s.types_pi}, ${s.bi} 가 아님.`)}
              {" "}
              {t(E, "Move to the next claim.", "다음 주장으로.")}
            </div>
          </>
        )}
        {s.sub === "fail" && (
          <>
            <div style={{ fontWeight: 700, color: "#991b1b", marginBottom: 4 }}>
              ❌ {t(E, `Claim ${s.i} breaks the rule`, `주장 ${s.i} 규칙 위반`)}
            </div>
            <div>
              {s.types_i === "T"
                ? t(E, `T-type must tell truth, but alien ${s.pi} is ${s.types_pi}, not ${s.bi}.`,
                       `T 는 진실만 말해야 하는데 외계인 ${s.pi} 는 ${s.types_pi}, ${s.bi} 가 아님.`)
                : t(E, `F-type must lie, but alien ${s.pi} really IS ${s.bi} — that's the truth, not a lie.`,
                       `F 는 거짓말만 해야 하는데 외계인 ${s.pi} 는 정말로 ${s.bi} — 진실 발설.`)}
              {" "}
              {t(E, "Stop early — answer is NO.", "즉시 종료 — 답 NO.")}
            </div>
          </>
        )}
        {s.sub === "done" && (
          <>
            <div style={{ fontWeight: 700, color: s.consistent ? "#15803d" : "#991b1b", marginBottom: 4 }}>
              {s.consistent ? "🎉" : "🛑"}{" "}
              {s.consistent
                ? t(E, "All claims consistent — print YES", "모든 주장 일관 — YES 출력")
                : t(E, `Inconsistency at i=${s.failedAt} — print NO`, `i=${s.failedAt} 불일치 — NO 출력`)}
            </div>
            <div>
              {s.consistent
                ? t(E, "Every T told truth and every F lied. The type assignment is valid.",
                       "모든 T 가 진실, 모든 F 가 거짓. 타입 배정이 유효해요.")
                : t(E, "One violation is enough — the assignment cannot be valid.",
                       "위반 한 건이면 충분 — 타입 배정이 유효할 수 없어요.")}
            </div>
          </>
        )}
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
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

