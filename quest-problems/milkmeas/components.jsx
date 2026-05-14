// 🔒 USACO_VERIFIED — cpid=761, milkmeas (2017 Dec Bronze #3)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ═══════════════════════════════════════════════════════════════
   MilkMeasSim — replay a sorted event log; watch leader set change
   Bilingual via t(E, EN, KO)
   ═══════════════════════════════════════════════════════════════ */
const _COW_NAMES = ["Bessie", "Elsie", "Mildred"];
const _COW_COLORS = ["#8b5cf6", "#0891b2", "#f97316"];

const _MM_PRESETS = [
  {
    label: { en: "Tiny (3 events)", ko: "초간단 (3 이벤트)" },
    events: [
      { day: 1, cow: 0, delta: +5 },  // Bessie 7->12
      { day: 2, cow: 1, delta: +6 },  // Elsie 7->13 (leader change)
      { day: 3, cow: 2, delta: +7 },  // Mildred 7->14 (leader change)
    ],
  },
  {
    label: { en: "Tied leaders", ko: "공동 리더" },
    events: [
      { day: 1, cow: 0, delta: +3 },  // Bessie 10
      { day: 2, cow: 1, delta: +3 },  // Elsie 10 -> tie {B,E}
      { day: 3, cow: 2, delta: +3 },  // Mildred 10 -> tie {B,E,M}
      { day: 4, cow: 0, delta: +1 },  // Bessie 11 -> {B}
    ],
  },
  {
    label: { en: "Drop & rebound", ko: "감소 후 반등" },
    events: [
      { day: 1, cow: 0, delta: +5 },   // Bessie 12
      { day: 2, cow: 0, delta: -6 },   // Bessie 6 -> {Elsie, Mildred}
      { day: 3, cow: 1, delta: +4 },   // Elsie 11 -> {Elsie}
      { day: 4, cow: 2, delta: +4 },   // Mildred 11 -> {Elsie, Mildred}
    ],
  },
];

function _leaderSet(milk) {
  const mx = Math.max(...milk);
  const s = [];
  for (let i = 0; i < milk.length; i++) if (milk[i] === mx) s.push(i);
  return s;
}
function _setEq(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export function MilkMeasSim({ E }) {
  const [pi, setPi] = useState(0);
  const [step, setStep] = useState(0);
  const events = _MM_PRESETS[pi].events;

  // Replay events from start through current step
  const milk = [7, 7, 7];
  let prevLeaders = _leaderSet(milk);
  let changeCount = 0;
  const history = [{ milk: [...milk], leaders: [...prevLeaders], changed: false, event: null }];
  for (let k = 0; k < step; k++) {
    const ev = events[k];
    milk[ev.cow] += ev.delta;
    const cur = _leaderSet(milk);
    const changed = !_setEq(cur, prevLeaders);
    if (changed) changeCount++;
    history.push({ milk: [...milk], leaders: [...cur], changed, event: ev });
    prevLeaders = cur;
  }
  const cur = history[history.length - 1];
  const maxBar = Math.max(15, ...history.flatMap(h => h.milk));

  const reset = (newPi) => { setPi(newPi); setStep(0); };

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_MM_PRESETS.map((p, i) => (
          <button key={i} onClick={() => reset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            {E ? p.label.en : p.label.ko}
          </button>
        ))}
      </div>

      {/* bar chart — 3 cows */}
      <div style={{
        background: "#faf5ff", border: `1px solid #c4b5fd`, borderRadius: 10,
        padding: "14px 12px 10px", marginBottom: 10,
      }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end", justifyContent: "center", height: 130 }}>
          {[0, 1, 2].map(ci => {
            const v = cur.milk[ci];
            const isLeader = cur.leaders.includes(ci);
            const h = Math.max(8, (v / maxBar) * 110);
            return (
              <div key={ci} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  fontSize: 12, fontWeight: 800,
                  color: isLeader ? _COW_COLORS[ci] : C.dim,
                  fontFamily: "'JetBrains Mono',monospace",
                }}>
                  {v}{isLeader ? " 👑" : ""}
                </div>
                <div style={{
                  width: 56, height: h,
                  background: isLeader ? _COW_COLORS[ci] : "#e5e7eb",
                  border: `2px solid ${isLeader ? _COW_COLORS[ci] : "#d1d5db"}`,
                  borderRadius: "6px 6px 0 0",
                  transition: "height 0.3s, background 0.2s",
                }} />
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: isLeader ? _COW_COLORS[ci] : C.dim,
                }}>
                  {_COW_NAMES[ci]}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginTop: 6 }}>
          {t(E, "Leader set", "리더 집합")}: <b style={{ color: A }}>
            {"{" + cur.leaders.map(i => _COW_NAMES[i]).join(", ") + "}"}
          </b>
        </div>
      </div>

      {/* event log */}
      <div style={{
        background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10,
        padding: 8, marginBottom: 10, fontSize: 12,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, padding: "2px 6px 6px", letterSpacing: 0.4 }}>
          {t(E, "EVENT LOG (sorted by day)", "이벤트 로그 (날짜순 정렬)")}
        </div>
        {events.map((ev, i) => {
          const applied = i < step;
          const isCurrent = i === step - 1;
          const row = history[i + 1];
          const changed = row && row.changed;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "5px 8px", borderRadius: 6, marginBottom: 2,
              background: isCurrent ? (changed ? "#fef3c7" : "#ede9fe") : (applied ? "#f9fafb" : "transparent"),
              opacity: applied ? 1 : 0.45,
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              <span style={{ width: 24, color: C.dim, fontSize: 11 }}>#{i + 1}</span>
              <span style={{ width: 50, fontSize: 11, color: C.dim }}>
                {t(E, "day", "날짜")} {ev.day}
              </span>
              <span style={{ color: _COW_COLORS[ev.cow], fontWeight: 700, minWidth: 60 }}>
                {_COW_NAMES[ev.cow]}
              </span>
              <span style={{ fontWeight: 700, color: ev.delta >= 0 ? "#15803d" : "#dc2626" }}>
                {ev.delta >= 0 ? "+" : ""}{ev.delta}
              </span>
              {applied && changed && (
                <span style={{
                  marginLeft: "auto", fontSize: 10, fontWeight: 800, color: "#92400e",
                  background: "#fde68a", padding: "2px 6px", borderRadius: 4,
                }}>
                  {t(E, "LEADER CHANGED", "리더 변경")}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* controls + counter */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => setStep(0)} disabled={step === 0} style={{
          padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "#fff", color: step === 0 ? C.dim : C.text,
          fontSize: 12, fontWeight: 700, cursor: step === 0 ? "default" : "pointer",
        }}>
          ⏮ {t(E, "Reset", "처음")}
        </button>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
          padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "#fff", color: step === 0 ? C.dim : C.text,
          fontSize: 12, fontWeight: 700, cursor: step === 0 ? "default" : "pointer",
        }}>
          ◀ {t(E, "Back", "뒤로")}
        </button>
        <button onClick={() => setStep(Math.min(events.length, step + 1))} disabled={step >= events.length} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${A}`,
          background: step >= events.length ? "#e5e7eb" : A,
          color: step >= events.length ? C.dim : "#fff",
          fontSize: 12, fontWeight: 800, cursor: step >= events.length ? "default" : "pointer",
        }}>
          {t(E, "Next event", "다음 이벤트")} ▶
        </button>

        <div style={{
          marginLeft: 6,
          background: "#ede9fe", border: `1.5px solid ${A}`, borderRadius: 10,
          padding: "6px 14px", textAlign: "center",
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.4 }}>
            {t(E, "DISPLAY CHANGES", "표시 변경 횟수")}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
            {changeCount}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginTop: 10 }}>
        {t(E,
          "Step through events. The crown 👑 marks current leaders. When the leader set differs from the previous one, the counter ticks up.",
          "이벤트를 한 단계씩. 👑 는 지금 리더. 리더 집합이 이전과 다르면 카운터가 1 증가.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('measurement.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "# 3 cows: Bessie, Elsie, Mildred, 시작 우유량 7",
  "milk = {'Bessie': 7, 'Elsie': 7, 'Mildred': 7}",
  "",
  "# 각 변화 (day, name, delta)",
  "days = []",
  "names = []",
  "deltas = []",
  "for i in range(N):",
  "    parts = lines[1 + i].split()",
  "    days.append(int(parts[0]))",
  "    names.append(parts[1])",
  "    deltas.append(int(parts[2]))",
  "",
  "# day 기준 정렬 — parallel sort via triple list",
  "events = []",
  "for i in range(N):",
  "    events.append((days[i], names[i], deltas[i]))",
  "events.sort()",
  "",
  "def get_leaders_str():",
  "    mx = -10**9",
  "    for c in milk:",
  "        if milk[c] > mx:",
  "            mx = milk[c]",
  "    leaders = []",
  "    for c in milk:",
  "        if milk[c] == mx:",
  "            leaders.append(c)",
  "    leaders.sort()",
  "    return ','.join(leaders)",
  "",
  "display_changes = 0",
  "prev = get_leaders_str()",
  "for i in range(N):",
  "    name = events[i][1]",
  "    delta = events[i][2]",
  "    if name not in milk:",
  "        milk[name] = 7",
  "    milk[name] += delta",
  "    cur = get_leaders_str()",
  "    if cur != prev:",
  "        display_changes += 1",
  "    prev = cur",
  "",
  "with open('measurement.out', 'w') as file:",
  "    file.write(str(display_changes) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "#include <map>",
  "#include <set>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"measurement.in\");",
  "    ofstream fout(\"measurement.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<int> days(N);",
  "    vector<string> names(N);",
  "    vector<int> deltas(N);",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> days[i] >> names[i] >> deltas[i];",
  "    }",
  "    // day 기준 정렬 (parallel sort via indices)",
  "    vector<int> idx(N);",
  "    for (int i = 0; i < N; i++) idx[i] = i;",
  "    for (int i = 0; i < N; i++) {",
  "        for (int j = i + 1; j < N; j++) {",
  "            if (days[idx[j]] < days[idx[i]]) {",
  "                int tmp = idx[i]; idx[i] = idx[j]; idx[j] = tmp;",
  "            }",
  "        }",
  "    }",
  "",
  "    map<string, int> milk;",
  "    milk[\"Bessie\"] = 7;",
  "    milk[\"Elsie\"] = 7;",
  "    milk[\"Mildred\"] = 7;",
  "    set<string> top;",
  "    top.insert(\"Bessie\");",
  "    top.insert(\"Elsie\");",
  "    top.insert(\"Mildred\");",
  "    int changes = 0;",
  "",
  "    for (int k = 0; k < N; k++) {",
  "        string name = names[idx[k]];",
  "        int delta = deltas[idx[k]];",
  "        if (milk.count(name) == 0) milk[name] = 7;",
  "        milk[name] += delta;",
  "        // top 다시 찾기",
  "        int maxM = -1000000000;",
  "        for (auto& p : milk) {",
  "            if (p.second > maxM) maxM = p.second;",
  "        }",
  "        set<string> newTop;",
  "        for (auto& p : milk) {",
  "            if (p.second == maxM) newTop.insert(p.first);",
  "        }",
  "        if (newTop != top) {",
  "            changes++;",
  "            top = newTop;",
  "        }",
  "    }",
  "    fout << changes << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMilkMeasSections(E) {
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
        t(E, "tuple<int, string, int> sorts by day first because of the natural lex order.",
            "tuple<int, string, int>는 사전식 순서 덕분에 day 기준으로 자연 정렬."),
        t(E, "set<string> top != newTop compares membership directly, no manual loop needed.",
            "set<string> top != newTop으로 멤버십을 직접 비교, 수동 루프 불필요."),
      ],
    },
  ];
}

export function MilkMeasProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
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


export function downloadMilkMeasPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MilkMeas — Full Study Guide", "MilkMeas — 종합 풀이 노트");
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

