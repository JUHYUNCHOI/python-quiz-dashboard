import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc21MenuSections } from "./components";

const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };
const A = "#8b5cf6";

/* ─────────────────────────────────────────────────────────────
   Concept sim: pick an ORDER of layer sizes and watch the menu
   grow. Total lines = sum of prefix products. The student toggles
   between two orders and sees which one is smaller — smallest
   layer first keeps the running product small the longest.
   ───────────────────────────────────────────────────────────── */
const SIZES = [2, 3, 4];

function MenuOrderSim({ E }) {
  // order is an array of the three sizes; start with a "bad" order
  const [order, setOrder] = useState([4, 3, 2]);
  /* 2026-09-17: 맨 아래 정리글이 **버튼을 누르기 전부터** 두 순서의 합(32·40)과
     결론("가장 작은 층을 맨 앞에")을 다 말하고 있었다. 이 쪽이 발견하는 자리인데
     읽기만 해도 끝나 버린다. mcc20cipher·mcc21carrots 와 같은 touched 방식으로
     한 번이라도 눌러본 뒤에 드러나게 한다. */
  const [touched, setTouched] = useState(false);

  const sorted = () => { setTouched(true); setOrder([...SIZES].sort((a, b) => a - b)); };    // ascending
  const reversed = () => { setTouched(true); setOrder([...SIZES].sort((a, b) => b - a)); };  // descending

  // prefix products + running total
  const rows = [];
  let prod = 1;
  let total = 0;
  for (let i = 0; i < order.length; i++) {
    prod = prod * order[i];
    total = total + prod;
    rows.push({ size: order[i], prod, running: total });
  }

  const isAsc = order[0] <= order[1] && order[1] <= order[2];

  const chip = (n, on) => (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 30, height: 30, borderRadius: 8, fontFamily: "'JetBrains Mono',monospace",
      fontSize: 15, fontWeight: 800,
      border: on ? "2px solid #7c3aed" : "1.5px solid #c4b5fd",
      background: on ? "#7c3aed" : "#fff", color: on ? "#fff" : "#5b21b6",
    }}>{n}</span>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
          🍽️ {t(E, "Order the layers, count the lines", "층 순서를 정하고 줄 수를 세어 봐요")}
        </div>
        {/* 2026-09-17: 소스에는 \n 이 있는데 pre-line 이 없어서 화면에서는 125 자가 한 덩어리로
            붙어 나왔다. 절 단위로 끊어 보이게 한다. */}
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12,
          whiteSpace: "pre-line", textWrap: "balance" }}>
          {t(E,
            "Three layers of sizes 2, 3, 4.\nEach new layer copies the whole menu so far, once per option,\nso a layer of size s multiplies every current line by s.\nTotal lines = the running total of these products. Try both orders.",
            "크기가 2, 3, 4 인 층 세 개예요.\n새 층은 지금까지의 메뉴 전체를 옵션 수만큼 복사해요.\n그래서 크기 s 인 층은 지금 줄 수를 s 배로 늘려요.\n총 줄 수는 이 곱들을 쌓아 가며 더한 값이에요. 두 순서를 다 눌러봐요.")}
        </div>

        {/* order controls */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          <button onClick={sorted} style={{ ...orderBtn, ...(isAsc ? orderBtnOn : {}) }}>
            {t(E, "small → big  (2, 3, 4)", "작은 → 큰  (2, 3, 4)")}
          </button>
          <button onClick={reversed} style={{ ...orderBtn, ...(!isAsc ? orderBtnOn : {}) }}>
            {t(E, "big → small  (4, 3, 2)", "큰 → 작은  (4, 3, 2)")}
          </button>
        </div>

        {/* chosen order */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: "#5b21b6", fontWeight: 600 }}>{t(E, "order:", "순서:")}</span>
          {order.map((n, i) => (
            <span key={i} style={{ ...NW, display: "inline-flex", alignItems: "center", gap: 6 }}>
              {chip(n, i === 0)}
              {i < order.length - 1 && <span style={{ color: "#7c3aed", fontWeight: 700 }}>→</span>}
            </span>
          ))}
        </div>

        {/* running table */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ ...NW, display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: "#5b21b6", flexWrap: "wrap" }}>
              {/* 2026-09-17: "층 추가 4" · "새 줄 = 4" 는 그 4 가 무엇인지 안 말한다 (⑤).
                  크기인지 줄 수인지를 숫자 옆에 붙인다. */}
              <span style={{ background: "#ede9fe", borderRadius: 6, padding: "2px 8px" }}>
                {t(E, "add a size-", "크기 ")}<b>{r.size}</b>{t(E, " layer", " 인 층을 더해요")}
              </span>
              <span style={{ color: "#7c3aed" }}>→ {t(E, "lines it adds = ", "새로 생기는 줄 = ")}<b>{r.prod}</b>{t(E, "", " 줄")}</span>
              <span style={{ color: C.dim }}>| {t(E, "running total = ", "여기까지 모두 = ")}<b style={{ color: "#5b21b6" }}>{r.running}</b>{t(E, "", " 줄")}</span>
            </div>
          ))}
        </div>

        {/* total */}
        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, ...KA }}>
          {t(E, "total lines = ", "총 줄 수 = ")}
          <b style={{ color: "#c4b5fd" }}>{rows.map(r => r.prod).join(" + ")}</b>
          {" = "}
          <b style={{ color: isAsc ? "#34d399" : "#f87171" }}>{total}</b>
          {"  "}{isAsc ? "✅" : "⚠️"}
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {touched
            ? t(E,
                "Every term in that sum IS the running product, so keeping the product small for as long as possible makes every later term smaller too.",
                "더하는 값 하나하나가 바로 그때까지의 곱이에요.\n그러니 곱을 오래 작게 두면 뒤에 더하는 값도 전부 작아져요.")
            : t(E,
                "Press both buttons and compare the two totals. Which order ends up smaller, and why?",
                "두 버튼을 다 눌러 총 줄 수를 견줘 봐요.\n어느 순서가 더 적게 나오나요? 왜 그럴까요?")}
        </div>
      </div>
    </div>
  );
}
const orderBtn = {
  fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
  border: "1.5px solid #c4b5fd", borderRadius: 8, padding: "6px 12px",
  background: "#fff", color: "#5b21b6",
};
const orderBtnOn = { border: "2px solid #7c3aed", background: "#ede9fe" };

/* ================================================================
   SOLUTION CODE (kept exported for parity; the taught answer is the
   minimum number of lines, mod 1e9+7, from the ascending order).
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */

export function makeMcc21MenuCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Fluffy is building a nested menu out of layers. A layer of size s takes every line of the menu so far and copies it s times.\nGiven the layer sizes, arrange them so the finished menu has as FEW lines as possible.",
        "층을 어떤 순서로 쌓아야 메뉴 줄 수가 가장 적을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📋"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: A }}>Smallest Menu Ever</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P6</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Order the layers to minimise the menu's total lines, and print that minimum (mod 1e9+7).",
                "층 순서를 정해 메뉴의 총 줄 수를 가장 적게 만들어요.\n그 최솟값을 출력해요 (mod 1e9+7).")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The menu is built from ", "메뉴는 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N layers", "N 개의 층")}</b>
                  {t(E, ". A layer of size ", " 으로 만들어요. 크기 ")}
                  <b style={{ color: "#7c3aed" }}>s</b>
                  {t(E, " copies every existing line ", " 인 층은 지금 모든 줄을 ")}
                  <b style={{ color: "#7c3aed" }}>s</b>
                  {t(E, " times (each option gets a full sub-list).", " 번 복사해요 (옵션마다 하위 메뉴 하나씩).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The ", "층 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "order of the layers is yours to choose", "순서는 우리가 정할 수 있어요")}</b>
                  {t(E, " — and it changes the total number of lines.", ". 그리고 그 순서가 총 줄 수를 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum possible number of lines", "가능한 최소 줄 수")}</b>
                  {t(E, " (mod 1e9+7).", " (mod 1e9+7) 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          {/* aside: dual-output subtlety */}
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: "#92400e", lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
            {/* 2026-09-17: 여기서 "정렬한 차례가 곧 제일 좋은 순서" 라고 답을 먼저 말하고 있었다.
                그 뒤 3 쪽(시뮬 비교 → 퀴즈 → 교환 논증)이 찾아낼 것을 첫 쪽이 통보한 셈이다.
                출력이 두 가지라는 사실만 남기고 결론은 뺐다. */}
            {t(E,
              "ℹ️ The original problem has two output modes.\nSome cases want the best ARRANGEMENT printed,\nothers want the minimum line COUNT (mod 1e9+7). We'll teach the count.",
              "ℹ️ 원래 문제는 출력이 두 가지예요.\n어떤 때는 제일 좋은 순서를 물어보고,\n어떤 때는 최소 줄 수(mod 1e9+7)를 물어봐요.\n우리는 줄 수를 배울 거예요.")}
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. The sample has two layers of sizes 3 and 2 — the best order is 2 then 3.",
        "입력 형식과 공식 예제를 봐요. 크기 3, 2 인 층 두 개예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>N</b> — {t(E, "how many layers", "층 개수")}</div>
              <div>• <b>layers</b> — {t(E, "N sizes, one per layer", "층마다 크기 하나씩, 모두 N 개")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ N ≤ 30, 1 ≤ layer[i] ≤ 10^4.", "제약: 1 ≤ N ≤ 30, 1 ≤ layer[i] ≤ 10^4.")}
            </div>
            {/* 2026-09-17: 원문(public/problems/mcc21menu.pdf)은 N = 2 / layers = [3, 2] 처럼
                값을 변수로 준다. 아래 예제 상자의 두 줄은 우리 연습 방식이라고 밝힌다. */}
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
              {t(E,
                "The original problem hands the data over as values: N = 2 and layers = [3, 2].\nOur code writes those same values down and starts from there.\nReading them line by line with input() shows up in the 2022 problems.",
                "원문은 N = 2, layers = [3, 2] 처럼 값을 변수로 줘요.\n코드도 원문 그대로 값을 적어 두고 시작해요.\ninput() 으로 줄을 읽어 오는 법은 2022년 문제에서 만나요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 130 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>N = 2</div>
              <div>layers = [3, 2]</div>
            </div>
            <div style={{ background: "#0f172a", color: "#c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>8</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55,
            whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
            {t(E,
              "Best order 2 → 3: the size-2 layer makes 2 lines,\nthen the size-3 layer copies those into 2×3 = 6 lines.\nTotal = 2 + 6 = 8. (Order 3 → 2 would give 3 + 6 = 9 — worse.)",
              "가장 좋은 순서는 2 → 3 이에요.\n크기 2 층이 2 줄을 만들고, 크기 3 층이 그 2 줄을 2×3 = 6 줄로 늘려요.\n그래서 모두 2 + 6 = 8 줄이에요.\n순서를 3 → 2 로 하면 3 + 6 = 9 줄이라서 더 나빠요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      /* 2026-09-17: 이 narr 이 시뮬을 만지기 전에 결론을 말하고 있었다. */
      narr: t(E,
        "Flip the order and watch the running total.",
        "두 버튼을 눌러 순서를 바꿔 봐요."),
      content: <MenuOrderSim E={E} />,
    },

    // 1-4: understanding quiz
    {
      type: "quiz",
      /* 2026-09-17: 영어 narr 이 두 순서를 다 계산해서 답(12)을 미리 말하고 있었다.
         한국어는 이미 상황만 말한다 — 영어를 한국어 쪽에 맞췄다. */
      narr: t(E,
        "Two layers of sizes 5 and 2. Which order gives fewer lines?",
        "크기 5, 2 인 층 두 개예요. 어느 순서가 더 적을까요?"),
      question: t(E,
        "Layers of sizes 5 and 2. What is the MINIMUM number of lines?",
        "크기 5, 2 인 층 두 개예요. 최소 줄 수는 얼마일까요?"),
      options: [
        t(E, "12  (order 2 → 5)", "12  (순서 2 → 5)"),
        t(E, "15  (order 5 → 2)", "15  (순서 5 → 2)"),
        t(E, "10  (5 × 2)", "10  (5 × 2)"),
      ],
      correct: 0,
      explain: t(E,
        "2 → 5: first layer 2 lines, then ×5 = 10, total 2 + 10 = 12. Putting the smaller layer first is always at least as good.",
        "2 → 5 순서면 첫 층이 2 줄이고, 거기에 ×5 를 해서 10 줄이 돼요.\n그래서 모두 2 + 10 = 12 줄이에요.\n더 작은 층을 먼저 두면 항상 같거나 더 좋아요."),
    },

    // 1-5: input warmup
    {
      type: "input",
      /* 2026-09-17: 질문 문장이 "(순서 1 → 2 → 3: 1 + 2 + 6)" 로 계산을 다 해 놓고
         덧셈만 남겨 두었다. 계산은 힌트(눌러야 열림)에만 남긴다. */
      narr: t(E,
        "One more, three layers this time.",
        "하나 더 해봐요. 이번엔 층이 세 개예요."),
      question: t(E,
        "Layers of sizes 3, 1, 2. Minimum number of lines?",
        "크기 3, 1, 2 인 층 세 개예요. 최소 줄 수는 얼마일까요?"),
      hint: t(E, "Sort to 1, 2, 3. Prefix products: 1, 1×2=2, 1×2×3=6. Add them.", "1, 2, 3 으로 정렬해요.\n앞부분 곱은 1, 1×2=2, 1×2×3=6 이에요. 다 더해요."),
      answer: 9,
    },
  ];
}

export function makeMcc21MenuCh2(E, lang = "py") {
  return [
    // 2-1: plan — slow vs fast
    {
      type: "reveal",
      narr: t(E,
        "The slow way tries every order of the N layers — N! orders, and 30! is astronomically large. The fast way proves one rule: sort the sizes ascending, then the answer is just the sum of prefix products.",
        "느린 방법과 빠른 방법을 나란히 놓고 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every order of the layers", "느림: 층의 모든 순서를 다 해보기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "N! orderings. For N = 30 that's 30! ≈ 10^32 — impossible to check.", "순서가 N! 가지예요. N = 30 이면 30! ≈ 10^32 이라서 절대 다 못 봐요.")}
              </div>
            </div>
            <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
                🚀 {t(E, "Fast: sort ascending, sum the prefix products", "빠름: 오름차순으로 정렬한 뒤 앞부분 곱 더하기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Sort N sizes, then one pass adding prefix products. Total work ≈ N log N.", "N 개 크기를 정렬한 뒤 앞부분 곱을 더하며 한 번만 훑어요. 계산량은 N log N 쯤이에요.")}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12, background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 10, padding: "10px 14px", ...KA }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#4338ca", marginBottom: 4 }}>
              {t(E, "Why ascending? (exchange argument)", "왜 오름차순? (교환 논증)")}
            </div>
            {/* 2026-09-17: 화면에서 185 자가 한 줄로 이어져 있었다. 절 단위로 끊는다. */}
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6,
              whiteSpace: "pre-line", textWrap: "balance" }}>
              {t(E,
                "Look at two neighbours a and b, with P as the product of the layers before them.\nPut a first and the lines grow by P·a + P·a·b.\nPut b first and they grow by P·b + P·b·a.\nThe P·a·b part is the same either way, so only P·a and P·b differ.\nThe smaller one should go first — so the smallest layer belongs at the front, always.",
                "이웃한 두 층 a, b 만 봐요. 그 앞 층들의 곱을 P 라고 할게요.\na 를 먼저 두면 P·a + P·a·b 가 늘어나요.\nb 를 먼저 두면 P·b + P·b·a 가 늘어나요.\nP·a·b 는 어느 쪽이든 똑같으니 P·a 와 P·b 만 견주면 돼요.\n더 작은 쪽을 먼저 두는 게 이득이에요.\n그래서 가장 작은 층이 항상 맨 앞이에요.")}
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc21MenuSections(E),
    },
  ];
}
