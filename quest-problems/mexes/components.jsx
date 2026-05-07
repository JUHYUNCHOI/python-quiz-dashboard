import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

const A = "#7c3aed";

const MEX_SAMPLE = ["4", "2 2 2 0"];

/* ════════════════════════════════════════════════════════════════════
   MexesSlider — drag target mex; see missing values + count of i.
   ════════════════════════════════════════════════════════════════════ */
const MEX_PRESETS = [
  { name: "S1", a: [2, 2, 2, 0] },
  { name: "Mixed", a: [0, 1, 1, 3] },
  { name: "Zeros", a: [0, 0, 0] },
];

export function MexesSlider({ E }) {
  const [pi, setPi] = useState(0);
  const preset = MEX_PRESETS[pi];
  const a = preset.a;
  const N = a.length;
  const [target, setTarget] = useState(0);

  const safeTarget = Math.min(target, N);

  // cnt[v] for v in 0..N
  const cnt = new Array(N + 2).fill(0);
  for (const x of a) if (x >= 0 && x <= N) cnt[x]++;

  // Missing values in {0..safeTarget-1}
  const missing = [];
  for (let v = 0; v < safeTarget; v++) if (cnt[v] === 0) missing.push(v);

  const cnt_target = safeTarget < cnt.length ? cnt[safeTarget] : 0;
  const ops = Math.max(missing.length, cnt_target);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {MEX_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setTarget(0); }}
            style={{
              padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              border: `1.5px solid ${pi === i ? A : C.border}`,
              background: pi === i ? "#ede9fe" : "#fff", color: pi === i ? A : C.text, cursor: "pointer",
            }}>{p.name}: [{p.a.join(", ")}]</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "6px 12px", alignItems: "center", marginBottom: 14, fontSize: 12 }}>
        <div style={{ fontWeight: 700, color: A, fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "target mex =", "목표 mex =")}</div>
        <input type="range" min={0} max={N} value={safeTarget}
          onChange={e => setTarget(Number(e.target.value))}
          style={{ width: "100%" }} />
        <div style={{ fontWeight: 600, color: A, minWidth: 24, textAlign: "right" }}>{safeTarget}</div>
      </div>

      {/* Array display */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>
        {a.map((v, i) => {
          const isTarget = v === safeTarget;
          return (
            <div key={i} style={{
              width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 8, fontWeight: 700, fontSize: 16, fontFamily: "'JetBrains Mono',monospace",
              background: isTarget ? "#fee2e2" : "#fff",
              border: `2px solid ${isTarget ? "#ef4444" : C.border}`,
              color: isTarget ? "#7f1d1d" : C.text,
            }}>{v}</div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#dcfce7", border: "1.5px solid #86efac", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#15803d", lineHeight: 1.55 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            ✅ {t(E, "Need to ADD", "추가해야")}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>
            {missing.length === 0
              ? t(E, "(none — all of 0..mex−1 already present)", "(없음 — 0..mex−1 이미 모두 있음)")
              : `{${missing.join(", ")}}  → ${missing.length} ${t(E, "ops", "ops")}`}
          </div>
        </div>
        <div style={{ background: "#fee2e2", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#7f1d1d", lineHeight: 1.55 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            🚫 {t(E, `Need to REMOVE all ${cnt_target} of value ${safeTarget}`, `값 ${safeTarget} 의 ${cnt_target} 개 모두 제거`)}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>
            {cnt_target} {t(E, "ops", "ops")}
          </div>
        </div>
      </div>

      <div style={{ background: A, color: "#fff", borderRadius: 10, padding: "10px 12px", textAlign: "center", fontSize: 13, fontWeight: 600 }}>
        {t(E, "Min ops = max(missing, count of target) = ", "최소 ops = max(빠진 수, 목표 개수) = ")}
        <span style={{ fontSize: 18 }}>max({missing.length}, {cnt_target}) = {ops}</span>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: C.dim, lineHeight: 1.55 }}>
        {t(E,
          "Removing target counts CAN double as adding missing values (one op covers both). So ops = max, not sum.",
          "목표값 제거는 빠진 값 추가로 동시에 가능 (한 op 가 둘 다 커버). 그래서 ops = max, 합 아님.")}
      </div>
    </div>
  );
}

export function MexesSim({ E }) { return <MexesSlider E={E} />; }
export function MexesRunner({ E }) {
  return <div style={{ padding: 14, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
    {t(E, "Use the simulator above.", "위 시뮬레이터 사용.")}
  </div>;
}

/* ════════════════════════════════════════════════════════════════════
   Progressive code: 4 sections (input → cnt → missing → output).
   Algorithm is O(N) — no separate brute/smart split needed.
   ════════════════════════════════════════════════════════════════════ */

const MEX_S1_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "N = int(data[0])",
  "a = [int(data[1 + i]) for i in range(N)]",
];
const MEX_S1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
];

const MEX_S2_PY = [
  "# cnt[v] = number of elements equal to v",
  "# Values are guaranteed in [0, N], so an array of size N+1 is enough.",
  "cnt = [0] * (N + 2)",
  "for x in a:",
  "    if 0 <= x <= N:",
  "        cnt[x] += 1",
];
const MEX_S2_CPP = [
  "    // cnt[v] = number of elements equal to v",
  "    vector<int> cnt(N + 2, 0);",
  "    for (int x : a) {",
  "        if (0 <= x && x <= N) cnt[x]++;",
  "    }",
];

const MEX_S3_PY = [
  "# missing[i] = number of v in {0, 1, ..., i-1} where cnt[v] == 0.",
  "# (these are values we need to ADD to make mex = i)",
  "missing = [0] * (N + 2)",
  "for i in range(1, N + 2):",
  "    missing[i] = missing[i-1] + (1 if cnt[i-1] == 0 else 0)",
];
const MEX_S3_CPP = [
  "    // missing[i] = number of v in {0..i-1} with cnt[v] == 0",
  "    vector<int> missing(N + 2, 0);",
  "    for (int i = 1; i <= N + 1; i++) {",
  "        missing[i] = missing[i-1] + (cnt[i-1] == 0 ? 1 : 0);",
  "    }",
];

const MEX_FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "N = int(data[0])",
  "a = [int(data[1 + i]) for i in range(N)]",
  "",
  "cnt = [0] * (N + 2)",
  "for x in a:",
  "    if 0 <= x <= N:",
  "        cnt[x] += 1",
  "",
  "missing = [0] * (N + 2)",
  "for i in range(1, N + 2):",
  "    missing[i] = missing[i-1] + (1 if cnt[i-1] == 0 else 0)",
  "",
  "# For each target mex i (0..N):",
  "#   ops = max(missing[i], cnt[i])",
  "#   missing[i] = how many of {0..i-1} are absent → must ADD",
  "#   cnt[i]     = how many copies of i exist → must REMOVE",
  "#   Removing copies of i can double as adding missing values,",
  "#   so we take the MAX of the two (not sum).",
  "for i in range(N + 1):",
  "    print(max(missing[i], cnt[i]))",
];
const MEX_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
  "",
  "    vector<int> cnt(N + 2, 0);",
  "    for (int x : a) if (0 <= x && x <= N) cnt[x]++;",
  "",
  "    vector<int> missing(N + 2, 0);",
  "    for (int i = 1; i <= N + 1; i++) {",
  "        missing[i] = missing[i-1] + (cnt[i-1] == 0 ? 1 : 0);",
  "    }",
  "",
  "    for (int i = 0; i <= N; i++) {",
  "        int ops = missing[i] > cnt[i] ? missing[i] : cnt[i];",
  "        cout << ops << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getMexesSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read N and array a", "1️⃣ N 과 배열 a 읽기"),
      color: A,
      py: MEX_S1_PY, cpp: MEX_S1_CPP,
      why: [
        t(E, "Read N (length) then N values into array a.",
            "N (길이) 읽고, 그 다음 N 개 값을 배열 a 로."),
      ],
      aside: <SampleInputAside E={E} sample={MEX_SAMPLE} highlight={[0, 1]} note={t(E,
        "Two lines: \"4\" (N=4), then \"2 2 2 0\" (the array).",
        "두 줄: \"4\" (N=4), 그 다음 \"2 2 2 0\" (배열).")} />,
    },
    {
      label: t(E, "2️⃣ Count value frequencies", "2️⃣ 값 빈도 세기"),
      color: "#0891b2",
      py: MEX_S2_PY, cpp: MEX_S2_CPP,
      why: [
        t(E, "cnt[v] = number of array elements equal to v.",
            "cnt[v] = 배열에서 v 인 원소 개수."),
        t(E, "Values are guaranteed in [0, N], so a length-(N+1) array works.",
            "값은 [0, N] 보장 → 길이 (N+1) 배열로 충분."),
      ],
    },
    {
      label: t(E, "3️⃣ missing[i] — prefix of zeros in cnt", "3️⃣ missing[i] — cnt 의 0 prefix 카운트"),
      color: "#16a34a",
      py: MEX_S3_PY, cpp: MEX_S3_CPP,
      why: [
        t(E, "missing[i] tells us: how many of the values {0, 1, ..., i−1} are NOT in the array.",
            "missing[i] = 값 {0, 1, ..., i−1} 중 배열에 없는 것의 개수."),
        t(E, "We need every value in {0..i−1} to be present for mex = i. Each missing value costs 1 op (change some element to that value).",
            "mex = i 가 되려면 {0..i−1} 의 모든 값이 있어야. 빠진 값마다 1 op (어떤 원소를 그 값으로 변경)."),
        t(E, "One pass of size N+1 builds the whole prefix array.",
            "크기 N+1 패스 한 번으로 prefix 배열 완성."),
      ],
    },
    {
      label: t(E, "4️⃣ Output — ops = max(missing[i], cnt[i])", "4️⃣ 출력 — ops = max(missing[i], cnt[i])"),
      color: "#dc2626",
      py: MEX_FULL_PY, cpp: MEX_FULL_CPP,
      why: [
        t(E, "For mex = i: must ADD `missing[i]` values, must REMOVE `cnt[i]` copies of i.",
            "mex = i 를 만들려면: missing[i] 개 값을 추가, cnt[i] 개의 i 를 제거."),
        t(E, "Each i-element being removed CAN simultaneously be changed to a missing value — one op covers both jobs.",
            "i 를 제거하면서 동시에 빠진 값으로 바꿀 수 있음 — 한 op 가 두 일을 함."),
        t(E, "So ops = max(missing[i], cnt[i]) — the bottleneck.",
            "그래서 ops = max(missing[i], cnt[i]) — 병목 쪽."),
        t(E, "Total: O(N) input + O(N) cnt + O(N) prefix + O(N) output = O(N). Fast even at N = 2·10⁵.",
            "총: O(N) 입력 + O(N) cnt + O(N) prefix + O(N) 출력 = O(N). N = 2·10⁵ 도 빠름."),
      ],
    },
  ];
}

export function MexesProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* ─── PDF helpers (same template as other quests) ─── */
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

export function downloadMexesPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Making Mexes — Full Study Guide", "🧮 Making Mexes — 종합 풀이 노트");
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
<div class="sub">USACO February 2025 Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
