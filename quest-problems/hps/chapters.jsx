import { C, t } from "@/components/quest/theme";
import { getHpsSections, HpsCaseSimulator } from "./components";

export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "",
  "# beats[i][j] = '1' if symbol i beats symbol j, '0' otherwise",
  "beats = [input().strip() for _ in range(N)]",
  "",
  "def pair_beats(a, b, x):",
  "    # Bessie picks the better of {a, b} after seeing x",
  "    return beats[a][x] == '1' or beats[b][x] == '1'",
  "",
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1; s2 -= 1   # 1-indexed → 0-indexed",
  "",
  "    count = 0",
  "    for a in range(N):",
  "        for b in range(N):",
  "            # Bessie's pair (a, b) wins for sure iff she can",
  "            # beat WHICHEVER of Elsie's symbols she ends up facing",
  "            if pair_beats(a, b, s1) and pair_beats(a, b, s2):",
  "                count += 1",
  "    print(count)",
];

export function makeHpsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A Rock-Paper-Scissors variant — Bessie wants to count how many 2-card hands of hers always beat Elsie's hand.",
        "가위바위보 변형 — 베시가 엘시를 무조건 이기는 카드 2 장 조합이 몇 개인지 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>✊✋✌️</div>
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
                  {t(E, " (think Rock / Paper / Scissors, but maybe more). A chart tells us, for each pair of card types, which one beats which.",
                        " 가 있어요 (가위·바위·보처럼, 더 많을 수도). 어떤 카드가 어떤 카드를 이기는지 차트로 알려줘요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "How a round works: ", "한 판 진행: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "each cow puts down 2 cards face-up", "각 소가 카드 2 장을 뒤집어 놓아요")}</b>
                  {t(E, ", so all 4 cards are visible. Then each cow picks ONE of her own two to actually play — Bessie picks last (after seeing Elsie's pick).",
                        ". 4 장이 모두 보여요. 그 다음 각자 자기 2 장 중 1 장을 골라 실제로 내요 — 베시는 엘시가 무엇을 냈는지 보고 마지막에 골라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Elsie's hand is given M times. Count Bessie's hands that ",
                        "엘시 조합이 M 가지 주어져요. ")}
                  <b style={{ color: "#15803d" }}>{t(E, "always have an answer to BOTH of Elsie's cards", "엘시 두 카드 모두에 답이 있는 베시 조합")}</b>
                  {t(E, ".", " 의 개수를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sample input / output format — concrete RPS example
    {
      type: "reveal",
      narr: t(E,
        "A small concrete sample: 3 cards (rock/paper/scissors) and 1 query. Read the input top-to-bottom and you'll see exactly what each line means.",
        "작은 예시: 카드 3 종 (가위·바위·보), 쿼리 1 개. 입력을 위에서 아래로 읽으면 각 줄이 무슨 뜻인지 보여요."),
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
              🔍 {t(E, "Line by line", "한 줄씩")}
            </div>
            <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>3 1</code> — {t(E, "N = 3 cards, M = 1 Elsie query", "N = 3 종 카드, M = 1 개 엘시 쿼리")}</div>
            <div style={{ marginTop: 6 }}>
              {t(E, "Next 3 lines = beats chart. Line i has N digits; the j-th digit is 1 if card i beats card j (else 0).",
                    "다음 3 줄 = 승패 차트. i 번째 줄에 N 자리 — j 번째 자리가 1 이면 카드 i 가 카드 j 를 이김 (아니면 0).")}
            </div>
            <div style={{ marginLeft: 8, marginTop: 4, fontSize: 11, color: "#475569", fontFamily: "'JetBrains Mono',monospace" }}>
              <code>001</code> = {t(E, "card 1 (rock) beats card 3 (scissors)", "카드 1 (바위) 가 카드 3 (가위) 을 이김")}<br/>
              <code>100</code> = {t(E, "card 2 (paper) beats card 1 (rock)", "카드 2 (보) 가 카드 1 (바위) 를 이김")}<br/>
              <code>010</code> = {t(E, "card 3 (scissors) beats card 2 (paper)", "카드 3 (가위) 가 카드 2 (보) 를 이김")}
            </div>
            <div style={{ marginTop: 8 }}>
              {t(E, "Then M lines = Elsie's hands. ", "그 다음 M 줄 = 엘시의 hand. ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 3</code>{" "}
              {t(E, "= Elsie's hand is {rock, scissors}.", "= 엘시 hand 는 {바위, 가위}.")}
            </div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
              <b style={{ color: "#15803d" }}>{t(E, "Why answer = 2?", "왜 답이 2?")}</b>{" "}
              {t(E, "Bessie needs an answer to BOTH rock and scissors. Rock is beaten by paper; scissors is beaten by rock. So Bessie's hand must include {paper, rock} (in either order). The 2 winning hands are (paper, rock) and (rock, paper) — the answer counts ordered pairs.",
                    "베시는 바위와 가위 둘 다 답이 있어야 함. 바위는 보가 이김, 가위는 바위가 이김. 그러니까 베시 hand 는 {보, 바위} 여야 함 (순서 무관). 정답 hand 는 (보, 바위) 와 (바위, 보) 두 가지 — 정답은 ordered pair 로 카운트.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Interactive case-walk (was static 2-case cards)
    {
      type: "reveal",
      narr: t(E,
        "Walk both Elsie picks one at a time and see whether Bessie's hand has a counter for each. ▶ to step.",
        "엘시가 낼 수 있는 두 카드를 한 번에 하나씩 따라가요 — 각 경우에 베시한테 답이 있는지 봐요. ▶ 눌러서 진행."),
      content: (<HpsCaseSimulator E={E} />),
    },
    {
      type: "quiz",
      narr: t(E,
        "Bessie wins if for BOTH of Elsie's symbols, at least one of Bessie's symbols can beat it.\nShe picks optimally after seeing everything!", "베시가 이기려면: 엘시의 두 기호 모두에 대해, 베시의 기호 중 하나가 이길 수 있어야 해요. 모든 걸 본 후 최적으로 선택!"),
      question: t(E,
        "Bessie has (Rock, Paper). Elsie plays Scissors. Can Bessie win?",
        "베시가 (바위, 보)를 가짐. 엘시가 가위를 냄. 베시가 이길 수 있어요?"),
      options: [
        t(E, "Yes — pick Rock", "네 — 바위 선택"),
        t(E, "No — Scissors beats Paper", "아니 — 가위가 보를 이김"),
      ],
      correct: 0,
      explain: t(E, "Bessie picks Rock to beat Scissors! She has both options available.", "베시는 바위를 골라 가위를 이겨! 두 옵션 모두 가능해요."),
    },
    {
      type: "input",
      narr: t(E,
        "With N=3 (Rock/Paper/Scissors), Bessie has (Rock, Rock).\nCan she beat Scissors?\nYes.\nCan she beat Paper?\nNo.\nSo this pair does NOT guarantee a win against (Paper, Scissors).", "N=3 (가위바위보), 베시가 (바위, 바위).\n가위를 이길 수 있어요?\n네.\n보를 이길 수 있어요?\n아니.\n그래서 이 쌍은 (보, 가위)에 대해 승리를 보장하지 않아."),
      question: t(E,
        "N=3 standard RPS. How many of Bessie's 9 possible pairs (a,b) can beat BOTH Rock and Paper?",
        "N=3 표준 가위바위보. 베시의 9가지 가능한 쌍 (a,b) 중 바위와 보 모두를 이길 수 있는 것은?"),
      hint: t(E, "Need one symbol that beats Rock (Paper) and one that beats Paper (Scissors)", "바위를 이기는 기호(보)와 보를 이기는 기호(가위) 필요"),
      answer: 5,
    },
    {
      type: "sim",
      narr: t(E,
        "Pick Bessie's (a, b) and Elsie's (s1, s2). See if Bessie can guarantee a win.", "베시 (a, b), 엘시 (s1, s2) 골라서 베시가 승리 보장 가능한지 확인."),
    },
  ];
}

export function makeHpsCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Brute force: for each Elsie pair, try every (a, b) for Bessie.\nKey: pair_beats(a, b, x) — Bessie picks the better of a/b after seeing x.",
        "완전탐색: 엘시 쌍마다 베시의 모든 (a, b) 시도.\n핵심: pair_beats(a, b, x) — 베시는 x 본 후 a/b 중 더 나은 것 선택."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read beats matrix", "승패 차트 읽기"), code: "beats[i][j] = '1' if i beats j", color: "#059669" },
              { n: 2, label: t(E, "pair_beats helper", "헬퍼 함수"), code: "pair_beats(a, b, x) = beats[a][x]=='1' or beats[b][x]=='1'", color: "#0891b2" },
              { n: 3, label: t(E, "Per Elsie query", "엘시 쿼리마다"), code: "for a in N: for b in N: if pair_beats(a,b,s1) and pair_beats(a,b,s2): count++", color: "#dc2626" },
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
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "M queries × N² Bessie pairs", "M 쿼리 × N² 베시 쌍")}</div>
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
            ✅ {t(E, "TLE check — this one passes", "타임아웃 체크 — 이 문제는 통과")}
          </div>
          <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 14px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#15803d" }}>
              <div style={{ fontWeight: 800 }}>N</div>     <div>≤ 30 (symbols)</div>
              <div style={{ fontWeight: 800 }}>M</div>     <div>≤ 10⁵ (queries)</div>
              <div style={{ fontWeight: 800 }}>per query</div> <div>O(N²) = 900</div>
              <div style={{ fontWeight: 800 }}>total</div> <div>M · N² ≈ 10⁵ · 900 ≈ 10⁸</div>
              <div style={{ fontWeight: 800, color: "#16a34a" }}>판정</div>
              <div style={{ color: "#16a34a", fontWeight: 800 }}>{t(E, "Fits comfortably in 1s ✓", "1 초 안에 충분 ✓")}</div>
            </div>
          </div>
          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E, "Because N is tiny (≤30), the inner double loop over (a, b) is only 900 work per query. Brute force IS the final solution — no extra optimization needed.",
                    "N 이 작아서 (≤30) (a, b) 두 중첩 루프가 쿼리당 겨우 900 연산. 브루트포스가 곧 최종 답 — 추가 최적화 불필요.")}
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
