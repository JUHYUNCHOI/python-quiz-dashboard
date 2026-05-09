/* ================================================================
   FavPerm2 components — re-exported from permutation/ to keep the
   two quests fully synchronized (FavPerm2 is a duplicate of the
   USACO Open 2024 Bronze #3 problem).

   Any visualization / progressive-code / PDF improvement made in
   permutation/components.jsx flows through here automatically.

   Note: FavPerm2 also adds ONE local sim — DeepAuditSim — that
   audits a candidate p against the target h step-by-step (deeper
   than the brute-force enumerator: it shows hint-by-hint why a
   candidate passes or fails). Lives only here so the original
   permutation quest stays untouched.
   ================================================================ */

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { SimNav, useTraceStep, StepHeader, NarrativePanel } from "@/components/quest/TraceStepper";

export {
  getPermSections as getFavPerm2Sections,
  PermProgressiveCode as FavPerm2ProgressiveCode,
  downloadPermPDF as downloadFavPerm2PDF,
} from "../permutation/components";

const A = "#7c5cfc";

/* ═══════════════════════════════════════════════════════════════
   DeepAuditSim — pick a candidate p, audit its dismantle output
   AGAINST the target h hint-by-hint. The student sees, for each
   step Nhoj would take:
     • which value gets written
     • whether that value matches the corresponding h[i]
     • where (if anywhere) the audit fails
   Three candidates wrt h = [2, 1, 1]:
     - [3,1,2,4]  → fully matches (the correct lex-smallest p)
     - [4,1,2,3]  → matches first 2 hints, mismatches the 3rd
     - [1,2,3,4]  → mismatches on the very first hint
   ═══════════════════════════════════════════════════════════════ */
function buildAuditTrace(initial, targetH) {
  let p = [...initial];
  const trace = [{
    sub: "init", p: [...p], h: [], hi: 0, lastWritten: null,
    passed: 0, failed: false, failedAt: null, failedExpect: null, failedGot: null, done: false,
  }];
  const h = [];
  let hi = 0;
  let failed = false;
  let failedAt = null;
  let failedExpect = null;
  let failedGot = null;

  while (p.length > 1 && !failed) {
    const first = p[0], last = p[p.length - 1];
    const firstWins = first > last;
    const removeIdx = firstWins ? 0 : p.length - 1;
    const writeIdx = firstWins ? 1 : p.length - 2;
    const removedVal = p[removeIdx];
    const written = p[writeIdx];

    // 1) compare-mark
    trace.push({
      sub: "compare", p: [...p], h: [...h], hi,
      compareFirst: first, compareLast: last, firstWins,
      passed: hi, failed: false,
    });
    // 2) propose-write
    trace.push({
      sub: "propose", p: [...p], h: [...h], hi,
      compareFirst: first, compareLast: last, firstWins,
      removeIdx, writeIdx, removedVal, willWrite: written,
      passed: hi, failed: false,
    });
    // 3) audit: compare against targetH[hi]
    const expect = targetH[hi];
    const ok = written === expect;
    if (ok) {
      h.push(written);
      p.splice(removeIdx, 1);
      trace.push({
        sub: "match", p: [...p], h: [...h], hi: hi + 1,
        lastWritten: written, expect, ok: true,
        passed: hi + 1, failed: false,
      });
      hi += 1;
    } else {
      failed = true;
      failedAt = hi;
      failedExpect = expect;
      failedGot = written;
      trace.push({
        sub: "mismatch", p: [...p], h: [...h], hi,
        lastWritten: written, expect, ok: false,
        removeIdx, writeIdx, removedVal,
        passed: hi, failed: true, failedAt, failedExpect, failedGot,
      });
    }
  }
  if (!failed) {
    trace.push({
      sub: "done", p: [...p], h: [...h], hi,
      passed: hi, failed: false, done: true,
    });
  }
  return { trace, failed, failedAt, failedExpect, failedGot };
}

const CANDIDATES = [
  { key: "win",      p: [3, 1, 2, 4], label: { en: "[3, 1, 2, 4]  (lex-smallest match)", ko: "[3, 1, 2, 4]  (사전순 최소 정답)" } },
  { key: "near",     p: [4, 1, 2, 3], label: { en: "[4, 1, 2, 3]  (close — fails late)", ko: "[4, 1, 2, 3]  (근접 — 후반 실패)" } },
  { key: "wrong",    p: [1, 2, 3, 4], label: { en: "[1, 2, 3, 4]  (fails first hint)",  ko: "[1, 2, 3, 4]  (첫 힌트부터 실패)" } },
];

export function DeepAuditSim({ E }) {
  const targetH = [2, 1, 1];
  const [candKey, setCandKey] = useState("win");
  const cand = CANDIDATES.find(c => c.key === candKey) || CANDIDATES[0];
  const { trace } = buildAuditTrace(cand.p, targetH);
  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];

  const cellStyle = (kind) => ({
    width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 7, fontWeight: 700, fontSize: 16, fontFamily: "'JetBrains Mono',monospace",
    background:
      kind === "remove"   ? "#fee2e2" :
      kind === "write-ok" ? "#dcfce7" :
      kind === "write-no" ? "#fee2e2" :
      kind === "compare"  ? "#fef3c7" :
      kind === "final"    ? "#dcfce7" : "#fff",
    border: `2.5px solid ${
      kind === "remove"   ? "#dc2626" :
      kind === "write-ok" ? "#16a34a" :
      kind === "write-no" ? "#dc2626" :
      kind === "compare"  ? "#f59e0b" :
      kind === "final"    ? "#16a34a" : "#c4b5fd"
    }`,
    color:
      kind === "remove"   ? "#7f1d1d" :
      kind === "write-ok" ? "#15803d" :
      kind === "write-no" ? "#991b1b" :
      kind === "compare"  ? "#92400e" :
      kind === "final"    ? "#15803d" : "#5b21b6",
    textDecoration: kind === "remove" ? "line-through" : "none",
    transition: "all .2s",
  });

  // Render the target h with: passed (green), current (yellow), pending (gray), failed-at (red).
  const renderTargetCell = (v, i) => {
    const passed = i < s.passed;
    const failed = s.failed && i === s.failedAt;
    const current = !s.failed && !s.done && i === s.hi && (s.sub === "compare" || s.sub === "propose");
    const bg = failed ? "#fee2e2" : passed ? "#dcfce7" : current ? "#fef3c7" : "#f3f4f6";
    const bd = failed ? "#dc2626" : passed ? "#16a34a" : current ? "#f59e0b" : "#cbd5e1";
    const fg = failed ? "#991b1b" : passed ? "#15803d" : current ? "#92400e" : "#94a3b8";
    return (
      <div key={i} style={{
        width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 6, fontWeight: 700, fontSize: 13, fontFamily: "'JetBrains Mono',monospace",
        background: bg, border: `2px solid ${bd}`, color: fg,
      }}>{v}</div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, "Deep audit: dismantle a candidate against target h",
                    "딥 오딧: 후보 p 의 dismantle 을 목표 h 와 한 칸씩 대조")}
        subtitle={t(E, `Pick a candidate, then ▶ to audit hint by hint. (${safe + 1} / ${trace.length})`,
                       `후보를 고른 뒤 ▶ 으로 한 힌트씩 검증. (${safe + 1} / ${trace.length})`)}
      />

      {/* Candidate picker */}
      <div style={{
        background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6 }}>
          🧪 {t(E, "Candidate p to audit", "검증할 후보 p")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {CANDIDATES.map(c => (
            <label key={c.key} style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 12,
              cursor: "pointer", padding: "4px 6px", borderRadius: 6,
              background: candKey === c.key ? "#ede9fe" : "transparent",
              color: candKey === c.key ? "#5b21b6" : C.text,
              fontWeight: candKey === c.key ? 700 : 500,
            }}>
              <input
                type="radio"
                name="favperm2-audit-cand"
                value={c.key}
                checked={candKey === c.key}
                onChange={() => { setCandKey(c.key); ts.setIdx(0); }}
                style={{ accentColor: A }}
              />
              <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                {E ? c.label.en : c.label.ko}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Target h reference */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: C.dim, fontWeight: 700 }}>
          🎯 {t(E, "target h", "목표 h")} =
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {targetH.map((v, i) => renderTargetCell(v, i))}
        </div>
      </div>

      {/* Live p row */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", alignItems: "center", marginBottom: 10, minHeight: 60 }}>
        {s.p.map((v, i) => {
          const isFirst = i === 0;
          const isLast = i === s.p.length - 1;
          let kind = "neutral";
          if (s.sub === "done") kind = "final";
          else if (s.sub === "propose") {
            if (i === s.removeIdx) kind = "remove";
            else if (i === s.writeIdx) kind = "compare";
          } else if (s.sub === "mismatch") {
            if (i === s.removeIdx) kind = "remove";
            else if (i === s.writeIdx) kind = "write-no";
          } else if (s.sub === "compare" && (isFirst || isLast)) {
            kind = "compare";
          }
          return (
            <div key={i} style={cellStyle(kind)}>{v}</div>
          );
        })}
        {s.p.length === 0 && (
          <div style={{ fontSize: 12, color: C.dim, fontStyle: "italic" }}>
            {t(E, "(p fully consumed)", "(p 모두 소진)")}
          </div>
        )}
      </div>

      {/* Produced hints so far vs target */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 4, alignItems: "center", marginBottom: 10,
        fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.dim, fontWeight: 700,
      }}>
        <div>
          {t(E, "produced ", "생성 ")}h ={" "}
          <b style={{ color: s.failed ? "#991b1b" : "#15803d" }}>
            [{(s.h || []).join(", ")}{s.sub === "mismatch" ? `, ${s.lastWritten}❌` : ""}]
          </b>
        </div>
      </div>

      {/* Step explanation */}
      <NarrativePanel minHeight={92} stepKey={ts.safe}>
        {s.sub === "init" && (
          <>
            <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
              📦 {t(E, "Initial state", "초기 상태")}
            </div>
            <div>{t(E,
              `Candidate p = [${cand.p.join(", ")}]. Target h = [${targetH.join(", ")}]. Press ▶ to start auditing.`,
              `후보 p = [${cand.p.join(", ")}]. 목표 h = [${targetH.join(", ")}]. ▶ 눌러서 검증 시작.`)}</div>
          </>
        )}
        {s.sub === "compare" && (
          <>
            <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
              1️⃣ {t(E, `Step ${s.hi + 1}: compare ends`, `${s.hi + 1} 단계: 양 끝 비교`)}
            </div>
            <div>
              first = <b style={{ color: "#92400e" }}>{s.compareFirst}</b>,{" "}
              last = <b style={{ color: "#92400e" }}>{s.compareLast}</b>{" "}
              → {s.firstWins
                ? t(E, "first is bigger → drop first, write 2nd from front.",
                       "맨 앞이 더 커요 → 맨 앞 제거, 앞에서 둘째 적기.")
                : t(E, "last is bigger (or equal) → drop last, write 2nd from back.",
                       "맨 뒤가 더 (같거나) 커요 → 맨 뒤 제거, 끝에서 둘째 적기.")}
            </div>
          </>
        )}
        {s.sub === "propose" && (
          <>
            <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
              2️⃣ {t(E, "Propose hint", "힌트 제안")}
            </div>
            <div>
              {t(E, "Nhoj would write ", "Nhoj 가 적을 값: ")}
              <b style={{ color: "#7c3aed", fontFamily: "'JetBrains Mono',monospace" }}>{s.willWrite}</b>.
              {" "}
              {t(E, `Target says h[${s.hi}] = `, `목표는 h[${s.hi}] = `)}
              <b style={{ color: "#92400e", fontFamily: "'JetBrains Mono',monospace" }}>{targetH[s.hi]}</b>.
              {" "}
              {t(E, "(▶ to audit.)", "(▶ 눌러서 검증.)")}
            </div>
          </>
        )}
        {s.sub === "match" && (
          <>
            <div style={{ fontWeight: 700, color: "#15803d", marginBottom: 4 }}>
              ✅ {t(E, `Hint ${s.hi} matches`, `힌트 ${s.hi} 통과`)}
            </div>
            <div>
              {t(E, "wrote ", "")}<b>{s.lastWritten}</b>
              {t(E, ` — equals h[${s.hi - 1}]. p shrank, audit moves on.`,
                    ` — h[${s.hi - 1}] 와 일치. p 가 줄고, 다음 힌트로.`)}
            </div>
          </>
        )}
        {s.sub === "mismatch" && (
          <>
            <div style={{ fontWeight: 700, color: "#991b1b", marginBottom: 4 }}>
              ❌ {t(E, `Mismatch at h[${s.failedAt}]`, `h[${s.failedAt}] 에서 불일치`)}
            </div>
            <div>
              {t(E, "Nhoj would write ", "")}
              <b style={{ color: "#dc2626" }}>{s.failedGot}</b>
              {t(E, ` but target h[${s.failedAt}] = `, ` 인데 목표 h[${s.failedAt}] = `)}
              <b style={{ color: "#92400e" }}>{s.failedExpect}</b>.
              {" "}
              {t(E, "This candidate cannot be the answer — brute force will skip it.",
                    "이 후보는 답이 될 수 없어요 — 브루트포스가 건너뛰어요.")}
            </div>
          </>
        )}
        {s.sub === "done" && (
          <>
            <div style={{ fontWeight: 700, color: "#15803d", marginBottom: 4 }}>
              🎉 {t(E, "Audit passed — every hint matched", "모든 힌트 통과 — 검증 성공")}
            </div>
            <div>
              {t(E, "produced h = ", "생성 h = ")}
              <b style={{ fontFamily: "'JetBrains Mono',monospace", color: "#15803d" }}>
                [{s.h.join(", ")}]
              </b>
              {" "}
              {t(E, "= target. Candidate p is valid.", "= 목표. 이 후보는 유효해요.")}
            </div>
          </>
        )}
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
