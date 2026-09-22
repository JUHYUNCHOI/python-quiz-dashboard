// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 11/11 on cpid=1276
// 🔧 REWRITTEN 2026-06-15 — real problem: Air Cownditioning II (2023 Jan Bronze 2, cpid 1297)
//   C++ placeholder (summed cow costs) replaced with the correct 2^M subset (bitmask) search,
//   matching the already-correct Python. Local: compiles + matches official sample (10) exactly.
//   USACO re-submit PENDING.
//   ⚠️ CURRICULUM NOTE (2026-06-15): "bit ops are only a CP tip (cpp-20), but there is no
//   non-bitmask Bronze solution. Flag for design review if a no-bitmask version is desired."
//
// ✅ 2026-09-16 — design review 를 걸었고 **그 노트가 틀렸다는 게 밝혀졌다.**
//   `/decide` 3라운드(기획·감사·학생 → PM 종합), 선생님 지시로 실행.
//   · 감사가 `mask & (1<<j)` 를 `% 2` / `//= 2` 로 바꿔 **랜덤 80회 브루트 대조 전부 일치** —
//     "대안이 없다" 는 **검증 없이 쓴 말**이었다. 석 달간 그 말이 판정을 막고 있었다.
//   · 학생(초6)이 이 코드에서 **완전히 멈췄다**: *"`<<` 랑 `&` 기호 처음 봐요. `mask` 라는
//     단어도 처음 봐요. 화면은 `1 << M` 이 왜 2^10 이랑 같은지 한 마디도 안 알려줘요."*
//     그런데 **아이디어는 스스로 떠올렸다** — *"에어컨 각각을 켜거나 끄거나 두 가지니까
//     다 해보면 되지 않나"*. 막힌 건 개념이 아니라 **그걸 코드로 쓰는 법**이었다.
//   · 파이썬 레슨에 비트 시프트 **0건**, `itertools` 도 **0건** (전수 확인).
//     반면 `**` 는 레슨 4, `//` 와 `%` 는 레슨 3 에서 가르친다.
//
//   고침: `mask` → `combo`, `1 << M` → `2 ** M`, `mask & (1 << j)` → `rest % 2` + `rest //= 2`.
//         C++ 도 같은 모양(`combos *= 2` 로 미리 세고 `rest % 2` / `rest /= 2`).
//         **알고리즘·시간복잡도 그대로, 문법만 바꿨다.**
//   검증: **무작위 400케이스에서 옛 파이썬 = 새 파이썬, 옛 C++ = 새 C++ 불일치 0.**
//         답이 있는 입력에서 새 파이썬 = 새 C++ 도 불일치 0.
//   ✅ **2026-09-17 선생님이 제출해 파이썬·C++ 둘 다 통과 확인.** 지금 화면 코드 = 통과한 코드다.
//   ⚠️ 공식 샘플 입력이 저장소에 없어서 그건 못 돌렸다. 화면에도 입출력 카드가 없다(별건).
//   ⚠️ 원래부터 있던 것: 답이 없을 때 파이썬은 `inf`, C++ 은 `-1` 을 낸다 — 내가 만든 게 아니다.

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ================================================================
   AC Subset Sim — toggle ACs, see stacked cooling on stalls
   Eye-evident: bars stack, cells turn green when need is met.
   Used in Ch1 between the 2^M quiz and the numeric input.
   ================================================================ */
export function ACSubsetSim({ E }) {
  // Fixed scenario matching the input quiz: 1 cow, 2 ACs, stalls 1-5
  const STALL_LO = 1, STALL_HI = 5;
  const COW = { s: 1, e: 5, c: 3, label: t(E, "Cow", "소") };
  const ACS = [
    { id: 0, s: 1, e: 5, p: 3, cost: 10, color: "#2563eb", bg: "#dbeafe" },
    { id: 1, s: 1, e: 3, p: 5, cost: 20, color: "#7c3aed", bg: "#ede9fe" },
  ];
  const [picked, setPicked] = useState([true, false]); // start with AC1 only
  const toggle = (i) => setPicked(p => p.map((v, k) => k === i ? !v : v));

  // Compute cooling per stall + total cost
  const stalls = [];
  for (let s = STALL_LO; s <= STALL_HI; s++) {
    let cool = 0;
    ACS.forEach((ac, i) => { if (picked[i] && s >= ac.s && s <= ac.e) cool += ac.p; });
    stalls.push({ s, cool, ok: cool >= COW.c });
  }
  const totalCost = ACS.reduce((sum, ac, i) => sum + (picked[i] ? ac.cost : 0), 0);
  const allOk = stalls.every(x => x.ok);
  const anyPicked = picked.some(Boolean);

  const cellW = 56;

  return (
    <div style={{
      background: "#f8fafc", border: `1.5px dashed ${A}`, borderRadius: 12,
      padding: 14, marginTop: 6, marginBottom: 6,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: A, letterSpacing: 0.5, marginBottom: 8 }}>
        🧪 {t(E, "Try it: toggle ACs, watch the stalls", "직접 해보기 — 에어컨을 켜고 끄면서 축사를 봐요")}
      </div>

      {/* AC toggle row */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {ACS.map((ac, i) => (
          <button key={ac.id} onClick={() => toggle(i)} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: picked[i] ? ac.bg : "#fff",
            border: `1.5px solid ${picked[i] ? ac.color : "#cbd5e1"}`,
            borderRadius: 8, padding: "6px 10px", cursor: "pointer",
            fontSize: 12, fontWeight: 600, color: picked[i] ? ac.color : "#64748b",
            transition: "all 120ms",
          }}>
            <span style={{
              width: 14, height: 14, borderRadius: 3,
              border: `2px solid ${picked[i] ? ac.color : "#94a3b8"}`,
              background: picked[i] ? ac.color : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 10, fontWeight: 900,
            }}>{picked[i] ? "✓" : ""}</span>
            <span>AC{i + 1}</span>
            <span style={{ fontSize: 10, color: picked[i] ? ac.color : "#94a3b8" }}>
              [{ac.s}-{ac.e}] +{ac.p} · ${ac.cost}
            </span>
          </button>
        ))}
      </div>

      {/* Stall grid with stacked cooling bars */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {stalls.map(({ s, cool, ok }) => {
            const need = COW.c;
            const barH = 60;
            const unit = barH / Math.max(need + 2, 5);
            // Per-AC contributions for stacking
            const contribs = ACS
              .map((ac, i) => picked[i] && s >= ac.s && s <= ac.e ? { p: ac.p, color: ac.color } : null)
              .filter(Boolean);
            return (
              <div key={s} style={{ width: cellW, textAlign: "center" }}>
                {/* Bar area */}
                <div style={{
                  height: barH, position: "relative",
                  background: "#f1f5f9", borderRadius: 6,
                  border: `1px solid ${ok ? C.okBd : C.noBd}`,
                  display: "flex", flexDirection: "column-reverse", overflow: "hidden",
                }}>
                  {/* Need line */}
                  <div style={{
                    position: "absolute", left: 0, right: 0,
                    bottom: need * unit - 1,
                    borderTop: "2px dashed #dc2626", zIndex: 2,
                  }} />
                  {/* Stacked AC contributions (bottom up) */}
                  {contribs.map((c, ci) => (
                    <div key={ci} style={{
                      height: c.p * unit, background: c.color, opacity: 0.85,
                      borderTop: ci > 0 ? "1px solid #fff" : "none",
                    }} />
                  ))}
                </div>
                {/* Stall label */}
                <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginTop: 4 }}>{s}</div>
                {/* Cooling number */}
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: ok ? "#15803d" : "#dc2626",
                }}>
                  {cool}{ok ? " ✓" : " ✗"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cow needs label */}
      <div style={{ textAlign: "center", fontSize: 11, color: "#dc2626", marginBottom: 10 }}>
        - - - {t(E, `Cow needs ${COW.c} cooling in stalls ${COW.s}-${COW.e}`,
                    `소가 축사 ${COW.s}-${COW.e} 에서 냉방력 ${COW.c} 이 필요해요`)} - - -
      </div>

      {/* Status footer */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 14, alignItems: "center",
        background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8,
        padding: "8px 12px", fontSize: 12,
      }}>
        <span>
          💰 <b>{t(E, "Cost", "비용")}:</b>{" "}
          <span style={{ color: A, fontWeight: 700 }}>{totalCost}</span>
        </span>
        <span style={{ color: C.dimLight }}>|</span>
        <span style={{
          fontWeight: 700,
          color: !anyPicked ? C.dim : (allOk ? "#15803d" : "#dc2626"),
        }}>
          {!anyPicked
            ? t(E, "Pick at least one AC", "에어컨을 1 개 이상 골라 봐요")
            : (allOk
                ? t(E, "✓ All stalls satisfied", "✓ 모든 축사가 시원해요")
                : t(E, "✗ Some stall under cooled", "✗ 냉방이 모자란 축사가 있어요"))}
        </span>
      </div>

      <div style={{ fontSize: 11, color: C.dim, marginTop: 8, textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          "Try {AC1}, {AC2}, {AC1+AC2}, {} — only valid subsets count, pick the cheapest.",
          "{AC1만}, {AC2만}, {둘 다}, {아무것도 안} 을 눌러 봐요.\n모든 소가 시원해진 것 중 가장 싼 것이 답이에요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N, M = map(int, input().split())",
  "cows = []",
  "for _ in range(N):",
  "    s, e, c = map(int, input().split())",
  "    cows.append((s, e, c))  # stall range, cooling needed",
  "",
  "acs = []",
  "for _ in range(M):",
  "    s, e, p, cost = map(int, input().split())",
  "    acs.append((s, e, p, cost))",
  "",
  "best = float('inf')",
  "",
  "# Each AC is either on or off, so with M <= 10 there are",
  "# at most 2 ** 10 = 1024 combinations. Number them 0, 1, 2, ...",
  "# and read a number's digits in base 2: digit j says 'is AC j on?'",
  "for combo in range(2 ** M):",
  "    total_cost = 0",
  "    cooling = [0] * 101  # cooling at each stall",
  "    rest = combo",
  "    for j in range(M):",
  "        on = rest % 2    # 1 means AC j is on",
  "        rest //= 2       # move on to the next AC",
  "        if on == 1:",
  "            s, e, p, cost = acs[j]",
  "            total_cost += cost",
  "            for pos in range(s, e + 1):",
  "                cooling[pos] += p",
  "    # Check if all cows satisfied",
  "    ok = True",
  "    for s, e, c in cows:",
  "        for pos in range(s, e + 1):",
  "            if cooling[pos] < c:",
  "                ok = False",
  "                break",
  "        if not ok:",
  "            break",
  "    if ok:",
  "        best = min(best, total_cost)",
  "",
  "print(best)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M;",
  "    cin >> N >> M;",
  "    vector<int> cs(N), ce(N), cc(N);          // cow: stall range + cooling needed",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> cs[i] >> ce[i] >> cc[i];",
  "    }",
  "    vector<int> as(M), ae(M), ap(M), acost(M);// AC: range, power, cost",
  "    for (int j = 0; j < M; j++) {",
  "        cin >> as[j] >> ae[j] >> ap[j] >> acost[j];",
  "    }",
  "",
  "    long long best = -1;",
  "",
  "    // Each AC is on or off, so with M <= 10 there are at most 1024 combinations.",
  "    int combos = 1;",
  "    for (int j = 0; j < M; j++) {",
  "        combos *= 2;",
  "    }",
  "",
  "    // Number the combinations 0, 1, 2, ... and read each number in base 2:",
  "    // digit j says whether AC j is on.",
  "    for (int combo = 0; combo < combos; combo++) {",
  "        long long total = 0;",
  "        vector<int> cool(101, 0);             // cooling at each stall 1..100",
  "        int rest = combo;",
  "        for (int j = 0; j < M; j++) {",
  "            int on = rest % 2;                // 1 means AC j is on",
  "            rest /= 2;                        // move on to the next AC",
  "            if (on == 1) {",
  "                total += acost[j];",
  "                for (int pos = as[j]; pos <= ae[j]; pos++) {",
  "                    cool[pos] += ap[j];",
  "                }",
  "            }",
  "        }",
  "        bool ok = true;",
  "        for (int i = 0; i < N && ok; i++)",
  "            for (int pos = cs[i]; pos <= ce[i]; pos++)",
  "                if (cool[pos] < cc[i]) {",
  "                    ok = false;",
  "                    break;",
  "                }",
  "        if (ok && (best == -1 || total < best)) {",
  "            best = total;",
  "        }",
  "    }",
  "    cout << best << \"\\n\";",
  "    return 0;",
  "}",
];

export function getAirCondSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "The answer is the cheapest AC subset that satisfies every cow.\nSince M ≤ 10, there are only 2^M ≤ 1024 subsets to try.\nSo we try every subset, add up cooling power per stall,\nand keep the cheapest one that meets every cow's need.",
          "답은 모든 소를 시원하게 하는 에어컨 조합의 최소 비용이에요.\nM 이 10 까지라 조합은 2^M ≤ 1024 가지뿐이에요.\n그래서 조합을 하나씩 다 해 보며 축사마다 냉방력을 더하고,\n모든 소를 채우는 조합 중 가장 싼 것을 찾아요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map) make algorithms concise.",
            "Python 은 list, map 덕분에 코드가 짧아져요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) 적으면 코드 뜻이 또렷해져요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "더하거나 곱한 값이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function AirCondProgressiveCode(props) {
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


export function downloadAirCondPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "AirCond — Full Study Guide", "AirCond — 종합 풀이 노트");
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
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

