import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getSumKSections } from "./components";

/* ================================================================
   Interactive "Sum of K-th Powers" simulator —
   pick K, watch each a[i]^K being computed and accumulated.
   ================================================================ */
function PowerSumSim({ E }) {
  const [arr, setArr] = useState([1, 2, 3, 4]);
  const [K, setK] = useState(2);
  const [step, setStep] = useState(0); // 0..arr.length (step==arr.length means done)

  const partials = [];
  let running = 0;
  for (let i = 0; i < arr.length; i++) {
    const p = Math.pow(arr[i], K);
    running += p;
    partials.push({ x: arr[i], pow: p, running });
  }
  const finalSum = partials.length ? partials[partials.length - 1].running : 0;
  const visibleRunning = step === 0 ? 0 : partials[step - 1].running;

  const setN = (idx, v) => {
    const n = Math.max(0, Math.min(9, parseInt(v || "0", 10)));
    setArr(a => a.map((x, i) => (i === idx ? n : x)));
    setStep(0);
  };

  const reset = () => setStep(0);
  const stepOnce = () => setStep(s => Math.min(arr.length, s + 1));
  const showAll = () => setStep(arr.length);

  return (
    <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 12, padding: 12, marginBottom: 8 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 10, textAlign: "center" }}>
        🧪 {t(E, "Pick K and array values — step through the sum", "K 와 배열 값을 골라봐 — 합을 한 칸씩 따라가요")}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: "#5b21b6", fontWeight: 700 }}>K =</div>
        <select value={K} onChange={e => { setK(parseInt(e.target.value, 10)); setStep(0); }} style={{
          padding: "4px 8px", fontSize: 13, fontWeight: 700, color: "#5b21b6",
          background: "#fff", border: "1.5px solid #8b5cf6", borderRadius: 6, cursor: "pointer",
        }}>
          {[1,2,3,4].map(k => <option key={k} value={k}>{k}</option>)}
        </select>
        <div style={{ fontSize: 12, color: "#5b21b6", fontWeight: 700, marginLeft: 8 }}>a =</div>
        {arr.map((v, i) => (
          <input
            key={i}
            type="number"
            min={0}
            max={9}
            value={v}
            onChange={e => setN(i, e.target.value)}
            style={{
              width: 36, padding: "3px 4px", textAlign: "center",
              fontSize: 13, fontWeight: 700, color: "#5b21b6",
              background: "#fff", border: "1.5px solid #c4b5fd", borderRadius: 6,
            }}
          />
        ))}
      </div>

      {/* Element row */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        {arr.map((v, i) => {
          const done = i < step;
          const active = i === step - 1;
          return (
            <div key={i} style={{
              minWidth: 78, padding: "6px 8px", borderRadius: 8,
              background: active ? "#8b5cf6" : done ? "#ddd6fe" : "#fff",
              color: active ? "#fff" : "#5b21b6",
              border: `1.5px solid ${active ? "#5b21b6" : "#c4b5fd"}`,
              textAlign: "center", fontSize: 12, fontWeight: 700,
              transition: "all .15s",
            }}>
              <div>{`a[${i}] = ${v}`}</div>
              <div style={{ fontSize: 11, marginTop: 2, opacity: done || active ? 1 : 0.45 }}>
                {`${v}^${K} = ${partials[i].pow}`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Running sum */}
      <div style={{ background: "#fff", border: "1.5px solid #c4b5fd", borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: "#7c3aed", fontWeight: 700, letterSpacing: 0.5, marginBottom: 2 }}>
          {t(E, "RUNNING SUM", "현재까지 합")}
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#5b21b6", fontFamily: "ui-monospace, monospace" }}>
          {step === 0
            ? "0"
            : partials.slice(0, step).map(p => p.pow).join(" + ") + " = " + visibleRunning}
        </div>
        {step === arr.length && (
          <div style={{ fontSize: 11, color: "#15803d", fontWeight: 700, marginTop: 4 }}>
            ✅ {t(E, "Final answer", "최종 답")}: {finalSum}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        <button onClick={reset} style={{
          padding: "5px 12px", fontSize: 12, fontWeight: 700,
          background: "#fff", color: "#8b5cf6", border: "1.5px solid #8b5cf6",
          borderRadius: 6, cursor: "pointer",
        }}>↺ {t(E, "Reset", "처음")}</button>
        <button onClick={stepOnce} disabled={step >= arr.length} style={{
          padding: "5px 12px", fontSize: 12, fontWeight: 700,
          background: step >= arr.length ? "#e5e7eb" : "#8b5cf6",
          color: step >= arr.length ? "#9ca3af" : "#fff",
          border: "1.5px solid " + (step >= arr.length ? "#e5e7eb" : "#8b5cf6"),
          borderRadius: 6, cursor: step >= arr.length ? "not-allowed" : "pointer",
        }}>▶ {t(E, "Step", "한 칸")}</button>
        <button onClick={showAll} style={{
          padding: "5px 12px", fontSize: 12, fontWeight: 700,
          background: "#fff", color: "#7c3aed", border: "1.5px solid #c4b5fd",
          borderRadius: 6, cursor: "pointer",
        }}>⏭ {t(E, "Run all", "모두 보기")}</button>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "# Compute sum of each element raised to power K",
  "result = 0",
  "for x in a:",
  "    result += x ** K",
  "",
  "print(result)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSumKCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given an array of N numbers a[0..N−1] and an integer K, compute Σ a[i]^K — the sum of every element raised to the K-th power.",
        "N 개의 숫자 배열 a[0..N−1] 와 정수 K 가 주어져요. 각 원소를 K 제곱한 값들의 총합 Σ a[i]^K 를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u2211"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>{"Sum^K"}</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P6</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output the sum a[0]^K + a[1]^K + … + a[N−1]^K.",
                "합 a[0]^K + a[1]^K + … + a[N−1]^K 을 출력.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given an ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "array of N numbers a[0..N−1]", "N 개의 숫자 배열 a[0..N−1]")}</b>
                  {t(E, " and an integer ", " 와 정수 ")}
                  <b style={{ color: "#7c3aed" }}>K</b>
                  {t(E, ".", " 이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "a[0]^K + a[1]^K + … + a[N−1]^K", "a[0]^K + a[1]^K + … + a[N−1]^K")}</b>
                  {t(E, ".", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sim — pick K, watch sum of powers accumulate
    {
      type: "reveal",
      narr: t(E,
        "Try the sim — pick K, change a[i] values, then step through one element at a time and watch the running total grow.",
        "직접 해봐 — K 와 a[i] 를 바꿔보고, '한 칸' 버튼으로 한 원소씩 더해지는 합을 따라가요."),
      content: (
        <div style={{ padding: 16 }}>
          <PowerSumSim E={E} />
          <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginTop: 6 }}>
            {t(E,
              "Each card shows a[i]^K. The running sum is a[0]^K + a[1]^K + … so far.",
              "각 카드는 a[i]^K. 합 박스는 지금까지의 a[0]^K + a[1]^K + … 누적값.")}
          </div>
        </div>
      ),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Array = [1, 2, 3], K = 2. Sum of squares: 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14.", "배열 = [1, 2, 3], K = 2. 제곱의 합: 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14."),
      question: t(E,
        "Array=[1,2,3], K=2. What is the sum of squares?",
        "배열=[1,2,3], K=2. 제곱의 합은?"),
      options: [
        t(E, "6", "6"),
        t(E, "14", "14"),
        t(E, "36", "36"),
        t(E, "9", "9"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14.",
        "맞아! 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14야."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Calculate sum of squares for [1, 2, 3]!", "[1, 2, 3]의 제곱의 합을 계산해봐요!"),
      question: t(E,
        "Array=[1,2,3], K=2. Enter the sum:",
        "배열=[1,2,3], K=2. 합을 입력해:"),
      hint: t(E,
        "Square each element and add them up.",
        "각 원소를 제곱한 뒤 다 더해 봐."),
      answer: 14,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSumKCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Iterate the array; for each element x, add x**K to the running total (Python's ** uses fast exponentiation). Sections build it one piece at a time.",
        "배열을 순회 — 각 원소 x 에 x**K 를 누적 (Python 의 ** 는 빠른 거듭제곱). 아래 섹션이 한 단락씩 쌓아요."),
      sections: getSumKSections(E),
    },
  ];
}
