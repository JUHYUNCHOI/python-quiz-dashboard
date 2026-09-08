import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { SimNav, useTraceStep } from "@/components/quest/TraceStepper";
import { getSimpleGameWalk } from "./components";

const KA = { wordBreak: "keep-all" };
const A = "#dc2626";

/* ─────────────────────────────────────────────────────────────
   Concept sim: pairs (a, b). Evirir adds a, Rhae subtracts b.
   Sort by a+b descending, then step turn by turn — Evirir grabs
   the top (+a), Rhae takes the next (−b), accumulating X−Y.
   Teaches: both players fight for the high-(a+b) pairs first, so
   optimal play just processes them in a+b order, alternating sign.
   ───────────────────────────────────────────────────────────── */
const DEMO = [
  { a: 6, b: 2 },
  { a: 2, b: 5 },
  { a: 4, b: 1 },
  { a: 1, b: 2 },
];
// sorted by a+b desc: (6,2)=8, (2,5)=7, (4,1)=5, (1,2)=3
const SORTED = [...DEMO].sort((p, q) => (q.a + q.b) - (p.a + p.b));

/* ─────────────────────────────────────────────────────────────
   LineUpSim — 한 번의 선택 규칙을 **전체 순서**로 잇는 다리.

   선생님(2026-09-08): "그 합의 정렬로 해야한다는게 아직도 안보여. 강조해줘."
   수업 담당도 같은 자리를 짚었다 — 3쪽은 "이 쌍 하나를 먼저 가져간다"(한 번의 결정)
   까지만 가는데, 그다음 쪽은 갑자기 **이미 줄 세워진** 목록을 보여준다.
   "정렬" 이라는 말이 근거 없이 결과 라벨로 먼저 나왔다.

   여기서 이웃 둘씩 견줘 큰 쪽을 앞으로 보낸다. 그걸 반복하면 줄이 저절로
   a+b 순서로 선다 — 그게 '정렬' 이다. 앞의 규칙을 그대로 되풀이할 뿐이다.
   ───────────────────────────────────────────────────────────── */
const LINEUP = [
  { order: [1, 0, 3, 2], cmp: null,   swap: false },   // 섞인 채로 시작
  { order: [1, 0, 3, 2], cmp: [0, 1], swap: true  },   // 7 vs 8 → 바꾼다
  { order: [0, 1, 3, 2], cmp: [1, 2], swap: false },   // 7 vs 3 → 그대로
  { order: [0, 1, 3, 2], cmp: [2, 3], swap: true  },   // 3 vs 5 → 바꾼다
  { order: [0, 1, 2, 3], cmp: null,   swap: false },   // 다 섰다
];

function LineUpSim({ E }) {
  const { safe, setIdx, total } = useTraceStep(LINEUP.length);
  const st = LINEUP[safe];
  const done = safe === LINEUP.length - 1;
  const shown = st.order.map((i) => DEMO[i]);

  const BUBBLE = [
    t(E, "Four pairs, in no particular order. We only know one rule: the pair with the bigger a+b should go first.",
        "쌍 넷이 아무 순서 없이 놓여 있어요.\n우리가 아는 건 규칙 하나뿐이에요 —\na+b 가 큰 쌍이 먼저 가야 한다."),
    t(E, "Compare the first two: 7 and 8. The bigger one should come first, so swap them.",
        "앞의 둘을 견줘요. 7 과 8.\n큰 쪽이 앞에 와야 하니 자리를 바꿔요."),
    t(E, "Next pair of neighbours: 7 and 3. The bigger one is already in front — leave it.",
        "다음 이웃 둘. 7 과 3.\n큰 쪽이 이미 앞에 있어요 — 그대로 둬요."),
    t(E, "Next: 3 and 5. Swap again.",
        "그다음. 3 과 5.\n또 바꿔요."),
    t(E, "Keep doing just that and the whole row ends up in a+b order by itself. That is all “sorting” means here.",
        "이것만 되풀이하면 줄 전체가 저절로 a+b 순서로 서요.\n여기서 말하는 ‘정렬’ 이 바로 이거예요."),
  ];

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 10 }}>
          📶 {t(E, "Four pairs — put them in order", "쌍 네 개 — 줄 세우기")}
        </div>

        <div style={{
          background: done ? "#ecfdf5" : "#fffbeb",
          border: `1.5px solid ${done ? "#6ee7b7" : "#fbbf24"}`,
          borderRadius: 10, padding: "10px 13px", marginBottom: 12,
          fontSize: 12.5, lineHeight: 1.75, color: C.text,
          whiteSpace: "pre-line", textWrap: "balance", ...KA,
        }}>
          💬 {BUBBLE[safe]}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {shown.map((p, i) => {
            const on = st.cmp && (i === st.cmp[0] || i === st.cmp[1]);
            return (
              <div key={`${p.a}-${p.b}`} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                borderRadius: 10, padding: "8px 10px", minWidth: 66,
                border: `2px solid ${on ? A : done ? "#6ee7b7" : "#e2e8f0"}`,
                background: on ? "#fff" : done ? "#ecfdf5" : "#f8fafc", ...KA,
              }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#334155" }}>
                  ({p.a}, {p.b})
                </div>
                <div style={{ fontSize: 10.5, color: C.dim }}>
                  a+b = <b style={{ color: on ? A : "#7c3aed" }}>{p.a + p.b}</b>
                </div>
              </div>
            );
          })}
        </div>

        {st.cmp && (
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12,
            color: st.swap ? A : "#065f46", ...KA }}>
            {st.swap ? t(E, "→ swap", "→ 자리를 바꿔요") : t(E, "→ leave it", "→ 그대로 둬요")}
          </div>
        )}

        {done && (
          <div style={{
            background: "#065f46", color: "#fff", borderRadius: 10,
            padding: "12px 14px", marginBottom: 12, textAlign: "center", ...KA,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: 0.5, marginBottom: 4 }}>
              {t(E, "THE RULE", "우리가 쓸 규칙")}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.5 }}>
              {t(E, "Line the pairs up by a+b, biggest first.",
                  "쌍을 a+b 가 큰 순서로 줄 세운다.")}
            </div>
            <div style={{ fontSize: 11.5, marginTop: 6, opacity: 0.9, lineHeight: 1.6 }}>
              {t(E, "Then just take them from the front, turn by turn.",
                  "그다음엔 앞에서부터 차례대로 가져가기만 하면 돼요.")}
            </div>
          </div>
        )}

        <SimNav idx={safe} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
      </div>
    </div>
  );
}

function PairPickSim({ E }) {
  // turn = how many pairs have been taken (0..SORTED.length)
  const [turn, setTurn] = useState(0);

  // running X-Y after `turn` picks
  let running = 0;
  for (let i = 0; i < turn; i++) {
    running += i % 2 === 0 ? SORTED[i].a : -SORTED[i].b;
  }
  const done = turn >= SORTED.length;
  const nextIsEvirir = turn % 2 === 0;

  const pairCard = (p, i) => {
    const taken = i < turn;
    const active = i === turn && !done;
    const isEvirir = i % 2 === 0;
    return (
      <div key={i} style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        borderRadius: 10, padding: "8px 10px", minWidth: 66,
        border: active ? `2px solid ${A}` : taken ? "1.5px solid #cbd5e1" : "1.5px solid #fca5a5",
        background: active ? "#fef2f2" : taken ? "#f1f5f9" : "#fff",
        opacity: taken ? 0.55 : 1, ...KA,
      }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#334155" }}>
          ({p.a}, {p.b})
        </div>
        <div style={{ fontSize: 10.5, color: C.dim }}>
          a+b = <b style={{ color: "#7c3aed" }}>{p.a + p.b}</b>
        </div>
        {taken && (
          <div style={{ fontSize: 10.5, fontWeight: 800, color: isEvirir ? "#15803d" : "#dc2626" }}>
            {isEvirir ? `+${p.a}` : `−${p.b}`}
          </div>
        )}
        {active && (
          <div style={{ fontSize: 10, fontWeight: 700, color: A }}>
            {isEvirir ? t(E, "Evirir", "Evirir") : t(E, "Rhae", "Rhae")}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
          🎮 {t(E, "Take them from the front", "앞에서부터 차례대로")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7, marginBottom: 12, textWrap: "balance" }}>
          {t(E,
            "The pairs are lined up by the rule we just found. Now just take them from the front, turn by turn.",
            "방금 정한 규칙대로 줄을 세워뒀어요.\n이제 앞에서부터 차례대로 가져가기만 하면 돼요.\n한 칸씩 눌러 X−Y 가 쌓이는 걸 봐요.")}
        </div>

        {/* sorted pairs */}
        <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 6 }}>
          {t(E, "pairs sorted by a+b (high → low)", "a+b 내림차순 정렬된 쌍 (큰 것 → 작은 것)")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {SORTED.map((p, i) => pairCard(p, i))}
        </div>

        {/* controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => setTurn(Math.max(0, turn - 1))} disabled={turn === 0} style={navBtn(turn === 0)}>◀ {t(E, "back", "이전")}</button>
          <button onClick={() => setTurn(Math.min(SORTED.length, turn + 1))} disabled={done} style={navBtn(done)}>
            {done ? t(E, "done", "끝") : nextIsEvirir ? t(E, "Evirir takes +a ▶", "Evirir 가 +a ▶") : t(E, "Rhae takes −b ▶", "Rhae 가 −b ▶")}
          </button>
          <button onClick={() => setTurn(0)} style={{ ...navBtn(false), background: "#fff", color: "#7f1d1d" }}>↺ {t(E, "reset", "처음")}</button>
        </div>

        {/* running total */}
        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, ...KA }}>
          <span style={{ color: "#8b949e" }}>X − Y = </span>
          {SORTED.slice(0, turn).map((p, i) => (
            <span key={i}>
              <b style={{ color: i % 2 === 0 ? "#86efac" : "#fca5a5" }}>{i % 2 === 0 ? `+${p.a}` : `−${p.b}`}</b>{" "}
            </span>
          ))}
          {turn > 0 && <span style={{ color: "#8b949e" }}>= </span>}
          <b style={{ color: "#fbbf24" }}>{running}</b>
          {done && <span style={{ color: "#86efac", fontWeight: 800 }}>  ✓ {t(E, "final", "최종")}</span>}
        </div>

        {/* 모바일에서 이 마지막 문장이 하단 고정 바 밑으로 들어갔다 (2026-09-08).
            검사기는 "겹침 0개" 라고 했고, 스크린샷을 눈으로 봐서 찾았다. */}
        <div style={{ marginTop: 10, marginBottom: 8, fontSize: 11.5, color: C.dim, lineHeight: 1.65, textWrap: "balance", ...KA }}>
          {/* 전에는 "게임 트리를 그릴 필요 없어요:" 로 시작했다. 그런데 게임 트리가
              무엇인지는 어디서도 알려주지 않는다 — 2026-09-08 학생이 그걸 짚었다.
              쓰지 않기로 했다. 콜론 이어붙이기도 함께 정리 (feedback_korean_natural_writing). */}
          {t(E,
            "Once the pairs are lined up this way, the answer is just +a, −b, +a, −b … added up.",
            "이렇게 줄만 세워두면, 답은 +a, −b, +a, −b … 를 더한 것뿐이에요.")}
        </div>
      </div>
    </div>
  );
}
/* ─────────────────────────────────────────────────────────────
   SwapSim — 쌍 2개로 순서를 바꿔보는 미니 시뮬.

   2026-09-08 초6 학생: "교환 논증은 결국 못 알아들었다."
   그러면서 직접 제안했다 — "쌍 2개짜리로 순서를 바꿔보게 해달라."
   그대로 만들었다.

   ⚠️ 쌍이 **둘일 때만** 이렇게 비교해도 거짓말이 안 된다.
   Evirir 가 고르고 나면 Rhae 에겐 남은 하나뿐이라 선택의 여지가 없다.
   셋부터는 상대가 이 순서를 따라줄 이유가 없어서, "다른 순서로 하면
   이만큼 손해" 라는 식의 비교를 하면 틀린 말이 된다. (검증: 최적값 1)
   ───────────────────────────────────────────────────────────── */
const TWO = [{ a: 5, b: 1 }, { a: 2, b: 6 }];

function SwapSim({ E }) {
  const { safe, setIdx, total } = useTraceStep(5);

  const orderRow = (firstIdx, on) => {
    const f = TWO[firstIdx], r = TWO[1 - firstIdx];
    const total_ = f.a - r.b;
    return (
      <div style={{
        border: `1.5px solid ${on ? A : "#e2e8f0"}`, borderRadius: 10,
        background: on ? "#fff" : "#f8fafc", padding: "10px 12px",
        opacity: on ? 1 : 0.45, ...KA,
      }}>
        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#7f1d1d", marginBottom: 6 }}>
          {t(E, `Evirir takes (${f.a}, ${f.b}) first`, `Evirir 가 (${f.a}, ${f.b}) 먼저 가져가기`)}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center",
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5 }}>
          <span style={{ color: "#15803d", fontWeight: 800 }}>+{f.a}</span>
          <span style={{ color: C.dim, fontSize: 11.5, fontFamily: "inherit" }}>
            {t(E, `Rhae only has (${r.a}, ${r.b}) left`, `Rhae 에겐 (${r.a}, ${r.b}) 밖에 안 남아요`)}
          </span>
          <span style={{ color: "#dc2626", fontWeight: 800 }}>−{r.b}</span>
          <span style={{ color: C.dim }}>⇒</span>
          <b style={{ color: on ? "#b45309" : C.dim, fontSize: 14 }}>{total_}</b>
        </div>
      </div>
    );
  };

  const BUBBLE = [
    t(E, "Only two pairs. Evirir picks first — Rhae just gets the leftover.\nSo which one should he take?",
        "쌍이 둘뿐이에요. Evirir 가 먼저 고르면\nRhae 에겐 남은 하나밖에 없어요.\n어느 걸 가져가야 할까요?"),
    t(E, "Take (5, 1): he gains 5, but hands (2, 6) to Rhae.\nX−Y comes out −1.",
        "(5, 1) 을 가져가면 5 를 얻지만\n(2, 6) 을 Rhae 에게 넘겨줘요.\nX−Y 는 −1 이 돼요."),
    t(E, "Take (2, 6): he only gains 2 — but Rhae is left with (5, 1)\nand can only take away 1. X−Y is +1. Better!",
        "(2, 6) 을 가져가면 2 밖에 못 얻어요.\n대신 Rhae 에겐 (5, 1) 만 남아 1 밖에 못 빼가요.\nX−Y 는 +1. 이쪽이 나아요!"),
    t(E, "The gap is 2. And 2 is exactly (2+6) − (5+1) = 8 − 6.\nThat is not a coincidence. Why a+b?",
        "차이는 2 예요. 그런데 2 는\n(2+6) − (5+1) = 8 − 6 과 똑같아요.\n우연이 아니에요. 왜 하필 a+b 일까요?"),
    /* 선생님(2026-09-08): "왜 합을 기준으로 정렬을 했지?"
       숫자로 "차이 2 = 8−6" 까지만 보여주고 **왜 a+b 인지 한 줄이 없었다.**
       숫자를 먼저 보고 나서 기호로 옮기는 순서 (feedback_first_concept_scaffolding). */
    t(E, "A pair swings X−Y by a if I take it, and by −b if the opponent does.\nSo who gets it changes the answer by a+b. Take the widest swing first.",
        "쌍 하나는 내가 가져가면 +a,\n상대가 가져가면 −b 예요.\n그러니 그 쌍이 누구 손에 가느냐로 a+b 만큼이 갈려요.\n갈리는 폭이 큰 쌍부터 가져가는 거예요."),
  ];

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 10 }}>
          🔁 {t(E, "Two pairs — swap the order and see", "쌍 두 개 — 순서를 바꿔보기")}
        </div>

        {/* 말풍선 */}
        <div style={{
          background: safe === 4 ? "#ecfdf5" : "#fffbeb",
          border: `1.5px solid ${safe === 4 ? "#6ee7b7" : "#fbbf24"}`,
          borderRadius: 10, padding: "10px 13px", marginBottom: 12,
          fontSize: 12.5, lineHeight: 1.75, color: C.text,
          whiteSpace: "pre-line", textWrap: "balance", ...KA,
        }}>
          💬 {BUBBLE[safe]}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
          {orderRow(0, safe >= 1)}
          {orderRow(1, safe >= 2)}
        </div>

        {safe >= 3 && (
          <div style={{
            background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: "10px 12px",
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7,
            marginBottom: 12, ...KA,
          }}>
            <div>1 − (−1) = <b style={{ color: "#fbbf24" }}>2</b></div>
            <div>(2+6) − (5+1) = <b style={{ color: "#fbbf24" }}>2</b></div>
            {safe >= 4 && (
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #334155" }}>
                <div>{t(E, "I take it", "내가 가져가면")}
                  <b style={{ color: "#86efac" }}>  + a</b></div>
                <div>{t(E, "they take it", "상대가 가져가면")}
                  <b style={{ color: "#fca5a5" }}>  − b</b></div>
                <div style={{ marginTop: 4 }}>{t(E, "the swing", "갈리는 폭")}
                  <b style={{ color: "#fbbf24" }}>  a + b</b></div>
              </div>
            )}
          </div>
        )}

        <SimNav idx={safe} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
      </div>
    </div>
  );
}

function navBtn(disabled) {
  return {
    padding: "6px 12px", borderRadius: 8, border: `1.5px solid ${A}`,
    background: disabled ? "#f1f5f9" : A, color: disabled ? "#94a3b8" : "#fff",
    fontSize: 12.5, fontWeight: 700, cursor: disabled ? "default" : "pointer",
  };
}

/* ================================================================
   SOLUTION CODE  (sort by a+b desc, alternate +a / -b)
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "def main():",
  "    data = sys.stdin.read().split()",
  "    idx = 0",
  "    n = int(data[idx])",
  "    idx += 1",
  "",
  "    items = []",
  "    for _ in range(n):",
  "        a = int(data[idx])",
  "        b = int(data[idx + 1])",
  "        idx += 2",
  "        # keep the sum in front, so a plain sort lines them up by the sum",
  "        items.append((a + b, a, b))",
  "",
  "    items.sort(reverse=True)   # biggest sum first",
  "",
  "    res = 0",
  "    turn = 0",
  "    for sum_ab, a, b in items:",
  "        if turn % 2 == 0:",
  "            res += a",
  "        else:",
  "            res -= b",
  "        turn += 1",
  "",
  "    print(res)",
  "",
  "main()",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem
   ═══════════════════════════════════════════════════════════════ */
export function makeSimpleGameCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      /* narr 는 55자 한 줄 (memory/feedback_narration_short.md).
         전에는 196자였고, 바로 아래 미션·문제 카드가 같은 말을 또 했다. */
      narr: t(E,
        "Evirir and Rhae take turns splitting n pairs (a, b).",
        "Evirir 와 Rhae 가 쌍 (a, b) 를 번갈아 나눠 가져요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🎮"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: A }}>Simple Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P4</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Both players play optimally — print the final X−Y.",
                "두 사람이 최적으로 둘 때의 최종 X−Y 를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "총 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "n pairs", "n 개의 쌍")}</b>
                  {t(E, " ", " ")}<b style={{ color: "#334155" }}>(a, b)</b>
                  {t(E, ". Evirir and Rhae take turns, Evirir first.", ". Evirir 와 Rhae 가 번갈아 두고, Evirir 가 먼저예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "On his turn ", "차례에 ")}<b style={{ color: "#15803d" }}>Evirir</b>
                  {t(E, " removes a pair and adds its ", " 는 쌍 하나를 없애고 그 ")}<b style={{ color: "#15803d" }}>a</b>
                  {t(E, " to ", " 를 ")}<b>X</b>{t(E, ". On her turn ", " 에 더해요. 차례에 ")}<b style={{ color: "#dc2626" }}>Rhae</b>
                  {t(E, " removes a pair and adds its ", " 는 쌍 하나를 없애고 그 ")}<b style={{ color: "#dc2626" }}>b</b>
                  {t(E, " to ", " 를 ")}<b>Y</b>{t(E, ".", " 에 더해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#15803d" }}>Evirir</b>{t(E, " wants ", " 는 ")}<b>X−Y</b>{t(E, " as big as possible; ", " 를 최대한 크게, ")}
                  <b style={{ color: "#dc2626" }}>Rhae</b>{t(E, " wants it as small as possible.", " 는 최대한 작게 만들려 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "final X−Y under optimal play", "최적 플레이에서의 최종 X−Y")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E, "The input format and two examples.", "입력 형식과 예제 두 개를 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          {/* INPUT */}
          <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>n</b> — {t(E, "number of pairs (first line)", "쌍의 개수 (첫 줄)")}</div>
              <div>• {t(E, "then ", "그다음 ")}<b>n</b>{t(E, " lines, each ", " 줄, 각 줄에 ")}<b>a b</b>{t(E, " — one pair", " — 쌍 하나")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 2 ≤ n ≤ 10^4, −10^9 ≤ a, b ≤ 10^9.", "제약: 2 ≤ n ≤ 10^4, −10^9 ≤ a, b ≤ 10^9.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, flex: 1, minWidth: 130 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>2</div>
              <div>4 2</div>
              <div>1 3</div>
            </div>
            <div style={{ background: "#0f172a", color: "#86efac", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>1</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.6, ...KA }}>
            {t(E,
              "Evirir takes (4,2) → X=4. Rhae is left with (1,3) → Y=3. X−Y = 1.",
              "Evirir 가 (4,2) 를 가져가 X=4. Rhae 에겐 (1,3) 만 남아 Y=3. X−Y = 1.")}
          </div>

          {/* 예제 둘째 — 쌍이 셋이면 '고를 수 있다'.
              2026-09-08 학생·화면 담당이 따로따로 같은 말을 했다: 예제가 n=2 하나뿐이라
              고를 여지가 없고, 그래서 순서가 왜 중요한지 이 쪽에서 전혀 안 보인다.
              ⚠️ 답이 왜 2 인지는 여기서 말하지 않는다 — 다음 쪽에서 직접 찾는 자리다.
              (최적값 2 는 미니맥스 완전탐색으로 확인했다) */}
          <div style={{ marginTop: 14, borderTop: "1px dashed #fde68a", paddingTop: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#92400e", marginBottom: 8, ...KA }}>
              {t(E, "One more — this time three pairs", "하나 더 — 이번엔 쌍이 셋")}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, flex: 1, minWidth: 130 }}>
                <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "input", "입력")}</div>
                <div>3</div><div>2 5</div><div>4 1</div><div>1 1</div>
              </div>
              <div style={{ background: "#0f172a", color: "#86efac", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, minWidth: 90 }}>
                <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontWeight: 800 }}>2</div>
              </div>
            </div>
            {/* 설명 — 원문(mcc24simplegame.pdf)의 Sample Explanation 도 이렇게 한다:
                가능한 경우를 다 적고 결과를 견준다. 선생님(2026-09-08):
                "이거 설명이 나와있는게 좋지 않나? 문제에서도 설명이 나오던데"
                ⚠️ 결과는 적되 **규칙은 아직 말하지 않는다** — 다음 쪽이 그걸 찾는 자리다.
                세 값(2 / 0 / 0)은 미니맥스 완전탐색으로 확인했다. */}
            <div style={{ marginTop: 12, fontSize: 12, color: C.text, lineHeight: 1.7, textWrap: "balance", ...KA }}>
              {t(E,
                "Evirir has three pairs to choose from. Each first pick leads somewhere different — with both playing their best:",
                "Evirir 가 고를 수 있는 쌍이 셋이에요.\n무엇을 먼저 가져가느냐에 따라 결과가 달라져요.\n둘 다 최선을 다했을 때 이렇게 돼요.")}
            </div>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { pick: "(2, 5)", val: 2, best: true, line: "+2 −1 +1" },
                { pick: "(4, 1)", val: 0, best: false, line: "+4 −5 +1" },
                { pick: "(1, 1)", val: 0, best: false, line: "+1 −5 +4" },
              ].map((r) => (
                <div key={r.pick} style={{
                  display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
                  border: `1.5px solid ${r.best ? "#6ee7b7" : "#e2e8f0"}`,
                  background: r.best ? "#ecfdf5" : "#f8fafc",
                  borderRadius: 9, padding: "7px 11px", fontSize: 12, ...KA,
                }}>
                  <span style={{ color: C.dim }}>
                    {t(E, `takes ${r.pick} first`, `${r.pick} 먼저`)}
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{r.line}</span>
                  <span style={{ color: C.dim }}>⇒</span>
                  <b style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5,
                    color: r.best ? "#065f46" : C.dim }}>{r.val}</b>
                  {r.best && <span style={{ fontSize: 11, fontWeight: 800, color: "#065f46" }}>
                    {t(E, "best", "제일 큼")}
                  </span>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: C.text, lineHeight: 1.7, textWrap: "balance", ...KA }}>
              {t(E,
                "So the answer is 2. But why that pair first? Find out on the next page.",
                "그래서 답이 2 예요.\n그런데 왜 하필 (2, 5) 였을까요? 다음 쪽에서 직접 찾아봐요.")}
            </div>
          </div>
        </div>),
    },

    // 1-3: 쌍 2개로 순서를 바꿔보며 규칙을 스스로 찾는 자리
    {
      type: "reveal",
      narr: t(E,
        "Two pairs only. Which one should Evirir take first?",
        "쌍이 둘뿐일 때, 어느 걸 먼저 가져가야 할까요?"),
      content: <SwapSim E={E} />,
    },

    // 1-4: 한 번의 선택 규칙 → 전체 순서(정렬) 로 잇는 다리
    {
      type: "reveal",
      narr: t(E,
        "Same rule, four pairs. Which one goes in front?",
        "같은 규칙으로 넷을 놓아봐요. 누가 앞에 설까요?"),
      content: <LineUpSim E={E} />,
    },

    // 1-5: 줄이 선 뒤에 차례대로 가져가 보기
    {
      type: "reveal",
      /* 전에는 narr 가 "쌍을 a+b 로 정렬한 뒤" 라고 **결론부터** 말했다.
         그러면 시뮬은 스스로 찾는 자리가 아니라 답을 받고 확인만 하는 자리가 된다.
         2026-09-08 수업·화면 담당이 같이 짚었다. 질문형으로 바꿨다. */
      narr: t(E,
        "The row is ready. Now take them from the front.",
        "줄이 다 섰어요. 이제 앞에서부터 가져가 봐요."),
      content: <PairPickSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      /* 전에는 이 narr 이 정답("a+b 가 가장 큰 쌍")을 그대로 말해놓고 바로 아래에서 물었다. */
      narr: t(E, "Now pick it yourself.", "이제 직접 골라봐요."),
      question: t(E,
        "Pairs: (3, 1), (2, 6), (5, 2). Which pair does Evirir take on the first turn?",
        "쌍: (3, 1), (2, 6), (5, 2). Evirir 가 첫 차례에 가져가는 쌍은?"),
      options: [
        t(E, "(2, 6) — largest a+b = 8", "(2, 6) — a+b = 8 로 가장 큼"),
        t(E, "(5, 2) — largest a = 5", "(5, 2) — a = 5 로 가장 큼"),
        t(E, "(3, 1) — smallest b = 1", "(3, 1) — b = 1 로 가장 작음"),
      ],
      correct: 0,
      explain: t(E,
        "Sort by a+b: (2,6)=8, (5,2)=7, (3,1)=4. Evirir takes (2,6) first (+2 to X), then Rhae takes (5,2) (−2), then Evirir takes (3,1) (+3). X−Y = 2−2+3 = 3.",
        "a+b 로 정렬: (2,6)=8, (5,2)=7, (3,1)=4. Evirir 가 (2,6) 을 먼저(X 에 +2), Rhae 가 (5,2)(−2), Evirir 가 (3,1)(+3). X−Y = 2−2+3 = 3."),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeSimpleGameCh2(E, lang = "py") {
  return [
    // 2-1: slow vs fast plan
    {
      type: "reveal",
      narr: t(E,
        "How many tries is \u201ctry everything\u201d? Watch it grow.",
        "다 해보면 몇 번일까요? 늘어나는 속도를 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 6 }}>
                🐢 {t(E, "Slow: try every order", "느림: 모든 순서를 다 해보기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, marginBottom: 8, textWrap: "balance", ...KA }}>
                {t(E,
                  "First pick: n choices. Next: n−1. Then n−2 … so the number of orders is n × (n−1) × … × 1.",
                  "첫 차례에 고를 수 있는 게 n 가지, 다음엔 n−1 가지,\n그다음은 n−2 가지 … 그래서 순서는 n × (n−1) × … × 1 가지예요.")}
              </div>
              {/* 학생(2026-09-08): "2^n 이 왜 2의 n제곱인지는 설명이 없었다."
                  세는 방법을 그대로 적으면 곱셈이 눈에 보인다. 숫자는 계산해서 넣었다. */}
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9, color: C.text }}>
                <div>n = 5 &nbsp;→ &nbsp;120{t(E, " orders", " 가지")}</div>
                <div>n = 10 → &nbsp;3,628,800{t(E, " orders", " 가지")}</div>
                <div>n = 15 → &nbsp;1{t(E, " trillion+", " 조가 넘어요")}</div>
                <div style={{ color: "#b91c1c", fontWeight: 800 }}>
                  n = 20 → &nbsp;2,432,902,008,176,640,000
                </div>
              </div>
              <div style={{ fontSize: 11.5, color: "#b91c1c", marginTop: 8, lineHeight: 1.65, textWrap: "balance", ...KA }}>
                {t(E,
                  "Even at 100 million tries per second, n = 20 alone takes about 770 years. And n goes up to 10,000.",
                  "1초에 1억 번씩 세도 n = 20 하나에 약 770년이 걸려요.\n그런데 n 은 10,000 까지 와요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: line them up once, then walk it once", "빠름: 한 번 줄 세우고, 한 번 훑기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, textWrap: "balance", ...KA }}>
                {t(E,
                  "We already found the rule: the bigger a+b goes first. Line the pairs up that way once, then just walk down it — +a, −b, +a, −b.",
                  "규칙은 앞에서 찾았어요 — a+b 가 큰 쌍이 먼저.\n그렇게 한 번만 줄을 세우고, 위에서부터 훑으며\n+a, −b, +a, −b 를 더하면 끝이에요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: 코드 — CodeWalk (설명 말풍선이 코드 줄에 붙는다)
    /* 전에는 섹션 하나짜리 ProgressiveCode 라서, 코드 **위에** 산문 570자가 얹혀 있었다.
       memory/feedback_quest_code_codewalk.md 가 바로 이 모양을 이름 대고 금지한다.
       (선생님 2026-07-14: "코드 위 설명은 안 읽힘. 앞으로 코드는 모두 이런식으로.") */
    {
      type: "reveal",
      narr: t(E,
        "Each bubble sits on the line it explains.",
        "말풍선이 설명하는 코드 줄에 붙어 있어요."),
      content: (() => {
        const w = getSimpleGameWalk(E, lang);
        return <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent={A} />;
      })(),
    },
  ];
}
