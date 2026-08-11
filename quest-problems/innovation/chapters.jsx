import { C, t } from "@/components/quest/theme";
import { getInnovationWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { InnovationSim } from "./sims";

const A = "#2563eb";

/* 샘플 입출력 — 시즌 표준 (구체 숫자 INPUT/OUTPUT + 한 줄씩). */
function InnovationSample({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`5 3
3 5 6 6
4 9 1 2
1 2 3 4
2 2 9 8
8 10 2 3`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`52`}
          </div>
        </div>
      </div>

      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#1e3a8a", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>5 3</code> — {t(E, "n = 5 cards, m = 3 to choose", "n = 5 (카드 5장), m = 3 (고를 장수)")}</div>
        <div style={{ marginTop: 4 }}>
          {t(E, "Each next line: ", "그다음 각 줄: ")}
          <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>a b c d</code>
          {t(E, " — one card's four numbers (a top, b·c·d bottom).", " — 카드 하나의 네 숫자 (a 위, b·c·d 아래).")}
        </div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #93c5fd" }}>
          {t(E, "Output ", "출력 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>52</code>{t(E, " = the biggest possible visible sum.", " = 만들 수 있는 최대 보이는 합.")}
        </div>
      </div>

      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #93c5fd", borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.6, wordBreak: "keep-all" }}>
        {t(E, <>Best pick here: cards <b>②⑤④</b> → a+b of all three = 13+18+4 = <b>35</b>, plus the biggest c+d (card ④) = <b>17</b> → <b style={{ color: "#15803d" }}>52</b>.</>,
             <>여기 최선의 선택: <b>②⑤④</b> 카드 → 세 장의 a+b = 13+18+4 = <b>35</b>, 거기에 가장 큰 c+d (④ 카드) = <b>17</b> → <b style={{ color: "#15803d" }}>52</b>.</>)}
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all" }}>
        {t(E, "📌 1 ≤ m ≤ n ≤ 20000 · each value ≤ 10⁹ → the sum can be large, use 64-bit.",
             "📌 1 ≤ m ≤ n ≤ 20000 · 각 값 ≤ 10⁹ → 합이 커질 수 있어 64비트 필요.")}
      </div>
    </div>
  );
}

/* 정리 — 발견한 걸 한 판단으로. */
function InnovationRecap({ E }) {
  const Row = ({ q, res, col, bg }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: bg, border: `1.5px solid ${col}`,
      borderRadius: 10, padding: "11px 14px" }}>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#334155", wordBreak: "keep-all" }}>{q}</div>
      <div style={{ fontSize: 16, color: col }}>→</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: col, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{res}</div>
    </div>
  );
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#1e3a8a", textAlign: "center", marginBottom: 6 }}>
        🧭 {t(E, "The whole idea, at a glance", "핵심 한눈에")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 14, wordBreak: "keep-all" }}>
        {t(E, "Don't be fooled by the picture — c·d only counts for ONE card.", "그림에 속지 말 것 — c·d 는 딱 한 장만 세요.")}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", display: "grid", gap: 10 }}>
        <Row q={t(E, "Every chosen card contributes a+b", "고른 카드마다 a+b 는 다 더해요")} res="Σ(a+b)" col="#2563eb" bg="#eff6ff" />
        <Row q={t(E, "Only the last (rightmost) card also shows c+d", "마지막(맨 오른쪽) 카드만 c+d 도 보여요")} res="+ max(c+d)" col="#d97706" bg="#fffbeb" />
        <Row q={t(E, "So: fix 'the special one' by sorting on c+d", "그래서: c+d 로 정렬해 '특별한 한 장' 고정")} res={t(E, "sort ↑", "정렬 ↑")} col="#059669" bg="#ecfdf5" />
        <Row q={t(E, "Keep the top m−1 of a+b in a min-heap", "나머지는 a+b 상위 m−1개를 min-heap 으로")} res={t(E, "top m−1", "상위 m−1")} col="#7c3aed" bg="#f5f3ff" />
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's read the code that does exactly this →", "이제 이걸 그대로 하는 코드를 봐요 →")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeInnovationCh1 — 시즌 표준 (라벨 + 구체 샘플 + 시뮬)
   문제(도입) → 샘플 입출력 → 무엇이 보이나 → 정리
   ═══════════════════════════════════════════════════════════════ */
export function makeInnovationCh1(E) {
  return [
    // [기] 문제 (도입)
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "You have n cards, each with four numbers a, b, c, d. Choose m of them and lay them left-to-right, overlapping. Every card then shows only a and b — except the last card, which shows all four. Maximize the total visible sum.",
        "카드가 n장 있고, 각 카드엔 네 숫자 a, b, c, d 가 있어요. 그중 m장을 골라 왼쪽부터 겹쳐 놓아요. 그러면 각 카드는 a·b만 보이고, 맨 마지막 카드만 네 개 다 보여요. 보이는 수의 합을 최대로 만들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>💡</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Innovation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P3</div>
          </div>

          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Pick m cards and overlap them so the total of the visible numbers is as large as possible.",
                "m장을 골라 겹쳐 놓아 보이는 숫자들의 합을 가능한 크게 만들기.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "카드가 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "n cards", "n장")}</b>
                  {t(E, ". Each card has 4 non-negative numbers: ", " 있어요. 각 카드엔 0 이상 숫자 4개: ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4 }}>a</code>{t(E, " on top, ", " 는 위, ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4 }}>b</code>{" · "}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4 }}>c</code>{" · "}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4 }}>d</code>{t(E, " on the bottom (left·mid·right).", " 는 아래 (왼·가운데·오른쪽).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Choose ", "그중 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "m cards", "m장")}</b>
                  {t(E, " and lay them ", " 을 골라 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "left → right, overlapping", "왼쪽 → 오른쪽으로 겹쳐")}</b>
                  {t(E, ". Each card then covers the ones before it.", " 놓아요. 뒤 카드가 앞 카드를 덮어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Because of the overlap, every card shows only ", "겹치기 때문에 각 카드는 ")}
                  <b style={{ color: "#2563eb" }}>a·b</b>
                  {t(E, " — EXCEPT the ", " 만 보여요 — 단, ")}
                  <b style={{ color: "#d97706" }}>{t(E, "rightmost (last) card", "맨 오른쪽(마지막) 카드")}</b>
                  {t(E, ", which shows all four a·b·c·d.", " 만 네 개 a·b·c·d 다 보여요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum possible sum of all visible numbers", "보이는 모든 숫자의 최대 합")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // [승] 샘플 입출력 (구체 숫자)
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E,
        "A concrete example — five cards, and the answer we must print.",
        "구체적인 예 하나 — 카드 다섯 장과, 우리가 출력해야 할 답."),
      content: (<InnovationSample E={E} />),
    },

    // [전] 무엇이 보이나 — 겹치면 c·d 는 가려짐 → 합 = Σ(a+b) + max(c+d)
    {
      type: "reveal",
      label: t(E, "What's visible", "무엇이 보이나"),
      narr: t(E,
        "Overlap the cards and look: front cards show only a·b, the last shows all four. So the total is Σ(a+b) plus just one c+d.",
        "카드를 겹쳐 놓고 봐요: 앞 카드는 a·b만, 마지막 카드만 네 개 다. 그래서 합은 Σ(a+b) 에 c+d 한 개만 더한 값이에요."),
      content: (<InnovationSim E={E} />),
    },

    // 정리
    {
      type: "reveal",
      label: t(E, "Recap", "정리"),
      narr: t(E, "Everything boils down to one small decision.",
                 "결국 작은 판단 하나로 정리돼요."),
      content: (<InnovationRecap E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeInnovationCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeInnovationCh2(E, lang = "py") {
  const w = getInnovationWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: store (c+d, a+b) and sort, keep the top m−1 of a+b, and try each card as the special last one.",
        "코드를 위에서 아래로 읽어봐요 — 말풍선이 설명하는 줄에 붙어 있어요: (c+d, a+b) 로 저장·정렬 → a+b 상위 m−1개 유지 → 각 카드를 특별한 마지막 장으로 시도."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#2563eb" />
      ),
    },
  ];
}
