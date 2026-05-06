import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

const A = "#9333ea";

const MO_SAMPLE = ["10 2", "zzmoozzmoo"];

/* ════════════════════════════════════════════════════════════════════
   MooExplorer — pick a string + F, list moos that occur.
   ════════════════════════════════════════════════════════════════════ */
const MO_PRESETS = [
  { name: "S1: zzmoozzmoo F=2", s: "zzmoozzmoo", F: 2 },
  { name: "S2: …baaaaa…cqq F=2", s: "momoobaaaaaqqqcqq", F: 2 },
  { name: "S3: ooo F=1", s: "ooo", F: 1 },
  { name: "Tiny: aaa F=1", s: "aaa", F: 1 },
];

function findMoos(s, F) {
  const N = s.length;
  const cnt = new Map();
  for (let i = 0; i <= N - 3; i++) {
    const sub = s.slice(i, i + 3);
    if (sub[1] === sub[2] && sub[0] !== sub[1]) {
      cnt.set(sub, (cnt.get(sub) ?? 0) + 1);
    }
  }
  const ans = new Set();
  for (const [m, c] of cnt.entries()) if (c >= F) ans.add(m);

  for (let i = 0; i < N; i++) {
    for (const c of "abcdefghijklmnopqrstuvwxyz") {
      if (c === s[i]) continue;
      const delta = new Map();
      const jLo = Math.max(0, i - 2);
      const jHi = Math.min(N - 3, i);
      for (let j = jLo; j <= jHi; j++) {
        const oldSub = s.slice(j, j + 3);
        const newArr = oldSub.split("");
        newArr[i - j] = c;
        const newSub = newArr.join("");
        if (oldSub[1] === oldSub[2] && oldSub[0] !== oldSub[1]) {
          delta.set(oldSub, (delta.get(oldSub) ?? 0) - 1);
        }
        if (newSub[1] === newSub[2] && newSub[0] !== newSub[1]) {
          delta.set(newSub, (delta.get(newSub) ?? 0) + 1);
        }
      }
      for (const [m, d] of delta.entries()) {
        if ((cnt.get(m) ?? 0) + d >= F) ans.add(m);
      }
    }
  }
  return [...ans].sort();
}

export function MooExplorer({ E }) {
  const [pi, setPi] = useState(0);
  const preset = MO_PRESETS[pi];
  const moos = findMoos(preset.s, preset.F);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {MO_PRESETS.map((p, i) => (
          <button key={i} onClick={() => setPi(i)} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${pi === i ? A : C.border}`,
            background: pi === i ? "#f3e8ff" : "#fff", color: pi === i ? A : C.text, cursor: "pointer",
          }}>{p.name}</button>
        ))}
      </div>

      <div style={{ background: "#fff", border: `2px solid ${C.border}`, borderRadius: 8, padding: 10, marginBottom: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: C.text, textAlign: "center", letterSpacing: 2 }}>
        {preset.s}
      </div>

      <div style={{ background: A, color: "#fff", borderRadius: 10, padding: "10px 12px", fontSize: 13, fontWeight: 800, textAlign: "center", marginBottom: 10 }}>
        {t(E, `Distinct moos with ≤ 1 edit: ${moos.length}`, `≤ 1 수정으로 가능한 moo: ${moos.length}`)}
      </div>

      {moos.length > 0 && (
        <div style={{ background: "#faf5ff", border: "1.5px solid #d8b4fe", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#581c87", lineHeight: 1.7 }}>
          <b>{t(E, "Moos:", "moo:")}</b>{" "}
          {moos.slice(0, 30).map((m, i) => (
            <code key={i} style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, marginRight: 6, fontFamily: "'JetBrains Mono',monospace" }}>{m}</code>
          ))}
          {moos.length > 30 && <span>… ({moos.length - 30} more)</span>}
        </div>
      )}
    </div>
  );
}

export function MooSim({ E }) { return <MooExplorer E={E} />; }
export function MooRunner({ E }) {
  return <div style={{ padding: 14, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
    {t(E, "Use the explorer above.", "위 explorer 사용.")}
  </div>;
}

/* ════════════════════════════════════════════════════════════════════
   Progressive code: 4 sections.
   ════════════════════════════════════════════════════════════════════ */

const MO_S1_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "N = int(data[0])",
  "F = int(data[1])",
  "s = data[2].decode()",
];
const MO_S1_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <map>",
  "#include <set>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N, F;",
  "    cin >> N >> F;",
  "    string s;",
  "    cin >> s;",
];

const MO_S2_PY = [
  "# Count current moos in s.",
  "# A moo is a length-3 substring s[i:i+3] with s[i+1]==s[i+2] and s[i]!=s[i+1].",
  "cnt = {}",
  "for i in range(N - 2):",
  "    sub = s[i:i+3]",
  "    if sub[1] == sub[2] and sub[0] != sub[1]:",
  "        cnt[sub] = cnt.get(sub, 0) + 1",
  "",
  "# Moos already at F or more (no edit needed)",
  "answer = set()",
  "for m, c in cnt.items():",
  "    if c >= F:",
  "        answer.add(m)",
];
const MO_S2_CPP = [
  "    map<string, int> cnt;",
  "    for (int i = 0; i + 3 <= N; i++) {",
  "        if (s[i+1] == s[i+2] && s[i] != s[i+1]) {",
  "            cnt[s.substr(i, 3)]++;",
  "        }",
  "    }",
  "    set<string> answer;",
  "    for (auto& [m, c] : cnt) if (c >= F) answer.insert(m);",
];

const MO_S3_PY = [
  "# For each single edit (position i, new char nc):",
  "# Only the (≤ 3) windows containing position i change status.",
  "# For each affected window: update delta map.",
  "for i in range(N):",
  "    old_c = s[i]",
  "    for nc in 'abcdefghijklmnopqrstuvwxyz':",
  "        if nc == old_c: continue",
  "        delta = {}",
  "        j_lo = max(0, i - 2)",
  "        j_hi = min(N - 3, i)",
  "        for j in range(j_lo, j_hi + 1):",
  "            old_sub = s[j:j+3]",
  "            new_chars = list(old_sub)",
  "            new_chars[i - j] = nc",
  "            new_sub = ''.join(new_chars)",
  "            if old_sub[1] == old_sub[2] and old_sub[0] != old_sub[1]:",
  "                delta[old_sub] = delta.get(old_sub, 0) - 1",
  "            if new_sub[1] == new_sub[2] and new_sub[0] != new_sub[1]:",
  "                delta[new_sub] = delta.get(new_sub, 0) + 1",
  "        # Check if any moo's count crosses F under this edit",
  "        for m, d in delta.items():",
  "            if cnt.get(m, 0) + d >= F:",
  "                answer.add(m)",
];
const MO_S3_CPP = [
  "    for (int i = 0; i < N; i++) {",
  "        char old_c = s[i];",
  "        for (char nc = 'a'; nc <= 'z'; nc++) {",
  "            if (nc == old_c) continue;",
  "            map<string, int> delta;",
  "            int j_lo = max(0, i - 2);",
  "            int j_hi = min(N - 3, i);",
  "            for (int j = j_lo; j <= j_hi; j++) {",
  "                string old_sub = s.substr(j, 3);",
  "                string new_sub = old_sub;",
  "                new_sub[i - j] = nc;",
  "                if (old_sub[1] == old_sub[2] && old_sub[0] != old_sub[1])",
  "                    delta[old_sub]--;",
  "                if (new_sub[1] == new_sub[2] && new_sub[0] != new_sub[1])",
  "                    delta[new_sub]++;",
  "            }",
  "            for (auto& [m, d] : delta) {",
  "                int existing = cnt.count(m) ? cnt[m] : 0;",
  "                if (existing + d >= F) answer.insert(m);",
  "            }",
  "        }",
  "    }",
];

const MO_FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "N = int(data[0])",
  "F = int(data[1])",
  "s = data[2].decode()",
  "",
  "cnt = {}",
  "for i in range(N - 2):",
  "    sub = s[i:i+3]",
  "    if sub[1] == sub[2] and sub[0] != sub[1]:",
  "        cnt[sub] = cnt.get(sub, 0) + 1",
  "",
  "answer = set()",
  "for m, c in cnt.items():",
  "    if c >= F:",
  "        answer.add(m)",
  "",
  "for i in range(N):",
  "    old_c = s[i]",
  "    for nc in 'abcdefghijklmnopqrstuvwxyz':",
  "        if nc == old_c: continue",
  "        delta = {}",
  "        j_lo = max(0, i - 2)",
  "        j_hi = min(N - 3, i)",
  "        for j in range(j_lo, j_hi + 1):",
  "            old_sub = s[j:j+3]",
  "            new_chars = list(old_sub)",
  "            new_chars[i - j] = nc",
  "            new_sub = ''.join(new_chars)",
  "            if old_sub[1] == old_sub[2] and old_sub[0] != old_sub[1]:",
  "                delta[old_sub] = delta.get(old_sub, 0) - 1",
  "            if new_sub[1] == new_sub[2] and new_sub[0] != new_sub[1]:",
  "                delta[new_sub] = delta.get(new_sub, 0) + 1",
  "        for m, d in delta.items():",
  "            if cnt.get(m, 0) + d >= F:",
  "                answer.add(m)",
  "",
  "sorted_moos = sorted(answer)",
  "print(len(sorted_moos))",
  "for m in sorted_moos:",
  "    print(m)",
];
const MO_FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <map>",
  "#include <set>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N, F;",
  "    cin >> N >> F;",
  "    string s;",
  "    cin >> s;",
  "",
  "    map<string, int> cnt;",
  "    for (int i = 0; i + 3 <= N; i++) {",
  "        if (s[i+1] == s[i+2] && s[i] != s[i+1]) cnt[s.substr(i, 3)]++;",
  "    }",
  "    set<string> answer;",
  "    for (auto& [m, c] : cnt) if (c >= F) answer.insert(m);",
  "",
  "    for (int i = 0; i < N; i++) {",
  "        char old_c = s[i];",
  "        for (char nc = 'a'; nc <= 'z'; nc++) {",
  "            if (nc == old_c) continue;",
  "            map<string, int> delta;",
  "            int j_lo = max(0, i - 2);",
  "            int j_hi = min(N - 3, i);",
  "            for (int j = j_lo; j <= j_hi; j++) {",
  "                string old_sub = s.substr(j, 3);",
  "                string new_sub = old_sub;",
  "                new_sub[i - j] = nc;",
  "                if (old_sub[1] == old_sub[2] && old_sub[0] != old_sub[1]) delta[old_sub]--;",
  "                if (new_sub[1] == new_sub[2] && new_sub[0] != new_sub[1]) delta[new_sub]++;",
  "            }",
  "            for (auto& [m, d] : delta) {",
  "                int existing = cnt.count(m) ? cnt[m] : 0;",
  "                if (existing + d >= F) answer.insert(m);",
  "            }",
  "        }",
  "    }",
  "",
  "    cout << answer.size() << '\\n';",
  "    for (auto& m : answer) cout << m << '\\n';",
  "    return 0;",
  "}",
];

export function getMooSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read N, F, string s", "1️⃣ N, F, 문자열 s 읽기"),
      color: A,
      py: MO_S1_PY, cpp: MO_S1_CPP,
      why: [
        t(E, "Read N (length), F (frequency threshold), then the string itself.",
            "N (길이), F (빈도 기준), 그 다음 문자열."),
      ],
      aside: <SampleInputAside E={E} sample={MO_SAMPLE} highlight={[0, 1]} note={t(E,
        "Two lines: \"10 2\" (N=10, F=2) and the string \"zzmoozzmoo\".",
        "두 줄: \"10 2\" (N=10, F=2) 와 문자열 \"zzmoozzmoo\".")} />,
    },
    {
      label: t(E, "2️⃣ Count current moos + add already-qualified", "2️⃣ 현재 moo 카운트 + 이미 충족하는 것 추가"),
      color: "#0891b2",
      py: MO_S2_PY, cpp: MO_S2_CPP,
      why: [
        t(E, "Slide a length-3 window through s. For each window matching XYY (X ≠ Y), increment its count.",
            "s 위로 길이 3 윈도우 슬라이드. XYY 패턴 매칭 시 (X ≠ Y) 카운트 증가."),
        t(E, "Any moo with count ≥ F qualifies WITHOUT any edit. Add to answer set.",
            "수정 없이 count ≥ F 인 moo 는 그대로 자격. answer 에 추가."),
      ],
    },
    {
      label: t(E, "3️⃣ Try every single edit — compute delta", "3️⃣ 모든 단일 수정 시도 — delta 계산"),
      color: "#dc2626",
      py: MO_S3_PY, cpp: MO_S3_CPP,
      why: [
        t(E, "For each position i and each new character nc ≠ s[i]: only the (≤ 3) windows containing position i change status.",
            "각 위치 i 와 각 새 글자 nc ≠ s[i]: 위치 i 를 포함하는 (≤ 3) 윈도우만 변화."),
        t(E, "For each affected window: track delta — old moo lost 1, new moo gained 1.",
            "각 영향 윈도우: delta 추적 — old moo 1 감소, new moo 1 증가."),
        t(E, "If cnt[m] + delta[m] ≥ F under this edit, m qualifies. Add to answer.",
            "이 수정 하에 cnt[m] + delta[m] ≥ F 면 m 자격. answer 에 추가."),
      ],
    },
    {
      label: t(E, "4️⃣ Output count + sorted moos", "4️⃣ 개수 + 정렬된 moo 출력"),
      color: "#16a34a",
      py: MO_FULL_PY, cpp: MO_FULL_CPP,
      why: [
        t(E, "Sort the answer set lexicographically.",
            "answer 집합을 사전순 정렬."),
        t(E, "First print count, then each moo on its own line.",
            "먼저 개수 출력, 그 다음 moo 각각 줄 바꿈."),
        t(E, "Total: O(N · 26 · 6) ≈ 3 million for N=20000. Fast.",
            "총: O(N · 26 · 6) ≈ N=20000 에서 300 만. 빠름."),
      ],
    },
  ];
}

export function MooProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* PDF helpers */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sum","sorted","set"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","map","pair","set"];
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

export function downloadMooPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "It's Mooin' Time — Full Study Guide", "🐄 It's Mooin' Time — 종합 풀이 노트");
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
