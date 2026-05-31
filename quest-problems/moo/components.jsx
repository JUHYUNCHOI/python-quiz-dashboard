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
  const PRESETS = ["zzmoozzmoo", "momoobaaaaaqqqcqq", "ooo", "aabbcc"];
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center", marginBottom: 12, padding: "0 4px" }}>
        {arr.map((ch, i) => (
          <div key={i} style={{ position: "relative" }}>
            <button onClick={() => setEditPos(i)} style={{
              width: 26, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 5, cursor: "pointer", fontSize: 14, fontWeight: 800,
              fontFamily: "'JetBrains Mono',monospace",
              background: editPos === i ? "#fde68a" : highlights.has(i) ? C.accentBg : "#f8f9fc",
              border: `2px solid ${editPos === i ? "#f59e0b" : highlights.has(i) ? C.accentBd : C.border}`,
              color: editPos === i ? "#92400e" : highlights.has(i) ? C.accent : C.text,
            }}>{ch}</button>
            <div style={{ fontSize: 8, textAlign: "center", color: C.dimLight, marginTop: 1 }}>{i}</div>
          </div>
        ))}
      </div>

      {editPos !== null && (
        <div style={{
          background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10,
          padding: "10px 14px", marginBottom: 12, textAlign: "center",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>
            {t(E, `Change position ${editPos} (${arr[editPos]}):`, `위치 ${editPos} (${arr[editPos]}) 바꾸기:`)}
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
        t(E, "Line-by-line:", "줄별로:"),
        t(E, "• `n, f = map(int, input().split())` — first line of input has both numbers. Split by space, convert to int.",
            "• `n, f = map(int, input().split())` — 첫 줄에 두 숫자. 공백으로 나누고 int 로 변환."),
        t(E, "• `s = list(input().strip())` — second line is the string. .strip() removes the trailing newline. Without list(), we can't change letters later.",
            "• `s = list(input().strip())` — 둘째 줄이 문자열. .strip() 으로 끝의 줄바꿈 제거. list() 안 쓰면 나중에 글자 못 바꿈."),
        t(E, "• `result = set()` — collect distinct moos. SET auto-dedupes: if 'moo' is found via 2 different trials, it's stored once.",
            "• `result = set()` — distinct moo 모음. SET 자동 중복 제거: 'moo' 가 2 번 발견돼도 1 번 저장."),
        t(E, "What if we used a list? Then '|result|' would inflate and we'd have to dedupe manually before printing.",
            "리스트로 쓰면? '|result|' 가 부풀어 출력 전에 직접 중복 제거해야 함."),
      ],
      pyOnly: [
        t(E, "`import sys; input = sys.stdin.readline` — built-in input() is slow on large inputs (N up to 20,000).",
            "`import sys; input = sys.stdin.readline` — 기본 input() 은 큰 입력(N≤20,000) 에 느림."),
      ],
      cppOnly: [
        t(E, "C++ `cin >> s` reads a word (stops at whitespace) — exactly what we need for a single string.",
            "C++ `cin >> s` 는 단어 1 개 읽기 (공백에서 멈춤) — 문자열 1 개에 딱 맞음."),
        t(E, "`std::string` is mutable — direct `s[pos] = c` works without converting to anything.",
            "`std::string` 변경 가능 — 변환 없이 `s[pos] = c` 바로 됨."),
      ],
    },
    {
      label: t(E, "🔧 2. Helpers (is_moo + count_all)", "🔧 2. 헬퍼 함수 (is_moo + count_all)"),
      color: "#0891b2",
      py: BR_HELPERS_PY, cpp: BR_HELPERS_CPP,
      why: [
        t(E, "Line-by-line:", "줄별로:"),
        t(E, "• `is_moo(a, b, c): return a != b and b == c` — exact moo definition: 1st letter different, last two same. Both conditions must hold.",
            "• `is_moo(a, b, c): return a != b and b == c` — moo 정의 그대로: 1 번째 글자 다르고, 뒤 2 개 같음. 둘 다 만족해야 함."),
        t(E, "• `for i in range(len(arr) - 2)` — windows start at 0, 1, ..., N-3. The last valid window is [N-3, N-2, N-1].",
            "• `for i in range(len(arr) - 2)` — 윈도우는 0, 1, ..., N-3 에서 시작. 마지막 유효 윈도우는 [N-3, N-2, N-1]."),
        t(E, "Why -2? Because we read arr[i+2] inside — if i = N-2, that's arr[N], out of bounds.",
            "왜 -2? 안에서 arr[i+2] 읽으니까 — i = N-2 면 arr[N], 인덱스 초과."),
        t(E, "• `key = arr[i] + arr[i+1] + arr[i+2]` — concatenate 3 characters into a string to use as dict key.",
            "• `key = arr[i] + arr[i+1] + arr[i+2]` — 3 글자 이어 붙여 dict 키로 사용."),
        t(E, "• `moos[key] = moos.get(key, 0) + 1` — increment. .get(key, 0) returns 0 if key not yet stored.",
            "• `moos[key] = moos.get(key, 0) + 1` — 카운트 증가. .get(key, 0) 은 키 없으면 0 반환."),
        t(E, "WITHOUT this helper, every trial would re-write the same 6 lines. Cost per call: O(N).",
            "이 헬퍼 없으면 매 시도마다 같은 6 줄을 반복. 호출당 비용: O(N)."),
        t(E, "This O(N) per call is the bottleneck — the next section calls count_all 26N times!",
            "이 호출당 O(N) 이 병목 — 다음 섹션에서 count_all 을 26N 번 호출!"),
      ],
      pyOnly: [
        t(E, "Plain dict + `.get(key, 0)` — safe default. (defaultdict is faster, same idea.)",
            "기본 dict + `.get(key, 0)` — 안전 기본값. (defaultdict 더 빠르지만 같은 아이디어)"),
      ],
      cppOnly: [
        t(E, "Lambda `[&]` captures outer variables by reference — cleaner than a free function.",
            "람다 `[&]` 는 외부 변수를 참조 캡처 — 자유 함수보다 깔끔."),
        t(E, "`map<string, int>` auto-initializes to 0 on first `[]` access — no explicit init needed.",
            "`map<string, int>` 은 `[]` 첫 접근 시 자동 0 — 명시적 초기화 불필요."),
        t(E, "`str.substr(i, 3)` — substring of length 3 starting at i. Used as map key.",
            "`str.substr(i, 3)` — i 부터 길이 3 부분문자열. map 키로 사용."),
      ],
    },
    {
      label: t(E, "🐌 3. Trial Loop (THE TLE)", "🐌 3. 시도 루프 (TLE 원인!)"),
      color: "#dc2626",
      py: BR_LOOP_PY(E), cpp: BR_LOOP_CPP(E),
      why: [
        t(E, "Line-by-line — the slow part:", "줄별로 — 느린 부분:"),
        t(E, "• Pre-register block (first 3 lines): count moos in the ORIGINAL string and add those with v ≥ f. This catches moos that need 0 changes.",
            "• 사전 등록 블록 (처음 3 줄): 원본 문자열의 moo 카운트 후 v ≥ f 인 것 추가. 0 글자 변경으로 가능한 moo 포착."),
        t(E, "• `for pos in range(n)` — try every position. N iterations.",
            "• `for pos in range(n)` — 모든 위치 시도. N 번 반복."),
        t(E, "• `orig = s[pos]` — save original so we can restore at the end of the inner loop.",
            "• `orig = s[pos]` — 원래 글자 저장, 안쪽 루프 끝에서 복원용."),
        t(E, "• `for c in 'abc...z'` — try all 26 letters. 26 iterations × N positions = 26N trials.",
            "• `for c in 'abc...z'` — 26 글자 다 시도. 26 × N = 26N 번 시도."),
        t(E, "• `if c == orig: continue` — skip the original letter (no change = nothing new).",
            "• `if c == orig: continue` — 원래 글자는 건너뜀 (변경 없음 = 새로운 것 없음)."),
        t(E, "• `s[pos] = c` — actually swap the letter into the string.",
            "• `s[pos] = c` — 실제로 글자 교체."),
        t(E, "• `for k, v in count_all(s).items()` — re-scan THE WHOLE STRING. This is the killer: each call is O(N), and we call it 26N times.",
            "• `for k, v in count_all(s).items()` — 전체 문자열 다시 훑기. 이게 결정타: 호출당 O(N), 26N 번 호출."),
        t(E, "• `s[pos] = orig` — put the original letter back so the next trial starts clean.",
            "• `s[pos] = orig` — 원래 글자 복원, 다음 시도가 깨끗하게 시작."),
        t(E, "Without `s[pos] = orig`: trial of 'b' would leave 'a' in the string when we move to 'c'. Bugs everywhere.",
            "`s[pos] = orig` 없으면: 'b' 시도가 끝나도 's' 에 'a' 가 남아 'c' 시도가 망함. 버그 천국."),
        t(E, "Total: N positions × 26 letters × O(N) scan = O(26N²). N=20,000 → ~10¹⁰ ops → TLE.",
            "총합: N × 26 × O(N) 스캔 = O(26N²). N=20,000 → ~10¹⁰ 연산 → TLE."),
        t(E, "The next section fixes this: instead of scanning N windows per trial, only update the 3 windows that actually changed.",
            "다음 섹션에서 수정: 시도마다 N 윈도우 훑기 대신, 실제 바뀐 3 윈도우만 업데이트."),
      ],
    },
    {
      label: t(E, "📤 4. Sort + Output", "📤 4. 정렬 + 출력"),
      color: "#94a3b8",
      py: BR_OUTPUT_PY, cpp: BR_OUTPUT_CPP,
      why: [
        t(E, "Line-by-line:", "줄별로:"),
        t(E, "• `result = sorted(result)` — result is a SET (no order). Judge expects alphabetical order. Without this line: Wrong Answer.",
            "• `result = sorted(result)` — result 는 SET (순서 없음). 채점기는 알파벳순 요구. 이 줄 없으면 WA."),
        t(E, "• `print(len(result))` — first line of output is the COUNT K (= number of distinct moos found).",
            "• `print(len(result))` — 출력 첫 줄은 개수 K (= 발견한 distinct moo 수)."),
        t(E, "• `print('\\n'.join(result))` — print K moos, one per line. '\\n'.join() builds the multi-line string in one go.",
            "• `print('\\n'.join(result))` — K 개 moo 한 줄씩 출력. '\\n'.join() 으로 멀티라인 한 번에 생성."),
      ],
      pyOnly: [
        t(E, "Why join instead of a loop? Single print call → fewer flushes → slightly faster on large output.",
            "왜 루프 대신 join? print 호출 1 번 → flush 적음 → 큰 출력에서 약간 빠름."),
      ],
      cppOnly: [
        t(E, "`set<string>` already iterates alphabetically (RB-tree) — no extra sort step.",
            "`set<string>` 은 이미 알파벳순 순회 (RB-tree) — 추가 sort 불필요."),
        t(E, "`for (auto& m : result)` — range-for over each string. `&` avoids copying.",
            "`for (auto& m : result)` — 각 문자열에 대해 range-for. `&` 로 복사 안 함."),
      ],
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
        t(E, "Line-by-line:", "줄별로:"),
        t(E, "• `n, f = map(int, input().split())` — first line has both numbers. Split by space, convert to int.",
            "• `n, f = map(int, input().split())` — 첫 줄에 두 숫자. 공백 split, int 변환."),
        t(E, "• `string = list(input().strip())` — read second line as a LIST of single-character strings. .strip() trims the trailing newline.",
            "• `string = list(input().strip())` — 둘째 줄을 글자 1 개짜리 문자열의 리스트로. .strip() 으로 끝 줄바꿈 제거."),
        t(E, "Why list, not just a string? Python strings are immutable — `'abc'[1] = 'x'` raises TypeError. But we WILL swap letters during trials, so we need a list.",
            "왜 list, 그냥 문자열이 아니라? Python 문자열은 변경 불가 — `'abc'[1] = 'x'` 는 TypeError. 근데 시도 중 글자 바꿔야 하니까 list 필요."),
        t(E, "Without list(): later `string[pos] = c` crashes, and we can't run the algorithm at all.",
            "list() 없으면: 나중에 `string[pos] = c` 크래시 — 알고리즘 자체가 안 돌아감."),
      ],
      pyOnly: [
        t(E, "`import sys; input = sys.stdin.readline` — built-in input() is slow at N=20,000. This makes reading near-instant.",
            "`import sys; input = sys.stdin.readline` — 기본 input() 은 N=20,000 에 느림. 이걸로 거의 즉시."),
        t(E, "`from collections import defaultdict` — used in next section. Auto-initializes missing keys to 0.",
            "`from collections import defaultdict` — 다음 섹션에서 사용. 없는 키를 자동 0 초기화."),
      ],
      cppOnly: [
        t(E, "`cin >> s` reads a word (stops at whitespace) — perfect for a single string token.",
            "`cin >> s` 는 단어 1 개 (공백에서 멈춤) — 문자열 1 개에 딱."),
        t(E, "`std::string` is mutable — direct `s[i] = c` works. No list conversion needed.",
            "`std::string` 은 변경 가능 — `s[i] = c` 바로 됨. list 변환 불필요."),
        t(E, "Include only the headers you actually use (iostream/string/set/map) — same style you've learned.",
            "쓰는 헤더만 명시적으로 include (iostream/string/set/map) — 배운 그대로."),
      ],
    },
    {
      label: t(E, "📊 2. Pre-count moos", "📊 2. moo 미리 세기"),
      color: "#0891b2",
      py: MOO_PRECOUNT_PY, cpp: MOO_PRECOUNT_CPP,
      why: [
        t(E, "Line-by-line:", "줄별로:"),
        t(E, "• `isMoo(a, b, c): return a != b and b == c` — the moo definition. 1st letter different, last two same. Both conditions must hold.",
            "• `isMoo(a, b, c): return a != b and b == c` — moo 정의. 1 번째 글자 다름, 뒤 2 개 같음. 둘 다 만족해야 함."),
        t(E, "• `mydict = defaultdict(int)` — counter notebook. Key = moo string, value = count. New keys auto-start at 0 (no `if key in dict`).",
            "• `mydict = defaultdict(int)` — 카운터 공책. 키 = moo 문자열, 값 = 개수. 새 키는 자동 0 (`if key in dict` 불필요)."),
        t(E, "• `for i in range(n - 2)` — window starts: 0, 1, ..., n-3. (Last valid window starts at n-3 and covers indices [n-3, n-2, n-1].)",
            "• `for i in range(n - 2)` — 윈도우 시작: 0, 1, ..., n-3. (마지막 유효 윈도우는 n-3 에서 시작, 인덱스 [n-3, n-2, n-1] 커버.)"),
        t(E, "Why n-2? Inside we read `string[i+2]` — if i = n-2 then string[n], out of bounds.",
            "왜 n-2? 안에서 `string[i+2]` 읽음 — i = n-2 면 string[n], 인덱스 초과."),
        t(E, "• `if isMoo(...)` — count only actual moos, not all 3-character triplets.",
            "• `if isMoo(...)` — 진짜 moo 만 세고, 아무 3 글자나 안 셈."),
        t(E, "• `key = string[i] + string[i+1] + string[i+2]` — concat 3 chars into a single string. Used as dict key.",
            "• `key = string[i] + string[i+1] + string[i+2]` — 3 글자 이어 붙여 1 문자열. dict 키로 사용."),
        t(E, "• `mydict[key] += 1` — increment. defaultdict auto-creates the key with value 0 the first time.",
            "• `mydict[key] += 1` — 증가. defaultdict 가 처음 키 접근 시 자동 0 으로 생성."),
        t(E, "WHY pre-count at all? So the trial loop only needs to update the 3 windows that change — never re-scan the rest.",
            "왜 미리 셈? 시도 루프가 바뀌는 3 윈도우만 업데이트하도록 — 나머지 다시 안 훑게."),
        t(E, "Without pre-count: every trial re-counts from scratch — that's the brute force we just rejected.",
            "이 단계 없으면: 매 시도가 처음부터 다시 셈 — 방금 거부한 브루트와 같음."),
      ],
      pyOnly: [
        t(E, "`defaultdict(int)` vs plain dict: skips the `if key not in dict` boilerplate. Same semantics, less code.",
            "`defaultdict(int)` vs 기본 dict: `if key not in dict` 보일러플레이트 생략. 같은 의미, 짧은 코드."),
        t(E, "Slicing `string[i:i+3]` would also work, but `string[i] + string[i+1] + string[i+2]` is slightly faster for length 3.",
            "슬라이싱 `string[i:i+3]` 도 되지만, 길이 3 에서는 `string[i] + ...` 가 약간 빠름."),
      ],
      cppOnly: [
        t(E, "`map<string, int>` — red-black tree, O(log K) per access. Auto-inits to 0 on first `[]`.",
            "`map<string, int>` — RB-tree, 접근당 O(log K). `[]` 첫 접근 시 자동 0."),
        t(E, "`s.substr(i, 3)` — substring of length 3 starting at i. Used as map key.",
            "`s.substr(i, 3)` — i 부터 길이 3 부분문자열. map 키로 사용."),
        t(E, "Bonus: map iterates keys in sorted order — gives us sorted output for free in the last section.",
            "보너스: map 은 키를 정렬 순서로 순회 — 마지막 섹션 정렬 출력이 공짜."),
      ],
    },
    {
      label: t(E, "🔄 3. Remove → Try → Restore", "🔄 3. 빼기 → 시도 → 복원"),
      color: "#16a34a",
      py: MOO_TRY_PY(E), cpp: MOO_TRY_CPP,
      why: [
        t(E, "Line-by-line — the heart of the algorithm:", "줄별로 — 알고리즘의 심장:"),
        t(E, "• `alphabet = 'abc...z'` — the 26 letters we'll try at each position.",
            "• `alphabet = 'abc...z'` — 각 위치에 시도할 26 글자."),
        t(E, "• `for pos in range(n)` — every position is a candidate for the typo.",
            "• `for pos in range(n)` — 모든 위치가 오타 후보."),
        t(E, "• `minIdx = max(pos - 2, 0)` — earliest window-start that still contains pos. Clipped to ≥ 0 at the left edge.",
            "• `minIdx = max(pos - 2, 0)` — pos 를 포함하는 가장 빠른 윈도우 시작. 왼쪽 끝에서는 0 으로 자름."),
        t(E, "• `maxIdx = min(n - 3, pos)` — latest window-start that still contains pos. Clipped to ≤ n-3 at the right edge.",
            "• `maxIdx = min(n - 3, pos)` — pos 를 포함하는 가장 늦은 윈도우 시작. 오른쪽 끝에서는 n-3 으로 자름."),
        t(E, "Why n-3? Window i covers [i, i+1, i+2]. To fit inside the string we need i+2 ≤ n-1, i.e. i ≤ n-3.",
            "왜 n-3? 윈도우 i 는 [i, i+1, i+2] 커버. 문자열 안에 들어가려면 i+2 ≤ n-1, 즉 i ≤ n-3."),
        t(E, "Edge cases: pos=0 → only window [0,1,2]. pos=n-1 → only window [n-3,n-2,n-1]. Middle pos → 3 windows.",
            "가장자리: pos=0 → 윈도우 [0,1,2] 만. pos=n-1 → [n-3,n-2,n-1] 만. 가운데 → 3 개."),
        t(E, "🔴 REMOVE block: subtract the moos in the 3 windows from mydict. Now mydict reflects 'string with pos's contribution erased'.",
            "🔴 REMOVE 블록: 3 윈도우의 moo 를 mydict 에서 뺌. 이제 mydict 는 'pos 기여가 지워진 문자열' 상태."),
        t(E, "🟡 TRY block: for each of 26 letters, simulate placing it at pos.",
            "🟡 TRY 블록: 26 글자 각각에 대해 pos 에 놓는다고 시뮬."),
        t(E, "• `t = list(string[idx:idx+3])` — copy 3 chars of the window into a MUTABLE list. (slicing alone returns a list of strings; list() makes the copy explicit.)",
            "• `t = list(string[idx:idx+3])` — 윈도우 3 글자를 변경 가능한 리스트로 복사. (string 이 글자 list 라 슬라이싱이 list 반환, list() 로 명시적 복사.)"),
        t(E, "• `t[pos - idx] = c` — overwrite the right offset. The window starts at idx, so pos sits at offset pos-idx (always 0, 1, or 2).",
            "• `t[pos - idx] = c` — 올바른 오프셋에 덮어쓰기. 윈도우가 idx 에서 시작 → pos 는 오프셋 pos-idx (항상 0, 1, 2)."),
        t(E, "Why copy t? If we modified `string` directly inside this loop, the OTHER windows (idx values) would see the wrong character. Copying keeps each window independent.",
            "왜 t 복사? string 을 직접 바꾸면 다른 윈도우(idx 값)들이 잘못된 글자를 봄. 복사로 각 윈도우 독립 유지."),
        t(E, "• `mydict[key] += 1` — temporarily add this trial's contribution.",
            "• `mydict[key] += 1` — 이 시도의 기여를 임시로 추가."),
        t(E, "• `if mydict[key] >= f: result.add(key)` — crossed the threshold? Save the moo. (result is a SET so re-adding is fine.)",
            "• `if mydict[key] >= f: result.add(key)` — 기준치 넘었나? 저장. (result 는 SET 이라 중복 add 무해.)"),
        t(E, "• `mydict[key] -= 1` — IMMEDIATELY undo so the NEXT letter trial starts from the same clean baseline.",
            "• `mydict[key] -= 1` — 즉시 되돌리기. 다음 글자 시도가 같은 깨끗한 기준선에서 시작."),
        t(E, "If we forgot `-= 1`: trying 'a' would leak into trying 'b' — double counting, wrong answer. The +1 → check → -1 dance is non-negotiable.",
            "`-= 1` 빼먹으면: 'a' 시도가 'b' 시도로 새서 이중 카운트, 오답. +1 → 확인 → -1 댄스는 필수."),
        t(E, "🟢 RESTORE block: add back what we removed. mydict is now EXACTLY what it was before this pos.",
            "🟢 RESTORE 블록: 뺀 것 다시 더하기. mydict 가 이 pos 시작 전과 정확히 동일."),
        t(E, "Total work: N positions × (3 + 26·3 + 3) ≈ 84N ≈ O(78N). At N=20,000: ~1.6M ops — instant.",
            "총 연산: N × (3 + 26·3 + 3) ≈ 84N ≈ O(78N). N=20,000 에서 ~160 만 — 즉시."),
      ],
      pyOnly: [
        t(E, "`list(string[idx:idx+3])` — slicing returns a list (since string itself is a list); list() makes a fresh copy so t can be mutated freely.",
            "`list(string[idx:idx+3])` — slicing 이 list 반환 (string 자체가 list), list() 로 새 복사본 → t 자유롭게 수정."),
      ],
      cppOnly: [
        t(E, "`s[pos] = c` modifies the string in place (faster than copying), then `s[pos] = orig` after the inner loop restores it.",
            "`s[pos] = c` 로 in-place 수정 (복사보다 빠름), 안쪽 루프 후 `s[pos] = orig` 로 복원."),
        t(E, "`set<string> result` — automatic dedupe (problem allows multiple positions to yield same key) AND alphabetical iteration.",
            "`set<string> result` — 자동 중복 제거 (다른 위치에서 같은 moo 가능) + 알파벳순 순회."),
      ],
    },
    {
      label: t(E, "🎯 4. Output + Full Code", "🎯 4. 출력 + 전체 코드"),
      color: A,
      py: MOO_FULL_PY(E), cpp: MOO_FULL_CPP,
      why: [
        t(E, "Line-by-line:", "줄별로:"),
        t(E, "• `result = sorted(result)` — result is a SET so order is unpredictable. Judge expects alphabetical. Without this line: Wrong Answer.",
            "• `result = sorted(result)` — result 는 SET 이라 순서 무작위. 채점기는 알파벳순 요구. 이 줄 없으면 WA."),
        t(E, "• `print(len(result))` — first output line is the COUNT K (= number of distinct qualifying moos).",
            "• `print(len(result))` — 출력 첫 줄은 개수 K (= qualifying distinct moo 수)."),
        t(E, "• `print('\\n'.join(result))` — K moos, one per line. Single print = fewer flushes than a loop.",
            "• `print('\\n'.join(result))` — K 개 moo, 줄당 1 개. print 1 번 = 루프보다 flush 적음."),
        t(E, "Why does result hold DISTINCT moos? Because it's a SET — adding the same key twice does nothing.",
            "왜 result 가 distinct? SET 이라 같은 키 두 번 추가해도 효과 없음."),
        t(E, "Time: O(78N). For N=20,000: 1.56M ops — instant. Brute = 26N² ≈ 10¹⁰ ops ≈ 104 s (TLE).",
            "시간: O(78N). N=20,000 에서 156 만 — 즉시. 브루트 = 26N² ≈ 10¹⁰ ≈ 104 초 (TLE)."),
      ],
      pyOnly: [
        t(E, "`sorted()` on a set returns a list in lexicographic order — exactly the judge's requirement.",
            "`sorted()` 를 set 에 적용 → 사전순 리스트 → 채점기 요구사항과 정확히 일치."),
      ],
      cppOnly: [
        t(E, "`set<string>` already iterates in alphabetical order (RB-tree) — no extra sort step.",
            "`set<string>` 은 이미 알파벳순 순회 (RB-tree) — 추가 sort 불필요."),
        t(E, "`for (auto& m : result)` — range-for, `&` avoids copying each string.",
            "`for (auto& m : result)` — range-for, `&` 로 문자열 복사 안 함."),
      ],
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
