import { useState, useRef } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { SimNav, useTraceStep, StepHeader, NarrativePanel } from "@/components/quest/TraceStepper";

const A = "#7c5cfc";

/* ═══════════════════════════════════════════════════════════════
   PermSim — 학생이 시작값을 골라 그리디 알고리즘을 한 단계씩 따라가는 위젯.
   - 6 가지 (start, h) 케이스 중 선택
   - 각 케이스: 시작값 → 매 i 마다 + 또는 - 시도 → 성공/실패 추적
   - 실패 시 어디서/왜 막혔는지 보여줌
   ═══════════════════════════════════════════════════════════════ */

// 기본 예시: N=4, h=[2,3,2]. start 별 결과:
//   1: 1→3→6(✗)→4→? 1+2=3 ok, 3+3=6 ✗, 3-3=0 ✗ → 실패
//   2: 2+2=4 ok, 4+3=7 ✗, 4-3=1 ok, 1+2=3 ok → [2,4,1,3] ✓
//   3: 3+2=5 ✗, 3-2=1 ok, 1+3=4 ok, 4+2=6 ✗, 4-2=2 ok → [3,1,4,2] ✓
//   4: 4+2=6 ✗, 4-2=2 ok, 2+3=5 ✗, 2-3=-1 ✗ → 실패
function simulateGreedy(N, h, start) {
  const perm = [start];
  const used = new Set([start]);
  const trace = [{ i: 0, perm: [...perm], used: new Set(used), tried: [], picked: start, ok: true }];
  for (let i = 0; i < N - 1; i++) {
    const cur = perm[i];
    const plus = cur + h[i];
    const minus = cur - h[i];
    const tryPlus  = { val: plus,  ok: plus  >= 1 && plus  <= N && !used.has(plus) };
    const tryMinus = { val: minus, ok: minus >= 1 && minus <= N && !used.has(minus) };
    let picked = null;
    if (tryPlus.ok)       picked = plus;
    else if (tryMinus.ok) picked = minus;
    if (picked === null) {
      trace.push({ i: i + 1, perm: [...perm], used: new Set(used), tried: [tryPlus, tryMinus], picked: null, ok: false });
      return { success: false, trace };
    }
    perm.push(picked);
    used.add(picked);
    trace.push({ i: i + 1, perm: [...perm], used: new Set(used), tried: [tryPlus, tryMinus], picked, ok: true });
  }
  return { success: true, trace };
}


/* ═══════════════════════════════════════════════════════════════
   DismantleSimulator — interactive hand-sim of Nhoj's process
   on p = [3, 1, 2, 4]. Student presses ▶ to advance one sub-step
   at a time. Each main step has 2 sub-steps:
     a) compare first vs last → decide
     b) remove + write → state updates
   ═══════════════════════════════════════════════════════════════ */
function buildDismantleTrace(initial) {
  let p = [...initial];
  const trace = [{ sub: "init", p: [...p], h: [], removeIdx: null, writeIdx: null }];
  const h = [];
  while (p.length > 1) {
    const first = p[0], last = p[p.length - 1];
    const firstWins = first > last;
    const removeIdx = firstWins ? 0 : p.length - 1;
    const writeIdx = firstWins ? 1 : p.length - 2;
    const removedVal = p[removeIdx];
    const written = p[writeIdx];
    // 1) compare-mark: highlight first + last in yellow
    trace.push({
      sub: "compare-mark",
      p: [...p], h: [...h], removeIdx: null, writeIdx: null,
      compareFirst: first, compareLast: last,
    });
    // 2) decide-bigger: same cells, panel says who's bigger
    trace.push({
      sub: "decide-bigger",
      p: [...p], h: [...h], removeIdx: null, writeIdx: null,
      compareFirst: first, compareLast: last, firstWins,
    });
    // 3) mark-remove: tag the loser cell red
    trace.push({
      sub: "mark-remove",
      p: [...p], h: [...h], removeIdx, writeIdx: null,
      compareFirst: first, compareLast: last, firstWins, removedVal,
    });
    // 4) mark-write: tag the neighbor cell purple (which value goes to h)
    trace.push({
      sub: "mark-write",
      p: [...p], h: [...h], removeIdx, writeIdx,
      compareFirst: first, compareLast: last, firstWins, removedVal, willWrite: written,
    });
    // 5) apply: actually shrink p + grow h
    h.push(written);
    p.splice(removeIdx, 1);
    trace.push({
      sub: "apply",
      p: [...p], h: [...h], removeIdx: null, writeIdx: null,
      removedVal, lastWritten: written,
    });
  }
  trace.push({ sub: "done", p: [...p], h: [...h], removeIdx: null, writeIdx: null });
  return trace;
}

export function DismantleSimulator({ E }) {
  const initial = [3, 1, 2, 4];
  const trace = buildDismantleTrace(initial);
  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];

  const cellStyle = (kind) => ({
    width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 7, fontWeight: 700, fontSize: 17, fontFamily: "'JetBrains Mono',monospace",
    background:
      kind === "remove" ? "#fee2e2" :
      kind === "write" ? "#ede9fe" :
      kind === "final" ? "#dcfce7" :
      kind === "compare" ? "#fef3c7" : "#fff",
    border: `3px solid ${
      kind === "remove" ? "#dc2626" :
      kind === "write" ? "#7c3aed" :
      kind === "final" ? "#16a34a" :
      kind === "compare" ? "#f59e0b" : "#c4b5fd"
    }`,
    color:
      kind === "remove" ? "#7f1d1d" :
      kind === "write" ? "#5b21b6" :
      kind === "final" ? "#15803d" :
      kind === "compare" ? "#92400e" : "#5b21b6",
    textDecoration: kind === "remove" ? "line-through" : "none",
    transition: "all .2s",
  });

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, "Hand-simulate Nhoj on p = [3, 1, 2, 4]", "Nhoj 가 p = [3, 1, 2, 4] 를 망가뜨리는 과정")}
        subtitle={t(E, `Press ▶ to step through. (${safe + 1} / ${trace.length})`,
                       `▶ 눌러서 한 단계씩. (${safe + 1} / ${trace.length})`)}
      />

      {/* Cells row */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", alignItems: "center", marginBottom: 12, minHeight: 76 }}>
        {s.p.map((v, i) => {
          const isFirst = i === 0;
          const isLast = i === s.p.length - 1;
          // Determine cell kind by sub-step priority: remove > write > compare > final/neutral
          let kind = "neutral";
          let labelTop = "";
          let labelBottom = "";

          if (s.sub === "done") {
            kind = "final";
          } else {
            // Show first/last labels whenever we're in any compare-stage sub-step
            const inCompareStages = (s.sub === "compare-mark" || s.sub === "decide-bigger" ||
                                     s.sub === "mark-remove" || s.sub === "mark-write");
            if (inCompareStages && (isFirst || isLast)) {
              labelTop = isFirst ? t(E, "first", "맨 앞") : t(E, "last", "맨 뒤");
            }
            // Cell color
            if (i === s.removeIdx) {
              kind = "remove";
              labelBottom = t(E, "× will remove", "× 빠질 칸");
            } else if (i === s.writeIdx) {
              kind = "write";
              labelBottom = t(E, "✏ will write", "✏ 적힐 칸");
            } else if (inCompareStages && (isFirst || isLast)) {
              kind = "compare";
            }
          }

          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ fontSize: 10, height: 14, fontWeight: 600,
                color: labelTop ? "#92400e" : "transparent" }}>
                {labelTop || "·"}
              </div>
              <div style={cellStyle(kind)}>{v}</div>
              <div style={{ fontSize: 9, height: 14, fontWeight: 600, marginTop: 2,
                color: labelBottom.startsWith("×") ? "#dc2626" : labelBottom.startsWith("✏") ? "#7c3aed" : "transparent" }}>
                {labelBottom || "·"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint list so far */}
      <div style={{ textAlign: "center", marginBottom: 12, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#7c2d12" }}>
        {t(E, "h so far = ", "지금까지 h = ")}<b>[{s.h ? s.h.join(", ") : ""}]</b>
      </div>

      {/* Step explanation panel */}
      <NarrativePanel minHeight={88} stepKey={ts.safe}>
        {s.sub === "init" && (
          <>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 4 }}>
              📦 {t(E, "Initial state", "초기 상태")}
            </div>
            <div>{t(E, `p starts as [${initial.join(", ")}]. Hint list h is empty. Press ▶ to start.`,
                       `p 는 [${initial.join(", ")}] 로 시작. 힌트 h 는 비어 있어요. ▶ 눌러서 시작.`)}</div>
          </>
        )}
        {s.sub === "compare-mark" && (
          <>
            <div style={{ fontWeight: 600, color: "#92400e", marginBottom: 6 }}>
              1️⃣ 🔍 {t(E, "Mark first and last", "맨 앞과 맨 뒤를 표시")}
            </div>
            <div>{t(E, "first", "맨 앞")} = <b style={{ color: "#92400e" }}>{s.compareFirst}</b>,{" "}
              {t(E, "last", "맨 뒤")} = <b style={{ color: "#92400e" }}>{s.compareLast}</b>
            </div>
            <div style={{ marginTop: 4, fontSize: 11, color: C.dim }}>
              {t(E, "(▶ to compare them.)", "(▶ 눌러서 비교.)")}
            </div>
          </>
        )}
        {s.sub === "decide-bigger" && (
          <>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 6 }}>
              2️⃣ ⚖️ {t(E, "Compare", "비교")}
            </div>
            <div><b style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              {s.compareFirst} {s.firstWins ? ">" : "<"} {s.compareLast}
            </b> → {s.firstWins
              ? t(E, "first is BIGGER", "맨 앞이 더 커요")
              : t(E, "last is BIGGER (or equal)", "맨 뒤가 더 크거나 같아요")}
            </div>
            <div style={{ marginTop: 4, fontSize: 11, color: C.dim }}>
              {t(E, "(Bigger end gets removed. ▶ to mark.)", "(큰 쪽이 빠져요. ▶ 눌러서 표시.)")}
            </div>
          </>
        )}
        {s.sub === "mark-remove" && (
          <>
            <div style={{ fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>
              3️⃣ ❌ {t(E, "Mark for removal", "빠질 칸 표시")}
            </div>
            <div>{t(E, "Remove ", "")}<b style={{ color: "#dc2626", fontFamily: "'JetBrains Mono',monospace" }}>{s.removedVal}</b>
              {" "}({s.firstWins ? t(E, "the first", "맨 앞") : t(E, "the last", "맨 뒤")}).</div>
            <div style={{ marginTop: 4, fontSize: 11, color: C.dim }}>
              {t(E, "(▶ to mark which value gets written.)", "(▶ 눌러서 적힐 값 표시.)")}
            </div>
          </>
        )}
        {s.sub === "mark-write" && (
          <>
            <div style={{ fontWeight: 600, color: "#7c3aed", marginBottom: 6 }}>
              4️⃣ ✏️ {t(E, "Mark what gets written", "힌트로 적힐 값 표시")}
            </div>
            <div>{t(E, "Write ", "")}<b style={{ color: "#7c3aed", fontFamily: "'JetBrains Mono',monospace" }}>{s.willWrite}</b>
              {" "}({s.firstWins ? t(E, "the 2nd from front", "앞에서 둘째") : t(E, "the 2nd from back", "끝에서 둘째")}){" "}
              {t(E, "into h.", "을 h 에 적어요.")}
            </div>
            <div style={{ marginTop: 4, fontSize: 11, color: C.dim }}>
              {t(E, "(▶ to actually apply: shrink p, grow h.)", "(▶ 눌러서 실제 적용: p 줄이고 h 늘리기.)")}
            </div>
          </>
        )}
        {s.sub === "apply" && (
          <>
            <div style={{ fontWeight: 600, color: "#15803d", marginBottom: 6 }}>
              5️⃣ ✅ {t(E, "Applied!", "적용 완료!")}
            </div>
            <div>{t(E, "Removed ", "")}<b>{s.removedVal}</b>{t(E, ", wrote ", " 빼고, ")}<b>{s.lastWritten}</b>{t(E, " into h.", " 을 h 에 적었어요.")}</div>
            <div style={{ marginTop: 4, fontSize: 11, color: C.dim }}>
              {s.p.length > 1
                ? t(E, "(▶ to mark next first/last.)", "(▶ 눌러서 다음 first/last 표시.)")
                : t(E, "(Only 1 left → done!)", "(1 개 남음 → 종료!)")}
            </div>
          </>
        )}
        {s.sub === "done" && (
          <>
            <div style={{ fontWeight: 600, color: "#15803d", marginBottom: 6 }}>
              🎉 {t(E, "Done — only 1 element left", "종료 — 1 개만 남음")}
            </div>
            <div>{t(E, "Final hint list:", "최종 힌트:")}{" "}
              <b style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: "#7c2d12" }}>
                h = [{s.h.join(", ")}]
              </b>
            </div>
            <div style={{ marginTop: 4, fontSize: 11, color: C.dim }}>
              {t(E, "Same as sample case 4! Input h = [2, 1, 1] could come from p = [3, 1, 2, 4].",
                    "샘플 케이스 4 와 일치! 입력 h = [2, 1, 1] 은 p = [3, 1, 2, 4] 에서 나온 거예요.")}
            </div>
          </>
        )}
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

export function PermSim({ E }) {
  const N = 4;
  const h = [2, 3, 2];
  const [start, setStart] = useState(3);
  const [si, setSi] = useState(0);

  const { success, trace } = simulateGreedy(N, h, start);
  const cur = Math.min(si, trace.length - 1);
  const step = trace[cur];

  const cellStyle = (filled, justPicked, conflict) => ({
    width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
    background: justPicked ? "#fef3c7" : (filled ? "#ede9fe" : "#fff"),
    border: `1px solid ${conflict ? "#dc2626" : (justPicked ? "#f59e0b" : (filled ? A : "#e5e7eb"))}`,
    color: conflict ? "#dc2626" : (justPicked ? "#92400e" : (filled ? A : "#cbd5e1")),
    transition: "all .2s",
  });

  return (
    <div style={{ padding: 14 }}>
      {/* start 선택 */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.dim, alignSelf: "center", marginRight: 4 }}>
          {t(E, "start =", "시작값 =")}
        </span>
        {[1, 2, 3, 4].map(s => {
          const r = simulateGreedy(N, h, s);
          return (
            <button key={s} onClick={() => { setStart(s); setSi(0); }} style={{
              padding: "5px 12px", borderRadius: 8, border: `1px solid ${s === start ? A : C.border}`,
              background: s === start ? A : "transparent", color: s === start ? "#fff" : C.dim,
              fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
            }}>
              {s} <span style={{ fontSize: 10, marginLeft: 2 }}>{r.success ? "✓" : "✗"}</span>
            </button>
          );
        })}
      </div>

      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 11, color: C.dim, textAlign: "center" }}>
        N = 4, h = [2, 3, 2]
      </div>

      {/* perm 배열 시각화 */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
        {Array.from({ length: N }).map((_, idx) => {
          const filled = idx < step.perm.length;
          const justPicked = idx === step.i && step.ok && step.picked !== null;
          return (
            <div key={idx} style={cellStyle(filled, justPicked, false)}>
              {filled ? step.perm[idx] : "?"}
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 10, color: C.dim, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>
        perm[]
      </div>

      {/* 시도 결과 */}
      {step.tried && step.tried.length > 0 && (
        <div style={{ background: step.ok ? "#f0fdf4" : "#fef2f2", border: `1.5px solid ${step.ok ? "#86efac" : "#fca5a5"}`, borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: step.ok ? "#16a34a" : "#dc2626", marginBottom: 6 }}>
            {t(E, `Step ${cur}: pick perm[${step.i}]`, `${cur}단계: perm[${step.i}] 결정`)}
          </div>
          <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.8 }}>
            <div>
              + {h[step.i - 1]} = <b>{step.tried[0].val}</b>{" "}
              <span style={{ color: step.tried[0].ok ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                {step.tried[0].ok ? "✓ ok" : (step.tried[0].val < 1 || step.tried[0].val > N ? `✗ out of range` : `✗ already used`)}
              </span>
            </div>
            <div>
              − {h[step.i - 1]} = <b>{step.tried[1].val}</b>{" "}
              <span style={{ color: step.tried[1].ok ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                {step.tried[1].ok ? "✓ ok" : (step.tried[1].val < 1 || step.tried[1].val > N ? `✗ out of range` : `✗ already used`)}
              </span>
            </div>
            <div style={{ marginTop: 4, fontWeight: 600, color: step.ok ? "#16a34a" : "#dc2626" }}>
              → {step.ok ? `${t(E, "pick", "선택")}: ${step.picked}` : t(E, "둘 다 안 됨 — start 실패!", "둘 다 안 됨 — start 실패!")}
            </div>
          </div>
        </div>
      )}
      {/* Initial-state instruction box removed — the start-value chips already show
          which start is selected, and the → button is right there. */}

      {/* 결과 박스 (마지막 단계) */}
      {cur === trace.length - 1 && (
        <div style={{
          background: success ? "#dcfce7" : "#fee2e2",
          border: `1px solid ${success ? "#16a34a" : "#dc2626"}`,
          borderRadius: 10, padding: "10px 12px", marginBottom: 10, textAlign: "center",
          fontSize: 13, fontWeight: 600, color: success ? "#15803d" : "#7f1d1d",
        }}>
          {success
            ? t(E, `✅ Success! perm = [${trace[trace.length-1].perm.join(", ")}]`, `✅ 성공! perm = [${trace[trace.length-1].perm.join(", ")}]`)
            : t(E, `❌ Start = ${start} fails. Try a different start!`, `❌ 시작값 = ${start} 실패. 다른 시작값 시도!`)}
        </div>
      )}

      {/* 네비 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setSi(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === 0 ? "#b0b5c3" : A, cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
          {cur + 1} / {trace.length}
        </span>
        <button onClick={() => setSi(Math.min(trace.length - 1, cur + 1))} disabled={cur === trace.length - 1} style={{
          background: cur === trace.length - 1 ? "#e5e7eb" : A, border: `1px solid ${cur === trace.length - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === trace.length - 1 ? "#b0b5c3" : "#fff", cursor: cur === trace.length - 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PermRunner — 학생이 직접 N + h 입력 → 모든 start 시도하며 라이브 진행
   ═══════════════════════════════════════════════════════════════ */
export function PermRunner({ E }) {
  const [nInput, setNInput] = useState("4");
  const [hInput, setHInput] = useState("2 3 2");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [liveStart, setLiveStart] = useState(0);
  const [liveStep, setLiveStep] = useState(0);
  const [livePerm, setLivePerm] = useState([]);
  const alive = useRef(false);
  const startTimeRef = useRef(0);

  const run = () => {
    const N = parseInt(nInput);
    const h = hInput.trim().split(/\s+/).map(Number);
    if (!N || N < 2 || N > 1000 || h.length !== N - 1 || h.some(x => isNaN(x) || x < 1 || x >= N)) {
      setResult({ error: t(E, "Invalid input. N ≥ 2, h has N-1 values, 1 ≤ h[i] < N.", "잘못된 입력. N ≥ 2, h 는 N-1 개, 1 ≤ h[i] < N.") });
      return;
    }
    setRunning(true); setResult(null);
    setLiveStart(1); setLiveStep(0); setLivePerm([1]);
    alive.current = true;
    startTimeRef.current = performance.now();

    let start = 1;
    const tryStart = () => {
      if (!alive.current) {
        setResult({ stopped: true, lastStart: start, elapsed: performance.now() - startTimeRef.current });
        setRunning(false);
        return;
      }
      if (start > N) {
        setResult({ found: false, elapsed: performance.now() - startTimeRef.current });
        setRunning(false);
        return;
      }
      const perm = [start];
      const used = new Set([start]);
      let valid = true;
      for (let i = 0; i < N - 1; i++) {
        const cur = perm[i];
        const plus = cur + h[i];
        const minus = cur - h[i];
        if (plus >= 1 && plus <= N && !used.has(plus)) { perm.push(plus); used.add(plus); }
        else if (minus >= 1 && minus <= N && !used.has(minus)) { perm.push(minus); used.add(minus); }
        else { valid = false; break; }
      }
      setLiveStart(start); setLiveStep(perm.length); setLivePerm(perm);
      if (valid) {
        setResult({ found: true, perm, start, elapsed: performance.now() - startTimeRef.current });
        setRunning(false);
        return;
      }
      start += 1;
      // delay so student can see progression — bigger delay for small N
      const delay = N <= 10 ? 250 : (N <= 100 ? 30 : 5);
      setTimeout(tryStart, delay);
    };
    setTimeout(tryStart, 100);
  };
  const stop = () => { alive.current = false; };

  const fmtTime = (ms) => ms < 1000 ? `${ms.toFixed(0)}ms` : `${(ms / 1000).toFixed(2)}s`;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8, marginBottom: 10 }}>
        <input value={nInput} onChange={e => setNInput(e.target.value)} disabled={running}
          placeholder="N" style={{
            padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`,
            fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
            color: A, textAlign: "center",
          }} />
        <input value={hInput} onChange={e => setHInput(e.target.value)} disabled={running}
          placeholder="h (space-separated)" style={{
            padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`,
            fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
            color: A,
          }} />
      </div>
      <button onClick={running ? stop : run} style={{
        width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
        fontSize: 14, fontWeight: 600, marginBottom: 10,
        background: running ? "#dc2626" : A, color: "#fff",
      }}>
        {running ? t(E, "⏹ Stop", "⏹ 중지") : t(E, "▶ Run greedy", "▶ 그리디 실행")}
      </button>

      {running && (
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: C.dim, fontWeight: 700, marginBottom: 4 }}>
            <span>{t(E, "trying", "시도")}: <span style={{ color: A, fontWeight: 700 }}>start = {liveStart}</span></span>
            <span>{t(E, "filled", "채움")}: <span style={{ color: A, fontWeight: 700 }}>{liveStep}</span></span>
          </div>
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {livePerm.map((v, i) => (
              <div key={i} style={{
                minWidth: 28, padding: "2px 6px", borderRadius: 5,
                background: "#ede9fe", border: `1.5px solid ${A}`, color: A,
                fontSize: 11, fontWeight: 600, textAlign: "center",
              }}>{v}</div>
            ))}
          </div>
        </div>
      )}

      {result && result.error && (
        <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px", color: "#7f1d1d", fontSize: 12, fontWeight: 700 }}>
          {result.error}
        </div>
      )}
      {result && result.found && (
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#15803d", marginBottom: 4 }}>
            {t(E, `✅ Found at start = ${result.start} (${fmtTime(result.elapsed)})`, `✅ 시작값 = ${result.start} 에서 성공 (${fmtTime(result.elapsed)})`)}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: A }}>
            perm = [{result.perm.join(", ")}]
          </div>
        </div>
      )}
      {result && result.found === false && !result.stopped && (
        <div style={{ background: "#fef2f2", border: "1px solid #dc2626", borderRadius: 10, padding: "10px 12px", color: "#7f1d1d", fontSize: 13, fontWeight: 700 }}>
          {t(E, `❌ No valid permutation. Output: -1 (${fmtTime(result.elapsed)})`, `❌ 유효한 순열 없음. 출력: -1 (${fmtTime(result.elapsed)})`)}
        </div>
      )}
      {result && result.stopped && (
        <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 12px", color: "#92400e", fontSize: 12, fontWeight: 700 }}>
          {t(E, `⏹ Stopped at start = ${result.lastStart} (${fmtTime(result.elapsed)})`, `⏹ 시작값 = ${result.lastStart} 에서 중지 (${fmtTime(result.elapsed)})`)}
        </div>
      )}

    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BruteForceEnumerator — step-by-step lex-order brute-force visualizer.
   Shows N=4, h=[2,1,1]. Walks every permutation of 1..4 in lex order,
   runs dismantle on each, color-codes match/no-match. Stops at first
   match — visually proves "first match in lex order = lex-smallest".
   ═══════════════════════════════════════════════════════════════ */
function dismantleJS(p) {
  p = [...p];
  const out = [];
  while (p.length > 1) {
    if (p[0] > p[p.length - 1]) {
      out.push(p[1]);
      p.shift();
    } else {
      out.push(p[p.length - 2]);
      p.pop();
    }
  }
  return out;
}
function lexPermutations(N) {
  const arr = Array.from({ length: N }, (_, i) => i + 1);
  const out = [];
  const recurse = (cur, used) => {
    if (cur.length === N) { out.push([...cur]); return; }
    for (let v = 1; v <= N; v++) {
      if (used[v]) continue;
      used[v] = true; cur.push(v);
      recurse(cur, used);
      cur.pop(); used[v] = false;
    }
  };
  recurse([], Array(N + 1).fill(false));
  return out;
}

export function BruteForceEnumerator({ E }) {
  const N = 4;
  const targetH = [2, 1, 1];
  const allPerms = lexPermutations(N);
  // Find lex-smallest match index so we can highlight stopping point.
  const matchIdx = allPerms.findIndex(p => {
    const d = dismantleJS(p);
    return d.length === targetH.length && d.every((v, i) => v === targetH[i]);
  });

  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(false);
  const timerRef = useRef(null);

  const cur = allPerms[idx];
  const curH = dismantleJS(cur);
  const isMatch = curH.length === targetH.length && curH.every((v, i) => v === targetH[i]);
  const stoppedAtMatch = idx === matchIdx;
  const atEnd = idx === allPerms.length - 1;

  const stopAuto = () => {
    setAuto(false);
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };
  const startAuto = () => {
    if (auto) { stopAuto(); return; }
    setAuto(true);
    const tick = () => {
      setIdx(prev => {
        if (prev >= allPerms.length - 1) { setAuto(false); return prev; }
        const next = prev + 1;
        const d = dismantleJS(allPerms[next]);
        const match = d.length === targetH.length && d.every((v, i) => v === targetH[i]);
        if (match) { setAuto(false); return next; }  // stop on first match
        timerRef.current = setTimeout(tick, 350);
        return next;
      });
    };
    timerRef.current = setTimeout(tick, 350);
  };

  const reset = () => { stopAuto(); setIdx(0); };
  const stepBack = () => { stopAuto(); setIdx(Math.max(0, idx - 1)); };
  const stepFwd = () => { stopAuto(); setIdx(Math.min(allPerms.length - 1, idx + 1)); };
  const jumpToMatch = () => { stopAuto(); if (matchIdx >= 0) setIdx(matchIdx); };

  // h cell render — green if matches target at that index, red if differs.
  const renderHCell = (val, i, target) => {
    const ok = val === target[i];
    return (
      <div key={i} style={{
        width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 6, fontWeight: 700, fontSize: 13, fontFamily: "'JetBrains Mono',monospace",
        background: ok ? "#dcfce7" : "#fee2e2",
        border: `1.5px solid ${ok ? "#16a34a" : "#dc2626"}`,
        color: ok ? "#15803d" : "#991b1b",
      }}>{val}</div>
    );
  };

  return (
    <div style={{ padding: 14 }}>
      <StepHeader
        accent={A}
        idx={idx}
        total={allPerms.length}
        isEn={E}
        title={t(E, "Brute force enumerator: try every permutation in lex order",
                    "브루트포스 시뮬: 모든 순열을 사전순으로 시도")}
        subtitle={t(E, `N=4, target h = [2, 1, 1]. Permutation ${idx + 1} of ${allPerms.length}.`,
                       `N=4, 목표 h = [2, 1, 1]. ${allPerms.length} 개 중 ${idx + 1} 번째.`)}
      />

      {/* Target h */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: C.dim, fontWeight: 600 }}>
          🎯 {t(E, "target h", "목표 h")} =
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {targetH.map((v, i) => (
            <div key={i} style={{
              width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, fontWeight: 700, fontSize: 13, fontFamily: "'JetBrains Mono',monospace",
              background: "#fef3c7", border: "1.5px solid #f59e0b", color: "#92400e",
            }}>{v}</div>
          ))}
        </div>
      </div>

      {/* Current p → dismantle(p) → match? */}
      <div style={{
        background: isMatch ? "#dcfce7" : "#fff",
        border: `2px solid ${isMatch ? "#16a34a" : C.border}`,
        borderRadius: 10, padding: "12px 14px", marginBottom: 10,
        transition: "all .2s",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          {/* p */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, minWidth: 22 }}>p =</span>
            <div style={{ display: "flex", gap: 4 }}>
              {cur.map((v, i) => (
                <div key={i} style={{
                  width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 7, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
                  background: "#ede9fe", border: `1.5px solid ${A}`, color: A,
                }}>{v}</div>
              ))}
            </div>
          </div>

          {/* arrow + dismantle result */}
          <div style={{ fontSize: 16, color: C.dim }}>↓ dismantle</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, minWidth: 22 }}>h =</span>
            <div style={{ display: "flex", gap: 4 }}>
              {curH.map((v, i) => renderHCell(v, i, targetH))}
            </div>
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: isMatch ? "#16a34a" : "#9ca3af",
              marginLeft: 6,
            }}>
              {isMatch ? "✓ MATCH" : "✗"}
            </span>
          </div>
        </div>

        {isMatch && (
          <div style={{
            marginTop: 10, paddingTop: 10, borderTop: "1px dashed #86efac",
            fontSize: 12, color: "#15803d", textAlign: "center", lineHeight: 1.5,
          }}>
            🎉 {t(E,
              `First match in lex order — this IS the lex-smallest answer. Output: ${cur.join(" ")}`,
              `사전순으로 처음 일치 — 이게 바로 사전순 최소 답. 출력: ${cur.join(" ")}`)}
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
        <button onClick={stepBack} disabled={idx === 0} style={{
          padding: "5px 12px", borderRadius: 8,
          border: `1.5px solid ${idx === 0 ? "#e5e7eb" : A}`,
          background: idx === 0 ? "#f3f4f6" : "#fff",
          color: idx === 0 ? "#9ca3af" : A,
          fontWeight: 700, fontSize: 12, cursor: idx === 0 ? "default" : "pointer",
        }}>← {t(E, "prev", "이전")}</button>
        <button onClick={startAuto} disabled={atEnd || stoppedAtMatch} style={{
          padding: "5px 14px", borderRadius: 8, border: "none",
          background: auto ? "#dc2626" : ((atEnd || stoppedAtMatch) ? "#e5e7eb" : A),
          color: (atEnd || stoppedAtMatch) && !auto ? "#9ca3af" : "#fff",
          fontWeight: 700, fontSize: 12,
          cursor: (atEnd || stoppedAtMatch) && !auto ? "default" : "pointer",
        }}>
          {auto ? t(E, "⏹ stop", "⏹ 중지") : t(E, "▶ run to first match", "▶ 첫 매칭까지 실행")}
        </button>
        <button onClick={stepFwd} disabled={atEnd} style={{
          padding: "5px 12px", borderRadius: 8,
          border: `1.5px solid ${atEnd ? "#e5e7eb" : A}`,
          background: atEnd ? "#f3f4f6" : "#fff",
          color: atEnd ? "#9ca3af" : A,
          fontWeight: 700, fontSize: 12, cursor: atEnd ? "default" : "pointer",
        }}>{t(E, "next", "다음")} →</button>
        <button onClick={reset} style={{
          padding: "5px 10px", borderRadius: 8,
          border: `1.5px solid ${C.border}`, background: "#fff", color: C.dim,
          fontWeight: 700, fontSize: 12, cursor: "pointer",
        }}>↺ {t(E, "reset", "처음")}</button>
        {matchIdx >= 0 && (
          <button onClick={jumpToMatch} style={{
            padding: "5px 10px", borderRadius: 8,
            border: "1.5px solid #16a34a", background: "#dcfce7", color: "#15803d",
            fontWeight: 700, fontSize: 12, cursor: "pointer",
          }}>⤳ {t(E, "jump to match", "매칭으로 이동")}</button>
        )}
      </div>

      {/* Mini progress bar showing all 24 attempts at a glance */}
      <div style={{ display: "flex", gap: 2, justifyContent: "center", marginTop: 6, flexWrap: "wrap" }}>
        {allPerms.map((p, i) => {
          const d = dismantleJS(p);
          const m = d.length === targetH.length && d.every((v, k) => v === targetH[k]);
          const visited = i <= idx;
          return (
            <div key={i}
              onClick={() => { stopAuto(); setIdx(i); }}
              title={`p = [${p.join(",")}] → h = [${d.join(",")}]`}
              style={{
                width: 14, height: 14, borderRadius: 3, cursor: "pointer",
                background: i === idx ? A : (visited ? (m ? "#16a34a" : "#cbd5e1") : "#f1f5f9"),
                border: m ? "1.5px solid #16a34a" : `1px solid ${i === idx ? A : "#e5e7eb"}`,
                transition: "all .15s",
              }} />
          );
        })}
      </div>
      <div style={{ fontSize: 10, color: C.dim, textAlign: "center", marginTop: 4, fontStyle: "italic" }}>
        {t(E, "(each square = one permutation in lex order; green = match, hover for details)",
              "(네모 1 개 = 사전순 1 개 순열; 초록 = 일치, 마우스 올리면 상세)")}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   getPermSections — 단계별 코드 + Python/C++ + reasoning
   ═══════════════════════════════════════════════════════════════ */

const PERM_INPUT_PY = [
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
];
const PERM_INPUT_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N;",
  "        cin >> N;",
  "        vector<int> h;",
  "        for (int i = 0; i < N - 1; i++) {",
  "            int x;",
  "            cin >> x;",
  "            h.push_back(x);",
  "        }",
];

/* Section 2: dismantle as a regular function (no lambda) */
const PERM_DISMANTLE_PY = [
  "def dismantle(p):",
  "    p = list(p)",
  "    out = []",
  "    while len(p) > 1:",
  "        if p[0] > p[-1]:",
  "            out.append(p[1])",
  "            p.pop(0)",
  "        else:",
  "            out.append(p[-2])",
  "            p.pop()",
  "    return out",
];
const PERM_DISMANTLE_CPP = [
  "// dismantle: simulate the deletion process and return the hint sequence.",
  "vector<int> dismantle(vector<int> p) {",
  "    vector<int> out;",
  "    while ((int)p.size() > 1) {",
  "        int sz = (int)p.size();",
  "        if (p[0] > p[sz - 1]) {",
  "            out.push_back(p[1]);",
  "            // remove p[0] by shifting left",
  "            for (int i = 0; i < sz - 1; i++) {",
  "                p[i] = p[i + 1];",
  "            }",
  "            p.pop_back();",
  "        } else {",
  "            out.push_back(p[sz - 2]);",
  "            p.pop_back();",
  "        }",
  "    }",
  "    return out;",
  "}",
];

/* Section 3: try every permutation via recursion (no itertools / no next_permutation) */
const PERM_TRY_PY = [
  "def search(p, used, idx, N, h):",
  "    if idx == N:",
  "        if dismantle(p) == h:",
  "            print(' '.join(map(str, p)))",
  "            return True",
  "        return False",
  "    for v in range(1, N + 1):",
  "        if used[v]:",
  "            continue",
  "        p[idx] = v",
  "        used[v] = True",
  "        if search(p, used, idx + 1, N, h):",
  "            return True",
  "        used[v] = False",
  "    return False",
  "",
  "    p = [0] * N",
  "    used = [False] * (N + 1)",
  "    if not search(p, used, 0, N, h):",
  "        print(-1)",
];
const PERM_TRY_CPP = [
  "// Compare two int vectors element-by-element.",
  "bool same(vector<int> a, vector<int> b) {",
  "    if ((int)a.size() != (int)b.size()) {",
  "        return false;",
  "    }",
  "    for (int i = 0; i < (int)a.size(); i++) {",
  "        if (a[i] != b[i]) {",
  "            return false;",
  "        }",
  "    }",
  "    return true;",
  "}",
  "",
  "// Recursively try every permutation of 1..N. First match wins.",
  "// p, used, h declared as globals for simplicity.",
  "int N;",
  "vector<int> p, h;",
  "vector<bool> used;",
  "",
  "bool search(int idx) {",
  "    if (idx == N) {",
  "        if (same(dismantle(p), h)) {",
  "            for (int i = 0; i < N; i++) {",
  "                cout << p[i];",
  "                if (i < N - 1) {",
  "                    cout << ' ';",
  "                }",
  "            }",
  "            cout << endl;",
  "            return true;",
  "        }",
  "        return false;",
  "    }",
  "    for (int v = 1; v <= N; v++) {",
  "        if (used[v]) {",
  "            continue;",
  "        }",
  "        p[idx] = v;",
  "        used[v] = true;",
  "        if (search(idx + 1)) {",
  "            return true;",
  "        }",
  "        used[v] = false;",
  "    }",
  "    return false;",
  "}",
  "",
  "// (back inside main, after reading h:)",
  "        p = vector<int>(N, 0);",
  "        used = vector<bool>(N + 1, false);",
  "        if (!search(0)) {",
  "            cout << -1 << endl;",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

// Combined full solution (used for code-section Full + Desktop extraction)
const PERM_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "// dismantle: simulate the deletion process and return the hint sequence.",
  "vector<int> dismantle(vector<int> p) {",
  "    vector<int> out;",
  "    while ((int)p.size() > 1) {",
  "        int sz = (int)p.size();",
  "        if (p[0] > p[sz - 1]) {",
  "            out.push_back(p[1]);",
  "            for (int i = 0; i < sz - 1; i++) {",
  "                p[i] = p[i + 1];",
  "            }",
  "            p.pop_back();",
  "        } else {",
  "            out.push_back(p[sz - 2]);",
  "            p.pop_back();",
  "        }",
  "    }",
  "    return out;",
  "}",
  "",
  "// Compare two int vectors element-by-element.",
  "bool same(vector<int> a, vector<int> b) {",
  "    if ((int)a.size() != (int)b.size()) {",
  "        return false;",
  "    }",
  "    for (int i = 0; i < (int)a.size(); i++) {",
  "        if (a[i] != b[i]) {",
  "            return false;",
  "        }",
  "    }",
  "    return true;",
  "}",
  "",
  "// Globals so the recursion is simple.",
  "int N;",
  "vector<int> p, h;",
  "vector<bool> used;",
  "",
  "bool search(int idx) {",
  "    if (idx == N) {",
  "        if (same(dismantle(p), h)) {",
  "            for (int i = 0; i < N; i++) {",
  "                cout << p[i];",
  "                if (i < N - 1) {",
  "                    cout << ' ';",
  "                }",
  "            }",
  "            cout << endl;",
  "            return true;",
  "        }",
  "        return false;",
  "    }",
  "    for (int v = 1; v <= N; v++) {",
  "        if (used[v]) {",
  "            continue;",
  "        }",
  "        p[idx] = v;",
  "        used[v] = true;",
  "        if (search(idx + 1)) {",
  "            return true;",
  "        }",
  "        used[v] = false;",
  "    }",
  "    return false;",
  "}",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        cin >> N;",
  "        h.assign(N - 1, 0);",
  "        for (int i = 0; i < N - 1; i++) {",
  "            cin >> h[i];",
  "        }",
  "        p.assign(N, 0);",
  "        used.assign(N + 1, false);",
  "        if (!search(0)) {",
  "            cout << -1 << endl;",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

export function getPermSections(E) {
  return [
    {
      label: t(E, "📦 1. Read input", "📦 1. 입력 받기"),
      color: A,
      py: PERM_INPUT_PY, cpp: PERM_INPUT_CPP,
      why: [
        t(E, "T cases. Each: read N, then N−1 hints into h.",
              "T 케이스. 각각 N 읽고, N−1 개 힌트를 h 로."),
      ],
      pyOnly: [
        t(E, "permutations() yields every permutation of 1..N in lex order.",
              "permutations() 가 1..N 의 모든 순열을 사전순으로 줘요."),
      ],
      cppOnly: [
        t(E, "next_permutation() (used in step 3) walks lex order — same idea.",
              "next_permutation() (3 단계에서 사용) 이 사전순으로 돌아요 — 같은 아이디어."),
      ],
    },
    {
      label: t(E, "🔁 2. Helper — simulate Nhoj's process", "🔁 2. 헬퍼 — Nhoj 과정 시뮬레이션"),
      color: "#7c3aed",
      py: PERM_DISMANTLE_PY, cpp: PERM_DISMANTLE_CPP,
      why: [
        t(E, "Given a permutation p, run Nhoj's rule until 1 element remains. Return the list of hints written.",
              "순열 p 를 받아서, 원소 1 개 남을 때까지 Nhoj 규칙 적용. 적힌 힌트 리스트 반환."),
      ],
    },
    {
      label: t(E, "🎯 3. Try every permutation, print the first match", "🎯 3. 모든 순열 시도, 처음 일치하는 거 출력"),
      color: "#16a34a",
      py: PERM_TRY_PY, cpp: PERM_TRY_CPP,
      why: [
        t(E, "Lex order means the FIRST match is automatically the lex-smallest answer.",
              "사전순으로 도니까 처음 일치하는 게 자동으로 사전순 최소."),
        t(E, "No match across all N! permutations → Nhoj messed up → print −1.",
              "N! 개 다 돌려도 일치 없음 → Nhoj 가 실수 → −1 출력."),
      ],
    },
  ];
}
/* ProgressiveCode — vertical stack pattern */
export function PermProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#7c5cfc" />;
}
/* PDF — comprehensive study guide */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","join"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min"];

function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
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
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadPermPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "FJ's Fav Permutation — Full Study Guide", "🔢 FJ의 좋아하는 순열 — 종합 풀이 노트");
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
<div class="sub">USACO 2024 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>

<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "Farmer John has a permutation p of 1..N. Farmer Nhoj dismantles p step by step: while p has >1 element, if p[0] > p[-1] write p[1] and remove p[0]; otherwise write p[-2] and remove p[-1]. After N-1 steps Nhoj has written N-1 hints h. Given h, recover the lexicographically smallest p, or output -1.",
  "Farmer John 에게 1..N 순열 p 가 있어요. Farmer Nhoj 가 p 를 한 단계씩 분해: p 에 원소 >1 인 동안, p[0] > p[-1] 이면 p[1] 적고 p[0] 제거; 아니면 p[-2] 적고 p[-1] 제거. N-1 단계 후 N-1 개 힌트 h. h 를 주면 사전순 최소 p 복원 (불가능하면 -1).")}</p>

<h3>${t(E, "Sample I/O", "예제")}</h3>
<table>
  <tr><th>${t(E, "Input", "입력")}</th><th>${t(E, "Output", "출력")}</th></tr>
  <tr><td><pre style="margin:0;background:#0f172a;color:#f8fafc;font-size:11px;">2
4
2 1 1
4
3 2 1</pre></td><td><pre style="margin:0;background:#0f172a;color:#f8fafc;font-size:11px;">3 1 2 4
1 2 3 4</pre></td></tr>
</table>

<h2>2. ${t(E, "Approach: Brute force search", "접근: 브루트포스 탐색")}</h2>
<div class="box ok">
  <b>💡 ${t(E, "Key insight", "핵심 통찰")}</b>:
  ${t(E, "Inverting Nhoj's rule directly is hard. But we can simulate it forward: try every permutation of 1..N in lex order, dismantle each, and stop at the first p whose dismantle equals h. The FIRST match in lex order is automatically the lex-smallest answer.",
        "Nhoj 규칙을 거꾸로 푸는 건 어려움. 정방향 시뮬: 1..N 의 모든 순열을 사전순으로 시도, 각 dismantle 결과를 h 와 비교, 처음 일치하는 p 가 답. 사전순으로 가니까 자동으로 사전순 최소.")}
</div>

<div class="box">
  <b>${t(E, "Time complexity", "시간복잡도")}:</b>
  ${t(E, "O(N! · N) per test case — N! permutations × O(N) per dismantle. Bronze tests typically use small N for this kind of brute force.",
        "테스트당 O(N! · N) — N! 순열 × dismantle 당 O(N). Bronze 는 보통 작은 N 으로 brute force 가능.")}
</div>

<h2>3. ${t(E, "Solution Code (3 sections + full)", "최적 코드 (3 섹션 + 전체)")}</h2>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why">
    <b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b>
    <ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
  </div>
  ${sectionCode(s)}
`).join("")}

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">
  © Coderin · 코드린 · ${t(E, "Generated for offline study", "오프라인 학습용")}
</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
