// COW Splits (Dec 2025 Bronze #2) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
// 건드리지 않고 여기에만 (photoshoot25 / checkups 와 같은 방식).
//
// 원칙 (quest_problem_standard + pain_points):
//   · 학생이 주인공 — 학생 목소리로("어떻게 지우지?", "오 되네!", "어쩌지?")
//   · 관찰 → 추론 — 핵심 알고리즘(글자별로 모으면 사각)을 *발견*시킴, 통보 X
//   · 흐름: 이해 → 뭘 지울 수 있나 → 한 방(운 좋으면) → 막힘 → 핵심 발견 → 실행

import { t } from "@/components/quest/theme";
import { StepFade } from "@/components/quest/StepFade";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#059669";
const OPCOL = { 1: "#ef4444", 2: "#f59e0b", 3: "#8b5cf6" };   // C / O / W
const OPBG  = { 1: "#fef2f2", 2: "#fffbeb", 3: "#f5f3ff" };

function Tile({ ch, size = 42, bg = "#fff", bd = "#e2e8f0", fg = "#1f2937", faded = false, badge = null }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center",
      justifyContent: "center", borderRadius: 9, background: bg, border: `2px solid ${bd}`,
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: size * 0.5, color: fg,
      opacity: faded ? 0.3 : 1, transition: "all .15s" }}>
      {ch}
      {badge != null && (
        <span style={{ position: "absolute", top: -9, right: -8, minWidth: 17, height: 17, borderRadius: 999,
          background: OPCOL[badge], color: "#fff", fontSize: 11, fontWeight: 800, display: "flex",
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
    <div style={{ maxWidth: 470, margin: "6px auto 14px", padding: "11px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
      fontSize: 13.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.75 }}>
      {children}
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, flexWrap: "wrap" }}>{children}</div>;
}

/* 재사용 pair visual — 두 블록 나란히, 겹치는 2 글자 초록, 남는 1 글자 보라. */
function PairOverlapVisual({ E, aBlock, bBlock, aOvIdx, bOvIdx, aLoIdx, bLoIdx, overlapStr, loLetter, aLabelEn, aLabelKo, bLabelEn, bLabelKo }) {
  const OV = "#059669", OV_BG = "#ecfdf5";
  const LO = "#8b5cf6", LO_BG = "#f5f3ff";
  const idle = { bd: "#cbd5e1", bg: "#fff" };
  const cell = (isOv, isLo) => isOv
    ? { bd: OV, bg: OV_BG }
    : isLo ? { bd: LO, bg: LO_BG } : idle;
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, marginBottom: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {aBlock.map((ch, i) => {
              const c = cell(aOvIdx.includes(i), i === aLoIdx);
              return <Tile key={i} ch={ch} size={44} bd={c.bd} bg={c.bg} fg="#1f2937" />;
            })}
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, color: OV }}>{t(E, aLabelEn, aLabelKo)}</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: OV }}>=</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {bBlock.map((ch, i) => {
              const c = cell(bOvIdx.includes(i), i === bLoIdx);
              return <Tile key={i} ch={ch} size={44} bd={c.bd} bg={c.bg} fg="#1f2937" />;
            })}
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, color: OV }}>{t(E, bLabelEn, bLabelKo)}</div>
        </div>
      </div>
      <Caption color={OV}>
        {overlapStr} {t(E, "overlaps ✓", "겹침 ✓")}  ·  <span style={{ color: LO }}>{loLetter}·{loLetter} {t(E, "leftover — same letter ✓", "남음 — 같은 글자 ✓")}</span>
      </Caption>
    </>
  );
}
/* 블록은 COW·OWC·WCO 셋뿐 — 이 사실을 '쓰는' 화면마다 위에 띠로 깔아둔다.
   선생님 2026-09-02: "세가지밖에 없어서 가능한건데 … 강조를 해야지."
   글로 또 적는 대신 그림으로 상시 노출 (글자 수도 안 늘어남). */
const ALL_BLOCKS = ["COW", "OWC", "WCO"];
function BlockLegend({ E, active = [] }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 9,
      flexWrap: "wrap", margin: "0 0 12px" }}>
      <span style={{ fontSize: 10.5, fontWeight: 800, color: "#92400e", whiteSpace: "nowrap" }}>
        🔑 {t(E, "blocks: only these 3", "블록은 이 셋뿐")}
      </span>
      {ALL_BLOCKS.map((b) => {
        const on = active.includes(b);
        return (
          <span key={b} style={{ display: "inline-flex", gap: 1.5, padding: 3, borderRadius: 7,
            background: on ? "#fffbeb" : "transparent",
            border: `1.5px ${on ? "solid" : "dashed"} ${on ? "#f59e0b" : "#e2e8f0"}`,
            opacity: active.length === 0 || on ? 1 : 0.38, transition: "all .15s" }}>
            {b.split("").map((ch, i) => (
              <span key={i} style={{ width: 17, height: 20, display: "flex", alignItems: "center",
                justifyContent: "center", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace",
                fontWeight: 800, fontSize: 11, color: on ? "#92400e" : "#94a3b8",
                background: on ? "#fff" : "#f8fafc" }}>{ch}</span>
            ))}
          </span>
        );
      })}
    </div>
  );
}

function Caption({ color, children }) {
  return <div style={{ textAlign: "center", marginTop: 13, fontSize: 13.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace" }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   EraseRuleSim — [뭘 지울 수 있나] 학생이 규칙을 직접 발견.
   같은 덩어리 두 번(Y+Y) + 떨어진 것도 골라도 됨.
   ═══════════════════════════════════════════════════════════════ */
export function EraseRuleSim({ E }) {
  const steps = [
    { kind: "intro" },
    { kind: "pickC" },    // 떨어진 C 두 개 (C·C)
    { kind: "poofC" },    // C 사라짐 → OWOW
    { kind: "pickOW" },   // 남은 OW + OW
    { kind: "poofOW" },   // 다 사라짐 → 빈 문자열 (2번에 싹)
    { kind: "one" },      // S 가 COWCOW 였다면 — 그 자체가 '똑같은 게 두 번'
    { kind: "poof1" },    // 1번에 싹 → "그럼 3번이 필요한 S 는?" 이 다음 페이지로
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  /* 뒤 두 단계는 다른 S 로 — M=1 인 경우를 학생이 한 번은 봐야 함 */
  const isOneCase = s.kind === "one" || s.kind === "poof1";
  const SSTR = isOneCase ? "COWCOW" : "COWOWC";
  const S = SSTR.split("");

  const goneC   = s.kind === "poofC" || s.kind === "pickOW" || s.kind === "poofOW";
  const goneAll = s.kind === "poofOW" || s.kind === "poof1";
  const isGone  = (i) => goneAll || (goneC && (i === 0 || i === 5));
  const pick    = s.kind === "pickC" ? [0, 5] : s.kind === "pickOW" ? [1, 2, 3, 4]
                : s.kind === "one" ? [0, 1, 2, 3, 4, 5] : [];
  const pickCol = s.kind === "pickC" ? OPCOL[2] : OPCOL[1];   // C=주황, OW=빨강 (뒤 출력 라벨과 같은 색)

  const say =
    s.kind === "intro" ? t(E,
        <>One move can wipe <b>several letters at once</b> — as long as the picked letters read as <b>the same block twice</b> (like C·C or OW·OW). They don't even need to be next to each other!</>,
        <>한 번에 <b>여러 글자</b>를 없앨 수 있어요.<br />고른 글자가 <b>앞뒤가 똑같은 덩어리</b>면 돼요 — C·C, OW·OW 처럼.<br />떨어져 있어도 괜찮아요!</>)
    : s.kind === "pickC" ? t(E,
        <>Pick the two far-apart <b>C</b>'s → <b>C·C</b> = "C twice" ✓ &nbsp;<span style={{ color: "#94a3b8" }}>(C·O·W — all different — would NOT count ✗)</span></>,
        <>떨어진 <b>C</b> 두 개를 골라요 → <b>C·C</b> = C 뒤에 또 C ✓<br /><span style={{ color: "#94a3b8" }}>(C·O·W 처럼 다 다르면 안 돼요 ✗)</span></>)
    : s.kind === "poofC" ? t(E,
        <>Both C's vanish <b>in that one move</b> — together! What's left is <b>OWOW</b>.</>,
        <>그 <b>한 번</b>에 C 두 개가 <b>같이</b> 사라져요! 남은 건 <b>OWOW</b>.</>)
    : s.kind === "pickOW" ? t(E,
        <>Now the leftover <b>OWOW</b> = <b>OW·OW</b> = "OW twice" ✓ — one more move clears it.</>,
        <>이제 남은 <b>OWOW</b> = <b>OW·OW</b> — 앞뒤가 똑같죠 ✓ 한 번 더 지우면 끝.</>)
    : s.kind === "poofOW" ? t(E,
        <>Empty! <b>2 moves</b> cleared the whole thing.</>,
        <>싹 비었어요! <b>2번</b>에 다 지웠죠.</>)
    : s.kind === "one" ? t(E,
        <>But what if S were <b>COWCOW</b>? Front half <b>COW</b> = back half <b>COW</b> — the whole string is already <b>the same block twice</b>.</>,
        <>그런데 S 가 <b>COWCOW</b> 였다면요?<br />앞 절반 <b>COW</b> = 뒤 절반 <b>COW</b> — 전체가 이미 <b>앞뒤가 똑같아요</b>.</>)
    : t(E,
        <><b>1 move</b> and it's gone! So the answer can be <b>1 or 2</b>… but is there an S that needs <b>3 or more</b>? 🤔</>,
        <><b>1번</b>에 끝! 그럼 답은 <b>1번 아니면 2번</b>인데… <b>3번 이상</b>이 필요한 S 는 없을까요? 🤔</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "What can I wipe in one move?", "한 번에 뭘 지울 수 있지?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.kind === "poof1" ? "stuck" : (s.kind === "poofC" || s.kind === "poofOW") ? "aha" : "go"}>{say}</Say>

      <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>
        S = {SSTR}
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap", minHeight: 56 }}>
        {S.map((ch, i) => {
          const gone = isGone(i);
          const lit = pick.includes(i);
          return (
            <div key={i} style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 10, fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 24, transition: "all .15s",
              background: gone ? "transparent" : lit ? pickCol : "#fff",
              border: gone ? "2px dashed #cbd5e1" : `2px solid ${lit ? pickCol : "#e2e8f0"}`,
              color: gone ? "transparent" : lit ? "#fff" : "#1f2937" }}>
              {gone ? "" : ch}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: 12, minHeight: 20, fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
        color: s.kind === "pickC" ? OPCOL[2] : s.kind === "pickOW" ? OPCOL[1] : "#059669" }}>
        {s.kind === "pickC" ? "C · C  ✓"
          : s.kind === "pickOW" ? "OW · OW  ✓"
          : s.kind === "poofC" ? t(E, "left over → OWOW", "남은 글자 → OWOW")
          : s.kind === "poofOW" ? t(E, "empty in 2 moves ✓", "2번에 빈 문자열 ✓")
          : s.kind === "one" ? t(E, "COW · COW ✓ — one move", "COW · COW ✓ — 한 번이면 돼요")
          : s.kind === "poof1" ? t(E, "empty in 1 move ✓", "1번에 빈 문자열 ✓")
          : ""}
      </div>
      </StepFade>

      {/* 시뮬 내용과 ◀▶ 버튼 사이 숨 — 없으면 마지막 카드에 버튼이 붙어 보임
          (선생님 2026-08-30 "뭔가 겹쳐"). checkups·buymilk 도 같은 방식. */}
      <div style={{ height: 16 }} />
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   InsightSim — [핵심 발견] M=2 트릭.
   앞쪽 블록 i 와 뒤쪽 파트너 블록 (i + N/2) 을 짝지어 봐요.
   {COW, OWC, WCO} 어느 두 블록도 2 글자가 겹쳐요.
   → 겹치는 2 글자는 op 1, 겹치지 않는 1 글자씩은 op 2. M=2!
   (그리고 N 홀수면 3N 홀수 → 짝수 지우기로 못 비움 → -1)
   ═══════════════════════════════════════════════════════════════ */
export function InsightSim({ E }) {
  /* 선생님 2026-08-29 검토: "짝지어 봐요" 가 이유 없이 주어졌고(핵심인데),
     N=2 세 쌍만 보고 "언제나 M=2" 로 일반화하고 있었음.
     → 앞에 why(짝을 그렇게 짓는 이유), 뒤에 many(쌍이 여러 개여도 되는 이유) 추가.
     −1(홀수)은 다른 질문이라 이 시뮬에서 빼고 앞 페이지로 분리. */
  const steps = [
    { kind: "why" },         // 1번이 Y+Y 로 읽히려면 앞·뒤에서 고른 게 같아야 한다
    { kind: "halves" },      // 그래서 반으로 잘라 대봤더니 — 안 맞네? (이야기의 전환점)
    { kind: "pair" },
    { kind: "overlap" },     // Case 1/3: COW × OWC — 겹침 OW, 남음 C·C
    { kind: "case2" },       // Case 2/3: COW × WCO — 겹침 CO, 남음 W·W
    { kind: "case3" },       // Case 3/3: OWC × WCO — 겹침 WC, 남음 O·O + 요약
    { kind: "split" },
    { kind: "many" },        // N=4 로 쌍 2개 — 앞 절반 COOW = 뒤 절반 COOW (검증됨)
    { kind: "whypair" },     // 왜 하필 i ↔ i+N/2 냐 — 뒤집어 짝지으면 순서가 어긋남
    { kind: "uneven" },      // N=6 · 같은 쌍이 섞임 → 조각 길이가 2,2,3 으로 달라짐
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  // 샘플 N=2: 앞 블록 COW + 뒤 블록 OWC
  const A_BLOCK = ["C", "O", "W"];
  const B_BLOCK = ["O", "W", "C"];
  // COW vs OWC: a[1:]="OW" == b[:2]="OW" → 겹치는 2 글자는 OW.
  //  겹치지 않는 1 글자: a[0]="C", b[2]="C". 둘 다 C — 같은 글자! → op 2.
  //  op 1 은 a[1], a[2], b[0], b[1] = O, W, O, W.

  const say =
    s.kind === "why" ? t(E,
      <>One move works only if the picked letters read as <b>Y + Y</b>.<br />So let's cut S down the middle and compare the halves.</>,
      <>한 번에 지우려면 고른 글자가 <b>Y + Y</b> 로 읽혀야 해요.<br />그럼 S 를 반으로 잘라서 대보면 되겠네요.</>)
    : s.kind === "halves" ? t(E,
      <>Cut it: front <b>COW</b>, back <b>OWC</b> — they don't match.<br />Not a dead end though. Where exactly do they disagree?</>,
      <>잘라봐요: 앞은 <b>COW</b>, 뒤는 <b>OWC</b> — 안 맞네요.<br />막힌 건 아니에요. 어디가 어긋난 걸까요?</>)
    : s.kind === "pair" ? t(E,
      <><b>Same position against same position</b> — front block <b>i</b> vs back block <b>i + N/2</b>.<br />Only 3 kinds of block, so we can check <b>every possible pair</b>.</>,
      <><b>같은 자리끼리</b> 대봐요 — 앞 블록 <b>i</b> 와 뒤 블록 <b>i + N/2</b>.<br />블록이 셋뿐이라 <b>가능한 짝을 전부</b> 볼 수 있어요.</>)
    : s.kind === "overlap" ? t(E,
      <><b>Case 1 / 3.</b> <b>COW × OWC</b> — the middle "<b>OW</b>" appears in both. Leftover: <b>C</b> on front + <b>C</b> on back (same letter).</>,
      <><b>1 / 3.</b> <b>COW × OWC</b> — 가운데 <b>OW</b> 가 양쪽에 다 있어요.<br />남는 건 앞 <b>C</b> + 뒤 <b>C</b> — 같은 글자예요.</>)
    : s.kind === "case2" ? t(E,
      <><b>Case 2 / 3.</b> <b>COW × WCO</b> — this time "<b>CO</b>" overlaps (front's start = back's end). Leftover: <b>W</b> · <b>W</b> — same letter again!</>,
      <><b>2 / 3.</b> <b>COW × WCO</b> — 이번엔 <b>CO</b> 가 겹쳐요 (앞의 시작 = 뒤의 끝).<br />남는 건 <b>W · W</b> — 이번에도 같은 글자!</>)
    : s.kind === "case3" ? t(E,
      <><b>Case 3 / 3.</b> The last pair: <b>OWC × WCO</b>.</>,
      <><b>3 / 3.</b> 마지막 쌍이에요: <b>OWC × WCO</b>.</>)
    : s.kind === "many" ? t(E,
      <>One pair is done. What if there are <b>many</b>?<br />N=4 here, so two pairs — split each one the same way.</>,
      <>한 쌍은 됐어요. 쌍이 <b>여러 개</b>면요?<br />여기 N=4 라 쌍이 둘 — 쌍마다 똑같이 나누면 돼요.</>)
    : s.kind === "whypair" ? t(E,
      <>Wait — why pair <b>0 with 2</b>? Why not <b>0 with 3</b>?<br />Let's try both and see.</>,
      <>잠깐 — 왜 하필 <b>0 과 2</b> 를 짝지을까요? <b>0 과 3</b> 은 안 되나요?<br />둘 다 해보고 견줘 봐요.</>)
    : s.kind === "uneven" ? t(E,
      <>Last worry — what if some pair <b>matches</b>?<br />Then op 1 collects pieces of <b>different lengths</b>. Still Y + Y?</>,
      <>마지막 걱정 — <b>같은</b> 쌍이 섞이면요?<br />1번이 모으는 조각의 <b>길이가 제각각</b>이 되는데, 그래도 Y + Y 가 될까요?</>)
    : t(E,
      <>So split it: the <b>overlapping 2 letters</b> go to op 1, the <b>leftover letter</b> from each side goes to op 2.</>,
      <>그럼 나눠요 — 겹치는 <b>2글자</b>는 1번으로, 양쪽에 <b>남는 1글자</b>는 2번으로.</>)

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why is 2 always enough?", "왜 항상 2번이면 될까?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      {/* '셋뿐' 을 쓰는 화면에서는 그 사실을 위에 계속 띄워둔다 */}
      {["pair", "overlap", "case2", "case3", "whypair"].includes(s.kind) && (
        <BlockLegend E={E} active={
          s.kind === "overlap" ? ["COW", "OWC"]
          : s.kind === "case2" ? ["COW", "WCO"]
          : s.kind === "case3" ? ["OWC", "WCO"]
          : s.kind === "pair"  ? ["COW", "OWC"]
          : []} />
      )}
      <Say tone={s.kind === "overlap" || s.kind === "case2" || s.kind === "case3" ? "aha" : s.kind === "odd" ? "stuck" : "go"}>{say}</Say>

      {/* pair 스텝 — 앞 블록 ↔ 뒤 블록 짝 시각화 */}
      {s.kind === "pair" && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, marginBottom: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {A_BLOCK.map((ch, i) => <Tile key={i} ch={ch} size={44} bd="#059669" bg="#ecfdf5" />)}
            </div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#059669", fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "front block 0", "앞 블록 0")}</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#8b5cf6" }}>↔</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {B_BLOCK.map((ch, i) => <Tile key={i} ch={ch} size={44} bd="#8b5cf6" bg="#f5f3ff" />)}
            </div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#8b5cf6", fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "back partner (block 1)", "뒤 파트너 (블록 1)")}</div>
          </div>
        </div>
      )}

      {/* overlap 스텝 — Case 1/3: COW × OWC. 헬퍼로 통일 */}
      {s.kind === "overlap" && (
        <PairOverlapVisual E={E}
          aBlock={["C","O","W"]} bBlock={["O","W","C"]}
          aOvIdx={[1,2]} bOvIdx={[0,1]} aLoIdx={0} bLoIdx={2}
          overlapStr="OW" loLetter="C"
          aLabelEn="front: a[1:] = OW" aLabelKo="앞: a[1:] = OW"
          bLabelEn="back: b[:2] = OW" bLabelKo="뒤: b[:2] = OW" />
      )}

      {/* case2 스텝 — COW × WCO. overlap 과 같은 레이아웃 재사용, 값만 다름 */}
      {s.kind === "case2" && (
        <PairOverlapVisual E={E}
          aBlock={["C","O","W"]} bBlock={["W","C","O"]}
          aOvIdx={[0,1]} bOvIdx={[1,2]} aLoIdx={2} bLoIdx={0}
          overlapStr="CO" loLetter="W"
          aLabelEn="front: a[:2] = CO" aLabelKo="앞: a[:2] = CO"
          bLabelEn="back: b[1:] = CO" bLabelKo="뒤: b[1:] = CO" />
      )}

      {/* case3 스텝 — OWC × WCO + 요약 */}
      {s.kind === "case3" && (
        <>
          <PairOverlapVisual E={E}
            aBlock={["O","W","C"]} bBlock={["W","C","O"]}
            aOvIdx={[1,2]} bOvIdx={[0,1]} aLoIdx={0} bLoIdx={2}
            overlapStr="WC" loLetter="O"
            aLabelEn="front: a[1:] = WC" aLabelKo="앞: a[1:] = WC"
            bLabelEn="back: b[:2] = WC" bLabelKo="뒤: b[:2] = WC" />
          <div style={{ maxWidth: 500, margin: "14px auto 0", padding: "10px 14px", background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, fontSize: 12.5, color: "#065f46", lineHeight: 1.65, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
            🎉 {t(E,
              <>Three kinds of block → <b>3 possible pairs</b>, and we just checked them all.<br /><span style={{ fontSize: 11.5 }}>Every one: 2 letters overlap, and the same letter is left over.</span></>,
              <>블록이 셋 → 나올 수 있는 쌍도 <b>이 3개가 전부</b>. 방금 다 봤어요.<br /><span style={{ fontSize: 11.5 }}>셋 다 2글자가 겹치고, 남는 글자도 같았죠.</span></>)}
          </div>
        </>
      )}

      {/* split 스텝 — op 1 = 겹치는 2 글자, op 2 = 남는 1 글자 */}
      {s.kind === "split" && (
        <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, marginBottom: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {A_BLOCK.map((ch, i) => {
                  const op = i === 0 ? 2 : 1;
                  return <Tile key={i} ch={ch} size={44} bd={OPCOL[op]} bg={OPBG[op]} fg="#1f2937" badge={op} />;
                })}
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8" }}>{t(E, "front block", "앞 블록")}</div>
            </div>
            <div style={{ fontSize: 22, color: "#94a3b8" }}>+</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {B_BLOCK.map((ch, i) => {
                  const op = i === 2 ? 2 : 1;
                  return <Tile key={i} ch={ch} size={44} bd={OPCOL[op]} bg={OPBG[op]} fg="#1f2937" badge={op} />;
                })}
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8" }}>{t(E, "back block", "뒤 블록")}</div>
            </div>
          </div>
          <div style={{ marginTop: 6, fontSize: 12, textAlign: "center", color: "#065f46", lineHeight: 1.7, wordBreak: "keep-all", textWrap: "balance" }}>
            <div><b style={{ color: OPCOL[1] }}>op 1</b> {t(E, "picks OW + OW = ", "= OW + OW = ")}<code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>OWOW</code> = OW+OW ✓</div>
            <div><b style={{ color: OPCOL[2] }}>op 2</b> {t(E, "picks C + C = ", "= C + C = ")}<code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>CC</code> = C+C ✓</div>
            <div style={{ marginTop: 4, fontWeight: 800, color: "#059669" }}>M = 2 🎉</div>
          </div>
        </>
      )}

      {/* why 스텝 — 요구사항만. 아직 실제 S 를 대보기 전이라 '고른 것' 은 빈 상자.
          (예전엔 여기서 COW = OWC 를 '=' 로 보여줬는데, 사실 둘은 다름 → 이야기가 끊겼음.
           선생님 2026-08-30 "설명이 더 자연스럽게 안될까") */}
      {s.kind === "why" && (
        <div style={{ maxWidth: 480, margin: "4px auto 0" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 10 }}>
            {[t(E, "picked from the front half", "앞 절반에서 고른 것"),
              t(E, "picked from the back half", "뒤 절반에서 고른 것")].map((lab, k) => (
              <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                {k === 1 && <span style={{ fontSize: 20, fontWeight: 800, color: "#059669" }}>=</span>}
                <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 108, height: 42, borderRadius: 9, background: "#f8fafc",
                    border: "2px dashed #94a3b8", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, fontWeight: 800, color: "#94a3b8" }}>?</span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#64748b", textAlign: "center", wordBreak: "keep-all" }}>{lab}</span>
                </span>
              </span>
            ))}
          </div>
          <div style={{ padding: "10px 14px", background: "#f5f3ff",
            border: "1.5px solid #c4b5fd", borderRadius: 10, fontSize: 12.5, color: "#5b21b6",
            lineHeight: 1.75, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E, <>Whatever fills those two boxes has to be <b>identical</b>.<br />That's the only way the picks read as <b>Y + Y</b>.</>,
                  <>이 두 상자에 들어갈 게 <b>서로 같아야</b> 해요.<br />그래야 고른 글자가 <b>Y + Y</b> 로 읽혀요.</>)}
          </div>
        </div>
      )}

      {/* halves 스텝 — 실제로 반을 잘라 대보니 안 맞음. 여기가 이야기의 전환점. */}
      {s.kind === "halves" && (
        <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {"COW".split("").map((ch, i) => <Tile key={i} ch={ch} size={40} bd="#059669" bg="#ecfdf5" />)}
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#059669" }}>{t(E, "front half", "앞 절반")}</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#dc2626" }}>≠</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {"OWC".split("").map((ch, i) => <Tile key={i} ch={ch} size={40} bd="#8b5cf6" bg="#f5f3ff" />)}
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#8b5cf6" }}>{t(E, "back half", "뒤 절반")}</div>
            </div>
          </div>
          <Caption color="#dc2626">{t(E, "S = COWOWC → can't wipe it all in one move",
                                          "S = COWOWC → 통째로 한 번에는 못 지워요")}</Caption>
          <div style={{ maxWidth: 480, margin: "12px auto 0", padding: "10px 14px", background: "#eff6ff",
            border: "1.5px solid #60a5fa", borderRadius: 10, fontSize: 12.5, color: "#1e40af",
            lineHeight: 1.8, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E, <>But look how close they are — <b>OW</b> shows up in both.<br />Only <b>one letter each</b> is out of place.</>,
                  <>그런데 얼마나 비슷한지 보세요 — <b>OW</b> 가 양쪽에 다 있어요.<br />어긋난 건 <b>한 글자씩</b>뿐이에요.</>)}
          </div>
        </>
      )}

      {/* many 스텝 — N=4 로 쌍 2개. 라벨은 실제 알고리즘 결과 (완전탐색으로 검증) */}
      {s.kind === "many" && (
        <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
            {"COWOWCWCOCOW".split("").flatMap((ch, i) => {
              const op = [1,1,2,1,1,2,2,1,1,2,1,1][i];
              const tile = <Tile key={"t" + i} ch={ch} size={32} bd={OPCOL[op]} bg={OPBG[op]} fg="#1f2937" badge={op} />;
              return i === 5
                ? [tile, <div key="div" style={{ width: 2, height: 34, background: "#cbd5e1", margin: "0 4px" }} />]
                : [tile];
            })}
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8", textAlign: "center", marginBottom: 8 }}>
            {t(E, "N = 4 · front half | back half", "N = 4 · 앞 절반 | 뒤 절반")}
          </div>
          <div style={{ maxWidth: 500, margin: "0 auto", padding: "10px 14px", background: "#ecfdf5",
            border: "1.5px solid #6ee7b7", borderRadius: 10, fontSize: 12, color: "#065f46",
            lineHeight: 1.8, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
            <div><b style={{ color: OPCOL[1] }}>{t(E, "op 1", "1번")}</b>{" "}
              <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>COOW</code>
              {" + "}<code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>COOW</code> ✓</div>
            <div><b style={{ color: OPCOL[2] }}>{t(E, "op 2", "2번")}</b>{" "}
              <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>WC</code>
              {" + "}<code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>WC</code> ✓</div>
            <div style={{ marginTop: 4, fontWeight: 800, color: "#059669" }}>
              {t(E, "2 pairs, still M = 2 🎉", "쌍이 둘이어도 M = 2 🎉")}
            </div>
          </div>
        </>
      )}

      {/* whypair 스텝 — 왜 하필 i ↔ i+N/2 인가.
          선생님 2026-08-30 "왜 i와 i + n//2인가? 이것만 비교해도 충분한거야?"
          핵심: 1번은 글자를 블록 순서대로 모으므로, 앞의 k번째 블록과 뒤의 k번째 블록이
          짝이어야 두 절반이 순서까지 겹친다. 뒤집어 짝지으면 A+B vs B+A 가 되어 어긋남.
          숫자는 완전탐색으로 확인 (N=2,4,6 전수 780건: i+N/2 실패 0 / 뒤집기 실패 660). */}
      {/* whypair — 글이 아니라 그림으로. 짝은 색으로 묶고, 결과는 타일로 늘어놔
          '조각은 같은데 순서가 뒤집혔다' 를 눈으로 보게 함.
          선생님 2026-09-02: "제발 글로만 막 설명하지마" */}
      {s.kind === "whypair" && (() => {
        const BL = ["COW", "COW", "COW", "OWC"];          // S = COWCOWCOWOWC
        const PA = "#0891b2", PB = "#8b5cf6";              // 짝 A / 짝 B 색
        const give = (a, b) => a === b ? [a, b]
          : a.slice(0, 2) === b.slice(1) ? [a.slice(0, 2), b.slice(1)]
          : [a.slice(1), b.slice(0, 2)];
        const run = (pairs) => {
          const part = {}, col = {};
          pairs.forEach(([x, y], k) => {
            const [gx, gy] = give(BL[x], BL[y]);
            part[x] = gx; part[y] = gy;
            col[x] = col[y] = k === 0 ? PA : PB;
          });
          return { part, col, front: part[0] + part[1], back: part[2] + part[3] };
        };
        const CASES = [
          { pairs: [[0, 2], [1, 3]], title: "0↔2, 1↔3" },
          { pairs: [[0, 3], [1, 2]], title: "0↔3, 1↔2" },
        ].map((c) => ({ ...c, ...run(c.pairs) }));

        const Mini = ({ ch, col, dim }) => (
          <span style={{ width: 19, height: 23, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 12,
            background: dim ? "#f8fafc" : "#fff", border: `1.5px solid ${col}`, color: dim ? "#cbd5e1" : "#334155" }}>{ch}</span>
        );

        const Card = ({ c, good }) => (
          <div style={{ flex: 1, minWidth: 240, background: good ? "#f0fdf4" : "#fef2f2",
            border: `1.5px solid ${good ? "#86efac" : "#fca5a5"}`, borderRadius: 11, padding: "11px 12px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, textAlign: "center", marginBottom: 9,
              color: good ? "#15803d" : "#b91c1c", fontFamily: "'JetBrains Mono',monospace" }}>{c.title}</div>

            {/* 블록 4개 — 짝끼리 같은 색 */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, marginBottom: 9 }}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
                  {i === 2 && <span style={{ width: 2, height: 26, background: "#cbd5e1", margin: "0 5px" }} />}
                  <span style={{ display: "inline-flex", gap: 1.5, padding: 2.5, borderRadius: 6,
                    border: `2px solid ${c.col[i]}`, background: "#fff" }}>
                    {BL[i].split("").map((ch, j) => (
                      <span key={j} style={{ width: 15, height: 18, display: "flex", alignItems: "center",
                        justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
                        fontSize: 10.5, color: c.part[i].includes(ch) ? "#334155" : "#cbd5e1" }}>{ch}</span>
                    ))}
                  </span>
                </span>
              ))}
            </div>

            {/* 결과 — 앞/뒤를 타일로 늘어놓고 자리별로 대조 */}
            {[["앞", "front", c.front], ["뒤", "back", c.back]].map(([ko, en, str]) => (
              <div key={en} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 5, marginBottom: 4 }}>
                <span style={{ width: 22, fontSize: 10, fontWeight: 800, color: "#64748b", textAlign: "right" }}>{t(E, en, ko)}</span>
                <span style={{ display: "inline-flex", gap: 2 }}>
                  {str.split("").map((ch, j) => (
                    <Mini key={j} ch={ch} col={c.front[j] === c.back[j] ? "#94a3b8" : "#dc2626"} />
                  ))}
                </span>
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 13, fontWeight: 800,
              color: good ? "#16a34a" : "#dc2626" }}>{good ? "✓" : "✗"}</div>
          </div>
        );

        return (
          <>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", maxWidth: 540, margin: "0 auto" }}>
              <Card c={CASES[0]} good />
              <Card c={CASES[1]} good={false} />
            </div>
            <Caption color="#dc2626">
              {t(E, "same pieces, flipped order", "조각은 같은데 순서가 뒤집힘")}
            </Caption>
          </>
        );
      })()}

      {/* uneven 스텝 — N=6, 세 번째 쌍이 '같은' 쌍이라 조각 길이가 2·2·3 으로 달라짐.
          선생님 2026-08-30: "OW 도 1이고 OWC 도 1인데 어떻게 같이 사라지지?" 가 여기서 막힌 지점.
          라벨 [2,1,1,2,1,1,1,1,1,1,1,2,1,1,2,1,1,1] 은 실제 풀이 출력 (브루트포스 검증됨). */}
      {s.kind === "uneven" && (() => {
        const SS = "COWCOWOWCOWCOWCOWC";
        const LB = [2,1,1,2,1,1,1,1,1,1,1,2,1,1,2,1,1,1];
        const piece = (from, to) => SS.slice(from, to).split("")
          .filter((_, j) => LB[from + j] === 1).join("");
        const fragsFront = [piece(0,3), piece(3,6), piece(6,9)];
        const fragsBack  = [piece(9,12), piece(12,15), piece(15,18)];
        const Frag = ({ list, color }) => (
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color }}>
            {list.map((f, j) => <span key={j}>{j > 0 && <span style={{ color: "#cbd5e1" }}> · </span>}{f}</span>)}
          </span>
        );
        return (
          <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, marginBottom: 8, flexWrap: "wrap" }}>
              {SS.split("").flatMap((ch, i) => {
                const op = LB[i];
                const tile = <Tile key={"u" + i} ch={ch} size={27} bd={OPCOL[op]} bg={OPBG[op]} fg="#1f2937" />;
                return i === 8
                  ? [tile, <div key="ud" style={{ width: 2, height: 30, background: "#cbd5e1", margin: "0 5px" }} />]
                  : [tile];
              })}
            </div>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8", textAlign: "center", marginBottom: 10 }}>
              {t(E, "N = 6 · front half | back half  (3rd pair matches, so nothing was pulled from it)",
                    "N = 6 · 앞 절반 | 뒤 절반  (셋째 쌍은 같아서 아무것도 안 뺐어요)")}
            </div>
            <div style={{ maxWidth: 520, margin: "0 auto", padding: "11px 14px", background: "#fef2f2",
              border: `1.5px solid ${OPCOL[1]}`, borderRadius: 10, fontSize: 12, color: "#7f1d1d",
              lineHeight: 1.9, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
              <div style={{ fontWeight: 800, marginBottom: 3 }}>{t(E, "op 1 — pieces of different lengths", "1번 — 길이가 제각각인 조각들")}</div>
              <div>{t(E, "front", "앞")}: <Frag list={fragsFront} color={OPCOL[1]} /> <span style={{ color: "#94a3b8" }}>(2·2·3)</span></div>
              <div>{t(E, "back", "뒤")}: <Frag list={fragsBack} color={OPCOL[1]} /> <span style={{ color: "#94a3b8" }}>(2·2·3)</span></div>
              <div style={{ marginTop: 6, paddingTop: 6, borderTop: `1px dashed ${OPCOL[1]}` }}>
                {t(E, "glued together", "이어붙이면")}{" "}
                <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>{fragsFront.join("")}</code>
                {" + "}
                <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>{fragsBack.join("")}</code>
                {" ✓"}
              </div>
            </div>
            <div style={{ maxWidth: 520, margin: "10px auto 0", padding: "10px 14px", background: "#eff6ff",
              border: "1.5px solid #60a5fa", borderRadius: 10, fontSize: 12.5, color: "#1e40af",
              lineHeight: 1.8, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                <>The lengths never mattered. A label marks a <b>letter</b>, not a block —<br />all that has to match is the <b>whole front pick</b> vs the <b>whole back pick</b>.</>,
                <>길이는 애초에 상관없었어요. 번호는 <b>블록</b>이 아니라 <b>글자</b>에 붙는 거예요 —<br />맞아야 하는 건 <b>앞에서 고른 것 전체</b>와 <b>뒤에서 고른 것 전체</b>뿐이에요.</>)}
            </div>
          </>
        );
      })()}
      </StepFade>

      {/* 시뮬 내용과 ◀▶ 버튼 사이 숨 — 없으면 마지막 카드에 버튼이 붙어 보임
          (선생님 2026-08-30 "뭔가 겹쳐"). checkups·buymilk 도 같은 방식. */}
      <div style={{ height: 16 }} />
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OddImpossibleSim — [분리] 아예 못 비우는 S.
   전엔 "왜 항상 2번이면 될까" 시뮬 마지막 단계에 얹혀 있었는데
   (선생님 2026-08-29 검토: "다른 질문인데 같은 페이지에 있음") 자기 페이지로 뺐다.
   요약 페이지의 순서(−1 → 1 → 2)와도 맞는다.
   ═══════════════════════════════════════════════════════════════ */
export function OddImpossibleSim({ E }) {
  const steps = [{ kind: "count" }, { kind: "even" }, { kind: "concl" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const say =
    s.kind === "count" ? t(E,
      <>Before asking how few moves, ask if it is possible at all.<br />Take <b>N = 1</b>. Then S is one block, <b>3 letters</b>.</>,
      <>몇 번이면 되는지 묻기 전에, 아예 되는지부터 봐요.<br /><b>N = 1</b> 이면 S 는 블록 하나, <b>글자 3개</b>예요.</>)
    : s.kind === "even" ? t(E,
      <>One move removes <b>Y + Y</b> — the same thing twice.<br />So it always removes an <b>even</b> number of letters.</>,
      <>한 번의 지우기는 <b>Y + Y</b> 를 없애요. 같은 걸 두 번이죠.<br />그래서 지우는 글자 수는 늘 <b>짝수</b>예요.</>)
    : t(E,
      <>Even numbers can never add up to <b>3</b>.<br />So when <b>N is odd</b>, 3N is odd and S can never be emptied → <b>−1</b>.</>,
      <>짝수를 아무리 더해도 <b>3</b> 이 될 수 없어요.<br />그래서 <b>N 이 홀수</b>면 3N 도 홀수라 절대 못 비워요 → <b>−1</b>.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Is it ever impossible?", "아예 못 비우는 S 는?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.kind === "concl" ? "stuck" : "go"}>{say}</Say>

      <Row>{"COW".split("").map((ch, i) =>
        <Tile key={i} ch={ch} size={42} bg="#fff" bd={s.kind === "concl" ? "#dc2626" : "#94a3b8"} />)}</Row>

      {s.kind === "count" && (
        <Caption color="#64748b">{t(E, "N = 1 → 3N = 3 letters", "N = 1 → 3N = 글자 3개")}</Caption>
      )}
      {s.kind === "even" && (
        <div style={{ maxWidth: 460, margin: "12px auto 0", padding: "10px 14px", background: "#f5f3ff",
          border: "1.5px solid #c4b5fd", borderRadius: 10, fontSize: 12.5, color: "#5b21b6",
          lineHeight: 1.8, textAlign: "center", wordBreak: "keep-all", textWrap: "balance" }}>
          {t(E, <>Y + Y is <b>2 × (length of Y)</b> → always even.<br />2, 4, 6, 8, …</>,
                <>Y + Y 는 <b>Y 길이의 2배</b>라 늘 짝수예요.<br />2, 4, 6, 8, …</>)}
        </div>
      )}
      {s.kind === "concl" && (
        <Caption color="#dc2626">{t(E, "3 is odd → can never be emptied → −1",
                                        "3 은 홀수 → 절대 못 비움 → −1")}</Caption>
      )}
      </StepFade>

      {/* 시뮬 내용과 ◀▶ 버튼 사이 숨 — 없으면 마지막 카드에 버튼이 붙어 보임
          (선생님 2026-08-30 "뭔가 겹쳐"). checkups·buymilk 도 같은 방식. */}
      <div style={{ height: 16 }} />
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CowSplitsTraceSim — [Ch2, 코드 앞] 코드가 채우는 ans 표를 눈으로.
   COWOWC 로 [1,1,1,1,1,1] → 블록쌍 → 겹치는 OW는 1번, 남는 C만 2번 → [2,1,1,1,1,2].
   photoshoot25 Run 단계처럼, 코드 변수(a·b·ans)가 실제로 도는 모습.
   ═══════════════════════════════════════════════════════════════ */
export function CowSplitsTraceSim({ E }) {
  const S = "COWOWC".split("");   // C O W O W C
  const steps = [
    { kind: "init" }, { kind: "pair" }, { kind: "check" },
    { kind: "overlap" }, { kind: "leftover" }, { kind: "done" },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const filled = s.kind === "leftover" || s.kind === "done";
  const ansVal = (i) => (filled && (i === 0 || i === 5)) ? 2 : 1;
  const showPair = s.kind === "pair" || s.kind === "check";
  const isOverlap = (i) => i >= 1 && i <= 4;          // OW·OW (가운데)
  const isLeftover = (i) => i === 0 || i === 5;        // C·C (양끝)

  const say =
    s.kind === "init" ? t(E,
        <>The code fills a table <b>ans</b> — each letter's move number. It starts <b>all 1</b>.</>,
        <>코드는 표 <b>ans</b> 를 채워요 — 글자마다 '몇 번째 지우기'. 처음엔 <b>다 1번</b>.</>)
    : s.kind === "pair" ? t(E,
        <>Take the block pair: front <b>a = COW</b> (0–2), back partner <b>b = OWC</b> (3–5).</>,
        <>블록 쌍을 잡아요: 앞 <b>a = COW</b> (0~2), 뒤 파트너 <b>b = OWC</b> (3~5).</>)
    : s.kind === "check" ? t(E,
        <><b>a ≠ b?</b> COW ≠ OWC → yes, so this pair needs fixing.</>,
        <><b>a ≠ b?</b> COW ≠ OWC → 맞아요, 이 쌍은 손봐야 해요.</>)
    : s.kind === "overlap" ? t(E,
        <>The middle <b style={{ color: OPCOL[1] }}>OW·OW</b> (4 letters) overlaps → leave them as <b>move 1</b>.</>,
        <>가운데 <b style={{ color: OPCOL[1] }}>OW·OW</b> (4글자)가 겹쳐요 → <b>1번</b> 그대로 둬요.</>)
    : s.kind === "leftover" ? t(E,
        <>Only the leftover <b style={{ color: OPCOL[2] }}>C · C</b> (the two ends) become <b>move 2</b>. → ans = 2 1 1 1 1 2</>,
        <>남는 <b style={{ color: OPCOL[2] }}>C · C</b> (양끝 2개)만 <b>2번</b>으로. → ans = 2 1 1 1 1 2</>)
    : t(E,
        <><b>M = max(ans) = 2</b>. Output: <b>2</b>, then <b>2 1 1 1 1 2</b> — exactly what the code prints!</>,
        <><b>M = max(ans) = 2</b>. 출력: <b>2</b>, 그리고 <b>2 1 1 1 1 2</b> — 코드가 딱 이걸 해요!</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Watch the ans table fill in", "ans 표가 채워지는 걸 봐요")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
      <Say tone={s.kind === "done" ? "aha" : s.kind === "check" ? "stuck" : "go"}>{say}</Say>

      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 6 }}>
        {S.map((ch, i) => {
          const litA = showPair && i <= 2, litB = showPair && i >= 3;
          const ov = s.kind === "overlap" && isOverlap(i);
          const lo = filled && isLeftover(i);
          const bd = litA ? "#059669" : litB ? "#8b5cf6" : ov ? OPCOL[1] : lo ? OPCOL[2] : "#e2e8f0";
          const bg = ov ? "#fef2f2" : lo ? "#fffbeb" : "#fff";
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: bg, border: `2px solid ${bd}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace",
                fontWeight: 800, fontSize: 18, color: "#1f2937", transition: "all .15s" }}>{ch}</div>
              <div style={{ fontSize: 9, color: "#cbd5e1", fontFamily: "'JetBrains Mono',monospace" }}>{i}</div>
              <div style={{ width: 40, height: 30, borderRadius: 7, transition: "all .15s",
                background: ansVal(i) === 2 ? OPCOL[2] : "#f1f5f9",
                border: `2px solid ${ansVal(i) === 2 ? OPCOL[2] : "#e2e8f0"}`,
                color: ansVal(i) === 2 ? "#fff" : "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 15 }}>
                {ansVal(i)}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 11.5, color: "#64748b", marginTop: 2, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>
        ans = [{[0,1,2,3,4,5].map(ansVal).join(", ")}]
      </div>
      {showPair && (
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 8, fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace" }}>
          <span style={{ color: "#059669" }}>a = COW</span>
          <span style={{ color: "#8b5cf6" }}>b = OWC</span>
        </div>
      )}
      </StepFade>

      {/* 시뮬 내용과 ◀▶ 버튼 사이 숨 — 없으면 마지막 카드에 버튼이 붙어 보임
          (선생님 2026-08-30 "뭔가 겹쳐"). checkups·buymilk 도 같은 방식. */}
      <div style={{ height: 16 }} />
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

