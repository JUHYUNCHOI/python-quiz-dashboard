import { C, t } from "@/components/quest/theme";
import { ChainSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLivestockCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Line up 8 cows to be lexicographically smallest while meeting every constraint.",
        "제약을 다 지키면서 소 8마리를 사전순으로 가장 앞서게 세워요."),
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
                "사전순으로 가장 앞선 배열을 출력해요. 못 만들면 'IMPOSSIBLE' 을 써요.")}
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
                  {t(E, " in a single row.",
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
    // 1-1b: 입출력 형식 + 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N first, then N constraint sentences.",
        "입력은 N 다음에 제약 문장이 N 줄로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of constraints", "— 제약 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>X must be milked beside Y</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The 8 cow names, one per line — the lexicographically smallest valid order.",
                  "소 이름을 한 줄에 하나씩, 8줄로 출력해요 (사전순으로 가장 앞선 배열).")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 7</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "a valid ordering is always guaranteed to exist", "가능한 배열이 항상 하나는 존재해요")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Visual sim — how constraints form chains
    {
      type: "reveal",
      narr: t(E,
        "Click '+ Add constraint' to see how a rule links two cows.",
        "'+ 제약 추가' 를 눌러 규칙이 두 소를 어떻게 잇는지 봐요."),
      content: <ChainSim E={E} />,
    },
    // 1-3: Predict — chain count after the sim
    {
      type: "quiz",
      narr: t(E,
        "From the sim above: 3 constraints linked Bella-Blue, Bella-Bessie, Buttercup-Sue.\nHow many separate groups (chains + lone cows) end up?",
        "제약은 Bella-Blue, Bella-Bessie, Buttercup-Sue 예요.\n그러면 그룹 (체인 + 외톨이) 이 몇 개 생길까요?"),
      question: t(E,
        "Total groups (chains + singletons)?",
        "그룹은 모두 몇 개일까요? (체인 + 외톨이)"),
      options: [
        t(E, "3", "3"),
        t(E, "5", "5"),
        t(E, "8", "8"),
      ],
      correct: 1,
      explain: t(E,
        "5 groups: chain [Blue-Bella-Bessie], chain [Buttercup-Sue], plus singletons Beatrice, Belinda, Betsy.",
        "그룹은 5 개예요.\n체인 [Blue-Bella-Bessie], 체인 [Buttercup-Sue], 그리고 외톨이 Beatrice·Belinda·Betsy 예요."),
    },
    // 1-4: Quiz (original 1-2)
    {
      type: "quiz",
      narr: t(E,
        "If there are 0 constraints, all 8 cows are free.\nThe lexicographically smallest ordering is simply alphabetical order!", "제약이 하나도 없으면 그냥 알파벳 순서가 답이에요."),
      question: t(E,
        "0 constraints, 8 cows. How many cows in the lineup?",
        "제약이 0 개이고 소는 8 마리예요. 줄에는 몇 마리가 설까요?"),
      options: [
        t(E, "6", "6"),
        t(E, "7", "7"),
        t(E, "8", "8"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! All 8 cows must appear in the lineup regardless of constraints.",
        "맞아요! 제약과 상관없이 8 마리가 모두 줄에 서야 해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "With 0 constraints, the answer is just alphabetical order.\nHow many cows are there in total?", "제약이 0 개면 답은 알파벳 순서예요. 소는 모두 몇 마리일까요?"),
      question: t(E,
        "How many cows total in Livestock Lineup?",
        "Livestock Lineup 에는 소가 모두 몇 마리일까요?"),
      hint: t(E,
        "Re-read the problem statement — how many cow names are listed?",
        "문제를 다시 읽어 봐요 — 이름이 적힌 소가 몇 마리예요?"),
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
      type: "livestock-codewalk",
      narr: t(E,
        "The full solution, start to finish — toggle Python ↔ C++ via the header.",
        "빠른 풀이를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
  ];
}
