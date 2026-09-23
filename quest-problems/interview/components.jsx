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
  "",
  "# Farmers 0..K-1 begin interviewing cows 0..K-1 at time 0.",
  "heap = []",
  "for i in range(K):",
  "    heapq.heappush(heap, (times[i], i))",
];
const IV_INPUT_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <queue>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K;",
  "    cin >> N >> K;",
  "    vector<long long> times(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> times[i];",
  "    }",
  "",
  "    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> heap;",
  "    for (int i = 0; i < K; i++) {",
  "        heap.push({times[i], i});",
  "    }",
];

const IV_SIMULATE_PY = [
  "cur_cow = K",
  "events = []  # each entry: farmer ids that tied for the same free time",
  "",
  "while True:",
  "    # Collect every farmer tied for the current smallest free time.",
  "    tied = [heapq.heappop(heap)]",
  "    while heap and heap[0][0] == tied[0][0]:",
  "        tied.append(heapq.heappop(heap))",
  "",
  "    if len(tied) > 1:",
  "        events.append([farmer for _, farmer in tied])",
  "",
  "    # Not enough remaining cows to give every tied farmer a new cow?",
  "    # Then this tie IS the moment Bessie arrives.",
  "    if cur_cow + len(tied) > N:",
  "        last_time, last_farmer = tied[0]",
  "        break",
  "",
  "    # Otherwise hand the next len(tied) cows to these farmers.",
  "    for finish_time, farmer in tied:",
  "        new_finish = finish_time + times[cur_cow]",
  "        heapq.heappush(heap, (new_finish, farmer))",
  "        cur_cow += 1",
];
const IV_SIMULATE_CPP = [
  "    int curCow = K;",
  "    vector<vector<int>> events;",
  "",
  "    long long lastTime = 0;",
  "    int lastFarmer = -1;",
  "",
  "    while (true) {",
  "        vector<pair<long long, int>> tied;",
  "        tied.push_back(heap.top());",
  "        heap.pop();",
  "        while (!heap.empty() && heap.top().first == tied[0].first) {",
  "            tied.push_back(heap.top());",
  "            heap.pop();",
  "        }",
  "",
  "        if ((int)tied.size() > 1) {",
  "            vector<int> group;",
  "            for (auto& p : tied) {",
  "                group.push_back(p.second);",
  "            }",
  "            events.push_back(group);",
  "        }",
  "",
  "        if (curCow + (int)tied.size() > N) {",
  "            lastTime = tied[0].first;",
  "            lastFarmer = tied[0].second;",
  "            break;",
  "        }",
  "",
  "        for (auto& p : tied) {",
  "            long long newFinish = p.first + times[curCow];",
  "            heap.push({newFinish, p.second});",
  "            curCow++;",
  "        }",
  "    }",
];

const IV_OUTPUT_PY = [
  "# Bessie's interviewer is at least last_farmer. Walk the tie events",
  "# backward in time: whenever a tied group overlaps a farmer we already",
  "# know can reach Bessie, every farmer in that group can too.",
  "can_interview = [False] * K",
  "can_interview[last_farmer] = True",
  "",
  "for group in reversed(events):",
  "    touches = False",
  "    for farmer in group:",
  "        if can_interview[farmer]:",
  "            touches = True",
  "    if touches:",
  "        for farmer in group:",
  "            can_interview[farmer] = True",
  "",
  "print(last_time)",
  "answer_bits = []",
  "for farmer in range(K):",
  "    if can_interview[farmer]:",
  "        answer_bits.append(\"1\")",
  "    else:",
  "        answer_bits.append(\"0\")",
  "print(\"\".join(answer_bits))",
];
const IV_OUTPUT_CPP = [
  "    vector<bool> canInterview(K, false);",
  "    canInterview[lastFarmer] = true;",
  "",
  "    for (int i = (int)events.size() - 1; i >= 0; i--) {",
  "        bool touches = false;",
  "        for (int farmer : events[i]) {",
  "            if (canInterview[farmer]) {",
  "                touches = true;",
  "            }",
  "        }",
  "        if (touches) {",
  "            for (int farmer : events[i]) {",
  "                canInterview[farmer] = true;",
  "            }",
  "        }",
  "    }",
  "",
  "    cout << lastTime << \"\\n\";",
  "    string bits = \"\";",
  "    for (int i = 0; i < K; i++) {",
  "        if (canInterview[i]) {",
  "            bits += \"1\";",
  "        } else {",
  "            bits += \"0\";",
  "        }",
  "    }",
  "    cout << bits << \"\\n\";",
  "",
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
        t(E, "What are we trying to find? Which farmer(s) COULD end up interviewing\nBessie, and when. So first read N, K, and every cow's time.",
            "무엇을 알아내야 할까요? Bessie 를 인터뷰\n'할 수도 있는' 농부들과 그 시각이에요. 먼저 N, K, 소마다 걸리는 시간을 읽어요."),
        t(E, "The first K cows immediately go to farmers 0..K-1 — every farmer is\nstill empty, so there's nothing to compare yet.",
            "처음 K 마리 소는 바로 농부 0..K-1 에게 가요.\n아직 모든 농부가 비어 있어서 견줄 게 없거든요."),
      ],
      pyOnly: [
        t(E, "import heapq for the priority queue (min-heap).", "import heapq 로 우선순위 큐(min-heap)를 써요."),
      ],
      cppOnly: [
        t(E, "priority_queue with greater<> for min-heap (default is max-heap).", "priority_queue 에 greater<> 를 넣어 min-heap 을 만들어요 (기본은 max-heap)."),
        t(E, "Cumulative finish times can exceed int (N·max time). Use long long in the heap.", "쌓아 온 종료 시간은 N·시간 까지 커져서 int 를 넘을 수 있어요.\nheap 에 long long 을 써요."),
      ],
    },
    {
      label: t(E, "🐄 2. Simulate + Record Every Tie", "🐄 2. 시뮬하며 동점을 기록"),
      color: "#16a34a",
      py: IV_SIMULATE_PY, cpp: IV_SIMULATE_CPP,
      why: [
        t(E, "Each cow goes to whichever farmer frees up earliest — pop the min-heap.\nBut if SEVERAL farmers tie for that time, ANY of them could take the cow,\nso we save that whole tied group as an 'event' before choosing one.",
            "소는 가장 먼저 비는 농부에게 가요. min-heap 에서 pop 하면 나와요.\n그런데 여러 농부가 같은 시간에 묶여 있으면 그중 아무나 받을 수 있으니,\n하나를 고르기 전에 그 묶음 전체를 '사건'으로 저장해 둬요."),
        t(E, "We stop the moment a tied group is BIGGER than the cows left — that's\nexactly when Bessie is the next one waiting, not a real cow anymore.",
            "동점 묶음이 남은 소보다 커지는 순간 멈춰요.\n바로 그 순간이 Bessie 가 다음 차례로 기다리는 때예요, 진짜 소가 아니라."),
      ],
      pyOnly: [
        t(E, "heapq.heappop / heappush — log K each.", "heapq.heappop 과 heappush 는 각각 log K 만큼 걸려요."),
      ],
      cppOnly: [
        t(E, "heap.top().first / .second access the pair components — no structured bindings needed.", "heap.top().first 와 .second 로 pair 를 꺼내요.\nstructured bindings 없이도 충분해요."),
      ],
    },
    {
      label: t(E, "🎯 3. Walk the Ties Backward", "🎯 3. 동점을 거꾸로 훑기"),
      color: A,
      py: IV_OUTPUT_PY, cpp: IV_OUTPUT_CPP,
      why: [
        t(E, "One farmer (last_farmer) is DEFINITELY free when Bessie arrives.\nBut if that farmer was ever part of an earlier tied group, any OTHER\nfarmer in that same group could have been picked instead — and end up\nin last_farmer's exact position by Bessie's turn.",
            "농부 한 명(last_farmer)은 Bessie 가 왔을 때 확실히 비어 있어요.\n그런데 그 농부가 예전에 어떤 동점 묶음에 있었다면,\n그 묶음의 다른 농부가 대신 뽑혔어도 Bessie 차례엔 똑같은 자리에\n있을 수 있어요."),
        t(E, "So walk the recorded events from LATEST to earliest. Whenever a group\nshares a farmer with our known set, the whole group joins the set too.",
            "그래서 기록해 둔 사건들을 가장 최근 것부터 거꾸로 훑어요.\n묶음이 우리가 아는 농부와 한 명이라도 겹치면, 묶음 전체를 더해요."),
        t(E, "Print the time, then the K-length bit string (1 = could interview Bessie).",
            "시각을 먼저 출력하고, 길이 K 인 0/1 문자열을 출력해요 (1 = Bessie 를 인터뷰할 수 있음)."),
      ],
      pyOnly: [
        t(E, "Build the bit string with a plain loop, one character at a time.", "0/1 문자열은 평범한 반복문으로 한 글자씩 만들어요."),
      ],
      cppOnly: [
        t(E, "vector<bool> stores the K farmer flags compactly.", "vector<bool> 로 농부 K 명의 참/거짓을 저장해요."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: A,
      py: IV_FULL_PY, cpp: IV_FULL_CPP,
      why: [
        t(E, "Time: O(N log K) — each of the N cows costs one heap pop + push.", "시간은 O(N log K) 예요.\n소 N 마리마다 heap pop 과 push 를 한 번씩 하니까요."),
        t(E, "Space: O(K) for the heap, up to O(N) for the recorded tie events.", "메모리는 heap 에 O(K), 기록해 둔 동점 사건에 최대 O(N) 을 써요."),
        t(E, "Insight: picking ONE farmer per tie (no events) misses valid answers —\nBessie's actual interviewer chain can pass through any of them.", "동점마다 농부 한 명만 고르면(사건 기록 없이) 답을 놓쳐요.\nBessie 로 이어지는 사슬이 그 동점의 아무 농부나 지나갈 수 있거든요."),
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
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
  "소 N 마리가 인터뷰 카운터 K 개 앞에 줄을 서요.\n소 i 는 어느 카운터에서든 times[i] 만큼 걸려요. 카운터가 비면 다음 소가 들어가요.\nBessie 는 맨 마지막 소예요 (자리 번호 N-1). Bessie 는 어느 카운터로 갈 수 있을까요?")}</p>

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
  "heap 의 각 항목은 (free_time, counter_id) 예요.\n가장 작은 free_time 을 pop 하고,\n새 free_time = 이전 + 새 소 시간으로 다시 push 해요.")}</p>

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
