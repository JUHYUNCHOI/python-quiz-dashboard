import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";
import { StepFade } from "@/components/quest/StepFade";
import { t } from "@/components/quest/theme";

/* makedistinct 시뮬.

   왜 생겼나 (2026-09-21) — 선생님:
     *"내가 굳이 필요없는 퀴즈는 없애고 주절히 설명하기보다는 눈에 보이게끔 시뮬로 쉽게
       보여달라 했는데 전혀 안그런데"*
   그때까지 이 quest 는 시뮬이 0개였다. `sims.jsx` 파일 자체가 없었고,
   3쪽은 여섯 단계를 글로 나열했고, 4·5쪽은 퀴즈와 입력칸이었다.
   검토자 넷을 붙였지만 **아무에게도 "여기가 시뮬 자리인가" 를 안 물어서** 다 지나갔다.

   모양은 형제 quest 를 베꼈다 (`moohunt/sims.jsx`) — SimNav 단계(◀▶) + 말풍선,
   자동재생 없음. 근거: `memory/feedback_sim_style_consistency.md`
   말풍선은 지금 바뀌는 자리 바로 위에 둔다 — `memory/feedback_one_thing_changes_at_a_time.md`
*/

const A = "#2563eb";

function Say({ children, tone = "go" }) {
  const c = tone === "aha" ? { bg: "#ecfdf5", bd: "#6ee7b7", fg: "#065f46" }
          : tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : { bg: "#eff6ff", bd: "#93c5fd", fg: "#1e3a8a" };
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

/* 수 하나를 칸으로. 놓인 자리는 파랑, 아직 안 본 것은 회색, 지금 움직이는 것은 노랑. */
function Tile({ v, state, note }) {
  const c = state === "placed" ? { bg: "#dbeafe", bd: "#2563eb", fg: "#1e3a8a" }
          : state === "moving" ? { bg: "#fef9c3", bd: "#f59e0b", fg: "#92400e" }
          : { bg: "#f8fafc", bd: "#cbd5e1", fg: "#64748b" };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <div style={{
        width: 54, height: 54, borderRadius: 12,
        background: c.bg, border: `2px solid ${c.bd}`, color: c.fg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 21, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
        transition: "all .25s",
      }}>{v}</div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: c.fg, minHeight: 14 }}>{note || ""}</div>
    </div>
  );
}

/* ═══ 작은 수부터 놓아 보기 — 3쪽의 글 여섯 줄을 대신한다 ═══ */
export function PlaceOneByOneSim({ E }) {
  /* 샘플 [4,1,4,1] 을 그대로 쓴다. 2쪽이 "답이 왜 2 인지는 다음 쪽에서" 라고
     약속했기 때문이다 — 예제를 바꾸면 그 약속이 거짓말이 된다(2026-09-21 사고). */
  const steps = [
    { tiles: [["4"], ["1"], ["4"], ["1"]], st: ["idle", "idle", "idle", "idle"],
      ops: null,
      ko: "수 네 개예요. 4 가 둘, 1 이 둘 — 겹쳐요. K = 1 씩 더해서 전부 다르게 만들 거예요.",
      en: "Four numbers. Two 4s and two 1s — they clash. We will add K = 1 to make them all different." },
    { tiles: [["1"], ["1"], ["4"], ["4"]], st: ["idle", "idle", "idle", "idle"],
      ops: null, tone: "go",
      ko: "먼저 작은 수부터 줄을 세워요. 작은 것부터 자리를 잡아야 나중에 덜 움직여요.",
      en: "First line them up from the smallest. Settling the small ones first means less moving later." },
    { tiles: [["1"], ["1"], ["4"], ["4"]], st: ["placed", "idle", "idle", "idle"],
      note: ["그대로", "", "", ""], ops: 0,
      ko: "맨 앞 1 은 그대로 둬요. 앞에 아무도 없으니 옮길 까닭이 없어요. (0 회)",
      en: "The first 1 stays. Nothing is in front of it, so there is no reason to move it. (0 moves)" },
    { tiles: [["1"], ["2"], ["4"], ["4"]], st: ["placed", "moving", "idle", "idle"],
      note: ["", "1 → 2", "", ""], ops: 1,
      ko: "다음 1 은 앞의 1 과 같아요. 1 만큼 밀어서 2 로 만들어요. (1 회)",
      en: "The next 1 is the same as the one before. Push it by 1, to 2. (1 move)" },
    { tiles: [["1"], ["2"], ["4"], ["4"]], st: ["placed", "placed", "placed", "idle"],
      note: ["", "", "그대로", ""], ops: 1,
      ko: "다음 4 는 앞의 2 보다 이미 커요. 안 밀어도 돼요. (0 회)",
      en: "The next 4 is already bigger than 2. No need to push. (0 moves)" },
    { tiles: [["1"], ["2"], ["4"], ["5"]], st: ["placed", "placed", "placed", "moving"],
      note: ["", "", "", "4 → 5"], ops: 2,
      ko: "마지막 4 는 앞의 4 와 같아요. 1 만큼 밀어서 5 로 만들어요. (1 회)",
      en: "The last 4 is the same as the one before. Push it by 1, to 5. (1 move)" },
    { tiles: [["1"], ["2"], ["4"], ["5"]], st: ["placed", "placed", "placed", "placed"],
      ops: 2, tone: "aha",
      ko: "1, 2, 4, 5 — 다 달라요. 민 횟수는 모두 2 회. 앞 쪽 샘플의 답이 이거예요.",
      en: "1, 2, 4, 5 — all different. Two pushes in total. That is the sample answer." },
    { tiles: [["1"], ["2"], ["4"], ["5"], ["4"]], st: ["placed", "placed", "placed", "placed", "moving"],
      note: ["", "", "", "", "4 는?"], ops: 2, tone: "stuck",
      ko: "여기서 4 가 하나 더 있었다면? 1 도 2 도 4 도 5 도 이미 찼어요.",
      en: "What if there were one more 4? 1 and 2 and 4 and 5 are all taken." },
    { tiles: [["1"], ["2"], ["4"], ["5"], ["6"]], st: ["placed", "placed", "placed", "placed", "moving"],
      note: ["", "", "", "", "4 → 5 → 6"], ops: 4, tone: "aha",
      ko: "한 칸 밀면 5 라 아직 겹쳐요. 그래서 6 까지 — 한 번에 2 회예요. 이렇게 여러 번 미는 경우가 생겨요.",
      en: "One push only reaches 5, still taken. So it goes to 6 — two moves at once. Sometimes one number needs several pushes." },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Place them one by one, smallest first", "작은 수부터 하나씩 놓아 보기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
        <Say tone={s.tone}>{t(E, s.en, s.ko)}</Say>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {s.tiles.map((v, i) => (
            <Tile key={i} v={v[0]} state={s.st[i]} note={s.note ? s.note[i] : ""} />
          ))}
        </div>

        {s.ops !== null && (
          <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
            {t(E, "Moves so far: ", "지금까지 민 횟수: ")}
            <span style={{ fontSize: 18, color: A, fontFamily: "'JetBrains Mono',monospace" }}>{s.ops}</span>
          </div>
        )}
      </StepFade>
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══ K 가 2 면 누가 누구와 부딪히나 — 4쪽 퀴즈를 대신한다 ═══ */
export function WhoCanMeetSim({ E }) {
  /* 4쪽은 객관식 퀴즈였다. 선생님: "굳이 필요없는 퀴즈는 없애고 … 눈에 보이게끔".
     같은 것을 보여주되 답을 고르는 게 아니라 눈으로 보게 한다.
     `a = [5, 3, 5, 4], K = 2` — 2 를 더하면 홀수는 계속 홀수, 짝수는 계속 짝수다. */
  const nums = [5, 3, 5, 4];
  const steps = [
    { show: 0, ko: "수 네 개예요 — 5, 3, 5, 4. 이번엔 K = 2 씩 더해요.",
      en: "Four numbers — 5, 3, 5, 4. This time we add K = 2 each move." },
    { show: 1, ko: "5 에 2 를 더하면 7, 또 더하면 9 … 계속 홀수예요. 짝수는 절대 안 돼요.",
      en: "5 plus 2 is 7, then 9 … always odd. It can never become even." },
    { show: 2, ko: "4 도 마찬가지예요. 6, 8, 10 … 계속 짝수예요.",
      en: "Same for 4 — 6, 8, 10 … always even." },
    { show: 3, tone: "aha",
      ko: "그래서 홀수끼리만 서로 부딪혀요. 4 는 혼자라 아무하고도 안 겹쳐요.",
      en: "So only the odd ones can ever clash. The 4 is alone — it never meets anyone." },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const chain = (v) => [v, v + 2, v + 4, v + 6];

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "With K = 2, who can ever meet?", "K = 2 일 때, 누가 누구와 만날 수 있나")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
        <Say tone={s.tone}>{t(E, s.en, s.ko)}</Say>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", marginBottom: 10 }}>
          {nums.map((v, i) => {
            const odd = v % 2 === 1;
            const lit = s.show >= 3 || (s.show === 1 && odd) || (s.show === 2 && !odd);
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 7, padding: "5px 10px", borderRadius: 10,
                background: lit ? (odd ? "#eff6ff" : "#f0fdf4") : "#f8fafc",
                border: `1.5px solid ${lit ? (odd ? "#93c5fd" : "#86efac") : "#e2e8f0"}`,
                opacity: s.show === 0 ? 0.85 : 1, transition: "all .25s",
              }}>
                <Tile v={v} state={lit ? "placed" : "idle"} />
                {s.show >= 1 && lit && (
                  <div style={{ fontSize: 12.5, fontFamily: "'JetBrains Mono',monospace",
                    color: odd ? "#1e3a8a" : "#065f46", fontWeight: 700 }}>
                    → {chain(v).slice(1).join(" → ")} …
                  </div>
                )}
                {s.show >= 3 && (
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: odd ? "#1e3a8a" : "#065f46" }}>
                    {odd ? t(E, "odd", "홀수") : t(E, "even — alone", "짝수 — 혼자")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </StepFade>
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
