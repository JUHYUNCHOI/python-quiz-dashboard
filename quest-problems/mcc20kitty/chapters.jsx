import { C, t } from "@/components/quest/theme";
import { getMcc20KittySections } from "./components";

export const SOLUTION_CODE = [
  "N = int(input())",
  "",
  "if N <= 3:",
  "    print(1)",
  "else:",
  "    a, b, c = 1, 1, 1",
  "    for i in range(4, N + 1):",
  "        a, b, c = b, c, a + b + c",
  "    print(c)",
];

/* ─── helper: sequence display ─── */
function SeqRow({ values, highlight = -1, accent = "#dc2626", label }) {
  return (
    <div>
      {label && <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4, textAlign: "center" }}>{label}</div>}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
        {values.map((v, i) => (
          <div key={i} style={{
            minWidth: 36, height: 36, borderRadius: 8, padding: "0 6px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
            background: i === highlight ? accent : "#fef2f2",
            border: `2px solid ${i === highlight ? accent : "#fca5a5"}`,
            color: i === highlight ? "#fff" : "#dc2626",
          }}>
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── helper: variable cards ─── */
function VarCards({ vars, accent = "#dc2626" }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
      {vars.map((v, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: v.active ? accent : "#fef2f2",
            border: `2.5px solid ${v.active ? accent : "#fca5a5"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
            color: v.active ? "#fff" : "#dc2626",
          }}>
            {v.value}
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, color: accent, marginTop: 3 }}>{v.label}</div>
          <div style={{ fontSize: 10, color: C.dim }}>{v.desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (10 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc20KittyCh1(E) {
  return [
    // 1-1 타이틀
    {
      type: "reveal",
      narr: t(E,
        "Meet the Kitty sequence!\nIt's like Fibonacci, but adds THREE previous numbers instead of two.\nLet's learn it step by step!\n🐱", "Kitty 수열을 만나자! 피보나치처럼 생겼는데, 이전 두 개가 아니라 세 개를 더해. 하나씩 배우자! 🐱"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🐱</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Kitty Numbers</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P3</div>
        </div>),
    },

    // 1-2 피보나치 복습
    {
      type: "reveal",
      narr: t(E,
        "You probably know Fibonacci: each number = sum of previous TWO.\nF(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5...", "피보나치 알지? 각 숫자 = 이전 두 개의 합. F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5..."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <SeqRow values={["1","1","2","3","5","8","13"]} label={t(E, "Fibonacci: add 2 previous", "피보나치: 이전 2개 더하기")} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8 }}>
            <div style={{ background: "#dbeafe", borderRadius: 8, padding: "4px 8px", fontSize: 11, fontWeight: 700, color: "#2563eb" }}>
              F(n) = F(n-1) + F(n-2)
            </div>
          </div>
        </div>),
    },

    // 1-3 Kitty = 3개 더하기
    {
      type: "reveal",
      narr: t(E,
        "Kitty Numbers (Tribonacci): each number = sum of previous THREE!\nK(n) = K(n-1) + K(n-2) + K(n-3).\nBase: K(1) = K(2) = K(3) = 1.", "Kitty 수열 (트리보나치): 각 숫자 = 이전 세 개의 합!\nK(n) = K(n-1) + K(n-2) + K(n-3).\n기저: K(1) = K(2) = K(3) = 1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            {/* Fibonacci comparison */}
            <div style={{ background: "#dbeafe", borderRadius: 10, padding: 10, width: "100%", maxWidth: 320 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", marginBottom: 4 }}>{t(E, "Fibonacci (2 terms)", "피보나치 (2항)")}</div>
              <div style={{ fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>
                F(n) = F(n-1) + F(n-2)
              </div>
            </div>
            {/* Kitty */}
            <div style={{ background: "#fef2f2", borderRadius: 10, padding: 10, width: "100%", maxWidth: 320, border: "2px solid #fca5a5" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#dc2626", marginBottom: 4 }}>{t(E, "Kitty / Tribonacci (3 terms)", "Kitty / 트리보나치 (3항)")}</div>
              <div style={{ fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>
                K(n) = K(n-1) + K(n-2) + K(n-3)
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-4 기저 조건
    {
      type: "reveal",
      narr: t(E,
        "The base cases are simple: K(1) = 1, K(2) = 1, K(3) = 1.\nThe first three Kitty numbers are all 1!", "기저 조건은 간단: K(1) = 1, K(2) = 1, K(3) = 1. 처음 세 Kitty 수는 모두 1!"),
      content: (
        <div style={{ padding: 16 }}>
          <VarCards vars={[
            { label: "K(1)", value: "1", desc: t(E, "base", "기저"), active: false },
            { label: "K(2)", value: "1", desc: t(E, "base", "기저"), active: false },
            { label: "K(3)", value: "1", desc: t(E, "base", "기저"), active: false },
          ]} />
        </div>),
    },

    // 1-5 K(4) 계산
    {
      type: "reveal",
      narr: t(E,
        "Now K(4)! Add the three before it: K(3) + K(2) + K(1) = 1 + 1 + 1 = 3.", "이제 K(4)! 앞의 세 개를 더해: K(3) + K(2) + K(1) = 1 + 1 + 1 = 3."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 12 }}>
            {[
              { n: "K(3)", v: "1", bg: "#fef2f2" },
              { n: "+", v: "+", bg: "transparent" },
              { n: "K(2)", v: "1", bg: "#fef2f2" },
              { n: "+", v: "+", bg: "transparent" },
              { n: "K(1)", v: "1", bg: "#fef2f2" },
              { n: "=", v: "=", bg: "transparent" },
              { n: "K(4)", v: "3", bg: "#dc2626" },
            ].map((item, i) => (
              item.bg === "transparent" ?
                <span key={i} style={{ fontSize: 18, fontWeight: 900, color: C.dim }}>{item.v}</span> :
                <div key={i} style={{
                  width: 44, height: 44, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
                  background: item.bg === "#dc2626" ? "#dc2626" : item.bg,
                  border: `2px solid ${item.bg === "#dc2626" ? "#dc2626" : "#fca5a5"}`,
                  color: item.bg === "#dc2626" ? "#fff" : "#dc2626",
                }}>{item.v}</div>
            ))}
          </div>
        </div>),
    },

    // 1-6 퀴즈: K(4)
    {
      type: "quiz",
      narr: t(E,
        "Let's verify you got it! K(4) = K(3) + K(2) + K(1).", "확인하자! K(4) = K(3) + K(2) + K(1)."),
      question: t(E, "K(4) = 1 + 1 + 1 = ?", "K(4) = 1 + 1 + 1 = ?"),
      options: ["3", "2", "4", "1"],
      correct: 0,
      explain: t(E, "1 + 1 + 1 = 3! ✅", "1 + 1 + 1 = 3! ✅"),
    },

    // 1-7 K(5) 계산
    {
      type: "reveal",
      narr: t(E,
        "K(5) = K(4) + K(3) + K(2) = 3 + 1 + 1 = 5. See how it grows!", "K(5) = K(4) + K(3) + K(2) = 3 + 1 + 1 = 5. 커지는 게 보이지!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <SeqRow values={["1","1","1","3","5"]} highlight={4} label="K(1) → K(5)" />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim }}>
            K(5) = <span style={{ fontWeight: 900, color: "#dc2626" }}>3</span> + 1 + 1 = <span style={{ fontWeight: 900, color: "#dc2626" }}>5</span>
          </div>
        </div>),
    },

    // 1-8 입력: K(6)
    {
      type: "input",
      narr: t(E,
        "Your turn! K(6) = K(5) + K(4) + K(3) = 5 + 3 + 1 = ?", "네 차례! K(6) = K(5) + K(4) + K(3) = 5 + 3 + 1 = ?"),
      question: t(E, "K(6) = 5 + 3 + 1 = ?", "K(6) = 5 + 3 + 1 = ?"),
      answer: 9,
    },

    // 1-9 전체 수열 보기
    {
      type: "reveal",
      narr: t(E,
        "Here's the Kitty sequence up to K(10)! It grows fast — almost doubling each time.", "K(10)까지의 Kitty 수열! 빠르게 증가해 — 거의 매번 두 배."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { n: 1, v: 1 }, { n: 2, v: 1 }, { n: 3, v: 1 }, { n: 4, v: 3 },
              { n: 5, v: 5 }, { n: 6, v: 9 }, { n: 7, v: 17 }, { n: 8, v: 31 },
              { n: 9, v: 57 }, { n: 10, v: 105 },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: i % 2 === 0 ? "#fef2f2" : "#fff7ed", borderRadius: 8, padding: "5px 10px",
              }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#dc2626", width: 40 }}>K({item.n})</span>
                <div style={{ flex: 1, height: 4, background: "#fecaca", borderRadius: 2 }}>
                  <div style={{ height: "100%", background: "#dc2626", borderRadius: 2, width: `${(item.v / 105) * 100}%`, transition: "width .3s" }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text, width: 36, textAlign: "right" }}>{item.v}</span>
              </div>
            ))}
          </div>
        </div>),
    },

    // 1-10 입력: K(7)
    {
      type: "input",
      narr: t(E,
        "K(7) = K(6) + K(5) + K(4) = 9 + 5 + 3 = ?", "K(7) = K(6) + K(5) + K(4) = 9 + 5 + 3 = ?"),
      question: t(E, "K(7) = 9 + 5 + 3 = ?", "K(7) = 9 + 5 + 3 = ?"),
      answer: 17,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 롤링 변수 전략 (8 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc20KittyCh2(E) {
  return [
    // 2-1 왜 배열이 필요 없는가
    {
      type: "reveal",
      narr: t(E,
        "Do we need to store ALL previous values?\nNo!\nK(n) only uses the LAST THREE values.\nWe just need 3 variables!", "이전 값을 전부 저장해야 할까? 아니! K(n)은 마지막 세 값만 사용. 변수 3개면 충분!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            <div style={{ background: "#fef2f2", borderRadius: 10, padding: 10, border: "2px solid #fca5a5", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#dc2626", marginBottom: 4 }}>
                {t(E, "K(n) needs only:", "K(n)에 필요한 것:")}
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {["K(n-3)", "K(n-2)", "K(n-1)"].map((label, i) => (
                  <div key={i} style={{
                    padding: "6px 10px", borderRadius: 8, background: "#dc2626",
                    fontSize: 13, fontWeight: 800, color: "#fff",
                  }}>{label}</div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 20, color: C.accent, fontWeight: 900 }}>↓</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>
              {t(E, "3 variables: a, b, c — that's all!", "변수 3개: a, b, c — 그게 다!")}
            </div>
          </div>
        </div>),
    },

    // 2-2 변수 초기화
    {
      type: "reveal",
      narr: t(E,
        "Start with a=K(1)=1, b=K(2)=1, c=K(3)=1. These are our 'sliding window' of 3 values.", "a=K(1)=1, b=K(2)=1, c=K(3)=1로 시작. 이게 우리의 '슬라이딩 윈도우' 3개 값."),
      content: (
        <div style={{ padding: 16 }}>
          <VarCards vars={[
            { label: "a", value: "1", desc: "K(1)", active: false },
            { label: "b", value: "1", desc: "K(2)", active: false },
            { label: "c", value: "1", desc: "K(3)", active: false },
          ]} />
        </div>),
    },

    // 2-3 롤링 업데이트 시각화
    {
      type: "reveal",
      narr: t(E,
        "To compute K(4): new_c = a + b + c = 3.\nThen SHIFT: a←b, b←c, c←new_c.\nNow a=1, b=1, c=3.\nThe window moved forward!", "K(4) 계산: new_c = a + b + c = 3. 그리고 SHIFT: a←b, b←c, c←new_c. 이제 a=1, b=1, c=3. 윈도우가 앞으로!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            {/* Before */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, textAlign: "center", marginBottom: 4 }}>{t(E, "Before (K1-K3):", "전 (K1-K3):")}</div>
              <VarCards vars={[
                { label: "a", value: "1", desc: "K(1)" },
                { label: "b", value: "1", desc: "K(2)" },
                { label: "c", value: "1", desc: "K(3)" },
              ]} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 900, color: "#dc2626" }}>a, b, c = b, c, a+b+c</div>
            {/* After */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, textAlign: "center", marginBottom: 4 }}>{t(E, "After (K2-K4):", "후 (K2-K4):")}</div>
              <VarCards vars={[
                { label: "a", value: "1", desc: "K(2)" },
                { label: "b", value: "1", desc: "K(3)" },
                { label: "c", value: "3", desc: "K(4)", active: true },
              ]} />
            </div>
          </div>
        </div>),
    },

    // 2-4 퀴즈: 다음 롤링
    {
      type: "quiz",
      narr: t(E,
        "After computing K(4), we have a=1, b=1, c=3.\nTo get K(5), we do a,b,c = b,c,a+b+c again.\nWhat's the new c?", "K(4) 계산 후, a=1, b=1, c=3. K(5)를 구하려면 a,b,c = b,c,a+b+c. 새 c는?"),
      question: t(E, "a=1, b=1, c=3. New c = a+b+c = ?", "a=1, b=1, c=3. 새 c = a+b+c = ?"),
      options: ["5", "4", "3", "6"],
      correct: 0,
      explain: t(E, "1 + 1 + 3 = 5. That's K(5)! ✅", "1 + 1 + 3 = 5. K(5)야! ✅"),
    },

    // 2-5 전체 롤링 추적
    {
      type: "reveal",
      narr: t(E,
        "Let's trace all the rolling updates from K(4) through K(7)!", "K(4)부터 K(7)까지 모든 롤링 업데이트를 추적하자!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { step: t(E, "Init", "초기"), a: 1, b: 1, c: 1, k: "K(1-3)" },
              { step: "i=4", a: 1, b: 1, c: 3, k: "K(4)=3" },
              { step: "i=5", a: 1, b: 3, c: 5, k: "K(5)=5" },
              { step: "i=6", a: 3, b: 5, c: 9, k: "K(6)=9" },
              { step: "i=7", a: 5, b: 9, c: 17, k: "K(7)=17" },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: i % 2 === 0 ? "#fef2f2" : "#fff7ed", borderRadius: 8, padding: "6px 10px",
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.dim, width: 36 }}>{row.step}</span>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text, width: 30, textAlign: "center" }}>a={row.a}</span>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text, width: 30, textAlign: "center" }}>b={row.b}</span>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626", width: 36, textAlign: "center" }}>c={row.c}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.ok }}>{row.k}</span>
              </div>
            ))}
          </div>
        </div>),
    },

    // 2-6 파이썬 동시 할당
    {
      type: "reveal",
      narr: t(E,
        "Python magic: a, b, c = b, c, a+b+c does all three updates AT ONCE!\nNo temp variable needed.\nIt evaluates the right side first, then assigns.", "파이썬의 마법: a, b, c = b, c, a+b+c가 세 업데이트를 동시에! 임시 변수 불필요. 오른쪽을 먼저 계산, 그다음 할당."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14 }}>
            <div style={{ color: "#6b7280", marginBottom: 8 }}># Python simultaneous assignment</div>
            <div><span style={{ color: "#e2e8f0" }}>a, b, c = b, c, a+b+c</span></div>
            <div style={{ color: "#6b7280", marginTop: 8 }}># Same as:</div>
            <div><span style={{ color: "#e2e8f0" }}>temp_a = b</span></div>
            <div><span style={{ color: "#e2e8f0" }}>temp_b = c</span></div>
            <div><span style={{ color: "#e2e8f0" }}>temp_c = a + b + c</span></div>
            <div><span style={{ color: "#e2e8f0" }}>a, b, c = temp_a, temp_b, temp_c</span></div>
          </div>
        </div>),
    },

    // 2-7 퀴즈: 왜 동시 할당?
    {
      type: "quiz",
      narr: t(E,
        "Why can't we just write a=b; b=c; c=a+b+c one by one?", "왜 a=b; b=c; c=a+b+c를 하나씩 쓰면 안 될까?"),
      question: t(E,
        "If a=1,b=2,c=3: After 'a=b' → a=2. After 'b=c' → b=3. After 'c=a+b+c' → c=?",
        "a=1,b=2,c=3: 'a=b' 후 a=2. 'b=c' 후 b=3. 'c=a+b+c' → c=?"),
      options: [
        t(E, "c = 2+3+3 = 8 (WRONG! Should be 6)", "c = 2+3+3 = 8 (틀림! 6이어야 함)"),
        t(E, "c = 1+2+3 = 6 (correct)", "c = 1+2+3 = 6 (맞음)"),
      ],
      correct: 0,
      explain: t(E, "Sequential assignment uses UPDATED a=2 instead of original a=1. That's why we need simultaneous! ✅", "순차 할당은 원래 a=1 대신 업데이트된 a=2를 사용. 그래서 동시 할당이 필요! ✅"),
    },

    // 2-8 입력: K(8)
    {
      type: "input",
      narr: t(E,
        "After i=7: a=5, b=9, c=17. Next iteration i=8: new c = a + b + c = ?", "i=7 후: a=5, b=9, c=17. 다음 반복 i=8: 새 c = a + b + c = ?"),
      question: t(E, "5 + 9 + 17 = ?", "5 + 9 + 17 = ?"),
      answer: 31,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (8 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc20KittyCh3(E, lang = "py") {
  return [
    // 3-1 기저 처리
    {
      type: "reveal",
      narr: t(E,
        "Step 1: Handle base cases. If N ≤ 3, the answer is always 1!", "1단계: 기저 처리. N ≤ 3이면 답은 항상 1!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#e2e8f0" }}>N = </span><span style={{ color: "#c084fc" }}>int</span><span style={{ color: "#e2e8f0" }}>(</span><span style={{ color: "#c084fc" }}>input</span><span style={{ color: "#e2e8f0" }}>())</span></div>
            <div>&nbsp;</div>
            <div><span style={{ color: "#c084fc" }}>if </span><span style={{ color: "#e2e8f0" }}>N {"<"}= 3:</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    </span><span style={{ color: "#c084fc" }}>print</span><span style={{ color: "#e2e8f0" }}>(1)</span></div>
          </div>
        </div>),
    },

    // 3-2 퀴즈: 왜 N≤3?
    {
      type: "quiz",
      narr: t(E,
        "Why do we check N ≤ 3 separately?", "왜 N ≤ 3을 따로 처리해?"),
      question: t(E,
        "For the loop to make sense, we need at least i=4. If N≤3...",
        "루프가 의미있으려면 최소 i=4 필요. N≤3이면..."),
      options: [
        t(E, "Loop wouldn't run, answer is base case 1", "루프가 안 돌고, 답은 기저값 1"),
        t(E, "Loop runs once", "루프가 한 번 실행"),
        t(E, "We need recursion", "재귀가 필요"),
      ],
      correct: 0,
      explain: t(E, "range(4, N+1) is empty when N≤3. Base cases are all 1 ✅", "range(4, N+1)은 N≤3일 때 비어있음. 기저값은 모두 1 ✅"),
    },

    // 3-3 else: 루프 초기화
    {
      type: "reveal",
      narr: t(E,
        "Step 2: For N ≥ 4, initialize a=1, b=1, c=1 (the base cases), then loop from 4 to N.", "2단계: N ≥ 4이면, a=1, b=1, c=1 (기저값)으로 초기화하고 4부터 N까지 반복."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#c084fc" }}>else</span><span style={{ color: "#e2e8f0" }}>:</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    a, b, c = 1, 1, 1</span></div>
            <div><span style={{ color: "#c084fc" }}>    for </span><span style={{ color: "#e2e8f0" }}>i </span><span style={{ color: "#c084fc" }}>in range</span><span style={{ color: "#e2e8f0" }}>(4, N + 1):</span></div>
            <div><span style={{ color: "#e2e8f0" }}>        a, b, c = b, c, a + b + c</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    </span><span style={{ color: "#c084fc" }}>print</span><span style={{ color: "#e2e8f0" }}>(c)</span></div>
          </div>
        </div>),
    },

    // 3-4 range(4, N+1) 설명
    {
      type: "quiz",
      narr: t(E,
        "range(4, N+1) iterates from 4 through N. Each iteration computes one more Kitty number.", "range(4, N+1)은 4부터 N까지 반복. 매 반복마다 Kitty 수 하나 더 계산."),
      question: t(E,
        "N=6. How many times does the loop body execute?",
        "N=6. 루프 본문이 몇 번 실행돼?"),
      options: ["3 (i=4,5,6)", "6", "4", "2"],
      correct: 0,
      explain: t(E, "range(4, 7) = [4, 5, 6], 3 iterations ✅", "range(4, 7) = [4, 5, 6], 3번 반복 ✅"),
    },

    // 3-5 print(c) 설명
    {
      type: "reveal",
      narr: t(E,
        "After the loop, c holds K(N)!\nThat's because at each step, c becomes the latest Kitty number.", "루프 후, c가 K(N)을 가지고 있어! 매 단계에서 c가 최신 Kitty 수가 되니까."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#16a34a", marginBottom: 4 }}>
              {t(E, "After loop completes:", "루프 완료 후:")}
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#16a34a" }}>
              c = K(N) ← {t(E, "our answer!", "이게 답!")}
            </div>
          </div>
        </div>),
    },

    // 3-6 복잡도
    {
      type: "reveal",
      narr: t(E,
        "Time: O(N) — one loop, N-3 iterations. Space: O(1) — just 3 variables, no array needed!", "시간: O(N) — 루프 한 번, N-3번 반복. 공간: O(1) — 변수 3개뿐, 배열 불필요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <div style={{ background: "#dbeafe", borderRadius: 12, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2563eb" }}>{t(E, "Time", "시간")}</div>
              <div style={{ fontSize: 24, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>O(N)</div>
            </div>
            <div style={{ background: "#dcfce7", borderRadius: 12, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a" }}>{t(E, "Space", "공간")}</div>
              <div style={{ fontSize: 24, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#16a34a" }}>O(1)</div>
            </div>
          </div>
        </div>),
    },

    // 3-7 입력: K(10)
    {
      type: "input",
      narr: t(E,
        "K(8)=31, K(9)=57. K(10) = K(9)+K(8)+K(7) = 57+31+17 = ?", "K(8)=31, K(9)=57. K(10) = K(9)+K(8)+K(7) = 57+31+17 = ?"),
      question: t(E, "57 + 31 + 17 = ?", "57 + 31 + 17 = ?"),
      answer: 105,
    },

    // 3-8 전체 코드
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc20KittySections(E),
    },
  ];
}
