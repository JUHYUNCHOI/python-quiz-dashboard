// Collatz (MCC 2023 P1) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
// 건드리지 않고 여기에만 (photoshoot25 / cowsplits / chipxchg 와 같은 방식).
//
// 원칙: 학생 목소리(해요체), 관찰→추론, 시뮬로 개념.
//   · CollatzStepSim — 리스트 [1,2,3,4,5] 에 절차를 한 번(k=1) 적용.
//     각 원소를 하나씩: 짝수면 ÷2, 홀수면 ×3+1 → 제자리에서 바뀜 → 마지막에 합.

import { t } from "@/components/quest/theme";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#059669";
const ODD = "#f59e0b", ODDBG = "#fffbeb";   // 홀수 (×3+1)
const EVEN = "#2563eb", EVENBG = "#eff6ff"; // 짝수 (÷2)

function Tile({ n, state = "todo", size = 46 }) {
  // state: "todo" | "active" | "done"
  const st = state === "active"
    ? { bg: A, bd: A, fg: "#fff" }
    : state === "done"
    ? { bg: "#ecfdf5", bd: "#6ee7b7", fg: "#065f46" }
    : { bg: "#fff", bd: "#e2e8f0", fg: "#1f2937" };
  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 10, background: st.bg, border: `2px solid ${st.bd}`, color: st.fg,
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: size * 0.42, transition: "all .15s" }}>
      {n}
    </div>
  );
}

function Say({ children, tone = "go" }) {
  const c = tone === "odd"  ? { bg: ODDBG, bd: "#fbbf24", fg: "#92400e" }
          : tone === "even" ? { bg: EVENBG, bd: "#60a5fa", fg: "#1e40af" }
          : tone === "aha"  ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#ecfdf5", bd: "#6ee7b7", fg: "#065f46" };
  return (
    <div style={{ maxWidth: 540, margin: "6px auto 16px", padding: "12px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
      fontSize: 13.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap" }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   CollatzStepSim — [한 번 적용해보기] 리스트에 절차를 k=1번.
   [1,2,3,4,5] → 각 원소 짝/홀 판단해 제자리 변환 → [4,1,10,2,16] → 합 33.
   ═══════════════════════════════════════════════════════════════ */
export function CollatzStepSim({ E }) {
  const orig = [1, 2, 3, 4, 5];
  const after = orig.map((x) => (x % 2 === 0 ? x / 2 : 3 * x + 1)); // [4,1,10,2,16]
  const steps = [
    { kind: "intro" },
    ...orig.map((_, i) => ({ kind: "elem", i })),
    { kind: "sum" },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  // 현재 화면에 그릴 값 배열 + 각 칸 상태
  const cell = orig.map((v, j) => {
    if (s.kind === "sum") return { n: after[j], state: "done" };
    if (s.kind === "elem") {
      if (j < s.i) return { n: after[j], state: "done" };
      if (j === s.i) return { n: after[j], state: "active" };
      return { n: orig[j], state: "todo" };
    }
    return { n: orig[j], state: "todo" }; // intro
  });

  const cur = s.kind === "elem" ? orig[s.i] : null;
  const isEven = cur != null && cur % 2 === 0;

  const say =
    s.kind === "intro" ? t(E, <>Here's the list <b>[1, 2, 3, 4, 5]</b>. Let's run the procedure <b>once</b> (k = 1): each number, if even <b>÷2</b>, if odd <b>×3+1</b>.</>,
                            <>리스트 <b>[1, 2, 3, 4, 5]</b> 가 있어요. 절차를 <b>한 번</b>(k = 1) 돌려봐요: 숫자마다 짝수면 <b>÷2</b>, 홀수면 <b>×3+1</b>.</>)
    : s.kind === "elem"
      ? (isEven
          ? t(E, <><b>{cur}</b> is <b>even</b> → {cur} ÷ 2 = <b>{after[s.i]}</b>.</>,
                 <><b>{cur}</b> 은 <b>짝수</b> → {cur} ÷ 2 = <b>{after[s.i]}</b>.</>)
          : t(E, <><b>{cur}</b> is <b>odd</b> → 3 × {cur} + 1 = <b>{after[s.i]}</b>.</>,
                 <><b>{cur}</b> 은 <b>홀수</b> → 3 × {cur} + 1 = <b>{after[s.i]}</b>.</>))
    : t(E, <>After one pass the list is <b>[4, 1, 10, 2, 16]</b>. The answer is the <b>sum</b>: 4+1+10+2+16 = <b>33</b>. ✓</>,
           <>한 바퀴 돌면 리스트는 <b>[4, 1, 10, 2, 16]</b>. 답은 전체 <b>합</b>: 4+1+10+2+16 = <b>33</b>. ✓</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Run the procedure once (k = 1)", "절차를 한 번 돌려보기 (k = 1)")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "sum" ? "aha" : s.kind === "elem" ? (isEven ? "even" : "odd") : "go"}>{say}</Say>

      <Row>
        {cell.map((c, j) => <Tile key={j} n={c.n} state={c.state} />)}
      </Row>

      {/* 변환 배지 */}
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 }}>
        {s.kind === "elem" && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 10,
            background: isEven ? EVENBG : ODDBG, border: `2px solid ${isEven ? EVEN : ODD}` }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: isEven ? EVEN : ODD, fontFamily: "'JetBrains Mono',monospace" }}>
              {isEven ? `${cur} ÷ 2` : `3 × ${cur} + 1`}
            </span>
            <span style={{ fontSize: 15, fontWeight: 800, color: A }}>→ {after[s.i]}</span>
          </div>
        )}
        {s.kind === "sum" && (
          <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "#065f46", letterSpacing: 1 }}>
            4 + 1 + 10 + 2 + 16 = 33
          </div>
        )}
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
