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
      fontSize: 13.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.7 }}>
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
          /* c = 전개하면 늘 나오는 계수 2. 2026-09-10 ux: a 가 하필 2 라
             `2·1·2` 의 왼쪽 2(계수)와 오른쪽 2(담는 수)가 겹쳐 보였다. 색을 따로 준다. */
          : tone === "c"   ? { fg: "#64748b", bg: "#f1f5f9", bd: "#cbd5e1" }
          : { fg: "#9a3412", bg: "#fff7ed", bd: "#fdba74" };   // a = 지금 담는 수
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center",
      margin: "0 2px", verticalAlign: "middle" }}>
      <span style={{ padding: "1px 7px", borderRadius: 7, background: c.bg, border: `1.5px solid ${c.bd}`,
        color: c.fg, fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 14 }}>{v}</span>
      <span style={{ fontSize: 9, fontWeight: 800, color: c.fg, marginTop: 1, whiteSpace: "nowrap" }}>{lab}</span>
    </span>
  );
}

/* 부분집합 칩 — **무엇을 담았는지**(위)와 **그 합**(아래)을 같이 보여준다.

   2026-09-10 선생님: **"어느 순간 뭐가 담아서 계산된건지 모르겠던데"**
   전엔 합만 `0 1 2 3` 찍었다. 그러면 3 이 {1,2} 인지 {3} 인지 화면에 없다.
   실제로 셋을 다 담고 나면 합이 `0 1 2 3 3 4 5 6` 이라 **3 이 두 개**인데
   하나는 {1,2}, 하나는 {3} 이다. 화면만 봐서는 구별할 방법이 아예 없었다.

   위 원소 타일(사각형)과 안 헷갈리게 알약 모양은 유지한다. */
/* 2026-09-10 선생님: **"아까껏에 암것도 아니어서 0이었는데 2도 추가를 안하면 0이어야지"**

   라벨이 `1+2` 처럼 **더하기 식**이었다. 그런데 `{2}` 하나짜리는 `2` 라고만 찍혀서,
   그게 "없음에서 온 것" 이라는 게 안 보였다 — 첫 칩만 다른 규칙으로 읽히는 셈이다.
   `없음` + 2 는 `0+2` 여야 말이 되는데 라벨은 그냥 `2` 였다.

   → **담은 것을 집합으로 쓴다.** `{ }` `{1}` `{2}` `{1,2}`.
     그러면 위칩 `{ }` 아래 `{2}` 가 오고, **아까 것에 2 를 넣은 것**이 눈에 보인다.
     더하기 식이 아니니 계산으로 오해될 일도 없다. 새로 넣은 수만 색을 준다. */
function SumChip({ items, v, isNew = false, isEmpty = false, added = null }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <span style={{ fontSize: 10, fontWeight: 800, whiteSpace: "nowrap",
        fontFamily: "'JetBrains Mono',monospace",
        color: isEmpty ? "#cbd5e1" : "#94a3b8" }}>
        {"{"}
        {items.map((it, i) => (
          <span key={i} style={{ color: added != null && it === added && i === items.length - 1 ? PURDK : "inherit" }}>
            {i > 0 ? "," : ""}{it}
          </span>
        ))}
        {"}"}
      </span>
      <span style={{ minWidth: 26, textAlign: "center", padding: "3px 9px", borderRadius: 999,
        fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
        background: isEmpty ? "#f8fafc" : isNew ? PUR : PURBG,
        color: isEmpty ? "#94a3b8" : isNew ? "#fff" : PURDK,
        border: `1.5px solid ${isEmpty ? "#e2e8f0" : isNew ? PURDK : "#c4b5fd"}` }}>{v}</span>
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
          {/* 2026-09-10 — 캡션("합 5 → 5² = 25")을 뺐다.
              바로 위 말풍선이 이미 "부분집합 {2,3}: 합 = 5 → 5² = 25 → 누적 64" 라고 말한다.
              같은 말을 두 번 하면서 세로를 30px 먹었고, 그만큼 아래 목록이 잘렸다. */}
        </>
      )}

      {/* 2026-09-10 — 누적 합 박스를 **목록 위로** 올렸다.
          ux 실측: 모바일에서 걸음이 갈수록 시뮬 안쪽이 잘리는데(4단계 14px → 7단계 127px),
          잘리는 게 하필 **누적 합 박스**였다. 7단계에서는 방금 칠해진 활성 행까지 화면 밖이었다.
          잘릴 거면 지나간 목록이 잘려야지 답이 잘리면 안 된다 — 그래서 순서를 뒤집는다.
          (check-sim-nav.mjs 는 ▶ 버튼만 재서 이걸 못 잡았다. 도구도 같이 고쳤다.) */}
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


      {/* 누적 장부 — 7개 부분집합을 세로로, 지나온 것은 색칠 */}
      {/* 2026-09-10 — 줄 높이를 줄였다. 모바일에서 목록이 자라며 최대 127px 이 잘렸다.
          답(누적 합)은 위로 올렸으니 잘려도 치명적이진 않지만, 지나온 계산이 안 보이면
          "직접 세어봐요" 라는 미션 자체가 반쪽이 된다. */}
      <div style={{ maxWidth: 380, margin: "8px auto 0", display: "grid", gap: 2 }}>
        {/* 아직 안 나온 줄은 **그리지도 않는다** (2026-09-08).
            ① 미션이 "직접 세어봐요" 인데 안 지나온 값까지 자리를 차지하면 답을 미리 보여주는 셈이고,
            ② 그 빈 줄들이 세로를 다 먹어서 모바일에서 SimNav 가 하단 고정 바 밑으로 내려갔다.
            둘이 같은 원인이었다 — 한 번에 고친다. 한 줄만 앞서 보여줘서 "다음이 있다" 는 알린다. */}
        {rows.slice(0, Math.min(rows.length, shownCount + 1)).map((r, i) => {
          const passed = i < shownCount;
          const active = s.kind === "sub" && i === s.i;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "1px 11px", borderRadius: 8,
              background: active ? PUR : passed ? PURBG : "#f8fafc",
              border: `1.5px solid ${active ? PURDK : passed ? "#c4b5fd" : "#e2e8f0"}`,
              opacity: passed ? 1 : 0.4, transition: "all .15s" }}>
              <span style={{ flex: 1, fontSize: 11.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                color: active ? "#fff" : PURDK }}>{setStr(r.idxs)}</span>
              {/* 2026-09-08 — 안 지나온 줄은 값을 가린다.
                  미션이 "직접 세어봐요" 인데 7개 부분집합의 제곱값이 **처음부터 다 보였다.**
                  그러면 학생은 계산하는 게 아니라 확인만 하게 된다.
                  실제로 학생이 이 쪽을 난이도 1로 매기고 "아까 봤는데 또 나와요" 라고 했다. */}
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                color: active ? "#ede9fe" : passed ? "#7c3aed" : "#cbd5e1" }}>
                {passed || active ? `${r.sum}² = ${r.sq}` : "? ² = ?"}
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                color: active ? "#fff" : "#15803d", minWidth: 48, textAlign: "right" }}>
                {passed ? `→ ${r.run}` : ""}
              </span>
            </div>
          );
        })}
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
const EUL = (n) => ("136780".includes(String(n % 10)) ? "을" : "를");   // 일·삼·육·칠·팔·영 = 받침 있음

export function SumkBuildSim({ E }) {
  const arr = [1, 2, 3];

  /* 부분집합마다 **담은 것 목록**과 **그 합**을 같이 들고 있는다.
     합만 들고 있으면 화면에서 "뭘 담아서 나온 합인지" 를 보여줄 수가 없다
     (2026-09-10 선생님: "어느 순간 뭐가 담아서 계산된건지 모르겠던데"). */
  const stages = [];
  let subs = [{ items: [], sum: 0 }];               // 아무것도 안 담은 것 하나
  stages.push({ a: null, subs: subs.slice() });
  for (const a of arr) {
    subs = [...subs, ...subs.map((x) => ({ items: [...x.items, a], sum: x.sum + a }))];
    stages.push({ a, subs: subs.slice() });          // 안 담거나 / 담거나 → 딱 두 배
  }
  const ledger = (ss) => ({
    cnt: ss.length,
    s1: ss.reduce((p, x) => p + x.sum, 0),
    s2: ss.reduce((p, x) => p + x.sum * x.sum, 0),
  });

  if (process.env.NODE_ENV !== "production") {
    const last = ledger(stages[stages.length - 1].subs);
    if (last.s2 !== 100) console.error(`[sumk] 합²의 합이 ${last.s2} 다 — 3쪽 답 100 과 어긋난다`);
  }

  /* ═══ 걸음 목록 ═══════════════════════════════════════════════
     2026-09-10 재설계. 코드보다 이 목록을 먼저 짰다
     (memory/feedback_sim_design_needs_a_pass.md — 그전엔 내가 혼자 정하고 아무도 안 봤다).

     pedagogy 1순위였던 **결론 통보 재발**을 고치는 게 이 재설계의 핵심이다:
       전: 1걸음부터 장부 세 줄(개수·합·합²)을 다 띄웠다.
           왜 하필 그 셋인지는 8걸음 뒤에 나왔다 — 학생은 이유 없이 일곱 걸음을 봤다.
           선생님도 같은 걸 물으셨다: "왜 숫자가 세 개나?"
       후: **우리가 원하는 한 줄(합²의 합)만** 들고 시작한다.
           `expand` 에서 (1+2)² 를 펼치다 **"합²만으론 안 되네"** 를 만나고,
           `grow` 에서 나머지 두 줄이 **필요해서** 생긴다.

     그리고 `seven` 을 새로 넣었다 — 1·3쪽이 "비어있지 않은 부분집합 **7개**" 를 세 번 못박는데
     이 시뮬은 **8** 을 띄운다. 선생님·pedagogy·student 셋이 같은 자리를 짚었다.
     전엔 화면이 이 모순을 **언급조차 안 했다.**                            ═══ */
  const steps = [
    { k: "ask" },
    ...Array.from({ length: arr.length + 1 }, (_, z) => ({ k: "stage", i: z })),
    { k: "seven" },
    { k: "double" },
    { k: "expand" },
    { k: "grow" },
    { k: "rule1" },
    { k: "rule2" },
    { k: "name" },
    { k: "fast" },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const EX_STAGE = 1;                      // 1 만 담은 상태 = 갱신식의 "직전"
  const BACK = ["expand", "grow", "rule1", "rule2"];   // 이 걸음들은 "직전" 을 보여준다
  const stageIdx =
    s.k === "stage" ? s.i
    : s.k === "ask" ? 0
    : BACK.includes(s.k) ? EX_STAGE
    : stages.length - 1;
  const st = stages[stageIdx];
  const L = ledger(st.subs);
  const prev = stageIdx > 0 ? ledger(stages[stageIdx - 1].subs) : null;
  const ex = { old: ledger(stages[EX_STAGE].subs), oldSums: stages[EX_STAGE].subs.map((x) => x.sum),
               a: arr[EX_STAGE], now: ledger(stages[EX_STAGE + 1].subs) };
  const isBack = BACK.includes(s.k);
  /* 장부는 **자란다.** `grow` 전까지는 우리가 원하는 한 줄만 보여준다. */
  const threeRows = ["grow", "rule1", "rule2", "name", "fast"].includes(s.k);

  const say = (() => {
    if (s.k === "ask") return t(E,
      <>We listed all 7 subsets by hand. With N = 100,000 we can&apos;t.<br />
        Could the answer <b>grow</b> as we decide one number at a time?</>,
      <>아까는 부분집합 7개를 손으로 다 나열했죠. N 이 10만이면 못 해요.<br />
        숫자를 <b>하나씩 담을지 말지 정하면서</b> 답이 자라게 할 수는 없을까요?</>);
    if (s.k === "stage" && s.i === 0) return t(E,
      <>Choosing in-or-out for each number builds the subsets one at a time.<br />
        <b>We only want one number</b>: each sum squared, all added up.</>,
      <>숫자마다 <b>담을지 말지</b> 고르면 부분집합이 하나씩 만들어져요.<br />
        <b>우리가 원하는 건 한 줄뿐</b>이에요 — 각 합을 제곱해서 다 더한 것.</>);
    if (s.k === "stage") return t(E,
      <>Now <b>{st.a}</b>: each subset either <b>leaves it out</b> or <b>puts it in</b>.<br />
        Left out → the sum stays. Put in → the sum grows by <b>{st.a}</b>.</>,
      <>이제 <b>{st.a}</b>{EUL(st.a)} <b>담을지 말지</b> 골라요.<br />
        안 담으면 합은 그대로, 담으면 합이 <b>{st.a}</b> 만큼 커져요.</>);
    /* 2026-09-10 — 1·3쪽은 "비어있지 않은 부분집합 7개" 라고 세 번 못박는데
       여기 개수는 8 이다. 선생님·pedagogy·student 셋이 같은 자리를 짚었다.
       전엔 이 모순을 화면이 **언급조차 안 했고**, 해소는 두 쪽 뒤 코드에서야 한 줄 나왔다. */
    if (s.k === "seven") return t(E,
      <>Wait — page 1 said <b>7</b> subsets, but this says <b>{L.cnt}</b>.<br />
        The extra one is the empty pick. Its sum is 0, so it adds <b>0² = 0</b> —<br />
        the total is still the same <b>{L.s2}</b> we counted by hand.</>,
      <>어? 앞에서는 <b>7개</b>라고 했는데 여기는 <b>{L.cnt}개</b>네요.<br />
        하나 더 있는 건 <b>아무것도 안 담은 것</b>이에요. 합이 0 이라 <b>0² = 0</b> 만 보태요 —<br />
        그래서 합계는 손으로 세어 구한 <b>{L.s2}</b> 그대로예요.</>);
    if (s.k === "double") return t(E,
      <>Each number <b>doubles</b> the list — 100,000 numbers means 2¹⁰⁰⁰⁰⁰ subsets. We can never hold that.<br />
        But look: the bottom row is just the top row with <b>{arr[arr.length - 1]}</b> added. There is a rule.</>,
      <>숫자 하나마다 목록이 <b>두 배</b>예요 — 10만 개면 2¹⁰⁰⁰⁰⁰ 개. 이건 절대 못 들고 다녀요.<br />
        그런데 보세요, 아랫줄은 윗줄에 <b>{arr[arr.length - 1]}</b> 을 더한 것뿐이에요. <b>규칙이 있어요.</b></>);
    if (s.k === "expand") {
      /* 화면에 떠 있는 숫자만 쓴다 — 직전 합 하나(x)와 지금 담는 수(a).
         ⚠️ 2026-09-10 ux: 이 줄만 `Term` 이름표가 빠져 있었다. 하필 a = 2 라
         가운데 항 `2·1·2` 의 왼쪽 2(계수)와 오른쪽 2(담는 수)가 같은 숫자로 겹쳤다. */
      const x = ex.oldSums[ex.oldSums.length - 1], a = ex.a;
      return t(E,
        <>Back to just before <b>{a}</b> went in. Take one sum, <b>{x}</b>, and square it:<br />
          ( <Term v={x} lab="sum" tone="s1" /> + <Term v={a} lab="put in" tone="a" /> )² ={" "}
          <Term v={x} lab="sum" tone="s1" />² + <Term v={2} lab="always 2" tone="c" />·<Term v={x} lab="sum" tone="s1" />·<Term v={a} lab="put in" tone="a" /> + <Term v={a} lab="put in" tone="a" />² = <b>{(x + a) ** 2}</b><br />
          <b>The sum itself shows up.</b> Squares alone are not enough.</>,
        <><b>{a}</b> 를 담기 <b>직전</b>으로 돌아가요. 합 하나(<b>{x}</b>)를 제곱해봐요 —<br />
          ( <Term v={x} lab="합" tone="s1" /> + <Term v={a} lab="담는 수" tone="a" /> )² ={" "}
          <Term v={x} lab="합" tone="s1" />² + <Term v={2} lab="늘 2" tone="c" />·<Term v={x} lab="합" tone="s1" />·<Term v={a} lab="담는 수" tone="a" /> + <Term v={a} lab="담는 수" tone="a" />² = <b>{(x + a) ** 2}</b><br />
          <b>합이 튀어나왔어요.</b> 합²만 갖고는 안 되네요.</>);
    }
    if (s.k === "grow") return t(E,
      <>To add up all the <b>2·sum·{ex.a}</b> parts we need the <b>sum</b> row.<br />
        To add up all the <b>{ex.a}²</b> parts we need the <b>count</b> row.<br />
        So two more rows appear — <b>that is why there are three</b>.</>,
      <><b>2·합·{ex.a}</b> 를 다 더하려면 <b>합</b> 줄이 있어야 해요.<br />
        <b>{ex.a}²</b> 를 다 더하려면 <b>개수</b> 줄이 있어야 하고요.<br />
        그래서 두 줄이 더 생겨요 — <b>세 줄인 이유가 이거예요.</b></>);
    if (s.k === "rule1") return t(E,
      <><b>sum</b> row, with no list at all:<br />
        left out stays <Term v={ex.old.s1} lab="sum" tone="s1" />, put in gives{" "}
        <Term v={ex.old.s1} lab="sum" tone="s1" /> + <Term v={ex.a} lab="put in" tone="a" />×<Term v={ex.old.cnt} lab="count" /> = <b>{ex.old.s1 + ex.a * ex.old.cnt}</b><br />
        together = <b>{ex.now.s1}</b> ✓</>,
      <><b>합</b> 줄부터 — 목록 없이 구해져요.<br />
        안 담은 쪽은 <Term v={ex.old.s1} lab="합" tone="s1" /> 그대로, 담은 쪽은{" "}
        <Term v={ex.old.s1} lab="합" tone="s1" /> + <Term v={ex.a} lab="담는 수" tone="a" />×<Term v={ex.old.cnt} lab="개수" /> = <b>{ex.old.s1 + ex.a * ex.old.cnt}</b><br />
        둘을 합쳐 <b>{ex.now.s1}</b> ✓</>);
    if (s.k === "rule2") return t(E,
      <><b>squares</b> row — every piece is a row we already have:<br />
        <Term v={ex.old.s2} lab="sum²" tone="s2" /> + ( <Term v={ex.old.s2} lab="sum²" tone="s2" /> + <Term v={2} lab="always 2" tone="c" />·<Term v={ex.a} lab="put in" tone="a" />·<Term v={ex.old.s1} lab="sum" tone="s1" /> + <Term v={ex.a} lab="put in" tone="a" />²·<Term v={ex.old.cnt} lab="count" /> )<br />
        = <b>{ex.now.s2}</b> ✓</>,
      <><b>합²</b> 줄 — 조각이 전부 우리가 이미 가진 줄이에요.<br />
        <Term v={ex.old.s2} lab="합²" tone="s2" /> + ( <Term v={ex.old.s2} lab="합²" tone="s2" /> + <Term v={2} lab="늘 2" tone="c" />·<Term v={ex.a} lab="담는 수" tone="a" />·<Term v={ex.old.s1} lab="합" tone="s1" /> + <Term v={ex.a} lab="담는 수" tone="a" />²·<Term v={ex.old.cnt} lab="개수" /> )<br />
        = <b>{ex.now.s2}</b> ✓</>);
    if (s.k === "name") return t(E,
      <>We never listed a single subset — three numbers were enough.<br />
        Their names: <b>P[0]</b>, <b>P[1]</b>, <b>P[2]</b>. The answer is <b>P[2]</b> = <b>{L.s2}</b>.</>,
      <>부분집합을 한 번도 안 나열했어요 — 숫자 세 개면 됐어요.<br />
        이 셋의 이름이 <b>P[0]</b>, <b>P[1]</b>, <b>P[2]</b> 예요. 답은 <b>P[2]</b> = <b>{L.s2}</b>.</>);
    /* 2026-09-10 auditor: "30만 번" 은 과소평가였다. 세 줄을 O(1) 로 친 것인데
       실제로는 (t, j) 쌍마다 곱셈이 든다 — K=2 면 6쌍 × 10만 = 60만.
       그리고 "0.4초" 는 K=3 실측치인데 앞 문장은 K=2 얘기였다. K 를 밝힌다.
       (K=2 는 0.29초, K=3 은 0.42~0.45초. 내가 이 quest 의 py 코드로 직접 쟀다.) */
    return t(E,
      <><b>So why is this fast?</b> Throw the list away — only the three rows matter.<br />
        100,000 numbers = <b>300,000</b> cells to fix, about <b>600,000</b> multiplications.
        Not 2¹⁰⁰⁰⁰⁰.<br />
        Run for real on 100,000 numbers with K = 3: about <b>0.4 seconds</b>.</>,
      <><b>그래서 왜 빠른가요?</b> 목록은 버려요 — 세 줄만 있으면 되니까요.<br />
        10만 개면 고칠 칸이 <b>30만</b>, 곱셈이 <b>60만 번</b>쯤이에요. 2¹⁰⁰⁰⁰⁰ 이 아니라요.<br />
        실제로 10만 개를 K = 3 으로 돌리면 <b>0.4초</b> 만에 끝나요.</>);
  })();

  const LedgerBox = () => {
    const sq = st.subs.map((x) => `${x.sum}²`).join("+");
    const pl = st.subs.map((x) => x.sum).join("+");
    const all = [
      { lab: t(E, "how many subsets", "부분집합 개수"), name: "P[0]", v: L.cnt, p: prev && prev.cnt, ex: null },
      { lab: t(E, "each sum, added up", "각 합을 더한 것"), name: "P[1]", v: L.s1, p: prev && prev.s1, ex: pl },
      { lab: t(E, "each sum SQUARED, added up", "각 합을 제곱해서 더한 것"), name: "P[2]", v: L.s2, p: prev && prev.s2, ex: sq },
    ];
    /* 장부는 자란다 — `grow` 전까지는 우리가 원하는 한 줄만. */
    const rowsOut = threeRows ? all : [all[2]];
    return (
      <div style={{ maxWidth: 360, margin: "12px auto 0", display: "grid", gap: 4 }}>
        {rowsOut.map((r, i) => {
          const changed = s.k === "stage" && stageIdx > 0 && r.p !== r.v;
          const isAnswer = r.name === "P[2]" && ["seven", "name", "fast"].includes(s.k);
          const justAppeared = s.k === "grow" && r.name !== "P[2]";
          return (
            <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 9,
              background: isAnswer ? "#ecfdf5" : justAppeared ? PURBG : changed ? PURBG : "#f8fafc",
              border: `1.5px solid ${isAnswer ? "#6ee7b7" : justAppeared ? PUR : changed ? PUR : "#e2e8f0"}` }}>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: "#475569", wordBreak: "keep-all" }}>
                {isBack && <b style={{ color: PUR }}>{t(E, "old ", "직전 ")}</b>}{r.lab}
                {justAppeared && <b style={{ color: PUR }}>{t(E, "  ← new", "  ← 새로 생김")}</b>}
                {r.ex && (
                  <span style={{ display: "block", fontSize: 9.5, fontWeight: 700, color: "#94a3b8",
                    fontFamily: "'JetBrains Mono',monospace", marginTop: 1, wordBreak: "break-all" }}>
                    {r.ex}
                  </span>
                )}
              </span>
              {s.k === "name" || s.k === "fast" ? (
                <span style={{ fontSize: 11.5, fontWeight: 800, color: PUR, fontFamily: "'JetBrains Mono',monospace" }}>
                  {r.name}
                </span>
              ) : null}
              <span style={{ minWidth: 46, textAlign: "right", fontSize: 15, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace", color: isAnswer ? "#15803d" : changed || justAppeared ? PURDK : "#1f2937" }}>
                {r.v}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    /* maxHeightCss — SimShell 기본값 340px 로는 모자라 400 으로 재서 맞췄다.
       ⚠️ 그래도 모바일에서는 안쪽이 잘린다. 그래서 **장부(답)를 칩 목록 위에** 둔다 —
          잘릴 거면 지나간 목록이 잘려야지 답이 잘리면 안 된다.
          도구: `node check-sim-nav.mjs sumk` (▶ 뿐 아니라 **안쪽 잘림도** 잰다). */
    <SimShell idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels
      maxHeightCss="calc(100dvh - 400px)">
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Grow the answer without listing", "나열하지 않고 답 키우기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.k === "seven" || s.k === "expand" ? "stuck" : s.k === "grow" || s.k === "name" || s.k === "fast" ? "aha" : "go"}>{say}</Say>

      <LedgerBox />

      {(s.k === "ask" || s.k === "stage") && (
        <>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8", textAlign: "center", margin: "12px 0 5px" }}>
            {t(E, "the numbers we choose from", "골라 담을 숫자들")}
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

      {/* 칩 — 담은 것(위) + 합(아래). 한 줄이 아니라 **안 담음 / 담음 두 줄**로 가른다.
          선생님(2026-09-10): "위에서는 2를 얘기하다가 갑자기 왜 3?" — 3 이 {1,2} 라는 걸
          화면이 말한 적이 없었다. 이제 칩 위에 `1+2` 가 적힌다. */}
      {/* `fast` 에서는 칩을 **안 그린다.** 전엔 회색으로 되살렸는데,
          8~12걸음에 없다가 13에서 다시 나타나는 게 이상했고 그것 때문에 57px 이 잘렸다.
          "목록은 버려요" 는 말풍선과 **장부만 남은 화면**이 이미 말한다. */}
      {(s.k === "stage" || s.k === "seven" || s.k === "double") && (
        <div style={{ maxWidth: 420, margin: "12px auto 0" }}>
          {stageIdx === 0 ? (
            <>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6 }}>
                {t(E, "sums of every subset so far", "지금까지 부분집합들의 합")}
              </div>
              <Row><SumChip items={[]} v={0} isEmpty /></Row>
            </>
          ) : (
            <>
              {/* 2026-09-10 선생님: **"2를 안담는다는건 2만 빼고 다 있다는건가?"**
                  아니다 — 그 줄은 **2 가 안 들어간 부분집합들**이고 지금은 {} 와 {1} 둘이다.
                  내 라벨("2 안 담음")이 **한 부분집합을 설명하는 말**처럼 읽혔다.
                  두 줄이 "아까 목록 그대로 / 아까 목록에 2 를 넣은 것" 이라는 걸 라벨이 직접 말한다. */}
              <div style={{ fontSize: 10.5, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 7, wordBreak: "keep-all" }}>
                {t(E, `every subset so far — each one either leaves ${st.a} out or puts it in`,
                     `지금까지 만든 부분집합 — 하나하나가 ${st.a}${EUL(st.a)} 안 담거나 담거나`)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ minWidth: 104, fontSize: 10.5, fontWeight: 800, color: "#64748b", textAlign: "right", wordBreak: "keep-all", lineHeight: 1.35 }}>
                  {t(E, `${st.a} left out`, `${st.a} 안 담음`)}
                  <span style={{ display: "block", fontWeight: 700, color: "#94a3b8", fontSize: 9.5 }}>
                    {t(E, "= same as before", "= 아까 것 그대로")}
                  </span>
                </span>
                <span style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {stages[stageIdx - 1].subs.map((x, i) => (
                    <SumChip key={i} items={x.items} v={x.sum} isEmpty={x.items.length === 0} />
                  ))}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ minWidth: 104, fontSize: 10.5, fontWeight: 800, color: PURDK, textAlign: "right", wordBreak: "keep-all", lineHeight: 1.35 }}>
                  {t(E, `${st.a} put in`, `${st.a} 담음`)}
                  <span style={{ display: "block", fontWeight: 700, color: "#a78bfa", fontSize: 9.5 }}>
                    {t(E, `= before, plus ${st.a}`, `= 아까 것에 ${st.a} 추가`)}
                  </span>
                </span>
                <span style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {stages[stageIdx - 1].subs.map((x, i) => (
                    <SumChip key={i} items={[...x.items, st.a]} v={x.sum + st.a} isNew added={st.a} />
                  ))}
                </span>
              </div>
            </>
          )}
          {s.k === "double" && (
            <Caption color={PURDK}>
              {t(E, "one number → the list doubles", "숫자 하나에 목록이 두 배")}
            </Caption>
          )}
        </div>
      )}
    </SimShell>
  );
}
