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
        "4 days of trading buckets — how many totals can barn 1 end up with?",
        "4 일이 끝나면 헛간 1 의 우유는 몇 가지 값이 될까요?"),
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
                "4 일간 양동이를 주고받은 뒤, 헛간 1 의 우유 총량으로 나올 수 있는 값이 몇 가지인지 출력해요.")}
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
                        " 옮겨요. 1일차 FJ 가 양동이 1개를 1→2, 2일차 동생이 1개를 2→1, 3일차 FJ, 4일차 동생 순이에요.")}
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
    // 1-2: Input / Output format
    // 2026-09-23: 없던 쪽. 형식(줄 수·개수)은 🔒 검증된 풀이 코드(components.jsx FULL_PY)에서
    // 그대로 가져왔다 — 지어낸 게 아니다. 다만 public/problems/backforth.pdf 가 없어서
    // 원문 예제 숫자는 확인 못 한다. 그래서 예시 값은 직접 만들고 "예시일 뿐" 이라고 밝힌다.
    {
      type: "reveal",
      narr: t(E,
        "Two lines in, one number out — here's exactly what they look like.",
        "입력 두 줄, 출력 한 줄 — 정확한 모양을 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
                {t(E, <>Line 1: <b>10</b> integers — barn 1's buckets.<br />Line 2: <b>10</b> integers — barn 2's buckets.</>,
                     <>첫 줄: <b>10</b> 개 정수 — 헛간 1 의 양동이들.<br />둘째 줄: <b>10</b> 개 정수 — 헛간 2 의 양동이들.</>)}
              </div>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontSize: 11.5, color: C.text, lineHeight: 1.7, wordBreak: "keep-all" }}>
                {t(E, <>One line: the <b>number of distinct</b> possible totals for barn 1.</>,
                     <>한 줄: 헛간 1 이 가질 수 있는 <b>서로 다른 값의 개수</b>.</>)}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5 }}>
              <div style={{ color: "#94a3b8", marginBottom: 4 }}>Input</div>
              <div>1 2 3 4 5 6 7 8 9 10</div>
              <div>10 9 8 7 6 5 4 3 2 1</div>
            </div>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5 }}>
              <div style={{ color: "#94a3b8", marginBottom: 4 }}>Output</div>
              <div>33</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.5, wordBreak: "keep-all" }}>
            {t(E,
              "⚠️ This is an example we made up to show the shape — not the official sample.",
              "⚠️ 모양을 보여주려고 직접 만든 예시예요 — 원문 예제가 아니에요.")}
          </div>
        </div>),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Imagine all buckets are the same size.  Walk through 4 days mentally — what could change?",
        "양동이가 다 같은 크기라면 무엇이 달라질 수 있을까요?"),
      question: t(E,
        "All buckets same size s. After 4 days of back and forth, how many distinct outcomes for barn 1?",
        "양동이 크기가 다 같을 때, 4일 뒤 헛간 1 의 값은 몇 가지일까요?"),
      options: [
        t(E, "1 - always back to 1000", "1 — 항상 1000 으로 돌아와요"),
        t(E, "4 - one per day", "4 — 하루에 하나씩"),
        t(E, "10 - one per bucket", "10 — 양동이마다 하나씩"),
      ],
      correct: 0,
      explain: t(E,
        "If all buckets are identical, the amount leaving is always the amount coming back, so barn 1 returns to 1000 after every round trip. That leaves only 1 possible value.",
        "양동이가 다 같으면 나가는 양과 들어오는 양이 늘 같아요. 그래서 한 번 왕복할 때마다 헛간 1 은 다시 1000 이에요. 나올 수 있는 값이 하나뿐이에요."),
    },
    // 1-4: State-tree sim (toy version, 3 buckets, 1-2 days)
    {
      type: "tree",
      narr: t(E,
        "Play with the state tree — watch how each day-2 choice branches.",
        "1 일차 선택을 바꾸면 2 일차가 어떻게 갈라지는지 봐요."),
    },
    // 1-5: Input — recheck the 1-4 tree sim result (was a duplicate of 1-3 before 2026-09-23)
    {
      type: "input",
      narr: t(E,
        "Check the count you just found in the tree sim.",
        "방금 시뮬에서 나온 개수를 확인해요."),
      question: t(E,
        "With the tree sim's default buckets (4,1,7 / 3,5,2) and 2 days, how many distinct final totals did barn 1 have?",
        "시뮬 기본값(4·1·7 / 3·5·2), 2 일일 때 헛간 1 의 최종 값은 몇 가지였나요?"),
      hint: t(E,
        "Look at the green box at the bottom of the tree sim you just played with — count the chips inside it.",
        "방금 만진 시뮬 맨 아래 초록 박스를 보세요 — 안에 든 칩 개수를 세어 봐요."),
      answer: 8,
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
        "4 일간 모든 선택을 해 보고 나온 총량을 set 에 모아요."),
      sections: getBackForthSections(E),
    },
  ];
}
