// COW Splits (Dec 2025 Bronze #2) 용 시뮬 — 🔒 USACO_VERIFIED components.jsx 는
// 건드리지 않고 여기에만 (photoshoot25 / checkups 와 같은 방식).
//
// 학생 이해 최우선 (선생님 2026-08-11: "학생들이 이해하기 쉬운거에 집중해"):
//   ① SquareSim  — '사각 문자열 = Y+Y' 가 뭔지, '지우기 = 사각 부분수열 빼기'
//   ② LetterGroupSim — 핵심 풀이. C→CC, O→OO, W→WW 3번에 비우기 (M=3)

import { t } from "@/components/quest/theme";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#059669";
const OPCOL = { 1: "#ef4444", 2: "#f59e0b", 3: "#8b5cf6" };   // C / O / W 연산 색
const OPBG  = { 1: "#fef2f2", 2: "#fffbeb", 3: "#f5f3ff" };

/* 한 글자 타일 */
function Tile({ ch, size = 42, bg = "#fff", bd = "#e2e8f0", fg = "#1f2937", faded = false, badge = null }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center",
      justifyContent: "center", borderRadius: 9, background: bg, border: `2px solid ${bd}`,
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: size * 0.5, color: fg,
      opacity: faded ? 0.32 : 1, transition: "all .15s" }}>
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

/* ═══════════════════════════════════════════════════════════════
   SquareSim — 어려운 말 '사각 부분수열' 을 둘로 쪼개서:
   ① 부분수열 = 글자 골라 빼기(떨어져도 OK)   ② 사각 = Y+Y   ③ 둘을 합침
   ═══════════════════════════════════════════════════════════════ */
export function SquareSim({ E }) {
  const steps = [
    { kind: "pick" },                          // 부분수열 = 골라 빼기
    { kind: "def", str: "CC", Y: "C" },        // 사각 = C+C
    { kind: "def", str: "COWCOW", Y: "COW" },  // 사각 = COW+COW
    { kind: "bad", str: "COW" },               // 홀수 → 사각 아님
    { kind: "combine" },                        // 한 연산 = 사각 되게 골라 빼기
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const bubble =
    s.kind === "pick" ? t(E,
        <>Erasing = <b>pick some letters</b> and take them out. They don't have to be next to each other — just keep the order. (This picked group is called a <b>subsequence</b>.)</>,
        <>지우기 = S 에서 <b>글자를 몇 개 골라</b> 빼는 거예요. 붙어있지 않아도 돼요 — 순서만 지키면. (이렇게 골라낸 묶음 = <b>부분수열</b>.)</>)
    : s.kind === "def" ? t(E,
        <>But you can't pick just anything — the picked string must be a <b>square</b>: the same piece <b>Y</b> twice (<b>Y+Y</b>). Here Y = <b>{s.Y}</b>.</>,
        <>근데 아무거나 못 골라요 — 골라낸 게 <b>사각</b> 이어야 해요: 같은 조각 <b>Y</b> 를 두 번(<b>Y+Y</b>). 여기서 Y = <b>{s.Y}</b>.</>)
    : s.kind === "bad" ? t(E,
        <><b>COW</b>? Length 3 is <b>odd</b> — can't split into two equal halves → <b>not a square</b> ✗</>,
        <><b>COW</b> 는? 길이 3, <b>홀수</b> 라 반으로 뚝같이 못 나눠요 → <b>사각 아님</b> ✗</>)
    : t(E,
        <>So one erase = <b>pick letters that form a square</b>. E.g. pick the two <b>C</b>'s (far apart!) → <b>CC</b> = C+C ✓. Erase them together.</>,
        <>그래서 한 연산 = <b>사각이 되도록 글자를 골라</b> 빼기. 예: 떨어진 <b>C</b> 두 개 골라 → <b>CC</b> = C+C ✓. 한꺼번에 지움.</>);

  const pickStr = "COWOWC".split("");

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "'Erase a square' — what does it mean?", "'사각을 지운다' — 무슨 뜻?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />

      <div style={{ maxWidth: 520, margin: "6px auto 18px", padding: "12px 16px", borderRadius: 11,
        background: "#ecfdf5", border: "1.5px solid #6ee7b7", color: "#065f46",
        fontSize: 13, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
        {bubble}
      </div>

      {/* ① pick / ③ combine : 문자열에서 C 두 개 골라내 아래로 빼내기 */}
      {(s.kind === "pick" || s.kind === "combine") && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>
            S = COWOWC
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 7 }}>
            {pickStr.map((ch, i) => {
              const pick = ch === "C";
              return <Tile key={i} ch={ch} size={46}
                bg={pick ? OPCOL[1] : "#fff"} bd={pick ? OPCOL[1] : "#e2e8f0"}
                fg={pick ? "#fff" : "#cbd5e1"} />;
            })}
          </div>
          <div style={{ textAlign: "center", fontSize: 20, color: OPCOL[1], margin: "4px 0" }}>↓</div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
            <Tile ch="C" size={44} bg={OPCOL[1]} bd={OPCOL[1]} fg="#fff" />
            <Tile ch="C" size={44} bg={OPCOL[1]} bd={OPCOL[1]} fg="#fff" />
            <span style={{ fontSize: 13, fontWeight: 800, color: OPCOL[1], wordBreak: "keep-all", marginLeft: 6 }}>
              {s.kind === "pick"
                ? t(E, "= subsequence (picked, in order)", "= 부분수열 (순서 유지)")
                : t(E, "CC = C+C  ✓ square → erase!", "CC = C+C  ✓ 사각 → 지운다!")}
            </span>
          </div>
        </div>
      )}

      {/* ② def : 사각 (두 절반 =) */}
      {s.kind === "def" && (() => {
        const arr = s.str.split("");
        const half = arr.length / 2;
        return (
          <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
              {arr.map((ch, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center" }}>
                  {i === half && <span style={{ margin: "0 10px", fontSize: 22, fontWeight: 800, color: "#059669" }}>=</span>}
                  <Tile ch={ch} size={46} bg={i >= half ? OPBG[1] : "#fff"} bd="#059669" fg="#1f2937" />
                </span>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 14, fontSize: 13.5, fontWeight: 800, color: "#059669", fontFamily: "'JetBrains Mono',monospace" }}>
              {t(E, `${s.str} = ${s.Y}+${s.Y}   ✓ square`, `${s.str} = ${s.Y}+${s.Y}   ✓ 사각`)}
            </div>
          </>
        );
      })()}

      {/* ② bad : 홀수 → 반 못 나눠 */}
      {s.kind === "bad" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {s.str.split("").map((ch, i) => (
              <Tile key={i} ch={ch} size={46} bg="#fff" bd="#dc2626" fg="#1f2937" />
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 13.5, fontWeight: 800, color: "#dc2626", fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, `length ${s.str.length} (odd) → can't halve → ✗ not square`, `길이 ${s.str.length} (홀수) → 반으로 못 나눠 → ✗ 사각 아님`)}
          </div>
        </div>
      )}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LetterGroupSim — 핵심 풀이. S 를 한 번에 못 지우면 글자별 3번에.
   예제 S = COWOWC (N=2). C→CC, O→OO, W→WW. 각각 사각 → M=3.
   ═══════════════════════════════════════════════════════════════ */
export function LetterGroupSim({ E }) {
  const S = "COWOWC";
  const chars = S.split("");
  const label = { C: 1, O: 2, W: 3 };
  const N = chars.filter((c) => c === "C").length; // 2

  const steps = [
    { kind: "intro" },
    { kind: "op", op: 1, letter: "C" },
    { kind: "op", op: 2, letter: "O" },
    { kind: "op", op: 3, letter: "W" },
    { kind: "done" },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const opsDone = s.kind === "op" ? s.op : s.kind === "done" ? 3 : 0;
  const activeOp = s.kind === "op" ? s.op : null;

  const bubble =
    s.kind === "intro" ? t(E,
        <>S isn't a square (halves differ), so we can't erase it in one op. Trick: <b>erase one letter-type at a time</b>.</>,
        <>S 는 사각이 아니라(앞·뒤 절반이 다름) 한 번에 못 지워요. 트릭: <b>글자 종류별로 한 번씩</b> 지우기.</>)
    : s.kind === "op" ? t(E,
        <>Op <b>{s.op}</b>: pick every <b>{s.letter}</b> → <b>{s.letter.repeat(N)}</b> = <b>{s.letter.repeat(N / 2)}</b>+<b>{s.letter.repeat(N / 2)}</b>, a square ✓ (N is even, so the count is even). Erase them together.</>,
        <>연산 <b>{s.op}</b>: 모든 <b>{s.letter}</b> 골라내기 → <b>{s.letter.repeat(N)}</b> = <b>{s.letter.repeat(N / 2)}</b>+<b>{s.letter.repeat(N / 2)}</b>, 사각 ✓ (N 짝수라 개수도 짝수). 한꺼번에 지워요.</>)
    : t(E,
        <>Empty in <b>3</b> ops → <b>M = 3</b>. Every letter gets its op number below — that's the answer we print.</>,
        <><b>3</b> 번에 다 지웠어요 → <b>M = 3</b>. 각 글자에 연산 번호가 붙었죠 — 이걸 출력하면 답.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Erase by letter → 3 ops", "글자별로 지우기 → 3연산")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />

      <div style={{ maxWidth: 540, margin: "6px auto 8px", padding: "12px 16px", borderRadius: 11,
        background: "#ecfdf5", border: "1.5px solid #6ee7b7", color: "#065f46",
        fontSize: 13, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
        {bubble}
      </div>

      <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", textAlign: "center", marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>
        S = COWOWC   (N = {N})
      </div>

      {/* 문자열 타일 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
        {chars.map((ch, i) => {
          const op = label[ch];
          const assigned = op <= opsDone;
          const active = activeOp === op;
          const doneEarlier = assigned && !active;
          return (
            <Tile key={i} ch={ch} size={46}
              bg={active ? OPCOL[op] : "#fff"}
              bd={active ? OPCOL[op] : assigned ? OPCOL[op] : "#e2e8f0"}
              fg={active ? "#fff" : "#1f2937"}
              faded={doneEarlier}
              badge={assigned ? op : null} />
          );
        })}
      </div>

      {/* 골라낸 조각 */}
      <div style={{ height: 54, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 }}>
        {s.kind === "op" && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 10,
            background: OPBG[s.op], border: `2px solid ${OPCOL[s.op]}` }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: OPCOL[s.op], fontFamily: "'JetBrains Mono',monospace", letterSpacing: 2 }}>
              {s.letter.repeat(N)}
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: OPCOL[s.op], wordBreak: "keep-all" }}>
              = {s.letter.repeat(N / 2)}+{s.letter.repeat(N / 2)} {t(E, "square ✓", "사각 ✓")}
            </span>
          </div>
        )}
        {s.kind === "done" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
              {t(E, "answer (op number per letter):", "답 (글자별 연산 번호):")}
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "#065f46", letterSpacing: 3 }}>
              {chars.map((ch) => label[ch]).join(" ")}
            </div>
          </div>
        )}
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DecideSim — 언제 몇 번? 세 경우를 단계로.
   ① N 홀수 → 못 비움(-1)   ② S 통째로 사각 → 1번(M=1)   ③ 아니면 → 글자 트릭
   ═══════════════════════════════════════════════════════════════ */
export function DecideSim({ E }) {
  const steps = [{ kind: "parity" }, { kind: "m1" }, { kind: "bridge" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const bubble =
    s.kind === "parity" ? t(E,
        <>Each op erases an <b>even</b> count (a square Y+Y). If <b>N is odd</b>, total 3N is odd → one letter is always left over → <b>impossible, print −1</b>.</>,
        <>한 번 지우기는 <b>짝수 개</b>(사각 Y+Y)를 지워요. <b>N 이 홀수</b>면 전체 3N 도 홀수 → 항상 한 글자가 남아요 → <b>못 비움, −1 출력</b>.</>)
    : s.kind === "m1" ? t(E,
        <>N even, and <b>S itself is a square</b> (first half = second half)? Then erase it all at once → <b>M = 1</b>, tag every letter 1.</>,
        <>N 짝수이고 <b>S 자체가 사각</b>(앞 절반 = 뒤 절반)이면? 한 번에 다 지움 → <b>M = 1</b>, 모든 글자에 1.</>)
    : t(E,
        <>But if the halves <b>differ</b>, one op isn't enough. We split it up by letter → next.</>,
        <>그런데 앞·뒤가 <b>다르면</b> 한 번으론 안 돼요. 글자별로 나눠 지워요 → 다음.</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "When? How many ops?", "언제? 몇 번?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />

      <div style={{ maxWidth: 540, margin: "6px auto 18px", padding: "12px 16px", borderRadius: 11,
        background: "#ecfdf5", border: "1.5px solid #6ee7b7", color: "#065f46",
        fontSize: 13, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
        {bubble}
      </div>

      {/* ① 홀수 → -1 : COW(길이 3) 에서 짝수 지워도 1개 남음 */}
      {s.kind === "parity" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "N = 1 (odd) → S = COW, length 3", "N = 1 (홀수) → S = COW, 길이 3")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {["C", "O", "W"].map((ch, i) => (
              <Tile key={i} ch={ch} size={46}
                bg={i < 2 ? "#f1f5f9" : "#fef2f2"} bd={i < 2 ? "#cbd5e1" : "#ef4444"}
                fg={i < 2 ? "#94a3b8" : "#dc2626"} faded={i < 2} />
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 13.5, fontWeight: 800, color: "#dc2626", fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "erase 2 → 1 left → can't reach 0 → −1", "2 개 지움 → 1 개 남음 → 0 못 됨 → −1")}
          </div>
        </div>
      )}

      {/* ② S 사각 → M=1 : COWCOW 앞==뒤 */}
      {s.kind === "m1" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "N = 2 → S = COWCOW", "N = 2 → S = COWCOW")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}>
            {"COWCOW".split("").map((ch, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center" }}>
                {i === 3 && <span style={{ margin: "0 10px", fontSize: 22, fontWeight: 800, color: "#059669" }}>=</span>}
                <Tile ch={ch} size={46} bg="#ecfdf5" bd="#059669" fg="#065f46" badge={1} />
              </span>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 13.5, fontWeight: 800, color: "#059669", fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "COW = COW → all op 1 → M = 1", "COW = COW → 모두 연산 1 → M = 1")}
          </div>
        </div>
      )}

      {/* ③ 앞≠뒤 → 글자 트릭으로 */}
      {s.kind === "bridge" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "N = 2 → S = COWOWC", "N = 2 → S = COWOWC")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}>
            {"COWOWC".split("").map((ch, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center" }}>
                {i === 3 && <span style={{ margin: "0 10px", fontSize: 22, fontWeight: 800, color: "#dc2626" }}>≠</span>}
                <Tile ch={ch} size={46} bg="#fff" bd="#dc2626" fg="#1f2937" />
              </span>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 13.5, fontWeight: 800, color: "#dc2626", fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "COW ≠ OWC → split by letter →", "COW ≠ OWC → 글자별로 나누기 →")}
          </div>
        </div>
      )}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   IntroSim — 첫 페이지. "이게 무슨 문제야?" 를 완전한 데모 한 판으로.
   글자 줄을 '지우기'로 다 비우는 게임. 적은 횟수로. (COWCOW → 1번)
   ═══════════════════════════════════════════════════════════════ */
export function IntroSim({ E }) {
  const arr = "COWCOW".split("");
  const steps = [{ kind: "what" }, { kind: "move" }, { kind: "empty" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const bubble =
    s.kind === "what" ? t(E,
        <>Bessie has a row of letters <b>S</b> (only C, O, W). <b>Goal: erase them all</b> — empty the row — in as <b>few moves</b> as possible.</>,
        <>Bessie 앞에 글자 줄 <b>S</b> 가 있어요 (C, O, W 만). <b>목표: 다 지워서</b> 빈 줄 만들기 — 되도록 <b>적은 횟수</b>로.</>)
    : s.kind === "move" ? t(E,
        <>One <b>move</b> erases letters that form <b>the same piece twice</b>. Here <b>COWCOW = COW + COW</b> — so one move wipes the whole row!</>,
        <>한 번의 <b>지우기</b> = <b>같은 묶음을 두 번</b> 이룬 글자들을 빼요. 여기 <b>COWCOW = COW + COW</b> — 그래서 한 번에 통째로!</>)
    : t(E,
        <>Empty in <b>1 move</b>! But if the front and back <b>don't</b> match, we need more moves — that's the puzzle. (Impossible → −1.)</>,
        <><b>1번</b>에 빈 줄! 근데 앞·뒤가 <b>안 맞으면</b> 여러 번 필요해요 — 그게 이 문제의 핵심. (못 지우면 −1.)</>);

  const half = arr.length / 2;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 26 }}>🐄✂️</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#065f46" }}>{t(E, "COW Splits — the erase game", "COW 분할 — 지우기 게임")}</div>
        <div style={{ fontSize: 10.5, color: "#94a3b8", marginTop: 1 }}>USACO Dec 2025 Bronze #2</div>
      </div>

      <div style={{ maxWidth: 520, margin: "4px auto 18px", padding: "12px 16px", borderRadius: 11,
        background: "#ecfdf5", border: "1.5px solid #6ee7b7", color: "#065f46",
        fontSize: 13, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
        {bubble}
      </div>

      {/* 글자 줄 (move 스텝은 반으로 나눠 =, empty 스텝은 사라짐) */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, minHeight: 60, flexWrap: "wrap" }}>
        {s.kind === "empty" ? (
          <div style={{ fontSize: 15, fontWeight: 800, color: "#059669", fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "( empty row )  ✓  cleared in 1 move", "( 빈 줄 )  ✓  1번에 비움")}
          </div>
        ) : (
          arr.map((ch, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              {s.kind === "move" && i === half && (
                <span style={{ margin: "0 10px", fontSize: 22, fontWeight: 800, color: "#059669" }}>=</span>
              )}
              <Tile ch={ch} size={48}
                bg={s.kind === "move" ? (i >= half ? "#ecfdf5" : "#fff") : "#fff"}
                bd={s.kind === "move" ? "#059669" : "#cbd5e1"} fg="#1f2937" />
            </span>
          ))
        )}
      </div>

      {s.kind === "move" && (
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 13.5, fontWeight: 800, color: "#059669", fontFamily: "'JetBrains Mono',monospace" }}>
          COWCOW = COW + COW  →  {t(E, "erase all at once", "한 번에 다 지움")}
        </div>
      )}

      <div style={{ maxWidth: 520, margin: "18px auto 0", fontSize: 11, color: "#64748b", textAlign: "center", wordBreak: "keep-all", lineHeight: 1.55 }}>
        {t(E, "(S is made of N blocks, each COW / OWC / WCO. Output: how many moves M, and which move erased each letter.)",
             "(S 는 N 개 블록, 각 블록은 COW / OWC / WCO. 출력: 지우기 횟수 M, 그리고 각 글자가 몇 번째 지우기였는지.)")}
      </div>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
