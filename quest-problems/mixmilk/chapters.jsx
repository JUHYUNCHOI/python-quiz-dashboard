import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "cap = [0] * 3",
  "milk = [0] * 3",
  "for i in range(3):",
  "    cap[i], milk[i] = map(int, input().split())",
  "",
  "for step in range(100):",
  "    src = step % 3",
  "    dst = (step + 1) % 3",
  "    # pour src -> dst",
  "    amount = min(milk[src], cap[dst] - milk[dst])",
  "    milk[src] -= amount",
  "    milk[dst] += amount",
  "",
  "for m in milk:",
  "    print(m)",
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
        background: hl && hl.includes(i) ? "rgba(217,119,6,.15)" : "transparent",
        borderRadius: 4, padding: "0 4px",
      }}>
        <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
        <span style={{ whiteSpace: "pre", color: hl && hl.includes(i) ? "#fbbf24" : "#e2e8f0" }}>{l}</span>
      </div>
    ))}
  </div>
);

/* Helper: bucket visual */
const BucketViz = ({ buckets, labels, highlight, E: isE }) => (
  <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "8px 0" }}>
    {buckets.map((b, i) => {
      const pct = b.cap > 0 ? (b.milk / b.cap) * 100 : 0;
      const colors = ["#3b82f6", "#10b981", "#f59e0b"];
      const bgs = ["#dbeafe", "#d1fae5", "#fef3c7"];
      const isHl = highlight === i;
      return (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 11, fontWeight: 800, color: isHl ? colors[i] : C.dim,
            fontFamily: "'JetBrains Mono',monospace", marginBottom: 4,
          }}>{labels ? labels[i] : (isE ? `Bucket ${i + 1}` : `양동이 ${i + 1}`)}</div>
          <div style={{
            width: 56, height: 72, borderRadius: "0 0 10px 10px",
            border: `3px solid ${isHl ? colors[i] : "#d1d5db"}`,
            borderTop: "none", position: "relative", overflow: "hidden",
            background: "#f9fafb",
            boxShadow: isHl ? `0 0 8px ${colors[i]}40` : "none",
          }}>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: `${pct}%`, background: bgs[i],
              borderTop: pct > 0 && pct < 100 ? `2px dashed ${colors[i]}` : "none",
              transition: "height .4s ease",
            }} />
            <div style={{
              position: "absolute", bottom: 4, left: 0, right: 0,
              fontSize: 14, fontWeight: 900, color: colors[i],
              fontFamily: "'JetBrains Mono',monospace",
            }}>{b.milk}</div>
          </div>
          <div style={{
            fontSize: 10, color: C.dim, marginTop: 4,
            fontFamily: "'JetBrains Mono',monospace",
          }}>{isE ? `cap: ${b.cap}` : `용량: ${b.cap}`}</div>
        </div>
      );
    })}
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 문제 이해 (7 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMixMilkCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Three farmers each have a bucket of milk. They pour milk between buckets in a fixed pattern: 1 to 2, then 2 to 3, then 3 to 1, repeating 100 times total. Let's understand how!",
        "세 농부가 각각 우유 양동이를 가지고 있어. 고정된 패턴으로 우유를 부어: 1에서 2로, 2에서 3으로, 3에서 1로, 총 100번 반복해. 어떻게 하는지 알아보자!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"🥛"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Mixing Milk</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2018 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Each bucket has a CAPACITY (max it can hold) and some initial milk. We simulate 100 pour operations!",
              "각 양동이에는 용량(최대 보관량)과 초기 우유량이 있어. 100번의 붓기를 시뮬레이션해!")}
          </div>
        </div>),
    },
    // 1-2: Bucket concept visual
    {
      type: "reveal",
      narr: t(E,
        "Each bucket has two values: CAPACITY (the maximum it can hold) and CURRENT MILK (how much is in it right now). The current milk can never exceed the capacity!",
        "각 양동이에는 두 가지 값이 있어: 용량(최대 보관량)과 현재 우유량(지금 들어있는 양). 현재 우유는 절대로 용량을 초과할 수 없어!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
            {t(E, "Understanding Buckets", "양동이 이해하기")}
          </div>
          <BucketViz
            buckets={[{ cap: 10, milk: 3 }, { cap: 8, milk: 5 }, { cap: 6, milk: 2 }]}
            E={E}
          />
          <div style={{ marginTop: 10, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 10, padding: 10, fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div><span style={{ fontWeight: 800, color: "#d97706" }}>{t(E, "Capacity", "용량")}</span> = {t(E, "max the bucket can hold", "양동이가 담을 수 있는 최대량")}</div>
            <div><span style={{ fontWeight: 800, color: "#3b82f6" }}>{t(E, "Milk", "우유")}</span> = {t(E, "current amount inside", "현재 들어있는 양")}</div>
            <div style={{ marginTop: 4, fontWeight: 700, color: "#b45309" }}>
              {t(E, "Remaining space = capacity - milk", "남은 공간 = 용량 - 우유")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz on remaining capacity
    {
      type: "quiz",
      narr: t(E,
        "Before we pour milk, we need to know: how much SPACE is left in the destination bucket? This is capacity minus current milk.",
        "우유를 붓기 전에: 목적지 양동이에 남은 공간이 얼마인지 알아야 해. 이건 용량에서 현재 우유를 뺀 거야."),
      question: t(E,
        "Bucket B: capacity 8, milk 5. How much SPACE is left?",
        "양동이 B: 용량 8, 우유 5. 남은 공간은?"),
      options: [
        t(E, "8", "8"),
        t(E, "5", "5"),
        t(E, "3", "3"),
      ],
      correct: 2,
      explain: t(E,
        "Remaining space = capacity - milk = 8 - 5 = 3. Only 3 more units can fit!",
        "남은 공간 = 용량 - 우유 = 8 - 5 = 3. 3단위만 더 들어갈 수 있어!"),
    },
    // 1-4: Pouring rules visual
    {
      type: "reveal",
      narr: t(E,
        "When pouring from bucket A to bucket B, how much actually transfers? It's the MINIMUM of what A has and what B can receive!",
        "A에서 B로 부을 때 실제로 얼마나 이동할까? A가 가진 양과 B가 받을 수 있는 양 중 더 작은 값이야!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 8 }}>
            {t(E, "The Pouring Rule", "붓기 규칙")}
          </div>
          <div style={{ background: "#fef3c7", borderRadius: 10, padding: 12, border: "2px solid #fbbf24" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#92400e", textAlign: "center", lineHeight: 2 }}>
              amount = min(source_milk, dest_remaining)<br />
              source_milk -= amount<br />
              dest_milk += amount
            </div>
          </div>
          {/* Example */}
          <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 800, color: "#d97706", marginBottom: 4 }}>
              {t(E, "Example: Pour A -> B", "예시: A에서 B로 붓기")}
            </div>
            <div>{t(E, "A: milk=7, B: cap=5, milk=2", "A: 우유=7, B: 용량=5, 우유=2")}</div>
            <div>{t(E, "B remaining = 5 - 2 = 3", "B 남은 공간 = 5 - 2 = 3")}</div>
            <div style={{ fontWeight: 800, color: "#b45309" }}>
              {t(E, "amount = min(7, 3) = 3", "이동량 = min(7, 3) = 3")}
            </div>
            <div>{t(E, "After: A=4, B=5 (full!)", "이후: A=4, B=5 (가득!)")}</div>
          </div>
        </div>),
    },
    // 1-5: Pour quiz (key problem understanding)
    {
      type: "quiz",
      narr: t(E,
        "Let's test! Bucket A has 5ml, Bucket B has capacity 3 with 1ml already. Pour A into B. How much transfers?",
        "테스트 해보자! A에 5ml, B는 용량 3이고 1ml 있어. A에서 B로 부으면 얼마나 이동할까?"),
      question: t(E,
        "A: milk=5. B: cap=3, milk=1. Pour A->B. How much transfers?",
        "A: 우유=5. B: 용량=3, 우유=1. A->B 붓기. 이동량은?"),
      options: [
        t(E, "5 (all of A)", "5 (A의 전부)"),
        t(E, "3 (B's capacity)", "3 (B의 용량)"),
        t(E, "2 (B's remaining space)", "2 (B의 남은 공간)"),
      ],
      correct: 2,
      explain: t(E,
        "B remaining = 3 - 1 = 2. min(5, 2) = 2. Only 2 transfers! A goes to 3, B fills to 3.",
        "B 남은 공간 = 3 - 1 = 2. min(5, 2) = 2. 2만 이동! A는 3이 되고, B는 3으로 가득 차."),
    },
    // 1-6: Cycle pattern visual
    {
      type: "reveal",
      narr: t(E,
        "The 100 pours follow a repeating cycle: 1->2, 2->3, 3->1, 1->2, 2->3, 3->1, ... This cycle of 3 repeats. Step number mod 3 tells us which pour!",
        "100번의 붓기는 반복 패턴을 따라: 1->2, 2->3, 3->1, 1->2, 2->3, 3->1, ... 3개씩 반복. step % 3으로 어떤 붓기인지 알 수 있어!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 8 }}>
            {t(E, "Pour Cycle Pattern", "붓기 순환 패턴")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {[
              { s: 0, label: "1→2", col: "#3b82f6" },
              { s: 1, label: "2→3", col: "#10b981" },
              { s: 2, label: "3→1", col: "#f59e0b" },
              { s: 3, label: "1→2", col: "#3b82f6" },
              { s: 4, label: "2→3", col: "#10b981" },
              { s: 5, label: "3→1", col: "#f59e0b" },
            ].map(({ s, label, col }) => (
              <div key={s} style={{
                background: `${col}15`, border: `2px solid ${col}`, borderRadius: 8,
                padding: "6px 10px", textAlign: "center", minWidth: 52,
              }}>
                <div style={{ fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
                  step {s}
                </div>
                <div style={{ fontSize: 14, fontWeight: 900, color: col, fontFamily: "'JetBrains Mono',monospace" }}>
                  {label}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", fontSize: 18, color: C.dim }}>...</div>
          </div>
          <div style={{ marginTop: 10, background: "#fffbeb", borderRadius: 10, padding: 10, border: "2px solid #fcd34d", textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800, color: "#92400e" }}>
              src = step % 3<br />
              dst = (step + 1) % 3
            </div>
          </div>
        </div>),
    },
    // 1-7: Input practice
    {
      type: "input",
      narr: t(E,
        "A has 5 milk, B has capacity 3 and 1 milk. After pouring A->B, how much milk is in A?",
        "A에 우유 5, B는 용량 3이고 우유 1. A에서 B로 부은 후 A에 있는 우유는?"),
      question: t(E,
        "A=5 milk, B=cap 3, milk 1. Pour A->B. Milk left in A?",
        "A=우유5, B=용량3 우유1. A->B 부은 후. A의 우유?"),
      hint: t(E,
        "Transfer min(5, 3-1) = min(5, 2) = 2. A: 5 - 2 = 3.",
        "이동량 min(5, 3-1) = min(5, 2) = 2. A: 5 - 2 = 3."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 시뮬레이션 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMixMilkCh2(E) {
  return [
    // 2-1: Trace step 0
    {
      type: "reveal",
      narr: t(E,
        "Let's trace the simulation with a concrete example! Buckets: cap=[10,8,6], milk=[3,5,2]. Step 0: pour bucket 1 -> bucket 2.",
        "구체적인 예시로 시뮬레이션을 추적해보자! 양동이: 용량=[10,8,6], 우유=[3,5,2]. 0단계: 1번에서 2번으로 붓기."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 8 }}>
            {t(E, "Step 0: Pour Bucket 1 → Bucket 2", "0단계: 양동이 1 → 양동이 2")}
          </div>
          <BucketViz
            buckets={[{ cap: 10, milk: 3 }, { cap: 8, milk: 5 }, { cap: 6, milk: 2 }]}
            labels={[t(E, "B1 (src)", "1번(소스)"), t(E, "B2 (dst)", "2번(목적지)"), t(E, "B3", "3번")]}
            highlight={0}
            E={E}
          />
          {/* Trace table */}
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              <thead>
                <tr style={{ background: "#fef3c7" }}>
                  <th style={{ padding: "6px 8px", textAlign: "left", borderBottom: "2px solid #fbbf24", color: "#92400e" }}>{t(E, "Calc", "계산")}</th>
                  <th style={{ padding: "6px 8px", textAlign: "center", borderBottom: "2px solid #fbbf24", color: "#92400e" }}>{t(E, "Value", "값")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [t(E, "B2 remaining", "B2 남은 공간"), "8 - 5 = 3"],
                  [t(E, "B1 milk", "B1 우유"), "3"],
                  ["min(3, 3)", "3"],
                  [t(E, "After: B1", "이후: B1"), "3 - 3 = 0"],
                  [t(E, "After: B2", "이후: B2"), "5 + 3 = 8"],
                ].map(([label, val], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fffbeb" : "#fff" }}>
                    <td style={{ padding: "5px 8px", borderBottom: "1px solid #fde68a", color: C.text }}>{label}</td>
                    <td style={{ padding: "5px 8px", borderBottom: "1px solid #fde68a", textAlign: "center", fontWeight: 800, color: "#d97706" }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>),
    },
    // 2-2: Trace step 1
    {
      type: "reveal",
      narr: t(E,
        "After step 0: milk=[0,8,2]. Step 1: pour bucket 2 -> bucket 3. B3 remaining = 6-2 = 4. Transfer min(8, 4) = 4.",
        "0단계 이후: 우유=[0,8,2]. 1단계: 2번에서 3번으로 붓기. B3 남은 공간 = 6-2 = 4. 이동량 min(8, 4) = 4."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 8 }}>
            {t(E, "Step 1: Pour Bucket 2 → Bucket 3", "1단계: 양동이 2 → 양동이 3")}
          </div>
          <BucketViz
            buckets={[{ cap: 10, milk: 0 }, { cap: 8, milk: 8 }, { cap: 6, milk: 2 }]}
            labels={[t(E, "B1", "1번"), t(E, "B2 (src)", "2번(소스)"), t(E, "B3 (dst)", "3번(목적지)")]}
            highlight={1}
            E={E}
          />
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              <thead>
                <tr style={{ background: "#fef3c7" }}>
                  <th style={{ padding: "6px 8px", textAlign: "left", borderBottom: "2px solid #fbbf24", color: "#92400e" }}>{t(E, "Calc", "계산")}</th>
                  <th style={{ padding: "6px 8px", textAlign: "center", borderBottom: "2px solid #fbbf24", color: "#92400e" }}>{t(E, "Value", "값")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [t(E, "B3 remaining", "B3 남은 공간"), "6 - 2 = 4"],
                  [t(E, "B2 milk", "B2 우유"), "8"],
                  ["min(8, 4)", "4"],
                  [t(E, "After: B2", "이후: B2"), "8 - 4 = 4"],
                  [t(E, "After: B3", "이후: B3"), "2 + 4 = 6"],
                ].map(([label, val], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fffbeb" : "#fff" }}>
                    <td style={{ padding: "5px 8px", borderBottom: "1px solid #fde68a", color: C.text }}>{label}</td>
                    <td style={{ padding: "5px 8px", borderBottom: "1px solid #fde68a", textAlign: "center", fontWeight: 800, color: "#d97706" }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: "#d97706", textAlign: "center" }}>
            {t(E, "State after step 1: milk = [0, 4, 6]", "1단계 이후 상태: 우유 = [0, 4, 6]")}
          </div>
        </div>),
    },
    // 2-3: Trace step 2
    {
      type: "reveal",
      narr: t(E,
        "Step 2: pour bucket 3 -> bucket 1. B1 remaining = 10-0 = 10. Transfer min(6, 10) = 6. Now milk=[6, 4, 0]. One full cycle done!",
        "2단계: 3번에서 1번으로 붓기. B1 남은 공간 = 10-0 = 10. 이동량 min(6, 10) = 6. 이제 우유=[6, 4, 0]. 한 사이클 완료!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 8 }}>
            {t(E, "Step 2: Pour Bucket 3 → Bucket 1", "2단계: 양동이 3 → 양동이 1")}
          </div>
          <BucketViz
            buckets={[{ cap: 10, milk: 0 }, { cap: 8, milk: 4 }, { cap: 6, milk: 6 }]}
            labels={[t(E, "B1 (dst)", "1번(목적지)"), t(E, "B2", "2번"), t(E, "B3 (src)", "3번(소스)")]}
            highlight={2}
            E={E}
          />
          {/* Summary state table */}
          <div style={{ marginTop: 10, background: "#d1fae5", borderRadius: 10, padding: 10, border: "2px solid #6ee7b7" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#059669", marginBottom: 6 }}>
              {t(E, "Full cycle summary:", "전체 사이클 요약:")}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              <thead>
                <tr>
                  <th style={{ padding: "4px 6px", textAlign: "left", color: "#059669" }}>{t(E, "Step", "단계")}</th>
                  <th style={{ padding: "4px 6px", color: "#3b82f6" }}>B1</th>
                  <th style={{ padding: "4px 6px", color: "#10b981" }}>B2</th>
                  <th style={{ padding: "4px 6px", color: "#f59e0b" }}>B3</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [t(E, "Start", "시작"), 3, 5, 2],
                  ["0: 1→2", 0, 8, 2],
                  ["1: 2→3", 0, 4, 6],
                  ["2: 3→1", 6, 4, 0],
                ].map(([step, a, b, c], i) => (
                  <tr key={i} style={{ background: i === 3 ? "#d1fae520" : "transparent" }}>
                    <td style={{ padding: "4px 6px", fontWeight: i === 3 ? 800 : 400 }}>{step}</td>
                    <td style={{ padding: "4px 6px", textAlign: "center", fontWeight: 800 }}>{a}</td>
                    <td style={{ padding: "4px 6px", textAlign: "center", fontWeight: 800 }}>{b}</td>
                    <td style={{ padding: "4px 6px", textAlign: "center", fontWeight: 800 }}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>),
    },
    // 2-4: Quiz on trace
    {
      type: "quiz",
      narr: t(E,
        "Now you try! After state [6, 4, 0], step 3 pours bucket 1 -> bucket 2 (since 3%3=0, so src=0, dst=1). B2 remaining = 8-4 = 4. Transfer min(6, 4) = 4.",
        "이제 해봐! 상태 [6, 4, 0] 이후, 3단계는 1번에서 2번으로 부어 (3%3=0이니까 src=0, dst=1). B2 남은 공간 = 8-4 = 4. 이동량 min(6, 4) = 4."),
      question: t(E,
        "State [6,4,0]. Step 3: pour 1→2. What is milk[1] after?",
        "상태 [6,4,0]. 3단계: 1→2 붓기. 이후 milk[1]은?"),
      options: [
        t(E, "4 (no change)", "4 (변화 없음)"),
        t(E, "8 (full)", "8 (가득)"),
        t(E, "10", "10"),
      ],
      correct: 1,
      explain: t(E,
        "B2 remaining = 8-4 = 4. min(6, 4) = 4 transfers. B2: 4+4 = 8 (full!). B1: 6-4 = 2.",
        "B2 남은 공간 = 8-4 = 4. min(6, 4) = 4 이동. B2: 4+4 = 8 (가득!). B1: 6-4 = 2."),
    },
    // 2-5: Complexity + insight
    {
      type: "input",
      narr: t(E,
        "The total number of pour operations is fixed. How many times do we loop?",
        "총 붓기 횟수는 고정이야. 몇 번 반복해?"),
      question: t(E,
        "How many pour operations total?",
        "총 붓기 횟수는?"),
      hint: t(E,
        "The problem says 100 steps!",
        "문제에서 100단계라고 했어!"),
      answer: 100,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMixMilkCh3(E) {
  return [
    // 3-1: Step 1 — Read input
    {
      type: "reveal",
      narr: t(E,
        "Let's build the code step by step! First, we read 3 lines of input. Each has capacity and initial milk for one bucket.",
        "코드를 한 단계씩 만들어보자! 먼저 3줄의 입력을 읽어. 각 줄에 양동이 하나의 용량과 초기 우유량이 있어."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 1: Read the 3 buckets", "1단계: 양동이 3개 읽기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "Input: 3 lines, each \"capacity milk\"",
              "입력: 3줄, 각각 \"용량 우유\"")}
          </div>
          <CodeSnippet
            lines={[
              "cap = [0] * 3",
              "milk = [0] * 3",
              "for i in range(3):",
              "    cap[i], milk[i] = map(int, input().split())",
            ]}
            highlight={[0, 1, 2, 3]}
          />
          <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.5 }}>
            {t(E,
              "Two arrays: cap[] stores max capacity, milk[] stores current amount.",
              "배열 2개: cap[]은 최대 용량, milk[]는 현재 양을 저장해.")}
          </div>
        </div>),
    },
    // 3-2: Step 2 — Loop structure
    {
      type: "reveal",
      narr: t(E,
        "Next, we loop 100 times. Each step, we figure out which bucket pours into which using modular arithmetic!",
        "다음으로 100번 반복해. 각 단계에서 어떤 양동이에서 어떤 양동이로 부을지 모듈러 연산으로 결정해!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 2: The simulation loop", "2단계: 시뮬레이션 루프")}
          </div>
          <CodeSnippet
            lines={[
              "cap = [0] * 3",
              "milk = [0] * 3",
              "for i in range(3):",
              "    cap[i], milk[i] = map(int, input().split())",
              "",
              "for step in range(100):",
              "    src = step % 3",
              "    dst = (step + 1) % 3",
            ]}
            highlight={[5, 6, 7]}
          />
          <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "center" }}>
            {[
              { step: 0, src: 0, dst: 1 },
              { step: 1, src: 1, dst: 2 },
              { step: 2, src: 2, dst: 0 },
            ].map(({ step, src, dst }) => (
              <div key={step} style={{
                background: "#fffbeb", borderRadius: 6, padding: "4px 8px",
                border: "1.5px solid #fcd34d", fontSize: 11,
                fontFamily: "'JetBrains Mono',monospace", color: "#92400e",
              }}>
                s={step}: {src}→{dst}
              </div>
            ))}
          </div>
        </div>),
    },
    // 3-3: Step 3 — Pour logic
    {
      type: "reveal",
      narr: t(E,
        "The core: calculate how much to pour, then update both buckets. This is just one line of math plus two updates!",
        "핵심: 얼마나 부을지 계산하고 양쪽 양동이를 업데이트해. 수학 한 줄에 업데이트 두 줄이면 끝!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 3: The pour logic", "3단계: 붓기 로직")}
          </div>
          <CodeSnippet
            lines={[
              "for step in range(100):",
              "    src = step % 3",
              "    dst = (step + 1) % 3",
              "    # pour src -> dst",
              "    amount = min(milk[src], cap[dst] - milk[dst])",
              "    milk[src] -= amount",
              "    milk[dst] += amount",
            ]}
            highlight={[4, 5, 6]}
          />
          <div style={{ marginTop: 8, background: "#fef3c7", borderRadius: 8, padding: 8, border: "1.5px solid #fbbf24", fontSize: 12, lineHeight: 1.8, color: "#92400e" }}>
            <div><span style={{ fontWeight: 800 }}>cap[dst] - milk[dst]</span> = {t(E, "remaining space in destination", "목적지의 남은 공간")}</div>
            <div><span style={{ fontWeight: 800 }}>min(...)</span> = {t(E, "can't pour more than source has OR dest can fit", "소스가 가진 양과 목적지 남은 공간 중 작은 값")}</div>
          </div>
        </div>),
    },
    // 3-4: Quiz on code understanding
    {
      type: "quiz",
      narr: t(E,
        "Why do we use min() in the amount calculation? Think about what could go wrong without it!",
        "이동량 계산에서 왜 min()을 사용할까? min() 없이 무엇이 잘못될 수 있는지 생각해봐!"),
      question: t(E,
        "Why min(milk[src], cap[dst] - milk[dst])?",
        "왜 min(milk[src], cap[dst] - milk[dst])일까?"),
      options: [
        t(E, "To make the code shorter", "코드를 짧게 만들려고"),
        t(E, "Can't pour more than source has, can't overflow destination", "소스보다 많이 부을 수 없고, 목적지를 넘칠 수 없으니까"),
        t(E, "It's always the same value anyway", "어차피 항상 같은 값이니까"),
      ],
      correct: 1,
      explain: t(E,
        "Two constraints: (1) can't pour more milk than source has, (2) can't exceed destination capacity. min() ensures both!",
        "제약 2가지: (1) 소스가 가진 것보다 많이 부을 수 없고, (2) 목적지 용량을 초과할 수 없어. min()이 둘 다 보장해!"),
    },
    // 3-5: Complete code
    {
      type: "code",
      narr: t(E,
        "Add the output at the end: print each bucket's final milk. That's the complete solution!",
        "마지막에 출력 추가: 각 양동이의 최종 우유량을 출력해. 이게 전체 풀이!"),
      label: t(E, "Complete Solution", "전체 풀이"),
      code: SOLUTION_CODE,
    },
  ];
}
