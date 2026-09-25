import { C, t } from "@/components/quest/theme";
import { Photoshoot2SwapSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhoto2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie has N cows in a current order and a target order; the only move is shifting one cow farther LEFT. Print the MINIMUM number of moves.",
        "현재 줄을 목표 순서로 만드는 가장 적은 이동 횟수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📷"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Photoshoot 2</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2022 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of move-left operations to transform the current order into the target.",
                "현재 줄을 목표 순서로 만들려면 소를 왼쪽으로 최소 몇 번 옮겨야 할까요? 그 횟수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has ", "Bessie에게 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "N cows in a current line and a target order", "N 마리 소의 현재 줄과 목표 순서")}</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One move: pick a cow and ", "한 번의 동작: 소를 골라 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "move her to any position farther LEFT", "줄에서 더 왼쪽 어디든 옮기기")}</b>
                  {t(E, " in the line.", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of moves to reach the target order", "목표 순서에 도달하기 위한 최소 동작 수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, usaco.org cpid=1204 직접 확인) — 시즌 표준화 (photoshoot25 형태)
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N, then the current order, then the target order.",
        "입력은 N, 그다음 현재 줄, 그다음 목표 줄이에요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of cows", "— 소의 마릿수")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>a1 a2 ... aN</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— current order, left to right", "— 현재 줄, 왼쪽부터")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>b1 b2 ... bN</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— target order, left to right", "— 목표 줄, 왼쪽부터")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: the minimum number of move-left operations to reach the target order.",
                  "한 줄: 목표 줄을 만드는 데 필요한 최소 왼쪽 이동 횟수.")}
            </div>
          </div>
          {/* 제약 (USACO 원문) */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 10⁵ (= 100,000)</div>
            </div>
          </div>
        </div>),
    },
    // 1-1c: Interactive walk-through sim
    {
      type: "reveal",
      narr: t(E,
        "Walk the TARGET order left→right, tracking the largest current-position seen — any cow below that max must move LEFT.",
        "목표 순서를 왼쪽부터 훑으면서 언제 옮겨야 하는지 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 10, textAlign: "center" }}>
            {t(E,
              "Example: current = [3, 1, 4, 2], target = [1, 2, 3, 4]. Press NEXT to step through.",
              "예시: 현재 = [3, 1, 4, 2], 목표 = [1, 2, 3, 4]. 다음 버튼으로 한 단계씩 진행해요.")}
          </div>
          <Photoshoot2SwapSim E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Current: [2,1], Target: [1,2]. Cow 1 needs to move left past cow 2. How many moves?", "소1 을 소2 왼쪽으로 옮기려면 몇 번 움직여야 할까요?"),
      question: t(E,
        "[2,1] -> [1,2]. How many moves?",
        "[2,1] 을 [1,2] 로 만들려면 몇 번 옮겨야 할까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "0", "0"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Move cow 1 to the left. Only 1 move needed.",
        "맞아요! 소 1 을 왼쪽으로 옮기면 돼요. 한 번이면 충분해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Current: [2,1], Target: [1,2]. How many moves to rearrange?", "[2,1] 을 [1,2] 로 만들려면 몇 번 옮겨야 할까요?"),
      question: t(E,
        "[2,1] -> [1,2]. Min moves?",
        "[2,1] 을 [1,2] 로 만드는 최소 이동 횟수는 몇 번일까요?"),
      hint: t(E,
        "Count cows that are out of place relative to the target.",
        "목표와 견줘서 자리가 어긋난 소를 세어 보세요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhoto2Ch2(E, lang = "py") {
  return [
    // 2-1: CodeWalk — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14).
    {
      type: "opt-codewalk",
      narr: t(E,
        "The solution, start to finish — toggle Python ↔ C++ via the header.",
        "풀이를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
  ];
}
