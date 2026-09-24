import { useState, useEffect, useRef, useCallback } from "react";
import { C, t } from "@/components/quest/theme";

const A = "#059669";
const ABg = "#ecfdf5";
const ABd = "#6ee7b7";

/* ═══════════════════════════════════════════════════════════════
   RowColumnFillViz — Step-by-step visualization of row-first loop
   filling column counters
   ═══════════════════════════════════════════════════════════════ */

const GRID_DATA = [".#.", "..#", ".#."];
const GRID_ROWS = GRID_DATA.length;
const GRID_COLS = GRID_DATA[0].length;

// Pre-compute all steps
// Step types: "init" | "readRow" | "checkCell" | "done"
function buildSteps() {
  const steps = [];
  const counts = [0, 0, 0];

  // Step 0: initial state
  steps.push({ type: "init", counts: [...counts], i: -1, j: -1, codeLine: -1 });

  for (let i = 0; i < GRID_ROWS; i++) {
    // Read row step
    steps.push({ type: "readRow", i, j: -1, counts: [...counts], codeLine: 0 });

    for (let j = 0; j < GRID_COLS; j++) {
      const ch = GRID_DATA[i][j];
      const isDot = ch === ".";
      if (isDot) counts[j] += 1;
      steps.push({
        type: "checkCell", i, j, ch, isDot,
        counts: [...counts],
        codeLine: isDot ? 2 : 1,
      });
    }
  }

  // Final step
  const minVal = Math.min(...counts);
  steps.push({ type: "done", i: -1, j: -1, counts: [...counts], codeLine: 3, minVal });

  return steps;
}

const ALL_STEPS = buildSteps();

// Code lines shown in the viz
const VIZ_CODE = [
  "for i in range(N):",
  "    row = input()",
  "    for j in range(M):",
  "        if row[j] == '.':",
  "            count[j] += 1",
  "print(min(count))",
];

export function RowColumnFillViz({ E }) {
  const [step, setStep] = useState(0);
  const [flashCol, setFlashCol] = useState(-1);

  const cur = ALL_STEPS[step];
  const isDone = step >= ALL_STEPS.length - 1;

  // Track which counter just changed for flash effect
  useEffect(() => {
    if (step === 0) { setFlashCol(-1); return; }
    const prev = ALL_STEPS[Math.max(0, step - 1)];
    const now = ALL_STEPS[step];
    for (let c = 0; c < GRID_COLS; c++) {
      if (now.counts[c] !== prev.counts[c]) {
        setFlashCol(c);
        const t = setTimeout(() => setFlashCol(-1), 400);
        return () => clearTimeout(t);
      }
    }
    setFlashCol(-1);
  }, [step]);

  const next = () => { if (!isDone) setStep(s => s + 1); };
  const reset = () => { setStep(0); setFlashCol(-1); };

  // Min value for final highlight
  const finalMin = cur.type === "done" ? cur.minVal : null;

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* Variable state display */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 12, marginBottom: 8,
        fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
      }}>
        {cur.i >= 0 && (
          <span style={{
            background: "#ecfdf5", border: "1.5px solid #6ee7b7",
            borderRadius: 6, padding: "2px 8px", color: A,
          }}>i={cur.i}</span>
        )}
        {cur.j >= 0 && (
          <span style={{
            background: "#fef3c7", border: "1.5px solid #fbbf24",
            borderRadius: 6, padding: "2px 8px", color: "#92400e",
          }}>j={cur.j}</span>
        )}
        {cur.type === "checkCell" && (
          <span style={{
            background: cur.isDot ? "#d1fae5" : "#fee2e2",
            border: `1.5px solid ${cur.isDot ? "#6ee7b7" : "#fca5a5"}`,
            borderRadius: 6, padding: "2px 8px",
            color: cur.isDot ? "#059669" : "#dc2626",
          }}>
            row[{cur.j}]='{cur.ch}' {cur.isDot ? "→ +1" : "→ skip"}
          </span>
        )}
      </div>

      {/* Code section */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "6px 4px",
        marginBottom: 10, fontSize: 11, lineHeight: 1.7,
        fontFamily: "'JetBrains Mono',monospace",
      }}>
        {VIZ_CODE.map((line, idx) => {
          const isActive = cur.codeLine === idx ||
            (cur.type === "readRow" && idx === 1) ||
            (cur.type === "checkCell" && (idx === 2 || idx === 3 || idx === 4));

          // More specific highlighting
          let highlighted = false;
          if (cur.type === "readRow" && idx === 1) highlighted = true;
          if (cur.type === "checkCell" && idx === 3) highlighted = true;
          if (cur.type === "checkCell" && idx === 4 && cur.isDot) highlighted = true;
          if (cur.type === "done" && idx === 5) highlighted = true;
          // outer for when reading row
          if (cur.type === "readRow" && idx === 0) highlighted = true;
          // inner for when checking cell
          if (cur.type === "checkCell" && idx === 2) highlighted = true;

          return (
            <div key={idx} style={{
              display: "flex", alignItems: "center", minHeight: 18,
              background: highlighted ? "rgba(5,150,105,.18)" : "transparent",
              borderRadius: 4, padding: "0 4px",
              transition: "background .15s",
            }}>
              <span style={{
                width: 14, fontSize: 9, color: highlighted ? "#6ee7b7" : "transparent",
                flexShrink: 0, textAlign: "center",
              }}>{highlighted ? "►" : ""}</span>
              <span style={{
                whiteSpace: "pre",
                color: highlighted ? "#6ee7b7" : "#94a3b8",
                fontWeight: highlighted ? 700 : 400,
                transition: "color .15s",
              }}>{line}</span>
            </div>
          );
        })}
      </div>

      {/* Grid with column headers and counts */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Column headers */}
        <div style={{ display: "flex", gap: 4, marginBottom: 2 }}>
          <div style={{ width: 28 }} /> {/* spacer for row labels */}
          {Array.from({ length: GRID_COLS }, (_, c) => (
            <div key={c} style={{
              width: 40, textAlign: "center", fontSize: 10, fontWeight: 600,
              fontFamily: "'JetBrains Mono',monospace",
              color: (cur.type === "checkCell" && cur.j === c) ? "#fff" : "#9ca3af",
              background: (cur.type === "checkCell" && cur.j === c) ? A : "transparent",
              borderRadius: 4, padding: "1px 0",
              transition: "all .15s",
            }}>{E ? `C${c + 1}` : `${c + 1}열`}</div>
          ))}
        </div>

        {/* Grid rows */}
        {GRID_DATA.map((rowStr, r) => {
          const isActiveRow = cur.i === r;
          const isPastRow = cur.i > r || cur.type === "done";
          return (
            <div key={r} style={{
              display: "flex", gap: 4, marginBottom: 4, alignItems: "center",
              opacity: (!isActiveRow && !isPastRow && cur.type !== "init") ? 0.35 : 1,
              transition: "opacity .2s",
            }}>
              {/* Row label */}
              <div style={{
                width: 28, fontSize: 9, fontWeight: 700, textAlign: "right",
                fontFamily: "'JetBrains Mono',monospace",
                color: isActiveRow ? A : "#d1d5db",
                paddingRight: 4,
              }}>{E ? `R${r + 1}` : `${r + 1}행`}</div>

              {/* Cells */}
              {rowStr.split("").map((ch, c) => {
                const isFence = ch === "#";
                const isCurrentCell = cur.type === "checkCell" && cur.i === r && cur.j === c;
                const wasChecked = cur.type === "checkCell" && cur.i === r && cur.j > c;
                const wasCheckedPrevRow = (cur.i > r) || (cur.type === "done");

                // Determine cell style
                let bg = isFence ? "#374151" : "#bbf7d0";
                let border = isFence ? "#6b7280" : "#86efac";
                let color = isFence ? "#fff" : "#166534";
                let shadow = "none";
                let transform = "none";

                if (isCurrentCell) {
                  if (isFence) {
                    bg = "#fee2e2"; border = "#f87171"; color = "#991b1b";
                    shadow = "0 0 8px rgba(248,113,113,.5)";
                  } else {
                    bg = "#fef3c7"; border = "#fbbf24"; color = "#92400e";
                    shadow = "0 0 8px rgba(251,191,36,.5)";
                    transform = "scale(1.08)";
                  }
                } else if (wasChecked || wasCheckedPrevRow) {
                  // Already processed cells: slightly dimmed
                  if (isFence) {
                    bg = "#1f2937"; border = "#4b5563"; color = "#6b7280";
                  } else {
                    bg = "#d1fae5"; border = "#6ee7b7"; color = "#065f46";
                  }
                }

                // Done phase: highlight min columns
                if (cur.type === "done") {
                  const isMinCol = cur.counts[c] === cur.minVal;
                  if (isMinCol) {
                    bg = isFence ? "#065f46" : "#6ee7b7";
                    border = "#059669";
                    shadow = "0 0 10px rgba(5,150,105,.4)";
                    transform = "scale(1.06)";
                  } else {
                    bg = isFence ? "#1f2937" : "#e5e7eb";
                    border = isFence ? "#374151" : "#d1d5db";
                    color = "#9ca3af";
                  }
                }

                return (
                  <div key={c} style={{
                    width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 6, fontSize: 18, fontWeight: 700,
                    fontFamily: "'JetBrains Mono',monospace",
                    background: bg, border: `1.5px solid ${border}`, color,
                    boxShadow: shadow, transform,
                    transition: "all .2s",
                  }}>{ch}</div>
                );
              })}
            </div>
          );
        })}

        {/* Separator */}
        <div style={{
          width: 28 + GRID_COLS * 44, height: 2,
          background: `linear-gradient(90deg, transparent 28px, ${A} 28px)`,
          marginTop: 4, marginBottom: 4, borderRadius: 1,
        }} />

        {/* Count array */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{
            width: 28, fontSize: 8, fontWeight: 700, textAlign: "right",
            fontFamily: "'JetBrains Mono',monospace",
            color: A, paddingRight: 4,
          }}>count</div>
          {cur.counts.map((cnt, c) => {
            const isFlashing = flashCol === c;
            const isMin = finalMin !== null && cnt === finalMin;
            return (
              <div key={c} style={{
                width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8, fontSize: isMin ? 18 : 15, fontWeight: 700,
                fontFamily: "'JetBrains Mono',monospace",
                background: isMin ? A : isFlashing ? "#d1fae5" : "#f0fdf4",
                border: `1.5px solid ${isMin ? A : isFlashing ? A : "#d1d5db"}`,
                color: isMin ? "#fff" : isFlashing ? "#059669" : "#374151",
                transform: isFlashing ? "scale(1.15)" : isMin ? "scale(1.08)" : "none",
                boxShadow: isFlashing ? "0 0 12px rgba(5,150,105,.4)" : isMin ? "0 0 10px rgba(5,150,105,.4)" : "none",
                transition: "all .2s",
              }}>{cnt}</div>
            );
          })}
        </div>

        {/* Done result */}
        {cur.type === "done" && (
          <div style={{
            marginTop: 10, textAlign: "center",
            animation: "popIn .3s ease",
          }}>
            <div style={{ fontSize: 12, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
              min([{cur.counts.join(", ")}])
            </div>
            <div style={{
              display: "inline-block", padding: "6px 20px", borderRadius: 10,
              background: "linear-gradient(135deg,#047857,#059669)",
              fontSize: 24, fontWeight: 700, color: "#fff",
              fontFamily: "'JetBrains Mono',monospace",
              boxShadow: "0 3px 12px rgba(5,150,105,.3)",
            }}>= {cur.minVal}</div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
        {!isDone ? (
          <>
            <button onClick={next} style={{
              padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700,
              border: "none", cursor: "pointer", color: "#fff",
              background: "linear-gradient(135deg,#047857,#059669)",
              boxShadow: "0 3px 12px rgba(5,150,105,.3)",
            }}>▶ {E ? "Next step" : "다음 스텝"}</button>
          </>
        ) : (
          <button onClick={reset} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${ABd}`, background: ABg,
            color: A, cursor: "pointer",
          }}>↺ {E ? "Restart" : "처음부터"}</button>
        )}
        {step > 0 && !isDone && (
          <button onClick={reset} style={{
            padding: "8px 12px", borderRadius: 10, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${C.border}`, background: C.card,
            color: C.dim, cursor: "pointer",
          }}>↺</button>
        )}
      </div>

      {/* Step counter */}
      <div style={{
        textAlign: "center", marginTop: 6, fontSize: 10, color: C.dim,
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
      }}>
        {step}/{ALL_STEPS.length - 1}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ColumnCostAuditor — Click any column, audit each cell one-by-one,
   see the running cost build up. Compare columns to find the cheapest.
   ═══════════════════════════════════════════════════════════════ */

const AUDIT_GRID = [
  [".", "#", ".", "#", "."],
  [".", ".", "#", "#", "."],
  ["#", "#", ".", "#", "."],
  [".", "#", "#", "#", "#"],
];
const AUDIT_ROWS = AUDIT_GRID.length;
const AUDIT_COLS = AUDIT_GRID[0].length;

export function ColumnCostAuditor({ E }) {
  // For each column we remember its final audited cost (null if not yet audited)
  const [auditedCosts, setAuditedCosts] = useState(Array(AUDIT_COLS).fill(null));
  const [activeCol, setActiveCol] = useState(-1);  // column currently being audited
  const [auditRow, setAuditRow] = useState(-1);    // row pointer during audit
  const [runCost, setRunCost] = useState(0);
  const timerRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);
  useEffect(() => () => clearTimer(), [clearTimer]);

  // Audit animation: walk row 0..AUDIT_ROWS-1 in activeCol, +1 per dot
  useEffect(() => {
    if (activeCol < 0) return;
    if (auditRow < 0) {
      timerRef.current = setTimeout(() => { setAuditRow(0); setRunCost(0); }, 200);
      return;
    }
    if (auditRow >= AUDIT_ROWS) {
      // finished this column → save cost, idle
      const final = runCost;
      setAuditedCosts(prev => {
        const next = [...prev];
        next[activeCol] = final;
        return next;
      });
      setActiveCol(-1);
      setAuditRow(-1);
      setRunCost(0);
      return;
    }
    const isDot = AUDIT_GRID[auditRow][activeCol] === ".";
    timerRef.current = setTimeout(() => {
      if (isDot) setRunCost(c => c + 1);
      setAuditRow(r => r + 1);
    }, 380);
    return () => clearTimer();
  }, [activeCol, auditRow, runCost, clearTimer]);

  const startAudit = (c) => {
    if (activeCol >= 0) return;  // one at a time
    clearTimer();
    setAuditedCosts(prev => {
      const next = [...prev];
      next[c] = null;  // re-audit clears cached value
      return next;
    });
    setActiveCol(c);
    setAuditRow(-1);
    setRunCost(0);
  };

  const resetAll = () => {
    clearTimer();
    setAuditedCosts(Array(AUDIT_COLS).fill(null));
    setActiveCol(-1);
    setAuditRow(-1);
    setRunCost(0);
  };

  const auditedSoFar = auditedCosts.filter(v => v !== null);
  const allDone = auditedSoFar.length === AUDIT_COLS && activeCol < 0;
  const minSoFar = auditedSoFar.length > 0 ? Math.min(...auditedSoFar) : null;

  return (
    <div style={{ padding: "12px 8px" }}>
      <div style={{
        textAlign: "center", fontSize: 12, color: C.dim, fontWeight: 600, marginBottom: 8,
      }}>
        {E
          ? "Click a column header to audit it cell-by-cell. Audit them all to find the cheapest."
          : "열 머리글을 눌러 한 칸씩 감사해봐. 전부 감사해서 가장 싼 열을 찾아내!"}
      </div>

      {/* Column header buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 4 }}>
        {Array.from({ length: AUDIT_COLS }, (_, c) => {
          const isActive = c === activeCol;
          const cost = auditedCosts[c];
          const isAudited = cost !== null;
          const isMin = isAudited && allDone && cost === minSoFar;
          return (
            <button
              key={c}
              onClick={() => startAudit(c)}
              disabled={activeCol >= 0}
              style={{
                width: 40, textAlign: "center", fontSize: 11, fontWeight: 700,
                fontFamily: "'JetBrains Mono',monospace",
                color: isActive ? "#fff" : isMin ? "#fff" : isAudited ? A : "#6b7280",
                background: isActive ? A : isMin ? A : isAudited ? ABg : C.card,
                borderRadius: 6, padding: "4px 0",
                border: `1.5px solid ${isActive || isMin ? A : isAudited ? ABd : C.border}`,
                cursor: activeCol >= 0 ? "not-allowed" : "pointer",
                opacity: activeCol >= 0 && !isActive ? 0.55 : 1,
                transition: "all .15s",
                boxShadow: isMin ? "0 0 8px rgba(5,150,105,.4)" : "none",
              }}
            >
              {E ? `C${c + 1}` : `${c + 1}열`}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, marginBottom: 6 }}>
        {AUDIT_GRID.map((row, r) => (
          <div key={r} style={{ display: "flex", gap: 3 }}>
            {row.map((ch, c) => {
              const isFence = ch === "#";
              const inActiveCol = c === activeCol;
              const isCurrentCell = inActiveCol && r === auditRow;
              const wasAuditedThisRun = inActiveCol && auditRow >= 0 && r < auditRow;
              const colDone = auditedCosts[c] !== null;
              const isMinDone = colDone && allDone && auditedCosts[c] === minSoFar;

              let bg = isFence ? "#374151" : "#bbf7d0";
              let border = isFence ? "#6b7280" : "#86efac";
              let color = isFence ? "#fff" : "#166534";
              let shadow = "none";
              let transform = "none";

              if (isCurrentCell) {
                if (isFence) {
                  bg = "#e5e7eb"; border = "#9ca3af"; color = "#4b5563";
                  shadow = "0 0 8px rgba(156,163,175,.5)";
                } else {
                  bg = "#fef3c7"; border = "#fbbf24"; color = "#92400e";
                  shadow = "0 0 10px rgba(251,191,36,.55)";
                  transform = "scale(1.1)";
                }
              } else if (wasAuditedThisRun) {
                if (!isFence) { bg = "#d1fae5"; border = "#6ee7b7"; color = "#065f46"; }
                else { bg = "#1f2937"; border = "#4b5563"; color = "#9ca3af"; }
              } else if (inActiveCol) {
                // upcoming cells in active column
                border = A;
                shadow = "0 0 4px rgba(5,150,105,.25)";
              } else if (isMinDone) {
                bg = isFence ? "#065f46" : "#6ee7b7";
                border = "#059669";
                color = isFence ? "#a7f3d0" : "#065f46";
                shadow = "0 0 8px rgba(5,150,105,.4)";
              } else if (allDone && !isMinDone) {
                bg = isFence ? "#1f2937" : "#e5e7eb";
                border = isFence ? "#374151" : "#d1d5db";
                color = "#9ca3af";
              }

              return (
                <div key={c} style={{
                  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 6, fontSize: 18, fontWeight: 700,
                  fontFamily: "'JetBrains Mono',monospace",
                  background: bg, border: `1.5px solid ${border}`, color,
                  boxShadow: shadow, transform,
                  transition: "all .18s",
                }}>{ch}</div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Cost row */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 8 }}>
        {Array.from({ length: AUDIT_COLS }, (_, c) => {
          const isActive = c === activeCol;
          const cost = auditedCosts[c];
          const showVal = isActive ? runCost : cost;
          const isMinDone = cost !== null && allDone && cost === minSoFar;
          return (
            <div key={c} style={{
              width: 40, padding: "4px 0", borderRadius: 8,
              textAlign: "center", fontSize: isMinDone ? 17 : 14, fontWeight: 700,
              fontFamily: "'JetBrains Mono',monospace",
              background: isActive ? "#fef3c7" : isMinDone ? A : cost !== null ? ABg : "#f8f9fc",
              border: `1.5px solid ${isActive ? "#fbbf24" : isMinDone ? A : cost !== null ? ABd : C.border}`,
              color: isActive ? "#92400e" : isMinDone ? "#fff" : cost !== null ? A : C.dimLight,
              transition: "all .15s",
              transform: isMinDone ? "scale(1.08)" : "none",
              boxShadow: isMinDone ? "0 0 8px rgba(5,150,105,.4)" : "none",
            }}>
              {showVal !== null && showVal !== undefined ? showVal : "?"}
            </div>
          );
        })}
      </div>

      {/* Status / verdict */}
      <div style={{ textAlign: "center", minHeight: 40 }}>
        {activeCol >= 0 && (
          <div style={{ fontSize: 12, color: "#92400e", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
            {E
              ? `Auditing column ${activeCol + 1}… running cost = ${runCost}`
              : `${activeCol + 1}열 감사 중… 누적 비용 = ${runCost}`}
          </div>
        )}
        {activeCol < 0 && !allDone && auditedSoFar.length > 0 && (
          <div style={{ fontSize: 12, color: A, fontWeight: 600 }}>
            {E
              ? `${auditedSoFar.length}/${AUDIT_COLS} columns audited. Pick another!`
              : `${auditedSoFar.length}/${AUDIT_COLS} 열 감사 완료. 다음 열을 골라봐!`}
          </div>
        )}
        {allDone && (
          <div>
            <div style={{ fontSize: 12, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
              {E ? "Cheapest column → minimum cost" : "가장 싼 열 → 최소 비용"}
            </div>
            <div style={{
              display: "inline-block", padding: "6px 22px", borderRadius: 10,
              background: "linear-gradient(135deg,#047857,#059669)",
              fontSize: 22, fontWeight: 700, color: "#fff",
              fontFamily: "'JetBrains Mono',monospace",
              boxShadow: "0 3px 12px rgba(5,150,105,.3)",
            }}>{minSoFar}</div>
          </div>
        )}
      </div>

      {/* Reset */}
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <button onClick={resetAll} disabled={activeCol >= 0} style={{
          padding: "5px 14px", borderRadius: 8, fontSize: 11, fontWeight: 700,
          border: `1.5px solid ${C.border}`, background: C.card,
          color: C.dim, cursor: activeCol >= 0 ? "not-allowed" : "pointer",
          opacity: activeCol >= 0 ? 0.5 : 1,
        }}>🔄 {E ? "Reset audit" : "처음부터 다시"}</button>
      </div>
    </div>
  );
}
