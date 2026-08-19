import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";
const KA = { wordBreak: "keep-all" };

/* ── full programs (used for the PDF export & as the canonical reference) ── */
const FULL_PY = [
  "MOD = 10**9 + 7",
  "N, P = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "if P == 1:                       # ➕ 더하기",
  "    # 각 수는 2^(N-1) 개의 부분집합에 등장한다",
  "    ans = pow(2, N - 1, MOD) * (sum(a) % MOD) % MOD",
  "",
  "elif P == 2:                     # ✖️ 곱하기",
  "    # 모든 부분집합 곱의 합 = (1+A1)(1+A2)...(1+An) - 1",
  "    prod = 1",
  "    for x in a:",
  "        prod = prod * (1 + x) % MOD",
  "    ans = (prod - 1) % MOD",
  "",
  "else:                            # ⊕ XOR (P == 3)",
  "    # 비트마다: 그 비트를 홀수 개 고른 부분집합만 기여",
  "    ans = 0",
  "    for bit in range(31):",
  "        k = sum(1 for x in a if (x >> bit) & 1)",
  "        if k == 0:",
  "            continue",
  "        factor = pow(2, k - 1, MOD) * pow(2, N - k, MOD) % MOD",
  "        ans = (ans + (1 << bit) % MOD * factor) % MOD",
  "    ans %= MOD",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "const long long MOD = 1000000007LL;",
  "",
  "long long pw(long long b, long long e) {   // (b^e) mod MOD",
  "    long long r = 1; b %= MOD;",
  "    while (e > 0) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }",
  "    return r;",
  "}",
  "",
  "int main() {",
  "    int N, P; cin >> N >> P;",
  "    vector<long long> a(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
  "",
  "    long long ans = 0;",
  "    if (P == 1) {                       // ➕ 더하기",
  "        long long s = 0;",
  "        for (int i = 0; i < N; i++) s = (s + a[i]) % MOD;",
  "        ans = pw(2, N - 1) * s % MOD;",
  "    } else if (P == 2) {                // ✖️ 곱하기",
  "        long long prod = 1;",
  "        for (int i = 0; i < N; i++) prod = prod * ((1 + a[i]) % MOD) % MOD;",
  "        ans = (prod - 1 + MOD) % MOD;",
  "    } else {                            // ⊕ XOR",
  "        for (int bit = 0; bit < 31; bit++) {",
  "            long long k = 0;",
  "            for (int i = 0; i < N; i++) if ((a[i] >> bit) & 1) k++;",
  "            if (k == 0) continue;",
  "            long long f = pw(2, k - 1) * pw(2, N - k) % MOD;",
  "            ans = (ans + ((1LL << bit) % MOD) * f) % MOD;",
  "        }",
  "    }",
  "",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

/* ── per-section fragments for the progressive stepper ── */
const PY_SETUP = [
  "MOD = 10**9 + 7",
  "N, P = map(int, input().split())",
  "a = list(map(int, input().split()))",
];
const CPP_SETUP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "const long long MOD = 1000000007LL;",
  "",
  "long long pw(long long b, long long e) {   // (b^e) mod MOD",
  "    long long r = 1; b %= MOD;",
  "    while (e > 0) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }",
  "    return r;",
  "}",
  "int N, P; vector<long long> a;   // 입력은 main() 에서 읽음",
];

const PY_ADD = [
  "if P == 1:                       # ➕ 더하기",
  "    # 수 하나를 고정하면 나머지 N-1 개는 자유",
  "    # → 2^(N-1) 개의 부분집합에 그 수가 들어간다",
  "    ans = pow(2, N - 1, MOD) * (sum(a) % MOD) % MOD",
];
const CPP_ADD = [
  "if (P == 1) {                       // ➕ 더하기",
  "    long long s = 0;",
  "    for (int i = 0; i < N; i++) s = (s + a[i]) % MOD;",
  "    ans = pw(2, N - 1) * s % MOD;   // 각 수 x 2^(N-1)",
  "}",
];

const PY_MUL = [
  "elif P == 2:                     # ✖️ 곱하기",
  "    # (1+A1)(1+A2)...(1+An) 를 펼치면",
  "    # 각 항이 부분집합 하나의 곱 (빈 집합 = 1 만 빼면 됨)",
  "    prod = 1",
  "    for x in a:",
  "        prod = prod * (1 + x) % MOD",
  "    ans = (prod - 1) % MOD",
];
const CPP_MUL = [
  "else if (P == 2) {                  // ✖️ 곱하기",
  "    long long prod = 1;",
  "    for (int i = 0; i < N; i++) prod = prod * ((1 + a[i]) % MOD) % MOD;",
  "    ans = (prod - 1 + MOD) % MOD;   // 빈 집합(=1) 만 빼기",
  "}",
];

const PY_XOR = [
  "else:                            # ⊕ XOR (P == 3)",
  "    ans = 0",
  "    for bit in range(31):",
  "        # 이 비트를 가진 원소가 k 개일 때,",
  "        # 홀수 개 고르기: 2^(k-1) 가지, 나머지 자유: 2^(N-k)",
  "        k = sum(1 for x in a if (x >> bit) & 1)",
  "        if k == 0:",
  "            continue",
  "        factor = pow(2, k - 1, MOD) * pow(2, N - k, MOD) % MOD",
  "        ans = (ans + (1 << bit) % MOD * factor) % MOD",
  "    ans %= MOD",
];
const CPP_XOR = [
  "else {                              // ⊕ XOR",
  "    for (int bit = 0; bit < 31; bit++) {",
  "        long long k = 0;",
  "        for (int i = 0; i < N; i++) if ((a[i] >> bit) & 1) k++;",
  "        if (k == 0) continue;",
  "        long long f = pw(2, k - 1) * pw(2, N - k) % MOD;   // 2^(k-1)·2^(N-k)",
  "        ans = (ans + ((1LL << bit) % MOD) * f) % MOD;",
  "    }",
  "}",
];

const PY_OUT = ["print(ans)"];
const CPP_OUT = ["cout << ans << \"\\n\";"];

export function getMcc21SimpleMathSections(E) {
  return [
    {
      label: t(E, "📥 1. Read input & why counting", "📥 1. 입력 읽기 · 왜 세는가"),
      color: A,
      py: PY_SETUP, cpp: CPP_SETUP,
      why: [
        t(E,
          "N numbers give 2^N − 1 nonempty subsets — up to 2^50000. We can NEVER list them all, so we count each part's contribution instead of enumerating subsets.",
          "N 개의 수는 부분집합이 2^N − 1 개 — 최대 2^50000 개예요. 절대 다 나열할 수 없으니, 부분집합을 하나하나 만드는 대신 각 부분의 '기여'를 세요."),
        t(E,
          "MOD = 10^9 + 7: keep every running value mod MOD so numbers stay small.",
          "MOD = 10^9 + 7: 계산 값을 항상 MOD 로 나눈 나머지로 유지해 수를 작게 지켜요."),
      ],
    },
    {
      label: t(E, "➕ 2. P = 1  (addition)", "➕ 2. P = 1  (덧셈)"),
      color: A,
      py: PY_ADD, cpp: CPP_ADD,
      why: [
        t(E,
          "Pin one number down. The other N−1 numbers are each either in or out, so it sits in 2^(N-1) different subsets.",
          "수 하나를 고정해요. 나머지 N−1 개는 각각 있거나 없거나이니, 그 수는 2^(N-1) 개의 부분집합에 들어가요."),
        t(E,
          "So every number is added 2^(N-1) times → answer = 2^(N-1) · (sum of all numbers).",
          "그래서 모든 수는 2^(N-1) 번 더해져요 → 답 = 2^(N-1) · (전체 합)."),
      ],
    },
    {
      label: t(E, "✖️ 3. P = 2  (multiplication)", "✖️ 3. P = 2  (곱셈)"),
      color: A,
      py: PY_MUL, cpp: CPP_MUL,
      why: [
        t(E,
          "Expand (1+A₁)(1+A₂)…(1+Aₙ). Every way of picking '1 or Aᵢ' from each factor is one term — exactly one subset's product.",
          "(1+A₁)(1+A₂)…(1+Aₙ) 를 펼쳐요. 각 괄호에서 '1 또는 Aᵢ' 를 고르는 모든 방법이 한 항 — 정확히 한 부분집합의 곱이에요."),
        t(E,
          "That covers ALL subsets including the empty one (all 1's → product 1). Subtract that 1 → sum over nonempty subsets.",
          "그러면 빈 집합(모두 1 → 곱 1)까지 모든 부분집합이 나와요. 그 1 만 빼면 → 비어있지 않은 부분집합들의 합."),
      ],
    },
    {
      label: t(E, "⊕ 4. P = 3  (bitwise XOR)", "⊕ 4. P = 3  (비트 XOR)"),
      color: A,
      py: PY_XOR, cpp: CPP_XOR,
      why: [
        t(E,
          "XOR works bit by bit, independently. A bit of the result is 1 only when an ODD number of chosen elements have that bit.",
          "XOR 는 비트마다 따로 작동해요. 결과의 어떤 비트가 1 이 되려면, 그 비트를 가진 원소를 홀수 개 골라야 해요."),
        t(E,
          "If k elements have that bit: odd-count ways = 2^(k-1), and the other N−k elements are free = 2^(N-k). Multiply, times the bit's value, sum over bits.",
          "그 비트를 가진 원소가 k 개면: 홀수 개 고르기 = 2^(k-1) 가지, 나머지 N−k 개는 자유 = 2^(N-k) 가지. 둘을 곱하고 비트 값을 곱해 모든 비트에 대해 더해요."),
      ],
    },
    {
      label: t(E, "🖨️ 5. Print the answer", "🖨️ 5. 답 출력"),
      color: A,
      py: PY_OUT, cpp: CPP_OUT,
      why: [
        t(E,
          "All three branches already keep ans mod 10^9+7, so we just print it.",
          "세 분기 모두 ans 를 이미 10^9+7 로 나눈 나머지로 유지했으니, 그대로 출력해요."),
        t(E,
          "Each branch is O(N) (XOR is O(31·N)) — fast even for N = 50000, while listing 2^N subsets would be impossible.",
          "각 분기는 O(N) (XOR 은 O(31·N)) — N = 50000 도 빨라요. 2^N 개 부분집합을 나열하는 건 불가능하죠."),
      ],
    },
  ];
}

export function Mcc21SimpleMathProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* ═══════════════════════════════════════════════════════════════
   Concept sim — for the set {1,2,3}, pick an operator (+ / × / ⊕),
   LIST all 7 nonempty subsets with each subset's combined value and
   the running total, then reveal the counting shortcut that gives
   the same total without listing anything.
   ═══════════════════════════════════════════════════════════════ */
const SET = [1, 2, 3];
const N = SET.length;

// all nonempty subsets, ordered by size then value
const SUBSETS = [];
for (let mask = 1; mask < (1 << N); mask++) {
  const items = [];
  for (let i = 0; i < N; i++) if (mask & (1 << i)) items.push(SET[i]);
  SUBSETS.push(items);
}
SUBSETS.sort((x, y) => x.length - y.length || x.join(",").localeCompare(y.join(",")));

function combine(items, P) {
  if (P === 1) return items.reduce((s, v) => s + v, 0);
  if (P === 2) return items.reduce((s, v) => s * v, 1);
  return items.reduce((s, v) => s ^ v, 0);
}

export function Mcc21SimpleMathOpSim({ E }) {
  const [P, setP] = useState(1);
  const [showShortcut, setShowShortcut] = useState(false);

  const opSym = P === 1 ? "+" : P === 2 ? "×" : "⊕";
  const opName = P === 1
    ? t(E, "add (+)", "더하기 (+)")
    : P === 2
      ? t(E, "multiply (×)", "곱하기 (×)")
      : t(E, "XOR (⊕)", "XOR (⊕)");

  let running = 0;
  const rows = SUBSETS.map((items) => {
    const v = combine(items, P);
    running += v;
    return { items, v, total: running };
  });
  const finalTotal = running; // 24 / 23 / 12

  const chip = (n) => (
    <span key={n} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 22, height: 22, padding: "0 5px", borderRadius: 6,
      fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 800,
      border: "1px solid #fdba74", background: "#fff", color: "#9a3412",
    }}>{n}</span>
  );

  const shortcut = () => {
    if (P === 1) {
      return t(E,
        "Each number sits in 2^(N-1) = 4 subsets → 4 × (1+2+3) = 4 × 6 = 24.",
        "각 수는 2^(N-1) = 4 개의 부분집합에 등장 → 4 × (1+2+3) = 4 × 6 = 24.");
    }
    if (P === 2) {
      return t(E,
        "∏(1+Aᵢ) − 1 = (1+1)(1+2)(1+3) − 1 = 2·3·4 − 1 = 24 − 1 = 23.",
        "∏(1+Aᵢ) − 1 = (1+1)(1+2)(1+3) − 1 = 2·3·4 − 1 = 24 − 1 = 23.");
    }
    return t(E,
      "Per bit: bit0(=1) is in {1,3}, k=2 → 2^(k-1)·2^(N-k)=2·2=4 subsets → 1×4=4. bit1(=2) is in {2,3}, k=2 → 4 subsets → 2×4=8. Total 4+8 = 12.",
      "비트마다: 비트0(값 1)은 {1,3}에, k=2 → 2^(k-1)·2^(N-k)=2·2=4 개 → 1×4=4. 비트1(값 2)은 {2,3}에, k=2 → 4 개 → 2×4=8. 합 4+8 = 12.");
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 6 }}>
          🧮 {t(E, "Set A = {1, 2, 3} — every nonempty subset", "집합 A = {1, 2, 3} — 비어있지 않은 모든 부분집합")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "Combine each subset with the operator, then SUM those values over all subsets. Switch the operator and watch the total.",
            "각 부분집합을 연산자로 합치고, 그 값들을 모든 부분집합에 대해 다 더해요. 연산자를 바꿔가며 합계를 봐요.")}
        </div>

        {/* operator toggle */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {[1, 2, 3].map((p) => (
            <button key={p} onClick={() => { setP(p); setShowShortcut(false); }} style={{
              flex: 1, padding: "8px 0", borderRadius: 8,
              border: P === p ? `2px solid ${A}` : `1px solid ${C.border}`,
              background: P === p ? "#ffedd5" : "#fff",
              color: P === p ? "#9a3412" : C.text,
              fontSize: 12.5, fontWeight: 800, cursor: "pointer",
            }}>
              {p === 1 ? "P=1  +" : p === 2 ? "P=2  ×" : "P=3  ⊕"}
            </button>
          ))}
        </div>

        {/* the 7 subsets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", fontSize: 10.5, color: C.dim, fontWeight: 800, letterSpacing: 0.3, padding: "0 8px", marginBottom: 2 }}>
            <span style={{ flex: 1 }}>{t(E, "subset", "부분집합")}</span>
            <span style={{ width: 96, textAlign: "right" }}>{t(E, "combined", "합친 값")}</span>
            <span style={{ width: 88, textAlign: "right" }}>{t(E, "running sum", "누적 합")}</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", background: "#fff",
              border: "1px solid #fed7aa", borderRadius: 8, padding: "6px 8px",
            }}>
              <span style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                <span style={{ color: C.dim, fontSize: 11 }}>{"{"}</span>
                {r.items.map((n, j) => (
                  <span key={j} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {j > 0 && <span style={{ color: A, fontWeight: 800, fontSize: 12 }}>{opSym}</span>}
                    {chip(n)}
                  </span>
                ))}
                <span style={{ color: C.dim, fontSize: 11 }}>{"}"}</span>
              </span>
              <span style={{ width: 96, textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: "#9a3412" }}>
                = {r.v}
              </span>
              <span style={{ width: 88, textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: A }}>
                {r.total}
              </span>
            </div>
          ))}
        </div>

        {/* total */}
        <div style={{ marginTop: 10, background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, ...KA }}>
          {t(E, "sum over all 7 subsets ", "7 개 부분집합의 합 ")}
          (<b style={{ color: "#fdba74" }}>{opName}</b>) = <b style={{ color: "#fb923c", fontSize: 15 }}>{finalTotal}</b>
        </div>

        {/* shortcut */}
        <div style={{ marginTop: 12 }}>
          <button onClick={() => setShowShortcut((v) => !v)} style={{
            padding: "6px 12px", borderRadius: 8, border: `1.5px solid ${A}`,
            background: showShortcut ? A : "#fff", color: showShortcut ? "#fff" : A,
            fontSize: 12, fontWeight: 800, cursor: "pointer",
          }}>
            {showShortcut ? t(E, "▲ hide the shortcut", "▲ 지름길 접기") : t(E, "▼ show the counting shortcut", "▼ 세는 지름길 보기")}
          </button>
          {showShortcut && (
            <div style={{ marginTop: 10, background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", ...KA }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "same total, no listing", "나열 없이 같은 합")}
              </div>
              <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, fontFamily: "'JetBrains Mono',monospace" }}>
                {shortcut()}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 12, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            "With just 3 numbers we can list all 7 subsets. But N can be 50000 → 2^N subsets, far too many to list. So we count each number's / each bit's contribution instead.",
            "수가 3 개뿐이면 7 개 부분집합을 다 적을 수 있어요. 하지만 N 은 50000 까지 → 2^N 개 부분집합, 도저히 나열 못 해요. 그래서 각 수 · 각 비트의 기여를 대신 세요.")}
        </div>
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

export function downloadMcc21SimpleMathPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21SimpleMath — Full Study Guide", "Mcc21SimpleMath — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const fullCode = codeBlock(lang === "py" ? FULL_PY : FULL_CPP);
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
<div class="sub">MCC 2021 P5 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${(s.why || []).map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
  <h3 style="background:${A}20;color:${A};padding:6px 10px;border-radius:6px;">🧩 ${t(E, "Full program", "전체 코드")}</h3>
  ${fullCode}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
