// Sum^K (MCC 2023 P6) 용 시뮬 — components.jsx 는 건드리지 않고 여기에만
// (cowsplits / chipxchg / photoshoot25 와 같은 방식).
//
// 원칙 (quest_problem_standard + pain_points):
//   · 학생이 주인공 — 학생 목소리(해요체), 관찰 → 추론
//   · 시뮬로 개념: 작은 예 {1,2,3} 의 7개 부분집합을 직접 세며 (합)^K 누적
//   · Tile/Say/Row/Caption 은 cowsplits/sims.jsx 에서 그대로 가져옴

import { t } from "@/components/quest/theme";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#8b5cf6";
const PUR = "#8b5cf6", PURBG = "#f5f3ff", PURDK = "#5b21b6";

/* cowsplits/sims.jsx 에서 그대로 — 글자/숫자 타일 */
function Tile({ ch, size = 42, bg = "#fff", bd = "#e2e8f0", fg = "#1f2937", faded = false, badge = null }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center",
      justifyContent: "center", borderRadius: 9, background: bg, border: `2px solid ${bd}`,
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: size * 0.5, color: fg,
      opacity: faded ? 0.3 : 1, transition: "all .15s" }}>
      {ch}
      {badge != null && (
        <span style={{ position: "absolute", top: -9, right: -8, minWidth: 17, height: 17, borderRadius: 999,
          background: PUR, color: "#fff", fontSize: 11, fontWeight: 800, display: "flex",
          alignItems: "center", justifyContent: "center", padding: "0 3px", boxShadow: "0 2px 5px rgba(0,0,0,.2)" }}>
          {badge}
        </span>
      )}
    </div>
  );
}

/* 학생 목소리 말풍선 (초록 = 관찰/진행, 노랑 = 막힘, 파랑 = 발견) */
function Say({ children, tone = "go" }) {
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
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
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, flexWrap: "wrap" }}>{children}</div>;
}
function Caption({ color, children }) {
  return <div style={{ textAlign: "center", marginTop: 13, fontSize: 13.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace" }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   SumkSim — [작은 예로 직접] {1,2,3} 의 7개 비어있지 않은 부분집합을
   하나씩 세며 (합)^K 를 누적. K = 2 (제곱).
     {1}→1²=1(누적1) {2}→4(5) {3}→9(14) {1,2}→9(23)
     {1,3}→16(39) {2,3}→25(64) {1,2,3}→36(100)
   ═══════════════════════════════════════════════════════════════ */
export function SumkSim({ E }) {
  const arr = [1, 2, 3];
  const K = 2;
  const subs = [[0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2]];

  // 각 부분집합의 합 / 제곱 / 누적 미리 계산
  const rows = [];
  let run = 0;
  for (const idxs of subs) {
    const sum = idxs.reduce((s, i) => s + arr[i], 0);
    const sq = sum * sum;
    run += sq;
    rows.push({ idxs, sum, sq, run });
  }
  const grand = run; // 100

  const steps = [{ kind: "intro" }, ...subs.map((_, i) => ({ kind: "sub", i })), { kind: "done" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const setStr = (idxs) => "{" + idxs.map((i) => arr[i]).join(", ") + "}";
  const cur = s.kind === "sub" ? rows[s.i] : null;
  const shownCount = s.kind === "sub" ? s.i + 1 : s.kind === "done" ? rows.length : 0;

  const say =
    s.kind === "intro"
      ? t(E, <>Small case: <b>A = [1, 2, 3]</b>, <b>K = 2</b>. There are <b>7</b> non-empty subsets. For each, take its <b>sum</b>, square it, and add to a <b>running total</b>.</>,
             <>작은 예: <b>A = [1, 2, 3]</b>, <b>K = 2</b>. 비어있지 않은 부분집합은 <b>7개</b>. 각각 <b>원소 합</b>을 구해 <b>제곱</b>하고, <b>누적 합</b>에 더해요.</>)
      : s.kind === "sub"
      ? t(E, <>Subset <b>{setStr(cur.idxs)}</b>: sum = <b>{cur.sum}</b> → <b>{cur.sum}² = {cur.sq}</b> → running total <b>{cur.run}</b>.</>,
             <>부분집합 <b>{setStr(cur.idxs)}</b>: 합 = <b>{cur.sum}</b> → <b>{cur.sum}² = {cur.sq}</b> → 누적 <b>{cur.run}</b>.</>)
      : t(E, <>All 7 done! Add every (sum)² → the answer is <b>{grand}</b>. (This is the sample: <b>3 2 / 1 2 3 → 100</b>.)</>,
             <>7개 끝! 모든 (합)²을 더하면 → 답은 <b>{grand}</b>. (이게 바로 샘플: <b>3 2 / 1 2 3 → 100</b>.)</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Add (sum)² over all 7 subsets", "7개 부분집합의 (합)² 다 더하기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "done" ? "aha" : s.kind === "intro" ? "go" : "go"}>{say}</Say>

      {/* 현재 부분집합의 원소 in/out 타일 */}
      {s.kind === "sub" && (
        <>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>
            A = [1, 2, 3]
          </div>
          <Row>
            {arr.map((v, i) => {
              const inSet = cur.idxs.includes(i);
              return <Tile key={i} ch={v} size={48}
                bg={inSet ? PUR : "#fff"} bd={inSet ? PUR : "#e2e8f0"} fg={inSet ? "#fff" : "#1f2937"}
                faded={!inSet} />;
            })}
          </Row>
          <Caption color={PURDK}>
            {t(E, "sum ", "합 ")}{cur.sum} → {cur.sum}² = {cur.sq}
          </Caption>
        </>
      )}

      {/* 누적 장부 — 7개 부분집합을 세로로, 지나온 것은 색칠 */}
      <div style={{ maxWidth: 380, margin: "16px auto 0", display: "grid", gap: 5 }}>
        {rows.map((r, i) => {
          const passed = i < shownCount;
          const active = s.kind === "sub" && i === s.i;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 8,
              background: active ? PUR : passed ? PURBG : "#f8fafc",
              border: `1.5px solid ${active ? PURDK : passed ? "#c4b5fd" : "#e2e8f0"}`,
              opacity: passed ? 1 : 0.4, transition: "all .15s" }}>
              <span style={{ flex: 1, fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                color: active ? "#fff" : PURDK }}>{setStr(r.idxs)}</span>
              <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                color: active ? "#ede9fe" : "#7c3aed" }}>{r.sum}² = {r.sq}</span>
              <span style={{ fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                color: active ? "#fff" : "#15803d", minWidth: 52, textAlign: "right" }}>
                {passed ? `→ ${r.run}` : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* 누적 합 박스 */}
      <div style={{ maxWidth: 380, margin: "10px auto 0", background: "#fff", border: `1.5px solid #c4b5fd`,
        borderRadius: 10, padding: "9px 14px", textAlign: "center" }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: "#7c3aed", letterSpacing: 0.5 }}>
          {t(E, "RUNNING TOTAL", "누적 합")}
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: PURDK, fontFamily: "'JetBrains Mono',monospace" }}>
          {s.kind === "intro" ? 0 : s.kind === "done" ? grand : cur.run}
        </div>
        {s.kind === "done" && (
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#15803d", marginTop: 2 }}>
            ✅ {t(E, "answer", "답")} = {grand} {t(E, "(mod 998244353)", "(mod 998244353)")}
          </div>
        )}
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
