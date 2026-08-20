import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";
const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* ═══════════════════════════════════════════════════════════════
   SubseqMedianSim — "median center" explorer.
   Pick a position i as the median center v = A[i].  We highlight the
   strictly-increasing choices smaller than v BEFORE it and larger than
   v AFTER it.  Pairing k picks on each side makes a good (odd-length,
   strictly-increasing) subsequence of length 2k+1 with v in the middle.
   The panel counts L_k · R_k for every k and shows each center's
   contribution v·Σ_k L_k·R_k — the pieces add up to the answer.
   ═══════════════════════════════════════════════════════════════ */

// count[k] = number of strictly-increasing subsequences of length k
// that can be formed from the given value list (order preserved).
// count[0] = 1 (the empty pick).
function incrCountsByLen(vals) {
  const n = vals.length;
  // dp[i][L] = # strictly-increasing subseqs of length L ending at i
  const dp = vals.map(() => [0]); // dp[i][1..]
  for (let i = 0; i < n; i++) {
    dp[i][1] = 1;
    for (let j = 0; j < i; j++) {
      if (vals[j] < vals[i]) {
        for (let L = 1; L < dp[j].length; L++) {
          dp[i][L + 1] = (dp[i][L + 1] || 0) + (dp[j][L] || 0);
        }
      }
    }
  }
  const counts = [1]; // length 0
  for (let i = 0; i < n; i++) {
    for (let L = 1; L < dp[i].length; L++) {
      counts[L] = (counts[L] || 0) + (dp[i][L] || 0);
    }
  }
  return counts; // counts[k] for k = 0,1,2,...
}

// contribution of choosing index i as the median center
function centerContribution(arr, i) {
  const v = arr[i];
  const leftVals = [];
  for (let j = 0; j < i; j++) if (arr[j] < v) leftVals.push(arr[j]);
  const rightVals = [];
  for (let j = i + 1; j < arr.length; j++) if (arr[j] > v) rightVals.push(arr[j]);
  const L = incrCountsByLen(leftVals);
  const R = incrCountsByLen(rightVals);
  const maxK = Math.min(L.length, R.length);
  const perK = [];
  let total = 0;
  for (let k = 0; k < maxK; k++) {
    const lk = L[k] || 0, rk = R[k] || 0;
    perK.push({ k, lk, rk, prod: lk * rk });
    total += lk * rk;
  }
  return { v, total, perK, contribution: v * total };
}

const _SSM_PRESETS = [
  { name: "[1,2,4,3]", arr: [1, 2, 4, 3] },
  { name: "[1,2,3]", arr: [1, 2, 3] },
  { name: "[3,1,4,1,5]", arr: [3, 1, 4, 1, 5] },
];

export function SubseqMedianSim({ E }) {
  const [pi, setPi] = useState(0);
  const [center, setCenter] = useState(1); // selected center index
  const arr = _SSM_PRESETS[pi].arr;
  const ci = Math.min(center, arr.length - 1);
  const v = arr[ci];

  // classify each cell relative to the center
  const kind = (j) => {
    if (j === ci) return "center";
    if (j < ci) return arr[j] < v ? "leftPick" : "leftSkip";
    return arr[j] > v ? "rightPick" : "rightSkip";
  };

  // full table: every center's contribution (builds toward the answer)
  const rows = arr.map((_, i) => ({ i, ...centerContribution(arr, i) }));
  const grand = rows.reduce((s, r) => s + r.contribution, 0);
  const here = rows[ci];

  const cellStyle = (k) => {
    const base = {
      width: 40, height: 40, borderRadius: 8, cursor: "pointer",
      fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
      transition: "all 120ms", border: "2px solid",
    };
    if (k === "center") return { ...base, borderColor: A, background: A, color: "#fff" };
    if (k === "leftPick") return { ...base, borderColor: "#059669", background: "#d1fae5", color: "#065f46" };
    if (k === "rightPick") return { ...base, borderColor: "#7c3aed", background: "#ede9fe", color: "#5b21b6" };
    return { ...base, borderColor: C.border, background: "#fff", color: "#9ca3af" };
  };

  return (
    <div style={{ padding: 14, ...KA }}>
      {/* preset picker */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_SSM_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setCenter(0); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p.name}</button>
        ))}
      </div>

      <div style={{ fontSize: 11.5, color: C.dim, textAlign: "center", marginBottom: 8, ...KA }}>
        {t(E, "Click a cell to make it the median center. Then look at what's around it.",
             "칸을 눌러 가운데(중앙값)로 삼아봐요. 그 다음 양옆을 살펴봐요.")}
      </div>

      {/* the array */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 6, flexWrap: "wrap" }}>
        {arr.map((val, j) => (
          <button key={j} onClick={() => setCenter(j)} style={cellStyle(kind(j))}>{val}</button>
        ))}
      </div>

      {/* legend */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", fontSize: 11, marginBottom: 12 }}>
        <span style={{ ...NW, color: "#065f46" }}>🟩 {t(E, "smaller · before", "작은 값 · 왼쪽")}</span>
        <span style={{ ...NW, color: A, fontWeight: 700 }}>⬛ {t(E, "center (median)", "가운데 (중앙값)")}</span>
        <span style={{ ...NW, color: "#5b21b6" }}>🟪 {t(E, "larger · after", "큰 값 · 오른쪽")}</span>
      </div>

      {/* the pairing story for THIS center */}
      <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12.5, color: C.text, lineHeight: 1.7, ...KA }}>
        <div style={{ marginBottom: 6 }}>
          {t(E, "Center", "가운데")} <b style={{ color: A, fontFamily: "'JetBrains Mono',monospace" }}>v = {v}</b>.{" "}
          {t(E,
            "To make v the median, pick the SAME number k of increasing values on each side — k smaller-and-before, k larger-and-after. That's a good subsequence of length 2k+1 with v in the middle.",
            "v 를 중앙값으로 만들려면 양쪽에서 같은 개수 k 만큼 증가하는 값을 골라요 — 왼쪽 작은 값 k 개, 오른쪽 큰 값 k 개. 그러면 길이 2k+1 의 좋은 부분수열, 가운데가 v 예요.")}
        </div>
        {/* per-k table: L_k · R_k */}
        <div style={{ background: "#fff", borderRadius: 8, padding: "6px 8px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          {here.perK.map((row) => (
            <div key={row.k} style={{ display: "flex", justifyContent: "space-between", padding: "2px 0", color: row.prod > 0 ? C.text : "#9ca3af" }}>
              <span>k={row.k}: {t(E, "len", "길이")} {2 * row.k + 1}</span>
              <span>L<sub>{row.k}</sub>·R<sub>{row.k}</sub> = {row.lk}·{row.rk} = <b style={{ color: row.prod > 0 ? A : "#9ca3af" }}>{row.prod}</b></span>
            </div>
          ))}
          <div style={{ borderTop: "1px dashed #86efac", marginTop: 4, paddingTop: 4, display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
            <span>{t(E, "contribution", "기여")} = v · Σ</span>
            <span style={{ color: A }}>{v} · {here.total} = {here.contribution}</span>
          </div>
        </div>
      </div>

      {/* ledger: all centers add up to the answer */}
      <div style={{ background: "#0f172a", color: "#f8fafc", borderRadius: 10, padding: "10px 12px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, ...KA }}>
        <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 4 }}>
          {t(E, "every position as a center, added up", "모든 위치를 가운데로 삼아 더하면")}
        </div>
        {rows.map((r) => (
          <div key={r.i} style={{ display: "flex", justifyContent: "space-between", color: r.i === ci ? "#6ee7b7" : "#cbd5e1", fontWeight: r.i === ci ? 800 : 400 }}>
            <span>{t(E, "center", "가운데")} A[{r.i}]={r.v}</span>
            <span>{r.v} · {r.total} = {r.contribution}</span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid #334155", marginTop: 6, paddingTop: 6, display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
          <span style={{ color: "#fbbf24" }}>{t(E, "SUM", "합")}</span>
          <span style={{ color: "#34d399" }}>{grand}</span>
        </div>
      </div>

      <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", ...KA }}>
        {t(E,
          "For [1,2,4,3] the pieces are 1 + 6 + 4 + 3 = 14 — the answer.",
          "[1,2,4,3] 이면 조각들이 1 + 6 + 4 + 3 = 14 — 바로 답이에요.")}
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE  (correct, but only fast enough for small inputs)
   For A[i]=v to be the median of a good subseq of length 2k+1, we need
   k strictly-increasing elements < v before i, AND k strictly-increasing
   elements > v after i.  Contribution = v · Σ_k L_k(i)·R_k(i).
   L_k, R_k are built level-by-level with a Fenwick tree over compressed
   values.  Worst case O(N^2 log N) — passes small subtasks, TLEs at N=8000.
   ================================================================ */
const FULL_PY = [
  "import sys",
  "def main():",
  "    MOD = 998244353",
  "    data = sys.stdin.buffer.read().split()",
  "    n = int(data[0])",
  "    A = [int(x) for x in data[1:1+n]]",
  "",
  "    # compress values to ranks 1..m (A_i up to 1e9)",
  "    vals = sorted(set(A))",
  "    rank = {v: i + 1 for i, v in enumerate(vals)}",
  "    m = len(vals)",
  "",
  "    # Fenwick (BIT) over compressed values",
  "    def upd(bit, pos, val):",
  "        while pos <= m:",
  "            bit[pos] = (bit[pos] + val) % MOD",
  "            pos += pos & (-pos)",
  "    def qry(bit, pos):",
  "        s = 0",
  "        while pos > 0:",
  "            s = (s + bit[pos]) % MOD",
  "            pos -= pos & (-pos)",
  "        return s",
  "",
  "    # level 0: every element is its own length-1 subseq",
  "    Lprev = [1] * n   # L_k[i] = # incr subseqs of length k",
  "    Rprev = [1] * n   #          < A[i] before i (L) / > after (R)",
  "    contrib = [(Lprev[i] * Rprev[i]) % MOD for i in range(n)]",
  "",
  "    k = 1",
  "    while True:",
  "        # L_k: extend left chains by one, smaller value, earlier index",
  "        bit = [0] * (m + 1); Lk = [0] * n",
  "        for i in range(n):",
  "            r = rank[A[i]]",
  "            Lk[i] = qry(bit, r - 1)      # sum of L_{k-1} over < A[i]",
  "            upd(bit, r, Lprev[i])",
  "        # R_k: same idea from the right, larger value, later index",
  "        bit2 = [0] * (m + 1); Rk = [0] * n",
  "        for i in range(n - 1, -1, -1):",
  "            r = rank[A[i]]",
  "            tot = qry(bit2, m)",
  "            Rk[i] = (tot - qry(bit2, r)) % MOD   # sum over > A[i]",
  "            upd(bit2, r, Rprev[i])",
  "        if not any(Lk) and not any(Rk):",
  "            break",
  "        for i in range(n):",
  "            contrib[i] = (contrib[i] + Lk[i] * Rk[i]) % MOD",
  "        Lprev, Rprev = Lk, Rk",
  "        k += 1",
  "        if k > n + 2:",
  "            break",
  "",
  "    print(sum(A[i] * contrib[i] for i in range(n)) % MOD)",
  "",
  "main()",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "const long long MOD = 998244353;",
  "int n, m;",
  "",
  "void upd(vector<long long>& b, int pos, long long val) {",
  "    for (; pos <= m; pos += pos & (-pos)) b[pos] = (b[pos] + val) % MOD;",
  "}",
  "long long qry(vector<long long>& b, int pos) {",
  "    long long s = 0;",
  "    for (; pos > 0; pos -= pos & (-pos)) s = (s + b[pos]) % MOD;",
  "    return s;",
  "}",
  "",
  "int main() {",
  "    cin >> n;",
  "    vector<long long> A(n);",
  "    for (auto& x : A) cin >> x;",
  "    // compress values to ranks 1..m",
  "    vector<long long> sv(A.begin(), A.end());",
  "    sort(sv.begin(), sv.end());",
  "    sv.erase(unique(sv.begin(), sv.end()), sv.end());",
  "    m = sv.size();",
  "    vector<int> rk(n);",
  "    for (int i = 0; i < n; i++)",
  "        rk[i] = lower_bound(sv.begin(), sv.end(), A[i]) - sv.begin() + 1;",
  "",
  "    vector<long long> Lprev(n, 1), Rprev(n, 1), contrib(n);",
  "    for (int i = 0; i < n; i++) contrib[i] = (Lprev[i] * Rprev[i]) % MOD;",
  "",
  "    for (int k = 1; ; k++) {",
  "        vector<long long> b(m + 1, 0), Lk(n, 0);",
  "        for (int i = 0; i < n; i++) {",
  "            Lk[i] = qry(b, rk[i] - 1);",
  "            upd(b, rk[i], Lprev[i]);",
  "        }",
  "        vector<long long> b2(m + 1, 0), Rk(n, 0);",
  "        for (int i = n - 1; i >= 0; i--) {",
  "            long long tot = qry(b2, m);",
  "            Rk[i] = ((tot - qry(b2, rk[i])) % MOD + MOD) % MOD;",
  "            upd(b2, rk[i], Rprev[i]);",
  "        }",
  "        bool any = false;",
  "        for (int i = 0; i < n; i++) if (Lk[i] || Rk[i]) { any = true; break; }",
  "        if (!any || k > n + 2) break;",
  "        for (int i = 0; i < n; i++) contrib[i] = (contrib[i] + Lk[i] * Rk[i]) % MOD;",
  "        Lprev = Lk; Rprev = Rk;",
  "    }",
  "",
  "    long long ans = 0;",
  "    for (int i = 0; i < n; i++) ans = (ans + (A[i] % MOD) * contrib[i]) % MOD;",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export const SOLUTION_CODE = FULL_PY;

export function getSubseqMedianSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code (small inputs)", "🎯 풀이 코드 (작은 입력용)"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "For each element v = A[i], count k strictly-increasing values < v BEFORE it and k > v AFTER it. Pair them up → v is the median of a length-(2k+1) good subsequence. So v's contribution is v · Σ_k L_k·R_k.",
            "각 원소 v = A[i] 마다, 앞쪽에서 v 보다 작은 증가값 k 개, 뒤쪽에서 v 보다 큰 증가값 k 개를 세요. 짝지으면 v 가 길이 2k+1 좋은 부분수열의 중앙값이에요. 그래서 v 의 기여 = v · Σ_k L_k·R_k."),
        t(E, "L_k and R_k are built level by level: a Fenwick tree adds up the previous level's counts over 'smaller-and-earlier' (for L) or 'larger-and-later' (for R). Level 0 = every element on its own.",
            "L_k, R_k 는 레벨별로 쌓아요: 펜윅 트리로 이전 레벨 값을 '작고-앞선'(L) 또는 '크고-뒤선'(R) 범위에서 합해요. 레벨 0 = 원소 각각 하나씩."),
        t(E, "⚠️ Honest note: this is CORRECT, but worst case is O(N² log N) — it comfortably passes the small subtasks (N up to a few hundred), yet TIMES OUT at the full N = 8000. The full-constraints solution needs CDQ divide-and-conquer + NTT, which is beyond this quest. Here we learn the correct idea and a correct implementation for small inputs.",
            "⚠️ 솔직히 말하면: 이 코드는 정답이 맞지만 최악의 경우 O(N² log N) 이에요 — 작은 서브태스크(N 수백 정도)는 넉넉히 통과하지만, 전체 N = 8000 에서는 시간 초과예요. 전체 제약 만점 풀이는 CDQ 분할정복 + NTT 가 필요한데, 이 퀘스트 범위 밖이에요. 여기서는 올바른 아이디어와 작은 입력용 올바른 구현을 배워요."),
      ],
      pyOnly: [
        t(E, "sys.stdin.buffer.read().split() reads all input at once — much faster than line-by-line for big arrays.",
            "sys.stdin.buffer.read().split() 로 입력을 한 번에 읽어요 — 큰 배열에서 줄단위보다 훨씬 빨라요."),
      ],
      cppOnly: [
        t(E, "Coordinate-compress with sort + unique + lower_bound so the Fenwick tree is sized by distinct values, not 1e9.",
            "sort + unique + lower_bound 로 좌표압축해서 펜윅 트리를 값 1e9 이 아닌 '서로 다른 값 수' 만큼만 잡아요."),
        t(E, "Keep counts in long long and take % MOD after every add/multiply.",
            "카운트는 long long 으로, 더하고 곱할 때마다 % MOD 를 취해요."),
      ],
    },
  ];
}

export function SubseqMedianProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs","any"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","unique","lower_bound"];
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


export function downloadSubseqMedianPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SubseqMedian — Full Study Guide", "SubseqMedian — 종합 풀이 노트");
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
