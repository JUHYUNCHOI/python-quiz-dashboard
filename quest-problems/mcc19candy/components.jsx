import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";
const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* ═══════════════════════════════════════════════════════════════
   Mcc19CandyShoutSim — set each round's shout (odd / even), watch
   the line thin out round by round on a full line of 2^R people,
   and see which STARTING position ends up as the sole survivor.
   Ties the answer to bits: an "odd" round puts a 1 in that bit,
   an "even" round puts a 0.  Self-contained, no autoplay.
   ═══════════════════════════════════════════════════════════════ */
export function Mcc19CandyShoutSim({ E }) {
  // default matches the official sample: even, even, odd  →  5
  const [shouts, setShouts] = useState(["even", "even", "odd"]);
  const R = shouts.length;

  const toggle = (i) =>
    setShouts((prev) => prev.map((s, j) => (j === i ? (s === "odd" ? "even" : "odd") : s)));
  const addRound = () => setShouts((prev) => (prev.length >= 4 ? prev : [...prev, "even"]));
  const dropRound = () => setShouts((prev) => (prev.length <= 1 ? prev : prev.slice(0, -1)));

  // Build the elimination on a full line of 2^R people, position 1-indexed.
  const rounds = [];
  let people = Array.from({ length: 2 ** R }, (_, i) => i + 1);
  rounds.push({ before: [...people], shout: null, elim: new Set() });
  shouts.forEach((s) => {
    const before = people;
    const elim = new Set();
    const survivors = [];
    before.forEach((num, i) => {
      const pos1 = i + 1;
      const isOddPos = pos1 % 2 === 1;
      const killed = (s === "odd" && isOddPos) || (s === "even" && !isOddPos);
      if (killed) elim.add(i);
      else survivors.push(num);
    });
    rounds.push({ before, after: survivors, shout: s, elim });
    people = survivors;
  });
  const survivor = people[0]; // the one original number left standing

  /* 2026-09-08: 여기 있던 "비트 / 슬롯 i / 1 + 2^i 합" 패널을 걷어냈다.
     초6 학생이 **이 자리에서 그만두고 싶어했다** — "비트가 뭔지 한 번도 설명 안 해줬다."
     대신 마지막 라운드부터 거꾸로 되돌리는 걸 그대로 보여준다.
     지금 자리가 pos 면 한 라운드 전에는 "odd" → pos*2, "even" → pos*2−1 자리였다.
     (510가지 전수 대조로 확인했다.) */
  const undoSteps = [];
  {
    let p = 1;
    for (let i = shouts.length - 1; i >= 0; i--) {
      const before = shouts[i] === "odd" ? p * 2 : p * 2 - 1;
      undoSteps.push({ round: i, shout: shouts[i], from: p, to: before });
      p = before;
    }
  }
  const answerFromUndo = undoSteps.length ? undoSteps[undoSteps.length - 1].to : 1;

  const chip = (num, i, killed) => (
    <div
      key={`${num}-${i}`}
      style={{
        minWidth: 30, height: 40, padding: "0 6px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        borderRadius: 9,
        background: killed ? "#f3f4f6" : num === survivor ? "#dc2626" : "#fef2f2",
        border: `1.5px solid ${killed ? "#d1d5db" : num === survivor ? "#dc2626" : "#fca5a5"}`,
        color: killed ? "#9ca3af" : num === survivor ? "#fff" : "#7f1d1d",
        textDecoration: killed ? "line-through" : "none",
        opacity: killed ? 0.5 : 1,
      }}
    >
      <div style={{ fontSize: 12, lineHeight: 1 }}>🍬</div>
      <div style={{ fontSize: 11, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>
        {num}
      </div>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
          🗣️ {t(E, "Set each round's shout, watch the line thin out", "라운드마다 외침을 정하고, 줄이 줄어드는 걸 봐요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "A full line of 2^R people stands here. \"odd\" removes everyone at an odd position; \"even\" removes the even positions. Survivors renumber from 1. Toggle the shouts and find which STARTING number is the last one left (shown in red).",
            "여기 2^R 명이 한 줄로 서 있어요. \"odd\" 는 홀수 자리를, \"even\" 은 짝수 자리를 없애요. 살아남은 사람은 1 부터 다시 번호를 매겨요. 외침을 바꿔가며, 마지막까지 남는 시작 번호(빨간색)를 찾아봐요.")}
        </div>

        {/* round shout toggles */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: "#7f1d1d", fontWeight: 700 }}>{t(E, "shouts:", "외침:")}</span>
          {shouts.map((s, i) => (
            <button key={i} onClick={() => toggle(i)} style={{
              ...NW, display: "inline-flex", flexDirection: "column", alignItems: "center",
              padding: "4px 10px", borderRadius: 8, cursor: "pointer",
              border: `1.5px solid ${s === "odd" ? "#dc2626" : "#7c3aed"}`,
              background: s === "odd" ? "#dc2626" : "#7c3aed", color: "#fff",
              fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 12.5,
            }}>
              <span style={{ fontSize: 9, opacity: 0.85, fontWeight: 700 }}>{t(E, `round ${i}`, `라운드 ${i}`)}</span>
              {s}
            </button>
          ))}
          <span style={{ display: "inline-flex", gap: 4, marginLeft: 4 }}>
            <button onClick={dropRound} style={rBtn}>−</button>
            <button onClick={addRound} style={rBtn}>+</button>
          </span>
        </div>

        {/* round-by-round elimination */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
          {rounds.map((rd, r) => (
            <div key={r} style={{ background: "#fff", border: "1px solid #f3d0d0", borderRadius: 9, padding: "8px 10px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>
                {r === 0
                  ? t(E, `start — ${rd.before.length} people`, `시작 — ${rd.before.length} 명`)
                  : t(E,
                      `round ${r}: shout "${rd.shout}"  →  keep ${rd.shout === "odd" ? "even" : "odd"} positions`,
                      `라운드 ${r}: 외침 "${rd.shout}"  →  ${rd.shout === "odd" ? "짝수" : "홀수"} 자리 생존`)}
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {rd.before.map((num, i) => chip(num, i, rd.elim.has(i)))}
              </div>
            </div>
          ))}
        </div>

        {/* 답 + 거꾸로 되돌리기 */}
        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, ...KA }}>
          <div>
            {t(E, "sole survivor started at position ", "혼자 남은 사람의 시작 위치 = ")}
            <b style={{ color: "#fbbf24", fontSize: 15 }}>{survivor}</b>
          </div>
          <div style={{ marginTop: 8, color: "#cbd5e1", fontSize: 11.5 }}>
            {t(E, "undo the rounds, last one first:", "라운드를 마지막부터 거꾸로 되돌리면:")}
          </div>
          {undoSteps.map((u, k) => (
            <div key={k} style={{ marginTop: 3, ...NW }}>
              <span style={{ color: "#64748b" }}>
                {t(E, `round ${u.round + 1} `, `라운드 ${u.round + 1} `)}
              </span>
              <b style={{ color: u.shout === "odd" ? "#f87171" : "#a78bfa" }}>{u.shout}</b>
              <span style={{ color: "#8b949e" }}>
                {u.shout === "odd" ? "  →  ×2  " : "  →  ×2 − 1  "}
              </span>
              <span style={{ color: "#cbd5e1" }}>{u.from} → </span>
              <b style={{ color: "#fbbf24" }}>{u.to}</b>
            </div>
          ))}
          <div style={{ marginTop: 6, color: "#6ee7b7" }}>
            {t(E, "start position = ", "시작 위치 = ")}
            <b style={{ color: "#34d399" }}>{answerFromUndo}</b>
          </div>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            "Why? \"odd\" wipes out the odd positions, so a survivor now standing at p was at 2p before. \"even\" wipes out the even ones, so p was at 2p − 1. Undo the rounds backwards and you never have to line the people up at all.",
            "왜 그럴까요? \"odd\" 는 홀수 자리를 지우니, 지금 p 번째인 사람은 그전엔 2p 번째에 있었어요.\n\"even\" 은 짝수 자리를 지우니 2p − 1 번째였고요.\n라운드를 거꾸로 되돌리면 사람을 한 줄로 세울 필요가 아예 없어요.")}
        </div>
      </div>
    </div>
  );
}
const rBtn = {
  width: 26, height: 26, borderRadius: 6, border: "1px solid #fca5a5", background: "#fff",
  color: "#7f1d1d", fontSize: 16, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};

/* ================================================================
   SOLUTION CODE  (fast: read the shouts, sum a bit per "odd" round)
   ================================================================ */
const FULL_PY = [
  "R = int(input())",
  "shouts = input().split()",
  "",
  "# 마지막 라운드부터 거꾸로 되돌려요.",
  "# 지금 자리가 pos 라면, 한 라운드 전에는",
  "#   \"odd\" 를 외쳤으면  pos * 2      자리에 있었고",
  "#   \"even\" 을 외쳤으면 pos * 2 - 1  자리에 있었어요",
  "pos = 1",
  "for i in range(R - 1, -1, -1):",
  "    if shouts[i] == \"odd\":",
  "        pos = pos * 2",
  "    else:",
  "        pos = pos * 2 - 1",
  "",
  "print(pos)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int R;",
  "    cin >> R;",
  "    vector<string> shouts(R);",
  "    for (int i = 0; i < R; i++) {",
  "        cin >> shouts[i];",
  "    }",
  "",
  "    // 마지막 라운드부터 거꾸로 되돌려요",
  "    long long pos = 1;",
  "    for (int i = R - 1; i >= 0; i--) {",
  "        if (shouts[i] == \"odd\") {",
  "            pos = pos * 2;",
  "        } else {",
  "            pos = pos * 2 - 1;",
  "        }",
  "    }",
  "",
  "    cout << pos << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc19CandySections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Work backwards from the end: Bob must finish at position 1, so undo the rounds from last to first.",
            "끝에서부터 거꾸로 봐요: Bob 은 자리 1 로 끝나야 하니, 마지막 라운드부터 하나씩 되돌려요."),
        /* 2026-09-08: 설명은 "되돌리기" 인데 코드는 "정방향 비트합" 이라 서로 다른 방법이었다.
           학생: "설명은 거꾸로라는데 코드는 앞에서부터 돈다. 왜 안 맞는지 모르겠다."
           코드를 되돌리기로 바꾸고 설명도 같은 말로 맞췄다. 비트는 쓰지 않는다. */
        t(E, "\"odd\" wipes out the odd positions, so someone now standing at p was at 2p one round earlier. \"even\" wipes out the even ones, so p was at 2p − 1.",
            "\"odd\" 는 홀수 자리를 지우니, 지금 p 번째인 사람은 한 라운드 전엔 2p 번째에 있었어요. \"even\" 은 짝수 자리를 지우니 2p − 1 번째였고요.",),
        t(E, "So start at pos = 1 (the last survivor) and undo the rounds from last to first. No line of people is ever built.",
            "그래서 pos = 1 (마지막에 남은 사람)에서 시작해, 라운드를 마지막부터 거꾸로 되돌려요. 사람을 한 줄로 세울 일이 없어요.",),
      ],
      pyOnly: [
        t(E, "input().split() gives the shouts as a list of words; range(R - 1, -1, -1) walks the rounds backwards.",
            "input().split() 은 외침을 단어 리스트로 줘요; range(R - 1, -1, -1) 은 라운드를 거꾸로 훑어요.",),
      ],
      cppOnly: [
        t(E, "pos is a long long — the position doubles every round, so it grows fast.",
            "pos 를 long long 으로 둬요 — 라운드마다 두 배가 되니 금방 커지거든요.",),
        t(E, "Read each shout word into a std::string with cin >> s inside the loop.",
            "반복문 안에서 cin >> s 로 외침 단어를 std::string 에 하나씩 읽어요.",),
      ],
    },
  ];
}

export function Mcc19CandyProgressiveCode(props) {
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


export function downloadMcc19CandyPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc19Candy — Full Study Guide", "Mcc19Candy — 종합 풀이 노트");
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
