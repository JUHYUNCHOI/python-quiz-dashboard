// Rectangles (MCC 2023 P5) 용 시뮬 — App-imported export 가 있는 components.jsx 는
// 건드리지 않고 여기 새 시뮬만 (cowsplits / chipxchg 와 같은 방식).
//
// 원칙 (quest_problem_standard + 학생이 주인공):
//   · 학생 목소리(해요체), 관찰 → 추론, 시뮬로 개념 발견.
//   · RectanglesSim — 빨강 사각형 3개를 x축에 그리고, 파랑(연속 구간)으로
//     나눠 면적을 비교해 → 최소 8 을 학생이 눈으로 발견.

import React from "react";
import { t } from "@/components/quest/theme";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#f97316";
const RED = "#ef4444", REDBD = "#dc2626", REDBG = "#fee2e2";
const BLU = "#2563eb", BLUBG = "rgba(37,99,235,0.16)";

/* ── 공용 조각 (cowsplits/sims.jsx 에서 가져와 오렌지 accent 에 맞춤) ── */
function Tile({ ch, size = 42, bg = "#fff", bd = "#e2e8f0", fg = "#1f2937" }) {
  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center",
      justifyContent: "center", borderRadius: 9, background: bg, border: `2px solid ${bd}`,
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: size * 0.5, color: fg }}>
      {ch}
    </div>
  );
}
function Say({ children, tone = "go" }) {
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#fff7ed", bd: "#fdba74", fg: "#9a3412" };
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
  return <div style={{ textAlign: "center", marginTop: 13, fontSize: 13.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace", wordBreak: "keep-all" }}>{children}</div>;
}

/* ── 샘플의 빨강 3개: ①1×1, ②2×2, ③1×2 (높이 h × 폭 w) ── */
const REDS = [
  { h: 1, w: 1, label: "①" },   // ①
  { h: 2, w: 2, label: "②" },   // ②
  { h: 1, w: 2, label: "③" },   // ③
];
const UNIT = 30;
const TOTAL_W = REDS.reduce((a, r) => a + r.w, 0);   // 5
const MAX_H = Math.max(...REDS.map((r) => r.h));      // 2
const leftOf = (idx) => REDS.slice(0, idx).reduce((a, r) => a + r.w, 0) * UNIT;
const groupCost = (g) => {
  const sw = g.reduce((a, i) => a + REDS[i].w, 0);
  const mh = Math.max(...g.map((i) => REDS[i].h));
  return { sw, mh, area: sw * mh };
};

/* 축 위에 빨강들을 그리고, groups(연속 구간)가 있으면 파랑 오버레이를 얹는다. */
function RectStage({ groups = null, bad = false, showWaste = false }) {
  const stageW = TOTAL_W * UNIT;                 // 150
  const stageH = MAX_H * UNIT;                   // 60
  const padTop = 26, baseline = 26;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", width: stageW + 6, height: stageH + padTop + baseline }}>
        {/* x축 */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: baseline - 1, height: 2, background: "#94a3b8" }} />
        <span style={{ position: "absolute", right: -14, bottom: baseline - 8, fontSize: 11, fontWeight: 800, color: "#94a3b8", fontFamily: "'JetBrains Mono',monospace" }}>x</span>
        {/* 빨강 사각형들 */}
        {REDS.map((r, i) => (
          <div key={i} style={{ position: "absolute",
            left: leftOf(i) + 3, bottom: baseline,
            width: r.w * UNIT - 4, height: r.h * UNIT - 1,
            background: REDBG, border: `2px solid ${REDBD}`, borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 800, color: REDBD, fontFamily: "'JetBrains Mono',monospace" }}>
            {r.label}
          </div>
        ))}
        {/* 파랑이 덮고도 남는 빈 공간 — 이게 '손해' 라서 나누면 줄어든다 */}
        {showWaste && groups && groups.map((g) => {
          const { mh } = groupCost(g);
          return g.map((i) => {
            const gap = mh - REDS[i].h;
            if (gap <= 0) return null;
            return (
              <div key={`w${i}`} style={{ position: "absolute",
                left: leftOf(i) + 3, bottom: baseline + REDS[i].h * UNIT,
                width: REDS[i].w * UNIT - 4, height: gap * UNIT - 1, zIndex: 3,
                background: "repeating-linear-gradient(45deg,#fca5a5 0 5px,transparent 5px 10px)",
                border: "1.5px dashed #dc2626", borderRadius: 4 }} />
            );
          });
        })}
        {/* 파랑 그룹 오버레이 (연속 구간마다 하나) */}
        {groups && groups.map((g, gi) => {
          const { sw, mh, area } = groupCost(g);
          const col = bad ? REDBD : BLU;
          return (
            <div key={gi} style={{ position: "absolute",
              left: leftOf(g[0]) + 1, bottom: baseline,
              width: sw * UNIT, height: mh * UNIT, boxSizing: "border-box", zIndex: 4,
              background: bad ? "rgba(220,38,38,0.10)" : BLUBG,
              border: `2.5px ${bad ? "dashed" : "solid"} ${col}`, borderRadius: 5 }}>
              <span style={{ position: "absolute", top: -19, left: "50%", transform: "translateX(-50%)",
                fontSize: 11, fontWeight: 800, color: col, whiteSpace: "nowrap", fontFamily: "'JetBrains Mono',monospace" }}>
                {bad ? "✗" : `${mh}×${sw}=${area}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 한 분할(파티션)을 제목 + 그림 + 총면적으로 보여주기 */
function Partition({ title, groups, total, best = false }) {
  return (
    <div style={{ padding: "10px 12px 8px", borderRadius: 12,
      background: best ? "#ecfdf5" : "#f8fafc",
      border: `2px solid ${best ? "#34d399" : "#e2e8f0"}` }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: best ? "#065f46" : "#475569", textAlign: "center", marginBottom: 8, wordBreak: "keep-all" }}>{title}</div>
      <RectStage groups={groups} />
      <div style={{ textAlign: "center", marginTop: 8, fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: best ? "#059669" : "#334155" }}>
        = {total}{best ? " ✓" : ""}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RectanglesSim — 빨강 3개 → 파랑(연속 구간)으로 나눠 면적 비교 → 최소 8.
   reds → rule(파랑 하나의 비용) → compare(A vs B) → min(8).
   ═══════════════════════════════════════════════════════════════ */
export function RectanglesSim({ E }) {
  const steps = [{ kind: "reds" }, { kind: "rule" }, { kind: "compare" }, { kind: "min" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const A_groups = [[0], [1, 2]];   // [①] + [②③]
  const B_groups = [[0, 1], [2]];   // [①②] + [③]
  const aTotal = A_groups.reduce((a, g) => a + groupCost(g).area, 0); // 9
  const bTotal = B_groups.reduce((a, g) => a + groupCost(g).area, 0); // 8

  const say =
    s.kind === "reds" ? t(E,
        <>Three red rectangles sit side by side on the x-axis: <b style={{ color: REDBD }}>① 1×1</b>, <b style={{ color: REDBD }}>② 2×2</b>, <b style={{ color: REDBD }}>③ 1×2</b> (height × width).</>,
        <>빨강 사각형 3개가 x축에 나란히 붙어 있어요: <b style={{ color: REDBD }}>① 1×1</b>, <b style={{ color: REDBD }}>② 2×2</b>, <b style={{ color: REDBD }}>③ 1×2</b> (높이 × 폭).</>)
    : s.kind === "rule" ? t(E,
        <>One <b style={{ color: BLU }}>blue</b> covers a <b>contiguous group</b>. Its <b>width = sum of widths</b>, <b>height = max height</b>. One blue over all three → 2×5 = <b>10</b>. Can we do better by splitting?</>,
        <>파랑 하나는 <b>연속 구간</b>을 덮어요. <b>폭 = 폭의 합</b>, <b>높이 = 최고 높이</b>. 셋을 파랑 하나로 덮으면 2×5 = <b>10</b>. 나누면 더 줄일 수 있을까요?</>)
    : s.kind === "compare" ? t(E,
        <>Split into (at most K=2) groups two ways. <b>A</b>: [①]+[②③] = 1+8 = <b>9</b>. <b>B</b>: [①②]+[③] = 6+2 = <b>8</b>.</>,
        <>(파랑 최대 K=2개로) 두 가지로 나눠봐요. <b>A</b>: [①]+[②③] = 1+8 = <b>9</b>. <b>B</b>: [①②]+[③] = 6+2 = <b>8</b>.</>)
    : t(E,
        <>The smallest total is <b>8</b> — group <b>[①②]</b> = 2×3 = 6 and <b>[③]</b> = 1×2 = 2. That's the answer!</>,
        <>가장 작은 총면적은 <b>8</b> — <b>[①②]</b> = 2×3 = 6, <b>[③]</b> = 1×2 = 2. 이게 답이에요!</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Split reds into contiguous groups", "빨강을 연속 구간으로 나누기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "min" ? "aha" : "go"}>{say}</Say>

      {s.kind === "reds" && (
        <>
          <RectStage groups={null} />
          <Caption color={REDBD}>{t(E, "① 1×1  ·  ② 2×2  ·  ③ 1×2", "① 1×1  ·  ② 2×2  ·  ③ 1×2")}</Caption>
        </>
      )}

      {s.kind === "rule" && (
        <>
          <RectStage groups={[[0, 1, 2]]} />
          <Caption color={BLU}>{t(E, "one blue = height(max) × width(sum) = 2×5 = 10", "파랑 하나 = 최고높이 × 폭합 = 2×5 = 10")}</Caption>
        </>
      )}

      {s.kind === "compare" && (
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <Partition title={t(E, "A · [①] + [②③]", "A · [①] + [②③]")} groups={A_groups} total={aTotal} />
          <Partition title={t(E, "B · [①②] + [③]", "B · [①②] + [③]")} groups={B_groups} total={bTotal} best />
        </div>
      )}

      {s.kind === "min" && (
        <>
          <RectStage groups={B_groups} />
          <Caption color="#059669">{t(E, "min total area = 8 ✓", "최소 총면적 = 8 ✓")}</Caption>
        </>
      )}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WhyContiguousSim — "파랑 하나는 연속 구간을 덮는다" 를 통보하지 않고 보여준다.
   전엔 이 문장이 근거 없이 한 줄로 나왔음 (선생님 2026-09-03: "하나도 이해 안되게끔").
   ①과 ③만 한 파랑으로 묶으려 하면 ②가 딸려 들어간다 → 규칙 위반 → 그래서 붙은 것끼리.
   ═══════════════════════════════════════════════════════════════ */
export function WhyContiguousSim({ E }) {
  const steps = [{ kind: "want" }, { kind: "draw" }, { kind: "rule" }, { kind: "so" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const say =
    s.kind === "want" ? t(E,
        <>Say we want one blue over <b>① and ③</b> only,<br />skipping ② in the middle.<br />Can we?</>,
        <>가운데 ②를 건너뛰고<br /><b>①과 ③</b>만 파랑 하나로 묶고 싶다고 해봐요.<br />될까요?</>)
    : s.kind === "draw" ? t(E,
        <>A rectangle can't have a hole.<br />To reach ① and ③ it must stretch across —<br />and <b>② ends up inside it too</b>.</>,
        <>사각형은 가운데를 뚫을 수 없어요.<br />①과 ③에 닿으려면 쭉 늘어나야 하고,<br />그러면 <b>② 도 같이 안에 들어가요</b>.</>)
    : s.kind === "rule" ? t(E,
        <>But the rule says each red sits in <b>exactly one</b> blue.<br />② already belongs to its own blue.<br />→ Two blues over ② — not allowed ✗</>,
        <>그런데 규칙은 각 빨강이 <b>정확히 한</b> 파랑 안이에요.<br />② 는 이미 자기 파랑이 있는데<br />→ ② 위에 파랑이 둘 — 안 돼요 ✗</>)
    : t(E,
        <>So a blue can never skip over anyone.<br />Whatever one blue takes is always a <b>run of neighbours</b>.<br />→ Splitting the reds = <b>cutting the row into pieces</b>.</>,
        <>그래서 파랑은 누구도 건너뛸 수 없어요.<br />파랑 하나가 맡는 건 언제나 <b>붙어 있는 덩어리</b>예요.<br />→ 빨강 나누기 = <b>줄을 몇 토막으로 자르기</b>.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why one blue = a run of neighbours", "왜 파랑 하나는 '붙어 있는 덩어리' 일까")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "so" ? "aha" : s.kind === "rule" ? "stuck" : "go"}>{say}</Say>

      {s.kind === "want" && <RectStage groups={null} />}
      {(s.kind === "draw" || s.kind === "rule") && <RectStage groups={[[0, 1, 2]]} bad />}
      {s.kind === "so" && <RectStage groups={[[0, 1], [2]]} />}

      {s.kind === "so" && (
        <Caption color="#059669">{t(E, "e.g. [①②] + [③]  ·  never [①③] + [②]", "예: [①②] + [③]  ·  [①③] + [②] 는 불가능")}</Caption>
      )}

      <div style={{ height: 14 }} />
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WhyCostSim — "비용 = (폭합) × (최고높이)" 를 두 걸음으로 세운다.
   그리고 남는 빈 공간(낭비)을 보여줘야 '왜 나누면 줄어드는지' 가 이어진다.
   ═══════════════════════════════════════════════════════════════ */
export function WhyCostSim({ E }) {
  const steps = [{ kind: "w" }, { kind: "h" }, { kind: "area" }, { kind: "waste" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const G = [[0, 1]];        // [①②] — 1×1 과 2×2

  const say =
    s.kind === "w" ? t(E,
        <>Take one blue over <b>[①②]</b>.<br />It has to reach from ①'s left edge to ②'s right edge.<br />→ width = <b>1 + 2 = 3</b> (the widths added up)</>,
        <>파랑 하나로 <b>[①②]</b> 를 덮어봐요.<br />①의 왼쪽 끝부터 ②의 오른쪽 끝까지 닿아야 해요.<br />→ 폭 = <b>1 + 2 = 3</b> (폭을 더한 값)</>)
    : s.kind === "h" ? t(E,
        <>How tall? It must clear the <b>tallest</b> one inside.<br />① is 1 tall, ② is 2 tall.<br />→ height = <b>2</b> (the biggest, not the sum)</>,
        <>높이는요? 안에 든 것 중 <b>제일 높은</b> 걸 넘어야 해요.<br />①은 1, ②는 2 니까<br />→ 높이 = <b>2</b> (합이 아니라 최댓값)</>)
    : s.kind === "area" ? t(E,
        <>So one blue costs<br /><b>(widths added) × (tallest)</b> = 3 × 2 = <b>6</b>.</>,
        <>그래서 파랑 하나의 값은<br /><b>(폭을 더한 것) × (제일 높은 것)</b> = 3 × 2 = <b>6</b> 이에요.</>)
    : t(E,
        <>Notice the red-striped gap above ①.<br />The reds only fill 1+4 = 5, but we pay <b>6</b>.<br />→ Putting a <b>short</b> one next to a <b>tall</b> one wastes space.<br />That is exactly what splitting can fix.</>,
        <>① 위에 빗금 친 빈칸이 보이죠.<br />빨강은 1+4 = 5 인데 우리가 내는 값은 <b>6</b> 이에요.<br />→ <b>낮은 것</b>과 <b>높은 것</b>을 같이 묶으면 그만큼 손해예요.<br />나누기가 고칠 수 있는 게 바로 이거예요.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "What one blue costs", "파랑 하나의 값은 얼마일까")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "waste" ? "stuck" : s.kind === "area" ? "aha" : "go"}>{say}</Say>

      <RectStage groups={G} showWaste={s.kind === "waste"} />
      <Caption color={s.kind === "waste" ? "#dc2626" : BLU}>
        {s.kind === "w" ? t(E, "width = 1 + 2 = 3", "폭 = 1 + 2 = 3")
          : s.kind === "h" ? t(E, "height = max(1, 2) = 2", "높이 = max(1, 2) = 2")
          : s.kind === "area" ? t(E, "3 × 2 = 6", "3 × 2 = 6")
          : t(E, "reds 5 · we pay 6 → 1 wasted", "빨강 5 · 내는 값 6 → 1 만큼 손해")}
      </Caption>

      <div style={{ height: 14 }} />
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DPTableFillSim — dp 표를 한 칸씩 손으로 채워 보인다.

   왜 만들었나 (2026-09-07):
     학생 둘이 각각 같은 말을 했다.
       "DP로 넘어가는 순간부터는 확실히 못 따라갔다. dp[k][i] 표를 손으로 직접
        채워보고서야 이해했지, 화면만 보고는 '그렇다니까 그런가보다' 에 가까웠다."
       "moohunt엔 숫자→비트→보드를 한 칸씩 채워주는 시뮬이 있었는데, rectangles는
        dp표를 그렇게 한 칸씩 채워주는 시뮬 없이 바로 완성된 코드로 넘어감."
     막힌 자리도 정확히 짚었다 — "코드 4/5, dp[kk][i] 가 처음 등장하는 자리".
     브루트포스까지는 ①②③ 같은 작은 그림으로 봤는데, DP 는 갑자기 kk·i·j 기호뿐이었다.

   설계 원칙:
     · 새 숫자를 만들지 않는다. Ch1 에서 학생이 이미 손으로 구한 값(1·6·10·8)을 그대로 쓴다.
     · 이름(dp)은 표를 다 채운 뒤에 붙인다 — feedback_first_concept_scaffolding.md
     · ◀▶ 수동. 자동재생 없음 — feedback_sim_style_consistency.md
     · 숫자는 전부 아래 REDS 에서 그 자리에서 계산한다. 표와 어긋날 수 없다.
   ═══════════════════════════════════════════════════════════════ */
export function DPTableFillSim({ E }) {
  const N = REDS.length;                       // 3
  const INF = Infinity;
  // 표를 실제로 계산 — 화면 숫자는 전부 여기서 나온다
  const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(INF));
  dp[0][0] = 0;
  for (let kk = 1; kk <= N; kk++)
    for (let i = 1; i <= N; i++) {
      let sw = 0, mh = 0;
      for (let j = i; j >= 1; j--) {
        sw += REDS[j - 1].w; mh = Math.max(mh, REDS[j - 1].h);
        if (dp[kk - 1][j - 1] < INF) dp[kk][i] = Math.min(dp[kk][i], dp[kk - 1][j - 1] + sw * mh);
      }
    }

  // 채우는 순서 — 한 칸씩. cell = 지금 채우는 칸, try = 그 칸을 정할 때 따져본 후보
  const steps = [
    { k: "intro" },
    { k: "cell", kk: 1, i: 1 }, { k: "cell", kk: 1, i: 2 }, { k: "cell", kk: 1, i: 3 },
    { k: "try", kk: 2, i: 2, j: 2 }, { k: "try", kk: 2, i: 2, j: 1 }, { k: "cell", kk: 2, i: 2 },
    { k: "try", kk: 2, i: 3, j: 3 }, { k: "try", kk: 2, i: 3, j: 2 }, { k: "cell", kk: 2, i: 3 },
    { k: "answer" },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  // 지금까지 확정된 칸
  const filled = new Set(["0,0"]);
  for (let z = 1; z <= ts.safe; z++) {
    const st = steps[z];
    if (st.k === "cell") filled.add(`${st.kk},${st.i}`);
  }

  const cost = (j, i) => {                     // j..i 를 파랑 하나로 덮는 값
    let sw = 0, mh = 0;
    for (let z = j; z <= i; z++) { sw += REDS[z - 1].w; mh = Math.max(mh, REDS[z - 1].h); }
    return { sw, mh, area: sw * mh };
  };

  const say = (() => {
    if (s.k === "intro") return t(E,
      <>We make a table. Rows = how many blues, columns = how many reds from the left.<br />
        (0 blues, 0 reds) is <b>0</b> — nothing there yet.</>,
      <>표를 하나 만들어요. 세로는 <b>파랑 개수</b>, 가로는 <b>앞에서부터 빨강 개수</b>.<br />
        (파랑 0개, 앞 0개) 칸은 <b>0</b> 이에요 — 아직 아무것도 없으니까.</>);
    if (s.k === "cell" && s.kk === 1) {
      const c = cost(1, s.i);
      const names = REDS.slice(0, s.i).map((r) => r.label).join("");
      return t(E,
        <>One blue has to cover <b>{names}</b> all at once.<br />
          ({REDS.slice(0, s.i).map((r) => r.w).join(" + ")}) × {c.mh} = <b>{c.area}</b></>,
        <>파랑 <b>1개</b>로 <b>{names}</b> 를 통째로 덮어요.<br />
          ({REDS.slice(0, s.i).map((r) => r.w).join(" + ")}) × {c.mh} = <b>{c.area}</b></>);
    }
    if (s.k === "try") {
      const c = cost(s.j, s.i);
      const front = dp[s.kk - 1][s.j - 1];
      const names = REDS.slice(s.j - 1, s.i).map((r) => r.label).join("");
      const frontNames = REDS.slice(0, s.j - 1).map((r) => r.label).join("") || "—";
      if (front === INF) return t(E,
        <>What if the last blue takes <b>{names}</b>?<br />
          Then the front (<b>{frontNames}</b>) has nothing left to cover — skip.</>,
        <>마지막 파랑이 <b>{names}</b> 를 맡으면요?<br />
          그럼 앞부분(<b>{frontNames}</b>)에 덮을 게 없어요 — 넘어가요.</>);
      const total = front + c.area;
      const better = total === dp[s.kk][s.i];
      return t(E,
        <>What if the last blue takes <b>{names}</b>? That costs {c.sw} × {c.mh} = <b>{c.area}</b>.<br />
          The front (<b>{frontNames}</b>) we already wrote down: <b>{front}</b>.<br />
          {c.area} + {front} = <b>{total}</b>{better ? "" : <> — bigger, throw it away.</>}</>,
        <>마지막 파랑이 <b>{names}</b> 를 맡으면요? 그 값은 {c.sw} × {c.mh} = <b>{c.area}</b>.<br />
          앞부분(<b>{frontNames}</b>)은 아까 적어둔 <b>{front}</b> 을 꺼내 써요.<br />
          {c.area} + {front} = <b>{total}</b>{better ? "" : <> — 더 크니까 버려요.</>}</>);
    }
    if (s.k === "cell") return t(E,
      <>So (<b>{s.kk} blues</b>, <b>first {s.i}</b>) = <b>{dp[s.kk][s.i]}</b>.</>,
      <>그래서 (파랑 <b>{s.kk}개</b>, 앞 <b>{s.i}개</b>) 칸은 <b>{dp[s.kk][s.i]}</b> 이에요.</>);
    return t(E,
      <>The answer is in the <b>last column</b> — pick the smallest: {dp[1][N]} or {dp[2][N]} → <b>{Math.min(dp[1][N], dp[2][N])}</b>.<br />
        Same number we found by hand earlier.<br />
        This table is what the code calls <b>dp[kk][i]</b>.</>,
      <>답은 <b>맨 오른쪽 칸</b>들 중에서 골라요 — {dp[1][N]} 과 {dp[2][N]} 중 <b>{Math.min(dp[1][N], dp[2][N])}</b>.<br />
        아까 손으로 구한 그 숫자예요.<br />
        이 표를 코드에서 <b>dp[kk][i]</b> 라고 불러요.</>);
  })();

  const cellBg = (kk, i) => {
    if (s.k !== "intro" && s.kk === kk && s.i === i) return "#fff7ed";
    if (s.k === "try" && kk === s.kk - 1 && i === s.j - 1) return "#ecfdf5";   // 꺼내 쓰는 앞부분
    return filled.has(`${kk},${i}`) ? "#fff" : "#f8fafc";
  };
  const cellBd = (kk, i) => {
    if (s.k !== "intro" && s.kk === kk && s.i === i) return A;
    if (s.k === "try" && kk === s.kk - 1 && i === s.j - 1) return "#059669";
    return "#e2e8f0";
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Filling the table by hand", "표를 한 칸씩 채워보기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.k === "answer" ? "aha" : s.k === "try" ? "go" : "go"}>{say}</Say>

      <div style={{ maxWidth: 360, margin: "14px auto 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "76px repeat(4, 1fr)", gap: 5 }}>
          <span />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ textAlign: "center", fontSize: 10.5, fontWeight: 800, color: "#94a3b8" }}>
              {t(E, `first ${i}`, `앞 ${i}개`)}
            </span>
          ))}
          {[0, 1, 2].map((kk) => (
            <React.Fragment key={`row${kk}`}>
              <span style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 4 }}>
                {t(E, `${kk} blue`, `파랑 ${kk}개`)}
              </span>
              {[0, 1, 2, 3].map((i) => {
                const v = dp[kk][i];
                const show = filled.has(`${kk},${i}`) && v < INF;
                return (
                  <span key={`${kk}-${i}`} style={{
                    height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 8, background: cellBg(kk, i), border: `2px solid ${cellBd(kk, i)}`,
                    fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 14,
                    color: show ? "#1f2937" : "#cbd5e1" }}>
                    {show ? v : "·"}
                  </span>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {s.k === "try" && (
        <Caption color="#059669">
          {t(E, "green = the front part we look up, never recompute",
               "초록 = 꺼내 쓰는 앞부분. 다시 계산 안 해요")}
        </Caption>
      )}

      <div style={{ height: 14 }} />
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
