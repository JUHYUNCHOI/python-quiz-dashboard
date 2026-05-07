import { C, t } from "@/components/quest/theme";
import { getHpsSections, HpsCaseSimulator, ChartReadingTour, WinningRulesBanner, CodeSectionView, BitsLab, BitmaskColSim } from "./components";

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
                  {t(E, ". All 4 cards are visible. Then both cows ", ". 4 장 다 보여요. 그 다음 두 소가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "SIMULTANEOUSLY", "동시에")}</b>
                  {t(E, " each pick ONE of their own two to play — neither sees the other's pick. The card that beats the other wins.",
                        " 자기 2 장 중 1 장을 골라 내요 — 서로의 선택을 못 봐요. 이기는 카드를 낸 쪽이 승리.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Elsie's hand is given M times. For each one, count Bessie's hands (ordered pairs) where ",
                        "Elsie 의 패 가 M 번 주어져요. 각 패 마다, ")}
                  <b style={{ color: "#15803d" }}>{t(E, "Elsie can play whatever card she wants and Bessie still wins",
                                                          "Elsie 가 무슨 카드를 내도 Bessie 가 이기는")}</b>
                  {t(E, ". (Bessie just needs ONE card in her hand that beats BOTH of Elsie's cards — she plays that one and is safe either way.) Output the count.",
                        " Bessie 패 의 개수를 출력. (Bessie 한테 Elsie 의 두 카드를 모두 이기는 카드 하나만 있으면 됨 — 그 카드를 내면 Elsie 가 뭘 내든 이김.)")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 6, fontSize: 11.5, color: C.dim, lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0 }}>📌</span>
                <div>
                  {t(E, "A 'hand' is an ORDERED pair (a, b) — slot 1 and slot 2 are different positions, and the two cards CAN be the same. For N = 3 there are 3² = 9 possible hands.",
                        "'패' 는 순서쌍 (a, b) — 자리 1 과 자리 2 는 서로 다른 자리이고, 같은 카드 두 장도 OK. N = 3 이면 패 는 3² = 9 가지.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sample input / output format — real USACO sample
    {
      type: "reveal",
      narr: t(E,
        "Real USACO sample: 3 card types, 3 Elsie hands. The matchup chart is a TRIANGULAR matrix using W/L/D characters.",
        "실제 USACO 샘플: 3 종 카드, 3 개 Elsie 패. 승패 차트는 W/L/D 글자로 된 삼각 행렬."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#059669", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`3 3
D
WD
LWD
1 2
2 3
1 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`0
0
5`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>
              🔍 {t(E, "What each line means", "각 줄 의미")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 12px", alignItems: "baseline" }}>
              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>3 3</code>
              <div>{t(E, "N = number of cards, M = number of Elsie's hands", "N = 카드 종류 수, M = Elsie 패 개수")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>D / WD / LWD</code>
              <div>
                {t(E, "matchup chart (next N lines, row ", "매치업 차트 (다음 N 줄, ")}<b style={{ color: "#dc2626" }}>i</b>
                {t(E, " has ", " 행은 ")}<b style={{ color: "#dc2626" }}>i</b>
                {t(E, " characters of W/L/D)", " 글자: W/L/D)")}
                <span style={{ marginLeft: 6, color: "#5b21b6", fontSize: 12 }}>
                  → {t(E, "see next page", "다음 페이지 참고")}
                </span>
              </div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>1 2</code>
              <div>{t(E, "Elsie's 1st hand: cards (1, 2)", "Elsie 의 첫 패: 카드 (1, 2)")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>2 3</code>
              <div>{t(E, "Elsie's 2nd hand: cards (2, 3)", "Elsie 의 둘째 패: 카드 (2, 3)")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>1 1</code>
              <div>{t(E, "Elsie's 3rd hand: cards (1, 1)", "Elsie 의 셋째 패: 카드 (1, 1)")}</div>
            </div>

            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #c4b5fd", fontSize: 12, color: "#5b21b6" }}>
              💡 {t(E, "For each of the 3 Elsie hands, output how many Bessie hands let her win no matter what Elsie plays.",
                       "Elsie 의 3 개 패 각각에 대해, Elsie 가 무엇을 내도 이기는 Bessie 패 개수를 출력.")}
            </div>
            <div style={{ marginTop: 6, fontSize: 10.5, color: C.dim, fontStyle: "italic" }}>
              {t(E, "📌 Cards are numbered 1..N (1-indexed).", "📌 카드 번호는 1..N (1-indexed).")}
            </div>
          </div>
        </div>),
    },

    // 1-3: How to read the W/L/D triangular matchup chart
    // 1-3: Read the chart cell-by-cell — winner → loser arrows
    {
      type: "reveal",
      narr: t(E,
        "Walk the chart cell by cell. Each cell shows winner → loser. Press ▶ to step through.",
        "차트 셀 하나씩 따라가요. 각 셀은 '이기는 카드 → 지는 카드' 표시. ▶ 눌러서 진행."),
      content: (<ChartReadingTour E={E} />),
    },

    // 1-4: Walk-through of Game 3 from sample (Elsie hand = (1, 1) → 5)
    {
      type: "reveal",
      narr: t(E,
        "Walk Game 3 from the sample: Elsie has (card 1, card 1). Find the card that beats card 1 — then count Bessie hands that contain at least one such card.",
        "샘플 게임 3 풀이: Elsie 패 = (카드 1, 카드 1). 카드 1 을 이기는 카드 찾고 — 그 카드를 적어도 한 장 들고 있는 Bessie 패 가 몇 개인지 세요."),
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
        const TryCol = ({ card, n, beats1, label }) => (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            padding: "10px 8px", borderRadius: 10,
            background: beats1 ? "#dcfce7" : "#fff",
            border: `2px solid ${beats1 ? "#16a34a" : "#e5e7eb"}`,
          }}>
            <Pill s={card} n={n} size={24} bgTint={beats1} />
            <div style={{ fontSize: 11, color: beats1 ? "#15803d" : C.dim, fontWeight: 700, textAlign: "center", lineHeight: 1.4 }}>
              {beats1
                ? t(E, "beats card 1 ✓", "카드 1 이김 ✓")
                : t(E, "doesn't beat card 1", "카드 1 못 이김")}
            </div>
            {label && <div style={{ fontSize: 10, color: "#15803d", fontWeight: 800 }}>{label}</div>}
          </div>
        );
        return (
          <div style={{ padding: 16 }}>
            <WinningRulesBanner E={E} />
            {/* Step 1: Elsie's hand */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 700 }}>{t(E, "Elsie's hand (sample game 3)", "Elsie 의 패 (샘플 게임 3)")}</div>
              <div style={{ display: "flex", gap: 12, padding: "8px 14px", background: "#fee2e2", borderRadius: 10, border: "2px solid #fca5a5" }}>
                <Pill s={C1} n={1} size={24} />
                <Pill s={C1} n={1} size={24} />
              </div>
              <div style={{ fontSize: 11.5, color: "#7f1d1d", fontWeight: 700, marginTop: 4 }}>
                {t(E, "Both cards are card 1 — Bessie just needs ONE card that beats card 1.",
                      "두 카드 다 카드 1 — Bessie 는 카드 1 을 이기는 카드 하나만 필요.")}
              </div>
            </div>

            {/* Step 2: Try every card */}
            <div style={{ background: "#fff", border: "2px solid #c4b5fd", borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 800, textAlign: "center", marginBottom: 10 }}>
                {t(E, "Try every card 1..N — does it beat card 1?",
                      "카드 1..N 시험 — 카드 1 을 이기는가?")}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                <TryCol card={C1} n={1} beats1={false} />
                <TryCol card={C2} n={2} beats1={true} label={t(E, "this one!", "이거!")} />
                <TryCol card={C3} n={3} beats1={false} />
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: "#15803d", textAlign: "center", fontWeight: 700 }}>
                → {t(E, "Only card 2 beats card 1.", "카드 2 만 카드 1 이김.")}
              </div>
            </div>

            <div style={{ textAlign: "center", fontSize: 18, color: C.dim, margin: "0 0 8px" }}>↓</div>

            {/* Step 3: All 9 Bessie hands laid out in a 3×3 grid;
                highlight the ones with at least one card 2. */}
            <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#15803d", fontWeight: 800, textAlign: "center", marginBottom: 4 }}>
                {t(E, "All 9 Bessie hands (a, b) — green ones contain card 2",
                      "Bessie 패 9 가지 (a, b) 모두 — 초록 = 카드 2 가 들어 있는 패")}
              </div>
              <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 10 }}>
                {t(E, "(rows = a / first card · columns = b / second card)",
                      "(행 = a / 첫째 카드 · 열 = b / 둘째 카드)")}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "32px repeat(3, 60px)",
                  gridAutoRows: "44px", gap: 0,
                  fontFamily: "'JetBrains Mono',monospace",
                }}>
                  {/* header: empty + b labels */}
                  <div />
                  {[1, 2, 3].map((b) => (
                    <div key={`h${b}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: C.dim }}>
                      b={b}
                    </div>
                  ))}
                  {/* rows: a label + 3 cells */}
                  {[1, 2, 3].map((a) => (
                    <div key={`r${a}`} style={{ display: "contents" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6, fontSize: 11, fontWeight: 800, color: C.dim }}>
                        a={a}
                      </div>
                      {[1, 2, 3].map((b) => {
                        const hasDom = a === 2 || b === 2;
                        return (
                          <div key={`${a}-${b}`} style={{
                            margin: 3,
                            border: `2px solid ${hasDom ? "#16a34a" : "#cbd5e1"}`,
                            background: hasDom ? "#dcfce7" : "#fff",
                            borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 14, fontWeight: 800,
                            color: hasDom ? "#15803d" : "#94a3b8",
                          }}>
                            ({a},{b}) {hasDom && <span style={{ marginLeft: 3, fontSize: 11 }}>✓</span>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 12, paddingTop: 8, borderTop: "1px dashed #86efac", textAlign: "center", fontSize: 13, fontWeight: 800, color: "#15803d" }}>
                {t(E, "Count the green cells: 5 hands win.", "초록 셀 세보면: 5 개 패 가 이김.")}
              </div>
            </div>

            {/* Step 4: Answer */}
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#16a34a", textAlign: "center" }}>
                {t(E, "answer = 5", "답 = 5")}
              </div>
              <div style={{ marginTop: 4, textAlign: "center", fontSize: 10.5, color: C.dim }}>
                {t(E, "Matches the sample's third output line.", "샘플 출력 셋째 줄과 일치.")}
              </div>
            </div>

            {/* Sidebar — what about other games? */}
            <div style={{ marginTop: 12, fontSize: 11, color: "#5b21b6", textAlign: "center", lineHeight: 1.55 }}>
              {t(E, "Games 1 (Elsie hand 1, 2) and 2 (hand 2, 3) — no card beats both Elsie cards → answer 0 each. Try them in the sim below.",
                    "게임 1 (Elsie 패 1, 2) 과 2 (패 2, 3) — 두 카드 다 이기는 카드 없음 → 둘 다 답 0. 아래 sim 에서 따라가요.")}
            </div>
          </div>
        );
      })(),
    },

    // 1-5: Interactive walk — both sample games (Elsie (1,2)→0 and (1,1)→5)
    {
      type: "reveal",
      narr: t(E,
        "Walk all 3 sample games step by step. ▶ to advance.",
        "샘플 3 게임 한 단계씩 따라가요. ▶ 눌러서 진행."),
      content: (<><WinningRulesBanner E={E} /><HpsCaseSimulator E={E} /></>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Quick check.",
        "간단 체크."),
      question: t(E,
        "Bessie = (card 2, card 1), Elsie = (card 1, card 1). Does Bessie always win?",
        "Bessie = (카드 2, 카드 1), Elsie = (카드 1, 카드 1). Bessie 가 무조건 이기나?"),
      options: [
        t(E, "Yes — card 2 beats both of Elsie's card 1's", "네 — 카드 2 가 Elsie 의 카드 1 두 장을 다 이김"),
        t(E, "No — card 1 doesn't beat card 1 (draw)", "아니 — 카드 1 은 카드 1 못 이김 (비김)"),
      ],
      correct: 0,
      explain: t(E,
        "Bessie plays card 2 — beats card 1 either way.",
        "Bessie 는 카드 2 를 내면 됨 — 카드 1 어느 쪽이든 다 이김."),
    },
    {
      type: "input",
      narr: t(E,
        "Your turn — count.",
        "직접 세요."),
      question: t(E,
        "Elsie = (card 2, card 3). How many of Bessie's 9 hands always win?",
        "Elsie 패 = (카드 2, 카드 3). Bessie 의 9 가지 패 중 무조건 이기는 패 는 몇 개?"),
      hint: t(E, "No single card beats both card 2 and card 3.",
                "카드 2 와 카드 3 둘 다 이기는 카드는 없어요."),
      answer: 0,
    },
  ];
}

export function makeHpsCh2(E, lang = "py") {
  return [
    // 2-1..2-5: WRITE — one section per chapter step. Each step shows
    // the cumulative code, the sample input with relevant lines lit up,
    // and a brief "why this way?" note. Single navigation level: chapter
    // prev/next walks all 5 sections naturally.
    // Steps 1-6: input + table + brute force code (sections 1-6)
    ...getHpsSections(E).slice(0, 6).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Now write the code, step by step. We'll grow the program one piece at a time.",
              "이제 코드 작성. 한 단계마다 한 조각씩 추가하면서 프로그램을 키워요.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
    // Reality check: submit brute force → TLE on harder cases.
    // The "why both languages fail" math comes on the NEXT page; here we
    // just show the raw result.
    {
      type: "reveal",
      narr: t(E,
        "Submit the brute force. The judge runs 12 test inputs.",
        "Brute force 코드 제출. 채점기가 12 개 테스트 입력을 돌려요."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // Why brute force fails — math, with derivation of N²
    {
      type: "reveal",
      narr: t(E,
        "Why does even C++ time out? Count the operations — and see WHERE the N² comes from.",
        "왜 C++ 도 시간 초과? 연산 횟수 세기 — N² 가 어디서 나오는지부터."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // Formula derivation — explain N² − (N − dom)² visually with the (1,1) sample
    {
      type: "reveal",
      narr: t(E,
        "Before coding the smart version — let's see WHY the formula works. It's counting via the complement (count what's easy, subtract).",
        "Smart 코드 짜기 전에 — 공식이 왜 이렇게 되는지. 핵심: '쉬운 쪽' 을 세서 빼는 방식 (여집합 카운팅)."),
      content: (() => {
        const C1 = { glyph: "●", color: "#2563eb" };
        const C2 = { glyph: "■", color: "#7c3aed" };
        const C3 = { glyph: "▲", color: "#ea580c" };
        const Card = ({ n, glyph, color, size = 16 }) => (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: size, color, lineHeight: 1 }}>{glyph}</span>
            <span style={{ fontSize: size * 0.7, fontWeight: 800 }}>{n}</span>
          </span>
        );
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", textAlign: "center", marginBottom: 10 }}>
              💡 {t(E, "The formula: N² − (N − dom)²", "공식: N² − (N − dom)²")}
            </div>

            {/* The reasoning */}
            <div style={{ background: "#faf5ff", border: "1.5px solid #c4b5fd", borderRadius: 10, padding: "12px 14px", marginBottom: 12, fontSize: 12.5, color: "#1f2937", lineHeight: 1.75 }}>
              <div><b style={{ color: "#5b21b6" }}>{t(E, "Step 1 — Count everything: ", "1 단계 — 전체 다 세기: ")}</b></div>
              <div style={{ paddingLeft: 12 }}>
                {t(E, "Bessie has N choices for card a, N for card b → ", "Bessie 가 a 자리에 N 가지, b 자리에 N 가지 → ")}
                <b style={{ fontFamily: "'JetBrains Mono',monospace" }}>N × N = N²</b> {t(E, "total hands.", "전체 패.")}
              </div>

              <div style={{ marginTop: 10 }}><b style={{ color: "#5b21b6" }}>{t(E, "Step 2 — Find what's EASY to count: ", "2 단계 — 세기 쉬운 것 찾기: ")}</b></div>
              <div style={{ paddingLeft: 12 }}>
                {t(E, "Counting 'hands that win' directly is hard (overlapping cases). But counting 'hands that LOSE' is easy: a hand loses iff NEITHER card beats both Elsie cards.",
                      "'이기는 패' 직접 세기는 어려움 (겹침). 그런데 '지는 패' 는 쉬움: 두 카드 다 'Elsie 두 카드 다 이기는 카드' 가 아닌 경우.")}
              </div>

              <div style={{ marginTop: 10 }}><b style={{ color: "#5b21b6" }}>{t(E, "Step 3 — Count the losers: ", "3 단계 — 지는 패 세기: ")}</b></div>
              <div style={{ paddingLeft: 12 }}>
                {t(E, "If dom cards beat both, then (N − dom) cards DON'T. For a losing hand, both a and b must be from those (N − dom) cards → ",
                      "이기는 카드 dom 개, 못 이기는 카드 (N − dom) 개. 지는 패: a 도 b 도 그 (N − dom) 개 중 → ")}
                <b style={{ fontFamily: "'JetBrains Mono',monospace" }}>(N − dom) × (N − dom) = (N − dom)²</b>
              </div>

              <div style={{ marginTop: 10 }}><b style={{ color: "#5b21b6" }}>{t(E, "Step 4 — Subtract: ", "4 단계 — 빼기: ")}</b></div>
              <div style={{ paddingLeft: 12 }}>
                {t(E, "Winning hands = total − losing hands = ", "이기는 패 = 전체 − 지는 패 = ")}
                <b style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: "#16a34a" }}>N² − (N − dom)²</b>
              </div>
            </div>

            {/* Concrete example: Game 3 */}
            <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#166534", marginBottom: 8, textAlign: "center" }}>
                🎯 {t(E, "Plug in Game 3: Elsie (card 1, card 1)", "샘플 게임 3 에 대입: Elsie (카드 1, 카드 1)")}
              </div>
              <div style={{ fontSize: 12.5, fontFamily: "'JetBrains Mono',monospace", color: "#15803d", lineHeight: 1.85 }}>
                <div>{t(E, "Cards beating card 1: only ", "카드 1 을 이기는 카드: ")}<Card n={2} glyph="■" color="#7c3aed" /> {t(E, " → dom = ", " → dom = ")}<b>1</b></div>
                <div>{t(E, "N = 3, so:", "N = 3 일 때:")}</div>
                <div style={{ paddingLeft: 10 }}>{t(E, "Total hands = N² = 3² = ", "전체 패 = N² = 3² = ")}<b>9</b></div>
                <div style={{ paddingLeft: 10 }}>{t(E, "Losing hands = (N − dom)² = (3 − 1)² = 2² = ", "지는 패 = (N − dom)² = (3 − 1)² = 2² = ")}<b>4</b></div>
                <div style={{ paddingLeft: 10, paddingTop: 4, borderTop: "1px dashed #86efac", marginTop: 4 }}>
                  {t(E, "Winning hands = 9 − 4 = ", "이기는 패 = 9 − 4 = ")}<b style={{ fontSize: 16, color: "#15803d" }}>5</b> ✓
                </div>
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: "#166534", textAlign: "center", lineHeight: 1.5 }}>
                {t(E, "(Same answer as the 9 hands grid in Ch 1.)", "(Ch 1 의 9 가지 패 격자 답과 동일.)")}
              </div>
            </div>
          </div>
        );
      })(),
    },
    // Insight + smart code (sections 7-8)
    ...getHpsSections(E).slice(6, 8).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Now write the smart version — single loop counting dom, then plug into the formula.",
              "이제 smart 버전 — dom 세는 단일 for, 그 후 공식 대입.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
    // Why smart works — both Python and C++
    {
      type: "reveal",
      narr: t(E,
        "Now both C++ and Python pass — even Python! Why?",
        "이제 C++ 도 Python 도 둘 다 통과 — Python 까지! 왜 그럴까?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#15803d", textAlign: "center", marginBottom: 12 }}>
            ✅ {t(E, "Smart algorithm complexity", "Smart 알고리즘 복잡도")}
          </div>
          <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: 14, marginBottom: 10 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2, color: "#15803d" }}>
              <div>{t(E, "Per query:", "쿼리당:")} <b>N = 3000</b></div>
              <div>{t(E, "× M queries:", "× M 쿼리:")} <b>3000</b></div>
              <div style={{ borderTop: "1.5px dashed #86efac", paddingTop: 8, marginTop: 4 }}>
                {t(E, "Total: ", "합계: ")}<b style={{ fontSize: 16 }}>9,000,000</b> {t(E, "operations", "연산")}
              </div>
            </div>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: "6px 12px",
            fontSize: 12, marginBottom: 10, alignItems: "center",
          }}>
            <div style={{ fontWeight: 800, color: "#6b7280" }}></div>
            <div style={{ fontWeight: 800, color: "#dc2626", textAlign: "center" }}>{t(E, "Brute", "Brute")}</div>
            <div style={{ fontWeight: 800, color: "#16a34a", textAlign: "center" }}>{t(E, "Smart", "Smart")}</div>

            <div style={{ fontWeight: 800 }}>{t(E, "Total ops", "총 연산")}</div>
            <div style={{ textAlign: "center", color: "#dc2626" }}>27,000,000,000</div>
            <div style={{ textAlign: "center", color: "#16a34a" }}>9,000,000</div>

            <div style={{ fontWeight: 800 }}>C++</div>
            <div style={{ textAlign: "center", color: "#dc2626" }}>~27 {t(E, "sec", "초")} ❌</div>
            <div style={{ textAlign: "center", color: "#16a34a" }}>~0.01 {t(E, "sec", "초")} ✅</div>

            <div style={{ fontWeight: 800 }}>Python</div>
            <div style={{ textAlign: "center", color: "#dc2626" }}>~2700 {t(E, "sec", "초")} ❌</div>
            <div style={{ textAlign: "center", color: "#16a34a" }}>~1 {t(E, "sec", "초")} ✅</div>
          </div>
          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", fontSize: 13, lineHeight: 1.65, color: "#065f46" }}>
            {t(E, "→ ", "→ ")}<b>3000× {t(E, "fewer operations", "적은 연산")}</b>
            {t(E, ". The Python slowness barely matters when total work is small enough. Algorithm beats language.",
                  ". Python 의 느린 속도가 문제 안 됨 — 절대 작업량이 작아져서. 알고리즘이 언어보다 중요.")}
          </div>
        </div>),
    },
    // ── Bonus track: bitmask trick. Teaches bits + operators from scratch
    //    before showing the optimized code, since most Bronze students
    //    haven't seen bit operations yet.
    {
      type: "reveal",
      narr: t(E,
        "Want to get even smarter? There's a trick using BITS — but you need to know what bits are first. New territory; let's learn it from scratch.",
        "더 똑똑해지려면? 비트 (bit) 트릭이 있어요 — 비트가 뭔지부터 배워야 함. 새 내용이니까 처음부터."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0891b2", textAlign: "center", marginBottom: 10 }}>
            🚀 {t(E, "Even smarter? Bits.", "더 똑똑해지려면? 비트.")}
          </div>
          <div style={{ background: "#f0f9ff", border: "2px solid #7dd3fc", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#075985", lineHeight: 1.7 }}>
            <div>
              {t(E, "The smart version is already fast enough to pass. But there's a beautiful trick that makes it ", "Smart 버전으로도 통과는 하지만, 한층 더 빠르게 만드는 깔끔한 트릭이 있어요 — ")}
              <b>{t(E, "60× faster still", "추가로 ~60× 빠름")}</b>
              {t(E, " — using BITS.", " — 비트 (bit) 사용.")}
            </div>
            <div style={{ marginTop: 6 }}>
              {t(E, "If you've never used bit operators, the next 3 steps teach what they are. Then we apply them.",
                    "비트 연산을 처음 보는 거면 다음 3 단계가 기초부터 설명. 그 후 이 문제에 적용.")}
            </div>
          </div>
        </div>),
    },
    // Bits primer
    {
      type: "reveal",
      narr: t(E,
        "Step 1: bits. Every number has a binary form — a row of 0s and 1s.",
        "1 단계: 비트 (bit). 모든 숫자는 2진수 — 0 과 1 의 줄."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0891b2", textAlign: "center", marginBottom: 10 }}>
            🔢 {t(E, "What's a bit?", "비트가 뭐?")}
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #cbd5e1", borderRadius: 10, padding: "12px 14px", marginBottom: 10, fontSize: 13, lineHeight: 1.7 }}>
            <div>
              {t(E, "Numbers can be written in ", "숫자는 ")}<b>{t(E, "binary", "2진수")}</b>{t(E, " — only 0 and 1, place values are powers of 2.",
                                                                                              " 로 쓸 수 있어요 — 0 과 1 만, 자리값은 2 의 제곱.")}
            </div>
            <div style={{ marginTop: 8, padding: 10, background: "#f8fafc", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.85 }}>
              <div>5 = <b style={{ color: "#16a34a" }}>1</b><b style={{ color: "#dc2626" }}>0</b><b style={{ color: "#16a34a" }}>1</b> {t(E, "(binary)", "(2진수)")} = 4 + 0 + 1</div>
              <div>3 = <b style={{ color: "#dc2626" }}>0</b><b style={{ color: "#16a34a" }}>1</b><b style={{ color: "#16a34a" }}>1</b> = 0 + 2 + 1</div>
              <div>8 = <b style={{ color: "#16a34a" }}>1</b><b style={{ color: "#dc2626" }}>0</b><b style={{ color: "#dc2626" }}>0</b><b style={{ color: "#dc2626" }}>0</b> = 8</div>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#475569" }}>
              {t(E, "Each 0/1 in the row is a ", "줄의 각 0/1 = ")}<b>{t(E, "bit", "비트 (bit)")}</b>
              {t(E, ". Position 0 is the rightmost.", ". 0 번째 자리는 가장 오른쪽.")}
            </div>
          </div>

          <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#7c2d12", lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#92400e", marginBottom: 4 }}>
              ⚙️ {t(E, "The shortcut: 1 << i", "유용한 표현: 1 << i")}
            </div>
            <div>
              {t(E, "1 << i", "1 << i")} {t(E, " means '1 shifted left i positions' — only the i-th bit is 1.",
                                                  "= '1 을 왼쪽으로 i 칸 밀기' — i 번째 비트만 1.")}
            </div>
            <div style={{ marginTop: 6, padding: 8, background: "#fff", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.8 }}>
              <div>1 &lt;&lt; 0  =    1   ({t(E, "binary", "")} 0001)</div>
              <div>1 &lt;&lt; 1  =    2   (0010)</div>
              <div>1 &lt;&lt; 2  =    4   (0100)</div>
              <div>1 &lt;&lt; 3  =    8   (1000)</div>
            </div>
          </div>
        </div>),
    },
    // Bit operators primer
    {
      type: "reveal",
      narr: t(E,
        "Step 2: three operators we need — AND (&), OR (|), and popcount.",
        "2 단계: 비트 연산자 3 개 — AND (&), OR (|), popcount."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0891b2", textAlign: "center", marginBottom: 10 }}>
            ⚙️ {t(E, "Bit operators", "비트 연산자")}
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #16a34a", borderRadius: 10, padding: "12px 14px", marginBottom: 8, fontSize: 13, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#15803d", marginBottom: 4 }}>
              & {t(E, "(AND) — keeps a bit ON only if BOTH inputs have it ON", "(AND) — 두 쪽 다 1 일 때만 결과가 1")}
            </div>
            <div style={{ padding: 8, background: "#f0fdf4", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7 }}>
              <div>  0110</div>
              <div>{`& `}1010</div>
              <div>──────</div>
              <div>  <b style={{ color: "#15803d" }}>0010</b></div>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #ea580c", borderRadius: 10, padding: "12px 14px", marginBottom: 8, fontSize: 13, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#9a3412", marginBottom: 4 }}>
              | {t(E, "(OR) — bit ON if EITHER input has it ON", "(OR) — 둘 중 하나라도 1 이면 결과가 1")}
            </div>
            <div style={{ padding: 8, background: "#fff7ed", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7 }}>
              <div>  0110</div>
              <div>{`| `}1010</div>
              <div>──────</div>
              <div>  <b style={{ color: "#9a3412" }}>1110</b></div>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: "#7c2d12" }}>
              {t(E, "Use ", "")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>x |= 1 &lt;&lt; i</code>
              {t(E, " to TURN ON bit i in x.", " 로 x 의 i 번째 비트를 켤 수 있음.")}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #7c3aed", borderRadius: 10, padding: "12px 14px", fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 4 }}>
              popcount {t(E, "— count how many bits are 1", "— 1 인 비트 개수 세기")}
            </div>
            <div style={{ padding: 8, background: "#faf5ff", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.85 }}>
              <div>{t(E, "In Python:", "Python 에선:")}</div>
              <div><code>bin(0b1011).count('1')</code> {t(E, "→ 3", "→ 3")}</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>{t(E, "(0b1011 has three 1s)", "(0b1011 에 1 이 3 개)")}</div>
            </div>
          </div>

          {/* Hands-on bit playground */}
          <BitsLab E={E} />
        </div>),
    },
    // Apply to this problem
    {
      type: "reveal",
      narr: t(E,
        "Step 3: apply bits to this problem. One column per Elsie card; bit i means 'card i beats this column'.",
        "3 단계: 비트를 이 문제에 적용. 컬럼마다 비트마스크 — i 번째 비트 = '카드 i 가 이 컬럼 카드 이김'."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0891b2", textAlign: "center", marginBottom: 10 }}>
            🎯 {t(E, "Apply bits to the problem", "비트를 이 문제에 적용")}
          </div>

          <div style={{ background: "#f0f9ff", border: "1.5px solid #7dd3fc", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, color: "#075985", lineHeight: 1.75, marginBottom: 10 }}>
            <div style={{ fontWeight: 800, color: "#0c4a6e", marginBottom: 4 }}>
              {t(E, "Idea: pack 'who beats this card' into one number.", "아이디어: '이 카드를 이기는 카드들' 을 숫자 하나에 담기.")}
            </div>
            <div>
              {t(E, "For each card c, store ", "카드 c 마다 ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>col[c]</code>
              {t(E, " — bit i is 1 iff card i beats card c. Build it once.",
                    " 저장 — i 번째 비트가 1 이면 카드 i 가 카드 c 이김. 한 번만 만듦.")}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #cbd5e1", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, marginBottom: 10 }}>
            <div style={{ fontWeight: 800, color: "#475569", marginBottom: 6 }}>
              {t(E, "For sample (cards 1-3, beats: 2→1, 1→3, 3→2):", "샘플 차트 (카드 1-3, 2→1 이김, 1→3, 3→2) 일 때:")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: "#1f2937", lineHeight: 1.85, paddingLeft: 4 }}>
              <div>col[0] {t(E, "(card 1)", "(카드 1)")} = 0b010 = 2  {t(E, "← only card 2 beats card 1", "← 카드 2 만 카드 1 이김")}</div>
              <div>col[1] {t(E, "(card 2)", "(카드 2)")} = 0b100 = 4  {t(E, "← only card 3 beats card 2", "← 카드 3 만 카드 2 이김")}</div>
              <div>col[2] {t(E, "(card 3)", "(카드 3)")} = 0b001 = 1  {t(E, "← only card 1 beats card 3", "← 카드 1 만 카드 3 이김")}</div>
            </div>
          </div>

          <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, color: "#15803d", lineHeight: 1.75 }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>
              {t(E, "Now a query is just AND + popcount:", "쿼리는 AND + popcount 한 번씩:")}
            </div>
            <div style={{ paddingLeft: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.85 }}>
              <div>col[s1] & col[s2] {t(E, "= bits ON only where the SAME card beats BOTH", "= '같은 카드가 두 컬럼 다 이김' 인 비트만 1")}</div>
              <div>{t(E, "popcount(...) = how many such cards =", "popcount(...) = 그런 카드 개수 = ")} <b>dom</b></div>
            </div>
            <div style={{ marginTop: 6, padding: "6px 8px", background: "#fff", borderRadius: 6 }}>
              {t(E, "Example: Elsie (1, 1) → col[0] & col[0] = 2 & 2 = 0b010. popcount = ",
                    "예: Elsie (1, 1) → col[0] & col[0] = 2 & 2 = 0b010. popcount = ")}<b>1</b>
              {t(E, " → dom = 1 (matches our earlier answer ✓).", " → dom = 1 (앞 답과 일치 ✓).")}
            </div>
          </div>

          <div style={{ marginTop: 10, marginBottom: 12, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.55 }}>
            💡 {t(E, "Why is this fast? Python's int handles 64 bits at a time, so AND on N-bit masks does ~N/64 chunks instead of N steps.",
                       "왜 빠른가? Python 정수가 한 번에 64 비트씩 처리 → N 비트 AND 는 N/64 chunk 만에 끝. N 단계가 N/64 가 됨.")}
          </div>

          {/* Hands-on col[s1] & col[s2] simulator */}
          <BitmaskColSim E={E} />
        </div>),
    },
    // Bonus: Python bitmask code (section 9)
    ...getHpsSections(E).slice(8, 9).map((sec, i) => ({
      type: "reveal",
      narr: t(E,
        "Now the bitmask code. Same algorithm, but with the bit tricks above.",
        "위 비트 트릭 적용한 코드. 알고리즘은 동일."),
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
