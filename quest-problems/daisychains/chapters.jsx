import { C, t } from "@/components/quest/theme";
import { getDaisyChainsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "p = list(map(int, input().split()))",
  "",
  "count = 0",
  "for i in range(N):",
  "    s = 0",
  "    for j in range(i, N):",
  "        s += p[j]",
  "        length = j - i + 1",
  "        if s % length == 0:",
  "            avg = s // length",
  "            if avg in p[i:j+1]:",
  "                count += 1",
  "",
  "print(count)",
];


/* Helper: code snippet box */
const CodeSnippet = ({ lines, highlight: hl }) => (
  <div style={{
    background: "#1e293b", borderRadius: 10, padding: "10px 8px",
    overflowX: "auto", fontSize: 12, lineHeight: 1.8,
    fontFamily: "'JetBrains Mono', monospace", marginTop: 8,
  }}>
    {lines.map((l, i) => (
      <div key={i} style={{
        display: "flex", minHeight: 20,
        background: hl && hl.includes(i) ? "rgba(249,115,22,.15)" : "transparent",
        borderRadius: 4, padding: "0 4px",
      }}>
        <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
        <span style={{ whiteSpace: "pre", color: hl && hl.includes(i) ? "#fdba74" : "#e2e8f0" }}>{l}</span>
      </div>
    ))}
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDaisyCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Bessie has N flowers in a row, each with a petal count.\nShe picks a contiguous group and checks: does any flower have exactly the average number of petals?", "베시는 N개의 꽃을 한 줄로 갖고 있어요. 각 꽃에 꽃잎 수가 있어요. 연속된 그룹을 골라서 확인해: 꽃잎 수가 정확히 평균인 꽃이 있을까?"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\uD83C\uDF3C"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.carry }}>Daisy Chains</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2020 Bronze #2</div>
          <div style={{ marginTop: 12, background: C.carryBg, border: `2px solid ${C.carryBd}`, borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "N flowers with petal counts.\nCount the number of contiguous subarrays where at least one flower has exactly the average petal count of that subarray.", "N개의 꽃에 꽃잎 수가 있어요.\n부분 배열의 평균 꽃잎 수와 정확히 같은 꽃이 하나라도 있는 연속 부분 배열의 수를 세.")}
          </div>
        </div>),
    },
    // 1-2: What is average? Visual with flowers
    {
      type: "reveal",
      narr: t(E,
        "The average of a group is the sum divided by the count.\nFor example, flowers [2, 4, 6]: sum=12, count=3, average=4.", "그룹의 평균은 합을 개수로 나눈 거예요. 예: 꽃 [2, 4, 6]: 합=12, 개수=3, 평균=4."),
      content: (() => {
        const petals = [2, 4, 6];
        const colors = [C.bessie, C.carry, C.accent];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
              {t(E, "What is an average?", "평균이란?")}
            </div>
            {/* Flowers as circles */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
              {petals.map((p, i) => (
                <div key={i} style={{
                  width: 54, height: 54, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${colors[i]}15`, border: `3px solid ${colors[i]}`,
                  fontSize: 20, fontWeight: 900, color: colors[i],
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{p}</div>
              ))}
            </div>
            {/* Calculation */}
            <div style={{
              background: C.carryBg, borderRadius: 10, padding: 10,
              border: `2px solid ${C.carryBd}`, textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: C.text,
            }}>
              <div style={{ marginBottom: 4 }}>
                {t(E, "sum", "합")} = 2 + 4 + 6 = <span style={{ fontWeight: 900, color: C.carry }}>12</span>
              </div>
              <div style={{ marginBottom: 4 }}>
                {t(E, "count", "개수")} = <span style={{ fontWeight: 900, color: C.carry }}>3</span>
              </div>
              <div>
                {t(E, "average", "평균")} = 12 / 3 = <span style={{ fontWeight: 900, color: C.ok, fontSize: 18 }}>4</span>
              </div>
            </div>
            <div style={{
              marginTop: 8, textAlign: "center", fontSize: 13, fontWeight: 800, color: C.ok,
            }}>
              {t(E, "Flower with 4 petals exists! Valid subarray!", "꽃잎 4개인 꽃이 있어요! 유효한 부분 배열!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: Valid vs invalid example — visual
    {
      type: "reveal",
      narr: t(E,
        "Not every subarray works!\nThe average must be an integer AND some flower must have exactly that many petals.", "모든 부분 배열이 되는 건 아니예요! 평균이 정수여야 하고 그 개수의 꽃잎을 가진 꽃이 있어야 해요."),
      content: (() => {
        const flowers = [1, 1, 2];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
              {t(E, "Flowers: [1, 1, 2]", "꽃: [1, 1, 2]")}
            </div>
            {/* Full flower row */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 14 }}>
              {flowers.map((p, i) => (
                <div key={i} style={{
                  width: 48, height: 48, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: C.carryBg, border: `3px solid ${C.carryBd}`,
                  fontSize: 20, fontWeight: 900, color: C.carry,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{p}</div>
              ))}
            </div>
            {/* Valid example */}
            <div style={{
              background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 10,
              padding: 10, marginBottom: 8,
            }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.ok, marginBottom: 4 }}>
                ✅ {t(E, "Subarray [1, 1]: avg = 1", "부분 배열 [1, 1]: 평균 = 1")}
              </div>
              <div style={{ fontSize: 12, color: C.text }}>
                {t(E, "Any flower = 1? YES (both flowers!)", "꽃잎 = 1인 꽃? YES (둘 다!)")}
              </div>
            </div>
            {/* Invalid example */}
            <div style={{
              background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 10,
              padding: 10,
            }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.no, marginBottom: 4 }}>
                ❌ {t(E, "Subarray [1, 3]: avg = 2", "부분 배열 [1, 3]: 평균 = 2")}
              </div>
              <div style={{ fontSize: 12, color: C.text }}>
                {t(E, "Any flower = 2? NO! Neither 1 nor 3 equals 2.", "꽃잎 = 2인 꽃? NO! 1도 3도 2가 아니예요.")}
              </div>
            </div>
          </div>
        );
      })(),
    },
    // 1-4: Quiz — check a subarray
    {
      type: "quiz",
      narr: t(E,
        "Let's check: flowers [1, 1, 2]. The subarray [1, 1] has average 1. Is this valid?", "확인해보자: 꽃 [1, 1, 2]. 부분 배열 [1, 1]의 평균은 1. 유효할까?"),
      question: t(E,
        "Flowers [1, 1, 2]. Subarray [1, 1]: avg = 1. Valid?",
        "꽃 [1, 1, 2]. 부분 배열 [1, 1]: 평균 = 1. 유효?"),
      options: [
        t(E, "Yes! Both flowers have 1 petal = the average", "예! 두 꽃 모두 꽃잎 1개 = 평균"),
        t(E, "No, average must be non-integer", "아니오, 평균이 정수가 아니어야 해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! avg = (1+1)/2 = 1, and both flowers have 1 petal. This subarray is valid!",
        "정답! 평균 = (1+1)/2 = 1이고 두 꽃 모두 꽃잎이 1개. 유효한 부분 배열이예요!"),
    },
    // 1-5: Complete enumeration visual
    {
      type: "reveal",
      narr: t(E,
        "Let's enumerate ALL subarrays of [1, 1, 2] and check each one!", "[1, 1, 2]의 모든 부분 배열을 나열하고 각각 확인해보자!"),
      content: (() => {
        const checks = [
          { sub: "[1]",     sum: 1, len: 1, avg: "1", has: true },
          { sub: "[1]",     sum: 1, len: 1, avg: "1", has: true },
          { sub: "[2]",     sum: 2, len: 1, avg: "2", has: true },
          { sub: "[1,1]",   sum: 2, len: 2, avg: "1", has: true },
          { sub: "[1,2]",   sum: 3, len: 2, avg: "1.5", has: false },
          { sub: "[1,1,2]", sum: 4, len: 3, avg: "1.33", has: false },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
              {t(E, "All subarrays of [1, 1, 2]", "[1, 1, 2]의 모든 부분 배열")}
            </div>
            <div style={{
              borderRadius: 10, overflow: "hidden", border: `2px solid ${C.border}`,
              fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
            }}>
              {/* Header */}
              <div style={{
                display: "grid", gridTemplateColumns: "70px 40px 40px 50px 50px",
                background: "#1e293b", color: "#e2e8f0", padding: "6px 6px", fontWeight: 800,
              }}>
                <span>{t(E, "Sub", "부분")}</span>
                <span>{t(E, "Sum", "합")}</span>
                <span>{t(E, "Len", "길이")}</span>
                <span>{t(E, "Avg", "평균")}</span>
                <span>{t(E, "Valid", "유효")}</span>
              </div>
              {checks.map((c, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "70px 40px 40px 50px 50px",
                  background: c.has ? C.okBg : C.noBg,
                  padding: "5px 6px", borderBottom: i < checks.length - 1 ? `1px solid ${C.border}` : "none",
                }}>
                  <span style={{ color: C.text, fontWeight: 700 }}>{c.sub}</span>
                  <span style={{ color: C.text }}>{c.sum}</span>
                  <span style={{ color: C.text }}>{c.len}</span>
                  <span style={{ color: c.has ? C.ok : C.no, fontWeight: 800 }}>{c.avg}</span>
                  <span style={{ fontWeight: 800 }}>{c.has ? "✅" : "❌"}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 900, color: C.ok,
            }}>
              {t(E, "4 valid subarrays out of 6 total!", "총 6개 중 4개 유효!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-6: Input — count valid subarrays
    {
      type: "input",
      narr: t(E,
        "Flowers = [1, 1].\nSubarrays: [1], [1], [1,1].\nAll have average 1 and a flower with 1 petal.\nHow many valid?", "꽃 = [1, 1]. 부분 배열: [1], [1], [1,1]. 모두 평균 1이고 꽃잎 1개인 꽃이 있어요. 유효한 수는?"),
      question: t(E,
        "Flowers = [1, 1]. Count of valid subarrays?",
        "꽃 = [1, 1]. 유효한 부분 배열 수?"),
      hint: t(E,
        "[1] avg=1 has 1. [1] avg=1 has 1. [1,1] avg=1 has 1. All 3 work!",
        "[1] 평균=1 있음. [1] 평균=1 있음. [1,1] 평균=1 있음. 3개 모두 가능!"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 알고리즘 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDaisyCh2(E) {
  return [
    // 2-1: Algorithm overview
    {
      type: "reveal",
      narr: t(E,
        "The algorithm: enumerate all subarrays using two nested loops.\nFor each, compute the sum and check the condition.", "알고리즘: 이중 반복문으로 모든 부분 배열 열거. 각각 합을 계산하고 조건 확인."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
            {t(E, "Enumerate all subarrays (i, j)", "모든 부분 배열 (i, j) 열거")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { step: "1", desc: t(E, "Fix start index i", "시작 인덱스 i 고정") },
              { step: "2", desc: t(E, "Extend end index j from i to N-1", "끝 인덱스 j를 i부터 N-1까지") },
              { step: "3", desc: t(E, "Accumulate sum as j extends", "j가 늘어나며 합 누적") },
              { step: "4", desc: t(E, "Check: is sum divisible by length?", "확인: 합이 길이로 나누어지나?") },
              { step: "5", desc: t(E, "If yes, does any flower = average?", "그렇다면 평균과 같은 꽃이 있나?") },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: C.carryBg, border: `1.5px solid ${C.carryBd}`,
                borderRadius: 8, padding: "6px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: C.carry, color: "#fff", fontSize: 13, fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{s.step}</div>
                <span style={{ fontSize: 12, color: C.text, fontWeight: 700 }}>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>),
    },
    // 2-2: Trace walkthrough with [1, 1, 2]
    {
      type: "reveal",
      narr: t(E,
        "Let's trace through [1, 1, 2] step by step. Watch how i and j sweep through all pairs!", "[1, 1, 2]을 단계별로 추적해보자. i와 j가 모든 쌍을 어떻게 탐색하는지 봐요!"),
      content: (() => {
        const rows = [
          { i: 0, j: 0, sub: "p[0:1]=[1]",    s: 1, l: 1, avg: "1",    chk: "1 in [1]?", ok: true },
          { i: 0, j: 1, sub: "p[0:2]=[1,1]",   s: 2, l: 2, avg: "1",    chk: "1 in [1,1]?", ok: true },
          { i: 0, j: 2, sub: "p[0:3]=[1,1,2]", s: 4, l: 3, avg: "1.33", chk: "not int",    ok: false },
          { i: 1, j: 1, sub: "p[1:2]=[1]",     s: 1, l: 1, avg: "1",    chk: "1 in [1]?",  ok: true },
          { i: 1, j: 2, sub: "p[1:3]=[1,2]",   s: 3, l: 2, avg: "1.5",  chk: "not int",    ok: false },
          { i: 2, j: 2, sub: "p[2:3]=[2]",     s: 2, l: 1, avg: "2",    chk: "2 in [2]?",  ok: true },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
              {t(E, "Trace: [1, 1, 2]", "추적: [1, 1, 2]")}
            </div>
            <div style={{
              borderRadius: 10, overflow: "hidden", border: `2px solid ${C.border}`,
              fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "22px 22px 55px 28px 28px 45px",
                background: "#1e293b", color: "#e2e8f0", padding: "5px 4px", fontWeight: 800, gap: 4,
              }}>
                <span>i</span><span>j</span><span>{t(E, "sum", "합")}</span>
                <span>{t(E, "len", "길이")}</span><span>{t(E, "avg", "평균")}</span><span>{t(E, "valid", "유효")}</span>
              </div>
              {rows.map((r, idx) => (
                <div key={idx} style={{
                  display: "grid", gridTemplateColumns: "22px 22px 55px 28px 28px 45px",
                  background: r.ok ? C.okBg : C.noBg,
                  padding: "4px 4px", borderBottom: idx < rows.length - 1 ? `1px solid ${C.border}` : "none",
                  gap: 4,
                }}>
                  <span style={{ color: C.accent, fontWeight: 800 }}>{r.i}</span>
                  <span style={{ color: C.accent, fontWeight: 800 }}>{r.j}</span>
                  <span style={{ color: C.text }}>{r.s}</span>
                  <span style={{ color: C.text }}>{r.l}</span>
                  <span style={{ color: r.ok ? C.ok : C.no, fontWeight: 800 }}>{r.avg}</span>
                  <span>{r.ok ? "✅" : "❌"}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 10, textAlign: "center", fontSize: 14, fontWeight: 900, color: C.ok,
            }}>
              count = <span style={{ fontSize: 18 }}>4</span>
            </div>
          </div>
        );
      })(),
    },
    // 2-3: Key optimization trick
    {
      type: "reveal",
      narr: t(E,
        "A key trick: we don't recompute the sum from scratch!\nAs j extends by 1, just add p[j] to the running sum.\nThis makes it O(1) per step.", "핵심 트릭: 합을 처음부터 다시 계산하지 않아! j가 1 늘어나면 p[j]만 러닝 합에 더해요. 이러면 각 단계 O(1)이예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 10 }}>
            {t(E, "Running sum trick", "러닝 합 트릭")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { j: 0, add: "+p[0]=1", sum: 1 },
              { j: 1, add: "+p[1]=1", sum: 2 },
              { j: 2, add: "+p[2]=2", sum: 4 },
            ].map((step, idx) => (
              <div key={idx} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: C.accentBg, border: `1.5px solid ${C.accentBd}`,
                borderRadius: 8, padding: "6px 10px",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
              }}>
                <span style={{ color: C.dim }}>j={step.j}</span>
                <span style={{ color: C.accent, fontWeight: 800 }}>{step.add}</span>
                <span style={{ color: C.text }}>→ sum = <span style={{ fontWeight: 900, color: C.ok }}>{step.sum}</span></span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, background: C.carryBg, borderRadius: 10, padding: 10, border: `2px solid ${C.carryBd}`, textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: C.carry, fontFamily: "'JetBrains Mono', monospace" }}>
              O(N{"\u00b2"}) {t(E, "total (N up to 100)", "전체 (N 최대 100)")}
            </div>
          </div>
        </div>),
    },
    // 2-4: Practice — hand calculation
    {
      type: "input",
      narr: t(E,
        "Try [2, 2].\nSubarrays: [2] (avg=2, has 2, valid), [2] (avg=2, has 2, valid), [2,2] (avg=2, has 2, valid).\nHow many?", "[2, 2]를 해봐요. 부분 배열: [2] (평균=2, 2있음, 유효), [2] (평균=2, 2있음, 유효), [2,2] (평균=2, 2있음, 유효). 몇 개?"),
      question: t(E,
        "Flowers = [2, 2]. Count of valid subarrays?",
        "꽃 = [2, 2]. 유효한 부분 배열 수?"),
      hint: t(E,
        "All 3 subarrays have average 2, and a flower with 2 petals exists. Answer: 3.",
        "3개 부분 배열 모두 평균 2이고 꽃잎 2개인 꽃이 있어요. 답: 3."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDaisyCh3(E, lang = "py") {
  return [
    // 3-1: Step 1 — Read input
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code! First, read N and the petal counts.", "코드를 만들자! 먼저 N과 꽃잎 수를 읽어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "First line: N. Second line: N petal counts separated by spaces.",
              "첫 줄: N. 둘째 줄: 공백으로 구분된 N개의 꽃잎 수.")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "p = list(map(int, input().split()))",
            ]}
            highlight={[0, 1]}
          />
          <div style={{
            marginTop: 10, background: C.carryBg, borderRadius: 8, padding: 8,
            border: `1.5px solid ${C.carryBd}`, fontSize: 12, color: C.text,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {t(E, "Example: N=3, p=[1, 1, 2]", "예시: N=3, p=[1, 1, 2]")}
          </div>
        </div>),
    },
    // 3-2: Step 2 — Outer loop + running sum
    {
      type: "reveal",
      narr: t(E,
        "Now the outer loop fixes start index i.\nFor each i, we reset the running sum to 0 and extend j forward.", "이제 바깥 반복이 시작 인덱스 i를 고정해요. 각 i에서 러닝 합을 0으로 초기화하고 j를 앞으로 확장해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 2: Outer loop + running sum", "2단계: 바깥 반복 + 러닝 합")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "p = list(map(int, input().split()))",
              "",
              "count = 0",
              "for i in range(N):",
              "    s = 0",
              "    for j in range(i, N):",
              "        s += p[j]",
            ]}
            highlight={[3, 4, 5, 6, 7]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6, whiteSpace: "pre-line" }}>
            {t(E,
              "count tracks valid subarrays. s accumulates the sum as we extend j.\nNo need to recompute from scratch!", "count는 유효한 부분 배열 수.\ns는 j를 확장하며 합을 누적. 처음부터 다시 계산할 필요 없어요!")}
          </div>
        </div>),
    },
    // 3-3: Step 3 — Check condition
    {
      type: "reveal",
      narr: t(E,
        "For each (i, j) pair: length = j-i+1.\nIf sum is divisible by length, the average is an integer.\nThen check if any flower in the range equals the average.", "각 (i, j) 쌍에서: 길이 = j-i+1. 합이 길이로 나누어지면 평균이 정수. 그다음 범위 내 꽃 중 평균과 같은 것이 있는지 확인."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 3: Check the condition", "3단계: 조건 확인")}
          </div>
          <CodeSnippet
            lines={[
              "N = int(input())",
              "p = list(map(int, input().split()))",
              "",
              "count = 0",
              "for i in range(N):",
              "    s = 0",
              "    for j in range(i, N):",
              "        s += p[j]",
              "        length = j - i + 1",
              "        if s % length == 0:",
              "            avg = s // length",
              "            if avg in p[i:j+1]:",
              "                count += 1",
            ]}
            highlight={[8, 9, 10, 11, 12]}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "s % length == 0 checks if avg is an integer. avg in p[i:j+1] checks if any flower in the subarray has that petal count.", "s % length == 0으로 평균이 정수인지 확인.\navg in p[i:j+1]로 부분 배열 내 꽃이 그 꽃잎 수를 가지는지 확인.")}
          </div>
        </div>),
    },
    // 3-4: Quiz — why check s % length?
    {
      type: "quiz",
      narr: t(E,
        "Quick check: why do we check `s % length == 0` before computing the average?", "확인: 평균을 계산하기 전에 왜 `s % length == 0`을 확인할까?"),
      question: t(E,
        "Why check s % length == 0?",
        "s % length == 0을 왜 확인해요?"),
      options: [
        t(E, "To make the code run faster", "코드를 빠르게 하려고"),
        t(E, "Because avg must be integer (petal counts are integers)", "평균이 정수여야 하니까 (꽃잎 수가 정수)"),
        t(E, "It's not necessary, just extra safety", "필요 없고 그냥 안전장치"),
      ],
      correct: 1,
      explain: t(E,
        "Right! Petal counts are integers, so the average must be an integer to match any flower. If sum isn't divisible by length, the average is a fraction and no flower can match!",
        "맞아! 꽃잎 수가 정수니까 평균도 정수여야 어떤 꽃과 일치할 수 있어요. 합이 길이로 나누어지지 않으면 평균이 분수라 일치하는 꽃이 없어요!"),
    },
    // 3-5: Step 4 — Print + full code
    {
      type: "reveal",
      narr: t(E,
        "Finally, print the count. That's the complete solution!", "마지막으로 count를 출력해요. 이게 전체 풀이예요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 4: Print the answer!", "4단계: 답 출력!")}
          </div>
          <CodeSnippet
            lines={SOLUTION_CODE}
            highlight={[20]}
          />
          <div style={{
            marginTop: 10, background: C.okBg, borderRadius: 10,
            padding: "8px 12px", border: `2px solid ${C.okBd}`, textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: C.ok }}>
              {t(E, "Complete solution! O(N^2) with running sum!", "전체 풀이 완성! 러닝 합으로 O(N^2)!")}
            </div>
          </div>
        </div>),
    },
  ];
}
