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

  const sorted = () => setOrder([...SIZES].sort((a, b) => a - b));      // ascending
  const reversed = () => setOrder([...SIZES].sort((a, b) => b - a));    // descending

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
          🍽️ {t(E, "Order the layers, count the lines", "층 순서를 정하고, 줄 수를 세요")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "Three layers of sizes 2, 3, 4. Each new layer copies the whole menu so far, once per option — so a layer of size s multiplies every current line by s. Total lines = the running total of these products. Try both orders.",
            "크기가 2, 3, 4 인 층 세 개예요. 새 층은 지금까지의 메뉴 전체를 옵션 수만큼 복사해요 — 그래서 크기 s 인 층은 지금 줄 수를 s 배로 늘려요. 총 줄 수 = 이 곱들의 누적 합이에요. 두 순서를 다 눌러봐요.")}
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
              <span style={{ background: "#ede9fe", borderRadius: 6, padding: "2px 8px" }}>
                {t(E, "add layer ", "층 추가 ")}<b>{r.size}</b>
              </span>
              <span style={{ color: "#7c3aed" }}>→ {t(E, "new lines = ", "새 줄 = ")}<b>{r.prod}</b></span>
              <span style={{ color: C.dim }}>| {t(E, "running total = ", "누적 = ")}<b style={{ color: "#5b21b6" }}>{r.running}</b></span>
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
          {t(E,
            "Notice: small → big gives 2 + 6 + 24 = 32; big → small gives 4 + 12 + 24 = 40. Putting the smallest layer first keeps the running product small for as long as possible, so every later term is smaller too.",
            "봐요: 작은 → 큰 은 2 + 6 + 24 = 32; 큰 → 작은 은 4 + 12 + 24 = 40. 가장 작은 층을 먼저 두면 곱이 오래 작게 유지돼서, 뒤 항들도 전부 더 작아져요.")}
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
export const SOLUTION_CODE = [
  "MOD = 10**9 + 7",
  "",
  "N = int(input())",
  "layers = list(map(int, input().split()))",
  "",
  "# smallest layer first keeps the running product small (exchange argument)",
  "order = sorted(layers)",
  "",
  "# total lines = sum of prefix products",
  "total = 0",
  "prod = 1",
  "for x in order:",
  "    prod = (prod * x) % MOD",
  "    total = (total + prod) % MOD",
  "",
  "print(total)",
];

export function makeMcc21MenuCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Fluffy is building a nested menu out of layers. A layer of size s takes every line of the menu so far and copies it s times.\nGiven the layer sizes, arrange them so the finished menu has as FEW lines as possible.",
        "Fluffy 가 층(layer)으로 중첩 메뉴를 만들어요. 크기 s 인 층은 지금까지의 메뉴 모든 줄을 s 번 복사해요.\n층 크기들이 주어지면, 완성된 메뉴의 줄 수가 가장 적도록 순서를 정해요."),
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
                "층 순서를 정해 메뉴의 총 줄 수를 최소로 만들고, 그 최솟값을 출력해요 (mod 1e9+7).")}
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
                  {t(E, " times (each option gets a full sub-list).", " 번 복사해요 (옵션마다 하위 목록 하나).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The ", "층 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "order of the layers is yours to choose", "순서는 우리가 정할 수 있어요")}</b>
                  {t(E, " — and it changes the total number of lines.", " — 그리고 그게 총 줄 수를 바꿔요.")}
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
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: "#92400e", lineHeight: 1.55, ...KA }}>
            {t(E,
              "ℹ️ The original problem has two output modes: some cases want the best ARRANGEMENT printed, others want the minimum line COUNT (mod 1e9+7). We'll teach the count — and the arrangement falls right out of it.",
              "ℹ️ 원문제는 출력이 두 가지예요: 어떤 케이스는 최적 배열을, 어떤 케이스는 최소 줄 수(mod 1e9+7)를 요구해요. 우리는 줄 수를 배워요 — 배열은 거기서 바로 따라 나와요.")}
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. The sample has two layers of sizes 3 and 2 — the best order is 2 then 3.",
        "입력 형식과 공식 예제를 봐요. 예제는 크기 3, 2 인 층 두 개예요 — 최선 순서는 2 다음 3."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>N</b> — {t(E, "how many layers", "층 개수")}</div>
              <div>• <b>layers</b> — {t(E, "N sizes, one per layer", "N 개의 크기, 층마다 하나")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ N ≤ 30, 1 ≤ layer[i] ≤ 10^4.", "제약: 1 ≤ N ≤ 30, 1 ≤ layer[i] ≤ 10^4.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 130 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>2</div>
              <div>3 2</div>
            </div>
            <div style={{ background: "#0f172a", color: "#c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>8</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "Best order 2 → 3: the size-2 layer makes 2 lines, then the size-3 layer copies those into 2×3 = 6 lines. Total = 2 + 6 = 8. (Order 3 → 2 would give 3 + 6 = 9 — worse.)",
              "최선 순서 2 → 3: 크기 2 층이 2 줄을 만들고, 크기 3 층이 그걸 2×3 = 6 줄로 복사해요. 총 = 2 + 6 = 8. (순서 3 → 2 는 3 + 6 = 9 — 더 나빠요.)")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel it. Flip the order and watch the running total — smallest layer first wins.",
        "직접 느껴봐요. 순서를 바꿔가며 누적 합을 봐요 — 가장 작은 층을 먼저 두는 쪽이 이겨요."),
      content: <MenuOrderSim E={E} />,
    },

    // 1-4: understanding quiz
    {
      type: "quiz",
      narr: t(E,
        "Two layers of sizes 5 and 2. Order 2 → 5 gives 2 + (2×5) = 12. Order 5 → 2 gives 5 + (5×2) = 15. Smaller first wins.",
        "크기 5, 2 인 층 두 개. 순서 2 → 5 는 2 + (2×5) = 12. 순서 5 → 2 는 5 + (5×2) = 15. 작은 게 먼저면 이겨요."),
      question: t(E,
        "Layers of sizes 5 and 2. What is the MINIMUM number of lines?",
        "크기 5, 2 인 층 두 개. 최소 줄 수는?"),
      options: [
        t(E, "12  (order 2 → 5)", "12  (순서 2 → 5)"),
        t(E, "15  (order 5 → 2)", "15  (순서 5 → 2)"),
        t(E, "10  (5 × 2)", "10  (5 × 2)"),
      ],
      correct: 0,
      explain: t(E,
        "2 → 5: first layer 2 lines, then ×5 = 10, total 2 + 10 = 12. Putting the smaller layer first is always at least as good.",
        "2 → 5: 첫 층 2 줄, 그다음 ×5 = 10, 총 2 + 10 = 12. 더 작은 층을 먼저 두는 게 항상 최소한 같거나 더 좋아요."),
    },

    // 1-5: input warmup
    {
      type: "input",
      narr: t(E,
        "One more, three layers this time. Sort them small → big, then add up the prefix products.",
        "하나 더, 이번엔 층 세 개. 작은 → 큰 으로 정렬하고 앞부분 곱들을 더해요."),
      question: t(E,
        "Layers of sizes 3, 1, 2. Minimum number of lines? (order 1 → 2 → 3: 1 + 2 + 6)",
        "크기 3, 1, 2 인 층 세 개. 최소 줄 수? (순서 1 → 2 → 3: 1 + 2 + 6)"),
      hint: t(E, "Sort to 1, 2, 3. Prefix products: 1, 1×2=2, 1×2×3=6. Add them.", "1, 2, 3 으로 정렬. 앞부분 곱: 1, 1×2=2, 1×2×3=6. 다 더해요."),
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
        "느린 방법은 N 개 층의 모든 순서를 다 시도해요 — N! 가지, 30! 은 천문학적으로 커요. 빠른 방법은 규칙 하나를 증명해요: 크기를 오름차순 정렬하면, 답은 그냥 앞부분 곱들의 합이에요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every order of the layers", "느림: 층의 모든 순서를 다 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "N! orderings. For N = 30 that's 30! ≈ 10^32 — impossible to check.", "N! 가지 순서. N = 30 이면 30! ≈ 10^32 — 절대 다 못 봐요.")}
              </div>
            </div>
            <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>
                🚀 {t(E, "Fast: sort ascending, sum the prefix products", "빠름: 오름차순 정렬 후 앞부분 곱 합하기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Sort N sizes, then one pass adding prefix products. Total work ≈ N log N.", "N 개 크기를 정렬하고, 앞부분 곱을 더하며 한 번 훑기. 총 연산 ≈ N log N.")}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12, background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 10, padding: "10px 14px", ...KA }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#4338ca", marginBottom: 4 }}>
              {t(E, "Why ascending? (exchange argument)", "왜 오름차순? (교환 논증)")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "Look at two neighbours a and b. Whatever the product P of the layers before them, the two lines they add are P·a + P·a·b if a comes first, versus P·b + P·b·a if b comes first. The P·a·b term is the same either way, so we compare P·a vs P·b — the smaller one should go first. So the smallest layer belongs at the front, always.",
                "이웃한 두 층 a, b 만 봐요. 그 앞 층들의 곱이 P 라면, a 를 먼저 두면 두 줄이 P·a + P·a·b, b 를 먼저 두면 P·b + P·b·a 예요. P·a·b 항은 어느 쪽이든 똑같으니 P·a 와 P·b 만 비교하면 돼요 — 더 작은 걸 먼저. 그래서 가장 작은 층이 항상 맨 앞이에요.")}
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
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
