// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 6/8 (TLE 7-8, O(N^2) count)
//   C++:    11/11 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { SimNav as SharedSimNav, useTraceStep, StepHeader, NarrativePanel } from "@/components/quest/TraceStepper";

const A = "#d97706";

/* SimNav uses the shared component, with this quest's accent color. */
function SimNav({ idx, total, onIdx }) {
  return <SharedSimNav idx={idx} total={total} onIdx={onIdx} accent={A} />;
}

/* Helper: render a row of cow heights as cards (with optional highlight) */
function CowRow({ values, validity }) {
  // validity: optional — { kind: 'ok' | 'fail', reason: '...' }
  return (
    <div style={{
      display: "flex", gap: 4, justifyContent: "center", padding: "10px 0", flexWrap: "wrap",
      background: validity ? (validity.kind === "ok" ? "#dcfce7" : "#fee2e2") : "transparent",
      borderRadius: 8,
      border: validity ? `1px solid ${validity.kind === "ok" ? "#86efac" : "#fca5a5"}` : "none",
    }}>
      {values.map((v, i) => (
        <div key={i} style={{
          width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16,
          background: "#fff",
          border: `1px solid ${validity ? (validity.kind === "ok" ? "#16a34a" : "#dc2626") : "#cbd5e1"}`,
          color: validity ? (validity.kind === "ok" ? "#166534" : "#991b1b") : C.text,
        }}>{v ?? "?"}</div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HandDrawSimulator — input [1, 1, 2, 3]. Walk through:
   1. show heights
   2. why even-length palindromes fail (adjacent dups)
   3. try [1, 3, 1] — works ✓
   4. try [1, 2, 1] — works ✓
   5. try [3, 1, 3] — V-shape, fail ✗
   6. observation: peak 1×, ring values 2× each
   ═══════════════════════════════════════════════════════════════ */
export function HandDrawSimulator({ E }) {
  const heights = [1, 1, 2, 3];
  const trace = [
    { kind: "setup" },
    { kind: "fail-even" },
    { kind: "try", arr: [1, 3, 1], ok: true,  note: t(E, "1 < 3 > 1: mountain ✓, palindrome ✓, no adj dup ✓",
                                                            "1 < 3 > 1: mountain ✓, palindrome ✓, 인접 다름 ✓") },
    { kind: "try", arr: [1, 2, 1], ok: true,  note: t(E, "1 < 2 > 1: also valid! length 3.",
                                                            "1 < 2 > 1: 이것도 됨! 길이 3.") },
    { kind: "try", arr: [3, 1, 3], ok: false, note: t(E, "TWO problems: (a) input has only one 3, can't use two. (b) Even if we could, 3 > 1 < 3 is V-shape (DOWN-UP), not mountain.",
                                                            "두 가지 문제: (a) 입력에 3 이 한 마리뿐 — 두 마리 못 씀. (b) 가능하다 해도 3 > 1 < 3 은 V 모양 (내려갔다 올라옴), mountain 아님.") },
    { kind: "observation" },
  ];
  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, "Hand-draw: heights = [1, 1, 2, 3]. Try arrangements one by one.",
                    "손으로 그려보기: 키 = [1, 1, 2, 3]. 배열을 하나씩 시도.")}
        subtitle={t(E, `(${safe + 1} / ${trace.length}) — ▶ to step`,
                       `(${safe + 1} / ${trace.length}) — ▶ 눌러서 진행`)}
      />

      {/* Available cow heights */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: C.dim, textAlign: "center", marginBottom: 4 }}>
          {t(E, "available cows", "갖고 있는 소들")}
        </div>
        <CowRow values={heights} />
      </div>

      <NarrativePanel minHeight={130} stepKey={ts.safe}>
        {s.kind === "setup" && (
          <>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 4 }}>
              📋 {t(E, "Goal: pick a subset, arrange in mountain palindrome", "목표: 일부 골라서 mountain palindrome 으로 배열")}
            </div>
            <div>
              {t(E, "Mountain shape: heights go UP to a peak, then DOWN. Symmetric (palindrome). No two neighbors equal.",
                    "mountain 모양: 키가 peak 까지 올라갔다 내려옴. 대칭 (palindrome). 이웃끼리 같은 키 X.")}
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: C.dim }}>
              {t(E, "Q: Can we use ALL 4 cows? Press ▶.", "질문: 4 마리 다 쓸 수 있을까? ▶ 눌러서 확인.")}
            </div>
          </>
        )}
        {s.kind === "fail-even" && (
          <>
            <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>
              ✗ {t(E, "Can we use all 4? Length 4 is impossible — for ANY input.", "4 마리 다 쓸 수 있을까? 길이 4 는 불가능 — 어떤 입력이든.")}
            </div>
            <div>
              {t(E, "Why? A symmetric length-4 row has shape ", "왜? 대칭 길이 4 줄은 ")}
              <b style={{ fontFamily: "'JetBrains Mono',monospace", color: "#7c2d12" }}>[x, y, y, x]</b>
              {t(E, " (mirrored around the middle).", " 모양 (가운데 기준 거울).")}
            </div>
            <div style={{ marginTop: 6 }}>
              {t(E, "But then the two middle ", "그런데 가운데 두 ")}
              <b style={{ fontFamily: "'JetBrains Mono',monospace", color: "#7c2d12" }}>y</b>
              {t(E, "'s sit next to each other →  ", " 가 이웃 → ")}
              <b style={{ color: "#dc2626" }}>{t(E, "adjacent duplicate (rule violation)", "인접 중복 (룰 위반)")}</b>
              {t(E, ".", ".")}
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: C.dim }}>
              {t(E, "→ Even lengths NEVER work, regardless of which heights we have. Skip to length 3.",
                    "→ 짝수 길이는 (어떤 키 입력이든) 절대 안 됨. 길이 3 으로 넘어감.")}
            </div>
          </>
        )}
        {s.kind === "try" && (
          <>
            <div style={{ fontWeight: 600, color: s.ok ? "#15803d" : "#7f1d1d", marginBottom: 6 }}>
              {s.ok ? "✓" : "✗"} {t(E, "Try ", "시도 ")}<code style={{ fontFamily: "'JetBrains Mono',monospace" }}>[{s.arr.join(", ")}]</code>
            </div>
            <CowRow values={s.arr} validity={{ kind: s.ok ? "ok" : "fail" }} />
            <div style={{ marginTop: 6 }}>{s.note}</div>
          </>
        )}
        {s.kind === "observation" && (
          <>
            <div style={{ fontWeight: 600, color: A, marginBottom: 6, fontSize: 14 }}>
              💡 {t(E, "What did we learn?", "관찰한 것")}
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.7 }}>
              <div>• {t(E, "Best for [1,1,2,3]: length 3, e.g. [1, 3, 1] — used 3 of 4 cows.",
                          "[1,1,2,3] 최선: 길이 3, 예: [1, 3, 1] — 4 중 3 마리 사용.")}</div>
              <div>• {t(E, "Even-length palindromes always fail (adjacent dup).",
                          "짝수 길이 palindrome 은 항상 망함 (인접 중복).")}</div>
              <div>• {t(E, "Mountain rule: peak in the MIDDLE is the highest. Going DOWN-UP is V-shape (not allowed).",
                          "mountain 규칙: 가운데 peak 가 최고점. 내려갔다 올라오는 V 모양은 안 됨.")}</div>
              <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #c4b5fd" }}>
                <b>{t(E, "Pattern in [1, 3, 1]: ", "[1, 3, 1] 의 패턴: ")}</b>
                {t(E, "value 1 is a RING (appears 2× — left + right mirror). Value 3 is the PEAK (appears 1× in middle). So length = 2 × (1 ring) + 1 (peak) = 3. Generally: length = 2·rings + 1.",
                      "값 1 이 RING (2 번 등장 — 좌+우 mirror). 값 3 이 PEAK (가운데 1 번). 그래서 길이 = 2 × (ring 1 개) + 1 (peak) = 3. 일반: 길이 = 2·rings + 1.")}
              </div>
            </div>
          </>
        )}
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TrickySimulator — input [3, 3, 2, 1].
   Apply the simple formula → says 3. Then try to actually build
   length-3 arrangements one by one. All fail. Conclusion: simple
   formula is wrong; peak must exceed all rings.
   ═══════════════════════════════════════════════════════════════ */
export function TrickySimulator({ E }) {
  const heights = [3, 3, 2, 1];
  // Walk every length-3 mountain candidate [a, peak, a] with peak > a from {1, 2, 3}.
  // 5 candidates total; each must satisfy mountain shape AND have enough cards in input.
  const trace = [
    { kind: "setup" },
    { kind: "formula" },
    // 5 candidates from {1,2,3}: (a, peak, a) with peak > a
    { kind: "build", arr: [1, 2, 1], ok: false, why: t(E, "[1, 2, 1] is a valid mountain shape, BUT input has only one 1 — need 2.",
                                                              "[1, 2, 1] 모양은 OK 인데, 입력에 1 이 하나뿐 — 두 마리 필요.") },
    { kind: "build", arr: [1, 3, 1], ok: false, why: t(E, "[1, 3, 1] is a valid mountain shape, BUT input has only one 1.",
                                                              "[1, 3, 1] 모양은 OK 인데, 입력에 1 이 하나뿐.") },
    { kind: "build", arr: [2, 3, 2], ok: false, why: t(E, "[2, 3, 2] is a valid mountain shape, BUT input has only one 2 — need 2.",
                                                              "[2, 3, 2] 모양은 OK 인데, 입력에 2 가 하나뿐.") },
    { kind: "build", arr: [3, 1, 3], ok: false, why: t(E, "Even if we had two 3s, peak must be GREATER than rings (mountain top is highest). 1 < 3 means 1 can't be the peak. INVALID shape.",
                                                              "3 이 두 마리 있다고 가정해도, peak 는 ring 보다 커야 함 (mountain 꼭대기 = 최대). 1 < 3 이면 1 은 peak 못 됨. 모양 자체 INVALID.") },
    { kind: "build", arr: [3, 2, 3], ok: false, why: t(E, "Same — 2 < 3 means 2 can't be the peak. INVALID shape.",
                                                              "같음 — 2 < 3 이면 2 는 peak 못 됨. 모양 자체 INVALID.") },
    { kind: "verdict" },
    { kind: "diagnosis" },
  ];
  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        icon="⚠️"
        title={t(E, "Tricky case: heights = [3, 3, 2, 1]", "함정 케이스: 키 = [3, 3, 2, 1]")}
        subtitle={t(E, `(${safe + 1} / ${trace.length}) — ▶ to step`,
                       `(${safe + 1} / ${trace.length}) — ▶ 눌러서 진행`)}
      />

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: C.dim, textAlign: "center", marginBottom: 4 }}>
          {t(E, "available cows", "갖고 있는 소들")}
        </div>
        <CowRow values={heights} />
      </div>

      <NarrativePanel minHeight={140} stepKey={ts.safe}>
        {s.kind === "setup" && (
          <>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 4 }}>
              🔢 {t(E, "Frequency: 3 appears 2×, 2 appears 1×, 1 appears 1×", "빈도: 3 이 2번, 2 가 1번, 1 이 1번")}
            </div>
            <div>
              {t(E, "Apply our formula: rings = (values with freq ≥ 2) = {3} → 1 ring. So length = 2·1 + 1 = ", "공식 적용: rings = (freq ≥ 2 인 값) = {3} → 1 개. 길이 = 2·1 + 1 = ")}
              <b style={{ color: "#16a34a", fontSize: 16 }}>3</b>
              {t(E, ".", ".")}
            </div>
          </>
        )}
        {s.kind === "formula" && (
          <>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 4 }}>
              ✏️ {t(E, "Formula says length 3. Let's actually BUILD it.",
                          "공식 답: 길이 3. 실제로 만들어보자.")}
            </div>
            <div>
              {t(E, "Length-3 mountain palindromes look like [a, peak, a] with peak > a. From {1, 2, 3}, the 5 candidates are:",
                    "길이 3 mountain palindrome 은 [a, peak, a] (peak > a). {1, 2, 3} 에서 5 가지 후보:")}
            </div>
            <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7 }}>
              <div>• [1, 2, 1] — a=1, peak=2</div>
              <div>• [1, 3, 1] — a=1, peak=3</div>
              <div>• [2, 3, 2] — a=2, peak=3</div>
              <div>• [3, 1, 3] — a=3, peak=1 ← peak {"<"} a, {t(E, "not a mountain", "mountain 모양 X")}</div>
              <div>• [3, 2, 3] — a=3, peak=2 ← {t(E, "same problem", "같은 문제")}</div>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: C.dim }}>
              {t(E, "▶ to try each — check both shape AND card availability.", "▶ 눌러서 하나씩 — 모양 + 카드 보유 둘 다 체크.")}
            </div>
          </>
        )}
        {s.kind === "build" && (
          <>
            <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>
              ✗ {t(E, "Try ", "시도 ")}<code style={{ fontFamily: "'JetBrains Mono',monospace" }}>[{s.arr.join(", ")}]</code>
            </div>
            <CowRow values={s.arr} validity={{ kind: "fail" }} />
            <div style={{ marginTop: 6 }}>{s.why}</div>
          </>
        )}
        {s.kind === "verdict" && (
          <>
            <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 6, fontSize: 14 }}>
              🚫 {t(E, "All length-3 candidates failed.", "길이 3 후보 다 실패.")}
            </div>
            <div>
              {t(E, "Best we can do is length 1 (any single cow). But our formula said 3 — it's WRONG for this input.",
                    "최선은 길이 1 (소 1마리). 그런데 공식은 3 이라고 했음 — 이 입력에서 공식이 틀렸음.")}
            </div>
            <div style={{ marginTop: 8, background: "#fef3c7", border: "1px dashed #fbbf24", borderRadius: 6, padding: "6px 10px", fontSize: 12 }}>
              <b>{t(E, "Real answer: ", "진짜 답: ")}</b>
              <span style={{ color: "#16a34a", fontWeight: 600 }}>1</span>
              {t(E, " (just one cow as peak, no rings)", " (소 1마리만 peak 으로, ring 없음)")}
            </div>
          </>
        )}
        {s.kind === "diagnosis" && (
          <>
            <div style={{ fontWeight: 600, color: A, marginBottom: 6, fontSize: 14 }}>
              🔍 {t(E, "Why did the formula fail?", "공식이 왜 틀렸을까?")}
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.7 }}>
              <div>{t(E, "We assumed any value with freq ≥ 2 can be a ring. But:",
                          "freq ≥ 2 인 값은 다 ring 이 될 수 있다고 가정했는데:")}</div>
              <div style={{ marginTop: 6, marginLeft: 8 }}>
                {t(E, "→ A ring of value v needs a peak > v. ", "→ 값 v 가 ring 이려면 peak > v 인 값 필요. ")}
              </div>
              <div style={{ marginLeft: 8 }}>
                {t(E, "→ For [3, 3, 2, 1], the value 3 has freq 2 BUT no value > 3 exists. So 3 cannot be a ring.",
                      "→ [3, 3, 2, 1] 에서 3 은 freq 2 인데 3 보다 큰 값이 없음. 그래서 3 은 ring 못 됨.")}
              </div>
              <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fbbf24", fontWeight: 600, color: "#92400e" }}>
                {t(E, "Fix: peak = M (max). Rings = (v < M with freq[v] ≥ 2). Length = 2·rings + 1.",
                      "고침: peak = M (최댓값). Rings = (v < M, freq[v] ≥ 2). 길이 = 2·rings + 1.")}
              </div>
            </div>
          </>
        )}
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} />
    </div>
  );
}

/* Backward compat: keep FreqWalkSimulator name in case it's still referenced */
export const FreqWalkSimulator = HandDrawSimulator;

/* ═══════════════════════════════════════════════════════════════
   CowPhotosSim — show counts per breed, pair/peak choice
   ═══════════════════════════════════════════════════════════════ */
const _CP_PRESETS = [
  [1,2,2,3,3,3],
  [1,1,2,2,3,3],
  [3,3,2,1],
  [4,4,4,2,2,1,1],
];

export function CowPhotosSim({ E }) {
  const [pi, setPi] = useState(0);
  const [si, setSi] = useState(0);
  const h = _CP_PRESETS[pi];
  const freq = {};
  for (const x of h) freq[x] = (freq[x] || 0) + 1;
  const keys = Object.keys(freq).map(Number).sort((a,b) => a-b);
  // Phases: 0 show heights, 1 show counts, 2 show palindrome shape
  const cur = Math.min(si, 2);

  // CORRECTED formula: peak must be the MAX value (mountain top is highest).
  //   M = max value, rings = (distinct v < M with freq[v] >= 2),
  //   answer = 2 * rings + 1.
  const M = keys.length > 0 ? keys[keys.length - 1] : null;
  const ringKeys = keys.filter(k => k < M && freq[k] >= 2);
  const rings = ringKeys.length;
  const ans = M === null ? 0 : 2 * rings + 1;

  // Build a valid palindrome arrangement using corrected logic:
  //   sorted ring values asc → peak (M) → sorted ring values desc
  const sortedRings = [...ringKeys].sort((a, b) => a - b);
  const arr = M === null ? [] : [...sortedRings, M, ...sortedRings.slice().reverse()];

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_CP_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setSi(0); }} style={{
            padding: "4px 8px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>[{p.join(",")}]</button>
        ))}
      </div>

      {cur === 0 && (
        <div>
          <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 6, fontWeight: 700 }}>
            {t(E, "Heights:", "키:")}
          </div>
          <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
            {h.map((v, i) => (
              <div key={i} style={{
                width: 32, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                background: "#fff", border: `1px solid ${A}`, color: A,
              }}>{v}</div>
            ))}
          </div>
        </div>
      )}

      {cur === 1 && (
        <div>
          <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 6, fontWeight: 700 }}>
            {t(E, `Counter (peak = M = ${M}):`, `Counter (peak = M = ${M}):`)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 280, margin: "0 auto" }}>
            {keys.map(k => {
              const isPeak = k === M;
              const isRing = k < M && freq[k] >= 2;
              const role = isPeak ? "peak" : isRing ? "ring" : "skip";
              return (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between", padding: "5px 10px", borderRadius: 6,
                  background: isPeak ? "#fef3c7" : isRing ? "#dcfce7" : "#f1f5f9",
                  border: `1.5px solid ${isPeak ? "#fbbf24" : isRing ? "#86efac" : "#cbd5e1"}`,
                  fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
                }}>
                  <span>{t(E, `value ${k}`, `값 ${k}`)}</span>
                  <span>
                    {t(E, `count = ${freq[k]} `, `count = ${freq[k]} `)}
                    {role === "peak" && t(E, "← peak", "← peak")}
                    {role === "ring" && t(E, "✓ ring", "✓ ring")}
                    {role === "skip" && (freq[k] < 2 ? t(E, "(only 1)", "(1 마리뿐)") : t(E, "(= peak, can't ring)", "(= peak 값, ring 불가)"))}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, fontWeight: 600, color: A }}>
            rings = {rings}, ans = 2 × {rings} + 1 = {ans}
          </div>
        </div>
      )}

      {cur === 2 && (
        <div>
          <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 6, fontWeight: 700 }}>
            {t(E, "Palindrome arrangement:", "팰린드롬 배열:")}
          </div>
          <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
            {arr.map((v, i) => {
              const isPeak = i === Math.floor(arr.length / 2);
              return (
                <div key={i} style={{
                  width: 32, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                  background: isPeak ? "#fef3c7" : "#dcfce7",
                  border: `1px solid ${isPeak ? "#f59e0b" : "#16a34a"}`,
                  color: isPeak ? "#92400e" : "#15803d",
                }}>{v}</div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, fontWeight: 600, color: "#15803d" }}>
            ✅ length = {arr.length}
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginTop: 12 }}>
        <button onClick={() => setSi(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: cur === 0 ? "#b0b5c3" : A,
          cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{cur + 1} / 3</span>
        <button onClick={() => setSi(Math.min(2, cur + 1))} disabled={cur === 2} style={{
          background: cur === 2 ? "#e5e7eb" : A, border: `1px solid ${cur === 2 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: cur === 2 ? "#b0b5c3" : "#fff", cursor: cur === 2 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

export function CowPhotosRunner({ E }) {
  const [hIn, setHIn] = useState("1 2 2 3 3 3");
  const [result, setResult] = useState(null);
  const run = () => {
    const h = hIn.trim().split(/\s+/).map(Number);
    if (h.some(isNaN) || h.length === 0) {
      setResult({ error: t(E, "Invalid: enter integers.", "잘못된 입력: 정수.") });
      return;
    }
    // CORRECTED formula: peak = M (max), rings = (v < M with freq >= 2),
    // answer = 2 * rings + 1.
    const f = {};
    for (const x of h) f[x] = (f[x] || 0) + 1;
    const keys = Object.keys(f).map(Number);
    const M = Math.max(...keys);
    let rings = 0;
    for (const k of keys) if (k < M && f[k] >= 2) rings++;
    const ans = 2 * rings + 1;
    setResult({ done: true, M, rings, ans });
  };
  return (
    <div style={{ padding: 14 }}>
      <input value={hIn} onChange={e => setHIn(e.target.value)} placeholder="heights"
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace", color: A, marginBottom: 10, boxSizing: "border-box" }} />
      <button onClick={run} style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, marginBottom: 10, background: A, color: "#fff" }}>▶ {t(E, "Compute", "계산")}</button>
      {result?.error && (<div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px", color: "#7f1d1d", fontSize: 12, fontWeight: 700 }}>{result.error}</div>)}
      {result?.done && (<div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: "10px 12px", color: "#15803d", fontSize: 13, fontWeight: 700, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>M = {result.M} · rings = {result.rings} → ans = 2 × {result.rings} + 1 = {result.ans}</div>)}
    </div>
  );
}

/* Cumulative code chunks — each step adds one new piece. The student
   sees the program grow line by line, one idea at a time. */

const CP_STEP1_PY = [
  "T = int(input())",
  "",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
];
const CP_STEP1_CPP = [
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
  "        vector<int> h(N);",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> h[i];",
  "        }",
  "    }",
];

const CP_STEP2_PY = [
  "T = int(input())",
  "",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "",
  "    # 가장 큰 키 = peak 후보",
  "    M = max(h)",
];
const CP_STEP2_CPP = [
  "// (앞부분 생략 — 입력 읽기)",
  "    for (int t = 0; t < T; t++) {",
  "        int N;",
  "        cin >> N;",
  "        vector<int> h(N);",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> h[i];",
  "        }",
  "",
  "        // 가장 큰 키 = peak 후보",
  "        int M = h[0];",
  "        for (int i = 1; i < N; i++) {",
  "            if (h[i] > M) {",
  "                M = h[i];",
  "            }",
  "        }",
  "    }",
];

const CP_STEP3_PY = [
  "T = int(input())",
  "",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    M = max(h)",
  "",
  "    # ring 이 되려면: 값이 peak 보다 작고 (v < M), 같은 값 2 마리 이상",
  "    rings = 0",
  "    for v in set(h):",
  "        if v < M and h.count(v) >= 2:",
  "            rings += 1",
];
const CP_STEP3_CPP = [
  "// (앞부분 생략)",
  "        int M = h[0];",
  "        for (int i = 1; i < N; i++) {",
  "            if (h[i] > M) {",
  "                M = h[i];",
  "            }",
  "        }",
  "",
  "        // ring 이 되려면: v < M 이고 같은 값이 2 마리 이상",
  "        int rings = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            int v = h[i];",
  "            if (v >= M) {",
  "                continue;",
  "            }",
  "            // v 를 이미 셌으면 skip",
  "            bool seen = false;",
  "            for (int k = 0; k < i; k++) {",
  "                if (h[k] == v) {",
  "                    seen = true;",
  "                    break;",
  "                }",
  "            }",
  "            if (seen) {",
  "                continue;",
  "            }",
  "            // v 가 몇 번 나오는지 세고 ≥ 2 면 ring",
  "            int cnt = 0;",
  "            for (int k = 0; k < N; k++) {",
  "                if (h[k] == v) {",
  "                    cnt++;",
  "                }",
  "            }",
  "            if (cnt >= 2) {",
  "                rings++;",
  "            }",
  "        }",
];

// Step 4 = full final program
const CP_FULL_PY = [
  "T = int(input())",
  "",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    M = max(h)",
  "",
  "    rings = 0",
  "    for v in set(h):",
  "        if v < M and h.count(v) >= 2:",
  "            rings += 1",
  "",
  "    # 길이 = 2·rings + 1 (좌+우 mirror = 2 마리, peak 1 마리)",
  "    print(2 * rings + 1)",
];
const CP_FULL_CPP = [
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
  "        vector<int> h(N);",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> h[i];",
  "        }",
  "",
  "        int M = h[0];",
  "        for (int i = 1; i < N; i++) {",
  "            if (h[i] > M) {",
  "                M = h[i];",
  "            }",
  "        }",
  "",
  "        int rings = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            int v = h[i];",
  "            if (v >= M) {",
  "                continue;",
  "            }",
  "            bool seen = false;",
  "            for (int k = 0; k < i; k++) {",
  "                if (h[k] == v) {",
  "                    seen = true;",
  "                    break;",
  "                }",
  "            }",
  "            if (seen) {",
  "                continue;",
  "            }",
  "            int cnt = 0;",
  "            for (int k = 0; k < N; k++) {",
  "                if (h[k] == v) {",
  "                    cnt++;",
  "                }",
  "            }",
  "            if (cnt >= 2) {",
  "                rings++;",
  "            }",
  "        }",
  "",
  "        // 길이 = 2·rings + 1",
  "        cout << 2 * rings + 1 << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

// Step 6 = "같은 정보를 한 번만 세두면?" — manual frequency dict (insight stage,
// before committing to language-specific helpers like Counter / vector indexing).
const CP_INSIGHT_PY = [
  "# 매번 h.count(v) 대신 — 빈도를 한 번만 세두면?",
  "freq = {}",
  "for v in h:",
  "    freq[v] = freq.get(v, 0) + 1   # h 한 번만 훑음 → O(N)",
  "",
  "rings = 0",
  "for v in freq:",
  "    if v < M and freq[v] >= 2:     # lookup 은 즉시 (O(1))",
  "        rings += 1",
];
const CP_INSIGHT_CPP = [
  "// 키가 1..N 이라 — 그냥 freq[키] 인덱스로 빈도 저장하면 어떨까?",
  "vector<int> freq(N + 2, 0);",
  "for (int i = 0; i < N; i++) {",
  "    freq[h[i]]++;                  // h 한 번만 훑기 → O(N)",
  "}",
  "",
  "int rings = 0;",
  "for (int v = 1; v < M; v++) {",
  "    if (freq[v] >= 2) {",
  "        rings++;                   // lookup 은 즉시",
  "    }",
  "}",
];

// Step 7 = 실전 코드 — Python Counter / C++ freq 배열 (cumulative final).
const CP_FAST_PY = [
  "from collections import Counter",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    M = max(h)",
  "",
  "    cnt = Counter(h)            # 한 줄로 dict 빈도 — O(N)",
  "    rings = 0",
  "    for v in cnt:",
  "        if v < M and cnt[v] >= 2:",
  "            rings += 1",
  "",
  "    print(2 * rings + 1)",
];
const CP_FAST_CPP = [
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
  "        vector<int> freq(N + 2, 0);    // 인덱스 = 키, 값 = 빈도",
  "        int M = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            int h;",
  "            cin >> h;",
  "            freq[h]++;                 // 입력 받으면서 빈도 누적",
  "            if (h > M) {",
  "                M = h;                 // peak 도 같이",
  "            }",
  "        }",
  "        int rings = 0;",
  "        for (int v = 1; v < M; v++) {",
  "            if (freq[v] >= 2) {",
  "                rings++;",
  "            }",
  "        }",
  "        cout << 2 * rings + 1 << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

// Aside that compares operation count for naive vs fast.
const CpPerfAside = ({ E }) => (
  <div style={{
    background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#7f1d1d",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#991b1b", marginBottom: 6, letterSpacing: 0.3 }}>
      🐌 {t(E, "Operation count", "연산량")}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px" }}>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N = 10</code>
      <div>{t(E, "tiny — 100 ops, instant", "작음 — 100 연산, 즉시")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N = 1,000</code>
      <div>{t(E, "1 million ops — still fast", "백만 연산 — 아직 빠름")}</div>
      <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>N = 100,000</code>
      <div>{t(E, "10 BILLION ops — TLE 🚫", "100 억 연산 — TLE 🚫")}</div>
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fca5a5", fontSize: 11 }}>
      {t(E,
        "Why? `h.count(v)` walks the whole array. Doing that once per distinct v ⇒ up to N · N work per case.",
        "왜? `h.count(v)` 가 매번 배열 전체를 훑어요. distinct v 마다 그렇게 하면 케이스당 최대 N · N 일.")}
    </div>
  </div>
);

// Aside for the insight step — celebrates the savings.
const CpInsightAside = ({ E }) => (
  <div style={{
    background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#065f46",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#065f46", marginBottom: 6 }}>
      💡 {t(E, "Key idea", "핵심 아이디어")}
    </div>
    <div>
      {t(E,
        "Frequencies don't change while we count rings. So count them ONCE up front, then ring-check is just a lookup.",
        "ring 세는 동안 빈도는 안 바뀜. 그러니 한 번만 세두면 그 다음부턴 그냥 꺼내 쓰면 끝.")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #6ee7b7", fontSize: 11 }}>
      <div>{t(E, "Total work per case:", "케이스당 총 일:")}</div>
      <div style={{ marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>
        N (build freq) + distinct (check) ≤ 2N → <b>O(N)</b>
      </div>
    </div>
  </div>
);

// Aside for the final fast-code step.
const CpFastAside = ({ E }) => (
  <div style={{
    background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10,
    padding: "8px 10px", fontSize: 11.5, lineHeight: 1.55, color: "#1e3a8a",
  }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: "#1e40af", marginBottom: 6 }}>
      ✅ {t(E, "Two language-friendly tools", "언어별 도구")}
    </div>
    <div style={{ marginBottom: 6 }}>
      <b>Python:</b> <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>Counter(h)</code>
      {" "}{t(E, "→ ready-made dict of frequencies in one line.",
                "→ 한 줄로 dict 빈도 완성.")}
    </div>
    <div>
      <b>C++:</b> <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>vector&lt;int&gt; freq(N+2)</code>
      {" "}{t(E, "→ heights are 1..N, so use the value as the index directly. Cache-friendly, instant lookup.",
                "→ 키가 1..N 이라 값 자체를 인덱스로. 캐시 친화 + 즉시 lookup.")}
    </div>
    <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #93c5fd", fontSize: 11 }}>
      {t(E, "Sum of N across all cases ≤ 10⁶ → both versions pass comfortably.",
            "전체 N 합 ≤ 10⁶ → 두 버전 다 여유롭게 통과.")}
    </div>
  </div>
);

// Sample input for the InputAside panel — actual USACO sample.
const CP_SAMPLE_LINES = ["2", "4", "1 1 2 3", "4", "3 3 2 1"];
const CpAside = ({ E, highlight = [], note = null }) => {
  const hi = new Set(highlight);
  return (
    <div style={{
      background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10,
      padding: "8px 10px", fontSize: 11.5,
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 600, color: "#92400e", marginBottom: 6, letterSpacing: 0.3 }}>
        📥 {t(E, "Sample input", "샘플 입력")}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.55 }}>
        {CP_SAMPLE_LINES.map((line, i) => (
          <div key={i} style={{
            background: hi.has(i) ? "#fde68a" : "transparent",
            border: hi.has(i) ? "1.5px solid #f59e0b" : "1.5px solid transparent",
            borderRadius: 4, padding: "1px 5px",
            color: hi.has(i) ? "#7c2d12" : "#9ca3af",
            fontWeight: hi.has(i) ? 800 : 500,
            opacity: hi.has(i) ? 1 : 0.7,
          }}>{line || " "}</div>
        ))}
      </div>
      {note && (
        <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fcd34d", fontSize: 11, color: "#7c2d12", lineHeight: 1.5 }}>
          {note}
        </div>
      )}
    </div>
  );
};

// 코드 배열의 한글 주석을 영어로 스왑 (코드 라인은 그대로 통과 → 코드 동일 보장).
// (선생님 2026-07-14 cowphotos 검토: 영어 모드인데 코드 주석이 한글이었음.)
const CP_CMT_EN = {
  "    # 가장 큰 키 = peak 후보": "    # biggest key = the peak",
  "// (앞부분 생략 — 입력 읽기)": "// (input reading omitted above)",
  "        // 가장 큰 키 = peak 후보": "        // biggest key = the peak",
  "    # ring 이 되려면: 값이 peak 보다 작고 (v < M), 같은 값 2 마리 이상": "    # a ring needs: value below peak (v < M) AND appears at least twice",
  "// (앞부분 생략)": "// (earlier part omitted)",
  "        // ring 이 되려면: v < M 이고 같은 값이 2 마리 이상": "        // a ring needs: v < M AND appears at least twice",
  "            // v 를 이미 셌으면 skip": "            // skip v if we already counted it",
  "            // v 가 몇 번 나오는지 세고 ≥ 2 면 ring": "            // count how many v's; >= 2 means a ring",
  "    # 길이 = 2·rings + 1 (좌+우 mirror = 2 마리, peak 1 마리)": "    # length = 2*rings + 1 (left+right mirror = 2 cows, peak = 1)",
  "        // 길이 = 2·rings + 1": "        // length = 2*rings + 1",
  "# 매번 h.count(v) 대신 — 빈도를 한 번만 세두면?": "# instead of h.count(v) every time — count freq just once?",
  "    freq[v] = freq.get(v, 0) + 1   # h 한 번만 훑음 → O(N)": "    freq[v] = freq.get(v, 0) + 1   # one pass over h -> O(N)",
  "    if v < M and freq[v] >= 2:     # lookup 은 즉시 (O(1))": "    if v < M and freq[v] >= 2:     # lookup is instant (O(1))",
  "// 키가 1..N 이라 — 그냥 freq[키] 인덱스로 빈도 저장하면 어떨까?": "// keys are 1..N — what if we index freq[key] directly?",
  "    freq[h[i]]++;                  // h 한 번만 훑기 → O(N)": "    freq[h[i]]++;                  // one pass over h -> O(N)",
  "        rings++;                   // lookup 은 즉시": "        rings++;                   // lookup is instant",
  "    cnt = Counter(h)            # 한 줄로 dict 빈도 — O(N)": "    cnt = Counter(h)            # one line for the freq dict — O(N)",
  "        vector<int> freq(N + 2, 0);    // 인덱스 = 키, 값 = 빈도": "        vector<int> freq(N + 2, 0);    // index = key, value = freq",
  "            freq[h]++;                 // 입력 받으면서 빈도 누적": "            freq[h]++;                 // tally freq while reading",
  "                M = h;                 // peak 도 같이": "                M = h;                 // track peak too",
};
const cx = (E, arr) => E ? arr.map(l => (CP_CMT_EN[l] !== undefined ? CP_CMT_EN[l] : l)) : arr;


export function getCowPhotosSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read input — T cases, then N + heights", "1️⃣ 입력 읽기 — T 케이스, N + 키"),
      color: "#d97706",
      py: cx(E, CP_STEP1_PY), cpp: cx(E, CP_STEP1_CPP),
      why: [
        t(E, "T independent test cases. For each: read N, then N heights as a list.",
            "독립 테스트 T 개. 각 케이스: N 읽고, 그 다음 줄에서 키 N 개를 list 로."),
      ],
      aside: <CpAside E={E} highlight={[0, 1, 2]} note={t(E, "First case (after T): N = 4, heights = [1, 1, 2, 3].", "첫 케이스 (T 다음): N = 4, 키 = [1, 1, 2, 3].")} />,
    },
    {
      label: t(E, "2️⃣ Find max height (peak candidate)", "2️⃣ 가장 큰 키 찾기 (peak 후보)"),
      color: "#0891b2",
      py: cx(E, CP_STEP2_PY), cpp: cx(E, CP_STEP2_CPP),
      why: [
        t(E, "Peak is always the LARGEST height — mountain top must be highest.",
            "peak 는 항상 가장 큰 키 — mountain 꼭대기는 제일 높음."),
        t(E, "Setting peak = M means every value below M is a candidate ring (max possible photo).",
            "peak = M 으로 두면 M 보다 작은 모든 값이 ring 후보 (사진 최대 길이)."),
      ],
    },
    {
      label: t(E, "3️⃣ Count 'ring' values (v < M, freq ≥ 2)", "3️⃣ ring 값 세기 (v < M, freq ≥ 2)"),
      color: "#7c3aed",
      py: cx(E, CP_STEP3_PY), cpp: cx(E, CP_STEP3_CPP),
      why: [
        t(E, "A value v can sit on both sides of the peak only if (a) at least 2 cows have height v AND (b) v < M (peak must be strictly higher).",
            "값 v 가 양옆에 들어가려면 (a) 그 키의 소가 2 마리 이상 AND (b) v < M (peak 가 더 커야)."),
        t(E, "This is the constraint the naive '2·pairs+1' formula MISSED — it's why [3,3,2,1] gives 1, not 3.",
            "단순 '2·페어+1' 공식이 놓친 제약 — [3,3,2,1] 의 답이 3 이 아니라 1 인 이유."),
      ],
    },
    {
      label: t(E, "4️⃣ Apply formula 2·rings + 1 + print", "4️⃣ 공식 2·rings + 1 적용 + 출력"),
      color: "#16a34a",
      py: cx(E, CP_FULL_PY), cpp: cx(E, CP_FULL_CPP),
      why: [
        t(E, "Each ring contributes 2 cows (one on each side, mirrored). The peak contributes 1. So length = 2·rings + 1.",
            "각 ring 이 2 마리 기여 (좌+우 mirror). peak 가 1 마리. 그래서 길이 = 2·rings + 1."),
        t(E, "Always at least 1: even with 0 rings, we can take any single cow alone (just a peak, no rings).",
            "항상 최소 1: ring 이 0 개여도 한 마리만으로 길이 1 사진 가능 (peak 만)."),
        t(E, "Done — small inputs work. But what happens at N = 100,000? Next steps explore that.",
            "끝 — 작은 입력에선 잘 돼요. 그런데 N = 10만 이면? 다음 단계에서 봐요."),
      ],
    },
    /* ─────────── 5–7: WHY → BRAINSTORM → IMPLEMENT (procedural optimization) ─── */
    {
      label: t(E, "5️⃣ Why is this slow on big N?", "5️⃣ 왜 큰 N 에선 느릴까?"),
      color: "#dc2626",
      // 같은 코드를 다시 보여줌 — 어디가 병목인지 분석하는 단계
      py: cx(E, CP_FULL_PY), cpp: cx(E, CP_FULL_CPP),
      why: [
        t(E, "Look at the inner loop: `h.count(v)` scans the WHOLE array h once — O(N) work.",
            "안쪽 루프 보세요: `h.count(v)` 가 매번 h 전체를 한 번 훑어요 — O(N)."),
        t(E, "And we do that for EACH distinct v (there can be up to N of them) → up to N × N work per case.",
            "그리고 그걸 distinct v 마다 (최대 N 개) → 케이스당 최대 N × N 일."),
        t(E, "USACO N can be 100,000. N² = 10 billion. Way too slow → TLE on big test cases.",
            "USACO 의 N 은 10 만까지. N² = 100 억. 너무 느림 → 큰 테스트에서 TLE."),
      ],
    },
    {
      label: t(E, "6️⃣ Idea — count frequencies ONCE", "6️⃣ 아이디어 — 빈도를 한 번만 세두자"),
      color: "#0891b2",
      py: cx(E, CP_INSIGHT_PY), cpp: cx(E, CP_INSIGHT_CPP),
      why: [
        t(E, "Frequencies of values in h don't change while we work. So why count v's appearances every time?",
            "h 안의 빈도는 우리가 작업하는 동안 안 바뀌는데, 왜 매번 셀까?"),
        t(E, "Plan: walk h ONCE, build a freq table. Then ring-check is just `freq[v] >= 2` — instant lookup.",
            "계획: h 를 한 번만 훑어 freq 표를 만든다. 그 다음 ring 검사는 그냥 `freq[v] >= 2` — 즉시."),
        t(E, "Total: O(N) to build + O(distinct) to scan = O(N) per case. 100x–1000x faster on large inputs.",
            "총 일: O(N) 으로 만들기 + O(distinct) 로 훑기 = O(N) per case. 큰 입력에서 100~1000 배 빨라짐."),
      ],
    },
    {
      label: t(E, "7️⃣ Final fast code — Counter (Py) / freq array (C++)", "7️⃣ 최종 빠른 코드 — Counter (Py) / freq 배열 (C++)"),
      color: "#15803d",
      py: cx(E, CP_FAST_PY), cpp: cx(E, CP_FAST_CPP),
      why: [
        t(E, "Python: `Counter(h)` builds the dict in one line. Same logic as before, just using `cnt[v]` instead of `h.count(v)`.",
            "Python: `Counter(h)` 한 줄로 dict 완성. 로직은 똑같고 `h.count(v)` 자리만 `cnt[v]` 로."),
        t(E, "C++: heights are guaranteed 1..N, so we use the value AS the index. No need to even store h — we accumulate freq while reading input.",
            "C++: 키가 1..N 으로 보장 → 값 자체를 인덱스로. h 를 따로 저장할 필요 없이 입력 받으면서 freq 누적."),
      ],
    },
  ];
}

export function CowPhotosProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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

export function downloadCowPhotosPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "More Cow Photos — Full Study Guide", "📸 More Cow Photos — 종합 풀이 노트");
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
