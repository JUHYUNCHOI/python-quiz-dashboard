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

/* ════════════════════════════════════════════════════════════════════
   MexesIntroSim — 감 잡기. ① mex 가 뭔지 (0 부터 처음 없는 번호)
   ② 이 문제가 뭘 시키는지 (mex 를 원하는 값으로 만들기) 를 한 단계씩.
   ════════════════════════════════════════════════════════════════════ */
export function MexesIntroSim({ E }) {
  // 배열 [2,2,2,0] 에서 mex 확인: 0 있음 → 1 없음 → mex = 1
  const steps = [
    { ex: null, c0: false, c1: false, mex: false, goal: 3,
      bubble: t(E,
        "First — what is 'mex'?\nWe'll figure it out together, one step at a time.\n(Then we'll see what this problem actually asks.)",
        "우선 'mex' 가 뭔지부터 알아볼게요.\n한 단계씩 같이 확인.\n(그러고 나서 이 문제가 뭘 시키는지 볼게요.)") },
    { ex: null, c0: false, c1: false, mex: false, goal: 0,
      bubble: t(E,
        "These are the number boxes.\nmex = starting from 0, the FIRST number NOT in the boxes.",
        "숫자 상자들이에요.\nmex = 0 부터 세서 '상자에 없는 첫 번째' 번호.") },
    { ex: 0, c0: true, c1: false, mex: false, goal: 0,
      bubble: t(E,
        "Check 0 first — is 0 in the boxes?\nYes ✔ (there's a 0). Keep going.",
        "먼저 0 확인 — 상자에 0 이 있어?\n있음 ✔ (0 하나). 계속.") },
    { ex: 1, c0: true, c1: true, mex: true, goal: 0,
      bubble: t(E,
        "Now check 1 — is 1 in the boxes?\nNo ✘. So the first missing = 1.\n→ mex = 1.",
        "이제 1 확인 — 상자에 1 이 있어?\n없음 ✘. 처음으로 없는 게 1.\n→ mex = 1.") },
    { ex: null, c0: true, c1: true, mex: true, goal: 1,
      bubble: t(E,
        "Just now: boxes → we computed mex.\nThis problem is the OPPOSITE!\nWe pick the mex we want, then CHANGE boxes to make it happen.\nOne box change = 1 operation. Fewest operations?",
        "방금: 상자 → mex 를 구했어요.\n이 문제는 거꾸로!\n우리가 원하는 mex 를 먼저 정하고, 상자를 바꿔서 그 mex 로 만들기.\n상자 1 개 바꿈 = 연산 1 번. 최소 몇 번?") },
    { ex: null, c0: true, c1: true, mex: true, goal: 2,
      bubble: t(E,
        "Example — say we want mex = 2.\nThat means: 0 must be present, 1 must be present, 2 must be ABSENT.\nHow do we do it? Next screen shows step by step.",
        "예: mex = 2 를 원한다면?\n0 있어야, 1 있어야, 2 는 없어야.\n어떻게 만들지 다음 화면에서 한 단계씩 봐요.") },
  ];
  const { idx, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(idx, steps.length - 1)];

  const TW = 44, GAP = 8;
  const CHECK = [0, 1, 2, 3, 4];

  // 말풍선은 상자(봐야 할 그림) 위에 고정 — 아래로 내리면 상자를 덮어 가림
  // (선생님 2026-07-13: "봐야 할 사진은 가리면 안 돼". transform 은 공간을 안 밀어 겹침.)
  const shiftY = 0;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 10, wordBreak: "keep-all" }}>
        🧮 {t(E, "What is mex, and what does this problem want?", "mex 가 뭐고, 이 문제는 뭘 시키나?")}
      </div>

      {/* 말풍선 — 스텝에 따라 Y 로 슥 이동 (설명 중인 대상 옆으로) */}
      <div style={{ maxWidth: 540, margin: "0 auto 14px", position: "relative", zIndex: 5, transform: `translateY(${shiftY}px)`, transition: "transform .42s cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ background: st.goal ? "#f5f3ff" : (st.mex ? "#ecfdf5" : "#fffbeb"), border: `1.5px solid ${st.goal ? "#c4b5fd" : (st.mex ? "#6ee7b7" : "#fbbf24")}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: st.goal ? "#5b21b6" : (st.mex ? "#065f46" : "#92400e"), lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", boxShadow: "0 4px 14px rgba(0,0,0,.08)" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${st.goal ? "#c4b5fd" : (st.mex ? "#6ee7b7" : "#fbbf24")}` }} />
      </div>

      {/* 배열 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 700 }}>{t(E, "boxes", "상자들")}</div>
        <div style={{ display: "flex", gap: GAP }}>
          {_A.map((v, i) => {
            const hot = st.ex != null && v === st.ex;   // 지금 찾는 값과 같은 상자
            return (
              <div key={i} style={{
                width: TW, height: TW, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 18,
                background: hot ? "#dcfce7" : "#f5f3ff", color: hot ? "#15803d" : "#5b21b6",
                border: `2px solid ${hot ? "#16a34a" : "#c4b5fd"}`, transition: "all .2s",
              }}>{v}</div>
            );
          })}
        </div>
      </div>

      {/* 0 부터 확인하는 줄 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 12 }}>
        <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 700 }}>{t(E, "check from 0", "0 부터 확인")}</div>
        <div style={{ display: "flex", gap: 6 }}>
          {CHECK.map((v) => {
            const shown = (v === 0 && st.c0) || (v === 1 && st.c1);
            const present = _cnt(v) > 0;
            const isMex = st.mex && v === 1;
            return (
              <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{
                  minWidth: 34, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                  fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 14,
                  background: shown ? (present ? "#dcfce7" : "#fee2e2") : "#f8fafc",
                  color: shown ? (present ? "#15803d" : "#b91c1c") : C.dim,
                  border: `1.5px solid ${isMex ? "#7c3aed" : (shown ? (present ? "#86efac" : "#fca5a5") : C.border)}`,
                  boxShadow: isMex ? "0 0 0 3px rgba(124,58,237,.15)" : "none",
                }}>{v}{shown && <span style={{ fontSize: 11 }}>{present ? "✓" : "✗"}</span>}</div>
                {isMex && <span style={{ fontSize: 9.5, fontWeight: 800, color: "#7c3aed" }}>mex</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* mex 결과 */}
      {st.mex && (
        <div style={{ textAlign: "center", fontSize: 15, fontWeight: 800, color: A, marginBottom: 4, wordBreak: "keep-all" }}>
          {t(E, "first missing = 1  ⟹  mex = 1", "처음 없는 게 1  ⟹  mex = 1")}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <SimNav idx={idx} total={tot} onIdx={setIdx} accent={A} showLabels isEn={E} />
      </div>
    </div>
  );
}

function _buildTarget(m) {
  const needVals = []; for (let v = 0; v < m; v++) needVals.push(v);
  const missingVals = needVals.filter((v) => _cnt(v) === 0);
  const missing = missingVals.length;
  const copies = _cnt(m);
  const ops = Math.max(missing, copies);
  return { m, needVals, missingVals, missing, copies, ops };
}

/* ════════════════════════════════════════════════════════════════════
   MexesSampleSim — 공식 샘플 [2,2,2,0] 의 출력 5줄을 하나씩:
   각 줄이 '목표 mex 몇' 이고 왜 그 숫자인지 말풍선으로.
   ════════════════════════════════════════════════════════════════════ */
export function MexesSampleSim({ E }) {
  const outs = _TARGETS.map((m) => _buildTarget(m).ops);   // [1,0,3,1,2]
  const steps = [{ hi: -1,
    bubble: t(E,
      `Input: the array [${_A.join(", ")}] (N=${_N}). Output: N+1 = ${_N + 1} lines — the min changes for target mex 0, 1, …, ${_N}.`,
      `입력: 배열 [${_A.join(", ")}] (N=${_N}). 출력: N+1 = ${_N + 1}줄 — 목표 mex 0, 1, …, ${_N} 각각의 최소 변경 수.`) }];
  _TARGETS.forEach((m, k) => {
    const info = _buildTarget(m);
    steps.push({ hi: k,
      bubble: m === 0
        ? t(E, `Line ${k + 1} → target mex 0: 0 must be ABSENT. There ${info.copies === 1 ? "is" : "are"} ${info.copies} zero${info.copies === 1 ? "" : "s"} → erase ${info.copies} → ${info.ops}.`,
              `${k + 1}번째 줄 → 목표 mex 0: 배열에 0 이 없어야 해요. 지금 0 이 ${info.copies}개 → ${info.copies}번 지우면 → ${info.ops}.`)
        : t(E, `Line ${k + 1} → target mex ${m}: 0…${m - 1} present, ${m} absent. Fill ${info.missing}, remove ${info.copies} → max = ${info.ops}.`,
              `${k + 1}번째 줄 → 목표 mex ${m}: 0…${m - 1} 다 있고 ${m} 은 없어야. 채울 값 ${info.missing}개 / 없앨 ${m} ${info.copies}개 → max = ${info.ops}.`) });
  });
  const { idx, safe, setIdx, total: tot } = useTraceStep(steps.length);
  const st = steps[Math.min(safe, steps.length - 1)];

  // 말풍선 이동 (선생님 2026-07-13):
  // 첫 스텝 (st.hi === -1, 입출력 형식 소개) → 위 고정.
  // 목표 강조 스텝 (st.hi >= 0) → 배열 + 출력 행 근처로 내려서 학생이 어디를 봐야 하는지 명확.
  // 각 목표 줄마다 조금씩 다른 Y — 해당 출력 줄 y 위치에 맞춤 (36px 간격 * 줄 index).
  const shiftY = 0;   // 배열(봐야 할 그림) 위 고정 — 안 가리게 (선생님 2026-07-13)

  // 활성 목표 m 에서 배열을 실제로 어떻게 바꾸는지 계산 (0…m-1 채우기 + m 없애기)
  const m = st.hi;                          // -1 이면 intro
  const changes = {};                       // idx -> { to, kind: 'fill' | 'junk' }
  if (m >= 0) {
    const missing = [];
    for (let v = 0; v < m; v++) if (_cnt(v) === 0) missing.push(v);
    const copyPos = [];
    _A.forEach((x, i) => { if (x === m) copyPos.push(i); });
    const fillQ = missing.slice();
    let junk = m + 1;
    for (const i of copyPos) {              // m 은 전부 없애기 — 빠진 값부터 채우고 나머진 딴 수로
      if (fillQ.length) changes[i] = { to: fillQ.shift(), kind: "fill" };
      else changes[i] = { to: junk++, kind: "junk" };
    }
    for (let i = 0; i < _A.length && fillQ.length; i++) {   // 남은 채울 값: 여분/안 쓰이는 칸 재활용
      if (changes[i] || _A[i] === m) continue;
      if (_cnt(_A[i]) > 1 || _A[i] >= m) changes[i] = { to: fillQ.shift(), kind: "fill" };
    }
  }
  const opsNow = m < 0 ? null : _buildTarget(m).ops;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: A, marginBottom: 12, wordBreak: "keep-all" }}>
        📤 {t(E, "What each output line means", "출력 각 줄이 뭔지")}
      </div>

      {/* 말풍선 — 스텝별로 Y 이동. 첫 스텝은 위, 목표 강조 시엔 배열/출력 옆으로 슥. */}
      <div style={{ maxWidth: 560, margin: "0 auto 2px", position: "relative", zIndex: 5, transform: `translateY(${shiftY}px)`, transition: "transform .42s cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 12, padding: "10px 14px", fontSize: 12.5, color: "#92400e", lineHeight: 1.55, fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", textAlign: "center", minHeight: 42, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,.08)" }}>💬 {st.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "9px solid #fbbf24" }} />
      </div>

      <div style={{ display: "flex", gap: 40, justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap", marginTop: 8 }}>
        {/* 배열 — 활성 목표에서 실제로 바뀌는 칸을 옛값 → 새값 으로 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 700, wordBreak: "keep-all" }}>
            {m < 0 ? t(E, "input array a", "입력 배열 a")
                   : (opsNow === 0 ? t(E, "array a — already there", "배열 a — 이미 됨")
                                   : t(E, "array a — change these", "배열 a — 이렇게 바꾸면"))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {_A.map((v, i) => {
              const ch = changes[i];
              if (!ch) return (
                <div key={i} style={{ width: 46, height: 46, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 17, background: "#f5f3ff", color: "#5b21b6", border: "1.5px solid #c4b5fd" }}>{v}</div>
              );
              const fill = ch.kind === "fill";
              return (
                <div key={i} style={{ width: 46, height: 46, borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
                  background: fill ? "#dcfce7" : "#fff7ed", color: fill ? "#166534" : "#9a3412",
                  border: `2px solid ${fill ? "#16a34a" : "#ea580c"}` }}>
                  <span style={{ fontSize: 10.5, textDecoration: "line-through", opacity: 0.6, lineHeight: 1 }}>{v}</span>
                  <span style={{ fontSize: 17, lineHeight: 1.1 }}>{ch.to}</span>
                </div>
              );
            })}
          </div>
          {m >= 0 && (
            <div style={{ fontSize: 11.5, color: opsNow === 0 ? "#15803d" : A, fontWeight: 700, marginTop: 3, wordBreak: "keep-all" }}>
              {opsNow === 0
                ? t(E, "0 changes — already mex " + m, "0 번 바꿈 — 이미 mex " + m)
                : t(E, `${opsNow} change${opsNow === 1 ? "" : "s"} → mex ${m}`, `${opsNow}번 바꿈 → mex ${m}`)}
            </div>
          )}
        </div>

        {/* 출력 N+1 줄 — 활성 줄 강조 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 10.5, color: C.dim, fontWeight: 700 }}>{t(E, "output (N+1 lines)", "출력 (N+1줄)")}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {outs.map((v, k) => {
              const on = st.hi === k;
              return (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                  <span style={{ fontSize: 10, color: on ? A : C.dim, fontWeight: 700, width: 56, textAlign: "right", wordBreak: "keep-all" }}>{t(E, `mex ${k}`, `목표 ${k}`)}</span>
                  <div style={{ width: 40, height: 30, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 15,
                    background: on ? "#ecfdf5" : "#f8fafc", color: on ? "#065f46" : C.text,
                    border: `${on ? 2 : 1}px solid ${on ? "#6ee7b7" : C.border}`, boxShadow: on ? "0 0 0 3px rgba(110,231,183,.25)" : "none", transition: "all .2s" }}>{v}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <SimNav idx={idx} total={tot} onIdx={setIdx} accent={A} showLabels isEn={E} />
      </div>
    </div>
  );
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

  // 말풍선은 배열(봐야 할 그림) 위에 고정 — 아래로 내리면 배열/칩을 덮어 가림
  // (선생님 2026-07-13: "봐야 할 사진은 가리면 안 돼".)
  const shiftYMax = 0;

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

      {/* 말풍선 — 스텝별로 Y 이동 (설명 중인 행 근처로) */}
      <div style={{ maxWidth: 540, margin: "0 auto 12px", position: "relative", zIndex: 5, transform: `translateY(${shiftYMax}px)`, transition: "transform .42s cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ background: rv.done ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${rv.done ? "#6ee7b7" : "#fbbf24"}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, color: rv.done ? "#065f46" : "#92400e", lineHeight: 1.6, minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", boxShadow: "0 4px 14px rgba(0,0,0,.08)" }}>💬 {st.bubble}</div>
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
