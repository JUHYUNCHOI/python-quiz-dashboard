import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";
const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE — MCC 2024 P6 "XOR The String"
   Each adjacent pair contributes independently; its transformed
   "beauty" after k steps is a closed form (Jacobsthal-like), and
   the pair at index i lives inside i*(n-i) substrings.  O(n).
   Verified: sample 3 2/101 -> 4, 2 30/00 -> 75497471.
   ================================================================ */
const FULL_PY = [
  "MOD = 998244353",
  "inv3 = pow(3, MOD - 2, MOD)   # 1/3 mod p",
  "",
  "n, k = map(int, input().split())",
  "s = input().strip()",
  "",
  "# after k transforms, one adjacent pair's beauty depends",
  "# ONLY on the pair type — no need to build the huge string",
  "pow2k = pow(2, k, MOD)                 # 2^k  (k up to 1e18!)",
  "sign  = 1 if k % 2 == 0 else MOD - 1   # (-1)^k",
  "f00 = pow2k % MOD                          # pair 0,0",
  "f11 = (pow2k + 2 * sign) % MOD * inv3 % MOD  # pair 1,1",
  "f01 = (pow2k - sign) % MOD * inv3 % MOD      # pair 0,1 / 1,0",
  "",
  "# the pair joining positions i, i+1 sits inside i*(n-i) substrings",
  "total = 0",
  "for j in range(n - 1):",
  "    i = j + 1",
  "    w = i * (n - i) % MOD",
  "    x, y = s[j], s[j + 1]",
  "    if x == '0' and y == '0':",
  "        f = f00",
  "    elif x == '1' and y == '1':",
  "        f = f11",
  "    else:",
  "        f = f01",
  "    total = (total + w * f) % MOD",
  "",
  "print(total % MOD)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "const long long MOD = 998244353;",
  "",
  "long long pw(long long b, long long e, long long m) {",
  "    long long r = 1 % m; b %= m;",
  "    while (e > 0) { if (e & 1) r = r * b % m; b = b * b % m; e >>= 1; }",
  "    return r;",
  "}",
  "",
  "int main() {",
  "    long long n, k;",
  "    cin >> n >> k;",
  "    string s; cin >> s;",
  "",
  "    long long inv3  = pw(3, MOD - 2, MOD);",
  "    long long pow2k = pw(2, k, MOD);            // 2^k  (k up to 1e18)",
  "    long long sign  = (k % 2 == 0) ? 1 : MOD - 1;  // (-1)^k",
  "    long long f00 = pow2k % MOD;",
  "    long long f11 = (pow2k + 2 * sign) % MOD * inv3 % MOD;",
  "    long long f01 = ((pow2k - sign) % MOD + MOD) % MOD * inv3 % MOD;",
  "",
  "    long long total = 0;",
  "    for (long long j = 0; j + 1 < n; j++) {",
  "        long long i = j + 1;",
  "        long long w = i % MOD * ((n - i) % MOD) % MOD;",
  "        char x = s[j], y = s[j + 1];",
  "        long long f = (x=='0' && y=='0') ? f00",
  "                    : (x=='1' && y=='1') ? f11 : f01;",
  "        total = (total + w * f) % MOD;",
  "    }",
  "    cout << total % MOD << \"\\n\";",
  "    return 0;",
  "}",
];

export function getXorStringSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "Each adjacent pair transforms on its own. So the whole answer = the sum, over every adjacent pair of s, of that pair's beauty after k transforms — the pairs never interfere.",
          "이웃한 두 글자(한 쌍)는 서로 간섭 없이 각자 변신해요. 그래서 정답 = s 의 모든 이웃 쌍에 대해 'k번 변신한 뒤의 beauty' 를 더한 값이에요."),
        t(E,
          "We never build the transformed string. After k steps its length is about 2^k — with k up to 10^18 that's astronomically huge. Instead a pair's beauty has a closed form: it depends only on the pair type (0,0 / 1,1 / 0,1) and on 2^k and (-1)^k. That is a Jacobsthal-like recurrence solved in one shot with modular powers.",
          "변신한 문자열을 실제로 만들지 않아요. k번 뒤 길이는 약 2^k — k 가 10^18 까지라 상상도 못할 크기예요. 대신 한 쌍의 beauty 는 닫힌 공식으로 나와요: 쌍의 종류(0,0 / 1,1 / 0,1) 와 2^k, (-1)^k 에만 의존해요. Jacobsthal 형 점화식을 거듭제곱으로 한 번에 계산."),
        t(E,
          "A pair sitting between positions i and i+1 belongs to every substring that starts at or before i and ends at or after i+1 — that's exactly i*(n-i) substrings. So we weight each pair by i*(n-i) and add. One pass over s: O(n).",
          "위치 i 와 i+1 사이의 쌍은 'i 이하에서 시작하고 i+1 이상에서 끝나는' 모든 부분문자열에 들어가요 — 정확히 i*(n-i) 개예요. 그래서 각 쌍에 i*(n-i) 를 곱해 더해요. s 를 한 번만 훑어요: O(n)."),
        t(E,
          "Be honest: this is a very hard (Div-1) problem. The code is short, but the closed form for the pair's beauty is the whole difficulty — that's why we lean on the formula instead of simulating.",
          "솔직히 말하면 아주 어려운(Div-1) 문제예요. 코드는 짧지만, 쌍의 beauty 를 주는 닫힌 공식이 핵심 난관이에요 — 그래서 시뮬레이션 대신 공식에 기대요."),
      ],
      pyOnly: [
        t(E,
          "pow(3, MOD-2, MOD) is Fermat's little theorem: the modular inverse of 3, so we can 'divide by 3' under the modulus.",
          "pow(3, MOD-2, MOD) 는 페르마 소정리로 구한 3 의 모듈러 역원 — 나눗셈 '÷3' 을 모듈러 안에서 할 수 있어요."),
        t(E,
          "pow(2, k, MOD) computes 2^k mod p fast even when k is 10^18.",
          "pow(2, k, MOD) 는 k 가 10^18 이어도 2^k mod p 를 빠르게 계산해요."),
      ],
      cppOnly: [
        t(E,
          "Read n and k as long long — k can reach 10^18, far past int.",
          "n, k 는 long long 으로 읽어요 — k 는 10^18 까지라 int 로는 못 담아요."),
        t(E,
          "Keep every product under MOD with % as you go, so i*(n-i) and w*f never overflow long long.",
          "곱셈마다 % MOD 로 줄여서 i*(n-i) 와 w*f 가 long long 을 넘지 않게 해요."),
      ],
    },
  ];
}

export function XorStringProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}


/* ================================================================
   Concept sim — Transform Explorer
   Apply the "transform" once at a time to a tiny binary string and
   WATCH it grow (3 -> 5 -> 9 -> 17 ...), counting the beauty (number
   of equal-adjacent pairs) after each step. Keeps k tiny on purpose:
   the real string explodes as 2^k, which is the whole point.
   ================================================================ */
const SAME_FG = "#15803d";  // green-700
const SAME_BG = "#dcfce7";  // green-100
const INS_BG  = "#fef3c7";  // amber-100 (bit inserted this step)
const INS_BD  = "#f59e0b";
const BLUE_BG = "#eff6ff";
const BLUE_BD = "#93c5fd";
const BLUE_FG = "#2563eb";

function sanitizeBits(s) {
  const cleaned = String(s).replace(/[^01]/g, "").slice(0, 5);
  return cleaned;
}

// one transform: insert (t_i XOR t_{i+1}) between every adjacent pair
function transformOnce(str) {
  let out = "";
  for (let i = 0; i < str.length - 1; i++) {
    out += str[i];
    out += str[i] === str[i + 1] ? "0" : "1";
  }
  out += str[str.length - 1];
  return out;
}

function beauty(str) {
  let b = 0;
  for (let i = 0; i < str.length - 1; i++) if (str[i] === str[i + 1]) b++;
  return b;
}

export function TransformSim({ E }) {
  const [base, setBase] = useState("101");
  const [steps, setSteps] = useState(0);
  const MAX_STEPS = 4;

  const b = base.length >= 2 ? base : "10";

  // apply `steps` transforms
  let cur = b;
  for (let i = 0; i < steps; i++) cur = transformOnce(cur);

  // bits inserted in the LAST step live at odd indices (for steps >= 1)
  const insertedAtOdd = steps >= 1;
  const f = beauty(cur);
  const canGrow = steps < MAX_STEPS;

  const chipBase = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 26, height: 30, borderRadius: 6,
    fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800,
    border: "1.5px solid #cbd5e1", background: "#fff", color: "#0f172a",
  };

  const btn = (filled, disabled) => ({
    padding: "6px 12px", fontSize: 12, fontWeight: 800,
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: 7, border: `1.5px solid ${BLUE_FG}`,
    background: filled ? BLUE_FG : "#fff", color: filled ? "#fff" : BLUE_FG,
    opacity: disabled ? 0.4 : 1,
  });

  // render the string with equal-adjacent pairs joined by a green "=" badge
  const cells = [];
  for (let i = 0; i < cur.length; i++) {
    const inserted = insertedAtOdd && i % 2 === 1;
    cells.push(
      <span key={`c${i}`} style={{
        ...chipBase,
        background: inserted ? INS_BG : "#fff",
        borderColor: inserted ? INS_BD : "#cbd5e1",
      }}>{cur[i]}</span>
    );
    if (i < cur.length - 1) {
      const same = cur[i] === cur[i + 1];
      cells.push(
        <span key={`j${i}`} style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 16, fontSize: 12, fontWeight: 800,
          color: same ? SAME_FG : "#cbd5e1",
        }}>{same ? "=" : ""}</span>
      );
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: BLUE_BG, border: `1.5px solid ${BLUE_FG}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center", ...KA }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
          🧪 {t(E, "Transform Explorer", "변신 탐험")}
        </div>
        <div style={{ fontSize: 12, color: "#1e3a8a", lineHeight: 1.5 }}>
          {t(E,
            "\"Transform\" inserts (a XOR b) between every pair of neighbors. Press it and watch the string grow, and count beauty = equal-adjacent pairs (the green =).",
            "\"변신\"은 이웃한 두 글자 사이에 (a XOR b) 를 끼워 넣어요. 눌러서 문자열이 커지는 걸 보고, beauty = 이웃이 같은 쌍의 수(초록 =)를 세어봐요.")}
        </div>
      </div>

      {/* base editor */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 12, justifyContent: "center", ...KA }}>
        <label style={{ fontSize: 12, color: "#1e3a8a", fontWeight: 800 }}>{t(E, "start string", "시작 문자열")}</label>
        <input
          value={base}
          onChange={e => { setBase(sanitizeBits(e.target.value)); setSteps(0); }}
          style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800,
            padding: "6px 8px", border: `1.5px solid ${BLUE_BD}`, borderRadius: 6,
            width: 110, letterSpacing: 2, color: "#0f172a", background: "#fff", textAlign: "center",
          }}
        />
        <span style={{ fontSize: 11, color: C.dim }}>{t(E, "(0/1, up to 5)", "(0/1, 최대 5글자)")}</span>
      </div>

      {/* the string */}
      <div style={{ background: "#fff", border: `1px solid ${BLUE_BD}`, borderRadius: 10, padding: 14, marginBottom: 12, overflowX: "auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2, justifyContent: "center", marginBottom: 10 }}>
          {cells}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, fontSize: 12.5, color: C.text, ...KA }}>
          <span>{t(E, "transforms: ", "변신 횟수: ")}<b style={{ color: BLUE_FG }}>{steps}</b></span>
          <span>{t(E, "length: ", "길이: ")}<b style={{ color: BLUE_FG }}>{cur.length}</b></span>
          <span>{t(E, "beauty f: ", "beauty f: ")}<b style={{ color: SAME_FG }}>{f}</b></span>
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <button onClick={() => canGrow && setSteps(steps + 1)} disabled={!canGrow} style={btn(true, !canGrow)}>
          {t(E, "⚡ Transform once", "⚡ 한 번 변신")}
        </button>
        <button onClick={() => setSteps(0)} style={btn(false, false)}>
          {t(E, "Reset", "초기화")}
        </button>
      </div>

      {steps >= MAX_STEPS && (
        <div style={{ fontSize: 12, color: "#b45309", textAlign: "center", marginBottom: 8, ...KA }}>
          {t(E,
            "Stopped at 4 transforms — see how fast it grows? The real k can be 10^18, so the string is impossibly long.",
            "4번에서 멈췄어요 — 얼마나 빨리 커지는지 보이죠? 실제 k 는 10^18 까지라 문자열이 도저히 만들 수 없을 만큼 길어져요.")}
        </div>
      )}

      <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 11.5, color: C.dim, lineHeight: 1.6, ...KA }}>
        {t(E,
          "The string roughly doubles each transform (length 2m-1), so it explodes as 2^k — we can never build it for big k. The way out: each ORIGINAL adjacent pair (00, 11, or 01) transforms on its own, and its beauty after k steps follows a fixed formula. Then a pair between positions i and i+1 counts inside i*(n-i) substrings — weight it and add.",
          "문자열은 변신할 때마다 대략 두 배(길이 2m-1)라 2^k 로 폭발해요 — 큰 k 에선 절대 만들 수 없어요. 탈출구: 원래의 각 이웃 쌍(00, 11, 01)은 따로따로 변신하고, k번 뒤 beauty 는 고정된 공식을 따라요. 그리고 위치 i, i+1 사이 쌍은 i*(n-i) 개의 부분문자열에 들어가니 그만큼 가중치를 곱해 더해요.")}
      </div>
    </div>
  );
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs","pow"];
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


export function downloadXorStringPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "XorString — Full Study Guide", "XorString — 종합 풀이 노트");
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
