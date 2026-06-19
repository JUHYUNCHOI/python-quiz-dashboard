// New interactive sims for mooin2 — kept OUT of components.jsx so the
// 🔒 USACO_VERIFIED code in that file is never touched. These are
// illustrative-only (brute "feel the pain" + the counting payoff trace).

import { useState, useRef, useEffect, useLayoutEffect } from "react";
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
          ✅ {t(E, `Finished ${ops.toLocaleString()} triples in ${ms} ms.`, `${ops.toLocaleString()}개 삼중을 ${ms} ms 에 끝냄.`)}
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
  // 기본을 '섞인' 예제로 — 앞 구역에 같은 값이 또 나와서 '하나씩 세기'가 살아남
  { name_en: "Mixed", name_ko: "섞인 예", a: [3, 1, 2, 1, 2, 3, 3] },
  { name_en: "Simple", name_ko: "쉬운 예", a: [1, 2, 3, 4, 4, 4] },
  { name_en: "−1 case", name_ko: "−1 경우", a: [4, 1, 4, 4] },
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

  // 뒤에서부터 — moo의 'y,y' 쌍이 뒤쪽에 있으니, 마지막 등장이 가장 뒤인 값부터 처리
  // (선생님 2026-06-18: "뒤 3,3 부터 찾아야지". 합계는 순서 무관 — 학생 직관에 맞춤).
  const ys = Object.keys(count).map(Number).filter(y => count[y] >= 2).sort((p, q) => lastSeen[q] - lastSeen[p]);
  const steps = [];
  steps.push({ kind: "intro", ans: 0, ys });
  if (ys.length) steps.push({ kind: "plan", ans: 0, ys });   // 긴 intro 를 둘로 나눔 (선생님 2026-06-18)
  let ans = 0;
  for (const y of ys) {
    const p = secondLast[y];
    const d0 = D[p];
    const sub = count[y] >= 3;
    const contrib = d0 - (sub ? 1 : 0);
    // 끝에서 두 번째 y 자리(p) 앞 구역(0..p-1)을 한 칸씩 훑으며 '서로 다른 값' 누적
    const scan = []; const sseen = new Set();
    for (let i = 0; i < p; i++) {
      const v = a[i];
      const isNew = !sseen.has(v);
      if (isNew) sseen.add(v);
      scan.push({ i, v, isNew, distinct: sseen.size, list: [...sseen] });
    }
    const beforeSet = scan.length ? scan[scan.length - 1].list : [];
    // y 가 나오는 모든 자리
    const occ = []; for (let i = 0; i < N; i++) if (a[i] === y) occ.push(i);

    const base = { y, cnt: count[y], p, d0, sub, contrib, occ, beforeSet };
    const ansBefore = ans;
    steps.push({ kind: "pair", ...base, ans: ansBefore });   // 뒤에서 같은 숫자 짝 찾기 (= moo의 y,y)
    // 그 짝 왼쪽을 한 칸씩 — 처음 보는 값이면 +1
    if (scan.length === 0) {
      steps.push({ kind: "scan", ...base, scan: null, distinct: 0, scanDone: true, ans: ansBefore });
    } else {
      scan.forEach((sc, k) => {
        steps.push({ kind: "scan", ...base, scan: sc, distinct: sc.distinct, scanDone: k === scan.length - 1, ans: ansBefore });
      });
    }
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
      ? t(E, `Goal: count how many different moos there are. A moo has "the same number twice at the end", so first let's find the numbers that show up 2 or more times → here that's ${built.ys.join(", ")}.`,
            `목표는 — 서로 다른 moo가 몇 개인지 세는 거예요. moo는 '뒤 두 개가 같은 숫자'죠. 그러니 먼저 2번 넘게 나오는 숫자를 찾아요 → 여기선 ${built.ys.join(", ")}예요.`)
      : t(E, "No number shows up twice, so no moo can be made. The answer is 0.", "2번 넘게 나오는 숫자가 없어서 moo를 만들 수 없어요. 답은 0이에요.");
  else if (step.kind === "plan")
    note = t(E,
      `We'll look at these numbers one by one, count how many moos each one makes, and add them up. (Let's start with the pair furthest to the right.)`,
      `이 숫자들을 하나씩 보면서, 각 숫자가 moo를 몇 개 만드는지 세서 더할 거예요. (오른쪽에 있는 짝부터 볼게요.)`);
  else if (step.kind === "pair")
    note = t(E,
      `Here's a matching pair: ${step.y} and ${step.y}. These two are the moo's "same number twice at the end". Now let's see which numbers can come before this pair.`,
      `같은 숫자 짝을 찾았어요 → ${step.y}과 ${step.y}. 이 두 개가 moo의 '뒤에 오는 같은 숫자 두 개'예요. 이제 이 짝 앞에 어떤 숫자들이 올 수 있는지 볼게요.`);
  else if (step.kind === "scan") {
    if (!step.scan)
      note = t(E, "There's nothing to the left of the pair, so no number can come before it — that's 0.",
                  "짝 왼쪽에 칸이 없어요. 앞에 올 수 있는 숫자가 없으니 0이에요.");
    else {
      const sc = step.scan;
      const head = sc.isNew
        ? t(E, `Looking left of the pair, one cell at a time: ${sc.v} is a new number here, so add one kind.`, `짝 왼쪽을 한 칸씩 봐요. ${sc.v}는 여기서 처음 보는 숫자라, 종류를 하나 더해요.`)
        : t(E, `${sc.v} we already counted, so we leave it as is.`, `${sc.v}는 아까 이미 센 숫자라 그대로 둬요.`);
      const tail = step.scanDone
        ? t(E, ` Done — ${step.d0} different numbers came before the pair.`, ` 짝 왼쪽을 다 봤어요 — 앞에 서로 다른 숫자가 ${step.d0}종류 있었네요.`)
        : t(E, ` (${sc.distinct} kinds so far)`, ` (지금까지 ${sc.distinct}종류)`);
      note = head + tail;
    }
  }
  else if (step.kind === "subtract")
    note = t(E,
      `But a moo's front number has to be different from the back two. ${step.y} itself is among those numbers before the pair, and it can't be the front number — so drop one: ${step.contrib}.`,
      `그런데 moo의 앞 숫자는 뒤 두 개랑 달라야 해요. 짝 앞에 ${step.y} 자신도 끼어 있는데, 그건 앞 숫자로 못 써요 — 그래서 하나 빼면 ${step.contrib}개예요.`);
  else if (step.kind === "add")
    note = t(E,
      `So ${step.y} can make ${step.contrib} moos. Add that to the answer so far → ${step.ans}.`,
      `그래서 ${step.y}로 만들 수 있는 moo는 ${step.contrib}개. 지금까지 답에 더하면 ${step.ans}이에요.`);
  else if (step.kind === "none")
    note = t(E, "There's nothing to add up. The answer is 0.", "더할 게 없어요. 답은 0이에요.");
  else
    note = t(E, `We've gone through every number. ${step.ans} different moos in all — that's the answer!`, `모든 숫자를 다 봤어요. 서로 다른 moo는 모두 ${step.ans}개 — 이게 답이에요!`);

  const showP = ["pair", "scan", "subtract", "add"].includes(step.kind);
  const hasFormula = ["subtract", "add"].includes(step.kind);
  const scanI = (step.kind === "scan" && step.scan) ? step.scan.i : -1;

  // 이 단계에서 '봐야 할' 배열 칸 — 말풍선이 그 칸 위로 이동 (선생님 2026-06-19:
  // '말풍선이 봐야 할 곳으로 이동해야지'. DeepAudit 과 동일한 움직이는 말풍선).
  let focusCol;
  if (step.kind === "scan") focusCol = scanI >= 0 ? scanI : step.p;
  else if (step.kind === "subtract") focusCol = step.occ[0];
  else if (step.kind === "pair" || step.kind === "add") focusCol = step.p;
  else focusCol = Math.floor((a.length - 1) / 2);   // intro·plan·none·final → 가운데

  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const bubbleRef = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0, tailX: 24, ready: false });
  useLayoutEffect(() => {
    const tc = targetRef.current, cont = containerRef.current, bub = bubbleRef.current;
    if (!tc || !cont || !bub) return;
    const cr = cont.getBoundingClientRect();
    const tr = tc.getBoundingClientRect();
    const br = bub.getBoundingClientRect();
    const cx = tr.left + tr.width / 2 - cr.left;     // 타깃 칸 가로 중심
    const tTop = tr.top - cr.top;
    let left = cx - br.width / 2;
    left = Math.max(2, Math.min(left, cr.width - br.width - 2));
    const top = Math.max(0, tTop - br.height - 12);  // 칸 위에 말풍선, 아래로 꼬리
    const tailX = Math.max(12, Math.min(cx - left - 8, br.width - 24));
    setPos({ left, top, tailX, ready: true });
  }, [safe, E, pi]);

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
          }}>{E ? p.name_en : p.name_ko}: [{p.a.join(", ")}]</button>
        ))}
      </div>

      {/* 말풍선 + 배열 — 말풍선이 배열 바로 위에서 '지금 보는 칸'을 꼬리로 가리킴
          (선생님 2026-06-18: '실제 봐야하는 시뮬 옆에 나와야지'. astral 그리드 말풍선 패턴) */}
      {(() => {
        const lastOcc = step.occ ? step.occ[step.occ.length - 1] : -1;
        // 컨테이너를 꽉 채워(배열은 가운데) 말풍선이 포커스 칸 쪽으로 충분히 미끄러질 공간 확보
        // (선생님 2026-06-19: 오른쪽 짝이면 말풍선도 오른쪽으로 가야 집중됨).
        return (
          <div ref={containerRef} style={{ position: "relative", width: "100%", margin: "0 auto 12px", paddingTop: 104 }}>
            {/* 움직이는 말풍선 — 포커스 칸 위로 이동, 아래로 꼬리 (DeepAudit 과 동일 패턴) */}
            <div ref={bubbleRef} style={{ position: "absolute", left: pos.left, top: pos.top, maxWidth: 340, zIndex: 5, background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 14, padding: "10px 13px", fontSize: 13, color: "#92400e", lineHeight: 1.55, display: "flex", gap: 7, wordBreak: "keep-all", overflowWrap: "anywhere", boxShadow: "0 5px 16px rgba(0,0,0,0.14)", opacity: pos.ready ? 1 : 0, transition: "left .28s ease, top .28s ease, opacity .15s" }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>💬</span>
              <span>{note}</span>
              <div style={{ position: "absolute", bottom: -9, left: pos.tailX, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid #fbbf24" }} />
              <div style={{ position: "absolute", bottom: -7, left: pos.tailX + 1, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "8px solid #fffbeb" }} />
            </div>
            {/* array */}
            <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
              {a.map((v, i) => {
                const isPair = showP && (i === step.p || i === lastOcc);             // 뒤 두 개 = moo의 y, y 쌍
                const inZone = step.kind === "subtract" && i < step.p;               // 앞 구역 (빼기 단계)
                const isDrop = step.kind === "subtract" && i < step.p && v === step.y; // 빼는 y 자신 → ✗
                // scan 단계: 커서 + 처음 보는 값 / 이미 본 값
                let scanState = null;          // 'cur-new' | 'cur-rep' | 'past-new' | 'past-rep' | 'future'
                if (step.kind === "scan" && i < step.p) {
                  if (i === scanI) scanState = step.scan.isNew ? "cur-new" : "cur-rep";
                  else if (i < scanI) scanState = a.slice(0, i).indexOf(v) === -1 ? "past-new" : "past-rep";
                  else scanState = "future";
                }
                let bg = "#fff", fg = C.text, bd = C.border, op = 1;
                if (isDrop) { bg = "#fff"; fg = "#b91c1c"; bd = "#dc2626"; op = 0.7; }
                else if (isPair) { bg = "#ea580c"; fg = "#fff"; bd = "#ea580c"; }
                else if (inZone) { bg = "#fef3c7"; fg = "#92400e"; bd = "#fbbf24"; }
                else if (scanState === "cur-new") { bg = "#dcfce7"; fg = "#15803d"; bd = "#16a34a"; }
                else if (scanState === "cur-rep") { bg = "#f3f4f6"; fg = "#6b7280"; bd = "#9ca3af"; }
                else if (scanState === "past-new") { bg = "#fef3c7"; fg = "#92400e"; bd = "#fbbf24"; }
                else if (scanState === "past-rep") { bg = "#fff"; fg = "#9ca3af"; bd = "#e5e7eb"; op = 0.7; }
                else if (scanState === "future") { bg = "#fff"; fg = "#c4c4c4"; bd = "#eee"; op = 0.55; }
                const badge = scanState === "cur-new" ? "+1" : (scanState === "cur-rep" ? "=" : (isDrop ? "✗" : null));
                const badgeBg = scanState === "cur-new" ? "#16a34a" : (scanState === "cur-rep" ? "#9ca3af" : "#dc2626");
                return (
                  <div key={i} ref={i === focusCol ? targetRef : null} style={{
                    position: "relative",
                    width: 38, height: 46, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", borderRadius: 8,
                    fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                    background: bg, color: fg, border: `2px solid ${bd}`,
                    opacity: op, transition: "background .15s, border-color .15s",
                  }}>
                    <div style={{ fontSize: 9, opacity: 0.8 }}>i={i}</div>
                    <div style={{ fontSize: 14, textDecoration: isDrop ? "line-through" : "none" }}>{v}</div>
                    {badge && (
                      <div style={{
                        position: "absolute", top: -8, right: -8, minWidth: 18, height: 18, padding: "0 3px", borderRadius: 9,
                        background: badgeBg, color: "#fff", fontSize: 11, fontWeight: 900,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                      }}>{badge}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* scan 단계 — 서로 다른 값을 하나씩 세는 카운터 + 모은 값 칩 */}
      {step.kind === "scan" && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#ecfdf5", border: "1.5px solid #16a34a", borderRadius: 999, padding: "4px 12px" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#15803d" }}>{t(E, "different values", "서로 다른 값")}</span>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#15803d" }}>{step.distinct}</span>
          </div>
          {step.scan && step.scan.list.length > 0 && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
              {step.scan.list.map((val, k) => (
                <span key={k} style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800,
                  background: "#fff", border: "1.5px solid #16a34a", color: "#15803d",
                  borderRadius: 6, padding: "2px 8px",
                }}>{val}</span>
              ))}
            </div>
          )}
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
