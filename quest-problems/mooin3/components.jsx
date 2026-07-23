// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 3/11 (TLE many cases, O(N) per query)
//   C++:    4/11 (TLE - brute O(N^2))
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { SimNav as SharedSimNav, useTraceStep, StepHeader, NarrativePanel } from "@/components/quest/TraceStepper";
import { SampleInputAside } from "@/components/quest/SampleInputAside";

// Official USACO 2025 Open Bronze #3 sample, line by line.
// Index 0 = "12 5", 1 = "abcabbacabac", 2-6 = the 5 query lines.
const M3_SAMPLE = ["12 5", "abcabbacabac", "1 12", "2 7", "4 8", "2 5", "3 10"];

const A = "#7c5cfc";

/* SimNav uses the shared component, with this quest's accent color. */
function SimNav({ idx, total, onIdx }) {
  return <SharedSimNav idx={idx} total={total} onIdx={onIdx} accent={A} />;
}

/* ═══════════════════════════════════════════════════════════════
   TripletEnumSimulator — first natural idea: try every (i, j, k).
   Walks all C(N, 3) triplets on s = "abba", checking moo condition
   one by one. Final realization: O(N³) doesn't scale.
   ═══════════════════════════════════════════════════════════════ */
export function TripletEnumSimulator({ E }) {
  const str = "abba";
  const trips = [];
  for (let i = 0; i < str.length; i++)
    for (let j = i + 1; j < str.length; j++)
      for (let k = j + 1; k < str.length; k++) {
        const ok = str[i] !== str[j] && str[j] === str[k];
        const score = ok ? (j - i) * (k - j) : null;
        const why = !ok
          ? (str[i] === str[j]
              ? `s[i]='${str[i]}' = s[j]='${str[j]}'  ✗ (same)`
              : `s[j]='${str[j]}' ≠ s[k]='${str[k]}'  ✗`)
          : `s[i]≠s[j] ✓, s[j]=s[k] ✓ → score = (${j}-${i})·(${k}-${j}) = ${score}`;
        trips.push({ i, j, k, ok, score, why });
      }
  let best = -1;
  trips.forEach(t => { if (t.ok && t.score > best) best = t.score; });

  const trace = [{ kind: "intro" }, ...trips.map((t, idx) => ({ kind: "step", t, idx })), { kind: "verdict" }, { kind: "scale" }];
  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];

  const cellStyle = (pos, t) => {
    let role = null;
    if (t) { if (pos === t.i) role = "i"; else if (pos === t.j) role = "j"; else if (pos === t.k) role = "k"; }
    const colors = {
      i: ["#fee2e2", "#dc2626", "#7f1d1d"],
      j: ["#fef3c7", "#f59e0b", "#92400e"],
      k: ["#dcfce7", "#16a34a", "#15803d"],
    };
    const [bg, bd, fg] = role ? colors[role] : ["#fff", "#cbd5e1", "#475569"];
    return {
      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16,
      background: bg, border: `1px solid ${bd}`, color: fg, transition: "all .2s",
    };
  };

  // Per-triplet "rule check card" — shows visually whether s[i]≠s[j] and s[j]=s[k] hold.
  // Three letter chips with comparison signs.  Pure visual, no prose.
  const RuleCheckCard = ({ tr }) => {
    const sIeqJ = str[tr.i] === str[tr.j];   // BAD if equal
    const sJeqK = str[tr.j] === str[tr.k];   // GOOD if equal
    const Letter = ({ ch, role }) => {
      const cols = {
        i: { bg: "#fee2e2", bd: "#dc2626", fg: "#7f1d1d" },
        j: { bg: "#fef3c7", bd: "#f59e0b", fg: "#92400e" },
        k: { bg: "#dcfce7", bd: "#16a34a", fg: "#15803d" },
      };
      const c = cols[role];
      return (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
        }}>
          <div style={{ fontSize: 9, color: c.fg, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
            s[{role}]
          </div>
          <div style={{
            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16,
            background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
          }}>{ch}</div>
        </div>
      );
    };
    const Comp = ({ pass, expected }) => (
      // expected: "≠" or "=" — what we WANT.  pass: did the actual values satisfy this?
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: pass ? "#16a34a" : "#dc2626", lineHeight: 1, marginBottom: 4 }}>
          {expected}
        </div>
        <div style={{
          fontSize: 11, fontWeight: 800, lineHeight: 1,
          color: pass ? "#16a34a" : "#dc2626",
        }}>{pass ? "✓" : "✗"}</div>
      </div>
    );
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 6,
        background: tr.ok ? "#f0fdf4" : "#fef2f2",
        border: `1.5px solid ${tr.ok ? "#86efac" : "#fca5a5"}`,
        borderRadius: 10, padding: "8px 12px", marginBottom: 10,
      }}>
        <Letter ch={str[tr.i]} role="i" />
        <Comp pass={!sIeqJ} expected="≠" />
        <Letter ch={str[tr.j]} role="j" />
        <Comp pass={sJeqK} expected="=" />
        <Letter ch={str[tr.k]} role="k" />
        {tr.ok && (
          <div style={{ marginLeft: 10, paddingLeft: 10, borderLeft: "1px dashed #86efac",
            display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 9, color: "#15803d", fontWeight: 700 }}>score</div>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#1f2937", whiteSpace: "nowrap" }}>
              <span style={{ color: "#dc2626" }}>{tr.j - tr.i}</span>
              <span style={{ color: C.dim }}>×</span>
              <span style={{ color: "#16a34a" }}>{tr.k - tr.j}</span>
              <span style={{ color: C.dim }}>=</span>
              <span style={{ fontSize: 14, color: "#15803d", fontWeight: 800 }}>{tr.score}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Compute per-step "revealed count" (how many triplets shown so far) for the score strip.
  const revealedCount =
    s.kind === "intro" ? 0 :
    s.kind === "step" ? s.idx + 1 :
    trips.length;  // verdict/scale: all revealed

  // Persistent role labels above cells (so j/i/k meaning is visible without text).
  const labelForPos = (pos) => {
    if (s.kind !== "step") return "";
    if (pos === s.t.i) return "i";
    if (pos === s.t.j) return "j";
    if (pos === s.t.k) return "k";
    return "";
  };
  const labelColor = (lab) =>
    lab === "i" ? "#dc2626" : lab === "j" ? "#92400e" : lab === "k" ? "#16a34a" : "transparent";

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, `s = "${str}"`, `s = "${str}"`)}
        subtitle={`(${safe + 1} / ${trace.length})`}
      />

      {/* String visualization with i/j/k labels above */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 10 }}>
        {str.split("").map((ch, pos) => {
          const lab = labelForPos(pos);
          return (
            <div key={pos} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ fontSize: 10, height: 12, fontWeight: 700, color: labelColor(lab), fontFamily: "'JetBrains Mono',monospace" }}>
                {lab || " "}
              </div>
              <div style={cellStyle(pos, s.kind === "step" ? s.t : null)}>{ch}</div>
              <div style={{ fontSize: 9, color: C.dim }}>{pos + 1}</div>
            </div>
          );
        })}
      </div>

      {/* Step body: rule-check card on step, scale-bars on scale, otherwise empty */}
      {s.kind === "step" && <RuleCheckCard tr={s.t} />}

      {s.kind === "scale" && (
        <div style={{ marginBottom: 10 }}>
          {/* Bridge: abba(4 triplets) → length-N string(~N³/6).  Without this the
              jump from "4" to 1.6e14 is a mystery. (선생님 2026-07-22: 시뮬 이해 안 감) */}
          <div style={{
            background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 8,
            padding: "9px 12px", marginBottom: 10, fontSize: 11.5, lineHeight: 1.65,
            color: "#1f2937", wordBreak: "keep-all",
          }}>
            🐌 <b style={{ color: "#dc2626" }}>{t(E, "But on a big string?", "근데 큰 문자열이면?")}</b>{" "}
            {t(E,
              `"abba" (N=4) had only 4 triplets. A length-N string has about N³/6 of them — so the count EXPLODES as N grows.`,
              `"abba"(N=4)는 (i,j,k) 조합이 4 개뿐이었죠. 길이 N 이면 ≈ N³/6 개 — N 이 커질수록 조합 수가 폭발해요.`)}
            <div style={{ marginTop: 4, color: C.dim }}>
              {t(E, "Each bar = how many (i,j,k) triplets you'd check for that N:",
                    "아래 막대 = 그 N 일 때 확인해야 할 (i,j,k) 조합 수:")}
            </div>
          </div>
          {[
            { N: 4,    ops: 4,         okLabel: "✓" },
            { N: 100,  ops: 1.6e5,     okLabel: "✓" },
            { N: 1000, ops: 1.6e8,     okLabel: "△" },
            { N: 1e5,  ops: 1.6e14,    okLabel: "✗" },
          ].map((row) => {
            // Use log scale for bar widths; clamp.
            const w = Math.max(8, Math.min(320, 25 * Math.log10(row.ops + 1)));
            const ok = row.okLabel === "✓";
            const borderline = row.okLabel === "△";
            const bg = ok ? "#16a34a" : borderline ? "#f59e0b" : "#dc2626";
            return (
              <div key={row.N} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>
                <div style={{ width: 60, textAlign: "right", color: C.dim, fontWeight: 600 }}>N = {row.N.toLocaleString()}</div>
                <div style={{
                  width: w, height: 16, background: bg, borderRadius: 4,
                  display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6,
                  color: "#fff", fontSize: 10, fontWeight: 700,
                }}>
                  {row.ops >= 1e6 ? `~${row.ops.toExponential(1)}` : row.ops.toLocaleString()}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: bg }}>{row.okLabel}</div>
              </div>
            );
          })}
          <div style={{
            marginTop: 8, fontSize: 10.5, color: C.dim, lineHeight: 1.6, wordBreak: "keep-all", textAlign: "center",
          }}>
            {t(E,
              "Rule of thumb: ~100M (1e8) ops fit in the time limit.  ✓ fine · △ risky · ✗ way too slow.  And this is PER query — with many queries, brute is hopeless → we need a faster idea.",
              "대략 1 억(1e8) 연산까지가 제한 시간 안.  ✓ 여유 · △ 위험 · ✗ 한참 초과.  게다가 이건 쿼리 1 개당 — 쿼리가 많으면 브루트는 가망 없음 → 더 빠른 방법이 필요해요.")}
          </div>
        </div>
      )}

      {/* Score strip — small card per triplet checked.  ✓ green = valid moo with score.
          ✗ red = rule failed.  Best gets ⭐ + dark green. */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
        {trips.slice(0, revealedCount).map((tr, idx) => {
          const isCurrent = s.kind === "step" && idx === s.idx;
          const isBest = tr.ok && tr.score === best && best > 0;
          return (
            <div key={idx} style={{
              padding: "3px 7px", borderRadius: 6, minWidth: 38,
              background: isBest ? "#dcfce7" : tr.ok ? "#f0fdf4" : "#fef2f2",
              border: `${isCurrent ? 2 : 1.5}px solid ${
                isBest ? "#16a34a" : isCurrent ? "#f59e0b" : tr.ok ? "#86efac" : "#fca5a5"
              }`,
              fontFamily: "'JetBrains Mono',monospace",
              display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.2,
            }}>
              <div style={{ fontSize: 8.5, color: C.dim, fontWeight: 700 }}>
                ({tr.i + 1},{tr.j + 1},{tr.k + 1})
              </div>
              <div style={{
                fontSize: 13, fontWeight: 800,
                color: tr.ok ? (isBest ? "#15803d" : "#166534") : "#991b1b",
              }}>
                {tr.ok ? tr.score : "✗"}{isBest && " ⭐"}
              </div>
            </div>
          );
        })}
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MooTraceSimulator — interactive per-j walk on s = "abbab".
   Press ▶ to scan one middle position j at a time, marking
   leftmost-different i (red), rightmost-same k (green), score.
   ═══════════════════════════════════════════════════════════════ */
export function MooTraceSimulator({ E }) {
  const str = "abbab";
  const l = 0, r = str.length - 1;
  const perJ = [];
  for (let j = l + 1; j < r; j++) {
    const sj = str[j];
    let left = -1;
    for (let i = l; i < j; i++) if (str[i] !== sj) { left = i; break; }
    let right = -1;
    for (let k = r; k > j; k--) if (str[k] === sj) { right = k; break; }
    const score = (left >= 0 && right >= 0) ? (j - left) * (right - j) : null;
    perJ.push({ j, sj, left, right, score });
  }
  const trace = [{ kind: "init", revealed: 0, best: -1 }];
  let best = -1;
  perJ.forEach((row, i) => {
    if (row.score !== null && row.score > best) best = row.score;
    trace.push({ kind: "step", row, revealed: i + 1, best });
  });
  trace.push({ kind: "final", revealed: perJ.length, best });

  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];

  /* cellRole — what each cell IS in the current step:
       "j"            → middle (yellow, locked)
       "left_i"       → matched during LEFT scan (red)
       "right_k"      → matched during RIGHT scan (green)
       "skipped_left" → scanned during LEFT scan, didn't match → ✗ overlay
       "skipped_right"→ scanned during RIGHT scan, didn't match → ✗ overlay
       "outside"      → not scanned at all in this j
     The "skipped_*" roles let the student SEE the scan path
     without reading text — footprints from outside-l → j and outside-r → j. */
  const cellRole = (i) => {
    if (s.kind !== "step") return "outside";
    if (i === s.row.j) return "j";
    if (i === s.row.left) return "left_i";
    if (i === s.row.right) return "right_k";
    // Left scan walks l → j-1, stopping at first different letter.
    // If left found: scanned-and-skipped = [l, s.row.left - 1].
    // If NOT found: every position [l, j-1] was scanned, all skipped.
    const leftScanEnd = s.row.left >= 0 ? s.row.left : s.row.j;
    if (i >= l && i < leftScanEnd) return "skipped_left";
    // Right scan walks r → j+1, stopping at first same letter.
    // If right found: scanned-and-skipped = [s.row.right + 1, r].
    // If NOT found: every position [j+1, r] was scanned, all skipped.
    const rightScanStart = s.row.right >= 0 ? s.row.right : s.row.j;
    if (i > rightScanStart && i <= r) return "skipped_right";
    return "outside";
  };
  const cellStyle = (i) => {
    const role = cellRole(i);
    const PALETTE = {
      j:             { bg: "#fef3c7", bd: "#f59e0b", fg: "#92400e", op: 1 },
      left_i:        { bg: "#fee2e2", bd: "#dc2626", fg: "#7f1d1d", op: 1 },
      right_k:       { bg: "#dcfce7", bd: "#16a34a", fg: "#15803d", op: 1 },
      skipped_left:  { bg: "#fef2f2", bd: "#fca5a5", fg: "#991b1b", op: 0.55 },
      skipped_right: { bg: "#f0fdf4", bd: "#86efac", fg: "#166534", op: 0.55 },
      outside:       { bg: "#fff",    bd: "#cbd5e1", fg: "#475569", op: 1 },
    };
    const p = PALETTE[role];
    return {
      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16,
      background: p.bg, border: `1px solid ${p.bd}`, color: p.fg, opacity: p.op,
      transition: "all .2s",
      position: "relative",
    };
  };
  const labelFor = (i) => {
    const role = cellRole(i);
    if (role === "j") return "j";
    if (role === "left_i") return "left_i";
    if (role === "right_k") return "right_k";
    return "";
  };
  const overlayFor = (i) => {
    // Show ✗ on cells that were scanned but didn't match — the "footprint" of the scan.
    const role = cellRole(i);
    if (role === "skipped_left" || role === "skipped_right") return "✗";
    return null;
  };
  // Direction-arrow row: shows ▶▶▶ from l-edge toward where left_i was found,
  //                     and ◀◀◀ from r-edge toward where right_k was found.
  // Anchored on the OUTSIDE end of each scan so the student sees "scan starts here, lands there".
  const arrowFor = (i) => {
    if (s.kind !== "step") return null;
    if (i === l && (s.row.left >= 0 || s.row.left === -1)) return "▶";  // left scan start
    if (i === r && (s.row.right >= 0 || s.row.right === -1)) return "◀";  // right scan start
    return null;
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, `s = "${str}"`, `s = "${str}"`)}
        subtitle={`(${safe + 1} / ${trace.length})`}
      />

      {/* No legend. The cells below carry all the meaning visually:
          color  → role (yellow=j, red=left_i, green=right_k)
          ▶◀     → scan start direction
          ✗      → scanned-but-skipped
          label  → which name (j / left_i / right_k) */}

      {/* String row with j/left_i/right_k labels + scan footprints (✗) + scan-direction arrows. */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 14 }}>
        {str.split("").map((ch, i) => {
          const role = cellRole(i);
          const labelColor =
            role === "j" ? "#92400e" :
            role === "left_i" ? "#dc2626" :
            role === "right_k" ? "#16a34a" :
            "transparent";
          const arrow = arrowFor(i);
          const overlay = overlayFor(i);
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              {/* Top: scan-direction arrow (▶ at l, ◀ at r) — shows where each scan STARTS. */}
              <div style={{ fontSize: 11, height: 13, fontWeight: 700,
                color: arrow === "▶" ? "#dc2626" : arrow === "◀" ? "#16a34a" : "transparent" }}>
                {arrow || " "}
              </div>
              {/* Role label (j / left_i / right_k) */}
              <div style={{ fontSize: 10, height: 14, fontWeight: 600, color: labelColor }}>
                {labelFor(i) || "·"}
              </div>
              {/* The cell itself with optional ✗ overlay for scanned-but-skipped positions */}
              <div style={cellStyle(i)}>
                {ch}
                {overlay && (
                  <span style={{
                    position: "absolute", top: -3, right: -3, fontSize: 12, fontWeight: 800,
                    color: cellRole(i) === "skipped_left" ? "#dc2626" : "#16a34a",
                    background: "#fff", border: `1.5px solid ${cellRole(i) === "skipped_left" ? "#fca5a5" : "#86efac"}`,
                    width: 14, height: 14, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
                  }}>{overlay}</span>
                )}
              </div>
              <div style={{ fontSize: 9, color: C.dim }}>{i + 1}</div>
            </div>
          );
        })}
      </div>

      {/* Score strip — one card per j tried so far.
          Shows: which j, and where the score COMES FROM as a formula.
          Format:  j=2
                   1×3=3   ⭐
          The "1×3=3" makes it unambiguous that 3 is the SCORE (result of multiplication),
          not the j position.  No prose. */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {perJ.slice(0, s.revealed).map((row) => {
          const isCurrent = s.kind === "step" && row.j === s.row.j;
          const isBest = row.score !== null && row.score === s.best && s.best >= 0;
          // (j - left_i) × (right_k - j) = score
          const f1 = row.left >= 0 ? row.j - row.left : null;
          const f2 = row.right >= 0 ? row.right - row.j : null;
          return (
            <div key={row.j} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              padding: "4px 8px", borderRadius: 8, minWidth: 64,
              background: isBest ? "#dcfce7" : isCurrent ? "#fef3c7" : "#f8fafc",
              border: `${isCurrent ? 2 : 1.5}px solid ${
                isBest ? "#16a34a" : isCurrent ? "#f59e0b" : "#e2e8f0"
              }`,
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              {/* Top: which j this card is about (small, dim) */}
              <div style={{ fontSize: 9.5, color: isCurrent ? "#92400e" : C.dim, fontWeight: 700 }}>
                j = {row.j + 1}
              </div>
              {/* Bottom: the score, shown as a formula so '3' can't be mistaken for j.
                  Uses red/green colored factor numbers matching left_i (red) and right_k (green) cells. */}
              <div style={{
                fontSize: 12, fontWeight: 700, lineHeight: 1.2,
                color: row.score === null ? "#9ca3af" : "#1f2937",
                whiteSpace: "nowrap",
              }}>
                {row.score === null ? (
                  <span style={{ fontSize: 16 }}>✗</span>
                ) : (
                  <>
                    <span style={{ color: "#dc2626" }}>{f1}</span>
                    <span style={{ color: C.dim }}>×</span>
                    <span style={{ color: "#16a34a" }}>{f2}</span>
                    <span style={{ color: C.dim }}>=</span>
                    <span style={{
                      fontSize: 14, fontWeight: 800,
                      color: isBest ? "#15803d" : "#1f2937",
                    }}>{row.score}</span>
                    {isBest && " ⭐"}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Nav */}
      <SharedSimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Mooin3Sim — for each j in [l+1, r-1], find best i and k
   ═══════════════════════════════════════════════════════════════ */
const _M3_PRESETS = [
  { s: "abbab", l: 0, r: 4 },
  { s: "abacaba", l: 0, r: 6 },
  { s: "aaabbb", l: 0, r: 5 },
];

export function Mooin3Sim({ E }) {
  const [pi, setPi] = useState(0);
  const [j, setJ] = useState(2);
  const preset = _M3_PRESETS[pi];
  const s = preset.s;
  const l = preset.l, r = preset.r;
  // ensure j in valid range
  const validJ = Math.max(l + 1, Math.min(r - 1, j));

  // find best i (farthest left with s[i] != s[j])
  let bestI = -1;
  for (let i = l; i < validJ; i++) if (s[i] !== s[validJ]) { bestI = i; break; }
  // find best k (farthest right with s[k] == s[j])
  let bestK = -1;
  for (let k = r; k > validJ; k--) if (s[k] === s[validJ]) { bestK = k; break; }
  const product = (bestI >= 0 && bestK >= 0) ? (validJ - bestI) * (bestK - validJ) : -1;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
        {_M3_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setJ(p.l + 1); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>"{p.s}"</button>
        ))}
      </div>

      {/* Cells with role labels above (j / left_i / right_k) — colors match the score card.
          left_i = RED (consistent with MooTraceSim), j = YELLOW, right_k = GREEN. */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 12 }}>
        {s.split("").map((ch, idx) => {
          const isJ = idx === validJ;
          const isI = idx === bestI;
          const isK = idx === bestK;
          const inRange = idx >= l && idx <= r;
          const lab = isJ ? "j" : isI ? "left_i" : isK ? "right_k" : "";
          const labColor = isJ ? "#92400e" : isI ? "#dc2626" : isK ? "#16a34a" : "transparent";
          return (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ fontSize: 9.5, height: 12, fontWeight: 700, color: labColor, fontFamily: "'JetBrains Mono',monospace" }}>
                {lab || " "}
              </div>
              <div style={{
                width: 30, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                background: isJ ? "#fef3c7" : (isI ? "#fee2e2" : (isK ? "#dcfce7" : (inRange ? "#fff" : "#f3f4f6"))),
                border: `1.5px solid ${isJ ? "#f59e0b" : (isI ? "#dc2626" : (isK ? "#16a34a" : (inRange ? "#cbd5e1" : "#e5e7eb")))}`,
                color: isJ ? "#92400e" : isI ? "#7f1d1d" : isK ? "#15803d" : (inRange ? C.text : "#9ca3af"),
              }}>{ch}</div>
              <div style={{ fontSize: 9, color: C.dim }}>{idx + 1}</div>
            </div>
          );
        })}
      </div>

      {/* j slider — visual control, label shows current j next to thumb. */}
      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.text, marginBottom: 4 }}>
          <span style={{ background: "#fef3c7", border: "1.5px solid #f59e0b", color: "#92400e", padding: "1px 8px", borderRadius: 5, fontWeight: 800 }}>
            j = {validJ + 1}
          </span>
          <span style={{ color: C.dim, fontSize: 10 }}>← →</span>
        </div>
        <input type="range" min={l + 1} max={r - 1} value={validJ} onChange={e => setJ(parseInt(e.target.value))} style={{ width: "100%" }} />
      </div>

      {/* Score card — visual formula, no prose.  Matches the score-strip card style of MooTraceSim. */}
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center", gap: 6,
        background: product >= 0 ? "#dcfce7" : "#fef2f2",
        border: `1.5px solid ${product >= 0 ? "#16a34a" : "#dc2626"}`,
        borderRadius: 10, padding: "8px 14px", fontFamily: "'JetBrains Mono',monospace",
      }}>
        <span style={{ fontSize: 10, color: product >= 0 ? "#15803d" : "#991b1b", fontWeight: 700 }}>
          score
        </span>
        {product >= 0 ? (
          <>
            <span style={{ color: "#dc2626", fontSize: 14, fontWeight: 700 }}>{validJ - bestI}</span>
            <span style={{ color: C.dim }}>×</span>
            <span style={{ color: "#16a34a", fontSize: 14, fontWeight: 700 }}>{bestK - validJ}</span>
            <span style={{ color: C.dim }}>=</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#15803d" }}>{product}</span>
          </>
        ) : (
          <span style={{ fontSize: 22, fontWeight: 800, color: "#dc2626" }}>✗</span>
        )}
      </div>
    </div>
  );
}

export function Mooin3Runner({ E }) {
  // Empty placeholder — actual interactivity lives in Mooin3Sim above.
  return null;
}

/* Section 1: Input — string + queries */
const M3_INPUT_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
];
const M3_INPUT_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
];

/* Section 2: For each query, scan middle j */
const M3_LOOP_PY = (E) => [
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  t(E, "    l -= 1   # convert to 0-based",
        "    l -= 1   # 0-based 로 변환"),
  "    r -= 1",
  "    best = -1",
  "",
  t(E, "    # Try every middle position j; for each, scan left + right.",
        "    # 모든 가운데 자리 j 시도 — j 박힌 동안 왼쪽 + 오른쪽 훑기."),
  "    for j in range(l + 1, r):",
  t(E, "        # left_i = first slot in [l, j) with a DIFFERENT letter from s[j].",
        "        # left_i = [l, j) 에서 s[j] 와 다른 글자가 *처음* 나오는 자리"),
  "        left_i = -1",
  "        for idx in range(l, j):",
  "            if s[idx] != s[j]:",
  "                left_i = idx",
  "                break",
  t(E, "        # right_k = last slot in (j, r] with the SAME letter as s[j].",
        "        # right_k = (j, r] 에서 s[j] 와 같은 글자가 *마지막* 으로 있는 자리"),
  "        right_k = -1",
  "        for idx in range(r, j, -1):",
  "            if s[idx] == s[j]:",
  "                right_k = idx",
  "                break",
];
const M3_LOOP_CPP = (E) => [
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  t(E, "        l--;   // convert to 0-based",
        "        l--;   // 0-based 로 변환"),
  "        r--;",
  "        long long best = -1;",
  "",
  "        for (int j = l + 1; j < r; j++) {",
  t(E, "            // left_i = first slot left of j with a DIFFERENT letter from s[j].",
        "            // left_i = j 왼쪽에서 s[j] 와 다른 글자가 *처음* 나오는 자리"),
  "            int left_i = -1;",
  "            for (int idx = l; idx < j; idx++) {",
  "                if (s[idx] != s[j]) {",
  "                    left_i = idx;",
  "                    break;",
  "                }",
  "            }",
  t(E, "            // right_k = last slot right of j with the SAME letter as s[j].",
        "            // right_k = j 오른쪽에서 s[j] 와 같은 글자가 *마지막* 자리"),
  "            int right_k = -1;",
  "            for (int idx = r; idx > j; idx--) {",
  "                if (s[idx] == s[j]) {",
  "                    right_k = idx;",
  "                    break;",
  "                }",
  "            }",
];

/* Section 3: update best with (j - left_i) * (right_k - j) */
const M3_UPDATE_PY = [
  "        if left_i != -1 and right_k != -1:",
  "            score = (j - left_i) * (right_k - j)",
  "            if score > best:",
  "                best = score",
  "    print(best)",
];
const M3_UPDATE_CPP = [
  "            if (left_i != -1 && right_k != -1) {",
  "                long long score = (long long)(j - left_i) * (right_k - j);",
  "                if (score > best) {",
  "                    best = score;",
  "                }",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const M3_FULL_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1   # 0-based 로 변환",
  "    r -= 1",
  "    best = -1",
  "    # 모든 가운데 자리 j 한 번씩 시도 — j 가 박힌 동안 양쪽으로 훑기.",
  "    for j in range(l + 1, r):",
  "        # 왼쪽 훑기: s[j] 와 다른 글자가 *처음* 나오는 자리 → left_i",
  "        left_i = -1",
  "        for idx in range(l, j):",
  "            if s[idx] != s[j]:",
  "                left_i = idx",
  "                break",
  "        # 오른쪽 훑기: s[j] 와 같은 글자가 *마지막* 으로 있는 자리 → right_k",
  "        right_k = -1",
  "        for idx in range(r, j, -1):",
  "            if s[idx] == s[j]:",
  "                right_k = idx",
  "                break",
  "        if left_i != -1 and right_k != -1:",
  "            score = (j - left_i) * (right_k - j)",
  "            if score > best:",
  "                best = score",
  "    print(best)",
];
const M3_FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--;",
  "        r--;",
  "        long long best = -1;",
  "        for (int j = l + 1; j < r; j++) {",
  "            int left_i = -1;",
  "            for (int idx = l; idx < j; idx++) {",
  "                if (s[idx] != s[j]) {",
  "                    left_i = idx;",
  "                    break;",
  "                }",
  "            }",
  "            int right_k = -1;",
  "            for (int idx = r; idx > j; idx--) {",
  "                if (s[idx] == s[j]) {",
  "                    right_k = idx;",
  "                    break;",
  "                }",
  "            }",
  "            if (left_i != -1 && right_k != -1) {",
  "                long long score = (long long)(j - left_i) * (right_k - j);",
  "                if (score > best) {",
  "                    best = score;",
  "                }",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* ── Step 6 — Stage A: Group by character c (still scans for i, k each query).
       이 단계의 목표: 외곽 루프를 j (N 개) → c (26 개) 로 바꾼다.
       복잡도는 아직 O(Q · 26·N) — 통과는 못 하지만 다음 단계의 발판.        ── */
const M3_STAGE_A_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "# 문자 c 마다 등장 인덱스 미리 모아두기 (왼→오 순서라 자동 정렬).",
  "positions_of = [[] for _ in range(26)]",
  "for idx in range(N):",
  "    positions_of[ord(s[idx]) - 97].append(idx)",
  "",
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1",
  "    r -= 1",
  "    best = -1",
  "    # 핵심 변경: j (N 개) 대신 c (26 개) 로 외곽 루프.",
  "    # 같은 글자 c 인 j 들은 모두 같은 i, k 질문을 함 → 한 번만 답하면 됨.",
  "    for c in range(26):",
  "        ch = chr(c + 97)",
  "        # 가장 왼쪽 i (s[i] ≠ ch) — 매번 스캔 (다음 단계에서 lookup 표로 교체)",
  "        left_i = -1",
  "        for idx in range(l, r):",
  "            if s[idx] != ch:",
  "                left_i = idx",
  "                break",
  "        if left_i == -1:",
  "            continue",
  "        # 가장 오른쪽 k (s[k] = ch) — 매번 스캔",
  "        right_k = -1",
  "        for idx in range(r, left_i, -1):",
  "            if s[idx] == ch:",
  "                right_k = idx",
  "                break",
  "        if right_k <= left_i:",
  "            continue",
  "        # 그 사이의 j 후보들 = positions_of[c] 중 (left_i, right_k) 안",
  "        for j in positions_of[c]:",
  "            if j <= left_i:",
  "                continue",
  "            if j >= right_k:",
  "                break",
  "            product = (j - left_i) * (right_k - j)",
  "            if product > best:",
  "                best = product",
  "    print(best)",
];
const M3_STAGE_A_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
  "",
  "    // 문자 c 마다 등장 인덱스 미리 모아두기 (왼→오 순서라 자동 정렬).",
  "    vector<vector<int>> positions_of(26);",
  "    for (int idx = 0; idx < N; idx++) {",
  "        positions_of[s[idx] - 'a'].push_back(idx);",
  "    }",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--;",
  "        r--;",
  "        long long best = -1;",
  "        // 핵심 변경: j (N 개) 대신 c (26 개) 로 외곽 루프.",
  "        for (int c = 0; c < 26; c++) {",
  "            char ch = 'a' + c;",
  "            // 가장 왼쪽 i (s[i] != ch) — 매번 스캔",
  "            int left_i = -1;",
  "            for (int idx = l; idx < r; idx++) {",
  "                if (s[idx] != ch) {",
  "                    left_i = idx;",
  "                    break;",
  "                }",
  "            }",
  "            if (left_i == -1) {",
  "                continue;",
  "            }",
  "            // 가장 오른쪽 k (s[k] == ch)",
  "            int right_k = -1;",
  "            for (int idx = r; idx > left_i; idx--) {",
  "                if (s[idx] == ch) {",
  "                    right_k = idx;",
  "                    break;",
  "                }",
  "            }",
  "            if (right_k <= left_i) {",
  "                continue;",
  "            }",
  "            // 그 사이의 j 후보들",
  "            for (int j : positions_of[c]) {",
  "                if (j <= left_i) {",
  "                    continue;",
  "                }",
  "                if (j >= right_k) {",
  "                    break;",
  "                }",
  "                long long product = (long long)(j - left_i) * (right_k - j);",
  "                if (product > best) {",
  "                    best = product;",
  "                }",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* ── Step 7 — Stage B: + lookup 표 미리 만들기.
       nearest_diff[c][i] + latest_same[c][i] precompute → i, k 조회 O(1).
       복잡도 O(26·N + Q · |positions[c]|) — 여전히 부족하지만 점점 나아짐.    ── */
const M3_STAGE_B_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "positions_of = [[] for _ in range(26)]",
  "for idx in range(N):",
  "    positions_of[ord(s[idx]) - 97].append(idx)",
  "",
  "# NEW: 두 lookup 표를 한 번만 만들어 둠.",
  "#   nearest_diff[c][i] = idx ≥ i 중 s[idx] ≠ chr(c) 인 가장 작은 idx",
  "#   latest_same[c][i]  = idx ≤ i 중 s[idx] == chr(c) 인 가장 큰 idx",
  "INF = N",
  "nearest_diff = [[INF] * (N + 1) for _ in range(26)]",
  "latest_same  = [[-1]  * (N + 1) for _ in range(26)]",
  "for c in range(26):",
  "    ch = chr(c + 97)",
  "    next_diff_idx = INF",
  "    for idx in range(N - 1, -1, -1):",
  "        if s[idx] != ch:",
  "            next_diff_idx = idx",
  "        nearest_diff[c][idx] = next_diff_idx",
  "    last_same_idx = -1",
  "    for idx in range(N):",
  "        if s[idx] == ch:",
  "            last_same_idx = idx",
  "        latest_same[c][idx] = last_same_idx",
  "",
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1",
  "    r -= 1",
  "    best = -1",
  "    for c in range(26):",
  "        # NEW: 매번 스캔하던 left_i / right_k 가 표 한 번 조회로 끝.",
  "        left_i = nearest_diff[c][l]",
  "        if left_i >= r:",
  "            continue",
  "        right_k = latest_same[c][r]",
  "        if right_k <= left_i:",
  "            continue",
  "        # j 는 여전히 positions_of[c] 모두 순회 (다음 단계에서 binary search 로 압축)",
  "        for j in positions_of[c]:",
  "            if j <= left_i:",
  "                continue",
  "            if j >= right_k:",
  "                break",
  "            product = (j - left_i) * (right_k - j)",
  "            if product > best:",
  "                best = product",
  "    print(best)",
];
const M3_STAGE_B_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
  "",
  "    vector<vector<int>> positions_of(26);",
  "    for (int idx = 0; idx < N; idx++) {",
  "        positions_of[s[idx] - 'a'].push_back(idx);",
  "    }",
  "",
  "    // NEW: 두 lookup 표를 한 번만 만들어 둠.",
  "    int INF = N;",
  "    vector<vector<int>> nearest_diff(26, vector<int>(N + 1, INF));",
  "    vector<vector<int>> latest_same(26, vector<int>(N + 1, -1));",
  "    for (int c = 0; c < 26; c++) {",
  "        char ch = 'a' + c;",
  "        int next_diff_idx = INF;",
  "        for (int idx = N - 1; idx >= 0; idx--) {",
  "            if (s[idx] != ch) {",
  "                next_diff_idx = idx;",
  "            }",
  "            nearest_diff[c][idx] = next_diff_idx;",
  "        }",
  "        int last_same_idx = -1;",
  "        for (int idx = 0; idx < N; idx++) {",
  "            if (s[idx] == ch) {",
  "                last_same_idx = idx;",
  "            }",
  "            latest_same[c][idx] = last_same_idx;",
  "        }",
  "    }",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--;",
  "        r--;",
  "        long long best = -1;",
  "        for (int c = 0; c < 26; c++) {",
  "            // NEW: 표 조회 O(1)",
  "            int left_i = nearest_diff[c][l];",
  "            if (left_i >= r) {",
  "                continue;",
  "            }",
  "            int right_k = latest_same[c][r];",
  "            if (right_k <= left_i) {",
  "                continue;",
  "            }",
  "            for (int j : positions_of[c]) {",
  "                if (j <= left_i) {",
  "                    continue;",
  "                }",
  "                if (j >= right_k) {",
  "                    break;",
  "                }",
  "                long long product = (long long)(j - left_i) * (right_k - j);",
  "                if (product > best) {",
  "                    best = product;",
  "                }",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* ── Step 8 — Stage C (final fast): + 포물선 꼭대기 + binary search.
       f(j) = (j - left_i)(right_k - j) 는 j 에 대한 아래볼록 포물선.
       꼭대기 (left_i + right_k)/2 근처 c_positions 의 후보 2 개만 검사.
       O(26·N + Q · 26·log N) — 통과.                                    ── */
const M3_FAST_PY = [
  "# 손으로 짠 이분 탐색 — 정렬된 리스트에서 target 이상인 첫 위치 반환.",
  "# (커리큘럼: while 루프만 사용. bisect 모듈 import 없음.)",
  "def find_first_at_least(sorted_arr, target, lo, hi):",
  "    while lo < hi:",
  "        mid = (lo + hi) // 2",
  "        if sorted_arr[mid] < target:",
  "            lo = mid + 1",
  "        else:",
  "            hi = mid",
  "    return lo",
  "",
  "# target 보다 *큰* 첫 위치 (등호 자리만 다름).",
  "def find_first_greater_than(sorted_arr, target, lo, hi):",
  "    while lo < hi:",
  "        mid = (lo + hi) // 2",
  "        if sorted_arr[mid] <= target:",
  "            lo = mid + 1",
  "        else:",
  "            hi = mid",
  "    return lo",
  "",
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "# positions_of[c] = 문자 chr(c+97) 가 등장하는 인덱스들 (왼→오 순서라 자동 정렬)",
  "positions_of = [[] for _ in range(26)]",
  "for idx in range(N):",
  "    positions_of[ord(s[idx]) - 97].append(idx)",
  "",
  "# 두 lookup 표:",
  "#   nearest_diff[c][i] = idx ≥ i 중 s[idx] ≠ chr(c) 인 가장 작은 idx",
  "#   latest_same[c][i]  = idx ≤ i 중 s[idx] == chr(c) 인 가장 큰 idx",
  "INF = N",
  "nearest_diff = [[INF] * (N + 1) for _ in range(26)]",
  "latest_same  = [[-1]  * (N + 1) for _ in range(26)]",
  "for c in range(26):",
  "    ch = chr(c + 97)",
  "    next_diff_idx = INF",
  "    for idx in range(N - 1, -1, -1):",
  "        if s[idx] != ch:",
  "            next_diff_idx = idx",
  "        nearest_diff[c][idx] = next_diff_idx",
  "    last_same_idx = -1",
  "    for idx in range(N):",
  "        if s[idx] == ch:",
  "            last_same_idx = idx",
  "        latest_same[c][idx] = last_same_idx",
  "",
  "for q in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1",
  "    r -= 1",
  "    best = -1",
  "    for c in range(26):",
  "        # left_i = (j-i) 최대화하려고 잡는 가장 왼쪽 i (s[i] ≠ chr(c))",
  "        left_i = nearest_diff[c][l]",
  "        if left_i >= r:",
  "            continue",
  "        # right_k = (k-j) 최대화하려고 잡는 가장 오른쪽 k (s[k] == chr(c))",
  "        right_k = latest_same[c][r]",
  "        if right_k <= left_i:",
  "            continue",
  "",
  "        # j 후보들 = positions_of[c] 중 (left_i, right_k) 사이에 있는 것들",
  "        c_positions = positions_of[c]",
  "        n_positions = len(c_positions)",
  "        first_valid = find_first_greater_than(c_positions, left_i, 0, n_positions)",
  "        first_invalid = find_first_at_least(c_positions, right_k, 0, n_positions)",
  "        if first_valid >= first_invalid:",
  "            continue",
  "",
  "        # f(j) = (j - left_i)·(right_k - j) 는 j 에 대한 아래볼록 포물선.",
  "        # 꼭대기 j_peak = (left_i + right_k) / 2.",
  "        # c_positions 에서 j_peak 와 가장 가까운 후보 두 개만 검사.",
  "        j_peak = (left_i + right_k) // 2",
  "        peak_idx = find_first_at_least(c_positions, j_peak, first_valid, first_invalid)",
  "        for cand_idx in (peak_idx, peak_idx - 1):",
  "            if first_valid <= cand_idx < first_invalid:",
  "                j = c_positions[cand_idx]",
  "                product = (j - left_i) * (right_k - j)",
  "                if product > best:",
  "                    best = product",
  "    print(best)",
];
const M3_FAST_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "// 손으로 짠 이분 탐색 — <algorithm> 의 lower_bound 안 써도 같은 일.",
  "// 정렬된 sorted_arr 의 [lo, hi) 구간에서 target 이상인 첫 위치 반환.",
  "int find_first_at_least(const vector<int>& sorted_arr, int target, int lo, int hi) {",
  "    while (lo < hi) {",
  "        int mid = (lo + hi) / 2;",
  "        if (sorted_arr[mid] < target) {",
  "            lo = mid + 1;",
  "        } else {",
  "            hi = mid;",
  "        }",
  "    }",
  "    return lo;",
  "}",
  "",
  "// target 보다 *큰* 첫 위치 (등호 자리만 다름).",
  "int find_first_greater_than(const vector<int>& sorted_arr, int target, int lo, int hi) {",
  "    while (lo < hi) {",
  "        int mid = (lo + hi) / 2;",
  "        if (sorted_arr[mid] <= target) {",
  "            lo = mid + 1;",
  "        } else {",
  "            hi = mid;",
  "        }",
  "    }",
  "    return lo;",
  "}",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
  "",
  "    // positions_of[c] = 문자 ('a'+c) 가 등장하는 인덱스들 (정렬됨)",
  "    vector<vector<int>> positions_of(26);",
  "    for (int idx = 0; idx < N; idx++) {",
  "        positions_of[s[idx] - 'a'].push_back(idx);",
  "    }",
  "",
  "    // 두 lookup 표",
  "    int INF = N;",
  "    vector<vector<int>> nearest_diff(26, vector<int>(N + 1, INF));",
  "    vector<vector<int>> latest_same (26, vector<int>(N + 1, -1));",
  "    for (int c = 0; c < 26; c++) {",
  "        char ch = 'a' + c;",
  "        int next_diff_idx = INF;",
  "        for (int idx = N - 1; idx >= 0; idx--) {",
  "            if (s[idx] != ch) {",
  "                next_diff_idx = idx;",
  "            }",
  "            nearest_diff[c][idx] = next_diff_idx;",
  "        }",
  "        int last_same_idx = -1;",
  "        for (int idx = 0; idx < N; idx++) {",
  "            if (s[idx] == ch) {",
  "                last_same_idx = idx;",
  "            }",
  "            latest_same[c][idx] = last_same_idx;",
  "        }",
  "    }",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--;",
  "        r--;",
  "        long long best = -1;",
  "        for (int c = 0; c < 26; c++) {",
  "            // left_i = (j-i) 최대화하려고 잡는 가장 왼쪽 i (s[i] ≠ ('a'+c))",
  "            int left_i = nearest_diff[c][l];",
  "            if (left_i >= r) {",
  "                continue;",
  "            }",
  "            // right_k = (k-j) 최대화하려고 잡는 가장 오른쪽 k (s[k] == ('a'+c))",
  "            int right_k = latest_same[c][r];",
  "            if (right_k <= left_i) {",
  "                continue;",
  "            }",
  "",
  "            // j 후보들 = positions_of[c] 중 (left_i, right_k) 사이",
  "            int n_positions = positions_of[c].size();",
  "            int first_valid   = find_first_greater_than(positions_of[c], left_i,  0, n_positions);",
  "            int first_invalid = find_first_at_least    (positions_of[c], right_k, 0, n_positions);",
  "            if (first_valid >= first_invalid) {",
  "                continue;",
  "            }",
  "",
  "            // f(j) = (j - left_i)·(right_k - j) 는 아래볼록 포물선.",
  "            // 꼭대기 j_peak = (left_i + right_k) / 2.",
  "            // j_peak 와 가장 가까운 후보 두 개만 검사 (peak_idx, peak_idx - 1).",
  "            int j_peak = (left_i + right_k) / 2;",
  "            int peak_idx = find_first_at_least(positions_of[c], j_peak, first_valid, first_invalid);",
  "            if (peak_idx < first_invalid) {",
  "                int j = positions_of[c][peak_idx];",
  "                long long product = (long long)(j - left_i) * (right_k - j);",
  "                if (product > best) {",
  "                    best = product;",
  "                }",
  "            }",
  "            if (peak_idx - 1 >= first_valid) {",
  "                int j = positions_of[c][peak_idx - 1];",
  "                long long product = (long long)(j - left_i) * (right_k - j);",
  "                if (product > best) {",
  "                    best = product;",
  "                }",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getMooin3Sections(E) {
  return [
    {
      label: t(E, "📦 1. Input + String", "📦 1. 입력 + 문자열"),
      color: A,
      py: M3_INPUT_PY, cpp: M3_INPUT_CPP,
      why: [
        t(E, "Read N, Q, then the whole string s.",
            "N, Q 와 문자열 s 읽기."),
        t(E, "Each query line: l r — both 1-INDEXED. The code converts to 0-indexed (l--, r--) before processing.",
            "각 쿼리 줄: l r — 둘 다 1-INDEXED. 코드에서 0-indexed (l--, r--) 로 변환."),
      ],
      pyOnly: [
        t(E, "input().strip() removes any trailing newline.",
            "input().strip() 으로 줄바꿈 제거."),
      ],
      cppOnly: [
        t(E, "cin >> string reads a whitespace-delimited token (cpp-11 string).",
            "cin >> string 으로 공백 구분 토큰 (cpp-11 string)."),
      ],
      aside: <SampleInputAside E={E} sample={M3_SAMPLE} highlight={[0, 1]} note={t(E,
        "First two lines: \"12 5\" → N=12, Q=5. Then the string.",
        "처음 두 줄: \"12 5\" → N=12, Q=5. 그 다음 문자열.")} />,
    },
    {
      label: t(E, "🔍 2. Fix the Middle j", "🔍 2. 중간 j 고정"),
      color: "#0891b2",
      py: M3_LOOP_PY(E), cpp: M3_LOOP_CPP(E),
      why: [
        t(E, "For each middle j in [l+1, r−1], we want the BEST i to its left and BEST k to its right.",
            "각 중간 j ∈ [l+1, r−1] 에 대해, 왼쪽 최선 i 와 오른쪽 최선 k 찾기."),
        t(E, "Best i = SMALLEST index with s[i] ≠ s[j] (smaller i → bigger j−i).",
            "최선 i = s[i] ≠ s[j] 인 가장 작은 인덱스 (i 작을수록 j−i 커짐)."),
        t(E, "Best k = LARGEST index with s[k] == s[j] (bigger k → bigger k−j).",
            "최선 k = s[k] == s[j] 인 가장 큰 인덱스 (k 클수록 k−j 커짐)."),
      ],
      pyOnly: [
        t(E, "Plain for-loop with break gives the first match — uses only Python lesson 13/14 syntax.",
            "for + break 로 첫 매칭 — Python 레슨 13/14 문법만 사용."),
      ],
      cppOnly: [
        t(E, "Inner loop with break — uses only cpp-7 (loops) + cpp-11 (string indexing).",
            "for + break 내부 루프 — cpp-7 (루프) + cpp-11 (문자열 인덱싱) 만 사용."),
      ],
    },
    {
      label: t(E, "🏆 3. Update Best Product", "🏆 3. 최댓값 갱신"),
      color: "#16a34a",
      py: M3_UPDATE_PY, cpp: M3_UPDATE_CPP,
      why: [
        t(E, "If both i and k exist, compute (j − i) × (k − j) and keep the maximum.",
            "i 와 k 둘 다 존재하면 (j − i) × (k − j) 계산해 최댓값 갱신."),
        t(E, "If no valid triplet in the range, best stays −1 → print −1.",
            "범위에 유효 triplet 없으면 best 는 −1 → −1 출력."),
      ],
      cppOnly: [
        t(E, "Why long long? With N up to 10⁵, (j−i) and (k−j) can each be up to 10⁵ → product up to 10¹⁰, larger than int's max (~2·10⁹). Casting one operand to long long forces the multiplication to use long long.",
            "왜 long long? N 최대 10⁵, (j−i) 와 (k−j) 각각 최대 10⁵ → 곱 최대 10¹⁰, int 최대값 (~2·10⁹) 초과. 한 쪽을 long long 캐스팅하면 곱이 long long 으로 계산됨."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code (brute)", "🎯 4. 전체 코드 (brute)"),
      color: "#7c3aed",
      py: M3_FULL_PY, cpp: M3_FULL_CPP,
      why: [
        t(E, "All four parts wired together. Reads input, walks every j, tracks the best product.",
            "네 조각이 합쳐진 모습. 입력 읽고, 모든 j 훑고, 최고 곱 추적."),
        t(E, "Try it on the official sample first — small N, instant. Then think about big inputs.",
            "공식 샘플 먼저 시도 — N 작아서 즉시. 그 다음 큰 입력 생각."),
      ],
    },
    /* ── 5–8: appears AFTER the brute is written. Now we ask: what about big N? ── */
    {
      label: t(E, "5️⃣ What if N is big?", "5️⃣ N 이 크면 어떻게 될까?"),
      color: "#dc2626",
      // 같은 brute 코드를 다시 보여주고 — 이번엔 분석.
      py: M3_FULL_PY, cpp: M3_FULL_CPP,
      why: [
        t(E, "The inner two scans (left for i, right for k) walk the array — O(N) each, so per-j work is O(N).",
            "안쪽 두 스캔 (왼쪽으로 i, 오른쪽으로 k) 가 배열을 훑어요 — 각 O(N), j 마다 O(N) 일."),
        t(E, "Outer j loop runs O(N) times per query → O(N²) per query.",
            "바깥 j 루프가 쿼리당 O(N) 번 → 쿼리당 O(N²)."),
        t(E, "Q queries → total O(Q · N²). At N = 10⁵ and Q = 3·10⁴ that's ~3·10¹⁴ — way too slow.",
            "Q 쿼리 → 총 O(Q · N²). N = 10⁵, Q = 3·10⁴ 면 ~3·10¹⁴ — 너무 느려요."),
        t(E, "Verified actual USACO submission: Python brute (O(N) per query) → 3/11 PASS. C++ brute (O(N²)) → 4/11 PASS. Small-N test cases pass; large-N cases TLE. We'll fix the rest next.",
            "USACO 실제 제출 검증: Python brute (쿼리당 O(N)) → 3/11 통과. C++ brute (O(N²)) → 4/11 통과. N 작은 테스트는 통과, N 큰 테스트는 TLE. 나머지는 다음 단계에서."),
      ],
    },
    /* ── 6️⃣ Stage A: 외곽 루프를 j → c (26 개) 로 ── */
    {
      label: t(E, "6️⃣ Group j by character c — 26 candidates instead of N",
                  "6️⃣ j 대신 글자 c 26 개로 묶기"),
      color: "#0891b2",
      py: M3_STAGE_A_PY, cpp: M3_STAGE_A_CPP,
      why: [
        t(E, "Key observation: every j with s[j] = c asks the SAME left/right scan question (find leftmost i with s[i] ≠ c, rightmost k with s[k] = c).",
            "핵심 관찰: s[j] = c 인 모든 j 가 같은 좌/우 스캔 질문을 함 (s[i] ≠ c 인 가장 왼쪽 i, s[k] = c 인 가장 오른쪽 k)."),
        t(E, "So loop the OUTER over c (just 26 letters) instead of j (N positions).  Inside each c, iterate positions_of[c] to find the best j.",
            "외곽 루프를 c (26 글자) 로 — j (N 개) 대신. c 안에서 positions_of[c] 를 돌며 best j 를 찾음."),
        t(E, "Per query still O(26·N) because we scan to find left_i / right_k each time. Conceptual win, not yet a speed win — but the next step plugs that hole.",
            "쿼리당 아직 O(26·N) — 매번 left_i / right_k 를 스캔해서. 개념 압축은 끝, 속도 압축은 다음 단계."),
      ],
    },

    /* ── 7️⃣ Stage B: lookup 표 미리 만들기 ── */
    {
      label: t(E, "7️⃣ Precompute i, k tables — O(1) lookup per query",
                  "7️⃣ i, k lookup 표 미리 만들기 — 쿼리당 O(1) 조회"),
      color: "#7c3aed",
      py: M3_STAGE_B_PY, cpp: M3_STAGE_B_CPP,
      why: [
        t(E, "Build two tables ONCE before any query: nearest_diff[c][i] (smallest idx ≥ i with s[idx] ≠ c) and latest_same[c][i] (largest idx ≤ i with s[idx] = c).",
            "쿼리 전에 한 번만: nearest_diff[c][i] (idx ≥ i 중 s[idx] ≠ c 인 가장 작은 idx) 와 latest_same[c][i] (idx ≤ i 중 s[idx] = c 인 가장 큰 idx) 표 작성."),
        t(E, "Precompute is O(26·N).  Per query, getting (left_i, right_k) for each c is now a single table lookup — no scan.",
            "Precompute O(26·N). 쿼리에선 c 마다 (left_i, right_k) 가 표 한 번 조회로 끝 — 스캔 없음."),
        t(E, "But we still iterate every position in positions_of[c] to find best j — per query O(N) total. One more leap to go.",
            "그래도 best j 를 찾으려고 positions_of[c] 를 다 도는 건 그대로 — 쿼리당 O(N). 마지막 한 걸음 남음."),
      ],
      aside: <M3InsightAside E={E} />,
    },

    /* ── 8️⃣ Stage C: 포물선 꼭대기 + binary search → 최종 ── */
    {
      label: t(E, "8️⃣ Parabola peak + binary search — only 2 j candidates per c",
                  "8️⃣ 포물선 꼭대기 + 이분 탐색 — c 마다 후보 j 2 개만"),
      color: "#15803d",
      py: M3_FAST_PY, cpp: M3_FAST_CPP,
      why: [
        t(E, "With c (and thus left_i, right_k) fixed, f(j) = (j − left_i)·(right_k − j) is a downward parabola in j, peaking at (left_i + right_k) / 2.",
            "c 가 정해지면 left_i, right_k 도 정해짐. f(j) = (j − left_i)·(right_k − j) 는 j 에 대한 아래볼록 포물선, 꼭대기 (left_i + right_k) / 2."),
        t(E, "So the best j in positions_of[c] is whichever of the 2 entries closest to that peak is biggest.  Find them with a hand-written binary search (find_first_at_least).",
            "그래서 positions_of[c] 안 best j 는 꼭대기에 가장 가까운 항목 2 개 중 큰 쪽. 손으로 짠 이분 탐색 (find_first_at_least) 으로 찾음."),
        t(E, "Per query: 26 chars × O(log N) ≈ 442 ops.  Total ≈ 1.3·10⁷ — fits comfortably in Python and C++.",
            "쿼리당: 26 문자 × O(log N) ≈ 442 연산. 총 ≈ 1.3·10⁷ — Python, C++ 모두 여유."),
      ],
      pyOnly: [
        t(E, "Hand-written find_first_at_least + find_first_greater_than — uses only Python lesson 14 (while) syntax, no bisect import.",
            "손으로 짠 find_first_at_least + find_first_greater_than — Python 레슨 14 (while) 만 사용, bisect import 없이."),
      ],
      cppOnly: [
        t(E, "Hand-written binary search — same shape as <algorithm>'s lower_bound / upper_bound, but pure cpp-7 (loops). Avoids any STL algorithm.",
            "손으로 짠 이분 탐색 — <algorithm> 의 lower_bound / upper_bound 와 같은 모양이지만 cpp-7 (루프) 만으로 작성. STL algorithm 안 씀."),
      ],
      aside: <M3PerfFastAside E={E} />,
    },
  ];
}

/* ── Asides for steps 5/6/7 ── */
const M3PerfAside = ({ E }) => (
  <div style={{
    background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#7f1d1d",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#991b1b", marginBottom: 6 }}>
      🐌 {t(E, "Operation count (brute O(Q · N²))", "연산량 (brute O(Q · N²))")}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px" }}>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N, Q ≤ 50</code>
      <div>{t(E, "1.25·10⁵ — instant ✓", "1.25·10⁵ — 즉시 ✓")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>Q=1, N=10⁵</code>
      <div>{t(E, "10¹⁰ — TLE 🚫", "10¹⁰ — TLE 🚫")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>full N, Q</code>
      <div>{t(E, "3·10¹⁴ — TLE 🚫", "3·10¹⁴ — TLE 🚫")}</div>
    </div>
    {/* 실제 검증된 USACO 제출 결과 */}
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fca5a5", fontSize: 11 }}>
      <b>{t(E, "Actual USACO submission (verified)", "실제 USACO 제출 (검증됨)")}</b>:{" "}
      {t(E, "Python brute → 3/11 PASS · C++ brute → 4/11 PASS",
            "Python brute → 3/11 통과 · C++ brute → 4/11 통과")}
    </div>
  </div>
);

const M3PerfFastAside = ({ E }) => (
  <div style={{
    background: "#dcfce7", border: "1.5px solid #86efac", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#14532d",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>
      ⚡ {t(E, "Operation count (smart)", "연산량 (smart)")}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px" }}>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>{t(E, "precompute", "표 만들기")}</code>
      <div>{t(E, "26·N ≈ 2.6·10⁶ — fast ✓", "26·N ≈ 2.6·10⁶ — 빠름 ✓")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>{t(E, "per query", "쿼리당")}</code>
      <div>{t(E, "26·log N ≈ 442 — instant ✓", "26·log N ≈ 442 — 즉시 ✓")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>{t(E, "total", "총합")}</code>
      <div>{t(E, "≈ 1.3·10⁷ ops — fits ✓", "≈ 1.3·10⁷ — 통과 ✓")}</div>
    </div>
  </div>
);

const M3InsightAside = ({ E }) => (
  <div style={{
    background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#065f46",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#065f46", marginBottom: 6 }}>
      💡 {t(E, "Same character → same answer", "같은 문자 → 같은 답")}
    </div>
    <div>
      {t(E,
        "If s[j] = 'b' for many j, all those j's ask the SAME left/right scan question. Compute once per character.",
        "여러 j 에서 s[j] = 'b' 이면, 그 j 들이 같은 왼/오 스캔 질문을 함. 문자마다 한 번만.")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #6ee7b7", fontSize: 11 }}>
      {t(E, "Per query work: O(N²) → O(N).", "쿼리당 일: O(N²) → O(N).")}
    </div>
  </div>
);

const M3PeakAside = ({ E }) => (
  <div style={{
    background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#7c2d12",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>
      📈 {t(E, "Why a parabola?", "왜 포물선?")}
    </div>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, marginBottom: 6 }}>
      f(j) = (j − i)(k − j)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;= −j² + (i+k)j − ik
    </div>
    <div style={{ marginBottom: 6 }}>
      {t(E,
        "Coefficient of j² is −1 → opens DOWN. Maximum at the vertex j = (i + k)/2.",
        "j² 계수 −1 → 아래로 볼록. 꼭대기 j = (i + k)/2.")}
    </div>
    <div style={{ paddingTop: 6, borderTop: "1px dashed #fbbf24", fontSize: 11 }}>
      {t(E,
        "Constraint: j ∈ positions[c] (so s[j] = c).  Hand-written binary search picks the closest valid j to the vertex — only two candidates.",
        "조건: j ∈ positions[c] (s[j] = c). 손으로 짠 이분 탐색으로 vertex 와 가장 가까운 j — 후보 2 개.")}
    </div>
  </div>
);

const M3FastAside = ({ E }) => (
  <div style={{
    background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#1e3a8a",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#1e40af", marginBottom: 6 }}>
      ✅ {t(E, "Three pieces working together", "세 조각의 합")}
    </div>
    <div style={{ marginBottom: 4 }}>
      <b>positions[c]</b>{" "}
      {t(E, "→ sorted list of j with s[j] = c.",
            "→ s[j] = c 인 j 의 정렬 리스트.")}
    </div>
    <div style={{ marginBottom: 4 }}>
      <b>first_diff / last_same</b>{" "}
      {t(E, "→ give i, k in O(1) per (c, l, r).",
            "→ (c, l, r) 마다 i, k 를 O(1).")}
    </div>
    <div>
      <b>{t(E, "binary search", "이분 탐색")}</b>{" "}
      {t(E, "→ hand-written find_first_at_least picks best j near (i+k)/2 in positions[c] — O(log N).",
            "→ 손으로 짠 find_first_at_least 로 positions[c] 에서 (i+k)/2 근처 j — O(log N).")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #93c5fd", fontSize: 11 }}>
      {t(E, "Total: O(26·N) build + O(Q · 26 · log N) queries ≈ 1.3·10⁷. Both Python and C++ comfortable.",
            "총: O(26·N) 만들기 + O(Q · 26 · log N) 쿼리 ≈ 1.3·10⁷. Python 도 C++ 도 여유.")}
    </div>
  </div>
);

export function Mooin3ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#7c5cfc" />;
}

const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set"];
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

export function downloadMooin3PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mooin' Time III — Full Study Guide", "🐄 Mooin' Time III — 종합 풀이 노트");
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
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2025 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
