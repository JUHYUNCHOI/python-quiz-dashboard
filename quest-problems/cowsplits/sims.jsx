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
   InsightSim — [핵심 발견] 이 문제의 진짜 알고리즘.
   떨어진 것도 골라도 되니 → 같은 글자끼리 모으자 → 왜 항상 사각?
   블록마다 C·O·W 하나씩 → C가 N개 → N짝수면 짝수 → 반+반 = 사각.
   (그리고 N홀수면 홀수개 → 못 나눔 → 아예 못 비움 = -1)
   ═══════════════════════════════════════════════════════════════ */
export function InsightSim({ E }) {
  const blocks = [["C", "O", "W"], ["O", "W", "C"]];   // N=2, COWOWC
  const steps = [{ kind: "idea" }, { kind: "count" }, { kind: "why" }, { kind: "odd" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const say =
    s.kind === "idea" ? t(E, <>Since I can pick letters from anywhere… what if I gather <b>all of the same letter</b>? All the C's → <b>CCCC…</b></>,
                             <>여기저기서 골라도 되니까… <b>같은 글자끼리</b> 다 모아볼까요? C 를 다 모으면 → <b>CCCC…</b></>)
    : s.kind === "count" ? t(E, <>How many C's? Every block has <b>exactly one C</b> (and one O, one W). So there are <b>N</b> C's.</>,
                              <>C 가 몇 개일까요? 블록마다 <b>C 가 딱 하나씩</b> (O 도, W 도 하나씩). 그러니 C 는 <b>N 개</b>예요.</>)
    : s.kind === "why" ? t(E, <>If <b>N is even</b>, N C's is even → <b>CC…C</b> splits into two equal halves → "same twice" → <b>wipe every C in one move!</b> Same for O, W → <b>3 moves</b>.</>,
                             <><b>N 이 짝수</b>면 C 가 짝수개 → <b>CC…C</b> 가 반+반으로 딱 나눠져요 → "같은 것 두 번" → <b>C 를 한 번에 다 지워요!</b> O, W 도 똑같이 → <b>3번</b>.</>)
    : t(E, <>And if <b>N is odd</b>? Then C is an odd count → can't halve → can't wipe → the whole thing is <b>impossible → −1</b>.</>,
           <>만약 <b>N 이 홀수</b>면? C 가 홀수개 → 반 못 나눠요 → 못 지워요 → 아예 <b>불가능 → −1</b>.</>);

  const cCount = blocks.length; // N
  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "The idea: gather same letters", "핵심: 같은 글자끼리 모으기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "idea" ? "aha" : s.kind === "odd" ? "stuck" : "go"}>{say}</Say>

      {/* 블록 그림 — count·why 스텝에서 C 강조 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 10 }}>
        {blocks.map((b, bi) => (
          <div key={bi} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {b.map((ch, i) => {
                const hl = (s.kind === "count" || s.kind === "why") && ch === "C";
                return <Tile key={i} ch={ch} size={40} bg={hl ? OPCOL[1] : "#fff"} bd={hl ? OPCOL[1] : "#cbd5e1"} fg={hl ? "#fff" : "#1f2937"} />;
              })}
            </div>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: "#94a3b8", fontFamily: "'JetBrains Mono',monospace" }}>{t(E, `block ${bi + 1}`, `블록 ${bi + 1}`)}</div>
          </div>
        ))}
      </div>

      {s.kind === "count" && <Caption color={OPCOL[1]}>{t(E, `C once per block → N = ${cCount} C's`, `블록마다 C 하나 → C 는 N = ${cCount} 개`)}</Caption>}
      {s.kind === "why" && <>
        <Row>
          {Array.from({ length: cCount }).map((_, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              {i === cCount / 2 && <span style={{ margin: "0 8px", fontSize: 20, fontWeight: 800, color: "#059669" }}>=</span>}
              <Tile ch="C" size={42} bg="#ecfdf5" bd="#059669" />
            </span>
          ))}
        </Row>
        <Caption color="#059669">{t(E, "CC = C+C ✓ square → wipe every C (move 1)", "CC = C+C ✓ 사각 → C 전부 한 번에 (연산 1)")}</Caption>
      </>}
      {s.kind === "odd" && <>
        <Row>{"CCC".split("").map((ch, i) => <Tile key={i} ch={ch} size={42} bg="#fff" bd="#dc2626" />)}</Row>
        <Caption color="#dc2626">{t(E, "odd # of C → can't halve → −1", "C 홀수개 → 반 못 나눠 → −1")}</Caption>
      </>}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LetterGroupSim — [실행/payoff] 그 아이디어로 COWOWC 를 3번에.
   ═══════════════════════════════════════════════════════════════ */
export function LetterGroupSim({ E }) {
  const chars = "COWOWC".split("");
  const label = { C: 1, O: 2, W: 3 };
  const N = chars.filter((c) => c === "C").length;
  const steps = [{ kind: "intro" }, { kind: "op", op: 1, letter: "C" }, { kind: "op", op: 2, letter: "O" }, { kind: "op", op: 3, letter: "W" }, { kind: "done" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const opsDone = s.kind === "op" ? s.op : s.kind === "done" ? 3 : 0;
  const activeOp = s.kind === "op" ? s.op : null;

  const say =
    s.kind === "intro" ? t(E, <>Let's do it on <b>COWOWC</b>: gather each letter, one move at a time.</>,
                             <><b>COWOWC</b> 로 해볼까요: 글자별로 한 번씩 모아 지우기.</>)
    : s.kind === "op" ? t(E, <>Move <b>{s.op}</b>: grab every <b>{s.letter}</b> → <b>{s.letter.repeat(N)}</b> ({s.letter}+{s.letter}) → wipe! ✓</>,
                            <>연산 <b>{s.op}</b>: <b>{s.letter}</b> 전부 집기 → <b>{s.letter.repeat(N)}</b> ({s.letter}+{s.letter}) → 지워요! ✓</>)
    : t(E, <>Empty in <b>3 moves</b>! Each letter now has its move number — <b>that's the answer</b>.</>,
           <><b>3번</b>에 빈 줄! 각 글자에 연산 번호가 붙었죠 — <b>이게 답</b>이에요.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Wipe COWOWC → 3 moves", "COWOWC 지우기 → 3연산")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone="aha">{say}</Say>
      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>S = COWOWC</div>
      <Row>
        {chars.map((ch, i) => {
          const op = label[ch]; const assigned = op <= opsDone; const active = activeOp === op;
          return <Tile key={i} ch={ch} size={46}
            bg={active ? OPCOL[op] : "#fff"} bd={active ? OPCOL[op] : assigned ? OPCOL[op] : "#e2e8f0"}
            fg={active ? "#fff" : "#1f2937"} faded={assigned && !active} badge={assigned ? op : null} />;
        })}
      </Row>
      <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 }}>
        {s.kind === "op" && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 10, background: OPBG[s.op], border: `2px solid ${OPCOL[s.op]}` }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: OPCOL[s.op], fontFamily: "'JetBrains Mono',monospace", letterSpacing: 2 }}>{s.letter.repeat(N)}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: OPCOL[s.op] }}>= {s.letter}+{s.letter} ✓</span>
          </div>
        )}
        {s.kind === "done" && (
          <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "#065f46", letterSpacing: 3 }}>
            {chars.map((ch) => label[ch]).join(" ")}
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
