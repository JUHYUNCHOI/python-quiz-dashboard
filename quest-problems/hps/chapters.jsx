import { C, t } from "@/components/quest/theme";
import { getHpsSections } from "./components";

export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "",
  "# Read outcome chart (triangular)",
  "# result[i][j] = 'W','L','D' for symbol i vs j",
  "result = [['' for _ in range(N)] for _ in range(N)]",
  "for i in range(N):",
  "    row = input().split() if i > 0 else [input().strip()]",
  "    # Actually read as string characters",
  "    s = input() if i > 0 else 'D'",
  "    # Rebuild: result[i][j] for j <= i",
  "",
  "# Simpler: read full chart",
  "chart = []",
  "for i in range(N):",
  "    line = input().strip()",
  "    chart.append(line)",
  "",
  "def outcome(a, b):",
  "    if a == b: return 'D'",
  "    if a < b: return chart[b][a]  # reversed",
  "    return chart[a][b]",
  "",
  "# For each of Elsie's (s1,s2) pairs:",
  "# Bessie picks best of her (a,b) pair",
  "# Bessie wins if she can pick a or b that beats",
  "# whichever Elsie picks from s1,s2",
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1; s2 -= 1",
  "    count = 0",
  "    for a in range(N):",
  "        for b in range(N):",
  "            # Bessie has (a,b), Elsie has (s1,s2)",
  "            # Bessie wins if she can guarantee a win",
  "            # She picks after seeing Elsie's choice",
  "            can_beat_s1 = outcome(a,s1)=='W' or outcome(b,s1)=='W'",
  "            can_beat_s2 = outcome(a,s2)=='W' or outcome(b,s2)=='W'",
  "            if can_beat_s1 and can_beat_s2:",
  "                count += 1",
  "    print(count)",
];

export function makeHpsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A twist on Rock-Paper-Scissors!\nEach player shows TWO symbols, then picks one after seeing all four.\nHow many of Bessie's pairs guarantee a win?\n✊✋✌️", "가위바위보의 변형! 각 플레이어가 기호 2개를 보여주고, 4개를 다 본 후 하나를 선택. 베시의 어떤 쌍이 승리를 보장할까? ✊✋✌️"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>✊✋✌️</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Hoof Paper Scissors Minus One</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2025 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N symbols with win/lose/draw chart. Each player shows 2 symbols. After seeing all 4, each picks 1. Count Bessie's winning pairs!",
              "N개 기호와 승/패/무 차트. 각 플레이어가 2개를 보여줌. 4개를 다 본 후 1개 선택. 베시의 승리 쌍을 세자!")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Bessie wins if for BOTH of Elsie's symbols, at least one of Bessie's symbols can beat it.\nShe picks optimally after seeing everything!", "베시가 이기려면: 엘시의 두 기호 모두에 대해, 베시의 기호 중 하나가 이길 수 있어야 해. 모든 걸 본 후 최적으로 선택!"),
      question: t(E,
        "Bessie has (Rock, Paper). Elsie plays Scissors. Can Bessie win?",
        "베시가 (바위, 보)를 가짐. 엘시가 가위를 냄. 베시가 이길 수 있어?"),
      options: [
        t(E, "Yes — pick Rock", "네 — 바위 선택"),
        t(E, "No — Scissors beats Paper", "아니 — 가위가 보를 이김"),
      ],
      correct: 0,
      explain: t(E, "Bessie picks Rock to beat Scissors! She has both options available.", "베시는 바위를 골라 가위를 이겨! 두 옵션 모두 가능해."),
    },
    {
      type: "input",
      narr: t(E,
        "With N=3 (Rock/Paper/Scissors), Bessie has (Rock, Rock).\nCan she beat Scissors?\nYes.\nCan she beat Paper?\nNo.\nSo this pair does NOT guarantee a win against (Paper, Scissors).", "N=3 (가위바위보), 베시가 (바위, 바위).\n가위를 이길 수 있어?\n네.\n보를 이길 수 있어?\n아니.\n그래서 이 쌍은 (보, 가위)에 대해 승리를 보장하지 않아."),
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
    {
      type: "progressive",
      narr: t(E,
        "Now build the brute force step by step. Each section reveals one piece.", "완전탐색을 단계별로 만들어보자. 각 섹션마다 한 조각씩."),
      sections: getHpsSections(E),
    },
  ];
}
