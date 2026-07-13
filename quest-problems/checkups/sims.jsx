// New interactive sims for checkups — kept OUT of components.jsx so the
// 🔒 USACO_VERIFIED code in that file is never touched. Illustrative-only:
// the brute "feel the pain" runner that lets a student physically watch the
// O(N³) triple loop crawl as N grows.

import { useState, useRef, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";
import { CodeBlock, highlight } from "@/components/quest/shared";

const A = "#dc2626";

// 말풍선 수식이 줄 중간에서 안 끊기게 — "a[i] = b[i]", "4 − 3 = 1" 같은 짧은 수식 토큰
// 사이 공백을 NBSP로 묶는다 (한글 구절은 그대로 → 문장은 자연스럽게 줄바꿈).
// (선생님 2026-07-02: "다음 줄로 넘어가는 거 다 검토, 읽기 편하게".)
const _NBM_RE = /([A-Za-z0-9\]\)]+) (==|\/\/|[=+−~×·]) ([A-Za-z0-9\[\(]+)/g;
const nbMath = (s) => {
  if (typeof s !== "string") return s;
  let out = s.replace(_NBM_RE, "$1 $2 $3");
  out = out.replace(_NBM_RE, "$1 $2 $3");   // 두 번 돌려 "1 + 1 = 2" 같은 체인도 묶음
  out = out.replace(/ ([=+−~]) /g, " $1 "); // 남은 연산자는 다음 토큰에 붙임 — 줄이 "="로 끝나지 않게
  out = out.replace(/\[(\d+), (\d+)\]/g, "[$1, $2]");  // 창 표기 [2, 5]도 한 덩어리로
  // 문장 경계(마침표·물음표·느낌표 뒤 공백)에 자동 줄바꿈 — 컨테이너에 whiteSpace:pre-line 필요.
  // (선생님 2026-07-13: 자연스러운 줄바꿈. 문장 단위로 끊기게.)
  out = out.replace(/([.?!]) (?=[^\d])/g, "$1\n");
  return out;
};

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
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {nbMath(st.bubble)}</div>
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
          💬 {nbMath(st.bubble)}
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
        }}>💬 {nbMath(st.bubble)}</div>
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
                   `자리 ${_ML}~${_MR} 뒤집기 — 먼저 양 끝(자리 ${_ML}·${_MR})의 소가 서로 자리를 바꿔요. 창 밖(자리 1·6)은 안 움직여요.`) },
    // 4) 뒤집기 (안쪽)
    { win: [_ML, _MR], rev: 2, reveal: "outside", focus: null, formula: false, payoff: false,
      bubble: t(E, `Then the inner two (spots ${_ML + 1}, ${_MR - 1}) swap too. Ends first, then inside → the whole window is reversed!`,
                   `그 다음 가운데(자리 ${_ML + 1}·${_MR - 1})도 바꿔요. 끝 → 가운데 순서로 → 창 안이 다 뒤집혔어요!`) },
    // 5) 뒤집은 후 검진 (Q2: 어떻게 바뀌었나)
    { win: [_ML, _MR], rev: 2, reveal: "all", focus: null, formula: false, payoff: false,
      bubble: t(E, `AFTER: checkups are spots ${after.join(", ")} — ${after.length}! Spots ${gained.join(", ")} newly matched.`,
                   `뒤집은 후 — 검진 ✓ 는 자리 ${after.join("·")}, ${after.length}마리! 자리 ${gained.join("·")}가 새로 맞았어요.`) },
    // 6) 딱 하나 기억: 서로 자리 바꾼 짝들의 자리수 합 = s (=7). 공식·비교는 다음 시뮬로. (선생님 2026-06-24)
    { win: [_ML, _MR], rev: 2, reveal: "all", focus: null, formula: true, payoff: true,
      bubble: t(E, `Remember just ONE thing! The cows that swapped — spots ${_ML} & ${_MR} (${_ML}+${_MR}=${_MS}), spots ${_ML + 1} & ${_MR - 1} (${_ML + 1}+${_MR - 1}=${_MS}). Their spot numbers always add to ${_MS} (= l + r) — so the inside pattern depends only on s. Now go count a window yourself. 🚀`,
                   `딱 하나만 기억해요! 서로 자리를 바꾼 소들 — 자리 ${_ML}·${_MR} (${_ML}+${_MR}=${_MS}), 자리 ${_ML + 1}·${_MR - 1} (${_ML + 1}+${_MR - 1}=${_MS}). 바뀐 짝의 자리수 합은 늘 ${_MS} (= 양 끝 합 l+r) — 그래서 창 안 모양은 s 에만 달렸어요. 이제 직접 창을 골라 세 봐요. 🚀`) },
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
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {nbMath(st.bubble)}</div>
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
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", overflowWrap: "break-word" }}>💬 {nbMath(st.bubble)}</div>
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
      `창 ${l}~${r} 밖은 안 변해요. 거기서 그대로 맞는 자리만 세요: ${outside}개. 이게 '창 밖'.`) });
  // 2) 안쪽 — 통째로 뒤집혀서 바뀐 것, 뒤집은 뒤 맞는 거 세기
  steps.push({ kind: "inside", out: outside, ins,
    bubble: t(E,
      `Inside ${l}~${r} flips over. After flipping, count spots that match: ${ins} (${ins ? "spots " + insideSpots.join(", ") : "none"}). That's INSIDE.`,
      `창 안(${l}~${r})은 통째로 뒤집혀요. 뒤집은 뒤 맞는 자리를 세요: ${ins}개 (${ins ? "자리 " + insideSpots.join(", ") : "없음"}). 이게 '창 안'.`) });
  // 3) 합치기
  steps.push({ kind: "total", out: outside, ins, total,
    bubble: t(E,
      `This window's checkups = OUTSIDE ${outside} + INSIDE ${ins} = ${total}.  But must we recount the inside for every window?`,
      `이 창의 검진 = 창 밖 ${outside} + 창 안 ${ins} = ${total}.  근데 창 안, 창마다 매번 다시 세야 할까?`) });

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
        🎯 {t(E, "One window's checkups = outside + inside", "한 창의 검진 = 창 밖 + 창 안")}
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
        <div style={{ background: st.kind === "total" ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.kind === "total" ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.kind === "total" ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {nbMath(st.bubble)}</div>
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
        {chip(t(E, "outside", "창 밖"), st.out, "#475569", "#f1f5f9", "#cbd5e1")}
        <span style={{ fontWeight: 800, color: C.dim }}>+</span>
        {chip(t(E, "inside", "창 안"), st.ins == null ? "?" : st.ins, "#0e7490", "#cffafe", "#67e8f9")}
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
      `Remember: the inside depends only on s. So the s=${_REUSE_S} windows (3~4, 2~5, 1~6) all share the SAME inside ✓ spots — here, ${checks.join(" and ")}. Let's check them one by one.`,
      `창 안 모양은 s에만 달렸다고 했죠. 그러니 s=${_REUSE_S}인 창들(3~4, 2~5, 1~6)은 창 안 ✓ 자리가 다 똑같아요 — 여기 ${checks.join("·")}. 하나씩 확인해봐요.`) });
  for (const [l, r] of _REUSE_WINS) {
    const inside = checks.filter(c => c >= l && c <= r);
    steps.push({ kind: "win", l, r, cnt: inside.length, inside,
      bubble: t(E,
        `Window ${l}~${r}: inside = the ✓ spots within it = ${inside.length} (${inside.length ? "spots " + inside.join(", ") : "none"}). No recount — just read the ✓s in range.`,
        `창 ${l}~${r}: 창 안 ✓ = ${inside.length}개 (${inside.length ? "자리 " + inside.join(", ") : "없음"}). 다시 안 세고, 창 안의 ✓만 읽으면 끝.`) });
  }
  steps.push({ kind: "payoff", l: 0, r: 0, cnt: null, inside: checks,
    bubble: t(E,
      `Count the ✓ pattern ONCE per s, every same-s window reuses it — no recounting! In code, this 'write once' IS the prefix (coming up).`,
      `✓ 자리는 s마다 한 번만 세두면 같은 s 창이 다 재사용 — 매번 다시 안 셈! 이 '한 번 적어두기'가 곧 코드의 prefix예요 (조금 뒤에).`) });

  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(idx, steps.length - 1)];
  const isWin = st.kind === "win";

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 8, wordBreak: "keep-all" }}>
        🔁 {t(E, "Same s = same inside ✓ spots → reuse", "같은 s = 창 안 ✓ 자리 똑같음 → 재사용")}
      </div>

      {/* 말풍선 */}
      <div style={{ maxWidth: 540, margin: "0 auto 14px" }}>
        <div style={{ background: st.kind === "payoff" ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.kind === "payoff" ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.kind === "payoff" ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {nbMath(st.bubble)}</div>
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
          <div style={{ width: LAB, textAlign: "right", fontSize: 11, fontWeight: 700, color: "#0e7490" }}>{t(E, `inside ✓ (s=${_REUSE_S})`, `창 안 ✓ (s=${_REUSE_S})`)}</div>
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
            {t(E, `window ${st.l}~${st.r} inside`, `창 ${st.l}~${st.r} 안`)} = <span style={{ fontSize: 16 }}>{st.cnt}</span>
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
      "코드 글자들은 사실 이 그림이에요. a = 소 줄, b = 원하는 줄, i = 자리. 안 뒤집고, 창 안 자리 i 마다 a[l+r−i] 만 가져와요.") });
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
    "for i in range(l, r + 1):   # 창 안 자리 l..r",
    "    v = a[l + r - i]        # 자리 i 에 올 소",
    "    if v == b[i]:           # 원하는 소와 같으면",
    "        inside += 1         # 검진 ✓",
  ];
  const cc = [
    "for (int i = l; i <= r; i++) {  // 창 안 자리 l..r",
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
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 12.5, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {nbMath(st.bubble)}</div>
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
   CheckupsExpandSim — center-expansion 풀이(선생님 검증 코드)의 핵심 시뮬.
   가운데에서 뒤집는 구간을 한 칸씩 넓히며 '새로 들어온 두 끝'만 −1/+1 로 갱신 →
   각 구간 검진 수를 O(1)에 구하고 answer 에 집계. (선생님 2026-07-02: prefix → center-expansion 교체.)
   예: cow=[1,2,3,4,5,6], want=[6,5,4,3,5,1] (0-indexed, 6칸 — 선생님 2026-07-03: 4칸은 너무 적다).
   중심 [2,3] → [1,4] → [0,5] 로 '두 번' 넓히며 추적: 첫 넓힘=한 끝 +1·다른 끝 −1, 둘째=+1·+1.
   → '한 칸씩 넓히기'가 반복되는 걸 눈으로 보여줌 (N=4는 한 번만 넓혀져서 안 와닿았음).
   ════════════════════════════════════════════════════════════════════ */
const _EX_COW = [1, 2, 3, 4, 5, 6];
const _EX_WANT = [6, 5, 4, 3, 5, 1];
const _EX_ANS = [6, 12, 0, 2, 0, 1, 0];   // 이 예시의 최종 answer (코드가 만드는 값)

// rev = 현재 구간을 뒤집었을 때의 소 배열. 초록 = want 와 같은 자리(검진). matches = 초록 개수.
// 핵심: 구간을 넓혀도 '가운데'는 rev 값이 그대로 → 두 끝만 다시 세면 됨 (선생님 2026-07-02).
function _buildExpandSteps(E) {
  // 진짜 슬로우모션: 각 프레임에 한 가지 변화만 (선생님 2026-07-13: "진짜 한 단계별로").
  return [
    /* ── 0. Setup (2 steps) ── */
    { rev: [1, 2, 3, 4, 5, 6], win: null, changed: [], pending: [], same: [], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Two rows to know: 🐮 cow (top) and 📋 want (bottom). A spot is a checkup (green) when they already match.",
                   "두 줄만 알면 돼요: 🐮 소 (위)와 📋 want (아래). 두 값이 같은 자리 = 검진(초록).") },
    { rev: [1, 2, 3, 4, 5, 6], win: null, changed: [], pending: [], same: [], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "No flip yet. Only spot 4 matches (5=5) → matches = 1. This is our starting point.",
                   "아직 아무것도 안 뒤집음. 자리 4만 맞아요 (5=5) → matches = 1. 여기서 출발.") },

    /* ── 1. Flip [2,3] (5 steps) ── */
    { rev: [1, 2, 3, 4, 5, 6], win: [2, 3], changed: [], pending: [], same: [], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Let's pick a tiny interval: spots 2 and 3. See the bracket above — that's our flip zone.",
                   "작은 구간 골라요: 자리 2와 3. 위에 브래킷 보이죠 — 뒤집을 구간이에요.") },
    { rev: [1, 2, 3, 4, 5, 6], win: [2, 3], changed: [], pending: [2, 3], same: [], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "The two ends (spots 2 and 3) are about to swap cows. cow[2]=3 ↔ cow[3]=4.",
                   "양 끝(자리 2, 3)이 곧 소를 바꿔요. cow[2]=3 ↔ cow[3]=4.") },
    { rev: [1, 2, 4, 3, 5, 6], win: [2, 3], changed: [2, 3], pending: [], same: [], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Swapped! Flipped cows are now 1 2 4 3 5 6.",
                   "바뀌었어요! 뒤집힌 소 = 1 2 4 3 5 6.") },
    { rev: [1, 2, 4, 3, 5, 6], win: [2, 3], changed: [], pending: [], same: [], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Count green (= matches with want): spot 3 (4=4), spot 4 (3=3), spot 5 (5=5). Three greens.",
                   "초록 세기 (= want랑 같은 자리): 자리 3 (4=4), 자리 4 (3=3), 자리 5 (5=5). 초록 3개.") },
    { rev: [1, 2, 4, 3, 5, 6], win: [2, 3], changed: [], pending: [], same: [], focus: null, delta: {}, tally: 3, done: false, payoff: false,
      bubble: t(E, "matches = 3 → answer[3] += 1.",
                   "matches = 3 → answer[3] += 1.") },

    /* ── 2. Widen [1,4] — KEY insight, deep breakdown (9 steps) ── */
    { rev: [1, 2, 4, 3, 5, 6], win: [1, 4], changed: [], pending: [], same: [], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Now widen the window ONE step: [2,3] → [1,4]. Same center, +1 on each side.",
                   "이제 창을 한 칸 넓힘: [2,3] → [1,4]. 중심 그대로, 양옆 +1.") },
    { rev: [1, 2, 4, 3, 5, 6], win: [1, 4], changed: [], pending: [], same: [2, 3], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Watch the middle (spots 2, 3): still 4, 3. Reversing is symmetric — growing both sides keeps the inside put!",
                   "가운데(자리 2, 3) 봐요: 여전히 4, 3. 뒤집기가 대칭이라 양옆을 넓혀도 안쪽은 그대로!") },
    { rev: [1, 2, 4, 3, 5, 6], win: [1, 4], changed: [], pending: [1, 4], same: [2, 3], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "So only the 2 NEW ends (spots 1 and 4) need checking. Middle already counted → skip.",
                   "그러니 새 양 끝(자리 1, 4)만 확인하면 돼요. 가운데는 이미 셌으니 건너뜀.") },
    { rev: [1, 2, 4, 3, 5, 6], win: [1, 4], changed: [], pending: [4], same: [2, 3], focus: 1, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Spot 1 first. Before: cow was 2, want is 5 → 2 ≠ 5, not green.",
                   "먼저 자리 1. 전에는: 소 2, want 5 → 2 ≠ 5, 초록 아님.") },
    { rev: [1, 5, 4, 3, 5, 6], win: [1, 4], changed: [1], pending: [4], same: [2, 3], focus: 1, delta: { 1: "+1" }, tally: null, done: false, payoff: false,
      bubble: t(E, "cow[4]=5 slides in to spot 1 → 5 = want 5 → GREEN! +1. matches = 3+1 = 4.",
                   "cow[4]=5 가 자리 1로 들어옴 → 5 = want 5 → 초록! +1. matches = 3+1 = 4.") },
    { rev: [1, 5, 4, 3, 5, 6], win: [1, 4], changed: [], pending: [], same: [2, 3], focus: 4, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Now spot 4. Before: cow was 5, want is 5 → matched, was green.",
                   "이제 자리 4. 전에는: 소 5, want 5 → 맞았음, 초록이었죠.") },
    { rev: [1, 5, 4, 3, 2, 6], win: [1, 4], changed: [4], pending: [], same: [2, 3], focus: 4, delta: { 4: "−1" }, tally: null, done: false, payoff: false,
      bubble: t(E, "cow[1]=2 slides in to spot 4 → 2 ≠ want 5 → not green anymore. −1. matches = 4−1 = 3.",
                   "cow[1]=2 가 자리 4로 들어옴 → 2 ≠ want 5 → 초록 아니게 됨. −1. matches = 4−1 = 3.") },
    { rev: [1, 5, 4, 3, 2, 6], win: [1, 4], changed: [], pending: [], same: [], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Only 2 spots touched (the ends), the middle was never recounted. THAT'S the trick.",
                   "딱 2 칸(양 끝)만 건드렸어요, 가운데는 다시 안 셌어요. 이게 요령.") },
    { rev: [1, 5, 4, 3, 2, 6], win: [1, 4], changed: [], pending: [], same: [], focus: null, delta: {}, tally: 3, done: false, payoff: false,
      bubble: t(E, "matches = 3 → answer[3] += 1.",
                   "matches = 3 → answer[3] += 1.") },

    /* ── 3. Widen [0,5] — reinforce, same granularity (8 steps) ── */
    { rev: [1, 5, 4, 3, 2, 6], win: [0, 5], changed: [], pending: [], same: [], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Widen ONE more step: [1,4] → [0,5]. Same move.",
                   "또 한 칸 넓힘: [1,4] → [0,5]. 같은 동작.") },
    { rev: [1, 5, 4, 3, 2, 6], win: [0, 5], changed: [], pending: [], same: [1, 2, 3, 4], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Middle (spots 1–4) still exactly the same values. Symmetry again.",
                   "가운데(자리 1~4)도 그대로. 또 같은 대칭.") },
    { rev: [1, 5, 4, 3, 2, 6], win: [0, 5], changed: [], pending: [0, 5], same: [1, 2, 3, 4], focus: null, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Just 2 new ends: spots 0 and 5.",
                   "새로 확인할 곳: 자리 0과 5 두 개만.") },
    { rev: [1, 5, 4, 3, 2, 6], win: [0, 5], changed: [], pending: [5], same: [1, 2, 3, 4], focus: 0, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Spot 0. Before: cow was 1, want is 6 → 1 ≠ 6, not green.",
                   "자리 0. 전에는: 소 1, want 6 → 1 ≠ 6, 초록 아님.") },
    { rev: [6, 5, 4, 3, 2, 6], win: [0, 5], changed: [0], pending: [5], same: [1, 2, 3, 4], focus: 0, delta: { 0: "+1" }, tally: null, done: false, payoff: false,
      bubble: t(E, "cow[5]=6 slides in → 6 = want 6 → GREEN! +1. matches = 3+1 = 4.",
                   "cow[5]=6 들어옴 → 6 = want 6 → 초록! +1. matches = 3+1 = 4.") },
    { rev: [6, 5, 4, 3, 2, 6], win: [0, 5], changed: [], pending: [], same: [1, 2, 3, 4], focus: 5, delta: {}, tally: null, done: false, payoff: false,
      bubble: t(E, "Spot 5. Before: cow was 6, want is 1 → 6 ≠ 1, not green.",
                   "자리 5. 전에는: 소 6, want 1 → 6 ≠ 1, 초록 아님.") },
    { rev: [6, 5, 4, 3, 2, 1], win: [0, 5], changed: [5], pending: [], same: [1, 2, 3, 4], focus: 5, delta: { 5: "+1" }, tally: null, done: false, payoff: false,
      bubble: t(E, "cow[0]=1 slides in → 1 = want 1 → GREEN! +1. matches = 4+1 = 5.",
                   "cow[0]=1 들어옴 → 1 = want 1 → 초록! +1. matches = 4+1 = 5.") },
    { rev: [6, 5, 4, 3, 2, 1], win: [0, 5], changed: [], pending: [], same: [], focus: null, delta: {}, tally: 5, done: false, payoff: false,
      bubble: t(E, "matches = 5 → answer[5] += 1. Two widens, 2 spots each — the middle was NEVER recounted.",
                   "matches = 5 → answer[5] += 1. 두 번 넓히는 동안 매번 2칸만 — 가운데는 한 번도 다시 안 셌어요.") },

    /* ── 4. Payoff (1 step) ── */
    { rev: [6, 5, 4, 3, 2, 1], win: null, changed: [], pending: [], same: [], focus: null, delta: {}, tally: null, done: false, payoff: true,
      bubble: t(E, "The rule: each widen = O(1) work (only 2 ends). No matter how big the interval, we always fix only 2 spots per step.",
                   "규칙: 한 번 넓힘 = O(1) 일 (양 끝 2칸). 구간이 아무리 커져도 매번 딱 2칸만.") },

    /* ── 5. All centers (2 steps) ── */
    { rev: [1, 2, 3, 4, 5, 6], win: null, changed: [], pending: [], same: [], focus: null, delta: {}, tally: null, done: false, payoff: false, centers: true,
      bubble: t(E, "Two center kinds: odd ([i,i] = one spot, no flip) and even ([i,i+1] = two spots). Every interval belongs to exactly one center.",
                   "중심 두 종류: 홀수([i,i]=한 칸, 안 뒤집음)와 짝수([i,i+1]=두 칸). 모든 구간은 정확히 한 중심에 속함.") },
    { rev: [1, 2, 3, 4, 5, 6], win: null, changed: [], pending: [], same: [], focus: null, delta: {}, tally: null, done: true, payoff: true,
      bubble: t(E, "Every center → widen till it hits a wall, 2 ends per step. Total O(N²). (Full run in the code next!) 🚀",
                   "모든 중심 → 벽에 닿을 때까지 넓히며, 매 칸 2 끝. 합쳐서 O(N²). (전부 돌려보는 건 다음 코드에서!) 🚀") },
  ];
}

export function CheckupsExpandSim({ E }) {
  const steps = _buildExpandSteps(E);
  const { idx, safe, setIdx, total } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const N = _EX_COW.length, IDX = _EX_COW.map((_, i) => i);   // 6칸 (선생님 2026-07-03)
  const TW = 44, STEP = 56, GAP = STEP - TW, LAB = 92;
  const [L, R] = st.win || [-1, -1];
  const hasWin = !!st.win;
  const isGreen = p => st.rev[p] === _EX_WANT[p];   // 뒤집힌 소가 want 와 같음 = 검진
  const matches = IDX.reduce((a, p) => a + (isGreen(p) ? 1 : 0), 0);
  const showMatches = !st.done && !st.centers;

  const GRIDW = LAB + 8 + N * STEP - GAP;
  const cellCenter = i => LAB + 8 + i * STEP + TW / 2;
  const anchorCol = st.focus != null ? st.focus
    : st.pending.length ? (st.pending[0] + st.pending[st.pending.length - 1]) / 2
    : hasWin ? (L + R) / 2 : (N - 1) / 2;
  const anchorX = cellCenter(anchorCol);
  const BW = 348;
  const bubbleLeft = Math.max(2, Math.min(GRIDW - BW - 2, anchorX - BW / 2));
  const tailLeft = Math.max(12, Math.min(BW - 28, anchorX - bubbleLeft - 8));

  const rowWrap = (label, color, node) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{ width: LAB, textAlign: "right", fontSize: 11, fontWeight: 700, color, fontFamily: "'JetBrains Mono',monospace", wordBreak: "keep-all" }}>{label}</div>
      {node}
    </div>
  );

  // 🐮 원래 소 — 참고용, 흐릿
  const cowCell = (p) => (
    <div key={p} style={{ width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16, background: "#f8fafc", color: "#94a3b8", border: "1.5px solid #eef2f6" }}>{_EX_COW[p]}</div>
  );
  // 🔄 뒤집힌 소 — 핵심. 초록=검진(want와 같음). pending=곧 바뀜(점선), changed=방금 바뀜, focus=±delta.
  const revCell = (p) => {
    const green = isGreen(p);
    const foc = st.focus === p;
    const chg = st.changed.includes(p);
    const pend = st.pending.includes(p);
    const sm = st.same.includes(p);   // 넓혀도 그대로인 가운데
    const dl = st.delta[p];
    const plus = dl === "+1";
    const bd = foc ? (plus ? "#22c55e" : "#f87171") : pend ? "#fb923c" : sm ? "#10b981" : chg ? "#0891b2" : green ? "#86efac" : "#e2e8f0";
    return (
      <div key={p} style={{ position: "relative" }}>
        <div style={{ width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: foc ? 20 : 18,
          background: green ? "#dcfce7" : "#fff", color: green ? "#15803d" : "#7f1d1d",
          border: `${foc ? 3 : (pend || chg || sm) ? 2.5 : 1.5}px ${(pend || sm) ? "dashed" : "solid"} ${bd}`,
          boxShadow: foc ? (plus === undefined
            ? `0 0 0 4px rgba(251,191,36,.35), 0 0 0 8px rgba(251,191,36,.15)`
            : `0 0 0 4px ${plus ? "rgba(34,197,94,.35)" : "rgba(248,113,113,.35)"}, 0 0 0 8px ${plus ? "rgba(34,197,94,.15)" : "rgba(248,113,113,.15)"}`)
            : "none",
          transform: foc ? "scale(1.06)" : "none",
          transition: "all .25s" }}>{st.rev[p]}</div>
        {foc && dl && <span style={{ position: "absolute", top: -10, right: -6, fontSize: 11.5, fontWeight: 900, padding: "0 5px", borderRadius: 6, background: plus ? "#16a34a" : "#dc2626", color: "#fff", fontFamily: "'JetBrains Mono',monospace", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }}>{dl}</span>}
        {sm && !foc && <span style={{ position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)", fontSize: 8, fontWeight: 800, padding: "0 4px", borderRadius: 5, background: "#10b981", color: "#fff", whiteSpace: "nowrap", boxShadow: "0 1px 2px rgba(0,0,0,.18)" }}>{t(E, "same", "그대로")}</span>}
      </div>
    );
  };
  // 📋 want — 참고
  const wantCell = (p) => (
    <div key={p} style={{ width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16, background: "#eff6ff", color: "#1e40af", border: "1.5px solid #bfdbfe" }}>{_EX_WANT[p]}</div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 3 }}>
        📊 {t(E, "Widen from the center — the middle stays, only the two ends change", "가운데에서 넓히며 — 가운데는 그대로, 두 끝만 바뀜")}
      </div>
      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>
        cow = [1,2,3,4,5,6]　want = [6,5,4,3,5,1]
      </div>

      {/* 말풍선: focus/pending 스텝에선 Y 로 슥 내려와 flipped 행 바로 위에 붙음 (선생님 2026-07-13) */}
      {(() => {
        // focus 스텝 → 아래로 이동 (cow orig 행 위에 겹침 → flipped 행 바로 위).
        // pending 스텝 (뒤집을 자리 표시) → 중간 위치.
        // 그 외(개요/payoff) → 위쪽 고정.
        const shiftY = st.focus != null ? 92 : (st.pending && st.pending.length > 0 ? 46 : 0);
        return (
          <div style={{ position: "relative", width: GRIDW, height: 100, margin: "0 auto 8px", zIndex: 5 }}>
            <div style={{ position: "absolute", bottom: 8, left: bubbleLeft, width: BW, background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "10px 13px", fontSize: 12.5, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.5, fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", textAlign: "left", boxShadow: "0 4px 14px rgba(0,0,0,.10)", transform: `translateY(${shiftY}px)`, transition: "transform .42s cubic-bezier(.4,0,.2,1), left .38s cubic-bezier(.4,0,.2,1)" }}>
              💬 {nbMath(st.bubble)}
              <div style={{ position: "absolute", bottom: -9, left: tailLeft, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, transition: "left .38s cubic-bezier(.4,0,.2,1)" }} />
            </div>
          </div>
        );
      })()}

      <div style={{ width: "fit-content", margin: "0 auto" }}>
        {/* 뒤집는 구간 브래킷 */}
        {rowWrap("", "#0e7490",
          <div style={{ position: "relative", height: 16, width: N * STEP - GAP }}>
            {hasWin && <div style={{ position: "absolute", top: 2, left: L * STEP, width: (R - L + 1) * STEP - GAP, height: 12, borderRadius: 6, border: "2px solid #0891b2", borderBottom: "none", transition: "left .4s cubic-bezier(.4,0,.2,1), width .4s cubic-bezier(.4,0,.2,1)" }} />}
            {hasWin && <div style={{ position: "absolute", top: -3, left: L * STEP + ((R - L + 1) * STEP - GAP) / 2, transform: "translateX(-50%)", fontSize: 9.5, fontWeight: 800, color: "#0891b2", whiteSpace: "nowrap", transition: "left .4s cubic-bezier(.4,0,.2,1)" }}>{t(E, "flip", "뒤집기")} [{L},{R}]</div>}
          </div>
        )}
        {rowWrap(t(E, "🐮 cow (orig)", "🐮 원래 소"), "#94a3b8",
          <div style={{ display: "flex", gap: GAP }}>{IDX.map(cowCell)}</div>
        )}
        {rowWrap(t(E, "🔄 flipped", "🔄 뒤집힌 소"), "#15803d",
          <div style={{ display: "flex", gap: GAP }}>{IDX.map(revCell)}</div>
        )}
        {rowWrap("📋 want", "#1e40af",
          <div style={{ display: "flex", gap: GAP }}>{IDX.map(wantCell)}</div>
        )}
        {rowWrap("", C.dim,
          <div style={{ display: "flex", gap: GAP }}>{IDX.map(p => <div key={p} style={{ width: TW, textAlign: "center", fontSize: 9.5, color: C.dim }}>{t(E, "spot", "자리")} {p}</div>)}</div>
        )}
      </div>

      {/* matches 카운터 + tally */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, marginTop: 10, flexWrap: "wrap" }}>
        {showMatches && (
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800, color: "#0e7490", background: "#ecfeff", border: "1.5px solid #67e8f9", borderRadius: 10, padding: "5px 14px" }}>
            {t(E, "matches (green)", "검진 수 = 초록")} = {matches}
          </div>
        )}
        {st.tally != null && (
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#15803d", background: "#dcfce7", border: "1.5px solid #86efac", borderRadius: 10, padding: "5px 12px" }}>
            answer[{st.tally}] += 1
          </div>
        )}
      </div>

      {/* 최종 출력 (done 스텝) — 코드가 만드는 값 */}
      {st.done && (
        <div style={{ margin: "12px auto 0", width: "fit-content", textAlign: "center" }}>
          <div style={{ fontSize: 10.5, color: C.dim, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "final output (from the code)", "최종 출력 (코드가 만듦)")}</div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {_EX_ANS.map((v, k) => (
              <div key={k} style={{ width: 40, height: 40, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 16, background: "#f0fdf4", border: "1.5px solid #86efac", color: "#15803d" }}>{v}</div>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 12 }} />
      <SimNav idx={idx} total={total} onIdx={setIdx} accent="#0891b2" showLabels isEn={E} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CheckupsWindowSplitSim — ch3 도입: 진짜 '창문'(문짝 2개)이 닫혔다 열리며
   창 안만 뒤집히는 걸 보여주고 → 검진 = 창 밖 + 창 안 나누기로 착지.
   (선생님 2026-07-02: "진짜 윈도우 그림 — 문 닫았다 열었다 느낌".
    + 해결책 제시는 "그럼 어떻게 해결하면 될까? 생각해보자"로 시작.)
   소는 transition 없음 — 뒤집기는 늘 닫힌 문 뒤에서 (열면 "짠!").
   '어떻게' 움직이는지는 다음 슬라이드 MirrorSim 이 보여줌.
   ════════════════════════════════════════════════════════════════════ */
export function CheckupsWindowSplitSim({ E }) {
  // 창문(유리+창살)이 여는 만큼 = 뒤집을 구간. 활짝(1~6) → 2~3 → 2~4 → 2~5 로 '범위가 바뀜'을
  // 보여주고 → [2,5]에서 뒤집기 → 창 밖/창 안 나누기(누적합 풀이)로 착지.
  // (선생님 2026-07-02: '창문이 열렸다 닫혔다 하며 범위를 바꾼다. 2~3·2~4·2~5. 창문답게.')
  const steps = [
    { l: 1, r: 6, flip: false, split: false, payoff: false,
      bubble: t(E, "So — how do we solve this? Let's think. FJ flips ONE range — picture a window on it. Open it wide and it's all of 1~6.",
                   "그럼 어떻게 풀까요? 같이 생각해봐요. FJ는 한 구간을 골라 뒤집어요 — 거기에 '창문'을 달았어요. 활짝 열면 1~6 전체.") },
    { l: 2, r: 3, flip: false, split: false, payoff: false,
      bubble: t(E, "The window opens to any width — the OPEN part is the flip range. Narrow: 2~3.",
                   "창은 아무 만큼이나 열려요 — 열린 부분이 뒤집을 구간. 좁게 열면 2~3.") },
    { l: 2, r: 4, flip: false, split: false, payoff: false,
      bubble: t(E, "Open a bit more — 2~4.", "조금 더 열면 2~4.") },
    { l: 2, r: 5, flip: false, split: false, payoff: false,
      bubble: t(E, "Open to 2~5 — let's use this window as our example.", "2~5 까지 열어서, 이 창으로 예를 볼게요.") },
    { l: 2, r: 5, flip: true, split: false, payoff: false,
      bubble: t(E, "Flip the cows inside the window (2~5) — their order reverses. Outside (1·6) never moves.",
                   "창 안(2~5)의 소를 뒤집으면 — 순서가 반대로! 창 밖(1·6)은 그대로.") },
    { l: 2, r: 5, flip: true, split: true, payoff: true,
      bubble: t(E, "So split the count — checkups = outside (1·6, unchanged) + inside (2~5, flipped).",
                   "그래서 검진을 두 조각으로 — 창 밖(1·6, 안 변함) + 창 안(2~5, 뒤집힘).") },
  ];
  const { idx, safe, setIdx, total } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const wl = st.l, wr = st.r;
  const TW = 44, STEP = 52, GAP = STEP - TW;
  const PAD = 20;                              // 양옆 여유 — 활짝 열면 문짝이 이 자리로 접혀 들어감
  const gridW = 6 * STEP - GAP;
  const boxW = gridW + PAD * 2;
  const ltr = tk => String.fromCharCode(64 + tk);
  const H = TW + 16;
  // 열린 구멍(=뒤집을 구간 [wl,wr]) + 그 바깥을 덮는 문짝 2개 (열수록 옆으로 접혀 얇아짐).
  const openL = PAD + (wl - 1) * STEP - 5;
  const openR = PAD + (wr - 1) * STEP + TW + 5;
  const leafLW = Math.max(0, openL - 3), leafRW = Math.max(0, boxW - openR - 3);
  const leaf = (extra) => ({ position: "absolute", top: 3, height: H - 6, zIndex: 3, pointerEvents: "none", borderRadius: 6, background: "linear-gradient(180deg,rgba(240,222,180,.72),rgba(224,198,140,.78))", boxShadow: "inset 0 0 0 2px #bd914a, 0 1px 4px rgba(146,64,14,.25)", transition: "left .5s cubic-bezier(.4,0,.2,1), width .5s cubic-bezier(.4,0,.2,1)", ...extra });
  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 10 }}>
        🪟 {t(E, "The window — open it as wide as the flip range", "창문 — 여는 만큼이 뒤집을 구간")}
      </div>
      {/* 말풍선 */}
      <div style={{ position: "relative", maxWidth: 470, margin: "0 auto 26px" }}>
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 12.5, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, fontWeight: 600, wordBreak: "keep-all", textAlign: "left" }}>💬 {nbMath(st.bubble)}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>
      {/* 소 줄 + 여닫는 창문 (열린 구멍 = 뒤집을 구간, 문짝이 옆으로 접히며 열림) */}
      <div style={{ position: "relative", width: boxW, height: H, margin: "0 auto", background: "#eef6fa", borderRadius: 10, boxShadow: "inset 0 0 0 2px #cfe4ee" }}>
        {/* 열린 구멍 (밝은 하늘빛 = 활짝 열림) — 폭이 [wl,wr] 만큼 */}
        <div style={{ position: "absolute", top: 2, left: openL, width: Math.max(0, openR - openL), height: H - 4, borderRadius: 8, background: "linear-gradient(180deg,#eaf8ff,#cfeeff)", boxShadow: "inset 0 0 0 3px #38bdf8", zIndex: 1, pointerEvents: "none", transition: "left .5s cubic-bezier(.4,0,.2,1), width .5s cubic-bezier(.4,0,.2,1)" }} />
        {/* 소 6개 (항상 보임 — 창 밖은 문짝 뒤로 흐릿) */}
        {[1, 2, 3, 4, 5, 6].map(tk => {
          const slot = (st.flip && tk >= wl && tk <= wr) ? _slotG(tk, wl, wr, 2) : tk - 1;
          const sp = _SP[tk], inWin = tk >= wl && tk <= wr;
          return (
            <div key={tk} style={{ position: "absolute", top: 8, left: PAD + slot * STEP, width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, background: sp.bg, color: sp.tx, border: `1.5px solid ${sp.bd}`, opacity: inWin ? 1 : 0.85, transition: "left .5s cubic-bezier(.4,0,.2,1)", zIndex: 2 }}>{ltr(tk)}</div>
          );
        })}
        {/* 문짝 2개 — 창 밖을 덮음 (활짝 열면 옆으로 접혀 얇아짐). 손잡이 표시. */}
        {leafLW > 4 && <div style={leaf({ left: 3, width: leafLW })}><div style={{ position: "absolute", right: 5, top: "50%", width: 4, height: 16, marginTop: -8, borderRadius: 3, background: "#bd914a" }} /></div>}
        {leafRW > 4 && <div style={leaf({ left: openR + 3, width: leafRW })}><div style={{ position: "absolute", left: 5, top: "50%", width: 4, height: 16, marginTop: -8, borderRadius: 3, background: "#bd914a" }} /></div>}
        {/* 창 라벨 */}
        <div style={{ position: "absolute", top: -20, left: (openL + openR) / 2, transform: "translateX(-50%)", background: "#0891b2", color: "#fff", fontSize: 9.5, fontWeight: 800, borderRadius: 6, padding: "1px 8px", whiteSpace: "nowrap", zIndex: 5, transition: "left .5s cubic-bezier(.4,0,.2,1)" }}>🪟 {t(E, "open", "열린 창")} {wl}~{wr}</div>
      </div>
      {/* 자리 번호 */}
      <div style={{ display: "flex", gap: GAP, width: boxW, boxSizing: "border-box", padding: `0 ${PAD}px`, margin: "8px auto 0" }}>
        {[1, 2, 3, 4, 5, 6].map(p => <div key={p} style={{ width: TW, textAlign: "center", fontSize: 9.5, color: p >= wl && p <= wr ? "#0284c7" : C.dim, fontWeight: p >= wl && p <= wr ? 700 : 400 }}>{t(E, "spot", "자리")} {p}</div>)}
      </div>
      {/* 나누기 착지 (마지막 스텝만) — 빈 스텝엔 공간 안 잡음 (카드가 세로 가운데 정렬하므로 예약 불필요) */}
      <div style={{ marginTop: st.split ? 14 : 0 }}>
        {st.split && (
          <div style={{ maxWidth: 470, margin: "0 auto" }}>
            <div style={{ background: "#ecfeff", border: "1px solid #67e8f9", borderRadius: 12, padding: "10px 13px", fontSize: 12, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
              <div><b style={{ color: "#475569" }}>{t(E, "OUTSIDE the window", "창 밖")}</b> — {t(E, "never moves → count it once up front. Easy.", "안 움직여요 → 미리 한 번 세두면 끝. 쉬움.")}</div>
              <div><b style={{ color: "#0e7490" }}>{t(E, "INSIDE the window", "창 안")}</b> — {t(E, "gets reversed → this is the puzzle. We crack it next.", "뒤집혀서 바뀌어요 → 여기가 숙제. 다음에서 풀어요.")}</div>
              <div style={{ marginTop: 8, textAlign: "center", padding: "8px 10px", background: "#fff", border: "1px dashed #67e8f9", borderRadius: 8, fontWeight: 800, color: "#0e7490", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
                {t(E, "checkups = (outside) + (inside)", "검진 수 = (창 밖) + (창 안)")}
              </div>
            </div>
          </div>
        )}
      </div>
      <SimNav idx={idx} total={total} onIdx={setIdx} accent="#0891b2" showLabels isEn={E} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CheckupsWindowRecapSim — ch4 도입 30초 복습: '창(window)' = FJ 가 골라
   통째로 뒤집는 구간. 창 안 = 뒤집히는 부분(순서 반대), 창 밖 = 그대로.
   (선생님 2026-07-02: prefix 시뮬 전에 창이 뭔지 + '창 안 = 뒤집을 부분' 짚기.)
   ════════════════════════════════════════════════════════════════════ */
export function CheckupsWindowRecapSim({ E }) {
  const steps = [
    { rev: 0, payoff: false,
      bubble: t(E, "Quick recap — FJ picks one stretch of the row, e.g. [2~5]. That stretch is the FLIP WINDOW.",
                   "30초 복습 — FJ는 줄에서 구간 하나를 골라요. 예: [2~5]. 이 구간이 '뒤집는 창'이에요.") },
    { rev: 2, payoff: false,
      bubble: t(E, "INSIDE the window = the part that gets reversed. The cows' order flips end-to-end.",
                   "창 안 = 뒤집히는 부분. 안의 소들이 통째로 순서가 반대가 돼요.") },
    { rev: 2, payoff: true,
      bubble: t(E, "Outside the window (spots 1·6) nothing moves. That's why we count ✓ as 'outside + inside'.",
                   "창 밖(자리 1·6)은 그대로예요. 그래서 검진을 '창 밖 + 창 안'으로 나눠 세는 거예요.") },
  ];
  const { idx, safe, setIdx, total } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const TW = 44, STEP = 52, GAP = STEP - TW;
  const wl = 2, wr = 5;
  const gridW = 6 * STEP - GAP;
  const ltr = tk => String.fromCharCode(64 + tk);
  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 10 }}>
        🔁 {t(E, "What was the 'window' again?", "'창'이 뭐였죠? — 30초 복습")}
      </div>
      {/* 말풍선 (창이 항상 화면 중앙이라 고정) */}
      <div style={{ position: "relative", maxWidth: 460, margin: "0 auto 22px" }}>
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 12.5, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.6, fontWeight: 600, wordBreak: "keep-all", textAlign: "left" }}>💬 {nbMath(st.bubble)}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>
      {/* 소 줄 + 뒤집는 창 (소가 실제로 슬라이드하며 뒤집힘) */}
      <div style={{ position: "relative", width: gridW, height: TW, margin: "8px auto 0" }}>
        <div style={{ position: "absolute", top: -6, left: (wl - 1) * STEP - 5, width: (wr - wl + 1) * STEP - GAP + 10, height: TW + 12, borderRadius: 12, background: "#ecfeff", border: "2px solid #22d3ee", boxShadow: "0 0 0 3px rgba(34,211,238,.12)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: -19, left: (wl - 1) * STEP - 5 + ((wr - wl + 1) * STEP - GAP + 10) / 2, transform: "translateX(-50%)", background: "#0891b2", color: "#fff", fontSize: 9.5, fontWeight: 800, borderRadius: 6, padding: "1px 8px", whiteSpace: "nowrap", zIndex: 3 }}>🔁 {t(E, "flip window", "뒤집는 창")} {wl}~{wr}</div>
        {[1, 2, 3, 4, 5, 6].map(tk => {
          const slot = _slotG(tk, wl, wr, st.rev), sp = _SP[tk];
          return (
            <div key={tk} style={{ position: "absolute", top: 0, left: slot * STEP, width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, background: sp.bg, color: sp.tx, border: `1.5px solid ${sp.bd}`, transition: "left .55s cubic-bezier(.4,0,.2,1)", zIndex: 1 }}>{ltr(tk)}</div>
          );
        })}
      </div>
      {/* 자리 번호 */}
      <div style={{ display: "flex", gap: GAP, width: gridW, margin: "6px auto 0" }}>
        {[1, 2, 3, 4, 5, 6].map(p => <div key={p} style={{ width: TW, textAlign: "center", fontSize: 9.5, color: p >= wl && p <= wr ? "#0e7490" : C.dim, fontWeight: p >= wl && p <= wr ? 700 : 400 }}>{t(E, "spot", "자리")} {p}</div>)}
      </div>
      <div style={{ marginTop: 14 }}>
        <SimNav idx={idx} total={total} onIdx={setIdx} accent="#0891b2" showLabels isEn={E} />
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
  // 용어: '창 밖 ✓'. 선생님 2026-07-02: "이해가 안 되니 스텝을 버리지 마 — 한 칸씩 다."
  // → 표를 자리 1..6 한 칸씩 세며 채우고(built/cntAt), 창은 앞부분·뒷부분·합을 각 스텝으로.
  const CK = _PFCK, PF = _PF;   // 제자리 맞나(1/0), 여기까지 누적 [1,1,2,3,3,4]
  const steps = [
    { built: 0, cntAt: 0, l: 0, r: 0, hl: null, focus: null, payoff: false,
      bubble: t(E, "Cows OUTSIDE the flip window never move — a spot is ✓ if it already matches. Let's count '✓ up to here' from the left, one spot at a time.",
                   "뒤집는 창 밖 소는 안 움직여요 — 제자리라 원하는 종과 같으면 ✓. 왼쪽부터 '여기까지 ✓'를 한 칸씩 세볼게요.") },
  ];
  for (let k = 1; k <= 6; k++) {
    const v = CK[k - 1], p = PF[k - 1], pv = k > 1 ? PF[k - 2] : 0;
    steps.push({ built: k, cntAt: k, l: 0, r: 0, hl: null, focus: null, payoff: false,
      bubble: v
        ? t(E, `Spot ${k}: matches in place → ✓. '✓ up to here' = ${pv}+1 = ${p}.`,
              `자리 ${k}: 제자리 그대로 원하는 종과 같음 → ✓. '여기까지 ✓' = ${pv}+1 = ${p}.`)
        : t(E, `Spot ${k}: doesn't match → ✗. '✓ up to here' stays ${p}.`,
              `자리 ${k}: 원하는 종과 다름 → ✗. '여기까지 ✓' = 그대로 ${p}.`) });
  }
  steps.push({ built: 6, cntAt: 0, l: 0, r: 0, hl: null, focus: null, payoff: false,
    bubble: t(E, "Done — one table [1,1,2,3,3,4]. Now ANY window reads its outside by subtracting.",
                 "다 적었어요 — 표 하나 [1,1,2,3,3,4]. 이제 어떤 창이든 빼기로 창 밖을 읽어요.") });
  // 창 사용: 소개 → 앞부분 → 뒷부분 → 합, 각각 한 스텝씩.
  const useWin = (l, r, intro, sumPayoff) => {
    const front = l >= 2 ? PF[l - 2] : 0, back = PF[5] - PF[r - 1];
    if (intro) steps.push({ built: 6, cntAt: 0, l, r, hl: "out", focus: null, payoff: false,
      bubble: t(E, `Flip window [${l}~${r}]. Its outside ✓ = FRONT (before) + BACK (after).`,
                   `뒤집는 창 [${l}~${r}]. 창 밖 ✓ = 앞부분(창 앞) + 뒷부분(창 뒤).`) });
    steps.push({ built: 6, cntAt: 0, l, r, hl: "out", focus: "before", payoff: false,
      bubble: t(E, `Front (before spot ${l}): read straight off — 'up to spot ${l - 1}' = ${front}.`,
                   `앞부분(자리 ${l} 앞): 표에서 바로 — '자리 ${l - 1}까지' = ${front}개.`) });
    steps.push({ built: 6, cntAt: 0, l, r, hl: "out", focus: "after", payoff: false,
      bubble: t(E, `Back (after spot ${r}): 'up to 6' − 'up to ${r}' = ${PF[5]} − ${PF[r - 1]} = ${back}.`,
                   `뒷부분(자리 ${r} 뒤): '자리 6까지 ${PF[5]}개' − '자리 ${r}까지 ${PF[r - 1]}개' = ${back}개.`) });
    steps.push({ built: 6, cntAt: 0, l, r, hl: "out", focus: "both", payoff: sumPayoff,
      bubble: sumPayoff
        ? t(E, `Outside ✓ = ${front} + ${back} = ${front + back}. Two subtractions per window! 🚀`,
              `창 밖 ✓ = ${front} + ${back} = ${front + back}개. 창마다 빼기 두 번! 🚀`)
        : t(E, `So this window's outside ✓ = ${front} + ${back} = ${front + back}.`,
              `그래서 이 창의 창 밖 ✓ = ${front} + ${back} = ${front + back}개.`) });
  };
  useWin(2, 5, true, false);
  // 두 번째 창 [3~5] 로 점프하지 않는다 (선생님 2026-07-02: "또 갑자기 3-5?").
  // 재사용은 말로만 짚고, '모든 창 순회'는 전체 코드(FinalCodeSim)로 넘긴다.
  steps.push({ built: 6, cntAt: 0, l: 2, r: 5, hl: "out", focus: "both", payoff: true,
    bubble: t(E, "The table was made ONCE — so ANY window's outside is just two lookups here. (Looping over every window comes next, in the code.) 🚀",
                 "표는 딱 한 번 만들었죠 — 그래서 어떤 창이든 창 밖은 여기서 조회 두 번이면 끝. (창을 전부 도는 건 다음 코드에서!) 🚀") });
  return steps;
}

export function CheckupsOutPrefixSim({ E }) {
  const steps = _buildOutPrefixSteps(E);
  const { idx, safe, setIdx, total } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const TW = 44, STEP = 52, GAP = STEP - TW, LAB = 66;
  const L = st.l, R = st.r, hasWin = st.l > 0;
  const isOut = p => hasWin && (p < L || p > R);
  const inWin = p => hasWin && p >= L && p <= R;
  const preHot = m => hasWin && (
    ((st.focus === "before" || st.focus === "both") && m === L - 1) ||
    ((st.focus === "after" || st.focus === "both") && (m === 6 || m === R))
  );

  // 말풍선을 이번 스텝이 가리키는 칸으로 이동 (선생님 2026-07-01: '해당 곳으로 생동감 있게 이동').
  const GRIDW = LAB + 8 + 6 * STEP - GAP;                 // 격자 전체 너비
  const cellCenter = i => LAB + 8 + i * STEP + TW / 2;    // 칸 i 의 가로 중심
  const anchorCol = st.cntAt ? st.cntAt - 1                // 세는 중 → 그 칸
    : !hasWin ? 2.5
    : st.focus === "before" ? L - 2                       // 앞부분 → prefix[L-1] 칸
    : st.focus === "after" ? (R - 1 + 5) / 2              // 뒷부분 → 창 끝~자리6 사이
    : (L + R) / 2 - 1;                                    // 창 중앙
  const anchorX = cellCenter(anchorCol);
  const BW = 268;
  const bubbleLeft = Math.max(2, Math.min(GRIDW - BW - 2, anchorX - BW / 2));
  const tailLeft = Math.max(12, Math.min(BW - 28, anchorX - bubbleLeft - 8));

  const rowWrap = (label, color, node) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{ width: LAB, textAlign: "right", fontSize: 10.5, fontWeight: 700, color, lineHeight: 1.1 }}>{label}</div>
      {node}
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 10 }}>
        📊 {t(E, "✓ outside the window — write once, read by subtracting", "창 밖 검진 — 미리 적어두고 빼서 읽기")}
      </div>
      {/* 말풍선: focus 스텝(창 사용 중, prefix 행을 뺌)엔 Y로 슥 내려와 prefix 행 근처로.
          cntAt(맞나 세는 중)엔 checkup 행 근처로. 그 외엔 위쪽 고정. (선생님 2026-07-13 ExpandSim 패턴) */}
      {(() => {
        const shiftY = st.focus ? 54 : (st.cntAt ? 22 : 0);
        return (
          <div style={{ position: "relative", width: GRIDW, height: 92, margin: "0 auto 6px", zIndex: 5 }}>
            <div style={{ position: "absolute", bottom: 8, left: bubbleLeft, width: BW, background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "10px 13px", fontSize: 12.5, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.5, fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", textAlign: "left", boxShadow: "0 2px 8px rgba(0,0,0,.07)", transform: `translateY(${shiftY}px)`, transition: "transform .42s cubic-bezier(.4,0,.2,1), left .38s cubic-bezier(.4,0,.2,1)" }}>
              💬 {nbMath(st.bubble)}
              <div style={{ position: "absolute", bottom: -9, left: tailLeft, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, transition: "left .38s cubic-bezier(.4,0,.2,1)" }} />
            </div>
          </div>
        );
      })()}

      <div style={{ width: "fit-content", margin: "0 auto" }}>
        {rowWrap(t(E, "🩺 checkup", "🩺 검진"), "#15803d",
          <div style={{ position: "relative", display: "flex", gap: GAP }}>
            {hasWin && <div style={{ position: "absolute", top: -4, left: (L - 1) * STEP - 4, width: (R - L + 1) * STEP - GAP + 8, height: TW + 8, borderRadius: 11, background: "#ecfeff", border: "1.5px dashed #67e8f9", zIndex: 0, transition: "left .4s cubic-bezier(.4,0,.2,1), width .4s cubic-bezier(.4,0,.2,1)" }} />}
            {_PFCK.map((v, k) => {
              const p = k + 1, out = st.hl === "out" && isOut(p), dim = inWin(p);
              const revealed = p <= (st.built ?? 6), cnt = st.cntAt === p;
              return <div key={k} style={{ position: "relative", zIndex: 1, width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, opacity: dim ? 0.5 : 1, background: !revealed ? "#f8fafc" : v ? (dim ? "#f1f5f9" : (cnt ? "#bbf7d0" : "#dcfce7")) : (cnt ? "#fee2e2" : "#f8fafc"), color: !revealed ? "#cbd5e1" : v ? (dim ? "#cbd5e1" : "#15803d") : (cnt ? "#f87171" : "#cbd5e1"), border: `${(out || cnt) ? 2.5 : 1.5}px solid ${cnt ? (v ? "#22c55e" : "#f87171") : out ? "#ea580c" : (revealed && v && !dim ? "#86efac" : "#e2e8f0")}`, boxShadow: out ? "0 0 0 3px rgba(234,88,12,.15)" : cnt ? "0 0 0 3px rgba(34,197,94,.15)" : "none", transition: "all .2s" }}>{!revealed ? "·" : (v ? "✓" : "—")}</div>;
            })}
          </div>
        )}
        {rowWrap(t(E, "📊 ✓ up to here", "📊 여기까지 ✓"), "#0891b2",
          <div style={{ display: "flex", gap: GAP }}>
            {_PF.map((v, k) => {
              const m = k + 1, revealed = m <= (st.built ?? 6), sub = preHot(m), cnt = st.cntAt === m, hot = sub || cnt;
              return <div key={k} style={{ width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700, background: sub ? "#cffafe" : cnt ? "#d1fae5" : (revealed ? "#fff" : "#f8fafc"), color: revealed ? "#0e7490" : "#cbd5e1", border: `${hot ? 2.5 : 1.5}px solid ${sub ? "#0891b2" : cnt ? "#10b981" : "#e2e8f0"}`, opacity: revealed ? 1 : 0.4, transition: "all .2s" }}>{revealed ? v : "·"}</div>;
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
   CheckupsInPrefixSim — 'insideUpTo' 를 코드 그대로 이해시키는 표. 말풍선 stepped.
   (선생님 2026-07-02: "prefix·s비교는 알겠는데 insideUpTo 가 뭐고 어떻게 쓰는지 모르겠다."
    → 만화 창 걷어내고 실제 코드 변수(cow[s−k]·want[k]·insideUpTo[k]) + 코드 줄을 붙인 표로.)
   예: cow=[2,1,3,1], want=[1,2,3,1], s=5.  '맞나?(0/1)' 줄을 prefix → insideUpTo,
   창 [l,r] 안쪽 = insideUpTo[r] − insideUpTo[l−1].
   ════════════════════════════════════════════════════════════════════ */
const _IN_COW = [0, 2, 1, 3, 1];     // 1-indexed (앞 0 더미)
const _IN_WANT = [0, 1, 2, 3, 1];
const _IN_S = 5, _IN_N = 4;
const _IN_ARR = (() => { const a = [0]; for (let k = 1; k <= _IN_N; k++) a[k] = _IN_COW[_IN_S - k]; return a; })();        // 자리 k 에 오는 소 cow[s−k]
const _IN_MATCH = (() => { const m = [0]; for (let k = 1; k <= _IN_N; k++) m[k] = _IN_ARR[k] === _IN_WANT[k] ? 1 : 0; return m; })();
const _IN_PREF = (() => { const p = [0]; for (let k = 1; k <= _IN_N; k++) p[k] = p[k - 1] + _IN_MATCH[k]; return p; })();   // = insideUpTo, [0,1,1,1,1]

function _buildInPrefixSteps(E) {
  const S = _IN_S, N = _IN_N;
  // 흐름(선생님 2026-07-02): ① 창 안 뒤집으면 몇 개 맞나 '직접' 세본다 → ② 창마다 다시 세면
  // 느리니 '여기까지 ✓'를 미리 적어둔다(=insideUpTo, ✓줄의 prefix) → ③ 창은 빼기 한 번.
  const steps = [
    { countTo: 0, showPre: false, kHot: 0, win: [1, N], sub: false, mode: "count", payoff: false,
      bubble: t(E, `Flip window [1~${N}] — spot k now holds cow[s−k] (s=${S}). Let's just COUNT how many match inside.`,
                   `창 [1~${N}]을 뒤집으면 자리 k엔 cow[s−k]가 와요 (s=${S}). 안쪽에 몇 개 맞는지 그냥 세보자.`) },
  ];
  for (let k = 1; k <= N; k++) {
    const j = S - k, arr = _IN_ARR[k], w = _IN_WANT[k], m = _IN_MATCH[k];
    steps.push({ countTo: k, showPre: false, kHot: k, win: [1, N], sub: false, mode: "count", payoff: false,
      bubble: m
        ? t(E, `Spot ${k}: cow[${j}]=${arr} = want[${k}]=${w} → ✓`, `자리 ${k}: cow[${j}]=${arr} = want[${k}]=${w} → ✓ 맞음`)
        : t(E, `Spot ${k}: cow[${j}]=${arr} ≠ want[${k}]=${w} → ✗`, `자리 ${k}: cow[${j}]=${arr} ≠ want[${k}]=${w} → ✗ 아님`) });
  }
  steps.push({ countTo: N, showPre: false, kHot: 0, win: [1, N], sub: false, mode: "count", total: true, payoff: false,
    bubble: t(E, `Inside ✓ = 1. But there are ~N² windows — recounting each one is slow.`,
                 `안쪽 ✓ = 1개. 근데 창이 ~N²개 — 창마다 이렇게 다시 세면 느려요.`) });
  steps.push({ countTo: N, showPre: true, kHot: 0, win: null, sub: false, mode: "pre", payoff: false,
    bubble: t(E, `Trick: write '✓ up to here' ONCE = insideUpTo (the ✓ row, prefix-summed).`,
                 `요령: '여기까지 ✓ 몇 개'를 한 번만 적어둬요 = insideUpTo (✓ 줄을 prefix 한 것).`) });
  // 사용: 같은 s(=5) 인 창 [1,4]·[2,3] — 안쪽은 빼기 한 번.
  const useWin = (l, r, payoff) => {
    const val = _IN_PREF[r] - _IN_PREF[l - 1];
    steps.push({ countTo: N, showPre: true, kHot: 0, win: [l, r], sub: true, mode: "use", payoff,
      bubble: t(E, `Window [${l},${r}]: inside = insideUpTo[${r}] − insideUpTo[${l - 1}] = ${_IN_PREF[r]} − ${_IN_PREF[l - 1]} = ${val}. One subtraction!`,
                   `창 [${l},${r}]: 안쪽 = insideUpTo[${r}] − insideUpTo[${l - 1}] = ${_IN_PREF[r]} − ${_IN_PREF[l - 1]} = ${val}. 빼기 한 번!`) });
  };
  useWin(1, 4, false);
  // 두 번째 창 [2,3] 로 점프하지 않는다 (선생님 2026-07-02: "또 갑자기 3-5?" — 같은 결).
  // inside → 결과: 창 밖과 더해 그 창의 총 검진 → 답[총검진]++ ("모든 창이 이렇게"는 말로).
  steps.push({ countTo: N, showPre: true, kHot: 0, win: null, sub: false, mode: "tally", payoff: true,
    bubble: t(E, `This 'inside' is one window's inside-✓. Add its outside-✓ → that window's TOTAL checkups → tally answer[total] += 1. Every window does this → the final answer.`,
                 `이 'inside'는 그 창의 '창 안 ✓'예요. 여기에 '창 밖 ✓'를 더하면 그 창의 총 검진 수 → 답[총검진]에 1표. 모든 창이 이렇게 한 표씩 → 답 완성!`) });
  return steps;
}

export function CheckupsInPrefixSim({ E }) {
  const steps = _buildInPrefixSteps(E);
  const { idx, safe, setIdx, total } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];
  const TW = 42, STEP = 50, GAP = STEP - TW, LAB = 100;
  const COLS = [0, 1, 2, 3, 4];   // 코드의 1-indexed + 더미 0
  const [L, R] = st.win || [0, 0];
  const hasWin = !!st.win;
  const inWin = k => hasWin && k >= L && k <= R;
  const subCol = k => st.sub && (k === R || k === L - 1);
  const cShown = k => k <= (st.countTo || 0);   // 맞나? 공개 범위 (직접 세기)

  const GRIDW = LAB + 8 + COLS.length * STEP - GAP;
  const cellCenter = i => LAB + 8 + i * STEP + TW / 2;
  const anchorCol = st.kHot ? st.kHot : st.sub ? (R + (L - 1)) / 2 : 2;
  const anchorX = cellCenter(anchorCol);
  const BW = 312;
  const bubbleLeft = Math.max(2, Math.min(GRIDW - BW - 2, anchorX - BW / 2));
  const tailLeft = Math.max(12, Math.min(BW - 28, anchorX - bubbleLeft - 8));

  // 말풍선을 '설명하는 칸' 위로 2D 이동 (선생님 2026-07-02: "아래를 좀 가려도 설명하는 곳으로").
  const ROW_H = TW + 4, TOPPAD = 70, N_ROWS = 5;
  const wrapH = TOPPAD + N_ROWS * ROW_H;              // 표 위 여유 + 5행
  const targetRow = st.mode === "count" ? 1 : 4;      // count→cow[s−k] 행, 그 외→insideUpTo 행
  const targetTop = TOPPAD + targetRow * ROW_H;       // 겨냥 셀 윗변 y
  const bubbleBottom = wrapH - (targetTop - 8);       // 말풍선 아랫변이 그 셀 8px 위 → 꼬리가 셀을 가리킴

  const rowWrap = (label, color, node) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <div style={{ width: LAB, textAlign: "right", fontSize: 10.5, fontWeight: 700, color, lineHeight: 1.15, fontFamily: "'JetBrains Mono',monospace", wordBreak: "keep-all" }}>{label}</div>
      {node}
    </div>
  );
  const numCell = (content, sty) => (
    <div style={{ width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16, transition: "all .2s", ...sty }}>{content}</div>
  );
  const dummy = k => <div key={k}>{numCell("·", { color: "#e2e8f0", background: "#f8fafc", border: "1.5px solid #f1f5f9" })}</div>;

  const codeLine = st.mode === "tally" ? t(E, "answer[inside + outside] += 1", "답[inside + outside] += 1")
    : st.mode === "use" ? "inside = insideUpTo[r] - insideUpTo[l-1]"
    : st.mode === "pre" ? t(E, "insideUpTo[k] = insideUpTo[k-1] + (match?)", "insideUpTo[k] = insideUpTo[k-1] + (맞나?)")
    : t(E, "match? =  cow[s-k] == want[k]", "맞나? =  cow[s-k] == want[k]");

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 3 }}>
        📊 {t(E, "Inside the window — how many match when flipped?", "창 안 — 뒤집으면 몇 개 맞나?")}
      </div>
      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>
        cow = [2,1,3,1]　want = [1,2,3,1]　s = {_IN_S}
      </div>

      <div style={{ position: "relative", width: GRIDW, height: wrapH, margin: "0 auto" }}>
        <div style={{ position: "absolute", top: TOPPAD, left: 0, width: GRIDW, display: "flex", justifyContent: "center" }}>
        <div>
        {/* 자리 k (+ 창 [l,r]) */}
        {rowWrap(t(E, "spot k", "자리 k"), "#334155",
          <div style={{ position: "relative", display: "flex", gap: GAP }}>
            {hasWin && <div style={{ position: "absolute", top: -3, left: L * STEP - 3, width: (R - L + 1) * STEP - GAP + 6, height: TW + 6, borderRadius: 11, background: "#ecfeff", border: "1.5px dashed #67e8f9", zIndex: 0, transition: "left .4s cubic-bezier(.4,0,.2,1), width .4s cubic-bezier(.4,0,.2,1)" }} />}
            {COLS.map(k => (
              <div key={k} style={{ position: "relative", zIndex: 1, width: TW, height: TW, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 15, color: k === 0 ? "#cbd5e1" : inWin(k) ? "#0e7490" : "#64748b" }}>{k}</div>
            ))}
          </div>
        )}
        {/* cow[s−k] — 뒤집으면 자리 k 로 온 소 */}
        {rowWrap("cow[s−k]", "#7f1d1d",
          <div style={{ display: "flex", gap: GAP }}>
            {COLS.map(k => {
              if (k === 0) return dummy(k);
              const hot = st.kHot === k;
              return <div key={k}>{numCell(_IN_ARR[k], { background: hot ? "#fee2e2" : "#fff", color: "#7f1d1d", border: `${hot ? 2.5 : 1.5}px solid ${hot ? "#ef4444" : "#fecaca"}` })}</div>;
            })}
          </div>
        )}
        {/* want[k] */}
        {rowWrap("want[k]", "#1e40af",
          <div style={{ display: "flex", gap: GAP }}>
            {COLS.map(k => {
              if (k === 0) return dummy(k);
              const hot = st.kHot === k;
              return <div key={k}>{numCell(_IN_WANT[k], { background: hot ? "#dbeafe" : "#fff", color: "#1e40af", border: `${hot ? 2.5 : 1.5}px solid ${hot ? "#3b82f6" : "#bfdbfe"}` })}</div>;
            })}
          </div>
        )}
        {/* 맞나? ✓/✗ — 직접 세기 (countTo 만큼 공개) */}
        {rowWrap(t(E, "match? ✓", "맞나? ✓"), "#15803d",
          <div style={{ display: "flex", gap: GAP }}>
            {COLS.map(k => {
              if (k === 0) return dummy(k);
              const shown = cShown(k), m = _IN_MATCH[k], hot = st.kHot === k;
              return <div key={k}>{numCell(shown ? (m ? "✓" : "✗") : "·", { fontSize: 17, background: !shown ? "#f8fafc" : m ? (hot ? "#bbf7d0" : "#dcfce7") : (hot ? "#fee2e2" : "#fff"), color: !shown ? "#cbd5e1" : m ? "#15803d" : "#f87171", border: `${hot ? 2.5 : 1.5}px solid ${hot ? (m ? "#22c55e" : "#f87171") : shown && m ? "#86efac" : "#e2e8f0"}` })}</div>;
            })}
          </div>
        )}
        {/* insideUpTo[k] = ✓줄의 prefix — '빨리' 단계에서 등장 */}
        {rowWrap("insideUpTo[k]", "#0891b2",
          <div style={{ display: "flex", gap: GAP }}>
            {COLS.map(k => {
              const shown = st.showPre, sub = subCol(k), hot = sub;
              return <div key={k}>{numCell(shown ? _IN_PREF[k] : "·", { background: sub ? "#cffafe" : (shown ? "#fff" : "#f8fafc"), color: shown ? "#0e7490" : "#cbd5e1", border: `${hot ? 2.5 : 1.5}px solid ${sub ? "#0891b2" : "#e2e8f0"}` })}</div>;
            })}
          </div>
        )}
        </div>
        </div>
        {/* 말풍선 — 설명하는 칸으로 2D 이동 (아래를 좀 가려도 됨). 선생님 2026-07-02. */}
        <div style={{ position: "absolute", left: bubbleLeft, bottom: bubbleBottom, width: BW, background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "10px 13px", fontSize: 12.5, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.5, fontWeight: 600, wordBreak: "keep-all", textAlign: "left", boxShadow: "0 3px 12px rgba(0,0,0,.14)", zIndex: 6, transition: "left .38s cubic-bezier(.4,0,.2,1), bottom .38s cubic-bezier(.4,0,.2,1)" }}>
          💬 {nbMath(st.bubble)}
          <div style={{ position: "absolute", bottom: -9, left: tailLeft, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}` }} />
        </div>
      </div>

      {/* 표 ↔ 코드 다리 — 이번 스텝의 코드 한 줄 */}
      <div style={{ margin: "10px auto 0", width: "fit-content", maxWidth: "100%", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 700, padding: "6px 12px", borderRadius: 8, whiteSpace: "nowrap", overflowX: "auto", background: "#ecfeff", color: "#0e7490", border: "1.5px solid #67e8f9" }}>
        {codeLine}
      </div>

      <div style={{ height: 18 }} />
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

// 진짜 코드를 그대로 '실행'하며 줄 단위로 step 을 만든다 (디버거식). 줄을 건너뛰지 않음.
function _buildFinalSteps(E) {
  const cow = [0, 2, 1, 3, 1], want = [0, 1, 2, 3, 1], N = 4;
  const out = [];
  let mut = [0, null, null, null, null];
  let pairs = [0, 0, 0, 0, 0];
  let iut = null, sc = {}, pairsHl = -1;
  const add = (lines, en, ko, payoff) => out.push({
    lines: Array.isArray(lines) ? lines : [lines],
    bubble: t(E, en, ko),
    mut: mut.slice(), iut: iut ? iut.slice() : null, pairs: pairs.slice(),
    sc: Object.assign({}, sc), pairsHl, payoff: !!payoff,
  });
  const runS = (s) => {
    const iu = [0, 0, 0, 0, 0, 0];
    for (let k = 1; k <= N; k++) { const j = s - k; iu[k] = iu[k - 1] + ((1 <= j && j <= N && cow[j] === want[k]) ? 1 : 0); }
    const lmin = Math.max(1, s - N), lmax = Math.floor(s / 2);
    for (let l = lmin; l <= lmax; l++) { const r = s - l; pairs[(iu[r] - iu[l - 1]) + (mut[l - 1] + (mut[N] - mut[r]))]++; }
  };

  add(0, "Make matchUpTo (all 0). It counts matches WITHOUT flipping.",
        "matchUpTo 만들기 (전부 0). 안 뒤집은 채 맞는 칸을 셀 표예요.");
  for (let i = 1; i <= N; i++) {
    sc = { i };
    const m = cow[i] === want[i];
    add([1, 2], "i=" + i + ": is cow[" + i + "]=" + cow[i] + " == want[" + i + "]=" + want[i] + "? " + (m ? "YES" : "no"),
                "i=" + i + ": cow[" + i + "]=" + cow[i] + " == want[" + i + "]=" + want[i] + " 인가? " + (m ? "예!" : "아니오"));
    if (m) { mut[i] = mut[i - 1] + 1; add(3, "matchUpTo[" + i + "] = matchUpTo[" + (i - 1) + "]+1 = " + mut[i], "matchUpTo[" + i + "] = matchUpTo[" + (i - 1) + "]+1 = " + mut[i]); }
    else { mut[i] = mut[i - 1]; add(5, "else: matchUpTo[" + i + "] = matchUpTo[" + (i - 1) + "] = " + mut[i], "else: matchUpTo[" + i + "] = matchUpTo[" + (i - 1) + "] = " + mut[i]); }
  }
  sc = {};
  add(6, "Make the result box (all 0): how many windows give each checkup count.",
        "결과 통 만들기 (전부 0): 검진 수별로 구간이 몇 개인지 셀 통.");

  // s 한 값을 코드 줄 그대로 끝까지 밟는다 (s=2, s=3 둘 다 이 헬퍼로 자세히)
  const traceS = (s, introEn, introKo) => {
    sc = { s: s };
    add(7, introEn, introKo);
    iut = [0, null, null, null, null];
    add(8, "Make a fresh insideUpTo (all 0), just for this s. Cells = spot k (1~N), so N+2 cells — not 8 (=2N).", "이 s 전용 insideUpTo 새로 만듦 (전부 0). 칸 = 자리 k(1~N)라 N+여유 칸이에요 — 8칸(=2N) 아님.");
    add(11, "Why cow[s-k]? For this s, flipping a window puts cow[s-k] at spot k. So here we count spots where cow[s-k] matches want[k].",
            "왜 cow[s-k] 랑 비교해요? s가 같은 창은 뒤집으면 k자리에 늘 cow[s-k]가 와요. 그래서 이 s에선 cow[s-k]==want[k] 인 칸을 세는 거예요.");
    for (let k = 1; k <= N; k++) {
      const j = s - k;
      sc = { s: s, k: k, j: j };
      const valid = 1 <= j && j <= N, m = valid && cow[j] === want[k];
      add([9, 10, 11], valid
          ? "k=" + k + ": j=s-k=" + j + ". cow[" + j + "]=" + cow[j] + " == want[" + k + "]=" + want[k] + "? " + (m ? "YES" : "no")
          : "k=" + k + ": j=s-k=" + j + " -> off the board -> no",
          valid
          ? "k=" + k + ": j=s-k=" + j + ". cow[" + j + "]=" + cow[j] + " == want[" + k + "]=" + want[k] + " 인가? " + (m ? "예!" : "아니오")
          : "k=" + k + ": j=s-k=" + j + " -> 줄 밖 -> 아니오");
      if (m) { iut[k] = iut[k - 1] + 1; add(12, "insideUpTo[" + k + "] = insideUpTo[" + (k - 1) + "]+1 = " + iut[k], "insideUpTo[" + k + "] = insideUpTo[" + (k - 1) + "]+1 = " + iut[k]); }
      else { iut[k] = iut[k - 1]; add(14, "else: insideUpTo[" + k + "] = insideUpTo[" + (k - 1) + "] = " + iut[k], "else: insideUpTo[" + k + "] = insideUpTo[" + (k - 1) + "] = " + iut[k]); }
    }
    sc = { s: s };
    const lmin = Math.max(1, s - N), lmax = Math.floor(s / 2);
    add([15, 16, 17], "Why this range? Window [l,r] has l+r=s. (1) l>=1 (board start). (2) r=s-l can't pass N, so l>=s-N. (3) l is the LEFT end, l<=r, so l<=s//2. -> l: max(1," + s + "-" + N + ")=" + lmin + " .. " + s + "//2=" + lmax + ".",
                      "왜 이 범위? 구간 [l,r]은 l+r=s. ① l≥1 (줄 시작) ② r=s-l이 N 넘으면 안 됨 → l≥s-N ③ l은 왼쪽 끝이라 l≤r → l≤s//2. 그래서 l: max(1," + s + "-" + N + ")=" + lmin + " ~ " + s + "//2=" + lmax + ".");
    for (let l = lmin; l <= lmax; l++) {
      const r = s - l;
      sc = { s: s, l: l, r: r };
      add(18, "l=" + l + ": r = s-l = " + r + ".", "l=" + l + ": r = s-l = " + r + ".");
      const inside = iut[r] - iut[l - 1]; sc = { s: s, l: l, r: r, inside: inside };
      add(19, "inside = insideUpTo[" + r + "]-insideUpTo[" + (l - 1) + "] = " + iut[r] + "-" + iut[l - 1] + " = " + inside,
              "inside = insideUpTo[" + r + "]-insideUpTo[" + (l - 1) + "] = " + iut[r] + "-" + iut[l - 1] + " = " + inside);
      const outside = mut[l - 1] + (mut[N] - mut[r]); sc = { s: s, l: l, r: r, inside: inside, outside: outside };
      add(20, "outside = matchUpTo[" + (l - 1) + "]+(matchUpTo[" + N + "]-matchUpTo[" + r + "]) = " + mut[l - 1] + "+(" + mut[N] + "-" + mut[r] + ") = " + outside,
              "outside = matchUpTo[" + (l - 1) + "]+(matchUpTo[" + N + "]-matchUpTo[" + r + "]) = " + mut[l - 1] + "+(" + mut[N] + "-" + mut[r] + ") = " + outside);
      const checks = inside + outside;
      pairs[checks]++; pairsHl = checks;
      add(21, "checkups = " + inside + "+" + outside + " = " + checks + " -> result[" + checks + "] += 1.",
              "검진 = " + inside + "+" + outside + " = " + checks + " -> result[" + checks + "] += 1.");
      pairsHl = -1;
    }
    sc = {};
  };

  traceS(2, "for s = l+r: s starts at 2 (smallest: l=1,r=1). One window [1,1].",
            "for s = l+r: s는 2부터 (가장 작음: l=1,r=1). 구간 [1,1] 하나뿐.");
  traceS(3, "for s: now s=3 (l can be 1). Same steps again.",
            "for s: 이제 s=3 (l이 1까지). 똑같은 단계 다시.");
  for (let ss = 4; ss <= 2 * N; ss++) runS(ss);
  iut = null;
  add(7, "s=4,5,...,8 run the very same way (new insideUpTo, then subtract). The result box fills in.",
        "s=4,5,...,8 도 똑같이 (insideUpTo 새로, 빼기). 결과 통이 채워져요.");
  add(22, "Print result[0..N]. Done - two prefix tables + subtractions = O(N^2), so it passes!",
        "result[0..N] 출력. 끝 - 누적 표 2개 + 빼기 = O(N^2), 그래서 통과! 🚀", true);
  return out;
}

// marks: { [칸번호]: "라벨" } — 그 칸을 칠하고 위에 작은 배지(예: j, k, i-1)를 붙인다. 라벨 "" 이면 배지 없이 칠만.
function _FcRow({ label, arr, marks, hue }) {
  const m = marks || {};
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <div style={{ width: 132, fontSize: 10.5, color: C.dim, textAlign: "right", wordBreak: "keep-all", lineHeight: 1.25 }}>{label}</div>
      <div style={{ display: "flex", gap: 5 }}>
        {arr.map((v, k) => {
          const empty = v === null || v === undefined;
          const on = Object.prototype.hasOwnProperty.call(m, k);
          const tag = on ? m[k] : "";
          return (
            <div key={k} style={{ position: "relative", minWidth: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 12.5, border: `1px solid ${on ? hue : "#e2e8f0"}`, background: on ? hue + "22" : "#fff", color: empty ? "#cbd5e1" : (on ? hue : "#334155"), fontWeight: on ? 800 : 500 }}>
              {empty ? "·" : v}
              {tag ? <span style={{ position: "absolute", top: -9, right: -6, fontSize: 9, fontWeight: 800, lineHeight: "13px", padding: "0 3px", borderRadius: 4, background: hue, color: "#fff", whiteSpace: "nowrap", fontFamily: "monospace", boxShadow: "0 1px 2px rgba(0,0,0,.15)" }}>{tag}</span> : null}
            </div>
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
  // 각 변수표에서 "지금 이 줄이 실제로 읽거나 쓰는 칸"만 칠하고, 그 칸에 어떤 변수(k, j, i-1 …)인지 배지를 붙인다.
  const NF = _FC_COW.length - 1; // = N
  const { i: sci, j: scj, k: sck, l: scl, r: scr } = st.sc;
  const hasLine = (n) => st.lines.includes(n);
  // cow: 지금 읽는 자리 (j, 없으면 i) / want: 지금 읽는 자리 (k, 없으면 i)
  let cowMarks = {}, wantMarks = {};
  if (sci !== undefined) { cowMarks = { [sci]: "i" }; wantMarks = { [sci]: "i" }; }
  if (scj !== undefined) cowMarks = (scj >= 0 && scj <= NF) ? { [scj]: "j" } : {};
  if (sck !== undefined) wantMarks = { [sck]: "k" };
  // matchUpTo: 만드는 줄(3/5)에선 i·i-1, outside 줄(20)에선 l-1·r·N. 그 외엔 칠 안 함.
  let mutMarks = {};
  if (hasLine(3) || hasLine(5)) mutMarks = { [sci - 1]: "i-1", [sci]: "i" };
  else if (hasLine(20)) mutMarks = { [scl - 1]: "l-1", [scr]: "r", [NF]: "N" };
  // insideUpTo: 만드는 줄(12/14)에선 k·k-1, inside 줄(19)에선 r·l-1. 그 외엔 칠 안 함.
  let iutMarks = {};
  if (hasLine(12) || hasLine(14)) iutMarks = { [sck - 1]: "k-1", [sck]: "k" };
  else if (hasLine(19)) iutMarks = { [scl - 1]: "l-1", [scr]: "r" };
  const scOrder = [["i", "i"], ["s", "s"], ["k", "k"], ["j", "j"], ["l", "l"], ["r", "r"], ["inside", "inside"], ["outside", "outside"]];
  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#0e7490", marginBottom: 8 }}>
        🧩 {t(E, "The real code, line by line", "진짜 코드 — 한 줄씩")}
      </div>

      <div style={{ maxWidth: 540, margin: "0 auto 10px" }}>
        <div style={{ background: st.payoff ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${st.payoff ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 12.5, color: st.payoff ? "#065f46" : "#92400e", lineHeight: 1.65, minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {nbMath(st.bubble)}</div>
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
          <_FcRow label={t(E, "🐮 cow ([0] empty)", "🐮 cow ([0]은 빈칸)")} arr={_FC_COW} marks={cowMarks} hue="#0891b2" />
          <_FcRow label={"📋 want"} arr={_FC_WANT} marks={wantMarks} hue="#16a34a" />
          {st.mut ? <_FcRow label={t(E, "matchUpTo", "matchUpTo (창 밖)")} arr={st.mut} marks={mutMarks} hue="#d97706" /> : null}
          {st.iut ? <_FcRow label={t(E, "insideUpTo (this s)", "insideUpTo (이 s)")} arr={st.iut} marks={iutMarks} hue="#0891b2" /> : null}
          <div style={{ height: 4 }} />
          <_FcRow label={t(E, "result[checks]", "결과[검진수]")} arr={st.pairs} marks={(st.pairsHl ?? -1) >= 0 ? { [st.pairsHl]: t(E, "here", "검진수") } : {}} hue="#16a34a" />
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
