import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";

const A = "#d97706";
const ABg = "#fffbeb";
const ABd = "#fbbf24";

const STICK_COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#a855f7", "#f97316"];
const STICK_NAMES_EN = ["Red", "Blue", "Green", "Purple", "Orange"];
const STICK_NAMES_KO = ["빨강", "파랑", "초록", "보라", "주황"];

/* ═══════════════════════════════════════════════════════════════
   FanSimulator — Interactive stick arranger with formula viz
   ═══════════════════════════════════════════════════════════════ */

const PRESETS = [
  { label: "[3,7,2]", counts: [3, 7, 2] },
  { label: "[4]", counts: [4] },
  { label: "[3,3,3]", counts: [3, 3, 3] },
  { label: "[5,1,1]", counts: [5, 1, 1] },
];

/* Build step-by-step greedy placement with reason text */
function buildSimSteps(counts, E) {
  const total = counts.reduce((a, b) => a + b, 0);
  const maxC = Math.max(...counts);
  const rest = total - maxC;
  const answer = Math.min(total, 2 * rest + 1);
  const names = E ? STICK_NAMES_EN : STICK_NAMES_KO;

  const steps = [];
  const remaining = [...counts];
  const placed = [];

  steps.push({ placed: [], remaining: [...remaining], colorIdx: null, reason: null, done: false });

  for (let s = 0; s < answer; s++) {
    let bestI = -1;
    for (let i = 0; i < remaining.length; i++) {
      if (remaining[i] <= 0) continue;
      if (placed.length > 0 && placed[placed.length - 1] === i) continue;
      if (bestI === -1 || remaining[i] > remaining[bestI]) bestI = i;
    }
    if (bestI === -1) break;

    // Build reason string
    const prevI = placed.length > 0 ? placed[placed.length - 1] : null;
    const available = remaining.map((c, i) => ({ c, i }))
      .filter(x => x.c > 0 && x.i !== prevI)
      .sort((a, b) => b.c - a.c);
    let reason;
    if (prevI === null) {
      reason = E
        ? `${names[bestI]} has the most (${remaining[bestI]}) → place first!`
        : `${names[bestI]}이(가) 가장 많아 (${remaining[bestI]}개) → 먼저 배치!`;
    } else if (available.length === 1) {
      reason = E
        ? `Only ${names[bestI]} left (≠ prev ${names[prevI]}) → place it!`
        : `${names[prevI]} 제외하면 ${names[bestI]}만 남음 → 배치!`;
    } else {
      reason = E
        ? `≠ prev ${names[prevI]}, ${names[bestI]} has most (${remaining[bestI]}) → place!`
        : `이전(${names[prevI]}) 제외, ${names[bestI]}이(가) 최다 (${remaining[bestI]}개) → 배치!`;
    }

    placed.push(bestI);
    remaining[bestI]--;
    steps.push({ placed: [...placed], remaining: [...remaining], colorIdx: bestI, reason, done: false });
  }

  const leftover = remaining.reduce((a, b) => a + b, 0);
  steps.push({ placed: [...placed], remaining: [...remaining], colorIdx: null, reason: null, done: true, leftover, total, answer: placed.length });
  return steps;
}

export function FanSimulator({ E }) {
  const [counts, setCounts] = useState([3, 7, 2]);
  const [step, setStep] = useState(0);
  const timerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const total = counts.reduce((a, b) => a + b, 0);
  const maxC = Math.max(...counts);
  const rest = total - maxC;
  const answer = Math.min(total, 2 * rest + 1);
  const allFit = maxC <= rest + 1;

  const allSteps = buildSimSteps(counts, E);
  const cur = Math.min(step, allSteps.length - 1);
  const s = allSteps[cur];
  const maxSteps = allSteps.length;

  const stopAnim = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };

  const resetSim = () => { setStep(0); setPlaying(false); stopAnim(); };

  // Reset when counts change
  const countsKey = counts.join(",");
  const prevKeyRef = useRef(countsKey);
  useEffect(() => {
    if (prevKeyRef.current !== countsKey) { prevKeyRef.current = countsKey; resetSim(); }
  }, [countsKey]);

  useEffect(() => () => stopAnim(), []);

  const nextStep = () => { if (step < maxSteps - 1) setStep(p => p + 1); };

  const autoPlay = () => {
    if (playing) { setPlaying(false); stopAnim(); return; }
    setPlaying(true);
    setStep(0);
    let st = 0;
    timerRef.current = setInterval(() => {
      st++;
      if (st >= maxSteps - 1) { clearInterval(timerRef.current); timerRef.current = null; setPlaying(false); }
      setStep(st);
    }, 400);
  };

  const loadPreset = (p) => setCounts([...p.counts]);
  const adjustCount = (idx, delta) => { const nc = [...counts]; nc[idx] = Math.max(0, Math.min(20, nc[idx] + delta)); setCounts(nc); };
  const addColor = () => { if (counts.length < 5) setCounts([...counts, 1]); };
  const removeColor = () => { if (counts.length > 1) setCounts(counts.slice(0, -1)); };

  const stickW = 18, stickH = 36, gap = 2;

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* Presets */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {PRESETS.map((p, i) => (
          <button key={i} onClick={() => loadPreset(p)} style={{
            padding: "4px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
            border: `1.5px solid ${C.border}`, background: C.card,
            color: C.dim, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p.label}</button>
        ))}
      </div>

      {/* Color count adjusters */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        {counts.map((c, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <button onClick={() => adjustCount(i, 1)} style={{
              width: 28, height: 20, borderRadius: 4, border: "none",
              background: STICK_COLORS[i], color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}>+</button>
            <div style={{
              width: 28, height: 28, borderRadius: 6, background: STICK_COLORS[i],
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono',monospace",
            }}>{c}</div>
            <button onClick={() => adjustCount(i, -1)} style={{
              width: 28, height: 20, borderRadius: 4, border: "none",
              background: "#e5e7eb", color: "#6b7280", fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}>−</button>
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {counts.length < 5 && (
            <button onClick={addColor} style={{
              width: 28, height: 24, borderRadius: 4, border: `1.5px dashed ${C.border}`,
              background: "transparent", color: C.dim, fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}>+</button>
          )}
          {counts.length > 1 && (
            <button onClick={removeColor} style={{
              width: 28, height: 24, borderRadius: 4, border: `1.5px dashed #fca5a5`,
              background: "transparent", color: "#dc2626", fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}>−</button>
          )}
        </div>
      </div>

      {/* Formula computation */}
      <div style={{
        background: ABg, borderRadius: 10, padding: 10,
        border: `1px solid ${ABd}`, marginBottom: 10,
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
          fontWeight: 700, color: C.text, lineHeight: 2, textAlign: "center",
        }}>
          total = <span style={{ color: A, fontWeight: 700 }}>{total}</span>
          {" · "}max = <span style={{ color: "#dc2626", fontWeight: 700 }}>{maxC}</span>
          {" · "}rest = <span style={{ color: "#059669", fontWeight: 700 }}>{rest}</span>
          <br />
          min({total}, 2×{rest}+1) = min({total}, {2 * rest + 1}) = <span style={{ fontSize: 16, fontWeight: 700, color: A }}>{answer}</span>
        </div>
        {allFit && <div style={{ fontSize: 11, color: "#059669", fontWeight: 600, textAlign: "center", marginTop: 4 }}>✅ {E ? "All sticks fit!" : "전부 사용 가능!"}</div>}
        {!allFit && <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 600, textAlign: "center", marginTop: 4 }}>⚠️ {E ? `Too many of one color! ${total - answer} left over.` : `한 색이 너무 많아! ${total - answer}개 남음.`}</div>}
      </div>

      {/* Remaining pool */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 6, alignItems: "center" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.dim }}>{E ? "Pool:" : "남은:"}</div>
        {s.remaining.map((cnt, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: STICK_COLORS[i] }} />
            <span style={{
              fontSize: 12, fontWeight: 700, color: cnt > 0 ? STICK_COLORS[i] : "#d1d5db",
              fontFamily: "'JetBrains Mono',monospace", transition: "all .2s",
            }}>{cnt}</span>
          </div>
        ))}
      </div>

      {/* Placement area */}
      <div style={{
        background: C.card, borderRadius: 10, padding: "8px 4px",
        border: `1.5px solid ${s.done ? (allFit ? "#6ee7b7" : "#fca5a5") : C.border}`,
        minHeight: 60, transition: "border-color .3s",
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.dim, textAlign: "center", marginBottom: 6 }}>
          {E ? `Placed: ${s.placed.length}/${total}` : `배치: ${s.placed.length}/${total}`}
          {s.done && s.leftover > 0 && <span style={{ color: "#dc2626", marginLeft: 6 }}>({E ? `${s.leftover} left!` : `${s.leftover}개 남음!`})</span>}
        </div>
        <div style={{ display: "flex", gap, justifyContent: "center", flexWrap: "wrap", padding: "0 4px", minHeight: stickH + 4 }}>
          {s.placed.map((colorIdx, i) => {
            const isNew = i === s.placed.length - 1 && !s.done;
            return (
              <div key={i} style={{
                width: stickW, height: stickH, borderRadius: 4,
                background: STICK_COLORS[colorIdx],
                border: `1.5px solid ${STICK_COLORS[colorIdx]}`,
                boxShadow: isNew ? `0 0 12px ${STICK_COLORS[colorIdx]}88` : `0 1px 4px ${STICK_COLORS[colorIdx]}44`,
                transform: isNew ? "scale(1.15)" : "scale(1)",
                transition: "all .25s",
              }} />
            );
          })}
          {s.placed.length === 0 && (
            <div style={{ fontSize: 12, color: C.dim, padding: 14, display: "flex", alignItems: "center" }}>
              {E ? "Press ▶ to start!" : "▶ 눌러서 시작!"}
            </div>
          )}
        </div>

        {/* Done: leftover faded */}
        {s.done && s.leftover > 0 && (
          <div style={{ display: "flex", gap: 2, justifyContent: "center", marginTop: 6, opacity: 0.3 }}>
            {s.remaining.map((cnt, ci) =>
              Array.from({ length: cnt }, (_, j) => (
                <div key={`${ci}-${j}`} style={{
                  width: stickW, height: stickH, borderRadius: 4,
                  background: STICK_COLORS[ci], border: `1.5px dashed ${STICK_COLORS[ci]}`,
                }} />
              ))
            )}
            <div style={{ display: "flex", alignItems: "center", fontSize: 10, fontWeight: 600, color: "#dc2626", marginLeft: 4 }}>
              ← {E ? "can't place!" : "못 넣어!"}
            </div>
          </div>
        )}

        {/* Done message */}
        {s.done && (
          <div style={{
            marginTop: 6, textAlign: "center", padding: "5px 8px", borderRadius: 8,
            background: s.leftover === 0 ? "#ecfdf5" : "#fee2e2",
            border: `1.5px solid ${s.leftover === 0 ? "#6ee7b7" : "#fca5a5"}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: s.leftover === 0 ? "#059669" : "#dc2626" }}>
              {s.leftover === 0
                ? (E ? `✅ All ${s.answer} placed!` : `✅ ${s.answer}개 전부 배치 완료!`)
                : (E ? `⚠️ ${s.answer}/${s.total} placed.` : `⚠️ ${s.total}개 중 ${s.answer}개만 배치.`)}
            </div>
          </div>
        )}
      </div>

      {/* Reason label — why this color was picked */}
      {s.reason && !s.done && (
        <div style={{
          textAlign: "center", marginTop: 6, fontSize: 11, fontWeight: 700,
          color: STICK_COLORS[s.colorIdx],
          background: `${STICK_COLORS[s.colorIdx]}11`, borderRadius: 6, padding: "4px 8px",
        }}>
          + {E ? STICK_NAMES_EN[s.colorIdx] : STICK_NAMES_KO[s.colorIdx]}: {s.reason}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
        {!s.done ? (
          <>
            <button onClick={nextStep} disabled={playing} style={{
              padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
              border: "none", cursor: playing ? "default" : "pointer",
              color: "#fff", opacity: playing ? 0.5 : 1,
              background: `linear-gradient(135deg,#b45309,${A})`,
              boxShadow: "0 3px 12px rgba(217,119,6,.3)",
            }}>▶ {E ? "Next" : "다음"}</button>
            <button onClick={autoPlay} style={{
              padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700,
              border: `1px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
            }}>{playing ? "⏸" : "⏭"} {E ? (playing ? "Pause" : "Auto") : (playing ? "정지" : "자동")}</button>
          </>
        ) : (
          <button onClick={resetSim} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {E ? "Restart" : "처음부터"}</button>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 3, fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>
        {cur}/{maxSteps - 1}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   FanPlacementViz — Step-by-step stick placement animation
   Three cases: max < rest, max = rest+1, max > rest+1
   ═══════════════════════════════════════════════════════════════ */

const PLACEMENT_CASES = [
  {
    counts: [3, 3, 3],
    tag_en: "max < rest", tag_ko: "max < rest",
    title_en: "Plenty of separators", title_ko: "분리자 여유",
    desc_en: "max(3) < rest(6) → all 9 sticks fit!",
    desc_ko: "max(3) < rest(6) → 9개 전부 사용!",
    color: "#059669", bg: "#ecfdf5", bd: "#6ee7b7", icon: "✅",
  },
  {
    counts: [4, 3],
    tag_en: "max = rest+1", tag_ko: "max = rest+1",
    title_en: "Exactly enough", title_ko: "딱 맞음",
    desc_en: "max(4) = rest(3)+1 → all 7 sticks fit, but barely!",
    desc_ko: "max(4) = rest(3)+1 → 7개 전부 사용, 아슬아슬!",
    color: "#d97706", bg: "#fffbeb", bd: "#fbbf24", icon: "⚡",
  },
  {
    counts: [7, 2, 2],
    tag_en: "max > rest+1", tag_ko: "max > rest+1",
    title_en: "Too many of one color", title_ko: "한 색이 너무 많음",
    desc_en: "max(7) > rest(4)+1 → only 9/11 used!",
    desc_ko: "max(7) > rest(4)+1 → 11개 중 9개만!",
    color: "#dc2626", bg: "#fee2e2", bd: "#fca5a5", icon: "❌",
  },
];

function buildGreedySteps(counts) {
  const total = counts.reduce((a, b) => a + b, 0);
  const maxC = Math.max(...counts);
  const rest = total - maxC;
  const answer = Math.min(total, 2 * rest + 1);

  const steps = [];
  const remaining = [...counts];
  const placed = [];

  steps.push({ placed: [], remaining: [...remaining], action: null, highlight: null, done: false });

  for (let s = 0; s < answer; s++) {
    let bestI = -1;
    for (let i = 0; i < remaining.length; i++) {
      if (remaining[i] <= 0) continue;
      if (placed.length > 0 && placed[placed.length - 1] === i) continue;
      if (bestI === -1 || remaining[i] > remaining[bestI]) bestI = i;
    }
    if (bestI === -1) break;
    placed.push(bestI);
    remaining[bestI]--;
    steps.push({ placed: [...placed], remaining: [...remaining], action: bestI, highlight: placed.length - 1, done: false });
  }

  const leftover = remaining.reduce((a, b) => a + b, 0);
  steps.push({ placed: [...placed], remaining: [...remaining], action: null, highlight: null, done: true, leftover, answer: placed.length, total });
  return steps;
}

export function FanPlacementViz({ E }) {
  const [caseIdx, setCaseIdx] = useState(0);
  const [step, setStep] = useState(0);
  const timerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const tc = PLACEMENT_CASES[caseIdx];
  const allSteps = buildGreedySteps(tc.counts);
  const cur = Math.min(step, allSteps.length - 1);
  const s = allSteps[cur];
  const maxSteps = allSteps.length;

  const total = tc.counts.reduce((a, b) => a + b, 0);
  const maxC = Math.max(...tc.counts);
  const rest = total - maxC;

  const switchCase = (idx) => {
    setCaseIdx(idx);
    setStep(0);
    setPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const nextStep = () => { if (step < maxSteps - 1) setStep(p => p + 1); };

  const reset = () => {
    setStep(0);
    setPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const autoPlay = () => {
    if (playing) {
      setPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    setPlaying(true);
    setStep(0);
    let st = 0;
    timerRef.current = setInterval(() => {
      st++;
      if (st >= maxSteps - 1) { clearInterval(timerRef.current); setPlaying(false); }
      setStep(st);
    }, 450);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const stickW = 22, stickH = 36;

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* Case selector tabs */}
      <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        {PLACEMENT_CASES.map((pc, i) => (
          <button key={i} onClick={() => switchCase(i)} style={{
            padding: "4px 8px", borderRadius: 7, fontSize: 10, fontWeight: 600,
            border: `1px solid ${i === caseIdx ? pc.bd : C.border}`,
            background: i === caseIdx ? pc.bg : C.card,
            color: i === caseIdx ? pc.color : C.dim,
            cursor: "pointer", lineHeight: 1.3,
          }}>
            {i === caseIdx ? pc.icon + " " : ""}{E ? pc.tag_en : pc.tag_ko}
          </button>
        ))}
      </div>

      {/* Case info card */}
      <div style={{
        background: tc.bg, borderRadius: 10, padding: "8px 10px",
        border: `1px solid ${tc.bd}`, marginBottom: 8,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: tc.color, marginBottom: 3 }}>
          {tc.icon} {E ? tc.title_en : tc.title_ko}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
          fontWeight: 700, color: tc.color, lineHeight: 1.6,
        }}>
          [{tc.counts.join(", ")}] → total=<b>{total}</b>, max=<b style={{ color: "#dc2626" }}>{maxC}</b>, rest=<b style={{ color: "#059669" }}>{rest}</b>
        </div>
        <div style={{ fontSize: 11, color: tc.color, fontWeight: 700, marginTop: 2 }}>
          {E ? tc.desc_en : tc.desc_ko}
        </div>
      </div>

      {/* Remaining sticks pool */}
      <div style={{
        display: "flex", gap: 6, justifyContent: "center", marginBottom: 6,
        alignItems: "center",
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.dim }}>
          {E ? "Pool:" : "남은:"}
        </div>
        {s.remaining.map((cnt, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: STICK_COLORS[i] }} />
            <span style={{
              fontSize: 12, fontWeight: 700, color: cnt > 0 ? STICK_COLORS[i] : "#d1d5db",
              fontFamily: "'JetBrains Mono',monospace", transition: "all .2s",
            }}>{cnt}</span>
          </div>
        ))}
      </div>

      {/* Placement area */}
      <div style={{
        background: "#f8fafc", borderRadius: 12, padding: "10px 6px",
        border: `1px solid ${s.done ? tc.bd : C.border}`,
        minHeight: 74, transition: "border-color .3s",
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.dim, textAlign: "center", marginBottom: 6 }}>
          {E ? `Placed: ${s.placed.length}/${total}` : `배치: ${s.placed.length}/${total}`}
          {s.done && s.leftover > 0 && (
            <span style={{ color: "#dc2626", marginLeft: 6 }}>
              ({E ? `${s.leftover} left!` : `${s.leftover}개 남음!`})
            </span>
          )}
        </div>
        <div style={{
          display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap",
          minHeight: stickH + 4,
        }}>
          {s.placed.map((colorIdx, i) => (
            <div key={i} style={{
              width: stickW, height: stickH, borderRadius: 5,
              background: STICK_COLORS[colorIdx],
              border: `1px solid ${STICK_COLORS[colorIdx]}`,
              boxShadow: i === s.highlight ? `0 0 10px ${STICK_COLORS[colorIdx]}88` : `0 1px 3px ${STICK_COLORS[colorIdx]}22`,
              transform: i === s.highlight ? "scale(1.18)" : "scale(1)",
              transition: "all .25s",
            }} />
          ))}
          {s.placed.length === 0 && (
            <div style={{ fontSize: 12, color: C.dim, padding: 14, display: "flex", alignItems: "center" }}>
              {E ? "Press ▶ to start!" : "▶ 눌러서 시작!"}
            </div>
          )}
        </div>

        {/* Done: leftover sticks shown faded */}
        {s.done && s.leftover > 0 && (
          <div style={{ display: "flex", gap: 2, justifyContent: "center", marginTop: 6, opacity: 0.35 }}>
            {s.remaining.map((cnt, ci) =>
              Array.from({ length: cnt }, (_, j) => (
                <div key={`${ci}-${j}`} style={{
                  width: stickW, height: stickH, borderRadius: 5,
                  background: STICK_COLORS[ci], border: `2px dashed ${STICK_COLORS[ci]}`,
                }} />
              ))
            )}
            <div style={{ display: "flex", alignItems: "center", fontSize: 10, fontWeight: 600, color: "#dc2626", marginLeft: 4 }}>
              ← {E ? "can't place!" : "못 넣어!"}
            </div>
          </div>
        )}

        {/* Done message */}
        {s.done && (
          <div style={{
            marginTop: 6, textAlign: "center", padding: "5px 8px",
            borderRadius: 8, background: s.leftover === 0 ? "#ecfdf5" : "#fee2e2",
            border: `1.5px solid ${s.leftover === 0 ? "#6ee7b7" : "#fca5a5"}`,
          }}>
            {s.leftover === 0 ? (
              <div style={{ fontSize: 11, fontWeight: 600, color: "#059669" }}>
                ✅ {E ? `All ${s.answer} placed!` : `${s.answer}개 전부 배치 완료!`}
                {" "}{E ? "answer = total" : "답 = total"}
              </div>
            ) : (
              <div style={{ fontSize: 11, fontWeight: 600, color: "#dc2626" }}>
                ⚠️ {E
                  ? `${s.answer}/${s.total} placed. answer = 2×rest+1 = ${2 * rest + 1}`
                  : `${s.total}개 중 ${s.answer}개만. 답 = 2×rest+1 = ${2 * rest + 1}`}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action label */}
      {s.action != null && !s.done && (
        <div style={{
          textAlign: "center", marginTop: 5, fontSize: 11, fontWeight: 700,
          color: STICK_COLORS[s.action],
        }}>
          + {E ? STICK_NAMES_EN[s.action] : STICK_NAMES_KO[s.action]}
          <span style={{ color: C.dim, fontWeight: 600 }}>
            {" "}({E ? "most remaining, ≠ prev" : "가장 많고 이전과 ≠"})
          </span>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 7 }}>
        {!s.done ? (
          <>
            <button onClick={nextStep} disabled={playing} style={{
              padding: "7px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700,
              border: "none", cursor: playing ? "default" : "pointer",
              color: "#fff", opacity: playing ? 0.5 : 1,
              background: `linear-gradient(135deg,#b45309,${A})`,
              boxShadow: "0 3px 12px rgba(217,119,6,.3)",
            }}>▶ {E ? "Next" : "다음"}</button>
            <button onClick={autoPlay} style={{
              padding: "7px 12px", borderRadius: 10, fontSize: 13, fontWeight: 700,
              border: `1px solid ${ABd}`, background: ABg,
              color: A, cursor: "pointer",
            }}>{playing ? "⏸" : "⏭"} {E ? (playing ? "Pause" : "Auto") : (playing ? "정지" : "자동")}</button>
          </>
        ) : (
          <button onClick={reset} style={{
            padding: "7px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${ABd}`, background: ABg,
            color: A, cursor: "pointer",
          }}>↺ {E ? "Restart" : "처음부터"}</button>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 3, fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>
        {cur}/{maxSteps - 1}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SeparatorBuildViz — Why 2×rest+1?  Build it up from 0!
   Shows: 분리자 0→1개, 1→3개, 2→5개 ... pattern
   ═══════════════════════════════════════════════════════════════ */

export function SeparatorBuildViz({ E }) {
  const [sepCount, setSepCount] = useState(0);
  const maxSep = 5;

  const R = "#ef4444";
  const sepColors = ["#3b82f6", "#22c55e", "#a855f7", "#f97316", "#06b6d4"];
  const stickW = 28, stickH = 42;

  // Build the row: MAX sep MAX sep MAX ...
  const row = [];
  for (let i = 0; i <= sepCount; i++) {
    row.push({ type: "max", color: R });
    if (i < sepCount) row.push({ type: "sep", color: sepColors[i % sepColors.length] });
  }
  const totalSticks = 2 * sepCount + 1;

  const add = () => { if (sepCount < maxSep) setSepCount(s => s + 1); };
  const reset = () => setSepCount(0);

  return (
    <div style={{ padding: "12px 8px" }}>
      {/* Title */}
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "#d97706", marginBottom: 10 }}>
        {E ? "Why 2×rest + 1?" : "왜 2×rest + 1 일까?"}
      </div>

      {/* No "core idea" prose box — the visual rows below (▶ button growing the row)
          carry the meaning: each new separator lets you place one more dominant stick. */}

      {/* Visual row */}
      <div style={{
        background: "#f8fafc", borderRadius: 12, padding: "12px 6px",
        border: `1px solid ${C.border}`, marginBottom: 8, minHeight: stickH + 30,
      }}>
        <div style={{
          display: "flex", gap: 3, justifyContent: "center", alignItems: "end",
          flexWrap: "wrap", minHeight: stickH + 4,
        }}>
          {row.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{
                width: stickW, height: stickH, borderRadius: 5,
                background: s.color,
                border: `2px ${s.type === "max" ? "solid" : "solid"} ${s.color}`,
                boxShadow: i === row.length - 1 && sepCount > 0 ? `0 0 10px ${s.color}66` : "none",
                transform: i >= row.length - 2 && sepCount > 0 ? "scale(1.08)" : "scale(1)",
                transition: "all .3s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: "#fff" }}>
                  {s.type === "max" ? (E ? "MAX" : "최대") : (E ? "SEP" : "분리")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Count summary */}
        <div style={{
          textAlign: "center", marginTop: 8, fontFamily: "'JetBrains Mono',monospace",
          fontSize: 13, fontWeight: 600, lineHeight: 1.8,
        }}>
          <span style={{ color: "#dc2626" }}>{E ? "dominant" : "최대"}: {sepCount + 1}</span>
          {" + "}
          <span style={{ color: "#3b82f6" }}>{E ? "separators" : "분리자"}: {sepCount}</span>
          {" = "}
          <span style={{ color: "#d97706", fontSize: 15 }}>{totalSticks}</span>
        </div>
      </div>

      {/* Pattern table — grows as you add */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "8px 10px",
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
        lineHeight: 2, marginBottom: 8,
      }}>
        {Array.from({ length: sepCount + 1 }, (_, n) => {
          const isCurrent = n === sepCount;
          return (
            <div key={n} style={{
              color: isCurrent ? "#fbbf24" : "#94a3b8",
              fontWeight: isCurrent ? 900 : 600,
              background: isCurrent ? "rgba(217,119,6,.12)" : "transparent",
              borderRadius: 4, padding: "0 6px",
              transition: "all .3s",
            }}>
              {E ? "sep" : "분리"}={n} → 2×{n}+1 = <span style={{ color: isCurrent ? "#fbbf24" : "#e2e8f0", fontWeight: 700 }}>{2 * n + 1}</span>
              {E ? " sticks" : "개"}
            </div>
          );
        })}
      </div>

      {/* Formula card — visual.  Pattern table above already shows 2·n+1 growing,
          this just stamps the canonical formula at the bottom for anchoring. */}
      {sepCount >= 2 && (
        <div style={{
          background: "#ecfdf5", borderRadius: 8, padding: "6px 10px",
          border: "1.5px solid #6ee7b7", marginBottom: 8, textAlign: "center",
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#15803d",
        }}>
          answer = min(total,&nbsp;<span style={{ color: "#dc2626" }}>2×rest</span>+1)
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {sepCount < maxSep ? (
          <button onClick={add} style={{
            padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: "none", cursor: "pointer", color: "#fff",
            background: `linear-gradient(135deg,#b45309,${A})`,
            boxShadow: "0 3px 12px rgba(217,119,6,.3)",
          }}>+ {E ? "Add separator" : "분리자 추가"}</button>
        ) : (
          <button onClick={reset} style={{
            padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {E ? "Reset" : "처음부터"}</button>
        )}
        {sepCount > 0 && sepCount < maxSep && (
          <button onClick={reset} style={{
            padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺</button>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   TryYourselfViz — Student places sticks themselves, gets feedback.
   Deep-audit sim: does the student really understand "no adjacent same"?
   ═══════════════════════════════════════════════════════════════ */

const TRY_PRESETS = [
  { counts: [2, 2, 2], target: 6, label_en: "Easy: [2,2,2]", label_ko: "쉬움: [2,2,2]" },
  { counts: [3, 2, 1], target: 6, label_en: "Mid: [3,2,1]", label_ko: "중간: [3,2,1]" },
  { counts: [4, 1, 1], target: 5, label_en: "Tight: [4,1,1]", label_ko: "빡빡: [4,1,1]" },
];

export function TryYourselfViz({ E }) {
  const [presetIdx, setPresetIdx] = useState(0);
  const preset = TRY_PRESETS[presetIdx];
  const [pool, setPool] = useState(() => [...preset.counts]);
  const [placed, setPlaced] = useState([]);
  const [violation, setViolation] = useState(null); // index of bad placement
  const names = E ? STICK_NAMES_EN : STICK_NAMES_KO;

  const total = preset.counts.reduce((a, b) => a + b, 0);
  const maxC = Math.max(...preset.counts);
  const rest = total - maxC;
  const optimal = Math.min(total, 2 * rest + 1);

  const switchPreset = (i) => {
    setPresetIdx(i);
    setPool([...TRY_PRESETS[i].counts]);
    setPlaced([]);
    setViolation(null);
  };

  const reset = () => {
    setPool([...preset.counts]);
    setPlaced([]);
    setViolation(null);
  };

  const tryPlace = (colorIdx) => {
    if (pool[colorIdx] <= 0) return;
    const last = placed.length > 0 ? placed[placed.length - 1] : null;
    if (last === colorIdx) {
      // Show violation briefly
      setViolation(colorIdx);
      setTimeout(() => setViolation(null), 900);
      return;
    }
    const newPool = [...pool];
    newPool[colorIdx]--;
    setPool(newPool);
    setPlaced([...placed, colorIdx]);
  };

  const undo = () => {
    if (placed.length === 0) return;
    const last = placed[placed.length - 1];
    const newPool = [...pool];
    newPool[last]++;
    setPool(newPool);
    setPlaced(placed.slice(0, -1));
    setViolation(null);
  };

  const stickW = 22, stickH = 38;
  const stuck = placed.length > 0 && pool.every((c, i) => c === 0 || i === placed[placed.length - 1])
    && pool.some(c => c > 0);
  const done = pool.every(c => c === 0) || stuck;
  const reached = placed.length;
  const hitOptimal = reached === optimal;

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* Title */}
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: A, marginBottom: 6 }}>
        🪄 {E ? "Try it yourself! Tap a color to place a stick." : "직접 해봐요! 색을 눌러 막대를 놓아요."}
      </div>

      {/* Preset selector */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        {TRY_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700,
            border: `1.5px solid ${i === presetIdx ? A : C.border}`,
            background: i === presetIdx ? ABg : C.card,
            color: i === presetIdx ? A : C.dim, cursor: "pointer",
            fontFamily: "'JetBrains Mono',monospace",
          }}>{E ? p.label_en : p.label_ko}</button>
        ))}
      </div>

      {/* Goal banner */}
      <div style={{
        background: ABg, borderRadius: 8, padding: "6px 10px",
        border: `1px solid ${ABd}`, marginBottom: 8, textAlign: "center",
        fontSize: 11, fontWeight: 700, color: "#92400e",
      }}>
        🎯 {E
          ? `Goal: place ${optimal} of ${total} sticks (no two same touch)`
          : `목표: ${total}개 중 ${optimal}개 배치 (같은 색 옆 금지)`}
      </div>

      {/* Pool — clickable buttons */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {pool.map((cnt, i) => {
          const last = placed.length > 0 ? placed[placed.length - 1] : null;
          const blocked = last === i;
          const empty = cnt === 0;
          const flash = violation === i;
          return (
            <button
              key={i}
              onClick={() => tryPlace(i)}
              disabled={empty}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                padding: "4px 6px", borderRadius: 8,
                border: flash ? "2px solid #dc2626" : `1.5px solid ${blocked ? "#fca5a5" : C.border}`,
                background: flash ? "#fee2e2" : (blocked ? "#fef2f2" : C.card),
                cursor: empty ? "not-allowed" : "pointer",
                opacity: empty ? 0.35 : 1,
                transition: "all .2s",
              }}
            >
              <div style={{
                width: 26, height: 26, borderRadius: 5, background: STICK_COLORS[i],
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: "#fff",
                fontFamily: "'JetBrains Mono',monospace",
              }}>{cnt}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.dim }}>{names[i]}</div>
            </button>
          );
        })}
      </div>

      {/* Violation hint */}
      {violation != null && (
        <div style={{
          textAlign: "center", marginBottom: 6, fontSize: 11, fontWeight: 700,
          color: "#dc2626",
        }}>
          ❌ {E
            ? `Same as previous! ${names[violation]} can't follow ${names[violation]}.`
            : `이전과 같은 색! ${names[violation]} 다음에 ${names[violation]} 안 돼요.`}
        </div>
      )}

      {/* Placement strip */}
      <div style={{
        background: "#f8fafc", borderRadius: 10, padding: "10px 6px",
        border: `1.5px solid ${done && hitOptimal ? "#6ee7b7" : (done ? "#fca5a5" : C.border)}`,
        minHeight: stickH + 16, marginBottom: 8,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.dim, textAlign: "center", marginBottom: 4 }}>
          {E ? `Your row: ${reached}/${optimal}` : `내 줄: ${reached}/${optimal}`}
        </div>
        <div style={{
          display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap",
          minHeight: stickH + 4,
        }}>
          {placed.map((ci, i) => (
            <div key={i} style={{
              width: stickW, height: stickH, borderRadius: 5,
              background: STICK_COLORS[ci],
              border: `1px solid ${STICK_COLORS[ci]}`,
              boxShadow: i === placed.length - 1 ? `0 0 8px ${STICK_COLORS[ci]}88` : `0 1px 3px ${STICK_COLORS[ci]}33`,
              transform: i === placed.length - 1 ? "scale(1.12)" : "scale(1)",
              transition: "all .25s",
            }} />
          ))}
          {placed.length === 0 && (
            <div style={{ fontSize: 11, color: C.dim, padding: 10, display: "flex", alignItems: "center" }}>
              {E ? "↑ Tap a color above" : "↑ 위 색 눌러요"}
            </div>
          )}
        </div>

        {/* Done / stuck message */}
        {done && (
          <div style={{
            marginTop: 6, textAlign: "center", padding: "5px 8px", borderRadius: 8,
            background: hitOptimal ? "#ecfdf5" : "#fef3c7",
            border: `1.5px solid ${hitOptimal ? "#6ee7b7" : "#fbbf24"}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: hitOptimal ? "#059669" : "#92400e" }}>
              {hitOptimal
                ? (E ? `🎉 Optimal! You placed all ${optimal} sticks!` : `🎉 최적! ${optimal}개 전부 배치!`)
                : (E ? `Stuck at ${reached}. Optimal is ${optimal} — try again!` : `${reached}개에서 막힘. 최적은 ${optimal}개 — 다시!`)}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        <button onClick={undo} disabled={placed.length === 0} style={{
          padding: "7px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
          border: `1px solid ${C.border}`, background: C.card, color: C.dim,
          cursor: placed.length === 0 ? "not-allowed" : "pointer",
          opacity: placed.length === 0 ? 0.4 : 1,
        }}>↶ {E ? "Undo" : "되돌리기"}</button>
        <button onClick={reset} style={{
          padding: "7px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700,
          border: `1px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
        }}>↺ {E ? "Reset" : "처음부터"}</button>
      </div>

      {/* Hint */}
      <div style={{
        textAlign: "center", marginTop: 8, fontSize: 10, color: C.dim, lineHeight: 1.5,
      }}>
        💡 {E
          ? "Tip: place the most-common color whenever it's not blocked. That's the greedy idea!"
          : "팁: 막히지 않을 때 가장 많은 색을 먼저 놓아봐요. 이게 그리디 아이디어!"}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   FormulaTrace — Step-by-step formula walkthrough
   ═══════════════════════════════════════════════════════════════ */

const TRACE_CASES = [
  { counts: [3, 7, 2], expected: 11 },
  { counts: [4], expected: 1 },
  { counts: [3, 3, 3], expected: 9 },
];

export function FormulaTrace({ E }) {
  const [caseIdx, setCaseIdx] = useState(0);
  const [step, setStep] = useState(0);

  const tc = TRACE_CASES[caseIdx];
  const total = tc.counts.reduce((a, b) => a + b, 0);
  const maxC = Math.max(...tc.counts);
  const rest = total - maxC;
  const twoRest1 = 2 * rest + 1;
  const answer = Math.min(total, twoRest1);

  const maxSteps = 5; // 0:init, 1:total, 2:max, 3:rest, 4:answer

  const reset = () => setStep(0);
  const next = () => { if (step < maxSteps - 1) setStep(s => s + 1); };
  const switchCase = (idx) => { setCaseIdx(idx); setStep(0); };

  return (
    <div style={{ padding: "10px 8px" }}>
      {/* Case selector */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 10 }}>
        {TRACE_CASES.map((tc, i) => (
          <button key={i} onClick={() => switchCase(i)} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${i === caseIdx ? A : C.border}`,
            background: i === caseIdx ? ABg : C.card,
            color: i === caseIdx ? A : C.dim, cursor: "pointer",
            fontFamily: "'JetBrains Mono',monospace",
          }}>[{tc.counts.join(",")}]</button>
        ))}
      </div>

      {/* Input display */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 4, marginBottom: 10,
      }}>
        {tc.counts.map((c, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 6,
              background: STICK_COLORS[i], display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 700, color: "#fff",
              fontFamily: "'JetBrains Mono',monospace",
              border: `1px solid ${STICK_COLORS[i]}`,
              boxShadow: `0 2px 6px ${STICK_COLORS[i]}33`,
            }}>{c}</div>
          </div>
        ))}
      </div>

      {/* Computation steps — revealed one by one */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "10px 12px",
        fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
        lineHeight: 2.2, color: "#e2e8f0",
      }}>
        {/* Step 1: total */}
        <div style={{
          opacity: step >= 1 ? 1 : 0.2,
          transition: "opacity .3s",
        }}>
          <span style={{ color: "#94a3b8" }}>total</span>
          {" = "}
          <span style={{ color: "#fbbf24" }}>{tc.counts.join(" + ")}</span>
          {" = "}
          <span style={{ color: "#fbbf24", fontWeight: 700 }}>{total}</span>
        </div>

        {/* Step 2: max_c */}
        <div style={{
          opacity: step >= 2 ? 1 : 0.2,
          transition: "opacity .3s",
        }}>
          <span style={{ color: "#94a3b8" }}>max_c</span>
          {" = "}
          <span style={{ color: "#f87171" }}>max({tc.counts.join(", ")})</span>
          {" = "}
          <span style={{ color: "#f87171", fontWeight: 700 }}>{maxC}</span>
        </div>

        {/* Step 3: rest */}
        <div style={{
          opacity: step >= 3 ? 1 : 0.2,
          transition: "opacity .3s",
        }}>
          <span style={{ color: "#94a3b8" }}>rest</span>
          {" = "}
          <span style={{ color: "#6ee7b7" }}>{total} - {maxC}</span>
          {" = "}
          <span style={{ color: "#6ee7b7", fontWeight: 700 }}>{rest}</span>
        </div>

        {/* Step 4: answer */}
        <div style={{
          opacity: step >= 4 ? 1 : 0.2,
          transition: "opacity .3s",
          marginTop: 4,
          padding: step >= 4 ? "4px 8px" : "0",
          background: step >= 4 ? "rgba(217,119,6,.15)" : "transparent",
          borderRadius: 6,
        }}>
          <span style={{ color: "#94a3b8" }}>{E ? "ans" : "답"}</span>
          {" = min("}
          <span style={{ color: "#fbbf24" }}>{total}</span>
          {", 2×"}
          <span style={{ color: "#6ee7b7" }}>{rest}</span>
          {"+1)"}
          {" = min("}
          <span style={{ color: "#fbbf24" }}>{total}</span>
          {", "}
          <span style={{ color: "#6ee7b7" }}>{twoRest1}</span>
          {") = "}
          <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: 16 }}>{answer}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
        {step < maxSteps - 1 ? (
          <button onClick={next} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: "none", cursor: "pointer", color: "#fff",
            background: `linear-gradient(135deg,#b45309,${A})`,
            boxShadow: "0 3px 12px rgba(217,119,6,.3)",
          }}>▶ {E ? "Next" : "다음"}</button>
        ) : (
          <button onClick={reset} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${ABd}`, background: ABg,
            color: A, cursor: "pointer",
          }}>↺ {E ? "Restart" : "처음부터"}</button>
        )}
      </div>

      {/* Step counter */}
      <div style={{
        textAlign: "center", marginTop: 4, fontSize: 10, color: C.dim,
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
      }}>
        {step}/{maxSteps - 1}
      </div>
    </div>
  );
}
