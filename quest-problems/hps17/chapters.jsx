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
        "FJ plays Hoof-Paper-Scissors against Bessie for N rounds. Bessie's gesture each round is fixed and known in advance.\nFJ picks ONE gesture to start with, and is allowed to SWITCH to a different gesture at most ONCE during the game. Print the maximum number of rounds FJ can win.",
        "FJ가 베시(Bessie)와 가위바위보를 N라운드 해요. 매 라운드 베시가 무엇을 낼지는 미리 정해져 있어 알아요.\nFJ는 처음에 한 가지 제스처를 골라요. 그리고 게임 도중 다른 제스처로 딱 한 번까지 바꿀 수 있어요. FJ가 이길 수 있는 최대 라운드 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u270a"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Hoof, Paper, Scissors</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E, "Maximize FJ's wins given he can switch gestures at most ONCE.",
                    "FJ가 제스처를 딱 한 번까지 바꿀 수 있다고 할 때, 이기는 라운드 수를 최대로 만들어요.")}
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
                  {t(E, "FJ plays ", "FJ가 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N rounds of Hoof-Paper-Scissors", "N라운드 가위바위보")}</b>
                  {t(E, " against Bessie. Bessie's gestures are given as a list of H / P / S.",
                        "를 베시와 해요. 베시의 제스처는 H / P / S 로 라운드별로 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ chooses one gesture, and may ", "FJ는 처음에 한 제스처를 고르고, 게임 도중 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "switch to a different gesture at most ONCE", "다른 제스처로 딱 한 번까지 바꿀 수 있어요")}</b>
                  {t(E, " during the game.", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Win rules: H beats S, P beats H, S beats P.",
                        "승리 규칙: H는 S를 이기고, P는 H를 이기고, S는 P를 이겨요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  <b style={{ color: "#15803d" }}>{t(E, "Print the maximum number of rounds FJ can win", "FJ가 이길 수 있는 최대 라운드 수")}</b>
                  {t(E, " over the best choice of (first gesture, second gesture, switch round).",
                        "를 출력해요 — (첫 제스처, 두 번째 제스처, 바꾸는 시점) 조합 중 최선.")}
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
                <pre style={{ background: "#1e293b", color: "#f1f5f9", padding: 8, borderRadius: 6, margin: 0, fontSize: 12 }}>{`5\nP\nP\nH\nP\nS`}</pre>
              </div>
              <div>
                <div style={{ color: "#9a3412", fontWeight: 600, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
                <pre style={{ background: "#1e293b", color: "#f1f5f9", padding: 8, borderRadius: 6, margin: 0, fontSize: 12 }}>{`4`}</pre>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Walkthrough reveal
    {
      type: "reveal",
      narr: t(E,
        "Let's walk through the sample. Bessie plays P, P, H, P, S. If FJ plays S for rounds 1-4 (beating Bessie's P,P,H,P → wins on rounds 1, 2, 4) and then switches to H for round 5 (H beats S → win), FJ wins 4 rounds. That's the best he can do.",
        "샘플을 따라가 봐요. 베시는 P, P, H, P, S를 내요. FJ가 라운드 1~4에서 S를 내면 (베시의 P, P, H, P 중 P에 이기는 1, 2, 4 라운드 승리), 그 다음 라운드 5에서 H로 바꾸면 (H는 S를 이김 → 승리) — 총 4라운드 승리. 이게 최선이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              🔍 {t(E, "Sample walkthrough", "샘플 풀이")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              <div style={{ marginBottom: 6 }}>
                {t(E, "Bessie: ", "베시: ")}<b>P P H P S</b>
              </div>
              <div style={{ marginBottom: 6 }}>
                {t(E, "FJ chooses S first, then switches to H before round 5:",
                      "FJ는 처음에 S, 라운드 5 직전에 H로 바꿔요:")}
              </div>
              <div style={{ marginBottom: 8 }}>
                {t(E, "FJ:    ", "FJ:    ")}<b style={{ color: "#dc2626" }}>S S S S</b> | <b style={{ color: "#15803d" }}>H</b>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: C.dim, paddingLeft: 8 }}>
                <div>{t(E, "Round 1: S vs P → S beats P ✓", "라운드 1: S vs P → S가 P 이김 ✓")}</div>
                <div>{t(E, "Round 2: S vs P → S beats P ✓", "라운드 2: S vs P → S가 P 이김 ✓")}</div>
                <div>{t(E, "Round 3: S vs H → S loses ✗", "라운드 3: S vs H → S가 짐 ✗")}</div>
                <div>{t(E, "Round 4: S vs P → S beats P ✓", "라운드 4: S vs P → S가 P 이김 ✓")}</div>
                <div>{t(E, "Round 5: H vs S → H beats S ✓", "라운드 5: H vs S → H가 S 이김 ✓")}</div>
              </div>
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #93c5fd", fontWeight: 600, color: "#15803d" }}>
                {t(E, "Total wins = 4", "총 승수 = 4")}
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz — concept of 1-switch
    {
      type: "quiz",
      narr: t(E,
        "What if FJ never switches? He picks one gesture and uses it for all N rounds. How many gesture choices does he have?",
        "FJ가 한 번도 바꾸지 않으면? 한 제스처를 골라 N라운드 내내 그것만 내요. 몇 가지 선택이 있어요?"),
      question: t(E,
        "If FJ never switches, how many possible gesture choices does he have?",
        "FJ가 한 번도 안 바꾸면 가능한 제스처 선택은 몇 가지예요?"),
      options: [
        t(E, "1", "1"),
        t(E, "3 (H, P, or S)", "3 (H, P, S)"),
        t(E, "6", "6"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Without switching, FJ just picks one of {H, P, S} — 3 choices. With one switch allowed, we add: pick first gesture (3) × second gesture (3) × switch point (N+1 places) — and we take the best.",
        "맞아! 안 바꿀 때는 {H, P, S} 중 하나만 고르니까 3가지. 한 번 바꾸기까지 더하면: 첫 제스처 3 × 두 번째 제스처 3 × 바꾸는 시점 N+1 자리 — 그중 최선을 골라요."),
    },
    // 1-4: Input — manual computation
    {
      type: "input",
      narr: t(E,
        "Let's compute by hand. Bessie plays H, S, S. If FJ plays P for round 1 (P beats H ✓), then switches to H for rounds 2-3 (H beats S ✓✓), how many wins does FJ get?",
        "직접 계산해 봐요. 베시가 H, S, S를 내요. FJ가 라운드 1에 P (P가 H 이김 ✓), 그 다음 라운드 2~3에 H (H가 S 이김 ✓✓)를 내면, FJ는 몇 라운드 이겨요?"),
      question: t(E,
        "Bessie: H S S. FJ plays P then switches to H. How many wins?",
        "베시: H S S. FJ가 P 내고 H로 바꿔요. 몇 승?"),
      hint: t(E,
        "Round 1: P vs H → P beats H. Rounds 2,3: H vs S → H beats S. Add them up.",
        "라운드 1: P vs H → P가 H 이김. 라운드 2,3: H vs S → H가 S 이김. 다 더해요."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHps17Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "FJ can switch ONCE. So we try every (first gesture c1, second gesture c2, switch point k) — 3 × 3 × (N+1) combos. To count wins fast, prefix sums pre[i][c] = wins over rounds 0..i-1 if FJ always plays c. Then wins for split k with (c1, c2) = pre[k][c1] + (pre[N][c2] - pre[k][c2]). Take the max. Sections build it one piece at a time.",
        "FJ는 딱 한 번 바꿀 수 있어요. 그래서 (첫 제스처 c1, 두 번째 c2, 바꾸는 시점 k) 모두 시도 — 3 × 3 × (N+1)가지 조합. 빠르게 세려고 누적합 pre[i][c] = 라운드 0..i-1 동안 c만 냈을 때 승수를 미리 계산. 그러면 (c1, c2)로 k에서 바꾸는 승수 = pre[k][c1] + (pre[N][c2] - pre[k][c2]). 최댓값을 뽑아요. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getHps17Sections(E),
    },
  ];
}
