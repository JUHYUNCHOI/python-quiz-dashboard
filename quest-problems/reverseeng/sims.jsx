import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";
import { StepFade } from "@/components/quest/StepFade";
import { t } from "@/components/quest/theme";

/* reverseeng 시뮬.

   왜 생겼나 (2026-09-21) — 선생님:
     *"굳이 필요없는 퀴즈는 없애고 주절히 설명하기보다는 눈에 보이게끔 시뮬로 쉽게 보여달라"*
   pedagogy 검토도 같은 것을 짚었다 —
     · 이 quest 는 시뮬이 0개다. 원래 있던 `RevEngDeepAuditSim` 은 "문제와 안 맞는 모델"이라
       아무 데서도 안 쓰이는 죽은 코드로 남았고, 그 자리를 정적인 글이 채웠다.
     · 같은 설명이 네 번 반복된다(내레이션 2곳 + 코드 why + 코드 주석).
     · **"중복이 없어도 LIE 일 수 있다"** 는 이 문제의 진짜 함정을 어디서도 안 보여준다.

   그래서 둘을 만든다 — 떼어내기(peel) 를 눈으로 보는 것, 그리고 안 떼어지는 경우.
   모양은 형제 `moohunt/sims.jsx` 를 따랐다(SimNav ◀▶ + 말풍선, 자동재생 없음).
*/

const A = "#7c3aed";

function Say({ children, tone = "go" }) {
  const c = tone === "aha" ? { bg: "#ecfdf5", bd: "#6ee7b7", fg: "#065f46" }
          : tone === "stuck" ? { bg: "#fef2f2", bd: "#fca5a5", fg: "#7f1d1d" }
          : { bg: "#f5f3ff", bd: "#c4b5fd", fg: "#5b21b6" };
  return (
    <div style={{
      maxWidth: 470, margin: "6px auto 12px", padding: "10px 15px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
      fontSize: 13.5, fontWeight: 700, textAlign: "center",
      wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.7,
      boxShadow: "0 2px 10px rgba(0,0,0,.06)",
    }}>💬 {children}</div>
  );
}

/* 표의 한 줄 — 입력 글자들 + 출력. 떼어낸 줄은 흐리게, 지금 보는 줄은 노랑. */
function Row({ bits, out, state, mark }) {
  const c = state === "peeled" ? { bg: "#f1f5f9", bd: "#e2e8f0", fg: "#94a3b8" }
          : state === "hit" ? { bg: "#fef9c3", bd: "#f59e0b", fg: "#92400e" }
          : { bg: "#fff", bd: "#c4b5fd", fg: "#3730a3" };
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8, padding: "6px 12px",
      background: c.bg, border: `1.5px solid ${c.bd}`, borderRadius: 10,
      opacity: state === "peeled" ? 0.5 : 1, transition: "all .25s",
      textDecoration: state === "peeled" ? "line-through" : "none",
    }}>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, color: c.fg, letterSpacing: 2 }}>
        {bits}
      </span>
      <span style={{ color: c.fg, fontSize: 13 }}>→</span>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 900, color: c.fg }}>{out}</span>
      <span style={{ fontSize: 11, fontWeight: 800, color: c.fg, marginLeft: 4 }}>{mark || ""}</span>
    </div>
  );
}

/* ═══ ① 떼어내기를 눈으로 — 샘플 2번 (OK) ═══ */
export function PeelSim({ E }) {
  const rows = [["00", 0], ["01", 1], ["10", 1], ["11", 1]];
  /* st: 0=아직, 1=지금 보는 중, 2=떼어냄 */
  const steps = [
    { st: [0, 0, 0, 0], mark: ["", "", "", ""], rule: null,
      ko: "표가 네 줄이에요. 왼쪽이 입력, 오른쪽이 그 입력에 프로그램이 낸 답이에요.",
      en: "Four rows. Left is the input, right is what the program answered." },
    /* 2026-09-21: 여기서 바로 "첫 글자가 1 인 줄" 로 들어갔더니 학생이 막혔다 —
       *"왜 첫 번째로 변수[0]==1 을 시도했는지 이유가 없었다. 순서는 상관없어요,
       아무 조합이나 다 시도해서 되는 걸 떼면 돼요 라고 한 줄만 먼저 알려줬으면."*
       그래서 **고르는 방법**을 먼저 한 걸음으로 넣는다. */
    { st: [0, 0, 0, 0], mark: ["", "", "", ""], rule: null, tone: "go",
      ko: "어디부터 볼지는 정해져 있지 않아요. 첫 글자든 둘째 글자든, 0 이든 1 이든 — 되는 걸 찾을 때까지 다 해봐요.",
      en: "There is no fixed place to start. First letter or second, 0 or 1 — just try them until one works." },
    { st: [0, 0, 1, 1], mark: ["", "", "", ""], rule: null, tone: "go",
      ko: "여기서는 첫 글자가 1 인 줄부터 해볼게요 — 10 과 11 이에요.",
      en: "Here we try the rows whose first letter is 1 — that is 10 and 11." },
    { st: [0, 0, 1, 1], mark: ["", "", "답 1", "답 1"], rule: null, tone: "aha",
      ko: "둘 다 답이 1 이에요. 답이 같으니 if 하나로 묶을 수 있어요.",
      en: "Both answer 1. Same answer, so one if can cover them." },
    { st: [0, 0, 2, 2], mark: ["", "", "", ""], rule: "if 첫 글자 == 1 → 1",
      ruleEn: "if first letter == 1 → 1", tone: "aha",
      ko: "if 를 하나 만들고 그 두 줄을 표에서 떼어냈어요.",
      en: "We made one if and peeled those two rows off the table." },
    /* 2026-09-21 ux 실측(--sim): 여기서 규칙 상자가 **직전 걸음과 같은 글**을 그대로
       보여주면서(고침 전: rule="if 첫 글자==1→1") 표는 이미 새 후보(00·01)를 가리켜
       "바뀐 자리가 2군데로 흩어짐"(221px) 이 났다. 지금은 탐색 중이라 아직 규칙이
       없다 — 다른 탐색 걸음(idx2·3)처럼 null 로 되돌린다. */
    { st: [1, 1, 2, 2], mark: ["", "", "", ""], rule: null, tone: "go",
      ko: "남은 건 00 과 01 이에요. 이번엔 둘째 글자가 1 인 줄 — 01 하나예요.",
      en: "00 and 01 are left. Now the rows whose second letter is 1 — just 01." },
    { st: [1, 2, 2, 2], mark: ["", "", "", ""], rule: "if 둘째 글자 == 1 → 1",
      ruleEn: "if second letter == 1 → 1", tone: "aha",
      ko: "혼자니까 답이 같은 건 당연해요. 떼어내요.",
      en: "Alone, so of course the answers agree. Peel it." },
    { st: [2, 2, 2, 2], mark: ["", "", "", ""], rule: "else → 0", ruleEn: "else → 0", tone: "aha",
      ko: "마지막 00 한 줄은 else 로 받아요. 표가 비었어요 — 이런 프로그램이 정말 있어요. OK!",
      en: "The last row, 00, goes to else. The table is empty — such a program really exists. OK!" },
    /* 2026-09-21 학생 지적: "왜 순서 상관없는지 이유가 없다".
       처음엔 교환 논증을 **한 문장**으로만 붙였는데 pedagogy 가 물렀다 —
       그 걸음에 닿으면 표가 이미 전부 회색이라 *"다른 줄을 먼저 떼어도"* 가
       **가리킬 대상이 화면에 하나도 없다.** 말로만 하면 "그렇다고 치자" 가 된다.
       선생님 지시("주절히 설명하지 말고 눈에 보이게 시뮬로")대로
       **순서를 실제로 바꿔서 다시 떼어 보이는** 걸음 넷으로 바꾼다.
       ⚠️ pedagogy 가 준 예문은 틀렸다 — *"01 은 그래도 혼자 답 1"* 이라고 했는데
       둘째 글자가 1 인 줄은 01 **과 11 둘 다**다(00·01·10·11 중). 그래서
       *"결국 같은 묶음이 나와요"* 도 틀렸다 — 묶음은 **달라진다**.
       달라지지 않는 건 "끝까지 떼어지느냐" 다. 그게 이 문제의 진짜 요점이라
       예문을 안 쓰고 표로 직접 보인다. */
    { st: [0, 1, 0, 1], mark: ["", "", "", ""], rule: null, tone: "go", badge: true,
      ko: "표를 처음으로 되돌리고 순서를 바꿔볼게요. 이번엔 둘째 글자가 1 인 줄 — 01 과 11 이에요.",
      en: "Let's put the table back and change the order. This time, rows whose second letter is 1 — 01 and 11." },
    { st: [0, 1, 0, 1], mark: ["", "답 1", "", "답 1"], rule: null, tone: "aha", badge: true,
      ko: "둘 다 답이 1 이에요. 아까는 따로 떼었던 줄인데 이번엔 같이 묶여요.",
      en: "Both answer 1. These two were peeled separately before — this time they group together." },
    { st: [2, 2, 2, 2], mark: ["", "", "", ""], rule: "else → 0", ruleEn: "else → 0", tone: "aha", badge: true,
      ko: "떼어내요. 남은 10 은 첫 글자로, 00 은 else 로 — 이번에도 표가 비었어요.",
      en: "Peel them. The remaining 10 goes by its first letter and 00 by else — the table empties again." },
    /* 2026-09-21 pedagogy 재검토: 둘째 문장("지금 뗄 수 있는 줄은 나중에 떼도 그대로
       떼어지거든요")은 예 두 개로는 증명 안 되는 메커니즘 주장이라 뺀다. 본 것(두 번
       다 끝까지 비었다)까지만 말하고, 그 다음은 실용적 결론으로 남긴다. */
    { st: [2, 2, 2, 2], mark: ["", "", "", ""], rule: null, tone: "go", badge: true,
      ko: "묶음은 달라졌는데, 두 번 다 표가 끝까지 비었어요 — 순서를 바꿔도 답은 똑같이 OK 예요. 그래서 순서를 미리 정하지 않고, 지금 뗄 수 있는 걸 바로 떼면 돼요.",
      en: "The groups came out different, but both times the table emptied — a different order still answers OK. So there's no need to plan an order; just peel whatever works right now." },
    /* 2026-09-21 학생 지적: 코드 주석 `# 탐욕적으로 벗겨내기` 가 quest 어디서도
       설명 없이 등장한다 — 코드를 보기 전, 이 시뮬 안에서 먼저 이름을 붙인다. */
    { st: [2, 2, 2, 2], mark: ["", "", "", ""], rule: null, tone: "aha",
      ko: "이렇게 지금 당장 되는 것을 그때그때 바로 고르는 방법을 탐욕적(그리디) 방법이라고 불러요. 코드에서도 이 이름을 만나요.",
      en: "Always picking whatever works right now, without planning ahead, is called a greedy method — you'll meet that name in the code too." },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Peel the rows off, one if at a time", "if 하나씩 만들며 줄을 떼어내기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
        <Say tone={s.tone}>{t(E, s.en, s.ko)}</Say>
        {/* 2026-09-21 ux 실측(--sim): 규칙 상자가 표 **아래**(약 560~580px)에 있어서
            말풍선(약 300px)과 늘 220px 이상 떨어져 있었다 — 상자 글이 바뀌든 안 바뀌든
            둘 사이 거리 자체가 "바뀐 자리가 흩어짐" 경고를 계속 냈다. 말풍선 바로 아래,
            표보다 **위**로 옮겨서 "이번에 새로 나온 것"이 한 자리에 모이게 한다. */}
        {s.rule && (
          <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#5b21b6",
            background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 10,
            padding: "7px 12px", maxWidth: 330, margin: "0 auto 10px",
            fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, s.ruleEn, s.rule)}
          </div>
        )}
        {/* 2026-09-21 pedagogy: 순서를 바꿔 다시 떼는 구간(idx 8~11) 내내 "지금 재확인
            중" 임을 표 바로 위에 상시로 남긴다 — 한 걸음에서만 말하고 사라지면
            9/13 에서 표가 되살아나는 게 "방금 답이 틀렸었나?" 로 읽힐 수 있다. */}
        {s.badge && (
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span style={{ display: "inline-block", fontSize: 11.5, fontWeight: 800,
              padding: "4px 13px", borderRadius: 999, wordBreak: "keep-all",
              background: "#ecfeff", border: "1.5px solid #67e8f9", color: "#0e7490" }}>
              {t(E, "↺ Same table, different order", "↺ 순서만 바꿔 다시 확인")}
            </span>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", marginBottom: 10 }}>
          {rows.map(([b, o], i) => (
            <Row key={i} bits={b} out={o}
              state={s.st[i] === 2 ? "peeled" : s.st[i] === 1 ? "hit" : "idle"}
              mark={s.mark[i]} />
          ))}
        </div>
      </StepFade>
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══ ② 중복이 없어도 안 되는 경우 — 이 문제의 진짜 함정 ═══ */
export function StuckSim({ E }) {
  /* pedagogy 검토: *"입력이 전부 달라도(중복 없이) 여전히 LIE 일 수 있다는 것이
     이 문제의 진짜 함정인데, 그런 반례를 quest 어디에서도 안 보여준다."*
     원문 샘플 4번이 바로 그 경우다 — 00→0, 01→1, 10→1, 11→0. */
  const rows = [["00", 0], ["01", 1], ["10", 1], ["11", 0]];
  const steps = [
    { hit: [], mark: ["", "", "", ""],
      ko: "이번 표예요. 입력 네 개가 전부 달라요 — 앞의 검사는 통과해요.",
      en: "A new table. All four inputs are different — it passes the earlier check." },
    { hit: [2, 3], mark: ["", "", "답 1", "답 0"], tone: "stuck",
      ko: "첫 글자가 1 인 줄을 볼게요 — 10 은 답이 1, 11 은 답이 0. 답이 갈려서 if 하나로 못 묶어요.",
      en: "Look at the rows starting with 1 — 10 answers 1, but 11 answers 0. They disagree, so one if cannot cover them." },
    { hit: [0, 1], mark: ["답 0", "답 1", "", ""], tone: "stuck",
      ko: "첫 글자가 0 인 줄도 마찬가지예요 — 00 은 0, 01 은 1.",
      en: "Same for the rows with first letter 0 — 00 answers 0, 01 answers 1." },
    { hit: [1, 3], mark: ["", "답 1", "", "답 0"], tone: "stuck",
      ko: "둘째 글자로 걸어도 갈려요. 01 은 1, 11 은 0 이에요.",
      en: "Keying on the second letter splits too — 01 answers 1 but 11 answers 0." },
    { hit: [], mark: ["", "", "", ""], tone: "stuck",
      ko: "어느 '글자=값' 으로 걸어도 한 줄도 못 떼요. 그래서 LIE 예요. 입력이 다 달라도 이럴 수 있어요.",
      en: "Whatever letter=value we try, not one row peels off. So it is a LIE — even with all inputs different." },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "All inputs different — and still a LIE", "입력이 다 달라도 LIE 일 수 있어요")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
        <Say tone={s.tone}>{t(E, s.en, s.ko)}</Say>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", marginBottom: 10 }}>
          {rows.map(([b, o], i) => (
            <Row key={i} bits={b} out={o} state={s.hit.includes(i) ? "hit" : "idle"} mark={s.mark[i]} />
          ))}
        </div>
      </StepFade>
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
