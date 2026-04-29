import { C, t } from "@/components/quest/theme";

export const SOLUTION_CODE = [
  "N = int(input())",
  "milk = list(map(int, input().split()))",
  "",
  "total = sum(milk)",
  "avg = total // N",
  "extra = total % N",
  "",
  "# After enough rounds, milk distributes evenly",
  "# (N - extra) cows get avg, extra cows get avg+1",
  "result = [avg + 1] * extra + [avg] * (N - extra)",
  "print(' '.join(map(str, result)))",
];

/* ─── helper: cow circle ─── */
function CowCircle({ values, highlight = [], accent = "#2563eb", size = 130 }) {
  const n = values.length;
  const cx = size / 2, cy = size / 2, r = size * 0.36;
  return (
    <svg width={size} height={size} style={{ display: "block", margin: "0 auto" }}>
      <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 3" />
      {values.map((v, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        const hl = highlight.includes(i);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={16} fill={hl ? accent : "#eff6ff"} stroke={hl ? accent : "#93c5fd"} strokeWidth="2" />
            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
              style={{ fontSize: 12, fontWeight: 900, fill: hl ? "#fff" : accent, fontFamily: "'JetBrains Mono',monospace" }}>
              {v}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── helper: milk bar chart ─── */
function MilkBars({ values, max, accent = "#2563eb", labels }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", alignItems: "flex-end" }}>
      {values.map((v, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: accent, marginBottom: 2 }}>{v}</div>
          <div style={{
            width: 32, height: Math.max(4, (v / max) * 60), borderRadius: "4px 4px 0 0",
            background: accent, opacity: 0.7 + (v / max) * 0.3,
          }} />
          {labels && <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>{labels[i]}</div>}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (10 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeExchangeCh1(E) {
  return [
    // 1-1 타이틀
    {
      type: "reveal",
      narr: t(E,
        "N cows stand in a circle. Each round, every cow passes ALL her milk to the next cow clockwise. After many rounds, what happens? 🥛",
        "N마리 소가 원형으로 서있어. 매 라운드마다 모든 소가 우유를 시계방향 다음 소에게 전달. 여러 라운드 후 어떻게 될까? 🥛"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🥛</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Milk Exchange</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2024 Bronze #2</div>
        </div>),
    },

    // 1-2 원형 배치
    {
      type: "reveal",
      narr: t(E,
        "Let's start with a simple example: 4 cows with milk amounts [5, 3, 8, 4]. They stand in a circle!",
        "간단한 예시부터: 우유가 [5, 3, 8, 4]인 4마리 소. 원형으로 서있어!"),
      content: (
        <div style={{ padding: 16 }}>
          <CowCircle values={[5, 3, 8, 4]} size={140} />
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 12, color: C.dim }}>
            {t(E, "Each number = milk amount for that cow", "각 숫자 = 그 소의 우유 양")}
          </div>
        </div>),
    },

    // 1-3 한 라운드 시뮬
    {
      type: "reveal",
      narr: t(E,
        "Round 1: Each cow passes milk to the next cow clockwise. Cow 0's milk (5) goes to cow 1. Cow 1's milk (3) goes to cow 2. And so on!",
        "라운드 1: 각 소가 시계방향 다음 소에게 전달. 소0의 우유(5)가 소1에게. 소1의 우유(3)가 소2에게. 계속!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Before", "전")}</div>
              <MilkBars values={[5, 3, 8, 4]} max={8} labels={["c0","c1","c2","c3"]} />
            </div>
            <div style={{ fontSize: 24, color: "#2563eb", fontWeight: 900 }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "After round 1", "라운드 1 후")}</div>
              <MilkBars values={[4, 5, 3, 8]} max={8} labels={["c0","c1","c2","c3"]} accent="#16a34a" />
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: C.dim }}>
            {t(E, "Cow i gets milk from cow (i-1). Cow 0 gets from cow 3 (wrap around)!",
                  "소 i가 소 (i-1)에게서 받음. 소 0은 소 3에게서 (원형이니까)!")}
          </div>
        </div>),
    },

    // 1-4 퀴즈: 라운드 후
    {
      type: "quiz",
      narr: t(E,
        "After round 1: each cow has the milk of the previous cow. The milk just 'rotates' around the circle!",
        "라운드 1 후: 각 소는 이전 소의 우유를 가짐. 우유가 원형으로 '회전'하는 것!"),
      question: t(E,
        "Start: [5,3,8,4]. After 1 round, cow 2 has...?",
        "시작: [5,3,8,4]. 1라운드 후 소2는...?"),
      options: [
        t(E, "3 (cow 1's original milk)", "3 (소1의 원래 우유)"),
        t(E, "8 (cow 2's original milk)", "8 (소2의 원래 우유)"),
        t(E, "5 (cow 0's original milk)", "5 (소0의 원래 우유)"),
      ],
      correct: 0,
      explain: t(E, "Cow 2 receives from cow 1 (who had 3) ✅", "소2는 소1(3 보유)에게서 받음 ✅"),
    },

    // 1-5 총량 보존
    {
      type: "reveal",
      narr: t(E,
        "Key insight: the TOTAL milk never changes! Each round just moves milk around. 5+3+8+4 = 20 before AND after.",
        "핵심: 총 우유량은 절대 변하지 않아! 매 라운드는 우유를 이동시킬 뿐. 5+3+8+4 = 20 전이나 후나."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 8 }}>
            {[5, 3, 8, 4].map((v, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: 8,
                background: "#dbeafe", border: "2px solid #93c5fd",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 900, color: "#2563eb",
              }}>{v}</div>
            ))}
            <div style={{ alignSelf: "center", fontSize: 16, fontWeight: 900, color: C.dim }}>=</div>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: "#16a34a", border: "2px solid #16a34a",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 900, color: "#fff",
            }}>20</div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a" }}>
            {t(E, "Total stays 20 forever — milk is conserved!", "총량은 영원히 20 — 우유는 보존돼!")}
          </div>
        </div>),
    },

    // 1-6 무한 라운드 후
    {
      type: "reveal",
      narr: t(E,
        "After INFINITE rounds, the milk distributes as evenly as possible. Total 20 ÷ 4 cows = 5 each! Everyone gets the average.",
        "무한 라운드 후, 우유는 가능한 균등하게 분배. 총 20 ÷ 4마리 = 각 5! 모두 평균을 받아."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Start", "시작")}</div>
              <MilkBars values={[5, 3, 8, 4]} max={8} />
            </div>
            <div style={{ fontSize: 20, color: "#2563eb", fontWeight: 900 }}>→∞→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "After ∞ rounds", "∞ 라운드 후")}</div>
              <MilkBars values={[5, 5, 5, 5]} max={8} accent="#16a34a" />
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 13, fontWeight: 800, color: "#16a34a" }}>
            20 ÷ 4 = 5 {t(E, "each!", "씩!")}
          </div>
        </div>),
    },

    // 1-7 퀴즈: 평균
    {
      type: "quiz",
      narr: t(E,
        "After infinite rounds, every cow has total/N. That's just the average!",
        "무한 라운드 후, 모든 소가 total/N을 가짐. 그냥 평균!"),
      question: t(E,
        "N=5, milk=[2,4,6,8,10]. Total=30. Each cow gets?",
        "N=5, milk=[2,4,6,8,10]. 합계=30. 각 소는?"),
      options: ["6", "30", "5", "10"],
      correct: 0,
      explain: t(E, "30 ÷ 5 = 6 ✅", "30 ÷ 5 = 6 ✅"),
    },

    // 1-8 나누어 떨어지지 않으면?
    {
      type: "reveal",
      narr: t(E,
        "What if total doesn't divide evenly? N=3, total=7. We can't give 7/3 = 2.33... to each. Instead: some cows get ⌊7/3⌋=2, others get 3!",
        "균등하게 안 나눠지면? N=3, 합계=7. 7/3 = 2.33... 불가. 대신: 일부는 ⌊7/3⌋=2, 나머지는 3!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <div style={{ background: "#dbeafe", borderRadius: 10, padding: 10, textAlign: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>
                7 ÷ 3 = 2 ... 1
              </span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ background: "#f0fdf4", borderRadius: 10, padding: 10, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a" }}>avg = 7 // 3</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#16a34a" }}>2</div>
              </div>
              <div style={{ background: "#fef2f2", borderRadius: 10, padding: 10, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#dc2626" }}>extra = 7 % 3</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#dc2626" }}>1</div>
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
              → {t(E, "1 cow gets 3, 2 cows get 2", "1마리 3, 2마리 2")}
            </div>
          </div>
        </div>),
    },

    // 1-9 입력: 나머지
    {
      type: "input",
      narr: t(E,
        "N=4, total=10. How many cows get avg+1? That's 10 % 4.",
        "N=4, 합계=10. 몇 마리가 avg+1을 받아? 10 % 4 계산."),
      question: t(E, "10 % 4 = ?", "10 % 4 = ?"),
      answer: 2,
    },

    // 1-10 정리
    {
      type: "reveal",
      narr: t(E,
        "Summary: after infinite rounds, extra = total%N cows get avg+1, and (N-extra) cows get avg. That's the entire answer!",
        "정리: 무한 라운드 후, extra = total%N 마리가 avg+1, (N-extra) 마리가 avg. 이게 전체 답!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#16a34a", marginBottom: 6 }}>
              {t(E, "The Formula", "공식")}
            </div>
            <div style={{ fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 2 }}>
              <div>avg = total // N</div>
              <div>extra = total % N</div>
              <div>{t(E, "extra cows → avg+1", "extra 마리 → avg+1")}</div>
              <div>{t(E, "(N-extra) cows → avg", "(N-extra) 마리 → avg")}</div>
            </div>
          </div>
        </div>),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 왜 이게 맞는지 (8 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeExchangeCh2(E) {
  return [
    // 2-1 회전의 본질
    {
      type: "reveal",
      narr: t(E,
        "Each round is just a ROTATION of all milk values. Cow i gets cow (i-1)'s milk. After N rounds, everything returns to the start!",
        "매 라운드는 모든 우유 값의 회전일 뿐. 소 i가 소 (i-1)의 우유를 받아. N라운드 후 모든 게 원래대로!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: t(E, "Round 0", "라운드 0"), values: [5, 3, 8, 4] },
              { label: t(E, "Round 1", "라운드 1"), values: [4, 5, 3, 8] },
              { label: t(E, "Round 2", "라운드 2"), values: [8, 4, 5, 3] },
              { label: t(E, "Round 3", "라운드 3"), values: [3, 8, 4, 5] },
              { label: t(E, "Round 4", "라운드 4"), values: [5, 3, 8, 4] },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: i === 4 ? "#f0fdf4" : (i % 2 === 0 ? "#eff6ff" : "#f8fafc"),
                borderRadius: 8, padding: "6px 10px",
                border: i === 4 ? "2px solid #86efac" : "none",
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: i === 4 ? "#16a34a" : C.dim, width: 60 }}>{row.label}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {row.values.map((v, j) => (
                    <div key={j} style={{
                      width: 28, height: 28, borderRadius: 6,
                      background: i === 4 ? "#dcfce7" : "#dbeafe",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 900, color: i === 4 ? "#16a34a" : "#2563eb",
                    }}>{v}</div>
                  ))}
                </div>
                {i === 4 && <span style={{ fontSize: 10, fontWeight: 700, color: "#16a34a" }}>= {t(E, "back to start!", "원래대로!")}</span>}
              </div>
            ))}
          </div>
        </div>),
    },

    // 2-2 정수 나눗셈 vs 나머지
    {
      type: "reveal",
      narr: t(E,
        "Python's // is integer division (floor). % is modulo (remainder). These two work together: total = (total // N) × N + (total % N).",
        "파이썬의 //는 정수 나눗셈(내림). %는 나머지. 이 둘이 함께 작동: total = (total // N) × N + (total % N)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#e2e8f0" }}>7 // 3  </span><span style={{ color: "#6b7280" }}># → 2 (quotient)</span></div>
            <div><span style={{ color: "#e2e8f0" }}>7 % 3   </span><span style={{ color: "#6b7280" }}># → 1 (remainder)</span></div>
            <div><span style={{ color: "#6b7280" }}># Check: 2 × 3 + 1 = 7 ✅</span></div>
          </div>
        </div>),
    },

    // 2-3 퀴즈: 정수 나눗셈
    {
      type: "quiz",
      narr: t(E, "Let's practice! 13 // 5 = ?", "연습! 13 // 5 = ?"),
      question: t(E, "13 // 5 = ?", "13 // 5 = ?"),
      options: ["2", "3", "2.6", "13"],
      correct: 0,
      explain: t(E, "13 ÷ 5 = 2 remainder 3. Floor = 2 ✅", "13 ÷ 5 = 2 나머지 3. 내림 = 2 ✅"),
    },

    // 2-4 입력: 나머지 연습
    {
      type: "input",
      narr: t(E,
        "13 % 5 = the remainder when 13 is divided by 5.",
        "13 % 5 = 13을 5로 나눈 나머지."),
      question: t(E, "13 % 5 = ?", "13 % 5 = ?"),
      answer: 3,
    },

    // 2-5 결과 배열 구성
    {
      type: "reveal",
      narr: t(E,
        "Building the result: make a list with 'extra' copies of (avg+1) and (N-extra) copies of avg. Example: N=4, total=10 → avg=2, extra=2.",
        "결과 배열 구성: (avg+1) extra개 + avg (N-extra)개. 예: N=4, 합계=10 → avg=2, extra=2."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
            {[3, 3, 2, 2].map((v, i) => (
              <div key={i} style={{
                width: 40, height: 40, borderRadius: 8,
                background: v === 3 ? "#dc2626" : "#2563eb",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 900, color: "#fff",
              }}>{v}</div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, fontSize: 11, fontWeight: 700 }}>
            <span style={{ color: "#dc2626" }}>2 × (avg+1=3)</span>
            <span style={{ color: "#2563eb" }}>2 × (avg=2)</span>
          </div>
          <div style={{ textAlign: "center", marginTop: 6, fontSize: 12, color: C.dim }}>
            {t(E, "Check: 3+3+2+2 = 10 = total ✅", "확인: 3+3+2+2 = 10 = 합계 ✅")}
          </div>
        </div>),
    },

    // 2-6 퀴즈: 결과 확인
    {
      type: "quiz",
      narr: t(E,
        "N=5, total=13. avg=2, extra=3. How many cows get 2?",
        "N=5, 합계=13. avg=2, extra=3. 2를 받는 소는 몇 마리?"),
      question: t(E, "N - extra = 5 - 3 = ?", "N - extra = 5 - 3 = ?"),
      options: ["2", "3", "5", "0"],
      correct: 0,
      explain: t(E, "5 - 3 = 2 cows get avg=2. The other 3 get avg+1=3 ✅", "5 - 3 = 2마리가 avg=2. 나머지 3마리가 avg+1=3 ✅"),
    },

    // 2-7 균등 분배인 경우
    {
      type: "reveal",
      narr: t(E,
        "Special case: if total divides evenly (extra=0), ALL cows get the same amount! [avg, avg, ..., avg].",
        "특수 경우: 균등 분배 시 (extra=0), 모든 소가 같은 양! [avg, avg, ..., avg]."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ background: "#f0fdf4", borderRadius: 10, padding: 10, border: "2px solid #86efac" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#16a34a", marginBottom: 4 }}>
              {t(E, "N=4, total=20 → extra=0", "N=4, 합계=20 → extra=0")}
            </div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
              {[5, 5, 5, 5].map((v, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: 8, background: "#16a34a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 900, color: "#fff",
                }}>{v}</div>
              ))}
            </div>
          </div>
        </div>),
    },

    // 2-8 입력: 큰 예시
    {
      type: "input",
      narr: t(E,
        "N=7, total=25. avg = 25 // 7 = 3. extra = 25 % 7 = ?",
        "N=7, 합계=25. avg = 25 // 7 = 3. extra = 25 % 7 = ?"),
      question: t(E, "25 % 7 = ?", "25 % 7 = ?"),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (8 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeExchangeCh3(E) {
  return [
    // 3-1 입력 읽기
    {
      type: "reveal",
      narr: t(E,
        "Step 1: Read N and the milk amounts.",
        "1단계: N과 우유 양 읽기."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#e2e8f0" }}>N = </span><span style={{ color: "#c084fc" }}>int</span><span style={{ color: "#e2e8f0" }}>(</span><span style={{ color: "#c084fc" }}>input</span><span style={{ color: "#e2e8f0" }}>())</span></div>
            <div><span style={{ color: "#e2e8f0" }}>milk = </span><span style={{ color: "#c084fc" }}>list</span><span style={{ color: "#e2e8f0" }}>(</span><span style={{ color: "#c084fc" }}>map</span><span style={{ color: "#e2e8f0" }}>(</span><span style={{ color: "#c084fc" }}>int</span><span style={{ color: "#e2e8f0" }}>, </span><span style={{ color: "#c084fc" }}>input</span><span style={{ color: "#e2e8f0" }}>().split()))</span></div>
          </div>
        </div>),
    },

    // 3-2 합계, 평균, 나머지
    {
      type: "reveal",
      narr: t(E,
        "Step 2: Compute total, average (floor), and extra (remainder).",
        "2단계: 합계, 평균(내림), 나머지 계산."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#e2e8f0" }}>total = </span><span style={{ color: "#c084fc" }}>sum</span><span style={{ color: "#e2e8f0" }}>(milk)</span></div>
            <div><span style={{ color: "#e2e8f0" }}>avg = total // N</span></div>
            <div><span style={{ color: "#e2e8f0" }}>extra = total % N</span></div>
          </div>
        </div>),
    },

    // 3-3 퀴즈: sum()
    {
      type: "quiz",
      narr: t(E,
        "Python's sum() adds all elements in a list. sum([5,3,8,4]) = 20.",
        "파이썬의 sum()은 리스트 모든 원소를 더함. sum([5,3,8,4]) = 20."),
      question: t(E, "sum([1, 2, 3, 4, 5]) = ?", "sum([1, 2, 3, 4, 5]) = ?"),
      options: ["15", "5", "120", "10"],
      correct: 0,
      explain: t(E, "1+2+3+4+5 = 15 ✅", "1+2+3+4+5 = 15 ✅"),
    },

    // 3-4 결과 리스트 구성
    {
      type: "reveal",
      narr: t(E,
        "Step 3: Build the result list. Python trick: [x] * n creates a list with x repeated n times!",
        "3단계: 결과 리스트 구성. 파이썬 트릭: [x] * n은 x를 n번 반복한 리스트!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#e2e8f0" }}>result = [avg + 1] * extra + [avg] * (N - extra)</span></div>
            <div>&nbsp;</div>
            <div style={{ color: "#6b7280" }}># Example: avg=2, extra=2, N=5</div>
            <div style={{ color: "#6b7280" }}># [3]*2 + [2]*3 = [3,3,2,2,2]</div>
          </div>
        </div>),
    },

    // 3-5 퀴즈: 리스트 곱셈
    {
      type: "quiz",
      narr: t(E,
        "[7] * 3 creates [7, 7, 7]. List multiplication repeats the list!",
        "[7] * 3은 [7, 7, 7]을 만들어. 리스트 곱셈은 리스트를 반복!"),
      question: t(E, "[5] * 4 = ?", "[5] * 4 = ?"),
      options: ["[5, 5, 5, 5]", "[20]", "[5, 4]", "[5]"],
      correct: 0,
      explain: t(E, "[5] repeated 4 times = [5, 5, 5, 5] ✅", "[5]를 4번 반복 = [5, 5, 5, 5] ✅"),
    },

    // 3-6 출력
    {
      type: "reveal",
      narr: t(E,
        "Step 4: Print the result as space-separated numbers.",
        "4단계: 결과를 공백으로 구분해서 출력."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#c084fc" }}>print</span><span style={{ color: "#e2e8f0" }}>(' '.join(</span><span style={{ color: "#c084fc" }}>map</span><span style={{ color: "#e2e8f0" }}>(</span><span style={{ color: "#c084fc" }}>str</span><span style={{ color: "#e2e8f0" }}>, result)))</span></div>
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: C.dim }}>
            {t(E, "map(str, ...) converts ints to strings, ' '.join() puts spaces between them.", "map(str, ...)이 정수를 문자열로, ' '.join()이 사이에 공백.")}
          </div>
        </div>),
    },

    // 3-7 복잡도
    {
      type: "reveal",
      narr: t(E,
        "Time: O(N) — just sum the list and build the result. Space: O(N) — for the result list. Super efficient!",
        "시간: O(N) — 리스트 합계 구하고 결과 구성. 공간: O(N) — 결과 리스트. 매우 효율적!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>O(N)</div>
          <div style={{ fontSize: 12, color: C.ok, fontWeight: 700, marginTop: 4 }}>
            {t(E, "No simulation needed — pure math!", "시뮬레이션 불필요 — 순수 수학!")}
          </div>
        </div>),
    },

    // 3-8 전체 코드
    {
      type: "code",
      narr: t(E,
        "Complete solution: read, compute sum/avg/extra, build result, print. Just 6 lines! 🎉",
        "완전한 솔루션: 읽기, 합/평균/나머지 계산, 결과 구성, 출력. 단 6줄! 🎉"),
      label: t(E, "💻 Complete Solution", "💻 전체 솔루션"),
      code: SOLUTION_CODE,
    },
  ];
}
