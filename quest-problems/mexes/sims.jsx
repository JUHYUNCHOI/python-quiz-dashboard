// Stepped speech-bubble sims for mexes — checkups 스타일 (말풍선 한 단계씩).
// 핵심: 목표 mex=i 만들기 = max(빠진 값 수, i 의 개수). '더하기 아니라 max' 를 시뮬로.
import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

const A = "#7c3aed";                       // mexes 보라 액센트
const _A = [2, 2, 2, 0];                   // 공식 샘플 배열
const _N = _A.length;
const _TARGETS = [0, 1, 2, 3, 4];

const _cnt = (v) => _A.filter((x) => x === v).length;

function _buildTarget(m) {
  const needVals = []; for (let v = 0; v < m; v++) needVals.push(v);
  const missingVals = needVals.filter((v) => _cnt(v) === 0);
  const missing = missingVals.length;
  const copies = _cnt(m);
  const ops = Math.max(missing, copies);
  return { m, needVals, missingVals, missing, copies, ops };
}

/* ════════════════════════════════════════════════════════════════════
   MexesMaxSim — 목표 mex 하나를 골라 '채우기 + 제거 → max' 를 한 단계씩.
   ════════════════════════════════════════════════════════════════════ */
export function MexesMaxSim({ E }) {
  const [ti, setTi] = useState(2);   // 기본 목표 mex=2 (max not sum 이 제일 잘 보임)
  const m = _TARGETS[ti];
  const info = _buildTarget(m);

  const steps = [];
  steps.push({ kind: "need", reveal: { need: true },
    bubble: m === 0
      ? t(E, `Target mex=0: NO value needs to be present, but 0 must be ABSENT.`,
            `목표 mex=0: 꼭 있어야 할 값은 없고, 0 은 없어야 해요.`)
      : t(E, `Target mex=${m}: 0…${m - 1} must ALL be present, and ${m} must be ABSENT.`,
            `목표 mex=${m}: 0…${m - 1} 은 다 있어야 하고, ${m} 은 없어야 해요.`) });
  steps.push({ kind: "fill", reveal: { need: true, fill: true },
    bubble: t(E,
      `Fill: which of 0…${m - 1} are missing? ${info.missing ? info.missingVals.join(", ") : "none"} → ${info.missing} to add.`,
      `채우기: 0…${m - 1} 중 빠진 값? ${info.missing ? info.missingVals.join(", ") : "없음"} → ${info.missing}개 채워야.`) });
  steps.push({ kind: "remove", reveal: { need: true, fill: true, remove: true },
    bubble: t(E,
      `Remove: ${m} appears ${info.copies} time${info.copies === 1 ? "" : "s"} in the array → change them all to something else.`,
      `제거: ${m} 이 배열에 ${info.copies}개 → 전부 다른 값으로 바꿔야.`) });
  steps.push({ kind: "max", reveal: { need: true, fill: true, remove: true, ops: true },
    bubble: (info.missing > 0 && info.copies > 0)
      ? t(E, `Adding gives ${info.missing}+${info.copies}=${info.missing + info.copies}. But changing one ${m} INTO a missing value does BOTH jobs at once → max(${info.missing}, ${info.copies}) = ${info.ops}.`,
            `더하면 ${info.missing}+${info.copies}=${info.missing + info.copies}. 근데 ${m} 하나를 빠진 값으로 바꾸면 두 일을 동시에! → max(${info.missing}, ${info.copies}) = ${info.ops}.`)
      : t(E, `Only one side has work → max(${info.missing}, ${info.copies}) = ${info.ops}.`,
            `한 쪽만 일이 있어요 → max(${info.missing}, ${info.copies}) = ${info.ops}.`) });
  steps.push({ kind: "done", reveal: { need: true, fill: true, remove: true, ops: true, done: true },
    bubble: t(E, `Min operations for mex=${m} = max(fill ${info.missing}, remove ${info.copies}) = ${info.ops}.`,
                 `mex=${m} 최소 연산 = max(채우기 ${info.missing}, 제거 ${info.copies}) = ${info.ops}.`) });

  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(idx, steps.length - 1)];
  const rv = st.reveal;

  const TW = 44, GAP = 8;
  const arrCell = (v, i) => {
    const isCopy = rv.remove && v === m;       // 제거 대상
    return (
      <div key={i} style={{
        width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 18,
        background: isCopy ? "#fff7ed" : "#f5f3ff", color: isCopy ? "#9a3412" : "#5b21b6",
        border: `2px solid ${isCopy ? "#ea580c" : "#c4b5fd"}`,
        boxShadow: isCopy ? "0 0 0 3px rgba(234,88,12,.15)" : "none", transition: "all .2s",
      }}>{v}{isCopy && <span style={{ position: "absolute", marginTop: -38, marginLeft: 30, fontSize: 12 }}>✕</span>}</div>
    );
  };

  const chip = (label, val, color, bg, bd, show) => (
    <div style={{ background: show ? bg : "#f8fafc", border: `1.5px solid ${show ? bd : C.border}`, color: show ? color : C.dim, borderRadius: 999, padding: "5px 13px", fontSize: 12, fontWeight: 800, transition: "all .2s" }}>
      {label} <span style={{ fontSize: 15 }}>{show ? val : "?"}</span>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 8, wordBreak: "keep-all" }}>
        🎯 {t(E, "Min ops for a target mex = max(fill, remove)", "목표 mex 최소 연산 = max(채우기, 제거)")}
      </div>

      {/* 목표 mex 버튼 */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: C.dim }}>{t(E, "target mex", "목표 mex")}</span>
        {_TARGETS.map((tg, i) => (
          <button key={i} onClick={() => { setTi(i); setIdx(0); }} style={{ width: 30, height: 30, borderRadius: 8, fontSize: 13, fontWeight: 800, border: `1.5px solid ${ti === i ? A : C.border}`, background: ti === i ? "#f5f3ff" : "#fff", color: ti === i ? A : C.text, cursor: "pointer" }}>
            {tg}
          </button>
        ))}
      </div>

      {/* 말풍선 */}
      <div style={{ maxWidth: 540, margin: "0 auto 12px" }}>
        <div style={{ background: rv.done ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${rv.done ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: rv.done ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${rv.done ? "#6ee7b7" : "#fbbf24"}` }} />
      </div>

      {/* 배열 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 12 }}>
        <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 700 }}>{t(E, "array a", "배열 a")}</div>
        <div style={{ display: "flex", gap: GAP, position: "relative" }}>{_A.map((v, i) => arrCell(v, i))}</div>
      </div>

      {/* 필요한 값 (present/missing) */}
      {rv.need && m > 0 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 12 }}>
          <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 700 }}>{t(E, `must be present: 0…${m - 1}`, `있어야 함: 0…${m - 1}`)}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {info.needVals.map((v) => {
              const present = _cnt(v) > 0;
              const showMark = rv.fill;
              return (
                <div key={v} style={{
                  minWidth: 34, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                  fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 14,
                  background: showMark ? (present ? "#dcfce7" : "#fee2e2") : "#f8fafc",
                  color: showMark ? (present ? "#15803d" : "#b91c1c") : C.text,
                  border: `1.5px solid ${showMark ? (present ? "#86efac" : "#fca5a5") : C.border}`,
                }}>{v}{showMark && <span style={{ fontSize: 11 }}>{present ? "✓" : "✗"}</span>}</div>
              );
            })}
          </div>
        </div>
      )}

      {/* 채우기 + 제거 = max */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", marginTop: 6, flexWrap: "wrap" }}>
        {chip(t(E, "fill", "채우기"), info.missing, "#15803d", "#dcfce7", "#86efac", rv.fill)}
        {chip(t(E, "remove", "제거"), info.copies, "#9a3412", "#fff7ed", "#fdba74", rv.remove)}
        <span style={{ fontWeight: 800, color: C.dim }}>→ max =</span>
        {chip(t(E, "ops", "연산"), info.ops, A, "#f5f3ff", "#c4b5fd", rv.ops)}
      </div>

      <div style={{ marginTop: 12 }}>
        <SimNav idx={idx} total={tot} onIdx={setIdx} accent={A} showLabels isEn={E} />
      </div>
    </div>
  );
}
