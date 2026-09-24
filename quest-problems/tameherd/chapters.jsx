import { C, t } from "@/components/quest/theme";
import { getTameHerdSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTameHerdCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ keeps a daily log of days since the last breakout, and some entries are missing.",
        "FJ 는 날마다 '마지막 탈출 뒤로 며칠 지났는지' 를 적어 둬요.\n탈출한 날은 카운터가 0 이 되고, 그다음 날부터 1 씩 늘어요.\n못 적은 날은 −1 로 남아 있어요.\n이 기록과 어긋나지 않는 탈출 횟수의 가장 작은 값과 가장 큰 값을 출력해요.\n그런 경우가 아예 없으면 −1 을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Taming the Herd</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2018 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output the MIN and MAX possible breakouts consistent with the log, or −1 if impossible.",
                "기록과 어긋나지 않는 탈출 횟수의\n가장 작은 값과 가장 큰 값을 출력해요.\n그런 경우가 없으면 −1 을 출력해요.")}
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
                  {t(E, "FJ has a daily log: ", "FJ 는 날마다 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "'days since last breakout'", "'마지막 탈출 뒤로 며칠 지났는지'")}</b>
                  {t(E, ".", " 를 적어 둬요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The counter ", "이 카운터는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "resets to 0 on a breakout day", "탈출한 날에 0 이 되고")}</b>
                  {t(E, " and increments by 1 each subsequent day.",
                        " 그다음 날부터 하루에 1 씩 늘어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Some entries are ", "어떤 날은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "missing (−1)", "적히지 않아서 −1 로 남아 있어요")}</b>
                  {t(E, " — they could be any value.",
                        ". 그 자리엔 어떤 값이 들어가도 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MIN and MAX possible number of breakouts consistent with the log", "기록과 어긋나지 않는 탈출 횟수의 가장 작은 값과 가장 큰 값")}</b>
                  {t(E, " (or −1 if impossible).", " 을 출력해요.\n그런 경우가 하나도 없으면 −1 을 출력해요.")}
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
        "Log: [0, 1, 2, 0, 1]. Breakouts happen on days with value 0. How many breakouts?", "기록이 [0, 1, 2, 0, 1] 이에요. 값이 0 인 날에 탈출이 있었어요."),
      question: t(E,
        "Log [0, 1, 2, 0, 1]. How many breakouts?",
        "기록이 [0, 1, 2, 0, 1] 일 때 탈출은 몇 번 있었을까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Value 0 appears at day 1 and day 4. That's 2 breakouts!",
        "값이 0 인 날은 1 일차와 4 일차예요. 그래서 탈출은 2 번이에요."),
    },
    // 1-3: Deep audit sim — walk a sample log day-by-day
    {
      type: "sim",
      narr: t(E,
        "Pick a log preset and step through it day by day.",
        "기록을 하나 골라 하루씩 따라가 봐요.\n탈출한 날에 카운터가 0 이 되는 것,\n−1 인 날은 어떻게 넘어가는지,\n어느 순간 앞뒤가 안 맞게 되는지를 볼 수 있어요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Log: [0, 1, 2, 0, 1]. Count the breakouts (days with value 0).", "기록이 [0, 1, 2, 0, 1] 이에요. 값이 0 인 날을 세어 보세요."),
      question: t(E,
        "Log [0, 1, 2, 0, 1]. Number of breakouts?",
        "기록이 [0, 1, 2, 0, 1] 일 때 탈출은 몇 번일까요?"),
      hint: t(E,
        "A breakout day shows up as which counter value?",
        "탈출이 있었던 날은 카운터가 몇으로 적힐까요?"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTameHerdCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Walk the log once, tracking the previous known value.",
        "기록을 앞에서부터 한 번만 훑으면서 바로 앞의 값을 들고 다녀요.\n값이 0 이면 그날 탈출이 있었던 거예요.\n0 이 아니면 앞의 값 + 1 이 맞는지 봐요.\n아래에서 코드를 한 부분씩 쌓아 갈게요."),
      sections: getTameHerdSections(E),
    },
  ];
}
