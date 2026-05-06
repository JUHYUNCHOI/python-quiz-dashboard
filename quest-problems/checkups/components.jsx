import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

// Official Sample 1 (cpid=1469): N=3, a=[1,3,2], b=[3,2,1]. Answers: 3,3,0,0.
const CK_SAMPLE = ["3", "1 3 2", "3 2 1"];

const A = "#dc2626";

/* ════════════════════════════════════════════════════════════════════
   ReverseSim — drag (l, r) to reverse a subarray and count vet checkups
   ════════════════════════════════════════════════════════════════════ */
const _CK_PRESETS = [
  { name: "S1: a=[1,3,2] b=[3,2,1]",  a: [1, 3, 2],             b: [3, 2, 1] },
  { name: "S2: a=[1,2,3] b=[1,2,3]",  a: [1, 2, 3],             b: [1, 2, 3] },
  { name: "S3: a=[1,3,2,2,1,3,2] b=[3,2,2,1,2,3,1]", a: [1, 3, 2, 2, 1, 3, 2], b: [3, 2, 2, 1, 2, 3, 1] },
];

export function ReverseSim({ E }) {
  const [pi, setPi] = useState(2);
  const preset = _CK_PRESETS[pi];
  const N = preset.a.length;
  const [l, setL] = useState(1);
  const [r, setR] = useState(N);

  // Clamp on preset change
  const safeL = Math.min(l, N);
  const safeR = Math.min(Math.max(r, safeL), N);

  // Build a' = a with positions [safeL..safeR] reversed (1-indexed, inclusive)
  const aPrime = preset.a.slice();
  for (let i = safeL - 1, j = safeR - 1; i < j; i++, j--) {
    [aPrime[i], aPrime[j]] = [aPrime[j], aPrime[i]];
  }

  let matches = 0;
  for (let i = 0; i < N; i++) if (aPrime[i] === preset.b[i]) matches++;

  const cellSize = N <= 5 ? 40 : 32;

  const cell = (val, ok, inside) => (
    <div style={{
      width: cellSize, height: cellSize,
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 8, fontWeight: 900, fontSize: 14,
      border: ok ? "2px solid #16a34a" : `2px solid ${inside ? "#fca5a5" : C.border}`,
      background: ok ? "#dcfce7" : (inside ? "#fee2e2" : "#fff"),
      color: ok ? "#15803d" : (inside ? "#7f1d1d" : C.text),
      fontFamily: "'JetBrains Mono',monospace",
    }}>{val}</div>
  );

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {_CK_PRESETS.map((p, i) => (
          <button key={i}
            onClick={() => { setPi(i); setL(1); setR(p.a.length); }}
            style={{
              padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              border: `1.5px solid ${pi === i ? A : C.border}`,
              background: pi === i ? "#fee2e2" : "#fff",
              color: pi === i ? A : C.text,
              cursor: "pointer",
            }}>{p.name.split(":")[0]}</button>
        ))}
      </div>

      {/* sliders */}
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "6px 12px", alignItems: "center", marginBottom: 14, fontSize: 12 }}>
        <div style={{ fontWeight: 700, color: A, fontFamily: "'JetBrains Mono',monospace" }}>l =</div>
        <input type="range" min={1} max={N} value={safeL}
          onChange={e => { const v = Number(e.target.value); setL(v); if (v > safeR) setR(v); }}
          style={{ width: "100%" }} />
        <div style={{ fontWeight: 800, color: A, minWidth: 24, textAlign: "right" }}>{safeL}</div>

        <div style={{ fontWeight: 700, color: "#0891b2", fontFamily: "'JetBrains Mono',monospace" }}>r =</div>
        <input type="range" min={safeL} max={N} value={safeR}
          onChange={e => setR(Number(e.target.value))}
          style={{ width: "100%" }} />
        <div style={{ fontWeight: 800, color: "#0891b2", minWidth: 24, textAlign: "right" }}>{safeR}</div>
      </div>

      {/* arrays */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
        {/* a (after reverse) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 50, fontSize: 11, fontWeight: 800, color: A, textAlign: "right", fontFamily: "'JetBrains Mono',monospace" }}>a' =</div>
          <div style={{ display: "flex", gap: 4 }}>
            {aPrime.map((v, i) => cell(v, v === preset.b[i], i + 1 >= safeL && i + 1 <= safeR))}
          </div>
        </div>
        {/* b */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 50, fontSize: 11, fontWeight: 800, color: "#0891b2", textAlign: "right", fontFamily: "'JetBrains Mono',monospace" }}>b =</div>
          <div style={{ display: "flex", gap: 4 }}>
            {preset.b.map((v, i) => (
              <div key={i} style={{
                width: cellSize, height: cellSize,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8, fontWeight: 900, fontSize: 14,
                border: aPrime[i] === v ? "2px solid #16a34a" : `1px solid ${C.border}`,
                background: aPrime[i] === v ? "#dcfce7" : "#fff",
                color: aPrime[i] === v ? "#15803d" : C.text,
                fontFamily: "'JetBrains Mono',monospace",
              }}>{v}</div>
            ))}
          </div>
        </div>
        {/* index labels */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
          <div style={{ width: 50 }} />
          <div style={{ display: "flex", gap: 4 }}>
            {preset.a.map((_, i) => (
              <div key={i} style={{ width: cellSize, fontSize: 9, color: C.dim, textAlign: "center" }}>{i + 1}</div>
            ))}
          </div>
        </div>
      </div>

      {/* count badge */}
      <div style={{ marginTop: 14, padding: "10px 12px", borderRadius: 10, background: "#dcfce7", border: "2px solid #16a34a", textAlign: "center", fontSize: 13, fontWeight: 800, color: "#15803d" }}>
        ✅ {t(E, "Checkups (matches): ", "검진 (일치): ")}<span style={{ fontSize: 18 }}>{matches}</span>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: C.dim, lineHeight: 1.55 }}>
        {t(E,
          "Pink = inside [l, r] (reversed). Green = vet checks (a'[i] == b[i]). Try every (l, r) and the answers are the official sample outputs.",
          "분홍 = [l, r] 내부 (뒤집힘). 초록 = 수의사 검진 (a'[i] == b[i]). 모든 (l, r) 시도하면 공식 샘플 출력과 일치.")}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   Stub legacy exports — chapters.jsx no longer renders sim/runner
   steps directly, but CheckupsApp still imports these names. Keep them
   as no-op exports so the import doesn't break.
   ════════════════════════════════════════════════════════════════════ */
export function CheckupsSim({ E }) { return <ReverseSim E={E} />; }
export function CheckupsRunner({ E }) {
  return (
    <div style={{ padding: 14, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
      {t(E,
        "Use the simulator above to drag (l, r) and watch the checkup count. The runner mode is folded into the sim for this quest.",
        "위 시뮬레이터에서 (l, r) 을 드래그하면서 검진 수를 봐요. runner 는 sim 에 통합됨.")}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   Progressive code — 7 sections (brute 1–4, smart 5–7).
   ════════════════════════════════════════════════════════════════════ */

/* ── Brute (cumulative) ── */
const CK_BRUTE_S1_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "a = [int(data[p+i]) for i in range(N)]; p += N",
  "b = [int(data[p+i]) for i in range(N)]; p += N",
  "",
  "counts = [0] * (N + 1)   # counts[c] = number of (l, r) leaving exactly c checkups",
];
const CK_BRUTE_S1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N), b(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
  "    for (int i = 0; i < N; i++) cin >> b[i];",
  "    vector<int> counts(N + 1, 0);",
];

const CK_BRUTE_S2_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "a = [int(data[p+i]) for i in range(N)]; p += N",
  "b = [int(data[p+i]) for i in range(N)]; p += N",
  "",
  "counts = [0] * (N + 1)",
  "",
  "# Outer pair (l, r) — N(N+1)/2 distinct ops",
  "for l in range(N):",
  "    for r in range(l, N):",
  "        pass   # (count to fill in next step)",
];
const CK_BRUTE_S2_CPP = [
  "// (input + counts init from step 1)",
  "    for (int l = 0; l < N; l++) {",
  "        for (int r = l; r < N; r++) {",
  "            // inner: count checkups",
  "        }",
  "    }",
];

const CK_BRUTE_S3_PY = [
  "for l in range(N):",
  "    for r in range(l, N):",
  "        # Count checkups after reversing a[l..r]",
  "        c = 0",
  "        for i in range(N):",
  "            # Inside [l, r]: position i holds the value originally at l + r - i",
  "            if l <= i <= r:",
  "                v = a[l + r - i]",
  "            else:",
  "                v = a[i]",
  "            if v == b[i]:",
  "                c += 1",
];
const CK_BRUTE_S3_CPP = [
  "    for (int l = 0; l < N; l++) {",
  "        for (int r = l; r < N; r++) {",
  "            int c = 0;",
  "            for (int i = 0; i < N; i++) {",
  "                int v = (l <= i && i <= r) ? a[l + r - i] : a[i];",
  "                if (v == b[i]) c++;",
  "            }",
  "        }",
  "    }",
];

const CK_BRUTE_FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "a = [int(data[p+i]) for i in range(N)]; p += N",
  "b = [int(data[p+i]) for i in range(N)]; p += N",
  "",
  "counts = [0] * (N + 1)",
  "for l in range(N):",
  "    for r in range(l, N):",
  "        c = 0",
  "        for i in range(N):",
  "            v = a[l + r - i] if l <= i <= r else a[i]",
  "            if v == b[i]:",
  "                c += 1",
  "        counts[c] += 1",
  "",
  "for c in counts:",
  "    print(c)",
];
const CK_BRUTE_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N), b(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
  "    for (int i = 0; i < N; i++) cin >> b[i];",
  "",
  "    vector<int> counts(N + 1, 0);",
  "    for (int l = 0; l < N; l++) {",
  "        for (int r = l; r < N; r++) {",
  "            int c = 0;",
  "            for (int i = 0; i < N; i++) {",
  "                int v = (l <= i && i <= r) ? a[l + r - i] : a[i];",
  "                if (v == b[i]) c++;",
  "            }",
  "            counts[c]++;",
  "        }",
  "    }",
  "    for (int c : counts) cout << c << '\\n';",
  "    return 0;",
  "}",
];

/* ── Smart (cumulative on top of brute insight) ── */
const CK_INSIGHT_PY = [
  "# Key: after reversing [l, r], position i (l ≤ i ≤ r) now holds a[l + r − i].",
  "# So matching at i means a[l+r−i] == b[i] — depends on s = l + r, NOT on l/r alone.",
  "# Plan:",
  "#   1. P[i] = baseline matches in [1..i] (one O(N) sweep).",
  "#   2. For each diagonal s = l + r (2..2N), build Q[k] = #{j ≤ k : a[s−j] == b[j]}.",
  "#   3. For each (l, r) on diagonal s:",
  "#        inside  = Q[r] − Q[l−1]                 (matches in reversed window)",
  "#        outside = P[l−1] + (P[N] − P[r])        (matches outside window — unchanged)",
  "#        counts[inside + outside] += 1",
];
const CK_INSIGHT_CPP = [
  "// 같은 인사이트 (C++ 도 동일):",
  "// reverse [l, r] 한 후 i 위치에는 원래 l + r − i 자리 값. 매칭 = a[l+r−i] == b[i].",
  "// 같은 s = l + r 위의 (l, r) 들이 같은 일을 반복하니, s 마다 한 번만 prefix Q 만들면",
  "// 모든 (l, r) 답이 O(1). 총 O(N²).",
];

const CK_SMART_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "a = [0] + [int(data[p+i]) for i in range(N)]; p += N   # 1-indexed for prefix math",
  "b = [0] + [int(data[p+i]) for i in range(N)]; p += N",
  "",
  "# Baseline: P[i] = matches a[k] == b[k] for k in [1..i]",
  "P = [0] * (N + 1)",
  "for i in range(1, N + 1):",
  "    P[i] = P[i-1] + (1 if a[i] == b[i] else 0)",
  "",
  "counts = [0] * (N + 1)",
  "for s in range(2, 2 * N + 1):",
  "    # Q[k] = #{j ≤ k : a[s−j] == b[j]} for this diagonal",
  "    Q = [0] * (N + 2)",
  "    for k in range(1, N + 1):",
  "        j = s - k",
  "        inc = 1 if (1 <= j <= N and a[j] == b[k]) else 0",
  "        Q[k] = Q[k-1] + inc",
  "    # Walk every valid (l, r) with l + r = s, 1 ≤ l ≤ r ≤ N",
  "    for l in range(max(1, s - N), s // 2 + 1):",
  "        r = s - l",
  "        inside  = Q[r] - Q[l-1]",
  "        outside = P[l-1] + (P[N] - P[r])",
  "        counts[inside + outside] += 1",
  "",
  "for c in counts:",
  "    print(c)",
];
const CK_SMART_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N + 1), b(N + 1);                  // 1-indexed",
  "    for (int i = 1; i <= N; i++) cin >> a[i];",
  "    for (int i = 1; i <= N; i++) cin >> b[i];",
  "",
  "    vector<int> P(N + 1, 0);",
  "    for (int i = 1; i <= N; i++)",
  "        P[i] = P[i-1] + (a[i] == b[i] ? 1 : 0);",
  "",
  "    vector<long long> counts(N + 1, 0);",
  "    vector<int> Q(N + 2);",
  "    for (int s = 2; s <= 2 * N; s++) {",
  "        Q[0] = 0;",
  "        for (int k = 1; k <= N; k++) {",
  "            int j = s - k;",
  "            int inc = (1 <= j && j <= N && a[j] == b[k]) ? 1 : 0;",
  "            Q[k] = Q[k-1] + inc;",
  "        }",
  "        int l_min = max(1, s - N);",
  "        int l_max = s / 2;",
  "        for (int l = l_min; l <= l_max; l++) {",
  "            int r = s - l;",
  "            int inside  = Q[r] - Q[l-1];",
  "            int outside = P[l-1] + (P[N] - P[r]);",
  "            counts[inside + outside]++;",
  "        }",
  "    }",
  "    for (int c : counts) cout << c << '\\n';",
  "    return 0;",
  "}",
];

/* ── Asides ── */
const CkPerfAside = ({ E }) => (
  <div style={{
    background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#7f1d1d",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 800, color: "#991b1b", marginBottom: 6 }}>
      🐌 {t(E, "Operation count (brute O(N³))", "연산량 (brute O(N³))")}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px" }}>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N = 100</code>
      <div>{t(E, "10⁶ ops — instant ✓", "100 만 — 즉시 ✓")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N = 1,000</code>
      <div>{t(E, "10⁹ ops — TLE in Python", "10 억 — Python TLE")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N = 7,500</code>
      <div>{t(E, "≈4·10¹¹ ops — TLE 🚫", "≈4·10¹¹ — TLE 🚫")}</div>
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fca5a5", fontSize: 11 }}>
      {t(E,
        "Inner loop walks the whole array for every (l, r) pair. N² pairs × N work each.",
        "안쪽 루프가 (l, r) 마다 전체 배열 훑음. N² 쌍 × N 일.")}
    </div>
  </div>
);

const CkInsightAside = ({ E }) => (
  <div style={{
    background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#065f46",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 800, color: "#065f46", marginBottom: 6 }}>
      💡 {t(E, "Same diagonal = same work", "같은 대각선 = 같은 일")}
    </div>
    <div>
      {t(E,
        "After reverse, position i holds a[l+r−i]. Two pairs (l₁, r₁) and (l₂, r₂) with l₁+r₁ = l₂+r₂ ask the SAME match question per i. Compute it once.",
        "뒤집은 후 위치 i 에는 a[l+r−i] 가 옴. l+r 가 같은 두 쌍은 i 마다 같은 매칭 질문을 함. 한 번만 계산.")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #6ee7b7", fontSize: 11 }}>
      <div>{t(E, "Per diagonal s: O(N) to build Q.", "대각선 s 마다: Q 만들기 O(N).")}</div>
      <div>{t(E, "Total: 2N − 1 diagonals × O(N) = ", "총: 2N − 1 대각선 × O(N) = ")}<b>O(N²)</b></div>
    </div>
  </div>
);

const CkSmartAside = ({ E }) => (
  <div style={{
    background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#1e3a8a",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 800, color: "#1e40af", marginBottom: 6 }}>
      ✅ {t(E, "Two prefix arrays do all the work", "prefix 배열 2 개로 끝")}
    </div>
    <div style={{ marginBottom: 6 }}>
      <b>P</b> {t(E, "(once): baseline matches outside the window stay constant.",
                    "(한 번): 윈도우 밖 일치는 그대로 — 미리 prefix.")}
    </div>
    <div>
      <b>Q</b> {t(E, "(per diagonal s): matches inside the reversed window in O(1).",
                    "(대각선 s 마다): 뒤집힌 윈도우 안 일치를 O(1) 로.")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #93c5fd", fontSize: 11 }}>
      {t(E, "C++ at N=7500: ~5·10⁷ ops → comfortable. Python may need PyPy or numpy for full credit.",
            "C++ N=7500: ~5·10⁷ → 여유. Python 풀점수는 PyPy 또는 numpy 권장.")}
    </div>
  </div>
);

export function getCheckupsSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read input + counts array", "1️⃣ 입력 읽기 + counts 배열"),
      color: A,
      py: CK_BRUTE_S1_PY, cpp: CK_BRUTE_S1_CPP,
      why: [
        t(E, "Read N, then arrays a and b. Initialize counts[0..N] = 0.",
            "N 읽고, a 와 b 읽기. counts[0..N] = 0 으로 초기화."),
        t(E, "counts[c] will hold the number of (l, r) pairs that result in exactly c checkups.",
            "counts[c] 는 검진 수가 정확히 c 인 (l, r) 쌍 개수."),
      ],
      aside: <SampleInputAside E={E} sample={CK_SAMPLE} highlight={[0, 1, 2]} note={t(E,
        "N=3, a=[1, 3, 2], b=[3, 2, 1]. Three input lines.",
        "N=3, a=[1, 3, 2], b=[3, 2, 1]. 입력 3 줄.")} />,
    },
    {
      label: t(E, "2️⃣ Outer pair (l, r)", "2️⃣ 바깥 쌍 (l, r)"),
      color: "#0891b2",
      py: CK_BRUTE_S2_PY, cpp: CK_BRUTE_S2_CPP,
      why: [
        t(E, "Two nested loops over l ≤ r enumerate all N(N+1)/2 distinct operations.",
            "l ≤ r 두 겹 루프로 서로 다른 연산 N(N+1)/2 개 모두 시도."),
        t(E, "We'll fill the inner body next — for now just see the shape.",
            "안쪽은 다음 단계에서 채움 — 지금은 모양만."),
      ],
    },
    {
      label: t(E, "3️⃣ Reverse + count matches", "3️⃣ 뒤집기 + 일치 세기"),
      color: "#7c3aed",
      py: CK_BRUTE_S3_PY, cpp: CK_BRUTE_S3_CPP,
      why: [
        t(E, "After reversing [l, r], position i holds the value that was at l + r − i (still a's value, just relocated).",
            "[l, r] 뒤집은 후 위치 i 에는 원래 l + r − i 자리에 있던 값 (여전히 a 의 값, 자리만 바뀜)."),
        t(E, "Outside [l, r], positions are unchanged — keep using a[i].",
            "[l, r] 바깥은 그대로 — a[i] 그대로."),
        t(E, "Compare to b[i]; tally if equal.",
            "b[i] 와 비교, 같으면 c 증가."),
      ],
    },
    {
      label: t(E, "4️⃣ Tally + print full counts", "4️⃣ 집계 + counts 전체 출력"),
      color: "#16a34a",
      py: CK_BRUTE_FULL_PY, cpp: CK_BRUTE_FULL_CPP,
      why: [
        t(E, "After every (l, r) pair, counts[c] += 1 records this operation.",
            "(l, r) 쌍마다 counts[c] += 1 로 이 연산을 기록."),
        t(E, "Output N + 1 lines: counts[0], counts[1], …, counts[N].",
            "N + 1 줄 출력: counts[0], counts[1], …, counts[N]."),
        t(E, "Done — passes inputs with N up to ~100. Larger N times out (next steps fix that).",
            "끝 — N 이 ~100 까지인 입력 통과. 더 크면 TLE (다음 단계에서 해결)."),
      ],
    },
    {
      label: t(E, "5️⃣ Why O(N³) is too slow", "5️⃣ 왜 O(N³) 가 느린가"),
      color: "#dc2626",
      py: CK_BRUTE_FULL_PY, cpp: CK_BRUTE_FULL_CPP,
      why: [
        t(E, "Three nested loops: O(N) outer × O(N) middle × O(N) inner = O(N³).",
            "삼중 루프: O(N) × O(N) × O(N) = O(N³)."),
        t(E, "At N = 7500 that's about 4·10¹¹ operations — TLE in any language.",
            "N = 7500 이면 약 4·10¹¹ 연산 — 어떤 언어든 TLE."),
        t(E, "We need to remove the inner O(N) scan. The next step shows how.",
            "안쪽 O(N) 스캔을 없애야 함. 다음 단계에서 방법."),
      ],
    },
    {
      label: t(E, "6️⃣ Idea — share work along diagonal s = l + r", "6️⃣ 아이디어 — 대각선 s = l + r 위에서 일 공유"),
      color: "#0891b2",
      py: CK_INSIGHT_PY, cpp: CK_INSIGHT_CPP,
      why: [
        t(E, "After the reverse, the value at position i is a[l + r − i] — the index expression depends ONLY on s = l + r.",
            "뒤집은 후 위치 i 의 값은 a[l + r − i] — 인덱스 식이 오직 s = l + r 에만 의존."),
        t(E, "All (l, r) pairs with the same s share the same per-i answer. Compute it once per s, reuse across pairs.",
            "같은 s 의 (l, r) 쌍들은 i 마다 같은 답. s 마다 한 번만 계산하고 모든 쌍이 재사용."),
        t(E, "Per diagonal: O(N) to build Q + O(N) pairs × O(1) lookup = O(N) per diagonal. Total O(N²).",
            "대각선당: O(N) 으로 Q 만들기 + O(N) 쌍 × O(1) lookup = O(N). 총 O(N²)."),
      ],
    },
    {
      label: t(E, "7️⃣ Final fast code — prefix-sum on diagonal", "7️⃣ 최종 빠른 코드 — 대각선 위 prefix-sum"),
      color: "#15803d",
      py: CK_SMART_PY, cpp: CK_SMART_CPP,
      why: [
        t(E, "Switch to 1-indexed arrays so prefix arithmetic is clean (P[l−1], P[r], etc.).",
            "1-indexed 로 바꾸면 prefix 식이 깔끔 (P[l−1], P[r] 등)."),
        t(E, "P (built once): prefix of baseline matches; gives outside-window matches in O(1).",
            "P (한 번 만들기): 기본 일치의 prefix; 윈도우 밖 일치를 O(1) 로 줌."),
        t(E, "Q (rebuilt per s): prefix of a[s−j] == b[j]; gives inside-window matches in O(1).",
            "Q (s 마다 재계산): a[s−j] == b[j] 의 prefix; 윈도우 안 일치를 O(1) 로."),
        t(E, "C++ comfortably fits at N = 7500. Python is borderline — submit with PyPy if available.",
            "C++ 는 N = 7500 도 여유. Python 은 빠듯 — 가능하면 PyPy 로 제출."),
      ],
    },
  ];
}

export function CheckupsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* ════════════════════════════════════════════════════════════════════
   Syntax-highlight helpers + PDF export — unchanged shape, retitled.
   ════════════════════════════════════════════════════════════════════ */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sum"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","map","pair"];
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

export function downloadCheckupsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Cow Checkups — Full Study Guide", "🐮 Cow Checkups — 종합 풀이 노트");
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
  .box { background: #fee2e2; border: 1.5px solid #fca5a5; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO January 2025 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "FJ has N cows with species a[i]. The vet checks cow i if a[i] == b[i]. FJ performs ONE operation: reverse a subarray [l, r]. For each c = 0..N, count operations leaving exactly c cows checked.",
  "FJ 에 N 마리 소, 종 a[i]. 수의사는 a[i] == b[i] 일 때만 i 검진. FJ 가 한 번 [l, r] 뒤집기. c = 0..N 각각에 대해 정확히 c 마리 검진되는 연산 개수.")}</p>
<h2>2. ${t(E, "Insight: same diagonal s = l + r", "통찰: 같은 대각선 s = l + r")}</h2>
<div class="box">
  <b>💡 ${t(E, "Why diagonal?", "왜 대각선?")}</b>
  ${t(E,
    "After reversing [l, r], position i holds a[l + r − i]. The match question depends only on s = l + r. So all pairs with the same s share work — compute once, reuse.",
    "[l, r] 뒤집은 후 위치 i 의 값은 a[l + r − i]. 매칭 질문은 s = l + r 에만 의존. 같은 s 의 쌍들은 일 공유 — 한 번만 계산.")}
</div>
<h2>3. ${t(E, "Code (7 sections)", "코드 (7 섹션)")}</h2>
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
