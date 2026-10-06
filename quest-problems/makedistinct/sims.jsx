import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";
import { StepFade } from "@/components/quest/StepFade";
import { t } from "@/components/quest/theme";
import { Hi } from "@/components/quest/shared";

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

/* ⭐ 2026-10-01 선생님: *"강조해야 하는 곳에서는 강조가 안되어 있어.
     다 밋밋해서 노치는 정보가 많아"* — 말풍선이 처음부터 끝까지 `fontWeight: 700` 이라
   **결론 문장과 곁문장이 같은 무게**로 읽혔다. 한 걸음에 **한 곳만** 굵게 한다
   (어느 곳인지는 `pedagogy-reviewer` 판정, 잣대는 「그 문장이 없으면 다음이 안 이어지나」).

   ⛔ 강조를 **글 안에 표시하지 않는다.** `**굵게**` 로 적으면 JSX 가 해석을 안 해
     **별표가 그대로 화면에 찍힌다**(`check-jsx-markdown`, 2026-09-28 에 네 군데서 겪었다).
   → 굵게 할 **조각 자체**를 걸음 데이터에 `em:` 으로 따로 둔다.
     조각을 못 찾으면 **아무것도 안 굵어진다** — 글자가 새지 않는 쪽으로 넘어진다.
   ⭐ 형광펜은 **공용 `Hi`**(`components/quest/shared.tsx`)를 쓴다 — 색값을 여기 적으면
     다음 사람이 복붙한다(`feedback_example_code_is_contagious`). */
function Em({ text, em }) {
  if (!em || !text || !text.includes(em)) return text;
  const at = text.indexOf(em);
  return (
    <>
      {text.slice(0, at)}
      <Hi>{em}</Hi>
      {text.slice(at + em.length)}
    </>
  );
}

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
        calc ? t(E, `÷ ${k} leaves ${rem}`, `${k} 로 나눈 나머지 ${rem}`)
        : named ? t(E, `leaves ${rem}`, `나머지가 ${rem} 인 수들`)
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
      {/* ⛔ 2026-10-06 선생님: *"**이거 보기가 불편해 더 보기 좋게**"*
          원인은 **줄이 안 맞는 것**이었다 — 이름표가 `minWidth: 86` 이라
          「K = 1 · 나머지 0」과 「K = 3 · 나머지 0, 1, 2」의 **너비가 달라서**
          세 줄의 숫자가 **제각각 다른 자리에서 시작**했다.
          ⭐ 이름표를 **고정 너비**로 못 박는다 — 세 줄의 숫자가 **한 세로줄**에 선다.
          ⛔ 새 색·새 굵기는 안 더한다(`check-emphasis`: 다 굵으면 강조가 아니다). */}
      <div style={{
        width: 128, flexShrink: 0, fontSize: 11.5, fontWeight: 800, color: c.fg,
        whiteSpace: "nowrap", wordBreak: "keep-all", paddingTop: 3,
      }}>{t(E, `K = ${k} · leftovers ${LEFTOVERS[k]}`, `K = ${k} · 나머지 ${LEFTOVERS[k]}`)}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            fontFamily: r ? "'JetBrains Mono',monospace" : "inherit",
            fontSize: r ? 13.5 : 11.5,
            fontWeight: 800, color: r ? c.fg : "#94a3b8", letterSpacing: .3,
            wordBreak: "keep-all", whiteSpace: "nowrap",
          }}>{r || t(E, "(none of our numbers leaves 2)", "(우리 수 중엔 나머지가 2 인 게 없어요)")}</div>
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

/* ⭐ 2026-10-02 — 사슬을 **걸음마다 자라게** 한다. 선생님:
     *"한꺼번에 많은 정보를 보여주지 말고 **단계별로**."*
   전에는 `"3 → 5 → 7 → 9 …"` 가 **박힌 글자**라, pedagogy 실측대로
   *"「민다」가 이 시뮬 전체에서 한 번도 실제 동작이 아니었다."*
   ⚠️ 새 버튼을 만들지 않는다 — ux 판정: *"버튼을 따로 두면 다음으로 가는 법이 둘이 된다."*
     **◀▶ 를 누르는 것이 곧 미는 것**이다. 조작부는 하나로 둔다. */
const CHAIN = { 1: [3, 5, 7, 9], 0: [4, 6, 8, 10] };
function chainText(rem, push) {
  const all = CHAIN[rem];
  const n = push == null ? all.length : Math.max(1, Math.min(push, all.length));
  const shown = all.slice(0, n).join(" → ");
  return n < all.length ? shown : shown + " …";
}

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
      ko: "수 네 개인데 4 가 둘, 1 도 둘이에요.\n그러니 4 하나와 1 하나는 다른 수가 되어야 해요.\n할 수 있는 건 1 을 더하는 것뿐이에요.",
      en: "Four numbers: two 4s and two 1s.\nSo one of the 4s and one of the 1s has to become a different number.\nThe only thing we can do is add 1." },
    { tiles: [["1"], ["1"], ["4"], ["4"]], st: ["idle", "idle", "idle", "idle"],
      ops: null, tone: "go",
      emKo: "앞의 하나만 보면 돼요",
      emEn: "we only ever look at the one before",
      ko: "먼저 작은 수부터 줄을 세워요.\n그러면 앞에 놓은 수 하나만 보면 돼요 — 나머지는 기억 안 해도 돼요.",
      en: "First line them up from the smallest.\nThen we only ever look at the number placed just before — the rest we can forget." },
    { tiles: [["1"], ["1"], ["4"], ["4"]], st: ["placed", "idle", "idle", "idle"],
      note: [t(E, "stays", "그대로"), "", "", ""], ops: 0,
      ko: "맨 앞 1 은 그대로 둬요. 앞에 아무도 없으니 옮길 까닭이 없어요. (0 회)",
      en: "The first 1 stays. Nothing is in front of it, so there is no reason to move it. (0 moves)" },
    { tiles: [["1"], ["2"], ["4"], ["4"]], st: ["placed", "moving", "idle", "idle"],
      note: ["", "1 → 2", "", ""], ops: 1,
      ko: "다음 1 은 앞의 1 과 같아요. 1 을 더해서 2 로 만들어요. (1 회)",
      en: "The next 1 is the same as the one before. Push it by 1, to 2. (1 move)" },
    { tiles: [["1"], ["2"], ["4"], ["4"]], st: ["placed", "placed", "placed", "idle"],
      note: ["", "", t(E, "stays", "그대로"), ""], ops: 1,
      ko: "다음 4 는 앞의 2 보다 이미 커요. 안 더해도 돼요. (0 회)",
      en: "The next 4 is already bigger than 2. No need to push. (0 moves)" },
    { tiles: [["1"], ["2"], ["4"], ["5"]], st: ["placed", "placed", "placed", "moving"],
      note: ["", "", "", "4 → 5"], ops: 2,
      ko: "마지막 4 는 앞의 4 와 같아요. 1 을 더해서 5 로 만들어요. (1 회)",
      en: "The last 4 is the same as the one before. Push it by 1, to 5. (1 move)" },
    { tiles: [["1"], ["2"], ["4"], ["5"]], st: ["placed", "placed", "placed", "placed"],
      ops: 2, tone: "aha",
      ko: "1, 2, 4, 5 — 다 달라요. 더한 횟수는 모두 2 회. 앞 쪽 샘플의 답이 이거예요.",
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
      ko: "한 번 더하면 5 인데 5 도 이미 있어요.\n그래서 6 까지 가야 해요 — 한 번에 2 회예요.\n이렇게 여러 번 더해야 하는 경우가 생겨요.",
      en: "Adding once only reaches 5, and 5 is taken too.\nSo it has to go all the way to 6 — two moves at once.\nSometimes one number needs several." },
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
      emKo: "(6-4) ÷ 1 = 2 회",
      emEn: "(6-4) / 1 = 2 times",
      ko: "자리는 4 → 5 → 6 으로 한 칸씩만 커진 것처럼 보이지만,\n4 에 실제로 더한 횟수는 (6-4) ÷ 1 = 2 회예요.\nK 가 1 이 아니면 어떻게 되는지는 곧 봐요.",
      en: "The slot only looks like it moves one step, 4 → 5 → 6,\nbut 4 was really pushed (6-4) / 1 = 2 times.\nWhat happens when K isn't 1 — that's coming up soon." },
  ];
  const ts = useTraceStep(steps, "quest-step-makedistinct-placeonebyonesim");
  const s = steps[ts.safe];

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Place them one by one, smallest first", "작은 수부터 하나씩 놓아 보기")}
 />
      <StepFade fast k={ts.safe}>
        <Say tone={s.tone}><Em text={t(E, s.en, s.ko)} em={t(E, s.emEn, s.emKo)} /></Say>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {s.tiles.map((v, i) => (
            <Tile key={i} v={v[0]} state={s.st[i]} note={s.note ? s.note[i] : ""} />
          ))}
        </div>

        {s.ops !== null && (
          <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
            {t(E, "Moves so far: ", "지금까지 더한 횟수: ")}
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
  const ord = (i) => [t(E, "1st", "첫째"), t(E, "2nd", "둘째"), t(E, "3rd", "셋째"), t(E, "4th", "넷째"), t(E, "5th", "다섯째"), t(E, "6th", "여섯째")][i];
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
    /* ⛔ 2026-10-02 — 선생님: *"지금 **첫째 3인데 왜 겹치니까 2를 더해요가 여기서 나오지?**
         **다음 시뮬에서 둘째가 하이라이트 되면서** 여기에서 설명이 나와야지"*
       ⭐ **말풍선과 켜진 타일이 같은 것을 가리켜야 한다.** 한 걸음에 첫째를 켜 놓고
         둘째 이야기를 하면, 학생은 **어디를 봐야 할지 모른다**
         (`feedback_one_thing_changes_at_a_time` 과 같은 층).
       → 걸음을 **타일 하나당 하나**로 가른다. 켜지는 타일(`moving`)과 말풍선이 늘 짝이다.
         그리고 **타일 값이 실제로 바뀐다**(3 → 5 → 7) — 「민다」가 눈에 보이게. */
    /* ⛔ 2026-10-02 (두 번째) — 선생님: *"**3으로 하이라이트 된 다음에 5로 바뀐거로.**
         정말 단계를 더 눈에 띄게"*
       ⭐ 타일이 **켜지는 순간 이미 5** 였다. 그래서 「왜 밀었나(겹쳤다)」와
         「밀었다(5)」가 **같은 걸음 안에서 동시에** 일어나, 미는 장면이 안 보였다.
       → 타일 하나를 **두 걸음**으로 가른다:
           ⓐ 값은 그대로 3, 칸만 켜짐 + 노란 말풍선 — 「겹쳤다」를 본다
           ⓑ 값이 5 로 바뀜 + `extra` 에 `· 3→5` — 「밀었다」를 본다 */
    { tiles: [3, 3, 3, 4, 4, 4], st: ["placed", "idle", "idle", "idle", "idle", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1], hot: 1, push: 1,
      ko: "첫째 3 은 그대로 둬요.",
      en: "Leave the first 3 as it is." },

    /* ⓐ 둘째를 켠다. **값은 아직 3 이다** — 지금 보는 것은 「겹쳤다」 하나뿐. */
    { tiles: [3, 3, 3, 4, 4, 4], st: ["placed", "moving", "idle", "idle", "idle", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1], hot: 1, push: 1, tone: "stuck",
      emKo: "첫째와 똑같아요",
      emEn: "the same as the first",
      ko: "둘째도 3 이에요 — 첫째와 똑같아요.",
      en: "The second one is 3 too — the same as the first." },

    /* ⓑ 같은 칸이 5 로 바뀐다. 바뀌는 자리는 **이 칸 하나뿐**이다. */
    { tiles: [3, 5, 3, 4, 4, 4], st: ["placed", "moving", "idle", "idle", "idle", "idle"],
      extra: ["", t(E, "· 3→5", "· 3→5"), "", "", "", ""], chains: [1], hot: 1, push: 2,
      ko: "그래서 2 를 더해요. 3 + 2 = 5.",
      en: "So add 2. 3 + 2 = 5." },

    /* ⛔ 2026-10-02 — 선생님이 이 화면을 보시고:
         *"3은 그대로 그 다음 3은 3 + 2 = 5, 그 다음 3에 2를 더하면 **또 5가 되니까 또 2를 더해서 7.**
           이렇게 **더 세부적으로** 보여달라니까"*
       ⭐ 그 「**또 겹쳐서 또 민다**」가 셋째에서도 두 걸음이어야 한다 —
         ⓐ 2 를 더하면 5 인데 **거기 둘째가 이미 있다**(막힘) ⓑ 그래서 한 번 더 민다. */
    { tiles: [3, 5, 3, 4, 4, 4], st: ["placed", "placed", "moving", "idle", "idle", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1], hot: 1, push: 2, tone: "stuck",
      emKo: "둘째가 벌써 5 예요",
      emEn: "the second one is already there",
      ko: "셋째도 3 이에요. 2 를 더하면 5 인데 — 둘째가 벌써 5 예요.",
      en: "The third is 3 as well. Add 2 and it is 5 — but the second one is already there." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "placed", "moving", "idle", "idle", "idle"],
      extra: ["", "", t(E, "· 3→5→7", "· 3→5→7"), "", "", ""], chains: [1], hot: 1, push: 3,
      emKo: "한 번 더",
      emEn: "once more",
      ko: "그래서 2 를 한 번 더 더해요. 5 + 2 = 7.",
      en: "So add 2 once more. 5 + 2 = 7." },

    /* ⭐⭐ 2026-10-06 선생님: *"이건 **3,4 나머지가 다른것끼리 하는것 전에 얘기해야지**
         나머지가 다른것들끼리 한다는 말에 **타당성이 생기지** 않을까?"*
       ⭐ **맞다.** 이 말(「안 나눠도 답은 같은데 199억 번이라 안 된다」)이 **나누는 이유**인데
         **맨 끝 걸음**에 있었다. 그러니 걸음 6~12 를 「왜 하는지 모른 채」 지나게 된다 —
         `feedback_show_the_failed_first_try` 가 말하는 **「실패하는 첫 시도를 먼저」** 그 자체다.
       → 걸음 1~5 가 이미 **하나씩 해 보는 방법**이다. 그 **직후**가 제자리다.
       ⛔ 걸음 수는 안 늘렸다 — 끝에 있던 걸 **옮겼다.** 그리고 네 줄을 **두 줄로** 줄였다
         (선생님: *"무슨 말인지 이해가 안되고 **글이 많아**"*). */
    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "placed", "placed", "idle", "idle", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1], hot: 1, push: 3, tone: "stuck",
      /* ⛔ 2026-10-06 선생님: *"**199억번이라는건 뭘?** 그냥 쭉나열하면 나랑 같은게 있는지
           찾는게 199억번이라는건가?"* → **아니다. 「한 칸씩 미는」 횟수**다.
         20만 개가 한 곳에 몰리면 0+1+2+…+199,999 = **199억 9,990만 번**이다.
         화면이 그냥 「199억 번」이라고만 해서 **무엇을 세는지**를 안 말했다. */
      /* ⛔ 2026-10-06 선생님: *"**199억번이라는건 뭘?** 그냥 쭉나열하면 나랑 같은게 있는지
           찾는게 199억번이라는건가?"* → **아니다. 「한 칸씩 더하는」 횟수**다.
         ⭐ 그래서 **무엇을 더한 수인지를 식으로** 바로 아래에 띄운다(`sum`) —
           화면에 이미 있는 「3 회」가 `0+1+2` 라는 걸 보여주고 그 길이만 늘린다.
           말로 「199억 번이에요」라고만 하면 **믿어야 하는 수**가 되고, 실제로 물으셨다.
         ⛔ 「조회 / 찾는 횟수」로 쓰지 마라 — 이 quest 어디에도 **찾는 동작은 없다**
           (교육 담당 2026-10-06). 세는 것은 **더한 횟수** 하나뿐이다.
         ⚠️ 수를 적을 땐 199억이 아니라 **199억 9,990만** 이다(감사 담당) —
           0+1+⋯+199,999 = 19,999,900,000. 「199억」은 다른 수(조회 수)와 섞인다. */
      emKo: "199억 9,990만 번",
      emEn: "19,999,900,000",
      sum: true,
      ko: "하나씩 해보면 답이 나와요 — 3 회.\n그런데 같은 수가 20만 개 있으면 199억 9,990만 번이에요.",
      en: "Doing it one at a time gives the answer — 3.\nBut if 200,000 of them are the same, it is 19,999,900,000." },

    /* 2. 관찰 둘 — 두 번째 줄. 여기서도 이름은 없다. 눈으로 「안 겹친다」만. */
    /* ⛔⛔ 2026-10-06 선생님: *"넷째와 다섯째 설명을 **다른 시뮬화면으로 나눠줘**"*
         + *"**한번에 한가지 정보만**"*
       ⭐ 한 걸음이 **셋**을 말하고 있었다 — ①넷째는 그대로 ②다섯째가 겹친다
         ③4 에 2 를 더하면 3 쪽과 안 겹친다. 셋으로 가른다.
       ⭐ **3 쪽이 이미 그 모양이다** — 「첫째 3 은 그대로」 → 「둘째도 3 이에요」 →
         「그래서 2 를 더해요」. 4 쪽만 셋을 한 번에 쏟고 있었다(`quest_season_shape_consistency`).
       ⚠️ **화면도 한 곳씩만 바뀌게** 맞췄다(`feedback_one_thing_changes_at_a_time`) —
         넷째만 켜짐 → 다섯째가 켜짐 → 「4 가 갈 수 있는 수」 줄이 뜸.
       ⛔ 걸음이 17 → 19 로 늘었다. 평소라면 `feedback_shorter_not_longer` 가 막는 쪽인데
         **선생님이 직접 「나눠줘」라고 지시하셨다.** */
    /* ⛔⛔ 2026-10-06 선생님: *"저게 **오래걸리는거랑 겹치지 않는걸 관찰해야하는 이유?**"*
         + *"내가 원하는건 **어떤 관찰이나 동작에는 그 이유를 알아야** 그걸 왜 하는지 알지."*
       ⭐ **맞다.** 앞 걸음이 「199억 번이라 느리다」로 끝나고, 바로 **「누가 누구와 겹치나」**
         를 관찰하기 시작했다 — **왜 그걸 보는지가 없었다.** 보상은 열 걸음 뒤(나눗셈)에 나온다.
       ⛔ 내가 내놓았던 설명(「안 묶으면 4 를 9 로 보낸다」)에 선생님이 반발하셨다 —
         *"**왜 4를 9로 보내게 하는거냐고.**"* 맞는 반발이다. 화면은 **그렇게 하는 방법
         (전부 정렬해 한 번에 훑기)을 보여준 적이 없다.** 이유 없는 동작이었다.
       → 여기에 **목적 한 줄**을 박는다. 이 줄이 시뮬 제목(「누가 누구와 겹칠 수 있나」)에
         비로소 이유를 준다. 실측: 하나씩=6 회(맞음) · 전부 정렬해 훑기=12 회(틀림). */
    /* ⛔⛔ 2026-10-06 선생님: *"근데 **4를 9로 보낼 일이 있긴 있어?**"*
       ⭐ **없다. 그게 바로 섞으면 안 되는 이유다.** 4 는 비어 있다 — 아무도 4 를 9 로
         보내지 않는다. **섞어서 한 줄로 세울 때만 「보내야 하는 것처럼 보인다.»**
       ⛔ 그래서 직전 판(「섞어 세우면 4 를 9 로」)은 **허수아비**였다 —
         아무도 안 쓸 방법을 만들어 놓고 그게 깨지는 걸 보여줬다.
       ⛔ 그리고 선생님: *"설명이 **너무 짧게 짤려서 뭔말인지 모르는것** 같은데"* —
         걸음 셋으로 잘게 썰었더니 **더 안 읽혔다.** 한 걸음으로 되돌린다.
       ⭐ 이제 이 걸음은 **답이 아니라 물음**으로 끝난다. 뒤 걸음들(누가 누구와 겹치나 →
         나머지)이 **그 물음에 답하는 과정**이 된다. */
    /* ⛔⛔ 2026-10-06 선생님: *"설명 어색해. 우선 **한줄로 세우는건 앞에서 설명이 되어
         있지 않나?** 숫자 3이라고 써져 있는것을 모두 끝내고 숫자 4를 시작하려고 해요.
         첫번째 4는 예전에 없던 숫자라 그대로 나두고 두번째 4… 뭐 이렇게 가야하지 않을까?"*
       ⭐ **맞다.** 「줄을 세운다」도 「거리 ÷ 2」도 **그때까지 화면에 나온 적이 없다.**
         나오지도 않은 방법을 전제로 문제를 만들었으니 어색할 수밖에 없다.
       ⛔ 두 걸음(「문제가 있어요」 + 「한 줄로 세우면」)을 **버린다.**
         앞 다섯 걸음은 **3 을 하나씩 끝낸 것**이다 — 그 다음은 **4 를 시작하는 것**이
         자연스럽다. 걸음은 그냥 이어지고, 「상관이 있을까?」라는 **물음 하나**만 둔다.
       ⭐ 「간 거리 ÷ 2」는 **버리지 않았다** — 마지막 되짚기 걸음에 이미 있다
         (「하나씩 세는 대신 (7−3) ÷ 2 로 한 번에 — 아까 그 199억 번도 이렇게 사라져요」).
         거기가 제자리다. 쓰기도 전에 미리 말할 필요가 없다. */
    /* ⛔⛔ 2026-10-06 선생님: *"**학생은 이걸 어떻게 생각해냈는지가 궁금하지 않을까?**"*
         + *"이걸 **어떻게 풀었는지 알아야 비슷한 다른 문제도 풀지.**"*
       ⭐ `feedback_show_how_to_approach` — 선생님이 이 축을 지적하신 게 **세 번째**다.
         앞 두 번은 **도구로 닫았다**(접근법 칩·검사기). 칩은 「무엇을 쓰나」이지
         「어떻게 도달하나」가 아니다.
       ⛔ 직전 판은 **「나누어떨어져야 한다」를 결론만** 꺼냈고, 학생(초6)이 바로 막혔다:
         *"「횟수를 거리÷2로 구한다」는 규칙을 **그 전 5걸음 어디서도 말 안 해줬는데**
           갑자기 썼다. **9라는 숫자가 어디서 나왔는지도 안 보여준다.**"*
       ⭐ 그래서 **생각의 순서 그대로** 다섯 걸음으로 편다 —
         묻고 → 해 보고 → 깨지고 → 왜 깨졌나 → 그래서 이렇게.
         이 다섯이 **다음 문제에 가져갈 수 있는 유일한 부분**이다. */
    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "placed", "placed", "idle", "idle", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1], push: 3,
      emKo: "세지 말고 계산할 수 없을까요?",
      emEn: "could we compute instead of counting?",
      ko: "20만 개를 하나씩 셀 수는 없어요.\n세지 말고 계산할 수 없을까요?",
      en: "We cannot count 200,000 of them one at a time.\nCould we compute the number instead of counting it?" },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "placed", "moving", "idle", "idle", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1], push: 3,
      emKo: "(7−3) ÷ 2 = 2",
      emEn: "(7−3) / 2 = 2",
      ko: "셋째를 보세요. 3 에서 7 까지 2 씩 갔어요.\n그러면 몇 번 더했는지는 (7−3) ÷ 2 = 2 로 바로 나와요.",
      en: "Look at the third one. It went from 3 to 7, two at a time.\nSo the number of adds comes straight out: (7−3) / 2 = 2." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "placed", "placed", "moving", "idle", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1], push: 3,
      emKo: "줄을 세우고 이 식을 쓰면 되겠다",
      emEn: "line them up and use this formula",
      ko: "그럼 작은 것부터 줄을 세우고 이 식을 쓰면 되겠어요.\n3, 5, 7 까지는 잘 돼요. 다음은 4 차례예요 — 7 다음 빈 자리는 9 네요.",
      en: "So line them up smallest first and use that formula.\n3, 5, 7 works fine. Next is a 4 — and the first free spot after 7 is 9." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "placed", "placed", "moving", "idle", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1], push: 3, tone: "stuck",
      emKo: "2.5 — 식이 깨져요",
      emEn: "2.5 — the formula breaks",
      ko: "그런데 (9 − 4) ÷ 2 를 하면 2.5 가 나와요.\n더한 횟수가 2.5 번일 수는 없어요. 식이 깨졌어요.",
      en: "But (9 − 4) / 2 gives 2.5.\nYou cannot add something two and a half times. The formula broke." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "idle", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1, 0], hot: 0, push: 3,
      emKo: "4 는 9 에 닿을 수가 없어요",
      emEn: "4 can never land on 9",
      ko: "왜 깨졌을까요? 4 에 2 를 더하면 4, 6, 8 … 이에요.\n9 를 건너뛰어요 — 4 는 9 에 닿을 수가 없어요.",
      en: "Why did it break? Adding 2 to 4 gives 4, 6, 8 ….\nIt steps right over 9 — 4 can never land on 9." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "placed", "placed", "even", "even", "even"],
      extra: ["", "", "", "", "", ""], chains: [1, 0], push: 3,
      emKo: "닿을 수 있는 것끼리만",
      emEn: "only among those that can reach each other",
      ko: "그럼 아무나 한 줄로 세우면 안 되겠네요.\n닿을 수 있는 것끼리만 줄을 세워야 해요 — 3 쪽은 3 쪽끼리, 4 쪽은 4 쪽끼리.",
      en: "So we cannot line everyone up together.\nOnly those that can reach each other belong in the same line — 3s with 3s, 4s with 4s." },
    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "idle", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1], push: 3,
      ko: "넷째는 4 예요 — 전에 없던 수라 그대로 둬요.",
      en: "The fourth is 4, and nothing before it is 4 — so it stays." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "even", "idle"],
      extra: ["", "", "", "", "", ""], chains: [1], push: 3,
      emKo: "넷째와 겹쳤어요", emEn: "collides with the fourth",
      ko: "다섯째도 4 예요 — 넷째와 겹쳤어요.",
      en: "The fifth is 4 as well — it collides with the fourth." },

    /* ⛔ 2026-10-06 선생님: *"그냥 예를 **3 3 3 4 4 4** 로 하자"*
       ⭐ 이러면 **양쪽이 똑같은 모양**이 된다 — 3 쪽도 0+1+2 = 3 회, 4 쪽도 3 회, 합 6 회.
         6걸음의 상자(「같은 수가 세 개면 더하는 횟수는 0 + 1 + 2 = 3 회」)가
         **화면에서 두 번 실제로 일어난다.** 코드로 확인했다: 3 3 3 4 4 4, K=2 → **6**. */
    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "even", "even"],
      extra: ["", "", "", "", "", ""], chains: [1], push: 3,
      ko: "여섯째도 4 예요 — 또 겹쳤어요.",
      en: "The sixth is 4 too — another collision." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "even", "even"],
      extra: ["", "", "", "", "", ""], chains: [1, 0], hot: 0, push: 3,
      /* ⛔ 2026-10-06 선생님: *"**왜 4에 2를 더하지?** … **이건 4를 바꿀 필요가 없는 문제**잖아."*
         ⭐ **맞다.** 옛 예제 `3,3,3,4` 는 **4 가 영영 안 움직인다** — 그러니 「4 가 갈 수 있는 수」가
           **일어나지 않을 일**이었다. 「따로 봐도 된다」가 **아무것도 벌어 주지 않았다.**
         → 예제를 **`3,3,3,4,4`** 로 바꿨다. 이제 **4 쪽도 실제로 밀어야 한다.** */
      ko: "4 에 2 를 더하면 4, 6, 8 … 이에요.\n3 쪽은 홀수만, 4 쪽은 짝수만이라 겹칠 수가 없어요.",
      en: "Adding 2 to 4 gives 4, 6, 8 ….\nThe 3 side is all odd and the 4 side is all even, so they can never meet." },

    /* 3. **물음 — 이게 빠져 있었다.**
         ⚠️ 2026-09-29 선생님: *"k를 더하면 서로 뭔가 영향이 없다. 그 다음 나머지…
           **에잇 모르겠네**"* — 선생님이 논리를 이어 보시다 놓으셨다.
         ⭐ 원인: 화면에 **「나머지」가 답하는 질문이 없었다.** 줄 두 개를 보여주고
           바로 *"이게 나머지예요"* 로 갔다. 답이 먼저 오면 이어지지 않는다
           (`feedback_solution_framing` — *"그럼 어떻게 하면 될까?"* 로 열어라).
         → 빠진 질문은 이것이다: **「어느 수가 어느 줄인지, 줄을 끝까지 안 써 보고 알 수 있나?」**
           나머지는 그 질문의 답이고, 쓸모는 **줄 이름표**다. 성질이 아니라 **도구**로 준다.
         ⛔ 이 걸음에서는 답을 주지 마라. 나눗셈은 다음 걸음이다. */
    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "even", "even"],
      extra: ["", "", "", "", "", ""], chains: [1, 0], tone: "stuck", push: 4,
      ko: "그럼 3 과 4 는 절대 같아질 수 없겠네요.\n끝까지 다 써 보지 않고도 미리 알 수 있을까요?",
      en: "So 3 and 4 can never become the same number.\nIs there a way to know that without writing everything out?" },

    /* 4. **답 = 이름.** 앞 걸음의 물음에 나눗셈으로 답하고, 그 답에 이름을 준다.
         ⛔ 이 걸음 앞에서 「나머지」를 쓰지 마라 — 그게 선생님이 *"갑자기"* 라고
           하신 자리다. 그리고 이름을 **정의**로 주지 말고 **쓸모**로 줘라
           (「줄 이름표」) — `feedback_no_invented_terms` 는 뜻을, 여기서는 용도를 붙인다. */
    /* ⛔ 2026-10-02 (세 번째) — 선생님이 이 걸음을 보시고:
         *"밀 때마다? K씩 커지는것이기 때문에 커지더라도 나머지는 같아지는데
           그렇다면 나머지가 다른 숫자들에게는 서로 영향을 안준다는거지?
           **이것도 더 단계적으로**"*
       ⭐ 선생님이 이어 보신 고리가 **셋**인데 화면은 그 셋을 **한 말풍선 세 줄**로 주고,
         나눗셈 두 줄도 **동시에** 띄웠다. 고리 하나에 걸음 하나로 편다:
           ⓐ 3 줄을 2 로 나눠 본다 → 셋 다 1 이 남는다
           ⓑ 4 줄도 똑같이 → 셋 다 0 이 남는다
           ⓒ 그래서 **서로 영향을 못 준다**(= 절대 못 만난다)
       ⚠️ 줄은 이미 둘 다 떠 있다 — 새로 뜨는 건 **그 줄의 나눗셈 한 벌**뿐이다
         (`feedback_one_thing_changes_at_a_time`). `hot` 으로 지금 보는 줄만 켠다. */
    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "even", "even"],
      extra: ["", "", "", "", "", ""], chains: [1, 0], calc: [1], hot: 1,
      emKo: "나머지가 다 1",
      emEn: "all three leave 1",
      /* ⛔ 2026-10-06 선생님: *"이 이미지에서 **3줄이 뭐지?** 이건 한국말에서 어색한 표현인데"*
         맞다 — 「3 줄」은 **「석 줄」로 읽힌다.** 게다가 **아래 줄의 이름과도 안 맞았다**
         (그 줄 이름은 `3 이 갈 수 있는 수`, `:125`). **화면에 적힌 이름 그대로** 부른다. */
      ko: "3 에 2 를 계속 더하면 3, 5, 7, 9 … 예요.\n이 수들은 2 로 나눈 나머지가 다 1 이에요.",
      en: "Keep adding 2 to 3 and you get 3, 5, 7, 9 …\nDivided by 2, all of them leave a remainder of 1." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "even", "even"],
      extra: ["", "", "", "", "", ""], chains: [1, 0], calc: [1, 0], hot: 0,
      emKo: "나머지가 다 0",
      emEn: "all three leave 0",
      ko: "4 에 2 를 계속 더하면 4, 6, 8, 10 … 이에요.\n이 수들은 2 로 나눈 나머지가 다 0 이에요.",
      en: "Keep adding 2 to 4 and you get 4, 6, 8, 10 …\nDivided by 2, all of them leave a remainder of 0." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "even", "even"],
      extra: ["", "", "", "", "", ""], chains: [1, 0], calc: [1, 0], named: true, tone: "aha",
      /* ⚠️ 2026-09-29 5차 학생: *"화면이 「이 식은 나머지가 안 바뀌는 걸 보여주는
           거예요」 라고 **직접 말해준 적은 없다. 그냥 식 세 개만 던져놓고 넘어갔다.**"*
         ⛔ **2026-10-02 — 홀짝으로 설명하던 것이 틀린 길이었다.** 선생님:
            *"**잘못된 설명 아닌가?** 짝수 홀수가 아니라 **똑같이 k씩 커지고 그 나머지가
              항상 똑같은 것 같은데**"* — 홀짝은 **K=2 일 때 그렇게 보이는 것**일 뿐이다
            (`feedback_one_case_cannot_claim_always` — 이 quest 에서 **세 번째**였다).
         ⭐ 진짜 이유는 선생님 말씀 그대로다 — **한 번에 K 씩 커지니 K 로 나눈 나머지가
           안 바뀐다.** 그 말은 K 가 몇이든 맞다(다음 두 걸음이 K=1·K=3 으로 확인한다). */
      emKo: "나머지는 그대로예요",
      emEn: "the remainder never changes",
      ko: "2 를 더해도 나머지는 그대로예요 — 한쪽은 늘 1, 한쪽은 늘 0.\n두 수가 같아지려면 나머지도 같아야 해요. 그러니 나머지가 다르면 절대 같아질 수 없어요.",
      en: "Adding 2 never changes the remainder — one row always 1, the other always 0.\nFor two numbers to become equal their remainders must match — so different remainders never can." },

    /* 5. 일반화 **한 칸만.** K=1 을 옆에 놓아 「K 가 달라지면 갈리는 수가 달라진다」를
         한 번에 하나씩 본다. 표를 통째로 띄우지 않는다. */
    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "even", "even"],
      extra: ["", "", "", "", "", ""], kcompare: [1, 2], khot: 1,
      /* ⛔ 2026-10-06 선생님: *"그럼 **k=1일때는 소용이 없겠네?**"* → **맞다.**
           K=1 이면 묶음이 **하나**라 가르는 일이 아무것도 안 한다. 화면이 그 말을 해야 한다 —
           **「언제 소용없나」를 말해야 「언제 소용있나」가 믿을 만해진다.** */
      ko: "K 가 1 이면 어떨까요? 1 로 나누면 나머지가 늘 0 이에요.\n묶음이 하나뿐이라 가르는 게 아무 소용이 없어요 — 어떤 두 수든 같아질 수 있어요.",
      en: "What if K is 1? Divide anything by 1 and 0 is left.\nEvery leftover is the same, so any two numbers can meet." },

    /* 6. 일반화 **한 칸 더.** K=3. 셋째 줄은 **비워 둔다** — 우리 수가 안 쓰는 줄이다
         (`5 → 8 → 11` 을 쓰면 5 가 어디서 왔는지 학생이 묻는다). */
    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "idle", "idle", "even", "even", "even"],
      extra: ["", "", "", "", "", ""], kcompare: [1, 2, 3], khot: 3,
      /* ⛔ 2026-09-29 감사 담당이 **거짓**으로 잡았다. 옛 문장:
           *"2 를 더하든 3 을 더하든, 남는 수는 절대 안 바뀌어요."*
           **반례**: 3 에 2 를 더하면 5 이고 5 를 3 으로 나눈 나머지는 2 — 3 의 나머지 0 에서
           **바뀐다.** 참인 것은 «K 를 더하면 **그 K 로** 나눈 나머지가 안 바뀐다» 인데,
           두 K 를 한 문장에 섞어 그 조건을 지워 버렸다.
         ⛔ 선생님이 오늘 두 번 지적하신 「한 경우로 전체를 주장한다」의 **재발**이다
           (`feedback_one_case_cannot_claim_always`). 조건을 문장 안에 되살린다. */
      ko: "K 가 3 이면 나머지가 0, 1, 2 — 세 가지예요.\n3 씩 더하면 3 으로 나눈 나머지가 그대로예요. 2 씩 더할 때와 똑같아요.",
      en: "With K = 3 the leftovers are 0, 1 and 2 — three of them.\nAdding 3 keeps the leftover after ÷ 3, just like adding 2 kept the leftover after ÷ 2." },

    /* ⚠️ 2026-09-29 선생님(라이브 보시고): *"예전에는 **첫째 둘째 셋째 숫자가 바뀌는것도
         하나씩 시뮬로** 보여줬는데 **그 다음에 밑에 정리된게 보여야지.** 뭔가 시뮬이 뚝 끊겼어"*

       ⭐ **맞다. 내가 합쳐서 끊었다.** PM 판정(3쪽이 이미 같은 걸 가르친다 · 3차 학생이
         *"6걸음쯤부터 대충 누르기만"*)을 근거로 옛 걸음 5·6·7·8 을 **한 걸음**으로 만들었다.
         그 결과 타일이 `3,3,3,4` 에서 `3,5,7,4` 로 **한 번에 튄다** — 미는 장면이 사라졌다.
       ⛔ 3쪽이 가르친 것은 **K = 1** 일 때다. 여기는 K = 2 라 **한 번에 2 씩** 움직이고,
         「한 번 밀기」와 「두 번 밀기」가 갈리는 자리다 — 3쪽이 대신해 주지 못한다.
       → 하나씩 되살린다. **그리고 선생님 말씀대로 정리를 맨 뒤에 따로 둔다.** */
    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "placed", "placed", "even", "even", "even"],
      extra: [t(E, "· stays", "· 그대로"), "", "", "", "", ""], chains: [1, 0], named: true, ops: 0,
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
      /* ⭐ pedagogy 판정 2026-10-01 「5개 중 가장 먼저 고칠 것」 — 선생님이 **세 번** 물으신
           「안 묶으면 뭐가 깨지나」의 답이 이 문장인데, 말투만 허용형 → 필수형으로 두 번
           고쳐지고도 **화면에서 다른 문장과 구분된 적이 한 번도 없었다.**
           바로 아래 걸음의 🚫 상자가 이 주장을 증명하는 구조라, 주장이 안 보이면
           증명도 「뭘 증명하는지」 모른 채 지나간다. */
      /* ⛔ 2026-10-03 — 「봐야 해요」는 **필수**로 읽힌다. 그런데 묶기는 필수가 아니다
           (정확성이 아니라 속도다 — 선생님이 반증하셨다). **계획 선언**으로 바꾼다. */
      emKo: "3 끼리, 4 끼리 따로",
      emEn: "3s with 3s, 4s with 4s",
      ko: "3 과 4 는 절대 안 겹쳐요 — 그러니 3 끼리, 4 끼리 따로 봐요.\n먼저 3 쪽. 첫째는 그대로였어요 — 0 회.",
      en: "4 can never overlap with the 3s — so we only need to look at the 3s.\nNow count the pushes. The first one never moved — 0." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "moving", "placed", "even", "even", "even"],
      extra: ["", "· 3→5", "", "", "", ""], chains: [1, 0], named: true, ops: 1,
      ko: "둘째는 첫째와 같은 3 이라 2 를 더했어요. 3 에서 5 로 — 1 회.",
      en: "The second was also a 3, so it had to step aside. 3 to 5 — one push." },

    { tiles: [3, 5, 7, 4, 4, 4], st: ["placed", "placed", "moving", "even", "even", "even"],
      extra: ["", "", "· 3→5→7", "", "", ""], chains: [1, 0], named: true,
      formula: "(7-3) ÷ 2 = 2", ops: 3,
      ko: "셋째는 5 도 차 있어서 2 를 두 번 더했어요. 7 까지 — 2 회.\n하나씩 세는 대신 (7−3) ÷ 2 로 한 번에 — 아까 그 199억 번도 이렇게 사라져요.",
      en: "The third found 5 taken too and went on to 7 — two pushes.\nInstead of counting one by one, (7−3) / 2 in one go — that is how the 19,999,900,000 goes away." },

    /* 선생님: *"그 다음에 **밑에 정리된게** 보여야지"* — 미는 장면이 다 끝난 뒤에 정리 한 걸음. */
    /* ⛔ 2026-10-02 — 선생님이 16/16 화면을 보시고: *"갑자기 너무 많은 정보가 들어와"*
       ⭐ 한 걸음에 **말풍선 두 줄 + 🚫 상자 네 줄 + 줄 둘 + 민 횟수**가 동시에 떴다.
         상자 혼자 네 가지를 말한다 — ①4 도 9 까지 ②(9−4)÷2 = 2.5 ③못 간다 ④횟수 5.
       → **결과 → 상자 한 토막씩** 으로 가른다. 상자가 열리는 동안은 아래 줄 둘을
         내린다 — 지금 볼 곳이 상자 하나가 되게. */
    { tiles: [3, 5, 7, 4, 6, 8], st: ["placed", "placed", "placed", "placed", "moving", "moving"],
      extra: ["", "", "", "", "", ""], chains: [1, 0], named: true, ops: 6, tone: "aha",
      emKo: "3 + 3 = 6 회",
      emEn: "3 + 3 = 6",
      ko: "4 쪽도 똑같아요 — 넷째는 그대로, 다섯째는 6, 여섯째는 8. 0 + 1 + 2 = 3 회.\n3, 5, 7, 4, 6, 8 — 다 달라졌어요. 3 + 3 = 6 회.",
      en: "The 4 side is the same — fourth stays, fifth to 6, sixth to 8. 0 + 1 + 2 = 3.\n3, 5, 7, 4, 6, 8 — all different now. 3 + 3 = 6." },

    
  ];
  const ts = useTraceStep(steps, "quest-step-makedistinct-whocanmeetsim");
  const s = steps[ts.safe];

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        /* ⚠️ PM 이 잡았다(2026-09-29) — 제목이 「K = 2 일 때」인데 걸음 5·6 은
             K = 1 · K = 3 을 다룬다. 걸음을 일반화로 바꾸면서 **제목을 안 따라 고쳤다.** */
        title={t(E, "Which values can ever overlap?", "누가 누구와 겹칠 수 있나")}
 />
      <StepFade fast k={ts.safe}>
        <Say tone={s.tone}><Em text={t(E, s.en, s.ko)} em={t(E, s.emEn, s.emKo)} /></Say>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          {s.tiles.map((v, i) => (
            <Tile key={i} v={v} state={s.st[i]} note={`${ord(i)} ${s.extra[i]}`.trim()} />
          ))}
        </div>

        {/* ⭐ 자리는 **타일 바로 아래**다 — 「묶어서 푼 결과(타일)」와 「안 묶은 결과」가
            나란히 보여야 대조가 된다. 마지막 걸음에만 뜨므로 그 위의 줄은 안 밀린다
            (ux 판정 2026-09-29 의 「새로 뜨는 것은 아래로만」). */}

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
              /* ⛔ 2026-10-02 학생(초6): *"「K가 3이면」이라는데 켜진 박스는 K=2 쪽이었다"*
                 — `on={kc.k === 2}` 가 **못 박혀** 있었다. 말풍선이 말하는 K 를 켠다. */
              <KRows key={kc.k} E={E} k={kc.k} rows={kc.rows} on={kc.k === s.khot} />
            ))}
          </div>
        )}

        {s.chains && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10,
            width: "fit-content", maxWidth: "100%", marginLeft: "auto", marginRight: "auto" }}>
            {s.chains.map((rem) => (
              <ChainRow key={rem} E={E} k={2} rem={rem} hot={s.hot === rem}
                vals={chainText(rem, s.push)}
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

        {/* ⭐ 「199억 9,990만」이 **무엇을 더한 수인지**를 식으로 보인다.
            선생님(2026-10-06): *"199억번이라는건 뭘?"* — 화면은 그 전에
            수만 적어 두고 **믿으라고** 했다. 윗줄은 지금 화면에 이미 있는 「3 회」다 —
            같은 식의 길이만 늘어나면 아랫줄이 된다.
            ⚠️ 새 걸음·새 상자를 만들지 않았다 — 걸음 하나에서만 뜨고,
              위에 있는 줄은 안 밀린다(ux 판정 2026-09-29 「아래로만」).
            ⛔ 「찾는 횟수·조회」로 읽힐 말을 여기 쓰지 마라 — 세는 것은 더한 횟수 하나다. */}
        {s.sum && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10,
            width: "fit-content", maxWidth: "100%", marginLeft: "auto", marginRight: "auto",
            background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "8px 12px" }}>
            {[
              { ko: "같은 수가 세 개면 더하는 횟수는", en: "Three of the same — moves:",
                vKo: "0 + 1 + 2 = 3 회", vEn: "0 + 1 + 2 = 3" },
              { ko: "같은 수가 20만 개면 더하는 횟수는", en: "200,000 of the same — moves:",
                vKo: "0 + 1 + 2 + ⋯ + 199,999 = 199억 9,990만 회",
                vEn: "0 + 1 + 2 + ⋯ + 199,999 = 19,999,900,000" },
            ].map((r, i) => (
              /* ⚠️ 390px 에서 두 줄이 **다르게** 접혔다 — 윗줄은 한 줄로 붙고
                 아랫줄은 「회」 한 글자만 세 줄째로 내려갔다. 두 줄을 비교하라는 상자인데
                 모양이 달라지면 비교가 안 된다 → **항상 「말 줄 / 식 줄」 두 줄**로 고정한다. */
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e",
                  wordBreak: "keep-all" }}>{t(E, r.en, r.ko)}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5,
                  fontWeight: 700, whiteSpace: "nowrap",
                  color: i === 1 ? "#b45309" : "#a16207" }}>{t(E, r.vEn, r.vKo)}</span>
              </div>
            ))}
          </div>
        )}

        {s.ops !== undefined && (
          <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
            {t(E, "Moves so far: ", "지금까지 더한 횟수: ")}
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
