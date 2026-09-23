import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";
import { StepFade } from "@/components/quest/StepFade";
import { t } from "@/components/quest/theme";

/* strangefn 시뮬 — x = 210 을 f 로 한 번씩 줄여보기.

   왜 생겼나 (2026-09-22, pedagogy·ux 판정 반영) — 3쪽이 x=210 의 과정을
   텍스트 표(트레이스)로만 나열하고 있었다. 형제 quest(`makedistinct`,
   `photoshoot25`)는 같은 자리를 SimNav 단계(◀▶) + 말풍선으로 보여준다 —
   근거: `memory/feedback_sim_style_consistency.md`.

   ⚠️ 이 시뮬 안에서는 "이진수" 라는 말을 한 번도 쓰지 않는다. 여기서 다루는
   "10" 은 **십진수 십**이다(자리별 뺄셈만). "이진수로 읽는다" 는 해석은
   6쪽(패턴 정리)에서 처음 나온다 — 섞으면 같은 모양의 "10" 이 쪽마다 다른
   뜻이 된다.

   모양은 `makedistinct/sims.jsx` 를 그대로 베꼈다 — `Tile`·`Say`·`SimNav`
   문법, 말풍선은 "이번에 새로 나오는 것 바로 위"(한 걸음에 바뀌는 자리는
   한 곳: `memory/feedback_one_thing_changes_at_a_time.md`).
   `Tile` 에는 상태를 **`drop` 하나만** 추가했다 — 맨 앞 0 이 자리를
   차지하지 않음을 보이기 위해서다(흐려짐 + 취소선). 그 외 새 상태·새
   컴포넌트는 만들지 않았다.

   걸음 3 은 f 를 쓴 게 아니다(맨 앞 0 은 표기일 뿐이라 ops 는 그대로).
   걸음 4·5·6 은 각각 실제 연산 정확히 한 번씩이다(10→9, 9→1, 1→0) —
   한 걸음 = 한 번의 f, ops 는 매 걸음 최대 1 씩만 늘어난다. 그 자리엔
   `formula` 로 무슨 일이 있었는지 숫자로 남긴다
   (`memory/feedback_same_number_two_meanings.md` — 같은 숫자가 다른
   뜻으로 겹치지 않게, 출처를 식으로 밝힌다).

   전수 검산(2026-09-22): 210 → 010(=10) → 9 → 1 → 0, 총 4번.
   ⚠️ 2026-09-22 학생 검증에서 ops 가 null→1→1→1→2→4 로 나와 3 이
   통째로 빠지는 버그를 잡았다(6번째 걸음이 9→1→0 을 한 걸음에
   압축해서 생긴 문제). 지금은 매 걸음 정확히 한 번씩만 늘어난다. */

const A = "#8b5cf6";

function Say({ children, tone = "go" }) {
  const c = tone === "aha" ? { bg: "#ecfdf5", bd: "#6ee7b7", fg: "#065f46" }
          : tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : { bg: "#f5f3ff", bd: "#c4b5fd", fg: "#5b21b6" };
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

/* 자릿수 하나를 칸으로. idle=아직 안 바뀐 자리(회색), placed=지금 값(보라),
   drop=맨 앞 0 이라 자리를 안 차지함(흐려짐 + 취소선) — 새로 추가한 유일한 상태. */
function Tile({ v, state, note }) {
  const c = state === "drop" ? { bg: "#f8fafc", bd: "#e2e8f0", fg: "#94a3b8" }
          : state === "placed" ? { bg: "#ede9fe", bd: "#8b5cf6", fg: "#5b21b6" }
          : { bg: "#f8fafc", bd: "#cbd5e1", fg: "#334155" };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <div style={{
        width: 54, height: 54, borderRadius: 12,
        background: c.bg, border: `2px solid ${c.bd}`, color: c.fg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 21, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
        textDecoration: state === "drop" ? "line-through" : "none",
        opacity: state === "drop" ? 0.55 : 1,
        transition: "all .25s",
      }}>{v}</div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: c.fg, minHeight: 14, whiteSpace: "nowrap" }}>{note || ""}</div>
    </div>
  );
}

export function StrangeFnDigitSim({ E }) {
  const steps = [
    { tiles: [["2", "idle"], ["1", "idle"], ["0", "idle"]],
      note: [t(E, "even", "짝"), t(E, "odd", "홀"), t(E, "even", "짝")],
      ops: null,
      ko: "x = 210 이에요. 0 도 1 도 아닌 자리가 있나요? 2 가 있어요.",
      en: "x = 210. Any digit other than 0 or 1? Yes — the 2." },
    { tiles: [["0", "placed"], ["1", "placed"], ["0", "placed"]],
      note: ["2→0", "1→1", "0→0"], ops: 1,
      ko: "그러면 자리마다 홀짝으로 바꿔요. 홀수는 1, 짝수는 0.",
      en: "So we flip each digit by parity: odd → 1, even → 0." },
    { tiles: [["0", "drop"], ["1", "placed"], ["0", "placed"]],
      note: [t(E, "doesn't count", "없는 셈"), "", ""], ops: 1,
      ko: "맨 앞 0 은 자리를 차지하지 않아요. 그래서 이건 f 를 쓴 게 아니라, f 횟수는 그대로예요.",
      en: "A leading 0 doesn't take up a place — so this isn't a use of f, ops stays the same." },
    { tiles: [["9", "placed"]],
      note: ["10→9"], ops: 2, formula: "10 − 1 = 9",
      ko: "이제 0 과 1 만 남았어요. 그러면 1 을 빼요. 10 에서 1 을 빼면 9예요.",
      en: "Now only 0 and 1 are left, so we subtract 1 — 10 − 1 = 9." },
    { tiles: [["1", "placed"]],
      note: ["9→1"], ops: 3,
      ko: "9 는 0 도 1 도 아니에요. 그러면 다시 홀짝으로 바꿔요. 9 는 홀수라서 1 이 돼요.",
      en: "9 is neither 0 nor 1 — flip by parity again. 9 is odd, so 1." },
    { tiles: [["0", "placed"]],
      note: [""], ops: 4, formula: "1 − 1 = 0", tone: "aha",
      ko: "0 과 1 만 남았으니 1 을 빼요. 0 이 됐어요. 모두 4 번이에요.",
      en: "Only 0 and 1 left, so subtract 1. It's 0 now — 4 times total." },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} icon="🔮" idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Applying f to x = 210", "x = 210 을 f 로 줄여보기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <StepFade fast k={ts.safe}>
        <Say tone={s.tone}>{t(E, s.en, s.ko)}</Say>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          {s.tiles.map((v, i) => (
            <Tile key={i} v={v[0]} state={v[1]} note={s.note ? s.note[i] : ""} />
          ))}
        </div>

        {s.formula && (
          <div style={{ textAlign: "center", fontSize: 12.5, fontWeight: 800, color: "#92400e",
            fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>
            {s.formula}
          </div>
        )}
        {s.ops !== null && (
          <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
            {t(E, "Uses of f so far: ", "지금까지 쓴 f 횟수: ")}
            <span style={{ fontSize: 18, color: A, fontFamily: "'JetBrains Mono',monospace" }}>{s.ops}</span>
          </div>
        )}
      </StepFade>
      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
