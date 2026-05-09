import { C, t } from "@/components/quest/theme";
import { getMooHuntSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "from collections import Counter",
  "",
  "N, K = map(int, input().split())",
  "",
  "# Group identical moves so duplicates aren't recounted.",
  "cnt = Counter()",
  "for _ in range(K):",
  "    x, y, z = map(int, input().split())",
  "    cnt[(x - 1, y - 1, z - 1)] += 1",
  "triples = list(cnt.items())",
  "",
  "best = -1",
  "ways = 0",
  "",
  "# bit i = 1 means cell i+1 is 'M', bit i = 0 means 'O'.",
  "for b in range(1 << N):",
  "    score = 0",
  "    for (x, y, z), c in triples:",
  "        if (b >> x) & 1 and not ((b >> y) & 1) and not ((b >> z) & 1):",
  "            score += c",
  "    if score > best:",
  "        best = score",
  "        ways = 1",
  "    elif score == best:",
  "        ways += 1",
  "",
  "print(best, ways)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeMooHuntCh1 (5 steps: reveal / reveal / reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeMooHuntCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "Bessie has a line of N cells, each holding 'M' or 'O'. She does K taps — each tap picks 3 cells. She scores 1 if those 3 cells spell 'MOO' in order. Find the highest score reachable, and how many boards reach it.",
        "베시는 N 칸짜리 한 줄을 가지고 있어. 각 칸은 'M' 또는 'O'. K 번의 탭을 하는데 매번 3 칸을 골라. 그 3 칸이 순서대로 'MOO' 면 1 점. 도달 가능한 최고 점수와, 그 점수에 도달하는 보드 개수를 구해."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🐄"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Moo Hunt</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2026 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Find the highest score any board can reach, and how many boards reach it.",
                "어떤 보드가 받을 수 있는 최고 점수와, 그 점수에 도달하는 보드의 개수를 구해.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A row of ", "한 줄에 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N cells (3 ≤ N ≤ 20)", "N 칸 (3 ≤ N ≤ 20)")}</b>
                  {t(E, " — each one is 'M' or 'O'.", " — 각각 'M' 또는 'O'.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie does ", "베시는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "K moves", "K 번의 무브")}</b>
                  {t(E, " (1 ≤ K ≤ 200,000). Each move taps three distinct cells (x, y, z) — order matters.",
                        " (1 ≤ K ≤ 200,000) 를 해. 매 무브는 서로 다른 세 칸 (x, y, z) 를 순서대로 탭 — 순서 중요!")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She scores when cell ", "득점 조건: 칸 ")}
                  <b style={{ color: "#dc2626" }}>x</b>
                  {t(E, " = 'M', cell ", " = 'M', 칸 ")}
                  <b style={{ color: "#dc2626" }}>y</b>
                  {t(E, " = 'O', cell ", " = 'O', 칸 ")}
                  <b style={{ color: "#dc2626" }}>z</b>
                  {t(E, " = 'O' — spelling 'MOO'.", " = 'O' — 'MOO' 가 되도록.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Output: max score across all boards, then # of boards that reach it.",
                        "출력: 모든 보드 중 최고 점수, 그리고 그 점수에 도달하는 보드 개수.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Look at sample 1: N=5 cells, K=6 moves. Two boards (MOOOM and MOOMM) both score 4 — the answer is '4 2'.",
        "샘플 1 을 봐: N=5 칸, K=6 무브. 보드 MOOOM 과 MOOMM 둘 다 4 점 — 답은 '4 2'."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
            🧪 {t(E, "Sample 1", "샘플 1")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5 }}>
              <div style={{ color: "#94a3b8", marginBottom: 4 }}>Input</div>
              <div>5 6</div>
              <div>1 2 3</div>
              <div>1 2 3</div>
              <div>1 3 5</div>
              <div>2 3 4</div>
              <div>5 3 2</div>
              <div>5 2 3</div>
            </div>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5 }}>
              <div style={{ color: "#94a3b8", marginBottom: 4 }}>Output</div>
              <div>4 2</div>
            </div>
          </div>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: 12, fontSize: 12, color: "#7f1d1d", lineHeight: 1.6 }}>
            {t(E, "Two boards reach the max score of 4:", "최고 점수 4 에 도달하는 보드는 두 가지:")}
            <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#dc2626" }}>
              MOOOM &nbsp; · &nbsp; MOOMM
            </div>
          </div>
        </div>),
    },
    // 1-3: Walkthrough on MOOOM
    {
      type: "reveal",
      narr: t(E,
        "Why does board MOOOM score 4? Let's walk each move on it. M = 'M', O = 'O'. A move (x,y,z) scores when cell x is M and cells y,z are O.",
        "보드 MOOOM 이 왜 4 점일까? 무브 하나하나 따라가 보자. 무브 (x,y,z) 는 칸 x 가 M, 칸 y, z 가 O 일 때 득점."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
            🚶 {t(E, "Walking moves on board ", "보드 ")}<span style={{ fontFamily: "monospace", color: "#dc2626" }}>MOOOM</span>
          </div>
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#7f1d1d" }}>
            <div>{t(E, "Cell:  1  2  3  4  5", "칸:    1  2  3  4  5")}</div>
            <div>{t(E, "Char:  M  O  O  O  M", "문자:  M  O  O  O  M")}</div>
          </div>
          <table style={{ width: "100%", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fef2f2", color: "#7f1d1d" }}>
                <th style={{ padding: "6px 8px", textAlign: "left" }}>{t(E, "Move", "무브")}</th>
                <th style={{ padding: "6px 8px", textAlign: "left" }}>{t(E, "Check", "검사")}</th>
                <th style={{ padding: "6px 8px", textAlign: "center" }}>{t(E, "Score?", "득점?")}</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["(1,2,3)", "M·O·O", "✅ +1"],
                ["(1,2,3)", "M·O·O", "✅ +1"],
                ["(1,3,5)", "M·O·M", "❌"],
                ["(2,3,4)", "O·O·O", "❌"],
                ["(5,3,2)", "M·O·O", "✅ +1"],
                ["(5,2,3)", "M·O·O", "✅ +1"],
              ].map(([m, c, s], i) => (
                <tr key={i} style={{ borderTop: "1px solid #fee2e2" }}>
                  <td style={{ padding: "6px 8px", color: "#dc2626" }}>{m}</td>
                  <td style={{ padding: "6px 8px", color: C.text }}>{c}</td>
                  <td style={{ padding: "6px 8px", textAlign: "center" }}>{s}</td>
                </tr>
              ))}
              <tr style={{ borderTop: "2px solid #dc2626", background: "#fef2f2" }}>
                <td colSpan={2} style={{ padding: "8px", fontWeight: 700, color: "#7f1d1d" }}>{t(E, "Total", "합계")}</td>
                <td style={{ padding: "8px", textAlign: "center", fontWeight: 700, color: "#dc2626" }}>4</td>
              </tr>
            </tbody>
          </table>
        </div>),
    },
    // 1-4: Quiz - bitmask insight
    {
      type: "quiz",
      narr: t(E,
        "Each cell is one of two values (M or O). With N ≤ 20 cells, how many possible boards are there in total?",
        "각 칸은 두 값 중 하나 (M 또는 O). N ≤ 20 칸일 때 가능한 보드는 총 몇 개?"),
      question: t(E,
        "How many distinct boards exist when N ≤ 20?",
        "N ≤ 20 일 때 서로 다른 보드는 몇 개?"),
      options: [
        t(E, "About 1,000,000 (2^N) — small enough to try all", "약 100만 (2^N) — 전부 시도 가능"),
        t(E, "About N! — way too many to enumerate", "약 N! — 너무 많아 열거 불가"),
      ],
      correct: 0,
      explain: t(E,
        "Right! 2^20 ≈ 1M. Each cell is M or O — that's a binary choice, perfect for a bitmask. We can try every board.",
        "맞아! 2^20 ≈ 100 만. 각 칸이 M/O 이진 선택이라 비트마스크로 표현. 전부 시도해 볼 수 있어."),
    },
    // 1-5: NumInput - count distinct triples to dedup
    {
      type: "input",
      narr: t(E,
        "K can be up to 200,000, but the same triple (x,y,z) can repeat. How many distinct ordered triples are possible when N = 20?",
        "K 는 최대 20 만이지만 같은 (x,y,z) 가 반복될 수 있어. N = 20 일 때 서로 다른 순서 있는 삼중쌍은 몇 개?"),
      question: t(E,
        "When N = 20, count distinct ordered triples (x, y, z) with x, y, z all different. Answer = ?",
        "N = 20 일 때 x, y, z 가 모두 다른 순서 있는 (x, y, z) 의 개수 = ?"),
      hint: t(E,
        "Pick x first, then y, then z — each from a shrinking pool.",
        "x 를 먼저, 그 다음 y, 그 다음 z 를 골라봐 — 풀이 줄어들지."),
      answer: 6840,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeMooHuntCh2 (1 step: progressive)
   ═══════════════════════════════════════════════════════════════ */
export function makeMooHuntCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Build the solution in three sections: group moves, try every board with a bitmask, print best & count.",
        "세 단계로 코드를 쌓아: 무브 묶기, 비트마스크로 모든 보드 시도, 최고 점수와 보드 개수 출력."),
      sections: getMooHuntSections(E),
    },
  ];
}
