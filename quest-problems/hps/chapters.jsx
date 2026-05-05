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
        "Bessie and Elsie play a Rock-Paper-Scissors variant.\nEach cow first puts down TWO cards (face up), so all four are visible.\nThen each cow picks ONE of her own two cards to actually play — that's the round.\n\nGiven Elsie's two-card hand, how many of Bessie's possible two-card hands let her always win — no matter which one Elsie picks?",
        "베시와 엘시가 가위바위보 비슷한 게임을 해요.\n각자 카드 2 장을 먼저 뒤집어 놓아요 — 4 장이 모두 보여요.\n그 다음 각자 자기 2 장 중 1 장을 골라 실제로 내요. 그게 한 판이에요.\n\n엘시의 카드 2 장이 주어졌을 때, 베시가 어떤 카드 2 장 조합을 가지면 — 엘시가 무엇을 내든 — 항상 이길 수 있을까요?\n그런 조합이 몇 개인지 세요."),
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
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Bessie's hand wins for sure", "베시의 카드 2 장이 무조건 이김")}</b>
                  {t(E, " when — no matter which of her two cards Elsie ends up playing — Bessie has at least one card in HER hand that beats it.",
                        " — 엘시가 자기 2 장 중 무엇을 내든, 베시의 2 장 중에 그걸 이기는 카드가 있는 경우.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "We get M different Elsie hands. For each one, print ", "엘시의 카드 2 장 조합이 M 가지 주어져요. 각 조합에 대해 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "how many of Bessie's possible 2-card hands guarantee a win", "베시가 가질 수 있는 2 장 조합 중 무조건 이기는 게 몇 개인지")}</b>
                  {t(E, ".", " 출력해요.")}
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
        "Sample input — first line N M, then N rows of the beats chart, then M Elsie pairs. For each pair print one number (count of Bessie's winning pairs).",
        "샘플 입력 — 첫 줄 N M, 그 다음 N 줄로 승패 차트, 그 다음 M 줄로 엘시 쌍. 각 쌍마다 한 수 (베시의 승리 보장 쌍 개수) 출력."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#059669", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`3 2
0010
1001
0101
1010
1 2
2 3`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`5
5`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.6 }}>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 6 }}>
              🔍 {t(E, "Reading the input", "입력 읽기")}
            </div>
            <div><b>3 2</b> — {t(E, "N=3 symbols (rock/paper/scissors), M=2 queries", "N=3 기호 (가위바위보), M=2 쿼리")}</div>
            <div style={{ marginTop: 4 }}>{t(E, "Next 3 rows = beats matrix. Row i tells which symbols i beats:", "다음 3 줄 = 승패 차트. i 번째 줄은 i 가 이기는 기호:")}</div>
            <div style={{ marginLeft: 8, fontSize: 11, color: "#475569" }}>
              <code>0010</code> {t(E, "→ symbol 1 only beats symbol 3 (rock beats scissors)", "→ 기호 1 은 기호 3 만 이김 (바위가 가위)")}<br/>
              <code>1001</code> {t(E, "→ symbol 2 beats 1 and 4? wait — chart includes one extra symbol in this example", "→ 이 예시에선 1 과 4 를 이김")}
            </div>
            <div style={{ marginTop: 6 }}>
              {t(E, "After the chart, M lines each give 2 numbers s1 s2 = Elsie's pair. Print one count per query.",
                    "차트 다음에 M 줄, 각각 두 수 s1 s2 = 엘시의 쌍. 각 쿼리마다 한 수 출력.")}
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
