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
  { n: 40,   label_en: "N = 40",      label_ko: "N = 40" },
  { n: 200,  label_en: "N = 200",     label_ko: "N = 200" },
  { n: 800,  label_en: "N = 800",     label_ko: "N = 800" },
  { n: 2000, label_en: "N = 2000 🐌", label_ko: "N = 2000 🐌" },
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
    // 끝에서 두 번째 y 자리(p) 앞 구역에 나온 서로 다른 값들
    const beforeSet = []; const bseen = new Set();
    for (let i = 0; i < p; i++) { if (!bseen.has(a[i])) { bseen.add(a[i]); beforeSet.push(a[i]); } }
    // y 가 나오는 모든 자리
    const occ = []; for (let i = 0; i < N; i++) if (a[i] === y) occ.push(i);

    const base = { y, cnt: count[y], p, d0, sub, contrib, occ, beforeSet };
    const ansBefore = ans;
    steps.push({ kind: "pick", ...base, ans: ansBefore });
    steps.push({ kind: "spot", ...base, ans: ansBefore });
    steps.push({ kind: "count", ...base, ans: ansBefore });
    if (sub) steps.push({ kind: "subtract", ...base, ans: ansBefore });
    ans += contrib;
    steps.push({ kind: "add", ...base, ans });
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
      ? t(E, `A moo is (x, y, y) — its last two must be the SAME. So find the values that repeat (appear ≥ 2): {${built.ys.join(", ")}}. We'll take them ONE at a time, count the moos each makes, and add up.`,
            `moo = (x, y, y) — 뒤 두 글자가 똑같아야 해요. 그러니 2번 이상 나오는 값(반복 숫자)을 찾아요: {${built.ys.join(", ")}}. 한 번에 하나씩, 값마다 moo 수를 세서 더해 갈게요.`)
      : t(E, "No value appears twice → no moos → answer 0.", "2번 이상 나오는 값이 없음 → moo 없음 → 답 0.");
  else if (step.kind === "pick")
    note = t(E,
      `Now value ${step.y} — it shows up ${step.cnt} times (a repeat!). We'll use its LAST two as the moo's "y, y". So how many moos can ${step.y} make?`,
      `이번엔 값 ${step.y} 차례 — ${step.y} 가 ${step.cnt}번 나와요 (반복 숫자!). ${step.y} 의 뒤쪽 2개를 moo 의 'y, y' 로 쓸 거예요. 그럼 ${step.y} 로 moo 몇 개 만들 수 있을까요?`);
  else if (step.kind === "spot")
    note = t(E,
      `Find where ${step.y} appears for the second-to-last time → i=${step.p}. From here on there are exactly two ${step.y}'s — the moo's "y, y". So everything to the LEFT can be the front x.`,
      `${step.y} 가 '끝에서 두 번째'로 나오는 자리를 찾아요 → i=${step.p} 칸. 여기부터 뒤로 ${step.y} 가 딱 2개 남아요 — moo 의 'y, y'. 그래서 이 자리 왼쪽 값들이 맨 앞 x 가 될 수 있어요.`);
  else if (step.kind === "count")
    note = t(E,
      `Count the DIFFERENT values in that left zone: {${step.beforeSet.join(", ")}} → ${step.d0} of them.`,
      `그 왼쪽(앞) 구역에서 서로 다른 값을 세요: {${step.beforeSet.join(", ")}} → ${step.d0}개.`);
  else if (step.kind === "subtract")
    note = t(E,
      `But a moo needs x ≠ y. ${step.y} itself sits in that zone, so drop 1: ${step.d0} − 1 = ${step.contrib}.`,
      `그런데 moo 는 x ≠ y 여야 해요. 앞 구역에 ${step.y} 자신도 껴 있으니 1개 빼요: ${step.d0} − 1 = ${step.contrib}개.`);
  else if (step.kind === "add")
    note = t(E,
      `So ${step.y} makes ${step.contrib} moo(s). Add to the running total → ${step.ans}.`,
      `그래서 ${step.y} 로 만드는 moo 는 ${step.contrib}개. 누적에 더하면 → ${step.ans}.`);
  else if (step.kind === "none")
    note = t(E, "Nothing to add. Answer = 0.", "더할 게 없음. 답 = 0.");
  else
    note = t(E, `All values done. Answer = ${step.ans}.`, `모든 값 처리 완료. 답 = ${step.ans}.`);

  const showP = ["spot", "count", "subtract", "add"].includes(step.kind);
  const hasFormula = ["count", "subtract", "add"].includes(step.kind);

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
          const isP = showP && i === step.p;                                   // 끝에서 두 번째 자리
          const isPick = step.kind === "pick" && step.occ?.includes(i);        // 이 값이 나오는 자리들
          const inZone = (step.kind === "count" || step.kind === "subtract") && i < step.p; // 앞 구역
          const isDrop = step.kind === "subtract" && i < step.p && v === step.y; // 빼야 할 y 자신
          let bg = "#fff", fg = C.text, bd = C.border;
          if (isP) { bg = "#ea580c"; fg = "#fff"; bd = "#ea580c"; }
          else if (isDrop) { bg = "#fee2e2"; fg = "#b91c1c"; bd = "#dc2626"; }
          else if (inZone) { bg = "#fef3c7"; fg = "#92400e"; bd = "#fbbf24"; }
          else if (isPick) { bg = "#dbeafe"; fg = "#1e40af"; bd = "#2563eb"; }
          return (
            <div key={i} style={{
              width: 38, height: 46, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", borderRadius: 8,
              fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
              background: bg, color: fg, border: `2px solid ${bd}`,
            }}>
              <div style={{ fontSize: 9, opacity: 0.8 }}>i={i}</div>
              <div style={{ fontSize: 14 }}>{v}</div>
            </div>
          );
        })}
      </div>
      {showP && (
        <div style={{ textAlign: "center", fontSize: 11, color: "#9a3412", marginBottom: 10 }}>
          {step.kind === "count" || step.kind === "subtract"
            ? `🟡 ${t(E, `left of second-to-last ${step.y} — count distinct values here`, `끝에서 두 번째 ${step.y} 앞 구역 — 여기서 서로 다른 값을 세요`)}`
            : `↑ ${t(E, `second-to-last ${step.y}`, `끝에서 두 번째 ${step.y}`)}`}
        </div>
      )}

      {/* contribution formula — reveal piece by piece */}
      {hasFormula && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
          <span style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 6, padding: "4px 9px", color: "#9a3412" }}>{t(E, "before", "앞의 서로 다른 값")} {step.d0}</span>
          {step.sub && (step.kind === "subtract" || step.kind === "add") && <span style={{ color: "#dc2626", fontWeight: 800 }}>− 1</span>}
          {step.kind === "add" && <>
            <span style={{ fontWeight: 800 }}>=</span>
            <span style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 6, padding: "4px 9px", color: "#15803d", fontWeight: 800 }}>+{step.contrib}</span>
          </>}
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
