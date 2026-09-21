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

/* 행 한 줄 — 입력 글자들 + 출력. 떼어낸 행은 흐리게, 지금 보는 행은 노랑. */
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
    { st: [0, 0, 1, 1], mark: ["", "", "", ""], rule: null, tone: "go",
      ko: "첫 글자가 1 인 줄만 볼게요 — 10 과 11 이에요.",
      en: "Look only at the rows whose first letter is 1 — that is 10 and 11." },
    { st: [0, 0, 1, 1], mark: ["", "", "답 1", "답 1"], rule: null, tone: "aha",
      ko: "둘 다 답이 1 이에요. 답이 같으니 if 하나로 묶을 수 있어요.",
      en: "Both answer 1. Same answer, so one if can cover them." },
    { st: [0, 0, 2, 2], mark: ["", "", "", ""], rule: "if 첫 글자 == 1 → 1",
      ruleEn: "if first letter == 1 → 1", tone: "aha",
      ko: "if 를 하나 만들고 그 두 줄을 표에서 떼어냈어요.",
      en: "We made one if and peeled those two rows off the table." },
    { st: [1, 1, 2, 2], mark: ["", "", "", ""], rule: "if 첫 글자 == 1 → 1",
      ruleEn: "if first letter == 1 → 1", tone: "go",
      ko: "남은 건 00 과 01 이에요. 이번엔 둘째 글자가 1 인 줄 — 01 하나예요.",
      en: "00 and 01 are left. Now the rows whose second letter is 1 — just 01." },
    { st: [1, 2, 2, 2], mark: ["", "", "", ""], rule: "if 둘째 글자 == 1 → 1",
      ruleEn: "if second letter == 1 → 1", tone: "aha",
      ko: "혼자니까 답이 같은 건 당연해요. 떼어내요.",
      en: "Alone, so of course the answers agree. Peel it." },
    { st: [2, 2, 2, 2], mark: ["", "", "", ""], rule: "else → 0", ruleEn: "else → 0", tone: "aha",
      ko: "마지막 00 한 줄은 else 로 받아요. 표가 비었어요 — 이런 프로그램이 정말 있어요. OK!",
      en: "The last row, 00, goes to else. The table is empty — such a program really exists. OK!" },
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
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", marginBottom: 10 }}>
          {rows.map(([b, o], i) => (
            <Row key={i} bits={b} out={o}
              state={s.st[i] === 2 ? "peeled" : s.st[i] === 1 ? "hit" : "idle"}
              mark={s.mark[i]} />
          ))}
        </div>
        {s.rule && (
          <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#5b21b6",
            background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 10,
            padding: "7px 12px", maxWidth: 330, margin: "0 auto 8px",
            fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, s.ruleEn, s.rule)}
          </div>
        )}
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
      ko: "첫 글자가 1 인 줄: 10 은 답이 1, 11 은 답이 0. 답이 갈려요. if 로 못 묶어요.",
      en: "Rows with first letter 1: 10 answers 1, but 11 answers 0. They disagree — one if cannot cover them." },
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
