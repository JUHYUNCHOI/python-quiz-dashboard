import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";

const A = "#f97316";
const ABg = "#fff7ed";
const ABd = "#fdba74";

/* Candy color map */
const CC = { 1: "#f97316", 2: "#a855f7", 3: "#22c55e" };
const CN_EN = { 1: "Orange", 2: "Purple", 3: "Green" };
const CN_KO = { 1: "주황", 2: "보라", 3: "초록" };

/* Sample packs from the problem */
const SAMPLE = [
  [1, 2], [1, 3], [2, 1], [1, 1], [2, 2],
  [1, 3], [3, 1], [1, 1], [1, 1],
];

/* Normalized packs (min, max) */
const NORM = SAMPLE.map(([a, b]) => [Math.min(a, b), Math.max(a, b)]);

/* All color pairs for sample */
const PAIRS = [[1, 2], [1, 3], [2, 3]];

/* Candy circle */
const Candy = ({ color, label, size = 24 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: CC[color] || "#9ca3af",
    border: `2px solid ${CC[color] || "#9ca3af"}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.42, fontWeight: 900, color: "#fff",
    flexShrink: 0,
  }}>{label ?? color}</div>
);

/* Pack card */
const PackCard = ({ a, b, idx, selected, onClick, dim, small }) => {
  const sz = small ? 18 : 22;
  return (
    <button onClick={onClick} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      padding: small ? "4px 6px" : "6px 8px", borderRadius: 10, cursor: onClick ? "pointer" : "default",
      background: dim ? "#f1f5f9" : selected ? ABg : "#fff",
      border: `2px solid ${dim ? "#e2e4ec" : selected ? A : C.border}`,
      opacity: dim ? 0.35 : 1,
      transform: selected ? "scale(1.06)" : "scale(1)",
      boxShadow: selected ? `0 0 10px ${A}44` : "none",
      transition: "all .2s",
      minWidth: small ? 40 : 48,
    }}>
      <div style={{ display: "flex", gap: 3 }}>
        <Candy color={a} size={sz} />
        <Candy color={b} size={sz} />
      </div>
      {idx != null && (
        <div style={{ fontSize: 9, fontWeight: 700, color: dim ? "#cbd5e1" : C.dim, fontFamily: "'JetBrains Mono',monospace" }}>#{idx + 1}</div>
      )}
    </button>
  );
};


/* ═══════════════════════════════════════════════════════════════
   PackTypeClassifier — Classify packs by color pair
   ═══════════════════════════════════════════════════════════════ */
export function PackTypeClassifier({ E }) {
  const [pairIdx, setPairIdx] = useState(0);
  const [revealCount, setRevealCount] = useState(99);
  const [formulaVisible, setFormulaVisible] = useState(true);
  const revealTimer = useRef(null);
  const [x, y] = PAIRS[pairIdx];

  const switchPair = (idx) => {
    setPairIdx(idx);
    setRevealCount(0);
    setFormulaVisible(false);
    if (revealTimer.current) clearInterval(revealTimer.current);
    let count = 0;
    revealTimer.current = setInterval(() => {
      count++;
      setRevealCount(count);
      if (count >= SAMPLE.length) {
        clearInterval(revealTimer.current);
        revealTimer.current = null;
        setTimeout(() => setFormulaVisible(true), 150);
      }
    }, 60);
  };

  useEffect(() => () => { if (revealTimer.current) clearInterval(revealTimer.current); }, []);

  const classify = (na, nb) => {
    if (na === x && nb === x) return "A";
    if (na === y && nb === y) return "B";
    if ((na === x && nb === y) || (na === y && nb === x)) return "C";
    return null;
  };

  const groups = { A: [], B: [], C: [], none: [] };
  let globalIdx = 0;
  SAMPLE.forEach(([a, b], i) => {
    const tp = classify(a, b);
    const entry = { a, b, i, seqIdx: globalIdx++ };
    (groups[tp] || groups.none).push(entry);
  });

  const countA = groups.A.length, countB = groups.B.length, countC = groups.C.length;
  const case1 = countA * countB * countC;
  const case2 = countC >= 3 ? countC * (countC - 1) * (countC - 2) / 6 : 0;

  const TypeCol = ({ label, color, bg, bd, items, count }) => (
    <div style={{ flex: 1, minWidth: 80 }}>
      <div style={{
        textAlign: "center", fontSize: 11, fontWeight: 900, color,
        marginBottom: 4,
      }}>{label}</div>
      <div style={{
        background: bg, border: `2px solid ${bd}`, borderRadius: 10,
        padding: "6px 4px", minHeight: 70, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 4,
      }}>
        {items.map((p, i) => {
          const visible = p.seqIdx < revealCount;
          const isNew = p.seqIdx === revealCount - 1;
          return (
            <div key={i} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? (isNew ? "scale(1.12)" : "scale(1)") : "scale(0.7)",
              transition: "all .2s ease",
              boxShadow: isNew ? `0 0 12px ${color}66` : "none",
              borderRadius: 10,
            }}>
              <PackCard a={p.a} b={p.b} idx={p.i} small />
            </div>
          );
        })}
        {items.length === 0 && <div style={{ fontSize: 10, color: C.dim, padding: 8 }}>—</div>}
      </div>
      <div style={{
        textAlign: "center", marginTop: 4, fontSize: 14, fontWeight: 900,
        color, fontFamily: "'JetBrains Mono',monospace",
        opacity: formulaVisible ? 1 : 0, transition: "opacity .3s",
      }}>{count}</div>
    </div>
  );

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* Pair selector */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
        {PAIRS.map((p, i) => (
          <button key={i} onClick={() => switchPair(i)} style={{
            padding: "5px 10px", borderRadius: 8, fontSize: 12, fontWeight: 800,
            border: `2px solid ${i === pairIdx ? A : C.border}`,
            background: i === pairIdx ? ABg : "#fff",
            color: i === pairIdx ? A : C.dim, cursor: "pointer",
            fontFamily: "'JetBrains Mono',monospace",
          }}>({p[0]},{p[1]})</button>
        ))}
      </div>

      {/* Color legend */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Candy color={x} size={18} label="x" />
          <span style={{ fontSize: 11, fontWeight: 700, color: CC[x] }}>x={x}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Candy color={y} size={18} label="y" />
          <span style={{ fontSize: 11, fontWeight: 700, color: CC[y] }}>y={y}</span>
        </div>
      </div>

      {/* Three columns */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <TypeCol label={`A (${x},${x})`} color={CC[x]} bg={ABg} bd={ABd} items={groups.A} count={countA} />
        <TypeCol label={`B (${y},${y})`} color={CC[y]} bg="#faf5ff" bd="#d8b4fe" items={groups.B} count={countB} />
        <TypeCol label="C (mix)" color="#059669" bg="#ecfdf5" bd="#6ee7b7" items={groups.C} count={countC} />
      </div>

      {/* Ignored packs */}
      {groups.none.length > 0 && (
        <div style={{ textAlign: "center", fontSize: 10, color: C.dim, marginBottom: 6 }}>
          {E ? `${groups.none.length} bag(s) don't use colors ${x} or ${y}` : `${groups.none.length}개 봉지는 색 ${x}, ${y}와 관련 없음`}
        </div>
      )}

      {/* Formula result */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "8px 10px",
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
        color: "#e2e8f0", lineHeight: 2, textAlign: "center",
        opacity: formulaVisible ? 1 : 0,
        transform: formulaVisible ? "translateY(0)" : "translateY(8px)",
        transition: "all .4s ease",
      }}>
        <div>Case1: {countA}×{countB}×{countC} = <span style={{ color: "#fdba74", fontWeight: 900 }}>{case1}</span></div>
        <div>Case2: C({countC},3) = <span style={{ color: "#d8b4fe", fontWeight: 900 }}>{case2}</span></div>
        <div style={{ borderTop: "1px solid #334155", marginTop: 4, paddingTop: 4 }}>
          {t(E, "Subtotal", "이 쌍")}: <span style={{ color: "#fbbf24", fontWeight: 900, fontSize: 15 }}>{case1 + case2}</span>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   PackPickerSim — Pick 3 packs, see if valid
   ═══════════════════════════════════════════════════════════════ */

const VALID_PRESETS = [
  [0, 3, 4], [0, 4, 7], [0, 4, 8], [1, 5, 6], [2, 3, 4], [2, 4, 7], [2, 4, 8],
];

export function PackPickerSim({ E }) {
  const [sel, setSel] = useState(new Set());
  const [foundCount, setFoundCount] = useState(0);

  const toggle = (i) => {
    setSel(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else if (next.size < 3) next.add(i);
      return next;
    });
  };

  const selArr = [...sel].sort((a, b) => a - b);
  const candies = selArr.flatMap(i => SAMPLE[i]);
  const colorCount = {};
  candies.forEach(c => { colorCount[c] = (colorCount[c] || 0) + 1; });
  const distinctColors = Object.keys(colorCount);
  const isValid = sel.size === 3 && distinctColors.length === 2 &&
    Object.values(colorCount).every(v => v === 3);

  const loadPreset = (preset) => {
    setSel(new Set(preset));
  };

  const reason = () => {
    if (sel.size < 3) return null;
    if (distinctColors.length !== 2) return E ? `${distinctColors.length} colors (need exactly 2)` : `색이 ${distinctColors.length}가지야 (2가지여야 해)`;
    const vals = Object.values(colorCount);
    if (!vals.every(v => v === 3)) return E ? `Not 3+3: ${vals.join("+")}` : `3+3이 안 돼: ${vals.join("+")}`;
    return null;
  };

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* Pack grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 10 }}>
        {SAMPLE.map(([a, b], i) => (
          <PackCard key={i} a={a} b={b} idx={i} selected={sel.has(i)}
            onClick={() => toggle(i)} />
        ))}
      </div>

      {/* Selection count */}
      <div style={{ textAlign: "center", fontSize: 12, color: C.dim, fontWeight: 700, marginBottom: 6 }}>
        {t(E, "Picked", "고른 봉지")}: {sel.size}/3
      </div>

      {/* Analysis (when 3 selected) */}
      {sel.size === 3 && (
        <div style={{
          background: isValid ? "#ecfdf5" : "#fee2e2",
          border: `2px solid ${isValid ? "#6ee7b7" : "#fca5a5"}`,
          borderRadius: 12, padding: 10, marginBottom: 8,
          animation: "tricksPopIn .3s ease",
        }}>
          <style>{`@keyframes tricksPopIn { 0% { transform: scale(0.85); opacity: 0; } 60% { transform: scale(1.04); } 100% { transform: scale(1); opacity: 1; } }`}</style>
          {/* Color distribution */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 6 }}>
            {Object.entries(colorCount).map(([color, cnt]) => (
              <div key={color} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Candy color={Number(color)} size={20} />
                <span style={{ fontSize: 14, fontWeight: 900, color: CC[Number(color)], fontFamily: "'JetBrains Mono',monospace" }}>×{cnt}</span>
              </div>
            ))}
          </div>
          {/* Verdict */}
          <div style={{
            textAlign: "center", fontSize: 13, fontWeight: 900,
            color: isValid ? "#059669" : "#dc2626",
          }}>
            {isValid
              ? (E ? "✅ Success! 2 colors × 3 each" : "✅ 성공! 2가지 색 × 3개씩")
              : `❌ ${reason()}`}
          </div>
        </div>
      )}

      {/* Presets */}
      <div style={{ textAlign: "center", fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
        {t(E, "Try winning combos:", "성공하는 조합 해보기:")}
      </div>
      <div style={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
        {VALID_PRESETS.slice(0, 4).map((p, i) => (
          <button key={i} onClick={() => loadPreset(p)} style={{
            padding: "3px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
            border: `1.5px solid ${C.border}`, background: "#fff",
            color: C.dim, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{`{${p.map(x => x + 1).join(",")}}`}</button>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ColorPairCounter — Step through all pairs
   ═══════════════════════════════════════════════════════════════ */

function computePairData() {
  // Build pair_count from normalized packs
  const pc = {};
  NORM.forEach(([a, b]) => {
    const k = `${a},${b}`;
    pc[k] = (pc[k] || 0) + 1;
  });

  const results = [];
  for (const [x, y] of PAIRS) {
    const cA = pc[`${x},${x}`] || 0;
    const cB = pc[`${y},${y}`] || 0;
    const cC = pc[`${x},${y}`] || 0;
    const case1 = cA * cB * cC;
    const case2 = cC >= 3 ? cC * (cC - 1) * (cC - 2) / 6 : 0;
    results.push({ x, y, cA, cB, cC, case1, case2, sub: case1 + case2 });
  }
  return results;
}

const PAIR_DATA = computePairData();
const TOTAL_ANSWER = PAIR_DATA.reduce((s, d) => s + d.sub, 0);

export function ColorPairCounter({ E }) {
  const [pairIdx, setPairIdx] = useState(-1); // -1 = not started
  const [subStep, setSubStep] = useState(0); // 0=A, 1=B, 2=C, 3=formula, 4=done with pair
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);
  const subTimer = useRef(null);

  const done = pairIdx >= PAIRS.length;
  const curPair = pairIdx >= 0 && pairIdx < PAIRS.length ? PAIR_DATA[pairIdx] : null;
  const completedPairs = done ? PAIRS.length : (subStep >= 4 ? pairIdx + 1 : pairIdx);
  const runningTotal = PAIR_DATA.slice(0, Math.min(completedPairs, PAIRS.length))
    .reduce((s, d) => s + d.sub, 0);

  const stopAnim = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  const stopSub = () => { if (subTimer.current) { clearTimeout(subTimer.current); subTimer.current = null; } };
  useEffect(() => () => { stopAnim(); stopSub(); }, []);

  // Auto-advance sub-steps when entering a new pair
  const startSubReveal = () => {
    setSubStep(0);
    stopSub();
    let s = 0;
    const advance = () => {
      s++;
      setSubStep(s);
      if (s < 4) {
        subTimer.current = setTimeout(advance, 350);
      }
    };
    subTimer.current = setTimeout(advance, 350);
  };

  const next = () => {
    stopSub();
    if (subStep < 4 && pairIdx >= 0 && pairIdx < PAIRS.length) {
      // Skip to full reveal of current pair
      setSubStep(4);
      return;
    }
    if (pairIdx < PAIRS.length) {
      setPairIdx(p => p + 1);
      if (pairIdx + 1 < PAIRS.length) {
        startSubReveal();
      }
    }
  };

  const autoPlay = () => {
    if (playing) { setPlaying(false); stopAnim(); stopSub(); return; }
    setPlaying(true);
    setPairIdx(-1);
    setSubStep(0);
    let idx = -1;
    timerRef.current = setInterval(() => {
      idx++;
      if (idx > PAIRS.length) { stopAnim(); setPlaying(false); return; }
      setPairIdx(idx);
      if (idx < PAIRS.length) {
        // Auto sub-step reveal
        let s = 0;
        setSubStep(0);
        const subAdv = () => {
          s++;
          setSubStep(s);
          if (s < 4) subTimer.current = setTimeout(subAdv, 250);
        };
        subTimer.current = setTimeout(subAdv, 250);
      }
    }, 1500);
  };

  const reset = () => { setPairIdx(-1); setSubStep(0); setPlaying(false); stopAnim(); stopSub(); };

  // Value reveal helper
  const ValReveal = ({ label, value, color, visible, isFlash }) => (
    <span style={{
      opacity: visible ? 1 : 0.15,
      display: "inline-block",
      transform: isFlash ? "scale(1.2)" : "scale(1)",
      transition: "all .25s ease",
    }}>
      {label} = <span style={{ color, fontWeight: 900, textShadow: isFlash ? `0 0 8px ${color}88` : "none" }}>{value}</span>
    </span>
  );

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* Pair tabs */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
        {PAIRS.map((p, i) => {
          const active = i === pairIdx;
          const passed = i < pairIdx || (i === pairIdx && subStep >= 4);
          return (
            <div key={i} style={{
              padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 800,
              border: `2px solid ${active && !passed ? A : passed ? "#6ee7b7" : C.border}`,
              background: active && !passed ? ABg : passed ? "#ecfdf5" : "#fff",
              color: active && !passed ? A : passed ? "#059669" : C.dim,
              fontFamily: "'JetBrains Mono',monospace",
              transition: "all .3s",
            }}>({p[0]},{p[1]}) {passed && i < pairIdx ? "✓" : ""}</div>
          );
        })}
      </div>

      {/* Current pair detail — with sequential reveal */}
      {curPair && !done && (
        <div style={{
          background: "#1e293b", borderRadius: 10, padding: "10px 12px",
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
          color: "#e2e8f0", lineHeight: 2.2, marginBottom: 8,
        }}>
          <div style={{ color: "#94a3b8" }}>{t(E, "Pair", "색 쌍")} ({curPair.x},{curPair.y}):</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <ValReveal label="A" value={curPair.cA} color={CC[curPair.x]} visible={subStep >= 1} isFlash={subStep === 1} />
            <ValReveal label="B" value={curPair.cB} color={CC[curPair.y]} visible={subStep >= 2} isFlash={subStep === 2} />
            <ValReveal label="C" value={curPair.cC} color="#6ee7b7" visible={subStep >= 3} isFlash={subStep === 3} />
          </div>
          <div style={{ opacity: subStep >= 4 ? 1 : 0.1, transition: "opacity .3s" }}>
            <div>Case1: {curPair.cA}×{curPair.cB}×{curPair.cC} = <span style={{ color: "#fdba74", fontWeight: 900 }}>{curPair.case1}</span></div>
            <div>Case2: C({curPair.cC},3) = <span style={{ color: "#d8b4fe", fontWeight: 900 }}>{curPair.case2}</span></div>
          </div>
          <div style={{
            borderTop: "1px solid #334155", marginTop: 4, paddingTop: 4,
            color: "#fbbf24", fontWeight: 900,
            opacity: subStep >= 4 ? 1 : 0.1, transition: "opacity .3s",
          }}>
            +{curPair.sub} → {t(E, "total so far", "지금까지")} = {runningTotal + (subStep >= 4 ? curPair.sub : 0)}
          </div>
        </div>
      )}

      {/* Done */}
      {done && (
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
            {t(E, "All pairs checked!", "모든 색 쌍 확인 완료!")}
          </div>
          <div style={{
            display: "inline-block", padding: "8px 28px", borderRadius: 12,
            background: `linear-gradient(135deg,#ea580c,${A})`,
            fontSize: 28, fontWeight: 900, color: "#fff",
            fontFamily: "'JetBrains Mono',monospace",
            boxShadow: "0 4px 16px rgba(249,115,22,.3)",
            animation: "tricksPopIn .4s ease",
          }}>{TOTAL_ANSWER}</div>
          <style>{`@keyframes tricksPopIn { 0% { transform: scale(0.85); opacity: 0; } 60% { transform: scale(1.06); } 100% { transform: scale(1); opacity: 1; } }`}</style>
        </div>
      )}

      {/* Not started */}
      {pairIdx < 0 && (
        <div style={{ textAlign: "center", fontSize: 12, color: C.dim, marginBottom: 8 }}>
          {t(E, "Press ▶ to check color pairs!", "▶ 눌러서 색 쌍 확인 시작!")}
        </div>
      )}

      {/* Running total bar */}
      {pairIdx >= 0 && !done && (
        <div style={{
          textAlign: "center", marginBottom: 8, fontSize: 13, fontWeight: 900,
          color: A, fontFamily: "'JetBrains Mono',monospace",
        }}>
          {t(E, "Total so far", "현재 합계")}: {runningTotal}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {!done ? (
          <>
            <button onClick={next} disabled={playing} style={{
              padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 900,
              border: "none", cursor: playing ? "default" : "pointer",
              color: "#fff", opacity: playing ? 0.5 : 1,
              background: `linear-gradient(135deg,#ea580c,${A})`,
              boxShadow: "0 3px 12px rgba(249,115,22,.3)",
            }}>▶ {t(E, "Next pair", "다음 쌍")}</button>
            <button onClick={autoPlay} style={{
              padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 900,
              border: `2px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
            }}>{playing ? "⏸" : "⏭"} {t(E, playing ? "Pause" : "Auto", playing ? "정지" : "자동")}</button>
          </>
        ) : (
          <button onClick={reset} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 900,
            border: `2px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {t(E, "Restart", "처음부터")}</button>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   TricksFormulaTrace — Step-by-step formula trace
   ═══════════════════════════════════════════════════════════════ */
export function TricksFormulaTrace({ E }) {
  const [step, setStep] = useState(0);

  // Steps: 0=init, then for each pair: show A,B,C → case1 → case2 → subtotal
  // 3 pairs × 2 sub-steps each + 1 final = 7 steps total
  // Simplify: one step per pair + final
  const maxSteps = PAIRS.length + 1; // 0..3 (3 pairs + done)

  const next = () => { if (step < maxSteps) setStep(s => s + 1); };
  const reset = () => setStep(0);

  const runningTotal = PAIR_DATA.slice(0, step).reduce((s, d) => s + d.sub, 0);

  return (
    <div style={{ padding: "10px 8px" }}>
      {/* pair_count display */}
      <div style={{
        background: ABg, borderRadius: 10, padding: "6px 10px",
        border: `2px solid ${ABd}`, marginBottom: 8, textAlign: "center",
        fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.text,
      }}>
        pair_count: {"{"} (1,1):3, (1,2):2, (1,3):2, (2,2):1 {"}"}
      </div>

      {/* Computation steps */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "10px 12px",
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
        lineHeight: 2.2, color: "#e2e8f0", marginBottom: 8,
      }}>
        {PAIR_DATA.map((d, i) => {
          const visible = step > i;
          const isCurrent = step === i + 1;
          return (
            <div key={i} style={{
              opacity: visible ? 1 : 0.15,
              background: isCurrent ? "rgba(249,115,22,.18)" : "transparent",
              borderRadius: 6, padding: "2px 6px",
              transform: isCurrent ? "scale(1.03)" : "scale(1)",
              boxShadow: isCurrent ? "0 0 12px rgba(249,115,22,.2)" : "none",
              transition: "all .35s ease",
            }}>
              <span style={{ color: "#94a3b8" }}>({d.x},{d.y})</span>
              {" A="}<span style={{ color: CC[d.x], fontWeight: 900, textShadow: isCurrent ? `0 0 6px ${CC[d.x]}88` : "none", transition: "text-shadow .3s" }}>{d.cA}</span>
              {" B="}<span style={{ color: CC[d.y], fontWeight: 900, textShadow: isCurrent ? `0 0 6px ${CC[d.y]}88` : "none", transition: "text-shadow .3s" }}>{d.cB}</span>
              {" C="}<span style={{ color: "#6ee7b7", fontWeight: 900, textShadow: isCurrent ? "0 0 6px #6ee7b788" : "none", transition: "text-shadow .3s" }}>{d.cC}</span>
              {" → "}<span style={{ color: "#fdba74" }}>{d.cA}×{d.cB}×{d.cC}={d.case1}</span>
              {" + "}<span style={{ color: "#d8b4fe" }}>C({d.cC},3)={d.case2}</span>
              {" = "}<span style={{ color: "#fbbf24", fontWeight: 900, fontSize: isCurrent ? 15 : 12, transition: "font-size .3s" }}>{d.sub}</span>
            </div>
          );
        })}

        {/* Final answer */}
        <div style={{
          opacity: step > PAIRS.length ? 1 : 0.15,
          borderTop: "1px solid #334155", marginTop: 6, paddingTop: 6,
          textAlign: "center", transition: "all .4s ease",
          transform: step > PAIRS.length ? "scale(1)" : "scale(0.9)",
        }}>
          <span style={{ color: "#94a3b8" }}>{t(E, "answer", "답")} = </span>
          {PAIR_DATA.map((d, i) => (
            <span key={i}>
              {i > 0 && " + "}
              <span style={{ color: "#fbbf24" }}>{d.sub}</span>
            </span>
          ))}
          {" = "}
          <span style={{
            color: "#fbbf24", fontWeight: 900, fontSize: step > PAIRS.length ? 18 : 16,
            textShadow: step > PAIRS.length ? "0 0 12px #fbbf2488" : "none",
            transition: "all .4s ease",
          }}>{TOTAL_ANSWER}</span>
        </div>
      </div>

      {/* Running total */}
      {step > 0 && step <= PAIRS.length && (
        <div style={{
          textAlign: "center", fontSize: 13, fontWeight: 900,
          color: A, fontFamily: "'JetBrains Mono',monospace", marginBottom: 6,
        }}>
          {t(E, "Running total", "지금까지 합계")}: {runningTotal}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {step <= PAIRS.length ? (
          <button onClick={next} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 900,
            border: "none", cursor: "pointer", color: "#fff",
            background: `linear-gradient(135deg,#ea580c,${A})`,
            boxShadow: "0 3px 12px rgba(249,115,22,.3)",
          }}>▶ {t(E, "Next", "다음")}</button>
        ) : (
          <button onClick={reset} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 900,
            border: `2px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {t(E, "Restart", "처음부터")}</button>
        )}
      </div>

      {/* Step counter */}
      <div style={{
        textAlign: "center", marginTop: 4, fontSize: 10, color: C.dim,
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
      }}>
        {step}/{maxSteps}
      </div>
    </div>
  );
}
