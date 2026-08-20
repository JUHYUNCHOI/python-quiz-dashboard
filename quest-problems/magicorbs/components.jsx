import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";
const KA = { wordBreak: "keep-all" };

/* ═══════════════════════════════════════════════════════════════
   MagicOrbsMergeSim — the student fuses orbs by hand.
   Fusion rule: pick x, then pick y → new orb = x + 2·y (y doubled).
   Repeat until one orb remains. The "best" reference is the verified
   optimum: sort ascending, k-th smallest worth value × 2^k. Students
   discover that always doubling the growing/bigger cluster wins.
   ═══════════════════════════════════════════════════════════════ */
const _ORB_PRESETS = [
  { vals: [3, 1] },
  { vals: [1, 2, 1] },
  { vals: [1, 2, 3, 2] },
];

// verified optimum: sort ascending, coefficient 2^k for the k-th smallest
function bestFinal(vals) {
  const a = [...vals].sort((p, q) => p - q);
  let ans = 0, p = 1;
  for (const v of a) { ans += v * p; p *= 2; }
  return ans;
}

export function MagicOrbsMergeSim({ E }) {
  const [pi, setPi] = useState(1);
  const [orbs, setOrbs] = useState(() => _ORB_PRESETS[1].vals.map((v, i) => ({ id: i, val: v })));
  const [nextId, setNextId] = useState(() => _ORB_PRESETS[1].vals.length);
  const [xId, setXId] = useState(null);
  const [yId, setYId] = useState(null);

  const best = bestFinal(_ORB_PRESETS[pi].vals);
  const done = orbs.length === 1;
  const finalVal = done ? orbs[0].val : null;
  const hitBest = done && finalVal === best;

  const reset = (newPi = pi) => {
    setPi(newPi);
    setOrbs(_ORB_PRESETS[newPi].vals.map((v, i) => ({ id: i, val: v })));
    setNextId(_ORB_PRESETS[newPi].vals.length);
    setXId(null); setYId(null);
  };

  const clickOrb = (id) => {
    if (done) return;
    if (xId === null) { setXId(id); return; }
    if (id === xId) { setXId(null); setYId(null); return; }   // deselect x
    if (yId === null) { setYId(id); return; }
    if (id === yId) { setYId(null); return; }                 // deselect y
    // both already chosen → start over with this orb as x
    setXId(id); setYId(null);
  };

  const fuse = () => {
    if (xId === null || yId === null) return;
    const x = orbs.find(o => o.id === xId).val;
    const y = orbs.find(o => o.id === yId).val;
    const merged = { id: nextId, val: x + 2 * y };
    setOrbs(prev => [...prev.filter(o => o.id !== xId && o.id !== yId), merged]);
    setNextId(nextId + 1);
    setXId(null); setYId(null);
  };

  const preview = (xId !== null && yId !== null)
    ? orbs.find(o => o.id === xId).val + 2 * orbs.find(o => o.id === yId).val
    : null;

  const orbChip = (o) => {
    const role = o.id === xId ? "x" : o.id === yId ? "y" : null;
    const bg = role === "x" ? "#ede9fe" : role === "y" ? "#fef3c7" : "#f5f3ff";
    const border = role === "x" ? A : role === "y" ? "#f59e0b" : "#c4b5fd";
    const color = role === "y" ? "#92400e" : "#5b21b6";
    return (
      <button key={o.id} onClick={() => clickOrb(o.id)} disabled={done} style={{
        position: "relative", minWidth: 46, height: 50, padding: "0 8px",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 12, fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
        background: bg, border: `2px solid ${border}`, color, cursor: done ? "default" : "pointer",
        boxShadow: role ? `0 0 0 3px ${border}33` : "none",
      }}>
        {o.val}
        {role && (
          <span style={{
            position: "absolute", top: -9, right: -9, width: 20, height: 20, borderRadius: 10,
            background: role === "x" ? A : "#f59e0b", color: "#fff", fontSize: 11, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{role}</span>
        )}
      </button>
    );
  };

  return (
    <div style={{ padding: 14, ...KA }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_ORB_PRESETS.map((p, i) => (
          <button key={i} onClick={() => reset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            [{p.vals.join(",")}]
          </button>
        ))}
      </div>

      {/* rule reminder */}
      <div style={{ textAlign: "center", fontSize: 11.5, color: C.dim, marginBottom: 10, lineHeight: 1.5 }}>
        {t(E, "Tap an orb for ", "구슬을 눌러 ")}
        <b style={{ color: A }}>x</b>{t(E, ", then another for ", ", 그다음 다른 구슬을 ")}
        <b style={{ color: "#f59e0b" }}>y</b>{t(E, " (doubled). Fuse: ", " 로 (두 배). 융합: ")}
        <b style={{ color: "#7c3aed", fontFamily: "'JetBrains Mono',monospace" }}>x + 2·y</b>
      </div>

      {/* orbs */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 12, minHeight: 50 }}>
        {orbs.map(orbChip)}
      </div>

      {/* preview + fuse button */}
      {!done && (
        <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
          <div style={{
            fontSize: 13, fontFamily: "'JetBrains Mono',monospace", color: preview === null ? C.dim : "#5b21b6",
            background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 12px", fontWeight: 700,
          }}>
            {preview === null
              ? t(E, "x + 2·y = ?", "x + 2·y = ?")
              : `${orbs.find(o => o.id === xId).val} + 2·${orbs.find(o => o.id === yId).val} = ${preview}`}
          </div>
          <button onClick={fuse} disabled={preview === null} style={{
            padding: "7px 18px", borderRadius: 8, border: `1px solid ${A}`,
            background: preview === null ? "#e9e5f8" : A, color: preview === null ? "#a99fd0" : "#fff",
            fontSize: 13, fontWeight: 800, cursor: preview === null ? "default" : "pointer",
          }}>
            ✨ {t(E, "Fuse", "융합")}
          </button>
        </div>
      )}

      {/* result vs best */}
      {done ? (
        <div style={{
          background: hitBest ? "#dcfce7" : "#ede9fe",
          border: `1px solid ${hitBest ? "#86efac" : "#c4b5fd"}`,
          borderRadius: 10, padding: "10px 14px", textAlign: "center",
        }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: hitBest ? "#166534" : "#5b21b6", fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "final power = ", "마지막 파워 = ")}{finalVal}
            {" "}<span style={{ color: C.dim, fontWeight: 600 }}>/ {t(E, "best ", "최고 ")}{best}</span>
          </div>
          <div style={{ fontSize: 12, color: hitBest ? "#166534" : "#7c3aed", marginTop: 4, fontWeight: 600 }}>
            {hitBest
              ? t(E, "🎉 You matched the best! You kept doubling the bigger cluster.", "🎉 최고 기록 달성! 큰 덩어리를 계속 두 배로 만들었어요.")
              : t(E, "Not the max yet — try doubling the BIGGER orb each time (put it as y).", "아직 최댓값이 아니에요 — 매번 더 큰 구슬을 두 배로 (y 자리에) 해봐요.")}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", fontSize: 11.5, color: C.dim, ...KA }}>
          {t(E, "Best possible for this set: ", "이 세트의 최댓값: ")}
          <b style={{ color: A, fontFamily: "'JetBrains Mono',monospace" }}>{best}</b>
          {t(E, ". Fuse down to one orb and try to reach it.", ". 구슬 하나까지 융합해서 도전해봐요.")}
        </div>
      )}

      {/* reset */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
        <button onClick={() => reset()} style={{
          padding: "5px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          ↺ {t(E, "Reset", "다시")}
        </button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "MOD = 10**9 + 7",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    n = int(input())",
  "    a = list(map(int, input().split()))",
  "    a.sort()                 # smallest first",
  "",
  "    ans = 0",
  "    p = 1                    # coefficient: 1, 2, 4, 8, ...",
  "    for v in a:",
  "        ans = (ans + v * p) % MOD",
  "        p = (p * 2) % MOD",
  "    print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "const long long MOD = 1000000007;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int n;",
  "        cin >> n;",
  "        vector<long long> a(n);",
  "        for (int i = 0; i < n; i++) cin >> a[i];",
  "",
  "        sort(a.begin(), a.end());   // smallest first",
  "",
  "        long long ans = 0, p = 1;   // coefficient: 1, 2, 4, ...",
  "        for (int i = 0; i < n; i++) {",
  "            ans = (ans + (a[i] % MOD) * p) % MOD;",
  "            p = (p * 2) % MOD;",
  "        }",
  "        cout << ans << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getMagicOrbsSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Fusing x, y → x + 2·y doubles y. Over the whole game, the orb that stays in the doubled slot the longest earns the most doublings — so we want the biggest orb doubled the most.",
            "x, y → x + 2·y 는 y 를 두 배로 해요. 게임 전체로 보면, 두 배 자리에 가장 오래 남는 구슬이 가장 많이 두 배가 돼요 — 그래서 가장 큰 구슬을 가장 많이 두 배로 만들고 싶어요."),
        t(E, "That optimum is exactly: sort ascending, and the k-th smallest orb is worth value × 2^k (coefficients 1, 2, 4, 8, …). One sort, one pass, mod 1e9+7.",
            "그 최적해가 바로: 오름차순 정렬 후 k 번째로 작은 구슬은 값 × 2^k (계수 1, 2, 4, 8, …). 한 번 정렬, 한 번 훑기, 1e9+7 나머지."),
      ],
      pyOnly: [
        t(E, "a.sort() puts smallest first; p doubles each step so the LAST (biggest) value gets the largest coefficient.",
            "a.sort() 로 작은 것부터; p 가 매 단계 두 배라 마지막(가장 큰) 값이 가장 큰 계수를 받아요."),
        t(E, "Take % MOD every step — the coefficient p can grow to 2^200000, so keep it small.",
            "매 단계 % MOD — 계수 p 가 2^200000 까지 커질 수 있으니 작게 유지해요."),
      ],
      cppOnly: [
        t(E, "a[i] can be up to 10^18, so store it as long long and reduce (a[i] % MOD) before multiplying.",
            "a[i] 가 10^18 까지 가능하니 long long 에 담고, 곱하기 전에 (a[i] % MOD) 로 줄여요."),
        t(E, "Multiply modded values so the product stays under ~10^18 and never overflows long long.",
            "나머지끼리 곱하면 곱이 ~10^18 아래로 유지돼 long long 을 넘지 않아요."),
      ],
    },
  ];
}

export function MagicOrbsProgressiveCode(props) {
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


export function downloadMagicOrbsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MagicOrbs — Full Study Guide", "MagicOrbs — 종합 풀이 노트");
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

