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

/* ════════════════════════════════════════════════════════════════════
   CheckupsFastSim — the "한 자리" payoff. Caps Chapter 3 after the three
   layering sims (diagonal / outside / inside): for ONE window (l, r) it
   combines OUTSIDE + INSIDE in a single stepped panel, so the student
   watches checkups = outside + inside computed in one place.
   Reuses the intro's a/b data + cell colours. Illustrative-only.
   ════════════════════════════════════════════════════════════════════ */
const _FL = 1, _FR = 4;          // 뒤집을 윈도우 (0-idx) = 자리 2~5 (인트로와 동일)
const _FS = _FL + _FR;           // 대각선 합 s = 5

function _fastInfo(i) {
  const outside = i < _FL || i > _FR;
  const lands = outside ? _A6[i] : _A6[_FS - i];   // 뒤집은 뒤 자리 i 에 오는 값
  return { outside, lands, match: lands === _B6[i] };
}

function _buildFastSteps(E) {
  const N = _A6.length;
  let outCount = 0, inCount = 0;
  const outSpots = [], inMatchSpots = [];
  for (let i = 0; i < N; i++) {
    const f = _fastInfo(i);
    if (f.outside) { outSpots.push(i + 1); if (f.match) outCount++; }
    else { if (f.match) { inCount++; inMatchSpots.push(i + 1); } }
  }
  return [
    { zone: null, flip: false, reveal: "none", tally: {},
      bubble: t(E,
        `One window (l, r) = spots ${_FL + 1}–${_FR + 1}. Instead of re-counting all N spots, split it: checkups = OUTSIDE + INSIDE.`,
        `윈도우 (l, r) = 자리 ${_FL + 1}~${_FR + 1} 하나. N 자리를 다시 다 세지 말고 나눠요: 검진 수 = 바깥 + 안쪽.`) },
    { zone: "outside", flip: false, reveal: "none", tally: {},
      bubble: t(E,
        `OUTSIDE the box (spots ${outSpots.join(", ")}) nothing flips. A spot counts when a[i] = b[i] — the SAME for every window.`,
        `네모 바깥(자리 ${outSpots.join(", ")})은 안 뒤집혀요. a[i] = b[i] 면 일치 — 모든 윈도우에서 똑같아요.`) },
    { zone: "outside", flip: false, reveal: "outside", tally: { out: outCount },
      bubble: t(E,
        `Outside matches = ${outCount}. Since it never changes, one prefix gives this instantly.`,
        `바깥 일치 = ${outCount}개. 안 변하니까 prefix 한 번이면 바로 읽혀요.`) },
    { zone: "inside", flip: true, reveal: "outside", tally: { out: outCount },
      bubble: t(E,
        `INSIDE the box it flips: spot i now holds a[${_FS}−i] (diagonal s = ${_FS}). Compare that to b[i].`,
        `네모 안은 뒤집혀요: 자리 i 에 a[${_FS}−i] 가 와요 (대각선 s = ${_FS}). 그걸 b[i] 와 비교해요.`) },
    { zone: "inside", flip: true, reveal: "all", tally: { out: outCount, inn: inCount },
      bubble: t(E,
        `Inside matches = ${inCount} (spots ${inMatchSpots.join(", ")}). Same diagonal → read it from the diagonal prefix.`,
        `안쪽 일치 = ${inCount}개 (자리 ${inMatchSpots.join(", ")}). 같은 대각선이라 대각선 prefix 에서 읽어요.`) },
    { zone: null, flip: true, reveal: "all", tally: { out: outCount, inn: inCount, total: outCount + inCount },
      bubble: t(E,
        `Checkups = outside ${outCount} + inside ${inCount} = ${outCount + inCount}. Same answer as brute — but two lookups, O(1)!`,
        `검진 수 = 바깥 ${outCount} + 안쪽 ${inCount} = ${outCount + inCount}. brute 와 똑같은 답 — 근데 조회 두 번, O(1)!`) },
  ];
}

export function CheckupsFastSim({ E }) {
  const steps = _buildFastSteps(E);
  const { idx, safe, setIdx, total } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const N = _A6.length;
  const GAP = 8, STEP = _CW + GAP;

  const inWindow = i => i >= _FL && i <= _FR;
  const dimFor = i => st.zone === "outside" ? inWindow(i) : (st.zone === "inside" ? !inWindow(i) : false);
  const matchShown = i => st.reveal === "all" ? true : (st.reveal === "outside" ? !inWindow(i) : false);
  const aVal = i => (st.flip && inWindow(i)) ? _A6[_FS - i] : _A6[i];

  const cell = (val, dim) => {
    const sp = _SP[val] || _SP[1];
    return (
      <div style={{
        width: _CW, height: _CW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16,
        background: dim ? "#f8fafc" : sp.bg, color: dim ? "#cbd5e1" : sp.tx,
        border: `1.5px solid ${dim ? "#e2e8f0" : sp.bd}`, transition: "all .25s",
      }}>{val}</div>
    );
  };
  const tallyBox = (label, val, bg, bd, tc, big) => (
    <div style={{ background: bg, border: `1.5px solid ${bd}`, borderRadius: 9, padding: "6px 14px", textAlign: "center", minWidth: 62 }}>
      <div style={{ fontSize: 10, color: tc, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: big ? 20 : 18, fontWeight: 800, color: tc, fontFamily: "'JetBrains Mono',monospace" }}>{val != null ? val : "—"}</div>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10 }}>
        🎯 {t(E, "Count ONE window — all in one place", "한 윈도우를 한 자리에서 세보기")}
      </div>

      {/* 말풍선 */}
      <div style={{ position: "relative", maxWidth: 470, margin: "0 auto 10px" }}>
        <div style={{
          background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 12,
          padding: "10px 13px", fontSize: 12.5, color: "#92400e", lineHeight: 1.6, minHeight: 40,
          display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600,
          wordBreak: "keep-all", overflowWrap: "break-word",
        }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto",
          borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "9px solid #fbbf24" }} />
      </div>

      {/* 격자 */}
      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 10px", width: "fit-content", maxWidth: "100%", overflowX: "auto", margin: "0 auto 12px" }}>
        {/* a 줄 (윈도우 네모 + flip) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <div style={{ width: 64, textAlign: "right", fontSize: 11, fontWeight: 600, color: "#7f1d1d" }}>
            🐄 {t(E, "has", "가진")}<div style={{ fontSize: 9, color: C.dim, fontWeight: 400 }}>a{st.flip ? t(E, " (flip)", " (뒤집힘)") : ""}</div>
          </div>
          <div style={{ position: "relative", display: "flex", gap: GAP }}>
            <div style={{
              position: "absolute", top: -5, height: _CW + 10,
              left: _FL * STEP - 5, width: (_FR - _FL + 1) * _CW + (_FR - _FL) * GAP + 10,
              border: `2.5px ${st.flip ? "solid" : "dashed"} ${st.zone === "inside" ? "#0891b2" : "#dc2626"}`,
              borderRadius: 11, pointerEvents: "none", transition: "all .25s", zIndex: 3,
            }} />
            {Array.from({ length: N }, (_, i) => <div key={i}>{cell(aVal(i), dimFor(i))}</div>)}
          </div>
        </div>
        {/* b 줄 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <div style={{ width: 64, textAlign: "right", fontSize: 11, fontWeight: 600, color: "#1e40af" }}>
            📋 {t(E, "wants", "원하는")}<div style={{ fontSize: 9, color: C.dim, fontWeight: 400 }}>b</div>
          </div>
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: N }, (_, i) => <div key={i}>{cell(_B6[i], dimFor(i))}</div>)}
          </div>
        </div>
        {/* 일치 줄 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <div style={{ width: 64, textAlign: "right", fontSize: 11, fontWeight: 600, color: "#15803d" }}>💉 {t(E, "match?", "일치?")}</div>
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: N }, (_, i) => {
              const shown = matchShown(i), ok = _fastInfo(i).match, cyan = inWindow(i);
              return (
                <div key={i} style={{
                  width: _CW, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800,
                  background: shown && ok ? (cyan ? "#0891b2" : "#22c55e") : "transparent",
                  color: shown ? (ok ? "#fff" : "#cbd5e1") : "transparent", transition: "all .2s",
                }}>{shown ? (ok ? "✓" : "—") : ""}</div>
              );
            })}
          </div>
        </div>
        {/* 자리 번호 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 64 }} />
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: N }, (_, i) => (
              <div key={i} style={{ width: _CW, textAlign: "center", fontSize: 10, color: inWindow(i) ? "#0e7490" : C.dim, fontWeight: inWindow(i) ? 700 : 400 }}>{i + 1}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 집계: 바깥 + 안쪽 = 검진 수 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {tallyBox(t(E, "outside", "바깥"), st.tally.out, "#f1f5f9", "#cbd5e1", "#475569")}
        <div style={{ fontSize: 18, fontWeight: 800, color: C.dim }}>+</div>
        {tallyBox(t(E, "inside", "안쪽"), st.tally.inn, "#ecfeff", "#67e8f9", "#0891b2")}
        <div style={{ fontSize: 18, fontWeight: 800, color: C.dim }}>=</div>
        {tallyBox(t(E, "checkups", "검진 수"), st.tally.total, st.tally.total != null ? "#dcfce7" : "#f8fafc", st.tally.total != null ? "#86efac" : "#e2e8f0", "#15803d", true)}
      </div>

      <SimNav idx={idx} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CheckupsMirrorSim — the key observation as STEPPED speech bubbles, not a
   text wall. (선생님 2026-06-22: '설명 넘 많다 — 시뮬 말풍선으로 한 번에 하나씩')
   Positions 1..N flip end-inward; every pair sums to s = l+r; same s ⇒ same
   inside-work ⇒ count once & reuse ⇒ N× faster. Illustrative-only.
   ════════════════════════════════════════════════════════════════════ */
const _MN = 6;              // 자리 개수
const _ML = 2, _MR = 5;     // 윈도우 (1-idx 자리) = 2~5
const _MS = _ML + _MR;      // s = 7
const _MB = [1, 3, 4, 1, 2, 6];        // 📋 수의사가 원하는 종 (A,C,D,A,B,F)
const _MAFINAL = [1, 5, 4, 3, 2, 6];   // 뒤집은 뒤 각 자리의 소 (a' = A,E,D,C,B,F) — _MB 와 같으면 검진 ✓

// 윈도우 [l,r] 안에서 토큰 tk 의 현재 슬롯(0-idx). rev = 바깥부터 뒤집은 짝 수 (0=원본).
function _slotG(tk, l, r, rev) {
  if (tk < l || tk > r) return tk - 1;
  const depth = Math.min(tk - l, r - tk);
  return rev > depth ? (l + r - tk) - 1 : tk - 1;
}
// 윈도우 [l,r] 완전히 뒤집은 뒤 자리 p 에 오는 소(토큰)
function _tokAt(p, l, r) { return (p >= l && p <= r) ? (l + r - p) : p; }

function _buildMirrorSteps(E) {
  const before = [];                       // 뒤집기 전(원본) 검진받는 자리
  for (let p = 1; p <= _MN; p++) if (p === _MB[p - 1]) before.push(p);
  const after = [];                        // 윈도우 [_ML,_MR] 뒤집은 뒤 검진받는 자리
  for (let p = 1; p <= _MN; p++) if (_tokAt(p, _ML, _MR) === _MB[p - 1]) after.push(p);
  const gained = after.filter(p => !before.includes(p));   // 새로 검진받게 된 자리
  return [
    // 1) 무대 + 목표
    { win: [_ML, _MR], rev: 0, reveal: "none", focus: null, formula: false, payoff: false,
      bubble: t(E, `🐄 cows in a row (A–F = breeds). 📋 the vet wants a breed at each spot — match = checkup ✓. Goal: reverse spots ${_ML}–${_MR} to get MORE checkups.`,
                   `🐄 소들이 줄 서 있어요 (A~F=종류). 📋 수의사가 자리마다 원하는 종이 있고, 같으면 검진 ✓. 목표: 자리 ${_ML}~${_MR}를 뒤집어서 검진을 더 받게 하기.`) },
    // 2) 뒤집기 전 검진 (Q1: 원래 검진받던 소)
    { win: [_ML, _MR], rev: 0, reveal: "all", focus: null, formula: false, payoff: false,
      bubble: t(E, `BEFORE reversing: checkups are spots ${before.join(", ")} — only ${before.length}.`,
                   `뒤집기 전 — 검진 ✓ 는 자리 ${before.join("·")}, ${before.length}마리뿐이에요.`) },
    // 3) 뒤집기 (바깥)
    { win: [_ML, _MR], rev: 1, reveal: "none", focus: null, formula: false, payoff: false,
      bubble: t(E, `Reverse spots ${_ML}–${_MR}: the outer two cows slide and swap (spot ${_ML} ↔ ${_MR}).`,
                   `자리 ${_ML}~${_MR} 뒤집기 — 바깥 두 소가 미끄러지며 자리 바꿈 (자리 ${_ML} ↔ ${_MR}).`) },
    // 4) 뒤집기 (안쪽)
    { win: [_ML, _MR], rev: 2, reveal: "none", focus: null, formula: false, payoff: false,
      bubble: t(E, `Inner two too (spot ${_ML + 1} ↔ ${_MR - 1}). Reversed!`,
                   `안쪽 둘도 (자리 ${_ML + 1} ↔ ${_MR - 1}). 다 뒤집혔어요!`) },
    // 5) 뒤집은 후 검진 (Q2: 어떻게 바뀌었나)
    { win: [_ML, _MR], rev: 2, reveal: "all", focus: null, formula: false, payoff: false,
      bubble: t(E, `AFTER: checkups are spots ${after.join(", ")} — ${after.length}! Spots ${gained.join(", ")} newly matched.`,
                   `뒤집은 후 — 검진 ✓ 는 자리 ${after.join("·")}, ${after.length}마리! 자리 ${gained.join("·")}가 새로 맞았어요.`) },
    // 6) 뒤집기 = 짝지어 자리 바꾸기. 짝의 합은 늘 s
    { win: [_ML, _MR], rev: 2, reveal: "none", focus: null, formula: true, payoff: false,
      bubble: t(E, `Reversing just swaps cows in PAIRS: spot 2 ↔ 5, spot 3 ↔ 4. Add each pair's spots — always 7 (= the ends' sum s).`,
                   `뒤집기는 자리끼리 짝지어 바꾸는 거예요: 자리 2 ↔ 5, 자리 3 ↔ 4. 각 짝의 두 자리를 더하면? 늘 7 (= 양 끝 합 s)!`) },
    // 7) 그래서 자리 3 의 짝꿍 = 7−3 = 자리 4 → 자리 3 엔 자리 4 소가 옴
    { win: [_ML, _MR], rev: 2, reveal: "inside", focus: 3, formula: true, payoff: false,
      bubble: t(E, `So spot 3's partner = the spot that sums to 7 = spot 4. After reversing, spot 3 holds spot 4's cow: D.`,
                   `그러니 자리 3 의 짝꿍 = 더해서 7 되는 자리 = 자리 4. 뒤집으면 자리 3 엔 자리 4 의 소 D 가 와요.`) },
    // 8) 다른 뒤집기도 합이 같음
    { win: [3, 4], rev: 0, reveal: "none", focus: null, formula: false, payoff: false,
      bubble: t(E, `Now a DIFFERENT reversal — spots 3–4. Its ends add to 3 + 4 = 7 too, same s!`,
                   `이번엔 다른 뒤집기 — 자리 3~4. 양 끝을 더하면 3 + 4 = 7, s 가 똑같죠!`) },
    // 9) 같은 짝꿍 → 같은 소 → 같은 검진
    { win: [3, 4], rev: 1, reveal: "inside", focus: 3, formula: true, payoff: false,
      bubble: t(E, `Here too, spot 3's partner sums to 7 → spot 4 → cow D again! Same s ⇒ same partner ⇒ same cow ⇒ same checkup.`,
                   `여기서도 자리 3 의 짝꿍은 더해서 7 = 자리 4 → 또 소 D! s 가 같으면 짝꿍이 같고 → 오는 소도 같고 → 검진도 같아요.`) },
    // 10) payoff
    { win: [3, 4], rev: 1, reveal: "inside", focus: null, formula: false, payoff: true,
      bubble: t(E, `So the window's size doesn't matter — only s. Count the inside checkups once per s, reuse for every window → N× faster! 🚀`,
                   `그래서 뒤집는 구간 크기는 상관없고 s 만 중요해요. s 마다 안쪽 검진을 한 번만 세서 모든 윈도우에 다 쓰면 → N배 빨라요! 🚀`) },
  ];
}

export function CheckupsMirrorSim({ E }) {
  const steps = _buildMirrorSteps(E);
  const { idx, safe, setIdx, total } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const [wl, wr] = st.win;
  const TW = 44, STEP = 52, GAP = STEP - TW, LAB = 56;
  const gridW = _MN * STEP - GAP;
  const ltr = tk => String.fromCharCode(64 + tk);
  const inWin = p => p >= wl && p <= wr;
  const ckShow = p => st.reveal === "all" ? true : (st.reveal === "inside" ? inWin(p) : false);
  // 현재 뒤집힘(st.rev) 상태에서 자리 p 에 있는 소(토큰) — 뒤집기 전엔 원본, 후엔 거울
  const tokAtSpotNow = p => { for (let tk = 1; tk <= _MN; tk++) if (_slotG(tk, wl, wr, st.rev) + 1 === p) return tk; return p; };
  const ckOk = p => tokAtSpotNow(p) === _MB[p - 1];

  const rowWrap = (label, color, node) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
      <div style={{ width: LAB, textAlign: "right", fontSize: 10.5, fontWeight: 700, color, lineHeight: 1.1 }}>{label}</div>
      {node}
    </div>
  );
  const fixedCell = (tk, hot = false) => {
    const sp = _SP[tk] || _SP[1];
    return (
      <div style={{ width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, background: sp.bg, color: sp.tx, border: `${hot ? 2.5 : 1.5}px solid ${hot ? "#ea580c" : sp.bd}`, boxShadow: hot ? "0 0 0 3px rgba(234,88,12,.2)" : "none" }}>{ltr(tk)}</div>
    );
  };
  // 짝꿍 자리 = 합이 s 되는 자리 (focus 의 짝). 통찰 스텝에서 '뒤집기 전' 줄에 강조.
  const partner = st.focus != null ? _MS - st.focus : null;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 10 }}>
        🩺 {t(E, "Count the cows that get a checkup", "검진받는 소를 세 보기")}
      </div>

      {/* 말풍선 */}
      <div style={{ position: "relative", maxWidth: 480, margin: "0 auto 16px" }}>
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      {/* 격자: 🐄 a(슬라이드) / 📋 b / 검진? / 자리 — 목표(검진 세기)를 계속 보여줌 */}
      <div style={{ width: "fit-content", margin: "0 auto" }}>
        {rowWrap(t(E, "🐄 cow", "🐄 소"), "#7f1d1d",
          <div style={{ position: "relative", width: gridW, height: TW }}>
            <div style={{ position: "absolute", top: -4, left: (wl - 1) * STEP - 4, width: (wr - wl + 1) * STEP - GAP + 8, height: TW + 8, borderRadius: 11, background: "#ecfeff", border: "1.5px dashed #67e8f9", zIndex: 0, transition: "left .4s, width .4s" }} />
            {[1, 2, 3, 4, 5, 6].map(tk => {
              const slot = _slotG(tk, wl, wr, st.rev), sp = _SP[tk] || _SP[1];
              const hot = st.focus != null && slot + 1 === st.focus;
              return (
                <div key={"t" + tk} style={{ position: "absolute", top: 0, left: slot * STEP, width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, background: sp.bg, color: sp.tx, border: `${hot ? 2.5 : 1.5}px solid ${hot ? "#ea580c" : sp.bd}`, boxShadow: hot ? "0 0 0 3px rgba(234,88,12,.2)" : "none", transition: "left .55s cubic-bezier(.4,0,.2,1), border-color .2s, box-shadow .2s", zIndex: 1 }}>{ltr(tk)}</div>
              );
            })}
          </div>
        )}
        {st.formula && rowWrap(t(E, "↩️ before", "↩️ 뒤집기 전"), "#9a3412",
          <div style={{ display: "flex", gap: GAP }}>{[1, 2, 3, 4, 5, 6].map(p => <div key={p}>{fixedCell(p, partner === p)}</div>)}</div>
        )}
        {rowWrap(t(E, "📋 wants", "📋 원하는"), "#1e40af",
          <div style={{ display: "flex", gap: GAP }}>{_MB.map((tk, k) => <div key={k}>{fixedCell(tk)}</div>)}</div>
        )}
        {rowWrap(t(E, "🩺 ✓?", "🩺 검진?"), "#15803d",
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: _MN }, (_, k) => {
              const p = k + 1, show = ckShow(p), ok = ckOk(p);
              return <div key={k} style={{ width: TW, height: 24, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, background: show && ok ? "#22c55e" : "transparent", color: show ? (ok ? "#fff" : "#cbd5e1") : "transparent", transition: "background .2s" }}>{show ? (ok ? "✓" : "—") : ""}</div>;
            })}
          </div>
        )}
        {rowWrap("", C.dim,
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: _MN }, (_, k) => {
              const win = inWin(k + 1);
              return <div key={k} style={{ width: TW, textAlign: "center", fontSize: 9.5, color: win ? "#0e7490" : C.dim, fontWeight: win ? 700 : 400 }}>{t(E, "spot", "자리")} {k + 1}</div>;
            })}
          </div>
        )}
      </div>

      {/* 공식 줄 (insight — 자리 번호끼리의 관계) */}
      <div style={{ textAlign: "center", minHeight: 20, margin: "10px 0 4px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>
        {st.formula && (
          <span style={{ fontSize: 13, color: "#0e7490" }}>{t(E, "a spot + its partner", "자리 + 짝꿍")} = s = {_MS}</span>
        )}
      </div>

      <SimNav idx={idx} total={total} onIdx={setIdx} accent="#0891b2" showLabels isEn={E} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CheckupsOutPrefixSim — 바깥 검진을 'prefix(미리 누적)'로 빨리 세기.
   말풍선 stepped (선생님 2026-06-22: '말풍선으로 하나씩 쉽게'). 윈도우 바깥은 안 변하니
   '여기까지 ✓ 몇 개' 를 한 번 적어두면 어떤 윈도우든 빼기 두 번으로 바깥 검진을 구함.
   ════════════════════════════════════════════════════════════════════ */
const _PFCK = [1, 0, 1, 1, 0, 1];   // 바깥 기준 검진 (a[i]=b[i]) — 1=✓
const _PF = (() => { const p = []; let s = 0; for (let i = 0; i < 6; i++) { s += _PFCK[i]; p.push(s); } return p; })();  // 누적 [1,1,2,3,3,4]
const _POL = 2, _POR = 5;           // 예시 윈도우 [2,5]

function _buildOutPrefixSteps(E) {
  const before = _PF[_POL - 2];           // prefix[l-1]  (앞부분)
  const after = _PF[5] - _PF[_POR - 1];   // prefix[N]-prefix[r]  (뒷부분)
  return [
    { showPre: false, win: false, hl: null, focus: null, payoff: false,
      bubble: t(E, "Outside the window, cows don't move — a spot is a checkup ✓ if a[i] = b[i], the same for every window.",
                   "윈도우 바깥은 소가 안 움직여요 — a[i] = b[i] 면 검진 ✓, 어떤 윈도우든 똑같아요.") },
    { showPre: true, win: false, hl: null, focus: null, payoff: false,
      bubble: t(E, "Counting outside fresh each time is slow. Trick: write 'how many ✓ up to here' once — a prefix.",
                   "윈도우마다 바깥을 다시 세면 느려요. 비결: '1번부터 여기까지 ✓ 몇 개' 를 미리 한 번 적어둬요 (prefix).") },
    { showPre: true, win: true, hl: "out", focus: null, payoff: false,
      bubble: t(E, `Now window [${_POL}, ${_POR}]. Outside = the front part (before ${_POL}) + the back part (after ${_POR}).`,
                   `이제 윈도우 [${_POL}, ${_POR}]. 바깥 = 앞부분(자리 ${_POL} 앞) + 뒷부분(자리 ${_POR} 뒤).`) },
    { showPre: true, win: true, hl: "out", focus: "before", payoff: false,
      bubble: t(E, `Front part = ✓ up to spot ${_POL - 1} = prefix[${_POL - 1}] = ${before}.`,
                   `앞부분 = '자리 ${_POL - 1}까지 ✓' = prefix[${_POL - 1}] = ${before}.`) },
    { showPre: true, win: true, hl: "out", focus: "after", payoff: false,
      bubble: t(E, `Back part = (up to 6) − (up to ${_POR}) = prefix[6] − prefix[${_POR}] = ${_PF[5]} − ${_PF[_POR - 1]} = ${after}.`,
                   `뒷부분 = '자리 6까지' − '자리 ${_POR}까지' = prefix[6] − prefix[${_POR}] = ${_PF[5]} − ${_PF[_POR - 1]} = ${after}.`) },
    { showPre: true, win: true, hl: "out", focus: "both", payoff: true,
      bubble: t(E, `Outside checkups = ${before} + ${after} = ${before + after}! Build the prefix once, then ANY window's outside is just two subtractions — fast! 🚀`,
                   `바깥 검진 = ${before} + ${after} = ${before + after}! prefix 한 번 만들어두면 어떤 윈도우든 빼기 두 번으로 바로 — 빨라요! 🚀`) },
  ];
}

export function CheckupsOutPrefixSim({ E }) {
  const steps = _buildOutPrefixSteps(E);
  const { idx, safe, setIdx, total } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const TW = 44, STEP = 52, GAP = STEP - TW, LAB = 66;
  const isOut = p => p < _POL || p > _POR;
  const preHot = m => ((st.focus === "before" || st.focus === "both") && m === _POL - 1) ||
                      ((st.focus === "after" || st.focus === "both") && (m === 6 || m === _POR));

  const rowWrap = (label, color, node) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{ width: LAB, textAlign: "right", fontSize: 10.5, fontWeight: 700, color, lineHeight: 1.1 }}>{label}</div>
      {node}
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 10 }}>
        📊 {t(E, "Outside checkups — read fast with a prefix", "바깥 검진 — 미리 더해두고 빨리 읽기")}
      </div>
      <div style={{ position: "relative", maxWidth: 480, margin: "0 auto 16px" }}>
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      <div style={{ width: "fit-content", margin: "0 auto" }}>
        {rowWrap(t(E, "🩺 checkup", "🩺 검진"), "#15803d",
          <div style={{ position: "relative", display: "flex", gap: GAP }}>
            {st.win && <div style={{ position: "absolute", top: -4, left: (_POL - 1) * STEP - 4, width: (_POR - _POL + 1) * STEP - GAP + 8, height: TW + 8, borderRadius: 11, background: "#ecfeff", border: "1.5px dashed #67e8f9", zIndex: 0 }} />}
            {_PFCK.map((v, k) => {
              const p = k + 1, out = st.hl === "out" && isOut(p);
              return <div key={k} style={{ position: "relative", zIndex: 1, width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, background: v ? "#dcfce7" : "#f8fafc", color: v ? "#15803d" : "#cbd5e1", border: `${out ? 2.5 : 1.5}px solid ${out ? "#ea580c" : (v ? "#86efac" : "#e2e8f0")}`, boxShadow: out ? "0 0 0 3px rgba(234,88,12,.15)" : "none", transition: "all .2s" }}>{v ? "✓" : "—"}</div>;
            })}
          </div>
        )}
        {rowWrap(t(E, "📊 ✓ up to here", "📊 여기까지 ✓"), "#0891b2",
          <div style={{ display: "flex", gap: GAP }}>
            {_PF.map((v, k) => {
              const m = k + 1, hot = st.showPre && preHot(m);
              return <div key={k} style={{ width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700, background: hot ? "#cffafe" : (st.showPre ? "#fff" : "#f8fafc"), color: st.showPre ? "#0e7490" : "#cbd5e1", border: `${hot ? 2.5 : 1.5}px solid ${hot ? "#0891b2" : "#e2e8f0"}`, opacity: st.showPre ? 1 : 0.4, transition: "all .2s" }}>{st.showPre ? v : "·"}</div>;
            })}
          </div>
        )}
        {rowWrap("", C.dim,
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: 6 }, (_, k) => {
              const win = k + 1 >= _POL && k + 1 <= _POR;
              return <div key={k} style={{ width: TW, textAlign: "center", fontSize: 9.5, color: win ? "#0e7490" : C.dim, fontWeight: win ? 700 : 400 }}>{t(E, "spot", "자리")} {k + 1}</div>;
            })}
          </div>
        )}
      </div>

      <SimNav idx={idx} total={total} onIdx={setIdx} accent="#0891b2" showLabels isEn={E} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CheckupsInPrefixSim — 안쪽 검진을 's별 prefix' 로 빨리 세기. 말풍선 stepped.
   s 가 같으면 안쪽 검진 패턴이 똑같음(거울 시뮬에서 봄) → s 마다 prefix 한 번 만들면
   그 s 의 어떤 윈도우든 빼기 한 번(diag[r]−diag[l−1])으로 안쪽 검진을 구함.
   ════════════════════════════════════════════════════════════════════ */
const _PFIN = [0, 0, 1, 0, 1, 0];   // s=7 안쪽 검진 패턴 (a[7−i]=b[i]) — ✓ at 3,5
const _PFID = (() => { const p = []; let s = 0; for (let i = 0; i < 6; i++) { s += _PFIN[i]; p.push(s); } return p; })();  // [0,0,1,1,2,2]

function _buildInPrefixSteps(E) {
  const inside = _PFID[_POR - 1] - _PFID[_POL - 2];   // diag[r]-diag[l-1]
  return [
    { showPre: false, win: false, hl: null, focus: null, payoff: false,
      bubble: t(E, "Inside flips, so it changes — BUT same s = same pattern (we saw this!). Here's the inside-checkup pattern for s = 7.",
                   "안쪽은 뒤집혀서 변하지만 — s 가 같으면 패턴이 똑같아요 (앞에서 봤죠!). 이게 s = 7 의 안쪽 검진 패턴이에요.") },
    { showPre: true, win: false, hl: null, focus: null, payoff: false,
      bubble: t(E, "Make a prefix for it too — 'how many inside ✓ up to here' for this s.",
                   "이것도 prefix 를 만들어둬요 — 이 s 의 '여기까지 안쪽 ✓ 몇 개'.") },
    { showPre: true, win: true, hl: "in", focus: null, payoff: false,
      bubble: t(E, `Window [${_POL}, ${_POR}] (s = 7). Inside checkups = diag[${_POR}] − diag[${_POL - 1}] — just ONE subtraction.`,
                   `윈도우 [${_POL}, ${_POR}] (s = 7). 안쪽 검진 = diag[${_POR}] − diag[${_POL - 1}] — 빼기 딱 한 번.`) },
    { showPre: true, win: true, hl: "in", focus: "sub", payoff: false,
      bubble: t(E, `= ${_PFID[_POR - 1]} − ${_PFID[_POL - 2]} = ${inside}. Inside checkups = ${inside}!`,
                   `= ${_PFID[_POR - 1]} − ${_PFID[_POL - 2]} = ${inside}. 안쪽 검진 = ${inside}개!`) },
    { showPre: true, win: true, hl: "in", focus: "sub", payoff: true,
      bubble: t(E, "Build this prefix once per s, and EVERY window with that s reads its inside with one subtraction → fast! 🚀",
                   "s 마다 이 prefix 를 한 번만 만들면, 그 s 의 모든 윈도우가 빼기 한 번으로 안쪽을 구해요 → 빨라요! 🚀") },
  ];
}

export function CheckupsInPrefixSim({ E }) {
  const steps = _buildInPrefixSteps(E);
  const { idx, safe, setIdx, total } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const TW = 44, STEP = 52, GAP = STEP - TW, LAB = 66;
  const inWin = p => p >= _POL && p <= _POR;
  const preHot = m => st.focus === "sub" && (m === _POR || m === _POL - 1);

  const rowWrap = (label, color, node) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{ width: LAB, textAlign: "right", fontSize: 10.5, fontWeight: 700, color, lineHeight: 1.1 }}>{label}</div>
      {node}
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 10 }}>
        📊 {t(E, "Inside checkups — one prefix per s", "안쪽 검진 — s마다 prefix 하나")}
      </div>
      <div style={{ position: "relative", maxWidth: 480, margin: "0 auto 16px" }}>
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      <div style={{ width: "fit-content", margin: "0 auto" }}>
        {rowWrap(t(E, "🩺 inside ✓?", "🩺 안쪽 검진"), "#15803d",
          <div style={{ position: "relative", display: "flex", gap: GAP }}>
            {st.win && <div style={{ position: "absolute", top: -4, left: (_POL - 1) * STEP - 4, width: (_POR - _POL + 1) * STEP - GAP + 8, height: TW + 8, borderRadius: 11, background: "#ecfeff", border: "1.5px dashed #67e8f9", zIndex: 0 }} />}
            {_PFIN.map((v, k) => {
              const p = k + 1, hot = st.hl === "in" && inWin(p);
              return <div key={k} style={{ position: "relative", zIndex: 1, width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, background: v ? "#dcfce7" : "#f8fafc", color: v ? "#15803d" : "#cbd5e1", border: `${hot ? 2.5 : 1.5}px solid ${hot ? "#0891b2" : (v ? "#86efac" : "#e2e8f0")}`, boxShadow: hot ? "0 0 0 3px rgba(8,145,178,.15)" : "none", transition: "all .2s" }}>{v ? "✓" : "—"}</div>;
            })}
          </div>
        )}
        {rowWrap(t(E, "📊 diag (up to)", "📊 여기까지 ✓"), "#0891b2",
          <div style={{ display: "flex", gap: GAP }}>
            {_PFID.map((v, k) => {
              const m = k + 1, hot = st.showPre && preHot(m);
              return <div key={k} style={{ width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700, background: hot ? "#cffafe" : (st.showPre ? "#fff" : "#f8fafc"), color: st.showPre ? "#0e7490" : "#cbd5e1", border: `${hot ? 2.5 : 1.5}px solid ${hot ? "#0891b2" : "#e2e8f0"}`, opacity: st.showPre ? 1 : 0.4, transition: "all .2s" }}>{st.showPre ? v : "·"}</div>;
            })}
          </div>
        )}
        {rowWrap("", C.dim,
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: 6 }, (_, k) => {
              const win = inWin(k + 1);
              return <div key={k} style={{ width: TW, textAlign: "center", fontSize: 9.5, color: win ? "#0e7490" : C.dim, fontWeight: win ? 700 : 400 }}>{t(E, "spot", "자리")} {k + 1}</div>;
            })}
          </div>
        )}
      </div>

      <SimNav idx={idx} total={total} onIdx={setIdx} accent="#0891b2" showLabels isEn={E} />
    </div>
  );
}
