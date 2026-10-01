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

/* ⛔⛔ 2026-10-01 선생님(**세 번째 같은 질문**): *"나머지를 사용한걸 하지 않았을 경우
     문제점이 뭔지 아직도 모르겠는데?"*

   ⭐ 앞선 두 번은 **말을 고쳐서** 답했다 — 「봐도 돼요」 → 「봐야 해요」, why 에 한 줄 추가.
     세 번 다 안 통한 이유는 분명하다: 화면이 **안 묶은 결과를 한 번도 안 보여줬다.**
     「필수예요」라고 **주장**만 했다(`feedback_one_case_cannot_claim_always` 와 같은 모양).
   ⭐ 안 묶으면 무엇이 깨지나 — 실측(K = 2, 3 3 3 4):
       묶으면    3 · 5 · 7 · 4   →  3 회
       안 묶으면 3 · 5 · 7 · 9   →  5 회
     그런데 **4 에 2 를 더하면 6, 8, 10 … 이고 9 는 아예 안 나온다.**
     즉 안 묶은 답은 느린 게 아니라 **있을 수 없는 계획**이다. 그게 「필수」의 정체다.
   ⛔ 새 걸음을 만들지 않는다 — 마지막 걸음 **안에** 넣는다
     (`feedback_shorter_not_longer`, PM 판정 2026-10-01).
   ⭐ 강조는 **두 곳만**이다 — 「9 는 못 가요」와 「5 회」. 선생님: *"다 밋밋해서
     노치는 정보가 많아"* → 다 굵게 하면 다시 밋밋해진다(`check-emphasis`). */
function WrongWay({ E }) {
  const mono = { fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 };
  return (
    <div style={{
      maxWidth: 470, margin: "0 auto 10px", padding: "10px 13px", borderRadius: 12,
      background: "#fef2f2", border: "1.5px solid #fca5a5",
      wordBreak: "keep-all", textWrap: "balance",
    }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: "#991b1b", marginBottom: 7 }}>
        🚫 {t(E, "If we had NOT split by remainder", "나머지로 안 묶었다면")}
      </div>

      {/* 한 줄로 쭉 밀면 4 까지 밀린다 — 그 결과를 숫자로 보여준다 */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap",
        fontSize: 15, color: "#7f1d1d", marginBottom: 6, ...mono }}>
        <span>3</span><span>5</span><span>7</span>
        <span style={{ color: "#64748b", fontWeight: 700, fontSize: 12.5 }}>
          {t(E, "then 4 must pass 7 →", "그다음 4 도 7 보다 뒤로 →")}
        </span>
        <span style={{ fontSize: 19, color: "#b91c1c" }}>9</span>
      </div>

      {/* 그런데 4 는 9 에 갈 수 없다 — 갈 수 있는 수를 나란히 둔다 */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap",
        fontSize: 12.5, color: "#1e3a8a", marginBottom: 7 }}>
        <span style={{ fontWeight: 700 }}>{t(E, "4 can go to", "4 가 갈 수 있는 수")}</span>
        <span style={{ fontSize: 14.5, color: "#065f46", ...mono }}>4 → 6 → 8 → 10 …</span>
      </div>

      <div style={{ fontSize: 13, lineHeight: 1.7, color: "#7f1d1d", fontWeight: 600 }}>
        {t(E, "So 4 ", "그래서 4 는 ")}
        <b style={{ color: "#b91c1c", fontSize: 14 }}>
          {t(E, "can never become 9", "9 에 못 가요")}
        </b>
        {t(E, " — this plan cannot happen. And the count comes out ",
             " — 이건 할 수 없는 계획이에요. 횟수도 ")}
        <b style={{ color: "#b91c1c", fontSize: 14 }}>{t(E, "5, not 3", "3 회가 아니라 5 회")}</b>
        {t(E, ".", "로 나와요.")}
      </div>
    </div>
  );
}

/* 「K 로 나눈 나머지가 같은 값들」을 **진짜 한 줄**로 그린다.
   ⚠️ 2026-09-29 선생님(화면 보시고): *"두 줄이 어디있으며 이 줄을 가르는 건
     왜 k로 나눈 나머지이지?"* — 같은 자리를 **학생도 먼저 짚었다**:
     *"두 줄을 짐작해서 찾았다. 진짜 가로로 그어진 두 줄 같은 그림은 없다.
       타일 4개가 나란히 있고 셋째 밑에 작은 글씨가 붙어 있을 뿐이다."*
     *"「K 로 나눈 나머지」가 무슨 뜻인지 모르겠다. 왜 3,5,7,9 는 나머지가 같은지
       화면이 계산을 안 보여준다. 3÷2=나머지1 … 을 속으로 혼자 계산해서 짐작했다."*
   → 말풍선이 부르는 「두 줄」이 화면에 **없었다.** 글을 고칠 게 아니라 **그려야** 한다
     (`feedback_occlusion_needs_coordinates` 의 사촌 — 학생이 «없다» 면 없는 것이다).
   ⭐ 줄 이름을 **나머지 그 자체**로 단다 — 그러면 「왜 나머지냐」가 글이 아니라
     **줄 이름과 그 줄의 숫자들**로 답해진다. 3÷2·5÷2 를 눈앞에서 대조할 수 있다.
   ⛔ 「홀수 줄/짝수 줄」로 이름 붙이지 마라 — 그건 K = 2 일 때만의 모습이고,
     선생님이 이미 그걸로 한 번 막히셨다(*"이건 k=2일떄만 …"*). */
function ChainRow({ E, k, rem, vals, hot, calc, named }) {
  const c = rem === 1 ? { bg: "#dbeafe", bd: "#2563eb", fg: "#1e3a8a" }
                      : { bg: "#dcfce7", bd: "#16a34a", fg: "#065f46" };
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 8,
      flexWrap: "wrap", padding: "5px 8px", borderRadius: 10,
      /* ⛔ 바탕을 채우지 않는다. 말풍선(연파랑 카드)·타일(연파랑 칸) 위에
           줄까지 연파랑으로 채우면 **파란 카드가 세 겹**이 되어 어디를 볼지 안 보인다
           (선생님: *"너무 비슷한 색으로 너무많은 정보가 갑자기"*).
         ⭐ 색은 **이름표 하나**만 갖는다 — `check-emphasis` 의 「다 굵으면 강조가 아니다」. */
      background: "transparent",
      border: `1.5px solid ${hot ? c.bd : "#e2e8f0"}`,
      transition: "all .25s",
    }}>
      <div style={{
        fontSize: 11.5, fontWeight: 800, color: c.fg, background: c.bg,
        border: `1.5px solid ${c.bd}`, borderRadius: 8, padding: "3px 8px",
        whiteSpace: "nowrap", wordBreak: "keep-all",
      }}>{/* ⛔ 이름은 **걸음 4 전에는 붙지 않는다.** 걸음 1 부터 「1 이 남는 줄」이라고
             써 두면 선생님이 지적하신 *"갑자기 나머지가 같은 것들이라고 하는데"* 가
             그대로 남는다 — **관찰이 끝나기 전에 답이 화면에 있는 것**이다.
             그 전에는 그냥 «누구의 줄» 이다. */
        calc ? t(E, `÷ ${k} leaves ${rem}`, `${k} 로 나누면 ${rem} 남음`)
        : named ? t(E, `leaves ${rem}`, `${rem} 이 남는 수들`)
        /* ⚠️ PM 이 잡았다(2026-09-29) — 「3 **가** 갈 수 있는 수」로 찍히고 있었다.
             받침이 있으면 「이」, 없으면 「가」다. 3(삼)은 받침이 있어 「3 이」,
             4(사)는 없어 「4 가」. 오늘 내가 이 라벨을 만들며 조사를 하드코딩했고
             **검사기 일곱 개가 전부 0건**이었다 — 조사는 어느 그물에도 안 걸린다. */
        : t(E, `where ${rem === 1 ? 3 : 4} can go`,
               `${rem === 1 ? "3 이" : "4 가"} 갈 수 있는 수`)}</div>
      <div>
        <div style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 800,
          color: c.fg, letterSpacing: .3,
        }}>{vals}</div>
        {/* ⭐ 나눗셈은 **묻는 걸음에만** 뜬다(`calc`). 학생(초6)이
            *"솔직히 계산 안 하고 짐작했다 — 홀수라서 그렇겠지 하고"* 라고 했고,
            선생님도 *"왜 k로 나눈 나머지이지?"* 를 **두 번** 물으셨다.
            이름표만으로는 답이 안 됐다 — **나눗셈을 눈앞에 놓는다.** */}
        {calc && (
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
            fontWeight: 700, color: c.fg, opacity: .85, marginTop: 2,
          }}>{calc}</div>
        )}
      </div>
    </div>
  );
}

/* K 를 바꾸면 **줄 개수가 바뀐다**는 것을 한 눈에 보인다.
   ⚠️ 2026-09-29 선생님(세 번째, 같은 자리): *"아직도 k=2일때만 짝수와 홀수로 나눠지지
     도대체 왜 서로 연관이 없다는건지. k=3일때 k=1일때는 다르잖아."*
   ⭐ **맞는 말이고, 화면이 틀렸다.** 화면은 K = 2 **하나만** 보여주면서 말풍선으로
     *"K 가 몇이든 똑같아요"* 라고 **주장**하고 있었다 — 선생님이 앞서 두 번 지적하신
     「보여주지 않고 말로 때운다」와 **똑같은 결함**이다.
   ⛔ 그리고 「똑같다」는 말 자체가 부정확했다. **K 마다 다르다** — 줄 개수가 K 개다.
     같은 것은 그림이 아니라 **규칙** 하나다: 「K 를 더해도 K 로 나눈 나머지는 안 바뀐다」.
     K = 1 이면 줄이 **하나**라 전부 부딪히고, K = 3 이면 줄이 **셋**이다.
   → 그러니 K = 1 · 2 · 3 을 **나란히 놓는다.** 「다르다」와 「무엇이 같나」가 동시에 보인다.
   ⚠️ 숫자는 타일과 같은 3, 4, 5 에서 시작한다 — 새 숫자를 들이면 「어디서 온 숫자지」가
     또 난다(`feedback_same_number_two_meanings`). */
/* ⛔ 2026-09-29 — **되돌렸다.** 나는 이 표에서 수열(`3 → 6 → 9` …)을 지웠었다.
     선생님: *"내가 나눈 나머지로 **어떻게 구분이 되는건지를 설명하라** 했지
     기존에 설명 잘 되어 있던 시뮬을 제거하라했어?"*
   ⭐ 맞다. 물으신 건 **설명**인데 나는 **설명하던 것을 뺐다.** 중복이라고 본 판단이
     틀렸다 — 걸음 1~4 의 줄은 K=2 뿐이고, 이 표는 **다른 K 에서 어떻게 갈리는지**를
     보여주는 유일한 자리다. 같은 그림이 아니라 **다른 K 의 그림**이다. */
function KRows({ E, k, rows, on }) {
  const c = on ? { bd: "#2563eb", fg: "#1e3a8a", bg: "#eff6ff" }
               : { bd: "#e2e8f0", fg: "#64748b", bg: "transparent" };
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap",
      padding: "5px 8px", borderRadius: 10, background: c.bg,
      border: `1.5px solid ${c.bd}`,
    }}>
      <div style={{
        minWidth: 86, fontSize: 11.5, fontWeight: 800, color: c.fg,
        whiteSpace: "nowrap", wordBreak: "keep-all", paddingTop: 2,
      }}>{t(E, `K = ${k} · leftovers ${LEFTOVERS[k]}`, `K = ${k} · 남는 수 ${LEFTOVERS[k]}`)}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            fontFamily: r ? "'JetBrains Mono',monospace" : "inherit",
            fontSize: r ? 13.5 : 11.5,
            fontWeight: 800, color: r ? c.fg : "#94a3b8", letterSpacing: .3,
            wordBreak: "keep-all",
          }}>{r || t(E, "(none of our numbers leaves 2)", "(우리 수 중엔 2 가 남는 게 없어요)")}</div>
        ))}
      </div>
    </div>
  );
}

/* ⛔ PM 판정(2026-09-29): K=3 의 셋째 줄은 **비운다.**
     옛 값 `5 → 8 → 11` 의 **5 는 바로 위 타일(3,3,3,4)에 없는 수**였다 —
     학생이 「어디서 온 5 지?」를 묻게 된다(`feedback_same_number_two_meanings`).
   ⭐ 비운 채로 두면 **「줄은 K 개로 갈리지만 우리 수가 쓰는 줄은 더 적다」**가
     글이 아니라 **그림**으로 말해진다. 실측: [3,3,3,4] 를 K=3 으로 돌리면 줄은 2개다. */
const LEFTOVERS = { 1: "0", 2: "0, 1", 3: "0, 1, 2" };

const K_COMPARE = [
  { k: 1, rows: ["3 → 4 → 5 → 6 → 7 …"] },
  { k: 2, rows: ["3 → 5 → 7 → 9 …", "4 → 6 → 8 → 10 …"] },
  { k: 3, rows: ["3 → 6 → 9 …", "4 → 7 → 10 …", null] },
];

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
  /* ⭐⭐ 2026-09-29 선생님(화면 보시고, 네 번째):
       *"좀더 세분화되게. 단계적으로. **갑자기 정보 너무 많아지지 않도록.**
         갑자기 나머지가 같은 것들이라고 하는데 **페이지수를 유지하기 위한 시뮬인가**"*

     ⭐ 마지막 물음이 제일 아프고, **맞는 지적이다.** 옛 걸음 4 는
       ①규칙을 말하고 ②「나머지」라는 이름을 던지고 ③K=1·2·3 표(여섯 줄)를
       **한꺼번에** 띄웠다. 결론을 먼저 주고 그림으로 장식한 것이라,
       걸음이 **이유를 만들어 가는 게 아니라 자리만 차지**했다.

     → **순서를 관찰 → 물음 → 나눗셈 → 이름 → 일반화 로 편다.**
       한 걸음에 새로 뜨는 것은 **하나**다(`feedback_one_thing_changes_at_a_time`).
       ⛔ 「나머지」라는 말은 **나눗셈을 두 줄 다 보여준 뒤에야** 처음 쓴다
         (`feedback_no_invented_terms` — 용어는 처음 쓰기 전에 정의).
       ⛔ K 비교표도 **한 칸씩** 자란다 — 여섯 줄이 한 번에 뜨지 않는다.

     ⚠️ 걸음 수는 8 → **7** 이다(늘리지 않았다). PM 판정(2026-09-29)의
       「옛 걸음 5·6·7(줄 안에서 하나씩 밀기)은 3쪽 `PlaceOneByOneSim` 과
       기계적으로 동일하니 한 걸음으로」를 **그대로 지키고**, 거기서 번 자리를
       **유도**에 썼다. 학생도 *"6걸음쯤부터 대충 누르기만 했다"* 고 한 곳이 거기다.
       ⛔ `(7-3) ÷ 2 = 2` 는 살린다 — 3쪽이 *"K 가 1 이 아니면 곧 봐요"* 라고 약속했고
         학생이 멈춰 선 유일한 자리다. */
  const steps = [
    /* 1. 관찰 — 한 수의 갈 곳. 아직 「나머지」도 「줄」도 이름 붙이지 않는다.
       ⚠️ 2026-09-29 선생님: *"왜 3,5,7,9가 되는지 **앞 페이지를 보면 알수 있나?**"*
         확인했다 — **1쪽에 있다**(*"아무 수나 골라서 K 를 더할 수 있어요. 몇 번이든요."*).
         그런데 **네 쪽 앞이고 5쪽은 다시 말하지 않았다**
         (`feedback_screen_must_not_rely_on_memory` — 쪽을 넘기면 앞 쪽은 사라진다).
       ⭐ 더 나쁜 것: 3쪽 시뮬은 각 수를 **한 번씩만** 민다(1→2, 4→5).
         **한 수를 두 번 미는 장면을 학생이 눈으로 보는 건 5쪽이 처음**이라,
         「계속 더하면」이 앞에서 받쳐지지 않았다.
       → 체인을 **선언하지 말고 그 자리에서 만든다**(더하면 5, 또 더하면 7),
         그리고 「몇 번이든 더해도 된다」는 허락을 **같은 화면에** 둔다. */
    { tiles: [3, 3, 3, 4], st: ["placed", "idle", "idle", "idle"],
      extra: ["", "", "", ""], chains: [1], hot: 1,
      /* ⚠️ 2026-09-29 선생님: *"3,5,7,9로 더해지는것도 시뮬에 있었던것 같은데.
           **너무 비슷한 색으로 너무많은 정보가 갑자기**"* — 둘 다 맞다.
         ⭐ `3 → 5 → 7 → 9` 가 **이 시뮬 안에서만 네 번** 나오고 있었다:
           ①이 말풍선 글 ②바로 아래 줄 ③K 비교표의 K=2 칸 ④걸음 7 타일 밑 노트.
         → 말풍선에서 뺀다. **아래 줄이 이미 그림으로 말한다**(`feedback_shorter_not_longer`). */
      ko: "수 네 개예요 — 3, 3, 3, 4. 같은 수에 2 를 「몇 번이든」 더해도 돼요.",
      en: "Four numbers — 3, 3, 3, 4. We may add 2 to the same number as many times as we like." },

    /* 2. 관찰 둘 — 두 번째 줄. 여기서도 이름은 없다. 눈으로 「안 겹친다」만. */
    { tiles: [3, 3, 3, 4], st: ["placed", "idle", "idle", "even"],
      extra: ["", "", "", ""], chains: [1, 0], hot: 0,
      ko: "넷째 4 에도 2 씩 더해 봐요 — 4, 6, 8, 10 …\n3 이 갈 수 있는 수와 4 가 갈 수 있는 수는 하나도 안 겹쳐요.",
      en: "Now add 2 to the fourth number, 4 — 4, 6, 8, 10 …\nWhere 3 can go and where 4 can go never overlap." },

    /* 3. **물음 — 이게 빠져 있었다.**
         ⚠️ 2026-09-29 선생님: *"k를 더하면 서로 뭔가 영향이 없다. 그 다음 나머지…
           **에잇 모르겠네**"* — 선생님이 논리를 이어 보시다 놓으셨다.
         ⭐ 원인: 화면에 **「나머지」가 답하는 질문이 없었다.** 줄 두 개를 보여주고
           바로 *"이게 나머지예요"* 로 갔다. 답이 먼저 오면 이어지지 않는다
           (`feedback_solution_framing` — *"그럼 어떻게 하면 될까?"* 로 열어라).
         → 빠진 질문은 이것이다: **「어느 수가 어느 줄인지, 줄을 끝까지 안 써 보고 알 수 있나?」**
           나머지는 그 질문의 답이고, 쓸모는 **줄 이름표**다. 성질이 아니라 **도구**로 준다.
         ⛔ 이 걸음에서는 답을 주지 마라. 나눗셈은 다음 걸음이다. */
    { tiles: [3, 3, 3, 4], st: ["placed", "idle", "idle", "even"],
      extra: ["", "", "", ""], chains: [1, 0], tone: "stuck",
      ko: "그럼 3 과 4 는 절대 같아질 수 없겠네요.\n끝까지 다 써 보지 않고도 미리 알 수 있을까요?",
      en: "So 3 and 4 can never become the same number.\nIs there a way to know that without writing everything out?" },

    /* 4. **답 = 이름.** 앞 걸음의 물음에 나눗셈으로 답하고, 그 답에 이름을 준다.
         ⛔ 이 걸음 앞에서 「나머지」를 쓰지 마라 — 그게 선생님이 *"갑자기"* 라고
           하신 자리다. 그리고 이름을 **정의**로 주지 말고 **쓸모**로 줘라
           (「줄 이름표」) — `feedback_no_invented_terms` 는 뜻을, 여기서는 용도를 붙인다. */
    { tiles: [3, 3, 3, 4], st: ["placed", "idle", "idle", "even"],
      extra: ["", "", "", ""], chains: [1, 0], calc: [1, 0], named: true, tone: "aha",
      /* ⚠️ 2026-09-29 5차 학생: *"화면이 「이 식은 나머지가 안 바뀌는 걸 보여주는
           거예요」 라고 **직접 말해준 적은 없다. 그냥 식 세 개만 던져놓고 넘어갔다.**"*
           *"「남는 수가 같으면 같아질 수 있다」도 **왜 그런지 설명이 없다. 결론만 줬다.**"*
         → 아래 식(`3 = 2+1 · 5 = 2+2+1 · 7 = 2+2+2+1`)이 **무엇을 보여주는지** 말한다.
           2 를 더하는 건 **2 뭉치만 늘리는 것**이라 맨 뒤의 1 은 안 건드려진다 — 그게 전부다. */
      /* ⚠️ 2026-09-29 선생님(라이브 보시고): *"**여전히 뭔말인지 모르겠어**"*
         ⭐ 두 가지가 틀렸다.
         ⛔ ① **「2 뭉치」는 또 지어낸 말이다.** 「줄」을 없앴더니 「뭉치」를 만들었다
              (`feedback_no_invented_terms` — 지어낸 말은 그 말부터 설명해야 한다).
         ⛔ ② **두 줄의 식이 서로 안 맞았다.** 윗줄 `3 = 2+1` 은 「+1」이 남는 걸로 보이는데
              아랫줄 `4 = 2+2` 는 **0 이 어디 있는지 안 보인다.** 라벨은 「0 남음」인데
              식이 그걸 안 보여준다 — 대응이 깨져 있었다.
         → **6학년이 이미 아는 말로** 말한다: 홀수·짝수. 「홀수는 짝수가 될 수 없다」는
           설명이 필요 없는 사실이고, 그게 「절대 안 만난다」의 진짜 이유다.
           식은 **학교에서 배운 나눗셈 표기**(`몫 ⋯ 나머지`)로 바꿔 두 줄을 대응시킨다.
         ⚠️ 홀짝은 **K = 2 일 때만의 모습**이다 — 그래서 바로 다음 걸음 5·6 이 K 를 바꿔
           「남는 수」로 일반화한다. 여기서 홀짝을 규칙이라고 **주장하지 않는다.** */
      ko: "3, 5, 7, 9 는 다 홀수예요. 4, 6, 8, 10 은 다 짝수고요.\n홀수는 아무리 커져도 짝수가 안 돼요 — 그래서 절대 같아질 수 없어요.",
      en: "3, 5, 7, 9 are all odd. 4, 6, 8, 10 are all even.\nAn odd number never becomes even, however big it grows — so they can never be equal." },

    /* 5. 일반화 **한 칸만.** K=1 을 옆에 놓아 「K 가 달라지면 갈리는 수가 달라진다」를
         한 번에 하나씩 본다. 표를 통째로 띄우지 않는다. */
    { tiles: [3, 3, 3, 4], st: ["placed", "idle", "idle", "even"],
      extra: ["", "", "", ""], kcompare: [1, 2],
      ko: "K 가 1 이면 어떨까요? 1 로 나누면 뭐든 0 이 남아요.\n남는 수가 다 같으니까 어떤 두 수든 같아질 수 있어요.",
      en: "What if K is 1? Divide anything by 1 and 0 is left.\nEvery leftover is the same, so any two numbers can meet." },

    /* 6. 일반화 **한 칸 더.** K=3. 셋째 줄은 **비워 둔다** — 우리 수가 안 쓰는 줄이다
         (`5 → 8 → 11` 을 쓰면 5 가 어디서 왔는지 학생이 묻는다). */
    { tiles: [3, 3, 3, 4], st: ["placed", "idle", "idle", "even"],
      extra: ["", "", "", ""], kcompare: [1, 2, 3],
      /* ⛔ 2026-09-29 감사 담당이 **거짓**으로 잡았다. 옛 문장:
           *"2 를 더하든 3 을 더하든, 남는 수는 절대 안 바뀌어요."*
           **반례**: 3 에 2 를 더하면 5 이고 5 를 3 으로 나눈 나머지는 2 — 3 의 나머지 0 에서
           **바뀐다.** 참인 것은 «K 를 더하면 **그 K 로** 나눈 나머지가 안 바뀐다» 인데,
           두 K 를 한 문장에 섞어 그 조건을 지워 버렸다.
         ⛔ 선생님이 오늘 두 번 지적하신 「한 경우로 전체를 주장한다」의 **재발**이다
           (`feedback_one_case_cannot_claim_always`). 조건을 문장 안에 되살린다. */
      ko: "K 가 3 이면 남는 수가 0, 1, 2 — 세 가지예요.\n3 씩 더하면 3 으로 나눈 남는 수가 그대로예요. 2 씩 더할 때와 똑같아요.",
      en: "With K = 3 the leftovers are 0, 1 and 2 — three of them.\nAdding 3 keeps the leftover after ÷ 3, just like adding 2 kept the leftover after ÷ 2." },

    /* ⚠️ 2026-09-29 선생님(라이브 보시고): *"예전에는 **첫째 둘째 셋째 숫자가 바뀌는것도
         하나씩 시뮬로** 보여줬는데 **그 다음에 밑에 정리된게 보여야지.** 뭔가 시뮬이 뚝 끊겼어"*

       ⭐ **맞다. 내가 합쳐서 끊었다.** PM 판정(3쪽이 이미 같은 걸 가르친다 · 3차 학생이
         *"6걸음쯤부터 대충 누르기만"*)을 근거로 옛 걸음 5·6·7·8 을 **한 걸음**으로 만들었다.
         그 결과 타일이 `3,3,3,4` 에서 `3,5,7,4` 로 **한 번에 튄다** — 미는 장면이 사라졌다.
       ⛔ 3쪽이 가르친 것은 **K = 1** 일 때다. 여기는 K = 2 라 **한 번에 2 씩** 움직이고,
         「한 번 밀기」와 「두 번 밀기」가 갈리는 자리다 — 3쪽이 대신해 주지 못한다.
       → 하나씩 되살린다. **그리고 선생님 말씀대로 정리를 맨 뒤에 따로 둔다.** */
    { tiles: [3, 3, 3, 4], st: ["placed", "placed", "placed", "even"],
      extra: [t(E, "· stays", "· 그대로"), "", "", ""], chains: [1, 0], named: true, ops: 0,
      /* ⚠️ 2026-09-29 선생님: *"난 저 시뮬레이션 하나씩 가봤는데 **도대체 뭘 하려는건지
           모르겠어**"* — 문장이 아니라 **설계** 문제였다.
         ⭐ 걸음 1~6 이 세운 사실(「3 과 4 는 절대 안 만난다」)이 **걸음 7~10 에서
           아무 일도 안 하고 있었다.** 그래서 여섯 걸음이 무엇을 벌어 줬는지 화면이
           한 번도 말하지 않는다 — 학생 눈에는 **목적 없는 여섯 걸음**이다.
         → 여기서 **그 값을 현금화한다**: 이제 3 끼리만 보면 되고 4 는 볼 필요가 없다.
           앞 쪽(4쪽) 코드는 **모든 값을 다 뒤졌다** — 그게 느렸던 이유다. */
      /* ⛔ 2026-09-30 — 여기가 **학생이 오독한 자리**다. 원래 "4 는 아예 볼 필요가 없어요" 였는데
         학생: *"「4 는 상관없는 애니까 빼고 봐도 된다」는 **안심시키는 말투**였어요.
         「4 를 보면 답이 틀려진다」는 느낌은 **전혀 안 들었어요.**"*
         선생님도 같은 이유로 **묶기를 속도 요령으로** 이해하고 계셨다.
         ⭐ 사실은 정확했는데 **어법이 허용형**이라 「안 해도 그만」으로 읽힌 것이다.
         필요형으로 뒤집는다 — 글자 수 ±0. 새 걸음·새 예제 없음.
         근거: memory/feedback_show_the_failed_first_try.md */
      ko: "이제 4 는 절대 안 겹쳐서 — 3 끼리만 봐야 해요.\n첫째 3 은 맨 앞이라 그대로예요.",
      en: "4 can never overlap, so we must handle the 3s on their own.\nThe first 3 is at the front, so it stays." },

    { tiles: [3, 5, 3, 4], st: ["placed", "moving", "placed", "even"],
      extra: ["", "· 3→5", "", ""], chains: [1, 0], named: true, ops: 1,
      ko: "둘째 3 은 첫째와 같아요. 2 를 한 번 더해 5 로 비켜요.",
      en: "The second 3 is the same as the first. Add 2 once and it steps aside to 5." },

    { tiles: [3, 5, 7, 4], st: ["placed", "placed", "moving", "even"],
      extra: ["", "", "· 3→5→7", ""], chains: [1, 0], named: true,
      formula: "(7-3) ÷ 2 = 2", ops: 3,
      ko: "셋째 3 은 5 도 이미 찼어요. 5 를 지나 7 까지 — 2 를 두 번 더해요.\n세는 대신 (7-3) ÷ 2 로도 2 가 나와요.",
      en: "The third 3 finds 5 taken too. Past 5, on to 7 — it adds 2 twice.\nInstead of counting, (7-3) / 2 also gives 2." },

    /* 선생님: *"그 다음에 **밑에 정리된게** 보여야지"* — 미는 장면이 다 끝난 뒤에 정리 한 걸음. */
    { tiles: [3, 5, 7, 4], st: ["placed", "placed", "placed", "placed"],
      extra: ["", "", "", ""], chains: [1, 0], named: true, ops: 3, tone: "aha",
      /* ⛔ 2026-09-29 감사 판정 — 옛 문장 *"이 **나눔**은 다음 쪽에서도 그대로 써요"* 는 **거짓**이었다.
           6쪽은 숫자도 묶음 크기도 다르다. 그대로 쓰는 건 숫자가 아니라 **나머지로 묶는 방법**이다. */
      wrong: true,
      ko: "3, 5, 7, 4 — 다 달라졌어요. 민 횟수는 0 + 1 + 2 = 3 회.\n나머지로 안 묶었으면 어땠을까요? 바로 아래에 있어요.",
      en: "3, 5, 7, 4 — all different now. Moves: 0 + 1 + 2 = 3.\nWhat if we had not split by remainder? See just below." },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        /* ⚠️ PM 이 잡았다(2026-09-29) — 제목이 「K = 2 일 때」인데 걸음 5·6 은
             K = 1 · K = 3 을 다룬다. 걸음을 일반화로 바꾸면서 **제목을 안 따라 고쳤다.** */
        title={t(E, "Which values can ever overlap?", "누가 누구와 겹칠 수 있나")}
 />
      <StepFade fast k={ts.safe}>
        <Say tone={s.tone}>{t(E, s.en, s.ko)}</Say>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          {s.tiles.map((v, i) => (
            <Tile key={i} v={v} state={s.st[i]} note={`${ord(i)} ${s.extra[i]}`.trim()} />
          ))}
        </div>

        {/* ⭐ 자리는 **타일 바로 아래**다 — 「묶어서 푼 결과(타일)」와 「안 묶은 결과」가
            나란히 보여야 대조가 된다. 마지막 걸음에만 뜨므로 그 위의 줄은 안 밀린다
            (ux 판정 2026-09-29 의 「새로 뜨는 것은 아래로만」). */}
        {s.wrong && <WrongWay E={E} />}

        {/* ⭐ 블록 순서는 **ux-reviewer 판정(2026-09-29)** 이다. 잣대는 「무엇이 안 밀리나」.
            `chains`/`kcompare` 를 **타일 바로 밑에 못박고**, 걸음마다 생겼다 사라지는
            `ops`(걸음 6부터)·`formula`(걸음 7에만)를 **그 아래로** 내린다. 그러면
            새로 뜨는 것이 **아래로만 더해져** 위에 있는 줄이 안 밀린다.
            ⛔ 기각된 안 — 「말풍선을 타일 아래로 내린다」. 흩어짐은 줄지만
              `PlaceOneByOneSim`·`mexes`·`moohunt` 가 전부 **말풍선 맨 위**라
              이 파일에서만 새 모양이 생긴다(`quest_season_shape_consistency`). */}
        {/* ⭐ 「두 줄」은 여기서 **진짜 두 줄**이 된다.
            ⚠️ PM 이 잡았다(2026-09-29) — 예전 주석은 *"한 번 뜬 줄은 끝까지 안 사라진다"*
              라고 적혀 있었는데 **거짓이었다.** 실제로는 걸음 5·6 에 `chains` 가 **없고**
              (`kcompare` 만 있다), 걸음 7 에는 `kcompare` 가 없다 — **같은 자리에서
              두 블록이 서로 갈아끼워진다.** 주석을 사실로 고친다.
              ⛔ 「갈아끼워도 되나」는 배치 문제라 ux-reviewer 판정 대기 중이다.
              코드가 아니라 **주석이 먼저 사실이어야** 다음 사람이 안 속는다.
            ⚠️ 줄마다 따로 가운데 정렬하면 두 줄의 숫자가 **세로로 안 맞는다**
            (아래 줄이 «10» 때문에 더 길다). 그러면 「두 줄」이 아니라 흩어진 두 덩이로
            읽힌다 — 묶음을 `fit-content` 로 가운데 놓고 **줄은 왼쪽 끝을 맞춘다.** */}
        {s.kcompare && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10,
            width: "fit-content", maxWidth: "100%", marginLeft: "auto", marginRight: "auto" }}>
            {/* ⭐ 표가 **한 칸씩 자란다.** 선생님(2026-09-29):
                *"갑자기 정보 너무 많아지지 않도록"* — 옛 판은 여섯 줄이 한 번에 떴다. */}
            {K_COMPARE.filter((kc) => s.kcompare.includes(kc.k)).map((kc) => (
              <KRows key={kc.k} E={E} k={kc.k} rows={kc.rows} on={kc.k === 2} />
            ))}
          </div>
        )}

        {s.chains && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10,
            width: "fit-content", maxWidth: "100%", marginLeft: "auto", marginRight: "auto" }}>
            {s.chains.map((rem) => (
              <ChainRow key={rem} E={E} k={2} rem={rem} hot={s.hot === rem}
                vals={rem === 1 ? "3 → 5 → 7 → 9 …" : "4 → 6 → 8 → 10 …"}
                named={s.named}
                /* ⭐ 선생님이 물으신 것은 **「나머지로 어떻게 구분이 되나」** 다.
                   `3÷2 = 1` 만 보여주면 **결과**만 보이고 **왜 늘 1 인지**는 안 보인다.
                   → 2 를 몇 개 쌓았는지로 풀어 쓴다. 더하는 건 **언제나 2 뭉치**라
                     맨 뒤의 1 은 건드려지지 않는다 — 그게 「안 바뀐다」의 정체다. */
                calc={s.calc?.includes(rem)
                  ? (rem === 1 ? "3÷2 = 1⋯1   5÷2 = 2⋯1   7÷2 = 3⋯1"
                               : "4÷2 = 2⋯0   6÷2 = 3⋯0   8÷2 = 4⋯0")
                  : null} />
            ))}
          </div>
        )}

        {s.ops !== undefined && (
          <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
            {t(E, "Moves so far: ", "지금까지 민 횟수: ")}
            <span style={{ fontSize: 18, color: A, fontFamily: "'JetBrains Mono',monospace" }}>{s.ops}</span>
            {/* ⚠️ 2026-09-29 — **이 블록이 엉뚱한 시뮬(3쪽 `PlaceOneByOneSim`)에 들어가 있었다.**
                `formula:` 데이터는 이 시뮬(5쪽)에만 있는데 렌더는 저쪽에 넣어서,
                **3쪽엔 절대 안 뜨는 죽은 코드 · 5쪽엔 아무도 안 읽는 데이터**가 됐다.
                `ux-reviewer` 가 토론 라운드에서 잡았다.
              ⛔ 오늘 세 번째다(`feedback_new_text_must_actually_render`) —
                빌드가 통과한 것은 「떴다」가 아니다. **화면에서 그 글자를 눈으로 찾아라.**
              원래 의도: 「민 횟수 3」 바로 밑에 식의 「2」가 따로 떠서 뜻이 다른 두 숫자가
                나란히 섰다(`feedback_same_number_two_meanings`). **줄을 합치고 무엇의 수인지 붙인다.** */}
            {s.formula && (
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#92400e", marginLeft: 8 }}>
                {t(E, `(the third one alone: ${s.formula})`, `(셋째 것만: ${s.formula} 회)`)}
              </span>
            )}
          </div>
        )}
      </StepFade>
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
