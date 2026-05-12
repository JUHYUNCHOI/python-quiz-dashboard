import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ──────────────────────────────────────────────────────────────
   Interactive sim: edit a 3×3 grid + 2 team rosters.
   Live-shows which of the 8 lines are won and by whom (solo or 2-team).
   Helps the student FEEL why we take the SET of letters in each line.
   ────────────────────────────────────────────────────────────── */
export function TeamLineChecker({ E }) {
  const [grid, setGrid] = useState([
    ["A", "B", "C"],
    ["B", "B", "A"],
    ["C", "A", "B"],
  ]);
  const [teamRed, setTeamRed] = useState(["A", "B", "C"]);
  const [teamBlue, setTeamBlue] = useState(["D", "E", "F"]);

  const setCell = (r, c, v) => {
    const ch = (v || "").toUpperCase().slice(-1);
    if (ch && !/^[A-Z]$/.test(ch)) return;
    const g = grid.map(row => row.slice());
    g[r][c] = ch || ".";
    setGrid(g);
  };

  const setRoster = (which, idx, v) => {
    const ch = (v || "").toUpperCase().slice(-1);
    if (ch && !/^[A-Z]$/.test(ch)) return;
    const arr = (which === "red" ? teamRed : teamBlue).slice();
    arr[idx] = ch || "?";
    (which === "red" ? setTeamRed : setTeamBlue)(arr);
  };

  // Build all 8 lines: rows, cols, diagonals
  const lines = [];
  for (let r = 0; r < 3; r++) lines.push({ name: `R${r + 1}`, cells: [grid[r][0], grid[r][1], grid[r][2]] });
  for (let c = 0; c < 3; c++) lines.push({ name: `C${c + 1}`, cells: [grid[0][c], grid[1][c], grid[2][c]] });
  lines.push({ name: "D↘", cells: [grid[0][0], grid[1][1], grid[2][2]] });
  lines.push({ name: "D↙", cells: [grid[0][2], grid[1][1], grid[2][0]] });

  // For each line, decide winner: solo letter, 2-team, or none
  const redSet = new Set(teamRed.filter(x => x && x !== "?"));
  const blueSet = new Set(teamBlue.filter(x => x && x !== "?"));
  const judge = (cells) => {
    const s = new Set(cells);
    if (cells.some(x => !x || x === ".")) return { kind: "none" };
    if (s.size === 1) return { kind: "solo", letters: [...s] };
    if (s.size === 2) {
      const arr = [...s];
      const allRed = arr.every(x => redSet.has(x));
      const allBlue = arr.every(x => blueSet.has(x));
      if (allRed) return { kind: "team", color: "red", letters: arr };
      if (allBlue) return { kind: "team", color: "blue", letters: arr };
      return { kind: "team", color: "mixed", letters: arr };
    }
    return { kind: "none" };
  };

  const judged = lines.map(l => ({ ...l, j: judge(l.cells) }));
  let redWins = 0, blueWins = 0, soloWins = 0, mixedWins = 0;
  for (const l of judged) {
    if (l.j.kind === "solo") soloWins++;
    else if (l.j.kind === "team") {
      if (l.j.color === "red") redWins++;
      else if (l.j.color === "blue") blueWins++;
      else mixedWins++;
    }
  }

  const RED = "#dc2626", BLUE = "#2563eb", SOLO = "#a16207";
  const cellStyle = (ch) => ({
    width: 44, height: 44, textAlign: "center", fontSize: 20, fontWeight: 800,
    fontFamily: "'JetBrains Mono', monospace",
    border: `1.5px solid ${C.border}`, borderRadius: 8, background: "#fff", color: C.text,
    outline: "none",
  });

  const RosterInput = ({ ch, onChange, color }) => (
    <input
      value={ch}
      maxLength={1}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: 28, height: 28, textAlign: "center", fontWeight: 800, fontSize: 14,
        border: `1.5px solid ${color}`, borderRadius: 6, background: "#fff", color, outline: "none",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    />
  );

  const lineColor = (j) => {
    if (j.kind === "solo") return SOLO;
    if (j.kind === "team" && j.color === "red") return RED;
    if (j.kind === "team" && j.color === "blue") return BLUE;
    if (j.kind === "team" && j.color === "mixed") return "#7c3aed";
    return C.dim;
  };

  const lineLabel = (j) => {
    if (j.kind === "solo") return t(E, `Solo ${j.letters[0]}`, `단독 ${j.letters[0]}`);
    if (j.kind === "team" && j.color === "red") return t(E, `Red team {${j.letters.join(",")}}`, `빨강 팀 {${j.letters.join(",")}}`);
    if (j.kind === "team" && j.color === "blue") return t(E, `Blue team {${j.letters.join(",")}}`, `파랑 팀 {${j.letters.join(",")}}`);
    if (j.kind === "team" && j.color === "mixed") return t(E, `2-team {${j.letters.join(",")}}`, `2 명 팀 {${j.letters.join(",")}}`);
    return t(E, "no win", "우승 없음");
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{
        background: "#fef2f2", border: `1.5px solid ${A}`, borderRadius: 10,
        padding: "10px 14px", marginBottom: 12, textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
          🎮 {t(E, "Try It — Line Checker", "직접 해봐 — 줄 검사기")}
        </div>
        <div style={{ fontSize: 12, color: "#7f1d1d", lineHeight: 1.5 }}>
          {t(E,
            "Edit any cell (A–Z) and the two team rosters. The 8 lines are judged live: solo win, 2-team win, or nothing.",
            "어떤 칸이든 (A–Z) 바꿔봐 + 두 팀 명단도 바꿔봐. 8 개 줄을 실시간 판정 — 단독 / 2 명 팀 / 우승 없음.")}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 12 }}>
        {/* Grid */}
        <div style={{
          background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 10,
          padding: 12,
        }}>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 6, textAlign: "center", fontWeight: 700 }}>
            {t(E, "3×3 Grid", "3×3 격자")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 44px)", gap: 6 }}>
            {grid.map((row, r) => row.map((ch, c) => (
              <input
                key={`${r}-${c}`}
                value={ch === "." ? "" : ch}
                maxLength={1}
                onChange={(e) => setCell(r, c, e.target.value)}
                style={cellStyle(ch)}
              />
            )))}
          </div>
        </div>

        {/* Rosters */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{
            background: "#fef2f2", border: `1.5px solid ${RED}`, borderRadius: 10, padding: 10,
          }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: RED, marginBottom: 6 }}>
              🟥 {t(E, "Red team", "빨강 팀")}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {teamRed.map((ch, i) => (
                <RosterInput key={i} ch={ch} onChange={(v) => setRoster("red", i, v)} color={RED} />
              ))}
            </div>
          </div>
          <div style={{
            background: "#eff6ff", border: `1.5px solid ${BLUE}`, borderRadius: 10, padding: 10,
          }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: BLUE, marginBottom: 6 }}>
              🟦 {t(E, "Blue team", "파랑 팀")}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {teamBlue.map((ch, i) => (
                <RosterInput key={i} ch={ch} onChange={(v) => setRoster("blue", i, v)} color={BLUE} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Line judgment table */}
      <div style={{
        background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, color: C.dim, marginBottom: 6, fontWeight: 700 }}>
          {t(E, "8 lines · live judgment", "8 개 줄 · 실시간 판정")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 6 }}>
          {judged.map((l, i) => {
            const col = lineColor(l.j);
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "4px 8px", borderRadius: 6,
                background: l.j.kind === "none" ? "#f8fafc" : `${col}15`,
                border: `1px solid ${l.j.kind === "none" ? C.border : col}`,
                fontSize: 12,
              }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: C.dim, minWidth: 24 }}>{l.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: C.text }}>{l.cells.join("")}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: col }}>{lineLabel(l.j)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Score summary */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        <Tally color={SOLO}  label={t(E, "Solo wins", "단독 우승")}     n={soloWins} />
        <Tally color={RED}   label={t(E, "Red 2-team wins", "빨강 2명 팀")} n={redWins} />
        <Tally color={BLUE}  label={t(E, "Blue 2-team wins", "파랑 2명 팀")} n={blueWins} />
        <Tally color="#7c3aed" label={t(E, "Mixed 2-team", "혼합 2명 팀")} n={mixedWins} />
      </div>

      <div style={{
        marginTop: 12, padding: "8px 12px",
        background: "#fffbeb", border: "1px solid #fbbf24", borderRadius: 8,
        fontSize: 11, color: "#92400e", lineHeight: 1.5,
      }}>
        💡 {t(E,
          "Notice: the SET of 3 letters in a line tells you the answer. Size 1 → solo. Size 2 → 2-team. Size 3 → no win. That's the whole algorithm.",
          "핵심: 한 줄의 3 글자 집합 크기로 판정. 크기 1 → 단독. 크기 2 → 2 명 팀. 크기 3 → 우승 없음. 이게 알고리즘 전부.")}
      </div>
    </div>
  );
}

function Tally({ color, label, n }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "6px 12px", minWidth: 80,
      background: `${color}15`, border: `1.5px solid ${color}`, borderRadius: 8,
    }}>
      <span style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 0.3 }}>{label}</span>
      <span style={{ fontSize: 22, fontWeight: 800, color, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>{n}</span>
    </div>
  );
}

const FULL_PY = [
  "grid = []",
  "for _ in range(3):",
  "    grid.append(input())",
  "",
  "lines = []",
  "for r in range(3):",
  "    lines.append((grid[r][0], grid[r][1], grid[r][2]))",
  "for c in range(3):",
  "    lines.append((grid[0][c], grid[1][c], grid[2][c]))",
  "lines.append((grid[0][0], grid[1][1], grid[2][2]))",
  "lines.append((grid[0][2], grid[1][1], grid[2][0]))",
  "",
  "individual = set()",
  "team = set()",
  "",
  "for a, b, c in lines:",
  "    s = {a, b, c}",
  "    if len(s) == 1:",
  "        individual.add(a)",
  "    elif len(s) == 2:",
  "        team.add(frozenset(s))",
  "",
  "print(len(individual))",
  "print(len(team))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <set>",
  "using namespace std;",
  "",
  "int main() {",
  "    vector<string> grid(3);",
  "    for (auto& r : grid) cin >> r;",
  "    set<set<char>> single, pair_;",
  "    auto check = [&](char a, char b, char c) {",
  "        set<char> s = {a, b, c};",
  "        if (s.size() == 1) single.insert(s);",
  "        if (s.size() == 2) pair_.insert(s);",
  "    };",
  "    for (int r = 0; r < 3; r++) check(grid[r][0], grid[r][1], grid[r][2]);",
  "    for (int c = 0; c < 3; c++) check(grid[0][c], grid[1][c], grid[2][c]);",
  "    check(grid[0][0], grid[1][1], grid[2][2]);",
  "    check(grid[0][2], grid[1][1], grid[2][0]);",
  "    cout << single.size() << \"\\n\" << pair_.size() << \"\\n\";",
  "    return 0;",
  "}",
];

export function getTeamTttSections(E) {
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
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) — 코드 의도가 명확해져."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합/곱이 약 2×10^9를 넘을 수 있으면 long long 사용."),
      ],
    },
  ];
}

export function TeamTttProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
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


export function downloadTeamTttPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "TeamTtt — Full Study Guide", "TeamTtt — 종합 풀이 노트");
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

