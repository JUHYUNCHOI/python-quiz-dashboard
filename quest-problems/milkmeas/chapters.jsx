import { C, t } from "@/components/quest/theme";
import { getMilkMeasSections } from "./components";

/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeMilkMeasCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has 3 cows starting at 7 gallons each; N events change a cow's output. Count how many times the leader set changes.",
        "FJ 에게 소 세 마리 (Bessie, Elsie, Mildred) 가 있어요.\n셋 다 하루 7 갤런에서 시작해요.\n날짜마다 변화가 N 번 일어나요 — \"d 일에 소 X 의 우유량이 ±값 만큼 바뀐다\" 예요.\n간판에는 지금 우유를 제일 많이 만드는 소들, 즉 1등 소들이 적혀요.\n간판에 적힌 1등 소들이 몇 번 바뀌는지 세어서 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcca"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Milk Measurement</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2017 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ede9fe", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of times the displayed leader set changes over all events.",
                "간판에 적힌 1등 소들이 처음부터 끝까지\n몇 번 바뀌는지 세어서 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "3 cows (Bessie, Elsie, Mildred)", "3마리 소 (Bessie, Elsie, Mildred)")}</b>
                  {t(E, " — each starts at 7 gallons of daily output.",
                        " 가 있어요. 셋 다 하루 7 갤런에서 시작해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "N change events: ", "변화가 N 번 일어나요. ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "on day d, cow X's output changes by ±value", "d 일에 소 X 의 우유량이 ±값 만큼 바뀌어요")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A sign displays the ", "간판에는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "set of current leaders", "1등 소들")}</b>
                  {t(E, " (cows tied for the maximum output).",
                        " 이 적혀요.\n지금 우유를 제일 많이 만드는 소들이고, 같은 양이면 여럿일 수도 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of times the displayed set changes", "간판에 적힌 1등 소들이 바뀐 횟수")}</b>
                  {t(E, " over the whole event sequence.", " 를 전체 기록에서 세어 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=761) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N events, then that many lines of \"day cow change\".",
        "입력은 측정 횟수 N 다음에 그만큼의 기록 줄로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of measurements", "— 측정 횟수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>d cow ±v</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— on day d, cow's output changes by v", "— d 일에 그 소의 우유량이 v 만큼 바뀜")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The number of days on which the displayed leader set changed.",
                  "간판에 적힌 1등 소들이 바뀐 날의 수를 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100 <span style={{ color: C.dim, fontWeight: 400 }}>{t(E, "(one measurement per day, days 1..100)", "(하루 최대 한 번, 1~100 일)")}</span></div>
              <div>1 ≤ d ≤ 100</div>
              <div>0 ≤ {t(E, "each cow's output", "각 소의 우유량")} ≤ 1000</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "v is a nonzero integer  ·  at most one measurement per day", "v 는 0 이 아닌 정수  ·  하루에 측정은 최대 한 번")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: sim — replay event log, watch leader set + counter
    {
      type: "sim",
      narr: t(E,
        "Replay a small event log. 👑 marks the current leader(s) — the counter ticks up when it changes.",
        "작은 변화 기록을 하나씩 따라가 봐요.\n👑 이 붙은 소가 지금 1등 소예요. 우유량이 같으면 여럿이 같이 1등이에요.\n1등 소들이 바로 앞과 달라질 때마다 숫자를 1 씩 올려요."),
    },
    // 1-3: quiz
    {
      type: "quiz",
      narr: t(E,
        "All cows start at 7.\nDay 1: Bessie (cow 1) gets +5, now at 12.\nLeaders change from {all three} to {Bessie}.\nIs this 1 display change?", "소 셋 다 7 에서 시작해요.\n1 일차에 Bessie 가 +5 되어 12 가 돼요.\n1등 소들이 {셋 다} 에서 {Bessie} 로 바뀌어요.\n이건 간판이 한 번 바뀐 걸까요?"),
      question: t(E,
        "Start: all at 7 (leaders = all). Bessie +5 -> 12. Leaders = {Bessie}. Display changes?",
        "처음엔 모두 7 이라 셋 다 1등이에요.\nBessie 가 +5 되어 12 가 되면 1등은 {Bessie} 하나예요.\n간판은 몇 번 바뀌었을까요?"),
      options: [
        t(E, "1 change", "한 번 바뀌었어요"),
        t(E, "0 changes", "안 바뀌었어요"),
        t(E, "3 changes", "세 번 바뀌었어요"),
      ],
      correct: 0,
      explain: t(E,
        "The leader set changed from {1,2,3} to {1}. That's 1 display change.",
        "1등 소들이 {1,2,3} 에서 {1} 로 바뀌었어요.\n그래서 간판이 한 번 바뀐 거예요."),
    },
    // 1-3: input
    {
      type: "input",
      narr: t(E,
        "All start at 7. Only one change: Bessie +5 on day 1. How many display changes total?", "셋 다 7 에서 시작하고 변화는 하나뿐이에요.\n1 일차에 Bessie 가 +5 돼요. 간판은 모두 몇 번 바뀔까요?"),
      question: t(E,
        "1 change: Bessie +5. Total display changes?",
        "변화가 Bessie +5 하나뿐일 때\n간판은 모두 몇 번 바뀔까요?"),
      hint: t(E,
        "Compare the leader set before and after the event.",
        "변화가 일어나기 전과 후의 1등 소들을 견줘 보세요."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeMilkMeasCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Sort events by day, update each cow's output, recheck the leaders, and count changes.",
        "변화를 날짜순으로 줄 세워요.\n앞에서부터 하나씩 우유량을 고치고, 1등 소들을 다시 찾고,\n바로 앞과 달라졌으면 횟수를 1 올려요.\n아래에서 코드를 한 부분씩 쌓아 갈게요."),
      sections: getMilkMeasSections(E),
    },
  ];
}
