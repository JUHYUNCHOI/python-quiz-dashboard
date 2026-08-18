// COW Splits (Dec 2025 Bronze #2) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
// 건드리지 않고 여기에만 (photoshoot25 / checkups 와 같은 방식).
//
// 원칙 (quest_problem_standard + pain_points):
//   · 학생이 주인공 — 학생 목소리로("어떻게 지우지?", "오 되네!", "어쩌지?")
//   · 관찰 → 추론 — 핵심 알고리즘(글자별로 모으면 사각)을 *발견*시킴, 통보 X
//   · 흐름: 이해 → 뭘 지울 수 있나 → 한 방(운 좋으면) → 막힘 → 핵심 발견 → 실행

import { t } from "@/components/quest/theme";
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
   EraseRuleSim — [뭘 지울 수 있나] 학생이 규칙을 직접 발견.
   같은 덩어리 두 번(Y+Y) + 떨어진 것도 골라도 됨.
   ═══════════════════════════════════════════════════════════════ */
export function EraseRuleSim({ E }) {
  const S = "COWOWC".split("");   // C O W O W C
  const steps = [
    { kind: "intro" },
    { kind: "pickC" },    // 떨어진 C 두 개 (C·C)
    { kind: "poofC" },    // C 사라짐 → OWOW
    { kind: "pickOW" },   // 남은 OW + OW
    { kind: "poofOW" },   // 다 사라짐 → 빈 문자열 (2번에 싹)
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const goneC   = s.kind === "poofC" || s.kind === "pickOW" || s.kind === "poofOW";
  const goneAll = s.kind === "poofOW";
  const isGone  = (i) => goneAll || (goneC && (i === 0 || i === 5));
  const pick    = s.kind === "pickC" ? [0, 5] : s.kind === "pickOW" ? [1, 2, 3, 4] : [];
  const pickCol = s.kind === "pickC" ? OPCOL[2] : OPCOL[1];   // C=주황, OW=빨강 (뒤 출력 라벨과 같은 색)

  const say =
    s.kind === "intro" ? t(E,
        <>One move can wipe <b>several letters at once</b> — as long as the picked letters read as <b>the same block twice</b> (like C·C or OW·OW). They don't even need to be next to each other!</>,
        <>한 번의 지우기로 <b>여러 글자를 한꺼번에</b> 없앨 수 있어요 — 고른 글자가 <b>똑같은 게 두 번</b>이기만 하면요 (C·C 나 OW·OW 처럼). 딱 붙어있지 않아도 돼요!</>)
    : s.kind === "pickC" ? t(E,
        <>Pick the two far-apart <b>C</b>'s → <b>C·C</b> = "C twice" ✓ &nbsp;<span style={{ color: "#94a3b8" }}>(C·O·W — all different — would NOT count ✗)</span></>,
        <>떨어진 <b>C</b> 두 개를 골라요 → <b>C·C</b> = "C 두 번" ✓ &nbsp;<span style={{ color: "#94a3b8" }}>(C·O·W 처럼 다 다르면 안 돼요 ✗)</span></>)
    : s.kind === "poofC" ? t(E,
        <>Both C's vanish <b>in that one move</b> — together! What's left is <b>OWOW</b>.</>,
        <>그 <b>한 번</b>에 C 두 개가 <b>같이</b> 사라져요! 남은 건 <b>OWOW</b>.</>)
    : s.kind === "pickOW" ? t(E,
        <>Now the leftover <b>OWOW</b> = <b>OW·OW</b> = "OW twice" ✓ — one more move clears it.</>,
        <>이제 남은 <b>OWOW</b> = <b>OW·OW</b> = "OW 두 번" ✓ — 한 번 더로 지워요.</>)
    : t(E,
        <>Empty! <b>2 moves</b> cleared the whole thing. But… is it <b>always 2</b>? Could some S need 3, 4, or more? 🤔</>,
        <>싹 비었어요! <b>2번</b>에 다 지웠죠. 근데… <b>항상 2번</b>일까요? 어떤 S는 3번, 4번 들 수도 있지 않을까요? 🤔</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "What can I wipe in one move?", "한 번에 뭘 지울 수 있지?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "poofOW" ? "stuck" : s.kind === "poofC" ? "aha" : "go"}>{say}</Say>

      <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>
        S = COWOWC
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
          : ""}
      </div>

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
  const steps = [
    { kind: "pair" },
    { kind: "overlap" },
    { kind: "split" },
    { kind: "odd" },
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
    s.kind === "pair" ? t(E,
      <><b>Surprise:</b> whenever it's possible, the answer is <b>always exactly 2</b> — never 3 or more! Why? Idea: <b>pair each front block with its back partner</b> (block <b>i</b> ↔ block <b>i + N/2</b>). Here N=2, so <b>COW</b> ↔ <b>OWC</b>.</>,
      <><b>놀랍게도</b> — 될 때는 답이 <b>언제나 딱 2번</b>이에요. 3번 이상은 절대 안 들어요! 왜일까요? 아이디어: <b>앞쪽 블록 i 를 뒤쪽 파트너 (i + N/2) 와 짝지어요</b>. 여기 N=2 니 <b>COW</b> ↔ <b>OWC</b>.</>)
    : s.kind === "overlap" ? t(E,
      <>Any two of <b>{"{COW, OWC, WCO}"}</b> share a <b>2-letter overlap</b>. Look: <b>COW</b> vs <b>OWC</b> — the middle "<b>OW</b>" appears in both!</>,
      <><b>{"{COW, OWC, WCO}"}</b> 어떤 두 블록도 <b>2 글자가 겹쳐요</b>. 봐요: <b>COW</b> 와 <b>OWC</b> — 가운데 "<b>OW</b>" 가 둘 다에 있어요!</>)
    : s.kind === "split" ? t(E,
      <>Split it: the <b>overlapping 2 letters</b> (OW) go to <b>op 1</b> — front OW matches back OW. The <b>leftover 1 letter each side</b> (C and C) go to <b>op 2</b> — same letter! Both ops read as Y+Y → <b>M = 2</b>.</>,
      <>나눠요: <b>겹치는 2 글자</b> (OW) 는 <b>op 1</b> — 앞의 OW 와 뒤의 OW 가 일치. <b>양쪽에 남는 1 글자</b> (C 와 C) 는 <b>op 2</b> — 같은 글자! 두 op 다 Y+Y 형태 → <b>M = 2</b>.</>)
    : t(E,
      <>And if <b>N is odd</b>? Total length 3N is odd → each op removes an even count → <b>impossible → −1</b>.</>,
      <>만약 <b>N 이 홀수</b>면? 총 길이 3N 이 홀수 → 각 연산은 짝수 개 지우기 → <b>불가능 → −1</b>.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why is 2 always enough?", "왜 항상 2번이면 될까?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "overlap" ? "aha" : s.kind === "odd" ? "stuck" : "go"}>{say}</Say>

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

      {/* overlap 스텝 — 겹치는 2 글자 강조 (OW) */}
      {s.kind === "overlap" && (
        <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, marginBottom: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {A_BLOCK.map((ch, i) => {
                  const isOverlap = i === 1 || i === 2;  // a[1:]="OW"
                  return <Tile key={i} ch={ch} size={44}
                    bd={isOverlap ? "#059669" : "#cbd5e1"} bg={isOverlap ? "#ecfdf5" : "#fff"} fg="#1f2937" />;
                })}
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#059669" }}>{t(E, "front: a[1:] = OW", "앞: a[1:] = OW")}</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#059669" }}>=</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {B_BLOCK.map((ch, i) => {
                  const isOverlap = i === 0 || i === 1;  // b[:2]="OW"
                  return <Tile key={i} ch={ch} size={44}
                    bd={isOverlap ? "#059669" : "#cbd5e1"} bg={isOverlap ? "#ecfdf5" : "#fff"} fg="#1f2937" />;
                })}
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#059669" }}>{t(E, "back: b[:2] = OW", "뒤: b[:2] = OW")}</div>
            </div>
          </div>
          <Caption color="#059669">{t(E, "OW overlaps ✓  · leftover: C on front + C on back — same letter ✓",
                                          "OW 겹침 ✓  · 남은 것: 앞의 C + 뒤의 C — 같은 글자 ✓")}</Caption>
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
          <div style={{ marginTop: 6, fontSize: 12, textAlign: "center", color: "#065f46", lineHeight: 1.7, wordBreak: "keep-all" }}>
            <div><b style={{ color: OPCOL[1] }}>op 1</b> {t(E, "picks OW + OW = ", "= OW + OW = ")}<code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>OWOW</code> = OW+OW ✓</div>
            <div><b style={{ color: OPCOL[2] }}>op 2</b> {t(E, "picks C + C = ", "= C + C = ")}<code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>CC</code> = C+C ✓</div>
            <div style={{ marginTop: 4, fontWeight: 800, color: "#059669" }}>M = 2 🎉</div>
          </div>
        </>
      )}

      {/* odd 스텝 — 홀수면 불가능 */}
      {s.kind === "odd" && (
        <>
          <Row>{"COW".split("").map((ch, i) => <Tile key={i} ch={ch} size={42} bg="#fff" bd="#dc2626" />)}</Row>
          <Caption color="#dc2626">{t(E, "N=1 → 3N=3 odd → can't empty with even-length ops → −1",
                                          "N=1 → 3N=3 홀수 → 짝수 길이 연산으로 못 비움 → −1")}</Caption>
        </>
      )}

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

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

