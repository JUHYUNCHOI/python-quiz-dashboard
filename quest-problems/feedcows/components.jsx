// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 12/12 on cpid=1252
// 🔒 USACO_VERIFIED (corrected 2026-06-14)
//   Fixed: added T test-case loop + full output (count line + config string).
//          Greedy now matches the official editorial (patch at i+K, cover to i+2K).
//   Local: Python & C++ both match the official sample (cpid 1252) exactly.
//   Status: passes sample; USACO re-submit PENDING.
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "idx = 0",
  "T = int(data[idx]); idx += 1   # number of test cases",
  "out = []",
  "",
  "for _ in range(T):",
  "    N = int(data[idx]); K = int(data[idx + 1]); idx += 2",
  "    s = data[idx]; idx += 1",
  "",
  "    patches = ['.'] * N        # '.' = no patch, else 'G'/'H'",
  "    g_cover = -1               # G cows up to this index are satisfied",
  "    h_cover = -1               # H cows up to this index are satisfied",
  "",
  "    for i in range(N):",
  "        if s[i] == 'G' and g_cover < i:",
  "            if i + K >= N:                 # cannot reach further right",
  "                p = i if patches[i] == '.' else i - 1",
  "                patches[p] = 'G'",
  "                g_cover = N",
  "            else:                          # place as far right as possible",
  "                patches[i + K] = 'G'",
  "                g_cover = i + 2 * K        # covers up to (i+K)+K",
  "        elif s[i] == 'H' and h_cover < i:",
  "            if i + K >= N:",
  "                p = i if patches[i] == '.' else i - 1",
  "                patches[p] = 'H'",
  "                h_cover = N",
  "            else:",
  "                patches[i + K] = 'H'",
  "                h_cover = i + 2 * K",
  "",
  "    count = N - patches.count('.')",
  "    out.append(str(count))",
  "    out.append(''.join(patches))",
  "",
  "print('\\n'.join(out))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;                      // number of test cases",
  "    while (T--) {",
  "        int N, K;",
  "        cin >> N >> K;",
  "        string s;",
  "        cin >> s;",
  "",
  "        vector<char> patches(N, '.');",
  "        int gCover = -1;           // G cows up to this index are satisfied",
  "        int hCover = -1;           // H cows up to this index are satisfied",
  "",
  "        for (int i = 0; i < N; i++) {",
  "            if (s[i] == 'G' && gCover < i) {",
  "                if (i + K >= N) {              // cannot reach further right",
  "                    int p = (patches[i] == '.') ? i : i - 1;",
  "                    patches[p] = 'G';",
  "                    gCover = N;",
  "                } else {                       // place as far right as possible",
  "                    patches[i + K] = 'G';",
  "                    gCover = i + 2 * K;        // covers up to (i+K)+K",
  "                }",
  "            } else if (s[i] == 'H' && hCover < i) {",
  "                if (i + K >= N) {",
  "                    int p = (patches[i] == '.') ? i : i - 1;",
  "                    patches[p] = 'H';",
  "                    hCover = N;",
  "                } else {",
  "                    patches[i + K] = 'H';",
  "                    hCover = i + 2 * K;",
  "                }",
  "            }",
  "        }",
  "",
  "        int count = 0;",
  "        for (char c : patches) if (c != '.') count++;",
  "        cout << count << \"\\n\";",
  "        for (char c : patches) cout << c;",
  "        cout << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getFeedCowsSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Read the code section by section. Each line has a clear purpose.",
            "코드를 한 부분씩 읽어봐. 각 줄이 명확한 역할이 있어."),
        t(E, "There are T test cases. For each, print TWO lines: the patch count, then a string showing where each patch goes ('.', 'G', or 'H').",
            "테스트 케이스가 T개. 각각 두 줄 출력: 패치 개수, 그리고 각 위치의 패치를 보여주는 문자열 ('.', 'G', 'H')."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python의 고수준 구문 (list, map, sorted)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "Compare s[i] with the chars 'G' and 'H' directly.",
            "s[i]를 문자 'G', 'H'와 직접 비교."),
        t(E, "Track gCover and hCover separately — the index up to which each breed is already satisfied.",
            "gCover, hCover를 따로 추적 — 각 품종이 이미 만족된 인덱스까지."),
        t(E, "Read T first, then loop T times reading N, K and the breed string.",
            "T를 먼저 읽고, N·K·품종 문자열을 T번 반복해서 읽어."),
      ],
    },
  ];
}

export function FeedCowsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}


/* ===============================================================
   FeedCowsNumberLineViz
   Eye-evident static visualization for Chapter 1-1.
   Shows breeds = "GHGHG", K = 1, and one example G patch at
   position 1 covering [0..2] — so the student sees:
     • breed letter under each cow position
     • a colored patch bar showing its [i-K .. i+K] reach
     • which same-breed cows it satisfies (✓)
     • which cows still need a different patch
   Purely additive — does not change any existing prose.
   =============================================================== */
const G_COLOR = "#059669";
const H_COLOR = "#7c3aed";

export function FeedCowsNumberLineViz({ E }) {
  const breeds = ["G", "H", "G", "H", "G"];
  const K = 1;
  const N = breeds.length;
  // Example: a G patch placed at position 1 → reach [1-K .. 1+K] = [0..2]
  const patchPos = 1;
  const patchBreed = "G";
  const patchLeft = patchPos - K;
  const patchRight = patchPos + K;

  const colW = 56;
  const lineH = 6;
  const totalW = colW * N;

  const colorOf = (b) => (b === "G" ? G_COLOR : H_COLOR);
  const isCovered = (i) => breeds[i] === patchBreed && i >= patchLeft && i <= patchRight;

  return (
    <div style={{
      background: "#fff",
      border: `1.5px solid ${C.border}`,
      borderRadius: 12,
      padding: 14,
      marginTop: 4,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 6 }}>
        👀 {t(E, "See it on the number line", "수직선에서 한눈에")}
      </div>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 10 }}>
        {t(E,
          "Cows: G H G H G   ·   K = 1   ·   Example: place ONE G patch at position 1 → it reaches [0..2].",
          "소: G H G H G   ·   K = 1   ·   예: G 패치 한 개를 위치 1 에 놓으면 → [0..2] 까지 도달.")}
      </div>

      <div style={{ overflowX: "auto", paddingBottom: 4 }}>
        <div style={{ position: "relative", width: totalW, minWidth: totalW, margin: "0 auto" }}>
          {/* Cow row */}
          <div style={{ display: "flex" }}>
            {breeds.map((b, i) => (
              <div key={i} style={{ width: colW, textAlign: "center" }}>
                <div style={{ fontSize: 22 }}>🐄</div>
                <div style={{
                  fontSize: 12, fontWeight: 800, color: colorOf(b),
                  marginTop: -2,
                }}>{b}</div>
              </div>
            ))}
          </div>

          {/* Patch coverage bar — drawn under cows, above number line */}
          <div style={{ position: "relative", height: 22, margin: "4px 0 2px" }}>
            <div style={{
              position: "absolute",
              left: patchLeft * colW + colW * 0.1,
              width: (patchRight - patchLeft + 1) * colW - colW * 0.2,
              top: 4,
              height: 14,
              background: `${G_COLOR}33`,
              border: `1.5px solid ${G_COLOR}`,
              borderRadius: 7,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, color: G_COLOR,
            }}>
              {t(E, "G patch reach", "G 패치 도달 범위")}
            </div>
          </div>

          {/* Number line */}
          <div style={{
            position: "relative",
            height: lineH,
            background: "#cbd5e1",
            borderRadius: lineH,
            margin: "2px 0 4px",
          }} />

          {/* Position labels */}
          <div style={{ display: "flex" }}>
            {breeds.map((_, i) => (
              <div key={i} style={{
                width: colW, textAlign: "center",
                fontSize: 11, color: C.dim, fontFamily: "monospace",
              }}>{i}</div>
            ))}
          </div>

          {/* Coverage marks */}
          <div style={{ display: "flex", marginTop: 4 }}>
            {breeds.map((b, i) => {
              const covered = isCovered(i);
              return (
                <div key={i} style={{ width: colW, textAlign: "center", fontSize: 14 }}>
                  {covered
                    ? <span style={{ color: G_COLOR, fontWeight: 800 }}>✓</span>
                    : (b === "H"
                        ? <span style={{ color: H_COLOR, fontSize: 10 }}>{t(E, "needs H", "H 필요")}</span>
                        : <span style={{ color: "#94a3b8", fontSize: 10 }}>—</span>)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 8, padding: "6px 10px",
        background: "#f0fdf4", border: "1px dashed #6ee7b7",
        borderRadius: 8, fontSize: 11, color: "#065f46", lineHeight: 1.5,
      }}>
        {t(E,
          "One G patch satisfies cows G at positions 0 and 2 (same breed, within K). The H cows still need their own H patches.",
          "G 패치 하나가 위치 0 과 2 의 G 소를 동시에 만족 (같은 품종, K 이내). H 소들은 각자 H 패치가 필요해요.")}
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


export function downloadFeedCowsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "FeedCows — Full Study Guide", "FeedCows — 종합 풀이 노트");
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

