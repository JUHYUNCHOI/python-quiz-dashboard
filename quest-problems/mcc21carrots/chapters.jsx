import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc21CarrotsSections } from "./components";

function CarrotTripleSim({ E }) {
  const carrots = [3, 6, 9, 5, 7];
  const D = 3;
  const N = carrots.length;
  const triples = [];
  for (let i = 0; i < N; i++)
    for (let j = i + 1; j < N; j++)
      for (let k = j + 1; k < N; k++)
        triples.push([i, j, k]);
  const [step, setStep] = useState(0);
  const cur = step < triples.length ? triples[step] : null;
  const validCount = triples.slice(0, step + 1).filter(([i, j, k]) => (carrots[i] + carrots[j] + carrots[k]) % D === 0).length;
  const sum = cur ? carrots[cur[0]] + carrots[cur[1]] + carrots[cur[2]] : 0;
  const ok = cur ? sum % D === 0 : false;
  const reset = () => setStep(0);
  const next = () => setStep(s => Math.min(s + 1, triples.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
          🔬 {t(E, "Deep Audit", "깊이 살펴보기")}
        </div>
        <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
          {t(E, "Step through every (i, j, k) triple. Watch which sums are divisible by D.",
                "모든 (i, j, k) 조합을 한 단계씩. 어떤 합이 D 로 나누어떨어지는지 봐요.")}
        </div>
      </div>

      <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: C.dim, marginBottom: 6 }}>
          {t(E, "Baskets c[]", "바구니 c[]")} (N={N}, D={D})
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {carrots.map((v, idx) => {
            const inTriple = cur && (idx === cur[0] || idx === cur[1] || idx === cur[2]);
            return (
              <div key={idx} style={{
                width: 54, padding: "8px 4px", textAlign: "center",
                background: inTriple ? (ok ? "#d1fae5" : "#fef3c7") : "#f8fafc",
                border: `2px solid ${inTriple ? (ok ? "#059669" : "#f59e0b") : C.border}`,
                borderRadius: 8, transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 10, color: C.dim }}>i={idx}</div>
                <div style={{ fontSize: 18 }}>🥕</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: inTriple ? (ok ? "#059669" : "#92400e") : C.text }}>{v}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: "#0f172a", color: "#f8fafc", padding: 12, borderRadius: 10, marginBottom: 10, fontFamily: "monospace", fontSize: 13 }}>
        <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 4 }}>
          {t(E, "Triple", "조합")} {step + 1} / {triples.length}
        </div>
        {cur ? (
          <div>
            <div>(i, j, k) = (<span style={{ color: "#fbbf24" }}>{cur[0]}</span>, <span style={{ color: "#fbbf24" }}>{cur[1]}</span>, <span style={{ color: "#fbbf24" }}>{cur[2]}</span>)</div>
            <div style={{ marginTop: 4 }}>
              c[{cur[0]}] + c[{cur[1]}] + c[{cur[2]}] = {carrots[cur[0]]} + {carrots[cur[1]]} + {carrots[cur[2]]} = <span style={{ color: "#34d399", fontWeight: 700 }}>{sum}</span>
            </div>
            <div style={{ marginTop: 4 }}>
              {sum} % {D} = <span style={{ color: ok ? "#34d399" : "#fb7185", fontWeight: 700 }}>{sum % D}</span>
              {ok ? ` ✅ ${t(E, "count!", "카운트!")}` : ` ❌ ${t(E, "skip", "건너뜀")}`}
            </div>
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <button onClick={prev} disabled={step === 0} style={{
          padding: "6px 14px", borderRadius: 8, border: `1.5px solid #059669`,
          background: step === 0 ? "#f3f4f6" : "#fff", color: step === 0 ? C.dim : "#059669",
          fontWeight: 700, cursor: step === 0 ? "not-allowed" : "pointer", fontSize: 12,
        }}>← {t(E, "Prev", "이전")}</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>
          {t(E, "Valid so far:", "지금까지 유효:")} <span style={{ fontSize: 16 }}>{validCount}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={reset} style={{
            padding: "6px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`,
            background: "#fff", color: C.dim, fontWeight: 600, cursor: "pointer", fontSize: 12,
          }}>{t(E, "Reset", "처음")}</button>
          <button onClick={next} disabled={step >= triples.length - 1} style={{
            padding: "6px 14px", borderRadius: 8, border: `1.5px solid #059669`,
            background: step >= triples.length - 1 ? "#f3f4f6" : "#059669",
            color: step >= triples.length - 1 ? C.dim : "#fff",
            fontWeight: 700, cursor: step >= triples.length - 1 ? "not-allowed" : "pointer", fontSize: 12,
          }}>{t(E, "Next", "다음")} →</button>
        </div>
      </div>
    </div>
  );
}

export const SOLUTION_CODE = [
  "N, D = map(int, input().split())",
  "c = list(map(int, input().split()))",
  "",
  "# Count triples (i, j, k) with i < j < k whose carrot sum is divisible by D",
  "count = 0",
  "for i in range(N):",
  "    for j in range(i+1, N):",
  "        for k in range(j+1, N):",
  "            if (c[i] + c[j] + c[k]) % D == 0:",
  "                count += 1",
  "",
  "print(count)",
];

export function makeMcc21CarrotsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A rabbit has N baskets, basket i with c[i] carrots, and a target divisor D. Pick 3 distinct baskets whose carrot total is divisible by D.\nPrint how many such triples exist.",
        "토끼에게 N 개의 바구니가 있고, i 번 바구니에 c[i] 당근, 목표 약수 D 가 주어져요. 합이 D 로 나누어떨어지는 서로 다른 3 개 바구니를 골라요.\n그런 세 개 조합의 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udd55"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Carrots</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E, "Count triples of baskets whose carrot sum divides evenly by D.", "당근 합이 D 로 나누어떨어지는 바구니 세 개 조합 개수를 세요.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A rabbit has ", "토끼에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N baskets with c[i] carrots each", "각 c[i] 당근의 N 개 바구니")}</b>
                  {t(E, " and a divisor ", " 와 약수 ")}
                  <b style={{ color: "#7c3aed" }}>D</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Pick ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "3 distinct baskets", "서로 다른 3 개 바구니")}</b>
                  {t(E, " whose carrot total is divisible by D.",
                        " 를 골라요. 합이 D 로 나누어떨어지게요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of such valid triples", "조건에 맞는 세 개 조합의 개수")}</b>
                  {t(E, ".", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Given baskets [3, 6, 9], their sum is 18. Is 18 divisible by 3?", "바구니 [3, 6, 9]의 합은 18이에요. 18은 3으로 나누어떨어질까?"),
      question: t(E,
        "Baskets [3, 6, 9]. Sum = 18. Is 18 divisible by 3?",
        "바구니 [3, 6, 9]. 합 = 18. 18은 3으로 나누어떨어져요?"),
      options: [
        t(E, "Yes, 18 / 3 = 6", "맞아, 18 / 3 = 6"),
        t(E, "No, it has remainder", "아니, 나머지가 있어"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 18 / 3 = 6 with no remainder.",
        "맞아! 18 / 3 = 6, 나머지 없어요."),
    },
    {
      type: "input",
      narr: t(E,
        "What is the sum of baskets [3, 6, 9]?", "바구니 [3, 6, 9]의 합은?"),
      question: t(E,
        "Baskets = [3, 6, 9]. What is their sum?",
        "바구니 = [3, 6, 9]. 합은 얼마예요?"),
      hint: t(E, "Add the three numbers together.", "세 숫자를 모두 더해요."),
      answer: 18,
    },
    {
      type: "reveal",
      narr: t(E,
        "Now walk every triple of c = [3, 6, 9, 5, 7] with D = 3. Each step shows one (i, j, k) — see which sums divide and which don't. Count grows live.",
        "c = [3, 6, 9, 5, 7], D = 3 의 모든 조합을 직접 걸어봐요. 매 단계마다 한 (i, j, k) — 어떤 합이 나누어떨어지고 어떤 건 안 되는지. 카운트가 실시간으로 늘어요."),
      content: <CarrotTripleSim E={E} />,
    },
  ];
}

export function makeMcc21CarrotsCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Triple nested loops over all distinct triples (i, j, k). For each, check if c[i] + c[j] + c[k] is divisible by D. Count valid triples. Sections build it one piece at a time.",
        "모든 서로 다른 삼중조합 (i, j, k) 에 대해 삼중 반복. c[i] + c[j] + c[k] 가 D 로 나누어떨어지는지 확인. 유효한 조합의 수 카운트. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc21CarrotsSections(E),
    },
  ];
}
