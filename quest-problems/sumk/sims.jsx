// Sum^K (MCC 2023 P6) 용 시뮬 — components.jsx 는 건드리지 않고 여기에만
// (cowsplits / chipxchg / photoshoot25 와 같은 방식).
//
// 원칙 (quest_problem_standard + pain_points):
//   · 학생이 주인공 — 학생 목소리(해요체), 관찰 → 추론
//   · 시뮬로 개념: 작은 예 {1,2,3} 의 7개 부분집합을 직접 세며 (합)^K 누적
//   · Tile/Say/Row/Caption 은 cowsplits/sims.jsx 에서 그대로 가져옴

import { t } from "@/components/quest/theme";
import { useTraceStep, SimShell, StepHeader } from "@/components/quest/TraceStepper";

/* 2026-09-10 — 이 파일의 시뮬 둘은 `SimShell` 을 쓴다. 저장소에서 printseq 다음으로 두 번째다.
   왜 바꿨나: ux 가 좌표로 재보니 **SumkSim 의 ▶ 가 4단계부터 9단계까지 전부**
   모바일 하단 고정 바(top 744) 밑으로 내려가 있었다 — 최대 119px.
   전엔 `paddingBottom: 110` 으로 막아뒀는데, 걸음이 진행되며 누적 표가 한 줄씩 자라
   그 여유분을 도로 잡아먹었다. **고정 숫자로 막으면 내용이 자라는 순간 다시 터진다.**

   `SimShell` (components/quest/TraceStepper.tsx:181) 은 이걸 위해 이미 만들어져 있었다 —
   내용은 화면 높이에 맞춰 안에서 스크롤되고 ▶ 는 항상 밖에 남는다.
   그런데 시뮬이 있는 quest 27개 중 **printseq 하나만** 쓰고 있었다. */

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

/* 식 안의 숫자 하나 — 밑에 **어느 장부 줄에서 온 것인지** 이름표를 붙인다.
   2026-09-10 학생: "공식 속 숫자 하나하나가 저 상자 중 뭘 가져온 건지 라벨이 없어서
   직접 대조해야 알 수 있다. 여기서 멈춰서 손으로 다시 계산해보고 나서야 넘어갔다."
   특히 `1 + ( 1 + 2·2·1 + 2²·2 )` 에서 **2 가 세 가지 다른 뜻**으로 나온다 —
   넣는 수 2, 옛 개수 2, 그냥 계수 2. 색과 이름표로 가른다. */
function Term({ v, lab, tone = "cnt" }) {
  const c = tone === "cnt" ? { fg: "#5b21b6", bg: "#f5f3ff", bd: "#c4b5fd" }
          : tone === "s1"  ? { fg: "#1e40af", bg: "#eff6ff", bd: "#93c5fd" }
          : tone === "s2"  ? { fg: "#065f46", bg: "#ecfdf5", bd: "#6ee7b7" }
          : { fg: "#9a3412", bg: "#fff7ed", bd: "#fdba74" };   // a = 지금 넣는 수
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center",
      margin: "0 2px", verticalAlign: "middle" }}>
      <span style={{ padding: "1px 7px", borderRadius: 7, background: c.bg, border: `1.5px solid ${c.bd}`,
        color: c.fg, fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 14 }}>{v}</span>
      <span style={{ fontSize: 9, fontWeight: 800, color: c.fg, marginTop: 1, whiteSpace: "nowrap" }}>{lab}</span>
    </span>
  );
}

/* 부분집합의 **합** 칩. 위쪽 원소 타일(사각형)과 헷갈리지 않게 **동그란 알약 모양**으로 만든다.
   넣는 쪽은 `1+2` 처럼 어디서 나온 값인지 밑에 붙인다 —
   선생님(2026-09-10): "위에서는 2를 얘기하다가 갑자기 왜 3?" 이 그 자리다. */
function SumChip({ v, from = null, isNew = false }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <span style={{ minWidth: 26, textAlign: "center", padding: "3px 9px", borderRadius: 999,
        fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
        background: isNew ? PUR : PURBG, color: isNew ? "#fff" : PURDK,
        border: `1.5px solid ${isNew ? PURDK : "#c4b5fd"}` }}>{v}</span>
      {from && (
        <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", marginTop: 1,
          fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{from}</span>
      )}
    </span>
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
    /* 여기 원래 `paddingBottom: 110` 이 있었다 — 모바일에서 ▶ 가 하단 고정 바에 가리길래
       여백을 손으로 준 것이다. 그런데 아래 누적 표가 걸음마다 한 줄씩 자라서
       그 여유분을 도로 먹었고, 4~9단계가 다시 가려졌다(2026-09-10 재발, 최대 119px).
       고정 숫자로는 못 막는다 → SimShell 로 옮겼다. 파일 위 주석 참고. */
    /* maxHeightCss — SimShell 기본값은 `calc(100dvh - 340px)` 인데 이 quest 는 그걸로 부족했다.
       실측: 기본값으로도 5~9단계가 모바일 하단 바를 46px 넘겼다(전엔 119px 넘겼다).
       이 쪽은 카드 위에 제목·파란 바가 더 있어서 340 이 모자란다. 400 으로 재서 맞췄다.
       도구 = `node check-sim-nav.mjs sumk 2` / `sumk 4`. */
    <SimShell idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels
        maxHeightCss="calc(100dvh - 400px)">
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
      <div style={{ maxWidth: 380, margin: "10px auto 0", display: "grid", gap: 3 }}>
        {/* 아직 안 나온 줄은 **그리지도 않는다** (2026-09-08).
            ① 미션이 "직접 세어봐요" 인데 안 지나온 값까지 자리를 차지하면 답을 미리 보여주는 셈이고,
            ② 그 빈 줄들이 세로를 다 먹어서 모바일에서 SimNav 가 하단 고정 바 밑으로 내려갔다.
            둘이 같은 원인이었다 — 한 번에 고친다. 한 줄만 앞서 보여줘서 "다음이 있다" 는 알린다. */}
        {rows.slice(0, Math.min(rows.length, shownCount + 1)).map((r, i) => {
          const passed = i < shownCount;
          const active = s.kind === "sub" && i === s.i;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 12px", borderRadius: 8,
              background: active ? PUR : passed ? PURBG : "#f8fafc",
              border: `1.5px solid ${active ? PURDK : passed ? "#c4b5fd" : "#e2e8f0"}`,
              opacity: passed ? 1 : 0.4, transition: "all .15s" }}>
              <span style={{ flex: 1, fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                color: active ? "#fff" : PURDK }}>{setStr(r.idxs)}</span>
              {/* 2026-09-08 — 안 지나온 줄은 값을 가린다.
                  미션이 "직접 세어봐요" 인데 7개 부분집합의 제곱값이 **처음부터 다 보였다.**
                  그러면 학생은 계산하는 게 아니라 확인만 하게 된다.
                  실제로 학생이 이 쪽을 난이도 1로 매기고 "아까 봤는데 또 나와요" 라고 했다. */}
              <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                color: active ? "#ede9fe" : passed ? "#7c3aed" : "#cbd5e1" }}>
                {passed || active ? `${r.sum}² = ${r.sq}` : "? ² = ?"}
              </span>
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

    </SimShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SumkBuildSim — [빠진 다리] 나열하지 않고 답이 자라는 걸 보여준다.

   왜 만들었나 (2026-09-10, 팀 넷이 같은 자리를 짚었다):
     · pedagogy: "3쪽 시뮬은 **부분집합을 통째로 나열**하고, 4쪽은 **원소를 하나씩 넣는다** —
       순회 방식 자체가 다른데 둘이 같은 100 을 낸다는 걸 잇는 문장이 없다."
     · student(초6): **4쪽에서 그만뒀다.** "(옛합 + a)ᵗ 를 이항정리로 펼치면 을 읽는 순간
       뭔 소린지 몰라서 눈으로만 흘려보고 넘겼다. 5쪽 코드는 읽는 척만 했다."
       "4쪽부터는 그림이 하나도 없다."
     · quest-auditor: 이항정리·이항계수·파스칼이 **정의 없이 이름만** 쓰인다.
       `count-quests.py --list untaught` 에 sumk 가 [조합론] 으로 걸린다 —
       레슨·algo 토픽 어디에도 없는 개념이다.

   설계 (project-lead 판정: "이항정리 없이 먼저, 유도는 그 다음"):
     · 이름을 마지막에 붙인다 — 내내 **개수 · 합의 합 · 합²의 합** 이라고 부르고,
       맨 끝에서야 "이 셋을 P[0]·P[1]·P[2] 라고 불러요" 로 잇는다
       (feedback_first_concept_scaffolding.md — 이름은 나중에).
     · 이항정리도 이름을 먼저 대지 않는다. **(2+3)² 를 손으로 펼쳐** 보이고,
       그게 갱신식의 세 항이 되는 걸 눈으로 확인한 뒤에 이름을 준다.
     · 숫자는 전부 이 파일에서 그 자리에 계산한다. 브루트와 대조까지 여기서 한다 —
       화면 숫자가 틀릴 수 없게.

   검산 (2026-09-10, 브루트 대조 완료):
     시작 [1,0,0] → 1 넣고 [2,1,1] → 2 넣고 [4,6,14] → 3 넣고 [8,24,100]
     마지막 100 이 3쪽에서 손으로 구한 그 100 이다. 그게 이 시뮬의 전부다.
   ═══════════════════════════════════════════════════════════════ */
/* 숫자 뒤 조사 — 한국어는 **숫자를 읽은 소리**의 받침으로 정해진다.
   1(일)·3(삼)·6(육)·7(칠)·8(팔)·0(영) → 을 / 2(이)·4(사)·5(오)·9(구) → 를.
   "2 을 넣어요" 로 나오던 것을 고쳤다. */
const EUL = (n) => ("1368 0".includes(String(n % 10)) ? "을" : "를");

export function SumkBuildSim({ E }) {
  const arr = [1, 2, 3];

  /* 숫자를 하나씩 넣어가며 **모든 부분집합의 합**을 실제로 만든다.
     장부 세 줄(개수 · 합의 합 · 합²의 합)은 그 합들에서 바로 나온다. */
  const stages = [];
  let sums = [0];                                   // 아무것도 안 넣었을 때 = 공집합 하나
  stages.push({ a: null, sums: sums.slice() });
  for (const a of arr) {
    sums = [...sums, ...sums.map((x) => x + a)];     // 빼거나 / 넣거나 → 딱 두 배
    stages.push({ a, sums: sums.slice() });
  }
  const ledger = (ss) => ({
    cnt: ss.length,
    s1: ss.reduce((p, x) => p + x, 0),
    s2: ss.reduce((p, x) => p + x * x, 0),
  });

  if (process.env.NODE_ENV !== "production") {
    const last = ledger(stages[stages.length - 1].sums);
    if (last.s2 !== 100) console.error(`[sumk] 합²의 합이 ${last.s2} 다 — 3쪽 답 100 과 어긋난다`);
  }

  const steps = [
    { k: "ask" },
    { k: "stage", i: 0 }, { k: "stage", i: 1 }, { k: "stage", i: 2 }, { k: "stage", i: 3 },
    { k: "same" },
    { k: "double" },
    { k: "rule1" },
    { k: "expand" },
    { k: "rule2" },
    { k: "name" },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  /* 갱신식을 숫자로 말하는 세 걸음(rule1·expand·rule2)은 "**2 를 넣던 순간**" 이야기다.
     그런데 장부가 마지막 상태(8·24·100)를 보여주고 있었다 —
     말풍선은 "옛것 1 + (1 + 2×2) = 6" 이라는데 화면 장부엔 24 가 떠 있는 셈이다.
     선생님이 rectangles 에서 세 번 하신 지적과 같은 병이다: "**어디의** 값인지 모르겠어."
     그 걸음들에선 장부를 **1 까지만 넣은 상태**(옛것)로 되돌린다. 말풍선이 부르는 그 숫자다. */
  const EX_STAGE = 1;                      // 1 만 넣은 상태 = 갱신식의 "옛것"
  const stageIdx =
    s.k === "stage" ? s.i
    : s.k === "ask" ? 0
    : (s.k === "rule1" || s.k === "expand" || s.k === "rule2") ? EX_STAGE
    : stages.length - 1;
  const st = stages[stageIdx];
  const L = ledger(st.sums);
  const prev = stageIdx > 0 ? ledger(stages[stageIdx - 1].sums) : null;

  /* 갱신식을 **숫자로** 보여줄 때 쓰는 값 — 2 를 넣던 순간을 예로 든다.
     (그 자리에서 계산하니 위 stages 와 어긋날 수 없다) */
  const ex = { old: ledger(stages[EX_STAGE].sums), oldSums: stages[EX_STAGE].sums,
               a: arr[EX_STAGE], now: ledger(stages[EX_STAGE + 1].sums) };

  const say = (() => {
    if (s.k === "ask") return t(E,
      <>We listed all 7 subsets by hand. With N = 100,000 we can&apos;t.<br />
        Could the answer <b>grow</b> as we drop the numbers in one at a time?</>,
      <>아까는 부분집합 7개를 손으로 다 나열했죠. N 이 10만이면 못 해요.<br />
        숫자를 <b>하나씩 넣으면서</b> 답이 자라게 할 수는 없을까요?</>);
    if (s.k === "stage" && s.i === 0) return t(E,
      <>Nothing in yet. There is exactly one subset — the <b>empty</b> one, sum <b>0</b>.<br />
        We keep three numbers about it. That&apos;s all we carry.</>,
      <>아직 아무것도 안 넣었어요. 부분집합은 <b>공집합</b> 하나, 합은 <b>0</b>.<br />
        이것에 대해 <b>숫자 세 개</b>만 적어둬요. 우리가 들고 다닐 건 이게 전부예요.</>);
    if (s.k === "stage") return t(E,
      <>Drop in <b>{st.a}</b>. Every old subset either <b>skips</b> it or <b>takes</b> it —<br />
        so the sums are the old ones, plus the old ones with <b>{st.a}</b> added.</>,
      <><b>{st.a}</b>{EUL(st.a)} 넣어요. 옛 부분집합마다 이걸 <b>빼거나</b> <b>넣거나</b> —<br />
        그래서 합은 옛 합들 그대로, 그리고 옛 합에 <b>{st.a}</b>{EUL(st.a)} 더한 것들이에요.</>);
    if (s.k === "same") return t(E,
      <>Look at the last line — <b>{L.s2}</b>.<br />
        That is the answer we counted by hand on the page before.</>,
      <>맨 아랫줄을 봐요 — <b>{L.s2}</b>.<br />
        앞 쪽에서 손으로 세어 구한 그 답이에요.</>);
    if (s.k === "double") return t(E,
      <>But we still listed every subset. Here is the way out:<br />
        dropping in <b>a</b> always just <b>doubles</b> the list — old ones, and old ones + a.</>,
      <>그런데 아직은 부분집합을 다 나열했어요. 여기서 빠져나가는 길이 있어요 —<br />
        <b>a</b> 를 넣으면 목록은 언제나 <b>딱 두 배</b>예요. 옛것들, 그리고 옛것들 + a.</>);
    if (s.k === "rule1") return t(E,
      <>Back up to just before we dropped in <b>{ex.a}</b> — the box below is that moment.<br />
        <b>skip</b> side stays: <Term v={ex.old.s1} lab="sum" tone="s1" /><br />
        <b>take</b> side: every old sum gains {ex.a} →{" "}
        <Term v={ex.old.s1} lab="sum" tone="s1" /> + <Term v={ex.a} lab="new" tone="a" />×<Term v={ex.old.cnt} lab="count" /> = <b>{ex.old.s1 + ex.a * ex.old.cnt}</b><br />
        together = <b>{ex.now.s1}</b> ✓ — no list needed</>,
      <><b>{ex.a}</b> 를 넣기 <b>직전</b>으로 되돌아가 볼게요 — 아래 상자가 그 순간이에요.<br />
        <b>빼는 쪽</b>은 그대로: <Term v={ex.old.s1} lab="합" tone="s1" /><br />
        <b>넣는 쪽</b>은 옛 합마다 {ex.a} 씩 늘어요 →{" "}
        <Term v={ex.old.s1} lab="합" tone="s1" /> + <Term v={ex.a} lab="넣는 수" tone="a" />×<Term v={ex.old.cnt} lab="개수" /> = <b>{ex.old.s1 + ex.a * ex.old.cnt}</b><br />
        둘을 합쳐 <b>{ex.now.s1}</b> ✓ — 목록이 필요 없어요</>);
    if (s.k === "expand") {
      /* 2026-09-10 — 처음엔 (2+3)² 로 펼쳐 보였는데, 3 은 지금 넣는 숫자가 아니라
         화면 어디에도 없는 값이었다. **화면에 떠 있는 숫자만 쓴다** —
         옛 합 중 하나(x)와 지금 넣는 수(a)로 편다. 그래야 다음 걸음의 세 항과 눈으로 이어진다. */
      const x = ex.oldSums[ex.oldSums.length - 1], a = ex.a;
      return t(E,
        <>What about the <b>sum of squares</b>? Take one old sum, <b>{x}</b>, and expand by hand:<br />
          ( <b>{x}</b> + <b>{a}</b> )² = {x}² + 2·{x}·{a} + {a}² = {x * x} + {2 * x * a} + {a * a} = <b>{(x + a) ** 2}</b></>,
        <><b>합²의 합</b>은요? 옛 합 하나(<b>{x}</b>)를 골라 손으로 펼쳐봐요 —<br />
          ( <b>{x}</b> + <b>{a}</b> )² = {x}² + 2·{x}·{a} + {a}² = {x * x} + {2 * x * a} + {a * a} = <b>{(x + a) ** 2}</b></>);
    }
    if (s.k === "rule2") return t(E,
      <>Every old sum breaks up the same way — and each piece is a row we already keep:<br />
        <b>skip</b>: <Term v={ex.old.s2} lab="sum²" tone="s2" /><br />
        <b>take</b>: <Term v={ex.old.s2} lab="sum²" tone="s2" /> + 2·<Term v={ex.a} lab="new" tone="a" />·<Term v={ex.old.s1} lab="sum" tone="s1" /> + <Term v={ex.a} lab="new" tone="a" />²·<Term v={ex.old.cnt} lab="count" /> = <b>{ex.now.s2 - ex.old.s2}</b><br />
        together = <b>{ex.now.s2}</b> ✓</>,
      <>옛 합 하나하나가 다 그렇게 갈라져요 — 그 조각들이 전부 우리가 가진 줄이에요.<br />
        <b>빼는 쪽</b>: <Term v={ex.old.s2} lab="합²" tone="s2" /><br />
        <b>넣는 쪽</b>: <Term v={ex.old.s2} lab="합²" tone="s2" /> + 2·<Term v={ex.a} lab="넣는 수" tone="a" />·<Term v={ex.old.s1} lab="합" tone="s1" /> + <Term v={ex.a} lab="넣는 수" tone="a" />²·<Term v={ex.old.cnt} lab="개수" /> = <b>{ex.now.s2 - ex.old.s2}</b><br />
        둘을 합쳐 <b>{ex.now.s2}</b> ✓</>);
    return t(E,
      <>We never listed a single subset — three numbers were enough.<br />
        Their names: <b>P[0]</b>, <b>P[1]</b>, <b>P[2]</b>. And splitting (x+a)² like that is the <b>binomial theorem</b>.</>,
      <>부분집합을 한 번도 안 나열했어요 — 숫자 세 개면 됐어요.<br />
        이 셋의 이름이 <b>P[0]</b>, <b>P[1]</b>, <b>P[2]</b> 예요. 그리고 (x+a)² 를 저렇게 가르는 걸 <b>이항정리</b>라고 해요.</>);
  })();

  const LedgerBox = () => {
    /* 2026-09-10 선생님: **"결국 저건 모든 합의 제곱이라는건가?"**
       내 라벨이 애매해서 그렇게 읽혔다. 아니다 —
         각 합을 **제곱해서** 다 더한 것 = 1²+2²+3²+3²+4²+5²+6² = 100  ← 이게 답
         모든 합을 더한 뒤 제곱          = 24²                  = 576  ← 이건 아님
       이름을 고치고, **식 자체를 옆에 같이 보여준다.** 식이 있으면 오해할 수가 없다. */
    const sq = st.sums.map((v) => `${v}²`).join("+");
    const pl = st.sums.join("+");
    const rowsOut = [
      { lab: t(E, "how many subsets", "부분집합 개수"), name: "P[0]", v: L.cnt, p: prev && prev.cnt,
        ex: null },
      { lab: t(E, "each sum, added up", "각 합을 더한 것"), name: "P[1]", v: L.s1, p: prev && prev.s1,
        ex: pl },
      { lab: t(E, "each sum SQUARED, added up", "각 합을 제곱해서 더한 것"), name: "P[2]", v: L.s2, p: prev && prev.s2,
        ex: sq },
    ];
    return (
      <div style={{ maxWidth: 360, margin: "12px auto 0", display: "grid", gap: 4 }}>
        {rowsOut.map((r, i) => {
          const changed = s.k === "stage" && stageIdx > 0 && r.p !== r.v;
          const isAnswer = i === 2 && (s.k === "same" || s.k === "name");
          const isOld = s.k === "rule1" || s.k === "expand" || s.k === "rule2";
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 9,
              background: isAnswer ? "#ecfdf5" : changed ? PURBG : "#f8fafc",
              border: `1.5px solid ${isAnswer ? "#6ee7b7" : changed ? PUR : "#e2e8f0"}` }}>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: "#475569", wordBreak: "keep-all" }}>
                {isOld && <b style={{ color: PUR }}>{t(E, "old ", "옛것 ")}</b>}{r.lab}
                {/* 식을 옆에 같이 — "각 합을 제곱해서 더한 것" 이 무슨 뜻인지 글이 아니라 식이 말한다.
                    합이 여덟 개까지 늘어나므로 모바일에서 줄이 넘치지 않게 작게 쓴다. */}
                {r.ex && (
                  <span style={{ display: "block", fontSize: 9.5, fontWeight: 700, color: "#94a3b8",
                    fontFamily: "'JetBrains Mono',monospace", marginTop: 1, wordBreak: "break-all" }}>
                    {r.ex}
                  </span>
                )}
                {isOld && i === 0 && (
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: PUR, marginLeft: 6, whiteSpace: "nowrap" }}>
                    {t(E, `← just before ${ex.a} went in`, `← ${ex.a} 넣기 직전`)}
                  </span>
                )}
              </span>
              {/* 이름은 맨 마지막 걸음에서만 붙인다 — 그전엔 우리말로만 부른다 */}
              {s.k === "name" && (
                <span style={{ fontSize: 11.5, fontWeight: 800, color: PUR, fontFamily: "'JetBrains Mono',monospace" }}>
                  {r.name}
                </span>
              )}
              <span style={{ minWidth: 46, textAlign: "right", fontSize: 15, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace", color: isAnswer ? "#15803d" : changed ? PURDK : "#1f2937" }}>
                {r.v}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    /* maxHeightCss — SimShell 기본값은 `calc(100dvh - 340px)` 인데 이 quest 는 그걸로 부족했다.
       실측: 기본값으로도 5~9단계가 모바일 하단 바를 46px 넘겼다(전엔 119px 넘겼다).
       이 쪽은 카드 위에 제목·파란 바가 더 있어서 340 이 모자란다. 400 으로 재서 맞췄다.
       도구 = `node check-sim-nav.mjs sumk 2` / `sumk 4`. */
    <SimShell idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels
        maxHeightCss="calc(100dvh - 400px)">
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Grow the answer without listing", "나열하지 않고 답 키우기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.k === "same" || s.k === "name" ? "aha" : s.k === "ask" || s.k === "double" ? "stuck" : "go"}>{say}</Say>

      {/* 어느 숫자까지 넣었나 */}
      {(s.k === "ask" || s.k === "stage") && (
        <>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8", textAlign: "center", marginBottom: 5 }}>
          {t(E, "the numbers we drop in", "넣을 숫자들")}
        </div>
        <Row>
          {arr.map((v, i) => {
            const inYet = i < stageIdx;
            const justNow = s.k === "stage" && i === stageIdx - 1;
            return <Tile key={i} ch={v} size={44}
              bg={justNow ? PUR : inYet ? PURBG : "#fff"} bd={inYet || justNow ? PUR : "#e2e8f0"}
              fg={justNow ? "#fff" : inYet ? PURDK : "#cbd5e1"} faded={!inYet && !justNow} />;
          })}
        </Row>
        </>
      )}

      {/* 지금까지 만들어진 부분집합들의 **합**.

          2026-09-10 선생님: **"위에서는 2를 얘기하다가 갑자기 왜 3?"**
          전엔 합들을 `0 1 2 3` 한 줄로 늘어놨다. 그런데 바로 위 타일도 `1 2 3` 이라
          **같은 3 이 한 화면에 두 뜻으로** 있었다 — 타일 3 은 아직 안 넣은 숫자,
          칩 3 은 {1,2} 의 합. 모양도 비슷해서 구별이 안 됐다.
          학생 에이전트는 이걸 못 잡았다. 선생님이 화면을 보고 바로 잡으셨다.

          고침: 한 줄을 **빼는 쪽 / 넣는 쪽 두 줄**로 가르고,
          넣는 쪽은 `1+2=3` 처럼 **어디서 나온 숫자인지 식으로** 보여준다.
          이건 이 시뮬이 내내 하는 이야기(빼거나 넣거나)와도 같은 모양이다. */}
      {(s.k === "stage" || s.k === "same" || s.k === "double") && (
        <div style={{ maxWidth: 420, margin: "12px auto 0" }}>
          {stageIdx === 0 ? (
            <>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6 }}>
                {t(E, "sums of every subset so far", "지금까지 부분집합들의 합")}
              </div>
              <Row><SumChip v={0} /></Row>
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ minWidth: 96, fontSize: 10.5, fontWeight: 800, color: "#64748b", textAlign: "right", wordBreak: "keep-all" }}>
                  {t(E, `skip ${st.a}`, `${st.a} 빼는 쪽`)}
                </span>
                <span style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {stages[stageIdx - 1].sums.map((v, i) => <SumChip key={i} v={v} />)}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ minWidth: 96, fontSize: 10.5, fontWeight: 800, color: PURDK, textAlign: "right", wordBreak: "keep-all" }}>
                  {t(E, `take ${st.a}`, `${st.a} 넣는 쪽`)}
                </span>
                <span style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {stages[stageIdx - 1].sums.map((v, i) => (
                    <SumChip key={i} v={v + st.a} from={`${v}+${st.a}`} isNew />
                  ))}
                </span>
              </div>
            </>
          )}
          {s.k === "double" && (
            <Caption color={PURDK}>
              {t(E, "one number in → the list doubles", "숫자 하나 넣으면 → 목록이 두 배")}
            </Caption>
          )}
        </div>
      )}

      <LedgerBox />
    </SimShell>
  );
}
