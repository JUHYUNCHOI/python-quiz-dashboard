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
      whiteSpace: "pre-line",
      boxShadow: "0 2px 10px rgba(0,0,0,.06)",
    }}>💬 {children}</div>
  );
}

/* 수 하나를 칸으로. 놓인 자리는 파랑, 아직 안 본 것은 회색, 지금 움직이는 것은 노랑,
   묶음이 짝수 쪽임을 보일 때만 초록(even) — WhoCanMeetSim 의 홀/짝 묶음 표시용. */
function Tile({ v, state, note }) {
  const c = state === "placed" ? { bg: "#dbeafe", bd: "#2563eb", fg: "#1e3a8a" }
          : state === "moving" ? { bg: "#fef9c3", bd: "#f59e0b", fg: "#92400e" }
          : state === "even" ? { bg: "#dcfce7", bd: "#16a34a", fg: "#065f46" }
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
      note: [t(E, "stays", "그대로"), "", "", ""], ops: 0,
      ko: "맨 앞 1 은 그대로 둬요. 앞에 아무도 없으니 옮길 까닭이 없어요. (0 회)",
      en: "The first 1 stays. Nothing is in front of it, so there is no reason to move it. (0 moves)" },
    { tiles: [["1"], ["2"], ["4"], ["4"]], st: ["placed", "moving", "idle", "idle"],
      note: ["", "1 → 2", "", ""], ops: 1,
      ko: "다음 1 은 앞의 1 과 같아요. 1 만큼 밀어서 2 로 만들어요. (1 회)",
      en: "The next 1 is the same as the one before. Push it by 1, to 2. (1 move)" },
    { tiles: [["1"], ["2"], ["4"], ["4"]], st: ["placed", "placed", "placed", "idle"],
      note: ["", "", t(E, "stays", "그대로"), ""], ops: 1,
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
      /* 2026-09-22 학생 지적: "있었다면" 을 놓치고 빨리 읽으면 원래 문제(수 4개) 답이
         4 인 줄 착각한다. 가정임을 문장 맨 앞 "만약" + note 태그로 눈에 띄게 한다.
         (여기 tone="stuck" 이 이미 색으로도 구분하지만, 문장을 놓치면 색만으론 안 잡혔다.) */
      note: ["", "", "", "", t(E, "one more 4?", "만약 4 가?")], ops: 2, tone: "stuck",
      ko: "만약 여기서 4 가 하나 더 있었다면?\n(원래 문제 수는 그대로 4개예요 — 이건 가정이에요)\n1, 2, 4, 5 는 이미 찼어요.",
      en: "Suppose there were one more 4 here.\n(This is a what-if — the original problem still has 4 numbers.)\n1, 2, 4, 5 are already taken." },
    { tiles: [["1"], ["2"], ["4"], ["5"], ["6"]], st: ["placed", "placed", "placed", "placed", "moving"],
      note: ["", "", "", "", "4 → 5 → 6"], ops: 4, tone: "aha",
      ko: "한 칸 밀면 5 라 아직 겹쳐요. 그래서 6 까지 — 한 번에 2 회예요. 이렇게 여러 번 미는 경우가 생겨요.",
      en: "One push only reaches 5, still taken. So it goes to 6 — two moves at once. Sometimes one number needs several pushes." },
    /* 2026-09-22 학생 지적(3차 재검증): 코드에서 (cur - vals[i]) // k 를 처음 볼 때 막혔다.
       "그렇다니까" 로 결론만 되짚는 말풍선(components.jsx hi:[22,24])은 두 번째 실패였다.
       처방은 말이 아니라 숫자 — 이 장면의 실제 값(4 에서 6 까지, K=1)으로 나눗셈을
       미리 한 번 보여준다.
       2026-09-22 두 번째 처방(같은 날, PM 지시) — 뒤 4줄("K 가 2 라고 가정")을
       지웠다. 가정 위에 가정이라 학생이 여기서 그만두고 싶어 했다. K≠1 인 실제
       장면은 5쪽(WhoCanMeetSim, [3,3,3,4] K=2)에서 숫자로 보여주므로,
       여기는 예고만 하고 넘긴다. */
    { tiles: [["1"], ["2"], ["4"], ["5"], ["6"]], st: ["placed", "placed", "placed", "placed", "placed"],
      note: ["", "", "", "", "(6-4) ÷ 1"], ops: 4, tone: "aha",
      ko: "자리는 4 → 5 → 6 으로 한 칸씩만 밀린 것처럼 보이지만,\n4 가 실제로 밀린 횟수는 (6-4) ÷ 1 = 2 회예요.\nK 가 1 이 아니면 어떻게 되는지는 곧 봐요.",
      en: "The slot only looks like it moves one step, 4 → 5 → 6,\nbut 4 was really pushed (6-4) / 1 = 2 times.\nWhat happens when K isn't 1 — that's coming up soon." },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Place them one by one, smallest first", "작은 수부터 하나씩 놓아 보기")}
 />
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

/* ═══ K 가 2 면 누가 누구와 부딪히나 — 옛 퀴즈 자리를 대신한다
   (2026-09-22 순서 개편으로 3쪽·브루트 코드 다음, 5번째 쪽에 온다) ═══ */
export function WhoCanMeetSim({ E }) {
  /* 원래 객관식 퀴즈였다. 선생님: "굳이 필요없는 퀴즈는 없애고 … 눈에 보이게끔".
     같은 것을 보여주되 답을 고르는 게 아니라 눈으로 보게 한다.

     2026-09-22 재설계 — 옛 예제 [5,3,5,4], K=2 는 답이 항상 1 회라 몫이 늘 1 이었다.
     "(거리) ÷ K 가 2 이상인 장면이 이 quest 전체에 없다" 는 지적으로,
     예제를 [3,3,3,4], K=2 로 바꿨다. 전수 검산: 답 3 회, 최종 자리값 3,5,7,4,
     셋째 3 이 2 회 밀려 7 이 된다 → (7-3) ÷ 2 = 2.

     세로 카드 쌓기 → **가로 한 줄**로 바꾼다. 세로 배치는 걸음마다 활성 카드가
     아래로 내려가 흩어짐이 250~360px 였다(`feedback_one_thing_changes_at_a_time` 위반).
     같은 도구로 잰 PlaceOneByOneSim(가로 한 줄)은 최대 157px 다.

     [3,3,3] 이 전부 같은 숫자라 "그 칸" 을 가리킬 말이 없다 — 그래서 서수
     (첫째~넷째)를 1걸음부터 계속 단다. Tile 의 note 슬롯만 쓰고 새 위젯은
     만들지 않는다. 묶음 색(홀수=파랑, 짝수=초록)은 자리(index) 로 고정 —
     값이 밀려도 홀/짝은 안 바뀌므로 index 로 정해도 항상 맞는다. */
  const ord = (i) => [t(E, "1st", "첫째"), t(E, "2nd", "둘째"), t(E, "3rd", "셋째"), t(E, "4th", "넷째")][i];
  // st(i) 로 각 칸 색을 정한다: 아직 안 본 짝수 칸만 "even"(초록), 나머지는 홀수 묶음 표시 or 실제 진행 상태.
  const steps = [
    { tiles: [3, 3, 3, 4], st: ["idle", "idle", "idle", "idle"],
      extra: ["", "", "", ""],
      ko: "수 네 개예요 — 3, 3, 3, 4. 이번엔 K = 2 씩 더해요.",
      en: "Four numbers — 3, 3, 3, 4. This time we add K = 2 each move." },
    { tiles: [3, 3, 3, 4], st: ["placed", "placed", "placed", "idle"],
      extra: ["", "", t(E, "→5→7→9…", "→5→7→9…"), ""],
      /* 2026-09-23 선생님 지적: "K=1 일 때는 홀수가 짝수 되었다가 홀수 되었다 하지
         않나?" — 맞는 말인데 화면에 K=1 비교가 없었다(3쪽 PlaceOneByOneSim 은
         샘플 [4,1,4,1] 이라 K=1 로 4→5→6 을 이미 보여준 적 있다). 비교 대상을
         같은 값 3 으로 넣는다 — 새 숫자를 들이면 "어디서 온 숫자지" 가 또 난다. */
      ko: "K 가 1 이면 3 → 4 → 5 → 6, 홀수·짝수가 번갈아요.\nK 가 2 면 3 에 2 를 더해 5, 또 더해 7 … 계속 홀수예요.\n2 는 짝수라서, 더해도 홀짝이 안 바뀌어요.",
      en: "With K = 1, 3 → 4 → 5 → 6 — odd and even alternate.\nWith K = 2, 3 plus 2 is 5, then 7 … always odd.\n2 is even, so adding it never changes odd or even." },
    { tiles: [3, 3, 3, 4], st: ["placed", "placed", "placed", "even"],
      extra: ["", "", "", t(E, "→6→8→10…", "→6→8→10…")],
      ko: "4 도 마찬가지예요. 6, 8, 10 … 계속 짝수예요. 짝지을 다른 짝수가 없어요.",
      en: "Same for 4 — 6, 8, 10 … always even. There is no other even number for it to pair with." },
    { tiles: [3, 3, 3, 4], st: ["placed", "placed", "placed", "even"],
      extra: ["", "", "", ""], tone: "aha",
      ko: "홀수 셋이 한 묶음, 짝수 하나가 다른 묶음이에요. 서로는 절대 안 부딪혀요.",
      en: "The three odds are one group, the one even is another. They never clash with each other." },
    { tiles: [3, 3, 3, 4], st: ["placed", "placed", "placed", "even"],
      extra: [t(E, "· stays", "· 그대로"), "", "", ""],
      ko: "묶음 안에서도 작은 값부터 하나씩 놓아요. 첫째 3 은 맨 앞이라 그대로예요. (0 회)",
      en: "Inside a group too, we settle the smallest value first. The first 3 is at the front, so it stays. (0 moves)" },
    { tiles: [3, 5, 3, 4], st: ["placed", "moving", "placed", "even"],
      extra: ["", "· 3→5", "", ""], ops: 1,
      ko: "둘째 3 은 첫째와 같아요. 2 만큼 밀어서 5 로 만들어요. (1 회)",
      en: "The second 3 matches the first. Push it by 2, to 5. (1 move)" },
    { tiles: [3, 5, 7, 4], st: ["placed", "placed", "moving", "even"],
      extra: ["", "", "· 3→5→7", ""], formula: "(7-3) ÷ 2 = 2", ops: 3,
      ko: "셋째 3 은 5 도 이미 찼어요. 그래서 7 까지 — 한 번에 2 회예요. (7-3) ÷ 2 = 2.",
      en: "The third 3 finds 5 already taken too. So it goes to 7 — two moves at once. (7-3) / 2 = 2." },
    { tiles: [3, 5, 7, 4], st: ["placed", "placed", "placed", "placed"],
      extra: ["", "", "", ""], ops: 3, tone: "aha",
      /* 자리 순서(첫째~넷째)를 끝까지 안 바꿨으므로 화면엔 3,5,7,4 로 보인다
         (정렬한 3,4,5,7 이 아니다) — 실제 표시값으로 말한다. */
      ko: "3, 5, 7, 4 — 다 달라요. 민 횟수는 모두 3 회. 이 나눔은 다음 쪽에서도 그대로 쓰여요.",
      en: "3, 5, 7, 4 — all different. Three pushes in total. This split is used on the next page too." },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "With K = 2, who can ever meet?", "K = 2 일 때, 누가 누구와 만날 수 있나")}
 />
      <StepFade fast k={ts.safe}>
        <Say tone={s.tone}>{t(E, s.en, s.ko)}</Say>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          {s.tiles.map((v, i) => (
            <Tile key={i} v={v} state={s.st[i]} note={`${ord(i)} ${s.extra[i]}`.trim()} />
          ))}
        </div>

        {s.formula && (
          <div style={{ textAlign: "center", fontSize: 12.5, fontWeight: 800, color: "#92400e",
            fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>
            {s.formula}
          </div>
        )}
        {s.ops !== undefined && (
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
