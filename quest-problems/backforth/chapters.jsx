import { C, t } from "@/components/quest/theme";
import { getBackForthSections, BackForthStateTreeSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBackForthCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two barns each have 10 buckets of milk (1000 gallons total per barn). Over 4 days, FJ and his sister alternate carrying ONE bucket between barns: day 1 FJ moves one from barn 1 → 2, day 2 sister moves one from barn 2 → 1, day 3 FJ again, day 4 sister.\nCount the number of DISTINCT possible total milk amounts in barn 1 after the 4 days.",
        "두 헛간에 각각 10개의 우유 양동이가 있어요 (헛간당 총 1000 갤런). 4일 동안 FJ 와 동생이 번갈아 양동이를 1개씩 옮겨요. 1일차 FJ 가 헛간 1 → 2 로 1개, 2일차 동생이 헛간 2 → 1 로 1개, 3일차 FJ, 4일차 동생.\n4일이 끝났을 때 헛간 1 에 들어 있을 수 있는 우유 총량의 서로 다른 값이 몇 가지인지 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔄"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Back and Forth</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2018 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of distinct possible total milk amounts in barn 1 after 4 days of alternating bucket transfers.",
                "4 일간 양동이 왕복 후 헛간 1 의 가능한 우유 총량 (서로 다른 값) 개수를 출력.")}
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
                  {t(E, "Two barns each have ", "두 헛간에 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "10 buckets of milk", "각 10개의 우유 양동이")}</b>
                  {t(E, " (1000 gallons total per barn). Each bucket has its own amount.",
                        " 가 있어요 (헛간당 총 1000 갤런). 양동이마다 양이 정해져 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Over ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "4 days, FJ and his sister alternate", "4일 동안 FJ 와 동생이 번갈아")}</b>
                  {t(E, ": day 1 FJ moves a bucket 1→2, day 2 sister moves one 2→1, day 3 FJ, day 4 sister.",
                        ": 1일차 FJ 가 양동이 1개 1→2, 2일차 동생이 1개 2→1, 3일차 FJ, 4일차 동생.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of distinct possible total milk amounts in barn 1 after 4 days", "4일 후 헛간 1 의 가능한 우유 총량 (서로 다른 값) 의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Imagine all buckets are the same size.  Walk through 4 days mentally — what could change?",
        "모든 양동이가 같은 크기라고 상상. 4 일을 머릿속으로 따라가 봐 — 뭐가 변할 수 있어?"),
      question: t(E,
        "All buckets same size s. After 4 days of back and forth, how many distinct outcomes for barn 1?",
        "모든 양동이 크기 같으면 s. 4일간 왕복 후 헛간 1의 고유 결과 수?"),
      options: [
        t(E, "1 - always back to 1000", "1 - 항상 1000으로 돌아와"),
        t(E, "4 - one per day", "4 - 하루에 하나"),
        t(E, "10 - one per bucket", "10 - 양동이당 하나"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! If all buckets are identical, every transfer moves the same amount. Barn 1 always ends at 1000. Only 1 distinct outcome.",
        "맞아! 모든 양동이가 동일하면 매번 같은 양을 옮겨. 헛간 1은 항상 1000으로 끝나. 고유 결과 1개."),
    },
    // 1-3: State-tree sim (toy version, 3 buckets, 1-2 days)
    {
      type: "tree",
      narr: t(E,
        "Before coding — *play* with the state tree.  Change the buckets, pick day-1, watch how every day-2 choice fans out.  The set at the bottom collects the distinct Barn 1 totals.",
        "코딩 전에 — 상태 트리를 직접 *놀려* 봐. 양동이 값 바꾸고, 1 일차 선택을 골라 — 2 일차 분기들이 어떻게 펼쳐지는지 관찰. 아래 set 이 헛간 1 의 서로 다른 총량을 모아."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Now you say it — all 10 buckets identical, 4-day swap.  How many DIFFERENT final amounts can barn 1 have?",
        "직접 — 양동이 10 개 동일, 4 일 왕복. 헛간 1 의 *서로 다른* 최종 양은 몇 가지?"),
      question: t(E,
        "All identical buckets. Distinct outcomes for barn 1?",
        "모든 양동이 동일. 헛간 1의 고유 결과 수?"),
      hint: t(E,
        "Each transfer moves the same amount.  Does the total in barn 1 ever change?",
        "이동량이 매번 같음. 헛간 1 의 총량이 *바뀔 수* 있어?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBackForthCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in, no placeholder.
    {
      type: "progressive",
      narr: t(E,
        "Try every choice across the 4 days — collect all distinct barn 1 totals into a set.  Sections build the recursion one piece at a time.",
        "4 일간 모든 선택을 시도 — 헛간 1 의 모든 가능한 총량을 set 에 모음. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getBackForthSections(E),
    },
  ];
}
