// New interactive sims for mooin2 — kept OUT of components.jsx so the
// 🔒 USACO_VERIFIED code in that file is never touched. These are
// illustrative-only (brute "feel the pain" + the counting payoff trace).

import { useState, useRef, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

const A = "#ea580c";

/* ════════════════════════════════════════════════════════════════════
   MooinBruteRunner — RUN the O(N³) brute force live and FEEL it crawl.
   Time-sliced triple loop with a live op counter + Stop button, so a
   student physically watches small N finish instantly and big N hang.
   ════════════════════════════════════════════════════════════════════ */
const BRUTE_PRESETS = [
  { n: 40,  label_en: "N = 40",  label_ko: "N = 40" },
  { n: 160, label_en: "N = 160", label_ko: "N = 160" },
  { n: 420, label_en: "N = 420", label_ko: "N = 420" },
];

// Deterministic array with lots of repeats (values in 1..maxV).
function makeArray(n) {
  const maxV = Math.max(2, Math.floor(n / 4));
  const a = new Array(n);
  for (let i = 0; i < n; i++) a[i] = ((i * 7 + 3) % maxV) + 1;
  return a;
}

export function MooinBruteRunner({ E }) {
  const [pi, setPi] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [ops, setOps] = useState(0);
  const [ans, setAns] = useState(null);
  const [ms, setMs] = useState(0);

  const loopRef = useRef(null);     // {a, N, i, j, k, seen, ops, start}
  const timerRef = useRef(null);
  const stoppedRef = useRef(false);

  const cancel = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };
  useEffect(() => () => cancel(), []);

  const reset = () => {
    cancel();
    stoppedRef.current = true;
    setRunning(false); setDone(false); setOps(0); setAns(null); setMs(0);
    loopRef.current = null;
  };

  const run = () => {
    cancel();
    const N = BRUTE_PRESETS[pi].n;
    const a = makeArray(N);
    loopRef.current = { a, N, i: 0, j: 1, k: 2, seen: new Set(), ops: 0, start: performance.now() };
    stoppedRef.current = false;
    setRunning(true); setDone(false); setAns(null); setOps(0); setMs(0);
    tick();
  };

  const stop = () => {
    stoppedRef.current = true;
    cancel();
    const st = loopRef.current;
    setRunning(false);
    if (st) { setOps(st.ops); setMs(Math.round(performance.now() - st.start)); }
  };

  const CHUNK = 1_500_000; // inner steps per slice
  const tick = () => {
    const st = loopRef.current;
    if (!st || stoppedRef.current) return;
    const { a, N } = st;
    let { i, j, k, ops } = st;
    let steps = 0;
    let finished = false;
    while (steps < CHUNK) {
      if (i >= N - 2) { finished = true; break; }
      // process (i, j, k)
      if (a[j] === a[k] && a[i] !== a[j]) st.seen.add(a[i] * 100000 + a[j]);
      ops++; steps++;
      // advance k, then j, then i
      k++;
      if (k >= N) { j++; k = j + 1; }
      if (j >= N - 1) { i++; j = i + 1; k = j + 1; }
    }
    st.i = i; st.j = j; st.k = k; st.ops = ops;
    setOps(ops);
    setMs(Math.round(performance.now() - st.start));
    if (finished) {
      setRunning(false); setDone(true); setAns(st.seen.size);
      setMs(Math.round(performance.now() - st.start));
      return;
    }
    timerRef.current = setTimeout(tick, 0);
  };

  const N = BRUTE_PRESETS[pi].n;
  const totalTriples = (N >= 3) ? (N * (N - 1) * (N - 2)) / 6 : 0;
  const pct = totalTriples > 0 ? Math.min(100, (ops / totalTriples) * 100) : 0;

  // Projected time at N = 10^6, assuming this machine's ops/sec from the run.
  const opsPerSec = ms > 0 ? ops / (ms / 1000) : 0;
  const bigTriples = 1e6 * (1e6 - 1) * (1e6 - 2) / 6; // ~1.67e17
  const projYears = opsPerSec > 0 ? bigTriples / opsPerSec / (3600 * 24 * 365) : null;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 4 }}>
        🐢 {t(E, "Run the brute force — feel it crawl", "브루트포스 직접 돌려보기 — 느림을 느껴봐요")}
      </div>
      <div style={{ textAlign: "center", fontSize: 11.5, color: C.dim, marginBottom: 12 }}>
        {t(E, "Pick a size, press Run. Small N finishes instantly. Big N… wait for it.",
              "크기를 고르고 Run. 작은 N 은 순식간, 큰 N 은… 기다려 봐요.")}
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
        {BRUTE_PRESETS.map((p, i) => (
          <button key={i} disabled={running} onClick={() => { setPi(i); reset(); }} style={{
            padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 800,
            border: `1.5px solid ${pi === i ? A : C.border}`,
            background: pi === i ? "#ffedd5" : "#fff", color: pi === i ? A : C.text,
            cursor: running ? "not-allowed" : "pointer", opacity: running && pi !== i ? 0.5 : 1,
          }}>{E ? p.label_en : p.label_ko}</button>
        ))}
      </div>

      {/* progress bar */}
      <div style={{ background: "#f1f5f9", borderRadius: 8, height: 16, overflow: "hidden", marginBottom: 8, border: `1px solid ${C.border}` }}>
        <div style={{ width: `${pct}%`, height: "100%", background: done ? "#16a34a" : A, transition: "width 0.1s linear" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>
        <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#9a3412" }}>{t(E, "triples checked", "확인한 삼중")}</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{ops.toLocaleString()}</div>
        </div>
        <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#9a3412" }}>{t(E, "time", "걸린 시간")}</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{ms} ms</div>
        </div>
        <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#9a3412" }}>{t(E, "moos found", "찾은 moo")}</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: ans != null ? "#15803d" : "#cbd5e1" }}>{ans != null ? ans : "·"}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
        {!running ? (
          <button onClick={run} style={{
            padding: "8px 22px", borderRadius: 8, fontSize: 13, fontWeight: 800,
            border: "none", background: A, color: "#fff", cursor: "pointer",
          }}>▶ {t(E, "Run", "실행")}</button>
        ) : (
          <button onClick={stop} style={{
            padding: "8px 22px", borderRadius: 8, fontSize: 13, fontWeight: 800,
            border: "none", background: "#dc2626", color: "#fff", cursor: "pointer",
          }}>■ {t(E, "Stop", "정지")}</button>
        )}
        <button onClick={reset} disabled={running} style={{
          padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700,
          border: `1.5px solid ${C.border}`, background: "#fff", color: C.text,
          cursor: running ? "not-allowed" : "pointer", opacity: running ? 0.5 : 1,
        }}>↺ {t(E, "Reset", "초기화")}</button>
      </div>

      {done && (
        <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 13px", fontSize: 12.5, color: "#92400e", lineHeight: 1.7 }}>
          ✅ {t(E, `Finished ${ops.toLocaleString()} triples in ${ms} ms.`, `${ops.toLocaleString()} 개 삼중을 ${ms} ms 에 끝냄.`)}
          {projYears != null && (
            <div style={{ marginTop: 5, fontWeight: 700, color: "#7c2d12" }}>
              {t(E,
                `At this speed, N = 1,000,000 (≈1.7×10¹⁷ triples) would take about ${projYears > 1 ? Math.round(projYears).toLocaleString() + " years" : "<1 year"}. 😱`,
                `이 속도면 N = 1,000,000 (≈1.7×10¹⁷ 삼중) 은 약 ${projYears > 1 ? Math.round(projYears).toLocaleString() + " 년" : "<1 년"} 걸려요. 😱`)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MooinCountTrace — the PAYOFF: step through each candidate y and watch
   the answer add up. De-blackboxes the Explorer: for every y with
   count ≥ 2 we show p = second_last[y], D[p], the count≥3 "−1", the
   contribution, and the running total.
   ════════════════════════════════════════════════════════════════════ */
const COUNT_PRESETS = [
  { name: "S1", a: [1, 2, 3, 4, 4, 4] },
  { name: "−1 case", a: [4, 1, 4, 4] },
  { name: "Mixed", a: [3, 1, 2, 1, 2, 3, 3] },
];

function buildCountTrace(a) {
  const N = a.length;
  const count = {}, lastSeen = {}, secondLast = {};
  for (let i = 0; i < N; i++) {
    const v = a[i];
    count[v] = (count[v] ?? 0) + 1;
    if (lastSeen[v] != null) secondLast[v] = lastSeen[v];
    lastSeen[v] = i;
  }
  const seen = new Set(); const D = [0];
  for (let i = 0; i < N; i++) { D.push(D[i] + (seen.has(a[i]) ? 0 : 1)); seen.add(a[i]); }

  const ys = Object.keys(count).map(Number).filter(y => count[y] >= 2).sort((x, y) => x - y);
  const steps = [];
  steps.push({ kind: "intro", ans: 0, ys });
  let ans = 0;
  for (const y of ys) {
    const p = secondLast[y];
    const d0 = D[p];
    const sub = count[y] >= 3;
    const contrib = d0 - (sub ? 1 : 0);
    ans += contrib;
    steps.push({ kind: "y", y, cnt: count[y], p, d0, sub, contrib, ans });
  }
  if (ys.length === 0) steps.push({ kind: "none", ans: 0 });
  steps.push({ kind: "final", ans });
  return { steps, D, secondLast, count, ys };
}

export function MooinCountTrace({ E }) {
  const [pi, setPi] = useState(0);
  const a = COUNT_PRESETS[pi].a;
  const built = buildCountTrace(a);
  const { idx, safe, setIdx, total } = useTraceStep(built.steps.length);
  const step = built.steps[Math.min(safe, built.steps.length - 1)];

  let note;
  if (step.kind === "intro")
    note = built.ys.length
      ? t(E, `Candidates (count ≥ 2): y ∈ {${built.ys.join(", ")}}. We add each one's contribution.`,
            `후보 (count ≥ 2): y ∈ {${built.ys.join(", ")}}. 각각의 기여를 더해요.`)
      : t(E, "No value appears twice → no candidates → answer 0.", "두 번 나오는 값이 없음 → 후보 없음 → 답 0.");
  else if (step.kind === "y")
    note = t(E,
      `y = ${step.y}: latest pair at p = ${step.p}. D[${step.p}] = ${step.d0} distinct x's before it${step.sub ? `, but count[${step.y}] = ${step.cnt} ≥ 3 so subtract 1` : ""}. → +${step.contrib}. Running total = ${step.ans}.`,
      `y = ${step.y}: 가장 늦은 짝 p = ${step.p}. 그 앞 서로 다른 x = D[${step.p}] = ${step.d0}${step.sub ? `, 그런데 count[${step.y}] = ${step.cnt} ≥ 3 이라 1 빼기` : ""}. → +${step.contrib}. 누적 = ${step.ans}.`);
  else if (step.kind === "none")
    note = t(E, "Nothing to add. Answer = 0.", "더할 게 없음. 답 = 0.");
  else
    note = t(E, `All candidates added. Answer = ${step.ans}.`, `모든 후보 합산 완료. 답 = ${step.ans}.`);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 8 }}>
        🧮 {t(E, "Add it up — why the answer is what it is", "합산 — 왜 그 답이 나오는지")}
      </div>

      {/* preset picker */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
        {COUNT_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setIdx(0); }} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${pi === i ? A : C.border}`,
            background: pi === i ? "#ffedd5" : "#fff", color: pi === i ? A : C.text, cursor: "pointer",
          }}>{p.name}: [{p.a.join(", ")}]</button>
        ))}
      </div>

      {/* array */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 12 }}>
        {a.map((v, i) => {
          const isP = step.kind === "y" && i === step.p;
          return (
            <div key={i} style={{
              width: 38, height: 46, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", borderRadius: 8,
              fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
              background: isP ? "#ea580c" : "#fff", color: isP ? "#fff" : C.text,
              border: `2px solid ${isP ? "#ea580c" : C.border}`,
            }}>
              <div style={{ fontSize: 9, opacity: 0.8 }}>i={i}</div>
              <div style={{ fontSize: 14 }}>{v}</div>
            </div>
          );
        })}
      </div>
      {step.kind === "y" && (
        <div style={{ textAlign: "center", fontSize: 11, color: "#9a3412", marginBottom: 10 }}>
          ↑ p = second_last[{step.y}] = {step.p}
        </div>
      )}

      {/* contribution formula */}
      {step.kind === "y" && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
          <span style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 6, padding: "4px 9px", color: "#9a3412" }}>D[{step.p}] = {step.d0}</span>
          {step.sub && <span style={{ color: "#dc2626", fontWeight: 800 }}>− 1</span>}
          <span style={{ fontWeight: 800 }}>=</span>
          <span style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 6, padding: "4px 9px", color: "#15803d", fontWeight: 800 }}>+{step.contrib}</span>
        </div>
      )}

      {/* running total */}
      <div style={{ background: A, color: "#fff", borderRadius: 10, padding: "10px 12px", textAlign: "center", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
        {t(E, "answer so far", "현재까지 답")}: <span style={{ fontSize: 20 }}>{step.ans}</span>
      </div>

      {/* narration */}
      <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: "#92400e", lineHeight: 1.6, marginBottom: 10, minHeight: 44 }}>
        {note}
      </div>

      <SimNav idx={idx} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
    </div>
  );
}
