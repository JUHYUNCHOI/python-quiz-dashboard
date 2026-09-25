import { useState, useMemo, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ─────────────────────────────────────────────────────────────
   Custom-Alphabet Recital Simulator
   Student picks an alphabet order + a heard string, then steps
   through each adjacent pair. Forward = green, backward = red
   (red triggers a "recite!" pulse and increments cycle count).
   ───────────────────────────────────────────────────────────── */
export function UdderedRecitalSim({ E }) {
  const PRESET_ORDERS = [
    { label: "abc..z", value: "abcdefghijklmnopqrstuvwxyz" },
    { label: "tngrolewqdmaviuhpkfbxzcsjy", value: "tngrolewqdmaviuhpkfbxzcsjy" },
    { label: "zyx..a", value: "zyxwvutsrqponmlkjihgfedcba" },
  ];
  const [orderIdx, setOrderIdx] = useState(0);
  const [heard, setHeard] = useState("mood");
  const order = PRESET_ORDERS[orderIdx].value;
  const pos = useMemo(() => {
    const m = {};
    for (let i = 0; i < order.length; i++) m[order[i]] = i;
    return m;
  }, [order]);

  const cleanHeard = heard.toLowerCase().replace(/[^a-z]/g, "");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reciteFlash, setReciteFlash] = useState(false);
  const timerRef = useRef(null);

  // recompute cycles for highlighting up to current step
  const stepInfo = useMemo(() => {
    let cycles = cleanHeard.length > 0 ? 1 : 0;
    const pairs = [];
    for (let i = 1; i < cleanHeard.length; i++) {
      const back = pos[cleanHeard[i]] <= pos[cleanHeard[i - 1]];
      if (back) cycles++;
      pairs.push({ back, cyclesAfter: cycles });
    }
    return { pairs, totalCycles: cycles };
  }, [cleanHeard, pos]);

  const maxStep = cleanHeard.length; // step 0 = first letter only, step k = up to comparing letter k with k-1
  useEffect(() => { setStep(0); setPlaying(false); }, [heard, orderIdx]);

  useEffect(() => {
    if (!playing) return;
    if (step >= maxStep - 1) { setPlaying(false); return; }
    timerRef.current = setTimeout(() => {
      const nextStep = step + 1;
      const pairIdx = nextStep - 1;
      if (pairIdx >= 0 && stepInfo.pairs[pairIdx]?.back) {
        setReciteFlash(true);
        setTimeout(() => setReciteFlash(false), 600);
      }
      setStep(nextStep);
    }, 850);
    return () => clearTimeout(timerRef.current);
  }, [playing, step, maxStep, stepInfo]);

  const cyclesNow = step === 0
    ? (cleanHeard.length > 0 ? 1 : 0)
    : stepInfo.pairs[step - 1]?.cyclesAfter ?? 1;

  const reset = () => { setStep(0); setPlaying(false); setReciteFlash(false); };
  const stepOnce = () => {
    if (step >= maxStep - 1) return;
    const nextStep = step + 1;
    const pairIdx = nextStep - 1;
    if (stepInfo.pairs[pairIdx]?.back) {
      setReciteFlash(true);
      setTimeout(() => setReciteFlash(false), 600);
    }
    setStep(nextStep);
  };

  return (
    <div style={{
      background: "#fff",
      border: "1.5px solid #fca5a5",
      borderRadius: 12,
      padding: 14,
      marginBottom: 10,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 10 }}>
        🐄 {t(E, "Try it: Recital Simulator", "직접 해 보기 — 외우기 시뮬레이터")}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 600, minWidth: 64 }}>
            {t(E, "Order:", "순서:")}
          </span>
          {PRESET_ORDERS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setOrderIdx(i)}
              style={{
                background: orderIdx === i ? "#dc2626" : "#fef2f2",
                color: orderIdx === i ? "#fff" : "#7f1d1d",
                border: "1px solid #fca5a5",
                borderRadius: 6,
                padding: "3px 8px",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >{p.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 600, minWidth: 64 }}>
            {t(E, "Heard:", "들음:")}
          </span>
          <input
            value={heard}
            onChange={(e) => setHeard(e.target.value)}
            maxLength={20}
            placeholder="mood"
            style={{
              flex: 1,
              minWidth: 120,
              padding: "4px 8px",
              border: "1px solid #fca5a5",
              borderRadius: 6,
              fontSize: 12,
              fontFamily: "JetBrains Mono, monospace",
              color: "#7f1d1d",
            }}
          />
          {["cow", "moo", "abba"].map(s => (
            <button key={s} onClick={() => setHeard(s)} style={{
              background: "#fef2f2", color: "#7f1d1d",
              border: "1px solid #fca5a5", borderRadius: 6,
              padding: "3px 8px", fontSize: 11, fontWeight: 600, cursor: "pointer",
              fontFamily: "JetBrains Mono, monospace",
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Order strip with position pointer */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: C.dim, marginBottom: 4 }}>
          {t(E, "Bessie's alphabet (custom order, position →)", "Bessie 만의 알파벳 순서 (왼쪽부터 0 번 자리)")}
        </div>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 2,
          fontFamily: "JetBrains Mono, monospace",
        }}>
          {order.split("").map((ch, i) => {
            const curLetter = cleanHeard[step];
            const prevLetter = step > 0 ? cleanHeard[step - 1] : null;
            const isCur = ch === curLetter;
            const isPrev = ch === prevLetter;
            return (
              <span key={i} style={{
                display: "inline-block",
                width: 18, textAlign: "center",
                padding: "2px 0",
                fontSize: 11, fontWeight: 600,
                background: isCur ? "#dc2626" : isPrev ? "#fca5a5" : "#fef2f2",
                color: isCur ? "#fff" : isPrev ? "#fff" : "#7f1d1d",
                border: "1px solid #fca5a5",
                borderRadius: 3,
              }}>{ch}</span>
            );
          })}
        </div>
      </div>

      {/* Heard string with current/prev highlight */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: C.dim, marginBottom: 4 }}>
          {t(E, "Heard string (reading position)", "들은 글자 (지금 읽는 자리)")}
        </div>
        <div style={{ display: "flex", gap: 4, fontFamily: "JetBrains Mono, monospace" }}>
          {cleanHeard.split("").map((ch, i) => {
            const isCur = i === step;
            const isPrev = i === step - 1;
            const isPair = i === step || i === step - 1;
            const pair = stepInfo.pairs[step - 1];
            const back = pair?.back;
            return (
              <span key={i} style={{
                display: "inline-block",
                minWidth: 22, textAlign: "center",
                padding: "4px 6px",
                fontSize: 14, fontWeight: 700,
                background: isCur ? (back ? "#dc2626" : "#15803d")
                          : isPrev ? (back ? "#fca5a5" : "#86efac")
                          : "#f9fafb",
                color: isPair ? "#fff" : "#1f2937",
                border: `1.5px solid ${isPair ? (back ? "#dc2626" : "#15803d") : "#e5e7eb"}`,
                borderRadius: 6,
                transition: "all 0.25s",
              }}>{ch}</span>
            );
          })}
        </div>
      </div>

      {/* Pair status */}
      <div style={{
        background: reciteFlash ? "#fee2e2" : "#fafafa",
        border: `1px solid ${reciteFlash ? "#dc2626" : "#e5e7eb"}`,
        borderRadius: 8,
        padding: "8px 10px",
        marginBottom: 10,
        fontSize: 12,
        color: "#374151",
        minHeight: 36,
        transition: "all 0.25s",
      }}>
        {step === 0 ? (
          <span>
            {t(E, "Reading first letter — start with cycle 1.", "첫 글자를 읽어요. 외우기 1 번째로 시작해요.")}
          </span>
        ) : (() => {
          const a = cleanHeard[step - 1];
          const b = cleanHeard[step];
          const pa = pos[a], pb = pos[b];
          const back = pb <= pa;
          return (
            <span>
              <b style={{ color: back ? "#dc2626" : "#15803d" }}>
                {a}({pa}) → {b}({pb})
              </b>
              {" — "}
              {back
                ? t(E, `backward / equal → recite! cycles++`, `앞이거나 같아요 → 다시 외워요 (cycles++)`)
                : t(E, `forward → keep reading`, `뒤쪽이에요 → 그냥 계속 읽어요`)}
            </span>
          );
        })()}
      </div>

      {/* Cycle counter + buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <div style={{
          background: "#dc2626", color: "#fff",
          padding: "4px 10px", borderRadius: 6,
          fontSize: 12, fontWeight: 700,
          fontFamily: "JetBrains Mono, monospace",
        }}>
          cycles = {cyclesNow}
        </div>
        <div style={{ fontSize: 11, color: C.dim }}>
          {t(E, `step ${step + 1} / ${Math.max(maxStep, 1)}`, `단계 ${step + 1} / ${Math.max(maxStep, 1)}`)}
        </div>
        <div style={{ flex: 1 }} />
        <button onClick={reset} style={{
          background: "#fef2f2", color: "#7f1d1d",
          border: "1px solid #fca5a5", borderRadius: 6,
          padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer",
        }}>↺ {t(E, "Reset", "처음으로")}</button>
        <button
          onClick={stepOnce}
          disabled={step >= maxStep - 1 || playing}
          style={{
            background: step >= maxStep - 1 || playing ? "#e5e7eb" : "#fff",
            color: step >= maxStep - 1 || playing ? "#9ca3af" : "#7f1d1d",
            border: "1px solid #fca5a5", borderRadius: 6,
            padding: "4px 10px", fontSize: 11, fontWeight: 600,
            cursor: step >= maxStep - 1 || playing ? "not-allowed" : "pointer",
          }}>▶ {t(E, "Step", "한 단계")}</button>
        <button
          onClick={() => { if (step >= maxStep - 1) reset(); setPlaying(p => !p); }}
          style={{
            background: playing ? "#7f1d1d" : "#dc2626", color: "#fff",
            border: "1px solid #dc2626", borderRadius: 6,
            padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer",
          }}>{playing ? "⏸ " + t(E, "Pause", "정지") : "▶▶ " + t(E, "Play", "재생")}</button>
      </div>

      <div style={{ fontSize: 10, color: C.dim, marginTop: 8, textAlign: "center" }}>
        {t(E,
          `Final answer for "${cleanHeard}" with this order: ${stepInfo.totalCycles} cycle(s)`,
          `이 순서로 "${cleanHeard}" 를 읽으면 답은 ${stepInfo.totalCycles} 번이에요`)}
      </div>
    </div>
  );
}


const FULL_PY = [
  "order = input().strip()",
  "heard = input().strip()",
  "",
  "pos = {}",
  "for i, ch in enumerate(order):",
  "    pos[ch] = i",
  "",
  "cycles = 1",
  "for i in range(1, len(heard)):",
  "    if pos[heard[i]] <= pos[heard[i-1]]:",
  "        cycles += 1",
  "",
  "print(cycles)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    string order, heard;",
  "    cin >> order >> heard;",
  "    map<char,int> pos;",
  "    for (int i = 0; i < (int)order.size(); i++) {",
  "        pos[order[i]] = i;",
  "    }",
  "    int cycles = 1;",
  "    for (size_t i = 1; i < heard.size(); i++) {",
  "        if (pos[heard[i]] <= pos[heard[i-1]]) {",
  "            cycles++;",
  "        }",
  "    }",
  "    cout << cycles << \"\\n\";",
  "    return 0;",
  "}",
];

export function getUdderedSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we print? The fewest full alphabet recitations needed to say every letter of S in order.",
            "무엇을 출력해야 하나요?\nS 의 글자를 순서대로 말하려면\n알파벳을 최소 몇 번 외워야 하는지예요."),
        t(E, "Within one recitation you only ever move forward. So whenever the next letter isn't further along than the last one, the old recitation couldn't have reached it — a new one must have started.",
            "한 번 외우는 동안엔 항상 앞으로만 가요.\n그런데 다음 글자가 앞선 글자보다\n뒤에 있지 않다면, 지금 외우던 걸로는\n닿을 수 없으니 새로 한 번 더 외운 거예요."),
        t(E, "So the code looks up each letter's alphabet position and starts a new recitation whenever the position doesn't increase.",
            "그래서 코드는 글자마다 알파벳 순서를 찾아 두고,\n순서가 앞으로 가지 않을 때마다\n외운 횟수를 하나씩 늘려요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "헤더는 필요한 것만 적어요 (<iostream>, <vector> …). 그래야 읽기 쉬워요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "더하거나 곱한 값이 2×10^9 를 넘을 것 같으면 long long 을 써요."),
      ],
    },
  ];
}

export function UdderedProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest
   코드 이 방식). ⚠️ 아래는 위 FULL_PY/FULL_CPP 를 **그대로** 쓴다 — 새 알고리즘 내용을
   추가하지 않는다. 절대 이 함수 안에서 `_PY`/`_CPP` 로 끝나는 새 변수를 만들지 마라
   (그 이름 패턴은 보호 변수로 간주된다). ── */
export function getUdderedWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "pos", ko: "이 순서에서 글자의 자리", en: "each letter's position in this order" },
        { v: "cycles", ko: "지금까지 외운 횟수", en: "recitations counted so far" },
      ],
      beats: [
        { hi: [0, 11], bubble: t(E,
          "What do we print? The fewest full alphabet recitations needed to say every letter of `heard` in order. So read the custom order and the heard string, then store each letter's position in this order in a map.",
          "무엇을 출력해야 하나요? heard 의 글자를 순서대로 말하는 데 필요한 알파벳 암송 최소 횟수예요.\n그러니 특별한 순서와 들은 문자열을 읽고, 글자마다 이 순서에서 몇 번째인지 map 에 저장해요.") },
        { hi: [12, 17], bubble: t(E,
          "Within one recitation you only ever move forward. So start at 1 recitation, and whenever the next letter's position isn't further along than the last one's, that means the old recitation couldn't reach it — count one more.",
          "한 번 외우는 동안엔 항상 앞으로만 가요.\n그래서 1번으로 시작하고, 다음 글자 자리가 앞선 글자보다 뒤로 가지 않으면\n지금 외우던 걸로는 닿을 수 없다는 뜻이라 횟수를 하나 더 늘려요.") },
        { hi: [18, 20], bubble: t(E,
          "Once every letter is checked, print the total number of recitations.",
          "글자를 다 확인했으면, 외운 총 횟수를 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "pos", ko: "이 순서에서 글자의 자리", en: "each letter's position in this order" },
      { v: "cycles", ko: "지금까지 외운 횟수", en: "recitations counted so far" },
    ],
    beats: [
      { hi: [0, 1], bubble: t(E,
        "What do we print? The fewest full alphabet recitations needed to say every letter of `heard` in order. So read the custom alphabet order and the string she heard.",
        "무엇을 출력해야 하나요? heard 의 글자를 순서대로 말하는 데 필요한\n알파벳 암송 최소 횟수예요.\n그러니 먼저 특별한 알파벳 순서와 들은 문자열을 읽어요.") },
      { hi: [3, 5], bubble: t(E,
        "To know how far along each letter is in this custom order, look up its position once and store it in a dictionary.",
        "이 특별한 순서에서 글자마다 몇 번째인지 알아야 하니까, 위치를 한 번씩 미리 dictionary 에 저장해요.") },
      { hi: [7, 10], bubble: t(E,
        "Within one recitation you only ever move forward. So start at 1 recitation, and whenever the next letter's position isn't further along than the last one's, that means the old recitation couldn't reach it — count one more.",
        "한 번 외우는 동안엔 항상 앞으로만 가요.\n그래서 1번으로 시작하고, 다음 글자 자리가 앞선 글자보다 뒤로 가지 않으면\n지금 외우던 걸로는 닿을 수 없다는 뜻이라 횟수를 하나 더 늘려요.") },
      { hi: [12, 12], bubble: t(E,
        "Once every letter is checked, print the total number of recitations.",
        "글자를 다 확인했으면, 외운 총 횟수를 출력해요.") },
    ],
  };
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


export function downloadUdderedPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혀 있어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Uddered — Full Study Guide", "Uddered — 종합 풀이 노트");
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

