// New interactive sims for checkups — kept OUT of components.jsx so the
// 🔒 USACO_VERIFIED code in that file is never touched. Illustrative-only:
// the brute "feel the pain" runner that lets a student physically watch the
// O(N³) triple loop crawl as N grows.

import { useState, useRef, useEffect } from "react";
import { C, t } from "@/components/quest/theme";

const A = "#dc2626";

/* ════════════════════════════════════════════════════════════════════
   CheckupsBruteRunner — RUN the O(N³) brute force live and FEEL it crawl.
   For every (l, r) pair (≈N²/2 of them) we reverse a[l..r] and compare all
   N positions to b → O(N³) comparisons. Time-sliced with a live counter +
   Stop button so a student watches small N finish instantly, big N hang.
   ════════════════════════════════════════════════════════════════════ */
const BRUTE_PRESETS = [
  { n: 50,  label_en: "N = 50",  label_ko: "N = 50" },
  { n: 200, label_en: "N = 200", label_ko: "N = 200" },
  { n: 600, label_en: "N = 600", label_ko: "N = 600" },
];

// Deterministic a / b arrays (values in 1..N) with some natural matches.
function makeArrays(n) {
  const a = new Array(n), b = new Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = ((i * 7 + 3) % n) + 1;
    b[i] = ((i * 5 + 1) % n) + 1;
  }
  return { a, b };
}

export function CheckupsBruteRunner({ E }) {
  const [pi, setPi] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [cmp, setCmp] = useState(0);       // comparisons done
  const [pairs, setPairs] = useState(0);   // (l, r) pairs fully processed
  const [best, setBest] = useState(null);  // max checkups seen
  const [ms, setMs] = useState(0);

  const loopRef = useRef(null);   // {a, b, N, l, r, cmp, pairs, best, start}
  const timerRef = useRef(null);
  const stoppedRef = useRef(false);

  const cancel = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };
  useEffect(() => () => cancel(), []);

  const reset = () => {
    cancel();
    stoppedRef.current = true;
    setRunning(false); setDone(false); setCmp(0); setPairs(0); setBest(null); setMs(0);
    loopRef.current = null;
  };

  const run = () => {
    cancel();
    const N = BRUTE_PRESETS[pi].n;
    const { a, b } = makeArrays(N);
    loopRef.current = { a, b, N, l: 0, r: 0, cmp: 0, pairs: 0, best: 0, start: performance.now() };
    stoppedRef.current = false;
    setRunning(true); setDone(false); setCmp(0); setPairs(0); setBest(null); setMs(0);
    tick();
  };

  const stop = () => {
    stoppedRef.current = true;
    cancel();
    const st = loopRef.current;
    setRunning(false);
    if (st) { setCmp(st.cmp); setPairs(st.pairs); setBest(st.best); setMs(Math.round(performance.now() - st.start)); }
  };

  const CHUNK = 2_000_000; // inner comparisons per slice
  const tick = () => {
    const st = loopRef.current;
    if (!st || stoppedRef.current) return;
    const { a, b, N } = st;
    let { l, r, cmp, pairs, best } = st;
    let steps = 0;
    let finished = false;
    while (steps < CHUNK) {
      if (l >= N) { finished = true; break; }
      // process one full (l, r) pair: reverse a[l..r], count matches vs b
      let c = 0;
      for (let i = 0; i < N; i++) {
        const v = (i >= l && i <= r) ? a[l + r - i] : a[i];
        if (v === b[i]) c++;
        cmp++; steps++;
      }
      if (c > best) best = c;
      pairs++;
      // advance (l, r): r from l..N-1, then l++
      r++;
      if (r >= N) { l++; r = l; }
    }
    st.l = l; st.r = r; st.cmp = cmp; st.pairs = pairs; st.best = best;
    setCmp(cmp); setPairs(pairs); setBest(best);
    setMs(Math.round(performance.now() - st.start));
    if (finished) {
      setRunning(false); setDone(true);
      setMs(Math.round(performance.now() - st.start));
      return;
    }
    timerRef.current = setTimeout(tick, 0);
  };

  const N = BRUTE_PRESETS[pi].n;
  const totalPairs = (N * (N + 1)) / 2;
  const totalCmp = totalPairs * N;
  const pct = totalCmp > 0 ? Math.min(100, (cmp / totalCmp) * 100) : 0;

  // Projected time at N = 7500 (the real constraint), from this run's speed.
  const cmpPerSec = ms > 0 ? cmp / (ms / 1000) : 0;
  const bigCmp = 7500 * 7501 / 2 * 7500; // ≈ 2.11e11
  const projSec = cmpPerSec > 0 ? bigCmp / cmpPerSec : null;
  let projText = null;
  if (projSec != null) {
    if (projSec < 90) projText = t(E, `about ${Math.round(projSec)} seconds`, `약 ${Math.round(projSec)} 초`);
    else if (projSec < 5400) projText = t(E, `about ${Math.round(projSec / 60)} minutes`, `약 ${Math.round(projSec / 60)} 분`);
    else projText = t(E, `about ${Math.round(projSec / 3600)} hours`, `약 ${Math.round(projSec / 3600)} 시간`);
  }

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
            background: pi === i ? "#fee2e2" : "#fff", color: pi === i ? A : C.text,
            cursor: running ? "not-allowed" : "pointer", opacity: running && pi !== i ? 0.5 : 1,
          }}>{E ? p.label_en : p.label_ko}</button>
        ))}
      </div>

      {/* progress bar */}
      <div style={{ background: "#f1f5f9", borderRadius: 8, height: 16, overflow: "hidden", marginBottom: 8, border: `1px solid ${C.border}` }}>
        <div style={{ width: `${pct}%`, height: "100%", background: done ? "#16a34a" : A, transition: "width 0.1s linear" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#991b1b" }}>{t(E, "(l, r) pairs done", "(l, r) 쌍 처리")}</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{pairs.toLocaleString()}</div>
          <div style={{ fontSize: 9, color: C.dim }}>/ {totalPairs.toLocaleString()}</div>
        </div>
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#991b1b" }}>{t(E, "comparisons", "비교 횟수")}</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{cmp.toLocaleString()}</div>
        </div>
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#991b1b" }}>{t(E, "time", "걸린 시간")}</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{ms} ms</div>
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
            border: "none", background: "#991b1b", color: "#fff", cursor: "pointer",
          }}>■ {t(E, "Stop", "정지")}</button>
        )}
        <button onClick={reset} disabled={running} style={{
          padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700,
          border: `1.5px solid ${C.border}`, background: "#fff", color: C.text,
          cursor: running ? "not-allowed" : "pointer", opacity: running ? 0.5 : 1,
        }}>↺ {t(E, "Reset", "초기화")}</button>
      </div>

      {done && (
        <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 10, padding: "10px 13px", fontSize: 12.5, color: "#7c2d12", lineHeight: 1.7 }}>
          ✅ {t(E, `Checked all ${pairs.toLocaleString()} pairs (${cmp.toLocaleString()} comparisons) in ${ms} ms.`,
                  `${pairs.toLocaleString()} 개 쌍 (${cmp.toLocaleString()} 번 비교) 을 ${ms} ms 에 다 확인.`)}
          {projText && (
            <div style={{ marginTop: 5, fontWeight: 700, color: "#991b1b" }}>
              {t(E,
                `At this speed, the real limit N = 7,500 (≈2.1×10¹¹ comparisons) would take ${projText}. 😱`,
                `이 속도면 진짜 한계 N = 7,500 (≈2.1×10¹¹ 비교) 은 ${projText} 걸려요. 😱`)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
