import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { SimNav as SharedSimNav, useTraceStep, StepHeader, NarrativePanel } from "@/components/quest/TraceStepper";

const A = "#7c5cfc";

/* SimNav uses the shared component, with this quest's accent color. */
function SimNav({ idx, total, onIdx }) {
  return <SharedSimNav idx={idx} total={total} onIdx={onIdx} accent={A} />;
}

/* ═══════════════════════════════════════════════════════════════
   TripletEnumSimulator — first natural idea: try every (i, j, k).
   Walks all C(N, 3) triplets on s = "abba", checking moo condition
   one by one. Final realization: O(N³) doesn't scale.
   ═══════════════════════════════════════════════════════════════ */
export function TripletEnumSimulator({ E }) {
  const str = "abba";
  const trips = [];
  for (let i = 0; i < str.length; i++)
    for (let j = i + 1; j < str.length; j++)
      for (let k = j + 1; k < str.length; k++) {
        const ok = str[i] !== str[j] && str[j] === str[k];
        const score = ok ? (j - i) * (k - j) : null;
        const why = !ok
          ? (str[i] === str[j]
              ? `s[i]='${str[i]}' = s[j]='${str[j]}'  ✗ (same)`
              : `s[j]='${str[j]}' ≠ s[k]='${str[k]}'  ✗`)
          : `s[i]≠s[j] ✓, s[j]=s[k] ✓ → score = (${j}-${i})·(${k}-${j}) = ${score}`;
        trips.push({ i, j, k, ok, score, why });
      }
  let best = -1;
  trips.forEach(t => { if (t.ok && t.score > best) best = t.score; });

  const trace = [{ kind: "intro" }, ...trips.map((t, idx) => ({ kind: "step", t, idx })), { kind: "verdict" }, { kind: "scale" }];
  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];

  const cellStyle = (pos, t) => {
    let role = null;
    if (t) { if (pos === t.i) role = "i"; else if (pos === t.j) role = "j"; else if (pos === t.k) role = "k"; }
    const colors = {
      i: ["#fee2e2", "#dc2626", "#7f1d1d"],
      j: ["#fef3c7", "#f59e0b", "#92400e"],
      k: ["#dcfce7", "#16a34a", "#15803d"],
    };
    const [bg, bd, fg] = role ? colors[role] : ["#fff", "#cbd5e1", "#475569"];
    return {
      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 900, fontSize: 16,
      background: bg, border: `2px solid ${bd}`, color: fg, transition: "all .2s",
    };
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, `First idea: try ALL triplets on s = "${str}"`,
                    `첫 시도: s = "${str}" 의 모든 triplet 시도`)}
        subtitle={<>({safe + 1} / {trace.length}) — ▶ {t(E, "to step", "눌러서 진행")}</>}
      />

      {/* String visualization */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 14 }}>
        {str.split("").map((ch, pos) => (
          <div key={pos} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ fontSize: 10, color: C.dim }}>{pos + 1}</div>
            <div style={cellStyle(pos, s.kind === "step" ? s.t : null)}>{ch}</div>
          </div>
        ))}
      </div>

      <NarrativePanel minHeight={130}>
        {s.kind === "intro" && (
          <>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 4 }}>
              💡 {t(E, "Naive idea: enumerate every triplet (i, j, k) with i < j < k.",
                          "단순 아이디어: i < j < k 인 모든 (i, j, k) 시도.")}
            </div>
            <div>
              {t(E, `For s = "${str}" (N = 4), there are C(4, 3) = 4 triplets to check. ▶ to walk through all of them.`,
                    `s = "${str}" (N = 4) 에서 C(4, 3) = 4 개 triplet. ▶ 눌러서 다 확인.`)}
            </div>
          </>
        )}
        {s.kind === "step" && (
          <>
            <div style={{ fontWeight: 800, color: s.t.ok ? "#15803d" : "#7f1d1d", marginBottom: 6 }}>
              {s.t.ok ? "✓" : "✗"} (i, j, k) = (<b style={{ color: "#dc2626" }}>{s.t.i + 1}</b>, <b style={{ color: "#92400e" }}>{s.t.j + 1}</b>, <b style={{ color: "#16a34a" }}>{s.t.k + 1}</b>) = '{str[s.t.i]}{str[s.t.j]}{str[s.t.k]}'
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>{s.t.why}</div>
          </>
        )}
        {s.kind === "verdict" && (
          <>
            <div style={{ fontWeight: 800, color: "#15803d", marginBottom: 6, fontSize: 14 }}>
              🏁 {t(E, "All 4 triplets checked.", "4 개 다 확인 완료.")}
            </div>
            <div>
              {t(E, "Only (1, 2, 3) = 'abb' is a valid moo. Best score = ", "(1, 2, 3) = 'abb' 만 유효. 최고 점수 = ")}
              <b style={{ color: "#16a34a" }}>{best}</b>.
            </div>
          </>
        )}
        {s.kind === "scale" && (
          <>
            <div style={{ fontWeight: 800, color: "#92400e", marginBottom: 6, fontSize: 14 }}>
              📈 {t(E, "Will this scale?", "큰 입력에는?")}
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.7 }}>
              <div>• {t(E, "N = 4: C(4,3) = 4 triplets — easy.", "N = 4: C(4,3) = 4 개 — 쉬움.")}</div>
              <div>• {t(E, "N = 100: C(100,3) ≈ 1.6 × 10⁵ — still OK.", "N = 100: C(100,3) ≈ 1.6 × 10⁵ — 아직 OK.")}</div>
              <div>• {t(E, "N = 1000: C(1000,3) ≈ 1.6 × 10⁸ — borderline.",
                          "N = 1000: C(1000,3) ≈ 1.6 × 10⁸ — 경계선.")}</div>
              <div style={{ color: "#dc2626", fontWeight: 700 }}>
                • {t(E, "N = 10⁵: ~10¹⁵ triplets — IMPOSSIBLE.",
                          "N = 10⁵: ~10¹⁵ 개 — 불가능.")}
              </div>
              <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #fbbf24", color: "#5b21b6", fontWeight: 700 }}>
                {t(E, "→ Need to narrow the search. Idea: fix j (middle), find best i and best k separately.",
                      "→ 탐색을 좁혀야 함. 아이디어: j (중간) 고정하고 best i, best k 따로 찾기.")}
              </div>
            </div>
          </>
        )}
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} />
    </div>
  );
}

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

  const ts = useTraceStep(trace);
  const safe = ts.safe;
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
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, `Walk every j on s = "${str}"  (query [1, ${r + 1}])`,
                    `s = "${str}" 의 모든 j 따라가기 (쿼리 [1, ${r + 1}])`)}
        subtitle={t(E, `Press ▶ to step through each middle position j. (${safe + 1} / ${trace.length})`,
                       `▶ 눌러서 가운데 자리 j 를 하나씩. (${safe + 1} / ${trace.length})`)}
      />


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
      <NarrativePanel minHeight={64} padding="10px 12px" lineHeight={1.65}>
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
      </NarrativePanel>

      {/* Nav */}
      <SharedSimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
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
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
];

/* Section 2: For each query, scan middle j */
const M3_LOOP_PY = (E) => [
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  t(E, "    l -= 1; r -= 1   # convert to 0-based",
        "    l -= 1; r -= 1   # 0-based 로 변환"),
  "    best = -1",
  "",
  "    for j in range(l + 1, r):",
  t(E, "        # leftmost i in [l, j) with s[i] != s[j] → maximizes (j - i)",
        "        # [l, j) 에서 s[i] != s[j] 인 가장 왼쪽 i → (j - i) 최대화"),
  "        i = -1",
  "        for ii in range(l, j):",
  "            if s[ii] != s[j]:",
  "                i = ii",
  "                break",
  t(E, "        # rightmost k in (j, r] with s[k] == s[j] → maximizes (k - j)",
        "        # (j, r] 에서 s[k] == s[j] 인 가장 오른쪽 k → (k - j) 최대화"),
  "        k = -1",
  "        for kk in range(r, j, -1):",
  "            if s[kk] == s[j]:",
  "                k = kk",
  "                break",
];
const M3_LOOP_CPP = (E) => [
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  t(E, "        l--; r--;   // convert to 0-based",
        "        l--; r--;   // 0-based 로 변환"),
  "        long long best = -1;",
  "",
  "        for (int j = l + 1; j < r; j++) {",
  t(E, "            // leftmost i with s[i] != s[j]",
        "            // s[i] != s[j] 인 가장 왼쪽 i"),
  "            int i = -1;",
  "            for (int ii = l; ii < j; ii++) {",
  "                if (s[ii] != s[j]) { i = ii; break; }",
  "            }",
  t(E, "            // rightmost k with s[k] == s[j]",
        "            // s[k] == s[j] 인 가장 오른쪽 k"),
  "            int k = -1;",
  "            for (int kk = r; kk > j; kk--) {",
  "                if (s[kk] == s[j]) { k = kk; break; }",
  "            }",
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
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1; r -= 1",
  "    best = -1",
  "    for j in range(l + 1, r):",
  "        i = -1",
  "        for ii in range(l, j):",
  "            if s[ii] != s[j]:",
  "                i = ii",
  "                break",
  "        k = -1",
  "        for kk in range(r, j, -1):",
  "            if s[kk] == s[j]:",
  "                k = kk",
  "                break",
  "        if i != -1 and k != -1:",
  "            val = (j - i) * (k - j)",
  "            if val > best:",
  "                best = val",
  "    print(best)",
];
const M3_FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--; r--;",
  "        long long best = -1;",
  "        for (int j = l + 1; j < r; j++) {",
  "            int i = -1;",
  "            for (int ii = l; ii < j; ii++) {",
  "                if (s[ii] != s[j]) { i = ii; break; }",
  "            }",
  "            int k = -1;",
  "            for (int kk = r; kk > j; kk--) {",
  "                if (s[kk] == s[j]) { k = kk; break; }",
  "            }",
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

/* ── Step 6 — insight (pseudo-code; commits to the lookup-table direction) ── */
const M3_INSIGHT_PY = [
  "# 안쪽 두 스캔이 같은 답을 반복하는 게 보임. 문자마다 미리 계산하자:",
  "#",
  "#   first_diff[c][i] = s[idx] != chr(c) 인 가장 작은 idx ≥ i",
  "#                      (없으면 N)",
  "#   last_same[c][i]  = s[idx] == chr(c) 인 가장 큰 idx ≤ i",
  "#                      (없으면 -1)",
  "#",
  "# 그러면 j 에서:",
  "#   c = s[j]",
  "#   i = first_diff[c][l]   ← (j-i) 최대화",
  "#   k = last_same[c][r]    ← (k-j) 최대화",
  "# 두 lookup 모두 O(1).",
];
const M3_INSIGHT_CPP = [
  "// 같은 인사이트 (C++ 도 동일):",
  "//   first_diff[c][i] = smallest idx >= i with s[idx] != c (else N)",
  "//   last_same[c][i]  = largest idx <= i with s[idx] == c  (else -1)",
  "//",
  "// 한 번만 만들고, 쿼리마다 j 별 두 lookup 이 O(1).",
];

/* ── Step 7 — final fast code (lookup tables) ── */
const M3_FAST_PY = [
  "import sys",
  "",
  "data = sys.stdin.buffer.read().split()",
  "p = 0",
  "N = int(data[p]); p += 1",
  "Q = int(data[p]); p += 1",
  "s = data[p].decode(); p += 1",
  "",
  "INF = N",
  "first_diff = [[INF] * (N + 1) for _ in range(26)]",
  "last_same  = [[-1]  * (N + 1) for _ in range(26)]",
  "for c in range(26):",
  "    ch = chr(c + 97)",
  "    nxt = INF",
  "    for i in range(N - 1, -1, -1):",
  "        if s[i] != ch: nxt = i",
  "        first_diff[c][i] = nxt",
  "    last = -1",
  "    for i in range(N):",
  "        if s[i] == ch: last = i",
  "        last_same[c][i] = last",
  "",
  "for _ in range(Q):",
  "    l = int(data[p]) - 1; p += 1",
  "    r = int(data[p]) - 1; p += 1",
  "    best = -1",
  "    for j in range(l + 1, r):",
  "        c = ord(s[j]) - 97",
  "        i = first_diff[c][l]",
  "        if i >= j: continue",
  "        k = last_same[c][r]",
  "        if k <= j: continue",
  "        v = (j - i) * (k - j)",
  "        if v > best: best = v",
  "    print(best)",
];
const M3_FAST_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
  "",
  "    int INF = N;",
  "    vector<vector<int>> first_diff(26, vector<int>(N + 1, INF));",
  "    vector<vector<int>> last_same (26, vector<int>(N + 1, -1));",
  "    for (int c = 0; c < 26; c++) {",
  "        char ch = 'a' + c;",
  "        int nxt = INF;",
  "        for (int i = N - 1; i >= 0; i--) {",
  "            if (s[i] != ch) nxt = i;",
  "            first_diff[c][i] = nxt;",
  "        }",
  "        int last = -1;",
  "        for (int i = 0; i < N; i++) {",
  "            if (s[i] == ch) last = i;",
  "            last_same[c][i] = last;",
  "        }",
  "    }",
  "",
  "    while (Q--) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--; r--;",
  "        long long best = -1;",
  "        for (int j = l + 1; j < r; j++) {",
  "            int c = s[j] - 'a';",
  "            int i = first_diff[c][l];",
  "            if (i >= j) continue;",
  "            int k = last_same[c][r];",
  "            if (k <= j) continue;",
  "            long long v = (long long)(j - i) * (k - j);",
  "            if (v > best) best = v;",
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
            "N, Q 와 문자열 s 읽기."),
        t(E, "Each query line: l r — both 1-INDEXED. The code converts to 0-indexed (l--, r--) before processing.",
            "각 쿼리 줄: l r — 둘 다 1-INDEXED. 코드에서 0-indexed (l--, r--) 로 변환."),
      ],
      pyOnly: [
        t(E, "input().strip() removes any trailing newline.",
            "input().strip() 으로 줄바꿈 제거."),
      ],
      cppOnly: [
        t(E, "cin >> string reads a whitespace-delimited token (cpp-11 string).",
            "cin >> string 으로 공백 구분 토큰 (cpp-11 string)."),
      ],
    },
    {
      label: t(E, "🔍 2. Fix the Middle j", "🔍 2. 중간 j 고정"),
      color: "#0891b2",
      py: M3_LOOP_PY(E), cpp: M3_LOOP_CPP(E),
      why: [
        t(E, "For each middle j in [l+1, r−1], we want the BEST i to its left and BEST k to its right.",
            "각 중간 j ∈ [l+1, r−1] 에 대해, 왼쪽 최선 i 와 오른쪽 최선 k 찾기."),
        t(E, "Best i = SMALLEST index with s[i] ≠ s[j] (smaller i → bigger j−i).",
            "최선 i = s[i] ≠ s[j] 인 가장 작은 인덱스 (i 작을수록 j−i 커짐)."),
        t(E, "Best k = LARGEST index with s[k] == s[j] (bigger k → bigger k−j).",
            "최선 k = s[k] == s[j] 인 가장 큰 인덱스 (k 클수록 k−j 커짐)."),
      ],
      pyOnly: [
        t(E, "Plain for-loop with break gives the first match — uses only Python lesson 13/14 syntax.",
            "for + break 로 첫 매칭 — Python 레슨 13/14 문법만 사용."),
      ],
      cppOnly: [
        t(E, "Inner loop with break — uses only cpp-7 (loops) + cpp-11 (string indexing).",
            "for + break 내부 루프 — cpp-7 (루프) + cpp-11 (문자열 인덱싱) 만 사용."),
      ],
    },
    {
      label: t(E, "🏆 3. Update Best Product", "🏆 3. 최댓값 갱신"),
      color: "#16a34a",
      py: M3_UPDATE_PY, cpp: M3_UPDATE_CPP,
      why: [
        t(E, "If both i and k exist, compute (j − i) × (k − j) and keep the maximum.",
            "i 와 k 둘 다 존재하면 (j − i) × (k − j) 계산해 최댓값 갱신."),
        t(E, "If no valid triplet in the range, best stays −1 → print −1.",
            "범위에 유효 triplet 없으면 best 는 −1 → −1 출력."),
      ],
      cppOnly: [
        t(E, "Why long long? With N up to 10⁵, (j−i) and (k−j) can each be up to 10⁵ → product up to 10¹⁰, larger than int's max (~2·10⁹). Casting one operand to long long forces the multiplication to use long long.",
            "왜 long long? N 최대 10⁵, (j−i) 와 (k−j) 각각 최대 10⁵ → 곱 최대 10¹⁰, int 최대값 (~2·10⁹) 초과. 한 쪽을 long long 캐스팅하면 곱이 long long 으로 계산됨."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code (brute)", "🎯 4. 전체 코드 (brute)"),
      color: "#7c3aed",
      py: M3_FULL_PY, cpp: M3_FULL_CPP,
      why: [
        t(E, "All four parts wired together. Reads input, walks every j, tracks the best product.",
            "네 조각이 합쳐진 모습. 입력 읽고, 모든 j 훑고, 최고 곱 추적."),
        t(E, "Try it on the official sample first — small N, instant. Then think about big inputs.",
            "공식 샘플 먼저 시도 — N 작아서 즉시. 그 다음 큰 입력 생각."),
      ],
    },
    /* ── 5–7: appears AFTER the brute is written. Now we ask: what about big N? ── */
    {
      label: t(E, "5️⃣ What if N is big?", "5️⃣ N 이 크면 어떻게 될까?"),
      color: "#dc2626",
      // 같은 brute 코드를 다시 보여주고 — 이번엔 분석.
      py: M3_FULL_PY, cpp: M3_FULL_CPP,
      why: [
        t(E, "The inner two scans (left for i, right for k) walk the array — O(N) each, so per-j work is O(N).",
            "안쪽 두 스캔 (왼쪽으로 i, 오른쪽으로 k) 가 배열을 훑어요 — 각 O(N), j 마다 O(N) 일."),
        t(E, "Outer j loop runs O(N) times per query → O(N²) per query.",
            "바깥 j 루프가 쿼리당 O(N) 번 → 쿼리당 O(N²)."),
        t(E, "Q queries → total O(Q · N²). At N = 10⁵ and Q = 3·10⁴ that's ~3·10¹⁴ — way too slow.",
            "Q 쿼리 → 총 O(Q · N²). N = 10⁵, Q = 3·10⁴ 면 ~3·10¹⁴ — 너무 느려요."),
        t(E, "Inputs 2–3 (N, Q ≤ 50) still pass for partial credit. We'll fix the rest next.",
            "Inputs 2–3 (N, Q ≤ 50) 는 통과 → 부분점수. 나머지는 다음 단계에서."),
      ],
      aside: <M3PerfAside E={E} />,
    },
    {
      label: t(E, "6️⃣ Idea — the inner scans repeat the same answer", "6️⃣ 아이디어 — 안쪽 스캔이 같은 답 반복"),
      color: "#0891b2",
      py: M3_INSIGHT_PY, cpp: M3_INSIGHT_CPP,
      why: [
        t(E, "For a fixed character c, \"smallest i in [l, …] with s[i] ≠ c\" is the same answer for every j with s[j] = c. The inner left-scan is wasted work.",
            "고정된 문자 c 에 대해 \"[l, …] 에서 s[i] ≠ c 인 가장 작은 i\" 는 s[j] = c 인 모든 j 에서 같은 답. 안쪽 왼쪽 스캔이 중복."),
        t(E, "Same for the right scan: \"largest k in […, r] with s[k] = c\" only depends on c (and r), not on j.",
            "오른쪽 스캔도 마찬가지: \"[…, r] 에서 s[k] = c 인 가장 큰 k\" 는 c 와 r 에만 의존, j 와는 무관."),
        t(E, "Plan: precompute these answers ONCE per character. Then per j, both lookups are O(1) instead of O(N).",
            "계획: 문자마다 한 번씩만 미리 계산. 그러면 j 마다 두 lookup 이 O(N) → O(1)."),
      ],
      aside: <M3InsightAside E={E} />,
    },
    {
      label: t(E, "7️⃣ Final fast code — precomputed lookup tables", "7️⃣ 최종 빠른 코드 — 미리 계산한 lookup 표"),
      color: "#15803d",
      py: M3_FAST_PY, cpp: M3_FAST_CPP,
      why: [
        t(E, "first_diff[c][i] = smallest index ≥ i with s[idx] ≠ chr(c). Built per character with one right-to-left sweep.",
            "first_diff[c][i] = s[idx] ≠ chr(c) 인 가장 작은 idx ≥ i. 문자마다 오→왼 스윕 한 번."),
        t(E, "last_same[c][i] = largest index ≤ i with s[idx] == chr(c). Built with one left-to-right sweep.",
            "last_same[c][i] = s[idx] == chr(c) 인 가장 큰 idx ≤ i. 왼→오 스윕 한 번."),
        t(E, "Per query: walk j ∈ (l, r), pull i and k in O(1) each, update best. Per query O(N), total O(26·N + Q·N).",
            "쿼리당: j ∈ (l, r) 훑고, i 와 k 를 O(1) lookup, best 갱신. 쿼리당 O(N), 총 O(26·N + Q·N)."),
        t(E, "C++ comfortably fits the limit. Python is borderline at full N — submit with PyPy if available.",
            "C++ 는 풀 제약에서 여유. Python 은 빠듯 — 가능하면 PyPy 로 제출."),
      ],
      aside: <M3FastAside E={E} />,
    },
  ];
}

/* ── Asides for steps 5/6/7 ── */
const M3PerfAside = ({ E }) => (
  <div style={{
    background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#7f1d1d",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 800, color: "#991b1b", marginBottom: 6 }}>
      🐌 {t(E, "Operation count (brute O(Q · N²))", "연산량 (brute O(Q · N²))")}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px" }}>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N, Q ≤ 50</code>
      <div>{t(E, "1.25·10⁵ — instant ✓", "1.25·10⁵ — 즉시 ✓")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>Q=1, N=10⁵</code>
      <div>{t(E, "10¹⁰ — TLE 🚫", "10¹⁰ — TLE 🚫")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>full N, Q</code>
      <div>{t(E, "3·10¹⁴ — TLE 🚫", "3·10¹⁴ — TLE 🚫")}</div>
    </div>
  </div>
);

const M3InsightAside = ({ E }) => (
  <div style={{
    background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#065f46",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 800, color: "#065f46", marginBottom: 6 }}>
      💡 {t(E, "Same character → same answer", "같은 문자 → 같은 답")}
    </div>
    <div>
      {t(E,
        "If s[j] = 'b' for many j, all those j's ask the SAME left/right scan question. Compute once per character.",
        "여러 j 에서 s[j] = 'b' 이면, 그 j 들이 같은 왼/오 스캔 질문을 함. 문자마다 한 번만.")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #6ee7b7", fontSize: 11 }}>
      {t(E, "Per query work: O(N²) → O(N).", "쿼리당 일: O(N²) → O(N).")}
    </div>
  </div>
);

const M3FastAside = ({ E }) => (
  <div style={{
    background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#1e3a8a",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 800, color: "#1e40af", marginBottom: 6 }}>
      ✅ {t(E, "Two lookup tables", "lookup 표 2 개")}
    </div>
    <div style={{ marginBottom: 6 }}>
      <b>first_diff[c][i]</b>{" "}
      {t(E, "→ smallest idx ≥ i where s[idx] ≠ c.",
            "→ s[idx] ≠ c 인 가장 작은 idx ≥ i.")}
    </div>
    <div>
      <b>last_same[c][i]</b>{" "}
      {t(E, "→ largest idx ≤ i where s[idx] = c.",
            "→ s[idx] = c 인 가장 큰 idx ≤ i.")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #93c5fd", fontSize: 11 }}>
      {t(E, "Build once: O(26·N). Each query: O(N). Total: O(26·N + Q·N).",
            "한 번 만들기: O(26·N). 쿼리마다: O(N). 총: O(26·N + Q·N).")}
    </div>
  </div>
);

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
