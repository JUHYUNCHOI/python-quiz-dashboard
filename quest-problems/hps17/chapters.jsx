import { C, t } from "@/components/quest/theme";
import { getHps17Sections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHps17Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "We don't know what 1, 2, 3 mean — try every assignment.",
        "숫자 1, 2, 3 이 무슨 손 모양인지 몰라요. 다 해 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"✊"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Hoof, Paper, Scissors</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E, "Try every assignment of numbers 1, 2, 3 to (H, P, S) and output the max wins for cow 1.",
                    "숫자 1, 2, 3 을 (H, P, S) 에 짝지어 보고 cow 1 이 가장 많이 이기는 횟수를 출력해요.")}
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
                  {t(E, "Two cows play ", "두 소가 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N rounds of Hoof-Paper-Scissors", "N라운드 가위바위보")}</b>
                  {t(E, ". Each round both cows show a gesture labeled ",
                        " 를 해요. 매 라운드 두 소 모두 라벨이 ")}
                  <b>1, 2, 3</b>
                  {t(E, ".", " 중 하나인 손 모양을 내요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "We don't know which number is Hoof, Paper, or Scissors", "어느 숫자가 H, P, S 인지 몰라요")}</b>
                  {t(E, " — try every possible assignment.", ". 그래서 짝짓는 방법을 모두 해 봐요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Win rules: H beats S, P beats H, S beats P.",
                        "H 는 S 를 이기고, P 는 H 를 이기고, S 는 P 를 이겨요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  <b style={{ color: "#15803d" }}>{t(E, "Print the maximum wins cow 1 can get", "cow 1 의 최대 승수")}</b>
                  {t(E, " over all 6 ways to assign {1,2,3} to (H, P, S).",
                        "를 출력해요. 짝짓는 방법 6 가지 중에서 가장 좋은 것을 고르면 돼요.")}
                </div>
              </div>
            </div>
          </div>

          {/* Sample I/O box */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 8 }}>
              📥 {t(E, "Sample Input / Output", "샘플 입출력")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, color: C.text }}>
              <div>
                <div style={{ color: "#9a3412", fontWeight: 600, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
                <pre style={{ background: "#1e293b", color: "#f1f5f9", padding: 8, borderRadius: 6, margin: 0, fontSize: 12 }}>{`5\n1 2\n2 3\n1 3\n3 1\n3 1`}</pre>
              </div>
              <div>
                <div style={{ color: "#9a3412", fontWeight: 600, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
                <pre style={{ background: "#1e293b", color: "#f1f5f9", padding: 8, borderRadius: 6, margin: 0, fontSize: 12 }}>{`4`}</pre>
              </div>
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.5 }}>
              {t(E, "Each line: cow 1 gesture, cow 2 gesture. First line N = number of rounds.",
                    "첫 줄의 N 은 라운드 수예요. 그다음 줄마다 cow 1 과 cow 2 의 손 모양이 나와요.")}
            </div>
          </div>
        </div>),
    },
    // 1-2: Walkthrough — one assignment example
    {
      type: "reveal",
      narr: t(E,
        "Try 1=H, 2=P, 3=S and count the wins.",
        "1 = H, 2 = P, 3 = S 로 정해 놓고 한 번 세어 봐요."),
      content: (() => {
        // Try assignment: 1=H, 2=P, 3=S on input rounds (1,2),(2,3),(1,3),(3,1),(3,1)
        // Round 1: H vs P → H loses (P beats H)
        // Round 2: P vs S → P loses (S beats P)
        // Round 3: H vs S → H wins (H beats S) ✓
        // Round 4: S vs H → S loses (H beats S)
        // Round 5: S vs H → S loses (H beats S)
        // wins = 1
        // Try assignment: 1=S, 2=H, 3=P
        // Round 1: S vs H → S loses
        // Round 2: H vs P → H loses
        // Round 3: S vs P → S wins ✓
        // Round 4: P vs S → P loses
        // Round 5: P vs S → P loses
        // wins = 1
        // Try assignment: 1=P, 2=S, 3=H
        // Round 1: P vs S → P loses
        // Round 2: S vs H → S loses
        // Round 3: P vs H → P wins ✓
        // Round 4: H vs P → H loses
        // Round 5: H vs P → H loses
        // wins = 1
        // Try assignment: 1=H, 2=S, 3=P
        // Round 1: H vs S → H wins ✓
        // Round 2: S vs P → S wins ✓
        // Round 3: H vs P → H loses
        // Round 4: P vs H → P wins ✓
        // Round 5: P vs H → P wins ✓
        // wins = 4 ← this is the max
        const trace = [
          { r: 1, a: 1, b: 2, ag: "H", bg: "S", win: true },
          { r: 2, a: 2, b: 3, ag: "S", bg: "P", win: true },
          { r: 3, a: 1, b: 3, ag: "H", bg: "P", win: false },
          { r: 4, a: 3, b: 1, ag: "P", bg: "H", win: true },
          { r: 5, a: 3, b: 1, ag: "P", bg: "H", win: true },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 6 }}>
                🔍 {t(E, "Try one of the 6 assignments — best case: 1=H, 2=S, 3=P", "6 가지 중 하나로 해 봐요 (가장 좋은 짝: 1=H, 2=S, 3=P)")}
              </div>
              <div style={{ fontSize: 12, color: C.dim, marginBottom: 8, lineHeight: 1.6 }}>
                {t(E,
                  "Translate each number to its gesture, then apply H>S, P>H, S>P.",
                  "숫자를 손 모양으로 바꾼 다음 H>S, P>H, S>P 규칙으로 따져 봐요.")}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "30px 1fr 1fr 70px", gap: "4px 8px", fontSize: 12, alignItems: "center" }}>
                <div style={{ fontWeight: 600, color: "#1e3a8a" }}>r</div>
                <div style={{ fontWeight: 600, color: "#1e3a8a" }}>{t(E, "input (a, b)", "입력 (a, b)")}</div>
                <div style={{ fontWeight: 600, color: "#1e3a8a" }}>{t(E, "as gesture", "손 모양으로")}</div>
                <div style={{ fontWeight: 600, color: "#1e3a8a", textAlign: "right" }}>{t(E, "cow1 win?", "cow1 승?")}</div>
                {trace.map((row) => (
                  <div key={row.r} style={{ display: "contents" }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: "#7c3aed" }}>{row.r}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>{row.a}, {row.b}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                      <b style={{ color: "#2563eb" }}>{row.ag}</b> vs <b>{row.bg}</b>
                    </div>
                    <div style={{ textAlign: "right", fontWeight: 700, color: row.win ? "#15803d" : "#9ca3af" }}>
                      {row.win ? "✓" : "—"}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #93c5fd", fontWeight: 600, color: "#15803d" }}>
                {t(E, "Wins for this assignment = 4 → check other 5 assignments, max is the answer.",
                      "이렇게 짝지으면 4 번 이겨요. 나머지 5 가지도 세어 보고 가장 큰 값이 답이에요.")}
              </div>
            </div>
          </div>
        );
      })(),
    },
    // 1-3: Quiz — how many assignments
    {
      type: "quiz",
      narr: t(E,
        "How many distinct ways can we assign {1, 2, 3} to (H, P, S)? Just one-to-one mappings.",
        "1, 2, 3 을 H, P, S 에 하나씩 짝지으면 몇 가지일까요?"),
      question: t(E,
        "Number of one-to-one assignments of {1, 2, 3} to (H, P, S)?",
        "1, 2, 3 을 H, P, S 에 하나씩 짝짓는 방법은 몇 가지일까요?"),
      options: [
        t(E, "3", "3"),
        t(E, "6 (3! permutations)", "6 (3! 순열)"),
        t(E, "9 (3 × 3)", "9 (3 × 3)"),
      ],
      correct: 1,
      explain: t(E,
        "Right! 3! = 6 permutations. Tiny enough to try them all and pick the best — that's brute force on the assignment.",
        "정답이에요! 3! = 6 가지 순열이에요.\n6 가지밖에 안 되니까 완전탐색으로 다 해 보고 제일 좋은 것을 고르면 돼요."),
    },
    // 1-4: Input — single assignment computation
    {
      type: "input",
      narr: t(E,
        "Quick hand calc. Rounds (1,2), (2,3), (3,1). Try assignment 1=H, 2=S, 3=P. Walk through and count cow 1's wins.",
        "1=H, 2=S, 3=P 로 놓고 cow 1 이 몇 번 이기는지 세어 봐요."),
      question: t(E,
        "Rounds (1,2),(2,3),(3,1) with 1=H, 2=S, 3=P. How many wins for cow 1?",
        "라운드가 (1,2), (2,3), (3,1) 이고 1=H, 2=S, 3=P 예요. cow 1 은 몇 번 이길까요?"),
      hint: t(E,
        "R1: H vs S → H wins. R2: S vs P → S wins. R3: P vs H → P wins. All three.",
        "1 라운드는 H 와 S 라서 H 가 이겨요.\n2 라운드는 S 와 P 라서 S 가 이겨요.\n3 라운드는 P 와 H 라서 P 가 이겨요."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (1 step)
   ═══════════════════════════════════════════════════════════════ */
export function makeHps17Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Try all 6 assignments and take the highest win count.",
        "6 가지 짝을 모두 세어 보고 가장 큰 승수를 뽑아요."),
      sections: getHps17Sections(E),
    },
  ];
}
