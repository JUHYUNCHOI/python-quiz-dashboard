// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 0/1 (WA on sample - wrong algorithm (Silver-level problem))
//   C++:    0/1 (WA on sample - wrong algorithm for Silver)
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState, useRef } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ═══════════════════════════════════════════════════════════════
   InterviewSim — counters as cells, cows assigned one by one
   ═══════════════════════════════════════════════════════════════ */
function _simulate(N, K, times) {
  const counters = Array.from({ length: K }, () => 0);
  const trace = [];
  for (let i = 0; i < Math.min(K, N); i++) {
    counters[i] = times[i];
    trace.push({ cow: i, counter: i, counters: [...counters], starts: 0, finish: counters[i], isInitial: true });
  }
  for (let i = K; i < N; i++) {
    let pick = 0;
    for (let c = 1; c < K; c++) if (counters[c] < counters[pick]) pick = c;
    const start = counters[pick];
    counters[pick] = start + times[i];
    trace.push({ cow: i, counter: pick, counters: [...counters], starts: start, finish: counters[pick], isInitial: false });
  }
  return trace;
}

const _PRESET = { N: 5, K: 2, times: [3, 5, 2, 4, 1] };

export function InterviewSim({ E }) {
  const { N, K, times } = _PRESET;
  const trace = _simulate(N, K, times);
  const [si, setSi] = useState(0);
  const cur = Math.min(si, trace.length - 1);
  const step = trace[cur];

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 12, fontSize: 12, color: C.dim, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
        N = {N}, K = {K}, times = [{times.join(", ")}]
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
        {step.counters.map((finish, c) => (
          <div key={c} style={{
            border: `1.5px solid ${c === step.counter ? "#f59e0b" : A}`,
            background: c === step.counter ? "#fef3c7" : "#ecfdf5",
            borderRadius: 10, padding: "8px 14px", minWidth: 80, textAlign: "center",
          }}>
            <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>
              {t(E, "Counter", "카운터")} {c + 1}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: c === step.counter ? "#92400e" : A, fontFamily: "'JetBrains Mono',monospace" }}>
              {finish === 0 ? "—" : `t=${finish}`}
            </div>
            <div style={{ fontSize: 9, color: C.dim }}>{t(E, "free at", "사용 가능 시각")}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: step.cow === N - 1 ? "#fef3c7" : "#fff",
        border: `1px solid ${step.cow === N - 1 ? "#f59e0b" : C.border}`,
        borderRadius: 10, padding: "10px 14px", marginBottom: 12,
      }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
          {t(E, `Step ${cur + 1}: Cow ${step.cow + 1} (time ${times[step.cow]})`, `${cur + 1}단계: 소 ${step.cow + 1} (시간 ${times[step.cow]})`)}
          {step.cow === N - 1 && <span style={{ marginLeft: 8, color: "#92400e", fontWeight: 700 }}>← {t(E, "Bessie!", "Bessie!")}</span>}
        </div>
        <div style={{ fontSize: 13, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
          {step.isInitial
            ? t(E, `→ Counter ${step.counter + 1} (initial). Starts at 0, finishes at ${step.finish}.`,
                  `→ 카운터 ${step.counter + 1} (초기). 0 시작, ${step.finish} 종료.`)
            : t(E, `→ Counter ${step.counter + 1} earliest free (${step.starts}). Starts ${step.starts}, finishes ${step.finish}.`,
                  `→ 카운터 ${step.counter + 1}이 가장 빨리 빔 (${step.starts}). ${step.starts} 시작, ${step.finish} 종료.`)}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setSi(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === 0 ? "#b0b5c3" : A, cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
          {cur + 1} / {trace.length}
        </span>
        <button onClick={() => setSi(Math.min(trace.length - 1, cur + 1))} disabled={cur === trace.length - 1} style={{
          background: cur === trace.length - 1 ? "#e5e7eb" : A, border: `1px solid ${cur === trace.length - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === trace.length - 1 ? "#b0b5c3" : "#fff", cursor: cur === trace.length - 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   InterviewHeapAudit — deep-audit of heap state at each step,
   with tied-minimum counters highlighted when Bessie arrives
   ═══════════════════════════════════════════════════════════════ */
function _heapTrace(N, K, times) {
  // Build a trace of (heap_state, just_processed_cow, isBessieMoment)
  // heap entries: { ft, cid }
  const heap = [];
  const trace = [];
  for (let i = 0; i < K; i++) heap.push({ ft: times[i], cid: i });
  const sortHeap = () => heap.sort((a, b) => a.ft - b.ft || a.cid - b.cid);
  sortHeap();
  trace.push({ phase: "init", cow: K - 1, heap: heap.map(h => ({ ...h })), note: "init" });

  for (let i = K; i < N - 1; i++) {
    sortHeap();
    const popped = heap.shift();
    const newFt = popped.ft + times[i];
    heap.push({ ft: newFt, cid: popped.cid });
    sortHeap();
    trace.push({
      phase: "process",
      cow: i,
      popped: { ...popped },
      pushed: { ft: newFt, cid: popped.cid },
      heap: heap.map(h => ({ ...h })),
    });
  }
  // Bessie moment — don't pop; show tied minimums
  sortHeap();
  const minFt = heap.length > 0 ? heap[0].ft : 0;
  trace.push({
    phase: "bessie",
    cow: N - 1,
    heap: heap.map(h => ({ ...h })),
    minFt,
    tied: heap.filter(h => h.ft === minFt).map(h => h.cid),
  });
  return trace;
}

const _AUDIT_PRESET = { N: 5, K: 3, times: [4, 2, 3, 1, 5] };

export function InterviewHeapAudit({ E }) {
  const { N, K, times } = _AUDIT_PRESET;
  const trace = _heapTrace(N, K, times);
  const [si, setSi] = useState(0);
  const cur = Math.min(si, trace.length - 1);
  const step = trace[cur];
  const isBessie = step.phase === "bessie";

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, color: C.dim, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
        N = {N}, K = {K}, times = [{times.join(", ")}]
      </div>

      <div style={{
        background: isBessie ? "#fef3c7" : "#ecfdf5",
        border: `1.5px solid ${isBessie ? "#f59e0b" : A}`,
        borderRadius: 10, padding: "10px 12px", marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, color: isBessie ? "#92400e" : "#065f46", fontWeight: 700, marginBottom: 4, letterSpacing: 0.3 }}>
          {isBessie
            ? t(E, `🐄 BESSIE ARRIVES (cow ${step.cow + 1})`, `🐄 BESSIE 도착 (소 ${step.cow + 1})`)
            : step.phase === "init"
              ? t(E, `📦 Initial heap (cows 1..${K} placed)`, `📦 초기 heap (소 1..${K} 배치 완료)`)
              : t(E, `Step ${cur}: cow ${step.cow + 1} processed`, `${cur} 단계: 소 ${step.cow + 1} 처리`)}
        </div>
        <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
          {step.phase === "process" && (
            <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              pop ({step.popped.ft}, c{step.popped.cid + 1}) → push ({step.pushed.ft}, c{step.pushed.cid + 1})
            </span>
          )}
          {isBessie && t(E,
            `Min free time = ${step.minFt}. Bessie can take ANY counter with that exact free time.`,
            `가장 이른 free time 은 ${step.minFt} 이에요. Bessie 는 그 시간과 같은 카운터라면 어디든 갈 수 있어요.`)}
          {step.phase === "init" && t(E,
            "Each entry: (free_time, counter_id). Sorted by free_time.",
            "각 항목은 (free_time, counter_id) 예요. free_time 순으로 늘어놨어요.")}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 2 }}>
          {t(E, "Heap contents (sorted by free_time)", "Heap 내용 (free_time 순 정렬)")}
        </div>
        {step.heap.map((h, idx) => {
          const isMin = isBessie && h.ft === step.minFt;
          const isTopElseStep = !isBessie && step.phase === "process" && idx === 0;
          return (
            <div key={`${h.cid}-${idx}`} style={{
              display: "flex", alignItems: "center", gap: 10,
              border: `1.5px solid ${isMin ? "#f59e0b" : (idx === 0 ? "#0891b2" : C.border)}`,
              background: isMin ? "#fef3c7" : (idx === 0 && !isBessie ? "#ecfeff" : "#fff"),
              borderRadius: 8, padding: "6px 10px",
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: idx === 0 ? "#0891b2" : C.dim,
                minWidth: 30, fontFamily: "'JetBrains Mono',monospace",
              }}>
                {idx === 0 ? "TOP" : `#${idx + 1}`}
              </div>
              <div style={{ flex: 1, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: C.text }}>
                ({h.ft}, c{h.cid + 1})
              </div>
              {isMin && (
                <div style={{ fontSize: 10, fontWeight: 700, color: "#92400e", background: "#fde68a", padding: "2px 8px", borderRadius: 6 }}>
                  ✓ {t(E, "Bessie OK", "Bessie 가능")}
                </div>
              )}
              {isTopElseStep && idx === 0 && (
                <div style={{ fontSize: 10, fontWeight: 700, color: "#0891b2" }}>
                  {t(E, "← popped this step", "← 이 단계에 pop")}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isBessie && (
        <div style={{
          background: "#dcfce7", border: "1.5px solid #16a34a", borderRadius: 10, padding: "10px 12px", marginBottom: 12,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>
            {t(E, "📤 Output", "📤 출력")}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#14532d" }}>
            {step.tied.length}<br />
            {step.tied.map(c => c + 1).sort((a, b) => a - b).join(" ")}
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setSi(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === 0 ? "#b0b5c3" : A, cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
          {cur + 1} / {trace.length}
        </span>
        <button onClick={() => setSi(Math.min(trace.length - 1, cur + 1))} disabled={cur === trace.length - 1} style={{
          background: cur === trace.length - 1 ? "#e5e7eb" : A, border: `1px solid ${cur === trace.length - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === trace.length - 1 ? "#b0b5c3" : "#fff", cursor: cur === trace.length - 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   InterviewRunner — student inputs N, K, times — live assignment
   ═══════════════════════════════════════════════════════════════ */
export function InterviewRunner({ E }) {
  const [nInput, setNInput] = useState("5");
  const [kInput, setKInput] = useState("2");
  const [tInput, setTInput] = useState("3 5 2 4 1");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [liveCow, setLiveCow] = useState(0);
  const [liveCounters, setLiveCounters] = useState([]);
  const alive = useRef(false);

  const run = () => {
    const N = parseInt(nInput);
    const K = parseInt(kInput);
    const times = tInput.trim().split(/\s+/).map(Number);
    if (!N || !K || N < K || K < 1 || times.length !== N || times.some(x => isNaN(x) || x <= 0)) {
      setResult({ error: t(E, "Invalid: need N ≥ K ≥ 1 and N positive times.", "입력이 잘못됐어요. N ≥ K ≥ 1 이어야 하고, times 는 양수 N 개예요.") });
      return;
    }
    setRunning(true); setResult(null);
    setLiveCow(0); setLiveCounters(new Array(K).fill(0));
    alive.current = true;

    const counters = new Array(K).fill(0);
    let i = 0;
    let bessieCounter = -1;

    const tick = () => {
      if (!alive.current) {
        setResult({ stopped: true, lastCow: i });
        setRunning(false);
        return;
      }
      if (i >= N) {
        setResult({ done: true, counters: [...counters], bessieCounter });
        setRunning(false);
        return;
      }
      let pick;
      if (i < K) pick = i;
      else {
        pick = 0;
        for (let c = 1; c < K; c++) if (counters[c] < counters[pick]) pick = c;
      }
      if (i < K) counters[pick] = times[i];
      else counters[pick] += times[i];
      if (i === N - 1) bessieCounter = pick;
      setLiveCow(i); setLiveCounters([...counters]);
      i++;
      const delay = N <= 10 ? 400 : (N <= 100 ? 30 : 5);
      setTimeout(tick, delay);
    };
    setTimeout(tick, 100);
  };
  const stop = () => { alive.current = false; };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 6, marginBottom: 10 }}>
        <input value={nInput} onChange={e => setNInput(e.target.value)} disabled={running} placeholder="N" style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: A, textAlign: "center" }} />
        <input value={kInput} onChange={e => setKInput(e.target.value)} disabled={running} placeholder="K" style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: A, textAlign: "center" }} />
        <input value={tInput} onChange={e => setTInput(e.target.value)} disabled={running} placeholder="times" style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: A }} />
      </div>
      <button onClick={running ? stop : run} style={{
        width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
        fontSize: 14, fontWeight: 600, marginBottom: 10,
        background: running ? "#dc2626" : A, color: "#fff",
      }}>
        {running ? t(E, "⏹ Stop", "⏹ 중지") : t(E, "▶ Run assignment", "▶ 배정 실행")}
      </button>

      {(running || result?.done) && (
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6 }}>
            {running ? t(E, `assigning cow ${liveCow + 1}`, `소 ${liveCow + 1} 배정 중`) : t(E, "final state", "최종 상태")}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            {liveCounters.map((f, c) => (
              <div key={c} style={{
                minWidth: 60, padding: "4px 8px", borderRadius: 6, border: `1.5px solid ${A}`, background: "#ecfdf5",
                fontSize: 11, fontWeight: 600, color: A, textAlign: "center", fontFamily: "'JetBrains Mono',monospace",
              }}>C{c+1}: {f === 0 ? "—" : f}</div>
            ))}
          </div>
        </div>
      )}

      {result?.error && (
        <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px", color: "#7f1d1d", fontSize: 12, fontWeight: 700 }}>{result.error}</div>
      )}
      {result?.done && (
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: "10px 12px", color: "#15803d", fontSize: 13, fontWeight: 600 }}>
          {t(E, `✅ Bessie went to counter ${result.bessieCounter + 1}.`, `✅ Bessie는 카운터 ${result.bessieCounter + 1}로 갔어.`)}
        </div>
      )}
      {result?.stopped && (
        <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 12px", color: "#92400e", fontSize: 12, fontWeight: 700 }}>
          {t(E, `⏹ Stopped at cow ${result.lastCow + 1}`, `⏹ 소 ${result.lastCow + 1}에서 중지`)}
        </div>
      )}

    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   getInterviewSections — 단계별 코드 + Python/C++ + reasoning
   ═══════════════════════════════════════════════════════════════ */

const IV_INPUT_PY = [
  "import sys, heapq",
  "input = sys.stdin.readline",
  "",
  "N, K = map(int, input().split())",
  "times = list(map(int, input().split()))",
];
const IV_INPUT_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <queue>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K;",
  "    cin >> N >> K;",
  "    vector<int> times(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> times[i];",
  "    }",
];

const IV_SIMULATE_PY = [
  "# min-heap of (free_time, counter_id)",
  "heap = []",
  "for i in range(K):",
  "    heapq.heappush(heap, (times[i], i))",
  "",
  "# Cows K..N-2 take the next free counter",
  "for i in range(K, N - 1):",
  "    finish, counter = heapq.heappop(heap)",
  "    heapq.heappush(heap, (finish + times[i], counter))",
];
const IV_SIMULATE_CPP = [
  "    // min-heap: pair<free_time, counter_id>",
  "    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> heap;",
  "    for (int i = 0; i < K; i++) {",
  "        heap.push({(long long)times[i], i});",
  "    }",
  "",
  "    // Cows K..N-2 take next free counter",
  "    for (int i = K; i < N - 1; i++) {",
  "        long long finish = heap.top().first;",
  "        int counter = heap.top().second;",
  "        heap.pop();",
  "        heap.push({finish + times[i], counter});",
  "    }",
];

const IV_OUTPUT_PY = [
  "# Bessie (cow N-1) could go to ANY counter with min free time",
  "min_free = heap[0][0]",
  "candidates = sorted(cid + 1 for ft, cid in heap if ft == min_free)",
  "",
  "print(len(candidates))",
  "print(' '.join(map(str, candidates)))",
];
const IV_OUTPUT_CPP = [
  "    // Bessie could go to ANY counter with min free time",
  "    long long min_free = heap.top().first;",
  "    vector<int> candidates;",
  "    while (!heap.empty()) {",
  "        long long ft = heap.top().first;",
  "        int cid = heap.top().second;",
  "        heap.pop();",
  "        if (ft == min_free) {",
  "            candidates.push_back(cid + 1);",
  "        }",
  "    }",
  "    sort(candidates.begin(), candidates.end());",
  "",
  "    cout << candidates.size() << endl;",
  "    for (int i = 0; i < (int)candidates.size(); i++) {",
  "        cout << candidates[i];",
  "        if (i + 1 == (int)candidates.size()) {",
  "            cout << endl;",
  "        } else {",
  "            cout << ' ';",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

const IV_FULL_PY = [...IV_INPUT_PY, "", ...IV_SIMULATE_PY, "", ...IV_OUTPUT_PY];
const IV_FULL_CPP = [...IV_INPUT_CPP, "", ...IV_SIMULATE_CPP, "", ...IV_OUTPUT_CPP];

export function getInterviewSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: A,
      py: IV_INPUT_PY, cpp: IV_INPUT_CPP,
      why: [
        t(E, "N cows lined up, K counters available. times[i] = how long cow i takes.", "소 N 마리가 줄을 서고 카운터는 K 개예요. times[i] 는 소 i 가 걸리는 시간이에요."),
        t(E, "First K cows immediately go to counters 0..K-1.", "처음 K 마리 소는 바로 카운터 0..K-1 로 가요."),
      ],
      pyOnly: [
        t(E, "import heapq for the priority queue (min-heap).", "import heapq 로 우선순위 큐(min-heap)를 써요."),
      ],
      cppOnly: [
        t(E, "priority_queue with greater<> for min-heap (default is max-heap).", "priority_queue 에 greater<> 를 넣어 min-heap 을 만들어요 (기본은 max-heap)."),
        t(E, "Cumulative finish times can exceed int (N·max time). Use long long in the heap.", "쌓아 온 종료 시간은 N·시간 까지 커져서 int 를 넘을 수 있어요. heap 에 long long 을 써요."),
      ],
    },
    {
      label: t(E, "🐄 2. Simulate Cows K..N-2", "🐄 2. K..N-2 번째 소 시뮬"),
      color: "#16a34a",
      py: IV_SIMULATE_PY, cpp: IV_SIMULATE_CPP,
      why: [
        t(E, "min-heap pop = next free counter; push it back with new finish_time = old + this cow's processing time.",
            "min-heap 에서 pop 한 것이 다음에 비는 카운터예요. 그 카운터를 새 종료 시간(이전 + 이 소가 걸리는 시간)으로 다시 push 해요."),
        t(E, "Stop just BEFORE Bessie (cow N-1) — she's what we're solving for.",
            "Bessie (소 N-1) 바로 앞에서 멈춰요. Bessie 가 어디로 가는지가 우리가 찾는 답이거든요."),
      ],
      pyOnly: [
        t(E, "heapq.heappop / heappush — log K each.", "heapq.heappop 과 heappush 는 각각 log K 만큼 걸려요."),
      ],
      cppOnly: [
        t(E, "heap.top().first / .second access the pair components — no structured bindings needed.", "heap.top().first 와 .second 로 pair 를 꺼내요. structured bindings 없이도 충분해요."),
      ],
    },
    {
      label: t(E, "🎯 3. Bessie's Possible Counters", "🎯 3. Bessie 가 갈 수 있는 카운터들"),
      color: A,
      py: IV_OUTPUT_PY, cpp: IV_OUTPUT_CPP,
      why: [
        t(E, "After K..N-2 cows are processed, the heap shows current finish times of all K counters.", "K..N-2 번 소까지 처리하면 heap 에 카운터 K 개의 지금 종료 시간이 들어 있어요."),
        t(E, "Bessie goes to the EARLIEST FREE counter — but tied counters are all valid choices.", "Bessie 는 가장 먼저 비는 카운터로 가요. 시간이 같으면 그 카운터가 모두 답이에요."),
        t(E, "Find min_free = heap[0][0]. Collect all counters with that exact free time.", "min_free = heap[0][0] 을 찾아요. 그 시간과 똑같은 카운터를 모두 모아요."),
        t(E, "Output sorted (1-indexed): count + the counter list.", "번호 순으로 정렬해서 출력해요 (1 부터 세요). 개수를 먼저 쓰고 카운터 번호를 이어서 써요."),
      ],
      pyOnly: [
        t(E, "Generator expression in sorted() — concise filter+map+sort in one line.", "sorted() 안에 generator 를 넣어 거르기·바꾸기·정렬을 한 줄로 해요."),
      ],
      cppOnly: [
        t(E, "Drain heap into vector to access all elements (heap iteration not direct).", "heap 을 vector 로 옮겨 담아요. heap 은 바로 하나씩 볼 수 없거든요."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: A,
      py: IV_FULL_PY, cpp: IV_FULL_CPP,
      why: [
        t(E, "Time: O(N log K). For N=2×10⁵, K=2×10⁵: ~3.5×10⁶ ops. Fast.", "시간은 O(N log K) 예요. N=2×10⁵, K=2×10⁵ 이면 계산이 약 3.5×10⁶ 번이라 빨라요."),
        t(E, "Space: O(K) for heap.", "메모리는 heap 에 O(K) 만큼 써요."),
        t(E, "Insight: 'first idea' would simulate cow-by-cow with full counter scan — that'd be O(NK). Heap reduces K → log K per cow.", "첫 아이디어는 소마다 카운터 K 개를 다 훑는 것이라 O(NK) 예요. heap 을 쓰면 소 한 마리에 K 가 log K 로 줄어요."),
      ],
    },
  ];
}


/* ProgressiveCode — vertical stack pattern */
export function InterviewProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}


/* PDF helper functions (same as permutation) */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","join","sorted"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","priority_queue","greater","pair","sort"];

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

export function downloadInterviewPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Bessie's Interview — Full Study Guide", "🐄 Bessie의 인터뷰 — 종합 풀이 노트");
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
  th { background: #d1fae5; color: #065f46; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #d1fae5; border: 1.5px solid #6ee7b7; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>

<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>

<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2025 January Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>

<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "N cows queue up for K interview counters. Cow i takes time times[i] at any counter. When a counter becomes free, the next cow in line takes it. Bessie is the last cow (index N-1). Which counter(s) could she end up at?",
  "소 N 마리가 인터뷰 카운터 K 개 앞에 줄을 서요. 소 i 는 어느 카운터에서든 times[i] 만큼 걸려요. 카운터가 비면 다음 소가 들어가요. Bessie 는 맨 마지막 소예요 (자리 번호 N-1). Bessie 는 어느 카운터로 갈 수 있을까요?")}</p>

<h3>${t(E, "Constraints", "제약")}</h3>
<p>1 ≤ K ≤ N ≤ 2×10⁵, 1 ≤ times[i] ≤ 10⁹.</p>

<h2>2. ${t(E, "First Idea: Simulation with Min-Heap", "첫 아이디어: Min-Heap 으로 시뮬")}</h2>
<div class="box">
  <b>💡 ${t(E, "Key insight", "핵심 통찰")}</b>:
  ${t(E, "When the next cow arrives, she goes to the counter that becomes free SOONEST. Sounds like... a min-heap problem!",
        "다음 소는 가장 빨리 비는 카운터로 가요. min-heap 문제처럼 들리네요!")}
</div>
<p>${t(E,
  "Each entry in the heap = (free_time, counter_id). Pop the smallest free_time, push it back with new free_time = old + new cow's time.",
  "heap 의 각 항목은 (free_time, counter_id) 예요. 가장 작은 free_time 을 pop 하고, 새 free_time = 이전 + 새 소 시간으로 다시 push 해요.")}</p>

<div class="box">
  <b>${t(E, "Tied counters = Bessie's choices", "같은 시간에 비는 카운터 = Bessie 의 선택지")}</b>:
  ${t(E, "When multiple counters become free at the SAME time, Bessie could pick any. Output all of them sorted.",
        "여러 카운터가 같은 시간에 비면 Bessie 는 어디든 갈 수 있어요. 번호 순으로 정렬해서 모두 출력해요.")}
</div>

<div class="box">
  <b>${t(E, "Time complexity", "시간복잡도")}:</b>
  ${t(E, "O(N log K) — N cows, each does heap pop+push (log K each).",
        "O(N log K) 예요. 소 N 마리마다 heap pop 과 push 를 하니까요 (각각 log K).")}
</div>

<h2>3. ${t(E, "Optimal Code (4 sections)", "제일 좋은 코드 (4 부분)")}</h2>
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
