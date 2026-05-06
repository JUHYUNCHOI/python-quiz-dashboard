import { C, t } from "@/components/quest/theme";
import { getHpsSections, HpsCaseSimulator } from "./components";

export function makeHpsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A Rock-Paper-Scissors variant — Bessie wants to count how many 2-card hands of hers always beat Elsie's hand.",
        "가위바위보 변형 — Bessie가 Elsie를 무조건 이기는 카드 2 장 조합이 몇 개인지 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 14, fontSize: 30, marginBottom: 4, lineHeight: 1 }}>
              <span style={{ color: "#2563eb" }}>●</span>
              <span style={{ color: "#7c3aed" }}>■</span>
              <span style={{ color: "#ea580c" }}>▲</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Hoof Paper Scissors Minus One</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2025 Bronze #1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "이 게임에는 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N kinds of cards", "N 종류의 카드")}</b>
                  {t(E, " — numbered 1..N. A ", " 가 있어요 — 1..N 번호. ")}
                  <b style={{ color: "#059669" }}>{t(E, "chart", "차트")}</b>
                  {t(E, " tells us, for each pair of card types, which one beats which.",
                        " 가 어떤 카드가 어떤 카드를 이기는지 알려줘요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "How a round works: ", "한 판 진행: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "each cow lays out 2 cards face-up", "각 소가 카드 2 장을 앞면이 보이게 내려놔요")}</b>
                  {t(E, ", so all 4 cards are visible. Then each cow picks ONE of her own two to actually play — Bessie picks last (after seeing Elsie's pick).",
                        ". 4 장이 모두 보여요. 그 다음 각자 자기 2 장 중 1 장을 골라 실제로 내요 — Bessie는 Elsie가 무엇을 냈는지 보고 마지막에 골라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Elsie's hand is given M times. For each, count Bessie's hands that ",
                        "Elsie hand 가 M 번 주어져요. 각각에 대해 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "GUARANTEE a win — for each of Elsie's two cards, Bessie has at least one card that beats it",
                                                          "무조건 이김 — Elsie의 두 카드 각각에 대해 Bessie가 이기는 카드를 적어도 하나 가지고 있는 hand")}</b>
                  {t(E, ". Output the count.", " 개수를 출력.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 6, fontSize: 11.5, color: C.dim, lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0 }}>📌</span>
                <div>
                  {t(E, "A 'hand' is an ORDERED pair (a, b) — slot 1 and slot 2 are different positions. So (Paper, Rock) and (Rock, Paper) count as 2 separate hands.",
                        "'hand' 는 순서쌍 (a, b) — 자리 1 과 자리 2 는 다른 자리. 그래서 (보, 바위) 와 (바위, 보) 는 따로 셈.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sample input / output format
    {
      type: "reveal",
      narr: t(E,
        "A small concrete sample: 3 card types and 1 Elsie hand. Read the input top-to-bottom and you'll see exactly what each line means.",
        "작은 예시: 3 종 카드, Elsie hand 1 개. 입력을 위에서 아래로 읽으면 각 줄이 무슨 뜻인지 보여요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#059669", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`3 1
001
100
010
1 3`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`2`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              🔍 {t(E, "What each line means", "각 줄 의미")}
            </div>
            <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>3 1</code> — {t(E, "N = 3 cards, M = 1 Elsie query", "N = 3 종 카드, M = 1 개 Elsie 쿼리")}</div>
            <div style={{ marginTop: 6 }}>
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>001 / 100 / 010</code> — {t(E, "next N lines = beats chart (one row per card). We'll decode this on the next page.",
                    "다음 N 줄 = 승패 차트 (카드 1 장당 1 줄). 다음 페이지에서 풀어봐요.")}
            </div>
            <div style={{ marginTop: 6 }}>
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 3</code> — {t(E, "M lines of Elsie's hands. Here: hand = cards {1, 3}.",
                    "M 줄 = Elsie hand. 여기서: hand = 카드 {1, 3}.")}
            </div>
            <div style={{ marginTop: 8, fontSize: 10.5, color: C.dim, fontStyle: "italic" }}>
              {t(E, "📌 Cards in input are numbered 1..N (1-INDEXED). Code internally converts to 0-indexed before looking up the chart array.",
                    "📌 입력의 카드 번호는 1..N (1-INDEXED). 코드에서 차트 배열 접근 위해 0-indexed 로 변환.")}
            </div>
          </div>
        </div>),
    },

    // 1-3: How to read the beats chart — single visual, glance-and-get-it
    {
      type: "reveal",
      narr: t(E,
        "0 and 1 — what do they mean? One picture: each '1' = an arrow saying 'I beat that card'.",
        "0 과 1 — 무슨 뜻? 한 그림으로: '1' = '내가 저 카드를 이김' 화살표."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Reading rule — bold, placed first */}
          <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#7c2d12", textAlign: "center", marginBottom: 14, lineHeight: 1.55 }}>
            <b style={{ color: "#92400e" }}>{t(E, "Reading rule: ", "읽는 법: ")}</b>
            {t(E, "row ", "줄 ")}<b style={{ color: "#dc2626" }}>i</b>
            {t(E, "'s ", "의 ")}<b style={{ color: "#0891b2" }}>j</b>
            {t(E, "th digit = ", "번째 자리 = ")}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, color: "#16a34a", fontWeight: 900 }}>1</code>
            {t(E, " if card ", " 이면 카드 ")}<b style={{ color: "#dc2626" }}>i</b>
            {t(E, " beats card ", " 가 카드 ")}<b style={{ color: "#0891b2" }}>j</b>
            {t(E, ".", ".")}
          </div>

          {/* Compact square matrix — uniform 64px cells throughout */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{
              display: "grid", gridTemplateColumns: "64px 64px repeat(3, 64px)",
              gridAutoRows: "64px",
              fontFamily: "'JetBrains Mono',monospace",
              border: "2px solid #cbd5e1", borderRadius: 10, overflow: "hidden", background: "#fff",
            }}>
              {/* Header row */}
              <div style={{ background: "#f8fafc", borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #cbd5e1" }}></div>
              <div style={{
                background: "#f8fafc", borderRight: "2px solid #cbd5e1", borderBottom: "2px solid #cbd5e1",
                fontSize: 10, color: C.dim, fontWeight: 700, textAlign: "center",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {t(E, "input", "입력")}
              </div>
              {[
                { n: 1, glyph: "●", color: "#2563eb" },
                { n: 2, glyph: "■", color: "#7c3aed" },
                { n: 3, glyph: "▲", color: "#ea580c" },
              ].map((c, idx) => (
                <div key={c.n} style={{
                  background: "#f8fafc", borderRight: idx < 2 ? "1px solid #e5e7eb" : "none",
                  borderBottom: "2px solid #cbd5e1", textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
                }}>
                  <div style={{ fontSize: 9, color: C.dim, fontWeight: 700 }}>{t(E, "vs", "vs")}</div>
                  <div style={{ fontSize: 20, color: c.color, lineHeight: 1 }}>{c.glyph}</div>
                  <div style={{ fontSize: 9, color: C.dim, fontWeight: 700 }}>{t(E, "card ", "카드 ")}{c.n}</div>
                </div>
              ))}

              {/* Three data rows */}
              {[
                { row: 1, glyph: "●", color: "#2563eb", str: "001", vals: [0, 0, 1] },
                { row: 2, glyph: "■", color: "#7c3aed", str: "100", vals: [1, 0, 0] },
                { row: 3, glyph: "▲", color: "#ea580c", str: "010", vals: [0, 1, 0] },
              ].map((r, ri) => (
                <div key={r.row} style={{ display: "contents" }}>
                  {/* Row label: shape + card N */}
                  <div style={{
                    background: "#f8fafc", borderRight: "1px solid #e5e7eb",
                    borderBottom: ri < 2 ? "1px solid #e5e7eb" : "none",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
                  }}>
                    <div style={{ fontSize: 20, color: r.color, lineHeight: 1 }}>{r.glyph}</div>
                    <div style={{ fontSize: 9, color: C.dim, fontWeight: 700 }}>{t(E, "card ", "카드 ")}{r.row}</div>
                  </div>
                  {/* Original input string */}
                  <div style={{
                    background: "#fef3c7", borderRight: "2px solid #cbd5e1",
                    borderBottom: ri < 2 ? "1px solid #fcd34d" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: 900, color: "#7c2d12",
                  }}>{r.str}</div>
                  {/* Three cells — show the raw digit (0/1) + meaning annotation */}
                  {r.vals.map((v, j) => {
                    const isSelf = j + 1 === r.row;
                    return (
                      <div key={j} style={{
                        borderRight: j < 2 ? "1px solid #e5e7eb" : "none",
                        borderBottom: ri < 2 ? "1px solid #e5e7eb" : "none",
                        background: isSelf
                          ? "repeating-linear-gradient(45deg, #f1f5f9 0 6px, #e2e8f0 6px 12px)"
                          : v === 1 ? "#16a34a" : "#fff",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
                      }}>
                        <div style={{
                          fontSize: 22, fontWeight: 900, lineHeight: 1,
                          fontFamily: "'JetBrains Mono',monospace",
                          color: isSelf ? "#94a3b8" : v === 1 ? "#fff" : "#cbd5e1",
                        }}>
                          {v}
                        </div>
                        {!isSelf && (
                          <div style={{
                            fontSize: 14, fontWeight: 900, lineHeight: 1,
                            color: v === 1 ? "#fff" : "#cbd5e1",
                          }}>
                            {v === 1 ? "✓" : "·"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Compact legend below matrix — matches cell representation (digit + annotation) */}
          <div style={{ display: "flex", justifyContent: "center", gap: 18, fontSize: 11.5, color: C.text, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ display: "inline-block", padding: "2px 6px", background: "#16a34a", color: "#fff", borderRadius: 3, fontWeight: 900, fontSize: 13, fontFamily: "'JetBrains Mono',monospace" }}>1</span>
              <span style={{ color: "#16a34a", fontWeight: 900 }}>✓</span>
              {t(E, "= beats", "= 이김")}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ display: "inline-block", padding: "2px 6px", background: "#fff", color: "#cbd5e1", border: "1px solid #cbd5e1", borderRadius: 3, fontWeight: 900, fontSize: 13, fontFamily: "'JetBrains Mono',monospace" }}>0</span>
              <span style={{ color: "#cbd5e1", fontWeight: 900 }}>·</span>
              {t(E, "= doesn't beat", "= 못 이김")}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ display: "inline-block", width: 18, height: 18, background: "repeating-linear-gradient(45deg, #f1f5f9 0 3px, #e2e8f0 3px 6px)", borderRadius: 3 }}></span>
              {t(E, "= self", "= 자기 자신")}
            </span>
          </div>

          {/* Small RPS-coincidence caveat */}
          <div style={{ marginTop: 4, fontSize: 10.5, color: C.dim, textAlign: "center", fontStyle: "italic", lineHeight: 1.5 }}>
            {t(E, "(This sample's chart happens to encode standard Rock-Paper-Scissors if you're familiar — but the problem is purely about the chart, not RPS rules.)",
                  "(이 샘플 차트는 우연히 익숙한 가위·바위·보 규칙과 같아요 — 하지만 문제는 차트만 보면 됨, RPS 규칙 몰라도 됨.)")}
          </div>
        </div>),
    },

    // 1-4: Why answer = 2 — visual flow
    {
      type: "reveal",
      narr: t(E,
        "Walk the answer in one picture: Elsie's two cards → what beats each → Bessie's required pair → 2 orderings.",
        "한 그림으로 답 풀기: Elsie 두 카드 → 각각 무엇이 이김 → Bessie 필요 카드 → 순서 2 가지."),
      content: (() => {
        const C1 = { glyph: "●", color: "#2563eb" };
        const C2 = { glyph: "■", color: "#7c3aed" };
        const C3 = { glyph: "▲", color: "#ea580c" };
        const Pill = ({ s, n, size = 22, bgTint = false }) => (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 8,
            border: `1.5px solid ${s.color}50`,
            background: bgTint ? `${s.color}10` : "#fff",
          }}>
            <span style={{ fontSize: size, color: s.color, lineHeight: 1 }}>{s.glyph}</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{t(E, "card ", "카드 ")}{n}</span>
          </span>
        );
        const Column = ({ elsieCard, counterCard, elsieN, counterN, chartRow }) => (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Pill s={elsieCard} n={elsieN} size={26} />
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              padding: "6px 10px", background: "#faf5ff", border: "1px dashed #c4b5fd", borderRadius: 8,
              fontSize: 11, color: "#5b21b6",
            }}>
              <div style={{ fontWeight: 700 }}>{t(E, "what beats it?", "이기는 게 뭐?")}</div>
              <div style={{ fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
                {t(E, `chart row ${chartRow}`, `차트 ${chartRow} 행`)}
              </div>
            </div>
            <div style={{ fontSize: 16, color: "#16a34a", fontWeight: 900 }}>↓</div>
            <Pill s={counterCard} n={counterN} size={26} bgTint />
          </div>
        );
        return (
          <div style={{ padding: 16 }}>
            {/* Step 1: Elsie's hand laid down */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 700 }}>{t(E, "Elsie's hand", "Elsie hand")}</div>
              <div style={{ display: "flex", gap: 12, padding: "8px 14px", background: "#fee2e2", borderRadius: 10, border: "2px solid #fca5a5" }}>
                <Pill s={C1} n={1} size={24} />
                <Pill s={C3} n={3} size={24} />
              </div>
              <div style={{ fontSize: 11.5, color: "#7f1d1d", fontWeight: 700, marginTop: 4 }}>
                {t(E, "Bessie needs a counter for EACH", "Bessie는 각각에 대한 카운터 필요")}
              </div>
            </div>

            {/* Step 2: Two parallel lookup columns */}
            <div style={{ background: "#fff", border: "2px solid #c4b5fd", borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 800, textAlign: "center", marginBottom: 12 }}>
                {t(E, "Look up the counter for each Elsie card", "Elsie 카드 각각의 카운터 차트에서 lookup")}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Column elsieCard={C1} counterCard={C2} elsieN={1} counterN={2} chartRow={2} />
                <Column elsieCard={C3} counterCard={C1} elsieN={3} counterN={1} chartRow={1} />
              </div>
              <div style={{ marginTop: 10, fontSize: 10.5, color: C.dim, textAlign: "center", fontStyle: "italic" }}>
                {t(E, "(chart row 2 = '100' → card 2 beats card 1; chart row 1 = '001' → card 1 beats card 3)",
                      "(차트 2행 = '100' → 카드 2 가 카드 1 이김; 차트 1행 = '001' → 카드 1 이 카드 3 이김)")}
              </div>
            </div>

            <div style={{ textAlign: "center", fontSize: 18, color: C.dim, margin: "0 0 8px" }}>↓</div>

            {/* Step 3: Both required → Bessie's hand */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#15803d", fontWeight: 800 }}>{t(E, "Bessie's hand must contain BOTH", "Bessie hand 는 둘 다 포함")}</div>
              <div style={{ display: "flex", gap: 12, padding: "8px 14px", background: "#dcfce7", borderRadius: 10, border: "2px solid #86efac" }}>
                <Pill s={C2} n={2} size={24} />
                <Pill s={C1} n={1} size={24} />
              </div>
            </div>

            <div style={{ textAlign: "center", fontSize: 18, color: C.dim, margin: "0 0 8px" }}>↓</div>

            {/* Step 4: 2 orderings — the answer */}
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#92400e", fontWeight: 800, textAlign: "center", marginBottom: 8 }}>
                {t(E, "Two orderings = 2 hands counted", "순서 2 가지 = hand 2 개로 카운트")}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#fff", border: "1.5px solid #fdba74", borderRadius: 8, fontSize: 22 }}>
                  <span>(</span><span style={{ color: C2.color }}>{C2.glyph}</span><span style={{ color: C.dim }}>,</span><span style={{ color: C1.color }}>{C1.glyph}</span><span>)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#fff", border: "1.5px solid #fdba74", borderRadius: 8, fontSize: 22 }}>
                  <span>(</span><span style={{ color: C1.color }}>{C1.glyph}</span><span style={{ color: C.dim }}>,</span><span style={{ color: C2.color }}>{C2.glyph}</span><span>)</span>
                </div>
              </div>
              <div style={{ marginTop: 10, textAlign: "center", fontSize: 18, fontWeight: 900, color: "#16a34a" }}>
                {t(E, "answer = 2", "답 = 2")}
              </div>
              <div style={{ marginTop: 4, textAlign: "center", fontSize: 10.5, color: C.dim }}>
                {t(E, "(slot 1 vs slot 2 are different positions → both orderings count)",
                      "(자리 1 과 자리 2 는 다른 자리 → 두 순서 다 셈)")}
              </div>
            </div>
          </div>
        );
      })(),
    },

    // 1-5: Interactive case-walk — two scenarios (one fail, one win) vs Sample I/O Elsie hand
    {
      type: "reveal",
      narr: t(E,
        "We'll try TWO different Bessie hands against Elsie's (card 1, card 3) — same as Sample I/O. One hand fails, one wins. Press ▶ to step through both.",
        "Elsie (카드 1, 카드 3) 에 대해 — Sample I/O 와 같음 — Bessie hand 두 가지를 시도해요. 하나는 실패, 하나는 성공. ▶ 눌러서 두 시나리오 다 따라가요."),
      content: (<HpsCaseSimulator E={E} />),
    },
    {
      type: "quiz",
      narr: t(E,
        "Bessie wins if for BOTH of Elsie's cards, at least one of Bessie's cards can beat it.\nShe picks optimally after seeing Elsie's choice!\n(Beats chart: card 1 beats 3, card 2 beats 1, card 3 beats 2.)",
        "Bessie가 이기려면: Elsie의 두 카드 모두에 대해, Bessie의 카드 중 하나가 이길 수 있어야 해요. Elsie 선택 본 후 최적으로 고름!\n(차트: 카드 1 이 3 이김, 카드 2 가 1 이김, 카드 3 이 2 이김.)"),
      question: t(E,
        "Bessie has (card 1, card 2). Elsie plays card 3. Can Bessie win?",
        "Bessie가 (카드 1, 카드 2) 를 가짐. Elsie가 카드 3 을 냄. Bessie가 이길 수 있어요?"),
      options: [
        t(E, "Yes — pick card 1 (it beats card 3)", "네 — 카드 1 선택 (카드 3 이김)"),
        t(E, "No — card 3 beats card 2", "아니 — 카드 3 이 카드 2 이김"),
      ],
      correct: 0,
      explain: t(E, "Card 1 beats card 3 (chart row 1 = '001'). Bessie picks card 1.", "카드 1 이 카드 3 이김 (차트 1 행 = '001'). Bessie는 카드 1 을 골라요."),
    },
    {
      type: "input",
      narr: t(E,
        "Now you count. Elsie's hand = (card 1, card 2) — different from Sample I/O. Bessie has 3×3 = 9 possible hands (ordered pairs (a, b)).\nFor a hand to GUARANTEE a win:\n• at least one of a, b beats card 1 → need card 2 (chart row 2 = '100')\n• at least one of a, b beats card 2 → need card 3 (chart row 3 = '010')\nSo Bessie's hand must contain BOTH card 2 AND card 3.",
        "이제 직접 세요. Elsie hand = (카드 1, 카드 2) — Sample I/O 와는 다름. Bessie hand 는 3×3 = 9 가지 (순서쌍 (a, b)).\n무조건 이기는 hand 가 되려면:\n• a, b 중 하나가 카드 1 이김 → 카드 2 필요 (차트 2 행 = '100')\n• a, b 중 하나가 카드 2 이김 → 카드 3 필요 (차트 3 행 = '010')\n그러니까 hand 는 카드 2 AND 카드 3 둘 다 포함해야 함."),
      question: t(E,
        "Elsie plays (card 1, card 2). How many of Bessie's 9 hands guarantee a win?",
        "Elsie가 (카드 1, 카드 2) 를 가짐. Bessie의 9 가지 hand 중 무조건 이기는 것은?"),
      hint: t(E, "Hand must contain BOTH card 2 AND card 3. Only (card 2, card 3) and (card 3, card 2) qualify.",
                "hand 에 카드 2 AND 카드 3 둘 다 들어가야 함. (카드 2, 카드 3) 와 (카드 3, 카드 2) 두 가지만 해당."),
      answer: 2,
    },
    {
      type: "sim",
      narr: t(E,
        "Pick Bessie's (a, b) and Elsie's (s1, s2). See if Bessie can guarantee a win.", "Bessie (a, b), Elsie (s1, s2) 골라서 Bessie가 승리 보장 가능한지 확인."),
    },
  ];
}

export function makeHpsCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Brute force: for each Elsie pair, try every (a, b) for Bessie. The win check is just a 1-line OR — done inline in the loop.",
        "완전탐색: Elsie 쌍마다 Bessie의 모든 (a, b) 시도. win 체크는 1 줄 OR — 루프 안에 인라인."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read beats matrix", "승패 차트 읽기"), code: "beats[i][j] = '1' if i beats j", color: "#059669" },
              { n: 2, label: t(E, "Per query: inline win check", "쿼리마다: 인라인 win 체크"), code: "wins = beats[a][x]=='1' or beats[b][x]=='1'  # for x in {s1, s2}", color: "#0891b2" },
              { n: 3, label: t(E, "Count pairs that win both", "두 카드 다 이기는 쌍 카운트"), code: "if wins_s1 and wins_s2: count++", color: "#dc2626" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(M · N²)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "M queries × N² Bessie pairs", "M 쿼리 × N² Bessie 쌍")}</div>
          </div>
        </div>),
    },
    // 2-2: TLE check — does brute force fit?
    {
      type: "reveal",
      narr: t(E,
        "Will the brute force be fast enough? Look at the constraints and multiply out.",
        "브루트포스가 시간 안에 들어올까? 제약 보고 곱해 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#16a34a", textAlign: "center", marginBottom: 10 }}>
            ✅ {t(E, "TLE check — C++ passes, Python is borderline", "타임아웃 체크 — C++ 통과, Python 은 경계선")}
          </div>
          <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 14px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#15803d" }}>
              <div style={{ fontWeight: 800 }}>N</div>     <div>≤ 30 {t(E, "(symbols)", "(기호)")}</div>
              <div style={{ fontWeight: 800 }}>M</div>     <div>≤ 10⁵ {t(E, "(queries)", "(쿼리)")}</div>
              <div style={{ fontWeight: 800 }}>{t(E, "per query", "쿼리당")}</div> <div>O(N²) = 900</div>
              <div style={{ fontWeight: 800 }}>{t(E, "total", "총")}</div> <div>M · N² ≈ 10⁵ · 900 ≈ 10⁸</div>
              <div style={{ fontWeight: 800, color: "#16a34a" }}>{t(E, "verdict", "판정")}</div>
              <div style={{ color: "#16a34a", fontWeight: 800 }}>{t(E, "C++ fits comfortably in 1s ✓", "C++ 은 1 초 안에 충분 ✓")}</div>
            </div>
          </div>
          <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#92400e", marginBottom: 4 }}>
              ⚠️ {t(E, "Python warning — 10⁸ ops is slow in Python", "Python 주의 — 10⁸ 연산은 Python 에서 느려요")}
            </div>
            <div style={{ fontSize: 12, color: "#7c2d12", lineHeight: 1.6 }}>
              {t(E, "Pure Python runs ~10⁷ basic ops per second. 10⁸ inner-loop ops would take ~10s — likely TLE on USACO. Workarounds: (a) submit as PyPy, (b) replace the (a,b) double loop with bit-AND on bitmask rows of beats. C++ has no such issue.",
                    "순수 Python 은 1 초에 약 10⁷ 기본 연산. 10⁸ 안쪽 루프면 약 10 초 — USACO 에서 TLE 가능성 높음. 우회: (a) PyPy 로 제출, (b) (a,b) 이중 루프를 beats 행의 비트마스크 + AND 로 대체. C++ 은 그런 문제 없음.")}
            </div>
          </div>
          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E, "Because N is tiny (≤30), the inner double loop over (a, b) is only 900 work per query. The algorithm itself is brute force — no smarter trick needed conceptually. Just pick the right language (or PyPy).",
                    "N 이 작아서 (≤30) (a, b) 두 중첩 루프가 쿼리당 겨우 900 연산. 알고리즘 자체는 브루트포스로 충분 — 더 똑똑한 트릭 개념적으로 불필요. 언어 (또는 PyPy) 만 잘 고르면 됨.")}
            </div>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Now build the brute force step by step. Each section reveals one piece.", "완전탐색을 단계별로 만들어보자. 각 섹션마다 한 조각씩."),
      sections: getHpsSections(E),
    },
  ];
}
