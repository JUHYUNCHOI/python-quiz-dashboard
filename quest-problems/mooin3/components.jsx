import { useState, useRef } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#7c5cfc";

/* ═══════════════════════════════════════════════════════════════
   MooTraceSimulator — interactive per-j walk on s = "abbab".
   Press ▶ to scan one middle position j at a time, marking
   leftmost-different i (red), rightmost-same k (green), score.
   ═══════════════════════════════════════════════════════════════ */
export function MooTraceSimulator({ E }) {
  const str = "abbab";
  const l = 0, r = str.length - 1;
  const perJ = [];
  for (let j = l + 1; j < r; j++) {
    const sj = str[j];
    let left = -1;
    for (let i = l; i < j; i++) if (str[i] !== sj) { left = i; break; }
    let right = -1;
    for (let k = r; k > j; k--) if (str[k] === sj) { right = k; break; }
    const score = (left >= 0 && right >= 0) ? (j - left) * (right - j) : null;
    perJ.push({ j, sj, left, right, score });
  }
  const trace = [{ kind: "init", revealed: 0, best: -1 }];
  let best = -1;
  perJ.forEach((row, i) => {
    if (row.score !== null && row.score > best) best = row.score;
    trace.push({ kind: "step", row, revealed: i + 1, best });
  });
  trace.push({ kind: "final", revealed: perJ.length, best });

  const [idx, setIdx] = useState(0);
  const safe = Math.max(0, Math.min(idx, trace.length - 1));
  const s = trace[safe];

  const cellStyle = (i) => {
    let kind = "neutral";
    if (s.kind === "step") {
      if (i === s.row.j) kind = "j";
      else if (i === s.row.left) kind = "left";
      else if (i === s.row.right) kind = "right";
    }
    return {
      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 900, fontSize: 16,
      background: kind === "j" ? "#fef3c7" : kind === "left" ? "#fee2e2" : kind === "right" ? "#dcfce7" : "#fff",
      border: `2px solid ${kind === "j" ? "#f59e0b" : kind === "left" ? "#dc2626" : kind === "right" ? "#16a34a" : "#cbd5e1"}`,
      color: kind === "j" ? "#92400e" : kind === "left" ? "#7f1d1d" : kind === "right" ? "#15803d" : "#475569",
      transition: "all .2s",
    };
  };
  const labelFor = (i) => {
    if (s.kind !== "step") return "";
    if (i === s.row.j) return "j";
    if (i === s.row.left) return "i";
    if (i === s.row.right) return "k";
    return "";
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: A, textAlign: "center", marginBottom: 4 }}>
        ✏️ {t(E, `Walk every j on s = "${str}"  (query [1, ${r + 1}])`,
                  `s = "${str}" 의 모든 j 따라가기 (쿼리 [1, ${r + 1}])`)}
      </div>
      <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 14 }}>
        {t(E, `Press ▶ to step through each middle position j. (${safe + 1} / ${trace.length})`,
              `▶ 눌러서 가운데 자리 j 를 하나씩. (${safe + 1} / ${trace.length})`)}
      </div>

      {/* String row with i/j/k labels above */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 14 }}>
        {str.split("").map((ch, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ fontSize: 10, height: 14, fontWeight: 800,
              color: labelFor(i) === "j" ? "#92400e" : labelFor(i) === "i" ? "#dc2626" : labelFor(i) === "k" ? "#16a34a" : "transparent" }}>
              {labelFor(i) || "·"}
            </div>
            <div style={cellStyle(i)}>{ch}</div>
            <div style={{ fontSize: 9, color: C.dim }}>{i + 1}</div>
          </div>
        ))}
      </div>

      {/* Per-j table — only revealed rows */}
      <div style={{ display: "grid", gridTemplateColumns: "40px 50px 90px 90px 70px", gap: "4px 8px", fontSize: 12, marginBottom: 14, minHeight: 30 }}>
        <div style={{ fontWeight: 800, color: A }}>j</div>
        <div style={{ fontWeight: 800, color: A }}>s[j]</div>
        <div style={{ fontWeight: 800, color: A }}>{t(E, "i (left)", "i (왼쪽)")}</div>
        <div style={{ fontWeight: 800, color: A }}>{t(E, "k (right)", "k (오른쪽)")}</div>
        <div style={{ fontWeight: 800, color: A, textAlign: "right" }}>{t(E, "score", "점수")}</div>
        {perJ.slice(0, s.revealed).map((row, i) => {
          const isCurrent = s.kind === "step" && row.j === s.row.j;
          return (
            <div key={i} style={{ display: "contents" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: isCurrent ? "#f59e0b" : C.text }}>{row.j + 1}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#7c3aed" }}>{row.sj}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>
                {row.left >= 0 ? `${row.left + 1} ('${str[row.left]}')` : "—"}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>
                {row.right >= 0 ? `${row.right + 1} ('${str[row.right]}')` : "—"}
              </div>
              <div style={{
                textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
                color: row.score === s.best && s.best >= 0 ? "#16a34a" : C.text,
                background: row.score === s.best && s.best >= 0 ? "#dcfce7" : "transparent",
                padding: "2px 6px", borderRadius: 4,
              }}>
                {row.score === null ? "—" : row.score}
              </div>
            </div>
          );
        })}
      </div>

      {/* Step narrative */}
      <div style={{
        background: "#faf5ff", border: "2px solid #c4b5fd", borderRadius: 10,
        padding: "10px 12px", marginBottom: 12, minHeight: 64, fontSize: 13, color: C.text, lineHeight: 1.65,
      }}>
        {s.kind === "init" && (
          <>{t(E, "Start: no j scanned yet. Press ▶ to begin with the leftmost middle position.",
                  "시작: 아직 어떤 j 도 안 봤어요. ▶ 눌러서 가장 왼쪽 가운데 자리부터.")}</>
        )}
        {s.kind === "step" && (
          <>
            <div style={{ fontWeight: 800, color: "#5b21b6" }}>
              {t(E, `Try j = ${s.row.j + 1}, s[j] = '${s.row.sj}'`,
                    `j = ${s.row.j + 1} 시도, s[j] = '${s.row.sj}'`)}
            </div>
            <div style={{ marginTop: 4 }}>
              {s.row.left >= 0
                ? t(E, `i = ${s.row.left + 1} (leftmost different)`, `i = ${s.row.left + 1} (왼쪽에서 가장 가까운 다른 글자)`)
                : t(E, "no different char to the left", "왼쪽에 다른 글자 없음")}
              {s.row.right >= 0 && s.row.left >= 0 && (
                <>{" "}·{" "}
                  {t(E, `k = ${s.row.right + 1} (rightmost same)`, `k = ${s.row.right + 1} (오른쪽에서 가장 먼 같은 글자)`)}
                </>
              )}
            </div>
            <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>
              {s.row.score !== null
                ? <>score = ({s.row.j - s.row.left}) × ({s.row.right - s.row.j}) = <b style={{ color: "#16a34a" }}>{s.row.score}</b></>
                : <span style={{ color: C.dim }}>{t(E, "no valid moo here", "여기는 유효한 moo 없음")}</span>}
            </div>
          </>
        )}
        {s.kind === "final" && (
          <div style={{ fontWeight: 800, color: "#15803d" }}>
            🎉 {t(E, "All j scanned. Best score:", "모든 j 검사 완료. 최고 점수:")}{" "}
            <b style={{ fontSize: 16, color: "#15803d" }}>{s.best}</b>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => setIdx(0)} disabled={safe === 0} style={{
          padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800,
          background: "#fff", border: `2px solid ${safe === 0 ? "#e5e7eb" : A}`,
          color: safe === 0 ? "#b0b5c3" : A, cursor: safe === 0 ? "default" : "pointer",
        }}>⏮ {t(E, "Restart", "처음부터")}</button>
        <button onClick={() => setIdx(Math.max(0, safe - 1))} disabled={safe === 0} style={{
          padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 800,
          background: "#fff", border: `2px solid ${safe === 0 ? "#e5e7eb" : A}`,
          color: safe === 0 ? "#b0b5c3" : A, cursor: safe === 0 ? "default" : "pointer",
        }}>◀ {t(E, "Prev", "이전")}</button>
        <button onClick={() => setIdx(Math.min(trace.length - 1, safe + 1))} disabled={safe === trace.length - 1} style={{
          padding: "6px 18px", borderRadius: 8, fontSize: 13, fontWeight: 800,
          background: safe === trace.length - 1 ? "#e5e7eb" : A, border: `2px solid ${safe === trace.length - 1 ? "#e5e7eb" : A}`,
          color: safe === trace.length - 1 ? "#b0b5c3" : "#fff",
          cursor: safe === trace.length - 1 ? "default" : "pointer",
        }}>{t(E, "Next", "다음")} ▶</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Mooin3Sim — for each j in [l+1, r-1], find best i and k
   ═══════════════════════════════════════════════════════════════ */
const _M3_PRESETS = [
  { s: "abbab", l: 0, r: 4 },
  { s: "abacaba", l: 0, r: 6 },
  { s: "aaabbb", l: 0, r: 5 },
];

export function Mooin3Sim({ E }) {
  const [pi, setPi] = useState(0);
  const [j, setJ] = useState(2);
  const preset = _M3_PRESETS[pi];
  const s = preset.s;
  const l = preset.l, r = preset.r;
  // ensure j in valid range
  const validJ = Math.max(l + 1, Math.min(r - 1, j));

  // find best i (farthest left with s[i] != s[j])
  let bestI = -1;
  for (let i = l; i < validJ; i++) if (s[i] !== s[validJ]) { bestI = i; break; }
  // find best k (farthest right with s[k] == s[j])
  let bestK = -1;
  for (let k = r; k > validJ; k--) if (s[k] === s[validJ]) { bestK = k; break; }
  const product = (bestI >= 0 && bestK >= 0) ? (validJ - bestI) * (bestK - validJ) : -1;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
        {_M3_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setJ(p.l + 1); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `2px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>"{p.s}"</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 6 }}>
        {s.split("").map((ch, idx) => {
          const isJ = idx === validJ;
          const isI = idx === bestI;
          const isK = idx === bestK;
          const inRange = idx >= l && idx <= r;
          return (
            <div key={idx} style={{
              width: 30, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
              background: isJ ? "#fef3c7" : (isI ? "#dbeafe" : (isK ? "#dcfce7" : (inRange ? "#fff" : "#f3f4f6"))),
              border: `2px solid ${isJ ? "#f59e0b" : (isI ? "#3b82f6" : (isK ? "#16a34a" : (inRange ? "#cbd5e1" : "#e5e7eb")))}`,
              color: inRange ? C.text : "#9ca3af",
            }}>{ch}</div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 10, color: C.dim, marginBottom: 12 }}>
        🟡 = j ({validJ}) · 🔵 = best i ({bestI}) · 🟢 = best k ({bestK})
      </div>

      {/* j slider */}
      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
        <div style={{ marginBottom: 6 }}>j = {validJ}</div>
        <input type="range" min={l + 1} max={r - 1} value={validJ} onChange={e => setJ(parseInt(e.target.value))} style={{ width: "100%" }} />
      </div>

      <div style={{ background: product >= 0 ? "#dcfce7" : "#fef2f2", border: `2px solid ${product >= 0 ? "#16a34a" : "#dc2626"}`, borderRadius: 10, padding: "10px 12px", color: product >= 0 ? "#15803d" : "#7f1d1d", fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", textAlign: "center" }}>
        {product >= 0 ? `(j − i) × (k − j) = ${validJ - bestI} × ${bestK - validJ} = ${product}` : t(E, "no valid (i, j, k) for this j", "이 j에 대해 유효 (i, j, k) 없음")}
      </div>
    </div>
  );
}

export function Mooin3Runner({ E }) {
  return (
    <div style={{ padding: 14, fontSize: 12, color: C.dim, lineHeight: 1.6, textAlign: "center" }}>
      {t(E, "Use the Sim above to drag j and watch best i and k. Per-query brute force is in the code section.",
            "위 Sim에서 j를 드래그하며 best i, k 변화 관찰. 쿼리당 brute force는 코드 섹션 참고.")}
    </div>
  );
}

/* Section 1: Input — string + queries */
const M3_INPUT_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
];
const M3_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
];

/* Section 2: For each query, scan middle j */
const M3_LOOP_PY = [
  "for _ in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1; r -= 1   # convert to 0-based",
  "    best = -1",
  "",
  "    for j in range(l + 1, r):",
  "        # find farthest left i in [l, j) with s[i] != s[j]",
  "        i = next((ii for ii in range(l, j) if s[ii] != s[j]), -1)",
  "        # find farthest right k in (j, r] with s[k] == s[j]",
  "        k = next((kk for kk in range(r, j, -1) if s[kk] == s[j]), -1)",
];
const M3_LOOP_CPP = [
  "    while (Q--) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--; r--;",
  "        long long best = -1;",
  "",
  "        for (int j = l + 1; j < r; j++) {",
  "            int i = -1;",
  "            for (int ii = l; ii < j; ii++) if (s[ii] != s[j]) { i = ii; break; }",
  "            int k = -1;",
  "            for (int kk = r; kk > j; kk--) if (s[kk] == s[j]) { k = kk; break; }",
];

/* Section 3: update best with (j-i)*(k-j) */
const M3_UPDATE_PY = [
  "        if i != -1 and k != -1:",
  "            best = max(best, (j - i) * (k - j))",
  "    print(best)",
];
const M3_UPDATE_CPP = [
  "            if (i != -1 && k != -1) {",
  "                long long val = (long long)(j - i) * (k - j);",
  "                if (val > best) best = val;",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const M3_FULL_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "for _ in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1; r -= 1",
  "    best = -1",
  "    for j in range(l + 1, r):",
  "        i = next((ii for ii in range(l, j) if s[ii] != s[j]), -1)",
  "        k = next((kk for kk in range(r, j, -1) if s[kk] == s[j]), -1)",
  "        if i != -1 and k != -1:",
  "            best = max(best, (j - i) * (k - j))",
  "    print(best)",
];
const M3_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N, Q; cin >> N >> Q;",
  "    string s; cin >> s;",
  "",
  "    while (Q--) {",
  "        int l, r; cin >> l >> r; l--; r--;",
  "        long long best = -1;",
  "        for (int j = l + 1; j < r; j++) {",
  "            int i = -1;",
  "            for (int ii = l; ii < j; ii++) if (s[ii] != s[j]) { i = ii; break; }",
  "            int k = -1;",
  "            for (int kk = r; kk > j; kk--) if (s[kk] == s[j]) { k = kk; break; }",
  "            if (i != -1 && k != -1) {",
  "                long long val = (long long)(j - i) * (k - j);",
  "                if (val > best) best = val;",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getMooin3Sections(E) {
  return [
    {
      label: t(E, "📦 1. Input + String", "📦 1. 입력 + 문자열"),
      color: A,
      py: M3_INPUT_PY, cpp: M3_INPUT_CPP,
      why: [
        t(E, "Read N, Q, then the whole string s.",
            "N, Q와 문자열 s 읽기."),
        t(E, "Queries follow — each gives a 1-based [l, r] range.",
            "쿼리들이 따라옴 — 1-based [l, r] 범위."),
      ],
      pyOnly: [
        t(E, "input().strip() removes any trailing newline.",
            "input().strip()으로 줄바꿈 제거."),
      ],
      cppOnly: [
        t(E, "cin >> string reads a whitespace-delimited token cleanly.",
            "cin >> string으로 공백 구분 토큰 깔끔하게 읽기."),
      ],
    },
    {
      label: t(E, "🔍 2. Fix the Middle j", "🔍 2. 중간 j 고정"),
      color: "#0891b2",
      py: M3_LOOP_PY, cpp: M3_LOOP_CPP,
      why: [
        t(E, "For each candidate middle j in [l+1, r-1], we want the BEST i to its left and BEST k to its right.",
            "각 후보 중간 j ∈ [l+1, r-1]에 대해, 왼쪽 최선 i와 오른쪽 최선 k를 찾기."),
        t(E, "Best i = farthest from j (smallest index) with s[i] != s[j] → maximizes (j - i).",
            "최선 i = j에서 가장 먼 (가장 작은 인덱스) s[i] != s[j] → (j - i) 최대화."),
        t(E, "Best k = farthest from j (largest index) with s[k] == s[j] → maximizes (k - j).",
            "최선 k = j에서 가장 먼 (가장 큰 인덱스) s[k] == s[j] → (k - j) 최대화."),
      ],
      pyOnly: [
        t(E, "next((expr for ... if cond), -1) finds the first match or -1 — concise.",
            "next((expr for ... if cond), -1)이 첫 매칭 또는 -1 — 간결."),
      ],
      cppOnly: [
        t(E, "Inner loop with break is the most direct way; std::find_if also works.",
            "break를 쓴 내부 루프가 가장 직관적; std::find_if도 가능."),
      ],
    },
    {
      label: t(E, "🏆 3. Update Best Product", "🏆 3. 최댓값 갱신"),
      color: "#16a34a",
      py: M3_UPDATE_PY, cpp: M3_UPDATE_CPP,
      why: [
        t(E, "If both i and k exist, compute (j - i) * (k - j) and keep the maximum.",
            "i와 k가 모두 존재하면 (j - i) * (k - j) 계산해 최댓값 갱신."),
        t(E, "If no valid triplet exists in the range, best stays -1 — print as is.",
            "범위에 유효 트리플이 없으면 best는 -1 그대로 — 그대로 출력."),
      ],
      cppOnly: [
        t(E, "Cast one operand to long long to avoid overflow on the product.",
            "곱셈 오버플로 방지를 위해 한쪽을 long long으로 캐스팅."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: M3_FULL_PY, cpp: M3_FULL_CPP,
      why: [
        t(E, "Per query: O(N²) — fine for Bronze constraints.",
            "쿼리당: O(N²) — Bronze 제약에 충분."),
        t(E, "Total: O(N² · Q). Faster solutions exist with prefix structures, but brute force passes here.",
            "총: O(N² · Q). 접두 구조로 더 빠르게도 가능하지만 완전탐색으로 통과."),
      ],
    },
  ];
}

export function Mooin3ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#7c5cfc" />;
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadMooin3PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mooin' Time III — Full Study Guide", "🐄 Mooin' Time III — 종합 풀이 노트");
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
<div class="sub">USACO 2025 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
