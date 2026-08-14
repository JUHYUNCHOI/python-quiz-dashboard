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
   IntroSim — [이해] 게임이 뭔지. 학생 목소리.
   ═══════════════════════════════════════════════════════════════ */
export function IntroSim({ E }) {
  const arr = "COWCOW".split("");
  const steps = [{ kind: "what" }, { kind: "try" }, { kind: "win" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const half = arr.length / 2;

  const say =
    s.kind === "what" ? t(E, <>This row of letters — I want to <b>wipe it all out</b>. And do it in as <b>few moves</b> as I can. How?</>,
                            <>이 글자 줄을 <b>다 지워서 없애고</b> 싶어요. 되도록 <b>적은 횟수</b>로. 어떻게 할까요?</>)
    : s.kind === "try" ? t(E, <>Wait — <b>COWCOW</b> is <b>COW</b> then <b>COW</b> again. The same chunk twice!</>,
                             <>어? <b>COWCOW</b> 는 <b>COW</b> 다음에 또 <b>COW</b> 네요. 같은 덩어리가 두 번이에요!</>)
    : t(E, <>When it's the same chunk twice, I can wipe the <b>whole thing in one move</b> → empty! Just <b>1 move</b>. 🎉</>,
           <>같은 덩어리가 두 번이면 <b>한 방에 통째로</b> 지울 수 있어요 → 빈 줄! 딱 <b>1번</b>. 🎉</>);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <div style={{ fontSize: 24 }}>🐄✂️</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#065f46" }}>{t(E, "COW Splits — the wipe-it-all game", "COW 분할 — 다 지우기 게임")}</div>
        <div style={{ fontSize: 10, color: "#94a3b8" }}>USACO Dec 2025 Bronze #2</div>
      </div>
      <Say>{say}</Say>
      <Row>
        {s.kind === "win"
          ? <div style={{ fontSize: 15, fontWeight: 800, color: "#059669", fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "( empty! )   1 move ✓", "( 빈 줄! )   1번 ✓")}</div>
          : arr.map((ch, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center" }}>
                {s.kind === "try" && i === half && <span style={{ margin: "0 9px", fontSize: 20, fontWeight: 800, color: "#059669" }}>|</span>}
                <Tile ch={ch} size={48} bg={s.kind === "try" && i >= half ? "#ecfdf5" : "#fff"} bd={s.kind === "try" ? "#059669" : "#cbd5e1"} />
              </span>
            ))}
      </Row>
      {s.kind === "try" && <Caption color="#059669">COW | COW  {t(E, "→ same chunk twice!", "→ 같은 덩어리 두 번!")}</Caption>}
      <div style={{ maxWidth: 520, margin: "18px auto 0", fontSize: 10.5, color: "#94a3b8", textAlign: "center", wordBreak: "keep-all", lineHeight: 1.5 }}>
        {t(E, "(The letters are C, O, W only — S is N blocks, each COW/OWC/WCO. If you can't empty it → −1.)",
             "(글자는 C, O, W 뿐 — S 는 N 개 블록, 각 블록은 COW/OWC/WCO. 못 비우면 → −1.)")}
      </div>
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EraseRuleSim — [뭘 지울 수 있나] 학생이 규칙을 직접 발견.
   같은 덩어리 두 번(Y+Y) + 떨어진 것도 골라도 됨.
   ═══════════════════════════════════════════════════════════════ */
export function EraseRuleSim({ E }) {
  const S = "COWOWC".split("");
  const steps = [{ kind: "intro" }, { kind: "pick" }, { kind: "poof" }, { kind: "bad" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const say =
    s.kind === "intro" ? t(E, <>One move can wipe <b>several letters at once</b> — not just one. The catch: the ones I pick must read as <b>the same chunk twice</b> (like C·C or COW·COW).</>,
                             <>한 번의 지우기로 <b>여러 글자를 한꺼번에</b> 없앨 수 있어요 — 하나씩이 아니고요. 단, 고른 글자가 <b>같은 덩어리 두 번</b>이어야 해요 (C·C 나 COW·COW 처럼).</>)
    : s.kind === "pick" ? t(E, <>They don't need to be next to each other! Pick the two <b>C</b>'s (far apart) → <b>C·C</b> = "C twice" ✓</>,
                              <>딱 붙어있을 필요 없어요! 떨어진 <b>C</b> 두 개를 골라봐요 → <b>C·C</b> = "C 두 번" ✓</>)
    : s.kind === "poof" ? t(E, <>Both C's vanish <b>in that one move</b> — together! What's left is <b>OWOW</b>. (So yes, one move erased two letters.)</>,
                              <>그 <b>한 번의 지우기</b>로 C 두 개가 <b>같이</b> 사라져요! 남은 건 <b>OWOW</b>. (한 번에 두 글자를 지운 거예요.)</>)
    : t(E, <>But I can't pick just anything: <b>C·O·W</b> isn't "same twice" → <b>can't wipe</b> ✗</>,
           <>아무거나는 안 돼요: <b>C·O·W</b> 는 "같은 것 두 번"이 아니에요 → <b>못 지워요</b> ✗</>);

  const bigRow = { display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap" };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "What can I wipe in one move?", "한 번에 뭘 지울 수 있지?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "bad" ? "stuck" : s.kind === "poof" ? "aha" : "go"}>{say}</Say>

      {s.kind !== "bad" && (
        <>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>
            S = COWOWC
          </div>
          <div style={bigRow}>
            {S.map((ch, i) => {
              const isC = ch === "C";
              const gone = s.kind === "poof" && isC;
              const lit = (s.kind === "pick") && isC;
              return (
                <div key={i} style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 10, fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 24,
                  transition: "all .15s",
                  background: gone ? "transparent" : lit ? OPCOL[1] : "#fff",
                  border: gone ? "2px dashed #fca5a5" : `2px solid ${lit ? OPCOL[1] : "#e2e8f0"}`,
                  color: gone ? "transparent" : lit ? "#fff" : "#1f2937" }}>
                  {gone ? "" : ch}
                </div>
              );
            })}
          </div>
          {s.kind === "pick" && (
            <div style={{ ...bigRow, marginTop: 14 }}>
              <div style={{ fontSize: 20, color: OPCOL[1] }}>↓</div>
            </div>
          )}
          {s.kind === "pick" && (
            <div style={{ ...bigRow, marginTop: 6 }}>
              <div style={{ width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 9, background: OPCOL[1], color: "#fff", fontWeight: 800, fontSize: 22, fontFamily: "'JetBrains Mono',monospace" }}>C</div>
              <div style={{ width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 9, background: OPCOL[1], color: "#fff", fontWeight: 800, fontSize: 22, fontFamily: "'JetBrains Mono',monospace" }}>C</div>
              <span style={{ fontSize: 14, fontWeight: 800, color: OPCOL[1], marginLeft: 8, wordBreak: "keep-all" }}>C·C  ✓</span>
            </div>
          )}
          {s.kind === "poof" && (
            <div style={{ textAlign: "center", marginTop: 16, fontSize: 14, fontWeight: 800, color: "#059669", fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, "left over → OWOW", "남은 글자 → OWOW")}
            </div>
          )}
        </>
      )}

      {s.kind === "bad" && (
        <>
          <div style={bigRow}>
            {"COW".split("").map((ch, i) => (
              <div key={i} style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 10, background: "#fff", border: "2px solid #dc2626", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 24, color: "#1f2937" }}>{ch}</div>
            ))}
          </div>
          <Caption color="#dc2626">{t(E, "C·O·W → all different → ✗", "C·O·W → 다 달라 → ✗")}</Caption>
        </>
      )}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   StuckSim — [한 방 시도 → 막힘] 운 좋으면 1번. 근데 안 맞으면?
   ═══════════════════════════════════════════════════════════════ */
export function StuckSim({ E }) {
  const steps = [{ kind: "lucky" }, { kind: "stuck" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const str = s.kind === "lucky" ? "COWCOW" : "COWOWC";
  const arr = str.split(""); const half = arr.length / 2;
  const ok = s.kind === "lucky";

  const say = ok
    ? t(E, <>Best case: if the <b>whole S</b> is "same chunk twice" (front half = back half), I win in <b>1 move</b>.</>,
          <>제일 좋은 경우: <b>S 통째로</b> "같은 덩어리 두 번"(앞 절반 = 뒤 절반)이면 <b>1번</b>에 끝나요!</>)
    : t(E, <>But usually the front and back <b>don't match</b> (COW ≠ OWC). One move won't do it… <b>now what?</b> 🤔</>,
          <>근데 보통은 앞뒤가 <b>안 맞아요</b> (COW ≠ OWC). 한 방으론 안 되네요… <b>이제 어떡하죠?</b> 🤔</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "One move — when does it work?", "한 방 — 언제 될까?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={ok ? "go" : "stuck"}>{say}</Say>
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>S = {str}</div>
      <Row>{arr.map((ch, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center" }}>
          {i === half && <span style={{ margin: "0 10px", fontSize: 22, fontWeight: 800, color: ok ? "#059669" : "#dc2626" }}>{ok ? "=" : "≠"}</span>}
          <Tile ch={ch} size={46} bg={ok && i >= half ? "#ecfdf5" : "#fff"} bd={ok ? "#059669" : "#dc2626"} />
        </span>))}</Row>
      <Caption color={ok ? "#059669" : "#dc2626"}>
        {ok ? t(E, "COW = COW → wipe all → 1 move ✓", "COW = COW → 통째로 → 1번 ✓")
            : t(E, "COW ≠ OWC → one move can't → ✗", "COW ≠ OWC → 한 방 불가 → ✗")}
      </Caption>
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
      <>Idea: <b>pair each front block with its back partner</b>. Block <b>i</b> ↔ block <b>i + N/2</b>. Here N=2 so front block <b>COW</b> pairs with back block <b>OWC</b>.</>,
      <>아이디어: <b>앞쪽 블록 i 를 뒤쪽 파트너 블록 (i + N/2) 과 짝지어요</b>. 여기 N=2 니 앞 블록 <b>COW</b> 와 뒤 블록 <b>OWC</b> 가 짝.</>)
    : s.kind === "overlap" ? t(E,
      <>Any two of <b>{"{COW, OWC, WCO}"}</b> share a <b>2-letter overlap</b>. Look: <b>COW</b> vs <b>OWC</b> — the middle "<b>OW</b>" appears in both!</>,
      <><b>{"{COW, OWC, WCO}"}</b> 어떤 두 블록도 <b>2 글자가 겹쳐요</b>. 봐요: <b>COW</b> 와 <b>OWC</b> — 가운데 "<b>OW</b>" 가 둘 다에 있어요!</>)
    : s.kind === "split" ? t(E,
      <>Split it: the <b>overlapping 2 letters</b> (OW) go to <b>op 1</b> — front OW matches back OW. The <b>leftover 1 letter each side</b> (C and C) go to <b>op 2</b> — same letter! Both ops are squares → <b>M = 2</b>.</>,
      <>나눠요: <b>겹치는 2 글자</b> (OW) 는 <b>op 1</b> — 앞의 OW 와 뒤의 OW 가 일치. <b>양쪽에 남는 1 글자</b> (C 와 C) 는 <b>op 2</b> — 같은 글자! 두 op 다 제곱 → <b>M = 2</b>.</>)
    : t(E,
      <>And if <b>N is odd</b>? Total length 3N is odd → each op removes an even count → <b>impossible → −1</b>.</>,
      <>만약 <b>N 이 홀수</b>면? 총 길이 3N 이 홀수 → 각 연산은 짝수 개 지우기 → <b>불가능 → −1</b>.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Pair blocks & share the overlap → M = 2", "블록 쌍 · 겹치는 부분 나누기 → M = 2")}
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
   LetterGroupSim — [실행/payoff] COWOWC 를 2 번에 (M=2 block-pair).
   4 스텝: intro → 앞 블록 · 뒤 블록 짝지어 겹치는 2 글자 찾기 → op 1 · op 2 라벨 부여 → 최종 답.
   ═══════════════════════════════════════════════════════════════ */
export function LetterGroupSim({ E }) {
  const chars = "COWOWC".split("");
  // 최종 라벨: [2, 1, 1, 1, 1, 2] (M=2 block-pair 결과)
  const finalLabels = [2, 1, 1, 1, 1, 2];
  const steps = [
    { kind: "intro" },
    { kind: "pair" },        // 블록 짝지어 겹치는 부분 강조
    { kind: "label" },       // 라벨 부여 (op 1 = 겹치는 4 글자, op 2 = 남는 2 글자)
    { kind: "verify" },      // op 1 = OWOW, op 2 = CC — 두 제곱 확인
    { kind: "done" },        // 최종 답
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const say =
    s.kind === "intro" ? t(E,
      <>Let's solve <b>COWOWC</b> with the block-pair trick — <b>2 moves</b>.</>,
      <>블록 쌍 트릭으로 <b>COWOWC</b> 를 풀어봐요 — <b>2번</b>이에요.</>)
    : s.kind === "pair" ? t(E,
      <>N=2, so front block <b>COW</b> pairs with back block <b>OWC</b>. Where do they overlap 2 chars? <b>a[1:] = OW = b[:2]</b> — so keep <b>OW · OW</b> together in op 1.</>,
      <>N=2, 앞 블록 <b>COW</b> ↔ 뒤 블록 <b>OWC</b>. 2 글자가 어디서 겹치나? <b>a[1:] = OW = b[:2]</b> — <b>OW · OW</b> 를 op 1 에 함께.</>)
    : s.kind === "label" ? t(E,
      <>Label them: the 4 overlap chars → <b style={{ color: OPCOL[1] }}>op 1</b>. The leftover 1 char per side (C from front, C from back) → <b style={{ color: OPCOL[2] }}>op 2</b>.</>,
      <>라벨 부여: 겹치는 4 글자 → <b style={{ color: OPCOL[1] }}>op 1</b>. 양쪽 남는 1 글자씩 (앞의 C, 뒤의 C) → <b style={{ color: OPCOL[2] }}>op 2</b>.</>)
    : s.kind === "verify" ? t(E,
      <>Check both are squares: op 1 subseq = <b>OWOW</b> = OW+OW ✓. op 2 subseq = <b>CC</b> = C+C ✓. Both work in one move each!</>,
      <>둘 다 제곱인지 확인: op 1 수열 = <b>OWOW</b> = OW+OW ✓. op 2 수열 = <b>CC</b> = C+C ✓. 각각 한 번에 지워요!</>)
    : t(E,
      <>Done in <b>2 moves</b> — output <b>M = 2</b> and the labels below.</>,
      <><b>2번</b>에 끝 — <b>M = 2</b> 와 아래 라벨을 출력해요.</>);

  const showBadge = s.kind === "label" || s.kind === "verify" || s.kind === "done";
  const highlightPair = s.kind === "pair";

  // pair 스텝에서 겹치는 4 글자 강조 (positions 1,2,3,4 = OWOW)
  const isOverlapPos = (i) => i === 1 || i === 2 || i === 3 || i === 4;

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Solve COWOWC → 2 moves", "COWOWC 풀기 → 2연산")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "done" ? "aha" : "go"}>{say}</Say>
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>
        S = COWOWC · {t(E, "front COW · back OWC", "앞 COW · 뒤 OWC")}
      </div>
      <Row>
        {chars.map((ch, i) => {
          const op = finalLabels[i];
          const hl = highlightPair && isOverlapPos(i);
          return <Tile key={i} ch={ch} size={46}
            bg={hl ? "#ecfdf5" : "#fff"}
            bd={hl ? "#059669" : showBadge ? OPCOL[op] : "#e2e8f0"}
            fg="#1f2937"
            badge={showBadge ? op : null} />;
        })}
      </Row>

      <div style={{ minHeight: 60, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 }}>
        {s.kind === "pair" && (
          <div style={{ fontSize: 12, color: "#065f46", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>
            {t(E, "positions 1-4: OWOW ← overlap 2 (front OW) + 2 (back OW)",
                  "위치 1~4: OWOW ← 겹침 앞 OW + 뒤 OW")}
          </div>
        )}
        {s.kind === "verify" && (
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ padding: "6px 12px", borderRadius: 8, background: OPBG[1], border: `2px solid ${OPCOL[1]}`, fontSize: 13, fontWeight: 800, color: OPCOL[1], fontFamily: "'JetBrains Mono',monospace" }}>
              op 1 · OWOW = OW+OW ✓
            </div>
            <div style={{ padding: "6px 12px", borderRadius: 8, background: OPBG[2], border: `2px solid ${OPCOL[2]}`, fontSize: 13, fontWeight: 800, color: OPCOL[2], fontFamily: "'JetBrains Mono',monospace" }}>
              op 2 · CC = C+C ✓
            </div>
          </div>
        )}
        {s.kind === "done" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#065f46", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 3 }}>M = 2</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#065f46", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 3 }}>
              {finalLabels.join(" ")}
            </div>
          </div>
        )}
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FormatSim — [승 · 형식] 주어지는 것 / 제곱 정의(✓✗) / 출력(=M그룹 분할).
   선생님 2026-08-11: 실제 문제의 입력·제곱정의·출력형식이 학생에게 전달돼야.
   ═══════════════════════════════════════════════════════════════ */
export function FormatSim({ E }) {
  const steps = [{ kind: "given" }, { kind: "square" }, { kind: "output" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const label = { C: 1, O: 2, W: 3 };

  const say =
    s.kind === "given" ? t(E, <>You're given <b>S</b> — <b>N</b> blocks glued together, each block <b>COW</b>/<b>OWC</b>/<b>WCO</b> (so length <b>3N</b>). Plus a number <b>k</b> (0 or 1).</>,
                             <>주어지는 건 <b>S</b> — <b>N</b> 개 블록을 이어붙인 것, 각 블록은 <b>COW</b>/<b>OWC</b>/<b>WCO</b> (길이 <b>3N</b>). 그리고 숫자 <b>k</b> (0 또는 1).</>)
    : s.kind === "square" ? t(E, <>A <b>square</b> string = <b>Y+Y</b> (same piece twice). <b>COWCOW, CC</b> ✓ · <b>COWO, OC</b> ✗</>,
                                <><b>제곱 문자열</b> = <b>Y+Y</b> (같은 조각 두 번). <b>COWCOW, CC</b> ✓ · <b>COWO, OC</b> ✗</>)
    : t(E, <>Output: if impossible → <b>−1</b>. Else <b>M</b>, then a move-number for <b>every letter</b> — i.e. split all letters into <b>M groups</b>, each group a square. (k=0: M smallest · k=1: smallest+1 ok)</>,
           <>출력: 못 비우면 <b>−1</b>. 되면 <b>M</b>, 그다음 <b>글자마다</b> 몇 번째 연산인지 — 즉 모든 글자를 <b>M개 그룹</b>으로 나눠 각 그룹이 제곱. (k=0: M 최소 · k=1: 최소+1까지 OK)</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "What you're given / what to output", "주어지는 것 / 출력할 것")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say>{say}</Say>

      {s.kind === "given" && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 16 }}>
            {[["C", "O", "W"], ["O", "W", "C"]].map((b, bi) => (
              <div key={bi} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ display: "flex", gap: 4 }}>{b.map((ch, i) => <Tile key={i} ch={ch} size={42} bd="#059669" />)}</div>
                <div style={{ fontSize: 9.5, fontWeight: 800, color: "#94a3b8" }}>{t(E, `block ${bi + 1}`, `블록 ${bi + 1}`)}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 9,
              background: "#f1f5f9", border: "2px dashed #94a3b8", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 16, color: "#475569" }}>k</div>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#94a3b8" }}>0 / 1</div>
          </div>
        </div>
      )}

      {s.kind === "square" && (
        <div style={{ display: "grid", gap: 12, maxWidth: 420, margin: "0 auto" }}>
          {[{ ok: true, ex: ["COWCOW", "CC"] }, { ok: false, ex: ["COWO", "OC"] }].map((g, gi) => (
            <div key={gi} style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center",
              background: g.ok ? "#ecfdf5" : "#fef2f2", border: `1.5px solid ${g.ok ? "#6ee7b7" : "#fca5a5"}`, borderRadius: 10, padding: "8px 12px" }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: g.ok ? "#059669" : "#dc2626" }}>{g.ok ? "✓" : "✗"}</span>
              {g.ex.map((w, wi) => (
                <span key={wi} style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 15, color: g.ok ? "#065f46" : "#991b1b" }}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      )}

      {s.kind === "output" && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "e.g. S = COWOWC →", "예: S = COWOWC →")}
          </div>
          <Row>
            {"COWOWC".split("").map((ch, i) => <Tile key={i} ch={ch} size={44} badge={label[ch]}
              bg={OPBG[label[ch]]} bd={OPCOL[label[ch]]} fg="#1f2937" />)}
          </Row>
          <div style={{ textAlign: "center", marginTop: 12, fontSize: 15, fontWeight: 800, color: "#065f46", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 3 }}>
            M = 3 · 1 2 3 2 3 1
          </div>
          <div style={{ textAlign: "center", marginTop: 6, fontSize: 11.5, color: "#64748b", wordBreak: "keep-all" }}>
            {t(E, "group 1 = C·C, group 2 = O·O, group 3 = W·W — each a square ✓", "1번끼리 = C·C, 2번끼리 = O·O, 3번끼리 = W·W — 각각 제곱 ✓")}
          </div>
        </div>
      )}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
