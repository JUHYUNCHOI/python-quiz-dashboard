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

/* ── 가르치는 예제의 빨강 4개: ①1×1, ②2×2, ③1×2, ④2×1 (높이 h × 폭 w) ──

   2026-09-10 선생님이 **세 번** 물으셨다: "빨강이 4개인 경우를 보여주면 더 이해가 잘될것 같은데."

   전엔 빨강 3개(공식 샘플)로 가르쳤다. 그런데 3개면 나눌 수 있는 방법이 3가지뿐이라
   **손으로 10초면 다 센다** — 학생 에이전트가 실제로 그렇게 보고했다.
   그러면 "그래서 표는 왜 만드나" 가 화면에서 안 선다.

   ④ 를 **세로로 긴 것(2×1)** 으로 골랐다. 그 이유:
     · 답 11, 2등 12 — **차이가 1이라 눈으로는 못 고른다** (3개일 땐 8 대 9 였다)
     · 자르는 자리가 [①②][③] → [①][②③④] 로 **옮겨간다.**
       하나 붙었다고 답이 통째로 달라지는 걸 학생이 직접 본다.
     · 전체 폭이 5 → 6 칸으로만 늘어 모바일 그림이 안 넘친다
   후보 9개(높이 1~3 × 폭 1~3)를 전부 돌려 고른 값이다. 최적 나눔은 유일하다.

   ⚠️ 공식 샘플(`3 2 / 1 1 / 2 2 / 1 2 → 8`, MCC 2023 P5 원문)은 **지우지 않았다.**
      입출력 형식 카드에 그대로 있다. 가르치는 예제만 4개로 올린 것이다.  ── */
const REDS = [
  { h: 1, w: 1, label: "①" },   // ①
  { h: 2, w: 2, label: "②" },   // ②
  { h: 1, w: 2, label: "③" },   // ③
  { h: 2, w: 1, label: "④" },   // ④
];
const UNIT = 30;
const TOTAL_W = REDS.reduce((a, r) => a + r.w, 0);   // 6
const MAX_H = Math.max(...REDS.map((r) => r.h));      // 2
const leftOf = (idx) => REDS.slice(0, idx).reduce((a, r) => a + r.w, 0) * UNIT;
const groupCost = (g) => {
  const sw = g.reduce((a, i) => a + REDS[i].w, 0);
  const mh = Math.max(...g.map((i) => REDS[i].h));
  return { sw, mh, area: sw * mh };
};

/* 축 위에 빨강들을 그리고, groups(연속 구간)가 있으면 파랑 오버레이를 얹는다. */
/* scale — 표와 같이 놓을 땐 작게 (2026-09-08). 세로 공간이 모자라면 그림이 못 들어가는데,
   선생님이 세 번 연속 "그림이 없어서 무슨 넓이인지 모르겠다" 고 하셨다. 작게라도 넣는 게 맞다. */
export function RectStage({ groups = null, bad = false, showWaste = false, scale = 1 }) {
  const U = UNIT * scale;
  const stageW = TOTAL_W * U;
  const stageH = MAX_H * U;
  /* 라벨(그룹 위의 "3×2=6")은 작게 그릴 때 숨긴다 — 아래 groups 렌더 참고.
     그런데 그 라벨 자리를 비워두는 padTop 은 그대로여서 **아무것도 없는 여백**이 남았다.
     2026-09-10: 그 20px 때문에 rectangles 12/14 에서 ▶ 버튼이 하단 바에 9px 깔렸다.
     라벨을 안 그리는 경우엔 윗여백도 같이 줄인다. */
  const labelsHidden = scale < 0.6 && groups && groups.length > 1;
  const padTop = labelsHidden ? 6 : Math.max(20, 26 * scale + 8), baseline = 26 * scale;
  const leftOfS = (idx) => REDS.slice(0, idx).reduce((a, r) => a + r.w, 0) * U;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", width: stageW + 6, height: stageH + padTop + baseline }}>
        {/* x축 */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: baseline - 1, height: 2, background: "#94a3b8" }} />
        <span style={{ position: "absolute", right: -14, bottom: baseline - 8, fontSize: 11, fontWeight: 800, color: "#94a3b8", fontFamily: "'JetBrains Mono',monospace" }}>x</span>
        {/* 빨강 사각형들 */}
        {REDS.map((r, i) => (
          <div key={i} style={{ position: "absolute",
            left: leftOfS(i) + 3, bottom: baseline,
            width: r.w * U - 4, height: r.h * U - 1,
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
                left: leftOfS(i) + 3, bottom: baseline + REDS[i].h * U,
                width: REDS[i].w * U - 4, height: gap * U - 1, zIndex: 3,
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
              left: leftOfS(g[0]) + 1, bottom: baseline,
              width: sw * U, height: mh * U, boxSizing: "border-box", zIndex: 4,
              background: bad ? "rgba(220,38,38,0.10)" : BLUBG,
              border: `2.5px ${bad ? "dashed" : "solid"} ${col}`, borderRadius: 5 }}>
              {/* 2026-09-08 선생님: "글자랑 도형등 겹치는 부분이 있던데" — 맞다.
                  라벨 위치(top:-19)와 글자 크기(11px)가 **scale 을 안 따라갔다.**
                  작게 그리면(scale 0.52) 라벨이 그대로 커서, 옆 그룹 라벨끼리 겹치고
                  빨강 사각형 위로 올라탔다. 라벨도 같이 줄인다.
                  ⚠️ 작을 땐 아예 안 그린다 — 겹칠 바엔 없는 게 낫다. 값은 아래 총합이 말해준다. */}
              <span style={{ position: "absolute", top: -13 * Math.max(scale, .7) - 5,
                left: "50%", transform: "translateX(-50%)",
                display: scale < 0.6 && groups.length > 1 ? "none" : "block",
                fontSize: Math.max(9, 11 * scale), fontWeight: 800, color: col,
                whiteSpace: "nowrap", fontFamily: "'JetBrains Mono',monospace" }}>
                {/* 2026-09-08: 라벨이 `높이×폭` 인데 말풍선·공식은 내내 **(폭합) × (최고높이)** 였다.
                    같은 6을 `2×3` 과 `(1+2)×2` 두 모양으로 보여주면 학생이 다른 계산으로 읽는다.
                    순서를 공식과 맞춘다. */}
                {bad ? "✗" : `${sw}×${mh}=${area}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 한 분할(파티션)을 제목 + 그림 + 총면적으로 보여주기 */
function Partition({ title, groups, total, best = false, scale = 1 }) {
  return (
    <div style={{ padding: "10px 12px 8px", borderRadius: 12,
      background: best ? "#ecfdf5" : "#f8fafc",
      border: `2px solid ${best ? "#34d399" : "#e2e8f0"}` }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: best ? "#065f46" : "#475569", textAlign: "center", marginBottom: 8, wordBreak: "keep-all" }}>{title}</div>
      <RectStage groups={groups} scale={scale} />
      <div style={{ textAlign: "center", marginTop: 8, fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: best ? "#059669" : "#334155" }}>
        = {total}{best ? " ✓" : ""}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RectanglesSim — 빨강 4개 → 파랑(연속 구간)으로 나눠 면적 비교 → 최소 11.
   reds → rule(파랑 하나의 비용) → compare(A·B·C) → min(11).

   2026-09-10: 빨강 3개였을 때는 후보가 A·B 둘뿐이라 학생이 눈으로 골랐다.
   4개가 되면 자를 자리가 세 군데라 후보도 셋이고, **1등 11 과 2등 12 의 차이가 1** 이다.
   숫자를 안 세면 못 고른다 — 그게 다음 쪽에서 표를 만드는 이유가 된다.
   ═══════════════════════════════════════════════════════════════ */
export function RectanglesSim({ E }) {
  const steps = [{ kind: "reds" }, { kind: "rule" }, { kind: "compare" }, { kind: "min" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  /* 자를 자리가 세 군데 → 파랑 2개짜리 후보도 셋이다. 숫자는 전부 groupCost 가 낸다. */
  const A_groups = [[0], [1, 2, 3]];      // [①] + [②③④]  = 1 + 10 = 11 ← 최소
  const B_groups = [[0, 1], [2, 3]];      // [①②] + [③④]  = 6 + 6  = 12
  const C_groups = [[0, 1, 2], [3]];      // [①②③] + [④]  = 10 + 2 = 12
  const sum = (gs) => gs.reduce((a, g) => a + groupCost(g).area, 0);
  const aTotal = sum(A_groups), bTotal = sum(B_groups), cTotal = sum(C_groups);
  const allOne = groupCost([0, 1, 2, 3]).area;   // 파랑 하나로 다 덮기 = 12
  const best = Math.min(aTotal, bTotal, cTotal);
  const runnerUp = Math.min(bTotal, cTotal);

  const say =
    s.kind === "reds" ? t(E,
        <>Four red rectangles sit side by side on the x-axis: <b style={{ color: REDBD }}>① 1×1</b>, <b style={{ color: REDBD }}>② 2×2</b>, <b style={{ color: REDBD }}>③ 1×2</b>, <b style={{ color: REDBD }}>④ 2×1</b> (height × width).</>,
        <>빨강 사각형 4개가 x축에 나란히 붙어 있어요:<br /><b style={{ color: REDBD }}>① 1×1</b>, <b style={{ color: REDBD }}>② 2×2</b>, <b style={{ color: REDBD }}>③ 1×2</b>, <b style={{ color: REDBD }}>④ 2×1</b> (높이 × 폭).</>)
    : s.kind === "rule" ? t(E,
        <>One <b style={{ color: BLU }}>blue</b> covers a <b>contiguous group</b>. Its <b>width = sum of widths</b>, <b>height = max height</b>. One blue over all four → {MAX_H}×{TOTAL_W} = <b>{allOne}</b>. Can we do better by splitting?</>,
        <>파랑 하나는 <b>연속 구간</b>을 덮어요. <b>폭 = 폭의 합</b>, <b>높이 = 최고 높이</b>.<br />넷을 파랑 하나로 덮으면 {MAX_H}×{TOTAL_W} = <b>{allOne}</b>. 나누면 더 줄일 수 있을까요?</>)
    : s.kind === "compare" ? t(E,
        <>With <b>at most K=2</b> blues there are <b>three</b> places to cut.<br />
          <b>A</b>: [①]+[②③④] = <b>{aTotal}</b> · <b>B</b>: [①②]+[③④] = <b>{bTotal}</b> · <b>C</b>: [①②③]+[④] = <b>{cTotal}</b></>,
        <>(파랑 최대 K=2개니까) 자를 자리가 <b>세 군데</b>예요.<br />
          <b>A</b>: [①]+[②③④] = <b>{aTotal}</b> · <b>B</b>: [①②]+[③④] = <b>{bTotal}</b> · <b>C</b>: [①②③]+[④] = <b>{cTotal}</b></>)
    : t(E,
        <>The smallest is <b>{best}</b> — <b>[①]</b> = 1 and <b>[②③④]</b> = {MAX_H}×5 = 10.<br />
          Only <b>{runnerUp - best}</b> less than the next one — you can&apos;t eyeball this.</>,
        <>가장 작은 건 <b>{best}</b> — <b>[①]</b> = 1, <b>[②③④]</b> = {MAX_H}×5 = 10.<br />
          2등이랑 <b>{runnerUp - best} 차이</b>예요 — 눈대중으로는 못 골라요.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Split reds into contiguous groups", "빨강을 연속 구간으로 나누기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "min" ? "aha" : "go"}>{say}</Say>

      {s.kind === "reds" && (
        <>
          <RectStage groups={null} />
          <Caption color={REDBD}>{t(E, "① 1×1  ·  ② 2×2  ·  ③ 1×2  ·  ④ 2×1", "① 1×1  ·  ② 2×2  ·  ③ 1×2  ·  ④ 2×1")}</Caption>
        </>
      )}

      {s.kind === "rule" && (
        <>
          <RectStage groups={[[0, 1, 2, 3]]} />
          <Caption color={BLU}>{t(E, `one blue = height(max) × width(sum) = ${MAX_H}×${TOTAL_W} = ${allOne}`,
                                     `파랑 하나 = 최고높이 × 폭합 = ${MAX_H}×${TOTAL_W} = ${allOne}`)}</Caption>
        </>
      )}

      {/* 후보 셋을 나란히 — 모바일(375px)에서 두 개씩 접히게 scale 0.62 로 줄인다.
          셋이 다 보여야 "1등과 2등이 1 차이" 라는 말이 화면에서 확인된다. */}
      {s.kind === "compare" && (
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <Partition title="A · [①] + [②③④]" groups={A_groups} total={aTotal} scale={0.62} best />
          <Partition title="B · [①②] + [③④]" groups={B_groups} total={bTotal} scale={0.62} />
          <Partition title="C · [①②③] + [④]" groups={C_groups} total={cTotal} scale={0.62} />
        </div>
      )}

      {s.kind === "min" && (
        <>
          <RectStage groups={A_groups} />
          <Caption color="#059669">{t(E, `min total area = ${best} ✓`, `최소 총면적 = ${best} ✓`)}</Caption>
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
      {/* ①과 ③을 묶으려면 ②까지 딸려 들어간다 — 그 못난 파랑 하나만 그린다.
          ④ 는 이 이야기에 안 나오니 안 덮인 채로 둔다 (빨강 3개 때 ③ 을 그랬던 것과 같다). */}
      {(s.kind === "draw" || s.kind === "rule") && <RectStage groups={[[0, 1, 2]]} bad />}
      {s.kind === "so" && <RectStage groups={[[0, 1], [2, 3]]} />}

      {s.kind === "so" && (
        <Caption color="#059669">{t(E, "e.g. [①②] + [③④]  ·  never [①③] + [②④]", "예: [①②] + [③④]  ·  [①③] + [②④] 는 불가능")}</Caption>
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
  const N = REDS.length;                       // 4
  const K = 2;                                 // 이 예제에서 쓸 수 있는 파랑 최대 개수
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
  /* 2026-09-10 — 빨강이 3개에서 4개가 되면서 스텝이 14 → 19 가 됐다.
     22 까지 갈 수 있었는데 다섯을 덜어냈다. 어떻게 덜었나:

       · **답이 나오는 칸(앞 4개)만** try + tryadd 두 스텝으로 쪼갠다.
         try = 이 후보 구간이 얼마인가(그림을 본다) / tryadd = 앞부분을 표에서 꺼내 더한다(표를 본다).
         2026-09-07 에 모바일 때문에 쪼갠 것이다 — 한 스텝에 한 가지만 보게.
       · **중간 칸(앞 2개·앞 3개)은 tryadd 한 스텝**으로 간다.
         tryadd 말풍선이 이미 두 항을 다 말하고("마지막 파랑(②) 4 + 앞부분(①) 1 = 5")
         그림도 붙어 있어서, 거기서 try 를 따로 두면 같은 걸 두 번 보는 셈이다.
         중간 칸은 답을 만들지 않으니 이 정도 압축이 맞다고 봤다.

     ⚠️ K=2 라서 (파랑2, 앞2)·(파랑2, 앞3) 두 칸은 **아무도 안 읽는다.**
        답은 맨 오른쪽 칸에서 나오고, 그 칸은 파랑 1개 줄만 읽는다.
        건너뛰지는 않는다 — components.jsx 의 FULL_PY 가 kk·i 를 조건 없이 전부 돌기 때문에
        시뮬만 골라 채우면 학생이 다음 쪽에서 볼 코드와 어긋난다(pedagogy 판정).
        대신 그 칸에서 **아직 안 덮인 빨강이 있다**고 말해 다음 칸으로 넘긴다. */
  const steps = [
    { k: "intro" },
    ...Array.from({ length: N }, (_, z) => ({ k: "cell", kk: 1, i: z + 1 })),

    // 앞 2개 — 후보 하나(j=2)와, 성립하지 않는 후보 하나(j=1)
    { k: "tryadd", kk: 2, i: 2, j: 2 },
    /* j=1 후보(마지막 파랑이 ①② 를 다 맡는 경우)는 애초에 성립하지 않는다 —
       파랑이 2개인데 마지막 하나가 둘 다 덮으면 남은 하나가 덮을 게 없다(dp[1][0] = ∞).
       선생님(2026-09-10): "이게 뜬금없이 나온것같은. 이해가 안가"
       전엔 try 단계가 "그 파랑은 3 × 2 = 6 예요" 라고 **값을 먼저 계산하게 해놓고**,
       다음 단계에서야 "덮을 게 없어요 — 넘어가요" 라고 버렸다.
       한 스텝으로 합쳐서 묻는 그 자리에서 왜 안 되는지 답한다.
       아예 빼지는 않는다: "파랑을 다 쓰려면 앞에 남겨둘 게 있어야 한다" 는
       제약 자체가 이 문제의 규칙이라 한 번은 보여줄 값어치가 있다. */
    { k: "tryskip", kk: 2, i: 2, j: 1 },
    { k: "cell", kk: 2, i: 2 },

    // 앞 3개 — 후보 둘 (j=1 은 위에서 한 번 봤으니 다시 안 본다)
    { k: "tryadd", kk: 2, i: 3, j: 3 },
    { k: "tryadd", kk: 2, i: 3, j: 2 },
    { k: "cell", kk: 2, i: 3 },

    // 앞 4개 — **여기서 답이 나온다.** 후보 셋을 두 스텝씩 천천히.
    { k: "try", kk: 2, i: 4, j: 4 }, { k: "tryadd", kk: 2, i: 4, j: 4 },
    { k: "try", kk: 2, i: 4, j: 3 }, { k: "tryadd", kk: 2, i: 4, j: 3 },
    { k: "try", kk: 2, i: 4, j: 2 }, { k: "tryadd", kk: 2, i: 4, j: 2 },
    { k: "cell", kk: 2, i: 4 },

    { k: "answer" },
  ];
  /* 표의 가로·세로. **손으로 [0,1,2,3] 이라고 박아두지 마라** — 빨강을 하나 늘렸을 때
     표만 안 늘어나서 마지막 칸이 통째로 안 보이는 사고가 난다. N·K 에서 뽑는다. */
  const COLS = Array.from({ length: N + 1 }, (_, z) => z);
  const ROWS = Array.from({ length: K + 1 }, (_, z) => z);

  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  // 지금까지 확정된 칸
  const filled = new Set(["0,0"]);
  for (let z = 1; z <= ts.safe; z++) {
    const st = steps[z];
    if (st.k === "cell") filled.add(`${st.kk},${st.i}`);
  }

  /* 그 칸(kk, i)의 값을 만든 **실제 나눔**을 되짚는다. 그림으로 보여주려면 숫자가 아니라
     "어느 빨강들을 어떻게 묶었나" 가 필요하다. dp 를 거꾸로 따라간다. */
  const bestSplit = (kk, i) => {
    const out = [];
    let cur = i;
    for (let k = kk; k >= 1 && cur >= 1; k--) {
      let bj = cur;
      for (let j = cur; j >= 1; j--) {
        let sw = 0, mh = 0;
        for (let z = j; z <= cur; z++) { sw += REDS[z - 1].w; mh = Math.max(mh, REDS[z - 1].h); }
        if (dp[k - 1][j - 1] < INF && dp[k - 1][j - 1] + sw * mh === dp[k][cur]) { bj = j; break; }
      }
      out.unshift(Array.from({ length: cur - bj + 1 }, (_, z) => bj - 1 + z));
      cur = bj - 1;
    }
    return out;
  };

  const cost = (j, i) => {                     // j..i 를 파랑 하나로 덮는 값
    let sw = 0, mh = 0;
    for (let z = j; z <= i; z++) { sw += REDS[z - 1].w; mh = Math.max(mh, REDS[z - 1].h); }
    return { sw, mh, area: sw * mh };
  };

  const say = (() => {
    if (s.k === "intro") return t(E,
      <>We make a table. Rows = how many blues, columns = how many reds from the left.<br />
        A row means <b>exactly that many blues</b> — the problem allows <b>at most</b> K, so at the end we pick the smallest across rows.</>,
      <>표를 하나 만들어요. 세로는 <b>파랑 개수</b>, 가로는 <b>앞에서부터 빨강 개수</b>.<br />
        한 줄은 <b>파랑을 딱 그만큼 쓴 경우</b>예요 — 문제는 <b>최대</b> K개니까 맨 끝에 줄들 중 제일 작은 걸 고르면 돼요.</>);
    if (s.k === "cell" && s.kk === 1) {
      const c = cost(1, s.i);
      const names = REDS.slice(0, s.i).map((r) => r.label).join("");
      return t(E,
        <>One blue has to cover <b>{names}</b> all at once.<br />
          ({REDS.slice(0, s.i).map((r) => r.w).join(" + ")}) × {c.mh} = <b>{c.area}</b></>,
        <>파랑 <b>1개</b>로 <b>{names}</b> 를 통째로 덮어요.<br />
          ({REDS.slice(0, s.i).map((r) => r.w).join(" + ")}) × {c.mh} = <b>{c.area}</b></>);
    }
    if (s.k === "tryskip") {
      const c = cost(s.j, s.i);
      const names = REDS.slice(s.j - 1, s.i).map((r) => r.label).join("");
      return t(E,
        <>If the last blue took <b>{names}</b> — all of them — the other blue has nothing to cover.</>,
        <>마지막 파랑이 <b>{names}</b> 를 다 맡으면 남은 파랑이 덮을 게 없어요 — 안 돼요.</>);
    }
    if (s.k === "try" || s.k === "tryadd") {
      const c = cost(s.j, s.i);
      const front = dp[s.kk - 1][s.j - 1];
      const names = REDS.slice(s.j - 1, s.i).map((r) => r.label).join("");
      const frontNames = REDS.slice(0, s.j - 1).map((r) => r.label).join("") || "—";
      if (s.k === "try") return t(E,
        <>What if the last blue takes <b>{names}</b>?<br />
          That one costs {c.sw} × {c.mh} = <b>{c.area}</b>.</>,
        <>마지막 파랑이 <b>{names}</b> 를 맡으면요?<br />
          그 파랑은 {c.sw} × {c.mh} = <b>{c.area}</b> 예요.</>);
      if (front === INF) return t(E,
        <>Then the front (<b>{frontNames}</b>) has nothing left to cover — skip this one.</>,
        <>그럼 앞부분(<b>{frontNames}</b>)에 덮을 게 없어요 — 이건 넘어가요.</>);
      const total = front + c.area;
      const better = total === dp[s.kk][s.i];
      /* 2026-09-08 선생님: "여기 이해가 안가고" (6/15 화면)
         이 단계 말풍선이 "앞부분(①)은 1 을 꺼내 써요. 4 + 1 = 5" 였다.
         **4 가 어디서 왔는지 이 화면에 없다** — 바로 앞 단계에서 구한 값인데
         그 단계엔 그림이 있었고 이 단계엔 없어서 맥락이 끊겼다.
         어제 try/tryadd 로 쪼개면서 생긴 구멍이다. 두 항을 **둘 다 이름과 함께** 다시 말한다. */
      /* 2026-09-10: 세 줄이었다. 그림을 되돌리면서 두 줄로 줄였다 —
         모바일 여유가 744px 뿐인데(하단 고정 바 68px) 그림 + 세 줄이면 ▶ 버튼이 가린다.
         이름(①②)은 그대로 두되 "방금 구한 값이에요" 같은 말은 그림이 대신한다. */
      return t(E,
        <>Last blue (<b>{names}</b>) <b>{c.area}</b> + front (<b>{frontNames}</b>) <b>{front}</b> = <b>{total}</b>{better ? "" : <> — drop it</>}</>,
        <>마지막 파랑(<b>{names}</b>) <b>{c.area}</b> + 앞부분(<b>{frontNames}</b>) <b>{front}</b> = <b>{total}</b>{better ? "" : <> — 버려요</>}</>);
    }
    if (s.k === "cell") {
      /* 2026-09-10 선생님: "우리는 결국 파랑이 빨강을 다 덮는걸 고민해야하는데
         왜 파랑 두개로 1번, 2번을 덮는걸 생각해야하는거지? 그럼 빨강 3번은?"
         **맞는 지적이다.** K=2 인 이 예제에서 맨 오른쪽이 아닌 파랑2 칸들은 아무도 안 읽는다.
         그렇다고 건너뛸 수는 없다 — FULL_PY 가 kk·i 를 조건 없이 전부 돈다(pedagogy 판정).
         원래 이 스텝과 다음 스텝 사이에 연결어가 **하나도** 없었고, 그게 "뜬금없다" 의 원인이었다.

         ⚠️ 첫 시도는 "파랑 3개까지 쓸 수 있을 때 쓰는 칸이에요" 였다. **되돌렸다.**
            학생 에이전트: *"이 문제는 K=2인데 왜 갑자기 3개 얘기가 나오는지 몰랐다.
            도움이 안 되고 새 의문만 만들었다."* 사실이긴 해도 여기서 할 말이 아니다.
            지금은 선생님이 물으신 그대로 — **아직 안 덮인 빨강이 누구인지** 를 말하고 넘긴다. */
      const restNames = REDS.slice(s.i).map((r) => r.label).join("");
      const unfinished = s.kk >= 2 && s.i < N;
      return t(E,
        <>So (<b>{s.kk} blues</b>, <b>first {s.i}</b>) = <b>{dp[s.kk][s.i]}</b>.
          {unfinished && <><br />
            But <b>{restNames}</b> {s.i === N - 1 ? "is" : "are"} still uncovered — on to the next cell.</>}</>,
        <>그래서 (파랑 <b>{s.kk}개</b>, 앞 <b>{s.i}개</b>) 칸은 <b>{dp[s.kk][s.i]}</b> 이에요.
          {unfinished && <><br />
            그런데 <b>{restNames}</b> 가 아직 안 덮였죠 — 다음 칸으로 가요.</>}</>);
    }
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
    if (s.k === "tryadd" && kk === s.kk - 1 && i === s.j - 1) return "#ecfdf5";   // 꺼내 쓰는 앞부분
    return filled.has(`${kk},${i}`) ? "#fff" : "#f8fafc";
  };
  const cellBd = (kk, i) => {
    if (s.k !== "intro" && s.kk === kk && s.i === i) return A;
    if (s.k === "tryadd" && kk === s.kk - 1 && i === s.j - 1) return "#059669";
    return "#e2e8f0";
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Filling the table by hand", "표를 한 칸씩 채워보기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.k === "answer" ? "aha" : s.k === "try" ? "go" : "go"}>{say}</Say>

      {/* 후보 구간을 **그림으로도** 보여준다 (2026-09-07 선생님: "이거 이미지랑 같이 보여주면 어떨까?").
          이 시뮬을 만든 이유가 파일 위 주석에 적혀 있다 — "브루트포스까지는 ①②③ 그림으로 봤는데
          DP 는 갑자기 기호뿐이었다". 그런데 그 해결책에도 그림을 안 넣어서 같은 간극이 남아 있었다.
          말풍선이 "마지막 파랑이 ② 를 맡으면 2×2=4" 라고 하는데, 학생은 ② 의 모양을
          **세 쪽 전 다른 탭에서 본 것**을 기억에서 꺼내야 했다.

          try 단계에만 붙인다 — 후보 구간(j..i)이 매번 바뀌는 자리다.
          cell·intro·answer 단계는 그림이 안 바뀌거나 앞 시뮬과 겹쳐서 반복이 된다 (pedagogy 판정).

          처음엔 데스크탑에만 넣었다 — 모바일은 SimNav 아래 여백이 21px 뿐이라
          그림을 더 얹으면 버튼이 하단 고정 바 밑으로 내려갔다.
          선생님: "모바일도 스텝 쪼개서 그림 넣어줘." → 스텝을 둘로 쪼갰고(try / tryadd),
          이제 한 스텝에 한 가지만 있어서 **모바일에서도 그림이 나온다.** */}
      {/* 2026-09-10 선생님: "왜 시뮬레이션 이미지가 커졌다 작아졌다 하는거지?"
          내가 만든 문제다. 모바일에서 ▶ 버튼이 하단 바에 가리길래 **단계마다 다른 크기**로
          줄였다(1 · 0.48 · 0.6 네 가지). 버튼 위치만 재고 화면이 어떻게 보이는지는 안 봤다.
          선생님: "rectagle에서 QA랑 디자이너가 제대로 본건가? 이걸 왜 아무도 못보는거지?"
          — rectangles 는 아직 팀 검토 전인 19개 중 하나이고, 내 수정은 아무도 안 봤다.
          **모든 단계에서 같은 크기(0.55)를 쓴다.** 그러면 걸음마다 그림 높이가 안 변한다.
          0.55 를 고른 이유: 0.6 이상이면 라벨이 다시 그려지면서 윗여백 20px 이 붙어
          12/14 에서 버튼이 가린다(실측). 0.6 미만에서 라벨이 숨겨진다. */}
      {(s.k === "try" || s.k === "tryskip") && (
        <div style={{ marginTop: 12 }}>
          {/* tryskip 은 말풍선이 두 줄이라 그림을 줄여야 모바일에서 ▶ 가 안 가린다
              (실측: 하단 고정 바 68px, 여유선 744px). */}
          <RectStage scale={0.55}
            groups={[Array.from({ length: s.i - s.j + 1 }, (_, z) => s.j - 1 + z)]} />
        </div>
      )}

      {/* 2026-09-10 선생님(같은 자리 **세 번째** 지적):
          "여기에서 갑자기 이미지가 없어지니까 뭐가 뭔지 모르겠던데" (6/15 화면)

          try 단계엔 그림이 있고 tryadd 단계엔 없었다. 그런데 tryadd 말풍선은
          "마지막 파랑(②)은 4 … 앞부분(①)은 표에 적어둔 1" 이라고 **그림에 있던 이름**을 부른다.
          그림이 사라진 자리에서 ①②를 부르니 학생은 볼 것이 없다.

          9/7 에 모바일 여백(21px) 때문에 스텝을 try/tryadd 로 쪼갰고,
          9/8 엔 말풍선 문구만 더 자세히 고쳤다. **둘 다 그림을 안 되돌려서 같은 지적이 또 나왔다.**
          말로 다시 말해주는 걸로는 안 된다 — 볼 것이 있어야 한다.

          여기선 **두 항을 다 그린다**. 앞부분은 bestSplit 으로 표 값이 실제로 어떻게 나뉜
          것인지 되짚어 그리므로 지어낸 그림이 아니다. 그러면 "4 + 1 = 5" 가 화면에서 보인다.
          높이는 try 단계와 같다(그림 하나) — 모바일 여백 문제도 그대로다. */}
      {s.k === "tryadd" && (
        <div style={{ marginTop: 2 }}>
          {/* ⚠️ scale 0.8 — 그림 하나에 캡션까지 얹으니 모바일(375×812)에서 ▶ 버튼이
              화면 밖으로 밀렸다(bottom 859 > 812, 실측). 9/7 에 스텝을 쪼갠 이유가 바로 이거였다.
              그림을 줄이고 캡션을 한 줄로 눌러 다시 들어가게 했다. */}
          <RectStage scale={0.55} groups={[
            ...bestSplit(s.kk - 1, s.j - 1),
            Array.from({ length: s.i - s.j + 1 }, (_, z) => s.j - 1 + z),
          ]} />
          {/* 캡션을 넣었다가 뺐다 — 모바일에서 ▶ 버튼이 21px 밖으로 밀렸다(실측 833/812).
              말풍선이 이미 "마지막 파랑(②)" · "앞부분(①)" 이라고 부르고, 그림의 각 묶음에
              넓이가 붙어 있어(1, 4) 캡션 없이도 어느 게 어느 것인지 읽힌다. */}
        </div>
      )}

      {/* cell 단계에도 그림 — 2026-09-08 선생님(세 번째 같은 지적):
          "이거 할때 도대체 **어디의** 넓이를 구하는건지 모르겠어"
          말풍선은 "파랑 1개로 ①② 를 통째로 덮어요. (1+2)×2 = 6" 이라고 하는데
          화면엔 숫자 칸만 있었다. 어느 사각형을 덮는 얘기인지 볼 수가 없다.
          try 단계엔 어제 넣었는데 cell 단계는 빠져 있었다.
          ⚠️ 여긴 표도 같이 보여야 하는 자리라 **작게(scale 0.6)** 넣는다 —
             모바일에서 SimNav 가 하단 고정 바 밑으로 내려가지 않게. */}
      {s.k === "cell" && (
        <div style={{ marginTop: 8 }}>
          <RectStage scale={0.55} groups={
            s.kk === 1
              ? [Array.from({ length: s.i }, (_, z) => z)]          // 파랑 하나가 앞 i개를 통째로
              : bestSplit(s.kk, s.i)                                 // 그 칸을 만든 최선의 나눔
          } />
        </div>
      )}

      {/* try 단계(그림을 보는 단계)에서는 **모바일에서만** 표를 접는다.
          그 단계 말풍선은 표를 가리키지 않는다("마지막 파랑이 ②를 맡으면? 2×2=4") —
          앞부분을 표에서 꺼내는 얘기는 다음 tryadd 단계의 일이다.
          접지 않으면 모바일 375 에서 카드가 길어져 SimNav 가 하단 고정 바 밑으로 내려간다
          (실측: 접기 전 nav 770 · 바 744 → 눌리지 않았다). 데스크탑은 자리가 있어 같이 본다. */}
      {/* 2026-09-10: 위 여백을 14 → 8 로 줄였다. 빨강이 4개가 되면서 표가 한 칸 넓어졌고,
          `— 버려요` 가 붙는 tryadd 스텝 셋(10·13·15)에서 ▶ 버튼이 하단 고정 바를 **1px** 넘겼다.
          실측 도구는 `node check-sim-nav.mjs rectangles 11`. */}
      <div className={s.k === "try" ? "hidden md:block" : ""}
           style={{ maxWidth: 360, margin: "8px auto 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: `76px repeat(${N + 1}, 1fr)`, gap: 5 }}>
          <span />
          {COLS.map((i) => (
            <span key={i} style={{ textAlign: "center", fontSize: 10.5, fontWeight: 800, color: "#94a3b8" }}>
              {t(E, `first ${i}`, `앞 ${i}개`)}
            </span>
          ))}
          {ROWS.map((kk) => (
            <React.Fragment key={`row${kk}`}>
              <span style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 4 }}>
                {t(E, `${kk} blue`, `파랑 ${kk}개`)}
              </span>
              {COLS.map((i) => {
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

      {s.k === "tryadd" && (
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

/* ═══ ⑤ WhyTableSim — 느린 이유를 짚고, 그래서 표를 쓴다 ═══════════════
   왜 있나 (2026-09-07): 선생님
     "전부다 브루트포스하다보면 시간이 오래걸린다고 하는데 그럼 그거 때문에
      어떻게 하면 될까 먼저 포인트를 알았으면 하는데"

   그때 이 quest 의 흐름은 이랬다:
     11쪽 "답은 맞아요. 그런데 가짓수가…"  →  12쪽 "이름 붙이기 전에, 표를 채워봐요."
   **사이가 비어 있었다.** 느리다는 말 다음에 곧바로 표가 나오는데,
   표가 느림과 무슨 상관인지는 아무도 말해주지 않았다.
   moohunt 에는 이 자리가 있었다(FasterIdeaSim — "대부분이 헛수고예요").
   여기만 없었다.

   포인트는 **정답이 아니라 원인**이다: 완전탐색은 **같은 앞부분을 몇 번이고 다시 계산한다.**
   원인을 알면 "그럼 한 번 구한 건 적어두면 되겠네" 가 학생 머리에서 나온다.
   숫자는 전부 이 자리에서 계산한다 — 글과 어긋날 수 없다. */
export function WhyTableSim({ E }) {
  const steps = [{ k: "two" }, { k: "again" }, { k: "write" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  /* 자르는 방법 두 가지. 둘 다 "① 를 혼자 덮는다" 로 시작한다.
     ⚠️ 빨강 전부를 덮어야 한다 — 빨강이 4개가 됐을 때 ④ 를 빠뜨리면
        "각 빨강은 정확히 한 파랑 안" 이라는 문제의 규칙이 화면에서 깨진다. */
  const cutA = [[0], [1, 2, 3]];        // ① | ②③④
  const cutB = [[0], [1], [2, 3]];      // ① | ② | ③④
  const cost = (g) => groupCost(g).area;   // groupCost 는 {sw, mh, area} 를 준다
  const first = cost([0]);           // ① 혼자 = 1×1 = 1

  const say =
    s.k === "two" ? t(E,
      <>Two different cuttings. Look at how each one <b>starts</b>.<br />Both begin the same way: <b>① alone</b>.</>,
      <>자르는 방법 두 가지예요. 각각 <b>앞부분</b>을 봐요.<br />둘 다 똑같이 시작해요 — <b>① 혼자</b>.</>)
    : s.k === "again" ? t(E,
      <>Brute force tries them one at a time, from scratch.<br />So it works out <b>① alone = {first}</b> <b>twice</b> — once for each.<br />With more reds, the same beginnings come back again and again.</>,
      <>완전탐색은 하나씩 처음부터 다시 해봐요.<br />그래서 <b>① 혼자 = {first}</b> 을 <b>두 번</b> 따로 계산해요.<br />빨강이 많아지면 같은 앞부분이 몇 번이고 또 나와요.</>)
    : t(E,
      <>That is the waste — not the cutting, the <b>re-counting</b>.<br />So: once we work out an answer, <b>write it down</b>.<br />Next time the same beginning shows up, read it off instead.</>,
      <>낭비는 자르는 게 아니라 <b>다시 세는 것</b>이었어요.<br />그러니 한 번 구한 답은 <b>적어둬요.</b><br />다음에 같은 앞부분이 나오면 계산하지 말고 적어둔 걸 꺼내 써요.</>);

  const Cut = ({ groups, dim, mark }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center",
      padding: "8px 10px", borderRadius: 10,
      border: `${mark ? 2 : 1}px solid ${mark ? A : "#e2e8f0"}`,
      background: mark ? "#fff7ed" : "#fff" }}>
      {groups.map((g, gi) => (
        <span key={gi} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {gi > 0 && <span style={{ color: "#cbd5e1", fontWeight: 800 }}>|</span>}
          <span style={{
            display: "inline-flex", gap: 3, padding: "3px 7px", borderRadius: 8,
            background: gi === 0 && mark ? "#fed7aa" : BLUBG,
            outline: gi === 0 && mark ? `2px solid ${A}` : "none",
            opacity: dim && gi > 0 ? 0.35 : 1,
          }}>
            {g.map((i) => (
              <span key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
                fontSize: 13, color: REDBD }}>{REDS[i].label}</span>
            ))}
          </span>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#64748b" }}>{cost(g)}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div style={{ padding: 16, paddingBottom: 100 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why is it slow — really?", "왜 느린 걸까요? 진짜 이유")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.k === "again" ? "stuck" : s.k === "write" ? "aha" : "go"}>{say}</Say>

      <div style={{ maxWidth: 420, margin: "0 auto", display: "grid", gap: 8 }}>
        <Cut groups={cutA} dim={s.k !== "two"} mark={s.k !== "two"} />
        <Cut groups={cutB} dim={s.k !== "two"} mark={s.k !== "two"} />
      </div>

      {s.k !== "two" && (
        <div style={{ maxWidth: 420, margin: "12px auto 0", padding: "10px 14px", borderRadius: 10,
          background: s.k === "write" ? "#ecfdf5" : "#fef2f2",
          border: `1.5px solid ${s.k === "write" ? "#6ee7b7" : "#fca5a5"}`,
          fontSize: 12.5, fontWeight: 800, textAlign: "center",
          color: s.k === "write" ? "#065f46" : "#991b1b",
          wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.8 }}>
          {s.k === "again"
            ? t(E, <>“① alone = {first}” — worked out <b>twice</b></>,
                  <>“① 혼자 = {first}” 를 <b>두 번</b> 계산했어요</>)
            : t(E, <>Work it out <b>once</b>, write it down, reuse it</>,
                  <><b>한 번</b> 구하고, 적어두고, 꺼내 쓰기</>)}
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
      </div>
    </div>
  );
}
