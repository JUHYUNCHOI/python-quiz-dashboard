import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ═══════════════════════════════════════════════════════════════
   ModernArtPaintSim — stack rectangles on a small canvas, see which
   colors are visible vs fully hidden, and watch the answer count.
   ═══════════════════════════════════════════════════════════════ */
const _COLOR_HEX = {
  0: "#f8fafc",
  1: "#ef4444", // red
  2: "#f97316", // orange
  3: "#eab308", // yellow
  4: "#22c55e", // green
  5: "#0ea5e9", // sky
  6: "#6366f1", // indigo
  7: "#a855f7", // purple
  8: "#ec4899", // pink
  9: "#0f766e", // teal
};

const _PRESET_RECTS = {
  4: [
    // {color, r1, r2, c1, c2}
    { color: 1, r1: 0, r2: 3, c1: 0, c2: 3 }, // big red — covers all
    { color: 2, r1: 0, r2: 1, c1: 0, c2: 3 }, // orange band top
    { color: 3, r1: 1, r2: 2, c1: 1, c2: 2 }, // tiny yellow inside
    { color: 4, r1: 3, r2: 3, c1: 0, c2: 2 }, // green strip bottom
    { color: 5, r1: 2, r2: 2, c1: 3, c2: 3 }, // sky single cell
  ],
  5: [
    { color: 1, r1: 0, r2: 4, c1: 0, c2: 4 }, // red — full canvas
    { color: 2, r1: 0, r2: 2, c1: 0, c2: 2 }, // orange top-left
    { color: 3, r1: 2, r2: 4, c1: 2, c2: 4 }, // yellow bottom-right
    { color: 6, r1: 1, r2: 1, c1: 1, c2: 1 }, // indigo dot inside orange
    { color: 7, r1: 3, r2: 3, c1: 3, c2: 3 }, // purple dot inside yellow
    { color: 8, r1: 0, r2: 0, c1: 4, c2: 4 }, // pink corner
  ],
};

function _paintCanvas(N, rects) {
  const canvas = Array.from({ length: N }, () => Array(N).fill(0));
  for (const rec of rects) {
    for (let r = rec.r1; r <= rec.r2; r++) {
      for (let c = rec.c1; c <= rec.c2; c++) {
        canvas[r][c] = rec.color;
      }
    }
  }
  return canvas;
}

function _bboxesFromCanvas(N, canvas) {
  const bb = {};
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const col = canvas[r][c];
      if (col === 0) continue;
      if (!bb[col]) bb[col] = { r1: r, r2: r, c1: c, c2: c };
      else {
        bb[col].r1 = Math.min(bb[col].r1, r);
        bb[col].r2 = Math.max(bb[col].r2, r);
        bb[col].c1 = Math.min(bb[col].c1, c);
        bb[col].c2 = Math.max(bb[col].c2, c);
      }
    }
  }
  return bb;
}

export function ModernArtPaintSim({ E }) {
  const [N, setN] = useState(4);
  const [count, setCount] = useState(2); // number of rectangles applied so far

  const allRects = _PRESET_RECTS[N];
  const applied = allRects.slice(0, count);
  const canvas = _paintCanvas(N, applied);
  const bb = _bboxesFromCanvas(N, canvas);
  const visibleColors = Object.keys(bb).map(Number).sort((a, b) => a - b);
  const appliedColors = applied.map(r => r.color);
  const hiddenColors = appliedColors.filter(c => !visibleColors.includes(c));

  const cellPx = N === 4 ? 36 : 30;

  const setN4 = () => { setN(4); setCount(Math.min(count, _PRESET_RECTS[4].length)); };
  const setN5 = () => { setN(5); setCount(Math.min(count, _PRESET_RECTS[5].length)); };

  const reset = () => setCount(0);
  const stepBack = () => setCount(Math.max(0, count - 1));
  const stepFwd = () => setCount(Math.min(allRects.length, count + 1));

  const nextRect = count < allRects.length ? allRects[count] : null;

  return (
    <div style={{ padding: 14 }}>
      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.dim }}>
          {t(E, "Canvas:", "캔버스:")}
        </span>
        <button onClick={setN4} style={{
          background: N === 4 ? A : "#fff", color: N === 4 ? "#fff" : A,
          border: `1.5px solid ${A}`, borderRadius: 6, padding: "4px 10px",
          fontSize: 12, fontWeight: 800, cursor: "pointer",
        }}>4 × 4</button>
        <button onClick={setN5} style={{
          background: N === 5 ? A : "#fff", color: N === 5 ? "#fff" : A,
          border: `1.5px solid ${A}`, borderRadius: 6, padding: "4px 10px",
          fontSize: 12, fontWeight: 800, cursor: "pointer",
        }}>5 × 5</button>
        <span style={{ flex: 1 }} />
        <button onClick={reset} style={{
          background: "#fff", color: "#475569", border: "1.5px solid #cbd5e1",
          borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>{t(E, "Reset", "초기화")}</button>
        <button onClick={stepBack} disabled={count === 0} style={{
          background: count === 0 ? "#f1f5f9" : "#fff", color: "#475569",
          border: "1.5px solid #cbd5e1", borderRadius: 6, padding: "4px 10px",
          fontSize: 12, fontWeight: 700, cursor: count === 0 ? "not-allowed" : "pointer",
        }}>← {t(E, "Undo", "되돌리기")}</button>
        <button onClick={stepFwd} disabled={count >= allRects.length} style={{
          background: count >= allRects.length ? "#f1f5f9" : A, color: count >= allRects.length ? "#94a3b8" : "#fff",
          border: `1.5px solid ${count >= allRects.length ? "#cbd5e1" : A}`,
          borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 800,
          cursor: count >= allRects.length ? "not-allowed" : "pointer",
        }}>{t(E, "Paint next →", "다음 칠하기 →")}</button>
      </div>

      {/* Hint about next rect */}
      <div style={{
        background: nextRect ? "#fef3c7" : "#ecfdf5",
        border: `1px solid ${nextRect ? "#fbbf24" : "#6ee7b7"}`,
        borderRadius: 8, padding: "8px 12px", marginBottom: 10, fontSize: 12, color: "#374151",
      }}>
        {nextRect ? (
          <>
            <span style={{
              display: "inline-block", width: 14, height: 14, background: _COLOR_HEX[nextRect.color],
              borderRadius: 3, verticalAlign: "middle", marginRight: 6,
              border: "1px solid rgba(0,0,0,.15)",
            }} />
            <b>{t(E, "Next rectangle:", "다음 직사각형:")}</b>{" "}
            {t(E, `color ${nextRect.color}, rows ${nextRect.r1}–${nextRect.r2}, cols ${nextRect.c1}–${nextRect.c2}`,
                  `색 ${nextRect.color}, 행 ${nextRect.r1}–${nextRect.r2}, 열 ${nextRect.c1}–${nextRect.c2}`)}
          </>
        ) : (
          <b>{t(E, "All rectangles painted. Look at which colors survived.", "모든 직사각형 칠 완료. 어떤 색이 살아남았는지 봐요.")}</b>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        {/* Canvas */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>
            {t(E, "Canvas (final view)", "캔버스 (최종)")}
          </div>
          <div style={{
            display: "inline-block", padding: 4, background: "#0f172a", borderRadius: 8,
          }}>
            {canvas.map((row, r) => (
              <div key={r} style={{ display: "flex" }}>
                {row.map((col, c) => (
                  <div key={c} style={{
                    width: cellPx, height: cellPx,
                    background: _COLOR_HEX[col],
                    border: "1px solid #1e293b",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700,
                    color: col === 0 ? "#cbd5e1" : "rgba(0,0,0,0.55)",
                  }}>
                    {col === 0 ? "·" : col}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>
            {t(E, "Bounding boxes & status", "바운딩 박스 & 상태")}
          </div>
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8,
            padding: 10, fontSize: 12, color: C.text,
          }}>
            {visibleColors.length === 0 && (
              <div style={{ color: C.dim, fontStyle: "italic" }}>
                {t(E, "(no color visible yet)", "(아직 보이는 색 없음)")}
              </div>
            )}
            {visibleColors.map(col => {
              const b = bb[col];
              return (
                <div key={col} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{
                    display: "inline-block", width: 14, height: 14,
                    background: _COLOR_HEX[col], borderRadius: 3,
                    border: "1px solid rgba(0,0,0,.15)",
                  }} />
                  <b style={{ minWidth: 18 }}>{col}</b>
                  <span style={{ color: C.dim, fontSize: 11 }}>
                    bbox r:{b.r1}–{b.r2}, c:{b.c1}–{b.c2}
                  </span>
                  <span style={{
                    marginLeft: "auto", background: "#dcfce7", color: "#166534",
                    padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700,
                  }}>{t(E, "visible", "보임")}</span>
                </div>
              );
            })}
            {hiddenColors.length > 0 && (
              <div style={{ borderTop: "1px dashed #cbd5e1", marginTop: 6, paddingTop: 6 }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>
                  {t(E, "Fully hidden (painted over):", "완전히 가려짐 (덮였음):")}
                </div>
                {hiddenColors.map(col => (
                  <div key={col} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{
                      display: "inline-block", width: 12, height: 12,
                      background: _COLOR_HEX[col], borderRadius: 3, opacity: 0.45,
                      border: "1px solid rgba(0,0,0,.15)",
                    }} />
                    <b style={{ minWidth: 18, opacity: 0.6 }}>{col}</b>
                    <span style={{
                      marginLeft: "auto", background: "#fee2e2", color: "#991b1b",
                      padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700,
                    }}>{t(E, "hidden", "숨겨짐")}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Counter */}
          <div style={{
            marginTop: 10, background: "#ecfdf5", border: `1.5px solid ${A}`,
            borderRadius: 8, padding: "10px 12px",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", marginBottom: 2 }}>
              {t(E, "Distinct visible colors", "보이는 색의 개수")}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: A }}>
              {visibleColors.length}
            </div>
            <div style={{ fontSize: 11, color: "#065f46", marginTop: 4, lineHeight: 1.45 }}>
              {t(E,
                "Each visible color was the LAST rectangle painted in its bbox region. Hidden colors got fully covered by later rectangles.",
                "보이는 색은 그 바운딩 박스 영역에서 마지막에 칠해진 색. 숨겨진 색은 나중 직사각형에 완전히 덮인 거예요.")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "canvas = []",
  "for _ in range(N):",
  "    canvas.append(list(map(int, input().split())))",
  "",
  "# Find bounding box for each color",
  "bbox = {}  # color -> (minr, maxr, minc, maxc)",
  "for r in range(N):",
  "    for c in range(N):",
  "        col = canvas[r][c]",
  "        if col == 0:",
  "            continue",
  "        if col not in bbox:",
  "            bbox[col] = [r, r, c, c]",
  "        else:",
  "            bbox[col][0] = min(bbox[col][0], r)",
  "            bbox[col][1] = max(bbox[col][1], r)",
  "            bbox[col][2] = min(bbox[col][2], c)",
  "            bbox[col][3] = max(bbox[col][3], c)",
  "",
  "# A color can be first if no other color appears",
  "# inside its bounding box",
  "visible = set(bbox.keys())",
  "ans = 0",
  "for col in visible:",
  "    r1, r2, c1, c2 = bbox[col]",
  "    can_be_first = True",
  "    for r in range(r1, r2 + 1):",
  "        for c in range(c1, c2 + 1):",
  "            if canvas[r][c] != col and canvas[r][c] != 0:",
  "                # another color is on top inside our box",
  "                pass  # this is expected, doesn't disqualify",
  "    # Actually: color can be first if it's not inside",
  "    # any other color's bounding box",
  "    for other in visible:",
  "        if other == col:",
  "            continue",
  "        or1, or2, oc1, oc2 = bbox[other]",
  "        # if col's bbox is entirely inside other's bbox",
  "        if or1 <= r1 and r2 <= or2 and oc1 <= c1 and c2 <= oc2:",
  "            can_be_first = False",
  "            break",
  "    if can_be_first:",
  "        ans += 1",
  "",
  "# Colors not on canvas (1..9 minus visible) can also be first",
  "ans += (9 - len(visible))",
  "print(ans)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N;",
  "    cin >> N;",
  "    vector<vector<int>> canvas(N, vector<int>(N));",
  "    for (int r = 0; r < N; r++) for (int c = 0; c < N; c++) cin >> canvas[r][c];",
  "",
  "    // Bounding box per color",
  "    map<int, array<int,4>> bbox;   // color -> {minr, maxr, minc, maxc}",
  "    for (int r = 0; r < N; r++) {",
  "        for (int c = 0; c < N; c++) {",
  "            int col = canvas[r][c];",
  "            if (col == 0) continue;",
  "            if (!bbox.count(col)) bbox[col] = {r, r, c, c};",
  "            else {",
  "                bbox[col][0] = min(bbox[col][0], r);",
  "                bbox[col][1] = max(bbox[col][1], r);",
  "                bbox[col][2] = min(bbox[col][2], c);",
  "                bbox[col][3] = max(bbox[col][3], c);",
  "            }",
  "        }",
  "    }",
  "",
  "    // A color CAN be first if no other (non-zero) color appears inside its bbox",
  "    int ans = 0;",
  "    for (auto& [col, box] : bbox) {",
  "        bool first = true;",
  "        for (int r = box[0]; r <= box[1] && first; r++) {",
  "            for (int c = box[2]; c <= box[3] && first; c++) {",
  "                if (canvas[r][c] != col && canvas[r][c] != 0) first = false;",
  "            }",
  "        }",
  "        if (!first) ans++;   // means it was painted later",
  "    }",
  "    cout << (int)bbox.size() - ans << \"\n\";",
  "    return 0;",
  "}",
];

export function getModernArtSections(E) {
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

export function ModernArtProgressiveCode(props) {
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


export function downloadModernArtPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "ModernArt — Full Study Guide", "ModernArt — 종합 풀이 노트");
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

