import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";
const KA = { wordBreak: "keep-all" };

/* ================================================================
   VERIFIED SOLUTION  (sample → 2, 0/500 brute mismatches)
   Each lamp is a triangular "tent": brightness at x is
   max(0, b - |p - x|). Total = sum of tents. Count integer x with
   total >= k. A tent adds slope +1 at p-b, -2 at p (peak), +1 at
   p+b; sweep the breakpoints tracking running slope s and value F,
   counting integers per linear segment with exact ceil/floor.
   ================================================================ */

// section 1: exact per-segment integer counting
const PY_S1 = [
  "import sys",
  "from collections import defaultdict",
  "",
  "# how many integers d in 0..L have F + s*d >= k?",
  "def count_ge(F, s, k, L):",
  "    if L < 0:",
  "        return 0",
  "    if s == 0:                       # flat: every point equals F",
  "        return (L + 1) if F >= k else 0",
  "    if s > 0:                        # rising: need d >= ceil((k-F)/s)",
  "        num = k - F",
  "        dmin = -(-num // s) if num > 0 else 0",
  "        return 0 if dmin > L else L - dmin + 1",
  "    else:                            # falling: need d <= floor((k-F)/s)",
  "        dmax = (k - F) // s",
  "        if dmax < 0:",
  "            return 0",
  "        return min(dmax, L) + 1",
];

// section 2: tents -> slope events -> sweep
const PY_S2 = [
  "def solve_one(n, k, p, b):",
  "    # each lamp is a tent: slope +1 at p-b, -2 at the peak p, +1 at p+b",
  "    delta = defaultdict(int)",
  "    for pi, bi in zip(p, b):",
  "        delta[pi - bi] += 1",
  "        delta[pi]      -= 2",
  "        delta[pi + bi] += 1",
  "",
  "    # sweep the breakpoints, tracking slope s and brightness F",
  "    xs = sorted(delta.keys())",
  "    s = 0",
  "    F = 0",
  "    total = 0",
  "    for j in range(len(xs) - 1):",
  "        s += delta[xs[j]]",
  "        lo, hi = xs[j], xs[j + 1]",
  "        total += count_ge(F, s, k, hi - lo - 1)",
  "        F += s * (hi - lo)",
  "    return total",
];

// section 3: read all tests, print one answer each
const PY_S3 = [
  "def main():",
  "    data = sys.stdin.read().split()",
  "    idx = 0",
  "    T = int(data[idx]); idx += 1",
  "    out = []",
  "    for _ in range(T):",
  "        n, k = int(data[idx]), int(data[idx + 1]); idx += 2",
  "        p = list(map(int, data[idx:idx + n])); idx += n",
  "        b = list(map(int, data[idx:idx + n])); idx += n",
  "        out.append(str(solve_one(n, k, p, b)))",
  "    print(\"\\n\".join(out))",
  "",
  "main()",
];

const FULL_PY = [...PY_S1, "", "", ...PY_S2, "", "", ...PY_S3];

// C++ mirror (this quest is Python-only; kept valid for parity / PDF)
const CPP_S1 = [
  "#include <iostream>",
  "#include <vector>",
  "#include <map>",
  "using namespace std;",
  "typedef long long ll;",
  "",
  "// floor division rounding toward -infinity (like Python //)",
  "ll floordiv(ll a, ll b) {",
  "    ll q = a / b;",
  "    if ((a % b != 0) && ((a < 0) != (b < 0))) q--;",
  "    return q;",
  "}",
  "",
  "// how many integers d in 0..L have F + s*d >= k?",
  "ll count_ge(ll F, ll s, ll k, ll L) {",
  "    if (L < 0) return 0;",
  "    if (s == 0) return (F >= k) ? (L + 1) : 0;",
  "    ll num = k - F;",
  "    if (s > 0) {                     // rising: d >= ceil(num/s)",
  "        ll dmin = (num > 0) ? -floordiv(-num, s) : 0;",
  "        return (dmin > L) ? 0 : (L - dmin + 1);",
  "    }",
  "    ll dmax = floordiv(num, s);      // falling: d <= floor(num/s)",
  "    if (dmax < 0) return 0;",
  "    if (dmax > L) dmax = L;",
  "    return dmax + 1;",
  "}",
];
const CPP_S2 = [
  "ll solve_one(int n, ll k, vector<ll>& p, vector<ll>& b) {",
  "    // each lamp is a tent: +1 at p-b, -2 at the peak p, +1 at p+b",
  "    map<ll, ll> delta;",
  "    for (int i = 0; i < n; i++) {",
  "        delta[p[i] - b[i]] += 1;",
  "        delta[p[i]]        -= 2;",
  "        delta[p[i] + b[i]] += 1;",
  "    }",
  "",
  "    // sweep the breakpoints, tracking slope s and brightness F",
  "    vector<pair<ll, ll> > xs(delta.begin(), delta.end());",
  "    ll s = 0, F = 0, total = 0;",
  "    for (size_t j = 0; j + 1 < xs.size(); j++) {",
  "        s += xs[j].second;",
  "        ll lo = xs[j].first, hi = xs[j + 1].first;",
  "        total += count_ge(F, s, k, hi - lo - 1);",
  "        F += s * (hi - lo);",
  "    }",
  "    return total;",
  "}",
];
const CPP_S3 = [
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int n; ll k;",
  "        cin >> n >> k;",
  "        vector<ll> p(n), b(n);",
  "        for (int i = 0; i < n; i++) cin >> p[i];",
  "        for (int i = 0; i < n; i++) cin >> b[i];",
  "        cout << solve_one(n, k, p, b) << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];
const FULL_CPP = [...CPP_S1, "", ...CPP_S2, "", ...CPP_S3];

export function getMcc22LampSections(E) {
  return [
    {
      label: t(E, "1️⃣ Count on one straight segment", "1️⃣ 한 직선 구간에서 세기"),
      color: A,
      py: PY_S1, cpp: CPP_S1,
      why: [
        t(E,
          "Between two breakpoints the brightness is a straight line: F, F+s, F+2s, … So counting positions with brightness ≥ k is just: how many steps d keep F + s·d above k?",
          "두 꺾인점 사이에서 밝기는 직선이에요: F, F+s, F+2s, … 그러니 밝기 ≥ k 인 위치를 세는 건 'F + s·d 가 k 이상인 걸음 d 가 몇 개?' 를 묻는 거예요."),
        t(E,
          "Rising line (s>0): solve d ≥ ceil((k−F)/s). Falling line (s<0): solve d ≤ floor((k−F)/s). We use exact integer ceil/floor because k can be up to 10^18 — floats would lose precision.",
          "올라가는 직선(s>0): d ≥ ceil((k−F)/s). 내려가는 직선(s<0): d ≤ floor((k−F)/s). k 가 최대 10^18 이라 실수(float)는 오차가 나므로 정수 올림/내림으로 정확히 계산해요."),
      ],
      pyOnly: [
        t(E,
          "-(-num // s) is Python's trick for ceil division of positive integers; num // s already floors toward −∞.",
          "-(-num // s) 는 양수 올림나눗셈 파이썬 관용구예요; num // s 는 이미 −∞ 방향으로 내림해요."),
      ],
      cppOnly: [
        t(E,
          "C++ integer / truncates toward zero, so we add a floordiv helper to match Python's floor behavior for negatives.",
          "C++ 의 정수 / 는 0 방향으로 잘라서, 음수에서 파이썬 내림과 맞추려고 floordiv 도우미를 둬요."),
      ],
    },
    {
      label: t(E, "2️⃣ Tents → slope events → sweep", "2️⃣ 텐트 → 기울기 이벤트 → 훑기"),
      color: "#7c3aed",
      py: PY_S2, cpp: CPP_S2,
      why: [
        t(E,
          "One lamp's tent goes up by 1 per step from p−b, peaks at p, then down by 1 to p+b. As a slope, that's +1 at p−b, −2 at p (up→down), +1 at p+b (down→flat). Adding all tents = adding these events.",
          "한 램프의 텐트는 p−b 부터 한 칸에 +1 씩 올라가 p 에서 꼭대기, 그 뒤 p+b 까지 −1 씩 내려가요. 기울기로 보면 p−b 에서 +1, p 에서 −2 (오름→내림), p+b 에서 +1 (내림→평평). 모든 텐트를 더하는 건 이 이벤트들을 더하는 거예요."),
        t(E,
          "The summed profile only bends at those breakpoints. Sort them, walk left→right updating slope s and value F, and count integers on each flat/linear segment — no need to visit every x (positions span up to 10^12).",
          "합친 밝기 곡선은 그 꺾인점에서만 꺾여요. 꺾인점을 정렬해 왼쪽→오른쪽으로 기울기 s 와 값 F 를 갱신하며 각 구간의 정수만 세요 — 모든 x 를 방문할 필요 없어요 (위치는 최대 10^12 까지 퍼져요)."),
      ],
    },
    {
      label: t(E, "3️⃣ Read every test, print answers", "3️⃣ 테스트마다 읽고 답 출력"),
      color: "#6d28d9",
      py: PY_S3, cpp: CPP_S3,
      why: [
        t(E,
          "Up to 2×10^5 tests, so read all input at once and index through it. Collect answers and print them together — one integer per test.",
          "테스트가 최대 2×10^5 개라 입력을 한 번에 읽고 인덱스로 훑어요. 답을 모아 한꺼번에 출력해요 — 테스트마다 정수 하나."),
      ],
      pyOnly: [
        t(E,
          "Python ints are unbounded, so brightness sums (up to ~10^18) never overflow.",
          "파이썬 정수는 한계가 없어서 밝기 합(최대 ~10^18)이 넘칠 일이 없어요."),
      ],
      cppOnly: [
        t(E,
          "Use long long (typedef ll) everywhere — positions, brightness, and k all exceed 32-bit range.",
          "위치·밝기·k 모두 32비트를 넘으니 어디서나 long long(ll)을 써요."),
      ],
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Concept sim — summed triangular brightness.
   (Exported as Mcc22LampDeepAuditSim: the App imports that name.)

   Lamps at -5,-3,0,7 with brightness 3,2,6,1 (the official sample).
   Each lamp draws a triangular "tent"; we show the SUMMED profile as
   bars over integer x, shade positions where total >= k, and count
   them. The student drags k and bumps each lamp's brightness to feel
   how overlapping tents build a piecewise-linear hill — and that only
   the breakpoints p-b, p, p+b ever matter.
   ═══════════════════════════════════════════════════════════════ */
const _INIT_LAMPS = [
  { p: -5, b: 3 },
  { p: -3, b: 2 },
  { p: 0, b: 6 },
  { p: 7, b: 1 },
];

export function Mcc22LampDeepAuditSim({ E }) {
  const [lamps, setLamps] = useState(_INIT_LAMPS);
  const [k, setK] = useState(6);

  const bump = (i, d) => {
    setLamps((prev) => prev.map((l, j) => (j === i ? { ...l, b: Math.max(1, Math.min(9, l.b + d)) } : l)));
  };
  const reset = () => { setLamps(_INIT_LAMPS); setK(6); };

  const bright = (x) => lamps.reduce((s, l) => s + Math.max(0, l.b - Math.abs(l.p - x)), 0);

  const minX = Math.min(...lamps.map((l) => l.p - l.b));
  const maxX = Math.max(...lamps.map((l) => l.p + l.b));
  const xs = [];
  for (let x = minX; x <= maxX; x++) xs.push(x);

  const totals = xs.map(bright);
  const maxTotal = Math.max(1, ...totals);
  const scaleMax = Math.max(maxTotal, k, 1);
  const onCount = totals.filter((v) => v >= k).length;

  // breakpoint x-values (where the summed profile bends)
  const breaks = new Set();
  lamps.forEach((l) => { breaks.add(l.p - l.b); breaks.add(l.p); breaks.add(l.p + l.b); });

  const CHART_H = 120;
  const COL_W = 22;

  return (
    <div style={{ padding: 14 }}>
      {/* intro bubble */}
      <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 12, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
          🏕️ {t(E, "Each lamp is a tent of brightness", "램프 하나 = 밝기 텐트")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65 }}>
          {t(E,
            "Lamp i shines max(0, b − |p − x|) at position x: brightest right under it, fading 1 per step. Overlapping tents add up into a bumpy hill. We only care where the total reaches k — and that hill only bends at p−b, p, p+b.",
            "램프 i 는 위치 x 에서 max(0, b − |p − x|) 만큼 밝아요: 바로 아래가 제일 밝고 한 칸에 1씩 약해져요. 텐트가 겹치면 울퉁불퉁한 언덕이 돼요. 우리는 합이 k 에 닿는 곳만 궁금하고, 그 언덕은 p−b, p, p+b 에서만 꺾여요.")}
        </div>
      </div>

      {/* k control */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6" }}>{t(E, "threshold k =", "기준 k =")}</span>
        <button onClick={() => setK(Math.max(1, k - 1))} style={ctrlBtn}>−</button>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 800, color: A, minWidth: 22, textAlign: "center" }}>{k}</span>
        <button onClick={() => setK(Math.min(10, k + 1))} style={ctrlBtn}>+</button>
        <button onClick={reset} style={{ ...ctrlBtn, width: "auto", padding: "0 10px", fontSize: 12, fontWeight: 700 }}>
          {t(E, "↺ Reset", "↺ 초기화")}
        </button>
      </div>

      {/* chart */}
      <div style={{ overflowX: "auto", paddingBottom: 4 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", margin: "0 auto" }}>
          <div style={{ position: "relative", display: "flex", gap: 3, alignItems: "flex-end", height: CHART_H, borderBottom: `2px solid ${C.border}` }}>
            {/* threshold line */}
            <div style={{
              position: "absolute", left: 0, right: 0,
              bottom: Math.min(CHART_H, (k / scaleMax) * CHART_H),
              borderTop: "2px dashed #dc2626", pointerEvents: "none",
            }}>
              <span style={{ position: "absolute", right: 0, top: -16, fontSize: 10.5, fontWeight: 800, color: "#dc2626" }}>
                k={k}
              </span>
            </div>
            {xs.map((x, i) => {
              const v = totals[i];
              const on = v >= k;
              return (
                <div key={x} style={{ width: COL_W, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", height: "100%" }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: on ? "#b45309" : C.dim, marginBottom: 2 }}>{v}</span>
                  <div style={{
                    width: "100%",
                    height: Math.max(2, (v / scaleMax) * (CHART_H - 16)),
                    background: on ? "#f59e0b" : "#ddd6fe",
                    borderRadius: "4px 4px 0 0",
                    border: on ? "1px solid #d97706" : "1px solid #c4b5fd",
                  }} />
                </div>
              );
            })}
          </div>
          {/* x labels */}
          <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
            {xs.map((x) => {
              const isBreak = breaks.has(x);
              return (
                <div key={x} style={{
                  width: COL_W, textAlign: "center",
                  fontSize: 9.5, fontFamily: "'JetBrains Mono',monospace",
                  fontWeight: isBreak ? 800 : 500,
                  color: isBreak ? A : C.dim,
                  borderTop: isBreak ? `2px solid ${A}` : "2px solid transparent",
                }}>{x}</div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: 10.5, color: C.dim, marginTop: 6, ...KA }}>
        {t(E,
          "Amber bars ≥ k. Purple ticks below = breakpoints (p−b, p, p+b) — the only x where the hill bends.",
          "노란 막대 = k 이상. 아래 보라색 눈금 = 꺾인점 (p−b, p, p+b) — 언덕이 꺾이는 유일한 x.")}
      </div>

      {/* lamp controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
        {lamps.map((l, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 10, padding: "8px 10px",
          }}>
            <div style={{ fontSize: 11, color: "#6b21a8", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
              p={l.p}
            </div>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <button onClick={() => bump(i, -1)} style={miniBtn}>−</button>
              <span style={{ fontSize: 12.5, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace", minWidth: 34, textAlign: "center" }}>
                b={l.b}
              </span>
              <button onClick={() => bump(i, 1)} style={miniBtn}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* result */}
      <div style={{
        marginTop: 12, background: "#f5f3ff", border: `1px solid ${A}`, borderRadius: 10, padding: "10px 14px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, ...KA,
      }}>
        <div style={{ fontSize: 12.5, color: "#5b21b6", fontWeight: 700 }}>
          {t(E, "Positions with total brightness ≥ k:", "총 밝기 ≥ k 인 위치 수:")}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
          {onCount}
        </div>
      </div>
    </div>
  );
}

const ctrlBtn = {
  width: 30, height: 30, borderRadius: 8, border: `1.5px solid ${A}`, background: "#fff",
  color: A, fontSize: 18, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};
const miniBtn = {
  width: 24, height: 24, borderRadius: 6, border: "1px solid #c4b5fd", background: "#fff",
  color: "#6b21a8", fontSize: 15, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};

export function Mcc22LampProgressiveCode(props) {
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


export function downloadMcc22LampPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22Lamp — Full Study Guide", "Mcc22Lamp — 종합 풀이 노트");
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

export { FULL_PY, FULL_CPP };
