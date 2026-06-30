// New interactive sims for checkups — kept OUT of components.jsx so the
// 🔒 USACO_VERIFIED code in that file is never touched. Illustrative-only:
// the brute "feel the pain" runner that lets a student physically watch the
// O(N³) triple loop crawl as N grows.

import { useState, useRef, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";
import { CodeBlock, highlight } from "@/components/quest/shared";

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

/* ════════════════════════════════════════════════════════════════════
   CheckupsEnumSim — "구간은 입력이 아니다" 를 흐름으로 (선생님 2026-06-24:
   설명 말고 시뮬에서 저절로). 공식 샘플 N=3 의 6가지 뒤집기를 우리가 직접
   다 만들어 점수별로 모으면 → 출력 3,3,0,0. 구간이 들어오는 게 아니라 우리가 다 해봄.
   ════════════════════════════════════════════════════════════════════ */
const _ENA = [1, 3, 2];      // 윗줄 (소가 가진 종)
const _ENB = [3, 2, 1];      // 아랫줄 (수의사가 원하는 종)
const _ENN = 3;
const _ENORDER = [[1, 1], [1, 2], [1, 3], [2, 2], [2, 3], [3, 3]];  // l≤r 모든 구간 6가지
function _enReverse(l, r) { const res = _ENA.slice(); for (let i = l; i <= r; i++) res[i - 1] = _ENA[(l + r - i) - 1]; return res; }
function _enScore(row) { let c = 0; for (let i = 0; i < _ENN; i++) if (row[i] === _ENB[i]) c++; return c; }
function _buildEnumSteps(E) {
  const steps = [];
  const buckets = [0, 0, 0, 0];
  steps.push({ flip: null, row: _ENA.slice(), score: null, buckets: buckets.slice(), payoff: false,
    bubble: t(E,
      "Input is just two rows. WHERE to flip isn't given — we choose it. With N=3 there are 6 segments. Let's try them all!",
      "입력은 윗줄·아랫줄 둘 뿐이에요. '어디를 뒤집을지'는 안 주어져요 — 우리가 골라요. N=3 이면 구간이 6가지. 다 해봐요!") });
  _ENORDER.forEach(([l, r]) => {
    const row = _enReverse(l, r), sc = _enScore(row);
    buckets[sc]++;
    steps.push({ flip: [l, r], row, score: sc, buckets: buckets.slice(), payoff: false,
      bubble: t(E,
        `Flip [${l}, ${r}] → ${sc} checkup${sc === 1 ? "" : "s"}. Drop one into the "${sc}" box.`,
        `[${l}~${r}] 뒤집기 → 검진 ${sc}개. '검진 ${sc}' 칸에 하나 넣어요.`) });
  });
  steps.push({ flip: null, row: _ENA.slice(), score: null, buckets: buckets.slice(), payoff: true,
    bubble: t(E,
      "All 6 tried. The box counts 3, 3, 0, 0 ARE the output — no segment was ever handed to us; we made them all.",
      "6가지 다 해봤어요. 칸 개수 3, 3, 0, 0 이 그대로 출력! 구간은 누가 준 게 아니라 — 우리가 전부 만들어 본 거예요.") });
  return steps;
}
function _EnCell({ v, ok, dim }) {
  return <div style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 15, background: dim ? "#f1f5f9" : ok ? "#dcfce7" : "#fff", color: dim ? "#94a3b8" : ok ? "#166534" : C.text, border: `1.5px solid ${dim ? "#e2e8f0" : ok ? "#86efac" : C.border}` }}>{v}</div>;
}
export function CheckupsEnumSim({ E }) {
  const steps = _buildEnumSteps(E);
  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[idx];
  const [l, r] = st.flip || [0, 0];
  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10 }}>
        🔁 {t(E, "We try EVERY flip ourselves", "뒤집기를 우리가 전부 해봐요")}
      </div>

      {/* 말풍선 */}
      <div style={{ maxWidth: 500, margin: "0 auto 8px" }}>
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      {/* 두 줄(입력) + 검진 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center", marginBottom: 12 }}>
        {[
          [t(E, "🐮 cows (flipped)", "🐮 소 (뒤집은 줄)"), st.row, true],
          [t(E, "📋 wanted", "📋 원하는"), _ENB, false],
        ].map(([lab, arr, isTop]) => (
          <div key={lab} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 96, fontSize: 11, color: C.dim, textAlign: "right", wordBreak: "keep-all" }}>{lab}</div>
            <div style={{ display: "flex", gap: 6, position: "relative" }}>
              {arr.map((v, i) => {
                const inWin = isTop && st.flip && (i + 1 >= l && i + 1 <= r);
                const ok = st.flip && st.row[i] === _ENB[i];
                return <div key={i} style={{ position: "relative" }}>
                  <_EnCell v={v} ok={isTop ? ok : false} dim={false} />
                  {inWin && <div style={{ position: "absolute", inset: -3, border: "2px solid #06b6d4", borderRadius: 10, pointerEvents: "none" }} />}
                </div>;
              })}
            </div>
          </div>
        ))}
        {st.flip && (
          <div style={{ fontSize: 11.5, color: "#0e7490", fontWeight: 700, marginTop: 2 }}>
            {t(E, `flip [${l}, ${r}] → checkups = ${st.score}`, `구간 [${l}~${r}] 뒤집기 → 검진 ${st.score}개`)}
          </div>
        )}
      </div>

      {/* 점수 통(buckets) = 출력 */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 4 }}>
        {st.buckets.map((cnt, sc) => {
          const justHit = st.flip && st.score === sc;
          return (
            <div key={sc} style={{ minWidth: 58, textAlign: "center", background: justHit ? "#cffafe" : st.payoff ? "#ecfdf5" : "#f8fafc", border: `1.5px solid ${justHit ? "#0891b2" : st.payoff ? "#6ee7b7" : C.border}`, borderRadius: 10, padding: "7px 6px", transition: "all .25s" }}>
              <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 600 }}>{t(E, "checkups", "검진")} {sc}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: justHit ? "#0e7490" : st.payoff ? "#065f46" : C.text }}>{cnt}</div>
            </div>
          );
        })}
      </div>
      {st.payoff && (
        <div style={{ textAlign: "center", fontSize: 11.5, color: "#065f46", fontWeight: 700, marginTop: 8 }}>
          ↑ {t(E, "this is exactly the output (one line each)", "이게 그대로 출력 (한 줄씩)")}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <SimNav idx={idx} total={tot} onIdx={setIdx} accent={A} showLabels isEn={E} />
      </div>
    </div>
  );
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
const _FS = _FL + _FR;           // 합 s = 5

function _fastInfo(i) {
  const outside = i < _FL || i > _FR;
  const lands = outside ? _A6[i] : _A6[_FS - i];   // 뒤집은 뒤 자리 i 에 오는 값
  return { outside, lands, match: lands === _MB[i] };  // MirrorSim 과 같은 b(_MB) 사용 — 같은 예제로 통일
}

function _buildFastSteps(E) {
  const N = _A6.length;
  let outCount = 0, inCount = 0;
  const inMatchSpots = [];
  for (let i = 0; i < N; i++) {
    const f = _fastInfo(i);
    if (f.outside) { if (f.match) outCount++; }
    else if (f.match) { inCount++; inMatchSpots.push(i + 1); }
  }
  // 이미 배운 두 조각(바깥/안쪽)을 '합치기'만 — 재설명·(s−i) 재유도 없음 (선생님 2026-06-24: 반복 제거)
  return [
    { zone: null, flip: false, reveal: "none", tally: {},
      bubble: t(E,
        `One window, spots ${_FL + 1}–${_FR + 1}. We know checkups = OUTSIDE + INSIDE — let's add the two parts.`,
        `윈도우 하나, 자리 ${_FL + 1}~${_FR + 1}. 검진 = 바깥 + 안쪽 인 거 알죠 — 두 조각을 더해봐요.`) },
    { zone: "outside", flip: false, reveal: "outside", tally: { out: outCount },
      bubble: t(E,
        `Outside (spots 1, 6) doesn't flip — counted once up front. Outside matches = ${outCount}.`,
        `바깥(자리 1·6)은 안 뒤집혀요 — 미리 세둔 것. 바깥 일치 = ${outCount}개.`) },
    { zone: "inside", flip: true, reveal: "all", tally: { out: outCount, inn: inCount },
      bubble: t(E,
        `Inside flips. We already counted it once for this s — inside matches = ${inCount} (spots ${inMatchSpots.join(", ")}).`,
        `안쪽은 뒤집혀요. 이 s 에서 한 번 세둔 것 — 안쪽 일치 = ${inCount}개 (자리 ${inMatchSpots.join("·")}).`) },
    { zone: null, flip: true, reveal: "all", tally: { out: outCount, inn: inCount, total: outCount + inCount },
      bubble: t(E,
        `Checkups = outside ${outCount} + inside ${inCount} = ${outCount + inCount}. Same answer as brute — but just an add, O(1)!`,
        `검진 수 = 바깥 ${outCount} + 안쪽 ${inCount} = ${outCount + inCount}. brute 와 같은 답 — 근데 더하기 한 번, O(1)!`) },
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
  const ltr = v => String.fromCharCode(64 + v);   // 1→A … 6→F (MirrorSim/TrySim 과 같은 글자 표기)

  const cell = (val, dim) => {
    const sp = _SP[val] || _SP[1];
    return (
      <div style={{
        width: _CW, height: _CW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16,
        background: dim ? "#f8fafc" : sp.bg, color: dim ? "#cbd5e1" : sp.tx,
        border: `1.5px solid ${dim ? "#e2e8f0" : sp.bd}`, transition: "all .25s",
      }}>{ltr(val)}</div>
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
            {Array.from({ length: N }, (_, i) => <div key={i}>{cell(_MB[i], dimFor(i))}</div>)}
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
    // 1) 무대 + 진짜 목표: '모든 뒤집기'의 검진 수를 다 세야 함 → 너무 많으니 빨리 (선생님 2026-06-23)
    { win: [_ML, _MR], rev: 0, reveal: "none", focus: null, formula: false, payoff: false,
      bubble: t(E, `When you flip a window, the cows inside it change places — so which cows get a checkup changes too. If we find the RULE for how they move, we can count fast. Let's flip spots ${_ML}~${_MR} and look.`,
                   `구간을 뒤집으면 그 안의 소들이 자리를 바꿔요 — 그래서 검진받는 소도 달라지죠. 소들이 '어떻게 자리를 바꾸는지' 규칙만 찾으면 빨리 셀 수 있어요. 자, 자리 ${_ML}~${_MR} 를 직접 뒤집어 봐요.`) },
    // 2) 뒤집기 전 검진 (Q1: 원래 검진받던 소)
    { win: [_ML, _MR], rev: 0, reveal: "all", focus: null, formula: false, payoff: false,
      bubble: t(E, `BEFORE reversing: checkups are spots ${before.join(", ")} — only ${before.length}.`,
                   `뒤집기 전 — 검진 ✓ 는 자리 ${before.join("·")}, ${before.length}마리뿐이에요.`) },
    // 3) 뒤집기 (바깥) — 윈도우 밖(자리 1·6)은 안 움직이니 검진 ✓ 유지 (선생님 2026-06-23)
    { win: [_ML, _MR], rev: 1, reveal: "outside", focus: null, formula: false, payoff: false,
      bubble: t(E, `Reverse spots ${_ML}–${_MR} — first the two ENDS (spots ${_ML}, ${_MR}) swap cows. Outside (spots 1, 6) doesn't move.`,
                   `자리 ${_ML}~${_MR} 뒤집기 — 먼저 양 끝(자리 ${_ML}·${_MR})의 소가 서로 자리를 바꿔요. 윈도우 밖(자리 1·6)은 안 움직여요.`) },
    // 4) 뒤집기 (안쪽)
    { win: [_ML, _MR], rev: 2, reveal: "outside", focus: null, formula: false, payoff: false,
      bubble: t(E, `Then the inner two (spots ${_ML + 1}, ${_MR - 1}) swap too. Ends first, then inside → the whole window is reversed!`,
                   `그 다음 안쪽(자리 ${_ML + 1}·${_MR - 1})도 바꿔요. 끝 → 안쪽 순서로 → 구간이 다 뒤집혔어요!`) },
    // 5) 뒤집은 후 검진 (Q2: 어떻게 바뀌었나)
    { win: [_ML, _MR], rev: 2, reveal: "all", focus: null, formula: false, payoff: false,
      bubble: t(E, `AFTER: checkups are spots ${after.join(", ")} — ${after.length}! Spots ${gained.join(", ")} newly matched.`,
                   `뒤집은 후 — 검진 ✓ 는 자리 ${after.join("·")}, ${after.length}마리! 자리 ${gained.join("·")}가 새로 맞았어요.`) },
    // 6) 딱 하나 기억: 서로 자리 바꾼 짝들의 자리수 합 = s (=7). 공식·비교는 다음 시뮬로. (선생님 2026-06-24)
    { win: [_ML, _MR], rev: 2, reveal: "all", focus: null, formula: true, payoff: true,
      bubble: t(E, `Remember just ONE thing! The cows that swapped — spots ${_ML} & ${_MR} (${_ML}+${_MR}=${_MS}), spots ${_ML + 1} & ${_MR - 1} (${_ML + 1}+${_MR - 1}=${_MS}). Their spot numbers always add to ${_MS} (= l + r). Keep that ${_MS} in mind — next, we'll count WITHOUT flipping. 🚀`,
                   `딱 하나만 기억해요! 서로 자리를 바꾼 소들 — 자리 ${_ML}·${_MR} (${_ML}+${_MR}=${_MS}), 자리 ${_ML + 1}·${_MR - 1} (${_ML + 1}+${_MR - 1}=${_MS}). 바뀐 짝의 자리수 합은 늘 ${_MS} (= 양 끝 합 l+r). 이 ${_MS}만 기억해요 — 다음 화면에서 안 뒤집고 셀 거예요. 🚀`) },
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
  const ckShow = p => st.reveal === "all" ? true : st.reveal === "inside" ? inWin(p) : st.reveal === "outside" ? !inWin(p) : false;
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
          <div style={{ position: "relative", width: gridW, height: TW, marginTop: 14 }}>
            {/* 뒤집는 '창(window)' 프레임 + 라벨 */}
            <div style={{ position: "absolute", top: -6, left: (wl - 1) * STEP - 5, width: (wr - wl + 1) * STEP - GAP + 10, height: TW + 12, borderRadius: 12, background: "#ecfeff", border: "2px solid #22d3ee", boxShadow: "0 0 0 3px rgba(34,211,238,.12)", zIndex: 0, transition: "left .4s, width .4s" }} />
            <div style={{ position: "absolute", top: -19, left: (wl - 1) * STEP - 5 + ((wr - wl + 1) * STEP - GAP + 10) / 2, transform: "translateX(-50%)", background: "#0891b2", color: "#fff", fontSize: 9.5, fontWeight: 800, borderRadius: 6, padding: "1px 8px", whiteSpace: "nowrap", zIndex: 3, transition: "left .4s" }}>🔁 {t(E, "reverse window", "뒤집는 창")} {wl}~{wr}</div>
            {[1, 2, 3, 4, 5, 6].map(tk => {
              const slot = _slotG(tk, wl, wr, st.rev), sp = _SP[tk] || _SP[1];
              const hot = st.focus != null && slot + 1 === st.focus;
              const moved = slot + 1 !== tk;   // 이 자리(slot+1)의 원래 소(=ltr(slot+1))와 다름 → 위치 바뀜
              return (
                <div key={"t" + tk} style={{ position: "absolute", top: 0, left: slot * STEP, width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, background: sp.bg, color: sp.tx, border: `${hot ? 2.5 : 1.5}px solid ${hot ? "#ea580c" : sp.bd}`, boxShadow: hot ? "0 0 0 3px rgba(234,88,12,.2)" : "none", transition: "left .55s cubic-bezier(.4,0,.2,1), border-color .2s, box-shadow .2s", zIndex: 1 }}>
                  {ltr(tk)}
                  {moved && (
                    <span title={t(E, "originally here", "원래 이 자리")} style={{ position: "absolute", top: -7, right: -6, fontSize: 9, fontWeight: 800, color: "#94a3b8", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "0 3px", lineHeight: "13px", textDecoration: "line-through" }}>{ltr(slot + 1)}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {rowWrap(t(E, "📋 wants", "📋 원하는"), "#1e40af",
          <div style={{ display: "flex", gap: GAP }}>{_MB.map((tk, k) => <div key={k}>{fixedCell(tk, st.focus === k + 1)}</div>)}</div>
        )}
        {rowWrap(t(E, "🩺 ✓?", "🩺 검진?"), "#15803d",
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: _MN }, (_, k) => {
              const p = k + 1, show = ckShow(p), ok = ckOk(p), hot = st.focus === p;
              return <div key={k} style={{ width: TW, height: 24, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, background: show && ok ? "#22c55e" : "transparent", color: show ? (ok ? "#fff" : "#cbd5e1") : "transparent", boxShadow: hot ? "0 0 0 2px #ea580c" : "none", transition: "background .2s" }}>{show ? (ok ? "✓" : "—") : ""}</div>;
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
          <span style={{ fontSize: 13, color: "#0e7490" }}>{t(E, `s = ends' sum (l+r) = ${_ML}+${_MR} = ${_MS}`, `s = 양 끝 합 (l+r) = ${_ML}+${_MR} = ${_MS}`)}</span>
        )}
      </div>

      <SimNav idx={idx} total={total} onIdx={setIdx} accent="#0891b2" showLabels isEn={E} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CheckupsGrowSim — 같은 s(=7) 위에서 구간을 한 짝씩 넓혀가며 '새 짝만 ±로
   더하면 된다'를 직접 보여줌 (선생님 2026-06-23: '4개·3개·전체 바꿀때 +1/−1 다 표시').
   안쪽은 s 가 같아 안 변하고, 새로 들어온 두 자리만 ± → prefix(누적)의 본질.
   ════════════════════════════════════════════════════════════════════ */
const _GROW = [[3, 4], [2, 5], [1, 6]];   // s=7 위에서 가운데→전체로 한 짝씩

function _buildGrowSteps(E) {
  const want = p => _MB[p - 1];
  // 안쪽([l+1,r-1])은 늘 뒤집힌 상태. 새 짝(l,r)만 pairFlipped 로 토글. 바깥은 원본.
  const slotOf = (tk, l, r, pairFlipped) => {
    if (tk < l || tk > r) return tk - 1;
    if ((tk === l || tk === r) && !pairFlipped) return tk - 1;   // 새 짝 아직 안 뒤집음
    return l + r - tk - 1;                                       // 뒤집힘(안쪽 + 뒤집은 새 짝)
  };
  const tokAt = (p, l, r, pf) => { for (let tk = 1; tk <= _MN; tk++) if (slotOf(tk, l, r, pf) + 1 === p) return tk; return p; };
  const cnt = (l, r, pf) => { let c = 0; for (let p = 1; p <= _MN; p++) if (tokAt(p, l, r, pf) === want(p)) c++; return c; };
  const steps = [];
  let prev = null;   // 직전 윈도우의 '뒤집은 후' 검진 수
  _GROW.forEach((w, i) => {
    const [l, r] = w;
    const pre = cnt(l, r, false);    // 새 짝 안 뒤집은 상태 (= 직전 윈도우 결과)
    const dl = (want(l) === r ? 1 : 0) - (want(l) === l ? 1 : 0);   // 자리 l: 새 소 r vs 원래 소 l
    const dr = (want(r) === l ? 1 : 0) - (want(r) === r ? 1 : 0);   // 자리 r: 새 소 l vs 원래 소 r
    // (1) 새 짝 들어옴 — 아직 안 뒤집음
    steps.push({ win: w, pairFlipped: false, added: [l, r], dmap: null, total: pre, delta: null, prev: null, payoff: false,
      bubble: i === 0
        ? t(E, `The original row — not flipped yet. Checkups ✓ = ${pre}. Let's flip the middle pair [${l}, ${r}].`,
              `원래 줄이에요 — 아직 안 뒤집음. 검진 ✓ = ${pre}마리. 가운데 짝 [${l}~${r}] 를 뒤집어 볼게요.`)
        : t(E, `Widen to [${l}, ${r}] — the new pair (spots ${l}, ${r}) just arrived. Inside stays put; not flipped yet.`,
              `구간을 [${l}~${r}]로 넓혀요 — 새 짝 (자리 ${l}·${r})이 들어왔어요. 안쪽은 그대로, 아직 안 뒤집음.`) });
    // (2) 새 짝 뒤집기
    const total = cnt(l, r, true), delta = total - pre;
    const tag = `${t(E, "spot", "자리")} ${l} ${dl > 0 ? "+1" : dl < 0 ? "−1" : "0"}, ${t(E, "spot", "자리")} ${r} ${dr > 0 ? "+1" : dr < 0 ? "−1" : "0"}`;
    steps.push({ win: w, pairFlipped: true, added: [l, r], dmap: { [l]: dl, [r]: dr }, total, delta, prev: pre, payoff: false,
      bubble: t(E,
        `Flip the pair: ${tag}. Only these two change → ${pre} ${delta >= 0 ? "+" : "−"} ${Math.abs(delta)} = ${total}.`,
        `새 짝을 뒤집어요: ${tag}. 이 두 자리만 바뀌어 → ${pre} ${delta >= 0 ? "+" : "−"} ${Math.abs(delta)} = ${total}.`) });
    prev = total;
  });
  steps.push({
    win: [1, 6], pairFlipped: true, added: null, dmap: null, total: prev, delta: null, prev: null, payoff: true,
    bubble: t(E,
      `See? Each time we widen, only the two NEW spots change — just add their ±. No need to recount all of them. That's the speed-up! 🚀`,
      `봤죠? 넓힐 때마다 새로 들어온 두 자리만 바뀌어요 — 그 ± 만 더하면 끝. 전체를 다시 안 세도 돼요. 이게 빨라지는 비결! 🚀`),
  });
  return steps;
}

export function CheckupsGrowSim({ E }) {
  const steps = _buildGrowSteps(E);
  const { idx, safe, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const [wl, wr] = st.win;
  const TW = 44, STEP = 52, GAP = STEP - TW, LAB = 56;
  const gridW = _MN * STEP - GAP;
  const ltr = tk => String.fromCharCode(64 + tk);
  const want = p => _MB[p - 1];
  const slotOf = tk => {
    if (tk < wl || tk > wr) return tk - 1;
    if ((tk === wl || tk === wr) && !st.pairFlipped) return tk - 1;   // 새 짝 아직 안 뒤집음
    return wl + wr - tk - 1;
  };
  const tokAt = p => { for (let tk = 1; tk <= _MN; tk++) if (slotOf(tk) + 1 === p) return tk; return p; };
  const ckOk = p => tokAt(p) === want(p);
  const isAdded = p => st.added && (p === st.added[0] || p === st.added[1]);

  const rowWrap = (label, color, node) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
      <div style={{ width: LAB, textAlign: "right", fontSize: 10.5, fontWeight: 700, color, lineHeight: 1.1 }}>{label}</div>
      {node}
    </div>
  );
  const fixedCell = tk => {
    const sp = _SP[tk] || _SP[1];
    return <div style={{ width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, background: sp.bg, color: sp.tx, border: `1.5px solid ${sp.bd}` }}>{ltr(tk)}</div>;
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 10 }}>
        ➕ {t(E, "Widen by a pair — only the new pair changes", "한 짝씩 넓히기 — 새 짝만 바뀜")}
      </div>

      {/* 말풍선 */}
      <div style={{ position: "relative", maxWidth: 480, margin: "0 auto 16px" }}>
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      <div style={{ width: "fit-content", margin: "0 auto" }}>
        {rowWrap(t(E, "🐄 cow", "🐄 소"), "#7f1d1d",
          <div style={{ position: "relative", width: gridW, height: TW + 18, marginTop: 14 }}>
            {/* 뒤집는 '창(window)' 프레임 + 라벨 */}
            <div style={{ position: "absolute", top: -6, left: (wl - 1) * STEP - 5, width: (wr - wl + 1) * STEP - GAP + 10, height: TW + 12, borderRadius: 12, background: "#ecfeff", border: "2px solid #22d3ee", boxShadow: "0 0 0 3px rgba(34,211,238,.12)", zIndex: 0, transition: "left .4s, width .4s" }} />
            <div style={{ position: "absolute", top: -19, left: (wl - 1) * STEP - 5 + ((wr - wl + 1) * STEP - GAP + 10) / 2, transform: "translateX(-50%)", background: "#0891b2", color: "#fff", fontSize: 9.5, fontWeight: 800, borderRadius: 6, padding: "1px 8px", whiteSpace: "nowrap", zIndex: 3, transition: "left .4s" }}>🔁 {t(E, "reverse window", "뒤집는 창")} {wl}~{wr}</div>
            {[1, 2, 3, 4, 5, 6].map(tk => {
              const slot = slotOf(tk);
              const sp = _SP[tk] || _SP[1];
              const moved = slot + 1 !== tk;
              const addedHere = st.added && (slot + 1 === st.added[0] || slot + 1 === st.added[1]);
              const d = addedHere && st.dmap ? st.dmap[slot + 1] : null;
              return (
                <div key={tk} style={{ position: "absolute", top: 0, left: slot * STEP, width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, background: sp.bg, color: sp.tx, border: `${addedHere ? 2.5 : 1.5}px solid ${addedHere ? "#0891b2" : sp.bd}`, boxShadow: addedHere ? "0 0 0 3px rgba(8,145,178,.18)" : "none", transition: "left .5s cubic-bezier(.4,0,.2,1), border-color .2s", zIndex: 1 }}>
                  {ltr(tk)}
                  {moved && <span style={{ position: "absolute", top: -7, right: -6, fontSize: 9, fontWeight: 800, color: "#94a3b8", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "0 3px", lineHeight: "13px", textDecoration: "line-through" }}>{ltr(slot + 1)}</span>}
                  {d != null && <span style={{ position: "absolute", bottom: -11, left: "50%", transform: "translateX(-50%)", fontSize: 10, fontWeight: 900, color: "#fff", background: d > 0 ? "#16a34a" : d < 0 ? "#dc2626" : "#94a3b8", borderRadius: 6, padding: "0 5px", lineHeight: "15px" }}>{d > 0 ? "+1" : d < 0 ? "−1" : "0"}</span>}
                </div>
              );
            })}
          </div>
        )}
        {rowWrap(t(E, "📋 wants", "📋 원하는"), "#1e40af",
          <div style={{ display: "flex", gap: GAP }}>{_MB.map((tk, k) => <div key={k}>{fixedCell(tk)}</div>)}</div>
        )}
        {rowWrap(t(E, "🩺 ✓?", "🩺 검진?"), "#15803d",
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: _MN }, (_, k) => {
              const p = k + 1, ok = ckOk(p);
              return <div key={k} style={{ width: TW, height: 24, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, background: ok ? "#22c55e" : "transparent", color: ok ? "#fff" : "#cbd5e1", outline: isAdded(p) ? "2px solid #0891b2" : "none" }}>{ok ? "✓" : "—"}</div>;
            })}
          </div>
        )}
        {rowWrap("", C.dim,
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: _MN }, (_, k) => {
              const win = k + 1 >= wl && k + 1 <= wr;
              return <div key={k} style={{ width: TW, textAlign: "center", fontSize: 9.5, color: win ? "#0e7490" : C.dim, fontWeight: win ? 700 : 400 }}>{t(E, "spot", "자리")} {k + 1}</div>;
            })}
          </div>
        )}
      </div>

      {/* 누적 검진 수 + 델타 */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 14, marginBottom: 10 }}>
        <div style={{ background: "#fff7ed", border: "1.5px solid #ea580c", color: "#9a3412", borderRadius: 999, padding: "5px 16px", fontSize: 12.5, fontWeight: 800 }}>
          {t(E, "checkups", "검진")} <span style={{ fontSize: 17 }}>{st.total}</span>
          {st.delta != null && <span style={{ marginLeft: 7, color: st.delta > 0 ? "#16a34a" : st.delta < 0 ? "#dc2626" : "#94a3b8" }}>({st.prev} {st.delta >= 0 ? "+" : "−"} {Math.abs(st.delta)})</span>}
        </div>
      </div>

      {/* 대칭 성장은 같은 s 가족 안에서만 — 한쪽만 넓히면 다른 가족 (선생님 2026-06-24) */}
      {st.payoff && (
        <div style={{ maxWidth: 470, margin: "0 auto 12px", background: "#ecfeff", border: "1px dashed #67e8f9", borderRadius: 10, padding: "9px 12px", fontSize: 11.5, color: "#155e75", lineHeight: 1.6, textAlign: "center", wordBreak: "keep-all" }}>
          {t(E,
            "Heads-up: this is the s=7 family (we widen evenly on BOTH sides, keeping s). A one-side widen like [3,5] is s=8 — a different family, grown from its own center [4,4]. Each s grows this way, covering every window once.",
            "잠깐: 이건 s=7 가족이에요 (양쪽으로 똑같이 넓혀 s 유지). [3,5]처럼 한쪽만 넓힌 건 s=8 — 가운데가 [4,4]인 다른 가족이죠. s 마다 이렇게 키워서 모든 구간을 한 번씩 다 세요.")}
        </div>
      )}

      <SimNav idx={idx} total={tot} onIdx={setIdx} accent="#0891b2" showLabels isEn={E} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CheckupsTrySim — 직접 구간을 골라 뒤집어 보는 탐색 패널 (선생님 2026-06-23:
   '자리 3,4,5 뒤집을 때 어떤지 보고 싶어'). s 가 다르면 안쪽 검진이 달라지는 걸
   학생이 직접 확인. MirrorSim 의 슬라이드/코너라벨 패턴 재사용. Illustrative-only.
   ════════════════════════════════════════════════════════════════════ */
// 핵심 예제만: 3~4 ⊂ 2~5 ⊂ 1~6 (모두 s=7, 한 쌍씩 커짐).
// 1~6 의 쌍 (1,6) 은 원래 둘 다 맞던 자리 → 바꾸면 검진이 깨짐(−2). "생기냐/깨지냐" 를 보여주는 예제.
const _TRY_WINS = [[3, 4], [2, 5], [1, 6]];

export function CheckupsTrySim({ E }) {
  const [wi, setWi] = useState(1);     // 기본 [2,5] (s=7) — 바깥 2 + 안쪽 2
  const [l, r] = _TRY_WINS[wi];
  const s = l + r;
  const ltr = tk => String.fromCharCode(64 + tk);
  const TW = 44, STEP = 52, GAP = STEP - TW, LAB = 52;
  const gridW = _MN * STEP - GAP;

  // ── 한 윈도우 검진 = 바깥(안 뒤집은 자리, 그대로 맞나) + 안쪽(뒤집은 쌍들) ──
  const W = _MB;
  const matchAt = p => p === W[p - 1];        // 안 뒤집었을 때 자리 p 가 검진인가
  const inWin = p => p >= l && p <= r;
  const outside = (() => { let c = 0; for (let p = 1; p <= _MN; p++) if (!inWin(p) && matchAt(p)) c++; return c; })();
  const insideSpots = (() => { const arr = []; for (let p = l; p <= r; p++) if ((s - p) === W[p - 1]) arr.push(p); return arr; })();  // 뒤집은 뒤 안쪽에서 맞는 자리
  const ins = insideSpots.length;
  const total = outside + ins;

  const steps = [];
  // 1) 바깥 — 안 뒤집히는 자리, 그대로 맞나
  steps.push({ kind: "outside", out: outside, ins: null,
    bubble: t(E,
      `Outside ${l}~${r} doesn't move. Count spots already matching there: ${outside}. That's OUTSIDE.`,
      `구간 ${l}~${r} 밖은 안 변해요. 거기서 그대로 맞는 자리만 세요: ${outside}개. 이게 '바깥'.`) });
  // 2) 안쪽 — 통째로 뒤집혀서 바뀐 것, 뒤집은 뒤 맞는 거 세기
  steps.push({ kind: "inside", out: outside, ins,
    bubble: t(E,
      `Inside ${l}~${r} flips over. After flipping, count spots that match: ${ins} (${ins ? "spots " + insideSpots.join(", ") : "none"}). That's INSIDE.`,
      `안쪽 ${l}~${r} 은 통째로 뒤집혀요. 뒤집은 뒤 맞는 자리를 세요: ${ins}개 (${ins ? "자리 " + insideSpots.join(", ") : "없음"}). 이게 '안쪽'.`) });
  // 3) 합치기
  steps.push({ kind: "total", out: outside, ins, total,
    bubble: t(E,
      `This window's checkups = OUTSIDE ${outside} + INSIDE ${ins} = ${total}.`,
      `이 윈도우 검진 = 바깥 ${outside} + 안쪽 ${ins} = ${total}.`) });

  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(idx, steps.length - 1)];
  const isInside = st.kind === "inside";

  const cell = (tk, dim, ringCol) => {
    const sp = _SP[tk] || _SP[1];
    return <div style={{ width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, background: sp.bg, color: sp.tx, border: `1.5px solid ${sp.bd}`, opacity: dim ? 0.3 : 1, boxShadow: ringCol ? `0 0 0 3px ${ringCol}` : "none", transition: "box-shadow .2s, opacity .2s" }}>{ltr(tk)}</div>;
  };
  const rowLab = (txt, color) => <div style={{ width: LAB, textAlign: "right", fontSize: 10.5, fontWeight: 700, color }}>{txt}</div>;

  // inside / total 스텝: 구간이 통째로 뒤집힌 상태로 보여줌.
  const flipped = isInside || st.kind === "total";
  const cowAt = p => (flipped && inWin(p)) ? s - p : p;
  const ringFor = p => {
    if (st.kind === "outside") return (!inWin(p) && matchAt(p)) ? "#16a34a" : null;   // 바깥 맞는 자리
    if (isInside) return insideSpots.includes(p) ? "#16a34a" : null;                  // 안쪽 뒤집은 뒤 맞는 자리
    return null;   // total 은 테두리 없이 (결과는 카운트로)
  };
  const dimFor = p => {
    if (st.kind === "outside") return inWin(p);     // 바깥 단계: 구간 안 흐리게
    if (isInside) return !inWin(p);                 // 안쪽 단계: 구간 밖 흐리게
    return false;
  };

  const chip = (label, val, color, bg, bd) => (
    <div style={{ background: bg, border: `1.5px solid ${bd}`, color, borderRadius: 999, padding: "5px 13px", fontSize: 12, fontWeight: 800 }}>
      {label} <span style={{ fontSize: 15 }}>{val}</span>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 8, wordBreak: "keep-all" }}>
        🎯 {t(E, "One window's checkups = OUTSIDE + INSIDE", "한 윈도우 검진 = 바깥 + 안쪽")}
      </div>

      {/* 구간 버튼 (고르면 처음부터 다시) */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
        {_TRY_WINS.map((w, i) => (
          <button key={i} onClick={() => { setWi(i); setIdx(0); }} style={{ padding: "5px 11px", borderRadius: 7, fontSize: 12, fontWeight: 800, border: `1.5px solid ${wi === i ? "#0891b2" : C.border}`, background: wi === i ? "#cffafe" : "#fff", color: wi === i ? "#0e7490" : C.text, cursor: "pointer" }}>
            {t(E, "spots", "자리")} {w[0]}~{w[1]}
          </button>
        ))}
      </div>

      {/* 말풍선 */}
      <div style={{ maxWidth: 540, margin: "0 auto 12px" }}>
        <div style={{ background: st.kind === "total" ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.kind === "total" ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.kind === "total" ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.kind === "total" ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      {/* 소 + 원하는 */}
      <div style={{ width: "fit-content", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, marginTop: 14 }}>
          {rowLab(t(E, "🐄 cow", "🐄 소"), "#7f1d1d")}
          <div style={{ position: "relative", width: gridW, height: TW }}>
            <div style={{ position: "absolute", top: -6, left: (l - 1) * STEP - 5, width: (r - l + 1) * STEP - GAP + 10, height: TW + 12, borderRadius: 12, background: "#ecfeff", border: "2px solid #22d3ee", zIndex: 0, transition: "left .3s, width .3s" }} />
            {flipped && <div style={{ position: "absolute", top: -21, left: (l - 1) * STEP - 5 + ((r - l + 1) * STEP - GAP + 10) / 2, transform: "translateX(-50%)", background: "#0891b2", color: "#fff", fontSize: 10, fontWeight: 800, borderRadius: 6, padding: "1px 7px", whiteSpace: "nowrap", zIndex: 3 }}>🔄 {t(E, "flipped", "뒤집힘")}</div>}
            {[1, 2, 3, 4, 5, 6].map(p => (
              <div key={p} style={{ position: "absolute", left: (p - 1) * STEP, top: 0, zIndex: 1 }}>{cell(cowAt(p), dimFor(p), ringFor(p))}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {rowLab(t(E, "📋 wants", "📋 원하는"), "#1e40af")}
          <div style={{ display: "flex", gap: GAP }}>
            {_MB.map((tk, k) => <div key={k}>{cell(tk, dimFor(k + 1), ringFor(k + 1))}</div>)}
          </div>
        </div>
      </div>

      {/* 바깥 + 안쪽 = 총 */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", marginTop: 16, flexWrap: "wrap" }}>
        {chip(t(E, "outside", "바깥"), st.out, "#475569", "#f1f5f9", "#cbd5e1")}
        <span style={{ fontWeight: 800, color: C.dim }}>+</span>
        {chip(t(E, "inside", "안쪽"), st.ins == null ? "?" : st.ins, "#0e7490", "#cffafe", "#67e8f9")}
        <span style={{ fontWeight: 800, color: C.dim }}>=</span>
        {chip(t(E, "checkups", "검진"), st.kind === "total" ? st.total : "?", "#9a3412", "#fff7ed", "#fdba74")}
      </div>

      <div style={{ marginTop: 12 }}>
        <SimNav idx={idx} total={tot} onIdx={setIdx} accent={"#0891b2"} showLabels isEn={E} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CheckupsReuseSim — '같은 s 면 안쪽 ✓ 자리 고정 → 재사용' 을 스텝 시뮬로.
   s=7 의 ✓ 자리(3,5)는 고정 → 윈도우(3~4, 2~5, 1~6) 하나씩 넘기며 '내 구간 안 ✓ 만 세면 됨'.
   (선생님 2026-06-28: 정적 표 말고 시뮬로.) 빼기 실제 계산은 코드 챕터.
   ════════════════════════════════════════════════════════════════════ */
const _REUSE_S = 7;
const _REUSE_WINS = [[3, 4], [2, 5], [1, 6]];

export function CheckupsReuseSim({ E }) {
  const checks = (() => { const arr = []; for (let i = 1; i <= _MN; i++) if ((_REUSE_S - i) === _MB[i - 1]) arr.push(i); return arr; })();  // [3,5]
  const TW = 40, STEP = 50, GAP = STEP - TW, LAB = 70;
  const gridW = _MN * STEP - GAP;

  const steps = [];
  steps.push({ kind: "pattern", l: 0, r: 0, cnt: null, inside: [],
    bubble: t(E,
      `For s=${_REUSE_S}, the inside ✓ spots are ALWAYS ${checks.join(", ")} — the same for every s=${_REUSE_S} window.`,
      `s=${_REUSE_S} 이면 안쪽 ✓ 자리는 항상 ${checks.join(", ")} — 어떤 s=${_REUSE_S} 윈도우든 똑같아요.`) });
  for (const [l, r] of _REUSE_WINS) {
    const inside = checks.filter(c => c >= l && c <= r);
    steps.push({ kind: "win", l, r, cnt: inside.length, inside,
      bubble: t(E,
        `Window ${l}~${r}: inside = the ✓ spots within it = ${inside.length} (${inside.length ? "spots " + inside.join(", ") : "none"}). No recount — just read the ✓s in range.`,
        `윈도우 ${l}~${r}: 안쪽 = 내 구간 안의 ✓ = ${inside.length}개 (${inside.length ? "자리 " + inside.join(", ") : "없음"}). 다시 안 세고, 구간 안 ✓ 만 읽으면 끝.`) });
  }
  steps.push({ kind: "payoff", l: 0, r: 0, cnt: null, inside: checks,
    bubble: t(E,
      `Count the ✓ pattern ONCE per s, then every same-s window reuses it — no recounting!`,
      `✓ 자리는 s마다 한 번만 세두면, 같은 s 윈도우가 다 재사용 — 매번 다시 안 셈!`) });

  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(idx, steps.length - 1)];
  const isWin = st.kind === "win";

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 8, wordBreak: "keep-all" }}>
        🔁 {t(E, "Same s = same ✓ spots → reuse", "같은 s = 안쪽 ✓ 자리 똑같음 → 재사용")}
      </div>

      {/* 말풍선 */}
      <div style={{ maxWidth: 540, margin: "0 auto 14px" }}>
        <div style={{ background: st.kind === "payoff" ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.kind === "payoff" ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.kind === "payoff" ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.kind === "payoff" ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      {/* 자리 + 안쪽 ✓ */}
      <div style={{ width: "fit-content", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{ width: LAB }} />
          <div style={{ display: "flex", gap: GAP }}>
            {Array.from({ length: _MN }, (_, k) => <div key={k} style={{ width: TW, textAlign: "center", fontSize: 13, fontWeight: 700, color: C.dim }}>{k + 1}</div>)}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: LAB, textAlign: "right", fontSize: 11, fontWeight: 700, color: "#0e7490" }}>{t(E, `inside ✓ (s=${_REUSE_S})`, `안쪽 ✓ (s=${_REUSE_S})`)}</div>
          <div style={{ position: "relative", display: "flex", gap: GAP }}>
            {isWin && <div style={{ position: "absolute", top: -6, left: (st.l - 1) * STEP - 5, width: (st.r - st.l + 1) * STEP - GAP + 10, height: TW + 12, borderRadius: 12, background: "#ecfeff", border: "2px solid #22d3ee", zIndex: 0, transition: "left .3s, width .3s" }} />}
            {Array.from({ length: _MN }, (_, k) => {
              const p = k + 1, isCheck = checks.includes(p);
              const counted = isWin ? st.inside.includes(p) : true;
              return (
                <div key={k} style={{ position: "relative", zIndex: 1, width: TW, height: TW, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800,
                  background: isCheck ? (counted ? "#dcfce7" : "#f1f5f9") : "transparent",
                  color: isCheck ? (counted ? "#15803d" : "#94a3b8") : "#cbd5e1",
                  opacity: (isWin && !(p >= st.l && p <= st.r) && isCheck) ? 0.4 : 1 }}>{isCheck ? "✓" : "·"}</div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 이 윈도우 안쪽 = N */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 14, minHeight: 30 }}>
        {isWin && (
          <div style={{ background: "#cffafe", border: "1.5px solid #0891b2", color: "#0e7490", borderRadius: 999, padding: "5px 16px", fontSize: 12.5, fontWeight: 800 }}>
            {t(E, `window ${st.l}~${st.r} inside`, `윈도우 ${st.l}~${st.r} 안쪽`)} = <span style={{ fontSize: 16 }}>{st.cnt}</span>
          </div>
        )}
      </div>

      <div style={{ marginTop: 10 }}>
        <SimNav idx={idx} total={tot} onIdx={setIdx} accent={"#0891b2"} showLabels isEn={E} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CheckupsKeyCodeSim — 코드를 그림에 붙여서 (선생님 2026-06-24: 코드만 새 페이지에
   띄우면 a·b·i 가 뭔지 끊겨서 아무도 모름). 방금 본 소/원하는/자리 위에서 코드 한
   줄씩 실행 — a[l+r-i] 가 '그림의 이 소' 임을 눈으로 잇는다. 토글 X (학생 언어 lang).
   ════════════════════════════════════════════════════════════════════ */
const _KC_SOU = [1, 2, 3, 4, 5, 6];     // 자리별 소가 가진 종 (= A..F)
const _KC_WANT = [1, 3, 4, 1, 2, 6];    // 자리별 원하는 종 (A,C,D,A,B,F)
const _KC_LT = ["", "A", "B", "C", "D", "E", "F"];
const _KC_L = 2, _KC_R = 5, _KC_S = 7;  // 구간 [2,5], s=7
const _KC_INS = [2, 3, 4, 5];           // 안쪽 자리들
function _buildKeySteps(E) {
  const steps = [];
  steps.push({ i: null, src: null, ok: null, inside: 0, payoff: false,
    bubble: t(E,
      "Code reads symbols, but they're just THIS picture. a = cows, b = wanted, i = spot. We never flip — for each inside spot i, we fetch a[l+r−i].",
      "코드 글자들은 사실 이 그림이에요. a = 소 줄, b = 원하는 줄, i = 자리. 안 뒤집고, 안쪽 자리 i 마다 a[l+r−i] 만 가져와요.") });
  let inside = 0;
  _KC_INS.forEach((i) => {
    const src = _KC_S - i;                  // a[l+r-i] 가 가리키는 자리
    const v = _KC_SOU[src - 1];             // 그 소의 종
    const want = _KC_WANT[i - 1];
    const ok = v === want;
    if (ok) inside++;
    steps.push({ i, src, ok, inside, payoff: false,
      bubble: t(E,
        `Spot ${i}: a[${_KC_S}−${i}] = a[${src}] = cow ${_KC_LT[v]}. Wanted b[${i}] = ${_KC_LT[want]}. ${ok ? "Same → inside + 1." : "Different → skip."}`,
        `자리 ${i}: a[${_KC_S}−${i}] = a[${src}] = 소 ${_KC_LT[v]}. 원하는 b[${i}] = ${_KC_LT[want]}. ${ok ? "같다 → inside + 1." : "다르다 → 그냥 넘어가요."}`) });
  });
  steps.push({ i: null, src: null, ok: null, inside, payoff: true,
    bubble: t(E,
      `Done — inside = ${inside}. No row was ever reversed; we just read a[l+r−i] and compared. That's the whole trick.`,
      `끝 — inside = ${inside}. 줄을 한 번도 안 뒤집었어요. a[l+r−i] 를 보고 비교만 했죠. 이게 비결의 전부예요.`) });
  return steps;
}
function _KcCell({ letter, hl, kind }) {
  const tone = kind === "src" ? { bg: "#cffafe", bd: "#0891b2", tx: "#0e7490" }
    : kind === "want" ? { bg: "#dcfce7", bd: "#16a34a", tx: "#166534" }
    : { bg: "#fff", bd: C.border, tx: C.text };
  return <div style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 15, background: hl ? tone.bg : "#fff", color: hl ? tone.tx : C.text, border: `1.5px solid ${hl ? tone.bd : C.border}`, transition: "all .2s" }}>{letter}</div>;
}
export function CheckupsKeyCodeSim({ E, lang = "py" }) {
  const cpp = lang === "cpp";
  const steps = _buildKeySteps(E);
  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[idx];
  const py = [
    "for i in range(l, r + 1):   # 안쪽 자리 l..r",
    "    v = a[l + r - i]        # 자리 i 에 올 소",
    "    if v == b[i]:           # 원하는 소와 같으면",
    "        inside += 1         # 검진 ✓",
  ];
  const cc = [
    "for (int i = l; i <= r; i++) {  // 안쪽 자리 l..r",
    "  int v = a[l + r - i];         // 자리 i 에 올 소",
    "  if (v == b[i]) inside++;      // 원하는 소면 검진 ✓",
    "}",
  ];
  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 10 }}>
        ⌨️ {t(E, "The code IS this picture", "코드 = 이 그림")}
      </div>

      {/* 말풍선 */}
      <div style={{ maxWidth: 500, margin: "0 auto 10px" }}>
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 12.5, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      {/* 그림: 소 줄 / 원하는 줄 / 자리 — 코드 심볼을 여기에 묶음 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center", marginBottom: 6 }}>
        {[["a", "🐮 " + t(E, "cows", "소"), _KC_SOU, "src"], ["b", "📋 " + t(E, "wanted", "원하는"), _KC_WANT, "want"]].map(([sym, lab, arr, kind]) => (
          <div key={sym} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 70, fontSize: 11, color: C.dim, textAlign: "right", wordBreak: "keep-all" }}><code style={{ color: kind === "src" ? "#0891b2" : "#16a34a", fontWeight: 700 }}>{sym}</code> {lab}</div>
            <div style={{ display: "flex", gap: 6 }}>
              {arr.map((sp, k) => {
                const p = k + 1;
                const hl = kind === "src" ? (st.src === p) : (st.i === p);
                return <_KcCell key={k} letter={_KC_LT[sp]} hl={hl} kind={kind} />;
              })}
            </div>
          </div>
        ))}
        {/* 자리 번호 + 구간 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 70 }} />
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3, 4, 5, 6].map((p) => {
              const inWin = p >= _KC_L && p <= _KC_R;
              return <div key={p} style={{ width: 34, textAlign: "center", fontSize: 10, fontWeight: st.i === p ? 800 : 500, color: st.i === p ? "#b45309" : inWin ? "#0e7490" : C.dim }}>{p}</div>;
            })}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: 10.5, color: C.dim, marginBottom: 10 }}>
        l = {_KC_L}, r = {_KC_R} → l + r = {_KC_S}　·　inside = <b style={{ color: "#15803d", fontSize: 13 }}>{st.inside}</b>
      </div>

      {/* 코드 — 그림과 같은 의미 (학생 언어 하나만) */}
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <CodeBlock lines={cpp ? cc : py} lang={cpp ? "cpp" : "py"} />
      </div>

      <div style={{ marginTop: 12 }}>
        <SimNav idx={idx} total={tot} onIdx={setIdx} accent="#0891b2" showLabels isEn={E} />
      </div>
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

/* ════════════════════════════════════════════════════════════════════
   CheckupsFinalCodeSim — 최종 완성 코드(누적합 O(N²))를 말풍선으로 한 부분씩.
   변수(matchUpTo·insideUpTo·결과)가 차오르는 흐름. 자동재생 없음(SimNav 단계).
   예시: cow=[2,1,3,1], want=[1,2,3,1] (1-indexed). 구간 [1,2] 뒤집으면 완전 일치(검진 4).
   ════════════════════════════════════════════════════════════════════ */
const _FC_COW = [null, 2, 1, 3, 1];   // index 0 = 코드의 빈 자리(cow[0]); 진짜 소는 1~4
const _FC_WANT = [null, 1, 2, 3, 1];
const _ = null;  // 아직 안 채운 칸
// 퀘스트에 실린 그 코드 그대로 (CK_SMART_FULL). 실행되는 줄을 하이라이트.
const _FC_CODE = [
  "matchUpTo = [0]*(N+1)",
  "for i in range(1, N+1):",
  "    if cow[i] == want[i]:",
  "        matchUpTo[i] = matchUpTo[i-1] + 1",
  "    else:",
  "        matchUpTo[i] = matchUpTo[i-1]",
  "pairsWithCheckups = [0]*(N+1)",
  "for s in range(2, 2*N+1):",
  "    insideUpTo = [0]*(N+2)",
  "    for k in range(1, N+1):",
  "        j = s - k",
  "        if 1 <= j <= N and cow[j] == want[k]:",
  "            insideUpTo[k] = insideUpTo[k-1] + 1",
  "        else:",
  "            insideUpTo[k] = insideUpTo[k-1]",
  "    l_min = max(1, s - N)",
  "    l_max = s // 2",
  "    for l in range(l_min, l_max+1):",
  "        r = s - l",
  "        inside  = insideUpTo[r] - insideUpTo[l-1]",
  "        outside = matchUpTo[l-1] + (matchUpTo[N] - matchUpTo[r])",
  "        pairsWithCheckups[inside + outside] += 1",
  "for c in pairsWithCheckups: print(c)",
];
const _FC_P0 = [0, 0, 0, 0, 0];
const _FC_P1 = [0, 0, 0, 0, 1];

function _buildFinalSteps(E) {
  // 각 step: line=하이라이트할 코드 줄(들), mut/iut/pairs=변수표 스냅샷, sc=스칼라 변수, bubble=설명
  const S = (o) => Object.assign({ lines: [], mut: null, iut: null, pairs: _FC_P0, sc: {}, payoff: false }, o);
  const FULL = [0, 0, 0, 1, 2];
  return [
    S({ lines: [], bubble: t(E, "This is the actual passing code. We'll run it line by line and watch the variables change. (cow=[2,1,3,1], want=[1,2,3,1])",
                                "이게 통과하는 진짜 코드예요. 한 줄씩 실행하며 변수가 어떻게 바뀌는지 봐요. (cow=[2,1,3,1], want=[1,2,3,1])") }),

    S({ lines: [5], mut: [0, 0, _, _, _], sc: { i: 1 },
        bubble: t(E, "matchUpTo[i] = 'matches up to spot i WITHOUT flipping'. i=1: cow[1]=2 ≠ want[1]=1 → else → matchUpTo[1]=matchUpTo[0]=0.",
                     "matchUpTo[i] = '안 뒤집고 자리 i까지 맞는 칸 수' 누적. i=1: cow[1]=2 ≠ want[1]=1 → else 줄 → matchUpTo[1]=matchUpTo[0]=0.") }),
    S({ lines: [5], mut: [0, 0, 0, _, _], sc: { i: 2 },
        bubble: t(E, "i=2: cow[2]=1 ≠ want[2]=2 → matchUpTo[2]=matchUpTo[1]=0.", "i=2: cow[2]=1 ≠ want[2]=2 → matchUpTo[2]=matchUpTo[1]=0.") }),
    S({ lines: [3], mut: [0, 0, 0, 1, _], sc: { i: 3 },
        bubble: t(E, "i=3: cow[3]=3 = want[3]=3 → if-branch → matchUpTo[3]=matchUpTo[2]+1=1.",
                     "i=3: cow[3]=3 = want[3]=3 → if 줄 → matchUpTo[3]=matchUpTo[2]+1=1.") }),
    S({ lines: [3], mut: FULL, sc: { i: 4 },
        bubble: t(E, "i=4: cow[4]=1 = want[4]=1 → matchUpTo[4]=2. Outside table done — built ONCE, reused for every window.",
                     "i=4: cow[4]=1 = want[4]=1 → matchUpTo[4]=2. 바깥 표 완성 — 딱 한 번 만들어 모든 구간이 재사용.") }),

    S({ lines: [6], mut: FULL,
        bubble: t(E, "pairsWithCheckups: a tally box — how many windows give exactly k checkups. Start all 0.",
                     "pairsWithCheckups: 결과 통 — '검진이 정확히 k개인 구간'을 세는 통. 전부 0으로 시작.") }),

    S({ lines: [7], mut: FULL, sc: { s: 2 },
        bubble: t(E, "Outer loop s = l+r. It starts at s=2 (smallest sum 1+1). s=2 means only window [1,1] — one cow, flipping it changes nothing. So we'll detail the more interesting s=3 next.",
                     "바깥 루프 s = l+r. s=2부터 시작해요 (가장 작은 합 1+1). s=2 → 구간 [1,1] 하나뿐 — 소 한 칸이라 뒤집어도 그대로. 그래서 더 의미있는 s=3을 자세히 볼게요.") }),
    S({ lines: [8], mut: FULL, iut: [0, _, _, _, _], sc: { s: 3 },
        bubble: t(E, "Now s=3 (window [1,2] belongs to this s). Make a fresh insideUpTo (all 0) just for this s.",
                     "이제 s=3 (구간 [1,2]가 여기 속함). 이 s 전용 insideUpTo를 새로 0으로 만듦.") }),
    S({ lines: [12], mut: FULL, iut: [0, 1, _, _, _], sc: { s: 3, k: 1, j: 2 },
        bubble: t(E, "k=1: j=s−k=2. 1≤2≤4 and cow[2]=1=want[1]=1 → if-branch → insideUpTo[1]=insideUpTo[0]+1=1.",
                     "k=1: j=s−k=2. 1≤2≤4 이고 cow[2]=1=want[1]=1 → if 줄 → insideUpTo[1]=insideUpTo[0]+1=1.") }),
    S({ lines: [12], mut: FULL, iut: [0, 1, 2, _, _], sc: { s: 3, k: 2, j: 1 },
        bubble: t(E, "k=2: j=1. cow[1]=2=want[2]=2 → insideUpTo[2]=insideUpTo[1]+1=2.",
                     "k=2: j=1. cow[1]=2=want[2]=2 → insideUpTo[2]=insideUpTo[1]+1=2.") }),
    S({ lines: [14], mut: FULL, iut: [0, 1, 2, 2, _], sc: { s: 3, k: 3, j: 0 },
        bubble: t(E, "k=3: j=0 → NOT 1≤j≤N → else → insideUpTo[3]=insideUpTo[2]=2 (no change).",
                     "k=3: j=0 → 1≤j≤N 아님 → else 줄 → insideUpTo[3]=insideUpTo[2]=2 (그대로).") }),
    S({ lines: [14], mut: FULL, iut: [0, 1, 2, 2, 2], sc: { s: 3, k: 4, j: -1 },
        bubble: t(E, "k=4: j=−1 → else → insideUpTo[4]=2. insideUpTo for s=3 done = [0,1,2,2,2].",
                     "k=4: j=−1 → else 줄 → insideUpTo[4]=2. s=3 insideUpTo 완성 = [0,1,2,2,2].") }),

    S({ lines: [15, 16, 17], mut: FULL, iut: [0, 1, 2, 2, 2], sc: { s: 3 },
        bubble: t(E, "l_min=max(1,3−4)=1, l_max=3//2=1 → for s=3 only window [1,2].",
                     "l_min=max(1,3−4)=1, l_max=3//2=1 → s=3 엔 구간 [1,2] 하나뿐.") }),
    S({ lines: [18, 19], mut: FULL, iut: [0, 1, 2, 2, 2], sc: { s: 3, l: 1, r: 2, inside: 2 },
        bubble: t(E, "l=1, r=s−l=2. inside = insideUpTo[r]−insideUpTo[l−1] = insideUpTo[2]−insideUpTo[0] = 2−0 = 2.",
                     "l=1, r=s−l=2. inside = insideUpTo[r]−insideUpTo[l−1] = insideUpTo[2]−insideUpTo[0] = 2−0 = 2.") }),
    S({ lines: [20], mut: FULL, iut: [0, 1, 2, 2, 2], sc: { s: 3, l: 1, r: 2, inside: 2, outside: 2 },
        bubble: t(E, "outside = matchUpTo[l−1] + (matchUpTo[N]−matchUpTo[r]) = matchUpTo[0] + (matchUpTo[4]−matchUpTo[2]) = 0 + (2−0) = 2.",
                     "outside = matchUpTo[l−1] + (matchUpTo[N]−matchUpTo[r]) = matchUpTo[0] + (matchUpTo[4]−matchUpTo[2]) = 0 + (2−0) = 2.") }),
    S({ lines: [21], mut: FULL, iut: [0, 1, 2, 2, 2], pairs: _FC_P1, sc: { s: 3, l: 1, r: 2, inside: 2, outside: 2 },
        bubble: t(E, "inside+outside = 4 → pairsWithCheckups[4] += 1. (window [1,2] flipped gives 4 checkups — full match!)",
                     "inside+outside = 4 → pairsWithCheckups[4] += 1. (구간 [1,2] 뒤집으면 검진 4개 — 완전 일치!)") }),

    S({ lines: [7], mut: FULL, pairs: _FC_P1,
        bubble: t(E, "Back to the s loop: every other s (2,4,5,…) runs the same way — rebuild insideUpTo, then subtract. No re-counting.",
                     "다시 s 루프로: 다른 s(2,4,5,…)도 똑같이 — insideUpTo만 새로 만들고 빼기로 처리. 다시 세지 않음.") }),
    S({ lines: [22], pairs: _FC_P1, payoff: true,
        bubble: t(E, "At the end, print pairsWithCheckups[0..N]. Two prefix tables + subtractions = O(N²), so it passes. 🚀",
                     "끝나면 pairsWithCheckups[0..N]를 한 줄씩 출력. 누적 표 2개 + 빼기 = O(N²) → 통과! 🚀") }),
  ];
}

function _FcRow({ label, arr, hlIdx, hue }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <div style={{ width: 132, fontSize: 10.5, color: C.dim, textAlign: "right", wordBreak: "keep-all", lineHeight: 1.25 }}>{label}</div>
      <div style={{ display: "flex", gap: 5 }}>
        {arr.map((v, k) => {
          const empty = v === null || v === undefined;
          const on = hlIdx === k;
          return (
            <div key={k} style={{ minWidth: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 12.5, border: `1px solid ${on ? hue : "#e2e8f0"}`, background: on ? hue + "22" : "#fff", color: empty ? "#cbd5e1" : (on ? hue : "#334155"), fontWeight: on ? 800 : 500 }}>{empty ? "·" : v}</div>
          );
        })}
      </div>
    </div>
  );
}

export function CheckupsFinalCodeSim({ E }) {
  const steps = _buildFinalSteps(E);
  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[idx];
  // 변수표 하이라이트 인덱스 (마지막으로 채운 칸)
  const mutHl = st.mut ? st.mut.reduce((a, v, i) => (v !== null ? i : a), -1) : -1;
  const iutHl = st.iut ? st.iut.reduce((a, v, i) => (v !== null ? i : a), -1) : -1;
  const scOrder = [["i", "i"], ["s", "s"], ["k", "k"], ["j", "j"], ["l", "l"], ["r", "r"], ["inside", "inside"], ["outside", "outside"]];
  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 8 }}>
        🧩 {t(E, "The real code, line by line", "진짜 코드 — 한 줄씩")}
      </div>

      <div style={{ maxWidth: 540, margin: "0 auto 10px" }}>
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 12.5, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.65, minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", alignItems: "flex-start" }}>
        {/* 변수 (왼쪽) */}
        <div style={{ flexShrink: 0 }}>
          {/* 칸 번호 눈금 — 모든 행이 index 0~4 로 정렬 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <div style={{ width: 132, fontSize: 10, color: C.dim, textAlign: "right" }}>{t(E, "index", "칸 번호")}</div>
            <div style={{ display: "flex", gap: 5 }}>
              {[0, 1, 2, 3, 4].map((n) => (
                <div key={n} style={{ minWidth: 28, textAlign: "center", fontSize: 10, color: C.dim, fontWeight: 700 }}>{n}</div>
              ))}
            </div>
          </div>
          <_FcRow label={t(E, "🐮 cow ([0] empty)", "🐮 cow ([0]은 빈칸)")} arr={_FC_COW} hlIdx={-1} hue="#0891b2" />
          <_FcRow label={"📋 want"} arr={_FC_WANT} hlIdx={-1} hue="#16a34a" />
          {st.mut ? <_FcRow label={t(E, "matchUpTo", "matchUpTo (바깥)")} arr={st.mut} hlIdx={mutHl} hue="#d97706" /> : null}
          {st.iut ? <_FcRow label={t(E, "insideUpTo (this s)", "insideUpTo (이 s)")} arr={st.iut} hlIdx={iutHl} hue="#0891b2" /> : null}
          {st.iut ? <div style={{ fontSize: 9.5, color: C.dim, maxWidth: 300, marginTop: -1, marginBottom: 2, wordBreak: "keep-all", lineHeight: 1.35 }}>{t(E, "↑ cells = spot k (1~N), so N+2 cells — NOT 2N. (2N is s's max value, not a cell count)", "↑ 칸 = 자리 k (1~N) 라 N+여유 칸. 8칸 아님 — 8(=2N)은 s의 최댓값이지 칸 수가 아니에요.")}</div> : null}
          <div style={{ height: 4 }} />
          <_FcRow label={t(E, "pairsWithCheckups", "결과[검진수]")} arr={st.pairs} hlIdx={st.pairs === _FC_P1 ? 4 : -1} hue="#16a34a" />
          {/* 스칼라 변수 칩 */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8, maxWidth: 290 }}>
            {scOrder.filter(([key]) => st.sc[key] !== undefined).map(([key, lab]) => (
              <span key={key} style={{ fontSize: 11.5, fontFamily: "monospace", background: "#f1f5f9", borderRadius: 6, padding: "3px 8px", color: "#334155" }}>{lab} = <b style={{ color: "#0891b2" }}>{st.sc[key]}</b></span>
            ))}
          </div>
        </div>

        {/* 코드 (오른쪽) — 실행 줄 하이라이트 */}
        <div style={{ flex: "1 1 330px", minWidth: 300, maxWidth: 540, background: "#0f172a", borderRadius: 12, padding: "12px 10px", overflowX: "auto" }}>
          {_FC_CODE.map((line, i) => {
            const on = st.lines.includes(i);
            return (
              <div key={i} style={{ display: "flex", gap: 8, fontFamily: "monospace", fontSize: 11.5, lineHeight: 1.55, background: on ? "#fde68a22" : "transparent", borderLeft: `3px solid ${on ? "#fbbf24" : "transparent"}`, borderRadius: 3, paddingLeft: 5 }}>
                <span style={{ color: "#475569", minWidth: 16, textAlign: "right", userSelect: "none" }}>{i + 1}</span>
                <span style={{ whiteSpace: "pre" }}>{highlight(line, "py")}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 카드 안 '단계' 네비 — quest 슬라이드 '이전/다음'과 헷갈리지 않게 화살표+카운터만 */}
      <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "monospace" }}>{t(E, "step", "단계")} {idx + 1}/{tot}</span>
        <SimNav idx={idx} total={tot} onIdx={setIdx} accent="#0891b2" isEn={E} />
      </div>
    </div>
  );
}
