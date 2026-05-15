import { C, t } from "@/components/quest/theme";
import { getLivestockSections, ChainSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLivestockCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has 8 named cows (Beatrice, Belinda, Bella, Bessie, Betsy, Blue, Buttercup, Sue). He wants to line them up with N constraints — each constraint says \"cow X must be ADJACENT to cow Y\".\nPrint the LEXICOGRAPHICALLY SMALLEST valid lineup, or 'IMPOSSIBLE'.",
        "FJ 에게 이름이 정해진 8마리 소 (Beatrice, Belinda, Bella, Bessie, Betsy, Blue, Buttercup, Sue) 가 있어요. N개의 제약 — 각각 \"X 와 Y 는 옆에 있어야 함\" — 을 모두 만족하는 한 줄 배열을 만들어요.\n사전순으로 가장 작은 유효 배열을 출력해요. 불가능하면 'IMPOSSIBLE'."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🐄"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Livestock Lineup</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2019 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output the lexicographically smallest valid lineup, or 'IMPOSSIBLE'.",
                "사전순으로 가장 작은 유효 배열을 출력. 불가능하면 'IMPOSSIBLE'.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Line up FJ's ", "FJ 의 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "8 named cows", "이름 있는 8마리 소")}</b>
                  {t(E, " (Beatrice, Belinda, Bella, Bessie, Betsy, Blue, Buttercup, Sue) in a single row.",
                        " 를 한 줄로 세워요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N constraints", "N 개의 제약")}</b>
                  {t(E, " of the form \"cow X must be adjacent to cow Y\".",
                        " 이 있어요 — 각각 \"X 와 Y 는 옆에 있어야 함\".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "lexicographically smallest valid lineup", "사전순으로 가장 작은 유효 배열")}</b>
                  {t(E, ", or 'IMPOSSIBLE' if none exists.", " 을 출력해요. 불가능하면 'IMPOSSIBLE'.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Visual sim — how constraints form chains
    {
      type: "reveal",
      narr: t(E,
        "Click '+ Add constraint' to watch each adjacency rule connect two cows. Linked cows form a chain; free cows stay alone. Then build the final lineup alphabetically.",
        "'+ 제약 추가' 를 눌러서 각 인접 규칙이 두 소를 어떻게 잇는지 봐요. 연결된 소는 체인, 외톨이는 그대로. 마지막에 알파벳 순으로 줄을 만들어요."),
      content: <ChainSim E={E} />,
    },
    // 1-3: Predict — chain count after the sim
    {
      type: "quiz",
      narr: t(E,
        "From the sim above: 3 constraints linked Bella-Blue, Bella-Bessie, Buttercup-Sue.\nHow many separate groups (chains + lone cows) end up?",
        "위 시뮬레이션에서 제약 3개: Bella-Blue, Bella-Bessie, Buttercup-Sue.\n결국 몇 개의 그룹 (체인 + 외톨이) 이 생겼나요?"),
      question: t(E,
        "Total groups (chains + singletons)?",
        "총 그룹 수 (체인 + 외톨이)?"),
      options: [
        t(E, "3", "3"),
        t(E, "5", "5"),
        t(E, "8", "8"),
      ],
      correct: 1,
      explain: t(E,
        "5 groups: chain [Blue-Bella-Bessie], chain [Buttercup-Sue], plus singletons Beatrice, Belinda, Betsy.",
        "5개 그룹: 체인 [Blue-Bella-Bessie], 체인 [Buttercup-Sue], 그리고 외톨이 Beatrice, Belinda, Betsy."),
    },
    // 1-4: Quiz (original 1-2)
    {
      type: "quiz",
      narr: t(E,
        "If there are 0 constraints, all 8 cows are free.\nThe lexicographically smallest ordering is simply alphabetical order!", "조건이 0개이면 8마리 소 모두 자유예요. 사전순 최소 순서는 단순히 알파벳 순서!"),
      question: t(E,
        "0 constraints, 8 cows. How many cows in the lineup?",
        "조건 0개, 소 8마리. 줄에 소가 몇 마리?"),
      options: [
        t(E, "6", "6"),
        t(E, "7", "7"),
        t(E, "8", "8"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! All 8 cows must appear in the lineup regardless of constraints.",
        "정답! 조건과 상관없이 모든 8마리 소가 줄에 나와야 해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "With 0 constraints, the answer is just alphabetical order.\nHow many cows are there in total?", "조건 0개이면 답은 알파벳 순서. 총 소는 몇 마리?"),
      question: t(E,
        "How many cows total in Livestock Lineup?",
        "Livestock Lineup에서 총 소는 몇 마리?"),
      hint: t(E,
        "Re-read the problem statement — how many cow names are listed?",
        "문제를 다시 읽어 봐 — 이름이 적힌 소가 몇 마리?"),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLivestockCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Each adjacency constraint = an edge. The constraint graph has max degree 2, so it's a set of CHAINS. Sort cows alphabetically, then for each unvisited chain endpoint (or alone cow), output the chain in order. Sections build it one piece at a time.",
        "각 인접 제약 = 간선. 제약 그래프는 최대 차수 2 라 체인들의 집합. 소를 알파벳 순 정렬 후, 미방문 체인 끝점 (또는 외톨이) 부터 체인 출력. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getLivestockSections(E),
    },
  ];
}
