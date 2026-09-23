// 🔒 USACO_VERIFIED (2026-05-13, rewritten 2026-09-23 — pending resubmission)
//   Old: Python 8/14, C++ 8/22 — both TLE, O(N*Q) brute (rebuild+re-evaluate
//   per query). Real constraints: N,Q < 2*10^5 (checked against the official
//   USACO problem page), so O(N*Q) is up to 4*10^10 ops — far too slow.
//   Rewritten to O(N+Q): one forward pass + one backward pass precompute
//   the AND-chain / OR-so-far state around every token, then each query is
//   answered in O(1). Verified: 300 brute-force cross-checks (0 mismatches),
//   both official samples match, N=Q=2*10^5 runs in ~0.4s py / ~0.8s cpp.
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState, useRef, useEffect } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#0284c7";

/* ═══════════════════════════════════════════════════════════════
   LogicalMoosSim — boolean expression evaluator with grouping
   ═══════════════════════════════════════════════════════════════ */
const _LM_PRESETS = [
  ["true", "and", "false", "or", "true"],
  ["true", "or", "false", "and", "false"],
  ["false", "and", "true", "and", "true", "or", "false"],
  ["true", "or", "true", "and", "false", "or", "false", "and", "true"],
];

function _evaluate(tokens) {
  let result = false;
  let group = (tokens[0] === "true");
  const groups = [group];
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const v = (tokens[i+1] === "true");
    if (op === "and") {
      group = group && v;
      groups[groups.length - 1] = group;
    } else {
      result = result || group;
      group = v;
      groups.push(group);
    }
  }
  return { result: result || group, groups };
}

export function LogicalMoosSim({ E }) {
  const [pi, setPi] = useState(0);
  const tokens = _LM_PRESETS[pi];
  const { result, groups } = _evaluate(tokens);

  // ── Query-replacement state (the actual problem operation) ──
  // Valid positions for l, r are odd-indexed in 1-based numbering → 0,2,4,... in 0-based.
  const valuePositions = tokens.map((_, idx) => idx).filter(idx => idx % 2 === 0);
  const [lIdxPos, setLIdxPos] = useState(0); // index into valuePositions
  const [rIdxPos, setRIdxPos] = useState(0);
  const [target, setTarget] = useState(true);

  // Reset slice when preset changes (so we don't index past shorter presets)
  useEffect(() => { setLIdxPos(0); setRIdxPos(0); }, [pi]);

  // Clamp when preset changes
  const safeL = Math.min(lIdxPos, valuePositions.length - 1);
  const safeR = Math.max(safeL, Math.min(rIdxPos, valuePositions.length - 1));
  const l = valuePositions[safeL];
  const r = valuePositions[safeR];

  // Build replaced token lists for both rep choices
  const _replace = (rep) => {
    const out = [];
    for (let i = 0; i < l; i++) out.push(tokens[i]);
    out.push(rep);
    for (let i = r + 1; i < tokens.length; i++) out.push(tokens[i]);
    // Need to also keep the operators that bracket the replaced slice — already in 'before' (ends at op before l) and 'after' (starts at op after r) since l, r are even (value positions). The code above is correct.
    return out;
  };
  const tryTrue = _evaluate(_replace("true")).result;
  const tryFalse = _evaluate(_replace("false")).result;
  const verdict = (tryTrue === target) || (tryFalse === target);

  // For visualization: highlight AND-chains
  let chainIdx = 0;
  const tokenChainMap = [chainIdx];
  for (let i = 1; i < tokens.length; i += 2) {
    if (tokens[i] === "or") chainIdx++;
    tokenChainMap.push(chainIdx);   // op token
    tokenChainMap.push(chainIdx);   // value token
  }
  const chainColors = ["#dbeafe", "#dcfce7", "#fef3c7", "#fee2e2", "#ede9fe"];
  const chainBorders = ["#3b82f6", "#16a34a", "#f59e0b", "#dc2626", "#8b5cf6"];

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_LM_PRESETS.map((p, i) => (
          <button key={i} onClick={() => setPi(i)} style={{
            padding: "4px 8px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>case {i+1}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {tokens.map((tok, i) => {
          const cIdx = tokenChainMap[i] % chainColors.length;
          return (
            <div key={i} style={{
              padding: "6px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
              background: chainColors[cIdx], border: `1px solid ${chainBorders[cIdx]}`, color: chainBorders[cIdx],
            }}>{tok}</div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 10, color: C.dim, marginBottom: 10 }}>
        {t(E, "Same color = same AND-chain (broken by OR)", "같은 색은 같은 AND 묶음이에요 (OR 를 만나면 끊겨요)")}
      </div>

      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.7 }}>
        {t(E, "AND-chain results:", "AND 묶음 결과:")}
        <div style={{ marginTop: 4 }}>
          [{groups.map(g => g ? "T" : "F").join(", ")}]
        </div>
        <div style={{ marginTop: 4 }}>
          OR all → <b style={{ color: result ? "#16a34a" : "#dc2626" }}>{result ? "true" : "false"}</b>
        </div>
      </div>

      <div style={{ background: result ? "#dcfce7" : "#fef2f2", border: `1px solid ${result ? "#16a34a" : "#dc2626"}`, borderRadius: 10, padding: "10px 12px", color: result ? "#15803d" : "#7f1d1d", fontSize: 14, fontWeight: 700, textAlign: "center" }}>
        ✅ result = {result ? "TRUE" : "FALSE"}
      </div>

      {/* ────────────── Query replacement panel ────────────── */}
      <div style={{ marginTop: 16, padding: 12, background: "#fff", border: `2px dashed ${A}`, borderRadius: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: A, marginBottom: 8, textAlign: "center" }}>
          🎯 {t(E, "Now try a query — pick l, r, target → see if Y/N", "이제 물음을 만들어 봐요 — l, r, target 을 고르면 Y/N 이 보여요")}
        </div>

        {/* l, r sliders (1-based labels for student) */}
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 30px", gap: 8, alignItems: "center", marginBottom: 6, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>
          <div style={{ color: C.dim, fontWeight: 700 }}>l =</div>
          <input
            type="range" min={0} max={valuePositions.length - 1} value={safeL}
            onChange={e => { const v = +e.target.value; setLIdxPos(v); if (v > safeR) setRIdxPos(v); }}
            style={{ width: "100%", accentColor: A }}
          />
          <div style={{ color: A, fontWeight: 800, textAlign: "right" }}>{l + 1}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 30px", gap: 8, alignItems: "center", marginBottom: 8, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>
          <div style={{ color: C.dim, fontWeight: 700 }}>r =</div>
          <input
            type="range" min={safeL} max={valuePositions.length - 1} value={safeR}
            onChange={e => setRIdxPos(+e.target.value)}
            style={{ width: "100%", accentColor: A }}
          />
          <div style={{ color: A, fontWeight: 800, textAlign: "right" }}>{r + 1}</div>
        </div>

        {/* target toggle */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: C.dim, alignSelf: "center", fontFamily: "'JetBrains Mono',monospace" }}>target =</span>
          {[true, false].map(v => (
            <button key={String(v)} onClick={() => setTarget(v)} style={{
              padding: "3px 10px", borderRadius: 6, border: `1px solid ${target === v ? A : C.border}`,
              background: target === v ? A : "transparent", color: target === v ? "#fff" : C.dim,
              fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
            }}>{v ? "true" : "false"}</button>
          ))}
        </div>

        {/* Visual: tokens with l..r slice highlighted */}
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
          {tokens.map((tok, i) => {
            const inSlice = i >= l && i <= r;
            return (
              <div key={i} style={{
                padding: "5px 8px", borderRadius: 5, fontSize: 11, fontWeight: 600,
                fontFamily: "'JetBrains Mono',monospace",
                background: inSlice ? "#fde68a" : "#f1f5f9",
                border: `1px solid ${inSlice ? "#d97706" : C.border}`,
                color: inSlice ? "#92400e" : C.dim,
              }}>{tok}</div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", fontSize: 10, color: C.dim, marginBottom: 10 }}>
          {t(E, "Yellow = slice replaced by ONE boolean", "노란 칸은 참/거짓 하나로 바뀔 구간이에요")}
        </div>

        {/* Two replacement attempts side-by-side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
          {[
            { rep: "true", res: tryTrue },
            { rep: "false", res: tryFalse },
          ].map(({ rep, res }) => {
            const hit = res === target;
            return (
              <div key={rep} style={{
                background: hit ? "#dcfce7" : "#f8fafc",
                border: `1.5px solid ${hit ? "#16a34a" : C.border}`,
                borderRadius: 8, padding: "8px 10px",
                fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
              }}>
                <div style={{ color: C.dim, marginBottom: 3 }}>
                  {t(E, "rep = ", "교체값 = ")}<b style={{ color: A }}>{rep}</b>
                </div>
                <div style={{ color: hit ? "#15803d" : C.text }}>
                  → eval = <b>{res ? "true" : "false"}</b> {hit ? "✓" : ""}
                </div>
              </div>
            );
          })}
        </div>

        {/* Verdict */}
        <div style={{
          background: verdict ? "#16a34a" : "#dc2626", color: "#fff",
          borderRadius: 8, padding: "8px 12px", textAlign: "center",
          fontSize: 14, fontWeight: 800, letterSpacing: 1,
        }}>
          {verdict ? "Y" : "N"} — {verdict
            ? t(E, "some replacement matches target", "교체값 하나가 target 과 같아요")
            : t(E, "neither replacement matches target", "두 교체값 모두 target 과 달라요")}
        </div>
      </div>
    </div>
  );
}

export function LogicalMoosRunner() { return null; }

/* Section 1: Read N, Q + words */
const LM_INPUT_PY = [
  "N, Q = map(int, input().split())",
  "words = input().split()   # ['true','and','false','or',...]",
];
const LM_INPUT_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    vector<string> words(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> words[i];",
  "    }",
];

/* Section 2: forward + backward chain-state precompute (and binds tighter than or) */
const LM_EVAL_PY = [
  "# pre_and[i] = AND of the open chain up to (not incl.) token i",
  "# pre_or[i]  = OR of every chain that already closed before token i's chain",
  "pre_and = [True] * N",
  "pre_or = [False] * N",
  "result = False",
  "group = (words[0] == 'true')",
  "i = 1",
  "while i < N:",
  "    op = words[i]",
  "    val = (words[i + 1] == 'true')",
  "    if op == 'and':",
  "        pre_and[i + 1] = group",
  "        pre_or[i + 1] = result",
  "        group = group and val",
  "    else:",
  "        result = result or group",
  "        pre_and[i + 1] = True",
  "        pre_or[i + 1] = result",
  "        group = val",
  "    i += 2",
  "",
  "# Mirror pass, scanning from the right — suf_and / suf_or work the same",
  "# way but describe the chain continuing AFTER each token.",
  "suf_and = [True] * N",
  "suf_or = [False] * N",
  "result2 = False",
  "group2 = (words[N - 1] == 'true')",
  "i = N - 2",
  "while i >= 0:",
  "    op = words[i]",
  "    val = (words[i - 1] == 'true')",
  "    if op == 'and':",
  "        suf_and[i - 1] = group2",
  "        suf_or[i - 1] = result2",
  "        group2 = val and group2",
  "    else:",
  "        result2 = result2 or group2",
  "        suf_and[i - 1] = True",
  "        suf_or[i - 1] = result2",
  "        group2 = val",
  "    i -= 2",
];
const LM_EVAL_CPP = [
  "    vector<bool> preAnd(N, true);",
  "    vector<bool> preOr(N, false);",
  "    bool result = false;",
  "    bool group = (words[0] == \"true\");",
  "    for (int i = 1; i < N; i += 2) {",
  "        string op = words[i];",
  "        bool val = (words[i + 1] == \"true\");",
  "        if (op == \"and\") {",
  "            preAnd[i + 1] = group;",
  "            preOr[i + 1] = result;",
  "            group = group && val;",
  "        } else {",
  "            result = result || group;",
  "            preAnd[i + 1] = true;",
  "            preOr[i + 1] = result;",
  "            group = val;",
  "        }",
  "    }",
  "",
  "    // Mirror pass, scanning from the right.",
  "    vector<bool> sufAnd(N, true);",
  "    vector<bool> sufOr(N, false);",
  "    bool result2 = false;",
  "    bool group2 = (words[N - 1] == \"true\");",
  "    for (int i = N - 2; i >= 0; i -= 2) {",
  "        string op = words[i];",
  "        bool val = (words[i - 1] == \"true\");",
  "        if (op == \"and\") {",
  "            sufAnd[i - 1] = group2;",
  "            sufOr[i - 1] = result2;",
  "            group2 = val && group2;",
  "        } else {",
  "            result2 = result2 || group2;",
  "            sufAnd[i - 1] = true;",
  "            sufOr[i - 1] = result2;",
  "            group2 = val;",
  "        }",
  "    }",
];

/* Section 3: answer each query in O(1) using the precomputed chain state */
const LM_QUERY_PY = [
  "out = []",
  "for _ in range(Q):",
  "    parts = input().split()",
  "    l, r = int(parts[0]) - 1, int(parts[1]) - 1",
  "    target = (parts[2] == 'true')",
  "",
  "    ok = False",
  "    for rep in (True, False):",
  "        # chain_val = the AND-chain that l and r sit in, once replaced",
  "        chain_val = pre_and[l] and rep and suf_and[r]",
  "        overall = pre_or[l] or chain_val or suf_or[r]",
  "        if overall == target:",
  "            ok = True",
  "            break",
  "    if ok:",
  "        out.append('Y')",
  "    else:",
  "        out.append('N')",
  "",
  "print(''.join(out))",
];
const LM_QUERY_CPP = [
  "    string out;",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        string tgt;",
  "        cin >> l >> r >> tgt;",
  "        l--;",
  "        r--;",
  "        bool target = (tgt == \"true\");",
  "",
  "        bool ok = false;",
  "        bool reps[2] = {true, false};",
  "        for (int k = 0; k < 2; k++) {",
  "            bool rep = reps[k];",
  "            bool chainVal = preAnd[l] && rep && sufAnd[r];",
  "            bool overall = preOr[l] || chainVal || sufOr[r];",
  "            if (overall == target) {",
  "                ok = true;",
  "                break;",
  "            }",
  "        }",
  "        char ch;",
  "        if (ok) {",
  "            ch = 'Y';",
  "        } else {",
  "            ch = 'N';",
  "        }",
  "        out += ch;",
  "    }",
  "    cout << out << endl;",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const LM_FULL_PY = [
  "N, Q = map(int, input().split())",
  "words = input().split()",
  "",
  "pre_and = [True] * N",
  "pre_or = [False] * N",
  "result = False",
  "group = (words[0] == 'true')",
  "i = 1",
  "while i < N:",
  "    op = words[i]",
  "    val = (words[i + 1] == 'true')",
  "    if op == 'and':",
  "        pre_and[i + 1] = group",
  "        pre_or[i + 1] = result",
  "        group = group and val",
  "    else:",
  "        result = result or group",
  "        pre_and[i + 1] = True",
  "        pre_or[i + 1] = result",
  "        group = val",
  "    i += 2",
  "",
  "suf_and = [True] * N",
  "suf_or = [False] * N",
  "result2 = False",
  "group2 = (words[N - 1] == 'true')",
  "i = N - 2",
  "while i >= 0:",
  "    op = words[i]",
  "    val = (words[i - 1] == 'true')",
  "    if op == 'and':",
  "        suf_and[i - 1] = group2",
  "        suf_or[i - 1] = result2",
  "        group2 = val and group2",
  "    else:",
  "        result2 = result2 or group2",
  "        suf_and[i - 1] = True",
  "        suf_or[i - 1] = result2",
  "        group2 = val",
  "    i -= 2",
  "",
  "out = []",
  "for _ in range(Q):",
  "    parts = input().split()",
  "    l = int(parts[0]) - 1",
  "    r = int(parts[1]) - 1",
  "    target = (parts[2] == 'true')",
  "    ok = False",
  "    for rep in (True, False):",
  "        chain_val = pre_and[l] and rep and suf_and[r]",
  "        overall = pre_or[l] or chain_val or suf_or[r]",
  "        if overall == target:",
  "            ok = True",
  "            break",
  "    if ok:",
  "        out.append('Y')",
  "    else:",
  "        out.append('N')",
  "print(''.join(out))",
];
const LM_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    vector<string> words(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> words[i];",
  "    }",
  "",
  "    vector<bool> preAnd(N, true);",
  "    vector<bool> preOr(N, false);",
  "    bool result = false;",
  "    bool group = (words[0] == \"true\");",
  "    for (int i = 1; i < N; i += 2) {",
  "        string op = words[i];",
  "        bool val = (words[i + 1] == \"true\");",
  "        if (op == \"and\") {",
  "            preAnd[i + 1] = group;",
  "            preOr[i + 1] = result;",
  "            group = group && val;",
  "        } else {",
  "            result = result || group;",
  "            preAnd[i + 1] = true;",
  "            preOr[i + 1] = result;",
  "            group = val;",
  "        }",
  "    }",
  "",
  "    vector<bool> sufAnd(N, true);",
  "    vector<bool> sufOr(N, false);",
  "    bool result2 = false;",
  "    bool group2 = (words[N - 1] == \"true\");",
  "    for (int i = N - 2; i >= 0; i -= 2) {",
  "        string op = words[i];",
  "        bool val = (words[i - 1] == \"true\");",
  "        if (op == \"and\") {",
  "            sufAnd[i - 1] = group2;",
  "            sufOr[i - 1] = result2;",
  "            group2 = val && group2;",
  "        } else {",
  "            result2 = result2 || group2;",
  "            sufAnd[i - 1] = true;",
  "            sufOr[i - 1] = result2;",
  "            group2 = val;",
  "        }",
  "    }",
  "",
  "    string out;",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        string tgt;",
  "        cin >> l >> r >> tgt;",
  "        l--;",
  "        r--;",
  "        bool target = (tgt == \"true\");",
  "        bool ok = false;",
  "        bool reps[2] = {true, false};",
  "        for (int k = 0; k < 2; k++) {",
  "            bool rep = reps[k];",
  "            bool chainVal = preAnd[l] && rep && sufAnd[r];",
  "            bool overall = preOr[l] || chainVal || sufOr[r];",
  "            if (overall == target) {",
  "                ok = true;",
  "                break;",
  "            }",
  "        }",
  "        char ch;",
  "        if (ok) {",
  "            ch = 'Y';",
  "        } else {",
  "            ch = 'N';",
  "        }",
  "        out += ch;",
  "    }",
  "    cout << out << endl;",
  "    return 0;",
  "}",
];

export function getLogicalMoosSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Words", "📦 1. 입력 받고 낱말 모으기"),
      color: A,
      py: LM_INPUT_PY, cpp: LM_INPUT_CPP,
      why: [
        t(E, "Read N tokens — they alternate value, op, value, op, ... (so length N is odd).",
            "낱말 N 개를 읽어요. 값, and/or, 값, ... 이 번갈아 나와요 (그래서 N 은 홀수예요)."),
      ],
      pyOnly: [
        t(E, "input().split() splits on whitespace into a list of strings.",
            "input().split() 이 띄어쓰기로 잘라서 낱말 목록을 만들어요."),
      ],
      cppOnly: [
        t(E, "vector<string> reads each token with cin >> word.",
            "vector<string> 에 cin >> word 로 낱말을 하나씩 읽어요."),
      ],
    },
    {
      label: t(E, "🧮 2. Precompute Chain State (forward + backward)", "🧮 2. 앞뒤로 훑어 묶음 값 미리 구하기"),
      color: "#0891b2",
      py: LM_EVAL_PY, cpp: LM_EVAL_CPP,
      why: [
        t(E, "Walk left-to-right. 'result' = OR of chains already closed; 'group' = AND-so-far of the open chain. Save both BEFORE each token — that's the state we'd need if this token started a replacement.",
            "왼쪽에서 오른쪽으로 가요. result 는 이미 끝난 묶음들의 OR 값, group 은 지금 묶음의 AND 값이에요. 이 값을 각 낱말을 보기 '전'에 저장해 둬요 — 그 낱말부터 바꾼다면 필요한 상태거든요."),
        t(E, "Then mirror the same idea scanning right-to-left, so we also know the state right AFTER each token.",
            "같은 방식을 오른쪽에서 왼쪽으로도 반복해서, 각 낱말 '다음'의 상태도 구해 둬요."),
      ],
      pyOnly: [
        t(E, "Four plain lists (pre_and, pre_or, suf_and, suf_or) hold all the state.",
            "리스트 네 개(pre_and, pre_or, suf_and, suf_or)에 상태를 담아요."),
      ],
      cppOnly: [
        t(E, "vector<bool> works the same way, just with true/false and &&/||.",
            "vector<bool> 로 똑같이 담고, true/false 와 &&/|| 를 써요."),
      ],
    },
    {
      label: t(E, "❓ 3. Answer Each Query in O(1)", "❓ 3. 물음마다 즉시 답하기"),
      color: "#16a34a",
      py: LM_QUERY_PY, cpp: LM_QUERY_CPP,
      why: [
        t(E, "l and r sit inside one AND-chain. pre_and[l] AND the replacement AND suf_and[r] gives that chain's new value — no rebuilding needed.",
            "l 과 r 은 같은 AND 묶음 안에 있어요. pre_and[l] 과 교체값과 suf_and[r] 을 AND 하면 그 묶음의 새 값이 바로 나와요 — 다시 만들 필요가 없어요."),
        t(E, "OR that with whatever already closed before (pre_or[l]) and after (suf_or[r]) to get the whole expression's value.",
            "그 값을 앞에서 끝난 묶음(pre_or[l]), 뒤에서 끝난 묶음(suf_or[r]) 과 OR 하면 전체 식의 값이에요."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: LM_FULL_PY, cpp: LM_FULL_CPP,
      why: [
        t(E, "Two passes (O(N)) precompute everything once. Every query then costs O(1) — no per-query rebuilding at all.",
            "두 번의 훑기(O(N))로 모든 걸 미리 구해요. 그 다음 물음은 하나하나 O(1) 이에요 — 다시 만드는 과정이 없어요."),
        t(E, "Total time: O(N + Q), fast enough even at N, Q up to 2·10⁵.",
            "전체 계산량은 O(N + Q) 예요. N, Q 가 2·10⁵ 이어도 충분히 빨라요."),
      ],
    },
  ];
}

export function LogicalMoosProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#0284c7" />;
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

export function downloadLogicalMoosPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Logical Moos — Full Study Guide", "🧠 Logical Moos — 종합 풀이 노트");
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 고르세요.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2024 Open Bronze · ${t(E, "Self-contained walkthrough", "혼자 공부용")}</div>
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
