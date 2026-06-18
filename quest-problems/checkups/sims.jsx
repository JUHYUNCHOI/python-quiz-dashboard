// New interactive sims for checkups — kept OUT of components.jsx so the
// 🔒 USACO_VERIFIED code in that file is never touched. Illustrative-only:
// the brute "feel the pain" runner that lets a student physically watch the
// O(N³) triple loop crawl as N grows.

import { useState, useRef, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

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

/* ════════════════════════════════════════════════════════════════════
   CheckupsIntroSim — step through ONE example with speech bubbles.
   Walks spot-by-spot ("top 1 = bottom 1 → treat ✓"), tallies, then flips
   a chunk and re-walks — so a kid SEES what "checked" and "flip" mean.
   Illustrative-only; lives outside the 🔒 USACO_VERIFIED components.jsx.
   ════════════════════════════════════════════════════════════════════ */
// 6 마리 + palindrom 식 단계별 reverse — 양끝 짝부터 안쪽으로 한 쌍씩 (선생님 피드백).
const _A6 = [1, 2, 3, 4, 5, 6];   // 소가 가진 종 (전부 달라서 reverse 가 또렷이 보임)
const _B6 = [1, 2, 4, 4, 2, 6];   // 수의사가 정해둔 종
const _N6 = 6;
const _L = 1, _R = 4;             // 뒤집을 구간 (0-idx 슬롯) = 자리 2~5. 1·6번은 그대로!
const _SWAPS = (() => { const s = []; for (let i = _L, j = _R; i < j; i++, j--) s.push([i, j]); return s; })();  // [[1,4],[2,3]]

const _SP = {
  1: { bg: "#fef3c7", tx: "#92400e", bd: "#fcd34d" },  // amber
  2: { bg: "#dbeafe", tx: "#1e3a8a", bd: "#93c5fd" },  // blue
  3: { bg: "#fce7f3", tx: "#9d174d", bd: "#f9a8d4" },  // pink
  4: { bg: "#dcfce7", tx: "#14532d", bd: "#86efac" },  // green
  5: { bg: "#ede9fe", tx: "#5b21b6", bd: "#c4b5fd" },  // purple
  6: { bg: "#ffedd5", tx: "#9a3412", bd: "#fdba74" },  // orange
};

const _CW = 36, _GAP = 7, _STEP = _CW + _GAP, _LAB = 84;

function _IntroCell({ v, focus, moving, size = _CW }) {
  const sp = _SP[v] || _SP[1];
  return (
    <div style={{
      width: size, height: size, borderRadius: 9,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: Math.round(size * 0.45),
      background: sp.bg, color: sp.tx,
      border: `${focus || moving ? 2 : 1.5}px ${moving ? "dashed" : "solid"} ${focus ? "#dc2626" : (moving ? "#3b82f6" : sp.bd)}`,
      boxShadow: focus ? "0 0 0 3px rgba(220,38,38,.22)" : (moving ? "0 0 0 3px rgba(59,130,246,.2)" : "none"),
    }}>{v}</div>
  );
}

// perm[id] = 소 id 가 있는 슬롯. 누적 swap 으로 reverse 만들기.
function _perms() {
  const list = [];
  let cur = _A6.map((_, i) => i);   // 항등: 소 i 가 슬롯 i
  list.push(cur.slice());
  for (const [i, j] of _SWAPS) {
    cur = cur.slice();
    const ci = cur.indexOf(i), cj = cur.indexOf(j);   // 슬롯 i·j 에 있는 소
    cur[ci] = j; cur[cj] = i;
    list.push(cur.slice());
  }
  return list;   // [항등, 1번swap후, 2번후, 3번후(완전 reverse)]
}
function _arrFromPerm(perm) { const arr = new Array(_N6); for (let id = 0; id < _N6; id++) arr[perm[id]] = _A6[id]; return arr; }

function _buildIntroSteps(E) {
  const perms = _perms();
  const finalP = perms[perms.length - 1];
  const steps = [];
  const ck = (arr, s) => {
    const same = arr[s] === _B6[s];
    return t(E,
      `Spot ${s + 1}: top ${arr[s]}, bottom ${_B6[s]} → ${same ? "same → treat ✓" : "different → skip"}`,
      `${s + 1} 번 자리: 위 ${arr[s]}, 아래 ${_B6[s]} → ${same ? "같음 → 치료 ✓" : "다름 → 그냥 지나감"}`);
  };
  const A0 = _arrFromPerm(perms[0]);
  // 1) 자리마다 비교 (네모 없음)
  steps.push({ perm: perms[0], arr: A0, focus: -1, revealed: -1, swap: null, box: null,
    bubble: t(E, "Top = each cow's species. Bottom = the species the vet wants here. Let's check spot by spot!",
                 "윗줄 = 각 소가 가진 종, 아랫줄 = 이 자리에서 수의사가 원하는 종. 자리마다 비교해봐요!") });
  for (let s = 0; s < _N6; s++) steps.push({ perm: perms[0], arr: A0, focus: s, revealed: s, swap: null, box: null, bubble: ck(A0, s) });
  steps.push({ perm: perms[0], arr: A0, focus: -1, revealed: _N6 - 1, swap: null, box: null,
    bubble: t(E, "4 cows treated — spots 1, 2, 4, 6.", "4 마리 치료 — 1·2·4·6 번 자리.") });
  // 2) 뒤집을 구간을 네모로 먼저 표시 (아직 안 뒤집음 — 선생님 요청)
  steps.push({ perm: perms[0], arr: A0, focus: -1, revealed: -1, swap: null, box: [_L, _R],
    bubble: t(E, "This time we reverse only spots 2–5 (red box). Spots 1 & 6 are outside — they stay put!",
                 "이번엔 2~5 번 자리(빨간 네모)만 뒤집을 거예요. 1번·6번은 네모 밖이라 그대로!") });
  // 3) 네모 안에서 양끝부터 한 쌍씩 swap
  const swapBubble = [
    t(E, "Box ends: spot 2 ↔ spot 5 swap places.", "네모 양끝: 2번 자리 ↔ 5번 자리 바꿈."),
    t(E, "Box middle: spot 3 ↔ spot 4. Done — spots 2–5 are reversed!", "네모 안쪽: 3번 ↔ 4번. 끝 — 2~5번이 거꾸로 됐어요!"),
  ];
  for (let k = 0; k < _SWAPS.length; k++) {
    const p = perms[k + 1];
    steps.push({ perm: p, arr: _arrFromPerm(p), focus: -1, revealed: -1, swap: _SWAPS[k], box: [_L, _R], bubble: swapBubble[k] });
  }
  // 4) 다시 비교 (네모 유지)
  const AF = _arrFromPerm(finalP);
  for (let s = 0; s < _N6; s++) steps.push({ perm: finalP, arr: AF, focus: s, revealed: s, swap: null, box: [_L, _R], bubble: ck(AF, s) });
  steps.push({ perm: finalP, arr: AF, focus: -1, revealed: _N6 - 1, swap: null, box: [_L, _R],
    bubble: t(E, "Again 4 treated — spots 1 & 6 stayed (outside the box), but inside, 2 & 4 → 3 & 5! Reversing a range changes WHO gets treated.",
                 "또 4 마리 — 1·6번은 그대로(네모 밖), 네모 안은 2·4번 → 3·5번! 구간을 뒤집으면 치료받는 소가 바뀌어요.") });
  return steps;
}

export function CheckupsIntroSim({ E }) {
  const steps = _buildIntroSteps(E);
  const { idx, safe, setIdx, total } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const treated = [];
  for (let s = 0; s <= st.revealed; s++) if (st.arr[s] === _B6[s]) treated.push(s);

  const gridW = _N6 * _CW + (_N6 - 1) * _GAP;
  const rowL = (node, color, label, sub) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
      <div style={{ width: _LAB, textAlign: "right", fontSize: 11, fontWeight: 600, color, lineHeight: 1.2 }}>
        {label}<div style={{ fontSize: 9, color: C.dim, fontWeight: 400 }}>{sub}</div>
      </div>
      {node}
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10 }}>
        🔍 {t(E, "Walk through it — step by step", "한 단계씩 따라가 보기")}
      </div>

      {/* 말풍선 */}
      <div style={{ position: "relative", maxWidth: 460, margin: "0 auto 8px" }}>
        <div style={{
          background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 12,
          padding: "10px 13px", fontSize: 12.5, color: "#92400e", lineHeight: 1.6, minHeight: 40,
          display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600,
          wordBreak: "keep-all", overflowWrap: "break-word",
        }}>
          💬 {st.bubble}
        </div>
        <div style={{ width: 0, height: 0, margin: "0 auto",
          borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
          borderTop: "9px solid #fbbf24" }} />
      </div>

      {/* 격자 */}
      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 10px", width: "fit-content", maxWidth: "100%", overflowX: "auto", margin: "0 auto 12px" }}>
        {/* 윗줄 a — 절대위치 소들이 swap 때 한 쌍씩 슬라이드 */}
        {rowL(
          <div style={{ position: "relative", width: gridW, height: _CW }}>
            {/* 뒤집을 구간 네모 표시 */}
            {st.box && (
              <div style={{
                position: "absolute", top: -5, height: _CW + 10,
                left: st.box[0] * _STEP - 5,
                width: (st.box[1] - st.box[0] + 1) * _CW + (st.box[1] - st.box[0]) * _GAP + 10,
                border: "2.5px dashed #dc2626", borderRadius: 11, pointerEvents: "none",
                transition: "all .3s", zIndex: 3,
              }} />
            )}
            {_A6.map((v, id) => {
              const slot = st.perm[id];
              return (
                <div key={id} style={{ position: "absolute", top: 0, left: slot * _STEP, transition: "left .6s cubic-bezier(.4,0,.2,1)", zIndex: 1 }}>
                  <_IntroCell v={v} focus={st.focus === slot} moving={!!st.swap && st.swap.includes(slot)} />
                </div>
              );
            })}
          </div>,
          "#7f1d1d", t(E, "🐄 has", "🐄 가진 종"), "a"
        )}
        {/* 아랫줄 b — 고정 */}
        {rowL(
          <div style={{ display: "flex", gap: _GAP }}>
            {_B6.map((v, s) => <_IntroCell key={s} v={v} focus={st.focus === s} />)}
          </div>,
          "#1e40af", t(E, "📋 wants", "📋 원하는 종"), "b"
        )}
        {/* 치료 마커 */}
        {rowL(
          <div style={{ display: "flex", gap: _GAP }}>
            {Array.from({ length: _N6 }, (_, s) => {
              const shown = s <= st.revealed;
              const ok = st.arr[s] === _B6[s];
              return (
                <div key={s} style={{
                  width: _CW, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700,
                  background: shown && ok ? "#22c55e" : "transparent",
                  color: shown ? (ok ? "#fff" : "#cbd5e1") : "transparent",
                }}>{shown ? (ok ? "✓" : "—") : ""}</div>
              );
            })}
          </div>,
          "#15803d", "💉 " + t(E, "treat?", "치료?"), ""
        )}
        {/* 자리 번호 */}
        {rowL(
          <div style={{ display: "flex", gap: _GAP }}>
            {Array.from({ length: _N6 }, (_, s) => (
              <div key={s} style={{ width: _CW, textAlign: "center", fontSize: 10, color: C.dim }}>{s + 1}</div>
            ))}
          </div>,
          C.dim, "", ""
        )}
      </div>

      {/* 현재까지 치료 수 */}
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "#15803d", marginBottom: 10 }}>
        {t(E, "treated so far", "지금까지 치료")}: <span style={{ fontSize: 18 }}>{treated.length}</span>
      </div>

      <SimNav idx={idx} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
    </div>
  );
}
