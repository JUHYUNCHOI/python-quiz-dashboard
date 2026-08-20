import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";
const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* ═══════════════════════════════════════════════════════════════
   Cookie flips.
   B flips a cookie HORIZONTALLY (left↔right):  p↔q,  b↔d
   C flips a cookie VERTICALLY   (up↔down):     p↔b,  q↔d
   ═══════════════════════════════════════════════════════════════ */
const FLIP_H = { p: "q", q: "p", b: "d", d: "b" };
const FLIP_V = { p: "b", b: "p", q: "d", d: "q" };
const SHAPE_COLOR = { p: "#ea580c", q: "#0284c7", b: "#16a34a", d: "#9333ea" };

function buildGrid(scroll) {
  let grid = [["p"]];
  for (const op of scroll) {
    if (op === "A") {
      // copy to the RIGHT, unchanged
      grid = grid.map((row) => [...row, ...row]);
    } else if (op === "B") {
      // copy to the RIGHT, each cookie flipped horizontally
      grid = grid.map((row) => [...row, ...row.map((ch) => FLIP_H[ch])]);
    } else {
      // copy BELOW, each cookie flipped vertically
      grid = [...grid.map((r) => [...r]), ...grid.map((row) => row.map((ch) => FLIP_V[ch]))];
    }
  }
  return grid;
}

/* ═══════════════════════════════════════════════════════════════
   Mcc22BirthdayCookieSim — start from a single 'p' cookie, click
   A / B / C to grow the grid one step at a time and SEE the copy +
   flips. Click any cookie to read its row-major number. Kept tiny
   (≤ 8×8) so the doubling is visible before it explodes to 2^N.
   ═══════════════════════════════════════════════════════════════ */
export function Mcc22BirthdayCookieSim({ E }) {
  const [scroll, setScroll] = useState(["A", "B", "C"]);
  const [sel, setSel] = useState(null); // { r, c } or null

  const grid = buildGrid(scroll);
  const rows = grid.length;
  const cols = grid[0].length;

  const canGrowRight = cols * 2 <= 8;
  const canGrowDown = rows * 2 <= 8;

  const add = (op) => { setScroll([...scroll, op]); setSel(null); };
  const undo = () => { setScroll(scroll.slice(0, -1)); setSel(null); };
  const reset = () => { setScroll([]); setSel(null); };

  const selIndex = sel ? sel.r * cols + sel.c + 1 : null;
  const selShape = sel ? grid[sel.r][sel.c] : null;

  const cellSize = cols <= 4 ? 34 : cols <= 6 ? 28 : 24;

  const opBtn = (op, label, on) => (
    <button
      key={op}
      onClick={() => add(op)}
      disabled={!on}
      style={{
        padding: "7px 10px", borderRadius: 8, cursor: on ? "pointer" : "not-allowed",
        border: `1.5px solid ${on ? A : "#e5e7eb"}`,
        background: on ? "#fff7ed" : "#f9fafb", color: on ? "#9a3412" : "#cbd5e1",
        fontSize: 12, fontWeight: 700, lineHeight: 1.35, textAlign: "left", flex: 1, minWidth: 132, ...KA,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace" }}>{op}</div>
      <div style={{ fontSize: 10.5, fontWeight: 600 }}>{label}</div>
    </button>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 6 }}>
          🍪 {t(E, "Grow the cookie grid", "쿠키 격자 키우기")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "Start with one 'p' cookie. Add a letter and watch the grid DOUBLE: A copies right, B copies right + flips left↔right, C copies down + flips up↔down.",
            "'p' 쿠키 한 개로 시작해요. 글자를 더하면 격자가 두 배로 늘어나요: A 는 오른쪽 복사, B 는 오른쪽 복사 + 좌우 뒤집기, C 는 아래쪽 복사 + 위아래 뒤집기.")}
        </div>

        {/* scroll so far */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 11, color: "#9a3412", fontWeight: 700 }}>{t(E, "scroll:", "두루마리:")}</span>
          {scroll.length === 0 && (
            <span style={{ fontSize: 12, color: C.dim, fontStyle: "italic" }}>{t(E, "(empty — one 'p')", "(비어 있음 — 'p' 하나)")}</span>
          )}
          {scroll.map((op, i) => (
            <span key={i} style={{
              ...NW, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800,
              color: "#9a3412", background: "#fff", border: "1px solid #fdba74", borderRadius: 6, padding: "2px 8px",
            }}>{op}</span>
          ))}
          <span style={{ fontSize: 11, color: C.dim, marginLeft: "auto", ...NW }}>
            {rows} × {cols} = {rows * cols}{t(E, " cookies", "개")}
          </span>
        </div>

        {/* the grid */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, overflowX: "auto" }}>
          <div style={{ display: "inline-block" }}>
            {grid.map((row, r) => (
              <div key={r} style={{ display: "flex", gap: 3, marginBottom: 3 }}>
                {row.map((ch, c) => {
                  const isSel = sel && sel.r === r && sel.c === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setSel(isSel ? null : { r, c })}
                      style={{
                        width: cellSize, height: cellSize, padding: 0, cursor: "pointer",
                        borderRadius: 7, border: `2px solid ${isSel ? "#111827" : "#fde4c8"}`,
                        background: isSel ? "#111827" : "#fff",
                        color: isSel ? "#fff" : SHAPE_COLOR[ch],
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: cellSize <= 24 ? 15 : 18, fontWeight: 800,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >{ch}</button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* selected cell read-out */}
        <div style={{
          background: sel ? "#111827" : "#fffbeb", color: sel ? "#f8fafc" : "#92400e",
          border: `1px solid ${sel ? "#111827" : "#fde68a"}`, borderRadius: 8, padding: "8px 12px",
          fontSize: 12.5, textAlign: "center", marginBottom: 12, ...KA,
        }}>
          {sel
            ? (<span style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                {t(E, "cookie #", "쿠키 #")}<b style={{ color: "#fbbf24" }}>{selIndex}</b>
                {"  ( "}{t(E, "row ", "행 ")}{sel.r + 1}, {t(E, "col ", "열 ")}{sel.c + 1}{" )  →  "}
                <b style={{ color: "#34d399", fontSize: 15 }}>'{selShape}'</b>
              </span>)
            : t(E, "👆 Tap any cookie to see its number (left→right, top→bottom).",
                  "👆 아무 쿠키나 눌러 번호를 봐요 (왼→오, 위→아래 순서).")}
        </div>

        {/* controls */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
          {opBtn("A", t(E, "copy right", "오른쪽 복사"), canGrowRight)}
          {opBtn("B", t(E, "copy right, flip ↔", "오른쪽 복사, 좌우 뒤집기"), canGrowRight)}
          {opBtn("C", t(E, "copy down, flip ↕", "아래 복사, 위아래 뒤집기"), canGrowDown)}
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 }}>
          <button onClick={undo} disabled={scroll.length === 0} style={{
            padding: "5px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
            background: "transparent", color: scroll.length ? C.dim : "#d1d5db",
            fontSize: 11, fontWeight: 700, cursor: scroll.length ? "pointer" : "not-allowed",
          }}>{t(E, "↶ Undo", "↶ 되돌리기")}</button>
          <button onClick={reset} disabled={scroll.length === 0} style={{
            padding: "5px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
            background: "transparent", color: scroll.length ? C.dim : "#d1d5db",
            fontSize: 11, fontWeight: 700, cursor: scroll.length ? "pointer" : "not-allowed",
          }}>{t(E, "↻ Reset", "↻ 초기화")}</button>
        </div>

        {(!canGrowRight || !canGrowDown) && (
          <div style={{ fontSize: 11, color: "#9a3412", textAlign: "center", marginBottom: 8, ...KA }}>
            {t(E, "(Grid capped at 8×8 here so you can still see it.)",
                  "(여기서는 8×8 까지만 — 눈에 보이게 하려고 제한했어요.)")}
          </div>
        )}

        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: "#92400e", lineHeight: 1.55, ...KA }}>
          {t(E,
            "💡 Each letter DOUBLES the grid. After N letters it is 2^N cookies — with N up to 10000 that's astronomically huge. So we can never build it. Instead, for a queried number, we'll trace it BACKWARD through the scroll.",
            "💡 글자 하나가 격자를 두 배로 늘려요. N 글자 뒤엔 2^N 개 — N 이 최대 10000 이면 천문학적으로 커요. 그래서 절대 직접 만들 수 없어요. 대신 물어본 번호 하나를 두루마리를 거꾸로 따라가며 추적할 거예요.")}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE  (verified → pqpdppdd, 0/20000 brute mismatches)
   Fast: never build the 2^N grid. For each queried number, convert
   it to (row, col) in the final grid, then walk the scroll BACKWARD.
   Saturating-doubling row/col counts (capped just above the max
   index) tell us, at each step, whether the query sits in the
   original half or the copied half; the copy carries a flip, so we
   accumulate horizontal/vertical flip parity, then read off p/q/b/d.
   ================================================================ */
const FULL_PY = [
  "import sys",
  "",
  "def solve():",
  "    data = sys.stdin.read().split('\\n')",
  "    N, S, Q = map(int, data[0].split())      # N letters, S scrolls, Q friends",
  "    scrolls = [data[1 + i].strip() for i in range(S)]",
  "    friends = list(map(int, data[1 + S].split()))",
  "",
  "    CAP = 2 * 10**9                           # a ceiling just above the biggest index",
  "    shape = {(0, 0): 'p', (1, 0): 'q', (0, 1): 'b', (1, 1): 'd'}",
  "    answer = []",
  "",
  "    for scroll in scrolls:",
  "        # grid width / height after each of the N steps (doubling, but capped)",
  "        rows = [1] * (N + 1)",
  "        cols = [1] * (N + 1)",
  "        for i in range(1, N + 1):",
  "            if scroll[i - 1] in 'AB':          # A / B grow RIGHT -> width doubles",
  "                cols[i] = min(cols[i - 1] * 2, CAP)",
  "                rows[i] = rows[i - 1]",
  "            else:                              # C grows DOWN -> height doubles",
  "                rows[i] = min(rows[i - 1] * 2, CAP)",
  "                cols[i] = cols[i - 1]",
  "        width = cols[N]",
  "",
  "        for f in friends:",
  "            r = (f - 1) // width + 1           # 1-D number -> (row, col)",
  "            c = (f - 1) % width + 1",
  "            flip_h = flip_v = 0",
  "            for i in range(N, 0, -1):          # walk the scroll BACKWARD",
  "                if scroll[i - 1] in 'AB':",
  "                    if c > cols[i - 1]:        # in the copied RIGHT half?",
  "                        c -= cols[i - 1]",
  "                        if scroll[i - 1] == 'B':",
  "                            flip_h ^= 1        # B flipped this copy horizontally",
  "                else:",
  "                    if r > rows[i - 1]:        # in the copied BOTTOM half?",
  "                        r -= rows[i - 1]",
  "                        flip_v ^= 1            # C flipped this copy vertically",
  "            answer.append(shape[(flip_h, flip_v)])",
  "",
  "    print(''.join(answer))",
  "",
  "solve()",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, S, Q;",
  "    cin >> N >> S >> Q;                 // N letters, S scrolls, Q friends",
  "    vector<string> scrolls(S);",
  "    for (int i = 0; i < S; i++) cin >> scrolls[i];",
  "    vector<long long> friends(Q);",
  "    for (int i = 0; i < Q; i++) cin >> friends[i];",
  "",
  "    const long long CAP = 2000000000LL; // just above the biggest index",
  "    string answer;",
  "    for (const string& scroll : scrolls) {",
  "        // grid width / height after each step (doubling, but capped)",
  "        vector<long long> rows(N + 1, 1), cols(N + 1, 1);",
  "        for (int i = 1; i <= N; i++) {",
  "            if (scroll[i - 1] == 'A' || scroll[i - 1] == 'B') {",
  "                cols[i] = min(cols[i - 1] * 2, CAP); rows[i] = rows[i - 1];",
  "            } else {",
  "                rows[i] = min(rows[i - 1] * 2, CAP); cols[i] = cols[i - 1];",
  "            }",
  "        }",
  "        long long width = cols[N];",
  "        for (long long f : friends) {",
  "            long long r = (f - 1) / width + 1;   // 1-D number -> (row, col)",
  "            long long c = (f - 1) % width + 1;",
  "            int flipH = 0, flipV = 0;",
  "            for (int i = N; i >= 1; i--) {       // walk the scroll BACKWARD",
  "                if (scroll[i - 1] == 'A' || scroll[i - 1] == 'B') {",
  "                    if (c > cols[i - 1]) {       // in the copied RIGHT half?",
  "                        c -= cols[i - 1];",
  "                        if (scroll[i - 1] == 'B') flipH ^= 1;",
  "                    }",
  "                } else {",
  "                    if (r > rows[i - 1]) {       // in the copied BOTTOM half?",
  "                        r -= rows[i - 1];",
  "                        flipV ^= 1;",
  "                    }",
  "                }",
  "            }",
  "            char ch = flipV ? (flipH ? 'd' : 'b') : (flipH ? 'q' : 'p');",
  "            answer += ch;",
  "        }",
  "    }",
  "    cout << answer << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc22BirthdaySections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "The grid after N letters is 2^N cookies (N up to 10000) — never build it. We answer each queried NUMBER on its own.",
            "N 글자 뒤 격자는 2^N 개 (N 최대 10000) — 절대 만들지 않아요. 물어본 번호 하나하나를 따로 풀어요."),
        t(E, "rows[i] / cols[i] hold the grid size after each step. A and B double the width; C doubles the height. We cap at CAP so huge sizes stay safe integers.",
            "rows[i] / cols[i] 는 각 단계 뒤의 격자 크기예요. A·B 는 가로를, C 는 세로를 두 배로. 너무 커지지 않게 CAP 으로 상한을 둬요."),
        t(E, "Turn the number into (row, col), then walk the scroll BACKWARD. At each step ask: was I in the ORIGINAL half or the COPIED half? A copy made by B/C is flipped, so a copied step toggles the flip parity.",
            "번호를 (행, 열) 로 바꾼 뒤 두루마리를 거꾸로 따라가요. 매 단계 물어요: 나는 원본 쪽이었나, 복사본 쪽이었나? B·C 로 만든 복사본은 뒤집혀 있으니, 복사본 쪽이면 뒤집힘 상태를 토글해요."),
        t(E, "Two on/off flips (left↔right, up↔down) give exactly four shapes: (no,no)=p, (H,no)=q, (no,V)=b, (H,V)=d. That's the whole p/q/b/d family.",
            "좌우·상하 두 뒤집힘(켜짐/꺼짐)이 정확히 네 모양을 만들어요: (안,안)=p, (좌우,안)=q, (안,상하)=b, (좌우,상하)=d. 이게 p/q/b/d 한 묶음이에요."),
      ],
      pyOnly: [
        t(E, "shape[(flip_h, flip_v)] reads the final cookie straight from the two flip switches — no if/elif ladder needed.",
            "shape[(flip_h, flip_v)] 로 두 스위치에서 바로 모양을 읽어요 — if/elif 사다리 없이."),
      ],
      cppOnly: [
        t(E, "Use long long for indices and sizes: capped sizes reach ~2×10^9, past the int limit.",
            "인덱스·크기는 long long 으로 — 상한이 약 2×10^9 라 int 범위를 넘어요."),
        t(E, "The nested ?: picks the shape from flipV/flipH, matching the Python dict.",
            "중첩 삼항 ?: 로 flipV/flipH 에서 모양을 골라 Python dict 와 똑같이 동작해요."),
      ],
    },
  ];
}

export function Mcc22BirthdayProgressiveCode(props) {
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


export function downloadMcc22BirthdayPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22Birthday — Full Study Guide", "Mcc22Birthday — 종합 풀이 노트");
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
