import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ================================================================
   StackSim — 공식 샘플 [3, 4, 4, 5, 9, 9, 5, 2] 를 한 바씩 따라가요.
   9,9 를 지우면 5 와 5 가 붙는 "연쇄"가 눈에 보이는 게 핵심.
   ================================================================ */
const SIM_BARS = [3, 4, 4, 5, 9, 9, 5, 2];
// Each frame: {idx, stack[], total, removed[], action}
const SIM_FRAMES = [
  { idx: -1, stack: [], total: 0, removed: [],
    actionEN: "Start: the stack is empty and nothing has been taken yet.",
    actionKO: "시작: 스택은 비었고, 아직 가져간 초콜릿은 없어요." },
  { idx: 0, stack: [3], total: 0, removed: [],
    actionEN: "Bar 3: nothing to compare with → keep it on the stack.",
    actionKO: "바 3: 비교할 게 없어요 → 스택에 올려둬요." },
  { idx: 1, stack: [3, 4], total: 0, removed: [],
    actionEN: "Bar 4: the top is 3, different → keep 4 on the stack too.",
    actionKO: "바 4: 맨 위가 3, 달라요 → 4 도 올려둬요." },
  { idx: 2, stack: [3], total: 8, removed: [1, 2],
    actionEN: "Bar 4: the top is 4 — same! Take the pair and add 2×4 = 8.",
    actionKO: "바 4: 맨 위가 4 — 같아요! 짝을 가져가고 2×4 = 8 을 더해요." },
  { idx: 3, stack: [3, 5], total: 8, removed: [1, 2],
    actionEN: "Bar 5: the top is 3, different → keep 5 on the stack.",
    actionKO: "바 5: 맨 위가 3, 달라요 → 5 를 올려둬요." },
  { idx: 4, stack: [3, 5, 9], total: 8, removed: [1, 2],
    actionEN: "Bar 9: the top is 5, different → keep 9 on the stack.",
    actionKO: "바 9: 맨 위가 5, 달라요 → 9 를 올려둬요." },
  { idx: 5, stack: [3, 5], total: 26, removed: [1, 2, 4, 5],
    actionEN: "Bar 9: the top is 9 — same! Take the pair and add 2×9 = 18. Total 26.",
    actionKO: "바 9: 맨 위가 9 — 같아요! 짝을 가져가고 2×9 = 18 을 더해요. 총 26." },
  { idx: 6, stack: [3], total: 36, removed: [1, 2, 3, 4, 5, 6],
    actionEN: "Bar 5: the 9s are gone, so 5 meets 5 — same! Add 2×5 = 10. Total 36. ← this is the chain reaction.",
    actionKO: "바 5: 9 두 개가 사라져서 5 와 5 가 만났어요 — 같아요! 2×5 = 10 을 더해요. 총 36. ← 이게 연쇄예요." },
  { idx: 7, stack: [3, 2], total: 36, removed: [1, 2, 3, 4, 5, 6],
    actionEN: "Bar 2: the top is 3, different → keep 2 on the stack.",
    actionKO: "바 2: 맨 위가 3, 달라요 → 2 를 올려둬요." },
  { idx: 8, stack: [3, 2], total: 36, removed: [1, 2, 3, 4, 5, 6],
    actionEN: "Done. Bars 3 and 2 never found a partner. Answer = 36.",
    actionKO: "끝. 바 3 과 2 는 끝내 짝을 못 찾았어요. 답 = 36." },
];

export function Mcc15ChocoStackSim({ E }) {
  const [f, setF] = useState(0);
  const frame = SIM_FRAMES[f];
  const action = E ? frame.actionEN : frame.actionKO;
  const atEnd = f >= SIM_FRAMES.length - 1;
  const atStart = f <= 0;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: A }}>
          {t(E, "🥞 Walkthrough — the official sample [3, 4, 4, 5, 9, 9, 5, 2]", "🥞 한 바씩 따라가기 — 공식 샘플 [3, 4, 4, 5, 9, 9, 5, 2]")}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 3 }}>
          {t(E, `Step ${f + 1} / ${SIM_FRAMES.length}`, `${f + 1} 단계 / ${SIM_FRAMES.length}`)}
        </div>
      </div>

      {/* Bars row — highlight current */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {SIM_BARS.map((b, i) => {
          const cur = i === frame.idx;
          const gone = frame.removed.includes(i);
          return (
            <div key={i} style={{
              minWidth: 34, padding: "9px 10px",
              borderRadius: 8,
              background: gone ? "#f1f5f9" : cur ? A : "#fff",
              color: gone ? "#94a3b8" : cur ? "#fff" : C.text,
              border: `2px solid ${gone ? "#e2e8f0" : cur ? A : C.border}`,
              fontWeight: 700, textAlign: "center", fontSize: 13,
              textDecoration: gone ? "line-through" : "none",
            }}>{b}</div>
          );
        })}
      </div>

      {/* Stack visualization (grows upward) */}
      <div style={{
        background: "#f5f3ff", border: `1.5px dashed ${A}`,
        borderRadius: 10, padding: 12, marginBottom: 10,
        minHeight: 110,
        display: "flex", flexDirection: "column-reverse",
        alignItems: "center", gap: 4,
      }}>
        <div style={{ fontSize: 10, color: "#5b21b6", fontWeight: 700, letterSpacing: 0.5, marginTop: 4 }}>
          {t(E, "STACK (bottom → top)", "스택 (바닥 → top)")}
        </div>
        {frame.stack.length === 0 && (
          <div style={{ fontSize: 11, color: C.dim, fontStyle: "italic", padding: "10px 0" }}>
            {t(E, "(empty)", "(비었음)")}
          </div>
        )}
        {frame.stack.map((v, i) => (
          <div key={i} style={{
            minWidth: 50, padding: "6px 10px",
            background: "#fff", border: `1.5px solid ${A}`, borderRadius: 6,
            color: A, fontWeight: 700, textAlign: "center", fontSize: 13,
          }}>{v}</div>
        ))}
      </div>

      {/* Total */}
      <div style={{
        textAlign: "center",
        background: "#ecfdf5", border: "1.5px solid #34d399",
        borderRadius: 10, padding: "8px 12px", marginBottom: 10,
        fontSize: 13, color: "#065f46", fontWeight: 700,
      }}>
        {t(E, "Total removed = ", "제거한 총 길이 = ")}
        <span style={{ fontSize: 16, color: "#15803d" }}>{frame.total}</span>
      </div>

      {/* Action narration */}
      <div style={{
        background: "#fff", border: `1px solid ${C.border}`,
        borderRadius: 8, padding: "8px 12px", marginBottom: 12,
        fontSize: 12.5, color: C.text, lineHeight: 1.55,
      }}>
        {action}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <button onClick={() => setF(Math.max(0, f - 1))} disabled={atStart} style={{
          padding: "6px 14px", fontSize: 12, fontWeight: 700,
          background: atStart ? "#e5e7eb" : "#fff",
          color: atStart ? "#9ca3af" : A,
          border: `1.5px solid ${atStart ? "#e5e7eb" : A}`,
          borderRadius: 8, cursor: atStart ? "not-allowed" : "pointer",
        }}>← {t(E, "Prev", "이전")}</button>
        <button onClick={() => setF(0)} style={{
          padding: "6px 14px", fontSize: 12, fontWeight: 700,
          background: "#fff", color: "#6b7280",
          border: "1.5px solid #d1d5db", borderRadius: 8, cursor: "pointer",
        }}>↺ {t(E, "Reset", "처음")}</button>
        <button onClick={() => setF(Math.min(SIM_FRAMES.length - 1, f + 1))} disabled={atEnd} style={{
          padding: "6px 14px", fontSize: 12, fontWeight: 700,
          background: atEnd ? "#e5e7eb" : A,
          color: atEnd ? "#9ca3af" : "#fff",
          border: `1.5px solid ${atEnd ? "#e5e7eb" : A}`,
          borderRadius: 8, cursor: atEnd ? "not-allowed" : "pointer",
        }}>{t(E, "Next", "다음")} →</button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "bars = list(map(int, input().split()))",
  "",
  "stack = []      # 아직 짝을 못 찾은 바들",
  "total = 0       # 지금까지 가져간 초콜릿 길이",
  "",
  "for bar in bars:",
  "    if stack and stack[-1] == bar:",
  "        # 맨 위 바와 길이가 같아요 → 둘을 가져가요",
  "        total += 2 * bar",
  "        stack.pop()",
  "    else:",
  "        stack.append(bar)",
  "",
  "print(total)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false); cin.tie(nullptr);",
  "    int N;",
  "    cin >> N;",
  "",
  "    vector<long long> stack;   // 아직 짝을 못 찾은 바들",
  "    long long total = 0;       // 지금까지 가져간 초콜릿 길이",
  "",
  "    for (int i = 0; i < N; i++) {",
  "        long long bar;",
  "        cin >> bar;",
  "        if (!stack.empty() && stack.back() == bar) {",
  "            // 맨 위 바와 길이가 같아요 → 둘을 가져가요",
  "            total += 2 * bar;",
  "            stack.pop_back();",
  "        } else {",
  "            stack.push_back(bar);",
  "        }",
  "    }",
  "",
  "    cout << total << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc15ChocoSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "The stack holds exactly the bars that have not found a partner yet. The bar on top is the one currently sitting next to the bar we are reading.",
            "스택에는 '아직 짝을 못 찾은 바' 들만 남아요. 그래서 맨 위 바가, 지금 읽는 바의 실제 왼쪽 이웃이에요."),
        t(E, "That is why the chain reaction is free: when 9 and 9 leave, the stack top automatically becomes 5 — the two 5s meet without us moving anything.",
            "그래서 연쇄가 저절로 처리돼요. 9 두 개가 빠지면 스택 맨 위가 저절로 5 가 되고, 아무것도 옮기지 않아도 5 와 5 가 만나요."),
        t(E, "Every bar is pushed at most once and popped at most once, so the whole scan is one pass over N bars — fast enough for N up to 1,000,000.",
            "바 하나는 최대 한 번 쌓이고 최대 한 번 빠져요. 그래서 전체가 N 번 훑기 한 번이에요 — N 이 1,000,000 이어도 충분히 빨라요."),
        t(E, "We add 2 × bar, not bar: a pair is two bars of the same length.",
            "bar 가 아니라 2 × bar 를 더해요 — 짝은 같은 길이의 바 두 개니까요."),
      ],
      pyOnly: [
        t(E, "A plain list is already a stack: append() puts one on top, pop() takes the top one off, stack[-1] peeks at it.",
            "파이썬 리스트가 곧 스택이에요. append() 로 위에 올리고, pop() 으로 맨 위를 빼고, stack[-1] 로 맨 위를 봐요."),
        t(E, "if stack and stack[-1] == bar checks 'not empty' first — reading stack[-1] on an empty list would crash.",
            "if stack and stack[-1] == bar 는 '비었는지' 를 먼저 봐요. 빈 리스트에 stack[-1] 을 쓰면 에러가 나거든요."),
      ],
      cppOnly: [
        t(E, "vector works as a stack: push_back / pop_back / back(). std::stack would work too.",
            "vector 를 스택처럼 써요: push_back / pop_back / back(). std::stack 을 써도 돼요."),
        t(E, "The total needs long long: 1,000,000 bars of length 1,000,000 would overflow int.",
            "총합은 long long 이어야 해요. 길이 1,000,000 짜리 바가 1,000,000 개면 int 로는 넘쳐요."),
        t(E, "ios::sync_with_stdio(false) speeds up reading up to a million numbers.",
            "숫자를 최대 100만 개 읽으니 ios::sync_with_stdio(false) 로 입력 속도를 올려요."),
      ],
    },
  ];
}

export function Mcc15ChocoProgressiveCode(props) {
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


export function downloadMcc15ChocoPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc15Choco — Full Study Guide", "Mcc15Choco — 종합 풀이 노트");
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

