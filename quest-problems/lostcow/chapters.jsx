import { C, t } from "@/components/quest/theme";
import { getLostCowSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLostCowCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ stands at position x on a number line. His cow is at position y, but he doesn't know which side.\nHe zigzags: 1 step right, 2 steps left, 4 steps right, 8 steps left... doubling each time.\nHow far does he walk before reaching y?",
        "소를 찾을 때까지 FJ 는 모두 몇 칸을 걸을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>The Lost Cow</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2017 Bronze #1</div>
          </div>

          {/* \ud83c\udfaf Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              \ud83c\udfaf {t(E, "Mission", "\ubbf8\uc158")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the total distance FJ walks during his zigzag (+1, \u22122, +4, \u2026) before passing through y.",
                "FJ \uac00 \uc9c0\uadf8\uc7ac\uadf8 (+1, \u22122, +4, \u2026) \ub85c \uac77\ub2e4\uac00 y \ub97c \uc9c0\ub098\uac00\uae30\uae4c\uc9c0\uc758 \ucd1d \uac70\ub9ac\ub97c \ucd9c\ub825.")}
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
                  {t(E, "FJ starts at position ", "FJ가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "x on a number line", "수직선 위 위치 x")}</b>
                  {t(E, ". His cow is at position ", "에서 시작해요. 소는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "y", "위치 y")}</b>
                  {t(E, " — he doesn't know which side.",
                        "에 있어요. 그런데 FJ 는 어느 쪽인지 몰라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "He walks in a ", "그래서 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "zigzag pattern", "지그재그")}</b>
                  {t(E, ": +1, −2, +4, −8, +16, ... — doubling and switching direction each time.",
                        "로 걸어요. +1, −2, +4, −8, +16 … 처럼 매번 두 배로 커지면서 방향이 바뀌어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "He stops the moment ", "걷는 도중 ")}
                  <b style={{ color: "#16a34a" }}>{t(E, "he passes through y", "y를 지나가는 순간")}</b>
                  {t(E, " (mid-segment counts).",
                        " 멈춰요 (다리 중간에서 지나가도 돼요).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "total distance walked", "걸은 총 거리")}</b>
                  {t(E, " before reaching y.", "를 출력해요.")}
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
        "Trace the zigzag yourself for x=3, y=6.  Add up each leg until you reach (or pass) y.",
        "x=3, y=6 으로 지그재그를 직접 따라가 봐요."),
      question: t(E,
        "x=3, y=6. FJ goes 3->4 (1), 4->1 (3), 1->6 (5). Total distance?",
        "x=3, y=6 이에요.\nFJ 는 3→4 (1칸), 4→1 (3칸), 1→6 (5칸) 으로 걸어요.\n걸은 거리는 모두 얼마일까요?"),
      options: [
        t(E, "9", "9"),
        t(E, "7", "7"),
        t(E, "6", "6"),
        t(E, "11", "11"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 3->4 (1) + 4->1 (3) + 1->6 (5) = 9. He walks past y=6 on the way from 1 to 7.",
        "맞아요! 1 + 3 + 5 = 9 예요.\n마지막 다리는 1 에서 7 까지 가는 다리인데, 그 도중에 y=6 을 지나가요.\n그래서 6 까지 걸은 5 칸만 세요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Now you do it on your own — write down each leg, sum the distances.",
        "이번엔 혼자서 다리를 하나씩 적어 보고 다 더해 봐요."),
      question: t(E,
        "x=3, y=6. Total distance walked?",
        "x=3, y=6 이에요. 걸은 거리는 모두 얼마일까요?"),
      hint: t(E,
        "Each leg's distance is the doubling pattern (1, 2, 4, 8, …).  Stop when you've passed y.",
        "다리 길이는 1, 2, 4, 8 … 처럼 두 배씩 늘어요.\ny 를 지나가는 다리까지 다 더해요."),
      answer: 9,
    },
    {
      type: "doubling",
      narr: t(E,
        "Before walking, feel the leg sizes: 1, 2, 4, 8, 16…  Each one twice the last.  Add legs and watch the bars and total grow.",
        "다리 길이가 1, 2, 4, 8, 16 … 처럼 두 배씩 늘어요."),
    },
    {
      type: "sim",
      narr: t(E,
        "Pick a (x, y) and walk FJ through one leg at a time on the number line below.",
        "(x, y) 를 골라서 한 다리씩 직접 걸어 봐요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeLostCowCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in.
    {
      type: "progressive",
      narr: t(E,
        "Simulate the zigzag — each leg doubles, alternates direction, stops the moment y is between current and next position.  Sections build it one piece at a time.",
        "풀이 코드를 한 단락씩 읽어 봐요."),
      sections: getLostCowSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Run it yourself — enter x and y, watch the legs unfold.", "x 와 y 를 넣고 다리가 펼쳐지는 걸 봐요."),
    },
  ];
}
