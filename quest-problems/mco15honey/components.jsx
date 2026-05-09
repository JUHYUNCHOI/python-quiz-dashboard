import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ============================================================
   HoneySim — drag the K slider, see which trip-yields the
   squirrel picks. Each hive splits into trip blocks of size M
   (last block = remainder). Sort all blocks descending; the
   top K light up and sum into the live total.
   ============================================================ */
const _SIM_M = 10;
const _SIM_HIVES = [
  { idx: 1, honey: 25, color: "#d97706" },
  { idx: 2, honey: 12, color: "#0891b2" },
  { idx: 3, honey: 8,  color: "#a855f7" },
];

function _splitYields(honey, M) {
  const out = [];
  let h = honey;
  while (h > 0) {
    const take = Math.min(M, h);
    out.push(take);
    h -= take;
  }
  return out;
}

export function HoneySim({ E }) {
  // Build per-hive yield blocks (each tagged with hive info)
  const blocksByHive = _SIM_HIVES.map(h => ({
    ...h,
    yields: _splitYields(h.honey, _SIM_M),
  }));
  // Flatten and sort descending — the picked-set is the top K
  const allBlocks = [];
  blocksByHive.forEach(h => h.yields.forEach((y, j) => {
    allBlocks.push({ hive: h.idx, color: h.color, take: y, isPartial: y < _SIM_M, partOrder: j });
  }));
  const sortedDesc = [...allBlocks]
    .map((b, i) => ({ ...b, _orig: i }))
    .sort((a, b) => b.take - a.take);

  const totalBlocks = allBlocks.length;
  const [K, setK] = useState(4);
  const pickedKey = new Set(sortedDesc.slice(0, K).map(b => `${b.hive}-${b.partOrder}`));

  const total = sortedDesc.slice(0, K).reduce((s, b) => s + b.take, 0);
  const maxPossible = sortedDesc.reduce((s, b) => s + b.take, 0);
  const isMax = K >= totalBlocks;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 8, textAlign: "center" }}>
          {t(E, "🍯 Trip Yields — drag K to pick the best trips",
                "🍯 왕복 수확량 — K 를 움직여 최고의 왕복을 골라봐")}
        </div>

        {/* Per-hive rows: each hive shows its trip-blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "4px 4px 0" }}>
          {blocksByHive.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 70, fontSize: 12, fontWeight: 700, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
                {t(E, `hive ${h.idx}`, `벌집 ${h.idx}`)}
              </div>
              <div style={{ width: 44, fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
                {h.honey}ml
              </div>
              <div style={{ display: "flex", gap: 4, flex: 1, flexWrap: "wrap" }}>
                {h.yields.map((y, j) => {
                  const picked = pickedKey.has(`${h.idx}-${j}`);
                  return (
                    <div key={j} style={{
                      minWidth: 36,
                      padding: "4px 8px",
                      borderRadius: 6,
                      background: picked ? h.color : `${h.color}22`,
                      border: picked ? `2px solid ${h.color}` : `1px dashed ${h.color}77`,
                      color: picked ? "#fff" : h.color,
                      fontSize: 12, fontWeight: 800,
                      fontFamily: "'JetBrains Mono',monospace",
                      textAlign: "center",
                      transition: "all 0.15s",
                      opacity: picked ? 1 : 0.55,
                    }}>
                      {y}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* K slider */}
        <div style={{ marginTop: 12, padding: "0 4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: C.dim }}>
              {t(E, "trips K", "왕복 K")}
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
              K = {K} / {totalBlocks}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={totalBlocks}
            step={1}
            value={K}
            onChange={e => setK(Number(e.target.value))}
            style={{ width: "100%", accentColor: A }}
          />
        </div>
      </div>

      {/* Live readout */}
      <div style={{
        background: isMax ? "#fef3c7" : "#f8fafc",
        border: `2px solid ${isMax ? A : C.border}`,
        borderRadius: 12, padding: "10px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 10, flexWrap: "wrap",
      }}>
        <div style={{ fontSize: 13, color: C.text }}>
          <b style={{ color: A }}>K = {K}</b>
          {" · "}
          {t(E, "picked: ", "선택: ")}
          {K === 0
            ? <span style={{ color: C.dim }}>{t(E, "none", "없음")}</span>
            : sortedDesc.slice(0, K).map((b, i) => (
                <span key={i} style={{ color: b.color, fontWeight: 700 }}>
                  {b.take}{i < K - 1 ? " + " : ""}
                </span>
              ))
          }
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: isMax ? A : C.text }}>
          {t(E, "total honey: ", "총 꿀: ")}
          <span style={{ fontSize: 18 }}>{total}</span>
          {isMax && (
            <span style={{ marginLeft: 6, fontSize: 11, color: A }}>
              {t(E, "← all yields!", "← 전부!")}
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          `M=${_SIM_M}. Each hive splits into trip-yields of M (last block = remainder). Sort all yields descending, take the K largest — that's the answer.`,
          `M=${_SIM_M}. 각 벌집을 M 짜리 왕복 블록으로 쪼개요 (마지막 블록 = 나머지). 전부 내림차순 정렬해서 큰 것 K 개 = 정답.`)}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N, M, K = map(int, input().split())",
  "hives = [int(input()) for _ in range(N)]",
  "",
  "hives.sort(reverse=True)",
  "",
  "total = 0",
  "trips_left = K",
  "",
  "for honey in hives:",
  "    if trips_left <= 0:",
  "        break",
  "    # How many full trips to empty this hive?",
  "    trips_needed = (honey + M - 1) // M  # ceil(honey / M)",
  "    trips_used = min(trips_needed, trips_left)",
  "    collected = min(honey, trips_used * M)",
  "    total += collected",
  "    trips_left -= trips_used",
  "",
  "print(total)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    // N, M, K = map(int, input().split())",
  "    auto hives = [int(input()) for _ in range(N)];",
  "",
  "    // hives.sort(reverse=True)",
  "",
  "    auto total = 0;",
  "    auto trips_left = K;",
  "",
  "    // for honey in hives:",
  "        if (trips_left <= 0) {",
  "            break;",
  "        // How many full trips to empty this hive?",
  "        auto trips_needed = (honey + M - 1) // M  # ceil(honey / M);",
  "        auto trips_used = min(trips_needed, trips_left);",
  "        auto collected = min(honey, trips_used * M);",
  "        total += collected;",
  "        trips_left -= trips_used;",
  "",
  "    cout << total << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getHoneySections(E) {
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

export function HoneyProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadHoneyPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Honey — Full Study Guide", "Honey — 종합 풀이 노트");
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

