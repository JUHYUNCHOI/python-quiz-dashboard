// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 11/11 PASS
//   C++:    11/11 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

const A = "#ea580c";

const M2_SAMPLE = ["6", "1 2 3 4 4 4"];

/* ════════════════════════════════════════════════════════════════════
   MooinExplorer — show the array, list which moos occur.
   ════════════════════════════════════════════════════════════════════ */
const M2_PRESETS = [
  { name: "S1", a: [1, 2, 3, 4, 4, 4] },
  { name: "ABA", a: [1, 2, 1, 2, 1] },
  { name: "Repeats", a: [1, 1] },
  { name: "Mixed", a: [3, 1, 2, 1, 2, 3, 3] },
];

function findMoos(a) {
  const N = a.length;
  const lastSeen = new Map();
  const secondLast = new Map();
  const cnt = new Map();
  for (let i = 0; i < N; i++) {
    const v = a[i];
    cnt.set(v, (cnt.get(v) ?? 0) + 1);
    if (lastSeen.has(v)) secondLast.set(v, lastSeen.get(v));
    lastSeen.set(v, i);
  }
  const seen = new Set();
  const D = new Array(N + 1).fill(0);
  for (let i = 0; i < N; i++) {
    D[i + 1] = D[i] + (seen.has(a[i]) ? 0 : 1);
    seen.add(a[i]);
  }
  // For each y with cnt >= 2: list distinct x's before second_last[y]
  const moos = [];
  for (const [y, c] of cnt.entries()) {
    if (c < 2) continue;
    const p = secondLast.get(y);
    const beforeSet = new Set();
    for (let i = 0; i < p; i++) beforeSet.add(a[i]);
    for (const x of beforeSet) {
      if (x !== y) moos.push([x, y]);
    }
  }
  return moos;
}

export function MooinExplorer({ E }) {
  const [pi, setPi] = useState(0);
  const preset = M2_PRESETS[pi];
  const moos = findMoos(preset.a);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {M2_PRESETS.map((p, i) => (
          <button key={i} onClick={() => setPi(i)} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${pi === i ? A : C.border}`,
            background: pi === i ? "#ffedd5" : "#fff", color: pi === i ? A : C.text, cursor: "pointer",
          }}>{p.name}: [{p.a.join(", ")}]</button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
        {preset.a.map((v, i) => (
          <div key={i} style={{
            width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 8, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
            background: "#fff", border: `1px solid ${C.border}`, color: C.text,
          }}>{v}</div>
        ))}
      </div>

      {/* 시각만 축소 — 풀폭 배너 → 가운데 컴팩트 알약 (선생님: '뭐이리 커?'). 정답 코드 무관. */}
      <div style={{ background: A, color: "#fff", borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 600, margin: "0 auto 10px", textAlign: "center", width: "fit-content" }}>
        {t(E, "Distinct moos: ", "서로 다른 moo: ")}<span style={{ fontSize: 15 }}>{moos.length}</span>
      </div>

      {moos.length > 0 && (
        <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: "6px 9px", fontSize: 11, color: "#9a3412", lineHeight: 1.55, width: "fit-content", maxWidth: "100%", margin: "0 auto" }}>
          <b>{t(E, "Moos that occur:", "발생하는 moo:")}</b><br/>
          {moos.map(([x, y], i) => (
            <code key={i} style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, marginRight: 6, fontFamily: "'JetBrains Mono',monospace" }}>
              ({x}, {y}, {y})
            </code>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MooinDeepAudit — single-step trace through a = [1, 2, 3, 4, 4, 4].
   Shows live count[], last_seen[], second_last[], and D[] after each
   index — turning the dense Ch1 walkthrough into a button-driven
   "see it happen" panel. Matches the Ch1 sample I/O and orange theme.
   ════════════════════════════════════════════════════════════════════ */
const M2_AUDIT_A = [1, 2, 3, 4, 4, 4];

function buildAuditTrace(a) {
  const N = a.length;
  const trace = [];
  // Step 0: initial state, before any index processed.
  trace.push({
    i: -1,
    v: null,
    count: {},
    lastSeen: {},
    secondLast: {},
    D: [0],
    note_en: "Before scanning: every table empty, D[0] = 0.",
    note_ko: "스캔 전: 모든 표 비어 있고 D[0] = 0.",
  });
  const count = {};
  const lastSeen = {};
  const secondLast = {};
  const seen = new Set();
  const D = [0];
  for (let i = 0; i < N; i++) {
    const v = a[i];
    count[v] = (count[v] ?? 0) + 1;
    if (lastSeen[v] != null) secondLast[v] = lastSeen[v];
    lastSeen[v] = i;
    const wasNew = !seen.has(v);
    if (wasNew) seen.add(v);
    D.push(D[i] + (wasNew ? 1 : 0));
    let note_en, note_ko;
    if (count[v] === 1) {
      note_en = `i=${i}: a[${i}] = ${v} is new. count[${v}] = 1, last_seen[${v}] = ${i}. D grows by 1 → ${D[i + 1]}.`;
      note_ko = `i=${i}: a[${i}] = ${v} 처음 봄. count[${v}] = 1, last_seen[${v}] = ${i}. D 가 1 증가 → ${D[i + 1]}.`;
    } else if (count[v] === 2) {
      note_en = `i=${i}: a[${i}] = ${v} again. Old last_seen[${v}] = ${secondLast[v]} becomes second_last[${v}]. last_seen[${v}] = ${i}. D unchanged.`;
      note_ko = `i=${i}: a[${i}] = ${v} 또 등장. 이전 last_seen[${v}] = ${secondLast[v]} 가 second_last[${v}] 가 됨. last_seen[${v}] = ${i}. D 그대로.`;
    } else {
      note_en = `i=${i}: a[${i}] = ${v} again (count = ${count[v]}). second_last[${v}] updates to ${secondLast[v]}, last_seen[${v}] = ${i}. D unchanged.`;
      note_ko = `i=${i}: a[${i}] = ${v} 또 (count = ${count[v]}). second_last[${v}] 가 ${secondLast[v]} 로 갱신, last_seen[${v}] = ${i}. D 그대로.`;
    }
    trace.push({
      i,
      v,
      count: { ...count },
      lastSeen: { ...lastSeen },
      secondLast: { ...secondLast },
      D: [...D],
      note_en,
      note_ko,
    });
  }
  return trace;
}

const M2_AUDIT_TRACE = buildAuditTrace(M2_AUDIT_A);

function tableRow(label, dict, highlight) {
  const keys = [1, 2, 3, 4];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
      <div style={{ width: 90, color: "#9a3412", fontWeight: 700 }}>{label}</div>
      {keys.map(k => {
        const has = dict[k] != null;
        const isHi = highlight === k;
        return (
          <div key={k} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            border: `1.5px solid ${isHi ? "#ea580c" : "#fdba74"}`,
            background: isHi ? "#ffedd5" : "#fff",
            borderRadius: 6, padding: "2px 6px", minWidth: 38,
          }}>
            <div style={{ fontSize: 10, color: "#9a3412" }}>{k}</div>
            <div style={{ fontWeight: 700, color: has ? C.text : "#cbd5e1" }}>
              {has ? String(dict[k]) : "·"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MooinDeepAudit({ E }) {
  const { idx, safe, setIdx, total } = useTraceStep(M2_AUDIT_TRACE.length);
  const step = M2_AUDIT_TRACE[safe];
  const note = E ? step.note_en : step.note_ko;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", letterSpacing: 0.3 }}>
          🔬 {t(E, "Deep Audit — one pass through the sample", "딥 오딧 — 샘플 한 번 훑기")}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
          {t(E, "Watch count, last_seen, second_last, and D fill in.", "count, last_seen, second_last, D 가 채워지는 걸 봐요.")}
        </div>
      </div>

      {/* array with cursor */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 12 }}>
        {M2_AUDIT_A.map((v, i) => {
          const isCur = step.i === i;
          const past = step.i >= 0 && i <= step.i;
          return (
            <div key={i} style={{
              width: 36, height: 44, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              borderRadius: 8, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
              background: isCur ? "#ea580c" : past ? "#ffedd5" : "#fff",
              color: isCur ? "#fff" : C.text,
              border: `2px solid ${isCur ? "#ea580c" : past ? "#fdba74" : C.border}`,
            }}>
              <div style={{ fontSize: 9, opacity: 0.85 }}>i={i}</div>
              <div style={{ fontSize: 14 }}>{v}</div>
            </div>
          );
        })}
      </div>

      {/* state tables */}
      <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 10, padding: 10, marginBottom: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {tableRow(t(E, "count", "count"), step.count, step.v)}
        {tableRow(t(E, "last_seen", "last_seen"), step.lastSeen, step.v)}
        {tableRow(t(E, "second_last", "second_last"), step.secondLast, step.v)}
      </div>

      {/* D[] strip */}
      <div style={{ background: "#fff", border: "1.5px solid #fdba74", borderRadius: 10, padding: "8px 10px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 4 }}>
          D[k] — {t(E, "distinct values in a[0..k-1]", "a[0..k-1] 의 서로 다른 값 수")}
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", fontFamily: "'JetBrains Mono',monospace" }}>
          {step.D.map((d, k) => (
            <div key={k} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              border: `1.5px solid ${k === step.D.length - 1 && step.i >= 0 ? "#ea580c" : "#fdba74"}`,
              background: k === step.D.length - 1 && step.i >= 0 ? "#ffedd5" : "#fff",
              borderRadius: 6, padding: "2px 6px", minWidth: 36,
            }}>
              <div style={{ fontSize: 9, color: "#9a3412" }}>k={k}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* narration */}
      <div style={{ background: A, color: "#fff", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, lineHeight: 1.6, marginBottom: 10, minHeight: 44 }}>
        {note}
      </div>

      <SimNav idx={idx} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
    </div>
  );
}

export function Mooin2Sim({ E }) { return <MooinExplorer E={E} />; }
export function Mooin2Runner() { return null; }

/* ════════════════════════════════════════════════════════════════════
   Progressive code: 4 sections.
   ════════════════════════════════════════════════════════════════════ */

const M2_S1_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0])",
  "a = [int(data[1 + i]) for i in range(N)]",
];
const M2_S1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> a[i];",
  "    }",
];

const M2_S2_PY = [
  "# count[v] = number of times v appears",
  "# second_last[v] = index of the SECOND-TO-LAST occurrence of v",
  "#                  (only meaningful if count[v] >= 2)",
  "last_seen = [-1] * (N + 2)",
  "second_last = [-1] * (N + 2)",
  "count = [0] * (N + 2)",
  "for i in range(N):",
  "    v = a[i]",
  "    count[v] += 1",
  "    if last_seen[v] != -1:",
  "        second_last[v] = last_seen[v]",
  "    last_seen[v] = i",
];
const M2_S2_CPP = [
  "    vector<int> last_seen(N + 2, -1);",
  "    vector<int> second_last(N + 2, -1);",
  "    vector<int> count(N + 2, 0);",
  "    for (int i = 0; i < N; i++) {",
  "        int v = a[i];",
  "        count[v]++;",
  "        if (last_seen[v] != -1) {",
  "            second_last[v] = last_seen[v];",
  "        }",
  "        last_seen[v] = i;",
  "    }",
];

const M2_S3_PY = [
  "# D[k] = number of distinct values in a[0..k-1]",
  "# Walk left-to-right, marking each new value.",
  "seen = [False] * (N + 2)",
  "D = [0] * (N + 1)",
  "for i in range(N):",
  "    D[i + 1] = D[i] + (0 if seen[a[i]] else 1)",
  "    seen[a[i]] = True",
];
const M2_S3_CPP = [
  "    vector<bool> seen(N + 2, false);",
  "    vector<int> D(N + 1, 0);",
  "    for (int i = 0; i < N; i++) {",
  "        D[i + 1] = D[i] + (seen[a[i]] ? 0 : 1);",
  "        seen[a[i]] = true;",
  "    }",
];

const M2_FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0])",
  "a = [int(data[1 + i]) for i in range(N)]",
  "",
  "# count + second-to-last position",
  "last_seen = [-1] * (N + 2)",
  "second_last = [-1] * (N + 2)",
  "count = [0] * (N + 2)",
  "for i in range(N):",
  "    v = a[i]",
  "    count[v] += 1",
  "    if last_seen[v] != -1:",
  "        second_last[v] = last_seen[v]",
  "    last_seen[v] = i",
  "",
  "# Prefix distinct count",
  "seen = [False] * (N + 2)",
  "D = [0] * (N + 1)",
  "for i in range(N):",
  "    D[i + 1] = D[i] + (0 if seen[a[i]] else 1)",
  "    seen[a[i]] = True",
  "",
  "# For each y with count >= 2:",
  "#   second_last[y] is where j sits (the (count-1)-th occurrence).",
  "#   distinct x's allowed: positions [0, second_last[y] - 1] → D[second_last[y]] values.",
  "#   But y itself appears in those positions iff there are >=2 occurrences before",
  "#   second_last, i.e., count[y] >= 3. Subtract 1 in that case.",
  "ans = 0",
  "for y in range(1, N + 2):",
  "    if count[y] >= 2:",
  "        p = second_last[y]",
  "        d = D[p]",
  "        if count[y] >= 3:",
  "            d -= 1",
  "        ans += d",
  "",
  "print(ans)",
];
const M2_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> a[i];",
  "    }",
  "",
  "    vector<int> last_seen(N + 2, -1);",
  "    vector<int> second_last(N + 2, -1);",
  "    vector<int> count(N + 2, 0);",
  "    for (int i = 0; i < N; i++) {",
  "        int v = a[i];",
  "        count[v]++;",
  "        if (last_seen[v] != -1) {",
  "            second_last[v] = last_seen[v];",
  "        }",
  "        last_seen[v] = i;",
  "    }",
  "",
  "    vector<bool> seen(N + 2, false);",
  "    vector<int> D(N + 1, 0);",
  "    for (int i = 0; i < N; i++) {",
  "        D[i + 1] = D[i] + (seen[a[i]] ? 0 : 1);",
  "        seen[a[i]] = true;",
  "    }",
  "",
  "    long long ans = 0;",
  "    for (int y = 1; y <= N + 1; y++) {",
  "        if (count[y] >= 2) {",
  "            int p = second_last[y];",
  "            int d = D[p];",
  "            if (count[y] >= 3) {",
  "                d -= 1;",
  "            }",
  "            ans += d;",
  "        }",
  "    }",
  "    cout << ans << '\\n';",
  "    return 0;",
  "}",
];

export function getMooin2Sections(E) {
  return [
    {
      label: t(E, "1️⃣ Read N and array a", "1️⃣ N 과 배열 a 읽기"),
      color: A,
      py: M2_S1_PY, cpp: M2_S1_CPP,
      why: [
        t(E, "Read N (length) then N integers into a.",
            "N (길이) 읽고, N 개 정수를 a 로."),
      ],
      aside: <SampleInputAside E={E} sample={M2_SAMPLE} highlight={[0, 1]} note={t(E,
        "Two lines: \"6\" (N=6), then \"1 2 3 4 4 4\".",
        "두 줄: \"6\" (N=6), 그 다음 \"1 2 3 4 4 4\".")} />,
    },
    {
      label: t(E, "2️⃣ count + second-to-last position per value", "2️⃣ 값별 count + 끝에서 두 번째 위치"),
      color: "#0891b2",
      py: M2_S2_PY, cpp: M2_S2_CPP,
      why: [
        t(E, "count[v] tells us if v can be the moo's repeated value (need ≥ 2).",
            "count[v] 가 ≥ 2 여야 v 가 moo 반복값이 될 수 있음."),
        t(E, "second_last[v] = position of v's (count-1)-th occurrence — the LATEST possible j position with another v after it.",
            "second_last[v] = v 의 (count-1) 번째 위치 — 그 뒤에 또 v 가 있는 가장 늦은 j 위치."),
        t(E, "Update strategy: as we scan, remember last_seen[v]; when we see v again, that previous last_seen becomes the new second_last.",
            "갱신: 훑으면서 last_seen[v] 를 기억하고, v 를 또 만나면 이전 last_seen 이 새 second_last."),
      ],
    },
    {
      label: t(E, "3️⃣ Prefix distinct count", "3️⃣ prefix 서로 다른 값 수"),
      color: "#16a34a",
      py: M2_S3_PY, cpp: M2_S3_CPP,
      why: [
        t(E, "D[k] = number of DISTINCT values in a[0..k-1].",
            "D[k] = a[0..k-1] 의 서로 다른 값 수."),
        t(E, "Built in one pass: increment when we see a value for the first time.",
            "한 번 패스: 처음 보는 값일 때만 증가."),
        t(E, "We'll use D[second_last[y]] = number of distinct x values that could appear before j.",
            "D[second_last[y]] = j 앞에 나타날 수 있는 서로 다른 x 값 수.")
      ],
    },
    {
      label: t(E, "4️⃣ Sum contributions — full code", "4️⃣ 기여 합산 — 전체 코드"),
      color: "#dc2626",
      py: M2_FULL_PY, cpp: M2_FULL_CPP,
      why: [
        t(E, "For each y with count[y] ≥ 2: D[second_last[y]] gives distinct values appearing before j.",
            "count[y] ≥ 2 인 y 마다: D[second_last[y]] 가 j 앞 서로 다른 값 수."),
        t(E, "x must differ from y. y itself appears before j iff count[y] ≥ 3 (then earlier copies of y are in [0, second_last[y]-1]). Subtract 1 in that case.",
            "x 는 y 와 달라야. count[y] ≥ 3 일 때만 y 가 [0, second_last[y]-1] 에도 등장 (더 이전 복사본). 그땐 1 빼기."),
        t(E, "Total: O(N). Even at N = 10⁶ this is fast.",
            "총: O(N). N = 10⁶ 도 빠름."),
        t(E, "C++ uses long long for ans because N(N-1) can exceed 2³¹.",
            "C++ 는 long long — N(N-1) 이 2³¹ 초과 가능."),
      ],
    },
  ];
}

export function Mooin2ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* PDF helpers */
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
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadMooin2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mooin' Time II — Full Study Guide", "🐄 Mooin' Time II — 종합 풀이 노트");
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
<div class="sub">USACO January 2025 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>

<h2>${t(E, "Problem", "문제")}</h2>
<div class="why">
  <b>🐄 ${t(E, "What's a moo?", "moo 란?")}</b>
  <p>${t(E, "A <b>moo</b> is three numbers (x, y, y): the last two are EQUAL, the first is DIFFERENT. It <b>occurs</b> in the array if you can pick those three left-to-right in order — gaps are allowed (a subsequence).", "<b>moo</b> 는 숫자 3개 (x, y, y): 뒤 둘은 같고 첫째는 다름. 그 셋을 왼→오 순서로 고를 수 있으면(사이 건너뜀 OK = 부분수열) 배열에서 <b>발생</b>.")}</p>
  <p>${t(E, "Count the number of <b>DISTINCT</b> moos — i.e. distinct (x, y) pairs.", "<b>서로 다른</b> moo 개수 — 즉 서로 다른 (x, y) 쌍 — 를 센다.")}</p>
  <p><b>${t(E, "Input", "입력")}:</b> ${t(E, "line 1 = N; line 2 = N integers a₁ … a_N.", "1줄 = N; 2줄 = 정수 N 개 a₁ … a_N.")}</p>
  <p><b>${t(E, "Constraints", "제약")}:</b> 1 ≤ N ≤ 10⁶, 1 ≤ aᵢ ≤ N ${t(E, "(answer can be big — use 64-bit in C++).", "(답이 클 수 있음 — C++ 는 64-bit).")}</p>
</div>
<h3>${t(E, "Sample", "샘플")}</h3>
<pre>${t(E, "input", "입력")}:
6
1 2 3 4 4 4

${t(E, "output", "출력")}: 3</pre>
<div class="why">${t(E, "The 3 distinct moos are (1,4,4), (2,4,4), (3,4,4) — all use the (4,4) pair, with three different x's.", "서로 다른 moo 3개는 (1,4,4), (2,4,4), (3,4,4) — 모두 (4,4) 짝을 쓰고 x 만 셋.")}</div>

<h2>${t(E, "First idea — and why it's too slow", "첫 아이디어 — 왜 너무 느린가")}</h2>
<div class="why">
  <p>${t(E, "Obvious approach: try every triple i &lt; j &lt; k. If a[j] = a[k] and a[i] ≠ a[j], add (a[i], a[j]) to a set. The set's final size is the answer (the set kills duplicates).", "뻔한 방법: 모든 삼중 i &lt; j &lt; k 시도. a[j] = a[k] 이고 a[i] ≠ a[j] 면 (a[i], a[j]) 를 집합에 넣기. 집합의 최종 크기가 답 (집합이 중복 제거).")}</p>
  <p>${t(E, "But that's ≈ N³ ÷ 6 work. N = 10⁶ → ~1.7×10¹⁷ steps → about <b>30 YEARS</b> at a billion/sec. The limit is ~2 seconds. We need O(N).", "하지만 ≈ N³ ÷ 6. N = 10⁶ → ~1.7×10¹⁷ → 초당 10억 번 해도 약 <b>30년</b>. 제한 ~2초. O(N) 이 필요.")}</p>
</div>

<h2>${t(E, "The fast idea — O(N)", "빠른 아이디어 — O(N)")}</h2>
<div class="why">
  <p>${t(E, "For each value y that appears at least twice, let <b>p = the second-to-last position of y</b> (the latest j that still has another y after it). Every DISTINCT value before p can be the x. So add <b>D[p]</b>, where D[k] = number of distinct values in a[0..k-1].", "2번 이상 나오는 각 y 에 대해 <b>p = y 의 끝에서 두 번째 위치</b> (뒤에 또 y 가 있는 가장 늦은 j). p 앞의 서로 다른 값은 모두 x 가 될 수 있음. 그래서 <b>D[p]</b> 더하기 (D[k] = a[0..k-1] 의 서로 다른 값 수).")}</p>
  <p><b>⚠️ ${t(E, "Tricky bit", "함정")}:</b> ${t(E, "x must differ from y. y itself appears before p exactly when count[y] ≥ 3 — subtract 1 in that case.", "x 는 y 와 달라야. count[y] ≥ 3 일 때만 y 가 p 앞에 등장 — 그땐 1 빼기.")}</p>
  <p>${t(E, "Sample trace: y = 4, p = 4, D[4] = 4 (values 1,2,3,4), count[4] = 3 → 4 − 1 = 3. Answer = 3. ✓", "샘플 추적: y = 4, p = 4, D[4] = 4 (값 1,2,3,4), count[4] = 3 → 4 − 1 = 3. 답 = 3. ✓")}</p>
</div>

<h2>${t(E, "Code (4 sections)", "코드 (4 섹션)")}</h2>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}

<h2>${t(E, "Self-check", "스스로 확인")}</h2>
<div class="why">
  <p>1. ${t(E, "a = [1, 2, 2] — how many distinct moos occur?", "a = [1, 2, 2] — 서로 다른 moo 개수는?")}</p>
  <p>2. ${t(E, "a = [1, 1] — how many?", "a = [1, 1] — 몇 개?")}</p>
  <p>3. ${t(E, "a = [4, 1, 4, 4] — which moo(s) occur, and why do we subtract 1?", "a = [4, 1, 4, 4] — 어떤 moo 가 발생하고, 왜 1 을 빼나?")}</p>
  <p style="color:#9ca3af;font-size:11px;margin-top:8px;">${t(E, "Answers: 1) one — (1,2,2). 2) zero — there's no x ≠ 1 before the (1,1) pair. 3) one — (1,4,4); count[4] = 3, so a 4 sits before p and can't be its own x → subtract 1.", "답: 1) 1개 — (1,2,2). 2) 0개 — (1,1) 짝 앞에 x ≠ 1 이 없음. 3) 1개 — (1,4,4); count[4] = 3 이라 4 가 p 앞에 있고 자기 x 가 못 됨 → 1 빼기.")}</p>
</div>

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
