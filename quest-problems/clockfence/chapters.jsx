import { C, t } from "@/components/quest/theme";
import { getClockFenceSections, ClockFenceDeepAuditSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "s = input().strip()",
  "",
  "# 방향 번호: N=0, E=1, S=2, W=3",
  "dir_map = {'N': 0, 'E': 1, 'S': 2, 'W': 3}",
  "",
  "right_turns = 0",
  "left_turns = 0",
  "",
  "for i in range(len(s)):",
  "    cur = dir_map[s[i]]",
  "    nxt = dir_map[s[(i+1) % len(s)]]",
  "    diff = (nxt - cur) % 4",
  "    if diff == 1:",
  "        right_turns += 1",
  "    elif diff == 3:",
  "        left_turns += 1",
  "    # diff == 2 면 U턴, diff == 0 이면 직진이에요",
  "",
  "if right_turns > left_turns:",
  "    print('CW')",
  "else:",
  "    print('CCW')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeClockCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A fence is described by a sequence of unit-step directions (N, E, S, W) that returns to the start, forming a closed simple polygon.\nDecide whether the fence is traced CLOCKWISE or COUNTER-CLOCKWISE.",
        "울타리는 한 칸씩 가는 방향 N, E, S, W 를 죽 이어 놓은 것으로 주어져요.\n그대로 따라가면 처음 자리로 돌아오고, 길이 서로 겹치지 않아요.\n이 울타리를 시계 방향으로 그렸는지 반시계 방향으로 그렸는지 알아내요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Clockwise Fence</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2021 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output 'CW' if the fence is traced clockwise, else 'CCW'.",
                "울타리를 시계 방향으로 그렸으면 'CW' 를,\n반시계 방향으로 그렸으면 'CCW' 를 출력해요.")}
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
                  {t(E, "A fence is given as a ", "울타리는 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "string of unit-step directions", "한 칸씩 가는 방향을 이어 놓은 글")}</b>
                  {t(E, " — letters ", " 로 주어져요. 글자는 ")}
                  <code style={{ background: "#ede9fe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>N E S W</code>
                  {t(E, " (north / east / south / west).", " 네 가지이고 북 / 동 / 남 / 서를 뜻해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Following the directions ", "방향을 따라가면 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "returns to the start", "시작점으로 돌아와요")}</b>
                  {t(E, " — forming a closed simple polygon (no self-crossings).",
                        ". 길이 서로 겹치지 않아서 하나의 닫힌 도형이 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "CW if the fence is traced clockwise, else CCW", "시계 방향으로 그렸으면 CW, 반시계 방향이면 CCW")}</b>
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
        "The path 'NESW' makes a square: go North, then East, then South, then West.\nEach turn is a right turn.\nIs this clockwise?", "'NESW' 를 따라가면 북 → 동 → 남 → 서로 돌아 네모가 돼요.\n돌 때마다 오른쪽으로 꺾어요.\n이건 시계 방향일까요?"),
      question: t(E,
        "'NESW' path: all right turns. Clockwise?",
        "'NESW' 는 네 번 다 오른쪽으로 꺾어요. 시계 방향일까요?"),
      options: [
        t(E, "Yes, CW", "네, 시계 방향이에요"),
        t(E, "No, CCW", "아니요, 반시계 방향이에요"),
      ],
      correct: 0,
      explain: t(E,
        "All 4 transitions are right turns (N->E, E->S, S->W, W->N). More right turns than left = clockwise!",
        "N→E, E→S, S→W, W→N 네 번 모두 오른쪽으로 꺾어요.\n오른쪽으로 꺾은 횟수가 왼쪽보다 많으면 시계 방향이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For 'NESW': N->E is right, E->S is right, S->W is right, W->N is right.\nHow many right turns total?", "'NESW' 는 N→E, E→S, S→W, W→N 네 번 다 오른쪽으로 꺾어요.\n왼쪽으로 꺾은 적은 한 번도 없어요."),
      question: t(E,
        "'NESW': right turns - left turns = ?",
        "'NESW' 에서 오른쪽으로 꺾은 횟수에서\n왼쪽으로 꺾은 횟수를 빼면 얼마일까요?"),
      hint: t(E,
        "Trace each consecutive direction pair and count right turns.",
        "앞뒤로 이어진 방향을 두 개씩 보면서\n오른쪽으로 꺾은 횟수를 세어 보세요."),
      answer: 4,
    },
    // 1-4: Hands-on deep audit — step through every consecutive pair, watch
    // (next - cur) mod 4 classify each transition, tally right vs left, verdict.
    {
      type: "reveal",
      narr: t(E,
        "Time to feel it. Pick a fence, step through each consecutive pair, watch (next − cur) mod 4 decide right / left / straight / U-turn, then let the verdict (CW vs CCW) drop out of the tally.",
        "울타리를 골라 한 걸음씩 보면\n(다음 − 지금) mod 4 가 오른쪽·왼쪽·직진·U턴 중 무엇인지 알려 줘요.\n오른쪽과 왼쪽을 세어 두면 마지막에 시계 방향인지 바로 나와요."),
      content: (
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
            🔍 {t(E, "Deep Audit — step through every direction pair", "꼼꼼히 보기 — 이어진 방향을 두 개씩 확인해요")}
          </div>
          <ClockFenceDeepAuditSim E={E} />
        </div>),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeClockCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Map N=0, E=1, S=2, W=3. For each consecutive pair, (next − cur) mod 4 = 1 → right turn, = 3 → left turn. CW iff right > left. Sections build it one piece at a time.",
        "방향에 번호를 붙여요. N=0, E=1, S=2, W=3 이에요.\n이어진 두 방향에서 (다음 − 지금) mod 4 가 1 이면 오른쪽, 3 이면 왼쪽이에요.\n오른쪽이 왼쪽보다 많으면 CW 예요.\n아래에서 코드를 한 부분씩 쌓아 갈게요."),
      sections: getClockFenceSections(E),
    },
  ];
}
