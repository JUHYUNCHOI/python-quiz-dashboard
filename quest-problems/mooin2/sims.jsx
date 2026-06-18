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

  // 뒤에서부터 — moo 의 'y,y' 쌍이 뒤쪽에 있으니, 마지막 등장이 가장 뒤인 값부터 처리
  // (선생님 2026-06-18: "뒤 3,3 부터 찾아야지". 합계는 순서 무관 — 학생 직관에 맞춤).
  const ys = Object.keys(count).map(Number).filter(y => count[y] >= 2).sort((p, q) => lastSeen[q] - lastSeen[p]);
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
    steps.push({ kind: "pair", ...base, ans: ansBefore });   // 뒤에서 같은 숫자 짝 찾기 (= moo 의 y,y)
    steps.push({ kind: "count", ...base, ans: ansBefore });  // 그 짝 왼쪽에서 서로 다른 값 세기
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
      ? t(E, `A moo is (x, y, y) — its last two must be the SAME. So find the values that repeat (appear ≥ 2): {${built.ys.join(", ")}}. We'll go from the BACK (the value whose pair sits furthest right first), count the moos each makes, and add up.`,
            `moo = (x, y, y) — 뒤 두 글자가 똑같아야 해요. 그러니 2번 이상 나오는 값(반복 숫자)을 찾아요: {${built.ys.join(", ")}}. 뒤쪽 쌍부터 하나씩(맨 뒤에 짝이 있는 값부터), 값마다 moo 수를 세서 더해 갈게요.`)
      : t(E, "No value appears twice → no moos → answer 0.", "2번 이상 나오는 값이 없음 → moo 없음 → 답 0.");
  else if (step.kind === "pair")
    note = t(E,
      `Scanning from the BACK, find a same-number pair: ${step.y}, ${step.y} (i=${step.p} and i=${step.occ[step.occ.length - 1]}). These two are the moo's "y, y" — now look LEFT of them for the front x.`,
      `맨 뒤에서부터 같은 숫자 짝을 찾아요 → ${step.y}, ${step.y} (i=${step.p}, i=${step.occ[step.occ.length - 1]}). 이 둘이 moo 의 'y, y'! 이제 이 짝 왼쪽에서 맨 앞 x 를 찾아요.`);
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

  const showP = ["pair", "count", "subtract", "add"].includes(step.kind);
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

      {/* 말풍선 + 배열 — 말풍선이 배열 바로 위에서 '지금 보는 칸'을 꼬리로 가리킴
          (선생님 2026-06-18: '실제 봐야하는 시뮬 옆에 나와야지'. astral 그리드 말풍선 패턴) */}
      {(() => {
        const CW = 42;                                  // 셀 38 + gap 4
        const ARR_W = a.length * 38 + (a.length - 1) * 4;
        const boxW = Math.max(ARR_W, 320);
        const arrLeft = (boxW - ARR_W) / 2;
        const lastOcc = step.occ ? step.occ[step.occ.length - 1] : -1;
        // 꼬리가 가리킬 칸
        let focusCol;
        if (step.kind === "count") focusCol = Math.max(0, Math.floor((step.p - 1) / 2));
        else if (step.kind === "subtract") focusCol = step.occ[0];
        else if (step.kind === "pair" || step.kind === "add") focusCol = step.p;
        else focusCol = Math.floor((a.length - 1) / 2);
        const tailLeft = arrLeft + focusCol * CW + 19 - 8;  // 셀 중앙 − 꼬리 절반
        return (
          <div style={{ width: boxW, margin: "0 auto 12px" }}>
            {/* 말풍선 (아래로 꼬리) */}
            <div style={{ position: "relative", background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 14, padding: "11px 14px", fontSize: 13, color: "#92400e", lineHeight: 1.6, minHeight: 40, display: "flex", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>💬</span>
              <span>{note}</span>
              <div style={{ position: "absolute", bottom: -9, left: tailLeft, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid #fbbf24", transition: "left .2s" }} />
              <div style={{ position: "absolute", bottom: -7, left: tailLeft + 1, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "8px solid #fffbeb", transition: "left .2s" }} />
            </div>
            {/* array */}
            <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
              {a.map((v, i) => {
                const isPair = showP && (i === step.p || i === lastOcc);             // 뒤 두 개 = moo 의 y, y 쌍
                const inZone = (step.kind === "count" || step.kind === "subtract") && i < step.p; // 앞 구역
                const isDrop = step.kind === "subtract" && i < step.p && v === step.y; // 빼는 y 자신 → ✗
                let bg = "#fff", fg = C.text, bd = C.border;
                if (isDrop) { bg = "#fff"; fg = "#b91c1c"; bd = "#dc2626"; }
                else if (isPair) { bg = "#ea580c"; fg = "#fff"; bd = "#ea580c"; }
                else if (inZone) { bg = "#fef3c7"; fg = "#92400e"; bd = "#fbbf24"; }
                return (
                  <div key={i} style={{
                    position: "relative",
                    width: 38, height: 46, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", borderRadius: 8,
                    fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                    background: bg, color: fg, border: `2px solid ${bd}`,
                    opacity: isDrop ? 0.7 : 1,
                  }}>
                    <div style={{ fontSize: 9, opacity: 0.8 }}>i={i}</div>
                    <div style={{ fontSize: 14, textDecoration: isDrop ? "line-through" : "none" }}>{v}</div>
                    {isDrop && (
                      <div style={{
                        position: "absolute", top: -8, right: -8, width: 18, height: 18, borderRadius: "50%",
                        background: "#dc2626", color: "#fff", fontSize: 12, fontWeight: 900,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                      }}>✗</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

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

      {/* running total — 부가 정보라 작은 칩으로 (선생님 2026-06-18: 메인이 먼저 보여야) */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ background: "#fff7ed", border: `1.5px solid ${A}`, color: A, borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>
          {t(E, "answer so far", "현재까지 답")} <span style={{ fontSize: 16, fontWeight: 900 }}>{step.ans}</span>
        </div>
      </div>

      <SimNav idx={idx} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
    </div>
  );
}
