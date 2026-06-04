// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 13/13 PASS
//   C++:    13/13 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState, useRef } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { isMoo, findAllMoos } from "./helpers";

const A = "#7c5cfc";

/* ═══════════════════════════════════════════════════════════════
   MooSim — Interactive moo pattern finder
   ═══════════════════════════════════════════════════════════════ */
export function MooSim({ E }) {
  const PRESETS = ["zzmoozzmoo", "moooo", "ooo", "aabbcc"];
  const [str, setStr] = useState("zzmoozzmoo");
  const [editPos, setEditPos] = useState(null);

  const arr = str.split("");
  const moos = findAllMoos(arr);
  const mooList = Object.entries(moos).sort((a, b) => b[1] - a[1]);

  const highlights = new Set();
  for (let i = 0; i <= arr.length - 3; i++) {
    if (isMoo(arr[i], arr[i + 1], arr[i + 2])) {
      highlights.add(i); highlights.add(i + 1); highlights.add(i + 2);
    }
  }

  // ≤3 windows that contain the selected cell — this is the overlap students must see
  const affected = new Set();
  const affectedStarts = [];
  if (editPos !== null) {
    const lo = Math.max(editPos - 2, 0);
    const hi = Math.min(editPos, arr.length - 3);
    for (let s = lo; s <= hi; s++) {
      affectedStarts.push(s);
      affected.add(s); affected.add(s + 1); affected.add(s + 2);
    }
  }

  // run of 3+ identical letters → windows pile up & overlap (the "ooo" trap)
  let hasRun = false;
  for (let i = 0; i + 2 < arr.length; i++) {
    if (arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) { hasRun = true; break; }
  }

  const applyEdit = (c) => {
    if (c.length === 1 && /[a-z]/.test(c)) {
      const newArr = [...arr]; newArr[editPos] = c; setStr(newArr.join(""));
    }
    setEditPos(null);
  };

  return (
    <div style={{ padding: "12px 8px" }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setStr(p); setEditPos(null); }}
            style={{
              padding: "4px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              border: `1.5px solid ${str === p ? C.accent : C.border}`,
              background: str === p ? C.accentBg : C.card,
              color: str === p ? C.accent : C.dim, cursor: "pointer",
              fontFamily: "'JetBrains Mono',monospace",
            }}>{p.length > 10 ? p.slice(0, 8) + "…" : p}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 12, justifyContent: "center" }}>
        <input value={str}
          onChange={e => { setStr(e.target.value.replace(/[^a-z]/g, "")); setEditPos(null); }}
          placeholder={E ? "type lowercase letters" : "소문자 입력"}
          style={{
            flex: 1, maxWidth: 240, padding: "6px 10px", borderRadius: 8,
            border: `2px solid ${C.border}`, fontSize: 13,
            fontFamily: "'JetBrains Mono',monospace",
          }} />
      </div>

      {hasRun && (
        <div style={{
          background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 10,
          padding: "8px 12px", marginBottom: 10, fontSize: 11.5, color: "#9a3412",
          lineHeight: 1.7, textAlign: "center", fontWeight: 600,
        }}>
          🔍 {t(E,
            "Same letter repeated! The 3-letter windows pile up and overlap here. Click a square inside the run — watch how ONE change lights up several windows at once.",
            "같은 글자가 연달아 있어요! 여기선 3글자 윈도우가 빽빽이 겹쳐요. 연속 구간 안의 칸을 하나 눌러봐 — 한 번의 변경이 여러 윈도우를 한꺼번에 밝히는 게 보여요.")}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center", marginBottom: editPos !== null ? 6 : 12, padding: "0 4px" }}>
        {arr.map((ch, i) => {
          const isEdit = editPos === i;
          const isAff = editPos !== null && affected.has(i);
          const isMooCell = highlights.has(i);
          // precedence: selected (yellow) > affected window (orange) > existing moo (purple) > plain
          const bg = isEdit ? "#fde68a" : isAff ? "#ffedd5" : isMooCell ? C.accentBg : "#f8f9fc";
          const bd = isEdit ? "#f59e0b" : isAff ? "#fb923c" : isMooCell ? C.accentBd : C.border;
          const fg = isEdit ? "#92400e" : isAff ? "#9a3412" : isMooCell ? C.accent : C.text;
          return (
            <div key={i} style={{ position: "relative" }}>
              <button onClick={() => setEditPos(i)} style={{
                width: 26, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 5, cursor: "pointer", fontSize: 14, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace",
                background: bg, border: `2px solid ${bd}`, color: fg,
              }}>{ch}</button>
              <div style={{ fontSize: 8, textAlign: "center", color: C.dimLight, marginTop: 1 }}>{i}</div>
            </div>
          );
        })}
      </div>

      {editPos !== null && (
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 10, fontSize: 10.5, color: C.dim, flexWrap: "wrap" }}>
          <span><span style={{ display: "inline-block", width: 9, height: 9, borderRadius: 2, background: "#ffedd5", border: "1.5px solid #fb923c", verticalAlign: "middle", marginRight: 3 }} />{t(E, "windows this change touches", "이 변경이 건드리는 윈도우")}</span>
          <span><span style={{ display: "inline-block", width: 9, height: 9, borderRadius: 2, background: C.accentBg, border: `1.5px solid ${C.accentBd}`, verticalAlign: "middle", marginRight: 3 }} />{t(E, "far moos — untouched", "멀리 있어 안 변하는 moo")}</span>
        </div>
      )}

      {editPos !== null && (
        <div style={{
          background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10,
          padding: "10px 14px", marginBottom: 12, textAlign: "center",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
            {t(E, `Change position ${editPos} (${arr[editPos]}):`, `위치 ${editPos} (${arr[editPos]}) 바꾸기:`)}
          </div>
          <div style={{ fontSize: 10.5, color: "#b45309", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, `→ sits in ${affectedStarts.length} overlapping window${affectedStarts.length > 1 ? "s" : ""}: `, `→ 겹치는 윈도우 ${affectedStarts.length}개에 걸침: `)}
            {affectedStarts.map(s => `[${s},${s + 1},${s + 2}]`).join(" ")}
          </div>
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
            {"abcdefghijklmnopqrstuvwxyz".split("").map(c => (
              <button key={c} onClick={() => applyEdit(c)} style={{
                width: 24, height: 26, borderRadius: 4, fontSize: 12, fontWeight: 800,
                border: `1.5px solid ${c === arr[editPos] ? C.accent : C.border}`,
                background: c === arr[editPos] ? C.accentBg : "#fff",
                color: c === arr[editPos] ? C.accent : C.text,
                cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
              }}>{c}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: C.card, borderRadius: 10, border: `1.5px solid ${C.border}`, padding: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>
          {t(E, `Moos found: ${mooList.length}`, `발견된 Moo: ${mooList.length}개`)}
        </div>
        {mooList.length === 0 ? (
          <div style={{ fontSize: 12, color: C.dim }}>
            {t(E, "No moo patterns in this string.", "이 문자열에 moo 패턴이 없어.")}
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {mooList.map(([key, count]) => (
              <div key={key} style={{
                padding: "4px 10px", borderRadius: 8,
                background: count >= 2 ? C.okBg : C.accentBg,
                border: `1.5px solid ${count >= 2 ? C.okBd : C.accentBd}`,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 13, fontWeight: 700,
                color: count >= 2 ? C.ok : C.accent,
              }}>{key} ×{count}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MooBruteRunner — async + live + stop preserves + USACO 추정
   ═══════════════════════════════════════════════════════════════ */
export function MooBruteRunner({ E }) {
  const [N, setN] = useState(50);
  const [F, setF] = useState(2);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [livePos, setLivePos] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const alive = useRef(false);
  const startRef = useRef(0);

  const fmtTime = (sec) => {
    if (sec < 1) return `${(sec * 1000).toFixed(0)}ms`;
    if (sec < 60) return `${sec.toFixed(1)}s`;
    if (sec < 3600) return `${(sec / 60).toFixed(1)}${E ? "min" : "분"}`;
    return `${(sec / 3600).toFixed(1)}${E ? "h" : "시간"}`;
  };
  const estUSACO = (n) => (26 * n * n) / 1e8;

  const run = () => {
    if (N < 3 || N > 5000) return;
    setRunning(true); setResult(null); setProgress(0);
    setLivePos(0); setLiveCount(0);
    alive.current = true;
    startRef.current = performance.now();

    const chars = "abcdefghij";
    let s = "";
    for (let i = 0; i < N; i++) s += chars[Math.floor(Math.random() * chars.length)];
    const arr = s.split("");

    const result = new Set();
    const orig = findAllMoos(arr);
    for (const [k, v] of Object.entries(orig)) if (v >= F) result.add(k);

    let pos = 0;
    const finish = (partial) => {
      const elapsed = performance.now() - startRef.current;
      const sorted = [...result].sort();
      setRunning(false);
      setResult({
        N, F, count: sorted.length, sample: sorted.slice(0, 5),
        elapsedMs: elapsed, partial, completedPos: pos,
      });
      alive.current = false;
    };

    const tick = () => {
      if (!alive.current) { finish(true); return; }
      const oc = arr[pos];
      for (let ci = 0; ci < 26; ci++) {
        const c = String.fromCharCode(97 + ci);
        if (c === oc) continue;
        arr[pos] = c;
        const moos = findAllMoos(arr);
        for (const [k, v] of Object.entries(moos)) if (v >= F) result.add(k);
        arr[pos] = oc;
      }
      pos++;
      setProgress(Math.floor(pos / N * 100));
      setLivePos(pos);
      setLiveCount(result.size);
      if (pos >= N) { finish(false); return; }
      setTimeout(tick, 16);
    };
    setTimeout(tick, 50);
  };
  const stop = () => { alive.current = false; };

  return (
    <div style={{ padding: "12px 8px" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.dim }}>N =</span>
        <input type="number" min={3} max={5000} value={N}
          onChange={e => { setN(+e.target.value); setResult(null); }}
          disabled={running}
          style={{ width: 70, padding: "6px 8px", borderRadius: 8, border: `2px solid ${C.border}`,
            fontSize: 16, fontWeight: 800, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: C.dim }}>F =</span>
        <input type="number" min={1} max={100} value={F}
          onChange={e => { setF(+e.target.value); setResult(null); }}
          disabled={running}
          style={{ width: 50, padding: "6px 8px", borderRadius: 8, border: `2px solid ${C.border}`,
            fontSize: 16, fontWeight: 800, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }} />
      </div>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <button
          onClick={running ? stop : run}
          disabled={!running && (N < 3 || N > 5000)}
          style={{
            padding: "8px 24px", borderRadius: 10, border: "none",
            background: running ? "#dc2626" : "linear-gradient(135deg,#818cf8,#6366f1)",
            color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer",
          }}>
          {running ? (E ? "⏹ Stop" : "⏹ 중지") : (E ? "▶ Run Brute" : "▶ 브루트 실행")}
        </button>
      </div>
      {N > 500 && <div style={{ textAlign: "center", fontSize: 12, color: C.carry, fontWeight: 700, marginBottom: 8 }}>
        {E ? "⚠️ N>500 will be slow — that's the point! Try Stop midway." : "⚠️ N>500 이면 느려져 — 그게 포인트! 중간에 Stop 눌러봐."}
      </div>}

      {running && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", background: A, borderRadius: 4, width: `${progress}%`, transition: "width .1s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.dim, fontWeight: 700 }}>
            <span>{t(E, "position", "위치")} <span style={{ color: A, fontWeight: 900 }}>{livePos}/{N}</span></span>
            <span>{t(E, "moos found", "발견 moo")}: <span style={{ color: A, fontWeight: 900 }}>{liveCount}</span></span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {result && (
        <div>
          <div style={{ textAlign: "center", padding: "12px 0", marginBottom: 10 }}>
            {result.partial ? (
              <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 800, letterSpacing: 0.5 }}>
                ⏸ {t(E, `STOPPED at position ${result.completedPos} of ${result.N}`,
                       `${result.completedPos} / ${result.N} 위치에서 중지`)}
              </div>
            ) : (
              <div style={{ fontSize: 11, color: "#10b981", fontWeight: 800 }}>
                ✓ {t(E, `${result.N} positions × 26 letters checked`, `${result.N} 위치 × 26 글자 전부 확인`)}
              </div>
            )}
            <div style={{ fontSize: 32, fontWeight: 900, color: A, fontFamily: "'JetBrains Mono',monospace", marginTop: 4 }}>
              {result.count}
            </div>
            <div style={{ fontSize: 11, color: C.dim }}>{t(E, "distinct moos found (≥ F)", "≥ F 인 distinct moo 개수")}</div>
            {result.sample.length > 0 && (
              <div style={{ fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace", marginTop: 4 }}>
                {result.sample.join(", ")}{result.count > 5 ? "…" : ""}
              </div>
            )}
          </div>

          <div style={{
            background: "#fff", border: `2px solid ${result.elapsedMs > 500 ? "#dc2626" : "#10b981"}`, borderRadius: 10,
            padding: "10px 14px", marginBottom: 10,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.dim, letterSpacing: 0.5 }}>
                ⏱️ {t(E, "BROWSER TIME", "브라우저 측정 시간")}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: result.elapsedMs > 500 ? "#dc2626" : "#10b981", fontFamily: "'JetBrains Mono',monospace" }}>
                {fmtTime(result.elapsedMs / 1000)}
              </div>
            </div>
            <div style={{ fontSize: 10, color: C.dim, textAlign: "right", lineHeight: 1.5, maxWidth: 180 }}>
              {t(E, "Pure brute is faster but still O(26N²).", "순수 brute 는 더 빠르지만 여전히 O(26N²).")}
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #fef2f2, #fff)", border: `2px solid #dc2626`, borderRadius: 10,
            padding: "10px 14px",
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#dc2626", letterSpacing: 0.5, marginBottom: 6 }}>
              🏆 {t(E, "ON USACO JUDGE — REAL ESTIMATE", "USACO 채점기 — 실제 추정")}
            </div>
            <table style={{ width: "100%", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  { N: result.N, label: t(E, "your N", "지금 N") },
                  { N: 5000, label: "5,000" },
                  { N: 20000, label: "20,000 (max!)" },
                ].map((row, i) => {
                  const sec = estUSACO(row.N);
                  const tle = sec > 2;
                  return (
                    <tr key={i} style={{ borderTop: i > 0 ? "1px solid #fee2e2" : "none" }}>
                      <td style={{ padding: "4px 0", fontWeight: 700, color: C.dim }}>N = {row.N.toLocaleString()}</td>
                      <td style={{ padding: "4px 6px", fontSize: 10, color: C.dim }}>{row.label}</td>
                      <td style={{ padding: "4px 0", textAlign: "right", fontWeight: 800, color: tle ? "#dc2626" : "#10b981" }}>
                        {fmtTime(sec)}
                      </td>
                      <td style={{ padding: "4px 0 4px 6px", textAlign: "right", fontWeight: 800, color: tle ? "#dc2626" : "#10b981", minWidth: 32 }}>
                        {tle ? "TLE" : "✓"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ marginTop: 6, fontSize: 10, color: C.dim, lineHeight: 1.5 }}>
              {t(E, "Estimate: 26 × N² ops / 10⁸ ops/sec (C++).", "추정: 26 × N² 연산 / 1억 ops/sec (C++).")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MooRTRSim — Remove → Try → Restore step-through
   Pick a position in a fixed string, watch the 3 affected windows,
   step through REMOVE (–1 affected moo counts), TRY 26 letters
   (+1 / check ≥ F / –1), then RESTORE. The dict + result set are
   shown as live state so students can audit each ±1.
   ═══════════════════════════════════════════════════════════════ */
export function MooRTRSim({ E }) {
  // Fixed teaching string — has 2 'baa' moos so we can actually
  // hit the threshold during a TRY and show result.add() firing.
  const BASE = "baacbaa".split("");
  const N = BASE.length;
  const F = 2;
  const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

  const [pos, setPos] = useState(3);     // the 'c' — clearly in the middle
  const [phase, setPhase] = useState("idle"); // idle | removed | trying | restored
  const [trialIdx, setTrialIdx] = useState(0);  // which letter of 26
  const [resultSet, setResultSet] = useState(() => new Set());

  // Affected window starts (≤ 3)
  const minIdx = Math.max(pos - 2, 0);
  const maxIdx = Math.min(N - 3, pos);
  const winStarts = [];
  for (let i = minIdx; i <= maxIdx; i++) winStarts.push(i);

  // Pre-count of original moos
  const origCounts = findAllMoos(BASE);

  // Build dict reflecting current phase
  const buildDict = () => {
    const d = { ...origCounts };
    if (phase === "idle" || phase === "restored") return d;
    // After REMOVE: subtract moo counts for each affected window in BASE
    for (const idx of winStarts) {
      if (isMoo(BASE[idx], BASE[idx + 1], BASE[idx + 2])) {
        const k = BASE[idx] + BASE[idx + 1] + BASE[idx + 2];
        d[k] = (d[k] || 0) - 1;
        if (d[k] === 0) delete d[k];
      }
    }
    return d;
  };

  const dict = buildDict();

  // For TRY phase: simulate +1 / check / -1 for current trial letter,
  // across the affected windows (to mirror the real algorithm).
  let trialReports = []; // { idx, key, newCount, hits }
  if (phase === "trying") {
    const c = ALPHABET[trialIdx];
    for (const idx of winStarts) {
      const w = [BASE[idx], BASE[idx + 1], BASE[idx + 2]];
      w[pos - idx] = c;
      if (isMoo(w[0], w[1], w[2])) {
        const k = w[0] + w[1] + w[2];
        const newCount = (dict[k] || 0) + 1;
        trialReports.push({ idx, key: k, newCount, hits: newCount >= F });
      } else {
        trialReports.push({ idx, key: null });
      }
    }
  }

  const reset = () => {
    setPhase("idle");
    setTrialIdx(0);
    setResultSet(new Set());
  };

  const stepNext = () => {
    if (phase === "idle") { setPhase("removed"); return; }
    if (phase === "removed") { setPhase("trying"); setTrialIdx(0); return; }
    if (phase === "trying") {
      // commit any hits to result set
      const hits = trialReports.filter(r => r.hits).map(r => r.key);
      if (hits.length) {
        setResultSet(prev => {
          const n = new Set(prev);
          for (const k of hits) n.add(k);
          return n;
        });
      }
      if (trialIdx < 25) { setTrialIdx(trialIdx + 1); return; }
      setPhase("restored");
      return;
    }
    // restored → loop back to idle
    setPhase("idle");
    setTrialIdx(0);
  };

  const phaseLabel = {
    idle:     t(E, "① click Step → REMOVE", "① Step 누르기 → REMOVE"),
    removed:  t(E, "🔴 REMOVED — 3 windows subtracted", "🔴 REMOVED — 윈도우 3개 빼기 완료"),
    trying:   t(E, "🟡 TRYING letter…", "🟡 TRYING 글자 시도 중…"),
    restored: t(E, "🟢 RESTORED — back to original counts", "🟢 RESTORED — 원래 카운트로 복원"),
  }[phase];

  const phaseColor = { idle: C.dim, removed: C.no, trying: "#92400e", restored: C.ok }[phase];

  return (
    <div style={{ padding: "12px 8px" }}>
      <div style={{ textAlign: "center", marginBottom: 8, fontSize: 12, color: C.dim, fontWeight: 700 }}>
        {t(E, "Watch ONE position go through Remove → Try → Restore", "한 위치가 빼기 → 시도 → 복원 거치는 모습 관찰")}
      </div>

      {/* String row */}
      <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 4 }}>
        {BASE.map((ch, i) => {
          const inWin = winStarts.some(s => i >= s && i < s + 3);
          const isPos = i === pos;
          return (
            <button
              key={i}
              onClick={() => { if (phase === "idle") setPos(i); }}
              disabled={phase !== "idle"}
              title={t(E, `position ${i}`, `위치 ${i}`)}
              style={{
                width: 30, height: 34, borderRadius: 6,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 15, fontWeight: 800,
                background: isPos ? "#fde68a" : inWin ? C.accentBg : "#f8f9fc",
                border: `2px solid ${isPos ? "#f59e0b" : inWin ? C.accentBd : C.border}`,
                color: isPos ? "#92400e" : inWin ? C.accent : C.text,
                cursor: phase === "idle" ? "pointer" : "default",
              }}>{ch}</button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 10, fontSize: 9, color: C.dimLight }}>
        {BASE.map((_, i) => <span key={i} style={{ width: 30, textAlign: "center" }}>{i}</span>)}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8 }}>
        {t(E, `pos = ${pos}, F = ${F}, affected windows starting at:`,
            `pos = ${pos}, F = ${F}, 영향받는 윈도우 시작:`)} {winStarts.join(", ")}
      </div>

      {/* Phase banner */}
      <div style={{
        padding: "8px 12px", borderRadius: 10, marginBottom: 10,
        background: "#fff", border: `2px solid ${phaseColor}`,
        textAlign: "center", fontSize: 13, fontWeight: 800, color: phaseColor,
      }}>{phaseLabel}{phase === "trying" ? ` "${ALPHABET[trialIdx]}" (${trialIdx + 1}/26)` : ""}</div>

      {/* Trial detail */}
      {phase === "trying" && (
        <div style={{
          background: "#fffbeb", border: "1.5px solid #fde68a",
          borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontSize: 12, lineHeight: 1.7,
        }}>
          {trialReports.map((r, i) => (
            <div key={i} style={{ fontFamily: "'JetBrains Mono',monospace", color: C.text }}>
              {r.key ? (
                <>
                  win@{r.idx}: <b>{r.key}</b> → +1 → count = <b>{r.newCount}</b>
                  {r.hits ? <span style={{ color: C.ok, fontWeight: 800 }}> ≥ F → result.add('{r.key}') ✓</span>
                          : <span style={{ color: C.dim }}> &lt; F</span>}
                  <span style={{ color: C.dim }}> → -1</span>
                </>
              ) : (
                <span style={{ color: C.dim }}>win@{r.idx}: {t(E, "not a moo — skip", "moo 아님 — 건너뜀")}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Live dict */}
      <div style={{
        background: C.card, border: `1.5px solid ${C.border}`,
        borderRadius: 10, padding: "8px 12px", marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>
          {t(E, "mydict (live)", "mydict (실시간)")}
        </div>
        {Object.keys(dict).length === 0 ? (
          <div style={{ fontSize: 12, color: C.dim, fontStyle: "italic" }}>{t(E, "(empty)", "(비어있음)")}</div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {Object.entries(dict).sort().map(([k, v]) => (
              <div key={k} style={{
                padding: "3px 8px", borderRadius: 6,
                background: v >= F ? C.okBg : C.accentBg,
                border: `1.5px solid ${v >= F ? C.okBd : C.accentBd}`,
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700,
                color: v >= F ? C.ok : C.accent,
              }}>{k}: {v}</div>
            ))}
          </div>
        )}
      </div>

      {/* Result set */}
      <div style={{
        background: resultSet.size > 0 ? C.okBg : "#f8f9fc",
        border: `1.5px solid ${resultSet.size > 0 ? C.okBd : C.border}`,
        borderRadius: 10, padding: "8px 12px", marginBottom: 12,
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>
          {t(E, "result set (qualifying moos found so far)", "result 집합 (지금까지 찾은 ≥ F moo)")}
        </div>
        {resultSet.size === 0 ? (
          <div style={{ fontSize: 12, color: C.dim, fontStyle: "italic" }}>{t(E, "(none yet)", "(아직 없음)")}</div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[...resultSet].sort().map(k => (
              <div key={k} style={{
                padding: "3px 8px", borderRadius: 6, background: "#fff",
                border: `1.5px solid ${C.okBd}`,
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800, color: C.ok,
              }}>{k}</div>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={stepNext} style={{
          padding: "8px 18px", borderRadius: 10, border: "none",
          background: A, color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer",
        }}>
          {phase === "trying" && trialIdx < 25
            ? t(E, `▶ Next letter (${ALPHABET[trialIdx + 1]})`, `▶ 다음 글자 (${ALPHABET[trialIdx + 1]})`)
            : t(E, "▶ Step", "▶ 단계")}
        </button>
        {phase === "trying" && (
          <button onClick={() => {
            // fast-forward through remaining trials
            const hits = new Set(resultSet);
            for (let ti = trialIdx; ti < 26; ti++) {
              const c = ALPHABET[ti];
              for (const idx of winStarts) {
                const w = [BASE[idx], BASE[idx + 1], BASE[idx + 2]];
                w[pos - idx] = c;
                if (isMoo(w[0], w[1], w[2])) {
                  const k = w[0] + w[1] + w[2];
                  const nc = (dict[k] || 0) + 1;
                  if (nc >= F) hits.add(k);
                }
              }
            }
            setResultSet(hits);
            setPhase("restored");
            setTrialIdx(0);
          }} style={{
            padding: "8px 14px", borderRadius: 10,
            background: "#fff", color: A, border: `1.5px solid ${A}`,
            fontSize: 12, fontWeight: 800, cursor: "pointer",
          }}>
            {t(E, "⏭ Skip remaining 26 letters", "⏭ 남은 26 글자 건너뛰기")}
          </button>
        )}
        <button onClick={reset} style={{
          padding: "8px 14px", borderRadius: 10,
          background: "#fff", color: C.dim, border: `1.5px solid ${C.border}`,
          fontSize: 12, fontWeight: 800, cursor: "pointer",
        }}>{t(E, "↺ Reset", "↺ 리셋")}</button>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.6 }}>
        {t(E, "Notice: outside the affected windows, mydict never moves.\nThat's why this is O(78N), not O(26N²).",
            "관찰: 영향받는 윈도우 밖에서는 mydict 가 움직이지 않아요.\n그래서 O(26N²) 가 아니라 O(78N).")}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   getMooBruteSections — 첫 아이디어 (브루트) 단계별 코드
   ═══════════════════════════════════════════════════════════════ */

const BR_INPUT_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "n, f = map(int, input().split())",
  "s = list(input().strip())",
  "result = set()",
];
const BR_INPUT_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <set>",
  "using namespace std;",
  "",
  "int main() {",
  "    int n, f;",
  "    cin >> n >> f;",
  "    string s;",
  "    cin >> s;",
  "    set<string> result;",
];

const BR_HELPERS_PY = [
  "def is_moo(a, b, c):",
  "    return a != b and b == c",
  "",
  "def count_all(arr):",
  "    moos = {}",
  "    for i in range(len(arr) - 2):",
  "        if is_moo(arr[i], arr[i+1], arr[i+2]):",
  "            key = arr[i] + arr[i+1] + arr[i+2]",
  "            moos[key] = moos.get(key, 0) + 1",
  "    return moos",
];
const BR_HELPERS_CPP = [
  "    auto isMoo = [](char a, char b, char c) {",
  "        return a != b && b == c;",
  "    };",
  "",
  "    auto countAll = [&](const string& str) {",
  "        map<string, int> moos;",
  "        for (int i = 0; i + 2 < (int)str.size(); i++) {",
  "            if (isMoo(str[i], str[i+1], str[i+2])) {",
  "                moos[str.substr(i, 3)]++;",
  "            }",
  "        }",
  "        return moos;",
  "    };",
];

const BR_LOOP_PY = (E) => [
  t(E, "# Register moos already present in the original string", "# 원본 문자열에 이미 있는 moo 등록"),
  "for k, v in count_all(s).items():",
  "    if v >= f:",
  "        result.add(k)",
  "",
  t(E, "# 🐌 Try each position × 26 letters — the TLE cause!", "# 🐌 매 위치 × 26 글자 시도 — TLE 원인!"),
  "for pos in range(n):",
  "    orig = s[pos]",
  "    for c in 'abcdefghijklmnopqrstuvwxyz':",
  "        if c == orig: continue",
  "        s[pos] = c",
  t(E, "        # Re-scan the whole string every time (N cells)", "        # 매번 전체 문자열 재스캔 (N 칸)"),
  "        for k, v in count_all(s).items():",
  "            if v >= f:",
  "                result.add(k)",
  "        s[pos] = orig",
];
const BR_LOOP_CPP = (E) => [
  t(E, "    // Register moos already present in the original string", "    // 원본 문자열에 이미 있는 moo 등록"),
  "    for (auto& [k, v] : countAll(s))",
  "        if (v >= f) result.insert(k);",
  "",
  t(E, "    // 🐌 Try each position × 26 letters — the TLE cause!", "    // 🐌 매 위치 × 26 글자 시도 — TLE 원인!"),
  "    for (int pos = 0; pos < n; pos++) {",
  "        char orig = s[pos];",
  "        for (char c = 'a'; c <= 'z'; c++) {",
  "            if (c == orig) continue;",
  "            s[pos] = c;",
  t(E, "            // Re-scan the whole string every time (N cells)", "            // 매번 전체 문자열 재스캔 (N 칸)"),
  "            for (auto& [k, v] : countAll(s))",
  "                if (v >= f) result.insert(k);",
  "            s[pos] = orig;",
  "        }",
  "    }",
];

const BR_OUTPUT_PY = [
  "result = sorted(result)",
  "print(len(result))",
  "print('\\n'.join(result))",
];
const BR_OUTPUT_CPP = [
  "    cout << result.size() << \"\\n\";",
  "    for (auto& m : result) cout << m << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMooBruteSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: "#94a3b8",
      py: BR_INPUT_PY, cpp: BR_INPUT_CPP,
      why: [
        t(E, "Read n, f, the string, and start an empty set for distinct moos.",
            "n, f, 문자열 받고 distinct moo 모을 빈 set 시작."),
      ],
      pyOnly: [
        t(E, "list() so we can swap letters later (strings are immutable).",
            "list() 로 받아야 나중에 글자 바꿀 수 있음 (문자열은 변경 불가)."),
      ],
      cppOnly: [],
    },
    {
      label: t(E, "🔧 2. Helpers (is_moo + count_all)", "🔧 2. 헬퍼 함수 (is_moo + count_all)"),
      color: "#0891b2",
      py: BR_HELPERS_PY, cpp: BR_HELPERS_CPP,
      why: [
        t(E, "Two helpers: is_moo (1st ≠ 2nd, 2nd = 3rd) and count_all (scan once, return {moo: count}).",
            "헬퍼 둘: is_moo (1번째 ≠ 2번째, 2번째 = 3번째) 와 count_all (한 번 훑어서 {moo: 개수} 반환)."),
        t(E, "count_all costs O(N) per call — that's what next section will call 26N times. The bottleneck.",
            "count_all 은 호출당 O(N) — 다음 섹션이 이걸 26N 번 호출. 그게 병목."),
      ],
      pyOnly: [],
      cppOnly: [],
    },
    {
      label: t(E, "🐌 3. Trial Loop (THE TLE)", "🐌 3. 시도 루프 (TLE 원인!)"),
      color: "#dc2626",
      py: BR_LOOP_PY(E), cpp: BR_LOOP_CPP(E),
      why: [
        t(E, "For every position × every letter: swap, re-scan the whole string, restore.",
            "모든 위치 × 모든 글자: 글자 바꾸고, 문자열 전체 다시 훑고, 원래대로 복원."),
        t(E, "26N trials × O(N) scan = O(26N²). At N=20,000 → ~10¹⁰ ops → TLE.",
            "26N 시도 × O(N) 스캔 = O(26N²). N=20,000 → ~10¹⁰ 연산 → TLE."),
      ],
      pyOnly: [],
      cppOnly: [],
    },
    {
      label: t(E, "📤 4. Sort + Output", "📤 4. 정렬 + 출력"),
      color: "#94a3b8",
      py: BR_OUTPUT_PY, cpp: BR_OUTPUT_CPP,
      why: [
        t(E, "Print K, then the K moos in alphabetical order.",
            "K 출력 → K 개 moo 를 알파벳순으로 출력."),
      ],
      pyOnly: [
        t(E, "sorted() the set once at the end.",
            "마지막에 set 한 번 sorted()."),
      ],
      cppOnly: [],
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   getMooSections — Python + C++ + reasoning
   ═══════════════════════════════════════════════════════════════ */

const MOO_INPUT_PY = [
  "import sys",
  "from collections import defaultdict",
  "input = sys.stdin.readline",
  "",
  "n, f = map(int, input().split())",
  "string = list(input().strip())",
];
const MOO_INPUT_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <set>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    int n, f;",
  "    cin >> n >> f;",
  "    string s;",
  "    cin >> s;",
];

const MOO_PRECOUNT_PY = [
  "def isMoo(a, b, c):",
  "    return a != b and b == c",
  "",
  "mydict = defaultdict(int)",
  "for i in range(n - 2):",
  "    if isMoo(string[i], string[i+1], string[i+2]):",
  "        key = string[i] + string[i+1] + string[i+2]",
  "        mydict[key] += 1",
];
const MOO_PRECOUNT_CPP = [
  "    auto isMoo = [](char a, char b, char c) {",
  "        return a != b && b == c;",
  "    };",
  "",
  "    map<string, int> mydict;",
  "    for (int i = 0; i + 2 < n; i++) {",
  "        if (isMoo(s[i], s[i+1], s[i+2])) {",
  "            string key = s.substr(i, 3);",
  "            mydict[key]++;",
  "        }",
  "    }",
];

const MOO_TRY_PY = (E) => [
  "result = set()",
  "alphabet = 'abcdefghijklmnopqrstuvwxyz'",
  "",
  "for pos in range(n):",
  "    minIdx = max(pos - 2, 0)",
  "    maxIdx = min(n - 3, pos)",
  "",
  t(E, "    # 🔴 REMOVE: subtract counts for the 3 affected windows", "    # 🔴 REMOVE: 영향받는 3 윈도우 카운트 빼기"),
  "    for idx in range(minIdx, maxIdx + 1):",
  "        t = string[idx:idx+3]",
  "        if isMoo(t[0], t[1], t[2]):",
  "            mydict[t[0]+t[1]+t[2]] -= 1",
  "",
  "    # 🟡 TRY 26 letters",
  "    for c in alphabet:",
  "        for idx in range(minIdx, maxIdx + 1):",
  "            t = list(string[idx:idx+3])",
  "            t[pos - idx] = c",
  "            if isMoo(t[0], t[1], t[2]):",
  "                key = t[0]+t[1]+t[2]",
  "                mydict[key] += 1",
  "                if mydict[key] >= f:",
  "                    result.add(key)",
  "                mydict[key] -= 1",
  "",
  t(E, "    # 🟢 RESTORE: put the original windows back", "    # 🟢 RESTORE: 원래 윈도우 복원"),
  "    for idx in range(minIdx, maxIdx + 1):",
  "        t = string[idx:idx+3]",
  "        if isMoo(t[0], t[1], t[2]):",
  "            mydict[t[0]+t[1]+t[2]] += 1",
];
const MOO_TRY_CPP = [
  "    set<string> result;",
  "",
  "    for (int pos = 0; pos < n; pos++) {",
  "        int minIdx = max(pos - 2, 0);",
  "        int maxIdx = min(n - 3, pos);",
  "",
  "        // 🔴 REMOVE",
  "        for (int idx = minIdx; idx <= maxIdx; idx++)",
  "            if (isMoo(s[idx], s[idx+1], s[idx+2]))",
  "                mydict[s.substr(idx, 3)]--;",
  "",
  "        // 🟡 TRY 26 letters",
  "        char orig = s[pos];",
  "        for (char c = 'a'; c <= 'z'; c++) {",
  "            s[pos] = c;",
  "            for (int idx = minIdx; idx <= maxIdx; idx++) {",
  "                if (isMoo(s[idx], s[idx+1], s[idx+2])) {",
  "                    string key = s.substr(idx, 3);",
  "                    mydict[key]++;",
  "                    if (mydict[key] >= f) result.insert(key);",
  "                    mydict[key]--;",
  "                }",
  "            }",
  "        }",
  "        s[pos] = orig;",
  "",
  "        // 🟢 RESTORE",
  "        for (int idx = minIdx; idx <= maxIdx; idx++)",
  "            if (isMoo(s[idx], s[idx+1], s[idx+2]))",
  "                mydict[s.substr(idx, 3)]++;",
  "    }",
];

const MOO_OUTPUT_PY = [
  "result = sorted(result)",
  "print(len(result))",
  "print('\\n'.join(result))",
];
const MOO_OUTPUT_CPP = [
  "    cout << result.size() << \"\\n\";",
  "    for (auto& m : result) cout << m << \"\\n\";",
  "    return 0;",
  "}",
];

const MOO_FULL_PY = (E) => [
  ...MOO_INPUT_PY, "",
  ...MOO_PRECOUNT_PY, "",
  ...MOO_TRY_PY(E), "",
  ...MOO_OUTPUT_PY,
];
const MOO_FULL_CPP = [
  ...MOO_INPUT_CPP, "",
  ...MOO_PRECOUNT_CPP, "",
  ...MOO_TRY_CPP, "",
  ...MOO_OUTPUT_CPP,
];

export function getMooSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: A,
      py: MOO_INPUT_PY, cpp: MOO_INPUT_CPP,
      why: [
        t(E, "Read n, f, then the string.", "n, f 받고 문자열도 받기."),
      ],
      pyOnly: [
        t(E, "list() so we can swap letters later (strings are immutable).",
            "list() 로 받아야 나중에 글자 바꿀 수 있음 (문자열은 변경 불가)."),
      ],
      cppOnly: [],
    },
    {
      label: t(E, "📊 2. Pre-count moos", "📊 2. moo 미리 세기"),
      color: "#0891b2",
      py: MOO_PRECOUNT_PY, cpp: MOO_PRECOUNT_CPP,
      why: [
        t(E, "Scan the string once and count every moo into a dictionary — so the trial loop later only updates what changed.",
            "문자열 한 번 훑어서 모든 moo 를 dictionary 에 세 놓기 — 나중에 시도 루프는 *바뀌는 부분만* 고침."),
      ],
      pyOnly: [
        t(E, "defaultdict(int) auto-starts new keys at 0 — no `if key in dict` check.",
            "defaultdict(int) 는 새 키를 자동 0 으로 시작 — `if key in dict` 검사 불필요."),
      ],
      cppOnly: [
        t(E, "map<string,int> auto-inits to 0 on first []; bonus: iterates keys in sorted order.",
            "map<string,int> 도 `[]` 첫 접근 시 자동 0; 보너스: 키를 정렬 순서로 순회."),
      ],
    },
    {
      label: t(E, "🔄 3. Remove → Try → Restore", "🔄 3. 빼기 → 시도 → 복원"),
      color: "#16a34a",
      py: MOO_TRY_PY(E), cpp: MOO_TRY_CPP,
      why: [
        t(E, "For each position: subtract its 3 windows, try 26 letters, restore. (We already played this in Ch4's simulator.)",
            "각 위치마다: 그 위치의 3 윈도우를 빼고, 26 글자 시도, 복원. (Ch4 시뮬에서 해 본 그 동작.)"),
        t(E, "+1 → check → -1 between trials is required — without -1, counts leak into the next letter.",
            "시도마다 +1 → 확인 → -1 필수 — -1 빼먹으면 카운트가 다음 글자로 샘."),
      ],
      pyOnly: [
        t(E, "Copy the window into a fresh list before swapping, so other windows still see the original.",
            "swap 전에 윈도우를 새 list 로 복사 — 다른 윈도우는 원본 그대로 봄."),
      ],
      cppOnly: [
        t(E, "Swap s[pos] in place then restore — faster than copying the window.",
            "s[pos] in-place 로 바꿨다 복원 — 윈도우 복사보다 빠름."),
      ],
    },
    {
      label: t(E, "🎯 4. Output + Full Code", "🎯 4. 출력 + 전체 코드"),
      color: A,
      py: MOO_FULL_PY(E), cpp: MOO_FULL_CPP,
      why: [
        t(E, "Print the count K, then the K moos in alphabetical order.",
            "개수 K 출력 → K 개 moo 를 알파벳순으로 출력."),
      ],
      pyOnly: [
        t(E, "sorted() the set once at the end — sets have no order.",
            "마지막에 set 한 번 sorted() — set 은 순서 없음."),
      ],
      cppOnly: [],
    },
  ];
}


/* ProgressiveCode — vertical stack stepper.
   reasoning: cur.why (common) + cur.pyOnly / cur.cppOnly (per-language). */
export function MooProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#7c5cfc" />;
}


/* ═══════════════════════════════════════════════════════════════
   downloadMooPDF
   ═══════════════════════════════════════════════════════════════ */

const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","set","sorted","join","list","max","min"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","to_string","size","include","vector","map","set","substr","max","min"];

function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") {
    const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); }
  } else {
    const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); }
  }
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadMooPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "It's Mooin' Time — Full Study Guide", "🐄 It's Mooin' Time — 종합 풀이 노트");
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  th, td { border: 1px solid #e5e7eb; padding: 5px 8px; text-align: left; }
  th { background: #ede9fe; color: #5b21b6; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #ede9fe; border: 1.5px solid #c4b5fd; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  .box.ok { background: #ecfdf5; border-color: #6ee7b7; }
  .box.no { background: #fef2f2; border-color: #fca5a5; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>

<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF' as the destination.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>

<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2024 December Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>

<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "A length-N string of lowercase letters contains 'moo'-like patterns: 3-letter ABB where A≠B (e.g., 'moo', 'baa', 'tee'). Bessie says the recording may have AT MOST 1 typo. Find all moo patterns that appear ≥ F times — either in the original string OR after changing exactly one letter somewhere.",
  "길이 N 의 소문자 문자열에 'moo' 같은 패턴: ABB (A≠B) 형태 3 글자 (예: 'moo', 'baa', 'tee'). Bessie 가 녹음에 최대 1 글자 오타 가능하다고 함. F 번 이상 나오는 모든 moo 패턴 찾기 — 원본 그대로 OR 정확히 1 글자 바꾼 후.")}</p>

<h3>${t(E, "Input / Output", "입출력")}</h3>
<table>
  <tr><th>${t(E, "Input", "입력")}</th><th>${t(E, "Output", "출력")}</th></tr>
  <tr><td>N F (first line)<br>S (lowercase string)</td><td>K (count of distinct qualifying moos)<br>${t(E, "Then K moos sorted alphabetically", "그 다음 정렬된 moo K 개")}</td></tr>
</table>
<p>${t(E, "Constraints: 3 ≤ N ≤ 20,000.", "제약: 3 ≤ N ≤ 20,000.")}</p>

<h3>${t(E, "Sample I/O", "예제 입출력")}</h3>
<table>
  <tr><th>${t(E, "Input", "입력")}</th><th>${t(E, "Output", "출력")}</th></tr>
  <tr><td><pre style="margin:0;background:#0f172a;color:#f8fafc;font-size:11px;">10 2
zzmoozzmoo</pre></td><td><pre style="margin:0;background:#0f172a;color:#f8fafc;font-size:11px;">1
moo</pre></td></tr>
</table>
<p>${t(E, "'moo' appears twice (≥ F=2). Even with 1 letter change, no other pattern reaches 2.", "'moo' 가 2 번 (≥ F=2). 1 글자 바꿔도 새로 2 번 도달 패턴 없음.")}</p>

<h2>2. ${t(E, "Brute Force (TLE)", "브루트 포스 (TLE)")}</h2>
<p>${t(E, "Direct: for each of N positions, try all 26 letters, then re-scan the entire string for moos. O(26N²).", "직접: N 위치마다 26 글자 시도, 매번 전체 재스캔. O(26N²).")}</p>

${codeBlock([
  "import sys",
  "from collections import defaultdict",
  "input = sys.stdin.readline",
  "",
  "n, f = map(int, input().split())",
  "s = list(input().strip())",
  "result = set()",
  "",
  "def is_moo(a, b, c): return a != b and b == c",
  "",
  "def count_all(arr):",
  "    moos = defaultdict(int)",
  "    for i in range(len(arr) - 2):",
  "        if is_moo(arr[i], arr[i+1], arr[i+2]):",
  "            moos[arr[i] + arr[i+1] + arr[i+2]] += 1",
  "    return moos",
  "",
  "for k, v in count_all(s).items():",
  "    if v >= f: result.add(k)",
  "",
  "for pos in range(n):",
  "    orig = s[pos]",
  "    for c in 'abcdefghijklmnopqrstuvwxyz':",
  "        if c == orig: continue",
  "        s[pos] = c",
  "        for k, v in count_all(s).items():",
  "            if v >= f: result.add(k)",
  "        s[pos] = orig",
])}

<div class="box no">
  <b>${t(E, "Why TLE?", "왜 TLE?")}</b>
  ${t(E, "N=20,000: 26 × 4×10⁸ = ~10¹⁰ ops. At 10⁸ ops/sec → ~100 sec. TLE.", "N=20,000: 26 × 4×10⁸ = ~10¹⁰ 연산. 1억 ops/sec → ~100 초. TLE.")}
</div>

<h2>3. ${t(E, "Pattern: Remove → Try → Restore", "패턴: 빼기 → 시도 → 복원")}</h2>

<div class="box ok">
  <b>💡 ${t(E, "Key insight", "핵심 통찰")}</b>:
  ${t(E, "Changing 1 letter at position pos affects ONLY 3 windows (those containing pos). The other N-3 windows don't change.", "위치 pos 의 1 글자를 바꾸면 영향받는 윈도우는 정확히 3 개 (pos 포함). 나머지 N-3 윈도우는 안 변함.")}
</div>

<h3>${t(E, "Why exactly 3?", "왜 정확히 3?")}</h3>
<p>${t(E, "Position pos can be the 1st, 2nd, or 3rd letter of a 3-letter window. So 3 windows include pos: starting at idx = pos-2, pos-1, pos.", "위치 pos 는 윈도우의 1번째, 2번째, 3번째 글자가 될 수 있음. 그래서 idx = pos-2, pos-1, pos 에서 시작하는 3 윈도우.")}</p>

<h3>${t(E, "Strategy", "전략")}</h3>
<ol>
  <li><b>${t(E, "Pre-count", "미리 세기")}</b>: ${t(E, "scan original ONCE, store moo counts in dict.", "원본 한 번 스캔, dict 에 카운트 저장.")}</li>
  <li><b>${t(E, "For each pos:", "각 pos 마다:")}</b>
    <ul>
      <li>🔴 ${t(E, "REMOVE: subtract 3 windows", "빼기: 3 윈도우 빼기")}</li>
      <li>🟡 ${t(E, "TRY 26 letters: temp add, check ≥ f, immediately undo", "26 글자: 임시 더하고 체크, 즉시 되돌리기")}</li>
      <li>🟢 ${t(E, "RESTORE: add back 3 windows", "복원: 3 윈도우 다시 더하기")}</li>
    </ul>
  </li>
</ol>

<div class="box">
  <b>${t(E, "Time complexity", "시간복잡도")}:</b>
  ${t(E, "N positions × 26 letters × 3 windows = 78N. For N=20,000 → 1.56M ops. Instant.", "N × 26 × 3 = 78N. N=20,000 → 156만 연산. 즉시.")}
  <br>${t(E, "Speedup: 26N² / 78N = N/3 ≈ 6,667× faster.", "속도: 26N² / 78N = N/3 ≈ 6,667 배.")}
</div>

<h2>4. ${t(E, "Optimal Code (4 sections)", "최적 코드 (4 부분)")}</h2>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why">
    <b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b>
    <ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
  </div>
  ${sectionCode(s)}
`).join("")}

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">
  © Coderin · 코드린 · ${t(E, "Generated for offline study", "오프라인 학습용 출력")}
</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
