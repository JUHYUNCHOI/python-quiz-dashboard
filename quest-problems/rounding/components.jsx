import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

const A = "#0ea5e9";

const RND_SAMPLE = ["4", "1", "100", "4567", "3366"];

/* ════════════════════════════════════════════════════════════════════
   RoundingSimulator — pick x, see Bessie (one round) vs Elsie (chain).
   ════════════════════════════════════════════════════════════════════ */
function roundTo(x, b) {
  const p = Math.pow(10, b);
  const digit = Math.floor(x / Math.pow(10, b - 1)) % 10;
  if (digit >= 5) x += p;
  return x - (x % p);
}
function findP(x) {
  let P = 1;
  while (Math.pow(10, P) < x) P++;
  return P;
}

const RND_PRESETS = [5, 45, 49, 100, 449, 4500, 4567];

export function RoundingSimulator({ E }) {
  const [x, setX] = useState(45);
  const P = findP(x);

  const bessie = roundTo(x, P);
  const elsieSteps = [];
  let v = x;
  for (let k = 1; k <= P; k++) {
    const before = v;
    v = roundTo(v, k);
    elsieSteps.push({ k, before, after: v });
  }
  const elsie = v;
  const disagree = bessie !== elsie;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {RND_PRESETS.map((p) => (
          <button key={p} onClick={() => setX(p)} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${x === p ? A : C.border}`,
            background: x === p ? "#e0f2fe" : "#fff", color: x === p ? A : C.text, cursor: "pointer",
          }}>x = {p}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "6px 12px", alignItems: "center", marginBottom: 14, fontSize: 12 }}>
        <div style={{ fontWeight: 700, color: A, fontFamily: "'JetBrains Mono',monospace" }}>x =</div>
        <input type="number" min={2} max={99999} value={x}
          onChange={e => setX(Math.max(2, Math.min(99999, Number(e.target.value) || 2)))}
          style={{ padding: "4px 8px", border: `1.5px solid ${C.border}`, borderRadius: 6, fontSize: 13, fontFamily: "'JetBrains Mono',monospace", width: "100%" }} />
        <div style={{ fontWeight: 600, color: C.dim, fontSize: 11 }}>P = {P} (10^{P} = {Math.pow(10, P)})</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: "#e0f2fe", border: `1px solid ${A}`, borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#0c4a6e", marginBottom: 6 }}>
            👩‍🌾 {t(E, "Bessie — one round to 10^P", "Bessie — 10^P 한 번")}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, color: "#0c4a6e" }}>
            <div>round_to({x}, {P})</div>
            <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600 }}>= {bessie}</div>
          </div>
        </div>

        <div style={{ background: "#fee2e2", border: "1px solid #ef4444", borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>
            👧 {t(E, "Elsie — chain", "Elsie — 사슬")}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, lineHeight: 1.7, color: "#7f1d1d" }}>
            {elsieSteps.map((s, i) => (
              <div key={i}>
                10^{s.k}: {s.before} → {s.after}
              </div>
            ))}
            <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600 }}>= {elsie}</div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 14, padding: "10px 12px", borderRadius: 10,
        background: disagree ? "#fee2e2" : "#dcfce7",
        border: `1px solid ${disagree ? "#ef4444" : "#16a34a"}`,
        textAlign: "center", fontSize: 14, fontWeight: 600,
        color: disagree ? "#7f1d1d" : "#15803d",
      }}>
        {disagree
          ? t(E, `❌ DISAGREE — Bessie ${bessie} vs Elsie ${elsie}`, `❌ 불일치 — Bessie ${bessie} vs Elsie ${elsie}`)
          : t(E, `✅ AGREE — both ${bessie}`, `✅ 일치 — 둘 다 ${bessie}`)}
      </div>
    </div>
  );
}

export function RoundingSim({ E }) { return <RoundingSimulator E={E} />; }
export function RoundingRunner({ E }) {
  return <div style={{ padding: 14, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
    {t(E, "Use the simulator above.", "위 시뮬레이터 사용.")}
  </div>;
}

/* ════════════════════════════════════════════════════════════════════
   Progressive code: brute (1-3) → smart (4) for full credit.
   ════════════════════════════════════════════════════════════════════ */

const RND_S1_PY = [
  "import sys",
  "",
  "def round_to(x, b):",
  "    \"\"\"Bessie's round of x to nearest 10^b.\"\"\"",
  "    p = 10 ** b",
  "    # b-th digit from the right (1-indexed)",
  "    digit = (x // 10 ** (b - 1)) % 10",
  "    if digit >= 5:",
  "        x += p",
  "    # zero out positions 1..b",
  "    return x - (x % p)",
  "",
  "def find_P(x):",
  "    \"\"\"Smallest P with 10^P >= x.\"\"\"",
  "    P = 1",
  "    while 10 ** P < x:",
  "        P += 1",
  "    return P",
];
const RND_S1_CPP = [
  "#include <iostream>",
  "using namespace std;",
  "",
  "long long pow10(int b) {",
  "    long long r = 1;",
  "    for (int i = 0; i < b; i++) r *= 10;",
  "    return r;",
  "}",
  "",
  "long long round_to(long long x, int b) {",
  "    long long p = pow10(b);",
  "    int digit = (x / pow10(b - 1)) % 10;",
  "    if (digit >= 5) x += p;",
  "    return x - (x % p);",
  "}",
  "",
  "int find_P(long long x) {",
  "    int P = 1;",
  "    while (pow10(P) < x) P++;",
  "    return P;",
  "}",
];

const RND_S2_PY = [
  "# (round_to and find_P from step 1)",
  "",
  "def disagree(x):",
  "    \"\"\"Does Bessie(x) != Elsie(x)?\"\"\"",
  "    P = find_P(x)",
  "    bessie = round_to(x, P)",
  "    v = x",
  "    for k in range(1, P + 1):",
  "        v = round_to(v, k)",
  "    return bessie != v",
];
const RND_S2_CPP = [
  "// (round_to and find_P from step 1)",
  "",
  "bool disagree(long long x) {",
  "    int P = find_P(x);",
  "    long long bessie = round_to(x, P);",
  "    long long v = x;",
  "    for (int k = 1; k <= P; k++) {",
  "        v = round_to(v, k);",
  "    }",
  "    return bessie != v;",
  "}",
];

const RND_BRUTE_PY = [
  "import sys",
  "",
  "def round_to(x, b):",
  "    p = 10 ** b",
  "    digit = (x // 10 ** (b - 1)) % 10",
  "    if digit >= 5: x += p",
  "    return x - (x % p)",
  "",
  "def find_P(x):",
  "    P = 1",
  "    while 10 ** P < x: P += 1",
  "    return P",
  "",
  "data = sys.stdin.buffer.read().split()",
  "T = int(data[0])",
  "for t in range(1, T + 1):",
  "    N = int(data[t])",
  "    count = 0",
  "    for x in range(2, N + 1):",
  "        P = find_P(x)",
  "        bessie = round_to(x, P)",
  "        v = x",
  "        for k in range(1, P + 1):",
  "            v = round_to(v, k)",
  "        if bessie != v:",
  "            count += 1",
  "    print(count)",
];
const RND_BRUTE_CPP = [
  "#include <iostream>",
  "using namespace std;",
  "",
  "long long pow10(int b) { long long r=1; for(int i=0;i<b;i++) r*=10; return r; }",
  "",
  "long long round_to(long long x, int b) {",
  "    long long p = pow10(b);",
  "    int digit = (x / pow10(b - 1)) % 10;",
  "    if (digit >= 5) x += p;",
  "    return x - (x % p);",
  "}",
  "",
  "int find_P(long long x) { int P=1; while(pow10(P)<x) P++; return P; }",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        long long N;",
  "        cin >> N;",
  "        long long count = 0;",
  "        for (long long x = 2; x <= N; x++) {",
  "            int P = find_P(x);",
  "            long long bessie = round_to(x, P);",
  "            long long v = x;",
  "            for (int k = 1; k <= P; k++) v = round_to(v, k);",
  "            if (bessie != v) count++;",
  "        }",
  "        cout << count << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

const RND_FAST_PY = [
  "import sys",
  "from functools import lru_cache",
  "",
  "# Smart observation: disagree happens iff x has leading digit 4 AND",
  "# scanning lower digits from MSB to LSB hits a 5..9 before any 0..3",
  "# (treating 4 as 'continue').",
  "#",
  "# For full leading-4 ranges [4*10^(P-1), 5*10^(P-1)-1],",
  "# count = GC[P-1] = sum_{j=0..P-2} 5*10^j = (10^(P-1) - 1) * 5 / 9.",
  "#",
  "# For partial range when N cuts into the [4..., ...] block, use digit DP.",
  "",
  "data = sys.stdin.buffer.read().split()",
  "T = int(data[0])",
  "GC = [0]",
  "for k in range(1, 12):",
  "    GC.append(GC[-1] * 10 + 5)   # GC[1]=5, GC[2]=55, GC[3]=555, ...",
  "",
  "for t in range(1, T + 1):",
  "    N = int(data[t])",
  "    ans = 0",
  "    if N >= 10:",
  "        P = 2",
  "        while 10 ** (P - 1) <= N:",
  "            lo = 4 * 10 ** (P - 1)         # smallest leading-4 P-digit number",
  "            hi_full = 5 * 10 ** (P - 1) - 1  # largest leading-4 P-digit number",
  "            if N >= lo:",
  "                if N >= hi_full:",
  "                    ans += GC[P - 1]",
  "                else:",
  "                    M = N - lo  # x - lo ranges in [0, M]",
  "                    k = P - 1",
  "                    digits = [(M // 10 ** (k - 1 - i)) % 10 for i in range(k)]",
  "                    @lru_cache(maxsize=None)",
  "                    def f(pos, tight, q):",
  "                        if pos == k:",
  "                            return 1 if q == 1 else 0",
  "                        max_d = digits[pos] if tight else 9",
  "                        r = 0",
  "                        for d in range(max_d + 1):",
  "                            nt = tight and (d == max_d)",
  "                            if q == 0:",
  "                                nq = 0 if d == 4 else (1 if d >= 5 else 2)",
  "                            else:",
  "                                nq = q",
  "                            r += f(pos + 1, nt, nq)",
  "                        return r",
  "                    ans += f(0, True, 0)",
  "                    f.cache_clear()",
  "            P += 1",
  "    print(ans)",
];
const RND_FAST_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <cstring>",
  "using namespace std;",
  "",
  "long long pow10(int b) { long long r=1; for(int i=0;i<b;i++) r*=10; return r; }",
  "",
  "long long memo[12][2][3];",
  "vector<int> digits_;",
  "int k_;",
  "",
  "long long f(int pos, int tight, int q) {",
  "    if (pos == k_) return q == 1 ? 1 : 0;",
  "    long long& v = memo[pos][tight][q];",
  "    if (v != -1) return v;",
  "    int max_d = tight ? digits_[pos] : 9;",
  "    long long r = 0;",
  "    for (int d = 0; d <= max_d; d++) {",
  "        int nt = tight && (d == max_d);",
  "        int nq;",
  "        if (q == 0) nq = (d == 4) ? 0 : (d >= 5 ? 1 : 2);",
  "        else nq = q;",
  "        r += f(pos + 1, nt, nq);",
  "    }",
  "    return v = r;",
  "}",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int T;",
  "    cin >> T;",
  "    long long GC[12] = {0};",
  "    for (int k = 1; k < 12; k++) GC[k] = GC[k-1] * 10 + 5;",
  "    while (T--) {",
  "        long long N;",
  "        cin >> N;",
  "        long long ans = 0;",
  "        if (N >= 10) {",
  "            int P = 2;",
  "            while (pow10(P - 1) <= N) {",
  "                long long lo = 4 * pow10(P - 1);",
  "                long long hi_full = 5 * pow10(P - 1) - 1;",
  "                if (N >= lo) {",
  "                    if (N >= hi_full) ans += GC[P - 1];",
  "                    else {",
  "                        long long M = N - lo;",
  "                        k_ = P - 1;",
  "                        digits_.assign(k_, 0);",
  "                        for (int i = 0; i < k_; i++) digits_[i] = (M / pow10(k_ - 1 - i)) % 10;",
  "                        memset(memo, -1, sizeof(memo));",
  "                        ans += f(0, 1, 0);",
  "                    }",
  "                }",
  "                P++;",
  "            }",
  "        }",
  "        cout << ans << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getRoundingSections(E) {
  return [
    {
      label: t(E, "1️⃣ Helper functions: round_to, find_P", "1️⃣ 도우미: round_to, find_P"),
      color: A,
      py: RND_S1_PY, cpp: RND_S1_CPP,
      why: [
        t(E, "round_to(x, b) implements Bessie's single-step round to 10^b. find_P(x) is the smallest P with 10^P ≥ x.",
            "round_to(x, b) 는 Bessie 의 한 단계 10^b 반올림. find_P(x) 는 10^P ≥ x 인 최소 P."),
        t(E, "Both Bessie and Elsie reuse round_to — Bessie calls it once, Elsie calls it P times.",
            "Bessie 와 Elsie 둘 다 round_to 재사용 — Bessie 한 번, Elsie P 번."),
      ],
      aside: <SampleInputAside E={E} sample={RND_SAMPLE} highlight={[0]} note={t(E,
        "First line: T = 4 test cases.",
        "첫 줄: T = 4 케이스.")} />,
    },
    {
      label: t(E, "2️⃣ disagree(x) — compare Bessie vs Elsie", "2️⃣ disagree(x) — Bessie vs Elsie 비교"),
      color: "#7c3aed",
      py: RND_S2_PY, cpp: RND_S2_CPP,
      why: [
        t(E, "Bessie: a single call round_to(x, P).",
            "Bessie: round_to(x, P) 한 번 호출."),
        t(E, "Elsie: chain calls k = 1, 2, …, P, accumulating into v.",
            "Elsie: k = 1, 2, ..., P 차례로 호출, v 에 누적."),
        t(E, "Return True iff they differ.",
            "다르면 True."),
      ],
    },
    {
      label: t(E, "3️⃣ Brute: count for each x in [2, N]", "3️⃣ Brute: [2, N] 각 x 마다 세기"),
      color: "#dc2626",
      py: RND_BRUTE_PY, cpp: RND_BRUTE_CPP,
      why: [
        t(E, "Loop x from 2 to N, increment count when disagree(x).",
            "x = 2..N 순회, disagree(x) 면 count 증가."),
        t(E, "Per case O(N · log N). At N = 10⁹ → 10¹⁰ ops — TLE.",
            "케이스당 O(N · log N). N = 10⁹ 면 10¹⁰ — TLE."),
        t(E, "Passes inputs with small N for partial credit.",
            "작은 N 입력 통과 (부분점수)."),
      ],
    },
    {
      label: t(E, "4️⃣ Smart: digit DP for full credit", "4️⃣ Smart: 풀점수용 digit DP"),
      color: "#15803d",
      py: RND_FAST_PY, cpp: RND_FAST_CPP,
      why: [
        t(E, "Observation: disagreement happens ONLY when x has leading digit 4 (P-digit number) AND chain rounding propagates through.",
            "관찰: 불일치는 x 의 첫 자리 = 4 (P 자리수) AND 사슬 반올림이 끝까지 전파되는 경우뿐."),
        t(E, "Chain propagates iff scanning d_{P-2}, d_{P-3}, …, d_0 from high to low, the first non-4 digit is ≥ 5 (with 4 = continue).",
            "사슬 전파 조건: d_{P-2}, ..., d_0 위에서 아래로 훑을 때 첫 non-4 가 ≥ 5 (4 는 continue)."),
        t(E, "For each P, count leading-4 P-digit numbers ≤ N satisfying this. Full leading-4 ranges have closed-form GC[P-1] = 5·(10^(P-1)−1)/9. Partial ranges use digit DP.",
            "각 P 마다 첫자리 4, P 자리수, ≤ N 인 수 중 조건 만족하는 것 세기. 전체 범위는 closed-form GC[P-1]. 부분 범위는 digit DP."),
        t(E, "Total: O(log²N) per query — fits T = 10⁵ queries in ms.",
            "총: 쿼리당 O(log²N) — T = 10⁵ 쿼리 ms 단위."),
      ],
    },
  ];
}

export function RoundingProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* PDF export */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sum","lru_cache","functools"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","map","pair","memset"];
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadRoundingPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Roundabout Rounding — Full Study Guide", "🔄 Roundabout Rounding — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A}; color: white; }
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
<div class="sub">USACO December 2024 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
<h2>${t(E, "Code (4 sections)", "코드 (4 섹션)")}</h2>
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
