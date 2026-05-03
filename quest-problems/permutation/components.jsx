import { useState, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#7c5cfc";

/* ═══════════════════════════════════════════════════════════════
   PermSim — 학생이 시작값을 골라 그리디 알고리즘을 한 단계씩 따라가는 위젯.
   - 6 가지 (start, h) 케이스 중 선택
   - 각 케이스: 시작값 → 매 i 마다 + 또는 - 시도 → 성공/실패 추적
   - 실패 시 어디서/왜 막혔는지 보여줌
   ═══════════════════════════════════════════════════════════════ */

// 기본 예시: N=4, h=[2,3,2]. start 별 결과:
//   1: 1→3→6(✗)→4→? 1+2=3 ok, 3+3=6 ✗, 3-3=0 ✗ → 실패
//   2: 2+2=4 ok, 4+3=7 ✗, 4-3=1 ok, 1+2=3 ok → [2,4,1,3] ✓
//   3: 3+2=5 ✗, 3-2=1 ok, 1+3=4 ok, 4+2=6 ✗, 4-2=2 ok → [3,1,4,2] ✓
//   4: 4+2=6 ✗, 4-2=2 ok, 2+3=5 ✗, 2-3=-1 ✗ → 실패
function simulateGreedy(N, h, start) {
  const perm = [start];
  const used = new Set([start]);
  const trace = [{ i: 0, perm: [...perm], used: new Set(used), tried: [], picked: start, ok: true }];
  for (let i = 0; i < N - 1; i++) {
    const cur = perm[i];
    const plus = cur + h[i];
    const minus = cur - h[i];
    const tryPlus  = { val: plus,  ok: plus  >= 1 && plus  <= N && !used.has(plus) };
    const tryMinus = { val: minus, ok: minus >= 1 && minus <= N && !used.has(minus) };
    let picked = null;
    if (tryPlus.ok)       picked = plus;
    else if (tryMinus.ok) picked = minus;
    if (picked === null) {
      trace.push({ i: i + 1, perm: [...perm], used: new Set(used), tried: [tryPlus, tryMinus], picked: null, ok: false });
      return { success: false, trace };
    }
    perm.push(picked);
    used.add(picked);
    trace.push({ i: i + 1, perm: [...perm], used: new Set(used), tried: [tryPlus, tryMinus], picked, ok: true });
  }
  return { success: true, trace };
}

export function PermSim({ E }) {
  const N = 4;
  const h = [2, 3, 2];
  const [start, setStart] = useState(3);
  const [si, setSi] = useState(0);

  const { success, trace } = simulateGreedy(N, h, start);
  const cur = Math.min(si, trace.length - 1);
  const step = trace[cur];

  const cellStyle = (filled, justPicked, conflict) => ({
    width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 8, fontSize: 16, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
    background: justPicked ? "#fef3c7" : (filled ? "#ede9fe" : "#fff"),
    border: `2px solid ${conflict ? "#dc2626" : (justPicked ? "#f59e0b" : (filled ? A : "#e5e7eb"))}`,
    color: conflict ? "#dc2626" : (justPicked ? "#92400e" : (filled ? A : "#cbd5e1")),
    transition: "all .2s",
  });

  return (
    <div style={{ padding: 14 }}>
      {/* start 선택 */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.dim, alignSelf: "center", marginRight: 4 }}>
          {t(E, "start =", "시작값 =")}
        </span>
        {[1, 2, 3, 4].map(s => {
          const r = simulateGreedy(N, h, s);
          return (
            <button key={s} onClick={() => { setStart(s); setSi(0); }} style={{
              padding: "5px 12px", borderRadius: 8, border: `2px solid ${s === start ? A : C.border}`,
              background: s === start ? A : "transparent", color: s === start ? "#fff" : C.dim,
              fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
            }}>
              {s} <span style={{ fontSize: 10, marginLeft: 2 }}>{r.success ? "✓" : "✗"}</span>
            </button>
          );
        })}
      </div>

      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 11, color: C.dim, textAlign: "center" }}>
        N = 4, h = [2, 3, 2]
      </div>

      {/* perm 배열 시각화 */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
        {Array.from({ length: N }).map((_, idx) => {
          const filled = idx < step.perm.length;
          const justPicked = idx === step.i && step.ok && step.picked !== null;
          return (
            <div key={idx} style={cellStyle(filled, justPicked, false)}>
              {filled ? step.perm[idx] : "?"}
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 10, color: C.dim, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>
        perm[]
      </div>

      {/* 시도 결과 */}
      {step.tried && step.tried.length > 0 && (
        <div style={{ background: step.ok ? "#f0fdf4" : "#fef2f2", border: `1.5px solid ${step.ok ? "#86efac" : "#fca5a5"}`, borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: step.ok ? "#16a34a" : "#dc2626", marginBottom: 6 }}>
            {t(E, `Step ${cur}: pick perm[${step.i}]`, `${cur}단계: perm[${step.i}] 결정`)}
          </div>
          <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.8 }}>
            <div>
              + {h[step.i - 1]} = <b>{step.tried[0].val}</b>{" "}
              <span style={{ color: step.tried[0].ok ? "#16a34a" : "#dc2626", fontWeight: 800 }}>
                {step.tried[0].ok ? "✓ ok" : (step.tried[0].val < 1 || step.tried[0].val > N ? `✗ out of range` : `✗ already used`)}
              </span>
            </div>
            <div>
              − {h[step.i - 1]} = <b>{step.tried[1].val}</b>{" "}
              <span style={{ color: step.tried[1].ok ? "#16a34a" : "#dc2626", fontWeight: 800 }}>
                {step.tried[1].ok ? "✓ ok" : (step.tried[1].val < 1 || step.tried[1].val > N ? `✗ out of range` : `✗ already used`)}
              </span>
            </div>
            <div style={{ marginTop: 4, fontWeight: 800, color: step.ok ? "#16a34a" : "#dc2626" }}>
              → {step.ok ? `${t(E, "pick", "선택")}: ${step.picked}` : t(E, "둘 다 안 됨 — start 실패!", "둘 다 안 됨 — start 실패!")}
            </div>
          </div>
        </div>
      )}
      {(!step.tried || step.tried.length === 0) && cur === 0 && (
        <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, color: "#92400e", textAlign: "center", fontWeight: 700 }}>
          {t(E, `Start = ${start}. Click → to step through the greedy.`, `시작값 = ${start}. → 눌러서 그리디를 한 단계씩 따라가봐.`)}
        </div>
      )}

      {/* 결과 박스 (마지막 단계) */}
      {cur === trace.length - 1 && (
        <div style={{
          background: success ? "#dcfce7" : "#fee2e2",
          border: `2px solid ${success ? "#16a34a" : "#dc2626"}`,
          borderRadius: 10, padding: "10px 12px", marginBottom: 10, textAlign: "center",
          fontSize: 13, fontWeight: 800, color: success ? "#15803d" : "#7f1d1d",
        }}>
          {success
            ? t(E, `✅ Success! perm = [${trace[trace.length-1].perm.join(", ")}]`, `✅ 성공! perm = [${trace[trace.length-1].perm.join(", ")}]`)
            : t(E, `❌ Start = ${start} fails. Try a different start!`, `❌ 시작값 = ${start} 실패. 다른 시작값 시도!`)}
        </div>
      )}

      {/* 네비 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setSi(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `2px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 800,
          color: cur === 0 ? "#b0b5c3" : A, cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
          {cur + 1} / {trace.length}
        </span>
        <button onClick={() => setSi(Math.min(trace.length - 1, cur + 1))} disabled={cur === trace.length - 1} style={{
          background: cur === trace.length - 1 ? "#e5e7eb" : A, border: `2px solid ${cur === trace.length - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 800,
          color: cur === trace.length - 1 ? "#b0b5c3" : "#fff", cursor: cur === trace.length - 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PermRunner — 학생이 직접 N + h 입력 → 모든 start 시도하며 라이브 진행
   ═══════════════════════════════════════════════════════════════ */
export function PermRunner({ E }) {
  const [nInput, setNInput] = useState("4");
  const [hInput, setHInput] = useState("2 3 2");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [liveStart, setLiveStart] = useState(0);
  const [liveStep, setLiveStep] = useState(0);
  const [livePerm, setLivePerm] = useState([]);
  const alive = useRef(false);
  const startTimeRef = useRef(0);

  const run = () => {
    const N = parseInt(nInput);
    const h = hInput.trim().split(/\s+/).map(Number);
    if (!N || N < 2 || N > 1000 || h.length !== N - 1 || h.some(x => isNaN(x) || x < 1 || x >= N)) {
      setResult({ error: t(E, "Invalid input. N ≥ 2, h has N-1 values, 1 ≤ h[i] < N.", "잘못된 입력. N ≥ 2, h 는 N-1 개, 1 ≤ h[i] < N.") });
      return;
    }
    setRunning(true); setResult(null);
    setLiveStart(1); setLiveStep(0); setLivePerm([1]);
    alive.current = true;
    startTimeRef.current = performance.now();

    let start = 1;
    const tryStart = () => {
      if (!alive.current) {
        setResult({ stopped: true, lastStart: start, elapsed: performance.now() - startTimeRef.current });
        setRunning(false);
        return;
      }
      if (start > N) {
        setResult({ found: false, elapsed: performance.now() - startTimeRef.current });
        setRunning(false);
        return;
      }
      const perm = [start];
      const used = new Set([start]);
      let valid = true;
      for (let i = 0; i < N - 1; i++) {
        const cur = perm[i];
        const plus = cur + h[i];
        const minus = cur - h[i];
        if (plus >= 1 && plus <= N && !used.has(plus)) { perm.push(plus); used.add(plus); }
        else if (minus >= 1 && minus <= N && !used.has(minus)) { perm.push(minus); used.add(minus); }
        else { valid = false; break; }
      }
      setLiveStart(start); setLiveStep(perm.length); setLivePerm(perm);
      if (valid) {
        setResult({ found: true, perm, start, elapsed: performance.now() - startTimeRef.current });
        setRunning(false);
        return;
      }
      start += 1;
      // delay so student can see progression — bigger delay for small N
      const delay = N <= 10 ? 250 : (N <= 100 ? 30 : 5);
      setTimeout(tryStart, delay);
    };
    setTimeout(tryStart, 100);
  };
  const stop = () => { alive.current = false; };

  const fmtTime = (ms) => ms < 1000 ? `${ms.toFixed(0)}ms` : `${(ms / 1000).toFixed(2)}s`;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8, marginBottom: 10 }}>
        <input value={nInput} onChange={e => setNInput(e.target.value)} disabled={running}
          placeholder="N" style={{
            padding: "8px 10px", borderRadius: 8, border: `2px solid ${C.border}`,
            fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
            color: A, textAlign: "center",
          }} />
        <input value={hInput} onChange={e => setHInput(e.target.value)} disabled={running}
          placeholder="h (space-separated)" style={{
            padding: "8px 10px", borderRadius: 8, border: `2px solid ${C.border}`,
            fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
            color: A,
          }} />
      </div>
      <button onClick={running ? stop : run} style={{
        width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
        fontSize: 14, fontWeight: 800, marginBottom: 10,
        background: running ? "#dc2626" : A, color: "#fff",
      }}>
        {running ? t(E, "⏹ Stop", "⏹ 중지") : t(E, "▶ Run greedy", "▶ 그리디 실행")}
      </button>

      {running && (
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: C.dim, fontWeight: 700, marginBottom: 4 }}>
            <span>{t(E, "trying", "시도")}: <span style={{ color: A, fontWeight: 900 }}>start = {liveStart}</span></span>
            <span>{t(E, "filled", "채움")}: <span style={{ color: A, fontWeight: 900 }}>{liveStep}</span></span>
          </div>
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {livePerm.map((v, i) => (
              <div key={i} style={{
                minWidth: 28, padding: "2px 6px", borderRadius: 5,
                background: "#ede9fe", border: `1.5px solid ${A}`, color: A,
                fontSize: 11, fontWeight: 800, textAlign: "center",
              }}>{v}</div>
            ))}
          </div>
        </div>
      )}

      {result && result.error && (
        <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px", color: "#7f1d1d", fontSize: 12, fontWeight: 700 }}>
          {result.error}
        </div>
      )}
      {result && result.found && (
        <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", marginBottom: 4 }}>
            {t(E, `✅ Found at start = ${result.start} (${fmtTime(result.elapsed)})`, `✅ 시작값 = ${result.start} 에서 성공 (${fmtTime(result.elapsed)})`)}
          </div>
          <div style={{ fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: A }}>
            perm = [{result.perm.join(", ")}]
          </div>
        </div>
      )}
      {result && result.found === false && !result.stopped && (
        <div style={{ background: "#fef2f2", border: "2px solid #dc2626", borderRadius: 10, padding: "10px 12px", color: "#7f1d1d", fontSize: 13, fontWeight: 700 }}>
          {t(E, `❌ No valid permutation. Output: -1 (${fmtTime(result.elapsed)})`, `❌ 유효한 순열 없음. 출력: -1 (${fmtTime(result.elapsed)})`)}
        </div>
      )}
      {result && result.stopped && (
        <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 12px", color: "#92400e", fontSize: 12, fontWeight: 700 }}>
          {t(E, `⏹ Stopped at start = ${result.lastStart} (${fmtTime(result.elapsed)})`, `⏹ 시작값 = ${result.lastStart} 에서 중지 (${fmtTime(result.elapsed)})`)}
        </div>
      )}

      {/* 복잡도 추정 */}
      <div style={{ marginTop: 12, background: "#f8fafc", borderRadius: 8, padding: "8px 10px", fontSize: 10, color: C.dim, lineHeight: 1.6 }}>
        <div style={{ fontWeight: 800, color: C.text, marginBottom: 4 }}>{t(E, "⏱ USACO Time Estimate", "⏱ USACO 시간 추정")}</div>
        <div>O(N²) per test case · C++ ≈ 10⁸ ops/sec</div>
        <div>N = 100 → ~0.1ms · N = 1,000 → ~10ms · N = 10,000 → ~1s · N = 100,000 → ~100s</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   getPermSections — 단계별 코드 + Python/C++ + reasoning
   ═══════════════════════════════════════════════════════════════ */

const PERM_INPUT_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
];
const PERM_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        int N; cin >> N;",
  "        vector<int> h(N - 1);",
  "        for (int i = 0; i < N - 1; i++) cin >> h[i];",
];

const PERM_TRY_PY = [
  "    found = False",
  "    perm = [0] * N",
  "",
  "    # 시작값 1, 2, ..., N 차례로 시도",
  "    for start in range(1, N + 1):",
  "        perm[0] = start",
  "        used = [False] * (N + 1)",
  "        used[start] = True",
  "        valid = True",
  "",
  "        # 매 단계: + 또는 - 중 가능한 거 선택",
  "        for i in range(N - 1):",
  "            plus = perm[i] + h[i]",
  "            minus = perm[i] - h[i]",
  "            if 1 <= plus <= N and not used[plus]:",
  "                perm[i+1] = plus",
  "                used[plus] = True",
  "            elif 1 <= minus <= N and not used[minus]:",
  "                perm[i+1] = minus",
  "                used[minus] = True",
  "            else:",
  "                valid = False",
  "                break",
  "",
  "        if valid:",
  "            found = True",
  "            break",
];
const PERM_TRY_CPP = [
  "        bool found = false;",
  "        vector<int> perm(N);",
  "",
  "        // 시작값 1, 2, ..., N 차례로 시도",
  "        for (int start = 1; start <= N && !found; start++) {",
  "            perm[0] = start;",
  "            vector<bool> used(N + 1, false);",
  "            used[start] = true;",
  "            bool valid = true;",
  "",
  "            // 매 단계: + 또는 - 중 가능한 거 선택",
  "            for (int i = 0; i < N - 1; i++) {",
  "                int plus = perm[i] + h[i];",
  "                int minus = perm[i] - h[i];",
  "                if (plus >= 1 && plus <= N && !used[plus]) {",
  "                    perm[i+1] = plus;",
  "                    used[plus] = true;",
  "                } else if (minus >= 1 && minus <= N && !used[minus]) {",
  "                    perm[i+1] = minus;",
  "                    used[minus] = true;",
  "                } else {",
  "                    valid = false;",
  "                    break;",
  "                }",
  "            }",
  "",
  "            if (valid) found = true;",
  "        }",
];

const PERM_OUTPUT_PY = [
  "    if found:",
  "        print(' '.join(map(str, perm)))",
  "    else:",
  "        print(-1)",
];
const PERM_OUTPUT_CPP = [
  "        if (found) {",
  "            for (int i = 0; i < N; i++) cout << perm[i] << \" \\n\"[i == N-1];",
  "        } else {",
  "            cout << -1 << \"\\n\";",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

const PERM_FULL_PY = [...PERM_INPUT_PY, "", ...PERM_TRY_PY, "", ...PERM_OUTPUT_PY];
const PERM_FULL_CPP = [...PERM_INPUT_CPP, "", ...PERM_TRY_CPP, "", ...PERM_OUTPUT_CPP];

export function getPermSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: A,
      py: PERM_INPUT_PY, cpp: PERM_INPUT_CPP,
      why: [
        t(E, "T test cases. Each: N, then N-1 hints h[0]..h[N-2].", "T 테스트케이스. 각: N, 그 다음 N-1 개 힌트 h[0]..h[N-2]."),
        t(E, "h[i] = |perm[i] - perm[i+1]| — absolute difference.", "h[i] = |perm[i] - perm[i+1]| — 절댓값 차이."),
      ],
      pyOnly: [
        t(E, "list(map(int, ...)) for parsing space-separated ints.", "list(map(int, ...)) 으로 공백 구분 정수 파싱."),
        t(E, "sys.stdin.readline for fast input.", "sys.stdin.readline 으로 빠른 입력."),
      ],
      cppOnly: [
        t(E, "vector<int> h(N-1) — exactly N-1 hints.", "vector<int> h(N-1) — 정확히 N-1 개 힌트."),
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) for fast I/O.", "ios::sync_with_stdio(false) + cin.tie(nullptr) 로 Fast I/O."),
      ],
    },
    {
      label: t(E, "🔍 2. Try Each Start (Greedy)", "🔍 2. 시작값 차례로 시도 (탐욕)"),
      color: "#16a34a",
      py: PERM_TRY_PY, cpp: PERM_TRY_CPP,
      why: [
        t(E, "Try each start = 1, 2, ..., N. For each: greedily build permutation.", "시작값 = 1, 2, ..., N 시도. 각각 탐욕적으로 순열 구성."),
        t(E, "At each step: perm[i+1] is perm[i]+h[i] OR perm[i]-h[i]. Try + first, fall back to -.", "각 단계: perm[i+1] = perm[i]+h[i] 또는 perm[i]-h[i]. + 먼저 시도, 안 되면 -."),
        t(E, "Validity: 1 ≤ value ≤ N AND not already used.", "유효성: 1 ≤ 값 ≤ N AND 미사용."),
        t(E, "Greedy works because at each step, AT MOST ONE valid choice exists (proof: the other choice would conflict with an earlier value).", "탐욕이 성립: 각 단계에서 유효한 선택은 최대 1 개 (증명: 다른 선택은 이전 값과 충돌)."),
        t(E, "If both fail at some step → this start doesn't work. Move to next start.", "두 옵션 다 실패 → 이 시작값 안 됨. 다음 시작값으로."),
      ],
      pyOnly: [
        t(E, "used = [False] * (N + 1) — index 0 unused, indexes 1..N for tracking.", "used = [False] * (N + 1) — 인덱스 0 미사용, 1..N 추적."),
      ],
      cppOnly: [
        t(E, "vector<bool>(N+1, false) — same idea, packed bools save memory.", "vector<bool>(N+1, false) — 같은 아이디어, packed bool 로 메모리 절약."),
      ],
    },
    {
      label: t(E, "📤 3. Output", "📤 3. 출력"),
      color: A,
      py: PERM_OUTPUT_PY, cpp: PERM_OUTPUT_CPP,
      why: [
        t(E, "If a valid permutation found → print space-separated.", "유효한 순열 찾음 → 공백 구분 출력."),
        t(E, "Otherwise (all N starts failed) → print -1.", "아니면 (N 개 시작 다 실패) → -1 출력."),
      ],
      pyOnly: [
        t(E, "' '.join(map(str, perm)) — convert ints to strings, join with space.", "' '.join(map(str, perm)) — int 를 str 로 변환 후 공백 join."),
      ],
      cppOnly: [
        t(E, "Trick: \" \\n\"[i == N-1] gives space normally, newline at end.", "트릭: \" \\n\"[i == N-1] 으로 일반은 공백, 마지막은 줄바꿈."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: A,
      py: PERM_FULL_PY, cpp: PERM_FULL_CPP,
      why: [
        t(E, "Time: O(N²) per test case (N starts × N steps each).", "시간: 테스트 케이스당 O(N²) (N 시작 × N 단계)."),
        t(E, "For N=1000: 10⁶ ops per test case. Plenty fast.", "N=1000: 테스트 케이스당 10⁶ 연산. 충분히 빠름."),
        t(E, "Edge case: h[i] = 0 → permutation needs perm[i] = perm[i+1] but values must be distinct → IMPOSSIBLE → -1.", "엣지: h[i] = 0 → perm[i] = perm[i+1] 필요한데 순열 값은 다 달라야 → 불가능 → -1."),
      ],
    },
  ];
}


/* ProgressiveCode — vertical stack pattern */
export function PermProgressiveCode({ E, lang = "py", sections }) {
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
        {t(E, `Showing ${langLabel} (change via header dropdown ↑)`, `${langLabel} 표시 중 (위 헤더 dropdown 으로 변경)`)}
      </div>
      {sections.map((s, i) => {
        const code = lang === "py" ? s.py : s.cpp;
        const langSpecific = lang === "py" ? (s.pyOnly || []) : (s.cppOnly || []);
        return (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{ background: s.color, color: "#fff", padding: "8px 14px", borderRadius: "10px 10px 0 0", fontSize: 14, fontWeight: 800 }}>{s.label}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderTop: "none", padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>
                💡 {t(E, "Why this way?", "왜 이렇게?")}
              </div>
              {s.why.map((line, j) => (
                <div key={`w${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}>•</span>
                  <span>{line}</span>
                </div>
              ))}
              {langSpecific.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.dim, fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>
                    {langLabel} {t(E, "specific:", "전용:")}
                  </div>
                  {langSpecific.map((line, j) => (
                    <div key={`l${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: lang === "py" ? "#16a34a" : "#0891b2", fontWeight: 800, flexShrink: 0 }}>▸</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
              <CodeBlock lines={code} />
            </div>
          </div>
        );
      })}
    </div>
  );
}


/* PDF — comprehensive study guide */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","join"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min"];

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

export function downloadPermPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "FJ's Fav Permutation — Full Study Guide", "🔢 FJ의 좋아하는 순열 — 종합 풀이 노트");
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
  table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  th, td { border: 1px solid #e5e7eb; padding: 5px 8px; text-align: left; }
  th { background: #ede9fe; color: #5b21b6; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #ede9fe; border: 1.5px solid #c4b5fd; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  .box.ok { background: #ecfdf5; border-color: #6ee7b7; }
  .box.no { background: #fef2f2; border-color: #fca5a5; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>

<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF' as the destination.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>

<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2024 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>

<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "Given an array of N-1 hints h[0]..h[N-2], where h[i] = |perm[i] - perm[i+1]|, reconstruct a permutation of 1..N matching the hints. If impossible, output -1.",
  "N-1 개의 힌트 h[0]..h[N-2] 가 주어짐. h[i] = |perm[i] - perm[i+1]|. 힌트와 일치하는 1..N 순열 복원. 불가능하면 -1 출력.")}</p>

<h3>${t(E, "Constraints", "제약")}</h3>
<p>1 ≤ T ≤ 10, 2 ≤ N ≤ 1000, 0 ≤ h[i] ≤ N-1.</p>

<h3>${t(E, "Sample I/O", "예제")}</h3>
<table>
  <tr><th>${t(E, "Input", "입력")}</th><th>${t(E, "Output", "출력")}</th></tr>
  <tr><td><pre style="margin:0;background:#0f172a;color:#f8fafc;font-size:11px;">3
4
2 3 2
3
1 1
3
0 1</pre></td><td><pre style="margin:0;background:#0f172a;color:#f8fafc;font-size:11px;">3 1 4 2
1 2 3
-1</pre></td></tr>
</table>

<h2>2. ${t(E, "First Idea: Greedy", "첫 아이디어: 탐욕")}</h2>
<div class="box ok">
  <b>💡 ${t(E, "Key insight", "핵심 통찰")}</b>:
  ${t(E, "If we know perm[0], the rest is forced — at each step, ONE of (perm[i]+h[i], perm[i]-h[i]) will be valid (in range 1..N AND not yet used).",
        "perm[0] 만 정하면 나머지는 강제 — 각 단계에서 (perm[i]+h[i], perm[i]-h[i]) 중 하나만 유효 (1..N 범위 + 미사용).")}
</div>
<p>${t(E,
  "So: try start = 1, 2, ..., N. For each, greedily build. If one works, output it.",
  "그래서: 시작값 1~N 차례로 시도. 각각 탐욕적으로 구성. 하나 성공하면 출력.")}</p>

<div class="box">
  <b>${t(E, "Time complexity", "시간복잡도")}:</b>
  ${t(E, "O(N²) per test case (N starts × N steps). For N=1000, T=10: 10⁷ ops total. Fast.",
        "테스트 케이스당 O(N²) (N 시작 × N 단계). N=1000, T=10: 10⁷ 연산. 빠름.")}
</div>

<h3>${t(E, "Edge case: h[i] = 0", "엣지: h[i] = 0")}</h3>
<p>${t(E, "h[i] = 0 means |perm[i] - perm[i+1]| = 0, so perm[i] = perm[i+1]. But permutation values are distinct. → IMPOSSIBLE → -1.",
        "h[i] = 0 이면 |perm[i] - perm[i+1]| = 0, 즉 perm[i] = perm[i+1]. 그러나 순열은 모든 값이 다름. → 불가능 → -1.")}</p>

<h2>3. ${t(E, "Solution Code (3 sections + full)", "최적 코드 (3 섹션 + 전체)")}</h2>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why">
    <b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b>
    <ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
  </div>
  ${sectionCode(s)}
`).join("")}

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">
  © Coderin · 코드린 · ${t(E, "Generated for offline study", "오프라인 학습용")}
</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
